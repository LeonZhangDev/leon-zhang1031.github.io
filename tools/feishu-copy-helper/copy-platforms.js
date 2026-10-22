// 平台识别与正文语义适配。只读取已经显示的 DOM，不请求文档接口。
(function () {
    'use strict';
    const belongs = (host, domain) => host === domain || host.endsWith('.' + domain);
    function detect(value = location.href) {
        try {
            const url = new URL(value);
            if (!['https:', 'http:'].includes(url.protocol)) return { id: 'restricted', name: '受限页面', automatic: false };
            if (['feishu.cn', 'larksuite.com'].some(domain => belongs(url.hostname, domain))) {
                return { id: 'feishu', name: '飞书 / Lark', automatic: !/^(accounts|passport)\./.test(url.hostname) };
            }
            if (url.hostname === 'docs.qq.com') {
                const supported = /^\/(doc|aio)\//.test(url.pathname);
                return { id: supported ? 'tencent' : 'unsupported', name: supported ? '腾讯文字文档' : '腾讯非文字页面', automatic: supported };
            }
            return { id: 'generic', name: '通用网页', automatic: false };
        } catch { return { id: 'restricted', name: '受限页面', automatic: false }; }
    }

    function semantics(node, platform) {
        const tag = node.tagName.toLowerCase();
        if (platform === 'generic') return { tag };
        if (platform === 'feishu' && node.matches('.heading-block')) {
            const type = node.parentElement?.getAttribute('data-block-type') || '';
            if (/^heading[1-6]$/.test(type)) return { tag: 'h' + type.slice(-1) };
        }
        const kind = [node.getAttribute('data-block-type'), node.getAttribute('data-type'),
            node.getAttribute('data-node-type'), typeof node.className === 'string' ? node.className : ''].filter(Boolean).join(' ').toLowerCase();
        if (node.getAttribute('role') === 'heading') {
            return { tag: 'h' + Math.min(6, Math.max(1, Number(node.getAttribute('aria-level')) || 1)) };
        }
        if (!node.hasAttribute('data-block-type') && !node.matches('.sc-block-wrapper,[data-node-type],[data-type]')) return { tag };
        const heading = kind.match(/(?:^|[\s_-])(?:heading|header|h)[_-]?([1-6])(?:[\s_-]|$)/);
        if (heading) return { tag: node.querySelector(':scope > .heading-block') ? 'div' : 'h' + heading[1] };
        if (/(?:^|[\s_-])(?:code-block|codeblock|code|pre)(?:[\s_-]|$)/.test(kind)) return { tag: 'pre' };
        if (/(?:^|[\s_-])divider(?:[\s_-]|$)/.test(kind)) return { tag: 'hr' };
        if (/(?:^|[\s_-])(?:blockquote|quote)(?:[\s_-]|$)/.test(kind)) return { tag: 'blockquote' };
        if (/(?:^|[\s_-])(?:bullet|bulleted[_-]list|unordered[_-]list)(?:[\s_-]|$)/.test(kind)) return { tag: 'li', list: 'ul', level: level(node) };
        if (/(?:^|[\s_-])(?:ordered[_-]list|ordered|numbered|list[_-]number)(?:[\s_-]|$)/.test(kind)) {
            const marker = node.querySelector('.order,.sc-list-marker')?.textContent.match(/^\s*(\d+)/);
            return { tag: 'li', list: 'ol', level: level(node), index: Number(node.getAttribute('data-list-start') || node.getAttribute('data-start') || marker?.[1]) || undefined };
        }
        if (node.getAttribute('data-block-type') === 'text' || node.matches('.docx-text-block,.sc-block-text')) return { tag: 'p' };
        return { tag };
    }
    function level(node) {
        const value = Number(node.getAttribute('data-indent') || node.getAttribute('data-level') || 0);
        return Math.max(0, Math.min(8, Number.isFinite(value) ? value : 0));
    }
    function ignore(node) {
        return node.matches('[aria-hidden="true"],[data-copy-ignore],.docx-block-tools,.block-actions,.sc-block-zero-space,.sc-list-marker,.sc-block-code-linenumber-wrapper,.list-number,.list-bullet,.order,.bullet');
    }
    function isProxyInput(node, platform) {
        return platform === 'feishu' && node.matches('textarea.docx-selection-hidden-textarea');
    }
    globalThis.DocCopyPlatforms = Object.freeze({ detect, semantics, ignore, isProxyInput });
})();
