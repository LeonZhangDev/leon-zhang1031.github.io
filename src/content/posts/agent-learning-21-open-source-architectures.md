---
title: "第 21 章 · 开源 Agent 架构解析"
date: "2026-10-22"
draft: false
author: "学习资料整理"
description: "PI-Agent、OpenClaw、Hermes 与 DeepSeek Harness"
tags: ["Agent", "学习路线"]
categories: ["AI 工程"]
prerequisites: ["agent-learning-20-skills-harness"]
verification: {"status": "not-run", "scope": "本次仅整理资料；示例代码与原文技术结论未复跑。"}
---

PI-Agent、OpenClaw、Hermes 与 DeepSeek Harness

[学习路线](/posts/agent-learning-route/) · [上一章](/posts/agent-learning-20-skills-harness/) · [下一章](/posts/agent-learning-22-agent-platforms/)

本章按知识小节编排。项目内容作为学习案例阅读，示例代码与原文技术结论未在本次整理中执行验证。

## 本章目录

- [开源框架解读 - PI-Agent](#section-0155)
- [总述](#section-0156)
- [结构速览](#section-0157)
- [架构](#section-0158)
- [可扩展性](#section-0159)
- [课后作业](#section-0160)
- [面试问题](#section-0161)
- [参考资料&amp;源代码](#section-0162)
- [讲解视频](#section-0163)
- [开源框架解读 - Openclaw](#section-0164)
- [OpenClaw是什么](#section-0165)
- [Openclaw 总体架构](#section-0166)
- [Openclaw 记忆](#section-0167)
- [OpenClaw Agent 架构解析](#section-0168)
- [安全风险](#section-0169)
- [面试问题](#section-0170)
- [参考资料](#section-0171)
- [开源框架解读 - Hermes Agent](#section-0172)
- [Hermes Agent是什么](#section-0173)
- [Hermes 总体架构](#section-0174)
- [Hermes 记忆系统 · 静态结构](#section-0175)
- [Hermes 记忆系统 · 动态更新策略](#section-0176)
- [Hermes Agent 架构解析](#section-0177)
- [面试问题](#section-0178)
- [Hermes 源代码](#section-0179)
- [视频讲解](#section-0180)
- [开源框架解读 - ClaudeCode](#section-0181)
- [开源框架解读- DeepSeek Harness](#section-0182)
- [DeepSeekHarness是什么？](#section-0183)
- [整体架构](#section-0184)
- [核心特性](#section-0185)
- [面试问题](#section-0186)
- [OpenClaw (Clawdbot) 教程](#section-1788)
- [安装方法](#section-1789)
- [推荐安装方式（一键脚本）](#section-1790)
- [手动安装](#section-1791)
- [从源码安装（开发模式）](#section-1792)
- [配置说明](#section-1793)
- [卸载](#section-1794)
- [使用技能](#section-1795)
- [插件管理](#section-1796)
- [常用命令](#section-1797)
- [通道管理](#section-1798)
- [工作区结构（Workspace Anatomy）](#section-1799)
- [聊天内斜杠命令](#section-1800)
- [关键路径映射（Essential Path Map）](#section-1801)
- [语音与 TTS](#section-1802)
- [内存与模型](#section-1803)
- [Hooks 与技能](#section-1804)
- [故障排除](#section-1805)
- [自动化与研究](#section-1806)
- [通过第三方云直接安装配置](#section-1807)
- [常用命令](#section-1808)
- [为什么最近这么火？](#section-1809)
- [OpenClaw 快速上手](#section-1810)
- [启动引导](#section-1811)
- [Gateway 基础操作](#section-1812)
- [访问 Control UI](#section-1813)
- [关键命令速查](#section-1814)
- [Gateway 热重载机制](#section-1815)
- [TUI：终端聊天界面](#section-1816)
- [快速启动](#section-1817)
- [界面布局](#section-1818)
- [键盘快捷键](#section-1819)
- [常用斜杠命令](#section-1820)
- [本地 Shell 命令](#section-1821)
- [启动选项](#section-1822)
- [相关内容](#section-1823)
- [Hermes Agent](#section-2100)
- [整体架构](#section-2101)
- [快速安装](#section-2102)
- [快速上手](#section-2103)
- [手动安装](#section-2104)
- [步骤 1：克隆仓库](#section-2105)
- [步骤 2：安装 uv 并创建虚拟环境](#section-2106)
- [步骤 3：安装 Python 依赖](#section-2107)
- [步骤 4：创建配置目录](#section-2108)
- [步骤 5：添加 API 密钥](#section-2109)
- [步骤 6：将 hermes 添加到 PATH](#section-2110)
- [步骤 7：配置您的提供商](#section-2111)
- [步骤 8：验证安装](#section-2112)
- [故障排除](#section-2113)
- [消息网关](#section-2114)
- [支持的平台](#section-2115)
- [设置消息平台](#section-2116)
- [启动网关](#section-2117)
- [平台特定配置](#section-2118)
- [语音支持](#section-2119)
- [安全考虑](#section-2120)
- [故障排除](#section-2121)

<a id="section-0155"></a>
## 开源框架解读 - PI-Agent

<a id="f-doxcnFOWnBrl5Ak7OWmNe0UzNBc"></a>

<p id="f-doxcnLlq1hb7TiSQPqHQLzgr04c"><span>当你学习完了理论部分，这里给出一个非常好的实战例子。有些同学问我，有没有推荐的开源的学习Agent的项目啊？那我的回答就是使用这个Pi-Agent。为什么？因为它足够简单，好上手。但是具备Agent项目的最核心的要素。同时他又支持扩展，官方给了很多扩展的例子。你通过这个项目，可以快速学习Agent，也给了你丰富的资料和空间去扩展，改造成自己的项目。另外他也足够权威，github上有快60k 的stars。包括也有博主说，Openclaw也就是使用它改造的，所以权威性和可学习性也不用担心。当然该学习案例还有解析Hermes,解析</span><span><span><a href="#f-doxcnfdqX7Xmgd1YRp2zV5utl0e"><span>Openclaw</span></a></span></span><span>,</span><span><span><a href="/posts/agent-learning-19-ai-coding/#f-doxcnsn7d9qpY3k8HwjWSe13GAb"><span>ClaudeCode</span></a></span></span><span>。 我的建议是先看这个项目，看明白再看其他的，因为其他项目复杂太多。</span></p>


<a id="section-0156"></a>
## 总述

<a id="f-doxcnMpyOKzDXZcdHBhylFmoQWc"></a>

<a id="f-doxcnYANLcOkvDJE9llPuH9bWpb"></a>

##### Pi 是什么,

<p id="f-doxcnUUnfRuAZNcbWT55SHR4vdf"><span>Pi 是一个很小的、可以自我扩展的 Agent Harness，也就是 Agent 运行框架。它的产品口号是 "grows with you"。直白一点说，就是先给你一个很小的内核，后面缺什么再加什么。</span></p>

<p id="f-doxcnmP3GNtu88vl6arv12Zpnpg"><span>刚装好的 Pi 很克制：默认只有 4 个工具，分别是 </span><span><span><span>read</span></span></span><span>、</span><span><span><span>bash</span></span></span><span>、</span><span><span><span>edit</span></span></span><span>、</span><span><span><span>write</span></span></span><span>；系统提示词大约 20 行；没有 MCP，没有子代理，没有权限弹窗，没有 plan 模式，也没有内置 todo。第一次看会觉得功能少，但这正是它的设计选择：内核只保留必要部分，其他能力通过扩展补上。你缺一个能力，就可以让 Pi 写一个 TypeScript 扩展把它接进去。</span></p>

<p id="f-doxcnEm8Hg62lWJa9gRwA0I8GMd"><span>Pi 是 TypeScript monorepo，主要由 4 个 package 组成：</span></p>

<p id="f-doxcn14oICMvmOd3Xl5cvZuoqge"><span>- </span><span style="font-weight:bold">pi-ai</span><span>：多供应商 LLM API 抽象，覆盖 OpenAI、Anthropic、Google、Bedrock 等。</span></p>

<p id="f-doxcnRwYh8EyNUMjZvlCc2YMRJK"><span>- </span><span style="font-weight:bold">pi-agent-core</span><span>：Agent 运行时，包含工具调用、状态管理、会话和压缩。</span></p>

<p id="f-doxcnJAzJXinGOHo6TKf4sROQ0b"><span>- </span><span style="font-weight:bold">pi-coding-agent</span><span>：面向编码场景的交互式 CLI。</span></p>

<p id="f-doxcnpkMkf3cyDSKZmAZFMP5dgb"><span>- </span><span style="font-weight:bold">pi-tui</span><span>：自研终端 UI 库，支持差分渲染。</span></p>

<a id="f-doxcnpmGVoG8lFNqlVDh5cUT7nh"></a>

##### Pi 与 Claude Code 的主要区别

<p id="f-doxcnue46aIVaCsZ4Netvso6X9f"><span>Pi 选择"小内核加扩展"，Claude Code 选择"默认带齐常用功能"。这个差异会影响工具数量、权限模型、提示词长度、扩展方式和会话结构。下面按维度对比，每条都先说 Pi、再说 Claude Code：</span></p>

<div style="margin-left:25px"><div id="f-doxcn6EXvHpf8pKOCRa1TurRljb"><img alt="" decoding="async" height="240" loading="lazy" src="/images/agent-learning/a4db0201b090a51f791ac694.png" width="360"/></div></div>

<a id="f-doxcnHRtEsUcIz8RYNdka8ewfLb"></a>

##### 为什么 Pi 适合学习

<p id="f-doxcntx0yiNOev0DeObm5Sa8did"><span>可以认为这个项目特别适合，你在学完Agent理论之后，第一个学习的实践项目。不论你是想要阅读开源代码，还是说找一个项目改装，扩展，这个项目都太合适了。</span></p>

<p id="f-doxcnB8CWCUgfmvycIAsvEzZhAg"><span>Pi 是一个很合适的样本。原因主要有四个：</span></p>

<ol start="1"><li id="f-doxcnISIPJPAbMbWDtNvNuRoVud"><span>内核小，能读完。Claude Code 这类功能密集的工具，新手容易迷失在边缘功能里。Pi 的主干就是 agent loop，入口集中，读起来更容易抓住脉络。别看他小，但他五脏俱全。基本上面试Agent岗位的时候，围绕记忆，压缩，会话恢复，Agent Loop(React)这些是面试最常考的点，这些都有。即使他不算很复杂，但是你学会了以后，对于一个Coding Agent整体的架构的意识思想是完备的。</span></li></ol>

<ol start="2"><li id="f-doxcn0dBpgrrlK7qA6wAs9xmtq9"><span>Agent loop 是手写的。市面上有 OpenAI Agents SDK、Vercel AI SDK 这类框架，导入后很快就能跑，但很多关键步骤被封装起来了。Pi 把初始化、压缩、模型调用和工具循环都写在明面上，更适合学习。</span></li></ol>

<ol start="3"><li id="f-doxcnSlT4p5wT4qkbVryzVfw4Yb"><span>模块边界清楚。4 个 package 各管一块，内核和交互层分开。Agent Core 可以脱离终端，被 RPC 或 SDK 调用，所以读一层时不必同时理解所有 UI 细节。</span></li></ol>

<ol start="4"><li id="f-doxcnBJrQkPDa1QZNUYaPnpJMQC"><span>他的思想"grows with you"，太适合你去改造了，添加了。比如他没有Plan功能，没有MCP功能。都适合你一边用，一边学，一边改造和扩展。</span></li></ol>


<a id="section-0157"></a>
## 结构速览

<a id="f-doxcnE8X9H3srACM75pWLBWwqnf"></a>

<p id="f-doxcnNYvN3kEOiPalE1GTL56V7e"><span>并知道接下来应该读哪几块。安装和日常使用细节不展开，官方视频里讲得更细</span></p>

<a id="f-doxcn7zSA8IgUGwlLTadgJSgWQT"></a>

##### 仓库结构速览

<pre id="f-doxcnHySLL8wWTvF4h5ymOe96he"><code>packages/
├── ai/            # pi-ai：多供应商 LLM 抽象，providers/ 下一家一个文件
├── agent/         # pi-agent-core：agent loop、harness、session、compaction
├── coding-agent/  # pi-coding-agent：CLI 入口、工具实现、扩展系统、交互模式
└── tui/           # pi-tui：通用终端 UI 组件库（Box / Text / List / Markdown…）</code></pre>

<p id="f-doxcnNpIqWALiZ1wdP2vPXnq7ae"><span>四个包，按"两类角色"来记最省事：</span></p>

<p id="f-doxcnFV7RnXmcBMZUhAG479mWxb"><span style="font-weight:bold">产品本体：coding-agent。</span><span> 你在终端敲的 `pi` 命令，入口就是它（它的 `package.json` 里 `bin.pi` 指向 `dist/cli.js`）。它自己几乎不造轮子，而是把另外三个包装配起来用：要智能就用 `agent`，要画界面就用 `tui`，要连大模型最终落到 `ai`。</span></p>

<p id="f-doxcnvfy1kTEjRfil99RjMVjP8d"><span style="font-weight:bold">被它使用的三个库：</span><span> `agent`（agent loop 与会话）、`tui`（终端 UI 组件）、`ai`（LLM 抽象，最底层）。</span></p>

<p id="f-doxcnyVJHh2t31X8NDInxv7IIgb"><span>依赖方向只有一个朝向，记牢它能省掉很多困惑。下面箭头表示"谁 import 谁"：</span></p>

<pre id="f-doxcnup3o5BQPXo9nkXopOPKeye"><code>coding-agent ─┬─→ agent ─→ ai
              └─→ tui</code></pre>

<p id="f-doxcnCtLUSZWbYwWbFSC3Wx7icz"><span><span><span>coding-agent</span></span></span><span> 同时依赖 </span><span><span><span>agent</span></span></span><span> 和 </span><span><span><span>tui</span></span></span><span>；</span><span><span><span>agent</span></span></span><span> 再依赖 </span><span><span><span>ai</span></span></span><span>；而 </span><span><span><span>ai</span></span></span><span> 和 </span><span><span><span>tui</span></span></span><span> 是两个"叶子"——除了各自的外部 SDK，它们不依赖任何内部包，也都不知道 agent 的存在。</span></p>

<div id="f-doxcnhFlLwQyQgMpU5YnuccvWjg"><img alt="" decoding="async" height="240" loading="lazy" src="/images/agent-learning/370980557e0499b348618298.png" width="360"/></div>


<a id="section-0158"></a>
## 架构

<a id="f-doxcnv1TAZf90Yvz4ecG01YHRTe"></a>

<p id="f-doxcnvRTIn8Uqd5aldpCWkw9pce"><span>这一章回答"Pi 由哪些部分组成"。不按模块清单平铺，而是顺着数据流走一遍：你敲下回车后，一条消息经过哪些部件，最后怎么变成 Agent 的回复。</span></p>

<a id="f-doxcn9xb8sftBe5lL8v5f8GDkWf"></a>

##### 架构总览

<p id="f-doxcnNswW2wnh4U7roBD7kJTobh"><span>这一节是整章的地图。先给一张全局视角，把后面 3.2 到 3.9 串成一条线，之后每一节再单独展开其中一站。这里只关心运行时这些部件怎么协作；各部件分属哪个 package、谁依赖谁，2.2 已经讲过，不再重复。</span></p>

<p id="f-doxcnKdYIC0pzlNXMymm8kqYNfd"><span>你在终端敲下一句话、按回车，到屏幕上一个字一个字冒出回复，中间大致经过这几站：</span></p>

<div style="margin-left:25px"><p id="f-doxcns7Mby8Mrqn2pk3Xs9DrU8f"><span>1. </span><span style="font-weight:bold">CLI 入口（3.7）</span><span>：唯一的入口就是 `pi` 这个命令。它启动时先解析配置、加载扩展、建好会话，然后根据"现在是终端还是管道、带没带参数"</span><span style="font-weight:bold">选一种运行模式</span><span>，再把消息交给 agent loop。模式有三种——交互界面（interactive，默认的 TUI 聊天）、一次性打印（print，`pi "你的问题"`，打印完就退，接近传统 CLI）、程序化后端（RPC，给别的程序当后端）。入口只有一个，这三种只是它之后的不同运行形态，细节见 3.7。</span></p><p id="f-doxcnIcy6GtGqjkzJgJTEmBoA6f"><span>2. </span><span style="font-weight:bold">Agent Loop（3.2）是中枢，而且下面 3 到 7 这些事都发生在它的一轮循环之内。</span><span> 一轮里它依次：组装上下文 → 检查要不要压缩 → 调用模型 → 看模型要不要调工具 → 把这一轮产生的东西写进会话。换句话说，"调用 LLM""执行工具""写 Session"不是 loop 之外的独立步骤，而是 loop 在一轮里亲自做的几件事。</span></p><p id="f-doxcn5TWrAvoJswLT4xXN7p2itg"><span>3. </span><span style="font-weight:bold">Context 组装（3.3）</span><span>：把系统提示词、AGENTS.md、skills 描述、工具描述、历史消息和你这次的输入，拼成一份完整上下文。模型本身没有记忆，每一轮都要重新喂。</span></p><p id="f-doxcn0lxUXTSpVaTPxTjrJgZs0f"><span>4. </span><span style="font-weight:bold">Compaction 检查（3.6）</span><span>：上下文要是太长，就先让模型把历史总结成摘要。注意这一步也会</span><span style="font-weight:bold">往会话文件 append 一条"压缩"节点</span><span>——摘要本身也是会话树里的一个条目，之后取上下文时用它替换掉被压缩的那段历史。</span></p><p id="f-doxcnwC7tAlyHYZKs1YOQyWz2jc"><span>5. </span><span style="font-weight:bold">调用模型（3.9）</span><span>：通过 `pi-ai` 把上下文发给当前选中的 provider（OpenAI / Anthropic / Google…）。对 loop 来说，换模型只是换一个 provider，主流程不变。</span></p><p id="f-doxcniooce9HZEg0kPyuUQjdFgg"><span>6. </span><span style="font-weight:bold">工具循环（3.4）</span><span>：模型若要调 `read`/`bash`/`edit`/`write`，loop 就执行工具、把结果回灌给模型；模型可能接着调，也可能收尾。读写代码、跑命令，真正发生在这一步。</span></p><p id="f-doxcnta0VaLoMS8lxFwVVxRCOhe"><span>7. </span><span style="font-weight:bold">写入会话（3.5）</span><span>：这不是循环跑完才做的收尾，而是</span><span style="font-weight:bold">边跑边写</span><span>——每产生一条消息（你的输入、模型回复、每个工具结果）、每做一次压缩，都立即按"只追加 + 父指针"往 JSONL 文件追加一行；只有换模型、改工具集这类配置变更，才推迟到一轮结束时统一写。所有这些条目靠 `parentId` 串成那棵可回退、可分叉的会话树。</span></p><p id="f-doxcn1Ws64wzUsPZFpXvxCXqGnf"><span>8. </span><span style="font-weight:bold">TUI 渲染（3.8）</span><span>：整个过程中，loop 不断广播事件，终端界面订阅这些事件，用差分渲染把消息流、工具调用和状态变化实时画出来，而且不闪烁。</span></p></div>

<p id="f-doxcnqovbOXsxoLIpG62kBsFelh"><span>顺带说一句它为什么能这么拆：中枢那套东西（loop、context、session、compaction）不碰终端，所以同一套内核既能驱动这里的 TUI，也能被 RPC 或管道调用——这一点 3.7 讲三种运行模式时还会再碰到。</span></p>

<div id="f-doxcnw7x6EdizOYqW44zoGBqYWh"><img alt="" decoding="async" height="853" loading="lazy" src="/images/agent-learning/b3bc473b088497668833ac3a.png" width="1280"/></div>

<a id="f-doxcn9P3fQ4UCi8rDymqJtwMvc4"></a>

##### Agent Loop

<p id="f-doxcn3qXKGyT5ZjrF2YiurI81Rg"><span>Agent loop 是 Pi 最核心的部分。每次你向 Pi 发送消息，背后都会跑一轮循环。主干大致是这样：</span></p>

<ol start="1"><li id="f-doxcnEUypzxk4DEFMlpj51QM6If"><span>初始化 context：把系统提示词、AGENTS.md、skills 描述、工具描述、历史消息和当前消息拼成完整上下文。</span></li></ol>

<ol start="2"><li id="f-doxcnR4dHB8Jja2dg7vb4Tuvjie"><span>Transform / 压缩：检查上下文是否过长，过长就先做 compaction。</span></li></ol>

<ol start="3"><li id="f-doxcnHF6MzaI2xBO67C9zYs2W1d"><span>调用大模型：把上下文发给当前选中的 LLM provider。</span></li></ol>

<ol start="4"><li id="f-doxcnwmjD0JrAihWNkXxYxa56Fh"><span>工具调用循环：如果模型要调工具，就执行工具，把结果回灌给模型。模型可能继续调工具，也可能停止。</span></li></ol>

<ol start="5"><li id="f-doxcnSLFzf9mPyjEB2Z4sLzMiFd"><span>回复：模型不再调工具时，输出最终回答，本轮结束。</span></li></ol>

<p id="f-doxcnkPaBDltK9mvDbZkzhSmzyc"><span>这个流程看起来简单，但要写稳定并不轻松。实际实现里还要处理流式输出、运行中插话（steering）、收尾追问（follow-up）、工具并行或串行执行，以及中断（abort）。这些逻辑都集中在 </span><span><span><span>runLoop()</span></span></span><span> 附近。</span></p>

<p id="f-doxcnA2na432nAKMjJfmLrTFWBb"><span>这个就是一个非常标准的流程了，ClaudeCode,Hermes都采用了他。这个循环也可以理解成是一个标准的React循环。 面试官也问过原题：工业上一个React是怎么做的？</span><span style="font-weight:bold">就是上面的内容，请牢记。</span></p>

<div id="f-doxcnTMYkPdRRGM0W2oWCRyUVjg"><img alt="" decoding="async" height="1280" loading="lazy" src="/images/agent-learning/41df49343a2a1082f816a8f8.png" width="853"/></div>

<blockquote id="f-doxcn5n1dpj7qwaHi3Uqc9LQrQb"><p id="f-doxcn45rdhveONXBJHEoaniHuKb"><span>源码入口：</span><span><span><span>packages/agent/src/agent-loop.ts</span></span></span><span> 的 </span><span><span><span>runLoop()</span></span></span><span>、</span><span><span><span>streamAssistantResponse()</span></span></span><span>、</span><span><span><span>executeToolCalls()</span></span></span><span>。</span></p></blockquote>

<a id="f-doxcn9aALhe4UdsBV2Q1IUxudPf"></a>

##### Context 组装

<p id="f-doxcnTExryzromYTojnjZfJsZlb"><span>模型本身没有长期状态。每次调用，都要把它需要知道的内容重新放进 context。Pi 的 context 通常包含这些部分：</span></p>

<ul><li id="f-doxcns7bH7I6aeqV4Y2qES7TNYf"><span>系统提示词：硬编码的极简模板，大约 20 行。可以追加 </span><span><span><span>append-system.md</span></span></span><span>，用 </span><span><span><span>--system-prompt</span></span></span><span> 覆盖，也可以用 </span><span><span><span>system.md</span></span></span><span> 完全替换。</span></li></ul>

<ul><li id="f-doxcnBm7J84W0xjz8RNJic0YwQh"><span>AGENTS.md：home 目录和当前工作目录里的项目说明会被追加进来。Pi 也兼容读取 </span><span><span><span>CLAUDE.md</span></span></span><span>。</span></li></ul>

<ul><li id="f-doxcnQsF1lpUTp7ch1e64fZr8Kh"><span>Skills 描述：所有已加载技能的 name、description、location。</span></li></ul>

<ul><li id="f-doxcnNbM1AxRV0zTl0xZdiWMn3b"><span>工具描述：当前启用工具的说明。</span></li></ul>

<ul><li id="f-doxcn2msRyNHWeWfUyaVjGUjX1c"><span>历史消息或摘要：本轮之前的对话；如果已经压缩过，就使用摘要。</span></li></ul>

<ul><li id="f-doxcnm2kzsLKgiTvkXIV51GIMJg"><span>当前消息：用户这次输入的内容。</span></li></ul>

<p id="f-doxcnMhugHRekEofOIhI3ZpRi7f"><span>这里有个很重要的选择：系统提示词刻意保持短。把太多 AGENTS.md、skills 或行为规则塞进去，会撑大上下文，也会稀释模型注意力。</span></p>

<blockquote id="f-doxcneASPQ6jPaFezUf8Yc5wHSe"><p id="f-doxcn6kjLxGXtxWlhplRM3BJEBh"><span>❓</span><span style="font-weight:bold">思考题：读到这里，想清楚一个问题：Skills 到底是怎么"被调用"的？</span></p>
<p id="f-doxcnTSfkjBVTIoh5awXsqzulie"><span>简答：Pi 不是把所有 Skill 全文都塞进上下文，也不是把 Skill 做成一个特殊工具。它先把每个 Skill 的 name、description、location 放进系统提示词，并提示模型：如果任务匹配某个 Skill，就用 </span><span><span><span>read</span></span></span><span> 工具读取对应文件。也就是说，Skill 的自动使用是"提示词引导 + 模型判断 + read 工具按需加载"。如果用户显式输入 </span><span><span><span>/skill:name</span></span></span><span>，Pi 才会直接把这个 Skill 文件展开进用户消息。</span></p></blockquote>

<blockquote id="f-doxcn8e7RCQjLdCD5wpfsHYd90f"><p id="f-doxcnrMBEkLV9L3yoOQWmLBFUWb"><span>源码入口：</span><span><span><span>packages/agent/src/harness/system-prompt.ts</span></span></span><span>、</span><span><span><span>packages/coding-agent/src/core/system-prompt.ts</span></span></span><span>。</span></p></blockquote>

<a id="f-doxcnbmMKXr91rdYi3ZsR0GPAhh"></a>

##### Tools

<p id="f-doxcnYZCNNuEr6KfQoI1TG3Na0f"><span>Pi 默认只给模型 4 个工具：</span></p>

<p id="f-doxcn8PZfcCYqif9cvi5eB2z5lf"><span style="font-weight:bold">read</span><span>：读文件。</span></p>

<p id="f-doxcnTttG1eeLmdX7bsc0bkYFed"><span style="font-weight:bold">bash</span><span>：执行 shell 命令。</span></p>

<p id="f-doxcnguQiUwzjDvYUOdPXMUK0Oc"><span style="font-weight:bold">edit</span><span>：编辑文件。</span></p>

<p id="f-doxcntg0fnfYAzTAAsoY3YCWO6c"><span style="font-weight:bold">write</span><span>：写文件。</span></p>

<p id="f-doxcnrTBDCmXpsOtgCtxIz1CDDe"><span>工具很少，但组合起来够用。尤其是 </span><span><span><span>bash</span></span></span><span>，它能调用系统已有命令，很多搜索、列目录、检查项目状态的需求都可以通过它完成。</span></p>

<p id="f-doxcn8a3dshH5GRaoCMwzrslmQd"><span>源码里还有 </span><span><span><span>grep</span></span></span><span>、</span><span><span><span>find</span></span></span><span>、</span><span><span><span>ls</span></span></span><span>，但默认不启用。它们主要给</span><span style="font-weight:bold">只读模式用</span><span>。比如通过 </span><span><span><span>--tools read,grep,find</span></span></span><span> 启动时，Agent 可以查文件，但不能直接改文件或执行任意 shell 命令。这样同一套工具实现可以切换出"可写"和"只读"两种工作方式。因为在可写模式下，给到了Agent Bash工具，它本身就可以通过Bash来调用grep查找，不必要再给grep了。但是在只读环境下，不能给Agent bash工具，所以需要给它grep,find,ls.</span></p>

<blockquote id="f-doxcn82b6E8sPEu6hsLahf89isg"><p id="f-doxcnBe8VEa94Y9PsNbmWlFEa3f"><span>源码入口：</span><span><span><span>packages/coding-agent/src/core/tools/index.ts</span></span></span><span>，看 </span><span><span><span>createCodingTools()</span></span></span><span> 和 </span><span><span><span>createReadOnlyTools()</span></span></span><span>。</span></p>
</blockquote>

<a id="f-doxcnZmVsCMk9dD2eAQ9G8C6b8B"></a>

##### Sessions

<p id="f-doxcnLK5Ld9EMsBu2jiEdAdCv81"><span>这一小节把Agent系统的存储机制，如何恢复讲得非常清楚。其实也是一个标准的行业做法了，行业里叫会话存储。ClaudeCode和Pi都是用的是JSONL存储。存储方式类似，里面的一些回退细节不一样。不过本质相似，学习了本小节，对于Agent会话存储会有深入的了解。</span></p>

<p id="f-doxcntOtuIU5w43ziA7jsvzRNsG"><span style="font-weight:bold">怎么存：一个会话 = 一个 JSONL 文件，只追加</span></p>

<p id="f-doxcndFAmk99zK2x6B2mJ34Nndh"><span>会话文件放在 home 目录下的 </span><span><span><span>~/.pi/agent/sessions/</span></span></span><span>，并按工作目录编码成子目录。也就是说，你在 </span><span><span><span>dashboard</span></span></span><span> 项目和在 </span><span><span><span>weather-app</span></span></span><span> 项目里的对话，会自然分开保存。</span></p>

<p id="f-doxcnGI51mmKye98y1EJ1YPY0Dh"><span>一个会话就是一个 </span><span><span><span>.jsonl</span></span></span><span> 文件，结构很简单：</span></p>

<ul><li id="f-doxcnCTGnwVuCxnZ0wQAUqWlCrc"><span>文件</span><span style="font-weight:bold">第一行</span><span>是文件头，记录会话 </span><span><span><span>id</span></span></span><span>、</span><span><span><span>cwd</span></span></span><span>（工作目录），以及可选的 </span><span><span><span>parentSession</span></span></span><span>。</span></li></ul>

<ul><li id="f-doxcnfShepz0OzywgNzrjq6waJd"><span>之后</span><span style="font-weight:bold">每一行是一个条目（entry）</span><span>，新条目只往文件末尾 </span><span><span><span>append</span></span></span><span>，从不回头改写已经写下的行。</span></li></ul>

<p id="f-doxcn8DXSLmXOp7wddzBN4PtBsf"><span>这种"只追加、不改写"的写法有两个好处：写入快（不用重写整个文件），历史天然不可变（不会把旧数据写坏）。</span></p>

<p id="f-doxcn9Ub3EpbUQIuulcVpThSY2o"><span style="font-weight:bold">什么时候写？</span></p>

<p id="f-doxcn46uqkBB4h8rxeewkP0csRf"><span> 是 agent loop 跑的过程中边跑边写，不是等一轮结束才统一落盘。具体有三种时机：每产生一条消息（你的输入、模型回复、每个工具结果，对应 loop 的 </span><span><span><span>message_end</span></span></span><span> 事件）就立即 append 一行；每做一次压缩，也立即 append 一条 compaction 摘要节点；只有换模型、改 thinking、改工具集这类配置变更是例外，会先排进一个队列、推迟到一轮（turn）的边界再统一 flush（这点呼应 5.3 讲的 turn 快照：配置变更收敛到轮的边界生效）。换句话说，对话内容实时落盘以防丢失，配置变更则按轮归并。</span></p>

<p id="f-doxcndCcqI67AJVFWfHioG50Icc"><span>条目不只有聊天消息。除了 </span><span><span><span>message</span></span></span><span>，还有 </span><span><span><span>model_change</span></span></span><span>（换模型）、</span><span><span><span>compaction</span></span></span><span>（压缩摘要）、</span><span><span><span>label</span></span></span><span>（给某条消息打标签），以及一类专门用来记录"当前位置"的条目。但不管哪种，每个条目都带同样的两个关键字段：</span></p>

<pre id="f-doxcn5C5Uu1NaZmlefoa00YRDie"><code>{ "id": "条目自己的ID", "parentId": "我接在哪个条目后面", "type": "message", ... }</code></pre>

<p id="f-doxcny4TDGQMVbsHpRV6LX6Bsxh"><span style="font-weight:bold"><span><span>parentId</span></span></span><span style="font-weight:bold"> 是整棵树的命脉</span><span>：它记录"我的父节点是谁"。一个扁平的文件，靠这一个字段就能还原出树形关系。</span></p>

<p id="f-doxcnV3fqRK3fPYRuvMAtVMrXWe"><span style="font-weight:bold">分支怎么长出来：正常是链，回头再接才分叉</span></p>

<p id="f-doxcnF7wQG67endN9MPOryDfctd"><span>新消息的 </span><span><span><span>parentId</span></span></span><span> 取自一个表示"当前位置"的指针——也就是"你现在站在树的哪个节点上"。正常聊天时，每发一条，新条目的 </span><span><span><span>parentId</span></span></span><span> 就指向上一条，于是连成一根链：</span></p>

<pre id="f-doxcnkQyew3IzwqXZ0VzJ3QeqWf"><code>A ← B ← C ← D     （正常对话，看起来就是直线）</code></pre>

<p id="f-doxcnCauEEfDCMmj3DlXCqdJ2yf"><span>分叉发生在你</span><span style="font-weight:bold">回到中间某个节点再往后发</span><span>的时候。假设你回到 B，然后发了新消息 E，此时 </span><span><span><span>E.parentId = B</span></span></span><span>：</span></p>

<pre id="f-doxcnZTBPg4085Mu2QTl7uOuUte"><code>        C ← D      ← 老分支（C 的父节点是 B）
       /
A ← B
       \
        E          ← 新分支（E 的父节点也是 B）</code></pre>

<p id="f-doxcn6ROAgOUqkB9uEHi6TIUPYf"><span>B 一下子有了两个孩子 C 和 E——</span><span style="font-weight:bold">分叉就这么出现了</span><span>。注意：老分支 C、D </span><span style="font-weight:bold">一行都没被删</span><span>，仍然躺在同一个文件里。所谓"会话树"，就是这样从一个扁平文件里自然浮现出来的。</span></p>

<p id="f-doxcn0QgSRlfbzAhJ8d7K7v196z"><span style="font-weight:bold">回退怎么实现：不删数据，只挪一个指针</span></p>

<p id="f-doxcn2sbbNPzKaxFgGGcRTId2Hb"><span>这里是最关键、也最反直觉的一点。Pi 的回退</span><span style="font-weight:bold">不删除任何历史</span><span>，它做的只是两步：往文件追加一行"我把当前位置挪到 X 了"，然后把内存里的"当前位置"指针指向 X。仅此而已。</span></p>

<p id="f-doxcnXZHuJ9HcMVxg2O3bYJ5d5c"><span>那为什么回退后，模型就"忘掉"了被抛弃的那条分支？因为</span><span style="font-weight:bold">喂给模型的上下文，从来不是整棵树，而是从当前位置顺着 </span><span style="font-weight:bold"><span><span>parentId</span></span></span><span style="font-weight:bold"> 一路爬到根的那一条链</span><span>。源码里就是一个 while 循环：从当前节点出发，不断取 </span><span><span><span>parentId</span></span></span><span> 找父节点，直到根，沿途收集到的条目就是这一轮的上下文。</span></p>

<p id="f-doxcngk52faonXC7jeVSsIBnGkh"><span>于是：</span></p>

<ul><li id="f-doxcn8Tm50KJz6CFIMFZ698nMLf"><span>你站在 E 这条分支 → 模型看到 </span><span><span><span>A → B → E</span></span></span><span>，</span><span style="font-weight:bold">完全看不到 C、D</span><span>。</span></li></ul>

<ul><li id="f-doxcnE2h7QgRwh6WYlHZptQevtd"><span>你回到 D → 模型看到 </span><span><span><span>A → B → C → D</span></span></span><span>，这次轮到 E 不在路径上。</span></li></ul>

<p id="f-doxcnuaf6fSUG5yHWwYJUnYJate"><span style="font-weight:bold">这就是"回退让上下文变干净"的真相</span><span>：不是谁删了数据，而是取上下文时只走当前这一条根路径，被你放弃的分支天然不在路径上。文件里其实什么都没少。</span></p>

<blockquote id="f-doxcnKSXKvedSnjgLcwuJ43ZJ7f"><p id="f-doxcnd4ybiJCSrM7fGrKQMtBwPc"><span>一句话记忆：</span><span style="font-weight:bold">树是存储形态（文件里所有分支都在），链是喂给模型的形态（只取当前节点到根的一条）。</span></p></blockquote>

<div id="f-doxcnhgw9QmgdogY3hanoT3ZAeg"><img alt="" decoding="async" height="853" loading="lazy" src="/images/agent-learning/0f147092332423dbc161b9d2.png" width="1280"/></div>

<p id="f-doxcngqgq6tHCjbR0iF57N1QZmr"><span style="font-weight:bold">如果中间发生过压缩：树里会多出一个 compaction 节点</span></p>

<p id="f-doxcnTTWJmiXACB5sxzvfhcMVfN"><span>前面讲了两种"动作"在文件里的样子：正常聊天往链尾接消息节点，回退则追加一行"挪指针"。你迟早会遇到第三种节点——</span><span style="font-weight:bold">压缩（compaction）节点</span><span>。它的存储套路和前两种一模一样，在这里先把"它长什么样、爬链时怎么被用"讲清楚；到了 3.6，就只剩"什么时候压、压哪一段"这种纯策略问题了。</span></p>

<p id="f-doxcnV1kTvxl7SburJojNrpFNid"><span style="font-weight:bold">压缩节点也只是往链尾又 append 的一行。</span><span> Pi 决定压缩时，不删任何旧消息，只是造一个 `compaction` 节点追加到文件末尾，`parentId` 指向"压缩那一刻的最新消息"。假设压缩前是这样：</span></p>

<pre id="f-doxcncUo2ogluMpFJFgsb4kihEd"><code>A ← B ← C ← D        （D 是当前 leaf）</code></pre>

<p id="f-doxcnAFMk1JEceklDxvJ1W77Fug"><span>压缩后，文件只多了一行 K：</span></p>

<pre id="f-doxcndhu7Ir9xmSXW0r2j43Sr7c"><code>A ← B ← C ← D ← K        （K.type = "compaction"，K.parentId = D，K 成为新 leaf）</code></pre>

<p id="f-doxcntuQ2Vmsc9fsWo0CLksJLQd"><span>A、B、C、D </span><span style="font-weight:bold">一个字都没改</span><span>，K 只是又一行追加。之后你再发消息 E，照常接在 leaf 后：`…D ← K ← E`。</span></p>

<p id="f-doxcnM1BYpo4fH8nCu86PuZbuTg"><span style="font-weight:bold">K 节点里装了什么？</span><span> 看源码 `types.ts` 的 `CompactionEntry`，关键就两样：</span></p>

<pre id="f-doxcnNcFLMxKMMkZQ6xNnhl25Pb"><code>{
  "type": "compaction", "id": "K", "parentId": "D",
  "summary": "## Goal … ## Progress …",   // 摘要文本：把更早的历史总结成结构化文字
  "firstKeptEntryId": "C"                  // 保留起点：从 C 起的原文留着，比 C 更早的用摘要顶替
}</code></pre>

<p id="f-doxcn4pcDk4tChDJQqHUWuLRvuc"><span>注意它</span><span style="font-weight:bold">不存被压缩消息的副本</span><span>，只存一段 `summary` 加一个指针 `firstKeptEntryId`。这个指针是钥匙：它把链切成两段——`firstKeptEntryId`（这里是 C）</span><span style="font-weight:bold">之前</span><span>的（A、B）将被摘要替换，从 C 起的原文继续保留。</span></p>

<p id="f-doxcnquKSSiMCuyEUXSMNe0jc9e"><span style="font-weight:bold">压缩在哪一步真正生效？还是在"爬链取上下文"那一步。</span><span> 回退小节说过，喂给模型的上下文是 `getPathToRoot` 从 leaf 爬到根的那条链。现在链上多了个 K，爬出来是完整的 `A → B → C → D → K → E`（compaction 节点本身也在链里）。魔法在下一步 `buildSessionContext`（session.ts）：它把这条链翻译成"喂给模型的消息"时，遇到 compaction 节点会特殊处理—</span></p>

<div style="margin-left:25px"><p id="f-doxcn4UaTe3tkhHIJEkLb9nbQ0b"><span>1. 先放一条</span><span style="font-weight:bold">摘要消息</span><span>（K 里的 `summary`），代表被压掉的早期历史；</span></p><p id="f-doxcnnyTjexK5xTwugUBil0LtNg"><span>2. 再接 `firstKeptEntryId` 到 K 之间的</span><span style="font-weight:bold">原文</span><span>（C、D）；</span></p><p id="f-doxcnaHczybsmpLhlbcO0c8Rsvg"><span>3. 最后接 K 之后的</span><span style="font-weight:bold">新消息</span><span>（E）。</span></p></div>

<p id="f-doxcnFPtk6pnyWVh0PLqPi2Lq8b"><span>于是模型实际看到的是 </span><span><span><span>[摘要] → C → D → E</span></span></span><span>，而不是 </span><span><span><span>A → B → C → D → E</span></span></span><span>。A、B 仍原原本本躺在文件里，只是这一次没被翻译进上下文。</span></p>

<p id="f-doxcnWaFGmMzNptJPOBB7eLMAYe"><span style="font-weight:bold">把回退和压缩并在一起看，其实是同一招：</span></p>

<blockquote id="f-doxcnq0RFjDkO2gZew5KSoK08gf"><p id="f-doxcna67DvwuK1p7UxjzB3MkbZd"><span>文件永远只追加、从不改写；所有"看起来像删除或改写历史"的效果，</span><span style="font-weight:bold">都发生在"取上下文"那一步，而不是动文件</span><span>。回退改的是"从哪个节点开始爬"；压缩则是在链里埋一个 compaction 节点，爬到它时把它前面的原文换成一句摘要。两者都没动磁盘上的一个字节。</span></p></blockquote>

<p id="f-doxcnhUfZSjnfPV7YU37pln6Uoh"><span>记成一句话：</span><span style="font-weight:bold">回退换起点，压缩换中段——但文件本身，永远只增不改。</span></p>

<p id="f-doxcnSgVpubS0yDNfF192lwO2se"><span>对照上面那张"未压缩"的图，这张图画的就是</span><span style="font-weight:bold">发生压缩后</span><span>的样子：链尾多出一个 `compaction` 节点 K，它带着 `firstKeptEntryId` 指针把历史切成两段，于是喂给模型的上下文从"整条原文链"变成了"摘要 + 最近原文"。</span></p>

<div id="f-doxcnUiaiN3ZDD0iYVBFS7Yi8oh"><img alt="" decoding="async" height="853" loading="lazy" src="/images/agent-learning/cab22440a0df17339130e5bd.png" width="1280"/></div>

<p id="f-doxcnFhkA6EJVhfrglS00gPme6e"><span style="font-weight:bold">一个重要的边界：回退只回退对话，不回退代码</span></p>

<p id="f-doxcnVqOUeiWOAjWfwxlte4PzYf"><span>上面说的回退，全程只在动会话文件里的指针——</span><span style="font-weight:bold">它不会碰你工作区里的代码文件</span><span>。也就是说，如果 Agent 在 C、D 两步里改过 `main.py`，你回退到 B，对话回到了 B 时的样子，但磁盘上的 `main.py` 还是被改过的版本。Pi 的内核里</span><span style="font-weight:bold">没有任何"文件快照"机制</span><span>。</span></p>

<p id="f-doxcnPvuVqpnTGHNc4nuloKPGth"><span>这是</span><span style="font-weight:bold"> Pi 极简内核哲学的一个典型取舍</span><span>：它不把"还原代码"塞进内核，而是把这件事留给扩展。官方就给了一个示例扩展，思路很直接——</span><span style="font-weight:bold">用 git 来记代码快照</span><span>：每一轮 Agent 动手前，先用 `git stash create` 给当前代码打一个快照，并和"当前会话节点"建立对应关系（一张"会话节点 → 代码快照"的表）；等你回退到某个节点时，再把那一刻的代码 `stash apply` 回来。于是几十行扩展，就把"对话 + 代码一起回退"补齐了。</span></p>

<p id="f-doxcnLEGjbkMablrMScYxvyop3b"><span>对比一下 Claude Code 会更清楚两条路线：</span></p>

<p id="f-doxcnHmPvv8xi02OkHnwMAQpSeb"><span>- </span><span style="font-weight:bold">存储格式上，两者几乎一样</span><span>：都是 JSONL、只追加，每条记录带父指针（Pi 叫 `parentId`，CC 叫 `parentUuid`），都能还原成一棵会话树，回退都不删历史。</span></p>

<p id="f-doxcnb5JMkWoTM8AVQP7NfHmoag"><span>- </span><span style="font-weight:bold">区别在回退要不要还原代码</span><span>：Claude Code 的回退</span><span style="font-weight:bold">内核自带文件快照</span><span>，能把对话和代码文件一起还原；Pi 的内核只回退对话，想连代码一起回退得靠扩展（借助 git）补上。</span></p>

<p id="f-doxcnk6eLxa4b304JzOoPIq6vcc"><span>一句话：</span><span style="font-weight:bold">底层存储是同一套思想，差别在于"回退"这个动作覆盖到哪——只回对话，还是连代码一起回。</span></p>

<blockquote id="f-doxcntTZvvMb7wmRktgXkju5q7x"><p id="f-doxcnkFHrm6Yq1hLEhU3i55rMhe"><span>源码入口：</span><span><span><span>packages/agent/src/harness/session/jsonl-storage.ts</span></span></span><span>（</span><span><span><span>appendEntry</span></span></span><span> 追加、</span><span><span><span>setLeafId</span></span></span><span> 移动指针、</span><span><span><span>getPathToRoot</span></span></span><span> 取链）、</span><span><span><span>session.ts</span></span></span><span>（</span><span><span><span>appendCompaction</span></span></span><span> 追加压缩节点、</span><span><span><span>buildSessionContext</span></span></span><span> 把链翻译成上下文并处理 compaction）、</span><span><span><span>types.ts</span></span></span><span>（</span><span><span><span>CompactionEntry</span></span></span><span> 的 </span><span><span><span>summary</span></span></span><span> / </span><span><span><span>firstKeptEntryId</span></span></span><span> 字段定义）；代码回退的示例扩展见 </span><span><span><span>packages/coding-agent/examples/extensions/git-checkpoint.ts</span></span></span><span>。</span></p></blockquote>

<a id="f-doxcnri1tUxdqtgmmrCAZfshkhf"></a>

##### Compaction

<p id="f-doxcnReBXs8DTdyMwxQEtOm2Qgd"><span>对话变长以后，Agent 不能无限把完整历史塞进模型。Pi 的做法是 compaction：把较早的一段历史总结成摘要，然后用"摘要 + 最近原文"继续对话。</span></p>

<p id="f-doxcnXMrZRaM3DtcRn53HMZZ8te"><span style="font-weight:bold">压缩节点在 session tree 里长什么样、爬链时怎么用摘要顶替历史，已经在 3.5 讲过</span><span>（就是那个 `compaction` 节点 + `firstKeptEntryId` 指针的机制）。所以这一节不再重复"存储形态"，只回答两个纯策略问题：</span><span style="font-weight:bold">什么时候压、压哪一段。</span><span> 一句话接住 3.5：压缩不删历史，只是在链尾埋一个摘要节点，下一次爬链取上下文时用它顶替早期原文。</span></p>

<p id="f-doxcng2UwXzHlTv6xMljCxIl6WK"><span style="font-weight:bold">什么时候压缩？——触发时</span></p>

<p id="f-doxcnBiEWtKSygIwdxfRBKOV7Li"><span>Pi 不会在每个工具调用之间反复算上下文，而是只在</span><span style="font-weight:bold">轮次边界</span><span>检查，主要是两个点：</span></p>

<div style="margin-left:25px"><div id="f-doxcn2jvosQecf9EgZPgx6KP5tg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">a.</span><div><span>一轮 Agent 结束后（模型回复完、工具循环也跑完）。</span></div></div><div id="f-doxcnFLSdJezI0Q5zJNLDU9YgUe" style="display:flex;gap:0.5em"><span style="min-width:1.5em">b.</span><div><span>用户下一次发送 prompt 前，避免新一轮刚开始就把上下文撑爆。</span></div></div></div>

<p id="f-doxcnpIgzbJHErLwTifbEkOLwNf"><span>除此之外，也可以手动触发，扩展系统也能在合适时机调用压缩。值得一提的是：</span><span style="font-weight:bold">**判断"要不要压"的逻辑不在内核 harness 里，而在应用层（`coding-agent`）。**</span><span> harness 只提供两样东西——一个纯函数 `shouldCompact()` 做判定、一个 `compact()` 执行动作；至于"每轮结束后该不该调它"，是 `coding-agent` 在每个 assistant 回合结束时决定的。这也呼应了 Pi"极简内核、策略外置"的一贯取舍。</span></p>

<p id="f-doxcnvQwOgiKTfSFlw4flufEzPe"><span style="font-weight:bold">什么时候压缩？——触发阈</span></p>

<p id="f-doxcnSxkiRu2iVSLHGJ9vIQXbYb"><span>判定函数 </span><span><span><span>shouldCompact()</span></span></span><span> 的条件很直白（</span><span><span><span>compaction.ts</span></span></span><span>）：</span></p>

<pre id="f-doxcn7nNbNQvwLUFQJMJqcnwfHd"><code>contextTokens &gt; contextWindow − reserveTokens</code></pre>

<p id="f-doxcn2P79FJgiAl3aMUHKb1FJDg"><span>也就是"当前上下文 token 数，超过了模型上下文窗口减去预留量"。`reserveTokens` 默认 </span><span style="font-weight:bold">16384</span><span>，这块预留是留给压缩本身的——生成摘要要发一次请求、也要容纳摘要输出，不能等真的撑满了才动手。</span></p>

<p id="f-doxcn56AXHFH9yZFkKWvCQbxSih"><span><span><span>contextTokens</span></span></span><span> 用什么算？</span><span style="font-weight:bold">**优先相信模型返回的真实 `usage`**</span><span>（`totalTokens`，或 `input + output + cacheRead + cacheWrite` 相加），这是最准的。只有两种情况退回字符数估算（约"字符数 ÷ 4"）：一是请求报错、根本没拿到 usage（比如 529）；二是需要估算"保留最近哪一段"时。还有一种是模型直接报 context overflow 错误，这时不等阈值、立即压缩，并自动重试一次刚才失败的请求。</span></p>

<p id="f-doxcnicMv2Fnd36W3bYEav8tiLb"><span style="font-weight:bold">压缩哪一段？——保留窗口与切点</span></p>

<p id="f-doxcnJKLl4jTDVfUtx3kEeBkTGh"><span>Pi 不是把全部历史都压成摘要，而是</span><span style="font-weight:bold">保留最近一段原文、只压更早的部分</span><span>。保留多少由 `keepRecentTokens` 控制，默认 </span><span style="font-weight:bold">20000</span><span>。具体做法是从最新消息往回累加 token，攒够 2 万就停，这个点之后保留原文、之前交给摘要（对应 3.5 里那个 `firstKeptEntryId` 指针）。</span></p>

<blockquote id="f-doxcnS9h7TMTRwRyAubZFDUGQZf"><p id="f-doxcn9Tst4KczkzotMCh6wo1Y1f"><span>这个下面的规则其实就比较细节了，和具体的存储粒度（你是以整个提问-回答为粒度存，还是以每一次小的llm返回为粒度存），以及具体的细节，如何避免切坏语义。通常面试官不会问这么细致，这个也和具体业务场景要求相关。我们理解规则灵活运用。</span></p>
</blockquote>

<p id="f-doxcnxIXCqvg4UOX1aDikcwVWLe"><span>但切点不能乱下刀，有两条硬规则：</span></p>

<div style="margin-left:25px"><p id="f-doxcn8yXeWIhDPf7bFJ2jc8hhTe"><span>- </span><span style="font-weight:bold">不能切断工具调用对。</span><span> assistant 发起 tool call、紧跟着 tool result，这两者语义上是一组。Pi 选切点时只认合法边界（user / assistant 等消息边界），</span><span style="font-weight:bold">**明确不把 `toolResult` 当切点**</span><span>，避免只留下半截调用链、把上下文弄坏。</span></p><p id="f-doxcnsabp3pD6dni0iyDjuTKT7g"><span>- </span><span style="font-weight:bold">回合被切到一半要补救。</span><span> 如果按 token 算出的切点正好落在某一轮任务中间，Pi 会把这一轮的前半段</span><span style="font-weight:bold">单独再摘要一次</span><span>，让保留下来的后半段原文还能接得上，不至于"开头没了、中间突然冒出来"。</span></p></div>

<p id="f-doxcnsbnsAGwJ4fIDFEkZT0P4Af"><span style="font-weight:bold">摘要里写什么？——提示词的核心思想</span></p>

<p id="f-doxcnUpg66mmLZolWRyU58OhVUg"><span>Pi 的摘要</span><span style="font-weight:bold">不是一句"帮我总结上文"</span><span>，而是给压缩模型一份措辞严格的提示词，核心思想就一句话：</span><span style="font-weight:bold">别续写对话，只产出一份"交接班用的结构化检查点"，让另一个 LLM 能照着它无缝接手工作。</span><span> 系统提示词开宗明义就强调这一点（原文大意）：</span></p>

<blockquote id="f-doxcn8eGkP6kvtuy25GdMUhcVEf"><p id="f-doxcn7oPTbjPgCIs9Of3uJlNNXd"><span>你是一个上下文摘要助手。读完这段对话后，</span><span style="font-weight:bold">只</span><span>按指定格式输出结构化摘要。</span><span style="font-weight:bold">不要</span><span>继续对话，</span><span style="font-weight:bold">不要</span><span>回答对话里的任何问题。</span></p></blockquote>

<p id="f-doxcnq6YGTE7HL85E0NRgni8tzd"><span>为什么这么强调"不要续写"？因为压缩复用的是同一个对话补全接口，模型很容易把这段历史当成"该我接话了"而真的去回答问题——那摘要就毁了。所以提示词反复用大写 </span><span><span><span>Do NOT</span></span></span><span> 把它摁住。</span></p>

<blockquote id="f-doxcn7yuGM9ZxhLi60KGa0s8v8d"><p id="f-doxcnKOwWT3nlgGiXv1cUbOfHhe"><span>这个模板也可以稍微记一下，如果面试问你是怎么压缩的，要记录哪些东西，就是从这里回答。</span></p></blockquote>

<p id="f-doxcnhVjOjqWLYIZb4r7rpHorjf"><span>真正的摘要提示词要求模型按</span><span style="font-weight:bold">固定模板</span><span>输出，骨架是这几节（这就是压缩策略的"信息取舍"——它规定了什么必须留下来）：</span></p>

<pre id="f-doxcnLvPnr5CjtMEk0uYj6xBI5f"><code>## Goal             目标：用户到底想完成什么
## Constraints &amp; Preferences   约束与偏好：用户提过的要求、限制
## Progress         进度：### Done 已完成 / ### In Progress 进行中 / ### Blocked 卡住
## Key Decisions    关键决策：做了什么选择、为什么
## Next Steps        下一步：接下来该干什么（有序列表）
## Critical Context  关键上下文：继续工作必需的数据、引用</code></pre>

<p id="f-doxcnwFKVCjn6VzExhEMXr0ReBb"><span>模板末尾还有一句对 Coding Agent 极其关键的硬要求:</span><span style="font-weight:bold">"原样保留精确的文件路径、函数名、错误信息"</span><span>——这些细节一旦被模型"复述走样",接手的 Agent 就会找错文件、改错函数,所以提示词专门点名它们不许概括。</span></p>

<p id="f-doxcnSfTNRja9fQw8IkMooTIuNf"><span>一句话抓住提示词策略:</span><span style="font-weight:bold">它不是压缩文字长度,而是把一段冗长对话"蒸馏"成一份带固定栏目的工作交接单——目标、进度、决策、下一步、以及不许走样的路径/函数/报错。</span></p>

<p id="f-doxcnrxyzGfs1gOF5a7yO8U4rjd"><span style="font-weight:bold">同步还是异步？</span></p>

<p id="f-doxcnojZMHqyeuH3plS9uyPk4Me"><span>从 Agent 主流程看，压缩是一个</span><span style="font-weight:bold">需要等待</span><span>的步骤——摘要本身要再调一次模型生成，没生成完就不能安全进入下一轮。所以一旦决定压缩，会先暂停对话，等摘要生成、写入 compaction 节点、重建上下文，再继续。但它不是每轮都阻塞：只有真到阈值才触发，平时到边界点检查一下、没超标就直接继续。区别在于——上下文已经溢出时，压完会自动重试刚失败的请求；只是预防性接近阈值时，压完让下一轮从新上下文继续即可。</span></p>

<p id="f-doxcnOwu8yEbpAU4b22BHvyIObe"><span>下面这张图把整个压缩策略串成一条流程：从"何时触发"的判定，到"压哪段、留哪段"的切点选择，再到提示词把历史蒸馏成结构化摘要，最后接回 session tree。</span></p>

<div id="f-doxcnjd4W9y5GP17uYUe7hHMW6f"><img alt="" decoding="async" height="853" loading="lazy" src="/images/agent-learning/3162f203f264ca95dcc572bc.png" width="1280"/></div>

<p id="f-doxcnj1NyFYQvXuJY465MnspJsQ"><span>总结：</span><span style="font-weight:bold">Pi 的 compaction 是在轮次边界触发、由应用层按 `contextTokens &gt; contextWindow − reserveTokens` 判定、会等待模型生成摘要的上下文重写步骤；它保留最近约 `keepRecentTokens` 的原文、只压更早的前缀，切点避开工具调用对，并把摘要作为新的会话节点接进 session tree（存储细节见 3.5）。</span></p>

<blockquote id="f-doxcn3IfrGv09UHtEq124LiJOAh"><p id="f-doxcny7S2ucCSxTYgBgXKukCGng"><span>源码入口：</span><span><span><span>packages/agent/src/harness/compaction/compaction.ts</span></span></span><span>（</span><span><span><span>shouldCompact</span></span></span><span> 阈值判定、</span><span><span><span>findCutPoint</span></span></span><span> 选切点、摘要 prompt 模板与生成）、</span><span><span><span>packages/coding-agent/src/core/agent-session.ts</span></span></span><span>（每轮结束的检查与自动压缩流程）、</span><span><span><span>packages/coding-agent/src/core/session-manager.ts</span></span></span><span>（保存 compaction 节点）。对应视频文稿见 </span><span><span><span>PI Architecture explained.txt</span></span></span><span> 的 Compaction 段。</span></p></blockquote>

<a id="f-doxcnDAdCKID26udzFVJDoP6tgf"></a>

##### CLI 入口和三种运行模式

<blockquote id="f-doxcneaaDNvLd9OJKKg6He7ZQEy"><p id="f-doxcnRaXdURiKVXgrRYtOLOTuj5"><span>在看这个章节前，我想请大家思考一个问题？如果你设计了一个coding Agent。你怎么设计这个架构，让它既可以作为一个独立的Agent产品用，又能够像一个插件一样，方便地给到其他的应用，比如Openclaw用，让其他进程能够快速集成Coding的能力？答案就在本小节，PI的这个设计方法值得我们学习。</span></p></blockquote>

<p id="f-doxcncBS6wfEbwXNMY4iP3VG61d"><span>输入 </span><span><span><span>pi</span></span></span><span> 后，入口主要在两个文件：</span></p>

<ul><li id="f-doxcn6x8GsiDglLkSuMxIANJzHf"><span><span><span>cli.ts</span></span></span><span>：接住命令，设置进程标题等，然后调用 </span><span><span><span>main</span></span></span><span>。</span></li></ul>

<ul><li id="f-doxcngezZmjjSJOJaEgRSCqLDYe"><span><span><span>main.ts</span></span></span><span>：解析参数，解析配置，找到工作目录，加载扩展，创建 agent session，然后按指定模式运行。</span></li></ul>

<p id="f-doxcnPz6VKmE4ARonOik7LI5Plb"><span>Pi 有三种运行模式：</span></p>

<p id="f-doxcnnIBwooYYqHsnnWuTWihuah"><span>- </span><span style="font-weight:bold">interactive</span><span>：默认模式，终端聊天界面。</span></p>

<p id="f-doxcnsr3yqCmqzyJqVVj9sB4vjh"><span>- </span><span style="font-weight:bold">RPC</span><span>：程序化调用，给其他程序当后端。比如说你的</span><span style="font-weight:bold">小龙虾</span><span>，你想外接一个 coding 的能力，就可以使用 PI 的 RPC 模式。</span></p>

<p id="f-doxcnF7Qjmnn7dYBq8gJEhcqQlh"><span>- </span><span style="font-weight:bold">print-stdio</span><span>：`pi "你的问题"`，打印答案后退出，接近传统 CLI。</span></p>

<p id="f-doxcn7y154KRStUky5EDlLgHFdd"><span>因为内核不绑定 UI，同一套 Agent Core 才能被这三种模式复用。</span></p>

<blockquote id="f-doxcn30xRn61IIQiQ5spKL8HxPg"><p id="f-doxcngSfeIdpcn2nhGGMbMbhqwf"><span>源码入口：</span><span><span><span>packages/coding-agent/src/cli.ts</span></span></span><span>、</span><span><span><span>packages/coding-agent/src/main.ts</span></span></span><span>。</span></p></blockquote>

<a id="f-doxcnWOq1joeWDlsYB7L76Wpgkf"></a>

##### TUI

<blockquote id="f-doxcnJRmvYQ2A4855eJjtNhz0Xg"><p id="f-doxcnSgCFi9NmQmiVATwSKRco7q"><span>TUI这里是负责前端的内容，我没有特别关注。我自己写的项目，前端的内容，完全没有看代码，面试也没问。如果你也不想学前端，也可以基本浏览一下本章节，大概知道它是用什么技术栈实现的就好。</span></p></blockquote>

<p id="f-doxcnRiWb8vMcynHCXPjXh4VsFc"><span>TUI 可以理解成"跑在终端里的前端"。但它不是我们平时说的 Web 前端，也不是 FastAPI 这种后端框架。FastAPI 是 Python 后端框架，通常负责 HTTP API；Pi 这里没有浏览器、没有 DOM、没有 HTML/CSS，也没有 React/Vue。</span></p>

<p id="f-doxcnMkNFVslLBVjldCgT9wI6Ah"><span>Pi 的 TUI 技术栈更准确地说是：</span></p>

<div style="margin-left:25px"><p id="f-doxcn487IVzPwXJrjC1r8Ieyyab"><span>- </span><span style="font-weight:bold">运行时</span><span>：Node.js。</span></p><p id="f-doxcnwbcNqpWAlghQDZwyiTS4rg"><span>- </span><span style="font-weight:bold">语言</span><span>：TypeScript。</span></p><p id="f-doxcn1E5zyShPAuYcyF3qGeIYse"><span>- </span><span style="font-weight:bold">UI 库</span><span>：自研的 `@earendil-works/pi-tui`。</span></p><p id="f-doxcn3UmZEB60C4PkbOgjQ6LC8f"><span>- </span><span style="font-weight:bold">渲染目标</span><span>：terminal，也就是用户当前的命令行窗口。</span></p><p id="f-doxcnRVRAZRpkojmP3MpY5Z3iCk"><span>- </span><span style="font-weight:bold">渲染方式</span><span>：输出 ANSI escape sequences，控制光标、颜色、清屏、局部刷新等终端行为</span></p></div>

<p id="f-doxcndzeCxSojnkDXMK483lv5KL"><span>所以它和 Web 前端的对应关系大概是这样（左边是 Web 前端，右边是 Pi TUI 里的对应物）：</span></p>

<div style="margin-left:25px"><div id="f-doxcn58RnoSsT45tAmk7UJvkOvc" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>浏览器 → 终端。</span></div></div><div id="f-doxcnJIVI24eI5SBZW3kp5pAszg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>DOM 节点 → 文本行和 ANSI 控制序列。</span></div></div><div id="f-doxcnyuNeeExKbqv4TBKa8H6Y1f" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>React/Vue 组件 → </span><span><span><span>Component</span></span></span><span> 对象。</span></div></div><div id="f-doxcnQOm0U6HnqyRNFsf5cjKRpe" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>CSS 样式 → ANSI 颜色、粗体、下划线等。</span></div></div><div id="f-doxcnMQHg010gAslIrHqESBmOWe" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>鼠标/键盘事件 → stdin 里的按键序列。</span></div></div><div id="f-doxcnGjm8joLp6nQmv3IA5Nj1Tc" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>重新渲染页面 → 重新计算终端文本并差分刷新。</span></div></div></div>

<p id="f-doxcnKLzrXSBQs1tu3SLMm59Sxc"><span><span><span>@earendil-works/pi-tui</span></span></span><span> 里最核心的抽象是 </span><span><span><span>Component</span></span></span><span>。一个组件只需要实现 </span><span><span><span>render(width)</span></span></span><span>，返回一组字符串；如果它需要处理输入，就再实现 </span><span><span><span>handleInput(data)</span></span></span><span>。输入框、Markdown 消息、选择器、弹窗、底部状态栏，本质上都是这种组件。</span></p>

<p id="f-doxcnP3DprIOcO2OLsju4ldvuMf"><span>Pi 没有用现成的 Ink 这类 React TUI 框架，而是自己实现了渲染器。这样做的好处是能更细地控制终端体验：比如差分渲染，只刷新变化的行；同步输出，减少闪烁；处理 bracketed paste；支持 Kitty / iTerm2 图片协议；处理复杂按键和终端尺寸变化。</span></p>

<p id="f-doxcn4bXX8ToEboClv7dlXexTSg"><span>在架构上，TUI 不直接负责 Agent 推理。它只是 interactive mode 的界面层：用户在编辑器里输入 prompt，TUI 把输入交给 Agent Session；Agent Session 在运行过程中发出事件，比如消息更新、工具开始、工具结束、压缩完成；TUI 订阅这些事件，把它们渲染成终端里的消息流、工具执行块、底部状态栏和各种弹窗。</span></p>

<p id="f-doxcnxZSftSAHQ6fDPagnG4x9Qb"><span>一句话：</span><span style="font-weight:bold">Pi 的 TUI 是 TypeScript + Node.js 写的终端前端，不是 Web 前端；它用自研组件系统和 ANSI 终端控制序列，把 Agent Core 的事件实时画到命令行里。</span></p>

<blockquote id="f-doxcn9wEwIou5DItuhgcy3KsAdg"><p id="f-doxcnBGq5oB0XRFx8ncCnHQuENf"><span>源码入口：</span><span><span><span>pi/packages/tui/src/</span></span></span><span>（自研 TUI 框架，重点看 </span><span><span><span>tui.ts</span></span></span><span>、</span><span><span><span>terminal.ts</span></span></span><span>、</span><span><span><span>components/markdown.ts</span></span></span><span>）、</span><span><span><span>pi/packages/coding-agent/src/modes/interactive/interactive-mode.ts</span></span></span><span>（Pi 具体的交互界面如何组装）。</span></p></blockquote>

<a id="f-doxcnvNVJQIPsETdskbyOwvVFyc"></a>

##### 多供应商抽象

<blockquote id="f-doxcnk3Iw4ce7Gi9AHfIe3rIp3d"><p id="f-doxcnwKbMkB2Jldss8mCdJXDVVe"><span>这里用的是</span><span style="font-weight:bold">策略+工厂模式</span><span>，和本节里</span><span style="font-weight:bold">RAG项目的思路</span><span>是一样的。我们RAG项目使用的是一次输入-输出，也没有ReAct，所以没有处理工具，流式SSE的内容，只用处理HTTP格式。不过思路是一样的。</span></p></blockquote>

<p id="f-doxcn5ei4kxDkdt21lc7hlBJscc"><span>最底层的 </span><span><span><span>pi-ai</span></span></span><span> 把不同 LLM 供应商统一成一套接口。OpenAI、Anthropic、Google、Bedrock、Mistral、Cloudflare 等供应商的 API 都不一样，但 Agent Core 不应该关心这些差异。它只需要调用一个统一入口：</span></p>

<pre id="f-doxcntoBoGjhYWxD2qNjYwaD1ih"><code>streamSimple(model, context, options</code></pre>

<p id="f-doxcnSWmwkgC8LvIiXmk4kGUPvg"><span>这里的核心思想就是策略模式：同一件事，也就是"调用模型并拿到流式回复"，底下可以有多种实现。Pi 不是用传统的"抽象基类 + 子类继承"来做，而是更 TypeScript 的写法：每个 provider 注册一组函数，比如 </span><span><span><span>stream</span></span></span><span> 和 </span><span><span><span>streamSimple</span></span></span><span>。运行时 </span><span><span><span>pi-ai</span></span></span><span> 根据 </span><span><span><span>model.api</span></span></span><span> 找到对应的 provider 函数，然后调用它。</span></p>

<p id="f-doxcnspOEX9pGe6tXxx1sHbi4Ug"><span>可以把流程理解成：</span></p>

<pre id="f-doxcn70YtSRg8Hq2I7u2w9S5l6e"><code>Agent Core
  -&gt; 调用 streamSimple(model, context, options)
  -&gt; pi-ai 根据 model.api 找到对应 provider
  -&gt; provider 把 Pi 的统一上下文转成供应商请求
  -&gt; 供应商返回流式结果
  -&gt; provider 再转回 Pi 的统一消息事件</code></pre>

<p id="f-doxcnkyBTyHErg6ezvSRUu503CS"><span>这里要注意区分 </span><span><span><span>provider</span></span></span><span> 和 </span><span><span><span>api</span></span></span><span>。</span><span><span><span>provider</span></span></span><span> 是模型来源，比如 OpenAI、Anthropic、OpenRouter、GitHub Copilot；</span><span><span><span>api</span></span></span><span> 是调用协议，比如 </span><span><span><span>openai-completions</span></span></span><span>、</span><span><span><span>openai-responses</span></span></span><span>、</span><span><span><span>anthropic-messages</span></span></span><span>、</span><span><span><span>google-generative-ai</span></span></span><span>。真正决定走哪套调用策略的是 </span><span><span><span>model.api</span></span></span><span>。这也解释了为什么很多不同供应商可以共用 OpenAI-compatible 的实现：它们来源不同，但 API 协议相近</span></p>

<p id="f-doxcndmZBpJUUOHXpDeL4uX0zhg"><span>provider 主要做的是"适配"。Pi 内部有统一的 </span><span><span><span>Context</span></span></span><span>、</span><span><span><span>Message</span></span></span><span>、</span><span><span><span>Tool</span></span></span><span>、</span><span><span><span>AssistantMessageEventStream</span></span></span><span>，但每家模型 API 的字段结构都不同。provider 要负责几件事：</span></p>

<div style="margin-left:25px"><div id="f-doxcncCf1HopvU8U7PzvMMwZCfe" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>把 Pi 的统一消息格式转成供应商请求格式。</span></div></div><div id="f-doxcn94ssUhFDvOjdOqdNjayshc" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>把</span><span style="font-weight:bold">工具定义</span><span>和</span><span style="font-weight:bold">工具调用</span><span>转成供应商支持的格式。</span></div></div><div id="f-doxcn7JthBCM1zevEu2Qd7BE0ec" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>把供应商的 streaming chunk 转成 Pi 统一的文本增量、工具调用增量、结束事件。</span></div></div><div id="f-doxcnhxJzHrArfG3MbIwyTYyz0f" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>把 token usage、stop reason、错误信息转成 Pi 内部统一结构。</span></div></div><div id="f-doxcn9NKTZv0GT9Pd7XvqqOnovb" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>处理每家特有的能力，比如 reasoning/thinking、prompt cache、图片输入、headers、OAuth、baseUrl 等。</span></div></div></div>

<p id="f-doxcnk9kxGMUCbGDk08340eeX3b"><span>所以对 Agent Core 来说，换模型就是换 </span><span><span><span>model</span></span></span><span>；对 </span><span><span><span>pi-ai</span></span></span><span> 来说，换模型就是根据 </span><span><span><span>model.api</span></span></span><span> 换一套 provider 策略。Agent loop 不需要知道底层是哪家模型，也不需要在主流程里写一堆 </span><span><span><span>if provider === "openai"</span></span></span><span> 这样的分支</span></p>

<p id="f-doxcnVvrcjMTydeo9awARO5Hjyd"><span>一句话总结：</span><span style="font-weight:bold">pi-ai` 用统一接口包住不同模型 API，provider 负责双向翻译：把 Pi 的统一格式翻译成供应商格式，再把供应商响应翻译回 Pi 的统一格式。</span></p>

<blockquote id="f-doxcnlff6wliDuxH4vTowoJIe8e"><p id="f-doxcn2KbY3eL75Az0BhGVvKEhPE"><span>源码入口：</span><span><span><span>pi/packages/ai/src/stream.ts</span></span></span><span>（统一入口）、</span><span><span><span>pi/packages/ai/src/api-registry.ts</span></span></span><span>（provider 注册表）、</span><span><span><span>pi/packages/ai/src/providers/</span></span></span><span>（各供应商适配实现）、</span><span><span><span>pi/packages/ai/src/models.ts</span></span></span><span>（模型注册表）。</span></p></blockquote>


<a id="section-0159"></a>
## 可扩展性

<a id="f-doxcnXmYKvG6eWcpiMegGlSG7Sd"></a>

<p id="f-doxcnObudBWn1ktfrGChjdvhXih"><span>第 3 章讲 Pi 由什么组成，这一章讲能力怎么接上去。Pi 和很多"功能默认全带"的 Agent 不同，它把大量能力留给扩展系统。</span></p>

<p id="f-doxcn6LhLngydv8G4FrzFAkIpUe"><span>一句话概括</span><span style="font-weight:bold">：agent loop 在运行过程中持续广播事件，扩展通过订阅事件、注册能力和 hooks，在不改内核代码的情况下改变 Pi 的行为。</span></p>

<div id="f-doxcnpCfyvTKnF7qUbCk0jE7T1g"><img alt="" decoding="async" height="853" loading="lazy" src="/images/agent-learning/1c5335a5e6a5a5eb1462b823.png" width="1280"/></div>

<a id="f-doxcnHlTPVpCdR1xXEBgiZL4XAd"></a>

##### 事件系统

<p id="f-doxcnOnzVMJVDgR1Tb3IJhb82sg"><span>Agent loop 运行时会不断发事件：agent 开始、每一轮开始和结束、消息开始、消息更新、消息结束、工具开始执行、工具执行中、工具执行完、模型切换、用户输入等。一共有 30 多种事件。</span></p>

<p id="f-doxcni3DLEK3xXb91sfrsp3wjfe"><span>底层事件总线在 </span><span><span><span>event-bus.ts</span></span></span><span>，实现很朴素。它是在 Node </span><span><span><span>EventEmitter</span></span></span><span> 上封了一层 </span><span><span><span>emit</span></span></span><span> / </span><span><span><span>on</span></span></span><span>，也就是发布订阅模式，再加一点错误隔离。某个订阅者抛错，不会直接拖垮整个 Agent。</span></p>

<p id="f-doxcn1g24TJIyr703NIPzew8Bre"><span>这套事件广播让扩展可以在工作流的很多位置插入逻辑。扩展和 hooks 都建立在这个基础上。</span></p>

<blockquote id="f-doxcnEFDAWPdQy1U0nf6IXdYDmg"><p id="f-doxcnJ2pqsFMQlkGzqHVanECZke"><span>源码入口：</span><span><span><span>packages/coding-agent/src/core/event-bus.ts</span></span></span><span>。事件定义在 </span><span><span><span>extensions/types.ts</span></span></span><span> 的 </span><span><span><span>ExtensionEvent</span></span></span><span> 联合类型里。</span></p></blockquote>

<a id="f-doxcnaT7MMCmU8hfkOiUZ8xJFxb"></a>

##### Extensions

<p id="f-doxcnyN5Q6O8FmaqPtFmXUpQCzf"><span>扩展本质上是一个 TypeScript 模块。它拿到 </span><span><span><span>pi</span></span></span><span> API 对象后，可以做这些事：</span></p>

<div style="margin-left:25px"><div id="f-doxcn2OOStbDOx1upSDBu1UFgge" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>注册工具：用 </span><span><span><span>registerTool</span></span></span><span> 给模型加新能力，比如 web search。</span></div></div><div id="f-doxcnQmmClcEQUUkgYvAC0lhvnc" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>订阅事件：用 </span><span><span><span>on</span></span></span><span> 在事件上挂回调。</span></div></div><div id="f-doxcngJkANA9aZqtUuYGmF1Opue" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>注册斜杠命令、快捷键和 CLI flag：对应 </span><span><span><span>registerCommand</span></span></span><span>、</span><span><span><span>registerShortcut</span></span></span><span>、</span><span><span><span>registerFlag</span></span></span><span>。</span></div></div><div id="f-doxcn0I0IYM568qskk430pHtjAc" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>注册或覆盖模型供应商：用 </span><span><span><span>registerProvider</span></span></span><span> 接入自定义代理、企业 SSO 等。</span></div></div><div id="f-doxcnzsd3sALkkBqIuATG3B16bd" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>注册自定义消息渲染器：用来改变某类消息在 TUI 里的显示方式。</span></div></div><div id="f-doxcnCkLno3SFHEuQk88pKtTlhb" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>操控 UI：弹选择框、确认框、输入框，设置页脚、页眉、状态栏和欢迎语。</span></div></div><div id="f-doxcn2kY2eZZp1bQDvO9KiAhPAh" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>改系统提示词、发消息、控制会话：比如新建、fork、导航、切换会话。</span></div></div></div>

<p id="f-doxcnyoQ66tANlfrvJsCQKGwbpe"><span>官方讲解里有两个例子很直观：一个是让 Pi 给自己写开机欢迎语扩展，每次启动显示一句随机 quote；另一个是写权限确认扩展，在执行 </span><span><span><span>rm -rf</span></span></span><span> 或 </span><span><span><span>git push -f</span></span></span><span> 之前先弹窗确认。类似功能在很多 Agent 里是内置项，在 Pi 里则是几十行 TypeScript 扩展。</span></p>

<blockquote id="f-doxcniAkInaX4Lzz812VaN0I3pg"><p id="f-doxcnH517RhaRGGR1qLUJZHKj3c"><span>源码入口：</span><span><span><span>packages/coding-agent/src/core/extensions/</span></span></span><span>，重点看 </span><span><span><span>loader.ts</span></span></span><span>、</span><span><span><span>runner.ts</span></span></span><span>、</span><span><span><span>types.ts</span></span></span><span>。API 全貌在 </span><span><span><span>types.ts</span></span></span><span> 的 </span><span><span><span>ExtensionAPI</span></span></span><span> 接口。</span></p></blockquote>

<a id="f-doxcnralM7XyJhN6JpY77piHpLf"></a>

##### Hooks

<p id="f-doxcnK4JtsjCtJmpC49etM4mdre"><span>订阅事件更像旁路观察；hooks 则可以拦截和改写数据。几个典型 hook 如下：</span></p>

<p id="f-doxcnGlzZ34r9mE2M8kx0zF6z1c"><span>- </span><span style="font-weight:bold">tool_call</span><span>：工具执行前，可以 `block` 阻止执行，也可以改写工具参数。</span></p>

<p id="f-doxcnPhjwE3ISmsTCNNdPJkLo8f"><span>- </span><span style="font-weight:bold">tool_result</span><span>：工具执行后，可以改写返回结果。</span></p>

<p id="f-doxcnMeVRNQRvnUSNVfz8Xkn5yb"><span>- </span><span style="font-weight:bold">context</span><span>：调用 LLM 前，可以改写即将发送的消息列表。</span></p>

<p id="f-doxcnfAWY3pc2CXtzNcMzl4GCQg"><span>- </span><span style="font-weight:bold">before_agent_start</span><span>：用户提交后、loop 启动前，可以改写本轮系统提示词或注入消息。</span></p>

<p id="f-doxcnEBSPXXu3SuBc6oqfNeZcdg"><span>-</span><span style="font-weight:bold">before_provider_request</span><span>：发请求给供应商前，可以替换 payload。</span></p>

<p id="f-doxcnlSsbOV1Pc2xaOUFOVDHLoh"><span>- </span><span style="font-weight:bold">session_before_compact / session_before_tree</span><span>：压缩或导航前，可以取消或自定义处理。</span></p>

<p id="f-doxcnjqLmIauW4ek0ju5XwfGldf"><span>权限确认扩展的实现思路就是挂在 </span><span><span><span>tool_call</span></span></span><span> 上：检测到危险 bash 命令就弹确认框，用户拒绝就返回 </span><span><span><span>block</span></span></span><span>。多个 hook 挂在同一事件上时，会按顺序链式执行。前一个 hook 的修改，后一个 hook 能看到</span></p>

<blockquote id="f-doxcnOmNIiReb3w8k3m3WjkVylf"><p id="f-doxcnU51vIyheKWE3NC1Yw0Pzrb"><span>源码入口：设计文档 </span><span><span><span>packages/agent/docs/hooks.md</span></span></span><span>，事件结果类型见 </span><span><span><span>extensions/types.ts</span></span></span><span> 里的各类 </span><span><span><span>*EventResult</span></span></span><span>。</span></p></blockquote>


<a id="section-0160"></a>
## 课后作业

<a id="f-doxcnSqNnfbDMEuquZd7J0AXcFh"></a>

<p id="f-doxcnH2eGxiQZ34RyOkKxVwRuTd"><span>通过这个小节，我是希望能带大家了解PI Agent的一个大概的思想和架构。如果你是想在这个基础上继续去扩展，深入学习，还是得靠大家。我总结了一些可以去做的扩展任务，包括让AI也总结出来了对应的参考代码和官方示例（可能不准）大家多包涵。</span></p>

<p id="f-doxcnTz3Tfjj1z5JsW4CO0ifU1e"><span>如果想在 Pi 基础上动手，可以按下面几个难度推进。下面每条都尽量附上了官方对应的示例扩展或文档，建议先读官方实现再动手——Pi 自带的示例很全，照着改往往比从零写更快。扩展 API 的全貌见 </span><span><span><span><a href="https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/extensions.md"><span>docs/extensions.md</span></a></span></span></span><span>，所有示例扩展都在 </span><span><span><span><a href="https://github.com/earendil-works/pi/tree/main/packages/coding-agent/examples/extensions"><span>examples/extensions/</span></a></span></span></span><span> 下。</span></p>

<p id="f-doxcn6XPeOUXg7rpVo1VSomhdAc"><span style="font-weight:bold">入门</span></p>

<ul><li id="f-doxcnkzRHsUeZfJq5zvyo6g8ymg"><span>加一个 web search 工具：用 </span><span><span><span>registerTool</span></span></span><span> 注册一个调用搜索 API 的工具。作者自己也提到过，这是他会装的一个常用扩展。参考最小自定义工具示例 </span><span><span><span><a href="https://github.com/earendil-works/pi/blob/main/packages/coding-agent/examples/extensions/hello.ts"><span>examples/extensions/hello.ts</span></a></span></span></span><span>；API 见 </span><span><span><span>extensions/types.ts</span></span></span><span> 的 </span><span><span><span>registerTool</span></span></span><span> 和 </span><span><span><span>ToolDefinition</span></span></span><span>。</span></li></ul>

<ul><li id="f-doxcnD3eVGlZkRrJkTPqT1dHYkb"><span>写一个开机欢迎语扩展：订阅 </span><span><span><span>session_start</span></span></span><span>，启动时随机显示一句 quote。参考 </span><span><span><span><a href="https://github.com/earendil-works/pi/blob/main/packages/coding-agent/examples/extensions/custom-header.ts"><span>examples/extensions/custom-header.ts</span></a></span></span></span><span>（演示 </span><span><span><span>ctx.ui.setHeader</span></span></span><span>）和 </span><span><span><span><a href="https://github.com/earendil-works/pi/blob/main/packages/coding-agent/examples/extensions/hello.ts"><span>hello.ts</span></a></span></span></span><span>。</span></li></ul>

<p id="f-doxcn9NTEpJk07GuoHgcrkca8QX"><span style="font-weight:bold">中级</span></p>

<ul><li id="f-doxcnv6u2ExCm0tRDd9T3XdPwnd"><span>权限确认弹窗扩展：挂 </span><span><span><span>tool_call</span></span></span><span> hook，检测危险 bash 命令，比如 </span><span><span><span>rm -rf</span></span></span><span>、</span><span><span><span>git push -f</span></span></span><span>，执行前弹窗确认，拒绝就 </span><span><span><span>block</span></span></span><span>。官方已有现成示例 </span><span><span><span><a href="https://github.com/earendil-works/pi/blob/main/packages/coding-agent/examples/extensions/permission-gate.ts"><span>permission-gate.ts</span></a></span></span></span><span>；相关的还有 </span><span><span><span><a href="https://github.com/earendil-works/pi/blob/main/packages/coding-agent/examples/extensions/protected-paths.ts"><span>protected-paths.ts</span></a></span></span></span><span>（拦截对 </span><span><span><span>.env</span></span></span><span>、</span><span><span><span>.git/</span></span></span><span> 等路径的写入）和 </span><span><span><span><a href="https://github.com/earendil-works/pi/blob/main/packages/coding-agent/examples/extensions/confirm-destructive.ts"><span>confirm-destructive.ts</span></a></span></span></span><span>（清空 / 切换 / fork 等危险会话操作前确认）。</span></li></ul>

<ul><li id="f-doxcnfCa5CyfcfzwsvIfS6QtcWo"><span>用 todo 工具替代内置 todo：Pi 内核没有内置 todo。官方示例 </span><span><span><span><a href="https://github.com/earendil-works/pi/blob/main/packages/coding-agent/examples/extensions/todo.ts"><span>todo.ts</span></a></span></span></span><span> 演示了一个完整的 todo 工具 + </span><span><span><span>/todos</span></span></span><span> 命令，带自定义渲染和状态持久化，可以直接参考。</span></li></ul>

<ul><li id="f-doxcnOxg7Kg5yUXnEOvrfhDYpqf"><span>自定义主题 / 状态栏：让 Pi 生成一套终端配色主题。入口 </span><span><span><span>getAllThemes</span></span></span><span> / </span><span><span><span>setTheme</span></span></span><span>，参考 </span><span><span><span><a href="https://github.com/earendil-works/pi/blob/main/packages/coding-agent/examples/extensions/mac-system-theme.ts"><span>mac-system-theme.ts</span></a></span></span></span><span>（跟随系统深浅色）、</span><span><span><span><a href="https://github.com/earendil-works/pi/blob/main/packages/coding-agent/examples/extensions/status-line.ts"><span>status-line.ts</span></a></span></span></span><span>、</span><span><span><span><a href="https://github.com/earendil-works/pi/blob/main/packages/coding-agent/examples/extensions/custom-footer.ts"><span>custom-footer.ts</span></a></span></span></span><span>。</span></li></ul>

<p id="f-doxcncAHsCLqrfgdmhbEjj0SR0d"><span style="font-weight:bold">进阶</span></p>

<ul><li id="f-doxcnnqEyiIjMQNUpbBvQxKkGfb"><span>MCP adapter：写扩展，把 MCP server 的工具桥接到 Pi 的工具系统。官方没有直接的 MCP 示例，但可以参考 </span><span><span><span><a href="https://github.com/earendil-works/pi/blob/main/packages/coding-agent/examples/extensions/dynamic-tools.ts"><span>dynamic-tools.ts</span></a></span></span></span><span>（运行时动态注册工具）和 </span><span><span><span><a href="https://github.com/earendil-works/pi/blob/main/packages/coding-agent/examples/extensions/ssh.ts"><span>ssh.ts</span></a></span></span></span><span>（把工具委派到外部进程）的写法。</span></li></ul>

<ul><li id="f-doxcnntGJnsKhfmGen2wY3qfR2c"><span>子代理：注册一个工具，工具内部再启动一个 Agent Core 实例处理子任务。官方有完整示例 </span><span><span><span><a href="https://github.com/earendil-works/pi/tree/main/packages/coding-agent/examples/extensions/subagent"><span>examples/extensions/subagent/</span></a></span></span></span><span>，演示带独立上下文窗口的子代理委派。</span></li></ul>

<ul><li id="f-doxcnqzNHb4rEwhgoV4gbEeoDah"><span>Plan 模式：用扩展实现"先出计划，确认后再执行"的工作流，Pi 默认没有这个模式。官方示例 </span><span><span><span><a href="https://github.com/earendil-works/pi/tree/main/packages/coding-agent/examples/extensions/plan-mode"><span>examples/extensions/plan-mode/</span></a></span></span></span><span> 实现了 Claude Code 风格的 </span><span><span><span>/plan</span></span></span><span>（只读探索 + 步骤跟踪）。</span></li></ul>

<p id="f-doxcnm4AV5uwoexEGwokVZYT3nX"><span>- 节点回退后文件也一起回退：如 1.2 所说，Pi 默认 fork / 回退</span><span style="font-weight:bold">只回退对话，不动工作区代码</span><span>。这个作业就是把代码也接上：订阅 `turn_start` 时用 `git stash create` 给当前代码打一个快照并和会话节点关联，在 `session_before_fork` 时用 `git stash apply` 把代码还原到那个节点。官方有现成示例 [`git-checkpoint.ts`](</span><span><span style="text-decoration: underline"><a href="https://github.com/earendil-works/pi/blob/main/packages/coding-agent/examples/extensions/git-checkpoint.ts"><span>https://github.com/earendil-works/pi/blob/main/packages/coding-agent/examples/extensions/git-checkpoint.ts</span></a></span></span><span>)，几乎可以直接用；另见 [`auto-commit-on-exit.ts`](</span><span><span style="text-decoration: underline"><a href="https://github.com/earendil-works/pi/blob/main/packages/coding-agent/examples/extensions/auto-commit-on-exit.ts"><span>https://github.com/earendil-works/pi/blob/main/packages/coding-agent/examples/extensions/auto-commit-on-exit.ts</span></a></span></span><span>)。</span></p>

<ul><li id="f-doxcnfAa3ZUArbh9NeCmN43e5oe"><span>用 RPC 模式接入你自己的 OpenClaw：Pi 的 Agent Core 可以脱离 TUI，被别的程序通过 RPC 当后端驱动（见 3.7 的三种运行模式）。这个作业是把你自己的前端 / 程序 OpenClaw 作为 RPC 客户端接进来，由它发消息、收事件，Pi 只当"无头大脑"。参考 RPC 协议文档 </span><span><span><span><a href="https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/rpc.md"><span>docs/rpc.md</span></a></span></span></span><span>，以及扩展侧 UI 示例 </span><span><span><span><a href="https://github.com/earendil-works/pi/blob/main/packages/coding-agent/examples/extensions/rpc-demo.ts"><span>rpc-demo.ts</span></a></span></span></span><span>（搭配 </span><span><span><span><a href="https://github.com/earendil-works/pi/blob/main/packages/coding-agent/examples/rpc-extension-ui.ts"><span>examples/rpc-extension-ui.ts</span></a></span></span></span><span> 一起看）。</span></li></ul>

<p id="f-doxcn37uuplqwgTAHGFnwvcIa4g"><span style="font-weight:bold">挑战</span></p>

<ul><li id="f-doxcnGrDI4rQrMGwI0SRCyxVBEb"><span>从零仿写一个极简 harness：照着 </span><span><span><span>agent-loop.ts</span></span></span><span> 的主干，用任意语言实现一遍 init context -&gt; call LLM -&gt; tool loop -&gt; reply，再加上 JSONL 树状会话。这个练习最能帮助你吃透 Agent 的基本运行方式。</span></li></ul>


<a id="section-0161"></a>
## 面试问题

<a id="f-doxcnR3KlechmazmdGOAiYzG05e"></a>

<blockquote id="f-doxcnIs1iQYcMEKH4xR9TtqQVnf"><p id="f-doxcnX0PR9FP7Wqt6dpzylTlcxb"><span>（答案是AI写的）下面的题目可以说是考察Agent项目的高频考点，我们在面经部分也根据不同项目总结过很多次了。下面这些问题结合当前项目，也就是假设这个项目是你自己做的，面试官问你项目相关问题，你的参考答案。</span></p></blockquote>

<p id="f-doxcnZtPpKMFAQnVyUYvuDoYw8f"><span>下面这些回答按"面试可以直接说"的口吻写，不追求把源码细节全背出来，重点是把设计思路讲清楚。</span></p>

<p id="f-doxcn7kP1EoIBrUiaG3zBdVKxxe"><span style="font-weight:bold">Q1：你的 Agent 的记忆功能是如何实现的？长短记忆的组成是什么？</span></p>

<blockquote id="f-doxcnmZJQphzaHfOEE0CAlLzNtf"><p id="f-doxcn8CqSBvODrH7KU7f5ovr5Bc"><span>其实长期记忆这里，当前项目只有Agent.md，没有自动维护的长期记忆，也就是这样你的Agent项目不记事，这个其实不好，显得项目不聪明。你可以自己扩展一下，答案还是基于当前项目如实回答。</span></p></blockquote>

<p id="f-doxcnn4PvcnMHLH0QR5x0ICRkBV"><span>答：我先说一个前提，模型本身是无状态的，它不记得上一轮说过什么，所以记忆其实是我每一轮调用模型前重新组装上下文喂进去的。我把记忆分成短期和长期两层。</span></p>

<p id="f-doxcn05MG0k2hJEzoqyDDnhyRPc"><span>短期记忆就是当前这次会话的内容：用户说过的话、模型的回复、每个工具的执行结果。它们都按"只追加 + 父指针"存在一个 JSONL 会话文件里，构成一棵会话树。每轮调用模型前，我从当前叶子节点沿父指针回溯到根，取出这条路径上的消息，组装成上下文。也就是说模型每轮看到的不是整棵树，而是当前分支这一条线。如果这条线太长，就会先做压缩，把旧消息换成摘要，这也是短期记忆的一部分。</span></p>

<p id="f-doxcnL4qjWB782wzAtOCGgp3sXe"><span>长期记忆是文件型的，跨会话存在。比如项目根目录的 AGENTS.md / CLAUDE.md、用户级的全局规则、还有 skills（技能说明）。这些不靠模型临时回忆，而是在我拼系统提示词的时候加载进去。值得一提的是 skills 是按需加载的：系统提示词里只放每个技能的名字、描述和文件位置，不放全文，模型觉得需要时再用 read 工具去读，这样能省上下文。</span></p>

<p id="f-doxcn2ZkKjnWuxjib6XlzTgfbOc"><span>一句话总结：短期记忆解决"这次对话进行到哪了"，靠会话树的当前分支；长期记忆解决"这个用户、这个项目长期有哪些规则和偏好"，靠加载文件型上下文。</span></p>

<p id="f-doxcnryQOxiqaDVUZdQs3MLsdKf"><span style="font-weight:bold">Q2：你的 Agent 压缩是如何做的？压缩策略和压缩时机是什么？</span></p>

<p id="f-doxcnfU7I4qKj8CAwvmnqBNfFxh"><span>答：压缩解决的是上下文越聊越长、最后超出模型窗口的问题。我的做法是把旧的历史消息交给模型，按一个固定模板总结成一份结构化摘要，然后用这份摘要替换掉那段原文，最近的消息则原样保留。</span></p>

<p id="f-doxcn1eGaZrmQLxwJtdUofBHkfd"><span>摘要不是随便总结，而是有固定章节的，比如 Goal（目标）、Constraints（约束）、Progress（已完成/进行中/受阻）、Key Decisions（关键决策）、Next Steps（下一步）、Critical Context（关键上下文），并且要求保留确切的文件路径、函数名、报错信息。这样换一个模型接着干也能续上。如果之前已经压过一次，下次是在旧摘要基础上增量更新，而不是从头再总结。</span></p>

<p id="f-doxcnx7w0SWEtmKRcKtRR0QCLmd"><span>时机上，判断是用 token 占比：当前上下文 token 超过"模型窗口减去预留量"就触发。token 怎么算很关键——我不是用字符数除以 4 去估，而是优先用模型每次返回的真实 usage（input、output、cache 读写几个字段相加），只有最后那几条还没有 usage 的消息才用字符估算补上，这样最准。</span></p>

<p id="f-doxcniJT4gdbomRlZBu18rNdr3d"><span>还有一个设计上的细节：判断"要不要压"的逻辑其实不在内核里。内核只提供两个能力——一个纯函数 </span><span><span><span>shouldCompact()</span></span></span><span> 做判定、一个 </span><span><span><span>compact()</span></span></span><span> 执行压缩；至于每轮结束后到底调不调，是上层应用决定的。压缩产生的摘要本身也作为一个节点追加进会话树，之后取上下文时用它替换被压缩的那段历史。</span></p>

<p id="f-doxcnttAiUhEGayjyiZviFWSjuh"><span style="font-weight:bold">Q3：你的 Agent 项目架构是什么？从 TUI 层讲到整体。</span></p>

<p id="f-doxcn1gEGYm4PXBPyfe2xouta3d"><span>答：整个项目是一个 monorepo，分四个包，依赖是单向的，从上到下。</span></p>

<p id="f-doxcnEwOdjAHQ1Xt0YOtUe2v2gH"><span>最上面是 TUI 层，一个自研的终端 UI 组件库，负责画界面。它的特点是差分渲染，每次只重画变化的部分，所以终端不闪烁。但 TUI 不直接调内核，它是通过订阅事件来工作的。</span></p>

<p id="f-doxcnbb6u5EGTMTNov7Hl2OYqIc"><span>中间是产品本体，也就是面向编码场景的 CLI，用户敲的命令入口就是它。它自己几乎不造轮子，而是把另外几个包装起来用：要画界面用 TUI，要智能用 agent core，要连大模型用最底层的 AI 包。它还负责加载扩展、管理工具、决定运行模式。</span></p>

<p id="f-doxcnWLRtu6vTbXoZQsTmmGVbdf"><span>再往下是 agent core，整个项目的中枢，里面是 agent loop、上下文组装、会话存储、压缩。关键点是它完全不碰终端——它只跑逻辑、广播事件，谁来渲染它不管。正因为这样，它能脱离 TUI 被复用：除了交互界面，还能用一次性打印模式（打印完就退），或者 RPC 模式给别的程序当后端。</span></p>

<p id="f-doxcnjHS5Atgn4KUiHYKQwiPZPh"><span>最底层是 AI 包，多供应商 LLM 抽象，把 OpenAI、Anthropic、Google 这些不同的 API 统一成一个接口。</span></p>

<p id="f-doxcnfqASc5yqR4qwaeO2LaeSlh"><span>所以从 TUI 往下看，本质是一条"事件驱动 + 单向依赖"的链路：内核在中间跑循环、发事件，UI 在外层订阅事件、画界面，两者解耦，这也是为什么同一套内核能配不同的前端。</span></p>

<p id="f-doxcnmhFgviTdpO2CtyY2SKtSYg"><span style="font-weight:bold">Q4：你的项目的 Agent 架构是什么？ReAct 是如何实现的？</span></p>

<p id="f-doxcnxjUEy27tC4z81Zf6yyThKc"><span>答：核心就是一个手写的 agent loop，本质是标准的 ReAct 循环：推理（调模型）和行动（调工具）交替进行。</span></p>

<p id="f-doxcn9WRosF4UZL0FmwZ47pACHd"><span>一轮的主干是这样：先组装上下文，检查要不要压缩，然后把上下文发给模型；模型流式返回后，我看它这次有没有发起工具调用。如果有，就执行这些工具，把结果作为新消息追加回上下文，再进入下一轮让模型接着看结果；如果没有工具调用，说明它要收尾了，就输出最终回复，循环结束。读写代码、跑命令这些真正的"行动"，都发生在工具这一步。</span></p>

<p id="f-doxcn2pHhWcv8aMiYSrDdIGQAkb"><span>实际实现里比这几句话要多考虑几件事，这也是我没直接用现成 SDK、而选择手写的原因——为了完全掌控这些细节：一是工具可以并行或串行执行，有些必须串行的工具会触发串行模式，避免抢同一份状态；二是支持运行中插话（steering），用户在模型干活时打字，我会在下一次模型响应前把这条消息插进去；三是支持收尾追问（follow-up），模型本来要停了，如果有排队的新消息会继续接着跑；四是随时能中断（abort）。这些逻辑集中在一个主循环函数里。</span></p>

<p id="f-doxcnISv9dPjpYVEyLKNpE9XLQc"><span>简单说，ReAct 在这里不是一个框架帮案例中的黑盒，而是一个我能看到每一步的 while 循环：模型想 → 调工具做 → 把结果还给模型 → 再想，直到它不再需要工具。</span></p>

<p id="f-doxcnqIpjznxTZPXVslioF13Dug"><span style="font-weight:bold">Q5：你的项目如何实现节点回退和会话恢复？存了什么，又如何恢复？</span></p>

<p id="f-doxcnTreo2bPAK6g0Ecc1mSDRVd"><span>答：这两个其实是同一套存储机制带出来的，关键在于会话不是存成一个线性列表，而是存成一棵树。</span></p>

<p id="f-doxcnx2LQsapboAcbbT4kieaBoe"><span>先说存什么。每次产生一条东西——用户输入、模型回复、工具结果、压缩摘要——我都立刻往一个 JSONL 文件追加一行，只追加、不修改、不删除。每条记录都带自己的 id 和一个父指针 parentId，指向它的上一条。靠这个父指针，一个扁平的文件就能还原成一棵树。</span></p>

<p id="f-doxcnJUEjPT3oCLE0XCbjOSje6Z"><span>会话恢复就是：重新打开时把文件一行行读出来，按 parentId 把树重建出来，然后从当前叶子节点沿父指针一路回溯到根，取出这条路径，就是要喂给模型的上下文。因为是 append-only，历史永远在，恢复不会丢东西。</span></p>

<p id="f-doxcn5PuIOdJQxCU3zAlx3yqlbc"><span>节点回退靠的是同一棵树。我想退回某个历史节点重新提问，新消息的父指针就指向那个旧节点，于是从那里岔出一条新分支，老分支还原封不动留着。fork、导航、克隆都是基于这种指针关系做的，不需要复制整段历史。</span></p>

<p id="f-doxcn0uqzPEdWhl65ylzVpk7uvh"><span>最后补一个我会主动说的点：默认情况下回退只回退对话，不会动工作区里的代码文件——因为内核只管会话树，不管文件快照。如果想让回退连代码也一起还原，需要用扩展接 git 来补，比如每轮用 git stash 打个快照、回退时再恢复。这是我刻意保留给扩展的，内核保持精简。</span></p>

<p id="f-doxcnjOPaT9vgbf0HAjYEviPOMe"><span style="font-weight:bold">Q6：你设计这个项目的整体思路是什么？</span></p>

<p id="f-doxcnlzeSxqhEPJbgfquSPyyngh"><span>答：一句话概括，我的设计理念是"极简内核 + 一切皆可扩展"。我不去猜用户需要什么，也不把功能一股脑塞进内核，而是先把内核做到最小，剩下的能力都通过扩展机制从外面接上。</span></p>

<p id="f-doxcn1rivrH3h8AUbGHSbQVYOph"><span>先说内核里留了什么。我只保留一个 Agent 跑起来必须有的东西：agent loop（ReAct 主循环）、上下文组装、会话存储、压缩、多供应商的模型抽象，以及最基本的几个工具——读、写、改、执行命令。除此之外，像权限弹窗、MCP、plan 模式、子代理、联网搜索这些，内核里一概没有。好处是内核小、容易读、容易测，攻击面也小；代价是开箱体验会显得空，但这是我故意的取舍。</span></p>

<p id="f-doxcnnL2sEdycSUklUCzAHNS93X"><span>再说可扩展怎么做，这是关键。我让 agent loop 在运行的每个阶段都广播事件——agent 开始、每轮开始结束、消息流、工具开始执行和执行完等等，一共三十多种。扩展就建立在这套事件广播之上，具体有两个层次。</span></p>

<p id="f-doxcnHzzGCe9Kj2lBnmzeFgMv3c"><span>一个是扩展（extension），本质就是一个 TypeScript 模块，拿到我的 API 对象后可以往里加东西：用 registerTool 加工具、registerCommand 加命令、registerProvider 接自定义模型供应商、注册自定义渲染器改界面，或者订阅事件做联动。另一个是 hooks，它比订阅事件更强，能拦截并改写数据：比如在工具执行前用 tool_call 拦下来做权限确认、在调模型前用 context 改写要发送的消息、在发请求给供应商前替换 payload。</span></p>

<p id="f-doxcncWieWfpkDXRvvNvUyArX1d"><span>把这两套机制摊开看，内核的每一个部分其实都开了扩展口子：要加能力就注册工具，要换模型就注册供应商，要改提示词就挂 context 或系统提示的 hook，要改压缩就自定义 compaction，要改界面就注册渲染器和页脚页眉，要管权限就挂 tool_call。所以那些"内核没有"的功能——权限、plan、MCP——都能用几十行扩展补回来，而且扩展本身也可以让 Agent 自己写。</span></p>

<p id="f-doxcniIRYT1rWhoXmwHX7ZSD12I"><span>总结一下：主线是把内核做小、只做必要的事；可扩展则是靠"事件广播 + 扩展注册 + hooks 拦截"这三件套，让模型调用、工具、上下文、压缩、界面、会话每一个环节都能在不改内核代码的前提下被替换或增强。</span></p>


<a id="section-0162"></a>
## 参考资料&amp;源代码

<a id="f-doxcn6DwVYDj06Rg5VMongRgLfg"></a>

<p id="f-doxcnRGnVqd5CexeDjmMx8uy1Xb"><span>主要参考了两个Youtube视频和源代码。参考视频不是说大家必须看，只是列出具体来源。</span></p>

<p id="f-doxcntsQYBpicKe1hdyM2nknBWs"><span>PS: YT视频需要科学上网。英文不怕，下方可以翻译成中文，现在在线翻译的还是比较准的</span></p>

<ul><li id="f-doxcnNyYGwKgqoupQUTPca6LFyb"><span><span><a href="https://www.youtube.com/watch?v=N30XGyPrr6I&amp;t=74s"><span>PI Agent Crash Course</span></a></span></span></li></ul>

<ul><li id="f-doxcn6LNgNNpMQw7USt0Da3Efsh"><span><span><a href="https://www.youtube.com/watch?v=gTeujlv8qK0&amp;t=1672s"><span>PI Archectrue explained</span></a></span></span></li></ul>

<ul><li id="f-doxcnLb7yJzQBQriy5U1hMjDMQd"><span>官网与文档：</span><span><span><a href="https://pi.dev"><span>pi.dev</span></a></span></span><span> 及其</span><span><span><a href="https://github.com/earendil-works/pi/tree/main/scripts"><span>源代码</span></a></span></span><span>。</span></li></ul>


<a id="section-0163"></a>
## 讲解视频

<a id="f-doxcn7YDAqNJ31m8M8vwzanK59e"></a>

<p id="f-doxcnyh7MLOvERd36a8ZtHKtYob"><span><span><a href="https://www.bilibili.com/video/BV1Bijf66Efs/?spm_id_from=333.1387.homepage.video_card.click&amp;vd_source=144bec9c3f54e465073138bed788be1b"><span>https://www.bilibili.com/video/BV1Bijf66Efs/?spm_id_from=333.1387.homepage.video_card.click&amp;vd_source=144bec9c3f54e465073138bed788be1b</span></a></span></span></p>


<a id="section-0164"></a>
## 开源框架解读 - Openclaw

<a id="f-doxcnfdqX7Xmgd1YRp2zV5utl0e"></a>

<p id="f-doxcnOr5aXm0dzTdTMeYtxs3hVc"><span>（写于2026年3月份）OpenClaw一定是一个必考的问题，大模型应用岗位，产品岗，必须得会。原因很简单，我想先和大家讲清楚这里面的底层逻辑，为什么会考。 因为它是目前最热门的AI Agent产品了。在这个大模型高速发展的时代，热门的东西一定是要了解会考察的。 有人说2025年是Agent年，从2025发展到现在，Agent的形式在不断演进。火爆出圈的Agent从去年的Manus到今年的Openclaw, 它是整个行业发展的风向标。 我回想去年（2025年）面试的时候，很多面试官问我Manus是什么，我说不知道，当时觉得没啥，现在觉得很掉分。对于行业爆品，一定要掌握，是高频考点。网上很多视频基本都是讲的Openclaw如何配置，有什么能力。相关视频太多了，在本章我会给大家推荐2个我自己看的部署，玩openclaw的视频，感兴趣可以去玩。 但是本章更侧重的是Openclaw的原理，技术，为什么出圈。讲的人不多，但是作为开发，或者产品，从面试的角度，你无疑是要掌握这个产品里面包含的核心技术的，本节就从功能，技术层面来讲解Openclaw, 相信它一定是你准备面试必不可少的素材。学了本章，你可以在面试的时候和面试官说你看过Openclaw的源码（其实也有必要看，作为Agent开源项目），Manus其实也可以去学习，因为它也是很火的Agent，而且和Openclaw 侧重点是不同的。可以当作课外作业大家自己去学一下。</span></p>


<a id="section-0165"></a>
## OpenClaw是什么

<a id="f-doxcn8bwizDaHtDYBZY5daFT6Fh"></a>

<p id="f-doxcnn7WQ89e8rLwu4po2812oib"><span>（一定会问的问题，一般面试官引入一个问题都是先问你概念，所以精心准备一个表达流畅的回答是非常必要的）</span></p>

<p id="f-doxcnsv6zJsWJycPXBN0SjuUjFc"><span> OpenClaw 是一个开源的、可自托管的</span><span style="font-weight:bold">个人 AI 助手平台</span><span>。</span></p>

<ul><li id="f-doxcnBI7m8TjThur4HsUNbuKqQg"><span>核心用 TypeScript (ESM) 编写，运行在 Node.js 22+ 上</span></li></ul>

<ul><li id="f-doxcn4kD0idFV0TeGHjgcOtx5Nb"><span>通过 </span><span><span><span>npm install -g openclaw</span></span></span><span> 安装，</span><span><span><span>openclaw</span></span></span><span> CLI 是主要入口</span></li></ul>

<ul><li id="f-doxcnh6bncl35uLG3KydO9Eupzg"><span>所有数据和密钥都存在本地（</span><span><span><span>~/.openclaw/</span></span></span><span>），不经过任何云中转</span></li></ul>

<p id="f-doxcncqY5lNMCxB0t5CtjXxWdae"><span>总结来说，</span><span style="font-weight:bold">它是一个事件驱动的 Agent 执行引擎，前面放了一个多渠道网关。</span></p>


<a id="section-0166"></a>
## Openclaw 总体架构

<a id="f-doxcneVaptQy4KHhsEEtCUzO7Fg"></a>

<p id="f-doxcnAU4AsLNGY4x1JyzaHVInHk"><span>（这节很核心哈，我结合这个架构图，然后把各个模块功能都讲清楚，你学明白了其实你就知道了它到底是个啥东西，为啥看上去很神奇很主动？Openclaw神秘的面纱就揭开了）</span></p>

<div style="margin-left:25px"><p id="f-doxcn6Bw0uQnikebcA1DJhXJJ5j"><span>简单来讲，OpenClaw 的架构为</span><span style="font-weight:bold">触发、网关、Agent 三层</span><span>：</span></p><div id="f-doxcnFHAcjPJVE5ATx8gRa1coLg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">触发层</span><span>负责产生事件 — 五种来源（消息、心跳、定时任务、钩子、Webhook）不断向系统注入事件</span></div></div><div id="f-doxcnTD5hLEVLwm0KqAgvaa2tme" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">网关层</span><span>负责接入和路由 — 把不同协议的事件统一收进来，认证后分发到正确的 Agent 会话</span></div></div><div id="f-doxcnULXuro2BFy1JoTWUniPxFW" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">Agent 层</span><span>负责智能执行 — 推理（Think）、调工具（Act）、记忆（Remember）</span></div></div><p id="f-doxcnEdu6gAs0pI8Ry3bdIpvClb"><span>三层的本质是一个</span><span style="font-weight:bold">事件驱动的执行管道</span><span>：事件产生 → 网关路由 → Agent 消费执行 → 状态持久化 → 等待下一个事件。这是一个永不停止的循环。</span></p></div>

<div id="f-doxcnKokGJKbY0XwqyuQNtvAeCb"><img alt="" decoding="async" height="853" loading="lazy" src="/images/agent-learning/d1dda0aacd2151d04fb77028.png" width="1280"/></div>

<a id="f-doxcn8CI5LezRaS3RuKjKQAHUme"></a>

##### 触发层 - 5层信号源

<p id="f-doxcncp0XA47xMo8cRyyAcoRftd"><span>Agent 不是只在用户发消息时才工作。OpenClaw 有</span><span style="font-weight:bold">五种独立的触发维度</span><span>，每一种都能唤醒 Agent 执行：</span></p>

<p id="f-doxcnmyRb2djkDVeTMOxTlodi7e"><span>通过上述图片，我们知道它触发的方式很多，我们通常给他发消息其实只是一种（Message）。不过Message可以触发的方式也很多：通过CLI，通过应用（feishu,telegram), 包括Openclaw的dashboard。 所以其实看上去openclaw好像一直在思考，很主动，其实不过是有记忆功能加上 自动的触发源罢了。（最后我会举例说明）</span></p>

<div id="f-doxcn62mjNHb87PjUOnfh64HGDg"><img alt="" decoding="async" height="349" loading="lazy" src="/images/agent-learning/6df4186e0a3e770ea42e09cb.png" width="1182"/></div>

<a id="f-doxcnLJTokXo6ym7NZOm4ZuYQQh"></a>

##### 网关 - 大名鼎鼎的Gateway

<p id="f-doxcn6x2fJUtFVw15J7stEhoE7g"><span>Gateway 是一个</span><span style="font-weight:bold">本地长驻 Node.js 进程</span><span>，监听端口 </span><span><span><span>:18789</span></span></span><span>（HTTP + WebSocket），是触发层和 Agent 层之间的</span><span style="font-weight:bold">中间件</span><span>。</span></p>

<div id="f-doxcndJXNqWWNU66paZ3GAFkVmg"><img alt="" decoding="async" height="412" loading="lazy" src="/images/agent-learning/15bba229a670bc66f97e0068.png" width="1221"/></div>

<p id="f-doxcnPcP9kE5mr4CPxW6KowRJkg"><span style="font-weight:bold">Gateway 的核心职责：连接管理、协议转换、路由分发、安全控制。</span></p>

<p id="f-doxcnS0VkmkGawyT33IJiNMhAUg"><span style="font-weight:bold">关键边界：Gateway 不做推理，不调 LLM，不执行工具。</span><span> 它只负责"消息到了该给谁"和"回复该送回哪里"。</span></p>

<a id="f-doxcnvtsAuQGrYqG3C9Bvp1JL1f"></a>

##### Agent层

<p id="f-doxcneCDs0o3jNy4yLHctka4sec"><span>这层就是咱们熟悉的Agent的知识啦。React, LLM 的调用，Function Call, Memory都在这里啦~都是我们学过的知识啦~~。</span></p>

<div style="margin-left:25px"><h5 id="f-doxcnufDY4Ad2wEGKeHRmCqOHNg"><span>5.2.3.1 推理 (think)</span></h5>
<div style="margin-left:25px"><p id="f-doxcnM933xgSF7BzE8Bwj8FmS9e"><span>Agent 的核心是 </span><span style="font-weight:bold">Pi Embedded Agent</span><span>，一个多轮推理循环。它收到消息后开始思考，决定是直接回复还是需要调用工具获取更多信息，调完工具拿到结果后继续思考，如此循环直到生成最终回复。</span></p><p id="f-doxcnBKp0qZ2XJuGe2M4H7xMUtS"><span>推理过程中需要调用 LLM。LLM 调用是从本地 Gateway 进程直接发往模型提供商 API 的（OpenAI、Anthropic、Gemini、Ollama 等），不经过 OpenClaw 的任何云服务。如果用 Ollama 等本地模型，整个流程甚至完全不出你的局域网。</span></p><p id="f-doxcnipWqWXYiBkvJdKdibcbVqc"><span style="font-weight:bold">Auth Profiles</span><span> 管理多套 API 凭证，支持轮换和 failover——一个 key 被限速了会自动切到下一个。</span><span style="font-weight:bold">Session Manager</span><span> 维护多轮对话的上下文，当历史过长时自动压缩（compact），管理 token 预算。</span></p></div><h5 id="f-doxcnIdp7oVZ9izM4JFJwjGQCuf"><span>5.2.3.2 工具执行 (Act)</span></h5>
<div style="margin-left:25px"><p id="f-doxcn6uyXBZFg1XHRmt5fAPshPh"><span>Agent 推理时可以自主决定调用工具。内置的核心工具包括：</span></p><div id="f-doxcn5qqTS78eiQ6JTFLUumg02d" style="display:flex;gap:0.5em"><span style="min-width:1.5em">▪</span><div><span style="font-weight:bold">exec</span><span> — 执行 Shell 命令，有 allowlist 安全策略控制哪些命令可以运行</span></div></div><div id="f-doxcn7msFiEP8rCncPFeTfuhRZf" style="display:flex;gap:0.5em"><span style="min-width:1.5em">▪</span><div><span style="font-weight:bold">browser</span><span> — 通过 CDP 协议控制 Chromium 浏览器，可以浏览网页、截图、操作页面</span></div></div><div id="f-doxcn2Ywr0pSK9jmv7iywKoSUVg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">▪</span><div><span style="font-weight:bold">message</span><span> — 向任意渠道发送消息，实现跨渠道通信</span></div></div><div id="f-doxcnFBz1tFmKzl0NJJOoiRBj6b" style="display:flex;gap:0.5em"><span style="min-width:1.5em">▪</span><div><span style="font-weight:bold">nodes</span><span> — 远程调用已配对的 iOS/Android 设备上的能力</span></div></div><div id="f-doxcnPXaaL72DrHYP9MO7YBw9wC" style="display:flex;gap:0.5em"><span style="min-width:1.5em">▪</span><div><span style="font-weight:bold">subagents</span><span> — 启动子 Agent 并行处理复杂任务</span></div></div><div id="f-doxcnHRmkNMQVM1XkNcMM1EFKZe" style="display:flex;gap:0.5em"><span style="min-width:1.5em">▪</span><div><span style="font-weight:bold">apply_patch</span><span> — 修改代码文件</span></div></div><p id="f-doxcnas56J6lcrw1OnlEZxW1Lbd"><span>除了内置工具，插件也可以通过 </span><span><span><span>registerTool</span></span></span><span> 注册额外的工具，能力可以无限扩展。</span></p></div><h5 id="f-doxcn8lxMwiryhIHYgEDj1waeyh"><span>5.2.3.3 记忆(Memory)</span></h5>
<div style="margin-left:25px"><p id="f-doxcn5EzObhQutjRGRD10x8cnYA"><span>记忆是 Agent 主动调用的，不是每次对话都自动塞入上下文（那样会浪费 token）。Agent 自己判断"需不需要回忆过去的信息"，然后调用 </span><span><span><span>memory_search</span></span></span><span> 工具进行混合检索——70% 权重给向量语义搜索，30% 权重给 BM25 关键词搜索（</span><span style="font-weight:bold">哇，这不是我们自己的RAG项目的稀疏向量和稠密向量双路检索吗~</span><span>）。找到相关结果后，再通过 </span><span><span><span>memory_get</span></span></span><span> 读取完整的记忆内容。</span></p><p id="f-doxcnpCygF1Du5h5b8JY5uLFWNb"><span>底层存储是一个 SQLite 数据库，同时维护向量 embedding 索引和全文索引。记忆的原始数据是 Markdown 文件（MEMORY.md 以及自动生成的会话摘要文件）。</span></p><p id="f-doxcntZEg07ZeR7ok4r7Wv1sleh"><span>记忆的写入有两种方式。第一种是自动捕获：当会话结束时（用户输入 </span><span><span><span>/new</span></span></span><span> 或 </span><span><span><span>/reset</span></span></span><span>），hook 会自动把最近的对话保存为 </span><span><span><span>memory/YYYY-MM-DD-slug.md</span></span></span><span> 文件。第二种是文件同步：用户手动编辑 MEMORY.md 或 memory 目录下的文件，chokidar 文件监听器检测到变化后，自动进行分块、计算 embedding、写入索引库。</span></p></div></div>

<a id="f-doxcnKtneRwIMP8eyYnVgsqvAid"></a>

##### 总结&amp;举例

<p id="f-doxcn8F8kdIjkZvfyYYjTbI4TCd"><span>朋友们，所以你看，Openclaw其实也没有什么特别大不了的对吗？比如Agent模块，我们的描述并不复杂，没有用什么深奥的技术。如果你看完了我这个笔记Agent，我相信你很容易理解，所以OpenClaw本身也没啥大不了的对吧。我在这一节再给大家用实际例子来讲解，其实它就是这么回事~.</span></p>

<p id="f-doxcn4sZi7B2YUPgqD2hZc8cArd"><span style="font-weight:bold">先总结</span><span>，OpenClaw的本质是</span><span style="font-weight:bold">事件驱动模型</span><span>，看起来主动是有定时任务以及间隔触发，看起来能记事是因为有记忆，采用双路检索。看上去功能强大，可以用应用驱动是因为用了Gateway做适配。快速总结：</span></p>

<div style="margin-left:25px"><p id="f-doxcnM8bUwzCbPf1qi1H35sVBOb"><span>Time    → Heartbeats, Crons</span></p><p id="f-doxcnihfjnHpiZwWBE7qCbJUI8f"><span>Humans   → Messages</span></p><p id="f-doxcnID3iKBiWaESfKXefWgVZUf"><span>External   → Webhooks</span></p><p id="f-doxcnKLMypKLzNdrCwBRW0GyOCc"><span>Internal   → Hooks → Queue → Agent Executes → State Persists</span></p><p id="f-doxcn7Wz9J4wr1WnpnQxDhyfd0b"><span>Agents     → Subagents</span></p><p id="f-doxcndLW0UnFqLmy1x7o6DnKXif"><span style="font-weight:bold">再举例：</span><span>一个外国小哥哥使用了Openclaw，然后发帖说他给他的妻子用Openclaw设置了定时发送早上好，结果晚上回去，他发现他的龙虾和妻子从早聊到晚，他的妻子完全不知道对面不是真人。他觉得太amazing了。我们现在知道，他看上去主动的原因是，因为你设置了定时器，然后还有间隔触发。Agent每次触发，会根据上下文，思考调用工具比如可以打电话，发新闻，图片。所以整体看上去你没和它主动聊天，他也会和你说话甚至会打电话。无非是这么实现的。</span></p><div id="f-doxcnndcYu3MYa13aHO59xTsleb"><img alt="" decoding="async" height="877" loading="lazy" src="/images/agent-learning/68fe1491259dec3f5b8ebe38.png" width="549"/></div></div>


<a id="section-0167"></a>
## Openclaw 记忆

<a id="f-doxcnEyyD8SmqF9VWgmUI1PHpnh"></a>

<a id="f-doxcnvGHYs8wGFCPipOZGMSCf8f"></a>

##### 导语

<p id="f-doxcnC7j6DC3OqfomylqNrcD5F3"><span>为什么这一小节可以认为很重要，给大家先说明原因：</span></p>

<p id="f-doxcnOWVFHDZ3d78t8ipRtuSyCg"><span>1.</span><span style="font-weight:bold"> 首先记忆功能是常考的，甚至必考</span><span>，从面试的角度，Agent的记忆是如何实现的，这已经是背烂了的八股对吧，这部分就是这个问题的经典实现，所以你学习这一部分是对这个高频考点的补充，可以将Openclaw的记忆功能融入笔记八股部分，更新我们的回答，让我们的回答结合现在最火的Agent的例子去答，是不是就比干巴巴答概念要更好。</span></p>

<p id="f-doxcnmjlFtta9Lcn516bqkgWrNf"><span>2. 如果你想玩openclaw的话，</span><span style="font-weight:bold">Openclaw为什么总是忘记事情？</span><span>如果你学了本节，那你自己就能够尝试去解决，你也可以修改里面的记忆文件，手动确定让你的龙虾能记住什么，高效组织你的龙虾记忆。</span></p>

<p id="f-doxcn4ZqlUPQ8ePaF8GzqpVcpxe"><span>3. 我想借助这个机会，学习Openclaw，大家可以理解这个产品的架构是怎么设计的，记忆模块是怎么组织的。这样的好处是</span><span style="font-weight:bold">建立你的审美</span><span>，大家在设计自己的agent的时候，如果你去设计架构，你用上他这个</span><span style="font-weight:bold">心跳机制，定时机制 </span><span>而不是干巴巴的只有一个用户输入作为触发，你用上它的4层记忆，哪怕你不改，你就去抄它的，是不是也比自己设计的高级一些，所以通过这个学习，也是为我们自己设计Agent项目打基础，站在他们的肩膀上设计你的项目，让面试官觉得你的项目是高级的，有想法，有深度的。</span></p>

<a id="f-doxcn0pUUqcT3PbdbWogNBNHTlh"></a>

##### 四层记忆架构总览

<p id="f-doxcnlmhjduDOqLA2T1vAATlZ5b"><span>OpenClaw 的记忆不是一个系统，而是 </span><span style="font-weight:bold">四层独立机制</span><span> 协同工作，类似计算机的存储层次：</span></p>

<ol start="1"><li id="f-doxcnOJHvmzyHLYjTSkIhYmS3Rf"><span style="font-weight:bold">Bootstrap Files</span><span>（≈ 硬盘）— Agent 的永久身份与规则，完全免疫 Compaction</span></li></ol>

<ol start="2"><li id="f-doxcncQ9NTWJp867cmsUtnOIIac"><span style="font-weight:bold">Session Transcript</span><span>（≈ 文件系统日志）— 完整对话历史存档，旧消息会被压缩为摘要</span></li></ol>

<ol start="3"><li id="f-doxcnVKUHF5kmEQmNH4snUx6g1d"><span style="font-weight:bold">Context Window</span><span>（≈ RAM 内存）— 模型当前能"看到"的所有内容，满了就触发压缩</span></li></ol>

<ol start="4"><li id="f-doxcninpd7qVDxodjkJM7g9CNp1"><span style="font-weight:bold">Retrieval Index</span><span>（≈ 搜索引擎）— 语义搜索记忆文件，独立于会话</span></li></ol>

<blockquote id="f-doxcnW6mfkr0wlqS5wHTtUXYQYb"><p id="f-doxcnT8sZzg6gNb8YChxHp8cPrh"><span style="font-weight:bold">知道哪一层出了问题，就能解决 90% 的"Agent 忘事"问题。</span></p></blockquote>

<div id="f-doxcnH9HEVrqk0eR0uJ2TXqhH0d"><img alt="" decoding="async" height="936" loading="lazy" src="/images/agent-learning/0026d88189c91db011094d6a.png" width="1206"/></div>

<a id="f-doxcnZAh5tHpRQxvD5BroX4iFce"></a>

##### Bootstrap Files（引导文件）

<p id="f-doxcnhmY7qEHeKinTI9aLg1W9cf"><span style="font-weight:bold">本质</span><span>：工作空间里的 Markdown 文件，每次会话开始时从磁盘读取、注入上下文。</span></p>

<p id="f-doxcna7tMNCUsGUz2eGUpb366Pe"><span style="font-weight:bold">文件清单</span></p>

<div style="margin-left:25px"><p id="f-doxcnqrj2w19NGCvOEWSi3LiU5e"><span><span><span>SOUL.md</span></span></span><span> — 人格、语气、边界</span></p><p id="f-doxcn7YbfQCF9EOUg4CdPGh8iie"><span><span><span>AGENTS.md</span></span></span><span> — 操作指令、行为规则</span></p><p id="f-doxcnEOBDiJwhBpsHrR2eErisZf"><span><span><span>USER.md</span></span></span><span> — 用户身份信息</span></p><p id="f-doxcnHJqW8nmdwGDsVciJPq0mYd"><span><span><span>TOOLS.md</span></span></span><span> — 工具使用说明</span></p><p id="f-doxcnjnah9MLbeqbCkykKETTo4c"><span><span><span>IDENTITY.md</span></span></span><span> — Agent 名称与风格</span></p><p id="f-doxcn05i3aqInpDsOOZp2cvTdDc"><span><span><span>MEMORY.md</span></span></span><span> — 策展的长期记忆（仅主会话加载）</span></p><p id="f-doxcn9COXb3skpblDmGPvt0Ebag"><span><span><span>HEARTBEAT.md</span></span></span><span> — 心跳任务清单（可选）</span></p><p id="f-doxcnPSkVmj8x6GB6kRwwF0oolf"><span><span><span>BOOTSTRAP.md</span></span></span><span> — 首次运行仪式（一次性）</span></p></div>

<p id="f-doxcnkZ6rzbYRJzElvql5om65Eh"><span>位置：</span><span><span><span>~/.openclaw/workspace/</span></span></span></p>

<p id="f-doxcnThISpztyuau0iCgXSv0Euf"><span style="font-weight:bold">关键要点</span></p>

<div style="margin-left:25px"><p id="f-doxcn2MpGyxsW5ap5oBEGXSA4ec"><span style="font-weight:bold">每次会话重新从磁盘读取</span><span>，不存在对话历史中 → 免疫 Compaction</span></p><p id="f-doxcnQuUjbH4vmdUR9tqf0Moumd"><span style="font-weight:bold">字符限制</span><span>：单文件 20,000 字符，总计 150,000 字符，超出会被截断</span></p><p id="f-doxcnzYV5UVqL802jV1q2UQke9f"><span style="font-weight:bold">子 Agent 只收到</span><span><span><span>AGENTS.md</span></span></span><span>、</span><span><span><span>SOUL.md</span></span></span><span>、</span><span><span><span>TOOLS.md</span></span></span><span>、</span><span><span><span>IDENTITY.md</span></span></span><span>、</span><span><span><span>USER.md</span></span></span><span>，拿不到 </span><span><span><span>MEMORY.md</span></span></span><span> 和 </span><span><span><span>HEARTBEAT.md</span></span></span></p><p id="f-doxcnjwpk4WuPrkgW34kUAJWBrb"><span>用 </span><span><span><span>/context list</span></span></span><span> 可查看每个文件的注入状态</span></p><p id="f-doxcnbs3ATmUDttt9IDkUbnXrJf"><span style="font-weight:bold">所有 Bootstrap Files 都应尽量精简</span><span>——它们每轮都注入上下文，内容越多占用越大。实践中 </span><span><span><span>SOUL.md</span></span></span><span> 最容易被写得过长，建议各文件都保持简洁。</span></p></div>

<a id="f-doxcnmJYkWLkTlPQC1SCjTemPxc"></a>

##### Session Transcript（会话记录）

<p id="f-doxcnq18aPrJn4avyU0TNQv7sTc"><span>（可以认为这节还是挺重要的，他其实是你怎么组织Agent长短记忆的一些原理。我们做agent的时候都知道把历史对话记录每次拼接，放到下一轮对话。那么窗口满了，如何压缩，压缩保留什么东西，这时要把什么东西存到本地做长期记忆，这些技巧在本节都讲了，面试也是爱问的，建议掌握，要是能面试时候说出来，或者用到你的项目中，都会大大加分）</span></p>

<p id="f-doxcnm8DRYNr5dMMElJRAKkjTMf"><span style="font-weight:bold">本质</span><span>：完整对话历史，以 JSONL 文件追加写入磁盘。</span></p>

<p id="f-doxcnwWwbVrhKv4O6Urs7d7P18c"><span style="font-weight:bold">存储位置</span></p>

<pre id="f-doxcnvww6Wqp9Kxci13p5vbEpoc"><code>~/.openclaw/agents/&lt;agentId&gt;/sessions/
├── sessions.json          # 会话元数据
└── &lt;sessionId&gt;.jsonl      # 对话记录（包含消息、工具调用、压缩摘要）</code></pre>

<p id="f-doxcnCiFJd4zgFtAElP3bM7FT1g"><span style="font-weight:bold">关键要点</span></p>

<div style="margin-left:25px"><div id="f-doxcnkYCuxlz9wmIly9WWvdLw2d" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">每条消息自动追加到 JSONL</span><span>，包括用户消息、助手回复、工具调用</span></div></div><div id="f-doxcnZd0XGSR69kanndEV2Hw9Df" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>继续会话时从 JSONL 重建上下文，</span><span style="font-weight:bold">跨重启持久</span></div></div><div id="f-doxcnWwV3whhI48FoHLQbiO5Tsh" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>磁盘上的原始记录</span><span style="font-weight:bold">始终保留</span><span>，但模型只看到上下文窗口中的部分</span></div></div></div>

<p id="f-doxcneVig9n9suaMYKBlBiWA9Sc"><span style="font-weight:bold">Compaction（压缩）详解</span></p>

<p id="f-doxcneZzzR2zrCJ5xBT81bP65Ph"><span style="font-weight:bold">两种触发方式：</span></p>

<ul><li id="f-doxcnIpH9cTM1EPNGyzUhOcHokb"><span style="font-weight:bold">自动触发（Auto-Compaction）</span><span>：上下文使用量达到阈值时自动触发。有两种情况：</span></li></ul>

<div id="f-doxcnm95IoccsGS1K58lshYrAbb" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">溢出恢复</span><span>：模型返回 context overflow 错误 → 压缩 → 重试</span></div></div>

<div id="f-doxcnjPHzoAJC95Z3ZEm5ulmVzg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">阈值维护</span><span>：成功完成一轮后，</span><span><span><span>contextTokens &gt; contextWindow − reserveTokens</span></span></span><span> 时触发</span></div></div>

<ul><li id="f-doxcn6amKHiQX4xyZusQX0r6Sce"><span style="font-weight:bold">手动触发</span><span>：输入 </span><span><span><span>/compact</span></span></span><span>，可带自定义指令如 </span><span><span><span>/compact 重点保留决策和待办事项</span></span></span></li></ul>

<p id="f-doxcnWlh0pYkfGD8eC12xlocQic"><span>触发公式：</span><span><span><span>上下文窗口 − reserveTokensFloor(默认20000) − softThreshold(默认4000)</span></span></span><span>，200K 模型 → 约 176K 时触发。</span></p>

<p id="f-doxcnGwbyulG1NW1pvf9FGsODre"><span style="font-weight:bold">压缩的具体过程:</span></p>

<ol start="1"><li id="f-doxcnWx3onPRR1ESg9j4XtNLexc"><span style="font-weight:bold">划分保留区和压缩区</span><span>：最近的 ~20,000 tokens 消息被划为"保留区"，</span><span style="font-weight:bold">原封不动保留</span><span>，模型看到的就是原文。保留区之前的所有旧消息进入"压缩区"</span></li></ol>

<ol start="2"><li id="f-doxcnqv5tr0xEvpVHkuakuVPXyb"><span style="font-weight:bold">分割压缩区</span><span>：把压缩区的旧消息按 token 数分成若干块（默认分 2 块，自适应调整块大小）</span></li></ol>

<ol start="3"><li id="f-doxcnGyUXLrTz4nt4ckBGzDDIRb"><span style="font-weight:bold">逐块总结</span><span>：用模型对每个块生成摘要（调用 </span><span><span><span>generateSummary</span></span></span><span>，失败会重试 3 次）</span></li></ol>

<ol start="4"><li id="f-doxcnOSC69YHsqThHjULswAZPve"><span style="font-weight:bold">合并摘要</span><span>：如果有多个块的摘要，再用模型把它们合并成一个连贯的总摘要</span></li></ol>

<ol start="5"><li id="f-doxcnuz1VuPEKczxJe2w1KMc9Py"><span style="font-weight:bold">写入 Transcript</span><span>：在 JSONL 文件中写入一条 </span><span><span><span>compaction</span></span></span><span> 类型的条目，包含摘要文本和 </span><span><span><span>firstKeptEntryId</span></span></span><span>（保留区最早消息的 ID）</span></li></ol>

<p id="f-doxcnYRop3jkw9R0FJKV1V4rw9d"><span>压缩后模型看到的上下文结构：</span><span><span><span>[压缩摘要] + [保留区原文（最近 ~20,000 tokens）]</span></span></span></p>

<div id="f-doxcnCqUyUBAZQingslH6YAGgFu"><img alt="" decoding="async" height="853" loading="lazy" src="/images/agent-learning/3fa672dc708742f4bd7c1141.png" width="1280"/></div>

<p id="f-doxcnw6QiHANtBChD08NcBcRXyc"><span style="font-weight:bold">什么时候触发</span></p>

<p id="f-doxcnaguInIJwO940isEaQG8tEb"><span>总结过程有明确的指令，</span><span style="font-weight:bold">必须保留</span><span>：</span></p>

<ul><li id="f-doxcnLGuPEMtqOq6jD65LgtCm3a"><span>进行中的任务及其状态（进行中、阻塞、待办）</span></li></ul>

<ul><li id="f-doxcnGu6v7SwujgjMrizqhZLV8e"><span>批量操作的进度（如"17 项中已完成 5 项"）</span></li></ul>

<ul><li id="f-doxcnTXIVfkHseMvD8UaQ4aw6Tc"><span>用户最后请求的内容以及正在做什么</span></li></ul>

<ul><li id="f-doxcnHPk9pTjYwo5r6L1IN0Ca0d"><span>已做出的决策及其理由</span></li></ul>

<ul><li id="f-doxcn2LpjqLOEeaBTXAsTmbzkIe"><span>TODO、开放问题和约束条件</span></li></ul>

<ul><li id="f-doxcn7jOdvkkFWraQwWzXagWDYb"><span>承诺的后续行动</span></li></ul>

<p id="f-doxcnvx41yr6CfDRi0lFAG5xbpg"><span>默认还会</span><span style="font-weight:bold">完整保留所有不透明标识符</span><span>（UUID、哈希、ID、token、API key、主机名、IP、端口、URL、文件名），不缩写不重构。这由 </span><span><span><span>identifierPolicy: "strict"</span></span></span><span> 控制。</span></p>

<p id="f-doxcnPJOPAXxTOdXNBHNNUktB4b"><span style="font-weight:bold">Pre-Compaction Memory Flush</span></p>

<p id="f-doxcnOGqrlZyjjmQFGcWBiCLkxw"><span>压缩前 OpenClaw 会静默运行一轮，提醒 Agent 把重要内容写入 </span><span><span><span>memory/YYYY-MM-DD.md</span></span></span><span>，用户不可见（</span><span><span><span>NO_REPLY</span></span></span><span>）。每个压缩周期只触发一次。</span></p>

<blockquote id="f-doxcngXk50SGIm2PdmheuTFewZd"><p id="f-doxcnVYmvl2mDUtEka5inLKOXDf"><span>⚠️ </span><span style="font-weight:bold">聊天中说的指令不会自动保存到文件</span><span>——不写入文件就会被压缩丢掉。这是最常见的"Agent 失忆"原因。</span></p></blockquote>

<a id="f-doxcnNIOOKv5ElyJlRPfvyRg4nh"></a>

##### Context Window（上下文窗口）

<p id="f-doxcniVnBuuJ5HICuLJqJCFCvGh"><span style="font-weight:bold">本质</span><span>：固定大小的 token 容器，大小由模型决定（如 Claude 200K、GPT-4 128K、Gemini Pro 1M），模型每轮推理时所有信息都要挤进来。</span></p>

<p id="f-doxcnQYGooC5rLggnEnCBKvdVlf"><span style="font-weight:bold">关键要点</span></p>

<ul><li id="f-doxcnqwcydYM3fad4uMUSgpfmVe"><span style="font-weight:bold">每轮竞争空间的内容</span><span>：系统提示 + Bootstrap Files + 对话历史 + 工具调用结果（包括 </span><span><span><span>memory_search</span></span></span><span>/</span><span><span><span>memory_get</span></span></span><span> 检索到的记忆片段） + 当前消息</span></li></ul>

<ul><li id="f-doxcn03BgSfJMBDgJEmCAO9qaRc"><span style="font-weight:bold">最大的 token 消耗者是工具结果</span><span>（文件读取、检索结果、网页快照、API 响应）</span></li></ul>

<ul><li id="f-doxcnx74cE00rr8CTEToSa5ZBWQ"><span>Bootstrap Files 每轮都占空间，所以要尽量精简</span></li></ul>

<ul><li id="f-doxcnoyLLWShC6AmFdZtU9oUimx"><span style="font-weight:bold">满了就触发 Compaction</span><span>，旧对话被压缩</span></li></ul>

<ul><li id="f-doxcnbSPLwqM5fpNSltRKsRWolg"><span>用 </span><span><span><span>/status</span></span></span><span> 监控使用量，建议在 75–80% 时手动压缩</span></li></ul>

<a id="f-doxcnKlbU1oVAdjZ5FlTHPGb3Bf"></a>

##### Retrieval Index（检索索引）

<p id="f-doxcnzPx7DHT3wIg9YjSydqKhBc"><span style="font-weight:bold">本质</span><span>：为记忆文件建立的搜索索引，Agent 通过工具按需检索，不用把所有记忆都塞进上下文。</span></p>

<p id="f-doxcnPvGEOohq4Sx0d6udXjPwWh"><span>索引范围</span></p>

<ul><li id="f-doxcnhumPd4HsrDJuwQsl64YWCd"><span><span><span>MEMORY.md</span></span></span><span> + </span><span><span><span>memory/**/*.md</span></span></span><span>（默认）</span></li></ul>

<ul><li id="f-doxcn8SzZLbptRlEMZPgpXCwQSb"><span>可通过 </span><span><span><span>memorySearch.extraPaths</span></span></span><span> 添加额外路径（如 Obsidian 笔记库）</span></li></ul>

<ul><li id="f-doxcna7tbN1NzEL1n1sTQHMS3cb"><span>存储在 </span><span><span><span>~/.openclaw/memory/&lt;agentId&gt;.sqlite</span></span></span></li></ul>

<p id="f-doxcnAcN5H1C3iXg1MwG4GZwnug"><span>检索工具与触发方式</span></p>

<p id="f-doxcnnV0qdqApyUfGo8uG0oKooJ"><span>OpenClaw 提供两个记忆工具：</span></p>

<ul><li id="f-doxcnqF8lMl0yEIqbaoOvTY3PCb"><span><span><span>memory_search</span></span></span><span> — 语义搜索，返回相关片段（文件路径 + 行号 + 分数）</span></li></ul>

<ul><li id="f-doxcnmBBxAMCc68fl9FUj0KPvJf"><span><span><span>memory_get</span></span></span><span> — 按路径读取指定记忆文件的具体内容</span></li></ul>

<p id="f-doxcn5sREjehgoBWw0aCiczSxPc"><span style="font-weight:bold">检索不是每次对话自动触发的</span><span>。</span><span><span><span>memory_search</span></span></span><span> 是一个工具，由模型自己判断是否需要调用。系统提示中会指导模型"在回答关于过去的决策、日期、人物、偏好、待办等问题前，先调用 </span><span><span><span>memory_search</span></span></span><span>"，但最终是模型自行决定何时搜索、用什么关键词搜索。简单闲聊不会触发检索。</span></p>

<p id="f-doxcnTt7hUmJfrgK9qszNGAQ4Ca"><span>工作流是两步走：先 </span><span><span><span>memory_search</span></span></span><span> 找到相关片段 → 再 </span><span><span><span>memory_get</span></span></span><span> 读取完整上下文。</span></p>

<p id="f-doxcnldmYVHYnGI1v4duDdPWrqg"><span>混合搜索</span></p>

<p id="f-doxcnQEFozyDFg3RWqwbImFwRcP"><span>同时使用向量语义匹配（擅长同义词）+ BM25 关键词匹配（擅长精确 ID/代码符号），加权合并：</span></p>

<pre id="f-doxcn1qdimfyivYSC5AipYTE2kg"><code>finalScore = 0.7 × vectorScore + 0.3 × textScore</code></pre>

<p id="f-doxcniYPI7uCVFahL7wtA2fEoqf"><span>关键要点</span></p>

<ul><li id="f-doxcnYLgIlVx4eNXH6wGxX9NWAh"><span style="font-weight:bold">只索引文件</span><span>——聊天中说过但没写入文件的内容搜不到</span></li></ul>

<ul><li id="f-doxcngoRNoYS1x5WG3XHIq2MOMf"><span>文件变动后自动重新索引（去抖 1.5 秒）</span></li></ul>

<ul><li id="f-doxcnWQ8gENRppcwXJJN2Z4zBFz"><span>支持 MMR 去重（过滤近似重复结果）和时间衰减（默认半衰期 30 天，新笔记排名更高）</span></li></ul>

<ul><li id="f-doxcnF7l93TZhxkJIHrcOasr7Wc"><span>常青文件（</span><span><span><span>MEMORY.md</span></span></span><span>、非日期命名的 </span><span><span><span>memory/*.md</span></span></span><span>）不受时间衰减影响</span></li></ul>

<ul><li id="f-doxcnA2yvEo5A5qb7XUAioFUNne"><span style="font-weight:bold">反复引用的重要知识</span><span>建议直接放在 </span><span><span><span>memory/</span></span></span><span> 目录下按主题组织（如 </span><span><span><span>memory/trading-system/</span></span></span><span>），而不是只存在外部</span></li></ul>


<a id="section-0168"></a>
## OpenClaw Agent 架构解析

<a id="f-doxcnuDXksIGzeiLjjY3oguMnEg"></a>

<p id="f-doxcnZ9EhfmZcXgIPbphmoMCmgb"><span>在10.2 小节中，我们分析了 OpenClaw 的整体架构，它由三层构成：</span></p>

<pre id="f-doxcnWWFAIHZtWAeUtp3l01VMvf"><code>触发层  →  消息渠道（Discord、Telegram、Slack、WhatsApp 等）
网关层  →  Gateway（路由、session 管理、并发控制）
Agent 层 →  Agent（LLM 驱动，执行任务）</code></pre>

<p id="f-doxcnYi7fkenJT1cNMNM5wy4mwd"><span>本文聚焦 </span><span style="font-weight:bold">Agent 层</span><span>的内部架构。Agent的架构其实是面试官非常喜欢问的高频考点，我们在笔记中有了很详细的总结。要说我们之前学的是理论，那么我希望通过这一章来从实践上看看，Openclaw使用的Agent架构和我们之前的理论知识是否吻合。学习这一小节，除了从真正工程的角度加强对这个经典面试题的理解，另一方面其实也体现在自己的架构设计上，我们在设计自己的Agent的特性和架构上，能不能参考Openclaw的架构，把该学习案例做得更高级。</span></p>

<p id="f-doxcnV7UWna4A30vh5hbe21adFg"><span>在本节的</span><span> Multi-Agent 典型架构章节</span><span>中，讲过常见的架构模式：</span><span style="font-weight:bold">SAS、Independent、Centralized、Decentralized、Hybrid</span><span>，这里简单回顾一下：</span></p>

<p id="f-doxcnbUSZOr8QK6FJJqXICK83RA"><span>- </span><span style="font-weight:bold">SAS（单智能体）</span><span>：只有一个 Agent 独立完成所有任务</span></p>

<p id="f-doxcnxlEgjw5iEkAMpMzJ3yUhDd"><span>- </span><span style="font-weight:bold">Independent（独立型）</span><span>：多个 Agent 并行运行，互不通信，各自完成独立任务</span></p>

<p id="f-doxcn87nZmXTMz0Hz1R06DPRarc"><span>- </span><span style="font-weight:bold">Centralized（中心化）</span><span>：一个中心 Agent 负责编排，将子任务分发给 Worker Agent 执行</span></p>

<p id="f-doxcn5S1Z3DenPzsB2pVkh2We3f"><span>- </span><span style="font-weight:bold">Decentralized（去中心化）</span><span>：Agent 之间 P2P 直接通信协作，无固定中心</span></p>

<p id="f-doxcnoTedoSSijXPcCF5wk1jxkc"><span>- </span><span style="font-weight:bold">Hybrid（混合型）</span><span>：以上模式的组合</span></p>

<p id="f-doxcnjtndevsZdkzVx6FWc6V7tf"><span>今天我们将理论变成实践，解析 OpenClaw 这个真实项目中到底使用了什么架构，看看和我们之前讲的理论能不能匹配得上。</span></p>

<a id="f-doxcn7F9lj3yGYAoDRH6ZNWT7Ae"></a>

##### 概述

<p id="f-doxcnpX1IYitMOCM0Ey0fyXVe0E"><span>OpenClaw 的 Agent 框架本质上是一个 </span><span style="font-weight:bold">递归 Centralized架构</span><span>：</span></p>

<ul><li id="f-doxcnhy5HLkXf1jqOZWO16SHgzh"><span>Parent Agent 作为中心，用 LLM 决策任务如何拆解，向下 spawn 子 Agent 执行</span></li></ul>

<ul><li id="f-doxcnEC15hANZGtHqA61Kul25Wc"><span>子 Agent 可以继续 spawn 孙 Agent，每一层都是该层的中心，形成一棵递归的 Orchestrator-Worker 树</span></li></ul>

<p id="f-doxcnPOU2R7lIkQgtS2o79AhvFH"><span>- 路由和调度由无智能的 </span><span style="font-weight:bold">Gateway</span><span>承担，不是 Agent。</span></p>

<p id="f-doxcng6ZGIox8Suf97oft9wWF9d"><span style="font-weight:bold">Agent框架图</span></p>

<div id="f-doxcnqFjOiIVYPY9tWBpyL3l97g"><img alt="" decoding="async" height="853" loading="lazy" src="/images/agent-learning/daa645748af1c9ca0984eddb.png" width="1280"/></div>

<a id="f-doxcnvjr1j2CUNuG8wCpEXenjSg"></a>

##### Openclaw Agent架构详解

<p id="f-doxcnoJWkgfDnwjXRmPsQpfUXkd"><span>OpenClaw 的多 Agent 能力没有专门的"调度引擎"或"编排框架"，而是完全基于 LLM 的标准 </span><span style="font-weight:bold">Tool Use 机制</span><span>实现的：</span></p>

<p id="f-doxcnhgeNjsSA0ZhXpllpBVjUGc"><span>- </span><span style="font-weight:bold">工具（Tool）</span><span>：`sessions_spawn` 被注册为一个普通工具，和 `exec`、`web_search` 地位相同，调用它就会在系统层创建并启动一个子 Agent</span></p>

<p id="f-doxcno2kCoPNfOWEmfKRWHHX5Zf"><span>- </span><span style="font-weight:bold">提示词（Prompt）</span><span>：系统提示词注入一句触发规则，告诉 LLM 什么情况下应该使用这个工具</span></p>

<p id="f-doxcnLg4CyYmfLq3mPB6JIlobAh"><span>- </span><span style="font-weight:bold">LLM 决策</span><span>：LLM 在每轮推理中自主判断是直接处理任务，还是调用 `sessions_spawn` 把任务委托给子 Agent</span></p>

<p id="f-doxcnDce0iBnk2yyN08e0bedYtd"><span>这意味着 OpenClaw 的多 Agent 编排能力，是从 LLM 的 tool call 能力"衍生"出来的，而不是独立构建的一套系统。架构简洁，扩展自然。</span></p>

<a id="f-doxcnoK0JYudlG3kv7JJChIvNcg"></a>

###### 为什么选 Centralized

<p id="f-doxcnpT9c970jX19Ffsn98fr8vd"><span>Openclaw的作者并没有说他自己为什么这么设计架构，不过我们之前笔记有讲不同的架构的抉择，我谈一谈我的理解，不过对于模型架构的选择，其实你很难说哪个是最好的，这没有固定答案，可以认为这一点就是你能够想清楚，面试能讲清楚，能自洽就行。</span></p>

<p id="f-doxcnb2Idndck8yzTqzBW7zLaWg"><span>用户通过消息渠道发来一条消息，最终必须有一条连贯的回复发回去。这个"一进一出"的结构，天然要求有且只有一个 Agent 对最终回复负责——谁收到消息、谁整合结果、谁发出回复，必须是同一个主体。Centralized 的父子结构正好对应这个模型：Parent Agent 是唯一的回复责任人，子 Agent 只是它用来扩展执行能力的手段。</span></p>

<p id="f-doxcnNmattR8bFb8sF4VLYSKUug"><span>如果换成 Decentralized，多个 Agent P2P 协商，最终谁来发回复？没有确定的答案。如果换成 Independent，各 Agent 独立运行互不感知，结果根本无法拼合成一条完整的回复。</span></p>

<p id="f-doxcn04fFRtTiutmkDXu1ZxuAIc"><span>对话本身的结构就是中心化的——有一个确定的入口，有一个确定的出口，中间的执行可以分发，但责任链不能断。</span></p>

<a id="f-doxcnumIwxIvbshJzd066QpixEc"></a>

###### Spawn 的决策机制

<p id="f-doxcnfHHppM4Aryd2POZRXEvjpM"><span style="font-weight:bold">维度一：决策规则——谁来判断，依据什么</span></p>

<p id="f-doxcnAMXYGrUHFLRl8r3yfuFaRg"><span>是否 spawn 子 Agent，完全由 </span><span style="font-weight:bold">Parent Agent 的 LLM 自主判断</span><span>，没有外部调度器介入。OpenClaw 给 LLM 的判断依据只有系统提示词中的一句话（来源：`src/agents/system-prompt.ts`）：</span></p>

<pre id="f-doxcnZ85rlIlZENIkpLXxk7rzJc"><code>If a task is more complex or takes longer, spawn a sub-agent.
Completion is push-based: it will auto-announce when done.</code></pre>

<p id="f-doxcnqgOSs9vDWh0btCCYlZTUje"><span>就这一句。没有复杂的拆分规则，"复杂"和"耗时长"的边界完全交给模型自己理解和判断。</span></p>

<p id="f-doxcnR1O9iVLPHqcgG7TFMWx0ge"><span style="font-weight:bold">维度二：执行工具——spawn 是怎么实现的</span></p>

<p id="f-doxcnlgSGhFdv7FHtggbamvPG1g"><span><span><span>sessions_spawn</span></span></span><span> 是系统注册给 Agent 的一个普通工具。LLM 决定 spawn 后，就像调用任何其他工具一样调用它。</span></p>

<p id="f-doxcn2nx7IRjBu9TojxHMsyueXg"><span style="font-weight:bold">系统提示词如何把这个工具介绍给 Agent：</span></p>

<pre id="f-doxcnk2pqJCG0OC25hkAiAbbuVb"><code>- sessions_spawn: Spawn an isolated sub-agent session</code></pre>

<p id="f-doxcn0xvB3FSkRkjMlmKHLG1qg1"><span>工具名 + 一句描述，Agent 就知道它的存在和用途了。</span></p>

<p id="f-doxcn9ViuZcNGGhwdt2ewu0P6hc"><span style="font-weight:bold">工具的调用参数：</span></p>

<pre id="f-doxcnW8cvNkgNc1VbcZrOYZfYcc"><code>sessions_spawn(
  task,          // 子任务描述（自然语言，直接成为子 Agent 的 prompt）
  agentId,       // 目标 Agent ID（可选）
  runtime,       // "subagent"（轻量）或 "acp"（重量级，支持外部 CLI）
  mode,          // "run"（一次性）或 "session"（持久线程绑定）
  model,         // 模型覆盖（可选）
  thinking,      // 思考强度覆盖（可选）
  attachments,   // 文件附件（可选）
)</code></pre>

<p id="f-doxcn6BufPnO1RO5j1yGFK8iVHf"><span style="font-weight:bold">两种 runtime：</span></p>

<p id="f-doxcnasO14ALctpqdXKxw2qu8wc"><span><span><span>sessions_spawn</span></span></span><span> 支持两种 runtime，决定子 Agent 以什么方式运行：</span></p>

<p id="f-doxcnZVMGDSbGu1w7yegGtGSuUf"><span>- </span><span style="font-weight:bold">subagent</span><span>：轻量模式，子 Agent 在同一宿主进程中运行，继承父 Agent 的 workspace 目录，适合大多数常规任务拆分场景。来源：`src/agents/subagent-spawn.ts`</span></p>

<p id="f-doxcnu2Dq94pIQexKEzlbnfjIRb"><span>- </span><span style="font-weight:bold">acp</span><span>：重量级模式，基于 OpenClaw 内置的 ACP（Agent Control Protocol）协议，子 Agent 在独立进程中运行，可以对接 Codex 等外部 CLI 编程工具，支持持久化 session 和恢复，适合需要长期运行或内嵌外部工具链的场景。来源：`src/agents/acp-spawn.ts`</span></p>

<p id="f-doxcnkpn7MThnYFNegQBDjilwue"><span style="font-weight:bold">ACP 如何开启，LLM 如何选择：</span></p>

<p id="f-doxcnFsNATMM5xXCg421lAZahoc"><span>ACP 由配置项 </span><span><span><span>acp.enabled</span></span></span><span> 控制，默认开启，用户可以显式设置 </span><span><span><span>acp.enabled=false</span></span></span><span> 关闭。沙箱化 session 中 ACP 会被自动禁用。</span></p>

<p id="f-doxcn0QyfD69IUxoO9srSAKRwAX"><span>开启 ACP 不代表每次 spawn 都会用 ACP。开启只是"解锁了这个选项"，并在系统提示词中额外注入一段触发规则告知 LLM：</span></p>

<pre id="f-doxcnY9QagFLx57X90aUrlohElf"><code>For requests like "do this in codex/claude code/gemini", treat it as ACP harness intent
and call sessions_spawn with runtime: "acp".</code></pre>

<p id="f-doxcndv9Ws2sa7P5Zda3EvDqI71"><span>也就是说，LLM 默认 spawn 的仍然是 </span><span><span><span>subagent</span></span></span><span>，只有当用户明确表达"用 Codex 做"、"用 Claude Code 做"之类的意图时，LLM 才会判断为 ACP 场景，切换到 </span><span><span><span>runtime="acp"</span></span></span><span>。选择哪种 runtime 和是否 spawn 的决策逻辑完全一致——都由 LLM 自主判断，提示词只是提供规则。</span></p>

<a id="f-doxcnxFj0qfJR1UcVLwnH9mIgXc"></a>

###### 子Agent限制条件

<p id="f-doxcnMtYbeuHxwSd3H7Tbd2QDbe"><span>LLM 发出调用后，系统还会做一系列硬性检查，任一不通过就返回 </span><span><span><span>forbidden</span></span></span><span>，LLM 的意图不会被直接执行：</span></p>

<p id="f-doxcnrit9tOULDqz7twE2FIEsmh"><span>- </span><span style="font-weight:bold">深度限制</span><span>：当前深度 `&gt;= maxSpawnDepth` 就拒绝，默认 `maxSpawnDepth=1`（即子 Agent 默认不能再 spawn）</span></p>

<p id="f-doxcnbmOE9LcMT3U2pL4b2Ue1Nb"><span>- </span><span style="font-weight:bold">子 Agent 数量上限</span><span>：单个 session 的活跃子 Agent 数 `&gt;= maxChildrenPerAgent` 就拒绝，默认 `maxChildrenPerAgent=5`</span></p>

<p id="f-doxcnc409mfmZrzvDxVFYary8Sd"><span>- </span><span style="font-weight:bold">Agent ID 白名单</span><span>：若配置了 `allowAgents`，只有列出的 agentId 可被 spawn</span></p>

<p id="f-doxcnUA1OcKq3E8LkkqrGDGSqmf"><span>更底层的封锁是：叶子节点（leaf）的 Agent 工具列表里根本没有 </span><span><span><span>sessions_spawn</span></span></span><span>，LLM 物理上无法调用它（来源：</span><span><span><span>src/agents/pi-tools.policy.ts</span></span></span><span>）：</span></p>

<pre id="f-doxcncVB37Hmshy7OxPmVWmeMJd"><code>深度 0（main）        → 角色：main         → sessions_spawn ✅
深度 1（maxDepth&gt;=2） → 角色：orchestrator  → sessions_spawn ✅
深度 1（maxDepth=1）  → 角色：leaf         → sessions_spawn ❌ 工具不存在
深度 2+              → 角色：leaf          → sessions_spawn ❌ 工具不存在</code></pre>

<a id="f-doxcnIdqy2K24Ewlk6N3TH3RJZg"></a>

##### Agent通信机制

<p id="f-doxcn9AMFtEJW0sBoZrWBwIhMDc"><span>Agent的通信机制其实也是一个高频考点，面试官喜欢问的，你的Agent之间是如何通信的？</span></p>

<blockquote id="f-doxcn86KjmtVrCS7bzQQlabYNYf"><p id="f-doxcnt4T52WqBsbEWFa8RTIpuS8"><span>在我们之前笔记的「Agent 之间的通信与状态管理」章节中，已经介绍过 Agent 间的两种主要通信模式和消息传递策略。这里结合 OpenClaw 的实现，看看理论在真实项目中是如何落地的。</span></p></blockquote>

<a id="f-doxcn3jYQd8gskb9ootjmBQYqfb"></a>

###### 通信模式

<p id="f-doxcnguvYOhtdIFcqFgfwhKIZAd"><span style="font-weight:bold">工具调用，而非移交</span></p>

<p id="f-doxcnzkQSsyaoj5293ZT6hOMQDg"><span>Agent 间通信有两种常见模式（详细内容见 笔记</span><span> Agent之间通信和状态管理 </span><span>部分）：</span></p>

<p id="f-doxcnipJFZlAXGceo1s4r2SzJAg"><span>- </span><span style="font-weight:bold">移交（Handoff）</span><span>：一个 Agent 将执行上下文和执行权完整传递给另一个 Agent，自身退出。控制权转移，就像接力跑把棒交出去。</span></p>

<p id="f-doxcnKsfX4osmd3fLb7qms6un6g"><span>- </span><span style="font-weight:bold">工具调用（Tool Call）</span><span>：一个 Agent（主管）将任务委托出去，保留控制权，等结果回来后自己决定下一步，负责最终输出。</span></p>

<a id="f-doxcnyZkZtxgUxXpxuLqegEycFf"></a>

###### 消息传递

<p id="f-doxcnmrcEffi5bqKg0AHIh1fPlb"><span style="font-weight:bold">仅最终结果，不传推理链</span></p>

<blockquote id="f-doxcnyQjQEfx39WBqQ8j5bTxsxc"><p id="f-doxcndTChrUkoCEaJTBJiAjn4oh"><span>之前笔记的「Agent 之间的通信与状态管理」章节也介绍过消息传递内容的两种策略：</span><span style="font-weight:bold">共享完整推理数据</span><span>（中间步骤全部写入共享通道，协作能力强但上下文膨胀快）和</span><span style="font-weight:bold">仅共享最终结果</span><span>（私有空间内完成计算，只把结论写入共享区，状态复杂度可控）。OpenClaw 选择的是后者。</span></p></blockquote>

<p id="f-doxcnQuhsKRZSXzOMsAHdu7vwRu"><span>子 Agent 完成任务后，只把最终回复（</span><span><span><span>readLatestAssistantReply</span></span></span><span>）蒸馏成一条消息推回父 Agent，中间的 tool call 链、chain-of-thought 全部留在子 Agent 自己的私有 session 里，父 Agent 看不到。这有效控制了父 Agent 的上下文膨胀——每个子 Agent 都有独立的 session 状态，父 Agent 只收到一条结论性消息。</span></p>

<a id="f-doxcnLfSMeSbP2BdFuHtHjIfJ3d"></a>

###### 结果传递机制

<p id="f-doxcnwznxihPhekLaUndjd8KSMg"><span style="font-weight:bold">push-based announce</span></p>

<p id="f-doxcnpwdXdBpEZbHoeYDVIbJdRg"><span>具体实现上，子 Agent </span><span style="font-weight:bold">不是</span><span>同步返回值，而是异步 push：</span></p>

<ol start="1"><li id="f-doxcn3s2C6hBDzrfJch63CuNbMb"><span>子 Agent 完成任务</span></li></ol>

<ol start="2"><li id="f-doxcn363h9E4ZM7ykHT2MHSsLtg"><span><span><span>subagent-announce.ts</span></span></span><span> 把蒸馏后的结果以"用户消息"形式注入父 Agent 的消息队列</span></li></ol>

<ol start="3"><li id="f-doxcn8saTvPHPmkGLwErR6iO5Pe"><span>父 Agent 在 LLM 下一轮 turn 中感知到子 Agent 完成事件</span></li></ol>

<ol start="4"><li id="f-doxcnLIalM9FVo2luZ6hTRMUYgc"><span>父 Agent 等所有期待的子 Agent 都 announce 后，才输出最终回复</span></li></ol>

<p id="f-doxcn8USmyL19jCjlRcp9ovvcvc"><span>这是工具调用模式的一个变体：spawn 时立刻返回 </span><span><span><span>accepted</span></span></span><span>（非阻塞），结果通过消息通知而非返回值传回。可以看到以下这个代码注释，当子agent完成了结果后，会把结果发送到gateway中，gateway会把这个结果当成一条用户消息发送给父agent，当父agent收到这个消息时，就知道子agent完成了，当所有子agent都完成了，父agent就可以整合结果输出了。</span></p>

<blockquote id="f-doxcnky6ZVcINpeOc7WSPDwp7BI"><p id="f-doxcn9zNjmPanAjqQwE7WPnmTVh"><span>来源注释（代码原文）：  </span></p>
</blockquote>

<blockquote id="f-doxcnOJHtPOTcpfv1F5nfROjWOI"><p id="f-doxcnVR0BHnMod1jzKQrtnVy1gc"><span style="font-style:italic">"After spawning children, do NOT call sessions_list, sessions_history, exec sleep, or any polling tool. Wait for completion events to arrive as user messages."</span></p></blockquote>

<blockquote id="f-doxcnG3TU0wK5jB2N0bWKq1LwHh"><p id="f-doxcnEF650L7Ew10xW67XOpAmbg"><span>— </span><span><span><span>subagent-spawn.ts: SUBAGENT_SPAWN_ACCEPTED_NOTE</span></span></span></p></blockquote>

<a id="f-doxcnxvszzqFum9n0oSZFiOzIwh"></a>

###### 结果的整合

<p id="f-doxcntaUly6gkOchBclVy27O2Nc"><span>假设 Parent spawn 了 5 个子 Agent，它们各自完成后依次 push 消息回来，Parent 的对话历史里会陆续积累：</span></p>

<pre id="f-doxcncnwuMdgGlXehatrklhligb"><code>[消息] 子 Agent A 完成：结果是 X
[消息] 子 Agent B 完成：结果是 Y
[消息] 子 Agent C 完成：结果是 Z
...</code></pre>

<p id="f-doxcndBzF5jlcH0yvxqZSkfV7Sb"><span>每来一条 Parent 都被触发一次 turn，发现还没收全就等待，直到最后一条到达时，所有结果已经在上下文里了。这时提示词（</span><span><span><span>subagent-announce.ts</span></span></span><span> 的 Subagent Context）告诉 Parent：</span></p>

<blockquote id="f-doxcnEUyGZJzJJTpOJGtfUsQLng"><p id="f-doxcnDUCkOiC7f9DtpAfsC1spRg"><span style="font-style:italic">"Coordinate their work and synthesize results before reporting back."</span></p></blockquote>

<p id="f-doxcnHMF8pImpXJxJ7wpXr8yd3c"><span>结合 </span><span><span><span>subagent-spawn.ts</span></span></span><span> 里的：</span></p>

<blockquote id="f-doxcnuEE9eIfNyrw2VdVwXKms5b"><p id="f-doxcnpx4hVQraBe34yGjo95O3hh"><span style="font-style:italic">"track expected child session keys, and only send your final answer after ALL expected completions arrive."</span></p></blockquote>

<p id="f-doxcnizuNhMbo70dyqLPF4ZiQGc"><span>Parent LLM 在这一轮 turn 里自由整合所有结果，输出最终回复。</span></p>


<a id="section-0169"></a>
## 安全风险

<a id="f-doxcnt0VyJeBGAYRnc3jWua10zh"></a>

<p id="f-doxcnfc6SMc7xfY9DSSZ4dLXpeF"><span>OpenClaw 之所以强大，是因为它深度接入了你的系统——它可以运行 Shell 命令、读写文件、执行脚本、控制浏览器。但 access 是一把双刃剑：同样的能力让它能帮你干活，也让它成为潜在的攻击面。</span></p>

<p id="f-doxcn9sw79WoQfQ9UIk1tQbKiyh"><span>风险有多大</span></p>

<p id="f-doxcnZeJyUO3rJS5xNEwN6VowYY"><span>Cisco 的安全团队分析了 OpenClaw 的生态系统，发现 </span><span style="font-weight:bold">26% 的可用 skill 包含至少一种安全漏洞</span><span>。他们称之为 "security nightmare"。主要风险包括：</span></p>

<ul><li id="f-doxcnk2DrwSoyklCNZFGHcRiCih"><span style="font-weight:bold">Prompt Injection（提示词注入）</span><span>— 攻击者可以在邮件、文档、网页中嵌入恶意指令。当 Agent 读取这些内容时，可能被诱导执行非预期操作（比如泄露数据、发送消息、执行命令）。这是当前 AI Agent 最普遍且最难防御的攻击向量。</span></li></ul>

<ul><li id="f-doxcnkaF9tEMl2fimIJxYiVkD5b"><span style="font-weight:bold">恶意 Skill / 插件</span><span> — Marketplace 上的第三方 skill 可能包含恶意代码。安装一个 skill 等于授予它 Agent 的全部能力——Shell 执行、文件访问、网络请求。一个看似无害的 "天气查询" skill 可能在后台做任何事。</span></li></ul>

<ul><li id="f-doxcn0tNNFoESunmaM6wOVizdUd"><span style="font-weight:bold">凭证泄露（Credential Exposure）</span><span>— Agent 运行在你的机器上，可以访问环境变量、配置文件、SSH key、API token 等。如果 Agent 的行为被 prompt injection 劫持，这些凭证可能被外泄。</span></li></ul>

<ul><li id="f-doxcnyn8lFX6FEQWp8kXM7dZbxb"><span style="font-weight:bold">命令误解（Command Misinterpretation）</span><span>— Agent 可能误解你的意图，执行了你不想要的操作。比如你说"清理一下这个目录"，Agent 可能删掉你没打算删的文件。Shell 命令是不可逆的，</span><span><span><span>rm -rf</span></span></span><span> 不会问你确认。</span></li></ul>

<p id="f-doxcn5l0hV3KnZGnmaH5KXOsH2e"><span>官方怎么说</span></p>

<p id="f-doxcnSHkJh5mgc7wKT6WuOdNOGg"><span>OpenClaw 的官方文档也承认</span><span style="font-weight:bold">没有完美的安全 setup</span><span>。他们建议：</span></p>

<ul><li id="f-doxcne8UhDjXwsSeM44o1ET6WMh"><span style="font-weight:bold">使用隔离账号（isolated accounts）</span><span>— 不要用你的主账号运行 OpenClaw，创建一个权限受限的专用账号</span></li></ul>

<ul><li id="f-doxcnH1tvuAzjLaZGkRO4Dl3myw"><span style="font-weight:bold">使用次要设备（secondary machine）</span><span>— 最好在一台非关键机器上运行，而不是你的主力工作机</span></li></ul>

<ul><li id="f-doxcnabilhlhnlJWLmMzDZSrHSt"><span style="font-weight:bold">限制 skill 数量</span><span> — 只安装你确实需要的 skill，减少攻击面</span></li></ul>

<ul><li id="f-doxcnqETfFPihgh3Xx65cCDET9f"><span style="font-weight:bold">监控日志（monitor logs）</span><span>— 定期检查 Agent 的执行日志，了解它做了什么</span></li></ul>

<p id="f-doxcntv4xREnPVGnuuTTjKHNLwf"><span>本质矛盾</span></p>

<p id="f-doxcn4TbZX4lG17LfCjAfXWrQLh"><span>这是所有 AI Agent 平台面临的根本矛盾：</span><span style="font-weight:bold">能力越强，风险越大。</span><span> OpenClaw 的价值在于它能深度操作你的系统，但这也正是它的风险所在。它不像一个沙箱里的聊天机器人——它拥有真实的系统权限，运行真实的命令，访问真实的文件。任何一次 prompt injection、一个恶意插件、一次命令误解，都可能造成真实的后果。</span></p>


<a id="section-0170"></a>
## 面试问题

<a id="f-doxcnWdSWjUk8FFCOxbDOzF7NAd"></a>

<p id="f-doxcnayuU3Eupmci6LrxavV36je"><span>吸收了上面的问题，可以认为你可以足够应付大部分的openclaw面试问题。这一小节快速总结上述知识，给出标准面试参考答案，毕竟面试时不可能啰里吧嗦说一堆，用这些面试问题检验自己吧~</span></p>

<div style="margin-left:25px"><p id="f-doxcn3U7DnQDQDyPuSV9vakurag"><span style="font-weight:bold">Q1: OpenClaw 是什么？</span></p></div>

<p id="f-doxcnif0IhYGbuKyrtwPdx4k7vc"><span>OpenClaw 是一个开源的、可自托管的个人 AI 助手平台。本质上是一个事件驱动的 Agent 执行引擎，前面放了一个多渠道网关。用 TypeScript 编写，运行在你自己的机器上，所有数据和密钥不离开本地。</span></p>

<p id="f-doxcnLJpbkzvpQmcAgDAYDO2jqe"><span style="font-weight:bold">Q2: OpenClaw 的架构是什么？</span></p>

<p id="f-doxcnsYK8nKrpdZtWNirJ0plkMH"><span>三层架构：触发层、网关层、Agent 层。触发层有五种事件源（Messages、Heartbeats、Crons、Hooks、Webhooks）不断产生事件；网关层负责协议转换、认证和路由分发；Agent 层负责推理（Think）、工具执行（Act）和记忆（Remember）。本质是一个事件驱动的执行管道：事件产生 → 网关路由 → Agent 执行 → 状态持久化。</span></p>

<p id="f-doxcngBb8Cq9QnjLrzn9W40cUkg"><span style="font-weight:bold">Q3: Gateway 是什么？它的作用是什么？</span></p>

<p id="f-doxcnl441HjonwbyHKGQlNrO5df"><span>Gateway 是一个本地长驻的 Node.js 进程，监听单一端口（默认 18789），同时提供 HTTP 和 WebSocket。它是触发层和 Agent 层之间的中间件，负责渠道连接管理、协议转换、会话路由、认证鉴权、插件加载和设备配对。关键边界是：Gateway 不做推理、不调 LLM、不执行工具，只负责"消息到了该给谁"和"回复该送回哪里"。</span></p>

<p id="f-doxcno6cdeBXsjfYfM0yQiGHIcb"><span style="font-weight:bold">Q4: 有哪些消息源/触发源？</span></p>

<p id="f-doxcn3s882vKdyfpAzgjoZAaa0d"><span>五种：</span></p>

<div style="margin-left:25px"><div id="f-doxcnQfX0SnSSLdEdB1OMRZoHyb" style="display:flex;gap:0.5em"><span style="min-width:1.5em">a.</span><div><span style="font-weight:bold">Messages</span><span> — 用户通过聊天渠道发消息，事件驱动</span></div></div><div id="f-doxcnP2AWSIPNLh8Asaxj4VFmYg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">b.</span><div><span style="font-weight:bold">Heartbeats</span><span> — 固定间隔定时器（如每 15 分钟），让 Agent 主动唤醒</span></div></div><div id="f-doxcnKehW6hr9mNLmpk3cxscuwe" style="display:flex;gap:0.5em"><span style="min-width:1.5em">c.</span><div><span style="font-weight:bold">Crons</span><span> — 用户定义的计划任务（cron 表达式），执行具体的定时工作</span></div></div><div id="f-doxcnmW9tod5Tzsb2u42PiPnjad" style="display:flex;gap:0.5em"><span style="min-width:1.5em">d.</span><div><span style="font-weight:bold">Hooks</span><span> — Gateway/Agent 内部生命周期事件触发的回调</span></div></div><div id="f-doxcn6rypJozrkNxy1KXFsNQPTg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">e.</span><div><span style="font-weight:bold">Webhooks</span><span> — 外部系统通过 HTTP POST 触发</span></div></div><p id="f-doxcn1OhszchMGCTtNKlCSTes6b"><span>加上 Agents 可以派生 Subagents，形成递归执行。</span></p></div>

<p id="f-doxcn6OgriWq1qEIBZIFzuxRY9e"><span style="font-weight:bold">Q5: 为什么能接入各个平台？</span></p>

<p id="f-doxcnP4j3LffMUXkddV0Kpuk5cc"><span>因为 Gateway 层的 Channel Manager 把每个渠道封装为一个独立的 Channel Plugin，每个插件实现统一的接口（ChannelGatewayAdapter、ChannelMessagingAdapter、ChannelOutboundAdapter）。不同渠道的协议差异（Telegram Bot API、Discord WebSocket、WhatsApp Baileys 等）被封装在各自插件内部，对上层 Agent 暴露一致的消息接口。加一个新渠道只需写一个 Channel Plugin，Agent 代码零改动。目前支持 20+ 个渠道。</span></p>

<p id="f-doxcnnTe8bD0oxOD9tfRu5BaPPb"><span style="font-weight:bold">Q6: 记忆能力是如何实现的（或者说是长期记忆，注意和后面的记忆系统区分开）？</span></p>

<p id="f-doxcnXD0fvHbaQakAC1EnATbDkf"><span>记忆是 Agent 主动调用的工具，不是自动注入 prompt。Agent 通过 </span><span><span><span>memory_search</span></span></span><span> 工具进行混合检索（70% 向量语义搜索 + 30% BM25 关键词搜索），再通过 </span><span><span><span>memory_get</span></span></span><span> 读取完整内容。底层是 SQLite 数据库，同时维护向量 embedding 索引和全文索引。记忆写入有两种方式：会话结束时自动捕获为 Markdown 文件，以及用户手动编辑记忆文件后通过文件监听增量索引。</span></p>

<p id="f-doxcn1ztLI7145BJpH2WuH7ngoc"><span style="font-weight:bold">Q7: 相比传统 AI 聊天机器人，OpenClaw 的优势在哪？</span></p>

<p id="f-doxcnX6NdyRttEDFBrtk7KV4Zib"><span>四个核心差异：</span></p>

<div style="margin-left:25px"><div id="f-doxcnl2Kg0yyVRwFCbPj8Hny1he" style="display:flex;gap:0.5em"><span style="min-width:1.5em">a.</span><div><span style="font-weight:bold">不止聊天，能做事</span><span> — 可以执行 Shell 命令、控制浏览器、修改文件、远程操作设备，是一个真正的 Agent</span></div></div><div id="f-doxcnTSKCizvzfN6xOPPRgKeFPc" style="display:flex;gap:0.5em"><span style="min-width:1.5em">b.</span><div><span style="font-weight:bold">不止等消息</span><span> — 五种触发源让它能定时唤醒、自主行动，而不是只等用户说话</span></div></div><div id="f-doxcn9TDOP7bbVal6YMZv9BO2dg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">c.</span><div><span style="font-weight:bold">隐私自主</span><span> — 本地部署，LLM API 直连，数据不经过第三方服务</span></div></div><div id="f-doxcnotcUuxewoV6gfzff2JhzHd" style="display:flex;gap:0.5em"><span style="min-width:1.5em">d.</span><div><span style="font-weight:bold">渠道统一</span><span> — 一个 Agent 同时服务所有聊天平台，而不是每个平台各建一个 bot</span></div></div></div>

<p id="f-doxcnTTKgONx3CxJwRecscnnEve"><span style="font-weight:bold">Q8: OpenClaw 有什么优缺点？</span></p>

<div style="margin-left:25px"><p id="f-doxcn5YWZnAEsQteW9kvQ3baBih"><span>优点：</span></p><div id="f-doxcnpQhvDfTT0VIOSPaIuwvatf" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>开源自托管，隐私可控，数据不离开本地</span></div></div><div id="f-doxcnGKthbzSfZcGApVdnutObBc" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>支持 20+ 渠道，一个 Agent 统一服务</span></div></div><div id="f-doxcnvshhBy3NGMaEMBBbN1CJ4f" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>插件化架构，核心精简，能力可无限扩展</span></div></div><div id="f-doxcndAtsu0V9YvkWzU8DIPukXM" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>五种触发源，能主动行动而非只是被动回复</span></div></div><div id="f-doxcnE0GBSMmqOfpAVyvZEWdEib" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>支持多模型 provider，可灵活切换和 failover</span></div></div><p id="f-doxcnC7fJyYCVJyaOZTovwJwB2f"><span>缺点/风险：</span></p><div id="f-doxcnQDEm90De1sgIqNxRJgZG9b" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>深度系统权限带来安全风险——Cisco 分析发现 26% 的可用 skill 包含漏洞</span></div></div><div id="f-doxcngHxZ60fDlfklk3F05VPp9b" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>Prompt injection 攻击可能通过邮件/文档劫持 Agent 行为</span></div></div><div id="f-doxcnrD9PJbjubSJt0ovjJx33Yg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>第三方插件可能包含恶意代码</span></div></div><div id="f-doxcnEXVeoEJmc8HdaGnMYghjNh" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>命令误解可能导致不可逆操作（如误删文件）</span></div></div><div id="f-doxcnAFSybDkvTFb2drhx91Yczg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>官方也承认没有完美的安全 setup，建议用隔离账号和次要设备运行</span></div></div><p id="f-doxcn6IgxBrsik2k7QNnJmwGtv5"><span style="font-weight:bold">Q10 : 当对话超出上下文限制时，OpenClaw 的压缩策略是什么？</span></p><p id="f-doxcntsZEshWUztJk4MEXlSEC1e"><span>A:OpenClaw 采用的是</span><span style="font-weight:bold">分阶段摘要式压缩</span><span>。当上下文 token 用量接近模型窗口上限时会自动触发，用户也可以通过 </span><span><span><span>/compact</span></span></span><span> 命令手动触发。</span></p><p id="f-doxcnUi3CE90Iz3aFpx2NySe4Sh"><span>具体过程是这样的：首先把对话历史分成</span><span style="font-weight:bold">两部分</span><span>——最</span><span style="font-weight:bold">近大约 20,000 tokens 的消息作为"保留区"原封不动地留下来，更早的旧消息进入"压缩区</span><span>"。然后把压缩区的内容按 token 数切成若干块，默认是 2 块，块大小会根据消息平均长度自适应调整，同时预留 20% 的安全裕量防止 token 估算不准。接着用 LLM 对每一块生成结构化摘要，如果有多块就再合并成一份连贯的总结。摘要有严格的保留要求，必须包含进行中的</span><span style="font-weight:bold">任务状态</span><span>、</span><span style="font-weight:bold">用户最后的请求、决策理由、TODO 和约束条件，以及所有不透明标识符比如 UUID、URL、文件路径等，都必须原样保留。</span></p><p id="f-doxcnvKi5bAehgjDSnfWVQwPiBf"><span>另外还有一个亮点是</span><span style="font-weight:bold">压缩前记忆冲刷机制</span><span>：在真正压缩之前，系统会静默触发一轮 agent 回合，提醒模型把重要信息写入记忆文件，这样即使对话被压缩，关键知识也不会丢失。压缩完成后，模型看到的上下文就变成了"压缩摘要加上保留区原文"这样的结构。</span></p></div>

<div style="margin-left:25px"><p id="f-doxcnLzQPL6dDzTJhgL5ruqsOgd"><span style="font-weight:bold">Q11: OpenClaw 如何组织长短期记忆？</span></p><p id="f-doxcns0qCAhg5WZZMPzZagWic6f"><span>A11:OpenClaw 的记忆分为</span><span style="font-weight:bold">短期记忆</span><span>和</span><span style="font-weight:bold">长期记忆</span><span>两部分，各自有不同的存储形式和组织方式。</span></p><p id="f-doxcngiX564gnvoH0j8Gg3PG59e"><span style="font-weight:bold">短期记忆就是当前会话的对话上下文，包括用户消息、助手回复、工具调用结果这些内容，全部在 Context Window 里以消息列表的形式存在</span><span>。它的特点是容量受模型上下文窗口限制，比如 Claude 是 200K tokens，满了之后旧的对话就会被压缩成一段结构化摘要，只保留最近约 20,000 tokens 的原始消息。所以短期记忆本质上是临时的、会被压缩的。</span></p><p id="f-doxcnNjuzZRP7NhNr4xk2o86l4e"><span style="font-weight:bold">长期记忆则完全基于磁盘上的 Markdown 文件，分成两种组织方式</span><span>。</span><span style="font-weight:bold">第一种是 </span><span style="font-weight:bold"><span><span>MEMORY.md</span></span></span><span>，这是一个策展式的长期记忆文件，存放的是用户偏好、持久性决策、重要事实这些需要长期保留的内容，由 Agent 主动维护和更新，每次会话启动时注入上下文，不受压缩影响。</span><span style="font-weight:bold">第二种是 </span><span style="font-weight:bold"><span><span>memory/YYYY-MM-DD.md</span></span></span><span>，按日期组织的追加式日志，存的是当天的运行笔记、阶段性进展、临时但值得回顾的上下文，会话启动时只读入今天和昨天的内容。</span></p><p id="f-doxcnOtk4EHmJrkXvbs04C72Jng"><span>长</span><span style="font-weight:bold">期记忆还配有一套检索索引机制</span><span>。系统会对所有记忆文件建立混合搜索索引，包括</span><span style="font-weight:bold">向量语义搜索和 BM25 关键词搜索</span><span>，Agent 在需要的时候通过 </span><span><span><span>memory_search</span></span></span><span> 工具按需检索，不用把全部历史记忆都塞进上下文里。这样即使记忆文件越积越多，也不会撑爆上下文窗口。</span></p><p id="f-doxcnUiarDTXHPi4KBBXT2OTGmb"><span>两者之间的衔接靠的是压缩前记忆冲刷：当短期记忆快满需要压缩时，系统会先静默提醒 Agent 把当前对话中重要的内容写入长期记忆文件，然后再做压缩。这就保证了短期记忆中真正有价值的信息能沉淀到长期记忆里，不会因为压缩而彻底丢失。</span></p></div>

<p id="f-doxcnYFr0j5Rk0dm7UcmvSjkWnh"><span style="font-weight:bold">Q12: 简述 OpenClaw 的记忆系统原理。</span></p>

<div style="margin-left:25px"><p id="f-doxcnxpCKWKhVeiR0lE8KMWBzCb"><span>A12:OpenClaw 的记忆模块并不是单一系统，而是由四层协同机制组成的，可以类比计算机的存储层次。</span></p><p id="f-doxcnkvTfKwQlkafMFG8O5k7z2g"><span style="font-weight:bold">第一层是 Bootstrap Files</span><span>，相当于硬盘上的固件。包括 SOUL.md、AGENTS.md、USER.md、MEMORY.md 等 Markdown 文件，存放的是 Agent 的人格设定、行为规则、用户身份和策展过的长期知识。它们每次会话启动时都从磁盘重新读取注入上下文，完全免疫压缩，是最稳定的一层记忆。不过有字符上限，单文件 20,000 字符，总计 150,000 字符，所以要保持精简。</span></p><p id="f-doxcnq9GFwtS43NLnYKqrvbN1kd"><span style="font-weight:bold">第二层是 Session Transcript</span><span>，相当于文件系统日志。完整的对话历史用 JSONL 格式逐条追加写入磁盘，包括用户消息、助手回复、工具调用和压缩摘要。它是跨重启持久的，继续会话时从 JSONL 重建上下文。但模型不是看全部记录，而是只看当前上下文窗口能装下的部分，更早的内容通过压缩变成摘要。</span></p><p id="f-doxcn1OcZVmDZQ0I8hh0lSiX9Ef"><span style="font-weight:bold">第三层是 Context Window</span><span>，相当于 RAM。就是模型每轮推理时实际能看到的所有内容，包括系统提示、Bootstrap Files、对话历史、工具返回结果都挤在这个固定大小的空间里。容量由模型决定，满了就触发 Compaction。压缩时把最近约 20,000 tokens 原样保留，更早的消息用 LLM 生成结构化摘要替代，摘要里必须保留任务状态、决策理由、TODO 和关键标识符。压缩前还会静默提醒 Agent 把重要信息写入记忆文件，防止信息丢失。</span></p><p id="f-doxcnTwoeAWYRKM2CXkbkZFeopg"><span style="font-weight:bold">第四层是 Retrieval Index</span><span>，相当于搜索引擎。系统对所有记忆文件建立混合搜索索引，同时使用向量语义搜索和 BM25 关键词搜索，按 7:3 权重融合排序。Agent 通过 memory_search 和 memory_get 这两个工具按需检索，不需要把全部记忆都塞进上下文。检索是模型自主决策的，不是每轮自动触发。索引还支持时间衰减和去重，新笔记排名更靠前。</span></p><p id="f-doxcnJDS1ktav4cOthJHsXRFLif"><span style="font-weight:bold">这四层的协同逻辑是</span><span>：Bootstrap Files 提供稳定的身份和规则基座，Session Transcript 保存完整的历史记录，Context Window 管理当前可见的工作记忆并在满时通过压缩保持可用，Retrieval Index 让 Agent 能按需回忆历史而不占用上下文空间。关键设计原则是只有写入磁盘文件的信息才是真正持久的记忆，纯对话中没有持久化的内容压缩后就不可恢复了。</span></p><p id="f-doxcniEPu0a9k6z2RsALUe0T51L"><span style="font-weight:bold">Q13：OpenClaw 采用了什么 Agent 架构？</span></p><p id="f-doxcnYndD3xOmmbXLjUuYntnyig"><span>A：递归 Centralized（中心化）架构。Parent Agent 作为中心，通过 LLM 的 tool call 机制调用 </span><span><span><span>sessions_spawn</span></span></span><span> 工具创建子 Agent 执行子任务，子 Agent 完成后 push 结果回父，父 Agent 等所有子任务完成后整合输出。子 Agent 可以继续 spawn 孙 Agent，形成一棵 Orchestrator-Worker 树，每一层都是该层的中心。</span></p></div>

<div style="margin-left:25px"><p id="f-doxcniXr311jCAAmhQ4uAj4GwgD"><span style="font-weight:bold">Q14：OpenClaw 中的 Agent 是如何通信的？</span></p><p id="f-doxcnkdamYtXwJyrddw7g1s1UId"><span>A：通信模式上是</span><span style="font-weight:bold">工具调用</span><span>，控制权始终留在 Parent Agent。具体实现是 push-based 异步消息：子 Agent 完成后通过 `subagent-announce.ts` 调用 `callGateway({ method: "agent" })`，Gateway 把结果以"用户消息"的形式投递到父 Agent 的消息队列，触发父 Agent 的下一轮 LLM 推理。父 Agent 不轮询、不阻塞线程，等消息触发即可。</span></p><p id="f-doxcngnQt7UQ61BQE3BRGDgpMie"><span>传递内容上只传</span><span style="font-weight:bold">最终结果</span><span>，子 Agent 的中间推理步骤（tool call 链、chain-of-thought）全部留在私有 session 里，不传给父 Agent，有效控制上下文膨胀。</span></p></div>

<div style="margin-left:25px"><p id="f-doxcnuJ6n4RwpmMibpUlqUqjkJc"><span style="font-weight:bold">Q15：为什么 OpenClaw 要选择中心化的 Agent 架构？</span></p><p id="f-doxcnmXRccXZqH1ObPuMZP5NYxd"><span>A：根本原因是对话本身的结构是中心化的——有确定的入口（用户发消息），有确定的出口（给用户一条完整回复），中间的执行可以分发，但责任链不能断。</span></p><p id="f-doxcnkpBh0yDvDdmM4eaoAH5DCg"><span>如果换成去中心化（P2P 协商），最终谁来发回复没有确定答案；如果换成 Independent（各自独立），结果无法拼合成一条完整回复。Centralized 的父子结构正好对应这个"一进一出"的模型：Parent Agent 是唯一的回复责任人，子 Agent 只是它延伸执行能力的手段。</span></p></div>

<div style="margin-left:25px"><p id="f-doxcnQFVAAbfIIqZQ77G4Nd5gUd"><span style="font-weight:bold">Q16：使用 Centralized 架构后，系统性能受限于 Parent Agent，如何解决？</span></p><p id="f-doxcnXnI4fotaNCz3PGWWPl1xBb"><span>A：这是 Centralized 架构的经典瓶颈。OpenClaw 在设计上从三个方向缓解这个问题：</span></p><p id="f-doxcnlCcGUNXNGK1NrVvM9UOHzD"><span>1. </span><span style="font-weight:bold">减少 Parent 的工作量</span><span>：Parent 只做编排和最终整合，不做具体执行。OpenClaw 在子 Agent 的系统提示词里明确约束（`subagent-announce.ts` Subagent Context）：</span><span style="font-style:italic">"Stay focused - Do your assigned task, nothing else"</span><span>、</span><span style="font-style:italic">"NO user conversations (that's parent's job)"</span><span>。子 Agent 不允许跑题、不允许主动发消息，Parent 只需要等结果、做最终决策，每轮 turn 的工作量被压到最低。</span></p><p id="f-doxcnKyNBmFcgflTZWTfiLMUkeb"><span>2. </span><span style="font-weight:bold">并行化子任务</span><span>：Parent 可以同时 spawn 多个子 Agent 并行执行，不需要串行一个一个等。总耗时取决于最慢的那个子 Agent，而不是所有子任务时间之和。Parent 在提示词里也被告知可以同时 spawn 多个任务，依靠 push-based announce 各自回来触发汇总。</span></p><p id="f-doxcnNtHuhHFp0f0FQykT1n9uKb"><span>3. </span><span style="font-weight:bold">并发数量限制（稳定性护栏）</span><span>：并行是加速手段，但无限并行会耗尽系统资源，所以 OpenClaw 同时设置了两层上限作为反向约束：单个 session 的活跃子 Agent 数由 `maxChildrenPerAgent` 控制（默认 5，来源：`subagent-spawn.ts:344`），全局所有子 Agent 的并发数由 `DEFAULT_SUBAGENT_MAX_CONCURRENT` 控制（默认 8，来源：`src/config/agent-limits.ts`）。超出上限时 `sessions_spawn` 直接返回 `forbidden`，防止雪崩。</span></p><p id="f-doxcnSYKrUpN9YK9xzHZ1oW05td"><span>3. </span><span style="font-weight:bold">递归下推编排</span><span>：当配置 `maxSpawnDepth &gt;= 2` 时（默认是 1），子 Agent 本身也可以变成 Orchestrator（角色从 `leaf` 升级为 `orchestrator`，`sessions_spawn` 工具会被加入其工具列表），继续向下 spawn 孙 Agent，把编排压力分散到子层。Parent 只负责顶层任务拆解，不需要直接管所有叶子节点。</span></p><p id="f-doxcn5FcWKRbRLn5bcLyIhlokEh"><span>4. </span><span style="font-weight:bold">按角色分配模型</span><span>：`sessions_spawn` 的参数支持 `model` 和 `thinking` 覆盖，可以给 Parent 配置推理能力强的模型做决策，给执行型子 Agent 配置更快更轻量的模型做具体任务，按角色分配算力而不是一刀切。</span></p></div>


<a id="section-0171"></a>
## 参考资料

<a id="f-doxcnxKoerSinodUSXm8Y07Sqhg"></a>

<p id="f-doxcnJLz4Ct8yBIdxwyfRqRW1zZ"><span>首先是OpenClaw的Setup，网上太多啦，我就分享两个我看过的视频，我确实跟着他操作起来的。</span></p>

<p id="f-doxcnijew1Oa5bLvEMSquHB6KWb"><span>2026/2/14发布的：《15分钟用Openclaw + GLM5打造国内最强AI助手》 讲了环境配置，以及接入飞书和GLM5模型</span></p>

<p id="f-doxcnMpv8iVGTIVoCPY7OuTpu2b"><span>2026/2/27发布的:《一个视频让你Openclaw技术瞬间超过90%的人》 ：讲了Openclaw基本必须会的技巧。</span></p>

<p id="f-doxcnPbr6dvn8dugBrmocoIMozb"><span style="font-weight:bold">然后是技术学习：</span></p>

<p id="f-doxcn3OLCI3M2A3uLilKszGOp6b"><span>推荐直接看本节 + 源码（毕竟openclaw开源嘛）。本节一些知识部分直接引用了对应的代码，是为了你如果想要去读源码可以和笔记的内容匹配上。感兴趣也可以去看看。</span></p>

<div style="margin-left:25px"><p id="f-doxcn5B1AnbyTDbAOJIm7GHjsHh"><span>10多分钟，讲openclaw架构和安全</span></p><p id="f-doxcnYwV6RHhds7UPrNlgBHjjCe"><span><span><a href="https://www.youtube.com/watch?v=CAbrRTu5xcw"><span>https://www.youtube.com/watch?v=CAbrRTu5xcw</span></a></span></span></p><p id="f-doxcneObZBBWepeMtgwiIrpmyFc"><span>40多分钟，更全面的openclaw技术细节</span></p><p id="f-doxcnwXreIV8tM5qPHaeyzGNLdg"><span><span><a href="https://www.youtube.com/watch?v=vte-fDoZczE"><span>https://www.youtube.com/watch?v=vte-fDoZczE</span></a></span></span></p><p id="f-doxcnJHvHdgfs7kqWCLhFbbHk6f"><span>讲Openclaw 4层记忆layer的，不过本节都总结了</span></p><p id="f-doxcnjWuW8GRPvL9S2R7HUmHdgh"><span><span><a href="https://www.youtube.com/watch?v=HM0ATQCHGP0"><span>https://www.youtube.com/watch?v=HM0ATQCHGP0</span></a></span></span></p></div>


<a id="section-0172"></a>
## 开源框架解读 - Hermes Agent

<a id="f-doxcnc8YH0bvC3K6RFin6B4JnIh"></a>

<p id="f-doxcnyh0pqKOh38vbNfsBQlwMBe"><span>（写于 2026 年 4 月份底）如果说 2025 年的风向标是 Manus，2026 年初是 OpenClaw，那么 2026 年春天以来最火的 Agent 就是 </span><span style="font-weight:bold">Hermes Agent</span><span>——它在 OpenRouter 上已经是 top trending coding agent，仅次于 OpenClaw。站在面试角度，Hermes 已经是必须掌握的第二个Agent 爆品：它和 OpenClaw 属于</span><span style="font-weight:bold">同一类产品</span><span>。它和OpenClaw是同一类产品：它们的使用形式和功能是类似的。但是Hermes 最出圈的一点是它的自我进化能力，就是它看上去能记事，更聪明。拍脑袋想我们大概也知道Hermes 最常考的内容是啥："和Openclaw的区别，新的实现，为什么能自我进化，记忆模块", 这也是Hermes最核心的卖点和创新点。</span></p>

<p id="f-doxcnldgfVhbAmriS7tFsFgUFHb"><span>Hermes 是什么、总体架构、记忆系统（四层 → 五层）、Agent 架构，以及 Hermes 独有的 </span><span style="font-weight:bold">自进化循环</span><span> 和 </span><span style="font-weight:bold">自动 Skill 沉淀</span><span> 两个核心新特性。学完这一章你应该能在面试时说清楚"为什么在同样的模型下 Hermes 跑得更快、越用越懂你"，并把 Hermes 的设计思路搬到自己的 Agent 项目里加分。</span></p>


<a id="section-0173"></a>
## Hermes Agent是什么

<a id="f-doxcnkubrp1GVdUfpuhJxrPpjAc"></a>

<p id="f-doxcn2xskaVeBIyYCVJWoXf9dHh"><span>Hermes Agent 是 </span><span style="font-weight:bold">Nous Research</span><span> 推出的开源、可自托管的自主 AI Agent 平台，核心卖点是</span><span style="font-weight:bold">自我进化</span><span>（self-improving）：同一个模型，用得越多，它越懂你。</span></p>

<ul><li id="f-doxcnq5P72fZBGbQbA83Dr7Bgxn"><span>核心用 </span><span style="font-weight:bold">Python</span><span> 编写（入口脚本 </span><span><span><span>hermes-agent/hermes</span></span></span><span>、</span><span><span><span>cli.py</span></span></span><span>），通过 </span><span><span><span>pip install hermes-agent</span></span></span><span> 或官方一行安装脚本部署</span></li></ul>

<ul><li id="f-doxcnrqW7u3I9ptOSBgmXWs1a3f"><span>支持 Linux / macOS / WSL2 / Termux（</span><span style="font-weight:bold">Windows 原生不支持，需要 WSL2</span><span>）</span></li></ul>

<ul><li id="f-doxcncXMk2H7yswc44fGz6i1gNe"><span>所有数据都存在本地（</span><span><span><span>~/.hermes/</span></span></span><span>），和 OpenClaw 一样不经过云中转</span></li></ul>

<ul><li id="f-doxcnl0dYeNuFgbRJN1wQUyjdDd"><span>MIT 协议开源，与 OpenClaw 可通过 </span><span style="font-weight:bold">ACP 协议</span><span>互相调度</span></li></ul>

<p id="f-doxcnFelB4fH2NgmeAt7m9NhADb"><span style="font-weight:bold">Hermes 是一个带"自进化闭环"的事件驱动 Agent 执行引擎</span><span>——OpenClaw 做的它都做（多渠道网关、cron、子 Agent），但它额外把"经验沉淀成可复用 skill"和"持续学习用户画像"做成了一等公民。</span></p>


<a id="section-0174"></a>
## Hermes 总体架构

<a id="f-doxcnlCyz35Wg97R5mwtKr9xcDf"></a>

<p id="f-doxcnUsB9je6BcpRZr56XqCIv6b"><span>Hermes 的总体架构是</span><span style="font-weight:bold">三层主干 + 一圈闭环</span><span>——主干三层是</span><span style="font-weight:bold">触发层（Trigger）→ 网关层（Gateway）→ Agent 层（Agent Loop）</span><span>，和 OpenClaw 完全同构；闭环是 Agent 层额外挂的</span><span style="font-weight:bold">自进化回路（Reflect → 记忆/Skill 沉淀 → 反哺下一次触发）</span><span>，这是 Hermes 区别于 OpenClaw 的核心。</span></p>

<p id="f-doxcnqnAI1zGaxbfNb0ihiVl14k"><span>所以当面试官问"Hermes 架构是几层"时，标准答法是：</span><span style="font-weight:bold">"主干 3 层 + 1 个自进化闭环"</span><span>，然后按下面的图展开。</span></p>

<p id="f-doxcnfrFehPQUgnaVKWSVBOod3g"><span>看完第 10 章 OpenClaw 架构这部分可以秒懂，差异集中在 Agent 层额外多了一圈</span><span style="font-weight:bold">自进化闭环</span><span>：</span></p>

<pre id="f-doxcnPR1DDwkRE7cmgsV12uDqEb"><code>触发层  →  网关层  →  Agent 层  →  记忆/Skill 沉淀  →  反哺下一次触发
                              └── 每 ~15 次 tool call 触发自进化反思</code></pre>

<a id="f-doxcn8TAIKAUGKcNBT2toP3TkDh"></a>

##### 触发层

<p id="f-doxcnE35ImUq66yAJxXTNIvxRRb"><span>Hermes 的触发维度和 OpenClaw 一一对应，同样是 </span><span style="font-weight:bold">5 种信号源</span><span>，没有新东西。</span></p>

<ul><li id="f-doxcnDlzd00BfbJ7HEOhEX7kWfe"><span style="font-weight:bold">Message（消息）</span><span> — CLI、Telegram、Discord、Slack、WhatsApp、Signal、Email（比 OpenClaw 多一个 Email）</span></li></ul>

<ul><li id="f-doxcntMFZRF1uAobhpzze6mlwwb"><span style="font-weight:bold">Heartbeat（心跳）</span><span> — 周期性唤醒 Agent 进行自检 / 续跑</span></li></ul>

<ul><li id="f-doxcnggFKPDy1TKtiuPavFBTEsl"><span style="font-weight:bold">Cron（定时任务）</span><span> — 内置 cron 调度器（源码 </span><span><span><span>hermes-agent/cron/scheduler.py</span></span></span><span>、</span><span><span><span>cron/jobs.py</span></span></span><span>），支持每日/每周自动任务并推送到任意平台</span></li></ul>

<ul><li id="f-doxcnM70sdu6ELTcq9IBulhxEo0"><span style="font-weight:bold">Webhook（外部推入）</span><span> — 同样支持外部系统 HTTP 推入</span></li></ul>

<ul><li id="f-doxcn9toSe3qpFp1lbLX6QgZSXf"><span style="font-weight:bold">Hooks（生命周期钩子）</span><span> — 会话开始/结束、工具调用前后等事件挂钩，可触发自定义逻辑</span></li></ul>

<a id="f-doxcnbV02jDPDkRQe2dJgaO8zhe"></a>

##### 网关层 - 一进程多渠道

<p id="f-doxcnZKYAPjuDiWS8SdoGBQzrNe"><span style="font-weight:bold">Gateway 是什么</span><span>：本地长驻的一个进程，是触发层和 Agent 层之间的中间件——所有外部事件（消息、webhook、cron 触发）都先进 Gateway，由它统一接入、认证、再分发给对应的 Agent session。</span></p>

<p id="f-doxcng16kqmUYa0BGVShe4vDFVc"><span style="font-weight:bold">核心职责（4 件事，别跑偏）</span><span>：</span></p>

<ol start="1"><li id="f-doxcnVae6X9PbBWZ31e5rn3kSXg"><span style="font-weight:bold">连接管理</span><span>：同时维持多个渠道的长连接（CLI、Telegram、Discord、Slack、WhatsApp、Email……一进程多渠道）</span></li></ol>

<ol start="2"><li id="f-doxcnXD0fkWXhOqI8TgJoTUwaJb"><span style="font-weight:bold">协议转换</span><span>：把 Telegram 的 JSON、Discord 的 WebSocket 帧、Email 的 MIME、Webhook 的 HTTP POST 等不同协议，统一转换成内部标准事件格式</span></li></ol>

<ol start="3"><li id="f-doxcnIAJjMYD4UE2oDlgv8uhm9b"><span style="font-weight:bold">路由分发</span><span>：根据事件里的 agentId / sessionId，把事件投递给正确的 Agent 会话；回复也按原路送回对应渠道</span></li></ol>

<ol start="4"><li id="f-doxcnCsuL94ejNlfVpt3EfApQpe"><span style="font-weight:bold">安全控制</span><span>：入口处做认证（token / 签名校验）、限流、沙箱隔离</span></li></ol>

<p id="f-doxcnXZY8ioWrcRxEwx3VeecChd"><span style="font-weight:bold">关键边界（面试必答）</span><span>：Gateway </span><span style="font-weight:bold">只做路由，不调 LLM，不执行工具</span><span>。它只回答两个问题——"这条消息该给哪个 Agent？"、"Agent 的回复该送回哪个渠道？"。这个边界让 Gateway 保持轻量，可以横向扩展，Agent 换掉也不影响接入层。</span></p>

<p id="f-doxcnQUnWQNo8w6qc6X0GoY7HCg"><span>一句话总结：</span><span style="font-weight:bold">Gateway = 多渠道适配器 + 路由器 + 安全网关</span><span>，是"一个 Agent 能同时出现在 Telegram、Discord、CLI 里"的技术基础。</span></p>

<a id="f-doxcnIuQu49uxywDZyfgi4jDq2f"></a>

##### Agent 层

<p id="f-doxcnprdDTodUXWzlSSUXw0Y9ic"><span>Agent 层是整个 Hermes 的"大脑"，Gateway 把事件路由过来之后，真正的推理、工具调用、记忆读写全在这里完成。</span></p>

<p id="f-doxcnfVCN4cv9Vxn4LW9qIvQCGe"><span style="font-weight:bold">Agent 循环的 4 步</span><span>：</span><span style="font-weight:bold">Think（推理）→ Act（工具执行）→ Remember（记忆读写）→ Reflect（周期性反思）</span><span>。前三步是所有 Agent 都有的标准循环，第 4 步 Reflect 是 Hermes 的独有创新（即</span><span style="font-weight:bold">自进化闭环</span><span>），在 11.3 节详细展开。</span></p>

<blockquote id="f-doxcn1LqntA363Y2s8p4gfg7IPe"><p id="f-doxcn7mA7Fxq6Wqr8S9n4ICv8Ie"><span style="font-weight:bold">自进化循环是什么？</span><span> 一句话先打个底：这是 Hermes 的"自我反思 + 经验沉淀"模块。用一句话概括就是 "</span><span style="font-style:italic">like back propagation but for prompts instead of model weights</span><span>"——</span><span style="font-weight:bold">像反向传播，但更新的不是模型权重，而是 prompt / 记忆 / skill</span><span>。周期性触发，让 Agent 回看自己刚才做了什么，把有价值的事实写进 </span><span><span><span>memory/</span></span></span><span> md 文件、把成功流程抽象成 Skill、把用户偏好更新到 </span><span style="font-weight:bold">Honcho</span><span>（一个独立的第三方开源用户建模服务，</span><span><span><span>honcho.dev</span></span></span><span>，专门给 Agent 存"这个用户是谁"——偏好、沟通风格、目标；Hermes 作为可选依赖集成它）。完整机制在 11.4.4 讲。后面章节会反复提到"自进化循环"，看到它就想"这是 Hermes 的周期性反思和写记忆的机制"即可。</span></p></blockquote>

<p id="f-doxcn2deQxgKPxLrzJSKNHUguvd"><span style="font-weight:bold">什么叫"循环"——ReAct 范式</span><span>：</span></p>

<p id="f-doxcn0Hh56qZzrGfS7UUd0WoNre"><span>Agent 不是"想一次就直接输出答案"的单次推理，而是**"思考 → 行动 → 观察结果 → 再思考"的多轮迭代**，这就是业界最经典的 </span><span style="font-weight:bold">ReAct 范式</span><span>（Reasoning + Acting）。一次典型的循环长这样：</span></p>

<pre id="f-doxcnzodvfFrwEi5SgQTziBCzId"><code>收到用户消息
    ↓
┌──────────────────────────────────────────────┐
│  Think  （调 LLM，自己做决策）                 │
│  LLM 根据当前上下文，输出以下三选一：           │
│   A. 信息不够 → 需要调工具 X，参数 Y          │
│   B. 需要回忆旧信息 → 调 memory_search        │
│   C. 信息够了 → 生成最终回复，结束循环         │
└────────────────┬─────────────────────────────┘
                 │
       ┌─────────┴──────────┐
       │                    │
   A/B:调工具            C:直接回复
       │                    │
       ▼                    ▼
┌──────────────────┐   输出最终回复给用户
│  Act  （执行工具） │   （循环结束）
│  → browser / exec │
│  → 拿到结果       │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Remember        │
│  （读写记忆，可选）│
└────────┬─────────┘
         │
         ▼
   工具结果回灌上下文
         │
         └──→ 回到 Think（LLM 再次决策 A/B/C）</code></pre>

<p id="f-doxcnpoXTjzzNDzX5grxQ6JbPeh"><span style="font-weight:bold">关键性质</span><span>：</span></p>

<ul><li id="f-doxcnCwSJuXm6qZDLgGJ2olumgh"><span style="font-weight:bold">"任务完不完，由 LLM 自己判断"</span><span>：没有外部调度器在循环外面数圈，而是每一轮 Think 里 LLM 根据当前上下文自主决定"继续调工具"还是"输出回复、结束"。这就是 ReAct 的精髓——</span><span style="font-weight:bold">决策权在 LLM 手里</span><span>。</span></li></ul>

<ul><li id="f-doxcnxxm0zfITcAGeT1bXVX2o5f"><span style="font-weight:bold">Think 和 Act 是交替的，不是一次性的</span><span>。同一个任务可能循环 3 次、10 次甚至几十次 tool call 才结束。</span></li></ul>

<ul><li id="f-doxcnBUXg9ZdJCsAHbmx5lYxxIf"><span style="font-weight:bold">每一轮的工具结果都会回灌到下一轮 Think 的上下文里</span><span>，让 LLM 基于新信息继续推理——这就是"推理 + 行动"比"纯推理"强的原因。</span></li></ul>

<blockquote id="f-doxcnTHydn4XNszm4dJRNi2aVkc"><p id="f-doxcnS1jilOWbxXSmNarnwDW2Pg"><span>下面三个小节（11.2.3.1 / 11.2.3.2 / 11.2.3.3）分别讲这个循环里每一步的</span><span style="font-weight:bold">具体实现</span><span>——Think 层如何调 LLM、Act 层有哪些工具、Remember 层的记忆怎么组织。</span></p></blockquote>

<a id="f-doxcnvEjEVx2Y2s6MqgYZdOf5sg"></a>

###### 推理 (Think)

<p id="f-doxcnYJCV34YXB6FvJsO0uwAISh"><span>Think 层的职责很聚焦：</span><span style="font-weight:bold">把当前上下文（系统提示 + Bootstrap Files + 对话历史 + 上一轮工具结果）送给 LLM，拿到 LLM 的下一步决策</span><span>（直接回复 / 调用某个工具 / 调用子 Agent）。</span></p>

<p id="f-doxcnmfRyeJGj5JeBvaICKmBaBb"><span>Hermes 在 Think 层的核心要点是</span><span style="font-weight:bold">主模型 + 辅助模型分工（Auxiliary Client）</span><span>。</span></p>

<p id="f-doxcnS02JyDbeaKuvcTcnEmp7rh"><span>Hermes 允许同时配置两个模型，让不同能力的模型干不同的活：</span></p>

<ul><li id="f-doxcnYCpElxfyA74ZBbnZS9ifRg"><span style="font-weight:bold">主模型</span><span>：做长链推理、规划、复杂任务——用强模型（如 Claude Opus、GPT-5）</span></li></ul>

<ul><li id="f-doxcn3xCjxJS9QNaBzecAXKfkw3"><span style="font-weight:bold">辅助模型</span><span>：做压缩、摘要、分类、错误归类等轻量任务——用便宜/本地的弱模型（如 Qwen、Gemma）</span></li></ul>

<p id="f-doxcnzUXsXbXO7HhLfv8KBKbVGg"><span>这样做的价值是</span><span style="font-weight:bold">在成本、速度、质量之间取得平衡</span><span>——长链推理用贵的，但压缩一段对话历史这种活没必要也让 Opus 来干。这也是 harness engineering 的典型思路：</span><span style="font-weight:bold">不是用一个模型解决所有问题，而是把任务按难度分层、匹配合适的模型</span><span>。</span></p>

<a id="f-doxcnIhIo4Kuf6CoUVFpyhM71qf"></a>

###### 工具执行 (Act)

<p id="f-doxcnoMS72YtSmLROlTbnSE25Ye"><span>Agent 推理过程中可以自主决定调用工具。Hermes 的内置工具覆盖了 Agent 干活的几乎所有场景：</span></p>

<ul><li id="f-doxcn8hxVcrvmQ56LUGra4RGCDe"><span style="font-weight:bold">终端/exec</span><span> — 执行 Shell 命令（带 allowlist 安全策略）</span></li></ul>

<ul><li id="f-doxcnDpB9Spj2MEVoDB0L0EEQ6d"><span style="font-weight:bold">浏览器</span><span> — 通过 CDP 控制 Chromium，浏览网页、截图、操作页面</span></li></ul>

<ul><li id="f-doxcn8iH2HY9ivS6y3BeovdxlFc"><span style="font-weight:bold">文件操作</span><span> — 读写本地文件、应用 patch</span></li></ul>

<ul><li id="f-doxcnmgfIrMrROqWtsjc9euNLIX"><span style="font-weight:bold">消息发送</span><span> — 向任意渠道（Telegram / Discord / Email …）发送消息</span></li></ul>

<ul><li id="f-doxcnh7rmZDn2ormOgPkn6ssBhf"><span style="font-weight:bold">Subagent Spawn</span><span> — 启动子 Agent 处理复杂/并行任务</span></li></ul>

<ul><li id="f-doxcnNYtVGeMeVzQmHKPVEfddXb"><span style="font-weight:bold">MCP 集成</span><span> — 通过 Model Context Protocol 接入任意外部工具生态</span></li></ul>

<p id="f-doxcnQbvGK5nFqHVpOKYii5lDoc"><span>Hermes 的一个特色是 </span><span style="font-weight:bold">6 种终端后端</span><span>：</span><span><span><span>local</span></span></span><span> / </span><span><span><span>Docker</span></span></span><span> / </span><span><span><span>SSH</span></span></span><span> / </span><span><span><span>Daytona</span></span></span><span> / </span><span><span><span>Singularity</span></span></span><span> / </span><span style="font-weight:bold"><span><span>Modal</span></span></span><span>（serverless 持久化，闲时近乎零成本）——这给 Agent 提供了从本地开发到云端大规模执行的全套部署选项。</span></p>

<p id="f-doxcnYkialYNra7Ur9tFDO1n6gd"><span>Hermes 独有的一个小设计：</span><span style="font-weight:bold">Error Classifier</span><span>（</span><span><span><span>agent/error_classifier.py</span></span></span><span>）——把常见失败模式（网络错误、权限错误、文件不存在、rate limit 等）预编码成分类器。这样当工具调用失败时，弱模型不需要从错误消息里自己推理"这是什么错、该怎么恢复"，而是由 Error Classifier 直接把错误归类成已知类别，走预设恢复路径。这就是 harness engineering 的典型落地——</span><span style="font-weight:bold">用系统层面的预处理，降低对模型推理能力的依赖</span><span>。</span></p>

<a id="f-doxcnRU18z27nuLUf8bAeiMflKd"></a>

###### 记忆 (Memory) &amp; Skills

<p id="f-doxcnXCycgah48fdSn8IXkKdOae"><span>记忆是 Agent 层的第三个核心组件，但不是每次对话都自动塞入上下文（那样太浪费 token），而是 </span><span style="font-weight:bold">Agent 主动按需检索</span><span>——Agent 自己判断"需不需要回忆过去"，然后调用记忆工具去搜索。</span></p>

<p id="f-doxcnX0w9JZNy2SxCkikbaN5Xng"><span>Hermes 的记忆体系分 </span><span style="font-weight:bold">5 层 + 1 个用户画像</span><span>：</span></p>

<ul><li id="f-doxcn9TJtoe2VZRXwc3WuSqwcpd"><span style="font-weight:bold">Bootstrap Files</span><span> — 永久身份与规则（AGENTS.md 等），每次会话开始从磁盘注入</span></li></ul>

<ul><li id="f-doxcnWYcIpTr78MRntPsvph1vQf"><span style="font-weight:bold">Session Transcript</span><span> — 完整对话历史存档（JSONL 文件追加写入）</span></li></ul>

<ul><li id="f-doxcnW0Z0TYZvwBIUZe8vbhCtLf"><span style="font-weight:bold">Context Window</span><span> — 当前推理能看到的内容（满了触发 Compaction）</span></li></ul>

<ul><li id="f-doxcnStXvzrrYKqoRkWjkYOMasg"><span style="font-weight:bold">Retrieval Index</span><span> — 记忆文件的全文/向量混合检索索引</span></li></ul>

<ul><li id="f-doxcnRBcCTWBj4pJgb1zNRLvlnc"><span style="font-weight:bold">Skill Library</span><span> — 程序性记忆，可复用的成功流程（Hermes 独家第 5 层）</span></li></ul>

<ul><li id="f-doxcnd7SHRsdacDjNoORmGxBqnf"><span style="font-weight:bold">Honcho User Model</span><span> — 独立的用户画像模型，专门存"你是谁"（偏好、沟通风格、目标）</span></li></ul>

<p id="f-doxcn8LDETBwkCSeGlIlRoSQ37e"><span style="font-weight:bold">和 OpenClaw 的对比</span><span>：前 4 层（Bootstrap / Transcript / Context / Retrieval）和 OpenClaw 完全一样，Hermes 直接沿用了 OpenClaw 的设计思路；</span><span style="font-weight:bold">Skill Library 和 Honcho User Model 是 Hermes 新加的两块</span><span>，这是两者记忆体系的核心差异。</span></p>

<blockquote id="f-doxcnzcq7Jm5b3OyLtKsg9POpuc"><p id="f-doxcnjDQ6UACig8i1LlUfcnBsxd"><span>💡 举个例子，系统中前 4 层属于</span><span style="font-weight:bold">陈述性记忆</span><span>（"我记得什么事实"），Skill Library 属于</span><span style="font-weight:bold">程序性记忆</span><span>（"可以做什么流程"），Honcho 是独立的</span><span style="font-weight:bold">用户建模</span><span>（我是谁）。相比Openclaw,"OpenClaw 只有陈述性记忆，Hermes 把程序性记忆和用户建模也补齐了，这是它'越用越懂你'的理论基础。"</span></p></blockquote>

<p id="f-doxcnrpKCjDPv1CmCBIiHDcz76g"><span>这 6 块是 Hermes "越用越懂你" 的数据底座。具体每一层的存储结构、写入/读取时机、压缩策略、如何协同工作，在 </span><span style="font-weight:bold">11.4 节 Hermes 记忆功能详解</span><span> 里展开。</span></p>

<a id="f-doxcndfJcPwGaufX3Vi6tWR9yeb"></a>

##### 架构总览图

<p id="f-doxcnIt1sdtlA4IVhBSReu7uxqh"><span>到这里我们已经把 Hermes 三层主干（触发层 / 网关层 / Agent 层）都讲完了。下面用一张图把各模块的位置关系串起来，让大家对"一个事件从进来到处理完的完整路径"有个整体印象：</span></p>

<pre id="f-doxcnGUWnHP2QnphZIbgHx8wPLg"><code>              ┌──────────────────────────────────────────┐
              │                  触发层                   │
              │  Message · Heartbeat · Cron ·            │
              │  Webhook · Hooks                          │
              └────────────────────┬──────────────────────┘
                                   │ 事件
                                   ▼
              ┌──────────────────────────────────────────┐
              │                 网关层 Gateway            │
              │  连接管理 · 协议转换 · 路由分发 · 安全控制 │
              │         (不调 LLM、不执行工具)           │
              └────────────────────┬──────────────────────┘
                                   │ 统一事件 → session
                                   ▼
              ┌──────────────────────────────────────────┐
              │                  Agent 层                 │
              │                                          │
              │    ┌─────────────────────────────┐       │
              │    │   Think  → Act  → Remember  │ ◄──┐  │
              │    │   (循环，由 LLM 自主决定     │    │  │
              │    │    是否继续 / 结束)          │    │  │
              │    └──────────────┬──────────────┘    │  │
              │                   │                   │  │
              │            工具结果回灌上下文 ────────┘  │
              │                                          │
              │    可用模型：Claude / GPT / Gemini /     │
              │              Qwen / Ollama / …（任选）   │
              │                                          │
              │    记忆体系：Bootstrap · Transcript ·    │
              │              Context · Retrieval Index  │
              │            + Skill Library (独有)        │
              │            + Honcho 用户画像 (独有)      │
              └────────────────────┬──────────────────────┘
                                   │ 最终回复
                                   ▼
                             原渠道送回用户</code></pre>

<p id="f-doxcnQ8uYVSygXRsGxWTKnthRPe"><span style="font-weight:bold">三点提醒</span><span>：</span></p>

<ol start="1"><li id="f-doxcny2naZQy3xLsq9Tq675oWgb"><span>上图是 Hermes 的</span><span style="font-weight:bold">静态结构</span><span>，还没有画出 Hermes 真正的创新——</span><span style="font-weight:bold">自进化循环</span><span>。自进化循环本质是作用于记忆层之上的动态更新策略，会在 </span><span style="font-weight:bold">11.4 节 · 动态更新策略</span><span> 里讲。</span></li></ol>

<ol start="2"><li id="f-doxcnWPHmLQN145RLQCiR919Pkc"><span>Agent 层的 Think/Act 循环由 LLM 自主驱动，Gateway </span><span style="font-weight:bold">不参与推理决策</span><span>——这是职责边界。</span></li></ol>

<ol start="3"><li id="f-doxcnWwMYLzJLrxAbUwiw0a7C4s"><span>记忆体系的前 4 层和 OpenClaw 相同，后 2 层是 Hermes 新增；静态结构见 11.3 节，动态更新见 11.4 节。</span></li></ol>


<a id="section-0175"></a>
## Hermes 记忆系统 · 静态结构

<a id="f-doxcndFasR4Pr3kjVopop9qBJdc"></a>

<p id="f-doxcnPJNz20655MMhDTwkCMPzAg"><span>（</span><span style="font-weight:bold">高频考点</span><span>：Agent记忆系统是Agent核心。大家看任何Agent的时候，都应该有意识，去了解一下它的记忆功能是如何实现的。其中记忆功能，大家可以思考两点：由哪几部分组成（静态），如何更新，压缩（动态），笔记的ClaudeCode架构也是这么组织的。想清楚这两点，就想清楚了一个Agent的记忆模块最核心的东西。）</span></p>

<a id="f-doxcnXYvoeuApT72GRBr2w1Lpef"></a>

##### 总览：一个上下文窗口 + 三类数据源（+ 一个索引）

<p id="f-doxcnRyfkKORAu4IMJo7rLDDIpd"><span>先给大家一个整体骨架：Hermes 的记忆系统由一个</span><span style="font-weight:bold">上下文窗口</span><span>（Context Window）+ </span><span style="font-weight:bold">三类数据源</span><span> + </span><span style="font-weight:bold">一个索引</span><span>组成。每轮推理，系统把三类数据源的内容拼进工作集、送给模型；索引只在数据源 1 里按需搜片段，不直接进工作集。下面先看这五个角色分别是什么。</span></p>

<p id="f-doxcnbbQP2XBhwV3vsNJy8ZGevf"><span style="font-weight:bold">三类数据源</span><span>（真正进 Context 的内容都出自这三类）：</span></p>

<ol start="1"><li id="f-doxcnyVpxThXqVFPfPrii0MYZRg"><span style="font-weight:bold">工作空间 md 文件</span><span>——人写的（或自进化循环写的）配置和知识文件，包含 Bootstrap Files、</span><span><span><span>memory/</span></span></span><span> 笔记、Skill Library</span></li></ol>

<ol start="2"><li id="f-doxcnDbXCeyv5t8RpFxu3pQ7RAd"><span style="font-weight:bold">Session Transcript</span><span>——系统自动追加的完整对话日志 </span><span><span><span>.jsonl</span></span></span></li></ol>

<ol start="3"><li id="f-doxcn71AeFCzAI3tyS8oMlCI1zb"><span style="font-weight:bold">Honcho User Model</span><span>——外部独立服务，存用户画像</span></li></ol>

<p id="f-doxcnt2UPxEWI3g9YDIvcqbtjfc"><span style="font-weight:bold">一个索引</span><span>：</span></p>

<ul><li id="f-doxcnfgYijfNDH4IWPuRy67sHBh"><span style="font-weight:bold">Retrieval Index</span><span>——为 </span><span><span><span>memory/</span></span></span><span> 下的 md 文件建的向量+全文索引。</span><span style="font-weight:bold">它自己不进 Context</span><span>——它的作用是让 </span><span><span><span>memory_search</span></span></span><span> 能快速从 md 文件里找到相关片段，</span><span style="font-weight:bold">真正进 Context 的是搜到的那段 md 原文</span><span>。</span></li></ul>

<pre id="f-doxcnpnJMhUeqSmscpQv7YWOO6R"><code>┌────────────────────────────────────────────────────────────────┐
│  上下文窗口 · Context Window（每轮重新拼装）                 │
│                                                                │
│    = System Prompt（Bootstrap 文件拼出来的）                   │
│    + 近期对话切片（从 .jsonl 尾部加载）                        │
│    + 检索到的 md 片段（memory_search / memory_get 返回的原文） │
│    + Skill 内容（命中时加载 SKILL.md）                         │
│    + Honcho 用户画像摘要                                       │
│    + 当前用户消息 + 工具结果                                   │
└────────────────────────────────────────────────────────────────┘
         ▲                     ▲                     ▲
         │  md 原文            │  对话切片           │  画像摘要
         │                     │                     │
┌────────┴─────────┐  ┌────────┴────────┐  ┌─────────┴────────┐
│ 数据源 1         │  │ 数据源 2        │  │ 数据源 3         │
│ 工作空间 md 文件 │  │ Session         │  │ Honcho           │
│                  │  │ Transcript      │  │ User Model       │
│ Bootstrap Files  │  │ .jsonl 对话日志 │  │ 外部用户画像服务 │
│ + memory/ 笔记   │  │ 系统追加写入    │  │ 自进化循环持续更新│
│ + Skill Library  │  │                 │  │                  │
└────────┬─────────┘  └─────────────────┘  └──────────────────┘
         │ 被索引 ↑
         ▼        │ 搜索请求
   ┌──────────────┴───────┐
   │ 索引           │
   │ Retrieval Index      │
   │ （memory/ 的向量+    │
   │  全文索引，sqlite）  │
   │ 本身不进 Context     │
   └──────────────────────┘</code></pre>

<p id="f-doxcnV9oSR1RGsJoXxLVIuAYT6g"><span style="font-weight:bold">全景一张表</span><span>：</span></p>

<div id="f-doxcnT8ydPeBvL3cdqncFYhcmrh"><img alt="" decoding="async" height="496" loading="lazy" src="/images/agent-learning/4650fd72a549dfddd1e0387d.png" width="1255"/></div>

<p id="f-doxcnH5MAxOWEqsOIap8msgcZVb"><span style="font-weight:bold">和 OpenClaw 的对比</span><span>（直接落到三类数据源上）：</span></p>

<ul><li id="f-doxcnE9Oo0J2irfwhkc7CDWFoxh"><span>工作空间 md 文件 / Session Transcript / Retrieval Index：和 OpenClaw 同构</span></li></ul>

<ul><li id="f-doxcnVUxvM8Fe829QCs2rO69Hth"><span>Skill Library（工作空间 md 文件里的一类）：Hermes 独有</span></li></ul>

<ul><li id="f-doxcn1zx4zumURw4N4T59dhGiFb"><span>Honcho User Model：Hermes 独有</span></li></ul>

<p id="f-doxcnqYshoh9aFUgPMWH0CAlT9g"><span>其实不论 ClaudeCode / OpenClaw / Hermes，记忆模块的底层都是"几份磁盘文件 + 一个派生索引 + 一个工作集"这个老套路，差异只在于"多沉淀了什么"。看透这一层，新产品再出也不慌——新东西无非是在这张图上加一个源或改一条注入路径。</span></p>

<a id="f-doxcnj3alsoPvFm7aGZSbWhwoBc"></a>

##### Context Window · 上下文窗口

<p id="f-doxcnvGDaHbJ1Zwo7EVtSjRclKf"><span style="font-weight:bold">定位</span><span>：固定大小的 token 容器（模型决定：Claude 200K、GPT-4 128K、Gemini 1M），</span><span style="font-weight:bold">不是一层记忆，是记忆的消费端</span><span>。每轮推理前系统从四类数据源拼装内容填进来。</span></p>

<p id="f-doxcn08847YWpgXNQX5yhTMygE5"><span style="font-weight:bold">每轮被拼进来的内容</span><span>（按源码 </span><span><span><span>prompt_builder.py</span></span></span><span> + </span><span><span><span>context_engine.py</span></span></span><span> 的顺序）：</span></p>

<ol start="1"><li id="f-doxcnKFYehpz5gXLOGCfoAKpABd"><span style="font-weight:bold">System Prompt</span><span>（来自工作空间 md 文件）：SOUL.md + AGENTS.md + MEMORY.md + TOOLS.md + …</span></li></ol>

<ol start="2"><li id="f-doxcnYwtwvUi1v6zQblb8er6ywg"><span style="font-weight:bold">Skill 系统提示</span><span>（来自 Skill Library）：精简 skill 描述列表</span></li></ol>

<ol start="3"><li id="f-doxcn44DJ2UvlG2Bl9x6vXZZ0hf"><span style="font-weight:bold">Honcho 摘要</span><span>（来自 Honcho User Model）：用户画像的一段文字摘要</span></li></ol>

<ol start="4"><li id="f-doxcnw11XkkECpPBlVEzorKQHvb"><span style="font-weight:bold">对话历史切片</span><span>（来自 Session Transcript）：从 </span><span><span><span>.jsonl</span></span></span><span> 尾部加载的最近消息 + 已有压缩摘要</span></li></ol>

<ol start="5"><li id="f-doxcnWah8dxN1XtJi7S9OtlGzRc"><span style="font-weight:bold">预检索片段</span><span>（来自 </span><span><span><span>memory/</span></span></span><span> 下的 md 文件，通过 Retrieval Index 搜到，Hermes 特色）：Context Engine 根据当前消息主动做一次 </span><span><span><span>memory_search</span></span></span><span>，把命中的 md 原文片段塞进来</span></li></ol>

<ol start="6"><li id="f-doxcnhis0HpXs5AqComtkQyAZ4d"><span style="font-weight:bold">当前用户消息 + 工具结果</span></li></ol>

<p id="f-doxcndwuzwwPI8KrgCCNHYCeLNY"><span style="font-weight:bold">关键性质</span><span>：</span></p>

<ul><li id="f-doxcnCnIpCIPet748zVHFeSKPYg"><span>最大 token 消耗者通常是</span><span style="font-weight:bold">工具结果</span><span>（文件读取、网页快照、API 响应）</span></li></ul>

<ul><li id="f-doxcnEG3x66gM20jmazEPAIoscf"><span>Bootstrap Files 每轮都占空间，所以要尽量精简（SOUL.md 最容易写太长）</span></li></ul>

<ul><li id="f-doxcnOqXGUHDZxvxz7RdGdXvrfh"><span>满了就触发 </span><span style="font-weight:bold">Compaction</span><span>（见 11.4.3）——压缩的是"当前上下文里的旧消息"，不是整个 </span><span><span><span>.jsonl</span></span></span></li></ul>

<ul><li id="f-doxcnFLT5hmdDHSDVKdfZjl074f"><span>用 </span><span><span><span>/status</span></span></span><span> 监控使用量，建议 75–80% 时手动 </span><span><span><span>/compress</span></span></span></li></ul>

<a id="f-doxcnY9oCKki785lmXy7vdmIgGf"></a>

##### 工作空间 md 文件

<p id="f-doxcnccvXF5TnDnqOJEuT6jBChc"><span>这一类是</span><span style="font-weight:bold">磁盘上的 Markdown 文件</span><span>，用户可以直接编辑，也会被 Agent / 自进化循环写入。虽然都叫"md 文件"，但按用途分成三块。</span></p>

<a id="f-doxcnLkW7WKCdHr9PeD9Pz3CTkc"></a>

###### Bootstrap Files

<p id="f-doxcnxjFcKoJD7RQnXcB6Esbkbh"><span style="font-weight:bold">定位</span><span>：会话每次开始都从磁盘读、注入 system prompt 的"身份文件"。</span></p>

<p id="f-doxcn4ImLqf6Qvz46IZkpiAfmJg"><span>文件清单（位置：</span><span><span><span>~/.hermes/workspace/</span></span></span><span>，仓库根目录也有一份）：</span></p>

<ul><li id="f-doxcnkd7X9Gs0n0bvXGH2lneaVh"><span style="font-weight:bold">AGENTS.md</span><span> — 操作指令、行为规则（Hermes 主入口文件）</span></li></ul>

<ul><li id="f-doxcnDWzEWeiHUtkLFBeq6SPCOh"><span style="font-weight:bold">SOUL.md</span><span> — 人格、语气、边界</span></li></ul>

<ul><li id="f-doxcnE4dwUUAC6Poijv28aocbkf"><span style="font-weight:bold">USER.md</span><span> — 用户身份信息（静态版，和 Honcho 互补）</span></li></ul>

<ul><li id="f-doxcnqpB4ZjJ11D6xGjsWD59hUf"><span style="font-weight:bold">TOOLS.md</span><span> — 工具使用说明</span></li></ul>

<ul><li id="f-doxcnHmtiQS77zs4mD3vWeyYR6b"><span style="font-weight:bold">IDENTITY.md</span><span> — Agent 名称与风格</span></li></ul>

<ul><li id="f-doxcnBNyvSZBzTqr154oAmlF9sf"><span style="font-weight:bold">MEMORY.md</span><span> — 策展的长期记忆（仅主会话加载）</span></li></ul>

<ul><li id="f-doxcnMlW2HgT80lYFh4TJMmXfTd"><span style="font-weight:bold">HEARTBEAT.md</span><span> — 心跳任务清单（可选）</span></li></ul>

<ul><li id="f-doxcnJKVQXXyZRnO8lygEhh0t1f"><span style="font-weight:bold">BOOTSTRAP.md</span><span> — 首次运行仪式（一次性）</span></li></ul>

<p id="f-doxcnhGPvaPLHLKW56frhFVFx55"><span style="font-weight:bold">关键要点</span><span>：</span></p>

<ul><li id="f-doxcn5XULoJhTwLZAvUNhZ9NVed"><span>每次会话</span><span style="font-weight:bold">重新从磁盘读</span><span>，不进 </span><span><span><span>.jsonl</span></span></span><span> → </span><span style="font-weight:bold">免疫 Compaction</span></li></ul>

<ul><li id="f-doxcnz0cp8nSlxSd42fVswdAWmb"><span>字符限制：单文件 20,000 字符，总计 150,000 字符，超出截断</span></li></ul>

<ul><li id="f-doxcndjYfWAKwPJHbqZVySy9JTg"><span>子 Agent 只收到 AGENTS.md / SOUL.md / TOOLS.md / IDENTITY.md / USER.md，拿不到 MEMORY.md / HEARTBEAT.md</span></li></ul>

<ul><li id="f-doxcnMHjYnbp62LIYDm9qKATFVe"><span>用 </span><span><span><span>/context list</span></span></span><span> 查看注入状态</span></li></ul>

<ul><li id="f-doxcnN5tdyjeTxz0zbN46Z0tQEb"><span>尽量精简——每轮都占空间</span></li></ul>

<a id="f-doxcnD6MrbdplgYrt2mey3KOYMg"></a>

###### memory/ 笔记

<p id="f-doxcnpnl3KMsjHBONvYn4phEiya"><span style="font-weight:bold">定位</span><span>：Agent 的"事实性知识库"，不自动注入，靠工具按需检索。</span></p>

<p id="f-doxcnc3XIg8qkYqMyVrVrjm1RWe"><span>位置：</span><span><span><span>~/.hermes/memory/*.md</span></span></span><span>、</span><span><span><span>~/.hermes/memory/**/*.md</span></span></span><span>。</span></p>

<ul><li id="f-doxcnrOgUwlObOSfmobFinu9jbb"><span>文件命名一般是 </span><span><span><span>YYYY-MM-DD-slug.md</span></span></span><span>（归档） 或 </span><span><span><span>topic.md</span></span></span><span>（常青）</span></li></ul>

<ul><li id="f-doxcnQIOH5YeiEYjhaZf968hBJh"><span>写入来源：用户手写 / 会话结束时自动归档 / 自进化反思产出</span></li></ul>

<ul><li id="f-doxcnoM6c3SWC1efyJX0TJjt8Eh"><span>这些文件被 Retrieval Index 建索引，通过 </span><span><span><span>memory_search</span></span></span><span> + </span><span><span><span>memory_get</span></span></span><span> 被检索到</span></li></ul>

<p id="f-doxcnumb6UpV0T1HFy4zso1rPrc"><span>与 Bootstrap 的区别：Bootstrap 是"每轮都读"，memory/ 是"需要时才读"。</span></p>

<a id="f-doxcnsXMIRRE2JtJvsDUrfS0Wgb"></a>

###### Skill Library

<p id="f-doxcnKyfdSwYrY333YePP761PFg"><span style="font-weight:bold">定位</span><span>：把"成功完成过的流程"固化成可执行 skill，下次遇到类似任务直接调用，不用从零推理。</span></p>

<p id="f-doxcndKzjD9fRWyrmoGkJRVAuUM"><span style="font-weight:bold">Skill 文件结构</span><span>：</span></p>

<pre id="f-doxcnUZwFOVSMY3tkDLHvv3qZwh"><code>skills/&lt;category&gt;/&lt;skill_name&gt;/
├── SKILL.md          # skill 描述 + 触发条件 + 步骤说明
├── scripts/          # 可执行脚本（可选）
└── templates/        # 模板文件（可选）</code></pre>

<p id="f-doxcnXgRceDEo5qFQNAjnL0k79z"><span style="font-weight:bold">目录分类</span><span>（仓库 </span><span><span><span>hermes-agent/skills/</span></span></span><span> 自带几百个预置 skill）：</span></p>

<pre id="f-doxcniuAAa5sF9Ja7AnDbnw6HWf"><code>skills/
├── software-development/   # 代码评审、重构、测试
├── research/               # 论文检索、总结
├── creative/               # ASCII art、Excalidraw
├── productivity/           # PowerPoint、邮件
├── devops/                 # CI/CD、Docker
├── mcp/                    # MCP 集成
└── social-media/</code></pre>

<p id="f-doxcn3Y07sUejExFUmoPI3ZeAzg"><span style="font-weight:bold">Skill 的三种生成路径</span><span>（写入时机见 11.4.1）：</span></p>

<ol start="1"><li id="f-doxcnEe4zECTQKbutUmL8O3tgKU"><span style="font-weight:bold">系统预置</span><span>：仓库自带几百个 skill，随 Hermes 一起分发</span></li></ol>

<ol start="2"><li id="f-doxcnx4nnaXKcNsh7ebg0ROErTd"><span style="font-weight:bold">用户安装</span><span>：</span><span><span><span>/skills</span></span></span><span> 命令或从 agentskills.io 开放标准安装</span></li></ol>

<ol start="3"><li id="f-doxcntZwuofwxLF2uL8iCoejzGd"><span style="font-weight:bold">Agent 自动生成</span><span>：自进化闭环触发自动写 </span><span><span><span>SKILL.md</span></span></span><span>（如 Hacker News 每日简报的例子）</span></li></ol>

<p id="f-doxcnwk2PVAXHJqNXH7V1uKiQPf"><span style="font-weight:bold">两阶段检索</span><span>（防上下文膨胀）：先用精简描述粗排命中，再加载对应 </span><span><span><span>SKILL.md + scripts</span></span></span><span> 进上下文。</span></p>

<p id="f-doxcnEQ78FIrWtldSuM0X8jbBah"><span style="font-weight:bold">面试回答模板</span><span>：</span></p>

<blockquote id="f-doxcnmAAzRDs4co7ufqJ5B5ZmFg"><p id="f-doxcnZ8uGLAV8NyHJEIjVv0OPDg"><span>"Hermes 在 OpenClaw 的磁盘文件记忆之外加了 Skill Library，本质是程序性记忆。OpenClaw 的 memory 层只能记'事实'，Hermes 的 skill 层能记'怎么做'。这也是为什么 Hermes 号称'越用越懂你'——用户画像（陈述）+ skill（程序）两条线都在进化。"</span></p></blockquote>

<a id="f-doxcn5eo66eisCJGkBNjq96EoEb"></a>

##### Session Transcript

<p id="f-doxcnQprxsHviONozX2x5VWGLXc"><span style="font-weight:bold">定位</span><span>：</span><span style="font-weight:bold">一条消息一条消息追加到磁盘</span><span>的完整对话归档。只增不改，跨重启持久。</span></p>

<p id="f-doxcn2D8kcA8dB4PESDZAQOHAZQ"><span>存储路径（注意：不是"一份 session 存两遍"，</span><span style="font-weight:bold">两个文件分工不同</span><span>）：</span></p>

<pre id="f-doxcn7IvrfGhUv7SQ2xay56o9gh"><code>~/.hermes/agents/&lt;agentId&gt;/sessions/
├── sessions.json          # 索引表：所有 session 的元信息（只有一份）
├── &lt;sessionId-1&gt;.jsonl    # 第 1 个 session 的对话正文
├── &lt;sessionId-2&gt;.jsonl    # 第 2 个 session 的对话正文
└── ...                    # 一个 session = 一个 .jsonl</code></pre>

<ul><li id="f-doxcnxHA4FMDo0ntlc8VKK37jmb"><span>类比文件系统的 </span><span><span><span>ls</span></span></span><span> 或一本书的"目录页"。</span></li></ul>

<ul><li id="f-doxcn8Ddh4KY3OUA1u9zIlj1tBe"><span style="font-weight:bold"><span><span>&lt;sessionId&gt;.jsonl</span></span></span><span style="font-weight:bold">（对话正文）</span><span>：存这个 session 的实际内容——每条消息/工具调用/压缩摘要占一行 JSON，按时间顺序 append。</span></li></ul>

<p id="f-doxcns8RFOcVxtX6zQkWzeWXor7"><span style="font-weight:bold">为什么分开存</span><span>：启动时只读轻量的 </span><span><span><span>sessions.json</span></span></span><span> 就能列出所有历史会话让你选；选中某个再去读对应 </span><span><span><span>.jsonl</span></span></span><span> 重建上下文。</span></p>

<p id="f-doxcn1nxiscBjm3ljRfAF62Fewg"><span style="font-weight:bold">被"读"的典型场景</span><span>（不只是续会话）：</span></p>

<div id="f-doxcnuPMkhxKWRyfot6xjWkpN6g"><img alt="" decoding="async" height="327" loading="lazy" src="/images/agent-learning/44133dff5078f446a3d5b94f.png" width="1177"/></div>

<p id="f-doxcnfHHmmVTwRYK9FX3hSHctHf"><span style="font-weight:bold">关键要点</span><span>：</span></p>

<ul><li id="f-doxcn504PnQN8ekmlJarpTCp5Zc"><span>Compaction </span><span style="font-weight:bold">不读整段 </span><span style="font-weight:bold"><span><span>.jsonl</span></span></span><span>——它压缩的是当前 Context 里的旧消息（内存里），只是把结果 append 回 </span><span><span><span>.jsonl</span></span></span></li></ul>

<ul><li id="f-doxcnawzRi1f91VoHf74K21fCMc"><span>磁盘上的原始记录始终保留，压缩只改变"下次从哪条之后开始读"（</span><span><span><span>firstKeptEntryId</span></span></span><span> 标记）</span></li></ul>

<a id="f-doxcnXT9xr3V49Fia1gLv2qnwcb"></a>

##### Retrieval Index

<p id="f-doxcnZ9s70tIERzgISjktkypvgc"><span style="font-weight:bold">定位</span><span>：为工作空间 </span><span><span><span>memory/</span></span></span><span> 下的 md 文件建立的搜索索引。</span><span style="font-weight:bold">不是独立存储</span><span>——数据完全来自 md 文件，索引只是加速访问的派生物。</span></p>

<p id="f-doxcnuYNja7Pd6F6HYY5QeLdM4f"><span style="font-weight:bold">索引范围</span><span>：</span></p>

<ul><li id="f-doxcn5aaMonM3apt6rmY9vkCfFd"><span><span><span>MEMORY.md</span></span></span><span> + </span><span><span><span>memory/**/*.md</span></span></span><span>（默认）</span></li></ul>

<ul><li id="f-doxcnKAUG3bJyuDztnkhFxqBvGl"><span>可通过 </span><span><span><span>memorySearch.extraPaths</span></span></span><span> 加入额外目录（如 Obsidian 笔记库）</span></li></ul>

<ul><li id="f-doxcnh6J2qFL5dE2De1Zak7B1Ef"><span>存储在 </span><span><span><span>~/.hermes/memory/&lt;agentId&gt;.sqlite</span></span></span></li></ul>

<p id="f-doxcngA0EO4gfUxHWgD8Y8FIeab"><span style="font-weight:bold">检索工具</span><span>（两步走）：</span></p>

<ul><li id="f-doxcn8GuqjuHBqDWzvq8RdjDy5c"><span><span><span>memory_search</span></span></span><span> — 语义搜索，返回相关片段（文件路径 + 行号 + 分数）</span></li></ul>

<ul><li id="f-doxcnP72EuSLNozjGREsoRlwpJd"><span><span><span>memory_get</span></span></span><span> — 按路径读取指定记忆文件的完整内容</span></li></ul>

<p id="f-doxcnF4txuQrWNiVe1WAHTH54oh"><span style="font-weight:bold">混合搜索权重</span><span>（和 OpenClaw 一致）：</span></p>

<pre id="f-doxcnjo8svXi3cKVjS1wGyZHUnd"><code>finalScore = 0.7 × vectorScore + 0.3 × textScore</code></pre>

<p id="f-doxcnjxLuit1BGf2zLFer6yDU9g"><span>向量语义匹配（擅长同义词）+ BM25 关键词匹配（擅长精确 ID / 代码符号）加权合并。</span></p>

<p id="f-doxcnKqMh0rrQVOQPUpG75HWNsg"><span style="font-weight:bold">关键要点</span><span>：</span></p>

<ul><li id="f-doxcnHd03DKdBAzo2q9FqFkGcVe"><span>只索引文件——</span><span style="font-weight:bold">聊天中说过但没写进文件的内容搜不到</span></li></ul>

<ul><li id="f-doxcnYrnjdtGKGHL0fb8GVedqoW"><span>文件变动后自动重新索引（去抖 1.5 秒）</span></li></ul>

<ul><li id="f-doxcnDCfSe4omwker5YfUYEyUxd"><span>支持 MMR 去重 + 时间衰减（默认半衰期 30 天）</span></li></ul>

<ul><li id="f-doxcnexrhNkoSxdLZT7iijjGf6e"><span>常青文件（</span><span><span><span>MEMORY.md</span></span></span><span>、非日期命名的 </span><span><span><span>memory/*.md</span></span></span><span>）不受时间衰减影响</span></li></ul>

<a id="f-doxcnZGgfbubyYK067F9OEWfkJg"></a>

##### Honcho User Model

<p id="f-doxcni2omvx3sIi2haiBZPLUI4d"><span style="font-weight:bold">定位</span><span>：</span><span style="font-weight:bold">独立于对话历史</span><span>的动态用户画像，专门存"你是谁"——偏好、沟通风格、目标。不是文件，是一个</span><span style="font-weight:bold">外部服务 / 独立模型</span><span>。</span></p>

<p id="f-doxcnG7xiLAJhvaWF0prSKdXjGj"><span style="font-weight:bold">和 Bootstrap 里的 USER.md 的区别</span><span>：</span></p>

<div id="f-doxcnW1KsDrIpYKddeWDRa7r42g"><img alt="" decoding="async" height="177" loading="lazy" src="/images/agent-learning/8da7943abd10db080d8cd658.png" width="1087"/></div>

<p id="f-doxcnnQ1v8ARGGKmjOHHS9rH5yf"><span>实测对话示例：</span></p>

<pre id="f-doxcnPWpR3sH1r98coGKUi7bnbb"><code>User:  你对我的 user profile 里写了什么？
Hermes: 你正在做基于 Gemma4 + SAM 的视频感知项目……</code></pre>

<p id="f-doxcng8KFwEf0hV8qwqev3Rt0Ch"><span>作者没有手写过这些，这是 Hermes 自己从过往对话里学到的——总结成一句话："</span><span style="font-weight:bold">RL on user preferences</span><span>"。</span></p>

<p id="f-doxcnCwxpxjEiOyEAmL6aVTxHsc"><span>底层是独立开源项目 </span><span><span><span>plastic-labs/honcho</span></span></span><span>，Hermes 原生集成。</span></p>

<a id="f-doxcnpWyM2U0IehuIp3LdK7knRi"></a>

##### 小结：从记忆心理学看 Hermes 的升级

<p id="f-doxcnLnGA6RgWDvgzteDZt0M1wc"><span>前面 6 个小节讲的是"存哪、谁写、怎么进 Context"的</span><span style="font-weight:bold">工程视角</span><span>。换个</span><span style="font-weight:bold">心理学视角</span><span>回看，这些源其实对应</span><span style="font-weight:bold">人类记忆的三大分类</span><span>：</span></p>

<ul><li id="f-doxcnqFQ2efJhm5nkBQfrWrC4Mh"><span style="font-weight:bold">陈述性记忆（Declarative Memory）</span><span>——"我记得什么事实"</span></li></ul>

<div id="f-doxcnjQPJBe3BMqVxtDsIURlwUe" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>对应：Bootstrap Files + memory/ 笔记 + Session Transcript + Retrieval Index</span></div></div>

<div id="f-doxcnWk4imTV9crfRPuJ9jkdlzk" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>存的是事实性知识："我喜欢 TypeScript"、"这个项目用 React"、"上周讨论过 X 方案"</span></div></div>

<ul><li id="f-doxcnlRNEwYOgAxq6bwZ0BfSpgg"><span style="font-weight:bold">程序性记忆（Procedural Memory）</span><span>——"可以做什么流程"</span></li></ul>

<div id="f-doxcnrORfj85wrf4IWS7hyqtzJg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>对应：Skill Library</span></div></div>

<div id="f-doxcnr46FD4qeW15SKvLxSTAcBg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>存的是可执行流程："怎么做代码评审"、"怎么生成每日 AI 简报"</span></div></div>

<ul><li id="f-doxcnOzIy4kTNTvSTznzWnmtCig"><span style="font-weight:bold">用户建模（User Modeling）</span><span>——"我是谁"</span></li></ul>

<div id="f-doxcnoEwdBSjJbRBorY4bM5AD8b" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>对应：Honcho User Model</span></div></div>

<div id="f-doxcn9Ej1lfmlLyz0IcNSjCkNOc" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>独立于对话历史的动态用户画像</span></div></div>

<p id="f-doxcnIDp0IV7wcs2WTNHgdgABvf"><span style="font-weight:bold">对比 Hermes 相对 OpenClaw 的升级</span><span>：</span></p>

<blockquote id="f-doxcnEY22rNlwZlRlcCG9ELz6Sh"><p id="f-doxcnnlJgR1tKyRG9pcvHbI3Vgb"><span>OpenClaw 只有陈述性记忆，Hermes 把**程序性记忆（Skill）</span><span style="font-weight:bold">和</span><span>用户建模（Honcho）**也补齐了——这就是它"越用越懂你"的理论基础，也是面试里最容易讲出深度的切入点。</span></p></blockquote>


<a id="section-0176"></a>
## Hermes 记忆系统 · 动态更新策略

<a id="f-doxcnNjTTnjNvPgSg0xA8ak6n1g"></a>

<p id="f-doxcnglHBeGa6AJelef3HDS1Vwf"><span>上一节讲完了静态骨架（一个上下文窗口 + 四类数据源），这一节讲</span><span style="font-weight:bold">动态血肉</span><span>——这些源怎么被</span><span style="font-weight:bold">读、写、压缩、反思</span><span>。本质上：</span><span style="font-weight:bold">写入 / 读取 / 压缩 / 自进化反思都是作用在那些数据源之上的更新策略</span><span>。</span></p>

<p id="f-doxcnCPWDxS8LfoKWTkAwCDWsgr"><span>本节的 4 种策略：</span></p>

<ol start="1"><li id="f-doxcnujiIkRrBdOrQXyTX5kozGb"><span style="font-weight:bold">写入策略</span><span>（11.4.1）：记忆从哪来？</span></li></ol>

<ol start="2"><li id="f-doxcnIu4Sv0xAmcFQ8pBdH7JLX2"><span style="font-weight:bold">读取策略</span><span>（11.4.2）：记忆怎么被用？</span></li></ol>

<ol start="3"><li id="f-doxcnB9eqlBppVOt6zr9sSzG8Gf"><span style="font-weight:bold">压缩策略</span><span>（11.4.3）：上下文满了怎么办？—— Compaction</span></li></ol>

<ol start="4"><li id="f-doxcnUJwBIfMuHg5TX7hUIu3Eli"><span style="font-weight:bold">反思策略</span><span>（11.4.4）：Hermes 的核心创新——自进化循环</span></li></ol>

<a id="f-doxcnN9cVj2WceMKSIpGZyEiuVf"></a>

##### 写入策略：记忆从哪来

<p id="f-doxcnUnzioebQKOWdMY0lpI6R9g"><span>对照 11.3 的三类数据源 + 一个索引，每部分的写入来源和时机：</span></p>

<p id="f-doxcniRFdOm9I3XcwiKnxnThfXb"><span style="font-weight:bold">数据源 1：工作空间 md 文件</span></p>

<div id="f-doxcnxGqioFx3ktG6oahvceXuLe"><img alt="" decoding="async" height="231" loading="lazy" src="/images/agent-learning/7b657db45d2a33f8e2ec9827.png" width="1240"/></div>

<p id="f-doxcnaggxjNHduIhpg8gXyOhZSd"><span style="font-weight:bold">数据源 2 &amp; 3 + 索引</span></p>

<div id="f-doxcn61pdqsrJBwhNC4PkmCgcLc"><img alt="" decoding="async" height="201" loading="lazy" src="/images/agent-learning/5f3b15ba0441f2556a22b19c.png" width="1084"/></div>

<p id="f-doxcno7cPfn5DDiYK1fgVIPmKke"><span style="font-weight:bold">两个关键的自动写入点</span><span>：</span></p>

<ol start="1"><li id="f-doxcn5u1uvBH59c8qZFHjVWr2Tb"><span style="font-weight:bold">会话结束时的自动归档</span><span>：当用户输入 </span><span><span><span>/new</span></span></span><span> 或 </span><span><span><span>/reset</span></span></span><span>，hook 会自动把最近对话保存为 </span><span><span><span>memory/YYYY-MM-DD-slug.md</span></span></span><span> 文件 → 进而被 Retrieval Index 重新索引。</span></li></ol>

<ol start="2"><li id="f-doxcnB9HydoXHIA70pnYW0SFrzd"><span style="font-weight:bold">文件监听同步</span><span>：用户手动编辑 </span><span><span><span>MEMORY.md</span></span></span><span> 或 </span><span><span><span>memory/</span></span></span><span> 目录下文件，chokidar 文件监听器检测到变化 → 自动分块、计算 embedding、写入索引库。</span></li></ol>

<p id="f-doxcnaUK0rya1v9fVGh7u89TyWc"><span style="font-weight:bold">自进化循环驱动的写入</span><span>将在 11.4.4 详细展开——这是 Hermes 区别于 OpenClaw 的核心。</span></p>

<a id="f-doxcnBvu0P7dllXujYoowLYWmLd"></a>

##### 读取策略：记忆怎么被用

<p id="f-doxcnYz9ka7ZvoQBvMtb3qqBINb"><span>Hermes 的读取策略分</span><span style="font-weight:bold">自动注入</span><span>和</span><span style="font-weight:bold">按需检索</span><span>两大类：</span></p>

<p id="f-doxcnzttdugcZwGKgFbElJPCXjh"><span style="font-weight:bold">A. 自动注入（会话开始时无条件注入）</span></p>

<ul><li id="f-doxcni2I9ssLCqNN2zwlaboooWf"><span style="font-weight:bold">Bootstrap Files</span><span>：每次会话开始全量注入 Context Window</span></li></ul>

<ul><li id="f-doxcnrUsLQbkLuCV3gRGLfHGR4f"><span style="font-weight:bold">Session Transcript</span><span>：继续会话时从 JSONL 重建上下文到 Context Window</span></li></ul>

<ul><li id="f-doxcnRtPnLx1ipAXjgpG3ZYF90d"><span style="font-weight:bold">Honcho User Model</span><span>：会话启动时查询用户画像，摘要后注入系统提示</span></li></ul>

<p id="f-doxcnINRmadja22iORLXXTMPj0g"><span style="font-weight:bold">B. 按需检索（只有相关时才注入）</span></p>

<p id="f-doxcn221eBigUxsfaBEKCchKPT1"><span>不是所有记忆都无条件塞入上下文（那样浪费 token），有两类内容是按需加载的：</span></p>

<ol start="1"><li id="f-doxcneQXQIzlitaIsJhbOtP9rXb"><span style="font-weight:bold"><span><span>memory/</span></span></span><span style="font-weight:bold"> 笔记</span><span>——有两条检索通道：</span></li></ol>

<div id="f-doxcnuFuGDWH0yS7Sl46RRdUaIc" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">系统自动</span><span>（Hermes 特色）：Context Engine 每轮推理前根据当前消息自动检索 </span><span><span><span>memory/</span></span></span><span>，命中才注入。对弱模型/开源本地模型特别友好，因为它们不一定会主动搜。OpenClaw 没有这一层。</span></div></div>

<div id="f-doxcn9aDPTeH4aBhzlexQa38zoe" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">Agent 主动</span><span>：LLM 自己判断需要回忆时，调用 </span><span><span><span>memory_search</span></span></span><span> → </span><span><span><span>memory_get</span></span></span><span> 检索</span></div></div>

<ol start="2"><li id="f-doxcnnGE7tvXGGzAO2kpQsbeNOc"><span style="font-weight:bold">Skill Library</span><span>：先只加载各 skill 的精简描述，匹配当前任务时才加载完整 skill 内容</span></li></ol>

<a id="f-doxcnMmx6rgpEE4g4YpkGRMHrif"></a>

##### 压缩策略：Compaction

<blockquote id="f-doxcnXssaLx2Uc26Y94huN5t1jX"><p id="f-doxcnvFjoiGBBrtg4IiRQO0ut1d"><span>可以认为压缩策略可以稍微背一下。因为这些都挺通用的常考的，比如面试官问你上下文满了怎么办，怎么压缩，压缩时候要保留一些什么东西。这些都是很好的经验之谈。</span></p></blockquote>

<p id="f-doxcnXX8To4HV8BY6au3QqQRZsf"><span style="font-weight:bold">触发方式</span><span>（和 OpenClaw 一致）：</span></p>

<ul><li id="f-doxcnDswFP8BEpLQfCwQyXt9jWf"><span style="font-weight:bold">自动触发</span><span>：上下文使用量达到阈值</span></li></ul>

<div id="f-doxcnyc5GqYp36V685N1maPz12e" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>溢出恢复：模型返回 context overflow 错误 → 压缩 → 重试</span></div></div>

<div id="f-doxcnZXC3ZUjAtNYuWKiBKWQHWe" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>阈值维护：</span><span><span><span>contextTokens &gt; contextWindow − reserveTokens</span></span></span><span> 时触发</span></div></div>

<ul><li id="f-doxcnQOU5P51EG65lbrFyPX1Etg"><span style="font-weight:bold">手动触发</span><span>：输入 </span><span><span><span>/compress</span></span></span><span>，可带自定义指令如 </span><span><span><span>/compress 重点保留决策和待办事项</span></span></span></li></ul>

<p id="f-doxcnPLV3c1dDkPc1I2CADTnCKg"><span>触发公式：上下文窗口 − reserveTokensFloor（默认 20000）− softThreshold（默认 4000）。200K 模型 → 约 176K 时触发。</span></p>

<p id="f-doxcnTMO0hkiC9wVnWxjVMaqyVb"><span style="font-weight:bold">压缩过程</span><span>：</span></p>

<ol start="1"><li id="f-doxcnNWWq0XkHhfsTHCBIodqrFg"><span style="font-weight:bold">划分保留区和压缩区</span><span>：最近的 ~20,000 tokens 消息进"保留区"，原封不动；之前的旧消息进"压缩区"</span></li></ol>

<ol start="2"><li id="f-doxcnunwpGhbQXN5YAiMFWo8iUQ"><span style="font-weight:bold">分块总结</span><span>：压缩区分成若干块，用模型对每块生成摘要</span></li></ol>

<ol start="3"><li id="f-doxcnvjotWZhkQk5cRzbQYXSlOh"><span style="font-weight:bold">合并摘要</span><span>：多个块摘要再合成一个连贯总摘要</span></li></ol>

<ol start="4"><li id="f-doxcnMpwHjnw9L0lseg50EJpVOe"><span style="font-weight:bold">写入 Transcript</span><span>：JSONL 里写入一条 </span><span><span><span>compaction</span></span></span><span> 类型的条目 + </span><span><span><span>firstKeptEntryId</span></span></span></li></ol>

<p id="f-doxcnnEMaKqi739jB8i4F5p7xlm"><span>压缩后上下文结构：</span><span><span><span>[压缩摘要] + [保留区原文]</span></span></span><span>。</span></p>

<p id="f-doxcn6pF49HeeAqMPecH15ZVSQf"><span style="font-weight:bold">保留策略</span><span>（必须保留的内容）：</span></p>

<ul><li id="f-doxcn3TlYGuvPNCIIcm8ExGydVb"><span>进行中的任务及其状态（进行中 / 阻塞 / 待办）</span></li></ul>

<ul><li id="f-doxcnRA2gbxnW9cqPjvaklNFpce"><span>批量操作进度（"17 项中已完成 5 项"）</span></li></ul>

<ul><li id="f-doxcnOOxW2ERRbeh57fsBfg2aZb"><span>用户最后请求 + 正在做的事</span></li></ul>

<ul><li id="f-doxcnmpRnI2p9TBYELRPTyC9lzd"><span>已做出的决策及理由</span></li></ul>

<ul><li id="f-doxcncbeUSJjCQ2N6ThuEFsXCBc"><span>TODO、开放问题、约束条件</span></li></ul>

<ul><li id="f-doxcnwekZx2qYTs0neOHgtk3VJg"><span>承诺的后续行动</span></li></ul>

<ul><li id="f-doxcn0qF4A2C2kzPjreHEVnpmuV"><span style="font-weight:bold">所有不透明标识符</span><span>（UUID、哈希、token、API key、URL、文件名）—— 由 </span><span><span><span>identifierPolicy: "strict"</span></span></span><span> 控制</span></li></ul>

<p id="f-doxcnCqkk8JCfxnaVFeqSLHQY9g"><span style="font-weight:bold">Pre-Compaction Memory Flush</span><span>：</span></p>

<ul><li id="f-doxcnE2XkwHOilI2Z2OepnrpITf"><span>OpenClaw：压缩前静默运行一轮，提醒 Agent 把重要内容写入 </span><span><span><span>memory/YYYY-MM-DD.md</span></span></span><span>，用户不可见（NO_REPLY）</span></li></ul>

<ul><li id="f-doxcnaMUeWxsSSGo5bjUlHlKuce"><span>Hermes：</span><span style="font-weight:bold">在此之上多走一步</span><span>——不仅 flush 到 memory，还会先调用</span><span style="font-weight:bold">自进化反思</span><span>，判断"这次有没有新 skill 要沉淀"（见 11.4.4）</span></li></ul>

<p id="f-doxcnuKpN08Z4oegNWwXQj2vzcb"><span>Hermes 有自进化循环兜底主动判断关键信息是否保存，但自进化循环不是百分百捕获，</span><span style="font-weight:bold">明确告诉 Hermes"记住这件事"仍然是最稳妥的做法</span><span>。</span></p>

<a id="f-doxcnsBtY7f67hhRGxiIhPRBrjh"></a>

##### 反思策略：自进化循环

<p id="f-doxcne2w0w66b9jC5qG51V7O7ge"><span style="font-weight:bold">这是 Hermes 区别于所有现有 Agent 的标志性特性，面试当作 Hermes 核心卖点必考。</span><span> 前面三条（写入、读取、压缩）OpenClaw 大体都有；自进化循环是 Hermes 独创的</span><span style="font-weight:bold">第四条更新策略</span><span>。</span></p>

<a id="f-doxcnHYwThJ9pjGT4FFAKTvkW0e"></a>

###### 自进化循环是什么

<p id="f-doxcnVYXQ4igv8aElPcDSfLBpae"><span>核心思想："</span><span style="font-style:italic">like back propagation but for prompts instead of model weights</span><span>"——</span><span style="font-weight:bold">像反向传播，但更新的不是模型权重，而是 Agent 的记忆、skill 和用户画像</span><span>。这里 "prompts" 是泛指所有影响 Agent 行为的非权重部分——对应后面 11.4.4.2 的三路沉淀：memory（事实性知识）、Skill Library（程序性流程）、Honcho（用户偏好）。</span></p>

<p id="f-doxcnM9pzjeI6luVB1P4a5c7Zpb"><span>核心机制：每隔大约 10 次工具调用，Agent 会主动暂停，回顾刚才发生了什么、哪些步骤失败了，然后更新自身的记忆、skill 和用户画像。</span></p>

<p id="f-doxcn8m3vg3nMtjHB9O9eZJLkPg"><span>技术实现上：自进化循环在工具调用达到一定次数后周期性触发。不是每次都跑——反思本身也花钱花时间，频繁反思就本末倒置。</span></p>

<a id="f-doxcn2vlxjk4Rkr4Ad0DfWmJJWe"></a>

###### 自进化闭环的完整流程

<pre id="f-doxcn7Y3srxpVw4WhEHO1lp8Hze"><code>1. 用户下达任务（自然语言）
        ↓
2. Agent 执行（Think → Act 循环）
        ↓
3. 每 ~10 次 tool call，Agent 主动暂停（periodic nudge）
        ↓
4. 自问三件事：
   ① 这次学到的东西值不值得保留？
   ② 有没有失败的步骤需要记下来避免？
   ③ 成功的流程能不能抽象成可复用 skill？
        ↓
5. 值得保留 → 分三路沉淀到对应记忆层：
   ├─ 事实性知识 → memory/YYYY-MM-DD.md      （更新 Retrieval Index）
   ├─ 程序性流程 → skills/xxx/SKILL.md        （更新 Skill Library）
   └─ 用户偏好   → Honcho User Model          （更新用户画像）
        ↓
6. 下次遇到类似任务 → 直接命中 skill，跳过重新推理</code></pre>

<p id="f-doxcnaZ5wBQCjJxaqNnfX2fHxvf"><span style="font-weight:bold">关键观察</span><span>：自进化循环本质上是</span><span style="font-weight:bold">跨 3 层记忆的联合更新器</span><span>——同时更新 Retrieval Index、Skill Library、Honcho。这就是前面说的"自进化循环是作用在记忆层之上的更新策略"的具体含义。</span></p>

<a id="f-doxcnYDqcemeonKB6YLKh94wVyc"></a>

###### Skill 的自我改进

<p id="f-doxcnCWCsWGsKmXpnGixHpn5NQb"><span>Skill 不是一次生成就固化了，自进化循环会持续优化。如果 Hermes 再次执行同类任务时发现了更好的做法，会直接更新已有的 skill，而不是新建一个。关键词是 </span><span style="font-weight:bold">updating，不是 creating</span><span>——只有确实是全新类别才会新建。这是防止 Skill 膨胀的核心机制之一。</span></p>

<a id="f-doxcnQnK06wD2lDdDMBbKGsVJYV"></a>

###### 自进化循环 vs OpenClaw Pre-Compaction Flush

<p id="f-doxcn6HH0qPRktSVjhmcZIwQmIh"><span>这两个机制容易混，面试可能追问：</span></p>

<div id="f-doxcncHyB32pZkBOsloCrRBSHBf"><img alt="" decoding="async" height="244" loading="lazy" src="/images/agent-learning/225cad5984243bc343c3d9cf.png" width="1153"/></div>

<p id="f-doxcn2e9j6O4XYjHNBOJQaYWfMb"><span style="font-weight:bold">一句话区分</span><span>：OpenClaw 是</span><span style="font-weight:bold">事后归档</span><span>，Hermes 是</span><span style="font-weight:bold">持续反思</span><span>。Hermes 在压缩前也会先跑一次自进化反思，所以可以理解为"自进化循环 ⊇ Pre-Compaction Flush"。</span></p>

<a id="f-doxcnXYc9RBEPYm3l819wxoDNKh"></a>

##### 小结：一张动态更新全景图

<p id="f-doxcnbs11w6C7FZNA5n6ivZD3wh"><span>把四种策略都映射到 6 层静态记忆上，得到一张 Hermes 记忆的完整图景：</span></p>

<div id="f-doxcnFgFLZwaZPHexi0p01iBYgc"><img alt="" decoding="async" height="680" loading="lazy" src="/images/agent-learning/4ebbdc2398bcc0f6b7439221.png" width="1100"/></div>


<a id="section-0177"></a>
## Hermes Agent 架构解析

<a id="f-doxcnd5kShhUhO9TnGGwA3CoIyd"></a>

<p id="f-doxcnZ9GILbgUyD2YFqraosAQDf"><span>（对应第 10.4 节 OpenClaw 的 Agent 架构解析，回答"Hermes 的多 Agent 架构是什么"。因为Hermes Agent的架构和Openclaw非常像，虽然Agent架构是很重要的一部分，但这里没有什么新东西，就不赘述了）</span></p>

<a id="f-doxcnTLUFNznjddiNUAVfKuS7Ve"></a>

##### 概述：同样是递归 Centralized

<p id="f-doxcna7Cvm4NzE64pH8clZxzQih"><span>Hermes 的 Agent 架构和 OpenClaw 一样是</span><span style="font-weight:bold">递归 Centralized</span><span>：</span></p>

<ul><li id="f-doxcnJnioNQAIGpWjWZwygx8zme"><span>Parent Agent（主 Agent）对最终回复负责</span></li></ul>

<ul><li id="f-doxcnd1Arvt8U6C1jghoYGUEbNd"><span>通过 tool call 的方式 spawn subagent</span></li></ul>

<ul><li id="f-doxcn5Y3zYEKpbeT0lEuVEUFSBg"><span>Subagent 可以继续 spawn 孙 Agent（默认深度比 OpenClaw 宽）</span></li></ul>

<p id="f-doxcnj24JEHGJehV8xxwpVYkZyz"><span>Hermes 的定位是 "</span><span style="font-style:italic">agent loop first with this learning element</span><span>"——loop 结构本身是常规的 Centralized，创新在于"learning element"。</span></p>

<a id="f-doxcnETaTWoo20eESBKW9wKeOye"></a>

##### Spawn 机制对比

<div id="f-doxcnCz6B0V2zTggK81d6UfpGud"><img alt="" decoding="async" height="291" loading="lazy" src="/images/agent-learning/9c5f584b6851422c8330d030.png" width="1261"/></div>

<p id="f-doxcnnQRdUmYPi9Z64nUulgXsfh"><span>关键差异：Hermes 把 ACP 做成</span><span style="font-weight:bold">双向能力</span><span>——不仅能调别人，还能被别人调。这让"OpenClaw 作 orchestrator、Hermes 作 worker"的组合变得开箱即用。</span></p>

<a id="f-doxcnWNuWJGkzjuMyffqAVOZ2Pd"></a>

##### Agent 通信机制（和 OpenClaw 一样）

<p id="f-doxcnBD20kCJgR6gdcuG3tZr9rV"><span>通信模式：</span><span style="font-weight:bold">Tool Call</span><span>（而非 Handoff）——父 Agent 保留控制权。</span></p>

<p id="f-doxcnBTZemiITPExV21bN6m2Kfp"><span>消息传递：</span><span style="font-weight:bold">仅最终结果</span><span>，子 Agent 的 chain-of-thought 留在私有 session 里，父 Agent 只收到蒸馏后的回复。</span></p>

<p id="f-doxcnVApi0nHSCvWb9T8KTQVmuc"><span>这和 OpenClaw 第 10.4.3 节的策略完全一致——两者在"多 Agent 通信"这块没有本质差异，都是业界主流做法。</span></p>


<a id="section-0178"></a>
## 面试问题

<a id="f-doxcnsWaEw46EQXxJEHIXSMD8LB"></a>

<p id="f-doxcnG5BAIQwLFIa8fygSixcjEe"><span>吸收了上面的内容，你可以足够应付大部分的 Hermes 面试问题。这一小节快速总结上述知识，给出标准面试参考答案，用这些面试问题检验自己吧~</span></p>

<p id="f-doxcnYisow6Dm2fV1iGWhCmYteb"><span style="font-weight:bold">Q1: 你看过 Hermes Agent 源码吗？简单讲讲它的架构和 OpenClaw 的区别。</span></p>

<p id="f-doxcnhdIqVwYix3dJ9hbdAJFx8f"><span>看过。Hermes 是 Nous Research 开源的自主 AI Agent 平台，核心用 Python 编写。架构上和 OpenClaw 是同构的三层管道：触发层（Messages / Heartbeats / Crons / Webhooks / Hooks）→ 网关层（多渠道适配 + 路由 + 安全）→ Agent 层（Think → Act → Remember 循环）。这三层和 OpenClaw 几乎 1:1 对应。</span></p>

<p id="f-doxcnnC99roNLYVVlDaSDGlVKVd"><span>核心区别在 Agent 层额外多了一个</span><span style="font-weight:bold">自进化闭环</span><span>。OpenClaw 是纯执行型——把当下任务做好就结束。Hermes 在执行之外加了周期性反思机制，会把经验沉淀为三样东西：事实性知识写入 memory 文件、成功流程固化为 Skill 文件、用户偏好更新到 Honcho 用户画像。所以 OpenClaw 是执行型 Agent，Hermes 是学习型 Agent。</span></p>

<p id="f-doxcn4YTDtHFsuzS4yFyXw04fnb"><span>两者不是替代关系，而是搭档关系——通过 ACP 协议互相调度，OpenClaw 做 orchestrator、Hermes 做 learning worker 是社区共识的最佳实践。</span></p>

<p id="f-doxcnRSg50IIwKylXDPxeyQgVdf"><span style="font-weight:bold">Q2: Hermes 的架构是几层？每层做什么？</span></p>

<p id="f-doxcnYl0SWJ6tg41fInIq00VtU8"><span>Hermes 的架构是主干 3 层加 1 个自进化闭环。</span></p>

<p id="f-doxcnC4v3UpcAFVehBTYRhqiH5g"><span>第一层是触发层，有 5 种信号源，包括用户消息（CLI、Telegram、Discord、Slack、WhatsApp、Email）、心跳定时唤醒、Cron 定时任务、外部 Webhook 推入，以及生命周期钩子。这一层和 OpenClaw 完全一致。</span></p>

<p id="f-doxcnrmtrbItopOox2RCrZ1kPg3"><span>第二层是网关层，也就是 Gateway。它是一个本地长驻的进程，负责连接管理、协议转换、路由分发和安全控制。一个很重要的边界是，Gateway 不调 LLM、不执行工具，它只负责两件事："这条消息该给哪个 Agent"和"Agent 的回复该送回哪个渠道"。</span></p>

<p id="f-doxcn7rxEsXT06A4ZRsHdxrJhgd"><span>第三层是 Agent 层，也就是核心推理循环：Think 推理、Act 执行工具、Remember 读写记忆，由 LLM 自主驱动决定是继续调工具还是输出最终回复。Hermes 还支持主模型加辅助模型的分工，强模型做长链推理，弱模型做压缩摘要这种轻量任务。</span></p>

<p id="f-doxcnDZKFjjZU50RBk59U7JFANh"><span>除了这三层之外，Hermes 还有一个自进化闭环，这是它和 OpenClaw 最核心的区别。Agent 层在工具调用达到一定次数后会周期性触发反思，Agent 会自问三件事：学到的东西值不值得保留、失败的步骤要不要记下来避免、成功的流程能不能抽象成 skill。然后把结果分三路沉淀到 memory 文件、Skill Library 和 Honcho 用户画像，反哺下一次任务执行。</span></p>

<p id="f-doxcnGTcpQNu26DCqA5hgM5kamc"><span>所以整体来看，本质是一个事件驱动的执行管道：事件产生、网关路由、Agent 执行、状态持久化，然后额外多了反思沉淀和反哺下一次执行这两步，最后这两步是 Hermes 独有的。</span></p>

<p id="f-doxcnfsD0xLWHRjAQyzsiErANU7"><span style="font-weight:bold">Q3: Hermes 的记忆功能是如何实现的？</span></p>

<p id="f-doxcnIr3e2j504fjfw7dbKAweeg"><span>Hermes 的记忆系统可以从静态和动态两个角度来讲。</span></p>

<p id="f-doxcnlrFM0RKpW4fShSPPNwGeyh"><span>静态上它有 6 层。前 4 层和 OpenClaw 是完全一样的：第一层是 Bootstrap Files，就是 AGENTS.md、SOUL.md、USER.md 这些身份文件，每次会话开始从磁盘读取注入系统提示，不受压缩影响。第二层是 Session Transcript，完整的对话历史持久化到数据库，续会话时从里面重建上下文。第三层是 Context Window，就是模型每轮推理实际看到的 token 容器，满了会触发压缩。第四层是 Retrieval Index，为 memory 文件建的向量加全文混合搜索索引，权重是 7:3，Agent 通过 memory_search 工具按需检索。</span></p>

<p id="f-doxcnvuhGpwlD2SbLzr9Vml8igd"><span>后 2 层是 Hermes 独有的。第五层是 Skill Library，这是程序性记忆，把成功完成过的流程固化成 SKILL.md 加可执行脚本，下次遇到类似任务直接调用，不用从零推理。第六层是 Honcho User Model，这是一个独立的用户画像服务，存的是你的偏好、沟通风格、目标，会话启动时查询摘要注入上下文。</span></p>

<p id="f-doxcnWw0tCTnc6o7Z1DGvvyls9P"><span>前 4 层属于陈述性记忆，就是"我记得什么事实"；Skill Library 属于程序性记忆，就是"可以做什么流程"；Honcho 是用户建模，就是"你是谁"。OpenClaw 只有陈述性记忆，Hermes 把程序性记忆和用户建模也补齐了，这就是它"越用越懂你"的理论基础。</span></p>

<p id="f-doxcnWXeKiz7jY1R2deh9gQ8Ndg"><span>动态上有 4 种策略：写入策略包括手写、会话结束自动归档、自进化循环自动写入；读取策略分自动注入和按需检索；压缩策略就是 Compaction，把旧消息压缩成摘要、保留最近的原文；反思策略就是自进化循环，周期性触发三路沉淀。</span></p>

<p id="f-doxcnLvVSLNJLsiUCI4ly5TaJDg"><span style="font-weight:bold">Q4: Hermes 的自我进化功能是什么？怎么实现的？</span></p>

<p id="f-doxcnx29rjKmGLGRwdnvIso5S1M"><span>Hermes 的自我进化功能叫自进化循环，英文叫 self-improvement loop。它就像神经网络的反向传播一样，但更新的不是模型权重，而是 Agent 的记忆、skill 和用户画像。</span></p>

<p id="f-doxcnKmwyqpqD7vpJTL9dz5yZ5d"><span>具体实现是这样的：Agent 在工具调用达到一定次数后会周期性触发反思，触发之后 Agent 会自问三件事：这次学到的东西值不值得保留？有没有失败的步骤需要记下来避免？成功的流程能不能抽象成可复用的 skill？</span></p>

<p id="f-doxcn2HZ2PezKzs2OgPDbmnEBIb"><span>如果值得保留，就分三路沉淀：事实性知识写入 memory 文件，更新检索索引；程序性流程写成 SKILL.md，更新 Skill Library；用户偏好更新到 Honcho User Model。而且反思任务是在主回复返回给用户之后在后台执行的，不会阻塞用户交互。</span></p>

<p id="f-doxcnNftYnLgXOmch6YUvRqxZ4b"><span>和 OpenClaw 对比的话，OpenClaw 有一个 Pre-Compaction Flush 机制，但那只在压缩前触发一次，属于事后归档，而且只写 memory 文件。Hermes 的自进化循环是持续反思，同时更新 memory、skill、Honcho 三路，而且压缩前也会额外跑一次。所以可以理解为自进化循环包含了 Pre-Compaction Flush。</span></p>

<p id="f-doxcnCTRZ9aRyuv234RvqCyssOG"><span>另外 skill 也不是一次生成就固化了。如果 Hermes 遇到已有类似 skill 且发现更好的做法，会优先更新已有 skill 而不是新建，这也是防止 skill 库膨胀的核心机制之一。</span></p>

<p id="f-doxcnMBp3VVLsbAPUBtKD64Ipbh"><span style="font-weight:bold">Q5: 自进化循环会不会导致 Skill 膨胀？怎么治理？</span></p>

<p id="f-doxcnra5T80JpVZs4bpPy0djjGb"><span>会的，这是任何持续学习系统都绕不开的问题，学名叫 Memory Bloat。Hermes 做了三层治理。</span></p>

<p id="f-doxcn1JfWX1WQSsjm3aBqi6lROd"><span>第一层是准入门槛。自进化循环的三问里第一条就是"值不值得保留"，大多数情况会直接丢弃，不是每次反思都会产出新 skill。</span></p>

<p id="f-doxcnS2c9iViLbwrLpBwCblNgdh"><span>第二层是合并优先。遇到类似任务的时候优先 update 已有 skill，不建新的。关键词是 updating 不是 creating。</span></p>

<p id="f-doxcn8F4aem4MVuuJJYNThC8A5f"><span>第三层是分类组织。skill 按类别分目录，比如 software-development、research、creative、productivity 这些，检索的时候只扫相关子集，不会全量比对。</span></p>

<p id="f-doxcnvxm9A4ueoNoSpn2VVubHjh"><span>不过即便有这三层，实际使用中还是需要周期性的人工审查。社区的常见做法是每月跑一次 hermes skills audit，列出低使用频率和重复的 skill，让用户选择清理。可以认为核心思路是：持续学习系统的挑战不是"能不能记住"，而是"怎么有选择地遗忘"。</span></p>

<p id="f-doxcnxiWYEksr0fJjdpQ9TkGBWf"><span style="font-weight:bold">Q6: Hermes 和 OpenClaw 你会怎么选？有什么区别？</span></p>

<p id="f-doxcn1ngmPTAsy46VtbbafXuegf"><span>两者是同一代 Agent 产品，都是事件驱动 + 多渠道网关 + Agent Loop 的架构，三层管道几乎 1:1 对应。核心差异在设计哲学：</span><span style="font-weight:bold">OpenClaw 是执行型 Agent</span><span>，强调当下把任务做好；</span><span style="font-weight:bold">Hermes 是学习型 Agent</span><span>，在 OpenClaw 4 层记忆之外加了 procedural memory（Skill Library）和 Honcho 用户画像，通过自进化循环周期性反思并持久化——所以它越用越懂你。</span></p>

<p id="f-doxcnenEUMQT6GA4IFgsjasSvFh"><span>各自强项也不同。Hermes 的优势在于自进化循环、自动 Skill 沉淀、Honcho 用户建模、模型中立对开源模型友好、同模型下更快。OpenClaw 的优势在于团队更大资源更多、更新频率更高、更稳定、生态更成熟（原生 Cursor / Claude Code 插件）、社区更大文档更全。</span></p>

<p id="f-doxcnYF0X9sJkOsyWojPEnmScTg"><span>从 harness engineering 的角度看，OpenClaw 是最小优雅 harness，Hermes 是激进 harness——把记忆、技能、反思全做成系统能力。这也是 Hermes 在本地开源模型（Qwen、Gemma）上效果更好的原因：弱模型 + 强 harness ≈ 强模型 + 弱 harness。</span></p>

<p id="f-doxcnhb1BXOkgShSIrTOE804OSb"><span>实际工程里两者</span><span style="font-weight:bold">不是替代关系，而是搭档关系</span><span>——通过 ACP 协议可以互相调度。推荐用法是 OpenClaw 做 orchestrator 负责接收请求和任务拆分，Hermes 做 learning worker 负责执行细分任务和沉淀 skill，这是社区共识的最佳实践。</span></p>

<p id="f-doxcnagRxx9iDxZeGaZZ7uM7BBg"><span style="font-weight:bold">Q7: 自进化循环里的"三件事反思"到底是怎么实现的？</span></p>

<p id="f-doxcnhvx9nJ8wuegO7lKcjfo3zg"><span>这个问题可以拆成四层看：</span></p>

<p id="f-doxcn8LiDnTlt8oEkHVsSFfyNhh"><span style="font-weight:bold">第一层是代码调度层，决定什么时候触发反思。</span><span><span><span>run_agent.py</span></span></span><span> 里硬编码了两个计数器，</span><span><span><span>_memory_nudge_interval = 10</span></span></span><span> 和 </span><span><span><span>_skill_nudge_interval = 10</span></span></span><span>，每次 user turn +1、每次工具调用 +1，到阈值就置 flag 然后清零。这是纯 Python 的事件驱动，不是让模型自己判断该不该停下来反思——因为让模型自省"你现在该不该自省了"本身就是不可靠的。</span></p>

<p id="f-doxcnsiONKNZkIDk3A95bftUSGb"><span style="font-weight:bold">第二层是后台 agent 层，决定怎么反思。</span><span> 触发之后，代码不会打断主对话，而是等主回复给完用户之后，在后台线程里 spawn 一个全新的 AIAgent 实例，模型、工具、对话历史快照都复制过去，只是把反思提示词作为新的 user message 追加。这个细节可以认为很关键——</span><span style="font-weight:bold">反思不占主对话的 attention，也不阻塞用户</span><span>，用户感知不到，但记忆在后台持续沉淀。</span></p>

<p id="f-doxcnJFd6rOa8Z3IoNMD1C1c4Jf"><span style="font-weight:bold">第三层是提示词层，决定反思什么。</span><span> 三个 review 提示词是写死的常量（</span><span><span><span>_MEMORY_REVIEW_PROMPT</span></span></span><span> / </span><span><span><span>_SKILL_REVIEW_PROMPT</span></span></span><span> / </span><span><span><span>_COMBINED_REVIEW_PROMPT</span></span></span><span>）。比如记忆反思的核心就两问："用户是否透露了关于自己的信息？""用户是否表达了对你行为方式的期望？" Skill 反思问："是否用了非平凡的方法？是否经历了试错？" 并且提示词最后都明确要求——</span><span style="font-weight:bold">如果不值得存，就直接说 'Nothing to save.' 然后停止</span><span>。这个"允许什么都不做"的兜底设计是防止 skill 膨胀的第一道闸。</span></p>

<p id="f-doxcnk61n1yhtmQq30C8n31gtcd"><span style="font-weight:bold">第四层是工具持久化层。</span><span> 后台 agent 如果决定保存，就调用 </span><span><span><span>memory</span></span></span><span> 工具写入 </span><span><span><span>~/.hermes/memories/MEMORY.md</span></span></span><span> 和 </span><span><span><span>USER.md</span></span></span><span>，或者调用 </span><span><span><span>skill_manage</span></span></span><span> 工具在 </span><span><span><span>~/.hermes/skills/</span></span></span><span> 下创建 </span><span><span><span>SKILL.md</span></span></span><span>。两个工具都带安全扫描防 prompt injection，因为这些内容下一次 session 会被注入系统提示词，不能被污染。下一次启动时 </span><span><span><span>prompt_builder.py</span></span></span><span> 读文件注入 context，闭环完成。</span></p>

<p id="f-doxcnXUMXWgMQVNccdd4TLa0Ked"><span style="font-weight:bold">除了定时反思，系统提示词里还有常驻引导</span><span>——</span><span><span><span>MEMORY_GUIDANCE</span></span></span><span> 和 </span><span><span><span>SKILLS_GUIDANCE</span></span></span><span> 两段文字在每次对话时都注入，提醒模型日常就主动保存。所以反思不完全依赖定时兜底，是"日常引导 + 定时强制复盘"双轨。</span></p>

<p id="f-doxcnLnIktyivg4SXm3doz0PPNb"><span style="font-weight:bold">我从这个设计里学到最重要的一点是</span><span>：这是典型的 harness engineering 分工——</span><span style="font-weight:bold">把 LLM 不擅长的事情交给代码，把代码做不了的事情交给 LLM</span><span>。"什么时候反思"是调度问题，代码能稳定搞定；"这段对话里有没有值得沉淀的东西"是语义判断，只能交给模型。纯提示词做不到，因为模型不会自己记着"我已经聊了 10 轮了该反思了"；纯代码也做不到，因为代码没法判断一段自然语言对话里哪些是用户偏好哪些是临时需求。把两者边界切得足够清，这个系统才能跑得稳。</span></p>


<a id="section-0179"></a>
## Hermes 源代码

<a id="f-doxcnbaqa6PNIMoHl4teGNve2oe"></a>

<p id="f-doxcneUH47F14hNssJCDrqgXsug"><span><span><a href="https://github.com/nousresearch/hermes-agent"><span>https://github.com/nousresearch/hermes-agent</span></a></span></span></p>


<a id="section-0180"></a>
## 视频讲解

<a id="f-doxcnCICmBqS3j7zMAZdhyCxUob"></a>

<p id="f-doxcn5PFFR9GnUCuregTK0HnMmb"><span><span><a href="https://www.bilibili.com/video/BV1J9o4BnE2n/?vd_source=144bec9c3f54e465073138bed788be1b"><span>https://www.bilibili.com/video/BV1J9o4BnE2n/?vd_source=144bec9c3f54e465073138bed788be1b</span></a></span></span></p>


<a id="section-0181"></a>
## 开源框架解读 - ClaudeCode

<a id="f-doxcneK3qVfDjLnKOQFCdsbYDmf"></a>

<blockquote id="f-doxcnEtwyHVHGvTUPBpixsEGcwb"><p id="f-doxcnOgXT1kv5EHXFcPcMzEZuef"><span>26年三月底，Claude Code源码泄露。一经泄露，面试就成近期必考的问题。有同学反映面试官直接问他，Claude Code代码泄露2天了？你还没看吗？所以对于这一部分，近期是非常重要的考点。</span></p>
<p id="f-doxcnQDKXJG4PkIFJT4IN37IaUc"><span>另外其实除开最近热点事件外，学习ClaudeCode本身就是非常有帮助的，他本质是一个CodingAgent。我们学习Agent可以分成三步：</span></p>
<p id="f-doxcnloX3gFXhd2MicqCsHc7cEg"><span>1. 掌握了Agent的基础知识</span></p>
<p id="f-doxcnUodqWwcAFBdiXy3YSMs0Bd"><span>2. 可以分析典型的Agent架构，比如笔记已经有的Openclaw架构分析，本期的ClaudeCode架构以及马上会出的字节的Deerflow2.0的Agent架构，建立审美。</span></p>
<p id="f-doxcnnwYe7mDLSOk0oGHHbA7Ieb"><span>3. 设计一个自己的Agent项目架构，写文档，用Harness工程来完成。</span></p>
<p id="f-doxcnyN8cIFjFxLGrURfaDa9PJd"><span>有了项目后，我们就可以面试了，所以学习经典的Agent架构是很有帮助的，本节就一起来学习这个经典的CodingAgent - Claude Code</span></p>
</blockquote>

<a id="f-doxcn8uO2qlkizlzqCwVAFuEeAF"></a>

##### 事件概述

<blockquote id="f-doxcnSa5Or4pZpLDzcedq9OsxIg"><p id="f-doxcnWuV4DijEs7ppBxnWxNY6Xc"><span>这节就讲下事件起因，大家看看就好，了解事件的来龙去脉。算是近期（2026年4月）的一个谈资。</span></p></blockquote>

<a id="f-doxcnCXGLLQsqEA8u6rMaRMufcd"></a>

###### 怎么泄漏的

<p id="f-doxcnP359mwsJNhmSFe5Ut2CJhc"><span>2026 年 3 月底，安全研究者 Chowan Chow 发现 Anthropic 发布在 npm 上的 </span><span><span><span>@anthropic-ai/claude-code@2.1.88</span></span></span><span> 包中意外包含了一个约 60MB 的 </span><span style="font-weight:bold">source map 文件</span><span>（</span><span><span><span>.map</span></span></span><span>），这个调试文件直接映射回了 Claude Code 的完整未压缩 TypeScript 源码，甚至可以通过 Anthropic 自己的 R2 云存储桶以 zip 包形式直接下载。一共 </span><span style="font-weight:bold">1,902 个文件、约 51.2 万行 TypeScript 代码</span><span>就此公之于众。</span></p>

<p id="f-doxcntYFbr3tgpRXkg8qWtTZxae"><span>根本原因是一个低级的配置遗漏——开发团队忘记在 </span><span><span><span>.npmignore</span></span></span><span> 中添加 </span><span><span><span>*.map</span></span></span><span>。Claude Code 的创建者 Boris Cherny 确认这是人为失误，与打包工具 Bun 的 bug 无关。讽刺的是，这已经是</span><span style="font-weight:bold">第二次</span><span>发生同样的错误。Anthropic 随后迅速发起 DMCA 下架通知，但代码早已被广泛分发和归档，无法收回。需要明确的是，此次泄漏仅涉及产品代码（Agent 框架），不包含任何客户数据、API 密钥或模型权重。</span></p>

<a id="f-doxcnN2aXMUhAZh8oSE9JT6YYyb"></a>

###### 泄漏揭示了什么

<p id="f-doxcnC50Z1VDmx463BBgOpae7Ve"><span>泄漏的代码完整揭示了 Claude Code 的内部架构。它本质上是一个用 TypeScript 编写的 </span><span style="font-weight:bold">AI Coding Agent</span><span>，核心是经典的</span><span style="font-weight:bold">查询循环（Query Loop）+ 工具系统</span><span>架构，外加多层记忆系统、上下文压缩算法、权限与安全机制等工程组件。本文后续章节将从以下几个维度逐一深入分析：</span></p>

<div style="margin-left:25px"><div id="f-doxcnRiVpJoTbrwxo8TeyiLhINc" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">核心架构</span><span>：Query Loop、工具系统、System Prompt 分层设计、终端 UI 引擎</span></div></div><div id="f-doxcnJNydA8Adz1jwgU5tT9blKl" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">记忆与上下文</span><span>：多层记忆架构、5 级上下文压缩（Compaction）策略</span></div></div><div id="f-doxcnTmFqAw8oKLrzznHJ7TDx9g" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">安全与权限</span><span>：权限模式、YOLO Classifier、Prompt Injection 防御</span></div></div><div id="f-doxcnfZ4P90nk5qitUJ0rXbbB3g" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">多 Agent 协作</span><span>：子代理模型（Fork / Teammate / Work Tree）、Coordinator Mode</span></div></div></div>

<p id="f-doxcniZ8XJ4NqjR7vzdqOIRoaOe"><span>此外，代码中包含 </span><span style="font-weight:bold">44 个编译时 Feature Flag</span><span>，暴露了大量尚未公开的内容：</span></p>

<div style="margin-left:25px"><div id="f-doxcn77txU02wfcq14ivXNIS95f" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">未发布功能</span><span>：24/7 自主守护进程 Kairos、记忆整合的 Dream System、30 分钟深度规划 Ultra Plan、反蒸馏防御 Anti-Distillation、卧底模式 Undercover Mode 等</span></div></div><div id="f-doxcntVTCunf12Y9gX8UMdRRcOu" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">未发布模型</span><span>：Capybara/Mythos（全新产品线）、Numbat（完全未知）、Opus 4.7 / 4.8 等下一代模型代号</span></div></div></div>

<a id="f-doxcnD01BTYva79sMhR3Md4qHwc"></a>

###### 社区反应

<blockquote id="f-doxcnKt9WNaN3V58syt78136gkg"><p id="f-doxcnw0fne0SYGU03ee7zspZRch"><span>这里我们在笔记的 Harness Engineering工程中，来讲解这个Claw Code开源项目。学习这个项目，可以进一步帮我理解Harness工程（无疑这个也是26年的高频考点）。你自己其实也可以更深入学习这个项目，自己仿照这个来做一个Claude Code，是一个很好的学习Claude Code， Agent的机会，同时也是一个练手Harness 工程的机会。具体请看笔记的Harness工程的Claw Code讲解。</span></p></blockquote>

<p id="f-doxcnwfUEOMlC7qQcWmbXiMq0Ce"><span>泄漏发生后数小时内，社区迅速行动：有开发者连夜将核心功能从 TypeScript 移植到 Python（以规避 DMCA 版权风波），推送到 GitHub 后迅速成为有记录以来</span><span style="font-weight:bold">最快达到 10 万星的仓库（Claw Code）</span><span>，随后又被用 Rust 重写了一遍。甚至有人用 Claude Code 本身生成了一个 PR，试图将全部泄漏源码提交回 Anthropic 的官方仓库。</span></p>

<p id="f-doxcnRk2Hyp0sL1SKIjvB7jIDab"><span>一个讽刺性的版权争议也随之浮现：如果 Anthropic 声称的"80% 的代码由 AI 编写"为真，那么根据美国现行法律，AI 生成的内容不受版权保护——Anthropic 理论上没有 DMCA 下架的法律基础。</span></p>

<a id="f-doxcnCGAQTKNcEJX03AF0Kc7eNg"></a>

##### 整体架构

<p id="f-doxcnT3GKO5xbEGyyEeVENLAgkh"><span>掌握整体ClaudeCode的工作流程。在我们学习后面小节的时候，会有一个更清楚的理解。比如后面的</span></p>

<p id="f-doxcnHHp4SHyaGzaxZuAE21ce1c"><span style="font-weight:bold">4.4.3的记忆功能模块</span><span>：</span><span style="font-weight:bold">主要</span><span>发生 图中第四步，不过 第三步 上下文装配也会涉及。</span></p>

<p id="f-doxcnwMY9CzHH2zjCui1A5okLSb"><span style="font-weight:bold">4.4.4的Agent架构: </span><span>发生在第四步：Agentic loop或者说React，也是系统的核心。</span></p>

<p id="f-doxcnwVW9VcfM00LPwgh9Ah9olc"><span style="font-weight:bold">4.4.5 权限系统和安全审查：</span><span>发生在第四步的工具调用整个步骤</span></p>

<div id="f-doxcnDBmCEKGaXBxf7RnZJIrQuf"><img alt="" decoding="async" height="1280" loading="lazy" src="/images/agent-learning/357c9971d647f9a0ff930309.png" width="853"/></div>

<p id="f-doxcnYbzeXRhkao77J94faG2LAc"><span>一个对话 Agent 的完整流程，本质上就是回答两件事：</span><span style="font-weight:bold">一次用户输入要按什么顺序流过哪些模块</span><span> 与 </span><span style="font-weight:bold">跨轮次要持久维护哪些状态</span><span>。结合上面这张 Claude Code 工作流图，从上到下五个阶段依次是：</span></p>

<p id="f-doxcnx8Y03FTKAIi1Uu9HxqbGtg"><span style="font-weight:bold">① 会话路由</span></p>

<p id="f-doxcnQ0VOd9WeA0sVtuJYcRY8vC"><span>按 sessionId 找到（或新建）一个会话上下文，把这次请求挂到对应的会话状态上——包括消息历史、累计用量、权限模式、记忆等。新会话就 bootstrap 一份默认状态，老会话从持久化的 transcript 里恢复。这一步本质就是"先把你是谁、之前聊过啥、能用哪些权限"这些信息准备好。</span></p>

<p id="f-doxcnuga0b1PvjkjQpf6V1Qqelc"><span style="font-weight:bold">② 输入处理</span></p>

<p id="f-doxcn2oUsM25h52uD6DQ14DF8qh"><span>把多种来源（UI、CLI、SDK）的原始输入</span><span style="font-weight:bold">归一化</span><span>成统一的消息格式，同时做意图分流：解析 slash command（</span><span><span><span>/compact</span></span></span><span>、</span><span><span><span>/model</span></span></span><span> …）、@ 文件引用、粘贴的图片/附件、命令输出等。本地命令能直接处理的就短路掉，不浪费一次模型调用。</span></p>

<p id="f-doxcnlax7BkLcG0hCaWdMLm9rjc"><span style="font-weight:bold">③ 上下文装配</span></p>

<p id="f-doxcnJvQORQImStA73XoHHpy95d"><span>把这一轮要喂给模型的"完整提示"拼出来：System Prompt（身份、规则、当前模式）+ 工具定义（哪些 tool 可以调）+ 用户/项目级记忆（CLAUDE.md、偏好）+ 环境信息（cwd、git status、相关文件快照）+ 历史消息。重点是这些都是</span><span style="font-weight:bold">动态装配</span><span>的，会根据当前模型、权限、启用的插件实时变化。</span></p>

<p id="f-doxcnNWsrBfNlMTgiP4mLwadE8g"><span style="font-weight:bold">④ Agentic Loop（核心循环）</span></p>

<blockquote id="f-doxcnudKA5H9Zm5YaG2B9UoEc7b"><p id="f-doxcnDn5BSBpRsWSgQuxBRzdI3c"><span>整个系统的核心，也可以说是React的实现方法，面试考点如：React如何实现，就可以借鉴这里。</span></p></blockquote>

<p id="f-doxcnDl3vSwSnrbD5OUgARcFvTF"><span>这是图里红框那一块，也是 Agent 之所以叫 Agent 的地方。一个 </span><span><span><span>while (true)</span></span></span><span>，每轮四件事：</span></p>

<ol start="1"><li id="f-doxcnLTHPt30BGhBXuyLEjL3x0g"><span style="font-weight:bold">上下文治理</span><span>：进循环先看 token 预算，超阈值就压缩——把旧消息摘要化（auto-compact），腾出窗口继续聊。</span></li></ol>

<ol start="2"><li id="f-doxcnFx8EvE2RbyUalCkjWWfxKK"><span style="font-weight:bold">调用模型</span><span>：流式发请求，边收边把 partial 结果推给 UI。</span></li></ol>

<ol start="3"><li id="f-doxcnQxkr6ME4cPITresXZLPvwe"><span style="font-weight:bold">判定是否调工具</span><span>：看返回的 </span><span><span><span>stop_reason</span></span></span><span>。模型说 "end_turn" 就跳出循环；说要 "tool_use" 就进下一步。这就是 ReAct 的 Thought → Action 决策点。</span></li></ol>

<ol start="4"><li id="f-doxcncijG8utOnv8jj27XhZ7zqe"><span style="font-weight:bold">执行工具 → 结果回填 → 回到第 1 步</span><span>：按模型给的 tool_use 调度工具（文件读写、Bash、MCP、子 Agent），先过一遍权限校验，结果作为 tool_result 追加到消息里，然后继续下一轮。</span></li></ol>

<p id="f-doxcnj5X4jB7nZS8PHobg3Au6mg"><span style="font-weight:bold">退出条件</span><span>：模型主动 end_turn / 达到 maxTurns / 预算耗尽 / 用户中断 / 不可恢复错误。</span></p>

<p id="f-doxcnmLUHaTPklFlzv4aRfZ9zUe"><span style="font-weight:bold">⑤ 回合收尾</span></p>

<p id="f-doxcnEmo569lKJFWtYkBfxJJ83e"><span>输出最终 assistant 消息；汇总这一轮的 usage、cost、耗时、停止原因；把 transcript 落盘；触发 Stop Hook 和通知。本质就是把第 ④ 步循环里产生的副作用收拢、上报、持久化。</span></p>

<p id="f-doxcn8xHMSGDrDCRyxy2fCbwyiK"><span style="font-weight:bold">横切关注点（图例里的三条虚线）</span></p>

<blockquote id="f-doxcnBBbDtw4kIVerm0r3rmKYyb"><p id="f-doxcnGhXDIvCETZkCv9yZN1iC8c"><span>这部分的内容不属于输入-输出这个工作流，是伴随在整个系统中的其它功能。</span></p></blockquote>

<ul><li id="f-doxcnRUkiyiVLo0etYiLwRKIvke"><span style="font-weight:bold">用量统计</span><span>：贯穿 ②③④⑤，每次调模型/调工具都在累加，最后在收尾结算。</span></li></ul>

<ul><li id="f-doxcn5ZThnQjoveGVUktiUgJOcd"><span style="font-weight:bold">Hook 钩子</span><span>：PreToolUse / PostToolUse / Stop / SessionStart 等切面，在输入处理、工具执行前后、收尾几个点位被触发，用户可以插自定义逻辑。</span></li></ul>

<ul><li id="f-doxcnT36KXiehHy7oiqGdO6LWPc"><span style="font-weight:bold">落盘与通知</span><span>：transcript 持久化、文件快照、桌面通知，都是异步副作用，不阻塞主循环。</span></li></ul>

<a id="f-doxcn9a9m6xogz8zM85oMvSi6bf"></a>

###### 面试真题讲解

<ol start="1"><li id="f-doxcnyvQNkLOBicmYTkLA45tKWf"><span>如何让你从0设计一个对话Agent的流程，核心状态有哪些？</span></li></ol>

<p id="f-doxcnzbh4W9sVPa0UQIiaeOlHWc"><span>(选自</span><span><span><a href="/posts/agent-learning-24-interview-review/#f-doxcnEzp8GDSc3cwzZgNbPWBXDd"><span>腾讯2026年4月暑期实习大模型开发</span></a></span></span><span>）</span></p>

<blockquote id="f-doxcnIitJOIaxyG2jauOn6z2Xuh"><p id="f-doxcndiJ0Fj8YnGjwwb2hF2MSBg"><span>其实就是理解了上述整体架构后，你可以套用CC的架构来讲。当然你也可以套用Openclaw的架构来讲。Openclaw也用了React, 上面有gateway。总之你要用一个完整成熟的架构来回答，设计的流程肯定是比较成熟完整的。</span></p></blockquote>

<p id="f-doxcnkDMOGYM5Vw6w5Fc0dK3ucb"><span>可以把一个对话 Agent 拆成五步流水线：</span><span style="font-weight:bold">会话路由 → 输入处理 → 上下文装配 → Agentic Loop → 回合收尾</span><span>。</span></p>

<p id="f-doxcneramRIpZNHqbHbmmJj2ajh"><span style="font-weight:bold">会话路由</span><span>：按 sessionId 把请求挂到对应会话上，恢复历史消息、用量、权限模式、记忆。</span></p>

<p id="f-doxcn85znR8bemcpHyNPipoIOpe"><span style="font-weight:bold">输入处理</span><span>：把多来源的输入归一化成统一消息，解析 slash command、@ 引用、附件，本地能处理的直接短路掉。</span></p>

<p id="f-doxcngA0lGfWtALoptvMN1eQWod"><span style="font-weight:bold">上下文装配</span><span>：动态拼出这一轮要喂给模型的完整提示——System Prompt + 工具定义 + 长期记忆 + 环境上下文 + 历史消息。</span></p>

<p id="f-doxcn6rrnEitQNlRFU9ycbPAwyc"><span style="font-weight:bold">Agentic Loop</span><span>：一个核心循环，每轮先做上下文裁剪/压缩，再调模型，看 stop_reason 决定退出还是调工具；调工具就先过权限校验、再执行、把结果回填进消息继续下一轮。退出条件是 end_turn / 达到轮数上限 / 预算耗尽 / 用户中断 / 错误。</span></p>

<p id="f-doxcnbmNTjXVKIDCjjrWJcLM5ue"><span style="font-weight:bold">回合收尾</span><span>：输出最终回复，汇总 usage 和 cost，落盘 transcript，触发 Stop Hook等操作。</span></p>

<ol start="2"><li id="f-doxcnxdDS8fU3BdmLsostKCV2ug"><span>ReAct机制在生产环境里该怎么实现?</span></li></ol>

<p id="f-doxcn5xsnx3SeQz49S8fm9NQVsg"><span>(选自</span><span><span><a href="/posts/agent-learning-24-interview-review/#f-doxcnEzp8GDSc3cwzZgNbPWBXDd"><span>腾讯2026年4月暑期实习大模型开发</span></a></span></span><span>）</span></p>

<blockquote id="f-doxcnOFQfnsLtXOr6GThRnGPsmf"><p id="f-doxcnYdIANNdCRH2p8WLv8yvKTd"><span>不论是Openclaw还是ClaudeCode，里面都用的React，大概的实现方法也类似，我们把它抽象成这样。这个图可以作为React的标准工程实现流程。</span></p></blockquote>

<div id="f-doxcn5K0ZiciTdoySV3ZCZkXUQb"><img alt="" decoding="async" height="1280" loading="lazy" src="/images/agent-learning/41df49343a2a1082f816a8f8.png" width="853"/></div>

<p id="f-doxcn2bzpQMaFckLYl8ImPGRrCg"><span>生产环境里可以把 ReAct 设置成一个循环流程：</span></p>

<p id="f-doxcnA6CQO6JTQFH1J9u5kqOW8d"><span style="font-weight:bold">1.先装配上下文</span></p>

<p id="f-doxcnvmDCVYqZWPZ7FMosXBYSXf"><span>每一轮模型调用前，系统要把用户输入、历史消息、System Prompt、工具定义、权限信息、环境状态一起组装好，形成当前这一轮的完整上下文。</span></p>

<p id="f-doxcnDNJehnzeHmJoyv3DyE6pEb"><span style="font-weight:bold">2.让模型决定下一步</span></p>

<p id="f-doxcnMSO7v9YfNBPd35GWftsG0d"><span>模型不是直接随便输出文本，而是要么返回最终答案，要么返回一个结构化的工具调用请求，比如要调用哪个工具、参数是什么、调用目的是什么。</span></p>

<p id="f-doxcniYq1hFQk0wo0IOlTrRkiNh"><span>这一步对应 ReAct 里的 Reasoning / Action 决策。</span></p>

<p id="f-doxcnGU14unITEjsHc6ozroyz0g"><span style="font-weight:bold">3.由系统执行工具，而不是模型自己执行</span></p>

<p id="f-doxcnovMkEwjbUc7lB2zXs9Z9xe"><span>模型只能“申请调用工具”，真正执行的是外部 harness / runtime。</span></p>

<p id="f-doxcn4EY7KrAfA8IB5P0tZLyN36"><span>执行前要做权限检查、参数校验、风险判断、超时控制、重试控制。比如文件写入、数据库查询、外部 API、Shell 命令，都不能只靠模型一句话就执行。</span></p>

<p id="f-doxcnbSkoEXpdTIp25PbIlmyZzb"><span style="font-weight:bold">4.把工具结果回填给模型</span></p>

<p id="f-doxcnji8IRu6gfBvfNsXr6Hkfpe"><span>工具执行完以后，结果会作为 observation / tool_result 加回对话历史里，再进入下一轮模型调用。模型基于新结果继续判断：是继续调工具，还是给用户最终回答。</span></p>

<p id="f-doxcn0V4fBxr97iT8eZDYwueMNc"><span style="font-weight:bold">5.设置退出条件</span></p>

<p id="f-doxcnVTKvKhUgQ3orYNhiD5sz6e"><span>不能让 Agent 无限循环。生产里必须有明确的退出条件，比如模型返回 final answer、达到最大轮数、token 预算耗尽、工具失败次数过多、用户中断、权限拒绝等。</span></p>

<a id="f-doxcnYBSPc4kn6qHFK7z9g6dIrd"></a>

##### 记忆功能

<blockquote id="f-doxcnQOGUIhHFsmQzeVXOx7oKEe"><p id="f-doxcnKBYj2GZpTXvF95h9HQJzIn"><span>其实大家看各种Agent的开源项目，每个Agent项目，我们都需要关注最重要的几个点，也是Agent项目的核心：比如记忆，架构，Agent的交互对吧。所以不管看哪个Agent项目，都该特别解析关注这个记忆模块。我们在笔记的openclaw部分已经解析了小龙虾的记忆功能，今天我们来看看ClaudeCode的记忆功能，二者对比，体会成熟的Agent项目的记忆功能背后的设计哲学。</span></p></blockquote>

<p id="f-doxcnk3WIardCaxkCDfvBHpYJ1e"><span>学习一个 Agent 的记忆模块，可以重点从以下几个问题入手：</span></p>

<div style="margin-left:25px"><p id="f-doxcn0vWL9onCclrNIU2HMrVMoy"><span>- </span><span style="font-weight:bold">它由哪些部分组成？</span></p><p id="f-doxcnFCeMNHdycsZwjxFng8Zs0c"><span>- </span><span style="font-weight:bold">它是如何运行的？</span><span>例如加载、写入、压缩、恢复等流程。</span></p><p id="f-doxcnnQKvzjaJrdrly3nhPu9H1g"><span>- </span><span style="font-weight:bold">各部分分别负责什么功能？</span></p><p id="f-doxcnbW6BWHLeKcYFGGfdAgmIkd"><span>- </span><span style="font-weight:bold">信息以什么格式存储？</span><span>例如 `.md`、`.jsonl`、内存对象等。</span></p><p id="f-doxcnuajYeF8axhJmgcibMt4iLg"><span>- </span><span style="font-weight:bold">这些信息存在哪里？</span><span>是在内存中，还是落到磁盘文件里？</span></p><p id="f-doxcneRDCDBeqp2kbsni9xOsHdc"><span>- </span><span style="font-weight:bold">整体设计理念是什么？</span><span>它是为了让模型更聪明，还是为了让系统更可恢复、更可审计？</span></p></div>

<p id="f-doxcnbBQYl34Usek7TK4U43Aaqg"><span>教大家一个小技巧，如果你没有设计Agent的一些思想，那么在本节笔记也会引入真实的面试真题，感受面试官对于你的记忆系统是怎么提问的？可以用这些面试真题来体会自己有没有真正理解。当然如果你更有想法，在消化了本节内容后，可以结合自己项目和思想，去改进你的记忆系统（但前提是你消化了这个业内的标杆实现，如果你没有消化就自己设计，那你还不如照抄呢）</span></p>

<p id="f-doxcnqABLJ3STh8gWrli3CUk9ag"><span>从宏观上，我们从这个图来了解CC的存储系统。其实我翻了大量的参考资料，很多资料的解析，其实只解析了CC的左半边部分，甚至只解析了左半边记忆系统里面的某一层。但是这里加入了右边，Transcript，因为不讲这个，讲不清楚ClaudeCode是如何恢复对话，做上下文重建的（这也是面试问题，另外你要是用这一套记忆系统放在你的项目，你必须从各个角度理解透彻，因为面试官会从各个角度来提问）</span></p>

<p id="f-doxcntCoW2tDvDnzeqql2yUtpWd"><span>从宏观上看，Claude Code 的上下文持久化体系可以分成两大部分：</span><span style="font-weight:bold">Memory 记忆系统</span><span> 和 </span><span style="font-weight:bold">Transcript 会话账本</span><span>。如下图：</span></p>

<p id="f-doxcnNaMToQ8QtbeK3Y28dcTjrd"><span>- 左侧的 </span><span style="font-weight:bold">Memory 记忆系统</span><span>，主要负责保存会影响模型后续理解和行动的语义材料。它包括 CLAUDE.md 族、对话上下文、Session Memory 和 Memdir 持久记忆。</span></p>

<p id="f-doxcn7HcPPoeKPM9JWvI53nkGLf"><span>- 右侧的 </span><span style="font-weight:bold">Transcript</span><span>，更像完整的会话流水账，用来记录用户消息、助手回复、工具调用和工具结果。它主要服务于恢复、回放、审计和会话续接。</span></p>

<div id="f-doxcn3ExE0nb9UER6y1pmMg9Cme"><img alt="" decoding="async" height="853" loading="lazy" src="/images/agent-learning/f4becfdf7f8e7472030dbbb2.png" width="1280"/></div>

<p id="f-doxcno86pb77T8Xx6t19PuyX3lh"><span>下面4.4.3.1 就是对该图左边的这一部分进行详细讲解。</span></p>

<p id="f-doxcnSnCgLe1xT0C2iy09EOoMVf"><span>同时附上一张完整的图片，包含了四层记忆和压缩功能，CC整体的运作图。</span></p>

<div id="f-doxcnXhJlPY4idQOqrnIqjeeQQe"><img alt="" decoding="async" height="846" loading="lazy" src="/images/agent-learning/f8c931ab876bbf0987a4aa31.jpg" width="1280"/></div>

<a id="f-doxcnZyYi3qZeDcs3PxDGXtNmse"></a>

###### 四层记忆

<ol start="1"><li id="f-doxcneuz1VwDnYTeQPNEEfXlicb"><span style="font-weight:bold">五层指令文件（CLAUDE.md 族）—— 人写的规则</span></li></ol>

<blockquote id="f-doxcnefP5rILSobap0tNEP1hr4N"><p id="f-doxcn6GgCv8xFqcUswnuAO2Rhvh"><span>指令文件其实在CC的核心用法就讲过，这里Claude.md 系列文件的维护，需要人工维护的。</span></p></blockquote>

<div id="f-doxcntImqvjBkTv9TMkD3Xp9DRb"><img alt="" decoding="async" height="1280" loading="lazy" src="/images/agent-learning/4e75a61519e9fbdd7b37a30e.png" width="853"/></div>

<p id="f-doxcnXGIJGxzjsUvlfUiBbClLW9"><span>CLAUDE.md 族采用五层记忆体系：</span></p>

<ul><li id="f-doxcnTc6I6oEjoKpWnM4T8wg21b"><span style="font-weight:bold">企业级</span><span>：</span><span><span><span>/etc/claude-code/CLAUDE.md</span></span></span></li></ul>

<p id="f-doxcnma2eQfXv8G4K33Pm1H1Ogc"><span>管理者是 IT 部门 / 管理员，作用范围是全公司开发者。特点是强制执行，个人无法覆盖。</span></p>

<ul><li id="f-doxcnMetEgVZSceJhtoLothhQYc"><span style="font-weight:bold">用户级</span><span>：</span><span><span><span>~/.claude/CLAUDE.md</span></span></span></li></ul>

<p id="f-doxcnsptNy2f1yqDAynGZ647XFc"><span>管理者是开发者个人，作用范围是该用户所有项目。特点是跨项目的个人偏好。</span></p>

<ul><li id="f-doxcn7Ebgn3yvjJFRS7XoxRxX1g"><span style="font-weight:bold">项目级</span><span>：</span><span><span><span>./CLAUDE.md</span></span></span></li></ul>

<p id="f-doxcnU1Cb5z1H6vzKqXH1zxfx9g"><span>管理者是团队 / Tech Lead，作用范围是当前项目所有成员。特点是提交至 Git，团队共享。</span></p>

<ul><li id="f-doxcn4np7FZnSb20HgeZntxbIMf"><span style="font-weight:bold">规则级</span><span>：</span><span><span><span>.claude/rules/*.md</span></span></span></li></ul>

<p id="f-doxcnrFIdyWYvAL08u4bRPWTbwd"><span>管理者是团队 / 个人，作用范围由 Glob 模式限定。特点是模块化、条件化触发。</span></p>

<ul><li id="f-doxcnYQH2xbz5WtAGT5tIlwtxbe"><span style="font-weight:bold">本地级</span><span>：</span><span><span><span>./CLAUDE.local.md</span></span></span></li></ul>

<p id="f-doxcn2ydBxa6DQnwGcvcQ8xFd9p"><span>管理者是开发者个人，作用范围仅当前工作区。特点是不提交 Git，通常自动加入 </span><span><span><span>.gitignore</span></span></span><span>。</span></p>

<p id="f-doxcnoVyDpoEQEhpkaTpFR9KK7b"><span>从上至下，适用范围逐渐收窄，内容颗粒度日益精细，管理灵活性也随之递增。</span></p>

<p id="f-doxcnN1kln39tXC4eAtQ20hpcMc"><span>你可能会问，当这五层内容，冲突了怎么办？</span></p>

<p id="f-doxcnFFMEMCkbRHOwiQej7KWzue"><span>Claude Code 不会像配置系统那样用下层文件把上层文件整段替换掉，而是把企业级、用户级、项目级、规则级、本地级这些 </span><span><span><span>CLAUDE.md</span></span></span><span style="font-weight:bold">内容一起读出来</span><span>，</span><span style="font-weight:bold">按一定顺序合并进同一个上下文里，让模型同时看到多层规则</span><span>。发生冲突时，普通规则主要靠</span><span style="font-weight:bold">模型根据“更具体、更贴近当前任务、位置更靠后/更新”的信息来判断该听谁</span><span>，比如用户级说 4 空格、项目级说 2 空格，项目级更具体，通常会被采纳。但这仍是认知层的软优先级，不是代码级覆盖；真正的硬约束要靠权限、Hooks、Managed Settings 这类系统机制保证。</span></p>

<p id="f-doxcn8ZF0TFcu7uTWtKZWYazN1b"><span>这里是一个面试问题考点，请看 </span><span><span><a href="/posts/agent-learning-24-interview-review/#f-doxcnEzp8GDSc3cwzZgNbPWBXDd"><span>腾讯AI Agent暑期实习，面试问题2：如果用户和AI对话生成问题本身有冲突，系统应该怎么处理</span></a></span></span></p>

<blockquote id="f-doxcnTrSHwG3ZaeVsLKZRsosJxg"><p id="f-doxcnSF3MeqXWg0YrCQnDXOzSYc"><span>更多参考资料：讲解CC的MD的原则，可以查看 《ClaudeCode Harness之道》（黄佳著）第2章 2.2小节（书籍资源要你自己找哈）。</span></p></blockquote>

<ol start="2"><li id="f-doxcnepDXj5jnj8TtxZsT9MXKNf"><span style="font-weight:bold">对话上下文—— 短期记忆</span></li></ol>

<blockquote id="f-doxcnrV96qLUrVIFXxaPvW9khte"><p id="f-doxcnB6hrPdNYVendCWHYnm7Aab"><span>就是大模型多轮对话的数组，每个Agent都有。</span></p></blockquote>

<p id="f-doxcneUmiDq7ROWxbxTzTIcfJdh"><span>当前对话的消息数组，所有 LLM 应用都有。Claude Code 的特别之处在于配套了一套多层压缩策略来管理它（见 3.1存储时，由后台 agent 更新），主要服务本次 compact。</span></p>

<ol start="3"><li id="f-doxcnsqECrLO8aLucWIxjIqkcDd"><span style="font-weight:bold">持久记忆（Memdir）—— 跨会话的长期记忆</span></li></ol>

<p id="f-doxcnZgnlh3HYbAm1ivqhFr7Mhh"><span>最核心的长期记忆系统，位于 </span><span><span><span>~/.claude/memory/</span></span></span><span>。存 4 类信息：</span></p>

<div style="margin-left:25px"><div id="f-doxcnvmjDAgkMfjfQKDMmGrQDLh" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold"><span><span>user</span></span></span><span>：用户角色、偏好、技能水平。例："偏好函数式风格"、"是后端工程师"</span></div></div><div id="f-doxcnWN70Og37bhSgC4xd8Lvplg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold"><span><span>feedback</span></span></span><span>：用户对 AI 的纠正和确认。例："上次用 forEach 被要求改成 map"</span></div></div><div id="f-doxcnVTuhiHxnbcTTRac1i9pGhh" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold"><span><span>project</span></span></span><span>：项目目标、决策、截止日期。例："Q3 要迁移到 TypeScript"</span></div></div><div id="f-doxcntsCxsp5Z7bAX91rw4u14yg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold"><span><span>reference</span></span></span><span>：外部系统指针。例："Bug tracker 在 Linear：xxx"</span></div></div></div>

<p id="f-doxcnzG4wLMaPz9gNdxCsbmcRub"><span>注意这里</span><span style="font-weight:bold">故意不存代码事实</span><span>（如"函数 X 在第 30 行"），因为代码会变但记忆不会自动更新，过时的代码记忆会变成危险的误导。代码相关的事实永远用 grep/glob 实时搜索，只有人的偏好和判断才值得持久化。</span></p>

<p id="f-doxcnW7mwpF7AlalmI210Nhrwdb"><span style="font-weight:bold">存储结构：</span></p>

<pre id="f-doxcnLK1O0J3GqC7XehaBX2jD6e"><code>~/.claude/memory/
├── MEMORY.md              ← 索引文件（每次会话自动加载）
├── user_role.md           ← 主题文件：用户角色
├── feedback_testing.md    ← 主题文件：测试相关反馈
├── project_migration.md   ← 主题文件：迁移计划
└── reference_tracker.md   ← 主题文件：外部系统指针</code></pre>

<p id="f-doxcnNhU1VM2Vs5m26Xd0vwAxBg"><span><span><span>MEMORY.md</span></span></span><span> 是</span><span style="font-weight:bold">索引</span><span>，不存记忆内容本身——每行只有一个指向主题文件的链接和一句话摘要（≤150 字符），格式如 </span><span><span><span>- [用户角色](user_role.md) — 后端工程师，偏好函数式风格</span></span></span><span>。上限 200 行 / 25KB。</span></p>

<p id="f-doxcnTtRi4ypWgciBXlns0prGLd"><span>实际的记忆内容存在各个</span><span style="font-weight:bold">主题文件</span><span>中，按语义主题命名（不是固定 4 个文件），每个文件带 YAML frontmatter 声明 name、description 和 type（对应上面的 user/feedback/project/reference 四种类型）。查询时系统通过扫描 frontmatter 来判断哪些文件与当前对话相关。</span></p>

<p id="f-doxcnmo41yhPwB3keUIauQMdxOe"><span style="font-weight:bold">团队记忆：</span><span> Memdir 下有 </span><span><span><span>team/</span></span></span><span> 子目录，支持跨用户共享的项目记忆。会话开始时自动同步。敏感信息（API 密钥等）禁止存入。Feature flag </span><span><span><span>TEAMMEM</span></span></span><span> 控制。</span></p>

<p id="f-doxcnzORdcn6UDKhyr37HOftLX8"><span style="font-weight:bold">写入时机</span><span>：用户明确说“记住”时立即写；或者一轮完整回答结束后，也就是模型给出最终回答、没有继续调用工具时，系统会触发后台 </span><span style="font-weight:bold">extraction agent</span><span>。它会看最近一段对话里有没有值得跨会话保存的内容，也就是 durable memory。</span></p>

<p id="f-doxcnQSOIEglkmBNYx0PnKqRned"><span style="font-weight:bold">召回策略：</span></p>

<p id="f-doxcnMgdWBeZL92OoKEZYVuLHSd"><span>Claude Code 的长期记忆召回是这样的：</span><span style="font-weight:bold">每个用户回合后台发起一次检索</span><span>，由一个</span><span style="font-weight:bold">更便宜的小模型</span><span>（Sonnet）拿用户这句话去和每条记忆的一行 description 做语义相关性匹配，最多挑出 5 条"确定有用"的注入上下文（常常是 0 条，挑不准就不选）。注入前还有多道闸门——</span><span style="font-weight:bold">单字输入、超会话预算、已注入过或主模型已读过的</span><span>，都会被跳过，所以不是每回合雷打不动灌 5 条，而是按相关性 + 去重 + 预算动态决定。此外 MEMORY.md 索引始终常驻上下文，主模型也能按需主动去读对应记忆文件。</span></p>

<blockquote id="f-doxcndF0TKrvfpK5ntWyOlh0Qwe"><p id="f-doxcnPSNbVOpMqZQo6JiXrdPlAt"><span>召回策略这里，</span><span><span><a href="/posts/agent-learning-24-interview-review/#f-doxcnMWQwNzSZdTiCuCnvVvOgCe"><span>202605 安克暑期实习</span></a></span></span><span> 面经中有问到。 </span></p></blockquote>

<blockquote id="f-doxcnCnivcI3ZuAOR6kN1XYFoab"><p id="f-doxcnUm4v6MqE3BcRLzIBHcfxMg"><span>想深入学习Memdir? 其实对于这个Memdir，它的设计的理念，层级，可以看</span><span><span><a href="https://lintsinghua.github.io/#ch06"><span>这里</span></a></span></span></p></blockquote>

<a id="f-doxcnz9gUphuvG9cU5ce7oTqgGb"></a>

###### Transcript会话账本

<p id="f-doxcncGF4fXaYperLsZYmRmY1zd"><span>通常来说，很多书籍，文章解析ClaudeCode的时候，讲记忆功能，只会讲4.4.4.1的四层记忆，不会讲这个一小节。但是为什么要讲，是因为如果你要把这一套记忆系统，用在你的项目，和面试官聊的时候，你必须理解这一整套，你的Agent存了哪些东西，面试官可能会问你，会话是如何重建的，恢复的？你必须要理解这一层的存储，因为会话重建，回滚的方法，通常不是通过4.4.3.1的记忆实现的。而是通过专门的会话账本存储的。学习这一小节，有助于理解整个Agent体系的全局架构，面试官问你：</span><span style="font-weight:bold">你的系统存了哪些东西？你如何恢复上下文的问题？本节会发挥很大的帮助。</span></p>

<p id="f-doxcnYOupijDI73ZRj5Ttjbxowh"><span>大家可以看看Keep公司暑期实习面经，通过这个面经，你可以感受到，你学习这个小节的重要性。</span><span style="font-weight:bold">从面试官主动问的概率上，该小节被问到的概率不大</span><span>，这个小节的核心思想是给大家建立一个意识，日志如何恢复的。</span></p>

<p id="f-doxcnDrTvsu7ioAg5GNyyIYACgc"><span style="font-weight:bold">Transcript存了什么？</span></p>

<p id="f-doxcnUcDOvCyaA7xqWKgUKgsTeg"><span style="font-weight:bold">当刷新恢复上下文时怎么做的？</span></p>

<p id="f-doxcnQQyffdpmy16Clbi6v0CR0g"><span style="font-weight:bold">当返回到某个Checkpoint的时候怎么做的？</span></p>

<p id="f-doxcnSMnKjQqSP3RDX3xePInZse"><span>这些具体的细节还是依赖于大家自己，如果你要用这一套包装，最好能做一下，不能做也想清楚这些问题。我也给到大家对应的参考资料，大家可以借鉴LangGraph的恢复功能弄清这些问题，本节只介绍CC大概的思路（具体实现各个产品不一样，但宏观思路是一样的：记忆系统让Agent聪明+日志系统让Agent重建会话）</span></p>

<p id="f-doxcntxHgebGhrQRftOSVPs1oSf"><span style="font-weight:bold">功能介绍</span></p>

<p id="f-doxcn64i1LM8XbBNs7Vd6uhEDxd"><span>Transcript 会话账本是 Claude Code 的</span><span style="font-weight:bold">完整会话记录层</span><span>，用来保存一次会话中</span><span style="font-weight:bold">真实发生过的消息与执行过程</span><span>。它</span><span style="font-weight:bold">记录用户输入、助手回复、工具调用、工具返回结果、compact boundary、错误与恢复痕迹等内容</span><span>。它的核心功能不是“提炼记忆”，而是保留原始事实：让系统之后可以</span><span style="font-weight:bold">恢复上下文、续接会话、回放执行轨迹</span><span>，并在出问题时用于审计和排查。</span></p>

<p id="f-doxcnXzRor45urbRT3R239enMVk"><span style="font-weight:bold">写入时机</span></p>

<p id="f-doxcnbOCY6cCtFe0Q6scyWuHnfb"><span>写入时机是在会话运行过程中持续发生的。在 query loop 里收到新的用户消息、助手消息、工具结果或 compact boundary 后，会调用把这些内容写入 Transcript。也就是说，Transcript 不是最后才生成的总结，而是随着会话一步步追加的执行账本</span></p>

<p id="f-doxcnAGc27s8rDtRgiZZvLeX3Bd"><span style="font-weight:bold">存储格式</span></p>

<p id="f-doxcnTmxeBquRT2NlRJ2QO7y8Tc"><span>JSONL。每一行都是一条结构化记录，例如一条用户消息、一条模型回复、一条工具调用结果，或者一条系统状态记录。相比 Markdown，JSONL 更适合机器读取、追加写入和恢复会话。</span></p>

<p id="f-doxcn0D9mvraRfJ0E33A834ictc"><span style="font-weight:bold">恢复功能</span></p>

<p id="f-doxcndA8nPhp6THLAyXFckuxRfg"><span>恢复功能指的是 Claude Code 可以根据之前保存下来的会话记录，把一个旧会话重新接起来继续工作。它依赖的不是模型“凭空记得”，而是读取之前的 Transcript 会话账本，把用户消息、模型回复、工具结果、压缩边界和相关状态重新整理成可继续对话的上下文。这样用户下次打开同一个会话时，系统不需要从零开始，而是能知道之前聊到哪里、做过什么、哪些工具已经返回过结果、当前任务处在什么阶段。</span></p>

<p id="f-doxcnWSWM8kIp8etkHr6dxFp8yg"><span style="font-weight:bold">重放功能</span></p>

<p id="f-doxcnK9VUefL7xZedJbCtRa6ore"><span>重放功能指的是系统可以根据 Transcript 中按时间保存的记录，回看或复现一次会话中发生过的过程。因为 Transcript 记录的是完整流水，而不是最终总结，所以它可以展示用户什么时候说了什么、模型什么时候做了什么决定、调用了哪些工具、工具返回了什么、在哪个位置发生了中断或压缩。重放的重点不是让模型重新推理一遍，而是让人或系统沿着已有记录理解“当时到底发生了什么”。</span></p>

<p id="f-doxcncqyZCXmkTUNq9mfqLrJw8c"><span>这一小节的内容，也可以参考 </span><span><span><a href="/posts/agent-learning-24-interview-review/#f-doxcnRnCE6nbvTaHent4MycJ8MT"><span>虾皮2026暑期实习面试</span></a></span></span><span>，有较多关于重建的讨论。</span></p>

<p id="f-doxcnHsgMBT7BWA7yJujKg2OVrh"><span>同时，在PI agent的讲解章节，关于</span><span><span><span>会话存储</span></span></span><span>，Session机制相关内容更详细，也可以参考这里。</span></p>

<a id="f-doxcnyjnbj8PwDfg0zsB9pE2lPh"></a>

###### 上下文组装

<p id="f-doxcnHjj1YtPIlwupc0RblsccZF"><span>每轮对话开始时，系统从上述 4 种存储中</span><span style="font-weight:bold">组装完整的上下文</span><span>注入 system prompt。</span></p>

<p id="f-doxcnFN0Nt39WdjPvgUG8OBcKJh"><span style="font-weight:bold">指令文件的加载</span></p>

<p id="f-doxcnsKVmNNW5evIqqPM063uXWf"><span>所有层级的 CLAUDE.md </span><span style="font-weight:bold">都会被拼接在一起</span><span>注入，不会互相覆盖。但拼接顺序有讲究——源码注释写道：</span><span style="font-style:italic">"Files are loaded in reverse order of priority, i.e. the latest files are highest priority with the model paying more attention to them."</span><span> 这利用了 LLM 的一个已知特性：</span><span style="font-weight:bold">模型对 prompt 末尾的内容天然给予更高注意力</span><span>（recency bias）。因此排在后面的文件在实践中"优先级更高"。</span></p>

<p id="f-doxcnDORQH96CaWqhFvq7WI8Jgh"><span>加载顺序（排在越后面，模型越关注）：管理员全局 → 用户全局 → 项目级 → 本地私有。举例：如果管理员规则说"用 npm"，但项目级 CLAUDE.md 说"用 pnpm"，模型会倾向于遵循后者。</span></p>

<p id="f-doxcnCKNqind31WoLA77SPuQZZd"><span style="font-weight:bold">持久记忆的加载</span></p>

<ol start="1"><li id="f-doxcnsMXA7MCmeueshYQYdXmr2c"><span><span><span>MEMORY.md</span></span></span><span> 前 200 行</span><span style="font-weight:bold">每次会话自动加载</span><span>到 system prompt</span></li></ol>

<ol start="2"><li id="f-doxcngNmaMLlLzCbGiPlwR0rj4y"><span>用 </span><span style="font-weight:bold">Sonnet</span><span>（小模型，不是主模型 Opus）扫描所有记忆文件的标题和 frontmatter 描述，选出</span><span style="font-weight:bold">最多 5 条</span><span>最相关的，作为 </span><span><span><span>relevant_memories</span></span></span><span> 附件注入上下文</span></li></ol>

<ol start="3"><li id="f-doxcnRmEJLbjAovGczlO2ZOjWid"><span>排除本次会话已召回过的记忆（避免重复）</span></li></ol>

<ol start="4"><li id="f-doxcnudoJi9oxV9WGQX2lAxXChe"><span>超过 1 天的记忆自动加</span><span style="font-weight:bold">过期警告</span><span>：</span><span style="font-style:italic">"这条记忆是 N 天前的... 关于代码行为的声明可能已过时，请先验证。"</span></li></ol>

<ol start="5"><li id="f-doxcnvu4ESlBq2PImmzD4brJ0Jc"><span>会话总预算 60KB</span></li></ol>

<p id="f-doxcn70jXL84HW9Rw5hoVCumvca"><span>值得一提的是，记忆召回没有使用 RAG（检索增强生成）。Boris 在播客中透露，早期版本曾尝试过本地向量数据库 + 云端 embedding 的 RAG 方案，但遇到了多个问题：代码修改后索引不同步（新写的函数搜不到）、索引的权限管控复杂（谁能访问、如何防止越权）。最终发现</span><span style="font-weight:bold">agentic search（模型自主调用 glob + grep）全面优于 RAG</span><span>——Boris 的原话是 </span><span style="font-style:italic">"agentic search just outperformed everything, and when I say agentic search, this is a fancy word for glob and grep."</span></p>

<a id="f-doxcnQt5rfz0ry0UrIjAvJEtlOf"></a>

###### 压缩

<blockquote id="f-doxcnLpZsMTy6QCJgQmqWr9VTKg"><p id="f-doxcnvufmrMts70XxAWG6fFpLsb"><span>压缩是Agent里面的一个核心技巧。可以认为这里面的内容相当复杂，作者在这里也重构过几次，如果你看到的内容和视频有不一样的地方，说明内容重构过了。我也参考了好几个资料（我会附在本节参考资料里），但是其实这些参考资料里讲的都不太一样。我重构的思路，加入了更多的图片讲解，同时我避免讲得过于复杂，因为里面太深奥了，如果写得太复杂反而会弄晕。如果你想更深入研究，可以去看我给出的参考资料（当然我给的参考资料不同参考资料对这一块讲解也有所不同，可以认为不用深究，理解原理知道如何运用到自己项目就好）</span></p>
</blockquote>

<p id="f-doxcnvI1BE3abiBI8PTMst1Fveg"><span>对话越来越长，上下文窗口终会被填满。Claude Code 设计了一套</span><span style="font-weight:bold">四层压缩流水线</span><span>，在每轮查询循环中按固定顺序依次执行，每层有独立的触发条件——不是每层每次都触发，而是逐层检查、按需执行，越往后越激进。</span></p>

<p id="f-doxcnyT7s4n0NpbPt4OVgV8epre"><span>这一张图比较清晰地展示了本小节要讲的全部内容，后面会详细展开, 重点关注：</span></p>

<p id="f-doxcnEldnv6bPzgYRHAZzQrqkAc"><span>压缩分成4个层级，从弱到强。</span></p>

<p id="f-doxcnvSEnvCRlKDpB7FXgNtv3sf"><span>每层压缩的触发条件，同步还是异步，何时触发，怎么触发的？</span></p>

<p id="f-doxcnBPHoMTKznXSKHmZiUHGDnh"><span>最后一层有一个熔断机制：避免死循环。</span></p>

<div id="f-doxcnwdnhNJOp32W7O1VKlRJ5Db"><img alt="" decoding="async" height="853" loading="lazy" src="/images/agent-learning/f77594c5b6af6e253ba51ff0.png" width="1280"/></div>

<a id="f-doxcnnVNIGz7Tk7oY6OGXUmGBTc"></a>

###### 层一：Snip裁剪

<p id="f-doxcnJDbYw1oNW09sq9h5c03NZe"><span style="font-weight:bold">是什么？</span></p>

<p id="f-doxcneux5DcPGIPaDrkiWPafbIe"><span>Snip 是最轻量的清理方式，主要用于清除已经不再需要的旧工具结果，比如 Read、Bash、Grep 等输出。它不调用 LLM，只把大段工具结果替换成简短标记，从而释放 token。</span></p>

<p id="f-doxcnSbfXSzq54DihJNSg1DOvFf"><span style="font-weight:bold">如何触发？</span></p>

<p id="f-doxcnwwTHclEfgJ9ECH9CkYLWch"><span>自动触发。系统根据工具结果数量、缓存状态、时间间隔或 token 阈值，自动清理旧工具结果，不调用 LLM。用户无法通过提示词精准指定删除某条工具结果。</span></p>

<p id="f-doxcnhlfqHrycK2yfleFUSl0Ogd"><span style="font-weight:bold">实现原理</span></p>

<p id="f-doxcnhLKyCQmoi8NxoOBU5fD4ie"><span>Snip 不删除整条消息，而是保留消息结构，系统将其中的工具调用结果替换为简短的标记文本（如 </span><span><span><span>[Old tool result content cleared]</span></span></span><span>），从而释放令牌空间。这样既能减少 token，又不会破坏 tool_use 和 tool_result 的对应关系。</span></p>

<p id="f-doxcnwCTfyHVYzhBsMmarBVcCNc"><span style="font-weight:bold">同步/异步？</span></p>

<p id="f-doxcnWxmKEqIVSIHl3OzMY71z7b"><span>同步执行，成本接近 0。</span></p>

<a id="f-doxcnhYca5UMg7lhpLWNXof8yah"></a>

###### 层二：MicroCompact（微压缩）

<p id="f-doxcnQ3ArpHHWhbc3djho9xoEdT"><span style="font-weight:bold">是什么？</span></p>

<p id="f-doxcnOo2QJkVBbi2TGTkbaP5hxb"><span>MicroCompact 是基于时间触发的大规模工具结果清理。当检测到距离上一次助手消息的时间间隔超过配置阈值时，意味着服务端缓存已过期，此时无论内容多么重要，全量重写都无法避免 -- 既然如此，不如在请求之前主动清除旧的工具结果，减小重写负载。</span></p>

<p id="f-doxcnUPI56nCFdKc3VSBOQ4Ltke"><span style="font-weight:bold">如何触发？</span></p>

<p id="f-doxcn9OarVIF9TAhM7xJhtqiLDb"><span>自动触发，常见条件是缓存过期、时间间隔达到阈值，或请求处理时发现旧工具结果已经不适合继续保留。在你发送请求后，CC处理你的任务前，如果检测到条件允许，自己就做了微压缩。</span></p>

<p id="f-doxcnXV4ucqIbZUztGEsOjk2QUb"><span style="font-weight:bold">实现原理</span></p>

<p id="f-doxcnT2KtFskZHEXPKZiblc2CKe"><span>系统按工具类型白名单筛选可压缩内容，例如 Read、Bash、Grep、Glob、WebFetch 等。通常会保留最近 N 个工具结果，把更早的结果替换为清除标记。</span></p>

<p id="f-doxcnfyW6aaEjndCSOHQpPBNVQc"><span style="font-weight:bold">同步/异步？</span></p>

<p id="f-doxcnI9Q2H0l7sQfCwwpSB0seLe"><span>同步执行，发生在请求处理链路中，发起模型请求前完成。</span></p>

<a id="f-doxcn20VVb96f2i2zmBxVmfFHWf"></a>

###### 层三：Collapse（折叠）

<p id="f-doxcnrbeIQgFffeIeGZh1X15Z15"><span style="font-weight:bold">是什么？</span></p>

<p id="f-doxcnDHQEu1KIz7Q58RtS22awsb"><span>Collapse 是上下文重构级压缩。当启用 Context Collapse 特性时，系统会在上下文使用率达到 90% 时开始提交（commit）压缩操作，在 95% 时阻止新的 spawn。这一级别的设计理念是将上下文管理从"被动压缩"转变为"主动重构"。Collapse 模式会抑制自动压缩的触发，因为两者在 93% 的临界点会产生竞争。Collapse 作为更精细的上下文管理系统，拥有更高的优先级。</span></p>

<p id="f-doxcnEETKXe6jKfURaoCtIYijLg"><span style="font-weight:bold">如何触发？</span></p>

<p id="f-doxcnPrxK2WvPdSnTolq00y4lpf"><span>自动触发，主要由上下文压力驱动。大致在上下文使用率约 90% 时开始 commit 折叠，在约 95% 时进入 blocking，阻止继续扩张或创建新的子任务。</span></p>

<p id="f-doxcnedeWe3mv4PeDIq5CocU6vg"><span style="font-weight:bold">实现原理</span></p>

<p id="f-doxcnId4g0QFABN7ekPEZ6LpJ8Y"><span>Collapse 会选择相对稳定、低风险的历史片段，让专门的 context-collapse 子 agent 生成局部摘要。之后请求模型时，系统不直接发送完整历史，而是投影成类似：</span></p>

<pre id="f-doxcnoCg3eK4CbTin1mC1jBrCk3"><code>原始历史：A B C D E F
折叠视图：A B &lt;collapsed summary of C-D&gt; E F</code></pre>

<p id="f-doxcnOfnDoObxwvVSFCGowhstKc"><span>原始消息仍然保留在 transcript 中，折叠摘要作为提交记录保存，可以跨轮恢复。</span></p>

<p id="f-doxcn0ahUbY82J6MqRtnskE2RzV"><span style="font-weight:bold">同步/异步？</span></p>

<blockquote id="f-doxcn9SuSn97bumhCvfNF5ax3Vh"><p id="f-doxcnrQvD8VGd4nsXFXkW5jBCzh"><span>也就是在真正执行的时候，他还是同步阻塞的，但是可以异步准备一下它的摘要。比如说当信息变更成A,B,C,D的时候，已经开始总结C,D的summary了，E,F同时继续，这是异步的。但是真正压缩的时候，将C,D替换成summary的时候，是同步的。</span></p></blockquote>

<p id="f-doxcnIjGeBZT3pIq9NUnm8hznsd"><span>混合模式：局部摘要可以提前异步准备；真正发请求前，系统同步应用折叠视图。</span></p>

<a id="f-doxcnVSXHsRYcPETVcfAk4ZULPd"></a>

###### 层四：AutoCompact（自动压缩）

<p id="f-doxcnzhTJ04JgpzDLaN5Y6CDMYe"><span style="font-weight:bold">是什么？</span></p>

<p id="f-doxcnXUU3P9jdrn07k27Joe3TMh"><span>AutoCompact 是最终兜底机制。当上下文接近上限时，系统自动触发压缩，避免请求因为上下文过长失败。它的成本最高，因为通常需要 LLM 参与摘要。</span></p>

<p id="f-doxcnUW8vNiCIclV5GaFwUcH9Bb"><span style="font-weight:bold">如何触发？</span></p>

<p id="f-doxcnDXBn700BQT40EMGACWXYDg"><span>自动触发。典型阈值是 effective context window - 13K tokens，约等于上下文使用率 93%。另外，如果模型返回 context overflow / prompt too long，也可能触发恢复性压缩。</span></p>

<p id="f-doxcnmuLcz1t3Yz8T7XdnSIKJEd"><span style="font-weight:bold">实现原理</span></p>

<p id="f-doxcn2knB3GKpRKvCOiEnVVI6Cf"><span>触发后有两个子策略，</span><span style="font-weight:bold">先尝试轻量的，不行再用重量的</span><span>：</span></p>

<ol start="1"><li id="f-doxcnvDRiwISl1FmzCczSWAJ8Kf"><span style="font-weight:bold">Session Memory Compact（轻量）</span><span>：用已经由后台代理提取好的 Session Memory 文件作为摘要，保留最近 </span><span style="font-weight:bold">10K~40K tokens</span><span> 的原始对话（至少保留 5 条含文本的消息）。</span><span style="font-weight:bold">不需要额外的 LLM 调用</span><span>，所以很便宜。</span></li></ol>

<ol start="2"><li id="f-doxcnO6nyD7gnFUFQtqR68h03yg"><span style="font-weight:bold">Full LLM Compact（重量）</span><span>：把整段对话发给 LLM 做结构化摘要。摘要输出上限 </span><span style="font-weight:bold">20K tokens</span><span>，包含 9 个固定段落：</span></li></ol>

<div id="f-doxcnbZyvmxUBtYvTpTRaZ1fWqg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>核心请求</span></div></div>

<div id="f-doxcn2Ru8lbhzTkZhHHtLSUfRlh" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>关键概念</span></div></div>

<div id="f-doxcnHKrOGc86TeSUhNlVBZJyqc" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>涉及文件列表</span></div></div>

<div id="f-doxcnpruZFhWXYYKCAwotJFSDzc" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>代码错误与修复</span></div></div>

<div id="f-doxcntHmntFqvpKstGvFGY81HDc" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>问题解决过程</span></div></div>

<div id="f-doxcnagwZ633XLqcNLLNF9wGjZb" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>所有用户消息</span></div></div>

<div id="f-doxcn0Vx6mBseEAs6bQa98sywSf" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>待办事项</span></div></div>

<div id="f-doxcnWrkJK4mlJv94zHZ9RHVNph" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>当前工作</span></div></div>

<div id="f-doxcnGWwJuUCvA8vofUBeXsoCEb" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>下一步计划</span></div></div>

<ol start="3"><li id="f-doxcnhFPsKQT94Ncann4Y8mCgcf"><span>压缩后自动恢复文件上下文：压缩会丢弃旧消息，但会话期间所有被读过、写过、编辑过的文件都记录在 </span><span><span><span>readFileState</span></span></span><span> 缓存中（包括 agent 调用 FileRead/FileEdit/FileWrite/Bash 工具操作的文件，以及 memdir 系统和 Sonnet 预取自动加载的记忆文件）。压缩完成后，系统会从这个缓存中排除 CLAUDE.md 和 Plan 文件（它们有各自的恢复机制），再按最近访问时间排序，取最多 5 个文件从磁盘重新读取（不用旧缓存，确保内容是最新的），以每文件 ≤5K tokens、总计 ≤50K tokens 的预算注入到压缩后的上下文中，让模型不需要在下一轮重新读取这些文件就能继续工作。如果会话中没有操作过任何文件，则不会恢复。</span></li></ol>

<ol start="4"><li id="f-doxcnWT8AkdsQU06WxSca0uVJ1f"><span style="font-weight:bold">防御机制</span><span>：连续失败 </span><span style="font-weight:bold">3 次</span><span>后触发熔断，不再尝试。如果压缩调用本身也报 prompt-too-long，会从最旧的消息开始截断，最多重试 </span><span style="font-weight:bold">3 次</span><span>。</span></li></ol>

<p id="f-doxcnzaihALOiviGx9upXKV6xFU"><span style="font-weight:bold">为什么建议主动 </span><span style="font-weight:bold"><span><span>/compact</span></span></span></p>

<p id="f-doxcnJqMp1YgPO5b6GFFj6lcZIe"><span>社区分析源码后的一个关键建议是：</span><span style="font-weight:bold">主动使用 </span><span style="font-weight:bold"><span><span>/compact</span></span></span><span style="font-weight:bold">，不要等系统自动压缩</span><span>（出自 "I Read 512,000 Lines of Leaked Claude Code" 视频）。原因很简单——自动压缩触发时，你无法控制保留什么，系统按自己的 9 段模板做摘要，可能会丢掉你认为重要的上下文。而手动 </span><span><span><span>/compact</span></span></span><span> 可以附带指令，比如 </span><span><span><span>/compact 重点保留决策和待办事项</span></span></span><span>，让 LLM 知道什么该保留。Boris 在播客中也提到自动压缩是实现"本质上无限上下文"（essentially infinite context）的核心手段，但这更多是系统兜底，用户主动管理上下文效果会更好。</span></p>

<a id="f-doxcn4es5iuzhrVpASpBHaqozUg"></a>

###### 和Openclaw的对比

<blockquote id="f-doxcnP6aX06oCC9130N7zNTyvNf"><p id="f-doxcnLImCl8fw6d3fapoFfBPBMb"><span>这里我们不妨把两个架构的压缩策略对比。</span></p></blockquote>

<p id="f-doxcnuy0Bie6yiDmyWNHWUT3Mhf"><span>OpenClaw只有一级压缩，但做得更精细：保留最近 ~20K tokens 原文不动，只压缩更早的旧消息，旧消息按 token 数分成多个块逐块总结，再合并成一个连贯摘要。压缩前还会静默运行一轮，提醒 Agent 把重要内容写入记忆文件（Pre-Compaction Memory Flush），防止关键信息随压缩丢失。压缩后结构：</span><span><span><span>[合并摘要] + [最近 ~20K tokens 原文]</span></span></span><span>。</span></p>

<p id="f-doxcnKm1XenT3w6vVE2o45reaye"><span>Claude Code 则是</span><span style="font-weight:bold">两级梯度设计</span><span>：轻量级的 Session Memory Compact 效果类似 OpenClaw（摘要 + 保留最近原文），但摘要不是现场生成的，而是后台子代理提前维护好的，所以不需要额外 LLM 调用、更省成本。只有轻量级扛不住时才上 Full LLM Compact——这一步更激进，把全部对话压缩成结构化摘要，旧消息全部丢弃。</span></p>

<p id="f-doxcnSA1akf61K2H9kTr1srY2gg"><span>核心差异：OpenClaw 一步到位但精细（分块 + 合并 + 预刷记忆），Claude Code 分两步走（先便宜后贵），用梯度换成本效率。</span></p>

<p id="f-doxcnBkWhqb7hCJNMiNX0jm7Chb"><span style="font-weight:bold">下图是Claude Code 的压缩策略 vs Openclaw的压缩策略</span></p>

<div id="f-doxcnyjHDJ3lYfPtUxoSrE6K9Eg"><img alt="" decoding="async" height="853" loading="lazy" src="/images/agent-learning/6128e42945aed652d7844239.png" width="1280"/></div>

<a id="f-doxcnjEqJDzh6o9CxLjjJaslxxh"></a>

###### 我的Agent需要这么复杂吗？

<p id="f-doxcnFy4AeH2xlDS2oxPRePY9ye"><span>大概率不需要。ClaudeCode面向全球规模生产流量，很多设计，是为了处理极端情况。</span></p>

<p id="f-doxcngC5BxDyQGbdrWHj1wgSzdh"><span>比如第二层微压缩，主要为了处理的是提示词缓存，这个和Anthropic的推理端缓存有关，我们大概率不用做。一般建议做的：工具要清理 + 失败停止重试+你的压缩过程保留哪些信息。</span></p>

<p id="f-doxcnzyjq6ed08H0RNUw0RTkklf"><span>另外我分析了两个同学的面经，他们和面试官讲压缩的时候是异步压缩的，结果被面试官追问细节答不上来。其实根据我们小节讲的，在真正压缩的时候，都是同步的。但是压缩的时候依赖于一些异步执行（比如实时总结中间过程）的结果。这里注意一下。所以你最好别把你的项目压缩过程设计成异步的，弄得比CC还复杂，不想清楚面试还爱翻车。</span></p>

<a id="f-doxcnw329329gc5jlsGFnygWVZf"></a>

###### 面试真题

<a id="f-doxcnwlDG1Mgq8x2s2w9dRFDMUh"></a>

###### 参考资料

<p id="f-doxcnlsoflyxbHLoIB7H8SrmMPc"><span>我给了三个资料，他们对于CC压缩的分层层级分类都不一样，如我引言所说。以一种为准，掌握思想和原理，想清楚细节，用来对付面试题和设计项目就够了。 </span></p>

<ol start="1"><li id="f-doxcnEQOM8pwwgxfB9fvs78moRh"><span><span><a href="https://lintsinghua.github.io/#ch07"><span>《解码 Agent Harness · Claude Code 架构深度剖析》第7章</span></a></span></span><span>（本节按照这本书的分类总结的）</span></li></ol>

<ol start="2"><li id="f-doxcnMN1jsGZfVjJWWMuE5zSwvh"><span><span><a href="https://ai-coding.wiselychen.com/claude-code-context-engineering-four-layer-compression/"><span>Claude Code 上下文工程：四層壓縮機制的源碼級拆解</span></a></span></span></li></ol>

<ol start="3"><li id="f-doxcnuo176MXhmj4VcfTZxnDmHd"><span><span><a href="https://cloud.tencent.com/developer/article/2653153"><span>Claude Code 底层逻辑分析：三级压缩系统，让 AI 用有限的上下文窗口做无限长的任务</span></a></span></span></li></ol>

<a id="f-doxcnwxnAsiA2hSBHdJ0Hzpwncc"></a>

###### 记忆写入

<p id="f-doxcn0sExlVcqHhxKD0usNLzoqj"><span>上面讲了 4 种存储和加载/压缩策略，但记忆是怎么</span><span style="font-weight:bold">写进去</span><span>的？有 3 个写入机制：</span></p>

<ol start="1"><li id="f-doxcncaBOS93aKHAhR03afFrhKQ"><span style="font-weight:bold">extractMemories（持久记忆提取）</span></li></ol>

<p id="f-doxcnTb7prOzNd84R67XGOlCV6c"><span>在每次完整查询循环结束后（模型给出最终回复、没有更多工具要调用时），由一个 Fork Agent 后台执行：</span></p>

<ul><li id="f-doxcniM0olujbBMCW91UieHJGZ3"><span>继承父对话的完整上下文，共享 prompt cache（不额外消耗 token）</span></li></ul>

<ul><li id="f-doxcndOtHcg9uQFQlkyxE7La2Fc"><span style="font-weight:bold">严格权限沙箱</span><span>：只能读文件 + 只能写记忆目录，不能执行 bash、不能调 MCP、不能启动子代理</span></li></ul>

<ul><li id="f-doxcnxuDyknoeYNK6RwSfi9Uabe"><span>高效的 2 轮模式：第 1 轮并行读所有需更新的文件 → 第 2 轮并行写所有变更</span></li></ul>

<ul><li id="f-doxcnzxGZNk6gwneR0gP5q2l1Rh"><span>有频率限制，不是每轮都跑</span></li></ul>

<ol start="2"><li id="f-doxcnaTSEr4onCusjlWg51WPqUh"><span style="font-weight:bold">Session Memory 更新</span></li></ol>

<p id="f-doxcnAJDmHsfAvbu48EoEbluBcd"><span>对话 token 超过 10K 后启动，之后每 5K tokens 由后台 Fork Agent 更新一次结构化笔记文件。</span></p>

<ol start="3"><li id="f-doxcnOXONpimDCYdpTYKXbHld3J"><span style="font-weight:bold">AutoDream（记忆整合）—— "睡眠整理"</span></li></ol>

<p id="f-doxcngLQN48m1hxt131jKxFfyUf"><span>定期运行的后台代理，对持久记忆做整理、合并、去重、清理。灵感来自人类睡眠时整理白天记忆的过程。下图是AutoDream图片展示。</span></p>

<div id="f-doxcnZClwTlCzfVveDLaZ7hqWob"><img alt="" decoding="async" height="853" loading="lazy" src="/images/agent-learning/21e463a1868b380357e7c2c5.png" width="1280"/></div>

<p id="f-doxcnSdGgy7FY4qFBZt4EJPnx9g"><span style="font-weight:bold">触发条件（三个门全部通过才执行）：</span></p>

<ol start="1"><li id="f-doxcnjGlWG8jPjAJTBocjDUfzkb"><span>距上次整合 ≥ </span><span style="font-weight:bold">24 小时</span><span>（最先检查，成本最低——一次 </span><span><span><span>stat</span></span></span><span> 调用）</span></li></ol>

<ol start="2"><li id="f-doxcn4t7NI0EU9X2Sc4tym9fA1f"><span>距上次整合 ≥ </span><span style="font-weight:bold">5 个会话</span></li></ol>

<ol start="3"><li id="f-doxcns24pAjbN9HJOJsGmU6Txob"><span>获取 </span><span style="font-weight:bold">consolidation lock</span><span>（PID 文件锁，防并发；超过 1 小时且 PID 已死则可回收）</span></li></ol>

<p id="f-doxcndpASoCzioWXkz9yzIxg7Tc"><span style="font-weight:bold">执行 4 阶段：</span></p>

<ul><li id="f-doxcnJjcvaKhVnXgGMTs6rc7vSd"><span style="font-weight:bold">Orient</span><span>：读取 MEMORY.md 索引，浏览现有主题文件，了解当前状态</span></li></ul>

<ul><li id="f-doxcnqtqR01rsHlrAAbsGgMaLGQ"><span style="font-weight:bold">Gather</span><span>：扫描每日日志和会话记录（JSONL），窄范围 grep，不穷举</span></li></ul>

<ul><li id="f-doxcnCuufQPMl9UIKpbeTpPxMwh"><span style="font-weight:bold">Consolidate</span><span>：新信息合并到现有主题文件，修复矛盾，相对日期转绝对日期</span></li></ul>

<ul><li id="f-doxcnz5STzezwWoQu12FUW5zeKe"><span style="font-weight:bold">Prune</span><span>：保持 MEMORY.md ≤ 200 行，删除过时条目，精简冗长描述</span></li></ul>

<p id="f-doxcnmFYrVVRY3FnYxOHb6q4Y0e"><span>System prompt：</span><span style="font-style:italic">"You are performing a dream — a reflective pass over your memory files. Synthesize what you've learned recently into durable, well-organized memories so that future sessions can orient quickly."</span></p>

<p id="f-doxcn2REMOHpFGZX1BqjRz8Y3dg"><span>整合期间</span><span style="font-weight:bold">只读访问</span><span>——可以看代码文件，但只能写记忆目录。由 Fork Agent 执行，UI 底栏显示 "dreaming" 标签。</span></p>

<p id="f-doxcngyotv2Tk6ZZJCvPIeHKEac"><span style="font-weight:bold">三者对比：</span></p>

<div id="f-doxcn4Eaa1WMvoyR5jlLBpPSjQH"><img alt="" decoding="async" height="730" loading="lazy" src="/images/agent-learning/a0023a1bede8b457d24617a8.png" width="1177"/></div>

<a id="f-doxcnSzV8wq1hATdn4ZuWLPOkLh"></a>

###### Claude Code vs OpenClaw：记忆设计思路对比

<p id="f-doxcndRhflMDNh6DHa38uK467Ee"><span>两者解决的是同一个问题——</span><span style="font-weight:bold">有限上下文窗口下如何让 Agent 不失忆</span><span>，但设计思路有几处根本性的分歧。</span></p>

<p id="f-doxcnlSme3KkqoddvgfSRMNkKQb"><span style="font-weight:bold">检索路线之争：Agentic Search vs RAG</span></p>

<p id="f-doxcntzc9mpLl9PcHnkNc34d0re"><span>这是两者最大的分歧。Claude Code 明确</span><span style="font-weight:bold">拒绝 RAG</span><span>，Boris 透露早期试过向量数据库 + embedding 方案，但发现代码修改后索引不同步、权限管控复杂，最终结论是让 Agent 自己调 glob + grep 实时搜索（agentic search）全面优于 RAG。OpenClaw 则走了完全相反的路——用 SQLite 建本地索引，向量语义匹配 + BM25 关键词匹配加权合并做混合检索。</span></p>

<p id="f-doxcno1pEElXAci9noSzm5VJ2wh"><span>本质上这是 </span><span style="font-weight:bold">"每次多花点 token 换实时准确"</span><span> vs </span><span style="font-weight:bold">"建索引省 token 但要维护一致性"</span><span> 的取舍。对 coding agent 来说，代码文件变化极频繁，索引的一致性成本很高，所以 Claude Code 选择了不建索引；而 OpenClaw 面向更通用的 Agent 场景（聊天、知识管理），记忆文件相对稳定，RAG 的收益更明显。</span></p>

<p id="f-doxcnMHRnWZYFKmbVO40HI9WUnf"><span style="font-weight:bold">压缩策略：梯度递进 vs 一步到位</span></p>

<p id="f-doxcn2BeOx0kgGzzGQA0kshCTef"><span>Claude Code 设计了 5 层压缩流水线，从温和到激进逐层升级——先清理工具输出碎片、再考虑缓存优化、然后才做 LLM 摘要、最后硬拒绝和兜底。大部分情况下前两层（不需要 LLM 调用）就能把 token 压下来，真正的 LLM 压缩是中低频事件。这是一种</span><span style="font-weight:bold">用工程复杂度换成本效率</span><span>的思路。</span></p>

<p id="f-doxcnfvajAdEfHY47PDJjuelkEf"><span>OpenClaw 只有一级压缩，但流程更精细：划分保留区（最近 ~20K tokens 原封不动）、压缩区分块逐块总结、多块摘要再合并成一个连贯总结。每次触发都需要 LLM 调用，成本更高，但</span><span style="font-weight:bold">实现简单、行为可预测</span><span>。</span></p>

<p id="f-doxcn9DtCCp8bxxbbvDUeZ5xIEb"><span style="font-weight:bold">记忆写入：自动化 vs 显式写入</span></p>

<p id="f-doxcnzbU9b9zF1jxc1rC8c2tuWc"><span>Claude Code 做了重度的写入自动化——三个后台 Agent 分工：extractMemories 每轮结束后自动提取持久记忆，Session Memory 持续维护会话笔记，AutoDream 定期整合去重。用户不需要主动"存档"，系统自动帮你把重要信息沉淀下来。</span></p>

<p id="f-doxcn8llV5fZlocw4MtzMW49H2c"><span>OpenClaw 更依赖显式写入。它的文档反复强调一个常见失误：</span><span style="font-style:italic">聊天中说的指令不会自动保存到文件——不写入文件就会被压缩丢掉</span><span>。作为补偿，OpenClaw 在压缩前有一个 </span><span style="font-weight:bold">Pre-Compaction Memory Flush</span><span>——静默提醒 Agent 把重要内容写入记忆文件。但这本质上是"事到临头才保存"，而 Claude Code 是"一直在保存"。</span></p>

<p id="f-doxcnXqFn2DV4bRvOMZBi3daakb"><span style="font-weight:bold">记忆加载：Push vs Pull</span></p>

<p id="f-doxcn0iZFg9r8o1IQfFwPy4pPAR"><span>Claude Code 是</span><span style="font-weight:bold">系统层面硬编码</span><span>的 push 模式——每轮对话前，系统必定用 Sonnet（轻量小模型）扫一遍所有记忆文件的标题和描述，挑出最相关的几条，直接塞进上下文。主模型开始思考时，相关记忆已经摆在眼前了，不需要它主动去找。类比：</span><span style="font-weight:bold">秘书在你开会前，把相关资料提前放在桌上</span><span>。代价是每轮都要占固定的上下文空间，不管用不用得上。</span></p>

<p id="f-doxcnM0XwOH2blLT72mQ4XIPaWg"><span>OpenClaw 是 pull 模式——系统不会提前塞记忆，而是把 </span><span><span><span>memory_search</span></span></span><span> 作为一个普通工具暴露给模型。模型在推理过程中自己判断"这轮要不要查记忆"，跟它决定要不要调 bash、要不要读文件是一样的逻辑。更灵活省空间，但风险在于</span><span style="font-weight:bold">模型不知道自己不知道什么</span><span>——比如你上周说过"我讨厌用 forEach"，这条记忆存在文件里了，但今天聊到循环时模型可能根本没想到要去搜"用户的代码风格偏好"，就直接写了 forEach。Push 模式下这条记忆会被小模型提前捞出来，就不会犯这个错。</span></p>

<p id="f-doxcnSvouDoaf5kbTLuZzeitLSb"><span style="font-weight:bold">设计哲学总结</span></p>

<p id="f-doxcn5SoYbITQrY1gfx967lau5e"><span>Claude Code 走的是</span><span style="font-weight:bold">工程优化路线</span><span>：梯度压缩能省则省、后台 Agent 自动写入、小模型做筛选降低成本——处处体现"怎么用更少的 token 做更多的事"。OpenClaw 走的是</span><span style="font-weight:bold">架构清晰路线</span><span>：四层对标计算机存储层次（硬盘→日志→内存→搜索引擎），每层职责明确，系统更易理解和调试。面试时两者结合讲，既能展示工程优化思维，又能体现架构设计能力。</span></p>

<a id="f-doxcnbRDv9bCK6SZzNQMLA6pFQd"></a>

###### 讲解视频

<p id="f-doxcnZg1FYGW7W0mij8UzJNw9wg"><span>ClaudeCode记忆模块保姆级教学。这个视频讲了整个4.4.3小节，注意对于四层记忆这里，视频讲到memdir这一层是用来恢复上下文的，这里视频讲的不对，请大家谅解，文档已经更正过来了。</span></p>

<p id="f-doxcnGE8pCL2JJwo6nw2KkEjRcd"><span><span><a href="https://www.bilibili.com/video/BV1UHQhBFEJx/?vd_source=144bec9c3f54e465073138bed788be1b"><span>https://www.bilibili.com/video/BV1UHQhBFEJx/?vd_source=144bec9c3f54e465073138bed788be1b</span></a></span></span></p>

<p id="f-doxcnAR0c3r7og3ceFvR5qZk1NC"><span>这个视频是对于虾皮面试内容的讲解。里面有很大一部分是结合了CC的四层记忆讲解的真题，关于memdir的部分，该视频讲解的也是正确的。可以结合参考。</span></p>

<p id="f-doxcn1fTQSQQdlz4ZRBIAiPRh5f"><span><span><a href="https://www.bilibili.com/video/BV1BkVk6DEx3/?spm_id_from=333.1387.homepage.video_card.click&amp;vd_source=144bec9c3f54e465073138bed788be1b"><span>https://www.bilibili.com/video/BV1BkVk6DEx3/?spm_id_from=333.1387.homepage.video_card.click&amp;vd_source=144bec9c3f54e465073138bed788be1b</span></a></span></span></p>

<a id="f-doxcncVDzvvk15hgcjyIhcI9RAc"></a>

###### 相关面试真题

<a id="f-doxcnKGgwJKh6cnNhppX5rX85Cb"></a>

###### 如何避免记忆越写越脏？

<blockquote id="f-doxcnckEqi943pEoDaFMVQAJgdc"><p id="f-doxcnQMcWVsrzvlK60pNE3cjyWh"><span>可以从CC的Autodream机制来回答。</span></p></blockquote>

<p id="f-doxcn93O6bCrgzjK9fP67f8Y2gd"><span>参考自</span><span><span><a href="/posts/agent-learning-24-interview-review/#f-doxcnEzp8GDSc3cwzZgNbPWBXDd"><span>：202604 腾讯AI Agent暑期实习面经。</span></a></span></span><span>本题答案也整理在了里面。</span></p>

<a id="f-doxcn0IwwTzs4bJc6ervFkJYCjd"></a>

###### 如果ClaudeCode会话压缩了以后，可以拿到历史记录吗？

<blockquote id="f-doxcny3R78njjQfc5fg8r9BNirh"><p id="f-doxcnhH2cFUpnFSMGW2wnhz34ig"><span>这里的一个重点是理解ClaudeCode的存储是分成两层的： </span><span><span><a href="#f-doxcnZyYi3qZeDcs3PxDGXtNmse"><span>4.4.3.1四层记忆</span></a></span></span><span> 和 4.4.3.2 </span><span><span><a href="#f-doxcnz9gUphuvG9cU5ce7oTqgGb"><span>会话账本</span></a></span></span><span>。 </span></p></blockquote>

<p id="f-doxcnE731u00hbUSIzFawkEwEuf"><span>压缩后，模型默认看不到完整旧历史，只看到压缩摘要；但完整历史没有被删，仍在本地 Transcript JSONL 里，必要时可以再读。模型一般不会自动从账本里检索历史，除非明确需要并主动读取，它主要会从Memdir这一层级来检索一些长期记忆，比如用户的风格，身份。会话账本主要负责</span><span style="font-weight:bold">持久化和重建</span></p>

<p id="f-doxcnmgnhrb5ZhHtGmdLeV7Jtjh"><span>该面试题选自  </span><span><span><a href="/posts/agent-learning-24-interview-review/#f-doxcnRnCE6nbvTaHent4MycJ8MT"><span>虾皮2026暑期实习面试</span></a></span></span></p>

<a id="f-doxcnmon4aaEkAfWxr5blBwsSJf"></a>

###### 你的项目是如何重建你的会话的？

<blockquote id="f-doxcnGAHrNK3u7nyzBSCVbkVdPd"><p id="f-doxcnQs7U3gBQxrjC1rCY38BXre"><span>参考</span><span><span><a href="#f-doxcnz9gUphuvG9cU5ce7oTqgGb"><span> 4.4.3.2 Transcript会话账本</span></a></span></span></p></blockquote>

<p id="f-doxcnxw6hB0bMNC524f2qBcY5jh"><span>我的系统中存在一个会话账本，在 query loop 里收到新的用户消息、助手消息、工具结果或 compact boundary 后，会调用把这些内容写入其中。</span></p>

<p id="f-doxcnCKJgerNCxEcc5YrPyk5zPd"><span>当需要重建会话时，系统会读取之前的 Transcript 会话账本，把用户消息、模型回复、工具结果、压缩边界和相关状态重新整理成可继续对话的上下文。这样用户下次打开同一个会话时，系统不需要从零开始，而是能知道之前聊到哪里、做过什么、哪些工具已经返回过结果、当前任务处在什么阶段。</span></p>

<p id="f-doxcnoI3qm1AVYbB88viasfzUTf"><span>该面试题选自  </span><span><span><a href="/posts/agent-learning-24-interview-review/#f-doxcnRnCE6nbvTaHent4MycJ8MT"><span>虾皮2026暑期实习面试</span></a></span></span></p>

<a id="f-doxcnbsQ43KxsAGLJsbEzcIsm1b"></a>

###### 你的项目长短期记忆是如何存的？

<blockquote id="f-doxcnp5ZrbpqXMKOy037WATq9Vg"><p id="f-doxcnBHBgg02UUhq2nmDWRk7J5c"><span>假装该学习案例是CC,现场根据CC的记忆模块包装。</span></p></blockquote>

<p id="f-doxcnthAthcbOUvVo7OGrCbgQHc"><span>该学习案例的</span><span style="font-weight:bold">短期记忆</span><span>，只是保存在内存中的，不需要存储成文件。</span></p>

<p id="f-doxcnaqN5kG9kxjZYM5E5cZTOZe"><span style="font-weight:bold">长期记忆</span><span>主要是</span><span style="font-weight:bold">以Markdown形式存储</span><span>。首先一份文件存储用户定义的指令性规则（灵感来源Claude.md)。另一份文件会存储长期记忆，包括用户</span><span style="font-weight:bold">画像，风格等对话中提取的需要持久化的信息</span><span>。会存一份索引文件（Memory.md），和对应的记忆文件，每次AI先加载索引文件，需要使用对应的记忆时，再根据索引文件找到原文进行拼接。</span></p>

<p id="f-doxcnjRCgMVvXAs0IRpjGivohig"><span style="font-weight:bold">同时还会</span><span>存储一份JSONL文件，保留着整个会话的历史，用于对话恢复，重建，节点回退。</span></p>

<p id="f-doxcnEQOAgoo8km538DgOCAixbd"><span>该面试题选自  </span><span><span><a href="/posts/agent-learning-24-interview-review/#f-doxcnRnCE6nbvTaHent4MycJ8MT"><span>虾皮2026暑期实习面试</span></a></span></span></p>

<a id="f-doxcnxVPEaPquvcjbZDA867l3hc"></a>

###### 你的项目长期记忆存哪些东西？

<blockquote id="f-doxcnflR7fcDxJzkmiavyY0FjEZ"><p id="f-doxcnRGtMsgxwoMU6JNVc5pZ4Lg"><span>假装该学习案例是CC,现场根据CC的记忆模块包装。基本项目写了都会有记忆功能。可以用来回答你的项目长期记忆存什么？以及理论知识：长期项目应该存什么？</span></p></blockquote>

<p id="f-doxcnsCpoPBtmHM5hdB52mCB6kg"><span>在设计上，该学习案例在长期记忆里会明确过滤并</span><span style="font-weight:bold">排除</span><span>那</span><span style="font-weight:bold">些可以通过代码、Git 历史或直接检索就能推导出的内容</span><span>（如底层代码模式、具体架构细节等，避免污染）。我们只持久化存储无法从当前项目状态直接推导出的</span><span style="font-weight:bold">四类核心高价值信息：</span></p>

<ul><li id="f-doxcnyjLq6Kj1isq1WnOEDPAKUe"><span style="font-weight:bold">用户画像</span><span>：存储用户的背景、角色与专业领域（如 “深度 Go 专家但 React 新手”），以便未来的协作和解答深度能精准匹配其认知模型。</span></li></ul>

<ul><li id="f-doxcnlf7Fk5N7Ebku0I4GBSukbf"><span style="font-weight:bold">交互反馈 ：</span><span>记录用户明确给出的行为偏好或成功路径确认（如 “不要 Mock 数据库，使用真实 DB”）。这不仅能避免模型未来犯同样的错误，同时能固定已被验证的最佳实践，防止模型行为漂移。</span></li></ul>

<ul><li id="f-doxcnhHBYIE8YfzJBiQLNXE4EWf"><span style="font-weight:bold">项目动态</span><span> ：记录正在进行的工作目标、决策缘由或非技术性约束（如 “因法律合规审计而重构 Auth 模块”），确保大模型在提出建议时具备对齐现实背景的上下文。</span></li></ul>

<ul><li id="f-doxcnF4ZgQ8n5pZvMrqWTgduIng"><span style="font-weight:bold">外部索引</span><span>：记录关联外部系统的定位指针与用途说明（如 Linear 缺陷追踪看板、Slack 协作频道或故障排查的 Grafana 监控面板），实现跨系统的高效协同寻址。</span></li></ul>

<p id="f-doxcnYsnkei15pI78haH8jlyV2c"><span>该面试题选自</span><span><span><a href="/posts/agent-learning-24-interview-review/#f-doxcn1TOxu3HeFWCmG0itNoXm0e"><span> 安克2026暑期实习面试</span></a></span></span></p>

<a id="f-doxcnRiRIxWYcqjI3m3AIUGy6eh"></a>

###### 你的项目压缩是怎么做的/ClaudeCode的压缩机制是怎么做的？

<blockquote id="f-doxcnuW5Rdop9RokbEkr09qZCze"><p id="f-doxcnXGPXEKqwqpwA9Qirkvp2Mb"><span>在 </span><span><span><a href="/posts/agent-learning-24-interview-review/#f-doxcnRnCE6nbvTaHent4MycJ8MT"><span>虾皮2026暑期实习面试</span></a></span></span><span> 和 </span><span><span><a href="/posts/agent-learning-24-interview-review/#f-doxcn1TOxu3HeFWCmG0itNoXm0e"><span>安克2026暑期实习面试</span></a></span></span><span> 都有讨论如何做的压缩，是同步还是异步的？这里背景都是同学项目设计了压缩，和面试官讨论。最后讨论都没讨论清楚。我想说的还是，你要么借鉴CC，纯用它的理论复用，要么在他之上做设计，取长补短，但一定想清楚细节。 我也专门重构了CC压缩的笔记，专门说明CC的压缩是同步异步的？</span></p></blockquote>

<p id="f-doxcnFWRM3auz0tfkPJQoczgZLc"><span>在设计上，该学习案例参考了 Claude Code 的实践，设计了一套</span><span style="font-weight:bold">由弱到强、四层渐进式的压缩流水线</span><span>。在每轮交互前，系统会按需依次检测并执行。项目里面</span><span style="font-weight:bold">压缩组装与替换行为必须是同步阻塞的</span><span>；但</span><span style="font-weight:bold">中间高开销的摘要提炼大量依赖后台异步的提前筹备，从而形成“异步准备、同步应用”的混合模式。</span></p>

<p id="f-doxcnRKswenWPIS8hYUXhffEkoc"><span>具体四层压缩管理策略如下：</span></p>

<ul><li id="f-doxcnS7Z9QQWpdr3xmn3z3A47Bc"><span style="font-weight:bold">第一层：Snip 裁剪（同步执行）</span></li></ul>

<div id="f-doxcnb8tdZmQrZ51RHeeCs06Z69" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>触发与原理：最轻量的工具结果清理，不调用 LLM（成本接近 0）。当内部裁剪策略达到触发条件时，系统同步将历史对话中的旧工具调用结果（如 Read、Grep、 Bash 的冗余输出）替换为简短标签（如 [Old tool result content cleared]），保留消息结构和关联关系。用户无法通过提示词精准指定删除某条工具结果</span></div></div>

<ul><li id="f-doxcn2Jxs7WRPISf3YWok5KcXmf"><span style="font-weight:bold">第二层：MicroCompact 微压缩（同步执行）</span></li></ul>

<div id="f-doxcndep6MPrjWn3gE7803ceYQc" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>触发与原理：</span><span style="font-weight:bold">基于时间周期自动触发。当检测到距离上一次交互的时间间隔超过预设阈值</span><span>（意味着服务侧的 Prompt 缓存已过期，大段重写势必无法避免），系统会在发送新请求前，同步根据工具白名单，清除更早期的工具执行结果以减小重写和网络开销。</span></div></div>

<ul><li id="f-doxcn8SfCp0TsDbVr9pF0ZMRj9f"><span style="font-weight:bold">第三层：Collapse 折叠（混合模式）</span></li></ul>

<div id="f-doxcnNJZsc27cAFJOohVMnYA7vh" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>触发与原理：上下文重构级中等压缩，</span><span style="font-weight:bold">在上下文压力达到 90% 时开始 commit。</span></div></div>

<div id="f-doxcnXt4ChA3BJhNK7mhSdqwikd" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>混合特性：它是典型的混合机制。高风险和变动不频繁的历史片段会提前派遣专门的子 Agent 在后台异步提炼出局部摘要（Summary）。而在真正发起 API 请求前，系统同步应用折叠视图，替换原始历史：</span><span><span><span>A B &lt;collapsed summary of C-D&gt; E F</span></span></span><span>。</span></div></div>

<ul><li id="f-doxcnNLbEqiF7zETKwz4KSeQy3g"><span style="font-weight:bold">第四层：AutoCompact 自动压缩（同步阻塞 + 异步后台辅助）</span></li></ul>

<div id="f-doxcnYzopltj4pDiYS7FgcoJzFj" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>触发与原理：最底层的强力兜底机制，</span><span style="font-weight:bold">通常在上下文使用率达到 93% 临界点或遇到 API 溢出报错时触发</span><span>。包含由浅入深的两套策略：</span></div></div>

<div style="margin-left:25px"><div id="f-doxcndHJDOC1sJdiuwPkqFRMwV3" style="display:flex;gap:0.5em"><span style="min-width:1.5em">i.</span><div><span>Session Memory Compact（轻量，零 LLM 成本）：首选方案。直接利用后台通过子代理异步持续提炼生成好的会话状态卡片文件（Session Memory）作为摘要，仅保留最近 15KTokens 左右的原文。</span></div></div><div id="f-doxcnSvRa4zqyM34O8MNg6FfkLh" style="display:flex;gap:0.5em"><span style="min-width:1.5em">ii.</span><div><span>Full LLM Compact（重量，调用 LLM）：若上一方案失效，则同步调用 LLM 将全部历史重构为包含“核心请求、待办事项、问题解决过程等”9 个核心维度的极致结构化摘要。</span></div></div></div>

<div id="f-doxcnrd2Ttj5ZW2ohZZ1cdSPCYe" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>重平衡机制：压缩完成后，为防模型历史空白，系统会从 </span><span><span><span>readFileState</span></span></span><span> 缓存中按最近访问时间提取前 5 个操作过的文件，同步重新读取最新的物理内容注入上下文（文件上下文自动恢复机制）。</span></div></div>

<div id="f-doxcn4dRYbEeUXkYG8snEL3nAnh" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>防御机制：提供断路器，限制连续 AutoCompact 失败达到 3 次时触发熔断，拒绝对同一个死循环节点重复产生无意义的 API 账单开销。</span></div></div>

<blockquote id="f-doxcn9wPWP06e0w5tKO6fXMC6Kd"><p id="f-doxcnDeKSX2b0GlLy5qmcfZoLAg"><span>⚠ 这个是CC的压缩策略，我在笔记：</span><span><span><a href="#f-doxcnjEqJDzh6o9CxLjjJaslxxh"><span>我的Agent要做这么复杂吗？</span></a></span></span><span> 写了，如果你自己设计压缩策略，哪些要保留，哪些可以删除。如果问题是你的项目怎么的压缩，可以在此问题答案上适当简化。</span></p>
</blockquote>

<p id="f-doxcngiCG1xXsI4DJk4bZe0rdTh"><span>该面试题选自</span><span><span><a href="/posts/agent-learning-24-interview-review/#f-doxcn1TOxu3HeFWCmG0itNoXm0e"><span> 安克2026暑期实习面试</span></a></span></span></p>

<a id="f-doxcnybFiAwj4fpSCQbaYFby0Db"></a>

##### Agent架构

<p id="f-doxcnqGWt8cOf332UgSaJY1Qxld"><span>本节分析 Claude Code 的 </span><span style="font-weight:bold">Agent 架构设计</span><span>：它采</span><span style="font-weight:bold">用了什么架构</span><span>、</span><span style="font-weight:bold">为什么选择这个架构</span><span>、</span><span style="font-weight:bold">具体是怎么运行的</span><span>、</span><span style="font-weight:bold">Agent 之间如何通信. </span><span>分析了以后其实发现Claude Code很简单，看这个图，简单地说：用户输入 -组装提示词，然后就是由主Agent一直循环，判断是否调用工具，工具又分两种类型：一种是普通工具，另一种是子Agent/Agent Team.</span></p>

<p id="f-doxcnvHrwlH0XhkN4roi2FI8Wyh"><span>同时，本节会结合之前笔记的理论部分，</span><span><span><a href="/posts/agent-learning-11-multi-agent/#f-doxcntuQVjJ2aMEP4HF4qje1X9b"><span>Agent架构</span></a></span></span><span>，</span><span><span><a href="/posts/agent-learning-11-multi-agent/#f-doxcn1TzNz7iComMwOzkhLkwQ9d"><span>Agent通信</span></a></span></span><span>，面试真题来讲解。你会发现如果你笔记前面的很多内容你学了，学到这个架构上，他们是彼此呼应的。所以推荐从理论到实践，先把本节中的Agent八股，基础知识推荐的资料看好了，再看这些成熟架构的解析，会容易一些。我们下面谈到的中Agent架构的专有名词，通信方式，其实就是在上面的理论部分出现的。建议先去学理论部分，学完再看这里，也刚好知道了理论在实践中是如何被用的。</span></p>

<p id="f-doxcnAtlysNsdrgt7U4ytzmmGAf"><span>ClaudeCode 的Agent架构有两种形态：</span><span style="font-weight:bold">SubAgent</span><span>和</span><span style="font-weight:bold">AgentTeam</span><span>. SubAgent对应我们</span><span><span><a href="/posts/agent-learning-11-multi-agent/#f-doxcntuQVjJ2aMEP4HF4qje1X9b"><span>Agent架构</span></a></span></span><span> 部分的</span><span style="font-weight:bold">中心化</span><span>，</span><span style="font-weight:bold">AgentTeam </span><span>对应这里的</span><span style="font-weight:bold">去中心化</span><span>。他们的通信方式也是不同的。结合这里，我们刚好更深入理解，这两种架构的特点，如何实现，以及不同的通信方式。</span></p>

<div id="f-doxcnkMXKh2EzC8OgY7qN9UDgEh"><img alt="" decoding="async" height="853" loading="lazy" src="/images/agent-learning/82e31e3d728abf94ed1473ea.png" width="1280"/></div>

<p id="f-doxcnBgmWqRO1GJQZpw5PLhxNtg"><span>注意，这里的架构，我们叫Agent架构，区别于4.4.2 的整体架构。你应该清楚的一点是，这里处于笔记4.4.2</span><span><span><a href="#f-doxcnCGAQTKNcEJX03AF0Kc7eNg"><span>整体架构</span></a></span></span><span>的哪一个环（处于整体架构React范式里，调用工具这一块的具体细节）。我们把这里叫做Agent架构，因为这里是整个系统涉及的</span><span style="font-weight:bold">Agent部分的核心。</span></p>

<p id="f-doxcna0A3F0NvfFCgkKjcKcxW5e"><span>本节是从源代码，Agent面试岗位层面来理解SubAgent和AgentTeam，要从使用层面理解，可以看</span><span><span><a href="/posts/agent-learning-19-ai-coding/#f-doxcnqqW62UiLRSxdDj4j8hF5ob"><span>这里</span></a></span></span></p>

<a id="f-doxcndTL7bGkRdZt8cuw0WDOFWb"></a>

###### 运行机制

<p id="f-doxcnefmyq9pJWKp9An5vzIL8od"><span style="font-weight:bold">宏观全景</span></p>

<p id="f-doxcngIOlUXwX3OIEe3X4IqGQBb"><span>ClaudeCode 整个系统只有</span><span style="font-weight:bold">一个 Query Loop 加一组工具</span><span>——没有任务编排器、没有状态机、没有硬编码的多步流程。把所有的 Agent / SubAgent / AgentTeam 全都剥开，里面跑的都是同一个东西：</span></p>

<pre id="f-doxcnbw3K5w2DA3V7YeRR539fxd"><code>用户输入
  ↓
组装 System Prompt（CLAUDE.md + 记忆 + 工具定义 + 权限规则）
  ↓
┌──→ 调用 LLM API
│      ↓
│    模型返回：
│      ├─ 纯文本 → 输出给用户，循环结束
│      │
│      └─ 工具调用（模型自主选择）
│           │
│           ├─ Bash / Read / Write / Grep / Glob ...   ← 普通工具：直接执行
│           │    │
│           │    └→ 返回结果追加到上下文
│           │
│           └─ Agent 工具（也只是普通工具之一）         ← 特殊之处：结果来自另一个循环
│                │
│                ├→ 派生子代理（SubAgent / Teammate）
│                │     │
│                │     └→ 子代理启动自己的 Query Loop  ←── 递归：内核完全相同
│                │          ├─ 调用 LLM API
│                │          ├─ 调用普通工具
│                │          └─ 输出最终文本 / 持续通信
│                │
│                └→ 子代理的输出作为这次工具调用的返回值
│
└──── 带着工具结果继续问模型（无论结果来自普通工具还是子代理）</code></pre>

<p id="f-doxcnhWtmjZrzhPBenIBOBF8Crc"><span style="font-weight:bold">核心洞察：子代理不是独立系统，只是某个工具的内部实现</span></p>

<p id="f-doxcn1GclO3iaO0A5xN0oNNDfqd"><span>这套架构最精妙的地方在于：</span><span style="font-weight:bold">子代理不是一个独立的子系统，它只是 "Agent 工具" 的内部实现</span><span>。主 Agent 的 Query Loop 调用 Agent 工具的方式，和它调用 Bash、Read 工具的方式</span><span style="font-weight:bold">完全一样</span><span>：发一个输入、等一个返回值。</span></p>

<p id="f-doxcn7YtLa5N4X8Fo4KI80IMrOc"><span>唯一的区别是——</span></p>

<ul><li id="f-doxcnyp1gTEsbUkn4H0RuzF4LMd"><span style="font-weight:bold">Bash 工具</span><span>内部跑的是一条 shell 命令；</span></li></ul>

<ul><li id="f-doxcn0MuaS2hRfcR9lAPJFE20Ie"><span style="font-weight:bold">Agent 工具</span><span>内部跑的是另一个完整的 Query Loop。</span></li></ul>

<p id="f-doxcnjDvptJtDttl3pwXScrAHZc"><span>对主 Agent 来说，这只是一次工具调用——它不关心子代理内部执行了多少步、调了什么工具、推理了多久，它只看到最终返回的那段文本。这也正是为什么 SubAgent 和 AgentTeam 在主 Agent 眼里没有本质区别：</span><span style="font-weight:bold">它们都是同一个 Agent 工具不同参数下的产物</span><span>，只是参数不同导致内部跑出来的东西寿命、通信能力不同而已。</span></p>

<p id="f-doxcnC2h2sJLoelh3KHuAX9souh"><span style="font-weight:bold">模型自主决策，没有编排</span></p>

<p id="f-doxcnIK3dCvkDCmodnh0c1Eww1g"><span>模型自己决定调用什么工具、调用几次、什么时候停止。代码里</span><span style="font-weight:bold">没有硬编码的步骤编排</span><span>——不存在"第一步搜索、第二步修改、第三步测试"这种预设流程。Boris 的原话是：</span></p>

<blockquote id="f-doxcnTVjB4b49fJGNVm8EHcDozc"><p id="f-doxcnVdaYk4X2GSDyyo0lxVbQEb"><span>"模型就是想用工具。你给它一个工具，它就会搞清楚怎么用它来达成目标。"</span></p></blockquote>

<p id="f-doxcnZFcHLTFDuHNrI5F1p7kgAd"><span>打开 </span><span><span><span>src/query.ts</span></span></span><span>，核心是 </span><span><span><span>queryLoop()</span></span></span><span> 函数（约第 241 行附近），它的控制流极其简单：</span></p>

<pre id="f-doxcnqcybhREZEaCK5n2AfBXd7g"><code>while (true) {
    1. 把当前消息发给模型 → 拿到模型的回复
    2. 检查回复里有没有 tool_use block
       - 有 → 执行这些工具 → 把工具结果拼回消息 → continue（回到第 1 步）
       - 没有 → break，循环结束
}</code></pre>

<p id="f-doxcn2JJlAqoyHOEvCblbscTsNI"><span>就这么多。注意这里</span><span style="font-weight:bold">没有任何 if-else 判断"应该调什么工具"</span><span>——没有"如果用户问代码就调 Read"、"如果要搜索就调 Grep"这种路由逻辑。这些在传统 Agent 框架里需要开发者手写的策略代码，在 ClaudeCode 里根本不存在。Query Loop 的角色仅仅是一个</span><span style="font-weight:bold">执行器</span><span>：模型说调工具就调，模型说停就停，它本身不参与任何决策。</span></p>

<p id="f-doxcnYECYzHroHFm1ZApSQyNYEg"><span>子代理的调用也是同理——Query Loop 不会判断"这个任务该不该派子代理"。模型在回复中输出一个 Agent 工具的 </span><span><span><span>tool_use</span></span></span><span> block，Query Loop 就像执行任何其他工具一样执行它。对 loop 来说，</span><span style="font-weight:bold">派子代理和读文件没有区别</span><span>，都只是一次工具调用。而子代理内部又启动了自己的 Query Loop——同样的 </span><span><span><span>while(true)</span></span></span><span>、同样由模型自主决定调什么、什么时候停。这就是 </span><span style="font-weight:bold">Agent 调 Agent 的递归本质</span><span>：每一层都是同一个循环结构，只是上下文与可用工具集不同。</span></p>

<p id="f-doxcnRwBIsdnRbdwiX3H0sKbjVb"><span style="font-weight:bold">既然没有编排，决策力全靠提示词</span></p>

<p id="f-doxcnF726M4Ujs7l8sdB5nY62yf"><span>这套"零编排"架构的代价 / 也是它的设计哲学是：</span><span style="font-weight:bold">所有的决策力都必须从提示词里来</span><span>。模型怎么知道什么时候该派 SubAgent、什么时候该建 AgentTeam、什么时候自己干就行？答案是：</span></p>

<ul><li id="f-doxcnmbtPn6cgcTKeWaTHVEOXZ5"><span style="font-weight:bold">工具的 </span><span style="font-weight:bold"><span><span>description</span></span></span><span>：告诉模型"我是干什么的、什么时候用我"；</span></li></ul>

<ul><li id="f-doxcnkgirA9NobsPOFjpRI8fp68"><span style="font-weight:bold">System Prompt 中的指南</span><span>：告诉模型整体的工作风格、协作规范；</span></li></ul>

<ul><li id="f-doxcnk6vkFM7HiuL5BeZnVkNwlb"><span style="font-weight:bold">CLAUDE.md / 项目记忆</span><span>：告诉模型项目的特定约定。</span></li></ul>

<p id="f-doxcn2JRJPMUpAVfoUp7dslmAke"><span>因为本质上 Agent 工具就是一个普通工具，模型决定要不要调它、传什么参数，靠的就是它的 </span><span><span><span>description</span></span></span><span> 和当下的上下文判断——和它决定要不要调 Bash 是同一套机制。</span><span style="font-weight:bold">所以 SubAgent / AgentTeam 谁来、什么时候来，不是代码控制的，是 prompt 设计出来的。</span><span> 这个观点很重要，后面 4.4.4.2 与 4.4.4.3 讲两种拓扑时，会反复看到"通过 prompt 约束行为"这条线索。</span></p>

<a id="f-doxcn2ZnosYf5vkdrhmOvZNxCvc"></a>

###### SubAgent - 中心化架构

<p id="f-doxcnbyh5g3hFaYA6mNNW8TZJfc"><span>ClaudeCode 的 SubAgent 模式采用的是 </span><span style="font-weight:bold">中心化架构</span><span>——准确地说，是一种 </span><span style="font-weight:bold">星型拓扑</span><span>：一个主 Agent 居中，所有子代理围绕它呈辐射状分布，信息只在主 Agent 与子代理之间流动，</span><span style="font-weight:bold">子代理之间没有任何直接连接</span><span>。</span></p>

<p id="f-doxcnn0dbvGFmz5cKrpkGDJn6ue"><span>这里的"主 Agent"其实就是 ClaudeCode 里跟你对话的那个 Agent。它通过工具调用的方式派生出多个子代理，每个子代理拥有自己的上下文、模型与工具集，独立处理被分派到的任务。任务完成后，子代理把结果回传给主 Agent，然后即被销毁。</span></p>

<p id="f-doxcnYCSJRHc47iteeUsv0B3o9d"><span>这个模式的特点是：</span></p>

<div style="margin-left:25px"><div id="f-doxcnjfAYNJPqOOa3p6x0Dt1Jkc" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">主 Agent 是唯一枢纽</span><span>：所有调度、汇总、与用户的对话都由主 Agent 完成，子代理只对主 Agent 负责。</span></div></div><div id="f-doxcnVoY59jEIIVQ1P52UCXvBSg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">子代理之间不通信</span><span>：任何跨子代理的协调，都必须经过主 Agent 中转，没有横向连接。</span></div></div><div id="f-doxcnlkN3MFJEYUpA16t5G5mz0d" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">一次性、无状态</span><span>：子代理"被唤醒 → 干活 → 回传 summary → 销毁"，不跨轮次驻留，主 Agent 拿到的只是精炼后的结果，不会被中间过程污染。</span></div></div><div id="f-doxcnFx6MINRWiMJIWmlgQPTCIe" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">上下文隔离</span><span>：每个子代理拥有独立上下文窗口，可以放心去读大量文件、跑大量搜索而不污染主对话。</span></div></div><div id="f-doxcnI2hHZ36wpmQLUA8VJn6SBh" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">安全与审计简单</span><span>：单一信息枢纽意味着单一审计点，权限边界、工具限制都好控制。</span></div></div><div id="f-doxcnDjLV7IZfmJZ7ZtqykqDrXb" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">代价</span><span>：拓扑越简单，越难表达"</span><span style="font-weight:bold">长期协作</span><span>""</span><span style="font-weight:bold">互相质疑</span><span>""</span><span style="font-weight:bold">并行讨论</span><span>"这类需要成员对话的场景——所有协作都要在主 Agent 这里"绕一圈"。</span></div></div></div>

<pre id="f-doxcnYPAqME2ZWwUV8EAj60j0b8"><code>                    ┌─────────┐
                    │  用户    │
                    └────┬────┘
                         ↕
                  ┌──────┴──────┐
                  │  主 Agent   │ ← 你的ClaudeCode主对话Agent
                  │ (Query Loop)│
                  └──┬───┬───┬──┘
                    ↗    ↑    ↖
                  ↙      ↓      ↘
            ┌────┴──┐ ┌──┴───┐ ┌──┴────┐
            │子代理A │ │子代理B│ │子代理C │
            └───────┘ └──────┘ └───────┘
                  ✗ 互不通信 ✗</code></pre>

<blockquote id="f-doxcnlS5b8qTw55xafNGjbMmKEb"><p id="f-doxcnacRm14WpeknfYA1QLrs1F9"><span>铛铛铛，如果你想进阶学习Subagent的东西，可以看这个电子书的</span><span><span><a href="https://lintsinghua.github.io/#ch09"><span>这一章</span></a></span></span><span>。给大家画一下重点，如果你想了解：</span></p>
<p id="f-doxcnWiThYZuYPzwGHMDldbX1lg"><span>1. SubAgent是如何实现的，数据结构是啥，怎么产生的(使用Fork方式）。</span></p>
<p id="f-doxcnCYDpTOYRdbrS8UdF6PEtLq"><span>2. Fork的具体好处（Prompt Cache减少开销）</span></p>
<p id="f-doxcndiPJPiKyTDEvFA7AgwqMUe"><span>3. SubAgent如何运行，何时中止，它内部的AgentLoop是什么？</span></p>
<p id="f-doxcnis3lYGWC3YdN0veMo8ZZFf"><span>4. SubAgent的权限系统，可以用哪些工具。 可以看这个链接。</span></p>
<p id="f-doxcnHOa7DgIhe3jz29jzgZzR69"><span>我没有总结得无限深入。</span></p></blockquote>

<a id="f-doxcn2MadQs64wqkOGVr3GlQz6g"></a>

###### AgentTeam — 去中心化网状拓扑

<p id="f-doxcnu7k1CAwc2S9LYnEhVFMwcb"><span>与 SubAgent 的星型模式不同，AgentTeam 采用的是 </span><span style="font-weight:bold">去中心化架构</span><span>——更准确地说，是一种 </span><span style="font-weight:bold">网状拓扑</span><span>：团队中的每个 Agent 都是对等成员（peer），既可以独立工作，也可以</span><span style="font-weight:bold">直接</span><span>与任意其他成员交换信息，不必经过一个"中央调度者"中转。</span></p>

<p id="f-doxcnAVMLAwawJWwVaH3ORbGeGc"><span>这里没有"主 Agent"这个唯一的信息枢纽。原本的对话 Agent 在 AgentTeam 模式下退化为 </span><span style="font-weight:bold">Team Lead</span><span>——它仍然负责接收用户输入、做总体规划，但</span><span style="font-weight:bold">不再垄断通信路径</span><span>：成员之间可以绕过它彼此对话、彼此分派、彼此挑战。</span></p>

<p id="f-doxcnWKVcmCHOMbmG6NIQ99Mdqc"><span>这个模式的特点是：</span></p>

<div style="margin-left:25px"><div id="f-doxcnOaHSF0bj1kdhlEvWqllcEd" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">成员对等</span><span>：每个 Agent 是长期驻留的独立实体，拥有自己的上下文、模型与工具集，生命周期跨越多个轮次，不像 SubAgent 那样"一次性唤醒、用完即销毁"。</span></div></div><div id="f-doxcn2jemGgl9XlOyt62LVc90Df" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">横向通信存在</span><span>：成员之间可以</span><span style="font-weight:bold">点对点直发</span><span>（A → B）、也可以</span><span style="font-weight:bold">广播</span><span>（A → 全员），无需 Team Lead 转手。具体通信机制（邮箱 / 消息工具 / 共享任务表等）在后续小节专门展开，此处不细说。</span></div></div><div id="f-doxcnukT2wmt21w6HPaHIOz5nYf" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">共享态势</span><span>：团队通常持有一份共享的任务列表（TaskList），让每个成员实时掌握整体进度与彼此的待办，避免重复劳动与盲区。</span></div></div><div id="f-doxcnrfmZ9FIxOPJM7tb1vMd9Wo" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">协作模式更丰富</span><span>：因为成员能互相对话，可以自然演化出"竞争假设""并行审查""模块归属""方案审批 / 魔鬼代言人"等多种协作范式，而不只是 SubAgent 那种"主 Agent 派活 → 子 Agent 干活 → 回传 summary"的单向流水。</span></div></div><div id="f-doxcn6hL15vzHwAHhRxXHhMLUPe" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">代价</span><span>：拓扑越自由，协调成本与审计复杂度越高——需要显式的消息协议、锁与可见性约束来防止信息错位；这也是后续通信章节要重点讨论的内容。</span></div></div></div>

<pre id="f-doxcnvLVDBpz6BKOCv0K9WbHSXP"><code>                    ┌─────────┐
                    │  用户    │
                    └────┬────┘
                         ↕
                  ┌──────┴──────┐
                  │ Team Lead   │  ← 你的ClaudeCode主对话Agent
                  │ (规划/汇总)  │    
                  └──┬───┬───┬──┘
                     │   │   │       
                 ┌───┘   │   └───┐
                 ↓       ↓       ↓
            ┌────┴──┐ ┌──┴───┐ ┌─┴─────┐
            │AgentA │⇄│AgentB│⇄│AgentC │
            └───────┘ └──────┘ └───────┘
                  ✓ 成员之间直接通信 ✓
                  ✓ 长期驻留、多轮协作 ✓</code></pre>

<blockquote id="f-doxcniqXNJR55S97Qwp6YEPPUJ7"><p id="f-doxcnDRxfGycpXxYM14ocGRNhTd"><span>适用场景：</span><span style="font-weight:bold">长期协作型</span><span>工作——例如多个模块负责人需要持续对接接口变更、不同视角的审查者要互相挑战方案、多个假设需要并行验证并相互辩论。</span></p></blockquote>

<p id="f-doxcnlfPzgU9qzUioEsSUnvJrag"><span style="font-weight:bold">AgentTeam VS SubAgent</span></p>

<ul><li id="f-doxcnkZhjaBmNKDgICZcTxuao2e"><span style="font-weight:bold">拓扑</span><span>：SubAgent 是中心化的 Star，AgentTeam 是去中心化的 Mesh。</span></li></ul>

<ul><li id="f-doxcn0x4xya355uHmHKHdZJwvzY"><span style="font-weight:bold">主控节点</span><span>：SubAgent 模式下主 Agent 是唯一枢纽；AgentTeam 模式下 Team Lead 只做规划，不再垄断通信。</span></li></ul>

<ul><li id="f-doxcnfNzxg3lreFV2AksrSOKeYb"><span style="font-weight:bold">成员通信</span><span>：SubAgent 中子代理之间不通信，一切经主 Agent 中转；AgentTeam 中成员可点对点直发，也可广播。</span></li></ul>

<ul><li id="f-doxcnVURiHHKRlExRQyQyiesWYe"><span style="font-weight:bold">生命周期</span><span>：SubAgent 一次性、用完即销毁；AgentTeam 长期驻留、跨轮协作。</span></li></ul>

<ul><li id="f-doxcnJGR6TpTmthFpmrfj6olRuf"><span style="font-weight:bold">共享状态</span><span>：SubAgent 无共享态势；AgentTeam 通常带共享任务列表等团队级状态。</span></li></ul>

<ul><li id="f-doxcntUZhbV60jqQiivWo2Os1gg"><span style="font-weight:bold">适用场景</span><span>：SubAgent 适合任务分发与信息隔离；AgentTeam 适合长期协作与互相质疑。</span></li></ul>

<a id="f-doxcnCWokTSCkbQhRB9QpYnxLQb"></a>

###### 通信方法

<p id="f-doxcnnIOK6hiqJltHRs5rEN3cRx"><span>这一节专门讲通信机制——SubAgent 与 AgentTeam 采用的是两条完全不同的代码路径。</span></p>

<a id="f-doxcnzT7DGl1bdrkqoobJmHwJGV"></a>

###### SubAgent 的通信方法

<p id="f-doxcnSOxegEYpSxd6wraelvoBrg"><span>SubAgent 模式下，</span><span style="font-weight:bold">子代理之间不通信</span><span>，所有信息流都是"主 Agent ↔ 子代理"的单跳。具体走的是 ClaudeCode 的工具调用通道，本质上和 Read、Bash 这些工具是同一套机制——只不过这个"工具"返回的不是文件内容，而是一个子 Agent 跑完一整段对话循环后的产物。</span></p>

<p id="f-doxcnM0mtFQyRgrIXTIHromLCrg"><span>整个过程可以拆成三步：</span></p>

<ol start="1"><li id="f-doxcnwFFti71Thfm8szyW7rKMdg"><span style="font-weight:bold">下行 / 派发</span><span>：主 Agent 调用 </span><span><span><span>Task</span></span></span><span> 工具，把任务描述（prompt）、可用工具集、可选模型作为参数传进去。这次调用在主 Agent 的对话历史里就是一条普通的 </span><span><span><span>tool_use</span></span></span><span>。</span></li></ol>

<ol start="2"><li id="f-doxcnDpSofBVgwzVMCPTTA3J2xb"><span style="font-weight:bold">隔离执行</span><span>：被派出的子代理拿着这段 prompt，在</span><span style="font-weight:bold">一个全新的、与主对话隔离的上下文窗口</span><span>里跑自己的 Query Loop——读文件、调工具、推理，全部发生在它自己的上下文里，不会回流到主 Agent。</span></li></ol>

<ol start="3"><li id="f-doxcnvVS9UOxSEqlnLo7UJbLXff"><span style="font-weight:bold">上行 / 回传</span><span>：子代理完成后，把最终的结论压缩成一段 </span><span style="font-weight:bold">summary 文本</span><span>，作为这次 </span><span><span><span>Task</span></span></span><span> 工具调用的 </span><span><span><span>tool_result</span></span></span><span> 返回给主 Agent。主 Agent 只看到这段 summary，看不到中间过程。</span></li></ol>

<p id="f-doxcnaP438GigugOh2BK50dZ8Ee"><span>这种通信方式有几个直接后果：</span></p>

<ul><li id="f-doxcnZ1pLT38LowpFM1HiFc33Zc"><span style="font-weight:bold">单跳、无状态</span><span>：每次调用都是一来一回，子代理拿不到上一次自己的历史，也拿不到兄弟子代理的历史。</span></li></ul>

<ul><li id="f-doxcnZx0iFMmkmvec20ak8SIerg"><span style="font-weight:bold">天然降噪</span><span>：中间几十轮 reasoning 不会污染主 Agent 的上下文，主 Agent 拿到的永远是被压缩过的结论。</span></li></ul>

<ul><li id="f-doxcnLDTpkrjf3ExESF2T8nKqtc"><span style="font-weight:bold">协调必须经主 Agent 中转</span><span>：如果"子代理 A 的结果要影响子代理 B 的任务"，只能由主 Agent 在拿到 A 的 summary 之后，再发起一次新的 </span><span><span><span>Task</span></span></span><span> 去派 B——子代理之间没有任何直接通路。</span></li></ul>

<ul><li id="f-doxcnmfwezUcF5mQFzbJ4MyUuIg"><span style="font-weight:bold">审计点单一</span><span>：所有跨 Agent 的信息流都凝结在主 Agent 对话历史里的那几条 </span><span><span><span>tool_use</span></span></span><span> / </span><span><span><span>tool_result</span></span></span><span> 上，事后追溯非常清晰。</span></li></ul>

<p id="f-doxcn5sr1HMd5OhVnOZwf0DOKhh"><span>一句话：SubAgent 的"通信"其实就是</span><span style="font-weight:bold">一次带隔离上下文的函数调用</span><span>，参数是 prompt，返回值是 summary。</span></p>

<a id="f-doxcnqnUOiPEDE4FS3uhLJWurIg"></a>

###### AgentTeam 的通信方法

<p id="f-doxcnTi4iEzTgN0VEJs2zl8Rzwc"><span>AgentTeam 模式下，成员是长期驻留的对等节点，需要在多轮之间持续交换信息，因此走的不再是"工具调用 → 返回值"这种一次性通道，而是一套</span><span style="font-weight:bold">异步消息传递</span><span>机制。</span></p>

<p id="f-doxcnMZtLfGfeMFhao9wLiiShLb"><span>可以从两个维度去理解它：</span></p>

<p id="f-doxcnsjxS7xAqywjHWqmvh3Mwth"><span style="font-weight:bold">(1) 传输层：消息靠"邮箱文件"投递</span></p>

<p id="f-doxcnydY0DObY0oKBVwqo6HNCqd"><span>每个 teammate 都有一个属于自己的</span><span style="font-weight:bold">收件箱</span><span>，相当于一个先进先出的消息队列。在 ClaudeCode 的实现里，这个 inbox 就是一个</span><span style="font-weight:bold">本地 JSON 文件</span><span>，路径形如：</span></p>

<pre id="f-doxcnskNzE6UeBbyyjzHq9Zfaxh"><code>~/.claude/teams/{team_name}/inboxes/{agent_name}.json</code></pre>

<p id="f-doxcnxrUzKBzmUh4Zu1V8SY53Te"><span>发件方往对方的 inbox 文件里追加一条消息记录，收件方在自己下一轮被唤醒时从 inbox 文件里读出未读消息，并把这些消息</span><span style="font-weight:bold">注入到本轮的 prompt 上下文</span><span>里参与推理。文件级别的并发写入通过 </span><span><span><span>lockfile</span></span></span><span> 加锁串行化，避免多个 teammate 同时写同一个收件箱时彼此覆盖。</span></p>

<p id="f-doxcnL1KgO698l0HUkhxkHFVpZg"><span>也就是说："通信"在 AgentTeam 里被建模成了"</span><span style="font-weight:bold">在文件系统里给对方收件箱追加一段内容</span><span>"——不是函数调用，不是 RPC，而是一次异步的、落盘的消息投递。这套机制天然支持跨进程、跨 session：只要大家约定好 </span><span><span><span>~/.claude/teams/...</span></span></span><span> 这个目录，不同的 ClaudeCode 进程就能互相收发消息。（源码里还有一个 </span><span><span><span>UDS_INBOX</span></span></span><span> 开关，用 Unix Domain Socket 在本机做更低延迟的跨 session 投递，但默认形态就是本地文件邮箱。）</span></p>

<p id="f-doxcnaJbBs2nRrq3EBWSvob7w3f"><span style="font-weight:bold">(2) 应用层：通过专用消息工具发送</span></p>

<p id="f-doxcnem4AtCLJEzvoiDNMgEBGmf"><span>teammate 不能"直接说话"——光在自己的回复里写字，别人是看不到的（这条约束甚至会被写进它们的 system prompt 里强制声明）。要让信息真正流出去，必须显式调用一个</span><span style="font-weight:bold">消息发送工具</span><span>，常见两种用法：</span></p>

<ul><li id="f-doxcnnd2lWhWmKC3XGrrIitr1zc"><span style="font-weight:bold">点对点（unicast）</span><span>：指定收件人，例如 </span><span><span><span>{"to": "&lt;某成员&gt;", "message": "..."}</span></span></span><span>，消息只投到那个成员的 inbox。</span></li></ul>

<ul><li id="f-doxcnlMlziGYrHaqOiTIG7nyKnb"><span style="font-weight:bold">广播（broadcast）</span><span>：指定"全员"为收件人，例如 </span><span><span><span>{"to": "*", "message": "..."}</span></span></span><span>，消息被投递到团队中所有其他成员的 inbox。</span></li></ul>

<p id="f-doxcnpf6NjUxTwU9WC6JojeS5wh"><span>除了点对点消息之外，AgentTeam 还会维护一份</span><span style="font-weight:bold">共享的 TaskList</span><span>，作为另一条"被动通信"的通道：成员把自己的任务进展更新到 TaskList，其他成员在自己的下一轮上下文里就能看到整团的最新进度。这样很多"我在干什么、你接下来该做什么"的信息根本不需要点对点消息，靠看共享任务表就够了。</span></p>

<p id="f-doxcnw8Pt35FzcXNAhooU2IHPHd"><span>和笔记的理论部分：</span><span><span><a href="/posts/agent-learning-11-multi-agent/#f-doxcn1TzNz7iComMwOzkhLkwQ9d"><span>Agent之间的通信和状态管理对应</span></a></span></span><span>：</span></p>

<p id="f-doxcnbvQzaOuHvMF09wjOt2Vajp"><span>SubAgent使用的通信模式是：工具调用。 Agentteam使用的通信模式是：消息协作。</span></p>

<p id="f-doxcnu6MFO70HPfKrjTU0qGd2Uf"><span>SubAgent使用的消息传递媒介是：内存通道。 Agentteam使用的消息传递媒介是：文件通道。</span></p>

<a id="f-doxcnh6TiWqYAJYlkoe6ajzHyzf"></a>

###### 架构选型背后的思考

<p id="f-doxcnolgl7h5I53oOkEWLcO0PIg"><span>在笔记 </span><span><span><a href="/posts/agent-learning-11-multi-agent/#f-doxcntuQVjJ2aMEP4HF4qje1X9b"><span>Multi-Agent架构</span></a></span></span><span> 章节，我们聊到了中心化和去中心化的优缺点。</span></p>

<p id="f-doxcnYEb86nT1xcDLzklFUZ9Nle"><span>在笔记 Harness中的</span><span><span><a href="/posts/agent-learning-20-skills-harness/#f-doxcnubcTPrF7IFLugFJO89sFlb"><span> Orchestation</span></a></span></span><span> 章节，参考视频有谈到去中心化架构尽量不要用，因为他会引入非常复杂的协调税。一般推荐中心化。</span></p>

<p id="f-doxcnYkbxqbjfczj6dwqS0jP6uh"><span>结合我们解析的Openclaw, Hermes 他们使用的架构也是以中心化架构为主。包括ClaudeCode 虽然使用了AgentTeam，但是他默认不是对所有人开放的，如果要使用它，需要修改配置参数。以及我查阅了专门讲ClaudeCode的</span><span><span><a href="https://lintsinghua.github.io/"><span>书籍</span></a></span></span><span>，他甚至没有讲AgentTeam, 只讲了SubAgent。 所以可以看出，去中心化是一种高级的技巧。推荐不要一开始就使用它，它很难驾驭，先从单Agent, 中心化架构，这样的架构入手，有必要才使用去中心化架构。</span></p>

<p id="f-doxcnaPBtDxZZV9nDfDyvHuRfge"><span>（这个思考，在你看完了这些上面的书籍，资料后，你可能也会有自己的思考，这些都是可以体现在和面试官交流上）</span></p>

<a id="f-doxcnTdVN7AMxpyUg0Q0yBnvWHd"></a>

###### 面试内容

<p id="f-doxcnaVc5DFYWq3EGHIWuIagSye"><span style="font-weight:bold">面试呼应</span></p>

<blockquote id="f-doxcnuXkYwhsoIDfVwVhXdicHOh"><p id="f-doxcnrxR3tkiODfw2C3RttN9rYe"><span>而且你学完了，都是直接对你面试有帮助的。没学习这个小节之前，面试官问你Agent如何通信，当然你可以回答理论部分。学了以后，加入了CC和Openclaw，一定回答就更好了。所以很多问题的答案，是在我们学习的过程，不断总结提炼出更好的答案的。</span></p>
</blockquote>

<p id="f-doxcne26HPTT2jxzSlWwvRb8ysb"><span style="font-weight:bold">（面试原题）：如果 Agent 之间通信，某些东西不想给另一个 Agent 看到，应该怎么做？</span></p>

<p id="f-doxcnlSatmH3Yd3XqF4ldHcCbWb"><span>采用</span><span style="font-weight:bold">仅共享最终结果</span><span>的消息传递策略。每个子 Agent 拥有独立的上下文空间，所有中间推理过程——包括中间的工具调用链、思维链——都留在子 Agent 的私有空间里，执行完成后只把最终结论提取出来返回给父 Agent，父 Agent 看不到任何中间步骤。这样做的好处有两个：一是隐私隔离，某个子 Agent 的中间数据不会泄露给其他 Agent；二是控制上下文膨胀，如果把所有中间步骤都传回去，父 Agent 的上下文窗口会快速爆满。这个策略在实际项目中是主流做法，比如 Claude Code 的子代理只返回纯文本结果，OpenClaw 的子 Agent 也是只把蒸馏后的最终回复推送给父 Agent</span></p>

<p id="f-doxcnZvI2oUTMfzehQFWOTmSTud"><span>Agent 间通信模式的选择，面试中通常这样问：</span></p>

<p id="f-doxcna7lbTzMYGKWChLXPrnTmoc"><span style="font-weight:bold">你的 Agent 之间是如何通信的？（或者：你项目里的多 Agent 是怎么协作的？）</span></p>

<blockquote id="f-doxcnTzWuzNpooCsxz8tblWbkmh"><p id="f-doxcnDSwddGFqVlJJSWkGxAv7cg"><span>这里是以ClaudeCode的Subagent模式来回答的，当然你可以从AgentTeam角度，也可以回答。</span></p></blockquote>

<p id="f-doxcny9FALUVRZKXj0VCx8iH2HS"><span>面试时可以从三个层面回答：</span></p>

<p id="f-doxcnT1ekp4zBkJbQBr2Xe7h3ag"><span>第一，</span><span style="font-weight:bold">架构选型</span><span>：我们采用中心化架构，一个主 Agent 作为编排者，通过工具调用的方式委派任务给子 Agent。选择中心化而非去中心化的原因是，对话场景天然是"一进一出"的结构——用户发一条消息，最终要有一条连贯的回复，必须有且只有一个 Agent 对最终输出负责。中心化的星型拓扑正好对应这个模型：主 Agent 是唯一的回复责任人。</span></p>

<p id="f-doxcnHLu092lRrI2w5KqahK1qwe"><span>第二，</span><span style="font-weight:bold">通信模式</span><span>：使用工具调用而非移交。主 Agent 保留控制权，把子任务作为参数发给子 Agent，等结果回来后自己整合决策。子 Agent 之间不直接通信，如果 A 的结果需要被 B 使用，必须由主 Agent 中转——先拿到 A 的结果，再把相关信息写进给 B 的任务描述中。</span></p>

<p id="f-doxcnM5FtPuz5lgJKro9DFHLksb"><span>第三，</span><span style="font-weight:bold">消息内容</span><span>：仅传递最终结果，不传递中间推理链。子 Agent 在自己的独立上下文中完成全部推理和工具调用，只把最终结论返回给主 Agent。这样既保护了各 Agent 的中间数据隐私，也有效控制了主 Agent 的上下文膨胀。</span></p>

<a id="f-doxcnj5AMk4dtixXMWKxtXHLHYe"></a>

###### 视频讲解

<p id="f-doxcnvcJKkk1vpn3HqJ9ux9mTuc"><span>面试必考：细致拆解ClaudeCode架构</span></p>

<p id="f-doxcni6z4nZtQ0KVp06Qu4DKjyd"><span><span><a href="https://www.bilibili.com/video/BV11Fd8BcEFh/?vd_source=144bec9c3f54e465073138bed788be1b"><span>https://www.bilibili.com/video/BV11Fd8BcEFh/?vd_source=144bec9c3f54e465073138bed788be1b</span></a></span></span></p>

<a id="f-doxcnim6v71Ag0CWHpj9BW21zOg"></a>

##### 权限系统与安全审查

<blockquote id="f-doxcn4stQKgj8e4uMkhu0nTNKbf"><p id="f-doxcn3ooLNnJhmvD9S1ztX0rWYf"><span>学习ClaudeCode的权限处理，除了应对面试官问你CC 权限系统是如何设计的这个问题（有朋友被问过）。另外你也可以应对面试官问你Agent安全相关的问题，比如如何避免Agent乱调用工具对系统产生破坏。除此之外也希望大家学会了本节，在设计自己Agent项目的时候可以在Agent的权限系统/安全上进行设计，会让自己的项目更加有深度，不被质疑是玩具项目。最后学了本节，其实你在使用ClaudeCode不同模式的时候，其实也可以知道里面的运行原理。</span></p></blockquote>

<p id="f-doxcnRl1zQ9XjhAi44Fiwj7EAKg"><span>本节分析 Claude Code 的权限与安全机制。无论是主 Agent 还是子代理，每次调用工具（写文件、执行命令等）都要经过同一套权限管道的审查。Boris 用"瑞士奶酪模型"形容这套设计——叠加多层防御，每层都可能有漏洞，但叠在一起漏洞被覆盖。</span></p>

<a id="f-doxcnOtOrtuxlApDyDIzcZ6elJc"></a>

###### 总览：四层权限管道

<p id="f-doxcnnNXFqESdrJrfaXCAIfhOCf"><span>当主 AI 请求执行任何操作时，都要依次经过四层安全过滤。每一层都可以直接做出"放行"或"拒绝"的终审判决，只有当本层说"我没意见"时，请求才会继续流入下一层。</span></p>

<pre id="f-doxcnTtwJ4ZbBstRDIZA4ptUQLh"><code>                      主 AI 请求执行一个操作
                               │
                               │
         ═══════════════ 第一层：规则过滤 ═══════════════
                               │
         ┌─────────────────────┼─────────────────────┐
         ▼                     ▼                     ▼
    命中 deny 规则        命中 allow 规则         无规则命中
         │                     │                     │
         ▼                     ▼                     ▼
     ❌ 直接拒绝           ✅ 直接放行          继续 ↓
    （不可覆盖）
                                                     │
         ═══════════════ 第二层：工具自检 ═══════════════
                                                     │
                                      ┌──────────────┼──────────────┐
                                      ▼              ▼              ▼
                                   工具拒绝       工具放行      工具无意见
                                  (.git等          (项目内
                                   路径免疫)        读取等)
                                      │              │              │
                                      ▼              ▼              ▼
                                  ❌ 拒绝        ✅ 放行       继续 ↓
                                                                    │
         ═══════════════ 第三层：模式兜底 ═══════════════
                                                                    │
                    ┌───────────────┬───────────────┬───────────────┐
                    ▼               ▼               ▼               ▼
               bypass 模式    default 模式    dontAsk 模式     auto 模式
                                (以及 acceptEdits、
                                 plan 等，行为相同)
                    │               │               │               │
                    ▼               ▼               ▼               ▼
                ✅ 放行       ⏸️ 弹框问用户    ❌ 直接拒绝    进入第四层 ↓
                                                                    │
         ════════════ 第四层：AI 分类器（动态审查）═════════════
                                                                    │
                                         ┌──────────────────────────┼──────────┐
                                         ▼                          ▼          ▼
                                    安全工具白名单             工作目录内编辑   都不适用
                                   (Read/Grep/…)                               │
                                         │                          │           ▼
                                         ▼                          ▼    AI 分类器
                                     ✅ 放行                   ✅ 放行    （独立 AI）
                                                                          │
                                                                   ┌──────┴──────┐
                                                                   ▼             ▼
                                                               允许：✅       阻止：⏸️</code></pre>

<p id="f-doxcnzV669KqZ2tM2jwPYcHaVNe"><span style="font-weight:bold">每一层解决什么问题？</span></p>

<p id="f-doxcnedgLUFrzLgh5YIjjAkkVVB"><span style="font-weight:bold">第一层（规则过滤）</span><span>：解决"用户已经明确知道哪些操作安全、哪些危险"的场景。比如你知道 </span><span><span><span>python</span></span></span><span> 命令在你的项目里是安全的，就配一条 allow 规则永久放行，不用每次都确认。这是</span><span style="font-weight:bold">用户意志的直接表达</span><span>——提前告知系统"这个我信任"或"这个绝不允许"，与当前处于什么模式完全无关。</span></p>

<p id="f-doxcnQ3yh5axEXkkl2Gwj8PQ69K"><span style="font-weight:bold">第二层（工具自检）</span><span>：解决"规则覆盖不到的、需要理解操作内容才能判断的场景"。规则是按"工具名+命令模式"做粗粒度匹配的（比如 </span><span><span><span>Bash(rm:*)</span></span></span><span>），但它无法理解操作的语义。比如 Write 工具被允许了，但写入目标是 </span><span><span><span>.git/config</span></span></span><span>——这种"路径是否越界"的判断只有工具自己的代码才能做。Bash 工具更复杂，它会用 shell AST 解析器分析命令结构，检测命令替换、进程替换、注入攻击等。这一层的本质是：</span><span style="font-weight:bold">每个工具根据自己对操作内容的专业理解，用确定性的代码逻辑做细粒度安全判断</span><span>。</span></p>

<p id="f-doxcngm59ljuCzNRrqMuVUH7Bqd"><span style="font-weight:bold">第三层（模式兜底）</span><span>：解决"规则没覆盖到、工具也没意见时怎么办"的问题。到了这一层，说明前面的确定性检查都没有做出判决，需要一个"兜底策略"。不同模式代表不同的风险偏好：bypass 信任一切，default 什么都问人，dontAsk 什么都拒绝，auto 交给 AI 判断。这一层的本质是：</span><span style="font-weight:bold">把最终决定权交给用户选择的风险偏好</span><span>。</span></p>

<p id="f-doxcn2wRh5iTOUBFFo0qfOnbhKd"><span style="font-weight:bold">第四层（AI 分类器）</span><span>：只有 auto 模式才会走到这里。它解决的是"不想每次都手动确认，但又不想像 bypass 那样完全放弃安全检查"的矛盾。方案是引入一个</span><span style="font-weight:bold">独立的 AI 分类器</span><span>来代替人做判断——它读取对话上下文，理解当前操作的意图，判断是否安全。为了省钱，分类器前面有两条快速路径：安全工具白名单（Read/Grep 等零副作用工具直接跳过）和工作目录内编辑（项目内改代码不需要审查）。只有这两条都不适用时，才真正调用 AI 分类器。</span></p>

<p id="f-doxcnIj54uZ78B7vKCbAVPBAued"><span style="font-weight:bold">为什么是四层而不是一层？</span></p>

<p id="f-doxcnojEmybrJjzRpzWIXGFYRlg"><span>这四层的设计遵循"瑞士奶酪模型"——每层都可能有漏洞，但叠在一起漏洞被覆盖。同时，四层的排列顺序也体现了</span><span style="font-weight:bold">从确定性到不确定性的递进</span><span>：</span></p>

<pre id="f-doxcnWsgAdoc1LzxQkBR8R7Xq9c"><code>确定性高 ──────────────────────────────────────→ 确定性低

 第一层          第二层          第三层           第四层
 规则过滤        工具自检        模式兜底         AI 分类器
 ─────          ─────          ─────           ─────
 纯配置匹配      代码逻辑判断    策略分流         AI 推理判断
 ← 零成本 →     ← 零成本 →     ← 零成本 →      ← 额外API调用 →</code></pre>

<p id="f-doxcn1T8ITbZQkAw0rMYlFMPx3b"><span>越靠前的层越"刚性"（确定性高、成本低、不可覆盖），越靠后的层越"柔性"（需要推理、有成本、可降级）。这样设计的好处是：大部分操作在前三层就被处理了（要么放行要么拒绝），只有少数"不确定"的操作才需要走到最后的 AI 分类器——既保证了安全，又控制了成本。</span></p>

<p id="f-doxcnp8iOUKFBxDHUVZT3Rd8RJw"><span>下面逐层展开。</span></p>

<a id="f-doxcnvdH1KP8yIgXdXxcO8YsUFb"></a>

###### 第一层：规则过滤

<blockquote id="f-doxcnp9RICtjJCc4P31mj4WfQTd"><p id="f-doxcnxBZ11Fr4z2aQCe831N0iIg"><span>这一层我在使用github copilot的时候也有，大家有没有注意到在使用copilot的时候，如果有一个工具，他让你点击approve，下面有选项（是否alway approve)，如果你点了是，其实就在对应copilot的配置文件（json)中把这个命令设置为allow,下次执行相同内容就不会再要approve了。 </span></p>
<p id="f-doxcnkqhsTYDrgMxkFaRDlIGpmc"><span>这个方法是CodingAgent的通用技巧，设置规则，下次直接按照规则命中。</span></p></blockquote>

<p id="f-doxcnKEhKefhaRrA38TZJ1AO5Mh"><span>这一层与当前处于什么模式</span><span style="font-weight:bold">完全无关</span><span>，是一道纯粹的静态匹配。</span></p>

<p id="f-doxcnvsu5YmehTatk58pyR4FHJj"><span style="font-weight:bold">什么是规则？</span></p>

<p id="f-doxcnqPjM8GuTE0l93nE1taJIke"><span>规则是用户在 </span><span><span><span>settings.json</span></span></span><span> 中配置的、针对具体工具的白/黑名单。每条规则指定一个行为（allow / deny / ask）和一个匹配模式：</span></p>

<pre id="f-doxcnRH0YTzyfj50YHPckWMA8Hf"><code>{"permissions": {"allow": ["Bash(mkdir:*)", // 允许所有 mkdir 命令"Bash(python:*)",    // 允许所有 python 命令"Bash(ls:*)"         // 允许所有 ls 命令],"deny": ["Bash(rm -rf:*)"     // 禁止所有 rm -rf 命令]}}</code></pre>

<p id="f-doxcnzIvin92rUGfWrWTBs17nve"><span>格式是 </span><span><span><span>工具名(内容匹配)</span></span></span><span>，例如 </span><span><span><span>Bash(npm test)</span></span></span><span> 只匹配 </span><span><span><span>npm test</span></span></span><span> 命令，</span><span><span><span>Write</span></span></span><span> 匹配所有文件写入，</span><span><span><span>mcp__server1</span></span></span><span> 匹配指定 MCP 服务的全部工具。</span></p>

<blockquote id="f-doxcnCm34T1XrCMChQ9QMfsVNeE"><p id="f-doxcn0LU0lhGgLrcegX9tg6dgCf"><span>这些细节也不用强行记住，就是给大家看一下，重要的是这个思路，具体细节面试问的少。</span></p></blockquote>

<p id="f-doxcnul5kk7ujPvBSOsBOxne4Ep"><span style="font-weight:bold">规则有 6 个配置层级</span><span>，优先级从高到低：</span></p>

<div id="f-doxcnONQl74wEabQHrZWueFMXh9"><img alt="" decoding="async" height="300" loading="lazy" src="/images/agent-learning/7af0b2d7bfc289a95ec9dc33.png" width="1254"/></div>

<p id="f-doxcnpCs6K5ZE6jL716yKGq3eCg"><span style="font-weight:bold">执行逻辑</span><span>：deny 规则命中 → 直接拒绝（终审），allow 规则命中 → 直接放行（终审），ask 规则命中或无规则命中 → 流入下一层。</span></p>

<p id="f-doxcn3kReyRToN0veNYSHd6WG4e"><span>关键设计：</span><span style="font-weight:bold">deny 规则是不可覆盖的</span><span>。即使在 bypass 模式下，deny 规则仍然生效。这确保了管理员策略能够硬性约束用户行为。</span></p>

<a id="f-doxcnhuMQ9REk82Nj6A2xC5d7pf"></a>

###### 第二层：工具自检

<p id="f-doxcnw1VcpGWpv4eDmiQMTzOMmd"><span>每个工具内部都可以实现一个 </span><span><span><span>checkPermissions()</span></span></span><span> 方法，根据</span><span style="font-weight:bold">本次操作的具体内容</span><span>做安全判断。这不是配置驱动的，而是工具代码中写死的安全逻辑。</span></p>

<p id="f-doxcnxGUY6HPUncgSBgb7oCRJ9f"><span>典型例子：</span></p>

<ul><li id="f-doxcnGfTDXnBzlcBlA4qswInEaf"><span style="font-weight:bold">Bash 工具</span><span>：检查命令本身是否属于高风险操作</span></li></ul>

<ul><li id="f-doxcnzk95eX4ZzQDBaDS7KNKkbc"><span style="font-weight:bold">Write/Edit 工具</span><span>：检查目标文件路径是否合法</span></li></ul>

<ul><li id="f-doxcnYv2pGivVfhxHNlqdL83Wvb"><span style="font-weight:bold">安全路径检查</span><span>：</span><span><span><span>.git/</span></span></span><span>、</span><span><span><span>.claude/</span></span></span><span> 等关键目录有特殊保护——即使在 bypass 模式下也不能跳过，源码注释称之为 </span><span style="font-weight:bold">"bypass-immune"</span><span>（免疫 bypass）</span></li></ul>

<p id="f-doxcn2pQJ2fWd2Dm8JN10yXdebV"><span>工具自检有三种返回值：</span></p>

<ul><li id="f-doxcnKGyC0YaT9Ea0sGCi8ondtT"><span style="font-weight:bold">拒绝</span><span>：终审，直接拒绝操作</span></li></ul>

<ul><li id="f-doxcnmzRhvuy6pvQDNkzwsl7MPb"><span style="font-weight:bold">放行</span><span>：终审，直接通过</span></li></ul>

<ul><li id="f-doxcnGlpXP2xCWw2Wj3DIxkVcbg"><span style="font-weight:bold">无意见</span><span>：不做判断，流入下一层</span></li></ul>

<p id="f-doxcn24BOU6Hf1Ql3SySqJf88hh"><span>这一层的意义在于：规则是按"工具名 + 命令模式"做粗粒度匹配的，无法理解操作的语义。比如规则允许了 </span><span><span><span>Write</span></span></span><span>，但工具自检可以进一步检查"写入的目标是不是 </span><span><span><span>.git/config</span></span></span><span>"——这种细粒度判断只有工具自己能做。</span></p>

<a id="f-doxcnAN0NG3z7YmClJGDuk18UFh"></a>

###### 第三层：模式兜底

<blockquote id="f-doxcn00My9pke2IiDscros52hwh"><p id="f-doxcnVsk0XtrRLcU2F40Vbzp0lb"><span>设置模式。这个大家在使用CC的时候想必有印象。在CLI下方有:acceptEdits on等提示。学习了本节你更会理解在不同的模式下的预期行为。</span></p>
<p id="f-doxcnlGfRZi0GDdwlnxwirrXYFe"><span>大家可能困惑为啥自己使用CC 切换不到某种模式。要注意的是，里面有一些模式，比如bypassPermissions 是要通过命令行参数启动的，dontAsk并不可用（只是源码里有）。auto 是需要使用feature flag才能开启的。</span></p>
</blockquote>

<p id="f-doxcniXa4AWjSs26CT2NWroS0Jj"><span>走到这一层，说明前两层都没有做出判决——没有命中规则，工具也没有意见。此时由当前的</span><span style="font-weight:bold">权限模式</span><span>决定兜底行为。</span></p>

<p id="f-doxcnCRSWhXcfZJ61evV08geuUb"><span>Claude Code 有 5 种用户可设置的模式和 2 种内部模式：</span></p>

<div id="f-doxcntBIwTZIOslKegdotlJfA2c"><img alt="" decoding="async" height="433" loading="lazy" src="/images/agent-learning/94ea8bfdbfc81933312497e2.png" width="1257"/></div>

<p id="f-doxcnKAI5dvMNE1zd0aXMygQ4Wx"><span>注意 </span><span><span><span>acceptEdits</span></span></span><span> 和 </span><span><span><span>plan</span></span></span><span> 的特殊之处：它们的核心逻辑</span><span style="font-weight:bold">不在第三层，而是在第二层工具自检时就生效了</span><span>。</span><span><span><span>acceptEdits</span></span></span><span> 下的 Write 工具检测到项目内编辑直接放行，</span><span><span><span>plan</span></span></span><span> 下的 Write 工具直接拒绝写操作——走到第三层时，剩下的操作和 </span><span><span><span>default</span></span></span><span> 行为相同（弹框问用户）。</span></p>

<p id="f-doxcncG2PO80qAvnpei3lXfE7zb"><span>重点说明两个容易误解的模式：</span></p>

<p id="f-doxcnBUpCMtpA0aJ6zPDsfkDFWc"><span style="font-weight:bold">bypass 不是无敌模式</span><span>。它排在第三层，意味着第一层的 deny 规则和第二层的安全路径检查（bypass-immune）已经先执行过了。bypass 只是"如果前面的层都没有拦你，那我也不拦你"——它跳过的是本层的确认弹框，而非整个安全管道。</span></p>

<p id="f-doxcntRnt9OpmvdTesUvQHd7xCb"><span style="font-weight:bold">dontAsk 不是"全部允许"，而是"全部拒绝"</span><span>。它的语义是"不要问我，直接拒绝所有没有被规则明确放行的操作"。适合无人值守场景：只跑规则白名单内的操作，其余一律拦截。</span></p>

<a id="f-doxcnZJggzcFnlG8hfI8VECLTWf"></a>

###### 第四层：AI 分类器（动态审查）

<blockquote id="f-doxcnpNe4ROYaphuizDn1QrWuyf"><p id="f-doxcnD9CgvSZiand4Ry9LCLIDNh"><span>这一层就是有一个分类器，也就是使用AI最后来判断，是否允许还是拒绝还是人工approve。只不过这一层也有策略，先固定规则跑 - AI弱分类（省Token) - AI强分类 - 错误处理兜底。 所以这就是企业项目和自己做的项目的区别。大家自己做，用AI分类，可能就调用个API写个提示词就完了，但是企业项目是用了多层的调用。 看了这些架构我们也应该有意识对齐，当然自己做项目肯定不如企业项目复杂，但是我们可以尽量设计得更复杂，更稳健，让面试官觉得该学习案例并不简单。</span></p></blockquote>

<p id="f-doxcnuUGKFPyDLEWIM3kmunKolb"><span>只有 </span><span style="font-weight:bold">auto 模式</span><span>才会走到这一层。这就是视频文稿中提到的"背后跑了两个 AI"——主 AI 负责干活，另一个独立的 AI 做安全分类，审查每个操作是否安全。</span></p>

<p id="f-doxcnQlTzOkAaa983JTTiSmtY4g"><span style="font-weight:bold">快速路径（省钱优化）</span></p>

<p id="f-doxcnlV5X3rEw3MPRWJJ8VYczUb"><span>在真正调用 AI 分类器之前，先检查两条快速路径：</span></p>

<ol start="1"><li id="f-doxcnBtmQnDYA3BJx297X6adLac"><span style="font-weight:bold">安全工具白名单</span><span>：</span><span><span><span>Read</span></span></span><span>、</span><span><span><span>Grep</span></span></span><span>、</span><span><span><span>Glob</span></span></span><span>、</span><span><span><span>Sleep</span></span></span><span>、</span><span><span><span>TodoWrite</span></span></span><span> 等完全无副作用的工具，直接放行，无需分类器审查。设计原则是——只有</span><span style="font-weight:bold">零副作用</span><span>的工具才进白名单，</span><span><span><span>Write</span></span></span><span>、</span><span><span><span>Edit</span></span></span><span>、</span><span><span><span>Bash</span></span></span><span> 这些有副作用的工具一律不在。</span></li></ol>

<ol start="2"><li id="f-doxcnM8OLnyME4BrNa94rZIO0gS"><span style="font-weight:bold">工作目录内的编辑</span><span>：如果操作是在项目目录内编辑文件（模拟 acceptEdits 行为），也直接放行。</span></li></ol>

<p id="f-doxcnk14DBsOTGq3sMeTsfvQPSc"><span>大部分日常操作（读文件、搜索、在项目内写代码）在快速路径就被放行了，只有少数操作需要真正调用分类器。</span></p>

<p id="f-doxcndy9PpMBZqhtb1PKKEHK9Bb"><span style="font-weight:bold">两阶段分类器（先粗筛后精筛）</span></p>

<p id="f-doxcnVOwgyqDaWzs5GBuwya5Tgf"><span>快速路径都不适用时，调用 AI 分类器。它不是简单地问一次"安全吗？"，而是</span><span style="font-weight:bold">同一个问题问两遍，用不同的力度</span><span>：</span></p>

<pre id="f-doxcnpDWIIJ9jPSh2q8JmnFhInf"><code>     Stage 1：快速粗筛（64 token，偏保守）
     提示词要求 "Err on the side of blocking"（宁可错拦，不可漏放）
         │
         ├─ 判断为安全 → ✅ 直接放行（完成）
         │                  大部分安全操作在这里就结束了
         │
         ├─ 判断为危险 → 进入 Stage 2
         └─ 无法判断   → 进入 Stage 2
                              │
                              ▼
     Stage 2：深度精筛（4096 token，带推理链）
     要求 AI 先写下推理过程，再给结论
         │
         ├─ 判断为安全 → ✅ 放行（翻案成功）
         ├─ 判断为危险 → ❌ 阻止
         └─ 无法判断   → ❌ 阻止（安全优先）</code></pre>

<p id="f-doxcnyCRxs6C8fBIO1WNmj6RvVc"><span>设计理念：Stage 1 偏向保守（提示词原文 "Err on the side of blocking"，即宁可错拦），只用 64 token 做一个快速的安全/危险判断——如果连保守策略都认为安全，那确实安全，不需要进一步审查。Stage 2 给被误拦的操作一次"翻案"机会，用 4096 token 让 AI 写下完整的推理链再做结论，减少误报。如果 Stage 2 也无法给出明确结论，</span></p>

<p id="f-doxcnbdcjGhwVWedarSlQYcud1g"><span style="font-weight:bold">默认阻止（fail closed）</span><span>。</span></p>

<p id="f-doxcn9Xqua6FRBUi5gyTeFdQerd"><span>为什么不直接用一个阶段？</span><span style="font-weight:bold">省钱</span><span>。大部分操作在 Stage 1 就完成了（64 token，快且便宜），只有被 Stage 1 标记为"可疑"的操作才需要 Stage 2 的深度推理（4096 token，慢且贵）。</span></p>

<p id="f-doxcnR8iZvMlSrKVrM1GT8ccyQg"><span style="font-weight:bold">防注入设计</span></p>

<p id="f-doxcn5Y1wwesEZ8qHr4iMviDPZM"><span>分类器的输入经过精心过滤。最关键的一点：</span><span style="font-weight:bold">对话记录中故意排除了主 AI 的文本输出，只保留用户消息和工具调用记录</span><span>。</span></p>

<p id="f-doxcnfwg2nyUksD1AA6AuKSr2GP"><span>原因是：恶意代码文件可能包含 prompt injection 指令，让主 AI 输出特定文本来"说服"分类器放行危险操作。通过排除主 AI 的文本，分类器只看到"做了什么"（工具调用），看不到主 AI "说了什么"——从源头阻断注入攻击路径。</span></p>

<p id="f-doxcnb4BDDRQ1TPkV8tszBy8BVf"><span>分类器还有自己独立的系统提示词，读取 CLAUDE.md 作为用户意图上下文，与主 AI 的提示词体系完全隔离。</span></p>

<p id="f-doxcnjluoQBLNFAeHPKOhu7k58b"><span style="font-weight:bold">容错与降级</span></p>

<p id="f-doxcnp8pvIVpjTI8c0vbwjbi66f"><span>分类器不是 100% 可靠的系统，源码设计了三种降级机制：</span></p>

<div id="f-doxcnNMZSH7nH2KPLPu9TA6O3Be"><img alt="" decoding="async" height="202" loading="lazy" src="/images/agent-learning/871de4d5f3d6bd2570309fa7.png" width="1263"/></div>

<p id="f-doxcnawYkhf6y5MBqZW5nmfKz2H"><span>这里是一个面试问题考点，请看 </span><span><span><a href="/posts/agent-learning-24-interview-review/#f-doxcnEzp8GDSc3cwzZgNbPWBXDd"><span>腾讯AI Agent暑期实习，面试问题2：如果用户和AI对话生成问题本身有冲突，系统应该怎么处理</span></a></span></span></p>

<a id="f-doxcnzMk0Wg8V9l4HantJbRrAec"></a>

###### 设计思想

<p id="f-doxcn7qc1zBFS28end7miqRAxzh"><span>回顾整个四层管道，有三个核心设计思想值得展开：</span></p>

<p id="f-doxcnGgKPjObFIdsIBvuJDRyngc"><span style="font-weight:bold">第一，纵深防御（Defense in Depth）</span></p>

<p id="f-doxcnUic9zOK0qr7zhnUFOd7YAh"><span>不依赖单一安全机制，而是叠加四层——静态规则做快速过滤，工具自检做细粒度判断，模式做策略兜底，AI 分类器做上下文感知的最终审查。每层都可能有漏洞，但叠在一起漏洞被覆盖。这就是 Boris 所说的"瑞士奶酪模型"。</span></p>

<p id="f-doxcnB4xYLT9ydDKavyNe7f1JNg"><span style="font-weight:bold">第二，Fail Closed（默认拒绝）</span></p>

<p id="f-doxcnXaq1r2uKcbvpT4ElF6MKCb"><span>贯穿整个管道的基调是"不确定就拒绝"：分类器解析失败 → 阻止，分类器 API 不可用 → 退回用户确认，dontAsk 模式下无规则覆盖 → 拒绝。系统不会因为任何故障而放过潜在危险操作。</span></p>

<p id="f-doxcnKFUE3GVtXOmdDImIPRS41d"><span style="font-weight:bold">第三，安全与效率的平衡</span></p>

<p id="f-doxcnJWReHtLO2x49GBa6PnLjOf"><span>用 AI 做安全审查更准但更贵（每次操作都要额外 API 调用）。源码通过三级优化降低开销：安全工具白名单（零副作用工具直接跳过）、acceptEdits 快速路径（项目内编辑直接通过）、两阶段分类器（Stage 1 用 64 token 快速过滤大部分安全操作）。最终，真正需要完整分类器推理的操作是少数。</span></p>

<p id="f-doxcnbjEjtVYcTaerF3yyoZAfob"><span style="font-weight:bold">面试呼应</span></p>

<p id="f-doxcnkfh794cCpQGcRYn0gYdkzh"><span>这套权限系统直接关联笔记</span><span style="font-weight:bold"> 6.3 节（Agent 安全设计）和 6.4 节（Agent 通信安全）</span><span>。如果面试中被问到"Agent 项目怎么做安全控制"，可以从这三个层面回答：多层防御（不靠单点）→ Fail Closed（不确定就拒绝）→ 防注入（从信息流源头过滤，分类器只看工具调用，不看模型文本输出）。</span></p>

<p id="f-doxcnYjRIphBPMXFu1Fml7aeV4c"><span>与 OpenClaw 的对比也值得一提：OpenClaw 用规则 + 沙箱实现安全，没有独立 AI 审查；Claude Code 用独立 AI 分类器理解上下文做判断，更安全但成本更高。两者代表了"静态规则 vs 动态 AI 审查"两种安全哲学。</span></p>

<a id="f-doxcnnPRPua7sm2TzLefUrlijdb"></a>

###### 面试真题

<a id="f-doxcnAboQIdD4uTUf06wQWM0YY6"></a>

###### 如何保证 Agent 输出的 安全性?

<p id="f-doxcnalNjLCUy4AeHphssABk5Fc"><span><span><a href="/posts/agent-learning-24-interview-review/#f-doxcnV1S0gKUVbwOrhVbUVLNSVU"><span>选自202607 宇树科技二面</span></a></span></span></p>

<p id="f-doxcnlUdvZGo3eXSYGbxD8YlExg"><span>💡 </span><span style="font-weight:bold">思路：</span></p>

<p id="f-doxcn9KThLVm9VZKLqEGfqMkVzc"><span>按照 </span><span style="font-weight:bold">“输入 → 工具 → 输出”</span><span> 三个环节回答： </span><span style="font-weight:bold">读进来的不要带偏 Agent，执行的不要越权或造成破坏，输出的不要包含有害内容或泄露敏感信息。</span><span> 虽然题目问的是输出安全，但最终结果受整个执行过程影响，因此不能只在最后检查答案。Claude Code 的权限机制可以作为工具安全的参考；输出侧重点讲内容审核和防泄密，不展开格式校验等问题。</span></p>

<p id="f-doxcnXjvpUnxN70kJCA7uMsJjpb"><span>📝 </span><span style="font-weight:bold">答案：</span></p>

<p id="f-doxcno0mHQFzZVD8ToNhOqyRMWb"><span>可以从 </span><span style="font-weight:bold">输入安全、工具安全和输出安全</span><span> 三个环节做分层防护，而不是只靠提示词要求模型“安全回答”。</span></p>

<ol start="1"><li id="f-doxcnUxzNz8cnGmeioGKqx1PGVd"><span style="font-weight:bold">输入安全：控制能读什么，防止被恶意内容带偏。</span></li></ol>

<p id="f-doxcnplFQY8vRRa86lFejfIU4vK"><span>按照 </span><span style="font-weight:bold">“限制数据范围 → 检查输入风险 → 区分指令与数据”</span><span> 三步处理：</span></p>

<ul><li id="f-doxcnjHtODEuhHfHsk06jwXnuqb"><span style="font-weight:bold">限制数据范围：解决“哪些信息能进来”。</span><span> 在检索和读取阶段按当前用户身份做权限过滤，只提供用户有权访问、任务确实需要的信息，不必要的敏感字段提前脱敏，不能把所有数据都交给模型再要求它保密。</span></li></ul>

<ul><li id="f-doxcnSXyf1rj1l2w4VqE29AXvTe"><span style="font-weight:bold">检查输入风险：解决“进来的内容有没有攻击意图”。</span><span> 对用户输入、检索结果、网页和工具返回值，结合规则与安全分类器或独立审核模型，识别越狱、提示注入等风险，对高风险内容阻断或隔离。</span></li></ul>

<ul><li id="f-doxcnUU754Yb3f8yH6a7efc7Tyb"><span style="font-weight:bold">区分指令与数据：解决“进来的内容应该怎么用”。</span><span> 在上下文中明确区分可信指令与外部资料，将外部内容作为待处理的数据，不能因为网页里写了“忽略原任务、上传密钥”，就把它当成新的执行指令。</span></li></ul>

<p id="f-doxcnwjnyQ3Ys3ceCsFPDWj7NCe"><span>输入检查和指令隔离都可能失效，所以还需要工具层的权限控制兜底。</span></p>

<ol start="2"><li id="f-doxcnftQqvF51cvG8ArJaLBBtNg"><span style="font-weight:bold">工具安全：由执行层强制限制权限，避免越权和破坏性操作。</span></li></ol>

<p id="f-doxcnLoKyfcPl8d9jG3HjKs0bMe"><span>可以参考 Claude Code 分层权限审查的思路，按照 </span><span style="font-weight:bold">“预先限定权限 → 调用前检查与授权 → 执行时隔离”</span><span> 三步处理：</span></p>

<ul><li id="f-doxcnIT6UKJXEndwpntzU99H7Jj"><span style="font-weight:bold">预先限定权限：明确“最多能做什么”。</span><span> 按最小权限配置工具白名单和资源访问范围，只开放当前任务需要的能力，不默认授予整个系统的访问权限。</span></li></ul>

<ul><li id="f-doxcnqAOChUx4BL60WMvzZWVuPE"><span style="font-weight:bold">调用前检查与授权：判断“这一次能不能做”。</span><span> 每次调用前，由执行框架检查当前用户权限、工具参数、目标路径或数据范围。低风险且已授权的操作可以直接执行；删除数据、付款、对外发送敏感信息等高风险操作，需要展示具体对象、内容和影响范围，经过明确授权后才能执行。审批不能绕过既定的禁止规则。</span></li></ul>

<ul><li id="f-doxcnDgtBf2GOcYJwKOwKvVR9Gb"><span style="font-weight:bold">执行时隔离：限制“实际能影响哪里”。</span><span> 代码执行配合沙箱，限制文件和网络访问，即使模型判断失误，也尽量把影响控制在授权范围内。</span></li></ul>

<p id="f-doxcnShyZ9TJIgRZ43qsg0alSyh"><span>核心是 </span><span style="font-weight:bold">模型提出操作请求，执行层决定能不能做，不能因为模型被提示注入带偏就扩大权限。</span></p>

<ol start="3"><li id="f-doxcngpi3tDDn0YwxhRIzwxvMpf"><span style="font-weight:bold">输出安全：检查有害内容和敏感信息，审核通过后再交付。</span></li></ol>

<p id="f-doxcnguzsN0L3NdP74EYvtQh3vd"><span>按照 </span><span style="font-weight:bold">“审核有害内容 + 检测敏感信息 → 根据结果处置”</span><span> 处理，前两项是检查维度，最后一项是处理措施：</span></p>

<ul><li id="f-doxcnTtMc8qlGiFq8JU6dgirihg"><span style="font-weight:bold">审核有害内容：检查“回答本身是否有害”。</span><span> 在回答返回用户前，结合内容安全规则、安全分类器或独立审核模型，判断是否包含违反业务安全政策的有害内容，而不是只靠敏感词匹配。</span></li></ul>

<ul><li id="f-doxcnl5ogx2VVL4M16DsS3CYKqW"><span style="font-weight:bold">检测敏感信息：检查“有没有泄露不该披露的信息”。</span><span> 检测密钥、凭据、个人隐私和内部敏感资料，并结合当前用户权限和任务需要，判断是否允许披露。</span></li></ul>

<ul><li id="f-doxcntEvW4DPiKlWWoTD8d0rN4f"><span style="font-weight:bold">根据结果处置：决定“最终交付什么”。</span><span> 审核通过后才交付；发现风险时，根据情况脱敏、阻断、生成安全替代回答或转人工。修改后的内容仍需要再次审核，不能把原始风险内容直接发给用户。</span></li></ul>

<p id="f-doxcnqsyrSIDcTZEJRqztXfWj2g"><span>最后，用越狱、提示注入、越权调用和泄密案例做上线前测试与持续回归，监控漏拦率和误拒率。 </span><span style="font-weight:bold">安全不能承诺百分之百，而是通过分层防护降低风险，并限制出问题后的影响范围。</span></p>

<p id="f-doxcnaLh8yYOT2tbDt6G1nnJmsg"><span style="font-weight:bold">总结：输入侧防带偏，工具侧防越权，输出侧防有害内容和泄密；安全边界由系统落实，不能只依赖模型自觉。</span></p>

<a id="f-doxcnKbCc4KD15e69ydJhcLlR6c"></a>

###### 视频讲解

<p id="f-doxcnsIgcrFEBoferdlM0aNC5rf"><span>ClaudeCode权限系统/安全机制保姆级拆解</span></p>

<p id="f-doxcnXHr785ybtRy6moGktLj9kd"><span><span><a href="https://www.bilibili.com/video/BV1jjdEBSEx1/"><span>https://www.bilibili.com/video/BV1jjdEBSEx1/</span></a></span></span></p>

<a id="f-doxcnkaFwIVwpBjWdFmhfArmEgb"></a>

##### 成本追踪与速率限制

<p id="f-doxcnxkSHyX5lxSwZLvvtrXCRue"><span>一个成熟的 Agent 产品和一个玩具项目的核心区别之一，就是有没有完善的</span><span style="font-weight:bold">成本控制机制</span><span>。你自己做项目可能不太关心花了多少 token，但是一个商业产品必须精确追踪每一次 API 调用的消耗，同时要避免用户在不知情的情况下撞上配额或烧掉大量额度。</span></p>

<p id="f-doxcnPGNXxaR2EaDCqjgz0CQB7f"><span>这也是 Agent 面试里很容易被追问的一类问题：</span></p>

<p id="f-doxcnLMxtocDJ3D3sYiLHFUs39t"><span>- </span><span style="font-weight:bold">你的 Agent 如何控制成本？</span></p>

<p id="f-doxcn1GMLKES2UoIBRXJN060A7H"><span>- </span><span style="font-weight:bold">如何监控每次调用和每个会话的成本？</span></p>

<p id="f-doxcnFWJinrAs4aLjlzaI1NJUb8"><span>- </span><span style="font-weight:bold">如何防止用户一次任务把 token 预算打爆？</span></p>

<p id="f-doxcnvcbw3LgHkNFwX3eWzNHxvd"><span>- </span><span style="font-weight:bold">如果用户快被限流了，你的系统怎么提前感知？</span></p>

<p id="f-doxcns2tC8YALL6F2ci4GqUHsIh"><span>很多人回答这类问题时只会说“设置 `max_tokens`”或者“限制调用次数”，这其实不够。真正产品级的成本控制，至少要同时回答两个问题：</span><span style="font-weight:bold">能不能继续用</span><span>，以及</span><span style="font-weight:bold">已经消耗了多少</span><span>。所以这一节不只是分析 Claude Code 的源码，也是在提炼一套我们自己做 Agent 项目时可以复用的成本监测设计。</span></p>

<p id="f-doxcn2tpx1ZPMKDpKzuo8Xeh91f"><span>Claude Code 的成本控制可以用一个很简单的框架理解：</span><span style="font-weight:bold">一边限制速率，一边限制花费</span><span>。</span></p>

<p id="f-doxcnWrx2fcP2quQlA2ClWr0Q22"><span>- </span><span style="font-weight:bold">限制速率</span><span>：回答“按当前消耗速度，还能不能继续调 API”。它关注账号配额、时间窗口、配额消耗速度、限流状态，以及限流后的处理策略。</span></p>

<p id="f-doxcnrpO1aDpCSwdxf6RZYq0yCd"><span>- </span><span style="font-weight:bold">限制花费</span><span>：回答“这次以及这个会话消耗了多少”。它关注 token 用量、模型单价、缓存读写成本、单次查询预算，以及会话级累计。</span></p>

<p id="f-doxcnmZ9TYZq9j8sDENQaNXUBDh"><span>这两条线合在一起，构成 Claude Code 的成本闭环：前者防止用户把账号配额用爆，后者防止一次会话或一次查询无节制地消耗 token。</span></p>

<p id="f-doxcnmIYHbd49YEBqPFPmvBdK3d"><span>读完这一节，应该能得到两类收获：</span></p>

<p id="f-doxcnRDPaowR6YjCptVWAn6DMOG"><span>1. </span><span style="font-weight:bold">面试回答思路</span><span>：当面试官问“Agent 如何做成本控制”时，可以从速率限制、实时计费、缓存成本、预算保护、会话持久化几个角度系统回答。当面试官问你，如何防止Agent进入无限循环，无限消耗TOKEN时，我们也能够借助今天的问题有一个回答。我也会结合今天的知识，总结一些常见的面试问题。</span></p>

<p id="f-doxcnE2tSpWD6OxbAw36OnU2Jxf"><span>2. </span><span style="font-weight:bold">项目设计启发</span><span>：首先我们要有一个意识，就是我们在做自己的Agent项目的时候，需要考虑成本模块。所以你最好能够在你的项目中设计出一个模块专门负责成本控制的。另一方面成本控制模块也可以从两个方面，比如设计两个类。一类专门统计速率，按照现在的消耗，是否需要限速，需要提示消耗过多，及时提醒？第二个类统计花费，持久化每一次请求工作的Token消耗，并从输入、输出、缓存读写、网页搜索、模型维度等方面去统计。这些就是看完本篇给我们的启示。</span></p>

<a id="f-doxcn3ls8p4H9eh7TE4gxfZaqre"></a>

###### 总览：两条成本控制路线

<p id="f-doxcnlKr335txLiwMMrFLjF56ne"><span>调用LLM的API 响应回来以后，Claude Code 会从两个方向处理成本问题：</span></p>

<pre id="f-doxcnIScXUaUX66wqGQLfKBJK4b"><code>API 响应返回
├─ 路线一：限制速率（当前配额消耗速度是否正常）
│  ├─ 输入：服务端返回的配额/限流信号
│  ├─ 处理：解析多时间窗口配额 + 判断消耗速度
│  ├─ 状态：汇总成统一的配额状态
│  └─ 输出：限流状态、提前预警、额外用量/升级/等待策略、企业策略限制
│
└─ 路线二：限制花费（这次到底消耗了多少）
  ├─ 输入：usage token/tool 计数
  ├─ 处理：按模型价格把 usage 换算成费用
  ├─ 状态：费用累加到会话状态 + 按模型统计
  └─ 输出：会话成本累计、Token Budget、保存/恢复</code></pre>

<p id="f-doxcnY7MfPcGWarutLzRNVJopKe"><span>一般讲到成本，我们通常会先想到 token 花费，但 Claude Code 这里其实把问题拆成了两层：</span><span style="font-weight:bold">按当前速度，服务端配额还能不能继续支撑使用</span><span>，以及</span><span style="font-weight:bold">客户端已经花了多少钱，具体来讲：</span></p>

<p id="f-doxcninHkkhDHz1SfrkeCWVUBNn"><span>1. </span><span style="font-weight:bold">速率 / 配额问题</span><span>：用户的订阅或账号额度是不是快被服务端限制了？如果快被限制，系统如何提前知道？如果已经被拒绝，系统如何决定下一步？</span></p>

<p id="f-doxcn7TBaJDuzqf94lRcJbTgxLg"><span>2. </span><span style="font-weight:bold">花费 / 账单问题</span><span>：本次调用用了多少 token？按当前模型价格折算多少钱？这个会话累计花了多少？单次查询有没有继续跑下去的必要？</span></p>

<p id="f-doxcnoTkBzbvyeB2XizNOi8E2Dc"><span>换句话说，速率路线关心的是 </span><span style="font-weight:bold">quota 按当前消耗速度是否还能支撑继续调用</span><span>；花费路线关心的是 </span><span style="font-weight:bold">usage 如何换算成成本并累计到会话</span><span>。前者主要读服务端返回的限流/配额信号，后者主要读响应里的 usage 统计。</span></p>

<blockquote id="f-doxcnHUuMmPKJVRePploWdEhNXc"><p id="f-doxcn6sHGpjjTomv6VjZQgGmZYg"><span style="font-weight:bold">项目启发</span><span>：做 Agent 成本控制时，不要只设计一个“费用统计器”。更合理的拆法是：一个模块负责</span><span style="font-weight:bold">配额/速率状态</span><span>，一个模块负责</span><span style="font-weight:bold">token/费用累计</span><span>。两者数据源不同、处理逻辑不同、触发的保护动作也不同。</span></p>
</blockquote>

<p id="f-doxcnFsu5EUi3CbBJF0ksk5cbtb"><span>下面就按照这两条路线展开。</span></p>

<a id="f-doxcnhmqlFebZqQM3Vc4nPbb3Ch"></a>

###### 路线一：限制速率

<p id="f-doxcnjJuS8MgeMGajDD3PO6GpWd"><span>这里的“速率”不是传统意义上的“每分钟最多访问多少次 API”。它更接近 </span><span style="font-weight:bold">quota burn rate（配额消耗速度）</span><span>：按照当前消耗速度，用户离额度上限还有多远？是在正常消耗，还是消耗得太快？</span></p>

<p id="f-doxcnAq0i6UpyDFJyba9iz1lDKh"><span>所以速率路线的目标是：</span><span style="font-weight:bold">在服务端真正拒绝请求之前，尽早感知配额消耗速度是否异常；如果已经被限流，就给出可执行的处理策略</span><span>。它不是一堆零散判断，而是一条连续流程：</span></p>

<pre id="f-doxcnFFcR6llZzT9CZ9TJFkMR5c"><code>API 调用完成
  ↓
读取服务端配额信号
  ↓
整理成统一的配额状态
  ↓
按短期 / 长期 / 模型等维度判断风险
  ↓
判断当前消耗速度是正常还是偏快
  ↓
如果按当前速度可能提前耗尽：提前预警
  ↓
如果已经被限制：给出等待、加额度、升级、组织协作等处理策略
  ↓
企业策略再做一层能力管控</code></pre>

<p id="f-doxcncEU8ShNHhmHlBD96f8urnb"><span>下面按这个流程来看：</span></p>

<ol start="1"><li id="f-doxcnlS43H4NrFGI4HbIQlpU9Md"><span style="font-weight:bold">API 调用后读取服务端配额信号</span></li></ol>

<p id="f-doxcngTpu5XgEpv3aytWxZkUwwg"><span>Claude Code 不靠客户端自己猜“用户还能不能继续用”。每次 API 调用之后，服务端都会把当前账号的配额状态返回给客户端。客户端要先读到这些信号，才能知道当前请求到底处于哪种状态：</span></p>

<ul><li id="f-doxcnjgwi72JUrvHAaGhBidLiwh"><span>还能正常继续调用；</span></li></ul>

<ul><li id="f-doxcnwRp3qLFOezX1VL39W4Cyme"><span>已经接近某个额度上限；</span></li></ul>

<ul><li id="f-doxcnY5kjIk1HfjSWMqTQ2WbnSe"><span>已经被服务端限制；</span></li></ul>

<ul><li id="f-doxcnuVlFerut7I46pjAZ8nLNzg"><span>虽然基础额度不足，但可能还有额外用量、升级或等待恢复等路径。</span></li></ul>

<p id="f-doxcnsxxbUB1YUfRi6up2JnKNAg"><span>这一层解决的是“信息来源”问题：</span><span style="font-weight:bold">配额状态必须以服务端判断为准，而不是客户端自己估算</span><span>。因为真正决定能不能继续调用的，是服务端的账号、订阅、组织和额度系统。</span></p>

<ol start="2"><li id="f-doxcnzkqOjbbz0s8WcztA8akl3f"><span style="font-weight:bold">把零散信号整理成统一状态</span></li></ol>

<p id="f-doxcnHDF1bwGAg7FaBNv23jfnwc"><span>读到配额信号以后，Claude Code 不会让上层业务到处自己判断，而是先把它们整理成统一的配额状态。这个状态只需要回答三个问题：</span></p>

<p id="f-doxcnjg638jvqA2Mv6GMcbaHKcb"><span>- </span><span style="font-weight:bold">当前是否可用</span><span>：还能不能继续调用。</span></p>

<p id="f-doxcnRZMk8R5bnuCVzOpRD0z7zg"><span>- </span><span style="font-weight:bold">风险在哪里</span><span>：是短期额度、长期额度，还是某类高价模型额度有风险。</span></p>

<p id="f-doxcnyiSTXX5qR2J5pwW6sAEY3d"><span>- </span><span style="font-weight:bold">下一步怎么办</span><span>：继续、提醒、等待、申请额度、升级，还是换一种执行策略。</span></p>

<p id="f-doxcnVWGXRYnaMQKTyhzEEvPRse"><span>这一步很关键。因为后面的提前预警、限流处理、任务调度，都不应该直接面对一堆底层信号，而应该面对一个统一状态。否则每个模块都会写一套判断逻辑，最后很容易不一致。</span></p>

<ol start="3"><li id="f-doxcnqKK2pocTbgVdYRBXu8xhQe"><span style="font-weight:bold">多个维度判断配额消耗速度</span></li></ol>

<p id="f-doxcnWclRdidfb0lP5ew9FRZm1D"><span>有了统一状态以后，Claude Code 会继续判断“当前消耗速度是否合理”。它不是只看一个“总额度”，而是把配额拆成多个维度：</span></p>

<p id="f-doxcnVtFnPslrvn10U2jewovSig"><span>- </span><span style="font-weight:bold">短期窗口</span><span>：防止短时间内爆发式调用，把额度瞬间打满。</span></p>

<p id="f-doxcn2WYhSIFh9yLBnDC39wHpie"><span>- </span><span style="font-weight:bold">长期窗口</span><span>：防止一个周期内总用量持续失控。</span></p>

<p id="f-doxcn4dNYxsaujhol7mmOuWIAZb"><span>- </span><span style="font-weight:bold">模型维度</span><span>：防止高价模型被过度使用。</span></p>

<p id="f-doxcn3dmZJwqbDaOsBtRodijijh"><span>- </span><span style="font-weight:bold">额外用量</span><span>：判断基础额度不足后，是否还能进入兜底付费路径。</span></p>

<p id="f-doxcnBNeurQ8pp02dio6LFcpM2f"><span>所以速率控制不是简单的“限制调用次数”，也不是只问“现在用了多少”。它真正关心的是：</span><span style="font-weight:bold">按照当前速度继续用，会不会比预期更早撞上上限</span><span>。短期窗口看短时间内是不是烧得太快，长期窗口看整个周期内是不是会提前耗尽，模型维度看高价模型是不是消耗过快，额外用量则决定额度耗尽后的补救路径。</span></p>

<ol start="4"><li id="f-doxcn4l9TVx79579vYUBgcD99jc"><span style="font-weight:bold">如果消耗速度偏快，就提前预警</span></li></ol>

<p id="f-doxcnlSiMZ8Askv8F2iMFJpKtbg"><span>如果服务端还没有真正拒绝请求，但系统发现消耗速度过快，就会进入提前预警。这里的判断逻辑不是只看“用了多少”，而是看“用掉这些额度时，时间才过去了多少”。</span></p>

<p id="f-doxcnNcb1GbVxv9iKQ5P1At6ZKe"><span>核心思想是：</span><span style="font-weight:bold">使用率高 + 时间还早 = 消耗过快</span><span>。同样是用掉一部分额度，如果发生在周期刚开始，说明后面很可能会提前耗尽；如果发生在周期快结束，就不一定危险。</span></p>

<p id="f-doxcnzhshOrdjgPQtrwyvkfT0hc"><span>所以提前预警做的是中间层保护：它不是直接阻止用户，也不是等到服务端拒绝才处理，而是在“还能用，但按当前速度会提前耗尽”的阶段提醒用户调整节奏。</span></p>

<ol start="5"><li id="f-doxcnIoWLO6zpSULVZVNf9x9Wyg"><span style="font-weight:bold">如果已经被限流，就给出下一步策略</span></li></ol>

<p id="f-doxcnEy6nQpFvn062vVxz38SYoe"><span>如果请求已经被服务端限制，Claude Code 也不是简单报错退出，而是把“不能继续”进一步翻译成“接下来能做什么”。常见处理路径包括：</span></p>

<p id="f-doxcntTRUyU4ZYfT8wsJWQzhtTe"><span>- </span><span style="font-weight:bold">等待恢复</span><span>：告诉用户什么时候可以继续，避免无意义重试。</span></p>

<p id="f-doxcnSGkF1LbKZlqetwCAlz6f5b"><span>- </span><span style="font-weight:bold">增加额度</span><span>：如果账号支持额外用量，引导用户进入额外用量路径。</span></p>

<p id="f-doxcn1xqirfpZYVCwbIZlH3IpEg"><span>- </span><span style="font-weight:bold">升级计划</span><span>：如果当前套餐额度不够，引导用户升级。</span></p>

<p id="f-doxcnCBCA2ryal6O8dp2DivY2kg"><span>- </span><span style="font-weight:bold">组织协作</span><span>：如果是团队或企业账号，可能需要管理员开通额度或调整组织策略。</span></p>

<p id="f-doxcnIICzOOZLHBWGNlGLggR2dc"><span>- </span><span style="font-weight:bold">调整任务</span><span>：降低任务规模、换低价模型、拆分任务，减少继续撞限流的概率。</span></p>

<p id="f-doxcnxzp4bQeBPMWSRm1woaEeVk"><span>这里的产品价值是：系统不仅知道“不能继续”，还知道“为什么不能继续”以及“下一步怎么继续”。这比简单返回一个错误码更符合 Agent 产品的使用场景。</span></p>

<ol start="6"><li id="f-doxcnoUOuh0zW5yRqR9UN2dSiVb"><span style="font-weight:bold">企业策略做更高层的能力管控</span></li></ol>

<p id="f-doxcnXIYCS0gz8ZXXHIISbPZhhf"><span>最后，Claude Code 还会叠加一层企业策略。它和 API 配额不是同一层问题：配额回答“额度够不够”，企业策略回答“组织允不允许”。</span></p>

<p id="f-doxcniuyWwJxFbQHQDQ05EdqyRb"><span>比如企业可能允许普通对话，但限制远程执行、外部工具、高价模型或敏感数据相关能力。这类策略一般需要服务端统一配置、客户端本地缓存、定期刷新，并且在策略服务不可用时有明确的降级原则：普通能力可以尽量不阻塞，合规或敏感能力则应该更保守。</span></p>

<p id="f-doxcniDcw8oZYNThZbDNZwt8Uid"><span style="font-weight:bold">小结：这一条速率路线的核心特点可以概括成四个词：</span></p>

<p id="f-doxcnLko5xgkrABZ9q3MhA6ElZd"><span>1. </span><span style="font-weight:bold">服务端可信</span><span>：能不能继续调用，以服务端配额状态为准。</span></p>

<p id="f-doxcnd3bSdy2vw5duxwYfghZgzc"><span>2. </span><span style="font-weight:bold">状态统一</span><span>：不要到处散落判断，先汇总成统一配额状态。</span></p>

<p id="f-doxcnkfku7qSmz4JXfHLTJqlwrc"><span>3. </span><span style="font-weight:bold">分层判断</span><span>：短期、长期、模型、额外用量分开看，判断当前消耗速度是否偏快。</span></p>

<p id="f-doxcnObJk5jMmZXyYAzZ2Kvng4f"><span>4. </span><span style="font-weight:bold">可执行处理</span><span>：预警和限流都要给出下一步，而不是只报错。</span></p>

<blockquote id="f-doxcnnOx0BbbYtalpnXJatxoRih"><p id="f-doxcnQripiLs4qubTCUqmYhKC0b"><span style="font-weight:bold">项目启发</span><span>：做自己的 Agent 时，可以把速率控制设计成一个独立的 `Rate Limit Manager`：它负责读取服务商配额信号、归一化状态、多维度判断消耗速度、触发预警、处理真正限流，并和组织策略联动。这样任务调度、重试、降级、提醒都会围绕同一条流程展开，而不是散落在各个模块里。</span></p></blockquote>

<a id="f-doxcnVo7CndusQUgoY5FerhTXsu"></a>

###### 路线二：限制花费

<p id="f-doxcnf6JCB0PYDYqQeSU5ZvMmyb"><span>花费路线的目标是：</span><span style="font-weight:bold">把每次 API 调用产生的 token / 工具 / 缓存消耗，换算成可理解、可累计、可控制的会话成本</span><span>。它和速率路线一样，也不是几个孤立功能，而是一条连续流程：</span></p>

<pre id="f-doxcnwbBSausOlZ8TzVzu28aUkd"><code>API 调用完成
  ↓
读取本次调用的 usage
  ↓
拆成输入、输出、缓存、工具等账单项
  ↓
按模型价格换算成本
  ↓
累加到会话级成本状态
  ↓
用 Token Budget 判断单次查询是否值得继续
  ↓
把会话成本保存下来，下一次恢复</code></pre>

<p id="f-doxcnDGiqtJloDbyUe40wRPVy1e"><span>下面按这个流程来看：</span></p>

<ol start="1"><li id="f-doxcnPcU4CG10uisomXWOMr2aXe"><span style="font-weight:bold">API 调用后读取 usage</span></li></ol>

<p id="f-doxcn7HFtHR775vW69cyoSt75fb"><span>花费路线的起点，是每次模型调用结束后拿到本次调用的 usage。这里的 usage 不只是一个“总 token 数”，而是成本计算的原始账单数据。</span></p>

<p id="f-doxcnSruLhWFqSJgGaMJR2d6Oeg"><span>从 Claude Code 的统计口径看，它关心的不是“这次一共用了多少 token”这么粗的数字，而是会把 usage 拆成几类消耗来源：</span></p>

<p id="f-doxcncLJJ9dniR3bHUxnhP3xfpe"><span>- </span><span style="font-weight:bold">输入 token</span><span>：这次请求送进模型的上下文有多长。</span></p>

<p id="f-doxcnGZMhL7PN0OFlrYv5djJaWb"><span>- </span><span style="font-weight:bold">输出 token</span><span>：模型这次生成了多少内容。</span></p>

<p id="f-doxcnkdHOB7OZC0F2Gl7ZKRrWib"><span>- </span><span style="font-weight:bold">缓存读取 token</span><span>：有多少上下文是从缓存里复用的。</span></p>

<p id="f-doxcnenbq3X5KBQPwQKmAHLo82e"><span>- </span><span style="font-weight:bold">缓存写入 token</span><span>：有多少上下文被写入缓存，供后续复用。</span></p>

<p id="f-doxcnuV4cbX2U36lq6HhuHj7lmh"><span>- </span><span style="font-weight:bold">网页搜索次数</span><span>：本次调用是否触发了额外计费的搜索能力。</span></p>

<p id="f-doxcnJpGrEuKJg5nDCGLKEPtz7d"><span>- </span><span style="font-weight:bold">模型名称</span><span>：这些 token 是在哪个模型上消耗的。</span></p>

<p id="f-doxcnXPpCavf3BLGlDCBbMIeISd"><span>- </span><span style="font-weight:bold">本次费用</span><span>：这些消耗按当前模型价格折算后是多少钱。</span></p>

<p id="f-doxcnRijV84Bi6d3pfw9fX7ZV0e"><span>这一层解决的是“成本数据从哪里来”的问题：</span><span style="font-weight:bold">没有结构化 usage，就没有后面的计费、累计、预算和优化</span><span>。</span></p>

<p id="f-doxcnV0dVebz7FI6siMmkBPPtYe"><span>所以 Claude Code 总结 usage 的第一步，其实是在回答：</span><span style="font-weight:bold">这次模型调用的钱，到底花在输入、输出、缓存、搜索，还是高价模型上？</span></p>

<ol start="2"><li id="f-doxcnb2J5JjtUd1VLHsTAzuONVi"><span style="font-weight:bold">把 usage 拆成可计费的账单项</span></li></ol>

<p id="f-doxcnncojubg753s1HHDnOy3Fee"><span>读到 usage 之后，Claude Code 会把一次调用拆成多个账单项，而不是只记录一个 token 总数：</span></p>

<p id="f-doxcnwUsfTM0xCy64viSJMZnezd"><span>- </span><span style="font-weight:bold">输入 token</span><span>：输入越长，上下文成本越高。</span></p>

<p id="f-doxcnRTcF2Tf8kxEI8DVqIyrelc"><span>- </span><span style="font-weight:bold">输出 token</span><span>：输出通常比输入更贵，长回答会明显增加成本。</span></p>

<p id="f-doxcn7B8i5FInceLJJRQ1wdfabc"><span>- </span><span style="font-weight:bold">模型类型</span><span>：不同模型单价不同，高价模型需要单独观察。</span></p>

<p id="f-doxcnx0r0x7YRkYoWztIhXOHLhe"><span>- </span><span style="font-weight:bold">服务端工具</span><span>：网页搜索这类能力可能有额外计费。</span></p>

<p id="f-doxcnbpKJivE1wgdM6RjMLj1iwe"><span>- </span><span style="font-weight:bold">缓存读写</span><span>：缓存命中和缓存写入的成本差异很大。</span></p>

<p id="f-doxcnr19Em5LST5h6iUKaaaVZtc"><span>这一步的意义是把“模型调用”变成“结构化账单”。只有账单项拆得足够清楚，后面才能知道成本到底来自哪里：是输入上下文太长，输出太多，高价模型用太频繁，还是搜索和缓存策略没有设计好。</span></p>

<blockquote id="f-doxcnShGUrEuWqiPiC5L2jtb8jf"><p id="f-doxcnmKQxH03LptZDj5JSNYZ7be"><span style="font-weight:bold">项目启发</span><span>：我们自己做项目时，不能只说“我要统计 token”，还要说清楚统计哪些 token（比如输入，输出，Tool,SKILL）等、按什么维度聚合、最后要回答什么成本问题。</span></p></blockquote>

<ol start="3"><li id="f-doxcniqI3U96CytOb4uXtHp8rfb"><span style="font-weight:bold">按模型价格换算成真实成本</span></li></ol>

<p id="f-doxcnCa35GAQ8lpdsEeGtue6qOc"><span>有了账单项之后，Claude Code 会结合模型价格，把 token、缓存和搜索消耗换算成金额。这里要注意两点：</span></p>

<p id="f-doxcnXqcUM0rHQRAXM8x7FhknSf"><span>第一，</span><span style="font-weight:bold">不同模型价格不同</span><span>。同样的 token数，用在便宜模型和高价模型上，最终成本可能完全不同。所以成本计算必须带上模型维度，不能只看 token总数。</span></p>

<p id="f-doxcnsysn8XGCX5aky1C8ZHWjnc"><span>第二，</span><span style="font-weight:bold">缓存也要进入成本模型</span><span>。缓存写入通常更像一次“前期投入”，后续缓存读取才是“节省成本”。所以 Prompt Cache 不能只当作性能优化，它本身也是成本模型的一部分。</span></p>

<p id="f-doxcnnFqbhs5ik7QkwmyH8cVdze"><span>完整公式不需要记具体数字，只要抓住一个原则：</span><span style="font-weight:bold">总费用 = 输入成本 + 输出成本 + 缓存写入成本 + 缓存读取成本 + 搜索等额外成本</span><span>。如果遇到未知模型，也应该有默认估算和异常记录，避免成本计算直接断掉。</span></p>

<ol start="4"><li id="f-doxcnedplyCnseJiin1K5OwDgUg"><span style="font-weight:bold">累加到会话级成本状态</span></li></ol>

<p id="f-doxcnPzVLeRbZp5MbVc1rKcxGjd"><span>单次调用算完以后，费用不会只停留在这一轮请求里，而是会累加到会话状态。Claude Code 这里有一个很重要的设计：</span><span style="font-weight:bold">它不是只维护一个总费用，而是按模型维护一份 usage 汇总</span><span>。</span></p>

<p id="f-doxcn2B1Lz8trgJgDgnGncpfYof"><span>也就是说，每个模型都会有自己的结构化账单，大致包括：</span></p>

<p id="f-doxcnbcPNYUWenvi82T4ITJEhBd"><span>- </span><span style="font-weight:bold">输入 token 总数</span><span>：这个模型一共吃进了多少上下文。</span></p>

<p id="f-doxcn3CdeKbswFuG1OUCjkWIzef"><span>- </span><span style="font-weight:bold">输出 token 总数</span><span>：这个模型一共生成了多少内容。</span></p>

<p id="f-doxcni3JTGV41qQn1zgTgtA9BBh"><span>- </span><span style="font-weight:bold">缓存读取 token 总数</span><span>：这个模型复用了多少缓存上下文。</span></p>

<p id="f-doxcngS0CHedGuZetd6C2T1Frub"><span>- </span><span style="font-weight:bold">缓存写入 token 总数</span><span>：这个模型创建了多少缓存上下文。</span></p>

<p id="f-doxcnuCrD8x2PIMUNMw6wQ87Oyh"><span>- </span><span style="font-weight:bold">网页搜索次数</span><span>：这个模型触发了多少次搜索类额外成本。</span></p>

<p id="f-doxcn7YItTkNAH5Z8eAlK3PpM6d"><span>- </span><span style="font-weight:bold">成本总额</span><span>：这个模型累计花了多少钱。</span></p>

<p id="f-doxcnnU97timv1Ph79SpeFkb1Cf"><span>- </span><span style="font-weight:bold">上下文窗口 / 最大输出能力</span><span>：这个模型本身的容量边界。</span></p>

<p id="f-doxcnxUJ6HoxE6G1wiir8Wl6pPb"><span>在这个基础上，会话级追踪再把各个模型的账单汇总起来：</span></p>

<pre id="f-doxcnaMgbgf6QFU6g0bMaQX81Ic"><code>会话级追踪：
├── 总费用
├── 总输入 / 输出 token
├── 缓存读取 / 缓存写入 token
├── 网页搜索次数
├── 工具耗时
├── API 调用耗时和重试成本
├── 代码修改规模
└── 按模型分类的使用量</code></pre>

<p id="f-doxcnYqCdVvsMPy9rsBk57Fz8tg"><span>这一步解决的是“成本归属”问题。只看全局总成本是不够的，至少要能回答：这个会话花了多少钱？哪个模型最贵？输入贵还是输出贵？缓存有没有省钱？搜索有没有带来额外成本？哪类任务最容易爆预算？</span></p>

<ol start="5"><li id="f-doxcnGc8F531Ic60m4zQ68VJade"><span style="font-weight:bold">用 Token Budget 判断单次查询是否值得继续</span></li></ol>

<p id="f-doxcnylfAATLT45KOYkqnQmMU2X"><span>会话级累计解决的是“已经花了多少”，但还不够。Agent 最大的问题是：一次任务可能不断续跑、不断调用工具、不断扩上下文，最后在用户没注意的时候消耗大量 token。</span></p>

<p id="f-doxcnfmHBeiW8Y0HjDRVTi7Pc9b"><span>所以 Claude Code 还有单次查询级别的预算管理。它不只是看“有没有超过上限”，还会看“继续跑有没有收益”：</span></p>

<ul><li id="f-doxcnxcpZ9JcCe7aHrmDS8J0Use"><span>如果预算还比较充足，而且本轮输出仍然有明显增量，就允许继续。</span></li></ul>

<ul><li id="f-doxcnqfGZUkSk5CGPtOYW6QqP9g"><span>如果已经接近预算上限，就停止继续消耗。</span></li></ul>

<ul><li id="f-doxcnyRlRfEykNZfWjiQtOMEtYM"><span>如果连续几轮输出增量都很低，说明进入收益递减，也应该停止。</span></li></ul>

<p id="f-doxcnqPCdaZhhgKCTFGtEeOpLig"><span>这一步的关键是：</span><span style="font-weight:bold">成本控制不能只看上限，还要看收益</span><span>。如果模型已经在原地打转，哪怕还没完全用完预算，也应该及时停下来，让用户重新确认方向。</span></p>

<blockquote id="f-doxcnIPGMWyzbpeylMXlZlnhHIe"><p id="f-doxcnkQVU0pNrgWsg8LEfDmJsMg"><span>这里对我们也是一个很好的启示。就是我们怎么防止Agent无限调用。我们知道我们讲的ClaudeCode也好，Openclaw也好，它内部用了React,是自己在循环中思考，推理的。所以如何防止他无限调用呢？设置最大次数可以认为大家都可以想到吧，但是看到这里，我们就有了新的思路：可以从预算以及输出增量的角度，前者从成本上控制，后者从收益上控制是否需要继续迭代。我也会将这个思路总结到后面面试题中。</span></p></blockquote>

<ol start="6"><li id="f-doxcnmfEEZf7zz1C07jO8MlsMhd"><span style="font-weight:bold">保存并恢复会话成本</span></li></ol>

<p id="f-doxcnqtBXawI939IiqyQWURWmrc"><span>最后，费用数据不能只存在内存里。Claude Code 会把会话费用保存到本地，确保终端关闭或会话切换后，成本统计不会直接丢失。</span></p>

<p id="f-doxcnLueb2wSsJeMQHtZWkybw9e"><span>保存的重点不是某个具体字段，而是保留会话成本上下文：累计费用、token 用量、模型分布、工具耗时、任务规模、会话 ID 等。恢复时再通过会话 ID 判断是不是同一个会话：如果匹配，就接着之前的成本状态继续累计；如果不匹配，就从零开始，避免串账。</span></p>

<p id="f-doxcnlvOX5P91jxu57IC0v9i7ib"><span>这一步解决的是“成本连续性”问题：用户关掉终端再回来，仍然能接上同一个会话的成本上下文。</span></p>

<p id="f-doxcnqm1mQycCUXNIQbzyABo9qf"><span style="font-weight:bold">小结</span></p>

<p id="f-doxcn60chcgnZKwI4cxzooQ8qWc"><span style="font-weight:bold">这一条花费路线的核心特点可以概括成四个词：</span></p>

<p id="f-doxcnKV3UrXTckGKN0yEoNoKJPe"><span>1. </span><span style="font-weight:bold">账单结构化</span><span>：每次调用都拆成输入、输出、缓存、工具、模型等账单项。</span></p>

<p id="f-doxcnZE6KNh7LrWcX8DKzAWPcRc"><span>2. </span><span style="font-weight:bold">价格模型化</span><span>：不同模型、缓存读写、网页搜索等额外消耗要进入同一套成本公式。</span></p>

<p id="f-doxcneQBnreyHobDdvfISxUq3nj"><span>3. </span><span style="font-weight:bold">会话可观测</span><span>：成本要按会话、模型、工具、任务类型累计，而不是只记总数。</span></p>

<p id="f-doxcnAFEG2NR6wCFNSFnAJtlxrc"><span>4. </span><span style="font-weight:bold">预算可中断</span><span>：单次任务不仅看是否超预算，还要看继续运行是否还有收益。</span></p>

<blockquote id="f-doxcnnwSBznvKtdH0nEbpy4AVth"><p id="f-doxcn8EEpLjsh4supJOWlFfiCDd"><span style="font-weight:bold">项目启发</span><span>：做自己的 Agent 时，可以把花费控制设计成一个独立的 `Cost Manager`：它负责采集 usage、拆账单项、换算费用、按会话累计、判断单次任务是否值得继续，并把成本状态持久化。这样成本控制就不只是日志，而是能参与任务停止、模型选择、缓存优化和后续分析的产品能力。</span></p></blockquote>

<p id="f-doxcnJel1SKj8uZ6TU4aS3NJN5b"><span style="font-weight:bold">4.4.5.4 设计思想总结</span></p>

<p id="f-doxcn6pvU7ZsxOLgxiESTiQrqkb"><span>现在再回到最开始的主线：Claude Code 的成本控制其实就是两条路线。</span></p>

<pre id="f-doxcngTpbvJBGUuyXgbbT0xvmOh"><code>限制速率：控制“按当前速度还能用多久”
  - 多时间窗口配额
  - 配额消耗速度判断
  - 提前预警
  - 限流后的升级 / 额外用量 / 等待策略
  - 企业策略限制

限制花费：控制“已经消耗了多少”
  - usage 实时计费
  - 模型定价表
  - Prompt Cache 读写成本
  - 会话级累计
  - Token Budget
  - 会话费用持久化与恢复</code></pre>

<p id="f-doxcn5HbsZa6b22d2bMVeHkCvXd"><span>这两个方向解决的是不同问题：</span></p>

<p id="f-doxcn0ndxIxArQnhlgthbBNK5te"><span>- </span><span style="font-weight:bold">速率路线</span><span>更像“配额消耗速度保护”：判断用户按当前速度会不会提前撞上限流墙。</span></p>

<p id="f-doxcnkyBVOP7Q2ternOvv6OYZZg"><span>- </span><span style="font-weight:bold">花费路线</span><span>更像“账单保护”：防止一次调用、一次会话、一次查询无节制地消耗。</span></p>

<p id="f-doxcnTcB9qzYbEieOX3hYItRTGh"><span>面试时如果被问“Agent 项目怎么做成本控制”，可以按这个框架回答：</span></p>

<p id="f-doxcnVzCzEG3M5xJLLGPw8zM49f"><span>1. </span><span style="font-weight:bold">先分两条线</span><span>：限制速率 + 限制花费，不要混在一起讲。</span></p>

<p id="f-doxcnvIxyewaZvI65s9NH8dsy7e"><span>2. </span><span style="font-weight:bold">限制速率</span><span>：服务端给出配额状态，客户端结合时间窗口判断消耗速度是否偏快，提前预警，并在限流后提供升级/额外用量/等待策略。</span></p>

<p id="f-doxcnJgEbRCNiXonAn726DJlI2e"><span>3. </span><span style="font-weight:bold">限制花费</span><span>：每次 API 调用后用 usage + 模型定价表算成本，包含 Prompt Cache 和网页搜索等额外成本，按会话/模型累计。</span></p>

<p id="f-doxcnLfnJHOL4ovPEYNwm4xljUc"><span>4. </span><span style="font-weight:bold">加预算控制</span><span>：单次查询 Token Budget、会话级累计、会话持久化恢复。</span></p>

<p id="f-doxcn6FiPdzjt5Qad5WmrAeGiu3"><span>5. </span><span style="font-weight:bold">企业管控</span><span>：团队或企业场景下，还可以通过组织策略远程禁用特定能力。</span></p>

<p id="f-doxcn7i0JA0CQaAH2T6aZ5XWqMT"><span>这样讲比单纯说“设一个 max_tokens”更完整：它同时覆盖了配额、成本、预算和企业管控。</span></p>

<a id="f-doxcnqX0JY4QTdh1hU1tefG7Q3d"></a>

###### 面试问题汇总

<p id="f-doxcnKPrIwPgy5Us9OYb4GHluKd"><span style="font-weight:bold">Q1：你的 Agent 如何做成本控制？</span></p>

<p id="f-doxcnVS8q2kPa7VDalMqydnIleh"><span>可以先把成本控制拆成两条线：</span><span style="font-weight:bold">限制速率</span><span>和</span><span style="font-weight:bold">限制花费</span><span>。</span></p>

<p id="f-doxcnmRSPYak3kEllN5M2ZIzZkd"><span>第一条线是速率检测，负责判断配额消耗速度。系统会读取服务商返回的配额状态，结合短期、长期、模型等窗口判断当前消耗是否偏快，以及按这个速度继续使用会不会提前撞上服务端配额上限。如果只是接近风险区间，就提前预警；如果已经被限流，就给出等待恢复、增加额度、升级计划或调整任务的处理策略。</span></p>

<p id="f-doxcnosihQDhVHb2mVdiPYw9GF6"><span>第二条线是花费统计，负责回答“已经消耗了多少”。每次模型调用后，系统会根据 usage 拆出输入 token、输出 token、缓存读取、缓存写入、网页搜索次数和模型信息，再结合模型定价表换算成本，并按会话和模型维度累计。这样不仅能看到总花费，还能知道钱具体花在输入、输出、缓存、搜索还是高价模型上。</span></p>

<p id="f-doxcnkZVsJaP7CmlBUKDW2kK7Ne"><span>最后还要加一层预算保护，比如单次查询的 Token Budget。它不只是限制最大 token，还会判断 Agent 内部续跑是否还有明显收益，避免一次任务不断循环、持续烧 token。</span></p>

<p id="f-doxcnPe2ksBo2ikEzgo7tCQ6SVd"><span style="font-weight:bold">Q2：如何监控 Agent 的成本？</span></p>

<p id="f-doxcnXb4G8tak02BNMJCWcDUVmf"><span>我会分三层做成本监控。</span></p>

<p id="f-doxcnunDrWTXI2fciIa43rABJbd"><span>第一层是</span><span style="font-weight:bold">单次调用级别</span><span>。每次模型调用结束后，都记录结构化 usage，包括模型名、输入 token、输出 token、缓存读取、缓存写入、工具调用情况和估算费用。这样可以知道单次请求的钱具体花在哪里。</span></p>

<p id="f-doxcnCxm8SlnwL8lj5vPDuQ6Ut6"><span>第二层是</span><span style="font-weight:bold">会话聚合级别</span><span>。把多次调用按会话、模型、用户、任务类型聚合，同时补充工具耗时、API 耗时、代码改动规模等信息。这样可以回答“这个会话总共花了多少钱”“哪个模型最贵”“哪类任务最容易爆预算”。</span></p>

<p id="f-doxcn2Rteo4uMI1aCc9shO1rOjh"><span>第三层是</span><span style="font-weight:bold">成本归因级别</span><span>。拿到聚合数据后，要进一步分析成本来源：是高价模型用太多，还是输入上下文太长？是输出太多，还是缓存命中率太低？是搜索等额外能力带来了额外成本，还是某类任务本身就更贵？</span></p>

<p id="f-doxcnrUeX3critok6tb0l0dCl9f"><span>这样监控成本就不是只看一个总金额，而是能定位成本来源，并为后续优化模型选择、上下文裁剪、缓存策略和工具使用提供依据。</span></p>

<p id="f-doxcnBxk0hhG6ZSx6CGQDyNmPgh"><span style="font-weight:bold">Q3：如果一次 Agent 任务不断循环，怎么防止它烧 token？</span></p>

<p id="f-doxcnI41ZXyYAyNoYNbLhdhxOVb"><span>可以分三层控制。</span></p>

<p id="f-doxcnU2JSJPyoAJ6Au4cwZbGOhc"><span>第一层是</span><span style="font-weight:bold">硬性预算控制</span><span>。给一次用户任务设置 token budget，持续记录这次任务已经消耗了多少 token、还剩多少预算。如果已经接近预算上限，就停止继续自动续跑，避免一次任务无限消耗。</span></p>

<p id="f-doxcnQacimcgDSVnOU09HW4UiDd"><span>第二层是</span><span style="font-weight:bold">续跑次数控制</span><span>。Agent 内部可能会经历多轮“模型思考 → 工具调用 → 读取结果 → 再次思考”的循环，所以要记录已经自动续跑了几次。即使还没用完预算，也不能让它无限循环。</span></p>

<p id="f-doxcnKxbyzxYv8dIRoStzyrk49b"><span>第三层是</span><span style="font-weight:bold">收益递减判断</span><span>。只限制最大轮数还不够，因为有些任务可能前几轮就已经没有明显产出了。Claude Code 的思路是看每轮新增输出是否还有明显增量：如果连续几轮新增内容都很少，说明模型可能在原地检查、重复总结或低价值补充，这时继续跑的收益已经很低，就应该提前停止。</span></p>

<p id="f-doxcnyeCv9hHwAmnsG4AGbhc0jf"><span>所以更完整的答案不是“设置最大轮数”这么简单，而是：</span><span style="font-weight:bold">预算控制负责限制成本，续跑次数负责限制循环长度，输出增量负责判断继续运行是否还有收益</span><span>。这三者结合，才能比较可靠地防止 Agent 在一个任务里持续烧 token。</span></p>

<p id="f-doxcnHmurU18S26A0W0lL2jWqIe"><span style="font-weight:bold">Q4：如果让你设计一个 Agent 成本监测模块，你会怎么拆？</span></p>

<p id="f-doxcnjpioe5B4wqQKgTFwEoxWP4"><span>我会拆成五个部分：</span></p>

<p id="f-doxcneb4uCjlSltbvznCtO7tnsg"><span>1. </span><span style="font-weight:bold">Usage Collector</span><span>：采集每次模型调用的输入 token、输出 token、缓存读写、网页搜索次数和模型信息。</span></p>

<p id="f-doxcnaMuuIXW1HoY4AXUS2iEZKg"><span>2. </span><span style="font-weight:bold">Cost Calculator</span><span>：根据模型定价表、缓存读写、网页搜索等额外成本计算费用。</span></p>

<p id="f-doxcnE0zV5goUfQw56m8KFtSowf"><span>3. </span><span style="font-weight:bold">Budget Manager</span><span>：维护请求级、会话级、用户级、模型级预算。</span></p>

<p id="f-doxcnPbrnMsBZou0b9l9Xl16fPn"><span>4. </span><span style="font-weight:bold">Rate Limit Manager</span><span>：解析服务商配额信号，维护多时间窗口配额和提前预警。</span></p>

<p id="f-doxcngs5qn2lZ8woOQ3zlwe0Erd"><span>5. </span><span style="font-weight:bold">Persistence &amp; Analytics</span><span>：把会话成本持久化，并按模型、工具、任务类型做聚合分析。</span></p>

<p id="f-doxcnONDjIiKgTMwtkoAm9zeMAh"><span>这样设计的好处是，成本控制不再是一个零散的日志功能，而是一个完整的产品能力：能监控、能预警、能解释、能恢复，也能给后续优化提供数据。</span></p>

<a id="f-doxcnIoQnm6FICmeR1jQ1eRVssg"></a>

##### CC源代码

<p id="f-doxcn2JR8LfX0mzPNd0CDZoz0QN"><span>/~0f8b3YAgIw~:/</span></p>

<p id="f-doxcnx5c9uTKKUEgeijs1ulqrod"><span>链接：</span></p>


<a id="section-0182"></a>
## 开源框架解读- DeepSeek Harness

<a id="f-doxcnZAZ8GjpUOPs8U00WN0l3Ph"></a>

<p id="f-doxcny6lyRCgl3RIqFHlrsUFisc"><span>DeepSeek Harness 2026年8月份开源的Harness 框架， 已经开源几天内，stars 数已经突破了158k了。在2026年来说，一定是属于超级8热门的项目之一，是大家必须要关注的。在2026年8月份，或者未来的几个月，我相信你去面试大模型Agent岗，大部分面试官都会问你DeepSeek Harness相关的内容，所以请注意：</span></p>

<ul><li id="f-doxcnNfoU3dvLmgLtOHWbISO1kd"><span style="font-weight:bold">从近期面试来说（2026年8~9月）</span><span>，是你几乎一定要准备的，我这个是保守来说的，因为他现在很爆，所以近两个月一定要学，如果说未来DSH 被证明效果很好，越来越火，会在更长的时间内被列为面试必学内容。</span></li></ul>

<ul><li id="f-doxcnXZdkC49YbkRdgjq5cLxi7e"><span style="font-weight:bold">从长期的角度来说</span><span>，做大模型开发，学开源项目肯定是非常有必要的，特别是最新的，最热的架构，学习他们背后的思想，对于面试也是非常有帮助的，学习这些框架的思想，对于很多其他考点，你也能找到答题的出发点，所以同样值得学习。</span></li></ul>

<p id="f-doxcnYKtTHHbYG5qWhX2eFcvGvg"><span>我知道大家可能有点迷茫，觉得学习不过来，过去像这些类似的事情出现过太多次了，我非常有经验。我的个人建议是：</span></p>

<ul><li id="f-doxcn4ywTDjRVuSTwcStsxeG6nh"><span style="font-weight:bold">从短期的角度</span><span>，你需要掌握DSH 是什么？核心思想？架构图？你怎么看待行业的发展？你有没有用过它，你的实际体验是什么？ 学好了这些问题，大部分面试官问DSH，问的也不深。</span></li></ul>

<ul><li id="f-doxcnBLpUeJdqTJU9aRIgnJkWYo"><span style="font-weight:bold">从长期的角度来说</span><span>，如果DSH 持续火爆，面试的考察也会越来越深，你再深入学习就好。</span></li></ul>

<ul><li id="f-doxcnkzQoQujceX33fDSHPILoKh"><span>请注意，真的学透一个开源框架，是一个很耗时，没有那么容易的事情，像CC，都有专门的书籍去解析它，不要把它想得很容易。</span></li></ul>


<a id="section-0183"></a>
## DeepSeekHarness是什么？

<a id="f-doxcn2OciJeK2C0mx16SZoyXMqh"></a>

<p id="f-doxcnJs6Qn2TW6qAjnqy7hOdLqf"><span>虽然它叫 DeepSeek Harness（简称 </span><span><span><span>dsh</span></span></span><span>），但大家不要被“Harness”这个词误导。站在使用者的角度，它和我们熟悉的 Claude Code、Codex、OpenClaw 一样，本身就是一个可以直接使用的 Agent，而不是一个只能被其他 Agent 调用的底层 Harness 库。</span></p>

<p id="f-doxcnO7mgxih2lkHdfCDeCTRteg"><span>一个完整的 Agent，可以简单理解为：</span></p>

<pre id="f-doxcngJ836ZRifv1a6bdWkqBdWg"><code>Agent = LLM + Harness</code></pre>

<p id="f-doxcnniqeWKcPrLCzsXilnxyYof"><span>这里的 LLM 是负责理解、推理和决策的“大脑”；Harness 则是模型外面的执行系统，负责给模型准备上下文、提供工具、管理会话，并把模型的决策真正执行出来。Claude Code、Codex、OpenClaw 都可以用这个公式理解，DeepSeek Harness 也是一样的。它内部包含模型调用，并围绕模型实现了一套完整的 Agent Loop，而不是只有 Harness、没有模型的“半成品”。</span></p>

<p id="f-doxcnNTx0OV5fUJ5Z0iZZ1rYB2f"><span>在功能上，DeepSeek Harness 重点处理的事情也和其他 Agent 类似：它会组装系统提示词和会话上下文，调用大模型进行推理，让模型读取和修改文件、搜索内容、运行 Shell 命令、调用各种工具，并根据工具返回的结果继续执行任务。同时，它还负责会话记录、上下文压缩、权限控制、沙箱、子 Agent 和任务状态等能力。也就是说，用户给它一个任务后，它可以像 Claude Code 或 Codex 一样，在工作区中自主完成多步操作。</span></p>

<p id="f-doxcnLRCA1247CtTjdjvXzotlIg"><span>DeepSeek Harness 真正特殊的地方，不在于“它是不是 Agent”，而在于“它是怎样构建 Agent 的”。与 Claude Code、Codex 等产品相比，它主要有下面两个特点：</span></p>

<div style="margin-left:25px"><div id="f-doxcnA33lyOb1YQ95sGpMZy1n0c" style="display:flex;gap:0.5em"><span style="min-width:1.5em">a.</span><div><span style="font-weight:bold">一切皆插件（Everything is a plugin）</span></div></div><div id="f-doxcnXjAdWcjikTLIHliP7pEw3b" style="display:flex;gap:0.5em"><span style="min-width:1.5em">b.</span><div><span>Claude Code、Codex 等产品提供的是相对完整、固定的成品体验，很多底层模块由官方预先决定；DeepSeek Harness 则更强调开源、模块化和可重新组合。</span></div></div><div id="f-doxcnpOX5tpyf6VLrZzFUAZ7mrV" style="display:flex;gap:0.5em"><span style="min-width:1.5em">c.</span><div><span>这里的“插件”不只是给 Agent 增加的几个外部工具。模型适配器、工具系统、文件操作、Shell、沙箱、权限策略、会话持久化、子 Agent、Agent Loop，甚至 Web UI，都可以由插件提供或替换。因此，DeepSeek Harness 不只是允许开发者“给 Agent 加几个工具”，而是允许开发者重新组合 Agent 本身。这也是它最核心的架构特点。</span></div></div><div id="f-doxcn7PytWF5hBfJjLsl5TzImJM" style="display:flex;gap:0.5em"><span style="min-width:1.5em">d.</span><div><span style="font-weight:bold">以 Web UI 为主要交互形式</span></div></div><div id="f-doxcnLh15qYeTXwbE5XjjxX6stc" style="display:flex;gap:0.5em"><span style="min-width:1.5em">e.</span><div><span>与 Claude Code、Codex 常见的终端交互不同，DeepSeek Harness 当前把 Web UI 作为主要入口。用户可以直接在浏览器里与 Agent 对话、查看完整的执行轨迹并管理工作区，整体使用门槛更低，任务执行过程也更加直观。</span></div></div></div>

<div id="f-doxcnpEDnOet2AhifFwvhGfKFob"><img alt="" decoding="async" height="853" loading="lazy" src="/images/agent-learning/1394633eaaa7e4ea7be10801.png" width="1280"/></div>

<p id="f-doxcn3kMPuTXk8X88nxjwbBdIAd"><span>所以，对 DeepSeek Harness 最准确的理解是：</span><span style="font-weight:bold">它首先是一个能够直接工作的开源 Agent，同时也是一套高度插件化、可以重新组合的 Agent 运行平台。</span><span> 前者说明它和 Claude Code、Codex、OpenClaw 属于同一类产品；后者则是它区别于这些产品的核心特点。</span></p>

<p id="f-doxcnMxAqRXX27dIonAttnApD9s"><span>目前 DeepSeek Harness 仍处于 Developer Preview（开发者预览）阶段，项目会快速迭代，也可能出现破坏兼容性的改动。现阶段我们学习它，重点不是背每一个功能的用法，而是理解它如何通过“一切皆插件”的方式重新组织模型、工具、会话、执行环境和交互界面。</span></p>

<p id="f-doxcn7VA8XGZakF4botnx8yzolb"><span>我说了你可能感受不出来，你想知道它是啥，可以看看网上的各种使用视频或者自己用就知道了。更直观地弄清楚DSH是什么，可以看看这个视频： </span></p>

<div id="f-doxcnH7FIBGqJ25aTKj8jSmIhye"><div><div><div><div><div><div><div><div><div><a href="https://player.bilibili.com/player.html?autoplay=0&amp;bvid=1ACbi6DEvC&amp;spm_id_from=333.337.search-card.all.click&amp;vd_source=144bec9c3f54e465073138bed788be1b">嵌入视频 / 原始播放器</a></div></div></div></div></div></div></div></div></div></div>


<a id="section-0184"></a>
## 整体架构

<a id="f-doxcnrxlnXeLs07zUTOkRNCaJNx"></a>

<p id="f-doxcn5dFkZ2cg3JldIMovNv0oYd"><span>我们解析 PI Agent、Claude Code、OpenClaw、Hermes 等开源 Agent 时，通常会先用一张架构图了解系统的整体运行方式。DSH 的宏观结构与它们有相似之处：外部请求进入 Agent 系统，Agent Loop 按照 ReAct 范式反复调用模型和工具，会话系统则保存消息与执行事实。不过，DSH 最鲜明的区别是：这些组件都运行在 Cordis 插件体系中，连 Agent Loop、模型适配器和界面本身也可以由插件提供或替换。</span></p>

<div id="f-doxcng7nDwTVydYC0I96k8UdxYG"><img alt="" decoding="async" height="853" loading="lazy" src="/images/agent-learning/5a56095aad08a5d1f8715d37.png" width="1280"/></div>

<p id="f-doxcnZYWzehlK6688fsYiTJqESf"><span>这张图可以分成四部分理解。</span></p>

<ol start="1"><li id="f-doxcnb8XPJx4mijOsf9nSxaKpoc"><span style="font-weight:bold">Cordis Runtime 是全局运行底座</span><span>：最外层的 Cordis Runtime 包围整个系统，负责组织插件、注册服务、分发事件并管理生命周期。上方的 Profiles、Bundles 和 Patches 表示 DSH 在启动时如何选择和组合插件，它们不是用户请求依次经过的业务流程。</span></li></ol>

<ol start="2"><li id="f-doxcnK6VN0W77mtSAZo0FIPbvIh"><span style="font-weight:bold">不同入口汇入同一套 Agent 能力</span><span>：用户可以通过 Web、ACP、SDK 或 CLI 进入系统。Web 模式会经过 Connection、API Gateway 等组件；ACP、SDK 和 Headless 则各有自己的入口适配器。它们不一定经过同一个网络网关，但最终都会通过 </span><span><span><span>ctx.agents</span></span></span><span> 创建、恢复或驱动 Agent。</span></li></ol>

<ol start="3"><li id="f-doxcnA6IBr97D45Lu39s6lBG4th"><span style="font-weight:bold">LLM 和工具都在 Agent Loop 中协作</span><span>：主 Agent Loop 从 Inbox 获取消息，组装 Prompt 并调用 LLM。模型如果发出 Tool Call，Tool Runtime 就执行对应工具，再把 Tool Result 交回模型，直到任务完成。Subagent Tool 也是一种工具入口，但它启动的不是一次普通函数调用，而是一个拥有自身 LLM 与工具循环的 Child Agent Loop；子 Agent 的结果最终作为 Tool Result 返回主循环。</span></li></ol>

<ol start="4"><li id="f-doxcnyHY6waGWAxBUFYMXM9icmg"><span style="font-weight:bold">结果输出与会话记录是两条关系</span><span>：Agent Loop 的最终回答经过 Output Adapters，以 WebSocket、ACP、SDK 或 stdout 等形式返回用户；与此同时，Agent Loop 会把用户消息、模型回答、工具调用、工具结果和生命周期事件写入 Session Event Log，并从中重建后续请求需要的会话历史。Session Event Log 是内部事实与历史来源，不等于把原始日志直接返回给用户。</span></li></ol>

<p id="f-doxcngXgNU8TaasO5DXK5mom2jM"><span>因此，DSH 的运行主线可以概括为：</span><span style="font-weight:bold">外部入口接收请求，</span><span style="font-weight:bold"><span><span>ctx.agents</span></span></span><span style="font-weight:bold"> 将请求交给 Agent，Agent Loop 在 LLM 与工具之间循环执行，最终结果经对应适配器返回；Cordis 则在全局范围内组织和协调参与这一过程的所有插件。</span></p>

<p id="f-doxcndqsTJjVmzZx0ryWLJ0lREc"><span>这张图只展示了最核心的宏观关系，真实实现还包括上下文压缩、权限审批、沙箱、后台任务、不同工具模式以及多种 Subagent Provider 等机制。接下来我们先从 DSH 最关键的设计理念——“一切即插件”开始展开。</span></p>


<a id="section-0185"></a>
## 核心特性

<a id="f-doxcnvB1K9h0BcwaSB2tB4FRLFb"></a>

<a id="f-doxcntjXK3GMeHvEBVM1nuOw0Hd"></a>

##### 一切即插件

<p id="f-doxcneOyJOdkJZfCNwJ5jqhHHCf"><span>DeepSeek Harness 最核心的设计理念是 </span><span style="font-weight:bold">Everything is a Plugin（一切皆插件）</span><span>。很多系统所说的“插件”，通常只是允许开发者在一个固定核心外面增加 MCP、搜索工具或 Skill；DSH 的不同之处在于，它把组成 Agent 的主要能力乃至传统意义上的核心部分，也放进了同一套插件体系。</span></p>

<p id="f-doxcnu16mFSHm64U588DxRZPWdf"><span>从 DSH 的整体结构来看，插件大致覆盖以下几类能力：</span></p>

<div style="margin-left:25px"><div id="f-doxcnbT7gpJ0tIp7341l6bTKIHh" style="display:flex;gap:0.5em"><span style="min-width:1.5em">a.</span><div><span style="font-weight:bold">模型与推理流程</span><span>：模型适配器负责接入 DeepSeek 或其他模型；Agent Loop 负责驱动“调用模型、执行工具、读取结果、继续下一步”的循环；上下文压缩插件负责在会话接近模型窗口上限时生成摘要或裁剪工具结果。这里最特别的是 Agent Loop 本身也以独立插件包提供，而不是不可替换的固定内核。</span></div></div><div id="f-doxcnDHeb1ODHr6oY7cBUwcps4d" style="display:flex;gap:0.5em"><span style="min-width:1.5em">b.</span><div><span style="font-weight:bold">工具与执行能力</span><span>：工具注册表、文件系统、文件编辑器、Shell、持久终端、LSP、Web Search、Web Fetch、MCP、Skill 和子 Agent 等均由插件提供。替换文件系统或进程执行环境后，依赖这些服务的工具也可以随之迁移，而不必分别改写每个工具。</span></div></div><div id="f-doxcnNw8I2Y2O58sjHUCL6Ci6ld" style="display:flex;gap:0.5em"><span style="min-width:1.5em">c.</span><div><span style="font-weight:bold">会话与状态管理</span><span>：Session Event Log、会话持久化、查询、回放、标题、统计以及普通 Storage 都由不同插件组合。比如会话持久化可以采用 JSONL 或 SQLite，实现可以变化，但仍需遵守统一的 Session 事件与恢复约定。</span></div></div><div id="f-doxcnWau0aCdTipOUlqOZtzlupb" style="display:flex;gap:0.5em"><span style="min-width:1.5em">d.</span><div><span style="font-weight:bold">权限与运行环境</span><span>：用户审批、权限预设、文件访问策略、进程 Sandbox 和凭据管理同样由插件提供。它们不是写死在某个工具里的判断，而是通过统一的服务和执行扩展点参与工具调用流程。</span></div></div><div id="f-doxcnolc8Ubv2SA8QUI2KMUHrfb" style="display:flex;gap:0.5em"><span style="min-width:1.5em">e.</span><div><span style="font-weight:bold">任务编排与后台能力</span><span>：Goal、Todo、Workflow、后台 Job、调度以及不同类型的 Subagent Provider 都可以按运行场景装配。Standard、Code、Minimal、Creator 等模式，本质上也是不同的插件与配置组合。</span></div></div><div id="f-doxcnrE5uOHMCb3mpk4xRHmuNcP" style="display:flex;gap:0.5em"><span style="min-width:1.5em">f.</span><div><span style="font-weight:bold">交互入口与界面</span><span>：Web Server、Headless Runner、ACP、API，以及浏览器中的侧边栏、会话界面和工具结果视图都属于可组合模块。也就是说，不仅 Agent 的“脑、手和记忆”可以替换，用户看到的 Web UI 也不是固定在核心中的唯一界面。</span></div></div></div>

<p id="f-doxcnEWlWzYwiZtjTnDGZn6Lkjd"><span>因此，DSH 并不是先写好一个不可改变的 Agent 核心，再允许开发者在外围增加几个工具。它采用 Cordis 作为插件运行底座，把模型、Loop、工具、状态、安全、任务编排和 UI 拆成遵守统一加载与生命周期规则的模块，再由 Profile 和配置将它们组合成一套可运行的系统。</span></p>

<p id="f-doxcnJdBicLdJxug8zBwVYuVODe"><span>这里的“一切”也不是指任意代码都能不受限制地塞进系统。DSH 会预先定义服务接口、Registry、事件或 UI Slot 等扩展位置，插件必须满足相应约定；它强调的是主要系统能力都采用统一的插件方式实现，而不是系统不存在任何结构和接口限制。</span></p>

<p id="f-doxcn0WIGc0fJtCPsZ1OCSxqPIe"><span>看到这里，你可能会想：DSH 为什么能把模型、Agent Loop、工具、会话、安全策略乃至 Web UI 都做成可替换、可组合的插件？要理解这种能力是如何实现的，就要进入 DSH 插件体系的核心——Cordis。</span></p>

<a id="f-doxcnki15KPTDGKlCu8xQRvZGXf"></a>

###### Cordis 是什么？

<p id="f-doxcnan5SS1AQTJBUHUp8UlE5Ld"><span>Cordis 是一个通用的 TypeScript 插件运行框架，并不是专门为 DSH 编写的 Agent 框架。它负责插件加载、服务注册、依赖解析、作用域隔离、生命周期管理和资源清理，并配合 HMR 实现运行时更新。DSH 的做法，是把自己的各项 Agent 能力按照 Cordis 的插件规范实现，然后交给 Cordis 统一组织。</span></p>

<div id="f-doxcniSWCuIsTHdxGUCSH1xaY3g"><img alt="" decoding="async" height="853" loading="lazy" src="/images/agent-learning/7fac253b092bc8d4d4a4ac00.png" width="1280"/></div>

<p id="f-doxcn7Siv3esvlXqfOfFk0pUXNd"><span>所以两者的关系可以概括为：</span></p>

<pre id="f-doxcn8HW9b3bCWp7lxWtV1g0Rzd"><code>Cordis：负责组织和管理插件的通用运行时
DSH：由一组 Cordis 插件组合出来的 Agent 系统</code></pre>

<p id="f-doxcnr5jiVyFVx5keXlpW8c6cvh"><span>换句话说，DSH 不是等 Cordis 运行完成后再去调用它；DSH 本身就是 Cordis 所管理的那组插件共同组成的系统。</span></p>

<a id="f-doxcn0kF62ocOELoJXUC42GHS4M"></a>

###### 静态组装：DSH 是如何被拼装起来的？

<p id="f-doxcnMiFwNsJzSJKvzAaYMNSYzb"><span>图的上半部分表示 DSH 启动时的静态组装流程。这里的“静态”不是指插件不能变化，而是指系统先依据当前配置完成一次确定的插件装配：</span></p>

<pre id="f-doxcnrMga3PanEFOFwTH910FrVf"><code>Profile / cordis.patch.yml 声明插件
→ Loader 读取插件模块与配置
→ Registry 为插件实例创建 Fiber
→ 插件向 Context 服务槽或专用 Registry 注册能力
→ 所有能力共同组成可运行的 DSH</code></pre>

<a id="f-doxcnWTQ2veBarXnZIjueQfMpLf"></a>

###### Profile / cordis.patch.yml：声明系统需要哪些插件

<p id="f-doxcnJBBmKI2uR8o0HXESQ6aSNb"><span>Profile 决定当前运行的是 Web、Headless 还是其他自定义形态；Bundle 和 </span><span><span><span>cordis.patch.yml</span></span></span><span> 则列出需要加载的插件及其配置。模型、工具、Session、Agent Loop、Sandbox 和 Web UI 等能力，都从这里进入装配流程。</span></p>

<p id="f-doxcnuE8Kb6WqsK7o5ARwG3Dqo5"><span>因此，配置文件解决的是第一个问题：</span><span style="font-weight:bold">这一套 DSH 由哪些插件组成？</span></p>

<a id="f-doxcnTgiCk3lqdEPEMweLUz9tNc"></a>

###### Loader：找到并读取插件

<p id="f-doxcnpvVzrH6pdyYCBg2b4XgQyd"><span>Loader 根据配置解析插件包，读取并校验插件配置，再把可执行的插件模块交给 Registry。它解决的是：</span></p>

<div style="margin-left:25px"><div id="f-doxcnvRlqnhbALv4fopUPBwdL5z" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>插件代码在哪里；</span></div></div><div id="f-doxcnhlTqSPnItBXOpJvq2yjXlh" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>应当使用哪份配置；</span></div></div><div id="f-doxcnba1IQGtqBDtJsjcFXSUxxd" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>配置能否通过插件声明的 Schema 校验。</span></div></div></div>

<a id="f-doxcns4FRqPYhuJzNRhQUXFLb4g"></a>

###### Registry 与 Fiber：组织并运行插件实例

<p id="f-doxcnKVO0b6f9FCNACPMA8m7n9f"><span>Registry 保存“插件模块与运行实例”的对应关系。一个插件可以在不同配置或作用域中运行多次，因此同一个插件可能对应多个 Fiber。</span></p>

<p id="f-doxcnwwJmoaI2TrhjC49YWGtNTb"><span>Fiber 是单个插件运行实例的生命周期容器，不是线程，也不是插件业务对象本身。Registry 为插件创建 Fiber 后，Fiber 负责：</span></p>

<pre id="f-doxcnuj9wHN5GJvPahapvgjUrbh"><code>创建插件专属子 Context
→ 读取并检查 inject 依赖
→ 等待依赖服务可用
→ 通过 Context 解析服务
→ 执行 apply 或 Service 构造函数
→ 收集 Effect 与清理函数
→ 进入 Active</code></pre>

<p id="f-doxcnaDAA7yI71blgQIWksv6Fie"><span>Fiber 的状态可以简化为：</span></p>

<pre id="f-doxcnLkmGn3EsxT0BrAGlOPp6Cf"><code>Pending（等待依赖）
→ Loading（加载）
→ Active（运行）
→ Unloading（卸载）
→ Disposed（结束）或 Reload（重载）</code></pre>

<p id="f-doxcnhtK8aMHQkrBfnjP5SbSKbg"><span>可以把两者简单区分为：</span><span style="font-weight:bold">Registry 保存和管理插件及其 Fiber，Fiber 托管单个插件实例的运行过程。</span></p>

<a id="f-doxcnwmIunZr9t45P9EZ8uVGikb"></a>

###### Context 服务槽与专用 Registry：连接各项能力

<p id="f-doxcnkHzmXFmlx3aC7Og76HJtDc"><span>插件启动后，通过 Context 获取自己依赖的服务，并注册自己提供的能力。例如：</span></p>

<pre id="f-doxcnTkjI0dk5Yz5QPyM33wSqze"><code>模型插件 → 注册模型适配器
工具插件 → 注册模型可调用的工具
Session 插件 → 提供会话和持久化能力
Agent Loop 插件 → 提供 Agent 创建与驱动能力
UI 插件 → 注册浏览器端组件或交互入口</code></pre>

<p id="f-doxcnDvlG8IVBHSkxp3LG5ePa8e"><span><span><span>Context</span></span></span><span> 是受作用域控制的服务访问环境。插件通过 </span><span><span><span>ctx.llm</span></span></span><span>、</span><span><span><span>ctx.tools</span></span></span><span>、</span><span><span><span>ctx.sessions</span></span></span><span> 等统一入口访问能力，不需要直接绑定某个具体实现。专用 Registry 则保存同一类能力下的多个注册项，例如工具或模型适配器。</span></p>

<p id="f-doxcnMA5AGxfxzjGmso6xwykHdY"><span>当这些插件完成注册后，它们不是“被 DSH 使用的外部组件”，而是</span><span style="font-weight:bold">共同组成了 DSH 本身</span><span>。</span></p>

<a id="f-doxcnapW5vvnPJ4D35jGONSu1Aq"></a>

###### 动态更新：运行中的插件如何适应变化？

<p id="f-doxcnixKnfB5VS1iJ11bhBLJyrd"><span>图的下半部分表示动态更新。Cordis 有两种不同但相互配合的变化机制：</span><span style="font-weight:bold">响应式依赖</span><span>与 </span><span style="font-weight:bold">HMR</span><span>。</span></p>

<a id="f-doxcnU8wpHA7RXjf9zqVHAzzsjD"></a>

###### 响应式依赖：服务变化沿依赖关系传播

<p id="f-doxcnsGGb61pvX7ehoCrb5kU4lc"><span>插件使用 </span><span><span><span>inject</span></span></span><span> 声明自己依赖哪些服务。这个依赖不是只在启动时检查一次，而是 Fiber 能否持续运行的条件。</span></p>

<p id="f-doxcnz8NH7COSG86u5XUq7IBCnv"><span>假设插件 B 依赖服务 A：</span></p>

<pre id="f-doxcnQrJPr018ybeld7ckMrh5Ab"><code>A 可用
→ B 的依赖满足，Fiber 进入 Active

A 消失或实现被替换
→ B 的 Fiber 重新检查 inject
→ 当前运行状态被卸载

新的 A 可用
→ B 的依赖重新满足
→ B 被重新激活或重载，并再次注册能力</code></pre>

<p id="f-doxcnz6isrqm0QpW86O0jdqOd3g"><span>这对应图中从“Context 服务槽 / Registry”返回 Fiber 内部“检查 inject 依赖”的</span><span style="font-weight:bold">虚线箭头</span><span>。它表示服务的出现、消失或实现变化会自动传播给依赖它的插件。这里通常是已有 Fiber 发生状态转换，不一定创建新的 Fiber。</span></p>

<a id="f-doxcnbwjvJKbW3qTXx230vLT45c"></a>

###### HMR：代码或配置变化触发插件替换

<p id="f-doxcnlMtsSd5QTHqLVCCzKss75d"><span>HMR 是 Hot Module Replacement，即热模块替换。它处理的不是服务依赖本身，而是插件代码或配置文件发生变化：</span></p>

<pre id="f-doxcnsQrlVEtQ5u6DL2VUQQdMKb"><code>代码或配置变化
→ HMR 检测并定位受影响插件
→ 旧 Fiber 进入 Unloading
→ Effect 清理旧服务、监听器和资源
→ Loader / Registry 注册替代插件
→ Registry 为替代插件创建新 Fiber
→ 新插件重新注册能力</code></pre>

<p id="f-doxcnyxlZWjqQDbxg8miIbvhuBf"><span>这对应图下方的 HMR 虚线框，以及从最后一个节点返回上方第 3 步的</span><span style="font-weight:bold">实线箭头</span><span>。这条箭头表示替代插件重新进入正常装配流程，而不是 HMR 自己直接完成插件运行。</span></p>

<a id="f-doxcnsd5ZSgB7qxy3BkD9BC17sd"></a>

###### Effect：保证旧插件能够被干净卸载

<p id="f-doxcnQqmWSIcgDLZmBVTHqaObRf"><span>无论变化来自响应式依赖还是 HMR，插件在卸载前都需要清理自己产生的副作用。Cordis 用 Effect 把资源注册与撤销操作绑定到所属 Fiber：</span></p>

<pre id="f-doxcnpU48gzW4y6ybJu9eYApqjh"><code>插件加载：注册服务、工具、事件监听、连接和定时器
插件卸载：按相反顺序注销并释放这些资源</code></pre>

<p id="f-doxcnt4xPiOdEDv2Iqv8fo9Yooc"><span>因此，Effect 是动态更新能够成立的基础。如果旧插件卸载后仍残留监听器、连接或服务，新旧实现就可能同时生效，插件系统也会逐渐失去一致性。</span></p>

<a id="f-doxcnfeqHxDm9clNLDMoIG66kkg"></a>

###### 响应式依赖与 HMR 如何配合？

<p id="f-doxcnzWOcqIjYo7WmclebzpiD6e"><span>响应式依赖与 HMR 很像，但职责不同：</span></p>

<div style="margin-left:25px"><div id="f-doxcnl44BlUo8qIyDeCmyawIS7f" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">HMR 是变化的触发与替换流程</span><span>：代码或配置变化后，卸载旧插件并加载替代插件；</span></div></div><div id="f-doxcnU1Y7ITjdeFwFDSw5chl0sb" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">响应式依赖是变化的传播机制</span><span>：某个服务变化后，所有依赖它的插件都会重新检查自己的运行条件。</span></div></div></div>

<p id="f-doxcnHywPTcpUndIGmFOHqlgtE9"><span>例如，HMR 替换一个 LLM 插件时，旧 LLM 服务先消失，新 LLM 服务随后注册；这个服务变化又会通过响应式依赖传播给依赖 LLM 的其他插件，使它们自动卸载并重新激活。</span></p>

<p id="f-doxcnS36mwPbQ3H53JosdgnxL0d"><span>最终，整张图可以用两条主线概括：</span></p>

<pre id="f-doxcnnutQIfeNJfa2GZRLDl5ykg"><code>静态组装：配置 → Loader → Registry / Fiber → Context 注册能力 → 组成 DSH
动态更新：服务变化或 HMR → Fiber 卸载与清理 → 重新加载和注册 → 更新 DSH</code></pre>

<p id="f-doxcnAQgeNVWBqPUnHnRjf41Jge"><span>所以，DSH 的“一切皆插件”不是简单地提供一个插件市场，而是先把主要能力设计成可注册的插件，再由 Cordis 负责这些插件的</span><span style="font-weight:bold">初始组装、依赖协调、生命周期管理、资源撤销和运行时重组</span><span>。需要注意，这也不代表任意代码都能直接接入：插件仍须满足对应服务、Registry、事件或 UI Slot 的约定。</span></p>


<a id="section-0186"></a>
## 面试问题

<a id="f-doxcnZEMxxAm2U9kZzehmZU44Re"></a>

<a id="f-doxcnej6j9CwvIlMaMuAtyFwErk"></a>

##### 最近的 DSH 你关注了吗？请简单谈谈你的理解

<blockquote id="f-doxcn6XmnHpczq75JprpgKyLy6O"><p id="f-doxcnT8lUuCVkU7AR6ZJVVDUdQc"><span style="font-weight:bold">点评</span></p>
<p id="f-doxcnXVlgxqCk4cyx1XRcuq5uHe"><span>这是面试官询问 DSH 时很常见的第一个问题，主要用于判断候选人是否关注近期技术动态，以及是否形成了自己的基本认识。回答时按“定位 → 功能 → 差异 → 评价”四个方面简单展开即可，不需要一开始就深入细节。如果面试官对某个差异点感兴趣，通常会继续追问。下面的参考答案重点提到插件化和 append-only Session Event Log，因此后面也补充了这两个概念的常见追问。</span></p></blockquote>

<p id="f-doxcnwKJf7zmKlMACdN8C4erHdd"><span style="font-weight:bold">答题思路：定位 → 功能 → 差异 → 评价</span></p>

<div style="margin-left:25px"><div id="f-doxcnnsasMmKH3v5xalz4vHvASb" style="display:flex;gap:0.5em"><span style="min-width:1.5em">a.</span><div><span style="font-weight:bold">定位</span><span>：先使用官方表述，说明 DSH 是 DeepSeek AI 开源的 Agent Harness；它既提供可以直接运行的 Agent 应用，也可以作为组装不同 Agent 形态的运行平台。不要直接把它限定为 Coding Agent。</span></div></div><div id="f-doxcnRR6oaXUfN9bp2gvZL1Vcgo" style="display:flex;gap:0.5em"><span style="min-width:1.5em">b.</span><div><span style="font-weight:bold">功能</span><span>：概括它如何把模型变成能够执行任务的 Agent，包括上下文组装、模型调用、工具执行、会话管理、权限控制、沙箱、子 Agent，以及 Web、Headless、ACP、SDK 等入口。</span></div></div><div id="f-doxcnxWscUYjlFBRUgsZKAtvstf" style="display:flex;gap:0.5em"><span style="min-width:1.5em">c.</span><div><span style="font-weight:bold">差异</span><span>：重点说明“</span><span style="font-weight:bold">一切皆插件</span><span>”。模型、工具、Session、存储、Sandbox、UI，甚至 Agent Loop 都由 Cordis 插件体系组织；另一个特点是</span><span style="font-weight:bold"> append-only Session Event Log</span><span>。它不是辅助日志，而是会话的唯一事实来源；模型消息历史从事件中派生，进入模型请求的内容必须能够从日志重建。</span></div></div><div id="f-doxcnVoxiexpcHb3PWWgwHXiSmj" style="display:flex;gap:0.5em"><span style="min-width:1.5em">d.</span><div><span style="font-weight:bold">评价</span><span>：肯定其架构与开放性的价值，同时说明它仍处于 Developer Preview，产品成熟度、兼容性、安全治理和插件生态还需要继续验证。</span></div></div></div>

<p id="f-doxcnDeRqoUERe3GCvikpSGisTh"><span style="font-weight:bold">参考答案</span></p>

<p id="f-doxcnhys5Sw9JiBwdztJh2hbsKh"><span>我关注了 DSH。按照官方定义，它是 DeepSeek AI 开源的一套 Agent Harness。它不是只供其他 Agent 调用的底层库：目前已经提供 Web UI、Headless、ACP 和 SDK 等运行入口，可以直接创建并运行 Agent；同时，它的目标也不局限于某一种编程产品，而是提供一套可以重新组合的 Agent 运行平台。</span></p>

<p id="f-doxcndHIeiY8JzJDA6auVb7C7Tb"><span>从功能上看，DSH 负责模型之外的完整执行系统。它会组装系统提示词和会话上下文，调用 DeepSeek 或其他模型，让模型使用文件、Shell、搜索、LSP、MCP 等工具，并根据工具结果继续执行。它还提供 Session 持久化、上下文压缩、权限审批、Sandbox、Workflow 和子 Agent 等能力。</span></p>

<p id="f-doxcngiJGsxfGPPZtUzVam55IFd"><span>可以认为它最有辨识度的设计是 </span><span style="font-weight:bold">Everything is a Plugin</span><span>。很多 Agent 产品只允许扩展工具，而 DSH 把模型适配器、工具系统、Session、存储、权限、Sandbox、UI，甚至 Agent Loop 本身都放进 Cordis 插件体系，通过 Profile 和配置进行组合。</span></p>

<p id="f-doxcnkt2U2obMlbW1JCTsilglce"><span>另一个值得关注的点是它的 </span><span style="font-weight:bold">append-only Session Event Log</span><span>。它并不只是为了在界面上查看轨迹，而是整个会话的唯一事实来源：用户消息、模型输出、工具调用、工具结果和其他模型可见输入都以事件追加，过去的事件不会被原地改写；LLM 消息历史则从这份日志派生，而不是另存一份消息数组。DSH 还要求“模型可见即已记录”，也就是进入模型请求的内容必须能从日志重建。恢复、Fork、回放和审计都是建立在这套设计之上的派生能力。</span></p>

<p id="f-doxcnsMzPb1jUxQgWTMK7oRPHph"><span>我的整体评价是，DSH 当前最重要的价值并不是证明它已经全面超过 Claude Code 或 Codex，而是展示了一种更开放、更可组合的 Harness 架构。它适合研究如何构建和定制 Agent Runtime，但目前仍处于 Developer Preview，接口和数据格式可能发生破坏性变化，实际稳定性、默认安全边界以及社区插件质量还需要继续观察。</span></p>

<a id="f-doxcne0OUrG3uy3x3kXNMZPKP2d"></a>

###### 追问：DSH 是如何实现插件化的？

<p id="f-doxcnij5O9nUwqTCD5Bg9HiY8ad"><span style="font-weight:bold">参考答案</span></p>

<p id="f-doxcnilgQRBl9WYmqxSmVMpNoRh"><span>DSH 使用 Cordis 作为插件运行底座，并把模型、工具、Session、Sandbox、Agent Loop 和 UI 等能力都实现为 Cordis 插件。启动时，Profile 和 </span><span><span><span>cordis.patch.yml</span></span></span><span> 声明需要哪些插件；Loader 读取模块和配置；Registry 为每个插件运行实例创建 Fiber；Fiber 检查 </span><span><span><span>inject</span></span></span><span> 依赖，通过 Context 解析服务，再执行插件的 </span><span><span><span>apply</span></span></span><span> 函数或 Service 构造函数。插件随后向 Context 服务槽或专用 Registry 注册能力，所有注册结果共同组成 DSH。</span></p>

<p id="f-doxcnAj6W9U4vc7lYCvBaNFXN9g"><span>Cordis 不仅负责加载插件，还负责运行时生命周期。Fiber 管理单个插件实例从等待依赖、加载、运行到卸载或重载的状态；Effect 则记录服务、工具、事件监听器和连接等副作用的清理方法。服务出现、消失或实现变化时，响应式依赖会让相关 Fiber 重新检查运行条件；代码或配置变化时，HMR 会卸载旧插件、清理资源并加载替代插件。因此，DSH 的插件化不仅是接口抽象和动态注册，还包含依赖协调、作用域、生命周期和运行时重组。</span></p>

<a id="f-doxcntb8hRAURZWtTxFwdCc29jh"></a>

###### 追问：什么是 append-only Session Event Log？它的设计理念是什么？

<p id="f-doxcnFSwtrzzRQYZD1iHN8OxOtg"><span style="font-weight:bold">参考答案</span></p>

<p id="f-doxcnZPrIoa8WdGYcshwUgvzJRc"><span>DSH 不把会话维护成一份可以随时修改的消息数组，而是把用户消息、模型输出、工具调用、工具结果、权限变化和上下文压缩等事实记录为一串只能追加的类型化事件。已经写入的历史事件不会被原地修改；发现旧信息有误时追加纠正事件，需要压缩时追加摘要或投影变化，Fork 时则从某个历史位置建立新的分支。</span></p>

<p id="f-doxcnSF27ZEB9U3RgRkQdHhZrdb"><span>这份日志也不是用于旁路审计的副本，而是会话的唯一事实来源。LLM 消息历史、Trajectory、恢复、Fork 和 Replay 都从同一事件流派生。DSH 进一步规定“模型可见即已记录”：凡是进入模型请求并可能影响模型决策的内容，都必须能够从日志重建。</span></p>

<p id="f-doxcnPVJ7yzOkepQqH4Bf1Zyg3T"><span>这套设计的核心价值是保持历史事实不被后续操作覆盖，避免“真实运行状态”和“审计日志”形成两份可能不一致的数据，同时让系统能够准确回答某一步模型看到了什么、调用了什么工具以及从哪里开始出错。</span></p>

<a id="f-doxcn81PWoPjVWCeBFW0O9ZhXMg"></a>

##### 请介绍一下 DSH 的核心设计理念

<p id="f-doxcn16IEb7mQcPUDYbA84nZRUg"><span style="font-weight:bold">答题思路：Cordis 插件化 + append-only Session Event Log</span></p>

<p id="f-doxcnft56sbjYmBJqx7IWynzUKd"><span>这个问题可以从两个方面回答：第一，DSH 如何利用 Cordis 落地 Everything is a Plugin，把 Agent 的主要能力拆成可组合、可替换并受统一生命周期管理的插件；第二，DSH 如何使用 append-only Session Event Log 保存不可改写的运行事实，并把它作为会话的唯一事实来源。前者解决系统能力如何组合和演进，后者解决运行历史如何保持一致、可重建和可审计。</span></p>

<p id="f-doxcnmNVDM7JIa1UrbacJklEc3e"><span style="font-weight:bold">参考答案</span></p>

<p id="f-doxcn953Ad4hDGwmxMqmnVM2tlf"><span>可以认为 DSH 的核心设计理念主要体现在两个方面。</span></p>

<p id="f-doxcnBlzLC2UFBnUCxOYdnFWh6g"><span>第一个是 </span><span style="font-weight:bold">Everything is a Plugin（一切皆插件）</span><span>。DSH 不是在一个固定 Agent 核心外面增加少量工具，而是把模型适配器、工具系统、文件与进程能力、Session、存储、权限、Sandbox、子 Agent、Agent Loop，甚至 Web UI 都放进 Cordis 插件体系。Profile 和 </span><span><span><span>cordis.patch.yml</span></span></span><span> 决定当前系统加载哪些插件，Cordis 则使用 Loader、Registry、Context、Fiber 和 Effect 管理插件的加载、依赖、作用域、运行状态与资源清理。这样，同一套运行底座可以按场景组装出 Web、Headless 或其他 Agent 形态，具体能力也可以独立增加、禁用或替换。</span></p>

<p id="f-doxcnyPe0weZnYzg2U0L6tZh6ih"><span>第二个是 </span><span style="font-weight:bold">append-only Session Event Log</span><span>。DSH 将用户消息、模型输出、工具调用、工具结果和其他运行事实记录为只能追加的类型化事件，不原地修改已经发生的历史。这份日志不是额外保存的审计副本，而是会话的唯一事实来源；LLM 消息历史、Trajectory、恢复、Fork 和 Replay 都由同一事件流派生。DSH 还要求“模型可见即已记录”，即进入模型请求并影响决策的内容必须能够从日志重建。</span></p>

<p id="f-doxcniRoNEybn1UdsnohE9QHBLc"><span>这两个理念解决的是不同问题：Cordis 插件化让系统组件能够被组合和演进，append-only 日志让组件不断变化时，会话历史仍然保持一致、可追踪和可重建。结合起来看，DSH 更像一套开放的 Agent Runtime，而不只是一个固定工作流的 Agent 产品。</span></p>

<a id="f-doxcnQ4kX0550uSDQ9RIfs8ZwlW"></a>

##### 你如何看待 DSH 的爆火？

<blockquote id="f-doxcnax4Afwrx8yUTklCMAOqivh"><p id="f-doxcnj0Nrh92xo6yQOcvilHrZmd"><span style="font-weight:bold">点评</span></p>
<p id="f-doxcnCM4N2foPO4zoUtvb0ttuNd"><span>这个题就是面试官考察你对行业的思考了，虽然不是硬技能，但是也是面试官偶尔会问的问题。考察的逻辑是，只有你是对行业有思考，有理解的，你才可能有自己对产品的理解，运用行业知识到自己的产品上，做出创新，特别是创业公司，小一点的公司，特别喜欢问这样的问题。</span></p></blockquote>

<p id="f-doxcnzBlTY8SZXbUicZRoC7hVnb"><span style="font-weight:bold">参考答案</span></p>

<p id="f-doxcnJSmTS5CuCUO4xqxp5okC1d"><span>可以认为 DSH 的爆火既有 DeepSeek 品牌和发布时间带来的关注，也有开源策略、产品形态和技术方向共同作用的原因。</span></p>

<p id="f-doxcnN7CjFfWNunmK5hemtRUdti"><span>第一，DeepSeek 已经通过开源模型积累了很高的开发者关注度，DSH 又与其新模型同期发布，因此天然拥有较强的首发传播效应。但品牌只能解释初始流量，项目能够持续引发讨论，还在于它提供了比较明确的技术差异。</span></p>

<p id="f-doxcnaOqIvQJNRSkoSsRQEB5Abe"><span>第二，DSH 采用 MIT 许可证，开发者可以查看源码、修改实现、开发插件并基于它构建自己的产品。它还提供一条命令即可启动的本地 Web UI，相比主要面向终端用户的 Harness，体验门槛更低。这里的“免费”主要指 Harness 本身，模型 API、运行设备和第三方服务仍可能产生费用。</span></p>

<p id="f-doxcnYglJ1kNBiuCLtl7GbZKere"><span>第三，</span><span style="font-weight:bold">Everything is a Plugin</span><span> 是一个非常清晰的传播点，而且有 Cordis 架构和源码实现支撑。DSH 不只是让用户添加几个工具，而是把模型、工具、Session、存储、Sandbox、调度、UI，甚至 Agent Loop 都放进插件体系。这使开发者能够想象围绕模型接入、企业工具、自定义工作流和 Agent Runtime 形成插件生态。</span></p>

<p id="f-doxcngOpiOFq1SfZFXWlfNWeS7Q"><span>第四，它回应了开发者对开放 Harness 的需求。Claude Code、Codex 等产品已经提供了成熟体验，但很多核心编排和运行机制仍由厂商决定；DSH 则公开了完整 Harness，并强调模型与运行组件的可替换性，因此不仅吸引普通使用者，也吸引希望研究、定制或自建 Agent Runtime 的开发者。</span></p>

<p id="f-doxcnOsO9eb2kkbOd0ymrzeQNKe"><span>从行业背景看，Agent 竞争正在从单纯比较模型能力，扩展到比较 Harness 如何管理上下文、工具、会话、权限、执行环境和验证流程。同一个模型放在不同 Harness 中，实际任务表现可能不同。DSH 在这个时间点开源一套完整、可重新组合的 Agent Harness，正好踩中了行业从“关注模型”转向“关注模型外部执行系统”的趋势。</span></p>

<p id="f-doxcnxKHfoJD8kLae9ohRIWk2Kc"><span>不过，我不会把 GitHub 热度直接等同于产品成熟度或生产采用率。DSH 目前仍处于 Developer Preview，接口和数据格式可能发生破坏性变化，本地执行的安全边界、社区插件的供应链风险以及真实任务效果都需要继续验证。因此，可以认为它当前最大的价值，是提供了一套值得研究的开放 Harness 架构，并推动行业重新关注 Harness 层，而不是已经证明自己全面取代了 Claude Code 或 Codex。</span></p>

<a id="f-doxcn16T97rfZtaf4vceixbBewc"></a>

##### 你实际使用过 DSH 吗？使用体验如何？

<blockquote id="f-doxcnfhoUu8IcJgOCoidjGdZ50g"><p id="f-doxcnvuvCgmEo5swTaZfKU2sNGe"><span style="font-weight:bold">点评</span></p>
<p id="f-doxcnaYjQYe91kGSUE46bwsaOBd"><span>答题思路就是要不你就真的用过，聊聊自己的感受，要么就找一个网上的测评，然后沉淀成自己的答案。下面这个答案就是根据网上测评结果，用AI生成了一版。</span></p></blockquote>

<p id="f-doxcnVuv4wAATAybqKLHZlHq83f"><span style="font-weight:bold">参考答案</span></p>

<p id="f-doxcneaCXl32YZmdKHTcCrEhm8d"><span>我对 DSH 做过基础体验。整体感受是：它的架构理念和可观测性很有吸引力，Web UI 也降低了使用门槛，但产品仍然处于比较早期的阶段。</span></p>

<p id="f-doxcn1qjYKPQj4G9mhljgIkK7ce"><span>在使用流程上，DSH 可以在本地启动 Web UI。首次进入后配置模型 Provider 和 API Key，再选择 Workspace、模型和 Agent Preset。它并不只支持 DeepSeek，也可以接入其他 Provider 和本地 Ollama 模型。Web 形态比纯终端工具更直观，Session、Workspace、模型和 Preset 都可以在界面中管理。</span></p>

<p id="f-doxcn957lQvkCDSW6agEkIr4hRu"><span>基础 Agent 能力比较完整。给出一个应用开发任务后，它能够读取目录、调用 Bash、创建和修改文件，并根据工具结果继续执行。对我来说最直观的亮点是 </span><span style="font-weight:bold">Trajectory</span><span>：它可以展示系统提示词、用户上下文、模型显式输出、工具调用参数、执行结果、耗时和轮次，还可以导出 Session JSONL。相比只看到最终答案，这种可观测性更方便定位 Agent 为什么成功或从哪一步开始出错。不过，Trajectory 展示的是被记录的模型输入、显式输出和执行轨迹，不等于公开模型未输出的全部内部思维。</span></p>

<p id="f-doxcnDCCQFunzBvjy7BigDME7Go"><span>另一个明显特点是插件化。可以通过 Profile 和 </span><span><span><span>cordis.patch.yml</span></span></span><span> 启用、禁用或替换部分能力；Creator Mode 还能够根据自然语言需求生成插件，在用户批准后动态挂载到当前运行环境。这说明 DSH 的插件化不只是增加普通工具，连 UI 和运行时能力也可以参与组合。</span></p>

<p id="f-doxcnjEgaUEYU9bJEqrgOmRJqyd"><span>不足也比较明显。当前插件管理仍然偏开发者，部分操作需要理解配置文件；Creator Mode 生成的 UI 插件可能存在样式和交互问题。项目仍处于 Developer Preview，稳定性、兼容性和交互细节暂时不能与成熟产品直接相比。另外，DSH 会接触本地文件、Shell 和凭据，实际使用时需要控制 Workspace、权限和 Sandbox，不能默认本地运行就一定安全。</span></p>

<p id="f-doxcnkHRmIyXeqI86xxebMejTCb"><span>所以我的评价是：DSH 目前最值得体验的是 Cordis 插件化、Trajectory 和可重新组合的运行时，而不是把它简单理解为一个已经能够全面替代 Claude Code 的成熟产品。现阶段它更适合技术研究、插件实验和自定义 Agent Runtime；如果用于重要项目，还需要谨慎评估稳定性和安全边界。</span></p>

<a id="f-doxcnlU8MmqBoLjWYW5w4f5cOZd"></a>

##### 你如何看待 DSH 的发布？它与传统 Harness 有什么不同，又给行业带来了哪些启发？

<blockquote id="f-doxcnoS32b5k2IGrsVAPyVpfMvb"><p id="f-doxcnH3YqyCLUEbQxDrP1Vvt4og"><span style="font-weight:bold">点评</span></p>
<p id="f-doxcnC2Cr58yNiKSJbimTvfcekb"><span>其实就是上面的题目的总和，他和传统Harness的不同，这个就答我们刚才那两点：插件和log的append-only特性。 带来了什么启发，就可以谈上面的行业思考能力。</span></p></blockquote>

<p id="f-doxcnwrd7p1aV90sFGouPoIf7Oc"><span style="font-weight:bold">答题思路：先讲差异，再讲行业启发，最后保持冷静评价</span></p>

<p id="f-doxcnjjV70XcIDchACiAdbhixyb"><span>这道题可以分成三个层次回答。第一，使用 Cordis 插件化和 append-only Session Event Log 概括 DSH 与传统 Harness 的主要差异；第二，从开放生态、Harness 层价值和行业竞争迁移三个方面说明它带来的启发；第三，补充 Developer Preview 阶段的局限，避免把架构价值直接等同于产品成熟度。</span></p>

<p id="f-doxcntNMCyQoiL64PDFvFl0AHJc"><span style="font-weight:bold">参考答案</span></p>

<p id="f-doxcnZoStJo4OMcx1pC1u4UQTJh"><span>可以认为 DSH 的发布值得关注，因为它公开的不只是一个可以直接运行的 Agent 产品，还包括一套完整、可重新组合的 Agent Harness 架构。</span></p>

<p id="f-doxcnqknxvRiNi9dS894z0WISic"><span>与很多传统 Harness 相比，DSH 最明显的不同首先是 </span><span style="font-weight:bold">Everything is a Plugin</span><span>。传统产品通常拥有一个相对固定的核心，然后允许开发者增加工具、MCP 或 Skill；DSH 则把模型适配器、工具系统、Session、存储、权限、Sandbox、子 Agent、Agent Loop，甚至 Web UI 都放入 Cordis 插件体系。Profile 和配置决定系统使用哪些插件，Cordis 负责插件的依赖、作用域、生命周期、卸载清理和运行时重组。因此，开发者不仅可以给 Agent 增加功能，也可以重新组合 Agent 本身。</span></p>

<p id="f-doxcn30heD6gyPMJqkDoFW5u0Zc"><span>第二个不同是 </span><span style="font-weight:bold">append-only Session Event Log</span><span>。DSH 不把日志仅作为旁路审计记录，而是把只能追加的类型化事件设为会话的唯一事实来源。模型消息历史、Trajectory、恢复、Fork 和 Replay 都从同一事件流派生，并且遵守“模型可见即已记录”的原则。它强调的不只是能够回放，而是模型当时看到的内容和执行过程必须能够从日志重建。</span></p>

<p id="f-doxcnm9s5ICGScCQmhigZ7MLpQc"><span>对行业的第一个启发是，Agent 的竞争正在从单纯比较模型能力，扩展到 Harness 如何管理上下文、工具、权限、执行环境、会话和验证流程。同一个模型放在不同 Harness 中，任务成功率、成本和可靠性都可能不同，因此 Harness 不再只是模型外面的一层薄包装，而是在逐渐成为独立的产品和工程竞争层。</span></p>

<p id="f-doxcncrj7yBsnOpBJkiyCtNxdr0"><span>第二个启发是开放和组合可能成为 Harness 生态的重要方向。DSH 使用 MIT 许可证，并把模型、工具、存储、Loop 和 UI 都设计成可扩展组件，这为模型 Provider、企业内部工具、工作流、存储后端和界面插件提供了共同的扩展基础。如果生态能够形成，团队可以保留自己的 Harness 与业务能力，只替换变化更快的模型或局部组件，而不必随着每次技术迭代整体迁移产品。</span></p>

<p id="f-doxcnFtLqsA94LsocETIBtYzcNd"><span>第三个启发是，可观测性和可审计性会成为生产级 Agent 的基础能力。Agent 的行为具有不确定性，仅保存最终答案不足以解释失败。系统需要回答模型看到了什么、上下文来自哪里、调用了什么工具、权限为何被允许，以及错误从哪一步开始。DSH 的事件日志和 Trajectory 对这一方向提供了较完整的工程示例。</span></p>

<p id="f-doxcnwdBvnDrdQuKrHpXPwkE0Bn"><span>不过，我不会因为 DSH 的架构新颖和社区热度，就认为它已经全面优于 Claude Code 或 Codex。它仍处于 Developer Preview，兼容性、默认安全边界、社区插件供应链以及真实任务表现都需要继续验证。因此，可以认为 DSH 当前最重要的意义，是把开放、可组合、可追踪的 Harness 架构推到了行业讨论中心，并为其他 Agent 系统提供了值得借鉴的工程思路。</span></p>

<p id="f-doxcngFIH7TCPnRAvEzbF6DRuPc"><span>18.5 讲解视频</span></p>

<p id="f-doxcnjYIre9WxPSe7lb4eYBpn0c"><span><span><a href="https://www.bilibili.com/video/BV1ee8A6rEpp/?spm_id_from=333.1387.homepage.video_card.click&amp;vd_source=144bec9c3f54e465073138bed788be1b"><span>https://www.bilibili.com/video/BV1ee8A6rEpp/?spm_id_from=333.1387.homepage.video_card.click&amp;vd_source=144bec9c3f54e465073138bed788be1b</span></a></span></span></p>


<a id="section-1788"></a>
## OpenClaw (Clawdbot) 教程

<a id="t-block-23152"></a>

<p id="t-L7utPmllqtZSnQEe3x3Him"><span style="border-bottom:1px solid">OpenClaw（原名 Clawdbot，过渡名 Moltbot）是 2026 年 1 月突然爆火的开源个人 AI 助手项目，由 Peter Steinberger（PSPDFKit 创始人）开发。</span></p>

<p id="t-f7EFtsbtRXwpOR0otTGZhf"><span style="border-bottom:1px solid">OpenClaw 是一个可执行任务的智能体，我们给指令，它不仅回答，还能主动操作系统、访问网页、处理邮件、整理文件、发起提醒甚至自动编写代码。</span></p>

<p id="t-6ljNdvOggLSHIKG2Le8pFh"><span style="border-bottom:1px solid">OpenClaw 是一个把</span><span style="border-bottom:1px solid;font-weight:bold">本地算力 + 大模型 Agent 自动化</span><span style="border-bottom:1px solid">玩到极致的开发者效率工具。</span></p>

<p id="t-OLxbWsiFiJZBU2ilLgQTVe"><span style="border-bottom:1px solid">OpenClaw 目标是让 AI 不只是给建议，而是直接完成完整工程任务。</span></p>

<div id="t-7fFPiO2vxcfSXB30tgUJ7k"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/46c81c2b7bf7a9e1c775e843.png"/></div>

<p id="t-KNc0z3aHGLPDbRs6cFzGMk"><span style="border-bottom:1px solid">因为 Anthropic 在 1 月 27 日发律师函称 Clawd / Clawdbot与 Claude 太像，项目在当天紧急更名为 Moltbot（脱皮龙虾之意，吉祥物是小龙虾 Molty 🦞），但功能完全一致，旧命令 clawdbot 仍然兼容。</span></p>

<p id="t-pVwm75jNzXGHSZ7G4eIbuk"><span style="border-bottom:1px solid">Moltbot 是项目组为了应对侵权风险想出的过渡名字，OpenClaw 这是目前的最终官方名称。</span></p>

<ul><li id="t-MkoEtA9tOBUMLLdXs5vimZ"><span style="border-bottom:1px solid">OpenClaw 官网:</span><span style="border-bottom:1px solid">https://openclaw.ai/</span></li></ul>

<ul><li id="t-CCs7V0PaialAugXFxVaKIu"><span style="border-bottom:1px solid">中文文档：</span><span style="border-bottom:1px solid">https://docs.openclaw.ai/zh-CN</span></li></ul>

<ul><li id="t-F3R2CGL5gwNxsK9QSlsAgH"><span style="border-bottom:1px solid">Github 地址：</span><span style="border-bottom:1px solid">https://github.com/openclaw/openclaw</span></li></ul>

<ul><li id="t-UI8Kkr2bgL5ogZqRRh4UkT"><span style="border-bottom:1px solid">OpenClaw 技能合集:</span><span style="border-bottom:1px solid">https://github.com/VoltAgent/awesome-openclaw-skills</span></li></ul>

<p id="t-NIpsU9k0wt6K8zgwQ9LPqj"><span style="border-bottom:1px solid">Clawbot、Moltbot 和 OpenClaw 其实是同一个开源项目，名字演进顺序为：</span></p>

<pre id="t-Vp1o3wUiyxoiNPZ1vy9qAl"><code>Clawdbot → Moltbot → OpenClaw</code></pre>

<div id="t-faHW2Sz5wVFFPNPJjrDo98"><table><colgroup><col width="120"/><col width="148.89752197265625"/><col width="195.01727294921875"/><col width="183.89752197265625"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>名称</span></p></td><td style=" vertical-align: top"><p><span>时间线</span></p></td><td style=" vertical-align: top"><p><span>背景/原因</span></p></td><td style=" vertical-align: top"><p><span>本质关系</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Clawdbot / Clawbot</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">2025 年末至 2026 年 1 月初</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">最初项目名；灵感来自</span><span style="border-bottom:1px solid;font-style:italic">Claude</span><span style="border-bottom:1px solid">和</span><span style="border-bottom:1px solid;font-style:italic">claw</span><span style="border-bottom:1px solid">（龙虾爪）梗</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">原始名称，是最早出现在 GitHub 的身份</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Moltbot</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">2026 年 1 月 27 日</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">因 Anthropic 商标顾虑被要求更名</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">中间过渡名字；功能、代码与 Clawdbot 一致</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">OpenClaw</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">2026 年 1 月 30 日之后</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">抛弃版权冲突、强调开源性/长线品牌</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">当前官方名称，也是今后文档、仓库等统一标识</span></p></td></tr></tbody></table></div>


<a id="section-1789"></a>
## 安装方法

<a id="t-f1d67CpjDijYrZhlj09VH7"></a>

<p id="t-5Qnc7LMiuxikRERRiEKTaw"><span style="border-bottom:1px solid">OpenClaw 的安装被设计得极为友好，即使是非开发者也能快速上手。</span></p>

<p id="t-scEkhyMyQZzoRLPG26Q9eu"><span style="border-bottom:1px solid">系统要求（不一定 Mac mini）：</span></p>

<ul><li id="t-8eLO2uAeqSHWcbY3NQnirp"><span>硬件：极低，2GB RAM 即可运行。</span></li></ul>

<ul><li id="t-yjoxDyxgWdZeIrA3LngHo8"><span>环境：支持 Mac, Windows, Linux，需要安装 Node.js (pnpm) 或使用 Docker。</span></li></ul>


<a id="section-1790"></a>
## 推荐安装方式（一键脚本）

<a id="t-xrke9gWp2nWUmF2JzEFgIY"></a>

<p id="t-MelSOnPi5b2oGQG8cx7lBT"><span style="border-bottom:1px solid">直接通过终端，执行以下命令。</span></p>

<p id="t-bsrziiyJEhmkvoWs0zreQr"><span style="border-bottom:1px solid">macOS/Linux 系统:</span></p>

<pre id="t-ArWqwTxZ3LIJZ1aq06b92Q"><code>curl -fsSL https://openclaw.ai/install.sh | bash</code></pre>

<p id="t-nqofLzKJg2ZfYwK2XIf25m"><span style="border-bottom:1px solid">Windows 系统：</span></p>

<pre id="t-8TyLRDnctc746m6hr8m6fo"><code>#PowerShell
iwr -useb https://openclaw.ai/install.ps1 | iex

#CMD
curl -fsSL https://openclaw.ai/install.cmd -o install.cmd &amp;&amp; install.cmd &amp;&amp; del install.cmd</code></pre>

<p id="t-BrGUXjAoSUZ6KYioIy0CkI"><span style="border-bottom:1px solid">这会自动安装 Node.js（≥22）并完成基本配置。</span></p>


<a id="section-1791"></a>
## 手动安装

<a id="t-8SjXDVSFtXczsN3fjICctN"></a>

<p id="t-4DODDf5shuxOnSMkrkzZ0x"><span style="border-bottom:1px solid">需要</span><span style="border-bottom:1px solid;font-weight:bold">Node.js ≥22</span><span style="border-bottom:1px solid">并完成基本配置：</span></p>

<p id="t-Y6odMQbg9raHCDzlQCXfOj"><span style="border-bottom:1px solid;font-weight:bold">使用 npm：</span></p>

<pre id="t-pexI6LLTSFEYV9ZZBogUC6"><code>npm i -g openclaw

# 如果速度慢可以指定国内镜像
npm i -g openclaw --registry=https://registry.npmmirror.com</code></pre>

<p id="t-VaYf9drqPiunabuJvvbHzT"><span style="border-bottom:1px solid;font-weight:bold">或使用 pnpm：</span></p>

<pre id="t-Q4CbnaUSPt6DlJpe4AvPpG"><code>pnpm add -g openclaw</code></pre>

<p id="t-erPIHeXeTHxG98fmNfXMha"><span style="border-bottom:1px solid">安装完成后，初始化并安装后台服务（launchd / systemd 用户服务）：</span></p>

<pre id="t-eLdVS7aY6PCiQE5HoZmVTQ"><code>openclaw onboard</code></pre>


<a id="section-1792"></a>
## 从源码安装（开发模式）

<a id="t-6cg9n3WYWTui1yZJXPBIQ4"></a>

<pre id="t-G8izBHqOUbh5Fja1gdIuwl"><code>git clone https://github.com/openclaw/openclaw.git
cd openclaw

pnpm install

pnpm ui:build   # 首次运行会自动安装 UI 相关依赖并构建前端界面
pnpm build      # 构建整个项目（包含后端与相关模块）

# 初始化 OpenClaw 并安装为系统后台服务（开机自动运行）
pnpm openclaw onboard --install-daemon

# 开发模式：监听 TypeScript 代码变更并自动重载网关服务
pnpm gateway:watch</code></pre>


<a id="section-1793"></a>
## 配置说明

<a id="t-jYrAsB44dCAWGFEG424Ffz"></a>

<p id="t-9tWy4icUTVU9nWnnYT1xC4"><span style="border-bottom:1px solid">我们推荐使用一键脚本安装。</span></p>

<p id="t-NgaE1nSxIOn6iwEXUsMR7H"><span style="border-bottom:1px solid">macOS/Linux 系统:</span></p>

<pre id="t-O6iGXAqXI82GZU4eSO7ZeY"><code>curl -fsSL https://openclaw.ai/install.sh | bash</code></pre>

<p id="t-rDU2jlruklxvfGw6qTprO5"><span style="border-bottom:1px solid">Windows 系统：</span></p>

<pre id="t-bRInfi3SeGw5NeNWvG5zOm"><code>#PowerShell
iwr -useb https://openclaw.ai/install.ps1 | iex

#CMD
curl -fsSL https://openclaw.ai/install.cmd -o install.cmd &amp;&amp; install.cmd &amp;&amp; del install.cmd</code></pre>

<p id="t-eXfldwvAVbhPKY09vFjjdB"><span style="border-bottom:1px solid">它会完成环境检测，并且安装必要的依赖，还会启动 onboarding(设置向导) 流程。</span></p>

<p id="t-fmDrll1U7G9YW727hGdzY3"><span style="border-bottom:1px solid">后期要重新进入设置向导，可以执行以下命令：</span></p>

<pre id="t-sxEmfd4a13uRgDATJA8FfN"><code>openclaw onboard --install-daemon</code></pre>

<div id="t-ZhfqwDG3WEUgVwJYcOMvbe"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/e8f4666f2cd43125f319d7d2.png"/></div>

<p id="t-IlIPiWOumtqiAJtEgpzTLJ"><span style="border-bottom:1px solid">然后，会提醒你这个龙虾能力很强，当然风险也很大，我们选</span><span style="border-bottom:1px solid;font-weight:bold">yes</span><span style="border-bottom:1px solid">（no 就不安装了） 就好了：</span></p>

<div id="t-vTUtZFLInnyP0YdBsuP96Y"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/5cacc82f635647381b37b3fa.png"/></div>

<p id="t-fTnVUMTs1L52Bvuqs7tcUj"><span style="border-bottom:1px solid">接下来我们就选快速启动</span><span style="border-bottom:1px solid;font-weight:bold">QuickStart</span><span style="border-bottom:1px solid">选项：</span></p>

<div id="t-djCkOBdh9yNIOAqLDW7HxJ"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/389e78ed3df8f4c0ebfed57c.png"/></div>

<p id="t-3ND0iZb6Hv3ZlOolBCDxa9"><span style="border-bottom:1px solid">接下来我们需要配置一个大模型，Model/Auth Provider 选择 AI 供应商，国内外的供应商基本都支持。</span></p>

<div id="t-PrXDnH4muTHZuBenRWojdP"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/1e1b7a1de3cbb47a06bde4f0.png"/></div>

<p id="t-nNNpZW2qxBipJHwalloEOy"><span style="border-bottom:1px solid">如果没有海外的账号，配置咱们国内的 Qwen、MiniMax、智谱的 API key 也是可以的，认证配置文件（OAuth + API 密钥）在</span><span style="border-bottom:1px solid;font-weight:bold">~/.openclaw/agents/&lt;agentId&gt;/agent/auth-profiles.json</span><span style="border-bottom:1px solid">，后期也可以在这个文件上修改。</span></p>

<p id="t-OD7GYFhunbvnCT8mcZic0Z"><span style="border-bottom:1px solid">然后会出现选择聊天工具的选项，海外的一般都没有可以选最后一个：</span></p>

<div id="t-qvKctmu32efEkyXC0gmpM4"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/7bc56f598a54667748118d4c.png"/></div>

<p id="t-pFOEJADiO19BUp4FxaOOpc"><span style="border-bottom:1px solid">其他配置，比如端口的设置</span><span style="border-bottom:1px solid;font-weight:bold">Gateway Port</span><span style="border-bottom:1px solid">，按默认的 18789 即可，比如 Skills、包的安装管理器选 npm 或其他，可以一路 Yes 下去。</span></p>

<div id="t-xV3yc4laDGgZ9nPSNHCi1v"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/f5d5728fb40d1e92eb46e5e6.png"/></div>

<p id="t-ZyWifRziyZGvYZHjI2qsRV"><span style="border-bottom:1px solid">选一些自己喜欢的 skills，也可以直接跳过，使用</span><span style="border-bottom:1px solid;font-weight:bold">空格</span><span style="border-bottom:1px solid">按键选择：</span></p>

<div id="t-sJlCdm02nEpr9SO3WW8cOl"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/627fd4935b1719276239af77.png"/></div>

<p id="t-6GwtGD2HYQp4CogwBIA4qw"><span style="border-bottom:1px solid">这些 API key，没有的直接选</span><span style="border-bottom:1px solid;font-weight:bold">no</span><span style="border-bottom:1px solid">：</span></p>

<div id="t-Pu9EbT9ePosKuagocoijWJ"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/90567639876d26f34a6e5546.png"/></div>

<p id="t-EhTY24vCfQSrA2TQ2nhJHU"><span style="border-bottom:1px solid">最后这三个钩子可以开启，使用</span><span style="border-bottom:1px solid;font-weight:bold">空格</span><span style="border-bottom:1px solid">按键选择，主要做内容引导日志和会话记录：</span></p>

<div id="t-fs6PabbSHmTFncOqIoD4g0"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/5fd5915844a2f160d6846a65.png"/></div>

<p id="t-F1GhDvGI9urrcWGeWJDMnL"><span style="border-bottom:1px solid">选择Open the Web UI，使用浏览器打开：</span></p>

<div id="t-mFfKgSMBvINXvTiefDm9xJ"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/8956e67dea585059ef705bbf.png"/></div>

<p id="t-wqSzCI9wL7vlbeWBcUsHIp"><span style="border-bottom:1px solid">安装完后，就会自动访问</span><span style="border-bottom:1px solid;font-weight:bold">http://127.0.0.1:18789/chat</span><span style="border-bottom:1px solid">，就可以打开聊天界面让它开始工作。</span></p>

<p id="t-CqS4NShRfsJMP92ZSOE5j6"><span style="border-bottom:1px solid">比如搜索最新的科技新闻：</span></p>

<div id="t-cA3anVHRqENcJMGF3RNH3L"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/3594463b8eb08bf70b035c39.webp"/></div>

<p id="t-iJtie82dcV0A1GP3uEEPb4"><span style="border-bottom:1px solid">启动后，我们可以使用</span><span style="border-bottom:1px solid;font-weight:bold">openclaw status</span><span style="border-bottom:1px solid">命令查看状态：</span></p>

<pre id="t-BskuXqXXGY0GOaSxbg1h6G"><code>openclaw status</code></pre>

<p id="t-uuu7ySeUvpxBDWk576JefE"><span style="border-bottom:1px solid">如果你在新手引导期间安装了服务，Gateway 网关应该已经在运行：</span></p>

<pre id="t-2xYrHaOlGfAtREqJmzbLP6"><code>openclaw gateway status</code></pre>

<p id="t-KA3Voax1mwMYzBEdZnNu5a"><span style="border-bottom:1px solid">手动运行（前台）：</span></p>

<pre id="t-A4E1I9DWGeROBLLOkyozuR"><code>openclaw gateway --port 18789 --verbose</code></pre>

<p id="t-xEDZo0mDRoV7DxeQRGquTn"><span style="border-bottom:1px solid">安装后可以执行的命令：</span></p>

<ul><li id="t-ruXZQOSMZWxkcxVTli07vs"><span>运行新手引导：</span><span style="border-bottom:1px solid">openclaw onboard --install-daemon</span></li></ul>

<ul><li id="t-ib3ekxGtiN0hJMatM4w8bI"><span>快速检查：</span><span style="border-bottom:1px solid">openclaw doctor</span></li></ul>

<ul><li id="t-NZem0bNkxDky60fDo8SopH"><span>检查 Gateway 网关健康状态：</span><span style="border-bottom:1px solid">openclaw status</span><span>+</span><span style="border-bottom:1px solid">openclaw health</span></li></ul>

<ul><li id="t-GtgV0CWSpvAYHB24f2BnW3"><span>打开仪表板：</span><span style="border-bottom:1px solid">openclaw dashboard</span></li></ul>


<a id="section-1794"></a>
## 卸载

<a id="t-ututI5PhxhnwHZmEmiXNIk"></a>

<p id="t-uzag3avzcQc4HT2WVB8neT"><span style="border-bottom:1px solid">使用内置卸载程序：</span></p>

<pre id="t-G0QAeZwpTJ8Jvo7IYc7Cwo"><code>openclaw uninstall</code></pre>

<p id="t-HOodykyUUfuZoVVnZEx8Yu"><span style="border-bottom:1px solid">非交互式（自动化 / npx）：</span></p>

<pre id="t-wASfbjk3M6im5Zj6DMmWiv"><code>openclaw uninstall --all --yes --non-interactive
npx -y openclaw uninstall --all --yes --non-interactive</code></pre>


<a id="section-1795"></a>
## 使用技能

<a id="t-Sw19wW3dZHN4oQSqJUibTM"></a>

<p id="t-9fjx9Bp84qiHDLEXTtjzNL"><span style="border-bottom:1px solid">技能是包含 SKILL.md 文件的独立文件夹，想要为 OpenClaw 代理拓展新功能，ClawHub 是查找、安装技能的最优选择。</span></p>

<p id="t-TsmXZFSndAajgp28TfDnji"><span style="border-bottom:1px solid">ClawHub 技能仓库地址：</span><span style="border-bottom:1px solid">https://clawhub.ai/</span></p>

<p id="t-OtG03WE9Nh5kS0SQ1pLOtu"><span style="border-bottom:1px solid">ClawHub 国内镜像：</span><span style="border-bottom:1px solid">https://skillhub.tencent.com/</span></p>

<p id="t-6RxSmDab6pKS1GMQcvH0la"><span style="border-bottom:1px solid">安装 ClawHub 工具：</span></p>

<pre id="t-ym6I6WkitTp4F6qYHX9h5n"><code># 推荐方式（npx 无需全局安装）
npx clawhub@latest --version

# 或全局安装（方便以后直接用 clawhub 命令）
npm install -g clawhub
# 或者用 pnpm
pnpm add -g clawhub</code></pre>

<p id="t-Ow75jxG5GzuSIK02iGbQq4"><span style="border-bottom:1px solid">登录：</span></p>

<pre id="t-envCJecrM5gMFLo7yG7Bz9"><code>clawhub login</code></pre>

<p id="t-h0TUbhc5emZRgazVGSWIqb"><span style="border-bottom:1px solid">搜索技能：</span></p>

<pre id="t-9MLnDVvooycKkWiutS43p3"><code>clawhub search "postgres backups"</code></pre>

<p id="t-TOs2V3rDJntZJCBS2cYeq6"><span style="border-bottom:1px solid">下载安装新技能：</span></p>

<pre id="t-2D7GiTyfRfxDCFgiQAY3au"><code>clawhub install my-skill-pack</code></pre>

<p id="t-ruO2YVByMAnJdk1zTa7jjr"><span style="border-bottom:1px solid">批量更新已安装技能：</span></p>

<pre id="t-QwhWE9B4qVASyCWmqmqpzB"><code>clawhub update --all</code></pre>


<a id="section-1796"></a>
## 插件管理

<a id="t-DWYkDF1wIC7FMxM78RhRff"></a>

<p id="t-APnPyuVeeW54Ca80cXHQEx"><span style="border-bottom:1px solid">插件是轻量代码模块，可通过新增命令、工具及 Gateway RPC 能力，为 OpenClaw 拓展额外功能。</span></p>

<p id="t-E3dmpNWuhr6qlenbsXcvqm"><span style="border-bottom:1px solid">查看已加载插件：</span></p>

<pre id="t-CJYOTfolWOpLh57v3uOFEq"><code>openclaw plugins list</code></pre>

<p id="t-mI7lhqj8w9wZ2eCi33e6Xn"><span style="border-bottom:1px solid">安装官方插件（示例：语音通话插件）：</span></p>

<pre id="t-7rniO3u8ktv7TqZxzHs9Mb"><code>openclaw plugins install @openclaw/voice-call</code></pre>

<p id="t-bXiK1xaZ4jEt8vSLNi7Gf6"><span style="border-bottom:1px solid">插件安装后重启网关生效：</span></p>

<pre id="t-yR003RiL2ntJAidhEEt4WS"><code>openclaw gateway restart</code></pre>


<a id="section-1797"></a>
## 常用命令

<a id="t-AAkWRfyIZRX7vKW2C6eFHJ"></a>

<p id="t-OaCrSBFu2tZm0Q27DUllRG"><span style="border-bottom:1px solid;font-weight:bold">OpenClaw 常用命令一览表：</span></p>

<div id="t-JygxQUwWqPVxKnUfh2oJ0o"><table><colgroup><col width="120"/><col width="200.9044189453125"/><col width="277.00335693359375"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>分类</span></p></td><td style=" vertical-align: top"><p><span>命令</span></p></td><td style=" vertical-align: top"><p><span>描述</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">初始化与安装</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw onboard</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">交互式向导（配置模型、通道、网关、工作区）</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">初始化与安装</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw setup</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">初始化配置 + 工作区（非交互版）</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">初始化与安装</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw configure</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">交互式配置向导（模型、通道、技能）</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">网关管理</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw gateway status</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">查看网关服务状态 + RPC 探活</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">网关管理</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw gateway start</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">启动网关服务</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">网关管理</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw gateway stop</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">停止网关服务</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">网关管理</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw gateway restart</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">重启网关服务</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">网关管理</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw gateway run</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">直接在前台运行网关（调试用）</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">网关管理</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw gateway health</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">获取网关健康信息</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">配置管理</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw config file</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">显示当前配置文件完整路径</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">配置管理</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw config get &lt;path&gt;</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">读取配置项</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">配置管理</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw config set &lt;path&gt; &lt;value&gt;</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">修改配置项</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">配置管理</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw config validate</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">校验配置文件是否合法</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">诊断与状态</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw doctor</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">一键健康检查 + 自动修复</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">诊断与状态</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw status</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">显示会话健康状态和最近联系人</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">诊断与状态</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw health</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">从运行中的网关拉取健康数据</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">诊断与状态</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw logs</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">实时查看网关日志</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">其他高频操作</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw dashboard</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">打开网页控制面板</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">其他高频操作</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw channels status</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">查看已连接的聊天通道</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">其他高频操作</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw agent run</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">手动触发一次代理运行</span></p></td></tr></tbody></table></div>

<p id="t-T4RLoMxcxgbD1QAueqsoxZ"><span style="border-bottom:1px solid">改完配置后记得运行</span><span style="border-bottom:1px solid">openclaw gateway restart</span><span style="border-bottom:1px solid">让改动生效～ 🦞</span></p>


<a id="section-1798"></a>
## 通道管理

<a id="t-Y7SptcESPGGU3qhT5gjIlY"></a>

<ul><li id="t-eorzSS8OtzE2at13B3n3VZ"><span style="border-bottom:1px solid;font-weight:bold">WhatsApp</span><span>：</span><span style="border-bottom:1px solid">openclaw channels login</span><span>（或扫描 QR）</span></li></ul>

<ul><li id="t-IpppdCglO4RR55l56EDUlP"><span style="border-bottom:1px solid;font-weight:bold">Telegram</span><span>：</span><span style="border-bottom:1px solid">openclaw channels add --channel telegram</span><span>（需 Bot Token）</span></li></ul>

<ul><li id="t-AJfeDQb0sgCHBb7CgI7FhV"><span style="border-bottom:1px solid;font-weight:bold">Discord</span><span>：</span><span style="border-bottom:1px solid">openclaw channels add --channel discord</span><span>（需 Bot Token）</span></li></ul>

<ul><li id="t-J9KJiExJmzhQE8GC2Jblcn"><span style="border-bottom:1px solid;font-weight:bold">iMessage</span><span>：macOS 原生桥接</span></li></ul>

<ul><li id="t-uUJt55iaT9jOmou8uOULS4"><span style="border-bottom:1px solid;font-weight:bold">Slack</span><span>：</span><span style="border-bottom:1px solid">openclaw channels add --channel slack</span><span>（需 Bot Token）</span></li></ul>


<a id="section-1799"></a>
## 工作区结构（Workspace Anatomy）

<a id="t-1w7ugiVNsu1GetD759x4N3"></a>

<ul><li id="t-aBE7yxHo44kztyZ6SWQM8N"><span style="border-bottom:1px solid">AGENTS.md</span><span>：指令说明</span></li></ul>

<ul><li id="t-HpYSQCd1DZ29iKrgoNGDis"><span style="border-bottom:1px solid">USER.md</span><span>：偏好设置</span></li></ul>

<ul><li id="t-LmyJjqlQMgF8o0Oc5VEcZq"><span style="border-bottom:1px solid">MEMORY.md</span><span>：长期记忆</span></li></ul>

<ul><li id="t-NA2zqDRlugBxyERCZleX0e"><span style="border-bottom:1px solid">HEARTBEAT.md</span><span>：检查清单</span></li></ul>

<ul><li id="t-DFMrYPviKpz3CqLUByQw8k"><span style="border-bottom:1px solid">SOUL.md</span><span>：人格/语气</span></li></ul>

<ul><li id="t-DIEFovnsiS7d2QyVF6Tdu6"><span style="border-bottom:1px solid">IDENTITY.md</span><span>：名称/主题</span></li></ul>

<ul><li id="t-oMbUExNvQlc4gF1X5ygmYe"><span style="border-bottom:1px solid">BOOT.md</span><span>：启动配置</span></li></ul>

<ul><li id="t-ICkP1nIX3kqxPsxj0ZPCzw"><span>根目录：</span><span style="border-bottom:1px solid">~/.openclaw/workspace</span></li></ul>


<a id="section-1800"></a>
## 聊天内斜杠命令

<a id="t-7QIDsPcjMdHJbUBNuq5R2q"></a>

<ul><li id="t-j4Uw5XfmhKTdaUjZl1O2vm"><span style="border-bottom:1px solid">/status</span><span>：健康 + 上下文</span></li></ul>

<ul><li id="t-ADA2YrI63g2akWMSDeS3Wc"><span style="border-bottom:1px solid">/context list</span><span>：上下文贡献者</span></li></ul>

<ul><li id="t-kCSug8BjBJrq6wfKf97292"><span style="border-bottom:1px solid">/model &lt;m&gt;</span><span>：切换模型</span></li></ul>

<ul><li id="t-PAUVjMS4u2Fmd2XTkcRvtZ"><span style="border-bottom:1px solid">/compact</span><span>：释放窗口空间</span></li></ul>

<ul><li id="t-jzPyBpd8EToQlBjCmEXVkn"><span style="border-bottom:1px solid">/new</span><span>：全新会话</span></li></ul>

<ul><li id="t-S86TLX6d56jEEES7uYnrl2"><span style="border-bottom:1px solid">/stop</span><span>：中止当前运行</span></li></ul>

<ul><li id="t-6K2ZNeRlGZZKcXJlpJ696G"><span style="border-bottom:1px solid">/tts on|off</span><span>：切换语音</span></li></ul>

<ul><li id="t-QKMAxeoJyUbxOFJtRUIaKq"><span style="border-bottom:1px solid">/think</span><span>：切换推理模式</span></li></ul>


<a id="section-1801"></a>
## 关键路径映射（Essential Path Map）

<a id="t-TpVxEMg93aqMhVdBG62gB3"></a>

<ul><li id="t-Z0ZXjY8gGKF6zOKhKpYLOX"><span>主配置：</span><span style="border-bottom:1px solid">~/.openclaw/openclaw.json</span></li></ul>

<ul><li id="t-aLCXVKVPGqNTVFL2Yo3aZL"><span>默认工作区：</span><span style="border-bottom:1px solid">~/.openclaw/workspace/</span></li></ul>

<ul><li id="t-mnWOL8D8q0lm3V1nObbQW8"><span>智能体状态目录：</span><span style="border-bottom:1px solid">~/.openclaw/agents/&lt;cid&gt;/</span></li></ul>

<ul><li id="t-bm0DB8ntBXKtrDwXxjnOEQ"><span>OAuth &amp; API 密钥：</span><span style="border-bottom:1px solid;font-weight:bold">~/.openclaw/agents/&lt;agentId&gt;/agent/auth-profiles.json</span><span>，如果是旧版本的在</span><span style="border-bottom:1px solid">~/.openclaw/credentials/</span></li></ul>

<ul><li id="t-uLfbjykCGcrNLsqJhWqOdl"><span>向量索引存储：</span><span style="border-bottom:1px solid">~/.openclaw/memory/&lt;cid&gt;.sqlite</span></li></ul>

<ul><li id="t-pO7nCCIOv06g0sCN88rNoT"><span>全局共享技能：</span><span style="border-bottom:1px solid">~/.openclaw/skills/</span></li></ul>

<ul><li id="t-toivbqW8vlGfDPHmmyaAqo"><span>网关文件日志：</span><span style="border-bottom:1px solid">/tmp/openclaw/*.log</span></li></ul>


<a id="section-1802"></a>
## 语音与 TTS

<a id="t-TaKIUdinpRtg9aES5v7Chx"></a>

<ul><li id="t-rHW5WqY2RbMjY686K1tsKl"><span>付费：OpenAI / ElevenLabs</span></li></ul>

<ul><li id="t-PlXQba3gBZWTY7Yp1KnJsQ"><span>免费：Edge TTS（无需 API Key）</span></li></ul>

<ul><li id="t-KLVYkt8mm2Bfs1jhwU84pm"><span>自动 TTS：</span><span style="border-bottom:1px solid">messages.tts.auto: "always"</span></li></ul>


<a id="section-1803"></a>
## 内存与模型

<a id="t-hw7qZX4gGjKkq6rSTLrKa3"></a>

<ul><li id="t-h2j2e5HPrq0QailoLlWkO8"><span>向量搜索：</span><span style="border-bottom:1px solid">memory search "X"</span></li></ul>

<ul><li id="t-r6c1FbtoMnZ0aAqPjjkOso"><span>模型切换：</span><span style="border-bottom:1px solid">models set &lt;model&gt;</span></li></ul>

<ul><li id="t-7au0H06hWmoX64biNDELiZ"><span>认证设置：</span><span style="border-bottom:1px solid">models auth setup</span></li></ul>

<ul><li id="t-v7CQLlzl4FDzZ4g1vjzsjZ"><span>日志：</span><span style="border-bottom:1px solid">memory/YYYY-MM-DD.md</span></li></ul>


<a id="section-1804"></a>
## Hooks 与技能

<a id="t-gNDneI4A7MNyc077EE0MVd"></a>

<ul><li id="t-4qMWtRntSW6N1fGZRlv0Fg"><span>ClawHub：</span><span style="border-bottom:1px solid">clawhub install &lt;slug&gt;</span></li></ul>

<ul><li id="t-AczF9c8GjIfPaJ3Df4gJZX"><span>Hook 列表：</span><span style="border-bottom:1px solid">openclaw hooks list</span></li></ul>


<a id="section-1805"></a>
## 故障排除

<a id="t-sMX339g3Gg7rUxGnNUbXNR"></a>

<ul><li id="t-dM5whEXwrzWzLto75YLDwr"><span>无 DM 回复 → 配对列表 → 批准</span></li></ul>

<ul><li id="t-ioymtpoBdR0BPZ59XjVBa4"><span>群组中静音 → 检查提及模式配置</span></li></ul>

<ul><li id="t-XVgak5BDTDReyAWzsGg9jG"><span>认证过期 →</span><span style="border-bottom:1px solid">models auth setup-token</span></li></ul>

<ul><li id="t-qpIGVy3NGaoIUiz5FYrVyQ"><span>网关关闭 →</span><span style="border-bottom:1px solid">doctor --deep</span></li></ul>

<ul><li id="t-vWXQTq00rO7aeoBZr3yitR"><span>内存 Bug → 重建内存索引</span></li></ul>


<a id="section-1806"></a>
## 自动化与研究

<a id="t-cLpb4NTn1X4XTyoarfe4iF"></a>

<ul><li id="t-ku0qU6ctkZ6gQlcQvKTVrC"><span>浏览器：</span><span style="border-bottom:1px solid">browser start/screenshot</span></li></ul>

<ul><li id="t-MY7pCExanfvCxMtfLGRe2V"><span>子代理：</span><span style="border-bottom:1px solid">/subagents list/info</span></li></ul>

<ul><li id="t-rBqA3e37oELYdeSyOvPCO7"><span>定时任务：</span><span style="border-bottom:1px solid">cron list/run &lt;cid&gt;</span></li></ul>

<ul><li id="t-3kNZ62m2XxninCuusBqFaX"><span>心跳：</span><span style="border-bottom:1px solid">heartbeat.every: "30m"</span></li></ul>


<a id="section-1807"></a>
## 通过第三方云直接安装配置

<a id="t-k4KlAcwcUTmCWajBBT2ixz"></a>

<p id="t-RWdtHyvhBb1krzXuHlth3C"><span style="border-bottom:1px solid">现在各大平台都已经支持这个智能体，如果不想安装在本机，可以一键部署云上OpenClaw：</span></p>

<ul><li id="t-e1QWU3Zof55cwO4CUCv3Kc"><span>阿里云：</span><span style="border-bottom:1px solid">https://www.aliyun.com/activity/ecs/clawdbot</span></li></ul>

<ul><li id="t-eau00wTQ1ruSg1jyp4hbhu"><span>腾讯云：</span><span style="border-bottom:1px solid">https://cloud.tencent.com/developer/article/2624973</span></li></ul>

<p id="t-TQb8ldCRZFHNJ4CGwHru32"><span style="border-bottom:1px solid">使用阿里云的轻量级服务器安装：</span><span style="border-bottom:1px solid">https://www.aliyun.com/activity/ecs/clawdbot</span><span style="border-bottom:1px solid">。</span></p>

<div id="t-yHkGn0mzz0uLSds1l4eKlG"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/f4b56a9c04b0c21c0f3a3e3c.png"/></div>

<p id="t-pzVcUfTMGjtA6IfgekFW0S"><span style="border-bottom:1px solid">可以使用它们的镜像，一键安装：</span></p>

<div id="t-KuYBjCezYBQX3NhnDFnxRf"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/ca7f69cfd9c7ae7290d2a896.png"/></div>

<p id="t-Du1XPonJqr8u9hyrgMvgs8"><span style="border-bottom:1px solid">使用腾讯云的轻量级服务器安装：</span><span style="border-bottom:1px solid">https://cloud.tencent.com/developer/article/2624973</span></p>

<div id="t-VEPPLGDdtMNIxg5lHRXL71"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/e39069ee992aa3b86643ba87.png"/></div>


<a id="section-1808"></a>
## 常用命令

<a id="t-UnWP9Freu0UjLGoQZXyr0R"></a>

<p id="t-uWzBRPkONvN9HdcK7NGEJC"><span style="border-bottom:1px solid">OpenClaw 常用命令如下：</span></p>

<div id="t-9Eo4BeJ35w47J4c2eyOYBm"><table><colgroup><col width="190.9027404785156"/><col width="224.00860595703125"/><col width="231.00341796875"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>命令</span></p></td><td style=" vertical-align: top"><p><span>作用</span></p></td><td style=" vertical-align: top"><p><span>备注 / 参数</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw status</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">查看 Gateway 当前运行状态</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">包含健康度与上下文信息</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw health</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">健康检查</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">检测 core、依赖与运行环境</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw doctor</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">综合诊断与修复建议</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">支持</span><span style="border-bottom:1px solid">--deep</span><span style="border-bottom:1px solid">深度检查</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw onboard</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">交互式初始化向导</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">首次使用推荐</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw onboard --install-daemon</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">安装系统守护进程</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">后台常驻运行 Gateway</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw onboard --uninstall-daemon</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">卸载守护进程</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">不删除数据</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw configure</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">交互式配置向导</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">模型、通道、凭据等</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw config get &lt;path&gt;</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">获取配置值</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">JSON Path</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw config set &lt;path&gt; &lt;value&gt;</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">设置配置项</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">支持 JSON5 / raw 文本</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw config unset &lt;path&gt;</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">清除配置项</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">移除单个键值</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw channels list</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">列出已登录通道</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">WhatsApp / Telegram / Discord 等</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw channels login</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">登录新的通道账号</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">扫码或授权流程</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw channels add</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">添加通道</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Telegram / Discord / Slack</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw channels status --probe</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">通道健康检查</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">检测连接可达性</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw skills list</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">列出技能</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">已安装 / 可用技能</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw skills info &lt;skill&gt;</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">技能详情</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">参数、版本信息</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">clawhub install &lt;slug&gt;</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">从 ClawHub 安装技能</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">官方技能市场</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw hooks list</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">列出 Hook 列表</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">事件钩子机制</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw plugins list</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">列出插件</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">查看已安装插件</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw plugins install &lt;id&gt;</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">安装插件</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">例如</span><span style="border-bottom:1px solid">@openclaw/voice-call</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw plugins enable &lt;id&gt;</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">启用插件</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">通常需要重启 Gateway</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw models list</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">列出可用模型</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">包含鉴权状态</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw models status</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">模型状态</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">当前可用性</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw models auth setup-token</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">模型鉴权配置</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Cheatsheet 推荐方式</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw memory search "X"</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">搜索长期记忆</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">向量搜索</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw memory index</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">重建记忆索引</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">修复 memory 异常</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw logs</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">查看日志</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">默认聚合输出</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw logs --follow</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">实时日志</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">--json / --plain / --limit</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw gateway install</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">安装 Gateway 系统服务</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">注册为系统守护进程</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw gateway start</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">启动 Gateway 服务</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">system service 模式</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw gateway stop</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">停止 Gateway 服务</span></p></td><td style=" vertical-align: top"></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw gateway restart</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">重启 Gateway 服务</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">配置变更后使用</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw gateway status</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Gateway 系统服务状态</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">不同于</span><span style="border-bottom:1px solid">openclaw status</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw browser start</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">启动浏览器代理</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Automation 能力</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw browser screenshot</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">网页截图</span></p></td><td style=" vertical-align: top"></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw subagents list</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">列出子代理</span></p></td><td style=" vertical-align: top"></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw cron list</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">列出定时任务</span></p></td><td style=" vertical-align: top"></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw cron run &lt;id&gt;</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">执行定时任务</span></p></td><td style=" vertical-align: top"></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw uninstall</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">卸载 Gateway 服务及数据</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">官方推荐</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw uninstall --all --yes --non-interactive</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">全自动卸载</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">状态 / workspace / 插件</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw uninstall --state</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">删除状态文件</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">不删除 workspace</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw uninstall --workspace</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">删除工作区</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">agent / workspace 数据</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw uninstall --service</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">仅卸载系统服务</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">不删除数据</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw uninstall --dry-run</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">模拟卸载</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">仅展示结果</span></p></td></tr></tbody></table></div>


<a id="section-1809"></a>
## 为什么最近这么火？

<a id="t-aKDO0yvhRchvJ0wrZnuVlk"></a>

<ul><li id="t-aPcf4BBKGpt6KTLZ6DSTWc"><span>真正做到了"像JARVIS一样"：能读写文件、跑终端命令、操作浏览器、收发邮件、日历、写代码、订机票、清空收件箱……</span></li></ul>

<ul><li id="t-mOHB5sZBxkOAMSzLQl6Y10"><span>本地优先 + 长期记忆：所有对话跨平台共享上下文，USER.md 和 memory/ 目录会越用越聪明</span></li></ul>

<ul><li id="t-L33Yy1AuxFlk3gqYnRBl6W"><span>支持几乎所有大模型：Claude、Gemini、OpenAI、Ollama 本地模型、Pi 等</span></li></ul>

<ul><li id="t-h4L9UyGaGAzWoPCnKYtbP0"><span>社区技能生态爆炸：ClawdHub 上已有 500+ 社区技能（Slack、Discord、GitHub、浏览器控制、macOS UI 自动化……）</span></li></ul>

<ul><li id="t-Oiu3Qp4Jne2RwkVfFYIaEq"><span>安装简单像 npm install，实际能力却很 spicy （开发者原话）</span></li></ul>

<div id="t-niMB0rMS0Clm52c56R6CT1"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/2843c0e2ae0681f2ea95518c.png"/></div>

<p id="t-Qs9qq2gWY6kFuzsTQa360I"><span style="border-bottom:1px solid">其核心能力包括：</span></p>

<ul><li id="t-vjd2QvLTUD72EC0vUPPSfY"><span>将自然语言目标拆解为可执行步骤</span></li></ul>

<ul><li id="t-XPpdJ2FVRULL59SaBJa3uk"><span>自动调用终端命令</span></li></ul>

<ul><li id="t-sMvX6T5l7awo5tXtBUiv8Q"><span>创建与修改项目文件</span></li></ul>

<ul><li id="t-EyksNZsHsZiXUGpjN6Oe89"><span>运行代码并检测结果</span></li></ul>

<ul><li id="t-28fFp0SZ79IG0AKobIDXaX"><span>根据报错自动修复</span></li></ul>

<p id="t-6MtfRwRM7Hvo4Nd95kxAOH"><span style="border-bottom:1px solid">相比 Claude Code/OpenCode 这种代码补全工具，OpenClaw 更接近一个具备执行权限的工程型智能体。</span></p>

<ul><li id="t-QKOxxp7ujAwpwEm5dn7Rju"><span>Claude Code 与 OpenCode等 强在代码质量与理解</span></li></ul>

<ul><li id="t-SJzb7mrkmqoWTTy66YJy4e"><span>OpenClaw 强在自动完成整个工程流程</span></li></ul>

<div id="t-D8e8yBT1WPkvvksfDtNB3A"><table><colgroup><col width="120"/><col width="120"/><col width="120"/><col width="120"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>能力维度</span></p></td><td style=" vertical-align: top"><p><span>OpenClaw</span></p></td><td style=" vertical-align: top"><p><span>Claude Code</span></p></td><td style=" vertical-align: top"><p><span>OpenCode</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">任务规划</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">强</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">中</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">中</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">自动执行</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">完整</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">部分</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">部分</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">自我修复</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">有</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">无</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">无</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">工程级操作</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">强</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">强</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">中</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">本地自动化</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">原生支持</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">较弱</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">较弱</span></p></td></tr></tbody></table></div>


<a id="section-1810"></a>
## OpenClaw 快速上手

<a id="t-block-23353"></a>

<p id="t-I4wU0fBrYLWwnulMComyys"><span style="border-bottom:1px solid">使用以下命令一键安装。</span></p>

<p id="t-NoUMpZ6MYQuYRzuNgvhs8y"><span style="border-bottom:1px solid;font-weight:bold">macOS/Linux：</span></p>

<pre id="t-w2WNtub9eL7JCdBXelBiFx"><code>curl -fsSL https://openclaw.ai/install.sh | bash</code></pre>

<p id="t-SXK3caoOyX8fwqXNCCy0nu"><span style="border-bottom:1px solid;font-weight:bold">Windows（PowerShell）：</span></p>

<pre id="t-dIt5rbkH69fzLKoQL5dfTJ"><code>iwr -useb https://openclaw.ai/install.ps1 | iex</code></pre>


<a id="section-1811"></a>
## 启动引导

<a id="t-YoF8le6bHMkG8nPzB2Xe3i"></a>

<p id="t-WDaHU3cfF7gmwYxL39Kyhi"><span style="border-bottom:1px solid">安装完成后，运行 Onboarding 完成初始配置。这是最关键的一步：</span></p>

<pre id="t-OS13VNcdDxeIk5WXNeOJDy"><code>openclaw onboard --install-daemon</code></pre>

<p id="t-GXOh3yIeEYAWO3sfqjjs64"><span style="border-bottom:1px solid">新手引导会配置认证、Gateway 网关设置和可选渠道。：</span></p>

<ul><li id="t-8180fCx7p9oUMihOVdOQ5i"><span style="border-bottom:1px solid;font-weight:bold">鉴权配置</span><span>：设置 Gateway Token 或 Password，保护你的 API 接口</span></li></ul>

<ul><li id="t-j87A1qkWHANFm7lBSbosC8"><span style="border-bottom:1px solid;font-weight:bold">模型提供商配置</span><span>：选择并配置你的 LLM（如 Anthropic API Key）</span></li></ul>

<ul><li id="t-ZlGJBo14DCRskqgio7bv9w"><span style="border-bottom:1px solid;font-weight:bold">渠道配置（可选）</span><span>：连接 Telegram Bot、WhatsApp 等聊天渠道</span></li></ul>

<ul><li id="t-va83QWYCni9HkpJzdMtne1"><span style="border-bottom:1px solid;font-weight:bold">安装系统服务</span><span>：</span><span style="border-bottom:1px solid">--install-daemon</span><span>参数让 Gateway 开机自启</span></li></ul>

<div id="t-Whmlp4GnJmQQ3hfHmnBp2T"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/b5cbbda2895534a844927f0e.svg"/></div>


<a id="section-1812"></a>
## Gateway 基础操作

<a id="t-k3WSHDWHtY3JyXjLayfJaP"></a>

<p id="t-YbwlOS6DOixpxwWKnKZjCM"><span style="border-bottom:1px solid">Gateway 是 OpenClaw 的核心进程，所有功能都依赖它运行：</span></p>

<pre id="t-3f5wGTn6pEwsjf4AymUwrW"><code># 查看 Gateway 状态
openclaw gateway status

# 在前台运行（适合调试）
openclaw gateway --port 18789

# 详细日志模式
openclaw gateway --port 18789 --verbose

# 强制占用端口并启动（解决端口冲突）
openclaw gateway --force

# 重启 Gateway
openclaw gateway restart

# 停止 Gateway
openclaw gateway stop

# 查看实时日志
openclaw logs --follow</code></pre>


<a id="section-1813"></a>
## 访问 Control UI

<a id="t-ijQthKTWCMSJQcTvYqy7db"></a>

<p id="t-YuXFudElIog2k4h1qxWtbt"><span style="border-bottom:1px solid">Control UI 是 OpenClaw 的可视化管理界面：</span></p>

<pre id="t-rGV7tgcaxrZQHninuGlB2x"><code># 打开 Control UI（自动在浏览器中打开）
openclaw dashboard</code></pre>

<div id="t-ZE6PrlD66r1cRjXIbacDzq"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/d70b157b31879bf7ec38e48e.png"/></div>

<p id="t-9VzwTXiAqeycqcefZ3NkZd"><span style="border-bottom:1px solid">或者直接访问:</span><span style="border-bottom:1px solid;font-weight:bold">http://127.0.0.1:18789/</span><span style="border-bottom:1px solid">。</span></p>

<div id="t-5RP8zLAhwTKgh3hYmg6S7L"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/7ea7ae73b6adfd445ceb4eda.png"/></div>

<p id="t-9kM1ZhADWakksRX6HQMVvX"><span style="border-bottom:1px solid">Control UI 的主要功能：</span></p>

<ul><li id="t-cEqkkikMVVaoP2e4SmUBU5"><span style="border-bottom:1px solid;font-weight:bold">聊天界面</span><span>：不需要配置任何渠道，直接在浏览器里和 AI 对话</span></li></ul>

<ul><li id="t-8qwsg1pxnI8mHKOxwjAl4K"><span style="border-bottom:1px solid;font-weight:bold">状态监控</span><span>：查看 Gateway 健康状态、渠道连接情况</span></li></ul>

<ul><li id="t-lWvwbWVnqrZl996pXqPi4L"><span style="border-bottom:1px solid;font-weight:bold">会话管理</span><span>：查看和管理不同渠道的对话历史</span></li></ul>

<p id="t-4fmIOyHBG3GT7GCz3GUDnI"><span style="border-bottom:1px solid">接下来我们就可以在页面开始聊天了：</span></p>

<div id="t-sYU8jRab1cHciAeB8vKsUU"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/1083da6d69e3c03a06d322a5.png"/></div>

<blockquote id="t-p3D05sgYiu88PHJv374zwK"><p id="t-uH1sNvsHg101x5cVuiIsPp"><span style="border-bottom:1px solid;font-style:italic">🚀</span><span style="border-bottom:1px solid;font-style:italic;font-weight:bold">最快体验路径</span><span style="border-bottom:1px solid;font-style:italic">打开 Control UI 后直接开始聊天——不需要配置任何 Channel！这是最快验证 OpenClaw 正常工作的方式。</span></p></blockquote>


<a id="section-1814"></a>
## 关键命令速查

<a id="t-PpKDuwRDjG1QxBDFQiPpoz"></a>

<div id="t-aNvqWpnQ5APLYzArNcaJhY"><table><colgroup><col width="308.9010314941406"/><col width="260.00341796875"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>命令</span></p></td><td style=" vertical-align: top"><p><span>说明</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw doctor</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">全面健康检查并尝试修复配置问题</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw health</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">快速健康检查</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw status</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">查看 Gateway 和渠道整体状态</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw gateway status</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">查看 Gateway 进程状态</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw gateway status --deep</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">深度状态检查（包含 RPC 探针）</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw gateway run</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">前台运行 Gateway</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw gateway start</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">后台启动 Gateway 服务</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw gateway stop</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">停止 Gateway 服务</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw gateway restart</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">重启 Gateway 服务</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw gateway probe</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">检测 Gateway 连通性和状态</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw gateway discover</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">发现局域网或远程 Gateway</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw gateway call health</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">调用 Gateway 健康检查接口</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw channels status --probe</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">检查所有渠道连接状态</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw dashboard</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">打开浏览器控制面板</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw logs --follow</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">实时跟踪日志输出</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw onboard</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">重新运行初始化配置向导</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">openclaw secrets reload</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">热重载 Secrets 配置</span></p></td></tr></tbody></table></div>


<a id="section-1815"></a>
## Gateway 热重载机制

<a id="t-wRvyf7lbLa8zQRQswzbb1X"></a>

<p id="t-lAk6mLl1TtcyEiocR8ZN3i"><span style="border-bottom:1px solid">OpenClaw 支持配置热重载，默认为</span><span style="border-bottom:1px solid">hybrid</span><span style="border-bottom:1px solid">模式：</span></p>

<div id="t-8TZAjfKvvesKnNGFAyFtHI"><table><colgroup><col width="220.90618896484375"/><col width="346.00341796875"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">gateway.reload.mode</span></p></td><td style=" vertical-align: top"><p><span>行为说明</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">off</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">不自动重载，需手动重启</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">hot</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">仅应用安全变更（不中断连接）</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">restart</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">任何变更都重启 Gateway</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">hybrid</span><span style="border-bottom:1px solid">（默认）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">能热应用的热应用，需要重启的自动重启</span></p></td></tr></tbody></table></div>


<a id="section-1816"></a>
## TUI：终端聊天界面

<a id="t-Le0MKPSYm8j5LFNytTIQYf"></a>

<p id="t-dcHSIugp2hGjjSa0uzaLj6"><span style="border-bottom:1px solid">除了浏览器 Control UI，OpenClaw 还提供了一个完全在终端里运行的交互界面——</span><span style="border-bottom:1px solid;font-weight:bold">TUI（Terminal UI）</span><span style="border-bottom:1px solid">，无需浏览器，SSH 连进服务器也能直接聊天。</span></p>


<a id="section-1817"></a>
## 快速启动

<a id="t-XFUIyrSNVO1bWhuSC0L9cp"></a>

<pre id="t-OkfzIUdxBNeHXb3ak7YjuZ"><code># 第一步：确保 Gateway 已运行
openclaw gateway

# 第二步：打开 TUI
openclaw tui</code></pre>

<div id="t-dvb9hZ52OGO4lxn6J9sJaL"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/2003debc31c6bef806f5df00.png"/></div>

<p id="t-BENaCm55527fJ4RcXVhTH0"><span style="border-bottom:1px solid">连接远程 Gateway：</span></p>

<pre id="t-pN992C3xp1pGHSL5AyQw7i"><code>openclaw tui --url ws://&lt;host&gt;:&lt;port&gt; --token &lt;gateway-token&gt;

# 如果 Gateway 使用密码鉴权
openclaw tui --url ws://&lt;host&gt;:&lt;port&gt; --password &lt;password&gt;</code></pre>


<a id="section-1818"></a>
## 界面布局

<a id="t-pCrikEgutWp27mFQQgEpGv"></a>

<p id="t-0sBCX4WTx7TbdS4Yr8FFVF"><span style="border-bottom:1px solid">TUI 启动后你会看到四个区域：</span></p>

<div id="t-DhTaAMpldiqFLUCsGcSjK4"><table><colgroup><col width="196.8975524902344"/><col width="369.005126953125"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>区域</span></p></td><td style=" vertical-align: top"><p><span>内容</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Header（顶栏）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">连接 URL、当前 Agent、当前 Session</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Chat log（消息区）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">用户消息、AI 回复、系统通知、工具调用卡片</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Status line（状态行）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">连接 / 运行状态（connecting / running / streaming / idle / error）</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Footer（底栏）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">连接状态 + Agent + Session + 模型 + Token 计数</span></p></td></tr></tbody></table></div>

<p id="t-QFregtOoOx03WJuEDIhb3n"><span style="border-bottom:1px solid">头部区域：</span></p>

<div id="t-cadB5zseOt7T3DjNfTtC0H"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/ced595a043bd08c5fd75fbb0.png"/></div>

<p id="t-2QuxmPIeADALA3iYH3DRvj"><span style="border-bottom:1px solid">底部区域：</span></p>

<div id="t-Dm4s0vJewhHzNz9Ss2ymd6"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/32ca8e7425d060ff560af09f.png"/></div>


<a id="section-1819"></a>
## 键盘快捷键

<a id="t-JFHx7V50jnsDDdYr2xEoM9"></a>

<div id="t-Wu2knqgeAC1WLz4dVatGyE"><table><colgroup><col width="120"/><col width="363.89752197265625"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>快捷键</span></p></td><td style=" vertical-align: top"><p><span>功能</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Enter</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">发送消息</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Esc</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">中止当前运行</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Ctrl+C</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">清空输入（连按两次退出）</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Ctrl+D</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">退出 TUI</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Ctrl+L</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">打开模型选择器</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Ctrl+G</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">打开 Agent 选择器</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Ctrl+P</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">打开 Session 选择器</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Ctrl+O</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">切换工具输出展开 / 折叠</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Ctrl+T</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">切换 Thinking 显示（会重新加载历史）</span></p></td></tr></tbody></table></div>


<a id="section-1820"></a>
## 常用斜杠命令

<a id="t-FDASjXSN0j6vWAOUwqh6bW"></a>

<p id="t-YsEn083rwPUMiqXorHxhRA"><span style="border-bottom:1px solid">使用</span><span style="border-bottom:1px solid;font-weight:bold">/</span><span style="border-bottom:1px solid">调出命令：</span></p>

<div id="t-WtcPagXm65VCR2ZxvS8IrX"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/d86f672632356471c51347b1.png"/></div>

<p id="t-BehESSR6B0P4UI0pSgTUvE"><span style="border-bottom:1px solid">常用命令：</span></p>

<pre id="t-AuwNACIfnWZTLQoDKJLnZ9"><code>/help                          # 查看帮助
/status                        # 查看连接状态
/agent &lt;id&gt;                    # 切换 Agent
/session &lt;key&gt;                 # 切换 Session
/model &lt;provider/model&gt;        # 切换模型（如 /model anthropic/claude-sonnet-4-6）
/think &lt;off|minimal|low|medium|high&gt;   # 设置思考深度
/deliver &lt;on|off&gt;              # 开启/关闭消息投递到 Provider
/new                           # 重置当前 Session
/abort                         # 中止当前运行
/exit                          # 退出 TUI</code></pre>


<a id="section-1821"></a>
## 本地 Shell 命令

<a id="t-KflrxAkEBF3RNLRmq7moJ4"></a>

<p id="t-z04hBHh6juJbfbRcPbUsME"><span style="border-bottom:1px solid">在输入框以</span><span style="border-bottom:1px solid;font-weight:bold">!</span><span style="border-bottom:1px solid">开头，可以直接执行本地 shell 命令：</span></p>

<pre id="t-0yBuYOiRO4mNmrvRne8TmS"><code>!ls -la          # 列出当前目录
!cat log.txt     # 查看文件内容</code></pre>

<blockquote id="t-iEO9d6Ie0BAauayHAVfsMG"><p id="t-h05Hc0VB3kd0Zm4c4rGazl"><span style="border-bottom:1px solid;font-style:italic">⚠️ TUI 会在每次会话中首次使用</span><span style="border-bottom:1px solid;font-style:italic">!</span><span style="border-bottom:1px solid;font-style:italic">时提示确认授权，拒绝后本次会话内</span><span style="border-bottom:1px solid;font-style:italic">!</span><span style="border-bottom:1px solid;font-style:italic">将不可用。</span></p></blockquote>


<a id="section-1822"></a>
## 启动选项

<a id="t-WerhSE9CYlyV8n1k2dHOFl"></a>

<div id="t-GRe26hz8pf7NASYDVX9NDl"><table><colgroup><col width="212.001708984375"/><col width="212.001708984375"/><col width="224.005126953125"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>参数</span></p></td><td style=" vertical-align: top"><p><span>说明</span></p></td><td style=" vertical-align: top"><p><span>默认值</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">--url &lt;url&gt;</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Gateway WebSocket 地址</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">读取配置或</span><span style="border-bottom:1px solid">ws://127.0.0.1:&lt;port&gt;</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">--token &lt;token&gt;</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Gateway Token 鉴权</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">—</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">--password &lt;password&gt;</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Gateway 密码鉴权</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">—</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">--session &lt;key&gt;</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">指定 Session</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">main</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">--deliver</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">启动时开启消息投递</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">默认关闭</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">--thinking &lt;level&gt;</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">覆盖思考级别</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">—</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">--history-limit &lt;n&gt;</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">加载历史条数</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">200</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">--timeout-ms &lt;ms&gt;</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Agent 超时时间</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">读取 agents.defaults.timeoutSeconds</span></p></td></tr></tbody></table></div>


<a id="section-1823"></a>
## 相关内容

<a id="t-d9Q01rGDlXmfOgHqqHz2Op"></a>

<p id="t-pU9b4wz2lBzQu7TGUxceKg"><span style="border-bottom:1px solid">其他相关内容如下：</span></p>

<p id="t-erf5hFf8vUtiWw34fvuhL8"><span style="border-bottom:1px solid">OpenClaw 一键部署</span></p>

<p id="t-hTh8mrqezxNM9kWYOlBfU0"><span style="border-bottom:1px solid">OpenClaw 配置目录</span></p>

<p id="t-cDYFrj85LFJVajoOZtqdbt"><span style="border-bottom:1px solid">OpenClaw 工作原理</span></p>

<p id="t-Ml7SHlqNdDMH4rW2OfHDyC"><span style="border-bottom:1px solid">OpenClaw 接入微信</span></p>

<p id="t-l7onB7oIqcjfttrpASqGzx"><span style="border-bottom:1px solid">OpenClaw 接入飞书</span></p>

<p id="t-7jTtU3eWQLgDANCJWbNoGr"><span style="border-bottom:1px solid">OpenClaw Skills</span></p>

<p id="t-T3FANjfXHKdtL8aG5QHWaz"><span style="border-bottom:1px solid">OpenClaw 卸载指南</span></p>


<a id="section-2100"></a>
## Hermes Agent

<a id="t-block-24637"></a>

<p id="t-H6d9MoAzFTHxM0pcR02lIA"><span style="border-bottom:1px solid">近年来，AI 智能体（AI Agent）领域发展迅猛，从单纯的聊天机器人进化到能真正做事、持久记忆并自主成长的智能体。</span></p>

<p id="t-GQzgWGcMRSlgy7bfOkZ1Jl"><span style="border-bottom:1px solid">Hermes Agent 是 Nous Research 开源的自主 AI Agent 框架，通过自然语言交互的自主 AI Agent，它可以执行终端命令、操控浏览器、读写文件、联网搜索、生成图像，并且跨会话保持记忆。</span></p>

<ul><li id="t-GPWA5iQweDTr0JQGIszbH8"><span>GitHub 仓库：</span><span style="border-bottom:1px solid">https://github.com/nousresearch/hermes-agent</span></li></ul>

<ul><li id="t-ftocfsHnawNv6HRKPYP6Ob"><span>Hermes Agent 官网：</span><span style="border-bottom:1px solid">https://hermes-agent.nousresearch.com/</span></li></ul>

<div id="t-EzpfErrlqbtZI8IXltNPgH"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/edd293fa238a11ad73339793.png"/></div>

<blockquote id="t-YMWYgLWq06Lpy8mUWQq6pB"><p id="t-bC7QamrPl0y7Lb7uKU7unw"><span style="border-bottom:1px solid;font-style:italic">官方定义非常直接：</span><span style="border-bottom:1px solid">The</span><span style="border-bottom:1px solid"> agent that grows </span><span style="border-bottom:1px solid;font-weight:bold">with</span><span style="border-bottom:1px solid"> you</span><span style="border-bottom:1px solid">.</span><span style="border-bottom:1px solid">一个会随着使用不断成长的</span><span style="border-bottom:1px solid">Agent</span><span style="border-bottom:1px solid">。</span><span style="border-bottom:1px solid;font-style:italic">
它是一个自主智能体，运行时间越长，能力就越强。</span></p></blockquote>

<p id="t-0Eb2yyygBUQX7vUAIgdYBA"><span style="border-bottom:1px solid">Hermes Agent 的核心理念是：</span><span style="border-bottom:1px solid;font-weight:bold">让 AI 成为长期在线的数字员工，而非一次性聊天机器人。</span></p>

<p id="t-tcsmOlWmDeo64ZpQO1yAbV"><span style="border-bottom:1px solid">Hermes Agent 是业内少见的</span><span style="border-bottom:1px solid;font-weight:bold">原生内置学习闭环的 AI Agent</span><span style="border-bottom:1px solid">，可从执行经验中沉淀技能、自主优化能力、持久化知识、检索历史对话，并在跨会话中持续完善用户认知模型。</span></p>

<p id="t-11VFUhGZJEv75feoJuEK4g"><span style="border-bottom:1px solid">和普通 AI 聊天工具的区别：</span></p>

<div id="t-0FCubdtT8vPulOX3jG61se"><table><colgroup><col width="93.89755249023438"/><col width="183.89752197265625"/><col width="347.1265869140625"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>维度</span></p></td><td style=" vertical-align: top"><p><span>普通 AI 聊天（如 ChatGPT）</span></p></td><td style=" vertical-align: top"><p><span>Hermes Agent</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">记忆</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">每次对话从零开始</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">跨会话持久记忆，越用越懂你</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">执行能力</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">只能生成文字</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">可执行终端命令、操作文件、控制浏览器</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">运行位置</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">云端，数据上传服务商</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">本地或你的服务器，数据不离开你</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">扩展性</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">封闭生态</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">开放技能标准（agentskills.io）、MCP 生态</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">触达方式</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">网页</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">CLI + Telegram/Discord/Slack/WhatsApp 等</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">模型绑定</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">固定模型</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">支持 300+ 模型，随时切换，不锁定</span></p></td></tr></tbody></table></div>

<p id="t-qKS91Ll2hJv0G0B9j2mGWK"><span style="border-bottom:1px solid;font-weight:bold">核心特性:</span></p>

<ul><li id="t-PVOiu99rTMNFFSHEU4FuFe"><span style="border-bottom:1px solid;font-weight:bold">连接（Connect）:</span><span>Telegram、Discord、Slack、WhatsApp、Signal、Email、CLI——一个 Agent，统一内存，所有平台。在 Telegram 发起的对话，可以在终端无缝继续。</span></li></ul>

<ul><li id="t-sANGRbUHx8fVrGWYNbhmPt"><span style="border-bottom:1px solid;font-weight:bold">记忆（Remember）:</span><span>Hermes 会学习你的项目、自动生成技能，并且永远不会忘记它解决过的问题。每次会话结束后，重要信息都会写入持久记忆。</span></li></ul>

<ul><li id="t-70LaSUxg0ysVnaQofId8LU"><span style="border-bottom:1px solid;font-weight:bold">定时（Schedule）:</span><span>用自然语言设定定时任务——日报、备份、例行审查、晨间简报——在后台无人值守运行。</span></li></ul>

<ul><li id="t-ZT9tCprrqcZ4Axe21wbcIm"><span style="border-bottom:1px solid;font-weight:bold">委派（Delegate）:</span><span>生成拥有独立对话上下文、独立终端和 Python RPC 脚本的隔离子 Agent，实现零上下文成本的并行流水线。</span></li></ul>

<ul><li id="t-Iq0xZsfYn5F8yJ1sNvUmOE"><span style="border-bottom:1px solid;font-weight:bold">搜索与多模态（Search）:</span><span>网页搜索、浏览器自动化、视觉理解、图像生成、文字转语音、多模型推理，全部内置。</span></li></ul>

<p id="t-80MRVUNy70Cs9qRjp1oZKu"><span style="border-bottom:1px solid">Hermes Agent 支持自由切换任意大模型，包括</span><span style="border-bottom:1px solid;font-weight:bold">Nous Portal、OpenRouter（200+ 模型）、OpenAI、GLM、Kimi、MiniMax</span><span style="border-bottom:1px solid">等，执行</span><span style="border-bottom:1px solid;font-weight:bold">hermes model</span><span style="border-bottom:1px solid">即可切换，无需改代码、无厂商锁定。</span></p>

<div id="t-bgPA3osRQDea4iaSd80hz6"><table><colgroup><col width="120"/><col width="243.9061279296875"/><col width="289.00341796875"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>提供商</span></p></td><td style=" vertical-align: top"><p><span>说明</span></p></td><td style=" vertical-align: top"><p><span>设置方式</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Nous Portal</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">订阅制，零配置</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">通过</span><span style="border-bottom:1px solid">hermes model</span><span style="border-bottom:1px solid">进行 OAuth 登录</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">OpenAI Codex</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">ChatGPT OAuth，使用 Codex 模型</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">通过</span><span style="border-bottom:1px solid">hermes model</span><span style="border-bottom:1px solid">进行设备代码认证</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Anthropic</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">直接使用 Claude 模型</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">通过 Claude Code 认证或 Anthropic API 密钥</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">OpenRouter</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">多提供商路由</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">输入您的 API 密钥</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">DeepSeek</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">直接 DeepSeek API 访问</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">设置</span><span style="border-bottom:1px solid">DEEPSEEK_API_KEY</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Hugging Face</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">通过统一路由器访问 20+ 开放模型</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">设置</span><span style="border-bottom:1px solid">HF_TOKEN</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">自定义端点</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">VLLM、SGLang、Ollama 或任何 OpenAI 兼容 API</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">设置基础 URL 和 API 密钥</span></p></td></tr></tbody></table></div>

<p id="t-6d9kvYVlUJvn5g5mXKbmY1"><span style="border-bottom:1px solid">当然买 Coding Plan 这种还是最划算的，毕竟包月：</span></p>

<p id="t-VB5esD8pCSfJv7DY7VzvxQ"><span style="border-bottom:1px solid;font-weight:bold">字节跳动官方 Coding Plan</span><span style="border-bottom:1px solid">
模型：Doubao、GLM、DeepSeek、Kimi、MiniMax 等</span></p>

<p id="t-tkf9Q9PLrdfWqaKfdDawrN"><span style="border-bottom:1px solid;font-weight:bold">讯飞星辰 MaaS</span><span style="border-bottom:1px solid">
有免费的模型调用，一站式AI大模型体验、调用、部署、精调平台</span></p>

<p id="t-G4bHBPqDdNE0zojryUvcdU"><span style="border-bottom:1px solid;font-weight:bold">阿里云 Token Plan</span><span style="border-bottom:1px solid">
模型 Qwen3.5-Plus、 MiniMax M2.5、GLM-5、Kimi-k2.5 等</span></p>

<div id="t-zrtVmECcBrCtfb2LSvh8qb"><table><colgroup><col width="120"/><col width="443.9061279296875"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>特性</span></p></td><td style=" vertical-align: top"><p><span>能力说明</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">原生终端交互</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">完整 TUI 界面，支持多行编辑、命令补全、历史回溯、流式输出等</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">全平台接入</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">一个网关接入 CLI、Telegram、Discord、Slack、WhatsApp 等多端</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">闭环学习体系</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">自主管理记忆、技能生成与优化、跨会话召回、用户建模</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">定时自动化</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">内置 Cron 调度，支持日报、备份、审计等 7×24 自动任务</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">并行任务处理</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">支持子 Agent 并行执行、多工作流拆分与 RPC 工具调用</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">多环境运行</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">支持本地、Docker、SSH、Daytona、Modal 等 6 种后端</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">科研级能力</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">支持轨迹生成、强化学习环境、训练数据压缩</span></p></td></tr></tbody></table></div>


<a id="section-2101"></a>
## 整体架构

<a id="t-QmR2Opq2vcBuZPrRULWcxQ"></a>

<p id="t-jxA3CPEyDOhcxomL5NBVqs"><span style="border-bottom:1px solid">整体流程：</span></p>

<div id="t-uhvKNiK1EJKvU1vZodpRNf"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/fed4f599cb186c8c66863045.png"/></div>

<p id="t-Y7LxirseNa6SyuhK0B2JUO"><span style="border-bottom:1px solid">架构图：</span></p>

<div id="t-3vljNk7uvrCB4qm2ZMGA34"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/6131f1354dc170d221219b96.webp"/></div>

<div id="t-9lcBOdAxXjPhoXvoIfc3Mk"><table><colgroup><col width="221.90621948242188"/><col width="201.99981689453125"/><col width="282.01031494140625"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>模块</span></p></td><td style=" vertical-align: top"><p><span>作用</span></p></td><td style=" vertical-align: top"><p><span>示例</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">接入层（Clients）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">接收用户请求</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Web、App、API、飞书</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">输入层（Input）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">处理各种输入数据</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">文本、图片、PDF、Excel</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">调度器（Agent Orchestrator）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">理解任务并拆分执行流程</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">分析需求 → 制定计划</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">能力层（Capabilities）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">提供执行能力</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">对话、检索、代码执行</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">记忆层（Memory）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">保存上下文和历史信息</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">会话记忆、长期记忆</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">知识层（Knowledge）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">提供知识检索能力</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">RAG、向量数据库</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">模型层（Model Layer）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">提供推理能力</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">GPT、Claude、本地模型</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">工具层（Tools）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">调用外部工具完成任务</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">搜索、数据库、API</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">外部服务层（External Services）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">对接业务系统</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">ERP、CRM、云服务</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">基础设施层（Infrastructure）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">支撑系统运行</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">权限、日志、监控</span></p></td></tr></tbody></table></div>


<a id="section-2102"></a>
## 快速安装

<a id="t-jseeqRme8A7Wh3MCjzplIq"></a>

<p id="t-S8GTcSGKKCEhe1nCINxugh"><span style="border-bottom:1px solid">以下安装命令适用于 Linux、macOS 与 WSL2 系统：</span></p>

<pre id="t-BgEOzoedtgHTO31NcWKBgl"><code>curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash</code></pre>

<p id="t-hfLhsjOHfH73hPL01pIMDZ"><span style="border-bottom:1px solid">安装完成后重新加载 Shell：</span></p>

<pre id="t-8vdMvI1RtCtAKpde6y50mR"><code>bashsource ~/.bashrc   # 使用 bash
# 或
source ~/.zshrc    # 使用 zsh</code></pre>

<p id="t-oqYmfroiNM7mpMCfRqKyhd"><span style="border-bottom:1px solid">Windows 原生安装（PowerShell）:</span></p>

<pre id="t-TqyFJtjhuILgAFcaH49Sx1"><code>iex (irm https://hermes-agent.nousresearch.com/install.ps1)</code></pre>

<p id="t-yDVSXTPuSz3jd59qiCDrlW"><span style="border-bottom:1px solid">Windows 原生支持仍为实验性功能，推荐优先使用 WSL2。</span></p>

<p id="t-grwHesw0oZKgAEhb1wM5iK"><span style="border-bottom:1px solid;font-weight:bold">macOS / Windows 桌面版（Desktop App）:</span><span style="border-bottom:1px solid">前往</span><span style="border-bottom:1px solid">hermes-agent.nousresearch.com</span><span style="border-bottom:1px solid">下载对应平台的桌面安装包，CLI 与桌面应用会同时安装。</span></p>

<div id="t-hKDMdRE6Hg0izUWjvkGKrs"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/8f17a21262af3a1e17871619.png"/></div>

<p id="t-faRDi6amY80RtUpCmZMsH2"><span>下载后双击安装即可：</span></p>

<div id="t-u21Qe98DszE6H0O9Tw4CL1"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/9b33c4f2ca4871625a6e2c96.png"/></div>

<p id="t-uFGO7luUhc99kdlq5EcRE2"><span style="border-bottom:1px solid">验证安装:</span></p>

<pre id="t-p0ABGumpLt1BBqI9oUqLUK"><code>hermes --version</code></pre>

<p id="t-srBWBnPFtNU32EMOQypU4v"><span style="border-bottom:1px solid">输出版本号即表示安装成功。</span></p>

<p id="t-v6pWvnBffGzdf7nxySRWXm"><span style="border-bottom:1px solid">安装程序会自动处理所有依赖项：</span></p>

<ul><li id="t-PEeaJVfD6vAcprpYY4J548"><span style="border-bottom:1px solid;font-weight:bold">uv</span><span>— 快速 Python 包管理器</span></li></ul>

<ul><li id="t-O7D78KCufH5dQTbh9n8tEH"><span style="border-bottom:1px solid;font-weight:bold">Python 3.11</span><span>— 通过 uv 安装，无需 sudo</span></li></ul>

<ul><li id="t-A24QuM8Gm9xWWXrCAk7qPb"><span style="border-bottom:1px solid;font-weight:bold">Node.js v22</span><span>— 用于浏览器自动化和 WhatsApp 桥接</span></li></ul>

<ul><li id="t-dikXROFQbZsaCoh8oM102T"><span style="border-bottom:1px solid;font-weight:bold">ripgrep</span><span>— 快速文件搜索</span></li></ul>

<ul><li id="t-1LvxGqk8bUb2thx8IGh9LK"><span style="border-bottom:1px solid;font-weight:bold">ffmpeg</span><span>— TTS 音频格式转换</span></li></ul>

<div id="t-jHObJXsnF99OTMWmJNU8Dk"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/ce200bbcbd67e7e2c1b6d112.png"/></div>

<p id="t-rqwKitpRczkJsGMvskAQBS"><span style="border-bottom:1px solid;font-weight:bold">Windows 系统说明</span><span style="border-bottom:1px solid">：不支持原生 Windows 环境，请先安装 WSL2，再在 WSL2 终端中执行上述命令。</span></p>

<p id="t-fd1AiXcU0einHBmFVA1TsA"><span style="border-bottom:1px solid">如果安装过 OpenClaw 还可以直接导入配置：</span></p>

<div id="t-7MhyzOOMz98ZFJjtbbHO8Q"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/41e886a6bc50312746099431.png"/></div>

<p id="t-cB0vCYeGCBBNTrvhPAOExt"><span style="border-bottom:1px solid">这里选择不导入，输入</span><span style="border-bottom:1px solid;font-weight:bold">n</span><span style="border-bottom:1px solid">，进入模型设置，选择第一个快速设置：</span></p>

<div id="t-oDxBmAA2yWXTpHO8aLOKsh"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/c959e221c5de203a6f8bbe11.png"/></div>

<p id="t-76O6wARA2soXh0jIjSaJaj"><span style="border-bottom:1px solid">接下来我们选择倒数第二项的 More providers：</span></p>

<div id="t-gZMN7uS0C7l7p54izRfY1x"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/5514b252aecb6429684b7426.png"/></div>

<p id="t-eGT3uy5BG5GQqAwWCfPmoG"><span style="border-bottom:1px solid">这里可以选择更多国内或国际的大模型：</span></p>

<div id="t-4SFi0hXCdWPcTPyShBGmEd"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/eccd3234268262e42338a927.png"/></div>

<p id="t-rGBjetafznTdCSI72vTdtm"><span style="border-bottom:1px solid">接下来我们使用</span><span style="border-bottom:1px solid">字节方舟 Coding Plan</span><span style="border-bottom:1px solid">，所以选择的是</span><span style="border-bottom:1px solid;font-weight:bold">Customer endpoint</span><span style="border-bottom:1px solid">，就是自定义 API 地址与 API key。</span></p>

<p id="t-CdoxCE1jQDfCCC5MpJP819"><span style="border-bottom:1px solid">Base URL 设置字节方舟兼容 OpenAI 接口协议工具：</span><span style="border-bottom:1px solid;font-weight:bold">https://ark.cn-beijing.volces.com/api/coding/v3</span></p>

<p id="t-MjgcRdMbi58MMJUM5RbgVb"><span style="border-bottom:1px solid">设置 API key 与支持的大模型，比如</span><span style="border-bottom:1px solid;font-weight:bold">ark-code-latest</span><span style="border-bottom:1px solid">。</span></p>

<p id="t-sL2fdaaeJhBfw9v7vbLOBZ"><span style="border-bottom:1px solid">安装完成后执行以下命令：</span></p>

<pre id="t-YrNM8EB1YkNbn1TDvYeeOZ"><code>source ~/.bashrc    # 重载shell配置（若使用zsh，执行：source ~/.zshrc）
hermes              # 开启智能体对话！</code></pre>

<div id="t-jCosBSTKoPfCn4suYDqWWn"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/8242946c3864a2d782452854.png"/></div>


<a id="section-2103"></a>
## 快速上手

<a id="t-h0WuZbN9fusaxhtREcw8XZ"></a>

<pre id="t-Hd7OZk2piiL7MTEHdm0RRC"><code>hermes              # 交互式命令行界面 — 开启对话
hermes model        # 选择大语言模型服务商与对应模型
hermes tools        # 配置启用的工具集
hermes config set   # 设置单项配置项
hermes gateway      # 启动消息网关（支持Telegram、Discord等平台）
hermes setup        # 运行全量配置向导（一站式完成所有配置）
hermes claw migrate # 从OpenClaw迁移数据（适用于原OpenClaw用户）
hermes update       # 更新至最新版本
hermes doctor       # 诊断运行环境与配置问题</code></pre>


<a id="section-2104"></a>
## 手动安装

<a id="t-OZMqud97igYoDAgW4zYLSv"></a>

<p id="t-eu4y9OU3EtTQqOaSWAJ40n"><span style="border-bottom:1px solid">如果您更喜欢完全控制安装过程，请按照以下步骤操作。</span></p>


<a id="section-2105"></a>
## 步骤 1：克隆仓库

<a id="t-LrxbXG9WGZqfkVOLzbYyUg"></a>

<p id="t-IYqVHLFZNS6IhlQAnjext5"><span style="border-bottom:1px solid">使用</span><span style="border-bottom:1px solid">--recurse-submodules</span><span style="border-bottom:1px solid">克隆以获取所需的子模块：</span></p>

<pre id="t-D1kAkdxoghC3nE6X264G9X"><code>git clone --recurse-submodules https://github.com/NousResearch/hermes-agent.git
cd hermes-agent</code></pre>

<p id="t-fXnlSeJJEJDwrfRaUH5JII"><span style="border-bottom:1px solid">如果已经克隆但没有子模块：</span></p>

<pre id="t-WyPUyNXlhYCuR5AdgkHDhv"><code>git submodule update --init --recursive</code></pre>


<a id="section-2106"></a>
## 步骤 2：安装 uv 并创建虚拟环境

<a id="t-1D9wgNDGtt4YpvpbPVhWWR"></a>

<pre id="t-7fcO1GzBnXIEmbTzbC0PAs"><code># 安装 uv（如果尚未安装）
curl -LsSf https://astral.sh/uv/install.sh | sh

# 创建 Python 3.11 的虚拟环境（uv 会在需要时下载，无需 sudo）
uv venv venv --python 3.11</code></pre>

<p id="t-EYa0q8GzxBBLB68AYbIHiS"><span style="border-bottom:1px solid;font-weight:bold">提示：</span><span style="border-bottom:1px solid">您</span><span style="border-bottom:1px solid;font-weight:bold">不需要</span><span style="border-bottom:1px solid">激活虚拟环境来使用</span><span style="border-bottom:1px solid">hermes</span><span style="border-bottom:1px solid">。入口点有一个硬编码的 shebang 指向虚拟环境中的 Python，因此全局链接后即可使用。</span></p>


<a id="section-2107"></a>
## 步骤 3：安装 Python 依赖

<a id="t-SKD45M4O77KOTBUiPFtTOV"></a>

<pre id="t-GFZxZhl537irX6DL5TTFGG"><code># 告诉 uv 要安装到哪个虚拟环境
export VIRTUAL_ENV="$(pwd)/venv"

# 安装所有扩展
uv pip install -e ".[all]"</code></pre>

<p id="t-7y1IkkSzFsJpvunhZF2C6D"><span style="border-bottom:1px solid">如果您只想要核心智能体（不包含 Telegram/Discord/cron 支持）：</span></p>

<pre id="t-98rdepW30ECr3QmTFwH9ao"><code>uv pip install -e "."</code></pre>

<p id="t-ScPWKfGbTOhmvoIC9kQXlU"><span style="border-bottom:1px solid;font-weight:bold">可选扩展说明：</span></p>

<div id="t-GpcKVZUNl1pOAokLXSckNz"><table><colgroup><col width="104.89755249023438"/><col width="231.89752197265625"/><col width="292.005126953125"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>扩展</span></p></td><td style=" vertical-align: top"><p><span>功能</span></p></td><td style=" vertical-align: top"><p><span>安装命令</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">all</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">包含以下所有功能</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">uv pip install -e ".[all]"</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">messaging</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Telegram 和 Discord 网关</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">uv pip install -e ".[messaging]"</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">cron</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">定时任务的 Cron 表达式解析</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">uv pip install -e ".[cron]"</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">voice</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">CLI 麦克风输入和音频播放</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">uv pip install -e ".[voice]"</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">mcp</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">模型上下文协议支持</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">uv pip install -e ".[mcp]"</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">honcho</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">AI 原生记忆（Honcho 集成）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">uv pip install -e ".[honcho]"</span></p></td></tr></tbody></table></div>

<p id="t-nfaafsawBaAXTMZKXuZhyE"><span style="border-bottom:1px solid">我们可以组合使用：</span><span style="border-bottom:1px solid;font-weight:bold">uv pip install -e ".[messaging,cron]"</span></p>


<a id="section-2108"></a>
## 步骤 4：创建配置目录

<a id="t-8X9ZFHvVhsfiFv86Qbp2x9"></a>

<pre id="t-0JoXvK7vojPp8ThBGLqGG0"><code># 创建目录结构
mkdir -p ~/.hermes/{cron,sessions,logs,memories,skills,pairing,hooks,image_cache,audio_cache,whatsapp/session}

# 复制示例配置文件
cp cli-config.yaml.example ~/.hermes/config.yaml

# 创建空的 .env 文件用于存储 API 密钥
touch ~/.hermes/.env</code></pre>


<a id="section-2109"></a>
## 步骤 5：添加 API 密钥

<a id="t-AXOM3h7rFd0CkJYkrKhk5L"></a>

<p id="t-jw4wp6BDrS1pKRYrTl1VGd"><span style="border-bottom:1px solid">打开</span><span style="border-bottom:1px solid">~/.hermes/.env</span><span style="border-bottom:1px solid">并添加至少一个 LLM 提供商密钥：</span></p>

<pre id="t-3PGTPhnd2bMUN3kBmEQWLT"><code># 必需 — 至少一个 LLM 提供商：
OPENROUTER_API_KEY=sk-or-v1-your-key-here

# 可选 — 启用其他工具：
FIRECRAWL_API_KEY=fc-your-key          # 网页搜索和抓取
FAL_KEY=your-fal-key                   # 图像生成（FLUX）</code></pre>

<p id="t-FRJQofDm5QtRPxuCSLdzqY"><span style="border-bottom:1px solid">或者通过 CLI 设置：</span></p>

<pre id="t-XeVhPPawA3r5RcxAIMIxn8"><code>hermes config set OPENROUTER_API_KEY sk-or-v1-your-key-here</code></pre>


<a id="section-2110"></a>
## 步骤 6：将 hermes 添加到 PATH

<a id="t-6NUngycf0VxiWr6BsUbilO"></a>

<pre id="t-9Ox79fREaBhEBrxxVtSkCq"><code>mkdir -p ~/.local/bin
ln -sf "$(pwd)/venv/bin/hermes" ~/.local/bin/hermes</code></pre>

<p id="t-WhdF92kXJo1NC3iThiUXBp"><span style="border-bottom:1px solid">如果</span><span style="border-bottom:1px solid">~/.local/bin</span><span style="border-bottom:1px solid">不在 PATH 中，请添加到 shell 配置：</span></p>

<pre id="t-eMFv1BJCGTY6eetbpk35A4"><code># Bash
echo 'export PATH="$HOME/.local/bin:$PATH"' &gt;&gt; ~/.bashrc &amp;&amp; source ~/.bashrc

# Zsh
echo 'export PATH="$HOME/.local/bin:$PATH"' &gt;&gt; ~/.zshrc &amp;&amp; source ~/.zshrc</code></pre>


<a id="section-2111"></a>
## 步骤 7：配置您的提供商

<a id="t-ASBh5wXuzyvA8HQurVhhR7"></a>

<pre id="t-opBiMjf1c6EnZJ0BAwXM6B"><code>hermes model       # 选择您的 LLM 提供商和模型</code></pre>


<a id="section-2112"></a>
## 步骤 8：验证安装

<a id="t-jsEsAZ0W7y3mLSkJTPkPbG"></a>

<pre id="t-08zYpQ32Zg17lsFMxKQPmQ"><code>hermes version    # 检查命令是否可用
hermes doctor     # 运行诊断以验证一切正常
hermes status     # 检查您的配置
hermes chat -q "Hello! What tools do you have available?"</code></pre>


<a id="section-2113"></a>
## 故障排除

<a id="t-mEY4NfvdsKuTuDadpo9IMe"></a>

<div id="t-IWPZeCeOYrdzJK09ijaP0J"><table><colgroup><col width="172.89755249023438"/><col width="465.00689697265625"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>问题</span></p></td><td style=" vertical-align: top"><p><span>解决方案</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">hermes: command not found</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">重新加载 shell（</span><span style="border-bottom:1px solid">source ~/.bashrc</span><span style="border-bottom:1px solid">）或检查 PATH</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">API 密钥未设置</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">运行</span><span style="border-bottom:1px solid">hermes model</span><span style="border-bottom:1px solid">配置提供商，或</span><span style="border-bottom:1px solid">hermes config set OPENROUTER_API_KEY your_key</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">更新后配置丢失</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">运行</span><span style="border-bottom:1px solid">hermes config check</span><span style="border-bottom:1px solid">然后</span><span style="border-bottom:1px solid">hermes config migrate</span></p></td></tr></tbody></table></div>

<p id="t-OFlqU4ZDZxFtYYGwAmdluE"><span style="border-bottom:1px solid">如需更多诊断信息，运行</span><span style="border-bottom:1px solid">hermes doctor</span><span style="border-bottom:1px solid">— 它会告诉您缺少什么以及如何修复。</span></p>

<blockquote id="t-ybVr7Ph7xAB6jmk9RutJkK"><p id="t-tVjaTZRzGbd79cU0xBXIGS"><span style="border-bottom:1px solid;font-style:italic;font-weight:bold">提示：</span><span style="border-bottom:1px solid;font-style:italic">您可以随时通过</span><span style="border-bottom:1px solid;font-style:italic">hermes model</span><span style="border-bottom:1px solid;font-style:italic">切换提供商——无需更改代码，没有锁定。</span></p></blockquote>

<p id="t-uYKSR4PqfQXGEy7hauxoIi"><span style="border-bottom:1px solid;font-weight:bold">更多内容</span></p>

<p id="t-TqFp5Te3xj21l86p9N801W"><span style="border-bottom:1px solid">Hermes Agent 配置</span><span style="border-bottom:1px solid">Hermes Agent CLI</span><span style="border-bottom:1px solid">Hermes Agent 工具</span><span style="border-bottom:1px solid">Hermes Agent Skills</span><span style="border-bottom:1px solid">Hermes Agent MCP 集成</span></p>


<a id="section-2114"></a>
## 消息网关

<a id="t-xPGDaJcDqyXNj120peT780"></a>

<p id="t-qoWXLsw2ekpaVhYM7H4bIv"><span style="border-bottom:1px solid">Hermes Agent 消息网关允许您通过多个平台与智能体交互——Telegram、Discord、Slack、WhatsApp、Signal、Email、Home Assistant 等。</span></p>

<p id="t-vakRpvXokHUHnDNXODBwQw"><span style="border-bottom:1px solid">从一个网关向 15+ 个平台发送消息。无论您身在何处，都可以与 Hermes 保持联系。</span></p>


<a id="section-2115"></a>
## 支持的平台

<a id="t-DLJhN267BgKIR5WHNH2aVd"></a>

<div id="t-ddBoG8tTVGv1ryS4devi83"><table><colgroup><col width="205.8975524902344"/><col width="262.89752197265625"/><col width="179.11279296875"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>平台</span></p></td><td style=" vertical-align: top"><p><span>说明</span></p></td><td style=" vertical-align: top"><p><span>状态</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Telegram</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">最完整的消息平台集成</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">✅ 支持</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Discord</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">支持服务器和语音频道</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">✅ 支持</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Slack</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">工作区集成</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">✅ 支持</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">WhatsApp</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">通过 WhatsApp Web</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">✅ 支持</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Signal</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">隐私消息应用</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">✅ 支持</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Matrix</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">去中心化通信</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">✅ 支持</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Mattermost</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">自托管消息</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">✅ 支持</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Email</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">SMTP 邮件</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">✅ 支持</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">SMS</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">短信发送</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">✅ 支持</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">DingTalk</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">钉钉</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">✅ 支持</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Feishu</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">飞书</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">✅ 支持</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">WeCom</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">企业微信</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">✅ 支持</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">BlueBubbles</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">macOS iMessage</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">✅ 支持</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Home Assistant</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">智能家居</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">✅ 支持</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Webhooks</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">自定义 HTTP 回调</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">✅ 支持</span></p></td></tr></tbody></table></div>


<a id="section-2116"></a>
## 设置消息平台

<a id="t-AIjo3SX3fHGb1p4RCxG1sL"></a>

<a id="t-wHN8D8aUN4axfaxQaMTjek"></a>

##### 交互式设置

<pre id="t-m4SObjcJnc2142jH7TzIQX"><code>hermes gateway setup</code></pre>

<p id="t-q8FDekHYbtLSFmSIYijCcm"><span style="border-bottom:1px solid">这将启动交互式配置向导，引导您完成每个平台的设置。</span></p>

<a id="t-wDaDRoaOwocUggkv5G3V2P"></a>

##### 手动配置

<p id="t-jROegPXhB5yQkEKfeuMf9E"><span style="border-bottom:1px solid">或直接编辑</span><span style="border-bottom:1px solid">~/.hermes/config.yaml</span><span style="border-bottom:1px solid">：</span></p>

<p id="t-aMuUEa0Njlph1UQ3f0tZ3V"><span style="border-bottom:1px solid">Telegram:</span></p>

<pre id="t-1OLI2HwQ9CauQs2VrrDyQ9"><code># 在 ~/.hermes/.env 中
TELEGRAM_BOT_TOKEN=your-bot-token

# config.yaml
gateway:
  adapters:
    telegram:
      enabled: true</code></pre>

<p id="t-TkP47Xneg2fVnmgzp8FsS6"><span style="border-bottom:1px solid">Discord:</span></p>

<pre id="t-GRcR6ZGvKsSjWSEywIGZZZ"><code># 在 ~/.hermes/.env 中
DISCORD_BOT_TOKEN=your-discord-token

# config.yaml
gateway:
  adapters:
    discord:
      enabled: true
      allowed_channels:
        - "123456789"</code></pre>

<p id="t-UzIjYTWm15rU3Z6Fq2N4Tj"><span style="border-bottom:1px solid">Slack:</span></p>

<pre id="t-aWvCPIMaONbbqdTFoAhe07"><code># 在 ~/.hermes/.env 中
SLACK_BOT_TOKEN=xoxb-your-token
SLACK_SIGNING_SECRET=your-signing-secret

# config.yaml
gateway:
  adapters:
    slack:
      enabled: true</code></pre>

<p id="t-qLTcY28gHWURVRRdp3VzMx"><span style="border-bottom:1px solid">WhatsApp:</span></p>

<pre id="t-ojMxidybiBHK7NsMLN1g2T"><code># WhatsApp 需要浏览器自动化
# 首次设置需要扫描二维码

# config.yaml
gateway:
  adapters:
    whatsapp:
      enabled: true
      session_dir: ~/.hermes/whatsapp/session</code></pre>

<p id="t-ydvNrnevvjLpvrx0Tbj0H9"><span style="border-bottom:1px solid">Email (SMTP):</span></p>

<pre id="t-QYNwAXzPl2m4n2lp2ryknl"><code># 在 ~/.hermes/.env 中
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# config.yaml
gateway:
  adapters:
    email:
      enabled: true
      from_email: your-email@gmail.com</code></pre>

<p id="t-50MxXslDT43ouYjMaV8tCu"><span style="border-bottom:1px solid">Home Assistant:</span></p>

<pre id="t-jqUfuuGmdUhrk1bkWitUzs"><code># 在 ~/.hermes/.env 中
HA_URL=http://homeassistant.local:8123
HA_TOKEN=your-long-lived-access-token

# config.yaml
gateway:
  adapters:
    homeassistant:
      enabled: true</code></pre>


<a id="section-2117"></a>
## 启动网关

<a id="t-5Bi3yIdV28T4rTQ0FwFdz6"></a>

<a id="t-xI0eRQuTIftGvtZWgMMh03"></a>

##### 前台运行

<pre id="t-dGKDTUOwviXo39OZ2edpep"><code>hermes gateway</code></pre>

<a id="t-OqfzJH4cmTz7955IRqGTnz"></a>

##### 后台运行（推荐）

<pre id="t-AHmN3E8UFCKKxxqVx4ik0v"><code>hermes gateway &amp;
# 或使用 systemd
systemctl enable hermes-agent
systemctl start hermes-agent</code></pre>

<a id="t-GGdwVrEUQmcNjkqf15GAax"></a>

##### Docker 运行

<pre id="t-KEeVCzXUfGyHaNru6AG9SI"><code>docker run -d \
  --name hermes-gateway \
  -v ~/.hermes:/home/hermes/.hermes \
  ghcr.io/nousresearch/hermes-agent:latest \
  hermes gateway</code></pre>


<a id="section-2118"></a>
## 平台特定配置

<a id="t-g6FRXNdalMf9S1d4RmSOAW"></a>

<a id="t-KmX8lqhlW4VPiwajUvNJcw"></a>

##### Telegram

<ol start="1"><li id="t-WnT5hstgtKlZsXSuzBf7TC"><span>通过 @BotFather 创建新机器人</span></li></ol>

<ol start="2"><li id="t-sD96X5NY14W9TZzyZ7u18x"><span>获取 bot token</span></li></ol>

<ol start="3"><li id="t-lRlRSS9bmxyfmXa8vJzgac"><span>配置并运行 Hermes</span></li></ol>

<ol start="4"><li id="t-jcxINDsLlLLPNGLQE6fDMe"><span>在 Telegram 中向您的机器人发送</span><span style="border-bottom:1px solid">/start</span></li></ol>

<a id="t-9PmerAMUMHfP9ZXeBe2ttO"></a>

##### Discord

<ol start="1"><li id="t-ucL8RKXyBpb2qiSAKW5eip"><span>在 Discord 开发者门户创建应用</span></li></ol>

<ol start="2"><li id="t-2lxzx6SE6o0uGQzjtZBoII"><span>添加机器人到服务器</span></li></ol>

<ol start="3"><li id="t-irseyqXKAgjAZUsxvW8ZBo"><span>获取 bot token</span></li></ol>

<ol start="4"><li id="t-mdtUdyBEMFhZCtGemOzaQ0"><span>配置并运行 Hermes</span></li></ol>

<a id="t-mKtgYVmhIlLfAJ8tEVvcIa"></a>

##### Slack

<ol start="1"><li id="t-YNAvu2zek94sRRUW5gS6ZM"><span>在 Slack 应用门户创建新应用</span></li></ol>

<ol start="2"><li id="t-udNnlOl8uxApPMqTKY6XWF"><span>添加 bot token 作用域</span></li></ol>

<ol start="3"><li id="t-jW2Ewppjyt2DdO1eb8RVA4"><span>安装到工作区</span></li></ol>

<ol start="4"><li id="t-7wV24i2gjwuk2qiOybMRCb"><span>配置并运行 Hermes</span></li></ol>

<a id="t-kAOfikB9IiU44oGOHhtgZS"></a>

##### 发送消息

<p id="t-1C2bupbTGWlBzyMg9sl9xz"><span style="border-bottom:1px solid">使用</span><span style="border-bottom:1px solid">send_message</span><span style="border-bottom:1px solid">工具通过任何配置的通道发送消息：</span></p>

<pre id="t-zpW5FSVNlt473SgzIIKaX2"><code>send_message(
  platform="telegram",
  chat_id="123456789",
  message="Hello from Hermes!"
)</code></pre>

<p id="t-L4gqmlGYokiIaJz3BG0LxA"><span style="border-bottom:1px solid">或通过 cron 安排自动化消息：</span></p>

<pre id="t-VOi9hI59IREoUa5SfY4aS7"><code># 设置每日简报
hermes
❯ 每天早上9点检查 Hacker News 上的 AI 新闻，并通过 Telegram 给我发送摘要</code></pre>


<a id="section-2119"></a>
## 语音支持

<a id="t-8aa71UUFKNj616APlsCESu"></a>

<p id="t-3x4ulE5qMu3fylgzNpX2ik"><span style="border-bottom:1px solid">某些平台支持语音交互：</span></p>

<ul><li id="t-DgnYfDmCLMj5vFCJe6cOhH"><span style="border-bottom:1px solid;font-weight:bold">Telegram</span><span>：语音消息和语音通话</span></li></ul>

<ul><li id="t-KwXHvbkjFWmFDMvbHgXgLf"><span style="border-bottom:1px solid;font-weight:bold">Discord</span><span>：语音频道和语音消息</span></li></ul>

<ul><li id="t-FtCpSe9qwvX6DKOdbuyy5t"><span style="border-bottom:1px solid;font-weight:bold">CLI</span><span>：麦克风输入和 TTS</span></li></ul>

<p id="t-JUVjay36Saemr9pzyFbjkA"><span style="border-bottom:1px solid">有关语音模式的详细信息，请参阅语音模式指南。</span></p>


<a id="section-2120"></a>
## 安全考虑

<a id="t-jWRyly6YVYJsyRmgUJEPsa"></a>

<p id="t-aV0UB8k1mIy2rF4QjqUPta"><span style="border-bottom:1px solid;font-weight:bold">重要：</span></p>

<ul><li id="t-ZwxcG82vNV7qKIcVvwqebq"><span>不要将 API 密钥提交到源代码控制</span></li></ul>

<ul><li id="t-rlvZEwoeGfmJtzqkxCgbWx"><span>使用环境变量或安全的凭据存储</span></li></ul>

<ul><li id="t-7fOdEWCbsigYD6SRnGyy4R"><span>限制允许与智能体交互的用户/频道</span></li></ul>

<ul><li id="t-LgxdyBW47kh1OGVJFEBkna"><span>定期轮换 API 密钥</span></li></ul>

<ul><li id="t-vD4ndeNWRpTYhk1PDaS2B5"><span>在公共平台上启用命令审批</span></li></ul>


<a id="section-2121"></a>
## 故障排除

<a id="t-P7WAXHUjEZ6twPmWIGwNOc"></a>

<div id="t-y6jIbG0zFMsOLU0k3hi8Yh"><table><colgroup><col width="153.89755249023438"/><col width="263.89752197265625"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>问题</span></p></td><td style=" vertical-align: top"><p><span>解决方案</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">机器人无响应</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">检查网关是否正在运行</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">权限错误</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">验证 bot token 和权限</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">消息未发送</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">检查通道 ID 和配置</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">连接超时</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">检查网络和防火墙设置</span></p></td></tr></tbody></table></div>

<blockquote id="t-FFjg8vDJxLQaibdJV0CEmW"><p id="t-ozJTFDSg8zAH5L7vImXh3G"><span style="border-bottom:1px solid;font-style:italic;font-weight:bold">提示：</span><span style="border-bottom:1px solid;font-style:italic">使用</span><span style="border-bottom:1px solid;font-style:italic">hermes gateway --verbose</span><span style="border-bottom:1px solid;font-style:italic">查看详细日志以调试问题。</span></p></blockquote>

