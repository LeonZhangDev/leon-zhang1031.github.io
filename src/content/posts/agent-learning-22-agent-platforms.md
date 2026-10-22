---
title: "第 22 章 · Agent 平台与开发工具"
date: "2026-10-22"
draft: false
author: "学习资料整理"
description: "Dify、n8n、CrewAI、Deep Agents 与桌面智能体"
tags: ["Agent", "学习路线"]
categories: ["AI 工程"]
prerequisites: ["agent-learning-21-open-source-architectures"]
verification: {"status": "not-run", "scope": "本次仅整理资料；示例代码与原文技术结论未复跑。"}
---

Dify、n8n、CrewAI、Deep Agents 与桌面智能体

[学习路线](/posts/agent-learning-route/) · [上一章](/posts/agent-learning-21-open-source-architectures/) · [下一章](/posts/agent-learning-23-learning-cases/)

本章按知识小节编排。项目内容作为学习案例阅读，示例代码与原文技术结论未在本次整理中执行验证。

## 本章目录

- [第一个 AI Agent](#section-1775)
- [生成应用代码](#section-1776)
- [桌面级 Agent](#section-1777)
- [下载与安装](#section-1778)
- [AI 开发平台](#section-1779)
- [注册与登录](#section-1780)
- [切换不同模型](#section-1781)
- [搭子（DuMate）入门教程](#section-1783)
- [为什么需要 DuMate](#section-1784)
- [安装步骤](#section-1787)
- [QoderWork 教程](#section-1824)
- [与 ChatGPT / Claude 的区别](#section-1826)
- [与 OpenClaw / Claude Code 的关系](#section-1827)
- [QoderWake 入门教程](#section-1828)
- [可用角色一览](#section-1829)
- [安装环境说明](#section-1830)
- [本地部署要求](#section-1831)
- [云端部署要求](#section-1832)
- [前置工具](#section-1833)
- [步骤 1：安装 QoderWake](#section-1834)
- [macOS 安装](#section-1835)
- [Linux 安装](#section-1836)
- [步骤 2：打开控制台](#section-1837)
- [界面布局说明](#section-1838)
- [步骤 3：创建数字员工](#section-1839)
- [创建流程](#section-1840)
- [步骤 4：跟员工开始干活](#section-1841)
- [对话任务](#section-1842)
- [自动任务](#section-1843)
- [步骤 5：管理你的数字员工](#section-1844)
- [记忆管理](#section-1846)
- [技能（Skill）](#section-1847)
- [连接器（Connector）](#section-1848)
- [项目](#section-1849)
- [权限管理](#section-1850)
- [场景示例：自动修复 Bug](#section-1851)
- [方法 A：手动发起对话](#section-1852)
- [实例](#section-1853)
- [方法 B：设自动任务处理](#section-1854)
- [安装后无法打开 Web Console？](#section-1856)
- [员工执行任务时卡住不动？](#section-1857)
- [自定义角色效果不好？](#section-1858)
- [如何反馈问题？](#section-1859)
- [CrewAI 制作智能体](#section-1903)
- [环境搭建与安装](#section-1904)
- [前置条件](#section-1905)
- [安装 crewAI](#section-1906)
- [实例](#section-1907)
- [LLM（模型层）关键属性](#section-1908)
- [Agent（智能体）关键属性](#section-1909)
- [researcher（研究员）](#section-1910)
- [writer（写作）](#section-1911)
- [Task（任务）关键属性](#section-1912)
- [Crew（执行器）关键属性](#section-1913)
- [kickoff() 与输出结构](#section-1914)
- [crewai 命令](#section-1915)
- [运行你的 Crew](#section-1916)
- [配置 API 密钥](#section-1917)
- [核心组件详解与实战](#section-1918)
- [第一步：定义智能体 (Agent)](#section-1919)
- [实例](#section-1920)
- [第二步：创建任务 (Task)](#section-1921)
- [实例](#section-1922)
- [第三步：组建团队与设置流程 (Crew &amp; Process)](#section-1923)
- [实例](#section-1924)
- [第四步：执行任务并获取结果](#section-1925)
- [实例](#section-1926)
- [进阶技巧：为 Agent 配备工具 (Tools)](#section-1927)
- [实例](#section-1928)
- [Deep Agents 入门教程](#section-2015)
- [什么是 Deep Agents](#section-2016)
- [Deep Agents 的设计目标](#section-2017)
- [与 LangChain、LangGraph 的关系](#section-2018)
- [核心能力一览](#section-2019)
- [安装](#section-2020)
- [使用 uv 安装（推荐）](#section-2021)
- [使用 pip 安装](#section-2022)
- [搭配 DeepSeek API 安装](#section-2023)
- [配置说明](#section-2024)
- [文件系统后端对比](#section-2025)
- [快速开始](#section-2026)
- [配置 DeepSeek API Key](#section-2027)
- [最简示例：Hello World Agent](#section-2028)
- [实例](#section-2029)
- [详细用法](#section-2030)
- [使用 DeepSeek R1 进行推理任务](#section-2031)
- [实例](#section-2032)
- [自定义系统提示词](#section-2033)
- [实例](#section-2034)
- [流式输出](#section-2035)
- [实例](#section-2036)
- [多轮对话（带检查点）](#section-2037)
- [实例](#section-2038)
- [综合 Demo：研究报告 Agent](#section-2039)
- [场景说明](#section-2040)
- [实例](#section-2041)
- [Human-in-the-loop 示例](#section-2042)
- [实例](#section-2043)
- [常见问题](#section-2044)
- [如何判断选用 Deep Agents 还是直接用 LangChain/LangGraph？](#section-2045)
- [DeepSeek 模型的选择建议](#section-2046)
- [Agent 调用工具后没有返回结果怎么办？](#section-2047)
- [如何让 Agent 一次只能访问特定文件？](#section-2048)
- [实例](#section-2049)
- [Agent 默认系统提示词和我的提示词如何合并？](#section-2050)
- [初学者容易犯的错误](#section-2051)
- [更多资料](#section-2052)
- [Dify 入门教程](#section-2191)
- [和其他工具的对比](#section-2192)
- [谁在用 Dify？](#section-2193)
- [核心概念](#section-2194)
- [安装与启动](#section-2195)
- [方式一：Dify Cloud（最快，0 秒上手）](#section-2196)
- [方式二：Docker Compose 自托管（推荐生产使用）](#section-2197)
- [方式三：AWS Marketplace 一键部署](#section-2198)
- [方式四：Kubernetes 部署（高可用）](#section-2199)
- [配置模型提供商](#section-2200)
- [操作路径](#section-2201)
- [主流提供商配置](#section-2202)
- [配置 Embedding 模型（知识库必需）](#section-2203)
- [验证模型可用](#section-2204)
- [五种应用类型详解](#section-2205)
- [Chatbot（聊天助手）](#section-2206)
- [Text Generator（文本生成器）](#section-2207)
- [Agent（智能体）](#section-2208)
- [Chatflow（对话流）](#section-2209)
- [Workflow（工作流）](#section-2210)
- [选择指南](#section-2211)
- [知识库（RAG）：让 AI 回答你的私有数据](#section-2212)
- [创建知识库](#section-2213)
- [文档分块策略](#section-2214)
- [索引模式](#section-2215)
- [检索配置](#section-2216)
- [测试检索效果](#section-2217)
- [将知识库关联到应用](#section-2218)
- [Workflow 工作流：可视化编排多步骤任务](#section-2219)
- [进入 Workflow 编辑器](#section-2220)
- [主要节点类型](#section-2221)
- [节点间的变量传递](#section-2222)
- [Human Input 节点（HITL）](#section-2223)
- [调试工作流](#section-2224)
- [场景实战一：企业内部知识问答机器人](#section-2225)
- [业务背景](#section-2226)
- [步骤一：准备知识库](#section-2227)
- [步骤二：创建 Chatbot 应用](#section-2228)
- [步骤三：测试与调优](#section-2229)
- [步骤四：发布与集成](#section-2230)
- [场景实战二：自动化内容生成流水线](#section-2231)
- [业务背景](#section-2232)
- [工作流设计](#section-2233)
- [具体搭建步骤](#section-2234)
- [实例](#section-2235)
- [场景实战三：客服支持 Agent（含 Human-in-the-Loop）](#section-2236)
- [业务背景](#section-2237)
- [工作流设计](#section-2238)
- [关键节点配置](#section-2239)
- [实例](#section-2240)
- [效果预期](#section-2241)
- [对外发布：API、网页嵌入与 MCP 服务器](#section-2242)
- [发布为 API](#section-2243)
- [网页嵌入](#section-2244)
- [实例](#section-2245)
- [实例](#section-2246)
- [发布为 MCP 服务器](#section-2247)
- [可观测性：监控与持续优化](#section-2248)
- [查看应用日志](#section-2249)
- [给对话打标注](#section-2250)
- [应用数据统计](#section-2251)
- [集成外部观测平台](#section-2252)
- [持续优化循环](#section-2253)
- [费用与套餐](#section-2254)
- [Dify Cloud 套餐](#section-2255)
- [自托管成本](#section-2256)
- [降低成本的技巧](#section-2257)
- [常见问题与排查](#section-2258)
- [启动问题](#section-2259)
- [实例](#section-2260)
- [实例](#section-2261)
- [知识库检索问题](#section-2262)
- [API 调用问题](#section-2263)
- [工作流问题](#section-2264)
- [资源](#section-2265)
- [推荐学习路径](#section-2266)
- [官方资源](#section-2267)
- [n8n 入门教程](#section-2268)
- [Dify 与 n8n 的区别](#section-2269)
- [适合谁用](#section-2270)
- [核心概念](#section-2271)
- [工作流（Workflow）](#section-2272)
- [节点（Node）](#section-2273)
- [执行（Execution）](#section-2274)
- [连接（Connection）](#section-2275)
- [凭证（Credential）](#section-2276)
- [表达式（Expression）](#section-2277)
- [安装与启动](#section-2278)
- [方式一：本地快速体验（最快，5 分钟）](#section-2279)

<a id="section-1775"></a>
## 第一个 AI Agent

<a id="t-block-23068"></a>

<p id="t-x3VOq7zb8iyvUfN8cdLlag"><span style="border-bottom:1px solid">A</span><span>I Agent 平台种类繁多，但核心目的相同：让模型从回答问题升级为自动执行任务，有的主打零代码拖拽，有的强调工程化定制，也有专门做流程集成或多代理协作。</span></p>

<p id="t-Z4N11BdL6asCz1wFtAjCwB"><span>不同层级的使用场景拆成三个面向：搭建速度、系统衔接、可控深度。</span></p>

<div id="t-nfBUoUrYhPEekUCKqKXK0a"><table><colgroup><col width="192.9010009765625"/><col width="129.005126953125"/><col width="346.00164794921875"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>核心需求</span></p></td><td style=" vertical-align: top"><p><span>推荐工具</span></p></td><td style=" vertical-align: top"><p><span>关键优势</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">秒哒，一句话生成应用</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">秒哒官网</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">0 代码，通过一句话生成需求，并生成应用</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">搭子，桌面级 AI 智能体</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">搭子官网</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">面向个人及团队的桌面级 AI 智能体，可以看见屏幕、操作软件、处理文件</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">MonkeyCode，AI 应用开发平台</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">MonkeyCode 官网</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">直接在平台里创建任务，让 AI 编码，在云端开发环境中使用终端、文件管理和预览</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">QoderWork</span><span style="border-bottom:1px solid">，桌面级 AI Agent</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">QoderWork</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">你说需求，它交付结果。</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">小云雀，剪映的 AI 视频生成</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">剪映-小云雀</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">字节自研 Seedance 2.0 视频模型 + Seedream 5.0 图像模型，搭配豆包大模型做文案理解</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">自动化触发与系统对接</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">n8n</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">集成面广，可自托管，常规内部系统都能打通</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">开发者可控的深度定制</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Dify</span><span style="border-bottom:1px solid">/</span><span style="border-bottom:1px solid">LangChain</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">前者提供完整开源方案；后者适合构建复杂推理链路</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">多角色协作与任务分解</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">AutoGen</span><span style="border-bottom:1px solid">/</span><span style="border-bottom:1px solid">CrewAI</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">前者强调动态协作；后者以清晰角色体系驱动流程</span></p></td></tr></tbody></table></div>


<a id="section-1776"></a>
## 生成应用代码

<a id="t-fiwU5V5F0TfwDjxL6Yqkjc"></a>

<blockquote id="t-q6fT3XUbHVkBWCBOyVE9qX"><p id="t-MyMrbSLoHKGyNmACHEk3Xm"><span style="border-bottom:1px solid;font-weight:bold">我们可以先用最简单的秒哒来生成应用， 先访问官网注册</span><span style="border-bottom:1px solid;font-weight:bold">秒哒官网</span><span style="border-bottom:1px solid;font-weight:bold">，登录后在输入框输入要生成的应用。</span></p></blockquote>

<div id="t-XukDw1JMSSCS4WTIOF7KAT"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/183ec339e45f6901365ddba1.png"/></div>

<p id="t-vY8MXnqOLqyJE1GjtFAfEO"><span style="border-bottom:1px solid">接下来秒哒就开始生成一份需求文档，还是很详细的，然后我们可以在右侧点编辑文档或生成应用按钮，它就会根据我们的需求直接开始生成应用：</span></p>

<div id="t-yaCE45mih5cFJyZwOdpHui"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/3e1df74964c008c6aefafe78.png"/></div>

<p id="t-eaaCN7dgWl2FymUT3e9pCl"><span style="border-bottom:1px solid">接下来就会开始生成代码，整个过程，都不用写一行代码，直接生成：</span></p>

<div id="t-tAtwaQEtS31pxiFvB7clfD"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/f06146091e617fab9addbee0.png"/></div>

<p id="t-PhoNeVZvAa6C81Ce7NQNSo"><span style="border-bottom:1px solid">看下界面及使用效果，非常好用：</span></p>

<div id="t-pEWY2tjzShJ521yqCLzwi5"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/dec602c414b4d933d0698726.png"/></div>

<p id="t-mvRagdbkS4zwOb4XqM0ukz"><span>另外插件部分还提供了其他高级功能支持，比如视频：</span></p>

<div id="t-HwnXUEYqy94Rns9cEHQOMe"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/957085ae1306d760a54c8333.png"/></div>

<p id="t-FRdAkRT4j0iwHmQlLApRqZ"><span style="border-bottom:1px solid">如果你还不知道能看啥，还能去应用广场看看其他人做的优秀产品：</span></p>

<div id="t-c9E7U2OQxRxLbP6KfGaaRk"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/71b142c0417e40ac0a18cc8f.png"/></div>


<a id="section-1777"></a>
## 桌面级 Agent

<a id="t-HcfVNOAp5kq4tFcKiJAQdR"></a>

<p id="t-A6wkquVyJFA1qHTvbyVweo"><span style="border-bottom:1px solid">DuMate 是百度推出的桌面级 AI 办公智能体,它可以操作文件、读写 Excel、整理数据、生成 PPT、操作浏览器。</span></p>

<p id="t-z47tDhxLPsixM0RX9lJDTw"><span style="border-bottom:1px solid">我们只需用自然语言描述任务，DuMate 就能端到端完成交付。</span></p>


<a id="section-1778"></a>
## 下载与安装

<a id="t-SjzMJMUsYpms66nhZujhlg"></a>

<p id="t-XdpsUyd8ILhABtp25BAXnM"><span style="border-bottom:1px solid">DuMate 支持以下操作系统：</span></p>

<div id="t-gl3yJQu3ZWPw43pCZgvvOa"><table><colgroup><col width="120"/><col width="232.89752197265625"/><col width="210.00689697265625"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>操作系统</span></p></td><td style=" vertical-align: top"><p><span>芯片架构</span></p></td><td style=" vertical-align: top"><p><span>说明</span></p></td></tr><tr></tr><tr></tr></tbody></table></div>


<a id="section-1779"></a>
## AI 开发平台

<a id="t-block-23093"></a>

<p id="t-tYY7nsrmgj6s60TAHjRDf9"><span style="border-bottom:1px solid">现在 AI 平台很多，本文我们将使用 MonkeyCode 来体验在线 AI Coding。</span></p>

<p id="t-BQq93oXi4vl5pdHFLrVoCE"><span style="border-bottom:1px solid">我们可以直接在浏览器中免费使用 MonkeyCode，也不用安装，内置云端开发环境，并支持很多大模型。</span></p>


<a id="section-1780"></a>
## 注册与登录

<a id="t-KZR3FAj1XSgO6NfwjDCQvI"></a>

<p id="t-tdKPqQ6TvUo2oXiGqX5NY8"><span style="border-bottom:1px solid;font-weight:bold">首次使用 MonkeyCode，先完成账号注册。 点击</span><span style="border-bottom:1px solid;font-weight:bold">进入官网</span><span style="border-bottom:1px solid;font-weight:bold">，右上角注册或直接登录，成功后会自动进入主界面开始使用。</span></p>

<p id="t-jrY00ssiDlg3W2IdGn1ItA"><span style="border-bottom:1px solid">进入页面后，点击右上角</span><span style="border-bottom:1px solid;font-weight:bold">注册</span><span style="border-bottom:1px solid">创建新账号，已有账号可直接登录使用。</span></p>

<div id="t-s8oT6uRq7i4dPuWnUMAAso"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/3cfc4b8b7b05ee18b0a8e8ec.png"/></div>

<p id="t-nxFeLVW20BBTjuJqzv67gu"><span style="border-bottom:1px solid">注册成功后，我们进入控制台，输入我们的需求：</span></p>

<pre id="t-V7gDEBGcNlcLmz2RVjXmtz"><code>帮我写一个 JavaScript 小游戏：程序随机生成 1 到 100 的数字，让我猜，猜大了提示「太大了」，猜小了提示「太小了」，猜中了就结束。</code></pre>

<div id="t-gn9zhKuGJHAoPzDuTjhQDp"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/d9365ae65503f8bd078c8468.png"/></div>

<p id="t-ofqnzhsKT0HBui9rSTazYP"><span style="border-bottom:1px solid">开始执行，我们可以选择模型：</span></p>

<div id="t-11Dt9NlcVho3Q5LOeOLIDi"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/a0d9b5ec5cb44b27d2875759.png"/></div>

<p id="t-LYefonbDnATooPGclXaHx5"><span>开始任务：</span></p>

<div id="t-KelFzteOAkQJou41qv1cc7"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/6e2bf292b010c0d242d94d92.png"/></div>

<p id="t-mztxlkDHQUXEUZlhTY74mc"><span style="border-bottom:1px solid">任务完成后可以查看生成的效果地址：</span></p>

<div id="t-rwB0YxTZARnyMFM8qVgZMm"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/0a2c9a913349ba16c0c8a29e.png"/></div>

<p id="t-zUCuo0Qz7ahU3Cfr5eM5oJ"><span style="border-bottom:1px solid">查看效果：</span></p>

<div id="t-AxvnVPin7P6qpgSPU8XrV5"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/33be819fa31e84ac6460865b.png"/></div>


<a id="section-1781"></a>
## 切换不同模型

<a id="t-1Nxroa7elDzkAC17t50YuY"></a>

<p id="t-VkyDvykEcPvDbBuHKME75A"><span>我们也可以切换模型，这样生成的应用效果应该更好，我这边切到 qwen3.7 试试，目前这个模型会消耗积分。</span></p>

<p id="t-HL52zXJv6UzgwRjtjImCyy"><span style="border-bottom:1px solid">使用不同模型再测试这个应用，左边上角可以切换模型：</span></p>

<div id="t-qPyuhjmZD2ChETDKuf6XWY"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/a11f8320bc9f35d30963665a.png"/></div>

<p id="t-arYl3yuNXiksEe4b1a88sA"><span style="border-bottom:1px solid">输入以下内容：</span></p>

<pre id="t-l6G8cXsXAtXHHrkh0igEhy"><code>重新优化整个界面</code></pre>

<div id="t-grgp0NXWE1zEpxwbZY0oi1"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/6b547f9eaf3915c15dd3ba55.png"/></div>

<p id="t-WWOmW8Z33R1KCCBdUTE1Q3"><span style="border-bottom:1px solid">修改完成后，访问它生成的链接：</span></p>

<div id="t-lcelGD6JgIE8jmoAsxz2Hj"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/e7a89aec841e6ab6310cc18e.png"/></div>

<p id="t-gWcBCJH4UUkqBOU6sC1LMi"><span style="border-bottom:1px solid">完整效果，好多了：</span></p>

<div id="t-NrFT2tZE6gtK2T90tpoQhC"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/79529da3299a735be4a66656.png"/></div>


<a id="section-1783"></a>
## 搭子（DuMate）入门教程

<a id="t-c6R6Ku2uaONyup4WdSUE8D"></a>

<p id="t-MqmBrYqv3yH4LVKbKobAuz"><span>DuMate（百度搭子）是百度推出的一款面向个人及团队的桌面级 AI 办公智能体。</span></p>

<p id="t-DN1yOF4u5bdWj3YttNQBMC"><span>与普通的 AI 聊天机器人仅能回答问题不同，DuMate 具备强大的执行能力——它可以看见屏幕、操作软件、处理文件、串联业务系统，实现从想法到结果的全程自动化执行，真正做到工作有搭子，办公更高效。</span></p>


<a id="section-1784"></a>
## 为什么需要 DuMate

<a id="t-Cp7wgDq9j7b442YajwlXW3"></a>

<p id="t-22v6u7dZFzZ0BFRYK6sSwY"><span>传统办公中，很多任务需要手动操作：复制粘贴数据、填表、查网页、整理文件。</span></p>

<p id="t-dOyuuSvvALOtWgOXlNMbrm"><span>这些工作重复性强、耗时多，但技术含量低。</span></p>

<p id="t-oriWQiav2E6OF1C9ss0yDc"><span>DuMate 的设计目标，就是把这类机械劳动交给 AI。</span></p>

<p id="t-lWq9TtyYH1KEhRccA52Dy3"><span>你只需要告诉它"帮我整理桌面上所有的 Excel，按项目分类"，它就会自动完成。</span></p>


<a id="section-1787"></a>
## 安装步骤

<a id="t-NfPdVr6F1UdaPRUDgpNQ0Z"></a>

<p id="t-VQ8VQNr0Xl4AWqMca2yBMb"><span style="border-bottom:1px solid;font-weight:bold">我们先点击访问</span><span style="border-bottom:1px solid;font-weight:bold">DuMate 官网</span><span style="border-bottom:1px solid;font-weight:bold">注册 DuMate 账号，</span><span style="border-bottom:1px solid">会下载对应系统的安装包。</span></p>

<p id="t-Dk8c36NJfMzhBBYPbTgFCe"><span style="border-bottom:1px solid">双击安装包，按照引导完成安装。</span></p>

<div id="t-D6ZcIZiFs7Bk4ff10gArFw"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/a2c8d8d72d55c6c7c15b4846.png"/></div>

<p id="t-liuMpwxlma9ilOIMVmgZhh"><span style="border-bottom:1px solid">启动 DuMate 应用，可以使用手机号登录，登录后 Dumate 会先构建环境：</span></p>

<div id="t-PPBws6aJCnKQxyouVnWNH4"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/f02e73ed472dfb0f60de5846.png"/></div>

<p id="t-PhQGWHDaBNkSRPDbmoaqSO"><span style="border-bottom:1px solid">完成后，界面如下所示：</span></p>

<div id="t-gYZe8980h4HkZXOLvAcfen"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/2dd8483499984d9036b93d82.png"/></div>

<p id="t-gwP4HOGHWTcmllF0vSIIlD"><span style="border-bottom:1px solid">以下是界面各部分的说明：</span></p>

<p id="t-HCijTU2YGIiB71jlemLRcP"><span style="border-bottom:1px solid;font-weight:bold">左侧边栏:</span></p>


<a id="section-1824"></a>
## QoderWork 教程

<a id="t-block-23428"></a>

<p id="t-bQCwtQ97p3mArthePXAglo"><span style="border-bottom:1px solid">OpenClaw 虽然强大，其实还是有门槛的，要懂命令行，还得安装 node.js 等，各种配置，没技术还真不好整。</span></p>

<p id="t-SCKGKw0RyFPFQmNgn4rPOp"><span style="border-bottom:1px solid">阿里出了一个桌面级 AI Agent -- QoderWork，这个就简单多了，下载后直接用，不需要懂命令行，软件内可以安装配置各种 skills。</span></p>

<p id="t-R7JB1veqw1Rmy4CdxoxwLM"><span style="border-bottom:1px solid">我们只需要描述需求，QoderWork 就会自动拆解步骤、调用软件、执行并交付结果。</span></p>

<ul><li id="t-3rL9lnwaz0DAb8xURsmoaZ"><span style="border-bottom:1px solid;font-weight:bold">传统 AI 工具：</span><span>你问，它答，动手还得靠自己。</span></li></ul>

<ul><li id="t-cCe6Zud6PekbjhstZk8gVs"><span style="border-bottom:1px solid;font-weight:bold">QoderWork：</span><span>你说需求，它交付结果。</span></li></ul>

<p id="t-dKomJenWWJYCizqmZTFuKr"><span style="border-bottom:1px solid;font-weight:bold">我们先点击访问</span><span style="border-bottom:1px solid;font-weight:bold">QoderWork 官网</span><span style="border-bottom:1px solid;font-weight:bold">注册 QoderWork 账号</span><span style="border-bottom:1px solid;font-weight:bold">免费试用 Pro + 300 Credits</span></p>

<div id="t-7q9HfeX3CcrrOBFqPrqIVJ"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/ce373825713d7c40834671ed.png"/></div>

<p id="t-je3m8nG1vZ9gGQKdmuIlv8"><span style="border-bottom:1px solid">注册完成后点击右上角的</span><span style="border-bottom:1px solid;font-weight:bold">下载</span><span style="border-bottom:1px solid">按钮：</span></p>

<div id="t-hEhQrxcHWBDQdt8KJ5KH6a"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/280328f8e783d7ffaf7bba3e.png"/></div>

<p id="t-x7Ht7V7dwDde3M5V1jXaO5"><span style="border-bottom:1px solid">选择</span><span style="border-bottom:1px solid;font-weight:bold">QoderWork</span><span style="border-bottom:1px solid">选项，根据你的电脑系统，下载安装程序：</span></p>

<div id="t-8bS9b8iM6SmwGOeGXc5W6W"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/4ede90fcf9193436c9c21beb.png"/></div>

<p id="t-1yQINSIlxYJf2HJeSfDoQ5"><span style="border-bottom:1px solid">下载后，双击安装，安装完成界面如下：</span></p>

<div id="t-KVZblOPeWiMBjxRRf63ydA"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/2c43e5e91cac830a5f2dd589.png"/></div>

<p id="t-rwsJfDZW7PyF6ec4J1L4A1"><span style="border-bottom:1px solid">QoderWork 可以：</span></p>

<ul><li id="t-dTqhq9WDVqmbwbQtICWVZp"><span>理解自然语言任务</span></li></ul>

<ul><li id="t-qjwiA7tyqR49q3OeBZjUOj"><span>自动规划执行步骤</span></li></ul>

<ul><li id="t-iEfwmWbR5rgoz9HPTjtr4u"><span>调用本地文件和应用</span></li></ul>

<ul><li id="t-oGlqglK77yyUtTlu5vtPnK"><span>自动完成多步骤任务</span></li></ul>

<p id="t-lWwCplWjrn9tC59MVtL5vq"><span style="border-bottom:1px solid">典型应用场景：</span></p>

<div id="t-ieTTrtUwAaxlMDHx65Qici"><table><colgroup><col width="120"/><col width="389.89752197265625"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>场景</span></p></td><td style=" vertical-align: top"><p><span>说明</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">文件整理</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">自动识别文件类型，智能整理项目文件</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">照片管理</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">按时间、地点、主题自动分类整理本地照片</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">数据分析</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">分析数据结构，生成统计报表与可视化图表</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">文档创作</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">撰写报告、制作演示文稿、处理表格数据</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">研究整合</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">汇总多源信息，提炼关键洞察</span></p></td></tr></tbody></table></div>

<p id="t-JFgqi8OYX3Gb9zgSFrdRSm"><span style="border-bottom:1px solid">比如你说一句：</span></p>

<pre id="t-PBJLOQ5ksJZnVubxKSWCSi"><code>分析这个 Excel 销售表，并生成一个 PPT 汇报。</code></pre>

<p id="t-NgcjqJjrPMLYLlP02mMlYP"><span style="border-bottom:1px solid">QoderWork 可以自动：</span></p>

<ul><li id="t-4UCLSMkbigoIO4XogbDLD8"><span>读取 Excel</span></li></ul>

<ul><li id="t-ix5YCwXTwDe4ECKYrmXwaB"><span>分析销售数据</span></li></ul>

<ul><li id="t-OFQmL5zZLwsgncFmVJ3DnP"><span>生成图表</span></li></ul>

<ul><li id="t-IBb7KsGVHsAzTHe3ZQCsou"><span>写分析报告</span></li></ul>

<ul><li id="t-JuGIwI9pCIaihpezqyNrig"><span>生成 PPT</span></li></ul>

<p id="t-zN2ge5vVGDt9vr0CWLgIBG"><span style="border-bottom:1px solid">整个流程一次完成。</span></p>

<p id="t-4mgJuphyLRJaNdOrpa3iqn"><span style="border-bottom:1px solid">我们先创建一个 QoderWork 的工作目录：</span></p>

<pre id="t-zpIPr062IwNJIvq8458eeu"><code>mkdir  qoderwork-runoob-test</code></pre>

<p id="t-gbwttTpmkdE7XZdjW7yBiD"><span>进入该目录：</span></p>

<pre id="t-skr6kDQQ6eJhFOLBmL4Qpi"><code>cd qoderwork-runoob-test</code></pre>

<p id="t-83WP41G10hG2IaxZd4H5kB"><span style="border-bottom:1px solid">我们来创建测试数据，直接复制以下内容，粘贴到记事本/文本编辑器，保存为</span><span style="border-bottom:1px solid;font-weight:bold">sales_test.csv</span><span style="border-bottom:1px solid">文件：</span></p>

<pre id="t-aGDc1xM0XJL8GffifjXA1q"><code>订单ID,商品名称,商品品类,销售单价,销售数量,销售日期,客户姓名,客户地区,销售人员,佣金比例
OD2026001,iPhone 14,电子产品,5999.00,2,2026-01-05,张三,北京,李明,0.05
OD2026002,MacBook Pro,电子产品,12999.00,1,2026-01-06,李四,上海,王红,0.08
OD2026003,耐克运动鞋,服饰鞋帽,799.00,1,2026-01-07,王五,广州,张丽,0.03
OD2026004,家用咖啡机,家居家电,1299.00,1,2026-01-08,赵六,深圳,李明,0.05
OD2026005,无线耳机,电子产品,899.00,3,2026-01-09,钱七,杭州,王红,0.08
OD2026006,羽绒服,服饰鞋帽,1599.00,1,2026-01-10,孙八,成都,张丽,0.03
OD2026007,全自动洗衣机,家居家电,3999.00,1,2026-01-11,周九,武汉,李明,0.05
OD2026008,iPad Air,电子产品,3799.00,2,2026-01-12,吴十,西安,王红,0.08
OD2026009,跑步机,运动器材,2999.00,1,2026-01-13,郑一,南京,张丽,0.03
OD2026010,智能手表,电子产品,1999.00,1,2026-01-14,王二,天津,李明,0.05
OD2026011,羊毛衫,服饰鞋帽,599.00,2,2026-01-15,李三,重庆,王红,0.08
OD2026012,空气净化器,家居家电,1899.00,1,2026-01-16,张四,青岛,张丽,0.03
OD2026013,游戏手柄,电子产品,399.00,4,2026-01-17,王五,大连,李明,0.05
OD2026014,登山包,运动器材,499.00,1,2026-01-18,赵六,厦门,王红,0.08
OD2026015,电饭煲,家居家电,899.00,2,2026-01-19,钱七,福州,张丽,0.03
OD2026016,蓝牙音箱,电子产品,599.00,3,2026-01-20,孙八,长沙,李明,0.05
OD2026017,牛仔裤,服饰鞋帽,299.00,2,2026-01-21,周九,沈阳,王红,0.08
OD2026018,微波炉,家居家电,799.00,1,2026-01-22,吴十,哈尔滨,张丽,0.03
OD2026019,健身器材套装,运动器材,1599.00,1,2026-01-23,郑一,石家庄,李明,0.05
OD2026020,平板电脑,电子产品,2799.00,1,2026-01-24,王二,太原,王红,0.08
OD2026021,运动T恤,服饰鞋帽,199.00,5,2026-01-25,李三,郑州,张丽,0.03
OD2026022,吸尘器,家居家电,1499.00,1,2026-01-26,张四,济南,李明,0.05
OD2026023,电脑显示器,电子产品,1299.00,2,2026-01-27,王五,合肥,王红,0.08
OD2026024,瑜伽垫,运动器材,199.00,3,2026-01-28,赵六,南昌,张丽,0.03
OD2026025,茶叶礼盒,食品饮品,399.00,3,2026-01-29,钱七,昆明,李明,0.05
OD2026026,皮鞋,服饰鞋帽,899.00,1,2026-01-30,孙八,兰州,王红,0.08
OD2026027,电烤箱,家居家电,699.00,1,2026-01-31,周九,银川,张丽,0.03
OD2026028,机械键盘,电子产品,499.00,2,2026-02-01,吴十,西宁,李明,0.05
OD2026029,篮球,运动器材,199.00,2,2026-02-02,郑一,乌鲁木齐,王红,0.08
OD2026030,坚果礼盒,食品饮品,299.00,6,2026-02-03,王二,拉萨,张丽,0.03</code></pre>

<p id="t-UCGcn8CGFMKXrjL8nDIkoL"><span style="border-bottom:1px solid">下载 sales_test.csv</span></p>

<div id="t-xHW3YXO7wHYF6RYkogX05M"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/b3226cdc5ac219161ded6bb7.png"/></div>

<p id="t-Shrg3wdUnMtw8XbxfVcUP3"><span style="border-bottom:1px solid">然后打开 QoderWork，左下角的选择工作目录设置为 qoderwork-runoob-test：</span></p>

<div id="t-0kcnD5HEXEowVlJPkhzqCK"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/d5e80ff6df2dd0408614ec41.png"/></div>

<p id="t-NOCboIeH3TKYKweeIBhFNb"><span style="border-bottom:1px solid">输入内容：</span></p>

<pre id="t-8cu6V9XKeIPJ4tdmKRqVT1"><code>分析该目录下的 Excel 销售表 ，并生成一个 PPT 汇报 。</code></pre>

<div id="t-z2r67esjSMFN4PKzEXZEmz"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/0b3e5d6f86dae12c23916bcf.png"/></div>

<p id="t-KVBlR38YoO9VuQyqdunUh2"><span style="border-bottom:1px solid">从上图可以看到，QoderWork 已经分析好步骤并开始执行任务了。</span></p>

<p id="t-UQyzfxFzEaRh6rxYxw0XZI"><span style="border-bottom:1px solid">执行完成后 qoderwork-runoob-test 目录下会生成一个 ppt 文件，提示如下：</span></p>

<div id="t-03r4mJYMrciZLN4yHdQ8Xi"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/a35904deeb30dd796946dc13.png"/></div>

<p id="t-z61a8AWV9vZSQF60RyfiAS"><span style="border-bottom:1px solid">我们可以直接打开 PPT 看下，效果不错：</span></p>

<div id="t-LAvFoXamVIa0nujed8UX0H"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/74b40b88f32e41998bd4df2f.png"/></div>

<p id="t-8wThJkbUzW8Bhox1vKyTLR"><span style="border-bottom:1px solid">此外，我们可以在输入框使用</span><span style="border-bottom:1px solid;font-weight:bold">@</span><span style="border-bottom:1px solid">来调用专门生成 ppt 的 skills 来生成：</span></p>

<div id="t-bjvib37kSGqQ1uSWrxS6Fd"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/45564ce78fdbfd623f9fa3c4.png"/></div>

<p id="t-VbvQxFiyiT7THiOevhYTlY"><span style="border-bottom:1px solid">生成过程就会使用该 Skills：</span></p>

<div id="t-slofdNO2CYuzgAi3qP625p"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/867175442428526a1093e05d.png"/></div>


<a id="section-1826"></a>
## 与 ChatGPT / Claude 的区别

<a id="t-LHT8xYIElNOxlDZG29OCvS"></a>

<div id="t-26XGWlU48mND2Vh6BKme7d"><table><colgroup><col width="146.89755249023438"/><col width="171.89752197265625"/><col width="177.11279296875"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>类型</span></p></td><td style=" vertical-align: top"><p><span>ChatGPT / Claude</span></p></td><td style=" vertical-align: top"><p><span>QoderWork</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">本质</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">AI对话助手</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">AI桌面执行Agent</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">能力</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">给建议</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">直接执行任务</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">文件处理</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">手动上传</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">直接访问本地</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">自动化</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">弱</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">强</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">使用场景</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">写作、问答</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">实际办公工作</span></p></td></tr></tbody></table></div>

<p id="t-zuz5bIAq0S2uuU7pTqhKD4"><span style="border-bottom:1px solid">简单理解：</span></p>

<ul><li id="t-Z9wPHRuQjN68Vn96PjBKdC"><span>ChatGPT 是大脑。</span></li></ul>

<ul><li id="t-DTLzB4GwV3Lrexx6bZQAiI"><span>QoderWork 是手脚。</span></li></ul>


<a id="section-1827"></a>
## 与 OpenClaw / Claude Code 的关系

<a id="t-6KjKYyCYgE0JKpD7STQXyL"></a>

<p id="t-1Su53Hl78wyBotrv7BHT7C"><span style="border-bottom:1px solid">如果放在</span><span style="border-bottom:1px solid;font-weight:bold">AI Agent 工具谱系</span><span style="border-bottom:1px solid">里：</span></p>

<div id="t-wDCVYzMEH4h6Zy4tm7am7b"><table><colgroup><col width="157.89755249023438"/><col width="280.00689697265625"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>产品</span></p></td><td style=" vertical-align: top"><p><span>类型</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Claude Code</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">编程 Agent</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">OpenClaw</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">自动化 Agent</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">QoderWork</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">桌面办公 Agent</span></p></td></tr></tbody></table></div>

<p id="t-U8an12z3tJR8usQ85O5RRO"><span style="border-bottom:1px solid">QoderWork 的定位其实是：</span><span style="border-bottom:1px solid;font-weight:bold">桌面版 AI 办公助手 + 自动化 Agent</span></p>


<a id="section-1828"></a>
## QoderWake 入门教程

<a id="t-block-23491"></a>

<p id="t-KHRlxIDEoscxeSRaiU5reM"><span style="border-bottom:1px solid">QoderWake 让你在本机组建一支数字员工团队（Wakers），每个员工有岗位、有名字、有人设、有专长，可以被你召唤聊天或干活，也可以按计划或事件自动开工。</span></p>

<p id="t-PHG3k4jEWPum8mJEfaj15T"><span style="border-bottom:1px solid">产品核心理念：7x24 小时数字员工，</span><span style="border-bottom:1px solid;font-weight:bold">"Always awake, always working."</span></p>

<div id="t-cylHKz6suUA3uIHfcdwNFc"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/75793c1d2e759a785b4b87cf.webp"/></div>

<p id="t-MnwqIgGGoI4GLJDJQDjxgU"><span style="border-bottom:1px solid">QoderWake 是一款数字员工管理平台，支持本地部署和云端部署。</span></p>

<ul><li id="t-TKUNxdXKAvZNN5Rci17MqI"><span style="border-bottom:1px solid">核心特性：安全可控、生产可用、持续进化。</span></li></ul>

<ul><li id="t-mvEwJNOblWW81p6qKlPIV9"><span style="border-bottom:1px solid">核心概念：员工角色（Role）到数字员工（Agent）再到团队/组织（Agent Teams），三层递进。</span></li></ul>

<p id="t-vdBvJeZrqGR421YSdZ1ujI"><span style="border-bottom:1px solid;font-weight:bold">我们先点击访问</span><span style="border-bottom:1px solid;font-weight:bold">QoderWork 官网</span><span style="border-bottom:1px solid;font-weight:bold">注册 QoderWork 账号</span><span style="border-bottom:1px solid;font-weight:bold">免费试用 Pro + 300 Credits</span></p>

<div id="t-ThQiaqer5yL34gLMYMjKjP"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/ce373825713d7c40834671ed.png"/></div>

<p id="t-PWV212sHUL7Dgqx0nVLimD"><span style="border-bottom:1px solid">注册完成后点击右上角的</span><span style="border-bottom:1px solid;font-weight:bold">下载</span><span style="border-bottom:1px solid">按钮：</span></p>

<div id="t-XR7E7MwwXxkiZ1gpSyE5qI"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/280328f8e783d7ffaf7bba3e.png"/></div>

<p id="t-6i1CFnT8Bxw7irLt6bLCiE"><span style="border-bottom:1px solid">选择</span><span style="border-bottom:1px solid;font-weight:bold">QoderWake</span><span style="border-bottom:1px solid">选项，根据你的电脑系统，下载安装程序：</span></p>

<div id="t-SCWKubG6vmoEJpt2ob4LEt"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/97926c8d21e98c26ee1f0472.png"/></div>

<p id="t-waJN4mp1hDTaNR3ZIUyAfA"><span style="border-bottom:1px solid">下载后，双击安装，安装完成界面如下：</span></p>

<div id="t-u1tp9A3vH6aIL0Hmw513CP"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/3d70943b52b977f423d4ddaf.png"/></div>

<p id="t-lgWF3zubpMsn5beYidE9J4"><span style="border-bottom:1px solid">左下角设置按钮，可以设置语言，切换到中文后，如下：</span></p>

<div id="t-xpsp8PtabN8cujp9t77Stm"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/692cb8d4151cd207317a07f5.png"/></div>


<a id="section-1829"></a>
## 可用角色一览

<a id="t-c3K6uuhi22OkejjNwi3Z0J"></a>

<p id="t-vgPV4pLit5AfIT2AsC1IAc"><span style="border-bottom:1px solid">当前邀测覆盖以下角色，选最贴近你需求的即可：</span></p>

<div id="t-SCucBlffCqLVPYod87u5Ei"><table><colgroup><col width="120"/><col width="528.8975219726562"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>角色</span></p></td><td style=" vertical-align: top"><p><span>岗位特性</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">后端工程师</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">专注于 API 开发、数据建模、服务集成、性能优化和线上稳定性。遵循增量交付、测试验证和约定优先设计的工程实践。员工自动分析 Bug/Issue，改完代码直接提 PR。</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">前端工程师</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">专注前端界面设计与实现，擅长组件架构、视觉语言打磨、响应式适配、无障碍优化和性能调优。遵循增量交付、分层验证和基于证据的校验，兼顾用户体验与工程质量。</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">测试工程师</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">面向通用命令行工具和 Web 产品的质量保障角色，专注测试计划文档、端到端测试、缺陷复现和基于证据的报告；不运行单元测试，也不修复问题。</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">产品经理</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">面向软件产品的 AI 原生产品管理角色，专注目标驱动的需求全生命周期管理、PRD 生成、用户反馈分析、竞品研究和发布沟通，并对外部写入设置明确审批门禁。</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">数据分析师</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">面向问题框定、指标口径、数据收集、数据诊断、市场背景和证据化建议的 AI 原生数据分析师。</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">内容运营</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">面向账号定位、热点洞察、内容日历、小红书笔记创作、视觉素材 brief、审批后发布、评论互动、数据复盘、品牌合规和跨平台改写的 AI 原生内容运营角色。</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">自定义</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">自己定义岗位的工作方式与工作流，可挂载 MCP、Skill 等任意配置。</span></p></td></tr></tbody></table></div>


<a id="section-1830"></a>
## 安装环境说明

<a id="t-CzpJ8ziKI4dU5bZJUlkiHQ"></a>

<p id="t-jI4ti5tYrkHQ42LkZ5Mw60"><span style="border-bottom:1px solid">QoderWake 支持本地部署和云端部署。</span></p>

<p id="t-BZHSxhYUJrs22JxZzOAq6t"><span style="border-bottom:1px solid">建议部署在稳定在线、网络良好的常开设备或云桌面环境中，以保障数字员工 7x24 小时持续运行。</span></p>

<blockquote id="t-KMHtRiHKXJwxbTwhXkmN1b"><p id="t-l5F4MLdPkwZ0mBbH7R8oqq"><span style="border-bottom:1px solid;font-style:italic">Windows 版本敬请期待，暂未对外开放，请先在 macOS 或 Linux 上使用。</span></p></blockquote>


<a id="section-1831"></a>
## 本地部署要求

<a id="t-33ZcW8tx8TqWtiPQtDfQCD"></a>

<p id="t-HKFTJXiwo2W71WqqJz8fCw"><span style="border-bottom:1px solid">推荐部署在可长期稳定运行的本地设备上，例如 Mac mini，以获得更好的 7x24 小时运行体验。</span></p>

<div id="t-uFKkFkdtO1NY8EUWgmXMsI"><table><colgroup><col width="120"/><col width="519.8975219726562"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>系统</span></p></td><td style=" vertical-align: top"><p><span>版本要求</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">macOS</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">13.0 及以上版本</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Linux</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">推荐 Ubuntu 22.04 LTS 及以上版本，需启用 GUI 桌面以使用本地 Web Console</span></p></td></tr></tbody></table></div>


<a id="section-1832"></a>
## 云端部署要求

<a id="t-BL214F8WlfF8kvsa6B1G87"></a>

<p id="t-aosZlFQNUlakytmmAErSmJ"><span style="border-bottom:1px solid">支持主流云桌面和云主机环境。</span></p>

<p id="t-Eo7zCUKXWq4pfhcA1vOAZw"><span style="border-bottom:1px solid">为方便浏览器登录和本地 Web 管理，推荐使用无影云电脑企业版或个人版。</span></p>


<a id="section-1833"></a>
## 前置工具

<a id="t-shXVdYUdaRCpziF6gzvtjN"></a>

<p id="t-OD8rL5883VEHfLH4clIkf2"><span style="border-bottom:1px solid">产品预置多个软件研发类数字员工角色，安装前请先准备好 Git 环境，并确认当前账号能正常访问目标代码仓库：</span></p>

<ul><li id="t-3KzNXO3GHXJEluraWUtnNn"><span>已安装</span><span style="border-bottom:1px solid;font-weight:bold">git</span></li></ul>

<ul><li id="t-ZpHgZBo8KH598jPkaWBGnr"><span>已完成仓库认证配置</span></li></ul>

<ul><li id="t-ASZT61umoLZFqyA59xQBKs"><span>可以正常执行</span><span style="border-bottom:1px solid;font-weight:bold">clone</span><span>、</span><span style="border-bottom:1px solid;font-weight:bold">pull</span><span>、</span><span style="border-bottom:1px solid;font-weight:bold">push</span><span>操作</span></li></ul>

<p id="t-U7Bz01Fp8a4Pz6rgXcNjvv"><span style="border-bottom:1px solid">本地或云端部署环境均需支持外部网络访问，用于用户登录、模型调用、代码仓库访问等。</span></p>

<p id="t-iNYfM0bHhFx16LjjYkCMp4"><span style="border-bottom:1px solid">在企业网络、代理或防火墙环境下，请提前放通必要的 HTTPS 出站访问。</span></p>


<a id="section-1834"></a>
## 步骤 1：安装 QoderWake

<a id="t-LIqIvrPTYkw8kkjHmUJ01Q"></a>

<p id="t-zaSEgaNCL40ec0eqQtaKsZ"><span style="border-bottom:1px solid">根据你的操作系统选择对应的安装方式。</span></p>


<a id="section-1835"></a>
## macOS 安装

<a id="t-ME3gFd0oWRMCoEuc5SifKt"></a>

<p id="t-02kgyjKN02mYFUhGQiYkYP"><span style="border-bottom:1px solid">方式一：直接下载安装包。</span></p>

<ul><li id="t-gZQpkPGzbTouyQN1YR8Kh5"><span style="border-bottom:1px solid;font-weight:bold">Apple 芯片（ARM）</span><span>：</span><span style="border-bottom:1px solid">下载 ARM 版</span></li></ul>

<ul><li id="t-OQXGQ5Ir0pjT8WRjQXfg9I"><span style="border-bottom:1px solid;font-weight:bold">Intel 芯片</span><span>：</span><span style="border-bottom:1px solid">下载 Intel 版</span></li></ul>

<p id="t-LGMhXmBDnQlqvrnXwWenLH"><span style="border-bottom:1px solid">方式二：通过终端一键安装。</span></p>

<pre id="t-l5ZiYzLPOfMUAfMYP4NWLx"><code># 一键安装命令，自动检测平台并完成安装
curl -fsSL https://qoder-ide.oss-ap-southeast-1.aliyuncs.com/qoderwake/install.sh | bash</code></pre>

<p id="t-NHCgcpGUU0VdydUt9Xaauc"><span style="border-bottom:1px solid">脚本会自动完成：检测平台、下载并校验安装包、安装主程序和资源文件、把命令入口加入 PATH、启动浏览器登录、启动本地常驻服务并打开 Web Console。</span></p>

<p id="t-t8VeAzKbrxeQwjY0wFAeQH"><span style="border-bottom:1px solid">安装完成后命令入口为：</span></p>

<pre id="t-2YpjoU0BVkTC9vbt8twUsM"><code>~/.qoderwake/bin/qoderwake</code></pre>


<a id="section-1836"></a>
## Linux 安装

<a id="t-mvOQ7Qc59iMEGDQnpuovbv"></a>

<p id="t-SZAuY0Q1xZWK2SXQhslpg9"><span style="border-bottom:1px solid">打开终端，运行与 macOS 相同的一键安装命令。</span></p>

<p id="t-mEN7hq1JyXn3NpBZIKBzE1"><span style="border-bottom:1px solid">安装脚本会自动完成以下步骤：</span></p>

<ol start="1"><li id="t-MeNDnHziwgiAKOSX9aQQps"><span>检测 Linux CPU 架构</span></li></ol>

<ol start="2"><li id="t-H3npzTHFi5UsynQZTWzkKk"><span>下载并校验对应平台的 QoderWake 安装包</span></li></ol>

<ol start="3"><li id="t-AVgXr8Ux3HZ7TxU2vceBMK"><span>安装 QoderWake 主程序和资源文件</span></li></ol>

<ol start="4"><li id="t-C9vVONlZGaKbGjuL5fV3kx"><span>创建命令入口并尝试加入 PATH</span></li></ol>

<ol start="5"><li id="t-luy5vi4HnuC2sZV5UZaCYQ"><span>启动浏览器登录</span></li></ol>

<ol start="6"><li id="t-3WKrUNrgd3UhJ9F48xpmH7"><span>登录后启动或重启本地常驻服务</span></li></ol>

<ol start="7"><li id="t-aNPsz8UJAa5zoFh36Qy6MM"><span>自动打开本地 Web Console</span></li></ol>

<p id="t-13selyNYJ9vcIF5RORb3Ne"><span style="border-bottom:1px solid">命令入口：</span></p>

<pre id="t-MXkv2NYjEJSbR3zQKeqiSY"><code>~/.qoderwake/bin/qoderwake</code></pre>

<p id="t-ta29WhdtRKRzi948ECh5HM"><span style="border-bottom:1px solid">默认 Web Console 地址：</span></p>

<pre id="t-GLG08m5IiRmGW9CXwMpyPy"><code>http://127.0.0.1:19820</code></pre>


<a id="section-1837"></a>
## 步骤 2：打开控制台

<a id="t-Xyw0LBy7YJKGCfArflWAe1"></a>

<p id="t-1RJE88l2R2qPJFdIFvqnP3"><span style="border-bottom:1px solid">浏览器访问</span><span style="border-bottom:1px solid;font-weight:bold">http://127.0.0.1:19820/</span><span style="border-bottom:1px solid">，这是 QoderWake 在你本机的管理台。</span></p>

<p id="t-c0Y6dnhrSJvYkDWk2EYXky"><span style="border-bottom:1px solid">员工管理、派活、配置权限都在这里完成。</span></p>

<div id="t-NFPcIuJPDXL0Jv3nBeWFww"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/4d2e850ebe217a2673aa4074.png"/></div>


<a id="section-1838"></a>
## 界面布局说明

<a id="t-nV9g18cljxRcymu7pPRS07"></a>

<div id="t-R9lqLtmyqLAUM6fGm0Oqsh"><table><colgroup><col width="120"/><col width="465.89752197265625"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>区域</span></p></td><td style=" vertical-align: top"><p><span>功能说明</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">左侧边栏</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">展示"我的 Waker"列表，显示所有已创建的员工和最近活动时间</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">顶部按钮</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">点击"创建 Waker"快速新建员工，右侧支持新建任务</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">主区域</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">进入某个员工后默认打开对话页面，可直接派活</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">右侧边栏</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">查看已创建的任务及当前运行中任务的详情</span></p></td></tr></tbody></table></div>

<p id="t-k76hbqd9BlQtDpKYscGxF2"><span style="border-bottom:1px solid">首次访问会引导你登录账户，按提示完成即可。</span></p>


<a id="section-1839"></a>
## 步骤 3：创建数字员工

<a id="t-ckVdwO9g9Ae4UB9C4no1Wh"></a>

<p id="t-BvlQApANk8ft44Isteuqxu"><span style="border-bottom:1px solid">点击左侧</span><span style="border-bottom:1px solid;font-weight:bold">"创建 Waker"</span><span style="border-bottom:1px solid">按钮进入创建流程。</span></p>

<div id="t-Oq2rJMXeQCOnifRrv3qYWq"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/791f7f92d85eae1ba6c65603.png"/></div>


<a id="section-1840"></a>
## 创建流程

<a id="t-RbJgBOMqfRqbcwV5Rs6sgq"></a>

<ol start="1"><li id="t-iNfdaEQYjWnqzsC0vCoLcW"><span style="border-bottom:1px solid;font-weight:bold">选一个角色模板：</span><span>每个角色模板自带人设、典型工作流、核心技能集和默认问题，点击"查看详情"可以预览。</span></li></ol>

<ol start="2"><li id="t-DFneTT5vbJUNI3myvP33yh"><span style="border-bottom:1px solid;font-weight:bold">或自定义角色：</span><span>如果预置角色都不合适，可选择"自定义角色"，完全由你定义这位员工的人设、专长、工作风格，再为其配置技能、连接器和权限。</span></li></ol>

<ol start="3"><li id="t-d5R5SXWUNELkNlpDUJL8tR"><span style="border-bottom:1px solid;font-weight:bold">填写基本信息：</span><span>填写员工的名字、头像、简介。选择预置角色后内容会自动带过来，可按需调整。</span></li></ol>

<ol start="4"><li id="t-SLMRSxaOY2StjSWAbe0N2T"><span style="border-bottom:1px solid;font-weight:bold">保存：</span><span>点击保存，员工就创建好了。新员工首次创建后会进入引导，推荐你先挂哪些技能、接哪些渠道，可以跳过留待后续配置。</span></li></ol>

<blockquote id="t-DqHXovHZTVAnwXHWShSrog"><p id="t-jAwtIWU4yGrHKneFJadsKM"><span style="border-bottom:1px solid;font-style:italic">为提升自定义角色的使用效果，建议在创建时尽量提供完整的角色信息——角色定位、核心职责、工作流程、所需技能以及 MCP 等工具能力配置。</span></p></blockquote>


<a id="section-1841"></a>
## 步骤 4：跟员工开始干活

<a id="t-rfk1dCtPysrNj91xsG1IUr"></a>

<p id="t-CPYrd5D5we41w8sJ0wVD02"><span style="border-bottom:1px solid">新员工创建完成后，可以选择</span><span style="border-bottom:1px solid;font-weight:bold">直接对话</span><span style="border-bottom:1px solid">或</span><span style="border-bottom:1px solid;font-weight:bold">创建自动任务</span><span style="border-bottom:1px solid">两种方式派活。</span></p>


<a id="section-1842"></a>
## 对话任务

<a id="t-T29qcqryuCFaxcOKxit5bT"></a>

<p id="t-ru6MgnjzBfl1ueVJpSfTar"><span style="border-bottom:1px solid">直接在输入框输入需求并发送，员工就开始干活。</span></p>

<div id="t-IYjrl06v0D9xcDvx62pLmn"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/c04196c03a9f743887ebfffa.png"/></div>

<p id="t-xOKMeKcS9jeFeJMX5zLROt"><span style="border-bottom:1px solid">过程中你可以进行的操作：</span></p>

<div id="t-RdXIPnv1uLZePYq2jphCjI"><table><colgroup><col width="131.89755249023438"/><col width="495.008544921875"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>操作</span></p></td><td style=" vertical-align: top"><p><span>说明</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">追问、调方向</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">随时插话，员工接着上下文继续</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">附文件/截图</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">任何一轮发言都能再贴附件</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">打断</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">员工方向跑偏可以让他停</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">审批操作</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">当员工要动文件、跑命令、上网时会停下来征求同意，你点"允许"或"拒绝"</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">回答员工提问</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">他遇到选择会回头问你，直接在卡片上选</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">切换 AI 模型</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">对话中途感觉不够聪明或想省钱，顶部下拉可以换模型继续</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">看思考过程</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">能实时看到员工下决定前的推理思路</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">看产物</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">右侧面板实时展示员工产出的代码补丁、新生成的文件等</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">选择工作目录</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">在对话底部可以选择员工工作的本地目录</span></p></td></tr></tbody></table></div>


<a id="section-1843"></a>
## 自动任务

<a id="t-gHbI5DSDUs0RRJC4dnWtYp"></a>

<p id="t-Frp5D0zTe4FKIMRIDjgClA"><span style="border-bottom:1px solid">适合"每天跑一次"、"监听某个仓库变化就自动响应"这类场景。</span></p>

<div id="t-1IBsslmCLEkFZAKpMlORKe"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/50938be4dca6ae97ff9ddf27.png"/></div>

<p id="t-SW8DhbMi1TNoGaMIuwAKKH"><span style="border-bottom:1px solid">进入</span><span style="border-bottom:1px solid;font-weight:bold">Waker 详情 - 触发任务 - 新建</span><span style="border-bottom:1px solid">，可配置以下内容：</span></p>

<div id="t-wlXim9Rbhy3zXLSMJsb5gx"><table><colgroup><col width="223.90621948242188"/><col width="405.0086059570313"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>配置项</span></p></td><td style=" vertical-align: top"><p><span>说明</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">任务名和描述</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">员工读了就知道要做什么</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">AI 模型</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">选择使用的模型</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">工作目录</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">在本地哪个目录、哪个仓库或哪个项目工作区里执行</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">触发方式（最多 5 种）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">定时（一次性/周期性/复杂周期）、事件驱动（监听 GitHub 仓库变化）、网络回调（第三方系统通过固定地址直接回调触发）</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">最大次数/截止日期（可选）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">限制任务不要无限跑</span></p></td></tr></tbody></table></div>

<p id="t-1weYr1cHY4KagMLDf7HtSY"><span style="border-bottom:1px solid">保存后，员工按你设的节奏自动干活。</span></p>

<p id="t-z7qvNOiZwOpd89s7OeYWAY"><span style="border-bottom:1px solid">你可以随时暂停/启用、立即运行测试、查看运行历史。</span></p>


<a id="section-1844"></a>
## 步骤 5：管理你的数字员工

<a id="t-aoJitIqNcqXhaX9tisz0Dy"></a>

<p id="t-A2bExgj7FZeLc2YDx7An70"><span style="border-bottom:1px solid">进入员工详情页，可以查看和调整员工的所有配置。</span></p>

<div id="t-7Lkwir9F6XTUIdPn9ZlFS5"><table><colgroup><col width="120"/><col width="508.9234619140625"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>目录</span></p></td><td style=" vertical-align: top"><p><span>功能说明</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">首页</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">看头像、状态、入职天数、触发任务数、对话任务数、工作热力图</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">项目</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">给他绑定要工作的代码仓库或本地目录。一个项目可包含多个源（多个目录或仓库），项目记忆与员工个人记忆分开</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">触发任务</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">增/删/改/暂停他身上的自动化任务</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">对话任务</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">翻历史对话，继续聊</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">记忆</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">看/编辑他对你和项目的长期认知。来源：对话过程中自动沉淀、手动编辑、系统定期梳理与去重。本地存储，不上传云端</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">技能</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">从 Qoder 官方 Skills Marketplace 安装，本地上传自定义技能，或开关已有技能。内置技能不可卸载</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">连接器</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">对接外部工具/服务（GitHub、Jira、GitLab 等）</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">权限</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">工具防护、文件防护、内置工具策略。高危操作会弹出审批卡片</span></p></td></tr></tbody></table></div>


<a id="section-1846"></a>
## 记忆管理

<a id="t-U13PQVPeuul7pZz0vAxNic"></a>

<p id="t-jNyRfU8h06dvFJ72qx2J07"><span style="border-bottom:1px solid">每个员工有自己的长期记忆，用于积累对你和项目的认知。</span></p>

<p id="t-I1NAK9Gx0gIfT6b30JjFf6"><span style="border-bottom:1px solid">记忆来源有三种：</span></p>

<div id="t-0BoX9s2V90kGHXAGVmbZMA"><table><colgroup><col width="120"/><col width="377.89752197265625"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>来源</span></p></td><td style=" vertical-align: top"><p><span>说明</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">自动沉淀</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">对话过程中员工认为值得记住的信息会自动写入</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">手动写入</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">你可以进记忆页直接编辑</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">系统整理</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">定期由系统帮他梳理和去重</span></p></td></tr></tbody></table></div>

<p id="t-noeve8RiBagLEU9rMzGs0m"><span style="border-bottom:1px solid">进入</span><span style="border-bottom:1px solid;font-weight:bold">员工详情 - 记忆</span><span style="border-bottom:1px solid">，可浏览、搜索、编辑所有记忆条目。</span></p>

<p id="t-78Uxdun7gYr3658qBNNw61"><span style="border-bottom:1px solid">记忆存储在本地，不上传云端。</span></p>


<a id="section-1847"></a>
## 技能（Skill）

<a id="t-jeWU4sEy857hpLQwH25uur"></a>

<p id="t-TjhdNLxdAdvImTRrA5zwHS"><span style="border-bottom:1px solid">技能是员工在对话或触发任务中可以调用的专项能力包。</span></p>

<ul><li id="t-P4cQcmEZxsa1bViSnxMDpG"><span style="border-bottom:1px solid;font-weight:bold">技能市场：</span><span>从 Qoder 官方 Skills Marketplace 安装</span></li></ul>

<ul><li id="t-2BMJAeVokAWfOEOKUP1Q6j"><span style="border-bottom:1px solid;font-weight:bold">上传 Skill：</span><span>本地自行导入</span></li></ul>

<ul><li id="t-K3dX8YB50PLuBwBSYIFlfs"><span style="border-bottom:1px solid;font-weight:bold">内置技能：</span><span>系统自带，不可卸载</span></li></ul>

<p id="t-Z4XAJgx3ZlD3MXsC16xxLI"><span style="border-bottom:1px solid">进入</span><span style="border-bottom:1px solid;font-weight:bold">员工详情 - 技能</span><span style="border-bottom:1px solid">，可查看已安装技能、搜索市场、上传自定义技能。</span></p>


<a id="section-1848"></a>
## 连接器（Connector）

<a id="t-HeTX2lYQs3J8JvVF158lPk"></a>

<p id="t-KsnkOqj1vSeQpBdkFAomRm"><span style="border-bottom:1px solid">连接器是员工对接外部工具/服务的桥梁，支持手动添加连接器。</span></p>


<a id="section-1849"></a>
## 项目

<a id="t-ZKjYN2aCrNEu101lHIJZ8X"></a>

<p id="t-F3Kff9M4OsL6uk2TkkLrPJ"><span style="border-bottom:1px solid">项目是员工的工作空间。</span></p>

<p id="t-ouavJhX4rHSb5U7r397Ml3"><span style="border-bottom:1px solid">进入</span><span style="border-bottom:1px solid;font-weight:bold">员工详情 - 项目</span><span style="border-bottom:1px solid">，可以绑定本地目录或 git 仓库，一个项目可以包含多个源（多个目录/仓库），项目有独立的记忆，跟员工个人记忆分开。</span></p>


<a id="section-1850"></a>
## 权限管理

<a id="t-ZvCq3uDsETj22enoSa6bpR"></a>

<p id="t-7mzyTYnW8CnFmzUtSCHXfz"><span style="border-bottom:1px solid">权限控制员工能做什么、不能做什么。</span></p>

<p id="t-mMr9E2STpy4FTQlWi3tPaZ"><span style="border-bottom:1px solid">进入</span><span style="border-bottom:1px solid;font-weight:bold">员工详情 - 权限</span><span style="border-bottom:1px solid">，包含两大类防护，外加内置工具策略。</span></p>

<a id="t-5h3MXCLqkwPzBaiOGodmZ6"></a>

##### 工具防护

<p id="t-MtgU0PIam1JzQleyvUxS3S"><span style="border-bottom:1px solid">基于内置安全规则对工具参数做校验，命中高危规则后会请求用户授权。</span></p>

<div id="t-Lx3ukUSNBto5JSyc4MDyxJ"><table><colgroup><col width="170.89755249023438"/><col width="337.89752197265625"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>规则分类</span></p></td><td style=" vertical-align: top"><p><span>检测内容</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">命令注入</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">检测 rm、mv 等危险操作</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">资源滥用</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">检测 fork 炸弹、系统重启等</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">代码执行</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">检测 curl | bash 等远程执行</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">网络滥用</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">检测反弹 shell、本地回环访问</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">敏感文件访问</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">检测访问系统关键文件</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">权限提升</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">检测 sudo 等提权操作</span></p></td></tr></tbody></table></div>

<a id="t-kcwyglykkK610nP56A2ta9"></a>

##### 文件防护

<p id="t-A90WCSmaa5mbdJUXjQmQnc"><span style="border-bottom:1px solid">控制员工对本地文件的读写权限。</span></p>

<a id="t-r2XG7cU1Czv48ekWwKnOUk"></a>

##### 内置工具

<p id="t-TEx3soSVlfWe4btPXmIl5Q"><span style="border-bottom:1px solid">对 Waker 可用的内置工具设置</span><span style="border-bottom:1px solid;font-weight:bold">允许</span><span style="border-bottom:1px solid">/</span><span style="border-bottom:1px solid;font-weight:bold">询问</span><span style="border-bottom:1px solid">/</span><span style="border-bottom:1px solid;font-weight:bold">禁用</span><span style="border-bottom:1px solid">策略。</span></p>

<blockquote id="t-VwNwjVvaurmqFRy6I0OxRF"><p id="t-Np4X1CRU5fBYGeQ7uThNOE"><span style="border-bottom:1px solid;font-style:italic">当员工执行操作触发安全规则时，会弹出审批卡片让你决定是否允许。</span></p></blockquote>


<a id="section-1851"></a>
## 场景示例：自动修复 Bug

<a id="t-P0TFucwcp0DXB1HjDWNa1n"></a>

<p id="t-fd9lefjJmCaTmHrkH3xcvr"><span style="border-bottom:1px solid">两种驱动方式可以实现自动修复 Bug。</span></p>


<a id="section-1852"></a>
## 方法 A：手动发起对话

<a id="t-MVA8zlCsUQdzfWHrd0yYjn"></a>

<ol start="1"><li id="t-nQD9gtkKnABAXoMrohm8Mu"><span>打开控制台，选一个</span><span style="border-bottom:1px solid;font-weight:bold">后端工程师</span><span>角色的 Waker</span></li></ol>

<ol start="2"><li id="t-QWZ6zCFIvMsX7SJa8is7Qb"><span>在对话框输入需求并附上报错信息</span></li></ol>

<ol start="3"><li id="t-4ezZWjcW02jXrKWEnoIkuE"><span>员工分析问题、定位根因、给出修复方案</span></li></ol>

<ol start="4"><li id="t-yv8JPwHXt9vUIyid8QwSje"><span>确认后让他执行修复并提 PR</span></li></ol>


<a id="section-1853"></a>
## 实例

<a id="t-yDRu9HbvudGkPrSLVfuknY"></a>

<p id="t-liZMqTD5jqTUc3NRkiCPsr"><span style="border-bottom:1px solid;font-style:italic"># 在对话框中输入类似以下内容，附上报错日志</span></p>

<p id="t-TpHNF7OQBi0qpwrcWt3jn4"><span style="border-bottom:1px solid;font-style:italic"># "帮我排查这个报错的根因并给出最小修复方案"</span></p>

<p id="t-FBEHzchfOUbuTtbqqH0CnA"><span style="border-bottom:1px solid;font-style:italic"># 员工会执行类似以下操作：</span></p>

<p id="t-He5fR4oK5AGWj35mfOP9Sn"><span style="border-bottom:1px solid;font-style:italic"># 1. 分析报错日志，定位问题代码</span></p>

<p id="t-ywtFzdwgGEtD0JINralU9M"><span style="border-bottom:1px solid;font-style:italic"># 2. 给出修复方案供你确认</span></p>

<p id="t-hKwox51iCUm3IlSBrDLoz6"><span style="border-bottom:1px solid;font-style:italic"># 3. 执行代码修复</span></p>

<p id="t-lTL03UaxYoCQXbu9lQR8IK"><span style="border-bottom:1px solid;font-style:italic"># 4. 提交 PR 到代码仓库</span></p>

<p id="t-mESLVWq7dtdnR1l33UpRoW"><span style="border-bottom:1px solid">过程中要执行命令或改文件时，他会先征求你同意。</span></p>


<a id="section-1854"></a>
## 方法 B：设自动任务处理

<a id="t-WJVOM90keZ18Wy6FClMykb"></a>

<ol start="1"><li id="t-Kq1h6TWBQma1vshdUjOyYx"><span>进入</span><span style="border-bottom:1px solid;font-weight:bold">员工详情 - 触发任务 - 新建</span></li></ol>

<ol start="2"><li id="t-T1Q5CyGSFgEeMDZGTvAB3f"><span>触发方式选</span><span style="border-bottom:1px solid;font-weight:bold">"事件"</span><span>，监听 GitHub 仓库的 Issue 变化</span></li></ol>

<ol start="3"><li id="t-IjuUhS68AkqQmRtZNTbKXn"><span>任务描述写：</span><span style="border-bottom:1px solid;font-weight:bold">"有新 Bug Issue 进来时，自动分析并给出修复 PR。"</span></li></ol>

<ol start="4"><li id="t-SEgioCdfg4LOSZr84jLb6h"><span>保存后，每当仓库出现新的 Bug Issue，员工自动启动分析与修复</span></li></ol>

<blockquote id="t-GqAWgc91Z6fzxRwZGrl53E"><p id="t-5ZpdWGzgCPMMCZwpiICFhe"><span style="border-bottom:1px solid;font-style:italic">两种方式各有适用场景：方法 A 适合临时、一次性的问题排查；方法 B 适合持续性的自动化运维，减少人工介入。</span></p></blockquote>


<a id="section-1856"></a>
## 安装后无法打开 Web Console？

<a id="t-RtdC5M4GuLEi2Ki7rxAIsU"></a>

<p id="t-5NCfUQysJ60cpO9YpL7wM6"><span style="border-bottom:1px solid">确认本地服务是否正常运行，检查</span><span style="border-bottom:1px solid;font-weight:bold">http://127.0.0.1:19820</span><span style="border-bottom:1px solid">是否可以访问。</span></p>

<p id="t-AyENTZz8Op2UyrEdhWka1m"><span style="border-bottom:1px solid">如果端口冲突，可检查是否有其他程序占用了 19820 端口。</span></p>


<a id="section-1857"></a>
## 员工执行任务时卡住不动？

<a id="t-tCMXSUpebXVMgI6dQ1HsUu"></a>

<p id="t-UYX2PKLKncNn9qsfkiyzuT"><span style="border-bottom:1px solid">检查员工是否需要你的审批确认，查看对话窗口是否有待处理的审批卡片。</span></p>


<a id="section-1858"></a>
## 自定义角色效果不好？

<a id="t-zQEespIgn1doeBlOdS0O0j"></a>

<p id="t-9E7gw69QhIPzwynUIQ2S6j"><span style="border-bottom:1px solid">建议在创建时提供完整的角色信息：包括角色定位、核心职责、工作流程、所需技能以及 MCP 等工具能力配置，信息越完整效果越好。</span></p>


<a id="section-1859"></a>
## 如何反馈问题？

<a id="t-CV9Inr21sClnrAcLvi2wne"></a>

<p id="t-Ku3zCwYl6wVrCxkgP7VVlk"><span style="border-bottom:1px solid">遇到任何问题或者有产品功能想反馈，点击控制台右下角的反馈按钮提交，团队会尽快回复并解决。</span></p>


<a id="section-1903"></a>
## CrewAI 制作智能体

<a id="t-block-23811"></a>

<p id="t-QnEFKJw9am4AbDiQn4e3YM"><span>CrewAI 是一个多智能体协作的开源框架，专门用于编排和协调多个 AI Agent 进行协作。</span></p>

<p id="t-CyWxJqALqDwgH48jK4eTR1"><span>CrewAI 可以把一个复杂任务，拆成多个角色，各自负责一部分，通过流程协作完成。</span></p>

<p id="t-4J3vytm5I7BXssKncUmq4P"><span style="font-weight:bold">对比理解：</span></p>

<ul><li id="t-hZtVz3oHqXpXM93kHBgMvj"><span style="font-weight:bold">单 Agent</span><span>：一个大模型，从头干到尾</span></li></ul>

<ul><li id="t-sEPFWUVjbdGwTf0nEG1yYC"><span style="font-weight:bold">CrewAI</span><span>：产品经理 + 工程师 + 分析师 + 编辑，各司其职</span></li></ul>

<p id="t-axzcm1XuYNKV2gjULwS4Cq"><span>CrewAI 是一个协调、管理和框架化 AI Agent 的工具，它基于 LangChain 和 Pydantic 构建，用于促进角色扮演、自治和协作的 Agent 团队。</span></p>

<ul><li id="t-mgG176BVm2S4mLC7SwSvPd"><span style="font-weight:bold">Crew（团队）</span><span>： 一个由多个 </span><span>Agent</span><span> 组成的项目组。</span></li></ul>

<ul><li id="t-T6rpxLCpgI5nqWJl9whvlS"><span style="font-weight:bold">Agent（成员）</span><span>： 团队中的个体，每个都有明确的 </span><span>role</span><span>（角色）、</span><span>goal</span><span>（目标）和 </span><span>backstory</span><span>（背景故事）。</span></li></ul>

<ul><li id="t-5MZd519UEuUQeYmeQK8uwx"><span style="font-weight:bold">Task（任务）</span><span>： 需要团队完成的具体工作。一个 </span><span>Crew</span><span> 包含多个有序或并行的 </span><span>Task</span><span>，并分配给合适的 </span><span>Agent</span><span>。</span></li></ul>

<ul><li id="t-zQgN0PZ54xLbVxAK8r5DWM"><span style="font-weight:bold">Process（流程）</span><span>： 定义团队的工作流程，例如是顺序执行还是同时执行任务。</span></li></ul>

<p id="t-DA4DuRAlN6PxQRRSNpnvQe"><span>简单来说，crewAI 提供了一个结构化的方式来定义谁（Agent）在什么流程（Process）下，完成哪些事（Task），最终达成团队目标。</span></p>

<p id="t-GjoXkmtetsCPdM3SnLx16f"><span>下面的流程图清晰地展示了 crewAI 框架中各个核心组件是如何协同工作的：</span></p>

<div id="t-6egORgxqzwszOPKeMuk7oS"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/c5369b4e1f79778f8c8c6682.png"/></div>

<p id="t-piIGWAND2jTLuBScGVcAFq"><span>流程始于定义具备特定角色和目标的智能体（Agent），然后为其创建具体的任务（Task）。</span></p>

<p id="t-NgoYN7Z589rtxRL5RDD14R"><span>接着，将这些智能体及其任务组建成一个团队（Crew），并为团队选择协同工作的流程（Process），如顺序执行或并行执行。最终，团队按照既定流程执行所有任务，产出最终结果。</span></p>


<a id="section-1904"></a>
## 环境搭建与安装

<a id="t-OnHambBHoqHh6aYOXVV2gn"></a>

<p id="t-b95wQt6HKvyIbm4HFPwGrv"><span>开始构建前，我们需要准备好开发环境。</span></p>


<a id="section-1905"></a>
## 前置条件

<a id="t-lnpZhGlhB8V9HjDrFOJtG6"></a>

<p id="t-bzDw6G6WBkGIszOnknceSy"><span style="font-weight:bold">Python 版本要求：</span></p>

<ul><li id="t-6t8D374v7M2QpyvEY5SZ8F"><span style="font-weight:bold">必须</span><span>：Python ≥ 3.10 且 &lt; 3.14</span></li></ul>

<ul><li id="t-X8QZxfVuOeAPOXF6j8HiXg"><span>可以在终端输入 </span><span style="font-weight:bold">python --version</span><span> 来检查，不满足版本范围，后续问题会非常多，不建议硬扛</span></li></ul>

<p id="t-H9TGDNkLoqiYEeIK8Pt9gX"><span>CrewAI 使用</span><span style="font-weight:bold">UV</span><span>做依赖和包管理，目的只有一个：</span></p>

<p id="t-GDvEgwHpPrV7V5bAlBHTtN"><span style="font-weight:bold">让多 Agent 项目更稳定，不被环境问题拖垮</span></p>

<p id="t-Yy6XW9qWFlsFcDFHZe58Jg"><span>UV 入门教程参考：</span><span>UV - Python 包与环境管理工具</span><span>。</span></p>

<p id="t-iovs7I3kyPOe0bn9kfFyQi"><span>API 密钥：</span></p>

<p id="t-tu96o1usewYpNk7YejPQaO"><span>crewAI 本身不提供 AI 模型，它需要连接像 OpenAI 的 GPT、Anthropic 的 Claude 等大语言模型。</span></p>


<a id="section-1906"></a>
## 安装 crewAI

<a id="t-952cGhXd7sP2TAIfQnpI0E"></a>

<p id="t-YovpQI62m7GRVQz5rH5KDs"><span>打开你的终端或命令行工具，使用 pip 命令安装 crewAI 包。</span></p>

<pre id="t-VFG7SrV8n91uP297tBbJNh"><code># 正常安装
pip install crewai
# 其他依赖
pip install langchain
pip install openai


# 如果安装慢，可以使用国内镜像安装
pip install crewai -i https://mirrors.aliyun.com/pypi/simple/
pip install langchain -i https://mirrors.aliyun.com/pypi/simple/
pip install openai -i https://mirrors.aliyun.com/pypi/simple/</code></pre>

<p id="t-tCceUHETss26BrIVm6kVC7"><span>如果希望使用 crewAI 内置的一些高级工具（如网络搜索），可以安装额外的依赖项：</span></p>

<pre id="t-hEqLxGMlSQLotbQGMdX5DF"><code># 正常安装
pip install 'crewai[tools]'

# 如果安装慢，可以使用国内镜像安装
pip install 'crewai[tools]' -i https://mirrors.aliyun.com/pypi/simple/</code></pre>

<p id="t-UJhz0uyx8hkYowS7QYYD3c"><span>国内我们可以采用 DeepSeek 大模型来测试，如果还没有需要先去 </span><span>https://platform.deepseek.com/api_keys</span><span> 创建一个 API key。</span></p>

<p id="t-eemm4xTCXJyZQ9YYEW16SS"><span>DeepSeek 的 API 文档参考：</span><span>https://api-docs.deepseek.com/zh-cn/</span><span>。</span></p>

<p id="t-PDDr34dzkyvEtWiSNlqsoq"><span>安装完成后，创建一个新的 Python 文件，例如 </span><span>my_first_crew.py</span><span>，并导入必要的库。</span></p>

<p id="t-IXeeYJvSVUsP1KZFt8cNGH"><span>CrewAI 的 LLM 对第三方模型（包括 DeepSeek）底层必须通过 LiteLLM，使用前我们需要先安装：</span></p>

<pre id="t-I9KVWt17bnHiHwLsRCgr82"><code>pip install -U litellm</code></pre>


<a id="section-1907"></a>
## 实例

<a id="t-23OsrdffVq1vMpDvkg6Shq"></a>

<pre id="t-lMD2ArVtFMmMYt8x9sZnGe"><code>from crewai import Agent, Task, Crew, Process
from crewai.llm import LLM


# =====================================================
# LLM 配置（DeepSeek｜LiteLLM 规范写法）
# =====================================================
llm = LLM(
    model="deepseek/deepseek-v4-flash", # 关键： 必须包含服务商 deepseek，然后再写模型名 deepseek-v4-flash 或 deepseek-v4-pro
    api_key="sk-xxxxx", # 设置 API key
    api_base="https://api.deepseek.com/v1",
    temperature=0.7,
)

# =====================================================
# Agents
# =====================================================
researcher = Agent(
    role="技术研究员",
    goal="寻找最新、准确、可验证的技术资料，并给出代码证明。",
    backstory="擅长系统性分析技术问题，注重事实和可复现性。",
    llm=llm,
    verbose=True,
    allow_delegation=False,
)

writer = Agent(
    role="技术博客作家",
    goal="将研究成果整理成适合初学者阅读的技术文章。",
    backstory="擅长将复杂概念拆解为清晰步骤，并提供完整示例。",
    llm=llm,
    verbose=True,
    allow_delegation=True,
)

# =====================================================
# Tasks
# =====================================================
research_task = Task(
    description=(
 "深入研究：使用 Python 进行自动化数据清洗。\n"
 "重点包括：pandas、numpy、缺失值、重复值、格式不一致问题。\n"
 "必须提供完整、可运行的代码示例。"
 ),
    agent=researcher,
    expected_output=(
 "一份研究报告，包含问题分类、解决方案代码和完整清洗流程。"
 ),
)

write_task = Task(
    description=(
 "基于研究报告，撰写入门级技术博客。\n"
 "标题：《Python 数据清洗入门：用 pandas 告别脏数据》。"
 ),
    agent=writer,
    context=[research_task],
    expected_output="不少于 800 字的 Markdown 技术博客。",
)

# =====================================================
# Crew
# =====================================================
crew = Crew(
    agents=[researcher, writer],
    tasks=[research_task, write_task],
    process=Process.sequential,
    verbose=True,
)

# =====================================================
# Run
# =====================================================
if __name__ == "__main__":
    result = crew.kickoff()

    output = result.raw

 with open("python_data_cleaning_blog.md", "w", encoding="utf-8") as f:
        f.write(output)</code></pre>

<p id="t-3H8W0o7FoXzwzwdOBi0rdo"><span>接下来，就会开始执行任务，输出相关信息：</span></p>

<div id="t-Cs628NwKsTSRq1l6lEDgOV"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/b52feccb2b0f5ba39057f6f6.png"/></div>

<p id="t-xCa8pnxS0OIOJHDYZV52xZ"><span>完成后就会把输出的内容写入到 python_data_cleaning_blog.md 文件中。</span></p>

<p id="t-1A0WFsIfgUeJgFcTjPrVHP"><span>以下是代码中相关属性的说明。</span></p>


<a id="section-1908"></a>
## LLM（模型层）关键属性

<a id="t-cvcAsRkCX07Dnpj5Vj610o"></a>

<div id="t-oeymlps2JFPKAdNWa3f49p"><table><colgroup><col width="120"/><col width="120"/><col width="136.89752197265625"/><col width="272.005126953125"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>属性</span></p></td><td style=" vertical-align: top"><p><span>示例值</span></p></td><td style=" vertical-align: top"><p><span>作用</span></p></td><td style=" vertical-align: top"><p><span>错误后果</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">model</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">deepseek/deepseek-v4-flash</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">LiteLLM 规范写法</span><span style="border-bottom:1px solid">：</span><span style="border-bottom:1px solid">服务商/模型名</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">少了</span><span style="border-bottom:1px solid">deepseek/</span><span style="border-bottom:1px solid">会直接报</span><span style="border-bottom:1px solid">LLM Provider NOT provided</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">api_key</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">sk-xxxxx</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">模型鉴权</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">为空或错误直接 401 / LLM Failed</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">api_base</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">https://api.deepseek.com/v1</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">DeepSeek API 地址</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">根据具体模型的地址来</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">temperature</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">0.7</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">控制输出随机性</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">过高内容发散，过低文本僵硬</span></p></td></tr></tbody></table></div>


<a id="section-1909"></a>
## Agent（智能体）关键属性

<a id="t-omxqECfIypMQ1J8EETi5om"></a>

<div id="t-ralFWYTmOEu0t8Etis5tzN"><table><colgroup><col width="189.89752197265625"/><col width="211.00335693359375"/><col width="186.008544921875"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>属性</span></p></td><td style=" vertical-align: top"><p><span>作用</span></p></td><td style=" vertical-align: top"><p><span>本质</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">role</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Agent 的"身份标签"</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">写进 system prompt</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">goal</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">当前 Agent 的核心目标</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">决定回答方向</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">backstory</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">行为约束与风格</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">稳定输出质量</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">llm</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">使用哪个模型</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">必须显式绑定</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">verbose</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">打印执行过程</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">仅影响日志</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">allow_delegation</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">是否允许转派任务</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">极易踩坑</span></p></td></tr></tbody></table></div>


<a id="section-1910"></a>
## researcher（研究员）

<a id="t-6ut8ryFAcZgWlKVTNpjku9"></a>

<div id="t-K5AEyBHZ48SlwFqvukF375"><table><colgroup><col width="177.89755249023438"/><col width="177.89755249023438"/><col width="218.1246032714844"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>属性</span></p></td><td style=" vertical-align: top"><p><span>值</span></p></td><td style=" vertical-align: top"><p><span>设计意图</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">allow_delegation</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">False</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">防止无限拆任务</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">goal</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">找资料 + 给代码</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">输出是"原料"</span></p></td></tr></tbody></table></div>


<a id="section-1911"></a>
## writer（写作）

<a id="t-Rh5ak5bbT202Bm7kQpii1T"></a>

<div id="t-oX5FJLAavCKkbZaYCxwa7M"><table><colgroup><col width="188.8975524902344"/><col width="166.91824340820312"/><col width="218.13836669921875"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>属性</span></p></td><td style=" vertical-align: top"><p><span>值</span></p></td><td style=" vertical-align: top"><p><span>风险</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">allow_delegation</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">True</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">可能触发 delegate 再研究</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">context</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">[research_task]</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">已有输入，其实不需要再 delegate</span></p></td></tr></tbody></table></div>

<p id="t-V6wazCURr8oo3i6joAIqef"><span style="border-bottom:1px solid;font-weight:bold">结论</span></p>

<p id="t-xxA07JPPg9NrlETBbmWm3m"><span>顺序流水线中，写作 Agent</span><span style="border-bottom:1px solid;font-weight:bold">应关闭 delegation</span><span>，否则容易二次委托失败。</span></p>


<a id="section-1912"></a>
## Task（任务）关键属性

<a id="t-gCmrz5PkFIIQ8r0Sf0084N"></a>

<p id="t-vopXU3cElZilbXHOh3cFdk"><span style="border-bottom:1px solid;font-weight:bold">Task 通用字段:</span></p>

<div id="t-YKantrKFUYOc1x0pyhx7cw"><table><colgroup><col width="174.89755249023438"/><col width="215.001708984375"/><col width="215.001708984375"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>属性</span></p></td><td style=" vertical-align: top"><p><span>作用</span></p></td><td style=" vertical-align: top"><p><span>关键点</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">description</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">实际发给 LLM 的任务文本</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">越具体越稳</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">agent</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">谁来执行</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">必须唯一</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">expected_output</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">结果约束</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">不强制，但强烈建议</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">context</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">依赖的上游任务</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">顺序执行核心</span></p></td></tr></tbody></table></div>

<p id="t-eMvkU4HVItG2NPAs0RY7i2"><span style="border-bottom:1px solid;font-weight:bold">research_task:</span></p>

<div id="t-VbSTTFZJbBPuRza6tr6bBN"><table><colgroup><col width="210.9027404785156"/><col width="250.005126953125"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>属性</span></p></td><td style=" vertical-align: top"><p><span>说明</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">agent=researcher</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">绑定研究员</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">无</span><span style="border-bottom:1px solid">context</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">第一阶段任务</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">输出</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">结构化研究内容</span></p></td></tr></tbody></table></div>

<p id="t-XLhl1aiUUwAuZsmwzkGL76"><span style="border-bottom:1px solid;font-weight:bold">write_task:</span></p>

<div id="t-p2J0DOadQ0ZiZYCkL3YU4k"><table><colgroup><col width="210.91140747070312"/><col width="227.9947509765625"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>属性</span></p></td><td style=" vertical-align: top"><p><span>说明</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">context=[research_task]</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">强制读取研究结果</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">agent=writer</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">只做整理与表达</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">输出</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">最终 Markdown 文本</span></p></td></tr></tbody></table></div>


<a id="section-1913"></a>
## Crew（执行器）关键属性

<a id="t-d3GimXPXYZNqQglgoG9e7i"></a>

<div id="t-pe7ARfM0cJcM2v4hf9aRyp"><table><colgroup><col width="100.89755249023438"/><col width="186.89752197265625"/><col width="137.117919921875"/><col width="151.005126953125"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>属性</span></p></td><td style=" vertical-align: top"><p><span>示例值</span></p></td><td style=" vertical-align: top"><p><span>作用</span></p></td><td style=" vertical-align: top"><p><span>错误后果</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">agents</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">[researcher, writer]</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">所有可用 Agent</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">少一个直接报错</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">tasks</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">[research_task, write_task]</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">执行队列</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">顺序按列表</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">process</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Process.sequential</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">执行策略</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">并行会打乱依赖</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">verbose</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">True</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">日志开关</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">只能是 bool</span></p></td></tr></tbody></table></div>


<a id="section-1914"></a>
## kickoff() 与输出结构

<a id="t-NNyJdvST0UqzSmLN6Vdokm"></a>

<div id="t-09TinhMS99RbeaD9ValFen"><table><colgroup><col width="211.90621948242188"/><col width="147.00860595703125"/><col width="184.00860595703125"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>表达式</span></p></td><td style=" vertical-align: top"><p><span>类型</span></p></td><td style=" vertical-align: top"><p><span>用途</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">crew.kickoff()</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">CrewOutput</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">执行结果容器</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">result.raw</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">str</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">最终文本输出</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">result.tasks_output</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">list/dict</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">每个 Task 的输出</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">result.token_usage</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">dict</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">统计信息</span></p></td></tr></tbody></table></div>


<a id="section-1915"></a>
## crewai 命令

<a id="t-CRxNeUyDcETszxaGFqrk3r"></a>

<p id="t-AbYpsfNGnTGL98FhvtrhZ2"><span style="border-bottom:1px solid">我们可以使用</span><span style="border-bottom:1px solid;font-weight:bold">crewai</span><span style="border-bottom:1px solid">命令生成完整工程结构：</span></p>

<pre id="t-0OlK7W6OuEr8bOBJF5vF2k"><code>crewai create crew &lt;项目名&gt;</code></pre>

<p id="t-lTcxGcvxgZdAQSXMXq8z1x"><span style="border-bottom:1px solid">例如我们创建一个项目 runoob-agent-test，还行以下命令：</span></p>

<pre id="t-9CaNpR57V7kcZa9cWNiEh6"><code>crewai create crew runoob-agent-test</code></pre>

<p id="t-0bXVTYPv9AL9st4m5tk1mF"><span style="border-bottom:1px solid">接下来出现以下内容，可以先选择大模型的提供商：</span></p>

<pre id="t-d1yizW6DQHZGseRjcqy0C7"><code>Creating folder runoob_agent_test...
Cache expired or not found. Fetching provider data from the web...
Downloading  [####################################]  1102019/56339
Select a provider to set up:
1. openai
2. anthropic
3. gemini
4. nvidia_nim
5. groq
6. huggingface
7. ollama
8. watson
9. bedrock
10. azure
11. cerebras
12. sambanova
13. other
q. Quit</code></pre>

<p id="t-neIZpFjrSOFpCFlcN5CE9u"><span style="border-bottom:1px solid">本章节，我们就选 DeepSeek，先输入 13 选 other，然后可以鼠标滚动看下 DeepSeek 在 23，输入序号 23 即可：</span></p>

<div id="t-L4yLcXiVnZWUVqwCb85lFg"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/d1ec3836e29db5e5b49d0f8e.png"/></div>

<p id="t-pwa85JhJ5MmPWzamMeiJiJ"><span style="border-bottom:1px solid">如果你有其他模型的 API key ，根据序号选择即可。</span></p>

<p id="t-mfthB0OpiZgGX2gHeyRt2f"><span style="border-bottom:1px solid">完成后，可以看到生成的目录如下：</span></p>

<div id="t-NwcSOw0b0Ta0MVQ3FAjuSx"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/3f9322273372aeee50aa3778.png"/></div>

<p id="t-dudPBT8H4YGF0ViAN7PBih"><span style="border-bottom:1px solid">项目结构说明:</span></p>

<pre id="t-fK0maZUpc4qpsza8xOIoFp"><code>my_project/
├── .env                # 环境变量（API Key）
├── pyproject.toml      # 项目依赖声明
├── README.md
└── src/
    └── my_project/
        ├── main.py     # 程序入口
        ├── crew.py     # Crew 与 Agent 的核心逻辑
        ├── tools/      # 自定义工具
        └── config/
            ├── agents.yaml  # Agent 定义
            └── tasks.yaml   # Task 定义</code></pre>


<a id="section-1916"></a>
## 运行你的 Crew

<a id="t-iztHNk95GxzYJ58smZvGQX"></a>

<p id="t-Y8xJoUI1KA5mliDWMQYuZI"><span>进入项目根目录：</span></p>

<pre id="t-cPp0VvxA6XjdXEdzZTEQwp"><code>cd my_project</code></pre>

<p id="t-Il0z9Iobr18fHdnWyzFuip"><span>锁定并安装依赖：</span></p>

<pre id="t-EkdsPXaLCY7QHgmMBdXPPv"><code>crewai install</code></pre>

<p id="t-fhLCRHmEN1AfQ5c1MogqQH"><span>运行：</span></p>

<pre id="t-gj7CopM2A0BhrDiKAIjIl3"><code>crewai run</code></pre>

<p id="t-blR66fL0wOTBOFQcIGifeo"><span>或直接：</span></p>

<pre id="t-Yd2ITeWEKNeHa1nNgDUKhI"><code>python src/my_project/main.py</code></pre>


<a id="section-1917"></a>
## 配置 API 密钥

<a id="t-7rvWze18kruLgJoAwhwhMK"></a>

<p id="t-mAZDIKRuLxltPTat7hC2qy"><span>为了安全起见，不建议将 API Key 直接写在代码里，我们可以将其设置为环境变量。</span></p>

<p id="t-1gg9Y80sXgsTEj6c8W0xD6"><span style="font-weight:bold">在代码中设置（仅用于测试）</span><span>：</span></p>

<pre id="t-ACdcOy0XFrGxtfn3BbanQr"><code>import os
os.environ["OPENAI_API_KEY"] = "你的-openai-api-key-here"</code></pre>

<p id="t-wdOic73gEymh1QV9A6NlPU"><span style="font-weight:bold">推荐方式：使用 </span><span style="font-weight:bold">.env</span><span style="font-weight:bold"> 文件</span></p>

<p id="t-zbuHXKKjCzJNEjoK5eKB9f"><span>在项目根目录创建一个名为 </span><span>.env</span><span> 的文件。</span></p>

<p id="t-bZs9ZTL8CdVSWQ6hqLU9wn"><span>在文件中写入：</span><span>OPENAI_API_KEY=你的-openai-api-key-here</span></p>

<p id="t-X7CVSep0VWg02ZSvhY9Yip"><span>在 Python 代码中，使用 </span><span>python-dotenv</span><span> 包来加载。</span></p>

<p id="t-MRfGObkMTNxvGWLghxpG5A"><span>安装命令：</span></p>

<pre id="t-69is2USUSA6nPAd4e8U8VU"><code>pip install python-dotenv</code></pre>

<p id="t-FIjj5oMP3XEAajAnVVX9cE"><span>接下来在代码中载入：</span></p>

<pre id="t-LiWwpVgLj7rGn35Ah4vbTU"><code>from dotenv import load_dotenv
load_dotenv() # 这会自动加载 .env 文件中的变量
# 现在 os.environ["OPENAI_API_KEY"] 就已经有了值</code></pre>


<a id="section-1918"></a>
## 核心组件详解与实战

<a id="t-HiPTeww4INl9a6Sqnn4reo"></a>

<p id="t-EdKZYcaJhhgqDUqgDLb6vC"><span>现在，让我们像组建公司一样，一步步创建我们的 AI 团队，我们将模拟一个技术博客创作团队。</span></p>


<a id="section-1919"></a>
## 第一步：定义智能体 (Agent)

<a id="t-iaytd7JA7Mg1aVHeI8beNN"></a>

<p id="t-qPkX3wHKkvYkPcvohNXeO1"><span>Agent</span><span> 是你的团队成员。创建时需要定义几个关键属性：</span></p>

<div id="t-N5hFf3IGPmys0hiPbLWwa6"><table><colgroup><col width="120"/><col width="227.9044189453125"/><col width="293.00335693359375"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>参数</span></p></td><td style=" vertical-align: top"><p><span>说明</span></p></td><td style=" vertical-align: top"><p><span>示例</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">role</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">代理的角色或职位。</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">资深技术作家</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">goal</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">代理的最终目标。</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">创作深入浅出、实用的技术教程</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">backstory</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">角色的背景故事，用于塑造其行为和语气。</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">你是一位拥有10年全栈开发经验的开发者，热爱分享，擅长将复杂概念简单化。</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">llm</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">指定代理使用的大语言模型。</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">ChatOpenAI(model="gpt-4", temperature=0.7)</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">verbose</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">设置为</span><span style="border-bottom:1px solid">True</span><span style="border-bottom:1px solid">时，会输出代理的详细思考过程。</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">True</span><span style="border-bottom:1px solid">(调试时很有用)</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">allow_delegation</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">是否允许此代理将任务委托给其他代理。</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">True</span></p></td></tr></tbody></table></div>

<p id="t-mVpWDwqYPAFHBXWgZoAv2L"><span style="border-bottom:1px solid">让我们创建两个代理：一个</span><span style="border-bottom:1px solid;font-weight:bold">研究员</span><span style="border-bottom:1px solid">和一个</span><span style="border-bottom:1px solid;font-weight:bold">作家</span><span style="border-bottom:1px solid">。</span></p>


<a id="section-1920"></a>
## 实例

<a id="t-qqSKM64AaC2GUzbLCR90MT"></a>

<pre id="t-sIGGLlbmNHzzEWm9slUtXD"><code># 首先，定义一个共享的 LLM，这样所有代理可以使用相同的模型配置
llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0.7)

# 创建研究员代理
researcher = Agent(
    role='技术研究员',
    goal='为你分配的主题，寻找最新、最准确、最相关的技术信息。',
    backstory='你是一位专注且严谨的技术分析师，擅长从海量信息中筛选出关键点，并验证其来源的可靠性。',
    llm=llm, # 使用上面定义的模型
    verbose=True, # 输出详细日志
    allow_delegation=False # 研究员不需要委托任务
)

# 创建作家代理
writer = Agent(
    role='技术博客作家',
    goal='根据研究员提供的资料，撰写结构清晰、生动有趣、代码示例完整的技术博客文章。',
    backstory='你是一位广受欢迎的技术博主，文风亲切，逻辑严谨，尤其擅长通过比喻和实例来解释复杂概念。',
    llm=llm,
    verbose=True,
    allow_delegation=True # 作家如果觉得需要，可以委托任务（比如回去让研究员补充资料）
)</code></pre>


<a id="section-1921"></a>
## 第二步：创建任务 (Task)

<a id="t-4Ye6S5RUDlSpewb3y6yo0n"></a>

<p id="t-QnZJQQCJVzQzTJ2ALXUF6W"><span style="border-bottom:1px solid">Task</span><span style="border-bottom:1px solid">是具体的工作项，需要分配给</span><span style="border-bottom:1px solid">Agent</span><span style="border-bottom:1px solid">去完成。关键属性包括：</span></p>

<div id="t-fSHQdLvA7Tc5euzHzNZsXU"><table><colgroup><col width="120"/><col width="178.89752197265625"/><col width="321.00860595703125"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>参数</span></p></td><td style=" vertical-align: top"><p><span>说明</span></p></td><td style=" vertical-align: top"><p><span>示例</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">description</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">对任务的清晰描述。</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">研究 "Python异步编程asyncio" 在 2023 年后的核心应用场景和最佳实践。</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">agent</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">负责执行此任务的</span><span style="border-bottom:1px solid">Agent</span><span style="border-bottom:1px solid">对象。</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">researcher</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">expected_output</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">对任务产出物的详细描述。</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">一份结构化的研究报告，包含概述、3-4个核心应用场景、2-3个代码片段示例以及总结。</span></p></td></tr></tbody></table></div>

<p id="t-qm8qYDJHkjtlbxqR7zzUpL"><span style="border-bottom:1px solid">我们为研究员和作家各创建一个任务。</span></p>


<a id="section-1922"></a>
## 实例

<a id="t-sepiWYDDqlfHdoISMxaCG9"></a>

<pre id="t-eGaDeyp2emPuHoszi8g6u2"><code># 创建研究任务
research_task = Task(
    description=(
 "对 '使用 Python 进行自动化数据清洗' 这个主题进行深入研究。\n"
 "重点关注 pandas 和 numpy 库的最新用法（2023年后），常见的脏数据问题（如缺失值、重复值、格式不一致），以及高效的清洗流程。\n"
 "请提供具体的代码片段来说明每个步骤。"
 ),
    agent=researcher, # 这个任务交给研究员
    expected_output=(
 "一份完整的研究报告，格式如下：\n"
 "1. 主题概述\n"
 "2. 常见数据问题分类（至少3类）\n"
 "3. 针对每类问题的 pandas/numpy 解决方案（附代码片段）\n"
 "4. 一个完整的端到端清洗流程示例\n"
 "5. 总结与建议"
 )
)

# 创建写作任务
write_task = Task(
    description=(
 "利用研究员提供的研究报告，撰写一篇面向初学者的技术博客文章。\n"
 "文章标题为：'Python 数据清洗入门：用 pandas 告别脏数据'。\n"
 "文章要求：语言通俗易懂，逻辑层层递进，包含研究员提供的所有关键代码片段并添加详细注释。\n"
 "最后，提供一个完整的、可运行的示例，演示清洗一个模拟数据集的全过程。"
 ),
    agent=writer, # 这个任务交给作家
    expected_output=(
 "一篇不少于800字的 Markdown 格式博客文章。\n"
 "包含引言、正文（分小节）、代码块、总结。\n"
 "文末必须附上一个完整的、包含模拟数据和清洗代码的 Python 脚本。"
 ),
 # context 参数非常重要！它指定了此任务的依赖，即需要先完成 research_task
    context=[research_task]
)</code></pre>

<p id="t-zSTHM6oWkMST2PlAoBRWZA"><span style="border-bottom:1px solid;font-weight:bold">注意</span><span style="border-bottom:1px solid">write_task</span><span style="border-bottom:1px solid">中的</span><span style="border-bottom:1px solid">context=[research_task]</span><span style="border-bottom:1px solid">，这建立了任务间的依赖关系，意味着作家需要等研究员完成任务后才能开始工作。</span></p>


<a id="section-1923"></a>
## 第三步：组建团队与设置流程 (Crew &amp; Process)

<a id="t-PZtYQqIMCYlGkqgPmkPHHA"></a>

<p id="t-ODdhV6ZDriSfsee96bA4dq"><span style="border-bottom:1px solid">现在，将</span><span style="border-bottom:1px solid">Agent</span><span style="border-bottom:1px solid">和</span><span style="border-bottom:1px solid">Task</span><span style="border-bottom:1px solid">组装成</span><span style="border-bottom:1px solid">Crew</span><span style="border-bottom:1px solid">，并定义他们的工作</span><span style="border-bottom:1px solid">Process</span><span style="border-bottom:1px solid">。</span></p>


<a id="section-1924"></a>
## 实例

<a id="t-ubMbHfUhbNRCYAZFvipJkq"></a>

<pre id="t-7ZZIr65ZlQxiH24shsaBhD"><code># 组建团队
blog_crew = Crew(
    agents=[researcher, writer], # 团队由哪些成员构成
    tasks=[research_task, write_task], # 团队有哪些任务
    process=Process.sequential, # 流程类型：顺序执行。研究员做完，作家再做。
    verbose=2 # 设置团队执行时的日志详细程度 (0=安静, 1=基础, 2=详细)
)</code></pre>

<p id="t-cuXJrQOOqA6VwqoOWqWhpB"><span style="border-bottom:1px solid">crewAI 主要支持两种流程：</span></p>

<ul><li id="t-gKVelGlQ7hiomUPuXnS77X"><span style="border-bottom:1px solid;font-weight:bold">Process.sequential</span><span>： 任务按在列表中的顺序依次执行。适合有严格依赖关系的流水线作业。</span></li></ul>

<ul><li id="t-IOnO82UfWOYBsDRqOxAy1U"><span style="border-bottom:1px solid;font-weight:bold">Process.hierarchical</span><span>： 配合一个管理者（Manager）Agent，由它来协调和分配任务。适合更复杂、动态的协作场景。</span></li></ul>


<a id="section-1925"></a>
## 第四步：执行任务并获取结果

<a id="t-1YPzwF0DNEER0CSUlwJege"></a>

<p id="t-JH2b3JtzOMEmhSe7PYfx4E"><span style="border-bottom:1px solid">一切就绪，启动你的 AI 团队！</span></p>


<a id="section-1926"></a>
## 实例

<a id="t-rZq4tlto9MfWR1nvic9xLh"></a>

<pre id="t-ZFP46UfB7iiSyhrwh9pZ8f"><code># 执行团队任务
result = blog_crew.kickoff()

# 打印最终结果
print("###################### 最终成果 ######################")
print(result)</code></pre>

<p id="t-euNez0aOTSX79MnWFhNL0V"><span style="border-bottom:1px solid">运行你的 Python 脚本 (</span><span style="border-bottom:1px solid">python my_first_crew.py</span><span style="border-bottom:1px solid">)。由于我们设置了 </span><span style="border-bottom:1px solid">verbose=True</span><span style="border-bottom:1px solid"> 和 </span><span style="border-bottom:1px solid">verbose=2</span><span style="border-bottom:1px solid">，你将在终端看到每个 Agent 的思考过程和任务执行日志，最后看到生成的博客文章。</span></p>


<a id="section-1927"></a>
## 进阶技巧：为 Agent 配备工具 (Tools)

<a id="t-3n9HSVEG86dxZ7HM2KKVMO"></a>

<p id="t-YMFx2kiCISk7WmgLISbdIt"><span style="border-bottom:1px solid">crewAI 可以让</span><span style="border-bottom:1px solid">Agent</span><span style="border-bottom:1px solid">调用外部</span><span style="border-bottom:1px solid">Tool</span><span style="border-bottom:1px solid">，如搜索网络、查询数据库、执行计算等。</span></p>

<p id="t-Lm24HyM1ENNk3AfcPt2Ctp"><span style="border-bottom:1px solid">以下示例为研究员配备</span><span style="border-bottom:1px solid;font-weight:bold">网络搜索</span><span style="border-bottom:1px solid">和</span><span style="border-bottom:1px solid;font-weight:bold">计算</span><span style="border-bottom:1px solid">工具：</span></p>


<a id="section-1928"></a>
## 实例

<a id="t-bQ02xUKRWCyZ3g745DHb69"></a>

<pre id="t-kjNu1qORmK8RqWIbgdqCy7"><code>from crewai_tools import SerperDevTool, CalculatorTool

# 初始化工具
# 注意：SerperDevTool 需要单独的 API Key，请在 https://serper.dev/ 注册获取
search_tool = SerperDevTool(serper_api_key="你的-serper-api-key")
calc_tool = CalculatorTool()

# 创建配备工具的研究员
advanced_researcher = Agent(
    role='高级技术研究员',
    goal='搜索最新的技术动态并进行量化分析',
    backstory='你不仅善于查找信息，还能对数据进行简单的计算和对比。',
    tools=[search_tool, calc_tool], # 将工具列表赋予代理
    llm=llm,
    verbose=True
)

# 创建一个使用工具的任务
analysis_task = Task(
    description=(
 "搜索并比较 'FastAPI' 和 'Django' 在 GitHub 上过去一年的 Star 增长数量。\n"
 "计算两者的增长率，并分析可能的原因。"
 ),
    agent=advanced_researcher,
    expected_output="包含具体数据、计算过程和原因分析的简短报告。"
)</code></pre>


<a id="section-2015"></a>
## Deep Agents 入门教程

<a id="t-block-24297"></a>

<p id="t-M03JusKpNvGlg50AzqxkaM"><span style="border-bottom:1px solid">Deep Agents 是 LangChain 官方推出的一套开箱即用（Batteries Included）的 Agent 开发框架，专门面向复杂任务、长流程执行、多步骤规划以及多 Agent 协作场景而设计。</span></p>

<p id="t-HanXNNwVkOxJmI0sRmZZ52"><span style="border-bottom:1px solid">相比传统 Agent 需要开发者自行组合 Prompt、Tool、Memory、Workflow 等组件，Deep Agents 已经内置了任务规划、文件系统、子 Agent 调度、上下文压缩、记忆管理等核心能力，让开发者能够将更多精力放在业务逻辑上，而不是底层架构搭建。</span></p>

<p id="t-s6RR3sI81Ap2cKWtMshV4D"><span style="border-bottom:1px solid">本教程面向零基础开发者，带你从安装配置开始，逐步了解 Deep Agents 的核心工作机制，并使用 DeepSeek API 构建一个真实可运行的 AI Agent 项目。</span></p>


<a id="section-2016"></a>
## 什么是 Deep Agents

<a id="t-hemddca0JkKvWQHFRzJ1Hw"></a>

<p id="t-zSVzeMo7xnMaEglqML60Px"><span style="border-bottom:1px solid">Deep Agents 可以理解为一个面向生产环境的高级 Agent 框架（Agent Harness）。</span></p>

<p id="t-Q5DooLijYWK85FE23O34u0"><span style="border-bottom:1px solid">官方将其定义为：一个具备完整基础设施的 Agent 运行框架，而不仅仅是一个简单的 LLM + Tool 调用循环。</span></p>

<p id="t-JpVKac2wxoR0bKP2LAalBN"><span style="border-bottom:1px solid">安装完成后，即可直接获得以下能力，无需额外开发：</span></p>

<ul><li id="t-ukZlBqX0TqvYCo2EOEwKB2"><span>自动任务规划（Planning）</span></li></ul>

<ul><li id="t-hCcn1spHqjouUI8MCnPvaO"><span>文件系统读写（Filesystem）</span></li></ul>

<ul><li id="t-30jrjp9rxDyHIe0sahMx3h"><span>子 Agent 协作（Sub Agents）</span></li></ul>

<ul><li id="t-eDNrCwKktKEF63h1YwBtNS"><span>上下文压缩与管理（Context Management）</span></li></ul>

<ul><li id="t-V1MPxFgua5KPVRLp9lCyYz"><span>长任务执行（Long Running Tasks）</span></li></ul>

<ul><li id="t-go6LxBAkE7ioiZkzulAkQf"><span>人工审批（Human-in-the-Loop）</span></li></ul>

<ul><li id="t-sH06PEoSeCBVvFTv4xtfJf"><span>持久化记忆（Memory）</span></li></ul>

<ul><li id="t-eDRxmI8qbyEA9Q0XiTECiU"><span>流式输出（Streaming）</span></li></ul>


<a id="section-2017"></a>
## Deep Agents 的设计目标

<a id="t-r2TwclUqb3HbY6kX9vhoie"></a>

<p id="t-6LoRt0qwmTRPKd9DiXfB5q"><span style="border-bottom:1px solid">传统 Agent 通常采用 ReAct 模式：用户输入 → LLM 推理 → 调用工具 → LLM 推理 → 调用工具 → 输出结果。</span></p>

<p id="t-TJIA0787TNJoa3FEcYwk2Z"><span style="border-bottom:1px solid">当任务规模较小时，这种模式运行良好。但随着任务复杂度提升（例如自动生成市场调研报告、分析多家公司财报、编写完整项目代码），就会逐渐暴露出以下问题：</span></p>

<ul><li id="t-96yAiID9eb9IojicU9FufA"><span>上下文窗口迅速膨胀，超出模型限制</span></li></ul>

<ul><li id="t-WiyJmVaghUjFOerAXFxgwT"><span>推理链过长导致性能下降</span></li></ul>

<ul><li id="t-1icQZrYfTXkgxZtEvbpFx0"><span>Agent 容易遗忘之前完成的工作</span></li></ul>

<ul><li id="t-yBx4AmqmIdon8AYSZpM25t"><span>多任务之间缺乏隔离，相互干扰</span></li></ul>

<ul><li id="t-ZoaZd9BsU9X55dTUA9fA90"><span>Tool 调用逻辑越来越复杂，难以维护</span></li></ul>

<p id="t-d3ZxLx0XAUNONupJPpXjI0"><span style="border-bottom:1px solid">Deep Agents 的核心目标，就是解决这些复杂任务场景下的工程化问题。</span></p>


<a id="section-2018"></a>
## 与 LangChain、LangGraph 的关系

<a id="t-FxaNvKW3axjDGdfzA4Gd6J"></a>

<p id="t-8ZF8nlFmHU2OUuEuyO998s"><span style="border-bottom:1px solid">很多初学者容易混淆这三个项目的定位，它们实际上处于不同的抽象层级。</span></p>

<div id="t-ByEnVLEiMZCzsxjKQaXwiF"><table><colgroup><col width="102.8992919921875"/><col width="90.01385498046875"/><col width="254"/><col width="165.00689697265625"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>框架</span></p></td><td style=" vertical-align: top"><p><span>层级定位</span></p></td><td style=" vertical-align: top"><p><span>核心职责</span></p></td><td style=" vertical-align: top"><p><span>适用场景</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">LangChain</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">基础组件层</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">提供 Model、Prompt、Tool、Retriever、Output Parser 等 AI 基础组件</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">构建单个 Agent 或 AI 应用的基础能力</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">LangGraph</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">运行时层</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">提供状态管理、工作流编排、节点与边、Checkpoint 持久化能力</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">需要自定义图结构和执行流程的复杂场景</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;background-color:#eafaf1">Deep Agents</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">应用框架层</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">在 LangGraph 之上封装规划、文件系统、子 Agent、记忆、上下文压缩等生产级能力</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">快速构建复杂多步骤 Agent，无需从头设计架构</span></p></td></tr></tbody></table></div>

<div id="t-eJGpE3ziUVRKaxbJ0bifIW"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/307c09bff542d5a93c9f1b64.webp"/></div>

<blockquote id="t-rI6SOYsLOXAUo6DRsyxmtC"><p id="t-bW6jbwaEBKHToVHodCYsXv"><span style="border-bottom:1px solid;font-style:italic">三者并非相互替代，而是可以协同使用：LangChain 提供积木，LangGraph 是组织积木的工程框架，Deep Agents 是在此之上开箱即用的高级应用层。任何一个 LangGraph</span><span style="border-bottom:1px solid;font-style:italic">CompiledStateGraph</span><span style="border-bottom:1px solid;font-style:italic">都可以作为 subagent 传入 Deep Agents，三层可以灵活混用。</span></p></blockquote>


<a id="section-2019"></a>
## 核心能力一览

<a id="t-vT3gYwcfWwVXPi3Cx0jfKV"></a>

<p id="t-AZAjZwaQLmnLngXl32U6ml"><span style="border-bottom:1px solid">Deep Agents 内置以下中间件，无需额外配置即可使用：</span></p>

<div id="t-EJHh0BmeuGvaRXd8BhulxL"><table><colgroup><col width="120"/><col width="291.9010009765625"/><col width="236.01556396484375"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>能力</span></p></td><td style=" vertical-align: top"><p><span>说明</span></p></td><td style=" vertical-align: top"><p><span>核心组件</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">任务规划</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">用内置</span><span style="border-bottom:1px solid">write_todos</span><span style="border-bottom:1px solid">工具将复杂任务分解为有序步骤</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">TodoListMiddleware</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">虚拟文件系统</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">读写文件、将大型工具输出卸载到磁盘，节省上下文窗口</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">FilesystemMiddleware</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">子 Agent</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">将子任务委派给独立上下文窗口的专用子 Agent</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">SubAgentMiddleware</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">上下文压缩</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">自动总结历史消息，避免超出模型上下文限制</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">SummarizationMiddleware</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Human-in-the-loop</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">在关键工具调用前暂停，等待人工审批</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">HumanInTheLoopMiddleware</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">长期记忆</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">跨会话持久化记忆，基于 LangGraph Store</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">MemoryMiddleware</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Skills</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">按需加载可复用的领域知识与指令集</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">SkillsMiddleware</span></p></td></tr></tbody></table></div>


<a id="section-2020"></a>
## 安装

<a id="t-PGn8UVCSrWt84pzvUSAiaJ"></a>

<p id="t-VnMVVMjuqV2SPq4cEqwCBn"><span style="border-bottom:1px solid">Deep Agents 发布在 PyPI，包名为</span><span style="border-bottom:1px solid;font-weight:bold">deepagents</span><span style="border-bottom:1px solid">。</span></p>

<p id="t-deZp4BLstIp9fmx0fVomlN"><span style="border-bottom:1px solid">推荐使用</span><span style="border-bottom:1px solid">uv</span><span style="border-bottom:1px solid">安装，速度更快；也可以使用传统的</span><span style="border-bottom:1px solid">pip</span><span style="border-bottom:1px solid">。</span></p>


<a id="section-2021"></a>
## 使用 uv 安装（推荐）

<a id="t-56cZr5gcbKwMZaAME135MX"></a>

<pre id="t-SNwWymfDHxfjpWaLLXj0RZ"><code>uv init
uv add deepagents tavily-python
uv sync</code></pre>


<a id="section-2022"></a>
## 使用 pip 安装

<a id="t-VTQWY0oPdjpIIHhMpkYgcm"></a>

<pre id="t-EZ6D9F8d3XxlHd0m8aY82M"><code>pip install deepagents tavily-python</code></pre>


<a id="section-2023"></a>
## 搭配 DeepSeek API 安装

<a id="t-Ab5L098oszwfzFRDNdh7fu"></a>

<p id="t-q9JUbmVkgjqclKCaX53LJF"><span style="border-bottom:1px solid">DeepSeek 兼容 OpenAI 接口，因此需要同时安装</span><span style="border-bottom:1px solid">langchain-openai</span><span style="border-bottom:1px solid">。</span></p>

<pre id="t-6MXpLmQiv8Y3gIgTOHcB5o"><code>pip install deepagents langchain-openai</code></pre>

<blockquote id="t-TsSRiL39FqcfFgjxFuxlRo"><p id="t-4dW0AZlPvsuge2mv3F5aVJ"><span style="border-bottom:1px solid;font-style:italic">Deep Agents 对模型的唯一要求是：该模型支持</span><span style="border-bottom:1px solid;font-style:italic;font-weight:bold">tool calling（工具调用）</span><span style="border-bottom:1px solid;font-style:italic">。DeepSeek V3 和 DeepSeek R1 系列均支持，可放心使用。</span></p></blockquote>


<a id="section-2024"></a>
## 配置说明

<a id="t-H2fSRH3Ku6s5lfZA9dtcmE"></a>

<p id="t-1eA7WSODrZiLjmcRzqewbj"><span style="border-bottom:1px solid">create_deep_agent</span><span style="border-bottom:1px solid">是创建 Agent 的核心函数，支持以下参数配置。</span></p>

<div id="t-solK0S1MCkYFArHGDcBgV7"><table><colgroup><col width="85.8992919921875"/><col width="152.0120849609375"/><col width="57.00164794921875"/><col width="250.005126953125"/><col width="120"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>参数</span></p></td><td style=" vertical-align: top"><p><span>类型</span></p></td><td style=" vertical-align: top"><p><span>是否必填</span></p></td><td style=" vertical-align: top"><p><span>说明</span></p></td><td style=" vertical-align: top"><p><span>默认值</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">model</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">str 或模型实例</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">否</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">模型字符串，格式为</span><span style="border-bottom:1px solid">provider:model-name</span><span style="border-bottom:1px solid">，或直接传入初始化好的模型对象</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">anthropic:claude-sonnet-4-6</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">tools</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">列表</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">否</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">自定义工具函数或 LangChain Tool 对象的列表</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">None</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">system_prompt</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">str 或 SystemMessage</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">否</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">自定义系统提示词，用于定义 Agent 角色和行为</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">None</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">backend</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">BackendProtocol</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">否</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">虚拟文件系统后端，决定文件存储位置</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">StateBackend</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">subagents</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">列表</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">否</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">子 Agent 定义列表，用于任务委派</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">None</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">memory</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">列表</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">否</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">启动时加载的 AGENTS.md 文件路径列表</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">None</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">skills</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">列表</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">否</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">按需加载的 Skills 目录路径列表</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">None</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">permissions</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">列表</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">否</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">文件系统路径级别的访问权限控制规则</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">None</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">interrupt_on</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">dict</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">否</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">指定哪些工具调用需要人工审批，需配合 checkpointer 使用</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">None</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">checkpointer</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Checkpointer</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">否</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">状态持久化检查点，多轮对话或 HITL 时必须设置</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">None</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">store</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">BaseStore</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">否</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">跨会话的长期存储后端</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">None</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">response_format</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">ResponseFormat</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">否</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">结构化输出的 Schema 定义</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">None</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">middleware</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">列表</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">否</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">追加到默认中间件栈末尾的自定义中间件</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">()</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">debug</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">bool</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">否</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">开启调试模式，输出详细日志</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">False</span></p></td></tr></tbody></table></div>


<a id="section-2025"></a>
## 文件系统后端对比

<a id="t-uHpE9w19YJ5vCUZXg3AdYI"></a>

<p id="t-i0WzQxa9LMIfQWgihu8UVc"><span style="border-bottom:1px solid">Deep Agents 提供多种后端，用来控制 Agent 如何读写文件。</span></p>

<div id="t-gkYr4aVPm96EDjl0mB7GDh"><table><colgroup><col width="129.8992919921875"/><col width="120"/><col width="132.00341796875"/><col width="250.00341796875"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>后端</span></p></td><td style=" vertical-align: top"><p><span>存储位置</span></p></td><td style=" vertical-align: top"><p><span>跨会话持久化</span></p></td><td style=" vertical-align: top"><p><span>适用场景</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">StateBackend</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">LangGraph 图状态内</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">否（同线程内有效）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">默认，本地开发和简单场景</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">FilesystemBackend</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">本机磁盘</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">是</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">需要真实读写本地文件，需谨慎使用</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;background-color:#eafaf1">StoreBackend</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">LangGraph Store</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">是</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">多轮对话持久化、跨 Thread 共享</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">LocalShellBackend</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">本机磁盘 + Shell</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">是</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">需要执行 Shell 命令，仅限受信任环境</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">CompositeBackend</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">路由到多个后端</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">取决于子后端</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">精细控制不同目录的存储策略</span></p></td></tr></tbody></table></div>

<blockquote id="t-73WVgEG8IA2UJObri9IaQG"><p id="t-NaXNzjFekgxIbt6jPSCmr3"><span style="border-bottom:1px solid;font-style:italic">初学者直接使用默认的</span><span style="border-bottom:1px solid;font-style:italic;font-weight:bold">StateBackend</span><span style="border-bottom:1px solid;font-style:italic">即可。</span><span style="border-bottom:1px solid;font-style:italic;font-weight:bold">FilesystemBackend</span><span style="border-bottom:1px solid;font-style:italic">和</span><span style="border-bottom:1px solid;font-style:italic;font-weight:bold">LocalShellBackend</span><span style="border-bottom:1px solid;font-style:italic">会让 Agent 直接操作你的本地文件系统，需要严格配置权限后再使用。</span></p></blockquote>


<a id="section-2026"></a>
## 快速开始

<a id="t-FXpZRfKMB8lLZZaHeLUQXD"></a>

<p id="t-CZJpWzTkfuTJqEO2i8YRna"><span style="border-bottom:1px solid">本节演示如何用最少的代码创建一个可以运行的 Deep Agent。</span></p>


<a id="section-2027"></a>
## 配置 DeepSeek API Key

<a id="t-QUuodMhpH90rqKg744XLk1"></a>

<p id="t-Ec086SEoqnOzMmhRfabxf8"><span style="border-bottom:1px solid">DeepSeek 兼容 OpenAI 的接口格式，需要同时设置 API Key 和 Base URL。</span></p>

<pre id="t-D85lom5cyjvM1qSvTVYsSJ"><code>export OPENAI_API_KEY="sk-your-deepseek-api-key"
export OPENAI_BASE_URL="https://api.deepseek.com"
export TAVILY_API_KEY="your-tavily-api-key"</code></pre>

<blockquote id="t-4fA3NT5FXVKS8JefYBZQDB"><p id="t-ZxlfyZ7yXf4IJVUSQjWWT7"><span style="border-bottom:1px solid;font-style:italic">DeepSeek 的 API Key 可在</span><span style="border-bottom:1px solid;font-style:italic;font-weight:bold">platform.deepseek.com</span><span style="border-bottom:1px solid;font-style:italic">申请。将环境变量</span><span style="border-bottom:1px solid;font-style:italic">OPENAI_BASE_URL</span><span style="border-bottom:1px solid;font-style:italic">指向 DeepSeek 的地址，LangChain 会自动将请求转发过去。</span><span style="border-bottom:1px solid;font-style:italic">TAVILY_API_KEY 需要到 Tavily 官方网站</span><span style="border-bottom:1px solid;font-style:italic">https://www.tavily.com/</span><span style="border-bottom:1px solid;font-style:italic">申请，生成的 tvly-xxxxxxxx 格式密钥。</span></p></blockquote>


<a id="section-2028"></a>
## 最简示例：Hello World Agent

<a id="t-A2bhgysBQUeNz9ca41dbfP"></a>

<p id="t-4ml500hpqKQR71K6jiRSGk"><span style="border-bottom:1px solid">创建一个带自定义工具的 Agent，向 DeepSeek 发送第一条消息。</span></p>


<a id="section-2029"></a>
## 实例

<a id="t-6TTzcOZ1Ff8LVRf2s94NHu"></a>

<pre id="t-YYqDyGsQGCgOe0DzZg9NtQ"><code># 文件路径：hello_agent.py

import os
from deepagents import create_deep_agent
from langchain_openai import ChatOpenAI

# 使用 ChatOpenAI 并将 base_url 指向 DeepSeek，这是最直接的接入方式
model = ChatOpenAI(
    model="deepseek-v4-flash", # 必填：模型名称
    api_key=os.environ["OPENAI_API_KEY"], # 必填：DeepSeek API Key
    base_url="https://api.deepseek.com", # 必填：DeepSeek 的 OpenAI 兼容端点
)

# 定义一个简单的自定义工具，函数的 docstring 就是工具描述
def get_weather(city: str) -&gt; str:
 """查询指定城市的天气。"""
 # 实际项目中这里会调用真实天气 API
 return f"{city} 今天晴天，气温 25°C，适合出行。"

# 创建 Agent，传入模型实例和工具列表
agent = create_deep_agent(
    model=model,
    tools=[get_weather],
    system_prompt="你是一个友好的助手，能够查询天气信息。",
)

# 调用 Agent，messages 接受 OpenAI 风格的消息格式
result = agent.invoke({
 "messages": [{"role": "user", "content": "北京今天天气怎么样？"}]
})

# 打印 Agent 的最终回复
print(result["messages"][-1].content)</code></pre>

<pre id="t-4Kx91aWRJPiiRn7F8fVhL3"><code># 运行脚本
python hello_agent.py</code></pre>

<p id="t-FbTo3juQiqnhJh0uNXmooJ"><span style="border-bottom:1px solid;font-weight:bold">输出内容：</span></p>

<p id="t-Y55m0mT2Jk3XReFcA9NIxZ"><span style="border-bottom:1px solid;font-weight:bold">北京今天**晴天**，气温 **25°C**，非常适合出行。☀️</span></p>

<blockquote id="t-XHsnzonMnonRSDRBjtobno"><p id="t-FmqsB43lWDZoKvTLYqF8IC"><span style="border-bottom:1px solid;font-style:italic">注意：Agent 返回的是完整的消息列表（</span><span style="border-bottom:1px solid;font-style:italic">messages</span><span style="border-bottom:1px solid;font-style:italic">），最终回复位于列表末尾，即</span><span style="border-bottom:1px solid;font-style:italic">result["messages"][-1].content</span><span style="border-bottom:1px solid;font-style:italic">。</span></p></blockquote>


<a id="section-2030"></a>
## 详细用法

<a id="t-FcWQGEW5U8VqNfN4Tbb4ii"></a>

<p id="t-oKypAsU7jnAvSEngURLqh3"><span style="border-bottom:1px solid">本节通过几个真实场景，逐步展示 Deep Agents 的核心能力。</span></p>


<a id="section-2031"></a>
## 使用 DeepSeek R1 进行推理任务

<a id="t-LvIFyrTJzmGnwgD2GuTM1Q"></a>

<p id="t-KeZTIIEhommxNrh88IaEib"><span style="border-bottom:1px solid">DeepSeek R1 是推理增强模型，适合需要复杂分析的任务。</span></p>


<a id="section-2032"></a>
## 实例

<a id="t-gFKXklUsNB0EiGP6TfiVmo"></a>

<pre id="t-o5YhgKb7cV2lDKdVKiRNTC"><code># 文件路径：reasoning_agent.py

import os
from deepagents import create_deep_agent
from langchain_openai import ChatOpenAI

# DeepSeek R1：专为复杂推理设计的模型
model = ChatOpenAI(
    model="deepseek-v4-pro", # DeepSeek 思考模型
    api_key=os.environ["OPENAI_API_KEY"],
    base_url="https://api.deepseek.com",
)

# 数学计算工具示例
def calculate(expression: str) -&gt; str:
 """对数学表达式进行安全求值，返回计算结果。"""
 try:
 # 注意：生产环境中应使用更安全的表达式求值库
        result = eval(expression, {"__builtins__": {}}, {})
 return f"计算结果：{expression} = {result}"
 except Exception as e:
 return f"计算出错：{str(e)}"

agent = create_deep_agent(
    model=model,
    tools=[calculate],
    system_prompt="你是一位数学分析专家，善于分解复杂问题并逐步求解。",
)

result = agent.invoke({
 "messages": [{"role": "user", "content": "计算 1 到 100 的所有奇数之和，并验证结果。"}]
})

print(result["messages"][-1].content)</code></pre>

<p id="t-L9kollpZPwMFxj9cAhkoUW"><span style="border-bottom:1px solid">执行输出：</span></p>

<pre id="t-1Y0SZKwMGL2Mqm9hs5OcEo"><code>再换一种方法做交叉验证：

- 1 到 100 所有整数之和：\( \frac{100 \times 101}{2} = 5050 \)
- 1 到 100 的偶数之和：\( 2 + 4 + \cdots + 100 = 2 \times \frac{50 \times 51}{2} = 2550 \)
- 奇数之和：\( 5050 - 2550 = 2500 \)

两种方法结果一致。

---

**结论**：1 到 100 的所有奇数之和为 **2500**。

**推导回顾**：
- 奇数序列首项 1，末项 99，项数 \( \frac{99-1}{2}+1 = 50 \)
- 等差数列求和：\( S = \frac{n(a_1 + a_n)}{2} = \frac{50 \times (1+99)}{2} = 2500 \)</code></pre>


<a id="section-2033"></a>
## 自定义系统提示词

<a id="t-bkYmhYY9qihqxnFRPNwMK6"></a>

<p id="t-pS7pqJbW1D8pmIG6ozLKrL"><span style="border-bottom:1px solid">通过</span><span style="border-bottom:1px solid">system_prompt</span><span style="border-bottom:1px solid">参数定义 Agent 的角色、任务目标和行为规范。</span></p>


<a id="section-2034"></a>
## 实例

<a id="t-j0HGhEHKnJNshakdNJpjUC"></a>

<pre id="t-VyeOYqxQzVnp3PwZWqQTpW"><code># 文件路径：custom_prompt_agent.py

import os
from deepagents import create_deep_agent
from langchain_openai import ChatOpenAI

model = ChatOpenAI(
    model="deepseek-v4-flash",
    api_key=os.environ["OPENAI_API_KEY"],
    base_url="https://api.deepseek.com",
)

# 自定义系统提示词：明确 Agent 的身份、职责和行为准则
code_review_instructions = """你是一位资深 Python 工程师，专注于代码审查。

你的职责：
- 检查代码的可读性、性能、安全性
- 指出潜在的 Bug 和改进建议
- 提供具体的修改示例

回复格式：
1. 总体评分（1-10）
2. 主要问题列表
3. 具体改进建议（附修改后的代码片段）
"""

agent = create_deep_agent(
    model=model,
    system_prompt=code_review_instructions,
)

# 提交一段待审查的代码
code_to_review = """
def find_user(users, name):
    for i in range(len(users)):
        if users[i]['name'] == name:
            return users[i]
    return None
"""

result = agent.invoke({
 "messages": [{"role": "user", "content": f"请审查以下代码：\n```python{code_to_review}```"}]
})

print(result["messages"][-1].content)</code></pre>


<a id="section-2035"></a>
## 流式输出

<a id="t-94BlUKfnYIYChAT4zqycAd"></a>

<p id="t-5qQCm5db2p6K3V9YKLFF4h"><span style="border-bottom:1px solid">对于需要实时展示进度的场景，可以使用</span><span style="border-bottom:1px solid">stream</span><span style="border-bottom:1px solid">方法逐块接收 Agent 输出。</span></p>


<a id="section-2036"></a>
## 实例

<a id="t-Q07MdcFQ5QAyOngdXVvM2l"></a>

<pre id="t-nsvlosInxEW93Jo3rQiIbX"><code># 文件路径：streaming_agent.py

import os
from deepagents import create_deep_agent
from langchain_openai import ChatOpenAI

model = ChatOpenAI(
    model="deepseek-v4-flash",
    api_key=os.environ["OPENAI_API_KEY"],
    base_url="https://api.deepseek.com",
)

agent = create_deep_agent(
    model=model,
    system_prompt="你是一位技术写作专家，擅长写清晰易懂的技术文档。",
)

# stream 方法返回生成器，每次 yield 一个事件块
for chunk in agent.stream({
 "messages": [{"role": "user", "content": "写一篇关于 Python 装饰器的简短介绍。"}]
}):
 # chunk 是一个包含增量消息的字典
 if "messages" in chunk:
 for msg in chunk["messages"]:
 if hasattr(msg, "content") and msg.content:
 print(msg.content, end="", flush=True)

print() # 最终换行</code></pre>


<a id="section-2037"></a>
## 多轮对话（带检查点）

<a id="t-R987aqISyRVYNZPIr82Pm4"></a>

<p id="t-RecGZjTN2GvlXbSfgnGYFD"><span style="border-bottom:1px solid">配合</span><span style="border-bottom:1px solid">MemorySaver</span><span style="border-bottom:1px solid">检查点，可以实现跨轮次的有状态对话。</span></p>


<a id="section-2038"></a>
## 实例

<a id="t-4UuBk7BkBZ8QodZ3ijCiqb"></a>

<pre id="t-eByoHyWdF6YGfqI0Duxpij"><code># 文件路径：multi_turn_agent.py

import os
from deepagents import create_deep_agent
from langchain_openai import ChatOpenAI
from langgraph.checkpoint.memory import MemorySaver  # 内存检查点，重启后数据会丢失

model = ChatOpenAI(
    model="deepseek-v4-flash",
    api_key=os.environ["OPENAI_API_KEY"],
    base_url="https://api.deepseek.com",
)

# MemorySaver 将对话状态保存在内存中，进程结束后丢失
# 生产环境建议使用 SqliteSaver 或 PostgresSaver
checkpointer = MemorySaver()

agent = create_deep_agent(
    model=model,
    system_prompt="你是一个乐于助人的编程助手。",
    checkpointer=checkpointer, # 必须传入，否则多轮对话无法记忆上下文
)

# thread_id 是对话线程的唯一标识，同一 thread_id 共享同一上下文
config = {"configurable": {"thread_id": "runoob-session-001"}}

# 第一轮
result1 = agent.invoke(
 {"messages": [{"role": "user", "content": "我叫 RUNOOB，我在学习 Python。"}]},
    config=config,
)
print("第一轮回复：", result1["messages"][-1].content)

# 第二轮：Agent 能记住上一轮的信息
result2 = agent.invoke(
 {"messages": [{"role": "user", "content": "我叫什么名字？我在学什么？"}]},
    config=config,
)
print("第二轮回复：", result2["messages"][-1].content)</code></pre>

<pre id="t-M2CJL8Cb7RTw6rQlpV5cYt"><code>第一轮回复：你好，RUNOOB！很高兴认识你，Python 是一门非常适合初学者的语言...
第二轮回复：你叫 RUNOOB，你正在学习 Python！...</code></pre>

<blockquote id="t-G1N8Tq8eVYnR3A3RlkWbL4"><blockquote id="t-yOs5kgpnleBCSppKCOMpPt"><span style="border-bottom:1px solid;font-style:italic;font-weight:bold">thread_id 的作用：</span><span style="border-bottom:1px solid;font-style:italic">同一个</span><span style="border-bottom:1px solid;font-style:italic">thread_id</span><span style="border-bottom:1px solid;font-style:italic">下的所有调用共享同一段对话历史。不同的</span><span style="border-bottom:1px solid;font-style:italic">thread_id</span><span style="border-bottom:1px solid;font-style:italic">之间相互隔离，互不干扰。可以把它理解为"对话房间号"。</span></blockquote></blockquote>


<a id="section-2039"></a>
## 综合 Demo：研究报告 Agent

<a id="t-cqRxZZcXV6bxWSv3A7X4tz"></a>

<p id="t-WSwyKYQwxA7yQSXR6UGzkZ"><span style="border-bottom:1px solid">本节展示一个完整的研究报告 Agent，使用 DeepSeek V3 作为主模型，集成自定义搜索工具，并演示子 Agent 的使用。</span></p>


<a id="section-2040"></a>
## 场景说明

<a id="t-RmQB1Rk7Xg9qZNZw1DWArr"></a>

<p id="t-b2GcPPH8Qj9XSGztkzxyeL"><span style="border-bottom:1px solid">我们将构建一个 Agent，接收用户的研究主题，自动分解任务、调用搜索工具收集资料，最终输出一份结构化报告。</span></p>


<a id="section-2041"></a>
## 实例

<a id="t-KmDESyytc5phSVZViEeqcb"></a>

<pre id="t-70W6gcYh6urk15qFdXF7gd"><code># 文件路径：research_agent_demo.py
# 演示：使用 DeepSeek API + Deep Agents 构建研究报告 Agent
# 依赖安装：pip install deepagents langchain-openai requests

import os
import json
from tavily import TavilyClient
from typing import Literal
from deepagents import create_deep_agent
from langchain_openai import ChatOpenAI
from langgraph.checkpoint.memory import MemorySaver

# ──────────────────────────────────────────
# 1. 初始化 DeepSeek 模型
# ──────────────────────────────────────────
main_model = ChatOpenAI(
    model="deepseek-v4-flash", # 综合能力强，适合规划和写作
    api_key=os.environ["OPENAI_API_KEY"],
    base_url="https://api.deepseek.com",
    temperature=0.3, # 可选：降低随机性，使报告更严谨
)
# 初始化 Tavily 客户端（用于搜索工具）
tavily_client = TavilyClient(
    api_key=os.environ["TAVILY_API_KEY"]
)
# ──────────────────────────────────────────
# 2. 定义搜索工具 Tavily
# ──────────────────────────────────────────
def web_search(
    query: str,
    max_results: int = 5,
) -&gt; str:
 """使用 Tavily 搜索互联网信息"""

 try:
        response = tavily_client.search(
            query=query,
            max_results=max_results,
            search_depth="advanced",
            include_answer=True,
            include_raw_content=False,
 )

        lines = []

 # AI 总结答案
 if response.get("answer"):
            lines.append(f"总结：{response['answer']}\n")

 # 搜索结果
 for idx, item in enumerate(response.get("results", []), start=1):
            lines.append(
 f"""
[{idx}] {item.get('title', '')}
URL: {item.get('url', '')}
内容: {item.get('content', '')}
""".strip()
 )

 return "\n\n".join(lines)


def format_report(title: str, sections: str) -&gt; str:
 """将研究内容整理为 Markdown 格式的报告。

    Args:
        title: 报告标题
        sections: 各章节内容，以 JSON 字符串表示，格式：{"章节名": "内容"}
    """
 try:
        data = json.loads(sections)
        lines = [f"# {title}\n"]
 for section_name, content in data.items():
            lines.append(f"## {section_name}\n")
            lines.append(f"{content}\n")
 return "\n".join(lines)
 except Exception as e:
 return f"格式化出错：{str(e)}"


# ──────────────────────────────────────────
# 3. 定义专用子 Agent（信息整合专家）
#    子 Agent 有独立的上下文窗口，避免主 Agent 上下文膨胀
# ──────────────────────────────────────────
report_writer_subagent = {
 "name": "report-writer", # 必填：子 Agent 唯一名称
 "description": "专业的报告撰写助手，负责将研究资料整合为结构清晰的报告。", # 必填：主 Agent 用此描述决定何时委派任务
 "system_prompt": "你是一位专业的报告撰写专家。接收研究资料后，请整理成包含摘要、主要内容、结论三部分的报告，语言简洁清晰。",
 "tools": [format_report], # 可选：子 Agent 专用工具
 # 不指定 model 则继承主 Agent 的模型
}

# ──────────────────────────────────────────
# 4. 配置并创建 Deep Agent
# ──────────────────────────────────────────
checkpointer = MemorySaver()

research_instructions = """你是一位专业的研究助手，擅长深度调研和报告撰写。

当用户提供研究主题时，你应当：
1. 使用 web_search 工具搜索相关信息（至少搜索 2-3 次，涵盖不同角度）
2. 将收集到的资料整理汇总
3. 委派 report-writer 子 Agent 撰写最终报告
4. 输出完整报告给用户

注意：每次搜索使用不同的关键词，以获取更全面的信息。
"""

agent = create_deep_agent(
    model=main_model,
    tools=[web_search], # 主 Agent 可用的工具
    system_prompt=research_instructions,
    subagents=[report_writer_subagent], # 注册子 Agent
    checkpointer=checkpointer,
)

# ──────────────────────────────────────────
# 5. 运行 Agent
# ──────────────────────────────────────────
print("正在研究中，请稍候...\n")

result = agent.invoke(
 {
 "messages": [{
 "role": "user",
 "content": "请帮我研究 LangGraph 是什么，以及它的主要应用场景。"
 }]
 },
    config={"configurable": {"thread_id": "runoob-research-001"}}
)

print("=" * 60)
print("研究报告")
print("=" * 60)
print(result["messages"][-1].content)</code></pre>

<pre id="t-a1mZ0viJlAVocYYyD4Uo0t"><code>正在研究中，请稍候...

============================================================
研究报告
============================================================
# LangGraph 研究报告

## 摘要
LangGraph 是 LangChain 团队推出的一个用于构建有状态、多角色 LLM 应用的框架...

## 主要内容
### 核心概念
LangGraph 将 Agent 的执行流程建模为一张有向图...

### 主要应用场景
1. 多步骤推理任务
2. 人机协作（Human-in-the-loop）工作流
3. 多 Agent 协作系统
...

## 结论
LangGraph 是构建生产级 Agent 应用的重要工具...</code></pre>


<a id="section-2042"></a>
## Human-in-the-loop 示例

<a id="t-uHwNOcFbx6oJk4QTWCpn4n"></a>

<p id="t-AUqbpR5OcLd7aMPRYG8lkc"><span style="border-bottom:1px solid">对于敏感操作（例如删除文件、发送邮件），可以配置 Agent 在执行前暂停等待人工确认。</span></p>


<a id="section-2043"></a>
## 实例

<a id="t-3oOrPBdOAey5kIenSbGLuN"></a>

<pre id="t-oa0HVokJmvtnWdRDmRrQRC"><code># 文件路径：hitl_agent.py
# Human-in-the-loop：让 Agent 在执行危险操作前请求人工审批

import os
from langchain.tools import tool
from deepagents import create_deep_agent
from langchain_openai import ChatOpenAI
from langgraph.checkpoint.memory import MemorySaver
from langgraph.types import Command

model = ChatOpenAI(
    model="deepseek-v4-flash",
    api_key=os.environ["OPENAI_API_KEY"],
    base_url="https://api.deepseek.com",
)

# 使用 @tool 装饰器定义工具（需要 langchain 包）
@tool
def delete_file(path: str) -&gt; str:
 """删除指定路径的文件。"""
 # 实际项目中这里会调用 os.remove(path)
 return f"文件 {path} 已删除。"

@tool
def read_file(path: str) -&gt; str:
 """读取指定路径的文件内容。"""
 return f"文件 {path} 的内容：（示例内容）"

# interrupt_on 配置哪些工具需要人工审批
# True 表示允许：审批、编辑参数、拒绝、发送自定义回复
# False 表示不需要审批
# dict 可以精细控制允许的操作类型
checkpointer = MemorySaver() # HITL 必须配合 checkpointer 使用

agent = create_deep_agent(
    model=model,
    tools=[delete_file, read_file],
    interrupt_on={
 "delete_file": True, # 删除操作：需要完整审批流程
 "read_file": False, # 读取操作：无需审批
 },
    checkpointer=checkpointer,
)

config = {"configurable": {"thread_id": "runoob-hitl-001"}}

# 第一次调用：Agent 执行到 delete_file 时会暂停
print("启动 Agent...")
result = agent.invoke(
 {"messages": [{"role": "user", "content": "请删除 /tmp/test.txt 文件。"}]},
    config=config,
)

# 检查是否有待审批的中断
for msg in result.get("messages", []):
 print(f"Agent 消息: {msg.content if hasattr(msg, 'content') else msg}")

# 恢复执行：传入审批决定
# "approve" 表示批准执行该工具
# "reject" 表示拒绝，Agent 将不执行该工具
print("\n用户审批：批准删除操作")
final_result = agent.invoke(
    Command(resume={"decision": "approve"}),
    config=config,
)
print("最终结果：", final_result["messages"][-1].content)</code></pre>

<blockquote id="t-S3y81LIwoEpXvVhAKOqtDW"><blockquote id="t-cUxnNbVujgmirvzZImsY7b"><span style="border-bottom:1px solid;font-style:italic;font-weight:bold">interrupt_on 的工作原理：</span><span style="border-bottom:1px solid;font-style:italic">当 Agent 即将调用被标记的工具时，LangGraph 会触发一个</span><span style="border-bottom:1px solid;font-style:italic">interrupt</span><span style="border-bottom:1px solid;font-style:italic">，Agent 的执行暂停。你可以通过</span><span style="border-bottom:1px solid;font-style:italic">Command(resume=...)</span><span style="border-bottom:1px solid;font-style:italic">传入审批结果来恢复执行。</span></blockquote></blockquote>


<a id="section-2044"></a>
## 常见问题

<a id="t-73tM49gqNYhKq5PCPaUZzF"></a>

<p id="t-DPQqqHZm4QPzpcI1uKcEVd"><span style="border-bottom:1px solid">以下是使用 Deep Agents 时常见的疑问和注意事项。</span></p>


<a id="section-2045"></a>
## 如何判断选用 Deep Agents 还是直接用 LangChain/LangGraph？

<a id="t-yBbkxcxw66AylFvt1aFKYA"></a>

<div id="t-Y9ldgrZseVJY7633BsR1St"><table><colgroup><col width="260.9044494628906"/><col width="121.00341796875"/><col width="253.005126953125"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>场景</span></p></td><td style=" vertical-align: top"><p><span>推荐选择</span></p></td><td style=" vertical-align: top"><p><span>理由</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">需要规划、文件读写、子 Agent、上下文压缩</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Deep Agents</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">这些能力开箱即用，无需自行组装</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">需要轻量封装，只要工具调用循环</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">LangChain create_agent</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">比 Deep Agents 更轻，没有内置中间件</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">需要自定义图结构，循环不是标准的工具调用循环</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">LangGraph</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">完全自定义图节点和边的逻辑</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">LangGraph CompiledStateGraph 作为子 Agent</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">混用</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">可以将自定义图作为 subagent 传入 Deep Agents</span></p></td></tr></tbody></table></div>


<a id="section-2046"></a>
## DeepSeek 模型的选择建议

<a id="t-86Awi2UwKpPaI70vzz3O4V"></a>

<div id="t-g1OCvp2SKtj9kG93L5aAgH"><table><colgroup><col width="147.8992919921875"/><col width="120"/><col width="185.00518798828125"/><col width="185.00518798828125"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>模型</span></p></td><td style=" vertical-align: top"><p><span>model 字符串</span></p></td><td style=" vertical-align: top"><p><span>特点</span></p></td><td style=" vertical-align: top"><p><span>适用场景</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">deepseek-v4-flash</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">deepseek-v4-flash</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">综合能力强，速度快，价格低</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">通用任务、日常对话、写作</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">deepseek-v4-pro</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">deepseek-v4-pro</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">推理能力强，内置思维链</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">数学、代码、复杂逻辑推理</span></p></td></tr></tbody></table></div>


<a id="section-2047"></a>
## Agent 调用工具后没有返回结果怎么办？

<a id="t-63i017w5l7Ku7J9TmhSpo0"></a>

<p id="t-kio9U6UCN3C2XMhXEIwqik"><span style="border-bottom:1px solid">工具函数的返回值必须是字符串或可序列化为字符串的类型。</span></p>

<p id="t-OkIGlaiWmPcE1YIQiLbcYE"><span style="border-bottom:1px solid">如果工具返回复杂对象（如字典、列表），建议用</span><span style="border-bottom:1px solid">json.dumps(result, ensure_ascii=False)</span><span style="border-bottom:1px solid">转换后再返回。</span></p>


<a id="section-2048"></a>
## 如何让 Agent 一次只能访问特定文件？

<a id="t-Tf5rAAFsRcIZ0XeB45DSr8"></a>

<p id="t-anEV51Bzm1om0KhQ29JY1W"><span style="border-bottom:1px solid">使用</span><span style="border-bottom:1px solid">permissions</span><span style="border-bottom:1px solid">参数配置文件系统访问权限，可以精确控制 Agent 只能读写指定路径。</span></p>


<a id="section-2049"></a>
## 实例

<a id="t-i1pXWnapB3ayYNJBxoPMLy"></a>

<pre id="t-lWMVZNTdvatwK0VDkeKYtQ"><code>from deepagents import create_deep_agent
from deepagents.permissions import FilesystemPermission
from langchain_openai import ChatOpenAI
import os

model = ChatOpenAI(
    model="deepseek-v4-flash",
    api_key=os.environ["OPENAI_API_KEY"],
    base_url="https://api.deepseek.com",
)

agent = create_deep_agent(
    model=model,
    permissions=[
        FilesystemPermission(path="/workspace/", read=True, write=True), # 允许读写工作目录
        FilesystemPermission(path="/secrets/", read=False, write=False), # 禁止访问敏感目录
 ],
)</code></pre>


<a id="section-2050"></a>
## Agent 默认系统提示词和我的提示词如何合并？

<a id="t-x7IAcUrceZMsnqYQGNZbhS"></a>

<p id="t-v1qiSmgpkLQmrFXt9Eg0OB"><span style="border-bottom:1px solid">Deep Agents 的提示词由四部分按固定顺序拼接：</span></p>

<p id="t-EV2GcwSMqLekHU1XboEpXn"><span style="border-bottom:1px solid">USER</span><span style="border-bottom:1px solid">（你的 system_prompt）→</span><span style="border-bottom:1px solid">BASE</span><span style="border-bottom:1px solid">（SDK 默认提示词）→</span><span style="border-bottom:1px solid;background-color:#eafaf1">SUFFIX</span><span style="border-bottom:1px solid">（模型厂商特定调整）</span></p>

<p id="t-FmJsSC0OLBsUyM1o1Qywdi"><span style="border-bottom:1px solid">你的提示词永远在最前面，不会被覆盖。SDK 的默认提示词告诉模型如何使用规划和文件工具，所以大多数情况下不需要自己重写它。</span></p>


<a id="section-2051"></a>
## 初学者容易犯的错误

<a id="t-EHDfZgjre13fYUtceC5gq3"></a>

<blockquote id="t-REZhrNb8oiodNlq5YmlBT4"><p id="t-IgI6e2iX6BAch1owKWKm1Y"><span style="border-bottom:1px solid;font-style:italic;font-weight:bold">常见错误 1：</span><span style="border-bottom:1px solid;font-style:italic">忘记传入</span><span style="border-bottom:1px solid;font-style:italic">checkpointer</span><span style="border-bottom:1px solid;font-style:italic">。使用 Human-in-the-loop（</span><span style="border-bottom:1px solid;font-style:italic">interrupt_on</span><span style="border-bottom:1px solid;font-style:italic">）或多轮对话时，</span><span style="border-bottom:1px solid;font-style:italic;font-weight:bold">必须</span><span style="border-bottom:1px solid;font-style:italic">传入 checkpointer，否则状态无法保存，Agent 会报错。</span></p></blockquote>

<blockquote id="t-exxHwhFbbwAS2L7BVYarW4"><blockquote id="t-EryaOypE0OTRHtxfL9hIl7"><span style="border-bottom:1px solid;font-style:italic;font-weight:bold">常见错误 2：</span><span style="border-bottom:1px solid;font-style:italic">工具函数没有写 docstring。Deep Agents 用函数的 docstring 作为工具描述，让模型知道什么时候调用这个工具。没有 docstring 的工具，模型可能不知道何时调用甚至拒绝使用。</span></blockquote></blockquote>

<blockquote id="t-THYzLsObdtyowpKDCZ4VFa"><p id="t-E52CA2bgoEw0GaZPfDJBRP"><span style="border-bottom:1px solid;font-style:italic;font-weight:bold">常见错误 3：</span><span style="border-bottom:1px solid;font-style:italic">在中间件中直接修改</span><span style="border-bottom:1px solid;font-style:italic">self</span><span style="border-bottom:1px solid;font-style:italic">的属性。Agent 的子 Agent 和并发操作可能同时运行，对中间件实例属性的直接修改会导致竞争条件（race condition）。需要保存状态时，应通过图的 state 来传递，而不是中间件实例变量。</span></p></blockquote>


<a id="section-2052"></a>
## 更多资料

<a id="t-s68vIELBkMMpqfvM0P4PSg"></a>

<p id="t-xP4huM1wgugbm2dtIMe2A2"><span style="border-bottom:1px solid">更多内容可以参考以下文档：</span></p>

<div id="t-kjSqDQpjUOKqfZjE5u3ofD"><table><colgroup><col width="281.9010009765625"/><col width="334.0120849609375"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>名称</span></p></td><td style=" vertical-align: top"><p><span>地址</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Deep Agents 官方文档（首页）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">https://docs.langchain.com/deepagents</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Deep Agents GitHub 仓库（源码）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">https://github.com/langchain-ai/deepagents</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Deep Agents Python 文档（Python 开发指南）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">https://docs.langchain.com/oss/python/deepagents/overview</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Deep Agents JavaScript 文档（JS/TS 开发指南）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">https://docs.langchain.com/oss/javascript/deepagents/overview</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Deep Agents Python API 参考手册</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">https://reference.langchain.com/python/deepagents/deepagents</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Deep Agents JavaScript API 参考手册</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">https://reference.langchain.com/javascript/modules/deepagents.html</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">LangChain 官方文档（基础组件库）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">https://docs.langchain.com/langchain</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">LangGraph 官方文档（Agent 运行时）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">https://docs.langchain.com/langgraph</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">LangGraph GitHub 仓库（源码）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">https://github.com/langchain-ai/langgraph</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">LangChain GitHub 仓库（源码）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">https://github.com/langchain-ai/langchain</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">LangSmith 官方网站（Agent 调试与监控）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">https://www.langchain.com/langsmith</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">LangSmith 官方文档</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">https://docs.smith.langchain.com</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Tavily 官方网站（搜索工具）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">https://tavily.com</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Tavily API 文档</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">https://docs.tavily.com</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">DeepSeek 开放平台（模型服务）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">https://platform.deepseek.com</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">DeepSeek API 文档</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">https://api-docs.deepseek.com</span></p></td></tr></tbody></table></div>


<a id="section-2191"></a>
## Dify 入门教程

<a id="t-block-25097"></a>

<p id="t-twDeuT9goA4QsA0xVdnPrV"><span style="border-bottom:1px solid">Dify（Do It For You）是当前最受欢迎的开源 LLM 应用开发平台，专为构建由大型语言模型（LLM）驱动的生成式 AI 应用而设计。</span></p>

<p id="t-eDwgbmGo7eZWVCNHAJdEfL"><span style="border-bottom:1px solid">Dify 将 AI 工作流编排、RAG 知识库、Agent 框架、模型管理、可观测性整合在一个可视化平台里，让你快速从原型走向生产，无需从零搭建 LLM 基础设施。</span></p>

<p id="t-RGfgn0lnJ0LuoU5gBsVX3M"><span style="border-bottom:1px solid">Dify 通过集成 RAG 流水线、AI 工作流、可观测性工具和模型管理，简化了 AI 应用的创建过程。</span></p>

<p id="t-Hh5FZfagj0Bzdr5tqlKdbY"><span style="border-bottom:1px solid">如果说 LangChain 是</span><span style="border-bottom:1px solid;font-weight:bold">AI 应用的零件工厂</span><span style="border-bottom:1px solid">（灵活但需要大量手写代码），那 Dify 就是</span><span style="border-bottom:1px solid;font-weight:bold">AI 应用的可视化 IDE</span><span style="border-bottom:1px solid">——组件都在，拖拽连线就能跑。</span></p>

<div id="t-XLCo5C0sLASPcQ3PZ4EvFg"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/6fcd6ab1a919c434fc01171b.png"/></div>


<a id="section-2192"></a>
## 和其他工具的对比

<a id="t-W0fOVZivHN2jHNH81KfHRA"></a>

<p id="t-z4J3hcv6Jw3kNLkU7DaSkW"><span style="border-bottom:1px solid">以下是 Dify 与 LangChain、n8n 在关键维度上的对比。</span></p>

<div id="t-sDja8r7ADtAMQ9aiz3f548"><table><colgroup><col width="120"/><col width="171.89752197265625"/><col width="164.005126953125"/><col width="164.005126953125"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>维度</span></p></td><td style=" vertical-align: top"><p><span>Dify</span></p></td><td style=" vertical-align: top"><p><span>LangChain</span></p></td><td style=" vertical-align: top"><p><span>n8n</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">主要用户</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">开发者 + 产品经理</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">开发者</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">运营/自动化</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">编程要求</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">低代码 / 无代码</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">需要写 Python/JS</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">低代码</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">RAG 内置</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">完整内置</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">需要手动组装</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">有限</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Agent 框架</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">内置</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">内置</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">有限</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">可观测性</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">内置</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">需第三方</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">有限</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">自托管</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">完全支持</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">支持</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">支持</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">许可证</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Apache 2.0</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">MIT</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Fair-code</span></p></td></tr></tbody></table></div>

<p id="t-T12PDM0GozgrWq2yP5ovib"><span style="border-bottom:1px solid">Dify 的直观可视化编排工作室使其成为需要快速构建功能性 AI 应用的初创公司和企业的理想选择。</span></p>

<p id="t-URvmVVKCZ8X5thw7HP8Trz"><span style="border-bottom:1px solid">LangChain 则更适合需要自定义集成和开发者深度参与的企业级复杂应用。</span></p>


<a id="section-2193"></a>
## 谁在用 Dify？

<a id="t-ogvgWD8rcH4QcuBgooYaG7"></a>

<p id="t-TALI7jBxk9DbxMDkFPoNrZ"><span style="border-bottom:1px solid">从生物医学到汽车行业，Dify 为各类企业提供可靠的解决方案。</span></p>

<p id="t-lQFkKTqR64oy0kHLdCXoWZ"><span style="border-bottom:1px solid">Volvo Cars 在 AI 前沿战略导航中使用 Dify 快速验证想法。</span></p>

<p id="t-R6jDei3DHfAVwOp4ftiIbS"><span style="border-bottom:1px solid">用户对 Dify 的高度评价是其能够将 AI Agent 开发民主化，将强大的 AI/ML 能力结合到无代码平台上。</span></p>


<a id="section-2194"></a>
## 核心概念

<a id="t-tPFiVre3Lj1Yy7OGSVrtcg"></a>

<p id="t-atqKn0rMEZphvqOkRjKLZN"><span style="border-bottom:1px solid">在开始操作之前，我们先了解一下 Dify 的基本概念：</span></p>

<div id="t-QZMc8YkHZmAMjqqaEnKHfR"><table><colgroup><col width="120"/><col width="553.8975219726562"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>概念</span></p></td><td style=" vertical-align: top"><p><span>说明</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">应用（App）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Dify 里的基本部署单元。每个应用对应一个独立的 AI 功能，有自己的 System Prompt、关联的知识库、工具配置和 API Key。</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">知识库（Knowledge Base）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">知识库是你自己的数据集合，可以集成到 AI 应用中。它让 LLM 在回答时以你的专有数据作为额外的真实来源，确保回答更准确、更相关、更不容易产生幻觉。</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">RAG（检索增强生成）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">当用户提出问题时，系统首先从知识库中检索最相关的信息（Retrieval），然后将检索结果与用户原始问题组合后发送给 LLM（Augmented），LLM 基于此上下文生成更精准的答案（Generation）。</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Workflow（工作流）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">在可视化画布上构建和测试强大的 AI 工作流，通过拖拽节点和连线来定义多步骤的 AI 处理逻辑。</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Agent（智能体）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">可以基于 LLM Function Calling 或 ReAct 定义 Agent，并为其添加预构建或自定义工具。Dify 为 AI Agent 提供 50 多个内置工具，如 Google Search、DALL E、Stable Diffusion 和 WolframAlpha。</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">节点（Node）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">工作流的基本单元，每个节点执行一个具体操作：LLM 推理、知识检索、代码执行、HTTP 请求、条件分支等。</span></p></td></tr></tbody></table></div>


<a id="section-2195"></a>
## 安装与启动

<a id="t-r4RNrW8GQ80mGi6ONCWmC2"></a>

<p id="t-WA8fXwwUiWxiHkZVLSfXd9"><span style="border-bottom:1px solid">四种安装方式，从零秒上手到高可用集群部署。</span></p>


<a id="section-2196"></a>
## 方式一：Dify Cloud（最快，0 秒上手）

<a id="t-0dKQYmT6Bguho8bn4RK8Ll"></a>

<p id="t-ZFet9tM9iCqfo3DoWnMvbH"><span style="border-bottom:1px solid">访问</span><span style="border-bottom:1px solid">cloud.dify.ai</span><span style="border-bottom:1px solid">，注册账号即可立即使用。</span></p>

<p id="t-3kuQy0Z1lo2cHVockICbHr"><span style="border-bottom:1px solid">免费的 Sandbox 套餐包含每月 200 条消息和 5 个应用，无需配置任何环境。</span></p>

<p id="t-tY5VvSXeBDFZke2wRp2JAx"><span style="border-bottom:1px solid">适合快速体验、个人项目、测试原型。</span></p>

<div id="t-STUOrfpxqRGOBKgWPJOXQ0"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/ebca71ce80bac852fa2a00d8.png"/></div>


<a id="section-2197"></a>
## 方式二：Docker Compose 自托管（推荐生产使用）

<a id="t-gRq83Ab4rxlGGj5fvnrAHd"></a>

<p id="t-paJLyzchpqowxKRsPbYErj"><span style="border-bottom:1px solid">适合有技术背景的用户，完全掌控数据和部署环境。</span></p>

<a id="t-cDVm7OyJudYpsYDAN0ReKB"></a>

##### 系统要求

<div id="t-WndF8RlKD6RjQzVy6vdEbi"><table><colgroup><col width="203.8975524902344"/><col width="164.00860595703125"/><col width="143.00689697265625"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>资源</span></p></td><td style=" vertical-align: top"><p><span>最低要求</span></p></td><td style=" vertical-align: top"><p><span>推荐配置</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">CPU</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">2 核</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">4 核</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">内存</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">4 GB</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">8 GB</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">磁盘</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">20 GB</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">50 GB+</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Docker</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Engine 20.10+</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">最新版</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Docker Compose</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">v2.2+</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">最新版</span></p></td></tr></tbody></table></div>

<a id="t-vhLKiXcJuMmPF6dCaP5k91"></a>

##### 安装步骤

<p id="t-bJbEclLOVNx4D6pRulB69x"><span style="border-bottom:1px solid">第一步：克隆仓库</span></p>

<p id="t-A03z5YoGYE7aP3DWmwIXu2"><span style="border-bottom:1px solid">克隆 Dify 仓库到本地:</span></p>

<pre id="t-eCms0lptIwj5oDMMWMCOoZ"><code>git clone https://github.com/langgenius/dify.git
cd dify</code></pre>

<p id="t-3XOvrEZQ7fXOw5UmVyPmAO"><span style="border-bottom:1px solid">第二步：进入 docker 目录，复制环境配置</span></p>

<pre id="t-0BfT9C00OrOTRolBogntf0"><code>cd docker
# 从模板复制环境配置文件
cp .env.example .env</code></pre>

<p id="t-tPwkq9AFxbTzZXZTvIOQui"><span style="border-bottom:1px solid">第三步（重要）：配置 SECRET_KEY</span></p>

<blockquote id="t-08EBpV5NjXdPMZQkAxZXuz"><p id="t-bYdVfJ6siq427NTNO1q5uI"><span style="border-bottom:1px solid;font-style:italic">从 v1.14.1 起，Docker 部署不再依赖公开的默认密钥。当 SECRET_KEY 为空时，API 会自动生成并持久化一个运行时密钥。建议在 .env 文件中明确设置。</span></p></blockquote>

<pre id="t-4zh7BrApp59NPtA2etaWN9"><code># 生成一个安全的随机密钥
openssl rand -base64 42</code></pre>

<p id="t-MMmjrig9aajU3QRaW2O6Kl"><span style="border-bottom:1px solid">编辑 .env 文件，找到 SECRET_KEY 并设置为上面生成的随机字符串：</span></p>

<pre id="t-VhJcMFHYJiffTlkxHDzu6R"><code>SECRET_KEY=your-very-long-random-secret-key-here</code></pre>

<p id="t-JiTDSeQduNN0YyE5aSGmj9"><span style="border-bottom:1px solid">第四步：启动服务</span></p>

<pre id="t-sp8TycZ4IhnRdtZAwkUXec"><code># 启动所有 Dify 服务（首次会拉取镜像，约需 3-10 分钟）
docker compose up -d</code></pre>

<p id="t-ZOWq6yGC1TWg4kwQbqUBQK"><span style="border-bottom:1px solid">第五步：访问并初始化</span></p>

<p id="t-Ty9zvj8OcPZ2d8uBgsC5zB"><span style="border-bottom:1px solid">浏览器访问 http://localhost/install，完成管理员账号注册。</span></p>

<p id="t-njgdAfQQE8y6Hu9MdOx74l"><span style="border-bottom:1px solid">第六步：验证服务状态</span></p>

<pre id="t-OG73tjrOhAKKlru25Oa2Of"><code># 查看所有容器状态，全部为 healthy 即表示运行正常
docker compose ps</code></pre>

<p id="t-fL0Rv0YDYb0oI3WvLlEwOz"><span style="border-bottom:1px solid">所有容器（api、worker、web、db、redis、weaviate、nginx 等）状态均为 healthy 即表示运行正常。</span></p>

<a id="t-DWCIWFDb7p2QHX1pTLmPdf"></a>

##### 停止与重启

<pre id="t-gTtkJehLWNEH28IwmVoB8a"><code># 停止所有服务（数据保留在 Docker volumes 中）
docker compose down

# 重新启动所有服务
docker compose up -d</code></pre>

<a id="t-9qjaLxnGCi9tHeITuWDPnx"></a>

##### 升级到新版本

<pre id="t-1hIyAGHRQfGRH5Ip3J7cJC"><code># 进入 docker 目录
cd dify/docker

# 拉取最新代码
git pull origin main

# 拉取新镜像
docker compose pull

# 重新启动
docker compose up -d</code></pre>

<blockquote id="t-gSaQ6zDrGjD0mdqGueJxuD"><p id="t-xkAOBHLbJajqgaoFDdyK9H"><span style="border-bottom:1px solid;font-style:italic">数据持久化在 Docker volumes 中，更新不会影响已有的应用、知识库或对话历史。在大版本升级前建议备份 PostgreSQL 数据库。</span></p></blockquote>


<a id="section-2198"></a>
## 方式三：AWS Marketplace 一键部署

<a id="t-iCXS8uutehyJPIr89IGuNO"></a>

<p id="t-1bYS4vGkwxShQJ3q87qMCx"><span style="border-bottom:1px solid">面向在 AWS 上运营的初创公司和小型企业，可以通过 AWS Marketplace 上的 Dify Premium 实现一键部署到自己的 AWS VPC，还支持自定义 Logo 和品牌。</span></p>


<a id="section-2199"></a>
## 方式四：Kubernetes 部署（高可用）

<a id="t-fZNVFJOjLGG0v55Gd4sdRX"></a>

<p id="t-UwhSwYXdXbReEzU6xkeY52"><span style="border-bottom:1px solid">对于需要高可用配置的场景，社区提供了 Helm Charts 和 YAML 文件，可以将 Dify 部署到 Kubernetes 集群。</span></p>

<pre id="t-UEcG9MEnD4c3WxZKIdcZyl"><code># 添加 Dify Helm 仓库
helm repo add dify https://langgenius.github.io/dify-helm

# 使用自定义 values.yaml 安装
helm install dify dify/dify -f values.yaml</code></pre>


<a id="section-2200"></a>
## 配置模型提供商

<a id="t-LoSmmFqvN0L05qWVr1GdxI"></a>

<p id="t-qvdvI9GrdoERzlJYrLtK7c"><span style="border-bottom:1px solid">安装完成后，第一步是连接你的 AI 模型。</span></p>


<a id="section-2201"></a>
## 操作路径

<a id="t-zgBZyZMQyw6xn39v8lrv0v"></a>

<p id="t-LDTwnMJuUZ0EMGUNzEYUK3"><span style="border-bottom:1px solid">登录 Dify 后，点击右上角头像，进入 Settings（设置），选择 Model Provider（模型提供商）。</span></p>

<div id="t-5pNomI4UziU7DlYgYkbs5l"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/2d0739ef52903656ee8f9dc6.png"/></div>

<p id="t-qiUgmzqrxDES0V6hdQu2qz"><span style="border-bottom:1px solid">比如我们可以安装 DeepSeek 这个模型供应商，然后配置 API key：</span></p>

<div id="t-6HeG5FcW67SVYR4e5pJbVf"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/5569c47af25375f4bd59c663.png"/></div>


<a id="section-2202"></a>
## 主流提供商配置

<a id="t-NS3KNCsY4YKj1Orfa1OTyK"></a>

<p id="t-pzc5V48WGI4fF58WEGPSXl"><span style="border-bottom:1px solid">Anthropic（Claude 系列）：</span></p>

<pre id="t-ZpDX2rNmj2KVsANt9TTHnG"><code>Provider: Anthropic
API Key: sk-ant-xxxxxxxx（从 console.anthropic.com 获取）
推荐模型：claude-sonnet-4-6（综合性能最佳）</code></pre>

<p id="t-am9MtIi0wP8vgRgh4Zn1f3"><span style="border-bottom:1px solid">OpenAI：</span></p>

<pre id="t-iNYLXY7ylmhl4uIav58YHt"><code>Provider: OpenAI
API Key: sk-xxxxxxxx（从 platform.openai.com 获取）
推荐模型：gpt-4o（性价比高）</code></pre>

<p id="t-vy558EzmIWhQnXj9Nzp79u"><span style="border-bottom:1px solid">Google（Gemini 系列）：</span></p>

<pre id="t-lJiJ9nWRu8lwT3zZmqAaJu"><code>Provider: Google
API Key: xxxxxxxx（从 aistudio.google.com 获取）
推荐模型：gemini-2.0-flash（速度快，适合大量请求）</code></pre>

<p id="t-q2DuBaUt82xojquRjMaBKB"><span style="border-bottom:1px solid">OpenRouter（一个 Key 访问 300+ 模型）：</span></p>

<pre id="t-W6ATSRksUfIkT5y5tsw9Fc"><code>Provider: OpenRouter
API Key: sk-or-xxxxxxxx（从 openrouter.ai 获取）
Base URL: https://openrouter.ai/api/v1</code></pre>

<p id="t-5zF6E4pq2T7uk0VbF039Lg"><span style="border-bottom:1px solid">本地模型（Ollama）：</span></p>

<pre id="t-Fwx7Skgz1GAxB1T1XAV7gJ"><code>Provider: Ollama
Base URL: http://host.docker.internal:11434  # Docker 内访问宿主机
（先在宿主机运行：ollama pull llama3.3）</code></pre>


<a id="section-2203"></a>
## 配置 Embedding 模型（知识库必需）

<a id="t-2AEikOAvfexJHaFsTpvZAN"></a>

<p id="t-sPc285uFxJK6amQGMSVxrg"><span style="border-bottom:1px solid">知识库的向量化需要 Embedding 模型，以下是推荐选项：</span></p>

<div id="t-BGCZgezAPHgDXwP5xAe8Xf"><table><colgroup><col width="267.8975524902344"/><col width="173.00689697265625"/><col width="173.00689697265625"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>模型</span></p></td><td style=" vertical-align: top"><p><span>特点</span></p></td><td style=" vertical-align: top"><p><span>适用场景</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">OpenAI text-embedding-3-small</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">便宜，效果好</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">通用场景</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Zhipu AI embedding-3</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">中文支持优秀</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">中文为主的内容</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">本地 nomic-embed-text（Ollama）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">完全离线</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">数据安全要求高</span></p></td></tr></tbody></table></div>


<a id="section-2204"></a>
## 验证模型可用

<a id="t-OWV3ueFEIuQ2s8OzGmDly5"></a>

<p id="t-oLTJ6Em6mDnpW4MvFNPQit"><span style="border-bottom:1px solid">回到 Settings，找到已配置的提供商，点击模型名旁边的 Test 按钮，显示绿色勾号则配置成功。</span></p>


<a id="section-2205"></a>
## 五种应用类型详解

<a id="t-LmzlJefhu8A9p9JNALwEKi"></a>

<p id="t-nMmWdefwbK3UdbidWVfsSK"><span style="border-bottom:1px solid">在 Dify 首页点击 Create App（创建应用），会看到五种类型，每种对应不同的使用场景。</span></p>

<div id="t-zCtujy5RXaWECGgieR2C14"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/2b65237c3a47c5cea3e5264e.png"/></div>

<p id="t-H2ti7flQ4GEmIN3XMcAgcw"><span style="border-bottom:1px solid">点击创建空白应用，可以看到五种类型的应用：</span></p>

<div id="t-9i6aiptJe0RjFsFkOtps1i"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/c726444c17f0d19592fdc766.png"/></div>


<a id="section-2206"></a>
## Chatbot（聊天助手）

<a id="t-usdreejJZDgXCAiec0jA2R"></a>

<p id="t-3evE5OtzE5pA8lzdP1cPKs"><span style="border-bottom:1px solid">标准的多轮对话应用，有持久的会话记忆。</span></p>

<div id="t-QaT0ha0S6oBUaGDERKILK0"><table><colgroup><col width="141.89755249023438"/><col width="478.89752197265625"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>属性</span></p></td><td style=" vertical-align: top"><p><span>说明</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">适合场景</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">客服机器人、私人助理、FAQ 问答</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">核心特点</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">内置对话记忆（可配置记忆策略）、可附加知识库（启用 RAG）、支持流式输出、一键发布为网页嵌入代码</span></p></td></tr></tbody></table></div>


<a id="section-2207"></a>
## Text Generator（文本生成器）

<a id="t-tU36PRwInU7NOI2R2Ul9sC"></a>

<p id="t-C583obz571pviJTgKHItZq"><span style="border-bottom:1px solid">单次输入到单次输出，不保留对话历史。</span></p>

<div id="t-seTtMDCxI47TdKHY2lPFPh"><table><colgroup><col width="141.90621948242188"/><col width="478.906005859375"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>属性</span></p></td><td style=" vertical-align: top"><p><span>说明</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">适合场景</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">文章改写、摘要生成、SEO 文案、邮件起草</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">核心特点</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">结构清晰（输入表单 + 输出文本）、适合批量处理、支持变量占位符（如 {{product_name}}）</span></p></td></tr></tbody></table></div>


<a id="section-2208"></a>
## Agent（智能体）

<a id="t-24tMYCqyEySqPatJ0C64vs"></a>

<p id="t-TM4hjMK19RyVeJpb1BJb8K"><span style="border-bottom:1px solid">能主动调用工具、自主规划和执行多步骤任务的 AI。</span></p>

<div id="t-LsyJWt6prIm0p5D1X8aUEQ"><table><colgroup><col width="120"/><col width="500.82086181640625"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>属性</span></p></td><td style=" vertical-align: top"><p><span>说明</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">适合场景</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">数据查询与分析、搜索与总结、代码执行</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">核心特点</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">支持 Function Calling 和 ReAct 两种推理模式、内置 50+ 工具（搜索、图像生成、代码解释器等）、支持自定义 API 工具、工具调用过程对用户可见</span></p></td></tr></tbody></table></div>


<a id="section-2209"></a>
## Chatflow（对话流）

<a id="t-eAdUCf7Q7j8fCoScmvdrAK"></a>

<p id="t-6wVVqUQPHHYbILAIWhnAsW"><span style="border-bottom:1px solid">在 Workflow 的基础上加入多轮对话能力，兼具流程编排和会话上下文。</span></p>

<div id="t-qK1MiKKmUdEiQ9t4ZoGHDZ"><table><colgroup><col width="120"/><col width="500.8294982910156"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>属性</span></p></td><td style=" vertical-align: top"><p><span>说明</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">适合场景</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">复杂的客服流程、需要多步骤判断的对话机器人</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">核心特点</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">既有 Workflow 的节点编排能力，又保留对话的多轮记忆，可以在对话中触发自动化流程</span></p></td></tr></tbody></table></div>


<a id="section-2210"></a>
## Workflow（工作流）

<a id="t-zaqVoDELO7i6s3GXvJIawT"></a>

<p id="t-dEgrKSBzoK6f77g6Nnvbkr"><span style="border-bottom:1px solid">纯自动化的多步骤处理流程，不带对话界面，通过 API 触发或手动运行。</span></p>

<div id="t-Ii5F8vN3aKA5mK0qMPLJ6s"><table><colgroup><col width="120"/><col width="504.89752197265625"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>属性</span></p></td><td style=" vertical-align: top"><p><span>说明</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">适合场景</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">批量数据处理、定时自动化任务、后端 AI 处理流水线</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">核心特点</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">在可视化画布上构建和测试 AI 工作流、支持并行分支和循环及条件判断、支持 Human-in-the-Loop（Human Input 节点）、输出结果可对接其他系统</span></p></td></tr></tbody></table></div>


<a id="section-2211"></a>
## 选择指南

<a id="t-WY1bxhzxpWvEaNI9LBfzGl"></a>

<p id="t-iZolpVGhaM9ylPs8s9uVEw"><span style="border-bottom:1px solid">根据需求快速决定使用哪种应用类型：</span></p>

<pre id="t-Xy9AWVFjFvxLu2CqvzCSQv"><code>需要多轮对话？
├─ 是 → 需要复杂流程逻辑？
│        ├─ 是 → Chatflow
│        └─ 否 → Chatbot 或 Agent（需要工具调用时选 Agent）
└─ 否 → 单次输入输出？
          ├─ 是 → Text Generator
          └─ 需要多步骤自动化 → Workflow</code></pre>


<a id="section-2212"></a>
## 知识库（RAG）：让 AI 回答你的私有数据

<a id="t-d8i8HumoCwcrce8DXu1aVM"></a>

<p id="t-kYGkChpWFnWGurnAON7q4w"><span style="border-bottom:1px solid">知识库是 Dify 最强大的功能之一，也是大多数企业应用的核心。</span></p>


<a id="section-2213"></a>
## 创建知识库

<a id="t-qJUcpKSGtBjbJXO18YpPw6"></a>

<ol start="1"><li id="t-cZANuxwFurkXjSTQM3HC6T"><span>导航栏选择 Knowledge（知识库），点击 Create Knowledge（创建知识库）</span></li></ol>

<ol start="2"><li id="t-bDMCD09vHI30xH7KyxoKj3"><span>给知识库命名，如「产品手册」或「内部政策文件」</span></li></ol>

<ol start="3"><li id="t-TjqLDunqn1K2nBZZiFicbY"><span>选择创建方式</span></li></ol>

<div id="t-i2nBDoDsZyIR7ipYvymYwk"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/715380c56c80da421a605127.png"/></div>

<a id="t-MTTAE7oEy3oJ7qYwFajRea"></a>

##### 方式一：上传文件（最常用）

<p id="t-j2OMfUevKS1ZnNm529K9QN"><span style="border-bottom:1px solid">Dify 接受 PDF、Word（.docx）、Markdown（.md）、纯文本（.txt）、CSV 和 HTML 格式的文件。</span></p>

<p id="t-i91J62TliUWwLDNtkNXOBm"><span style="border-bottom:1px solid">推荐使用 Markdown 或纯文本，它们解析最可靠。</span></p>

<blockquote id="t-BQTNbaw9mEzmoGcVmVXANL"><p id="t-Wsgr816zvjxsfNUw8KMfaH"><span style="border-bottom:1px solid;font-style:italic">布局复杂或扫描版的 PDF 可能需要预处理，建议先用 OCR 工具提取文本后再上传。</span></p></blockquote>

<a id="t-ga7K06tnalflohALK3uLZG"></a>

##### 方式二：Knowledge Pipeline（企业级）

<p id="t-ahAwLGTQUyrbUFhPr1kvW5"><span style="border-bottom:1px solid">Knowledge Pipeline 是一个可视化的节点式编排系统，专门用于文档摄取处理。</span></p>

<p id="t-EMJqC0jWs4hriXnV8XsDdX"><span style="border-bottom:1px solid">它解决了传统 RAG 的三大痛点：分散的数据源、解析过程中的信息丢失（图表和公式被丢弃）、以及黑盒处理过程（难以诊断失败原因）。</span></p>

<a id="t-ymVEq15xp7LV09KT5WhBG1"></a>

##### 方式三：外部知识库 API

<p id="t-sMvjSjEdKaSnHWvrmlh8DD"><span style="border-bottom:1px solid">通过 API 同步现有的外部知识库，无需数据迁移。</span></p>


<a id="section-2214"></a>
## 文档分块策略

<a id="t-EcNdaHLAlQtIfytRlg4MXd"></a>

<p id="t-uSMluJUx4HPYMaN8yA0zSA"><span style="border-bottom:1px solid">上传后，Dify 会自动进行文本分块（Chunking）。关键参数说明如下：</span></p>

<div id="t-ETK8gEtY6LgBmloT0eoP9h"><table><colgroup><col width="120"/><col width="272.89752197265625"/><col width="162.00689697265625"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>参数</span></p></td><td style=" vertical-align: top"><p><span>说明</span></p></td><td style=" vertical-align: top"><p><span>推荐值</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">分块大小</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">每个 Chunk 的 Token 数</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">500-1000（中文）</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">分块重叠</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">相邻 Chunk 的重叠 Token 数</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">50-100</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">分隔符</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">按什么切割（段落/句子）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">段落</span></p></td></tr></tbody></table></div>

<blockquote id="t-zE2Mg0yjRL1imtiuuuxzv2"><p id="t-B2tiPywJI7AU8e372sjGBs"><span style="border-bottom:1px solid;font-style:italic">中文内容建议分块大小设置在 500 Token 左右。太长会让检索不够精准，太短会丢失上下文。</span></p></blockquote>


<a id="section-2215"></a>
## 索引模式

<a id="t-qY3f4TzsB5ArJ1mvy6oADK"></a>

<div id="t-OsmNtH6UBSwppKsRBb5Ebo"><table><colgroup><col width="132.89755249023438"/><col width="302.00689697265625"/><col width="170.00164794921875"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>模式</span></p></td><td style=" vertical-align: top"><p><span>说明</span></p></td><td style=" vertical-align: top"><p><span>成本</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">高质量（默认）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">使用 Embedding 模型生成向量，效果最好</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">消耗 Embedding API</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">经济模式</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">倒排索引（关键词匹配），无需 Embedding</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">免费</span></p></td></tr></tbody></table></div>


<a id="section-2216"></a>
## 检索配置

<a id="t-XZopzf50bjFPfpwYheDtiw"></a>

<p id="t-hAa7FxKZKoRozY1WblXvUv"><span style="border-bottom:1px solid">进入知识库，选择 Settings，配置检索参数：</span></p>

<div id="t-U5JsqFVHMxeQQi0DzPo66y"><table><colgroup><col width="155.89755249023438"/><col width="279.01904296875"/><col width="170.01019287109375"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>检索方式</span></p></td><td style=" vertical-align: top"><p><span>说明</span></p></td><td style=" vertical-align: top"><p><span>适用场景</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">向量检索</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">语义相似度匹配</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">意义相关的查询</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">全文检索</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">关键词匹配</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">精确词汇查询</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">混合检索（推荐）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">结合两者，并用重排序模型提升精度</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">通用场景</span></p></td></tr></tbody></table></div>

<p id="t-vwLW5cuCLv3zohBhz3D8Ym"><span style="border-bottom:1px solid">相似度阈值建议设置 0.5-0.7。</span></p>

<blockquote id="t-VWni9eeeL9f2aZQeDB4wBh"><p id="t-H3fn9VW7Y41mU6buGX2yXm"><span style="border-bottom:1px solid;font-style:italic">相似度阈值太高会导致无结果返回，太低会返回不相关内容。建议从 0.6 开始测试，根据效果微调。</span></p></blockquote>


<a id="section-2217"></a>
## 测试检索效果

<a id="t-VqJkYz6Zjkww5CLnfcr1RJ"></a>

<p id="t-31TV3Vn2danFaZCin0nk0u"><span style="border-bottom:1px solid">在知识库中点击 Retrieval Testing（检索测试），输入测试问题，直接查看返回的 Chunk，验证检索质量，无需真实发起对话。</span></p>


<a id="section-2218"></a>
## 将知识库关联到应用

<a id="t-qaIzWMVj8cwj39zaKfNtj4"></a>

<p id="t-nQn2Cw1EuJTcxlKUsinPdd"><span style="border-bottom:1px solid">在应用编辑页面，选择 Context（上下文），点击 Add（添加），选择已创建的知识库并保存。</span></p>

<p id="t-UtDGZNwyk53ShkxJELKnYn"><span style="border-bottom:1px solid">关联后，该应用的每次对话都会先检索知识库再回答。</span></p>


<a id="section-2219"></a>
## Workflow 工作流：可视化编排多步骤任务

<a id="t-y67hJmOiCbaSIUECC8VRTm"></a>

<p id="t-kBg1YSKTqy5kYwpMKya1c0"><span style="border-bottom:1px solid">通过拖拽节点和连线来定义多步骤的 AI 处理逻辑。</span></p>


<a id="section-2220"></a>
## 进入 Workflow 编辑器

<a id="t-vE8vX7Ctrq7f01mdHXzWW0"></a>

<p id="t-jLfODhdKqfz6fs7Ladcxc0"><span style="border-bottom:1px solid">创建应用时选择 Workflow，或在现有 Workflow 应用里点击 Edit（编辑）进入画布。</span></p>

<div id="t-5KhQ3gDTd3qofJM159zLHu"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/89f2901e1434e03acf5d0ced.png"/></div>


<a id="section-2221"></a>
## 主要节点类型

<a id="t-3AO2e6etiY8Bcbeq8pQaft"></a>

<p id="t-FbEWlnDwAiNk0KJ8fnblMM"><span style="border-bottom:1px solid">以下是 Workflow 编辑器中最常用的节点及其功能：</span></p>

<div id="t-dTKWpPZ8WCPrVU7FDrZnZv"><table><colgroup><col width="162.89755249023438"/><col width="203.89923095703125"/><col width="222.00677490234375"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>节点</span></p></td><td style=" vertical-align: top"><p><span>功能</span></p></td><td style=" vertical-align: top"><p><span>典型用途</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Start</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">流程入口，定义输入变量</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">接收用户输入或外部参数</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">LLM</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">调用语言模型</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">文本生成、分析、翻译</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Knowledge Retrieval</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">从知识库检索</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">RAG 场景</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">IF/ELSE</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">条件分支</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">根据内容路由不同处理路径</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Code</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">执行 Python 或 JS 代码</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">数据转换、格式处理、计算</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">HTTP Request</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">调用外部 API</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">查询数据库、发送通知</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Template</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">变量模板渲染</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">组合多个节点的输出</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Variable Assigner</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">设置/更新变量</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">跨节点传递数据</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Iteration</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">循环处理列表</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">批量处理多条数据</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Agent</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">内嵌 Agent 节点</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">让工作流中的某一步具备自主推理能力</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Human Input</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">暂停等待人工审核</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">人机协作的关键决策点</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">End</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">流程出口，定义输出</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">返回最终结果</span></p></td></tr></tbody></table></div>

<div id="t-08T54YAMwlR9vgZ76K5vDq"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/5862d1ced9557e5451c05251.png"/></div>


<a id="section-2222"></a>
## 节点间的变量传递

<a id="t-CeUH7qNYHt2l0YtaSZyN5u"></a>

<p id="t-zlsn1xF0CVpfZH1uwHcN0c"><span style="border-bottom:1px solid">每个节点的输出可以被后续节点引用，语法是 {{节点名.输出变量名}}。</span></p>

<p id="t-kD8wXvm3DlK0bR62r7YrI1"><span style="border-bottom:1px solid">以下是一个典型的 RAG 问答工作流的变量传递示例：</span></p>

<pre id="t-aZamfeKmi78BlcVvYV9qDc"><code>Start 节点输出 user_query
  ↓
Knowledge Retrieval 节点：
  输入：{{Start.user_query}}
  输出：result（检索结果）
  ↓
LLM 节点：
  System Prompt：你是一个客服助理，根据以下资料回答问题
  User：用户问题：{{Start.user_query}}
        参考资料：{{Knowledge Retrieval.result}}
  ↓
End 节点：
  返回：{{LLM.text}}</code></pre>


<a id="section-2223"></a>
## Human Input 节点（HITL）

<a id="t-dRy4Vk5WTRrVHVJsmNSSNG"></a>

<p id="t-rbaL2lXlEpxH4tItlbfnpT"><span style="border-bottom:1px solid">Human Input 节点是一项重大更新，它让工作流可以在关键决策点暂停执行。</span></p>

<p id="t-Kre5BpvzFs6x1PKLG2axtY"><span style="border-bottom:1px solid">该节点会生成一个 UI 界面供人工审查和修改变量（例如编辑草稿或纠正数据），然后根据自定义按钮（如「批准」、「拒绝」或「升级」）决定后续路径。</span></p>

<blockquote id="t-pRNWLOezPivsHvf7D9lbgH"><p id="t-m23WCSlS4nYMEcqiRdVFd8"><span style="border-bottom:1px solid;font-style:italic">这解决了之前工作流「要么完全自动化、要么完全手动」的二元困境，让高风险场景（合同审查、医疗建议、金融决策）也能用上自动化 AI。</span></p></blockquote>


<a id="section-2224"></a>
## 调试工作流

<a id="t-o3zRrNJxkiY6L1iK54CmMO"></a>

<p id="t-uYe3o4uWq7M4GnANhKAeYl"><span style="border-bottom:1px solid">画布右上角点击 Run（运行），输入测试参数，观察每个节点的输入/输出和耗时。</span></p>

<p id="t-iWHbFJq06fytEvfbMWJZ9i"><span style="border-bottom:1px solid">节点旁会出现绿色（成功）或红色（失败）标记，点击可查看详细执行日志。</span></p>


<a id="section-2225"></a>
## 场景实战一：企业内部知识问答机器人

<a id="t-pSwId1zZDxdwxr5bljHRGu"></a>

<p id="t-m3yKNu008GDPHrDrs8XoRx"><span style="border-bottom:1px solid">用 Dify 搭建一个能准确回答内部文档问题的聊天机器人，回答带来源引用。</span></p>


<a id="section-2226"></a>
## 业务背景

<a id="t-lTUx6eyiLkO0b6k9WcaWaR"></a>

<p id="t-OJnYJ8Qhz54VFQoBv6mePw"><span style="border-bottom:1px solid">公司有大量内部文档（HR 政策、产品手册、技术 Wiki），员工经常需要查找信息，但文档分散、搜索困难。</span></p>


<a id="section-2227"></a>
## 步骤一：准备知识库

<a id="t-P3crkJWG0JTBoZ9tplWwLY"></a>

<ol start="1"><li id="t-Dmb1STcKOEm46hJCktwDfP"><span>整理文档：把 HR 政策（PDF）、产品手册（Word）、技术 Wiki（Markdown）导出备用</span></li></ol>

<ol start="2"><li id="t-18QDxpwyoZuuGF0Bn5hXjC"><span>在 Knowledge 选择 Create Knowledge，命名「公司内部知识库」</span></li></ol>

<ol start="3"><li id="t-TgAtpNZDSEjV9xaEvVMF0A"><span>上传文件，选择高质量索引模式</span></li></ol>

<ol start="4"><li id="t-U9fEby2e2v3NAEot6p4K57"><span>等待向量化完成（进度条显示）</span></li></ol>

<blockquote id="t-xyihksBzKU3RcLjLADsjsm"><p id="t-pp5KryDUCEJDaSr42kDI3S"><span style="border-bottom:1px solid;font-style:italic">文档质量优化技巧：删除不相关的信息、页眉页脚和特殊字符。使用清晰的标题和简短段落。如果一个文档涵盖多个不同主题，考虑拆分成独立文件。</span></p></blockquote>


<a id="section-2228"></a>
## 步骤二：创建 Chatbot 应用

<a id="t-dBIeUFWkgyOJgq6ogUhSte"></a>

<ol start="1"><li id="t-DwO9Mt5BK1IOKgIOOC4a0L"><span>点击 Create App，选择 Chatbot，命名「内部助手」</span></li></ol>

<ol start="2"><li id="t-BlCAY9N5J4YfM6gHy2hnTu"><span>选择模型（推荐 Claude Sonnet 4.6 或 GPT-4o）</span></li></ol>

<ol start="3"><li id="t-ziuIDACtYsJ04CO7HpsIpM"><span>编写 System Prompt</span></li></ol>

<div id="t-TjWFHZByzPGgtwdThjOUiz"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/b1ba9b1ed15828d478c9cc2d.png"/></div>

<pre id="t-wFP5A4I61BVT3W7ng01CCX"><code>你是公司内部知识助手，专门帮助员工查找内部文档信息。

行为准则：
- 只根据提供的知识库内容回答，不要编造信息
- 回答时注明来源文档名称
- 如果知识库中没有相关信息，直接说"我在文档中没有找到相关信息"，并建议联系对应部门
- 使用简洁、专业的语言
- 不讨论公司机密以外的话题</code></pre>

<ol start="1"><li id="t-6JrxkJdX2KehT56jPR9qBm"><span>在 Context 中点击 Add，选择「公司内部知识库」</span></li></ol>

<ol start="2"><li id="t-idFV5Ek4mueTI211OW3bPT"><span>配置检索参数：混合检索，相似度阈值 0.6，返回 Top 5 片段</span></li></ol>


<a id="section-2229"></a>
## 步骤三：测试与调优

<a id="t-DuWh1PjCTWbDsR0DG1V8yD"></a>

<p id="t-4zKxutEh47OXgwk1jTIzM1"><span style="border-bottom:1px solid">用真实问题测试，以下是推荐的测试用例：</span></p>

<pre id="t-NTCnRODqG46Ip3mmCWYvBG"><code>测试问题示例：
"年假怎么申请？" → 应该从 HR 政策文档返回正确步骤
"产品 A 的定价是多少？" → 应该从产品手册返回准确价格
"如何配置 VPN？" → 应该从技术 Wiki 返回步骤
"CEO 是谁？" → 如果文档中没有，应该诚实说不知道</code></pre>

<a id="t-IaZMzj2axbWv3TLFs1sEK6"></a>

##### 常见调优操作

<div id="t-8zUekZNKkE1RBrhZoug1JZ"><table><colgroup><col width="120"/><col width="421.89752197265625"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>问题</span></p></td><td style=" vertical-align: top"><p><span>解决方案</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">答案不准</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">降低相似度阈值（如 0.5），增加返回 Chunk 数量</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">答案不相关</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">提高阈值（如 0.7），检查文档分块是否合理</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">答案不完整</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">增大分块大小，让每个 Chunk 包含更完整的段落</span></p></td></tr></tbody></table></div>


<a id="section-2230"></a>
## 步骤四：发布与集成

<a id="t-md9GMHFBEB7x90q39PjGts"></a>

<p id="t-3xHwv7a1d2t8BoQIlIRGXV"><span style="border-bottom:1px solid">发布为网页应用：应用页面选择 Overview，点击 Embedded，复制嵌入代码，粘贴到内部 Wiki 或 Intranet 页面。</span></p>

<p id="t-OoVyX6uzKEnwRdf7TEQTue"><span style="border-bottom:1px solid">发布为 API：应用页面选择 API Reference，复制 API Key，调用示例：</span></p>

<pre id="t-Cq9boNKWW2RFVve9E5GjwR"><code># 调用聊天 API，向知识问答机器人发送问题
curl -X POST 'https://api.dify.ai/v1/chat-messages' \
  -H 'Authorization: Bearer app-xxxxxxxx' \
  -H 'Content-Type: application/json' \
  -d '{
    "inputs": {},
    "query": "年假怎么申请？",
    "response_mode": "blocking",
    "user": "employee-001"
  }'</code></pre>


<a id="section-2231"></a>
## 场景实战二：自动化内容生成流水线

<a id="t-8SxgmPQn2r7XjRyy8hcj36"></a>

<p id="t-zNRLfcBWmvAHdfOT2wuyNM"><span style="border-bottom:1px solid">使用 Workflow 并行生成面向不同渠道的营销内容。</span></p>


<a id="section-2232"></a>
## 业务背景

<a id="t-7H85kXiJCrQfsvRUisGHQ6"></a>

<p id="t-rMNSITAvr9lSYrlIb9yyzI"><span style="border-bottom:1px solid">市场团队需要将产品更新日志（技术语言）批量转化为面向不同渠道的内容：微信公众号推文、技术博客、短视频脚本。</span></p>


<a id="section-2233"></a>
## 工作流设计

<a id="t-S4jzsuyzThEZJpngY6U3y6"></a>

<pre id="t-8k8LkDkU3t9ReFKfIsFuuX"><code>Start（输入：更新日志文本）
  ↓ 并行分支
  ├─→ LLM-1：生成微信推文（轻松活泼，500字，含表情符号）
  ├─→ LLM-2：生成技术博客（专业详细，1500字，含代码示例）
  └─→ LLM-3：生成短视频脚本（口语化，300字，分镜头格式）
  ↓ 合并
End（输出：三份内容）</code></pre>


<a id="section-2234"></a>
## 具体搭建步骤

<a id="t-RPf24x8ATnkNgmBLVRM2La"></a>

<p id="t-s9QzKwD6LCCJkIbJ14ktu6"><span style="border-bottom:1px solid">第一步：创建 Workflow 应用，命名「内容生成流水线」。</span></p>

<p id="t-YFxX42kOI2YoqXzHjcRG6c"><span style="border-bottom:1px solid">第二步：配置 Start 节点，添加输入变量：</span></p>

<div id="t-moPwxG6QAh4NzRpjm5hYxy"><table><colgroup><col width="173.90621948242188"/><col width="160.0086669921875"/><col width="178.00860595703125"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>变量名</span></p></td><td style=" vertical-align: top"><p><span>类型</span></p></td><td style=" vertical-align: top"><p><span>说明</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">update_content</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">文本类型</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">产品更新日志原文</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">product_name</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">文本类型</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">产品名称</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">version</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">文本类型</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">版本号</span></p></td></tr></tbody></table></div>

<p id="t-OyUrRz4u8TZj65tXZfNyM7"><span style="border-bottom:1px solid">第三步：添加三个 LLM 节点（并行）。</span></p>

<p id="t-rbmIKXJiJpOfQLZvgz7wKN"><span style="border-bottom:1px solid">将三个 LLM 节点都连接到 Start 节点，Dify 会自动并行执行。</span></p>

<p id="t-Hve6AXXXdRk3LovZFektw4"><span style="border-bottom:1px solid">LLM-1（微信推文）的 Prompt 示例：</span></p>

<pre id="t-9xazIjiD69BfrL39e1INsU"><code>你是一位擅长社交媒体写作的内容创作者。

请将以下 {{product_name}} v{{version}} 的更新日志改写成微信公众号推文：
- 字数：400-600字
- 语气：轻松活泼，贴近用户
- 结构：开头吸引眼球，中间介绍亮点，结尾引导互动
- 适当使用 emoji
- 不要使用技术术语，用用户能理解的语言

更新日志原文：
{{Start.update_content}}</code></pre>

<p id="t-S8tUgv2CtIDVXN20aCP3rR"><span style="border-bottom:1px solid">LLM-2（技术博客）和 LLM-3（短视频脚本）类似配置，调整 Prompt 和模型即可。</span></p>

<p id="t-83fEpORZshrX2Cjlc2xvQ6"><span style="border-bottom:1px solid">第四步：添加 End 节点，输出变量配置：</span></p>

<pre id="t-GkBWWLO8sDvO1irC8Js1Og"><code>wechat_post：引用 {{LLM-1.text}}
tech_blog：引用 {{LLM-2.text}}
video_script：引用 {{LLM-3.text}}</code></pre>

<p id="t-QTW3TdkLIHLWuveQF8f8rx"><span style="border-bottom:1px solid">第五步：通过 API 集成到内部工具。</span></p>


<a id="section-2235"></a>
## 实例

<a id="t-9OQgXg8ZO14Rqau571C0hJ"></a>

<pre id="t-9I5de3akUXg3Tlm5bos33J"><code>import requests

def generate_content(update_content: str, product_name: str, version: str):
 """调用 Dify Workflow API 批量生成多版本内容"""
 # API 地址：使用你的 Dify 实例域名替换 api.dify.ai
    url = "https://api.dify.ai/v1/workflows/run"
 # 请求头：替换为你的应用 API Key
    headers = {
 "Authorization": "Bearer app-xxxxxxxx", # 必填：应用 API Key
 "Content-Type": "application/json"
 }
 # 请求体：传入 Start 节点定义的三个输入变量
    payload = {
 "inputs": {
 "update_content": update_content, # 更新日志原文
 "product_name": product_name, # 产品名称
 "version": version                 # 版本号
 },
 "response_mode": "blocking", # 阻塞模式，等待完整结果
 "user": "content-team" # 用户标识，用于日志追踪
 }
    response = requests.post(url, headers=headers, json=payload)
 # 从响应中提取 outputs 字段，包含三个 LLM 节点的生成结果
 return response.json()["data"]["outputs"]</code></pre>


<a id="section-2236"></a>
## 场景实战三：客服支持 Agent（含 Human-in-the-Loop）

<a id="t-CPuTKdVAeIRFnqI4wprKtx"></a>

<p id="t-NrGaWhFcHFrVFK9FfwRT8p"><span style="border-bottom:1px solid">搭建智能客服工单处理系统，AI 自动处理标准问题，复杂问题转人工并附带预分析。</span></p>


<a id="section-2237"></a>
## 业务背景

<a id="t-ymp3XsI2nvZa0dQCxO9qrh"></a>

<p id="t-jCEe8sUFqQVLRH3xmlToie"><span style="border-bottom:1px solid">电商平台的客服工单日均 500+，大部分是标准问题（物流查询、退货政策），但约 20% 需要人工处理（复杂投诉、大额退款）。</span></p>


<a id="section-2238"></a>
## 工作流设计

<a id="t-Pfq4BBpBjx3Qvrgf6he7Qy"></a>

<pre id="t-7babOAfvlqdCqwblzbvjXa"><code>Start（接收用户工单：问题类型 + 内容 + 订单号）
  ↓
LLM-分类：判断问题类型（standard / complex）
  ↓
IF/ELSE：问题类型是否为 standard？
  ├─ standard →
  │    Knowledge Retrieval（从客服知识库检索）
  │      ↓
  │    LLM-回复：生成标准回答
  │      ↓
  │    End（直接回复用户）
  │
  └─ complex →
       LLM-预分析：生成问题摘要和建议处理方案
         ↓
       Human Input（人工审核，可编辑 AI 建议，选择"批准"/"修改"/"升级"）
         ↓
       End（发送经过人工确认的回复）</code></pre>


<a id="section-2239"></a>
## 关键节点配置

<a id="t-98jXlqbxh5A4RKnT6uuauC"></a>

<p id="t-JnY2slYpmiLfT8kuC0boAv"><span style="border-bottom:1px solid">分类 LLM 节点（输出结构化 JSON）：</span></p>


<a id="section-2240"></a>
## 实例

<a id="t-zzY7V5pvCDBE9EtgetMhGw"></a>

<p id="t-beNQ8RkdviwGo2sKTiSDh6"><span style="border-bottom:1px solid">{</span></p>

<p id="t-7iQ9EfbnOZk4YBvYgJh59v"><span style="border-bottom:1px solid">Human Input 节点配置：</span></p>

<div id="t-X3dQwzSdwqJWjb27r3ybh7"><table><colgroup><col width="120"/><col width="120"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>配置项</span></p></td><td style=" vertical-align: top"><p><span>说明</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">显示内容</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">AI 预分析结果 + 建议回复草稿</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">可编辑字段</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">回复内容、优先级</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">自定义按钮</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">批准（按 AI 建议回复）、修改后批准（人工编辑后回复）、升级处理（转专项处理团队）</span></p></td></tr></tbody></table></div>


<a id="section-2241"></a>
## 效果预期

<a id="t-UgB42f0BN9IKkxMPZwSzUZ"></a>

<div id="t-WNXuTD0jaiTcfgJVRpTgdk"><table><colgroup><col width="120"/><col width="120"/><col width="120"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>工单类型</span></p></td><td style=" vertical-align: top"><p><span>处理方式</span></p></td><td style=" vertical-align: top"><p><span>效果提升</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">标准问题（约 80%）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">AI 全自动处理</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">响应时间从 4 小时降到 30 秒</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">复杂问题（约 20%）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">AI 辅助人工，提供分析和草稿</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">人工处理时间减少 60%</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">整体</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">-</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">工单处理效率提升约 3 倍</span></p></td></tr></tbody></table></div>


<a id="section-2242"></a>
## 对外发布：API、网页嵌入与 MCP 服务器

<a id="t-nZxaSTSahmowcFH93aUXtg"></a>

<p id="t-1rY25B8Cdt3ihCQ0AfiynV"><span style="border-bottom:1px solid">将 Dify 应用发布到外部系统，支持 API 调用、网页嵌入和 MCP 服务器三种方式。</span></p>


<a id="section-2243"></a>
## 发布为 API

<a id="t-SBtigdXofExsG0qLAs2Dl5"></a>

<p id="t-1BjCDqInulzB4KOX3u27z2"><span style="border-bottom:1px solid">每个 Dify 应用都自动拥有 REST API。在应用页面选择 API Access（API 访问）获取。</span></p>

<p id="t-PKZIM1fy2QCOvrqezgyqGV"><span style="border-bottom:1px solid">聊天应用 API 调用示例：</span></p>

<pre id="t-4UJ8orZLHBoccIuGURjASv"><code># 调用聊天 API（流式返回模式）
curl -X POST 'https://api.dify.ai/v1/chat-messages' \
  -H 'Authorization: Bearer {API_KEY}' \
  -H 'Content-Type: application/json' \
  -d '{
    "inputs": {},
    "query": "你好",
    "response_mode": "streaming",
    "conversation_id": "",
    "user": "user-001"
  }'</code></pre>

<p id="t-N7MGWqjGM8X3puOS7QBr2V"><span style="border-bottom:1px solid">工作流应用 API 调用示例：</span></p>

<pre id="t-6dfpiyl2RnkgoKWWeJD8YI"><code># 调用 Workflow API（阻塞模式）
curl -X POST 'https://api.dify.ai/v1/workflows/run' \
  -H 'Authorization: Bearer {API_KEY}' \
  -H 'Content-Type: application/json' \
  -d '{
    "inputs": {"your_variable": "your_value"},
    "response_mode": "blocking",
    "user": "user-001"
  }'</code></pre>

<blockquote id="t-OML5H6qAF9FjuF8OwAPq2Q"><blockquote id="t-rcME24GQDM8aQk77U7MwrQ"><span style="border-bottom:1px solid;font-style:italic">API Key 格式以 app- 开头。确保在请求头中以 Authorization: Bearer 方式传递，而不是作为查询参数。每个 API Key 只对应一个具体应用，不同应用的 Key 不通用。</span></blockquote></blockquote>


<a id="section-2244"></a>
## 网页嵌入

<a id="t-pWrHdRJMc19oTFi55Kh6Wz"></a>

<p id="t-bB6a4VIW4d3E9gdlrFGycl"><span style="border-bottom:1px solid">在应用页面选择 Overview，点击 Embedded，提供三种嵌入方式：</span></p>

<p id="t-pGbgj7eA8qqvdEmotQTzEb"><span style="border-bottom:1px solid">方式一：iframe 嵌入</span></p>


<a id="section-2245"></a>
## 实例

<a id="t-IbrTVczHaEJBFazw1VijlG"></a>

<pre id="t-PA7a0j8yrwtDRq7c6ad3Wq"><code>&lt;!-- iframe 嵌入方式，适合直接集成到现有网页 --&gt;
&lt;iframe
  src="https://udify.app/chatbot/xxxxxxxx"
  style="width: 100%; height: 100%; min-height: 700px"
  frameborder="0"
  allow="microphone"&gt;
&lt;/iframe&gt;</code></pre>

<p id="t-yaa5MXuVZp3k2kxoEfzEgT"><span style="border-bottom:1px solid">方式二：气泡按钮（悬浮在网页右下角）</span></p>


<a id="section-2246"></a>
## 实例

<a id="t-bHfyOxlhPkAHNpIWGjYQ8c"></a>

<pre id="t-UiopG6tb47Pg5GTcZwpbRP"><code>&lt;!-- 气泡按钮嵌入，悬浮在网页右下角，点击弹出聊天窗口 --&gt;
&lt;script&gt;
  window.difyChatbotConfig = { token: 'xxxxxxxx' }
&lt;/script&gt;
&lt;script
  src="https://udify.app/embed.min.js"
 id="xxxxxxxx"
  defer&gt;
&lt;/script&gt;</code></pre>

<p id="t-LrMFEcxH4iTYez0l8rk48t"><span style="border-bottom:1px solid;font-style:italic">&lt;!-- 气泡按钮嵌入，悬浮在网页右下角，点击弹出聊天窗口 --&gt;</span></p>


<a id="section-2247"></a>
## 发布为 MCP 服务器

<a id="t-VTTOHJVD2pS7dEBgaKzwfR"></a>

<p id="t-0KwrZFfINFrXussyOWQbqh"><span style="border-bottom:1px solid">Dify 支持将构建好的工作流或 Agent 发布为标准 MCP 服务器，支持预授权和免鉴权模式。</span></p>

<p id="t-SAnG5k46xrUZRapi1ZVoLe"><span style="border-bottom:1px solid">这意味着：你在 Dify 里搭建的知识库问答应用，可以直接成为 Claude Code、Cursor、omp 等 AI 编程工具的一个工具节点，无缝集成到开发工作流里。</span></p>

<p id="t-7okt3VZRk7YwNqDfRmqKPc"><span style="border-bottom:1px solid">操作路径：应用中选择 Publish，点击 MCP Server。</span></p>


<a id="section-2248"></a>
## 可观测性：监控与持续优化

<a id="t-5SJ4Pht2Bzst5jknHKe7tk"></a>

<p id="t-luMcXKmU17DratORLLHq53"><span style="border-bottom:1px solid">通过日志、标注、统计和外部平台集成，持续监控和优化 AI 应用的表现。</span></p>


<a id="section-2249"></a>
## 查看应用日志

<a id="t-meQy91CO9nxokAFL63pibP"></a>

<p id="t-w1kS4TQVQ7NYqu9lz0LT1H"><span style="border-bottom:1px solid">在应用页面选择 Logs（日志），可以查看每次对话的完整输入/输出、Token 用量（输入和输出分别统计）、响应时间、模型和参数信息。</span></p>


<a id="section-2250"></a>
## 给对话打标注

<a id="t-RNYz1PqE24brvpviyDrps2"></a>

<p id="t-OPVzNnKY7NkooNRCMkxd7D"><span style="border-bottom:1px solid">在日志里点击具体对话，点击回答旁的点赞或点踩按钮，可以添加理想回答作为标注。</span></p>

<p id="t-QhuvxZASeO2pWGtnDgSyS8"><span style="border-bottom:1px solid">标注数据的用途包括：通过标注构建微调数据集、识别知识库缺失的覆盖领域、发现频繁出错的问题类型。</span></p>


<a id="section-2251"></a>
## 应用数据统计

<a id="t-qoc4rpOlNsh4tlY88XELXU"></a>

<p id="t-bIg8iMF2TdR986JhbOaMiw"><span style="border-bottom:1px solid">在应用页面选择 Overview，点击 Analytics（数据分析），可以查看：</span></p>

<div id="t-gA4id3XHP1dTpAM52W632i"><table><colgroup><col width="120"/><col width="120"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>统计项</span></p></td><td style=" vertical-align: top"><p><span>说明</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">对话数量趋势</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">日/周/月维度的对话量变化</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">平均 Token 消耗</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">单次对话的 Token 用量均值</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">用户满意度评分</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">点赞/点踩分布统计</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">活跃用户数</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">使用该应用的去重用户数</span></p></td></tr></tbody></table></div>


<a id="section-2252"></a>
## 集成外部观测平台

<a id="t-Y9ebsXWILzLwQnXP69VFjY"></a>

<p id="t-ZpppZCyFnDiiMb9owXM5Rh"><span style="border-bottom:1px solid">Dify 支持 Opik、Langfuse 和 Arize Phoenix 等观测平台。</span></p>

<p id="t-E0xUBp0cVn6fZmgk5Hr73K"><span style="border-bottom:1px solid">以 Langfuse 为例：在 Settings 中选择 Monitoring，选择 Langfuse，输入 Public Key 和 Secret Key 后保存。之后所有应用的调用链路会自动同步到 Langfuse，可以查看完整的 Span 追踪和 Token 开销明细。</span></p>


<a id="section-2253"></a>
## 持续优化循环

<a id="t-FaPsrFLB40CVcOe8rrTtNH"></a>

<p id="t-JaL1BPV7lEWecyFXQeST2s"><span style="border-bottom:1px solid">推荐建立以下持续优化流程：</span></p>

<pre id="t-30b4LBYwVNFZRYS8pf2QXK"><code>部署上线
  ↓
收集对话日志（1-2 周）
  ↓
分析差评对话：哪些问题回答得不好？
  ↓
改进知识库（补充文档、调整分块）或优化 Prompt
  ↓
A/B 测试：对比改进前后的效果
  ↓
再次部署</code></pre>


<a id="section-2254"></a>
## 费用与套餐

<a id="t-3JjmdRAyUzYzYt0cHdBENZ"></a>

<p id="t-LKZ6D3DF2wtYsa1GqGrwPk"><span style="border-bottom:1px solid">了解 Dify Cloud 和自托管的费用结构，选择最适合你的方案。</span></p>


<a id="section-2255"></a>
## Dify Cloud 套餐

<a id="t-wMHDegNP1oyI5uk0veWcpt"></a>

<div id="t-9nzTyTZwYTH2G1zTS2m0QR"><table><colgroup><col width="120"/><col width="120"/><col width="120"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>套餐</span></p></td><td style=" vertical-align: top"><p><span>月费</span></p></td><td style=" vertical-align: top"><p><span>说明</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Sandbox</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">免费</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">200 消息/月，5 个应用，适用体验场景</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Professional</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">$59/月</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">5,000 消息/月，50 个应用，支持团队协作</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Team</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">$159/月</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">10,000 消息/月，无限应用，优先支持</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Enterprise</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">定制</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">无限使用，私有部署选项，SLA 保障</span></p></td></tr></tbody></table></div>


<a id="section-2256"></a>
## 自托管成本

<a id="t-WQEiSglvveqkwG0bSSeiyb"></a>

<p id="t-Frv0XWnhUmDPKxgFr094m6"><span style="border-bottom:1px solid">自托管社区版完全免费，无任何使用限制。</span></p>

<p id="t-rPAdoWQv3DZtokeAOZwfUJ"><span style="border-bottom:1px solid">你只需要支付服务器托管费用（一台 VPS 约 $5-50/月）以及 AI 模型的 API 调用费用。</span></p>

<p id="t-ZInFwdQovgQ8QTYTs4dcGw"><span style="border-bottom:1px solid">费用估算（自托管，10,000 次对话/月）：</span></p>

<div id="t-df6YPMJmqEUEzp7hKjQvYm"><table><colgroup><col width="120"/><col width="120"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>组件</span></p></td><td style=" vertical-align: top"><p><span>费用估算</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">VPS（4 核 8 GB）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">$20-40/月</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Claude Sonnet 4.6（每次对话约 1K Token）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">~$30/月</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Embedding（text-embedding-3-small）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">~$2/月</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">合计</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">~$52-72/月</span></p></td></tr></tbody></table></div>

<p id="t-koNPiUv1dDkDAQEMvDgqOp"><span style="border-bottom:1px solid">对比 Dify Cloud Professional（$59/月，还需加上模型 API 费用），自托管在大量使用时通常更经济。</span></p>


<a id="section-2257"></a>
## 降低成本的技巧

<a id="t-sTihwrLhYbKksUEhomquKk"></a>

<div id="t-fiB2PwkPGGfjf6xfdwJAzk"><table><colgroup><col width="120"/><col width="120"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>技巧</span></p></td><td style=" vertical-align: top"><p><span>说明</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">知识库用经济模式索引</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">已有关键词搜索够用时，无需向量化</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">选择合适的模型</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">简单问答用 GPT-4o-mini 或 Gemini Flash，复杂任务再用旗舰模型</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">设置 Token 上限</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">在 LLM 节点设置 max_tokens，防止单次调用过长</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">启用缓存</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">相似问题自动复用上一次的回答（Prompt Cache）</span></p></td></tr></tbody></table></div>


<a id="section-2258"></a>
## 常见问题与排查

<a id="t-3n6seop4La8jXSgDnFfIfR"></a>

<p id="t-3ChEbpCTnBvg9QOaotXyzV"><span style="border-bottom:1px solid">涵盖启动、知识库检索、API 调用和工作流四大类常见问题的排查方法。</span></p>


<a id="section-2259"></a>
## 启动问题

<a id="t-1uJL5CmeZLDKU3XK09u7N6"></a>

<p id="t-y4zabyb8yrB662eH7dqRML"><span style="border-bottom:1px solid">问题：docker compose up -d 后服务不健康</span></p>


<a id="section-2260"></a>
## 实例

<a id="t-m05iScVxqfEVQ3fkKiImLH"></a>

<pre id="t-4O9vptJAWPc0loScBP4SPk"><code># 查看 api 容器日志，定位具体错误
docker compose logs api

# 查看 worker 容器日志
docker compose logs worker

# 检查内存是否充足（至少需要 4 GB）
free -h

# 检查端口是否被占用（80 或 443）
sudo lsof -i :80</code></pre>

<p id="t-rQtPYhSpp70KNJ8jjzYRLK"><span style="border-bottom:1px solid;font-style:italic"># 查看 api 容器日志，定位具体错误</span></p>


<a id="section-2261"></a>
## 实例

<a id="t-ic5cUppHdkDHbYSMAcLKcY"></a>

<pre id="t-mB7RRGjujqMTf4jU4oMcKZ"><code># 等待所有容器完全启动（通常需要 1-2 分钟）
docker compose ps

# 确认 api、web、worker 全部为 healthy 状态后重新访问</code></pre>


<a id="section-2262"></a>
## 知识库检索问题

<a id="t-XBm6okJmWz0ls2Nhv9OMy2"></a>

<p id="t-SDm2lbevs75aRLZozvEYAY"><span style="border-bottom:1px solid">问题：知识库检索不到相关内容</span></p>

<p id="t-QfFfOkpXao0khMi8vaSOUT"><span style="border-bottom:1px solid">排查步骤：</span></p>

<ol start="1"><li id="t-oaveCUVuJPp7yn95CBxATq"><span>在知识库中点击 Retrieval Testing，测试具体问题，确认能否检索到</span></li></ol>

<ol start="2"><li id="t-YvWCCAX7IHe1n2q0W4KOFF"><span>如果检索不到：调低相似度阈值（从 0.6 降到 0.3），测试是否有结果</span></li></ol>

<ol start="3"><li id="t-DlzIJLG6DEy9GgxylcFUCT"><span>如果仍无结果：确认 Embedding 模型配置正确，知识库索引是否完成</span></li></ol>

<ol start="4"><li id="t-CoIqguWMZyOE3VO5TSVXpy"><span>如果有结果但内容不对：检查文档分块策略，考虑手动拆分大文件</span></li></ol>

<p id="t-rLgcJOljMFnVtYj7vunxDj"><span style="border-bottom:1px solid">问题：RAG 返回内容不相关</span></p>

<blockquote id="t-TD79jX5LM0fvlkFvw6qjCI"><blockquote id="t-cDxFhTpxgHQXkPlX4ue9Ba"><span style="border-bottom:1px solid;font-style:italic">检查检索到的 Chunk 内容。如果 Chunk 不相关，减小分块大小并提高分数阈值。如果没有返回 Chunk，阈值可能设置过高，暂时降低到 0.3 再测试。同时确认知识库已经关联到应用的编排面板中。</span></blockquote></blockquote>


<a id="section-2263"></a>
## API 调用问题

<a id="t-9bQnoxFLxEyvJdJ2ENiG9W"></a>

<p id="t-jFSMnojSUKxz7deZKSM3fZ"><span style="border-bottom:1px solid">问题：API 返回 401 Unauthorized</span></p>

<blockquote id="t-1RrQuhMYBmQu2ZMPObbWVo"><blockquote id="t-fRbygtBkdG6zkkki1hjBh9"><span style="border-bottom:1px solid;font-style:italic">验证 API Key 格式——Dify 应用 API Key 以 app- 开头。确保在请求头中以 Authorization: Bearer 方式传递，而不是作为查询参数。还要确认这个 API Key 属于正确的应用——Key 是应用级别的，不同应用的 Key 不通用。</span></blockquote></blockquote>

<p id="t-scvx4jz1Jz5HVHVqGuXLSA"><span style="border-bottom:1px solid">问题：流式响应中途截断</span></p>

<p id="t-O7qCOgPSgAFMJnctJMBEAn"><span style="border-bottom:1px solid">这通常是超时问题。检查反向代理的超时设置——Nginx 默认 60 秒，对复杂工作流可能不够。</span></p>

<pre id="t-qWIoiJ3khV9MtzdEtKNQSc"><code># nginx.conf 中增加超时配置，确保长时间运行的工作流不被中断
proxy_read_timeout 300s;
proxy_connect_timeout 300s;
proxy_send_timeout 300s;</code></pre>


<a id="section-2264"></a>
## 工作流问题

<a id="t-3gNQHYtamnJvh1yEs3PPkI"></a>

<p id="t-s5E4apG9H2HssqqIs5rfQf"><span style="border-bottom:1px solid">问题：工作流某个节点报错</span></p>

<p id="t-NayFRb3s0D3BJ4pZ30Ke75"><span style="border-bottom:1px solid">排查步骤：</span></p>

<ol start="1"><li id="t-LhENAMKbuETgbIhQfLEWJ2"><span>打开调试面板，查看报错节点的输入/输出</span></li></ol>

<ol start="2"><li id="t-2eEpxfEbs101TaDvwjEdmW"><span>点击节点旁的红色标记，查看详细错误信息</span></li></ol>

<ol start="3"><li id="t-8rpjJkTTWeg0agbvsDHyAa"><span>常见原因：变量引用路径错误（检查 {{节点名.变量名}} 的拼写）</span></li></ol>


<a id="section-2265"></a>
## 资源

<a id="t-be8BHLakujhptNo0V0Dhos"></a>

<p id="t-AgETEX0Gn3TrETJlVqCUIV"><span style="border-bottom:1px solid">推荐学习路径和相关资源，帮助你从入门到精通。</span></p>


<a id="section-2266"></a>
## 推荐学习路径

<a id="t-ohJg2nMy7yJrmEdtYOj6O8"></a>

<pre id="t-Qhb70xglLPag2ZySZR2LWD"><code>注册 Dify Cloud，用 Sandbox 体验
    ↓
配置自己的模型提供商（Anthropic 或 OpenAI）
    ↓
创建第一个知识库，上传 5-10 个文档，测试检索效果
    ↓
创建 Chatbot 应用，关联知识库，完成场景实战一
    ↓
学习 Workflow，完成场景实战二（内容生成流水线）
    ↓
探索 Human Input 节点，完成场景实战三（客服 Agent）
    ↓
用 Docker Compose 搭建本地/服务器自托管版本
    ↓
通过 API 将 Dify 应用集成到现有系统
    ↓
探索 MCP Server 发布，接入 AI 编程工具生态</code></pre>


<a id="section-2267"></a>
## 官方资源

<a id="t-RqCK2HSgsAo5ZaxrkON9v0"></a>

<div id="t-EvVGs3gDoecV01Ipp1SIXo"><table><colgroup><col width="150.89755249023438"/><col width="181.01031494140625"/><col width="274.0050048828125"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>资源</span></p></td><td style=" vertical-align: top"><p><span>链接</span></p></td><td style=" vertical-align: top"><p><span>说明</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">官网</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">dify.ai</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">产品信息和注册入口</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">文档</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">docs.dify.ai</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">完整的产品使用文档</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">GitHub</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">github.com/langgenius/dify</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Apache 2.0 开源，可查看源码和提交 Issue</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Discord 社区</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">discord.gg/FngNHpbcY7</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">与社区成员和官方团队交流</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">模板市场</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">应用内 Templates</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">直接使用社区分享的工作流模板</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Dify Blog</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">dify.ai/blog</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">功能更新和使用案例</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">知识库 FAQ</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">docs.dify.ai/faq</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">常见问题官方解答</span></p></td></tr></tbody></table></div>


<a id="section-2268"></a>
## n8n 入门教程

<a id="t-block-25422"></a>

<p id="t-tcmPk1SA3jO3KLAfRFMekk"><span>n8n（读作 "n-eight-n"，意为 "nodemation"）是目前最受技术团队青睐的开源工作流自动化平台。</span></p>

<p id="t-9F9nd9OASWPnNArDP6wOTN"><span>n8n 的核心优势是：可视化画布 + 原生代码支持 + 完全自托管——既能让非开发者拖拽搭建，又能让开发者在任意节点写 JavaScript 或 Python，而且可以运行在你自己的服务器上，数据在本地。</span></p>

<p id="t-Gm9UduQ86bp2G14hFx56iz"><span>n8n 是一个工作流自动化平台，让你能够将 AI 安全可控地集成到工作和流程中。</span></p>

<p id="t-NAOFqrYnG5KhnVLeXtqt2l"><span>n8n 把可视化构建体验与代码能力结合在一起——可以在工作流的任意地方写 JavaScript 或 Python，在每个步骤的输入输出旁边即时查看结果。</span></p>

<div id="t-z1CYxf5YnuoYzbGvqqApPZ"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/ae95bdafe90d351be28f163e.png"/></div>


<a id="section-2269"></a>
## Dify 与 n8n 的区别

<a id="t-zrijZokCzlHfl12FOWPcms"></a>

<p id="t-i3b74eo35DSjDsWgN6bzX0"><span style="border-bottom:1px solid">和 Dify 不同，n8n 的核心是通用自动化和系统集成，AI 是其中一个强大的组件，而 Dify 的核心是 AI 应用开发，自动化是辅助能力。</span></p>

<p id="t-62J1sHrFIbSkT7NEUGmgql"><span style="border-bottom:1px solid">简单说：</span></p>

<ul><li id="t-LVhaIXMIAm4xCOh9u1XHjc"><span>需要把多个 SaaS 系统连接起来、数据在系统间流转：n8n 是更好的选择</span></li></ul>

<ul><li id="t-NwNOefpV23DtEwGpk92C7E"><span>需要搭建一个以 AI 对话为核心的应用（客服机器人、RAG 问答）：Dify 是更好的选择</span></li></ul>


<a id="section-2270"></a>
## 适合谁用

<a id="t-frCQxp1J9wmafzCDaOfTAE"></a>

<p id="t-JHAjF4jvnVJ9MBaMYYtb1A"><span style="border-bottom:1px solid">n8n 的视觉界面让非开发者可以快速设计和测试工作流，随着复杂度增加，开发者可以用 Function 节点、外部脚本或自定义集成来扩展。</span></p>

<p id="t-y4bqX0jwH2nq3xZhn2qari"><span style="border-bottom:1px solid">这让团队可以增量式地叠加结构、验证和控制。</span></p>

<p id="t-e4gpCJKdlRkO0IE1faijkh"><span style="border-bottom:1px solid">最典型的用户群：</span></p>

<div id="t-vE6DLi2zQ4amj3sBsam36p"><table><colgroup><col width="165.8992919921875"/><col width="375.8992919921875"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>用户群</span></p></td><td style=" vertical-align: top"><p><span>典型场景</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">运营团队</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">自动化 CRM 更新、报表生成、邮件发送</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">开发者</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">API 集成、数据管道、内部工具自动化</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">数据工程师</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">ETL 流水线、数据清洗、定时同步</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">IT 团队</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">监控告警、事件响应、用户管理</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">技术创业公司</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">快速构建 MVP 的后端自动化层</span></p></td></tr></tbody></table></div>


<a id="section-2271"></a>
## 核心概念

<a id="t-136gv170qCVNXFGJPTIYm6"></a>

<p id="t-xqeER7mq9AqJc3Q3Ybr7kJ"><span style="border-bottom:1px solid">在开始学习前，我们先理解这几个核心概念。</span></p>


<a id="section-2272"></a>
## 工作流（Workflow）

<a id="t-BbtKuPBeIvtsgAVWMxwUra"></a>

<p id="t-CNUwXZEabhnwwSXDqjXXlz"><span style="border-bottom:1px solid">一个工作流是一系列节点的有向图，定义了「当 X 发生时，执行 Y，然后执行 Z」的逻辑。</span></p>

<p id="t-0Z1jUvacOPZwXJxiLOMpnZ"><span style="border-bottom:1px solid">工作流有两种状态：激活（Active）时响应触发器自动运行，非激活（Inactive）时只能手动执行用于测试。</span></p>


<a id="section-2273"></a>
## 节点（Node）

<a id="t-yWKDD3GC3GpNhfLh7sWock"></a>

<p id="t-8a2OnKSSfbpniH8HQgdCEE"><span style="border-bottom:1px solid">工作流的基本构建块，每个节点执行一个具体操作：</span></p>

<div id="t-e8UwwE4DEj9VgVz0L8MLMl"><table><colgroup><col width="161.8992919921875"/><col width="120"/><col width="292.8992919921875"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>节点类型</span></p></td><td style=" vertical-align: top"><p><span>颜色</span></p></td><td style=" vertical-align: top"><p><span>说明</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">触发器节点</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">橙色</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">工作流的起点，定义何时触发</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">常规节点</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">蓝色</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">处理数据、调用 API、执行逻辑</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">AI 相关节点</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">紫色</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">LLM 调用、向量存储、Agent</span></p></td></tr></tbody></table></div>


<a id="section-2274"></a>
## 执行（Execution）

<a id="t-oFgYHZ6c6SRNfhoyZY2ewI"></a>

<p id="t-hLDkJDO2AdZzdUJTFnBcvp"><span style="border-bottom:1px solid">工作流的一次完整运行叫做一次执行。</span></p>

<blockquote id="t-3w6acCVLebDAZJSH7cII7k"><p id="t-AjtGxAVmXfd2T5GPgObsrx"><span style="border-bottom:1px solid;font-style:italic">n8n 的执行计费方式是：一次执行 = 工作流跑一遍，无论里面有多少个步骤或处理多少数据。</span></p></blockquote>


<a id="section-2275"></a>
## 连接（Connection）

<a id="t-5ZwkrD8NtnIc8f9Cdn5ven"></a>

<p id="t-QQzht5uuF6I2nTEuoT9Zz9"><span style="border-bottom:1px solid">节点之间的箭头，定义数据流向和执行顺序。一个节点可以有多个输出，实现分支逻辑。</span></p>


<a id="section-2276"></a>
## 凭证（Credential）

<a id="t-kOZzJ5RpTyhLDF4mMyHvSE"></a>

<p id="t-taed4zx3hq8ReplQ4gDXkn"><span style="border-bottom:1px solid">存储 API Key、OAuth Token、数据库密码等敏感信息的安全容器。</span></p>

<p id="t-4Wcleyv8FHWFABwzpiUZFI"><span style="border-bottom:1px solid">凭证加密存储，可以被多个工作流共用，不会在工作流 JSON 里明文暴露。</span></p>


<a id="section-2277"></a>
## 表达式（Expression）

<a id="t-o9HBS5wsEOp3GcJArxXNC9"></a>

<p id="t-vW0T5D6jurG0Y31xpDO1yE"><span style="border-bottom:1px solid">n8n 的动态值语法，用双花括号包裹：</span><span style="border-bottom:1px solid;font-weight:bold">{{ $json.fieldName }}</span><span style="border-bottom:1px solid">。</span></p>

<p id="t-rnDXf6meuwTCE1cRd1tkwH"><span style="border-bottom:1px solid">让节点参数可以引用上游节点的输出，而不是固定值。</span></p>


<a id="section-2278"></a>
## 安装与启动

<a id="t-T6xDTJCpPbOeBB5bezDNSN"></a>

<p id="t-sHRXgPFP4kdRKbvZlTfl87"><span style="border-bottom:1px solid">五种安装方式，从本地快速体验到企业级高可用部署。</span></p>


<a id="section-2279"></a>
## 方式一：本地快速体验（最快，5 分钟）

<a id="t-YUdEyEFfaarTMCCmG874cB"></a>

<p id="t-Zc3XYGj7NEYhrdpENcEYxf"><span style="border-bottom:1px solid">使用 npx 或全局安装，无需额外配置。</span></p>

<pre id="t-cQTXqJCKdIyqrPogrAq4GA"><code># 使用 npx，无需安装（需要 Node.js 18+）
npx n8n

# 或全局安装
npm install -g n8n
n8n start</code></pre>

