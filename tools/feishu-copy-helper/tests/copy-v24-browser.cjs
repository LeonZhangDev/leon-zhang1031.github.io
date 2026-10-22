// 测试夹具预授予 copy-generic.example 的主机权限；不模拟复制、存储或注册 API。
// 安装包本身不包含此权限。浏览器的授权提示还需工具栏人工验收。
async function runV24BrowserTests(browserType, extensionPath, channel = 'chromium') {
    const context = await browserType.launchPersistentContext('', {
        channel, headless: true,
        args: [`--disable-extensions-except=${extensionPath}`, `--load-extension=${extensionPath}`],
    });
    const results = [];
    const check = (name, value) => { if (!value) throw new Error(name); results.push({ name, passed: true }); };
    try {
        const fixture = `<!doctype html><meta charset="utf-8"><style>
            #source {user-select:none} .styled{color:rgb(160,20,40);margin-bottom:18px;text-indent:24px}
            #rich{min-height:40px} td{border:1px solid #333}
            </style><script>document.addEventListener('copy',e=>{e.preventDefault();window.blocked=true},true);
            document.addEventListener('contextmenu',e=>{e.preventDefault();window.menuBlocked=true},true);
            document.addEventListener('paste',e=>{window.pasteEvents=(window.pasteEvents||0)+1;e.preventDefault()},true);</script>
            <div id="source" tabindex="0"></div><textarea id="proxy" class="docx-selection-hidden-textarea"></textarea>
            <input id="input"><textarea id="paste"></textarea><div id="rich" contenteditable="true"></div>`;
        await context.route('https://copy-v24.feishu.cn/**', r => r.fulfill({ contentType: 'text/html', body: fixture }));
        await context.route('https://docs.qq.com/**', r => r.fulfill({ contentType: 'text/html', body: fixture }));
        await context.route('https://copy-generic.example/**', r => r.fulfill({ contentType: 'text/html', body: fixture }));
        const png = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIHWP4z8DwHwAFgAI/ScLbtAAAAABJRU5ErkJggg==';
        const bytes = Buffer.from(png, 'base64');
        await context.route('https://copy-v24.feishu.cn/good.png', r => r.fulfill({ contentType: 'image/png', body: bytes }));
        await context.route('https://copy-v24.feishu.cn/denied.png', r => r.fulfill({ status: 403, body: 'denied' }));
        const page = await context.newPage();
        await page.goto('https://copy-v24.feishu.cn/docx/test');
        await page.waitForSelector('#feishu-copy-style', { state: 'attached' });
        const cdp = await context.newCDPSession(page), worlds = [];
        cdp.on('Runtime.executionContextCreated', ({ context }) => worlds.push(context));
        await cdp.send('Runtime.enable');
        const world = worlds.find(w => w.name === '文档复制助手');
        const extensionId = (await cdp.send('Runtime.evaluate', { contextId: world.id, expression: 'chrome.runtime.id' })).result.value;
        const popup = await context.newPage();
        await popup.goto(`chrome-extension://${extensionId}/popup.html`);
        const target = async targetPage => {
            await popup.reload();
            // 标签页弹窗不具备工具栏的 activeTab，查询只补齐目标；其他 API 真实运行。
            await popup.evaluate(({ index, url }) => {
                const query = chrome.tabs.query.bind(chrome.tabs);
                chrome.tabs.query = (_, callback) => {
                    const result = query({}).then(tabs => [{ ...tabs.find(t => t.index === index), url }]);
                    if (callback) { result.then(callback); return; } return result;
                };
            }, { index: context.pages().indexOf(targetPage), url: targetPage.url() });
            await popup.locator('#check-status').click();
            await popup.waitForFunction(() => !document.getElementById('check-status').disabled);
        };
        const select = async (p, html, proxy = false) => {
            await p.bringToFront();
            await p.evaluate(({ html, proxy }) => {
                const source = document.getElementById('source'); source.innerHTML = html;
                (proxy ? document.getElementById('proxy') : source).focus();
                const range = document.createRange(); range.selectNodeContents(source);
                getSelection().removeAllRanges(); getSelection().addRange(range);
            }, { html, proxy });
        };
        // 接收页不带复制插件和网页阻断脚本，使用真实键盘粘贴。
        const sink = await context.newPage();
        await context.route('http://127.0.0.1:13468/**', r => r.fulfill({ contentType: 'text/html', body: '<meta charset=utf-8><div id="rich" contenteditable="true" style="min-height:40px"></div><textarea id="plain"></textarea>' }));
        await sink.goto('http://127.0.0.1:13468/paste');
        const rich = async p => {
            await p.keyboard.press('Control+c'); await sink.bringToFront();
            await sink.locator('#rich').evaluate(n => n.replaceWith(n.cloneNode(false)));
            await sink.locator('#rich').click(); await sink.keyboard.press('Control+v');
        };
        await select(page, '<div data-block-type="heading2"><span>语义标题</span></div><div data-block-type="ordered" data-start="3"><div class="order">3.</div>甲</div><div data-block-type="ordered" data-start="4"><div class="order">4.</div>乙</div><p class="styled">段落</p>', true);
        await rich(page);
        check('Feishu hidden proxy textarea keeps real body selection', await sink.locator('#rich h2').textContent() === '语义标题');
        check('Feishu block lists reconstructed without duplicate markers', await sink.locator('#rich ol li').count() === 2 && !(await sink.locator('#rich').textContent()).includes('3.'));
        check('selected ordered list retains original start', await sink.locator('#rich ol').getAttribute('start') === '3');
        check('paragraph spacing and indent survive HTML paste', await sink.locator('#rich').evaluate(e => [...e.querySelectorAll('*')].some(n => getComputedStyle(n).textIndent === '24px' && getComputedStyle(n).marginBottom === '18px')));
        const paragraphs = '<div class="root-render-unit-container"><div class="render-unit-wrapper"><div data-block-type="text"><div class="text-block-wrapper"><div class="text-editor"><div class="ace-line"><span>第一段<strong>粗体</strong></span></div></div></div></div></div><div class="render-unit-wrapper"><div data-block-type="text"><div class="text-block-wrapper"><div class="text-editor"><div class="ace-line">第二段</div><div class="ace-line">软换行</div></div></div></div></div><div class="render-unit-wrapper"><div data-block-type="text"><div class="text-editor"><div class="ace-line">第三段</div></div></div><div class="editor-tool"><span></span></div></div></div>';
        await select(page, paragraphs); await rich(page);
        check('Feishu layout wrappers produce exactly three paragraphs', await sink.locator('#rich p').count() === 3 && await sink.locator('#rich div').count() === 0);
        check('Feishu rich paste has no manufactured blank paragraphs', await sink.locator('#rich').evaluate(n => ![...n.querySelectorAll('p')].some(p => !p.textContent.trim()) && !/\n{3,}/.test(n.innerText)));
        check('paragraph normalization keeps soft line breaks and inline bold', await sink.locator('#rich').evaluate(n => n.querySelectorAll('br').length === 1 && [...n.querySelectorAll('*')].some(e => Number(getComputedStyle(e).fontWeight) >= 600) && n.innerText.includes('第二段\n软换行')));
        await target(page); await popup.locator('#copy-mode').selectOption('markdown');
        await page.bringToFront(); await page.keyboard.press('Control+c'); await sink.locator('#plain').fill(''); await sink.locator('#plain').click(); await sink.keyboard.press('Control+v');
        check('Feishu Markdown uses one blank line between paragraphs', await sink.locator('#plain').inputValue() === '第一段**粗体**\n\n第二段  \n软换行\n\n第三段');
        await select(page, '<div><p>代码之前</p>\n<pre>first\n\n\n\nlast</pre>\n<p>代码之后</p></div>');
        await page.keyboard.press('Control+c'); await sink.locator('#plain').fill(''); await sink.locator('#plain').click(); await sink.keyboard.press('Control+v');
        check('Markdown boundary cleanup preserves blank lines inside code', (await sink.locator('#plain').inputValue()) === '代码之前\n\n```\nfirst\n\n\n\nlast\n```\n\n代码之后');
        await target(page); await popup.locator('#copy-mode').selectOption('rich');
        await select(page, '<div data-block-type="text">前段</div><div data-block-type="text"><br></div><div data-block-type="text">后段</div>'); await rich(page);
        check('intentional empty source paragraph is retained', await sink.locator('#rich p').count() === 3 && await sink.locator('#rich p').nth(1).textContent() === '');
        await select(page, '<table><tr><td colspan="2">合并</td></tr><tr><td>甲</td><td>乙</td></tr></table>');
        await rich(page);
        check('merged cells retained as HTML', await sink.locator('#rich td[colspan="2"]').count() === 1);
        await target(page); await popup.locator('#copy-mode').selectOption('markdown');
        await popup.getByText('已保存，当前页面已生效；本站其他已打开的文档也会同步。', { exact: true }).waitFor();
        await page.bringToFront(); await page.keyboard.press('Control+c'); await sink.locator('#plain').click(); await sink.keyboard.press('Control+v');
        check('merged Markdown tables explicitly use HTML fallback', (await sink.locator('#plain').inputValue()).includes('colspan="2"'));
        await target(page); await popup.locator('#copy-mode').selectOption('rich');
        await select(page, '<p>图片测试<img src="/good.png"><img src="/denied.png"></p>');
        await target(page); await popup.locator('#prepare-images').click();
        await popup.waitForFunction(() => document.getElementById('selection-status').textContent.includes('图片准备完成'));
        const imageStatus = await popup.locator('#selection-status').textContent();
        check('image preparation reports both success and failure: ' + imageStatus, /1\/2.*1 张未内嵌/.test(imageStatus));
        await page.bringToFront(); await rich(page);
        check('prepared image is embedded in actual clipboard HTML', await sink.locator('#rich img[src^="data:image/png"]').count() === 1);
        await select(page, '<p>新的选区</p>'); await rich(page);
        check('changed selection never copies stale prepared content', await sink.locator('#rich').textContent() === '新的选区');
        await select(page, '<p>绘图<canvas></canvas></p>'); await rich(page); await target(page);
        check('unsupported drawings produce visible fallback notice', (await popup.locator('#selection-status').textContent()).includes('绘图或公式未还原'));

        const tencent = await context.newPage(); await tencent.goto('https://docs.qq.com/aio/test');
        await tencent.waitForSelector('#feishu-copy-style', { state: 'attached' });
        await select(tencent, '<div class="sc-block-wrapper sc-block-header2 sc-text-typo">腾讯标题</div><div class="sc-block-wrapper sc-block-bulleted_list sc-text-typo">条目</div><div class="sc-block-wrapper sc-block-code"><div class="sc-block-code-linenumber-wrapper">1</div><span>code</span></div>');
        await rich(tencent);
        check('Tencent AIO heading and list are semantic', await sink.locator('#rich h2').textContent() === '腾讯标题' && await sink.locator('#rich ul li').textContent() === '条目');
        check('Tencent code does not include editor line numbers', await sink.locator('#rich pre').textContent() === 'code');

        const generic = await context.newPage(); await generic.goto('https://copy-generic.example/article');
        check('ordinary sites stay untouched before activation', await generic.locator('#feishu-copy-style').count() === 0);
        await target(generic); await popup.locator('#toggle-page').click();
        await popup.getByText('✓ 当前页面已连接 · v2.4.0', { exact: true }).waitFor();
        check('page activation injects actual content scripts', await generic.locator('#feishu-copy-style').count() === 1);
        await select(generic, '<h2>原生格式</h2><p><strong>粗体</strong></p>'); await rich(generic);
        check('generic rich mode preserves native clipboard format', await sink.locator('#rich h2').textContent() === '原生格式' && await sink.locator('#rich strong,#rich b').count() > 0);
        check('copy handler no longer reaches page blockers', await generic.evaluate(() => !window.blocked));
        await target(generic); await popup.locator('#enable-paste').check();
        await generic.locator('#input').click(); await generic.keyboard.press('Control+v');
        check('opt-in paste bypasses webpage blocker', await generic.evaluate(() => !window.pasteEvents) && (await generic.locator('#input').inputValue()).length > 0);
        await target(generic); await popup.locator('#remember-site').check();
        await popup.getByText('已记住本站；刷新后也会自动启用。', { exact: true }).waitFor();
        check('remember uses real registered document-start script', await popup.evaluate(async () => (await chrome.scripting.getRegisteredContentScripts()).some(s => s.matches.includes('https://copy-generic.example/*') && s.runAt === 'document_start')));
        await generic.reload(); await generic.waitForSelector('#feishu-copy-style', { state: 'attached' });
        check('remembered site activates again after reload', await generic.locator('#feishu-copy-style').count() === 1);
        await target(generic); await popup.locator('#toggle-page').click();
        check('disable removes only extension style and marker', await generic.locator('#feishu-copy-style').count() === 0 && await generic.locator('html').getAttribute('data-doc-copy-enabled') === null);
        await select(generic, '<p>关闭测试</p>'); await generic.keyboard.press('Control+c');
        check('disable restores original copy handler', await generic.evaluate(() => !!window.blocked));
        return { channel, passed: results.length, results };
    } finally { await context.close(); }
}
if (typeof module !== 'undefined') {
    module.exports = runV24BrowserTests;
    if (require.main === module) {
        const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
        runV24BrowserTests(chromium, process.argv[2], process.argv[3] || 'chromium')
            .then(result => console.log(JSON.stringify(result, null, 2))).catch(error => { console.error(error); process.exitCode = 1; });
    }
}
