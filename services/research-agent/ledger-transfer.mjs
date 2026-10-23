import { DatabaseSync } from 'node:sqlite';
import { readFileSync, writeFileSync, realpathSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { loadConfig } from './config.mjs';
import { Store } from './store.mjs';

const tables = {
  tasks: ['id', 'created', 'day', 'month', 'status', 'reserved', 'spent', 'body'],
  memory_operations: ['id', 'task_id', 'kind', 'created', 'status'],
  model_calls: ['id', 'task_id', 'reserved_units', 'state', 'body'],
  memory_model_calls: ['id', 'operation_id', 'reserved_units', 'state', 'body'],
  tool_calls: ['id', 'task_id', 'reserved_units', 'state', 'body'],
  cloud_dispatch: ['task_id'],
};
const primary = table => table === 'cloud_dispatch' ? 'task_id' : 'id';
const rows = (db, table) => db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name=?").get(table)
  ? db.prepare(`SELECT ${tables[table].join(',')} FROM ${table}`).all() : [];

// This private bundle deliberately excludes settings, credentials and sessions.
export function exportLedger(db) {
  const records = Object.fromEntries(Object.keys(tables).map(table => [table, rows(db, table)]));
  const referenced = new Set([...records.model_calls, ...records.memory_operations, ...records.tool_calls, ...records.cloud_dispatch].map(row => row.task_id).filter(Boolean));
  records.tasks = records.tasks.filter(row => referenced.has(row.id));
  // Old importers must reject this bundle rather than silently omit tool costs.
  return { version: 2, locked: db.prepare("SELECT value FROM settings WHERE key='model-budget-locked'").get()?.value === 'true', records };
}

export function planLedgerImport(db, bundle, config) {
  if (![1, 2].includes(bundle?.version) || typeof bundle.locked !== 'boolean' || !bundle.records) throw new Error('LEDGER_FORMAT');
  if (bundle.version === 1 && bundle.records.tool_calls?.length) throw new Error('LEDGER_FORMAT');
  const additions = {}, merged = {};
  for (const [table, columns] of Object.entries(tables)) {
    // v1 bundles made before Tavily have no tool_calls. Preserve their records.
    const incoming = bundle.version === 1 && table === 'tool_calls' && !Object.hasOwn(bundle.records, table) ? [] : bundle.records[table];
    if (!Array.isArray(incoming) || incoming.length > 10_000) throw new Error('LEDGER_FORMAT');
    const existing = new Map(rows(db, table).map(row => [row[primary(table)], row]));
    additions[table] = [];
    const seen = new Set();
    for (const row of incoming) {
      if (!row || Object.keys(row).length !== columns.length || columns.some(key => !Object.hasOwn(row, key))
        || typeof row[primary(table)] !== 'string' || seen.has(row[primary(table)])) throw new Error('LEDGER_FORMAT');
      seen.add(row[primary(table)]);
      if (['tasks', 'memory_operations'].includes(table) && ['queued', 'running'].includes(row.status)) throw new Error('LEDGER_ACTIVE_WORK');
      if (table.endsWith('model_calls') || table === 'tool_calls') {
        if (!Number.isSafeInteger(row.reserved_units) || row.reserved_units < 1 || !['measured', 'uncertain'].includes(row.state)) throw new Error('LEDGER_FORMAT');
        try { if (!JSON.parse(row.body) || Array.isArray(JSON.parse(row.body))) throw new Error(); } catch { throw new Error('LEDGER_FORMAT'); }
      }
      const old = existing.get(row[primary(table)]);
      // Keep the destination task body (its trace/report state can be newer).
      // Paid records and operations must agree exactly; never resolve conflicts by overwriting.
      if (old && table !== 'tasks' && columns.some(key => old[key] !== row[key])) throw new Error('LEDGER_CONFLICT');
      if (!old) { additions[table].push(row); existing.set(row[primary(table)], row); }
    }
    merged[table] = existing;
  }
  if ([...merged.tasks.values()].some(row => ['queued', 'running'].includes(row.status))
    || [...merged.memory_operations.values()].some(row => row.status === 'running')) throw new Error('LEDGER_ACTIVE_WORK');
  for (const row of merged.model_calls.values()) if (!merged.tasks.has(row.task_id)) throw new Error('LEDGER_REFERENCE');
  for (const row of merged.memory_operations.values()) if (row.task_id && !merged.tasks.has(row.task_id)) throw new Error('LEDGER_REFERENCE');
  for (const row of merged.memory_model_calls.values()) if (!merged.memory_operations.has(row.operation_id)) throw new Error('LEDGER_REFERENCE');
  for (const row of merged.tool_calls.values()) if (!merged.tasks.has(row.task_id)) throw new Error('LEDGER_REFERENCE');
  for (const row of merged.cloud_dispatch.values()) if (!merged.tasks.has(row.task_id)) throw new Error('LEDGER_REFERENCE');
  const calls = [...merged.model_calls.values(), ...merged.memory_model_calls.values(), ...merged.tool_calls.values()];
  const reservedUnits = calls.reduce((sum, row) => sum + row.reserved_units, 0);
  const validationUnits = calls.filter(row => JSON.parse(row.body).pricingSnapshot?.validationId === 'mem0-qwen-v1').reduce((sum, row) => sum + row.reserved_units, 0);
  const webValidationUnits = calls.filter(row => JSON.parse(row.body).pricingSnapshot?.webValidationId === 'tavily-v1').reduce((sum, row) => sum + row.reserved_units, 0);
  if (reservedUnits > Math.min(config.trialBudgetUnits, 50_000) || validationUnits > Math.min(config.validationBudgetUnits, 5000)
    || webValidationUnits > Math.min(config.webValidationBudgetUnits ?? 3000, 3000)) throw new Error('LEDGER_BUDGET');
  return { additions, summary: { added: Object.fromEntries(Object.entries(additions).map(([table, values]) => [table, values.length])),
    calls: calls.length, reservedYuan: reservedUnits / 10_000, validationReservedYuan: validationUnits / 10_000, webValidationReservedYuan: webValidationUnits / 10_000,
    uncertainCalls: calls.filter(row => row.state === 'uncertain').length, locked: bundle.locked || db.prepare("SELECT value FROM settings WHERE key='model-budget-locked'").get()?.value === 'true' } };
}

export function importLedger(store, bundle, config) {
  store.db.exec('BEGIN IMMEDIATE');
  try {
    const plan = planLedgerImport(store.db, bundle, config);
    for (const [table, records] of Object.entries(plan.additions)) {
      const columns = tables[table], insert = store.db.prepare(`INSERT INTO ${table} (${columns.join(',')}) VALUES (${columns.map(() => '?').join(',')})`);
      for (const row of records) insert.run(...columns.map(key => row[key]));
    }
    if (plan.summary.locked) store.setSetting('model-budget-locked', 'true');
    store.db.exec('COMMIT'); return plan.summary;
  } catch (error) { store.db.exec('ROLLBACK'); throw error; }
}

if (process.argv[1] && import.meta.url === pathToFileURL(realpathSync(process.argv[1])).href) {
  const [action, dataDir, file, flag] = process.argv.slice(2);
  if (!['export', 'inspect', 'import'].includes(action) || !dataDir || !file || (action === 'import' ? flag !== '--apply' : flag !== undefined)) throw new Error('Usage: ledger-transfer.mjs export|inspect DATA_DIR PRIVATE_JSON; import DATA_DIR PRIVATE_JSON --apply');
  if (action === 'import') {
    // Inspect on a read-only handle before Store can initialize/recover anything.
    const bundle = JSON.parse(readFileSync(file, 'utf8')), config = loadConfig({});
    const db = new DatabaseSync(join(dataDir, 'agent.sqlite'), { readOnly: true });
    try { planLedgerImport(db, bundle, config); } finally { db.close(); }
    const store = new Store(dataDir);
    try { console.log(JSON.stringify(importLedger(store, bundle, config))); } finally { store.close(); }
  } else {
    const db = new DatabaseSync(join(dataDir, 'agent.sqlite'), { readOnly: true });
    try {
      if (action === 'export') { writeFileSync(file, JSON.stringify(exportLedger(db)), { flag: 'wx', mode: 0o600 }); console.log('Private ledger bundle exported.'); }
      else console.log(JSON.stringify(planLedgerImport(db, JSON.parse(readFileSync(file, 'utf8')), loadConfig({})).summary));
    } finally { db.close(); }
  }
}
