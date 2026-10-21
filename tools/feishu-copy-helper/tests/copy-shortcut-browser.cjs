// 可由 Playwright MCP 调用，也可在已安装 playwright 的环境中直接运行。
async function runCopyShortcutBrowserTests(browserType, extensionPath) {
    const context = await browserType.launchPersistentContext('', {
        channel: 'chromium',
        headless: true,
        args: [`--disable-extensions-except=${extensionPath}`, `--load-extension=${extensionPath}`],
    });
    const results = [];
    const check = (name, actual, expected) => {
        if (actual !== expected) {
            throw new Error(`${name}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
        }
        results.push({ name, passed: true });
    };
    try {
        const page = await context.newPage();
        const errors = [];
        page.on('pageerror', error => errors.push(error.message));
        await context.route('https://copy-test.feishu.cn/**', route => route.fulfill({
            contentType: 'text/html; charset=utf-8',
            headers: { 'Permissions-Policy': 'clipboard-write=()' },
            body: `<!doctype html><html><head><meta charset="utf-8"><script>
                // 模拟页面在最早的内联脚本中阻止快捷键和复制。
                for (const target of [window, document]) {
                    target.addEventListener('keydown', e => {
                        if (e.ctrlKey && e.key.toLowerCase() === 'c') {
                            e.preventDefault(); e.stopImmediatePropagation();
                        }
                    }, true);
                    target.addEventListener('copy', e => {
                        e.preventDefault(); e.stopImmediatePropagation();
                    }, true);
                }
                </script></head><body>
                <p id="source" tabindex="0" style="white-space:pre-wrap"></p>
                <input id="input"><textarea id="textarea"></textarea>
                <textarea id="paste"></textarea><div id="rich" contenteditable="true"></div>
                </body></html>`,
        }));
        await page.goto('https://copy-test.feishu.cn/docx/local-test');
        await page.waitForFunction(() => !!document.getElementById('feishu-copy-style'), null, { timeout: 5000 });
        check('extension loaded once', await page.locator('#feishu-copy-style').count(), 1);
        check('async clipboard explicitly denied', await page.evaluate(async () => {
            try { await navigator.clipboard.writeText('must not succeed'); return false; }
            catch { return true; }
        }), true);

        const selectText = async text => {
            await page.evaluate(value => {
                const source = document.getElementById('source');
                source.textContent = value;
                source.focus();
                const range = document.createRange();
                range.selectNodeContents(source);
                const selection = getSelection();
                selection.removeAllRanges(); selection.addRange(range);
            }, text);
        };
        const pasteText = async () => {
            await page.locator('#paste').fill('');
            await page.locator('#paste').click();
            await page.keyboard.press('Control+v');
            return page.locator('#paste').inputValue();
        };

        const exact = '中文 <标签> & "引号" 😀\n第二行';
        await selectText(exact);
        await page.keyboard.press('Control+c');
        check('Ctrl+C then actual paste with page blockers and denied async API', await pasteText(), exact);

        await selectText('范围保留');
        await page.keyboard.press('Control+c');
        check('DOM selection remains after copy', await page.evaluate(() => getSelection().toString()), '范围保留');

        for (const id of ['input', 'textarea']) {
            await page.locator(`#${id}`).fill('before选中文本after');
            await page.locator(`#${id}`).evaluate(element => { element.focus(); element.setSelectionRange(6, 10); });
            await page.keyboard.press('Control+c');
            check(`${id} partial selection`, await pasteText(), '选中文本');
        }

        await selectText(' \n\t ');
        await page.keyboard.press('Control+c');
        check('whitespace selection', await pasteText(), ' \n\t ');

        await selectText('剪贴板保持原值');
        await page.keyboard.press('Control+c');
        await page.evaluate(() => { getSelection().removeAllRanges(); document.getElementById('source').focus(); });
        await page.keyboard.press('Control+c');
        check('empty selection does not copy the whole page', await pasteText(), '剪贴板保持原值');

        await selectText('右键复制');
        await page.locator('#source').click({ button: 'right' });
        check('custom context menu is reachable', await page.locator('#feishu-copy-menu').count(), 1);
        await page.keyboard.press('Escape');
        await page.evaluate(() => document.getElementById('feishu-copy-menu')?.remove());
        await page.waitForTimeout(300);
        check('dynamic updates do not duplicate style', await page.locator('#feishu-copy-style').count(), 1);

        await page.evaluate(() => {
            const source = document.getElementById('source');
            source.innerHTML = '<strong>富文本</strong><img alt="测试图片" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7">';
            source.focus();
            const range = document.createRange(); range.selectNodeContents(source);
            getSelection().removeAllRanges(); getSelection().addRange(range);
        });
        await page.keyboard.press('Control+c');
        await page.locator('#rich').click();
        await page.keyboard.press('Control+v');
        check('rich text preserved', await page.locator('#rich').textContent(), '富文本');
        check('rich bold style preserved', await page.locator('#rich').evaluate(element =>
            Array.from(element.querySelectorAll('*')).some(node => Number(getComputedStyle(node).fontWeight) >= 600)), true);
        check('image HTML preserved', await page.locator('#rich img').count(), 1);

        // 在扩展的隔离上下文中强制所有主动复制方案失败，验证不再误报成功。
        const session = await context.newCDPSession(page);
        const worlds = [];
        session.on('Runtime.executionContextCreated', ({ context: world }) => worlds.push(world));
        await session.send('Runtime.enable');
        const extensionWorld = worlds.find(world => world.name === '飞书图文复制');
        if (!extensionWorld) throw new Error('Extension isolated execution context not found');
        const override = await session.send('Runtime.evaluate', {
            contextId: extensionWorld.id,
            expression: `Object.defineProperty(navigator, 'clipboard', { configurable: true, value: {
                writeText: () => Promise.reject(new Error('forced denial'))
            }}); document.execCommand = () => false;`,
        });
        if (override.exceptionDetails) throw new Error(JSON.stringify(override.exceptionDetails));
        await selectText('复制失败保留原文');
        await page.locator('#source').dblclick();
        await page.getByText('复制失败，请手动选择以下文本：').waitFor({ timeout: 5000 });
        check('failure presents manual copy text', await page.locator('textarea').last().inputValue(), '复制失败保留原文');
        check('failure does not report success', await page.getByText('复制成功', { exact: true }).count(), 0);
        check('no temporary hidden textarea leaked', await page.locator('textarea').count(), 3);
        check('no uncaught page errors', JSON.stringify(errors), '[]');
        return { passed: results.length, results };
    } finally {
        await context.close();
    }
}

if (typeof module !== 'undefined') {
    module.exports = runCopyShortcutBrowserTests;
    if (require.main === module) {
        const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
        runCopyShortcutBrowserTests(chromium, require('node:path').resolve(__dirname, '..'))
            .then(result => console.log(JSON.stringify(result, null, 2)))
            .catch(error => { console.error(error); process.exitCode = 1; });
    }
}

