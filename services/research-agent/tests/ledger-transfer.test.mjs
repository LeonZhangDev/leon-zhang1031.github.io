import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { randomUUID } from 'node:crypto';
import { Store } from '../store.mjs';
import { loadConfig } from '../config.mjs';
import { exportLedger, planLedgerImport, importLedger } from '../ledger-transfer.mjs';
const config = loadConfig({});
function stores(t) {
  const source = new Store(mkdtempSync(join(tmpdir(), 'ledger-source-'))), target = new Store(mkdtempSync(join(tmpdir(), 'ledger-target-')));
  t.after(() => { source.close(); target.close(); });
  source.setSetting('password', 'private-password-hash'); source.createSession('private-session-hash');
  target.setSetting('password', 'original-target-password');
  const task = source.createTask({ goal: '合成任务', scenario: 'standard', budgetUnits: 20_000 }, config);
  task.status = 'completed'; task.estimatedCostUnits = 0; source.saveTask(task);
  const id = randomUUID(); source.db.prepare('INSERT INTO model_calls VALUES (?,?,?,?,?)').run(id, task.id, 2908, 'uncertain', '{}');
  const operation = source.createMemoryOperation('recall'); source.reserveModelCall(null, 20, config, { purpose: 'memory-embedding' }, operation); source.finishMemoryOperation(operation, 'completed');
  return { source, target, id, task, bundle: exportLedger(source.db) };
}
test('ledger export excludes credentials and sessions; import preserves unknown reservations and is idempotent', t => {
  const { target, bundle } = stores(t);
  assert.ok(!JSON.stringify(bundle).includes('private-password')); assert.ok(!JSON.stringify(bundle).includes('private-session'));
  const first = importLedger(target, bundle, config); assert.equal(first.reservedYuan, 0.2928); assert.equal(first.validationReservedYuan, 0.002); assert.equal(first.uncertainCalls, 2);
  assert.equal(target.getSetting('password'), 'original-target-password');
  const again = importLedger(target, bundle, config); assert.ok(Object.values(again.added).every(n => n === 0)); assert.equal(target.trialBudget(config).reservedYuan, 0.2928);
});
test('ledger planning writes nothing and conflicting records cannot partially merge', t => {
  const { target, bundle } = stores(t);
  const plan = planLedgerImport(target.db, bundle, config); assert.equal(plan.summary.calls, 2); assert.equal(target.listTasks().length, 0);
  importLedger(target, bundle, config); const changed = structuredClone(bundle); changed.records.model_calls[0].reserved_units++;
  assert.throws(() => importLedger(target, changed, config), /CONFLICT/); assert.equal(target.trialBudget(config).reservedYuan, 0.2928);
});
test('ledger import rejects missing references and both budget overruns without copying tasks', t => {
  const { target, bundle } = stores(t);
  for (const units of [50_001]) { const changed = structuredClone(bundle); changed.records.model_calls[0].reserved_units = units; assert.throws(() => importLedger(target, changed, config), /BUDGET/); }
  const over = structuredClone(bundle); over.records.memory_model_calls[0].reserved_units = 5001; assert.throws(() => importLedger(target, over, config), /BUDGET/);
  const missing = structuredClone(bundle); missing.records.tasks = []; assert.throws(() => importLedger(target, missing, config), /REFERENCE/);
  assert.equal(target.listTasks().length, 0);
});
test('ledger import refuses active source/destination work and never clears a budget lock', t => {
  const { source, target, bundle } = stores(t);
  const active = structuredClone(bundle); active.records.memory_operations[0].status = 'running'; assert.throws(() => importLedger(target, active, config), /ACTIVE_WORK/);
  source.setSetting('model-budget-locked', 'true'); importLedger(target, exportLedger(source.db), config);
  assert.equal(target.getSetting('model-budget-locked'), 'true'); importLedger(target, bundle, config); assert.equal(target.getSetting('model-budget-locked'), 'true');
  const task = target.createTask({ goal: 'active', scenario: 'standard', budgetUnits: 100 }, config);
  assert.throws(() => importLedger(target, bundle, config), /ACTIVE_WORK/); task.status = 'completed'; task.estimatedCostUnits = 0; target.saveTask(task);
});
