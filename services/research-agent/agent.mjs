import { setTimeout as delay } from 'node:timers/promises';
import { mockDecision, mockTool, buildReport, TOOL_UNITS, MODEL_UNITS } from './mock-provider.mjs';
import { TaskTrace } from './tracing.mjs';
import { redact } from './security.mjs';
import { createQwenProviders } from './qwen-provider.mjs';

export class AgentRunner {
  constructor(store, config, providers = {}) {
    const defaults = config.mode === 'qwen' ? createQwenProviders(store, config, providers) : { decide: mockDecision, tool: mockTool };
    this.store = store; this.config = config; this.decide = providers.decide || defaults.decide;
    this.tool = providers.tool || defaults.tool; this.traceFetch = providers.traceFetch; this.active = new Map();
  }
  start(task) {
    const controller = new AbortController();
    const completion = this.run(task, controller.signal).finally(() => this.active.delete(task.id));
    this.active.set(task.id, { controller, completion }); return completion;
  }
  cancel(id) { this.active.get(id)?.controller.abort(); }
  async close() { for (const item of this.active.values()) item.controller.abort(); await Promise.allSettled([...this.active.values()].map(item => item.completion)); }
  async run(task, signal) {
    const config = this.config, store = this.store;
    const trace = new TaskTrace(store, task.id, { config, fail: task.scenario === 'trace-failure', fetchImplementation: this.traceFetch });
    trace.root.inputs = redact({ goal: task.goal, constraints: task.constraints, scenario: task.scenario });
    const state = { ...task, searches: 0, pages: 0, readUrls: new Set(), allowedUrls: new Set(), evidence: [], observations: [], calculation: null, report: null };
    const started = Date.now(); let finalStatus = 'limited';
    const taskController = new AbortController();
    const operationSignal = AbortSignal.any([signal, taskController.signal]);
    const event = (type, message, extra = {}) => store.event(task.id, redact({ type, message, ...extra }));
    const guard = () => {
      if (signal.aborted) throw new Error('CANCELLED');
      if (Date.now() - started >= config.taskTimeoutMs) throw new Error('DEADLINE');
    };
    const bounded = async (operation) => {
      guard();
      let timer, abort;
      const stopped = new Promise((_, reject) => {
        abort = () => reject(new Error('CANCELLED'));
        signal.addEventListener('abort', abort, { once: true });
        timer = setTimeout(() => { reject(new Error('DEADLINE')); taskController.abort(); }, Math.max(1, config.taskTimeoutMs - (Date.now() - started)));
      });
      try { return await Promise.race([Promise.resolve().then(operation), stopped]); }
      finally { clearTimeout(timer); signal.removeEventListener('abort', abort); }
    };
    const spend = (units) => {
      if (task.estimatedCostUnits + units > task.budgetUnits) throw new Error('TASK_BUDGET');
      task.estimatedCostUnits += units; store.saveTask(task);
    };
    task.status = 'running'; store.saveTask(task);
    event('started', `任务模式：${config.mode}；工具为模拟资料；追踪模式：${config.traceMode}。`);
    try {
      for (let step = 0; step < config.maxSteps; step++) {
        guard();
        if (config.stepDelayMs) await delay(config.stepDelayMs, undefined, { signal });
        guard(); spend(MODEL_UNITS);
        const action = await trace.span('agent.decision', 'llm', { step, evidenceCount: state.evidence.length, searches: state.searches }, () => bounded(() => this.decide(state, { signal: operationSignal })));
        guard();
        if (!action || !['search', 'read_page', 'calculate', 'save_report', 'finish'].includes(action.tool) || !action.args || typeof action.args !== 'object') throw new Error('INVALID_ACTION');
        event('decision', action.summary || '模拟模型返回结构化动作。', { step: step + 1, tool: action.tool });
        if (action.tool === 'finish') {
          if (!state.report) throw new Error('MISSING_REPORT');
          finalStatus = 'completed'; break;
        }
        if (action.tool === 'search') {
          if (state.searches >= config.maxSearches) throw new Error('SEARCH_LIMIT');
          if (typeof action.args.query !== 'string' || action.args.query.length > 2000) throw new Error('INVALID_ACTION');
          state.searches++;
        }
        if (action.tool === 'read_page') {
          if (state.pages >= config.maxPages) throw new Error('PAGE_LIMIT');
          if (!state.allowedUrls.has(action.args.url) || state.readUrls.has(action.args.url)) throw new Error('INVALID_SOURCE');
          state.pages++; state.readUrls.add(action.args.url);
        }
        spend(TOOL_UNITS[action.tool]);
        const output = await trace.span(`tool.${action.tool}`, 'tool', action.args, () => bounded(() => this.tool(action, state, { signal: operationSignal })));
        guard();
        state.observations.push(redact({ tool: action.tool, args: action.args, output: action.tool === 'save_report' ? { saved: true } : output }));
        if (action.tool === 'search') for (const doc of output.results) {
          // Mock tools accept fixture URLs only: no user-selected URL can cause SSRF or egress.
          if (!/^https:\/\/docs\.example\.test\/[a-z-]+$/.test(doc.url)) throw new Error('INVALID_SOURCE');
          state.allowedUrls.add(doc.url);
        }
        if (action.tool === 'read_page' && !output.error) state.evidence.push(redact(output));
        if (action.tool === 'calculate') state.calculation = output;
        if (action.tool === 'save_report') {
          if (output.error || typeof output.markdown !== 'string' || !output.markdown.trim()) throw new Error('INVALID_REPORT');
          state.report = output.markdown;
        }
        event(output.error ? 'tool-error' : 'tool-result', output.error || `${action.tool} 完成（模拟）`, { tool: action.tool, output });
        // Saving a valid report commits the result. Never pay for another decision
        // merely to ask the model to acknowledge completion or repeat its report.
        if (action.tool === 'save_report') { finalStatus = 'completed'; break; }
      }
      if (finalStatus !== 'completed') event('limit', '已达到步骤上限，停止继续调用。');
    } catch (error) {
      const reason = signal.aborted || error.name === 'AbortError' ? 'CANCELLED' : error.message;
      finalStatus = reason === 'CANCELLED' ? 'cancelled' : ['TASK_BUDGET', 'MODEL_BUDGET', 'MODEL_CONTEXT_LIMIT', 'DEADLINE', 'SEARCH_LIMIT', 'PAGE_LIMIT'].includes(reason) ? 'limited' : 'failed';
      const messages = { CANCELLED: '任务已取消。', MODEL_BUDGET: '已达到首次验证累计预算或单任务预留上限，停止调用。', MODEL_CONTEXT_LIMIT: '上下文达到保守输入上限，停止调用。', QWEN_USAGE_OUTSIDE_BOUND: '实际 usage 超出预留边界，已锁定后续模型调用，请核对账单。', QWEN_USAGE_MISSING: '响应缺少 usage，保留全额预留，不自动重试。', QWEN_REQUEST_FAILED: '模型请求失败；保留全额预留，不自动重试。', QWEN_REQUEST_STOPPED: '模型请求超时或中断；保留全额预留，不自动重试。', TASK_BUDGET: '已达到本次模拟流程预算。', DEADLINE: '已达到任务时长上限。', SEARCH_LIMIT: '已达到搜索次数上限。', PAGE_LIMIT: '已达到网页读取次数上限。', INVALID_ACTION: '模型返回了不允许或无效的动作，已拦截。', INVALID_SOURCE: '模型尝试读取未授权来源，已拦截。' };
      event('stopped', messages[reason] || '任务失败，保留已有结果供检查。', { reason: messages[reason] ? reason : 'PROVIDER_ERROR' });
    }
    taskController.abort();
    task.status = finalStatus;
    task.report = state.report || (config.mode === 'qwen' ? '# 技术调研（部分结果）\n\nQwen 流程未生成完整报告。搜索与网页均为合成资料，未联网调研；请查看行动记录与费用预留。' : buildReport(state, true));
    if (config.mode === 'qwen') { task.modelBilling = store.trialBudget(config, task.id); task.actualCostYuan = null; }
    task.stats = { searches: state.searches, pages: state.pages, evidenceCount: state.evidence.length, elapsedMs: Date.now() - started };
    task.traceStatus = await trace.finish({ status: finalStatus, stats: task.stats, estimated_mock_cost_yuan: task.estimatedCostUnits / 10_000, actual_cost_yuan: task.actualCostYuan });
    store.saveTask(task);
    event('finished', '任务已结束，报告与追踪已保存在本地。', { status: task.status, traceStatus: task.traceStatus });
    return task;
  }
}
