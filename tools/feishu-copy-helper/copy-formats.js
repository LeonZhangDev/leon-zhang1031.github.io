// 选区格式转换；只读取原页面样式，不修改文档，也不发起网络请求。
(function () {
    'use strict';

    const styleProperties = [
        'font-family', 'font-size', 'font-weight', 'font-style', 'color',
        'background-color', 'text-decoration-line', 'text-align', 'white-space',
        'line-height', 'vertical-align', 'list-style-type', 'border-collapse',
        'border-top', 'border-right', 'border-bottom', 'border-left', 'padding',
    ];
    const ignoredTags = /^(SCRIPT|STYLE|LINK|META|IFRAME|OBJECT|EMBED|TEMPLATE|NOSCRIPT|BUTTON|INPUT|TEXTAREA|SELECT|SVG|CANVAS)$/;
    const allowedTags = /^(A|ABBR|B|BLOCKQUOTE|BR|CODE|DEL|DIV|EM|FIGCAPTION|FIGURE|H[1-6]|HR|I|IMG|LI|MARK|OL|P|PRE|S|SMALL|SPAN|STRONG|SUB|SUP|TABLE|TBODY|TD|TFOOT|TH|THEAD|TR|U|UL)$/;
    const blockTags = /^(BLOCKQUOTE|DIV|FIGURE|H[1-6]|LI|OL|P|PRE|TABLE|TD|TH|UL)$/;

    function safeUrl(value, base, image = false) {
        if (!value) return '';
        try {
            const url = new URL(value, base);
            if (['https:', 'http:'].includes(url.protocol) || (!image && url.protocol === 'mailto:')) {
                return url.href;
            }
            if (image && /^data:image\/(png|jpeg|gif|webp);base64,/i.test(value)) return value;
        } catch { /* 无法解析的链接不写入剪贴板。 */ }
        return '';
    }

    function selectionHtml(selection) {
        if (!selection || !selection.rangeCount || selection.isCollapsed) return '';
        const range = selection.getRangeAt(0);
        const output = document.implementation.createHTMLDocument('');
        let root = range.commonAncestorContainer;
        if (root.nodeType === Node.DOCUMENT_NODE) root = document.body;
        if (root.nodeType === Node.TEXT_NODE) root = root.parentElement;
        while (root.parentElement && !blockTags.test(root.tagName) && root.parentElement !== document.body) {
            root = root.parentElement;
        }
        // 补齐局部选区需要的列表和表格容器，仍只克隆与选区相交的内容。
        if (root.closest) root = root.closest('td,th')?.closest('table') || root.closest('li')?.parentElement || root;

        function cloneSelected(source) {
            if (!range.intersectsNode(source)) return null;
            if (source.nodeType === Node.TEXT_NODE) {
                const start = source === range.startContainer ? range.startOffset : 0;
                const end = source === range.endContainer ? range.endOffset : source.length;
                return end > start ? output.createTextNode(source.data.slice(start, end)) : null;
            }
            if (source.nodeType !== Node.ELEMENT_NODE || ignoredTags.test(source.tagName)) return null;
            const tag = allowedTags.test(source.tagName) ? source.tagName.toLowerCase() : 'div';
            const copy = output.createElement(tag);
            const style = window.getComputedStyle(source);
            for (const property of styleProperties) {
                const value = style.getPropertyValue(property);
                if (value) copy.style.setProperty(property, value);
            }
            for (const attribute of ['title', 'alt', 'start', 'value', 'colspan', 'rowspan']) {
                if (source.hasAttribute(attribute)) copy.setAttribute(attribute, source.getAttribute(attribute));
            }
            if (tag === 'a' || tag === 'img') {
                const attribute = tag === 'a' ? 'href' : 'src';
                const url = safeUrl(source.getAttribute(attribute), source.baseURI, tag === 'img');
                if (url) copy.setAttribute(attribute, url);
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
            return copy;
        }

        const container = output.createElement('div');
        const cloned = cloneSelected(root);
        if (cloned) container.appendChild(cloned);
        return container.innerHTML;
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
            const children = () => Array.from(node.childNodes, child => render(child, next)).join('');
            if (tag === 'table') {
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
            if (['p', 'div', 'figure', 'figcaption'].includes(tag)) return '\n\n' + text.trim() + '\n\n';
            return text;
        }
        // 不全局压缩换行，以免破坏代码块内部的空行。
        return Array.from(container.childNodes, child => render(child)).join('').trim();
    }

    globalThis.FeishuCopyFormats = Object.freeze({ selectionHtml, markdown });
})();

