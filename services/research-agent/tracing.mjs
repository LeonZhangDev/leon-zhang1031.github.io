import { Client } from 'langsmith';
import { randomUUID } from 'node:crypto';
import { redact } from './security.mjs';

// The SDK always uses our transport. Offline interception remains the default.
export function cloudSummary(run) {
  return { ...run, inputs: { step: run.inputs?.step, evidenceCount: run.inputs?.evidenceCount },
    outputs: { status: run.outputs?.status, usage_metadata: run.outputs?.usage_metadata },
    ...(run.error ? { error: 'Operation failed; details retained locally.' } : {}) };
}
export class TaskTrace {
  constructor(store, taskId, { fail = false, config = {}, fetchImplementation = (...args) => globalThis.fetch(...args) } = {}) {
    this.store = store; this.taskId = taskId; this.failed = false; this.runs = [];
    this.config = config; this.cloud = config.traceMode === 'cloud' && config.allowCloudTraces === true;
    const remote = config.langsmith || {};
    this.client = new Client({
      apiUrl: this.cloud ? remote.endpoint : 'http://127.0.0.1:1', apiKey: this.cloud ? remote.apiKey : 'offline-placeholder-not-a-credential',
      autoBatchTracing: false, tracingMode: 'langsmith', omitTracedRuntimeInfo: true,
      tracingSamplingRate: 1, debug: false, workspaceId: this.cloud ? remote.workspaceId : '', webUrl: 'http://127.0.0.1:1',
      callerOptions: { maxRetries: 0 }, timeout_ms: 1000, anonymizer: redact,
      fetchImplementation: async (url, init = {}) => {
        // A non-retryable response also works around SDK versions which fix caller retries at four.
        if (fail) return new Response('{"error":"Simulated offline trace failure"}', { status: 400 });
        const parsed = new URL(String(url));
        if (this.cloud) {
          // Fail closed on SDK retries/redirects/unexpected endpoints. No historical replay.
          if (this.failed || parsed.origin !== 'https://api.smith.langchain.com' || parsed.pathname !== '/runs' || init.method !== 'POST') return new Response('{}', { status: 400 });
          try {
            const response = await fetchImplementation(url, { ...init, redirect: 'error',
              signal: AbortSignal.timeout(remote.requestTimeoutMs) });
            if (!response.ok) { await response.body?.cancel(); throw new Error('TRACE_REJECTED'); }
            await response.body?.cancel();
            return new Response('{}', { status: 200 });
          } catch {
            this.failed = true;
            // SDK 0.11.0 overrides maxRetries. Map transport failures to non-retryable 400.
            return new Response('{}', { status: 400 });
          }
        }
        if (parsed.origin !== 'http://127.0.0.1:1') throw new Error('External tracing destination blocked');
        const body = init.body instanceof Uint8Array ? new TextDecoder().decode(init.body) : String(init.body || '');
        const payload = body ? JSON.parse(body) : null;
        store.wire(taskId, { path: parsed.pathname, method: init.method || 'GET', payload: redact(payload) });
        return new Response(JSON.stringify(parsed.pathname === '/info' ? { batch_ingest_config: { use_multipart_endpoint: false } } : {}), { status: 200, headers: { 'content-type': 'application/json' } });
      },
    });
    this.root = this.start('research-agent', 'chain', {}, null, taskId);
  }
  start(name, runType, inputs, parent = this.root, id = randomUUID()) {
    const start = Date.now();
    const stamp = new Date(start).toISOString().replace(/[-:.]/g, '').replace('Z', '000Z');
    const run = { id, name, run_type: runType, inputs: redact(inputs), start_time: start,
      trace_id: this.taskId, dotted_order: parent ? `${parent.dotted_order}.${stamp}${id}` : `${stamp}${id}`,
      ...(parent ? { parent_run_id: parent.id } : {}),
      session_name: this.cloud ? this.config.langsmith.project : 'private-research-agent-local',
      tags: [this.config.mode || 'mock', this.cloud ? 'cloud-summary-only' : 'offline', 'synthetic-tools'],
      extra: { metadata: { mode: this.config.mode || 'mock', trace_transport: this.cloud ? 'cloud' : 'offline',
        tools_simulated: true, vendor_bill_verified: false,
        ...(runType === 'llm' ? { ls_provider: this.config.mode === 'qwen' ? 'alibaba' : 'mock', ls_model_name: this.config.mode === 'qwen' ? this.config.qwen.model : 'mock-research-v1' } : {}) } },
    };
    this.runs.push(run); return run;
  }
  end(run, outputs, error) {
    run.end_time = Date.now(); run.outputs = redact(outputs);
    if (run.run_type === 'llm' && this.config.mode === 'qwen') {
      if (outputs?.result?.usageMetadata) run.outputs.usage_metadata = outputs.result.usageMetadata;
      run.extra.metadata.tokens_are_synthetic = false;
    } else if (run.run_type === 'llm') {
      const input = Math.ceil(JSON.stringify(run.inputs).length / 4);
      const output = Math.ceil(JSON.stringify(run.outputs).length / 4);
      run.outputs.usage_metadata = { input_tokens: input, output_tokens: output, total_tokens: input + output };
      run.extra.metadata.tokens_are_synthetic = true;
    }
    if (error) run.error = redact(String(error));
  }
  async span(name, runType, inputs, operation) {
    const run = this.start(name, runType, inputs);
    try {
      const result = await operation(); this.end(run, { result }); return result;
    } catch (error) { this.end(run, {}, error.message); throw error; }
  }
  async finish(outputs) {
    this.end(this.root, outputs);
    for (const run of this.runs) this.store.trace(this.taskId, run);
    if (this.cloud) {
      try { this.store.claimCloudTrace(this.taskId, this.config.langsmith.maxTrialTraces); }
      catch { return 'cloud-limit-local-retained'; }
    }
    for (const run of this.runs) {
      // Keep a durable local record even when the mocked SDK endpoint fails.
      try { await this.client.createRun(this.cloud ? cloudSummary(run) : run); } catch { this.failed = true; }
      if (this.cloud && this.failed) break;
    }
    return this.failed ? 'failed-local-retained' : this.cloud ? 'cloud-api-accepted' : 'sdk-offline-verified';
  }
}
