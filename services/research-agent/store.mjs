import { DatabaseSync } from 'node:sqlite';
import { mkdirSync, openSync, closeSync, writeFileSync, readFileSync, unlinkSync } from 'node:fs';
import { join } from 'node:path';
import { randomUUID } from 'node:crypto';

// Stable campaign identity: config changes/restarts must never reset this allowance.
const VALIDATION_ID = 'mem0-qwen-v1';
const WEB_VALIDATION_ID = 'tavily-v1';

export class Store {
  constructor(dataDir, clock = () => Date.now()) {
    mkdirSync(dataDir, { recursive: true, mode: 0o700 });
    this.lockPath = join(dataDir, 'service.lock');
    const acquire = () => {
      const handle = openSync(this.lockPath, 'wx', 0o600);
      writeFileSync(handle, String(process.pid)); closeSync(handle);
    };
    try { acquire(); } catch (error) {
      if (error.code !== 'EEXIST') throw error;
      const pid = Number(readFileSync(this.lockPath, 'utf8'));
      if (!Number.isInteger(pid) || pid < 1) throw new Error('Invalid local service lock; inspect it before recovery.');
      try { process.kill(pid, 0); throw new Error('This data directory already has a running service.'); }
      catch (probe) { if (probe.code !== 'ESRCH') throw probe; }
      unlinkSync(this.lockPath); acquire();
    }
    this.clock = clock;
    try { this.db = new DatabaseSync(join(dataDir, 'agent.sqlite')); }
    catch (error) { unlinkSync(this.lockPath); throw error; }
    this.db.exec(`PRAGMA journal_mode=WAL; PRAGMA foreign_keys=ON;
      CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS sessions (hash TEXT PRIMARY KEY, created INTEGER NOT NULL, seen INTEGER NOT NULL);
      CREATE TABLE IF NOT EXISTS attempts (key TEXT PRIMARY KEY, failures INTEGER NOT NULL, since INTEGER NOT NULL);
      CREATE TABLE IF NOT EXISTS tasks (id TEXT PRIMARY KEY, created INTEGER NOT NULL, day TEXT NOT NULL, month TEXT NOT NULL,
        status TEXT NOT NULL, reserved INTEGER NOT NULL, spent INTEGER NOT NULL DEFAULT 0, body TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS events (id INTEGER PRIMARY KEY, task_id TEXT NOT NULL REFERENCES tasks(id), body TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS traces (id INTEGER PRIMARY KEY, task_id TEXT NOT NULL, body TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS wire (id INTEGER PRIMARY KEY, task_id TEXT NOT NULL, body TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS feedback (task_id TEXT PRIMARY KEY REFERENCES tasks(id), score INTEGER NOT NULL, note TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS model_calls (id TEXT PRIMARY KEY, task_id TEXT NOT NULL REFERENCES tasks(id),
        reserved_units INTEGER NOT NULL, state TEXT NOT NULL, body TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS cloud_dispatch (task_id TEXT PRIMARY KEY REFERENCES tasks(id));
      CREATE TABLE IF NOT EXISTS memory_operations (id TEXT PRIMARY KEY, task_id TEXT REFERENCES tasks(id),
        kind TEXT NOT NULL, created INTEGER NOT NULL, status TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS memory_model_calls (id TEXT PRIMARY KEY, operation_id TEXT NOT NULL REFERENCES memory_operations(id),
        reserved_units INTEGER NOT NULL, state TEXT NOT NULL, body TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS tool_calls (id TEXT PRIMARY KEY, task_id TEXT NOT NULL REFERENCES tasks(id),
        reserved_units INTEGER NOT NULL, state TEXT NOT NULL, body TEXT NOT NULL);
    `);
    this.db.prepare("UPDATE memory_operations SET status='interrupted' WHERE status='running'").run();
    // A previous process cannot still own work after a restart. Retain spent mock units; release the remainder.
    for (const row of this.db.prepare("SELECT * FROM tasks WHERE status IN ('queued','running')").all()) {
      const body = JSON.parse(row.body);
      body.status = 'interrupted'; body.message = '服务重启中断了任务，可查看已有记录后重新发起。';
      this.db.prepare('UPDATE tasks SET status=?, reserved=0, body=? WHERE id=?').run('interrupted', JSON.stringify(body), row.id);
    }
  }
  getSetting(key) { return this.db.prepare('SELECT value FROM settings WHERE key=?').get(key)?.value; }
  setSetting(key, value) { this.db.prepare('INSERT OR REPLACE INTO settings VALUES (?,?)').run(key, value); }
  createPassword(hash) {
    return this.db.prepare("INSERT OR IGNORE INTO settings VALUES ('password',?)").run(hash).changes === 1;
  }
  createSession(hash) { const now = this.clock(); this.db.prepare('INSERT INTO sessions VALUES (?,?,?)').run(hash, now, now); }
  session(hash, config) {
    const row = this.db.prepare('SELECT * FROM sessions WHERE hash=?').get(hash);
    const now = this.clock();
    if (!row || now - row.created >= config.sessionMs || now - row.seen >= config.idleMs) {
      this.deleteSession(hash); return false;
    }
    this.db.prepare('UPDATE sessions SET seen=? WHERE hash=?').run(now, hash); return true;
  }
  deleteSession(hash) { this.db.prepare('DELETE FROM sessions WHERE hash=?').run(hash); }
  loginAllowed(key, config) {
    const row = this.db.prepare('SELECT * FROM attempts WHERE key=?').get(key);
    return !row || this.clock() - row.since >= config.loginWindowMs || row.failures < config.loginMaxFailures;
  }
  failedLogin(key, config) {
    const now = this.clock();
    const row = this.db.prepare('SELECT * FROM attempts WHERE key=?').get(key);
    if (!row || now - row.since >= config.loginWindowMs) this.db.prepare('INSERT OR REPLACE INTO attempts VALUES (?,?,?)').run(key, 1, now);
    else this.db.prepare('UPDATE attempts SET failures=failures+1 WHERE key=?').run(key);
  }
  clearAttempts(key) { this.db.prepare('DELETE FROM attempts WHERE key=?').run(key); }
  periods() {
    const day = new Date(this.clock() + 8 * 3600_000).toISOString().slice(0, 10);
    return { day, month: day.slice(0, 7) };
  }
  budget(config) {
    const { day, month } = this.periods();
    const sum = (column, value) => this.db.prepare(`SELECT COALESCE(SUM(spent+reserved),0) AS total FROM tasks WHERE ${column}=?`).get(value).total;
    return { day, month, dayUsedUnits: sum('day', day), monthUsedUnits: sum('month', month), dayLimitUnits: config.dayBudgetUnits, monthLimitUnits: config.monthBudgetUnits, actualCostYuan: 0, simulated: true };
  }
  createTask(input, config) {
    this.db.exec('BEGIN IMMEDIATE');
    try {
      if (this.db.prepare("SELECT id FROM tasks WHERE status IN ('queued','running')").get()) throw new Error('BUSY');
      const budget = this.budget(config);
      if (budget.dayUsedUnits + input.budgetUnits > config.dayBudgetUnits || budget.monthUsedUnits + input.budgetUnits > config.monthBudgetUnits) throw new Error('BUDGET_EXCEEDED');
      const task = { id: randomUUID(), createdAt: new Date(this.clock()).toISOString(), status: 'queued', ...input,
        ...(config.toolsMode === 'tavily' ? { budgetUnits: Math.min(input.budgetUnits, config.webValidationBudgetUnits, 3000) } : {}),
        estimatedCostUnits: 0, actualCostYuan: config.mode === 'mock' && config.memoryMode !== 'qwen' ? 0 : null, simulated: config.mode === 'mock',
        mode: config.mode, traceMode: config.traceMode, toolsMode: config.toolsMode || 'mock', toolsSimulated: config.toolsMode !== 'tavily', traceStatus: 'pending', report: null };
      this.db.prepare('INSERT INTO tasks(id,created,day,month,status,reserved,body) VALUES (?,?,?,?,?,?,?)').run(task.id, this.clock(), budget.day, budget.month, 'queued', task.budgetUnits, JSON.stringify(task));
      this.db.exec('COMMIT'); return task;
    } catch (error) { this.db.exec('ROLLBACK'); throw error; }
  }
  task(id) {
    const row = this.db.prepare('SELECT body FROM tasks WHERE id=?').get(id);
    return row ? JSON.parse(row.body) : null;
  }
  saveTask(task) {
    const active = ['queued', 'running'].includes(task.status);
    this.db.prepare('UPDATE tasks SET status=?, spent=?, reserved=?, body=? WHERE id=?').run(task.status, task.estimatedCostUnits,
      active ? Math.max(0, task.budgetUnits - task.estimatedCostUnits) : 0, JSON.stringify(task), task.id);
  }
  listTasks() { return this.db.prepare('SELECT body FROM tasks ORDER BY created DESC, rowid DESC LIMIT 100').all().map(row => JSON.parse(row.body)); }
  trialBudget(config, taskId) {
    const rows = taskId
      ? this.db.prepare(`SELECT reserved_units,body,state FROM model_calls WHERE task_id=?
          UNION ALL SELECT c.reserved_units,c.body,c.state FROM memory_model_calls c
          JOIN memory_operations o ON o.id=c.operation_id WHERE o.task_id=?
          UNION ALL SELECT reserved_units,body,state FROM tool_calls WHERE task_id=?`).all(taskId, taskId, taskId)
      : this.db.prepare('SELECT reserved_units,body,state FROM model_calls UNION ALL SELECT reserved_units,body,state FROM memory_model_calls UNION ALL SELECT reserved_units,body,state FROM tool_calls').all();
    const usage = rows.map(row => JSON.parse(row.body));
    const validationRows = rows.filter((row, index) => usage[index].pricingSnapshot?.validationId === VALIDATION_ID);
    const webRows = rows.filter((row, index) => usage[index].pricingSnapshot?.webValidationId === WEB_VALIDATION_ID);
    const toolRows = rows.filter((row, index) => usage[index].pricingSnapshot?.provider === 'tavily');
    return { limitYuan: Math.min(config.trialBudgetUnits, 50_000) / 10_000,
      reservedYuan: rows.reduce((total, row) => total + row.reserved_units, 0) / 10_000,
      usageEstimateYuan: Number(usage.reduce((total, body) => total + (body.usageEstimateYuan || 0), 0).toFixed(6)),
      uncertainCalls: rows.filter(row => row.state !== 'measured').length, calls: rows.length,
      toolCalls: toolRows.length, toolReservedYuan: toolRows.reduce((total, row) => total + row.reserved_units, 0) / 10_000,
      toolUsageEstimateYuan: Number(usage.reduce((total, body) => total + (body.toolUsageEstimateYuan || 0), 0).toFixed(6)),
      locked: this.getSetting('model-budget-locked') === 'true',
      validation: { id: VALIDATION_ID, limitYuan: Math.min(config.validationBudgetUnits ?? 5000, config.trialBudgetUnits, 50_000) / 10_000,
        reservedYuan: validationRows.reduce((total, row) => total + row.reserved_units, 0) / 10_000, calls: validationRows.length },
      webValidation: { id: WEB_VALIDATION_ID, limitYuan: Math.min(config.webValidationBudgetUnits ?? 3000, config.trialBudgetUnits, 50_000) / 10_000,
        reservedYuan: webRows.reduce((total, row) => total + row.reserved_units, 0) / 10_000, calls: webRows.length },
      accounting: 'conservative-no-refund', vendorBillVerified: false };
  }
  createMemoryOperation(kind, taskId = null) {
    const id = randomUUID();
    this.db.prepare('INSERT INTO memory_operations VALUES (?,?,?,?,?)').run(id, taskId, kind, this.clock(), 'running');
    return id;
  }
  finishMemoryOperation(id, status) {
    this.db.prepare('UPDATE memory_operations SET status=? WHERE id=?').run(status, id);
  }
  reserveModelCall(taskId, units, config, pricingSnapshot = {}, operationId = null) {
    return this.reserveCall(taskId, units, config, pricingSnapshot, { operationId });
  }
  reserveToolCall(taskId, units, config, pricingSnapshot) {
    return this.reserveCall(taskId, units, config, pricingSnapshot, { tool: true });
  }
  reserveCall(taskId, units, config, pricingSnapshot, { operationId = null, tool = false } = {}) {
    if (!Number.isSafeInteger(units) || units < 1) throw new Error('INVALID_RESERVATION');
    this.db.exec('BEGIN IMMEDIATE');
    try {
      const operation = operationId ? this.db.prepare('SELECT * FROM memory_operations WHERE id=?').get(operationId) : null;
      if (operationId && (!operation || operation.status !== 'running' || operation.task_id !== taskId)) throw new Error('MODEL_OPERATION_INVALID');
      const task = taskId ? this.task(taskId) : null, budget = this.trialBudget(config);
      if ((!operation && !task) || (taskId && !task) || budget.locked
        || Math.round(budget.reservedYuan * 10_000) + units > Math.min(config.trialBudgetUnits, 50_000)
        || (task && Math.round(this.trialBudget(config, taskId).reservedYuan * 10_000) + units > task.budgetUnits)) throw new Error('MODEL_BUDGET');
      if (Math.round(budget.validation.reservedYuan * 10_000) + units > Math.min(config.validationBudgetUnits ?? 5000, config.trialBudgetUnits, 50_000)) throw new Error('VALIDATION_BUDGET');
      // Standalone memory actions while Tavily is enabled share the same first
      // validation allowance, even without a task foreign key.
      const web = config.toolsMode === 'tavily' || task?.toolsMode === 'tavily';
      if (tool && (!web || config.toolsMode !== 'tavily' || config.allowWebTools !== true)) throw new Error('WEB_TOOLS_NOT_AUTHORIZED');
      if (web && Math.round(budget.webValidation.reservedYuan * 10_000) + units > Math.min(config.webValidationBudgetUnits ?? 3000, config.trialBudgetUnits, 50_000)) throw new Error('WEB_VALIDATION_BUDGET');
      const id = randomUUID();
      // No refunds, including on cancellation, errors, process death or timeout.
      const table = tool ? 'tool_calls' : operation ? 'memory_model_calls' : 'model_calls';
      this.db.prepare(`INSERT INTO ${table} VALUES (?,?,?,?,?)`)
        .run(id, operationId || taskId, units, 'uncertain', JSON.stringify({ pricingSnapshot: { ...pricingSnapshot, validationId: VALIDATION_ID,
          ...(web ? { webValidationId: WEB_VALIDATION_ID } : {}) } }));
      this.db.exec('COMMIT'); return id;
    } catch (error) { this.db.exec('ROLLBACK'); throw error; }
  }
  recordModelUsage(id, usage) {
    const table = this.db.prepare('SELECT id FROM model_calls WHERE id=?').get(id) ? 'model_calls' : 'memory_model_calls';
    this.recordUsage(table, id, usage);
  }
  recordToolUsage(id, usage) { this.recordUsage('tool_calls', id, usage); }
  recordUsage(table, id, usage) {
    const row = this.db.prepare(`SELECT body FROM ${table} WHERE id=?`).get(id);
    if (!row) throw new Error('MODEL_RESERVATION_MISSING');
    this.db.prepare(`UPDATE ${table} SET state=?,body=? WHERE id=?`).run('measured', JSON.stringify({ ...JSON.parse(row.body), ...usage }), id);
  }
  lockModelBudget() { this.setSetting('model-budget-locked', 'true'); }
  claimCloudTrace(taskId, maxTraces) {
    this.db.exec('BEGIN IMMEDIATE');
    try {
      if (this.db.prepare('SELECT COUNT(*) AS count FROM cloud_dispatch').get().count >= Math.min(maxTraces, 20)
        || this.db.prepare('SELECT task_id FROM cloud_dispatch WHERE task_id=?').get(taskId)) throw new Error('CLOUD_TRIAL_LIMIT');
      this.db.prepare('INSERT INTO cloud_dispatch VALUES (?)').run(taskId);
      this.db.exec('COMMIT');
    } catch (error) { this.db.exec('ROLLBACK'); throw error; }
  }
  event(taskId, event) { this.db.prepare('INSERT INTO events(task_id,body) VALUES (?,?)').run(taskId, JSON.stringify({ time: new Date(this.clock()).toISOString(), ...event })); }
  events(taskId) { return this.db.prepare('SELECT id,body FROM events WHERE task_id=? ORDER BY id').all(taskId).map(row => ({ id: row.id, ...JSON.parse(row.body) })); }
  trace(taskId, run) { this.db.prepare('INSERT INTO traces(task_id,body) VALUES (?,?)').run(taskId, JSON.stringify(run)); }
  traces(taskId) { return this.db.prepare('SELECT body FROM traces WHERE task_id=? ORDER BY id').all(taskId).map(row => JSON.parse(row.body)); }
  wire(taskId, payload) { this.db.prepare('INSERT INTO wire(task_id,body) VALUES (?,?)').run(taskId, JSON.stringify(payload)); }
  wires(taskId) { return this.db.prepare('SELECT body FROM wire WHERE task_id=? ORDER BY id').all(taskId).map(row => JSON.parse(row.body)); }
  feedback(taskId, score, note) { this.db.prepare('INSERT OR REPLACE INTO feedback VALUES (?,?,?)').run(taskId, score, note); }
  close() { this.db.close(); unlinkSync(this.lockPath); }
}
