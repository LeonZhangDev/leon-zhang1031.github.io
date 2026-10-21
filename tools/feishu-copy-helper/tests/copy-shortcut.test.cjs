const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const { test } = require('node:test');
const vm = require('node:vm');

const source = readFileSync(join(__dirname, '..', 'content.js'), 'utf8');

function setup({ text = '中文 <标签> & 😀', activeElement = null, htmlThrows = false, mode = 'rich' } = {}) {
    const handlers = new Map();
    const selection = {
        rangeCount: text === null ? 0 : 1,
        isCollapsed: text === null,
        toString: () => text || '',
        getRangeAt: () => ({ cloneContents: () => ({}) }),
    };
    const document = {
        readyState: 'loading',
        body: null,
        activeElement,
        addEventListener() {},
        createElement: () => ({
            innerHTML: '<b>中文 &lt;标签&gt; &amp; 😀</b>',
            appendChild() { if (htmlThrows) throw new Error('cannot clone HTML'); },
        }),
    };
    const window = {
        addEventListener: (name, handler) => handlers.set(name, handler),
        getSelection: () => selection,
    };
    vm.runInNewContext(source, {
        window, document,
        FeishuCopyFormats: {
            selectionHtml() { if (htmlThrows) throw new Error('cannot clone HTML'); return '<b>中文 &lt;标签&gt; &amp; 😀</b>'; },
            markdown() { return '**中文**'; },
        },
        chrome: {
            runtime: { onMessage: { addListener() {} } },
            storage: { local: { get(defaults, callback) { callback({ copyMode: mode }); } }, onChanged: { addListener() {} } },
        },
        console: { log() {}, warn() {} },
        MutationObserver: class { observe() {} },
    });
    return handlers;
}

function event(overrides = {}) {
    const data = new Map();
    return {
        key: 'c', ctrlKey: true, isTrusted: true,
        defaultPrevented: false, stopped: false, data,
        clipboardData: { setData: (type, value) => data.set(type, value) },
        preventDefault() { this.defaultPrevented = true; },
        stopImmediatePropagation() { this.stopped = true; },
        ...overrides,
    };
}

test('Ctrl+C blocks page shortcuts while keeping native copy enabled', () => {
    const e = event();
    setup().get('keydown')(e);
    assert.equal(e.stopped, true);
    assert.equal(e.defaultPrevented, false);
});

test('Cmd+C is supported; Alt+C, IME and unrelated shortcuts are untouched', () => {
    const handlers = setup();
    const cmd = event({ ctrlKey: false, metaKey: true, key: 'C' });
    handlers.get('keydown')(cmd);
    assert.equal(cmd.stopped, true);
    for (const overrides of [{ altKey: true }, { isComposing: true }, { key: 'x' }]) {
        const e = event(overrides);
        handlers.get('keydown')(e);
        assert.equal(e.stopped, false);
    }
});

test('trusted copy writes exact selected text and HTML synchronously', () => {
    const e = event();
    setup().get('copy')(e);
    assert.equal(e.data.get('text/plain'), '中文 <标签> & 😀');
    assert.ok(e.data.get('text/html').startsWith('<b>'));
    assert.equal(e.defaultPrevented, true);
    assert.equal(e.stopped, true);
});

test('input and textarea copy only the selected substring', () => {
    for (const tagName of ['INPUT', 'TEXTAREA']) {
        const e = event();
        setup({ activeElement: { tagName, value: 'before选中文本after', selectionStart: 6, selectionEnd: 10 } }).get('copy')(e);
        assert.equal(e.data.get('text/plain'), '选中文本');
        assert.equal(e.data.has('text/html'), false);
    }
});

test('no selection leaves clipboard and native shortcut untouched', () => {
    const handlers = setup({ text: null });
    for (const name of ['keydown', 'copy']) {
        const e = event();
        handlers.get(name)(e);
        assert.equal(e.defaultPrevented, false);
        assert.equal(e.stopped, false);
        assert.equal(e.data.size, 0);
    }
});

test('collapsed input selection does not copy stale DOM selection', () => {
    const e = event();
    setup({ activeElement: { tagName: 'INPUT', value: 'input', selectionStart: 2, selectionEnd: 2 } }).get('copy')(e);
    assert.equal(e.data.size, 0);
});

test('whitespace selection is preserved', () => {
    const e = event();
    setup({ text: ' \n\t ' }).get('copy')(e);
    assert.equal(e.data.get('text/plain'), ' \n\t ');
});

test('plain mode writes only literal text and Markdown mode writes Markdown as text', () => {
    const plain = event();
    setup({ mode: 'plain' }).get('copy')(plain);
    assert.equal(plain.data.get('text/plain'), '中文 <标签> & 😀');
    assert.equal(plain.data.has('text/html'), false);
    const md = event();
    setup({ mode: 'markdown' }).get('copy')(md);
    assert.equal(md.data.get('text/plain'), '**中文**');
    assert.equal(md.data.has('text/html'), false);
});

test('HTML failure still copies plain text', () => {
    const e = event();
    setup({ htmlThrows: true }).get('copy')(e);
    assert.equal(e.data.get('text/plain'), '中文 <标签> & 😀');
    assert.equal(e.defaultPrevented, true);
});

test('synthetic events and missing or unwritable clipboard preserve native copy', () => {
    for (const overrides of [
        { isTrusted: false },
        { clipboardData: null },
        { clipboardData: { setData() { throw new Error('write denied'); } } },
    ]) {
        const e = event(overrides);
        setup().get('copy')(e);
        assert.equal(e.defaultPrevented, false);
        assert.equal(e.stopped, false);
    }
});

