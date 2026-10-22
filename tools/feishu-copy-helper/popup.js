// 所有“已生效”状态均来自内容脚本回应。
document.addEventListener('DOMContentLoaded', async function () {
    const $ = id => document.getElementById(id);
    const mode = $('copy-mode'), status = $('status'), feedback = $('mode-feedback');
    const retry = $('check-status'), toggle = $('toggle-page'), remember = $('remember-site'), paste = $('enable-paste'), prepare = $('prepare-images');
    const version = chrome.runtime.getManifest().version;
    let activeTab = null, state = null, site = {}, busy = false, poll = null;
    const platform = () => DocCopyPlatforms.detect(activeTab?.url);
    const origin = () => new URL(activeTab.url).origin;
    function callApi(invoke, timeout = 3000) {
        return new Promise((resolve, reject) => {
            const timer = setTimeout(() => reject(new Error('timeout')), timeout);
            try {
                invoke(result => {
                    clearTimeout(timer);
                    const error = chrome.runtime.lastError;
                    if (error) reject(new Error(error.message)); else resolve(result);
                });
            } catch (error) { clearTimeout(timer); reject(error); }
        });
    }
    const send = (type, extra = {}) => callApi(done => chrome.tabs.sendMessage(activeTab.id, { type, ...extra }, { frameId: 0 }, done));
    function display(text, active = false) {
        status.textContent = text;
        status.className = 'status ' + (active ? 'active' : 'inactive');
    }
    function details() {
        const lines = [];
        if (state?.selectionAvailable) lines.push('当前选区：' + state.selectedCharacters + ' 个文字字符');
        else lines.push('先在正文中选择需要复制的内容。');
        if (state?.lastCopyFallback) lines.push('上次复制已回退为纯文本。');
        if (state?.lastCopy?.warnings?.length) lines.push(...state.lastCopy.warnings);
        const result = state?.preparation;
        if (result?.state === 'preparing') lines.push('正在准备选区图片…');
        if (result?.state === 'ready') lines.push('图片准备完成：' + result.embedded + '/' + result.total + ' 张已内嵌，' + result.failed + ' 张未内嵌。保持原选区，再按 Ctrl+C。');
        if (result?.state === 'failed') lines.push('图片准备失败，文字复制仍可使用。');
        $('selection-status').textContent = lines.join('\n');
        prepare.disabled = !state?.enabled || !state?.selectionAvailable || !!state?.preparing;
        if (state?.preparing) poll = setTimeout(checkStatus, 700);
    }
    function controls(enabled) {
        mode.disabled = !enabled; paste.disabled = !enabled;
        toggle.disabled = false;
        toggle.textContent = enabled ? '关闭当前页面增强' : '启用当前页面增强';
    }
    async function checkStatus() {
        if (busy) return;
        clearTimeout(poll);
        busy = true; retry.disabled = true; mode.disabled = true;
        try {
            const tabs = await callApi(done => chrome.tabs.query({ active: true, currentWindow: true }, done));
            activeTab = tabs?.[0]; state = null;
            const kind = platform();
            if (kind.id === 'restricted' || kind.id === 'unsupported') {
                display('当前页面不受支持，请打开飞书、腾讯文字文档或普通网页');
                toggle.disabled = remember.disabled = paste.disabled = prepare.disabled = true;
                return;
            }
            remember.disabled = kind.automatic;
            $('site-name').textContent = kind.name + ' · ' + new URL(activeTab.url).hostname;
            const saved = await callApi(done => chrome.storage.local.get({ copyMode: 'rich', siteSettings: {} }, done));
            site = saved.siteSettings[origin()] || {};
            remember.checked = !!site.remember;
            mode.value = site.mode || saved.copyMode;
            paste.checked = !!site.paste;
            try { state = await send('FEISHU_COPY_GET_STATUS'); }
            catch {
                display(kind.automatic ? '未连接到页面脚本，请重新加载扩展并刷新文档' : '此网页尚未启用增强，可点击下方按钮');
                controls(false); details(); return;
            }
            if (state?.type !== 'FEISHU_COPY_STATUS' || state.version !== version) {
                display('页面仍在使用旧版脚本，请刷新文档后重试'); controls(false); return;
            }
            if (!state.ready) { display('页面脚本正在初始化，请稍后重新检测'); controls(false); return; }
            if (state.settingsError) { display('设置读取失败，当前使用默认模式；请刷新重试'); controls(false); return; }
            controls(state.enabled);
            mode.value = state.mode; paste.checked = !!state.paste;
            display(state.enabled ? '✓ 当前页面已连接 · v' + version : '当前页面增强已关闭', state.enabled);
            feedback.textContent = '本站设置保存在浏览器本地；图片需要单独准备。';
            details();
        } catch { display('检测失败，请重新加载扩展并刷新文档'); }
        finally { busy = false; retry.disabled = false; }
    }
    async function saveSite(changes) {
        const saved = await callApi(done => chrome.storage.local.get({ siteSettings: {} }, done));
        site = { ...site, ...changes };
        await callApi(done => chrome.storage.local.set({ siteSettings: { ...saved.siteSettings, [origin()]: site } }, done));
    }
    async function apply(config) {
        let response;
        try { response = await send('DOC_COPY_CONFIGURE', { config }); }
        catch {
            await callApi(done => chrome.scripting.executeScript({
                target: { tabId: activeTab.id }, func: value => { globalThis.DocCopyBootstrap = value; }, args: [config],
            }, done));
            await callApi(done => chrome.scripting.executeScript({
                target: { tabId: activeTab.id }, files: ['copy-platforms.js', 'copy-formats.js', 'content.js'],
            }, done));
            response = await send('DOC_COPY_CONFIGURE', { config });
        }
        if (response?.version !== version || !response.ready || response.enabled !== config.enabled) throw new Error('not applied');
        state = response;
    }
    toggle.addEventListener('click', async () => {
        toggle.disabled = true;
        try {
            const enabled = !state?.enabled;
            if (platform().automatic || site.remember) await saveSite({ enabled });
            await apply({ enabled, mode: mode.value, paste: paste.checked });
            await checkStatus();
        } catch { display('当前页面未确认生效，请记住本站并刷新后重试'); }
        finally { toggle.disabled = false; }
    });
    mode.addEventListener('change', async () => {
        mode.disabled = true;
        try {
            await saveSite({ mode: mode.value });
        } catch { feedback.textContent = '保存失败，请重试。'; mode.disabled = false; return; }
        try {
            const result = await send('FEISHU_COPY_SET_MODE', { mode: mode.value });
            if (result?.version !== version || !result.ready || result.mode !== mode.value) throw new Error('not applied');
            feedback.textContent = '已保存，当前页面已生效；本站其他已打开的文档也会同步。';
            mode.disabled = false;
        } catch { display('设置已保存，当前页面未确认生效，请刷新文档'); }
    });
    paste.addEventListener('change', async () => {
        try { await saveSite({ paste: paste.checked }); await apply({ enabled: true, mode: mode.value, paste: paste.checked }); }
        catch { feedback.textContent = '粘贴增强未确认生效，请重新检测。'; }
    });
    remember.addEventListener('change', async () => {
        const desired = remember.checked;
        remember.disabled = true;
        try {
            const pattern = origin() + '/*';
            // 必须在用户点击事件中申请，不在后台静默申请所有网站权限。
            if (desired && !await callApi(done => chrome.permissions.request({ origins: [pattern] }, done), 60000)) {
                remember.checked = false; feedback.textContent = '未授权，本站不会自动启用。'; return;
            }
            await saveSite({ remember: desired, enabled: desired ? true : !!state?.enabled, mode: mode.value, paste: paste.checked });
            const synced = await callApi(done => chrome.runtime.sendMessage({ type: 'DOC_COPY_SYNC_SITES' }, done));
            if (!synced?.ok) throw new Error('registration failed');
            if (!desired) await callApi(done => chrome.permissions.remove({ origins: [pattern] }, done));
            if (desired) await apply({ enabled: true, mode: mode.value, paste: paste.checked });
            await checkStatus();
            feedback.textContent = desired ? '已记住本站；刷新后也会自动启用。' : '已取消自动启用并移除本站可选权限。';
        } catch { feedback.textContent = '站点设置未完成，请重新检测后重试。'; }
        finally { remember.disabled = false; }
    });
    prepare.addEventListener('click', async () => {
        try {
            state = await send('DOC_COPY_PREPARE'); details();
            if (!state.preparing) feedback.textContent = '请先在正文中保留选区，再准备图片。';
        } catch { feedback.textContent = '图片准备请求失败，请重新检测。'; }
    });
    retry.addEventListener('click', checkStatus);
    await checkStatus();
});
