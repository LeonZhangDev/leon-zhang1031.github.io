// 弹窗通过内容脚本握手检测当前页面；设置只写入扩展本地存储。
document.addEventListener('DOMContentLoaded', async function () {
    const status = document.getElementById('status');
    const mode = document.getElementById('copy-mode');
    const feedback = document.getElementById('mode-feedback');
    const retry = document.getElementById('check-status');
    const version = chrome.runtime.getManifest().version;
    let activeTab = null;
    let checking = false;

    function callApi(invoke) {
        return new Promise((resolve, reject) => {
            const timer = setTimeout(() => reject(new Error('timeout')), 2000);
            try {
                invoke(result => {
                    clearTimeout(timer);
                    const error = chrome.runtime.lastError;
                    if (error) reject(new Error(error.message));
                    else resolve(result);
                });
            } catch (error) { clearTimeout(timer); reject(error); }
        });
    }

    function display(text, active = false) {
        status.textContent = text;
        status.className = 'status ' + (active ? 'active' : 'inactive');
    }

    function supported(url) {
        try {
            const parsed = new URL(url);
            return ['http:', 'https:'].includes(parsed.protocol) &&
                ['feishu.cn', 'larksuite.com'].some(domain => parsed.hostname === domain || parsed.hostname.endsWith('.' + domain));
        } catch { return false; }
    }

    async function checkStatus() {
        if (checking) return;
        checking = true;
        retry.disabled = true;
        mode.disabled = true;
        display('正在检测当前页面…');
        try {
            const tabs = await callApi(done => chrome.tabs.query({ active: true, currentWindow: true }, done));
            activeTab = tabs?.[0];
            if (!supported(activeTab?.url)) {
                display('当前页面不受支持，请打开飞书或 Lark 文档');
                return;
            }
            const result = await callApi(done => chrome.tabs.sendMessage(activeTab.id, { type: 'FEISHU_COPY_GET_STATUS' }, { frameId: 0 }, done));
            if (result?.type !== 'FEISHU_COPY_STATUS' || result.version !== version) {
                display('页面仍在使用旧版脚本，请刷新文档后重试');
            } else if (!result.ready) {
                display('页面脚本正在初始化，请稍后重新检测');
            } else if (result.settingsError) {
                display('设置读取失败，当前使用默认模式；请刷新重试');
            } else {
                display(`✓ 当前页面已连接 · v${version}`, true);
                mode.value = result.mode;
                mode.disabled = false;
                feedback.textContent = result.lastCopyFallback ? '上次格式复制已回退为纯文本。' : '默认用于 Ctrl+C / Cmd+C 和双击复制。';
            }
        } catch {
            display('未连接到页面脚本，请重新加载扩展并刷新文档');
        } finally {
            checking = false;
            retry.disabled = false;
        }
    }

    mode.addEventListener('change', async () => {
        const selected = mode.value;
        mode.disabled = true;
        retry.disabled = true;
        feedback.textContent = '正在保存…';
        try {
            if (!['rich', 'plain', 'markdown'].includes(selected)) throw new Error('invalid mode');
            await callApi(done => chrome.storage.local.set({ copyMode: selected }, done));
        } catch {
            feedback.textContent = '保存失败，请重试。';
            mode.disabled = false;
            retry.disabled = false;
            return;
        }
        try {
            const result = await callApi(done => chrome.tabs.sendMessage(activeTab.id,
                { type: 'FEISHU_COPY_SET_MODE', mode: selected }, { frameId: 0 }, done));
            if (result?.type !== 'FEISHU_COPY_STATUS' || result.version !== version || !result.ready || result.mode !== selected) throw new Error('not applied');
            feedback.textContent = '已保存，当前页面已生效；其他已打开的文档也会同步。';
            mode.disabled = false;
        } catch {
            display('设置已保存，当前页面未确认生效，请刷新文档');
            feedback.textContent = '刷新后会使用已保存的模式。';
        } finally { retry.disabled = false; }
    });

    retry.addEventListener('click', checkStatus);
    await checkStatus();
});

