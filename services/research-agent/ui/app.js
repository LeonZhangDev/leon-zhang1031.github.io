import { renderMarkdown as renderReport } from './markdown.mjs';

const base = new URL('.', location.href).pathname;
const $ = (id) => document.getElementById(id);
const yuan = (units = 0) => `¥${(units / 10000).toFixed(4)}`;
const statusText = { queued: '排队中', running: '调研中', completed: '已完成', cancelled: '已取消', limited: '达到限制', failed: '失败', interrupted: '重启中断' };
const traceText = { pending: '准备中', 'sdk-offline-verified': 'SDK · 本地已记录', 'failed-local-retained': '失败 · 本地已保留', 'cloud-api-accepted': '云端 API 已接收', 'cloud-limit-local-retained': '云端试验上限 · 本地保留' };
let currentId = null, currentTask = null, pollTimer = null, historyTasks = [];
let memoryBusy = false;

async function api(path, options = {}) {
  const response = await fetch(`${base}api/${path}`, { credentials: 'same-origin', ...options,
    headers: { ...(options.body ? { 'content-type': 'application/json' } : {}), ...options.headers } });
  const body = await response.json();
  if (!response.ok) {
    if (response.status === 401 && !path.startsWith('auth/')) location.replace(base);
    throw new Error(body.error || '请求失败，请重试。');
  }
  return body;
}
const post = (path, body = {}) => api(path, { method: 'POST', body: JSON.stringify(body) });

function node(tag, text, className) {
  const item = document.createElement(tag);
  if (text !== undefined) item.textContent = text;
  if (className) item.className = className;
  return item;
}
async function loginPage() {
  const auth = await api('auth/status');
  if (auth.authenticated) { location.replace(base); return; }
  $('access-tag').textContent = auth.accessScope === 'password-protected-https' ? 'PRIVATE' : 'LOCAL';
  $('access-location').textContent = auth.accessScope === 'password-protected-https' ? 'HTTPS · 密码保护' : '127.0.0.1 · 仅本机';
  $('login-runtime-notice').textContent = `模型 ${auth.mode} · 追踪 ${auth.traceMode}。${auth.toolsMode === 'tavily' ? '搜索和网页读取使用 Tavily Basic；结论需结合来源核对。' : '搜索和网页为合成资料，不联网搜索；报告不代表实时调研。'}`;
  $('auth-title').textContent = auth.setupRequired ? '设置你的访问密码' : '进入私人工作台';
  $('auth-description').textContent = auth.setupRequired ? '首次使用，请设置至少 6 个字符的本地访问密码。没有默认密码。'
    : auth.accessScope === 'password-protected-https' ? '输入访问密码后继续。' : '输入密码后继续，只允许本机访问。';
  $('auth-submit').textContent = auth.setupRequired ? '设置密码并进入 ↗' : '进入工作台 ↗';
  $('auth-submit').disabled = false;
  $('password').autocomplete = auth.setupRequired ? 'new-password' : 'current-password';
  $('confirm-label').hidden = !auth.setupRequired; $('confirm-password').hidden = !auth.setupRequired;
  $('confirm-password').required = auth.setupRequired;
  $('auth-form').addEventListener('submit', async (event) => {
    event.preventDefault(); $('auth-error').textContent = '';
    if (auth.setupRequired && $('password').value !== $('confirm-password').value) { $('auth-error').textContent = '两次输入的密码不一致。'; return; }
    $('auth-submit').disabled = true;
    try { await post(`auth/${auth.setupRequired ? 'setup' : 'login'}`, { password: $('password').value }); $('password').value = ''; $('confirm-password').value = ''; location.replace(base); }
    catch (error) { $('auth-error').textContent = error.message; $('auth-submit').disabled = false; }
  });
}

