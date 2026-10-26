// 加载真实扩展，验证 CSS、三种模式、设置持久化与弹窗消息握手。
async function runCopyModesBrowserTests(browserType, extensionPath, channel = 'chromium') {
    const context = await browserType.launchPersistentContext('', {
        channel, headless: true,
        args: [`--disable-extensions-except=${extensionPath}`, `--load-extension=${extensionPath}`],
    });
    const results = [];
    function check(name, actual, expected) {
        if (JSON.stringify(actual) !== JSON.stringify(expected)) {
            throw new Error(`${name}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
        }
        results.push({ name, passed: true });
    }
    try {
        const html = `<!doctype html><html><head><meta charset="utf-8"><style>
            .emphasis { font-weight:700;color:rgb(180,30,40);background-color:rgb(255,240,100);font-style:italic }
            .right { text-align:right } table,td,th {border:1px solid #999;padding:5px}
            </style></head><body>
            <div id="source" tabindex="0"></div><input id="input">
            <textarea id="paste"></textarea><div id="rich" contenteditable="true"></div>
            </body></html>`;
        await context.route('https://copy-mode-test.feishu.cn/**', route => route.fulfill({
            contentType: 'text/html; charset=utf-8',
            headers: { 'Permissions-Policy': 'clipboard-write=()' }, body: html,
        }));
        const page = await context.newPage();
        const errors = [];
        page.on('pageerror', error => errors.push(error.message));
        await page.goto('https://copy-mode-test.feishu.cn/docx/modes');
        await page.waitForFunction(() => !!document.getElementById('feishu-copy-style'));
        const session = await context.newCDPSession(page);
        const worlds = [];
        session.on('Runtime.executionContextCreated', ({ context: world }) => worlds.push(world));
        await session.send('Runtime.enable');
        const world = worlds.find(candidate => candidate.name === '文档复制助手');
        if (!world) throw new Error('Extension isolated world missing');
        const extensionId = (await session.send('Runtime.evaluate', { contextId: world.id, expression: 'chrome.runtime.id' })).result.value;

        const popup = await context.newPage();
        popup.on('pageerror', error => errors.push(error.message));
        await popup.goto(`chrome-extension://${extensionId}/popup.html`);
        await popup.getByText('当前页面不受支持，请打开飞书、腾讯文字文档或普通网页').waitFor();
        check('unsupported popup tab never claims connected', await popup.locator('#copy-mode').isDisabled(), true);
        // 标签页形式的 popup 没有工具栏点击带来的 activeTab URL 授权。
        // 仅补齐这一查询的文档 URL；消息、内容脚本、存储及 UI 均用真实实现。
        await popup.evaluate(sourceIndex => {
            const query = chrome.tabs.query.bind(chrome.tabs);
            chrome.tabs.query = (_, callback) => {
                const result = query({}).then(tabs => [{ ...tabs.find(tab => tab.index === sourceIndex), url: 'https://copy-mode-test.feishu.cn/docx/modes' }]);
                if (callback) { result.then(callback); return; }
                return result;
            };
        }, context.pages().indexOf(page));
        await popup.getByRole('button', { name: '重新检测' }).click();
        await popup.waitForFunction(() => !document.getElementById('status').textContent.includes('正在检测'));
        check('actual page connected version', await popup.locator('#status').textContent(), '✓ 当前页面已连接 · v2.4.2');
        check('default rich mode and live handshake', await popup.locator('#copy-mode').inputValue(), 'rich');

        const selectHtml = async value => {
            await page.evaluate(value => {
                const source = document.getElementById('source');
                source.innerHTML = value;
                source.focus();
                const range = document.createRange(); range.selectNodeContents(source);
                getSelection().removeAllRanges(); getSelection().addRange(range);
            }, value);
        };
        const pasteText = async () => {
            await page.locator('#paste').fill(''); await page.locator('#paste').click();
            await page.keyboard.press('Control+v'); return page.locator('#paste').inputValue();
        };
        const pasteRich = async () => {
            // 换一个空编辑器，避免浏览器保留上一次粘贴位置的粗体等输入样式。
            await page.locator('#rich').evaluate(node => node.replaceWith(node.cloneNode(false)));
            await page.locator('#rich').click();
            await page.keyboard.press('Control+v');
        };
        const choose = async value => {
            await popup.locator('#copy-mode').selectOption(value);
            await popup.getByText('已保存，当前页面已生效；本站其他已打开的文档也会同步。', { exact: true }).waitFor();
            await popup.locator('#copy-mode:not([disabled])').waitFor();
        };
        const status = async () => popup.evaluate(async () => {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            return chrome.tabs.sendMessage(tab.id, { type: 'FEISHU_COPY_GET_STATUS' }, { frameId: 0 });
        });
        const converted = async () => {
            const result = await session.send('Runtime.evaluate', {
                contextId: world.id, returnByValue: true,
                expression: 'FeishuCopyFormats.markdown(FeishuCopyFormats.selectionHtml(getSelection()))',
            });
            if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails));
            return result.result.value;
        };

        await selectHtml('<h2>标题</h2><p class="right"><span class="emphasis">彩色加粗</span>正文<a href="/help">链接</a></p><ul><li>条目</li></ul><blockquote>引文</blockquote><pre><code>const x = 1;\n\n\nconsole.log(x);</code></pre><table><tr><th>名称</th><th>值</th></tr><tr><td>中文</td><td>2</td></tr></table>');
        await page.keyboard.press('Control+c'); await pasteRich();
        check('heading structure pasted', await page.locator('#rich h2').textContent(), '标题');
        const format = await page.locator('#rich').evaluate(root => {
            const node = Array.from(root.querySelectorAll('*')).find(node => node.textContent === '彩色加粗');
            const style = getComputedStyle(node);
            return [style.color, style.backgroundColor, Number(style.fontWeight) >= 600, style.fontStyle];
        });
        check('original stylesheet color highlight bold italic pasted', format, ['rgb(180, 30, 40)', 'rgb(255, 240, 100)', true, 'italic']);
        check('alignment pasted', await page.locator('#rich').evaluate(root => Array.from(root.querySelectorAll('*')).some(node => getComputedStyle(node).textAlign === 'right')), true);
        check('link made absolute', await page.locator('#rich a').getAttribute('href'), 'https://copy-mode-test.feishu.cn/help');
        check('list pasted', await page.locator('#rich ul li').textContent(), '条目');
        check('quote pasted', await page.locator('#rich blockquote').textContent(), '引文');
        check('table cells pasted', await page.locator('#rich tr').count(), 2);
        check('code blank lines preserved', await page.locator('#rich pre').textContent(), 'const x = 1;\n\n\nconsole.log(x);');

        await page.evaluate(() => {
            const source = document.getElementById('source');
            source.innerHTML = '<p>前缀<span class="emphasis">仅选中间文字</span>后缀</p>';
            source.focus(); const text = source.querySelector('span').firstChild;
            const range = document.createRange(); range.setStart(text, 2); range.setEnd(text, 4);
            getSelection().removeAllRanges(); getSelection().addRange(range);
        });
        await page.keyboard.press('Control+c'); await pasteRich();
        check('partial selection does not include siblings', await page.locator('#rich').textContent(), '中间');
        check('partial selection retains ancestor style', await page.locator('#rich').evaluate(root => Array.from(root.querySelectorAll('*')).some(node => getComputedStyle(node).color === 'rgb(180, 30, 40)')), true);

        await choose('plain');
        check('UI persists mode', await popup.evaluate(async () => (await chrome.storage.local.get('siteSettings')).siteSettings['https://copy-mode-test.feishu.cn'].mode), 'plain');
        check('active page applies mode', (await status()).mode, 'plain');
        await selectHtml('<p><strong>原文 &lt;标签&gt; &amp; 😀</strong></p>');
        await page.keyboard.press('Control+c'); await pasteRich();
        check('plain paste literal text', await page.locator('#rich').textContent(), '原文 <标签> & 😀');
        check('plain mode has no original strong formatting', await page.locator('#rich strong, #rich b').count(), 0);

        const second = await context.newPage();
        await second.goto('https://copy-mode-test.feishu.cn/docx/second');
        await second.waitForFunction(() => !!document.getElementById('feishu-copy-style'));
        const secondSession = await context.newCDPSession(second);
        const secondWorlds = [];
        secondSession.on('Runtime.executionContextCreated', ({ context: value }) => secondWorlds.push(value));
        await secondSession.send('Runtime.enable');
        const secondWorld = secondWorlds.find(value => value.name === '文档复制助手');
        const secondMode = async () => (await secondSession.send('Runtime.evaluate', {
            contextId: secondWorld.id, expression: 'DocCopyController.getStatus().mode', awaitPromise: true,
        })).result.value;
        check('new page sees persisted mode', await secondMode(), 'plain');

        await choose('markdown');
        await second.waitForTimeout(50);
        await second.evaluate(() => {
            document.getElementById('source').innerHTML = '<strong>同步</strong>';
            document.getElementById('source').focus(); const range = document.createRange(); range.selectNodeContents(document.getElementById('source'));
            getSelection().removeAllRanges(); getSelection().addRange(range);
        });
        await second.keyboard.press('Control+c');
        await second.locator('#paste').click(); await second.keyboard.press('Control+v');
        check('already-open second tab applies mode changes', await second.locator('#paste').inputValue(), '**同步**');

        await selectHtml('<h2>标题</h2><p><strong>粗体</strong> 普通 <em>斜体</em> <a href="/help">链接</a></p>');
        await page.keyboard.press('Control+c');
        const md = await pasteText();
        check('Markdown heading', md.includes('## 标题'), true);
        check('Markdown strong and normal siblings', md.includes('**粗体** 普通 *斜体*'), true);
        check('Markdown link', md.includes('[链接](<https://copy-mode-test.feishu.cn/help>)'), true);
        await selectHtml('<pre><code>a```b\n\n\nc</code></pre>');
        check('Markdown code fences and blank lines', await converted(), '````\na```b\n\n\nc\n````');
        await selectHtml('<ol start="3"><li>甲<ul><li>子项</li></ul></li><li>乙</li></ol>');
        const list = await converted();
        check('Markdown ordered list start and nested list', list.includes('3. 甲') && list.includes('   - 子项') && list.includes('4. 乙'), true);
        await selectHtml('<table><tr><th>A</th><th>B</th></tr><tr><td>x|y</td><td>2</td></tr></table>');
        check('Markdown table and escaped pipe', await converted(), '| A | B |\n| --- | --- |\n| x\\|y | 2 |');
        await selectHtml('<blockquote><p>第一段</p><p>第二段</p></blockquote>');
        const quote = await converted();
        check('Markdown multiline quote', quote.split('\n').every(line => line.startsWith('> ')), true);
        await selectHtml('<p><a href="javascript:alert(1)" onclick="alert(1)">安全文本</a><span id="private" data-token="do-not-copy">内容</span></p>');
        const sanitized = await session.send('Runtime.evaluate', { contextId: world.id, expression: 'FeishuCopyFormats.selectionHtml(getSelection())', returnByValue: true });
        check('clipboard excludes executable URLs events and page metadata', /javascript:|onclick|data-token|id="private"/.test(sanitized.result.value), false);

        await page.locator('#input').fill('before**原文**after');
        await page.locator('#input').evaluate(node => { node.focus(); node.setSelectionRange(6, 12); });
        await page.keyboard.press('Control+c');
        check('Markdown mode input keeps literal substring', await pasteText(), '**原文**');
        await selectHtml('<strong>菜单</strong>');
        await page.locator('#source').click({ button: 'right' });
        await page.getByRole('menuitem', { name: '复制纯文本', exact: true }).click();
        check('one-off plain context menu mode', await pasteText(), '菜单');
        check('one-off menu preserves default Markdown mode', (await status()).mode, 'markdown');
        await selectHtml('<strong>菜单格式</strong>');
        await page.locator('#source').click({ button: 'right' });
        await page.getByRole('menuitem', { name: '保留格式复制', exact: true }).click();
        await pasteRich();
        check('one-off rich context menu copies formatting', await page.locator('#rich').evaluate(root => Array.from(root.querySelectorAll('*')).some(node => Number(getComputedStyle(node).fontWeight) >= 600)), true);
        await page.reload();
        await page.waitForFunction(() => !!document.getElementById('feishu-copy-style'));
        check('mode survives document reload', (await status()).mode, 'markdown');
        check('no uncaught page or popup errors', errors, []);
        return { passed: results.length, results };
    } finally { await context.close(); }
}

if (typeof module !== 'undefined') {
    module.exports = runCopyModesBrowserTests;
    if (require.main === module) {
        const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
        runCopyModesBrowserTests(chromium, process.argv[2] || require('node:path').resolve(__dirname, '..'), process.argv[3] || 'chromium')
            .then(result => console.log(JSON.stringify(result, null, 2)))
            .catch(error => { console.error(error); process.exitCode = 1; });
    }
}
