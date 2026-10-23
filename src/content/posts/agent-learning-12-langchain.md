---
title: "第 12 章 · LangChain 开发"
date: "2026-10-22"
draft: false
author: "学习资料整理"
description: "模型、消息、工具、智能体、流式、中间件与运行时"
tags: ["Agent", "学习路线"]
categories: ["AI 工程"]
prerequisites: ["agent-learning-11-multi-agent"]
verification: {"status": "not-run", "scope": "本次仅整理资料；示例代码与原文技术结论未复跑。"}
---

模型、消息、工具、智能体、流式、中间件与运行时

[学习路线](/posts/agent-learning-route/) · [上一章](/posts/agent-learning-11-multi-agent/) · [下一章](/posts/agent-learning-13-langgraph/)

本章按知识小节编排。项目内容作为学习案例阅读，示例代码与原文技术结论未在本次整理中执行验证。

## 本章目录

- [Agent开发框架](#section-0066)
- [主流框架和选型策略](#section-0067)
- [LangChain](#section-0068)
- [面试真题](#section-0070)
- [LangChain 概述](#section-0627)
- [一句话解释](#section-0629)
- [创建一个智能体](#section-0630)
- [核心优势](#section-0631)
- [LangChain的核心架构](#section-0632)
- [LangChain基本架构（6大核心模块）](#section-0633)
- [架构图](#section-0634)
- [核心组件1：Model I/O](#section-0635)
- [核心组件2：Chains](#section-0636)
- [核心组件3：Memory](#section-0637)
- [核心组件4：Agents](#section-0638)
- [核心组件5：Retrieve](#section-0639)
- [核心组件6：Callbacks](#section-0640)
- [安装 LangChain](#section-0643)
- [快速入门 (Quickstart)](#section-0644)
- [要求 (Requirements)](#section-0645)
- [构建基础智能体 (Build a basic agent)](#section-0646)
- [构建真实世界的智能体 (Build a real-world agent)](#section-0647)
- [定义系统提示词 (Define the system prompt)](#section-0648)
- [创建工具 (Create tools)](#section-0649)
- [配置模型 (Configure your model)](#section-0650)
- [定义响应格式 (Define response format)](#section-0651)
- [添加记忆 (Add memory)](#section-0652)
- [创建并运行智能体 (Create and run the agent)](#section-0653)
- [设计理念](#section-0654)
- [历史](#section-0655)
- [智能体 (Agents)](#section-0658)
- [核心组件](#section-0659)
- [模型](#section-0660)
- [工具](#section-0661)
- [系统提示](#section-0662)
- [模型 (Models)](#section-0663)
- [基本用法](#section-0664)
- [初始化模型](#section-0665)
- [支持的模型](#section-0666)
- [关键方法](#section-0667)
- [参数](#section-0668)
- [调用](#section-0669)
- [Invoke](#section-0670)
- [Stream](#section-0671)
- [Batch](#section-0672)
- [工具调用](#section-0673)
- [结构化输出](#section-0674)
- [模型配置文件](#section-0676)
- [多模态](#section-0677)
- [推理](#section-0678)
- [本地模型](#section-0679)
- [提示缓存](#section-0680)
- [服务器端工具使用](#section-0681)
- [速率限制](#section-0682)
- [基础URL或代理](#section-0683)
- [对数概率](#section-0684)
- [令牌使用情况](#section-0685)
- [调用配置](#section-0686)
- [可配置模型](#section-0687)
- [消息 (Messages)](#section-0688)
- [基本用法](#section-0689)
- [文本提示](#section-0690)
- [消息提示](#section-0691)
- [字典格式](#section-0692)
- [消息类型](#section-0693)
- [系统消息](#section-0694)
- [人类消息](#section-0695)
- [AI 消息](#section-0696)
- [工具消息](#section-0697)
- [消息内容](#section-0698)
- [标准内容块](#section-0699)
- [多模态](#section-0700)
- [内容块参考](#section-0701)
- [与聊天模型一起使用](#section-0702)
- [工具 (Tools)](#section-0703)
- [基础工具定义 (Basic tool definition)](#section-0705)
- [自定义工具属性 (Customize tool properties)](#section-0706)
- [高级模式定义 (Advanced schema definition)](#section-0707)
- [保留参数名 (Reserved argument names)](#section-0708)
- [访问上下文 (Accessing context)](#section-0709)
- [ToolRuntime](#section-0710)
- [概述](#section-0712)
- [使用方法](#section-0713)
- [在生产环境中](#section-0714)
- [自定义智能体记忆](#section-0715)
- [常见模式](#section-0716)
- [修剪消息](#section-0717)
- [删除消息](#section-0718)
- [流式传输](#section-0719)
- [概述](#section-0720)
- [支持的流模式](#section-0721)
- [智能体进度](#section-0722)
- [LLM 令牌](#section-0723)
- [自定义更新](#section-0724)
- [流式传输多种模式](#section-0725)
- [常见模式](#section-0726)
- [流式传输工具调用](#section-0727)
- [人机交互流式传输](#section-0728)
- [从子智能体流式传输](#section-0729)
- [禁用流式传输](#section-0730)
- [结构化输出 (Structured output)](#section-0731)
- [响应格式 (Response format)](#section-0732)
- [提供商策略 (Provider strategy)](#section-0733)
- [工具调用策略 (Tool calling strategy)](#section-0734)
- [自定义工具消息内容 (Custom tool message content)](#section-0735)
- [错误处理 (Error handling)](#section-0736)
- [概述](#section-0739)
- [智能体循环](#section-0740)
- [其他资源](#section-0741)
- [自定义中间件](#section-0742)
- [钩子](#section-0743)
- [节点式钩子](#section-0744)
- [包装式钩子](#section-0745)
- [创建中间件](#section-0746)
- [基于装饰器的中间件](#section-0747)
- [基于类的中间件](#section-0748)
- [自定义状态模式](#section-0749)
- [自定义上下文](#section-0750)
- [内置中间件](#section-0751)
- [与提供商无关的中间件](#section-0752)
- [摘要](#section-0753)
- [人在回路](#section-0754)
- [模型调用限制](#section-0755)
- [工具调用限制](#section-0756)
- [模型回退](#section-0757)
- [PII 检测](#section-0758)
- [待办事项列表](#section-0759)
- [LLM 工具选择器](#section-0760)
- [工具重试](#section-0761)
- [模型重试](#section-0762)
- [LLM 工具模拟器](#section-0763)
- [上下文编辑](#section-0764)
- [Shell 工具](#section-0765)
- [文件搜索](#section-0766)
- [特定于提供商的中间件](#section-0767)
- [护栏 (Guardrails)](#section-0770)
- [PII 检测](#section-0772)
- [人工介入](#section-0773)
- [自定义防护栏](#section-0774)
- [智能体执行前的防护栏](#section-0775)
- [智能体执行后的防护栏](#section-0776)
- [组合多个防护栏 (Combine multiple guardrails)](#section-0777)
- [概述](#section-0779)
- [访问](#section-0780)
- [在工具内部](#section-0781)
- [在中间件内部](#section-0782)
- [概述](#section-0784)
- [智能体为何失败？](#section-0785)
- [智能体循环](#section-0786)
- [您可以控制的内容](#section-0787)
- [数据源](#section-0788)
- [工作原理](#section-0789)
- [模型上下文](#section-0790)
- [系统提示词](#section-0791)
- [消息](#section-0792)
- [工具](#section-0793)
- [模型](#section-0794)
- [响应格式](#section-0795)
- [工具上下文](#section-0796)
- [读取](#section-0797)
- [写入](#section-0798)
- [生命周期上下文](#section-0799)
- [示例：摘要](#section-0800)
- [最佳实践](#section-0801)
- [模型上下文协议 (MCP)](#section-0802)
- [快速开始](#section-0803)
- [自定义服务器](#section-0804)
- [传输方式](#section-0805)
- [HTTP](#section-0806)
- [stdio](#section-0807)
- [有状态会话](#section-0808)
- [工具](#section-0810)
- [人机回环](#section-0811)
- [中断决策类型](#section-0812)
- [配置中断](#section-0813)
- [响应中断](#section-0814)
- [决策类型](#section-0815)
- [人机协同流式处理](#section-0816)
- [检索 (Retrieval)](#section-0819)
- [构建知识库](#section-0820)
- [从检索到 RAG](#section-0821)
- [检索流程](#section-0822)
- [构建模块](#section-0823)
- [RAG 架构](#section-0824)
- [两步式 RAG](#section-0825)
- [智能体式 RAG](#section-0826)
- [混合式 RAG](#section-0827)
- [概述](#section-0829)
- [记忆存储](#section-0830)
- [在工具中读取长期记忆](#section-0831)
- [从工具写入长期记忆](#section-0832)
- [LangSmith Studio 实验室](#section-0835)
- [先决条件](#section-0836)
- [安装 LangGraph CLI](#section-0838)
- [准备您的智能体](#section-0839)
- [环境变量](#section-0840)
- [创建 LangGraph 配置文件](#section-0841)
- [安装依赖项](#section-0842)
- [在 Studio 中查看您的智能体](#section-0843)
- [测试](#section-0844)
- [模拟聊天模型](#section-0846)
- [InMemorySaver 检查点保存器](#section-0847)
- [集成测试](#section-0848)
- [安装 AgentEvals](#section-0849)
- [轨迹匹配评估器](#section-0850)
- [智能体聊天界面](#section-0851)
- [快速开始](#section-0852)
- [本地开发](#section-0853)
- [连接到您的智能体](#section-0854)
- [部署 (Deployment)](#section-0857)
- [前提条件](#section-0858)
- [在 GitHub 上创建仓库](#section-0860)
- [部署到 LangSmith](#section-0861)
- [在 Studio 中测试您的应用程序](#section-0862)
- [获取部署的 API URL](#section-0863)
- [测试 API](#section-0864)
- [可观测性 (Observability)](#section-0865)
- [先决条件](#section-0866)
- [启用追踪](#section-0867)
- [快速开始](#section-0868)
- [选择性追踪](#section-0869)
- [记录到项目](#section-0870)
- [向追踪添加元数据](#section-0871)
- [LangChain 制作智能体](#section-1929)
- [环境准备](#section-1930)
- [实例](#section-1931)
- [实例](#section-1932)
- [构建 LCEL 链 (LangChain Expression Language)](#section-1933)
- [实例](#section-1934)
- [流式输出 (Streaming)](#section-1935)
- [实例](#section-1936)
- [代码结构](#section-1937)
- [模型 (Models)](#section-1939)
- [提示词 (Prompts)](#section-1940)
- [链 (Chains) &amp; LCEL](#section-1941)
- [索引与检索 (Indexes &amp; Retrieval)](#section-1942)
- [实例](#section-1943)
- [记忆 (Memory)](#section-1944)
- [代理 (Agents)](#section-1945)
- [实例](#section-1946)
- [快速开始：构建你的第一个 LangChain 应用](#section-1947)
- [实例](#section-1949)
- [示例 2：带记忆的对话链](#section-1950)
- [实例](#section-1951)
- [总结](#section-1952)
- [推荐学习路径](#section-1953)

<a id="section-0066"></a>
## Agent开发框架

<a id="f-doxcnKJebU5ZkdNWAfEItAhCQOf"></a>

<p id="f-doxcnXIIs0vvG5glesR3YNlxl9d"><span style="font-weight:bold">该小节重构于2026年8月。</span></p>

<p id="f-doxcnXGtB3MTlrtiQ2otdXiraGg"><span>根据我2026 年的面试经验，Agent 框架已经不算一个高频考点，同时对框架的考察一直不会很深入。</span></p>

<p id="f-doxcnWTrVYJ1tcViMPKYKoGWm4f"><span style="font-weight:bold">在 2025 年，可能大家还认为 LangChain 非常重要，因此会像准备八股文一样，集中背诵 LangChain、LangGraph 的组件、概念和基本特性。</span><span>但到了 2026 年，可以认为这件事没有太多意义了。Langchain并不是你要从事大模型开发岗位的必学内容了。</span></p>

<p id="f-doxcn9l4ZgGUFBrkSfIvGSh7HEd"><span>可以认为原因其实也很容易理解：</span><span style="font-weight:bold">Agent 框架只是开发 Agent 应用的工具，工具本身不是重点，工具背后封装的 Agent 能力才是重点。况且各个公司开发用的框架也不一样，深入学习一个框架，对于面试来说性价比并不高。</span></p>

<p id="f-doxcnj6WkJn3GN4S748t3moXA1S"><span>不同框架的 API 并不通用，但它们处理的核心问题高度相似，例如：</span></p>

<div style="margin-left:25px"><div id="f-doxcnUmquSiEDYGRslIycjtKCgc" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>如何把函数、API、数据库或 MCP 服务封装成工具；</span></div></div><div id="f-doxcndORd9spWCRiVqzdZITEjRe" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>如何实现“模型决策—调用工具—读取结果—继续决策”的 Agent Loop（智能体循环）；</span></div></div><div id="f-doxcnkOD3h9FakPPJvlkDa6rzJb" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>如何维护会话状态、短期记忆和长期记忆；</span></div></div><div id="f-doxcnDY7gQXmDRiX4SbtED5sx4f" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>如何管理上下文、压缩历史和控制 Token；</span></div></div><div id="f-doxcni4kZSSNj1ge0W0VsHC2Cke" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>如何进行分支、循环、并行、暂停与恢复；</span></div></div><div id="f-doxcnW9LqGGkatUatd7rqRurKRh" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>如何实现 Human-in-the-loop（人工介入或审批）；</span></div></div><div id="f-doxcnIp22hvTVsGDFkpPYHia3wu" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>如何管理工具权限、凭据和执行沙箱；</span></div></div><div id="f-doxcnHtnGbr1UPYp9QAEtnihcHc" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>如何记录 Trace（执行链路）、评测效果和失败原因；</span></div></div><div id="f-doxcnhSrHZnGyJoL6q0VBzlTxFh" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>如何保证重试、幂等、审计和生产可靠性。</span></div></div></div>

<p id="f-doxcnTZ6gsIc0a9vYcocwY2v9ih"><span style="font-weight:bold">这些才是不同 Agent 框架背后共用的“内核”</span><span>。掌握内核以后，切换框架主要是学习新的抽象和 API；如果只会背某个框架的 API，一旦项目更换技术栈，原有知识就很难迁移。</span></p>

<p id="f-doxcnYbfCXHWor6UzvM5CMf5e5c"><span>因此，</span><span style="font-weight:bold">LangChain 在我看来已经不是所有人都必须深入掌握的内容。你完全可以使用其他 Agent 框架，也可以不使用框架，直接基于模型 API 手写 Agent</span><span>。框架的价值是减少重复开发，而不是赋予模型某种只有该框架才具备的智能。</span></p>

<p id="f-doxcnY6BDKpkh5IyDIsL2FctKEI">下面总结框架学习重点。</p>

<p id="f-doxcn8rbuHndvss6Ty3fruFzoeh"><span>必学的内容： </span></p>

<p id="f-doxcn3dWeMfuyWJ6dvjgEuKfYOg"><span>1. </span><span style="font-weight:bold">知道市面上有什么框架，它的特点，优缺点，局限性</span><span>。</span><span style="font-weight:bold">如何科学选择Agent的开发框架</span><span>。这个无论是对于你自己做项目框架选型还是回答面试问题，你为什么使用这个框架，都有帮助。</span></p>

<p id="f-doxcnLZNLfQbuPgScbnHHNp2AF9"><span>2.</span><span style="font-weight:bold">如果你使用了某个框架，那么请深入了解一下这个框架的特点，设计思想，理念，特性</span><span>。</span></p>

<p id="f-doxcnH2mGsxAOk1wBOipEwx1Dff"><span>本小节笔记编写也遵循这个逻辑：</span></p>

<p id="f-doxcnhfTLvAIn9UtUp18cluGXyd"><span>1.1 </span><span style="font-weight:bold">小节属于必学</span><span>:带你了解2026年有哪些Agent框架，特点是什么，如何选型，同时讲清楚上面两个Agent框架最高频的面试问题：这个是学完上面内容的面试实战运用，也是面试官问Agent框架，几乎一定会先问的问题。</span></p>

<p id="f-doxcnVxcTipnjFa2SpS5cjWZeUh">本节保留框架版本相关内容，便于理解不同版本的接口和特性差异。</p>


<a id="section-0067"></a>
## 主流框架和选型策略

<a id="f-doxcnZsWZy1AiDoVW8mkkRPtK7e"></a>

<a id="f-doxcn4hosS0StlX02sSFHIYNJVh"></a>

##### 框架速览

<p id="f-doxcnZYvUZNyed36IOGPRrRZDXd"><span>这一小节快速带大家了解，2026年8月，市场上流行的主流框架有哪些，建立初印象。</span></p>

<p id="f-doxcnUaIsNfQDiowXDR68VdRPYb"><span>我们用 </span><span style="font-weight:bold">GitHub 官方代表仓库的 Stars 数量</span><span>衡量开源社区关注度，数据通过 GitHub API 查询，统计时间为 </span><span style="font-weight:bold">2026 年 8 月 11 日</span><span>。相比笼统地写“高”或“较高”，Stars 至少提供了一个公开、可复查的量化依据。</span></p>

<p id="f-doxcnbQBds7ilXhZ7exREBXpQch"><span>不过，Stars 只能作为热度参考，不能直接等同于生产成熟度或企业采用率，原因包括：</span></p>

<div style="margin-left:25px"><div id="f-doxcnFXuqBpZpa6WWCc1Y6l3eTg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>项目发布时间不同，较早发布的项目天然更容易积累 Stars；</span></div></div><div id="f-doxcnG7RpCUaNbg5yxYCkO4CKod" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>Dify、LangChain 等面向更广泛的 AI 应用用户，受众规模与纯 Agent 运行时不同；</span></div></div><div id="f-doxcn5wHUVYV8rcjnrQZngf8mfc" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>Claude Agent SDK、Google ADK 等项目采用多语言分仓，单个 Python 代表仓库可能低估整体生态；</span></div></div><div id="f-doxcngGOKYNhGwBwp2zO4PMAieK" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>GitHub Stars 无法反映闭源企业使用、云平台内部使用、API 稳定性、安全性和维护质量；</span></div></div><div id="f-doxcnv9CDJ9hP7PdpRDIpM24CCg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>Stars 是累计值，不能单独反映近期增长速度和当前活跃度。</span></div></div></div>

<p id="f-doxcnUTx8yqsqOSPEpKJ0L2udFc"><span>因此，下表把 Stars 称为</span><span style="font-weight:bold">开源社区关注度</span><span>，而不是“框架质量分”或“市场占有率”。对于多仓库项目，统一选择最具代表性的官方主仓库，不对多个语言仓库的 Stars 求和。</span></p>

<div id="f-doxcn28CIGrQiXj8zrziT1TuTEe"><img alt="" decoding="async" height="596" loading="lazy" src="/images/agent-learning/608eb5a28e1f2b41b486002f.png" width="1280"/></div>

<p id="f-doxcnZ1YCSzhoyyFbisWAH3qaid"><span>按本次统计的代表仓库 Stars 排序，前三名是 </span><span style="font-weight:bold">Dify（152.1k）</span><span>、</span><span style="font-weight:bold">LangChain（143.9k）</span><span> 和 </span><span style="font-weight:bold">CrewAI（56.9k）</span><span>。这说明它们在开源社区中的关注度较高，但由于三者分别属于低代码平台、高层应用框架和多 Agent 框架，不能据此判断谁在技术上更适合某个具体项目。</span></p>

<a id="f-doxcn8BbMMwvcnKmcLUZMJCErnf"></a>

##### 各框架使用方式

<p id="f-doxcnK7i3wLtDlrVjANVCkYtpAc"><span>先讲解各个Agent框架使用方式，这是最直观理解不同框架的特点的角度了。</span></p>

<a id="f-doxcnDCJLjrNLzD2puCAi95ipnf"></a>

###### 方法一：组装组件——定义 Agent、工具和输出

<p id="f-doxcnFAD6n3GSPpwNa872My9Emg"><span>使用这类框架时，你通常先选择模型，再创建一个 Agent，为它写系统指令，并把搜索、数据库查询、发送邮件等函数注册成工具。如果结果需要固定格式，还会定义一个输出数据结构。运行后，模型可以返回工具调用请求；框架执行对应函数，再把结果交回模型，直到模型给出最终答案或达到开发者设置的停止条件。</span></p>

<p id="f-doxcne2x9rkPlibEpJktKU97Jpg"><span>换句话说，你开发的主要形式是：</span><span style="font-weight:bold">配置 Agent + 挂载 Tools + 调用 run()</span><span>。这里的“模型决定下一步”只限于一次 Agent 运行循环：模型决定此刻直接回答，还是请求调用某个已注册工具。工具的具体实现、允许调用哪些工具、调用次数、权限以及外层业务流程仍然由代码控制。代表框架：</span><span style="font-weight:bold">LangChain、PydanticAI、OpenAI Agents SDK</span><span>。</span></p>

<div id="f-doxcnD2ZLMFv1zMKZHcpEp8FOYc"><img alt="" decoding="async" height="853" loading="lazy" src="/images/agent-learning/dccd97bd8fe35c2bdc13f854.png" width="1280"/></div>

<a id="f-doxcnYgphPaJePjJUVicPzPo9ah"></a>

###### 方法二：搭建状态图——定义 State、Node 和 Edge

<p id="f-doxcneGvibJS2ByWo4DDbQFl6ad"><span>使用 LangGraph 时，你不是只创建一个 Agent 然后让它自由运行，而是先定义一份 </span><span style="font-weight:bold">State</span><span>，用来保存消息、任务结果和执行进度；再把每一步操作写成 </span><span style="font-weight:bold">Node</span><span>，例如“模型判断”“调用搜索工具”“人工审核”；最后用 </span><span style="font-weight:bold">Edge</span><span> 把节点连接起来，并定义什么条件下走哪条边。</span></p>

<p id="f-doxcnqSLB8uwD9aCuMBvv60PIOg"><span>程序运行时，State 在节点之间不断传递和更新。开发者真正搭建的是一张可循环、可分支的执行图。它的开发形式可以概括为：</span><span style="font-weight:bold">定义状态 → 编写节点 → 连接边 → 编译并运行图</span><span>。代表框架：</span><span style="font-weight:bold">LangGraph</span><span>。</span></p>

<div id="f-doxcnRbofdtY1w0Idg1YQOMejLf"><img alt="" decoding="async" height="853" loading="lazy" src="/images/agent-learning/42377fc4be4577d60afec56b.png" width="1280"/></div>

<a id="f-doxcndhNrAGtA3uC5TdeuxB9Yvc"></a>

###### 方法三：组织 Agent 团队——定义 Role、Task 和协作关系

<p id="f-doxcnaKJv7A8vtWnoF4F4pOIzBf"><span>使用 CrewAI 一类框架时，你首先要做的不是画流程，而是创建多个 Agent。每个 Agent 都要定义自己的</span><span style="font-weight:bold">角色、目标、背景说明和可用工具</span><span>，例如研究员负责搜集资料，作者负责写作，审核员负责检查。然后再定义每个角色要完成的 Task，以及任务按顺序执行、并行执行还是由管理者动态分派。</span></p>

<p id="f-doxcnzphuCHLlIdmxB17OU25Vmb"><span>这种方法写出来的程序很像在组建项目团队：</span><span style="font-weight:bold">定义 Agents → 分配 Tasks → 设置协作方式 → 启动 Crew</span><span>。任务在不同角色之间流转，每个 Agent 只处理自己负责的部分。代表框架：</span><span style="font-weight:bold">CrewAI、AgentScope</span><span>。</span></p>

<div id="f-doxcnbavd4eWRq2SicBbgvITH9X"><img alt="" decoding="async" height="853" loading="lazy" src="/images/agent-learning/40ffebcbead19caa43f6f2a3.png" width="1280"/></div>

<a id="f-doxcnlIpgit42Xs5pKMoUYusuMc"></a>

###### 方法四：配置工作环境——给 Agent 任务和可操作的电脑

<p id="f-doxcndTKoZhFwI8eYPwwGUNq5Id"><span>使用长任务 Agent Harness 时，开发者通常不需要把几十个步骤全部预先写出来。你要做的是给 Agent 一项总体任务，配置它可以使用的</span><span style="font-weight:bold">环境和权限</span><span>，例如</span><span style="font-weight:bold">文件系统</span><span>、</span><span style="font-weight:bold">终端</span><span>、浏览器、代码仓库，以及必要的工具和子 Agent。Agent 收到任务后，会自己制定计划、读写文件、执行命令、检查结果，并根据中间产物继续工作。</span></p>

<p id="f-doxcn5Cqwth27VHPL55h7Dj4dUh"><span>这种开发方式更像给一位数字员工准备工作台：</span><span style="font-weight:bold">描述目标 → 配置环境与工具 → 设置权限 → 让 Agent 持续执行</span><span>。代表框架：</span><span style="font-weight:bold">Deep Agents、Claude Agent SDK</span><span>。</span></p>

<div id="f-doxcnUju5LgPlSUuw0PE6BS7zYb"><img alt="" decoding="async" height="853" loading="lazy" src="/images/agent-learning/05e8297c4bb02d5f2333f2b1.png" width="1280"/></div>

<a id="f-doxcnNKoZourzCC7XIvvdRt1Qxc"></a>

###### 方法五：搭建知识管道——定义数据源、索引和查询流程

<p id="f-doxcnAEnHpwJrIQ5JrfnVNM0v5b"><span>使用 LlamaIndex 时，开发往往分成两部分。第一部分是准备知识：接入 PDF、网页或数据库，把内容切分成节点并建立索引；第二部分是使用知识：定义检索器或查询引擎，让 Agent 在回答问题或调用工具前先找到相关资料。</span></p>

<p id="f-doxcnWnQnBysRQ3A2MmS9mKwGQc"><span>因此，你主要开发的不是角色或流程图，而是一条数据进入 Agent 的管道：</span><span style="font-weight:bold">加载数据 → 切分与索引 → 检索相关内容 → 交给 Agent 回答或行动</span><span>。代表框架：</span><span style="font-weight:bold">LlamaIndex</span><span>。</span></p>

<div id="f-doxcnWsgCAI9z9RRUe2M3Zal6Md"><img alt="" decoding="async" height="853" loading="lazy" src="/images/agent-learning/5f37c5b38a107acb1078f4f4.png" width="1280"/></div>

<a id="f-doxcn5oMi7PrWjkUfIuSyF8ea6g"></a>

###### 方法六：在平台中编排并发布——配置工作流和应用

<p id="f-doxcnv50JSeJ50zZ6cKBmL8mzrb"><span>使用平台型框架时，你面对的通常不是单一的代码库，而是一套把开发、调试、发布和观测放在一起的完整平台：先选择模型，填写 Agent 指令，添加工具或知识库，再用代码或可视化画布连接处理步骤。完成后，可以直接在平台内测试、评估、部署为 API 或聊天应用，并查看运行日志。</span></p>

<p id="f-doxcnFQn4rYdS8ln0UOqEndnRef"><span>所以，这一类框架的核心区别不只是“前面写代码，这里拖拽界面”，而是</span><span style="font-weight:bold">框架是否把 Agent 的全生命周期一起打包了</span><span>：既管怎么搭，也管怎么测、怎么发、怎么监控。它关注的是一个完整应用，而不只是 Agent Loop：</span><span style="font-weight:bold">配置 Agent → 编排 Workflow → 调试评估 → 部署应用 → 查看日志</span><span>。代表框架：</span><span style="font-weight:bold">Dify</span><span>。</span></p>

<div id="f-doxcnvYkPh0K2APILIw51heW9uf"><img alt="" decoding="async" height="853" loading="lazy" src="/images/agent-learning/dafd1d091d30c1f35aeece8f.png" width="1280"/></div>

<a id="f-doxcn8OENRFAbKGtyq4Y1gYYTmd"></a>

##### 框架核心特点

<p id="f-doxcnlGGFdU6L9tbtNm2phv7Upd"><span>上面从框架使用方式角度介绍，这里从框架最核心的特点介绍，每个框架用一句话，说明它的最核心的特点。</span></p>

<div style="margin-left:25px"><div id="f-doxcnkiR4hvDKwxrEof8mFWNwxe" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">LangChain：生态最丰富的通用工具箱。</span><span> 接模型、工具和检索非常方便，适合快速做原型；但抽象较多，复杂流程容易变得不透明。</span></div></div><div id="f-doxcnGFqdqRfEFMGqNeKyPlVBwb" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">LangGraph：控制力最强的状态图框架。</span><span> 状态持久化、检查点、恢复和“时间回溯”能力突出；代价是建模最复杂，开发者要自己设计 State、Node 和 Edge。</span></div></div><div id="f-doxcncOCPtziaOlEluBg9wPyxZd" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">Deep Agents：为长任务准备好的 Agent 骨架。</span><span> 自带规划、工作区、上下文压缩和子 Agent，适合研究与多文件任务；短任务使用它会显得偏重。</span></div></div><div id="f-doxcny34xp4nq5OPyinIJLccPib" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">OpenAI Agents SDK：轻量且容易上手的官方 SDK。</span><span> Agent、工具和 Handoff 概念简洁，与 OpenAI 的语音、追踪和评测结合自然；深度使用后会增加 OpenAI 生态绑定。但是缺点是编排能力比较弱，不支持并行和循环。</span></div></div><div id="f-doxcnnJzhSkcGkUgsmfqoeyUc3g" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">Claude Agent SDK：最擅长操作电脑环境。</span><span> 文件读写、Shell、搜索和代码修改能力开箱即用，特别适合编码 Agent；同时必须认真处理权限、沙箱和执行安全。</span></div></div><div id="f-doxcn3dc3bGgLFJ6hko8uKkNtgh" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">Google ADK：最像传统软件工程的 Agent 框架。</span><span> 它允许开发者用顺序、并行和循环等代码结构组织多个 Agent，把模型的自主判断嵌入确定性流程，并配套会话、记忆、产物和评估能力；优点是结构完整、适合复杂工程，缺点是概念较多，简单任务使用会显得偏重。</span></div></div><div id="f-doxcnea9FcwC9YpWfYjInamlMCb" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">Microsoft Agent Framework：最适合微软技术栈的企业框架。</span><span> 对 Azure、Microsoft 365、身份治理和 .NET 团队友好；非微软技术栈使用它的优势会明显减弱。</span></div></div><div id="f-doxcnckqUBsZBXCJ3ebTqrc2ECc" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">CrewAI：最直观的角色型多 Agent 框架。</span><span> 用研究员、作者、审核员等角色组织任务很容易理解；多个 Agent 也会带来更高的 Token、延迟和调试成本。</span></div></div><div id="f-doxcnOe4tDagS0tvkYpabJnSNBb" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">PydanticAI：最强调类型安全的轻量 Python 框架。</span><span> 工具参数、依赖和输出结构清晰，适合 API 与结构化数据任务；它不是复杂工作流或长任务运行时。最大的特点是类型安全，使用FASTAPI编程方式。</span></div></div><div id="f-doxcnr56UxPrlk0r6p1xHAKYSru" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">LlamaIndex：数据与 RAG 能力最突出。</span><span> 文档接入、切分、索引和检索链路完整，适合知识库与数据密集型 Agent；但接上向量库不等于检索质量自然可靠。</span></div></div><div id="f-doxcn0y4j9dIpBG3mntpDcHcgub" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">Dify：最容易快速做出可用应用。</span><span> 通过拖拽即可组合模型、知识库、工具和工作流，并直接发布；画布复杂后，测试、复用和深度定制会比较困难。</span></div></div><div id="f-doxcn7FY5uuO1bxzabzXfbwPwZg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">AgentScope：更贴近国内企业环境的多 Agent 框架。</span><span> 对国产模型、Python/Java、私有化和国内云生态更友好；国际社区与第三方生态相对较弱。</span></div></div></div>

<p id="f-doxcnUuezRU1mZyUoalTvhkJvHb"><span>记住这些核心特点后，再阅读每个框架的详细介绍，就可以把更多功能理解为对这条主线的补充，而不必一次记住所有概念。</span></p>

<a id="f-doxcnIQhpuoOE6lBmv31Hw2QgTg"></a>

##### 各框架特点详细介绍

<p id="f-doxcnCg7Dvqojw6T6SF3iTKikae"><span>本案例通过1.1.1~1.1.3 是想让大家能够对这些框架建立一个印象。你不要背，也能够轻松知道常见的一些框架，对它有一个印象。某种程度也是为这个小节做铺垫，这个小节很枯燥，但是是面试问题：讲讲你了解的Agent框架。</span><span style="font-weight:bold">该背还是得背一下，有了前面的小节，应该背起来容易一点</span><span>。</span><span>但你不用都背</span><span>，这个小节就是防止面试官问：你知道什么Agent框架，讲一下？</span><span>所以你是要挑你项目使用的，或者关注的几个背就行了。</span></p>

<p id="f-doxcngxtphHr1RPwiDKO1bKpZvf">每个框架附有相关问题，用于检验理解程度。</p>

<a id="f-doxcny0DnNBHSBYMAhxErJYhWsW"></a>

###### LangChain：高层 LLM 应用工具箱

<p id="f-doxcnkd5ibQmpjFxIIWH0zU2w9c"><span style="font-weight:bold">定位</span><span>：LangChain 主要负责连接模型、消息、工具、结构化输出、检索和高层 Agent。它适合快速组装应用，但不应被理解为所有复杂 Agent 系统的统一底座。</span></p>

<p id="f-doxcnMzrxeMUmemCkjkxQMGTZKf"><span style="font-weight:bold">核心特性</span><span>：多模型与多工具集成、标准化消息和 Prompt、结构化输出、高层 Agent 接口、检索与文档组件，并可与 LangGraph 组合。</span></p>

<p id="f-doxcnsqYOkmtF7lDybirArZVggb"><span style="font-weight:bold">优点</span><span>：生态广、资料多、接入快，适合验证模型、工具和数据链路。</span></p>

<p id="f-doxcnfMKm2J8D4L234OCSfmUAnt"><span style="font-weight:bold">局限</span><span>：抽象较多；只使用高层 Agent 时，复杂控制流不如显式状态图清晰；集成数量多也不代表每个组件都具有相同的生产质量。</span></p>

<p id="f-doxcntL3hkpObVlSSqexBJxTKEf"><span style="font-weight:bold">适用场景</span><span>：通用 Agent、快速原型、集成驱动型应用。严格持久化、恢复、审批和复杂状态控制通常应进一步使用 LangGraph 或其他工作流运行时。</span></p>

<p id="f-doxcnFcmQOxEwXwMoKWWhR91sfg"><span>为什么没有直接调用模型 SDK；复杂流程是否引入 LangGraph；模型、工具和检索抽象为项目减少了哪些工作。</span></p>

<blockquote id="f-doxcnkpJsctC6L2vF5mBApF9GHe"><p id="f-doxcnCpI4bTnffHZHZgv0c7Z3rO"><span style="font-weight:bold">面试小卡片｜请简单介绍一下你了解的 Agent 框架</span></p>
<p id="f-doxcnLkqaJqfbtQdeKOGj3I7Nwd"><span style="font-weight:bold">核心特点。</span><span> 我了解的 LangChain 是一个通用的 LLM 应用开发框架。它把模型、Prompt、消息、工具、结构化输出和检索封装成可组合组件，开发者可以为 Agent 注册搜索、数据库等工具，再由模型在运行过程中选择是否调用。它更像一个连接各种 LLM 能力的标准工具箱，重点是减少不同模型、工具和数据源之间的适配工作，而不是强制开发者采用某一种固定流程。</span></p>
<p id="f-doxcnSWxm2OoSitXheMqa6tkeqc"><span style="font-weight:bold">优缺点。</span><span> 它最大的优势是生态丰富、资料多，接入不同模型和第三方服务都比较快，切换模型或替换工具时也能复用一部分上层代码。缺点是抽象层较多，组件版本和行为边界需要认真理解；只使用高层 Agent 时，复杂分支、状态变化和失败恢复不够直观，这类需求通常会再结合 LangGraph。</span></p>
<p id="f-doxcncoqXRf38yC4cgvcruFIjph"><span style="font-weight:bold">适用场景。</span><span> 可以把它用于通用工具 Agent、RAG 应用、模型与工具集成，以及需要快速验证想法的早期原型。如果业务流程非常固定，我可能直接写普通代码；如果流程复杂且必须恢复，可以让 LangChain 负责模型和工具接入，让 LangGraph 负责运行控制。</span></p></blockquote>

<a id="f-doxcnMz9721txYxrr9xEEnxINPe"></a>

###### LangGraph：显式状态与流程控制

<p id="f-doxcnmekKvZ826rCsncvKohx5Gf"><span style="font-weight:bold">定位</span><span>：LangGraph 是面向有状态、可恢复、长时间运行 Agent 工作流的编排运行时。核心价值是控制力和可靠执行，而不是让模型本身更聪明。</span></p>

<p id="f-doxcnbNaWEaIMSKY4igghcAuase"><span style="font-weight:bold">核心特性</span><span>：Node、Edge、State；条件分支、循环、并行；Checkpoint（检查点）和状态持久化；Interrupt、恢复执行、Human-in-the-loop；流式事件和多 Agent 编排。</span></p>

<p id="f-doxcnsMH0jpdMsgz4MH7aK0fmke"><span style="font-weight:bold">优点</span><span>：控制流显式，复杂流程更容易理解、审计和恢复，也更适合将不确定的模型决策嵌入确定性业务流程。</span></p>

<p id="f-doxcn8kG0QP5ESwxyYvAbRjlt1c"><span style="font-weight:bold">局限</span><span>：学习和建模成本较高；开发者仍需自己设计 State Schema、重试、幂等和副作用隔离；对简单问答可能过重。</span></p>

<p id="f-doxcnzcw6w7UuZhrBNlZHmWHEQR"><span style="font-weight:bold">适用场景</span><span>：审批、供应链、金融流程、多阶段研究、长任务和必须恢复的业务。</span></p>

<p id="f-doxcnrIAsBj4croiiYPgLRI6rub"><span>节点和条件边如何设计；Checkpoint 存在哪里；服务重启后如何恢复；怎样防止重试导致重复写库或重复扣款；为什么不用普通代码或高层 Agent。</span></p>

<blockquote id="f-doxcnDp7SXcSggfr5B245w2N4sg"><p id="f-doxcnqaShBZViGyA84w3tuSg0Id"><span style="font-weight:bold">面试小卡片｜请简单介绍一下你了解的 Agent 框架</span></p>
<p id="f-doxcnlDQngf3IGJxNjjnmK3WSqY"><span style="font-weight:bold">核心特点。</span><span> 我了解的 LangGraph 是一个用状态图编排 Agent 的运行时。开发者先定义保存消息和业务数据的 State，再把模型调用、工具执行和人工审核写成 Node，最后通过 Edge 和条件分支规定节点之间怎样流转。每个节点读取并更新同一份状态，因此循环、重试、人工审批和多 Agent 交接都可以明确地画进执行图中。</span></p>
<p id="f-doxcnNoc0T5URZxLaWk7iKaqYLe"><span style="font-weight:bold">优缺点。</span><span> 它最大的优势是控制力和恢复能力强，支持 Checkpoint、Interrupt、持久化和时间回溯，任务中断后可以从历史状态继续，也能查看某一步之前的状态。缺点是建模成本较高，框架只提供运行机制，不会替开发者自动解决 State Schema、重试、幂等和副作用隔离等业务设计问题。</span></p>
<p id="f-doxcnHhmBhPH1WEzAo9vbRaNMjw"><span style="font-weight:bold">适用场景。</span><span> 它适合审批、金融流程、多阶段研究和长时间运行任务，尤其适合执行失败后不能简单从头重跑的业务。比如贷款审核进行到人工复核时可以暂停，收到审核结果后再从原状态继续，而不需要重新执行前面的查询和判断。</span></p></blockquote>

<a id="f-doxcnYCea6DONbswdlWqryxAcLf"></a>

###### Deep Agents：面向长任务的 Agent Harness

<p id="f-doxcnXCkeWMGqhwE0XpbBVkKCzb"><span style="font-weight:bold">定位</span><span>：Deep Agents 是面向长时间、开放式任务的高层 Agent Harness。它与 LangGraph 不是简单竞争关系：前者偏开箱即用的长任务骨架，后者偏可定制的底层状态运行时。</span></p>

<p id="f-doxcnFvemFnxCz6bEwgPvwp61xd"><span style="font-weight:bold">核心特性</span><span>：任务规划、待办管理、文件系统和工作区、上下文压缩、中间结果卸载、子 Agent 委派、工具和 MCP 接入，以及底层运行时提供的持久化和人工审批能力。</span></p>

<p id="f-doxcnSd9mQq2Kl7rvq4OIcp78Ih"><span style="font-weight:bold">优点</span><span>：不必从零搭建长任务所需的结构，适合多文件、大量中间结果和开放式目标。</span></p>

<p id="f-doxcn0DtZqPmOtDUuIkbJrjLsth"><span style="font-weight:bold">局限</span><span>：对短任务较重；默认行为不一定适合所有业务；涉及 Shell、代码和文件操作时仍需安全沙箱和权限策略。</span></p>

<p id="f-doxcnFsFaLeyBmVDCCtsWvQsmfg"><span style="font-weight:bold">适用场景</span><span>：深度研究、编码、长报告、多文件分析。若流程非常明确并要求逐节点控制，直接使用 LangGraph 自定义可能更合适。</span></p>

<p id="f-doxcnKVuQ6dnu7uVz5189uFsZsg"><span>如何管理工作区、上下文和中间产物；子 Agent 的职责边界；如何做权限与沙箱；为什么没有直接用 LangGraph 自建。</span></p>

<blockquote id="f-doxcnqWaILqsD3RMLtuiq3re8Ub"><p id="f-doxcnrUPntgyM0ED5N3TeZYiJ4f"><span style="font-weight:bold">面试小卡片｜请简单介绍一下你了解的 Agent 框架</span></p>
<p id="f-doxcnXoFQ2SdIpPwyeA8tCBq2ge"><span style="font-weight:bold">核心特点。</span><span> 我了解的 Deep Agents 是一个面向开放式长任务的 Agent Harness。它预置任务规划、待办管理、文件工作区、上下文压缩、中间结果卸载和子 Agent 委派，让 Agent 可以持续推进一个不能一次完成的目标。它和 LangGraph 不是简单替代关系：LangGraph 更像底层可恢复运行时，Deep Agents 则是在上面准备好了一套长任务工作方式。</span></p>
<p id="f-doxcnqBhneKcB2IBigXAaHZBvjb"><span style="font-weight:bold">优缺点。</span><span> 它的优势是不用从零搭建长任务骨架，Agent 可以把大量中间内容写入文件，并通过子 Agent 分担不同部分，避免所有信息都挤在一次上下文中。缺点是对简单短任务偏重，默认规划方式不一定适合所有业务，任务跑得越久，成本、错误累积和文件工具的安全风险也越需要管理。</span></p>
<p id="f-doxcnArZVVaUXqopIhQ7oEvGoOS"><span style="font-weight:bold">适用场景。</span><span> 它适合深度研究、长报告、多文件分析，以及需要拆分任务、保存大量中间结果并持续执行的复杂工作。例如让 Agent 阅读几十份资料、分别生成研究笔记，最后再汇总成一份完整报告，就比普通的一次性 Agent Loop 更适合使用 Deep Agents。</span></p>

</blockquote>

<a id="f-doxcnGWaCe5N6FtC08OuFUQ6Jme"></a>

###### OpenAI Agents SDK：轻量的 OpenAI Agent SDK

<p id="f-doxcnf2HsxednwlflMDaQoXFfgb"><span style="font-weight:bold">定位</span><span>：OpenAI Agents SDK 与 OpenAI 的模型、Responses、Realtime、Tracing 和 Evals 生态紧密结合，也是 Swarm 之后更适合新项目的官方方向。</span></p>

<p id="f-doxcnBqnBk56yJOP6hC4QL2b2ed"><span style="font-weight:bold">核心特性</span><span>：Agent、工具调用、Handoff、Agent-as-tool、输入输出 Guardrails、Session、Tracing、Evals、实时语音和 MCP 接入。</span></p>

<p id="f-doxcn0l9Ah7Eq0TqcRlo0nz5Hjc"><span style="font-weight:bold">优点</span><span>：概念少、上手快；Handoff 适合客服路由和专家接管；与 OpenAI 实时语音、Trace 和评测链路结合自然。</span></p>

<p id="f-doxcnGYkwB84j7XRUHKRaRjrule"><span style="font-weight:bold">局限</span><span>：使用厂商特有能力越多，迁移成本越高；核心抽象不是显式状态图；Guardrails 也不能替代完整业务权限和安全治理。</span></p>

<p id="f-doxcncGGiex4XzNks0bZPNDqspd"><span style="font-weight:bold">适用场景</span><span>：已确定使用 OpenAI，需要快速构建工具调用、客服分流或语音 Agent 的项目。</span></p>

<p id="f-doxcnRABomnhNV5YUXn1gL65tYe"><span style="font-weight:bold">学习时需要掌握</span><span>：Handoff 与 Agent-as-tool 的区别；Guardrails 能防什么；Session 与 Trace 怎么用；为什么接受 OpenAI 生态绑定；复杂流程如何补持久化和恢复。</span></p>

<blockquote id="f-doxcnCt9OHaW5VM62MIFQytkR8f"><p id="f-doxcn7JTY9noEJSh5ATBEUXkXdb"><span style="font-weight:bold">面试小卡片｜请简单介绍一下你了解的 Agent 框架</span></p>
<p id="f-doxcn67KLXz9OEs1uSgXscJEfWh"><span style="font-weight:bold">核心特点。</span><span> 我了解的 OpenAI Agents SDK 是 OpenAI 官方提供的轻量 Agent SDK，核心能力包括工具调用、Handoff、Agent-as-tool、Guardrails、Session 和 Tracing。Handoff 可以把当前对话和控制权交给另一个专业 Agent，而 Agent-as-tool 则是由主 Agent 调用其他 Agent 完成子任务后继续统一回答，这两种方式适合不同的协作关系。</span></p>
<p id="f-doxcnT9vhPRDzkcxFj45QiLGV8b"><span style="font-weight:bold">优缺点。</span><span> 它的优势是概念少、上手快，并且与 OpenAI 的 Realtime、Tracing 和 Evals 结合自然，开发者可以比较方便地追踪 Agent 和工具的调用链路。缺点是核心抽象不是显式状态图，Guardrails 也不能代替业务权限；复杂流程、持久化和恢复需要额外设计，深度使用后还会增加 OpenAI 生态绑定。</span></p>
<p id="f-doxcny0CKqc35uW5RG3lkdYzA6e"><span style="font-weight:bold">适用场景。</span><span> 它适合工具调用 Agent、客服分流、专家接管和实时语音应用，特别适合已经确定使用 OpenAI 模型的项目。例如客服 Agent 可以根据问题把会话 Handoff 给退款、技术支持或销售 Agent，并用 Trace 查看整个交接过程。</span></p></blockquote>

<a id="f-doxcnSVpbuxOpLP41SkjsQpGZtb"></a>

###### Claude Agent SDK：Claude Code 风格的完整 Harness

<p id="f-doxcnvw5EpuVG6T37JB0YMcKE5g"><span style="font-weight:bold">定位</span><span>：Claude Agent SDK 将 Claude Code 风格的 Agent 能力嵌入自己的产品和服务。它不是普通模型 API SDK，而是带 Agent Loop、内置工具、上下文管理、权限和会话能力的 Harness。</span></p>

<p id="f-doxcnPvrsOuKBkABFwRfuphoYvb"><span style="font-weight:bold">核心特性</span><span>：文件读写和编辑、Shell、Glob、Grep、Web Search 等内置工具；MCP 与自定义工具；会话、上下文、流式事件；权限、Hooks、人工审批和子 Agent。</span></p>

<p id="f-doxcn7fy4LBTn0CqkrAt6QJuNdh"><span style="font-weight:bold">优点</span><span>：构建编码和文件系统 Agent 时开箱即用，可以复用成熟的工具循环、权限和上下文管理方式。</span></p>

<p id="f-doxcnRNUrW01oivknJk2njhRjAe"><span style="font-weight:bold">局限</span><span>：主要围绕 Claude 生态；SDK 提供 Harness，但通常仍由使用方负责部署和执行环境；文件、Shell 和代码执行必须配套沙箱与最小权限。</span></p>

<p id="f-doxcnDruq5sBbkocXbT3EjTesAf"><span style="font-weight:bold">适用场景</span><span>：代码助手、代码库分析、自动修改、CLI 和研发自动化。简单客服、表单抽取或普通 RAG 通常不需要完整 Harness。</span></p>

<p id="f-doxcn75vHHFtwlrFB5pugIThHEf"><span style="font-weight:bold">学习时需要掌握</span><span>：Claude Agent SDK 与普通 Anthropic SDK / Tool Runner 的区别；使用了哪些内置工具；怎样限制路径、命令和网络；会话如何恢复；为什么选择它而不是 Deep Agents 或手写循环。</span></p>

<blockquote id="f-doxcn0ako1zbyDkWOcPpTKGmVSh"><p id="f-doxcnNZbv5dBt57WHYApMFJX5Pv"><span style="font-weight:bold">面试小卡片｜请简单介绍一下你了解的 Agent 框架</span></p>
<p id="f-doxcneTVnEOfHvcBJJ8BGDP77Hb"><span style="font-weight:bold">核心特点。</span><span> 我了解的 Claude Agent SDK 是把 Claude Code 风格的 Agent Harness 嵌入自己应用的开发工具。它不只是发送 Prompt 的普通模型 SDK，还内置文件读写、代码编辑、Shell、Glob、Grep、Web Search、会话、Hooks、权限控制和子 Agent，Agent 可以在真实工作目录中连续搜索、修改并验证结果。</span></p>
<p id="f-doxcnnU4vHi5y1IYBJrdbHJgahg"><span style="font-weight:bold">优缺点。</span><span> 它的优势是工具循环、会话和上下文管理比较完整，做代码 Agent 时不需要从零实现文件、终端、权限和结果回传。缺点是主要围绕 Claude 生态，而且文件修改和 Shell 都是高权限操作；SDK 提供权限机制并不等于应用已经安全，仍要增加审批、命令允许列表、最小权限和隔离沙箱。</span></p>
<p id="f-doxcnfk31g7R6Aj5Kcp8Gv1HBtd"><span style="font-weight:bold">适用场景。</span><span> 它适合代码助手、代码库分析、自动修改与测试、CLI 工具以及其他研发流程自动化任务。例如可以让它定位一个跨文件 Bug、修改相关代码、执行测试，再根据失败结果继续修复；普通客服或简单结构化抽取通常不需要这么完整的 Harness。</span></p></blockquote>

<a id="f-doxcn2ylxv8ZV1gA9U5Mc9rnfjd"></a>

###### Google ADK：完整的 Agent 工程体系

<p id="f-doxcnde9ocp9dTfvedlHgntPfKb"><span style="font-weight:bold">定位</span><span>：Google ADK（Agent Development Kit）面向 Agent 的开发、运行、评估和部署。它不仅能定义 LLM Agent，也能通过顺序、并行和循环等方式组织确定性 Workflow（工作流）。</span></p>

<p id="f-doxcnzKYmAHNczstE2A7205Pypd"><span style="font-weight:bold">核心特性</span><span>：Agent、Tool、Runner；Sequential、Parallel、Loop Workflow；Session、Memory、Artifact；多 Agent、评估、观测、部署，以及 Gemini、Vertex AI 和 Google Cloud 集成。</span></p>

<p id="f-doxcnrpYtYGAlRyzmK1t9SzMP1f"><span style="font-weight:bold">优点</span><span>：开发到部署链路较完整，兼顾模型自主决策和确定性流程，对 Google Cloud、Gemini 和多语言企业团队友好。</span></p>

<p id="f-doxcnntu3NdCwUpsUnZop0RRX4f"><span style="font-weight:bold">局限</span><span>：深度使用 Google 特有服务会增加迁移成本；简单本地脚本可能不需要整套体系；不同语言 SDK 的能力和稳定等级需按版本核验。</span></p>

<p id="f-doxcn3zQiGwCIrPU2vkc7qgHtud"><span style="font-weight:bold">适用场景</span><span>：Gemini、Vertex AI、Cloud Run 或 GKE 已经是标准栈的企业，以及需要多语言 Agent 体系的团队。</span></p>

<p id="f-doxcn2t6rtZTnwV857lMOOnofKe"><span style="font-weight:bold">学习时需要掌握</span><span>：Agent、Runner、Session、Memory、Artifact 的职责；确定性 Workflow 与 LLM Agent 如何组合；如何评估和部署；使用了哪些 Google Cloud 能力；怎样控制锁定风险。</span></p>

<blockquote id="f-doxcn9Uh8ue7UkY03FvfM1pWlfd"><p id="f-doxcnrWxz9OqdFKIWtG5ZzUEFge"><span style="font-weight:bold">面试小卡片｜请简单介绍一下你了解的 Agent 框架</span></p>
<p id="f-doxcnFJA5rnCILCn19kb9pfMwU8"><span style="font-weight:bold">核心特点。</span><span> 我了解的 Google ADK 更像是用传统软件工程的方式组织一套 Agent 程序。它既支持让 LLM Agent 自主判断，也提供 Sequential、Parallel 和 Loop 等确定性结构来组合多个 Agent，同时通过 Runner、Session、Memory 和 Artifact 管理运行过程。也就是说，开发者既可以让模型决定如何使用工具，也可以明确规定哪些步骤必须按顺序、并行或循环执行。</span></p>
<p id="f-doxcn9xfZROikAoj2MMVANK5JT7"><span style="font-weight:bold">优缺点。</span><span> 它的优势是体系比较完整，可以把模型自主决策嵌入固定业务流程，并配套会话、记忆、产物、评估和部署能力，适合用工程化方式管理多个 Agent。缺点是需要理解的概念较多，简单工具 Agent 使用它会偏重；虽然框架并非只能使用 Gemini，但深度使用 Vertex AI 和 Google Cloud 服务后仍会形成一定平台绑定。</span></p>
<p id="f-doxcntaVGDCWCtrOSMBiBBNSJfd"><span style="font-weight:bold">适用场景。</span><span> 它适合采用 Gemini 或 Google Cloud，需要组合多个 Agent、确定性工作流和企业工程能力的复杂项目。例如可以让资料搜集 Agent 并行工作，再由写作 Agent 顺序生成报告，最后由审核 Agent 循环检查和修改。</span></p></blockquote>

<a id="f-doxcnzbMq9ONweJoIVGkEeqisId"></a>

###### Microsoft Agent Framework：微软企业 Agent 方向

<p id="f-doxcn4IunVQpY0MHNOXuPuFO0Lc"><span style="font-weight:bold">定位</span><span>：Microsoft Agent Framework 面向 Python 和 .NET 的 Agent、多 Agent 协调与工作流。更准确的理解是它为 AutoGen、Semantic Kernel 相关 Agent 使用者提供新的收敛和迁移方向，而不是简单把两个项目改名。</span></p>

<p id="f-doxcnQsvDnKnd0YrvC2PoruSKdd"><span style="font-weight:bold">核心特性</span><span>：Python/.NET 双栈、Agent 与多 Agent 协调、企业工作流和部署，并可结合 Azure、Microsoft 365、身份与治理体系。</span></p>

<p id="f-doxcnRA2G2ztV5ke9QJrHChJJyd"><span style="font-weight:bold">优点</span><span>：对 .NET/C# 企业团队友好，容易接入微软身份、云和企业工具链。</span></p>

<p id="f-doxcneF6eJHW3tSs2o2xQ5HW2lf"><span style="font-weight:bold">局限</span><span>：框架演进和迁移期要关注版本稳定性；对非 Python/.NET 团队吸引力较弱；深度绑定微软特有能力会增加迁移成本。</span></p>

<p id="f-doxcnI5xaA0DJGLamh1mZGwMeBd"><span style="font-weight:bold">适用场景</span><span>：Azure、Microsoft 365、.NET 和企业身份治理占主导的组织。</span></p>

<p id="f-doxcnW92ejXhKl77kBEq79aeqjf"><span>它与 AutoGen、Semantic Kernel 的关系；用了哪些 Azure 或 Microsoft 能力；工作流和多 Agent 如何组织；为什么没有选择 LangGraph 或 Google ADK。</span></p>

<blockquote id="f-doxcnX8hXEEU68N1yWqQJPeIBXg"><p id="f-doxcns7rUVLlJYCfQygptJvaNfg"><span style="font-weight:bold">面试小卡片｜请简单介绍一下你了解的 Agent 框架</span></p>
<p id="f-doxcnRE0J4UpQZ6D5wkat3AKGvf"><span style="font-weight:bold">核心特点。</span><span> 我了解的 Microsoft Agent Framework 是微软面向 Python 和 .NET 提供的 Agent、多 Agent 协调与工作流框架，也可以把它理解为 AutoGen、Semantic Kernel 相关 Agent 能力的收敛方向。它不仅关注模型和工具调用，也强调 Agent 如何接入企业身份、业务系统和微软现有的开发部署体系。</span></p>
<p id="f-doxcn1syR120fwtWVuGTUDSkZag"><span style="font-weight:bold">优缺点。</span><span> 它的优势不是某一种 Agent 算法，而是可以自然接入 Azure、Microsoft 365、企业身份和治理体系，对 .NET 团队尤其友好，也更容易沿用企业原有的权限和运维方式。缺点是框架仍在演进，需要确认项目使用的准确版本及稳定性；如果企业不采用微软技术栈，这些优势就不明显，深度绑定后的迁移成本也较高。</span></p>
<p id="f-doxcnjOFf85DgyGDwX9e2CEBWRe"><span style="font-weight:bold">适用场景。</span><span> 它适合以 Azure、Microsoft 365、.NET 和企业身份治理为标准技术栈的大型组织。例如构建能够访问企业账号、Teams、SharePoint 或内部业务系统的 Agent 时，它比单纯的通用 Python Agent SDK 更符合现有架构。</span></p>
</blockquote>

<a id="f-doxcnuXcwnaxWYeNC0DmAk1Pgg8"></a>

###### CrewAI：角色驱动的多 Agent 框架

<p id="f-doxcnPdQi00E2OReydtSC0jXrqb"><span style="font-weight:bold">定位</span><span>：CrewAI 使用 Role、Goal、Task、Crew 等概念把业务团队映射为 Agent 协作，并通过 Flow 增加状态化和事件驱动控制。</span></p>

<p id="f-doxcn19xRZNn03D5MAqXJttA7Mc"><span style="font-weight:bold">核心特性</span><span>：角色、目标、任务、Crew、Agent 委派、Flow、状态、工具和知识接入。</span></p>

<p id="f-doxcnRCh0B1YbmTuHGHU8qg425B"><span style="font-weight:bold">优点</span><span>：业务表达直观，容易把“研究员—编辑—审核员”建模为虚拟团队，多 Agent 原型开发较快。</span></p>

<p id="f-doxcntT7gGNOIMhwTuCs6v5du6g"><span style="font-weight:bold">局限</span><span>：多 Agent 会增加 Token、延迟、调试难度和错误传播；现实岗位不一定应该映射成独立 Agent；严格事务和复杂恢复仍需显式工作流设计。</span></p>

<p id="f-doxcnWYXj2K4ZKPtbLw2NsBesue"><span style="font-weight:bold">适用场景</span><span>：市场调研、内容生产、销售运营和虚拟专家团队。若角色不需要独立上下文、权限或目标，单 Agent 加工具通常更简单。</span></p>

<p id="f-doxcnh6Li82M2lxby0H9AT8of6f"><span style="font-weight:bold">学习时需要掌握</span><span>：为什么必须用多个 Agent；每个 Agent 的独立职责、上下文和权限；Crew 与 Flow 的区别；怎样减少无效对话；多 Agent 是否真的提高成功率。</span></p>

<blockquote id="f-doxcnSOgzkA2iQURQTrPI70ZGqb"><p id="f-doxcnsZzzlypCg9sqIf3vnmMQZg"><span style="font-weight:bold">面试小卡片｜请简单介绍一下你了解的 Agent 框架</span></p>
<p id="f-doxcnhjTJxUxNGl4W4vpkQoLi0b"><span style="font-weight:bold">核心特点。</span><span> 我了解的 CrewAI 是一个角色驱动的多 Agent 框架。开发时会为不同 Agent 定义 Role、Goal、Backstory、Tools 和 Task，例如研究员搜集资料、作者生成内容、审核员检查结果，再通过 Crew 组织角色协作，或者使用 Flow 增加状态和事件驱动的流程控制。</span></p>
<p id="f-doxcnucuhbzqT7JhnRJc6T8tykd"><span style="font-weight:bold">优缺点。</span><span> 它的优势是业务表达直观，现实团队的职责很容易映射成 Agent，任务委派和多角色原型搭建也比较快。缺点是 Agent 越多，Token、延迟、调试难度和错误传播都会增加，而且角色之间反复对话未必真的提高结果质量，所以不能为了形式而拆分角色。</span></p>
<p id="f-doxcnFnlsmterGC50lWxMz9xzQf"><span style="font-weight:bold">适用场景。</span><span> 它适合市场调研、内容生产、销售运营和虚拟专家团队，前提是不同角色确实拥有独立目标、上下文或权限。如果只是同一个 Agent 依次调用几个工具，通常没有必要为了“多 Agent”再拆成多个角色。</span></p></blockquote>

<a id="f-doxcnhW1sse2wjKjHvdxZRtOa3e"></a>

###### PydanticAI：类型安全的 Python Agent

<p id="f-doxcncYUCMaxiXy8ZtmH7l44zKd"><span style="font-weight:bold">定位</span><span>：PydanticAI 是 Python-first、类型安全优先的 Agent 框架，强调让 Agent 应用像普通 Python 服务一样具备清晰的依赖、工具签名、结构化输出和测试边界。</span></p>

<p id="f-doxcnto9GkS1nxS0jCtf3FXBAcd"><span style="font-weight:bold">核心特性</span><span>：Pydantic 结构化结果校验、类型化依赖注入、根据函数签名生成工具 Schema、多模型提供商抽象、流式输出和测试支持。</span></p>

<p id="f-doxcn83AhroKOTWXjwnwjTdP1Jf"><span style="font-weight:bold">优点</span><span>：对 Python 后端友好；工具参数和模型输出具有清晰类型边界；便于结构化数据处理、测试和 Schema 演进；比大型编排框架轻量。</span></p>

<p id="f-doxcngrGS82rIScrsRXADIMznKb"><span style="font-weight:bold">局限</span><span>：类型安全只能保证数据形状，不能保证模型决策正确；自动重试可能增加 Token 和延迟；它不是完整的分布式长任务运行时。</span></p>

<p id="f-doxcnhxDOz4XGn6m4mn8ToroCPg"><span style="font-weight:bold">适用场景</span><span>：结构化抽取、API 型 Agent、数据库操作和 Python/FastAPI 服务。</span></p>

<p id="f-doxcnj7ddh8xXC6FfsYYFdmxGig"><span style="font-weight:bold">学习时需要掌握</span><span>：输入、依赖、工具和输出怎样建模；校验失败如何处理；重试成本如何控制；切换模型后行为是否一致；类型安全不能解决哪些可靠性问题。</span></p>

<blockquote id="f-doxcnQJOYaVYqsoBBFmgRH0rGte"><p id="f-doxcnCt0ukqdQCtBPekbNgwwtGe"><span style="font-weight:bold">面试小卡片｜请简单介绍一下你了解的 Agent 框架</span></p>
<p id="f-doxcn6q3BBqdhONz4ROoLjC8jHf"><span style="font-weight:bold">核心特点。</span><span> 我了解的 PydanticAI 是一个 Python-first、强调类型安全的轻量 Agent 框架。它使用 Pydantic 定义依赖、工具参数和结构化输出，还可以根据函数签名生成工具 Schema，让 Agent 更接近普通 Python 服务的开发方式。比如可以明确规定工具只能接收某种参数，最终结果必须符合指定的数据模型。</span></p>
<p id="f-doxcnsUJioissrXnTEnirnSNeVg"><span style="font-weight:bold">优缺点。</span><span> 它的优势是输入、依赖、工具和输出的类型边界清晰，便于校验、单元测试和 Schema 演进，也方便集成到现有 Python 后端。缺点是类型安全只能保证数据形状，不能保证模型决策和业务事实正确；校验失败后的自动重试还会增加 Token 和延迟，它也不提供完整的分布式长任务运行时。</span></p>
<p id="f-doxcnXHfr9pwvDjSi0rSap3bFDg"><span style="font-weight:bold">适用场景。</span><span> 它适合结构化抽取、API 型 Agent、数据库操作，以及基于 Pydantic 或 FastAPI 的 Python 后端项目。例如把合同内容抽取为严格的数据对象，或者让 Agent 调用内部 API 并返回可直接写入业务系统的结构化结果。</span></p></blockquote>

<a id="f-doxcnGxnd0gjeitR6ifGs8TCyeb"></a>

###### LlamaIndex：以数据和 RAG 为中心

<p id="f-doxcns6meVgb2jXv3B9RQ3ukFUh"><span style="font-weight:bold">定位</span><span>：LlamaIndex 是数据与知识库优先的 LLM 应用框架。它也能构建 Workflow 和 Agent，但选择它的首要理由通常是数据连接、文档摄取、索引、检索和 RAG（检索增强生成）。</span></p>

<p id="f-doxcnESHZ7xsGvS80Mo2UsYcOdg"><span style="font-weight:bold">核心特性</span><span>：数据连接器、文档摄取、切分与元数据、索引、Retriever、Query Engine、RAG、数据上的 Workflow 与 Agent，以及评测集成。</span></p>

<p id="f-doxcnjfGESroFOL6slqcEFiyFTb"><span style="font-weight:bold">优点</span><span>：数据源和检索生态丰富，适合快速建立企业知识库，并将企业数据作为 Agent 上下文或工具。</span></p>

<p id="f-doxcnfnHbd9LklD2e8Q53Bd9Jgh"><span style="font-weight:bold">局限</span><span>：仍需认真处理数据清洗、权限、版本和召回质量；接上向量库不等于 RAG 已可靠；强状态业务编排可能需要搭配 LangGraph 等运行时。</span></p>

<p id="f-doxcnUjfH63k4CTBow3adgWJHGg"><span style="font-weight:bold">适用场景</span><span>：合同、研报、企业文档、知识助手和数据密集型 Agent。</span></p>

<p id="f-doxcnduIcBLnbn978Al9mEtWWmd"><span>Retriever 和重排序怎样设计；如何做权限过滤；用什么指标评估 RAG；为什么不用自研、Haystack 或 LangChain 检索组件。</span></p>

<blockquote id="f-doxcnjt75D56lAejpK8vuCv5Vdg"><p id="f-doxcnWFQxzfimLB2ihg3MFDNsBL"><span style="font-weight:bold">面试小卡片｜请简单介绍一下你了解的 Agent 框架</span></p>
<p id="f-doxcnIk2Lp7iwZmTnZ2NjGW5ltR"><span style="font-weight:bold">核心特点。</span><span> 我了解的 LlamaIndex 是一个以数据和 RAG 为核心的 LLM 应用框架。它重点解决数据连接、文档摄取、切分、元数据、索引、Retriever 和 Query Engine，并可以把检索能力作为 Agent 的上下文或工具。它的基本思路是先把企业资料组织成可查询的数据层，再让模型基于检索到的证据回答或行动。</span></p>
<p id="f-doxcnNZDiPhu7NAH5aGaW3vCiXf"><span style="font-weight:bold">优缺点。</span><span> 它的优势是数据源和检索生态完整，能较快把企业私有数据接入应用，并且对 Retriever、Query Engine 等数据组件的抽象比较成熟。缺点是接上向量库并不代表 RAG 就可靠，数据清洗、权限同步、增量更新、召回、重排序和评测仍然需要专门设计；复杂业务状态控制也可能需要搭配 LangGraph 等运行时。</span></p>
<p id="f-doxcnH5p082xuSZ1e6mC8Anz5Mc"><span style="font-weight:bold">适用场景。</span><span> 它适合合同、研报、企业文档问答、知识助手以及其他数据密集型 Agent。例如面对持续更新的大量内部资料，需要按部门权限检索并给出证据来源时，LlamaIndex 的价值会比普通工具调用框架更明显。</span></p></blockquote>

<a id="f-doxcnGa5V4zbtg3XfQzAYXQLG7f"></a>

###### Dify：低代码 AI 应用平台

<p id="f-doxcn5PTLZHLxjFK3ylkd5QanAe"><span style="font-weight:bold">定位</span><span>：Dify 是低代码 AI 应用开发与运营平台，而不只是一个 Python SDK。它通过可视化工作流、知识库、模型和工具管理，帮助团队快速发布 Web 应用或 API。</span></p>

<p id="f-doxcn1NzRN3wbLqajk4A5c7ctvb"><span style="font-weight:bold">核心特性</span><span>：可视化 Workflow 和 Agent、知识库与 RAG、模型工具和插件管理、运行日志、Web 应用/API 发布、云服务和自托管。</span></p>

<p id="f-doxcnDNWiGKWB0wh482s3bTd3mf"><span style="font-weight:bold">优点</span><span>：从原型到可用应用速度快，产品、运营和工程人员可以共同参与，常见知识助手场景开箱即用。</span></p>

<p id="f-doxcnPSeW31MsWTM2dEVstI6bhd"><span style="font-weight:bold">局限</span><span>：复杂逻辑堆积在画布后，测试、复用和代码审查会变困难；深度定制不如代码框架；开源、托管和企业版能力边界要按版本核验。</span></p>

<p id="f-doxcngEhvCPiBP7VLEOexT6WcSd"><span style="font-weight:bold">适用场景</span><span>：内部知识助手、运营自动化、快速业务验证和非纯工程团队。不适合把强事务、强实时的核心领域逻辑全部放进画布。</span></p>

<p id="f-doxcnPLZ1uNXT5cNesp3CxukYfe"><span style="font-weight:bold">学习时需要掌握</span><span>：为什么项目需要低代码；Workflow、知识库、工具和发布如何配合；自托管数据和凭据怎么管；怎样做版本与测试；复杂逻辑如何下沉到独立服务。</span></p>

<blockquote id="f-doxcncJnAy4lG8wBdcsvcfbioyh"><p id="f-doxcnS2ezm5EMv3iosa4sK8lsBz"><span style="font-weight:bold">面试小卡片｜请简单介绍一下你了解的 Agent 框架</span></p>
<p id="f-doxcnG9SVxpaQjt4IWspZgwnRmd"><span style="font-weight:bold">核心特点。</span><span> 我了解的 Dify 是一个低代码 AI 应用平台。开发者可以在可视化画布中组合模型、Prompt、知识库、工具和 Workflow，并直接发布成 Web 应用或 API，同时在平台中管理模型配置、凭据和运行日志。它与普通 SDK 的区别是，不只提供代码组件，还提供了可以直接使用的应用搭建和运营界面。</span></p>
<p id="f-doxcnre5PaZSNa44XyMeFVH6k8b"><span style="font-weight:bold">优缺点。</span><span> 它最大的优势是上手快，从原型到可用应用的路径很短，而且产品、运营和开发可以共同参与，知识库类应用尤其容易落地。缺点是流程复杂以后画布会越来越难维护，测试、复用、代码审查和深度定制都不如代码框架灵活；低代码降低的是开发门槛，并不会自动解决业务复杂度。</span></p>
<p id="f-doxcn4VuYO4B1gzTufhGIe4xohc"><span style="font-weight:bold">适用场景。</span><span> 它适合内部知识助手、运营自动化、快速业务验证和需要非工程人员参与搭建的项目。例如业务团队可以自己调整 Prompt 和知识库，而开发团队只提供外部 API 工具；强事务和高并发的核心业务逻辑通常仍应放在独立服务中。</span></p>
</blockquote>

<a id="f-doxcnfZJRI839GBkrirwrKmv8Je"></a>

###### AgentScope：国内模型与企业生态候选

<p id="f-doxcn9jecrxvzyEncglTUOhf6gM"><span style="font-weight:bold">定位</span><span>：AgentScope 面向 Agent 和多 Agent 应用，强调透明、可控以及 Python/Java 和国内模型、云服务生态的适配，常被国内企业纳入私有化和国产模型项目候选集。</span></p>

<p id="f-doxcnlLDzbFatuEnpPSBmTHCNEb"><span style="font-weight:bold">核心特性</span><span>：Agent、多 Agent 协作、工具、消息、记忆、工作流、Python/Java 支持，以及国内模型和阿里生态集成。</span></p>

<p id="f-doxcnLNLgZ8Klf76WkfvVNV1hmV"><span style="font-weight:bold">优点</span><span>：对国内模型、Java 团队和阿里云环境更友好，适合具有私有化、数据驻留和国产化要求的候选场景。</span></p>

<p id="f-doxcnS8z5QsjnRSKhYFstGSE3c2"><span style="font-weight:bold">局限</span><span>：国际社区、英文资料和第三方生态与部分海外热门框架存在差异；支持私有化不等于自动满足合规；协议、模型和部署能力应按版本实测。</span></p>

<p id="f-doxcnp6wYSvpiieU2GKHPKIFKwf"><span style="font-weight:bold">适用场景</span><span>：国内企业、国产模型、Python/Java 混合团队和阿里云场景。</span></p>

<p id="f-doxcnrUSgTtr85WYFBK7AQA7DHh"><span>选择它是否因为 Java、国产模型、阿里云或私有化；数据是否真正留在企业边界；与 LangGraph、Google ADK 或 Dify 有何区别。</span></p>

<blockquote id="f-doxcnDDK1kLAzUW1NMqoBcf8c5e"><p id="f-doxcnf2KBep5XSsfQLC6Ejkvtxg"><span style="font-weight:bold">面试小卡片｜请简单介绍一下你了解的 Agent 框架</span></p>
<p id="f-doxcnklUO13MrMazrabivyjHKxf"><span style="font-weight:bold">核心特点。</span><span> 我了解的 AgentScope 是一个支持 Agent、多 Agent、消息、工具、记忆和工作流的框架。它比较鲜明的特点是兼顾 Python 和 Java，并重视国产模型、国内云服务和私有化部署适配，因此不只是研究型多 Agent 框架，也考虑了国内企业的实际技术环境。</span></p>
<p id="f-doxcnzJjC6fphGHahlNtv42Fqoh"><span style="font-weight:bold">优缺点。</span><span> 它的优势是更贴近国内企业技术栈、国产模型和数据驻留需求，对 Java 团队和阿里云环境也更友好。缺点是国际社区、英文资料和第三方生态相对较弱，不同模型与部署能力需要按版本实测；而且可以私有化部署只代表系统能部署在企业边界内，并不代表自动满足安全与合规要求。</span></p>
<p id="f-doxcnZF1C6wWRylrZuVLnR1YTJg"><span style="font-weight:bold">适用场景。</span><span> 它适合国内企业、国产模型、阿里云环境，以及 Python 和 Java 混合团队的多 Agent 项目。例如企业要求数据不离开内网，同时需要接入国产模型并让多个专业 Agent 协作时，可以把 AgentScope 纳入候选方案。</span></p></blockquote>

<a id="f-doxcngOmpoDUDfhxC60xRteFhGg"></a>

##### 框架选型策略

<p id="f-doxcnPuUtakSuD3m80slABuAvig"><span>选框架不需要比较一张密密麻麻的功能表。按照下面四步逐层筛选，通常可以把范围缩小到一个主框架，或者最多两个候选。</span></p>

<p id="f-doxcnsced9iDExZUPzFyTanmIie"><span>团队技术栈 → 核心业务场景 → 部署平台 → 模型偏好</span></p>

<p id="f-doxcnDhfq5AiOdZQ6azNB5EjyGf"><span style="font-weight:bold">第一步：看团队技术栈</span></p>

<p id="f-doxcngmQpWFnMzH6rZlpslz245g"><span>先排除团队难以长期维护的框架。</span></p>

<div style="margin-left:25px"><div id="f-doxcn9T9e285Hfj46vyb3xb3EEe" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">.NET / C# 团队：</span><span> 优先选 </span><span style="font-weight:bold">Microsoft Agent Framework</span><span>。</span></div></div><div id="f-doxcnpEo41H45nIcF02YS1QE1tf" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">Java 团队：</span><span> 国内企业优先看 </span><span style="font-weight:bold">AgentScope</span><span>；Google Cloud 团队看 </span><span style="font-weight:bold">Google ADK</span><span>。</span></div></div><div id="f-doxcn1ncrjGZRk5LvvgeK08u8Yb" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">Python 团队：</span><span> 12 个框架基本都能选择，继续看业务场景。</span></div></div><div id="f-doxcnkyNOamea4XMYl76UJZmLth" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">TypeScript 团队：</span><span> 通用 Agent 看 </span><span style="font-weight:bold">LangChain</span><span>，复杂状态流程看 </span><span style="font-weight:bold">LangGraph JS</span><span>，OpenAI 项目看 </span><span style="font-weight:bold">OpenAI Agents SDK</span><span>。</span></div></div><div id="f-doxcnKlGku8hAozqOtz1irjofkc" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">产品、运营人员也要参与搭建：</span><span> 直接优先保留 </span><span style="font-weight:bold">Dify</span><span>。</span></div></div></div>

<p id="f-doxcnOHqKYF3l2RjZqpFpe9P2jf"><span>这一步结束后，不要选出最终框架，只需要留下团队真正能够开发和维护的候选。</span></p>

<p id="f-doxcnF8dmukrxHBr6zVOcrbaWyb"><span style="font-weight:bold">第二步：看核心业务场景</span></p>

<p id="f-doxcnP8I8PDXOw6eEYr7F1hwDtf"><span>这是最关键的一步。只问一个问题：</span><span style="font-weight:bold">这个项目最难解决的是什么？</span></p>

<div style="margin-left:25px"><div id="f-doxcnWPoAU3afR67B2cdd2AmbZe" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">通用工具调用、快速原型：</span><span style="font-weight:bold">LangChain、OpenAI Agents SDK、PydanticAI</span><span>。</span></div></div><div style="margin-left:25px"><div id="f-doxcno30cukZ3iqx6U1FWi1ohTg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">▪</span><div><span>需要多模型和工具生态选 LangChain；</span></div></div><div id="f-doxcnMxJq74BiTVF5vOw2moBKaf" style="display:flex;gap:0.5em"><span style="min-width:1.5em">▪</span><div><span>已确定使用 OpenAI 选 OpenAI Agents SDK；</span></div></div><div id="f-doxcnfmulYjgWhL4npsntOpap9d" style="display:flex;gap:0.5em"><span style="min-width:1.5em">▪</span><div><span>Python 项目重视类型和结构化输出选 PydanticAI。</span></div></div></div><div id="f-doxcnxeMvK4GvieWeSjeb5xPmGc" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">复杂流程、状态、暂停和恢复：</span><span style="font-weight:bold">LangGraph</span><span>。</span></div></div><div id="f-doxcnU3PHv4o2ssYZ36qsFDSu6d" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">长任务、深度研究、多文件处理：</span><span style="font-weight:bold">Deep Agents</span><span>。</span></div></div><div id="f-doxcn8dOFn5svZkLuAs3c7YWmIg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">代码库、文件编辑和 Shell 自动化：</span><span style="font-weight:bold">Claude Agent SDK</span><span>。</span></div></div><div id="f-doxcnfPagfOlWRLROlB0TTJhGoc" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">企业文档、知识库和复杂 RAG：</span><span style="font-weight:bold">LlamaIndex</span><span>。</span></div></div><div id="f-doxcn0OZzN4PWmXkdVIVsZDrP2Q" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">角色化多 Agent 协作：</span><span style="font-weight:bold">CrewAI</span><span>；国内模型或 Java 环境看 </span><span style="font-weight:bold">AgentScope</span><span>。</span></div></div><div id="f-doxcnMVUpIGVC4oynQreT594SoH" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">低代码搭建并快速发布应用：</span><span style="font-weight:bold">Dify</span><span>。</span></div></div><div id="f-doxcnayTMOOxnBQbDirS4Q8NaFd" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">需要用顺序、并行和循环组织多个 Agent：</span><span style="font-weight:bold">Google ADK</span><span>；微软企业技术栈则看 </span><span style="font-weight:bold">Microsoft Agent Framework</span><span>。</span></div></div></div>

<p id="f-doxcnwOF9POFHNbxJXVkUJDnhbh"><span>走完这一步，候选通常只剩两三个。</span></p>

<p id="f-doxcnne67Ht7DtGefEddh3wo3Qc"><span style="font-weight:bold">第三步：看部署平台</span></p>

<p id="f-doxcnlqvVCSaygdmQGFHqZL5IGd"><span>如果公司已经确定云平台，这一步可以直接进一步收窄候选。</span></p>

<ul><li id="f-doxcnrCR8NJuFsfJEUxWt56L02e"><span style="font-weight:bold">Azure / Microsoft 365：</span><span style="font-weight:bold">Microsoft Agent Framework</span><span>。</span></li></ul>

<ul><li id="f-doxcnoFVOcNRCxKFkc6kt1EtgLN"><span style="font-weight:bold">Google Cloud / Vertex AI：</span><span style="font-weight:bold">Google ADK</span><span>。</span></li></ul>

<ul><li id="f-doxcnlu0UsROnUVOsPgEySjVxTd"><span style="font-weight:bold">阿里云、国产模型或国内私有化环境：</span><span style="font-weight:bold">AgentScope</span><span>；需要低代码平台时选 </span><span style="font-weight:bold">Dify</span><span>。</span></li></ul>

<ul><li id="f-doxcngsZrU9NxXYdeUfyci5NeOc"><span style="font-weight:bold">本地服务器自托管，业务人员还要参与：</span><span style="font-weight:bold">Dify</span><span>。</span></li></ul>

<ul><li id="f-doxcnQ40w7H26d8uGj6iUxPmzhe"><span style="font-weight:bold">没有固定云平台：</span><span> 保留第二步的候选，不要为了云厂商更换更符合业务场景的框架。</span></li></ul>

<p id="f-doxcnkRjPXJX4AxfP1aSM8Lom1c"><span>例如核心问题是复杂 RAG，即使部署在 Google Cloud，仍然可以选 LlamaIndex，而不是因为使用 Google Cloud 就强行改选 Google ADK。</span></p>

<p id="f-doxcnDU4Xr7SLGfvNWZ4aCPbGxb"><span style="font-weight:bold">第四步：看模型偏好</span></p>

<p id="f-doxcnlzntWNj4RBMmqQD0n96Yvk"><span>模型已经确定时，优先选择与该生态结合最自然的框架；没有确定时，优先保留模型相对中立的方案。</span></p>

<ul><li id="f-doxcns4l60NyfEAGnqLbZde5mxd"><span style="font-weight:bold">OpenAI：</span><span style="font-weight:bold">OpenAI Agents SDK</span><span>，尤其适合 Handoff、Tracing 和实时语音。</span></li></ul>

<ul><li id="f-doxcnSuukCmmE5rgFro6IaeUwgg"><span style="font-weight:bold">Claude：</span><span> 编码、文件和 Shell 任务选 </span><span style="font-weight:bold">Claude Agent SDK</span><span>。</span></li></ul>

<ul><li id="f-doxcnCfiC5hWEXZ0myG0WXAtj1d"><span style="font-weight:bold">Gemini：</span><span style="font-weight:bold">Google ADK</span><span>。</span></li></ul>

<ul><li id="f-doxcncGBJDTACh2FZDPMn5sjKKd"><span style="font-weight:bold">国产模型：</span><span style="font-weight:bold">AgentScope</span><span>；低代码应用可选 </span><span style="font-weight:bold">Dify</span><span>。</span></li></ul>

<ul><li id="f-doxcnshxpcjE5qKNz0hyZqgH4Sb"><span style="font-weight:bold">需要随时切换不同模型：</span><span> 根据场景保留 </span><span style="font-weight:bold">LangChain、PydanticAI、LangGraph、Deep Agents 或 LlamaIndex</span><span>，避免把业务逻辑写死在厂商特有接口中。</span></li></ul>

<p id="f-doxcnRm7jGS21ej5dtbCo0b8img"><span>走完前四步，通常已经可以锁定一个主框架，或者最多留下两个候选。</span></p>

<div id="f-doxcn97DowMJV1nDXftRSgIM8ce"><img alt="" decoding="async" height="853" loading="lazy" src="/images/agent-learning/696499f6cb6bfbe384f864c0.png" width="1280"/></div>

<p id="f-doxcnrEHd0LVqNUqlLHQIT1czZ1"><span>更简单一点的策略：</span></p>

<div style="margin-left:25px"><div id="f-doxcnnghWxL4lMwJdOjqpUFToBg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>复杂状态与恢复 → </span><span style="font-weight:bold">LangGraph</span></div></div><div id="f-doxcnD16TFdGCx1s7CETbrh6kIg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>长任务与研究 → </span><span style="font-weight:bold">Deep Agents</span></div></div><div id="f-doxcnzgXStf6P5E1qoeIvsLxwwd" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>Claude 编码与文件任务 → </span><span style="font-weight:bold">Claude Agent SDK</span></div></div><div id="f-doxcnoQeHFsYVMhOnzhLcyfnGEg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>企业数据与 RAG → </span><span style="font-weight:bold">LlamaIndex</span></div></div><div id="f-doxcnA7oljg0My8Zwdhww5tQuT2" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>角色型多 Agent → </span><span style="font-weight:bold">CrewAI / AgentScope</span></div></div><div id="f-doxcnSKvRHIloNTZQ5q8XjQxLIg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>低代码快速发布 → </span><span style="font-weight:bold">Dify</span></div></div><div id="f-doxcnaMWVxEK8b0sNfoQCQpd9Lh" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>Python 类型安全 Agent → </span><span style="font-weight:bold">PydanticAI</span></div></div><div id="f-doxcny5ClKd8Aumd9EtnoEHcjcb" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>OpenAI 与实时语音 → </span><span style="font-weight:bold">OpenAI Agents SDK</span></div></div><div id="f-doxcnAEBCRSTAebobd5apswliih" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>Google Cloud 工程体系 → </span><span style="font-weight:bold">Google ADK</span></div></div><div id="f-doxcn90MelwDqGpiNkzZWGPdjzc" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>Azure / .NET 企业体系 → </span><span style="font-weight:bold">Microsoft Agent Framework</span></div></div><div id="f-doxcndLD92Wzef2gV6U5r7uc4le" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>通用模型、工具和检索集成 → </span><span style="font-weight:bold">LangChain</span></div></div></div>

<a id="f-doxcnsYFEofX44bmSwnaFVGuG5g"></a>

##### 面试问题

<p id="f-doxcnifhfRPg7YCBrT7hAhItNnh"><span>Agent 框架相关的面试问题，最常见的主要有两个：</span><span style="font-weight:bold">一是考察你是否了解常见框架，二是追问你的项目为什么选择某个框架。</span><span>第一个问题其实已经在 </span><span><span><a href="#f-doxcnIQhpuoOE6lBmv31Hw2QgTg"><span>1.1.4 各框架特点</span></a></span></span><span>详细介绍展示过了，现在我们就解析第二个问题：</span><span style="font-weight:bold">你的项目为什么选择某个框架？</span></p>

<p id="f-doxcnW4NB0jQDB5KWtRF9xMDOOy"><span>这个问题是一个开放性问题，没有标准答案，也许你是拍脑袋就定了你的项目Agent框架。但是即使如此，你回答这个问题的时候，也要根据我们上面的各个框架的特点，选型策略，结合自己项目来回答。很好的一个方法就是把你的项目和上面的这些文档，丢给AI，让它基于这些问题帮你起草一个答案，你以后就照着用就好：</span></p>

<p id="f-doxcnTrOF5qkClg8Pq8KEQyfnSs"><span style="font-weight:bold">参考案例：</span><span><span style="font-weight:bold"><a href="/posts/agent-learning-23-learning-cases/#f-doxcn2UuVdw5tRU20F4G5ZRs1Kh"><span>SmartAppointment 项目</span></a></span></span><span style="font-weight:bold">（本节的Agent项目）为什么选择 LangGraph？</span></p>

<p id="f-doxcnN0yGcDRlc4hyinpMEE3Btb"><span style="font-weight:bold">参考回答</span></p>

<blockquote id="f-doxcnNJLrluwsXPxcpSjgd4Hoqf"><p id="f-doxcnDTErNrYFXDwmGLcQr1auXe"><span>我们这个项目是一个企业售后智能客服与预约系统。它不只是让模型调用几个工具，而是要在一次会话中</span><span style="font-weight:bold">完成咨询、故障判断、服务人员匹配和预约处理</span><span>，并且在</span><span style="font-weight:bold">多个 Agent 之间传递用户信息</span><span>。项目最关键的问题是如何管理一个持续变化、能够暂停和恢复的业务状态。</span></p>
<p id="f-doxcn9vONBxi5GsyXFF3SO2vYZg"><span>本案例选择</span><span style="font-weight:bold"> LangGraph，首先是因为它可以把这套流程明确建模为状态图</span><span>。我们会在 State 中统一保存用户和会话标识、消息历史、当前意图、预约时间、服务类型、工程师偏好、RAG 证据、当前处理 Agent、工具结果和确认状态。主管 Agent、咨询 Agent、预约 Agent、用户行为分析、工具执行和用户确认分别对应不同 Node，再通过条件 Edge 决定下一步进入咨询、继续补充预约信息、调用预约工具，还是等待用户确认。</span></p>
<p id="f-doxcnJUZrl8le3LvAy6HNupYmih"><span style="font-weight:bold">第二个原因是预约任务天然需要循环和中断</span><span>。例如用户只说“帮我预约维修”，时间、地址或服务类型可能不完整，流程需要回到槽位补全节点继续询问；创建、修改和取消预约属于有副作用的操作，执行前要通过 Interrupt 暂停，让用户确认关键参数。使用 Checkpoint 保存状态后，即使用户稍后回复或者服务重启，也可以从确认前的状态继续，而不必重新进行前面的咨询和信息收集。</span></p>
<p id="f-doxcnzfehvStx1KVTxOWv3ITwQd"><span>我也比较过其他方案。LangChain 很适合接模型、工具和 RAG，我们仍然可以使用它的部分组件，但只使用高层 Agent 时，预约状态、条件分支和恢复逻辑不够显式。CrewAI 用角色描述咨询、预约和分析 Agent 会很直观，但这个项目的核心不是让多个角色自由讨论，而是保证预约流程按照业务状态可靠流转。Dify 可以更快做出可视化 Demo，但随着槽位状态、权限确认、幂等写入和自动化测试增加，代码式状态图会更容易维护。</span></p>
<p id="f-doxcnVeegMQqquAjas96aj2O51Y"><span>LangGraph 的代价是开发复杂度更高。我们需要自己设计 State Schema、Checkpoint 存储、节点重试和幂等机制，特别是创建或取消预约时，要通过业务幂等键防止恢复或重试造成重复写入。同时还需要记录节点流转、工具参数和状态变化，方便定位到底是路由、RAG、槽位提取还是工具执行出现问题。</span></p>
<p id="f-doxcnLHsHR3IOvPNttjBhlbkRc9"><span>所以我们的选择依据不是“LangGraph 支持多 Agent”，而是这个系统同时需要共享状态、条件路由、多轮补全、人工确认和中断恢复。</span><span style="font-weight:bold">LangGraph 能把不确定的模型判断放进可控制、可追踪的预约流程中，这一点与项目的核心需求最匹配。</span></p></blockquote>

<a id="f-doxcnsa8D1ZtFuHPcMKeHbFBnFe"></a>

##### 讲解视频

<p id="f-doxcnsaP2hLprGPIycWLthk0jVf"><span><span><a href="https://www.bilibili.com/video/BV1ZogE6GE4V/?spm_id_from=333.1387.homepage.video_card.click&amp;vd_source=144bec9c3f54e465073138bed788be1b"><span>https://www.bilibili.com/video/BV1ZogE6GE4V/?spm_id_from=333.1387.homepage.video_card.click&amp;vd_source=144bec9c3f54e465073138bed788be1b</span></a></span></span></p>


<a id="section-0068"></a>
## LangChain

<a id="f-doxcnglImkqxn1YciQzd3ufbEPf"></a>

<a id="f-doxcnmLtTk3e26PkektCq86Bzmf"></a>

##### LangChain 核心设计理念和框架

<p id="f-doxcnm016WutbaFcmHGMZK3Aslg"><span>（算是基本概念，得背）</span></p>

<p id="f-doxcnBTFwirAgJFdqUnEfwh2BPe"><span>Langchain 的核心思想是 通过模块化组件： </span><span style="font-weight:bold">Prompt, Memory, Tool, Chain 将LLM与外部数据源，工具（向量数据库，多种LLM）结合</span><span>，形成</span><span style="font-weight:bold">可复用的“链式逻辑</span><span>“。特点是灵活，生态丰富，适合快速原型开发。</span></p>

<p id="f-doxcnqQbwkzG3X4H2LQnf5Yhn7d"><span>特点是：</span><span style="font-weight:bold">以链为核心，逻辑是线性和简单分支</span><span>，不擅长复杂状态管理。</span></p>

<a id="f-doxcnzqmUe0713eOJZJyZZxVzLg"></a>

##### LangChain的版本

<p id="f-doxcn3XILFMABB7FxYEXi9g5pfb">需要明确项目实际使用的 LangChain 版本，并了解对应特性与接口。表格可帮助比较版本变化；案例使用过 v0.3.6。</p>

<div id="f-doxcnNVq7q9ydDvHnpCi423ZQae"><img alt="" decoding="async" height="287" loading="lazy" src="/images/agent-learning/ee72985f88167407d1b8316b.png" width="754"/></div>

<a id="f-doxcnSKBJx41KegVGKbYTTl1v4g"></a>

##### LangChain 1.0新版本

<p id="f-doxcnnRkIilUV49Nk0hcbxAEzTd">LangChain 新旧版本存在较大变化。需要明确项目实际使用的版本，理解对应接口，并根据需求研究 1.0 的新特性。</p>

<p id="f-doxcnvI8T9Hdw5g9Ew0Zj2vwkje"><span>这里的复习思路是</span><span style="font-weight:bold">大概理解一下新特性思路和思想就好了，不用太深入研究，</span><span>因为目前问的不多，面试官最多问道你知不知道langchain新版本。 如果你想要深入学习一下，可以看</span><span><span><a href="https://mp.weixin.qq.com/s/asAiFhl8mWIl01s-LSD9VA"><span>https://mp.weixin.qq.com/s/asAiFhl8mWIl01s-LSD9VA</span></a></span></span><span>）</span></p>

<p id="f-doxcnvEhyVZUuAbG5kgj0JCMKVb"><span>Langchain v1.0的升级 标志着 LangChain 已经走出“实验阶段”，成为一个稳定、可用于生产的框架。具体来讲，在这次升级，引入了以下新特性：</span></p>

<ol start="1"><li id="f-doxcnB3ZBttaCyWrcpBGaabxKdb"><span>智能体（Agent）的全新创建方式</span></li></ol>

<div id="f-doxcnuwkhBwyYS8tzUiKbz1nY4b" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>之前的 Agent 创建方式比较复杂，需要手动配置多个组件。</span></div></div>

<div id="f-doxcnkFeA6U2546yHuCmmryM4ze" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>v1.0 提供更简洁的 API，通过标准化的构建流程，开发者可以快速定义 Agent 的行为、工具调用逻辑，并且支持更复杂的任务编排（比如多步骤推理、条件分支）。</span></div></div>

<ol start="2"><li id="f-doxcnMbracMOMr38Rk6u2VAjjMb"><span>中间件机制（Middleware）</span></li></ol>

<div id="f-doxcnWSyKGspKJhoMvvgfevX2Dd" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>类似 Web 框架的中间件概念，可以在执行链路中插入逻辑。</span></div></div>

<div id="f-doxcn18WXWnx5La7vZEm8XC51dc" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>应用场景：日志记录、性能监控、错误重试、缓存、权限控制。</span></div></div>

<div id="f-doxcnH8MyY4gCTm4uwkTkn4z2fh" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>好处：开发者无需修改核心逻辑，就能在执行过程中添加这些功能，提升可维护性。</span></div></div>

<ol start="3"><li id="f-doxcnZ7DwhVyrHZtOXc5uZi4huL"><span>结构化输出</span></li></ol>

<div id="f-doxcnojQV0N7ThWogPHh5GsYxle" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>之前 LLM 输出是纯文本，容易出现格式错误。</span></div></div>

<div id="f-doxcn9K6YNjuVqxuR97JHUflJqb" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>v1.0 支持 JSON Schema 和 Pydantic 类型验证，可以强制模型输出符合预期结构。</span></div></div>

<div id="f-doxcnoldKPeFaVSR1bRBwvyjfBd" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>好处：减少 LLM 不确定性，适合生产环境，尤其是需要严格数据格式的场景（如 API 响应、数据库写入）。</span></div></div>

<ol start="4"><li id="f-doxcncHUFOXvNT2qCg5dNuNTXdg"><span>标准内容块</span></li></ol>

<div id="f-doxcnue5pM1V9J4nej88n8HJ6Ne" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>提供标准化的 Prompt 模板、工具接口、链组件。</span></div></div>

<div id="f-doxcnenJAtbMup6zfPs3By7C0hd" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>好处：降低重复开发，开发者可以直接复用官方标准块，减少定制成本。</span></div></div>

<ol start="5"><li id="f-doxcn0fWCgeiGiiKCkTUHHeAvv5"><span>全新的包结构与模块化设计</span></li></ol>

<div id="f-doxcnur7vOVY0cJwkqFGv7CR9Ee" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>命名空间重构：拆分为 </span><span><span><span>langchain_core</span></span></span><span>（核心逻辑）、</span><span><span><span>langchain_community</span></span></span><span>（社区集成）、</span><span><span><span>langchain_experimental</span></span></span><span>（实验功能）。</span></div></div>

<div id="f-doxcnBVBpi5w0UicgBj6X3lwEZh" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>好处：模块职责更清晰，升级和维护更方便，避免以前版本中“包太大、依赖混乱”的问题。</span></div></div>

<a id="f-doxcnjnYm6Bzdm5u6zbDMFJrpyd"></a>

##### LangChain 不方便的地方

<p id="f-doxcnNepvd3jUhe66XzoNScXWKb">除 LangChain 的基本概念，也需要理解框架设计的便利性与局限性。</p>

<p id="f-doxcnETIxmF2bfXgxsDXWXoYbWc"><span style="font-weight:bold">1.依赖过多，复杂度高</span></p>

<p id="f-doxcn8IyO0HYux9Qi4gT34oA3Gd"><span>LangChain集成了大量向量数据库，模型提供商和工具，虽然理论是可选，但是实际使用中很多功能需要安装一堆依赖，导致项目臃肿，容易出现"依赖地狱", 对于只需要简单功能的项目，这种设计显得过度。</span></p>

<p id="f-doxcnYr4SRZv614PKZSZGnw7Msb"><span style="font-weight:bold">2.频繁更新，接口不稳定</span></p>

<p id="f-doxcnqj8Enu2jgSyIg0napOBZib"><span>LangChain迭代速度太快，但是带来大量破坏性更新，API接口经常变化，文档滞后，导致开发需要不断重构代码，维护成本高。</span></p>

<p id="f-doxcngPnUBu0lSuavpFofjrskhf"><span style="font-weight:bold">3.性能和延迟问题</span></p>

<p id="f-doxcn3L4KQsDwxOk29HkETnGZbf"><span>LangChain的链式调用每一步都可能涉及外部API， 导致延迟明显，尤其是需要实时响应的场景中表现不佳，链式调用其实也增加了出错概率和调试难度。</span></p>

<p id="f-doxcn7Z1D4MZJANkyI5OIykdLhh"><span style="font-weight:bold">4.不够灵活，定制困难</span></p>

<p id="f-doxcndU4rMTuOJuMWygkNQAiUkf"><span>高度抽象导致很多底层逻辑无法轻易改变，遇到特殊需求时，开发者往往需要绕过框架，甚至重写部分功能。</span></p>


<a id="section-0070"></a>
## 面试真题

<a id="f-doxcnDlyR8IUaWre2GRmI0j3xkc"></a>

<a id="f-doxcndLl9rSI3OZSh3y6E1wg9sZ"></a>

##### LangChain / LlamaIndex 解决了什么问题，有哪些局限？

<p id="f-doxcnIXRrPlV01rcpXx4RzJwL1g"><span>💡 </span><span style="font-weight:bold">思路：</span><span> 感觉纯八股题，看了我们主流框架介绍的笔记，应该对这些有一个印象。</span></p>

<p id="f-doxcnuAoVM9LavVxK0JkLw9T93y"><span>📝 </span><span style="font-weight:bold">答案：</span></p>

<p id="f-doxcn6YnglsMblVb7G9hiHpihug"><span>LangChain 和 LlamaIndex 本质上都在解决一个问题：</span><span style="font-weight:bold">大模型只提供基础的生成能力，而一个完整的 LLM 应用还需要连接模型、私有数据、外部工具、会话状态和执行流程</span><span>。它们通过统一抽象和现成组件，减少重复的工程开发。不过两者最初的侧重点不同，现在的能力已经有较多重叠。</span></p>

<p id="f-doxcno7T3miaah56zXi3Zu9Y5Ae"><span style="font-weight:bold">LangChain 更偏应用与 Agent 编排</span><span>。它对不同模型、Prompt、工具、结构化输出和中间件提供统一接口，并支持把这些组件组织成 Chain 或 Agent。比如开发一个能够查询数据库、调用搜索 API、根据结果继续决策的 Agent，LangChain 可以帮助我们完成模型接入、工具封装、工具调用和执行循环。复杂且需要持久化、状态管理的工作流，还可以使用 LangGraph 来实现。</span></p>

<p id="f-doxcnQqHRjtRav5igdLyJKPDkDb"><span style="font-weight:bold">LlamaIndex 更偏数据与 RAG</span><span>。它重点解决私有数据如何进入大模型应用的问题，提供数据连接器、文档解析与切分、索引、Retriever、Query Engine 和 Agent 等组件。比如把 PDF、数据库和知识库接入系统，建立索引，再根据用户问题检索相关内容并交给大模型生成答案，LlamaIndex 能够快速搭建这条数据和检索链路。</span></p>

<p id="f-doxcnnY2aiwizPPyGhst2d418Fe"><span>可以简单概括为：</span><span style="font-weight:bold">LangChain 更擅长“模型和工具如何协作、任务流程如何执行”，LlamaIndex 更擅长“数据如何接入、组织和检索”</span><span>。</span></p>

<p id="f-doxcnSu9GcgzcwmhuMJiFlIzZJe"><span>它们的局限主要有以下几点。</span></p>

<p id="f-doxcniQzeOJHwaskSk4lP7Cmygc"><span>第一，</span><span style="font-weight:bold">抽象在提高开发效率的同时也会增加复杂度</span><span>。简单需求使用框架很方便，但复杂业务往往仍需理解底层模型、检索和工具调用机制；一旦需要深度定制，框架抽象可能发生“泄漏”，排查问题时还要继续追踪框架内部的调用链。</span></p>

<p id="f-doxcneUVpCgr7cWlAfM3yGu9uwW"><span>第二，</span><span style="font-weight:bold">版本和接口迭代较快</span><span>。示例代码可能随版本升级失效，组件之间也可能存在兼容性问题，会带来学习和维护成本。对框架封装依赖过深，还可能形成迁移成本。</span></p>

<p id="f-doxcn263B0cBehrsuLXJ0AhEyNd"><span>第三，</span><span style="font-weight:bold">框架不能自动保证效果</span><span>。使用 LlamaIndex 不代表 RAG 一定准确，仍然需要自己优化文档质量、Chunk、Embedding、混合检索和 Rerank；使用 LangChain 也不代表 Agent 一定稳定，仍要处理错误工具调用、循环、超时、重试和状态一致性等问题。</span></p>

<p id="f-doxcnzfP9AbZ7KG9eDAQLymfn8d"><span>第四，</span><span style="font-weight:bold">通用封装可能带来额外开销并降低可观测性</span><span>。对于性能敏感或流程固定的系统，直接调用模型 SDK、向量数据库和业务 API，代码有时会更轻、更容易控制。生产环境仍需自行补充评测、Tracing、权限隔离、安全防护、成本控制和容错机制。</span></p>

<p id="f-doxcnwwTOknp1hUJVkF13QkKk1e"><span>总结来说，LangChain 和 LlamaIndex 的价值是通过标准组件帮助团队快速搭建 LLM 应用：前者侧重</span><span style="font-weight:bold">应用和 Agent 编排</span><span>，后者侧重</span><span style="font-weight:bold">数据接入与 RAG</span><span>；它们适合快速开发和验证，但不能替代对底层原理、效果评测与生产工程的掌控。</span></p>

<p id="f-doxcnrb6vUPO7vJv1s5kuytpxde"><span>选自</span><span><span><a href="/posts/agent-learning-24-interview-review/#f-doxcnDD6cpf7lncDUVnfI5dt98d"><span>202607宇树科技 Agent开发一面</span></a></span></span></p>


<a id="section-0627"></a>
## LangChain 概述

<a id="t-block-15746"></a>

<div id="t-vPwaqkGoxCqk82pwDjCuSG"><div><div><div><div><a href="https://www.bilibili.com/video/BV11Rk9BYEHi/">嵌入视频 / 原始播放器</a></div></div></div></div></div>


<a id="section-0629"></a>
## 一句话解释

<a id="t-AyL5U6xzZBiZY0GNhbqHkq"></a>

<p id="t-rvnClvxlbgUNRChCKWEUm4"><span style="font-weight:bold">LangChain = 让大模型能"动手干活"的框架</span></p>

<p id="t-ac4A3GF8SuiTdB23Sp267g"><span>光靠 ChatGPT 只能聊天，但通过 LangChain，你可以让 AI：</span></p>

<blockquote id="t-dAEwUOj07YTCcFieaezfWC"><img alt="" decoding="async" height="20" loading="lazy" src="/images/agent-learning/734d70d30cd0f6c5dc73787c.svg" width="20"/><ul><li id="t-1sFmJjghudRimeybF2frFc"><span>查天气、搜网页</span></li></ul>
<ul><li id="t-CpPFO4oxGkY8iPVPs9FfW5"><span>读文件、写代码</span></li></ul>
<ul><li id="t-yhjpEbuTKRDgcLHZJaSO5u"><span>调用你公司的内部 API</span></li></ul>
<ul><li id="t-loOItaLNIKgII0N3B2qyGC"><span>自己决定该做什么</span></li></ul></blockquote>


<a id="section-0630"></a>
## 创建一个智能体

<a id="t-VUhlP2eTzeHjQVJRJiBvBZ"></a>

<pre id="t-PEtf8PdN9JxoP2TrKriLBi"><code># pip install -qU langchain "langchain[anthropic]"
from langchain.agents import create_agent

def get_weather(city: str) -&gt; str:
"""Get weather for a given city."""
return f"It's always sunny in {city}!"

agent = create_agent(
model="claude-sonnet-4-5-20250929",
tools=[get_weather],
system_prompt="You are a helpful assistant",
)

# Run the agent
agent.invoke(
{"messages": [{"role": "user", "content": "what is the weather in sf"}]}
)</code></pre>

<p id="t-1ClgosN0rdJOPwOUotzyvA"><span style="background-color:transparent">请参阅</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">安装说明</span><span style="background-color:transparent">和</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">快速入门指南</span><span style="background-color:transparent">，开始使用 LangChain 构建您自己的智能体和应用程序。</span></p>


<a id="section-0631"></a>
## 核心优势

<a id="t-4aKhMi4AMeKY2Obs3nWsIt"></a>

<div id="t-KCiCRpZrCFCDs99o9glOR5"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/18f9a62c091fc84c73bd249f.png"/></div>


<a id="section-0632"></a>
## LangChain的核心架构

<a id="t-block-15761"></a>

<div id="t-Ud3xtCD7Bw2060WIVtr75G"><div><div><div><div><a href="https://www.bilibili.com/video/BV1214y1X7Aq/">嵌入视频 / 原始播放器</a></div></div></div></div></div>


<a id="section-0633"></a>
## LangChain基本架构（6大核心模块）

<a id="t-1yNtlxgUs8phJ582v4Les6"></a>

<ol start="1"><li id="t-RV4q7MW2YUhu604IkljOJg"><span style="font-weight:bold">模型层</span><span>：对接LLM（GPT/Claude等）和Embedding模型</span></li></ol>

<ol start="2"><li id="t-jEPwzBjtK0lv4uTBEEnUNz"><span style="font-weight:bold">检索</span><span>：文档加载-&gt;文本分块-&gt;向量存储的完整Pipeline</span></li></ol>

<ol start="3"><li id="t-5bPqRcZNBMAACMw0DukSgq"><span style="font-weight:bold">记忆</span><span>：维护对话历史和实体记忆的存储机制</span></li></ol>

<ol start="4"><li id="t-7Z7CYAWCFcuael3K3B1BPp"><span style="font-weight:bold">链层</span><span>：可组合的工作流（Chain=LLM+Prompt+Tools）</span></li></ol>

<ol start="5"><li id="t-Ux206LIUpOXM1sT1CuB3nU"><span style="font-weight:bold">代理层</span><span>：自主决策执行工具调用的智能体</span></li></ol>

<ol start="6"><li id="t-lP9IL62xeVniU8gZLERMNv"><span style="font-weight:bold">回调</span><span>：全流程的监控和日志记录</span></li></ol>


<a id="section-0634"></a>
## 架构图

<a id="t-ZHbsLUQSGnSbTL2cTMe0Mn"></a>

<div id="t-tE5qeOM6V5bqwcMztjeM9O"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/3dcb8c0e056515e7a449f957.png"/></div>


<a id="section-0635"></a>
## 核心组件1：Model I/O

<a id="t-2s7L6pE693e2dfJVvQDUou"></a>

<p id="t-4Fk60PcVDKYyA5SdtU5fmx"><span>Model I/O：标准化各个大模型的输入和输出，包含输入模版，模型本身和格式化输出。</span></p>

<p id="t-UhHLWojMiXs1zl9RUfOOiq"><span>以下是使用语言模型从输入到输出的基本流程。</span></p>

<div id="t-ioogsU6It8g6PKbYWBQy91"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/1e7769b462adbb87875c92fa.png"/></div>

<p id="t-RqL5ukrHsLQYT0u5xnHSvl"><span>以下是对每一块的总结：</span></p>

<ul><li id="t-HbVFKL2UnLQBjgvFYn1jHW"><span>Format(格式化) ：即指代Prompts Template，通过模板管理大模型的输入。将原始数据格式化成 模型可以处理的形式，插入到一个模板问题中，然后送入模型进行处理。</span></li></ul>

<ul><li id="t-2xhXQt9C3qo9XD2GaXh8Zb"><span>Predict(预测) ：即指代Models，使用通用接口调用不同的大语言模型。接受被送进来的问题，然后基于这个问题进行预测或生成回答。</span></li></ul>

<ul><li id="t-rRH6idtM2u5wIjC1XB4Kpz"><span>Parse(生成) ：即指代Output Parser 部分，用来从模型的推理中提取信息，并按照预先设定好的模板来规范化输出。比如，格式化成一个结构化的JSON对象。</span></li></ul>


<a id="section-0636"></a>
## 核心组件2：Chains

<a id="t-K6K7bJXGlwpbpS2hggU2Rm"></a>

<p id="t-u9IuCf6fngfPtLR7dpGUYw"><span>Chain："链条"，用于将多个模块串联起来组成一个完整的流程，是 LangChain 框架中最重要的模块。 例如，一个 Chain 可能包括一个 Prompt 模板、一个语言模型和一个输出解析器，它们一起工作以处理 用户输入、生成响应并处理输出。</span></p>

<p id="t-4RWjTSuOGqL6mfaXX0m0AB"><span>常见的Chain类型：</span></p>

<ul><li id="t-oel6is63ocDcYQ0yskyIdd"><span>LLMChain ：最基础的模型调用链</span></li></ul>

<ul><li id="t-uVVnPuiRm9lnXTZcgl1SI2"><span>SequentialChain ：多个链串联执行</span></li></ul>

<ul><li id="t-vE5GEdN0SSwoavKVHYrfhh"><span>RouterChain ：自动分析用户的需求，引导到最适合的链</span></li></ul>

<ul><li id="t-6WhMTbNeiRymxSLtFUKwSU"><span>RetrievalQA ：结合向量数据库进行问答的链</span></li></ul>


<a id="section-0637"></a>
## 核心组件3：Memory

<a id="t-2xy2Mjj2YOvloqKcVbaMEG"></a>

<p id="t-eivP1sB6Ks5n1aS9yunkw8"><span>Memory：记忆模块，用于保存对话历史或上下文信息，以便在后续对话中使用。</span></p>

<p id="t-O0BmLdeACwS4Wq3ao6HOPU"><span>常见的 Memory 类型：</span></p>

<ul><li id="t-u8B0aVB3pPrwniQz1fENY9"><span>ConversationBufferMemory ：保存完整的对话历史</span></li></ul>

<ul><li id="t-lRKPm7Hq2Bbw4mxFz2bnVw"><span>ConversationSummaryMemory ：保存对话内容的精简摘要（适合长对话）</span></li></ul>

<ul><li id="t-z1sPlHAwgqCMy3Me6opNPi"><span>ConversationSummaryBufferMemory ：混合型记忆机制，兼具上面两个类型的特点</span></li></ul>

<ul><li id="t-ZR1YMqajk6ZaCJ2g0rRwrF"><span>VectorStoreRetrieverMemory ：保存对话历史存储在向量数据库中</span></li></ul>


<a id="section-0638"></a>
## 核心组件4：Agents

<a id="t-fClEagbTK9lonoT5zLGwXh"></a>

<p id="t-DYqvvaMdpnWuqA2JzLplrN"><span>Agents，对应着智能体，是 LangChain 的高阶能力，它可以自主选择工具并规划执行步骤。</span></p>

<p id="t-HaQOn7wfbeOtxtzIKoX4gm"><span>Agent 的关键组成：</span></p>

<ul><li id="t-AWMUC5Ya2OXSmjdtYZqM5p"><span>AgentType ：定义决策逻辑的工作流模式</span></li></ul>

<ul><li id="t-gXeCcnR9J7Xuxcwtpknn4P"><span>Tool ：是一些内置的功能模块，如API调用、搜索引擎、文本处理、数据查询等工具。Agents通过这些工具来执行特定的功能。</span></li></ul>

<ul><li id="t-0XJTN5Hz45hhLLyD5laHEd"><span>AgentExecutor ：用来运行智能体并执行其决策的工具，负责协调智能体的决策和实际的工具执行。</span></li></ul>


<a id="section-0639"></a>
## 核心组件5：Retrieve

<a id="t-yuBtOPmHangD76LdBnr649"></a>

<ul><li id="t-w4vSvlowl2YH65jvlJgAWc"><span>Retrieve：对应着RAG，检索外部数据，然后在执行生成步骤时将其传递到 LLM。步骤包括文档加载、 切割、Embedding等</span></li></ul>

<div id="t-cWQb4R8eGg3oOKWAiYIzlb"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/0f1fec49c788d9c5767e6fef.png"/></div>

<ul><li id="t-Dmr8lmYboBRlaM8bl8tnaA"><span>Source ：数据源，即大模型可以识别的多种类型的数据：视频、图片、文本、代码、文档等。</span></li></ul>

<ul><li id="t-F0ksCWAKOJXT9IXajITgIF"><span>Load ：负责将来自不同数据源的非结构化数据，加载为文档(Document)对象</span></li></ul>

<ul><li id="t-AKRzNcTzZHRIbGN0IYP61D"><span>Transform ：负责对加载的文档进行转换和处理，比如将文本拆分为具有语义意义的小块。</span></li></ul>

<ul><li id="t-IIfQxkKYq94Z1cJx2kUAXb"><span>Embed ：将文本编码为向量的能力。一种用于嵌入文档，另一种用于嵌入查询</span></li></ul>

<ul><li id="t-P14qrSomIEB8Syi5Q8Cc52"><span>Store ：将向量化后的数据进行存储</span></li></ul>

<ul><li id="t-SCrHCDN8AMfiAoenQVTkTu"><span>Retrieve ：从大规模文本库中检索和查询相关的文本段落</span></li></ul>


<a id="section-0640"></a>
## 核心组件6：Callbacks

<a id="t-XrKZmSaFFSnSQxGDNb89bm"></a>

<p id="t-S6Bt09SYZIWQimNe2PS7sv"><span>Callbacks：回调机制，允许连接到 LLM 应用程序的各个阶段，可以监控和分析LangChain的运行情 况，比如日志记录、监控、流传输等，以优化性能。</span></p>

<p id="t-WNlQrWyscWTMv10Md9C74z"><span>回调函数，对于程序员们应该都不陌⽣。这个函数允许我们在LLM的各个阶段使⽤各种各样的“钩⼦”，从而达实现⽇志的记录、监控以及流式传输等功能。</span></p>

<div id="t-UkNZAF32jV5yXaKgtbDjQ8"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/0ee9072525c1844d129a0462.png"/></div>


<a id="section-0643"></a>
## 安装 LangChain

<a id="t-block-15819"></a>

<p id="t-BQ3iXO7nIIj3qZ5rnSBOfc"><span style="background-color:transparent">要安装 LangChain 包，执行安装最新版：</span></p>

<pre id="t-5D6uyhBBIeIfvDWOFa7Ujx"><code>pip install -U langchain
# Requires Python 3.10+</code></pre>

<p id="t-lNak8i9aEG3NjTgYfUgsfy"><span style="background-color:transparent">LangChain 提供了与数百个 LLM 和数千个其他工具的集成。这些功能位于独立的提供商包中。</span></p>

<pre id="t-PWE8T5TSCCm1fKcUoRZ6uo"><code># 安装 OpenAI 集成
pip install -U langchain-openai

# 安装 Anthropic 集成
pip install -U langchain-anthropic</code></pre>

<p id="t-bfNI5VsXoscGFutc4v3NXf"><span style="background-color:transparent">现在你已经安装了 LangChain，可以按照 </span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">快速入门指南</span><span style="background-color:transparent"> 开始使用。</span></p>


<a id="section-0644"></a>
## 快速入门 (Quickstart)

<a id="t-block-15826"></a>

<blockquote id="t-gx5IQbzhBIHkX75MPBHPaT"><p id="t-I6l3Vl7eHFEwRnCjbZ7koM"><span style="background-color:transparent">本快速入门将引导您在几分钟内从简单的设置到构建一个功能完整的 AI 智能体（agent）。</span></p></blockquote>

<p id="t-o2OLKflwBc5oSF4H5S8NhS"><span style="font-weight:bold">LangChain 文档 MCP 服务器</span></p>

<p id="t-nO3Aek4hdI2Ww9VIreOPH4"><span>如果您正在使用 AI 编程助手或 IDE（例如 Claude Code 或 Cursor），您应该安装 </span><span style="border-bottom:1px solid;font-weight:bold">LangChain Docs MCP 服务器</span><span> 以充分利用它。这能确保您的智能体可以访问最新的 LangChain 文档和示例。</span></p>


<a id="section-0645"></a>
## 要求 (Requirements)

<a id="t-EF4OZbgHMfIrJW8GwwDLfD"></a>

<p id="t-EI0w3iuVDxtCj9z8qpnDuV"><span style="background-color:transparent">要运行这些示例，您需要：</span></p>

<ul><li id="t-g0nnDKCPDf9dX47sSf5ltR"><span style="border-bottom:1px solid;font-weight:bold">安装 (Install)</span><span> LangChain 包</span></li></ul>

<ul><li id="t-wgQSabzn5VCAJ7fZAEK0kQ"><span>设置 </span><span style="border-bottom:1px solid;font-weight:bold">Claude (Anthropic)</span><span> 账户并获取 API 密钥</span></li></ul>

<ul><li id="t-k5X09iGJfXQmCSGh8t4Ohj"><span>在您的终端中设置</span><span>ANTHROPIC_API_KEY</span><span>环境变量</span></li></ul>

<p id="t-Kxmxremg9Ua51gdjVtdpyK"><span style="background-color:transparent">虽然这些示例使用 Claude，但您也可以通过更改代码中的模型名称并设置相应的 API 密钥来使用</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">任何支持的模型</span><span style="background-color:transparent">。</span></p>


<a id="section-0646"></a>
## 构建基础智能体 (Build a basic agent)

<a id="t-Pydx3NSX54HjXGROsomEm4"></a>

<p id="t-fQLIUsdntKpN7G5ZoVd7bf"><span style="background-color:transparent">首先创建一个可以回答问题并调用工具的简单智能体。该智能体将使用 Claude Sonnet 4.5 作为其语言模型，一个基础的天气函数作为工具，以及一个简单的提示词来指导其行为。</span></p>

<pre id="t-URjWpR1dLJKoIvaakwmX7s"><code>from langchain.agents import create_agent

def get_weather(city: str) -&gt; str:
"""获取指定城市的天气。"""
return f"It's always sunny in {city}!"

agent = create_agent(
model="claude-sonnet-4-5-20250929",
tools=[get_weather],
system_prompt="You are a helpful assistant",
)

# 运行智能体
agent.invoke(
{"messages": [{"role": "user", "content": "what is the weather in sf"}]}
)</code></pre>

<p id="t-kGqKZJEQvamvso9UFWAdeJ"><span>要了解如何使用 LangSmith 追踪您的智能体，请参阅 </span><span style="border-bottom:1px solid;font-weight:bold">LangSmith 文档</span><span>。</span></p>


<a id="section-0647"></a>
## 构建真实世界的智能体 (Build a real-world agent)

<a id="t-zL290rMkjbWOU5HDxjAsHz"></a>

<p id="t-iM4ptMf29NkOzGp8LD8cn0"><span style="background-color:transparent">接下来，构建一个实用的天气预报智能体，演示关键的生产级概念：</span></p>

<ol start="1"><li id="t-BnoNxrHyjtrz8S9dT4dDtv"><span style="font-weight:bold">详细的系统提示词 (Detailed system prompts)</span><span>以获得更好的智能体行为</span></li></ol>

<ol start="2"><li id="t-q6TngcJkWATetQFFMl5IvM"><span style="font-weight:bold">创建工具 (Create tools)</span><span>以集成外部数据</span></li></ol>

<ol start="3"><li id="t-mmo7akO65Pm3PYWfl9BI0D"><span style="font-weight:bold">模型配置 (Model configuration)</span><span>以获得一致的响应</span></li></ol>

<ol start="4"><li id="t-WReum9YxeXjsT5trJvrDvb"><span style="font-weight:bold">结构化输出 (Structured output)</span><span>以获得可预测的结果</span></li></ol>

<ol start="5"><li id="t-NKbHEHjUxyYcc9iwGVPpB3"><span style="font-weight:bold">对话记忆 (Conversational memory)</span><span>以实现类似聊天的交互</span></li></ol>

<ol start="6"><li id="t-lcoIqbgejFzHt1n28uxYyl"><span style="font-weight:bold">创建并运行智能体 (Create and run the agent)</span><span>构建一个功能完整的智能体</span></li></ol>

<p id="t-ZL9p8aznNrjADUwV6zN4V0"><span style="background-color:transparent">让我们逐步完成每个步骤：</span></p>


<a id="section-0648"></a>
## 定义系统提示词 (Define the system prompt)

<a id="t-Y17x1SuK0hXGM7pfdO6Cbf"></a>

<p id="t-aG0w6HcdRyOIKU07Jpr87z"><span>系统提示词定义了智能体的角色和行为。请保持其具体且具可操作性：</span></p>

<p id="t-JPKo3c6YixN8v6FQ1f9sNp"><span style="font-weight:bold">wrap</span></p>

<pre id="t-LORNSQgPoMRM7NDtsS84kc"><code>SYSTEM_PROMPT = """You are an expert weather forecaster, who speaks in puns.

You have access to two tools:

- get_weather_for_location: use this to get the weather for a specific location
- get_user_location: use this to get the user's location

If a user asks you for the weather, make sure you know the location. If you can tell from the question that they mean wherever they are, use the get_user_location tool to find their location."""</code></pre>


<a id="section-0649"></a>
## 创建工具 (Create tools)

<a id="t-XxdHFN4gFlrZebwTEDMHwV"></a>

<p id="t-NquT7Z4B0Awi73stjFntA8"><span style="border-bottom:1px solid;font-weight:bold">工具 (Tools)</span><span> 允许模型通过调用您定义的函数与外部系统交互。 工具可以依赖</span><span style="border-bottom:1px solid;font-weight:bold">运行时上下文 (runtime context)</span><span>，也可以与</span><span style="border-bottom:1px solid;font-weight:bold">智能体记忆 (agent memory)</span><span>交互。</span></p>

<p id="t-td6Nz6FObr8DWnyfoxCZH1"><span>请注意下方</span><span>get_user_location</span><span>工具如何使用运行时上下文：</span></p>

<pre id="t-8Ts278ouRd6xqHZFCNpmN8"><code>from dataclasses import dataclass
from langchain.tools import tool, ToolRuntime

@tool
def get_weather_for_location(city: str) -&gt; str:
"""获取指定城市的天气。"""
return f"It's always sunny in {city}!"

@dataclass
class Context:
"""自定义运行时上下文模式。"""
user_id: str

@tool
def get_user_location(runtime: ToolRuntime[Context]) -&gt; str:
"""根据用户 ID 检索用户信息。"""
user_id = runtime.context.user_id
return "Florida" if user_id == "1" else "SF"</code></pre>

<p id="t-fJuehZRpXcDBiB4B3TgaSv"><span>工具应该有良好的文档记录：它们的名称、描述和参数名称会成为模型提示词的一部分。 LangChain 的 @[</span><span>@tool</span><span>装饰器][@tool] 添加了元数据，并通过</span><span>ToolRuntime</span><span>参数启用了运行时注入。</span></p>


<a id="section-0650"></a>
## 配置模型 (Configure your model)

<a id="t-xiTbMjguS8njXv0wnW3mqO"></a>

<p id="t-dS3Cxcp1seDizWeEVCMYcG"><span>根据您的用例，使用正确的参数设置您的</span><span style="border-bottom:1px solid;font-weight:bold">语言模型 (language model)</span><span>：</span></p>

<pre id="t-pw9wn5pUIJhrxvYudxVFul"><code>from langchain.chat_models import init_chat_model

model = init_chat_model(
"claude-sonnet-4-5-20250929",
temperature=0.5,
timeout=10,
max_tokens=1000
)</code></pre>

<p id="t-DwqEoQDU5U2R3pcQZoKfW0"><span>根据所选模型和提供商的不同，初始化参数可能会有所不同；请参阅其参考页面以获取详细信息。</span></p>


<a id="section-0651"></a>
## 定义响应格式 (Define response format)

<a id="t-xDyn2mE9MuzDZhpeUESOlv"></a>

<p id="t-7iTqjA27HZlVNYDxDvtvRk"><span>可选地，如果您需要智能体的响应符合特定的模式，可以定义结构化响应格式。</span></p>

<pre id="t-1rf3tPPweAu22b2yHlwDLo"><code>from dataclasses import dataclass

# 我们在这里使用 dataclass，但也支持 Pydantic 模型。
@dataclass
class ResponseFormat:
"""智能体的响应模式。"""
# 幽默的回答（必填）
punny_response: str
# 如果可用，提供有关天气的任何有趣信息
weather_conditions: str | None = None</code></pre>


<a id="section-0652"></a>
## 添加记忆 (Add memory)

<a id="t-1gNAIOnbS94g6J2JZ0M8Fv"></a>

<p id="t-LwxCSon0v6olM1SJ78P86w"><span>为您的智能体添加</span><span style="border-bottom:1px solid;font-weight:bold">记忆 (memory)</span><span>，以在多次交互之间保持状态。这允许智能体记住之前的对话和上下文。</span></p>

<pre id="t-o5R1bxaMepP6DDFpQ1P9dd"><code>from langgraph.checkpoint.memory import InMemorySaver

checkpointer = InMemorySaver()</code></pre>

<p id="t-3DiKLKKhfKxnqzjRwthFcG"><span>在生产环境中，请使用将数据保存到数据库的持久化检查点加载器。详见</span><span style="border-bottom:1px solid;font-weight:bold">添加和管理记忆</span><span>。</span></p>


<a id="section-0653"></a>
## 创建并运行智能体 (Create and run the agent)

<a id="t-LCqifH6keXS2ntq2YpLIyV"></a>

<p id="t-826Ktlt9ml6VQuaFcEXgk3"><span>现在，用所有的组件组装您的智能体并运行它！</span></p>

<pre id="t-FOsqmUPltWm3bIOd3vLFJs"><code>from langchain.agents.structured_output import ToolStrategy

agent = create_agent(
model=model,
system_prompt=SYSTEM_PROMPT,
tools=[get_user_location, get_weather_for_location],
context_schema=Context,
response_format=ToolStrategy(ResponseFormat),
checkpointer=checkpointer
)

# `thread_id` 是给定对话的唯一标识符。
config = {"configurable": {"thread_id": "1"}}

response = agent.invoke(
{"messages": [{"role": "user", "content": "what is the weather outside?"}]},
config=config,
context=Context(user_id="1")
)

print(response['structured_response'])
# ResponseFormat(
#     punny_response="Florida is still having a 'sun-derful' day! ...",
#     weather_conditions="It's always sunny in Florida!"
# )

# 请注意，我们可以使用相同的 `thread_id` 继续对话。
response = agent.invoke(
{"messages": [{"role": "user", "content": "thank you!"}]},
config=config,
context=Context(user_id="1")
)

print(response['structured_response'])
# ResponseFormat(
#     punny_response="You're 'thund-erfully' welcome! ...",
#     weather_conditions=None
# )</code></pre>

<p id="t-oez6HARs2jM2aYDBGq3ldv"><span>要了解如何使用 LangSmith 追踪您的智能体，请参阅 </span><span style="border-bottom:1px solid;font-weight:bold">LangSmith 文档</span><span>。</span></p>

<p id="t-bdJWc71f84utUjXsfngJZu"><span style="background-color:transparent">恭喜！您现在拥有了一个 AI 智能体，它可以：</span></p>

<ul><li id="t-ZUFK1zNY1y4LBb8i4pM0s9"><span style="font-weight:bold">理解上下文</span><span>并记住对话</span></li></ul>

<ul><li id="t-77QYE2g4qfM9oXc0psaj3i"><span style="font-weight:bold">智能使用多种工具</span></li></ul>

<ul><li id="t-eYfNnxxL3c4BkP6zkif9Qm"><span style="font-weight:bold">以一致的格式提供结构化响应</span></li></ul>

<ul><li id="t-NPIrSPylsJNoFtnyLnqxq7"><span style="font-weight:bold">通过上下文处理特定用户的信息</span></li></ul>

<ul><li id="t-Hqp0TAEsSIg6tfYCB0R1pM"><span style="font-weight:bold">在交互过程中维护对话状态</span></li></ul>


<a id="section-0654"></a>
## 设计理念

<a id="t-block-15879"></a>

<p id="t-HUKxVI4Wz2s1drrnYIMaG4"><span style="background-color:transparent">LangChain 由几个核心理念驱动：</span></p>

<ul><li id="t-obfYo3IC7I07nkJjpExbDk"><span>大语言模型（LLMs）是一项伟大而强大的新技术。</span></li></ul>

<ul><li id="t-XCrBuFKbSGfnbgjxE93oim"><span>当您将 LLMs 与外部数据源结合使用时，它们会变得更加强大。</span></li></ul>

<ul><li id="t-Lr4CpkgKYOr7oE0jGX8mni"><span>LLMs 将改变未来应用程序的面貌。具体来说，未来的应用程序将越来越具有智能体（agentic）特性。</span></li></ul>

<ul><li id="t-w4hXpZObpuTLovH0dhsPbK"><span>这场变革仍处于非常早期的阶段。</span></li></ul>

<ul><li id="t-cCefdkXoBDsChlgkWdIXvl"><span>虽然构建这些智能体应用程序的原型很容易，但要构建足够可靠以投入生产的智能体仍然非常困难。</span></li></ul>

<p id="t-T2u6OgapOqEhGIXN4iWiq1"><span style="background-color:transparent">通过 LangChain，我们有两个核心关注点：</span></p>

<ol start="1"><li id="t-Ciap36UQl94n0rddpGo6wI"><span style="font-weight:bold">我们希望使开发者能够使用最好的模型进行构建。</span></li></ol>

<ul><li id="t-Rg3oN8zj9H92ljmadnKPUL"><span>不同的提供商提供不同的 API，具有不同的模型参数和不同的消息格式。 标准化这些模型的输入和输出是一个核心关注点，使开发者能够轻松切换到最新的最先进模型，避免被锁定。</span></li></ul>

<ol start="2"><li id="t-yeiDsYQlamM7O7VgKDOvS6"><span style="font-weight:bold">我们希望让使用模型来编排更复杂的、与其他数据和计算交互的流程变得容易。</span></li></ol>

<ul><li id="t-YnkJF42kX8XMpr9yuxS5MA"><span>模型不应仅用于</span><span style="font-style:italic">文本生成</span><span>——它们还应被用于编排与其他数据交互的更复杂流程。LangChain 使得定义 LLMs 可以动态使用的</span><span style="border-bottom:1px solid;font-weight:bold">工具</span><span>变得容易，同时也帮助解析和访问非结构化数据。</span></li></ul>


<a id="section-0655"></a>
## 历史

<a id="t-ZNkJuKGASAOjhTbazNr1Ay"></a>

<p id="t-kJ8mIl3R00SQtK9xkq0rPO"><span style="background-color:transparent">鉴于该领域不断变化的速率，LangChain 也随着时间的推移而演变。以下是 LangChain 多年来如何变化的简要时间线，它随着 LLM 构建的含义一同演进：</span></p>

<p id="t-p3DVu80Hp2OHEj9dwl70qh"><span style="font-weight:bold;background-color:#ace2c5">2022-10-24 (</span><span style="background-color:#ace2c5">v0.0.1)</span></p>

<div style="margin-left:25px"><p id="t-AUpRpOXhq3foiz0bcbG5Md"><span style="background-color:transparent">在 ChatGPT 发布前一个月，</span><span style="font-weight:bold;background-color:transparent">LangChain 作为一个 Python 包推出</span><span style="background-color:transparent">。它主要由两个组件构成</span></p><p id="t-r9FLvwUOYSSfEmbZeXUuCY"><span style="background-color:#f3f5f7">- LLM 抽象层
- "链"（Chains），或为常见用例运行的预定计算步骤。例如 - RAG：运行一个检索步骤，然后运行一个生成步骤。</span></p><p id="t-PnlXcsbARnW7XPB3C2ggrw"><span>LangChain 这个名字来源于 "Language"（如语言模型）和 "Chains"。</span></p></div>

<p id="t-rFRzvnN7GEMPhBn2nrTSzS"><span style="font-weight:bold;background-color:#ace2c5">2022-12</span></p>

<div style="margin-left:25px"><p id="t-KPa7JkJZaLBOoApbNrak3X"><span>第一个通用智能体被添加到 LangChain 中。</span></p><p id="t-ovxcEnJOyxYk9o0Gumt4tq"><span>这些通用智能体基于 </span><span style="border-bottom:1px solid;font-weight:bold">ReAct 论文</span><span>（ReAct 代表推理与行动）。它们使用 LLMs 生成表示工具调用的 JSON，然后解析该 JSON 以确定调用哪些工具。</span></p></div>

<p id="t-a73TiEBOv1zKYqjOXYvCyG"><span style="font-weight:bold;background-color:#ace2c5">2023-01</span></p>

<div style="margin-left:25px"><p id="t-oYJ0kuPC3IFrb9k7u30vvd"><span>OpenAI 发布了 'Chat Completion' API。</span></p><p id="t-p97tA770dKGu7077r7rxmc"><span>此前，模型接收字符串并返回一个字符串。在 ChatCompletions API 中，它们演变为接收消息列表并返回一条消息。其他模型提供商纷纷效仿，LangChain 也更新为支持消息列表。</span></p></div>

<p id="t-YNXzC7BHgi3XdiqXixhU6U"><span style="font-weight:bold;background-color:#ace2c5">2023-01</span></p>

<div style="margin-left:25px"><p id="t-RTm1H1BozcrI7xPiDuWajh"><span>LangChain 发布了 JavaScript 版本。</span></p><p id="t-UYCOUpLMPaWs0cE1jjHbzs"><span>LLMs 和智能体将改变应用程序的构建方式，而 JavaScript 是应用程序开发者的语言。</span></p></div>

<p id="t-jU9l1GnnP9iW7R9rWqvc9P"><span style="font-weight:bold;background-color:#ace2c5">2023-02</span></p>

<div style="margin-left:25px"><p id="t-zmLGjt1phPawwQej4BXTHL"><span style="font-weight:bold">LangChain Inc. 作为一家公司成立</span><span>，围绕开源 LangChain 项目。</span></p><p id="t-nVDijKDGH8gBMAgegR0IQC"><span>主要目标是"让智能体无处不在"。团队认识到，虽然 LangChain 是一个关键部分（LangChain 使得开始使用 LLMs 变得简单），但也需要其他组件。</span></p></div>

<p id="t-lOE6xTeL0nprDFJl6JIPmQ"><span style="font-weight:bold;background-color:#ace2c5">2023-03</span></p>

<div style="margin-left:25px"><p id="t-MNUdWC4QCpGxn384tOKav2"><span>OpenAI 在其 API 中发布了 'function calling'。</span></p><p id="t-uQqNepFjQg7PA1j7wrmEP9"><span>这使得 API 能够显式生成表示工具调用的负载。其他模型提供商纷纷效仿，LangChain 也更新为使用此方法作为工具调用的首选方式（而不是解析 JSON）。</span></p></div>

<p id="t-MsV97fBGXOackWwRts28dm"><span style="font-weight:bold;background-color:#ace2c5">2023-06</span></p>

<div style="margin-left:25px"><p id="t-oNOEZtAC2NGO2gBppcu5Wg"><span style="font-weight:bold">LangSmith 作为闭源平台由 LangChain Inc. 发布</span><span>，提供可观测性和评估功能。</span></p><p id="t-VDgD41V5mBu0pZGq69QGL1"><span>构建智能体的主要问题是使其可靠，而提供可观测性和评估功能的 LangSmith 正是为解决这一需求而构建的。LangChain 更新以与 LangSmith 无缝集成。</span></p></div>

<p id="t-K6fAfXe6wXwfdYGFrR4UbB"><span style="font-weight:bold;background-color:#ace2c5">2024-01(</span><span style="background-color:#ace2c5">v0.1.0)</span></p>

<div style="margin-left:25px"><p id="t-9io2YuRF0wIGuG5HO6uemp"><span style="font-weight:bold">LangChain 发布了 0.1.0</span><span>，这是其第一个非 0.0.x 版本。</span></p><p id="t-rO3esFFyZF3vLWk9YQUc3l"><span>行业从原型阶段发展到生产阶段，因此，LangChain 加强了对稳定性的关注。</span></p></div>

<p id="t-bAszk4gMMGbJ0K0xpwQ3x8"><span style="font-weight:bold;background-color:#ace2c5">2024-02</span></p>

<div style="margin-left:25px"><p id="t-bOgWKZvdrcYT4md13wwNPX"><span style="font-weight:bold">LangGraph 作为开源库发布</span><span>。</span></p><p id="t-KwU3DITsyygUjlCmtDS1y2"><span>最初的 LangChain 有两个重点：LLM 抽象层，以及用于开始常见应用程序的高级接口；然而，它缺少一个允许开发者精确控制其智能体流程的低级编排层。于是：LangGraph 应运而生。</span></p><p id="t-2E3FQkthAsMvISahZqvdRB"><span>在构建 LangGraph 时，我们吸取了构建 LangChain 时的经验教训，并添加了我们发现必需的功能：流式处理、持久执行、短期记忆、人在回路等等。</span></p></div>

<p id="t-Y99z8gfZupBxkEdo4vTWfk"><span style="font-weight:bold;background-color:#ace2c5">2024-06</span></p>

<div style="margin-left:25px"><p id="t-NvVHMGltdB5NILfzkEpv2E"><span style="font-weight:bold">LangChain 拥有超过 700 个集成。</span></p><p id="t-hcZwZc4uANdK5kPJr1xCUX"><span>集成从核心 LangChain 包中分离出来，要么移入它们自己的独立包（针对核心集成），要么移入 </span><span>langchain-community</span><span>。</span></p></div>

<p id="t-r9dTjTiTmvmxSAEH2Z6M5Y"><span style="font-weight:bold;background-color:#ace2c5">2024-10</span></p>

<div style="margin-left:25px"><p id="t-KsBTCtz7XoKDKyYz3Q0hWP"><span>LangGraph 成为构建任何超越单一 LLM 调用的 AI 应用程序的首选方式。</span></p><p id="t-FRoB9i3YuKXoBKdG7lBknx"><span>当开发者试图提高其应用程序的可靠性时，他们需要比高级接口提供的更多的控制权。LangGraph 提供了这种低级的灵活性。LangChain 中的大多数链和智能体被标记为已弃用，并附有如何将它们迁移到 LangGraph 的指南。LangGraph 中仍然创建了一个高级抽象：一个智能体抽象。它构建在低级 LangGraph 之上，并且具有与 LangChain 中 ReAct 智能体相同的接口。</span></p></div>

<p id="t-qGlKZ7SGzIo6cEgbIS857H"><span style="font-weight:bold;background-color:#ace2c5">2025-04</span></p>

<div style="margin-left:25px"><p id="t-mPUSYQSuHFZ2rkQmhPJGKq"><span>模型 API 变得更加多模态。</span></p><p id="t-RqGzatQXqqH0CuJuenaAvt"><span>模型开始接受文件、图像、视频等。我们相应地更新了 </span><span>langchain-core</span><span> 消息格式，以允许开发者以标准方式指定这些多模态输入。</span></p></div>

<p id="t-SA7bI43tAexnbtALlEa3w5"><span style="font-weight:bold;background-color:#ace2c5">2025-10-20(</span><span style="background-color:#ace2c5">v1.0.0)</span></p>

<div style="margin-left:25px"><p id="t-sntqfDbWwT1vdgVwpktovb"><span style="font-weight:bold">LangChain 发布了 1.0 版本</span><span>，包含两个主要变化：</span></p><ol start="1"><li id="t-vuj9D6CM9fczqESliSb6it"><span>彻底重构了</span><span>langchain</span><span>中的所有链和智能体。所有链和智能体现在都被替换为仅一个高级抽象：一个构建在 LangGraph 之上的智能体抽象。这是最初在 LangGraph 中创建的高级抽象，但现在移到了 LangChain。</span></li></ol><p id="t-FhxjD2vu20U34xyIiLFqWp"><span>对于仍在使用旧版 LangChain 链/智能体且</span><span style="font-weight:bold">不</span><span>想升级的用户（注意：我们建议您升级），您可以通过安装</span><span>langchain-classic</span><span>包来继续使用旧版 LangChain。</span></p><ol start="2"><li id="t-DZRM8Gu1Z7F9MEDvL7wdpF"><span>标准消息内容格式：模型 API 从返回带有简单内容字符串的消息演变为更复杂的输出类型——推理块、引用、服务器端工具调用等。LangChain 演进其消息格式以标准化这些跨提供商的内容。</span></li></ol></div>


<a id="section-0658"></a>
## 智能体 (Agents)

<a id="t-block-15935"></a>

<p id="t-4ndcs7wTyj3qiOheKDpY9U"><span style="background-color:transparent">智能体（Agents）将语言模型与</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">工具</span><span style="background-color:transparent">相结合，构建出能够推理任务、决定使用哪些工具，并迭代式地寻找解决方案的系统。</span></p>

<p id="t-BJM2CDRwnBSe4D6roCkBeV"><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">create_agent</span><span style="background-color:transparent"> 提供了一个可用于生产环境的智能体实现。</span></p>

<p id="t-y5TItIWbievEDQ9jHBSPSV"><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">LLM 智能体通过循环运行工具来实现目标</span><span style="background-color:transparent">。 智能体会持续运行，直到满足停止条件——即模型产生最终输出或达到迭代限制。</span></p>

<div id="t-qRsex2CZHWq3qECFwYxJ1e"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/39ea23b550bb23fdd040e017.png"/></div>

<blockquote id="t-2qPbauH6lyCCnxj8c77fzo"><p id="t-HYVHWWA75WB1L9uZ5Qoocq"><span style="border-bottom:1px solid;font-weight:bold">create_agent</span><span> 使用 </span><span style="border-bottom:1px solid;font-weight:bold">LangGraph</span><span> 构建一个基于</span><span style="font-weight:bold">图</span><span>的智能体运行时。图由节点（步骤）和边（连接）组成，定义了智能体处理信息的方式。智能体在这个图中移动，执行诸如模型节点（调用模型）、工具节点（执行工具）或中间件等节点。</span></p></blockquote>


<a id="section-0659"></a>
## 核心组件

<a id="t-5hfAoVM7ERjwR5FtRsS9Q1"></a>

<div id="t-beEq6fvbAviunitQuG6OoF"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/8d80d8a79ccbcd58a4883a72.png"/></div>


<a id="section-0660"></a>
## 模型

<a id="t-vig8LBlkRPSQ1cyP2R6rMJ"></a>

<p id="t-NkfCE3robXmvznrDOSkvuV"><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">模型</span><span style="background-color:transparent"> 是智能体的推理引擎。可以通过多种方式指定，支持静态和动态模型选择。</span></p>

<pre id="t-xjkEUyNRIEzakXmaAoBigv"><code>from langchain.agents import create_agent

agent = create_agent(model="openai:gpt-5.5", tools=tools)</code></pre>

<a id="t-W3EkabJOnFbrY81QWdFRJ8"></a>

##### 静态模型

<p id="t-eEpOkH1ZFxnIHWrwX9Bqnz"><span style="background-color:transparent">静态模型在创建智能体时配置一次，并在整个执行过程中保持不变。这是最常见且最直接的方法。</span></p>

<p id="t-piHS0WzfwvMoO8y5QQR5Sx"><span style="background-color:transparent">要从</span><span style="border-bottom:1px solid;background-color:transparent">模型标识符字符串</span><span style="background-color:transparent">初始化静态模型：</span></p>

<p id="t-1qE9EPgQ1mHqllZNSoD9UI"><span style="font-weight:bold">wrap</span></p>

<pre id="t-gbWsAbmWfUgtA8gUOrVhT5"><code>from langchain.agents import create_agent

agent = create_agent("openai:gpt-5", tools=tools)</code></pre>

<p id="t-eg0xP9cNg1beeej7jqnIOm"><span>模型标识符字符串支持自动推断（例如，</span><span>"gpt-5"</span><span> 将被推断为 </span><span>"openai:gpt-5"</span><span>）。</span></p>

<p id="t-1dC7YdEHsUXBxpY5ZsJ7jQ"><span style="background-color:transparent">为了更精细地控制模型配置，可以直接使用提供者包初始化模型实例。在此示例中，我们使用 </span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">ChatOpenAI</span><span style="background-color:transparent">。</span></p>

<p id="t-YKKSeUZI9ouHLB4eKxI8Ki"><span style="font-weight:bold">wrap</span></p>

<pre id="t-6hU98RGaY7JkXqbVdeCkBA"><code>from langchain.agents import create_agent
from langchain_openai import ChatOpenAI

model = ChatOpenAI(
model="gpt-5",
temperature=0.1,
max_tokens=1000,
timeout=30
# ... (其他参数)
)
agent = create_agent(model, tools=tools)</code></pre>

<p id="t-xndxIDWM14sLGFKgW5vCLr"><span style="background-color:transparent">模型实例让您可以完全控制配置。当您需要设置特定的</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">参数</span><span style="background-color:transparent">（如 </span><span style="background-color:transparent">temperature</span><span style="background-color:transparent">、</span><span style="background-color:transparent">max_tokens</span><span style="background-color:transparent">、</span><span style="background-color:transparent">timeouts</span><span style="background-color:transparent">、</span><span style="background-color:transparent">base_url</span><span style="background-color:transparent"> 以及其他提供者特定的设置）时，请使用它们。</span></p>

<a id="t-xg9KkuR9lx7dN1WJF0mbfu"></a>

##### 动态模型

<p id="t-aFhBWRl2JAfW3ZeJ1X3nAi"><span style="background-color:transparent">动态模型在</span><span style="border-bottom:1px solid;background-color:transparent">运行时</span><span style="background-color:transparent">根据当前的</span><span style="border-bottom:1px solid;background-color:transparent">状态</span><span style="background-color:transparent">和上下文进行选择。这实现了复杂的路由逻辑和成本优化。</span></p>

<p id="t-akOIHcPjTeN7HfnW1ea5TX"><span style="background-color:transparent">要使用动态模型，请使用 </span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">@wrap_model_call</span><span style="background-color:transparent"> 装饰器创建中间件，以修改请求中的模型：</span></p>

<pre id="t-ybKgyV1HV0Lohg4ldEweMx"><code>from langchain_openai import ChatOpenAI
from langchain.agents import create_agent
from langchain.agents.middleware import wrap_model_call, ModelRequest, ModelResponse

basic_model = ChatOpenAI(model="gpt-4o-mini")
advanced_model = ChatOpenAI(model="gpt-4o")

@wrap_model_call
def dynamic_model_selection(request: ModelRequest, handler) -&gt; ModelResponse:
"""根据对话复杂性选择模型。"""
message_count = len(request.state["messages"])

if message_count &gt; 10:
# 对于较长的对话使用高级模型
model = advanced_model
else:
model = basic_model

return handler(request.override(model=model))

agent = create_agent(
model=basic_model, # 默认模型
tools=tools,
middleware=[dynamic_model_selection]
)</code></pre>

<p id="t-buiU31iLD3P5dgXPWyQ3Q7"><span>在使用结构化输出时，不支持预绑定模型（已调用</span><span style="border-bottom:1px solid;font-weight:bold">bind_tools</span><span>的模型）。如果您需要带有结构化输出的动态模型选择，请确保传递给中间件的模型不是预绑定的。</span></p>


<a id="section-0661"></a>
## 工具

<a id="t-XxB9OPL4aj2LS9YiMlSz1N"></a>

<p id="t-wYPrQWHNdb9BdXXgLsQ6Yf"><span style="background-color:transparent">工具赋予智能体执行操作的能力。智能体超越了简单的仅模型工具绑定，能够实现：</span></p>

<ul><li id="t-J9tG5u9P2guYyS8LD6ceSk"><span>按顺序进行多次工具调用（由单个提示触发）</span></li></ul>

<ul><li id="t-it9pwp3MhGI0EBuRGeFLnk"><span>在适当时进行并行工具调用</span></li></ul>

<ul><li id="t-qZfMBqC4B3JWOEyhdaT5dD"><span>基于先前结果的动态工具选择</span></li></ul>

<ul><li id="t-R16oJYIzbr1O62EzpeEmOR"><span>工具重试逻辑和错误处理</span></li></ul>

<ul><li id="t-Y5HTcPp8IWOUvaUeQeYmaz"><span>跨工具调用的状态持久性</span></li></ul>

<a id="t-v3vwQj0WyA3lZdU3x4XJXE"></a>

##### 定义工具

<p id="t-IOtZje4itUWmdaZlivMJ8v"><span style="background-color:transparent">向智能体传递一个工具列表。</span></p>

<p id="t-qire3SjhOEX77fHxHRVk7S"><span>工具可以指定为普通的 Python 函数或</span><span style="border-bottom:1px solid">协程</span><span>。</span></p>

<p id="t-4W2hyn4MdxhLUUxvpJxrDS"><span>可以使用 </span><span style="border-bottom:1px solid;font-weight:bold">工具装饰器</span><span> 来自定义工具名称、描述、参数模式和其他属性。</span></p>

<p id="t-za7b20cql10cvlOlOvnz9I"><span style="font-weight:bold">wrap</span></p>

<pre id="t-0Hqdave539KAX2hmE1wvvL"><code>from langchain.tools import tool
from langchain.agents import create_agent

@tool
def search(query: str) -&gt; str:
"""搜索信息。"""
return f"Results for: {query}"

@tool
def get_weather(location: str) -&gt; str:
"""获取某个位置的天气信息。"""
return f"Weather in {location}: Sunny, 72°F"

agent = create_agent(model, tools=[search, get_weather])</code></pre>

<p id="t-AbiheBP29co0jb14e17pnc"><span style="background-color:transparent">如果提供空的工具列表，智能体将只包含一个 LLM 节点，不具备工具调用能力。</span></p>

<a id="t-sc7q8Ezighz2nZmcOZUo8c"></a>

##### 工具错误处理

<p id="t-JYv1CPFhKCQPGEGtTlo7N6"><span style="background-color:transparent">要自定义工具错误的处理方式，请使用 </span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">@wrap_tool_call</span><span style="background-color:transparent"> 装饰器创建中间件：</span></p>

<p id="t-HPSVpbY2G7aLi1dgqKHJ3C"><span style="font-weight:bold">wrap</span></p>

<pre id="t-tKJQihceyaJLyLAA7VocBG"><code>from langchain.agents import create_agent
from langchain.agents.middleware import wrap_tool_call
from langchain.messages import ToolMessage

@wrap_tool_call
def handle_tool_errors(request, handler):
"""使用自定义消息处理工具执行错误。"""
try:
return handler(request)
except Exception as e:
# 向模型返回自定义错误消息
return ToolMessage(
content=f"Tool error: Please check your input and try again. ({str(e)})",
tool_call_id=request.tool_call["id"]
)

agent = create_agent(
model="gpt-4o",
tools=[search, get_weather],
middleware=[handle_tool_errors]
)</code></pre>

<p id="t-COxB3j5V0Pwgq4L8FWtaXe"><span style="background-color:transparent">当工具失败时，智能体将返回一个带有自定义错误消息的 </span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">ToolMessage</span><span style="background-color:transparent">：</span></p>

<pre id="t-3aUohCSTmJ0uM6eKSdRVXj"><code>[
...
ToolMessage(
content="Tool error: Please check your input and try again. (division by zero)",
tool_call_id="..."
),
...
]</code></pre>

<a id="t-oHIVQ9K0Rd6IRNQrQNlXJb"></a>

##### ReAct 循环中的工具使用

<p id="t-9PW2v54eI6AHoJTEVcDL54"><span style="background-color:transparent">智能体遵循 ReAct（"推理 + 行动"）模式，在简短推理步骤与针对性工具调用之间交替进行，并将结果观察反馈到后续决策中，直到能够给出最终答案。</span></p>

<p id="t-CkATiR33g7lFAgBHmaGoXn"><span style="font-weight:bold">提示：</span><span>识别当前最受欢迎的无线耳机并验证其可用性。</span></p>

<pre id="t-EmMkf1azK3ch8qlWfrPhOV"><code>================================ Human Message =================================

Find the most popular wireless headphones right now and check if they're in stock</code></pre>

<ul><li id="t-DQDihLsTX5WEM2BG8CRoOx"><span style="font-weight:bold">推理</span><span>："流行度是随时间变化的，我需要使用提供的搜索工具。"</span></li></ul>

<ul><li id="t-ryTIepGscVdlbCm8Dev41J"><span style="font-weight:bold">行动</span><span>：调用</span><span>search_products("wireless headphones")</span></li></ul>

<pre id="t-VTeE4RrMUIgsMdEm20CUh3"><code>================================== Ai Message ==================================
Tool Calls:
search_products (call_abc123)
Call ID: call_abc123
Args:
query: wireless headphones</code></pre>

<pre id="t-qNAD6Bov8UeqQZlrE63UnW"><code>================================= Tool Message =================================

Found 5 products matching "wireless headphones". Top 5 results: WH-1000XM5, ...</code></pre>

<ul><li id="t-kA3FG06uxgdNCKXxqIxrKV"><span style="font-weight:bold">推理</span><span>："在回答之前，我需要确认排名第一的商品的可用性。"</span></li></ul>

<ul><li id="t-vEyhs6SR2GVvVoUBrhITr0"><span style="font-weight:bold">行动</span><span>：调用</span><span>check_inventory("WH-1000XM5")</span></li></ul>

<pre id="t-y2FlF5KxfQNLZVYaLHmWnG"><code>================================== Ai Message ==================================
Tool Calls:
check_inventory (call_def456)
Call ID: call_def456
Args:
product_id: WH-1000XM5</code></pre>

<pre id="t-btGyELSTLEqUPZBbTVIye2"><code>================================= Tool Message =================================

Product WH-1000XM5: 10 units in stock</code></pre>

<ul><li id="t-8aU3deP6McR1na7xIVhURf"><span style="font-weight:bold">推理</span><span>："我已经有了最受欢迎的型号及其库存状态。现在可以回答用户的问题了。"</span></li></ul>

<ul><li id="t-EfPnyzOS0bKTU617KiXRiK"><span style="font-weight:bold">行动</span><span>：生成最终答案</span></li></ul>

<pre id="t-U9Y4LvkDUnuuh6hQw9Gkam"><code>================================== Ai Message ==================================

I found wireless headphones (model WH-1000XM5) with 10 units in stock...</code></pre>


<a id="section-0662"></a>
## 系统提示

<a id="t-STFAQVxt6K2yQcTKdLTvSV"></a>

<p id="t-yrEPuURXd8zeFKIx7ZTCFs"><span style="background-color:transparent">您可以通过提供提示来塑造智能体处理任务的方式。</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">system_prompt</span><span style="background-color:transparent">参数可以作为字符串提供：</span></p>

<p id="t-iL11CJm6ueo2n0ecJaPKtk"><span style="font-weight:bold">wrap</span></p>

<pre id="t-WGO0G08bXPDRNQfIq62k9Q"><code>agent = create_agent(
model,
tools,
system_prompt="You are a helpful assistant. Be concise and accurate."
)</code></pre>

<p id="t-7tHmc3uNtJkqXlbxCdrtED"><span style="background-color:transparent">当未提供</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">system_prompt</span><span style="background-color:transparent">时，智能体将直接从消息推断其任务。</span></p>

<p id="t-b5iu8HAg0WKrvMfKIg1nvD"><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">system_prompt</span><span style="background-color:transparent"> 参数接受 </span><span style="background-color:transparent">str</span><span style="background-color:transparent"> 或 </span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">SystemMessage</span><span style="background-color:transparent">。使用 </span><span style="background-color:transparent">SystemMessage</span><span style="background-color:transparent"> 可以让您更好地控制提示结构，这对于特定提供者的功能（如 </span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">Anthropic 的提示缓存</span><span style="background-color:transparent">）非常有用：</span></p>

<p id="t-GWmDOJkPQJzisYe1qUtLD2"><span style="font-weight:bold">wrap</span></p>

<pre id="t-vciLfxeLNn0USfv73muKYh"><code>from langchain.agents import create_agent
from langchain.messages import SystemMessage, HumanMessage

literary_agent = create_agent(
model="anthropic:claude-sonnet-4-5",
system_prompt=SystemMessage(
content=[
{
"type": "text",
"text": "You are an AI assistant tasked with analyzing literary works.",
},
{
"type": "text",
"text": "&lt;the entire contents of 'Pride and Prejudice'&gt;",
"cache_control": {"type": "ephemeral"}
}
]
)
)

result = literary_agent.invoke(
{"messages": [HumanMessage("Analyze the major themes in 'Pride and Prejudice'.")]}
)</code></pre>

<p id="t-i64Pkb0hTFZk7IzqFvD1PF"><span style="background-color:transparent">带有</span><span style="background-color:transparent">{"type": "ephemeral"}</span><span style="background-color:transparent">的</span><span style="background-color:transparent">cache_control</span><span style="background-color:transparent">字段告诉 Anthropic 缓存该内容块，从而减少使用相同系统提示的重复请求的延迟和成本。</span></p>

<a id="t-sXWCP8ZBjQO5wG7xSTB7N4"></a>

##### 动态系统提示

<p id="t-9Kwwky4I2dAnKLFnMBjNAD"><span style="background-color:transparent">对于需要根据运行时上下文或智能体状态修改系统提示的更高级用例，您可以使用 </span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">中间件</span><span style="background-color:transparent">。</span></p>


<a id="section-0663"></a>
## 模型 (Models)

<a id="t-block-16010"></a>

<p id="t-plSJu2Eqpo2heVCPG1hguL"><span style="border-bottom:1px solid;font-weight:bold">大语言模型（LLMs）</span><span>是强大的人工智能工具，能够像人类一样理解和生成文本。它们功能多样，足以编写内容、翻译语言、总结信息以及回答问题，而无需为每项任务进行专门训练。</span></p>

<p id="t-QFyHzYueWg1xyxqZeJJ3MJ"><span>除了文本生成，许多模型还支持：</span></p>

<ul><li id="t-uPTiWVXX4gxS2DUFGgJbJL"><span style="border-bottom:1px solid;font-weight:bold">工具调用</span><span> - 调用外部工具（如数据库查询或 API 调用）并在其响应中使用结果。</span></li></ul>

<ul><li id="t-oAM3HPAcmXtuDZGb8WsLCb"><span style="border-bottom:1px solid;font-weight:bold">结构化输出</span><span> - 模型的响应被约束为遵循定义的格式。</span></li></ul>

<ul><li id="t-A9RJh50eCOoiiRdbvESvEx"><span style="border-bottom:1px solid;font-weight:bold">多模态</span><span> - 处理和返回文本以外的数据，如图像、音频和视频。</span></li></ul>

<ul><li id="t-qo0EABJkOj4mQhczed2Lns"><span style="border-bottom:1px solid;font-weight:bold">推理</span><span> - 模型执行多步推理以得出结论。</span></li></ul>

<p id="t-UwDvGZdcaATnEkcbMLhrYe"><span>模型是</span><span style="border-bottom:1px solid;font-weight:bold">智能体</span><span>的推理引擎。它们驱动智能体的决策过程，决定调用哪些工具、如何解释结果以及何时提供最终答案。</span></p>

<p id="t-OhpGis5u5bXVOf3MJa0uSc"><span>您选择的模型的质量和能力直接影响智能体的基线可靠性和性能。不同的模型擅长不同的任务——有些更擅长遵循复杂指令，有些在结构化推理方面更出色，还有一些支持更大的上下文窗口以处理更多信息。</span></p>

<p id="t-RyVKG7QsolGmmtoNwrIkyL"><span>LangChain 的标准模型接口让您可以访问许多不同的提供商集成，这使得您可以轻松地试验和切换模型，以找到最适合您用例的模型。</span></p>


<a id="section-0664"></a>
## 基本用法

<a id="t-g3vuF8e4KQnccT8lZgoZP8"></a>

<p id="t-HKn05jPsMznyw6cR2ZRTRl"><span>模型可以通过两种方式使用：</span></p>

<ol start="1"><li id="t-rMMWVluC8714gqta8wwhQO"><span style="font-weight:bold">与智能体一起使用</span><span> - 在创建</span><span style="border-bottom:1px solid;font-weight:bold">智能体</span><span>时可以动态指定模型。</span></li></ol>

<ol start="2"><li id="t-AoUhmmUU8PLrz7ACp2ZLc7"><span style="font-weight:bold">独立使用</span><span>- 模型可以直接调用（在智能体循环之外），用于文本生成、分类或提取等任务，而无需智能体框架。</span></li></ol>

<p id="t-i7JFCrQTehsOnM97uXQnBO"><span>相同的模型接口在这两种情况下都适用，这为您提供了灵活性，可以从简单开始，并根据需要扩展到更复杂的基于智能体的工作流。</span></p>


<a id="section-0665"></a>
## 初始化模型

<a id="t-qoienYhlYYlBhNKysWilbw"></a>

<p id="t-J0GiPmT6H9z7AVUMK4QhUt"><span>在 LangChain 中开始使用独立模型的最简单方法是使用 </span><span style="border-bottom:1px solid;font-weight:bold">init_chat_model</span><span> 从您选择的聊天模型提供商初始化一个模型（示例如下）：</span></p>

<pre id="t-6oeF8lgSdZMve463Xy3vQw"><code>pip install -U "langchain[openai]"</code></pre>

<pre id="t-UxaourOtEh7wPjQRpZzjpi"><code>import os
from langchain.chat_models import init_chat_model

os.environ["OPENAI_API_KEY"] = "sk-..."

model = init_chat_model("gpt-4.1")</code></pre>

<pre id="t-TEB8j2TPnu1zzE2OwuKBud"><code>response = model.invoke("Why do parrots talk?")</code></pre>


<a id="section-0666"></a>
## 支持的模型

<a id="t-2gejxkW6RQpjabILLqU7sv"></a>

<p id="t-TGYczREIwPQWdeB6oDWNjq"><span>LangChain 支持所有主要的模型提供商，包括 OpenAI、Anthropic、Google、Azure、AWS Bedrock 等。每个提供商都提供具有不同功能的各种模型。</span></p>


<a id="section-0667"></a>
## 关键方法

<a id="t-tEhmG0aa6P891mjwiqajzO"></a>

<div id="t-3HMvifkzZ3pZIBGzRVChJF"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/525b96b6b86b9439fc0662bc.png"/></div>

<blockquote id="t-OiRQNYkh5dMlELOjSKEqOu"><p id="t-dPHsKflBAGjVePe1AS00ng"><span>除了聊天模型，LangChain 还支持其他相关技术，例如嵌入模型和向量存储。</span></p></blockquote>


<a id="section-0668"></a>
## 参数

<a id="t-AEHJkeJ4ta4N3tsfyVo98f"></a>

<p id="t-Unr0QTsfwEtP3bsg4s7kTn"><span>聊天模型接受可用于配置其行为的参数。支持的完整参数集因模型和提供商而异，但标准参数包括：</span></p>

<div id="t-0PcHIpwNrECuZ5DubPmLHM"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/77af0fa96b95bc1058d98ba7.png"/></div>

<div id="t-6EOjrImF89JcXxgr3lBhwF"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/51c951442ff242f74f10449c.png"/></div>

<p id="t-VcYy4YlEtCstvI6QhjngMg"><span style="background-color:transparent">使用 </span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">init_chat_model</span><span style="background-color:transparent"> 时，将这些参数作为内联的</span><span style="border-bottom:1px solid;background-color:transparent">**kwargs</span><span style="background-color:transparent">传递：</span></p>

<p id="t-54OaHC9gcSFx1nA8WA1F07"><span style="font-weight:bold">Initialize using model parameters</span></p>

<pre id="t-oYyktODSN7n7LaJjeSjdF2"><code>model = init_chat_model(
"claude-sonnet-4-5-20250929",
# Kwargs passed to the model:
temperature=0.7,
timeout=30,
max_tokens=1000,
)</code></pre>

<p id="t-Vk86WFIvvCM1qG71cWQJNt"><span>每个聊天模型集成可能具有用于控制特定于提供商功能的额外参数。</span></p>

<blockquote id="t-gmwjdQLOAnOjoEE7lcfVfL"><p id="t-HybqDjIfZLTUIcNSqOsj3r"><span>例如，</span><span style="border-bottom:1px solid;font-weight:bold">ChatOpenAI</span><span> 具有 </span><span>use_responses_api</span><span> 参数，用于指示是使用 OpenAI Responses API 还是 Completions API。</span></p></blockquote>


<a id="section-0669"></a>
## 调用

<a id="t-8o7d2LvDSfTiNmIxCUJJE6"></a>

<p id="t-2kKzzD7z6BltOFAcfviCUV"><span>必须调用聊天模型才能生成输出。有三种主要的调用方法，每种适用于不同的用例。</span></p>


<a id="section-0670"></a>
## Invoke

<a id="t-CtsOd9x1rQGwohx8ADjqQf"></a>

<p id="t-W79Yby1OLeMkNRGGBfos0c"><span>调用模型最直接的方法是使用</span><span style="border-bottom:1px solid;font-weight:bold">invoke()</span><span>并传入单个消息或消息列表。</span></p>

<p id="t-S33PrfZuvxT4U45H777Iuw"><span style="font-weight:bold">Single message</span></p>

<pre id="t-4jM9v4ufj0lQxHPLdsnDCK"><code>response = model.invoke("Why do parrots have colorful feathers?")
print(response)</code></pre>

<p id="t-0g61flzlMpV57xBMpArx21"><span>可以向聊天模型提供消息列表以表示对话历史记录。每条消息都有一个角色，模型使用该角色来指示对话中是谁发送了消息。</span></p>

<p id="t-Nc8Gtq9PZHDJWJLSBnPTB0"><span style="font-weight:bold">Dictionary format</span></p>

<pre id="t-VjHwKDFUdxxJle7qQ8yurV"><code>conversation = [
{"role": "system", "content": "You are a helpful assistant that translates English to French."},
{"role": "user", "content": "Translate: I love programming."},
{"role": "assistant", "content": "J'adore la programmation."},
{"role": "user", "content": "Translate: I love building applications."}
]

response = model.invoke(conversation)
print(response) # AIMessage("J'adore créer des applications.")</code></pre>

<p id="t-j35pTmfGgTs08chTmEig7y"><span style="font-weight:bold">Message objects</span></p>

<pre id="t-zvs1Fapg9gx5R4JmbFReaM"><code>from langchain.messages import HumanMessage, AIMessage, SystemMessage

conversation = [
SystemMessage("You are a helpful assistant that translates English to French."),
HumanMessage("Translate: I love programming."),
AIMessage("J'adore la programmation."),
HumanMessage("Translate: I love building applications.")
]

response = model.invoke(conversation)
print(response) # AIMessage("J'adore créer des applications.")</code></pre>

<blockquote id="t-7nOKBIGO0kp3d4ipWAdZkb"><p id="t-1G0JsfehNeqftUupZqHBoU"><span>如果您的调用返回类型是字符串，请确保您使用的是聊天模型，而不是 LLM。传统的文本补全 LLM 直接返回字符串。LangChain 的聊天模型以 "Chat" 为前缀，例如 </span><span style="border-bottom:1px solid;font-weight:bold">ChatOpenAI</span><span>(/oss/integrations/chat/openai)。</span></p></blockquote>


<a id="section-0671"></a>
## Stream

<a id="t-u4aCWhbP9nHJYdSSKa4q8i"></a>

<p id="t-HMDEPYKzjJ57SKwsZhFWVy"><span>大多数模型可以在生成输出内容时进行流式传输。通过逐步显示输出，流式传输显著改善了用户体验，特别是对于较长的响应。</span></p>

<p id="t-tjvTifsksnWjGd1XWhgLkU"><span>调用 </span><span style="border-bottom:1px solid;font-weight:bold">stream()</span><span> 会返回一个</span><span style="border-bottom:1px solid">迭代器</span><span>，该迭代器在生成时产生输出块。您可以使用循环实时处理每个块：</span></p>

<pre id="t-Y76dCAiR2YI0FiTjxr79KO"><code>for chunk in model.stream("Why do parrots have colorful feathers?"):
print(chunk.text, end="|", flush=True)</code></pre>

<p id="t-zfKdzzV3PF2Eu9Ea2CCWcx"><span>与返回单个</span><span style="border-bottom:1px solid;font-weight:bold">AIMessage</span><span>（在模型完成生成其完整响应后）的</span><span style="border-bottom:1px solid;font-weight:bold">invoke()</span><span>不同，</span><span>stream()</span><span>返回多个</span><span style="border-bottom:1px solid;font-weight:bold">AIMessageChunk</span><span>对象，每个对象包含输出文本的一部分。重要的是，流中的每个块都设计为可以通过求和聚合成完整的消息：</span></p>

<p id="t-S0dTeYp4vSbzyxIOD7RUdc"><span style="font-weight:bold">Construct an AIMessage</span></p>

<pre id="t-ihacM1SdwM3rseBMJZxfa6"><code>full = None # None | AIMessageChunk
for chunk in model.stream("What color is the sky?"):
full = chunk if full is None else full + chunk
print(full.text)

# The
# The sky
# The sky is
# The sky is typically
# The sky is typically blue
# ...

print(full.content_blocks)
# [{"type": "text", "text": "The sky is typically blue..."}]</code></pre>

<p id="t-KcQlSTfZcT2UI3VRR23Rj9"><span>生成的消息可以像使用</span><span style="border-bottom:1px solid;font-weight:bold">invoke()</span><span>生成的消息一样处理——例如，它可以聚合到消息历史记录中，并作为对话上下文传递回模型。</span></p>

<p id="t-OunUBGhOU5A4tJ6tpUVPNx"><span>只有当程序中的所有步骤都知道如何处理块流时，流式传输才能正常工作。例如，一个不具备流式处理能力的应用程序需要在处理之前将整个输出存储在内存中。</span></p>

<p id="t-Lkj08bE0Nql5mYCcW3Ma6r"><span>LangChain 聊天模型也可以使用</span><span>astream_events()</span><span>流式传输语义事件。</span></p>

<p id="t-jrwzByAYC2d8NO98C3Q75o"><span>这简化了基于事件类型和其他元数据的过滤，并将在后台聚合完整的消息。请参阅下面的示例。</span></p>

<pre id="t-HMpggAUU9WxOS51S0XHQeU"><code>async for event in model.astream_events("Hello"):

if event["event"] == "on_chat_model_start":
print(f"Input: {event['data']['input']}")

elif event["event"] == "on_chat_model_stream":
print(f"Token: {event['data']['chunk'].text}")

elif event["event"] == "on_chat_model_end":
print(f"Full message: {event['data']['output'].text}")

else:
pass</code></pre>

<pre id="t-AD0HsL9FGa9N9n0D2V9DnC"><code>Input: Hello
Token: Hi
Token:  there
Token: !
Token:  How
Token:  can
Token:  I
...
Full message: Hi there! How can I help today?</code></pre>

<p id="t-FTCjQLuBAWtYx9yPqhxUnR"><span>有关事件类型和其他详细信息，请参阅</span><span style="border-bottom:1px solid;font-weight:bold">astream_events()</span><span>参考。</span></p>

<p id="t-J5saWMerPSGHe4OFilEA4H"><span>LangChain 通过在某些情况下自动启用流式传输模式来简化从聊天模型的流式传输，即使您没有显式调用流式传输方法。当您使用非流式调用的 invoke 方法但仍希望流式传输整个应用程序（包括来自聊天模型的中间结果）时，这特别有用。</span></p>

<p id="t-l0aVZsV5vKvZSLZGxSgoau"><span>例如，在 </span><span style="border-bottom:1px solid;font-weight:bold">LangGraph 智能体</span><span>中，您可以在节点内调用 </span><span>model.invoke()</span><span>，但如果以流式模式运行，LangChain 将自动委托给流式传输。</span></p>

<a id="t-4MEjHGrTt8uQkKtzQmTshX"></a>

##### 工作原理

<p id="t-tL8EDJFGvf9k7aCufiN8EJ"><span>当您</span><span>invoke()</span><span>一个聊天模型时，如果 LangChain 检测到您正尝试流式传输整个应用程序，它将自动切换到内部流式传输模式。就使用 invoke 的代码而言，调用的结果将是相同的；然而，在聊天模型被流式传输时，LangChain 将负责在 LangChain 的回调系统中调用</span><span style="border-bottom:1px solid;font-weight:bold">on_llm_new_token</span><span>事件。</span></p>

<p id="t-VW3Bkd7RWPchJAxpxTvvV1"><span>回调事件允许 LangGraph 的</span><span>stream()</span><span>和</span><span>astream_events()</span><span>实时呈现聊天模型的输出。</span></p>


<a id="section-0672"></a>
## Batch

<a id="t-RfuFX9conLrM4FyuyceI7n"></a>

<p id="t-rJMXNBtXyKed0MzaclR0ds"><span>将一组独立的请求批量发送到模型可以显著提高性能并降低成本，因为处理可以并行完成：</span></p>

<p id="t-C0Vp1NIdWGhRwMf4dDGVgn"><span style="font-weight:bold">Batch</span></p>

<pre id="t-0yqTowDOnNR3aVyYA974QX"><code>responses = model.batch([
"Why do parrots have colorful feathers?",
"How do airplanes fly?",
"What is quantum computing?"
])
for response in responses:
print(response)</code></pre>

<blockquote id="t-pCCtlOKRHVc4pDW9rtGDNf"><p id="t-67JNi6IpjgI2QkMSbcb83t"><span>本节描述了聊天模型方法</span><span style="border-bottom:1px solid;font-weight:bold">batch()</span><span>，它在客户端并行化模型调用。</span></p></blockquote>

<p id="t-dpsrJqo5EtwuyRjCMduvVx"><span>它</span><span style="font-weight:bold">不同于</span><span>推理提供商支持的批量 API，例如</span><span style="border-bottom:1px solid;font-weight:bold">OpenAI</span><span>或</span><span style="border-bottom:1px solid;font-weight:bold">Anthropic</span><span>。</span></p>

<p id="t-DvvMzMEaJt8FYtkyk8zKWh"><span>默认情况下，</span><span style="border-bottom:1px solid;font-weight:bold">batch()</span><span>将仅返回整个批次的最终输出。如果您希望在每个单独输入完成生成时接收其输出，可以使用</span><span style="border-bottom:1px solid;font-weight:bold">batch_as_completed()</span><span>流式传输结果：</span></p>

<p id="t-mPcKEOufdfHGCJbJdzbuS7"><span style="font-weight:bold">Yield batch responses upon completion</span></p>

<pre id="t-wxGBaENlrp5FF6H0wschcL"><code>for response in model.batch_as_completed([
"Why do parrots have colorful feathers?",
"How do airplanes fly?",
"What is quantum computing?"
]):
print(response)</code></pre>

<p id="t-rBOOjCWqVRRCWqnI7ixg3X"><span>使用</span><span style="border-bottom:1px solid;font-weight:bold">batch_as_completed()</span><span>时，结果可能不按顺序到达。每个结果都包含输入索引，以便在需要时匹配以重建原始顺序。</span></p>

<p id="t-RYJv2o5CoZNaNYYpe8fZa7"><span>当使用</span><span style="border-bottom:1px solid;font-weight:bold">batch()</span><span>或</span><span style="border-bottom:1px solid;font-weight:bold">batch_as_completed()</span><span>处理大量输入时，您可能希望控制最大并行调用数。这可以通过在</span><span style="border-bottom:1px solid;font-weight:bold">RunnableConfig</span><span>字典中设置</span><span style="border-bottom:1px solid;font-weight:bold">max_concurrency</span><span>属性来实现。</span></p>

<p id="t-WC6JbVh8uLZRTfdtrryvJl"><span style="font-weight:bold">Batch with max concurrency</span></p>

<pre id="t-GmzkbM1QcEhOEiPHc5JJ97"><code>model.batch(
list_of_inputs,
config={
'max_concurrency': 5, # Limit to 5 parallel calls
}
)</code></pre>

<p id="t-PszKFAytRURQ19NhVM9MXS"><span>有关支持的属性的完整列表，请参阅</span><span style="border-bottom:1px solid;font-weight:bold">RunnableConfig</span><span>参考。</span></p>


<a id="section-0673"></a>
## 工具调用

<a id="t-3ylMHrb7tuWPXVvQqRhoZl"></a>

<p id="t-AvPoHwQE9DnRnx2AiLrnp7"><span>模型可以请求调用工具来执行任务，例如从数据库获取数据、搜索网络或运行代码。工具由以下两部分组成：</span></p>

<ol start="1"><li id="t-qkWqVfoKGXyq8fcP3U0nuY"><span>一个模式，包括工具名称、描述和/或参数定义（通常是 JSON 模式）</span></li></ol>

<ol start="2"><li id="t-2MIvEf4po0qFHw7MLlZcIR"><span>一个用于执行的函数或</span><span style="border-bottom:1px solid">协程</span><span>。</span></li></ol>

<p id="t-jxx61sywsyup8N8UdLZCGF"><span>您可能会听到“函数调用”这个术语。我们将其与“工具调用”互换使用。</span></p>

<p id="t-laXdULcE7w2SbriMAzGFKx"><span>以下是用户和模型之间基本的工具调用流程：</span></p>

<div id="t-XHJIbNOr3Fpixa4a0fSqGQ"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/583b7c8e7dc688b7ba6c1879.png"/></div>

<p id="t-tgUYhIu26H84KJpzh3Rh7y"><span>要使您定义的模型能够使用工具，必须使用</span><span style="border-bottom:1px solid;font-weight:bold">bind_tools</span><span>绑定它们。在后续调用中，模型可以根据需要选择调用任何已绑定的工具。</span></p>

<p id="t-QbprKEiMGuwBsLDHWrohRG"><span>一些模型提供商提供 </span><span style="border-bottom:1px solid">内置工具</span><span>，可以通过模型或调用参数启用（例如 </span><span style="border-bottom:1px solid;font-weight:bold">ChatOpenAI</span><span>、</span><span style="border-bottom:1px solid;font-weight:bold">ChatAnthropic</span><span>）。</span></p>

<p id="t-pvvh8LthVpOXbbUxKT1XTb"><span style="font-weight:bold">Binding user tools</span></p>

<pre id="t-0hzDqPflGEXt8tr0giZLFE"><code>from langchain.tools import tool

@tool
def get_weather(location: str) -&gt; str:
"""Get the weather at a location."""
return f"It's sunny in {location}."

model_with_tools = model.bind_tools([get_weather])

response = model_with_tools.invoke("What's the weather like in Boston?")
for tool_call in response.tool_calls:
# View tool calls made by the model
print(f"Tool: {tool_call['name']}")
print(f"Args: {tool_call['args']}")</code></pre>

<p id="t-j2KgVEErOqG90VsKahCIzf"><span>绑定用户定义的工具时，模型的响应会包含执行工具的</span><span style="font-weight:bold">请求</span><span>。当将模型与 </span><span style="border-bottom:1px solid;font-weight:bold">智能体</span><span> 分开使用时，需要您自己执行请求的工具，并将结果返回给模型以供后续推理使用。当使用 </span><span style="border-bottom:1px solid;font-weight:bold">智能体</span><span> 时，智能体循环将为您处理工具执行循环。</span></p>

<p id="t-Q2Jp8iGMkb7U23zSDOhZ7o"><span>下面，我们展示一些使用工具调用的常见方式。</span></p>

<p id="t-ms06XMpdhlgMPTaBtyeUla"><span>当模型返回工具调用时，您需要执行这些工具并将结果传回给模型。这就创建了一个对话循环，模型可以利用工具结果生成最终响应。LangChain 包含 </span><span style="border-bottom:1px solid;font-weight:bold">智能体</span><span> 抽象，可为您处理这种编排。</span></p>

<p id="t-gPnEmwUN2jKAnyL98xFZV1"><span>以下是一个简单的示例：</span></p>

<p id="t-qJSAaXKYklv6PEfS0polRg"><span style="font-weight:bold">Tool execution loop</span></p>

<pre id="t-zRF5CxrtUeQ1q9ZZNyrtWo"><code># Bind (potentially multiple) tools to the model
model_with_tools = model.bind_tools([get_weather])

# Step 1: Model generates tool calls
messages = [{"role": "user", "content": "What's the weather in Boston?"}]
ai_msg = model_with_tools.invoke(messages)
messages.append(ai_msg)

# Step 2: Execute tools and collect results
for tool_call in ai_msg.tool_calls:
# Execute the tool with the generated arguments
tool_result = get_weather.invoke(tool_call)
messages.append(tool_result)

# Step 3: Pass results back to model for final response
final_response = model_with_tools.invoke(messages)
print(final_response.text)
# "The current weather in Boston is 72°F and sunny."</code></pre>

<p id="t-TCHBoLP99EyPjPuI7b15YB"><span>工具返回的每个</span><span style="border-bottom:1px solid;font-weight:bold">ToolMessage</span><span>都包含一个与原始工具调用匹配的</span><span>tool_call_id</span><span>，帮助模型将结果与请求关联起来。</span></p>

<p id="t-qDvB6La8kmO1Sh5kiYc3kI"><span>默认情况下，模型可以根据用户输入自由选择使用哪个绑定的工具。但是，您可能希望强制选择工具，确保模型使用特定工具或给定列表中的</span><span style="font-weight:bold">任何</span><span>工具：</span></p>

<pre id="t-mkhyNHdh3W6UMAU2eE3MKY"><code>model_with_tools = model.bind_tools([tool_1], tool_choice="any")</code></pre>

<p id="t-Il8HziQeBOAtXrrm4WHYx5"><span>许多模型在适当情况下支持并行调用多个工具。这使得模型可以同时从不同来源收集信息。</span></p>

<pre id="t-qGaZon10EDTabNif8eXsZv"><code>model_with_tools = model.bind_tools([get_weather])

response = model_with_tools.invoke(
"What's the weather in Boston and Tokyo?"
)

# The model may generate multiple tool calls
print(response.tool_calls)
# [
#   {'name': 'get_weather', 'args': {'location': 'Boston'}, 'id': 'call_1'},
#   {'name': 'get_weather', 'args': {'location': 'Tokyo'}, 'id': 'call_2'},
# ]

# Execute all tools (can be done in parallel with async)
results = []
for tool_call in response.tool_calls:
if tool_call['name'] == 'get_weather':
result = get_weather.invoke(tool_call)
...
results.append(result)</code></pre>

<p id="t-7SzovuHtDamKf1Q25buxVd"><span>模型会根据请求操作的独立性智能地判断何时适合并行执行。</span></p>

<p id="t-DAXfxDnj93XC0poSk7Rl8X"><span>大多数支持工具调用的模型默认启用并行工具调用。一些模型（包括</span><span style="border-bottom:1px solid;font-weight:bold">OpenAI</span><span>和</span><span style="border-bottom:1px solid;font-weight:bold">Anthropic</span><span>）允许您禁用此功能。为此，请设置</span><span>parallel_tool_calls=False</span><span>：</span></p>

<pre id="t-u0u3SluYyvYX4PGZ6jIm02"><code>model.bind_tools([get_weather], parallel_tool_calls=False)</code></pre>

<p id="t-xFbkq3PusBmBF8RZ8uQoEU"><span>在流式传输响应时，工具调用通过</span><span style="border-bottom:1px solid;font-weight:bold">ToolCallChunk</span><span>逐步构建。这允许您在工具调用生成时就看到它们，而无需等待完整响应。</span></p>

<p id="t-Lr7VCIJWypAf8hj3h2jDlb"><span style="font-weight:bold">Streaming tool calls</span></p>

<pre id="t-SwBVvezN4uvRjWrJ0iU3fp"><code>for chunk in model_with_tools.stream(
"What's the weather in Boston and Tokyo?"
):
# Tool call chunks arrive progressively
for tool_chunk in chunk.tool_call_chunks:
if name := tool_chunk.get("name"):
print(f"Tool: {name}")
if id_ := tool_chunk.get("id"):
print(f"ID: {id_}")
if args := tool_chunk.get("args"):
print(f"Args: {args}")

# Output:
# Tool: get_weather
# ID: call_SvMlU1TVIZugrFLckFE2ceRE
# Args: {"lo
# Args: catio
# Args: n": "B
# Args: osto
# Args: n"}
# Tool: get_weather
# ID: call_QMZdy6qInx13oWKE7KhuhOLR
# Args: {"lo
# Args: catio
# Args: n": "T
# Args: okyo
# Args: "}</code></pre>

<p id="t-sphqxIAgLxynf6slNoVqjm"><span>您可以累积块来构建完整的工具调用：</span></p>

<p id="t-suVk9nJXydqmNUY3OvYLCi"><span style="font-weight:bold">Accumulate tool calls</span></p>

<pre id="t-0857k98Gm2pklr7OfOxRBZ"><code>gathered = None
for chunk in model_with_tools.stream("What's the weather in Boston?"):
gathered = chunk if gathered is None else gathered + chunk
print(gathered.tool_calls)</code></pre>


<a id="section-0674"></a>
## 结构化输出

<a id="t-Oa0CEM5mCHN4VvC7KP3v5M"></a>

<p id="t-KDIk26KCP5ic51K6xQGIYu"><span>可以要求模型以符合给定模式的格式提供响应。这对于确保输出易于解析并在后续处理中使用非常有用。LangChain 支持多种模式类型和强制执行结构化输出的方法。</span></p>

<p id="t-CsTgwAOTb3NPmaPvPMtaX1"><span style="border-bottom:1px solid;font-weight:bold">Pydantic 模型</span><span> 提供了最丰富的功能集，包括字段验证、描述和嵌套结构。</span></p>

<pre id="t-6sTsDF4Gfl7Gq8rXPGuvXY"><code>from pydantic import BaseModel, Field

class Movie(BaseModel):
"""A movie with details."""
title: str = Field(..., description="The title of the movie")
year: int = Field(..., description="The year the movie was released")
director: str = Field(..., description="The director of the movie")
rating: float = Field(..., description="The movie's rating out of 10")

model_with_structure = model.with_structured_output(Movie)
response = model_with_structure.invoke("Provide details about the movie Inception")
print(response) # Movie(title="Inception", year=2010, director="Christopher Nolan", rating=8.8)</code></pre>

<p id="t-MJAjdAOdbyKQ951CLMHWU2"><span style="font-weight:bold">结构化输出的关键注意事项</span></p>

<ul><li id="t-srqgyWZ4Ke9nPtEnJ59Rre"><span style="font-weight:bold">方法参数</span><span>：一些提供商支持不同的结构化输出方法：</span></li></ul>

<ul><li id="t-HmR0fBaRbS79bvV3bOO13e"><span>'json_schema'</span><span>：使用提供商提供的专用结构化输出功能。</span></li></ul>

<ul><li id="t-IGyKX4zuj0s0NF2m7ynmJR"><span>'function_calling'</span><span>：通过强制遵循给定模式的 </span><span style="border-bottom:1px solid;font-weight:bold">工具调用</span><span> 来派生结构化输出。</span></li></ul>

<ul><li id="t-ecSDGblM7ZhQQkxCGIJDu3"><span>'json_mode'</span><span>：某些提供商提供的</span><span>'json_schema'</span><span>的前身。生成有效的 JSON，但模式必须在提示中描述。</span></li></ul>

<ul><li id="t-MqRHbFIo7rmWBz21NTw4j8"><span style="font-weight:bold">包含原始数据</span><span>：设置</span><span>include_raw=True</span><span>以同时获取解析后的输出和原始的 AI 消息。</span></li></ul>

<ul><li id="t-tV0DkEKDX54FpTbpFsfhko"><span style="font-weight:bold">验证</span><span>：Pydantic 模型提供自动验证。</span><span>TypedDict</span><span>和 JSON 模式需要手动验证。</span></li></ul>

<p id="t-wMURjXjsKM3ckkQvvSGoes"><span>返回原始的 </span><span style="border-bottom:1px solid;font-weight:bold">AIMessage</span><span> 对象以及解析后的表示形式可能很有用，以便访问响应元数据，例如 </span><span style="border-bottom:1px solid;font-weight:bold">令牌计数</span><span>。为此，在调用 </span><span style="border-bottom:1px solid;font-weight:bold">with_structured_output</span><span> 时设置 </span><span style="border-bottom:1px solid;font-weight:bold">include_raw=True</span><span>：</span></p>

<pre id="t-1fc7dhpvxtHlRllMssGtWM"><code>from pydantic import BaseModel, Field

class Movie(BaseModel):
"""A movie with details."""
title: str = Field(..., description="The title of the movie")
year: int = Field(..., description="The year the movie was released")
director: str = Field(..., description="The director of the movie")
rating: float = Field(..., description="The movie's rating out of 10")

model_with_structure = model.with_structured_output(Movie, include_raw=True)
response = model_with_structure.invoke("Provide details about the movie Inception")
response
# {
#     "raw": AIMessage(...),
#     "parsed": Movie(title=..., year=..., ...),
#     "parsing_error": None,
# }</code></pre>

<p id="t-amG9WFs2lBb0iZu7pYPzII"><span>模式可以嵌套：</span></p>

<p id="t-hdb0joDZXySfrsFXypVWIx"><span style="font-weight:bold">Pydantic BaseModel</span></p>

<pre id="t-hLBF9pBfBVZ9UdtsQjOQnV"><code>from pydantic import BaseModel, Field

class Actor(BaseModel):
name: str
role: str

class MovieDetails(BaseModel):
title: str
year: int
cast: list[Actor]
genres: list[str]
budget: float | None = Field(None, description="Budget in millions USD")

model_with_structure = model.with_structured_output(MovieDetails)</code></pre>


<a id="section-0676"></a>
## 模型配置文件

<a id="t-4FH2wuxbENq8jr1zsWwZqf"></a>

<p id="t-l7Ppq6X2LfhN22cs0MMsva"><span>模型配置文件需要</span><span>langchain&gt;=1.1</span><span>。</span></p>

<p id="t-8jallQCee2uXGVzVGbZrOk"><span>LangChain 聊天模型可以通过</span><span>.profile</span><span>属性公开一个包含支持功能和能力的字典：</span></p>

<pre id="t-Ed7F8bEY2hX4suZMBkPcZb"><code>model.profile
# {
#   "max_input_tokens": 400000,
#   "image_inputs": True,
#   "reasoning_output": True,
#   "tool_calling": True,
#   ...
# }</code></pre>

<p id="t-QraQHfp5m3JQSerJp5lwwO"><span>模型配置文件数据主要由 </span><span style="border-bottom:1px solid;font-weight:bold">models.dev</span><span> 项目提供支持，这是一个提供模型能力数据的开源项目。这些数据为了与 LangChain 一起使用而增加了额外的字段。这些增强内容会随着上游项目的发展而保持同步。</span></p>

<p id="t-CAaioMS8YOMw4TJ7rBCMd0"><span>模型配置文件数据允许应用程序动态地适应模型能力。例如：</span></p>

<ol start="1"><li id="t-E19kdXa4TyGkorDCpQ56N6"><span style="border-bottom:1px solid;font-weight:bold">摘要中间件</span><span> 可以根据模型的上下文窗口大小触发摘要。</span></li></ol>

<ol start="2"><li id="t-UfAyVngANo3TnT5Uzv8z0x"><span>create_agent</span><span> 中的 </span><span style="border-bottom:1px solid;font-weight:bold">结构化输出</span><span> 策略可以自动推断（例如，通过检查对原生结构化输出功能的支持）。</span></li></ol>

<ol start="3"><li id="t-cwDHCNmtRPAdtC4LLFloBe"><span>可以根据支持的 </span><span style="border-bottom:1px solid;font-weight:bold">模态</span><span> 和最大输入令牌数来限制模型输入。</span></li></ol>

<p id="t-XQKQBv7pQnb3DuLIpy4maD"><span>如果模型配置文件数据缺失、过时或不正确，可以更改。</span></p>

<p id="t-QrQot5hBhMdS4M6JpCL7RV"><span style="font-weight:bold">选项 1（快速修复）</span></p>

<p id="t-9NV3Kfdzbk9kg7RkeiAOKK"><span>您可以使用任何有效的配置文件实例化聊天模型：</span></p>

<pre id="t-3cNAQtaCUnSYWPU4qu6IE1"><code>custom_profile = {
"max_input_tokens": 100_000,
"tool_calling": True,
"structured_output": True,
# ...
}
model = init_chat_model("...", profile=custom_profile)</code></pre>

<p id="t-uMKmXOxiMzhvLbMD7nnFTj"><span>profile</span><span>也是一个常规的</span><span>dict</span><span>，可以就地更新。如果模型实例是共享的，请考虑使用</span><span>model_copy</span><span>以避免改变共享状态。</span></p>

<pre id="t-wOCya1cf1zBzedSwbwpRMB"><code>new_profile = model.profile | {"key": "value"}
model.model_copy(update={"profile": new_profile})</code></pre>

<p id="t-5nqER0uIJxTZSRblThBdBo"><span style="font-weight:bold">选项 2（修复上游数据）</span></p>

<p id="t-nCYPFRwTTq4Gs6BLmALpqC"><span>数据的主要来源是 </span><span style="border-bottom:1px solid;font-weight:bold">models.dev</span><span> 项目。这些数据与 LangChain </span><span style="border-bottom:1px solid;font-weight:bold">集成包</span><span> 中的额外字段和覆盖项合并，并随这些包一起发布。</span></p>

<p id="t-n1FmoTk8Fm6Lf6DPtxfN9D"><span>可以通过以下过程更新模型配置文件数据：</span></p>

<ol start="1"><li id="t-oI10maNINkzhncqTwFtw2i"><span>（如果需要）通过向其在</span><span style="border-bottom:1px solid;font-weight:bold">GitHub 上的仓库</span><span>提交拉取请求来更新</span><span style="border-bottom:1px solid;font-weight:bold">models.dev</span><span>的源数据。</span></li></ol>

<ol start="2"><li id="t-eHaq3H7Fbcld7Th4o2YH3I"><span>（如果需要）通过向 LangChain</span><span style="border-bottom:1px solid;font-weight:bold">集成包</span><span>提交拉取请求来更新</span><span>langchain_&lt;package&gt;/data/profile_augmentations.toml</span><span>中的额外字段和覆盖项。</span></li></ol>

<ol start="3"><li id="t-pVxAnlzlUFE6IZxGeZueO0"><span>使用</span><span style="border-bottom:1px solid;font-weight:bold">langchain-model-profiles</span><span>CLI 工具从</span><span style="border-bottom:1px solid;font-weight:bold">models.dev</span><span>拉取最新数据，合并增强内容并更新配置文件数据：</span></li></ol>

<pre id="t-F2JXBv9eOdDiYsMbNCYbPS"><code>pip install langchain-model-profiles</code></pre>

<pre id="t-70MLZLLQBLpjAqFiLiONIo"><code>langchain-profiles refresh --provider &lt;provider&gt; --data-dir &lt;data_dir&gt;</code></pre>

<p id="t-ETbnbEesVwxe2f9a580BPt"><span>此命令：</span></p>

<ul><li id="t-6D2X49IKcwTHaKTM5LjkQE"><span>从 models.dev 下载</span><span>&lt;provider&gt;</span><span>的最新数据</span></li></ul>

<ul><li id="t-J80DUrCzOR5i1jK1GWFQhj"><span>从</span><span>&lt;data_dir&gt;</span><span>中的</span><span>profile_augmentations.toml</span><span>合并增强内容</span></li></ul>

<ul><li id="t-jtkm6CwrEmf530tHw1ztxu"><span>将合并后的配置文件写入</span><span>&lt;data_dir&gt;</span><span>中的</span><span>profiles.py</span></li></ul>

<p id="t-AYtmbJS7I1avO4NaxNoN19"><span>例如：在</span><span style="border-bottom:1px solid;font-weight:bold">LangChain 单体仓库</span><span>的</span><span style="border-bottom:1px solid;font-weight:bold">libs/partners/anthropic</span><span>中：</span></p>

<pre id="t-sHe8jJm59MMmy0G4mxwFw0"><code>uv run --with langchain-model-profiles --provider anthropic --data-dir langchain_anthropic/data</code></pre>

<p id="t-TvAcNPjLVWpdvAriNMLsiO"><span>模型配置文件是一个测试版功能。配置文件的格式可能会发生变化。</span></p>


<a id="section-0677"></a>
## 多模态

<a id="t-KcgRrixY6eXthB3k3pZtID"></a>

<p id="t-PpaHLfX0fIIeXrPOvwtDuE"><span>某些模型可以处理和返回非文本数据，例如图像、音频和视频。您可以通过提供 </span><span style="border-bottom:1px solid;font-weight:bold">内容块</span><span> 将非文本数据传递给模型。</span></p>

<p id="t-I0rznnrcheDSXxXT1Lo7IS"><span>所有具有底层多模态功能的 LangChain 聊天模型都支持：</span></p>

<pre id="t-7Pp087oGfVhA8yjw89Vf9d"><code>1. 跨提供商标准格式的数据（请参阅 [我们的消息指南](/oss/langchain/messages)）
2. OpenAI [聊天补全](https://platform.openai.com/docs/api-reference/chat) 格式
3. 该特定提供商原生的任何格式（例如，Anthropic 模型接受 Anthropic 原生格式）
</code></pre>

<p id="t-AaBrojUvhvleMJIabPEs0B"><span style="border-bottom:1px solid">某些模型</span><span>可以在其响应中返回多模态数据。如果被调用执行此操作，生成的</span><span style="border-bottom:1px solid;font-weight:bold">AIMessage</span><span>将包含具有多模态类型的内容块。</span></p>

<p id="t-CdLjK3WO3qiplPUdKXh19o"><span style="font-weight:bold">Multimodal output</span></p>

<pre id="t-QTrpm4PtyexZqBbL9Sm4Pp"><code>response = model.invoke("Create a picture of a cat")
print(response.content_blocks)
# [
#     {"type": "text", "text": "Here's a picture of a cat"},
#     {"type": "image", "base64": "...", "mime_type": "image/jpeg"},
# ]</code></pre>


<a id="section-0678"></a>
## 推理

<a id="t-D8IbIl6WfQl3VNsGFyFYYO"></a>

<p id="t-SpImidy5oiuZOJ13QNOaNn"><span>许多模型能够执行多步推理以得出结论。这涉及将复杂问题分解为更小、更易管理的步骤。</span></p>

<p id="t-3wvAQcEEIQh3bHUS7aGgyQ"><span style="font-weight:bold">如果底层模型支持，</span><span> 您可以展示此推理过程，以更好地理解模型如何得出最终答案。</span></p>

<pre id="t-z0LDRUCgCImcHj37jfMst3"><code>for chunk in model.stream("Why do parrots have colorful feathers?"):
reasoning_steps = [r for r in chunk.content_blocks if r["type"] == "reasoning"]
print(reasoning_steps if reasoning_steps else chunk.text)</code></pre>

<p id="t-P3ZGb8Jj8knzaNgFNtybWt"><span>根据模型的不同，有时您可以指定其在推理上应投入的努力程度。同样，您可以要求模型完全关闭推理。这可能表现为推理的分类"层级"（例如，</span><span>'low'</span><span> 或 </span><span>'high'</span><span>）或整数令牌预算。</span></p>


<a id="section-0679"></a>
## 本地模型

<a id="t-sQgHhXyouaMZoz4sSfsJDZ"></a>

<p id="t-K92NTRAaQsOkYXH2KjQszl"><span>LangChain 支持在您自己的硬件上本地运行模型。这在数据隐私至关重要、您希望调用自定义模型或希望避免使用基于云的模型所产生的成本时非常有用。</span></p>

<p id="t-GdhAVWeUmhGKgdg8SUiWgN"><span style="border-bottom:1px solid;font-weight:bold">Ollama</span><span> 是在本地运行聊天和嵌入模型的最简单方法之一。</span></p>


<a id="section-0680"></a>
## 提示缓存

<a id="t-W82OQDRA0J0EJJETfr2ie2"></a>

<p id="t-8wvbgghOP6hoDfvug1l8xN"><span>许多提供商提供提示缓存功能，以减少重复处理相同令牌时的延迟和成本。这些功能可以是</span><span style="font-weight:bold">隐式</span><span>或</span><span style="font-weight:bold">显式</span><span>的：</span></p>

<ul><li id="t-EIPc4UZgIRxZiiW2sqo2rW"><span style="font-weight:bold">隐式提示缓存：</span><span> 如果请求命中缓存，提供商会自动传递成本节省。例如：</span><span style="border-bottom:1px solid;font-weight:bold">OpenAI</span><span> 和 </span><span style="border-bottom:1px solid;font-weight:bold">Gemini</span><span>。</span></li></ul>

<ul><li id="t-47MYY2bBxj6drHxm2tGhni"><span style="font-weight:bold">显式缓存：</span><span>提供商允许您手动指示缓存点，以实现更精细的控制或保证成本节省。例如：</span></li></ul>

<ul><li id="t-VkL5KaxtyojjFO6oyjnD0s"><span style="border-bottom:1px solid;font-weight:bold">ChatOpenAI</span><span>（通过</span><span>prompt_cache_key</span><span>）</span></li></ul>

<ul><li id="t-onZRfRdyrYEgfS77gHNtHr"><span>Anthropic 的</span><span style="border-bottom:1px solid;font-weight:bold">AnthropicPromptCachingMiddleware</span></li></ul>

<ul><li id="t-wmEZc9140zDHdmcnZ6bCHk"><span style="border-bottom:1px solid;font-weight:bold">Gemini</span><span>。</span></li></ul>

<ul><li id="t-VypHgCYCBnGbIKDP7NSs6H"><span style="border-bottom:1px solid;font-weight:bold">AWS Bedrock</span></li></ul>

<p id="t-QpUeae2V0OinxIHq9VExH6"><span>提示缓存通常仅在输入令牌数超过最小阈值时才会启用。</span></p>

<p id="t-zJR7IeAWfMxBMQdL4eF8Ni"><span>缓存使用情况将反映在模型响应的</span><span style="border-bottom:1px solid;font-weight:bold">使用情况元数据</span><span>中。</span></p>


<a id="section-0681"></a>
## 服务器端工具使用

<a id="t-pEzVHuLTQHlOIsTupfQj7o"></a>

<p id="t-SfvrxnjtWT2Y678KL9Q0Il"><span>一些提供商支持服务器端</span><span style="border-bottom:1px solid;font-weight:bold">工具调用</span><span>循环：模型可以在单个对话轮次中与网络搜索、代码解释器和其他工具交互并分析结果。</span></p>

<p id="t-XRYiWzGfXkrfIVPsXlJP7Y"><span>如果模型在服务器端调用工具，响应消息的内容将包含表示工具调用和结果的内容。访问响应的</span><span style="border-bottom:1px solid;font-weight:bold">内容块</span><span>将以与提供商无关的格式返回服务器端工具调用和结果：</span></p>

<p id="t-8Gd2e9EDEwkbtj46OlJfQS"><span style="font-weight:bold">Invoke with server-side tool use</span></p>

<pre id="t-Qs6flFwVF51wea2DMVtq3D"><code>from langchain.chat_models import init_chat_model

model = init_chat_model("gpt-4.1-mini")

tool = {"type": "web_search"}
model_with_tools = model.bind_tools([tool])

response = model_with_tools.invoke("What was a positive news story from today?")
response.content_blocks</code></pre>

<p id="t-Aiov9XivtvYYbdCx9YtDx1"><span style="font-weight:bold">Result expandable</span></p>

<pre id="t-ogguOkvXRlWzrvdX8317SJ"><code>[
{
"type": "server_tool_call",
"name": "web_search",
"args": {
"query": "positive news stories today",
"type": "search"
},
"id": "ws_abc123"
},
{
"type": "server_tool_result",
"tool_call_id": "ws_abc123",
"status": "success"
},
{
"type": "text",
"text": "Here are some positive news stories from today...",
"annotations": [
{
"end_index": 410,
"start_index": 337,
"title": "article title",
"type": "citation",
"url": "..."
}
]
}
]</code></pre>

<p id="t-HUeyIXp3wTF6qryRO2T9mI"><span>这代表单个对话轮次；没有像客户端</span><span style="border-bottom:1px solid;font-weight:bold">工具调用</span><span>中那样需要传入的关联 </span><span style="border-bottom:1px solid;font-weight:bold">ToolMessage</span><span> 对象。</span></p>


<a id="section-0682"></a>
## 速率限制

<a id="t-BsiLoMj769jXCrRwUMsZ1A"></a>

<p id="t-m6RCs0iNKOoKdNDNuLQjiO"><span>许多聊天模型提供商对给定时间段内可以进行的调用次数施加限制。如果您达到速率限制，通常会收到来自提供商的速率限制错误响应，并且需要等待才能发出更多请求。</span></p>

<p id="t-TVn25RlgzbC0u8IVX5KqLq"><span>为了帮助管理速率限制，聊天模型集成接受一个</span><span>rate_limiter</span><span>参数，可以在初始化时提供以控制请求发出的速率。</span></p>

<p id="t-86HgmIvEtqbcxqG1rT4ptI"><span>LangChain 附带（可选的）内置</span><span style="border-bottom:1px solid;font-weight:bold">InMemoryRateLimiter</span><span>。此限制器是线程安全的，可以在同一进程中被多个线程共享。</span></p>

<p id="t-LKMDx2wICEPZGtJeNVVHgr"><span style="font-weight:bold">Define a rate limiter</span></p>

<pre id="t-iJVJXxQ3L8lBGnr7nT6bwN"><code>from langchain_core.rate_limiters import InMemoryRateLimiter

rate_limiter = InMemoryRateLimiter(
requests_per_second=0.1, # 1 request every 10s
check_every_n_seconds=0.1, # Check every 100ms whether allowed to make a request
max_bucket_size=10, # Controls the maximum burst size.
)

model = init_chat_model(
model="gpt-5",
model_provider="openai",
rate_limiter=rate_limiter
)</code></pre>

<p id="t-zBRGXKj3RNW6AavkNKKR4V"><span>提供的速率限制器只能限制单位时间内的请求数量。如果您还需要基于请求大小进行限制，它将无法提供帮助。</span></p>


<a id="section-0683"></a>
## 基础URL或代理

<a id="t-vrToX3ZThaJ5XPsuG6njeW"></a>

<p id="t-klQ66kBv7exy8swXc7DjxS"><span>对于许多聊天模型集成，您可以配置API请求的基础URL，这允许您使用具有OpenAI兼容API的模型提供商或使用代理服务器。</span></p>

<p id="t-uvLydx2UFb1WUXUQJum17H"><span>许多模型提供商提供OpenAI兼容的API（例如，</span><span style="border-bottom:1px solid;font-weight:bold">Together AI</span><span>、</span><span style="border-bottom:1px solid;font-weight:bold">vLLM</span><span>）。您可以通过指定适当的 </span><span>base_url</span><span> 参数，使用 </span><span style="border-bottom:1px solid;font-weight:bold">init_chat_model</span><span> 与这些提供商：</span></p>

<pre id="t-Z4FR4GLfQZEdJKmYUYHU79"><code>model = init_chat_model(
model="MODEL_NAME",
model_provider="openai",
base_url="BASE_URL",
api_key="YOUR_API_KEY",
)</code></pre>

<p id="t-rm1YAbKlqCqAdZZpU5f3q0"><span>当使用直接聊天模型类实例化时，参数名称可能因提供商而异。</span></p>

<p id="t-b5ECvYKx2csVs0NF16AGZI"><span>对于需要HTTP代理的部署，某些模型集成支持代理配置：</span></p>

<pre id="t-6QgYvuQkXdnhOO9ieJR1QM"><code>from langchain_openai import ChatOpenAI

model = ChatOpenAI(
model="gpt-4o",
openai_proxy="http://proxy.example.com:8080"
)</code></pre>


<a id="section-0684"></a>
## 对数概率

<a id="t-FtOAoThygPJdxYrZXnpQQj"></a>

<p id="t-F1mPBtRXj5V5hxFZphvbjk"><span>某些模型可以通过在初始化模型时设置</span><span>logprobs</span><span>参数来配置为返回令牌级别的对数概率，表示给定令牌的可能性：</span></p>

<pre id="t-p7CRhb5HYi98XzfX2Oyw4O"><code>model = init_chat_model(
model="gpt-4o",
model_provider="openai"
).bind(logprobs=True)

response = model.invoke("Why do parrots talk?")
print(response.response_metadata["logprobs"])</code></pre>


<a id="section-0685"></a>
## 令牌使用情况

<a id="t-sgbiWEeDBbU4DMMznoF7S0"></a>

<p id="t-glp6RoT76Fy3Utep5cJawG"><span>许多模型提供商将令牌使用情况信息作为调用响应的一部分返回。当可用时，此信息将包含在相应模型生成的 </span><span style="border-bottom:1px solid;font-weight:bold">AIMessage</span><span> 对象上。有关更多详细信息，请参阅</span><span style="border-bottom:1px solid;font-weight:bold">消息</span><span>指南。</span></p>

<p id="t-KR93IUXBifW3GJkNEGvKMo"><span>一些提供商API，特别是OpenAI和Azure OpenAI聊天补全，要求用户选择在流式上下文中接收令牌使用情况数据。</span></p>

<p id="t-71qsKXYxCQdmTRvVC8QVFB"><span>您可以使用回调或上下文管理器跟踪应用程序中跨模型的聚合令牌计数，如下所示：</span></p>

<p id="t-HbnbWeQMOpwbe3GKUIsp27"><span style="border-bottom:1px solid;font-weight:bold">回调处理器</span></p>

<p id="t-DRFKULm5UTQFpq05zWs6xv"><span style="border-bottom:1px solid;font-weight:bold">上下文管理器</span></p>

<pre id="t-7rLfFLPpa1cJIIf2AgCDlp"><code>from langchain.chat_models import init_chat_model
from langchain_core.callbacks import UsageMetadataCallbackHandler

model_1 = init_chat_model(model="gpt-4o-mini")
model_2 = init_chat_model(model="claude-haiku-4-5-20251001")

callback = UsageMetadataCallbackHandler()
result_1 = model_1.invoke("Hello", config={"callbacks": [callback]})
result_2 = model_2.invoke("Hello", config={"callbacks": [callback]})
callback.usage_metadata</code></pre>

<pre id="t-oT0emreqItY3NWZnAeuFMe"><code>{
'gpt-4o-mini-2024-07-18': {
'input_tokens': 8,
'output_tokens': 10,
'total_tokens': 18,
'input_token_details': {'audio': 0, 'cache_read': 0},
'output_token_details': {'audio': 0, 'reasoning': 0}
},
'claude-haiku-4-5-20251001': {
'input_tokens': 8,
'output_tokens': 21,
'total_tokens': 29,
'input_token_details': {'cache_read': 0, 'cache_creation': 0}
}
}</code></pre>


<a id="section-0686"></a>
## 调用配置

<a id="t-GeiJORx7gjTOvsvGOgXOYy"></a>

<p id="t-rubcBO7NuCzU4nppBcwrQR"><span>调用模型时，您可以通过</span><span>config</span><span>参数使用</span><span style="border-bottom:1px solid;font-weight:bold">RunnableConfig</span><span>字典传递额外的配置。这提供了对执行行为、回调和元数据跟踪的运行时控制。</span></p>

<p id="t-p2ckDEazS522SqWg5Ncr6D"><span>常见的配置选项包括：</span></p>

<p id="t-NXEQLKgbp5OjN1c0ZujKa5"><span style="font-weight:bold">Invocation with config</span></p>

<pre id="t-XqQHcKe2EwndAoGVqu9PDi"><code>response = model.invoke(
"Tell me a joke",
config={
"run_name": "joke_generation", # Custom name for this run
"tags": ["humor", "demo"], # Tags for categorization
"metadata": {"user_id": "123"}, # Custom metadata
"callbacks": [my_callback_handler], # Callback handlers
}
)</code></pre>

<p id="t-OW23Ty4LHx2LXCVmQ7AuZf"><span>这些配置值在以下情况下特别有用：</span></p>

<ul><li id="t-Mqtx0mjGtyiLC8M7m53oJe"><span>使用 </span><span style="border-bottom:1px solid;font-weight:bold">LangSmith</span><span> 跟踪进行调试</span></li></ul>

<ul><li id="t-Hst8efZ5k9XW2AdBrAODkG"><span>实现自定义日志记录或监控</span></li></ul>

<ul><li id="t-FNO3ajrScwlhQg9wBFxFrE"><span>控制生产环境中的资源使用</span></li></ul>

<ul><li id="t-ZFNlBqK5m0zBF6V4ZhRIMl"><span>跨复杂管道跟踪调用</span></li></ul>

<div id="t-pj0F9GsrcCB3yy9lyf7zvE"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/2137d307e7cda0293389d03b.png"/></div>


<a id="section-0687"></a>
## 可配置模型

<a id="t-w7pT8ie5AXKy441rZj92gN"></a>

<p id="t-XHYhXSREGqI2sDl8VXxthD"><span>您还可以通过指定</span><span style="border-bottom:1px solid;font-weight:bold">configurable_fields</span><span>来创建运行时可配置的模型。如果您不指定模型值，则默认情况下</span><span>'model'</span><span>和</span><span>'model_provider'</span><span>将是可配置的。</span></p>

<pre id="t-GWmykMoYQ87sjDEgo5D1tU"><code>from langchain.chat_models import init_chat_model

configurable_model = init_chat_model(temperature=0)

configurable_model.invoke(
"what's your name",
config={"configurable": {"model": "gpt-5-nano"}}, # Run with GPT-5-Nano
)
configurable_model.invoke(
"what's your name",
config={"configurable": {"model": "claude-sonnet-4-5-20250929"}}, # Run with Claude
)</code></pre>

<p id="t-rwGGUPmD4PwyclUlbntaPv"><span style="font-weight:bold">具有默认值的可配置模型</span></p>

<p id="t-SxnSx5Tnq7DP2B5r0EuMO2"><span>我们可以创建一个具有默认模型值的可配置模型，指定哪些参数是可配置的，并为可配置参数添加前缀：</span></p>

<pre id="t-YrFHlpWrBWLc8xApvjXnLi"><code>first_model = init_chat_model(
model="gpt-4.1-mini",
temperature=0,
configurable_fields=("model", "model_provider", "temperature", "max_tokens"),
config_prefix="first", # Useful when you have a chain with multiple models
)

first_model.invoke("what's your name")</code></pre>

<pre id="t-GNQEtv9RY6wO9hHFlgd1J8"><code>first_model.invoke(
"what's your name",
config={
"configurable": {
"first_model": "claude-sonnet-4-5-20250929",
"first_temperature": 0.5,
"first_max_tokens": 100,
}
},
)</code></pre>

<p id="t-isH9a9iZMoxyGySg94AcXT"><span>有关 </span><span>configurable_fields</span><span> 和 </span><span>config_prefix</span><span> 的更多详细信息，请参阅 </span><span style="border-bottom:1px solid;font-weight:bold">init_chat_model</span><span> 参考。</span></p>

<p id="t-cKBEZRA8VykpthiOxV4tlf"><span style="font-weight:bold">以声明方式使用可配置模型</span></p>

<p id="t-fY4cxJuDrg0YNgmQWg9miE"><span>我们可以在可配置模型上调用声明性操作，如</span><span>bind_tools</span><span>、</span><span>with_structured_output</span><span>、</span><span>with_configurable</span><span>等，并以与常规实例化的聊天模型对象相同的方式链接可配置模型。</span></p>

<pre id="t-btxKJzPkPQKsRWyZkEApbp"><code>from pydantic import BaseModel, Field

class GetWeather(BaseModel):
"""Get the current weather in a given location"""

location: str = Field(..., description="The city and state, e.g. San Francisco, CA")

class GetPopulation(BaseModel):
"""Get the current population in a given location"""

location: str = Field(..., description="The city and state, e.g. San Francisco, CA")

model = init_chat_model(temperature=0)
model_with_tools = model.bind_tools([GetWeather, GetPopulation])

model_with_tools.invoke(
"what's bigger in 2024 LA or NYC", config={"configurable": {"model": "gpt-4.1-mini"}}
).tool_calls</code></pre>

<pre id="t-W2amugyhX3DOOKzsihtNDy"><code>[
{
'name': 'GetPopulation',
'args': {'location': 'Los Angeles, CA'},
'id': 'call_Ga9m8FAArIyEjItHmztPYA22',
'type': 'tool_call'
},
{
'name': 'GetPopulation',
'args': {'location': 'New York, NY'},
'id': 'call_jh2dEvBaAHRaw5JUDthOs7rt',
'type': 'tool_call'
}
]</code></pre>

<pre id="t-IoPoqLdJMX4qXRMiQ6SzQP"><code>model_with_tools.invoke(
"what's bigger in 2024 LA or NYC",
config={"configurable": {"model": "claude-sonnet-4-5-20250929"}},
).tool_calls</code></pre>

<pre id="t-pxFz2ejY3epVG12lvISBtU"><code>[
{
'name': 'GetPopulation',
'args': {'location': 'Los Angeles, CA'},
'id': 'toolu_01JMufPf4F4t2zLj7miFeqXp',
'type': 'tool_call'
},
{
'name': 'GetPopulation',
'args': {'location': 'New York City, NY'},
'id': 'toolu_01RQBHcE8kEEbYTuuS8WqY1u',
'type': 'tool_call'
}
]</code></pre>


<a id="section-0688"></a>
## 消息 (Messages)

<a id="t-block-16263"></a>

<p id="t-fH0DhXlKPygeifkzpozknr"><span style="background-color:transparent">消息是 LangChain 中模型上下文的基本单元。它们代表模型的输入和输出，承载着与 LLM 交互时表示对话状态所需的内容和元数据。</span></p>

<p id="t-NsnZ4eRh26vejsB8uj37JW"><span style="background-color:transparent">消息是包含以下内容的对象：</span></p>

<ul><li id="t-GsKJHYaCeZrcsX7Dhzj2eA"><span style="border-bottom:1px solid;font-weight:bold">角色</span><span> - 标识消息类型（例如 </span><span>system</span><span>、</span><span>user</span><span>）</span></li></ul>

<ul><li id="t-3y0dR0tECAo1ivR0DASWEu"><span style="border-bottom:1px solid;font-weight:bold">内容</span><span> - 表示消息的实际内容（如文本、图像、音频、文档等）</span></li></ul>

<ul><li id="t-0JQTd6qG7nMf54CWoJM67z"><span style="border-bottom:1px solid;font-weight:bold">元数据</span><span> - 可选字段，例如响应信息、消息 ID 和令牌使用情况</span></li></ul>

<p id="t-nWLapRXFxIhclwAELO9f0J"><span style="background-color:transparent">LangChain 提供了一个适用于所有模型提供商的标准消息类型，确保无论调用哪个模型，行为都保持一致。</span></p>


<a id="section-0689"></a>
## 基本用法

<a id="t-ZMwlaY21OM2hIJLAgMjjBk"></a>

<p id="t-piNCBHVv0AErYgkqkc3gvo"><span style="background-color:transparent">使用消息最简单的方法是创建消息对象，并在</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">调用</span><span style="background-color:transparent">模型时将其传递给模型。</span></p>

<pre id="t-y1FdyGKWjCHGRo6QjzRL0F"><code>from langchain.chat_models import init_chat_model
from langchain.messages import HumanMessage, AIMessage, SystemMessage

model = init_chat_model("gpt-5-nano")

system_msg = SystemMessage("You are a helpful assistant.")
human_msg = HumanMessage("Hello, how are you?")

# Use with chat models
messages = [system_msg, human_msg]
response = model.invoke(messages) # Returns AIMessage</code></pre>


<a id="section-0690"></a>
## 文本提示

<a id="t-LX4Uxp9K96WVqLowwMF49J"></a>

<p id="t-CKMK9nN2niXlU5KqVeBxQL"><span style="background-color:transparent">文本提示是字符串 - 非常适合不需要保留对话历史的简单生成任务。</span></p>

<pre id="t-3XwK16OfdcMgh0KvDZsjOm"><code>response = model.invoke("Write a haiku about spring")</code></pre>

<p id="t-pvU4rNXvnfiQ8O74McP1M5"><span style="font-weight:bold;background-color:transparent">在以下情况下使用文本提示：</span></p>

<ul><li id="t-HeVk4GUfl2t8G4GL0HqFer"><span>您有一个单一的、独立的请求</span></li></ul>

<ul><li id="t-Xl8zgP9zpWDmc5dAxI5gQQ"><span>您不需要对话历史</span></li></ul>

<ul><li id="t-zQFaqPyQao171rZN7zfx6L"><span>您希望代码复杂度最低</span></li></ul>


<a id="section-0691"></a>
## 消息提示

<a id="t-GrJ1JBkqjNn75wIdiSSxl8"></a>

<p id="t-Axbk4zE6vlmvXtlmL35ubn"><span style="background-color:transparent">或者，您可以通过提供消息对象列表，将消息列表传递给模型。</span></p>

<pre id="t-xunlD9TrWp9L0IV3nKEorp"><code>from langchain.messages import SystemMessage, HumanMessage, AIMessage

messages = [
SystemMessage("You are a poetry expert"),
HumanMessage("Write a haiku about spring"),
AIMessage("Cherry blossoms bloom...")
]
response = model.invoke(messages)</code></pre>

<p id="t-rqke891bAE2fdCWXYyf3g3"><span style="font-weight:bold;background-color:transparent">在以下情况下使用消息提示：</span></p>

<ul><li id="t-G2BedGNlhvRDSWhxxdYJXH"><span>管理多轮对话</span></li></ul>

<ul><li id="t-hlsRan87zwhxA9HQ1YdV2k"><span>处理多模态内容（图像、音频、文件）</span></li></ul>

<ul><li id="t-EKz0TDjbT6SaIj6ddZENOK"><span>包含系统指令</span></li></ul>


<a id="section-0692"></a>
## 字典格式

<a id="t-numLqxDVY6lc9Udi1F64Jx"></a>

<p id="t-XMrVlfJ94W5loPf3O490Xf"><span style="background-color:transparent">您也可以直接以 OpenAI 聊天补全格式指定消息。</span></p>

<pre id="t-4YI5es040K7CwZV053AWoz"><code>messages = [
{"role": "system", "content": "You are a poetry expert"},
{"role": "user", "content": "Write a haiku about spring"},
{"role": "assistant", "content": "Cherry blossoms bloom..."}
]
response = model.invoke(messages)</code></pre>


<a id="section-0693"></a>
## 消息类型

<a id="t-9pgKZj2qjZUNAUABqN2Uw6"></a>

<ul><li id="t-zQnT19rHBmYx7gRPeqJicK"><span style="border-bottom:1px solid;font-weight:bold">系统消息</span><span> - 告诉模型如何行为，并为交互提供上下文</span></li></ul>

<ul><li id="t-aFFUrvOI6TER7uNDeWO9qy"><span style="border-bottom:1px solid;font-weight:bold">人类消息</span><span> - 代表用户输入和与模型的交互</span></li></ul>

<ul><li id="t-6EGwNmWxehdlwlIK0ZodNq"><span style="border-bottom:1px solid;font-weight:bold">AI 消息</span><span> - 模型生成的响应，包括文本内容、工具调用和元数据</span></li></ul>

<ul><li id="t-LMkiaCk8vQ9800Iwy5u1FR"><span style="border-bottom:1px solid;font-weight:bold">工具消息</span><span> - 代表</span><span style="border-bottom:1px solid;font-weight:bold">工具调用</span><span>的输出</span></li></ul>


<a id="section-0694"></a>
## 系统消息

<a id="t-pE7CugtM2eTRXxzJPR4KC1"></a>

<p id="t-31yCymlLF6E0iVIwWLsEsq"><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">SystemMessage</span><span style="background-color:transparent">代表一组初始指令，用于引导模型的行为。您可以使用系统消息来设定语气、定义模型的角色，并为响应建立指导原则。</span></p>

<p id="t-ndzTWr5nzqUpN8SzcDtPXI"><span style="font-weight:bold">Basic instructions</span></p>

<pre id="t-dZAzgavsMY5fr3RSoC6Efr"><code>system_msg = SystemMessage("You are a helpful coding assistant.")

messages = [
system_msg,
HumanMessage("How do I create a REST API?")
]
response = model.invoke(messages)</code></pre>

<p id="t-BH9Hg4OwYvxBOrJPgLiQCu"><span style="font-weight:bold">Detailed persona</span></p>

<pre id="t-b221H1hZsvMdCPpIUtevM8"><code>from langchain.messages import SystemMessage, HumanMessage

system_msg = SystemMessage("""
You are a senior Python developer with expertise in web frameworks.
Always provide code examples and explain your reasoning.
Be concise but thorough in your explanations.
""")

messages = [
system_msg,
HumanMessage("How do I create a REST API?")
]
response = model.invoke(messages)</code></pre>


<a id="section-0695"></a>
## 人类消息

<a id="t-N96ObiS2wQojTdnTUvL7Pr"></a>

<p id="t-HEss12JAdNETOruyU3FZg5"><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">HumanMessage</span><span style="background-color:transparent"> 代表用户输入和交互。它们可以包含文本、图像、音频、文件以及任何其他数量的多模态</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">内容</span><span style="background-color:transparent">。</span></p>

<a id="t-2QcJWtLlpfBdMnEqmtLhEy"></a>

##### 文本内容

<pre id="t-KR2Sp859gepLQtvmR9i6a0"><code>response = model.invoke([
HumanMessage("What is machine learning?")
])</code></pre>

<a id="t-UJh6NHy8HDZiksVys75jC5"></a>

##### 消息元数据

<p id="t-Lpi2KzbHYCGAnF6j7oxKno"><span style="font-weight:bold">Add metadata</span></p>

<pre id="t-hWsUYR66uspDItCdbdDrt4"><code>human_msg = HumanMessage(
content="Hello!",
name="alice", # Optional: identify different users
id="msg_123", # Optional: unique identifier for tracing
)</code></pre>

<p id="t-4itBMv5vpRSOiGMQ76OHhO"><span>name</span><span> 字段的行为因提供商而异 - 有些将其用于用户识别，有些则忽略它。</span></p>


<a id="section-0696"></a>
## AI 消息

<a id="t-7ti3Wy7y44YqDog8f2cgeb"></a>

<p id="t-BaFjlcGgZjbKbFv7IZKQnb"><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">AIMessage</span><span style="background-color:transparent">代表模型调用的输出。它们可以包含多模态数据、工具调用以及稍后可以访问的特定于提供商的元数据。</span></p>

<pre id="t-DncXTrfuh3XPmTj0ICRdkj"><code>response = model.invoke("Explain AI")
print(type(response)) # &lt;class 'langchain.messages.AIMessage'&gt;</code></pre>

<p id="t-79NNLf1AWlfOMHOPOgA2uF"><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">AIMessage</span><span style="background-color:transparent">对象在调用模型时由模型返回，其中包含响应中的所有关联元数据。</span></p>

<p id="t-5TfQJVXnlLn2v5zYOi3WtH"><span style="background-color:transparent">提供商对不同类型消息的权重/上下文处理方式不同，这意味着有时手动创建一个新的</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">AIMessage</span><span style="background-color:transparent">对象并将其插入到消息历史中，就好像它来自模型一样，会很有帮助。</span></p>

<pre id="t-dn2YD1qP75qoQlpiOzH7W7"><code>from langchain.messages import AIMessage, SystemMessage, HumanMessage

# Create an AI message manually (e.g., for conversation history)
ai_msg = AIMessage("I'd be happy to help you with that question!")

# Add to conversation history
messages = [
SystemMessage("You are a helpful assistant"),
HumanMessage("Can you help me?"),
ai_msg, # Insert as if it came from the model
HumanMessage("Great! What's 2+2?")
]

response = model.invoke(messages)</code></pre>

<p id="t-3fllADOMJJMUFpis5pQZqR"><span style="font-weight:bold">属性</span></p>

<div id="t-TtC85aGdOiuv3MdqrYrsgn"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/2639bfd32ed9332dd47ef3aa.png"/></div>

<a id="t-K3MAhivrgv9RHFaz456W9o"></a>

##### 工具调用

<p id="t-DxcpOhLgJMdXHs6awjDdmg"><span style="background-color:transparent">当模型进行</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">工具调用</span><span style="background-color:transparent">时，它们会包含在 </span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">AIMessage</span><span style="background-color:transparent"> 中：</span></p>

<pre id="t-aYK0CzQa6NyfxetwCLDFXE"><code>from langchain.chat_models import init_chat_model

model = init_chat_model("gpt-5-nano")

def get_weather(location: str) -&gt; str:
"""Get the weather at a location."""
...

model_with_tools = model.bind_tools([get_weather])
response = model_with_tools.invoke("What's the weather in Paris?")

for tool_call in response.tool_calls:
print(f"Tool: {tool_call['name']}")
print(f"Args: {tool_call['args']}")
print(f"ID: {tool_call['id']}")</code></pre>

<p id="t-eiATZmse0aROp5TH9ZVMFa"><span style="background-color:transparent">其他结构化数据，例如推理或引用，也可能出现在消息</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">内容</span><span style="background-color:transparent">中。</span></p>

<a id="t-eyiZcQPYtTp25i9GuW2Yoo"></a>

##### 令牌使用情况

<p id="t-nEI3QEhmVziMl3saE3g2fk"><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">AIMessage</span><span style="background-color:transparent">可以在其</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">usage_metadata</span><span style="background-color:transparent">字段中保存令牌计数和其他使用元数据：</span></p>

<pre id="t-TijdjV9Njdgqhxuq3SwEzc"><code>from langchain.chat_models import init_chat_model

model = init_chat_model("gpt-5-nano")

response = model.invoke("Hello!")
response.usage_metadata</code></pre>

<pre id="t-S6pmYSYsb18pSd8Bug32ui"><code>{'input_tokens': 8,
'output_tokens': 304,
'total_tokens': 312,
'input_token_details': {'audio': 0, 'cache_read': 0},
'output_token_details': {'audio': 0, 'reasoning': 256}}</code></pre>

<p id="t-PpLBoIbfAuxsW5snadqtPn"><span style="background-color:transparent">详情请参见</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">UsageMetadata</span><span style="background-color:transparent">。</span></p>

<a id="t-n5uyy25LXnMrwRVs93BtSt"></a>

##### 流式传输和分块

<p id="t-ym4sFFrqVrCjEh8ANZMfiE"><span style="background-color:transparent">在流式传输期间，您将收到可以组合成完整消息对象的</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">AIMessageChunk</span><span style="background-color:transparent">对象：</span></p>

<pre id="t-BdZT8pGyc7M1SGzLSuFpGz"><code>chunks = []
full_message = None
for chunk in model.stream("Hi"):
chunks.append(chunk)
print(chunk.text)
full_message = chunk if full_message is None else full_message + chunk</code></pre>


<a id="section-0697"></a>
## 工具消息

<a id="t-oe9IMR6q1kUxgF3ksNZ6K9"></a>

<p id="t-MhW0DpqBdJ3mAzXKR4OIWn"><span style="background-color:transparent">对于支持</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">工具调用</span><span style="background-color:transparent">的模型，AI 消息可以包含工具调用。工具消息用于将单个工具执行的结果传递回模型。</span></p>

<p id="t-3Jzu5vdU7mqJygyl7GELwt"><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">工具</span><span style="background-color:transparent">可以直接生成 </span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">ToolMessage</span><span style="background-color:transparent"> 对象。下面，我们展示一个简单的例子。</span></p>

<pre id="t-hDP0it3cdMD9UUFStpMw1q"><code>from langchain.messages import AIMessage
from langchain.messages import ToolMessage

# After a model makes a tool call
# (Here, we demonstrate manually creating the messages for brevity)
ai_message = AIMessage(
content=[],
tool_calls=[{
"name": "get_weather",
"args": {"location": "San Francisco"},
"id": "call_123"
}]
)

# Execute tool and create result message
weather_result = "Sunny, 72°F"
tool_message = ToolMessage(
content=weather_result,
tool_call_id="call_123" # Must match the call ID
)

# Continue conversation
messages = [
HumanMessage("What's the weather in San Francisco?"),
ai_message, # Model's tool call
tool_message, # Tool execution result
]
response = model.invoke(messages) # Model processes the result</code></pre>

<p id="t-OZpzNQ52Z5jUmrCdIaE3s4"><span style="font-weight:bold">属性</span></p>

<div id="t-IysYvoONMIFTGSy7236HvB"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/71f6c0c8fa4d38e7c4f4bedf.png"/></div>

<p id="t-K6WYRC69xK2849DIxPI7pm"><span>artifact</span><span> 字段存储不会发送给模型但可以通过编程方式访问的补充数据。这对于存储原始结果、调试信息或用于下游处理的数据非常有用，而不会使模型的上下文变得混乱。</span></p>

<p id="t-u5YozHyRrpg8iwOI3r0YNX"><span style="font-weight:bold">示例：使用artifact存储检索元数据</span></p>

<p id="t-jystZYTNSjgFIjOP4UNx4K"><span>例如，一个</span><span style="border-bottom:1px solid;font-weight:bold">检索</span><span>工具可以检索文档中的一段文本供模型参考。消息 </span><span>content</span><span> 包含模型将引用的文本，而 </span><span>artifact</span><span> 可以包含文档标识符或其他应用程序可以使用的元数据（例如，用于渲染页面）。参见下面的示例：</span></p>

<pre id="t-eyht3r7CtQRvkrdhsBtjXc"><code>from langchain.messages import ToolMessage

# Sent to model
message_content = "It was the best of times, it was the worst of times."

# Artifact available downstream
artifact = {"document_id": "doc_123", "page": 0}

tool_message = ToolMessage(
content=message_content,
tool_call_id="call_123",
name="search_books",
artifact=artifact,
)</code></pre>


<a id="section-0698"></a>
## 消息内容

<a id="t-AYhe1IzCV5SMowetlVtr0U"></a>

<p id="t-bIhYemOVVLsRsMQTyB4ibT"><span style="background-color:transparent">您可以将消息的内容视为发送给模型的数据负载。消息有一个 </span><span style="background-color:transparent">content</span><span style="background-color:transparent"> 属性，它是松散类型的，支持字符串和无类型对象（例如字典）的列表。这允许在 LangChain 聊天模型中直接支持提供商原生结构，例如</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">多模态</span><span style="background-color:transparent">内容和其他数据。</span></p>

<p id="t-MxxhGD9qgbvhIVY1xFNHVi"><span style="background-color:transparent">另外，LangChain 为文本、推理、引用、多模态数据、服务器端工具调用和其他消息内容提供了专用的内容类型。</span></p>

<p id="t-NHRfwETFZAtCSU1s3pS5Y3"><span style="background-color:transparent">LangChain 聊天模型接受</span><span style="background-color:transparent">content</span><span style="background-color:transparent">属性中的消息内容。</span></p>

<p id="t-5wdTPVxyQHc4mQU56wJ0Pw"><span style="background-color:transparent">这可能包含：</span></p>

<ol start="1"><li id="t-vIVJqYRvLiKymMGK1fy5ag"><span>一个字符串</span></li></ol>

<ol start="2"><li id="t-oTYpSpEZeTD8duTMTfi0hg"><span>提供商原生格式的内容块列表</span></li></ol>

<ol start="3"><li id="t-q49Z9KOxBYd1VoAO8BlWHu"><span style="border-bottom:1px solid;font-weight:bold">LangChain 标准内容块</span><span>列表</span></li></ol>

<p id="t-5R8MwMaAvHnIEALVyC67n7"><span style="background-color:transparent">请参见下面使用</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">多模态</span><span style="background-color:transparent">输入的示例：</span></p>

<pre id="t-qptKpU4wc8tSoLUt5Yltt6"><code>from langchain.messages import HumanMessage

# String content
human_message = HumanMessage("Hello, how are you?")

# Provider-native format (e.g., OpenAI)
human_message = HumanMessage(content=[
{"type": "text", "text": "Hello, how are you?"},
{"type": "image_url", "image_url": {"url": "https://example.com/image.jpg"}}
])

# List of standard content blocks
human_message = HumanMessage(content_blocks=[
{"type": "text", "text": "Hello, how are you?"},
{"type": "image", "url": "https://example.com/image.jpg"},
])</code></pre>

<blockquote id="t-w2znJM17gVzUbpy1Hg0H7y"><p id="t-UbpCyx4ouX3h7mviwxY2i2"><span>在初始化消息时指定</span><span>content_blocks</span><span>仍将填充消息的</span><span>content</span><span>，但为此提供了一个类型安全的接口。</span></p></blockquote>


<a id="section-0699"></a>
## 标准内容块

<a id="t-SRTUpIq7rcMQKIITLOdjt4"></a>

<p id="t-A8QUmMBUizgIQmuLwwC0if"><span style="background-color:transparent">LangChain 提供了一个适用于所有提供商的消息内容标准表示。</span></p>

<p id="t-gW1lvHlViFTJ3sAirDQ7BG"><span style="background-color:transparent">消息对象实现了一个 </span><span style="background-color:transparent">content_blocks</span><span style="background-color:transparent"> 属性，该属性将惰性地将 </span><span style="background-color:transparent">content</span><span style="background-color:transparent"> 属性解析为标准化的、类型安全的表示。例如，从 </span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">ChatAnthropic</span><span style="background-color:transparent"> 或 </span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">ChatOpenAI</span><span style="background-color:transparent"> 生成的消息将包含各自提供商格式的 </span><span style="background-color:transparent">thinking</span><span style="background-color:transparent"> 或 </span><span style="background-color:transparent">reasoning</span><span style="background-color:transparent"> 块，但可以惰性地解析为一致的 </span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">ReasoningContentBlock</span><span style="background-color:transparent"> 表示：</span></p>

<pre id="t-srA2TQA64ioF3wqKko8cF6"><code>from langchain.messages import AIMessage

message = AIMessage(
content=[
{"type": "thinking", "thinking": "...", "signature": "WaUjzkyp..."},
{"type": "text", "text": "..."},
],
response_metadata={"model_provider": "anthropic"}
)
message.content_blocks</code></pre>

<pre id="t-GjNFeXZzOfGmjBXhPN2sUa"><code>[{'type': 'reasoning',
'reasoning': '...',
'extras': {'signature': 'WaUjzkyp...'}},
{'type': 'text', 'text': '...'}]</code></pre>

<blockquote id="t-0HED9566QBI1RIPskIq39K"><p id="t-oihRYQSfhS4PXBGvEq1ghR"><span style="font-weight:bold">序列化标准内容</span></p>
<p id="t-gLDw4ET2RgpvnQ0wKP0xSc"><span>如果 LangChain 之外的应用程序需要访问标准内容块表示，您可以选择将内容块存储在消息内容中。</span></p>
<p id="t-a3myQU1Rclk1djLsLeChkr"><span>为此，您可以将 </span><span>LC_OUTPUT_VERSION</span><span> 环境变量设置为 </span><span>v1</span><span>。或者，使用 </span><span>output_version="v1"</span><span> 初始化任何聊天模型：</span></p></blockquote>

<pre id="t-t3TrUmBAc6CuX8PvihEdjM"><code>from langchain.chat_models import init_chat_model
model = init_chat_model("gpt-5-nano", output_version="v1")</code></pre>


<a id="section-0700"></a>
## 多模态

<a id="t-E9wx3AAjSp5ziDutFlhXhE"></a>

<p id="t-JujQBT7RaEHdGyy22pp0xs"><span style="font-weight:bold;background-color:transparent">多模态</span><span style="background-color:transparent">指的是处理不同形式数据的能力，例如文本、音频、图像和视频。LangChain 包含了可用于所有提供商的这些数据的标准类型。</span></p>

<p id="t-AiGysEnfstFIqgxYkiOVOp"><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">聊天模型</span><span style="background-color:transparent">可以接受多模态数据作为输入并生成多模态数据作为输出。下面我们展示包含多模态数据的输入消息的简短示例。</span></p>

<blockquote id="t-NqO0YJiup63VRgDXyEsl4O"><p id="t-HBUlR69VWkfmNOEJIIPjQw"><span>额外的键可以包含在内容块的顶层或嵌套在 </span><span>"extras": {"key": value}</span><span> 中。</span></p>
<p id="t-QYzyUC97w7BOFvL2YMSQhH"><span>例如，</span><span style="border-bottom:1px solid;font-weight:bold">OpenAI</span><span> 和 </span><span style="border-bottom:1px solid;font-weight:bold">AWS Bedrock Converse</span><span> 要求 PDF 文件具有文件名。</span></p></blockquote>

<pre id="t-fpWGGZpW3OUZPEZarq734b"><code># From URL
message = {
"role": "user",
"content": [
{"type": "text", "text": "Describe the content of this image."},
{"type": "image", "url": "https://example.com/path/to/image.jpg"},
]
}

# From base64 data
message = {
"role": "user",
"content": [
{"type": "text", "text": "Describe the content of this image."},
{
"type": "image",
"base64": "AAAAIGZ0eXBtcDQyAAAAAGlzb21tcDQyAAACAGlzb2...",
"mime_type": "image/jpeg",
},
]
}

# From provider-managed File ID
message = {
"role": "user",
"content": [
{"type": "text", "text": "Describe the content of this image."},
{"type": "image", "file_id": "file-abc123"},
]
}</code></pre>

<blockquote id="t-2MfrcjVmNCSjCuPcY9BbFd"><p id="t-NRHwzqNLWYlooORq9A1vvm"><span>并非所有模型都支持所有文件类型。请检查模型提供商的</span><span style="border-bottom:1px solid;font-weight:bold">参考文档</span><span>以了解支持的格式和大小限制。</span></p></blockquote>


<a id="section-0701"></a>
## 内容块参考

<a id="t-Chkou78dUPCBhVDpofz1pn"></a>

<p id="t-P3B7JH3bUUzMktoD6OK4U4"><span style="background-color:transparent">内容块被表示（无论是在创建消息时还是访问 </span><span style="background-color:transparent">content_blocks</span><span style="background-color:transparent"> 属性时）为类型化字典的列表。列表中的每个项目必须符合以下块类型之一：</span></p>

<p id="t-TUkB0OftC4vcn0sufFuawZ"><span style="font-weight:bold">核心</span></p>

<div id="t-PnGroUeJ94unEfI5tEQgLc"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/1a9ce055a9f2c1b24832562a.png"/></div>

<p id="t-ubELFhrcu08COqFAXUs9x4"><span style="font-weight:bold">示例：</span></p>

<pre id="t-HVtH3AwUvxMBGLONxsnetH"><code>{
"type": "text",
"text": "Hello world",
"annotations": []
}</code></pre>

<div id="t-jESjqVG7prNf1movZWTvT6"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/b8ded754496ddcaba5348828.png"/></div>

<p id="t-d5LHGDLrEL12hH2FdBkMzP"><span style="font-weight:bold">示例：</span></p>

<pre id="t-d1gSbOGtjpc0h6P2hqwrgB"><code>{
"type": "reasoning",
"reasoning": "The user is asking about...",
"extras": {"signature": "abc123"},
}</code></pre>

<blockquote id="t-pO3O4P98MuJ8F6OD01SRuT"><p id="t-ruqGlzOSLz94ET6D2Y3M0i"><span style="font-weight:bold">多模态</span></p></blockquote>

<div id="t-FyHkRu2skwqyGhmXDFlHuK"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/8ecf27ee1cefd1d9d468e369.png"/></div>

<div id="t-CiUCahZ0QvRsJysKPCSDdU"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/fcaa262933c93098518be01f.png"/></div>

<div id="t-5xGO6Zk8AwsEHEhUmOPRWq"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/efdfdc69017cb57d1ff1880c.png"/></div>

<p id="t-BQGiElIni1JBPPz9vgeDh1"><span style="font-weight:bold">用途：</span><span>图像数据</span></p>

<p id="t-mhZzU6MmY0sLmLrGsHp0uq"><span style="font-weight:bold">type</span><span>string</span><span style="font-weight:bold">required</span></p>

<p id="t-fbgLN9VLIxDtQ11fB98U5n"><span>始终为</span><span>"image"</span></p>

<p id="t-oLhomC7OeFrCxMieibNJq1"><span style="font-weight:bold">url</span><span>string</span></p>

<p id="t-v9kLBBuRjcYcWFyPNYHGLj"><span>指向图像位置的 URL。</span></p>

<p id="t-GEGlNfhKeJ6ZG1S272ddlz"><span style="font-weight:bold">base64</span><span>string</span></p>

<p id="t-u5IUETeUN7acS3624jGR0E"><span>Base64 编码的图像数据。</span></p>

<p id="t-27H3ETZ5g2pxZ6HIYHLvFO"><span style="font-weight:bold">id</span><span>string</span></p>

<p id="t-F9P9DiQR0Kh29wdzOcWwml"><span>此内容块的唯一标识符（由提供商或 LangChain 生成）。</span></p>

<p id="t-dygfZ9WwXERWDlfITIPLZt"><span style="font-weight:bold">mime_type</span><span>string</span></p>

<p id="t-UBg92hn1ytUaldKdj9rjyy"><span>图像 </span><span style="border-bottom:1px solid;font-weight:bold">MIME 类型</span><span>（例如，</span><span>image/jpeg</span><span>、</span><span>image/png</span><span>）。对于 base64 数据是必需的。</span></p>

<p id="t-ZYn2OxT6zMNnqB51TQ6XVQ"><span style="font-weight:bold">用途：</span><span>音频数据</span></p>

<p id="t-1qAOEDXGb0DMMCvdiyROo3"><span style="font-weight:bold">type</span><span>string</span><span style="font-weight:bold">required</span></p>

<p id="t-JMqzqmSZ6IxQGU4qrZHDXx"><span>始终为</span><span>"audio"</span></p>

<p id="t-o9dmeBiidxKIBRdh1jd3Of"><span style="font-weight:bold">url</span><span>string</span></p>

<p id="t-Rkn6hT47gGNogh1MwR49Xo"><span>指向音频位置的 URL。</span></p>

<p id="t-vvA7jd5pzg8pPx9dQl1g33"><span style="font-weight:bold">base64</span><span>string</span></p>

<p id="t-mnjm0ucfWPoxI2MWGVYhSM"><span>Base64 编码的音频数据。</span></p>

<p id="t-BmGF69RSOInrjLMaV2u04S"><span style="font-weight:bold">id</span><span>string</span></p>

<p id="t-t9yseiljsFT4y4a2esRbcU"><span>此内容块的唯一标识符（由提供商或 LangChain 生成）。</span></p>

<p id="t-1KfbYzYDgNDOV0IvMbcpT8"><span style="font-weight:bold">mime_type</span><span>string</span></p>

<p id="t-WfzQMYSEXsRIySXLpEFiS8"><span>音频 </span><span style="border-bottom:1px solid;font-weight:bold">MIME 类型</span><span>（例如，</span><span>audio/mpeg</span><span>、</span><span>audio/wav</span><span>）。对于 base64 数据是必需的。</span></p>

<p id="t-tcLpP6H2JJjfz7v8tN4XB1"><span style="font-weight:bold">用途：</span><span>视频数据</span></p>

<p id="t-hjAKF8G8M690SblGGPZktw"><span style="font-weight:bold">type</span><span>string</span><span style="font-weight:bold">required</span></p>

<p id="t-riwL0LM8zIGLp1l10jgt0J"><span>始终为</span><span>"video"</span></p>

<p id="t-i6U94F6CRY8QAn0PP0wGGw"><span style="font-weight:bold">url</span><span>string</span></p>

<p id="t-IEzRMY3iuh8VrSf43l0VXg"><span>指向视频位置的 URL。</span></p>

<p id="t-5axW8ifoxGX9RdQh0s41cG"><span style="font-weight:bold">base64</span><span>string</span></p>

<p id="t-SE6hjh9ecA8kBWf1lLGDPg"><span>Base64 编码的视频数据。</span></p>

<p id="t-kh1JPPX3z8pnYnyjLE5U9M"><span style="font-weight:bold">id</span><span>string</span></p>

<p id="t-k38KoIhS1xKifHtt8ymnWV"><span>此内容块的唯一标识符（由提供商或 LangChain 生成）。</span></p>

<p id="t-2AvIMcunCxHRwBlsATyZk8"><span style="font-weight:bold">mime_type</span><span>string</span></p>

<p id="t-NIYeZ2luaC54oZcCjcT0gf"><span>视频 </span><span style="border-bottom:1px solid;font-weight:bold">MIME 类型</span><span>（例如，</span><span>video/mp4</span><span>、</span><span>video/webm</span><span>）。对于 base64 数据是必需的。</span></p>

<p id="t-QGf4HJiAng7y0kozqFp7P9"><span style="font-weight:bold">用途：</span><span>通用文件（PDF 等）</span></p>

<p id="t-qgHZhTvf6qXMW0xfIJSqB8"><span style="font-weight:bold">type</span><span>string</span><span style="font-weight:bold">required</span></p>

<p id="t-Kue54lhD0t0DNfvVyfiIyv"><span>始终为</span><span>"file"</span></p>

<p id="t-wyUxg920lGDnPrnvdKObM4"><span style="font-weight:bold">url</span><span>string</span></p>

<p id="t-6wlX2rdurJzoQMIjtC9y7p"><span>指向文件位置的 URL。</span></p>

<p id="t-lSgrsn2oFpoRFTqi1r46G3"><span style="font-weight:bold">base64</span><span>string</span></p>

<p id="t-Qu1ZNbEzvzFqTGM0J2ogsP"><span>Base64 编码的文件数据。</span></p>

<p id="t-w03Q7IxNq0uDaeFz3nNvnl"><span style="font-weight:bold">id</span><span>string</span></p>

<p id="t-0k2EqDPsbWPzxYHc57XbCZ"><span>此内容块的唯一标识符（由提供商或 LangChain 生成）。</span></p>

<p id="t-8TRaYMnQl2PFIkVnM4rZkR"><span style="font-weight:bold">mime_type</span><span>string</span></p>

<p id="t-urjxZ5OHOKCg4RPmP1W5cn"><span>文件 </span><span style="border-bottom:1px solid;font-weight:bold">MIME 类型</span><span>（例如，</span><span>application/pdf</span><span>）。对于 base64 数据是必需的。</span></p>

<p id="t-gmBopnbTeIz4DhDNWuORAh"><span style="font-weight:bold">用途：</span><span>文档文本（</span><span>.txt</span><span>、</span><span>.md</span><span>）</span></p>

<p id="t-XHEddIKPcoW5nt325eU914"><span style="font-weight:bold">type</span><span>string</span><span style="font-weight:bold">required</span></p>

<p id="t-mLfQAm6Y2S4cC71SWceK00"><span>始终为</span><span>"text-plain"</span></p>

<p id="t-2NKhgKW4PPXJYT74RmR4X4"><span style="font-weight:bold">text</span><span>string</span></p>

<p id="t-pK7X93bXrkFgABOM9i6CTj"><span>文本内容</span></p>

<p id="t-ShIktNPNQfImMkAAYEsYpw"><span style="font-weight:bold">mime_type</span><span>string</span></p>

<p id="t-NKOhlkoFJVM0P8EU5ih1nB"><span>文本的 </span><span style="border-bottom:1px solid;font-weight:bold">MIME 类型</span><span>（例如，</span><span>text/plain</span><span>、</span><span>text/markdown</span><span>）</span></p>

<p id="t-WBiuMVqzZNAPbZ2T2iS44w"><span style="font-weight:bold">用途：</span><span>函数调用</span></p>

<p id="t-STFJaqLZ8RR3DTpwDM16gj"><span style="font-weight:bold">type</span><span>string</span><span style="font-weight:bold">required</span></p>

<p id="t-mkij2DEMbdbkIeNlH7geyC"><span>始终为</span><span>"tool_call"</span></p>

<p id="t-Y672dMqquTAd6lr5I6F21X"><span style="font-weight:bold">name</span><span>string</span><span style="font-weight:bold">required</span></p>

<p id="t-dTRciDhLZOMYyOKvF4tBb9"><span>要调用的工具名称</span></p>

<p id="t-ob3vVz3UZfFD2xpPNyrLBw"><span style="font-weight:bold">args</span><span>object</span><span style="font-weight:bold">required</span></p>

<p id="t-auxC96FERmW0ZXOSnnk4Y4"><span>传递给工具的参数</span></p>

<p id="t-PUll6bxucPKWehtEua06De"><span style="font-weight:bold">id</span><span>string</span><span style="font-weight:bold">required</span></p>

<p id="t-uSoTUcMxgqWfeye1qYMt5G"><span>此工具调用的唯一标识符</span></p>

<p id="t-VOq576yJhgcNyNvz6kFYhq"><span style="font-weight:bold">示例：</span></p>

<pre id="t-easXiqmHG4g4S9YNHnbNt7"><code>{
"type": "tool_call",
"name": "search",
"args": {"query": "weather"},
"id": "call_123"
}</code></pre>

<p id="t-RoDWC1wz2edskvTYdm5lmw"><span style="font-weight:bold">用途：</span><span>流式工具调用片段</span></p>

<p id="t-DZ7FTwgdTyrLnQt0FGJ9v6"><span style="font-weight:bold">type</span><span>string</span><span style="font-weight:bold">required</span></p>

<p id="t-J9E1FQG2IPSSaZ8c21zZBL"><span>始终为</span><span>"tool_call_chunk"</span></p>

<p id="t-6mD44ojvzT3fRfqHqGuhpk"><span style="font-weight:bold">name</span><span>string</span></p>

<p id="t-PsiznOmu4264Le5y0H7nen"><span>被调用工具的名称</span></p>

<p id="t-Lq8alY612O5lxtSoYmYI2w"><span style="font-weight:bold">args</span><span>string</span></p>

<p id="t-B4Ez8bGwgatfoslaPZYkS5"><span>部分工具参数（可能是不完整的 JSON）</span></p>

<p id="t-h66rVJvdb8Z6yWtUtfTWCj"><span style="font-weight:bold">id</span><span>string</span></p>

<p id="t-AxSwhQtqeUUkzA1RI2w1LY"><span>工具调用标识符</span></p>

<p id="t-eYQmYrOxyxlY596Z5vCjhj"><span style="font-weight:bold">index</span><span>number | string</span></p>

<p id="t-v8f1PKQmmRLvhjRdFLDZP3"><span>此片段在流中的位置</span></p>

<p id="t-QXBOTPy2MZnQfgqucY3E6A"><span style="font-weight:bold">用途：</span><span>格式错误的调用，旨在捕获 JSON 解析错误。</span></p>

<p id="t-pTx48Inhg9fofHIHTvfG7T"><span style="font-weight:bold">type</span><span>string</span><span style="font-weight:bold">required</span></p>

<p id="t-lVNvtOgW3o3fIQg7vytpLL"><span>始终为</span><span>"invalid_tool_call"</span></p>

<p id="t-xR5SkcMYzBWxkSTKpVN6Vu"><span style="font-weight:bold">name</span><span>string</span></p>

<p id="t-IdSX5lgijNW4UAag0AIRYM"><span>调用失败的工具名称</span></p>

<p id="t-DFgcXXqlUGfpWfc7zAZAhq"><span style="font-weight:bold">args</span><span>object</span></p>

<p id="t-7JkiBYtEFvp3xbYxHlCXA4"><span>传递给工具的参数</span></p>

<p id="t-aDPFGvVTCVwUddgvgzotRM"><span style="font-weight:bold">error</span><span>string</span></p>

<p id="t-Lt6hHimGwIP6HJhQ46MwtK"><span>错误描述</span></p>

<p id="t-3wOSk7aTjvpMAhJLsnKHRg"><span style="font-weight:bold">用途：</span><span>在服务器端执行的工具调用。</span></p>

<p id="t-6IAdT1Z6F7U6ZPfVD0y9KR"><span style="font-weight:bold">type</span><span>string</span><span style="font-weight:bold">required</span></p>

<p id="t-BMMnB99UYb8rijOmFHVkpr"><span>始终为</span><span>"server_tool_call"</span></p>

<p id="t-Wn8jsBMKnBelGFDhDNIMDW"><span style="font-weight:bold">id</span><span>string</span><span style="font-weight:bold">required</span></p>

<p id="t-CJmcX2LxYFxwX9MEUKQFKG"><span>与工具调用关联的标识符。</span></p>

<p id="t-SXj3FszWAF2hOcOn7FP7R5"><span style="font-weight:bold">name</span><span>string</span><span style="font-weight:bold">required</span></p>

<p id="t-qqRqcjjqbIqMkRi12Q0N8Q"><span>要调用的工具名称。</span></p>

<p id="t-vgSWzWVcwYBq9DB2LC8gZR"><span style="font-weight:bold">args</span><span>string</span><span style="font-weight:bold">required</span></p>

<p id="t-yAEQqxdEJG4oJuQYEDoc2v"><span>部分工具参数（可能是不完整的 JSON）</span></p>

<p id="t-OyusLo6oxBJXSeulcsaj4q"><span style="font-weight:bold">用途：</span><span>流式服务器端工具调用片段</span></p>

<p id="t-7iEWiO5yfy5rlHtUHKFGA7"><span style="font-weight:bold">type</span><span>string</span><span style="font-weight:bold">required</span></p>

<p id="t-8YWGVP66VxMqsIP7ZLvY6d"><span>始终为</span><span>"server_tool_call_chunk"</span></p>

<p id="t-KcPcD1pcZmIypUsMmwdof0"><span style="font-weight:bold">id</span><span>string</span></p>

<p id="t-eHJvcn7qJAtwn1WldLF5pd"><span>与工具调用关联的标识符。</span></p>

<p id="t-DVUsRUswIyH5ebHUHOr580"><span style="font-weight:bold">name</span><span>string</span></p>

<p id="t-yecNTUfFt5MriKguOjZwYn"><span>被调用工具的名称</span></p>

<p id="t-eyiFrCAJlqq7aq0H7e8aPY"><span style="font-weight:bold">args</span><span>string</span></p>

<p id="t-qTMUVIxYNPhcb5qp6WvGs0"><span>部分工具参数（可能是不完整的 JSON）</span></p>

<p id="t-Rs08tBL4WoOGha6BkDSXJT"><span style="font-weight:bold">index</span><span>number | string</span></p>

<p id="t-SOsmbt3kMQ97ITmgSBUWYH"><span>此片段在流中的位置</span></p>

<p id="t-Xixx0r9E5nVbtt8XCw7qPH"><span style="font-weight:bold">用途：</span><span>搜索结果</span></p>

<p id="t-igoevBh9TguIEk1eKMWzJg"><span style="font-weight:bold">type</span><span>string</span><span style="font-weight:bold">required</span></p>

<p id="t-6NtoSTSntsn2XW7dXvfDep"><span>始终为</span><span>"server_tool_result"</span></p>

<p id="t-I0ctUm4G7Spqke7tN69VFG"><span style="font-weight:bold">tool_call_id</span><span>string</span><span style="font-weight:bold">required</span></p>

<p id="t-Lp0LnpzihuWEXuCYBzve2K"><span>对应服务器工具调用的标识符。</span></p>

<p id="t-UcIwAOoZQpQ9LRZogqhtSg"><span style="font-weight:bold">id</span><span>string</span></p>

<p id="t-Y22lVjhmL8JP03oKf7q8U0"><span>与服务器工具结果关联的标识符。</span></p>

<p id="t-TrlMCOGophhs4u4EIEMrXO"><span style="font-weight:bold">status</span><span>string</span><span style="font-weight:bold">required</span></p>

<p id="t-PZOHtRq5GeWw3T6ssUbnJB"><span>服务器端工具的执行状态。</span><span>"success"</span><span>或</span><span>"error"</span><span>。</span></p>

<p id="t-9o4ryQppTNDgu485nzw1W0"><span style="font-weight:bold">output</span></p>

<p id="t-1yEmnu67QpjTy5Z3vBAlc5"><span>已执行工具的输出。</span></p>

<p id="t-pY69lc3o4haSZwZubLfleu"><span style="font-weight:bold">用途：</span><span>提供商特定的逃生舱口</span></p>

<p id="t-3K3v0SPz2ZBl9GbKwsr1kU"><span style="font-weight:bold">type</span><span>string</span><span style="font-weight:bold">required</span></p>

<p id="t-kPbiPU21cukurgsHIcDNXC"><span>始终为</span><span>"non_standard"</span></p>

<p id="t-ICtAvA0S3UIkpRRmAREfEx"><span style="font-weight:bold">value</span><span>object</span><span style="font-weight:bold">required</span></p>

<p id="t-EFzWPbQPpyL2fayRq0aAPB"><span>提供商特定的数据结构</span></p>

<p id="t-aKCtvA5k2tWLnEdbQAwff9"><span style="font-weight:bold">用法：</span><span>用于实验性或提供商独有的功能</span></p>

<p id="t-5ox9umXE6rwYMhlu4vLu75"><span>额外的提供商特定内容类型可以在每个模型提供商的</span><span style="border-bottom:1px solid;font-weight:bold">参考文档</span><span>中找到。</span></p>

<blockquote id="t-V5DLt6FSrvLljonS39hTJa"><p id="t-fhSb6KcWVPMfRIr3FoNSyh"><span>请在 </span><span style="border-bottom:1px solid;font-weight:bold">API 参考</span><span> 中查看规范的类型定义。</span></p></blockquote>

<blockquote id="t-h4h9nC1BfRM17NxqS74SSs"><img alt="" decoding="async" height="20" loading="lazy" src="/images/agent-learning/adc2dd4d08bf27fd97397504.svg" width="20"/><p id="t-iiEQeIifUMC3swfNAciHFC"><span>内容块是 LangChain v1 中作为消息的新属性引入的，旨在跨供应商标准化内容格式，同时保持与现有代码的向后兼容性。</span></p>
<p id="t-apdVvyMSRqMYyIcz6IyVhI"><span>内容块不是</span><span style="border-bottom:1px solid;font-weight:bold">content</span><span>属性的替代品，而是一个新的属性，可用于以标准化格式访问消息的内容。</span></p></blockquote>


<a id="section-0702"></a>
## 与聊天模型一起使用

<a id="t-Qd3sUabjV7TcabukDmqACY"></a>

<p id="t-v3T7820wEbZmhslVqHAIGJ"><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">聊天模型</span><span style="background-color:transparent"> 接受一系列消息对象作为输入，并返回一个 </span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">AIMessage</span><span style="background-color:transparent"> 作为输出。交互通常是无状态的，因此一个简单的对话循环涉及使用不断增长的消息列表来调用模型。</span></p>

<p id="t-59OoTAICfut3lzBJcmiS7W"><span style="background-color:transparent">请参考以下指南了解更多信息：</span></p>

<ul><li id="t-BaaLRt3aXIr9RoymR5dVh0"><span>用于</span><span style="border-bottom:1px solid;font-weight:bold">持久化和管理对话历史记录</span><span>的内置功能</span></li></ul>

<ul><li id="t-Hc6VFrkVt5g4Jq34VjyncQ"><span>管理上下文窗口的策略，包括</span><span style="border-bottom:1px solid;font-weight:bold">修剪和总结消息</span></li></ul>


<a id="section-0703"></a>
## 工具 (Tools)

<a id="t-block-16513"></a>

<p id="t-mjwCNQlCuOcxzTgHwISMZd"><span style="background-color:transparent">工具扩展了</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">智能体 (agents)</span><span style="background-color:transparent">的能力——让它们能够获取实时数据、执行代码、查询外部数据库，并在现实世界中采取行动。</span></p>

<p id="t-7OMMb936bmKO1cZ1QRfMHs"><span style="background-color:transparent">在底层，工具是具有明确定义输入和输出的可调用函数，它们会被传递给</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">聊天模型 (chat model)</span><span style="background-color:transparent">。模型根据对话上下文决定何时调用工具，以及提供哪些输入参数。</span></p>


<a id="section-0705"></a>
## 基础工具定义 (Basic tool definition)

<a id="t-AcwiRNwHNoDGVwfg93cFJT"></a>

<p id="t-xnxhFyOdmhbi8tBtZu5jfm"><span style="background-color:transparent">创建工具最简单的方法是使用</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">@tool</span><span style="background-color:transparent">装饰器。默认情况下，函数的文档字符串会成为工具的描述，帮助模型理解何时使用它：</span></p>

<pre id="t-vCR1raYB7E2zTKd075dzfm"><code>from langchain.tools import tool

@tool
def search_database(query: str, limit: int = 10) -&gt; str:
"""在客户数据库中搜索与查询匹配的记录。

Args:
query: 要查找的搜索词
limit: 要返回的最大结果数
"""
return f"Found {limit} results for '{query}'"</code></pre>

<p id="t-qcmvNnZvNYw4XzkqSbWUpD"><span style="background-color:transparent">类型提示是</span><span style="font-weight:bold;background-color:transparent">必需的</span><span style="background-color:transparent">，因为它们定义了工具的输入模式 (input schema)。文档字符串应具有信息性且简洁，以帮助模型理解工具的用途。</span></p>

<p id="t-X8e2sHWhSaoiKpiFG2pHHf"><span style="font-weight:bold">服务端工具使用 (Server-side tool use)</span></p>

<p id="t-t3jdkzVBl1cJ2u0T33316L"><span>一些聊天模型（例如 </span><span style="border-bottom:1px solid;font-weight:bold">OpenAI</span><span>、</span><span style="border-bottom:1px solid;font-weight:bold">Anthropic</span><span> 和 </span><span style="border-bottom:1px solid;font-weight:bold">Gemini</span><span>）具有</span><span style="border-bottom:1px solid;font-weight:bold">内置工具 (built-in tools)</span><span>，这些工具在服务端执行，例如网络搜索和代码解释器。</span></p>


<a id="section-0706"></a>
## 自定义工具属性 (Customize tool properties)

<a id="t-3XO3mszKvbYu6lGaWKwHLu"></a>

<a id="t-bySjZ9M3ZjwRUeo00p6GzG"></a>

##### 自定义工具名称 (Custom tool name)

<p id="t-sFB50VkbdjeHGSv7dqHt2w"><span style="background-color:transparent">默认情况下，工具名称来自函数名。当你需要更具描述性的名称时，可以覆盖它：</span></p>

<pre id="t-Y3zPsi1OUl34X2RY6z2SRZ"><code>@tool("web_search") # 自定义名称
def search(query: str) -&gt; str:
"""在网络上搜索信息。"""
return f"Results for: {query}"

print(search.name) # web_search</code></pre>

<a id="t-ApZ65TNGYddrBuCVr5ZDvF"></a>

##### 自定义工具描述 (Custom tool description)

<p id="t-hBVvP7rSHnSdvBD37nR9oM"><span style="background-color:transparent">覆盖自动生成的工具描述，以提供更清晰的模型指导：</span></p>

<pre id="t-4upNCxBZelGahmiydqyUAz"><code>@tool("calculator", description="执行算术计算。对于任何数学问题请使用此工具。")
def calc(expression: str) -&gt; str:
"""评估数学表达式。"""
return str(eval(expression))</code></pre>


<a id="section-0707"></a>
## 高级模式定义 (Advanced schema definition)

<a id="t-pxcqhIENsi7KFgn0Zm2A6j"></a>

<p id="t-GAHjCic532ny4h0Do8WQSJ"><span style="background-color:transparent">使用 Pydantic 模型或 JSON 模式定义复杂输入：</span></p>

<pre id="t-pt1tOzqoivwZ0acrIyxPiS"><code>from pydantic import BaseModel, Field
from typing import Literal

class WeatherInput(BaseModel):
"""天气查询的输入。"""
location: str = Field(description="城市名称或坐标")
units: Literal["celsius", "fahrenheit"] = Field(
default="celsius",
description="温度单位偏好"
)
include_forecast: bool = Field(
default=False,
description="包含 5 天天气预报"
)

@tool(args_schema=WeatherInput)
def get_weather(location: str, units: str = "celsius", include_forecast: bool = False) -&gt; str:
"""获取当前天气和可选的预报。"""
temp = 22 if units == "celsius" else 72
result = f"Current weather in {location}: {temp} degrees {units[0].upper()}"
if include_forecast:
result += "\nNext 5 days: Sunny"
return result</code></pre>


<a id="section-0708"></a>
## 保留参数名 (Reserved argument names)

<a id="t-0b50wVVtOuKU2a38xxTnSJ"></a>

<p id="t-Yr6kMFzTGsuhDzgKj0x2lc"><span style="background-color:transparent">以下参数名是保留的，不能用作工具参数。使用这些名称将导致运行时错误。</span></p>

<div id="t-horCIkq3OjGXff3Z3ZRJ7N"><table><colgroup><col width="255.89926147460935"/><col width="438.89752197265625"/></colgroup><tbody><tr><td><p><span>参数名 (Parameter name)</span></p></td><td><p><span>用途 (Purpose)</span></p></td></tr><tr><td><p><span style="border-bottom:1px solid">config</span></p></td><td><p><span style="border-bottom:1px solid">保留用于在内部向工具传递</span><span style="border-bottom:1px solid">RunnableConfig</span></p></td></tr><tr><td><p><span style="border-bottom:1px solid">runtime</span></p></td><td><p><span style="border-bottom:1px solid">保留用于</span><span style="border-bottom:1px solid">ToolRuntime</span><span style="border-bottom:1px solid">参数（访问状态、上下文、存储）</span></p></td></tr></tbody></table></div>

<p id="t-lWBVQ6aFrQ6Q9lXyklvL6N"><span style="background-color:transparent">要访问运行时信息，请使用</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">ToolRuntime</span><span style="background-color:transparent">参数，而不是将你自己的参数命名为</span><span style="background-color:transparent">config</span><span style="background-color:transparent">或</span><span style="background-color:transparent">runtime</span><span style="background-color:transparent">。</span></p>


<a id="section-0709"></a>
## 访问上下文 (Accessing context)

<a id="t-mzPbZZWC7n34bCUVb2VlB7"></a>

<p id="t-2KLwi84ff41Ba2QAK40KZx"><span style="font-weight:bold">为什么这很重要：</span><span>当工具能够访问智能体状态、运行时上下文和长期记忆时，它们的功能最为强大。这使得工具能够做出上下文感知的决策、个性化响应，并在对话间维护信息。</span></p>

<p id="t-3qM6mXWXkTlgcc8yYxiq5k"><span>运行时上下文提供了一种在运行时将依赖项（如数据库连接、用户 ID 或配置）注入到工具中的方法，使它们更具可测试性和可重用性。</span></p>

<p id="t-SIcGeeyTRz2caKDJe54nLn"><span style="background-color:transparent">工具可以通过</span><span style="background-color:transparent">ToolRuntime</span><span style="background-color:transparent">参数访问运行时信息，该参数提供：</span></p>

<ul><li id="t-xcMwuaN6IjiSedvLaS9nt9"><span style="font-weight:bold">状态 (State)</span><span>- 在执行过程中流动的可变数据（例如消息、计数器、自定义字段）</span></li></ul>

<ul><li id="t-JV1EhnazQYZWAWnN7Lzcej"><span style="font-weight:bold">上下文 (Context)</span><span>- 不可变的配置，如用户 ID、会话详情或特定于应用程序的配置</span></li></ul>

<ul><li id="t-LBxLdf3Sy03VpxqRqp7VG0"><span style="font-weight:bold">存储 (Store)</span><span>- 跨对话的持久长期记忆</span></li></ul>

<ul><li id="t-JZHwoDo3QgJ4aVfIdFeGDh"><span style="font-weight:bold">流写入器 (Stream Writer)</span><span>- 在工具执行时流式传输自定义更新</span></li></ul>

<ul><li id="t-GNNoCBDPNSNEQ372NfjNEX"><span style="font-weight:bold">配置 (Config)</span><span>- 当前执行的</span><span>RunnableConfig</span></li></ul>

<ul><li id="t-JINEP7R2NPKFYQt8rfu5Ol"><span style="font-weight:bold">工具调用 ID (Tool Call ID)</span><span> - 当前工具调用的 ID</span></li></ul>

<div id="t-HxU5tZzyprYsnH4dWkXkAq"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/43b07e985794a9f9a8dd7718.png"/></div>


<a id="section-0710"></a>
## ToolRuntime

<a id="t-yafPRMe014kKvQ0WQEfpPl"></a>

<p id="t-iqdDyh9KBRKjIB41JVh0Nc"><span style="background-color:transparent">使用</span><span style="background-color:transparent">ToolRuntime</span><span style="background-color:transparent">在单个参数中访问所有运行时信息。只需将</span><span style="background-color:transparent">runtime: ToolRuntime</span><span style="background-color:transparent">添加到你的工具签名中，它将被自动注入，而不会暴露给 LLM。</span></p>

<p id="t-uxYDOr5xoJNqAxUBpKRSNZ"><span style="font-weight:bold">ToolRuntime</span><span>：一个统一的参数，为工具提供对状态、上下文、存储、流式传输、配置和工具调用 ID 的访问。这取代了使用单独的</span><span style="border-bottom:1px solid;font-weight:bold">InjectedState</span><span>、</span><span style="border-bottom:1px solid;font-weight:bold">InjectedStore</span><span>、</span><span style="border-bottom:1px solid;font-weight:bold">get_runtime</span><span>和</span><span style="border-bottom:1px solid;font-weight:bold">InjectedToolCallId</span><span>注解的旧模式。</span></p>

<p id="t-ygKg39EUvJv8LIfsGtXJ73"><span>运行时会自动为你的工具函数提供这些能力，而无需你显式传递它们或使用全局状态。</span></p>

<p id="t-EipYX5kYitPkMRMcwWHEbF"><span style="font-weight:bold;background-color:transparent">访问状态 (Accessing state)：</span></p>

<p id="t-hm0nvsSbn87Y5pkYVmYCpB"><span style="background-color:transparent">工具可以使用</span><span style="background-color:transparent">ToolRuntime</span><span style="background-color:transparent">访问当前的图状态：</span></p>

<pre id="t-v0I31IO5IIpwJGL0VcLdDk"><code>from langchain.tools import tool, ToolRuntime

# 访问当前对话状态
@tool
def summarize_conversation(
runtime: ToolRuntime
) -&gt; str:
"""总结到目前为止的对话。"""
messages = runtime.state["messages"]

human_msgs = sum(1 for m in messages if m.__class__.__name__ == "HumanMessage")
ai_msgs = sum(1 for m in messages if m.__class__.__name__ == "AIMessage")
tool_msgs = sum(1 for m in messages if m.__class__.__name__ == "ToolMessage")

return f"Conversation has {human_msgs} user messages, {ai_msgs} AI responses, and {tool_msgs} tool results"

# 访问自定义状态字段
@tool
def get_user_preference(
pref_name: str,
runtime: ToolRuntime  # ToolRuntime 参数对模型不可见
) -&gt; str:
"""获取用户偏好设置的值。"""
preferences = runtime.state.get("user_preferences", {})
return preferences.get(pref_name, "Not set")</code></pre>

<p id="t-9eIpRGtOM8mnnx0rnKZOmX"><span>runtime</span><span>参数对模型是隐藏的。对于上面的示例，模型在工具模式中只能看到</span><span>pref_name</span><span>——</span><span>runtime</span><span style="font-weight:bold">不</span><span>包含在请求中。</span></p>

<p id="t-jm6EBKVqEGaOUMjfSIc8fT"><span style="font-weight:bold;background-color:transparent">更新状态 (Updating state)：</span></p>

<p id="t-JXucqXUxickkSZslD79suW"><span style="background-color:transparent">使用</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">Command</span><span style="background-color:transparent">来更新智能体的状态或控制图的执行流程：</span></p>

<pre id="t-maQppK83DvqwfZX1Rxhy3E"><code>from langgraph.types import Command
from langchain.messages import RemoveMessage
from langgraph.graph.message import REMOVE_ALL_MESSAGES
from langchain.tools import tool, ToolRuntime

# 通过移除所有消息来更新对话历史
@tool
def clear_conversation() -&gt; Command:
"""清除对话历史记录。"""

return Command(
update={
"messages": [RemoveMessage(id=REMOVE_ALL_MESSAGES)],
}
)

# 在智能体状态中更新用户姓名 (user_name)
@tool
def update_user_name(
new_name: str,
runtime: ToolRuntime
) -&gt; Command:
"""更新用户的姓名。"""
return Command(update={"user_name": new_name})</code></pre>

<a id="t-VzPA8eDn9yLZw98MPrzbsT"></a>

##### 上下文 (Context)

<p id="t-iEpd8Oz4hRLmzBUlTBmCdA"><span style="background-color:transparent">通过</span><span style="background-color:transparent">runtime.context</span><span style="background-color:transparent">访问不可变的配置和上下文数据，如用户 ID、会话详情或特定于应用程序的配置。</span></p>

<p id="t-C7kK1NdyCwypdrdrknmVDJ"><span style="background-color:transparent">工具可以通过</span><span style="background-color:transparent">ToolRuntime</span><span style="background-color:transparent">访问运行时上下文：</span></p>

<pre id="t-AjGWRUGeSBooZREocSNYyB"><code>from dataclasses import dataclass
from langchain_openai import ChatOpenAI
from langchain.agents import create_agent
from langchain.tools import tool, ToolRuntime

USER_DATABASE = {
"user123": {
"name": "Alice Johnson",
"account_type": "Premium",
"balance": 5000,
"email": "alice@example.com"
},
"user456": {
"name": "Bob Smith",
"account_type": "Standard",
"balance": 1200,
"email": "bob@example.com"
}
}

@dataclass
class UserContext:
user_id: str

@tool
def get_account_info(runtime: ToolRuntime[UserContext]) -&gt; str:
"""获取当前用户的账户信息。"""
user_id = runtime.context.user_id

if user_id in USER_DATABASE:
user = USER_DATABASE[user_id]
return f"Account holder: {user['name']}\nType: {user['account_type']}\nBalance: ${user['balance']}"
return "User not found"

model = ChatOpenAI(model="gpt-4o")
agent = create_agent(
model,
tools=[get_account_info],
context_schema=UserContext,
system_prompt="你是一个金融助手。"
)

result = agent.invoke(
{"messages": [{"role": "user", "content": "我现在的余额是多少？"}]},
context=UserContext(user_id="user123")
)</code></pre>

<a id="t-6pgxyRtIRTWMEE224XnhCN"></a>

##### 记忆 (存储) (Memory (Store))

<p id="t-SZpjgKz73My2LTQ8hwqXXO"><span style="background-color:transparent">使用存储 (Store) 访问跨对话的持久数据。存储通过</span><span style="background-color:transparent">runtime.store</span><span style="background-color:transparent">访问，允许你保存和检索用户特定或应用程序特定的数据。</span></p>

<p id="t-QHJlxtKCXnvm7oIB2VTmYc"><span style="background-color:transparent">工具可以通过</span><span style="background-color:transparent">ToolRuntime</span><span style="background-color:transparent">访问和更新存储：</span></p>

<p id="t-5DQjKW09PZKd4k7ftxhQrY"><span style="font-weight:bold">expandable</span></p>

<pre id="t-AVOlMIuYqveAk91foJSZtV"><code>from typing import Any
from langgraph.store.memory import InMemoryStore
from langchain.agents import create_agent
from langchain.tools import tool, ToolRuntime

# 访问记忆 (Memory)
@tool
def get_user_info(user_id: str, runtime: ToolRuntime) -&gt; str:
"""查找用户信息。"""
store = runtime.store
user_info = store.get(("users",), user_id)
return str(user_info.value) if user_info else "Unknown user"

# 更新记忆 (Memory)
@tool
def save_user_info(user_id: str, user_info: dict[str, Any], runtime: ToolRuntime) -&gt; str:
"""保存用户信息。"""
store = runtime.store
store.put(("users",), user_id, user_info)
return "Successfully saved user info."

store = InMemoryStore()
agent = create_agent(
model,
tools=[get_user_info, save_user_info],
store=store
)

# 第一个会话：保存用户信息
agent.invoke({
"messages": [{"role": "user", "content": "保存以下用户：userid: abc123, name: Foo, age: 25, email: foo@langchain.dev"}]
})

# 第二个会话：获取用户信息
agent.invoke({
"messages": [{"role": "user", "content": "获取 ID 为 'abc123' 的用户信息"}]
})
# 以下是 ID 为 "abc123" 的用户信息：
# - Name: Foo
# - Age: 25
# - Email: foo@langchain.dev</code></pre>

<a id="t-rOdrWthRH12x2rzoyFHRY0"></a>

##### 流写入器 (Stream writer)

<p id="t-MAK9KTiZ4TlUvHdsT5teL9"><span style="background-color:transparent">使用</span><span style="background-color:transparent">runtime.stream_writer</span><span style="background-color:transparent">在工具执行时流式传输自定义更新。这对于向用户提供关于工具正在做什么的实时反馈非常有用。</span></p>

<pre id="t-2RupXOw62sP642M3Bf5YC6"><code>from langchain.tools import tool, ToolRuntime

@tool
def get_weather(city: str, runtime: ToolRuntime) -&gt; str:
"""获取指定城市的天气。"""
writer = runtime.stream_writer

# 在工具执行时流式传输自定义更新
writer(f"正在查询城市数据：{city}")
writer(f"已获取城市数据：{city}")

return f"It's always sunny in {city}!"</code></pre>

<p id="t-gA9vQjx4JFLEPqqLGLsOhB"><span>如果你在工具内部使用 </span><span>runtime.stream_writer</span><span>，该工具必须在 LangGraph 执行上下文中调用。</span></p>


<a id="section-0712"></a>
## 概述

<a id="t-y8wT5s04UxulZN1GKR1eq0"></a>

<p id="t-PNaaWweIXELBA9bhmGm8Oo"><span style="background-color:transparent">记忆（Memory）是一个能够记住先前交互信息的系统。对于 AI 智能体（agent）而言，记忆至关重要，因为它能让智能体记住之前的交互、从反馈中学习并适应用户偏好。随着智能体处理涉及大量用户交互的复杂任务，这种能力对于效率和用户满意度都变得至关重要。</span></p>

<p id="t-7pONnYdwJbOpalkKRYTXtJ"><span style="background-color:transparent">短期记忆（Short-term memory）让你的应用程序能够记住单个线程（thread）或对话中的先前交互。</span></p>

<p id="t-Wx7NaJCJbWBNRXpN9FU1dm"><span>线程在一个会话中组织多次交互，类似于电子邮件将消息分组到单个对话中的方式。</span></p>

<p id="t-ifXGrjQNCGRBtxAHDOt1Ij"><span style="background-color:transparent">对话历史（Conversation history）是最常见的短期记忆形式。长对话对当今的大语言模型（LLM）构成了挑战；完整的历史记录可能无法放入 LLM 的上下文窗口（context window），导致上下文丢失或错误。</span></p>

<p id="t-vqxASyKWBVgBFgA6gMBdM6"><span style="background-color:transparent">即使你的模型支持完整的上下文长度，大多数 LLM 在处理长上下文时表现仍然不佳。它们会被过时或离题的内容“分散注意力”，同时还会遭受响应时间变慢和成本更高的困扰。</span></p>

<p id="t-9BnjZRvMlnsVhc3fQ1uEFX"><span style="background-color:transparent">聊天模型使用</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">消息（messages）</span><span style="background-color:transparent">来接受上下文，这些消息包括指令（系统消息）和输入（人类消息）。在聊天应用中，消息在人类输入和模型响应之间交替，导致消息列表随时间推移而变长。由于上下文窗口有限，许多应用可以通过使用技术来移除或“遗忘”过时信息而受益。</span></p>


<a id="section-0713"></a>
## 使用方法

<a id="t-fC9kVHCsDZ67rehqPO30ii"></a>

<p id="t-7HQZOfRAGRXlfzZmH9nGdA"><span style="background-color:transparent">要为智能体添加短期记忆（线程级持久化），你需要在创建智能体时指定一个</span><span style="background-color:transparent">checkpointer</span><span style="background-color:transparent">。</span></p>

<p id="t-wIqvMxM00ggoo3HMQKP4aD"><span>LangChain 的智能体将短期记忆作为其状态（state）的一部分进行管理。</span></p>

<p id="t-k37ZIrn1z1rzrHP1YrOxPq"><span>通过将这些信息存储在图的（graph）状态中，智能体可以访问给定对话的完整上下文，同时保持不同线程之间的隔离。</span></p>

<p id="t-ziiec0nTQygiAQZ09P7S7A"><span>状态通过检查点（checkpointer）持久化到数据库（或内存）中，因此线程可以在任何时候恢复。</span></p>

<p id="t-wP916i1tuzZOwUPFk7o1TW"><span>短期记忆在智能体被调用或步骤（如工具调用）完成时更新，状态在每个步骤开始时被读取。</span></p>

<pre id="t-qNjFwuNzaA5bd60PPe56de"><code>from langchain.agents import create_agent
from langgraph.checkpoint.memory import InMemorySaver

agent = create_agent(
"gpt-5",
tools=[get_user_info],
checkpointer=InMemorySaver(),
)

agent.invoke(
{"messages": [{"role": "user", "content": "Hi! My name is Bob."}]},
{"configurable": {"thread_id": "1"}},
)</code></pre>


<a id="section-0714"></a>
## 在生产环境中

<a id="t-nnf9mq0MwBIJlxUPmtPOF9"></a>

<p id="t-6mOkDh3fbt9HTQ6tvVWgBY"><span style="background-color:transparent">在生产环境中，使用由数据库支持的检查点：</span></p>

<pre id="t-p1KBCY2Ix4ZYqVcYTOPZeW"><code>pip install langgraph-checkpoint-postgres</code></pre>

<pre id="t-dXY2roLu7ep71IaXpjT8MP"><code>from langchain.agents import create_agent

from langgraph.checkpoint.postgres import PostgresSaver

DB_URI = "postgresql://postgres:postgres@localhost:5442/postgres?sslmode=disable"
with PostgresSaver.from_conn_string(DB_URI) as checkpointer:
checkpointer.setup() # auto create tables in PostgresSql
agent = create_agent(
"gpt-5",
tools=[get_user_info],
checkpointer=checkpointer,
)</code></pre>


<a id="section-0715"></a>
## 自定义智能体记忆

<a id="t-1jwL3yzFQPqNXt4YvwRhpa"></a>

<p id="t-IjdeSrL9cGEVCDNEnwOiMq"><span style="background-color:transparent">默认情况下，智能体使用</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">AgentState</span><span style="background-color:transparent">来管理短期记忆，特别是通过</span><span style="background-color:transparent">messages</span><span style="background-color:transparent">键管理对话历史。</span></p>

<p id="t-uEjtVppXaBvspRXvTbhzzU"><span style="background-color:transparent">你可以扩展</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">AgentState</span><span style="background-color:transparent">来添加额外的字段。自定义状态模式（state schema）通过</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">state_schema</span><span style="background-color:transparent">参数传递给</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">create_agent</span><span style="background-color:transparent">。</span></p>

<pre id="t-xdBnNdSfalRNAX8VJyQC9b"><code>from langchain.agents import create_agent, AgentState
from langgraph.checkpoint.memory import InMemorySaver

class CustomAgentState(AgentState):
user_id: str
preferences: dict

agent = create_agent(
"gpt-5",
tools=[get_user_info],
state_schema=CustomAgentState,
checkpointer=InMemorySaver(),
)

# 可以在调用时传入自定义状态
result = agent.invoke(
{
"messages": [{"role": "user", "content": "Hello"}],
"user_id": "user_123",
"preferences": {"theme": "dark"}
},
{"configurable": {"thread_id": "1"}})</code></pre>


<a id="section-0716"></a>
## 常见模式

<a id="t-20oKw62QvNNdxVDyRs8rQA"></a>

<p id="t-6dMC3GazdCxVo9FZKUJs65"><span style="background-color:transparent">启用</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">短期记忆</span><span style="background-color:transparent">后，长对话可能会超出 LLM 的上下文窗口。常见的解决方案有：</span></p>

<div id="t-5vqWA5SzFFqVANV7Nx7CZ2"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/db752f873d5c08c7a67ac6dd.png"/></div>

<p id="t-SDKctZihTUEpXIOPV8fWWB"><span style="background-color:transparent">这使得智能体能够跟踪对话，而不会超出 LLM 的上下文窗口。</span></p>


<a id="section-0717"></a>
## 修剪消息

<a id="t-10pE9JubWExdHk3IXwGlDN"></a>

<p id="t-4sE4Cw42WXWbwUGPDKa7j1"><span style="background-color:transparent">大多数 LLM 都有最大支持的上下文窗口（以令牌（tokens）为单位）。</span></p>

<p id="t-TgT1Otr49yIe6PwNxcNKhy"><span style="background-color:transparent">决定何时截断消息的一种方法是计算消息历史中的令牌数量，并在接近限制时进行截断。如果你使用 LangChain，可以使用修剪消息工具，并指定要从列表中保留的令牌数量，以及用于处理边界的</span><span style="background-color:transparent">strategy</span><span style="background-color:transparent">（例如，保留最后</span><span style="background-color:transparent">max_tokens</span><span style="background-color:transparent">个令牌）。</span></p>

<p id="t-MuVaPSPHhgHB11mGcEWXr1"><span style="background-color:transparent">要在智能体中修剪消息历史，请使用</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">@before_model</span><span style="background-color:transparent">中间件装饰器：</span></p>

<pre id="t-zVtOZoQeXE39KWCDo8CnsF"><code>from langchain.messages import RemoveMessage
from langgraph.graph.message import REMOVE_ALL_MESSAGES
from langgraph.checkpoint.memory import InMemorySaver
from langchain.agents import create_agent, AgentState
from langchain.agents.middleware import before_model
from langgraph.runtime import Runtime
from langchain_core.runnables import RunnableConfig
from typing import Any

@before_model
def trim_messages(state: AgentState, runtime: Runtime) -&gt; dict[str, Any] | None:
"""仅保留最后几条消息以适应上下文窗口。"""
messages = state["messages"]

if len(messages) &lt;= 3:
return None # 无需更改

first_msg = messages[0]
recent_messages = messages[-3:] if len(messages) % 2 == 0 else messages[-4:]
new_messages = [first_msg] + recent_messages

return {
"messages": [
RemoveMessage(id=REMOVE_ALL_MESSAGES),
*new_messages
]
}

agent = create_agent(
your_model_here,
tools=your_tools_here,
middleware=[trim_messages],
checkpointer=InMemorySaver(),
)

config: RunnableConfig = {"configurable": {"thread_id": "1"}}

agent.invoke({"messages": "hi, my name is bob"}, config)
agent.invoke({"messages": "write a short poem about cats"}, config)
agent.invoke({"messages": "now do the same but for dogs"}, config)
final_response = agent.invoke({"messages": "what's my name?"}, config)

final_response["messages"][-1].pretty_print()
"""
================================== Ai Message ==================================

Your name is Bob. You told me that earlier.
If you'd like me to call you a nickname or use a different name, just say the word.
"""</code></pre>


<a id="section-0718"></a>
## 删除消息

<a id="t-01CBjSKorHde8iLcGoEJ2K"></a>

<p id="t-b2XvfbgiEMLT8r8Bavq4l1"><span style="background-color:transparent">你可以从图状态中删除消息来管理消息历史。</span></p>

<p id="t-6p2gJGuTeeuACfFDhw4a9u"><span style="background-color:transparent">当你想删除特定消息或清除整个消息历史时，这很有用。</span></p>

<p id="t-fmYrnQ0EwHuJy8mpJ43PfW"><span style="background-color:transparent">要从图状态中删除消息，可以使用</span><span style="background-color:transparent">RemoveMessage</span><span style="background-color:transparent">。</span></p>

<p id="t-wsyQjJlhcAW6ZuHyibtvv0"><span style="background-color:transparent">要使 </span><span style="background-color:transparent">RemoveMessage</span><span style="background-color:transparent"> 生效，你需要使用带有 </span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">add_messages</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">归约器（reducer）</span><span style="background-color:transparent">的状态键。</span></p>

<p id="t-thDNfuBBnBXDRNYR1gHdJU"><span style="background-color:transparent">默认的</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">AgentState</span><span style="background-color:transparent">提供了这个功能。</span></p>

<p id="t-xyY4l931RdIJHBMzonV8Si"><span style="background-color:transparent">要删除特定消息：</span></p>

<pre id="t-VZk1W468Tgz9X1qj9KO5bV"><code>from langchain.messages import RemoveMessage

def delete_messages(state):
messages = state["messages"]
if len(messages) &gt; 2:
# 移除最早的两条消息
return {"messages": [RemoveMessage(id=m.id) for m in messages[:2]]}</code></pre>

<p id="t-8fK73nSd6uzhqCrvdoFStO"><span style="background-color:transparent">要删除</span><span style="font-weight:bold;background-color:transparent">所有</span><span style="background-color:transparent">消息：</span></p>

<pre id="t-AaalEW0bS0mSeM1zcurmMF"><code>from langgraph.graph.message import REMOVE_ALL_MESSAGES

def delete_messages(state):
return {"messages": [RemoveMessage(id=REMOVE_ALL_MESSAGES)]}</code></pre>

<blockquote id="t-R9isvGMdCEzZ43aNQa3mtB"><p id="t-IzYOrdjOBB4sQgqtM81InG"><span>删除消息时，</span><span style="font-weight:bold">务必确保</span><span>生成的消息历史是有效的。请检查你使用的 LLM 提供商的限制。例如：</span></p>
<p id="t-rDwZLy8jhigeK7kfZBwcW5"><span>* 一些提供商期望消息历史以 `user` 消息开始
* 大多数提供商要求带有工具调用的 `assistant` 消息后面必须跟着相应的 `tool` 结果消息。
</span></p></blockquote>

<pre id="t-GF2n7HLlS989KUwEUIm3L1"><code>from langchain.messages import RemoveMessage
from langchain.agents import create_agent, AgentState
from langchain.agents.middleware import after_model
from langgraph.checkpoint.memory import InMemorySaver
from langgraph.runtime import Runtime
from langchain_core.runnables import RunnableConfig

@after_model
def delete_old_messages(state: AgentState, runtime: Runtime) -&gt; dict | None:
"""移除旧消息以保持对话可管理。"""
messages = state["messages"]
if len(messages) &gt; 2:
# 移除最早的两条消息
return {"messages": [RemoveMessage(id=m.id) for m in messages[:2]]}
return None

agent = create_agent(
"gpt-5-nano",
tools=[],
system_prompt="Please be concise and to the point.",
middleware=[delete_old_messages],
checkpointer=InMemorySaver(),
)

config: RunnableConfig = {"configurable": {"thread_id": "1"}}

for event in agent.stream(
{"messages": [{"role": "user", "content": "hi! I'm bob"}]},
config,
stream_mode="values",
):
print([(message.type, message.content) for message in event["messages"]])

for event in agent.stream(
{"messages": [{"role": "user", "content": "what's my name?"}]},
config,
stream_mode="values",
):
print([(message.type, message.content) for message in event["messages"]])</code></pre>

<pre id="t-HP1zOmxIGXua3PLoOJ4o0J"><code>[('human', "hi! I'm bob")]
[('human', "hi! I'm bob"), ('ai', 'Hi Bob! Nice to meet you. How can I help you today? I can answer questions, brainstorm ideas, draft text, explain things, or help with code.')]
[('human', "hi! I'm bob"), ('ai', 'Hi Bob! Nice to meet you. How can I help you today? I can answer questions, brainstorm ideas, draft text, explain things, or help with code.'), ('human', "what's my name?")]
[('human', "hi! I'm bob"), ('ai', 'Hi Bob! Nice to meet you. How can I help you today? I can answer questions, brainstorm ideas, draft text, explain things, or help with code.'), ('human', "what's my name?"), ('ai', 'Your name is Bob. How can I help you today, Bob?')]
[('human', "what's my name?"), ('ai', 'Your name is Bob. How can I help you today, Bob?')]</code></pre>

<p id="t-2KjavmhbKC0IIC8RlxlQLs"><span style="background-color:transparent">:::js</span></p>

<pre id="t-MBxashH98LBoYY6kZHND93"><code>import { RemoveMessage } from "@langchain/core/messages";
import { createAgent, createMiddleware } from "langchain";
import { MemorySaver } from "@langchain/langgraph";

const deleteOldMessages = createMiddleware({
name: "DeleteOldMessages",
afterModel: (state) =&gt; {
const messages = state.messages;
if (messages.length &gt; 2) {
// 移除最早的两条消息
return {
messages: messages
.slice(0, 2)
.map((m) =&gt; new RemoveMessage({ id: m.id! })),
};
}
return;
},
});

const agent = createAgent({
model: "gpt-4o",
tools: [],
systemPrompt: "Please be concise and to the point.",
middleware: [deleteOldMessages],
checkpointer: new MemorySaver(),
});

const config = { configurable: { thread_id: "1" } };

const streamA = await agent.stream(
{ messages: [{ role: "user", content: "hi! I'm bob" }] },
{ ...config, streamMode: "values" }
);
for await (const event of streamA) {
const messageDetails = event.messages.map((message) =&gt; [
message.getType(),
message.content,
]);
console.log(messageDetails);
}

const streamB = await agent.stream(
{
messages: [{ role: "user", content: "what's my name?" }],
},
{ ...config, streamMode: "values" }
);
for await (const event of streamB) {
const messageDetails = event.messages.map((message) =&gt; [
message.getType(),
message.content,
]);
console.log(messageDetails);
}</code></pre>

<pre id="t-ek1PWWj0rFhcAv51EcLDrm"><code>[[ "human", "hi! I'm bob" ]]
[[ "human", "hi! I'm bob" ], [ "ai", "Hello, Bob! How can I assist you today?" ]]
[[ "human", "hi! I'm bob" ], [ "ai", "Hello, Bob! How can I assist you today?" ]]
[[ "human", "hi! I'm bob" ], [ "ai", "Hello, Bob! How can I assist you today" ], ["human", "what's my name?" ]]
[[ "human", "hi! I'm bob" ], [ "ai",</code></pre>


<a id="section-0719"></a>
## 流式传输

<a id="t-block-16623"></a>

<p id="t-mDrB9vBO5mFkPSUCDyVIUs"><span style="background-color:transparent">LangChain 实现了流式传输系统，以提供实时更新。</span></p>

<p id="t-SEdKK25mpbpB7JLgKurpzd"><span style="background-color:transparent">流式传输对于提升基于大语言模型（LLM）构建的应用程序的响应能力至关重要。通过逐步显示输出，甚至在完整响应准备就绪之前，流式传输能显著改善用户体验（UX），尤其是在处理 LLM 延迟时。</span></p>


<a id="section-0720"></a>
## 概述

<a id="t-G3DkUKLbddbHGmXgfh4fVS"></a>

<p id="t-Vm12kuGyuMs63ItTds8irk"><span style="background-color:transparent">LangChain 的流式传输系统允许您将智能体运行过程中的实时反馈呈现给您的应用程序。</span></p>

<p id="t-5J5LzoQG7z6ig8aFhAlR2x"><span style="background-color:transparent">LangChain 流式传输可以实现的功能：</span></p>

<ul><li id="t-ZfDC7rWJqRx06XNRdRHlUS"><span style="border-bottom:1px solid;font-weight:bold">流式传输智能体进度</span><span> — 在智能体每个步骤后获取状态更新。</span></li></ul>

<ul><li id="t-Efo4h7DubUyulATiKKP597"><span style="border-bottom:1px solid;font-weight:bold">流式传输 LLM 令牌</span><span> — 在语言模型令牌生成时进行流式传输。</span></li></ul>

<ul><li id="t-Kaz8iMVmTnvQgdMSQs0HZg"><span style="border-bottom:1px solid;font-weight:bold">流式传输自定义更新</span><span> — 发出用户定义的信号（例如，</span><span>"已获取 10/100 条记录"</span><span>）。</span></li></ul>

<ul><li id="t-Sv0ZqClZmVcQ41EQNjCUzg"><span style="border-bottom:1px solid;font-weight:bold">流式传输多种模式</span><span> — 可选择 </span><span>updates</span><span>（智能体进度）、</span><span>messages</span><span>（LLM 令牌 + 元数据）或 </span><span>custom</span><span>（任意用户数据）。</span></li></ul>


<a id="section-0721"></a>
## 支持的流模式

<a id="t-SUIXjrJe1kRbVXvEHxUr3Z"></a>

<p id="t-T7D3sL3GcI1D7LVhrwY6D5"><span style="background-color:transparent">将以下一个或多个流模式作为列表传递给</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">stream</span><span style="background-color:transparent">或</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">astream</span><span style="background-color:transparent">方法：</span></p>

<div id="t-7wcmaOal0njYKq45jsbydy"><table><colgroup><col width="120"/><col width="473.89752197265625"/></colgroup><tbody><tr><td><p><span>模式</span></p></td><td><p><span>描述</span></p></td></tr><tr><td><p><span style="border-bottom:1px solid">updates</span></p></td><td><p><span style="border-bottom:1px solid">在每个智能体步骤后流式传输状态更新。如果在同一步骤中进行了多次更新（例如，运行了多个节点），这些更新将单独流式传输。</span></p></td></tr><tr><td><p><span style="border-bottom:1px solid">messages</span></p></td><td><p><span style="border-bottom:1px solid">从任何调用 LLM 的图节点流式传输</span><span style="border-bottom:1px solid">(token, metadata)</span><span style="border-bottom:1px solid">元组。</span></p></td></tr><tr><td><p><span style="border-bottom:1px solid">custom</span></p></td><td><p><span style="border-bottom:1px solid">使用流写入器从图节点内部流式传输自定义数据。</span></p></td></tr></tbody></table></div>


<a id="section-0722"></a>
## 智能体进度

<a id="t-s0mvRCy5XZEPtsRq0GXiMd"></a>

<p id="t-gcy9V9wAtYoJYVaa5paHZD"><span style="background-color:transparent">要流式传输智能体进度，请使用</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">stream</span><span style="background-color:transparent">或</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">astream</span><span style="background-color:transparent">方法并设置</span><span style="background-color:transparent">stream_mode="updates"</span><span style="background-color:transparent">。这会在每个智能体步骤后发出一个事件。</span></p>

<p id="t-xpRxC4VyGBRfdR5Ds1qv0h"><span style="background-color:transparent">例如，如果您有一个调用一次工具的智能体，您应该会看到以下更新：</span></p>

<ul><li id="t-mgtjw4MyDb6cE0Zfom5gDl"><span style="font-weight:bold">LLM 节点</span><span>：包含工具调用请求的</span><span style="border-bottom:1px solid;font-weight:bold">AIMessage</span></li></ul>

<ul><li id="t-qEYJvMKIhbogUHIDSu0ism"><span style="font-weight:bold">工具节点</span><span>：包含执行结果的</span><span style="border-bottom:1px solid;font-weight:bold">ToolMessage</span></li></ul>

<ul><li id="t-eHfKELq0mreRpATWeaqyhY"><span style="font-weight:bold">LLM 节点</span><span>：最终的 AI 响应</span></li></ul>

<pre id="t-7s9ZlcCt3xMnUyxI47EbaS"><code>from langchain.agents import create_agent

def get_weather(city: str) -&gt; str:
"""Get weather for a given city."""

return f"It's always sunny in {city}!"

agent = create_agent(
model="gpt-5-nano",
tools=[get_weather],
)
for chunk in agent.stream(
{"messages": [{"role": "user", "content": "What is the weather in SF?"}]},
stream_mode="updates",
):
for step, data in chunk.items():
print(f"step: {step}")
print(f"content: {data['messages'][-1].content_blocks}")</code></pre>

<pre id="t-fIoPd2cgJ0ErFrLmPOoLmZ"><code>step: model
content: [{'type': 'tool_call', 'name': 'get_weather', 'args': {'city': 'San Francisco'}, 'id': 'call_OW2NYNsNSKhRZpjW0wm2Aszd'}]

step: tools
content: [{'type': 'text', 'text': "It's always sunny in San Francisco!"}]

step: model
content: [{'type': 'text', 'text': 'It's always sunny in San Francisco!'}]</code></pre>


<a id="section-0723"></a>
## LLM 令牌

<a id="t-colu5CsITqamhKtEwZNFDH"></a>

<p id="t-BmgCA2dUpvS9yvcwoHHqa5"><span style="background-color:transparent">要在 LLM 生成令牌时流式传输它们，请使用</span><span style="background-color:transparent">stream_mode="messages"</span><span style="background-color:transparent">。下面您可以看到智能体流式传输工具调用和最终响应的输出。</span></p>

<pre id="t-6KFcE04F4WvVsFGKUHBACr"><code>from langchain.agents import create_agent

def get_weather(city: str) -&gt; str:
"""Get weather for a given city."""

return f"It's always sunny in {city}!"

agent = create_agent(
model="gpt-5-nano",
tools=[get_weather],
)
for token, metadata in agent.stream(
{"messages": [{"role": "user", "content": "What is the weather in SF?"}]},
stream_mode="messages",
):
print(f"node: {metadata['langgraph_node']}")
print(f"content: {token.content_blocks}")
print("\n")</code></pre>

<pre id="t-n2M7CLuKtErwl2vndnJTsa"><code>node: model
content: [{'type': 'tool_call_chunk', 'id': 'call_vbCyBcP8VuneUzyYlSBZZsVa', 'name': 'get_weather', 'args': '', 'index': 0}]

node: model
content: [{'type': 'tool_call_chunk', 'id': None, 'name': None, 'args': '{"', 'index': 0}]

node: model
content: [{'type': 'tool_call_chunk', 'id': None, 'name': None, 'args': 'city', 'index': 0}]

node: model
content: [{'type': 'tool_call_chunk', 'id': None, 'name': None, 'args': '":"', 'index': 0}]

node: model
content: [{'type': 'tool_call_chunk', 'id': None, 'name': None, 'args': 'San', 'index': 0}]

node: model
content: [{'type': 'tool_call_chunk', 'id': None, 'name': None, 'args': ' Francisco', 'index': 0}]

node: model
content: [{'type': 'tool_call_chunk', 'id': None, 'name': None, 'args': '"}', 'index': 0}]

node: model
content: []

node: tools
content: [{'type': 'text', 'text': "It's always sunny in San Francisco!"}]

node: model
content: []

node: model
content: [{'type': 'text', 'text': 'Here'}]

node: model
content: [{'type': 'text', 'text': ''s'}]

node: model
content: [{'type': 'text', 'text': ' what'}]

node: model
content: [{'type': 'text', 'text': ' I'}]

node: model
content: [{'type': 'text', 'text': ' got'}]

node: model
content: [{'type': 'text', 'text': ':'}]

node: model
content: [{'type': 'text', 'text': ' "'}]

node: model
content: [{'type': 'text', 'text': "It's"}]

node: model
content: [{'type': 'text', 'text': ' always'}]

node: model
content: [{'type': 'text', 'text': ' sunny'}]

node: model
content: [{'type': 'text', 'text': ' in'}]

node: model
content: [{'type': 'text', 'text': ' San'}]

node: model
content: [{'type': 'text', 'text': ' Francisco'}]

node: model
content: [{'type': 'text', 'text': '!"\n\n'}]</code></pre>


<a id="section-0724"></a>
## 自定义更新

<a id="t-jmpMWenhPLQ9IoZ9qpcT5X"></a>

<p id="t-V8invrZ0zKwQlwWawoJt8H"><span style="background-color:transparent">要在工具执行时流式传输其更新，您可以使用 </span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">get_stream_writer</span><span style="background-color:transparent">。</span></p>

<pre id="t-sTXQFUHf0KMHXhPVV4zCbf"><code>from langchain.agents import create_agent
from langgraph.config import get_stream_writer

def get_weather(city: str) -&gt; str:
"""Get weather for a given city."""
writer = get_stream_writer()
# stream any arbitrary data
writer(f"Looking up data for city: {city}")
writer(f"Acquired data for city: {city}")
return f"It's always sunny in {city}!"

agent = create_agent(
model="claude-sonnet-4-5-20250929",
tools=[get_weather],
)

for chunk in agent.stream(
{"messages": [{"role": "user", "content": "What is the weather in SF?"}]},
stream_mode="custom"
):
print(chunk)</code></pre>

<pre id="t-egQx739hXMYnackyJZC2UK"><code>Looking up data for city: San Francisco
Acquired data for city: San Francisco</code></pre>

<p id="t-NY7uZPKRuwqkm5HYS9PU8j"><span>如果您在工具内部添加 </span><span style="border-bottom:1px solid;font-weight:bold">get_stream_writer</span><span>，您将无法在 LangGraph 执行上下文之外调用该工具。</span></p>


<a id="section-0725"></a>
## 流式传输多种模式

<a id="t-fy0lY7ZTP5uKxwHhfCRe32"></a>

<p id="t-anq1XgsZFs29BKQgYXqYOF"><span style="background-color:transparent">您可以通过将流模式作为列表传递来指定多种流模式：</span><span style="background-color:transparent">stream_mode=["updates", "custom"]</span><span style="background-color:transparent">。</span></p>

<p id="t-HtVdROeo5oN2OqmaZroWxA"><span style="background-color:transparent">流式传输的输出将是</span><span style="background-color:transparent">(mode, chunk)</span><span style="background-color:transparent">元组，其中</span><span style="background-color:transparent">mode</span><span style="background-color:transparent">是流模式的名称，</span><span style="background-color:transparent">chunk</span><span style="background-color:transparent">是该模式流式传输的数据。</span></p>

<pre id="t-4OZOZe3rYr09ZQjRVPc5CG"><code>from langchain.agents import create_agent
from langgraph.config import get_stream_writer

def get_weather(city: str) -&gt; str:
"""Get weather for a given city."""
writer = get_stream_writer()
writer(f"Looking up data for city: {city}")
writer(f"Acquired data for city: {city}")
return f"It's always sunny in {city}!"

agent = create_agent(
model="gpt-5-nano",
tools=[get_weather],
)

for stream_mode, chunk in agent.stream(
{"messages": [{"role": "user", "content": "What is the weather in SF?"}]},
stream_mode=["updates", "custom"]
):
print(f"stream_mode: {stream_mode}")
print(f"content: {chunk}")
print("\n")</code></pre>

<pre id="t-D6NXspCNqh3UCfwZYIeNcG"><code>stream_mode: updates
content: {'model': {'messages': [AIMessage(content='', response_metadata={'token_usage': {'completion_tokens': 280, 'prompt_tokens': 132, 'total_tokens': 412, 'completion_tokens_details': {'accepted_prediction_tokens': 0, 'audio_tokens': 0, 'reasoning_tokens': 256, 'rejected_prediction_tokens': 0}, 'prompt_tokens_details': {'audio_tokens': 0, 'cached_tokens': 0}}, 'model_provider': 'openai', 'model_name': 'gpt-5-nano-2025-08-07', 'system_fingerprint': None, 'id': 'chatcmpl-C9tlgBzGEbedGYxZ0rTCz5F7OXpL7', 'service_tier': 'default', 'finish_reason': 'tool_calls', 'logprobs': None}, id='lc_run--480c07cb-e405-4411-aa7f-0520fddeed66-0', tool_calls=[{'name': 'get_weather', 'args': {'city': 'San Francisco'}, 'id': 'call_KTNQIftMrl9vgNwEfAJMVu7r', 'type': 'tool_call'}], usage_metadata={'input_tokens': 132, 'output_tokens': 280, 'total_tokens': 412, 'input_token_details': {'audio': 0, 'cache_read': 0}, 'output_token_details': {'audio': 0, 'reasoning': 256}})]}}

stream_mode: custom
content: Looking up data for city: San Francisco

stream_mode: custom
content: Acquired data for city: San Francisco

stream_mode: updates
content: {'tools': {'messages': [ToolMessage(content="It's always sunny in San Francisco!", name='get_weather', tool_call_id='call_KTNQIftMrl9vgNwEfAJMVu7r')]}}

stream_mode: updates
content: {'model': {'messages': [AIMessage(content='San Francisco weather: It's always sunny in San Francisco!\n\n', response_metadata={'token_usage': {'completion_tokens': 764, 'prompt_tokens': 168, 'total_tokens': 932, 'completion_tokens_details': {'accepted_prediction_tokens': 0, 'audio_tokens': 0, 'reasoning_tokens': 704, 'rejected_prediction_tokens': 0}, 'prompt_tokens_details': {'audio_tokens': 0, 'cached_tokens': 0}}, 'model_provider': 'openai', 'model_name': 'gpt-5-nano-2025-08-07', 'system_fingerprint': None, 'id': 'chatcmpl-C9tljDFVki1e1haCyikBptAuXuHYG', 'service_tier': 'default', 'finish_reason': 'stop', 'logprobs': None}, id='lc_run--acbc740a-18fe-4a14-8619-da92a0d0ee90-0', usage_metadata={'input_tokens': 168, 'output_tokens': 764, 'total_tokens': 932, 'input_token_details': {'audio': 0, 'cache_read': 0}, 'output_token_details': {'audio': 0, 'reasoning': 704}})]}}</code></pre>


<a id="section-0726"></a>
## 常见模式

<a id="t-yqwas1cd5i6hShyvpnPHSp"></a>

<p id="t-CDD5LSYCisHVDE2PnHCqQy"><span style="background-color:transparent">以下是展示流式传输常见用例的示例。</span></p>


<a id="section-0727"></a>
## 流式传输工具调用

<a id="t-zX8rn3cZS6eduFrucA36BQ"></a>

<p id="t-O2KnXsoLGm057TV9UbIWt6"><span style="background-color:transparent">您可能希望同时流式传输：</span></p>

<ol start="1"><li id="t-gJFhYGPADQmC40KPM2vNt4"><span>生成</span><span style="border-bottom:1px solid;font-weight:bold">工具调用</span><span>时的部分 JSON</span></li></ol>

<ol start="2"><li id="t-XNDwkvudyMPmMfyESZF2pF"><span>已执行、解析完成的工具调用</span></li></ol>

<p id="t-hjqTLH9uP3Nl8AP5o4vdAL"><span style="background-color:transparent">指定 </span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">stream_mode="messages"</span><span style="background-color:transparent"> 将流式传输智能体中所有 LLM 调用生成的增量</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">消息块</span><span style="background-color:transparent">。要访问包含已解析工具调用的完整消息：</span></p>

<ol start="1"><li id="t-SGdRUUH6BUsSIALUi82ni6"><span>如果这些消息在</span><span style="border-bottom:1px solid;font-weight:bold">状态</span><span>中被跟踪（如在 </span><span style="border-bottom:1px solid;font-weight:bold">create_agent</span><span> 的模型节点中），请使用 </span><span>stream_mode=["messages", "updates"]</span><span> 通过</span><span style="border-bottom:1px solid;font-weight:bold">状态更新</span><span>访问完整消息（如下所示）。</span></li></ol>

<ol start="2"><li id="t-XZlu17x1i5Lbe3KdzKrUFz"><span>如果这些消息未在状态中跟踪，请使用</span><span style="border-bottom:1px solid;font-weight:bold">自定义更新</span><span>或在流式传输循环期间聚合块（</span><span style="border-bottom:1px solid;font-weight:bold">下一节</span><span>）。</span></li></ol>

<p id="t-adG1yb0tYomXSyVYvbdQky"><span>如果您的智能体包含多个 LLM，请参考下面关于</span><span style="border-bottom:1px solid;font-weight:bold">从子智能体流式传输</span><span>的部分。</span></p>

<pre id="t-of1639VFfcWFFxbxQnB8TL"><code>from typing import Any

from langchain.agents import create_agent
from langchain.messages import AIMessage, AIMessageChunk, AnyMessage, ToolMessage

def get_weather(city: str) -&gt; str:
"""Get weather for a given city."""

return f"It's always sunny in {city}!"

agent = create_agent("openai:gpt-5.2", tools=[get_weather])

def _render_message_chunk(token: AIMessageChunk) -&gt; None:
if token.text:
print(token.text, end="|")
if token.tool_call_chunks:
print(token.tool_call_chunks)
# N.B. all content is available through token.content_blocks

def _render_completed_message(message: AnyMessage) -&gt; None:
if isinstance(message, AIMessage) and message.tool_calls:
print(f"Tool calls: {message.tool_calls}")
if isinstance(message, ToolMessage):
print(f"Tool response: {message.content_blocks}")

input_message = {"role": "user", "content": "What is the weather in Boston?"}
for stream_mode, data in agent.stream(
{"messages": [input_message]},
stream_mode=["messages", "updates"],
):
if stream_mode == "messages":
token, metadata = data
if isinstance(token, AIMessageChunk):
_render_message_chunk(token)
if stream_mode == "updates":
for source, update in data.items():
if source in ("model", "tools"): # `source` captures node name
_render_completed_message(update["messages"][-1])</code></pre>

<pre id="t-hHETPlVhytGzrG4LDhL8YJ"><code>[{'name': 'get_weather', 'args': '', 'id': 'call_D3Orjr89KgsLTZ9hTzYv7Hpf', 'index': 0, 'type': 'tool_call_chunk'}]
[{'name': None, 'args': '{"', 'id': None, 'index': 0, 'type': 'tool_call_chunk'}]
[{'name': None, 'args': 'city', 'id': None, 'index': 0, 'type': 'tool_call_chunk'}]
[{'name': None, 'args': '":"', 'id': None, 'index': 0, 'type': 'tool_call_chunk'}]
[{'name': None, 'args': 'Boston', 'id': None, 'index': 0, 'type': 'tool_call_chunk'}]
[{'name': None, 'args': '"}', 'id': None, 'index': 0, 'type': 'tool_call_chunk'}]
Tool calls: [{'name': 'get_weather', 'args': {'city': 'Boston'}, 'id': 'call_D3Orjr89KgsLTZ9hTzYv7Hpf', 'type': 'tool_call'}]
Tool response: [{'type': 'text', 'text': "It's always sunny in Boston!"}]
The| weather| in| Boston| is| **|sun|ny|**|.|</code></pre>

<a id="t-UU4x0hxfFkFLq53HFmPSSa"></a>

##### 访问完整消息

<p id="t-bFNjFBRyJZ8O5pukuwnhH6"><span>如果完整消息在智能体的</span><span style="border-bottom:1px solid;font-weight:bold">状态</span><span>中被跟踪，您可以使用 </span><span>stream_mode=["messages", "updates"]</span><span>，如</span><span style="border-bottom:1px solid;font-weight:bold">上文</span><span>所示，在流式传输期间访问完整消息。</span></p>

<p id="t-Aj0zQKUWjPjlAGtjFxE2vG"><span style="background-color:transparent">在某些情况下，完整消息不会反映在</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">状态更新</span><span style="background-color:transparent">中。如果您可以访问智能体内部，可以使用</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">自定义更新</span><span style="background-color:transparent">在流式传输期间访问这些消息。否则，您可以在流式传输循环中聚合消息块（见下文）。</span></p>

<p id="t-80wQ0pF8kVIxhgFwrELwAt"><span style="background-color:transparent">考虑下面的示例，我们将一个</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">流写入器</span><span style="background-color:transparent">集成到一个简化的</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">护栏中间件</span><span style="background-color:transparent">中。该中间件演示了工具调用以生成结构化的“安全/不安全”评估（也可以为此使用</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">结构化输出</span><span style="background-color:transparent">）：</span></p>

<pre id="t-4zmUNy7E1kDAb0ED3tS3e5"><code>from typing import Any, Literal

from langchain.agents.middleware import after_agent, AgentState
from langgraph.runtime import Runtime
from langchain.messages import AIMessage
from langchain.chat_models import init_chat_model
from langgraph.config import get_stream_writer
from pydantic import BaseModel

class ResponseSafety(BaseModel):
"""Evaluate a response as safe or unsafe."""
evaluation: Literal["safe", "unsafe"]

safety_model = init_chat_model("openai:gpt-5.2")

@after_agent(can_jump_to=["end"])
def safety_guardrail(state: AgentState, runtime: Runtime) -&gt; dict[str, Any] | None:
"""Model-based guardrail: Use an LLM to evaluate response safety."""
stream_writer = get_stream_writer()
# Get the model response
if not state["messages"]:
return None

last_message = state["messages"][-1]
if not isinstance(last_message, AIMessage):
return None

# Use another model to evaluate safety
model_with_tools = safety_model.bind_tools([ResponseSafety], tool_choice="any")
result = model_with_tools.invoke(
[
{
"role": "system",
"content": "Evaluate this AI response as generally safe or unsafe."
},
{
"role": "user",
"content": f"AI response: {last_message.text}"
}
]
)
stream_writer(result)

tool_call = result.tool_calls[0]
if tool_call["args"]["evaluation"] == "unsafe":
last_message.content = "I cannot provide that response. Please rephrase your request."

return None</code></pre>

<p id="t-kbZLLTktpJdtswFo2Xr1dE"><span style="background-color:transparent">然后，我们可以将此中间件集成到我们的智能体中，并包含其自定义流事件：</span></p>

<pre id="t-aNFlFGAu8MNQutp2k3TYG7"><code>from typing import Any

from langchain.agents import create_agent
from langchain.messages import AIMessageChunk, AIMessage, AnyMessage

def get_weather(city: str) -&gt; str:
"""Get weather for a given city."""

return f"It's always sunny in {city}!"

agent = create_agent(
model="openai:gpt-5.2",
tools=[get_weather],
middleware=[safety_guardrail],
)

def _render_message_chunk(token: AIMessageChunk) -&gt; None:
if token.text:
print(token.text, end="|")
if token.tool_call_chunks:
print(token.tool_call_chunks)

def _render_completed_message(message: AnyMessage) -&gt; None:
if isinstance(message, AIMessage) and message.tool_calls:
print(f"Tool calls: {message.tool_calls}")
if isinstance(message, ToolMessage):
print(f"Tool response: {message.content_blocks}")

input_message = {"role": "user", "content": "What is the weather in Boston?"}
for stream_mode, data in agent.stream(
{"messages": [input_message]},
stream_mode=["messages", "updates", "custom"],
):
if stream_mode == "messages":
token, metadata = data
if isinstance(token, AIMessageChunk):
_render_message_chunk(token)
if stream_mode == "updates":
for source, update in data.items():
if source in ("model", "tools"):
_render_completed_message(update["messages"][-1])
if stream_mode == "custom":
# access completed message in stream
print(f"Tool calls: {data.tool_calls}")</code></pre>

<pre id="t-EE3L1223Hi9aGGhgTzWTjq"><code>[{'name': 'get_weather', 'args': '', 'id': 'call_je6LWgxYzuZ84mmoDalTYMJC', 'index': 0, 'type': 'tool_call_chunk'}]
[{'name': None, 'args': '{"', 'id': None, 'index': 0, 'type': 'tool_call_chunk'}]
[{'name': None, 'args': 'city', 'id': None, 'index': 0, 'type': 'tool_call_chunk'}]
[{'name': None, 'args': '":"', 'id': None, 'index': 0, 'type': 'tool_call_chunk'}]
[{'name': None, 'args': 'Boston', 'id': None, 'index': 0, 'type': 'tool_call_chunk'}]
[{'name': None, 'args': '"}', 'id': None, 'index': 0, 'type': 'tool_call_chunk'}]
Tool calls: [{'name': 'get_weather', 'args': {'city': 'Boston'}, 'id': 'call_je6LWgxYzuZ84mmoDalTYMJC', 'type': 'tool_call'}]
Tool response: [{'type': 'text', 'text': "It's always sunny in Boston!"}]
The| weather| in| **|Boston|**| is| **|sun|ny|**|.|[{'name': 'ResponseSafety', 'args': '', 'id': 'call_O8VJIbOG4Q9nQF0T8ltVi58O', 'index': 0, 'type': 'tool_call_chunk'}]
[{'name': None, 'args': '{"', 'id': None, 'index': 0, 'type': 'tool_call_chunk'}]
[{'name': None, 'args': 'evaluation', 'id': None, 'index': 0, 'type': 'tool_call_chunk'}]
[{'name': None, 'args': '":"', 'id': None, 'index': 0, 'type': 'tool_call_chunk'}]
[{'name': None, 'args': 'safe', 'id': None, 'index': 0, 'type': 'tool_call_chunk'}]
[{'name': None, 'args': '"}', 'id': None, 'index': 0, 'type': 'tool_call_chunk'}]
Tool calls: [{'name': 'ResponseSafety', 'args': {'evaluation': 'safe'}, 'id': 'call_O8VJIbOG4Q9nQF0T8ltVi58O', 'type': 'tool_call'}]</code></pre>

<p id="t-QmmU6Zf6rTj1mr4sPpf48N"><span style="background-color:transparent">或者，如果您无法向流中添加自定义事件，可以在流式传输循环内聚合消息块：</span></p>

<pre id="t-VxJpE48h1X1mRXdWxnjA8u"><code>input_message = {"role": "user", "content": "What is the weather in Boston?"}
full_message = None
for stream_mode, data in agent.stream(
 {"messages": [input_message]},
    stream_mode=["messages", "updates"],
):
 if stream_mode == "messages":
        token, metadata = data
 if isinstance(token, AIMessageChunk):
            _render_message_chunk(token)
            full_message = token if full_message is None else full_message + token  
 if token.chunk_position == "last":
 if full_message.tool_calls:
 print(f"Tool calls: {full_message.tool_calls}")
                full_message = None
 if stream_mode == "updates":
 for source, update in data.items():
 if source == "tools":
                _render_completed_message(update["messages"][-1])</code></pre>


<a id="section-0728"></a>
## 人机交互流式传输

<a id="t-FT2x3eZlo6TSsu6iyzV6Wx"></a>

<p id="t-aUsZZuf4UIiRlDWQcA4Xmj"><span style="background-color:transparent">为了处理人机交互</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">中断</span><span style="background-color:transparent">，我们在</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">上述示例</span><span style="background-color:transparent">的基础上进行构建：</span></p>

<ol start="1"><li id="t-xJBeKHStAv9mhYuPGdnKmX"><span>我们使用</span><span style="border-bottom:1px solid;font-weight:bold">人机交互中间件和检查点</span><span>配置智能体</span></li></ol>

<ol start="2"><li id="t-O0M17dB3ESbEPylqMOn8Wj"><span>我们收集在</span><span>"updates"</span><span>流模式下生成的中断</span></li></ol>

<ol start="3"><li id="t-ufLQIemoQOzNIo4MmSiH6K"><span>我们使用</span><span style="border-bottom:1px solid;font-weight:bold">命令</span><span>响应这些中断</span></li></ol>

<pre id="t-Pmcdb2kpxjDfOayLIHqQwh"><code>from typing import Any

from langchain.agents import create_agent
from langchain.agents.middleware import HumanInTheLoopMiddleware
from langchain.messages import AIMessage, AIMessageChunk, AnyMessage, ToolMessage
from langgraph.checkpoint.memory import InMemorySaver
from langgraph.types import Command, Interrupt

def get_weather(city: str) -&gt; str:
 """Get weather for a given city."""

 return f"It's always sunny in {city}!"

checkpointer = InMemorySaver()

agent = create_agent(
 "openai:gpt-5.2",
    tools=[get_weather],
    middleware=[
        HumanInTheLoopMiddleware(interrupt_on={"get_weather": True}),
 ],
    checkpointer=checkpointer,
)

def _render_message_chunk(token: AIMessageChunk) -&gt; None:
 if token.text:
 print(token.text, end="|")
 if token.tool_call_chunks:
 print(token.tool_call_chunks)

def _render_completed_message(message: AnyMessage) -&gt; None:
 if isinstance(message, AIMessage) and message.tool_calls:
 print(f"Tool calls: {message.tool_calls}")
 if isinstance(message, ToolMessage):
 print(f"Tool response: {message.content_blocks}")

def _render_interrupt(interrupt: Interrupt) -&gt; None:
    interrupts = interrupt.value  
 for request in interrupts["action_requests"]:
 print(request["description"])

input_message = {
 "role": "user",
 "content": (
 "Can you look up the weather in Boston and San Francisco?"
 ),
}
config = {"configurable": {"thread_id": "some_id"}}
interrupts = []
for stream_mode, data in agent.stream(
 {"messages": [input_message]},
    config=config,
    stream_mode=["messages", "updates"],
):
 if stream_mode == "messages":
        token, metadata = data
 if isinstance(token, AIMessageChunk):
            _render_message_chunk(token)
 if stream_mode == "updates":
 for source, update in data.items():
 if source in ("model", "tools"):
                _render_completed_message(update["messages"][-1])
 if source == "__interrupt__":
                interrupts.extend(update)
                _render_interrupt(update[0])</code></pre>

<pre id="t-q9GHhqAIaYrkohqMzoI2Zi"><code>[{'name': 'get_weather', 'args': '', 'id': 'call_GOwNaQHeqMixay2qy80padfE', 'index': 0, 'type': 'tool_call_chunk'}]
[{'name': None, 'args': '{"ci', 'id': None, 'index': 0, 'type': 'tool_call_chunk'}]
[{'name': None, 'args': 'ty": ', 'id': None, 'index': 0, 'type': 'tool_call_chunk'}]
[{'name': None, 'args': '"Bosto', 'id': None, 'index': 0, 'type': 'tool_call_chunk'}]
[{'name': None, 'args': 'n"}', 'id': None, 'index': 0, 'type': 'tool_call_chunk'}]
[{'name': 'get_weather', 'args': '', 'id': 'call_Ndb4jvWm2uMA0JDQXu37wDH6', 'index': 1, 'type': 'tool_call_chunk'}]
[{'name': None, 'args': '{"ci', 'id': None, 'index': 1, 'type': 'tool_call_chunk'}]
[{'name': None, 'args': 'ty": ', 'id': None, 'index': 1, 'type': 'tool_call_chunk'}]
[{'name': None, 'args': '"San F', 'id': None, 'index': 1, 'type': 'tool_call_chunk'}]
[{'name': None, 'args': 'ranc', 'id': None, 'index': 1, 'type': 'tool_call_chunk'}]
[{'name': None, 'args': 'isco"', 'id': None, 'index': 1, 'type': 'tool_call_chunk'}]
[{'name': None, 'args': '}', 'id': None, 'index': 1, 'type': 'tool_call_chunk'}]
Tool calls: [{'name': 'get_weather', 'args': {'city': 'Boston'}, 'id': 'call_GOwNaQHeqMixay2qy80padfE', 'type': 'tool_call'}, {'name': 'get_weather', 'args': {'city': 'San Francisco'}, 'id': 'call_Ndb4jvWm2uMA0JDQXu37wDH6', 'type': 'tool_call'}]
Tool execution requires approval

Tool: get_weather
Args: {'city': 'Boston'}
Tool execution requires approval

Tool: get_weather
Args: {'city': 'San Francisco'}</code></pre>

<p id="t-EM53xFQSeIwipLnW7qSsWo"><span style="background-color:transparent">接下来，我们为每个中断收集一个</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">决策</span><span style="background-color:transparent">。重要的是，决策的顺序必须与我们收集的操作顺序相匹配。</span></p>

<p id="t-wvRjLSS9KOrtlX0byVF9iF"><span style="background-color:transparent">为了说明，我们将编辑一个工具调用并接受另一个：</span></p>

<pre id="t-4RdTENFfZ4Oo5XGMYYo4HT"><code>def _get_interrupt_decisions(interrupt: Interrupt) -&gt; list[dict]:
return [
{
"type": "edit",
"edited_action": {
"name": "get_weather",
"args": {"city": "Boston, U.K."},
},
}
if "boston" in request["description"].lower()
else {"type": "approve"}
for request in interrupt.value["action_requests"]
]

decisions = {}
for interrupt in interrupts:
decisions[interrupt.id] = {
"decisions": _get_interrupt_decisions(interrupt)
}

decisions</code></pre>

<pre id="t-j5r50b4MuSdby29lm3YCTA"><code>{
'a96c40474e429d661b5b32a8d86f0f3e': {
'decisions': [
{
'type': 'edit',
'edited_action': {
'name': 'get_weather',
'args': {'city': 'Boston, U.K.'}
}
},
{'type': 'approve'},
]
}
}</code></pre>

<p id="t-f2G3EcTSc9RSr08ruzJdp4"><span style="background-color:transparent">然后，我们可以通过将</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">命令</span><span style="background-color:transparent">传递到同一个流式传输循环中来恢复执行：</span></p>

<pre id="t-QbtAERT5AYNVmt2thc8h6h"><code>interrupts = []
for stream_mode, data in agent.stream(
Command(resume=decisions),
config=config,
stream_mode=["messages", "updates"],
):
# Streaming loop is unchanged
if stream_mode == "messages":
token, metadata = data
if isinstance(token, AIMessageChunk):
_render_message_chunk(token)
if stream_mode == "updates":
for source, update in data.items():
if source in ("model", "tools"):
_render_completed_message(update["messages"][-1])
if source == "__interrupt__":
interrupts.extend(update)
_render_interrupt(update[0])</code></pre>

<pre id="t-jdhEhB0NrSRNNscbavuBqR"><code>Tool response: [{'type': 'text', 'text': "It's always sunny in Boston, U.K.!"}]
Tool response: [{'type': 'text', 'text': "It's always sunny in San Francisco!"}]
-| **|Boston|**|:| It|’s| always| sunny| in| Boston|,| U|.K|.|
|-| **|San| Francisco|**|:| It|’s| always| sunny| in| San| Francisco|!|</code></pre>


<a id="section-0729"></a>
## 从子智能体流式传输

<a id="t-hfrzjP0ytyAexfKWYGbczx"></a>

<p id="t-WFynR1Jc3EoMGjsnEGLccN"><span style="background-color:transparent">当智能体中的任何位置存在多个 LLM 时，通常需要在消息生成时区分其来源。</span></p>

<p id="t-2MZjhnds0Si0hxiIgRfEfL"><span style="background-color:transparent">为此，您可以使用</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">tags</span><span style="background-color:transparent">初始化任何模型。这些标签在</span><span style="background-color:transparent">"messages"</span><span style="background-color:transparent">模式下流式传输时，可在元数据中获取。</span></p>

<p id="t-6pBNkaMZyvZgpaJEfVMKK8"><span style="background-color:transparent">下面，我们更新</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">流式传输工具调用</span><span style="background-color:transparent">示例：</span></p>

<ol start="1"><li id="t-4d4CwiqUrZL4RBCEfa6y53"><span>我们将工具替换为内部调用智能体的</span><span>call_weather_agent</span><span>工具</span></li></ol>

<ol start="2"><li id="t-oZhUdqkWwLrPDfouyCvwFC"><span>我们为此 LLM 和外层</span><span style="border-bottom:1px solid;font-weight:bold">"监督器"</span><span> LLM 添加字符串标签</span></li></ol>

<ol start="3"><li id="t-TSSfjuiN9mfrIAKJfvI5Ld"><span>我们在创建流时指定</span><span style="border-bottom:1px solid;font-weight:bold">subgraphs=True</span></li></ol>

<ol start="4"><li id="t-Rd1Jt0fRfo3T7Ri3Rl9DGl"><span>我们的流处理与之前相同，但添加了逻辑来跟踪哪个 LLM 处于活动状态</span></li></ol>

<p id="t-piR7NvEVkGllruuX4WP9mF"><span>如果不需要从子智能体流式传输令牌，可以使用 </span><span style="border-bottom:1px solid;font-weight:bold">name</span><span> 初始化子智能体。此名称在流式传输 </span><span style="border-bottom:1px solid;font-weight:bold">updates</span><span> 时，可在子智能体生成的消息上访问。</span></p>

<p id="t-vFI4L9kWXNG89eUPTKHuoZ"><span style="background-color:transparent">首先我们构建智能体：</span></p>

<pre id="t-00FpmFVN8lUo6nN2tVaQ71"><code>from typing import Any

from langchain.agents import create_agent
from langchain.chat_models import init_chat_model
from langchain.messages import AIMessage, AnyMessage

def get_weather(city: str) -&gt; str:
"""Get weather for a given city."""

return f"It's always sunny in {city}!"

weather_model = init_chat_model(
"openai:gpt-5.2",
tags=["weather_sub_agent"],
)

weather_agent = create_agent(model=weather_model, tools=[get_weather])

def call_weather_agent(query: str) -&gt; str:
"""Query the weather agent."""
result = weather_agent.invoke({
"messages": [{"role": "user", "content": query}]
})
return result["messages"][-1].text

supervisor_model = init_chat_model(
"openai:gpt-5.2",
tags=["supervisor"],
)

agent = create_agent(model=supervisor_model, tools=[call_weather_agent])</code></pre>

<p id="t-QPMQzqdcdzmXBaniADfQgM"><span style="background-color:transparent">接下来，我们向流式传输循环添加逻辑，以报告哪个智能体正在发出令牌：</span></p>

<pre id="t-MvFU0KgQiOnysDTwZrDFEA"><code>def _render_message_chunk(token: AIMessageChunk) -&gt; None:
if token.text:
print(token.text, end="|")
if token.tool_call_chunks:
print(token.tool_call_chunks)

def _render_completed_message(message: AnyMessage) -&gt; None:
if isinstance(message, AIMessage) and message.tool_calls:
print(f"Tool calls: {message.tool_calls}")
if isinstance(message, ToolMessage):
print(f"Tool response: {message.content_blocks}")

input_message = {"role": "user", "content": "What is the weather in Boston?"}
current_agent = None
for _, stream_mode, data in agent.stream(
{"messages": [input_message]},
stream_mode=["messages", "updates"],
subgraphs=True,
):
if stream_mode == "messages":
token, metadata = data
if tags := metadata.get("tags", []):
this_agent = tags[0]
if this_agent != current_agent:
print(f"🤖 {this_agent}: ")
current_agent = this_agent
if isinstance(token, AIMessage):
_render_message_chunk(token)
if stream_mode == "updates":
for source, update in data.items():
if source in ("model", "tools"):
_render_completed_message(update["messages"][-1])</code></pre>

<pre id="t-F731pCO7Zhw2SZ3fzEB4io"><code>🤖 supervisor:
[{'name': 'call_weather_agent', 'args': '', 'id': 'call_asorzUf0mB6sb7MiKfgojp7I', 'index': 0, 'type': 'tool_call_chunk'}]
[{'name': None, 'args': '{"', 'id': None, 'index': 0, 'type': 'tool_call_chunk'}]
[{'name': None, 'args': 'query', 'id': None, 'index': 0, 'type': 'tool_call_chunk'}]
[{'name': None, 'args': '":"', 'id': None, 'index': 0, 'type': 'tool_call_chunk'}]
[{'name': None, 'args': 'Boston', 'id': None, 'index': 0, 'type': 'tool_call_chunk'}]
[{'name': None, 'args': ' weather', 'id': None, 'index': 0, 'type': 'tool_call_chunk'}]
[{'name': None, 'args': ' right', 'id': None, 'index': 0, 'type': 'tool_call_chunk'}]
[{'name': None, 'args': ' now', 'id': None, 'index': 0, 'type': 'tool_call_chunk'}]
[{'name': None, 'args': ' and', 'id': None, 'index': 0, 'type': 'tool_call_chunk'}]
[{'name': None, 'args': " today's", 'id': None, 'index': 0, 'type': 'tool_call_chunk'}]
[{'name': None, 'args': ' forecast', 'id': None, 'index': 0, 'type': 'tool_call_chunk'}]
[{'name': None, 'args': '"}', 'id': None, 'index': 0, 'type': 'tool_call_chunk'}]
Tool calls: [{'name': 'call_weather_agent', 'args': {'query': "Boston weather right now and today's forecast"}, 'id': 'call_asorzUf0mB6sb7MiKfgojp7I', 'type': 'tool_call'}]
🤖 weather_sub_agent:
[{'name': 'get_weather', 'args': '', 'id': 'call_LZ89lT8fW6w8vqck5pZeaDIx', 'index': 0, 'type': 'tool_call_chunk'}]
[{'name': None, 'args': '{"', 'id': None, 'index': 0, 'type': 'tool_call_chunk'}]
[{'name': None, 'args': 'city', 'id': None, 'index': 0, 'type': 'tool_call_chunk'}]
[{'name': None, 'args': '":"', 'id': None, 'index': 0, 'type': 'tool_call_chunk'}]
[{'name': None, 'args': 'Boston', 'id': None, 'index': 0, 'type': 'tool_call_chunk'}]
[{'name': None, 'args': '"}', 'id': None, 'index': 0, 'type': 'tool_call_chunk'}]
Tool calls: [{'name': 'get_weather', 'args': {'city': 'Boston'}, 'id': 'call_LZ89lT8fW6w8vqck5pZeaDIx', 'type': 'tool_call'}]
Tool response: [{'type': 'text', 'text': "It's always sunny in Boston!"}]
Boston| weather| right| now|:| **|Sunny|**|.

|Today|’s| forecast| for| Boston|:| **|Sunny| all| day|**|.|Tool response: [{'type': 'text', 'text': 'Boston weather right now: **Sunny**.\n\nToday’s forecast for Boston: **Sunny all day**.'}]
🤖 supervisor:
Boston| weather| right| now|:| **|Sunny|**|.

|Today|’s| forecast| for| Boston|:| **|Sunny| all| day|**|.|</code></pre>


<a id="section-0730"></a>
## 禁用流式传输

<a id="t-Cl6x4A1KOPC9BO5iu2Vv0I"></a>

<p id="t-z4SnRnSNPopY1Vn0uMgvNR"><span style="background-color:transparent">在某些应用程序中，您可能需要为给定模型禁用单个令牌的流式传输。这在以下情况下很有用：</span></p>

<ul><li id="t-s13R2AwdvnS2000H5NP6fK"><span>使用</span><span style="border-bottom:1px solid;font-weight:bold">多智能体</span><span>系统来控制哪些智能体流式传输其输出</span></li></ul>

<ul><li id="t-Skg23a1fyFSvknAy3lyvRZ"><span>混合支持流式传输的模型与不支持流式传输的模型</span></li></ul>

<ul><li id="t-U36HikauVi9EfcoGpuZgZm"><span>部署到 </span><span style="border-bottom:1px solid;font-weight:bold">LangSmith</span><span> 并希望防止某些模型输出被流式传输到客户端</span></li></ul>

<p id="t-KG2766xS9wePliGCC1Y5yZ"><span style="background-color:transparent">在初始化模型时设置</span><span style="background-color:transparent">streaming=False</span><span style="background-color:transparent">。</span></p>

<pre id="t-FNVDUaHb58w4nmLPRbXdbc"><code>from langchain_openai import ChatOpenAI

model = ChatOpenAI(
model="gpt-4o",
streaming=False
)</code></pre>

<p id="t-q1IXPopLPFVyKPXACB6jQ1"><span>部署到 LangSmith 时，对于任何不希望其输出流式传输到客户端的模型，请设置</span><span>streaming=False</span><span>。这需要在部署前在您的图代码中进行配置。</span></p>

<p id="t-K88iImgoLetoLfiWtNKylX"><span>并非所有聊天模型集成都支持</span><span>streaming</span><span>参数。如果您的模型不支持，请改用</span><span>disable_streaming=True</span><span>。此参数可通过基类在所有聊天模型上使用。</span></p>


<a id="section-0731"></a>
## 结构化输出 (Structured output)

<a id="t-block-16719"></a>

<p id="t-6VnrZaGWhFSXVHoMgBABJm"><span>结构化输出（Structured output）允许智能体（agent）以特定、可预测的格式返回数据。你无需解析自然语言响应，而是可以直接获得 JSON 对象、</span><span style="border-bottom:1px solid;font-weight:bold">Pydantic 模型</span><span>或数据类（dataclasses）形式的、可供应用程序直接使用的结构化数据。</span></p>

<p id="t-teC2t5JGXvnPG0SvCysam8"><span>LangChain 的</span><span style="border-bottom:1px solid;font-weight:bold">create_agent</span><span>会自动处理结构化输出。用户设置他们期望的结构化输出模式（schema），当模型生成结构化数据时，它会被捕获、验证并返回到智能体状态的</span><span>'structured_response'</span><span>键中。</span></p>

<pre id="t-3EMqYDpRHWy3riU7MCgMjz"><code>def create_agent(
...
response_format: Union[
ToolStrategy[StructuredResponseT],
ProviderStrategy[StructuredResponseT],
type[StructuredResponseT],
None,
]</code></pre>


<a id="section-0732"></a>
## 响应格式 (Response format)

<a id="t-kTTxykKotebxOR5LzVWPp4"></a>

<p id="t-wYcb7CUoRSEgyePp7pYqRb"><span>使用</span><span>response_format</span><span>来控制智能体如何返回结构化数据：</span></p>

<ul><li id="t-Qvdby8M0P8uRadHJDdl5WS"><span style="font-weight:bold">ToolStrategy[StructuredResponseT]</span><span>：使用工具调用（tool calling）实现结构化输出</span></li></ul>

<ul><li id="t-Ak0GLepuXfzyifvFv1oCQT"><span style="font-weight:bold">ProviderStrategy[StructuredResponseT]</span><span>：使用提供商原生（provider-native）的结构化输出</span></li></ul>

<ul><li id="t-EpR7uVr0BOhIHphfPHfJZq"><span style="font-weight:bold">type[StructuredResponseT]</span><span>：模式类型 - 根据模型能力自动选择最佳策略</span></li></ul>

<ul><li id="t-FJ34X9gGhPBPTWgtvHxetC"><span style="font-weight:bold">None</span><span>：未明确请求结构化输出</span></li></ul>

<p id="t-K8mrnZcsWweIIeUqeRdT3L"><span>当直接提供模式类型时，LangChain 会自动选择：</span></p>

<ul><li id="t-YbADRXGMfNiJMlRONKoR33"><span>如果所选模型和提供商支持原生结构化输出（例如 </span><span style="border-bottom:1px solid;font-weight:bold">OpenAI</span><span>、</span><span style="border-bottom:1px solid;font-weight:bold">Anthropic (Claude)</span><span> 或 </span><span style="border-bottom:1px solid;font-weight:bold">xAI (Grok)</span><span>），则使用 </span><span>ProviderStrategy</span><span>。</span></li></ul>

<ul><li id="t-s1ByYj1T3EfNpw7ZIZ0boY"><span>对于所有其他模型，使用</span><span>ToolStrategy</span><span>。</span></li></ul>

<p id="t-nJeYCdl9Or9pf5YgVCK6ZM"><span>如果使用 </span><span>langchain&gt;=1.1</span><span>，对原生结构化输出功能的支持会从模型的</span><span style="border-bottom:1px solid;font-weight:bold">配置文件数据</span><span>中动态读取。如果数据不可用，请使用其他条件或手动指定：</span></p>

<pre id="t-izUkJ5VqQ9Jo1mRns8IZXV"><code>custom_profile = {
"structured_output": True,
# ...
}
model = init_chat_model("...", profile=custom_profile)</code></pre>

<p id="t-jeGIjrsErOqHNodJHMyMFh"><span>如果指定了工具，模型必须同时支持工具和结构化输出。</span></p>

<p id="t-EssM5jiDjaUOaFiDxl0Bh3"><span>结构化响应会返回到智能体最终状态的</span><span>structured_response</span><span>键中。</span></p>


<a id="section-0733"></a>
## 提供商策略 (Provider strategy)

<a id="t-0ndOKPJVRA52jjtgAxOsKV"></a>

<p id="t-QdiClGqSbZxCfLbNt01psJ"><span>一些模型提供商通过其 API 原生支持结构化输出（例如 OpenAI、xAI (Grok)、Gemini、Anthropic (Claude)）。当可用时，这是最可靠的方法。</span></p>

<p id="t-ExrDjnWZOCPKTEn3ngJLKC"><span>要使用此策略，请配置一个</span><span>ProviderStrategy</span><span>：</span></p>

<pre id="t-Pw6wlIx1X2gr07NWfLavd7"><code>class ProviderStrategy(Generic[SchemaT]):
schema: type[SchemaT]
strict: bool | None = None</code></pre>

<p id="t-GxcZnIXeobSBkoc6xGBmow"><span>strict</span><span>参数需要</span><span>langchain&gt;=1.2</span><span>。</span></p>

<p id="t-9ZwxI2GQQ8Z9nCWBPbQEOC"><span style="font-weight:bold">schema</span><span style="font-weight:bold">required</span></p>

<p id="t-R1CXjwu4z0yA4ZmMbKNYH2"><span>定义结构化输出格式的模式。支持： -</span><span style="font-weight:bold">Pydantic 模型</span><span>：具有字段验证的</span><span>BaseModel</span><span>子类。返回经过验证的 Pydantic 实例。 -</span><span style="font-weight:bold">数据类</span><span>：带有类型注解的 Python 数据类。返回字典。 -</span><span style="font-weight:bold">TypedDict</span><span>：类型化字典类。返回字典。 -</span><span style="font-weight:bold">JSON 模式</span><span>：包含 JSON 模式规范的字典。返回字典。</span></p>

<p id="t-KAhZVLDHyLoytrpzzr8iYH"><span style="font-weight:bold">strict</span></p>

<p id="t-UYA3YBGXofZ9rLR8nkaDkF"><span>可选的布尔参数，用于启用严格的模式遵循。某些提供商支持此功能（例如，</span><span style="border-bottom:1px solid;font-weight:bold">OpenAI</span><span> 和 </span><span style="border-bottom:1px solid;font-weight:bold">xAI</span><span>）。默认为 </span><span>None</span><span>（禁用）。</span></p>

<p id="t-d96marSYxUkjnxyZsWEBeW"><span>当你直接将模式类型传递给 </span><span style="border-bottom:1px solid;font-weight:bold">create_agent.response_format</span><span> 并且模型支持原生结构化输出时，LangChain 会自动使用 </span><span>ProviderStrategy</span><span>：</span></p>

<pre id="t-G4RbgscThOfp8vmzt3DlPR"><code>from pydantic import BaseModel, Field
from langchain.agents import create_agent

class ContactInfo(BaseModel):
"""人员的联系信息。"""
name: str = Field(description="人员姓名")
email: str = Field(description="人员的电子邮件地址")
phone: str = Field(description="人员的电话号码")

agent = create_agent(
model="gpt-5",
response_format=ContactInfo  # 自动选择 ProviderStrategy
)

result = agent.invoke({
"messages": [{"role": "user", "content": "从以下内容提取联系信息：John Doe, john@example.com, (555) 123-4567"}]
})

print(result["structured_response"])
# ContactInfo(name='John Doe', email='john@example.com', phone='(555) 123-4567')</code></pre>

<p id="t-wboxgjiMlGEOidMiitUvcG"><span>提供商原生结构化输出提供了高可靠性和严格的验证，因为模型提供商会强制执行模式。在可用时请使用它。</span></p>

<p id="t-ExLuINrX0hUq4KogkyYQKj"><span>如果提供商原生支持你选择的模型的结构化输出，那么写</span><span>response_format=ProductReview</span><span>与写</span><span>response_format=ProviderStrategy(ProductReview)</span><span>在功能上是等效的。</span></p>

<p id="t-7vmH4W7VfLBtmKqPrO1Cgl"><span>无论哪种情况，如果不支持结构化输出，智能体将回退到工具调用策略。</span></p>


<a id="section-0734"></a>
## 工具调用策略 (Tool calling strategy)

<a id="t-JNblhWl6L1M3owaglCnJct"></a>

<p id="t-aXoJuOgP6WJGZXFj1GPVHD"><span>对于不支持原生结构化输出的模型，LangChain 使用工具调用来实现相同的结果。这适用于所有支持工具调用的模型（大多数现代模型）。</span></p>

<p id="t-6lntK0b9arngUdixrpLbdd"><span>要使用此策略，请配置一个</span><span>ToolStrategy</span><span>：</span></p>

<pre id="t-fdhpgNiucZHZOoRBQ6kNpI"><code>class ToolStrategy(Generic[SchemaT]):
schema: type[SchemaT]
tool_message_content: str | None
handle_errors: Union[
bool,
str,
type[Exception],
tuple[type[Exception], ...],
Callable[[Exception], str],
]</code></pre>

<p id="t-iUn5Uj2rCFZyeLgRB07SGc"><span style="font-weight:bold">schema</span><span style="font-weight:bold">required</span></p>

<p id="t-RnhtOrrOnmGF58MknStHGc"><span>定义结构化输出格式的模式。支持： -</span><span style="font-weight:bold">Pydantic 模型</span><span>：具有字段验证的</span><span>BaseModel</span><span>子类。返回经过验证的 Pydantic 实例。 -</span><span style="font-weight:bold">数据类</span><span>：带有类型注解的 Python 数据类。返回字典。 -</span><span style="font-weight:bold">TypedDict</span><span>：类型化字典类。返回字典。 -</span><span style="font-weight:bold">JSON 模式</span><span>：包含 JSON 模式规范的字典。返回字典。 -</span><span style="font-weight:bold">联合类型</span><span>：多个模式选项。模型将根据上下文选择最合适的模式。</span></p>

<p id="t-NOGh7SjqeuhDZXdxYbyVnS"><span style="font-weight:bold">tool_message_content</span></p>

<p id="t-80RGIMjicoxPJ2Afm8NNBv"><span>生成结构化输出时返回的工具消息的自定义内容。 如果未提供，则默认为显示结构化响应数据的消息。</span></p>

<p id="t-miR1l7USDMKE7IoNHFTWy9"><span style="font-weight:bold">handle_errors</span></p>

<p id="t-S138M08PrvLRvDoKnctvMW"><span>结构化输出验证失败时的错误处理策略。默认为</span><span>True</span><span>。</span></p>

<pre id="t-0nF0D28DVqN7Qv6LrQy0nv"><code>- &lt;strong&gt;`True`&lt;/strong&gt;：捕获所有错误并使用默认错误模板
- &lt;strong&gt;`str`&lt;/strong&gt;：捕获所有错误并使用此自定义消息
- &lt;strong&gt;`type[Exception]`&lt;/strong&gt;：仅捕获此异常类型并使用默认消息
- &lt;strong&gt;`tuple[type[Exception], ...]`&lt;/strong&gt;：仅捕获这些异常类型并使用默认消息
- &lt;strong&gt;`Callable[[Exception], str]`&lt;/strong&gt;：返回错误消息的自定义函数
- &lt;strong&gt;`False`&lt;/strong&gt;：不重试，让异常传播
</code></pre>

<pre id="t-XCkz7YsAKkyxy3NaF3948T"><code>from pydantic import BaseModel, Field
from typing import Literal
from langchain.agents import create_agent
from langchain.agents.structured_output import ToolStrategy

class ProductReview(BaseModel):
"""产品评论分析。"""
rating: int | None = Field(description="产品评分", ge=1, le=5)
sentiment: Literal["positive", "negative"] = Field(description="评论的情感倾向")
key_points: list[str] = Field(description="评论的要点。小写，每个1-3个词。")

agent = create_agent(
model="gpt-5",
tools=tools,
response_format=ToolStrategy(ProductReview)
)

result = agent.invoke({
"messages": [{"role": "user", "content": "分析此评论：'很棒的产品：5星。发货快，但价格贵'"}]
})
result["structured_response"]
# ProductReview(rating=5, sentiment='positive', key_points=['fast shipping', 'expensive'])</code></pre>


<a id="section-0735"></a>
## 自定义工具消息内容 (Custom tool message content)

<a id="t-yhUU3hcmtYo7huwDo9YEkn"></a>

<p id="t-dZrZvjD0gZdFi4INDl4Pz1"><span>tool_message_content</span><span>参数允许你自定义生成结构化输出时出现在对话历史中的消息：</span></p>

<pre id="t-QhUxZHjJeyInsV5zJO4RC1"><code>from pydantic import BaseModel, Field
from typing import Literal
from langchain.agents import create_agent
from langchain.agents.structured_output import ToolStrategy

class MeetingAction(BaseModel):
"""从会议转录中提取的操作项。"""
task: str = Field(description="要完成的具体任务")
assignee: str = Field(description="负责该任务的人员")
priority: Literal["low", "medium", "high"] = Field(description="优先级")

agent = create_agent(
model="gpt-5",
tools=[],
response_format=ToolStrategy(
schema=MeetingAction,
tool_message_content="操作项已捕获并添加到会议记录中！"
)
)

agent.invoke({
"messages": [{"role": "user", "content": "来自我们的会议：Sarah 需要尽快更新项目时间表"}]
})</code></pre>

<pre id="t-rpJUaarYlKvilMyfxEXQE2"><code>================================ Human Message =================================

来自我们的会议：Sarah 需要尽快更新项目时间表
================================== Ai Message ==================================
Tool Calls:
MeetingAction (call_1)
Call ID: call_1
Args:
task: 更新项目时间表
assignee: Sarah
priority: high
================================= Tool Message =================================
Name: MeetingAction

操作项已捕获并添加到会议记录中！</code></pre>

<p id="t-iCTcjY8b699GCFagm0bSVC"><span>如果没有</span><span>tool_message_content</span><span>，我们最终的</span><span style="border-bottom:1px solid;font-weight:bold">ToolMessage</span><span>将是：</span></p>

<pre id="t-Ak4U396DP77Wb4uebI2Vib"><code>================================= Tool Message =================================
Name: MeetingAction

Returning structured response: {'task': 'update the project timeline', 'assignee': 'Sarah', 'priority': 'high'}</code></pre>


<a id="section-0736"></a>
## 错误处理 (Error handling)

<a id="t-S6YwaA2QcxvxKwio0t5LMa"></a>

<p id="t-Nn7cxw0sqCn8lfnmbrLUXm"><span>模型通过工具调用生成结构化输出时可能会出错。LangChain 提供了智能重试机制来自动处理这些错误。</span></p>

<a id="t-ULqTOEFRjGCgkHZVRfT411"></a>

##### 多个结构化输出错误 (Multiple structured outputs error)

<p id="t-gz4FgpGteO11G4xQfyHwU3"><span>当模型错误地调用了多个结构化输出工具时，智能体会提供</span><span style="border-bottom:1px solid;font-weight:bold">ToolMessage</span><span>形式的错误反馈，并提示模型重试：</span></p>

<pre id="t-PHlNPaSxTgW2agolneugDJ"><code>from pydantic import BaseModel, Field
from typing import Union
from langchain.agents import create_agent
from langchain.agents.structured_output import ToolStrategy

class ContactInfo(BaseModel):
name: str = Field(description="人员姓名")
email: str = Field(description="电子邮件地址")

class EventDetails(BaseModel):
event_name: str = Field(description="活动名称")
date: str = Field(description="活动日期")

agent = create_agent(
model="gpt-5",
tools=[],
response_format=ToolStrategy(Union[ContactInfo, EventDetails]) # 默认：handle_errors=True
)

agent.invoke({
"messages": [{"role": "user", "content": "提取信息：John Doe (john@email.com) 正在组织 3 月 15 日的技术会议"}]
})</code></pre>

<pre id="t-0RxbZtCp1N79GJXsqFJfvU"><code>================================ Human Message =================================

提取信息：John Doe (john@email.com) 正在组织 3 月 15 日的技术会议
None
================================== Ai Message ==================================
Tool Calls:
ContactInfo (call_1)
Call ID: call_1
Args:
name: John Doe
email: john@email.com
EventDetails (call_2)
Call ID: call_2
Args:
event_name: 技术会议
date: March 15th
================================= Tool Message =================================
Name: ContactInfo

Error: 模型错误地返回了多个结构化响应 (ContactInfo, EventDetails)，而预期只有一个。
请纠正你的错误。
================================= Tool Message =================================
Name: EventDetails

Error: 模型错误地返回了多个结构化响应 (ContactInfo, EventDetails)，而预期只有一个。
请纠正你的错误。
================================== Ai Message ==================================
Tool Calls:
ContactInfo (call_3)
Call ID: call_3
Args:
name: John Doe
email: john@email.com
================================= Tool Message =================================
Name: ContactInfo

Returning structured response: {'name': 'John Doe', 'email': 'john@email.com'}</code></pre>

<a id="t-kk7zGtBGHQ7mKpbaUe56zm"></a>

##### Schema validation error

<p id="t-AAtcULpzyWasYe9t1dT3Lo"><span>When structured output doesn't match the expected schema, the agent provides specific error feedback:</span></p>

<pre id="t-8WPMQS0pB46CayUKgUakSK"><code>from pydantic import BaseModel, Field
from langchain.agents import create_agent
from langchain.agents.structured_output import ToolStrategy

class ProductRating(BaseModel):
rating: int | None = Field(description="Rating from 1-5", ge=1, le=5)
comment: str = Field(description="评论内容")

agent = create_agent(
model="gpt-5",
tools=[],
response_format=ToolStrategy(ProductRating), # 默认：handle_errors=True
system_prompt="你是一个帮助解析产品评论的助手。不要编造任何字段或值。"
)

agent.invoke({
"messages": [{"role": "user", "content": "解析此内容：Amazing product, 10/10!"}]
})</code></pre>

<pre id="t-2qlau5GI9Iuh4tYGEvw23t"><code>================================ Human Message =================================

解析此内容：Amazing product, 10/10!
================================== Ai Message ==================================
Tool Calls:
ProductRating (call_1)
Call ID: call_1
Args:
rating: 10
comment: Amazing product
================================= Tool Message =================================
Name: ProductRating

Error: 解析工具 'ProductRating' 的结构化输出失败：ProductRating.rating 存在 1 个验证错误
Input should be less than or equal to 5 [type=less_than_equal, input_value=10, input_type=int]。
请纠正你的错误。
================================== Ai Message ==================================
Tool Calls:
ProductRating (call_2)
Call ID: call_2
Args:
rating: 5
comment: Amazing product
================================= Tool Message =================================
Name: ProductRating

Returning structured response: {'rating': 5, 'comment': 'Amazing product'}</code></pre>

<a id="t-qEQuuHUTdH1q0CAZMyvyLD"></a>

##### 错误处理策略 (Error handling strategies)

<p id="t-BUWCDpWiC0zGyd0R29ZDOY"><span>你可以使用</span><span>handle_errors</span><span>参数自定义错误的处理方式：</span></p>

<p id="t-IkSeGupjqyz2MVWW06Z5rC"><span style="font-weight:bold">自定义错误消息：</span></p>

<pre id="t-FGYZwbPTYVHHOn7kGxXTvP"><code>ToolStrategy(
schema=ProductRating,
handle_errors="请提供 1-5 之间的有效评分并包含评论。"
)</code></pre>

<p id="t-MgkQwQb8YXqeH4LmhXLeOe"><span>如果</span><span>handle_errors</span><span>是字符串，智能体将</span><span style="font-style:italic">始终</span><span>提示模型使用固定的工具消息重试：</span></p>

<pre id="t-TF2yLcljlyjagwGArpsZCh"><code>================================= Tool Message =================================
Name: ProductRating

请提供 1-5 之间的有效评分并包含评论。</code></pre>

<p id="t-vTwlAhGURsSaiU6EAkg5Q8"><span style="font-weight:bold">仅处理特定异常：</span></p>

<pre id="t-S05cMA1qwVvVm1mqH3Pb04"><code>ToolStrategy(
schema=ProductRating,
handle_errors=ValueError  # 仅在发生 ValueError 时重试，抛出其他异常
)</code></pre>

<p id="t-sw8t0PIMfYzl7HC32fihBO"><span>如果</span><span>handle_errors</span><span>是异常类型，则仅当抛出的异常是指定类型时，智能体才会重试（使用默认错误消息）。在所有其他情况下，异常将被抛出。</span></p>

<p id="t-K2EVXTVvMo4CcikzwQjzdw"><span style="font-weight:bold">处理多种异常类型：</span></p>

<pre id="t-ekhkgpzLuTwb6l4d56Aj3c"><code>ToolStrategy(
schema=ProductRating,
handle_errors=(ValueError, TypeError) # 在发生 ValueError 和 TypeError 时重试
)</code></pre>

<p id="t-bLNeIzWq6P0fXz7rXQr2hN"><span>如果</span><span>handle_errors</span><span>是异常元组，则仅当抛出的异常是指定类型之一时，智能体才会重试（使用默认错误消息）。在所有其他情况下，异常将被抛出。</span></p>

<p id="t-kH6lVLN4xeIrxUlqC2MJvP"><span style="font-weight:bold">自定义错误处理函数：</span></p>

<pre id="t-YAsIKGmiGbj0wzeo3Qey9J"><code>from langchain.agents.structured_output import StructuredOutputValidationError
from langchain.agents.structured_output import MultipleStructuredOutputsError

def custom_error_handler(error: Exception) -&gt; str:
if isinstance(error, StructuredOutputValidationError):
return "格式存在问题。请再试一次。"
elif isinstance(error, MultipleStructuredOutputsError):
return "返回了多个结构化输出。请选择最相关的一个。"
else:
return f"错误：{str(error)}"

agent = create_agent(
model="gpt-5",
tools=[],
response_format=ToolStrategy(
schema=Union[ContactInfo, EventDetails],
handle_errors=custom_error_handler
) # 默认：handle_errors=True
)

result = agent.invoke({
"messages": [{"role": "user", "content": "提取信息：John Doe (john@email.com) 正在组织 3 月 15 日的技术会议"}]
})

for msg in result['messages']:
# 如果消息实际上是 ToolMessage 对象（不是字典），检查其类名
if type(msg).__name__ == "ToolMessage":
print(msg.content)
# 如果消息是字典或你想要备选方案
elif isinstance(msg, dict) and msg.get('tool_call_id'):
print(msg['content'])</code></pre>

<p id="t-TBi4yUNhiX7ez4F7ihI48x"><span>发生</span><span>StructuredOutputValidationError</span><span>时：</span></p>

<pre id="t-qGEqUUHMp84bmMs9Rb1itq"><code>================================= Tool Message =================================
Name: ToolStrategy

格式存在问题。请再试一次。</code></pre>

<p id="t-uvIsCWhugoOIAijODLxbPI"><span>发生</span><span>MultipleStructuredOutputsError</span><span>时：</span></p>

<pre id="t-VUW4KjJJnvOYHrgYxmMZCO"><code>================================= Tool Message =================================
Name: ToolStrategy

返回了多个结构化输出。请选择最相关的一个。</code></pre>

<p id="t-4HxfrP3A7ZgzQneaPVCuxP"><span>发生其他错误时：</span></p>

<pre id="t-3hFddocPx9twk4XB4kfVdj"><code>================================= Tool Message =================================
Name: ToolStrategy

错误：&lt;错误消息&gt;</code></pre>

<p id="t-YsSpfS9BccgZh2DH1QvZ2L"><span style="font-weight:bold">无错误处理：</span></p>

<pre id="t-pRTy5ZltmqL0AZqkKpKEi0"><code>response_format = ToolStrategy(
schema=ProductRating,
handle_errors=False # 抛出所有错误
)</code></pre>


<a id="section-0739"></a>
## 概述

<a id="t-block-16804"></a>

<p id="t-WwIuJq8hKKwDBlQr3lZ9uT"><span style="background-color:transparent">中间件提供了一种更精细控制智能体内部行为的方式。中间件在以下场景中非常有用：</span></p>

<ul><li id="t-SaogRS3AdSXBOnU7NLHO1d"><span>通过日志记录、分析和调试来追踪智能体行为。</span></li></ul>

<ul><li id="t-iVie8UePoL8qubF8OGnTQf"><span>转换提示、</span><span style="border-bottom:1px solid;font-weight:bold">工具选择</span><span>和输出格式。</span></li></ul>

<ul><li id="t-lYwU2ZJiSee4xLJN8HEROZ"><span>添加</span><span style="border-bottom:1px solid;font-weight:bold">重试</span><span>、</span><span style="border-bottom:1px solid;font-weight:bold">回退</span><span>和提前终止逻辑。</span></li></ul>

<ul><li id="t-aybnJfrdnQ460x2fm0e7rT"><span>应用</span><span style="border-bottom:1px solid;font-weight:bold">速率限制</span><span>、护栏和</span><span style="border-bottom:1px solid;font-weight:bold">PII检测</span><span>。</span></li></ul>

<p id="t-neYlDY7qWzk9nZLnRXUx04"><span style="background-color:transparent">通过传递给</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">create_agent</span><span style="background-color:transparent">来添加中间件：</span></p>

<pre id="t-gDIDLXNWKUxFao7YtexUFz"><code>from langchain.agents import create_agent
from langchain.agents.middleware import SummarizationMiddleware, HumanInTheLoopMiddleware

agent = create_agent(
model="gpt-4o",
tools=[...],
middleware=[
SummarizationMiddleware(...),
HumanInTheLoopMiddleware(...)
],
)</code></pre>


<a id="section-0740"></a>
## 智能体循环

<a id="t-1asCqhgDeHTB2plM5s1K2z"></a>

<p id="t-LikK6sTCZgigCzRd5iIMEw"><span style="background-color:transparent">核心的智能体循环包括调用模型、让其选择要执行的工具，并在其不再调用工具时结束：</span></p>

<div id="t-QiEKpBYDuIgcTBLou8sWT1"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/81b9cd85fcdca947f5e50962.png"/></div>

<p id="t-SzwjihYAdQXu9j49WYBhXg"><span style="background-color:transparent">中间件在每个步骤之前和之后暴露了钩子：</span></p>

<div id="t-D5uQfHdNtOP79Ah0ITXrjt"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/7288281581283198922f6d6a.png"/></div>


<a id="section-0741"></a>
## 其他资源

<a id="t-okNLU99FPTBHiHna8Wf089"></a>

<div id="t-sKbB3vfIZqTVFNGpIGPQRP"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/8c948e3260f770f2978a0f49.png"/></div>


<a id="section-0742"></a>
## 自定义中间件

<a id="t-block-16821"></a>

<p id="t-G3f3YPaKP5bCGFg8b7J5ui"><span style="background-color:transparent">通过实现钩子（hooks）在智能体执行流程的特定节点运行，来构建自定义中间件。</span></p>


<a id="section-0743"></a>
## 钩子

<a id="t-vfUmEAntoL2Q2V8U8hnMnv"></a>

<p id="t-xeilSgz5YgPDc9gdNq6CaO"><span style="background-color:transparent">中间件提供了两种风格的钩子来拦截智能体执行：</span></p>

<div id="t-xfH7Cw1EPa6vaYCY4OGWQI"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/4453542bb7829938aa0a97bf.png"/></div>


<a id="section-0744"></a>
## 节点式钩子

<a id="t-V66y19tgld4VSyLArdtJNM"></a>

<p id="t-wEjRSpDlSujN9rcTfFyH9E"><span style="background-color:transparent">在特定的执行节点顺序运行。用于日志记录、验证和状态更新。</span></p>

<p id="t-eFXJsYu6uxaxejKD1bXj9e"><span style="font-weight:bold;background-color:transparent">可用钩子：</span></p>

<ul><li id="t-nJzTUAgKlGLkR6c0YV5oPQ"><span>before_agent</span><span>- 在智能体启动前（每次调用一次）</span></li></ul>

<ul><li id="t-UUSrqLIPpsSTBrCW1xl6ue"><span>before_model</span><span>- 在每次模型调用前</span></li></ul>

<ul><li id="t-krBslO7tMDON3ZKAXCVQ4Z"><span>after_model</span><span>- 在每次模型响应后</span></li></ul>

<ul><li id="t-X1sWGERNi0r3nFTLQyJofW"><span>after_agent</span><span>- 在智能体完成后（每次调用一次）</span></li></ul>

<p id="t-ppIyKqtxyH5LuY6PKyjKho"><span style="font-weight:bold;background-color:transparent">示例：</span></p>

<pre id="t-0zPKRy73S9caei9DaLkzf8"><code>from langchain.agents.middleware import before_model, after_model, AgentState
from langchain.messages import AIMessage
from langgraph.runtime import Runtime
from typing import Any

@before_model(can_jump_to=["end"])
def check_message_limit(state: AgentState, runtime: Runtime) -&gt; dict[str, Any] | None:
 if len(state["messages"]) &gt;= 50:
 return {
 "messages": [AIMessage("Conversation limit reached.")],
 "jump_to": "end"
 }
 return None

@after_model
def log_response(state: AgentState, runtime: Runtime) -&gt; dict[str, Any] | None:
 print(f"Model returned: {state['messages'][-1].content}")
 return None</code></pre>


<a id="section-0745"></a>
## 包装式钩子

<a id="t-g3ZPtVWAmItWgYCk5OfVA3"></a>

<p id="t-wlaBKMepwXpGj0vJugv7i5"><span style="background-color:transparent">拦截执行并控制何时调用处理器。用于重试、缓存和转换。</span></p>

<p id="t-lsfIEVoafbvD0WVWrKXP2d"><span style="background-color:transparent">你可以决定处理器被调用零次（短路）、一次（正常流程）或多次（重试逻辑）。</span></p>

<p id="t-tZh2M12Ck8xdcr1qLHQX59"><span style="font-weight:bold;background-color:transparent">可用钩子：</span></p>

<ul><li id="t-36k8DtRzSnkBviPV7SClW0"><span>wrap_model_call</span><span>- 围绕每次模型调用</span></li></ul>

<ul><li id="t-J1HX0OfSz7T3xCrNITBIBi"><span>wrap_tool_call</span><span>- 围绕每次工具调用</span></li></ul>

<p id="t-09yCGPOXovoL6Tk9xjHORg"><span style="font-weight:bold;background-color:transparent">示例：</span></p>

<pre id="t-56Z9K80aqOcUO6NGYQISx1"><code>from langchain.agents.middleware import wrap_model_call, ModelRequest, ModelResponse
from typing import Callable

@wrap_model_call
def retry_model(
    request: ModelRequest,
    handler: Callable[[ModelRequest], ModelResponse],
) -&gt; ModelResponse:
 for attempt in range(3):
 try:
 return handler(request)
 except Exception as e:
 if attempt == 2:
 raise
 print(f"Retry {attempt + 1}/3 after error: {e}")</code></pre>


<a id="section-0746"></a>
## 创建中间件

<a id="t-bCAKYOOK8kDYNEFlnYxIyy"></a>

<p id="t-q8zTWNA2RS1ZOuAHDHIBm0"><span style="background-color:transparent">你可以通过两种方式创建中间件：</span></p>

<div id="t-nIHzodeqQPKUqrjLF1RlcM"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/c8c4273775c8f6c7271e0bac.png"/></div>


<a id="section-0747"></a>
## 基于装饰器的中间件

<a id="t-19CPHSnwi8hHlGzk94dkkF"></a>

<p id="t-0JeCNGonFuSPwIeBE17Z6F"><span style="background-color:transparent">对于单钩子中间件，快速且简单。使用装饰器包装单个函数。</span></p>

<p id="t-8FT84ZRxSFN2utLyyzSFNI"><span style="font-weight:bold;background-color:transparent">可用装饰器：</span></p>

<p id="t-fcIJloUqsWPHeXsEX9LjuP"><span style="font-weight:bold;background-color:transparent">节点式：</span></p>

<ul><li id="t-4xURPsOEYz7rhrNoOat4UA"><span style="border-bottom:1px solid;font-weight:bold">@before_agent</span><span>- 在智能体启动前运行（每次调用一次）</span></li></ul>

<ul><li id="t-atCIQyJmY7qanGyhOrHFFf"><span style="border-bottom:1px solid;font-weight:bold">@before_model</span><span>- 在每次模型调用前运行</span></li></ul>

<ul><li id="t-2Dr7RX4o92YUuBz9eluKKe"><span style="border-bottom:1px solid;font-weight:bold">@after_model</span><span>- 在每次模型响应后运行</span></li></ul>

<ul><li id="t-ORv87dgEhNNi1fQsbJ2Xcs"><span style="border-bottom:1px solid;font-weight:bold">@after_agent</span><span>- 在智能体完成后运行（每次调用一次）</span></li></ul>

<p id="t-brJIxTWm7LRYVXtq0gWJ9L"><span style="font-weight:bold;background-color:transparent">包装式：</span></p>

<ul><li id="t-esqc7FPeI8N5FMObYLslMb"><span style="border-bottom:1px solid;font-weight:bold">@wrap_model_call</span><span>- 用自定义逻辑包装每次模型调用</span></li></ul>

<ul><li id="t-WscvCFTl7HHXs3CB2uLuwF"><span style="border-bottom:1px solid;font-weight:bold">@wrap_tool_call</span><span>- 用自定义逻辑包装每次工具调用</span></li></ul>

<p id="t-tOyNLU8hibgU2cLrzKxYzn"><span style="font-weight:bold;background-color:transparent">便捷功能：</span></p>

<ul><li id="t-J52Ce7baycNFWzHRvCrpdm"><span style="border-bottom:1px solid;font-weight:bold">@dynamic_prompt</span><span>- 生成动态系统提示词</span></li></ul>

<p id="t-HRQB4Xsl2YnTx5HSy92Lf8"><span style="font-weight:bold;background-color:transparent">示例：</span></p>

<pre id="t-uMadcBy8F535U6LS3aXU3O"><code>from langchain.agents.middleware import (
    before_model,
    wrap_model_call,
    AgentState,
    ModelRequest,
    ModelResponse,
)
from langchain.agents import create_agent
from langgraph.runtime import Runtime
from typing import Any, Callable

@before_model
def log_before_model(state: AgentState, runtime: Runtime) -&gt; dict[str, Any] | None:
 print(f"About to call model with {len(state['messages'])} messages")
 return None

@wrap_model_call
def retry_model(
    request: ModelRequest,
    handler: Callable[[ModelRequest], ModelResponse],
) -&gt; ModelResponse:
 for attempt in range(3):
 try:
 return handler(request)
 except Exception as e:
 if attempt == 2:
 raise
 print(f"Retry {attempt + 1}/3 after error: {e}")

agent = create_agent(
    model="gpt-4o",
    middleware=[log_before_model, retry_model],
    tools=[...],
)</code></pre>

<p id="t-4JxJdrSBE9sMJKsgoMHg9F"><span style="font-weight:bold;background-color:transparent">何时使用装饰器：</span></p>

<ul><li id="t-rjHOFSTgbw1Fbho7Ag0C7q"><span>需要单个钩子</span></li></ul>

<ul><li id="t-DNqyDtvA75xKCKLh8uB26p"><span>没有复杂配置</span></li></ul>

<ul><li id="t-HyqSDCBq1wmtW47gvCp9XT"><span>快速原型设计</span></li></ul>


<a id="section-0748"></a>
## 基于类的中间件

<a id="t-BhLuUfJEhH4XDnoGnBxMPk"></a>

<p id="t-XofKTe1FePY5fIS72ssW3s"><span style="background-color:transparent">对于具有多个钩子或配置的复杂中间件，功能更强大。当你需要为同一个钩子定义同步和异步实现，或者想在单个中间件中组合多个钩子时，请使用类。</span></p>

<p id="t-Ubknr0qpxbXELmNAKj2EhN"><span style="font-weight:bold;background-color:transparent">示例：</span></p>

<pre id="t-hntOotU6cFS4ywR4gEkGmr"><code>from langchain.agents.middleware import (
    AgentMiddleware,
    AgentState,
    ModelRequest,
    ModelResponse,
)
from langgraph.runtime import Runtime
from typing import Any, Callable

class LoggingMiddleware(AgentMiddleware):
 def before_model(self, state: AgentState, runtime: Runtime) -&gt; dict[str, Any] | None:
 print(f"About to call model with {len(state['messages'])} messages")
 return None

 def after_model(self, state: AgentState, runtime: Runtime) -&gt; dict[str, Any] | None:
 print(f"Model returned: {state['messages'][-1].content}")
 return None

agent = create_agent(
    model="gpt-4o",
    middleware=[LoggingMiddleware()],
    tools=[...],
)</code></pre>

<p id="t-DkVxEpYXx837VdgYor0abX"><span style="font-weight:bold;background-color:transparent">何时使用类：</span></p>

<ul><li id="t-d5UkgsyzGwy3G2p3u9pjLC"><span>为同一个钩子定义同步和异步实现</span></li></ul>

<ul><li id="t-fZ78RiAnyusUtsmUHU6L8o"><span>单个中间件中需要多个钩子</span></li></ul>

<ul><li id="t-5dQ0M6dpYh25bakonnwkyc"><span>需要复杂配置（例如，可配置的阈值、自定义模型）</span></li></ul>

<ul><li id="t-I3J6qgVnlm376P9rUoE5Il"><span>通过初始化时配置在项目间复用</span></li></ul>


<a id="section-0749"></a>
## 自定义状态模式

<a id="t-hSXLlCAouqjTgQ5Q4S1muj"></a>

<p id="t-0yQn16imqNBhNloele6lwQ"><span style="background-color:transparent">中间件可以使用自定义属性扩展智能体的状态。这使得中间件能够：</span></p>

<ul><li id="t-3ZppXLK3Pn54wrDvqBEPjG"><span style="font-weight:bold">跨执行跟踪状态</span><span>：维护在整个智能体执行生命周期中持续存在的计数器、标志或其他值</span></li></ul>

<ul><li id="t-GLP6PzxuIRj2l7VjviwTkK"><span style="font-weight:bold">在钩子间共享数据</span><span>：将信息从</span><span>before_model</span><span>传递到</span><span>after_model</span><span>，或在不同的中间件实例之间传递</span></li></ul>

<ul><li id="t-pKmk5bEorceHFbxnuOXLsk"><span style="font-weight:bold">实现横切关注点</span><span>：添加如速率限制、使用情况跟踪、用户上下文或审计日志等功能，而无需修改核心智能体逻辑</span></li></ul>

<ul><li id="t-CryGrNV0RBH6fUocAMhMyN"><span style="font-weight:bold">做出条件决策</span><span>：使用累积的状态来决定是否继续执行、跳转到不同节点或动态修改行为</span></li></ul>

<pre id="t-HEL0rYkwapcXM7zLAsYtPO"><code>from langchain.agents import create_agent
from langchain.messages import HumanMessage
from langchain.agents.middleware import AgentState, before_model, after_model
from typing_extensions import NotRequired
from typing import Any
from langgraph.runtime import Runtime

class CustomState(AgentState):
    model_call_count: NotRequired[int]
    user_id: NotRequired[str]

@before_model(state_schema=CustomState, can_jump_to=["end"])
def check_call_limit(state: CustomState, runtime: Runtime) -&gt; dict[str, Any] | None:
    count = state.get("model_call_count", 0)
 if count &gt; 10:
 return {"jump_to": "end"}
 return None

@after_model(state_schema=CustomState)
def increment_counter(state: CustomState, runtime: Runtime) -&gt; dict[str, Any] | None:
 return {"model_call_count": state.get("model_call_count", 0) + 1}

agent = create_agent(
    model="gpt-4o",
    middleware=[check_call_limit, increment_counter],
    tools=[],
)

# 使用自定义状态调用
result = agent.invoke({
 "messages": [HumanMessage("Hello")],
 "model_call_count": 0,
 "user_id": "user-123",
})</code></pre>

<p id="t-UV8kCPwyK77lRG7ldHf3YA"><span style="background-color:transparent">:::js</span></p>


<a id="section-0750"></a>
## 自定义上下文

<a id="t-ZdKhGLNS2mptTfd4ch7PLH"></a>

<p id="t-6N55yolZl98D6gDRHAMiC0"><span style="background-color:transparent">中间件可以定义自定义上下文模式来访问每次调用的元数据。与状态不同，上下文是只读的，不会在调用之间持久化。这使其非常适合：</span></p>

<ul><li id="t-kCs5M5xWPYUCGStPq25iV0"><span style="font-weight:bold">用户信息</span><span>：传递在执行期间不会改变的用户 ID、角色或偏好设置</span></li></ul>

<ul><li id="t-NcW14cPkSJZG1QNpAOhzBl"><span style="font-weight:bold">配置覆盖</span><span>：提供每次调用的设置，如速率限制或功能标志</span></li></ul>

<ul><li id="t-SzKQ6nANCwrFQDFbhI5kFN"><span style="font-weight:bold">租户/工作空间上下文</span><span>：为多租户应用程序包含组织特定的数据</span></li></ul>

<ul><li id="t-hycLNy5ynvfyRLrZFJ8QBc"><span style="font-weight:bold">请求元数据</span><span>：传递中间件所需的请求 ID、API 密钥或其他元数据</span></li></ul>

<p id="t-spb188gFQZt7chuIVlWHNd"><span style="background-color:transparent">使用 Zod 定义上下文模式，并通过中间件钩子中的</span><span style="background-color:transparent">runtime.context</span><span style="background-color:transparent">访问它。上下文模式中的必填字段将在 TypeScript 级别强制执行，确保在调用</span><span style="background-color:transparent">agent.invoke()</span><span style="background-color:transparent">时必须提供它们。</span></p>

<pre id="t-gbRagMh0j6eA7oSu2fUW1K"><code>import { createAgent, createMiddleware, HumanMessage } from "langchain";
import * as z from "zod";

const contextSchema = z.object({
  userId: z.string(),
  tenantId: z.string(),
  apiKey: z.string().optional(),
});

const userContextMiddleware = createMiddleware({
  name: "UserContextMiddleware",
  contextSchema,
  wrapModelCall: (request, handler) =&gt; {
 // 从运行时访问上下文
    const { userId, tenantId } = request.runtime.context;

 // 将用户上下文添加到系统消息
    const contextText = `User ID: ${userId}, Tenant: ${tenantId}`;
    const newSystemMessage = request.systemMessage.concat(contextText);

 return handler({
 ...request,
      systemMessage: newSystemMessage,
 });
 },
});

const agent = createAgent({
  model: "gpt-4o",
  middleware: [userContextMiddleware],
  tools: [],
  contextSchema,
});

const result = await agent.invoke(
 { messages: [new HumanMessage("Hello")] },
 // 必须提供必填字段 (userId, tenantId)
 {
    context: {
      userId: "user-123",
      tenantId: "acme-corp",
 },
 }
);</code></pre>

<p id="t-THMghoMIAJMN3U4Ud0pSsg"><span style="background-color:transparent">**必填上下文字段</span></p>


<a id="section-0751"></a>
## 内置中间件

<a id="t-block-16894"></a>

<p id="t-TxmUQsUjoTpXHupcT7kvFn"><span style="background-color:transparent">LangChain 为常见用例提供了预构建的中间件。每个中间件都是生产就绪的，并且可以根据您的具体需求进行配置。</span></p>


<a id="section-0752"></a>
## 与提供商无关的中间件

<a id="t-6IBT0wzLeBdhRP0SZMpelx"></a>

<p id="t-hChK0SO6WFmmQ5p6ptfy2f"><span style="background-color:transparent">以下中间件适用于任何 LLM 提供商：</span></p>

<div id="t-n5A0iDECvVrujMZp1kyG2U"><table><colgroup><col width="186.8975524902344"/><col width="397.89752197265625"/></colgroup><tbody><tr><td><p><span>中间件</span></p></td><td><p><span>描述</span></p></td></tr><tr><td><p><span style="font-weight:bold">摘要</span></p></td><td><p><span>在接近令牌限制时自动总结对话历史。</span></p></td></tr><tr><td><p><span style="font-weight:bold">人在回路</span></p></td><td><p><span>暂停执行以等待人工批准工具调用。</span></p></td></tr><tr><td><p><span style="font-weight:bold">模型调用限制</span></p></td><td><p><span>限制模型调用次数以防止成本过高。</span></p></td></tr><tr><td><p><span style="font-weight:bold">工具调用限制</span></p></td><td><p><span>通过限制调用次数来控制工具执行。</span></p></td></tr><tr><td><p><span style="font-weight:bold">模型回退</span></p></td><td><p><span>当主模型失败时自动回退到备用模型。</span></p></td></tr><tr><td><p><span style="font-weight:bold">PII 检测</span></p></td><td><p><span>检测和处理个人身份信息 (PII)。</span></p></td></tr><tr><td><p><span style="font-weight:bold">待办事项列表</span></p></td><td><p><span>为智能体配备任务规划和跟踪能力。</span></p></td></tr><tr><td><p><span style="font-weight:bold">LLM 工具选择器</span></p></td><td><p><span>在调用主模型之前使用 LLM 选择相关工具。</span></p></td></tr><tr><td><p><span style="font-weight:bold">工具重试</span></p></td><td><p><span>使用指数退避自动重试失败的工具调用。</span></p></td></tr><tr><td><p><span style="font-weight:bold">模型重试</span></p></td><td><p><span>使用指数退避自动重试失败的模型调用。</span></p></td></tr><tr><td><p><span style="font-weight:bold">LLM 工具模拟器</span></p></td><td><p><span>使用 LLM 模拟工具执行以进行测试。</span></p></td></tr><tr><td><p><span style="font-weight:bold">上下文编辑</span></p></td><td><p><span>通过修剪或清除工具使用来管理对话上下文。</span></p></td></tr><tr><td><p><span style="font-weight:bold">Shell 工具</span></p></td><td><p><span>向智能体暴露一个持久的 shell 会话以执行命令。</span></p></td></tr><tr><td><p><span style="font-weight:bold">文件搜索</span></p></td><td><p><span>提供对文件系统文件的 Glob 和 Grep 搜索工具。</span></p></td></tr></tbody></table></div>


<a id="section-0753"></a>
## 摘要

<a id="t-2Jcri3WsJx0ZjFrn403zIv"></a>

<p id="t-mna28cknkjHzwKsFSxGfIa"><span style="background-color:transparent">在接近令牌限制时自动总结对话历史，保留最近的消息同时压缩较旧的上下文。摘要适用于以下情况：</span></p>

<ul><li id="t-AQAKVjkAIhlYoZn6HttHqF"><span>超出上下文窗口的长时间运行对话。</span></li></ul>

<ul><li id="t-QmQ2uSRNvEyf5weGODafd1"><span>具有大量历史记录的多轮对话。</span></li></ul>

<ul><li id="t-AIpulGSQRU9OwZB0f07bXU"><span>需要保留完整对话上下文的应用。</span></li></ul>

<p id="t-5dHu8i6E7YddMA0ZTfXXqd"><span style="font-weight:bold;background-color:transparent">API 参考：</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">SummarizationMiddleware</span></p>

<pre id="t-m05kCz6tAGo3EgpMPR2pYX"><code>from langchain.agents import create_agent
from langchain.agents.middleware import SummarizationMiddleware

agent = create_agent(
model="gpt-4o",
tools=[your_weather_tool, your_calculator_tool],
middleware=[
SummarizationMiddleware(
model="gpt-4o-mini",
trigger=("tokens", 4000),
keep=("messages", 20),
),
],
)</code></pre>

<blockquote id="t-VDv8uwO5IyLMoaliN5bKDk"><img alt="" decoding="async" height="20" loading="lazy" src="/images/agent-learning/3fae26664cd6931b48fca853.svg" width="20"/><p id="t-0Ke0iHGXhhvmA09QJeLANu"><span style="font-weight:bold">配置选项</span></p>
<p id="t-6Tyd43RYx6JD7PIg1ZK0Me"><span>如果使用 </span><span>langchain&gt;=1.1</span><span>，</span><span>trigger</span><span> 和 </span><span>keep</span><span> 的 </span><span>fraction</span><span> 条件（如下所示）依赖于聊天模型的</span><span style="border-bottom:1px solid;font-weight:bold">配置文件数据</span><span>。如果数据不可用，请使用其他条件或手动指定：</span></p>
<pre id="t-E3p2Kmj2fp8xa4pem1Ukzs"><code>from langchain.chat_models import init_chat_model

custom_profile = {
"max_input_tokens": 100_000,
# ...
}
model = init_chat_model("gpt-4o", profile=custom_profile)</code></pre>
<p id="t-Qh4Sd6D3gJ1ARBdGbS5IDi"><span style="font-weight:bold">model</span><span>string | BaseChatModel</span><span style="font-weight:bold">required</span></p>
<p id="t-oNtOzYkcS0GDLnGpMrNL4I"><span>用于生成摘要的模型。可以是模型标识符字符串（例如，</span><span>'openai:gpt-4o-mini'</span><span>）或</span><span>BaseChatModel</span><span>实例。更多信息请参见</span><span style="border-bottom:1px solid;font-weight:bold">init_chat_model</span><span>。</span></p>
<p id="t-RsXZ6ozDYjAhVf9TdAxfSI"><span style="font-weight:bold">trigger</span><span>ContextSize | list[ContextSize] | None</span></p>
<p id="t-RwYXPhTEUkkTlKmMqRak0c"><span>触发摘要的条件。可以是：</span></p>
<ul><li id="t-r4GKu559DyhWTVvORWkhPs"><span>单个</span><span style="border-bottom:1px solid;font-weight:bold">ContextSize</span><span>元组（必须满足指定的条件）</span></li></ul>
<ul><li id="t-rNKPaXsUKsK5dBpE3CpfRz"><span style="border-bottom:1px solid;font-weight:bold">ContextSize</span><span>元组列表（必须满足任一条件 - OR 逻辑）</span></li></ul>
<p id="t-ho5oM9QJYfDDiNvxhT69Bs"><span>条件应为以下之一：</span></p>
<ul><li id="t-FyinJ3TiGw71he5uwkJhtn"><span>fraction</span><span>(float)：模型上下文大小的比例 (0-1)</span></li></ul>
<ul><li id="t-4HsgdSpGljVTC5yATy3GtA"><span>tokens</span><span>(int)：绝对令牌计数</span></li></ul>
<ul><li id="t-M6VvWoX46fwn6Wk499z5F1"><span>messages</span><span>(int)：消息计数</span></li></ul>
<p id="t-PBvYofQpWAuT7zYMk1xWvv"><span>必须至少指定一个条件。如果未提供，摘要将不会自动触发。</span></p>
<p id="t-1rZS1lKh1cmiGka3AhREyH"><span>更多信息请参见</span><span style="border-bottom:1px solid;font-weight:bold">ContextSize</span><span>的 API 参考。</span></p>
<p id="t-dgVxH9v49vtvWh5mmnGWVo"><span style="font-weight:bold">keep</span><span>ContextSize</span><span>default:"('messages', 20)"</span></p>
<p id="t-hLeY9w7L2LyOLXsMfWX55j"><span>摘要后保留多少上下文。请指定以下之一：</span></p>
<ul><li id="t-eJyzu9dZTgDKMOCw3LpWrW"><span>fraction</span><span>(float)：保留的模型上下文大小比例 (0-1)</span></li></ul>
<ul><li id="t-rMwlO3kcssjrTLE7l9IYkE"><span>tokens</span><span>(int)：保留的绝对令牌计数</span></li></ul>
<ul><li id="t-5lrveZGwzJ3w333T7ZYDBm"><span>messages</span><span>(int)：保留的最近消息数量</span></li></ul>
<p id="t-twt5mGLM3CsFg4DZhpzuBV"><span>更多信息请参见</span><span style="border-bottom:1px solid;font-weight:bold">ContextSize</span><span>的 API 参考。</span></p>
<p id="t-WPgcMO5qRZ9XEm5tTrXRHh"><span style="font-weight:bold">token_counter</span><span>function</span></p>
<p id="t-Im97z2VFS2n8vTzq5RKL6O"><span>自定义令牌计数函数。默认为基于字符的计数。</span></p>
<p id="t-vkfEhvBufDYO2Vi2rdxO0t"><span style="font-weight:bold">summary_prompt</span><span>string</span></p>
<p id="t-VlSTtkThCFc0UzfQMPkiFP"><span>用于摘要的自定义提示模板。如果未指定，则使用内置模板。模板应包含</span><span>{messages}</span><span>占位符，对话历史将插入其中。</span></p>
<p id="t-wxExYMhBC4POTRwEEzP5ZG"><span style="font-weight:bold">trim_tokens_to_summarize</span><span>number</span><span>default:"4000"</span></p>
<p id="t-5fo98quwtmlOhA7IJ01W5b"><span>生成摘要时要包含的最大令牌数。在摘要之前，消息将被修剪以适应此限制。</span></p>
<p id="t-OcjXup6gY3D0RKNfmEmERB"><span style="font-weight:bold">summary_prefix</span><span>string</span></p>
<p id="t-r8j05rROYwA4g9M6n0udxf"><span>添加到摘要消息的前缀。如果未提供，则使用默认前缀。</span></p>
<p id="t-aq0cH0QgUr8Rsm0eoNdGgt"><span style="font-weight:bold">max_tokens_before_summary</span><span>number</span></p>
<p id="t-HeyGQ3iY3QGMuucUwkUthF"><span style="font-weight:bold">已弃用：</span><span>请改用</span><span>trigger: {"tokens": value}</span><span>。触发摘要的令牌阈值。</span></p>
<p id="t-PxDrz1d3G0zZv311uYeGGl"><span style="font-weight:bold">messages_to_keep</span><span>number</span></p>
<p id="t-hyT4jEnXWHsVMtoOLnNiyi"><span style="font-weight:bold">已弃用：</span><span> 请改用 </span><span>keep: {"messages": value}</span><span>。要保留的最近消息。</span></p></blockquote>

<blockquote id="t-QgR6GHZgqlZmK657hYYpKD"><img alt="" decoding="async" height="20" loading="lazy" src="/images/agent-learning/46f362ec986749d3c64183d1.svg" width="20"/><p id="t-dHatEbYUZpThGCxNBOanwk"><span style="font-weight:bold">完整示例</span></p>
<p id="t-lLsmwq6Z81UaiYqcViDAsC"><span>摘要中间件监控消息令牌计数，并在达到阈值时自动总结较早的消息。</span></p>
<p id="t-Ib7IVwGAUxVdFmJTfmoBep"><span style="font-weight:bold">触发条件</span><span>控制何时运行摘要：</span></p>
<ul><li id="t-qYlvvUtcqxN4B1N2ZPFIyO"><span>单个条件对象（必须满足指定的条件）</span></li></ul>
<ul><li id="t-MD46xW6itK87gYB9Mt4PDQ"><span>条件数组（必须满足任一条件 - OR 逻辑）</span></li></ul>
<ul><li id="t-GV5P0blKpIgIK8VyanfddW"><span>每个条件可以使用</span><span>fraction</span><span>（模型上下文大小的比例）、</span><span>tokens</span><span>（绝对计数）或</span><span>messages</span><span>（消息计数）</span></li></ul>
<p id="t-wOizxA62ySMRbcnCTjDjFQ"><span style="font-weight:bold">保留条件</span><span>控制保留多少上下文（请指定以下之一）：</span></p>
<ul><li id="t-tfR9x9XSu8Bh28dg8CzEHf"><span>fraction</span><span>- 保留的模型上下文大小比例</span></li></ul>
<ul><li id="t-CWlaYJucB4CaPpXEcg25om"><span>tokens</span><span>- 保留的绝对令牌计数</span></li></ul>
<ul><li id="t-wdfgjbZAgzRnL3fUF9FE0W"><span>messages</span><span>- 保留的最近消息数量</span></li></ul>
<pre id="t-CnSaAEuFoCFHtHtm980cqN"><code>from langchain.agents import create_agent
from langchain.agents.middleware import SummarizationMiddleware

# Single condition: trigger if tokens &gt;= 4000
agent = create_agent(
model="gpt-4o",
tools=[your_weather_tool, your_calculator_tool],
middleware=[
SummarizationMiddleware(
model="gpt-4o-mini",
trigger=("tokens", 4000),
keep=("messages", 20),
),
],
)

# Multiple conditions: trigger if number of tokens &gt;= 3000 OR messages &gt;= 6
agent2 = create_agent(
model="gpt-4o",
tools=[your_weather_tool, your_calculator_tool],
middleware=[
SummarizationMiddleware(
model="gpt-4o-mini",
trigger=[
("tokens", 3000),
("messages", 6),
],
keep=("messages", 20),
),
],
)

# Using fractional limits
agent3 = create_agent(
model="gpt-4o",
tools=[your_weather_tool, your_calculator_tool],
middleware=[
SummarizationMiddleware(
model="gpt-4o-mini",
trigger=("fraction", 0.8),
keep=("fraction", 0.3),
),
],
)</code></pre></blockquote>


<a id="section-0754"></a>
## 人在回路

<a id="t-PKV2AI7zfzNcKCn0JWA4uR"></a>

<p id="t-4z3ygjsnQ53BbY2hC0C3NQ"><span style="background-color:transparent">在工具调用执行之前，暂停智能体执行以等待人工批准、编辑或拒绝。</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">人在回路</span><span style="background-color:transparent"> 适用于以下情况：</span></p>

<ul><li id="t-eDPhyM4Mqya5ri5HQ6pTaI"><span>需要人工批准的高风险操作（例如数据库写入、金融交易）。</span></li></ul>

<ul><li id="t-pyVkhyfIzL5VzxCb0ir92T"><span>强制要求人工监督的合规工作流。</span></li></ul>

<ul><li id="t-t1qPmeWwuNvvXNXkpKtukB"><span>人工反馈指导智能体的长时间运行对话。</span></li></ul>

<p id="t-fnCbLAwDeI3sOebJkZybbL"><span style="font-weight:bold;background-color:transparent">API 参考：</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">HumanInTheLoopMiddleware</span></p>

<p id="t-uCWKRTC1WcQfbousXru9nu"><span>人在回路中间件需要一个</span><span style="border-bottom:1px solid;font-weight:bold">检查点器</span><span>来在中断期间维护状态。</span></p>

<pre id="t-hX3M1nnqY5Os2yoVug4W38"><code>from langchain.agents import create_agent
from langchain.agents.middleware import HumanInTheLoopMiddleware
from langgraph.checkpoint.memory import InMemorySaver

def read_email_tool(email_id: str) -&gt; str:
"""Mock function to read an email by its ID."""
return f"Email content for ID: {email_id}"

def send_email_tool(recipient: str, subject: str, body: str) -&gt; str:
"""Mock function to send an email."""
return f"Email sent to {recipient} with subject '{subject}'"

agent = create_agent(
model="gpt-4o",
tools=[your_read_email_tool, your_send_email_tool],
checkpointer=InMemorySaver(),
middleware=[
HumanInTheLoopMiddleware(
interrupt_on={
"your_send_email_tool": {
"allowed_decisions": ["approve", "edit", "reject"],
},
"your_read_email_tool": False,
}
),
],
)</code></pre>

<p id="t-3jsotb0Dr00MrTGTo63ZUc"><span>观看此</span><span style="border-bottom:1px solid;font-weight:bold">视频指南</span><span>，演示人在回路中间件的行为。</span></p>


<a id="section-0755"></a>
## 模型调用限制

<a id="t-S96HfnzoZTOi8calATsVvQ"></a>

<p id="t-foC2R9DnaykFslbUCL3u2t"><span style="background-color:transparent">限制模型调用次数以防止无限循环或成本过高。模型调用限制适用于以下情况：</span></p>

<ul><li id="t-r35rb5HoU6OMYAfXiOpZgQ"><span>防止失控的智能体进行过多的 API 调用。</span></li></ul>

<ul><li id="t-PNhz7o500r0nexmHijsFBe"><span>在生产部署中强制执行成本控制。</span></li></ul>

<ul><li id="t-8Rq3stHixG4ehRIU7we3aT"><span>在特定调用预算内测试智能体行为。</span></li></ul>

<p id="t-RuRlQUcwAo5AOi3JEVmKhT"><span style="font-weight:bold;background-color:transparent">API 参考：</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">ModelCallLimitMiddleware</span></p>

<pre id="t-QoTDgohiD1VKHaRThms9vM"><code>from langchain.agents import create_agent
from langchain.agents.middleware import ModelCallLimitMiddleware
from langgraph.checkpoint.memory import InMemorySaver

agent = create_agent(
model="gpt-4o",
checkpointer=InMemorySaver(), # Required for thread limiting
tools=[],
middleware=[
ModelCallLimitMiddleware(
thread_limit=10,
run_limit=5,
exit_behavior="end",
),
],
)</code></pre>

<p id="t-6guKr8HjYQN0sTWkPyg1dq"><span>观看此</span><span style="border-bottom:1px solid;font-weight:bold">视频指南</span><span>，演示模型调用限制中间件的行为。</span></p>

<p id="t-7XV5AsRAmw8zaxBLqtavx0"><span style="font-weight:bold">thread_limit</span><span>number</span></p>

<p id="t-56iVWJXKiNI2icEJmY3Tex"><span>线程中所有运行的最大模型调用次数。默认为无限制。</span></p>

<p id="t-wvxbnOqUifmrD5k6p9gduO"><span style="font-weight:bold">run_limit</span><span>number</span></p>

<p id="t-jq6pCdZrUlsLlXVZetyxIk"><span>单次调用的最大模型调用次数。默认为无限制。</span></p>

<p id="t-X9emvXSCdjC18594wephBZ"><span style="font-weight:bold">exit_behavior</span><span>string</span><span>default:"end"</span></p>

<p id="t-LqQgsvEyNDyLVTapvmZa9B"><span>达到限制时的行为。选项：</span><span>'end'</span><span>（优雅终止）或</span><span>'error'</span><span>（引发异常）</span></p>


<a id="section-0756"></a>
## 工具调用限制

<a id="t-a37Qa1SUvuigRKCo1swJYZ"></a>

<p id="t-x7gLRRDj7MpClFgXs69jVz"><span style="background-color:transparent">通过限制工具调用次数来控制智能体执行，可以全局限制所有工具，也可以限制特定工具。工具调用限制适用于以下情况：</span></p>

<ul><li id="t-sOmQYAwf9t3TELArDET6vw"><span>防止对昂贵的外部 API 进行过多调用。</span></li></ul>

<ul><li id="t-wMrI0c0IPTxSFO1RBk7FmT"><span>限制网络搜索或数据库查询。</span></li></ul>

<ul><li id="t-QkCo0uqlt4KKZ0A9dWi8SM"><span>对特定工具使用强制执行速率限制。</span></li></ul>

<ul><li id="t-UcqXvlTs9BqB0TEDv0maXl"><span>防止失控的智能体循环。</span></li></ul>

<p id="t-gN1UDedVbIn33X72DnTp6W"><span style="font-weight:bold;background-color:transparent">API 参考：</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">ToolCallLimitMiddleware</span></p>

<pre id="t-sYNRbWFedanYCISaWpzxp5"><code>from langchain.agents import create_agent
from langchain.agents.middleware import ToolCallLimitMiddleware

agent = create_agent(
model="gpt-4o",
tools=[search_tool, database_tool],
middleware=[
# Global limit
ToolCallLimitMiddleware(thread_limit=20, run_limit=10),
# Tool-specific limit
ToolCallLimitMiddleware(
tool_name="search",
thread_limit=5,
run_limit=3,
),
],
)</code></pre>

<p id="t-qsdEwVa5JUCRlmn7xYTknK"><span>观看此</span><span style="border-bottom:1px solid;font-weight:bold">视频指南</span><span>，演示工具调用限制中间件的行为。</span></p>

<blockquote id="t-IGabtXsrwwJKCnTcyKDsbi"><img alt="" decoding="async" height="20" loading="lazy" src="/images/agent-learning/040e0a04356c12994f61a701.svg" width="20"/><p id="t-TTVjGRMggw3oxw5sztUSBS"><span style="font-weight:bold">配置选项</span></p>
<p id="t-8bZO5k9c92cRIrRvlq8KgV"><span style="font-weight:bold">tool_name</span><span>string</span></p>
<p id="t-JOHhYQ9fvcxJzQZJkJor33"><span>要限制的特定工具名称。如果未提供，限制将</span><span style="font-weight:bold">全局应用于所有工具</span><span>。</span></p>
<p id="t-k7UqKXUKobqHxiWEt1oNht"><span style="font-weight:bold">thread_limit</span><span>number</span></p>
<p id="t-92eLIrbEpHhQfyZUd6jquA"><span>线程（对话）中所有运行的最大工具调用次数。在具有相同线程 ID 的多次调用中持续存在。需要检查点器来维护状态。</span><span>None</span><span>表示无线程限制。</span></p>
<p id="t-AmHPuQU40ZZslkbaFkqICh"><span style="font-weight:bold">run_limit</span><span>number</span></p>
<p id="t-DaN8698eAVoepFmITlqWV2"><span>单次调用（一个用户消息 → 响应周期）的最大工具调用次数。每次新的用户消息时重置。</span><span>None</span><span>表示无运行限制。</span></p>
<p id="t-zeAfYSyxIyOyMuM9tnvWii"><span style="font-weight:bold">注意：</span><span>必须至少指定</span><span>thread_limit</span><span>或</span><span>run_limit</span><span>中的一个。</span></p>
<p id="t-ANU3K4fmjrZWPMmhzAKMsw"><span style="font-weight:bold">exit_behavior</span><span>string</span><span>default:"continue"</span></p>
<p id="t-Ml8f6TR4WWRcQxtCj1ZSKH"><span>达到限制时的行为：</span></p>
<ul><li id="t-jTuIryfJeIPRHwpSsYW6MK"><span>'continue'</span><span>(默认) - 用错误消息阻止超限的工具调用，让其他工具和模型继续。模型根据错误消息决定何时结束。</span></li></ul>
<ul><li id="t-z0AZqZkRr7WbCYs8FFKqNg"><span>'error'</span><span>- 引发</span><span>ToolCallLimitExceededError</span><span>异常，立即停止执行</span></li></ul>
<ul><li id="t-U8WQmxQFxOiqjFUMRjMN7x"><span>'end'</span><span> - 立即停止执行，并为超限的工具调用生成 </span><span>ToolMessage</span><span> 和 AI 消息。仅在限制单个工具时有效；如果其他工具有待处理的调用，则会引发 </span><span>NotImplementedError</span><span>。</span></li></ul></blockquote>

<blockquote id="t-jb3R7UQuTyXKC8iqSb3eSB"><img alt="" decoding="async" height="20" loading="lazy" src="/images/agent-learning/adc2dd4d08bf27fd97397504.svg" width="20"/><p id="t-eg8hXKqmLXXNWaE1QJLiok"><span style="font-weight:bold">完整示例</span></p>
<p id="t-2piJiisQoBspoVOvqeyZDa"><span>使用以下方式指定限制：</span></p>
<ul><li id="t-QJFWoy7JxpnCyNVVVTdmtf"><span style="font-weight:bold">线程限制</span><span>- 对话中所有运行的最大调用次数（需要检查点）</span></li></ul>
<ul><li id="t-OmaAhDbTmQ2oQY4Lg1cj72"><span style="font-weight:bold">运行限制</span><span>- 每次调用的最大调用次数（每轮重置）</span></li></ul>
<p id="t-Yzrqx20cv7VYBy73OZXO0K"><span>退出行为：</span></p>
<ul><li id="t-VEhOtte0p3x0H7VOu8qxWe"><span>'continue'</span><span>（默认）- 用错误消息阻止超出的调用，代理继续运行</span></li></ul>
<ul><li id="t-OyTZiRvhkXZbzJ7ibezUrH"><span>'error'</span><span>- 立即引发异常</span></li></ul>
<ul><li id="t-iTx1EA59dINEwRGelovrCg"><span>'end'</span><span>- 使用 ToolMessage + AI 消息停止（仅适用于单工具场景）</span></li></ul>
<pre id="t-viOBdCk1ZJtSvtDdI8bq3t"><code>from langchain.agents import create_agent
from langchain.agents.middleware import ToolCallLimitMiddleware

global_limiter = ToolCallLimitMiddleware(thread_limit=20, run_limit=10)
search_limiter = ToolCallLimitMiddleware(tool_name="search", thread_limit=5, run_limit=3)
database_limiter = ToolCallLimitMiddleware(tool_name="query_database", thread_limit=10)
strict_limiter = ToolCallLimitMiddleware(tool_name="scrape_webpage", run_limit=2, exit_behavior="error")

agent = create_agent(
model="gpt-4o",
tools=[search_tool, database_tool, scraper_tool],
middleware=[global_limiter, search_limiter, database_limiter, strict_limiter],
)</code></pre></blockquote>


<a id="section-0757"></a>
## 模型回退

<a id="t-8PlwblsyIcTegNUufEjj5k"></a>

<p id="t-FKpsRaK2ROOUvomcIVXACR"><span style="background-color:transparent">当主模型失败时，自动回退到备用模型。模型回退适用于以下场景：</span></p>

<ul><li id="t-iNTrCLdgIA286vzEAvJ37a"><span>构建能够处理模型中断的弹性代理。</span></li></ul>

<ul><li id="t-M1pXTvEQduUuAZ85MzjOuT"><span>通过回退到更便宜的模型来优化成本。</span></li></ul>

<ul><li id="t-Y94635s68aEvh6eVnss6PC"><span>跨 OpenAI、Anthropic 等提供商实现冗余。</span></li></ul>

<p id="t-AvhKkTSZtbV2EEBbAO1eBw"><span style="font-weight:bold;background-color:transparent">API 参考：</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">ModelFallbackMiddleware</span></p>

<pre id="t-FRBC5qkK4p1xRkXMRkUigL"><code>from langchain.agents import create_agent
from langchain.agents.middleware import ModelFallbackMiddleware

agent = create_agent(
model="gpt-4o",
tools=[],
middleware=[
ModelFallbackMiddleware(
"gpt-4o-mini",
"claude-3-5-sonnet-20241022",
),
],
)</code></pre>

<p id="t-EL0W9DIHUTguyogrBOZfqZ"><span>观看此</span><span style="border-bottom:1px solid;font-weight:bold">视频指南</span><span>，演示模型回退中间件的行为。</span></p>

<blockquote id="t-J00xk8I4wJAD2Z0bm3H3fv"><img alt="" decoding="async" height="20" loading="lazy" src="/images/agent-learning/eed1e0a5d26a2df86ed1bccc.svg" width="20"/><p id="t-JATOQ1RJdZ8UDtbNYnnPIj"><span style="font-weight:bold">配置选项</span></p>
<p id="t-cnVwXyFomqqdWqRFz7cYut"><span style="font-weight:bold">first_model</span><span>string | BaseChatModel</span><span style="font-weight:bold">required</span></p>
<p id="t-BunshPvu6N8dka6itwXi1R"><span>当主模型失败时首先尝试的回退模型。可以是模型标识符字符串（例如 </span><span>'openai:gpt-4o-mini'</span><span>）或 </span><span>BaseChatModel</span><span> 实例。</span></p>

<p id="t-Vf1rKRkWd2pYwDopXVQtdD"><span style="font-weight:bold">*additional_models</span><span>string | BaseChatModel</span></p>
<p id="t-9eQQYZeZVfdyHmsTEkZihu"><span>如果之前的模型失败，按顺序尝试的额外回退模型</span></p></blockquote>


<a id="section-0758"></a>
## PII 检测

<a id="t-9OZsZjJvRnUBInBDgwKfQs"></a>

<p id="t-9UEmfuK200hmmXXLEB10e0"><span style="background-color:transparent">使用可配置的策略检测和处理对话中的个人身份信息（PII）。PII 检测适用于以下场景：</span></p>

<ul><li id="t-REtgLRXGMZ8l9AGd3wBO2m"><span>具有合规性要求的医疗保健和金融应用。</span></li></ul>

<ul><li id="t-Bx53B7vNKdfJ7Qdp0Wlxnw"><span>需要清理日志的客户服务代理。</span></li></ul>

<ul><li id="t-09Mil74GasR79FowLzPOTV"><span>任何处理敏感用户数据的应用。</span></li></ul>

<p id="t-lh7uK2KZbrWD6V0rdwUnuW"><span style="font-weight:bold;background-color:transparent">API 参考：</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">PIIMiddleware</span></p>

<pre id="t-Dm89SCJ8VtcmMlv5SZPZFk"><code>from langchain.agents import create_agent
from langchain.agents.middleware import PIIMiddleware

agent = create_agent(
model="gpt-4o",
tools=[],
middleware=[
PIIMiddleware("email", strategy="redact", apply_to_input=True),
PIIMiddleware("credit_card", strategy="mask", apply_to_input=True),
],
)</code></pre>

<a id="t-BHH8Qw43id1f8RZIwotop0"></a>

##### 自定义 PII 类型

<p id="t-uOzrbHETHKCybgTmWiwazJ"><span style="background-color:transparent">您可以通过提供</span><span style="background-color:transparent">detector</span><span style="background-color:transparent">参数创建自定义 PII 类型。这允许您检测超出内置类型的、特定于您用例的模式。</span></p>

<p id="t-vjVPLzgZjM67xkcrF3kh2N"><span style="font-weight:bold;background-color:transparent">创建自定义检测器的三种方式：</span></p>

<ol start="1"><li id="t-i8xWE81ebiKs1k1dmZntYG"><span style="font-weight:bold">正则表达式模式字符串</span><span>- 简单的模式匹配</span></li></ol>

<ol start="2"><li id="t-b5t2a81k5WuKGS0YAwwncV"><span style="font-weight:bold">自定义函数</span><span>- 带有验证的复杂检测逻辑</span></li></ol>

<pre id="t-uHwk0RmqIUBYJQCBg98BBf"><code>from langchain.agents import create_agent
from langchain.agents.middleware import PIIMiddleware
import re

# Method 1: Regex pattern string
agent1 = create_agent(
model="gpt-4o",
tools=[],
middleware=[
PIIMiddleware(
"api_key",
detector=r"sk-[a-zA-Z0-9]{32}",
strategy="block",
),
],
)

# Method 2: Compiled regex pattern
agent2 = create_agent(
model="gpt-4o",
tools=[],
middleware=[
PIIMiddleware(
"phone_number",
detector=re.compile(r"\+?\d{1,3}[\s.-]?\d{3,4}[\s.-]?\d{4}"),
strategy="mask",
),
],
)

# Method 3: Custom detector function
def detect_ssn(content: str) -&gt; list[dict[str, str | int]]:
"""Detect SSN with validation.

Returns a list of dictionaries with 'text', 'start', and 'end' keys.
"""
import re
matches = []
pattern = r"\d{3}-\d{2}-\d{4}"
for match in re.finditer(pattern, content):
ssn = match.group(0)
# Validate: first 3 digits shouldn't be 000, 666, or 900-999
first_three = int(ssn[:3])
if first_three not in [0, 666] and not (900 &lt;= first_three &lt;= 999):
matches.append({
"text": ssn,
"start": match.start(),
"end": match.end(),
})
return matches

agent3 = create_agent(
model="gpt-4o",
tools=[],
middleware=[
PIIMiddleware(
"ssn",
detector=detect_ssn,
strategy="hash",
),
],
)</code></pre>

<p id="t-2ki7S9LmK1v5VZajCfujaq"><span style="font-weight:bold;background-color:transparent">自定义检测器函数签名：</span></p>

<p id="t-GbKL8xNTMrBoMXOmODTqQr"><span style="background-color:transparent">检测器函数必须接受一个字符串（内容）并返回匹配项：</span></p>

<p id="t-i1RZfhzkUlxEvIffmbDPov"><span style="background-color:transparent">返回一个包含</span><span style="background-color:transparent">text</span><span style="background-color:transparent">、</span><span style="background-color:transparent">start</span><span style="background-color:transparent">和</span><span style="background-color:transparent">end</span><span style="background-color:transparent">键的字典列表：</span></p>

<pre id="t-aRClrTVWiNpaN9oYFBoVqW"><code>def detector(content: str) -&gt; list[dict[str, str | int]]:
return [
{"text": "matched_text", "start": 0, "end": 12},
# ... more matches
]</code></pre>

<blockquote id="t-xSwBR7SF7j2n1b2zdC07Js"><img alt="" decoding="async" height="20" loading="lazy" src="/images/agent-learning/b46b78a164f2f121e1afab7c.svg" width="20"/><p id="t-j697tvIR60OD2dD9MuQlsH"><span style="font-weight:bold">对于自定义检测器：</span></p>
<pre id="t-Yz6yxCn61wiAEhbi9XO5lQ"><code>- 使用正则表达式字符串处理简单模式
- 当您需要标志时使用 RegExp 对象（例如，不区分大小写的匹配）
- 当您需要超出模式匹配的验证逻辑时使用自定义函数
- 自定义函数让您完全控制检测逻辑，并可以实现复杂的验证规则</code></pre></blockquote>

<blockquote id="t-2aJ7w7kjIlFJI3tWFqUVgN"><img alt="" decoding="async" height="20" loading="lazy" src="/images/agent-learning/eed1e0a5d26a2df86ed1bccc.svg" width="20"/><p id="t-Mz7e3jSa9iacEi5ieHqo49"><span style="font-weight:bold">配置选项</span></p>
<p id="t-AFaWGRbLEGv6nxVr9QD5KA"><span style="font-weight:bold">pii_type</span><span>string</span><span style="font-weight:bold">required</span></p>
<p id="t-LJbn0n54VoR5261qK9LIEQ"><span>要检测的 PII 类型。可以是内置类型（</span><span>email</span><span>、</span><span>credit_card</span><span>、</span><span>ip</span><span>、</span><span>mac_address</span><span>、</span><span>url</span><span>）或自定义类型名称。</span></p>

<p id="t-Lv7Vmwm6pKEBmdVcF55fWH"><span style="font-weight:bold">strategy</span><span>string</span><span>default:"redact"</span></p>
<p id="t-3ZYdRVLBlDPEt880bauNJY"><span>如何处理检测到的 PII。选项：</span></p>
<ul><li id="t-d5TPGyHjmzInDR6h8f3FZ1"><span>'block'</span><span>- 检测到时引发异常</span></li></ul>
<ul><li id="t-chYUfYueb4pK8yTUvo2uCf"><span>'redact'</span><span>- 替换为</span><span>[REDACTED_{PII_TYPE}]</span></li></ul>
<ul><li id="t-gvNnM24LyiOQrY8CLA3Prq"><span>'mask'</span><span>- 部分屏蔽（例如</span><span>**&lt;strong&gt;-&lt;/strong&gt;&lt;strong&gt;-&lt;/strong&gt;**-1234</span><span>）</span></li></ul>
<ul><li id="t-vRfXyNI1nI6Twpcbx7i2gH"><span>'hash'</span><span> - 替换为确定性哈希值</span></li></ul>

<p id="t-V6J5eCd1bq6XEkZEzM8vmx"><span style="font-weight:bold">detector</span><span>function | regex</span></p>
<p id="t-QUOnllUcAeBlKT5TApaePN"><span>自定义检测器函数或正则表达式模式。如果未提供，则使用该 PII 类型的内置检测器。</span></p>

<p id="t-pyb8L6j0P1u5MVPULTCkCr"><span style="font-weight:bold">apply_to_input</span><span>boolean</span><span>default:"True"</span></p>
<p id="t-1okXKBUV1QSGuZL9hn5KNi"><span>在模型调用前检查用户消息</span></p>

<p id="t-xx78PpY3zuAoLKRdTACbB1"><span style="font-weight:bold">apply_to_output</span><span>boolean</span><span>default:"False"</span></p>
<p id="t-jgImIlHKjuTEZOFwgms7zz"><span>在模型调用后检查 AI 消息</span></p>

<p id="t-gza91GFBGx1BXmUNYc6sWW"><span style="font-weight:bold">apply_to_tool_results</span><span>boolean</span><span>default:"False"</span></p>
<p id="t-5va72jMDNbTDbJgsrIdjwP"><span>在执行后检查工具结果消息</span></p></blockquote>


<a id="section-0759"></a>
## 待办事项列表

<a id="t-mQYOAkhoBvx1s3ymdAi8cc"></a>

<p id="t-H1u8M8qwS34dix6yNUIy2Y"><span style="background-color:transparent">为代理配备任务规划和跟踪能力，以处理复杂的多步骤任务。待办事项列表适用于以下场景：</span></p>

<ul><li id="t-CleMKMNC0sJoYkt2X4VPXC"><span>需要跨多个工具协调的复杂多步骤任务。</span></li></ul>

<ul><li id="t-buvWtoNNcxJGyjDg0TV86S"><span>进度可见性很重要的长时间运行操作。</span></li></ul>

<blockquote id="t-tXiKCezTpysrg16QEDblhB"><img alt="" decoding="async" height="20" loading="lazy" src="/images/agent-learning/eed1e0a5d26a2df86ed1bccc.svg" width="20"/><p id="t-p4IJ05IIbutcKBegEEtG7Y"><span>此中间件自动为代理提供</span><span>write_todos</span><span>工具和系统提示，以指导有效的任务规划。</span></p></blockquote>

<p id="t-NeY0B4BBkJ1f5M2KTu7gt9"><span style="font-weight:bold;background-color:transparent">API 参考：</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">TodoListMiddleware</span></p>

<pre id="t-8StOM7uRiGXzb7EdHKs3uv"><code>from langchain.agents import create_agent
from langchain.agents.middleware import TodoListMiddleware

agent = create_agent(
model="gpt-4o",
tools=[read_file, write_file, run_tests],
middleware=[TodoListMiddleware()],
)</code></pre>

<p id="t-shA7KNZQD5gvme9RmlqNcQ"><span>观看此</span><span style="border-bottom:1px solid;font-weight:bold">视频指南</span><span>，演示待办事项列表中间件的行为。</span></p>

<blockquote id="t-AOpuHzU2u8wZTquKDwtugy"><img alt="" decoding="async" height="20" loading="lazy" src="/images/agent-learning/b46b78a164f2f121e1afab7c.svg" width="20"/><p id="t-an67qL8NePjpUJH3TZUuNU"><span style="font-weight:bold">配置选项</span></p>
<p id="t-TbpXsiespHHbEh3wOIqDCO"><span style="font-weight:bold">system_prompt</span><span>string</span></p>
<p id="t-4RaVO6w8LwXIhKo4XgkCOR"><span>用于指导待办事项使用的自定义系统提示。如果未指定，则使用内置提示。</span></p>

<p id="t-W2SZvZZF3AzlosUZuKYncm"><span style="font-weight:bold">tool_description</span><span>string</span></p>
<p id="t-MIBGy7c4zcWe1vgo78lXte"><span>write_todos</span><span>工具的自定义描述。如果未指定，则使用内置描述。</span></p></blockquote>


<a id="section-0760"></a>
## LLM 工具选择器

<a id="t-VaLabxBU8S0KvyhR5an9nw"></a>

<p id="t-jPKjF5EJ2q1ZQJkemKb159"><span style="background-color:transparent">在调用主模型之前，使用 LLM 智能选择相关工具。LLM 工具选择器适用于以下场景：</span></p>

<ul><li id="t-nPr7FSOkYnCmtUF4C4BiUJ"><span>拥有许多工具（10+）且大多数工具与每个查询无关的代理。</span></li></ul>

<ul><li id="t-Y9uXFQzs96A8tJaefyYo41"><span>通过过滤不相关的工具来减少令牌使用。</span></li></ul>

<ul><li id="t-wxD9JBgry5royVmuXzt7U6"><span>提高模型的专注度和准确性。</span></li></ul>

<p id="t-oBOwlPD7jcqYHoAeai1x1e"><span style="background-color:transparent">此中间件使用结构化输出来询问 LLM 哪些工具与当前查询最相关。结构化输出模式定义了可用的工具名称和描述。模型提供商通常会在后台将此结构化输出信息添加到系统提示中。</span></p>

<p id="t-cVaaUmX1t8pW7syt2q7UFn"><span style="font-weight:bold;background-color:transparent">API 参考：</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">LLMToolSelectorMiddleware</span></p>

<pre id="t-2d2p6G2PkLUNiWbijs39sV"><code>from langchain.agents import create_agent
from langchain.agents.middleware import LLMToolSelectorMiddleware

agent = create_agent(
model="gpt-4o",
tools=[tool1, tool2, tool3, tool4, tool5, ...],
middleware=[
LLMToolSelectorMiddleware(
model="gpt-4o-mini",
max_tools=3,
always_include=["search"],
),
],
)</code></pre>

<blockquote id="t-HFMDxCHfCLQt2yZFSmkTYT"><img alt="" decoding="async" height="20" loading="lazy" src="/images/agent-learning/b46b78a164f2f121e1afab7c.svg" width="20"/><p id="t-5XaS3dy9wUIHVFvvIZWwnt"><span style="font-weight:bold">配置选项</span></p>
<p id="t-YeTNWoqeNP0jk50ghuIX1s"><span style="font-weight:bold">model</span><span>string | BaseChatModel</span></p>
<p id="t-xhVO4mmpKRdbUyU10rpLqp"><span>用于工具选择的模型。可以是模型标识符字符串（例如</span><span>'openai:gpt-4o-mini'</span><span>）或</span><span>BaseChatModel</span><span>实例。有关更多信息，请参阅</span><span style="border-bottom:1px solid;font-weight:bold">init_chat_model</span><span>。</span></p>
<p id="t-oJvKbU8NzlVZrMbctXcSoV"><span>默认为代理的主模型。</span></p>

<p id="t-3uwHsQQX06ZF2ow0rHJkRQ"><span style="font-weight:bold">system_prompt</span><span>string</span></p>
<p id="t-EYgq8YCCRfBJFVJni4jvf3"><span>选择模型的指令。如果未指定，则使用内置提示。</span></p>

<p id="t-ajQlclfGIUaQC1VF2POR8G"><span style="font-weight:bold">max_tools</span><span>number</span></p>
<p id="t-YXPvVgvR6WOgPxOrYGhOUg"><span>要选择的最大工具数量。如果模型选择了更多，则仅使用前 max_tools 个。如果未指定，则无限制。</span></p>

<p id="t-K09P4kgsM5t8Pf5hHYU9QP"><span style="font-weight:bold">always_include</span><span>list[string]</span></p>
<p id="t-oZUIJkDBeBPp3gFb8ocSlO"><span>无论选择如何，始终包含的工具名称。这些不计入 max_tools 限制。</span></p></blockquote>


<a id="section-0761"></a>
## 工具重试

<a id="t-XZWA2GPNccDXpECJGKkhkN"></a>

<p id="t-Wl24C22asdnjOGgT1j81NF"><span style="background-color:transparent">使用可配置的指数退避自动重试失败的工具调用。工具重试适用于以下场景：</span></p>

<ul><li id="t-7U1Xb9BfWPSTRwyYWXsOJ8"><span>处理外部 API 调用中的瞬时故障。</span></li></ul>

<ul><li id="t-7L1NAeYEPPRhC1lYRTdpZx"><span>提高网络依赖工具的可靠性。</span></li></ul>

<ul><li id="t-tCDuS8J1irupk2Q06d1j4r"><span>构建能够优雅处理临时错误的弹性代理。</span></li></ul>

<p id="t-VeR3KcdHUek51pliCrOFkF"><span style="font-weight:bold;background-color:transparent">API 参考：</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">ToolRetryMiddleware</span></p>

<pre id="t-usOJqsmulaREtI1cgbQtAI"><code>from langchain.agents import create_agent
from langchain.agents.middleware import ToolRetryMiddleware

agent = create_agent(
model="gpt-4o",
tools=[search_tool, database_tool],
middleware=[
ToolRetryMiddleware(
max_retries=3,
backoff_factor=2.0,
initial_delay=1.0,
),
],
)</code></pre>

<blockquote id="t-MgKOhLnkhoiVSutZL1uU6m"><img alt="" decoding="async" height="20" loading="lazy" src="/images/agent-learning/0a2f5a74d3472653c6cee686.svg" width="20"/><p id="t-X7d2hQx8PXtf9ZTpDPO1Xt"><span style="font-weight:bold">配置选项</span></p>
<p id="t-FD7jSkVYwcv9VAWRaNJS9d"><span style="font-weight:bold">max_retries</span><span>number</span><span>default:"2"</span></p>
<p id="t-eqSoLoMocsTKOPsBvBqA7s"><span>初始调用后的最大重试尝试次数（默认情况下总共 3 次尝试）</span></p>

<p id="t-rGLOPEwqykjVZAHoYHkDkw"><span style="font-weight:bold">tools</span><span>list[BaseTool | str]</span></p>
<p id="t-wZ8RVjJ9wpTDQHd4tTgJXL"><span>要应用重试逻辑的可选工具或工具名称列表。如果为 </span><span>None</span><span>，则应用于所有工具。</span></p>

<p id="t-KL8YXLNmKCdEcAcOiSZDsE"><span style="font-weight:bold">retry_on</span><span>tuple[type[Exception], ...] | callable</span><span>default:"(Exception,)"</span></p>
<p id="t-hHJBf7Qanp0IYVJhXUJFuw"><span>要么是要重试的异常类型的元组，要么是接受异常并在应重试时返回 </span><span>True</span><span> 的可调用对象。</span></p>

<p id="t-h0dPuFAghHqoK6VwUwEyaL"><span style="font-weight:bold">on_failure</span><span>string | callable</span><span>default:"return_message"</span></p>
<p id="t-x04kSXi1oiIbqFuiGOvjU0"><span>所有重试耗尽时的行为。选项：</span></p>
<ul><li id="t-Jo6vjkXABlhLfVhfoprBFt"><span>'return_message'</span><span>- 返回包含错误详情的</span><span>ToolMessage</span><span>（允许 LLM 处理故障）</span></li></ul>
<ul><li id="t-Oij1seLlJaD3J7tZCzphHA"><span>'raise'</span><span>- 重新引发异常（停止代理执行）</span></li></ul>
<ul><li id="t-nfD5CQN5y8WWnpzAOqOaF6"><span>自定义可调用对象 - 接受异常并返回用于 </span><span>ToolMessage</span><span> 内容的字符串的函数</span></li></ul>

<p id="t-YpYiJiVjAzK6Zsrj3M3EXT"><span style="font-weight:bold">backoff_factor</span><span>number</span><span>default:"2.0"</span></p>
<p id="t-4HEmNSLeXlzq2NS4vj9G0Q"><span>指数退避的乘数。每次重试等待 </span><span>initial_delay * (backoff_factor ** retry_number)</span><span> 秒。设置为 </span><span>0.0</span><span> 表示恒定延迟。</span></p>

<p id="t-ZE1gcth6wxoA0jfXxOv7mN"><span style="font-weight:bold">initial_delay</span><span>numberdefault:"1.0"</span></p>
<p id="t-5BMygBpS7jR9oPSX4XJyFn"><span>第一次重试前的初始延迟（秒）</span></p>

<p id="t-kkwgfOUrzpkX5aAwcXPULK"><span style="font-weight:bold">max_delay</span><span>number</span><span>default:"60.0"</span></p>
<p id="t-5HKsLqVEbTJvycR9SUN8dW"><span>重试之间的最大延迟（秒）（限制指数退避增长）</span></p>

<p id="t-LbV04cMLI5iKldDjs9sVAU"><span style="font-weight:bold">jitter</span><span>boolean</span><span>default:"true"</span></p>
<p id="t-3kDTHcUg9SEABe1FCWkm93"><span>是否向延迟添加随机抖动（</span><span>±25%</span><span>）以避免惊群效应</span></p></blockquote>

<blockquote id="t-6Ob8qXKSgWwqSj0jGP6uJ4"><img alt="" decoding="async" height="20" loading="lazy" src="/images/agent-learning/dbea451b6cba787df0bb9bc8.svg" width="20"/><p id="t-EAG1T6ZqZGlcwBLaQkLjvM"><span style="font-weight:bold">完整示例</span></p>
<p id="t-F8wUGcyU4WtvhzVUIr3i9c"><span>该中间件使用指数退避自动重试失败的工具调用。</span></p>
<p id="t-ahRczQttp8oiWajZYScIOe"><span style="font-weight:bold">关键配置：</span></p>
<ul><li id="t-qWhs0BmxP73tv0S8aTABoE"><span>max_retries</span><span>- 重试尝试次数（默认值：2）</span></li></ul>
<ul><li id="t-HdHfkUUVy0wBxIUqGYPqga"><span>backoff_factor</span><span>- 指数退避的乘数因子（默认值：2.0）</span></li></ul>
<ul><li id="t-F7HLYKxy3radzYhOFtsq1P"><span>initial_delay</span><span>- 初始延迟（秒）（默认值：1.0）</span></li></ul>
<ul><li id="t-9ENuw4PU02rhWm3QtzL5iW"><span>max_delay</span><span>- 延迟增长上限（默认值：60.0）</span></li></ul>
<ul><li id="t-bw78ecDIpkD2fYfifMtTvD"><span>jitter</span><span>- 添加随机变化（默认值：True）</span></li></ul>
<p id="t-ffy82kiMiB6f5QgQ0eUYOG"><span style="font-weight:bold">失败处理：</span></p>
<ul><li id="t-2eRGkqTh0RZ4fPxX033WlG"><span>on_failure='return_message'</span><span>- 返回错误消息</span></li></ul>
<ul><li id="t-D6NfRLGaEDNwXJnij3fzzw"><span>on_failure='raise'</span><span>- 重新抛出异常</span></li></ul>
<ul><li id="t-VnuNXvG4u5GGUsEhxjUDE8"><span>自定义函数 - 返回错误消息的函数</span></li></ul>
<pre id="t-OEnm9XOCOUAzShFyqQWwZ9"><code>from langchain.agents import create_agent
from langchain.agents.middleware import ToolRetryMiddleware

agent = create_agent(
model="gpt-4o",
tools=[search_tool, database_tool, api_tool],
middleware=[
ToolRetryMiddleware(
max_retries=3,
backoff_factor=2.0,
initial_delay=1.0,
max_delay=60.0,
jitter=True,
tools=["api_tool"],
retry_on=(ConnectionError, TimeoutError),
on_failure="continue",
),
],
)</code></pre></blockquote>


<a id="section-0762"></a>
## 模型重试

<a id="t-9NHWmZQx14u1zsH3rDGnka"></a>

<p id="t-f2BZElVjJ6YjzydY5lMONJ"><span style="background-color:transparent">使用可配置的指数退避自动重试失败的模型调用。模型重试适用于以下场景：</span></p>

<ul><li id="t-YohBAx6fG5zEcWCzqmH1Wm"><span>处理模型 API 调用中的瞬时故障。</span></li></ul>

<ul><li id="t-phESmW2HOX7bXhsg39SiaQ"><span>提高依赖网络的模型请求的可靠性。</span></li></ul>

<ul><li id="t-sc058vhEkFOPgvmYBh9bZo"><span>构建能够优雅处理临时模型错误的弹性智能体。</span></li></ul>

<p id="t-1ZXICwMdYTqng3GTtmJR03"><span style="font-weight:bold;background-color:transparent">API 参考：</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">ModelRetryMiddleware</span></p>

<pre id="t-jElVEXgYefbnIhrhV4rdOX"><code>from langchain.agents import create_agent
from langchain.agents.middleware import ModelRetryMiddleware

agent = create_agent(
model="gpt-4o",
tools=[search_tool, database_tool],
middleware=[
ModelRetryMiddleware(
max_retries=3,
backoff_factor=2.0,
initial_delay=1.0,
),
],
)</code></pre>

<blockquote id="t-5ZkRHYiwmK59KDY7R2Zl6B"><img alt="" decoding="async" height="20" loading="lazy" src="/images/agent-learning/f0672dd27335ac9c5017d703.svg" width="20"/><p id="t-LfZzRYWjW1tq7umTNvFyOR"><span style="font-weight:bold">配置选项</span></p>
<p id="t-wou0RSnPMWWGMqfjp2EFrr"><span style="font-weight:bold">max_retries</span><span>number</span><span>default:"2"</span></p>
<p id="t-yLD4fS2h02NfiAmvzxQ1fs"><span>初始调用后的最大重试尝试次数（默认情况下总共尝试 3 次）</span></p>

<p id="t-OiIMOJ1gh9XbjiY1VD5TiW"><span style="font-weight:bold">retry_on</span><span>tuple[type[Exception], ...] | callable</span><span>default:"(Exception,)"</span></p>
<p id="t-BBlXr7scNPfEOzh4K6vB5I"><span>要重试的异常类型元组，或者一个可调用对象，它接收一个异常并在应重试时返回 </span><span>True</span><span>。</span></p>

<p id="t-ebb46E7uQTV1Pjwrj7qegm"><span style="font-weight:bold">on_failure</span><span>string | callable</span><span>default:"continue"</span></p>
<p id="t-6lHbVmhsUHYcJW6Dhx13dl"><span>所有重试耗尽时的行为。选项：</span></p>
<ul><li id="t-e2nOkeHqLIDRWJzyYUrtPF"><span>'continue'</span><span>（默认） - 返回包含错误详情的</span><span>AIMessage</span><span>，允许智能体优雅地处理失败</span></li></ul>
<ul><li id="t-1kaUkpmy3gh13wyysZlEnj"><span>'error'</span><span>- 重新抛出异常（停止智能体执行）</span></li></ul>
<ul><li id="t-UEzoWUirM2fuVTUU8tOnMW"><span>自定义可调用对象 - 接收异常并返回用于</span><span>AIMessage</span><span>内容的字符串的函数</span></li></ul>

<p id="t-1UzsW6wanpN7ud2f95GUGt"><span style="font-weight:bold">backoff_factor</span><span>number</span><span>default:"2.0"</span></p>
<p id="t-EEQYF6PQKBHHMUfC21kfva"><span>指数退避的乘数因子。每次重试等待 </span><span>initial_delay * (backoff_factor ** retry_number)</span><span> 秒。设置为 </span><span>0.0</span><span> 表示恒定延迟。</span></p>

<p id="t-yhylQbKSk0LR4LUJP050yB"><span style="font-weight:bold">initial_delay</span><span>number</span><span>default:"1.0"</span></p>
<p id="t-0YmW5fieVHHTwV8bVGtzMO"><span>首次重试前的初始延迟（秒）</span></p>

<p id="t-32IHFm7HQ8p41dHlKBoryt"><span style="font-weight:bold">max_delay</span><span>number</span><span>default:"60.0"</span></p>
<p id="t-FOoVE10aoclDTjojhWiB61"><span>重试之间的最大延迟（秒）（限制指数退避增长）</span></p>

<p id="t-LAkMXpKMFzKYRYDLqjHO0X"><span style="font-weight:bold">jitter</span><span>boolean</span><span>default:"true"</span></p>
<p id="t-T13NGWrgFwidOXnwSqFpKS"><span>是否向延迟添加随机抖动（</span><span>±25%</span><span>）以避免惊群效应</span></p></blockquote>

<blockquote id="t-xdcpv77YAvjqZLcauotXtz"><img alt="" decoding="async" height="20" loading="lazy" src="/images/agent-learning/b46b78a164f2f121e1afab7c.svg" width="20"/><p id="t-HS4Hw4btFuv2VqNY92F8sj"><span style="font-weight:bold">完整示例</span></p>
<p id="t-ZS475bYv4X8kcgZWZTYclr"><span>该中间件使用指数退避自动重试失败的模型调用。</span></p>
<pre id="t-ZL4Q9CMnS5Uay1g4CT3tz3"><code>from langchain.agents import create_agent
from langchain.agents.middleware import ModelRetryMiddleware

# Basic usage with default settings (2 retries, exponential backoff)
agent = create_agent(
model="gpt-4o",
tools=[search_tool],
middleware=[ModelRetryMiddleware()],
)

# Custom exception filtering
class TimeoutError(Exception):
"""Custom exception for timeout errors."""
pass

class ConnectionError(Exception):
"""Custom exception for connection errors."""
pass

# Retry specific exceptions only
retry = ModelRetryMiddleware(
max_retries=4,
retry_on=(TimeoutError, ConnectionError),
backoff_factor=1.5,
)

def should_retry(error: Exception) -&gt; bool:
# Only retry on rate limit errors
if isinstance(error, TimeoutError):
return True
# Or check for specific HTTP status codes
if hasattr(error, "status_code"):
return error.status_code in (429, 503)
return False

retry_with_filter = ModelRetryMiddleware(
max_retries=3,
retry_on=should_retry,
)

# Return error message instead of raising
retry_continue = ModelRetryMiddleware(
max_retries=4,
on_failure="continue", # Return AIMessage with error instead of raising
)

# Custom error message formatting
def format_error(error: Exception) -&gt; str:
return f"Model call failed: {error}. Please try again later."

retry_with_formatter = ModelRetryMiddleware(
max_retries=4,
on_failure=format_error,
)

# Constant backoff (no exponential growth)
constant_backoff = ModelRetryMiddleware(
max_retries=5,
backoff_factor=0.0, # No exponential growth
initial_delay=2.0, # Always wait 2 seconds
)

# Raise exception on failure
strict_retry = ModelRetryMiddleware(
max_retries=2,
on_failure="error", # Re-raise exception instead of returning message
)</code></pre></blockquote>


<a id="section-0763"></a>
## LLM 工具模拟器

<a id="t-fhjwfO2S4wQ1GLJ8DDHple"></a>

<p id="t-5O5gAF9hed6yLYxwdN6dtR"><span style="background-color:transparent">使用 LLM 模拟工具执行以进行测试，用 AI 生成的响应替换实际工具调用。LLM 工具模拟器适用于以下场景：</span></p>

<ul><li id="t-GgiOhQRZb57FErBTIRqqKp"><span>无需执行真实工具即可测试智能体行为。</span></li></ul>

<ul><li id="t-kXXdsXuk27MuonXZlmd2MH"><span>在外部工具不可用或成本高昂时开发智能体。</span></li></ul>

<ul><li id="t-efoyPkk2porPtfS5jHW6fj"><span>在实现实际工具之前原型化智能体工作流。</span></li></ul>

<p id="t-f4jphMyZfjL373pmUoSTlK"><span style="font-weight:bold;background-color:transparent">API 参考：</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">LLMToolEmulator</span></p>

<pre id="t-FE3VIfwkLQeHc3HA3HilwE"><code>from langchain.agents import create_agent
from langchain.agents.middleware import LLMToolEmulator

agent = create_agent(
model="gpt-4o",
tools=[get_weather, search_database, send_email],
middleware=[
LLMToolEmulator(),  # Emulate all tools
],
)</code></pre>

<blockquote id="t-t766sdzoPfqOIRAoAMorsW"><img alt="" decoding="async" height="20" loading="lazy" src="/images/agent-learning/f0672dd27335ac9c5017d703.svg" width="20"/><p id="t-leWxgo9JWdVUtzByRbNQq3"><span>配</span><span style="font-weight:bold">置选项</span></p>
<p id="t-OkZcc9WDdY9xj8ddjE6Yl4"><span style="font-weight:bold">tools</span><span>list[str | BaseTool]</span></p>
<p id="t-aQJKtWPSLbkY2ghqUSDTHV"><span>要模拟的工具名称（str）或 BaseTool 实例列表。如果为 </span><span>None</span><span>（默认），将模拟所有工具。如果为空列表 </span><span>[]</span><span>，则不模拟任何工具。如果是包含工具名称/实例的数组，则仅模拟这些工具。</span></p>

<p id="t-5cbGaP9p1OYZjL6Zs6n9of"><span style="font-weight:bold">model</span><span>string | BaseChatModel</span></p>
<p id="t-aBz3r32yjHKa5lQAvUCItF"><span>用于生成模拟工具响应的模型。可以是模型标识符字符串（例如，</span><span>'anthropic:claude-sonnet-4-5-20250929'</span><span>）或</span><span>BaseChatModel</span><span>实例。如果未指定，则默认为智能体的模型。有关更多信息，请参阅</span><span style="border-bottom:1px solid;font-weight:bold">init_chat_model</span><span>。</span></p></blockquote>

<blockquote id="t-8TyNc7e7K7UW0DBEJvX3Vg"><img alt="" decoding="async" height="20" loading="lazy" src="/images/agent-learning/0a2f5a74d3472653c6cee686.svg" width="20"/><p id="t-EN71VStJlJIAFDEMuOd1MM"><span style="font-weight:bold">完整示例</span></p>
<p id="t-sUnJ1bbX7VDhnfAmpDQEw9"><span>该中间件使用 LLM 为工具调用生成合理的响应，而不是执行实际工具。</span></p>
<pre id="t-L0ZILOyyZGnZAYJ9TcQ5pf"><code>from langchain.agents import create_agent
from langchain.agents.middleware import LLMToolEmulator
from langchain.tools import tool

@tool
def get_weather(location: str) -&gt; str:
"""Get the current weather for a location."""
return f"Weather in {location}"

@tool
def send_email(to: str, subject: str, body: str) -&gt; str:
"""Send an email."""
return "Email sent"

# Emulate all tools (default behavior)
agent = create_agent(
model="gpt-4o",
tools=[get_weather, send_email],
middleware=[LLMToolEmulator()],
)

# Emulate specific tools only
agent2 = create_agent(
model="gpt-4o",
tools=[get_weather, send_email],
middleware=[LLMToolEmulator(tools=["get_weather"])],
)

# Use custom model for emulation
agent4 = create_agent(
model="gpt-4o",
tools=[get_weather, send_email],
middleware=[LLMToolEmulator(model="claude-sonnet-4-5-20250929")],
)</code></pre></blockquote>


<a id="section-0764"></a>
## 上下文编辑

<a id="t-192q5c4H43LnUvxrwrJ5uP"></a>

<p id="t-TruWzOZYtJrqmgOI2rTScA"><span style="background-color:transparent">通过清除达到令牌限制时的旧工具调用输出来管理对话上下文，同时保留最近的结果。这有助于在包含许多工具调用的长对话中保持上下文窗口可控。上下文编辑适用于以下场景：</span></p>

<ul><li id="t-nGEOKMUdVdfTmfkFxiQMJM"><span>包含许多工具调用且超出令牌限制的长对话</span></li></ul>

<ul><li id="t-X7q40JAcqTWHgVA1lnGcan"><span>通过删除不再相关的旧工具输出来降低令牌成本</span></li></ul>

<ul><li id="t-bCPdExPvBkeUbftScrj0qM"><span>在上下文中仅保留最近的 N 个工具结果</span></li></ul>

<p id="t-Kor8IGboMfpfcZrBjsuwWq"><span style="font-weight:bold;background-color:transparent">API 参考：</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">ContextEditingMiddleware</span><span style="background-color:transparent">,</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">ClearToolUsesEdit</span></p>

<pre id="t-inRvsK0lANKkKXyV5W0AII"><code>from langchain.agents import create_agent
from langchain.agents.middleware import ContextEditingMiddleware, ClearToolUsesEdit

agent = create_agent(
model="gpt-4o",
tools=[],
middleware=[
ContextEditingMiddleware(
edits=[
ClearToolUsesEdit(
trigger=100000,
keep=3,
),
],
),
],
)</code></pre>

<blockquote id="t-NIc1ZhSzVmAaAjSCG8TcHa"><img alt="" decoding="async" height="20" loading="lazy" src="/images/agent-learning/adc2dd4d08bf27fd97397504.svg" width="20"/><p id="t-Lwhnj0y7jhRKykG3Nzxp1F"><span style="font-weight:bold">配置选项</span></p>
<p id="t-oqOoSMXGLqhZPMV63xTb9Z"><span style="font-weight:bold">edits</span><span>list[ContextEdit]default:"[ClearToolUsesEdit()]"</span></p>
<p id="t-d6ezGc4eKl3wVfF6G0UXz1"><span>要应用的 </span><span style="border-bottom:1px solid;font-weight:bold">ContextEdit</span><span> 策略列表</span></p>

<p id="t-gXh0VSElDYMxkyRk8RvkQO"><span style="font-weight:bold">token_count_method</span><span>string</span><span>default:"approximate"</span></p>
<p id="t-25NcT9rJYb9tfj6cRjeRpq"><span>令牌计数方法。选项：</span><span>'approximate'</span><span>或</span><span>'model'</span></p>
<p id="t-2yCEzbD4woXX8bhr1JHGCU"><span style="border-bottom:1px solid;font-weight:bold">ClearToolUsesEdit</span><span style="font-weight:bold"> 选项：</span></p>

<p id="t-CjGSPJxcSVMjy3wlQoSkyK"><span style="font-weight:bold">trigger</span><span>number</span><span>default:"100000"</span></p>
<p id="t-JXGRYMRljeUYsFpIyZP47f"><span>触发编辑的令牌计数。当对话超过此令牌计数时，将清除旧工具输出。</span></p>

<p id="t-TIg1apkRVtJ3lZ90Vccun2"><span style="font-weight:bold">clear_at_least</span><span>number</span><span>default:"0"</span></p>
<p id="t-k2wIPnKFVx9o67nFcrTOLJ"><span>编辑运行时至少要回收的令牌数。如果设置为 0，则根据需要清除尽可能多的内容。</span></p>

<p id="t-ZNVnQ6fDiy10Xq24L4whFa"><span style="font-weight:bold">keep</span><span>number</span><span>default:"3"</span></p>
<p id="t-1Ez8cJEoBuvPlXSx8D4sck"><span>必须保留的最远工具结果数量。这些永远不会被清除。</span></p>

<p id="t-giy7MVy9IoEDa23apNFK5s"><span style="font-weight:bold">clear_tool_inputs</span><span>boolean</span><span>default:"False"</span></p>
<p id="t-IEvI6qlOr3Ob5APIJ5Hzl0"><span>是否清除 AI 消息上的原始工具调用参数。当为 </span><span>True</span><span> 时，工具调用参数将替换为空对象。</span></p>

<p id="t-pKR6L6gOw7qEmFNFCYryRv"><span style="font-weight:bold">exclude_tools</span><span>list[string]</span><span>default:"()"</span></p>
<p id="t-BGyEFqNjsqbIYRUBPaxKLM"><span>要排除在清除之外的工具名称列表。这些工具的输出永远不会被清除。</span></p>

<p id="t-5ygVfM4nsURfQ1UUCOpxNT"><span style="font-weight:bold">placeholder</span><span>string</span><span>default:"[cleared]"</span></p>
<p id="t-yF2OaGSb6KkRVYipVxBCiV"><span>为已清除的工具输出插入的占位符文本。这将替换原始工具消息内容。</span></p></blockquote>

<blockquote id="t-fwHBnAx1t8FCRMCD4vRaQe"><img alt="" decoding="async" height="20" loading="lazy" src="/images/agent-learning/b46b78a164f2f121e1afab7c.svg" width="20"/><p id="t-OwklKtOBZlHSS3SQT0uvIn"><span style="font-weight:bold">完整示例</span></p>
<p id="t-fEMjmFo8Mv9nBZLe3Fg8pU"><span>该中间件在达到令牌限制时应用上下文编辑策略。最常见的策略是</span><span>ClearToolUsesEdit</span><span>，它在保留最近结果的同时清除旧工具结果。</span></p>
<p id="t-QGPTAc9K0p2XBUIakQNOVg"><span style="font-weight:bold">工作原理：</span></p>
<ol start="1"><li id="t-4lOjcZa2RlI0o7ebHJuR4t"><span>监控对话中的令牌计数</span></li></ol>
<ol start="2"><li id="t-bc4cLt2XsVTv8Q306Vz4R6"><span>达到阈值时，清除旧工具输出</span></li></ol>
<ol start="3"><li id="t-VtHJ3zrIEqqxa4ctafIskC"><span>保留最近的 N 个工具结果</span></li></ol>
<ol start="4"><li id="t-8mQ8OYJ7LqhY8TYHuSmqh0"><span>可选地保留工具调用参数以供上下文使用</span></li></ol>
<pre id="t-aXTL5B4P6sLxwW7sizCTaI"><code>from langchain.agents import create_agent
from langchain.agents.middleware import ContextEditingMiddleware, ClearToolUsesEdit

agent = create_agent(
model="gpt-4o",
tools=[search_tool, your_calculator_tool, database_tool],
middleware=[
ContextEditingMiddleware(
edits=[
ClearToolUsesEdit(
trigger=2000,
keep=3,
clear_tool_inputs=False,
exclude_tools=[],
placeholder="[cleared]",
),
],
),
],
)</code></pre></blockquote>


<a id="section-0765"></a>
## Shell 工具

<a id="t-IZpkOttmJhaxMW6juZI8R1"></a>

<p id="t-91h2xLSYgOE3sEFfwZWTfG"><span style="background-color:transparent">向智能体公开一个持久的 Shell 会话以执行命令。Shell 工具中间件适用于以下场景：</span></p>

<ul><li id="t-DHjo7Uh1G5oHxQWCPfZW8E"><span>需要执行系统命令的智能体</span></li></ul>

<ul><li id="t-9bWsYwYYc2nal7scHsGOD5"><span>开发和部署自动化任务</span></li></ul>

<ul><li id="t-PLC1usMd4KzCyrAu05qoUz"><span>测试和验证工作流</span></li></ul>

<ul><li id="t-a9DMIn5mWhjJm6KVfTfLGW"><span>文件系统操作和脚本执行</span></li></ul>

<blockquote id="t-LAeKLZaYzeMBcANoMa5jLo"><img alt="" decoding="async" height="20" loading="lazy" src="/images/agent-learning/2d20f9f96ce7eed0ccc3287f.svg" width="20"/><p id="t-No17shcph1ClipARPt4Qes"><span style="font-weight:bold">安全考虑</span><span>：使用适当的执行策略（</span><span>HostExecutionPolicy</span><span>、</span><span>DockerExecutionPolicy</span><span> 或 </span><span>CodexSandboxExecutionPolicy</span><span>）以匹配您部署的安全要求。</span></p></blockquote>

<blockquote id="t-X89sgDwVvXamMQPxSIaMSu"><p id="t-j55HU3kF93IVKuPxpCc8zd"><span style="font-weight:bold">限制</span><span>：持久的 Shell 会话目前不适用于中断（人在回路中）。我们预计未来会添加对此的支持。</span></p></blockquote>

<p id="t-J6RcqsZrFX8699hrTmGjdn"><span style="font-weight:bold;background-color:transparent">API 参考：</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">ShellToolMiddleware</span></p>

<pre id="t-cw9RhY6PLedGjofAqdnWXH"><code>from langchain.agents import create_agent
from langchain.agents.middleware import (
ShellToolMiddleware,
HostExecutionPolicy,
)

agent = create_agent(
model="gpt-4o",
tools=[search_tool],
middleware=[
ShellToolMiddleware(
workspace_root="/workspace",
execution_policy=HostExecutionPolicy(),
),
],
)</code></pre>

<blockquote id="t-1mMfMlCECDLsoPLQ3SoPfy"><img alt="" decoding="async" height="20" loading="lazy" src="/images/agent-learning/0761328a8fd806259702242b.svg" width="20"/><p id="t-BaElurUyMetBrUSMWO6uJC"><span style="font-weight:bold">配置选项</span></p>
<p id="t-AjQaXHHenTfRZYiVmAdSDg"><span style="font-weight:bold">workspace_root</span><span>str | Path | None</span></p>
<p id="t-DXcUwMaBLqKfJrriTTNINU"><span>Shell 会话的基目录。如果省略，则在智能体启动时创建临时目录，并在结束时删除。</span></p>

<p id="t-Fnn6Dil3ROTes14XrRo6Gg"><span style="font-weight:bold">startup_commands</span><span>tuple[str, ...] | list[str] | str | None</span></p>
<p id="t-4RSFUTtVqD1UUMkf13nZB1"><span>会话启动后按顺序执行的可选命令</span></p>

<p id="t-C0gs1DEAuAPiK6XvBo5Uuy"><span style="font-weight:bold">shutdown_commands</span><span>tuple[str, ...] | list[str] | str | None</span></p>
<p id="t-WVXCIToNVQCyLZGn2qiGlG"><span>会话关闭前执行的可选命令</span></p>

<p id="t-8V8GJwRyNUBaThx7iqcQoW"><span style="font-weight:bold">execution_policy</span><span>BaseExecutionPolicy | None</span></p>
<p id="t-VkNr9IA8SuP98mflfH9Kks"><span>控制超时、输出限制和资源配置的执行策略。选项：</span></p>
<ul><li id="t-gfNOhhfD9oy43OXYuyhmCA"><span>HostExecutionPolicy</span><span>- 完全主机访问（默认）；最适合智能体已在容器或 VM 内运行的受信任环境</span></li></ul>
<ul><li id="t-HGZ8sbUDlBNg7MRMkJYLMW"><span>DockerExecutionPolicy</span><span>- 为每次智能体运行启动一个单独的 Docker 容器，提供更强的隔离性</span></li></ul>
<ul><li id="t-1biK6K5Ki7YqV4alMA0XMl"><span>CodexSandboxExecutionPolicy</span><span>- 重用 Codex CLI 沙箱以提供额外的系统调用/文件系统限制</span></li></ul>
<p id="t-PWfCH3juo4fNSn2x0ZmmUY"><span style="font-weight:bold">redaction_rules</span><span>tuple[RedactionRule, ...] | list[RedactionRule] | None</span></p>
<p id="t-VtVZQswOAhOQt1pwULInpr"><span>用于在将命令输出返回给模型之前对其进行清理的可选脱敏规则。</span></p>
<blockquote id="t-bCWYdCDAyWZBkl26BwZeyY"><img alt="" decoding="async" height="20" loading="lazy" src="/images/agent-learning/040e0a04356c12994f61a701.svg" width="20"/><p id="t-M7BoAVw0zLypkCLN0lcaAB"><span>脱敏规则在事后应用，在使用 </span><span>HostExecutionPolicy</span><span> 时无法防止秘密或敏感数据的外泄。</span></p></blockquote>
<p id="t-Vxsh5HLnRM1xvNK7mnLu04"><span style="font-weight:bold">tool_description</span><span>str | None</span></p>
<p id="t-Ijd6NM9v2EQGZctTzMZ95y"><span>已注册的 Shell 工具描述的可选覆盖</span></p>

<p id="t-PFRDRPAxPcMopytBgIAluk"><span style="font-weight:bold">shell_command</span><span>Sequence[str] | str | None</span></p>
<p id="t-y74lGzwsMVR9mgLci6GpjK"><span>用于启动持久会话的可选 Shell 可执行文件（字符串）或参数序列。默认为</span><span>/bin/bash</span><span>。</span></p>

<p id="t-l7MViZOEVS9kmGTFM18uj9"><span style="font-weight:bold">env</span><span>Mapping[str, Any] | None</span></p>
<p id="t-nz0sUlSVPJJDh8kMMoFO16"><span>提供给 Shell 会话的可选环境变量。值在命令执行前被强制转换为字符串。</span></p></blockquote>

<blockquote id="t-8Qh5rq9PJL943z9n5yeqTf"><img alt="" decoding="async" height="20" loading="lazy" src="/images/agent-learning/040e0a04356c12994f61a701.svg" width="20"/><p id="t-RytJVCVijURll76y3PakvI"><span style="font-weight:bold">完整示例</span></p>
<p id="t-NxzQcKdlSKQTzClBVFHOWg"><span>该中间件提供一个单一的持久 Shell 会话，智能体可以使用它来顺序执行命令。</span></p>
<p id="t-uUajVrpg86pids0QvQhZLU"><span style="font-weight:bold">执行策略：</span></p>
<ul><li id="t-kWav17lEo1xrRotGi83arv"><span>HostExecutionPolicy</span><span>（默认） - 具有完全主机访问权限的本机执行</span></li></ul>
<ul><li id="t-xZPka8RCOonkgwgpF8JKWX"><span>DockerExecutionPolicy</span><span>- 隔离的 Docker 容器执行</span></li></ul>
<ul><li id="t-bTu5F7N75HBg3l85aZxvei"><span>CodexSandboxExecutionPolicy</span><span>- 通过 Codex CLI 进行沙箱化执行</span></li></ul>
<pre id="t-5e8WRA6L3grnWOlKz0veEN"><code>from langchain.agents import create_agent
from langchain.agents.middleware import (
    ShellToolMiddleware,
    HostExecutionPolicy,
    DockerExecutionPolicy,
    RedactionRule,
)

# Basic shell tool with host execution
agent = create_agent(
    model="gpt-4o",
    tools=[search_tool],
    middleware=[
        ShellToolMiddleware(
            workspace_root="/workspace",
            execution_policy=HostExecutionPolicy(),
 ),
 ],
)

# Docker isolation with startup commands
agent_docker = create_agent(
    model="gpt-4o",
    tools=[],
    middleware=[
        ShellToolMiddleware(
            workspace_root="/workspace",
            startup_commands=["pip install requests", "export PYTHONPATH=/workspace"],
            execution_policy=DockerExecutionPolicy(
                image="python:3.11-slim",
                command_timeout=60.0,
 ),
 ),
 ],
)

# With output redaction (applied post execution)
agent_redacted = create_agent(
    model="gpt-4o",
    tools=[],
    middleware=[
        ShellToolMiddleware(
            workspace_root="/workspace",
            redaction_rules=[
                RedactionRule(pii_type="api_key", detector=r"sk-[a-zA-Z0-9]{32}"),
 ],
 ),
 ],
)</code></pre></blockquote>


<a id="section-0766"></a>
## 文件搜索

<a id="t-R6Ppkv9YigpXOvG36YFviB"></a>

<p id="t-OEOdjiXalL0gSDQj1Mvs18"><span style="background-color:transparent">提供基于文件系统的 Glob 和 Grep 搜索工具。文件搜索中间件适用于以下场景：</span></p>

<ul><li id="t-65Sjq5IDiFpuZ2tsPu2XXn"><span>代码探索与分析</span></li></ul>

<ul><li id="t-TrH1gZcAfrnWzMy2gMnlm6"><span>通过文件名模式查找文件</span></li></ul>

<ul><li id="t-AHpXfm4NMuGF6KOLaXXOrm"><span>使用正则表达式搜索代码内容</span></li></ul>

<ul><li id="t-WXytc9NfWhvjXutBKuXthe"><span>需要文件发现的大型代码库</span></li></ul>

<p id="t-0lr0DoSM8HNkLTUebpszWc"><span style="font-weight:bold;background-color:transparent">API 参考：</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">FilesystemFileSearchMiddleware</span></p>

<pre id="t-nAqio3wiahfqad9YOGKkYl"><code>from langchain.agents import create_agent
from langchain.agents.middleware import FilesystemFileSearchMiddleware

agent = create_agent(
    model="gpt-4o",
    tools=[],
    middleware=[
        FilesystemFileSearchMiddleware(
            root_path="/workspace",
            use_ripgrep=True,
 ),
 ],
)</code></pre>

<blockquote id="t-HpuFydOQvnVNjNi7xwTk0R"><img alt="" decoding="async" height="20" loading="lazy" src="/images/agent-learning/040e0a04356c12994f61a701.svg" width="20"/><p id="t-ticozyVYWYF5rreabrGMl8"><span style="font-weight:bold">配置选项</span></p>
<p id="t-HqwHpSGjIB6I4beMT89PBb"><span style="font-weight:bold">root_path</span><span>str</span><span style="font-weight:bold">required</span></p>
<p id="t-0XqI1d1RGtkBwq7nGhwZtz"><span>搜索的根目录。所有文件操作均相对于此路径。</span></p>

<p id="t-DDPOceZVhbw5JVdYGxOVlW"><span style="font-weight:bold">use_ripgrep</span><span>bool</span><span>default:"True"</span></p>
<p id="t-oq5faqgJSEvoYpfLKaVdZO"><span>是否使用 ripgrep 进行搜索。如果 ripgrep 不可用，则回退到 Python 正则表达式。</span></p>

<p id="t-0ziFCdhvU4myB9vnv8qd4l"><span style="font-weight:bold">max_file_size_mb</span><span>int</span><span>default:"10"</span></p>
<p id="t-0tXbpl8rK9oDmCPjbqIcoG"><span>要搜索的最大文件大小（以 MB 为单位）。大于此大小的文件将被跳过。</span></p></blockquote>

<blockquote id="t-EkOsO5nVzZXPiRvveQHuGF"><img alt="" decoding="async" height="20" loading="lazy" src="/images/agent-learning/040e0a04356c12994f61a701.svg" width="20"/><p id="t-7hqJJZ06YIuiBaUYMDwNIR"><span style="font-weight:bold">完整示例</span></p>
<p id="t-AO53Td7ZFMuu49mb6bEtH1"><span>该中间件为智能体添加了两个搜索工具：</span></p>
<p id="t-EIEdkf51uoARKWVLTbOyUU"><span style="font-weight:bold">Glob 工具</span><span>- 快速文件模式匹配：</span></p>
<ul><li id="t-SXjeoHUlNMEhHzPf4ePst8"><span>支持模式如</span><span>**/*.py</span><span>、</span><span>src/**/*.ts</span></li></ul>
<ul><li id="t-wsZpoLCfGSh7CVwn3mykjF"><span>返回按修改时间排序的匹配文件路径</span></li></ul>

<p id="t-uZO51OLfOaZCFxJ90wUgjv"><span style="font-weight:bold">Grep 工具</span><span>- 使用正则表达式进行内容搜索：</span></p>
<ul><li id="t-2uevumbRXGqxsWSlXJHi4B"><span>支持完整的正则表达式语法</span></li></ul>
<ul><li id="t-rj6Wc5AHHhQ33Rg6VhB0FF"><span>通过</span><span>include</span><span>参数按文件模式过滤</span></li></ul>
<ul><li id="t-kJROyw6mhDt8DNg7btNfWB"><span>三种输出模式：</span><span>files_with_matches</span><span>、</span><span>content</span><span>、</span><span>count</span></li></ul>
<pre id="t-4oszVMKrUd0fJDy2mIJjNl"><code>from langchain.agents import create_agent
from langchain.agents.middleware import FilesystemFileSearchMiddleware
from langchain.messages import HumanMessage

agent = create_agent(
    model="gpt-4o",
    tools=[],
    middleware=[
        FilesystemFileSearchMiddleware(
            root_path="/workspace",
            use_ripgrep=True,
            max_file_size_mb=10,
 ),
 ],
)

# Agent can now use glob_search and grep_search tools
result = agent.invoke({
 "messages": [HumanMessage("Find all Python files containing 'async def'")]
})

# The agent will use:
# 1. glob_search(pattern="**/*.py") to find Python files
# 2. grep_search(pattern="async def", include="*.py") to find async functions</code></pre></blockquote>


<a id="section-0767"></a>
## 特定于提供商的中间件

<a id="t-nwHy8B5lShE760uGBirjPg"></a>

<p id="t-9a4OEpxIZmgzwR9J2jvTft"><span style="background-color:transparent">这些中间件针对特定的 LLM 提供商进行了优化。有关完整详细信息和示例，请参阅每个提供商的文档。</span></p>

<div id="t-xkzweOEDhrHDzEF8l5KJ0G"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/7b4c825705edbe5dd6a21f60.png"/></div>


<a id="section-0770"></a>
## 护栏 (Guardrails)

<a id="t-block-17057"></a>

<p id="t-LGXbkpu7i1Z8XB7kb6SpIo"><span style="background-color:transparent">防护栏（Guardrails）通过在智能体执行的关键节点验证和过滤内容，帮助您构建安全、合规的 AI 应用。它们可以检测敏感信息、强制执行内容策略、验证输出，并在问题发生前阻止不安全行为。</span></p>

<p id="t-uZSSm6Ep76ZvOS6OzECJrb"><span style="background-color:transparent">常见用例包括：</span></p>

<ul><li id="t-CeWtfkhoj2vhV4zdvkkhSS"><span>防止 PII（个人身份信息）泄露</span></li></ul>

<ul><li id="t-ELeSUubxEpXwbPbrB6a2cx"><span>检测并阻止提示注入攻击</span></li></ul>

<ul><li id="t-pVccGBDKLuwk590qoKloRr"><span>阻止不当或有害内容</span></li></ul>

<ul><li id="t-Mgmk6MYy8bNZVHRM5LSjUI"><span>执行业务规则和合规要求</span></li></ul>

<ul><li id="t-onlsEpUvQmtZRBshUvZlF0"><span>验证输出质量和准确性</span></li></ul>

<p id="t-PQlFQVFR5QMXl2dNTnUF05"><span style="background-color:transparent">您可以使用</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">中间件</span><span style="background-color:transparent">在关键节点拦截执行，从而实施防护栏——例如在智能体启动前、完成后，或在模型调用和工具调用前后。</span></p>

<div id="t-YzQXMojXtIJQ56yfnrL8OE"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/7288281581283198922f6d6a.png"/></div>

<p id="t-eqebE62QEu1TDTNFMTaGA7"><span style="background-color:transparent">防护栏可以通过两种互补的方法实现：</span></p>

<p id="t-mb18L9ZWduWnZiqxTw8lmY"><span style="border-bottom:1px solid;font-weight:bold">确定性防护栏</span><span style="border-bottom:1px solid;font-weight:bold">
使用基于规则的逻辑，如正则表达式模式、关键词匹配或显式检查。快速、可预测且成本效益高，但可能遗漏细微的违规行为。</span><span style="border-bottom:1px solid;font-weight:bold">基于模型的防护栏</span><span style="border-bottom:1px solid;font-weight:bold">
使用 LLM 或分类器通过语义理解来评估内容。能捕捉规则遗漏的微妙问题，但速度较慢且成本更高。</span></p>

<p id="t-OHVCoGSxiqWiGq81qmIYdG"><span style="background-color:transparent">LangChain 提供了内置的防护栏（例如 </span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">PII 检测</span><span style="background-color:transparent">、</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">人工介入</span><span style="background-color:transparent">）以及一个灵活的中间件系统，用于使用上述任一方法构建自定义防护栏。</span></p>


<a id="section-0772"></a>
## PII 检测

<a id="t-gJO0oLRoBZvkVdCSDzPoFq"></a>

<p id="t-QXmelVpMhyLCxKL40r8zdR"><span style="background-color:transparent">LangChain 提供了内置的中间件，用于检测和处理对话中的个人身份信息（PII）。该中间件可以检测常见的 PII 类型，如电子邮件、信用卡、IP 地址等。</span></p>

<p id="t-Tl73vxFLl2e50EkYow57iN"><span style="background-color:transparent">PII 检测中间件适用于以下场景：具有合规要求的医疗保健和金融应用、需要清理日志的客户服务代理，以及任何处理敏感用户数据的应用。</span></p>

<p id="t-YSfDU3MHydDP2NL4Eu0JzR"><span style="background-color:transparent">PII 中间件支持多种处理检测到的 PII 的策略：</span></p>

<div id="t-xy1tvFFeyll1gfOuLQ0DjA"><table><colgroup><col width="120"/><col width="299.5"/><col width="295"/></colgroup><tbody><tr><td><p><span>策略</span></p></td><td><p><span>描述</span></p></td><td><p><span>示例</span></p></td></tr><tr><td><p><span style="border-bottom:1px solid">redact</span></p></td><td><p><span style="border-bottom:1px solid">替换为</span><span style="border-bottom:1px solid">[REDACTED_{PII_TYPE}]</span></p></td><td><p><span style="border-bottom:1px solid">[REDACTED_EMAIL]</span></p></td></tr><tr><td><p><span style="border-bottom:1px solid">mask</span></p></td><td><p><span style="border-bottom:1px solid">部分遮蔽（例如，最后 4 位数字）</span></p></td><td><p><span style="border-bottom:1px solid">****-****-****-1234</span></p></td></tr><tr><td><p><span style="border-bottom:1px solid">hash</span></p></td><td><p><span style="border-bottom:1px solid">替换为确定性哈希值</span></p></td><td><p><span style="border-bottom:1px solid">a8f5f167...</span></p></td></tr><tr><td><p><span style="border-bottom:1px solid">block</span></p></td><td><p><span style="border-bottom:1px solid">检测到时抛出异常</span></p></td><td><p><span style="border-bottom:1px solid">抛出错误</span></p></td></tr></tbody></table></div>

<pre id="t-GbAPQA07m5whu9eH2MB39P"><code>from langchain.agents import create_agent
from langchain.agents.middleware import PIIMiddleware

agent = create_agent(
    model="gpt-4o",
    tools=[customer_service_tool, email_tool],
    middleware=[
 # 在发送给模型之前，对用户输入中的电子邮件进行编辑
        PIIMiddleware(
 "email",
            strategy="redact",
            apply_to_input=True,
 ),
 # 对用户输入中的信用卡进行掩码处理
        PIIMiddleware(
 "credit_card",
            strategy="mask",
            apply_to_input=True,
 ),
 # 阻止 API 密钥 - 如果检测到则抛出错误
        PIIMiddleware(
 "api_key",
            detector=r"sk-[a-zA-Z0-9]{32}",
            strategy="block",
            apply_to_input=True,
 ),
 ],
)

# 当用户提供 PII 时，将根据策略进行处理
result = agent.invoke({
 "messages": [{"role": "user", "content": "My email is john.doe@example.com and card is 5105-1051-0510-5100"}]
})</code></pre>

<p id="t-LgWnhDdUpAnmmdkGsT2rfU"><span style="font-weight:bold">内置 PII 类型：</span></p>

<ul><li id="t-cWdKUMZ2803R3wD2ImTxwi"><span>email</span><span>- 电子邮件地址</span></li></ul>

<ul><li id="t-Jb2vakemZA4YA9Vu27r8jB"><span>credit_card</span><span>- 信用卡号（经过 Luhn 算法验证）</span></li></ul>

<ul><li id="t-9KOybaygak566HOapMs6uq"><span>ip</span><span>- IP 地址</span></li></ul>

<ul><li id="t-GS6855RvMKvIIyAuj5opU2"><span>mac_address</span><span>- MAC 地址</span></li></ul>

<ul><li id="t-MuHG4224QFwSyPKHwmBDI5"><span>url</span><span>- URL</span></li></ul>

<p id="t-DO2rlJJSKfx1El9npLvEqh"><span style="font-weight:bold">配置选项：</span></p>

<div id="t-CM03yAK3gDMpJFTtzz4HyI"><table><colgroup><col width="229.5"/><col width="340.5"/><col width="173.5"/></colgroup><tbody><tr><td><p><span>参数</span></p></td><td><p><span>描述</span></p></td><td><p><span>默认值</span></p></td></tr><tr><td><p><span style="border-bottom:1px solid">pii_type</span></p></td><td><p><span style="border-bottom:1px solid">要检测的 PII 类型（内置或自定义）</span></p></td><td><p><span style="border-bottom:1px solid">必需</span></p></td></tr><tr><td><p><span style="border-bottom:1px solid">strategy</span></p></td><td><p><span style="border-bottom:1px solid">如何处理检测到的 PII (</span><span style="border-bottom:1px solid">"block"</span><span style="border-bottom:1px solid">,</span><span style="border-bottom:1px solid">"redact"</span><span style="border-bottom:1px solid">,</span><span style="border-bottom:1px solid">"mask"</span><span style="border-bottom:1px solid">,</span><span style="border-bottom:1px solid">"hash"</span><span style="border-bottom:1px solid">)</span></p></td><td><p><span style="border-bottom:1px solid">"redact"</span></p></td></tr><tr><td><p><span style="border-bottom:1px solid">detector</span></p></td><td><p><span style="border-bottom:1px solid">自定义检测器函数或正则表达式模式</span></p></td><td><p><span style="border-bottom:1px solid">None</span><span style="border-bottom:1px solid">（使用内置）</span></p></td></tr><tr><td><p><span style="border-bottom:1px solid">apply_to_input</span></p></td><td><p><span style="border-bottom:1px solid">在模型调用前检查用户消息</span></p></td><td><p><span style="border-bottom:1px solid">True</span></p></td></tr><tr><td><p><span style="border-bottom:1px solid">apply_to_output</span></p></td><td><p><span style="border-bottom:1px solid">在模型调用后检查 AI 消息</span></p></td><td><p><span style="border-bottom:1px solid">False</span></p></td></tr><tr><td><p><span style="border-bottom:1px solid">apply_to_tool_results</span></p></td><td><p><span style="border-bottom:1px solid">在执行后检查工具结果消息</span></p></td><td><p><span style="border-bottom:1px solid">False</span></p></td></tr></tbody></table></div>


<a id="section-0773"></a>
## 人工介入

<a id="t-0vBEurjZvoUQv1aA2B4O5I"></a>

<p id="t-2Fviu82CrqXXN62wVJFKc0"><span style="background-color:transparent">LangChain 提供了内置的中间件，用于在执行敏感操作前要求人工批准。这是处理高风险决策最有效的防护栏之一。</span></p>

<p id="t-wdECcoc9w8qW3IeaH0ZiyM"><span style="background-color:transparent">人工介入中间件适用于以下场景：金融交易和转账、删除或修改生产数据、向外部发送通信，以及任何具有重大业务影响的操作。</span></p>

<pre id="t-usLB8h2kmZgQEc2LzYcQFf"><code>from langchain.agents import create_agent
from langchain.agents.middleware import HumanInTheLoopMiddleware
from langgraph.checkpoint.memory import InMemorySaver
from langgraph.types import Command

agent = create_agent(
    model="gpt-4o",
    tools=[search_tool, send_email_tool, delete_database_tool],
    middleware=[
        HumanInTheLoopMiddleware(
            interrupt_on={
 # 敏感操作需要批准
 "send_email": True,
 "delete_database": True,
 # 自动批准安全操作
 "search": False,
 }
 ),
 ],
 # 在中断期间保持状态
    checkpointer=InMemorySaver(),
)

# 人工介入需要一个线程 ID 来保持持久性
config = {"configurable": {"thread_id": "some_id"}}

# 代理将在执行敏感工具前暂停并等待批准
result = agent.invoke(
 {"messages": [{"role": "user", "content": "Send an email to the team"}]},
    config=config
)

result = agent.invoke(
    Command(resume={"decisions": [{"type": "approve"}]}),
    config=config  # 相同的线程 ID 以恢复暂停的对话
)</code></pre>


<a id="section-0774"></a>
## 自定义防护栏

<a id="t-15FyCxm4lVvFnn2eKqj52T"></a>

<p id="t-b9qOoqDBIFvwQtawuq1JI2"><span style="background-color:transparent">对于更复杂的防护栏，您可以创建在智能体执行前后运行的自定义中间件。这使您可以完全控制验证逻辑、内容过滤和安全检查。</span></p>


<a id="section-0775"></a>
## 智能体执行前的防护栏

<a id="t-Q0hkwFhMtjUi1wGXBnkLgN"></a>

<p id="t-9iLhILFGzUMxPj5ZeHizRw"><span style="background-color:transparent">使用“智能体执行前”钩子在每次调用的开始时验证请求。这对于会话级别的检查非常有用，例如身份验证、速率限制，或在任何处理开始前阻止不当请求。</span></p>

<pre id="t-X1Q3G5py17TjlVEyYYukCA"><code>from typing import Any

from langchain.agents.middleware import AgentMiddleware, AgentState, hook_config
from langgraph.runtime import Runtime

class ContentFilterMiddleware(AgentMiddleware):
 """确定性防护栏：阻止包含禁用关键词的请求。"""

 def __init__(self, banned_keywords: list[str]):
 super().__init__()
        self.banned_keywords = [kw.lower() for kw in banned_keywords]

 @hook_config(can_jump_to=["end"])
 def before_agent(self, state: AgentState, runtime: Runtime) -&gt; dict[str, Any] | None:
 # 获取第一条用户消息
 if not state["messages"]:
 return None

        first_message = state["messages"][0]
 if first_message.type != "human":
 return None

        content = first_message.content.lower()

 # 检查禁用关键词
 for keyword in self.banned_keywords:
 if keyword in content:
 # 在任何处理前阻止执行
 return {
 "messages": [{
 "role": "assistant",
 "content": "I cannot process requests containing inappropriate content. Please rephrase your request."
 }],
 "jump_to": "end"
 }

 return None

# 使用自定义防护栏
from langchain.agents import create_agent

agent = create_agent(
    model="gpt-4o",
    tools=[search_tool, calculator_tool],
    middleware=[
        ContentFilterMiddleware(
            banned_keywords=["hack", "exploit", "malware"]
 ),
 ],
)

# 此请求将在任何处理前被阻止
result = agent.invoke({
 "messages": [{"role": "user", "content": "How do I hack into a database?"}]
})</code></pre>


<a id="section-0776"></a>
## 智能体执行后的防护栏

<a id="t-OGTrqTeZwJvHZtlAjzse5M"></a>

<p id="t-xRdJp4LiChQfOjv4grWcms"><span style="background-color:transparent">使用“智能体执行后”钩子在返回给用户之前验证最终输出。这对于基于模型的安全检查、质量验证或对完整智能体响应的最终合规性扫描非常有用。</span></p>

<pre id="t-LFMc3jazJqWdS5Ovndak4F"><code>from langchain.agents.middleware import AgentMiddleware, AgentState, hook_config
from langgraph.runtime import Runtime
from langchain.messages import AIMessage
from langchain.chat_models import init_chat_model
from typing import Any

class SafetyGuardrailMiddleware(AgentMiddleware):
 """基于模型的防护栏：使用 LLM 评估响应安全性。"""

 def __init__(self):
 super().__init__()
        self.safety_model = init_chat_model("gpt-4o-mini")

 @hook_config(can_jump_to=["end"])
 def after_agent(self, state: AgentState, runtime: Runtime) -&gt; dict[str, Any] | None:
 # 获取最终的 AI 响应
 if not state["messages"]:
 return None

        last_message = state["messages"][-1]
 if not isinstance(last_message, AIMessage):
 return None

 # 使用模型评估安全性
        safety_prompt = f"""Evaluate if this response is safe and appropriate.
        Respond with only 'SAFE' or 'UNSAFE'.

        Response: {last_message.content}"""

        result = self.safety_model.invoke([{"role": "user", "content": safety_prompt}])

 if "UNSAFE" in result.content:
            last_message.content = "I cannot provide that response. Please rephrase your request."

 return None

# 使用安全防护栏
from langchain.agents import create_agent

agent = create_agent(
    model="gpt-4o",
    tools=[search_tool, calculator_tool],
    middleware=[SafetyGuardrailMiddleware()],
)

result = agent.invoke({
 "messages": [{"role": "user", "content": "How do I make explosives?"}]
})</code></pre>


<a id="section-0777"></a>
## 组合多个防护栏 (Combine multiple guardrails)

<a id="t-PrhRPcOrUhVyjBm2d1TiNc"></a>

<p id="t-0PdQ9GgYifwpiF7APyzLgX"><span style="background-color:transparent">您可以通过将多个防护栏添加到 middleware 数组来叠加使用它们。它们按顺序执行，允许您构建分层防护：</span></p>

<pre id="t-wbMGcaZROImoWZV9VXnaj8"><code>from langchain.agents import create_agent
from langchain.agents.middleware import PIIMiddleware, HumanInTheLoopMiddleware

agent = create_agent(
    model="gpt-4o",
    tools=[search_tool, send_email_tool],
    middleware=[
 # 第 1 层：确定性输入过滤（在智能体执行前运行）
        ContentFilterMiddleware(banned_keywords=["hack", "exploit"]),

 # 第 2 层：PII 保护（在模型调用前后运行）
        PIIMiddleware("email", strategy="redact", apply_to_input=True),
        PIIMiddleware("email", strategy="redact", apply_to_output=True),

 # 第 3 层：针对敏感工具的人工审批
        HumanInTheLoopMiddleware(interrupt_on={"send_email": True}),

 # 第 4 层：基于模型的安全检查（在智能体执行后运行）
        SafetyGuardrailMiddleware(),
 ],
)</code></pre>


<a id="section-0779"></a>
## 概述

<a id="t-gP8ytKXWdozdbk1MnObdsQ"></a>

<p id="t-ukEEOlGaAhAh4xB5XA54sv"><span style="background-color:transparent">LangChain 的 </span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">create_agent</span><span style="background-color:transparent"> 底层运行在 LangGraph 的运行时上。</span></p>

<p id="t-ex0WgXqR1oDHfF73LCLAAf"><span style="background-color:transparent">LangGraph 暴露了一个 </span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">Runtime</span><span style="background-color:transparent"> 对象，包含以下信息：</span></p>

<ol start="1"><li id="t-wAbIZVjt1JYmpzI2CKbDM9"><span style="font-weight:bold">上下文</span><span>：静态信息，例如用户 ID、数据库连接或代理调用所需的其他依赖项。</span></li></ol>

<ol start="2"><li id="t-OQUyzK6xxWStyBqbdB6KS8"><span style="font-weight:bold">存储</span><span>：一个 </span><span style="border-bottom:1px solid;font-weight:bold">BaseStore</span><span> 实例，用于</span><span style="border-bottom:1px solid;font-weight:bold">长期记忆</span><span>。</span></li></ol>

<ol start="3"><li id="t-jxeHbRmLwQjgEwv9ckuBwI"><span style="font-weight:bold">流写入器</span><span>：一个用于通过</span><span>"custom"</span><span>流模式流式传输信息的对象。</span></li></ol>

<blockquote id="t-uxNmduO7Y4l3QsfMKiAhFO"><p id="t-JZ10ZvZIECNBYPBfIFxM0u"><span>运行时上下文为你的工具和中间件提供了</span><span style="font-weight:bold">依赖注入</span><span>。你可以在调用代理时注入运行时依赖项（如数据库连接、用户 ID 或配置），而不是硬编码值或使用全局状态。这使你的工具更具可测试性、可重用性和灵活性。</span></p></blockquote>

<p id="t-AvVEB4UiLGKqtKdSNiaY48"><span style="background-color:transparent">你可以在</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">工具内部</span><span style="background-color:transparent">和</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">中间件内部</span><span style="background-color:transparent">访问运行时信息。</span></p>


<a id="section-0780"></a>
## 访问

<a id="t-AcqeZZhnpVpLWZMuBUXDSr"></a>

<p id="t-F3dDVvcYwyh34aqbedIA18"><span style="background-color:transparent">使用</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">create_agent</span><span style="background-color:transparent">创建代理时，你可以指定一个</span><span style="background-color:transparent">context_schema</span><span style="background-color:transparent">来定义存储在代理</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">Runtime</span><span style="background-color:transparent">中的</span><span style="background-color:transparent">context</span><span style="background-color:transparent">的结构。</span></p>

<p id="t-ewSQCEmcUz46eL9zkQLQbx"><span style="background-color:transparent">调用代理时，传递包含该次运行相关配置的</span><span style="background-color:transparent">context</span><span style="background-color:transparent">参数：</span></p>

<pre id="t-xX03peb7ru4qdbIYgDFcw6"><code>from dataclasses import dataclass

from langchain.agents import create_agent

@dataclass
class Context:
    user_name: str

agent = create_agent(
    model="gpt-5-nano",
    tools=[...],
    context_schema=Context  
)

agent.invoke(
 {"messages": [{"role": "user", "content": "What's my name?"}]},
    context=Context(user_name="John Smith")
)</code></pre>


<a id="section-0781"></a>
## 在工具内部

<a id="t-tog2TI8Wd2SrqtLMf2tq43"></a>

<p id="t-PoXj3Pgh7O5QEs2sqS4M6q"><span style="background-color:transparent">你可以在工具内部访问运行时信息，以便：</span></p>

<ul><li id="t-qAoyvnTdd0cHCNLDLAXU0v"><span>访问上下文</span></li></ul>

<ul><li id="t-VGZr6H1D9ysVclA5mzEoyo"><span>读取或写入长期记忆</span></li></ul>

<ul><li id="t-zkvMmd53kkA2BUuOCmrAhV"><span>写入</span><span style="border-bottom:1px solid;font-weight:bold">自定义流</span><span>（例如，工具进度/更新）</span></li></ul>

<p id="t-tuue4n7XNkq6iUdNR5uJr9"><span style="background-color:transparent">使用</span><span style="background-color:transparent">ToolRuntime</span><span style="background-color:transparent">参数在工具内部访问</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">Runtime</span><span style="background-color:transparent">对象。</span></p>

<pre id="t-66tIaYuWDZowoMDGd5NTb3"><code>from dataclasses import dataclass
from langchain.tools import tool, ToolRuntime  

@dataclass
class Context:
    user_id: str

@tool
def fetch_user_email_preferences(runtime: ToolRuntime[Context]) -&gt; str:
 """从存储中获取用户的电子邮件偏好设置。"""
    user_id = runtime.context.user_id  

    preferences: str = "The user prefers you to write a brief and polite email."
 if runtime.store:
 if memory := runtime.store.get(("users",), user_id):
            preferences = memory.value["preferences"]

 return preferences</code></pre>


<a id="section-0782"></a>
## 在中间件内部

<a id="t-QQhDcuyUqAdWlaNNPCKoEG"></a>

<p id="t-IxtnsgEDc8HgERabdrqF6s"><span style="background-color:transparent">你可以在中间件中访问运行时信息，以创建动态提示、修改消息或根据用户上下文控制代理行为。</span></p>

<p id="t-ar42J89xvhUeZrxBo7uaxS"><span style="background-color:transparent">使用</span><span style="background-color:transparent">request.runtime</span><span style="background-color:transparent">在中间件装饰器内部访问</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">Runtime</span><span style="background-color:transparent">对象。运行时对象在传递给中间件函数的</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">ModelRequest</span><span style="background-color:transparent">参数中可用。</span></p>

<pre id="t-3P9beKk1QqmJoeSCvRcBAO"><code>from dataclasses import dataclass

from langchain.messages import AnyMessage
from langchain.agents import create_agent, AgentState
from langchain.agents.middleware import dynamic_prompt, ModelRequest, before_model, after_model
from langgraph.runtime import Runtime

@dataclass
class Context:
    user_name: str

# 动态提示
@dynamic_prompt
def dynamic_system_prompt(request: ModelRequest) -&gt; str:
    user_name = request.runtime.context.user_name  
    system_prompt = f"You are a helpful assistant. Address the user as {user_name}."
 return system_prompt

# 模型前钩子
@before_model
def log_before_model(state: AgentState, runtime: Runtime[Context]) -&gt; dict | None:
 print(f"Processing request for user: {runtime.context.user_name}")
 return None

# 模型后钩子
@after_model
def log_after_model(state: AgentState, runtime: Runtime[Context]) -&gt; dict | None:
 print(f"Completed request for user: {runtime.context.user_name}")
 return None

agent = create_agent(
    model="gpt-5-nano",
    tools=[...],
    middleware=[dynamic_system_prompt, log_before_model, log_after_model],
    context_schema=Context
)

agent.invoke(
 {"messages": [{"role": "user", "content": "What's my name?"}]},
    context=Context(user_name="John Smith")
)</code></pre>


<a id="section-0784"></a>
## 概述

<a id="t-o5a3h7UQH4WEOPIPksG0AQ"></a>

<p id="t-dtohTLXy1vfscR4nebWuyw"><span style="background-color:transparent">构建智能体（或任何 LLM 应用程序）的难点在于使其足够可靠。虽然它们可能在原型阶段有效，但在实际使用案例中常常失败。</span></p>


<a id="section-0785"></a>
## 智能体为何失败？

<a id="t-0Uat5sx5VFoAqE9gMX1Zvn"></a>

<p id="t-1Kov1TQeFMKVwrQIpdN593"><span style="background-color:transparent">当智能体失败时，通常是因为智能体内部的 LLM 调用采取了错误的行动/没有达到我们的预期。LLM 失败的原因通常有以下两种：</span></p>

<ol start="1"><li id="t-VSfgQwvchApHfALqEjWBwH"><span>底层 LLM 能力不足</span></li></ol>

<ol start="2"><li id="t-9bBOAPITH5yTNqGZoUVUJ9"><span>没有将“正确的”上下文传递给 LLM</span></li></ol>

<p id="t-gezavgSL0CuzoFGLDeBL1l"><span style="background-color:transparent">大多数情况下，实际上是第二个原因导致智能体不可靠。</span></p>

<p id="t-1yqS7dQv3IjOnrB1Jf6DMN"><span style="font-weight:bold;background-color:transparent">上下文工程</span><span style="background-color:transparent">是指以正确的格式提供正确的信息和工具，以便 LLM 能够完成任务。这是 AI 工程师的首要工作。缺乏“正确的”上下文是构建更可靠智能体的首要障碍，而 LangChain 的智能体抽象设计独特，旨在促进上下文工程。</span></p>

<p id="t-Dvoe0QlRsWskrwtFrM4I4s"><span>不熟悉上下文工程？请从 </span><span style="border-bottom:1px solid;font-weight:bold">概念概述</span><span> 开始，了解不同类型的上下文及其使用时机。</span></p>


<a id="section-0786"></a>
## 智能体循环

<a id="t-IXCDKadEih3pqQCYqeaC7D"></a>

<p id="t-jRHRz90dR3kfOcOzwhOxQX"><span style="background-color:transparent">典型的智能体循环包含两个主要步骤：</span></p>

<ol start="1"><li id="t-a4BqtOVNxPJLGYOkO6BaDg"><span style="font-weight:bold">模型调用</span><span>- 使用提示词和可用工具调用 LLM，返回响应或执行工具的请求</span></li></ol>

<ol start="2"><li id="t-8P9enCkIxuwzasczlM2RtX"><span style="font-weight:bold">工具执行</span><span>- 执行 LLM 请求的工具，返回工具结果</span></li></ol>

<div id="t-RmJDVQDaAXayM90ohMH45E"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/81b9cd85fcdca947f5e50962.png"/></div>

<p id="t-vm6eLz3kYKQIzajNlgYrtt"><span style="background-color:transparent">此循环持续进行，直到 LLM 决定结束。</span></p>


<a id="section-0787"></a>
## 您可以控制的内容

<a id="t-34FavvY10yAvzB8EDcY6Sk"></a>

<p id="t-7radBmOAQKbJQVvNI1tIh4"><span style="background-color:transparent">为了构建可靠的智能体，您需要控制智能体循环每个步骤中发生的事情，以及步骤之间发生的事情。</span></p>

<div id="t-WDisKwOCJjNKedsBNBjRjO"><table><colgroup><col width="137.90277099609375"/><col width="489.9998168945313"/><col width="79.99468994140625"/></colgroup><tbody><tr><td><p><span>上下文类型</span></p></td><td><p><span>您控制的内容</span></p></td><td><p><span>瞬态或持久</span></p></td></tr><tr><td><p><span style="border-bottom:1px solid;font-weight:bold">模型上下文</span></p></td><td><p><span style="border-bottom:1px solid">模型调用的输入内容（指令、消息历史、工具、响应格式）</span></p></td><td><p><span style="border-bottom:1px solid">瞬态</span></p></td></tr><tr><td><p><span style="border-bottom:1px solid;font-weight:bold">工具上下文</span></p></td><td><p><span style="border-bottom:1px solid">工具可以访问和产生的内容（对状态、存储、运行时上下文的读写）</span></p></td><td><p><span style="border-bottom:1px solid">持久</span></p></td></tr><tr><td><p><span style="border-bottom:1px solid;font-weight:bold">生命周期上下文</span></p></td><td><p><span style="border-bottom:1px solid">模型调用和工具调用之间发生的事情（摘要、护栏、日志记录等）</span></p></td><td><p><span style="border-bottom:1px solid">持久</span></p></td></tr></tbody></table></div>

<div id="t-4YjqTdoJ1fHLX7G1ldRAtO"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/d5a2b63a960799728b25c9ce.png"/></div>


<a id="section-0788"></a>
## 数据源

<a id="t-y6Ada6jESRrys3CVMvaUZc"></a>

<p id="t-4shlgTuQDli7SDbo9gfTHe"><span style="background-color:transparent">在整个过程中，您的智能体会访问（读取/写入）不同的数据源：</span></p>

<div id="t-f9nBhfS8vFd1rvFIDakNVI"><table><colgroup><col width="120"/><col width="91.89752197265624"/><col width="111.01025390625"/><col width="375.9981689453125"/></colgroup><tbody><tr><td><p><span>数据源</span></p></td><td><p><span>亦称</span></p></td><td><p><span>作用域</span></p></td><td><p><span>示例</span></p></td></tr><tr><td><p><span style="border-bottom:1px solid;font-weight:bold">运行时上下文</span></p></td><td><p><span style="border-bottom:1px solid">静态配置</span></p></td><td><p><span style="border-bottom:1px solid">会话作用域</span></p></td><td><p><span style="border-bottom:1px solid">用户 ID、API 密钥、数据库连接、权限、环境设置</span></p></td></tr><tr><td><p><span style="border-bottom:1px solid;font-weight:bold">状态</span></p></td><td><p><span style="border-bottom:1px solid">短期记忆</span></p></td><td><p><span style="border-bottom:1px solid">会话作用域</span></p></td><td><p><span style="border-bottom:1px solid">当前消息、上传的文件、认证状态、工具结果</span></p></td></tr><tr><td><p><span style="border-bottom:1px solid;font-weight:bold">存储</span></p></td><td><p><span style="border-bottom:1px solid">长期记忆</span></p></td><td><p><span style="border-bottom:1px solid">跨会话</span></p></td><td><p><span style="border-bottom:1px solid">用户偏好、提取的见解、记忆、历史数据</span></p></td></tr></tbody></table></div>


<a id="section-0789"></a>
## 工作原理

<a id="t-iTv7dzVUKO2yOZiMDOHbA5"></a>

<p id="t-ojgHSLwm57jiPQg2fcu9Az"><span style="background-color:transparent">LangChain 的 </span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">中间件</span><span style="background-color:transparent"> 是底层机制，使得使用 LangChain 的开发者能够实际进行上下文工程。</span></p>

<p id="t-TaqFCkNgDk3dq1XSQYa37n"><span style="background-color:transparent">中间件允许您钩入智能体生命周期的任何步骤，并：</span></p>

<ul><li id="t-LktEIytHws5wnTgaO6xcwo"><span>更新上下文</span></li></ul>

<ul><li id="t-dA3lrOcOg6g630ihVtfINI"><span>跳转到智能体生命周期中的不同步骤</span></li></ul>

<p id="t-8muwx8bO72sJzzgCgvhhwm"><span style="background-color:transparent">在本指南中，您将频繁看到使用中间件 API 作为实现上下文工程目标的手段。</span></p>


<a id="section-0790"></a>
## 模型上下文

<a id="t-aQFviavRV7yl13nCZSDBpg"></a>

<p id="t-WvGq8ttFjWpp9YFgZ9MFSx"><span style="background-color:transparent">控制每次模型调用的输入内容——指令、可用工具、使用哪个模型以及输出格式。这些决策直接影响可靠性和成本。</span></p>

<div id="t-hViCjnx52bs6yQGlWhUHF1"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/df431098ad67f8926212f7e5.png"/></div>

<p id="t-2ZfXRRfMupF5xeWpQ21nsQ"><span style="background-color:transparent">所有这些类型的模型上下文都可以从</span><span style="font-weight:bold;background-color:transparent">状态</span><span style="background-color:transparent">（短期记忆）、</span><span style="font-weight:bold;background-color:transparent">存储</span><span style="background-color:transparent">（长期记忆）或</span><span style="font-weight:bold;background-color:transparent">运行时上下文</span><span style="background-color:transparent">（静态配置）中获取。</span></p>


<a id="section-0791"></a>
## 系统提示词

<a id="t-NUZjTeko2eFSuUVBbowYcT"></a>

<p id="t-JyfOn4axZgtdOjQWmye7Oq"><span style="background-color:transparent">系统提示词设定了 LLM 的行为和能力。不同的用户、上下文或对话阶段需要不同的指令。成功的智能体会利用记忆、偏好和配置，为对话的当前状态提供正确的指令。</span></p>

<p id="t-T3lhcFbnREBS6PGuHlLkqe"><span>从状态访问消息计数或对话上下文：</span></p>

<pre id="t-79HIBgvsi7ENSBAwgLH1eP"><code>from langchain.agents import create_agent
from langchain.agents.middleware import dynamic_prompt, ModelRequest

@dynamic_prompt
def state_aware_prompt(request: ModelRequest) -&gt; str:
 # request.messages is a shortcut for request.state["messages"]
    message_count = len(request.messages)

    base = "You are a helpful assistant."

 if message_count &gt; 10:
        base += "\nThis is a long conversation - be extra concise."

 return base

agent = create_agent(
    model="gpt-4o",
    tools=[...],
    middleware=[state_aware_prompt]
)</code></pre>


<a id="section-0792"></a>
## 消息

<a id="t-slKUnAlZpyrlZLlb4Lzj5U"></a>

<p id="t-zQKr85Zmct7K1FfxL7ixSj"><span style="background-color:transparent">消息构成了发送给 LLM 的提示词。 管理消息内容至关重要，以确保 LLM 拥有正确的信息来做出良好响应。</span></p>

<p id="t-KCYw4BZi10ejOGwdufgy9U"><span>当与当前查询相关时，从状态注入上传的文件上下文：</span></p>

<pre id="t-MqS8C4kTIkgADQQvjVJyOM"><code>from langchain.agents import create_agent
 from langchain.agents.middleware import wrap_model_call, ModelRequest, ModelResponse
 from typing import Callable

 @wrap_model_call
 def inject_file_context(
        request: ModelRequest,
        handler: Callable[[ModelRequest], ModelResponse]
 ) -&gt; ModelResponse:
 """Inject context about files user has uploaded this session."""
 # Read from State: get uploaded files metadata
        uploaded_files = request.state.get("uploaded_files", [])

 if uploaded_files:
 # Build context about available files
            file_descriptions = []
 for file in uploaded_files:
                file_descriptions.append(
 f"- {file['name']} ({file['type']}): {file['summary']}"
 )

            file_context = f"""Files you have access to in this conversation:
{chr(10).join(file_descriptions)}

Reference these files when answering questions."""

 # Inject file context before recent messages
            messages = [
 *request.messages,
 {"role": "user", "content": file_context},
 ]
            request = request.override(messages=messages)

 return handler(request)

    agent = create_agent(
        model="gpt-4o",
        tools=[...],
        middleware=[inject_file_context]
 )</code></pre>

<p id="t-t8x0SLGPud1I7FdDvAv1Vq"><span style="font-weight:bold">瞬态与持久消息更新：</span></p>

<blockquote id="t-w8u5ORGB48hzOjHP9Kqs4k"><p id="t-JjDDby2BkFLEi0YONRU3cw"><span>上面的示例使用</span><span>wrap_model_call</span><span>进行</span><span style="font-weight:bold">瞬态</span><span>更新——修改单次调用中发送给模型的消息，而不更改保存在状态中的内容。</span></p>
<p id="t-W6kTW2MSz4oLRdUheE9t7z"><span>对于修改状态的 </span><span style="font-weight:bold">持久</span><span> 更新（如 </span><span style="border-bottom:1px solid;font-weight:bold">生命周期上下文</span><span> 中的摘要示例），请使用 </span><span>before_model</span><span> 或 </span><span>after_model</span><span> 等生命周期钩子来永久更新对话历史。</span></p></blockquote>


<a id="section-0793"></a>
## 工具

<a id="t-c4i33htBHJfTgMktKtHaHk"></a>

<p id="t-UAtS3cct13XZMX6uZvU4e0"><span style="background-color:transparent">工具让模型能够与数据库、API 和外部系统交互。您定义和选择工具的方式直接影响模型是否能有效完成任务。</span></p>

<a id="t-4VhrgEKK4TkmFk24awbqh3"></a>

##### 定义工具

<p id="t-ZM5WOcye3io5gyzdQwpoEZ"><span style="background-color:transparent">每个工具都需要清晰的名称、描述、参数名称和参数描述。这些不仅仅是元数据——它们指导模型关于何时以及如何使用该工具的推理。</span></p>

<pre id="t-5fZvhSV4YiyTVAjNGTcQnp"><code>from langchain.tools import tool

@tool(parse_docstring=True)
def search_orders(
    user_id: str,
    status: str,
    limit: int = 10
) -&gt; str:
 """Search for user orders by status.

    Use this when the user asks about order history or wants to check
    order status. Always filter by the provided status.

    Args:
        user_id: Unique identifier for the user
        status: Order status: 'pending', 'shipped', or 'delivered'
        limit: Maximum number of results to return
    """
 # Implementation here
 pass</code></pre>

<a id="t-ch7y90uz5k9k4KjeeSySVJ"></a>

##### 选择工具

<p id="t-BcxkYNhXvWuHMPJj6lI8wZ"><span style="background-color:transparent">并非每个工具都适用于所有情况。工具过多可能会使模型不堪重负（上下文过载）并增加错误；工具过少则会限制能力。动态工具选择基于认证状态、用户权限、功能标志或对话阶段来调整可用工具集。</span></p>

<p id="t-XZxThBt1GUyyMyKCuHYtMh"><span>仅在达到特定对话里程碑后启用高级工具：</span></p>

<pre id="t-zWPVs8YIOiNYpeuHJsupgM"><code>from langchain.agents import create_agent
from langchain.agents.middleware import wrap_model_call, ModelRequest, ModelResponse
from typing import Callable

@wrap_model_call
def state_based_tools(
    request: ModelRequest,
    handler: Callable[[ModelRequest], ModelResponse]
) -&gt; ModelResponse:
 """Filter tools based on conversation State."""
 # Read from State: check if user has authenticated
    state = request.state  
    is_authenticated = state.get("authenticated", False)
    message_count = len(state["messages"])

 # Only enable sensitive tools after authentication
 if not is_authenticated:
        tools = [t for t in request.tools if t.name.startswith("public_")]
        request = request.override(tools=tools)
 elif message_count &lt; 5:
 # Limit tools early in conversation
        tools = [t for t in request.tools if t.name != "advanced_search"]
        request = request.override(tools=tools)

 return handler(request)

agent = create_agent(
    model="gpt-4o",
    tools=[public_search, private_search, advanced_search],
    middleware=[state_based_tools]
)</code></pre>


<a id="section-0794"></a>
## 模型

<a id="t-ufuMhpDaQIZEoTQL50ynKZ"></a>

<p id="t-6cKoUjApbKOehSutRvvlMT"><span style="background-color:transparent">不同的模型有不同的优势、成本和上下文窗口。为当前任务选择合适的模型，这在智能体运行期间可能会发生变化。</span></p>

<p id="t-R4hkBV0W7mOCKXRclr8GqL"><span>根据状态中的对话长度使用不同的模型：</span></p>

<pre id="t-PgFHdYV0efBjwWtxvd3KNP"><code>from langchain.agents import create_agent
from langchain.agents.middleware import wrap_model_call, ModelRequest, ModelResponse
from langchain.chat_models import init_chat_model
from typing import Callable

# Initialize models once outside the middleware
large_model = init_chat_model("claude-sonnet-4-5-20250929")
standard_model = init_chat_model("gpt-4o")
efficient_model = init_chat_model("gpt-4o-mini")

@wrap_model_call
def state_based_model(
    request: ModelRequest,
    handler: Callable[[ModelRequest], ModelResponse]
) -&gt; ModelResponse:
 """Select model based on State conversation length."""
 # request.messages is a shortcut for request.state["messages"]
    message_count = len(request.messages)

 if message_count &gt; 20:
 # Long conversation - use model with larger context window
        model = large_model
 elif message_count &gt; 10:
 # Medium conversation
        model = standard_model
 else:
 # Short conversation - use efficient model
        model = efficient_model

    request = request.override(model=model)

 return handler(request)

agent = create_agent(
    model="gpt-4o-mini",
    tools=[...],
    middleware=[state_based_model]
)</code></pre>


<a id="section-0795"></a>
## 响应格式

<a id="t-YajhQtnXdaZ8LZaT7pQ0DN"></a>

<p id="t-6nukMEs21ZKhNlGT2jI9Zl"><span style="background-color:transparent">结构化输出将非结构化文本转换为经过验证的结构化数据。当提取特定字段或为下游系统返回数据时，自由格式的文本是不够的。</span></p>

<p id="t-7ygUU36O6huP4d4u4KEN9c"><span style="font-weight:bold;background-color:transparent">工作原理：</span><span style="background-color:transparent">当您提供一个模式作为响应格式时，模型的最终响应保证符合该模式。智能体运行模型/工具调用循环，直到模型完成工具调用，然后将最终响应强制转换为提供的格式。</span></p>

<a id="t-e2ug0bNv6fzp7n94FIip6P"></a>

##### 定义格式

<p id="t-Oe59zLWf7uHeX0DpyO9xll"><span style="background-color:transparent">模式定义指导模型。字段名称、类型和描述精确指定了输出应遵循的格式。</span></p>

<pre id="t-LzNoOWFsg6KKN3yxLLtlxT"><code>from pydantic import BaseModel, Field

class CustomerSupportTicket(BaseModel):
 """Structured ticket information extracted from customer message."""

    category: str = Field(
        description="Issue category: 'billing', 'technical', 'account', or 'product'"
 )
    priority: str = Field(
        description="Urgency level: 'low', 'medium', 'high', or 'critical'"
 )
    summary: str = Field(
        description="One-sentence summary of the customer's issue"
 )
    customer_sentiment: str = Field(
        description="Customer's emotional tone: 'frustrated', 'neutral', or 'satisfied'"
 )</code></pre>

<a id="t-824FfALyUPWXkEgafLEKq9"></a>

##### 选择格式

<p id="t-ijcS3Q2ed2A2W0zWYPAg5y"><span style="background-color:transparent">动态响应格式选择根据用户偏好、对话阶段或角色调整模式——早期返回简单格式，随着复杂性增加返回详细格式。</span></p>

<p id="t-8oxhBeUo87G7OVjKI7KSMZ"><span>根据对话状态配置结构化输出：</span></p>

<pre id="t-RrtIS20M8Umz9TDnUvukth"><code>from langchain.agents import create_agent
from langchain.agents.middleware import wrap_model_call, ModelRequest, ModelResponse
from pydantic import BaseModel, Field
from typing import Callable

class SimpleResponse(BaseModel):
 """Simple response for early conversation."""
    answer: str = Field(description="A brief answer")

class DetailedResponse(BaseModel):
 """Detailed response for established conversation."""
    answer: str = Field(description="A detailed answer")
    reasoning: str = Field(description="Explanation of reasoning")
    confidence: float = Field(description="Confidence score 0-1")

@wrap_model_call
def state_based_output(
    request: ModelRequest,
    handler: Callable[[ModelRequest], ModelResponse]
) -&gt; ModelResponse:
 """Select output format based on State."""
 # request.messages is a shortcut for request.state["messages"]
    message_count = len(request.messages)

 if message_count &lt; 3:
 # Early conversation - use simple format
        request = request.override(response_format=SimpleResponse)
 else:
 # Established conversation - use detailed format
        request = request.override(response_format=DetailedResponse)

 return handler(request)

agent = create_agent(
    model="gpt-4o",
    tools=[...],
    middleware=[state_based_output]
)</code></pre>


<a id="section-0796"></a>
## 工具上下文

<a id="t-1TZoSOVFA5MAsArKzwki87"></a>

<p id="t-qHlo7FgqH6akfwU6Cs9GGm"><span style="background-color:transparent">工具的特殊之处在于它们既读取也写入上下文。</span></p>

<p id="t-u1dAvqeoT4Zacz0lNKkkbl"><span style="background-color:transparent">在最基本的情况下，当工具执行时，它接收 LLM 的请求参数并返回一个工具消息。工具完成其工作并产生结果。</span></p>

<p id="t-17CLOdivOtbJdAtH2eGyEB"><span style="background-color:transparent">工具还可以为模型获取重要信息，使其能够执行和完成任务。</span></p>


<a id="section-0797"></a>
## 读取

<a id="t-QpCDObPp6IjnEayCD8XrSv"></a>

<p id="t-YtsVLYZaeA5hvvFlqzGaVJ"><span style="background-color:transparent">大多数现实世界的工具需要的不仅仅是 LLM 的参数。它们需要用户 ID 进行数据库查询、API 密钥访问外部服务，或者当前会话状态来做决策。工具从状态、存储和运行时上下文中读取以访问这些信息。</span></p>

<p id="t-fI9XG4Y75ZYbpKei5nmRO8"><span>从状态读取以检查当前会话信息：</span></p>

<pre id="t-pGs8RQrnkBormw1m4E9DoK"><code>from langchain.tools import tool, ToolRuntime
from langchain.agents import create_agent

@tool
def check_authentication(
    runtime: ToolRuntime
) -&gt; str:
 """Check if user is authenticated."""
 # Read from State: check current auth status
    current_state = runtime.state
    is_authenticated = current_state.get("authenticated", False)

 if is_authenticated:
 return "User is authenticated"
 else:
 return "User is not authenticated"

agent = create_agent(
    model="gpt-4o",
    tools=[check_authentication]
)</code></pre>


<a id="section-0798"></a>
## 写入

<a id="t-Qk4pvZwi00Q94bVdlxq7qA"></a>

<p id="t-FiqIeQaNPjVx6wGSktk8FZ"><span style="background-color:transparent">工具结果可用于帮助智能体完成给定任务。工具既可以直接将结果返回给模型，也可以更新智能体的记忆，使重要的上下文在后续步骤中可用。</span></p>

<p id="t-vRxW9zS4DEMPeLNaTk2ky5"><span>使用 Command 写入状态以跟踪会话特定信息：</span></p>

<pre id="t-ize3q9RzKZF98mCN2RAvuS"><code>from langchain.tools import tool, ToolRuntime
from langchain.agents import create_agent
from langgraph.types import Command

@tool
def authenticate_user(
    password: str,
    runtime: ToolRuntime
) -&gt; Command:
 """Authenticate user and update State."""
 # Perform authentication (simplified)
 if password == "correct":
 # Write to State: mark as authenticated using Command
 return Command(
            update={"authenticated": True},
 )
 else:
 return Command(update={"authenticated": False})

agent = create_agent(
    model="gpt-4o",
    tools=[authenticate_user]
)</code></pre>


<a id="section-0799"></a>
## 生命周期上下文

<a id="t-asxI60sI8MnItr97i4F0oP"></a>

<p id="t-KaUS0SJu8yVzocnnkw8wMq"><span style="background-color:transparent">控制</span><span style="font-weight:bold;background-color:transparent">核心智能体步骤之间</span><span style="background-color:transparent">发生的事情——拦截数据流以实现横切关注点，如摘要、护栏和日志记录。</span></p>

<p id="t-xnpQwHhUV1PRGBGLkEDzVY"><span style="background-color:transparent">正如您在 </span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">模型上下文</span><span style="background-color:transparent"> 和 </span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">工具上下文</span><span style="background-color:transparent"> 中所见，</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">中间件</span><span style="background-color:transparent"> 是使上下文工程变得可行的机制。中间件允许您钩入智能体生命周期的任何步骤，并：</span></p>

<ol start="1"><li id="t-9In59bCpV3TWgCp0Jik3Zy"><span style="font-weight:bold">更新上下文</span><span>- 修改状态和存储以持久化更改、更新对话历史或保存见解</span></li></ol>

<ol start="2"><li id="t-UEgjxtpOjZhXmMht1zNxnf"><span style="font-weight:bold">在生命周期中跳转</span><span>- 根据上下文移动到智能体循环中的不同步骤（例如，如果满足条件则跳过工具执行，使用修改后的上下文重复模型调用）</span></li></ol>

<div id="t-uqgji3bcAqdfLSHYPkUweI"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/7288281581283198922f6d6a.png"/></div>


<a id="section-0800"></a>
## 示例：摘要

<a id="t-GmufRzDjvWmd0FlvwOaLC9"></a>

<p id="t-3jBLuaAIZ2N8elEUAZSbK8"><span style="background-color:transparent">最常见的生命周期模式之一是在对话历史过长时自动压缩。与 </span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">模型上下文</span><span style="background-color:transparent"> 中展示的瞬态消息修剪不同，摘要 </span><span style="font-weight:bold;background-color:transparent">持久地更新状态</span><span style="background-color:transparent">——永久地用摘要替换旧消息，该摘要将保存供未来所有轮次使用。</span></p>

<p id="t-FThIP5R86lKOAIfBQvAW6C"><span style="background-color:transparent">LangChain 为此提供了内置中间件：</span></p>

<pre id="t-2K6i68GbAT7XpawHxZ0XCB"><code>from langchain.agents import create_agent
from langchain.agents.middleware import SummarizationMiddleware

agent = create_agent(
    model="gpt-4o",
    tools=[...],
    middleware=[
        SummarizationMiddleware(
            model="gpt-4o-mini",
            trigger={"tokens": 4000},
            keep={"messages": 20},
 ),
 ],
)</code></pre>

<p id="t-aWiZv5khyABeBIyOPMijIg"><span style="background-color:transparent">当对话超过令牌限制时，</span><span style="background-color:transparent">SummarizationMiddleware</span><span style="background-color:transparent">会自动：</span></p>

<ol start="1"><li id="t-XEVAHzzagowfsskwIMTWPI"><span>使用单独的 LLM 调用总结较早的消息</span></li></ol>

<ol start="2"><li id="t-mIj7ewfh3r3JXyr8osHfFo"><span>在状态中用摘要消息替换它们（永久地）</span></li></ol>

<ol start="3"><li id="t-WUR5LECIia9NLA1OIFP7AQ"><span>保留最近的消息以保持上下文</span></li></ol>

<p id="t-Pjp3BuSlXjFjHl2XaywBmq"><span style="background-color:transparent">摘要后的对话历史被永久更新——未来的轮次将看到摘要而不是原始消息。</span></p>


<a id="section-0801"></a>
## 最佳实践

<a id="t-GYCFFsyIFCFEpoePWvuGx6"></a>

<ol start="1"><li id="t-Yi0sA5nQm5n6nIXLoc98lS"><span style="font-weight:bold">从简单开始</span><span>- 先使用静态提示词和工具，仅在必要时添加动态元素</span></li></ol>

<ol start="2"><li id="t-tbO3Z51PFCRyHfCd99vCQw"><span style="font-weight:bold">逐步测试</span><span>- 每次只添加一个上下文工程功能</span></li></ol>

<ol start="3"><li id="t-kG3sri0yC45bB0Cfi1VVJh"><span style="font-weight:bold">监控性能</span><span>- 跟踪模型调用、令牌使用情况和延迟</span></li></ol>

<ol start="4"><li id="t-8s8OSipbrVJXCsrcFYxn0D"><span style="font-weight:bold">使用内置中间件</span><span>- 利用</span><span style="border-bottom:1px solid;font-weight:bold">SummarizationMiddleware</span><span>、</span><span style="border-bottom:1px solid;font-weight:bold">LLMToolSelectorMiddleware</span><span>等</span></li></ol>

<ol start="5"><li id="t-g9MWWRwSGSwnlzvrntCwWT"><span style="font-weight:bold">记录上下文策略</span><span>- 明确说明传递了哪些上下文及其原因</span></li></ol>

<ol start="6"><li id="t-tnzCnKPcYCyYVOdRx4qUJI"><span style="font-weight:bold">理解临时性与持久性</span><span>：模型上下文更改是临时的（每次调用），而生命周期上下文更改会持久保存到状态中</span></li></ol>


<a id="section-0802"></a>
## 模型上下文协议 (MCP)

<a id="t-block-17234"></a>

<p id="t-ZAarcbDxpXode9RIMsuP5n"><span style="border-bottom:1px solid;font-weight:bold">模型上下文协议 (Model Context Protocol, MCP)</span><span> 是一个开放协议，它标准化了应用程序如何向大语言模型 (LLMs) 提供工具和上下文。LangChain 智能体可以使用 </span><span style="border-bottom:1px solid;font-weight:bold">langchain-mcp-adapters</span><span> 库来使用 MCP 服务器上定义的工具。</span></p>


<a id="section-0803"></a>
## 快速开始

<a id="t-xlPaurtnK8bGhCpc8eO5d8"></a>

<p id="t-r7EWwMlEU74gZNygOuNq4N"><span>安装 </span><span>langchain-mcp-adapters</span><span> 库：</span></p>

<pre id="t-4St8yH0hol1IiQlk4GSLaX"><code>pip install langchain-mcp-adapters</code></pre>

<p id="t-oBGzsUQOwbxhJCzjGarqJ2"><span>langchain-mcp-adapters</span><span>使智能体能够使用一个或多个 MCP 服务器上定义的工具。</span></p>

<blockquote id="t-VgGTvXWhQJG911E3fPvONs"><p id="t-FiavRMVmAFLJeYBJVTt5i2"><span>MultiServerMCPClient</span><span style="font-weight:bold">默认是无状态的</span><span>。每次工具调用都会创建一个新的 MCP </span><span>ClientSession</span><span>，执行工具，然后进行清理。</span></p></blockquote>

<pre id="t-w2sLl2POafXOinNJhmIysC"><code>from langchain_mcp_adapters.client import MultiServerMCPClient
from langchain.agents import create_agent

client = MultiServerMCPClient(
{
"math": {
"transport": "stdio", # 本地子进程通信
"command": "python",
# 你的 math_server.py 文件的绝对路径
"args": ["/path/to/math_server.py"],
},
"weather": {
"transport": "http", # 基于 HTTP 的远程服务器
# 确保你的天气服务器在 8000 端口启动
"url": "http://localhost:8000/mcp",
}
}
)

tools = await client.get_tools()
agent = create_agent(
"claude-sonnet-4-5-20250929",
tools
)
math_response = await agent.ainvoke(
{"messages": [{"role": "user", "content": "what's (3 + 5) x 12?"}]}
)
weather_response = await agent.ainvoke(
{"messages": [{"role": "user", "content": "what is the weather in nyc?"}]}
)</code></pre>


<a id="section-0804"></a>
## 自定义服务器

<a id="t-CrzgXRTLhznzY4hwdQfAuh"></a>

<p id="t-YKONubGTJ8ECHix3fn1dXm"><span>要创建自定义 MCP 服务器，请使用 </span><span style="border-bottom:1px solid;font-weight:bold">FastMCP</span><span> 库：</span></p>

<pre id="t-Xt1w8Qn2vxXNsfv3mI79Io"><code>pip install fastmcp</code></pre>

<p id="t-1V3JWigvwTFdyQVc7Gm7S2"><span>要使用 MCP 工具服务器测试你的智能体，请使用以下示例：</span></p>

<pre id="t-Ko3pqdDi5WyxaSRAkhiZwY"><code>from fastmcp import FastMCP

mcp = FastMCP("Math")

@mcp.tool()
def add(a: int, b: int) -&gt; int:
"""Add two numbers"""
return a + b

@mcp.tool()
def multiply(a: int, b: int) -&gt; int:
"""Multiply two numbers"""
return a * b

if __name__ == "__main__":
mcp.run(transport="stdio")</code></pre>


<a id="section-0805"></a>
## 传输方式

<a id="t-zjeRWu7jN5h3ZvwYTnGby6"></a>

<p id="t-JKnuDVE2JsF7U88i930jry"><span>MCP 支持不同的传输机制用于客户端-服务器通信。</span></p>


<a id="section-0806"></a>
## HTTP

<a id="t-k0F1G96TqfYdxHiT4P6NQI"></a>

<p id="t-M60tkVAAA5OY9hBZ6jzRFp"><span>http</span><span> 传输（也称为 </span><span>streamable-http</span><span>）使用 HTTP 请求进行客户端-服务器通信。</span></p>

<pre id="t-hQv1oCz48rjkyHyuOqNtN8"><code>client = MultiServerMCPClient(
{
"weather": {
"transport": "http",
"url": "http://localhost:8000/mcp",
}
}
)</code></pre>

<a id="t-N4qViGeMoq0pkOF9T0bQYT"></a>

##### 传递请求头

<p id="t-RFk6y2rBg0wmphAYKMvVaW"><span>通过 HTTP 连接到 MCP 服务器时，你可以使用连接配置中的</span><span>headers</span><span>字段包含自定义请求头（例如用于身份验证或追踪）。这适用于</span><span>sse</span><span>（MCP 规范已弃用）和</span><span>streamable_http</span><span>传输。</span></p>

<p id="t-HOiYHnu6zAYNKnDOy15lGk"><span style="font-weight:bold">Passing headers with MultiServerMCPClient</span></p>

<pre id="t-VrVIBVgeLNmAiWyg4J3ygV"><code>from langchain_mcp_adapters.client import MultiServerMCPClient
from langchain.agents import create_agent

client = MultiServerMCPClient(
{
"weather": {
"transport": "http",
"url": "http://localhost:8000/mcp",
"headers": {
"Authorization": "Bearer YOUR_TOKEN",
"X-Custom-Header": "custom-value"
},
}
}
)
tools = await client.get_tools()
agent = create_agent("openai:gpt-4.1", tools)
response = await agent.ainvoke({"messages": "what is the weather in nyc?"})</code></pre>

<a id="t-SLdvyU6e81zYyDjSoavPwg"></a>

##### 身份验证

<p id="t-M9E5UqaL4dhjf6w0yubNMp"><span>langchain-mcp-adapters</span><span> 库底层使用了官方的 </span><span style="border-bottom:1px solid;font-weight:bold">MCP SDK</span><span>，它允许你通过实现 </span><span>httpx.Auth</span><span> 接口来提供自定义的身份验证机制。</span></p>

<pre id="t-UxjO9hrwCoi2PMATxwgdrI"><code>from langchain_mcp_adapters.client import MultiServerMCPClient

client = MultiServerMCPClient(
 {
 "weather": {
 "transport": "http",
 "url": "http://localhost:8000/mcp",
 "auth": auth,
 }
 }
)</code></pre>

<ul><li id="t-0JftLNgnQeQOamKKGvgX5D"><span style="border-bottom:1px solid;font-weight:bold">自定义身份验证实现示例</span></li></ul>

<ul><li id="t-OrEP9tHAqIo8t2ycV2zGZE"><span style="border-bottom:1px solid;font-weight:bold">内置 OAuth 流程</span></li></ul>


<a id="section-0807"></a>
## stdio

<a id="t-chHFTh3poji8epO7TYJHhS"></a>

<p id="t-3sKsJVfX9RzVA2eSfLYmF7"><span>客户端将服务器作为子进程启动，并通过标准输入/输出进行通信。适用于本地工具和简单设置。</span></p>

<blockquote id="t-kCD1oWpVyW6echGlfBTYi1"><p id="t-F0yLoDMoVyYQMCewzIMscr"><span>与 HTTP 传输不同，</span><span>stdio</span><span> 连接本质上是</span><span style="font-weight:bold">有状态的</span><span>——子进程在客户端连接的整个生命周期内持续存在。然而，当使用没有显式会话管理的 </span><span>MultiServerMCPClient</span><span> 时，每次工具调用仍然会创建一个新会话。</span></p></blockquote>

<pre id="t-yChJLYEs5AegLBrNrI8yJB"><code>client = MultiServerMCPClient(
 {
 "math": {
 "transport": "stdio",
 "command": "python",
 "args": ["/path/to/math_server.py"],
 }
 }
)</code></pre>


<a id="section-0808"></a>
## 有状态会话

<a id="t-UcuabIQaY0nx1VXqmEAvp2"></a>

<p id="t-XZprjpQgehM0OQcBWemFf4"><span>默认情况下，</span><span>MultiServerMCPClient</span><span>是</span><span style="font-weight:bold">无状态的</span><span>——每次工具调用都会创建一个新的 MCP 会话，执行工具，然后进行清理。</span></p>

<p id="t-EJNOYX7viAX88EuDSPwvJH"><span>如果你需要控制 MCP 会话的</span><span style="border-bottom:1px solid;font-weight:bold">生命周期</span><span>（例如，当使用一个有状态的服务器，该服务器在多个工具调用之间维护上下文时），你可以使用 </span><span>client.session()</span><span> 创建一个持久的 </span><span>ClientSession</span><span>。</span></p>

<p id="t-m3vGbIbflwfz3QfOUqSpyK"><span style="font-weight:bold">Using MCP ClientSession for stateful tool usage</span></p>

<pre id="t-RIk5S2hfdwPRcrZArCSwqo"><code>from langchain_mcp_adapters.client import MultiServerMCPClient
from langchain_mcp_adapters.tools import load_mcp_tools
from langchain.agents import create_agent

client = MultiServerMCPClient({...})

# 显式创建一个会话
async with client.session("server_name") as session:
# 将会话传递给加载工具、资源或提示
tools = await load_mcp_tools(session)
agent = create_agent(
"anthropic:claude-3-7-sonnet-latest",
tools
)</code></pre>


<a id="section-0810"></a>
## 工具

<a id="t-V2RgMeNV3Nf0pZPNIETFJN"></a>

<p id="t-Dvq0YKwxwYrRXbi1BVzNuO"><span style="border-bottom:1px solid;font-weight:bold">工具</span><span>允许 MCP 服务器公开可执行的函数，LLMs 可以调用这些函数来执行操作——例如查询数据库、调用 API 或与外部系统交互。LangChain 将 MCP 工具转换为 LangChain </span><span style="border-bottom:1px solid;font-weight:bold">工具</span><span>，使它们可以直接在任何 LangChain 智能体或工作流中使用。</span></p>

<a id="t-VawYnLpSrJk6algZGFBZOV"></a>

##### 加载工具

<p id="t-4Rz32VN2jk2gQV4idVmsPC"><span>使用</span><span>client.get_tools()</span><span>从 MCP 服务器检索工具，并将它们传递给你的智能体：</span></p>

<pre id="t-1rM5ckROIBlteLZ1brTI4E"><code>from langchain_mcp_adapters.client import MultiServerMCPClient
from langchain.agents import create_agent

client = MultiServerMCPClient({...})
tools = await client.get_tools()
agent = create_agent("claude-sonnet-4-5-20250929", tools)</code></pre>

<p id="t-BDyIlsNEJwE8l1CWXxZmqR"><span>:::python</span></p>

<a id="t-sqQ0O6qhmsCG9U6ynW6UQS"></a>

##### 结构化内容

<p id="t-umFXAr4iT3EHEC3ojZVFkY"><span>MCP 工具除了人类可读的文本响应外，还可以返回</span><span style="border-bottom:1px solid;font-weight:bold">结构化内容</span><span>。当工具除了需要显示给模型的文本外，还需要返回机器可解析的数据（如 JSON）时，这很有用。</span></p>

<p id="t-cWmo8izl4cY80JJ35W4SGo"><span>当 MCP 工具返回 </span><span>structuredContent</span><span> 时，适配器会将其包装在 </span><span style="border-bottom:1px solid;font-weight:bold">MCPToolArtifact</span><span> 中，并将其作为工具的工件返回。你可以通过 </span><span>ToolMessage</span><span> 上的 </span><span>artifact</span><span> 字段访问它。你也可以使用</span><span style="border-bottom:1px solid;font-weight:bold">拦截器</span><span>来自动处理或转换结构化内容。</span></p>

<p id="t-YHOJkO5GTvTcfKfeiEHrbn"><span style="font-weight:bold">从工件中提取结构化内容</span></p>

<p id="t-W6X7xYxrH1iH5DqmD0nJDA"><span>调用智能体后，你可以从响应中的工具消息访问结构化内容：</span></p>

<pre id="t-2tMviylRDDDy2eLvEAmyyl"><code>from langchain_mcp_adapters.client import MultiServerMCPClient
from langchain.agents import create_agent
from langchain.messages import ToolMessage

client = MultiServerMCP</code></pre>


<a id="section-0811"></a>
## 人机回环

<a id="t-block-17283"></a>

<p id="t-rpa5XElinqLaci5bHdD68m"><span style="background-color:transparent">人机回环（</span><span style="background-color:#f3f5f7;color:#dd4097">Human-in-the-Loop，HITL</span><span style="background-color:transparent">）</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">中间件</span><span style="background-color:transparent">允许您为智能体（agent）的工具调用添加人工监督。 当模型提出一个可能需要审查的操作时——例如写入文件或执行 SQL——该中间件可以暂停执行并等待决策。</span></p>

<p id="t-CSbVv3UtCbcXkTtQRMfPPL"><span style="background-color:transparent">它通过根据可配置的策略检查每个工具调用来实现此功能。如果需要干预，中间件会发出一个 </span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">interrupt</span><span style="background-color:transparent">，从而停止执行。图状态会使用 LangGraph 的</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">持久化层</span><span style="background-color:transparent">保存，因此执行可以安全地暂停并在稍后恢复。</span></p>

<p id="t-4XmAYx1V4fbZPYkzD3jcfn"><span style="background-color:transparent">然后，人工决策将决定接下来发生什么：操作可以按原样批准（</span><span style="background-color:transparent">approve</span><span style="background-color:transparent">）、在运行前修改（</span><span style="background-color:transparent">edit</span><span style="background-color:transparent">），或者拒绝并附带反馈（</span><span style="background-color:transparent">reject</span><span style="background-color:transparent">）。</span></p>


<a id="section-0812"></a>
## 中断决策类型

<a id="t-jarVS7KloEhePtz2iubQMl"></a>

<p id="t-FuOSSZKL42zScOSYbFjcK9"><span style="background-color:transparent">该</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">中间件</span><span style="background-color:transparent">定义了三种内置的人工响应中断的方式：</span></p>

<div id="t-LMfdvfyNvixTnSiysTVvoe"><table><colgroup><col width="120"/><col width="314.9061279296875"/><col width="279.9998779296875"/></colgroup><tbody><tr><td><p><span>决策类型</span></p></td><td><p><span>描述</span></p></td><td><p><span>示例用例</span></p></td></tr><tr><td><p><span>✅ </span><span>approve</span></p></td><td><p><span>操作按原样批准并执行，不做更改。</span></p></td><td><p><span>完全按照草稿发送电子邮件</span></p></td></tr><tr><td><p><span>✏️ </span><span>edit</span></p></td><td><p><span>工具调用在执行前被修改。</span></p></td><td><p><span>在发送电子邮件前更改收件人</span></p></td></tr><tr><td><p><span>❌ </span><span>reject</span></p></td><td><p><span>工具调用被拒绝，并在对话中添加解释。</span></p></td><td><p><span>拒绝电子邮件草稿并解释如何重写它</span></p></td></tr></tbody></table></div>

<p id="t-O6GSyogW66LG0WMQoGJe7j"><span style="background-color:transparent">每个工具可用的决策类型取决于您在</span><span style="background-color:transparent">interrupt_on</span><span style="background-color:transparent">中配置的策略。 当多个工具调用同时暂停时，每个操作都需要单独的决策。 决策必须按照中断请求中操作出现的顺序提供。</span></p>

<p id="t-Ahs56ACOKg7tX6d2i9HG3p"><span style="font-weight:bold">编辑</span><span>工具参数时，请保守地进行更改。对原始参数的重大修改可能导致模型重新评估其方法，并可能多次执行该工具或采取意外操作。</span></p>


<a id="section-0813"></a>
## 配置中断

<a id="t-2StLjNI9U5P6fC5AN7Hk5V"></a>

<p id="t-iV0WscB52TJJjw3Qa07ZCt"><span style="background-color:transparent">要使用 HITL，请在创建智能体时将该</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">中间件</span><span style="background-color:transparent">添加到智能体的 </span><span style="background-color:transparent">middleware</span><span style="background-color:transparent"> 列表中。</span></p>

<p id="t-JyRWzmlsPgdysFczmdCeyh"><span style="background-color:transparent">您需要配置一个从工具操作到每个操作允许的决策类型的映射。当工具调用与映射中的某个操作匹配时，中间件将中断执行。</span></p>

<pre id="t-li2Jb4OmeDoH3Q9t2pttaz"><code>from langchain.agents import create_agent
from langchain.agents.middleware import HumanInTheLoopMiddleware
from langgraph.checkpoint.memory import InMemorySaver

agent = create_agent(
model="gpt-4o",
tools=[write_file_tool, execute_sql_tool, read_data_tool],
middleware=[
HumanInTheLoopMiddleware(
interrupt_on={
"write_file": True, # 允许所有决策（approve, edit, reject）
"execute_sql": {"allowed_decisions": ["approve", "reject"]}, # 不允许编辑
# 安全操作，无需批准
"read_data": False,
},
# 中断消息的前缀 - 与工具名称和参数组合形成完整消息
# 例如："Tool execution pending approval: execute_sql with query='DELETE FROM...'"
# 单个工具可以通过在其中断配置中指定 "description" 来覆盖此设置
description_prefix="Tool execution pending approval",
),
],
# 人机协同需要检查点（checkpointing）来处理中断。
# 在生产环境中，请使用持久化的检查点保存器，如 AsyncPostgresSaver。
checkpointer=InMemorySaver(),
)</code></pre>

<p id="t-bzQEdq9xddq36cW8LqNaRl"><span>您必须配置一个检查点保存器（checkpointer），以便在中断之间持久化图状态。 在生产环境中，请使用持久化的检查点保存器，如 </span><span style="border-bottom:1px solid;font-weight:bold">AsyncPostgresSaver</span><span>。对于测试或原型设计，可以使用 </span><span style="border-bottom:1px solid;font-weight:bold">InMemorySaver</span><span>。</span></p>

<p id="t-VNeNHSICGHeaZyA8ckY81t"><span>在调用智能体时，传递一个包含</span><span style="font-weight:bold">线程 ID</span><span> 的 </span><span>config</span><span>，以便将执行与会话线程关联起来。 详情请参阅 </span><span style="border-bottom:1px solid;font-weight:bold">LangGraph 中断文档</span><span>。</span></p>

<p id="t-NnOEcPFYdG9pvVBY3XRgUX"><span style="font-weight:bold">interrupt_on</span><span>dict</span><span style="font-weight:bold">required</span></p>

<p id="t-SYTwZU5NYggpSYSG5coEwS"><span>工具名称到批准配置的映射。值可以是</span><span>True</span><span>（使用默认配置中断）、</span><span>False</span><span>（自动批准）或一个</span><span>InterruptOnConfig</span><span>对象。</span></p>

<p id="t-f4Op4oQB3NrXszTA6GjkrF"><span style="font-weight:bold">description_prefix</span><span>string</span><span>default:"Tool execution requires approval"</span></p>

<p id="t-Lg7zRgbNepmBeq7svMh16N"><span>操作请求描述的前缀</span></p>

<p id="t-v4cRjxeZVrKWdhf9sxsPuL"><span style="font-weight:bold">InterruptOnConfig</span><span style="font-weight:bold">选项：</span></p>

<p id="t-TXNpzfAe3gniMbYS9rf4J5"><span style="font-weight:bold">allowed_decisions</span><span>list[string]</span></p>

<p id="t-6XbgmxrxEjDpiFWdVbSwyD"><span>允许的决策列表：</span><span>'approve'</span><span>、</span><span>'edit'</span><span>或</span><span>'reject'</span></p>

<p id="t-hzrjA0ByezaELTDABV8sN7"><span style="font-weight:bold">description</span><span>string | callable</span></p>

<p id="t-2uFHDSmAhUXYaYFfldQOwm"><span>用于自定义描述的静态字符串或可调用函数</span></p>


<a id="section-0814"></a>
## 响应中断

<a id="t-fA1E0noqE5btltLK9RJwXE"></a>

<p id="t-b0qapnMFt09Qmcg5CJgJTK"><span style="background-color:transparent">当您调用智能体时，它会一直运行直到完成或引发中断。当工具调用与您在</span><span style="background-color:transparent">interrupt_on</span><span style="background-color:transparent">中配置的策略匹配时，会触发中断。在这种情况下，调用结果将包含一个</span><span style="background-color:transparent">__interrupt__</span><span style="background-color:transparent">字段，其中列出了需要审查的操作。然后，您可以将这些操作呈现给审查者，并在提供决策后恢复执行。</span></p>

<pre id="t-1qGOxvUrmtEkDHPKIJBHh3"><code>from langgraph.types import Command

# 人机协同利用 LangGraph 的持久化层。
# 您必须提供一个线程 ID 来将执行与会话线程关联，
# 以便可以暂停和恢复对话（这是人工审查所需要的）。
config = {"configurable": {"thread_id": "some_id"}}
# 运行图直到遇到中断。
result = agent.invoke(
{
"messages": [
{
"role": "user",
"content": "Delete old records from the database",
}
]
},
config=config
)

# 中断包含完整的 HITL 请求，包括 action_requests 和 review_configs
print(result['__interrupt__'])
# &gt; [
# &gt;    Interrupt(
# &gt;       value={
# &gt;          'action_requests': [
# &gt;             {
# &gt;                'name': 'execute_sql',
# &gt;                'arguments': {'query': 'DELETE FROM records WHERE created_at &lt; NOW() - INTERVAL \'30 days\';'},
# &gt;                'description': 'Tool execution pending approval\n\nTool: execute_sql\nArgs: {...}'
# &gt;             }
# &gt;          ],
# &gt;          'review_configs': [
# &gt;             {
# &gt;                'action_name': 'execute_sql',
# &gt;                'allowed_decisions': ['approve', 'reject']
# &gt;             }
# &gt;          ]
# &gt;       }
# &gt;    )
# &gt; ]

# 使用批准决策恢复执行
agent.invoke(
Command(
resume={"decisions": [{"type": "approve"}]} # 或 "reject"
),
config=config # 相同的线程 ID 以恢复暂停的对话
)</code></pre>


<a id="section-0815"></a>
## 决策类型

<a id="t-lLyPlpAgg8JMvZjD4UWGez"></a>

<p id="t-QbfglZbKPl2sJcSTmN7aNf"><span>使用 </span><span>approve</span><span> 按原样批准工具调用并执行，不做更改。</span></p>

<p id="t-AuTZoHh6dCd7SLnyLPOf6k"><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">✅ approve</span></p>

<pre id="t-gAOA5aygSAX9OBgmrhpVbv"><code>agent.invoke(
Command(
# 决策以列表形式提供，每个被审查的操作一个。
# 决策的顺序必须与 `__interrupt__` 请求中列出的操作顺序匹配。
resume={
"decisions": [
{
"type": "approve",
}
]
}
),
config=config  # 相同的线程 ID 以恢复暂停的对话
)</code></pre>

<p id="t-mVf6T5ielqtUSzkvjhflIq"><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">✏️ edit</span></p>

<p id="t-GcLdPt5BNGhLviB6RD8SO2"><span style="background-color:transparent">使用 </span><span>edit</span><span style="background-color:transparent"> 在执行前修改工具调用。 提供编辑后的操作，包含新的工具名称和参数。</span></p>

<pre id="t-NGGPpYK5ujxKEiwHs9kKdy"><code>agent.invoke(
    Command(
 # 决策以列表形式提供，每个被审查的操作一个。
 # 决策的顺序必须与 `__interrupt__` 请求中列出的操作顺序匹配。
        resume={
 "decisions": [
 {
 "type": "edit",
 # 编辑后的操作，包含工具名称和参数
 "edited_action": {
 # 要调用的工具名称。
 # 通常与原始操作相同。
 "name": "new_tool_name",
 # 传递给工具的参数。
 "args": {"key1": "new_value", "key2": "original_value"},
 }
 }
 ]
 }
 ),
    config=config  # 相同的线程 ID 以恢复暂停的对话
)</code></pre>

<p id="t-BUzRDDVRLT8ROjLLeLbjmq"><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">❌ reject</span></p>

<p id="t-ZwFzXpnoFoH5zIchxMMLZj"><span style="background-color:transparent">使用 </span><span>reject</span><span style="background-color:transparent"> 拒绝工具调用，并提供反馈而不是执行。</span></p>

<pre id="t-G3tK4q5SkwfEwPXizmeTo8"><code>agent.invoke(
    Command(
 # 决策以列表形式提供，每个被审查的操作一个。
 # 决策的顺序必须与 `__interrupt__` 请求中列出的操作顺序匹配。
        resume={
 "decisions": [
 {
 "type": "reject",
 # 关于为什么拒绝该操作的解释
 "message": "No, this is wrong because ..., instead do this ...",
 }
 ]
 }
 ),
    config=config  # 相同的线程 ID 以恢复暂停的对话
)</code></pre>


<a id="section-0816"></a>
## 人机协同流式处理

<a id="t-Wsy4T8w6gxjq2QDcgujSNy"></a>

<p id="t-g0UfwJQt9WBIO585ZFAk8Z"><span style="background-color:transparent">您可以使用</span><span style="background-color:transparent">stream()</span><span style="background-color:transparent">代替</span><span style="background-color:transparent">invoke()</span><span style="background-color:transparent">，以便在智能体运行和处理中断时获得实时更新。使用</span><span style="background-color:transparent">stream_mode=['updates', 'messages']</span><span style="background-color:transparent">来同时流式传输智能体进度和 LLM 令牌。</span></p>

<pre id="t-TNOg7L1tNg4R04CFY8ggnj"><code>from langgraph.types import Command

config = {"configurable": {"thread_id": "some_id"}}

# 流式传输智能体进度和 LLM 令牌直到中断
for mode, chunk in agent.stream(
 {"messages": [{"role": "user", "content": "Delete old records from the database"}]},
    config=config,
    stream_mode=["updates", "messages"],
):
 if mode == "messages":
 # LLM 令牌
        token, metadata = chunk
 if token.content:
 print(token.content, end="", flush=True)
 elif mode == "updates":
 # 检查中断
 if "__interrupt__" in chunk:
 print(f"\n\nInterrupt: {chunk['__interrupt__']}")

# 在人工决策后恢复流式传输
for mode, chunk in agent.stream(
    Command(resume={"decisions": [{"type": "approve"}]}),
    config=config,
    stream_mode=["updates", "messages"],
):
 if mode == "messages":
        token, metadata = chunk
 if token.content:
 print(token.content, end="", flush=True)</code></pre>


<a id="section-0819"></a>
## 检索 (Retrieval)

<a id="t-block-17326"></a>

<p id="t-InujD0KGeItbp6DyCfSlM5"><span>大型语言模型（LLMs）功能强大，但它们存在两个关键限制：</span></p>

<ul><li id="t-34q65LCWuPeH2ffe4vXylX"><span style="font-weight:bold">有限的上下文</span><span>—— 它们无法一次性处理整个语料库。</span></li></ul>

<ul><li id="t-2b5QU1k8vyGavt2Gv974Au"><span style="font-weight:bold">静态知识</span><span>—— 它们的训练数据在某个时间点被冻结。</span></li></ul>

<p id="t-YWroyxXlT70KHDT0g2WpML"><span>检索（Retrieval）通过在查询时获取相关的外部知识来解决这些问题。这是</span><span style="font-weight:bold">检索增强生成（Retrieval-Augmented Generation，RAG）</span><span>的基础：利用特定上下文信息来增强 LLM 的答案。</span></p>


<a id="section-0820"></a>
## 构建知识库

<a id="t-QMWudiXZhCma7DWXeuYSg7"></a>

<p id="t-o66scc9qNQAVRnMjnFfFD4"><span style="font-weight:bold">知识库</span><span>是在检索过程中使用的文档或结构化数据的存储库。</span></p>

<p id="t-jM6v1OeMYLXvp2pay8CCvU"><span>如果你需要一个自定义的知识库，可以使用 LangChain 的文档加载器和向量存储来从你自己的数据中构建一个。</span></p>

<blockquote id="t-pqfKxjlnDhjE8JxxUQTICa"><p id="t-a31qFE6U7sbwBPreV7bFqm"><span>如果你已经有一个知识库（例如，SQL 数据库、CRM 或内部文档系统），你</span><span style="font-weight:bold">不需要</span><span>重建它。你可以： - 将其作为</span><span style="font-weight:bold">工具</span><span>连接到 Agentic RAG 中的智能体。 - 查询它，并将检索到的内容作为上下文提供给 LLM </span><span style="border-bottom:1px solid;font-weight:bold">（两步式 RAG）</span><span>。</span></p></blockquote>


<a id="section-0821"></a>
## 从检索到 RAG

<a id="t-t8j3yZWb9cR4ZSpZ232lmg"></a>

<p id="t-sJa9IvzD5Iw6o0vgzq8XP8"><span>检索使 LLMs 能够在运行时访问相关上下文。但大多数现实世界的应用更进一步：它们</span><span style="font-weight:bold">将检索与生成相结合</span><span>，以产生有依据、具备上下文感知能力的答案。</span></p>

<p id="t-lGnr9ZKK005TSb8diNgcVG"><span>这就是</span><span style="font-weight:bold">检索增强生成（RAG）</span><span>背后的核心理念。检索流程成为一个更广泛系统的基础，该系统将搜索与生成相结合。</span></p>


<a id="section-0822"></a>
## 检索流程

<a id="t-JbLvbqXdVQkC0jmPC7OHSV"></a>

<p id="t-YSL8i4Ahma7Htq0fJQmfzI"><span>一个典型的检索工作流如下所示：</span></p>

<div id="t-VKoVkAmyrKQCtG2w8rmiXL"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/d706828a53941c17197878f1.png"/></div>

<p id="t-9GpZoDvW7NQjTYMEQSELal"><span>每个组件都是模块化的：你可以更换加载器、分割器、嵌入模型或向量存储，而无需重写应用程序的逻辑。</span></p>


<a id="section-0823"></a>
## 构建模块

<a id="t-TTPH5sbj6g1vTA2WUFxofK"></a>

<div id="t-XuM3ZfqBy3wNK1nGYLwESE"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/dc798cbb23719e613aaad153.png"/></div>


<a id="section-0824"></a>
## RAG 架构

<a id="t-GOiaebAJMLEUlRbytqAjEh"></a>

<p id="t-50TC2gr2Wo6B9Rb87CaRuB"><span>RAG 可以通过多种方式实现，具体取决于你系统的需求。我们在下面的章节中概述了每种类型。</span></p>

<div id="t-Ce6oyItcLulvMRMbqpJdwa"><table><colgroup><col width="120"/><col width="120"/><col width="66.89752197265625"/><col width="77.005126953125"/><col width="77.005126953125"/><col width="181.0120849609375"/></colgroup><tbody><tr><td><p><span>架构</span></p></td><td><p><span>描述</span></p></td><td><p><span>控制力</span></p></td><td><p><span>灵活性</span></p></td><td><p><span>延迟</span></p></td><td><p><span>示例用例</span></p></td></tr><tr><td><p><span style="font-weight:bold">两步式 RAG</span></p></td><td><p><span>检索总是在生成之前发生。简单且可预测</span></p></td><td><p><span>✅ 高</span></p></td><td><p><span>❌ 低</span></p></td><td><p><span>⚡ 快</span></p></td><td><p><span>常见问题解答、文档机器人</span></p></td></tr><tr><td><p><span style="font-weight:bold">智能体式 RAG</span></p></td><td><p><span>由 LLM 驱动的智能体在推理过程中决定</span><span style="font-style:italic">何时</span><span>以及</span><span style="font-style:italic">如何</span><span>进行检索</span></p></td><td><p><span>❌ 低</span></p></td><td><p><span>✅ 高</span></p></td><td><p><span>⏳ 可变</span></p></td><td><p><span>可以访问多个工具的研究助手</span></p></td></tr><tr><td><p><span style="font-weight:bold">混合式 RAG</span></p></td><td><p><span>结合了两种方法的特点，并包含验证步骤</span></p></td><td><p><span>⚖️ 中等</span></p></td><td><p><span>⚖️ 中等</span></p></td><td><p><span>⏳ 可变</span></p></td><td><p><span>带有质量验证的特定领域问答</span></p></td></tr></tbody></table></div>

<p id="t-seu0B0pGZrudfuWU7RWW75"><span style="font-weight:bold">延迟</span><span>：在</span><span style="font-weight:bold">两步式 RAG</span><span>中，延迟通常更</span><span style="font-weight:bold">可预测</span><span>，因为 LLM 调用的最大次数是已知且有上限的。这种可预测性假设 LLM 推理时间是主要因素。然而，实际延迟也可能受到检索步骤性能的影响——例如 API 响应时间、网络延迟或数据库查询——这些性能会根据所使用的工具和基础设施而变化。</span></p>


<a id="section-0825"></a>
## 两步式 RAG

<a id="t-u1nxDG3L3lUL8YwGrxY4Mi"></a>

<p id="t-K7L2XYzmMtMrsNmKw6LlqX"><span>在</span><span style="font-weight:bold">两步式 RAG</span><span> 中，检索步骤总是在生成步骤之前执行。这种架构简单直接且可预测，适用于许多应用场景，在这些场景中，检索相关文档是生成答案的明确前提。</span></p>

<div id="t-DAZupOReJabgeu1DbuwLDX"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/8de95fcc350e06e858254f90.png"/></div>


<a id="section-0826"></a>
## 智能体式 RAG

<a id="t-9cOImn3UwAGZ1DSi6pJ6In"></a>

<p id="t-poRL6NBcqpnmBiQT7TvKtz"><span style="font-weight:bold">智能体式检索增强生成（Agentic RAG）</span><span>结合了检索增强生成和基于智能体的推理的优势。与在回答之前检索文档不同，一个由 LLM 驱动的智能体逐步推理，并在交互过程中决定</span><span style="font-weight:bold">何时</span><span>以及</span><span style="font-weight:bold">如何</span><span>检索信息。</span></p>

<blockquote id="t-5heIBSPBMnRsbmGEf3neDC"><p id="t-1OnAlH5VKLYXbsUpkIhacp"><span>智能体要启用 RAG 行为，唯一需要的就是能够访问一个或多个可以获取外部知识的</span><span style="font-weight:bold">工具</span><span>——例如文档加载器、Web API 或数据库查询。</span></p></blockquote>

<div id="t-zJhsEDbGemtSTbOZO3fewg"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/3160d27ce92c7140e8210f86.png"/></div>

<pre id="t-RHzrXfSn7AviDgABvmcVce"><code>import requests
from langchain.tools import tool
from langchain.chat_models import init_chat_model
from langchain.agents import create_agent

@tool
def fetch_url(url: str) -&gt; str:
 """从 URL 获取文本内容"""
    response = requests.get(url, timeout=10.0)
    response.raise_for_status()
 return response.text

system_prompt = """\
当你需要从网页获取信息时，使用 fetch_url；引用相关的片段。
"""

agent = create_agent(
    model="claude-sonnet-4-5-20250929",
    tools=[fetch_url], # 用于检索的工具
    system_prompt=system_prompt,
)</code></pre>

<p id="t-hOWDt7ee5POJMssJbxShUL"><span style="font-weight:bold">Hide扩展示例：用二LangGraph的llms.txt的智能体式RAG</span></p>

<p id="t-KIHT9cwgHT350QwsotBj8s"><span style="background-color:transparent">此示例实现了一个</span><span style="font-weight:bold;background-color:transparent">智能体式 RAG 系统</span><span style="background-color:transparent">，以帮助用户查询 LangGraph 文档。智能体首先加载 </span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">llms.txt</span><span style="background-color:transparent">，该文件列出了可用的文档 URL，然后可以根据用户的问题动态使用 </span><span>fetch_documentation</span><span style="background-color:transparent"> 工具来检索和处理相关内容。</span></p>

<pre id="t-L5wLyO2I17RYJLkukjucEj"><code>import requests
from langchain.agents import create_agent
from langchain.messages import HumanMessage
from langchain.tools import tool
from markdownify import markdownify

ALLOWED_DOMAINS = ["https://langchain-ai.github.io/"]
LLMS_TXT = 'https://langchain-ai.github.io/langgraph/llms.txt'

@tool
def fetch_documentation(url: str) -&gt; str:
 """从 URL 获取并转换文档"""
 if not any(url.startswith(domain) for domain in ALLOWED_DOMAINS):
 return (
 "Error: URL not allowed. "
 f"Must start with one of: {', '.join(ALLOWED_DOMAINS)}"
 )
    response = requests.get(url, timeout=10.0)
    response.raise_for_status()
 return markdownify(response.text)

# 我们将获取 llms.txt 的内容，因此这可以
# 提前完成，无需 LLM 请求。
llms_txt_content = requests.get(LLMS_TXT).text

# 智能体的系统提示词
system_prompt = f"""
你是一位专业的 Python 开发者和技术助手。
你的主要职责是帮助用户解决关于 LangGraph 及相关工具的问题。

指令：

1. 如果用户提出的问题你不确定——或者很可能涉及 API 使用、
   行为或配置——你**必须**使用 `fetch_documentation` 工具来查阅相关文档。
2. 引用文档时，要清晰总结并包含内容中的相关上下文。
3. 不要使用允许域之外的任何 URL。
4. 如果文档获取失败，请告知用户并基于你最好的专家理解继续。

你可以从以下批准的来源访问官方文档：

{llms_txt_content}

在回答用户关于 LangGraph 的问题之前，你**必须**查阅文档以获取最新的文档。

你的回答应该清晰、简洁且技术准确。
"""

tools = [fetch_documentation]

model = init_chat_model("claude-sonnet-4-0", max_tokens=32_000)

agent = create_agent(
    model=model,
    tools=tools,
    system_prompt=system_prompt,
    name="Agentic RAG",
)

response = agent.invoke({
 'messages': [
        HumanMessage(content=(
 "Write a short example of a langgraph agent using the "
 "prebuilt create react agent. the agent should be able "
 "to look up stock pricing information."
 ))
 ]
})

print(response['messages'][-1].content)</code></pre>


<a id="section-0827"></a>
## 混合式 RAG

<a id="t-j4120man5QobqUMY2bUKCq"></a>

<p id="t-ZWQdSMrgwC3BXhK4ozQPfT"><span>混合式 RAG 结合了两步式 RAG 和智能体式 RAG 的特点。它引入了中间步骤，例如查询预处理、检索验证和后生成检查。这些系统比固定流程提供了更多的灵活性，同时保持了对执行过程的某种控制。</span></p>

<p id="t-aub1AXLLVmd6m8graTHBVF"><span>典型的组件包括：</span></p>

<ul><li id="t-no5CS5WOYtqr2cmoEtV4XA"><span style="font-weight:bold">查询增强</span><span>：修改输入问题以提高检索质量。这可能涉及重写不明确的查询、生成多个变体或用额外的上下文扩展查询。</span></li></ul>

<ul><li id="t-glcI5GTLqBKXBe857S0kb4"><span style="font-weight:bold">检索验证</span><span>：评估检索到的文档是否相关且充分。如果不是，系统可能会优化查询并再次检索。</span></li></ul>

<ul><li id="t-AuwqNwTBRhsSeM00BnL0jZ"><span style="font-weight:bold">答案验证</span><span>：检查生成的答案的准确性、完整性以及与源内容的一致性。如果需要，系统可以重新生成或修改答案。</span></li></ul>

<p id="t-OYu0kIAanAqFncqP0FtOri"><span>该架构通常支持这些步骤之间的多次迭代：</span></p>

<div id="t-v24DDwa8QIEtX6ixOawptm"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/bbab24ff91543f109d207d48.png"/></div>

<p id="t-Y4gbIJ28LcSoYItC7df9KG"><span>这种架构适用于：</span></p>

<ul><li id="t-D1zrAMMTf4wPeWHDQoTAZ1"><span>具有模糊或未明确指定查询的应用程序</span></li></ul>

<ul><li id="t-FeZXDSs0eZ1MCRYqzFOHjE"><span>需要验证或质量控制步骤的系统</span></li></ul>

<ul><li id="t-k8hFpJXUzL6ifduou0wNZn"><span>涉及多个来源或迭代优化的工作流</span></li></ul>


<a id="section-0829"></a>
## 概述

<a id="t-HTrNuHhKloZ4mvFPUPdsPw"></a>

<p id="t-O5HrdTX1kUNab3a3rxpjLL"><span style="background-color:transparent">LangChain 智能体使用 </span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">LangGraph 持久化</span><span style="background-color:transparent"> 来实现长期记忆。这是一个更高级的主题，需要了解 LangGraph 才能使用。</span></p>


<a id="section-0830"></a>
## 记忆存储

<a id="t-AVZu1i0RkWZc4c9NSVFpYY"></a>

<p id="t-m30tSoFrnDvjnFHT9w1WJT"><span style="background-color:transparent">LangGraph 将长期记忆作为 JSON 文档存储在 </span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">存储</span><span style="background-color:transparent"> 中。</span></p>

<p id="t-XW1klRt0ISVNmT0xGekAMQ"><span style="background-color:transparent">每个记忆都组织在一个自定义的</span><span style="background-color:transparent">namespace</span><span style="background-color:transparent">（类似于文件夹）和一个唯一的</span><span style="background-color:transparent">key</span><span style="background-color:transparent">（类似于文件名）下。命名空间通常包含用户或组织 ID 或其他标签，以便于组织信息。</span></p>

<p id="t-NHv79GiaAzuKG2Cw8g6EAr"><span style="background-color:transparent">这种结构支持记忆的层次化组织。然后通过内容过滤器支持跨命名空间的搜索。</span></p>

<pre id="t-62GdWDwT01KfSGFP66cB1q"><code>from langgraph.store.memory import InMemoryStore

def embed(texts: list[str]) -&gt; list[list[float]]:
# Replace with an actual embedding function or LangChain embeddings object
return [[1.0, 2.0] * len(texts)]

# InMemoryStore saves data to an in-memory dictionary. Use a DB-backed store in production use.
store = InMemoryStore(index={"embed": embed, "dims": 2})
user_id = "my-user"
application_context = "chitchat"
namespace = (user_id, application_context)
store.put(
namespace,
"a-memory",
{
"rules": [
"User likes short, direct language",
"User only speaks English &amp; python",
],
"my-key": "my-value",
},
)
# get the "memory" by ID
item = store.get(namespace, "a-memory")
# search for "memories" within this namespace, filtering on content equivalence, sorted by vector similarity
items = store.search(
namespace, filter={"my-key": "my-value"}, query="language preferences"
)</code></pre>


<a id="section-0831"></a>
## 在工具中读取长期记忆

<a id="t-cE3l36G8RjU4NdvSNJPl0s"></a>

<p id="t-cg8kUf9xVmKeARwUW1eRK4"><span style="font-weight:bold">一个智能体可以用来查找用户信息的工具</span></p>

<pre id="t-SvJzHVfoLEkbMi01eqAVNA"><code>from dataclasses import dataclass

from langchain_core.runnables import RunnableConfig
from langchain.agents import create_agent
from langchain.tools import tool, ToolRuntime
from langgraph.store.memory import InMemoryStore

@dataclass
class Context:
user_id: str

# InMemoryStore saves data to an in-memory dictionary. Use a DB-backed store in production.
store = InMemoryStore()

# Write sample data to the store using the put method
store.put(
("users",), # Namespace to group related data together (users namespace for user data)
"user_123", # Key within the namespace (user ID as key)
{
"name": "John Smith",
"language": "English",
} # Data to store for the given user
)

@tool
def get_user_info(runtime: ToolRuntime[Context]) -&gt; str:
"""Look up user info."""
# Access the store - same as that provided to `create_agent`
store = runtime.store
user_id = runtime.context.user_id
# Retrieve data from store - returns StoreValue object with value and metadata
user_info = store.get(("users",), user_id)
return str(user_info.value) if user_info else "Unknown user"

agent = create_agent(
model="claude-sonnet-4-5-20250929",
tools=[get_user_info],
# Pass store to agent - enables agent to access store when running tools
store=store,
context_schema=Context
)

# Run the agent
agent.invoke(
{"messages": [{"role": "user", "content": "look up user information"}]},
context=Context(user_id="user_123")
)</code></pre>


<a id="section-0832"></a>
## 从工具写入长期记忆

<a id="t-AH8uWL3w6yrVZiuKZj2WjJ"></a>

<p id="t-aXsNDzlB7E3vJlQZunr5cT"><span style="font-weight:bold">更新用户信息的工具示例</span></p>

<pre id="t-RSgxG5G3u6JAmZkulVF3fG"><code>from dataclasses import dataclass
from typing_extensions import TypedDict

from langchain.agents import create_agent
from langchain.tools import tool, ToolRuntime
from langgraph.store.memory import InMemoryStore

# InMemoryStore saves data to an in-memory dictionary. Use a DB-backed store in production.
store = InMemoryStore()

@dataclass
class Context:
user_id: str

# TypedDict defines the structure of user information for the LLM
class UserInfo(TypedDict):
name: str

# Tool that allows agent to update user information (useful for chat applications)
@tool
def save_user_info(user_info: UserInfo, runtime: ToolRuntime[Context]) -&gt; str:
"""Save user info."""
# Access the store - same as that provided to `create_agent`
store = runtime.store
user_id = runtime.context.user_id
# Store data in the store (namespace, key, data)
store.put(("users",), user_id, user_info)
return "Successfully saved user info."

agent = create_agent(
model="claude-sonnet-4-5-20250929",
tools=[save_user_info],
store=store,
context_schema=Context
)

# Run the agent
agent.invoke(
{"messages": [{"role": "user", "content": "My name is John Smith"}]},
# user_id passed in context to identify whose information is being updated
context=Context(user_id="user_123")
)

# You can access the store directly to get the value
store.get(("users",), "user_123").value</code></pre>


<a id="section-0835"></a>
## LangSmith Studio 实验室

<a id="t-block-17391"></a>

<p id="t-5o0SvzmC7BSgTPGh7sVRkl"><span style="background-color:transparent">在本地构建 LangChain 智能体时，可视化智能体的内部运行情况、实时交互以及调试出现的问题会非常有帮助。</span><span style="font-weight:bold;background-color:transparent">LangSmith Studio</span><span style="background-color:transparent"> 是一个免费的视觉界面，用于从本地机器开发和测试您的 LangChain 智能体。</span></p>

<p id="t-EMSs9eug83VP1yrmzoSKHJ"><span style="background-color:transparent">Studio 连接到您本地运行的智能体，向您展示智能体执行的每个步骤：发送给模型的提示、工具调用及其结果，以及最终输出。您可以测试不同的输入、检查中间状态，并在无需额外代码或部署的情况下迭代优化智能体的行为。</span></p>

<p id="t-G9sKT2dufABQ3axXMgGkEM"><span style="background-color:transparent">本页描述了如何为您的本地 LangChain 智能体设置 Studio。</span></p>


<a id="section-0836"></a>
## 先决条件

<a id="t-RpgEyGj3maA8LnMVplajyW"></a>

<p id="t-yseQ36VTzAWIP217QGEvJB"><span style="background-color:transparent">开始之前，请确保您具备以下条件：</span></p>

<ul><li id="t-NV4xkgSrL9fGL1cDVXwQOp"><span style="font-weight:bold">一个 LangSmith 账户</span><span>：在</span><span style="border-bottom:1px solid;font-weight:bold">smith.langchain.com</span><span>免费注册或登录。</span></li></ul>

<ul><li id="t-9py9fl4D5jLB85aVzb0ooL"><span style="font-weight:bold">一个 LangSmith API 密钥</span><span>：请遵循</span><span style="border-bottom:1px solid;font-weight:bold">创建 API 密钥</span><span>指南。</span></li></ul>

<ul><li id="t-Z5pMpaSjnQlbWdcWJNXcCC"><span>如果您不希望数据被</span><span style="border-bottom:1px solid;font-weight:bold">追踪</span><span>到 LangSmith，请在应用程序的 </span><span>.env</span><span> 文件中设置 </span><span>LANGSMITH_TRACING=false</span><span>。禁用追踪后，数据不会离开您的本地服务器。</span></li></ul>


<a id="section-0838"></a>
## 安装 LangGraph CLI

<a id="t-tp1aGcikvMzkw4oHlkRFqk"></a>

<p id="t-6f9H2QcPIPS8c5sF4vp9Tx"><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">LangGraph CLI</span><span style="background-color:transparent"> 提供了一个本地开发服务器（也称为</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">智能体服务器</span><span style="background-color:transparent">），用于将您的智能体连接到 Studio。</span></p>

<pre id="t-Sf8YG5tG57wqbKKGabisrm"><code># 需要 Python &gt;= 3.11。
pip install --upgrade "langgraph-cli[inmem]"</code></pre>


<a id="section-0839"></a>
## 准备您的智能体

<a id="t-f0N4Tcuy3njJt70F82sgm7"></a>

<p id="t-tTfxm2sDhKidTKie7eFCOm"><span style="background-color:transparent">如果您已经有一个 LangChain 智能体，可以直接使用它。本示例使用一个简单的邮件智能体：</span></p>

<pre id="t-bjpJLrtoeUKKjnp2ESPtyO"><code>from langchain.agents import create_agent

def send_email(to: str, subject: str, body: str):
"""发送邮件"""
email = {
"to": to,
"subject": subject,
"body": body
}
# ... 邮件发送逻辑

return f"Email sent to {to}"

agent = create_agent(
"gpt-4o",
tools=[send_email],
system_prompt="You are an email assistant. Always use the send_email tool.",
)</code></pre>


<a id="section-0840"></a>
## 环境变量

<a id="t-hPCsaaV81fmNnP0gpXTtPu"></a>

<p id="t-HKJwYHFMgRe8BUSq0u5Qpb"><span style="background-color:transparent">Studio 需要一个 LangSmith API 密钥来连接您的本地智能体。在项目的根目录下创建一个 </span><span style="background-color:transparent">.env</span><span style="background-color:transparent"> 文件，并添加您从 </span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">LangSmith</span><span style="background-color:transparent"> 获取的 API 密钥。</span></p>

<blockquote id="t-fsylSEwpHeuMnKGRxMRwe4"><img alt="" decoding="async" height="20" loading="lazy" src="/images/agent-learning/040e0a04356c12994f61a701.svg" width="20"/><p id="t-B4x6mxJp5t0kj4KPGPL0hm"><span>请确保您的</span><span>.env</span><span>文件不会被提交到版本控制系统（如 Git）。</span></p></blockquote>

<p id="t-MGZ48nxn5KCevSXFOsxe1o"><span style="font-weight:bold">.env</span></p>

<pre id="t-vU4FLuSCBokrcX3nB9isqJ"><code>LANGSMITH_API_KEY=lsv2...</code></pre>


<a id="section-0841"></a>
## 创建 LangGraph 配置文件

<a id="t-BodVfwVvcAZO1svGZS8G1s"></a>

<p id="t-JUi3td29zMoIEFcorKaeRT"><span style="background-color:transparent">LangGraph CLI 使用配置文件来定位您的智能体并管理依赖项。在您的应用目录中创建一个</span><span style="background-color:transparent">langgraph.json</span><span style="background-color:transparent">文件：</span></p>

<pre id="t-m3fgXFNYKJwOjLVg2IDdoA"><code>{
"dependencies": ["."],
"graphs": {
"agent": "./src/agent.py:agent"
},
"env": ".env"
}</code></pre>

<p id="t-qtCCVfRsFtcQc78Hp02GRd"><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">create_agent</span><span style="background-color:transparent"> 函数会自动返回一个已编译的 LangGraph 图，这正是配置文件中 </span><span style="background-color:transparent">graphs</span><span style="background-color:transparent"> 键所期望的内容。</span></p>

<blockquote id="t-wNiOFfDMBSGqOsUONWDFRH"><p id="t-5R5nYesjo6l7q1F162sPw7"><span>有关配置文件中 JSON 对象每个键的详细说明，请参阅 </span><span style="border-bottom:1px solid;font-weight:bold">LangGraph 配置文件参考</span><span>。</span></p></blockquote>

<p id="t-MRcAEDRs1MlmZ9410SWxPm"><span style="background-color:transparent">此时，项目结构将如下所示：</span></p>

<pre id="t-HD2f0seZ8YVpTu4gXk5lm2"><code>my-app/
├── src
│   └── agent.py
├── .env
└── langgraph.json</code></pre>


<a id="section-0842"></a>
## 安装依赖项

<a id="t-sII3cxbfQoNDWMhTYM80oQ"></a>

<p id="t-IBynDwqOBS7MiF2bkbwZwY"><span style="background-color:transparent">从根目录安装项目依赖项：</span></p>

<pre id="t-hrpr5gATDylZ6oEMJGTmEi"><code>pip install langchain langchain-openai</code></pre>


<a id="section-0843"></a>
## 在 Studio 中查看您的智能体

<a id="t-m5v7las4ejzl4ON8EGPUoI"></a>

<p id="t-aKX9ZvDa99M6mD2JC8shyy"><span style="background-color:transparent">启动开发服务器，将您的智能体连接到 Studio：</span></p>

<pre id="t-MFaeRWUc35oosBcCQ5cnf5"><code>langgraph dev</code></pre>

<blockquote id="t-IPZO8nITufnGdNelAmba03"><p id="t-tYfV4WT53PPhDAaZAEdPBR"><span>Safari 浏览器会阻止到 Studio 的</span><span>localhost</span><span>连接。要解决此问题，请使用</span><span>--tunnel</span><span>参数运行上述命令，以便通过安全隧道访问 Studio。</span></p></blockquote>

<p id="t-eYnYnqr0wOaywfs5fZKghz"><span style="background-color:transparent">服务器运行后，您的智能体既可以通过 API 在</span><span style="background-color:transparent">http://127.0.0.1:2024</span><span style="background-color:transparent">访问，也可以通过 Studio UI 在</span><span style="background-color:transparent">https://smith.langchain.com/studio/?baseUrl=http://127.0.0.1:2024</span><span style="background-color:transparent">访问：</span></p>

<div id="t-1DuxZcLL38cFZT9jfOb7Lm"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/7441f90e8cbee32ebe0b7f14.png"/></div>

<p id="t-EG9ikwf8320tbTBObnj3aL"><span style="background-color:transparent">当 Studio 连接到您的本地智能体后，您可以快速迭代优化智能体的行为。运行测试输入，检查完整的执行轨迹，包括提示、工具参数、返回值以及令牌/延迟指标。当出现问题时，Studio 会捕获异常及其周围的状态，帮助您了解发生了什么。</span></p>

<p id="t-RzeUduGPbmUp6VJwjAj2Pc"><span style="background-color:transparent">开发服务器支持热重载——在代码中更改提示或工具签名，Studio 会立即反映这些更改。您可以从任何步骤重新运行对话线程来测试您的更改，而无需从头开始。这个工作流程适用于从简单的单工具智能体到复杂的多节点图。</span></p>


<a id="section-0844"></a>
## 测试

<a id="t-block-17431"></a>

<p id="t-NvZwWIgHhy3kpGfqwvnjhs"><span>智能体应用让大语言模型（LLM）自行决定解决问题的后续步骤。这种灵活性很强大，但模型的黑盒特性使得难以预测对智能体某一部分的调整会如何影响其他部分。要构建可用于生产环境的智能体，彻底的测试至关重要。</span></p>

<p id="t-75j3TY6z023DWm48ZxCiwr"><span>测试智能体有几种方法：</span></p>

<ul><li id="t-kPDTIuM2jYB5N5gBT2WcK5"><span style="border-bottom:1px solid;font-weight:bold">单元测试</span><span> 使用内存中的模拟对象，独立地测试智能体中小的、确定性的部分，以便快速、确定地断言其确切行为。</span></li></ul>

<ul><li id="t-ZmepGT822sOTviFfi8owTZ"><span style="border-bottom:1px solid;font-weight:bold">集成测试</span><span> 通过真实的网络调用来测试智能体，以确认组件能协同工作、凭据和模式匹配、以及延迟是可接受的。</span></li></ul>

<p id="t-WEu9vHKF4rBSvcNAodZat5"><span>智能体应用往往更依赖集成测试，因为它们将多个组件链接在一起，并且必须处理由于 LLM 的非确定性特性而导致的不可靠性。</span></p>


<a id="section-0846"></a>
## 模拟聊天模型

<a id="t-zGn1F7VeSvLSjVREOyHJJD"></a>

<p id="t-QgQaQ0RLhpxajuKihToewG"><span>对于不需要 API 调用的逻辑，可以使用内存中的存根来模拟响应。</span></p>

<p id="t-higUS7KjvKdaJreRBppFQV"><span>LangChain 提供了 </span><span style="border-bottom:1px solid;font-weight:bold">GenericFakeChatModel</span><span> 来模拟文本响应。它接受一个响应迭代器（AIMessages 或字符串），每次调用返回一个。它支持常规和流式使用。</span></p>

<pre id="t-tHz47cabcsaZoEkcC3V4kq"><code>from langchain_core.language_models.fake_chat_models import GenericFakeChatModel

model = GenericFakeChatModel(messages=iter([
AIMessage(content="", tool_calls=[ToolCall(name="foo", args={"bar": "baz"}, id="call_1")]),
"bar"
]))

model.invoke("hello")
# AIMessage(content='', ..., tool_calls=[{'name': 'foo', 'args': {'bar': 'baz'}, 'id': 'call_1', 'type': 'tool_call'}])</code></pre>

<p id="t-u1t5A7ZMUjaIo3edxXfGDP"><span>如果我们再次调用模型，它将返回迭代器中的下一个项目：</span></p>

<pre id="t-KXKjGQZtjdzYDHgv1SGg0A"><code>model.invoke("hello, again!")
# AIMessage(content='bar', ...)</code></pre>


<a id="section-0847"></a>
## InMemorySaver 检查点保存器

<a id="t-NzLdgT9MKZWMaTbiRB4sLJ"></a>

<p id="t-T48XYJDb9FFWwoKs4C548V"><span>为了在测试期间启用持久化，可以使用 </span><span style="border-bottom:1px solid;font-weight:bold">InMemorySaver</span><span> 检查点保存器。这允许你模拟多个轮次来测试依赖于状态的行为：</span></p>

<pre id="t-Xpl5BbubnPS8kUkQAdH3rm"><code>from langgraph.checkpoint.memory import InMemorySaver

agent = create_agent(
model,
tools=[],
checkpointer=InMemorySaver()
)

# 第一次调用
agent.invoke(HumanMessage(content="I live in Sydney, Australia."))

# 第二次调用：第一条消息被持久化（悉尼位置），因此模型返回 GMT+10 时间
agent.invoke(HumanMessage(content="What's my local time?"))</code></pre>


<a id="section-0848"></a>
## 集成测试

<a id="t-Adt35Dia2ozJ5nVcfovKqN"></a>

<p id="t-RYvzNJj5PHjsHHStpfoePj"><span>许多智能体行为只有在使用真实的 LLM 时才会显现，例如智能体决定调用哪个工具、如何格式化响应，或者提示词的修改是否会影响整个执行轨迹。LangChain 的 </span><span style="border-bottom:1px solid;font-weight:bold">agentevals</span><span> 包提供了专门设计用于使用实时模型测试智能体轨迹的评估器。</span></p>

<p id="t-SYh5OZTSEs9lO6FJtBKwqT"><span>AgentEvals 允许你通过执行 </span><span style="font-weight:bold">轨迹匹配</span><span> 或使用 </span><span style="font-weight:bold">LLM 评判</span><span> 来轻松评估智能体的轨迹（消息的确切序列，包括工具调用）：</span></p>

<div id="t-ga7WfrZbF2VeXlJU73Wvgd"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/5a89ee30a58bf50cd5e43ce3.png"/></div>


<a id="section-0849"></a>
## 安装 AgentEvals

<a id="t-8M9Go53w2gIhZUIWKN5rUy"></a>

<pre id="t-J1Nk62zSBlwVEbfAsXshbm"><code>pip install agentevals</code></pre>

<p id="t-OVn5vVsk7sQeVvaFmsWvfM"><span>或者，直接克隆</span><span style="border-bottom:1px solid;font-weight:bold">AgentEvals 仓库</span><span>。</span></p>


<a id="section-0850"></a>
## 轨迹匹配评估器

<a id="t-8ermBxUrBYO0xy14Ic5ZuZ"></a>

<p id="t-ysTYQbAFsm9MwjtnqoPFcn"><span>AgentEvals 提供了</span><span>create_trajectory_match_evaluator</span><span>函数来将智能体的轨迹与参考轨迹进行匹配。有四种模式可供选择：</span></p>

<div id="t-P8PF4vXGXtAe5KSMcAR6bv"><table><colgroup><col width="120"/><col width="287.90093994140625"/><col width="237.01031494140625"/></colgroup><tbody><tr><td><p><span>模式</span></p></td><td><p><span>描述</span></p></td><td><p><span>使用场景</span></p></td></tr><tr><td><p><span>strict</span></p></td><td><p><span>消息和工具调用顺序完全匹配</span></p></td><td><p><span>测试特定序列（例如，在授权之前进行策略查找）</span></p></td></tr><tr><td><p><span>unordered</span></p></td><td><p><span>允许相同的工具调用以任意顺序出现</span></p></td><td><p><span>验证信息检索，当顺序无关紧要时</span></p></td></tr><tr><td><p><span>subset</span></p></td><td><p><span>智能体仅调用参考轨迹中的工具（不允许额外调用）</span></p></td><td><p><span>确保智能体不超过预期范围</span></p></td></tr><tr><td><p><span>superset</span></p></td><td><p><span>智能体至少调用参考轨迹中的工具（允许额外调用）</span></p></td><td><p><span>验证至少执行了所需的最小操作</span></p></td></tr></tbody></table></div>

<p id="t-QcJRhPGTYktp5hGR2lz38R"><span style="font-weight:bold">严格匹配</span></p>

<p id="t-uuedvRSJFhxedOcprDuZ39"><span>strict</span><span>模式确保轨迹包含相同顺序的相同消息和相同的工具调用，但允许消息内容存在差异。当你需要强制执行特定的操作序列时，这很有用，例如要求在授权操作之前进行策略查找。</span></p>

<pre id="t-TEWwwUMzWEsHoZLZQIT3oW"><code>from langchain.agents import create_agent
from langchain.tools import tool
from langchain.messages import HumanMessage, AIMessage, ToolMessage
from agentevals.trajectory.match import create_trajectory_match_evaluator

@tool
def get_weather(city: str):
"""Get weather information for a city."""
return f"It's 75 degrees and sunny in {city}."

agent = create_agent("gpt-4o", tools=[get_weather])

evaluator = create_trajectory_match_evaluator(
trajectory_match_mode="strict",
)

def test_weather_tool_called_strict():
result = agent.invoke({
"messages": [HumanMessage(content="What's the weather in San Francisco?")]
})

reference_trajectory = [
HumanMessage(content="What's the weather in San Francisco?"),
AIMessage(content="", tool_calls=[
{"id": "call_1", "name": "get_weather", "args": {"city": "San Francisco"}}
]),
ToolMessage(content="It's 75 degrees and sunny in San Francisco.", tool_call_id="call_1"),
AIMessage(content="The weather in San Francisco is 75 degrees and sunny."),
]

evaluation = evaluator(
outputs=result["messages"],
reference_outputs=reference_trajectory
)
# {
#     'key': 'trajectory_strict_match',
#     'score': True,
#     'comment': None,
# }
assert evaluation["score"] is True</code></pre>

<p id="t-tNXpx3IZou9wxzPsVGoNAp"><span style="font-weight:bold">无序匹配</span></p>

<p id="t-Gq5hQbD8ao5jqSCNGntiCB"><span>unordered</span><span>模式允许相同的工具调用以任意顺序出现，当你想要验证是否检索了特定信息但不关心顺序时，这很有帮助。例如，智能体可能需要检查城市的天气和活动，但顺序无关紧要。</span></p>

<pre id="t-BeE0MXEQWhTkOUQABpecO6"><code>from langchain.agents import create_agent
from langchain.tools import tool
from langchain.messages import HumanMessage, AIMessage, ToolMessage
from agentevals.trajectory.match import create_trajectory_match_evaluator

@tool
def get_weather(city: str):
"""Get weather information for a city."""
return f"It's 75 degrees and sunny in {city}."

@tool
def get_events(city: str):
"""Get events happening in a city."""
return f"Concert at the park in {city} tonight."

agent = create_agent("gpt-4o", tools=[get_weather, get_events])

evaluator = create_trajectory_match_evaluator(
trajectory_match_mode="unordered",
)

def test_multiple_tools_any_order():
result = agent.invoke({
"messages": [HumanMessage(content="What's happening in SF today?")]
})

# 参考轨迹显示工具调用顺序与实际执行不同
reference_trajectory = [
HumanMessage(content="What's happening in SF today?"),
AIMessage(content="", tool_calls=[
{"id": "call_1", "name": "get_events", "args": {"city": "SF"}},
{"id": "call_2", "name": "get_weather", "args": {"city": "SF"}},
]),
ToolMessage(content="Concert at the park in SF tonight.", tool_call_id="call_1"),
ToolMessage(content="It's 75 degrees and sunny in SF.", tool_call_id="call_2"),
AIMessage(content="Today in SF: 75 degrees and sunny with a concert at the park tonight."),
]

evaluation = evaluator(
outputs=result["messages"],
reference_outputs=reference_trajectory,
)
# {
#     'key': 'trajectory_unordered_match',
#     'score': True,
# }
assert evaluation["score"] is True</code></pre>

<p id="t-rLlAST7gW7VTDdmzwQ26RE"><span>superset</span><span>和</span><span>subset</span><span>模式匹配部分轨迹。</span><span>superset</span><span>模式验证智能体至少调用了参考轨迹中的工具，允许额外的工具调用。</span><span>subset</span><span>模式确保智能体没有调用超出参考轨迹范围的任何工具。</span></p>

<pre id="t-LwKN0bcSHgY3WqNU6G5p8m"><code>from langchain.agents import create_agent
from langchain.tools import tool
from langchain.messages import HumanMessage, AIMessage, ToolMessage
from agentevals.trajectory.match import create_trajectory_match_evaluator

@tool
def get_weather(city: str):
"""Get weather information for a city."""
return f"It's 75 degrees and sunny in {city}."

@tool
def get_detailed_forecast(city: str):
"""Get detailed weather forecast for a city."""
return f"Detailed forecast for {city}: sunny all week."

agent = create_agent("gpt-4o", tools=[get_weather, get_detailed_forecast])

evaluator = create_trajectory_match_evaluator(
trajectory_match_mode="superset",
)

def test_agent_calls_required_tools_plus_extra():
result = agent.invoke({
"messages": [HumanMessage(content="What's the weather in Boston?")]
})

# 参考轨迹仅要求 get_weather，但智能体可能调用额外的工具
reference_trajectory = [
HumanMessage(content="What's the weather in Boston?"),
AIMessage(content="", tool_calls=[
{"id": "call_1", "name": "get_weather", "args": {"city": "Boston"}},
]),
ToolMessage(content="It's 75 degrees and sunny in Boston.", tool_call_id="call_1"),
AIMessage(content="The weather in Boston is 75 degrees and sunny."),
]

evaluation = evaluator(
outputs=result["messages"],
reference_outputs=reference_trajectory,
)
# {
#     'key': 'trajectory_superset_match',
#     'score': True,
#     'comment': None,
# }
assert evaluation["score"] is True</code></pre>


<a id="section-0851"></a>
## 智能体聊天界面

<a id="t-block-17466"></a>

<p id="t-SjdOf0yGS6uSsD2dlU8UqV"><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">Agent Chat UI</span><span style="background-color:transparent"> 是一个 Next.js 应用程序，它为与任何 LangChain 智能体（agent）交互提供了一个对话式界面。它支持实时聊天、工具可视化以及时间旅行调试（time-travel debugging）和状态分叉（state forking）等高级功能。Agent Chat UI 能与使用 </span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">create_agent</span><span style="background-color:transparent"> 创建的智能体无缝协作，并以最少的设置为您的智能体提供交互式体验，无论您是在本地运行还是在部署环境中运行（例如 </span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">LangSmith</span><span style="background-color:transparent">）。</span></p>

<p id="t-wk8Tzzu0ffoqmJQIu9RrOL"><span style="background-color:transparent">Agent Chat UI 是开源的，可以根据您的应用需求进行调整。</span></p>

<div id="t-S1n3uJNInNu6sW2L0aXsVy"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/5bb6e7325ddf77947fd231ad.png"/></div>

<blockquote id="t-IkBOyaG83cRvZWo7Rfc1AA"><p id="t-ZbH6224Dn0FkxvzrE9fhLE"><span>您可以在 Agent Chat UI 中使用生成式 UI（generative UI）。</span></p></blockquote>


<a id="section-0852"></a>
## 快速开始

<a id="t-tYnuERxCTyI9V6ix8qLT9O"></a>

<p id="t-367xDOybHH6FU7sBvFor8O"><span style="background-color:transparent">最快上手的方法是使用托管版本：</span></p>

<ol start="1"><li id="t-zkmnYDKK4k5jBDVhdZVQPT"><span style="font-weight:bold">访问</span><span style="border-bottom:1px solid;font-weight:bold">Agent Chat UI</span></li></ol>

<ol start="2"><li id="t-uFXK7WEb8ZzDJjTVg0AQ6j"><span style="font-weight:bold">连接您的智能体</span><span>，输入您的部署 URL 或本地服务器地址</span></li></ol>

<ol start="3"><li id="t-lF405pvUtOUwp1g7klRgeG"><span style="font-weight:bold">开始聊天</span><span>- UI 将自动检测并渲染工具调用（tool calls）和中断（interrupts）</span></li></ol>


<a id="section-0853"></a>
## 本地开发

<a id="t-kDOnT55v25pHzsNzGmGKLY"></a>

<p id="t-chGUgQVzMO3jWR20SaBTGc"><span style="background-color:transparent">如需自定义或进行本地开发，您可以在本地运行 Agent Chat UI：</span></p>

<p id="t-LnapaWzdrpONP7QffxYrPh"><span>使用 npx</span></p>

<p id="t-EjJShtbABvnHpVtoLiiwGM"><span>克隆仓库</span></p>

<pre id="t-fiDLNTN87TApiOJFgk7NWW"><code># 创建一个新的 Agent Chat UI 项目
npx create-agent-chat-app --project-name my-chat-ui
cd my-chat-ui

# 安装依赖并启动
pnpm install
pnpm dev</code></pre>


<a id="section-0854"></a>
## 连接到您的智能体

<a id="t-N4zp4X7n2G4R3QbcXux1lA"></a>

<p id="t-pNt9r5AOGqHqZTsbi2ktOX"><span style="background-color:transparent">Agent Chat UI 可以连接到</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">本地</span><span style="background-color:transparent">和</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">已部署的智能体</span><span style="background-color:transparent">。</span></p>

<p id="t-4w11umli1Qdyr5VAsGjO4a"><span style="background-color:transparent">启动 Agent Chat UI 后，您需要配置它以连接到您的智能体：</span></p>

<ol start="1"><li id="t-STPJ6F25TYdGFyFA3oKM0y"><span style="font-weight:bold">图 ID</span><span>：输入您的图名称（在您的</span><span>langgraph.json</span><span>文件中的</span><span>graphs</span><span>下找到此信息）</span></li></ol>

<ol start="2"><li id="t-ztIGyc9KF3CaTgJMW3ZiMY"><span style="font-weight:bold">部署 URL</span><span>：您的智能体服务器的端点（例如，本地开发使用 </span><span>http://localhost:2024</span><span>，或您已部署智能体的 URL）</span></li></ol>

<ol start="3"><li id="t-bACV2sXRwFxUIP9Zkxya7N"><span style="font-weight:bold">LangSmith API 密钥（可选）</span><span>：添加您的 LangSmith API 密钥（如果您使用的是本地智能体服务器，则不需要）</span></li></ol>

<p id="t-2eQyJXlpITidbk5e9iXkC7"><span style="background-color:transparent">配置完成后，Agent Chat UI 将自动获取并显示来自您智能体的任何中断线程。</span></p>


<a id="section-0857"></a>
## 部署 (Deployment)

<a id="t-block-17492"></a>

<p id="t-pgirFU9Uexgui01zIkJpSq"><span style="background-color:transparent">当你准备好将你的 LangChain 智能体部署到生产环境时，LangSmith 提供了一个专为智能体工作负载设计的托管平台。传统的托管平台是为无状态、短生命周期的 Web 应用程序构建的，而 LangGraph 则是</span><span style="font-weight:bold;background-color:transparent">专为需要持久状态和后台执行的有状态、长时间运行的智能体</span><span style="background-color:transparent">而构建的。LangSmith 负责处理基础设施、扩展和运维问题，因此你可以直接从你的代码仓库进行部署。</span></p>


<a id="section-0858"></a>
## 前提条件

<a id="t-T8zXzZgo7On5trZp1up0hj"></a>

<p id="t-MHZIxdimBLfWBbQ7lPV2UW"><span style="background-color:transparent">开始之前，请确保你具备以下条件：</span></p>

<ul><li id="t-yZjBHIFNsHbiIVgC4SQKIu"><span>一个</span><span style="border-bottom:1px solid;font-weight:bold">GitHub 账户</span></li></ul>

<ul><li id="t-RmEfB26FQdrClET6X9cGuO"><span>一个</span><span style="border-bottom:1px solid;font-weight:bold">LangSmith 账户</span><span>（免费注册）</span></li></ul>


<a id="section-0860"></a>
## 在 GitHub 上创建仓库

<a id="t-fQZZY0eD3FbxaVkkxFR8hq"></a>

<p id="t-efv3iiGyMbV8KCn0HzFiiF"><span style="background-color:transparent">你的应用程序代码必须存放在 GitHub 仓库中，才能在 LangSmith 上部署。支持公共和私有仓库。对于本快速入门，请首先按照</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">本地服务器设置指南</span><span style="background-color:transparent">确保你的应用程序与 LangGraph 兼容。然后，将你的代码推送到仓库。</span></p>


<a id="section-0861"></a>
## 部署到 LangSmith

<a id="t-gphn3llpfxmmPX2h8icD2t"></a>

<div id="t-L1fSAiGrl6ldAqxadWlQPe"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/d9a823590b18556f54037857.png"/></div>


<a id="section-0862"></a>
## 在 Studio 中测试您的应用程序

<a id="t-NA5KKjlIer3vUoIHLn8cIH"></a>

<p id="t-HbFkAcPNmx2Wn8JAfhcIPx"><span style="background-color:transparent">一旦您的应用程序部署完成：</span></p>

<ol start="1"><li id="t-PWQe7KumQRp30YSi3z4Cbh"><span>选择您刚刚创建的部署以查看更多详情。</span></li></ol>

<ol start="2"><li id="t-E0BfJGbw4SmGNsK9NwvqXh"><span>点击右上角的</span><span style="font-weight:bold">Studio</span><span>按钮。Studio 将打开并显示您的图。</span></li></ol>


<a id="section-0863"></a>
## 获取部署的 API URL

<a id="t-NAcGttI2K3XKUDxS9TEk1l"></a>

<ol start="1"><li id="t-EpQIzubfFvSkWuBMUJybRS"><span>在 LangGraph 的</span><span style="font-weight:bold">Deployment details</span><span>视图中，点击</span><span style="font-weight:bold">API URL</span><span>将其复制到剪贴板。</span></li></ol>

<ol start="2"><li id="t-MSGlOzZHhMkVIyw5VOVqTn"><span>点击</span><span>URL</span><span>将其复制到剪贴板。</span></li></ol>


<a id="section-0864"></a>
## 测试 API

<a id="t-nxfxYprXcOYbRDQcCaZCZx"></a>

<p id="t-qId17kjNWqFkq1Nbgi0rAe"><span style="background-color:transparent">您现在可以测试 API：</span></p>

<ol start="1"><li id="t-hhlnIkW8Hs4i46xxKojMAI"><span>安装 LangGraph Python：</span></li></ol>

<pre id="t-wtMv1LAd5lkvlBj47YyQMb"><code>pip install langgraph-sdk</code></pre>

<ol start="2"><li id="t-ZpwuMhVfaJLxPf7YrnZWU1"><span>向代理发送消息：</span></li></ol>

<pre id="t-8SdGZXJIB5QTvBBLDqNjWE"><code>from langgraph_sdk import get_sync_client # or get_client for async

client = get_sync_client(url="your-deployment-url", api_key="your-langsmith-api-key")

for chunk in client.runs.stream(
None, # Threadless run
"agent", # Name of agent. Defined in langgraph.json.
input={
"messages": [{
"role": "human",
"content": "What is LangGraph?",
}],
},
stream_mode="updates",
):
print(f"Receiving new event of type: {chunk.event}...")
print(chunk.data)
print("\n\n")</code></pre>


<a id="section-0865"></a>
## 可观测性 (Observability)

<a id="t-block-17518"></a>

<p id="t-fSCQrzOoz08aQXGNGtCuyK"><span style="background-color:transparent">在使用 LangChain 构建和运行智能体（agent）时，你需要了解其行为细节：它调用了哪些</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">工具</span><span style="background-color:transparent">、生成了什么提示（prompt）以及如何做出决策。使用 </span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">create_agent</span><span style="background-color:transparent"> 构建的 LangChain 智能体自动支持通过 </span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">LangSmith</span><span style="background-color:transparent"> 进行追踪。LangSmith 是一个用于捕获、调试、评估和监控 LLM 应用行为的平台。</span></p>

<p id="t-rw9EVrbS3mpOzu7l9C1r77"><span style="border-bottom:1px solid;font-style:italic;font-weight:bold;background-color:transparent">追踪记录</span><span style="background-color:transparent"> 会记录智能体执行的每一步，从初始用户输入到最终响应，包括所有工具调用、模型交互和决策点。这些执行数据有助于你调试问题、评估不同输入下的性能，并监控生产环境中的使用模式。</span></p>

<p id="t-9pDWHJ8pZLmN1GLPGBQhGN"><span style="background-color:transparent">本指南将向你展示如何为 LangChain 智能体启用追踪，并使用 LangSmith 分析其执行过程。</span></p>


<a id="section-0866"></a>
## 先决条件

<a id="t-BZWlobC8Qz38fQefgu7GQ3"></a>

<p id="t-7lF4TCu9qAq5QbgJC2MK1E"><span style="background-color:transparent">开始之前，请确保满足以下条件：</span></p>

<ul><li id="t-S5x6F3k22d71xtphUzbcVb"><span style="font-weight:bold">LangSmith 账户</span><span>：在</span><span style="border-bottom:1px solid;font-weight:bold">smith.langchain.com</span><span>注册（免费）或登录。</span></li></ul>

<ul><li id="t-qJj3rUotXA1Y49apNBRnFF"><span style="font-weight:bold">LangSmith API 密钥</span><span>：请遵循</span><span style="border-bottom:1px solid;font-weight:bold">创建 API 密钥</span><span>指南。</span></li></ul>


<a id="section-0867"></a>
## 启用追踪

<a id="t-N7lRPQcNmZ0kd23kBZs6nv"></a>

<p id="t-3nGXu30WpjQC2Llz6P0hzv"><span style="background-color:transparent">所有 LangChain 智能体都自动支持 LangSmith 追踪。要启用它，请设置以下环境变量：</span></p>

<pre id="t-rAtC8xmB1hknsJWq38TIu2"><code>export LANGSMITH_TRACING=true
export LANGSMITH_API_KEY=&lt;your-api-key&gt;</code></pre>


<a id="section-0868"></a>
## 快速开始

<a id="t-pKCsc3biMryd4sdI9bybdq"></a>

<p id="t-qatARakqpDQXcT6wXF2wwU"><span style="background-color:transparent">无需额外代码即可将追踪记录到 LangSmith。只需像往常一样运行你的智能体代码：</span></p>

<pre id="t-qAjAR4Le2lf8tFWWBnZBVb"><code>from langchain.agents import create_agent

def send_email(to: str, subject: str, body: str):
"""Send an email to a recipient."""
# ... email sending logic
return f"Email sent to {to}"

def search_web(query: str):
"""Search the web for information."""
# ... web search logic
return f"Search results for: {query}"

agent = create_agent(
model="gpt-4o",
tools=[send_email, search_web],
system_prompt="You are a helpful assistant that can send emails and search the web."
)

# Run the agent - all steps will be traced automatically
response = agent.invoke({
"messages": [{"role": "user", "content": "Search for the latest AI news and email a summary to john@example.com"}]
})</code></pre>

<p id="t-k05aIaMFkSlISg5uRZA7jz"><span style="background-color:transparent">默认情况下，追踪记录将记录到名为 </span><span style="background-color:transparent">default</span><span style="background-color:transparent"> 的项目中。</span></p>


<a id="section-0869"></a>
## 选择性追踪

<a id="t-iTs7V0PowdtelIYNitzuQQ"></a>

<p id="t-TKXOnDgoMbKraP8jTu47SF"><span style="background-color:transparent">您可以使用 LangSmith 的</span><span style="background-color:transparent">tracing_context</span><span style="background-color:transparent">上下文管理器选择性地追踪特定调用或应用程序的某些部分：</span></p>

<pre id="t-jEAX89AgcQZ3PiBJLymae2"><code>import langsmith as ls

# 这将被追踪
with ls.tracing_context(enabled=True):
agent.invoke({"messages": [{"role": "user", "content": "Send a test email to alice@example.com"}]})

# 这将不会被追踪（如果未设置 LANGSMITH_TRACING 环境变量）
agent.invoke({"messages": [{"role": "user", "content": "Send another email"}]})</code></pre>


<a id="section-0870"></a>
## 记录到项目

<a id="t-ZK05eorb3zGBr8DsDP051o"></a>

<p id="t-nCFRUjRW0HXqgA2KTnATfL"><span style="font-weight:bold">静态设置</span></p>

<p id="t-SnsDxz7ItCcyhnidsrsHjF"><span>您可以通过设置</span><span>LANGSMITH_PROJECT</span><span>环境变量为整个应用程序设置自定义项目名称：</span></p>

<pre id="t-YUISPUuB03hTT3eA67h0wq"><code>export LANGSMITH_PROJECT=my-agent-project</code></pre>

<p id="t-gjmI4GOg6KM575rH7sMf6k"><span style="font-weight:bold">动态设置</span></p>

<p id="t-QCCDd4ZdkBQc2nTnIZ6iXk"><span>您可以通过编程方式为特定操作设置项目名称：</span></p>

<pre id="t-L7EMTbum0hVRVS9E2sZDkY"><code>import langsmith as ls

with ls.tracing_context(project_name="email-agent-test", enabled=True):
response = agent.invoke({
"messages": [{"role": "user", "content": "Send a welcome email"}]
})</code></pre>


<a id="section-0871"></a>
## 向追踪添加元数据

<a id="t-udgCVHpqVzqgz059DXSmwX"></a>

<p id="t-dgepIlwtZwXn4TPqoEzLup"><span style="background-color:transparent">您可以使用自定义元数据和标签来注释您的追踪：</span></p>

<pre id="t-FzlVt2rs2V5keQa5zPIKsO"><code>response = agent.invoke(
{"messages": [{"role": "user", "content": "Send a welcome email"}]},
config={
"tags": ["production", "email-assistant", "v1.0"],
"metadata": {
"user_id": "user_123",
"session_id": "session_456",
"environment": "production"
}
}
)</code></pre>

<p id="t-ZdWNR5o17LzR6KcZQPFWLm"><span style="background-color:transparent">tracing_context</span><span style="background-color:transparent">也接受标签和元数据，以便进行细粒度控制：</span></p>

<pre id="t-fg4TnPci4IRlD288C5WMqV"><code>with ls.tracing_context(
project_name="email-agent-test",
enabled=True,
tags=["production", "email-assistant", "v1.0"],
metadata={"user_id": "user_123", "session_id": "session_456", "environment": "production"}):
response = agent.invoke(
{"messages": [{"role": "user", "content": "Send a welcome email"}]}
)</code></pre>

<p id="t-boswDSOk74utBK03gM0Lmf"><span style="background-color:transparent">这些自定义元数据和标签将被附加到 LangSmith 中的追踪记录上。</span></p>


<a id="section-1929"></a>
## LangChain 制作智能体

<a id="t-block-23949"></a>

<p id="t-AcInyqLdvmQHwxHQn8Ynov"><span style="border-bottom:1px solid">LangChain 是一个用于构建 LLM 应用的框架，可以把模型调用升级为可组合、可控制、可扩展的应用系统。</span></p>

<p id="t-dqociCfPK0DPe05ViloxKx"><span style="border-bottom:1px solid">LangChain 解决的不是怎么调模型，而是：</span></p>

<ul><li id="t-71uOUdyvOEnnuys72RMltD"><span>多步骤推理如何组织</span></li></ul>

<ul><li id="t-T26gXwmmIZC9tAaLEEGicW"><span>外部数据如何接入</span></li></ul>

<ul><li id="t-2w25CmVChFYEAgdlAsGmQd"><span>工具如何被模型安全调用</span></li></ul>

<ul><li id="t-4JDi9lQKeGaLJOvAbuOVno"><span>上下文如何被长期管理</span></li></ul>

<blockquote id="t-ZSLnAteHLOi3CnSGybgkug"><p id="t-fvaDM6UOKjdgEnzTae7C7t"><span style="border-bottom:1px solid;font-style:italic">开源地址：</span><span style="border-bottom:1px solid;font-style:italic;font-weight:bold">https://github.com/langchain-ai/langchain</span><span style="border-bottom:1px solid;font-style:italic">。</span></p>
<p id="t-4qvx8JpzasB1N2UkNj2Zvm"><span style="border-bottom:1px solid;font-style:italic">LangChain 教程：</span><span style="border-bottom:1px solid;font-style:italic">https://www.runoob.com/langchain/langchain-tutorial.html</span></p></blockquote>

<div id="t-RSKS3RN9oU4uLzgbBO6XAz"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/d784b321ede9d221513d16b4.webp"/></div>

<blockquote id="t-6KnlRYkVddEnhOuE3dG6pW"><p id="t-RKmfmafzYUObzhODUhyq7A"><span style="border-bottom:1px solid;font-style:italic">想象一下，你正在建造一个智能机器人助手，这个助手需要能够理解你的问题、从各种资料中查找信息、进行逻辑推理，最后用自然语言回答你。单独使用像 GPT 这样的语言模型，就像只给机器人装了一个聪明的大脑，但它还缺少手和眼睛——它不知道如何获取外部数据、如何执行具体任务。</span></p></blockquote>

<p id="t-KWdr4yh13AuT68ldaGEelX"><span style="border-bottom:1px solid;font-weight:bold">LangChain</span><span style="border-bottom:1px solid">就是这样一个框架，它充当了连接器和协调者的角色。</span></p>

<p id="t-vqNtjO1PT2u0S4oRkyh1Uz"><span style="border-bottom:1px solid;font-weight:bold">LangChain</span><span style="border-bottom:1px solid">将强大的语言模型（如 GPT-4、DeepSeek）与外部数据源、计算工具以及记忆系统巧妙地连接起来，构建出功能强大、可实际应用的 AI 应用程序。</span></p>

<p id="t-8jwA5Vp1bSY9Qolo97ZjuZ"><span style="border-bottom:1px solid">简单来说，LangChain 的核心价值在于：</span><span style="border-bottom:1px solid;font-weight:bold">让语言模型变得有用</span><span style="border-bottom:1px solid">，解决了大语言模型（LLM）的几个关键限制：</span></p>

<ol start="1"><li id="t-uFvDwWFOEERY59eJfb8DKg"><span style="border-bottom:1px solid;font-weight:bold">知识实时性</span><span>：LLM 的训练数据有截止日期，无法获取最新信息。</span></li></ol>

<ol start="2"><li id="t-fwYV6wlt76V6YvHq9YgWHD"><span style="border-bottom:1px solid;font-weight:bold">领域专精性</span><span>：通用 LLM 缺乏特定行业或公司的私有知识。</span></li></ol>

<ol start="3"><li id="t-nht8jSpAL0yEz7DzHs6A61"><span style="border-bottom:1px solid;font-weight:bold">可操作性</span><span>：LLM 本身无法执行如计算、查询数据库、调用 API 等动作。</span></li></ol>

<ol start="4"><li id="t-yQ5BDCb5KJJikOjCxG94WV"><span style="border-bottom:1px solid;font-weight:bold">对话连贯性</span><span>：在多轮对话中，LLM 需要记住之前的聊天历史。</span></li></ol>

<p id="t-OTlSK0UvwxQ9aitsf7sW5T"><span style="border-bottom:1px solid">LangChain 通过一系列标准化的链（Chains）和组件（Components）来组织这些功能，让开发者能够像搭积木一样，快速构建复杂的 AI 应用。</span></p>

<div id="t-T4W0L8286evokD2Nd87ECm"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/4d9d26628b6c04b36972f73b.png"/></div>

<p id="t-5JtPXBSae8mowlFvFwU2Af"><span style="border-bottom:1px solid">LangChain 模块总览：</span></p>

<ul><li id="t-OYrui6N7AH9rW7OdxVqE8v"><span style="border-bottom:1px solid;font-weight:bold">LLMs / ChatModels</span><span>：模型接口</span></li></ul>

<ul><li id="t-Z1nuQ4Pg7A0BKZfYKiBUVf"><span style="border-bottom:1px solid;font-weight:bold">Prompt Templates</span><span>：Prompt 结构化</span></li></ul>

<ul><li id="t-e23N4Ky90ZG47GkO3hASm2"><span style="border-bottom:1px solid;font-weight:bold">Chains</span><span>：流程编排</span></li></ul>

<ul><li id="t-ttzgyThopGmrxHWk6W1XgM"><span style="border-bottom:1px solid;font-weight:bold">Memory</span><span>：上下文管理</span></li></ul>

<ul><li id="t-D2E1FYDEuPow8sJRLaG1fF"><span style="border-bottom:1px solid;font-weight:bold">Retrievers / VectorStores</span><span>：知识检索</span></li></ul>

<ul><li id="t-M32YWL3j64Q9UH0bcFBiTf"><span style="border-bottom:1px solid;font-weight:bold">Agents &amp; Tools</span><span>：自动决策与执行</span></li></ul>


<a id="section-1930"></a>
## 环境准备

<a id="t-7GC19Phv5dlscmuwLnHN9u"></a>

<p id="t-b9cnndpR9Ux2ZkSnrF4zsn"><span style="border-bottom:1px solid">使用国内镜像安装：</span></p>

<pre id="t-9pkQY9R4S3LU3WncBXJ5Wu"><code>pip install langchain langchain-openai langchain-community python-dotenv -i https://mirrors.aliyun.com/pypi/simple/</code></pre>

<p id="t-TLel0dNGyW3gOjhm2yI9XF"><span style="border-bottom:1px solid">如果你使用 OpenAI 的话，可以配置环境变量：</span></p>

<pre id="t-rxFqV0kUj4DeS2NhEsgRhG"><code>export OPENAI_API_KEY=你的key</code></pre>

<p id="t-9XwDUZ0M93orDT0JyDhYRM"><span style="border-bottom:1px solid">然后使用以下代码测试：</span></p>


<a id="section-1931"></a>
## 实例

<a id="t-DUMb8rdGpOkqNHTcwwNnkh"></a>

<pre id="t-2Nw5FRUubGBaLcEVfMPwmz"><code>from langchain_openai import ChatOpenAI


llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)


resp = llm.invoke("用一句话解释什么是 LangChain")
print(resp.content)</code></pre>

<p id="t-dpuuEvdQt8cK5JkVMhwnyo"><span style="border-bottom:1px solid">国内我们可以采用 DeepSeek 大模型来测试，如果还没有需要先去</span><span style="border-bottom:1px solid">https://platform.deepseek.com/api_keys</span><span style="border-bottom:1px solid">创建一个 API key。</span></p>

<p id="t-OAgsfaxpGGxdEPUFrjj4BE"><span style="border-bottom:1px solid">DeepSeek 的 API 文档参考：</span><span style="border-bottom:1px solid">https://api-docs.deepseek.com/zh-cn/</span><span style="border-bottom:1px solid">。</span></p>

<p id="t-WgUrJoiHfujittAtSv4Sga"><span style="border-bottom:1px solid">如果你需要统一管理多个第三方模型，可以选择安装 LiteLLM 作为模型网关：</span></p>

<pre id="t-89Cbmsozfkaby9C8xIJQSb"><code>pip install -U litellm</code></pre>

<p id="t-LA3UL26JaJqzxhzeqfAELg"><span style="border-bottom:1px solid">不过本文的示例直接使用</span><span style="border-bottom:1px solid">ChatOpenAI</span><span style="border-bottom:1px solid">配合</span><span style="border-bottom:1px solid">openai_api_base</span><span style="border-bottom:1px solid">参数连接 DeepSeek，无需额外安装 LiteLLM。</span></p>


<a id="section-1932"></a>
## 实例

<a id="t-e5OB5zn50TAstE1uBv2oaO"></a>

<pre id="t-JY89uDOLHSSHN8bn1vhTmR"><code>import os
from langchain_openai import ChatOpenAI

# 建议将 API Key 放在环境变量中，或者直接在此处赋值（生产环境请勿硬编码）
# os.environ["DEEPSEEK_API_KEY"] = "sk-你的DeepSeek密钥"

# 初始化模型
llm = ChatOpenAI(
    model="deepseek-v4-pro", # DeepSeek V4 模型名称
    openai_api_key="sk-你的Key", # 填入你的 DeepSeek API Key
    openai_api_base="https://api.deepseek.com", # DeepSeek 的 API 地址
    temperature=0.7,
    max_tokens=1024
)

# 测试一下
response = llm.invoke("你好，DeepSeek！请做一个简短的自我介绍。")
print(response.content)</code></pre>

<p id="t-8sKjIQFWvDHnm62DQXh71G"><span style="border-bottom:1px solid">执行以上代码，就会输出内容：</span></p>

<pre id="t-TawJvpuyNKp9dXushLcQVe"><code>你好！很高兴认识你！

我是DeepSeek，由深度求索公司创造的AI助手。我的特点包括：
。。。</code></pre>


<a id="section-1933"></a>
## 构建 LCEL 链 (LangChain Expression Language)

<a id="t-Jip7qCsdI5gFuX7lQNbPQ4"></a>

<p id="t-eUCzn8CkSlGL918cJwNu3m"><span style="border-bottom:1px solid">单纯调用模型不够强大，我们需要构建一个标准的处理流程：</span></p>

<pre id="t-KoEx5NM6bVE57jbe4W3ZwJ"><code>Prompt -&gt; LLM -&gt; OutputParser</code></pre>

<div id="t-hi3Y4ZdfOfICCSFN91t4hj"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/34fa5d5f1a706428013382dd.png"/></div>

<p id="t-rqezad37nOOipPeoEzDvOj"><span style="border-bottom:1px solid">完整代码如下：</span></p>


<a id="section-1934"></a>
## 实例

<a id="t-Bju5mhDKzERA2nR25ZDBoT"></a>

<pre id="t-vD62jLgXRLvqmvyZ9hAHOB"><code>from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_openai import ChatOpenAI

# 1. 定义模型 (Model)
llm = ChatOpenAI(
    model="deepseek-v4-pro",
    openai_api_key="你的_DEEPSEEK_API_KEY",
    openai_api_base="https://api.deepseek.com"
)

# 2. 定义提示词模板 (Prompt)
# system: 设定 AI 的角色
# user: 用户的具体输入
prompt = ChatPromptTemplate.from_messages([
 ("system", "你是一个资深的技术专家，擅长用通俗易懂的'大白话'解释复杂的科技概念。你的解释应该包含一个生动的比喻。"),
 ("user", "{concept}")
])

# 3. 定义输出解析器 (Output Parser)
# 将模型的 Message 对象直接转为纯字符串
parser = StrOutputParser()

# 4. 构建链 (Chain) - 使用管道符 | 连接
# 流程：输入字典 -&gt; 填充 Prompt -&gt; 发给 LLM -&gt; 解析输出
chain = prompt | llm | parser

# 5. 调用链
concept_to_explain = "量子纠缠"
print(f"正在解释概念：{concept_to_explain}...\n")

result = chain.invoke({"concept": concept_to_explain})

print("--- DeepSeek 回答 ---")
print(result)</code></pre>


<a id="section-1935"></a>
## 流式输出 (Streaming)

<a id="t-eyhyz5UzVRGwo6lkEqtu64"></a>

<p id="t-xCDi5maj77saBJOoBak3x6"><span style="border-bottom:1px solid">在实际应用（如聊天机器人）中，我们需要像 ChatGPT 那样一个字一个字地吐出文字，而不是等生成完了才一次性显示。</span></p>

<p id="t-iDGMuRqJf8UmBHI9UXjGVO"><span style="border-bottom:1px solid">LangChain 对此支持非常简单，使用</span><span style="border-bottom:1px solid;font-weight:bold">.stream()</span><span style="border-bottom:1px solid">替代</span><span style="border-bottom:1px solid;font-weight:bold">.invoke()</span><span style="border-bottom:1px solid">：</span></p>


<a id="section-1936"></a>
## 实例

<a id="t-boPUgkc6kExKPoUraU2VRK"></a>

<pre id="t-UWxEbpnKXARHyaYgW2JJqB"><code>from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_openai import ChatOpenAI

# 1. 定义模型 (Model)
llm = ChatOpenAI(
    model="deepseek-v4-pro",
    openai_api_key="你的_DEEPSEEK_API_KEY",
    openai_api_base="https://api.deepseek.com"
)

# 2. 定义提示词模板 (Prompt)
# system: 设定 AI 的角色
# user: 用户的具体输入
prompt = ChatPromptTemplate.from_messages([
 ("system", "你是一个资深的技术专家，擅长用通俗易懂的'大白话'解释复杂的科技概念。你的解释应该包含一个生动的比喻。"),
 ("user", "{concept}")
])

# 3. 定义输出解析器 (Output Parser)
# 将模型的 Message 对象直接转为纯字符串
parser = StrOutputParser()

# 4. 构建链 (Chain) - 使用管道符 | 连接
# 流程：输入字典 -&gt; 填充 Prompt -&gt; 发给 LLM -&gt; 解析输出
chain = prompt | llm | parser

# 5. 调用链
concept_to_explain = "量子纠缠"
print(f"正在解释概念：{concept_to_explain} (流式输出)...\n")

# 这里的 chunk 是每次生成的片段
for chunk in chain.stream({"concept": "递归神经网络"}):
 print(chunk, end="", flush=True)</code></pre>


<a id="section-1937"></a>
## 代码结构

<a id="t-agoF76VRkAuHe6WM8DPjbH"></a>

<a id="t-khPtki5mk2vyWz0kWrunvM"></a>

##### Prompt

<ul><li id="t-n5pQpkDJR1dm8jipYwLHVV"><span style="border-bottom:1px solid">ChatPromptTemplate</span><span>明确区分</span><span style="border-bottom:1px solid">system / user</span></li></ul>

<ul><li id="t-Marcfq40Xft3VMa6NzX11x"><span>Prompt 是</span><span style="border-bottom:1px solid;font-weight:bold">结构化输入函数</span><span>，不是字符串</span></li></ul>

<a id="t-G1wDflTNuPt4p0lZlLuobq"></a>

##### LLM

<ul><li id="t-apq7eg9esxiwYlx2frVydV"><span style="border-bottom:1px solid">ChatOpenAI</span><span>只是统一接口</span></li></ul>

<ul><li id="t-eC8IRAGauAjCWZZKLaBVH9"><span>LangChain 不增强模型能力，只增强</span><span style="border-bottom:1px solid;font-weight:bold">可控性</span></li></ul>

<a id="t-eUGwgFMHcjUcanpSu500p9"></a>

##### OutputParser

<ul><li id="t-WM8GFEixtPkImnYpb0n6M9"><span>模型输出永远是</span><span style="border-bottom:1px solid">Message</span></li></ul>

<ul><li id="t-WuTzL76HwRtrSZ8qMn0OlW"><span style="border-bottom:1px solid">StrOutputParser</span><span>是</span><span style="border-bottom:1px solid;font-weight:bold">显式类型转换</span></li></ul>

<ul><li id="t-JaYqoMj2ThBEnjYJvTM88U"><span>没有 Parser，工程不可控</span></li></ul>


<a id="section-1939"></a>
## 模型 (Models)

<a id="t-Bls9HcYpxgIHUW6NsmkT9c"></a>

<p id="t-4vr1euSUBEnCCl7DfJ2ksC"><span style="border-bottom:1px solid">LangChain 提供了统一的抽象接口，现在主要推荐使用</span><span style="border-bottom:1px solid;font-weight:bold">Chat Models</span><span style="border-bottom:1px solid">，因为目前的模型（如 DeepSeek, GPT-4）大多针对对话进行了优化。</span></p>

<ul><li id="t-TWyunSCDHGmGaTDZ0Q1HFa"><span style="border-bottom:1px solid;font-weight:bold">Chat Models</span><span>: 输入和输出是结构化的消息。</span></li></ul>

<ul><li id="t-yaVRrfTaPNOu11hhpx8suI"><span style="border-bottom:1px solid">SystemMessage</span><span>: 设定 AI 角色。</span></li></ul>

<ul><li id="t-yFNCttQxd2td9ZkpHqJtd5"><span style="border-bottom:1px solid">HumanMessage</span><span>: 用户发送的消息。</span></li></ul>

<ul><li id="t-9UnR8kYqbMieDig4nA9GEA"><span style="border-bottom:1px solid">AIMessage</span><span>: AI 返回的消息。</span></li></ul>


<a id="section-1940"></a>
## 提示词 (Prompts)

<a id="t-68LDXxIuuE8xv2HwBDrvWf"></a>

<p id="t-riO7ZBxgFEs1LYKRebPV11"><span style="border-bottom:1px solid">新版本中，推荐使用</span><span style="border-bottom:1px solid">ChatPromptTemplate</span><span style="border-bottom:1px solid">来构建对话式提示词，它更符合当前主流 LLM 的调用习惯。</span></p>

<pre id="t-PYYKBqlptVnBwLMrJCvwCL"><code>from langchain_core.prompts import ChatPromptTemplate

# 使用 from_messages 构建结构化模板
prompt_template = ChatPromptTemplate.from_messages([
    ("system", "你是一位专业的{role}。"),
    ("user", "{content}")
])

# 动态填充变量
prompt = prompt_template.invoke({"role": "美食评论家", "content": "评价一下这碗炸酱面"})
# 输出：包含 SystemMessage 和 HumanMessage 的列表</code></pre>


<a id="section-1941"></a>
## 链 (Chains) &amp; LCEL

<a id="t-jDnhn1jzAHCssmvFbqBiQF"></a>

<p id="t-kLLcJfVxFs9zuPpUqblfsM"><span style="border-bottom:1px solid;font-weight:bold">重要更新：</span><span style="border-bottom:1px solid">LLMChain</span><span style="border-bottom:1px solid">已被弃用。现在使用</span><span style="border-bottom:1px solid;font-weight:bold">LCEL (管道符</span><span style="border-bottom:1px solid;font-weight:bold">|</span><span style="border-bottom:1px solid;font-weight:bold">)</span><span style="border-bottom:1px solid">语法。这种方式更灵活、支持异步和流式输出。</span></p>

<pre id="t-0cqNPXdUawTxvs0v2sGX7V"><code># 现代写法：Prompt | Model | OutputParser
from langchain_core.output_parsers import StrOutputParser

# 这里的 llm 是 ChatOpenAI(model="deepseek-v4-pro") 的实例
chain = prompt_template | llm | StrOutputParser()

# 调用链
result = chain.invoke({"role": "导游", "content": "介绍一下故宫"})
print(result) # 直接输出字符串</code></pre>


<a id="section-1942"></a>
## 索引与检索 (Indexes &amp; Retrieval)

<a id="t-HQDHAyAxDT3MqblGBSWU0A"></a>

<p id="t-Xv4mSiK4hkcxHpIN8pvJbF"><span style="border-bottom:1px solid">这是</span><span style="border-bottom:1px solid;font-weight:bold">RAG (检索增强生成)</span><span style="border-bottom:1px solid">的核心。新版本强调了将文档转化为"检索器"的过程。</span></p>

<ul><li id="t-B2xG9hpkayS5Jd7vCRHuzy"><span style="border-bottom:1px solid;font-weight:bold">流程</span><span>:</span><span style="border-bottom:1px solid">DocumentLoaders</span><span>(加载) -&gt;</span><span style="border-bottom:1px solid">TextSplitter</span><span>(切片) -&gt;</span><span style="border-bottom:1px solid">Embeddings</span><span>(向量化) -&gt;</span><span style="border-bottom:1px solid">VectorStore</span><span>(存储)。</span></li></ul>

<ul><li id="t-VxQaxL20ROc5cXCkOuTgtt"><span style="border-bottom:1px solid;font-weight:bold">Retriever</span><span>: 不再仅仅是数据库搜索，它是一个可以集成在链中的组件。</span></li></ul>

<pre id="t-Ab5WJtnfNX3LBKMMnB3yvy"><code># 将向量库转为检索器
retriever = vectorstore.as_retriever()
# 在新版链中引用
# chain = {"context": retriever, "question": RunnablePassthrough()} | prompt | llm</code></pre>

<p id="t-i49vXhMBfWpnwJ7P78euCd"><span style="border-bottom:1px solid;font-weight:bold">完整 RAG 实战示例</span></p>

<p id="t-6oD83rKm3RAvEt4zVAxOj9"><span style="border-bottom:1px solid">下面我们来实现一个完整的 RAG 应用。首先需要安装额外依赖：</span></p>

<pre id="t-qc9qTIIq5MA6aSL2D9KOmf"><code>pip install langchain-community faiss-cpu sentence-transformers -i https://mirrors.aliyun.com/pypi/simple/</code></pre>


<a id="section-1943"></a>
## 实例

<a id="t-rtYnLLIOBjAUnjd1dfMryK"></a>

<pre id="t-r7DkvSsvDfUD7IxRFVJ7ju"><code>import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from langchain_community.vectorstores import FAISS
from langchain.text_splitter import RecursiveCharacterTextSplitter

# 加载环境变量
load_dotenv()

# 初始化模型和 Embedding
llm = ChatOpenAI(
    model=os.getenv('DEEPSEEK_MODEL', 'deepseek-v4-pro'),
    openai_api_key=os.getenv('DEEPSEEK_API_KEY'),
    openai_api_base=os.getenv('DEEPSEEK_BASE_URL', 'https://api.deepseek.com'),
)

# 使用免费的本地 Embedding 模型（首次运行会自动下载）
embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

# --- 1. 准备知识文档 ---
# 实际项目中，这些文档可以从文件、网页、数据库等加载
documents = [
 "LangChain 是一个用于构建大语言模型应用的开源框架，由 Harrison Chase 于 2022 年创建。",
 "LangChain 的核心组件包括：模型接口、提示词模板、链、记忆、检索和代理。",
 "LCEL（LangChain Expression Language）是 LangChain 的新一代链构建语法，使用管道符 | 连接各组件。",
 "RAG（检索增强生成）通过在生成前检索相关文档，让 LLM 能回答训练数据之外的问题。",
 "LangGraph 是 LangChain 团队推出的新框架，专门用于构建复杂的多步骤 AI 代理工作流。",
 "LangSmith 是 LangChain 的可观测性平台，用于调试、测试和监控 LLM 应用。",
]

# --- 2. 文本切片 ---
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=100,
    chunk_overlap=20
)
# 这里文档已经较短，实际场景中长文档会被切成多个片段
texts = text_splitter.create_documents(documents)

# --- 3. 向量化并存入 FAISS ---
vectorstore = FAISS.from_documents(texts, embeddings)

# --- 4. 创建检索器 ---
retriever = vectorstore.as_retriever(search_kwargs={"k": 2})

# --- 5. 构建 RAG 链 ---
rag_prompt = ChatPromptTemplate.from_messages([
 ("system", "你是一个知识助手。根据以下检索到的上下文来回答问题。如果上下文中没有答案，就说你不知道。\n\n上下文：{context}"),
 ("human", "{question}")
])

# 辅助函数：将检索到的文档拼接为字符串
def format_docs(docs):
 return "\n".join(doc.page_content for doc in docs)

rag_chain = (
 {"context": retriever | format_docs, "question": RunnablePassthrough()}
 | rag_prompt
 | llm
 | StrOutputParser()
)

# --- 6. 测试 RAG ---
question = "LangChain 的核心组件有哪些？"
print(f"问题：{question}")
print(f"回答：{rag_chain.invoke(question)}")</code></pre>

<p id="t-tqzItitjWd3kMgcM0kXOZa"><span style="border-bottom:1px solid;font-weight:bold">RAG 技术要点说明：</span></p>

<ul><li id="t-8roSUi2QvibKRp3aFYDqS2"><span style="border-bottom:1px solid;font-weight:bold">FAISS</span><span>是 Facebook 开源的向量相似度搜索库，适合本地开发测试，数据存储在内存中</span></li></ul>

<ul><li id="t-ouzGiRful0lCQQQIvqAj9g"><span style="border-bottom:1px solid;font-weight:bold">生产环境</span><span>建议使用 Pinecone、Milvus、Chroma、Weaviate 等专业向量数据库，支持持久化和分布式</span></li></ul>

<ul><li id="t-JRlHO97MbBgVMkMbONXNhj"><span style="border-bottom:1px solid;font-weight:bold">Embedding 模型</span><span>：本示例使用 HuggingFace 的</span><span style="border-bottom:1px solid">all-MiniLM-L6-v2</span><span>模型，首次运行会自动下载（约 80MB）</span></li></ul>

<ul><li id="t-kwXScfoFyeOlfxwwQtTNSt"><span>如果你有 OpenAI API Key，也可以使用</span><span style="border-bottom:1px solid">OpenAIEmbeddings</span><span>获得更好的中文效果</span></li></ul>

<ul><li id="t-CEKnPQvi2UdFiwdgfvvUH1"><span>国内中文场景推荐使用</span><span style="border-bottom:1px solid">BAAI/bge-small-zh-v1.5</span><span>等中文 Embedding 模型</span></li></ul>

<ul><li id="t-SCDdTRcTw9R6jDJGJs32ck"><span style="border-bottom:1px solid;font-weight:bold">chunk_size</span><span>和</span><span style="border-bottom:1px solid;font-weight:bold">chunk_overlap</span><span>需要根据实际文档特点调优，过大可能丢失精度，过小可能丢失上下文</span></li></ul>


<a id="section-1944"></a>
## 记忆 (Memory)

<a id="t-noNGWAWw5EMTrt8MwXZ1fH"></a>

<p id="t-rdJz8FW35EKdU7FkpBe0Gj"><span style="border-bottom:1px solid;font-weight:bold">重要更新：</span><span style="border-bottom:1px solid">传统的</span><span style="border-bottom:1px solid">ConversationBufferMemory</span><span style="border-bottom:1px solid">在复杂的 LCEL 链中较难集成。最新推荐使用</span><span style="border-bottom:1px solid">ChatMessageHistory</span><span style="border-bottom:1px solid">配合</span><span style="border-bottom:1px solid">RunnableWithMessageHistory</span><span style="border-bottom:1px solid">。</span></p>

<ul><li id="t-8dUurwSKzhgLyXiJkwFHcY"><span style="border-bottom:1px solid;font-weight:bold">核心逻辑</span><span>: 记忆不再是链的一个属性，而是一个独立的消息存储库，通过</span><span style="border-bottom:1px solid">session_id</span><span>区分不同用户。</span></li></ul>

<ul><li id="t-9dpTxkTuIm0futqEZFdydV"><span style="border-bottom:1px solid;font-weight:bold">持久化</span><span>: 支持存入 Redis、PostgreSQL 或内存。</span></li></ul>


<a id="section-1945"></a>
## 代理 (Agents)

<a id="t-RfdHlNuLUeoayBFiB7xx6O"></a>

<p id="t-iHkNlGECVhT4qme7eFW4CB"><span style="border-bottom:1px solid">代理（Agent）是 LangChain 最强大的功能之一。与链（Chain）不同，代理可以根据用户输入</span><span style="border-bottom:1px solid;font-weight:bold">自主决策</span><span style="border-bottom:1px solid">调用哪些工具、以什么顺序执行，是真正的"智能体"。</span></p>

<p id="t-hGljLoCnVxae7ZxgDy6jQk"><span style="border-bottom:1px solid">Agent 的核心循环：接收任务 -&gt; 思考（选择工具）-&gt; 执行工具 -&gt; 观察结果 -&gt; 继续思考或给出最终答案。</span></p>

<div id="t-ek4i4Y6W4cz0q2qp3DTU9a"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/f9ffe52e3b3ed62a231b4f96.png"/></div>

<p id="t-6muPEupWM8PTtPuwuzqZmi"><span style="border-bottom:1px solid">使用</span><span style="border-bottom:1px solid">@tool</span><span style="border-bottom:1px solid">装饰器可以将任何 Python 函数转为 LLM 可调用的工具。LangChain 会自动将函数名和 docstring 传递给模型，让模型知道何时以及如何使用这个工具。</span></p>

<p id="t-ChDPi64Avb3LqX6Gx2MTjJ"><span style="border-bottom:1px solid">下面是一个完整的 Agent 实战示例，包含天气查询、数学计算和知识搜索三个工具：</span></p>


<a id="section-1946"></a>
## 实例

<a id="t-6jDbq9eJZgurpmXttI0aq5"></a>

<pre id="t-x7CMPxSM8KSJgnRmKEIKOY"><code>import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.tools import tool
from langchain.agents import AgentExecutor, create_tool_calling_agent

# 加载环境变量
load_dotenv()

# 初始化 DeepSeek 模型
llm = ChatOpenAI(
    model=os.getenv('DEEPSEEK_MODEL', 'deepseek-v4-pro'),
    openai_api_key=os.getenv('DEEPSEEK_API_KEY'),
    openai_api_base=os.getenv('DEEPSEEK_BASE_URL', 'https://api.deepseek.com'),
)

# --- 定义工具 ---
# 使用 @tool 装饰器，LangChain 会自动将函数名和 docstring 告知模型

@tool
def get_current_weather(city: str) -&gt; str:
 """获取指定城市的当前天气信息。当用户询问天气时使用此工具。"""
 # 实际应用中，这里会调用真实的天气 API
    weather_data = {
 "北京": "晴天，气温 28°C，湿度 45%",
 "上海": "多云，气温 25°C，湿度 70%",
 "深圳": "雷阵雨，气温 30°C，湿度 85%",
 }
 return weather_data.get(city, f"抱歉，暂无 {city} 的天气数据")

@tool
def calculate(expression: str) -&gt; str:
 """计算数学表达式。当用户需要进行数学计算时使用此工具。
    支持基本的四则运算，如 '2 + 3 * 4'。"""
 import ast
 import operator

 # 安全的运算符映射
    ops = {
        ast.Add: operator.add,
        ast.Sub: operator.sub,
        ast.Mult: operator.mul,
        ast.Div: operator.truediv,
        ast.Pow: operator.pow,
        ast.USub: operator.neg,
 }

 def safe_eval(node):
 if isinstance(node, ast.Expression):
 return safe_eval(node.body)
 elif isinstance(node, ast.Constant):
 return node.value
 elif isinstance(node, ast.BinOp):
            left = safe_eval(node.left)
            right = safe_eval(node.right)
 return ops[type(node.op)](left, right)
 elif isinstance(node, ast.UnaryOp):
            operand = safe_eval(node.operand)
 return ops[type(node.op)](operand)
 else:
 raise ValueError(f"不支持的表达式类型: {type(node)}")

 try:
        tree = ast.parse(expression, mode='eval')
        result = safe_eval(tree)
 return f"计算结果：{expression} = {result}"
 except Exception as e:
 return f"计算错误：{e}"

@tool
def search_knowledge(query: str) -&gt; str:
 """搜索知识库获取相关信息。当用户询问事实性问题时使用此工具。"""
 # 实际应用中，这里会连接向量数据库或搜索引擎
    knowledge = {
 "LangChain": "LangChain 是一个用于构建 LLM 应用的开源框架，支持链式调用、记忆管理和工具集成。",
 "Python": "Python 是一种高级编程语言，以简洁易读著称，广泛用于 AI、数据科学等领域。",
 }
 for key, value in knowledge.items():
 if key.lower() in query.lower():
 return value
 return f"未找到与 '{query}' 相关的信息"

# --- 组装工具列表 ---
tools = [get_current_weather, calculate, search_knowledge]

# --- 创建 Agent 的提示词 ---
prompt = ChatPromptTemplate.from_messages([
 ("system", "你是一个功能强大的 AI 助手，可以使用工具来帮助用户。根据用户的问题，判断是否需要使用工具，选择最合适的工具来获取信息。"),
 ("human", "{input}"),
    MessagesPlaceholder(variable_name="agent_scratchpad"),
])

# --- 创建 Agent ---
agent = create_tool_calling_agent(llm, tools, prompt)

# --- 创建 AgentExecutor（代理执行器）---
# verbose=True 可以看到 Agent 的完整思考过程
agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True)

# --- 测试 Agent ---
# 测试 1：天气查询
print("=" * 50)
response = agent_executor.invoke({"input": "北京今天天气怎么样？"})
print(f"\n最终回答: {response['output']}")

# 测试 2：数学计算
print("\n" + "=" * 50)
response = agent_executor.invoke({"input": "帮我算一下 (15 * 37 + 228) / 3 等于多少"})
print(f"\n最终回答: {response['output']}")

# 测试 3：综合问题（Agent 需要自己判断用哪个工具）
print("\n" + "=" * 50)
response = agent_executor.invoke({"input": "LangChain 是什么？另外帮我算下 2 的 10 次方"})
print(f"\n最终回答: {response['output']}")</code></pre>

<p id="t-rCrk2ixL6fCvfZW3QEBpLz"><span style="border-bottom:1px solid;font-weight:bold">运行上述代码，你会看到</span><span style="border-bottom:1px solid">（verbose=True 时的思考链输出）：</span></p>

<pre id="t-YBFXBBC5Cs2HeTbANVYTsV"><code>==================================================

&gt; Entering new AgentExecutor chain...
Invoking: `get_current_weather` with `{'city': '北京'}`

晴天，气温 28°C，湿度 45%

根据查询结果，北京今天的天气是晴天，气温 28°C，湿度 45%。

&gt; Finished chain.

最终回答: 北京今天天气晴朗，气温 28°C，湿度 45%，适合外出活动。

==================================================

&gt; Entering new AgentExecutor chain...
Invoking: `calculate` with `{'expression': '(15 * 37 + 228) / 3'}`

计算结果：(15 * 37 + 228) / 3 = 261.0

&gt; Finished chain.

最终回答: (15 * 37 + 228) / 3 的计算结果是 261.0

==================================================

&gt; Entering new AgentExecutor chain...
Invoking: `search_knowledge` with `{'query': 'LangChain'}`
Invoking: `calculate` with `{'expression': '2 ** 10'}`

LangChain 是一个用于构建 LLM 应用的开源框架...
计算结果：2 ** 10 = 1024

&gt; Finished chain.

最终回答: LangChain 是一个用于构建 LLM 应用的开源框架，支持链式调用、记忆管理和工具集成。另外，2 的 10 次方等于 1024。</code></pre>

<p id="t-owy5ELRwFlocM18j2hmI1E"><span style="border-bottom:1px solid;font-weight:bold">安全提示：</span><span style="border-bottom:1px solid">本示例使用安全的 AST 解析替代了 eval()。在实际项目中，切勿对用户输入直接使用 eval()，这会带来严重的远程代码执行风险。</span></p>

<p id="t-zWGknzOsekEbSzdgB0UZ2x"><span style="border-bottom:1px solid;font-weight:bold">理解 Agent 的"思考过程"：</span></p>

<ul><li id="t-IzK18wS3cMm7AjZfx2I2Ls"><span style="border-bottom:1px solid">verbose=True</span><span>让我们看到 Agent 的完整决策链路，便于调试和理解其行为</span></li></ul>

<ul><li id="t-1F4tESKoc4xNmrE9OsgVjp"><span>Agent 会自动判断需要调用什么工具，不需要人工指定调用顺序</span></li></ul>

<ul><li id="t-RVUMm4pgz9a7DEzfNgNIpI"><span>如果问题不需要工具（如简单的闲聊），Agent 会直接用自身知识回答</span></li></ul>

<ul><li id="t-LfCjUGakFdyRZTWIQa6OwW"><span>对于复杂问题，Agent 可能会多次调用工具，甚至并行调用多个工具</span></li></ul>


<a id="section-1947"></a>
## 快速开始：构建你的第一个 LangChain 应用

<a id="t-MyDitYDfTy0h4nFc7HPjh8"></a>

<p id="t-5PPyEuqQKxK33cw4KlDUhc"><span style="border-bottom:1px solid">让我们通过一个简单的例子，感受一下 LangChain 的便捷性。</span></p>

<p id="t-R3ULcXJE5K1HspfKBddRc3"><span style="border-bottom:1px solid">实际的开发中，我们可以把 API 的相关信息保存在项目根目录的</span><span style="border-bottom:1px solid">.env</span><span style="border-bottom:1px solid">文件中，方便使用。</span></p>

<pre id="t-4h71NlyNzMUBGOcRFgaWRP"><code># .env 文件内容
DEEPSEEK_API_KEY=sk-xxx
DEEPSEEK_BASE_URL=https://api.deepseek.com
DEEPSEEK_MODEL=deepseek-v4-pro</code></pre>

<p id="t-dvnIR7TIhCP21NU4Xhulo0"><span style="background-color:#ace2c5">使用 LangChain 的 ChatOpenAI 时，openai_api_base 建议配置为 https://api.deepseek.com，无需手动加 /v1，LangChain 会自动拼接路径。</span></p>


<a id="section-1949"></a>
## 实例

<a id="t-g2ukXrEecAvDEW5U3aMwGr"></a>

<pre id="t-dKXJE4WY1ttyUHMLhZXxVh"><code>import os
from dotenv import load_dotenv
# 正确的导入路径
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_openai import ChatOpenAI

# 加载环境变量
load_dotenv()

llm = ChatOpenAI(
    model=os.getenv('DEEPSEEK_MODEL'),
    openai_api_key=os.getenv('DEEPSEEK_API_KEY'),
    openai_api_base=os.getenv('DEEPSEEK_BASE_URL'),
)

# 创建提示词模板
template = """
你是一位友好的助手。
请回答以下问题：

问题：{question}
回答：
"""
prompt = PromptTemplate.from_template(template)

# 使用 LCEL 语法创建链 (推荐方式)
# 结构：Prompt -&gt; LLM -&gt; 解析为字符串
chain = prompt | llm | StrOutputParser()

# 运行链
question = "LangChain 是什么？它有什么主要用途？"

response = chain.invoke({"question": question})

print("问题：", question)
print("-" * 20)
print("回答：", response)</code></pre>


<a id="section-1950"></a>
## 示例 2：带记忆的对话链

<a id="t-UhhFcalzI399FZGrO2rUqs"></a>

<p id="t-xFzrSwLpSHmhyud9DqUZgU"><span style="border-bottom:1px solid">让我们创建一个能记住对话历史的简单聊天机器人。</span></p>


<a id="section-1951"></a>
## 实例

<a id="t-r6uAKHArfDh8dbrkCUTjbZ"></a>

<pre id="t-MoqX4ohMAt0S5GPO4qN9Dy"><code>import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_core.chat_history import BaseChatMessageHistory
from langchain_core.runnables.history import RunnableWithMessageHistory

# 1. 加载配置
load_dotenv()

# 2. 初始化 DeepSeek 模型
llm = ChatOpenAI(
    model=os.getenv('DEEPSEEK_MODEL', 'deepseek-v4-pro'),
    openai_api_key=os.getenv('DEEPSEEK_API_KEY'),
    openai_api_base=os.getenv('DEEPSEEK_BASE_URL', 'https://api.deepseek.com'),
)

# 3. 定义提示词模板
# MessagesPlaceholder 会在运行时被对话历史填充
prompt = ChatPromptTemplate.from_messages([
 ("system", "你是一个乐于助人的 AI 助手。"),
    MessagesPlaceholder(variable_name="history"),
 ("human", "{question}"),
])

# 4. 构建链
chain = prompt | llm

# 5. 管理内存：创建一个字典来存储不同用户的历史记录
store = {}

def get_session_history(session_id: str) -&gt; BaseChatMessageHistory:
 if session_id not in store:
        store[session_id] = ChatMessageHistory()
 return store[session_id]

# 6. 使用 RunnableWithMessageHistory 包装我们的链
# 这样 LangChain 会自动处理历史记录的读取和更新
with_message_history = RunnableWithMessageHistory(
    chain,
    get_session_history,
    input_messages_key="question",
    history_messages_key="history",
)

# 7. 进入对话循环
print("--- 已进入 DeepSeek 聊天模式 (输入 'exit' 退出) ---")
session_config = {"configurable": {"session_id": "user_001"}} # 区分不同会话的 ID

while True:
    user_input = input("你: ")
 if user_input.lower() in ["exit", "quit", "退出"]:
 break

 # 调用带记忆的链
    response = with_message_history.invoke(
 {"question": user_input},
        config=session_config
 )

 print(f"AI: {response.content}\n")</code></pre>

<p id="t-0LJtsMUbkVxTAqPXvdDcgF"><span style="border-bottom:1px solid;font-weight:bold">运行上述代码，你会看到</span><span style="border-bottom:1px solid">：</span></p>

<pre id="t-1IANhPGpJeiylmDSyv669s"><code>--- 已进入 DeepSeek 聊天模式 (输入 'exit' 退出) ---
你: 你好
AI: 你好！很高兴见到你！ 有什么我可以帮助你的吗？无论是回答问题、聊天，还是协助解决问题，我都很乐意为你提供帮助！

你: 我叫小明
AI: 你好，小明！很高兴认识你！ 
如果你有任何问题、想法，或者需要帮助的地方，随时告诉我哦～

你: 我叫什么记得吗？
AI: 当然记得！你刚刚告诉我你叫**小明**～  
我会认真记住我们的对话内容，在之后的交流中尽量保持上下文连贯。不过如果对话过长或间隔太久，我可能需要你提醒一下哦～  
有什么想聊的或需要帮助的吗？</code></pre>


<a id="section-1952"></a>
## 总结

<a id="t-TIPTtyIG0TUHLxweqnEZZp"></a>

<p id="t-vUbLVyhl1MqJMAS3x5LMw5"><span style="border-bottom:1px solid">本文介绍了 LangChain 框架的核心概念和实战应用。LangChain 通过标准化的组件和链式调用，让开发者能够快速构建功能强大的 AI 应用。</span></p>

<p id="t-xMwlnWC0P8ASnb8R8orUxd"><span style="border-bottom:1px solid">下表总结了本文涉及的核心知识点：</span></p>

<div id="t-55Ta89tMuc4kFAioIBCYMY"><table><colgroup><col width="127.8992919921875"/><col width="267.00518798828125"/><col width="267.00518798828125"/></colgroup><tbody><tr><td><p><span>概念</span></p></td><td><p><span>说明</span></p></td><td><p><span>关键代码</span></p></td></tr><tr><td><p><span style="border-bottom:1px solid;font-weight:bold">LCEL 链</span></p></td><td><p><span style="border-bottom:1px solid">用管道符 | 连接 Prompt、Model、Parser</span></p></td><td><p><span style="border-bottom:1px solid">chain = prompt | llm | parser</span></p></td></tr><tr><td><p><span style="border-bottom:1px solid;font-weight:bold">提示词模板</span></p></td><td><p><span style="border-bottom:1px solid">结构化的 Prompt，区分 system/user 角色</span></p></td><td><p><span style="border-bottom:1px solid">ChatPromptTemplate.from_messages()</span></p></td></tr><tr><td><p><span style="border-bottom:1px solid;font-weight:bold">流式输出</span></p></td><td><p><span style="border-bottom:1px solid">逐字输出，提升用户体验</span></p></td><td><p><span style="border-bottom:1px solid">chain.stream()</span></p></td></tr><tr><td><p><span style="border-bottom:1px solid;font-weight:bold">对话记忆</span></p></td><td><p><span style="border-bottom:1px solid">通过 session_id 管理多轮对话历史</span></p></td><td><p><span style="border-bottom:1px solid">RunnableWithMessageHistory</span></p></td></tr><tr><td><p><span style="border-bottom:1px solid;font-weight:bold">RAG 检索增强</span></p></td><td><p><span style="border-bottom:1px solid">外部知识接入，突破 LLM 知识边界</span></p></td><td><p><span style="border-bottom:1px solid">retriever | format_docs</span></p></td></tr><tr><td><p><span style="border-bottom:1px solid;font-weight:bold">Agent 智能体</span></p></td><td><p><span style="border-bottom:1px solid">自主决策调用工具，最核心的高级功能</span></p></td><td><p><span style="border-bottom:1px solid">create_tool_calling_agent()</span></p></td></tr></tbody></table></div>


<a id="section-1953"></a>
## 推荐学习路径

<a id="t-s6u8PCfNWSfObhYL40koAi"></a>

<div id="t-aNQNtkV7YJbTcfkRfaBcOy"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/412f504f81f63c3c98b23759.png"/></div>

