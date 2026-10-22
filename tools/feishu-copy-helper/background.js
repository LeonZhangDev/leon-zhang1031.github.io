// 为用户明确记住的网站注册早期脚本；未授权的网站不会自动注入。
'use strict';
const copyFiles = ['copy-platforms.js', 'copy-formats.js', 'content.js'];
const scriptId = origin => 'copy-' + Array.from(origin, char => char.charCodeAt(0).toString(16)).join('-');
async function syncSites() {
    const { siteSettings = {} } = await chrome.storage.local.get('siteSettings');
    const wanted = [];
    for (const [origin, config] of Object.entries(siteSettings)) {
        try {
            const url = new URL(origin);
            if (!['https:', 'http:'].includes(url.protocol) || !config.remember || !config.enabled) continue;
            const pattern = url.origin + '/*';
            if (await chrome.permissions.contains({ origins: [pattern] })) {
                wanted.push({ id: scriptId(url.origin), matches: [pattern], js: copyFiles, runAt: 'document_start', persistAcrossSessions: true });
            }
        } catch { /* 忽略已失效的站点配置。 */ }
    }
    const current = await chrome.scripting.getRegisteredContentScripts();
    const ids = current.filter(item => item.id.startsWith('copy-')).map(item => item.id);
    if (ids.length) await chrome.scripting.unregisterContentScripts({ ids });
    if (wanted.length) await chrome.scripting.registerContentScripts(wanted);
}
let syncing = Promise.resolve();
function scheduleSync() {
    syncing = syncing.then(syncSites, syncSites).then(() => true).catch(error => {
        console.warn('文档复制助手：站点注册失败', error.message); return false;
    });
    return syncing;
}
chrome.runtime.onInstalled.addListener(scheduleSync);
chrome.runtime.onStartup.addListener(scheduleSync);
chrome.storage.onChanged.addListener((changes, area) => { if (area === 'local' && changes.siteSettings) void scheduleSync(); });
chrome.permissions.onRemoved.addListener(scheduleSync);
chrome.runtime.onMessage.addListener((message, sender, respond) => {
    if (message?.type !== 'DOC_COPY_SYNC_SITES') return;
    scheduleSync().then(ok => respond({ ok }));
    return true;
});
