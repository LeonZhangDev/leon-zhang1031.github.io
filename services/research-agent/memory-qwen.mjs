import { AsyncLocalStorage } from 'node:async_hooks';
import { createHash } from 'node:crypto';
import { createPaidClient } from './paid-client.mjs';

// SDK callbacks inherit one auditable, abortable operation. A failed subrequest
// latches the whole operation, preventing SDK batch/entity fallback retries.
export function createMemoryProviders(store, config, options = {}) {
  const request = createPaidClient(store, config, 'memory', options);
  const operations = new AsyncLocalStorage();
  const current = () => {
    const context = operations.getStore();
    if (!context) throw new Error('MODEL_OPERATION_REQUIRED');
    if (context.error) throw context.error;
    if (context.signal?.aborted) throw new Error('CANCELLED');
    return context;
  };
  const guarded = async operation => {
    const context = current();
    try { return await operation(context); }
    catch (error) { context.error ||= error; throw error; }
  };
  const settings = config.memory.embedding;
  const embedDocuments = texts => guarded(async context => {
    if (!Array.isArray(texts) || texts.some(text => typeof text !== 'string' || !text.trim()
      || Buffer.byteLength(text, 'utf8') > settings.maxInputTokenBound)) throw new Error('MEMORY_EMBEDDING_INPUT_INVALID');
    const keys = texts.map(text => createHash('sha256').update(`${settings.model}:${settings.dimensions}:${text}`).digest('hex'));
    const missing = [...new Map(texts.map((text, i) => [keys[i], text])).entries()].filter(([key]) => !context.cache.has(key));
    for (let start = 0; start < missing.length; start += settings.maxBatchSize) {
      const batch = missing.slice(start, start + settings.maxBatchSize);
      const payload = await request(settings, 'embeddings', { model: settings.model, input: batch.map(([, text]) => text),
        dimensions: settings.dimensions, encoding_format: 'float' }, context, 'memory-embedding');
      const rows = payload.data;
      if (!Array.isArray(rows) || rows.length !== batch.length) throw new Error('MEMORY_VECTOR_INVALID');
      const seen = new Set();
      for (const row of rows) {
        if (!Number.isInteger(row.index) || row.index < 0 || row.index >= batch.length || seen.has(row.index)
          || !Array.isArray(row.embedding) || row.embedding.length !== settings.dimensions
          || row.embedding.some(n => !Number.isFinite(n)) || Math.hypot(...row.embedding) === 0) throw new Error('MEMORY_VECTOR_INVALID');
        seen.add(row.index);
      }
      for (const row of rows) context.cache.set(batch[row.index][0], row.embedding);
    }
    return keys.map(key => context.cache.get(key));
  });
  return {
    async withOperation(kind, { sourceTaskId = null, signal } = {}, operation) {
      if (signal?.aborted) throw new Error('CANCELLED');
      const context = { operationId: store.createMemoryOperation(kind, sourceTaskId), taskId: sourceTaskId, signal, cache: new Map() };
      return operations.run(context, async () => {
        try {
          const result = await operation();
          current(); // SDK helpers sometimes catch exceptions internally. Never hide them.
          store.finishMemoryOperation(context.operationId, 'completed'); return result;
        } catch (error) { store.finishMemoryOperation(context.operationId, 'failed'); throw error; }
        finally { context.cache.clear(); }
      });
    },
    embeddings: { embedQuery: async text => (await embedDocuments([text]))[0], embedDocuments },
    llm: { model: config.memory.llm.model, response_format: { type: 'json_object' },
      invoke: messages => guarded(async context => {
        const formatted = messages.map(message => {
          const type = message.getType?.() || message.role;
          const role = ({ human: 'user', ai: 'assistant' })[type] || type;
          if (!['system', 'user', 'assistant'].includes(role) || typeof message.content !== 'string') throw new Error('MEMORY_MESSAGES_INVALID');
          return { role, content: message.content };
        });
        const llm = config.memory.llm;
        const payload = await request(llm, 'chat/completions', { model: llm.model, stream: false,
          enable_thinking: false, enable_search: false, [llm.outputTokenParameter]: llm.maxOutputTokens,
          response_format: { type: 'json_object' }, messages: formatted }, context, 'memory-extraction');
        const choice = payload.choices?.[0];
        if (choice?.finish_reason !== 'stop' || typeof choice.message?.content !== 'string' || choice.message.tool_calls?.length) throw new Error('MEMORY_EXTRACTION_INVALID');
        return { content: choice.message.content };
      }),
    },
  };
}
