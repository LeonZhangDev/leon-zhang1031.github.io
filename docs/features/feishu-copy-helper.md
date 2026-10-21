# 飞书图文复制产品展示

## Overview

在 /projects/ 的 GitHub 模块展示 LeonZhangDev 维护的飞书图文复制扩展，详情页为 /projects/feishu-copy-helper/。版本 2.3.0 提供保留格式、纯文本、Markdown 和真实页面连接检测。

## Design decisions

- 复用现有项目卡片和 BaseLayout，不修改站点域名、导航或其他项目。
- 扩展源码放在 tools/feishu-copy-helper，安装包放在 public/downloads。安装包只包含 6 个允许的文件，不包含测试、浏览器会话、日志、依赖或凭据。
- README 使用 humanizer-zh 编辑中文表达，保留来源、功能限制和测试结论。
- 图片保留引用，格式由目标应用决定；不承诺飞书专用组件或合并表格完全还原。
- 模式仅保存至 chrome.storage.local；页面状态由同步消息握手确认，不将网址匹配当作连接成功。

## Implementation notes

- 扩展在 document_start 加载 copy-formats.js、content.js，Ctrl/Cmd+C 仍通过真实 copy 事件同步写入剪贴板。
- 使用原页面计算样式和无浏览上下文的文档生成 HTML；Markdown 采用递归转换，保留代码空行和列表层级。
- 打包命令：在 tools/feishu-copy-helper 中运行 powershell -ExecutionPolicy Bypass -File scripts/package-extension.ps1。发布时同步更新版本号、ZIP、SHA256 与详情页。
- 2026-10-21：18 项 Node 逻辑测试通过；从安装 ZIP 解压的真实扩展通过 17 项快捷键检查、33 项格式及模式检查。
- 站点预览只构建本次涉及的 2 条页面路由及其真实布局和样式；不是整个站点的完整回归。线上部署另行核对。
- v2.2 的实际 Edge 纯文本验收来自用户手动确认；新版在 Word、Notion 和真实飞书文档的格式粘贴仍需分别验收。
