import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const BASE_PATH = '/p7x4m9q2-k6v8n3r5-t2w9c4h7/';
export const SCENARIOS = ['standard', 'empty-search', 'page-error', 'conflicting-sources', 'injection', 'timeout', 'loop', 'invalid-response', 'trace-failure'];

// Beijing text-only standard prices, CNY per million tokens, checked 2026-10-22.
// Never fall back to another model's rate. Cache discounts/free credits are not assumed.
const QWEN_PRICING = Object.freeze({
  'qwen3.8-flash': Object.freeze({ inputYuanPerMillion: 0.8, outputYuanPerMillion: 2.7, maxPricedInputTokens: 1_000_000,
    outputTokenParameter: 'max_completion_tokens', outputTokenSlack: 10 }),
  'qwen-plus-2025-12-01': Object.freeze({ inputYuanPerMillion: 0.8, outputYuanPerMillion: 2, maxPricedInputTokens: 128_000,
    outputTokenParameter: 'max_tokens', outputTokenSlack: 0 }),
});

export function loadConfig(env = process.env, approval = {}) {
  const mode = env.AGENT_MODE || 'mock', traceMode = env.AGENT_TRACE_MODE || 'offline';
  if (!['mock', 'qwen'].includes(mode) || (mode === 'qwen' && approval.allowModelCalls !== true)) throw new Error('Only mock mode is authorized without --allow-model-calls; supported modes: mock/qwen.');
  if (!['offline', 'cloud'].includes(traceMode) || (traceMode === 'cloud' && approval.allowCloudTraces !== true)) throw new Error('Only offline tracing is authorized without --allow-cloud-traces.');
  const trialBudgetUnits = Math.round(Number(env.AGENT_TRIAL_BUDGET_YUAN || 5) * 10_000);
  if (!Number.isSafeInteger(trialBudgetUnits) || trialBudgetUnits < 1 || trialBudgetUnits > 50_000) throw new Error('First-validation budget must be greater than zero and no more than 5 yuan.');
  const model = env.QWEN_MODEL || 'qwen3.8-flash';
  const pricing = Object.hasOwn(QWEN_PRICING, model) ? QWEN_PRICING[model] : null;
  const qwen = {
    apiKey: env.DASHSCOPE_API_KEY || '', baseUrl: (env.QWEN_BASE_URL || 'https://dashscope.aliyuncs.com/compatible-mode/v1').replace(/\/$/, ''),
    model, ...pricing, pricingCheckedDate: '2026-10-22', pricingRegion: 'cn-beijing',
    pricingSource: 'https://help.aliyun.com/zh/model-studio/model-pricing',
    maxOutputTokens: 1200, maxInputTokenBound: 24_000, requestTimeoutMs: 60_000,
  };
  if (mode === 'qwen') {
    if (!qwen.apiKey) throw new Error('Missing DASHSCOPE_API_KEY');
    if (qwen.baseUrl !== 'https://dashscope.aliyuncs.com/compatible-mode/v1'
      && !/^https:\/\/[a-z0-9-]+\.cn-beijing\.maas\.aliyuncs\.com\/compatible-mode\/v1$/i.test(qwen.baseUrl)) throw new Error('QWEN_BASE_URL must be an approved Beijing generic or workspace compatible-mode/v1 HTTPS endpoint.');
    if (!pricing) throw new Error('No verified Beijing price profile for this Qwen model.');
    if (env.QWEN_PRICING_CONFIRMED !== 'true') throw new Error('Confirm the Beijing model price before enabling Qwen: QWEN_PRICING_CONFIRMED=true');
  }
  const langsmith = {
    apiKey: env.LANGSMITH_API_KEY || '', endpoint: env.LANGSMITH_ENDPOINT || 'https://api.smith.langchain.com',
    project: env.LANGSMITH_PROJECT || 'private-research-agent-dev', workspaceId: env.LANGSMITH_WORKSPACE_ID || '',
    maxTrialTraces: 20, requestTimeoutMs: 3000,
  };
  if (traceMode === 'cloud') {
    if (!langsmith.apiKey) throw new Error('Missing LANGSMITH_API_KEY');
    if (langsmith.endpoint !== 'https://api.smith.langchain.com') throw new Error('This trial supports the LangSmith GCP US endpoint only; confirm regional settings before changing it.');
    if (env.LANGSMITH_FREE_TIER_CONFIRMED !== 'true') throw new Error('Confirm Developer free quota and disabled overage before cloud tracing: LANGSMITH_FREE_TIER_CONFIRMED=true');
  }
  const port = Number(env.AGENT_PORT || 4322);
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('Invalid AGENT_PORT');
  let publicOrigin = '';
  const trialSeedReservedUnits = Number(env.AGENT_TRIAL_SEED_RESERVED_UNITS || 0);
  if (!Number.isSafeInteger(trialSeedReservedUnits) || trialSeedReservedUnits < 0 || trialSeedReservedUnits > trialBudgetUnits) throw new Error('Invalid cumulative trial seed floor.');
  if (env.AGENT_PUBLIC_ORIGIN) {
    let parsed;
    try { parsed = new URL(env.AGENT_PUBLIC_ORIGIN); } catch { throw new Error('AGENT_PUBLIC_ORIGIN must be an exact HTTPS origin.'); }
    if (parsed.protocol !== 'https:' || parsed.origin !== env.AGENT_PUBLIC_ORIGIN || parsed.username || parsed.password
      || parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1') throw new Error('AGENT_PUBLIC_ORIGIN must be an exact HTTPS origin.');
    if (!env.AGENT_DATA_DIR) throw new Error('Public deployment requires an explicit persistent AGENT_DATA_DIR.');
    if (!env.AGENT_TRIAL_SEED_RESERVED_UNITS) throw new Error('Public deployment requires the preserved cumulative trial seed floor.');
    publicOrigin = parsed.origin;
  }
  return {
    host: '127.0.0.1', port, basePath: BASE_PATH, publicOrigin, trialSeedReservedUnits,
    dataDir: resolve(env.AGENT_DATA_DIR || fileURLToPath(new URL('../../.tmp/research-agent/', import.meta.url))),
    mode, traceMode, qwen, langsmith, trialBudgetUnits,
    allowModelCalls: mode === 'qwen' && approval.allowModelCalls === true,
    allowCloudTraces: traceMode === 'cloud' && approval.allowCloudTraces === true,
    sessionMs: 8 * 60 * 60 * 1000, idleMs: 30 * 60 * 1000,
    loginWindowMs: 15 * 60 * 1000, loginMaxFailures: 5,
    maxSteps: 12, maxSearches: 6, maxPages: 8, taskTimeoutMs: mode === 'qwen' ? 180_000 : 30_000,
    dayBudgetUnits: 100_000, monthBudgetUnits: 1_000_000,
    stepDelayMs: 120,
  };
}

export const unitsToYuan = (units) => Number((units / 10_000).toFixed(4));
