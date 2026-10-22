const base = new URL('.', location.href).pathname;
const $ = (id) => document.getElementById(id);
const yuan = (units = 0) => `¥${(units / 10000).toFixed(4)}`;
const statusText = { queued: '排队中', running: '调研中', completed: '已完成', cancelled: '已取消', limited: '达到限制', failed: '失败', interrupted: '重启中断' };
const traceText = { pending: '准备中', 'sdk-offline-verified': 'SDK · 本地已记录', 'failed-local-retained': '失败 · 本地已保留', 'cloud-api-accepted': '云端 API 已接收', 'cloud-limit-local-retained': '云端试验上限 · 本地保留' };
let currentId = null, currentTask = null, pollTimer = null, historyTasks = [];

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
function appendInline(parent, text) {
  const links = /\[([^\]]+)\]\((https:\/\/[^\s)]+)\)/g;
  let end = 0;
  for (const match of text.matchAll(links)) {
    parent.append(document.createTextNode(text.slice(end, match.index)));
    const link = node('a', match[1]); link.href = match[2]; link.target = '_blank'; link.rel = 'noopener noreferrer';
    parent.append(link); end = match.index + match[0].length;
  }
  parent.append(document.createTextNode(text.slice(end)));
}
// Render the supported report subset with DOM text nodes. Never execute provider HTML.
function renderReport(markdown, target) {
  target.replaceChildren();
  const lines = markdown.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]; if (!line.trim()) continue;
    if (line.startsWith('|') && lines[i + 1]?.match(/^\|\s*[-:]/)) {
      const table = node('table', undefined, 'report-table');
      const header = node('tr');
      for (const cell of line.split('|').slice(1, -1)) header.append(node('th', cell.trim()));
      table.append(header); i++;
      while (lines[i + 1]?.startsWith('|')) {
        const row = node('tr');
        for (const cell of lines[++i].split('|').slice(1, -1)) row.append(node('td', cell.trim()));
        table.append(row);
      }
      target.append(table); continue;
    }
    const heading = /^(#{1,3})\s+(.+)$/.exec(line);
    const item = heading ? node(`h${heading[1].length}`, heading[2]) : node(line.startsWith('> ') ? 'blockquote' : 'p');
    if (!heading) appendInline(item, line.replace(/^> /, ''));
    target.append(item);
  }
}

async function loginPage() {
  const auth = await api('auth/status');
  if (auth.authenticated) { location.replace(base); return; }
  $('access-tag').textContent = auth.accessScope === 'password-protected-https' ? 'PRIVATE' : 'LOCAL';
  $('access-location').textContent = auth.accessScope === 'password-protected-https' ? 'HTTPS · 密码保护' : '127.0.0.1 · 仅本机';
  $('login-runtime-notice').textContent = `模型 ${auth.mode} · 追踪 ${auth.traceMode}。搜索和网页为合成资料，不联网搜索；报告不代表实时调研。`;
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
  const { budget, trialBudget = { reservedYuan: 0, limitYuan: 5, usageEstimateYuan: 0 }, mode, traceMode } = await api('status');
  $('mode-badge').textContent = mode === 'qwen' ? 'QWEN · 模拟资料' : 'MOCK MODE';
  $('runtime-status').textContent = `模型 ${mode} · 追踪 ${traceMode}`;
  $('runtime-notice').textContent = mode === 'qwen' ? `Qwen 模型已启用，搜索和网页仍为合成资料。追踪模式 ${traceMode}；报告不代表实时调研。` : `模型、搜索和网页为合成响应。追踪模式 ${traceMode}；报告不代表实时事实。`;
  for (const option of $('scenario').options) option.disabled = mode === 'qwen' && option.value !== 'standard';
  if (mode === 'qwen') $('scenario').value = 'standard';
  $('budget-status').textContent = `模拟流程账本：今日 ${yuan(budget.dayUsedUnits)} / ${yuan(budget.dayLimitUnits)} · 本月 ${yuan(budget.monthUsedUnits)} / ${yuan(budget.monthLimitUnits)}。首次模型验证累计预留 ¥${trialBudget.reservedYuan.toFixed(4)} / ¥${trialBudget.limitYuan.toFixed(2)}（重启不清零、不退款）。usage 估算 ¥${trialBudget.usageEstimateYuan.toFixed(6)}，未核对供应商账单。`;
}
function displayTask(task, events) {
  currentTask = task;
  const active = ['running', 'queued'].includes(task.status);
  $('task-status').textContent = statusText[task.status]; $('estimated-cost').textContent = yuan(task.estimatedCostUnits);
  $('trace-status').textContent = traceText[task.traceStatus] || task.traceStatus;
  $('model-cost').textContent = task.simulated ? '¥0.0000' : task.modelBilling ? `¥${task.modelBilling.usageEstimateYuan.toFixed(6)}` : '待核算';
  $('cancel-task').hidden = !active; $('start-task').disabled = active;
  const activity = $('activity'); const atBottom = activity.scrollTop + activity.clientHeight >= activity.scrollHeight - 30;
  activity.replaceChildren();
  for (const event of events) {
    const row = node('div', undefined, 'event');
    row.append(node('small', new Date(event.time).toLocaleTimeString('zh-CN', { hour12: false })), node('p', event.message));
    if (event.output) { const details = node('details'); details.append(node('summary', '查看工具响应（模拟）'), node('pre', JSON.stringify(event.output, null, 2))); row.append(details); }
    activity.append(row);
  }
  if (atBottom) activity.scrollTop = activity.scrollHeight;
  $('report-empty').hidden = !!task.report; $('report').hidden = !task.report;
  if (task.report) renderReport(task.report, $('report'));
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
  await updateHistory(); await updateBudget();
  const active = historyTasks.find(task => ['running', 'queued'].includes(task.status)); if (active) await selectTask(active.id);
}

(document.body.dataset.page === 'login' ? loginPage() : workspacePage()).catch(error => {
  const target = $('auth-error') || $('task-error'); if (target) target.textContent = error.message;
});
