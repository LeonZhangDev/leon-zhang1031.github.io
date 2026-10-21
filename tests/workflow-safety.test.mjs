import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

const workflow = (name) => readFileSync(new URL(`../.github/workflows/${name}.yml`, import.meta.url), 'utf8');

describe('repository workflow safety', () => {
  it('allows the project sync bot to commit without unrelated PR permissions', () => {
    const source = workflow('sync-projects');
    assert.match(source, /^permissions:\r?\n  contents: write\s*$/m);
    assert.doesNotMatch(source, /pull-requests: write/);
  });

  it('does not automatically publish to the legacy Gitee mirror', () => {
    const source = workflow('sync-to-gitee');
    assert.match(source, /^  workflow_dispatch:/m);
    assert.doesNotMatch(source, /^  (push|schedule|pull_request):/m);
  });

  it('does not force overwrite Gitee history', () => {
    assert.doesNotMatch(workflow('sync-to-gitee'), /--force(?:\s|$)|--mirror(?:\s|$)/);
  });
});
