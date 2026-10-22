# 文档格式复制与网页增强

## overview

v2.4 增加平台适配、图片准备和可逆网页增强。默认适配飞书 / Lark 与腾讯文字文档，通用网页由用户启用。

## design decisions

- 快捷键不取消浏览器默认复制，在可信 copy 事件里同步写入文字与 HTML。
- 读取可见 DOM 和计算样式，不读取私有文档接口；克隆到惰性文档，去掉执行性属性和元数据。
- 飞书标题外层包含折叠正文，只将内部 heading-block 还原为标题；隐藏 textarea 是选区代理，应继续使用正文 Selection。
- text 块还原为 p，展开重复 div 包装。展开前记录正文块内的行边界，保留软换行；移除空布局包装，保留原文空段落。
- Markdown 逐层合并相邻块的边界换行，不全局压缩，因此保留代码内部空行。
- 腾讯 sc-text-typo 是通用排版类，不作为段落类型；识别明确的 sc-block-text、header、bulleted_list，避免误判列表。
- 通用网页 rich 模式保留浏览器原生 HTML；粘贴增强默认关闭，不清除原页面事件属性、不改 pointer-events。
- 记住本站时才申请长期网站权限；后台仅给已授权、已启用且记住的网站注册脚本。
- 图片由用户主动准备，仅存在页面内存；复制时核对选区 HTML 后才复用。

## implementation notes

平台识别与语义位于 `copy-platforms.js`，格式和图片位于 `copy-formats.js`，状态与复制位于 `content.js`。`background.js` 同步网站脚本，弹窗检查真实消息回应。

回归用例在 `tests/copy-v24-browser.cjs`。真实文档链接、正文和登录状态不进入公开测试。浏览器真实复制粘贴与 Word / WPS 人工验收分别记录。
