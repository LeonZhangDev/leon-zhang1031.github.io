// One transport for Agent chat, Mem0 extraction and embeddings. No SDK HTTP retries.
export function createPaidClient(store, config, authority, { fetchImplementation = (...args) => globalThis.fetch(...args) } = {}) {
  if ((authority === 'agent' && (config.mode !== 'qwen' || config.allowModelCalls !== true))
    || (authority === 'memory' && (config.memoryMode !== 'qwen' || config.allowMemoryCalls !== true))
    || !['agent', 'memory'].includes(authority)) throw new Error('QWEN_NOT_AUTHORIZED');

  return async function request(settings, endpoint, requestBody, context, purpose) {
    if (!context || (authority === 'memory' && !context.operationId)) throw new Error('MODEL_OPERATION_REQUIRED');
    if (context.error) throw context.error;
    if (context.signal?.aborted) throw new Error('CANCELLED');
    const body = JSON.stringify(requestBody);
    const inputBound = Buffer.byteLength(body, 'utf8') + 1024;
    const embedding = endpoint === 'embeddings';
    if (!['embeddings', 'chat/completions'].includes(endpoint)) throw new Error('MODEL_ENDPOINT_INVALID');
    if (inputBound > (embedding ? settings.maxPricedInputTokens : Math.min(settings.maxInputTokenBound, settings.maxPricedInputTokens))) throw new Error('MODEL_CONTEXT_LIMIT');
    const outputBound = embedding ? 0 : settings.maxOutputTokens + settings.outputTokenSlack;
    const units = Math.ceil((inputBound * settings.inputYuanPerMillion + outputBound * settings.outputYuanPerMillion) / 100);
    const reservation = store.reserveModelCall(context.taskId || null, units, config, {
      model: settings.model, purpose, pricingRegion: settings.pricingRegion,
      pricingCheckedDate: settings.pricingCheckedDate, pricingSource: settings.pricingSource,
      inputYuanPerMillion: settings.inputYuanPerMillion, outputYuanPerMillion: settings.outputYuanPerMillion,
      inputTokenBound: inputBound, outputTokenBound: outputBound,
      ...(embedding ? { dimensions: settings.dimensions } : {}),
    }, context.operationId);
    const timeout = AbortSignal.timeout(settings.requestTimeoutMs);
    const signal = context.signal ? AbortSignal.any([context.signal, timeout]) : timeout;
    let payload, requestId;
    try {
      const response = await fetchImplementation(`${settings.baseUrl}/${endpoint}`, {
        method: 'POST', redirect: 'error', signal,
        headers: { authorization: `Bearer ${settings.apiKey}`, 'content-type': 'application/json' }, body,
      });
      if (!response.ok) { await response.body?.cancel(); throw new Error('HTTP_ERROR'); }
      payload = await response.json();
      requestId = response.headers.get('x-request-id');
    } catch { throw new Error(signal.aborted ? 'QWEN_REQUEST_STOPPED' : 'QWEN_REQUEST_FAILED'); }
    const usage = payload?.usage, inputTokens = usage?.prompt_tokens, outputTokens = embedding ? 0 : usage?.completion_tokens;
    if (![inputTokens, outputTokens].every(n => Number.isSafeInteger(n) && n >= 0)) throw new Error('QWEN_USAGE_MISSING');
    if (inputTokens > inputBound || outputTokens > outputBound) {
      store.lockModelBudget(); throw new Error('QWEN_USAGE_OUTSIDE_BOUND');
    }
    const usageEstimateYuan = (inputTokens * settings.inputYuanPerMillion + outputTokens * settings.outputYuanPerMillion) / 1_000_000;
    store.recordModelUsage(reservation, { inputTokens, outputTokens, usageEstimateYuan,
      ...(requestId && /^[\w-]{1,128}$/.test(requestId) ? { requestId } : {}) });
    return payload;
  };
}