async function updateHistory() {
  const data = await api('tasks'); historyTasks = data.tasks;
  $('history-count').textContent = String(historyTasks.length); $('history').replaceChildren();
  for (const task of historyTasks) {
    const button = node('button', `${task.goal.slice(0, 25)} · ${statusText[task.status]}`);
    button.type = 'button'; button.addEventListener('click', () => selectTask(task.id)); $('history').append(button);
  }
  const select = $('compare-task'); const previous = select.value;
  select.replaceChildren(node('option', '选择一条历史任务进行对比'));
  select.firstElementChild.value = '';
  for (const task of historyTasks.filter(task => task.id !== currentId)) {
    const option = node('option', `${task.goal.slice(0, 25)} · ${statusText[task.status]}`); option.value = task.id; select.append(option);
  }
  if ([...select.options].some(option => option.value === previous)) select.value = previous;
}
async function updateBudget() {
  const { budget, trialBudget = { reservedYuan: 0, limitYuan: 5, usageEstimateYuan: 0 }, mode, traceMode, memoryMode, toolsMode, limits } = await api('status');
  const realTools = toolsMode === 'tavily';
  $('mode-badge').textContent = realTools ? 'QWEN · TAVILY' : mode === 'qwen' ? 'QWEN · 模拟资料' : 'MOCK MODE';
  $('runtime-status').textContent = `模型 ${mode} · 记忆 ${memoryMode || 'offline'} · 追踪 ${traceMode}`;
  $('runtime-notice').textContent = realTools ? `Qwen 决策＋Tavily Basic 搜索与读取。引用须来自成功读取的网页；追踪模式 ${traceMode}。` : mode === 'qwen' ? `Qwen 模型已启用，搜索和网页仍为合成资料。追踪模式 ${traceMode}；报告不代表实时调研。` : `模型、搜索和网页为合成响应。追踪模式 ${traceMode}；报告不代表实时事实。`;
  $('budget').max = String(limits?.taskBudgetYuan ?? 2);
  if (Number($('budget').value) > Number($('budget').max)) $('budget').value = $('budget').max;
  $('budget-label').textContent = realTools ? '单次调用预留上限 / 元' : '单次模拟预算 / 元';
  $('task-limits').textContent = `最多 12 轮决策 / ${limits?.searches ?? 6} 次搜索 / ${limits?.pages ?? 8} 页资料。请勿输入密钥或其他敏感信息。`;
  for (const option of $('scenario').options) option.disabled = mode === 'qwen' && option.value !== 'standard';
  if (mode === 'qwen') $('scenario').value = 'standard';
  $('budget-status').textContent = `模拟流程账本：今日 ${yuan(budget.dayUsedUnits)} / ${yuan(budget.dayLimitUnits)} · 本月 ${yuan(budget.monthUsedUnits)} / ${yuan(budget.monthLimitUnits)}。全部真实调用累计预留 ¥${trialBudget.reservedYuan.toFixed(4)} / ¥${trialBudget.limitYuan.toFixed(2)}（重启不清零、不退款）。模型 usage 估算 ¥${trialBudget.usageEstimateYuan.toFixed(6)}，未核对供应商账单。`;
  if (trialBudget.validation) $('budget-status').textContent += ` 本轮新增验证预留 ¥${trialBudget.validation.reservedYuan.toFixed(4)} / ¥${trialBudget.validation.limitYuan.toFixed(2)}，包含在累计上限内。`;
  if (trialBudget.webValidation) $('budget-status').textContent += ` Tavily 首次验证累计预留 ¥${trialBudget.webValidation.reservedYuan.toFixed(4)} / ¥${trialBudget.webValidation.limitYuan.toFixed(2)}（含该任务的模型与记忆）。工具 ${trialBudget.toolCalls || 0} 次，等价预留 ¥${(trialBudget.toolReservedYuan || 0).toFixed(4)}，不代表现金账单。`;
}
function displayTask(task, events) {
  currentTask = task;
  const active = ['running', 'queued'].includes(task.status);
  $('task-status').textContent = statusText[task.status]; $('estimated-cost').textContent = yuan(task.estimatedCostUnits);
  $('trace-status').textContent = traceText[task.traceStatus] || task.traceStatus;
  $('model-cost').textContent = task.modelBilling ? `¥${task.modelBilling.usageEstimateYuan.toFixed(6)}` : task.simulated ? '¥0.0000' : '待核算';
  $('cancel-task').hidden = !active; $('start-task').disabled = active;
  const activity = $('activity'); const atBottom = activity.scrollTop + activity.clientHeight >= activity.scrollHeight - 30;
  activity.replaceChildren();
  for (const event of events) {
    const row = node('div', undefined, 'event');
    row.append(node('small', new Date(event.time).toLocaleTimeString('zh-CN', { hour12: false })), node('p', event.message));
    if (event.output) { const details = node('details'); details.append(node('summary', `查看工具响应（${event.output.provider === 'tavily' ? '联网工具' : event.output.simulated === true ? '模拟资料' : '本地工具'}）`), node('pre', JSON.stringify(event.output, null, 2))); row.append(details); }
    activity.append(row);
  }
  if (atBottom) activity.scrollTop = activity.scrollHeight;
  $('report-empty').hidden = !!task.report; $('report').hidden = !task.report;
  if (task.report && $('report-source').value !== task.report) {
    renderReport(task.report, $('report')); $('report-source').value = task.report;
  }
  $('report-source').hidden = !task.report || $('report-view').value !== 'source';
  $('report').hidden = !task.report || $('report-view').value !== 'preview';
  $('context-status').textContent = task.context ? `上下文：${task.context.strategy} · 版本 ${task.context.version} · UTF-8 保守边界 ${task.context.afterByteBound}/${task.context.limit}；未调用压缩模型。` : '';
  $('memory-used').textContent = (task.memoryUsed || []).length ? `本次召回：${task.memoryUsed.map(item => item.text).join('；')}` : '本次未召回长期记忆。';
  $('skills-used').textContent = `Skills：${(task.skills || []).map(item => `${item.id} v${item.version}`).join('、') || '未记录'}`;
  $('copy-report').disabled = !task.report; $('reuse-task').disabled = false;
  $('download-report').hidden = !task.report; $('download-report').href = `${base}api/tasks/${task.id}/report`;
  $('download-trace').hidden = active; $('download-trace').href = `${base}api/tasks/${task.id}/trace`;
  $('feedback-form').hidden = active || !task.report;
}
async function selectTask(id) {
  currentId = id; clearTimeout(pollTimer); $('task-error').textContent = ''; $('feedback-status').textContent = '';
  try {
    const { task, events } = await api(`tasks/${id}`); if (currentId !== id) return;
    displayTask(task, events); await updateHistory(); compareTasks(); await updateBudget();
    if (!['queued', 'running'].includes(task.status)) await refreshMemories();
    if (currentId === id && ['queued', 'running'].includes(task.status)) pollTimer = setTimeout(() => selectTask(id), 450);
  } catch (error) { $('task-error').textContent = error.message; }
}
function compareTasks() {
  const previous = historyTasks.find(task => task.id === $('compare-task').value);
  const panel = $('comparison'); panel.replaceChildren();
  if (!currentTask || !previous) return;
  const table = node('table', undefined, 'report-table');
  for (const cells of [
    ['指标', '当前任务', '历史任务'], ['目标', currentTask.goal, previous.goal],
    ['场景', currentTask.scenario, previous.scenario], ['状态', statusText[currentTask.status], statusText[previous.status]],
    ['有效来源', String(currentTask.stats?.evidenceCount ?? 0), String(previous.stats?.evidenceCount ?? 0)],
    ['模拟费用', yuan(currentTask.estimatedCostUnits), yuan(previous.estimatedCostUnits)],
  ]) { const row = node('tr'); for (const cell of cells) row.append(node('td', cell)); table.append(row); }
  panel.append(table, node('p', '以下为历史任务报告。可结合上方当前报告逐项比较；未执行模型评分。', 'small-copy'));
  const report = node('article', undefined, 'report'); renderReport(previous.report || '报告尚未生成。', report); panel.append(report);
}

