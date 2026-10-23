import { Marked } from './vendor/marked.js';
import DOMPurify from './vendor/purify.js';

const escape = text => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const parser = new Marked({ gfm: true, breaks: false, tokenizer: {
  url(src) {
    // GFM's default autolinker consumes adjacent Chinese punctuation as URL text.
    // Keep that punctuation in prose; explicit Markdown links use the normal parser.
    const match = /^https?:\/\/[^\s<>，。；、！？（）【】《》]+/.exec(src);
    if (!match || !/^[，。；、！？（）【】《》]/.test(src.slice(match[0].length))) return false;
    const raw = match[0];
    return { type: 'link', raw, text: raw, href: raw, tokens: [{ type: 'text', raw, text: raw }] };
  },
}, renderer: {
  html({ text }) { return escape(text); },
  image({ text }) { return `<span>[图片未加载：${escape(text)}]</span>`; },
} });
const allowedTags = ['p', 'br', 'hr', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'em', 'del', 'blockquote',
  'ul', 'ol', 'li', 'pre', 'code', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'a', 'span', 'input'];

export function renderMarkdown(markdown, target) {
  const fragment = DOMPurify.sanitize(parser.parse(markdown), { RETURN_DOM_FRAGMENT: true,
    ALLOWED_TAGS: allowedTags, ALLOWED_ATTR: ['href', 'title', 'class', 'type', 'checked', 'disabled', 'start'],
    ALLOW_DATA_ATTR: false, ALLOW_ARIA_ATTR: false });
  for (const link of fragment.querySelectorAll('a')) {
    try {
      if (new URL(link.getAttribute('href')).protocol !== 'https:') throw new Error();
      link.target = '_blank'; link.rel = 'noopener noreferrer';
    } catch { link.removeAttribute('href'); }
  }
  for (const input of fragment.querySelectorAll('input')) { input.type = 'checkbox'; input.disabled = true; }
  for (const table of fragment.querySelectorAll('table')) {
    const wrapper = document.createElement('div'); wrapper.className = 'table-scroll'; wrapper.tabIndex = 0;
    table.classList.add('report-table'); table.replaceWith(wrapper); wrapper.append(table);
  }
  for (const pre of fragment.querySelectorAll('pre')) {
    const code = pre.querySelector('code'); if (!code) continue;
    const copy = document.createElement('button'); copy.type = 'button'; copy.className = 'copy-code'; copy.textContent = '复制代码';
    copy.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(code.textContent); copy.textContent = '已复制'; }
      catch { copy.textContent = '复制失败，请选择代码'; }
    });
    pre.prepend(copy);
  }
  target.replaceChildren(fragment);
}
