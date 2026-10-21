// 飞书复制助手 - 内容脚本
(function () {
    'use strict';

    let cleanupInterval = null;
    let copyMode = 'rich';
    let settingsReady = false;
    let settingsError = false;
    let settingsRevision = 0;
    let pendingCopyPayload = null;
    let lastCopyFallback = false;
    let closeCopyMenu = null;
    const validMode = mode => ['rich', 'plain', 'markdown'].includes(mode);

    function getStatus() {
        return {
            type: 'FEISHU_COPY_STATUS',
            version: chrome.runtime.getManifest().version,
            ready: settingsReady && !!globalThis.FeishuCopyFormats && !!document.getElementById('feishu-copy-style'),
            mode: copyMode,
            settingsError,
            lastCopyFallback,
        };
    }

    // 同步回应状态，避免声明异步回应却没有关闭消息端口。
    if (typeof chrome !== 'undefined' && chrome.runtime?.onMessage && chrome.storage?.local) {
        chrome.runtime.onMessage.addListener((message, sender, respond) => {
            if (message?.type === 'FEISHU_COPY_GET_STATUS') respond(getStatus());
            else if (message?.type === 'FEISHU_COPY_SET_MODE' && validMode(message.mode)) {
                settingsRevision++;
                copyMode = message.mode;
                settingsReady = true;
                settingsError = false;
                respond(getStatus());
            }
        });
        chrome.storage.onChanged.addListener((changes, area) => {
            if (area === 'local' && changes.copyMode) {
                settingsRevision++;
                copyMode = validMode(changes.copyMode.newValue) ? changes.copyMode.newValue : 'rich';
                settingsReady = true;
                settingsError = false;
            }
        });
        const revision = settingsRevision;
        chrome.storage.local.get({ copyMode: 'rich' }, saved => {
            const error = chrome.runtime.lastError;
            if (revision !== settingsRevision) return;
            settingsError = !!error;
            if (!error && validMode(saved?.copyMode)) copyMode = saved.copyMode;
            settingsReady = true;
        });
    }

    function createCopyPayload(selected, mode) {
        const payload = { text: selected.text, html: '' };
        lastCopyFallback = false;
        if (!selected.selection || mode === 'plain') return payload;
        try {
            const html = globalThis.FeishuCopyFormats.selectionHtml(selected.selection);
            if (!html && selected.text) throw new Error('Empty formatted selection');
            if (mode === 'markdown') payload.text = globalThis.FeishuCopyFormats.markdown(html);
            else payload.html = html;
        } catch (error) {
            lastCopyFallback = true;
            console.warn('飞书复制助手：格式处理失败，仅复制原文', error);
        }
        return payload;
    }

    // 在页面自己的处理器之前接收真实复制事件，保留浏览器的 Ctrl/Cmd+C 默认动作。
    function getCopySelection() {
        const active = document.activeElement;
        if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA')) {
            if (typeof active.selectionStart !== 'number' || active.selectionStart === active.selectionEnd) {
                return null;
            }
            return { text: active.value.slice(active.selectionStart, active.selectionEnd), selection: null };
        }

        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
            return null;
        }
        return { text: selection.toString(), selection };
    }

    window.addEventListener('keydown', function (e) {
        if ((e.ctrlKey || e.metaKey) && !e.altKey && !e.isComposing &&
            e.key.toLowerCase() === 'c' && getCopySelection()) {
            // 只阻止页面劫持快捷键，不取消触发原生 copy 事件的默认动作。
            e.stopImmediatePropagation();
        }
    }, true);

    window.addEventListener('copy', function (e) {
        if (!e.isTrusted || !e.clipboardData) return;
        const selected = pendingCopyPayload ? null : getCopySelection();
        if (!pendingCopyPayload && !selected) return;
        const payload = pendingCopyPayload || createCopyPayload(selected, copyMode);

        try {
            e.clipboardData.setData('text/plain', payload.text);
        } catch (error) {
            console.warn('飞书复制助手：无法写入复制事件，保留原生复制', error);
            return;
        }

        // 图文格式准备失败也不能影响已经取得的纯文本。
        if (payload.html) {
            try {
                e.clipboardData.setData('text/html', payload.html);
            } catch (error) {
                lastCopyFallback = true;
                console.warn('飞书复制助手：仅复制纯文本', error);
            }
        }
        e.preventDefault();
        e.stopImmediatePropagation();
    }, true);

    document.addEventListener('selectstart', function (e) {
        e.stopImmediatePropagation();
    }, true);

    // 强制启用文本选择和复制
    function forceEnableCopy() {
        console.log('飞书复制助手：开始强制启用复制功能');

        // 2. 强制覆盖CSS样式 - 针对飞书的特殊样式
        const forceStyle = document.getElementById('feishu-copy-style') || document.createElement('style');
        forceStyle.id = 'feishu-copy-style';
        forceStyle.textContent = `
            *, *::before, *::after {
                -webkit-user-select: text !important;
                -moz-user-select: text !important;
                -ms-user-select: text !important;
                user-select: text !important;
                -webkit-touch-callout: default !important;
                -webkit-user-drag: auto !important;
                -khtml-user-select: text !important;
            }
            
            /* 针对飞书特定的类名和元素 */
            .doc-content, .doc-editor, .editor-content, .text-content,
            .lark-doc, .lark-editor, .suite-doc, .suite-editor,
            [class*="doc"], [class*="editor"], [class*="content"], [class*="text"],
            [class*="lark"], [class*="suite"], [class*="feishu"] {
                -webkit-user-select: text !important;
                -moz-user-select: text !important;
                -ms-user-select: text !important;
                user-select: text !important;
                pointer-events: auto !important;
            }
            
            /* 图片选择支持 */
            img, [class*="image"], [class*="img"], .docx-image {
                -webkit-user-select: auto !important;
                -moz-user-select: auto !important;
                -ms-user-select: auto !important;
                user-select: auto !important;
                -webkit-user-drag: auto !important;
                -khtml-user-drag: auto !important;
                user-drag: auto !important;
                pointer-events: auto !important;
                cursor: pointer !important;
            }
            
            /* 移除可能的遮罩层和保护层 */
            [style*="user-select: none"], 
            [style*="webkit-user-select: none"],
            .no-select, .unselectable, [unselectable],
            .copy-protect, .text-protect, .content-protect {
                -webkit-user-select: text !important;
                -moz-user-select: text !important;
                -ms-user-select: text !important;
                user-select: text !important;
                pointer-events: auto !important;
            }
            
            /* 飞书可能的保护层 */
            .lark-prevent-select, .suite-prevent-select,
            [data-prevent-select], [data-no-select] {
                -webkit-user-select: text !important;
                -moz-user-select: text !important;
                -ms-user-select: text !important;
                user-select: text !important;
            }
            
            /* 飞书图片特殊处理 */
            img[draggable="false"] {
                -webkit-user-drag: auto !important;
                -khtml-user-drag: auto !important;
                user-drag: auto !important;
                -webkit-user-select: auto !important;
                -moz-user-select: auto !important;
                user-select: auto !important;
            }
        `;
        if (!forceStyle.isConnected) document.head.appendChild(forceStyle);

        // 3. 移除所有阻止选择的属性（优化性能）
        function removeSelectRestrictions() {
            // 只处理可能有限制的元素，而不是所有元素
            const restrictedSelectors = [
                '[unselectable]',
                '[onselectstart]',
                '[oncontextmenu]',
                '[data-prevent-select]',
                '[data-no-select]',
                '.lark-prevent-select',
                '.suite-prevent-select',
                '.no-select',
                '.unselectable',
                'img[draggable="false"]'
            ];

            restrictedSelectors.forEach(selector => {
                try {
                    const elements = document.querySelectorAll(selector);
                    elements.forEach(el => {
                        // 移除各种禁用属性
                        el.removeAttribute('unselectable');
                        el.removeAttribute('onselectstart');
                        el.removeAttribute('oncontextmenu');
                        el.removeAttribute('ondragstart');
                        el.removeAttribute('data-prevent-select');
                        el.removeAttribute('data-no-select');

                        // 强制设置样式
                        el.style.setProperty('-webkit-user-select', 'text', 'important');
                        el.style.setProperty('-moz-user-select', 'text', 'important');
                        el.style.setProperty('user-select', 'text', 'important');
                        el.style.setProperty('pointer-events', 'auto', 'important');

                        // 移除可能的事件处理器
                        el.onselectstart = null;
                        el.oncontextmenu = null;
                        el.ondragstart = null;
                        
                        // 特别处理图片
                        if (el.tagName.toLowerCase() === 'img') {
                            el.removeAttribute('draggable');
                            el.style.setProperty('-webkit-user-drag', 'auto', 'important');
                            el.style.setProperty('-khtml-user-drag', 'auto', 'important');
                            el.style.setProperty('user-drag', 'auto', 'important');
                            
                            // 处理飞书图片特殊属性
                            if (el.src && (el.src.includes('feishu.cn') || el.src.includes('larksuite.com'))) {
                                // 添加alt文本如果没有
                                if (!el.alt) {
                                    el.alt = '飞书文档图片';
                                }
                            }
                        }
                    });
                } catch (e) {
                    // 忽略选择器错误
                }
            });
        }

        removeSelectRestrictions();

        // 4. 重写可能被劫持的方法
        if (typeof document.onselectstart !== 'undefined') {
            document.onselectstart = null;
        }
        if (typeof document.oncontextmenu !== 'undefined') {
            document.oncontextmenu = null;
        }

        // 5. 定期清理（防止动态添加的限制）- 降低频率避免卡顿
        if (cleanupInterval === null) {
            cleanupInterval = setInterval(removeSelectRestrictions, 3000);
        }

        console.log('飞书复制助手：强制复制功能已启用');
    }

    // document_start 先安装复制处理器，DOM 就绪后再应用样式和清理属性。
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', forceEnableCopy, { once: true });
    } else {
        forceEnableCopy();
    }

    // 监听动态内容变化，持续强制启用（优化性能）
    let observerTimeout = null;
    const observer = new MutationObserver(function (mutations) {
        // 使用防抖，避免频繁触发
        if (observerTimeout) {
            clearTimeout(observerTimeout);
        }

        let shouldReapply = false;
        mutations.forEach(function (mutation) {
            if (mutation.addedNodes.length > 0) {
                // 只有当添加的节点包含文本内容时才重新应用
                for (let node of mutation.addedNodes) {
                    if (node.nodeType === 1 && (node.textContent || '').trim().length > 0) {
                        shouldReapply = true;
                        break;
                    }
                }
            }
        });

        if (shouldReapply) {
            observerTimeout = setTimeout(forceEnableCopy, 200);
        }
    });

    if (document.body) {
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['style', 'class', 'unselectable', 'data-prevent-select']
        });
    } else {
        document.addEventListener('DOMContentLoaded', function () {
            observer.observe(document.body, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['style', 'class', 'unselectable', 'data-prevent-select']
            });
        });
    }

    // 添加右键菜单复制功能（支持图文混合）
    document.addEventListener('contextmenu', function (e) {
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
                    if (mode === 'rich') payload.html = selectedContent.html;
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