async function workspacePage() {
  $('report-view').addEventListener('change', () => {
    $('report').hidden = !currentTask?.report || $('report-view').value !== 'preview';
    $('report-source').hidden = !currentTask?.report || $('report-view').value !== 'source';
  });
  $('memory-form').addEventListener('submit', async event => {
    event.preventDefault();
    await memoryAction({ action: 'add', text: $('memory-text').value, scope: $('memory-scope').value });
  });
  $('memory-enabled').addEventListener('change', () => memoryAction({ action: 'set-enabled', enabled: $('memory-enabled').checked }));
  $('extract-memory').addEventListener('click', () => memoryAction({ action: 'extract', text: $('memory-text').value }));
  $('logout').addEventListener('click', async () => {
    try { await post('auth/logout'); location.replace(base); } catch (error) { $('task-error').textContent = error.message; }
  });
  $('task-form').addEventListener('submit', async (event) => {
    event.preventDefault(); $('task-error').textContent = ''; $('start-task').disabled = true;
    try {
      const task = await post('tasks', { goal: $('goal').value, constraints: $('constraints').value, scenario: $('scenario').value, budgetYuan: Number($('budget').value) });
      await selectTask(task.id);
    } catch (error) { $('task-error').textContent = error.message; $('start-task').disabled = false; }
  });
  $('cancel-task').addEventListener('click', async () => { try { if (currentId) { await post(`tasks/${currentId}/cancel`); await selectTask(currentId); } } catch (error) { $('task-error').textContent = error.message; } });
  $('copy-report').addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(currentTask.report); $('copy-report').textContent = '已复制'; } catch { $('task-error').textContent = '浏览器未允许复制，请下载 Markdown。'; }
  });
  $('reuse-task').addEventListener('click', () => {
    if (!currentTask) return;
    $('goal').value = currentTask.goal; $('constraints').value = currentTask.constraints; $('scenario').value = currentTask.scenario; $('budget').value = currentTask.budgetUnits / 10000;
    $('goal').focus();
  });
  $('new-task').addEventListener('click', () => { $('task-form').reset(); $('goal').focus(); });
  $('compare-task').addEventListener('change', compareTasks);
  $('feedback-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    try { await post(`tasks/${currentId}/feedback`, { score: Number(event.submitter.value), note: $('feedback-note').value }); $('feedback-status').textContent = '反馈已保存在本地。'; }
    catch (error) { $('feedback-status').textContent = error.message; }
  });
  await updateHistory(); await updateBudget(); await refreshMemories();
  const active = historyTasks.find(task => ['running', 'queued'].includes(task.status)); if (active) await selectTask(active.id);
}

