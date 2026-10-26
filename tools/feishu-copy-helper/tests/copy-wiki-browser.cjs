// 使用公开夹具模拟飞书的虚拟全选与延迟加载，键盘和剪贴板均使用真实浏览器。
async function runWikiBrowserTests(browserType, extensionPath, channel = 'chromium') {
    extensionPath = require('node:path').resolve(extensionPath);
    const context = await browserType.launchPersistentContext('', {
        channel, headless: true,
        args: [`--disable-extensions-except=${extensionPath}`, `--load-extension=${extensionPath}`],
    });
    const results = [], errors = [];
    const check = (name, value) => { if (!value) throw new Error(name); results.push({ name, passed: true }); };
    try {
        const fixture = `<!doctype html><meta charset="utf-8"><style>
            #scroll{height:230px;overflow:auto} .block{min-height:400px}
            .bear-virtual-renderUnit-placeholder{height:700px} textarea{height:24px}
            </style><aside>SIDEBAR-DO-NOT-COPY</aside><input id="input" value="INPUT-ONLY">
            <div id="scroll"><div class="docx-page-block"><div class="root-render-unit-container">
            <div class="block" data-block-id="first" data-block-type="heading2"><div class="heading-block"><div class="ace-line" tabindex="0">FIRST-HEADING</div></div></div>
            <div class="bear-virtual-renderUnit-placeholder" data-index="middle"></div>
            <div class="bear-virtual-renderUnit-placeholder" data-index="last"></div>
            </div></div></div><textarea class="docx-selection-hidden-textarea"></textarea><script>
            const root=document.querySelector('.root-render-unit-container'), scroll=document.getElementById('scroll');
            let count=0, virtual=false;
            window.addEventListener('pointerdown',()=>{count=0});
            window.addEventListener('keydown', e=>{
                if(!(e.ctrlKey||e.metaKey)||e.key.toLowerCase()!=='a'||e.target.id==='input')return;
                e.preventDefault(); count++;
                if(count===1){
                    const r=document.createRange();r.selectNodeContents(root.querySelector('.ace-line'));
                    getSelection().removeAllRanges();getSelection().addRange(r);
                }else setTimeout(()=>{
                    virtual=true;getSelection().collapse(root,0);
                    const proxy=document.querySelector('textarea');proxy.value='x';proxy.focus();proxy.select();
                    root.querySelectorAll('.block').forEach(n=>n.classList.add('selected'));
                },60);
            },true);
            window.addEventListener('copy',e=>{e.preventDefault();window.blocked=true},true);
            scroll.addEventListener('scroll',()=>{
                if(window.freezeLoading)return;
                for(const p of root.querySelectorAll('.bear-virtual-renderUnit-placeholder')){
                    const a=p.getBoundingClientRect(),b=scroll.getBoundingClientRect();
                    if(a.top<b.bottom&&a.bottom>b.top){
                        const block=document.createElement('div');block.className='block'+(virtual?' selected':'');
                        block.dataset.blockId=p.dataset.index;
                        if(p.dataset.index==='middle') {block.dataset.blockType='bullet';block.innerHTML='<div class="ace-line">MIDDLE-LIST</div>'}
                        else {block.dataset.blockType='text';block.innerHTML='<div class="ace-line">LAST-PARAGRAPH</div><table><tr><td>TABLE-CELL</td></tr></table>'}
                        p.replaceWith(block);
                    }
                }
            });</script>`;
        await context.route('https://wiki-copy-test.feishu.cn/**', r => r.fulfill({ contentType: 'text/html', body: fixture }));
        await context.route('http://127.0.0.1:13472/**', r => r.fulfill({ contentType: 'text/html', body: '<meta charset=utf-8><textarea id="plain"></textarea><div id="rich" contenteditable="true" style="min-height:50px"></div>' }));
        const page = await context.newPage(), sink = await context.newPage();
        page.on('pageerror', e => errors.push(e.message));
        await sink.goto('http://127.0.0.1:13472/paste');
        let cdp, world;
        const open = async () => {
            await page.goto('https://wiki-copy-test.feishu.cn/wiki/selection');
            await page.waitForSelector('#feishu-copy-style', { state: 'attached' });
            if (cdp) await cdp.detach();
            cdp = await context.newCDPSession(page);
            const worlds = [];
            cdp.on('Runtime.executionContextCreated', ({ context: c }) => worlds.push(c));
            await cdp.send('Runtime.enable');
            world = worlds.find(w => w.name === '文档复制助手');
        };
        const evaluate = async expression => {
            const result = await cdp.send('Runtime.evaluate', { contextId: world.id, expression, returnByValue: true });
            if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
            return result.result.value;
        };
        const status = () => evaluate('DocCopyController.getStatus()');
        const selectAll = async (copy = true) => {
            await page.bringToFront(); await page.locator('.ace-line').first().click();
            await page.keyboard.press('Control+a'); await page.keyboard.press('Control+a');
            if (copy) await page.keyboard.press('Control+c');
        };
        const waitFull = async state => {
            for (let i = 0; i < 100; i++) {
                const value = await status();
                if (value.fullDocument?.state === state && (state !== 'ready' || value.lastCopy)) return value;
                await page.waitForTimeout(80);
            }
            throw new Error('Full document did not reach ' + state + ': ' + JSON.stringify(await status()));
        };
        const paste = async rich => {
            await sink.bringToFront();
            const target = sink.locator(rich ? '#rich' : '#plain');
            await target.fill(''); await target.click(); await sink.keyboard.press('Control+v');
            return rich ? target.innerHTML() : target.inputValue();
        };
        await open();
        await selectAll();
        const value = await waitFull('ready');
        check('immediate Ctrl+C queues until delayed virtual selection and all lazy blocks are ready', value.lastCopy.html && value.fullDocument.blocks === 3);
        const text = await paste(false), html = await paste(true);
        check('whole document includes first middle last and table text', ['FIRST-HEADING', 'MIDDLE-LIST', 'LAST-PARAGRAPH', 'TABLE-CELL'].every(s => text.includes(s)));
        check('whole document excludes sidebar', !text.includes('SIDEBAR'));
        check('whole document preserves headings lists and tables', /<h2\b/.test(html) && /<li\b/.test(html) && /<table\b/.test(html));
        check('all lazy placeholders are loaded and original scroll position restored', await page.evaluate(() => !document.querySelector('.bear-virtual-renderUnit-placeholder') && document.getElementById('scroll').scrollTop === 0));
        check('copy leaves native collapsed selection intact', await page.evaluate(() => getSelection().isCollapsed));
        await evaluate("DocCopyController.configure({mode:'markdown'})");
        await page.bringToFront(); await page.keyboard.press('Control+c');
        const markdown = await paste(false);
        check('cached full selection supports Markdown', markdown.includes('## FIRST-HEADING') && markdown.includes('- MIDDLE-LIST') && markdown.includes('TABLE-CELL'));
        await evaluate("DocCopyController.configure({mode:'plain'})");
        await page.bringToFront(); await page.keyboard.press('Control+c');
        check('cached full selection plain mode keeps exact text', await paste(false) === text);
        await page.locator('#input').click(); await page.keyboard.press('Control+a'); await page.keyboard.press('Control+c');
        check('input selection cancels cache and copies only input', await paste(false) === 'INPUT-ONLY' && !(await status()).fullDocument);

        await open(); await page.locator('.ace-line').first().click(); await page.keyboard.press('Control+a'); await page.keyboard.press('Control+c');
        check('single Ctrl+A copies normal partial selection', await paste(false) === 'FIRST-HEADING' && !(await status()).fullDocument);
        await selectAll(); await waitFull('ready');
        await page.evaluate(() => document.querySelector('.ace-line').firstChild.data += '-EDITED');
        check('body mutation invalidates the full snapshot', !(await status()).fullDocument);
        await selectAll(); await waitFull('ready');
        await page.evaluate(() => history.pushState({}, '', '/wiki/another'));
        check('SPA navigation invalidates previous document snapshot', !(await status()).fullDocument);

        await open(); await page.evaluate(() => { window.freezeLoading = true; });
        await selectAll();
        await page.locator('#input').click(); await page.keyboard.press('Control+a'); await page.keyboard.press('Control+c');
        await page.waitForTimeout(600);
        check('cancelling preparation cannot later overwrite clipboard', !(await status()).fullDocument && await paste(false) === 'INPUT-ONLY');
        await open();
        await page.locator('.ace-line').first().click();
        await page.evaluate(() => {
            window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a', ctrlKey: true }));
            window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a', ctrlKey: true }));
        });
        check('synthetic keys cannot start full document preparation', !(await status()).fullDocument);
        await open();
        await page.evaluate(() => document.querySelector('.bear-virtual-renderUnit-placeholder').style.display = 'none');
        await selectAll(); const failed = await waitFull('failed');
        check('hidden unloaded blocks fail explicitly without partial copy or false success: ' + JSON.stringify(failed.fullDocument), /折叠/.test(failed.fullDocument.error) && !failed.lastCopy);
        check('no uncaught page errors', errors.length === 0);
        return { channel, passed: results.length, results };
    } finally { await context.close(); }
}
if (typeof module !== 'undefined') {
    module.exports = runWikiBrowserTests;
    if (require.main === module) {
        const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
        runWikiBrowserTests(chromium, process.argv[2] || require('node:path').resolve(__dirname, '..'), process.argv[3] || 'chromium')
            .then(result => console.log(JSON.stringify(result, null, 2))).catch(error => { console.error(error); process.exitCode = 1; });
    }
}
