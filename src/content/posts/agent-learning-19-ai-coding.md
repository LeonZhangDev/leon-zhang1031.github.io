---
title: "第 19 章 · AI 编程与 Claude Code"
date: "2026-10-22"
draft: false
author: "学习资料整理"
description: "使用方法、工作机制、上下文、权限、记忆、调试与审查"
tags: ["Agent", "学习路线"]
categories: ["AI 工程"]
prerequisites: ["agent-learning-18-training-inference"]
verification: {"status": "not-run", "scope": "本次仅整理资料；示例代码与原文技术结论未复跑。"}
---

使用方法、工作机制、上下文、权限、记忆、调试与审查

[学习路线](/posts/agent-learning-route/) · [上一章](/posts/agent-learning-18-training-inference/) · [下一章](/posts/agent-learning-20-skills-harness/)

本章按知识小节编排。项目内容作为学习案例阅读，示例代码与原文技术结论未在本次整理中执行验证。

## 本章目录

- [AI 工具与工程实践](#section-0103)
- [Claude Code 从入门到精通](#section-0104)
- [Claude Code 概述](#section-0105)
- [核心特性与用法](#section-0106)
- [最佳实践经验](#section-0107)
- [面试问答 Q&amp;A](#section-0108)
- [Codex VS ClaudeCode](#section-0109)
- [Codex ClaudeCode安装小技巧](#section-0110)
- [如何给ClaudeCode（包括其他coding工具）节省Token？](#section-0111)
- [参考资源](#section-0112)
- [Vibe Coding](#section-0113)
- [核心技巧](#section-0114)
- [建议](#section-0115)
- [不同Vibe Coding工具对比](#section-0116)
- [参数视频](#section-0117)
- [Vibe Coding 入门教程](#section-2157)
- [什么是 Vibe Coding](#section-2158)
- [Vibe Coding vs 传统编程](#section-2159)
- [为什么现在可以 Vibe Coding](#section-2160)
- [大模型编码能力的飞跃](#section-2161)
- [AI 编程工具的爆发](#section-2162)
- [Agent 模式的出现](#section-2163)
- [主流工具介绍](#section-2164)
- [快速开始](#section-2165)
- [第一个项目：Hello, Vibe World!](#section-2166)
- [Vibe Coding 核心工作流](#section-2167)
- [完整工作流图示](#section-2168)
- [第一步：描述需求](#section-2169)
- [第二步：审查 Diff](#section-2170)
- [第三步：迭代修改](#section-2171)
- [第四步：交付](#section-2172)
- [实战演示：用 Claude Code 从零构建一个 Todo 应用](#section-2173)
- [项目目标](#section-2174)
- [第一步：初始化项目](#section-2175)
- [第二步：Claude Code 做了什么](#section-2176)
- [实例](#section-2177)
- [实例](#section-2178)
- [第三步：审查代码](#section-2179)
- [第四步：运行测试](#section-2180)
- [第五步：提交代码](#section-2181)
- [写好提示词的技巧](#section-2182)
- [四要素模型](#section-2183)
- [好提示词 vs 差提示词](#section-2184)
- [误区一：AI 可以替代所有编程知识](#section-2186)
- [误区二：一次性描述所有功能](#section-2187)
- [误区三：不读 AI 写的代码](#section-2188)
- [注意事项](#section-2189)
- [适合 Vibe Coding 的场景](#section-2190)

<a id="section-0103"></a>
## AI 工具与工程实践

<a id="f-doxcnVbAhixOjVklrZC8b07PFrK"></a>

<p id="f-doxcnXAPp1mFxJVLqAEcrr6GbGd"><span>在这个AI快速发展的时代，很多工作方式都在被颠覆。很多技巧，其实无关乎是否是大模型的岗位。作为一个传统的开发，无论你是</span><span style="font-weight:bold">什么开发，前端后端测试，甚至你是产品经理，本章的内容你都该掌握。</span><span>比如提示词工程，甚至是高中生都可以学习一下如何更好的使用提示词和AI交互。Agent SKILL,帮助我们定义工作流，避免每次从头和AI打招呼。本章的内容不光对</span><span style="font-weight:bold">面试</span><span>很重要（越来越多的公司想要考察你如何使用AI，会不会聪明地用AI，这无关乎你的岗位），也对你自身的发展，工作效率的提升有帮助。</span></p>

<p id="f-doxcnqe3sGo7HW2C0ILrVMn6SMc"><span>所以本章，其实无论背景，都建议学习。很多东西比如</span><span style="font-weight:bold">SKILL也是面试高频考点。</span></p>


<a id="section-0104"></a>
## Claude Code 从入门到精通

<a id="f-doxcnsn7d9qpY3k8HwjWSe13GAb"></a>

<p id="f-doxcncV1vjUtnUJsFjp8dO4TDeg"><span>Claude Code本身作为T0级别的Vibe Coding，本身就值得我们学习。希望大家不要把眼光局限在自己公司的工具，比如腾讯就用CodeBuddy上。不同的工具差异还是很大，即使案例团队有Github Copilot,  但是很多厉害的同事慢慢还是倾向于去用Claude Code。之前有面试官问我会使用什么Vibe Coding的工具，我就答只用Github Copilot。我当时还觉得这就是一个闲聊的问题，但是后来才发现，对于工具的使用和比较，本身就是体现了你是否关注时代，会聪明地，高效地使用AI的一个考察点。 厉害的人一定会使用最好的工具，这其实也是一种专业素养。</span></p>

<p id="f-doxcnh80onjJVXbezdaMhJcJsZb"><span>从使用的层面，我也确实希望大家能够使用Claude Code， 思考一下不同工具的不同。案例团队也在推荐使用Claude Code，而整个Claude Code如何使用，怎么使用，本身行业也在研究。我举个例子，本节视频里讲了如何用Claude Code去做自动化，这一套方法，如果你可以用在你的工作中，绝对是领先行业的。在案例团队，也只是比较少部分的人会研究Claude Code的高级使用方法，如果你能够学会，在工作中使用，比如用ClaudeCode去做一个自动化做工作测试或者部署，分享在你们公司，一定会让领导称赞，同时你可以在面试中讲，也是加分项。</span></p>

<p id="f-doxcnUBVmcu465U5DzLIevWcQIh"><span>本节介绍了ClaudeCode的基本使用方法，常见命令，技巧，也总结了一个开源项目everything-claude-code（大神总结的Claude Code的进阶技巧）的一些进阶技巧。同时给出了一些面试问题供参考。</span></p>

<p id="f-doxcnL3wMgcIcESGONywoQX9Ojh"><span>通过本期的内容，你会了解ClaudeCode的相关用法和知识。但是最重要的是，希望你真的用起来，使用起来，将这些技巧用到你的工作中，使用它，提高你使用AI工具的能力，这也将是你在新时代的技能护城河。</span></p>


<a id="section-0105"></a>
## Claude Code 概述

<a id="f-doxcnrznX7Fpn7DGoh87BR1Mlhb"></a>

<a id="f-doxcnADoVhQSMhKffj99Fmt5UYe"></a>

##### 什么是 Claude Code

<div style="margin-left:25px"><p id="f-doxcnporIZAXrR1NTCPXBkHGE2d"><span>Claude Code 是 Anthropic 推出的 AI 编程 Agent，以对话的方式帮助开发者构建、调试、重构代码，以及构建自动化工作流。它不同于传统的代码补全工具（如 GitHub Copilot），而是一个可以自主规划、执行任务、调用外部工具的智能代理。</span></p><p id="f-doxcnXKmkMeXXVSJSZxuRVakrib"><span>Claude Code 本质上是一个</span><span style="font-weight:bold">通用编程 Agent</span><span>，并不与 Claude 模型强绑定。你可以用 Anthropic 官方订阅（Pro/Max 会员）或 API Key 驱动它，也可以配置环境变量让它使用国产大模型（如 GLM、MiniMax 等）驱动。市面上同类产品（Codex、OpenCode 等）的功能和用法与 Claude Code 高度相似，学会 Claude Code 就能举一反三。</span></p></div>

<a id="f-doxcnyUg8QSEUwlbpJmjhMSnQre"></a>

##### Claude Code 能做什么

<div style="margin-left:25px"><p id="f-doxcne7iiKKU2kRFlZilcLzYe2e"><span>Claude Code 可以：</span></p><div id="f-doxcny2dtJimY55U2rUBZXTmmjd" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>根据自然语言需求从零生成完整项目代码</span></div></div><div id="f-doxcnllfE963orEMWu1nVUQXVpb" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>读取、修改、重构现有代码文件</span></div></div><div id="f-doxcnNybqeIJ62WEetkNOdKD17f" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>执行终端命令（安装依赖、运行测试、启动服务器等）</span></div></div><div id="f-doxcnK04y6770dYIMd6W5nMk3Zg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>调用 MCP 外部工具（连接 Figma、GitHub、数据库、Slack 等第三方服务）</span></div></div><div id="f-doxcn3RP88hVxAOaLePHyW0i81f" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>构建并自动执行复杂的多步骤自动化工作流</span></div></div><div id="f-doxcnrDkpJXCKam2nRiHS1Azi4g" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>并发运行多个子任务（SubAgent 并行处理）</span></div></div><div id="f-doxcnQ7PVfYiW4GdWxv4sIoUKMe" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>自我修复：遇到错误时能分析原因、修改代码、重新测试</span></div></div><div id="f-doxcnlhOsN2TKdcfBH84VwZunvc" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span></div><p id="f-doxcnE4QR79SuPV79vLKTcRstqb"><span style="font-weight:bold">一个实际案例</span><span>：在一次对话中，Claude Code 自动发现并抓取了 30 个 YouTube 频道的 187 个视频数据，生成了 6 张图表，制作了一份 9 页的 PowerPoint 演示文稿，导出到了 Google Sheets，并通过 Gmail 发送了带有 PDF 附件的周报——这一切只需要一段自然语言描述。</span></p><p id="f-doxcn6KYpjB94eJ5Vwu6ynMpfjb"><span style="font-weight:bold">实现过程简述：</span></p><p id="f-doxcnLYf9ujOc1PkscIdNsuXlag"><span>在 Plan Mode 下用一句话描述需求，Claude Code 联网调研后反问几个问题（追踪哪些频道、发送频率、收件邮箱等）</span></p><p id="f-doxcn22FaqF5s2rjeRV2fMp9NyE"><span>Claude Code 自动生成项目结构：一个描述步骤的 Markdown 工作流文件 + 7 个 Python 工具文件（抓取数据、分析、生成图表、生成 PPT、发邮件、导出 Sheets、发现频道）</span></p><p id="f-doxcnIWLkHQcVxBQZzVXunfKGVb"><span>人工只需完成一件事：去 Google Cloud 控制台开通 YouTube Data API / Gmail / Sheets，下载 OAuth JSON 凭据文件拖入项目；API Key 填入 </span><span><span><span>.env</span></span></span><span> 文件</span></p><p id="f-doxcnnGBnNXBlw21SPKJEhrqFTg"><span>Claude Code 自动安装依赖、测试 API 连通性、跑完整流水线，发现问题自行修复</span></p><p id="f-doxcnyYrUJm0e9bfxc6ABrOdwMg"><span>最终通过 </span><span><span><a href="https://modal.com/"><span>Modal</span></a></span></span><span> 将工作流部署到云端，配置每周一早 6 点定时触发，API Key 存为 Modal Secrets，不写入代码</span></p></div>

<blockquote id="f-doxcnqJJDdq7tmdU0m6ALE2tjef"><p id="f-doxcn9sCLKlRoo6lNjEsWzgxmUd"><span>📺 想完整了解实现过程，参考视频：</span><span style="font-weight:bold">Master 95% of Claude Code in 36 Minutes</span><span><span><a href="https://www.youtube.com/watch?v=saggDHHnmtQ"><span>https://www.youtube.com/watch?v=saggDHHnmtQ</span></a></span></span><span> （视频以这个 YouTube 周报自动化项目为主线，从界面安装到部署上线全程实操演示）</span></p></blockquote>

<a id="f-doxcnLybEeoKgyeWa5N4r4uCI0c"></a>

##### 访问方式

<div style="margin-left:25px"><div id="f-doxcnf6Y07UJx6oGgqKGWp1Dhyc" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">独立运行</span><span>：在终端直接执行 </span><span><span><span>claude</span></span></span><span> 命令启动，不依赖任何 IDE，适合脚本自动化和服务器环境</span></div></div><div id="f-doxcnRKTHks8GLf0cFnx80GhONg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">作为插件</span><span>：嵌入到 VS Code、Cursor 等编辑器中使用，界面集成在 IDE 侧边栏，与代码编辑窗口无缝切换</span></div></div><div id="f-doxcnqodNIpUyqSJycLRZqLfH7d" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>需要 Claude 付费订阅（Pro 计划起，高频使用建议升级 Max）</span></div></div></div>

<a id="f-doxcnYcbOGhwN9pUAVtV6FQ3Nwd"></a>

##### 收费标准

<p id="f-doxcniQwlRrm2lOnA25BlLhi3Lc"><span>Claude Code 包含在 Claude 的付费订阅中，无需单独购买。</span></p>

<ul><li id="f-doxcn5Nz1UA8yYgwn1Egi3Gzfbg"><span style="font-weight:bold">Pro</span><span>：$17 / 月（按年付），约 $20 / 月（按月付）。包含 Claude Code 访问权、更多模型、无限 Projects、Deep Research、extended thinking、Google Workspace 集成、Remote MCP 集成等。适合入门和轻度使用。</span></li></ul>

<ul><li id="f-doxcn7VP4EaYgAvSCdIsl0Xavld"><span style="font-weight:bold">Max</span><span>：从 $100 / 月起（按月付），可选 5x 或 20x 用量档位。在 Pro 基础上增加更高用量上限、更高输出限制、高峰期优先访问、新功能抢先体验。适合高频使用、复杂工作流和长对话场景。</span></li></ul>

<div id="f-doxcnqY9zIvC95SVDPLWOIFkcPf"><img alt="" decoding="async" height="287" loading="lazy" src="/images/agent-learning/ac9148165caae91c944ca5f9.png" width="360"/></div>

<blockquote id="f-doxcnwJNfcpmQO3YT2cKXUmBzXb"><p id="f-doxcn7D1dRTCjrg7bxKY2jDXYdg"><span>建议：初学者从 Pro 起步，一旦频繁跑自动化工作流、遇到用量限制，再升级到 Max。</span></p></blockquote>

<a id="f-doxcnzkhB5kMbTyDQimCAIvdT5b"></a>

##### 中国区安装

<p id="f-doxcnhNP7jw1dAi0vWbyKftSoqf"><span>由于政策原因，中国区域是没法直接安装和使用Claude Code，不过网上也有很多教程教你如何绕过这一限制，相关视频很多，大家可以自行搜索，这个过程还是需要花一些功夫配置的，就像龙虾的安装，本身也是有一定门槛。但是网上资料很多，很多博主也会分享，相信你可以搞定的。</span></p>

<p id="f-doxcnuwakOQQF3JOGqFQag8GYif"><span>可以参考下面我给的这个教你配置的视频，当然也可以自己搜索，网上很多，关键字就是：中国区/Claude Code</span></p>

<p id="f-doxcnu7egUYmpalIQhzUFuUR2ng"><span>0基础入门Claude Code：接入千问/Kimi等国内模型 | 拒绝封号！超级小白也能学会打造最强AI Agent！</span></p>

<p id="f-doxcnhnptJe9y40aUoD7OhuR7Ig"><span><span><a href="https://www.youtube.com/watch?v=nfMJZEIpfPo"><span>https://www.youtube.com/watch?v=nfMJZEIpfPo</span></a></span></span></p>


<a id="section-0106"></a>
## 核心特性与用法

<a id="f-doxcn0uhChK6QWx6l8LHWacw8Kg"></a>

<a id="f-doxcn3UDmNlCFSbqX21NNajoW2d"></a>

##### CLAUDE.md

<div style="margin-left:25px"><p id="f-doxcna4hx4QpPNGYjTCfts47gmg"><span style="font-weight:bold">是什么</span><span>：CLAUDE.md 是放置在项目根目录（或用户目录）的 Markdown 文件，Claude Code 每次启动时会自动读取它，相当于给 Agent 的持久化系统提示。</span></p><p id="f-doxcnnPAz44QbWJBzm8mB8aVXWh"><span style="font-weight:bold">解决什么问题</span><span>：Claude Code 每次新会话都是"失忆"的，不知道你的项目结构、编码偏好、注意事项。CLAUDE.md 解决了这个问题，让 Agent 每次启动就能快速进入状态。</span></p><p id="f-doxcnsqfyW0q1umrel6jH7Yjl8I"><span style="font-weight:bold">怎么用</span><span>：</span></p><div id="f-doxcnaiooB4gcMMnGq01XL3xaJy" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>在 Claude Code 对话中输入 </span><span><span><span>/init</span></span></span><span>，它会根据当前项目自动生成一份 CLAUDE.md</span></div></div><div id="f-doxcnFvmISJfKESFYnuBlLnNCzg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>输入 </span><span><span><span>/memory</span></span></span><span> 可以快速打开并编辑 CLAUDE.md</span></div></div><div id="f-doxcnA2DdJ5fxTD8wtWa4rUKRnb" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>分为</span><span style="font-weight:bold">项目级</span><span>（放在项目目录，对该项目生效）和</span><span style="font-weight:bold">用户级</span><span>（放在用户目录，对所有项目生效）</span></div></div><div id="f-doxcndrGriKbRRHqR0fGR97riMc" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>内容可以包括：编码规范、项目结构说明、注意事项（比如"每次回答结尾都追加 Happy Coding"）、技术栈偏好等</span></div></div><p id="f-doxcnfZD6qUd2SrNyzb3Pmf1Osd"><span style="font-weight:bold">示例内容</span><span>：</span></p><pre id="f-doxcne3ZkrZgoo14Dvgx8VjWIvc"><code># 项目规范
- 使用 React + TypeScript + Vite 技术栈
- 所有组件必须有对应的单元测试
- 禁止在代码中硬编码任何 API Key
- 提交代码前必须运行 lint 检查</code></pre><p id="f-doxcnqqipazpRQYCauk1BGNOJfc"><span style="font-weight:bold">进阶：Rules 文件夹（</span><span style="font-weight:bold"><span><span>.claude/rules/</span></span></span><span style="font-weight:bold">）</span></p><p id="f-doxcn6U9bd32ohsytRqHee1omyc"><span>当规则越来越多时，单个 CLAUDE.md 会变得臃肿难维护。Claude Code 官方支持将规则拆分到 </span><span><span><span>.claude/rules/</span></span></span><span> 目录下，按关注点分模块管理，Claude Code 启动时会自动读取所有文件：</span></p><pre id="f-doxcnXfUGiPoxi4yhvyIEjhfi3g"><code>.claude/rules/
├── security.md      # 安全规则：不能硬编码密钥，要验证输入
├── coding-style.md  # 代码风格：不可变性、模块化
├── testing.md       # 测试规则：TDD 流程、80% 覆盖率
├── git-workflow.md  # Git 规范：提交格式、PR 流程
└── agents.md        # 何时委托给 SubAgent</code></pre></div>

<p id="f-doxcng5YvlCZI5WVZRNOgdDL0og"><span style="font-weight:bold">CLAUDE.md vs Rules 文件夹</span><span>：两者功能相同，都是持久化系统指令；区别在于组织方式——CLAUDE.md 适合放项目总览和简单规则，Rules 文件夹适合规则较多、需要分模块维护的团队项目，不同角色可以维护各自的规则文件。</span></p>

<a id="f-doxcnWCIZGDQrjU4EGlDwNsT6ne"></a>

##### 三种交互模式

<p id="f-doxcnNGSeqhN1IUxWTOgesbjzVb"><span>Claude Code 通过 </span><span><span><span>Shift + Tab</span></span></span><span> 键在三种模式间循环切换：</span></p>

<p id="f-doxcnUGYi7qtzxBhe1dm6OmbzXg"><span style="font-weight:bold">默认模式</span><span>（底部显示 </span><span><span><span>? for shortcuts</span></span></span><span>）：最谨慎，每次创建或修改文件前都会询问用户确认。适合对重要代码做修改时使用。</span></p>

<p id="f-doxcnQyMbvdwjMakyeEE094UnCf"><span style="font-weight:bold">自动模式</span><span>（底部显示 </span><span><span><span>accept edits on</span></span></span><span>）：本次会话内所有文件操作自动通过，不再打扰用户。适合已信任的任务，节省时间。</span></p>

<p id="f-doxcnsCvWm8TvAl9n8dPEeU787z"><span style="font-weight:bold">规划模式（Plan Mode）</span><span>（底部显示 </span><span><span><span>Plan Mode On</span></span></span><span>）：只讨论、只阅读，不修改任何文件。Claude 会深入分析需求、阅读项目文件、提出问题，生成详细的执行计划，确认后才能切换到执行模式。这是处理复杂任务的推荐第一步。</span></p>

<p id="f-doxcn7pZ2B8RbZEk3SZV23f89Jh"><span style="font-weight:bold">注意</span><span>：即使在自动模式下，执行终端命令（如 </span><span><span><span>npm install</span></span></span><span>、</span><span><span><span>mkdir</span></span></span><span>）仍然需要单独确认，因为这类操作被认为风险更高。如果想跳过所有权限检查，可以在启动时加 </span><span><span><span>--dangerously-skip-permissions</span></span></span><span> 参数，但官方已将 </span><span><span><span>dangerously</span></span></span><span> 写在参数名里警告风险，务必谨慎使用。</span></p>

<a id="f-doxcnAXLgi4ISxq9jrWc7EX5IMg"></a>

##### Checkpoints

<p id="f-doxcnnD1ZMGqljFYQNXCNVfU81f"><span style="font-weight:bold">是什么</span><span>：Claude Code 每次提交修改前，都会自动为当前代码创建一个快照（回滚点）。</span></p>

<p id="f-doxcnyc3Na2Rhu5p1hp0KQlSxrh"><span style="font-weight:bold">怎么用</span><span>：</span></p>

<ul><li id="f-doxcnyWTfJDUhnvnkQqGeLybI6c"><span>输入 </span><span><span><span>/rewind</span></span></span><span> 或连续按两次 </span><span><span><span>ESC</span></span></span><span> 进入回滚界面</span></li></ul>

<ul><li id="f-doxcnbcr1H5vXDEWGNyXD7qXK1d"><span>选择要回滚的时间点后，有四个选项：回滚代码+会话、只回滚会话、只回滚代码、放弃回滚</span></li></ul>

<ul><li id="f-doxcn38JxdMHhXX4RROHLRAIotd"><span>也可直接输入 </span><span><span><span>/checkpoints</span></span></span><span> 查看文件级别的回滚点</span></li></ul>

<p id="f-doxcnPR9VL57POi7MVXUcHW2gFc"><span style="font-weight:bold">局限性</span><span>：Claude Code 只能回滚它自己写入的文件，由终端命令生成的文件（如 </span><span><span><span>npm install</span></span></span><span> 产生的 </span><span><span><span>node_modules</span></span></span><span>）无法回滚。精确回滚建议配合 Git 使用。</span></p>

<a id="f-doxcnuuhWdOjJlQWJrZhCqhAyTg"></a>

##### 权限管理

<p id="f-doxcnbOPdDwggCDn4DIOebaeade"><span style="font-weight:bold">是什么</span><span>：控制 Claude Code 可以执行哪些操作的机制。</span></p>

<p id="f-doxcnWTvvwXUgj9MNXuPgkcAtVf"><span style="font-weight:bold">怎么用</span><span>：在对话中输入 </span><span><span><span>/permissions</span></span></span><span> 打开交互式权限菜单，可以将安全的操作（如运行测试、提交代码）加入白名单，将危险操作（如删除文件）加入黑名单。</span></p>

<p id="f-doxcniGuG8IotHaGqVb1wGeK39e"><span style="font-weight:bold">权限保存位置</span><span>：</span></p>

<ul><li id="f-doxcnRGh33wRV38jnwBYJWrV55f"><span><span><span>settings.local.json</span></span></span><span>（本地项目级，不提交 Git）</span></li></ul>

<ul><li id="f-doxcnTAcexsOXHlJMUdPsmp1dDh"><span><span><span>settings.json</span></span></span><span>（项目级，随 Git 分发给所有团队成员）</span></li></ul>

<ul><li id="f-doxcnppuLE4bDczN3goNsaVJxPc"><span>用户目录配置（用户级，对该用户所有项目生效）</span></li></ul>

<p id="f-doxcnn0KrkmPptFmtXua5uqS9dg"><span style="font-weight:bold">经验</span><span>：建议从保守权限开始，随着对工作流的信任逐步放开。权限设置是速度与安全的平衡。</span></p>

<a id="f-doxcn8yHurXs0J1gLsl1EF5qpsW"></a>

##### Plan Mode

<p id="f-doxcnqbf2I8FSUfRCYc75afSucg"><span>使用 </span><span><span><span>Shift + Tab</span></span></span><span> 切换到 Plan Mode（或在对话框按 </span><span><span><span>Shift + Tab</span></span></span><span> 两次）。</span></p>

<p id="f-doxcnqOiP2vk736weOXqzRvnFnh"><span>在规划模式下，Claude 会：</span></p>

<ul><li id="f-doxcnD18XDPIlVdyGFl1GFzAgGe"><span>深度阅读你的项目所有相关文件</span></li></ul>

<ul><li id="f-doxcnViacbGnIm43iUA1pfhpXGi"><span>通过提问澄清需求细节（如：频率是每天还是每周？是否需要导出到 Google Sheets？）</span></li></ul>

<ul><li id="f-doxcnUSu4hGVX2mMfoeOrGBmuSd"><span>生成包含目标、步骤、文件结构的详细执行计划</span></li></ul>

<ul><li id="f-doxcnmoNsCHntop7DkRlaHI4mCf"><span>列出依赖项和注意事项</span></li></ul>

<p id="f-doxcnoV8FWIH0YLRRafMvd5Qlrh"><span>计划产出后有三个选项：直接执行（自动同意模式）、执行但保留逐步确认、继续修改计划。</span></p>

<p id="f-doxcn5tM21thIMAlRcgeJCiHrfd"><span style="font-weight:bold">何时必须用 Plan Mode</span><span>：处理重构、多文件改动、新功能开发等复杂任务前，强烈推荐先用 Plan Mode 规划，可以避免 Claude 误改文件、浪费 Token。</span></p>

<a id="f-doxcnEyFbIDNqt797oZgzUFFECd"></a>

##### Hooks

<p id="f-doxcn49YVQuDWNAekI1XHfkArWe"><span style="font-weight:bold">是什么</span><span>：在 Claude Code 工作流程的特定时机自动执行的脚本，无需人工干预。</span></p>

<p id="f-doxcnpWSp7aiDeqW3fNCZ6Tfe0f"><span style="font-weight:bold">六种触发时机</span><span>：</span></p>

<ul><li id="f-doxcnrTRHK8SJxCaN5BnvyrZ3lc"><span><span><span>PreToolUse</span></span></span><span>：工具执行前（用于验证、提醒）</span></li></ul>

<ul><li id="f-doxcnNLGPN4ONTduFGgoUt6abud"><span><span><span>PostToolUse</span></span></span><span>：工具执行后（用于格式化、反馈）</span></li></ul>

<ul><li id="f-doxcny7lwKExrqi6XCSJ2LxZhsh"><span><span><span>UserPromptSubmit</span></span></span><span>：用户发送消息时</span></li></ul>

<ul><li id="f-doxcn2lHd1J4GEg4CYr3sOFZtDb"><span><span><span>Stop</span></span></span><span>：Claude 完成响应时（适合记录总结）</span></li></ul>

<ul><li id="f-doxcnhaKSQWv0hAcUnLdNU6aVng"><span><span><span>PreCompact</span></span></span><span>：上下文压缩前（适合保存重要状态）</span></li></ul>

<ul><li id="f-doxcnoe9MKZ3PJeQzYsPErom0nh"><span><span><span>Notification</span></span></span><span>：权限请求时</span></li></ul>

<p id="f-doxcn3gowkX4DtQXw6NvzKfkeOb"><span style="font-weight:bold">典型用法举例</span><span>：配置一个 </span><span><span><span>PostToolUse</span></span></span><span> Hook，在 Claude 写完代码后自动调用 Prettier 格式化文件，实现代码自动美化，整个过程无需用户操作。</span></p>

<p id="f-doxcnvHpPFAIFznWyn5ZjLenbAf"><span style="font-weight:bold">怎么配置</span><span>：输入 </span><span><span><span>/hooks</span></span></span><span> 进入配置界面，选择触发时机 → 选择匹配的工具（如 </span><span><span><span>write</span></span></span><span> 或 </span><span><span><span>edit</span></span></span><span>）→ 填写具体执行命令。命令通过 JSON 标准输入接收上下文信息，其中 </span><span><span><span>file_path</span></span></span><span> 字段为刚编辑的文件路径。</span></p>

<p id="f-doxcnwglRo44W2BBZvM4WEzegxO"><span style="font-weight:bold">Hook 存储级别</span><span>：本地项目级（不入 Git）、项目级（随 Git 分发给团队）、用户级（对当前用户所有项目生效）。</span></p>

<a id="f-doxcnULQJqvgTEMmKvdRwqwP6Jf"></a>

##### MCP

<p id="f-doxcnrucXMAeyKtQLrw1YCzGX1e"><span style="font-weight:bold">是什么</span><span>：MCP是一个开放协议，允许任何人为 AI Agent 构建和暴露外部工具接入。类比一个"通用 USB 接口"，只需连接一次，Claude 就能使用该服务的所有功能。</span></p>

<p id="f-doxcn2ForDT334ePd5pQx4ZuElc"><span style="font-weight:bold">与直接调用 API 的区别</span><span>：传统 API 调用需要开发者明确指定每个端点和参数。MCP 是一种提示驱动的封装，让 Claude 能自己判断调用哪个工具、传什么参数，更灵活。</span></p>

<p id="f-doxcnhi0jSWpNpMyOU5W3LbrRpc"><span style="font-weight:bold">常用 MCP 场景</span><span>：</span></p>

<ul><li id="f-doxcnwQvoBuNjh1FVxl1i4rtxug"><span>Figma MCP：Claude 可直接读取设计稿的截图、组件间距、字体样式，实现精准的设计稿还原</span></li></ul>

<ul><li id="f-doxcnD15Oh0s5t3QF6LpezEIyHe"><span>GitHub MCP：管理 PR、Issues、代码审查</span></li></ul>

<ul><li id="f-doxcn4rdpwqCUQ5gkjjyrwtAqHb"><span>Supabase/数据库 MCP：直接执行 SQL 查询，拉取特定数据</span></li></ul>

<ul><li id="f-doxcn2h74pcZdEIDU9KZDHjxkvf"><span>Gmail/Calendar MCP：发送邮件、创建日历事件</span></li></ul>

<ul><li id="f-doxcnpdo5OEPt84CgbpdX1HgV5g"><span>Slack MCP：读取和发送消息</span></li></ul>

<p id="f-doxcnIOsQWPmF6yPQzoF3VLfzAe"><span style="font-weight:bold">怎么用</span><span>：输入 </span><span><span><span>/mcp</span></span></span><span> 查看已安装的 MCP 工具及其状态；安装 MCP Server 后重启 Claude Code 生效；使用 </span><span><span><span>/mcp</span></span></span><span> 可以进入认证、查看工具列表等操作。</span></p>

<p id="f-doxcnxDmdZvTkn1F6i1J6EbeYwb"><span style="font-weight:bold">多模态输入</span><span>：除了 MCP，也可以直接向 Claude Code 传图片——将图片拖入对话框，或复制图片后按 </span><span><span><span>Ctrl+V</span></span></span><span>（macOS 也是 Ctrl+V，不是 Command+V）粘贴。</span></p>

<a id="f-doxcnCDAfQQinKDqd7fGvGmuQsh"></a>

##### Skills（Agent Skill)

<p id="f-doxcneOlWzCPY3eaUC15SAQNlIe"><span style="font-weight:bold">是什么</span><span>：技能文件（Skill.md）是预定义的指令集，包含名称、描述和具体步骤说明。Claude Code 根据用户请求自动识别并加载相关 Skill，而不是每次都重新理解相同的流程。</span></p>

<p id="f-doxcn4eRNJO7sMqASR0xKEJCtSf"><span style="font-weight:bold">与 CLAUDE.md 的区别</span><span>：CLAUDE.md 是每次都加载的全局记忆；Skill 是按需动态加载的，只在需要时才占用上下文窗口，更节省 Token。</span></p>

<p id="f-doxcn3P2glR6n7UT22opHnEQa5Z"><span style="font-weight:bold">与 MCP 的区别</span><span>：MCP 负责获取数据和执行外部操作；Skill 是知识型的自定义指令，相当于"告诉 Claude 怎么做某件事"的操作手册。</span></p>

<p id="f-doxcntjpSM0NZ72ZiRdNAjZbRyd"><span style="font-weight:bold">技能存放位置</span><span>：</span></p>

<ul><li id="f-doxcnTPs63J5t4eluhyC99qpI1e"><span>全局：</span><span><span><span>~/.claude/skills/</span></span></span><span>（对所有项目生效）</span></li></ul>

<ul><li id="f-doxcnJ7HgFcP3rhb1OhM9QfoJjc"><span>项目：项目目录下的 </span><span><span><span>.claude/skills/</span></span></span></li></ul>

<p id="f-doxcne5orZxoOZwgj5wnAfVLj0f"><span style="font-weight:bold">怎么触发</span><span>：</span></p>

<ul><li id="f-doxcnpdpzv8TEXw0IyRukBIkOkh"><span>自动触发：Claude 识别到请求与某个 Skill 相关时，自动请求用户确认加载</span></li></ul>

<ul><li id="f-doxcnVUvhAKO7PJWMWfVwDFxaTd"><span>手动触发：在输入框中输入 </span><span><span><span>/技能名称</span></span></span><span> 直接调用</span></li></ul>

<p id="f-doxcno2Hxh5cAzQPBTbTZvh8dFb"><span style="font-weight:bold">Skill 文件结构示例</span><span>（以每日日报 Skill 为例）：</span></p>

<pre id="f-doxcnfjdq2QLhabwLwkuy5btPvf"><code>---
name: daily-report
description: 当用户要求写每日总结时调用此技能
---## 日报格式要求- 日期
- 开发摘要（不超过3条）
- 开发详情（每条需包含：实现内容、遇到的问题、解决方案）
- 明日计划</code></pre>

<a id="f-doxcnqqW62UiLRSxdDj4j8hF5ob"></a>

##### SubAgent &amp; AgentTeam

<p id="f-doxcnA0Xip5Rp3g6W18hGpw0WTd"><span style="font-weight:bold">SubAgent</span></p>

<p id="f-doxcnzP5wMUOcm6BEJcPWLniFol"><span style="font-weight:bold">是什么</span><span>：SubAgent 是独立运行的 Claude 实例，拥有完全独立的上下文、工具集和权限，专注于完成某一特定任务，完成后只向主代理汇报最终结果。</span></p>

<p id="f-doxcnINXJLqz5H5dPwBAXsnnemf"><span style="font-weight:bold">与 Agent Skill 的核心区别</span><span>：</span></p>

<p id="f-doxcn6xK4WBzvEWre4qbu1f643f"><span>Agent Skill 运行时完全继承并共享当前主对话的上下文，执行过程中产生的所有中间日志和思考过程都会进入主上下文，容易造成 Token 膨胀。</span></p>

<p id="f-doxcnZlbz2T7lNRccV4QyOnkiDb"><span>SubAgent 拥有独立上下文，执行的所有中间过程（读了哪些文件、中间分析过程）都不回传给主对话，只返回最终结果，主对话上下文始终保持干净。</span></p>

<p id="f-doxcnDP9LrOjCyZ3htndRmDFHSh"><span style="font-weight:bold">适用场景</span><span>：</span></p>

<ul><li id="f-doxcns6ZALynimWC3wxqci0F2Jh"><span>Agent Skill 适合：与主上下文关联紧密、不会产生大量中间数据的任务（如"写一份今日开发总结"）</span></li></ul>

<ul><li id="f-doxcnr7RtwAdSzBPTbZLb7EM8Kd"><span>SubAgent 适合：需要大量探索、会产生海量中间上下文的任务（如"审查整个代码库的安全漏洞"）</span></li></ul>

<p id="f-doxcnPlrptzeJv9RYopEEjPh5Ne"><span style="font-weight:bold">怎么创建</span><span>：输入 </span><span><span><span>/agent</span></span></span><span> → Create new agent → 选择项目级或用户级 → 选择 Claude 辅助生成或手动创建 → 填写任务描述 → 选择可用工具（如只读工具）→ 选择模型和颜色。创建成功后会是一个md的格式，和skill类似，也会包括头（description）和正文部分，类似这样：</span></p>

<pre id="f-doxcnjZj469YW85buovFF3WB2bi"><code>---
name: pdf-book-retriever
description: Expert at answering questions from PDF books by locating relevant sections, extracting supporting passages, and producing citation-grounded responses.
tools: Read, Grep, Glob, Bash
model: sonnet
skill: code-review
---
#上面的头就是写对应的内容啊，模型啊. 下面是正文写具体的要求
You are a specialized xxx</code></pre>

<p id="f-doxcn2y3hUNMOF2WPVR4yhxx1de"><span style="font-weight:bold">AgentTeam</span></p>

<p id="f-doxcnbOEnJcwBh4Cre9wjzRZzbh"><span>是什么：</span></p>

<div style="margin-left:25px"><div id="f-doxcnPk4oD5fzyoc7SjUWAIGH1f" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>AgentTeam 是由主代理一次性拉起的多代理协作小组，多个成员共享任务列表并可互相发送消息。</span></div></div><div id="f-doxcnW4UQ21IOXy1rrdqARiChI6" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>每个成员都有独立执行上下文与职责分工，由主代理统一编排、跟踪进度和汇总结果。</span></div></div><div id="f-doxcn9yUqblITzY1E1g4UQYX6OB" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>适合处理“多角色并行 + 互相依赖 + 质量回路”的复杂任务。</span></div></div></div>

<p id="f-doxcnJP5pDirYSjlApL9ll8NVDd"><span>与 SubAgent 的核心区别：</span></p>

<div style="margin-left:25px"><div id="f-doxcns37NbTax0oPWWna4TKw1Ch" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>SubAgent 之间不能互相通信，只能各自把结果回传主代理。</span></div></div><div id="f-doxcno8mdJUVkARY4ewIc1NrZnk" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>AgentTeam 成员可以直接互发消息、交接依赖、互相验收，并可把问题打回上游重做。</span></div></div><div id="f-doxcnmwvazq7udzH1OMQoZWQZMf" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>SubAgent 更像“多个独立工人并行干活”；AgentTeam 更像“有协作协议的小组项目制”。</span></div></div><div id="f-doxcngdjUWCxhwPnzX8ioeOiJlg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>在复杂工程任务中，AgentTeam 通常质量更高，但也更慢、更贵。</span></div></div></div>

<p id="f-doxcnL8ZfxAMueytFkTKyWMprcc"><span>适用场景：</span></p>

<div style="margin-left:25px"><div id="f-doxcnpcvfOJEePZwTJgokkUnULf" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>SubAgent 适合：任务彼此独立、主要需要并行探索与最终汇总、不需要成员间沟通的场景。</span></div></div><div id="f-doxcnP5FvNlVzhyXMATL6gXavwb" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>AgentTeam 适合：前后端、测试、文档等多角色协作，且需要跨角色消息传递与持续反馈闭环的场景。</span></div></div><div id="f-doxcnVApupFPZUxwWgx2dQnwAmc" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>典型 AgentTeam 任务：构建全栈功能、跨模块重构、需要 QA 回归与多轮修复的项目。</span></div></div></div>

<p id="f-doxcne8PhbRf2JFD4yG5OPEX6Sh"><span>怎么创建：</span></p>

<div style="margin-left:25px"><div id="f-doxcnEIe35AQbLuTYDSY9wGGQ4e" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>先启用 AgentTeam 功能（实验特性，默认关闭）：在项目设置中加入对应开关。</span></div></div><div id="f-doxcnq9s39HmOVKOkq62rq7hrwe" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>在主会话中用自然语言创建团队，例如：</span></div></div><div id="f-doxcnUvcVDuuT829ztBGHcllqod" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>Create a team of 3 teammates using Sonnet: frontend developer, backend developer, QA。</span></div></div><div id="f-doxcnBELW96yOd2aRPGM3jq26Je" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>为每个成员明确：角色职责、输入输出、需要通知谁、完成条件。</span></div></div><div id="f-doxcnQ9Ve6awWy46cnuOQ7OExSc" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>明确最终交付物：可运行结果、测试报告、关键决策说明。</span></div></div><div id="f-doxcnYRRFG5bAKWXOGgS6BR2Gxf" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>建议控制团队规模在 2 到 5 人，避免无效并发和 token 失控。</span></div></div></div>

<p id="f-doxcnUBiE1DcZyqUy2V3AdV90vd"><span>创建后的产物形态：</span></p>

<div style="margin-left:25px"><div id="f-doxcn8Btrxc9hlqJSnzARDhBjdg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>AgentTeam 通常是运行时创建的协作结构，不一定像 SubAgent 一样直接落成单个 agent 配置 md。</span></div></div><div id="f-doxcnC7YrTvRWat2U7Ojl5kCYSb" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>更常见的可落盘产物是：</span></div></div><div id="f-doxcnGGHMLmxKU5oezm1Egw4OIf" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>团队执行日志与阶段性报告</span></div></div><div id="f-doxcnrl3Mj6Lueq1cMBVHI5gZzg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>最终交付文档（实现说明、测试结果、后续动作）</span></div></div><div id="f-doxcneCsoOgUpZ9zHbNlSsXo2Wb" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>项目内团队规范文档（可选），用于复用同类团队分工模板</span></div></div></div>

<p id="f-doxcnVeWfb7XDx6QipIQGOXWSqb"><span style="font-weight:bold"> 何时用 AgentTeam，何时用 SubAgent</span></p>

<p id="f-doxcnrFXsJ7bYTrD18Vjr1oReff"><span>当任务是“多人协作型”时，用 AgentTeam。典型特征是：需要多个角色同时推进（例如前端、后端、QA）、成员之间有明确依赖、需要互相发消息和反复验收。这类任务通常流程复杂、质量要求高，AgentTeam 能把沟通与回归闭环做得更完整。</span></p>

<p id="f-doxcncxs1OjSUqduRCkwBxhQNTc"><span>当任务是“独立执行型”时，用 SubAgent。典型特征是：任务可以拆成多个互不依赖的子任务并行处理，最后由主代理统一汇总；或者流程是明确串行的 1 -&gt; 2 -&gt; 3，不需要成员彼此沟通。SubAgent 在这种场景下更轻量、更直接。</span></p>

<p id="f-doxcnL2B6S4ujFkmQjycjF2MB5f"><span>如果任务强依赖同一段对话历史、需要频繁即时来回修改，优先留在主会话，或者只引入少量 SubAgent 做辅助，不一定要上 AgentTeam。</span></p>

<p id="f-doxcnYlfc8S5zQYf3iuwFBZSenf"><span>如果任务本身简单、链路短、成本敏感，也优先主会话或少量 SubAgent。因为 AgentTeam 在成员并发时会显著增加开销，通常更适合“复杂且值得协作”的工作，而不是日常小任务。</span></p>

<p id="f-doxcnXmpSgX9nlvowsGo0rvTLAO"><span style="font-weight:bold">成本提醒：</span></p>

<ul><li id="f-doxcngPaJpVYywFlOmpPdfdkntd"><span>多成员并发会近似倍增消耗（3 人约 3 倍、5 人约 5 倍）。</span></li></ul>

<ul><li id="f-doxcn1Yu6DvLrtro0ZcHZfAWYRh"><span>先用小团队验证流程，再扩大规模。</span></li></ul>

<p id="f-doxcnCy8rdXGIaP1qtXUGLr6BMd"><span>一句话结论：复杂协作上 Team，专注执行上 SubAgent。</span></p>

<p id="f-doxcnhAhGLCTmqkemWgdYWrrYah"><span style="font-weight:bold">深入学习</span></p>

<p id="f-doxcns9Fm8KyOogfcDfREb7W4Ye"><span>AgentTeam和SubAgent是CC的高级使用技巧，如果想深入学习，可以看：</span></p>

<p id="f-doxcnucYmSxlkJ4aSmaMuBmKCwd"><span>参考视频：6:52 ~7:27 是专门讲解SubAgent和AgentTeam的使用的。</span></p>

<p id="f-doxcnn0p3D7l9JeignE1dvZlIVg"><span><span><a href="https://www.youtube.com/watch?v=mpALXah_PBg&amp;t=24772s"><span>https://www.youtube.com/watch?v=mpALXah_PBg&amp;t=24772s</span></a></span></span></p>

<p id="f-doxcnYqaETVN9N5i4vHaHJdUl7f"><span>官方API文档，有专门讲SubAgent的</span></p>

<p id="f-doxcnZE5mcGsNvt1Q1I68B0avQd"><span><span><a href="https://developer.anthropic.com/"><span>https://developer.anthropic.com/</span></a></span></span></p>

<p id="f-doxcn7z1aFhRZkan5V6mCB7E9Xf"><span>小技巧，使用ClaudeCode：@"claude-code-guide (agent)" ，这个就是CC内置的官方文档专门的Agent。</span></p>

<p id="f-doxcnIgiMaoiF28vqDe6vX62s9d"><span>所以你和它对话，相当于让他基于官方文档给你回答，你可以问他相关SubAgent的知识。</span></p>

<p id="f-doxcntL47JME1MxLsV4syXyZAig"><span><span><a href="https://lintsinghua.github.io/#ch09"><span>这里</span></a></span></span><span>9.4 小节，讲了SubAgent的md配置文件。9.2 讲了ClaudeCode的内置智能体。感兴趣可以去看。</span></p>

<p id="f-doxcn110ffx4JsHlUXZzzhZk1Te"><span>从源代码层面了解Claudecode SubAgent和AgentTeam，可以看</span><span><span><a href="/posts/agent-learning-21-open-source-architectures/#f-doxcnybFiAwj4fpSCQbaYFby0Db"><span>这里</span></a></span></span></p>

<a id="f-doxcnwIz1r7v8d9Q1i0arVSl3ge"></a>

##### Plugins

<p id="f-doxcn9qP5oT4RDippG8yiHZ1ZYd"><span style="font-weight:bold">是什么</span><span>：将多个 Skill、Hook、SubAgent、MCP 等能力打包成一个可安装单元，类似 macOS 的 DMG 安装包。一键安装即获得整套能力，方便团队共享配置。</span></p>

<p id="f-doxcnjcn2ZZXIxr8NiMscf1Roah"><span style="font-weight:bold">怎么用</span><span>：输入 </span><span><span><span>/plugin</span></span></span><span> 进入插件管理器 → Discover 发现新插件，Installed 查看已安装，Marketplaces 管理插件市场。</span></p>

<p id="f-doxcn6JbMhdmAgoq2ncbQYFyVDe"><span style="font-weight:bold">推荐插件</span><span>：</span></p>

<ul><li id="f-doxcnCaLSRPK4TkLvY5vDg90D2f"><span><span><span>frontend-design</span></span></span><span>：打破大模型"深紫色主题"惯性的前端设计 Skill，让生成的界面更有设计感</span></li></ul>

<ul><li id="f-doxcnx4REMCj3lVcT7qaeIl5rEf"><span><span><span>hookify</span></span></span><span>：用对话方式创建 Hook，无需手写 JSON 配置</span></li></ul>

<ul><li id="f-doxcnx9A19rY0spqvCokjX0AXSd"><span><span><span>typescript-lsp</span></span></span><span> / </span><span><span><span>pyright-lsp</span></span></span><span>：在编辑器外使用 Claude Code 时提供类型检查和智能补全</span></li></ul>

<ul><li id="f-doxcn8ZQBILnMHdh3jgjquLAZbd"><span><span><span>mgrep</span></span></span><span>：比 ripgrep 更高效的代码搜索工具，平均减少约 50% 的 Token 消耗</span></li></ul>

<a id="f-doxcnGzuZ8bIE9jxQkvMgfRt4ug"></a>

##### 上下文管理

<p id="f-doxcngNIHLZdHgSYLYQcWMqSUzf"><span>Claude Code 拥有约 200,000 Token 的上下文窗口，管理好上下文是高效使用的关键。</span></p>

<p id="f-doxcnqgR1wVND5djycskXfAhnHb"><span style="font-weight:bold">查看上下文</span><span>：输入 </span><span><span><span>/context</span></span></span><span> 查看当前上下文的用量分布（CLAUDE.md、Skill、MCP 工具描述、对话历史各占多少）。</span></p>

<p id="f-doxcnRWzrR8aCwyaXoAUapNOtth"><span style="font-weight:bold">压缩上下文</span><span>：输入 </span><span><span><span>/compact</span></span></span><span>（可附加保留策略，如"重点保留用户的原始需求"），Claude 会将对话压缩为摘要，保留关键决策，释放空间。</span></p>

<p id="f-doxcnShRZVKelCdncpVq3AgEkze"><span style="font-weight:bold">清空上下文</span><span>：输入 </span><span><span><span>/clear</span></span></span><span> 完全清空所有上下文。适用于开始一个全新的、与之前任务完全无关的任务。</span></p>

<p id="f-doxcnAIsWCoyj0aSFirNBhOef1f"><span style="font-weight:bold">恢复历史对话</span><span>：</span></p>

<ul><li id="f-doxcnLvANUbWaXD8B0Z5kXkss4d"><span>输入 </span><span><span><span>/resume</span></span></span><span> 可查看历史会话列表并选择恢复</span></li></ul>

<ul><li id="f-doxcn0O3qrg0EWFS699QKA9KFzf"><span>启动时加 </span><span><span><span>-c</span></span></span><span> 参数（</span><span><span><span>claude -c</span></span></span><span>）自动恢复上次的对话</span></li></ul>

<p id="f-doxcnSrjbtUOcyUPoOdBSasco9v"><span style="font-weight:bold">后台任务管理</span><span>：</span></p>

<ul><li id="f-doxcnK3PBnJF9643mv1rZq3hWhE"><span>启动的服务器或长时命令会阻塞 Claude Code，按 </span><span><span><span>Ctrl + B</span></span></span><span> 将其放入后台</span></li></ul>

<ul><li id="f-doxcnNOeEb3igl1ZX1ILT2ZubRd"><span>输入 </span><span><span><span>/tasks</span></span></span><span> 查看后台运行的任务</span></li></ul>

<ul><li id="f-doxcn9LAdUPLNCPjk5P0EUQtNTg"><span>在任务界面按 </span><span><span><span>K</span></span></span><span> 可终止任务</span></li></ul>

<a id="f-doxcnjKHZr8iz2gn60rftLj3irg"></a>

##### 斜杠命令

<p id="f-doxcn4w7An2AKQgnI09ZUFZqoIe"><span>常用斜杠命令速查：</span></p>

<ul><li id="f-doxcnuhdrfwk5ZSt8Ayhm77ZHVc"><span><span><span>/init</span></span></span><span> — 自动生成当前项目的 CLAUDE.md</span></li></ul>

<ul><li id="f-doxcnm3dxhVVjYKC4NTUk1GtfHc"><span><span><span>/memory</span></span></span><span> — 快速打开 CLAUDE.md 编辑</span></li></ul>

<ul><li id="f-doxcnVPilMSNV1jNG0lN6hI3XQc"><span><span><span>/compact</span></span></span><span> — 手动压缩上下文</span></li></ul>

<ul><li id="f-doxcnq0RFLXb4C00MEafiTKyMQh"><span><span><span>/clear</span></span></span><span> — 清空所有上下文</span></li></ul>

<ul><li id="f-doxcnZLVVl0xHfMnIBwmI720qUf"><span><span><span>/context</span></span></span><span> — 查看上下文用量</span></li></ul>

<ul><li id="f-doxcnHYxDwiyW966JWkGRpBdR4E"><span><span><span>/rewind</span></span></span><span> — 进入代码回滚界面</span></li></ul>

<ul><li id="f-doxcnFn8qqqfRqGLT3Zfi06CBbg"><span><span><span>/checkpoints</span></span></span><span> — 查看文件级回滚点</span></li></ul>

<ul><li id="f-doxcnA1rnEJlzzv8vMfPuMHN3pb"><span><span><span>/resume</span></span></span><span> — 恢复历史对话</span></li></ul>

<ul><li id="f-doxcnezhnCTYlolJgSAevr3mNSc"><span><span><span>/tasks</span></span></span><span> — 查看后台任务</span></li></ul>

<ul><li id="f-doxcnKN2Ej6eB9j1MTsvYD5tJQh"><span><span><span>/mcp</span></span></span><span> — 查看和管理 MCP 工具</span></li></ul>

<ul><li id="f-doxcnN7xUITtyxaAlB35eqhcUNf"><span><span><span>/hooks</span></span></span><span> — 配置 Hook</span></li></ul>

<ul><li id="f-doxcnjOHiZ0dzT44hEiSSGZrcyb"><span><span><span>/skills</span></span></span><span> — 查看已安装的 Skill</span></li></ul>

<ul><li id="f-doxcnlcko2ExbftrEJ7g3LGFkvf"><span><span><span>/agent</span></span></span><span> — 创建和管理 SubAgent</span></li></ul>

<ul><li id="f-doxcniGv0W2H9H2Zy0Pf1LGjLKd"><span><span><span>/plugin</span></span></span><span> — 插件管理器</span></li></ul>

<ul><li id="f-doxcnYETEsrZ2OiV40LqZ4yXiLh"><span><span><span>/permissions</span></span></span><span> — 权限管理</span></li></ul>

<ul><li id="f-doxcn7Aahws58TA4BC6NXwlJWIg"><span><span><span>/fork</span></span></span><span> — 分叉当前会话，用于并行执行不重叠的任务</span></li></ul>

<ul><li id="f-doxcnqzIIVRymFFNLgGNLWiLjIc"><span><span><span>/rename</span></span></span><span> — 重命名当前会话</span></li></ul>

<ul><li id="f-doxcnw1B1FkfI2BCeJcipAReltb"><span><span><span>/insights</span></span></span><span> — 生成个人 Claude Code 使用分析报告</span></li></ul>

<ul><li id="f-doxcnkSnzDElRL0bN8CPSTuW8Th"><span><span><span>/statusline</span></span></span><span> — 自定义状态栏显示内容</span></li></ul>

<a id="f-doxcnzoF6r5qL6j3q6q4XCpRcCh"></a>

##### Insights

<p id="f-doxcn1JDZYM014LO8W84TZvEdWf"><span>(这个是最近（2026.3月）面试喜欢考的一个特性）</span></p>

<p id="f-doxcnL0PcCWdemoD1cI2WUy79dc"><span>Claude Code 的 </span><span><span><span>/insights</span></span></span><span> 命令可以分析你所有的历史使用数据（跨项目），生成一份 HTML 格式的个人使用报告，保存在用户目录的 </span><span><span><span>~/.claude/usage-data/report.html</span></span></span><span> 位置。</span></p>

<p id="f-doxcnTjkwUQXGwgYwdn7cTI1Yyf"><span>报告内容包含：</span></p>

<ul><li id="f-doxcnruuBqiI7S6SC7zyu7wg3ad"><span>你使用 Claude Code 的典型模式和习惯</span></li></ul>

<ul><li id="f-doxcnaJmXfcAGawU1vTAELyXMMh"><span>做得好的地方（Impressive Things）</span></li></ul>

<ul><li id="f-doxcncV3yvZguICbGtnDC5XkR3b"><span>哪些地方在阻碍你的效率（Where Things Go Wrong）</span></li></ul>

<ul><li id="f-doxcnI626XpyC2TqGRQzzFQTYBf"><span>值得尝试的新功能和使用模式</span></li></ul>

<ul><li id="f-doxcnTNDsRORN4hDJht7McUFoXf"><span>工作流自动化建议</span></li></ul>

<p id="f-doxcnCvYg3Vdn0vLCHSZMfQgV2b"><span style="font-weight:bold">实用技巧</span><span>：生成报告后，可以将 HTML 文件上传给 ChatGPT 或其他 AI 工具，让它提炼最值得执行的 3-5 条行动建议（用不同 AI 分析避免数据偏向性）。</span></p>


<a id="section-0107"></a>
## 最佳实践经验

<a id="f-doxcnr3tAaTsvJ5ZSLRkVXrJ7b0"></a>

<p id="f-doxcnWzyNl2ybUJqlqTmcJjW7Ub"><span>以下最佳实践来自 everything-claude-code 项目（Anthropic Hackathon 获奖作品，作者每日使用 Claude Code 超过 10 个月的实战总结）。</span></p>

<a id="f-doxcn8elF38UiOhZtzoDfjS4ONh"></a>

##### 项目初始化必做三件事

<p id="f-doxcnPqaQ4Ws6R4RL5r8HtH5LKh"><span>在任何新项目开始前，先完成以下配置，后续效率会高很多：</span></p>

<p id="f-doxcn4NpYOWlbVB537QkNGvhyEd"><span style="font-weight:bold">第一件</span><span>：创建 CLAUDE.md，写清楚技术栈、编码规范、项目结构、禁止事项（如禁止硬编码密钥、禁止使用 emoji 等）。</span></p>

<p id="f-doxcnbQuA34uXrx3hA9BqvIjIEh"><span style="font-weight:bold">第二件</span><span>：如果是说项目本身的描述比较多，可以将CLAUDEM.D的内容下放 Rules 文件夹（</span><span><span><span>.claude/rules/</span></span></span><span>），按关注点分模块管理规则（但并不是所有项目都必须写rules, 项目简单规则就放在CLAUDE.MD中就行）：</span></p>

<pre id="f-doxcnHTmi8twy4FGG70Buet8S9e"><code>security.md      # 安全规则：不能硬编码密钥，要验证输入
coding-style.md  # 代码风格：不可变性、模块化
testing.md       # 测试规则：TDD 流程、80% 覆盖率
git-workflow.md  # Git 规范：提交格式、PR 流程
agents.md        # 何时委托给 SubAgent</code></pre>

<p id="f-doxcnd5uLOm1LMA8yYLGrdbwEAh"><span style="font-weight:bold">第三件</span><span>：选择合适的 Skill 和 MCP，使用 </span><span><span><span>/plugin</span></span></span><span> 一键安装团队共用配置。</span></p>

<a id="f-doxcnI3dUaJrVv9u26r2U6dtnVh"></a>

##### 先规划，再执行（Plan Mode 优先）

<p id="f-doxcnc2sKU40FfIagLHsODsXnFf"><span>复杂任务一定要先进入 Plan Mode，让 Claude 充分理解需求后再执行。盲目执行会导致：</span></p>

<ul><li id="f-doxcnnA29DJvJOLHg6vjvomtfdd"><span>修改了错误的文件</span></li></ul>

<ul><li id="f-doxcnEEEx1rbDgwSlKN6m8SXBEo"><span>产生大量无用的中间 Token 消耗</span></li></ul>

<ul><li id="f-doxcn8vfSnrhEBgo5R5e4nO5Kud"><span>后期难以回滚</span></li></ul>

<p id="f-doxcnMpL4F1Avwh8zVQb2KboSse"><span>在 Plan Mode 中，尽可能把需求描述清楚，包括目标、功能点、边界条件、期望输出格式，Claude 会主动提问补充细节。</span></p>

<a id="f-doxcnIo8ImAeGtXOYz1I6KpuCdb"></a>

##### 控制上下文，定期&quot;清理&quot;

<p id="f-doxcnJsHwF7vhAbEQBhtZHADNOb"><span>上下文窗口满了之后，Claude 的表现会急剧下降（变慢、变傻）。建议：</span></p>

<ul><li id="f-doxcnd14u1HbAjUr2ZKyLC4sQUd"><span>关闭不需要的 MCP：即使安装了 20-30 个 MCP，也只保持少于 10 个处于启用状态，活跃工具不超过 80 个。过多的 MCP 工具描述会占用大量上下文，200k 的窗口可能只剩 70k 可用。</span></li></ul>

<ul><li id="f-doxcn7epEDWsVdZ0GVpGOifRlPf"><span>在完成一个大阶段任务后，手动执行 </span><span><span><span>/compact</span></span></span><span> 压缩，保留关键决策，释放空间</span></li></ul>

<ul><li id="f-doxcnCPPLlGrKbij1oTSxvg9aTb"><span>开始全新任务前用 </span><span><span><span>/clear</span></span></span><span> 完全清空，避免旧上下文干扰</span></li></ul>

<ul><li id="f-doxcnL32MVJCCdtgnBkfQXFc6le"><span>用 </span><span><span><span>/context</span></span></span><span> 定期检查上下文用量，在自动压缩前主动手动压缩以获得更好的控制效果</span></li></ul>

<a id="f-doxcncsfwS5S4wu1i7AvPQn0prp"></a>

##### 跨会话记忆持久化

<p id="f-doxcn9vN5x5CIi5EdGcWdVfqo7g"><span>Claude Code 默认不跨会话记忆，可以通过以下方式解决：</span></p>

<p id="f-doxcnJE6jRbOvjGGUytgfnDsYKc"><span style="font-weight:bold">方案一：Session 文件</span><span>：在每次会话结束前，让 Claude 生成一份会话总结文件，记录：本次完成了什么、什么方式有效、什么方式无效、还剩什么未完成。下次会话开始时，提供这个文件路径即可续上。</span></p>

<p id="f-doxcnqHO9ejLXYjDiUgQzvDIqag"><span style="font-weight:bold">方案二：Stop Hook</span><span>：配置一个 </span><span><span><span>Stop</span></span></span><span> Hook，在每次 Claude 完成响应时自动将关键信息追加到 </span><span><span><span>.claude/session.md</span></span></span><span> 文件，下次启动时加载。使用 Stop Hook 而非 UserPromptSubmit（每条消息都触发），避免增加响应延迟。</span></p>

<p id="f-doxcnKUOHViG8NAoZ4QVXbgxwYE"><span style="font-weight:bold">方案三：动态系统提示注入</span><span>：</span></p>

<pre id="f-doxcnMtnbFbQ3i034P0Xku7kxpg"><code># 按上下文切换不同的记忆文件alias claude-dev='claude --system-prompt "$(cat ~/.claude/contexts/dev.md)"'alias claude-review='claude --system-prompt "$(cat ~/.claude/contexts/review.md)"'</code></pre>

<a id="f-doxcnQBqPuseN433UUjufDqX9Qh"></a>

##### SubAgent 模式提升效率

<p id="f-doxcncVax87lh7nw3SCkK84TyYX"><span style="font-weight:bold">两实例启动模式</span><span>：新项目开始时，同时打开两个 Claude Code 实例：</span></p>

<ul><li id="f-doxcnGTSiT69NwC5w28KAeHL0mh"><span>实例一（Scaffolding Agent）：负责搭建项目骨架、建立 CLAUDE.md 和 Rules</span></li></ul>

<ul><li id="f-doxcn27OAkMMFkeNGQhLiGPktQc"><span>实例二（Research Agent）：负责调研技术选型、生成详细需求文档（PRD）、绘制架构图</span></li></ul>

<p id="f-doxcn0PSVAKCd6n3BquYgLCeKBb"><span style="font-weight:bold">顺序执行模式</span><span>（Orchestrator with Sequential Phases）：</span></p>

<pre id="f-doxcnZVIJQMid2i5Nix2K5Vv6ta"><code>第一阶段：用 Explore 子代理做代码库调研 → 输出 research-summary.md
第二阶段：用 Planner 子代理制定计划 → 输出 plan.md
第三阶段：用 TDD-Guide 子代理实现代码 → 输出代码变更
第四阶段：用 Code-Reviewer 子代理审查 → 输出 review-comments.md
第五阶段：如有构建错误，用 Build-Error-Resolver → 循环直到通过</code></pre>

<p id="f-doxcnaFVQq6OlbdRky5ET9U19Jb"><span>每个子代理接收一个明确的输入文件，产出一个明确的输出文件，前一阶段的输出是下一阶段的输入，使用 </span><span><span><span>/clear</span></span></span><span> 在各阶段之间隔离上下文。</span></p>

<a id="f-doxcnZYZcYcPLdYpLxs3Xbzx3fe"></a>

##### Token 优化策略

<p id="f-doxcnUW5DaG2kwzfNTut6BwhJlk"><span style="font-weight:bold">模型选择策略</span><span>（根据任务复杂度降级使用更便宜的模型）：</span></p>

<ul><li id="f-doxcnMpGEnbq0ZQ7rVvV9Epwwx6"><span>代码库探索、文件搜索 → Haiku（速度快、成本低，够用）</span></li></ul>

<ul><li id="f-doxcnjhd8qlHZkQIkger3wyVK7g"><span>单文件改动 → Haiku</span></li></ul>

<ul><li id="f-doxcnMMcMvPCoxzfDaxUgHHzEXf"><span>多文件实现 → Sonnet（编程任务最优平衡）</span></li></ul>

<ul><li id="f-doxcnwo1Viq1cFEoQXR5VytnECf"><span>复杂架构设计 → Opus（深度推理）</span></li></ul>

<ul><li id="f-doxcna2FgbRoJhQV3LOQhSqbhjq"><span>安全漏洞分析 → Opus（不允许遗漏）</span></li></ul>

<ul><li id="f-doxcnueiVcRlwhz1TlcoewSSlLg"><span>PR 审查 → Sonnet</span></li></ul>

<ul><li id="f-doxcnQQpjjVRiyfsXJOy93H6vnb"><span>写文档 → Haiku</span></li></ul>

<p id="f-doxcnacOjEom04BJnWrKfRs8bYc"><span style="font-weight:bold">90% 的编程任务使用 Sonnet 即可</span><span>。首次尝试失败、跨越 5+ 文件、架构决策、安全关键代码时升级到 Opus。</span></p>

<p id="f-doxcnTfaIiM4klK9i1n1BqaMI7e"><span style="font-weight:bold">代码模块化</span><span>：将代码拆分为小文件（几百行而非几千行）不仅是好的工程实践，也直接降低 Token 消耗，提高首次执行成功率。</span></p>

<p id="f-doxcnz4RFedvQGRdEMEl99C5TIf"><span style="font-weight:bold">工具替换</span><span>：使用 </span><span><span><span>mgrep</span></span></span><span> 替代 </span><span><span><span>grep</span></span></span><span>/</span><span><span><span>ripgrep</span></span></span><span>，在 50 个任务的基准测试中，mgrep 平均减少约 50% 的 Token 消耗，查询质量持平或更优。</span></p>

<a id="f-doxcnJnErsX2IcrbcfarPRLEEeh"></a>

##### 有效的提示与沟通技巧

<ul><li id="f-doxcnNH636zCTfvoUGpGQEJohBe"><span style="font-weight:bold">把需求当作给团队成员写 SOP</span><span>：越具体越好，包含目标、输入、输出、边界条件</span></li></ul>

<ul><li id="f-doxcn5I5WU2WNa6ZOOWIEQYofph"><span style="font-weight:bold">WAT 框架</span><span>（Workflows-Agent-Tools）：将任务分为工作流（markdown SOP）、代理（负责协调）、工具（Python 脚本执行具体操作）三层，分离概率性 AI 推理和确定性代码执行</span></li></ul>

<ul><li id="f-doxcnmYpPLkAZvwRCZSdY0FZiSc"><span style="font-weight:bold">不要只描述目标，还要描述你的顾虑</span><span>：在让 Claude 部署代码前，说"先做安全审查，确保 API Key 没有暴露，然后再告诉我部署方案"</span></li></ul>

<ul><li id="f-doxcnf0BkZ52AUAtdn3B4ZMIRvg"><span style="font-weight:bold">反复出现的提示应该变成 Skill</span><span>：如果你发现自己多次给 Claude 相同的指令，就应该把它写成 Skill 文件，让 Claude 自动加载</span></li></ul>

<ul><li id="f-doxcncxbdVPPfyUfWnq2WhKLmzf"><span style="font-weight:bold">Ctrl+G 打开 VSCode 编辑器输入框</span><span>：当在终端输入框里需要多行复杂提示时，按 </span><span><span><span>Ctrl+G</span></span></span><span> 打开 VSCode 编辑，方便多行修改，保存后自动回填</span></li></ul>

<a id="f-doxcnPpC7T3BWBIgG5Ruy2jjP8f"></a>

##### 安全最佳实践

<ul><li id="f-doxcne6kqbjSsSJQwr6kMXXMDPd"><span style="font-weight:bold">绝对不要将 API Key 硬编码进任何文件</span><span>，应使用环境变量（</span><span><span><span>.env</span></span></span><span> 文件）或 Modal Secrets 等密钥管理服务</span></li></ul>

<ul><li id="f-doxcnWhiSKwmx2dc0qoWYOAVrDc"><span style="font-weight:bold">部署前主动要求安全审查</span><span>：让 Claude Code 检查代码中的漏洞，特别是 Webhook 是否有认证、Key 是否暴露</span></li></ul>

<ul><li id="f-doxcn6L2KF7adQJxOpwSzSE30wd"><span style="font-weight:bold">在 CLAUDE.md 中明确禁止规则</span><span>：如"禁止在代码中包含任何 API Key 或密码"</span></li></ul>

<ul><li id="f-doxcnkMWXOAnp5LqZbfMquf0mcd"><span style="font-weight:bold">精确控制 SubAgent 的工具权限</span><span>：代码审查 SubAgent 只需只读工具，不应有写权限</span></li></ul>

<ul><li id="f-doxcnk1ijFpzihHh1CwyvrqPjvb"><span style="font-weight:bold">使用沙盒模式</span><span>测试可能影响系统的危险操作</span></li></ul>

<ul><li id="f-doxcnTzUFNpIQiYtrGd6NXNCQLm"><span style="font-weight:bold"><span><span>--dangerously-skip-permissions</span></span></span><span style="font-weight:bold"> 意味着 Claude 拥有和你一样的终端权限</span><span>，仅在受控的开发环境中使用</span></li></ul>

<a id="f-doxcnbiMXuhTTnZ7zheTtZiooah"></a>

##### 并行工作流

<p id="f-doxcnCQut1QFpvBtTzEQhabAMhh"><span style="font-weight:bold">Fork 对话</span><span>：输入 </span><span><span><span>/fork</span></span></span><span> 分叉当前会话，在两个分支上并行执行不重叠的任务（例如：一个分支做后端 API 开发，另一个分支做前端 UI 开发）。</span></p>

<p id="f-doxcnJfWRfc8Nl4klfkwJDbM1Eg"><span style="font-weight:bold">Git Worktrees 多实例并行</span><span>：当多个 Claude 实例需要在有代码重叠的分支上并行工作时，使用 Git Worktrees 避免冲突：</span></p>

<pre id="f-doxcnYuXJ4ibHXCGMO2Q3OR9Mvc"><code>git worktree add ../feature-branch-a feature-a
git worktree add ../feature-branch-b feature-b
# 在不同目录分别启动 Claude 实例</code></pre>

<p id="f-doxcngZTAG9xIyllWyTkwKmSasg"><span style="font-weight:bold">Cascade 方法</span><span>：在多终端并行时，用从左到右的顺序组织标签页（最旧的在左）。使用 </span><span><span><span>/rename</span></span></span><span> 给每个会话命名，专注于最多 3-4 个并行任务，避免在过多实例间切换引发混乱。</span></p>

<p id="f-doxcnEUbdV6lCAbhHWsMbYxrtIf"><span style="font-weight:bold">原则</span><span>：以最少的并行实例完成最多的工作，并行不是越多越好。</span></p>

<a id="f-doxcndPmSiztlZ3PKqTCESjcjue"></a>

##### 连续学习机制

<p id="f-doxcnboKI4Q2IUBHJQoU9yXNsce"><span>当 Claude 发现了有价值的调试技巧、项目特定的模式或处理边界情况的方法时，将这些经验保存为新的 Skill 文件，下次遇到类似问题时自动加载，避免重复"教" Claude 同样的知识，节省大量 Token 和时间。</span></p>


<a id="section-0108"></a>
## 面试问答 Q&amp;A

<a id="f-doxcnoDlrwvFQLKLfLEOeY1wOgj"></a>

<a id="f-doxcnun945z3Mpu3ik0Hmwl7Qmb"></a>

###### Q：你了解 Claude Code 吗？能简单介绍一下它是什么吗？

<p id="f-doxcnQjU2wrK8oyzMhPYwUaT2jd"><span>A：Claude Code 是 Anthropic 推出的 AI 编程 Agent，可以通过自然语言对话来完成代码编写、重构、调试，以及构建自动化工作流。它不只是代码补全工具，而是一个能自主规划、执行终端命令、调用外部服务的智能代理。可以在 VS Code 等编辑器中使用，也可以独立在终端中运行。</span></p>

<a id="f-doxcnDnM3k20Sl1djFhpyI4g8sb"></a>

###### Q：Claude Code 的 CLAUDE.md 是什么，有什么作用？

<p id="f-doxcnfIUVLrhIKxiW35eW7lqJQd"><span>A：CLAUDE.md 是放在项目根目录的 Markdown 文件，Claude Code 每次启动时会自动读取它，起到"持久化系统提示"的作用。它解决了 Claude Code 新会话"失忆"的问题。内容通常包括编码规范、技术栈说明、注意事项等。用 </span><span><span><span>/init</span></span></span><span> 命令可以让 Claude 自动生成一份，用 </span><span><span><span>/memory</span></span></span><span> 命令可以快速打开编辑。</span></p>

<a id="f-doxcnIj0pGiUoxetBxuVndjEAYc"></a>

###### Q：你能分享一下你使用 Claude Code 的最佳实践吗？

<p id="f-doxcnuD9Cg6mb0yxOelpB8eViR5"><span>A：有几条可以认为最关键的实践：第一，复杂任务先用 Plan Mode 规划，让 Claude 充分理解需求再执行，避免误改文件。第二，控制 MCP 数量，只启用当前任务需要的 MCP，保持上下文窗口充裕。第三，把反复使用的提示写成 Skill 文件，减少重复提示和 Token 浪费。第四，部署代码前主动要求 Claude 做安全审查。第五，始终将 API Key 存在 </span><span><span><span>.env</span></span></span><span> 或密钥管理服务里，绝不硬编码在代码中。</span></p>

<p id="f-doxcnu2vnqpP3CQaqPl32D1ZWPc"><span style="font-weight:bold">Q：Claude Code 里的 Hooks 是什么？你有使用过吗？</span></p>

<p id="f-doxcnQIbakWDgSB8u3E3CdlTS9g"><span>A：Hooks 是在 Claude Code 工作流特定时机自动触发的脚本，有 PreToolUse、PostToolUse 等六种类型。一个典型用法是配置 PostToolUse Hook，在 Claude 写完代码后自动调用 Prettier 格式化文件，无需人工干预。还可以利用 Stop Hook 在会话结束时自动保存当前进度摘要，实现跨会话记忆持久化。</span></p>

<a id="f-doxcn4RsVBTdkOJJ3rBBdMvjUFk"></a>

###### Q：你知道 Claude Code 的 /insights 功能是什么吗？能分享一下它的作用？

<p id="f-doxcnDGdrJk7E5xSmVxCVcoFTrW"><span>A：</span><span><span><span>/insights</span></span></span><span> 是一个斜杠命令，运行后会分析你所有的 Claude Code 历史使用数据（跨项目），生成一份 HTML 格式的使用洞察报告，存放在用户目录的 </span><span><span><span>~/.claude/usage-data/report.html</span></span></span><span>。报告会展示你的使用习惯、效率瓶颈、值得尝试的新功能等。一个实用技巧是把这个 HTML 文件上传给 ChatGPT，让它提炼出最值得优先执行的几条改进建议。</span></p>

<a id="f-doxcn9oW4Ayv9ATg2MRrlKU6IVv"></a>

###### Q：如何在 Claude Code 中高效管理上下文窗口？

<p id="f-doxcnTQV7XWmtyEoHQnJ5378OFe"><span>A：几个关键策略：保持启用的 MCP 少于 10 个（虽然可以安装 20-30 个，但大多数时候禁用）；在完成阶段性任务后手动 </span><span><span><span>/compact</span></span></span><span> 压缩；开始全新任务前 </span><span><span><span>/clear</span></span></span><span> 清空；对于需要跨会话延续的任务，在 CLAUDE.md 或专用文件中记录进度；使用 SubAgent 处理探索性任务，避免大量中间日志污染主对话。</span></p>

<a id="f-doxcn8IDogTgdzOqkJgPpRU65De"></a>

###### Q：Claude Code 的权限系统是如何工作的？

<p id="f-doxcnCXsm2iCsTNucKPrXdq7jDn"><span>A：Claude Code 有三层权限控制：文件操作权限（默认要确认，选择自动模式后本次会话内自动通过）、终端命令权限（即使在自动模式下，执行终端命令默认仍需确认）、完全绕过权限（使用 </span><span><span><span>--dangerously-skip-permissions</span></span></span><span> 参数，官方明确标注危险，需谨慎）。可以通过 </span><span><span><span>/permissions</span></span></span><span> 命令把信任的操作加入白名单，把危险操作加入黑名单，权限配置可以保存到项目级或用户级配置文件。</span></p>

<a id="f-doxcnnbTELaWxZ5pTxEfj4FxdSc"></a>

###### Q：Claude Code 的记忆功能是如何实现的？

<p id="f-doxcnt00nzVtYYsC3wcqMG0Svg9"><span>Claude Code 的记忆系统由 4 种存储和 3 大运作机制组成。</span></p>

<p id="f-doxcnJSxjKs6iVf8vFwhukzhULh"><span style="font-weight:bold">4 种存储：</span></p>

<p id="f-doxcnniVoi8hjhDzCEgIabaWWTc"><span>第一种是指令文件，也就是 CLAUDE.md。这是唯一由人手动编写的记忆，告诉 Claude 项目的规则和约束。它分 4 个层级：管理员全局、用户全局、项目级和本地私有，支持 include 指令引用其他文件，上限 4 万字符。</span></p>

<p id="f-doxcnvJ3DXFQ2Y8uzCwxx9tExcc"><span>第二种是对话上下文，就是当前对话的消息数组，所有 LLM 应用都有，Claude Code 的特别之处在于配套了一套 5 层压缩策略来管理它。</span></p>

<p id="f-doxcny2Qg7vfZAMyiQPl44zcksc"><span>第三种是 Session Memory，是一个后台子代理在你工作的同时自动维护的结构化笔记。对话 token 超过 1 万后启动，之后每 5000 tokens 更新一次。它的作用是恢复会话时快速加载上下文，以及在上下文压缩时充当现成的摘要来源。</span></p>

<p id="f-doxcnrrjOozXHfaA9umQEzET0Rd"><span>第四种是持久记忆 Memdir，存在用户目录下的 memory 文件夹里，分 user、feedback、project、reference 四类。用一个索引文件 MEMORY.md 做入口，上限 200 行。这里有一个重要的设计决策：它故意不存代码事实，比如"某函数在第 30 行"这种信息。因为代码会变，但记忆不会自动更新，过时的代码记忆会变成危险的误导。代码相关的查询永远用 grep 和 glob 实时搜索，只有人的偏好和判断才值得持久化。</span></p>

<p id="f-doxcnyrSjlwidtCmdhK96XEqaUe"><span style="font-weight:bold">3 大运作机制：</span></p>

<p id="f-doxcnuMefS6Xt23FsXcySesrvLf"><span>加载方面，每轮对话前，所有层级的 CLAUDE.md 会被拼接在一起注入 system prompt。拼接顺序是利用了 LLM 的 recency bias，模型对 prompt 末尾内容天然给予更高注意力，所以排在后面的文件实际优先级更高。MEMORY.md 前 200 行自动加载，再用 Sonnet 小模型扫描所有记忆文件的标题，选出最多 5 条最相关的注入上下文。这是一种 push 模式，不用 RAG。</span></p>

<p id="f-doxcn3wHi2IMDo8rBnh8JfXsKhf"><span>写入方面，三个后台 Agent 分工合作。extractMemories 在每轮查询结束后自动提取持久记忆，Session Memory 按 token 增量持续更新笔记，AutoDream 每隔至少 24 小时且至少 5 个会话后做一次记忆整合去重，类似人类睡眠时整理白天记忆的过程。</span></p>

<p id="f-doxcnGYCsCQefvmCiiaqck9fLPg"><span>压缩方面则是 5 层流水线，从温和到激进逐层升级，这个下一题会展开。</span></p>

<p id="f-doxcnPy9uKbvaXEft5mJaVMc1ge"><span>核心设计思想可以用一句话概括：会变的东西实时搜，不变的东西持久存。</span></p>

<a id="f-doxcniuTJbLxWfyOCi26503nWNc"></a>

###### Q: 当模型上下文窗口满了，你是怎么做的？

<p id="f-doxcn7hHX5bVrnfzZPffC6eSH9l"><span style="font-weight:bold">版本一：以 OpenClaw 为例</span></p>

<p id="f-doxcnU0y1PdJzzki2g52NT4dPrg"><span>OpenClaw 采用一级压缩，但流程很精细。</span></p>

<p id="f-doxcnr3vqaRcRYxP2dFneWYyZkd"><span>首先划分保留区，最近大约 2 万 tokens 的原始对话原封不动保留。然后把更早的旧消息按 token 数分成多个块，逐块调用 LLM 做总结，再把多块摘要合并成一个连贯的总结。压缩前还有一步叫 Pre-Compaction Memory Flush，会静默运行一轮提醒 Agent 把重要内容写入记忆文件，防止关键信息随压缩丢失。</span></p>

<p id="f-doxcnH79fbO5OlGOrGGVKVKaAuh"><span>压缩后的结构就是一个合并摘要加上最近 2 万 tokens 的原文。</span></p>

<p id="f-doxcnq4VyBbXirqXTMX4jnV8n1c"><span>这种方式的特点是每次触发都需要 LLM 调用，成本更高，但实现简单、行为可预测。</span></p>

<p id="f-doxcn0zbNkAHQBx6fh1zMBVYuhh"><span style="font-weight:bold">版本二：以 Claude Code 为例</span></p>

<p id="f-doxcnoqniVTdgDioJ3yaqMSetIf"><span>Claude Code 设计了 5 层压缩流水线，逐层检查、按需执行，越往后越激进。</span></p>

<p id="f-doxcnpjqN7mLDw28iV0Fx3iTfnb"><span>第一层叫 Tool Result Budget，每轮都跑。当一轮对话中多个工具的返回结果累计超过 20 万字符时，系统会把最大的结果存到磁盘，原位替换成大约 2KB 的预览加一个文件路径。模型后续需要完整内容时可以自己去读。这是一种渐进式披露的思想，先给模型足够判断的预览，让它自己决定要不要加载全量。</span></p>

<p id="f-doxcnUMDSfsNnyJZyIjW4GIElsd"><span>第二层叫 Microcompact，清理旧的工具结果。它会利用 Prompt Cache 的 60 分钟 TTL，如果缓存已过期就直接清内容，没有额外损失。或者通过 cache_edits 指令在服务端缓存副本中删除内容，客户端消息不改，缓存继续有效，省钱。</span></p>

<p id="f-doxcnheH37PPf0KnBz3y8AMDquc"><span>第三层是核心层 Auto-compact，token 数超过大约 16.7 万时触发。它先尝试轻量方案，用后台已经维护好的 Session Memory 笔记充当摘要，不需要额外的 LLM 调用。如果轻量方案扛不住，再上 Full LLM Compact，把整段对话压缩成不超过 2 万 tokens 的结构化摘要，包含 9 个固定段落比如核心请求、涉及文件、待办事项等，压缩后还会自动恢复最多 5 个关键文件的内容让模型不至于完全失去文件上下文。</span></p>

<p id="f-doxcnHBlOkbknd0GBCIarBAZz2g"><span>第四层是硬拒绝，前面都压不下来就直接报错终止本轮。</span></p>

<p id="f-doxcngtHYBFDGo2Nmydz85KGAkd"><span>第五层是事后兜底，API 返回 413 错误后做一次摘要压缩再重试，每轮最多一次。</span></p>

<p id="f-doxcncr9DCawnH4mcmbHCpMnNRd"><span>两者的核心差异是：OpenClaw 一步到位但精细，分块加合并加预刷记忆。Claude Code 分两步走，先便宜后贵，用梯度设计换成本效率。大部分情况下前两层不需要 LLM 调用就够用了，Full Compact 是中低频事件。</span></p>

<p id="f-doxcndCjNSoXZBhCuJAfdMSzbzg"><span>实践上建议主动用 /compact 命令并附带指令，比如"重点保留决策和待办"，比等系统自动压缩效果好，因为你能控制保留什么。</span></p>

<a id="f-doxcna4D7plHZqMjknIUKJ3Ihqh"></a>

###### Q: 你看过 Claude Code 源码吗？有什么感受？

<p id="f-doxcnG2nTKd3471wZ6Htr4RZBac"><span>看过。最让我印象深刻的是它的记忆模块。</span></p>

<p id="f-doxcn1prDi3G5W2bRguJZ9AQSdb"><span>它把记忆拆成了 4 级。指令文件是人写的规则，对话上下文是短期记忆，Session Memory 是自动维护的会话笔记，Memdir 是跨会话的持久记忆。加载时用 Sonnet 小模型做 push 式召回而不是 RAG，写入时有三个后台子代理分别负责提取、更新和整合。整合那个叫 AutoDream，设计灵感来自人类睡眠时整理记忆的过程。压缩时 5 层流水线从温和到激进逐层降级。</span></p>

<p id="f-doxcnAIZQfd1cIZK0Pu8Fsf4KVb"><span>有三个设计思想可以认为特别值得学习。</span></p>

<p id="f-doxcn7bTLhIfXgIlXiiAsLVAlNd"><span>第一个是"会变的实时搜，不变的才持久化"。代码事实故意不存进记忆，因为代码改了但记忆不会自动更新，就会变成误导。只存人的偏好和判断，代码相关的查询靠 agentic search 也就是 glob 加 grep 实时解决。这对我做任何带缓存或索引的系统都有启发：变化频率高的数据不适合做离线索引。</span></p>

<p id="f-doxcnX4o8WXRE27TR0fdwn6va8c"><span>第二个是梯度降级设计。压缩不是"满了就全压"，而是 5 层从最便宜的操作到最贵的操作逐层升级。清理工具碎片不要钱，利用缓存过期不要钱，Session Memory 摘要几乎不要钱，只有真的扛不住了才上 LLM 全量摘要。大部分情况下前两层就够了，大幅降低了成本。这种能省则省、逐级兜底的思路在很多工程场景都适用。</span></p>

<p id="f-doxcnFJMUhnZJruc7YdJQWFOQte"><span>第三个是用小模型卸载大模型的决策负担。记忆召回不是让主模型自己决定要不要搜记忆，那样模型可能不知道自己不知道什么，漏掉重要信息。而是在每轮对话前让 Sonnet 小模型提前筛好塞进上下文，用算力换确定性。这个 push 和 pull 的权衡很值得参考。</span></p>

<a id="f-doxcn7cxoFm4zNi5AhLa0jRb9Xe"></a>

###### Q：Claude Code 是如何通过权限系统保证安全运行的？（或：如何避免 Agent 滥用工具？）

<p id="f-doxcnRKtNOT8ZIIFAil2FHWfgad"><span style="font-weight:bold">A：</span><span> 最根本的办法是</span><span style="font-weight:bold">不相信 Agent，而是让每个工具调用都经过多层权限约束</span><span>。这样即使 Agent 想滥用工具，也很难突破多重防线。</span></p>

<p id="f-doxcnbDlUh65kzV3ZfS7wYCZNcf"><span>以 Claude Code 为例，它采用</span><span style="font-weight:bold">四层权限管道</span><span>的设计：</span></p>

<p id="f-doxcn2xekz6G4wA4c63G0Djenqc"><span style="font-weight:bold">第一层是规则过滤</span><span>——用户配置 allow/deny 规则，做快速匹配。关键是 deny 规则</span><span style="font-weight:bold">不可绕过</span><span>，即使在完全信任模式下也生效，确保管理员的硬约束永远有效。</span></p>

<p id="f-doxcnkLZpy0u2VlXzb20s5qfCgd"><span style="font-weight:bold">第二层是工具自检</span><span>——每个工具根据操作内容做细粒度判断。比如 Write 工具会检查是否试图写入 </span><span><span><span>.git/</span></span></span><span> 或 </span><span><span><span>.claude/</span></span></span><span> 等关键目录（bypass-immune，免疫绕过），这些目录在任何模式下都受保护。</span></p>

<p id="f-doxcnSTXBA1I48nxHoX7IovUJAh"><span style="font-weight:bold">第三层是模式兜底</span><span>——定义 5 种权限模式（default/acceptEdits/plan/bypass/dontAsk），代表不同风险偏好。模式选择本身就约束了 Agent 的权限上界——再聪明的 Agent 也无法超出。</span></p>

<p id="f-doxcnWSdYxYuXk3sBCmPpfiYo6b"><span style="font-weight:bold">第四层是 AI 分类器</span><span>（仅 auto 模式）——独立 AI 根据上下文判断操作安全性。特意</span><span style="font-weight:bold">只看工具调用记录，不看模型输出</span><span>，防止 prompt injection。两阶段判决：快速粗筛（64 token）+ 深度精筛（4096 token），既保证安全又控制成本。</span></p>

<p id="f-doxcnyd2zBlazsioWQWNQuUggBh"><span style="font-weight:bold">核心原则</span><span>：Fail Closed（不确定就拒绝）+ Defense in Depth（纵深防御，不靠单点）。</span></p>


<a id="section-0109"></a>
## Codex VS ClaudeCode

<a id="f-doxcnalVMpbk9v5kWA1QNoeIijf"></a>

<p id="f-doxcngFFuBI5TjMqxPdFa37zUhh"><span>随着近期(2026年6月初）Codex的热度增高，网上很多人说Codex已经超过ClaudeCode。这一说法我不光在自媒体上听到，也听到同事圈有类似的说法。这篇笔记希望详细，</span><span style="font-weight:bold">诚实</span><span>地对比 ClaudeCode和Codex的</span><span style="font-weight:bold">区别，优势，特征，表现</span><span>。看完本次你的收获：</span></p>

<p id="f-doxcnMM0klNmtnWBxxDjTwWH4Be"><span>1. 如果你在</span><span style="font-weight:bold">纠结到底选择哪个工具，我相信看完你会知道如何选择。</span></p>

<p id="f-doxcngEP9Kl373c9Nhu8tzfnj9I"><span>2. 从VibeCoding的能力角度，看完你会掌握更好的VibeCoding使用技巧，根据测评结果：</span><span style="font-weight:bold">最推荐的使用方法是：针对于ClaudeCode和Codex的优势，取长补短，相互互补使用。</span><span>包括本节提到的一些两个工具的好用的地方，比如loop, ultrareview，都可以用起来。</span></p>

<p id="f-doxcnkk9zs4sjKlMQaFhzId06Ke"><span>3. 从面试的角度，</span><span style="font-weight:bold">如果面试官考察VibeCoding</span><span>，比如问到你使用什么VibeCoding工具，为什么？你知不知道Codex和ClaudeCode的区别？探讨到这些问题，相信你会回答得很好，本节也会总结这些问题的参考答案。</span></p>

<p id="f-doxcnewqimlx68z8kjlsiSC8sCh"><span>注意：</span><span>因为这些工具迭代速度很快，模型也在不断迭代，定价也经常变更，本节笔记和时间强相关</span><span>。如果你阅读本节时间相隔现在（2026年6月初）有一段时间，这些架构区别可能相对保持稳定，但是具体的特征，状态可能有所差异。</span></p>

<p id="f-doxcndh6540eaQbSUuvF7yhZlIh"><span>如果你觉得看文字有点枯燥，也可以参考本期讲解视频哦！</span></p>

<a id="f-doxcnphCDy73WybM0A3hoimwyqC"></a>

##### 核心结论

<p id="f-doxcn9GkjIolyxtmwraWBGvvdNQ"><span>问题并不在于哪个工具客观上更强。而在于：</span><span style="font-weight:bold">面对你当前这个具体场景，哪个工具更适合。</span><span>二者呈现的特点不同：</span></p>

<p id="f-doxcnopzQa0LDCAD2KqK8NmIX6f"><span style="font-weight:bold">Claude Code</span></p>

<p id="f-doxcnBxm8St4gzLZCN5aWqPu6Bc"><span>更像一个富有创造力的伙伴，更擅长头脑风暴；</span></p>

<p id="f-doxcnE1shhcS6rJuok53W1eb4bf"><span>当你走错方向时，它也更愿意指出问题、</span><span style="font-weight:bold">提出反对意见</span><span>。</span></p>

<p id="f-doxcn1pE2GS6XiRJXPN9zlWKtDh"><span style="font-weight:bold">Codex</span></p>

<p id="f-doxcn4GpvKXb1KJOYqooTncGIt3"><span>更像一个执行力很强的工程师，</span></p>

<div style="margin-left:25px"><p id="f-doxcnZET3rISZjriTAw6rSZ7I9g"><span> 擅长严格遵循指令、精确执行你的要求，以及在</span><span style="font-weight:bold">代码或方案审查时发现 Bug 与漏洞</span><span>。</span></p></div>

<a id="f-doxcnZv9qpYhPJAj3MSUyiJ4gcg"></a>

##### 两款工具简介

<div style="margin-left:25px"><p id="f-doxcnUlYTdrYtSrmVnIQAblYCFX"><span style="font-weight:bold">Claude Code（Anthropic）</span></p><p id="f-doxcnvu2u23Ahn3QZZqX2pCIezf"><span style="font-weight:bold">Anthropic </span><span>推出的代码 Agent，能够规划任务、编辑文件、运行命令，并根据你的配置请求权限。</span></p><p id="f-doxcnyE5AYo1wsJ62AQNg8KqDq2"><span>可在</span><span style="font-weight:bold">终端</span><span>、</span><span style="font-weight:bold">VS Code 扩展</span><span>、</span><span style="font-weight:bold">桌面应用</span><span>（Mac 和 Windows）以</span><span style="font-weight:bold">及网页版</span><span>（研究预览）中使用。</span></p><p id="f-doxcn4y43vt3dXFtzJNg1gkR9Sd"><span>可运行在</span><span style="font-weight:bold"> Opus（目前最强模型）、Sonnet 或 Haiku 模型</span><span>之上。</span></p><p id="f-doxcnwZuLFzozQYOPSFKe7lybGe"><span>它更像一个可由你自行塑造的工作流系统，你可以把它</span><span style="font-weight:bold">融入自己的工程习惯与自动化流程中</span><span>。比如你可以定义工作流，子Agent，Skill，hooks，来完成自己的一套自动化任务。</span></p><p id="f-doxcnsSal3HExjEeJuHAFy5TDIh"><span style="font-weight:bold">OpenAI Codex</span></p><p id="f-doxcn0LLy8x8oFifxwuPAur2GWf"><span>OpenAI 推出的新一代 Agentic Coding System（并不是 2021 年已经退役的那个 Codex 模型）。</span></p><p id="f-doxcnhAIT2rdyhJcHgCS0KN1Rxc"><span>可在终端、桌面应用（Mac 和 Windows）、VS Code 扩展（也支持 Cursor 等 IDE）以及云端版本 </span><span><span><a href="https://chatgpt.com/codex"><span>chatgpt.com/codex</span></a></span></span><span> 中使用。</span></p><p id="f-doxcnjrr26jt4Z4t6Zx8SQSiAdg"><span>支持运行在</span><span style="font-weight:bold"> GPT-5.5</span><span>、</span><span style="font-weight:bold">GPT-codex</span><span>（偏代码专用）以及 </span><span style="font-weight:bold">GPT-codex-spark</span><span>（更快、更轻量，Pro 用户的研究预览版）之上。</span></p><p id="f-doxcn31S3N2mA6fbRVR2gPFV4uf"><span>它更像一台"带有明确工程理念的机器"，目标是把</span><span style="font-weight:bold">流程从“Agent 完成任务”一路推进到“代码正式上线生产环境”。</span><span>（提供了一套成熟的工具，带你完成从代码-评审-部署-生产的一套标准化流程）</span></p><p id="f-doxcnvgedtrWLqw3tIOPBCG9Lpc"><span>已包含在所有 ChatGPT 付费与免费套餐中（Free、Plus、Pro、Business、Enterprise）。（也就是说只要你买了ChatGPT的额度，Codex天然就可以直接用）</span></p></div>

<a id="f-doxcnWYTTJQJCUSdaA8WAaGN9Vd"></a>

##### 它们有哪些重叠能力

<div style="margin-left:25px"><p id="f-doxcnSraLA1wANWlHU2EF0W0xOe"><span>两者之间的共同功能，其实比大多数对比文章里提到的还要多。这两个工具都能够：</span></p><div id="f-doxcnfUkTB2TTb2FOb7pBMp2b8g" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>在你的本地机器上编辑代码</span></div></div><div id="f-doxcnIVNasK7nfLpVVvDUoRDTxS" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>提供桌面应用和 VS Code 扩展</span></div></div><div id="f-doxcn6FLQ5uso4wsJnwKekvuVHg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>从命令行运行</span></div></div><div id="f-doxcndt0l1gZi0i0XPaHWex11ch" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>支持 MCP（用于将外部工具接入 AI 的开放协议）</span></div></div><div id="f-doxcn6hk5VxeYegm83PTIhrljhE" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>提供 CLI（命令行工具）</span></div></div><div id="f-doxcnaFvUzkuRFBOLE99PgctoDf" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>使用相同的 Skills 格式（带有 YAML Front Matter 的 Markdown 文件）</span></div></div><div id="f-doxcn5nzQdhlVseJ0OzGsqxjaqg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>提供插件市场（Plug-in Marketplace）</span></div></div><div id="f-doxcnBqRNVlu0638Wm1QBYrUqGc" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>支持云端任务委托（把任务丢给 Agent 后直接离开）</span></div></div><div id="f-doxcnMXrMnV3fwLYsGemkZaENjy" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>支持 Hooks 与 Sub-agents（子 Agent）</span></div></div></div>

<a id="f-doxcnG5QLz40W4AgKLjruPsUPrb"></a>

##### ClaudeCode胜出的地方

<p id="f-doxcnljEW9N9RUzxzzafjsqFBcf"><span style="font-weight:bold">1.</span><span style="font-weight:bold">更深度的可定制能力</span></p>

<p id="f-doxcnzLaNCqN4URuWBdh8FluGne"><span>Claude Code 提供大约 </span><span style="font-weight:bold">30 个 Hook 事件</span><span>，而 Codex 目前只有大约 </span><span style="font-weight:bold">6 个事件</span><span>。</span></p>

<p id="f-doxcnewYjB228x6ZUx1lmjFTj7c"><span>Hook 本质上是“自动触发器”——</span></p>

<p id="f-doxcnK5ILLDFjRWp3Q3VUAwUM7c"><span> 当某些事件发生时自动执行，例如：</span></p>

<ul><li id="f-doxcnSRMmpGwYp5Hfj8o5TuoiDf"><span>提交 Prompt</span></li></ul>

<ul><li id="f-doxcnAQ9WyWdu9qMhnEFzFrHpdd"><span>调用工具</span></li></ul>

<ul><li id="f-doxcn2iQ8FPRFwnMKAAkDDtN4hh"><span>Session 启动</span></li></ul>

<ul><li id="f-doxcnvG7OS6Toer3W4ZgdGuiP1d"><span>创建任务</span></li></ul>

<p id="f-doxcnWFlONcxAFxEBZAcFDueNul"><span>在这一点上，Claude Code 提供了大约 </span><span style="font-weight:bold">5 倍粒度</span><span> 的控制能力。</span></p>

<p id="f-doxcnAmjeJcWG6YYj4hWfqsJXOe"><span style="font-weight:bold">2. 自动委派子 Agent</span></p>

<p id="f-doxcnWB8vWaJr2DiFITemnDufKf"><span>当任务需要时，Claude Code 会自动生成子 Agent，例如：</span></p>

<ul><li id="f-doxcnqTUg7dDzo6ut0RfON87iDh"><span>Planner（规划器）</span></li></ul>

<ul><li id="f-doxcnOxY4SADwptGKGjYAnwyfnd"><span>Explorer（探索器）</span></li></ul>

<ul><li id="f-doxcnDOMn5dBgYDlh1sN5BpDzgg"><span>Code Reviewer（代码审查器）</span></li></ul>

<p id="f-doxcnm1m3pZZMlxSl8ZfKB5m0he"><span>而 Codex 则需要你显式要求后，才会生成子 Agent.</span></p>

<p id="f-doxcn2SDmi55deIVE0azgcYXANc"><span style="font-weight:bold">3. 强大的 Slash Commands</span></p>

<blockquote id="f-doxcnHopHuETPhJN1JTMBM8vUgh"><p id="f-doxcnEXcsfQ3daCxAGhLIxWoisd"><span>注意，这里的两个指令其实还是在preview版本，也就是没有正式上线，普通用户现在用不了。</span></p>
</blockquote>

<p id="f-doxcnt3LWVaUqRa4Lv2yQD1oc3b"><span><span><span>/ultraplan</span></span></span></p>

<p id="f-doxcnSWRKDJAerSEb9Iij0sKMne"><span>把规划阶段发送到云端 Claude Code Session，</span></p>

<p id="f-doxcnjKM84eLe4yXZpxsLkh7ntf"><span>你可以在浏览器中进行 Review 和添加内联评论（inline comments），</span></p>

<p id="f-doxcnpTEKu6jnFGbJbdgcWInxZe"><span> 之后再把结果回传到本地终端继续执行。</span></p>

<p id="f-doxcnCsPBdE1VfYh23LmGlhzjie"><span><span><span>/ultrareview</span></span></span></p>

<p id="f-doxcnOlIELzFzlwI4SDU8X9rFhd"><span>启动多个 Reviewer Agent，</span></p>

<p id="f-doxcnJdOkU5kPe9mwzhMti4ltUJ"><span> 实现更深入的多 Agent Code Review，并复现问题。</span></p>

<ul><li id="f-doxcnJKogM3wgvgAowAaKi3agpd"><span>Pro / Max 用户可免费使用 3 次</span></li></ul>

<ul><li id="f-doxcnV3IKu40bpHyo0y4sfu9CSf"><span>超出后按次计费</span></li></ul>

<p id="f-doxcnwdhQ2p01aRSWnOCTMnxbFc"><span style="font-weight:bold">4. </span><span style="font-weight:bold"><span><span>/loop</span></span></span></p>

<p id="f-doxcnKwc5JyQePBGiEKxA7AbV9N"><span>你可以给 Claude Code 一个“周期性 Prompt”，让它按计划重复执行。</span></p>

<p id="f-doxcnXHb9U44bSPBBuK63ltNKvh"><span>或者不提供 Prompt，直接让它进入“维护模式”。</span></p>

<p id="f-doxcnHNY2WKUZDCSRmfx2rad0Th"><span>它能够自主处理：</span></p>

<ul><li id="f-doxcnhfwVKEMwBiTRwMc39KWc0d"><span>未完成任务</span></li></ul>

<ul><li id="f-doxcnuzfPGbIOLdWWaIU2m9Wxxe"><span>PR 评论</span></li></ul>

<ul><li id="f-doxcnL8l4uXjsiM1AJHfTMUcBSd"><span>Merge Conflict 修复</span></li></ul>

<p id="f-doxcngMnJJTDSrNinBvCKzEBp3g"><span>等持续性工作。</span></p>

<p id="f-doxcnEHKg3PRn2Y4pPh6b6POVmd"><span style="font-weight:bold">5. Channels</span></p>

<p id="f-doxcnRlxS0TvT9QN7fsRWzUAxff"><span>这是一个 MCP Server，</span></p>

<p id="f-doxcnucoABl60wuovT2tSmBwLye"><span>能够把 Telegram、Discord、iMessage 等外部事件推送进正在运行的 Claude Code Session。</span></p>

<p id="f-doxcn4H64hJ95GVGHEDIVcqngIc"><span>你甚至可以直接用手机“发短信”给你的 Agent。</span></p>

<p id="f-doxcnnrCmd6XWJx2EImomksMECf"><span style="font-weight:bold">6. Claude Agent SDK</span></p>

<blockquote id="f-doxcndgH1Pk64CUQ5btSGkADdXc"><p id="f-doxcnRZUXTTKv6ceA42CODtltic"><span>Claude把他们的ClaudeCode能力封装成了sdk，在这个SDK基础上可以用更细的粒度，使用CC的思想开发Agent。我们使用ClaudeCode本身，只能用它的预制功能，但是如果使用AgentSDK，可以构建一个和CC类似的，但是更加定制化的产品。</span></p>
<p id="f-doxcn9CB5SlGPN2ZcxYhc16x0kd"><span>有一本书叫《ClaudeCode Harness之道》（参考资料），AgentSDK是作为ClaudeCode的专门一个小节。</span></p></blockquote>

<p id="f-doxcnzcBFrveq8zd4yDjpJGAEbc"><span>Claude Code 背后的同一套 Agent 引擎，</span></p>

<p id="f-doxcnZ9HnwRIcZ3Q3w5EINi198b"><span> 已经开放为：Python SDK和TypeScript SDK两个版本。</span></p>

<p id="f-doxcni4DhxVdtA4KXwKCSQ49EMe"><span>你可以基于它构建属于自己的 Agent 系统。 想更多了解Claude Agent SDK？参考</span><span><span><a href="https://blog.csdn.net/2401_82819240/article/details/161146967"><span>这里</span></a></span></span></p>

<p id="f-doxcnWqbM7AGLkHR6SjGQD8xD1g"><span style="font-weight:bold">7.</span><span style="font-weight:bold">企业级认证</span></p>

<blockquote id="f-doxcnr50NQc6JC1PjVpwFXEKRTb"><p id="f-doxcnUamy9lkhyDgRwhgbSe7jqf"><span>这个主要是ToB的能力，就是提供了如何让企业安全托管和调用大模型的能力。Bedrock、Vertex、Foundry 是企业在自己云里安全合规地“托管和调用大模型”的平台。Claude Code 支持这三家，意味着它能进入大公司的合规环境工作</span></p></blockquote>

<p id="f-doxcnNQvhirvRuXQDTnlzX7AWqe"><span>Claude Code 支持：</span></p>

<ul><li id="f-doxcnAfO5K1s1frWpDoqDmUa6Gh"><span>Bedrock</span></li></ul>

<ul><li id="f-doxcn9TDo8htdlBqvnCu9BjcyXb"><span>Vertex AI</span></li></ul>

<ul><li id="f-doxcn1fKbqwWIwtkDxDpt4ourRf"><span>Microsoft Foundry</span></li></ul>

<p id="f-doxcnAv62zAoprfZ3r6o8bd7ofd"><span>这些大型企业常用的 AI 托管平台。</span></p>

<p id="f-doxcnFm4MpCclcdMEgADVjiHsvd"><span>目前 Codex 在 OAuth 灵活性方面，还达不到这个级别。</span></p>

<a id="f-doxcnohbhiAGiFgyXFAoMwCu7ld"></a>

##### Codex胜出的地方

<p id="f-doxcnI0iUCnBXPkOdUl98Xvifcg"><span style="font-weight:bold">1. 更统一的工作流设计</span></p>

<p id="f-doxcnwrDT9DZj9MFW7lOE8MaoDj"><span>Codex 从底层就是围绕 </span><span style="font-weight:bold">Git Worktree</span><span> 构建的。</span></p>

<p id="f-doxcnUnILr8fe1oTA9kh8MoXpcf"><span>每一个线程（thread）都会运行在自己的 worktree 中，</span></p>

<p id="f-doxcn4ZGPkzLrsj1Vh68xG75L51"><span> 不会互相污染主项目。</span></p>

<p id="f-doxcnIuWlIVIb5vt0ZLDylxDboe"><span>这意味着：</span></p>

<ul><li id="f-doxcnFxumTNvasYZ0s6Vxui9Shf"><span>Agent 并行工作更安全</span></li></ul>

<ul><li id="f-doxcnBnLoWdjVpzMXO5UUnVSDgc"><span>不容易覆盖彼此改动</span></li></ul>

<ul><li id="f-doxcnCj0sbzFl4TKBkRntF7c9Ob"><span>更适合多任务开发</span></li></ul>

<p id="f-doxcnAbmf1jCRRmsYda4vecWOAf"><span>更重要的是：</span></p>

<p id="f-doxcndrZ575trlDk1ySQ8q5zGhh"><span style="font-weight:bold">2.内置浏览器</span></p>

<p id="f-doxcn2LE3pW0R21ps4HSN5vNHqe"><span>Codex 桌面应用内直接集成了浏览器。</span></p>

<p id="f-doxcn142W231g0bLiZ6RKCdFQSe"><span>你可以：</span></p>

<ul><li id="f-doxcn0yl5JEOwDHq6EQP2fpVogd"><span>查看 Agent 刚刚生成的页面</span></li></ul>

<ul><li id="f-doxcnIueiAwoEDaihpaaMgDZIad"><span>直接在页面上留下视觉评论（visual comments）</span></li></ul>

<p id="f-doxcnT5EQSw1rQ1msCuSo5ATptc"><span>在修改AI改完的代码并且review给出意见的问题上，Codex的体验感更好。（其实Claudecode也有这个在browser上检查修改过的代码的功能，只不过它是集成在浏览器上的，需要 Agent 写完 → 切到 Chrome → 手动检查， 而Codex直接集成在桌面，更流畅）</span></p>

<p id="f-doxcnlfyJgG3KrrrJbycAnjawph"><span style="font-weight:bold">3. 更强的电脑操作能力</span></p>

<blockquote id="f-doxcnmp2UZhmEx52cf49gVhmaHg"><p id="f-doxcnGcELUTRKuvWGdBB91UgHsf"><span>这一点还是很好用的，我们构建一款应用，做自动化测试，使用Codex的内置方法实现点击测试，还是非常实用的。</span></p>
</blockquote>

<p id="f-doxcnbOwnUo7PDfCmymLtwM5tqc"><span>Codex 的产品 QA（质量测试）流程非常成熟。</span></p>

<p id="f-doxcnGq3Q3TXTrTU1W8f754Ow6f"><span>比如你让 Codex 测试刚刚构建的 App：</span></p>

<p id="f-doxcnFh0tUbQsoqqDWTcAlhgRve"><span>它会：</span></p>

<ul><li id="f-doxcnSxkRB3nZmttrA0M8QR9FJt"><span>自动打开应用</span></li></ul>

<ul><li id="f-doxcnseds3tNcp6clOHPbMRnHEf"><span>点击页面</span></li></ul>

<ul><li id="f-doxcnITmBBH56UlMltMq0sYo9Yg"><span>发现 Bug</span></li></ul>

<ul><li id="f-doxcn3JRmp1qZkSh662ecZ4DMqh"><span>记录问题</span></li></ul>

<p id="f-doxcnlIjOVWLtsGTEFfqyVhOnKb"><span>甚至还能自动生成：</span></p>

<ul><li id="f-doxcnfTW1GHFu5xPdXIRSfkVuWe"><span>严重等级（Severity）</span></li></ul>

<ul><li id="f-doxcnxCsLHNm8wkfLBqC0b2XI6f"><span>预期行为 vs 实际行为</span></li></ul>

<ul><li id="f-doxcn43USkc2CE0LlhtgfC9P9Pe"><span>复现步骤（Steps to Reproduce）</span></li></ul>

<ul><li id="f-doxcn1S0nrxeJZF5cBEnZHtajaf"><span>问题分诊总结（Triage Summary）</span></li></ul>

<p id="f-doxcnIG55WcCsK3DSJcrwqmGy3b"><span>这已经非常接近真实 QA 工程师的流程。</span></p>

<p id="f-doxcnBg2TNSmi8v8HNVRHUusqZd"><span style="font-weight:bold">4.GitHub 集成</span></p>

<p id="f-doxcnflBVz58MbnTjOezFYAcplf"><span><span><span>@codex</span></span></span><span> 的体验非常顺滑。你只需要在：</span></p>

<ul><li id="f-doxcnpiDopRiQAsqLoYilaUtrRh"><span>PR 评论</span></li></ul>

<ul><li id="f-doxcne0TvtRwuJk1TFuqoaoMmrh"><span>Issue</span></li></ul>

<p id="f-doxcn3cJMp4LEKebswYwwvVvBNh"><span>里 @codex，</span></p>

<p id="f-doxcnCg1TU4aZPRVDwomCun0Sx1"><span>它就会直接启动一个云端 Sandbox 去处理任务。几乎是：零配置。这点对团队协作尤其舒服。</span></p>

<p id="f-doxcniTICE1c8fkAkEC6aTzxyce"><span style="font-weight:bold">5. GPT Image 2 图像生成能力</span></p>

<p id="f-doxcn0j6WEvUJnuLLberJt4f3xf"><span>Codex 内置了 GPT Image 2（目前的图像生成最强模型）这意味着它可以直接生成游戏素材，产品icon, UI插画。</span></p>

<p id="f-doxcni8x1P00oWh5rVckKNy42dd"><span style="font-weight:bold">6. Codex的review功能</span></p>

<p id="f-doxcnosDufrOZYC6vP4ZenjXEMp"><span>Codex的/review相比于ClaudeCode的/review功能。Codex更会从挑刺的角度分析，更能够发现问题。而ClaudeCode的review相对来说更加谄媚，不太能分析出来潜在的bug（这里说是普通/review功能，不是CC的/ultrareview)，因此在这一问题上，可以认为Codex的review功能更好。</span></p>

<a id="f-doxcn9zI5s7rfp5MHVSu49kuaOf"></a>

##### 第三方工具集成问题

<p id="f-doxcnG7CDpT2Rzn1R75tHyr9Fsm"><span>像 </span><span style="font-weight:bold">OpenClaw</span><span>、</span><span style="font-weight:bold">Hermes Agent</span><span> 这样的第三方开源工具，最近开始越来越受欢迎。原因在于：</span></p>

<p id="f-doxcnxDlBO3ygvLEUlqTyGdEtKd"><span>它们在 coding agent 的基础上，额外加入了很多“长期自治能力”，例如：</span></p>

<ul><li id="f-doxcn8Zl76ytamhSpNPLBaqqzE5"><span>原生 Cron 定时任务</span></li></ul>

<ul><li id="f-doxcno3VZBSXMK5MZmxa46AdRNd"><span>Heartbeat（心跳机制）</span></li></ul>

<ul><li id="f-doxcnxCpp62rGAUGU2TcOMb6dMh"><span>主动技能调用（Proactive Skill Use）</span></li></ul>

<p id="f-doxcns50RZQioLavoAZoUcC5S5e"><span>Agent 不再只是“你问一句，它做一步”，而是开始变成一种能持续运行的半自治系统。</span></p>

<p id="f-doxcnZfNZx3UZwlCz7zm1kmwU7d"><span>OpenAI和Anthropic公司对于第三方集成问题的态度，则显得截然不同。</span></p>

<p id="f-doxcnC8WZt8uhIlXTjUhjWizBqe"><span style="font-weight:bold">OpenAI对于第三方 Agent 工具，OpenAI 的态度相对开放。你可以用自己的 ChatGPT 订阅登录 OpenClaw / Hermes，然后把 Codex 能力路由进去使用</span><span>。甚至Sam Altman 在 5 月 2 日还公开认可了这种做法。</span></p>

<p id="f-doxcntiMDuTyoq8dyXOapW3pKMf"><span style="font-weight:bold">Anthropic 则明显更保守</span><span>。Claude Agent SDK 文档里明确写着：除非事先获得 Anthropic 批准，第三方开发者不能向用户提供 Claude.ai 登录能力，也不能共享 Claude 的订阅额度。换句话说：你不能合法地：拿自己的 Claude Pro 账号，接到第三方 Agent 平台里无限跑。</span></p>

<a id="f-doxcnhsJXNunGtwdOk0CcdyMxId"></a>

##### 定价

<p id="f-doxcn6bu8NP8rnHdsSMzpPUR8Rd"><span>两边其实都不需要单独买 API Key。因为：Claude Code 已经包含在 Claude 订阅里，Codex 已经包含在 ChatGPT 订阅里。所以你开通对应会员后，基本就能直接开始用。</span></p>

<p id="f-doxcnxIiHO0YAmjqgnwqzH5j2cc"><span style="font-weight:bold">Claude 这边</span></p>

<p id="f-doxcnyllMJYEAzhABTg5OxuzZah"><span>Claude Pro 是每月 20 美元，包含 Claude Code 的基础使用权限。</span></p>

<p id="f-doxcn7ZYSHvAy0kJYHApbzolsEf"><span>如果你是重度用户，可以升级：</span></p>

<ul><li id="f-doxcnURDKirM3MaGd0j0uafTuhf"><span>Claude Max 5x：每月 100 美元，大约是 Pro 五倍额度</span></li></ul>

<ul><li id="f-doxcnhhqCY1k1MjzpeCyxy4Kj93"><span>Claude Max 20x：每月 200 美元，大约是 Pro 二十倍额度</span></li></ul>

<p id="f-doxcn5hlS7NxC2v0mpiuQy3qsOd"><span>不过最近不少用户反馈：Claude Code 的 session limit 和 weekly limit 比以前更容易撞到。</span></p>

<p id="f-doxcnwJdSMYsO2OHsc1Nqrgu2Vc"><span>特别是长任务、多 Agent、超长上下文工作流时会比较明显。</span></p>

<p id="f-doxcnR3tFcPtD7UuRJlboKHBsVf"><span style="font-weight:bold">Codex 这边</span></p>

<p id="f-doxcnNkGGtxyRgLYJugOFDY1OXI"><span>Codex 已经直接包含在 ChatGPT 套餐内：</span></p>

<ul><li id="f-doxcnhLoAWxXci27cMRz4c4M3pc"><span>免费版可体验基础能力</span></li></ul>

<ul><li id="f-doxcnPmXFywOSlXa3PkDDrHK6Kd"><span>Plus（20 美元/月）即可使用 Codex</span></li></ul>

<ul><li id="f-doxcnoSjC30TlPZEaTAFmMlwWud"><span>Pro（200 美元/月）基本接近“无限使用”</span></li></ul>

<a id="f-doxcnWxpbL1JliVo3tLxVfsTD6b"></a>

##### 同一任务测试

<p id="f-doxcnZTm4RraF9CtDl1QE9ezozd"><span>最后你可能想问，对于同一个任务，哪个AI生成的效果更好，代码质量更好？这个问题其实就更难评测了，因为对于任务效果的评估是主观的，另外对任务性质的不同可能导致结论的不同。</span></p>

<p id="f-doxcnmwxSJQNEXKEHCMbOFqQ5wh"><span>不过 Youtube博主Nate Herk也使用了同样的提示词，</span><span style="font-weight:bold">两家最强模型（Opus 4.7和GPT 5.5）</span><span>对ClaudeCode和Codex在生成</span><span style="font-weight:bold">品牌化PDF,</span><span style="font-weight:bold">生成官网Page</span><span>，</span><span style="font-weight:bold">生成市场数据分析图表三个任务上测试</span><span>。大致结论如下：</span></p>

<p id="f-doxcnwmyK3Zt3Ia4QZxYuaP6bPh"><span>ClaudeCode在UI质量，视觉效果，产品感，</span><span style="font-weight:bold">动效方面，表现得更好。Claude Code 更像“有审美的高级工程师”</span></p>

<p id="f-doxcnNg2w0o26bXIwWCXyPY33Ne"><span>而Codex在结构化输出，工程流畅，文档规范性, </span><span style="font-weight:bold">稳定性方面执行得更好</span><span>。Codex 更像“</span><span style="font-weight:bold">高效的生产工程师</span><span>”。</span></p>

<p id="f-doxcn5OhMqb2nYC1v4RTi7zbJZe"><span>从Token使用量上，Claudecode倾向于输出更多的token，更爱解释更改展开，因此用户更容易撞 Claude 限额。</span></p>

<a id="f-doxcnhMS61eEO73IIyUDusyQGed"></a>

##### 结论：如何选择？

<p id="f-doxcnhCBxQRbV5f3MiQY5xsXAhK"><span style="font-weight:bold">你应该优先选择 Claude Code，如果</span><span>：</span></p>

<ul><li id="f-doxcnb8hXbLiu3zvv08TOwqysQb"><span>你在做复杂前端（complex frontend）</span></li></ul>

<ul><li id="f-doxcnVAJ26JK9l16ZkZAcqYO2Jf"><span>视觉设计质量很重要</span></li></ul>

<ul><li id="f-doxcngNl15Js0UdQlc1xqPjQFWd"><span>任务需要深度规划（deep planning）</span></li></ul>

<ul><li id="f-doxcnPEkymMmoYO1bwppc2CmwQg"><span>你希望 Agent 自动委派 sub-agents</span></li></ul>

<ul><li id="f-doxcnWVMg9orOcsoPgki0YS3gGf"><span>你正在构建带 Hooks、Skills、Channels 的自定义工作流</span></li></ul>

<ul><li id="f-doxcntREx9rv2Y6ckaeahIhzivc"><span>你需要 Claude Agent SDK，将 Agent 能力嵌入自己的产品</span></li></ul>

<ul><li id="f-doxcnbBqj3FpoKfhY2qiKgoxzZg"><span>你处于需要 Bedrock / Vertex 等企业认证的环境</span></li></ul>

<ul><li id="f-doxcnDPrkajzDbSq1a9e11i44Zg"><span>你在做 brainstorming，或者正在解决复杂问题</span></li></ul>

<p id="f-doxcnL3vUiaDCCrtvYw9UpSQdXc"><span>因为CC尤其擅长：UI, Dashboard, 前端，架构，workflow orchestration, 上下文推理。</span></p>

<p id="f-doxcnpMTU3rSas5tEzDIavtU73c"><span style="font-weight:bold">更适合使用 Codex 的场景</span></p>

<p id="f-doxcn2uoMTH0MyZzb3CrEyI5Y3g"><span>你应该优先选择 Codex，如果：</span></p>

<ul><li id="f-doxcnFSTEajA9gcNQuHUi2pZdId"><span>任务偏 research-heavy，需要大量联网研究</span></li></ul>

<ul><li id="f-doxcnoSWakfVVkj210yMJiuDyGb"><span>你在生成结构化文档，例如 PDF 或报告</span></li></ul>

<ul><li id="f-doxcnzPAsg9HUgLVf35VR9HAwbf"><span>你希望一个 App 里直接完成： </span></li></ul>

<div id="f-doxcnQ63boXkD2GkytbKcMgoufb" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>worktree</span></div></div>

<div id="f-doxcnwwIWy9DOuYRhlmT6BTd9ac" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>review</span></div></div>

<div id="f-doxcnKhpXgAkRCNlSLQsI9S33Vb" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>shipping</span></div></div>

<ul><li id="f-doxcnTqbO7itGDuUNJWiY65cL9d"><span>你想在 GitHub PR 里直接 </span><span><span><span>@codex</span></span></span></li></ul>

<ul><li id="f-doxcnNWB0Ms8iM5yWX5ahlFdPjc"><span>项目需要内置图片生成能力</span></li></ul>

<ul><li id="f-doxcn4b9vg10GIgaAYeJhjHkEkc"><span>你需要一个长期稳定执行的大型工程工作流</span></li></ul>

<p id="f-doxcnWibmYLVr4oHjf9kZDl8zPh"><span>因为</span><span style="font-weight:bold">Codex尤其擅长</span><span>:工程执行 + QA + 长任务 + 生产交付</span></p>

<a id="f-doxcnNF7Mbj7loicxAhcNFGPMNe"></a>

##### 迁移小技巧

<p id="f-doxcnvePlkUNUmBmBVoYm3qoZEj"><span>首先我个人使用codex，我走的模型的中转，不走Openai官方账号，走后台的服务器，中转API请求，比常规流程更复杂一些，但是，</span></p>

<p id="f-doxcn7Pf6nZICoMmVtH8U7NqO1e"><span>1.</span><span style="font-weight:bold"> Codex的配置。</span><span>你使用ClaudeCode，告诉它你的基本需求：需要下载codex，使用代理来完成模型调用不走官方账号。 我先让它规划方案，最后它框框执行。经过几次测试（比如模型调用失败，我把错误粘贴给CC),让它修改，很快它就帮我完成了这个功能。 亲测使用CC下载，安装，配置Codex, 全程不到2小时，很容易。</span></p>

<p id="f-doxcnXkfq9ZrwsG4bUyBDQPZ32z"><span>2. </span><span style="font-weight:bold">项目的迁移。</span><span>我将我的ClaudeCode的项目配置成Codex的项目，也很容易。因为我的CC项目里面有很多skills, workflows, claude.md等，我只用告诉它：</span><span style="font-weight:bold">这是CC的项目，现在我需要使用Codex,请帮我完成相应适配</span><span>。它会自动完成包括SKILL的转换，Claude.md-&gt;Agent.md，所以从项目工程迁移上，成本也很低。</span></p>

<a id="f-doxcnNQKu8bHszTVoNlc2QLCyge"></a>

##### 面试问题

<p id="f-doxcnfF2nyojf1KU4nzfkY6UWfu"><span style="font-weight:bold">1.</span><span style="font-weight:bold">你平时会用什么VibeCoding的工具呢</span></p>

<blockquote id="f-doxcnDxZGr6pADbPcAhRNoKr9Bc"><p id="f-doxcnjsJTzuDZdj7qaxvgKWvfsg"><span>如果我学习了我们今天的内容，你回答的时候，从这二者的优缺点的角度，取长补短地使用，肯定能体现你真的是在高效地使用AI，聪明地使用AI。这个问题其实面试官就是想问你对Vibecoding工具的了解，有没有聪明使用。当然我也希望大家能切实理解今天的内容，使用上了codex和Claudecode(没用过，也起码把最少相关内容理解了），因为这个答案其实挺高级的，你要是一点不懂这俩工具，面试官继续和你讨论你连他们基本特性都不懂，这个问题回答得又是这么聪明地在使用AI，那么他会觉得你是背的。</span></p>
<p id="f-doxcnguUwdysk3RNFa7Wyeyhgce"><span>另外可以认为这个回答还是不够具体，有点浮在理论。更好的答案还是真的结合你的使用情况来说，这个就要求大家真的看懂了本期内容，真正去实践，再回答。</span></p></blockquote>

<p id="f-doxcn5Nzcsn76ioEHFGcYj3Km8f"><span>我会同时使用ClaudeCode和Codex，因为他们的特点和优缺点不同，我会取长补短地使用它们。</span></p>

<p id="f-doxcnWDK8KQ44IwdWEthHddukTd"><span>ClaudeCode更具有创意性，当我需要进行复杂方案设计，头脑风暴时，我会借助Claudecode的能力，同时他对于前端的设计能力，审美更好，包括定制化更强比如提供了30+个hook的能力，当我需要进行那些特别定制化的任务，创造自己的workflow的时候，我会使用ClaudeCode。</span></p>

<p id="f-doxcn1eg82XRPTDFMY4kacq1rXd"><span>Codex则更严谨，指令遵循能力更好。当我需要使用一些长时间，稳定的任务，可以选择Codex，他更加听从指挥，执行严谨。同时他在git生态支持上也很好用，从coding - review - deploy -production整个链路提供了非常好的支持，比如具备了自动操作电脑来执行review，测试前端代码输出报告，有这些需求时我会使用Codex。</span></p>

<p id="f-doxcnKisiyPg417zmf2T7Q3toBh"><span style="font-weight:bold">2.你熟悉什么VibeCoding工具，能简单讲讲吗？</span></p>

<blockquote id="f-doxcnqRA53Ozq1knHnlJvCVQ49O"><p id="f-doxcn1ymeLFMEQ1Muq9o15v4Lab"><span>同时给面试官讲两个当前最强的coding工具，分析他们优缺点，面试官肯定会对你竖起大拇指，觉得你愿意研究，关注最新技术。</span></p></blockquote>

<p id="f-doxcn20bMULaPkPqHgljpdawele"><span>我熟悉 Claude Code 和 Codex，这两个是目前比较主流的 Vibe Coding / Agentic Coding 工具。二者定位不太一样，我一般会结合使用：Claude Code 负责规划、设计和复杂思考，Codex 负责工程执行、Review 和长期任务推进。</span></p>

<p id="f-doxcn5Z18iNyO0VK53dHFAONyFg"><span>Claude Code 更偏“创造力”和“产品感”。它比较适合复杂前端、Dashboard、UI 设计、架构规划这类任务，生成的页面和交互通常更精致，Agent 工作流能力也更强，比如自动 sub-agent、hooks、长上下文推理等，比较适合做 brainstorming 和复杂工程设计。</span></p>

<p id="f-doxcnR2EnMNIefoiTVyYpOmT7ne"><span>Codex 更偏“工程化”和“执行力”。它的 GitHub 工作流、QA、代码 Review、长时间任务执行会更稳定，token 效率和成本控制也更好，适合做 PR 修复、自动化开发、结构化文档生成以及持续交付类任务。</span></p>

<p id="f-doxcn8jWAMnrQUjeTTnH1w9uEfb"><span>以上两个问题是面试原题：参考2</span><span><span><a href="/posts/agent-learning-24-interview-review/#f-doxcnMWQwNzSZdTiCuCnvVvOgCe"><span>02605 安克暑期实习一面</span></a></span></span></p>

<a id="f-doxcnqoFdSpqdjSrSCQ6dzwhvHc"></a>

##### 讲解视频

<p id="f-doxcn46CzlAiJI2OAytJ4WDoG3d"><span><span><a href="https://www.bilibili.com/video/BV1cqE86NE8c/?spm_id_from=333.1387.homepage.video_card.click&amp;vd_source=144bec9c3f54e465073138bed788be1b"><span>https://www.bilibili.com/video/BV1cqE86NE8c/?spm_id_from=333.1387.homepage.video_card.click&amp;vd_source=144bec9c3f54e465073138bed788be1b</span></a></span></span></p>

<a id="f-doxcndUxRcLGJHH3oLRbfg1hdke"></a>

##### 参考资料

<p id="f-doxcnjElDlGCU60hVPQUp0xpsse"><span>Nate Herk博主做的</span><span><span><a href="https://www.youtube.com/watch?v=RLjaUES9P8A&amp;t=149s"><span>CC vs Codex测评的视频</span></a></span></span><span>，也是本期视频主要参考资料，理论上如果本小节你都看明白了，不需要再去观看此视频了。</span></p>

<p id="f-doxcnKyyfSp0bRt0QBFyX0zBWCQ"><span>Codex安装使用教程。其实我自己在迁移小技巧 章节教了大家如何配置Codex，结合CC的能力。我自己很快配置好了。网上也有0基础保姆级教学，我找了一个资料，供大家参考。</span></p>

<div id="f-doxcnew973DXLDt2Q9eo0zrVy2d"><div><div><div><div><div><div><div><div><div><a href="https://open.douyin.com/player/video?vid=7641831765677460776&amp;mode=pc">嵌入视频 / 原始播放器</a></div></div></div></div></div></div></div></div></div></div>


<a id="section-0110"></a>
## Codex ClaudeCode安装小技巧

<a id="f-doxcnDOuqNnBTvhcNtH5x0T955b"></a>

<p id="f-doxcnVRvwsIYQOq1ArhiFLyGe8a"><span>本案例用Github中转，不用订阅CC和Openai，也能用上Codex和Claudecode，也可以使用GPT5.5 和 Opus4.8的模型，我把它写成了skill，有兴趣可以参考。</span></p>

<p id="f-doxcnH0WzMcQPDcvZbj3uaJ8qpc"><span>我自己安装很顺利啊，但是大家也许会遇到一些问题，我还是希望大家能够看一下里面的原理到底是什么，遇到问题去修改。这套方法是完全可行的。如果我把所有封装的特别好，其实也可以做到，但是当你遇到问题，比如你想改模型，你都不知道怎么做，你会一脸蒙。因为这里面的原理不是使用官方模型，而是走了中转，改模型要改配置。</span></p>

<p id="f-doxcngvfBKULH7rkiCwtQcnpJkg"><span>我举这个例子是想说，希望你能稍微理解里面的原理再去使用，这样遇到问题你知道怎么改。</span></p>

<p id="f-doxcnMbK8nFR94yAm7dquumPsje"><span><span><a href="https://github.com/jerry-ai-dev/claude-codex-copilot-bridge/blob/main/SKILL.md"><span>https://github.com/jerry-ai-dev/claude-codex-copilot-bridge/blob/main/SKILL.md</span></a></span></span></p>


<a id="section-0111"></a>
## 如何给ClaudeCode（包括其他coding工具）节省Token？

<a id="f-doxcnXI0BffQzRxfuFMKrGj7XGb"></a>

<p id="f-doxcnAr5viKru8Q9EcFlEbd71uf"><span>这篇笔记的目的，是教你一套</span><span style="font-weight:bold">节约 AI 工具提示词（Token）的技巧</span><span>。学会之后，你在日常使用 AI 编程时，可以省掉大量 Token——无论你是按量付费的 API 用户（直接省钱），还是订阅版用户（额度更经用）。</span></p>

<p id="f-doxcnMPfaUd1VYtP3JGSw7c3Ugf"><span>本文虽然以 </span><span style="font-weight:bold">Claude Code</span><span> 为例讲解，但其中的</span><span style="font-weight:bold">方法和原理是通用的</span><span>，同样适用于 Codex、Gemini CLI 等其他 Vibecoding 工具——差别只在具体数字和命令，思路完全可以照搬。</span></p>

<p id="f-doxcnheXE113kXYTOUusJZBwmQh"><span>而且，学会本章节不只是为了省钱。</span><span style="font-weight:bold">从面试的角度</span><span>看，它同样很有价值：当面试官问你有没有使用 Vibecoding 工具的心得，能介绍一下吗？如何编写提示词的最佳策略？这类问题时——包括理解 Claude Code 的压缩与缓存策略这一块——本章的内容都能让你答得有条理、有深度。文末我也会照例，把对应的面试问题单独整理出来。（我印象很深的是夸克千问的Agent开发二面，面试官就是和我讨论怎么写提示词，他会一直问我还有什么策略吗？还有什么吗？如果当时我看了今天的素材，我的回答就会多一个角度。）</span></p>

<p id="f-doxcnIQXHDIJEFpEU7qi1l8wjJj"><span>本篇的组织结构是：</span></p>

<ol start="1"><li id="f-doxcnbKZieY939esdEzWkfSuLMd"><span style="font-weight:bold">先理解大模型的计费标准和策略</span><span>——只有知道它怎么收费，才能知道该怎么省钱。</span></li></ol>

<ol start="2"><li id="f-doxcnjP6ynAGpuKTF6Ul3APNjvf"><span style="font-weight:bold">再讲解 Claude Code 的提示词缓存策略</span><span>——这一块比较复杂，我会给出参考文档，感兴趣的可以深入学习；我们先大致理解它的原理，才能明白后面最佳实践为什么要那样做。但这里也几乎是全文最难的地方，理解了这里，其他地方就很容易了。</span></li></ol>

<ol start="3"><li id="f-doxcnZblxbCnPAM6KD3H8LcCcYf"><span style="font-weight:bold">然后是最佳实践</span><span>——告诉你具体应该怎么做，并给出需要用到的工具链接。</span></li></ol>

<ol start="4"><li id="f-doxcnK2jmL2VyH6k0turZdruSoh"><span style="font-weight:bold">最后是面试问题总结</span><span>——一如既往，把学完本节后能应对的面试问题整理出来。</span></li></ol>

<a id="f-doxcnpTt5mfOX73hIb2HKcZ7xze"></a>

##### 大模型的计费标准

<a id="f-doxcnWgP22lc8W6UdcPedaxCskf"></a>

###### 先看懂：你跟 AI 说一句话，背后发生了什么

<p id="f-doxcn5WGwGdMxKIMFA5K0jShwRg"><span>在谈钱之前，先弄清一次对话的完整过程——不然后面那些输入、缓存、输出你会对不上号。</span></p>

<p id="f-doxcnfSmsnKxMxHfUIQULy6m8ug"><span>你每发一条消息，模型并不是只读你那句话。它每一轮都要</span><span style="font-weight:bold">把整个上下文从头到尾读一遍</span><span>，然后才生成回复。这个上下文包括（这里是粗略地讲，其实Agent的上下文内容，我们每个Agent架构都会专门讲解，但本节主要是聚焦于计费，不深究上下文细节，以下是最典型的模型上下文组成）：</span></p>

<div style="margin-left:25px"><div id="f-doxcn4066RZ9XEpVJYbEmON1Q8e" style="display:flex;gap:0.5em"><span style="min-width:1.5em">a.</span><div><span style="font-weight:bold">系统提示 + 工具定义</span><span>（Claude Code 内置的一大段说明，最靠前）</span></div></div><div id="f-doxcnbIuWpMoz3DNy3QVeAhCsLe" style="display:flex;gap:0.5em"><span style="min-width:1.5em">b.</span><div><span style="font-weight:bold">项目信息</span><span>（你的 CLAUDE.md、memory 等）</span></div></div><div id="f-doxcn5SegTzM3AvhlOmOxRkx5Ih" style="display:flex;gap:0.5em"><span style="min-width:1.5em">c.</span><div><span style="font-weight:bold">之前的完整对话历史</span><span>（前面每一轮的问和答）</span></div></div><div id="f-doxcn8yiDXF3I24tBjT6iIUHa5g" style="display:flex;gap:0.5em"><span style="min-width:1.5em">d.</span><div><span style="font-weight:bold">你这一轮新说的话</span></div></div></div>

<p id="f-doxcnaep60GZ6QzGSezeTub4KEq"><span>把这 4 块加起来，模型读进去的全部，叫 </span><span style="font-weight:bold">输入（input）</span><span>；模型写出来的回复，叫 </span><span style="font-weight:bold">输出（output）</span><span>。</span></p>

<p id="f-doxcnaUnIzEPygGziDd0XnTFOIf"><span style="font-weight:bold">关键问题来了</span><span>：第 ①②③ 块，其实</span><span style="font-weight:bold">每一轮都长得一模一样</span><span>（系统提示不变、CLAUDE.md 不变、已发生的历史也不会变），只有第 ④ 块每轮才新增。如果每轮都把 ①②③ 当成全新内容重新读一遍并收全价，那太浪费了。于是就有了</span><span style="font-weight:bold">缓存</span><span>：把这些重复不变的部分</span><span style="font-weight:bold">存起来</span><span>，下一轮直接复用。</span></p>

<p id="f-doxcnaIk40MypDPZD8lBSLElGh6"><span>这就引出了收费的逻辑。下面这张图把一次请求怎么被拆分收费画清楚。核心逻辑是：</span></p>

<blockquote id="f-doxcntG4VvCpnzFNNqcxuR67tog"><p id="f-doxcnUyU89IUF8RsUiPPMWZ10Qf"><span style="font-weight:bold">一次请求 = 输入 + 输出两部分收费。输出只有一种（最贵）。而输入会按有没有命中缓存分成三条路，每条价格不同。</span></p>
<p id="f-doxcn66uQdGv140A823ClypxF7c"><span>❓ </span><span style="font-weight:bold">你可能会先问：为什么一次大模型请求的费用要分成输入和输出两部分？</span></p>
<p id="f-doxcnhLm2Y7WGfJ1gVJsioOI9cf"><span>因为大模型推理本身就分成两个截然不同的阶段，成本差异很大。做过模型推理的同学应该清楚，这两个阶段叫 </span><span style="font-weight:bold">prefill（预填充）</span><span> 和 </span><span style="font-weight:bold">decode（解码）</span><span>——</span><span style="font-weight:bold">输入正对应 prefill，输出正对应 decode</span><span>。</span></p>
<ul><li id="f-doxcnYxptmmnL1ansVJlEnAsbBb"><span style="font-weight:bold">prefill（对应输入）</span><span>：把你的整段 prompt 一次性读进去理解。这些 token 可以</span><span style="font-weight:bold">并行处理</span><span>，GPU 一口气就能吞一大批，算得快、摊到每个 token 的成本低 → 所以</span><span style="font-weight:bold">输入便宜</span><span>。</span></li></ul>
<ul><li id="f-doxcnU5bDqRGh5gPvm55ceJtWwb"><span style="font-weight:bold">decode（对应输出）</span><span>：生成回复时只能</span><span style="font-weight:bold">一个字一个字往外蹦</span><span>（每个新词都依赖前一个，没法并行），每生成一个 token 都要把整个模型重跑一遍，慢且吃算力 → 所以</span><span style="font-weight:bold">输出最贵</span><span>。</span></li></ul>
<p id="f-doxcnwwvP8IgbvIllaQGs01Q1VF"><span>一句话：</span><span style="font-weight:bold">因为读 prompt 和写回复是两种成本完全不同的计算，所以要分开计费</span><span>——这也是为什么后面输出的单价会远高于输入。</span></p></blockquote>

<div id="f-doxcnEjVjnQKvFyGUTe0Hs5tO1c"><img alt="" decoding="async" height="240" loading="lazy" src="/images/agent-learning/3b831dd6af2f8435e0f228d2.png" width="360"/></div>

<p id="f-doxcnpkNu1Yt1ZCBYtulvkQHDDh"><span>这一次请求会被拆成四种收费名目：</span></p>

<div style="margin-left:25px"><div id="f-doxcn8kyu5lLpcNXMz0PHrASRdf" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">① 缓存写入 cache write（5m / 1h 两种时长）</span><span>：发生在某段内容</span><span style="font-weight:bold">首次出现的那一轮</span><span>——内容第一次被读，并存进缓存。</span></div></div><div id="f-doxcna8Q93BVTHAcu9y1UIzf7rf" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">② 缓存读取 cache read（便宜 10 倍）</span><span>：发生在</span><span style="font-weight:bold">后续每一轮复用它时</span><span>——内容没变、还没过期，直接复用。</span></div></div><div id="f-doxcnrHbaGWpjqqhhl7C59KCbkd" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">③ 基础输入 input（全价）</span><span>：发生在</span><span style="font-weight:bold">缓存过期/失效后重读，或某段内容压根没被缓存</span><span>时——当成全新内容来读。</span></div></div><div id="f-doxcnaa2zbm3zx6NeKLRtdTEAkg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">④ 输出 output（最贵）</span><span>：发生在</span><span style="font-weight:bold">每一轮的回答</span><span>——模型生成回复。</span></div></div></div>

<p id="f-doxcn23kPMCxu20WpzXEQCI1Dtg"><span>一句话串起来：</span><span style="font-weight:bold">同一段内容第一次见 → 走写入存起来；以后复用 → 走便宜的读取；如果缓存没了、当新的重读 → 走全价输入；模型的回答 → 走最贵的输出。</span><span> 省 token 的所有招数，本质都是在操控这几个阶段的走向（让更多内容走②便宜读取、少走③④）。</span></p>

<p id="f-doxcnduhQMVa0kdRWboAceufWjb"><span>理解了这个过程，再看下面的价目就顺了。</span></p>

<a id="f-doxcnCgvahTBZ6IT2U83foA6lnc"></a>

###### 五类 Token 的单价

<p id="f-doxcnSNvwEeq8lYL1KzoNsAGfLd"><span>Claude API 把 token 分成 </span><span style="font-weight:bold">5 种，单价各不相同</span><span>（以下为官方定价，单位：美元/百万 token）：</span></p>

<p id="f-doxcnMrGnaUD4YllzqykLGML5kg"><span>以基础输入的单价为基准（记作 1×），5 种 token 的相对倍率如下：</span></p>

<ul><li id="f-doxcn47WnMTyHNGDPtjafIhhN7c"><span style="font-weight:bold">基础输入 input</span><span>：全新的、没缓存过的输入，</span><span style="font-weight:bold">1×（基准）</span><span>。</span></li></ul>

<ul><li id="f-doxcn5rywdlCm0lRwKzsrprubTh"><span style="font-weight:bold">缓存写入 cache write（5 分钟）</span><span>：内容第一次写进缓存，</span><span style="font-weight:bold">1.25×</span><span>（比输入还贵一点）。</span></li></ul>

<ul><li id="f-doxcnPeM3U04f0RZJBWZ3lUkGtf"><span style="font-weight:bold">缓存写入 cache write（1 小时）</span><span>：写进缓存并保留 1 小时，</span><span style="font-weight:bold">2×</span><span>。</span></li></ul>

<ul><li id="f-doxcnW0Yty84NY60pUXEMGUbztd"><span style="font-weight:bold">缓存读取 cache read</span><span>：复用已缓存的内容，</span><span style="font-weight:bold">0.1×</span><span>（便宜 10 倍！）。</span></li></ul>

<ul><li id="f-doxcnTwxFgYDzIaOVtvHwlQo8Jd"><span style="font-weight:bold">输出 output</span><span>：模型生成的回复，通常是输入的 </span><span style="font-weight:bold">5 倍</span><span>（最贵）。</span></li></ul>

<p id="f-doxcnL85DUwKAvQjmV31reLnThf"><span>把这套倍率画成图，一眼就能看出差距（数值＝相对基础输入的倍率）：</span></p>

<div id="f-doxcnrNhz2u9AiC5065ADQgLmwe"><img alt="" decoding="async" height="505" loading="lazy" src="/images/agent-learning/d267a3fcc7a8669ccfedd832.png" width="728"/></div>

<blockquote id="f-doxcnRrYYbd0aLvgM6cYBhTdylD"><p id="f-doxcnoeXfdPoLtHTlkXuZR5lLrb"><span>看这张图就懂了：</span><span style="font-weight:bold">最左边的缓存读取几乎贴地（0.1×），最右边的输出高达 5×。</span><span> 省 token 的全部套路，本质就是——把尽量多的量从右边（贵）挪到左边（便宜）。</span></p></blockquote>

<p id="f-doxcnnE45SeCQRYHyfe2fgRTDW4"><span>以几个主流模型为例（美元/百万 token，顺序为 输入 / 缓存写入5m / 缓存读取 / 输出）：</span></p>

<ul><li id="f-doxcnx7E4v0tk7aqdVbuMSfY5Df"><span style="font-weight:bold">Opus 4.5</span><span>：$5 / $6.25 / </span><span style="font-weight:bold">$0.50</span><span> / $25</span></li></ul>

<ul><li id="f-doxcnuwCEvgOUwqSsv85EbfNpbh"><span style="font-weight:bold">Sonnet 4.5</span><span>：$3 / $3.75 / </span><span style="font-weight:bold">$0.30</span><span> / $15</span></li></ul>

<ul><li id="f-doxcn5KEmOGA6J2FE5tNCRAESIf"><span style="font-weight:bold">Haiku 4.5</span><span>：$1 / $1.25 / </span><span style="font-weight:bold">$0.10</span><span> / $5</span></li></ul>

<p id="f-doxcn28XMmm7t9hxtXnk4Ainzod"><span>同一模型内，各类 token 的实际单价差距也很直观（以 Opus 4.5 为例，美元/百万 token，列与上一张图一一对应）：</span></p>

<div id="f-doxcnKn7U50aiinBiIsQG7OgM1X"><img alt="" decoding="async" height="516" loading="lazy" src="/images/agent-learning/39de0f1ac593b3fa2f75c387.png" width="738"/></div>

<blockquote id="f-doxcn24quQpqHUAvZpgXxZOryaf"><p id="f-doxcnHTKeT7JtWZENXNMmZAgDqd"><span>中间三档（输入 $5、写入5m $6.25、写入1h $10）挤在一起，两头拉得最开：</span><span style="font-weight:bold">最便宜的缓存读取 $0.50，最贵的输出 $25，差 50 倍。</span></p>
</blockquote>

<p id="f-doxcnOWAPjGmxQFF17zqsgGRLFh"><span style="font-weight:bold">从这张表能读出三个关键事实，它们正是后面所有省 token 手段的依据：</span></p>

<ol start="1"><li id="f-doxcnjdFOSxMeVYTUGYgSQDcy4e"><span style="font-weight:bold">缓存读取便宜 10 倍</span><span>（0.1×）。所以让内容尽量走 cache read，是最大的一块节省——这就是原理层顺应缓存的意义。</span></li></ol>

<ol start="2"><li id="f-doxcngqjULgPyUTjlXpGm12YPtd"><span style="font-weight:bold">输出最贵</span><span>（约输入的 5 倍）。所以让模型少说废话省下的是最贵的那种 token——这就是让 Claude 简洁回答为什么划算。</span></li></ol>

<ol start="3"><li id="f-doxcnHNGH6znjbIrfb3i5Kt1D9e"><span style="font-weight:bold">写入缓存略贵一点</span><span>（1.25×），是一次性成本，下一轮就靠便宜的读取回本。所以</span><span style="font-weight:bold">频繁打破缓存 = 反复付这笔写入费</span><span>，特别亏。</span></li></ol>

<a id="f-doxcnbJhHvJnSLTAhRmaf4c8xRg"></a>

##### Claude Code 的提示词缓存策略

<p id="f-doxcnRLYCe0GLpO4uIteFmpxZyb"><span>上一章讲清了怎么收费，这一章讲清缓存怎么运作——它是 Claude Code 的</span><span style="font-weight:bold">内置行为</span><span>，不用装任何东西，但理解它是后面所有最佳实践的根基。</span></p>

<p id="f-doxcninYFrTQU6OAV3OwjhsWuFc"><span style="font-weight:bold">缓存是什么：复印 + 存档</span></p>

<p id="f-doxcnPWa7v37L5nQxKP5cHS00Lf"><span>把缓存想象成</span><span style="font-weight:bold">复印存档</span><span>：</span></p>

<ul><li id="f-doxcn1AMAWMhtgdXgm6GFzO7lYc"><span style="font-weight:bold">cache create（缓存创建）</span><span> ＝ 第一次把内容复印、归档。有成本，但</span><span style="font-weight:bold">只花一次</span><span>。</span></li></ul>

<ul><li id="f-doxcnrXOiRcS541f0gJ2oonXeCb"><span style="font-weight:bold">cache read（缓存读取）</span><span> ＝ 之后直接从档案柜拿复印件，不用重新处理，</span><span style="font-weight:bold">便宜约 10 倍</span><span>。</span></li></ul>

<p id="f-doxcnueIOQUO7pHFAAP1uRZJym6"><span>同一段内容，第一次见按 create 收费，以后每次复用按 read 收费。</span><span style="font-weight:bold">省钱的关键就一句话：让尽量多的内容走便宜的 read。</span><span> 而且这一切</span><span style="font-weight:bold">自动发生</span><span>，你不用配置。</span></p>

<p id="f-doxcncEMT7fvFIyKyR1vkmSObFe"><span style="font-weight:bold">缓存分三层：范围越大越省</span></p>

<p id="f-doxcnHAnhCHKNsIBYXJqyJx64fe"><span>Claude 的缓存按能被多大范围复用分三层，越靠前越稳定、越多会话共享：</span></p>

<ul><li id="f-doxcncEMvFKss65WfPO7011lj4e"><span style="font-weight:bold">系统层</span><span>：内容是基础指令、工具定义，复用范围是</span><span style="font-weight:bold">全局（所有会话共享）</span><span>。</span></li></ul>

<ul><li id="f-doxcnFTfNpJNxC0dvMsBXx9JZvg"><span style="font-weight:bold">项目层</span><span>：内容是 CLAUDE.md、memory，复用范围是</span><span style="font-weight:bold">按项目</span><span>。</span></li></ul>

<ul><li id="f-doxcnBdNQfywvl8G7bOxTwN4xgf"><span style="font-weight:bold">对话层</span><span>：内容是你的消息、回复，复用范围是</span><span style="font-weight:bold">仅当前会话</span><span>。</span></li></ul>

<p id="f-doxcnYodDIafZtoLDYJ0ERxjD6c"><span style="font-weight:bold">TTL：缓存能活多久</span></p>

<p id="f-doxcnPhr1PVsOLKUNHgVsb5vVDc"><span>TTL 是缓存闲置多久后过期。</span><span style="font-weight:bold">每次活跃使用都会重置计时</span><span>，只有长时间不碰才作废。</span></p>

<ul><li id="f-doxcnKCDVWpJV8pEF4C7LdRUm0g"><span>订阅版 / Claude Code：</span><span style="font-weight:bold">1 小时 </span></li></ul>

<ul><li id="f-doxcnQD4uhhamPh7hp9XFvRMDAb"><span>API 付费 / 子代理：</span><span style="font-weight:bold">5 分钟</span></li></ul>

<p id="f-doxcnFTfsjr2gfPcama1S8myYVg"><span style="font-weight:bold">缓存是怎么随对话一轮轮增长的</span></p>

<p id="f-doxcnv51HkgH7CW6m1RtmvDbZcf"><span>知道了缓存的分类，还得看清缓存在多轮对话里</span><span style="font-weight:bold">怎么一步步长大</span><span>——这决定了你什么时候便宜、什么时候突然变贵。</span></p>

<p id="f-doxcnuaszkxzYLx4AsSf6fBLG6b"><span>核心机制叫 </span><span style="font-weight:bold">前缀匹配（prefix matching）</span><span>：缓存是从</span><span style="font-weight:bold">最开头</span><span>起、一段段往后叠的。每一轮都会把</span><span style="font-weight:bold">完整上下文</span><span>重新发一遍，其中</span><span style="font-weight:bold">没变的前缀部分直接读缓存（便宜），只有新增的部分才需要写入缓存</span><span>。</span></p>

<div id="f-doxcnzbVQD2X02eiIhzUZnfaJMg"><img alt="" decoding="async" height="853" loading="lazy" src="/images/agent-learning/373752afbdd397b41571c18e.png" width="1280"/></div>

<p id="f-doxcnRxTJnarjoZJJOoSMJzDwPe"><span>用图里的四轮来看：</span></p>

<div style="margin-left:25px"><div id="f-doxcnoLAfJYfVj9EAzHvg9EAq0c" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">第 1 轮</span><span>：全新开始，还没有任何缓存。系统提示 + 项目上下文 + 消息1 </span><span style="font-weight:bold">全部要处理并写入缓存</span><span>（这一轮最贵）。</span></div></div><div id="f-doxcndz4EqiLnSkBmyDRAAeqOhd" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">第 2 轮</span><span>：前面那一整块（系统提示、项目上下文、消息1）</span><span style="font-weight:bold">没变 → 直接读缓存</span><span>；只有新增的回复1 + 消息2需要写入缓存。</span></div></div><div id="f-doxcn2MOZbBI8VYqd5ZynKcigke" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">第 3 轮</span><span>：同理，前面全部读缓存，只有新增的回复2 + 消息3写入。</span><span style="font-weight:bold">越往后，便宜的读取占比越高——这就是为什么长会话反而越用越省。</span></div></div><div id="f-doxcnbRFlRM49e95FigoWtJdKsf" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">第 4 轮（系统提示被改了）</span><span>：因为最靠前的系统提示变了，</span><span style="font-weight:bold">整个前缀的指纹对不上了</span><span>，从它往后的所有内容——哪怕一个字没改——都得</span><span style="font-weight:bold">重新处理、重新写入</span><span>。一夜回到第 1 轮，一次昂贵的重算。</span></div></div></div>

<p id="f-doxcnzTjjNeRhD2nbwoqBgG1Atd"><span style="font-weight:bold">什么会打破缓存</span></p>

<p id="f-doxcni8CloIc95IOmVKHaFneijb"><span>缓存是</span><span style="font-weight:bold">前缀匹配</span><span>——从头往后一段段叠。</span><span style="font-weight:bold">只要动了靠前的内容，从那点往后全部作废、要重新 create。</span><span> 触发情形：</span></p>

<div style="margin-left:25px"><div id="f-doxcnCV6gNgWYwfWWyLsSyELupb" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>闲置超过 TTL（缓存过期）</span></div></div><div id="f-doxcnzxqromDxhJO1wr8Hb4lgBc" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">切换模型</span></div></div><div id="f-doxcnR3Vw9zfjkb6hJV8O1G9cnc" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>改系统提示</span></div></div><div id="f-doxcnlGwdBBUD8MT8g73hnVb9ef" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>执行 </span><span><span><span>/compact</span></span></span></div></div></div>

<p id="f-doxcnpHRB0KVQloGvF7C7YBnKJd"><span>（注意：改 CLAUDE.md 反而不会立刻失效，重启会话才生效。）</span></p>

<p id="f-doxcnwWOY63LjfxTInj0brSO0Uf"><span>这就解释了核心结论：</span><span style="font-weight:bold">只要动了靠前的东西（改系统提示、切模型、或让缓存过期），前缀就断了，后面全部作废重来。</span><span> 往后追加新对话是安全的，动前面是致命的。</span></p>

<blockquote id="f-doxcnOKY1IW1XPzrTl003rF1vcb"><p id="f-doxcnICcZ6i3GBL1pTjiHhkNQRg"><span>📎 </span><span style="font-weight:bold">提示词缓存的完整机制其实相当复杂</span><span>——它还涉及缓存断点（breakpoint）、20 个块的回看窗口、最小可缓存 token 数（多数模型 1024 起）、不同改动对 tools/system/messages 各层的影响等等。</span></p>
<p id="f-doxcnVogaYKWluBVMKO7a0u91qe"><span>日常使用</span><span style="font-weight:bold">记住别动前缀这一条就够了</span><span>；想深入了解的，可以看 Anthropic 官方文档：</span><span><span><a href="https://platform.claude.com/docs/en/docs/build-with-claude/prompt-caching"><span>https://platform.claude.com/docs/en/docs/build-with-claude/prompt-caching</span></a></span></span></p></blockquote>

<a id="f-doxcnhnQJN5D0NZcDQO9MEJyWBg"></a>

##### 最佳实践

<p id="f-doxcnu5AeGPPgO2WMlgSxgvsdzb"><span>理解了计费和缓存，就能推出该怎么做了。分两类：</span><span style="font-weight:bold">免费无副作用的习惯</span><span>（顺应缓存）和</span><span style="font-weight:bold">主动削减投喂的工具</span><span>（各有取舍）。下面每一类都给出</span><span style="font-weight:bold">市面主流、开源免费</span><span>的成熟替代品（均为公开 GitHub 项目，不依赖任何付费社区）。</span></p>

<a id="f-doxcn8ZRksuJv1K8zUXkI7iICDh"></a>

###### 先养成三个免费习惯（顺应缓存）

<div style="margin-left:25px"><div id="f-doxcnmmuurYuWSj2XhN8TgiRdfg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">a.</span><div><span style="font-weight:bold">别停太久</span><span>——超 1 小时缓存就凉，别把庞大旧历史拖回来重造，因为反正你过去的缓存都已经无效了，干脆我彻底整理一波，让上下文处于最有效的状态。这里有两种做法： 一种是可以使用compact压缩历史，带着更简单的上下文继续。 一种是使用一些skill，比如像Nate（我经常跟着学习的专门做ClaudeCode自动化的博主）提供的</span><span style="font-weight:bold">handoff skill</span><span>，使用这个skill重新开一个新会话，并把前一段会话上下文整理打包过来，本质是使用Harness技巧总结好一次会话的精髓，使用新的上下文来延续上一次会话。</span></div></div><div id="f-doxcnMmQcDL8aYLaPH8R73nQbie" style="display:flex;gap:0.5em"><span style="min-width:1.5em">b.</span><div><span style="font-weight:bold">切任务就 </span><span style="font-weight:bold"><span><span>/clear</span></span></span><span>——旧任务的长历史对新任务无用，却每轮重复计费。</span></div></div><div id="f-doxcntSYZ12Trnvdk6psybqNuGb" style="display:flex;gap:0.5em"><span style="min-width:1.5em">c.</span><div><span style="font-weight:bold">切模型别中途切</span><span>——切模型这件事会破坏缓存，要用的模型就一开始定好，避免打破缓存。</span></div></div></div>

<blockquote id="f-doxcnZ2hkf36AWsLjekRTljkmjh"><p id="f-doxcnWBN58BwsUsQKsi35kARSke"><span>这套原理对省 token 的意义：你花的每一分钱，要么是复用已缓存的（便宜 read），要么是被迫重造（昂贵 create）。上面三个习惯，本质都是</span><span style="font-weight:bold">别让缓存无谓地失效</span><span>。</span></p>
</blockquote>

<a id="f-doxcnEFgOj2CAEg5KRHDr2n76cd"></a>

###### 先诊断：不知道浪费在哪就没法省

<p id="f-doxcnS3cgj5yc9cGPHgFDFNy2Jb"><span style="font-weight:bold">原理</span><span>：每次开会话，CLAUDE.md、skills、MCP、slash 命令、hooks 都会被加载进上下文，凭空吃掉 token（大头常是 skills 和 MCP）。得先量出来花在哪，才能对症下药。</span></p>

<div style="margin-left:25px"><div id="f-doxcnwAjx1oNEp5esr0vhb4ABQb" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span><span style="font-weight:bold"><a href="https://github.com/ryoppippi/ccusage"><span>ccusage</span></a></span></span><span> 读本地会话日志，生成每日/每周/每会话的 token 与花费报告。</span><span><span><span>npx ccusage</span></span></span><span> 即用，</span><span style="font-weight:bold">还同时支持 Codex、Gemini CLI</span><span>。</span></div></div><div id="f-doxcnEh2bpLH30NEh2jg6dXMpm3"><img alt="" decoding="async" height="213" loading="lazy" src="/images/agent-learning/dc102c5f20fac8b63db3b24f.png" width="360"/></div><div id="f-doxcnU3RomdpWNQPirz3nhT0KXf" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span><span style="font-weight:bold"><a href="https://github.com/Maciek-roboblog/Claude-Code-Usage-Monitor"><span>Claude-Code-Usage-Monitor</span></a></span></span><span> 实时终端面板，带用量预测和告警，适合盯着别超额度。</span></div></div><div id="f-doxcn9SJXlxMaFyzrjQh9So0RJ8" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold"><span><span>/context</span></span></span><span style="font-weight:bold">（内置免费）</span><span>：不装任何东西，直接看当前上下文构成，最轻量的自查方式，因为通常工具自带的查花费的手段，不是那么清晰，所以才会有专门的这些工具更细致地统计。</span></div></div></div>

<a id="f-doxcntQHiU4IiUJoq1fnzgBzRDf"></a>

###### 削减输入 token

<p id="f-doxcnKkeLPp0yqqbuZ03hafT9Uc"><span style="font-weight:bold">原理</span><span>：默认情况下 Claude 靠 grep + 逐块读文件来定位相关代码，这个摸索过程很费 token。给它更好的检索方式或现成的项目地图，就能少读很多无关文件。这个你看了本节中Harness讲解检索的章节就很容易理解，本质上就是修改工具的检索方法。不同的检索方法特点不同，CC使用的是更通用的方法，如果想要更省钱，可以建立索引。</span></p>

<div style="margin-left:25px"><div id="f-doxcnhSdJZio7l3LefY766eMQCV" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span><span style="font-weight:bold"><a href="https://github.com/oraios/serena"><span>Serena</span></a></span></span><span> 开源 MCP 工具包，提供符号级的</span><span style="font-weight:bold">语义代码检索/编辑/重构</span><span>能力，支持 40+ 语言。相当于代码索引图谱的主流替代：让 Claude 按符号精准定位，而不是大段读文件。</span></div></div><div id="f-doxcn9NQblWCwNHIfQsM35dq3ph" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span><span style="font-weight:bold"><a href="https://github.com/isaacphi/mcp-language-server"><span>mcp-language-server</span></a></span></span><span> 把语言服务器（LSP）能力接给 AI，支持查定义、找引用、看诊断。更轻量的语义导航方案。</span></div></div><div id="f-doxcnPfDsyREhgF94LQsPt5GtHe" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">写好项目文档（免费、最易做）</span><span>：在 CLAUDE.md 或分目录的说明文件里，把每块代码干嘛、有哪些约定和坑写清楚。</span><span style="font-weight:bold">为什么省</span><span>：Claude 不用每次重新摸索项目结构——这就是 Intent Layer 的核心思想，其实手写一份就能实现，不必装工具。</span></div></div></div>

<a id="f-doxcnVC2MwhPKfntcpyy2eHQUSc"></a>

###### 削减输出 token

<p id="f-doxcn952uzKat2TvAzah7zT2EHe"><span style="font-weight:bold">原理</span><span>：模型爱写铺垫、叙述、总结，这些最费输出 token，而多轮对话里会不断累积。让它说话简洁即可。</span></p>

<ul><li id="f-doxcnQosRJGMZzZfNDXLuBbIqif"><span style="font-weight:bold">不必装工具</span><span>：网上有个流行的 </span><span><span style="font-weight:bold"><a href="https://github.com/JuliusBrussee/caveman"><span>Caveman skill</span></a></span></span><span>（「原始人 skill」，slogan 是「why use many token when few token do trick」），思路就是逼 Claude 像原始人一样用最少的字说话、砍掉一切废话，官方称能省下约 65% 的输出 token。但它本质上不神秘——</span><span style="font-weight:bold">你自己在 CLAUDE.md 里写一句约束就能实现同样效果</span><span>，例如「回答简洁直接，省略铺垫和客套，保留必要的技术细节」。代价也一样：说太少时复杂任务可能降质，需要详解时临时放开即可。</span></li></ul>

<a id="f-doxcnVOHAUVaQsGoMuaddtU0pcg"></a>

###### 会话与文档管理

<ul><li id="f-doxcnVe44ajwo7PHZfq1hwo6eSX"><span style="font-weight:bold">交接会话</span><span>：可以使用 </span><span><span><span>Handoff Skill</span></span></span><span>，让 Claude 总结当前会话中做了什么、下一步做什么，再开启新会话继续。也可以让 Claude 手动总结后执行 </span><span><span><span>/clear</span></span></span><span>，或者使用内置的 </span><span><span><span>/compact</span></span></span><span>。</span><span style="font-weight:bold">为什么省</span><span>：不必拖着长上下文每轮重复计费。</span></li></ul>

<ul><li id="f-doxcnA9ryDjXSDvkQgBvVdlwr8g"><span style="font-weight:bold">写好 CLAUDE.md（免费）</span><span>：保持 &lt;300 行，</span><span style="font-weight:bold">只写模型猜不到的</span><span>（项目意图、非显而易见的版本/工具约束、偏离常规的架构、踩过的坑）。</span><span style="font-weight:bold">为什么省</span><span>：短而精的文档既减少每次加载的 token，又避免模型自作主张走弯路。旧式命名规范那类是浪费。</span></li></ul>

<ul><li id="f-doxcn4TQaO52B60Myb7UrU2xdUh"><span style="font-weight:bold">切模型</span><span>：简单/重复任务用更便宜的小模型。</span><span style="font-weight:bold">为什么省</span><span>：小模型单价低。但记得——要用就一开始选定，别中途切（否则打破缓存）。</span></li></ul>

<blockquote id="f-doxcnETeFkMa5qzhrJqoMu6dGJe"><p id="f-doxcnHyTCbjhMhI8VqTltHPcElm"><span> ❗ 这些方法对其他工具（如 Codex）适用吗？</span></p>
<ul><li id="f-doxcnMOXD5W9h73uuZ7GCN2ii4g"><span style="font-weight:bold">原理层</span><span>：思维通用（前缀缓存、动了靠前的就全废、稳定内容放前面），但</span><span style="font-weight:bold">数字不通用</span><span>——Codex（OpenAI）的 TTL 更短且不可控，缓存折扣更小（约省 50% 而非 90%），命令也全不同。</span></li></ul>
<ul><li id="f-doxcnWAG6OJXVXZKsz9zzOVyCPg"><span style="font-weight:bold">工具层</span><span>：</span><span style="font-weight:bold">大多跨工具通用</span><span>。语义检索（Serena 等）、用量统计（ccusage 直接支持 Codex）、写好项目文档，本质是处理文件/上下文/用量，和用哪个模型无关。</span></li></ul>
<p id="f-doxcnl9tCuUW5kSr3sCGnP76zjb"><span style="font-weight:bold">一句话</span><span>：原理层照搬思维、本地化数字；工具层大多能直接迁移。</span></p></blockquote>

<a id="f-doxcn4MoHhvwmms0WBeCJvOivgW"></a>

###### 工具速查

<div style="margin-left:25px"><div id="f-doxcny15PBVW60IDKmEMq5l7Kaf" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">查 token 用量/花费（支持 Codex、Gemini）</span><span> → </span><span><span><a href="https://github.com/ryoppippi/ccusage"><span>ccusage</span></a></span></span></div></div><div id="f-doxcnSNAXaWTdmyJA6jhYKDGfW4" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">实时用量监控 + 告警</span><span> → </span><span><span><a href="https://github.com/Maciek-roboblog/Claude-Code-Usage-Monitor"><span>Claude-Code-Usage-Monitor</span></a></span></span></div></div><div id="f-doxcn2mh5eieuBVyihLHy2T4NBb" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">语义检索代码（代替代码图谱）</span><span> → </span><span><span><a href="https://github.com/oraios/serena"><span>Serena</span></a></span></span></div></div><div id="f-doxcnkWU92pIQsDBlRKq74hgiAe" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">轻量语义导航（查定义/引用）</span><span> → </span><span><span><a href="https://github.com/isaacphi/mcp-language-server"><span>mcp-language-server</span></a></span></span></div></div><div id="f-doxcn0qdm9GNwAvsNsUvPJNrVad" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">整理上下文并交接新会话</span><span> → </span><span><span><span>Handoff Skill</span></span></span></div></div><div id="f-doxcnbKpwquSmdmeS84uQOe8LVh" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">看当前上下文构成</span><span> → </span><span><span><span>/context</span></span></span><span>（内置，无需安装）</span></div></div></div>

<blockquote id="f-doxcnZb9XxYFHQu5lHQr70Tukeb"><p id="f-doxcnN0dF5g29ZbOkUVEVIqhMPc"><span>说明：Caveman（少说话）、Handoff（交接会话）、Intent Layer（补文档）等技巧，其实</span><span style="font-weight:bold">用一句 CLAUDE.md 提示词或内置命令就能实现同样效果</span><span>，不必额外装工具。压缩终端输出（RTK）较小众，可按需自行搜索，或用让 Claude 别读大段日志的提示约束替代。</span></p></blockquote>

<p id="f-doxcnswAdV6MZaa981f7gjZ2L6k"><span style="font-weight:bold">最佳实践核心两句话</span><span>：① 别为用不上的旧上下文反复付费（顺应缓存）；② 别喂给模型它不需要的东西（工具削减）。</span></p>

<a id="f-doxcnGV7xnf2EmRqWEBt8mxqeXd"></a>

##### 相关面试问题

<ol start="1"><li id="f-doxcnk8h8X8XzXQlc3FmEk1SD4e"><span style="font-weight:bold">你有没有使用 Vibecoding 工具（如 Claude Code）的心得，能介绍一下吗？</span></li></ol>

<p id="f-doxcnHHp5ieMsG3zt53bH12sDjc"><span style="font-weight:bold">答题思路：</span><span> 这个问题可以从很多角度回答。这里主要从节省 Token 的角度，按照计费模型、缓存原理、最佳实践三个层次展开，体现自己不只是会使用工具，也理解它背后的成本结构。</span></p>

<p id="f-doxcndlKaJWj6p9sjSp8vzcIWjd"><span style="font-weight:bold">参考答案：</span></p>

<p id="f-doxcn3BrKcWIJmliodVfkTc4oCh"><span>我在使用 Claude Code 这类 Vibecoding 工具时，一个比较重要的心得是，要主动管理上下文，而不是把所有内容都交给 AI 自己处理。因为模型每一轮都需要读取上下文，而且输入、输出、缓存写入和缓存读取的价格并不相同。如果完全不管理上下文，不仅会浪费 Token，也容易让模型被无关信息干扰。</span></p>

<p id="f-doxcn9thx9Ux5ggrghJMEbUcOeh"><span>具体来说，可以把项目中长期有效、但模型无法自己推断的信息写进 CLAUDE.md，比如项目架构、特殊约定和踩过的坑，同时尽量保持这个文件精简。处理同一个任务时，我会保持模型和前面的固定内容稳定，提高提示词缓存的命中率；如果切换到完全不同的任务，我会使用 </span><span><span><span>/clear</span></span></span><span> 清理无关历史，而不是一直带着旧上下文。</span></p>

<p id="f-doxcng6TVK5lbCK5TtsQRwqorGy"><span>另外，我会使用语义代码检索工具，减少 AI 读取无关文件的过程，也会明确要求它回答简洁，减少没有价值的铺垫和总结。可以认为，使用这类工具的关键不只是提示词写得长，而是给模型准确、必要的上下文，并且持续控制上下文的质量。这样既能节省 Token，也能提高回答的准确性和开发效率。</span></p>

<ol start="2"><li id="f-doxcnPNuVfvLXagwCdQawbSob4H"><span style="font-weight:bold">编写提示词的最佳策略是什么？（源自夸克千问二面）</span></li></ol>

<p id="f-doxcndyMQ8mPTF69LPme3LO4nfb"><span style="font-weight:bold">答题思路：</span><span> 先说明提示词要包含清晰的目标、必要背景和输出要求，再从缓存角度说明要把稳定内容放在前面，把变化内容放在后面。还可以补充 CLAUDE.md 要保持精简，只写模型无法推断的信息。</span></p>

<p id="f-doxcn05dXO5ChyXUMo1rkg6AJ3f"><span style="font-weight:bold">参考答案：</span></p>

<p id="f-doxcnXPcagwwNHBXJ0bNAQtsvih"><span>可以认为编写提示词的第一个原则是明确。一个完整的提示词应该说明任务目标、必要的背景信息、限制条件和期望的输出形式。比如，不只是说帮我修改代码，而是要说明需要解决什么问题、哪些行为不能改变、应该修改哪些范围，以及最后是否需要运行测试。这样可以减少模型反复确认或者理解错误的情况。</span></p>

<p id="f-doxcn3qjTvtBUVNlEeKU1WO36kh"><span>第二个原则是只提供必要的上下文。上下文不是越多越好，如果把大量无关代码、日志和历史对话都放进去，既会浪费 Token，也可能降低模型判断的准确性。对于项目中长期不变的约定，我会放进 CLAUDE.md，但会尽量控制在 300 行以内，只记录项目意图、特殊架构、工具限制和常见问题，不重复那些模型通过代码就能看出来的内容。</span></p>

<p id="f-doxcnTrmeFW5o5AEJIqzVfarTVg"><span>第三个原则是考虑提示词缓存。因为缓存采用前缀匹配，所以可以把系统提示、项目规范等稳定内容放在前面，把每一轮都会变化的具体需求放在后面，尽量不修改已经稳定的前缀。另外，我也会明确要求模型回答简洁，保留必要的技术细节，减少客套、重复总结和无意义的输出。</span></p>

<ol start="3"><li id="f-doxcnaOiRJcHY5fBkjajCO7tPFf"><span style="font-weight:bold">你在使用AI工具的时候会用哪些插件吗？可以介绍下吗？（深信服社招一面）</span></li></ol>

<p id="f-doxcnaUC0dOvOTJM1L2P597Rsce"><span style="font-weight:bold">答题思路：</span><span> 挑选本节介绍的几个代表性工具，分别从用量统计、代码检索和会话管理三个方面回答。重点不是罗列工具名称，而是说明使用场景、解决的问题和带来的收益。</span></p>

<p id="f-doxcnJUNyxoKR2v9lbPKzODm9af"><span style="font-weight:bold">参考答案：</span></p>

<p id="f-doxcnsPRaZibvTx5uzBJOTXvtzg"><span>可以根据不同的使用场景选择工具，而不是安装很多功能重复的插件。第一类是用量统计工具，比如 </span><span style="font-weight:bold">ccusage</span><span>。它可以读取本地会话日志，按天、按周或者按会话统计 Token 用量和费用。可以用它判断消耗主要来自输入、缓存还是输出，再决定应该优化哪个部分。</span></p>

<p id="f-doxcn7Ow4Cd3hVYEIN0mMTRES0b"><span>第二类是代码检索工具，比如 Serena。它可以提供符号级的语义检索能力，让 AI 按照类、方法和引用关系定位代码，而不是通过 grep 不断搜索，再大段读取文件。对于比较大的项目，这种方式可以减少很多无关上下文，也能提高定位问题的效率。如果只需要查定义和引用，也可以使用 mcp-language-server 这类更轻量的工具。</span></p>

<p id="f-doxcnMTBzK9w9AWJhTP7ATr407d"><span>第三类是会话管理工具，比如 Handoff Skill。当一个会话已经很长，或者缓存已经失效时，可以让它总结已经完成的工作、关键决策、修改过的文件和下一步计划，再把这些必要信息交接到新会话。我的原则不是工具越多越好，而是每个工具都应该解决一个明确的问题，减少无效上下文和重复工作。</span></p>

<ol start="4"><li id="f-doxcnolBmgbSzQsrtDJVpkD71gf"><span style="font-weight:bold">可以介绍一下ClaudeCode 的提示词缓存的功能吗？</span></li></ol>

<p id="f-doxcnN58xzOCU4pzz3hMXZRLG6e"><span style="font-weight:bold">答题思路：</span><span> 先说明缓存解决的问题，再解释缓存写入、缓存读取和前缀匹配机制，最后介绍常见的缓存失效原因以及实际使用中的注意事项。</span></p>

<p id="f-doxcnEAEvQqNQywpF6DoA8XEAIe"><span style="font-weight:bold">参考答案：</span></p>

<p id="f-doxcn8hdrhnmN4cpptf8BWL259e"><span style="font-weight:bold">Claude Code 的提示词缓存</span><span>，主要用于复用多轮对话中重复出现的上下文。模型每一轮并不是只读取用户新发送的那句话，而是需要读取系统提示、工具定义、项目文档和之前的对话历史。如果这些内容每次都按照新的输入重新处理，成本会比较高，所以 Claude 会把其中稳定的内容缓存起来。</span></p>

<p id="f-doxcncOpfNs81F1IpCb4FMMDgTe"><span>一段内容第一次出现时，会进行缓存写入。后续请求中，如果前面的内容没有发生变化，就可以直接进行缓存读取，只处理本轮新增加的消息。缓存读取的单价大约只有基础输入的十分之一，因此在长会话中，只要缓存能够持续命中，就可以明显降低 Token 成本。</span></p>

<p id="f-doxcnnkFCFIvpBI4XON83qN60Ig"><span>它的核心机制是前缀匹配，也就是从上下文的最前面开始判断内容是否一致。系统提示和项目上下文通常在前面，历史对话和新消息依次追加在后面。如果修改了靠前的系统提示、中途切换模型、执行了会重写上下文的操作，或者缓存超过有效时间，就可能导致前缀无法匹配，后面的内容也需要重新处理。</span></p>

<p id="f-doxcnWhJd4qSiRyV5VtHO4rX0ie"><span>所以在实际使用中，我会尽量保持系统提示、工具配置和项目说明稳定，把每轮变化的需求追加在后面，也会避免在同一个任务进行到一半时切换模型。这样可以让更多内容命中缓存，减少重复计算和费用。</span></p>


<a id="section-0112"></a>
## 参考资源

<a id="f-doxcn4GD90I2A70DoazcibfBIaf"></a>

<p id="f-doxcn4Uh8S8Vipj7GfMabP0PCec"><span>参考视频</span></p>

<p id="f-doxcn2mGgu1GpzWrEQv5N1B16Ij"><span>以下四个视频是本文档内容的主要来源，按推荐观看顺序排列：</span></p>

<p id="f-doxcnxQIUDGQa2PinT3IYkvtGHb"><span style="font-weight:bold">视频一：从0到1全攻略</span></p>

<p id="f-doxcnsnofYbii7y89WjEVZVYuNe"><span>标题：Claude Code 从 0 到 1 全攻略 —— MCP / SubAgent / Agent Skill / Hook / 图片 / 上下文处理/ 后台任务 / 权限 链接：</span><span><span><a href="https://www.youtube.com/watch?v=AT4b9kLtQCQ"><span>https://www.youtube.com/watch?v=AT4b9kLtQCQ</span></a></span></span></p>

<p id="f-doxcnrbn26cbCiYfGHtcwASo0Af"><span>适合：完全零基础，想系统掌握 Claude Code 所有主要功能的人。</span></p>

<p id="f-doxcnbga2W1fTIzGCADrZz5A1Nc"><span>涵盖安装、三种模式、Plan Mode、回滚、图片输入、MCP、Context 管理、CLAUDE.md、Hook、Skill、SubAgent、Plugin 全套内容。</span></p>

<p id="f-doxcnAdrNnBUR8000ywT5LllUQd"><span style="font-weight:bold">视频二：36 分钟掌握 95%</span></p>

<p id="f-doxcnaW7xu8GzgZ78UPx3kXWoEc"><span>标题：Master 95% of Claude Code in 36 Minutes (as a beginner) 链接：</span><span><span><a href="https://www.youtube.com/watch?v=saggDHHnmtQ"><span>https://www.youtube.com/watch?v=saggDHHnmtQ</span></a></span></span></p>

<p id="f-doxcnhli8izKesmgXsCCYRvls0f"><span>适合：想了解如何用 Claude Code 构建完整自动化工作流（从规划到部署）的人。介绍了 WAT 框架（Workflows-Agent-Tools），以及一个完整的 YouTube 数据分析自动化案例，包含 MCP、Skill、安全审查、Modal 云端部署全流程。</span></p>

<p id="f-doxcnQFBvlqP0ioO113UW4WjOfg"><span style="font-weight:bold">视频三：12个必知特性</span></p>

<p id="f-doxcnOuuvZygcKoOCm9yPMlbHhb"><span>标题：12 Claude Code Features Every Engineer Should Know: Subagents, CLAUDE.MD, Checkpoints, MCP and more 链接：</span><span><span><a href="https://www.youtube.com/watch?v=E4fzxVMOav4"><span>https://www.youtube.com/watch?v=E4fzxVMOav4</span></a></span></span></p>

<p id="f-doxcn6C9Z6EFt8OWehCecRoMP6d"><span>适合：需要快速建立 Claude Code 核心功能框架的人。约 7 分钟，用极简的方式讲清了 CLAUDE.md、权限、Plan Mode、Checkpoints、Skills、Hooks、MCP、Plugins、上下文管理、斜杠命令、SubAgents 共 12 个核心特性。</span></p>

<p id="f-doxcnA1qlF8SmbO8LIMtCTBrYzc"><span style="font-weight:bold">视频四：insights 功能深度解析</span></p>

<p id="f-doxcn5CRTmdF2EXWLXaRxFVp7sb"><span>标题：Claude Code Course 15 - /insights report</span></p>

<p id="f-doxcnxSqEcey1cn5FgyzLEZyU1e"><span>链接：</span><span><span><a href="https://www.youtube.com/watch?v=BhWOpPD43R4"><span>https://www.youtube.com/watch?v=BhWOpPD43R4</span></a></span></span></p>

<p id="f-doxcn6cR602ZoQ0qzqTdU48UZIh"><span>适合：已有一定 Claude Code 使用经验，希望了解如何利用数据改进自己工作流的人。介绍了 </span><span><span><span>/insights</span></span></span><span> 命令的使用方式和报告内容，以及如何用 AI 工具进一步提炼行动建议。</span></p>

<p id="f-doxcntHzU5V6yDQnX4RGxa8nnpb"><span style="font-weight:bold">视频五：ClaudeCode 最全视频</span></p>

<p id="f-doxcnc2wxeYzXN1oHWZzLej5KJc"><span>这个真的是一个非常全面的ClaudeCode讲解，作者是Nate老师，是可以认为非常棒的老师。这个课程有10个小时，适合0 ClaudeCode基础的同学。从0基础 带你讲解ClaudeCode如何使用，通过几个实战例子讲解ClaudeCode如何编排自动化，部署，到最后如何变现。我真的惊叹这个课程竟然不是收费。</span></p>

<p id="f-doxcnzukG2La3llwuA9ZdE8B6eg"><span>我非常相信这个老师对于Claude Code使用的技巧一定是行业领先的，视频里面讲解的内容也是全面。我相信他说的，你消化好这个视频，可以从ClaudeCode 0基础到精通使用ClaudeCode到可以变现。</span></p>

<p id="f-doxcnViruo32dlEZPpVZ0dg33mf"><span>所以这个视频真的非常适合想要熟练运用，深入掌握ClaudeCode 高阶技巧的同学。</span></p>

<p id="f-doxcnvEjZLvcKDv8UKiuyFvn20g"><span>标题：Build &amp; Sell with Claude Code (10+ Hour Course)</span></p>

<p id="f-doxcn5Vrk511RxZ77Qwt3j7Yc3c"><span>链接：</span><span><span><a href="https://www.youtube.com/watch?v=mpALXah_PBg"><span>https://www.youtube.com/watch?v=mpALXah_PBg</span></a></span></span></p>

<p id="f-doxcnKdgiDfYNjUdZm7sdlvNpqX"><span>相关项目</span></p>

<p id="f-doxcnBhH7z65iFuRvavhMMcbMNf"><span style="font-weight:bold">everything-claude-code 项目</span><span>（本文档最佳实践的主要来源）</span></p>

<p id="f-doxcnZdXe9YOTx4nownL137Peib"><span>GitHub：</span><span><span><a href="https://github.com/affaan-m/everything-claude-code"><span>https://github.com/affaan-m/everything-claude-code</span></a></span></span></p>

<p id="f-doxcnnKH1zKDBBlrEAc8WcqHC5U"><span>包含三份深度指南：</span></p>

<ul><li id="f-doxcnqYnGycLgvcGtcPHXCfA1Od"><span><span><span>the-shortform-guide.md</span></span></span><span>：基础架构搭建（Skills、Hooks、SubAgents、MCP、Plugins 配置）</span></li></ul>

<ul><li id="f-doxcnZ9eERaELCoab678lYqYXdc"><span><span><span>the-longform-guide.md</span></span></span><span>：高级技术（Token 优化、记忆持久化、Eval 验证、并行化策略）</span></li></ul>

<ul><li id="f-doxcnhkgmWE9gEufrEQ2xwPa58f"><span><span><span>the-security-guide.md</span></span></span><span>：Agent 安全（攻击面、沙箱、输入净化、CVE 案例）</span></li></ul>

<p id="f-doxcnQeHQuKHZ6uv9uZ5F9nssuh"><span>同时包含 30+ 个可直接使用的现成配置文件：Agent（代码审查、构建修复、安全审查等）、Commands（TDD、E2E、多后端编排）、Hooks（记忆持久化、格式化）、Skills（各语言最佳实践）。</span></p>

<p id="f-doxcnrwYDg4Q3sc1wKat6wPh7Db"><span>《解码Agent Harness》 -- ClaudeCode 架构深度解析。这个是专门解析ClaudeCode源代码的，网上也开源。可以在线阅读：</span></p>

<p id="f-doxcnfqUWgPGfVXfn63mCDtkVOc"><span><span><a href="https://lintsinghua.github.io/"><span>https://lintsinghua.github.io/</span></a></span></span></p>


<a id="section-0113"></a>
## Vibe Coding

<a id="f-doxcnRHKJVjm3BrPT56WDbifxpd"></a>

<p id="f-doxcnIU8tSVVtJiNWBkSBjLM4og"><span>Vibe Coding 已经是现在绕不开的趋势了。虽然本节归在了其它问题，但是我强调的本节其实也非常重要。</span></p>

<p id="f-doxcnMLL33vCsxDMZr9adZFi9Ee"><span style="font-weight:bold">面试的角度它很重要</span><span>：可以看到网龙面试环节问Vibe Coding的经验，我也遇到很多面试官会问你最喜欢使用哪个Vibecoding的 工具等，其实这些都是企业对于你的考察，因为在新的时代的来临，程序员的编程方式一定会发生变化，如何高效vibe code, 聪明使用AI工具一定是企业看中的，因此虽然他不是一个硬核知识考点，但绝对也是面试中热门的话题，这个问题答得好，一定是一个加分点。</span></p>

<p id="f-doxcn57oHtijZYKYY5CryMU4dgh"><span style="font-weight:bold">个人成长的角度上：</span><span>它也太重要了。现在谁不vibe coding呢？谁不会聊两句你是如何使用AI工具编程的呢？学会高效使用VibeCoding对个人成长必不可少。</span></p>

<p id="f-doxcndMgkOVeh5zchuJErAVKJme"><span>所以本节内容其实很重要，而且这个内容甚至适合于任何人，你甚至可以是产品经理或者没有任何开发背景的人，因为VibeCoding极大降低了编程门槛。</span></p>

<p id="f-doxcnNX2qXB1wYjBDTADbKfrnmh"><span>本节会推荐5个Vibe Coding的视频，同时根据视频也整理成了文字精髓放在这个小节。看完本节，你会学习到Vibe Coding的推荐方法，行业发展/Vibe Coding的趋势。 相信本节内容也会给你带来灵感。</span></p>


<a id="section-0114"></a>
## 核心技巧

<a id="f-doxcn0VjItJu6qAsZCXoqlpiOHm"></a>

<p id="f-doxcnkuLBFq77AzJk09EXLMDK0c"><span>Vibe Coding的有5大核心基础：</span><span style="font-weight:bold">思考，架构，节点，调试，上下文。</span></p>

<div style="margin-left:25px"><h4 id="f-doxcnPE6ZLqTIUHqdaRQP0dShyg"><span>2.1.1 思考细致</span></h4></div>

<p id="f-doxcnkxdu2d4WWLznez00Tu1Ztg"><span>在使用AI工具前，你需要仔细思考你到底想要什么。如果你自己都没想明白，你怎么能期望AI能够写明白？在我们vibe coding的时候都使用的自然语言，很容易没有想清楚我们到底想要一个什么样的产品，其实这个阶段是我们很好的仔细思考，提升自我的机会。必须仔细想清楚，想实现的目标是什么，它应该怎么实现，需要哪些条件和能力，他要遵循什么样的规则，它的流程是什么。 将问题想清楚，再以自然语言的形式描述给AI。</span></p>

<div style="margin-left:25px"><h4 id="f-doxcncmFwhSHb5gfjsh09vy5RVc"><span>2.1.2 明确架构</span></h4></div>

<p id="f-doxcnAtyGOo0H3uRt2Fpnm4v7Fh"><span>      我们使用VibeCoding的时候，几乎一定有现成的架构或者类似的任务的。我们需要让AI遵循指定的架构，或者使用指定库，这样效果一定会比让他从头完成更好。我们需要给AI指明一个方向。比如，对于一个浏览器应用，你可以明确它使用React前端，CSS和HTML JavaScript前端。</span></p>

<p id="f-doxcnMytPa9PjMdCnv6SwbrClqe"><span>（如果你不知道采用哪种架构，没关系，可以先让AI给你提供一些可能的方向，然后以学习的心态去学习，确定好对应的架构，可以在vibecoding的时候同时进行学习）</span></p>

<a id="f-doxcnVMzC8YwESP5wg9RfxHzBKc"></a>

##### 做好版本控制

<p id="f-doxcnTkdtslecSEZD7yeWefTK10"><span>系统可能崩溃，所以始终做好版本控制和节点管理。</span></p>

<a id="f-doxcnpzSHzQFhxh2hko3Jn43sEh"></a>

##### 调试

<p id="f-doxcnkj0U3tt7U9x3kL8ak6cOvb"><span>通常在Vibe Coding中，最快修复问题的方式是指出问题，让AI自己修复。但有时可能会遇到一些问题，AI并不能很轻易地解决，这时就需要我们对系统问题有一个更深入的理解，缩小范围，推测可能的原因帮助AI解决问题。</span></p>

<a id="f-doxcnGPd3budTpK6W9bRwI0KSyd"></a>

##### 提供上下文

<p id="f-doxcnDhWvL6RSbF6Naw8W3C8Ykf"><span>你提供更多的细节，信息，上下文，你的AI的输出就会越好。这些信息包括，具体的产品文档，你的环境，你的倾向，示例，或者是更加精心打磨的上下文，这些都能够帮助AI取得更好的效果。</span></p>


<a id="section-0115"></a>
## 建议

<a id="f-doxcnw77MayOcWJjYiQJptpsISg"></a>

<ol start="1"><li id="f-doxcnLVMqip49L2bRR0GjMktrBf"><span>总是先完成一个最小可以运行的产品，然后再迭代，增加更多的feature.</span></li></ol>

<ol start="2"><li id="f-doxcn3g5YBoFp1xBjUXthXA9nhg"><span>在你使用AI coding的时候，一般只有两种模式，你要么是在添加新feature，要么是在调试错误。添加新feature时，记住提供更多的信息，明确架构，给出有明确细节的参考文档，增量修改，做好版本管理和控制。当你在调试的时候，记住弄清楚系统是怎么运行的（如果不清楚，就问AI），给出尽可能多的信息，想想如何能让AI解决这个BUG。</span></li></ol>

<ol start="3"><li id="f-doxcnLchz0PwNg9bcGUSfS4iy8d"><span>给出全局的约束。这个有点像将要求放在系统提示词中，让AI Coding的时候总是遵循某个规则，比如尽量少的改动代码，以xx的规范来完成。</span></li></ol>


<a id="section-0116"></a>
## 不同Vibe Coding工具对比

<a id="f-doxcn5zBccY95OuGtmJolIRHyHb"></a>

<div id="f-doxcnVEz4QiK4dMs7TAk7czZ4zc"><img alt="" decoding="async" height="590" loading="lazy" src="/images/agent-learning/65e2dd45db6271430a77d870.png" width="1280"/></div>

<div id="f-doxcn8PCLBkgcqwDoZIzShEyEdb"><img alt="" decoding="async" height="481" loading="lazy" src="/images/agent-learning/09c871328a64e1f31cab2de8.png" width="1280"/></div>


<a id="section-0117"></a>
## 参数视频

<a id="f-doxcnwc8ptTGLQnz1AXXYEvpH7f"></a>

<p id="f-doxcnlCMJe3Z7AoblywCSwswxrc"><span>不好意思，这一小节推荐的视频都是英文的，确实找到的一些很好的教程都是英文的。如果英语差，视频下方可以点CC把字幕打开，另外很多AI工具比如Github copilot中，可以把视频链接丢进去给它总结，另外我自己本节的内容，也是对这些视频的内容做了一个总结。</span></p>

<p id="f-doxcnpRwSlfBWVxIoWIJ3g4HEMf"><span style="font-weight:bold">Tina Huang老师</span></p>

<p id="f-doxcnJGD95C8Atgd6ilrZF0T1we"><span>是一个很知名的老师了，之前也推荐了很多她的视频。她的这个视频总结了vibe coding的5大核心技巧：思考，架构，节点，调试，上下文，并给出了一些建议，视频中展示了她如何vibe coding的一个实战。对应笔记5.1和5.2</span></p>

<p id="f-doxcn1BWhTGSgxj6nE5ifK5f8Ph"><span><span><a href="https://www.youtube.com/watch?v=iLCDSY2XX7E"><span>https://www.youtube.com/watch?v=iLCDSY2XX7E</span></a></span></span></p>

<p id="f-doxcnigsz2Dtyni0IkEaWFX5Uke"><span>对比了2026年不同的vibe coding工具，主要是用的一些国外的工具：Windsurf, Bolt, Cursor,Rork,Claude Code, Cursor 等，了解这个是因为其实我们需要对不同的工具特点有一些了解和对比，思考。这也能反映我们在聪明的使用AI工具。这个问题其实在面试中也涉及过几次了。这个视频像一个茶话会，就是以夯到拉的形式给AI Coding工具打分，</span><span style="font-weight:bold">大致有个印象就行了</span><span>。可以</span><span style="font-weight:bold">大概看一下</span><span>5.3 或者视频，避免面试过程中面试官问你用过哪些Vibe coding但是你啥也没用过，只能说出一个的情况就好了。</span></p>

<p id="f-doxcn9sAUwIh4MW2pcDkUh0TQof"><span><span><a href="https://www.youtube.com/watch?v=ud0bv2J3xWY"><span>https://www.youtube.com/watch?v=ud0bv2J3xWY</span></a></span></span></p>

<p id="f-doxcnlnlHtTDUYCo8KwabslJiFA"><span style="font-weight:bold">Claude Code 的使用：</span></p>

<p id="f-doxcnX77fpc3HTSHWt6wCsTAPac"><span>这个视频是中文的，Claude Code作为最火的AI工具之一，是值得学习和使用的。不过确实CC相比于很多AI工具，是有一定上手门槛的，使用命令操作，并不是很直观。如果想要学习Claude Code, 可以看这个视频，里面讲了如何配置，常见的用法和命令：包括CC使用MCP, Subagent, SKILL, Checkpoint，不同的模式等。</span></p>

<div id="f-doxcnziTUdR4iGGDbIHce21nerS"><div><div><div><div><div><div><div><div><div><a href="https://open.douyin.com/player/video?vid=7599230984264879375&amp;mode=pc">嵌入视频 / 原始播放器</a></div></div></div></div></div></div></div></div></div></div>

<p id="f-doxcnChyHUWyPWKl2HLrgkHprUz"><span style="font-weight:bold">Vibe Coding趋势：</span></p>

<p id="f-doxcnfyoP8eII0B9h4sUOVqDaUW"><span>Y Combinator的演讲，建立Vibe Coding 宏观视角，理解时代趋势和核心竞争力。</span></p>

<p id="f-doxcnyEuyHkT6N9kSvVS7dgSqGd"><span><span><a href="https://www.youtube.com/watch?v=IACHfKmZMr8"><span>https://www.youtube.com/watch?v=IACHfKmZMr8</span></a></span></span></p>

<p id="f-doxcncfHLX48YEcQiBX0uVoHHLg"><span style="font-weight:bold">10分钟去学会Vibe Coding：</span></p>

<p id="f-doxcnT74ej6i6rPREuqeavZpnsf"><span>快速上手实战项目，通过一个10分钟实战项目通过Vibe coding 写出一个例子，并且还讲了如何通过这个变现，适合新手小白。</span></p>

<p id="f-doxcnhQZOe6UlkC98u1s6agKFxf"><span><span><a href="https://www.youtube.com/watch?v=-LFB8D9WV-g"><span>https://www.youtube.com/watch?v=-LFB8D9WV-g</span></a></span></span></p>


<a id="section-2157"></a>
## Vibe Coding 入门教程

<a id="t-block-24942"></a>

<p id="t-TmY2iGpkYDtUrfXgsrMVVa"><span>Vibe Coding（氛围编程）是一种全新的编程范式，我们不需要一行行手写代码，而是用自然语言描述你想要什么，AI 来写代码、我们负责审查和把控方向。</span></p>

<blockquote id="t-ytYQhVa0SyIZZ4asfc1itY"><blockquote id="t-wmB7XoPdGTFETHnKADXPcc"><span style="font-style:italic">Vibe Coding 教程参考：</span><span style="font-style:italic">https://www.runoob.com/vibe-coding/vibe-coding-tutorial.html</span></blockquote></blockquote>


<a id="section-2158"></a>
## 什么是 Vibe Coding

<a id="t-p37v154tR5Jv00sY5KNJBr"></a>

<p id="t-TA7t8F8zjru68d6ZYT1lfy"><span style="font-weight:bold">Vibe Coding</span><span> 一词由前特斯拉 AI 总监、OpenAI 联合创始人 Andrej Karpathy 在 2025 年 2 月首次提出。</span></p>

<p id="t-NxUQmeTunHmflXQh7yCa1N"><span>他用一句话概括了这种全新的编程方式：</span></p>

<blockquote id="t-UT1t4NhjZui0J8FcoEfaAI"><p id="t-OsTZwbZoImm4rL6p1maytU"><span style="font-style:italic">「I just vibe. I don't even touch the keyboard sometimes. I just talk to the AI, it writes the code, I review it, and we iterate.」</span></p></blockquote>

<p id="t-fLcMQDuIzEk5Y3CWLIJrMZ"><span>翻译过来就是：你只管描述你的「感觉」，AI 来写代码，你审查，然后来回迭代。</span></p>

<p id="t-FB1jV5HtV0a1ldbKqPsTAk"><span>简单来说，Vibe Coding 就是：你用人话告诉 AI 你想要什么功能，AI 帮你把代码写出来，不需要纠结语法细节、不需要记忆 API 参数、不需要手动调试每一个错误——这些都由 AI 来处理。</span></p>

<p id="t-p37gSgGSOY9CL4n74Q8aU1"><span>我们的角色从「写代码的人」转变为「描述需求的人」，或者说——从程序员变成了产品经理+架构师。</span></p>

<div id="t-rHWB0qurCGHOMf3ix3gKYo"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/53c569ba32165352be608800.webp"/></div>

<blockquote id="t-SufPWefQkp3R457kiOLcAp"><p id="t-S8h2tX01ds3NJbvrBmddEP"><span style="border-bottom:1px solid;font-style:italic">Vibe Coding 不是让 AI 替代你思考，而是让 AI 处理低价值的重复劳动，让你专注于更有创造性的部分：理解问题、设计架构、验证结果。</span></p></blockquote>


<a id="section-2159"></a>
## Vibe Coding vs 传统编程

<a id="t-nX8gg6efSsJFz299Sr98lT"></a>

<p id="t-PsPtaKu8wvRAo9pNle12dt"><span style="border-bottom:1px solid">理解 Vibe Coding 与传统的编程方式有什么不同，有助于你更好地使用它。</span></p>

<div id="t-IsLMEC2VXhNkZCcrI8Rzn0"><table><colgroup><col width="120"/><col width="203.89752197265625"/><col width="307.00860595703125"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>维度</span></p></td><td style=" vertical-align: top"><p><span>传统编程</span></p></td><td style=" vertical-align: top"><p><span>Vibe Coding</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">输入方式</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">逐行手写代码</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">自然语言描述需求</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">关注点</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">语法、API、实现细节</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">需求、架构、验证</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">调试方式</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">手动断点/日志调试</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">把错误信息丢给 AI，让它修复</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">速度</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">取决于打字速度和熟练度</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">取决于需求描述的清晰程度</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">适用场景</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">所有编程任务</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">原型开发、CRUD、脚本工具、UI 页面</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">核心技能</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">编程语言掌握度</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">需求拆解 + 结果验证能力</span></p></td></tr></tbody></table></div>


<a id="section-2160"></a>
## 为什么现在可以 Vibe Coding

<a id="t-LEZhPVqC5ParDTzqpFbILZ"></a>

<p id="t-Iz4APYMdA0oazY87sTTdTv"><span style="border-bottom:1px solid">Vibe Coding 之所以在 2025 年成为可能，是因为几个关键条件的成熟。</span></p>


<a id="section-2161"></a>
## 大模型编码能力的飞跃

<a id="t-QYeDOiywiqv1Dn3wgSzpp3"></a>

<p id="t-VQ96yd2v36FxkrPIrxNLqk"><span style="border-bottom:1px solid">GPT-5.5、Claude 5、Gemini 等模型在代码生成方面的准确率大幅提升。</span></p>

<p id="t-vfPA6ckU0aGzfZFzEYt2vM"><span style="border-bottom:1px solid">它们不仅能写出语法正确的代码，还能理解项目上下文、遵循最佳实践、处理边界情况。</span></p>

<p id="t-rvwC1cvQkKyn8bdYzs5TI9"><span style="border-bottom:1px solid">更重要的是，它们可以处理超长上下文——一次性阅读整个项目，理解你的代码库结构。</span></p>


<a id="section-2162"></a>
## AI 编程工具的爆发

<a id="t-azRzlGCuquAM9Si7IGGTuf"></a>

<p id="t-zr7JtzYR1pRU8NW9GMuJPu"><span style="border-bottom:1px solid">Cursor、Claude Code、GitHub Copilot、Windsurf 等工具将 AI 能力深度集成到了开发流程中。</span></p>

<p id="t-IX2ybVxkDsQMcjc0jSOKCX"><span style="border-bottom:1px solid">这些工具不仅能补全代码，还能直接修改文件、运行终端命令、搜索代码库——像一个真正的开发者一样工作。</span></p>


<a id="section-2163"></a>
## Agent 模式的出现

<a id="t-sqthpYWiy3JlG2cu3iiwIn"></a>

<p id="t-j2c3zsFufCf0FEVAvMxd79"><span style="border-bottom:1px solid">Agent 模式的工具可以自主执行多步骤任务：读取文件、编写代码、运行测试、根据测试结果修复错误。</span></p>

<p id="t-KNbDgy2bhQLP8B1vdsBzs4"><span style="border-bottom:1px solid">你只需要下达一个初始指令，Agent 会自己循环迭代直到任务完成。</span></p>


<a id="section-2164"></a>
## 主流工具介绍

<a id="t-9eGOgUx30HROQSJiznXdQh"></a>

<p id="t-uA0ZwSfeTMXFThmZNNKDk6"><span style="border-bottom:1px solid">以下是目前最主流的 Vibe Coding 工具，各有侧重。</span></p>

<div id="t-MKVUBz0OosHF6zuWvxz2hK"><table><colgroup><col width="83.89755249023438"/><col width="99.89752197265624"/><col width="267.11279296875"/><col width="167.00341796875"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>工具</span></p></td><td style=" vertical-align: top"><p><span>类型</span></p></td><td style=" vertical-align: top"><p><span>核心特点</span></p></td><td style=" vertical-align: top"><p><span>适合场景</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Qoder</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Agent IDE</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">深度代码库理解、Quest 自动任务、多 Agent、Repo Wiki、CLI/IDE 双模式</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">中大型工程、长期项目维护</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Trae</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">AI 原生 IDE</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">对话驱动开发、自动生成与修改代码</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Vibe Coding、新项目快速搭建</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Cursor</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">AI 编辑器</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">项目级理解、多文件修改、Agent 模式</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">全栈开发、大型项目</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Claude Code</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">CLI Agent</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">在终端中执行复杂任务、自动修改项目</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">后端、自动化开发</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">GitHub Copilot</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">AI 编程助手</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">智能补全、聊天、Agent</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">日常开发辅助</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Windsurf</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">AI 编辑器</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Cascade 工作流、自动多文件修改</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">快速开发、小中型项目</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">OpenAI Codex</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">AI 编程 Agent</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">理解任务并执行完整开发流程</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">自动化开发</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Bolt.new</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">在线 AI 开发平台</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">一句话生成完整应用</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">MVP、原型验证</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">v0 by Vercel</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">UI 生成工具</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">自动生成 React 页面</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">页面设计、组件开发</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Replit AI</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">在线 IDE</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">云开发 + AI 协作</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">教学、快速测试</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Lovable</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">AI 应用生成器</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">从描述直接生成 SaaS</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">创业、产品验证</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Firebase Studio</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">AI 应用平台</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">AI + 后端服务集成</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">App / Web 开发</span></p></td></tr></tbody></table></div>

<blockquote id="t-IlowxBRtT4ccLXTDzS1NN6"><p id="t-2sxzF3Qy2wh1pHIr67Fdee"><span style="border-bottom:1px solid;font-style:italic">如果你是第一次接触 Vibe Coding，可以先使用国内的</span><span style="border-bottom:1px solid;font-style:italic">Qoder</span><span style="border-bottom:1px solid;font-style:italic">或</span><span style="border-bottom:1px solid;font-style:italic">Trae</span><span style="border-bottom:1px solid;font-style:italic">开始，操作类似 VS Code，学习曲线最平缓，且不会改变你熟悉的编辑器环境。</span></p></blockquote>


<a id="section-2165"></a>
## 快速开始

<a id="t-9vVPCAzqmK0MfoRbr23VER"></a>

<p id="t-NXENF3qWBP0NahggtqtLgs"><span style="border-bottom:1px solid">下面以</span><span style="border-bottom:1px solid">Claude Code（终端 CLI）</span><span style="border-bottom:1px solid">为例，展示 Vibe Coding 的典型工作流。</span></p>

<p id="t-lk8S5DnbChgvm4veq00Ecb"><span style="border-bottom:1px solid">Claude Code 完整教程参考：</span><span style="border-bottom:1px solid">https://www.runoob.com/claude-code/claude-code-tutorial.html</span></p>


<a id="section-2166"></a>
## 第一个项目：Hello, Vibe World!

<a id="t-y8v9nFszUr1skhpleNXTjd"></a>

<p id="t-nXKIcDPszjegetsDnUCEKQ"><span style="border-bottom:1px solid;font-weight:bold">目标：</span><span style="border-bottom:1px solid">用 5 分钟，通过纯自然语言，让 Claude Code 帮你创建一个个人名片网页。</span></p>

<p id="t-HLKKmACFQ17acgcU2jvVei"><span style="border-bottom:1px solid;font-weight:bold">第一步：创建项目文件夹</span></p>

<pre id="t-FP9ZbaQZQoANQFhiFFRbaS"><code>mkdir my-card &amp;&amp; cd my-card
claude</code></pre>

<div id="t-0v17oq9cnvDG8OwTGY2Hzm"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/481359c26767d6794f06d035.png"/></div>

<p id="t-m6aGGOFZMmefQOEWcMVkgp"><span style="border-bottom:1px solid;font-weight:bold">第二步：向 Claude 描述你想要的东西</span></p>

<p id="t-rklKzC7N8xVFI3bSsZ8id9"><span style="border-bottom:1px solid">在 Claude Code 的交互界面中，输入：</span></p>

<pre id="t-rq33EpbVPxmxyubbbwhUR8"><code>帮我创建一个个人名片网页，要求：
- 显示我的名字（张三）和职业（前端开发者）
- 有一个简短的个人简介区域
- 列出3个技能标签（React、Python、设计）
- 设计风格：简洁现代，深色背景，有轻微的渐变效果
- 单个 HTML 文件，不需要外部依赖</code></pre>

<p id="t-RPj9mKcRQ8Gj3UvmogKekT"><span style="border-bottom:1px solid;font-weight:bold">第三步：观察 Claude 工作</span></p>

<p id="t-uN3ftdihGG3nKMM1dvSveo"><span style="border-bottom:1px solid">你会看到 Claude Code 自动：</span></p>

<pre id="t-ZuBhuv9oX9mxhvMLzB3mJ4"><code>分析你的需求
创建 index.html 文件
写入完整的 HTML、CSS 和少量 JavaScript</code></pre>

<p id="t-7d1ictV8HHCZhjkMuHFgCC"><span style="border-bottom:1px solid;font-weight:bold">第四步：查看结果</span></p>

<pre id="t-jFH8Yvw74ZcTxnpOBNKjJM"><code>open index.html   # macOS
# 或
xdg-open index.html   # Linux</code></pre>

<p id="t-rF8B9TVnjh11yJG4nQBDrw"><span style="border-bottom:1px solid;font-weight:bold">第五步：迭代修改</span></p>

<p id="t-yuWFBYsRJnt5orTDSg01Dn"><span style="border-bottom:1px solid">如果不满意，继续对话：</span></p>

<pre id="t-gV6vdmAeGib9EKk1pNq2yi"><code>把背景色改成深蓝色渐变，字体换成更现代的 sans-serif，
技能标签加上悬停动画效果</code></pre>

<p id="t-sp5Hb8OImkpah9j8aQ7bYL"><span style="border-bottom:1px solid">Claude Code 会直接修改文件，无需你碰任何代码。</span></p>


<a id="section-2167"></a>
## Vibe Coding 核心工作流

<a id="t-gZk9JfJM3bJU8TeAZh5Mwe"></a>

<p id="t-1Dyk5rATntEl2CGSZs2QMU"><span style="border-bottom:1px solid">Vibe Coding 的核心工作流可以概括为四个步骤：描述、审查、迭代、交付。</span></p>


<a id="section-2168"></a>
## 完整工作流图示

<a id="t-3GsAJOD2P8G2aI1zpwMD1J"></a>

<pre id="t-IHvNEvVlJXKH5W6WGvfrTP"><code>描述需求
    ↓
AI 生成代码
    ↓
你审查 Diff
    ↓
  ┌─ 不满意 → 描述修改意见 → AI 重新生成
  │
  └─ 满意 → 运行测试
              ↓
            ┌─ 测试失败 → 把报错贴给 AI → 修复
            │
            └─ 测试通过 → 提交代码</code></pre>


<a id="section-2169"></a>
## 第一步：描述需求

<a id="t-waTEYAaIx9EAc6AkK5yxHB"></a>

<p id="t-xQpnjX1cfccqlngXVcG81Q"><span style="border-bottom:1px solid">用自然语言告诉 Claude Code 你想要什么。</span></p>

<p id="t-HmRiEPCDchJAWhqnoERgdG"><span style="border-bottom:1px solid">不需要写代码，不需要说技术细节，说清楚「做什么」即可。</span></p>

<p id="t-zxdpEPc2hesLfl0zkNHmAj"><span style="border-bottom:1px solid">一个简单的需求描述示例：</span></p>

<pre id="t-P8KxdWHXNsmfNcgpMDlH0G"><code>帮我创建一个 Python Flask 项目，有一个 /api/tasks 接口，
支持 GET 获取任务列表和 POST 创建新任务，
任务数据用 JSON 文件存储。</code></pre>

<p id="t-NdQNnR3NIxskmGDCqu80tf"><span style="border-bottom:1px solid">Claude Code 收到后会自己规划文件结构、生成代码、安装依赖、运行测试。</span></p>


<a id="section-2170"></a>
## 第二步：审查 Diff

<a id="t-JSBIsLsNdP22rGkK0j14y0"></a>

<p id="t-V9DMey5wqbrCeeIOt96CaW"><span style="border-bottom:1px solid">Claude Code 生成代码后，会展示所有改动（Diff）供你审查。</span></p>

<p id="t-z3CEoihYROKizxLzoGmKU2"><span style="border-bottom:1px solid">这是 Vibe Coding 中最重要的环节——你必须看懂 AI 改了什么。</span></p>

<p id="t-Ra7XYKjSrbbHzygR2tlr7h"><span style="border-bottom:1px solid">审查时重点关注：</span></p>

<div id="t-OXkKQgxfoYPYYDkLSc7q55"><table><colgroup><col width="137.89755249023438"/><col width="313.89752197265625"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>检查项</span></p></td><td style=" vertical-align: top"><p><span>具体看什么</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">逻辑正确性</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">条件判断是否合理，边界情况是否处理</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">安全性</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">是否有 SQL 注入、XSS 等安全漏洞</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">数据流向</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">数据的输入、处理和输出是否符合预期</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">命名规范</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">变量名、函数名是否清晰易懂</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">冗余代码</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">是否有不必要的重复或未使用的导入</span></p></td></tr></tbody></table></div>

<blockquote id="t-qwAuGoy9lsGpLlJneZyjgN"><p id="t-sttug4gzeoBrsQv2hGA76T"><span style="border-bottom:1px solid;font-style:italic">审查不是为了找茬，而是确保你理解每一行代码在做什么。如果你看不懂某段代码，直接问 Claude Code：「这段代码是什么意思？为什么要这样写？」</span></p></blockquote>


<a id="section-2171"></a>
## 第三步：迭代修改

<a id="t-y9tNp1mAWQs5OxbTqsNzay"></a>

<p id="t-y5G49hHrmyl7lOpvt64Mnl"><span style="border-bottom:1px solid">审查发现问题后，用自然语言描述你想要的修改。</span></p>

<p id="t-D3hk3rfaZXg1TJEljbj4GX"><span style="border-bottom:1px solid">常见的迭代指令示例：</span></p>

<pre id="t-7Se0lOlXq1JvkYcFJKDvLp"><code>把 JSON 文件存储改成 SQLite，用 SQLAlchemy 做 ORM。</code></pre>

<pre id="t-Pyp0IWEYZSxHPhF9I2Qi2t"><code>给 POST 接口加个验证：title 必填，不能为空字符串。</code></pre>

<pre id="t-7tCg9UNXzCztC3PYTuPCtJ"><code>报错了，看一下：
Traceback (most recent call last):
  File "app.py", line 42, in create_task
    db.session.add(task)
AttributeError: 'NoneType' object has no attribute 'session'</code></pre>

<p id="t-NXVBjINXLkRxXolCyQyAkE"><span style="border-bottom:1px solid">每次迭代后，Claude Code 会重新生成代码并展示 Diff，你再次审查，直到满意为止。</span></p>


<a id="section-2172"></a>
## 第四步：交付

<a id="t-6djknkyZHklueFOjPBQ8Am"></a>

<p id="t-1zW3udwf1uSJ2X64CzALdV"><span style="border-bottom:1px solid">当所有功能符合预期且测试通过后，提交代码。</span></p>

<p id="t-LGu8OFg5Zw5kNfl3L4egbw"><span style="border-bottom:1px solid">Claude Code 会帮你写好 commit message 并提交：</span></p>

<pre id="t-RFsFJdQJbQBTPa8pDG1lua"><code>$ git log --oneline
a1b2c3d feat: add task CRUD API with SQLite storage</code></pre>


<a id="section-2173"></a>
## 实战演示：用 Claude Code 从零构建一个 Todo 应用

<a id="t-jlnSnZq8OCkBSsaEUedfXI"></a>

<p id="t-eAxUcHVeAdY49OVenfJOBF"><span style="border-bottom:1px solid">下面通过一个完整的实战案例，演示 Vibe Coding 的整个流程。</span></p>

<p id="t-qHG4RFD58I0Zz1QVx9Yq17"><span style="border-bottom:1px solid">我们将用 Claude Code 从零构建一个包含前端页面和后端 API 的 Todo 应用。</span></p>


<a id="section-2174"></a>
## 项目目标

<a id="t-0MaRiyJfTdY4rCso4U4kXt"></a>

<div id="t-gWhhBM0EpffWCcMcjq5qxv"><table><colgroup><col width="120"/><col width="290.89752197265625"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>功能</span></p></td><td style=" vertical-align: top"><p><span>说明</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">添加任务</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">输入任务标题，添加到列表</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">完成任务</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">点击勾选标记任务为已完成</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">删除任务</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">删除不需要的任务</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">筛选</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">按全部/进行中/已完成筛选</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">持久化</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">数据保存到 SQLite，刷新不丢失</span></p></td></tr></tbody></table></div>


<a id="section-2175"></a>
## 第一步：初始化项目

<a id="t-MzP8z9WWIMvMz1t5V09L7k"></a>

<p id="t-fLbFaW2SNf5f1rWPBbiYCi"><span style="border-bottom:1px solid">在终端中创建项目目录并启动 Claude Code：</span></p>

<pre id="t-6fHvDCmAp6dUHD7LSLLsny"><code>$ mkdir vibe-todo &amp;&amp; cd vibe-todo
$ claude</code></pre>

<p id="t-txQ0mYss0ulNz4P5SvVy19"><span style="border-bottom:1px solid">然后向 Claude Code 描述你的需求：</span></p>

<pre id="t-II61vYfm1ZpfHhSxeUj83y"><code>帮我创建一个 Todo 应用，要求：
1. 后端用 Python Flask + SQLAlchemy + SQLite
2. 前端用纯 HTML/CSS/JS，风格简约现代
3. 支持添加、完成、删除、筛选任务
4. 所有 API 返回 JSON，前端用 fetch 调用
5. 代码注释用中文</code></pre>


<a id="section-2176"></a>
## 第二步：Claude Code 做了什么

<a id="t-n7EDoiOZMRGBY7UHW9A3MP"></a>

<p id="t-ojX3KJ5xoxbhFDYIvFBJmJ"><span style="border-bottom:1px solid">Claude Code 收到需求后，自动完成了以下步骤：</span></p>

<p id="t-DWZjm75fmWQfK8xUOW9WVX"><span style="border-bottom:1px solid">首先创建项目结构：</span></p>

<pre id="t-1QSVXjiPDRmDnYPjpj7ee4"><code>vibe-todo/
├── app.py              # Flask 主应用
├── models.py           # 数据库模型
├── requirements.txt    # 依赖清单
├── static/
│   ├── style.css       # 样式文件
│   └── script.js       # 前端逻辑
└── templates/
    └── index.html      # 页面模板</code></pre>

<p id="t-gLUSKTxEAHTptE4wRcJtLO"><span style="border-bottom:1px solid">然后生成后端代码，以下是 app.py 的核心内容：</span></p>


<a id="section-2177"></a>
## 实例

<a id="t-MKNg8vJSoNTKzzcxAsjc03"></a>

<pre id="t-wvoJ2JM4vm3W8xfCId0CVT"><code># 文件路径：app.py
# Flask 主应用，定义 API 路由和页面入口

from flask import Flask, render_template, request, jsonify
from models import db, Task

app = Flask(__name__)
# 配置 SQLite 数据库路径
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///todo.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# 初始化数据库扩展
db.init_app(app)

# 应用启动时自动创建表结构
with app.app_context():
    db.create_all()

@app.route('/')
def index():
 """返回主页面"""
 return render_template('index.html')

@app.route('/api/tasks', methods=['GET'])
def get_tasks():
 """获取所有任务列表，支持按状态筛选"""
 # 从查询参数获取筛选条件，默认为 'all'
    status = request.args.get('status', 'all')
 # 根据状态筛选任务
 if status == 'completed':
        tasks = Task.query.filter_by(completed=True).all()
 elif status == 'active':
        tasks = Task.query.filter_by(completed=False).all()
 else:
        tasks = Task.query.all()
 # 将任务对象转为字典列表，方便 JSON 序列化
 return jsonify([t.to_dict() for t in tasks])

@app.route('/api/tasks', methods=['POST'])
def create_task():
 """创建新任务"""
    data = request.get_json()
 # 校验必填字段 title
    title = data.get('title', '').strip()
 if not title:
 return jsonify({'error': '任务标题不能为空'}), 400
 # 创建任务对象并保存到数据库
    task = Task(title=title)
    db.session.add(task)
    db.session.commit()
 return jsonify(task.to_dict()), 201

@app.route('/api/tasks/&lt;int:task_id&gt;', methods=['PUT'])
def update_task(task_id):
 """更新任务状态（完成/取消完成）"""
    task = Task.query.get_or_404(task_id)
    data = request.get_json()
 # 如果请求中包含 completed 字段，则更新状态
 if 'completed' in data:
        task.completed = data['completed']
    db.session.commit()
 return jsonify(task.to_dict())

@app.route('/api/tasks/&lt;int:task_id&gt;', methods=['DELETE'])
def delete_task(task_id):
 """删除指定任务"""
    task = Task.query.get_or_404(task_id)
    db.session.delete(task)
    db.session.commit()
 return jsonify({'message': '删除成功'}), 200

if __name__ == '__main__':
    app.run(debug=True)</code></pre>

<p id="t-goOugQGX2kqSL6QwZcJyx4"><span>还有数据库模型 </span><span>models.py</span><span>：</span></p>


<a id="section-2178"></a>
## 实例

<a id="t-5D8HGXldFFKL9TErbsBAcY"></a>

<pre id="t-ySXZ1lCZEUBcOvXyp8d4Qj"><code># 文件路径：models.py
# 数据库模型定义，使用 SQLAlchemy ORM

from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

# 创建数据库实例，后续在 app.py 中初始化
db = SQLAlchemy()

class Task(db.Model):
 """任务模型，对应数据库中的 tasks 表"""
    __tablename__ = 'tasks'

 # 主键，自增整数
 id = db.Column(db.Integer, primary_key=True)
 # 任务标题，必填，不能为空
    title = db.Column(db.String(200), nullable=False)
 # 完成状态，默认为 False
    completed = db.Column(db.Boolean, default=False)
 # 创建时间，自动记录
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

 def to_dict(self):
 """将任务对象转换为字典，方便 JSON 序列化"""
 return {
 'id': self.id,
 'title': self.title,
 'completed': self.completed,
 'created_at': self.created_at.isoformat()
 }</code></pre>


<a id="section-2179"></a>
## 第三步：审查代码

<a id="t-o5npascfcQk2JcuAOtFYBl"></a>

<p id="t-3AZza6btusJWrHGpTz4oEH"><span style="border-bottom:1px solid">Claude Code 展示 Diff 后，你逐行审查。</span></p>

<p id="t-fd4q4TjsBWZg50QS0r3AG6"><span style="border-bottom:1px solid">你可能会发现一些问题并提出修改意见。</span></p>

<p id="t-T1h8w0goNbWCUGZI2k921A"><span style="border-bottom:1px solid">例如，你注意到 API 路由没有统一前缀，提出修改：</span></p>

<pre id="t-jRkGClQSx5aAPyZyY0iwCR"><code>把所有 API 路由加上 /api/v1 前缀，方便以后版本管理。</code></pre>

<p id="t-RgqMNzffcOgqy0vKjplxTM"><span style="border-bottom:1px solid">Claude Code 会自动修改所有路由，你再次审查通过。</span></p>


<a id="section-2180"></a>
## 第四步：运行测试

<a id="t-BvJGq3ixHap5GSbrMRfV13"></a>

<p id="t-Cnh3ueOt6MnuqJz49kWxHX"><span style="border-bottom:1px solid">审查通过后，让 Claude Code 启动应用并测试：</span></p>

<pre id="t-cXuaNgdemn3zePqL22bFhn"><code>$ python app.py
 * Running on http://127.0.0.1:5000</code></pre>

<p id="t-bgpXxAVbM7SnBgLt5QPV9y"><span style="border-bottom:1px solid">打开浏览器访问 http://127.0.0.1:5000，可以看到完整的 Todo 应用界面。</span></p>

<p id="t-Xl1HXhi7cApX9PG7Bhzi2z"><span style="border-bottom:1px solid">测试添加任务功能：</span></p>

<pre id="t-kUWGG9Je0b2JM3sgpVAyPZ"><code>$ curl -X POST http://127.0.0.1:5000/api/v1/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "学习 Vibe Coding"}'</code></pre>

<p id="t-E3dozGyEJydjreYXKf70i0"><span style="border-bottom:1px solid">返回结果：</span></p>

<pre id="t-RgTvbBPY6bsEmBdRbO7pNt"><code>{
  "completed": false,
  "created_at": "2026-06-24T10:30:00",
  "id": 1,
  "title": "学习 Vibe Coding"
}</code></pre>


<a id="section-2181"></a>
## 第五步：提交代码

<a id="t-M2CfsvAZLewbl0RBTl5ONM"></a>

<p id="t-iX8AP3RgBPvCKoIt3uvX6d"><span style="border-bottom:1px solid">所有功能验证通过后，提交代码：</span></p>

<pre id="t-IW6eH36YQqOayViKUn3AWW"><code>$ git add .
$ git commit -m "feat: 完成 Todo 应用基础功能"</code></pre>

<blockquote id="t-vF6LDbKwudY82vcfsrVvWC"><blockquote id="t-7SKNMJYFZ0nalZ9x1bQSUw"><span style="border-bottom:1px solid;font-style:italic">整个实战过程，你一行代码都没有手动写。你做的事情是：描述需求、审查 Diff、描述修改、运行测试、提交代码。这就是 Vibe Coding 的核心体验。</span></blockquote></blockquote>


<a id="section-2182"></a>
## 写好提示词的技巧

<a id="t-9RhLio6L0PZh8phb14i92P"></a>

<p id="t-cBkSIRRG0PEoaVOXCt5TdJ"><span style="border-bottom:1px solid">Vibe Coding 的效果很大程度上取决于你如何描述需求。</span></p>

<p id="t-0R964JkafE9c9KCEgNAM6V"><span style="border-bottom:1px solid">好的提示词能让 AI 一次生成接近预期的代码，减少迭代次数。</span></p>


<a id="section-2183"></a>
## 四要素模型

<a id="t-LoqnWTmpJZdVRHiMKG8kr1"></a>

<p id="t-Bwk9E3nUYItDrpiLMT2Hyg"><span style="border-bottom:1px solid">一个高质量的提示词应该包含四个要素：</span></p>

<div id="t-s8tC5cJQ2PIUBGhqwteVK3"><table><colgroup><col width="99.89755249023438"/><col width="186.89752197265625"/><col width="343.89752197265625"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>要素</span></p></td><td style=" vertical-align: top"><p><span>说明</span></p></td><td style=" vertical-align: top"><p><span>示例</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">做什么</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">明确描述要实现的功能</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">「创建一个用户注册接口」</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">用什么</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">指定技术栈和工具</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">「用 Flask + SQLAlchemy + SQLite」</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">怎么约束</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">给出限制条件和边界</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">「邮箱必填且需要格式验证」</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">期望格式</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">说明输出偏好</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">「代码注释用中文，每个函数加 docstring」</span></p></td></tr></tbody></table></div>


<a id="section-2184"></a>
## 好提示词 vs 差提示词

<a id="t-RRQ0ljasCHTUDiESbQUc98"></a>

<div id="t-niViRElaAzHRrIYl9htGn9"><table><colgroup><col width="113.89755249023438"/><col width="475.9061279296875"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>差提示词</span></p></td><td style=" vertical-align: top"><p><span>好提示词</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">帮我做个登录功能</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">帮本案例用 Flask 实现一个登录接口，接收邮箱和密码，用 bcrypt 加密密码，用 JWT 返回 token，token 有效期 24 小时。登录失败返回具体的错误信息。</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">这个按钮太丑了</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">把这个提交按钮改成圆角 8px、蓝色背景 #2563eb、白色文字，hover 时颜色加深 10%，加一个 0.2s 的过渡动画。</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">报错了，帮我修</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">运行 python app.py 时报错：AttributeError: 'NoneType' object has no attribute 'session'。看起来是数据库初始化的问题，帮我排查并修复。</span></p></td></tr></tbody></table></div>

<blockquote id="t-4Yc3VXb7E1KHlaCNaqLdFm"><p id="t-o0shSlCmmk5BcXqNFyqjFJ"><span style="border-bottom:1px solid;font-style:italic">提示词的核心原则：越具体，结果越好。模糊的需求只会得到模糊的代码。</span></p></blockquote>


<a id="section-2186"></a>
## 误区一：AI 可以替代所有编程知识

<a id="t-dv88eF8OpTsSfa8wj1Plx6"></a>

<p id="t-2dibHOJvsQFIKb0XU9dQp5"><span style="border-bottom:1px solid">Vibe Coding 降低了编程门槛，但没有消除门槛。</span></p>

<p id="t-TwEkUpVhBKKm3xJy5PcJYd"><span style="border-bottom:1px solid">我们仍然需要理解基本概念：变量、函数、API、数据库、HTTP、异步等，否则无法判断 AI 生成的代码是否正确，也无法有效地描述需求。</span></p>


<a id="section-2187"></a>
## 误区二：一次性描述所有功能

<a id="t-90YMz5sEENMRaxWu4KD4PW"></a>

<p id="t-UpxeZt6ifHxcMcqXxsXWqQ"><span style="border-bottom:1px solid">不要把整个产品的 PRD 文档复制给 AI，期望它一次性生成完美代码。</span></p>

<p id="t-D565gmOq4RiC1Cd9wnle22"><span style="border-bottom:1px solid">AI 的注意力有上限，需求越多越容易出错。</span></p>

<p id="t-2KYfIK1EtcpiobTwF5Qp6q"><span style="border-bottom:1px solid">更有效的方式是：核心功能 → 验证 → 添加功能 → 验证 → 继续迭代。</span></p>


<a id="section-2188"></a>
## 误区三：不读 AI 写的代码

<a id="t-CtnRrX8gWPtPBH1mIOWVzT"></a>

<p id="t-HWoIvWfDBrQ1iuXz8UMrXX"><span style="border-bottom:1px solid">有些开发者拿到 AI 生成的代码后直接合入，这是非常危险的。</span></p>

<p id="t-ZY6B95h5wMaWUrrsooxNNt"><span style="border-bottom:1px solid">AI 可能会引入安全漏洞、性能问题、或者完全不合理的架构。</span></p>

<p id="t-6F11OV1b3LMJD1sHpDxMPL"><span style="border-bottom:1px solid">我们至少需要快速浏览一遍关键逻辑，确保没有明显问题。</span></p>


<a id="section-2189"></a>
## 注意事项

<a id="t-tiI1ByKIjRPlZF2B6vENUN"></a>

<ul><li id="t-ra1iq4cEYFBHd8liuMTX90"><span>敏感信息（API 密钥、数据库密码）不要直接写在对话里——先在代码中用环境变量占位，再手动填入</span></li></ul>

<ul><li id="t-YT15pCzGa0iankaYrgPF70"><span>每次关键修改后提交 Git，方便出问题时回滚</span></li></ul>

<ul><li id="t-8fE74KirVQKwBbt4ecqAzo"><span>AI 生成的代码可能不符合你团队的编码规范，需要手动调整</span></li></ul>

<ul><li id="t-toaL4VbfpxZO3VziGTLX3o"><span>对于需要高可靠性的代码（支付、认证、数据处理），AI 生成后务必人工审查</span></li></ul>


<a id="section-2190"></a>
## 适合 Vibe Coding 的场景

<a id="t-ZJTELxwdbUaC0YisKD3E2e"></a>

<p id="t-pRef62TxE1Kl5DpIFveTA5"><span style="border-bottom:1px solid">Vibe Coding 并非万能，了解什么场景适合它能帮你更好地分配精力。</span></p>

<div id="t-7eM0cO4GDcjEsbbDR2LI3E"><table><colgroup><col width="155.89755249023438"/><col width="81.00347900390625"/><col width="385.01031494140625"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>场景</span></p></td><td style=" vertical-align: top"><p><span>适合度</span></p></td><td style=" vertical-align: top"><p><span>说明</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">原型/MVP 开发</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;background-color:#eafaf1">极高</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">快速验证想法，几个小时出一个可用的 demo</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">CRUD 接口</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;background-color:#eafaf1">极高</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">重复模式明确，AI 完成度很高</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">前端页面/组件</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;background-color:#eafaf1">很高</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">HTML/CSS/React 组件，AI 非常擅长</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">脚本/自动化工具</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;background-color:#eafaf1">很高</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">一次性脚本、数据处理、文件操作</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">单元测试编写</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;background-color:#eafaf1">很高</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">根据函数签名生成测试用例</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">复杂算法实现</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">中等</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">需要清晰的算法描述，且需人工验证正确性</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">底层系统优化</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">较低</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">涉及内存布局、缓存行、硬件特性，AI 容易出现细微错误</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">高安全需求代码</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">谨慎</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">加密、认证、支付类代码，AI 生成后必须专家审查</span></p></td></tr></tbody></table></div>