async function memoryAction(body) {
  if (memoryBusy) return;
  memoryBusy = true;
  try { await post('memories', body); $('memory-text').value = ''; $('memory-error').textContent = ''; }
  catch (error) { $('memory-error').textContent = error.message; }
  finally {
    try { await refreshMemories(); await updateBudget(); }
    catch (error) { $('memory-error').textContent = error.message; }
    memoryBusy = false;
  }
}
async function refreshMemories() {
  const data = await api('memories'); $('memory-enabled').checked = data.enabled;
  $('extract-memory').disabled = data.mode !== 'mem0-oss-qwen' || !data.enabled;
  $('memory-mode').textContent = `Mem0 OSS · ${data.mode === 'mem0-oss-qwen' ? 'Qwen 语义向量' : '本地模拟向量'}。明确提交的内容直接保存；抽取候选需确认后才参与召回。网页和报告不会自动入库，当前任务约束优先。`;
  $('memory-list').replaceChildren();
  for (const memory of data.memories) {
    const row = node('div', undefined, 'memory-item');
    const text = node('textarea'); text.value = memory.memory; text.maxLength = 500;
    text.setAttribute('aria-label', '记忆内容');
    row.append(node('small', `${memory.metadata.scope === 'user' ? '用户' : '当前项目'} · ${memory.metadata.enabled ? '启用' : '停用'} · ${memory.metadata.source === 'confirmed-user' ? '用户已确认' : '显式用户来源'}`), text);
    for (const [label, action] of [['保存修改', 'update'], [memory.metadata.enabled ? '停用' : '启用', 'toggle'], ['删除', 'forget']]) {
      const button = node('button', label, 'text-button'); button.type = 'button';
      button.addEventListener('click', () => memoryAction({ action, id: memory.id, text: text.value })); row.append(button);
    }
    $('memory-list').append(row);
  }
  for (const memory of data.candidates || []) {
    const row = node('div', undefined, 'memory-item');
    row.append(node('small', '候选记忆 · 尚未参与召回'), node('p', memory.memory), node('small', `原文依据：${memory.metadata.sourceQuote}`));
    for (const [label, action] of [['确认记住', 'confirm'], ['丢弃', 'reject']]) {
      const button = node('button', label, 'text-button'); button.type = 'button';
      button.addEventListener('click', () => memoryAction({ action, id: memory.id })); row.append(button);
    }
    $('memory-list').append(row);
  }
}

(document.body.dataset.page === 'login' ? loginPage() : workspacePage()).catch(error => {
  const target = $('auth-error') || $('task-error'); if (target) target.textContent = error.message;
});
