// 文档复制助手：真实 copy 事件同步写入；可逆启用，不改页面权限或文档内容。
(function () {
    'use strict';
    if (globalThis.DocCopyController) {
        if (globalThis.DocCopyBootstrap) globalThis.DocCopyController.configure(globalThis.DocCopyBootstrap);
        return;
    }
    const platform = globalThis.DocCopyPlatforms?.detect() || { id: 'feishu', name: '飞书 / Lark', automatic: true };
    const origin = globalThis.location?.origin || 'https://my.feishu.cn';
    let config = { enabled: platform.automatic, mode: 'rich', paste: false, ...globalThis.DocCopyBootstrap };
    let savedSettings = {};
    let copyMode = config.mode;
    let settingsReady = false, settingsError = false, settingsRevision = 0;
    let pendingCopyPayload = null, lastCopyFallback = false, closeCopyMenu = null;
    let lastCopy = null, prepared = null, preparing = false, preparation = null, prepareRevision = 0;
    const validMode = mode => ['rich', 'plain', 'markdown'].includes(mode);

    function configure(value = {}) {
        if (typeof value.enabled === 'boolean') config.enabled = value.enabled;
        if (typeof value.paste === 'boolean') config.paste = value.paste;
        if (validMode(value.mode)) config.mode = copyMode = value.mode;
        applyStyle();
        if (!config.enabled) {
            closeCopyMenu?.();
            prepared = preparation = null;
            preparing = false; prepareRevision++;
        }
    }
    function getStatus() {
        const selected = getCopySelection();
        return {
            type: 'FEISHU_COPY_STATUS', version: chrome.runtime.getManifest().version,
            ready: settingsReady && !!globalThis.FeishuCopyFormats && (!config.enabled || !!document.getElementById('feishu-copy-style')),
            mode: copyMode, enabled: config.enabled, paste: config.paste,
            platform: platform.id, platformName: platform.name, settingsError, lastCopyFallback,
            selectedCharacters: selected?.text.length || 0, selectionAvailable: !!selected,
            lastCopy, preparation, preparing,
        };
    }
    globalThis.DocCopyController = { configure, getStatus };

    function applySaved(saved) {
        savedSettings = saved.siteSettings || {};
        const site = savedSettings[origin] || {};
        configure({ enabled: platform.automatic || site.remember ? site.enabled ?? platform.automatic : config.enabled, mode: site.mode || saved.copyMode || 'rich', paste: site.paste ?? false });
    }
    if (typeof chrome !== 'undefined' && chrome.runtime?.onMessage && chrome.storage?.local) {
        chrome.runtime.onMessage.addListener((message, sender, respond) => {
            if (message?.type === 'FEISHU_COPY_GET_STATUS') respond(getStatus());
            else if (message?.type === 'FEISHU_COPY_SET_MODE' && validMode(message.mode)) {
                settingsRevision++; configure({ mode: message.mode });
                settingsReady = true; settingsError = false; respond(getStatus());
            } else if (message?.type === 'DOC_COPY_CONFIGURE') {
                settingsRevision++; configure(message.config);
                settingsReady = true; settingsError = false; respond(getStatus());
            } else if (message?.type === 'DOC_COPY_PREPARE') {
                const selected = getCopySelection();
                if (config.enabled && selected?.selection && !preparing) void prepareSelection(selected);
                respond(getStatus());
            }
        });
        chrome.storage.onChanged.addListener((changes, area) => {
            if (area !== 'local') return;
            if (changes.copyMode || changes.siteSettings) {
                settingsRevision++;
                const siteSettings = changes.siteSettings ? changes.siteSettings.newValue || {} : savedSettings;
                // 站点配置被删除时，恢复平台默认设置。
                if (changes.siteSettings && !siteSettings[origin]) config.enabled = platform.automatic;
                applySaved({ siteSettings, copyMode: changes.copyMode?.newValue || copyMode });
                settingsReady = true; settingsError = false;
            }
        });
        const revision = settingsRevision;
        chrome.storage.local.get({ copyMode: 'rich', siteSettings: {} }, saved => {
            const error = chrome.runtime.lastError;
            if (revision !== settingsRevision) return;
            settingsError = !!error;
            if (!error) applySaved(saved || {});
            settingsReady = true;
        });
    }
    function createCopyPayload(selected, mode) {
        const payload = { text: selected.text, html: '', warnings: [] };
        lastCopyFallback = false;
        if (!selected.selection || mode === 'plain') return payload;
        try {
            const result = globalThis.FeishuCopyFormats.selectionDocument
                ? globalThis.FeishuCopyFormats.selectionDocument(selected.selection, platform.id)
                : { html: globalThis.FeishuCopyFormats.selectionHtml(selected.selection), warnings: [] };
            let html = result.html;
            payload.warnings = result.warnings || [];
            if (!html && selected.text) throw new Error('Empty formatted selection');
            if (prepared && prepared.sourceHtml === html) {
                html = prepared.html;
                if (prepared.failed) payload.warnings.push(prepared.failed + ' 张图片仍为原地址或不可用');
            } else if (prepared) { prepared = null; preparation = null; }
            if (mode === 'markdown') payload.text = globalThis.FeishuCopyFormats.markdown(html);
            else payload.html = html;
        } catch {
            lastCopyFallback = true;
            payload.warnings = ['格式处理失败，已回退为纯文本'];
        }
        return payload;
    }
    async function prepareSelection(selected) {
        const revision = ++prepareRevision;
        preparing = true;
        preparation = { state: 'preparing' };
        try {
            const sourceHtml = globalThis.FeishuCopyFormats.selectionHtml(selected.selection);
            const result = await globalThis.FeishuCopyFormats.prepareImages(sourceHtml);
            if (revision !== prepareRevision) return;
            prepared = { sourceHtml, ...result };
            preparation = { state: 'ready', embedded: result.embedded, failed: result.failed, total: result.total };
        } catch {
            if (revision === prepareRevision) preparation = { state: 'failed' };
        } finally { if (revision === prepareRevision) preparing = false; }
    }

    function getCopySelection() {
        const active = document.activeElement;
        if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA') && !globalThis.DocCopyPlatforms?.isProxyInput(active, platform.id)) {
            if (typeof active.selectionStart !== 'number' || active.selectionStart === active.selectionEnd) return null;
            return { text: active.value.slice(active.selectionStart, active.selectionEnd), selection: null };
        }
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0 || selection.isCollapsed) return null;
        return { text: selection.toString(), selection };
    }
    window.addEventListener('keydown', function (e) {
        if (config.enabled && (e.ctrlKey || e.metaKey) && !e.altKey && !e.isComposing &&
            e.key.toLowerCase() === 'c' && getCopySelection()) e.stopImmediatePropagation();
    }, true);
    window.addEventListener('copy', function (e) {
        if (!config.enabled || !e.isTrusted || !e.clipboardData) return;
        const selected = pendingCopyPayload ? null : getCopySelection();
        if (!pendingCopyPayload && !selected) return;
        // 普通网页的保留格式模式保留浏览器原生 HTML 生成，只隔离网页的复制拦截。
        if (!pendingCopyPayload && platform.id === 'generic' && copyMode === 'rich' && !prepared) {
            e.stopImmediatePropagation();
            lastCopy = { method: 'native', warnings: [] };
            return;
        }
        const payload = pendingCopyPayload || createCopyPayload(selected, copyMode);
        try { e.clipboardData.setData('text/plain', payload.text); }
        catch { return; }
        if (payload.html) {
            try { e.clipboardData.setData('text/html', payload.html); }
            catch { lastCopyFallback = true; }
        }
        lastCopy = { method: 'copy-event', html: !!payload.html && !lastCopyFallback, warnings: payload.warnings || [] };
        e.preventDefault();
        e.stopImmediatePropagation();
    }, true);
    window.addEventListener('selectstart', e => { if (config.enabled) e.stopImmediatePropagation(); }, true);
    window.addEventListener('paste', e => {
        if (config.enabled && config.paste) e.stopImmediatePropagation();
    }, true);

    function applyStyle() {
        if (!document.documentElement) return;
        const old = document.getElementById('feishu-copy-style');
        if (!config.enabled) {
            old?.remove();
            document.documentElement.removeAttribute('data-doc-copy-enabled');
            return;
        }
        document.documentElement.setAttribute('data-doc-copy-enabled', 'true');
        const style = old || document.createElement('style');
        style.id = 'feishu-copy-style';
        // 仅覆盖文本选择，不改 pointer-events、拖拽、页面事件属性或按钮行为。
        style.textContent = 'html[data-doc-copy-enabled="true"] :where(p,div,span,a,article,section,main,h1,h2,h3,h4,h5,h6,li,td,th,pre,code,blockquote,img){-webkit-user-select:text!important;user-select:text!important;-webkit-touch-callout:default!important}';
        if (!style.isConnected) (document.head || document.documentElement).appendChild(style);
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', applyStyle, { once: true });
    else applyStyle();

    // 添加右键菜单复制功能（支持图文混合）
    window.addEventListener('contextmenu', function (e) {
        if (!config.enabled) return;
        if (platform.id === 'generic') { e.stopImmediatePropagation(); return; }
        const selection = window.getSelection();
        const selectedText = selection.toString();
        const selectedContent = getSelectedContent(selection);

        if ((selectedText && selectedText.trim().length > 0) || selectedContent.hasImages) {
            // 阻止默认右键菜单
            e.preventDefault();
            e.stopPropagation();

            createCustomContextMenu(e.pageX, e.pageY, selectedText, selectedContent);
        }
    }, true);

    function getSelectedContent(selection) {
        const text = selection.toString();
        let html = '';
        try { html = globalThis.FeishuCopyFormats.selectionHtml(selection); }
        catch (error) { console.warn('飞书复制助手：无法准备图文选区', error); }
        return { text, html, hasImages: /<img\b/i.test(html), formattedText: text };
    }

    // 菜单为一次性模式，不改变用户在弹窗中保存的默认模式。
    function createCustomContextMenu(x, y, text, selectedContent) {
        if (closeCopyMenu) closeCopyMenu();
        const menu = document.createElement('div');
        menu.id = 'feishu-copy-menu';
        menu.setAttribute('role', 'menu');
        menu.style.cssText = 'position:absolute;background:white;color:#1f2329;border:1px solid #ccc;border-radius:6px;box-shadow:0 4px 12px #0002;z-index:999999;min-width:170px;font:14px sans-serif;padding:4px';
        menu.style.left = x + 'px';
        menu.style.top = y + 'px';
        const choices = [
            ['保留格式复制', 'rich'], ['复制纯文本', 'plain'], ['复制 Markdown', 'markdown'],
            ['复制清洁版本', 'clean'], ['超级清洁版本', 'super-clean'],
        ];
        for (const [label, mode] of choices) {
            const item = document.createElement('button');
            item.type = 'button';
            item.setAttribute('role', 'menuitem');
            item.textContent = label;
            item.style.cssText = 'display:block;width:100%;padding:9px 12px;text-align:left;background:white;color:#1f2329;border:0;border-radius:4px;cursor:pointer;font:inherit';
            // 保留原选区，键盘触发菜单项时也使用预先捕获的内容。
            item.addEventListener('mousedown', e => e.preventDefault());
            item.addEventListener('click', () => {
                let payload = { text, html: '' };
                try {
                    if (mode === 'rich') payload.html = prepared?.sourceHtml === selectedContent.html ? prepared.html : selectedContent.html;
                    else if (mode === 'markdown') payload.text = globalThis.FeishuCopyFormats.markdown(selectedContent.html);
                    else if (mode === 'clean') payload.text = cleanTextForCopy(text);
                    else if (mode === 'super-clean') payload.text = superCleanTextForCopy(text);
                } catch (error) {
                    console.warn('飞书复制助手：菜单格式处理失败，仅复制原文', error);
                }
                closeMenu();
                void writeCopyPayload(payload);
            });
            menu.appendChild(item);
        }
        function closeMenu() {
            menu.remove();
            document.removeEventListener('click', onOutside);
            document.removeEventListener('keydown', onKey);
            if (closeCopyMenu === closeMenu) closeCopyMenu = null;
        }
        function onOutside(e) { if (!menu.contains(e.target)) closeMenu(); }
        function onKey(e) { if (e.key === 'Escape') closeMenu(); }
        closeCopyMenu = closeMenu;
        document.addEventListener('click', onOutside);
        document.addEventListener('keydown', onKey);
        document.body.appendChild(menu);
        const rect = menu.getBoundingClientRect();
        menu.style.left = Math.max(window.scrollX, Math.min(x, window.scrollX + window.innerWidth - rect.width)) + 'px';
        menu.style.top = Math.max(window.scrollY, Math.min(y, window.scrollY + window.innerHeight - rect.height)) + 'px';
    }

    // 添加双击复制功能
    document.addEventListener('dblclick', function (e) {
        if (!config.enabled || platform.id === 'generic') return;
        const target = e.target;
        if (target.closest('input,textarea,select,button,[contenteditable="true"]')) return;
        const text = target.textContent || target.innerText;
        if (text && text.trim().length > 0) {
            // 尝试选择文本
            const range = document.createRange();
            range.selectNodeContents(target);
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);

            // 与菜单复制共用有真实结果检查的回退流程。
            void forceCopyText(text);
        }
    });

    // 主动复制也使用同一个真实 copy 事件，不依赖异步剪贴板权限。
    async function writeCopyPayload(payload) {
        if (!config.enabled) return;
        let successful = false;
        pendingCopyPayload = payload;
        try { successful = document.execCommand('copy'); }
        catch (error) { console.warn('飞书复制助手：主动复制失败', error); }
        finally { pendingCopyPayload = null; }
        if (successful) {
            showCopyNotification('复制成功');
            return;
        }
        try {
            if (payload.html) {
                await navigator.clipboard.write([new ClipboardItem({
                    'text/plain': new Blob([payload.text], { type: 'text/plain' }),
                    'text/html': new Blob([payload.html], { type: 'text/html' }),
                })]);
            } else await navigator.clipboard.writeText(payload.text);
            showCopyNotification('复制成功');
        } catch (error) {
            // 纯文本回退仍由原有流程验证结果，失败时明确提供手动复制。
            const copied = fallbackCopy(payload.text);
            if (copied && payload.html) showCopyNotification('格式复制失败，已复制纯文本');
        }
    }

    async function forceCopyText(text) {
        const selected = getCopySelection() || { text, selection: null };
        await writeCopyPayload(createCopyPayload(selected, copyMode));
    }

    // 飞书专用的文本清洁函数
    function cleanTextForCopy(text) {
        let cleanText = text;

        // 1. 移除飞书可能的追踪字符
        cleanText = cleanText.replace(/[\u200B-\u200D\uFEFF]/g, ''); // 零宽字符
        cleanText = cleanText.replace(/[\u2060-\u206F]/g, ''); // 通用标点符号
        cleanText = cleanText.replace(/[\u180E]/g, ''); // 蒙古文分隔符
        cleanText = cleanText.replace(/[\uFE00-\uFE0F]/g, ''); // 变体选择符

        // 2. 移除文本方向控制字符
        cleanText = cleanText.replace(/[\u202A-\u202E]/g, '');
        cleanText = cleanText.replace(/[\u2066-\u2069]/g, '');
        cleanText = cleanText.replace(/[\u061C]/g, '');

        // 3. 移除可能的追踪标记
        cleanText = cleanText.replace(/[\u034F]/g, '');
        cleanText = cleanText.replace(/[\u115F\u1160]/g, '');
        cleanText = cleanText.replace(/[\u17B4\u17B5]/g, '');

        // 4. 标准化Unicode字符（保留中文标点）
        cleanText = cleanText.normalize('NFC');

        // 5. 移除HTML实体
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = cleanText;
        cleanText = tempDiv.textContent || tempDiv.innerText || cleanText;

        // 6. 标准化空白字符，保留格式
        cleanText = cleanText.replace(/^[ \t]+|[ \t]+$/gm, '');
        cleanText = cleanText.replace(/\r\n/g, '\n');
        cleanText = cleanText.replace(/\r/g, '\n');

        // 7. 清理控制字符
        cleanText = cleanText.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');

        return cleanText;
    }

    // 超级清洁版本
    function superCleanTextForCopy(text) {
        let cleanText = cleanTextForCopy(text);

        // 通过textarea重新输入来清除隐藏标记
        const textarea = document.createElement('textarea');
        textarea.value = cleanText;
        document.body.appendChild(textarea);
        textarea.select();
        cleanText = textarea.value;
        document.body.removeChild(textarea);

        // 字符级别过滤
        const chars = [];
        for (let i = 0; i < cleanText.length; i++) {
            const char = cleanText.charAt(i);
            if (char.match(/[\u0020-\u007E\u4e00-\u9fff\u3400-\u4dbf\uff00-\uffef\u3000-\u303f\u2000-\u206f\n\r\t]/)) {
                chars.push(char);
            }
        }
        cleanText = chars.join('');

        return cleanText;
    }

    // 备用复制方法
    function fallbackCopy(text) {
        const textArea = document.createElement('textarea');
        const previousActive = document.activeElement;
        const selection = window.getSelection();
        const ranges = [];
        for (let i = 0; selection && i < selection.rangeCount; i++) {
            ranges.push(selection.getRangeAt(i).cloneRange());
        }
        let successful = false;
        try {
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            textArea.style.opacity = '0';
            textArea.style.pointerEvents = 'none';
            document.body.appendChild(textArea);

            textArea.focus();
            textArea.select();
            textArea.setSelectionRange(0, text.length);

            successful = document.execCommand('copy');
        } catch (err) {
            console.log('execCommand 复制失败:', err);
        } finally {
            textArea.remove();
            if (previousActive && previousActive.isConnected) previousActive.focus({ preventScroll: true });
            if (selection) {
                selection.removeAllRanges();
                ranges.forEach(range => selection.addRange(range));
            }
        }
        if (successful) showCopyNotification('复制成功');
        else manualCopy(text);
        return successful;
    }

    // 手动复制方法
    function manualCopy(text) {
        // 合成 copy 事件不会写入系统剪贴板，明确展示失败和可手动复制的原文。
        showTextModal(text);
    }

    // 显示文本模态框
    function showTextModal(text) {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            z-index: 999999;
            display: flex;
            justify-content: center;
            align-items: center;
        `;

        const content = document.createElement('div');
        content.style.cssText = `
            background: white;
            padding: 20px;
            border-radius: 8px;
            max-width: 80%;
            max-height: 80%;
            overflow: auto;
        `;

        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.cssText = `
            width: 100%;
            height: 200px;
            margin-bottom: 10px;
            font-family: monospace;
        `;

        const closeBtn = document.createElement('button');
        closeBtn.textContent = '关闭';
        closeBtn.style.cssText = `
            padding: 8px 16px;
            background: #1f883d;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        `;

        closeBtn.onclick = () => modal.remove();
        modal.onclick = (e) => {
            if (e.target === modal) modal.remove();
        };

        content.appendChild(document.createTextNode('复制失败，请手动选择以下文本：'));
        content.appendChild(document.createElement('br'));
        content.appendChild(textarea);
        content.appendChild(closeBtn);
        modal.appendChild(content);
        document.body.appendChild(modal);

        setTimeout(() => {
            textarea.focus();
            textarea.select();
        }, 100);
    }

    // 显示复制成功提示（在选中文本旁边）
    function showCopyNotification(message) {
        const selection = window.getSelection();
        let x = 20, y = 20;

        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();
            if (rect.width > 0 && rect.height > 0) {
                x = rect.right + 10;
                y = rect.top;

                if (x + 120 > window.innerWidth) {
                    x = rect.left - 130;
                }
                if (y < 10) {
                    y = 10;
                }
                if (y + 40 > window.innerHeight) {
                    y = window.innerHeight - 50;
                }
            }
        }

        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            background: #1f883d;
            color: white;
            padding: 8px 12px;
            border-radius: 4px;
            z-index: 10000;
            font-size: 12px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            pointer-events: none;
            white-space: nowrap;
        `;
        document.body.appendChild(notification);

        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 1500);
    }

})();
