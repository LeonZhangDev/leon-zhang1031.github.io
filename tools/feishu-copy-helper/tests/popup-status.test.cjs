const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const { test } = require('node:test');
const vm = require('node:vm');
const source = readFileSync(join(__dirname, '..', 'popup.js'), 'utf8');

async function setup({ url = 'https://my.feishu.cn/docx/test', response = {}, noReceiver = false, saveError = false, applyError = false } = {}) {
    const nodes = Object.fromEntries(['status', 'copy-mode', 'mode-feedback', 'check-status'].map(id => [id, {
        disabled: id === 'copy-mode', value: 'rich', textContent: '', handlers: {},
        addEventListener(name, handler) { this.handlers[name] = handler; },
    }]));
    let initialize;
    let saved;
    let sends = 0;
    const runtime = { getManifest: () => ({ version: '2.3.0' }) };
    const chrome = {
        runtime,
        tabs: {
            query(_options, callback) { callback(url === null ? [] : [{ id: 1, url }]); },
            sendMessage(_id, message, _options, callback) {
                sends++;
                if (noReceiver || (applyError && message.type === 'FEISHU_COPY_SET_MODE')) {
                    runtime.lastError = { message: 'Receiving end does not exist' };
                    callback(); runtime.lastError = undefined;
                } else callback({ type: 'FEISHU_COPY_STATUS', version: '2.3.0', ready: true, mode: message.mode || 'rich', ...response });
            },
        },
        storage: { local: { set(value, callback) {
            if (saveError) runtime.lastError = { message: 'Storage denied' };
            else saved = value.copyMode;
            callback(); runtime.lastError = undefined;
        } } },
    };
    vm.runInNewContext(source, {
        document: { getElementById: id => nodes[id], addEventListener(_name, callback) { initialize = callback; } },
        chrome, URL, setTimeout, clearTimeout,
    });
    await initialize();
    return { nodes, saved: () => saved, sends: () => sends };
}

test('real handshake is required before enabling mode controls', async () => {
    const { nodes, sends } = await setup();
    assert.equal(nodes.status.textContent, '✓ 当前页面已连接 · v2.3.0');
    assert.equal(nodes['copy-mode'].disabled, false);
    assert.equal(sends(), 1);
});

test('lookalike domains and empty tab do not claim enabled', async () => {
    for (const url of ['https://feishu.cn.evil.test/', 'https://evil.test/feishu.cn', 'https://notfeishu.cn/', 'file:///feishu.cn', 'edge://extensions/', null]) {
        const { nodes, sends } = await setup({ url });
        assert.match(nodes.status.textContent, /不受支持/);
        assert.equal(nodes['copy-mode'].disabled, true);
        assert.equal(sends(), 0);
    }
});

test('Lark and apex domains are supported', async () => {
    for (const url of ['https://larksuite.com/', 'https://team.larksuite.com/docx/x', 'https://feishu.cn/']) {
        const { nodes } = await setup({ url });
        assert.match(nodes.status.textContent, /已连接/);
    }
});

test('missing receiver consumes runtime.lastError and offers refresh', async () => {
    const { nodes } = await setup({ noReceiver: true });
    assert.match(nodes.status.textContent, /未连接.*刷新文档/);
    assert.equal(nodes['copy-mode'].disabled, true);
    assert.equal(nodes['check-status'].disabled, false);
});

test('old version, pending initialization, and storage errors remain inactive', async () => {
    for (const [response, message] of [
        [{ version: '2.2' }, /旧版脚本/], [{ ready: false }, /初始化/], [{ settingsError: true }, /设置读取失败/],
    ]) {
        const { nodes } = await setup({ response });
        assert.match(nodes.status.textContent, message);
        assert.equal(nodes['copy-mode'].disabled, true);
    }
});

test('saving requires persistence and active-page acknowledgement', async () => {
    const result = await setup();
    result.nodes['copy-mode'].value = 'markdown';
    await result.nodes['copy-mode'].handlers.change();
    assert.equal(result.saved(), 'markdown');
    assert.match(result.nodes['mode-feedback'].textContent, /当前页面已生效/);
    assert.equal(result.nodes['copy-mode'].disabled, false);
});

test('storage failure does not pretend settings were saved', async () => {
    const result = await setup({ saveError: true });
    await result.nodes['copy-mode'].handlers.change();
    assert.equal(result.saved(), undefined);
    assert.equal(result.sends(), 1);
    assert.match(result.nodes['mode-feedback'].textContent, /保存失败/);
});

test('failed page acknowledgement distinguishes saved setting from applied mode', async () => {
    const result = await setup({ applyError: true });
    result.nodes['copy-mode'].value = 'plain';
    await result.nodes['copy-mode'].handlers.change();
    assert.equal(result.saved(), 'plain');
    assert.match(result.nodes.status.textContent, /设置已保存.*未确认生效/);
    assert.equal(result.nodes['copy-mode'].disabled, true);
});

