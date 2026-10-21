# 日志待办助手介绍与安装包

## overview

在项目列表新增日志待办助手入口，并通过 `/projects/journal-suite/` 介绍 v1.9.2 与手动安装方式。

## design decisions

- 沿用飞书图文复制项目页的布局和站点主题，不调整其他页面交互。
- 经用户明确授权，公开可安装 ZIP，源码仓库仍保持私有。
- 包含编译后的 main.js、manifest.json、styles.css 与 README.md；不包含源码、配置、云凭证、用户笔记或开发目录。
- 提供 SHA-256 校验值；介绍页区分代码回归、网站浏览器验收和真实 Obsidian 宿主验收。
- 沿用现有 GitHub main 到托管平台的发布方式，不修改域名、Worker 或代理。

## implementation notes

- 页面：`src/pages/projects/journal-suite.astro`。
- 入口：`src/pages/projects.astro`。
- 安装包：`public/downloads/journal-suite-1.9.2.zip`。
- 校验值：`public/downloads/journal-suite-1.9.2.sha256`。
