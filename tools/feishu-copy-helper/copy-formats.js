// 选区格式转换与按需图片准备；只读取原页面，不修改文档。
(function () {
    'use strict';

    const styleProperties = [
        'font-family', 'font-size', 'font-weight', 'font-style', 'color',
        'background-color', 'text-decoration-line', 'text-align', 'white-space',
        'line-height', 'vertical-align', 'list-style-type', 'border-collapse',
        'border-top', 'border-right', 'border-bottom', 'border-left', 'padding',
        'margin-top', 'margin-bottom', 'margin-left', 'margin-right', 'text-indent',
        'letter-spacing', 'word-spacing', 'direction', 'border-spacing',
    ];
    const ignoredTags = /^(SCRIPT|STYLE|LINK|META|IFRAME|OBJECT|EMBED|TEMPLATE|NOSCRIPT|BUTTON|INPUT|TEXTAREA|SELECT)$/;
    const allowedTags = /^(A|ABBR|B|BLOCKQUOTE|BR|CODE|COL|COLGROUP|DEL|DIV|EM|FIGCAPTION|FIGURE|H[1-6]|HR|I|IMG|LI|MARK|OL|P|PRE|S|SMALL|SPAN|STRONG|SUB|SUP|TABLE|TBODY|TD|TFOOT|TH|THEAD|TR|U|UL)$/;
    const blockTags = /^(BLOCKQUOTE|DIV|FIGURE|H[1-6]|LI|OL|P|PRE|TABLE|TD|TH|UL)$/;

    function safeUrl(value, base, image = false) {
        if (!value) return '';
        try {
            const url = new URL(value, base);
            if (['https:', 'http:'].includes(url.protocol) || (!image && url.protocol === 'mailto:')) {
                return url.href;
            }
            if (image && /^data:image\/(png|jpeg|gif|webp);base64,/i.test(value)) return value;
            if (image && url.protocol === 'blob:' && url.origin === new URL(base).origin) return url.href;
        } catch { /* 无法解析的链接不写入剪贴板。 */ }
        return '';
    }

    function selectionDocument(selection, platform = globalThis.DocCopyPlatforms?.detect().id || 'generic') {
        const warnings = new Set();
        if (!selection || !selection.rangeCount || selection.isCollapsed) return { html: '', warnings: [] };
        const range = selection.getRangeAt(0);
        const output = document.implementation.createHTMLDocument('');
        let root = range.commonAncestorContainer;
        if (root.nodeType === Node.DOCUMENT_NODE) root = document.body;
        if (root.nodeType === Node.TEXT_NODE) root = root.parentElement;
        while (root.parentElement && !blockTags.test(root.tagName) && root.parentElement !== document.body) {
            root = root.parentElement;
        }
        if (platform !== 'generic') root = root.closest('[data-block-type]:not([data-block-type="page"]),.sc-block-wrapper,[role="heading"]') || root;
        // 补齐局部选区需要的列表和表格容器，仍只克隆与选区相交的内容。
        if (root.closest) root = root.closest('td,th')?.closest('table') || root.closest('li')?.parentElement || root;

        let visited = 0;
        function cloneSelected(source) {
            if (!range.intersectsNode(source)) return null;
            if (++visited > 20000) throw new Error('选区过大，请分段复制');
            if (source.nodeType === Node.TEXT_NODE) {
                const start = source === range.startContainer ? range.startOffset : 0;
                const end = source === range.endContainer ? range.endOffset : source.length;
                return end > start ? output.createTextNode(source.data.slice(start, end)) : null;
            }
            if (source.nodeType !== Node.ELEMENT_NODE) return null;
            if (ignoredTags.test(source.tagName) || globalThis.DocCopyPlatforms?.ignore(source)) return null;
            const style = window.getComputedStyle(source);
            if (style.display === 'none' || style.visibility === 'hidden') return null;
            if (/^(SVG|CANVAS)$/.test(source.tagName)) {
                warnings.add('选区中的绘图或公式未还原，请使用原应用导出');
                return output.createTextNode('[绘图或公式]');
            }
            const semantic = globalThis.DocCopyPlatforms?.semantics(source, platform) || { tag: source.tagName.toLowerCase() };
            const tag = allowedTags.test(semantic.tag.toUpperCase()) ? semantic.tag : 'div';
            const copy = output.createElement(tag);
            for (const property of styleProperties) {
                const value = style.getPropertyValue(property);
                if (value) copy.style.setProperty(property, value);
            }
            for (const attribute of ['title', 'alt', 'start', 'value', 'colspan', 'rowspan']) {
                if (source.hasAttribute(attribute)) copy.setAttribute(attribute, source.getAttribute(attribute));
            }
            if (semantic.list) {
                copy.dataset.copyList = semantic.list;
                copy.dataset.copyLevel = semantic.level;
                if (semantic.index) copy.setAttribute('value', semantic.index);
            }
            if (['table', 'td', 'th', 'col', 'img'].includes(tag)) {
                const width = source.getBoundingClientRect().width;
                if (width > 0) copy.style.width = Math.round(width) + 'px';
            }
            if (tag === 'ol' && source.tagName === 'OL' && !source.hasAttribute('reversed')) {
                const first = Array.from(source.children).find(child => child.tagName === 'LI' && range.intersectsNode(child));
                if (first) copy.setAttribute('start', first.value || (Number(source.getAttribute('start')) || 1) + Array.from(source.children).filter(child => child.tagName === 'LI').indexOf(first));
            }
            if (tag === 'a' || tag === 'img') {
                const attribute = tag === 'a' ? 'href' : 'src';
                const value = tag === 'img' ? source.currentSrc || source.getAttribute('src') || source.getAttribute('data-src') : source.getAttribute(attribute);
                const url = safeUrl(value, source.baseURI, tag === 'img');
                if (url) copy.setAttribute(attribute, url);
                else if (tag === 'img') warnings.add('部分图片没有可复制的地址');
            }
            if (tag === 'img') {
                copy.style.maxWidth = '100%';
                for (const dimension of ['width', 'height']) {
                    if (source[dimension] > 0) copy.setAttribute(dimension, source[dimension]);
                }
            }
            for (const child of source.childNodes) {
                const cloned = cloneSelected(child);
                if (cloned) copy.appendChild(cloned);
            }
            if (tag === 'pre' && source.tagName !== 'PRE') {
                copy.textContent = codeText(copy).replace(/^\n|\n$/g, '');
                copy.style.whiteSpace = 'pre-wrap';
            }
            return copy;
        }

        const container = output.createElement('div');
        const cloned = cloneSelected(root);
        if (cloned) container.appendChild(cloned);
        if (platform !== 'generic') normalizeParagraphs(container);
        normalizeLists(container, output);
        if (container.querySelector('[colspan]:not([colspan="1"]),[rowspan]:not([rowspan="1"])')) warnings.add('合并单元格仅在保留格式模式中保留；Markdown 使用 HTML 表格');
        return { html: container.innerHTML, warnings: [...warnings] };
    }

    function codeText(node) {
        if (node.nodeType === Node.TEXT_NODE) return node.data;
        if (node.tagName === 'BR') return '\n';
        return Array.from(node.childNodes, child => codeText(child) + (child.tagName === 'DIV' ? '\n' : '')).join('');
    }

    function normalizeLists(root, doc) {
        for (const parent of [root, ...root.querySelectorAll('*')]) {
            let stack = [];
            for (const node of [...parent.childNodes]) {
                if (node.nodeType === Node.TEXT_NODE && !node.textContent.trim()) continue;
                if (!node.dataset?.copyList) { stack = []; continue; }
                const type = node.dataset.copyList;
                const level = Math.min(Number(node.dataset.copyLevel) || 0, stack.length);
                delete node.dataset.copyList; delete node.dataset.copyLevel;
                if (parent.tagName === 'OL' || parent.tagName === 'UL') continue;
                stack.length = Math.min(stack.length, level + 1);
                if (!stack[level] || stack[level].tagName.toLowerCase() !== type) {
                    const list = doc.createElement(type);
                    if (type === 'ol' && node.hasAttribute('value')) list.setAttribute('start', node.getAttribute('value'));
                    if (level && stack[level - 1]?.lastElementChild) stack[level - 1].lastElementChild.appendChild(list);
                    else parent.insertBefore(list, node);
                    stack[level] = list;
                }
                stack[level].appendChild(node);
            }
        }
    }

    const selectionHtml = selection => selectionDocument(selection).html;

    function normalizeParagraphs(container) {
        // 编辑器用多层 div 排版；Word 会把这些容器分别当成段落。
        // 子元素已携带计算样式，去掉包装层不会丢失文字样式。
        const blockSelector = 'p,h1,h2,h3,h4,h5,h6,li,ol,ul,pre,blockquote,table';
        const lineBreaks = new WeakSet([...container.querySelectorAll('p div,li div,td div,th div')].filter(node =>
            node.nextElementSibling?.tagName === 'DIV' && !node.querySelector(blockSelector) &&
            !node.nextElementSibling.querySelector(blockSelector) && node.textContent.trim() && node.nextElementSibling.textContent.trim()));
        for (const node of [...container.querySelectorAll('div')].reverse()) {
            // 选区边缘和编辑器工具会留下空包装；正文的空段落已被映射为 p。
            if (!node.textContent.replace(/[\s\u200b-\u200d\ufeff]/g, '') && !node.querySelector('br,img,hr,table,pre,p,h1,h2,h3,h4,h5,h6,li')) {
                node.remove();
                continue;
            }
            if (node.querySelector(blockSelector) || node.parentElement?.closest('p,h1,h2,h3,h4,h5,h6,li,pre,td,th')) {
                if (lineBreaks.has(node)) node.appendChild(node.ownerDocument.createElement('br'));
                node.replaceWith(...node.childNodes);
            } else {
                const paragraph = node.ownerDocument.createElement('p');
                for (const attribute of [...node.attributes]) paragraph.setAttribute(attribute.name, attribute.value);
                paragraph.append(...node.childNodes);
                node.replaceWith(paragraph);
            }
        }
    }

    const escapeText = text => text.replace(/\\/g, '\\\\').replace(/([`*_{}\[\]<>~|])/g, '\\$1')
        .replace(/(^|\n)([ \t]*)([#>+-]|\d+\.)(?=\s)/g, '$1$2\\$3');
    const wrap = (text, marker) => text.replace(/^(\s*)([\s\S]*?)(\s*)$/, (_, before, value, after) =>
        value ? `${before}${marker}${value}${marker}${after}` : text);

    function markdown(html) {
        const container = document.implementation.createHTMLDocument('').createElement('div');
        container.innerHTML = html;
        function render(node, context = {}) {
            if (node.nodeType === Node.TEXT_NODE) return escapeText(node.data.replace(/[\t\r\n ]+/g, ' '));
            if (node.nodeType !== Node.ELEMENT_NODE || ignoredTags.test(node.tagName)) return '';
            const tag = node.tagName.toLowerCase();
            if (tag === 'pre') {
                const text = node.textContent.replace(/\n$/, '');
                const longest = Math.max(2, ...(text.match(/`+/g) || []).map(run => run.length));
                const fence = '`'.repeat(longest + 1);
                return `\n\n${fence}\n${text}\n${fence}\n\n`;
            }
            if (tag === 'code') {
                const text = node.textContent.replace(/\n/g, ' ');
                const fence = '`'.repeat(Math.max(0, ...(text.match(/`+/g) || []).map(run => run.length)) + 1);
                const padding = /^`|`$/.test(text) || /^ .* $/.test(text) ? ' ' : '';
                return `${fence}${padding}${text}${padding}${fence}`;
            }
            if (tag === 'br') return '  \n';
            if (tag === 'hr') return '\n\n---\n\n';
            if (tag === 'img') {
                const url = safeUrl(node.getAttribute('src'), document.baseURI, true);
                const alt = escapeText(node.getAttribute('alt') || '图片');
                return url ? `![${alt}](<${url.replace(/>/g, '%3E')}>)` : `[${alt}]`;
            }
            const heading = /^h[1-6]$/.test(tag);
            const bold = heading || /^(strong|b)$/.test(tag) || Number(node.style.fontWeight) >= 600 || node.style.fontWeight === 'bold';
            const italic = /^(em|i)$/.test(tag) || node.style.fontStyle === 'italic';
            const strike = /^(del|s)$/.test(tag) || node.style.textDecorationLine.includes('line-through');
            const next = { bold: context.bold || bold, italic: context.italic || italic, strike: context.strike || strike };
            const children = () => joinMarkdown(Array.from(node.childNodes, child => render(child, next)));
            if (tag === 'table') {
                if (node.querySelector('[colspan]:not([colspan="1"]),[rowspan]:not([rowspan="1"])')) return '\n\n' + node.outerHTML + '\n\n';
                const rows = Array.from(node.querySelectorAll('tr')).filter(row => row.closest('table') === node);
                if (!rows.length) return '';
                const cells = rows.map(row => Array.from(row.cells, cell => render(cell, { bold: cell.tagName === 'TH' }).trim().replace(/\n+/g, '<br>')));
                const width = Math.max(...cells.map(row => row.length));
                const lines = cells.map(row => `| ${Array.from({ length: width }, (_, i) => row[i] || '').join(' | ')} |`);
                lines.splice(1, 0, `| ${Array(width).fill('---').join(' | ')} |`);
                return '\n\n' + lines.join('\n') + '\n\n';
            }
            if (tag === 'ol' || tag === 'ul') {
                let index = Number(node.getAttribute('start')) || 1;
                const items = Array.from(node.children).filter(child => child.tagName === 'LI').map(item => {
                    if (item.hasAttribute('value')) index = Number(item.getAttribute('value'));
                    const marker = tag === 'ol' ? `${index++}. ` : '- ';
                    const value = render(item, next).trim().replace(/\n{3,}/g, '\n\n');
                    return marker + value.replace(/\n/g, '\n' + ' '.repeat(marker.length));
                });
                return '\n\n' + items.join('\n') + '\n\n';
            }
            let text = children();
            if (bold && !context.bold && !heading) text = wrap(text, '**');
            if (italic && !context.italic) text = wrap(text, '*');
            if (strike && !context.strike) text = wrap(text, '~~');
            if (tag === 'a') {
                const url = safeUrl(node.getAttribute('href'), document.baseURI);
                if (url) text = `[${text}](<${url.replace(/>/g, '%3E')}>)`;
            }
            if (heading) return `\n\n${'#'.repeat(Number(tag[1]))} ${text.trim()}\n\n`;
            if (tag === 'blockquote') return '\n\n' + text.trim().split('\n').map(line => '> ' + line).join('\n') + '\n\n';
            if (tag === 'div' && Array.from(node.children).some(child => blockTags.test(child.tagName))) return text;
            if (['p', 'div', 'figure', 'figcaption'].includes(tag)) return '\n\n' + text.trim() + '\n\n';
            return text;
        }
        // 只合并相邻块的边界空行，不改代码块内部的空行。
        return joinMarkdown(Array.from(container.childNodes, child => render(child))).trim();
    }

    function joinMarkdown(parts) {
        return parts.reduce((text, part) => {
            if (/\n\n[ \t]*$/.test(text)) {
                if (!part.trim()) return text;
                if (/^[ \t]*\n\n/.test(part)) return text.replace(/[ \t]+$/, '') + part.replace(/^[ \t\n]+/, '');
            }
            return text + part;
        }, '');
    }

    async function prepareImages(html) {
        const container = document.implementation.createHTMLDocument('').createElement('div');
        container.innerHTML = html;
        const images = [...container.querySelectorAll('img')];
        let embedded = 0, failed = 0, totalBytes = 0;
        const deadline = Date.now() + 25000;
        for (const [index, img] of images.entries()) {
            const src = img.getAttribute('src') || '';
            if (/^data:image\/(png|jpeg|gif|webp);base64,/i.test(src)) { embedded++; continue; }
            if (index >= 20 || !src || Date.now() >= deadline) { failed++; continue; }
            const controller = new AbortController();
            const timer = setTimeout(() => controller.abort(), 5000);
            try {
                const response = await fetch(src, { credentials: 'same-origin', signal: controller.signal });
                const mime = response.headers.get('content-type')?.split(';')[0].trim().toLowerCase();
                if (!response.ok || !['image/png', 'image/jpeg', 'image/gif', 'image/webp'].includes(mime)) throw new Error('Image unavailable');
                const reader = response.body.getReader();
                const chunks = [];
                let size = 0;
                while (true) {
                    const { value, done } = await reader.read();
                    if (done) break;
                    size += value.byteLength;
                    if (size > 5 * 1024 * 1024 || totalBytes + size > 20 * 1024 * 1024) { await reader.cancel(); throw new Error('Image too large'); }
                    chunks.push(value);
                }
                totalBytes += size;
                const data = await new Promise((resolve, reject) => {
                    const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.onerror = reject;
                    reader.readAsDataURL(new Blob(chunks, { type: mime }));
                });
                img.setAttribute('src', data);
                embedded++;
            } catch { failed++; }
            finally { clearTimeout(timer); }
        }
        return { html: container.innerHTML, embedded, failed, total: images.length };
    }

    globalThis.FeishuCopyFormats = Object.freeze({ selectionHtml, selectionDocument, markdown, prepareImages });
})();
