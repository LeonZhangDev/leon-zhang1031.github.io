---
title: "第 13 章 · LangGraph 开发"
date: "2026-10-22"
draft: false
author: "学习资料整理"
description: "状态、节点、边、API、子图、检查点、中断与恢复"
tags: ["Agent", "学习路线"]
categories: ["AI 工程"]
prerequisites: ["agent-learning-12-langchain"]
verification: {"status": "not-run", "scope": "本次仅整理资料；示例代码与原文技术结论未复跑。"}
---

状态、节点、边、API、子图、检查点、中断与恢复

[学习路线](/posts/agent-learning-route/) · [上一章](/posts/agent-learning-12-langchain/) · [下一章](/posts/agent-learning-14-build-agent/)

本章按知识小节编排。项目内容作为学习案例阅读，示例代码与原文技术结论未在本次整理中执行验证。

## 本章目录

- [LangGraph](#section-0069)
- [LangGraph 概述](#section-0874)
- [安装](#section-0875)
- [核心优势](#section-0876)
- [持久化](#section-0881)
- [线程](#section-0882)
- [检查点](#section-0883)
- [获取状态](#section-0884)
- [获取状态历史](#section-0885)
- [重放](#section-0886)
- [更新状态](#section-0887)
- [记忆存储](#section-0888)
- [基本用法](#section-0889)
- [语义搜索](#section-0890)
- [在 LangGraph 中使用](#section-0891)
- [检查点器库](#section-0892)
- [检查点器接口](#section-0893)
- [序列化器](#section-0894)
- [人在回路](#section-0896)
- [记忆](#section-0897)
- [时间旅行](#section-0898)
- [容错性](#section-0899)
- [持久化执行](#section-0900)
- [要求](#section-0901)
- [确定性与一致性重放](#section-0902)
- [持久化模式](#section-0903)
- [在节点中使用任务](#section-0904)
- [恢复工作流](#section-0905)
- [恢复工作流的起始点](#section-0906)
- [流式传输](#section-0907)
- [支持的流模式](#section-0908)
- [基本用法示例](#section-0909)
- [流式传输多种模式](#section-0910)
- [流式传输图状态](#section-0911)
- [流式传输子图输出](#section-0912)
- [调试](#section-0913)
- [LLM 令牌](#section-0914)
- [流式传输自定义数据](#section-0915)
- [与任何 LLM 一起使用](#section-0916)
- [为特定聊天模型禁用流式传输](#section-0917)
- [Python &lt; 3.11 异步](#section-0918)
- [中断](#section-0919)
- [使用 interrupt 暂停](#section-0920)
- [恢复中断](#section-0921)
- [常见模式](#section-0922)
- [批准或拒绝](#section-0923)
- [审查和编辑状态](#section-0924)
- [工具中的中断](#section-0925)
- [验证人工输入](#section-0926)
- [中断规则](#section-0927)
- [不要在 try/except 中包装 interrupt 调用](#section-0928)
- [不要在节点内重新排序 interrupt 调用](#section-0929)
- [不要在 interrupt 调用中返回复杂值](#section-0930)
- [在 interrupt 之前调用的副作用必须是幂等的](#section-0931)
- [与作为函数调用的子图一起使用](#section-0932)
- [使用中断进行调试](#section-0933)
- [使用 LangGraph Studio](#section-0934)
- [使用时间旅行](#section-0935)
- [在工作流中](#section-0936)
- [设置](#section-0937)
- [运行图](#section-0938)
- [识别检查点](#section-0939)
- [更新状态](#section-0940)
- [从检查点恢复执行](#section-0941)
- [记忆功能](#section-0942)
- [添加短期记忆](#section-0943)
- [在生产环境中使用](#section-0944)
- [在子图中使用](#section-0945)
- [添加长期记忆](#section-0946)
- [在生产环境中使用](#section-0947)
- [使用语义搜索](#section-0948)
- [管理短期记忆](#section-0949)
- [修剪消息](#section-0950)
- [删除消息](#section-0951)
- [总结消息](#section-0952)
- [管理检查点](#section-0953)
- [预构建的记忆工具](#section-0954)
- [数据库管理](#section-0955)
- [子图](#section-0956)
- [环境设置](#section-0957)
- [从节点调用图](#section-0958)
- [将图添加为节点](#section-0959)
- [子图持久化](#section-0960)
- [有状态](#section-0961)
- [无状态](#section-0962)
- [检查点器参考](#section-0963)
- [查看子图状态](#section-0964)
- [流式传输子图输出](#section-0965)
- [选择合适的接口](#section-0968)
- [快速决策指南](#section-0969)
- [何时使用 Graph API](#section-0971)
- [何时使用 Functional API](#section-0972)
- [结合使用两种 API](#section-0973)
- [从 Functional API 迁移到 Graph API](#section-0975)
- [从 Graph API 迁移到 Functional API](#section-0976)
- [总结](#section-0977)
- [图](#section-0979)
- [StateGraph](#section-0980)
- [编译您的图](#section-0981)
- [状态](#section-0982)
- [模式](#section-0983)
- [Reducers](#section-0984)
- [在图状态中使用消息](#section-0985)
- [节点](#section-0986)
- [START 节点](#section-0987)
- [END 节点](#section-0988)
- [节点缓存](#section-0989)
- [边](#section-0990)
- [普通边](#section-0991)
- [条件边](#section-0992)
- [入口点](#section-0993)
- [条件入口点](#section-0994)
- [Send](#section-0995)
- [Command](#section-0996)
- [我应该何时使用Command而不是条件边？](#section-0997)
- [导航到父图中的节点](#section-0998)
- [在工具内部使用](#section-0999)
- [人在回路中](#section-1000)
- [图迁移](#section-1001)
- [运行时上下文](#section-1002)
- [递归限制](#section-1003)
- [访问和处理递归计数器](#section-1004)
- [可视化](#section-1005)
- [使用图形 API](#section-1006)
- [设置](#section-1007)
- [定义和更新状态](#section-1008)
- [定义状态](#section-1009)
- [更新状态](#section-1010)
- [使用归约器处理状态更新](#section-1011)
- [使用 Overwrite 绕过归约器](#section-1012)
- [定义输入和输出模式](#section-1013)
- [在节点之间传递私有状态](#section-1014)
- [使用 pydantic 模型作为图状态](#section-1015)
- [添加运行时配置](#section-1016)
- [添加重试策略](#section-1017)
- [添加节点缓存](#section-1018)
- [创建步骤序列](#section-1019)
- [创建分支](#section-1020)
- [并行运行图节点](#section-1021)
- [延迟节点执行](#section-1022)
- [条件分支](#section-1023)
- [Map-Reduce 和 Send API](#section-1024)
- [创建和控制循环](#section-1025)
- [强制递归限制](#section-1026)
- [异步](#section-1027)
- [使用 Command 结合控制流和状态更新](#section-1028)
- [导航到父图中的节点](#section-1029)
- [在工具内部使用](#section-1030)
- [可视化您的图](#section-1031)
- [Mermaid](#section-1032)
- [PNG](#section-1033)
- [函数式 API 概览](#section-1034)
- [函数式 API 与图 API 对比 (Functional API vs. Graph API)](#section-1035)
- [示例 (Example)](#section-1036)
- [入口点 (Entrypoint)](#section-1037)
- [定义 (Definition)](#section-1038)
- [可注入参数 (Injectable parameters)](#section-1039)
- [执行 (Executing)](#section-1040)
- [恢复 (Resuming)](#section-1041)
- [短期记忆 (Short-term memory)](#section-1042)
- [任务 (Task)](#section-1043)
- [定义 (Definition)](#section-1044)
- [执行 (Execution)](#section-1045)
- [何时使用任务 (When to use a task)](#section-1046)
- [序列化 (Serialization)](#section-1047)
- [确定性 (Determinism)](#section-1048)
- [幂等性 (Idempotency)](#section-1049)
- [处理副作用 (Handling side effects)](#section-1051)
- [非确定性控制流 (Non-deterministic control flow)](#section-1052)
- [使用函数式 API](#section-1053)
- [创建简单工作流](#section-1054)
- [并行执行](#section-1055)
- [调用图](#section-1056)
- [调用其他入口点](#section-1057)
- [流式传输](#section-1058)
- [重试策略](#section-1059)
- [缓存任务](#section-1060)
- [错误后恢复执行](#section-1061)
- [人在回路](#section-1062)
- [基本的人在回路工作流](#section-1063)
- [审查工具调用](#section-1064)
- [短期记忆](#section-1065)
- [管理检查点](#section-1066)
- [分离返回值与保存值](#section-1067)
- [聊天机器人示例](#section-1068)
- [长期记忆](#section-1069)
- [工作流](#section-1070)
- [与其他库集成](#section-1071)
- [LangGraph 运行时](#section-1072)
- [概述 (Overview)](#section-1073)
- [参与者 (Actors)](#section-1074)
- [通道 (Channels)](#section-1075)
- [示例 (Examples)](#section-1076)
- [高级 API (High-level API)](#section-1077)
- [应用结构](#section-1080)
- [关键概念](#section-1081)
- [文件结构](#section-1082)
- [配置文件](#section-1083)
- [示例](#section-1084)
- [依赖项](#section-1085)
- [图](#section-1086)
- [环境变量](#section-1087)
- [测试](#section-1088)
- [前提条件](#section-1089)
- [开始使用](#section-1090)
- [测试单个节点和边](#section-1091)
- [部分执行](#section-1092)
- [LangSmith Studio](#section-1093)
- [先决条件](#section-1094)
- [安装 LangGraph CLI](#section-1096)
- [准备您的智能体](#section-1097)
- [环境变量](#section-1098)
- [创建 LangGraph 配置文件](#section-1099)
- [安装依赖项](#section-1100)
- [在 Studio 中查看您的智能体](#section-1101)
- [智能体聊天界面](#section-1102)
- [快速开始](#section-1103)
- [本地开发](#section-1104)
- [连接到您的智能体](#section-1105)
- [LangSmith 部署](#section-1106)
- [先决条件](#section-1107)
- [在 GitHub 上创建仓库](#section-1109)
- [导航到 LangSmith 部署](#section-1111)
- [创建新部署](#section-1112)
- [关联仓库](#section-1113)
- [部署仓库](#section-1114)
- [在 Studio 中测试您的应用程序](#section-1115)
- [获取部署的 API URL](#section-1116)
- [测试 API](#section-1117)
- [LangSmith 可观测性](#section-1118)
- [先决条件](#section-1119)
- [启用追踪](#section-1120)
- [选择性追踪](#section-1121)
- [记录到项目](#section-1122)
- [向追踪添加元数据](#section-1123)
- [使用匿名器防止敏感数据记录到追踪中](#section-1124)
- [LangGraph 入门教程](#section-1954)
- [为什么选择 LangGraph？](#section-1955)
- [适用场景](#section-1956)
- [核心概念](#section-1957)
- [Graph（图）](#section-1958)
- [State（状态）](#section-1959)
- [Nodes（节点）](#section-1960)
- [Edges（边）](#section-1961)
- [安装依赖](#section-1963)
- [配置 API Key](#section-1964)
- [验证安装](#section-1965)
- [第一个 LangGraph 程序](#section-1966)
- [实例](#section-1967)
- [可视化图结构](#section-1968)
- [使用 TypedDict 定义状态](#section-1970)
- [使用 Pydantic 定义状态（推荐用于生产）](#section-1971)
- [MessagesState（内置快捷状态）](#section-1972)
- [普通函数节点](#section-1974)
- [实例](#section-1976)
- [异步节点](#section-1977)
- [使用类作为节点](#section-1978)
- [普通边](#section-1980)
- [条件边](#section-1981)
- [并行执行（Fan-out）](#section-1982)
- [实例](#section-1984)
- [构建对话机器人](#section-1985)
- [实例](#section-1986)
- [工具调用 - ReAct Agent](#section-1987)
- [定义工具](#section-1988)
- [实例](#section-1990)
- [流式输出工具调用过程](#section-1991)
- [Human-in-the-Loop 人机协作](#section-1992)
- [使用 interrupt 暂停执行](#section-1993)
- [实例](#section-1995)
- [在边上设置断点](#section-1996)
- [持久化内存](#section-1997)
- [内存存储（适合开发测试）](#section-1998)
- [SQLite 持久化存储（适合本地项目）](#section-1999)
- [查看对话历史](#section-2000)
- [多 Agent 系统](#section-2001)
- [实例](#section-2003)
- [子图（Subgraph）](#section-2004)
- [LangGraph Studio 可视化调试](#section-2005)
- [安装 LangGraph CLI](#section-2006)
- [创建项目配置文件](#section-2007)
- [启动开发服务器](#section-2008)
- [Studio 主要功能](#section-2009)
- [最佳实践](#section-2011)
- [常见问题 FAQ](#section-2012)
- [总结](#section-2013)
- [推荐学习路径](#section-2014)

<a id="section-0069"></a>
## LangGraph

<a id="f-doxcnthHdMzxsst20XudInwxRbf"></a>

<p id="f-doxcnefjTiDOCJQsPaze0WkhA8f"><span>（LangGraph 相关知识，深入学习可以看这个，很全面 + 有代码示例</span><span><span><a href="https://mp.weixin.qq.com/s/XhFbLTLcSjDj0r3KGT9EOg"><span>https://mp.weixin.qq.com/s/XhFbLTLcSjDj0r3KGT9EOg</span></a></span></span><span>）</span></p>

<a id="f-doxcnvOvjwYxxQRxZtcdXLKwIMg"></a>

##### LangGraph 介绍/主要模块

<p id="f-doxcn79eKCklqlSTOmSuA1yDBQe"><span>（基本概念，肯定得背）</span></p>

<p id="f-doxcnvE3X6lfZJjsCXpKCHw81Qd"><span>LangGraph 通过将任务组织为 </span><span style="font-weight:bold">有向图</span><span>，而不是线性链，来解决 LangChain 在复杂任务中的局限。它支持 </span><span style="font-weight:bold">条件分支、循环、并行执行和状态共享</span><span>，并且能够实现多 Agent 协作和复杂工作流。核心模块包括：</span></p>

<p id="f-doxcnndfks3JdYvlbu0uCX5nJ1b"><span>Graph：整体工作流的图结构</span></p>

<p id="f-doxcn5wTruPxgCdJaZMrG1OpClb"><span>Node：图中的计算单元</span></p>

<p id="f-doxcnYfNp94gu7f7XJILWbVgqob"><span>State：共享状态，用于节点间传递上下文</span></p>

<p id="f-doxcn6Uct3j3aLqS8CN8OCtOMSf"><span>Edge：连接节点，定义控制流和数据流</span></p>

<p id="f-doxcnK1ykbUX35TkdSgtSbtq3Ch"><span>这种设计使 LangGraph 在处理动态逻辑和多步骤推理时更灵活、更可扩展。</span></p>

<a id="f-doxcnFrLAyqkQZLXCWFwbfdF6mc"></a>

##### LangGraph 过程是如何流转的？

<p id="f-doxcn3YZxNjgSIyb5ukgx7ZyX1e"><span style="font-weight:bold">定义图结构</span><span>：用 </span><span><span><span>StateGraph</span></span></span><span> 添加节点和边，指定入口节点（</span><span><span><span>set_entry_point()</span></span></span><span>）和结束条件（</span><span><span><span>END</span></span></span><span>）。</span></p>

<p id="f-doxcnqf3QJ9TCaAZMst1EZ0yzrg"><span style="font-weight:bold">编译图</span><span>：调用 </span><span><span><span>graph.compile()</span></span></span><span>，生成一个</span><span style="font-weight:bold">可执行图对象</span><span>（相当于执行器，负责调度和状态管理）。</span></p>

<p id="f-doxcnghB3hV6rSEUFaPBzigCWtb"><span style="font-weight:bold">启动执行</span><span>：通过 </span><span><span><span>invoke(initial_state)</span></span></span><span> 或 </span><span><span><span>stream(initial_state)</span></span></span><span> 开始运行，传入初始状态。</span></p>

<p id="f-doxcn1mHNICF2TekC0VvkOdYXmf"><span style="font-weight:bold">执行逻辑</span><span>： </span></p>

<ul><li id="f-doxcn0SPihqdMC3vW5M4XxBmb5g"><span>从入口节点开始执行。</span></li></ul>

<ul><li id="f-doxcn27xOyjdVuViAgXNRjDswbf"><span>根据边决定下一个节点，如果多个节点同时满足条件，就</span><span style="font-weight:bold">并行执行</span><span>。</span></li></ul>

<ul><li id="f-doxcnzexMHZHdGehlFmWEewwcFb"><span>每个节点跑完后，把输出合并到共享状态。</span></li></ul>

<ul><li id="f-doxcnJv7EAGNjl2luyj91iRDPdf"><span>重复调度，直到路由到 </span><span><span><span>END</span></span></span><span> 或没有后续节点。</span></li></ul>

<p id="f-doxcnJTEVjBqcFUQYyBONls9upb"><span style="font-weight:bold">结束</span><span>：返回最终状态，或者用 </span><span><span><span>stream()</span></span></span><span> 观察每一步的状态变化。</span></p>


<a id="section-0874"></a>
## LangGraph 概述

<a id="t-block-17553"></a>

<div id="t-47jmdZnzwh3vojsyp6AqEv"><div><div><div><div><a href="https://www.bilibili.com/video/BV1ancBzjEWi/">嵌入视频 / 原始播放器</a></div></div></div></div></div>

<p id="t-8Ot48HEbzxZv3H4euyQmQ2"><span style="background-color:transparent">受到塑造智能体未来的公司信任——包括 Klarna、Replit、Elastic 等——LangGraph 是一个用于构建、管理和部署长期运行、有状态智能体的底层编排框架和运行时。</span></p>

<p id="t-g1sEaLEdYAQLwwhtON7Ukc"><span style="background-color:transparent">LangGraph 非常底层，完全专注于智能体</span><span style="font-weight:bold;background-color:transparent">编排</span><span style="background-color:transparent">。在使用 LangGraph 之前，我们建议您先熟悉一些用于构建智能体的组件，从</span><span style="font-weight:bold;background-color:transparent">模型</span><span style="background-color:transparent">和</span><span style="font-weight:bold;background-color:transparent">工具</span><span style="background-color:transparent">开始。</span></p>

<p id="t-N4NxUkRU5iTvz11OlzqMVZ"><span style="background-color:transparent">在整个文档中，我们通常会使用 </span><span style="font-weight:bold;background-color:transparent">LangChain</span><span style="background-color:transparent"> 组件来集成模型和工具，但您不需要使用 LangChain 来使用 LangGraph。如果您是智能体新手，或者想要一个更高层次的抽象，我们建议您使用 LangChain 的</span><span style="font-weight:bold;background-color:transparent">智能体</span><span style="background-color:transparent">，它为常见的 LLM 和工具调用循环提供了预构建的架构。</span></p>

<p id="t-vcbtr3FdhtApy9HZtVXLeU"><span style="background-color:transparent">LangGraph 专注于对智能体编排至关重要的底层能力：持久化执行、流式处理、人在回路等。</span></p>


<a id="section-0875"></a>
## 安装

<a id="t-FR64zLLt6WK3galnZQxeGX"></a>

<pre id="t-hMfDmcFOdUjgr1A1bwVpIB"><code>pip install -U langgraph</code></pre>

<p id="t-bmzLKi8VMjIvTuY6EyN5aS"><span style="background-color:transparent">然后，创建一个简单的 hello world 示例：</span></p>

<pre id="t-BSieX0laMTWXKX4OBrq1jQ"><code>from langgraph.graph import StateGraph, MessagesState, START, END

def mock_llm(state: MessagesState):
return {"messages": [{"role": "ai", "content": "hello world"}]}

graph = StateGraph(MessagesState)
graph.add_node(mock_llm)
graph.add_edge(START, "mock_llm")
graph.add_edge("mock_llm", END)
graph = graph.compile()

graph.invoke({"messages": [{"role": "user", "content": "hi!"}]})</code></pre>


<a id="section-0876"></a>
## 核心优势

<a id="t-isR3Z8fJGuVq9gxGh5SbTx"></a>

<p id="t-9SOdEUP6Ib32rtZXSJNsIN"><span style="background-color:transparent">LangGraph 为</span><span style="font-style:italic;background-color:transparent">任何</span><span style="background-color:transparent">长期运行、有状态的工作流或智能体提供底层支持基础设施。LangGraph 不抽象提示词或架构，并提供以下核心优势：</span></p>

<ul><li id="t-wNm2SkddfxJiCNln7HRp5Y"><span style="border-bottom:1px solid;font-weight:bold">持久化执行</span><span>：构建能够从故障中恢复、可以长时间运行、并能从中断处继续执行的智能体。</span></li></ul>

<ul><li id="t-gaE9TfmaCY6I1LQJCT1H0b"><span style="border-bottom:1px solid;font-weight:bold">人在回路</span><span>：通过在任何时间点检查和修改智能体状态，融入人工监督。</span></li></ul>

<ul><li id="t-FZ8RBXgqOmr2iR9Qsa69A2"><span style="border-bottom:1px solid;font-weight:bold">全面的记忆</span><span>：创建具有短期工作记忆（用于持续推理）和跨会话长期记忆的有状态智能体。</span></li></ul>

<ul><li id="t-3i5HE47Haj1EzvUIClG2gx"><span style="border-bottom:1px solid;font-weight:bold">使用 LangSmith 调试</span><span>：通过可视化工具深入了解复杂的智能体行为，这些工具可以追踪执行路径、捕获状态转换并提供详细的运行时指标。</span></li></ul>

<ul><li id="t-SfwBUsFHyMXQRDmiwrvjcb"><span style="border-bottom:1px solid;font-weight:bold">生产就绪的部署</span><span>：使用专为处理有状态、长期运行工作流的独特挑战而设计的可扩展基础设施，自信地部署复杂的智能体系统。</span></li></ul>


<a id="section-0881"></a>
## 持久化

<a id="t-block-17578"></a>

<p id="t-nH6Z0jbLWbnyUnwFsJNMeJ"><span style="background-color:transparent">LangGraph 内置了一个通过检查点器实现的持久化层。当你使用检查点器编译图时，检查点器会在每个超级步骤保存图状态的</span><span style="background-color:transparent">检查点</span><span style="background-color:transparent">。这些检查点被保存到一个</span><span style="background-color:transparent">线程</span><span style="background-color:transparent">中，可以在图执行后访问。因为</span><span style="background-color:transparent">线程</span><span style="background-color:transparent">允许在执行后访问图的状态，所以包括人在回路、记忆、时间旅行和容错在内的几个强大功能都成为可能。下面，我们将更详细地讨论这些概念。</span></p>

<div id="t-euGN5bh4lOANXMPTI7wHM7"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/838b4ea70d23cfacdff1bb60.jpg"/></div>

<p id="t-PZpc6ZP44AHizbeo3VcPCD"><span style="font-weight:bold">Agent Server 自动处理检查点</span><span> 当使用 </span><span style="border-bottom:1px solid;font-weight:bold">Agent Server</span><span> 时，你不需要手动实现或配置检查点器。服务器会在幕后为你处理所有的持久化基础设施。</span></p>


<a id="section-0882"></a>
## 线程

<a id="t-jZ0EhRXzm4akeEPld7PNJB"></a>

<p id="t-XlkOrwFhsrbp3HiUtUGNqZ"><span style="background-color:transparent">线程是检查点器为每个保存的检查点分配的唯一 ID 或线程标识符。它包含一系列</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">运行</span><span style="background-color:transparent">的累积状态。当运行被执行时，助手底层图的</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">状态</span><span style="background-color:transparent">将被持久化到线程中。</span></p>

<p id="t-v91UZFNnEPKnQGptdM6X9V"><span style="background-color:transparent">当使用检查点器调用图时，你</span><span style="font-weight:bold;background-color:transparent">必须</span><span style="background-color:transparent">在配置的</span><span style="background-color:transparent">可配置</span><span style="background-color:transparent">部分指定一个</span><span style="background-color:transparent">thread_id</span><span style="background-color:transparent">：</span></p>

<pre id="t-sP6ZBVladRI7EahR6iOXag"><code>{"configurable": {"thread_id": "1"}}</code></pre>

<p id="t-Y8vFXcePlLBzJrl9XkL1R0"><span style="background-color:transparent">可以检索线程的当前和历史状态。为了持久化状态，必须在执行运行之前创建线程。LangSmith API 提供了几个用于创建和管理线程及线程状态的端点。更多详情请参阅 </span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">API 参考</span><span style="background-color:transparent">。</span></p>

<p id="t-EfpU7f8hdW3Et9S6hVj79Z"><span style="background-color:transparent">检查点器使用</span><span style="background-color:transparent">thread_id</span><span style="background-color:transparent">作为存储和检索检查点的主键。没有它，检查点器无法保存状态或在</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">中断</span><span style="background-color:transparent">后恢复执行，因为检查点器使用</span><span style="background-color:transparent">thread_id</span><span style="background-color:transparent">来加载保存的状态。</span></p>


<a id="section-0883"></a>
## 检查点

<a id="t-214ttEvQUgL53GFgZvU98x"></a>

<p id="t-FUKcH7WaYxlASfoflmp3J1"><span style="background-color:transparent">线程在特定时间点的状态称为检查点。检查点是在每个超级步骤保存的图状态快照，由</span><span style="background-color:transparent">StateSnapshot</span><span style="background-color:transparent">对象表示，具有以下关键属性：</span></p>

<ul><li id="t-DTPe91yPJ0HQ5YuLGxjj6l"><span>config</span><span>：与此检查点关联的配置。</span></li></ul>

<ul><li id="t-21ttHgYTuJ18CLg4bkW6WT"><span>metadata</span><span>：与此检查点关联的元数据。</span></li></ul>

<ul><li id="t-4txTwfR0KUEuNDOlXjDDh5"><span>values</span><span>：此时状态通道的值。</span></li></ul>

<ul><li id="t-Xdki8BnMkeM4EotgfcRORv"><span>next</span><span>：图中接下来要执行的节点名称的元组。</span></li></ul>

<ul><li id="t-kOPIHyNOZTzkpdfZEyMWJA"><span>tasks</span><span>：包含要执行的下一个任务信息的</span><span>PregelTask</span><span>对象元组。如果该步骤之前尝试过，它将包含错误信息。如果图是从节点内部</span><span style="border-bottom:1px solid;font-weight:bold">动态</span><span>中断的，任务将包含与中断相关的额外数据。</span></li></ul>

<p id="t-C1oA5psCCcNoc559NpzZJO"><span style="background-color:transparent">检查点被持久化，并可用于在以后恢复线程的状态。</span></p>

<p id="t-fZvmTR6iRpOj5JUJ1GXqgD"><span style="background-color:transparent">让我们看看当调用一个简单图时保存了哪些检查点：</span></p>

<pre id="t-N9z3qoNwzBjMr5JaklNlVl"><code>from langgraph.graph import StateGraph, START, END
from langgraph.checkpoint.memory import InMemorySaver
from langchain_core.runnables import RunnableConfig
from typing import Annotated
from typing_extensions import TypedDict
from operator import add

class State(TypedDict):
foo: str
bar: Annotated[list[str], add]

def node_a(state: State):
return {"foo": "a", "bar": ["a"]}

def node_b(state: State):
return {"foo": "b", "bar": ["b"]}

workflow = StateGraph(State)
workflow.add_node(node_a)
workflow.add_node(node_b)
workflow.add_edge(START, "node_a")
workflow.add_edge("node_a", "node_b")
workflow.add_edge("node_b", END)

checkpointer = InMemorySaver()
graph = workflow.compile(checkpointer=checkpointer)

config: RunnableConfig = {"configurable": {"thread_id": "1"}}
graph.invoke({"foo": "", "bar":[]}, config)</code></pre>

<p id="t-JlBNaYQSMMMMPEIPbtdngQ"><span style="background-color:transparent">运行图后，我们预计会看到恰好 4 个检查点：</span></p>

<ul><li id="t-F4INtomUv7Sy2xaxJse4yD"><span>下一个要执行的节点为</span><span style="border-bottom:1px solid;font-weight:bold">START</span><span>的空检查点</span></li></ul>

<ul><li id="t-81fjU196ZVujde4U3cBKMr"><span>包含用户输入</span><span>{'foo': '', 'bar': []}</span><span>且下一个要执行的节点为</span><span>node_a</span><span>的检查点</span></li></ul>

<ul><li id="t-J2zFnfZvWOUj51T78O2IcU"><span>包含</span><span>node_a</span><span>的输出</span><span>{'foo': 'a', 'bar': ['a']}</span><span>且下一个要执行的节点为</span><span>node_b</span><span>的检查点</span></li></ul>

<ul><li id="t-mLHszaDvWU32Lu9znFXWEJ"><span>包含</span><span>node_b</span><span>的输出</span><span>{'foo': 'b', 'bar': ['a', 'b']}</span><span>且没有下一个要执行节点的检查点</span></li></ul>

<p id="t-iEpeow8qKCWD0UCUhwPszp"><span style="background-color:transparent">请注意，</span><span style="background-color:transparent">bar</span><span style="background-color:transparent">通道的值包含来自两个节点的输出，因为我们为</span><span style="background-color:transparent">bar</span><span style="background-color:transparent">通道设置了归约器。</span></p>


<a id="section-0884"></a>
## 获取状态

<a id="t-LTtgkKoZyMqcH8K63GLgwE"></a>

<p id="t-QLYLDyZJnDmBZVIpax5fL2"><span style="background-color:transparent">与保存的图状态交互时，你</span><span style="font-weight:bold;background-color:transparent">必须</span><span style="background-color:transparent">指定一个</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">线程标识符</span><span style="background-color:transparent">。你可以通过调用 </span><span style="background-color:transparent">graph.get_state(config)</span><span style="background-color:transparent"> 来查看图的_最新_状态。这将返回一个 </span><span style="background-color:transparent">StateSnapshot</span><span style="background-color:transparent"> 对象，该对象对应于配置中提供的线程 ID 关联的最新检查点，或者如果提供了，则对应于该线程的检查点 ID 关联的检查点。</span></p>

<pre id="t-yydAApGj7p1TIFME0IXfzL"><code># get the latest state snapshot
config = {"configurable": {"thread_id": "1"}}
graph.get_state(config)

# get a state snapshot for a specific checkpoint_id
config = {"configurable": {"thread_id": "1", "checkpoint_id": "1ef663ba-28fe-6528-8002-5a559208592c"}}
graph.get_state(config)</code></pre>

<p id="t-cagvaHYsF8uzgcfVnvjeI7"><span style="background-color:transparent">在我们的示例中，</span><span style="background-color:transparent">get_state</span><span style="background-color:transparent">的输出将如下所示：</span></p>

<pre id="t-blOWCJ2QtPSP8fTk0yrIvQ"><code>StateSnapshot(
values={'foo': 'b', 'bar': ['a', 'b']},
next=(),
config={'configurable': {'thread_id': '1', 'checkpoint_ns': '', 'checkpoint_id': '1ef663ba-28fe-6528-8002-5a559208592c'}},
metadata={'source': 'loop', 'writes': {'node_b': {'foo': 'b', 'bar': ['b']}}, 'step': 2},
created_at='2024-08-29T19:19:38.821749+00:00',
parent_config={'configurable': {'thread_id': '1', 'checkpoint_ns': '', 'checkpoint_id': '1ef663ba-28f9-6ec4-8001-31981c2c39f8'}}, tasks=()
)</code></pre>


<a id="section-0885"></a>
## 获取状态历史

<a id="t-zu7OHk4qNy0uq7WSYGMBdY"></a>

<p id="t-KN8sjZuFzmWPrt9ItrQff2"><span style="background-color:transparent">你可以通过调用</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">graph.get_state_history(config)</span><span style="background-color:transparent">来获取给定线程的图执行完整历史。这将返回与配置中提供的线程 ID 关联的</span><span style="background-color:transparent">StateSnapshot</span><span style="background-color:transparent">对象列表。重要的是，检查点将按时间顺序排列，最新的检查点 /</span><span style="background-color:transparent">StateSnapshot</span><span style="background-color:transparent">位于列表首位。</span></p>

<pre id="t-Q8RUvRYgvMI34c65EC4k9K"><code>config = {"configurable": {"thread_id": "1"}}
list(graph.get_state_history(config))</code></pre>

<p id="t-kmrGWz1aVf5P3NQ0z7SA80"><span style="background-color:transparent">在我们的示例中，</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">get_state_history</span><span style="background-color:transparent">的输出将如下所示：</span></p>

<pre id="t-kJVI1IBfxfPqgwYMFsVNV0"><code>[
StateSnapshot(
values={'foo': 'b', 'bar': ['a', 'b']},
next=(),
config={'configurable': {'thread_id': '1', 'checkpoint_ns': '', 'checkpoint_id': '1ef663ba-28fe-6528-8002-5a559208592c'}},
metadata={'source': 'loop', 'writes': {'node_b': {'foo': 'b', 'bar': ['b']}}, 'step': 2},
created_at='2024-08-29T19:19:38.821749+00:00',
parent_config={'configurable': {'thread_id': '1', 'checkpoint_ns': '', 'checkpoint_id': '1ef663ba-28f9-6ec4-8001-31981c2c39f8'}},
tasks=(),
),
StateSnapshot(
values={'foo': 'a', 'bar': ['a']},
next=('node_b',),
config={'configurable': {'thread_id': '1', 'checkpoint_ns': '', 'checkpoint_id': '1ef663ba-28f9-6ec4-8001-31981c2c39f8'}},
metadata={'source': 'loop', 'writes': {'node_a': {'foo': 'a', 'bar': ['a']}}, 'step': 1},
created_at='2024-08-29T19:19:38.819946+00:00',
parent_config={'configurable': {'thread_id': '1', 'checkpoint_ns': '', 'checkpoint_id': '1ef663ba-28f4-6b4a-8000-ca575a13d36a'}},
tasks=(PregelTask(id='6fb7314f-f114-5413-a1f3-d37dfe98ff44', name='node_b', error=None, interrupts=()),),
),
StateSnapshot(
values={'foo': '', 'bar': []},
next=('node_a',),
config={'configurable': {'thread_id': '1', 'checkpoint_ns': '', 'checkpoint_id': '1ef663ba-28f4-6b4a-8000-ca575a13d36a'}},
metadata={'source': 'loop', 'writes': None, 'step': 0},
created_at='2024-08-29T19:19:38.817813+00:00',
parent_config={'configurable': {'thread_id': '1', 'checkpoint_ns': '', 'checkpoint_id': '1ef663ba-28f0-6c66-bfff-6723431e8481'}},
tasks=(PregelTask(id='f1b14528-5ee5-579c-949b-23ef9bfbed58', name='node_a', error=None, interrupts=()),),
),
StateSnapshot(
values={'bar': []},
next=('__start__',),
config={'configurable': {'thread_id': '1', 'checkpoint_ns': '', 'checkpoint_id': '1ef663ba-28f0-6c66-bfff-6723431e8481'}},
metadata={'source': 'input', 'writes': {'foo': ''}, 'step': -1},
created_at='2024-08-29T19:19:38.816205+00:00',
parent_config=None,
tasks=(PregelTask(id='6d27aa2e-d72b-5504-a36f-8620e54a76dd', name='__start__', error=None, interrupts=()),),
)
]</code></pre>

<div id="t-4bCdU98uBFZcAlfziZTDB4"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/e52aa30ba1a57fc82ec2b823.jpg"/></div>


<a id="section-0886"></a>
## 重放

<a id="t-f5ieymWWOTLHsQvwaTvb3y"></a>

<p id="t-b5aovu5L7ZLsT2BEBnO1aM"><span style="background-color:transparent">也可以回放先前的图执行。如果我们使用</span><span style="background-color:transparent">thread_id</span><span style="background-color:transparent">和</span><span style="background-color:transparent">checkpoint_id</span><span style="background-color:transparent">来</span><span style="background-color:transparent">invoke</span><span style="background-color:transparent">一个图，那么我们将_重放_对应于</span><span style="background-color:transparent">checkpoint_id</span><span style="background-color:transparent">的检查点_之前_已执行的步骤，并且只执行检查点_之后_的步骤。</span></p>

<ul><li id="t-wURyPtZM9z3D7WgrtCuAv5"><span>thread_id</span><span>是线程的 ID。</span></li></ul>

<ul><li id="t-0PGX59dJeVbjpmxUYWSM6U"><span>checkpoint_id</span><span>是指向线程内特定检查点的标识符。</span></li></ul>

<p id="t-udYdTXJPzh0GyPfT5V04Hl"><span style="background-color:transparent">你必须在调用图时将这些作为配置的</span><span style="background-color:transparent">可配置</span><span style="background-color:transparent">部分传递：</span></p>

<pre id="t-9AyLAzI6nRKAhnkMHW0z8A"><code>config = {"configurable": {"thread_id": "1", "checkpoint_id": "0c62ca34-ac19-445d-bbb0-5b4984975b2a"}}
graph.invoke(None, config=config)</code></pre>

<p id="t-xPxTAXodqkPMce9RVj8QdL"><span style="background-color:transparent">重要的是，LangGraph 知道某个特定步骤是否之前已执行过。如果是，LangGraph 只是简单地_重放_图中的该特定步骤，并且不重新执行该步骤，但仅针对提供的 </span><span style="background-color:transparent">checkpoint_id</span><span style="background-color:transparent"> _之前_的步骤。</span><span style="background-color:transparent">checkpoint_id</span><span style="background-color:transparent"> _之后_的所有步骤都将被执行（即一个新的分支），即使它们之前已经执行过。请参阅此</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">关于时间旅行的操作指南以了解更多关于重放的信息</span><span style="background-color:transparent">。</span></p>

<div id="t-nR95CJFoZBHm6gTmx9plFB"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/fd7f75de00a9f15ce45525c8.png"/></div>


<a id="section-0887"></a>
## 更新状态

<a id="t-7H9PhRj5qmOpK7NUrBnrps"></a>

<p id="t-UqNDTLKnbZKUQdf5OEeB0D"><span style="background-color:transparent">除了从特定的</span><span style="background-color:transparent">检查点</span><span style="background-color:transparent">重放图之外，我们还可以_编辑_图状态。我们使用</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">update_state</span><span style="background-color:transparent">来实现这一点。该方法接受三个不同的参数：</span></p>

<a id="t-ExaBsN9MfrTtl1rTI7JZBO"></a>

##### config

<p id="t-AQ2PzLf5w2KKy2W3VKjas5"><span style="background-color:transparent">配置应包含指定要更新哪个线程的</span><span style="background-color:transparent">thread_id</span><span style="background-color:transparent">。当只传递</span><span style="background-color:transparent">thread_id</span><span style="background-color:transparent">时，我们更新（或分支）当前状态。或者，如果我们包含</span><span style="background-color:transparent">checkpoint_id</span><span style="background-color:transparent">字段，那么我们将分支该选定的检查点。</span></p>

<a id="t-E6kpKkkHiE1LJ7lH1GTVqr"></a>

##### values

<p id="t-O6YzkIlY6ZUtw1g9pgVQfO"><span style="background-color:transparent">这些是用于更新状态的值。请注意，此更新与来自节点的任何更新完全相同。这意味着这些值将被传递给</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">归约器</span><span style="background-color:transparent">函数，如果它们为图状态中的某些通道定义了。这意味着 </span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">update_state</span><span style="background-color:transparent"> 不会自动覆盖每个通道的通道值，而只会覆盖没有归约器的通道。让我们看一个例子。</span></p>

<p id="t-SLzoXo3hDocPsyo0ey3So2"><span style="background-color:transparent">假设你已使用以下模式定义了图的状态（参见上面的完整示例）：</span></p>

<pre id="t-W5rhQeRKXHVnwaJzxXum56"><code>from typing import Annotated
from typing_extensions import TypedDict
from operator import add

class State(TypedDict):
foo: int
bar: Annotated[list[str], add]</code></pre>

<p id="t-sdXM1sqjjG5kEhIySlUiNM"><span style="background-color:transparent">现在假设图的当前状态是</span></p>

<pre id="t-Jx4m02t9ydOodIT7qAaHLa"><code>{"foo": 1, "bar": ["a"]}</code></pre>

<p id="t-jaWznHsGJpLdS9cXejqmcU"><span style="background-color:transparent">如果你按如下方式更新状态：</span></p>

<pre id="t-WSmVGATo0FNBjdXqb6O6VB"><code>graph.update_state(config, {"foo": 2, "bar": ["b"]})</code></pre>

<p id="t-axSKlvg4p8OD2GtFx9hz2P"><span style="background-color:transparent">那么图的新状态将是：</span></p>

<pre id="t-ApfMeH49RKWuk5FvHm9kM3"><code>{"foo": 2, "bar": ["a", "b"]}</code></pre>

<p id="t-6aupA5IE3zwvg3yHEhJBub"><span style="background-color:transparent">foo</span><span style="background-color:transparent">键（通道）被完全更改（因为该通道没有指定归约器，所以</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">update_state</span><span style="background-color:transparent">会覆盖它）。但是，为</span><span style="background-color:transparent">bar</span><span style="background-color:transparent">键指定了归约器，因此它将</span><span style="background-color:transparent">"b"</span><span style="background-color:transparent">附加到</span><span style="background-color:transparent">bar</span><span style="background-color:transparent">的状态。</span></p>

<a id="t-gVGZ7XD4ZqEGO8119lYqs5"></a>

##### as_node

<p id="t-FOy5wNIk08pDqW7blShxGM"><span style="background-color:transparent">调用 </span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">update_state</span><span style="background-color:transparent"> 时可以可选指定的最后一件事是 </span><span style="background-color:transparent">as_node</span><span style="background-color:transparent">。如果你提供了它，更新将应用为好像来自节点 </span><span style="background-color:transparent">as_node</span><span style="background-color:transparent">。如果未提供 </span><span style="background-color:transparent">as_node</span><span style="background-color:transparent">，它将设置为最后更新状态的节点（如果不模糊）。这很重要的原因是，接下来要执行的步骤取决于最后给出更新的节点，因此这可以用来控制哪个节点接下来执行。</span></p>

<div id="t-WVfcA3QGU8Z7cNJeFKUj6Q"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/713762ec773b5496495a05a6.jpg"/></div>


<a id="section-0888"></a>
## 记忆存储

<a id="t-VfNYN5Rqc1UM42Qgg1wUnL"></a>

<div id="t-gfKdBDD5g6yRLfxPvqe9PT"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/5a333348ac7a2063b8e1b523.png"/></div>

<p id="t-TqJTJhcTpxk4GUmO5IR6lI"><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">状态模式</span><span style="background-color:transparent">指定了一组在图执行时填充的键。如上所述，状态可以由检查点器在每个图步骤写入线程，从而实现状态持久化。</span></p>

<p id="t-q2ciE8Osm51XwwTMRjydZQ"><span style="background-color:transparent">但是，如果我们想_跨线程_保留一些信息呢？考虑聊天机器人的情况，我们希望在该用户的所有聊天对话（例如，线程）中保留关于该用户的特定信息！</span></p>

<p id="t-yRS2j7Y5xKVSd9CSM36cqn"><span style="background-color:transparent">仅使用检查点器，我们无法跨线程共享信息。这引出了对</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">Store</span><span style="background-color:transparent">接口的需求。作为说明，我们可以定义一个</span><span style="background-color:transparent">InMemoryStore</span><span style="background-color:transparent">来跨线程存储关于用户的信息。我们只需像以前一样使用检查点器编译我们的图，并加上我们的新</span><span style="background-color:transparent">in_memory_store</span><span style="background-color:transparent">变量。</span></p>

<p id="t-sdaqoJhV8XiQgGPLobrBB8"><span style="font-weight:bold">LangGraph API 自动处理存储</span><span>当使用 LangGraph API 时，你不需要手动实现或配置存储。API 会在幕后为你处理所有的存储基础设施。</span></p>


<a id="section-0889"></a>
## 基本用法

<a id="t-QzuGBPLqpdvCDJm4Cc9NDB"></a>

<p id="t-cEO4Qw1JSaenCDpBvTJXL9"><span style="background-color:transparent">首先，让我们在不使用 LangGraph 的情况下单独展示这一点。</span></p>

<pre id="t-Mg6Uag3Rd73yB5CFA8DmhV"><code>from langgraph.store.memory import InMemoryStore
in_memory_store = InMemoryStore()</code></pre>

<p id="t-VPN6SRdtARjIxfUffphYZD"><span style="background-color:transparent">记忆通过一个</span><span style="background-color:transparent">元组</span><span style="background-color:transparent">进行命名空间划分，在这个特定示例中将是</span><span style="background-color:transparent">(&lt;user_id&gt;, "memories")</span><span style="background-color:transparent">。命名空间可以是任意长度并代表任何内容，不一定必须是用户特定的。</span></p>

<pre id="t-Qqk3yCce0lrZWKHvD1Y2bg"><code>user_id = "1"
namespace_for_memory = (user_id, "memories")</code></pre>

<p id="t-XzowlL4HibN2fyFV0rI4sB"><span style="background-color:transparent">我们使用</span><span style="background-color:transparent">store.put</span><span style="background-color:transparent">方法将记忆保存到我们命名空间中的存储。当我们这样做时，我们指定命名空间（如上定义）以及记忆的键值对：键只是记忆的唯一标识符（</span><span style="background-color:transparent">memory_id</span><span style="background-color:transparent">），值（一个字典）是记忆本身。</span></p>

<pre id="t-rRi51GMe0MEtHp56zwFWV0"><code>memory_id = str(uuid.uuid4())
memory = {"food_preference" : "I like pizza"}
in_memory_store.put(namespace_for_memory, memory_id, memory)</code></pre>

<p id="t-TUriXMEofHaNBPX0J5uctW"><span style="background-color:transparent">我们可以使用</span><span style="background-color:transparent">store.search</span><span style="background-color:transparent">方法读取我们命名空间中的记忆，该方法将返回给定用户的所有记忆作为列表。最新的记忆是列表中的最后一个。</span></p>

<pre id="t-vIX45OsJa4h83TuDSduatt"><code>memories = in_memory_store.search(namespace_for_memory)
memories[-1].dict()
{'value': {'food_preference': 'I like pizza'},
'key': '07e0caf4-1631-47b7-b15f-65515d4c1843',
'namespace': ['1', 'memories'],
'created_at': '2024-10-02T17:22:31.590602+00:00',
'updated_at': '2024-10-02T17:22:31.590605+00:00'}</code></pre>

<p id="t-xE5Jonjm1i01KiR3tJnVJm"><span style="background-color:transparent">每种记忆类型都是一个具有某些属性的 Python 类（</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">Item</span><span style="background-color:transparent">）。我们可以通过如上所示的</span><span style="background-color:transparent">.dict</span><span style="background-color:transparent">转换将其作为字典访问。</span></p>

<p id="t-Si0sm3S9o6hnsX9TNshNdE"><span style="background-color:transparent">它具有的属性是：</span></p>

<ul><li id="t-gN7pIXdUJcIkEhkpnknbY5"><span>value</span><span>：此记忆的值（本身是一个字典）</span></li></ul>

<ul><li id="t-C730hbIhOlxVVaT7UPJgg1"><span>key</span><span>：此记忆在此命名空间中的唯一键</span></li></ul>

<ul><li id="t-JVQXgPbOtGLyVGl8JVqOOM"><span>namespace</span><span>：字符串列表，此记忆类型的命名空间</span></li></ul>

<ul><li id="t-rGhWTvFABn8bZcYafrjaZV"><span>created_at</span><span>：此记忆创建时的时间戳</span></li></ul>

<ul><li id="t-Tij0Smvz0UahxF0UKFOJi6"><span>updated_at</span><span>：此记忆更新时的时间戳</span></li></ul>


<a id="section-0890"></a>
## 语义搜索

<a id="t-SO0FBWwkbABC7jtYRvyhvZ"></a>

<p id="t-Cgl4UmOa47UyyY24J3NUbr"><span style="background-color:transparent">除了简单的检索，存储还支持语义搜索，允许你根据含义而不是精确匹配来查找记忆。要启用此功能，请使用嵌入模型配置存储：</span></p>

<pre id="t-NEBLQmc9yKLoAH87qJcDdc"><code>from langchain.embeddings import init_embeddings

store = InMemoryStore(
index={
"embed": init_embeddings("openai:text-embedding-3-small"), # Embedding provider
"dims": 1536, # Embedding dimensions
"fields": ["food_preference", "$"] # Fields to embed
}
)</code></pre>

<p id="t-itq4fjEgJnlzBBSrGx3cRq"><span style="background-color:transparent">现在搜索时，你可以使用自然语言查询来查找相关记忆：</span></p>

<pre id="t-xqhfsUo1xtc3i2r76L3XsH"><code># Find memories about food preferences
# (This can be done after putting memories into the store)
memories = store.search(
namespace_for_memory,
query="What does the user like to eat?",
limit=3 # Return top 3 matches
)</code></pre>

<p id="t-18L6aZnqZygfPGu5XPcfdJ"><span style="background-color:transparent">你可以通过配置</span><span style="background-color:transparent">fields</span><span style="background-color:transparent">参数或在存储记忆时指定</span><span style="background-color:transparent">index</span><span style="background-color:transparent">参数来控制记忆的哪些部分被嵌入：</span></p>

<pre id="t-FYeVZV8qRzQYiIg4spntlU"><code># Store with specific fields to embed
store.put(
namespace_for_memory,
str(uuid.uuid4()),
{
"food_preference": "I love Italian cuisine",
"context": "Discussing dinner plans"
},
index=["food_preference"] # Only embed "food_preferences" field
)

# Store without embedding (still retrievable, but not searchable)
store.put(
namespace_for_memory,
str(uuid.uuid4()),
{"system_info": "Last updated: 2024-01-01"},
index=False
)</code></pre>


<a id="section-0891"></a>
## 在 LangGraph 中使用

<a id="t-J0KI0ye0kEcn8GY3owNglz"></a>

<p id="t-lgXNebYngFR0X4nw2ZY3Sa"><span style="background-color:transparent">有了这一切，我们在 LangGraph 中使用</span><span style="background-color:transparent">in_memory_store</span><span style="background-color:transparent">。</span><span style="background-color:transparent">in_memory_store</span><span style="background-color:transparent">与检查点器协同工作：检查点器将状态保存到线程，如上所述，而</span><span style="background-color:transparent">in_memory_store</span><span style="background-color:transparent">允许我们存储任意信息以供_跨_线程访问。我们使用检查点器和</span><span style="background-color:transparent">in_memory_store</span><span style="background-color:transparent">编译图，如下所示。</span></p>

<pre id="t-G5PLh4kjVmtuBqBwiTrlmz"><code>from langgraph.checkpoint.memory import InMemorySaver

# We need this because we want to enable threads (conversations)
checkpointer = InMemorySaver()

# ... Define the graph ...

# Compile the graph with the checkpointer and store
graph = graph.compile(checkpointer=checkpointer, store=in_memory_store)</code></pre>

<p id="t-HRZB0uZ831csbUUZ4DVls7"><span style="background-color:transparent">我们像之前一样，使用</span><span style="background-color:transparent">thread_id</span><span style="background-color:transparent">来调用图，同时还会使用</span><span style="background-color:transparent">user_id</span><span style="background-color:transparent">，正如我们上面展示的，我们将用这个</span><span style="background-color:transparent">user_id</span><span style="background-color:transparent">来为这个特定用户的记忆进行命名空间划分。</span></p>

<pre id="t-K34Qu7wsYWiSMIemWzj3pq"><code># Invoke the graph
user_id = "1"
config = {"configurable": {"thread_id": "1", "user_id": user_id}}

# First let's just say hi to the AI
for update in graph.stream(
{"messages": [{"role": "user", "content": "hi"}]}, config, stream_mode="updates"
):
print(update)</code></pre>

<p id="t-Qt20AoeY3sfEdXiWW3C7pc"><span style="background-color:transparent">我们可以在</span><span style="font-style:italic;background-color:transparent">任何节点</span><span style="background-color:transparent">中通过传递</span><span style="background-color:transparent">store: BaseStore</span><span style="background-color:transparent">和</span><span style="background-color:transparent">config: RunnableConfig</span><span style="background-color:transparent">作为节点参数来访问</span><span style="background-color:transparent">in_memory_store</span><span style="background-color:transparent">和</span><span style="background-color:transparent">user_id</span><span style="background-color:transparent">。以下是如何在节点中使用语义搜索来查找相关记忆的示例：</span></p>

<pre id="t-l5NqZebhuisPBDbEFtH6BJ"><code>def update_memory(state: MessagesState, config: RunnableConfig, *, store: BaseStore):

# Get the user id from the config
user_id = config["configurable"]["user_id"]

# Namespace the memory
namespace = (user_id, "memories")

# ... Analyze conversation and create a new memory

# Create a new memory ID
memory_id = str(uuid.uuid4())

# We create a new memory
store.put(namespace, memory_id, {"memory": memory})</code></pre>

<p id="t-iwvqmma13o9eB5HptdSAa2"><span style="background-color:transparent">正如我们上面展示的，我们也可以在任何节点中访问存储，并使用</span><span style="background-color:transparent">store.search</span><span style="background-color:transparent">方法来获取记忆。请注意，记忆会以可转换为字典的对象列表形式返回。</span></p>

<pre id="t-3sG1VHOzGv1sjUaZXp7RrG"><code>memories[-1].dict()
{'value': {'food_preference': 'I like pizza'},
'key': '07e0caf4-1631-47b7-b15f-65515d4c1843',
'namespace': ['1', 'memories'],
'created_at': '2024-10-02T17:22:31.590602+00:00',
'updated_at': '2024-10-02T17:22:31.590605+00:00'}</code></pre>

<p id="t-2VbWTBxc0sZonfPAv9KPMY"><span style="background-color:transparent">我们可以访问这些记忆并在模型调用中使用它们。</span></p>

<pre id="t-SqYsEaLKRA8PGgwUqwb8Jf"><code>def call_model(state: MessagesState, config: RunnableConfig, *, store: BaseStore):
# Get the user id from the config
user_id = config["configurable"]["user_id"]

# Namespace the memory
namespace = (user_id, "memories")

# Search based on the most recent message
memories = store.search(
namespace,
query=state["messages"][-1].content,
limit=3
)
info = "\n".join([d.value["memory"] for d in memories])

# ... Use memories in the model call</code></pre>

<p id="t-0pxvsJlFJLwcpeJqjSGbHz"><span style="background-color:transparent">如果我们创建一个新线程，只要</span><span style="background-color:transparent">user_id</span><span style="background-color:transparent">相同，我们仍然可以访问相同的记忆。</span></p>

<pre id="t-QKyCKekT9Jlodu3AAuFb9E"><code># Invoke the graph
config = {"configurable": {"thread_id": "2", "user_id": "1"}}

# Let's say hi again
for update in graph.stream(
{"messages": [{"role": "user", "content": "hi, tell me about my memories"}]}, config, stream_mode="updates"
):
print(update)</code></pre>

<p id="t-IEVtuPcMoR2qPUaYXfM1Xt"><span style="background-color:transparent">当我们使用 LangSmith 时，无论是在本地（例如在 </span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">Studio</span><span style="background-color:transparent"> 中）还是 </span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">使用 LangSmith 托管</span><span style="background-color:transparent">，基础存储默认都是可用的，无需在图编译时指定。但是，要启用语义搜索，您 </span><span style="font-weight:bold;background-color:transparent">确实</span><span style="background-color:transparent"> 需要在 </span><span style="background-color:transparent">langgraph.json</span><span style="background-color:transparent"> 文件中配置索引设置。例如：</span></p>

<pre id="t-rc7k3kHreZcdj3qzGOgsCL"><code>{
...
"store": {
"index": {
"embed": "openai:text-embeddings-3-small",
"dims": 1536,
"fields": ["$"]
}
}
}</code></pre>


<a id="section-0892"></a>
## 检查点器库

<a id="t-NZ13AqCLT3vrUtG3Nj29M7"></a>

<p id="t-wIStHyr41cUhZR86ZUzKzn"><span style="background-color:transparent">在底层，检查点功能由符合</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">BaseCheckpointSaver</span><span style="background-color:transparent">接口的检查点器对象提供支持。LangGraph 提供了几种检查点器实现，都是通过独立的、可安装的库实现的：</span></p>

<ul><li id="t-sSBdNKDaDNoz3SeWWMvCz1"><span>langgraph-checkpoint</span><span>：检查点保存器的基础接口（</span><span style="border-bottom:1px solid;font-weight:bold">BaseCheckpointSaver</span><span>）和序列化/反序列化接口（</span><span style="border-bottom:1px solid;font-weight:bold">SerializerProtocol</span><span>）。包含用于实验的内存检查点器实现（</span><span style="border-bottom:1px solid;font-weight:bold">InMemorySaver</span><span>）。LangGraph 内置了</span><span>langgraph-checkpoint</span><span>。</span></li></ul>

<ul><li id="t-orDdkl87h5DZZbJwLjfK10"><span>langgraph-checkpoint-sqlite</span><span>：使用 SQLite 数据库的 LangGraph 检查点器实现（</span><span style="border-bottom:1px solid;font-weight:bold">SqliteSaver</span><span>/</span><span style="border-bottom:1px solid;font-weight:bold">AsyncSqliteSaver</span><span>）。适用于实验和本地工作流。需要单独安装。</span></li></ul>

<ul><li id="t-mwZE7Tanami9vzMtv1x0K3"><span>langgraph-checkpoint-postgres</span><span>：使用 Postgres 数据库的高级检查点器（</span><span style="border-bottom:1px solid;font-weight:bold">PostgresSaver</span><span>/</span><span style="border-bottom:1px solid;font-weight:bold">AsyncPostgresSaver</span><span>），在 LangSmith 中使用。适用于生产环境。需要单独安装。</span></li></ul>


<a id="section-0893"></a>
## 检查点器接口

<a id="t-N59U26kMdq0FXS6hlG1kRt"></a>

<p id="t-b2kncg4oYca9vzSGlOYE4X"><span style="background-color:transparent">每个检查点器都符合</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">BaseCheckpointSaver</span><span style="background-color:transparent">接口，并实现以下方法：</span></p>

<ul><li id="t-SqFceQ9cHmEGYxhkmGWGwq"><span>.put</span><span>- 存储一个检查点及其配置和元数据。</span></li></ul>

<ul><li id="t-Y5Vaid5Xze29CJdHZwOVwC"><span>.put_writes</span><span> - 存储与检查点关联的中间写入（即 </span><span style="border-bottom:1px solid;font-weight:bold">待定写入</span><span>）。</span></li></ul>

<ul><li id="t-hTFjLTJZ74FvDLlvGS6cDq"><span>.get_tuple</span><span>- 根据给定配置（</span><span>thread_id</span><span>和</span><span>checkpoint_id</span><span>）获取检查点元组。这用于在</span><span>graph.get_state()</span><span>中填充</span><span>StateSnapshot</span><span>。</span></li></ul>

<ul><li id="t-2GDjkbtRHGyVI9iDizIQXw"><span>.list</span><span>- 列出符合给定配置和筛选条件的检查点。这用于在</span><span>graph.get_state_history()</span><span>中填充状态历史记录。</span></li></ul>

<p id="t-IvlLUAPDSs08r3fakBd1ZM"><span style="background-color:transparent">如果检查点器用于异步图执行（即通过</span><span style="background-color:transparent">.ainvoke</span><span style="background-color:transparent">、</span><span style="background-color:transparent">.astream</span><span style="background-color:transparent">、</span><span style="background-color:transparent">.abatch</span><span style="background-color:transparent">执行图），则将使用上述方法的异步版本（</span><span style="background-color:transparent">.aput</span><span style="background-color:transparent">、</span><span style="background-color:transparent">.aput_writes</span><span style="background-color:transparent">、</span><span style="background-color:transparent">.aget_tuple</span><span style="background-color:transparent">、</span><span style="background-color:transparent">.alist</span><span style="background-color:transparent">）。</span></p>

<p id="t-DxnUo2zBd5QYrecorJSKfK"><span>要异步运行图，您可以使用</span><span style="border-bottom:1px solid;font-weight:bold">InMemorySaver</span><span>，或者 Sqlite/Postgres 检查点器的异步版本——</span><span style="border-bottom:1px solid;font-weight:bold">AsyncSqliteSaver</span><span>/</span><span style="border-bottom:1px solid;font-weight:bold">AsyncPostgresSaver</span><span>检查点器。</span></p>


<a id="section-0894"></a>
## 序列化器

<a id="t-C5rLkqXMEc4b0DBjJu3XcN"></a>

<p id="t-QCGcPaw1S2rV3PC8GCQvV8"><span style="background-color:transparent">当检查点器保存图状态时，它们需要序列化状态中的通道值。这是通过序列化器对象完成的。</span></p>

<p id="t-Pck6EpJQ63qwkllTUgSOLp"><span style="background-color:transparent">langgraph_checkpoint</span><span style="background-color:transparent"> 定义了用于实现序列化器的 </span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">协议</span><span style="background-color:transparent">，并提供了一个默认实现（</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">JsonPlusSerializer</span><span style="background-color:transparent">），该实现处理多种类型，包括 LangChain 和 LangGraph 原语、日期时间、枚举等。</span></p>

<a id="t-rMEGTyw8kIDriygHxivLr5"></a>

##### 使用 pickle 进行序列化

<p id="t-ZwmJezkVINJKFh8k4VKqyX"><span style="background-color:transparent">默认的序列化器</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">JsonPlusSerializer</span><span style="background-color:transparent">在底层使用 ormsgpack 和 JSON，这不适用于所有类型的对象。</span></p>

<p id="t-PsXKRfoc69lteV7BW2OKFy"><span style="background-color:transparent">如果您希望对我们当前的 msgpack 编码器不支持的对象（例如 Pandas 数据框）回退到 pickle，可以使用</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">JsonPlusSerializer</span><span style="background-color:transparent">的</span><span style="background-color:transparent">pickle_fallback</span><span style="background-color:transparent">参数：</span></p>

<pre id="t-nvLrqbKD1QyuN6uJ2ZicfC"><code>from langgraph.checkpoint.memory import InMemorySaver
from langgraph.checkpoint.serde.jsonplus import JsonPlusSerializer

# ... Define the graph ...
graph.compile(
checkpointer=InMemorySaver(serde=JsonPlusSerializer(pickle_fallback=True))
)</code></pre>

<a id="t-zE4zN7osGUIV1Ydyq6gavv"></a>

##### 加密

<p id="t-a8HxnJF30MSmNv6oHCVShR"><span style="background-color:transparent">检查点器可以选择性地加密所有持久化的状态。要启用此功能，请将</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">EncryptedSerializer</span><span style="background-color:transparent">的实例传递给任何</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">BaseCheckpointSaver</span><span style="background-color:transparent">实现的</span><span style="background-color:transparent">serde</span><span style="background-color:transparent">参数。创建加密序列化器最简单的方法是通过</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">from_pycryptodome_aes</span><span style="background-color:transparent">，它从</span><span style="background-color:transparent">LANGGRAPH_AES_KEY</span><span style="background-color:transparent">环境变量中读取 AES 密钥（或接受</span><span style="background-color:transparent">key</span><span style="background-color:transparent">参数）：</span></p>

<pre id="t-qsQqIrXkt2RjtpjCFW6BW2"><code>import sqlite3

from langgraph.checkpoint.serde.encrypted import EncryptedSerializer
from langgraph.checkpoint.sqlite import SqliteSaver

serde = EncryptedSerializer.from_pycryptodome_aes() # reads LANGGRAPH_AES_KEY
checkpointer = SqliteSaver(sqlite3.connect("checkpoint.db"), serde=serde)</code></pre>

<pre id="t-6lbzZmJ8XEzlZvDAU4Vpa3"><code>from langgraph.checkpoint.serde.encrypted import EncryptedSerializer
from langgraph.checkpoint.postgres import PostgresSaver

serde = EncryptedSerializer.from_pycryptodome_aes()
checkpointer = PostgresSaver.from_conn_string("postgresql://...", serde=serde)
checkpointer.setup()</code></pre>

<p id="t-UadPqvxEpCVnWJX7vz4BzX"><span style="background-color:transparent">在 LangSmith 上运行时，只要存在</span><span style="background-color:transparent">LANGGRAPH_AES_KEY</span><span style="background-color:transparent">，加密就会自动启用，因此您只需要提供环境变量。其他加密方案可以通过实现</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">CipherProtocol</span><span style="background-color:transparent">并将其提供给</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">EncryptedSerializer</span><span style="background-color:transparent">来使用。</span></p>


<a id="section-0896"></a>
## 人在回路

<a id="t-iJkbk1P9V6jfZpH8WZmLxJ"></a>

<p id="t-WeRxsuHOwrhefukVOIw9hD"><span style="background-color:transparent">首先，检查点器通过允许人类检查、中断和批准图步骤，促进了 </span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">人在回路工作流</span><span style="background-color:transparent">。这些工作流需要检查点器，因为人类必须能够随时查看图的状态，并且图必须在人类对状态进行任何更新后能够恢复执行。</span></p>


<a id="section-0897"></a>
## 记忆

<a id="t-y1S9Aju0XapH3fJCt9dsBI"></a>

<p id="t-KnvxtJX8DdeUg6YnSjFoaI"><span style="background-color:transparent">其次，检查点器允许在交互之间实现 </span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">"记忆"</span><span style="background-color:transparent">。在重复的人类交互（如对话）中，任何后续消息都可以发送到该线程，该线程将保留对先前消息的记忆。有关如何使用检查点器添加和管理对话记忆的信息，请参阅 </span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">添加记忆</span><span style="background-color:transparent">。</span></p>


<a id="section-0898"></a>
## 时间旅行

<a id="t-MEvbGTjZtUkb8QYjWzpsct"></a>

<p id="t-QbrrkmsBO9N69vwgOmnA7H"><span style="background-color:transparent">第三，检查点器允许 </span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">"时间旅行"</span><span style="background-color:transparent">，使用户能够重放先前的图执行，以审查和/或调试特定的图步骤。此外，检查点器使得可以在任意检查点处分叉图状态，以探索不同的轨迹。</span></p>


<a id="section-0899"></a>
## 容错性

<a id="t-iEov98xaU76O9Ung80xu77"></a>

<p id="t-AFBpsQklHf1OlFkFS0kl68"><span style="background-color:transparent">最后，检查点还提供了容错性和错误恢复能力：如果一个或多个节点在某个超步中失败，您可以从最后一个成功的步骤重新启动图。此外，当图节点在某个超步中执行失败时，LangGraph 会存储该超步中任何其他成功完成的节点的待定检查点写入，这样无论何时我们从该超步恢复图执行，都不会重新运行成功的节点。</span></p>

<a id="t-TDsScSStS67XxYBpVkMJFd"></a>

##### 待定写入

<p id="t-LcFiNU6zf6BoYDROTxAnHU"><span style="background-color:transparent">此外，当图节点在某个超步中执行失败时，LangGraph 会存储该超步中任何其他成功完成的节点的待定检查点写入，这样无论何时我们从该超步恢复图执行，都不会重新运行成功的节点。</span></p>


<a id="section-0900"></a>
## 持久化执行

<a id="t-block-17723"></a>

<p id="t-M1iZ3UrsFvj3UlE4K4Kt1q"><span style="font-weight:bold;background-color:transparent">持久化执行</span><span style="background-color:transparent">是一种技术，通过该技术，进程或工作流在关键点保存其进度，使其能够暂停并在之后从停止处精确恢复。这在需要</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">人机协同</span><span style="background-color:transparent">的场景中尤其有用，用户可以在继续之前检查、验证或修改流程；同时，它也适用于可能遇到中断或错误（例如，调用 LLM 超时）的长时间运行任务。通过保留已完成的工作，持久化执行使得进程能够恢复而无需重新处理之前的步骤——即使在经历显著延迟（例如，一周后）之后。</span></p>

<p id="t-yA3er7lw5Br2mkyhRjSvWm"><span style="background-color:transparent">LangGraph 内置的</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">持久化</span><span style="background-color:transparent">层为工作流提供了持久化执行功能，确保每个执行步骤的状态都保存到持久化存储中。此功能保证了如果工作流被中断——无论是由于系统故障还是为了</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">人机协同</span><span style="background-color:transparent">交互——它都可以从最后记录的状态恢复。</span></p>

<p id="t-hcHt8gMp5mnNptAyZ7dZfp"><span>如果你正在使用带有检查点（checkpointer）的 LangGraph，那么你已经启用了持久化执行。你可以在任何点暂停和恢复工作流，即使在中断或故障之后。 为了充分利用持久化执行，请确保你的工作流被设计为</span><span style="border-bottom:1px solid;font-weight:bold">确定性的</span><span>和</span><span style="border-bottom:1px solid;font-weight:bold">幂等的</span><span>，并将任何副作用或非确定性操作包装在</span><span style="border-bottom:1px solid;font-weight:bold">任务</span><span>内部。你可以同时使用</span><span style="border-bottom:1px solid;font-weight:bold">StateGraph (Graph API)</span><span> 和</span><span style="border-bottom:1px solid;font-weight:bold">Functional API</span><span> 中的</span><span style="border-bottom:1px solid;font-weight:bold">任务</span><span>。</span></p>


<a id="section-0901"></a>
## 要求

<a id="t-c46oCOhr1moKphCuJsiA7K"></a>

<p id="t-nebx6Y2sWk1iaLzhmrYyB8"><span style="background-color:transparent">为了在 LangGraph 中利用持久化执行，你需要：</span></p>

<ol start="1"><li id="t-Ffeq1d3UJeINXewZzKFK97"><span>通过指定一个将保存工作流进度的</span><span style="border-bottom:1px solid;font-weight:bold">检查点器</span><span>来在工作流中启用</span><span style="border-bottom:1px solid;font-weight:bold">持久化</span><span>。</span></li></ol>

<ol start="2"><li id="t-81LRvqzldaOUvZ0CyRJquo"><span>在执行工作流时指定一个</span><span style="border-bottom:1px solid;font-weight:bold">线程标识符</span><span>。这将跟踪特定工作流实例的执行历史。</span></li></ol>

<ol start="3"><li id="t-HwCF2sv4XVqNaQ2jVRiri5"><span>将任何非确定性操作（例如，随机数生成）或具有副作用的操作（例如，文件写入、API 调用）包装在 </span><span style="border-bottom:1px solid;font-weight:bold">task</span><span> 内部，以确保当工作流恢复时，这些操作不会针对特定运行重复执行，而是从持久化层检索其结果。更多信息，请参阅</span><span style="border-bottom:1px solid;font-weight:bold">确定性与一致性重放</span><span>。</span></li></ol>


<a id="section-0902"></a>
## 确定性与一致性重放

<a id="t-Xhbs54p29aVV3zzirQbCJP"></a>

<p id="t-zkLiXAyVTgVtgBlZVavS3O"><span style="background-color:transparent">当你恢复一个工作流运行时，代码</span><span style="font-weight:bold;background-color:transparent">不会</span><span style="background-color:transparent">从执行停止的</span><span style="font-weight:bold;background-color:transparent">同一行代码</span><span style="background-color:transparent">恢复；相反，它将识别一个合适的</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">起始点</span><span style="background-color:transparent">来从中断处继续。这意味着工作流将从</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">起始点</span><span style="background-color:transparent">开始重放所有步骤，直到到达它被停止的点。</span></p>

<p id="t-oIsODMwHnZ8WYDzbRkbDaH"><span style="background-color:transparent">因此，当你为持久化执行编写工作流时，必须将任何非确定性操作（例如，随机数生成）和任何具有副作用的操作（例如，文件写入、API 调用）包装在</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">任务</span><span style="background-color:transparent">或</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">节点</span><span style="background-color:transparent">内部。</span></p>

<p id="t-EWswjquYwcnBOg3Q9yzKZ1"><span style="background-color:transparent">为确保你的工作流是确定性的并且可以一致地重放，请遵循以下准则：</span></p>

<ul><li id="t-TiYKkhHRajmvAk4PKz678d"><span style="font-weight:bold">避免重复工作</span><span>：如果一个</span><span style="border-bottom:1px solid;font-weight:bold">节点</span><span>包含多个具有副作用的操作（例如，日志记录、文件写入或网络调用），请将每个操作包装在单独的</span><span style="font-weight:bold">任务</span><span>中。这确保了当工作流恢复时，操作不会重复，并且它们的结果是从持久化层检索的。</span></li></ul>

<ul><li id="t-Bx8oxXzY2llsCs3lm9BZmT"><span style="font-weight:bold">封装非确定性操作</span><span>：将任何可能产生非确定性结果的代码（例如，随机数生成）包装在</span><span style="font-weight:bold">任务</span><span>或</span><span style="font-weight:bold">节点</span><span>内部。这确保了在恢复时，工作流遵循完全相同的记录步骤序列，并产生相同的结果。</span></li></ul>

<ul><li id="t-xNJgoV7rBGbl8ckO74hZZj"><span style="font-weight:bold">使用幂等操作</span><span>：在可能的情况下，确保副作用（例如，API 调用、文件写入）是幂等的。这意味着如果操作在工作流失败后重试，它将产生与第一次执行时相同的效果。这对于导致数据写入的操作尤其重要。如果</span><span style="font-weight:bold">任务</span><span>开始但未能成功完成，工作流的恢复将重新运行该</span><span style="font-weight:bold">任务</span><span>，并依赖记录的结果来保持一致性。使用幂等性键或验证现有结果，以避免意外的重复，确保工作流执行平稳且可预测。</span></li></ul>

<p id="t-y7iKDb80UiUq5jZyBS54bF"><span style="background-color:transparent">有关需要避免的常见陷阱示例，请参阅功能 API 中的</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">常见陷阱</span><span style="background-color:transparent">部分，该部分展示了如何使用</span><span style="font-weight:bold;background-color:transparent">任务</span><span style="background-color:transparent">来构建代码以避免这些问题。相同的原则适用于 </span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">StateGraph (Graph API)</span><span style="background-color:transparent">。</span></p>


<a id="section-0903"></a>
## 持久化模式

<a id="t-4PloEWWRmh6MCaD2k36PAO"></a>

<p id="t-cyUsAHdRg8AEnsR4fnJxAo"><span style="background-color:transparent">LangGraph 支持三种持久化模式，允许你根据应用程序的需求在性能和数据一致性之间进行权衡。更高的持久化模式会给工作流执行带来更多开销。你可以在调用任何图执行方法时指定持久化模式：</span></p>

<pre id="t-RHmbvuEK6bTXiFdt57aVqe"><code>graph.stream(
{"input": "test"},
durability="sync"
)</code></pre>

<p id="t-BMaLWglcWCZrzF3lqVXkjl"><span style="background-color:transparent">持久化模式，从最不持久到最持久，如下所示：</span></p>

<ul><li id="t-a7eAkac8nfhTinGb3oPttQ"><span>"exit"</span><span>：仅在图执行退出时（无论是成功、出错还是由于中断）持久化更改。这为长时间运行的图提供了最佳性能，但意味着中间状态不会被保存，因此你无法从执行过程中发生的系统故障（例如，进程崩溃）中恢复。</span></li></ul>

<ul><li id="t-J48RHFTIvU3v1DUIk6dTpo"><span>"async"</span><span>：在下一步执行时异步持久化更改。这提供了良好的性能和持久性，但如果进程在执行期间崩溃，检查点可能无法写入的风险很小。</span></li></ul>

<ul><li id="t-nO4KlwbZ3CSlQKsqWHfL6v"><span>"sync"</span><span>：在下一步开始之前同步持久化更改。这确保了每个检查点在继续执行之前都被写入，以一定的性能开销为代价提供了高持久性。</span></li></ul>


<a id="section-0904"></a>
## 在节点中使用任务

<a id="t-ylXmiZOJ2f5AGrAlEhbbBU"></a>

<p id="t-HhSfmeWNdHp9GGOiYpwdfJ"><span style="background-color:transparent">如果一个</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">节点</span><span style="background-color:transparent">包含多个操作，你可能会发现将每个操作转换为一个</span><span style="font-weight:bold;background-color:transparent">任务</span><span style="background-color:transparent">比将操作重构为单独的节点更容易。</span></p>

<p id="t-5EDRqVcg9cHvPFeiSso3N5"><span style="border-bottom:1px solid;font-weight:bold">原始版本</span></p>

<p id="t-WGazYlzSpxYtufOXYfHUga"><span style="border-bottom:1px solid;font-weight:bold">使用任务</span></p>

<pre id="t-f3aCwxnI08isHh9QPQRUwu"><code>from typing import NotRequired
from typing_extensions import TypedDict
import uuid

from langgraph.checkpoint.memory import InMemorySaver
from langgraph.graph import StateGraph, START, END
import requests

# Define a TypedDict to represent the state
class State(TypedDict):
url: str
result: NotRequired[str]

def call_api(state: State):
"""Example node that makes an API request."""
result = requests.get(state['url']).text[:100] # Side-effect  #
return {
"result": result
}

# Create a StateGraph builder and add a node for the call_api function
builder = StateGraph(State)
builder.add_node("call_api", call_api)

# Connect the start and end nodes to the call_api node
builder.add_edge(START, "call_api")
builder.add_edge("call_api", END)

# Specify a checkpointer
checkpointer = InMemorySaver()

# Compile the graph with the checkpointer
graph = builder.compile(checkpointer=checkpointer)

# Define a config with a thread ID.
thread_id = uuid.uuid4()
config = {"configurable": {"thread_id": thread_id}}

# Invoke the graph
graph.invoke({"url": "https://www.example.com"}, config)</code></pre>


<a id="section-0905"></a>
## 恢复工作流

<a id="t-HiIlmA5jDyk6wdzam4GrYl"></a>

<p id="t-NlovpHu6rwYi68ZpPHud7v"><span style="background-color:transparent">一旦你在工作流中启用了持久化执行，你就可以在以下场景中恢复执行：</span></p>

<ul><li id="t-Tzgc3OKgtWyHRXYIHqzvlz"><span style="font-weight:bold">暂停和恢复工作流</span><span>：使用 </span><span style="border-bottom:1px solid;font-weight:bold">interrupt</span><span> 函数在特定点暂停工作流，并使用 </span><span style="border-bottom:1px solid;font-weight:bold">Command</span><span> 原语以更新后的状态恢复它。更多细节请参阅</span><span style="border-bottom:1px solid;font-weight:bold">中断</span><span>。</span></li></ul>

<ul><li id="t-19i1BbkUkFaBfnGxzhfwRp"><span style="font-weight:bold">从故障中恢复</span><span>：在异常（例如，LLM 提供商中断）后，从最后一个成功的检查点自动恢复工作流。这涉及通过提供 </span><span>None</span><span> 作为输入值，使用相同的线程标识符执行工作流</span></li></ul>


<a id="section-0906"></a>
## 恢复工作流的起始点

<a id="t-ok1KOkw9rxAJa8aJwK6Ysr"></a>

<ul><li id="t-kdJuergPfijBo40GZ0HaDJ"><span>如果你正在使用 </span><span style="border-bottom:1px solid;font-weight:bold">StateGraph (Graph API)</span><span>，起始点是执行停止的</span><span style="border-bottom:1px solid;font-weight:bold">节点</span><span>的开头。</span></li></ul>

<ul><li id="t-xgPRIscIsCwEcFTcNvU6y0"><span>如果你在节点内部调用子图，起始点将是调用被暂停子图的</span><span style="font-weight:bold">父</span><span>节点。 在子图内部，起始点将是执行停止的特定</span><span style="border-bottom:1px solid;font-weight:bold">节点</span><span>。</span></li></ul>

<ul><li id="t-ryw1bAIiDwsFomGANWmjUt"><span>如果你正在使用功能 API，起始点是执行停止的</span><span style="border-bottom:1px solid;font-weight:bold">入口点</span><span>的开头。</span></li></ul>


<a id="section-0907"></a>
## 流式传输

<a id="t-block-17760"></a>

<p id="t-leIylJEZ9USVgRB9PLYQcA"><span style="background-color:transparent">LangGraph 实现了流式处理系统，以提供实时更新。流式处理对于提升基于 LLM 构建的应用程序的响应能力至关重要。通过逐步显示输出，甚至在完整响应准备就绪之前，流式处理能显著改善用户体验，尤其是在处理 LLM 的延迟时。</span></p>

<p id="t-412g4VquUqfhsE3HoNpRoE"><span style="background-color:transparent">LangGraph 流式处理可实现的功能：</span></p>

<ul><li id="t-FYVqsAyvECE77mYsMlkqr0"><span style="font-weight:bold">流式传输图状态</span><span> — 通过 </span><span>updates</span><span> 和 </span><span>values</span><span> 模式获取状态更新/值。</span></li></ul>

<ul><li id="t-RPJNzLuWhWVSVyztP3wyKz"><span style="font-weight:bold">流式传输子图输出</span><span> — 包含父图和任何嵌套子图的输出。</span></li></ul>

<ul><li id="t-qgoO0lFMNmTcMBd4BE2LVv"><span style="font-weight:bold">流式传输 LLM 令牌</span><span> — 从节点、子图或工具内部捕获令牌流。</span></li></ul>

<ul><li id="t-7j3gDy5ZyF4HG9qD4VFxhR"><span style="font-weight:bold">流式传输自定义数据</span><span> — 直接从工具函数发送自定义更新或进度信号。</span></li></ul>

<ul><li id="t-PioUY1MOYtuO4spVPIoQYg"><span style="font-weight:bold">使用多种流模式</span><span> — 从 </span><span>values</span><span>（完整状态）、</span><span>updates</span><span>（状态增量）、</span><span>messages</span><span>（LLM 令牌 + 元数据）、</span><span>custom</span><span>（任意用户数据）或 </span><span>debug</span><span>（详细跟踪）中选择。</span></li></ul>


<a id="section-0908"></a>
## 支持的流模式

<a id="t-SFbhPERTKRq7ZWLciLdsm0"></a>

<p id="t-4lFaGLEM4tiVEqQtvd04gX"><span style="background-color:transparent">将一个或多个以下流模式作为列表传递给</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">stream</span><span style="background-color:transparent">或</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">astream</span><span style="background-color:transparent">方法：</span></p>

<div id="t-QXnCLVyHKdPKIfhjZtNS6k"><table><colgroup><col width="120"/><col width="583.671875"/></colgroup><tbody><tr><td><p><span>模式</span></p></td><td><p><span>描述</span></p></td></tr><tr><td><p><span>values</span></p></td><td><p><span>在图执行的每一步之后流式传输状态的完整值。</span></p></td></tr><tr><td><p><span>updates</span></p></td><td><p><span>在图执行的每一步之后流式传输状态的更新。如果在同一步骤中进行了多次更新（例如，运行了多个节点），这些更新将分别流式传输。</span></p></td></tr><tr><td><p><span>custom</span></p></td><td><p><span>从图节点内部流式传输自定义数据。</span></p></td></tr><tr><td><p><span>messages</span></p></td><td><p><span>从任何调用 LLM 的图节点流式传输 2 元组（LLM 令牌，元数据）。</span></p></td></tr><tr><td><p><span>debug</span></p></td><td><p><span>在图执行过程中流式传输尽可能多的信息。</span></p></td></tr></tbody></table></div>


<a id="section-0909"></a>
## 基本用法示例

<a id="t-PUacFiUb01WCdZHW6eBAb1"></a>

<p id="t-4bCUJoSSTuCWy7FSZ6RZAI"><span style="background-color:transparent">LangGraph 图暴露了</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">stream</span><span style="background-color:transparent">（同步）和</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">astream</span><span style="background-color:transparent">（异步）方法，以迭代器的形式产生流式输出。</span></p>

<pre id="t-azyvqGZWU7Amo8UOsn4zHM"><code>for chunk in graph.stream(inputs, stream_mode="updates"):
print(chunk)</code></pre>

<p id="t-ljnO8VX0lryd8Jl6R2Cl2q"><span style="font-weight:bold">扩展示例：流式传输更新：</span></p>

<pre id="t-2nMWcoGbvYHI64ZgO7q60f"><code>from typing import TypedDict
from langgraph.graph import StateGraph, START, END

class State(TypedDict):
topic: str
joke: str

def refine_topic(state: State):
return {"topic": state["topic"] + " and cats"}

def generate_joke(state: State):
return {"joke": f"This is a joke about {state['topic']}"}

graph = (
StateGraph(State)
.add_node(refine_topic)
.add_node(generate_joke)
.add_edge(START, "refine_topic")
.add_edge("refine_topic", "generate_joke")
.add_edge("generate_joke", END)
.compile()
)

# The stream() method returns an iterator that yields streamed outputs
for chunk in graph.stream(
{"topic": "ice cream"},
# Set stream_mode="updates" to stream only the updates to the graph state after each node
# Other stream modes are also available. See supported stream modes for details
stream_mode="updates",
):
print(chunk)</code></pre>

<pre id="t-r6UxJuF48s5zAGrkngFWiQ"><code>{'refineTopic': {'topic': 'ice cream and cats'}}
{'generateJoke': {'joke': 'This is a joke about ice cream and cats'}}</code></pre>


<a id="section-0910"></a>
## 流式传输多种模式

<a id="t-jxuke4S3kLSPulhAeAeYGX"></a>

<p id="t-BnbCTjyhJ9o1AIazwFOs3b"><span style="background-color:transparent">你可以传递一个列表作为</span><span style="background-color:transparent">stream_mode</span><span style="background-color:transparent">参数，以同时流式传输多种模式。</span></p>

<p id="t-zmNVovdKn42O3bsB90wjOF"><span style="background-color:transparent">流式输出将是</span><span style="background-color:transparent">(mode, chunk)</span><span style="background-color:transparent">元组，其中</span><span style="background-color:transparent">mode</span><span style="background-color:transparent">是流模式的名称，</span><span style="background-color:transparent">chunk</span><span style="background-color:transparent">是该模式流式传输的数据。</span></p>

<pre id="t-db50zeMmW0KA8phXDBWr8F"><code>for mode, chunk in graph.stream(inputs, stream_mode=["updates", "custom"]):
print(chunk)</code></pre>


<a id="section-0911"></a>
## 流式传输图状态

<a id="t-hhv2GJrRYNRY4tNLQ70In7"></a>

<p id="t-9bfHgE4OU35xQlKRKzBk8k"><span style="background-color:transparent">使用流模式</span><span style="background-color:transparent">updates</span><span style="background-color:transparent">和</span><span style="background-color:transparent">values</span><span style="background-color:transparent">来流式传输图执行时的状态。</span></p>

<ul><li id="t-2kLJWKVOUStjTU1qcxSR2Y"><span>updates</span><span>流式传输图每一步之后状态的</span><span style="font-weight:bold">更新</span><span>。</span></li></ul>

<ul><li id="t-4BBwlIJ6VVj8gUlrLXinfb"><span>values</span><span>流式传输图每一步之后状态的</span><span style="font-weight:bold">完整值</span><span>。</span></li></ul>

<pre id="t-wpTFPNq34YFtQpEoIdS4jQ"><code>from typing import TypedDict
from langgraph.graph import StateGraph, START, END

class State(TypedDict):
topic: str
joke: str

def refine_topic(state: State):
return {"topic": state["topic"] + " and cats"}

def generate_joke(state: State):
return {"joke": f"This is a joke about {state['topic']}"}

graph = (
StateGraph(State)
.add_node(refine_topic)
.add_node(generate_joke)
.add_edge(START, "refine_topic")
.add_edge("refine_topic", "generate_joke")
.add_edge("generate_joke", END)
.compile()
)</code></pre>

<p id="t-SQEVjJA9DIrMN6wHlZkdmO"><span>使用此模式仅流式传输节点每一步之后返回的</span><span style="font-weight:bold">状态更新</span><span>。流式输出包括节点名称以及更新内容。</span></p>

<pre id="t-Fg9VrCWhlgDqmVtNVlv2Pp"><code>for chunk in graph.stream(
{"topic": "ice cream"},
stream_mode="updates",
):
print(chunk)</code></pre>


<a id="section-0912"></a>
## 流式传输子图输出

<a id="t-hLQnlfHKPxra40jvKpvGmj"></a>

<p id="t-eUMZMAxtGrEtKQwkWFJnaq"><span style="background-color:transparent">要在流式输出中包含</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">子图</span><span style="background-color:transparent">的输出，可以在父图的 </span><span style="background-color:transparent">.stream()</span><span style="background-color:transparent"> 方法中设置 </span><span style="background-color:transparent">subgraphs=True</span><span style="background-color:transparent">。这将同时流式传输父图和任何子图的输出。</span></p>

<p id="t-Q83SI2XVsrhv5nqQ5Y3Eiw"><span style="background-color:transparent">输出将作为元组</span><span style="background-color:transparent">(namespace, data)</span><span style="background-color:transparent">流式传输，其中</span><span style="background-color:transparent">namespace</span><span style="background-color:transparent">是一个元组，包含调用子图的节点路径，例如</span><span style="background-color:transparent">("parent_node:&lt;task_id&gt;", "child_node:&lt;task_id&gt;")</span><span style="background-color:transparent">。</span></p>

<pre id="t-nzrOLDtwiipBZgWYhTuvWZ"><code>for chunk in graph.stream(
{"foo": "foo"},
# Set subgraphs=True to stream outputs from subgraphs
subgraphs=True,
stream_mode="updates",
):
print(chunk)</code></pre>

<p id="t-wQ2Jvhs3t3LZyfAND4ki4X"><span style="font-weight:bold;background-color:transparent;color:#1f1f1f">扩展示例：从子图流式传输</span></p>

<pre id="t-fw7uNlmpyBnvS3FYrpB8tK"><code>from langgraph.graph import START, StateGraph
from typing import TypedDict

# Define subgraph
class SubgraphState(TypedDict):
foo: str # note that this key is shared with the parent graph state
bar: str

def subgraph_node_1(state: SubgraphState):
return {"bar": "bar"}

def subgraph_node_2(state: SubgraphState):
return {"foo": state["foo"] + state["bar"]}

subgraph_builder = StateGraph(SubgraphState)
subgraph_builder.add_node(subgraph_node_1)
subgraph_builder.add_node(subgraph_node_2)
subgraph_builder.add_edge(START, "subgraph_node_1")
subgraph_builder.add_edge("subgraph_node_1", "subgraph_node_2")
subgraph = subgraph_builder.compile()

# Define parent graph
class ParentState(TypedDict):
foo: str

def node_1(state: ParentState):
return {"foo": "hi! " + state["foo"]}

builder = StateGraph(ParentState)
builder.add_node("node_1", node_1)
builder.add_node("node_2", subgraph)
builder.add_edge(START, "node_1")
builder.add_edge("node_1", "node_2")
graph = builder.compile()

for chunk in graph.stream(
{"foo": "foo"},
stream_mode="updates",
# Set subgraphs=True to stream outputs from subgraphs
subgraphs=True,
):
print(chunk)</code></pre>

<pre id="t-9PKn1yxM7hpHTnUrPypAZl"><code>((), {'node_1': {'foo': 'hi! foo'}})
(('node_2:dfddc4ba-c3c5-6887-5012-a243b5b377c2',), {'subgraph_node_1': {'bar': 'bar'}})
(('node_2:dfddc4ba-c3c5-6887-5012-a243b5b377c2',), {'subgraph_node_2': {'foo': 'hi! foobar'}})
((), {'node_2': {'foo': 'hi! foobar'}})</code></pre>

<p id="t-1Vag5JnZh2f6yBGeWI1Bt8"><span style="font-weight:bold">注意</span><span>，我们接收到的不仅仅是节点更新，还包括命名空间，这些命名空间告诉我们正在从哪个图（或子图）进行流式传输。</span></p>


<a id="section-0913"></a>
## 调试

<a id="t-S9lXfmkVjdnCHm9eiBG8lx"></a>

<p id="t-9KhA0qi1Ll0JnPU0YhBT1x"><span style="background-color:transparent">使用</span><span style="background-color:transparent">debug</span><span style="background-color:transparent">流模式在图执行过程中流式传输尽可能多的信息。流式输出包括节点名称以及完整状态。</span></p>

<pre id="t-yRbhrOeqaKZhkCNeTS291h"><code>for chunk in graph.stream(
{"topic": "ice cream"},
stream_mode="debug",
):
print(chunk)</code></pre>


<a id="section-0914"></a>
## LLM 令牌

<a id="t-egSBewe1Z7SiFG9kghEJwY"></a>

<p id="t-DozBUk0LNajStsjoMNzPpJ"><span style="background-color:transparent">使用</span><span style="background-color:transparent">messages</span><span style="background-color:transparent">流模式从图的任何部分（包括节点、工具、子图或任务）</span><span style="font-weight:bold;background-color:transparent">逐令牌</span><span style="background-color:transparent">流式传输大语言模型输出。</span></p>

<p id="t-utlKX4W23nV6V1KAwYpVQo"><span style="background-color:transparent">来自 </span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">messages</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">模式</span><span style="background-color:transparent"> 的流式输出是一个元组 </span><span style="background-color:transparent">(message_chunk, metadata)</span><span style="background-color:transparent">，其中：</span></p>

<ul><li id="t-gD0X0RWxjdA7BmNlnYeyFs"><span>message_chunk</span><span>：来自 LLM 的令牌或消息片段。</span></li></ul>

<ul><li id="t-wvP3JyT9JIUE4cfro7ZkJG"><span>metadata</span><span>：包含图节点和 LLM 调用详细信息的字典。</span></li></ul>

<blockquote id="t-LUavcFTnLY8MKdBYhINUkj"><span style="background-color:transparent">如果你的 LLM 不作为 LangChain 集成提供，你可以改用 </span><span style="background-color:transparent">custom</span><span style="background-color:transparent"> 模式流式传输其输出。详情请参阅</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">与任何 LLM 一起使用</span><span style="background-color:transparent">。</span></blockquote>

<p id="t-uuqFw89b1HcBlxXyRy19FL"><span style="font-weight:bold">Python &lt; 3.11 异步需要手动配置</span><span> 当在 Python &lt; 3.11 中使用异步代码时，必须显式地将 </span><span style="border-bottom:1px solid;font-weight:bold">RunnableConfig</span><span> 传递给 </span><span>ainvoke()</span><span> 以启用正确的流式传输。详情请参阅 </span><span style="border-bottom:1px solid;font-weight:bold">Python &lt; 3.11 异步</span><span> 或升级到 Python 3.11+。</span></p>

<pre id="t-O50rhEjyvx5CRqNMkeGWPq"><code>from dataclasses import dataclass

from langchain.chat_models import init_chat_model
from langgraph.graph import StateGraph, START

@dataclass
class MyState:
topic: str
joke: str = ""

model = init_chat_model(model="gpt-4o-mini")

def call_model(state: MyState):
"""Call the LLM to generate a joke about a topic"""
# Note that message events are emitted even when the LLM is run using .invoke rather than .stream
model_response = model.invoke(
[
{"role": "user", "content": f"Generate a joke about {state.topic}"}
]
)
return {"joke": model_response.content}

graph = (
StateGraph(MyState)
.add_node(call_model)
.add_edge(START, "call_model")
.compile()
)

# The "messages" stream mode returns an iterator of tuples (message_chunk, metadata)
# where message_chunk is the token streamed by the LLM and metadata is a dictionary
# with information about the graph node where the LLM was called and other information
for message_chunk, metadata in graph.stream(
{"topic": "ice cream"},
stream_mode="messages",
):
if message_chunk.content:
print(message_chunk.content, end="|", flush=True)</code></pre>

<a id="t-qhbYkjZjLlTN5gTbInJd17"></a>

##### 按 LLM 调用过滤

<p id="t-2LjBExx1vxGf7vuT06MZJF"><span style="background-color:transparent">你可以为 LLM 调用关联</span><span style="background-color:transparent">tags</span><span style="background-color:transparent">，以按 LLM 调用过滤流式传输的令牌。</span></p>

<pre id="t-nkwzb3Ep7AfLrAK6JTtNo6"><code>from langchain.chat_models import init_chat_model

# model_1 is tagged with "joke"
model_1 = init_chat_model(model="gpt-4o-mini", tags=['joke'])
# model_2 is tagged with "poem"
model_2 = init_chat_model(model="gpt-4o-mini", tags=['poem'])

graph = ... # define a graph that uses these LLMs

# The stream_mode is set to "messages" to stream LLM tokens
# The metadata contains information about the LLM invocation, including the tags
async for msg, metadata in graph.astream(
{"topic": "cats"},
stream_mode="messages",
):
# Filter the streamed tokens by the tags field in the metadata to only include
# the tokens from the LLM invocation with the "joke" tag
if metadata["tags"] == ["joke"]:
print(msg.content, end="|", flush=True)</code></pre>

<p id="t-ONUrwEjQkl06aSbbb75ODe"><span style="background-color:transparent;color:#1f1f1f">扩展示例：按标签过滤</span></p>

<pre id="t-zqYINEOjcgIpArR4WBuymR"><code>from typing import TypedDict

from langchain.chat_models import init_chat_model
from langgraph.graph import START, StateGraph

# The joke_model is tagged with "joke"
joke_model = init_chat_model(model="gpt-4o-mini", tags=["joke"])
# The poem_model is tagged with "poem"
poem_model = init_chat_model(model="gpt-4o-mini", tags=["poem"])

class State(TypedDict):
      topic: str
      joke: str
      poem: str

async def call_model(state, config):
      topic = state["topic"]
 print("Writing joke...")
 # Note: Passing the config through explicitly is required for python &lt; 3.11
 # Since context var support wasn't added before then: https://docs.python.org/3/library/asyncio-task.html#creating-tasks
 # The config is passed through explicitly to ensure the context vars are propagated correctly
 # This is required for Python &lt; 3.11 when using async code. Please see the async section for more details
      joke_response = await joke_model.ainvoke(
 [{"role": "user", "content": f"Write a joke about {topic}"}],
            config,
 )
 print("\n\nWriting poem...")
      poem_response = await poem_model.ainvoke(
 [{"role": "user", "content": f"Write a short poem about {topic}"}],
            config,
 )
 return {"joke": joke_response.content, "poem": poem_response.content}

graph = (
      StateGraph(State)
 .add_node(call_model)
 .add_edge(START, "call_model")
 .compile()
)

# The stream_mode is set to "messages" to stream LLM tokens
# The metadata contains information about the LLM invocation, including the tags
async for msg, metadata in graph.astream(
 {"topic": "cats"},
      stream_mode="messages",
):
 if metadata["tags"] == ["joke"]:
 print(msg.content, end="|", flush=True)</code></pre>

<a id="t-4pPKpksZ2xv8X5o6OWkKkq"></a>

##### 按节点过滤

<p id="t-ghS9GLxQoe9BBQsy5N8SH1"><span style="background-color:transparent">要仅从特定节点流式传输令牌，请使用</span><span style="background-color:transparent">stream_mode="messages"</span><span style="background-color:transparent">并通过流式元数据中的</span><span style="background-color:transparent">langgraph_node</span><span style="background-color:transparent">字段过滤输出：</span></p>

<pre id="t-ACfBvy8XhkJN9iUkQR0iNh"><code># The "messages" stream mode returns a tuple of (message_chunk, metadata)
# where message_chunk is the token streamed by the LLM and metadata is a dictionary
# with information about the graph node where the LLM was called and other information
for msg, metadata in graph.stream(
inputs,
stream_mode="messages",
):
# Filter the streamed tokens by the langgraph_node field in the metadata
# to only include the tokens from the specified node
if msg.content and metadata["langgraph_node"] == "some_node_name":
...</code></pre>

<p id="t-LV4n7p9pYzdYVAMMoFrdl4"><span style="background-color:transparent;color:#1f1f1f">扩展示例：从特定节点流式传输 LLM 令牌</span></p>

<pre id="t-ns0QnnidDXGd1uA1rGTpYl"><code>from typing import TypedDict
from langgraph.graph import START, StateGraph
from langchain_openai import ChatOpenAI

model = ChatOpenAI(model="gpt-4o-mini")

class State(TypedDict):
      topic: str
      joke: str
      poem: str

def write_joke(state: State):
      topic = state["topic"]
      joke_response = model.invoke(
 [{"role": "user", "content": f"Write a joke about {topic}"}]
 )
 return {"joke": joke_response.content}

def write_poem(state: State):
      topic = state["topic"]
      poem_response = model.invoke(
 [{"role": "user", "content": f"Write a short poem about {topic}"}]
 )
 return {"poem": poem_response.content}

graph = (
      StateGraph(State)
 .add_node(write_joke)
 .add_node(write_poem)
 # write both the joke and the poem concurrently
 .add_edge(START, "write_joke")
 .add_edge(START, "write_poem")
 .compile()
)

# The "messages" stream mode returns a tuple of (message_chunk, metadata)
# where message_chunk is the token streamed by the LLM and metadata is a dictionary
# with information about the graph node where the LLM was called and other information
for msg, metadata in graph.stream(
 {"topic": "cats"},
    stream_mode="messages",
):
 # Filter the streamed tokens by the langgraph_node field in the metadata
 # to only include the tokens from the write_poem node
 if msg.content and metadata["langgraph_node"] == "write_poem":
 print(msg.content, end="|", flush=True)</code></pre>


<a id="section-0915"></a>
## 流式传输自定义数据

<a id="t-x2su9xzs4lMmbk2NZrzdoN"></a>

<p id="t-GjvglBPngF6N2yPAW4hSWe"><span style="background-color:transparent">要从 LangGraph 节点或工具内部发送</span><span style="font-weight:bold;background-color:transparent">自定义用户定义的数据</span><span style="background-color:transparent">，请按照以下步骤操作：</span></p>

<ol start="1"><li id="t-JloEv5VfNVF0hhtNNx6eQe"><span>使用</span><span style="border-bottom:1px solid;font-weight:bold">get_stream_writer</span><span>访问流写入器并发出自定义数据。</span></li></ol>

<ol start="2"><li id="t-06rpy7ikPaY8JE2wUCwGuu"><span>调用</span><span>.stream()</span><span>或</span><span>.astream()</span><span>时设置</span><span>stream_mode="custom"</span><span>以在流中获取自定义数据。你可以组合多种模式（例如</span><span>["updates", "custom"]</span><span>），但至少有一种必须是</span><span>"custom"</span><span>。</span></li></ol>

<p id="t-xc7oDVHav8qSdcMcYnNSia"><span style="font-weight:bold">Python &lt; 3.11 异步中无 </span><span style="border-bottom:1px solid;font-weight:bold">get_stream_writer</span><span> 在 Python &lt; 3.11 上运行的异步代码中，</span><span style="border-bottom:1px solid;font-weight:bold">get_stream_writer</span><span> 将不起作用。 相反，请向你的节点或工具添加一个 </span><span>writer</span><span> 参数并手动传递它。 用法示例请参阅 </span><span style="border-bottom:1px solid;font-weight:bold">Python &lt; 3.11 异步</span><span>。</span></p>

<p id="t-P4ut8Xt0mWIGK3B9HhTxS2"><span style="border-bottom:1px solid;font-weight:bold">节点</span></p>

<pre id="t-t7ghQUhCgCgv9NqG4CgqZ9"><code>from typing import TypedDict
from langgraph.config import get_stream_writer
from langgraph.graph import StateGraph, START

class State(TypedDict):
query: str
answer: str

def node(state: State):
# Get the stream writer to send custom data
writer = get_stream_writer()
# Emit a custom key-value pair (e.g., progress update)
writer({"custom_key": "Generating custom data inside node"})
return {"answer": "some data"}

graph = (
StateGraph(State)
.add_node(node)
.add_edge(START, "node")
.compile()
)

inputs = {"query": "example"}

# Set stream_mode="custom" to receive the custom data in the stream
for chunk in graph.stream(inputs, stream_mode="custom"):
print(chunk)</code></pre>


<a id="section-0916"></a>
## 与任何 LLM 一起使用

<a id="t-NxGyf6K1J3BDpEzSfX3Rfx"></a>

<p id="t-cITL5LHMMxqZRc7rKUF0wt"><span style="background-color:transparent">你可以使用</span><span style="background-color:transparent">stream_mode="custom"</span><span style="background-color:transparent">从</span><span style="font-weight:bold;background-color:transparent">任何 LLM API</span><span style="background-color:transparent">流式传输数据——即使该 API</span><span style="font-weight:bold;background-color:transparent">没有</span><span style="background-color:transparent">实现 LangChain 聊天模型接口。</span></p>

<p id="t-QqzGPJKGEvcTeBYpmA9HHn"><span style="background-color:transparent">这让你可以集成原始的 LLM 客户端或提供自己流式接口的外部服务，使 LangGraph 在自定义设置中具有高度灵活性。</span></p>

<pre id="t-4Xcb5pDSooSm4hZTXxeKPA"><code>from langgraph.config import get_stream_writer

def call_arbitrary_model(state):
"""Example node that calls an arbitrary model and streams the output"""
# Get the stream writer to send custom data
writer = get_stream_writer()
# Assume you have a streaming client that yields chunks
# Generate LLM tokens using your custom streaming client
for chunk in your_custom_streaming_client(state["topic"]):
# Use the writer to send custom data to the stream
writer({"custom_llm_chunk": chunk})
return {"result": "completed"}

graph = (
StateGraph(State)
.add_node(call_arbitrary_model)
# Add other nodes and edges as needed
.compile()
)
# Set stream_mode="custom" to receive the custom data in the stream
for chunk in graph.stream(
{"topic": "cats"},
stream_mode="custom",

):
# The chunk will contain the custom data streamed from the llm
print(chunk)</code></pre>

<pre id="t-wfm5BOyasZnKuQkJf6JNoZ"><code>import operator
import json

from typing import TypedDict
from typing_extensions import Annotated
from langgraph.graph import StateGraph, START

from openai import AsyncOpenAI

openai_client = AsyncOpenAI()
model_name = "gpt-4o-mini"

async def stream_tokens(model_name: str, messages: list[dict]):
response = await openai_client.chat.completions.create(
messages=messages, model=model_name, stream=True
)
role = None
async for chunk in response:
delta = chunk.choices[0].delta

if delta.role is not None:
role = delta.role

if delta.content:
yield {"role": role, "content": delta.content}

# this is our tool
async def get_items(place: str) -&gt; str:
"""Use this tool to list items one might find in a place you're asked about."""
writer = get_stream_writer()
response = ""
async for msg_chunk in stream_tokens(
model_name,
[
{
"role": "user",
"content": (
"Can you tell me what kind of items "
f"i might find in the following place: '{place}'. "
"List at least 3 such items separating them by a comma. "
"And include a brief description of each item."
),
}
],
):
response += msg_chunk["content"]
writer(msg_chunk)

return response

class State(TypedDict):
messages: Annotated[list[dict], operator.add]

# this is the tool-calling graph node
async def call_tool(state: State):
ai_message = state["messages"][-1]
tool_call = ai_message["tool_calls"][-1]

function_name = tool_call["function"]["name"]
if function_name != "get_items":
raise ValueError(f"Tool {function_name} not supported")

function_arguments = tool_call["function"]["arguments"]
arguments = json.loads(function_arguments)

function_response = await get_items(**arguments)
tool_message = {
"tool_call_id": tool_call["id"],
"role": "tool",
"name": function_name,
"content": function_response,
}
return {"messages": [tool_message]}

graph = (
StateGraph(State)
.add_node(call_tool)
.add_edge(START, "call_tool")
.compile()
)</code></pre>

<p id="t-UyMTtledYVRzNp7sV7oxRj"><span>让我们用一个包含工具调用的</span><span style="border-bottom:1px solid;font-weight:bold">AIMessage</span><span>来调用图：</span></p>

<pre id="t-AVZ0LisMO4zGlxJn69I2H4"><code>inputs = {
"messages": [
{
"content": None,
"role": "assistant",
"tool_calls": [
{
"id": "1",
"function": {
"arguments": '{"place":"bedroom"}',
"name": "get_items",
},
"type": "function",
}
],
}
]
}

async for chunk in graph.astream(
inputs,
stream_mode="custom",
):
print(chunk["content"], end="|", flush=True)</code></pre>


<a id="section-0917"></a>
## 为特定聊天模型禁用流式传输

<a id="t-cjzaN6uM8aA5LbAfCU40mr"></a>

<p id="t-P0IzbDTuimPbCb9S57Upj2"><span style="background-color:transparent">如果你的应用程序混合了支持流式传输和不支持流式传输的模型，你可能需要为不支持流式传输的模型显式禁用流式传输。</span></p>

<p id="t-Vse8L4EjGkdgrA2wEdUhpH"><span style="background-color:transparent">初始化模型时设置</span><span style="background-color:transparent">streaming=False</span><span style="background-color:transparent">。</span></p>

<p id="t-le7divn5JnvNB9NYtR9Oxn"><span style="border-bottom:1px solid;font-weight:bold">init_chat_model</span></p>

<p id="t-5GOSMZRSSJi1jUNWyJffOE"><span style="border-bottom:1px solid;font-weight:bold">聊天模型接口</span></p>

<pre id="t-vyuZwNXejwTKmW0t9KxQ6o"><code>from langchain.chat_models import init_chat_model

model = init_chat_model(
"claude-sonnet-4-5-20250929",
# Set streaming=False to disable streaming for the chat model
streaming=False
)</code></pre>

<p id="t-V7QXlo1TtN7LLsvJHyrli4"><span>并非所有聊天模型集成都支持</span><span>streaming</span><span>参数。如果你的模型不支持，请改用</span><span>disable_streaming=True</span><span>。此参数可通过基类在所有聊天模型上使用。</span></p>


<a id="section-0918"></a>
## Python &lt; 3.11 异步

<a id="t-mvPc8AyQDv5padwxbgSgiC"></a>

<p id="t-zsCpTTZ4sefXF3xXV0KLmG"><span style="background-color:transparent">在 Python 版本 &lt; 3.11 中，</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">asyncio 任务</span><span style="background-color:transparent"> 不支持 </span><span style="background-color:transparent">context</span><span style="background-color:transparent"> 参数。 这限制了 LangGraph 自动传播上下文的能力，并在两个关键方面影响了 LangGraph 的流式传输机制：</span></p>

<ol start="1"><li id="t-ctY5shM6yy4DtuWEG3muAL"><span>你必须显式地将</span><span style="border-bottom:1px solid;font-weight:bold">RunnableConfig</span><span>传递给异步 LLM 调用（例如</span><span>ainvoke()</span><span>），因为回调不会自动传播。</span></li></ol>

<ol start="2"><li id="t-q4dbI4YLVGknzKoWpjipwv"><span>你不能在异步节点或工具中使用</span><span style="border-bottom:1px solid;font-weight:bold">get_stream_writer</span><span>——你必须直接传递一个</span><span>writer</span><span>参数。</span></li></ol>

<p id="t-xm1trw9GkeLL28OkIoI2uD"><span style="background-color:transparent;color:#1f1f1f">扩展示例：带手动配置的异步 LLM 调用</span></p>

<pre id="t-kOWmKx00B8YReMMlwPKkSw"><code>from typing import TypedDict
from langgraph.graph import START, StateGraph
from langchain.chat_models import init_chat_model

model = init_chat_model(model="gpt-4o-mini")

class State(TypedDict):
    topic: str
    joke: str

# Accept config as an argument in the async node function
async def call_model(state, config):
    topic = state["topic"]
 print("Generating joke...")
 # Pass config to model.ainvoke() to ensure proper context propagation
    joke_response = await model.ainvoke(
 [{"role": "user", "content": f"Write a joke about {topic}"}],
        config,
 )
 return {"joke": joke_response.content}

graph = (
    StateGraph(State)
 .add_node(call_model)
 .add_edge(START, "call_model")
 .compile()
)

# Set stream_mode="messages" to stream LLM tokens
async for chunk, metadata in graph.astream(
 {"topic": "ice cream"},
    stream_mode="messages",
):
 if chunk.content:
 print(chunk.content, end="|", flush=True)</code></pre>

<p id="t-ZsgfP62AH1GCIMSsx9NrV6"><span style="background-color:transparent;color:#1f1f1f">扩展示例：带流写入器的异步自定义流式传输</span></p>

<pre id="t-X0V0RjKQiCpiKYy4QHvz7K"><code>from typing import TypedDict
from langgraph.types import StreamWriter

class State(TypedDict):
      topic: str
      joke: str

# Add writer as an argument in the function signature of the async node or tool
# LangGraph will automatically pass the stream writer to the function
async def generate_joke(state: State, writer: StreamWriter):
      writer({"custom_key": "Streaming custom data while generating a joke"})
 return {"joke": f"This is a joke about {state['topic']}"}

graph = (
      StateGraph(State)
 .add_node(generate_joke)
 .add_edge(START, "generate_joke")
 .compile()
)

# Set stream_mode="custom" to receive the custom data in the stream  #
async for chunk in graph.astream(
 {"topic": "ice cream"},
      stream_mode="custom",
):
 print(chunk)</code></pre>


<a id="section-0919"></a>
## 中断

<a id="t-block-17846"></a>

<p id="t-TUNCEXtRFtliQJ2B6CEAdI"><span>中断机制允许您在特定节点暂停图执行，并在继续前等待外部输入。这实现了人机协同模式，即需要外部输入才能继续执行。当中断触发时，LangGraph 会使用其</span><span style="border-bottom:1px solid;font-weight:bold">持久化</span><span>层保存图状态，并无限期等待，直到您恢复执行。</span></p>

<p id="t-TWiTciPEUwIbooWTWV8e9e"><span>中断通过在图的节点中任意位置调用</span><span>interrupt()</span><span>函数实现。该函数接受任何可 JSON 序列化的值，该值会返回给调用者。当您准备好继续时，通过使用</span><span>Command</span><span>重新调用图来恢复执行，该值随后会成为节点内部</span><span>interrupt()</span><span>调用的返回值。</span></p>

<p id="t-UPuvumWMAvJv9UHmmQud47"><span>与静态断点（在特定节点之前或之后暂停）不同，中断是</span><span style="font-weight:bold">动态的</span><span>——它们可以放置在代码中的任何位置，并且可以根据应用程序逻辑有条件地触发。</span></p>

<ul><li id="t-MiswBccY4FyPDwpGRE7J0o"><span style="font-weight:bold">检查点保存执行位置：</span><span>检查点器会精确写入图状态，以便您稍后恢复，即使在错误状态下也能恢复。</span></li></ul>

<ul><li id="t-EoWJp4DuMJwELXh9XR7bfl"><span style="font-weight:bold">thread_id</span><span style="font-weight:bold">是指针：</span><span>设置</span><span>config={"configurable": {"thread_id": ...}}</span><span>来告知检查点器加载哪个状态。</span></li></ul>

<ul><li id="t-tOGe6i7VsOkUfJx3EgroYH"><span style="font-weight:bold">中断负载以</span><span style="font-weight:bold">__interrupt__</span><span style="font-weight:bold">形式返回：</span><span>传递给</span><span>interrupt()</span><span>的值会在</span><span>__interrupt__</span><span>字段中返回给调用者，以便您了解图正在等待什么。</span></li></ul>

<p id="t-PCvnZ1c7mvgRTFSdgJETOZ"><span>您选择的</span><span>thread_id</span><span>实际上就是您的持久化游标。重用它会恢复同一个检查点；使用新值则会启动一个具有全新状态的新线程。</span></p>


<a id="section-0920"></a>
## 使用 interrupt 暂停

<a id="t-OUCGNdZYrMEbEbKIZ2gTzz"></a>

<p id="t-dUf5TdlrPhedW0ZN5xRFhL"><span style="border-bottom:1px solid;font-weight:bold">interrupt</span><span>函数会暂停图执行并向调用者返回一个值。当您在节点内调用</span><span style="border-bottom:1px solid;font-weight:bold">interrupt</span><span>时，LangGraph 会保存当前图状态并等待您输入以恢复执行。</span></p>

<p id="t-8g2Fm7jJdRXbcSQ18qZX6c"><span>要使用</span><span style="border-bottom:1px solid;font-weight:bold">interrupt</span><span>，您需要：</span></p>

<ol start="1"><li id="t-Wu5mP6RE3xwY2Z5gBiorV1"><span>一个用于持久化图状态的</span><span style="font-weight:bold">检查点器</span><span>（在生产环境中使用持久化检查点器）</span></li></ol>

<ol start="2"><li id="t-jxby41831hQbBBvQwvcQRR"><span>配置中的</span><span style="font-weight:bold">线程 ID</span><span>，以便运行时知道从哪个状态恢复</span></li></ol>

<ol start="3"><li id="t-EUOv5ORHczx3qxgqOUqcyi"><span>在您想要暂停的位置调用</span><span>interrupt()</span><span>（负载必须是可 JSON 序列化的）</span></li></ol>

<pre id="t-sRnDrZlGk2v9VhfYa9sfcr"><code>from langgraph.types import interrupt

def approval_node(state: State):
# Pause and ask for approval
approved = interrupt("Do you approve this action?")

# When you resume, Command(resume=...) returns that value here
return {"approved": approved}</code></pre>

<p id="t-wFNxRe1OnKFgIti0KPwnVp"><span>当您调用</span><span style="border-bottom:1px solid;font-weight:bold">interrupt</span><span>时，会发生以下情况：</span></p>

<ol start="1"><li id="t-5D56h63MAKhCaGuVzUAeqi"><span style="font-weight:bold">图执行在</span><span style="border-bottom:1px solid;font-weight:bold">interrupt</span><span style="font-weight:bold">被调用的确切位置被挂起</span></li></ol>

<ol start="2"><li id="t-mg4vuLyQl1pNpjwmn00ncI"><span style="font-weight:bold">状态被保存</span><span>，使用检查点器以便稍后恢复执行。在生产环境中，这应该是一个持久化检查点器（例如，由数据库支持）</span></li></ol>

<ol start="3"><li id="t-skEwljNFlynyuUfQU5CkWl"><span style="font-weight:bold">值在</span><span style="font-weight:bold">__interrupt__</span><span style="font-weight:bold">下返回给调用者</span><span>；它可以是任何可 JSON 序列化的值（字符串、对象、数组等）</span></li></ol>

<ol start="4"><li id="t-8Ul9pbtSc7KD1SD5nnoh77"><span style="font-weight:bold">图无限期等待</span><span>，直到您提供响应恢复执行</span></li></ol>

<ol start="5"><li id="t-92I0LzPVid0WTfsTB3U8A2"><span style="font-weight:bold">当您恢复时，响应被传递回节点</span><span>，成为</span><span>interrupt()</span><span>调用的返回值</span></li></ol>


<a id="section-0921"></a>
## 恢复中断

<a id="t-xhsoaoXyEWMVpxsONORg8R"></a>

<p id="t-EdO9veMKu4QUckeoFeRe9O"><span>中断暂停执行后，您可以通过再次调用图并附带包含恢复值的</span><span>Command</span><span>来恢复图。恢复值会传递回</span><span>interrupt</span><span>调用，允许节点继续执行并处理外部输入。</span></p>

<pre id="t-jl9r1rUx4sjGAAvpfe6quE"><code>from langgraph.types import Command

# Initial run - hits the interrupt and pauses
# thread_id is the persistent pointer (stores a stable ID in production)
config = {"configurable": {"thread_id": "thread-1"}}
result = graph.invoke({"input": "data"}, config=config)

# Check what was interrupted
# __interrupt__ contains the payload that was passed to interrupt()
print(result["__interrupt__"])
# &gt; [Interrupt(value='Do you approve this action?')]

# Resume with the human's response
# The resume payload becomes the return value of interrupt() inside the node
graph.invoke(Command(resume=True), config=config)</code></pre>

<p id="t-zfoIlJDqIY26hbT7vB3BfU"><span style="font-weight:bold">关于恢复的关键点：</span></p>

<ul><li id="t-TxXHEaUd9zZCKRdmTp19gQ"><span>恢复时必须使用与中断发生时</span><span style="font-weight:bold">相同的线程 ID</span></li></ul>

<ul><li id="t-xkhJGsQuvS61zZyIdi0PEH"><span>传递给</span><span>Command(resume=...)</span><span>的值成为</span><span style="border-bottom:1px solid;font-weight:bold">interrupt</span><span>调用的返回值</span></li></ul>

<ul><li id="t-EWXSDLEkPR79hzotGDfuOg"><span>恢复时，节点会从调用</span><span style="border-bottom:1px solid;font-weight:bold">interrupt</span><span>的节点开头重新开始，因此</span><span style="border-bottom:1px solid;font-weight:bold">interrupt</span><span>之前的任何代码都会再次运行</span></li></ul>

<ul><li id="t-rWzY2X7LskeRmmJ8I3XJyZ"><span>您可以传递任何可 JSON 序列化的值作为恢复值</span></li></ul>


<a id="section-0922"></a>
## 常见模式

<a id="t-WrZKXcboY4VOkFS0fQPmWw"></a>

<p id="t-3RFeb5VdZRbDc1LdY0t6QW"><span>中断解锁的关键能力是能够暂停执行并等待外部输入。这对于多种用例非常有用，包括：</span></p>

<ul><li id="t-d4bNJ86GJZKcu3ze530bid"><span style="border-bottom:1px solid;font-weight:bold">审批工作流</span><span>：在执行关键操作（API 调用、数据库更改、金融交易）之前暂停</span></li></ul>

<ul><li id="t-aergh9F1xfLSgGJP5VYXlU"><span style="border-bottom:1px solid;font-weight:bold">审查和编辑</span><span>：让人类在继续之前审查和修改 LLM 输出或工具调用</span></li></ul>

<ul><li id="t-uhqem8w4IPY0mNgo5LDbFR"><span style="border-bottom:1px solid;font-weight:bold">中断工具调用</span><span>：在执行工具调用之前暂停，以便在执行前审查和编辑工具调用</span></li></ul>

<ul><li id="t-2ZmS9VhLHGabQ6yvRbSzr8"><span style="border-bottom:1px solid;font-weight:bold">验证人工输入</span><span>：在继续下一步之前暂停以验证人工输入</span></li></ul>


<a id="section-0923"></a>
## 批准或拒绝

<a id="t-uPTk3NToN3Dso9de3HnWVu"></a>

<p id="t-ApeqrwOO1LvMSSRDwun87x"><span>中断最常见的用途之一是在关键操作之前暂停并请求批准。例如，您可能希望让人类批准 API 调用、数据库更改或任何其他重要决策。</span></p>

<pre id="t-LcEwCx8xpyWGMOYPFVEr00"><code>from typing import Literal
from langgraph.types import interrupt, Command

def approval_node(state: State) -&gt; Command[Literal["proceed", "cancel"]]:
# Pause execution; payload shows up under result["__interrupt__"]
is_approved = interrupt({
"question": "Do you want to proceed with this action?",
"details": state["action_details"]
})

# Route based on the response
if is_approved:
return Command(goto="proceed") # Runs after the resume payload is provided
else:
return Command(goto="cancel")</code></pre>

<p id="t-wahBRgwT5KKn7XZZqbooyS"><span>当您恢复图时，传递</span><span>true</span><span>表示批准，</span><span>false</span><span>表示拒绝：</span></p>

<pre id="t-nnaIzE22saokydMsv1GuKR"><code># To approve
graph.invoke(Command(resume=True), config=config)

# To reject
graph.invoke(Command(resume=False), config=config)</code></pre>

<p id="t-nIRKC9nNvM1UdmlMgAVgP9"><span style="background-color:transparent;color:#1f1f1f">完整示例</span></p>

<pre id="t-Q9Eafy1gAgWgiUqXPdHQxT"><code>from typing import Literal, Optional, TypedDict

from langgraph.checkpoint.memory import MemorySaver
from langgraph.graph import StateGraph, START, END
from langgraph.types import Command, interrupt

class ApprovalState(TypedDict):
    action_details: str
    status: Optional[Literal["pending", "approved", "rejected"]]

def approval_node(state: ApprovalState) -&gt; Command[Literal["proceed", "cancel"]]:
 # Expose details so the caller can render them in a UI
    decision = interrupt({
 "question": "Approve this action?",
 "details": state["action_details"],
 })

 # Route to the appropriate node after resume
 return Command(goto="proceed" if decision else "cancel")

def proceed_node(state: ApprovalState):
 return {"status": "approved"}

def cancel_node(state: ApprovalState):
 return {"status": "rejected"}

builder = StateGraph(ApprovalState)
builder.add_node("approval", approval_node)
builder.add_node("proceed", proceed_node)
builder.add_node("cancel", cancel_node)
builder.add_edge(START, "approval")
builder.add_edge("proceed", END)
builder.add_edge("cancel", END)

# Use a more durable checkpointer in production
checkpointer = MemorySaver()
graph = builder.compile(checkpointer=checkpointer)

config = {"configurable": {"thread_id": "approval-123"}}
initial = graph.invoke(
 {"action_details": "Transfer $500", "status": "pending"},
    config=config,
)
print(initial["__interrupt__"]) # -&gt; [Interrupt(value={'question': ..., 'details': ...})]

# Resume with the decision; True routes to proceed, False to cancel
resumed = graph.invoke(Command(resume=True), config=config)
print(resumed["status"]) # -&gt; "approved"</code></pre>


<a id="section-0924"></a>
## 审查和编辑状态

<a id="t-QMukIr22XMBZhunqVLcKUZ"></a>

<p id="t-SAyte0Wxq7CzTsfco4oEyo"><span>有时您希望让人类在继续之前审查和编辑图状态的一部分。这对于纠正 LLM、添加缺失信息或进行调整非常有用。</span></p>

<pre id="t-eZDHfXEQ1uYpiX974jEbmt"><code>from langgraph.types import interrupt

def review_node(state: State):
# Pause and show the current content for review (surfaces in result["__interrupt__"])
edited_content = interrupt({
"instruction": "Review and edit this content",
"content": state["generated_text"]
})

# Update the state with the edited version
return {"generated_text": edited_content}</code></pre>

<p id="t-8nO0hN8aCrLMw6XMW6L6sA"><span>恢复时，提供编辑后的内容：</span></p>

<pre id="t-jK5HltCSF6EeuJukaUusFx"><code>graph.invoke(
Command(resume="The edited and improved text"), # Value becomes the return from interrupt()
config=config
)</code></pre>

<p id="t-VjmoWOLkGebkIQLLJ7gLjF"><span style="background-color:transparent;color:#1f1f1f">完整示例</span></p>

<pre id="t-WteE3Awd1CyCzTmNoV1Znx"><code>import sqlite3
from typing import TypedDict

from langgraph.checkpoint.memory import MemorySaver
from langgraph.graph import StateGraph, START, END
from langgraph.types import Command, interrupt

class ReviewState(TypedDict):
    generated_text: str

def review_node(state: ReviewState):
 # Ask a reviewer to edit the generated content
    updated = interrupt({
 "instruction": "Review and edit this content",
 "content": state["generated_text"],
 })
 return {"generated_text": updated}

builder = StateGraph(ReviewState)
builder.add_node("review", review_node)
builder.add_edge(START, "review")
builder.add_edge("review", END)

checkpointer = MemorySaver()
graph = builder.compile(checkpointer=checkpointer)

config = {"configurable": {"thread_id": "review-42"}}
initial = graph.invoke({"generated_text": "Initial draft"}, config=config)
print(initial["__interrupt__"]) # -&gt; [Interrupt(value={'instruction': ..., 'content': ...})]

# Resume with the edited text from the reviewer
final_state = graph.invoke(
    Command(resume="Improved draft after review"),
    config=config,
)
print(final_state["generated_text"]) # -&gt; "Improved draft after review"</code></pre>


<a id="section-0925"></a>
## 工具中的中断

<a id="t-H2oY4yE7jpQm1otrwBWoVS"></a>

<p id="t-P6ewMFcwFn1l1cwGQj8HOq"><span>您也可以将中断直接放置在工具函数内部。这使得工具本身在被调用时暂停等待批准，并允许在执行前对工具调用进行人工审查和编辑。</span></p>

<p id="t-lBzkTRED7yStE16qBftF5X"><span>首先，定义一个使用</span><span style="border-bottom:1px solid;font-weight:bold">interrupt</span><span>的工具：</span></p>

<pre id="t-rMOwxbnCQ6TLZOUL4YiXLw"><code>from langchain.tools import tool
from langgraph.types import interrupt

@tool
def send_email(to: str, subject: str, body: str):
"""Send an email to a recipient."""

# Pause before sending; payload surfaces in result["__interrupt__"]
response = interrupt({
"action": "send_email",
"to": to,
"subject": subject,
"body": body,
"message": "Approve sending this email?"
})

if response.get("action") == "approve":
# Resume value can override inputs before executing
final_to = response.get("to", to)
final_subject = response.get("subject", subject)
final_body = response.get("body", body)
return f"Email sent to {final_to} with subject '{final_subject}'"
return "Email cancelled by user"</code></pre>

<p id="t-Psxu7xEw4esCMeAbLLk52m"><span>当您希望审批逻辑与工具本身共存，使其在图的各个部分可重用时，这种方法非常有用。LLM 可以自然地调用该工具，而中断会在工具被调用时暂停执行，允许您批准、编辑或取消操作。</span></p>

<p id="t-OwI9gHCKi2rdev16rIW1WB"><span style="background-color:transparent;color:#1f1f1f">完整示例</span></p>

<pre id="t-sRnTPp8DSJthL1IQrbiXm8"><code>import sqlite3
from typing import TypedDict

from langchain.tools import tool
from langchain_anthropic import ChatAnthropic
from langgraph.checkpoint.sqlite import SqliteSaver
from langgraph.graph import StateGraph, START, END
from langgraph.types import Command, interrupt

class AgentState(TypedDict):
    messages: list[dict]

@tool
def send_email(to: str, subject: str, body: str):
 """Send an email to a recipient."""

 # Pause before sending; payload surfaces in result["__interrupt__"]
    response = interrupt({
 "action": "send_email",
 "to": to,
 "subject": subject,
 "body": body,
 "message": "Approve sending this email?",
 })

 if response.get("action") == "approve":
        final_to = response.get("to", to)
        final_subject = response.get("subject", subject)
        final_body = response.get("body", body)

 # Actually send the email (your implementation here)
 print(f"[send_email] to={final_to} subject={final_subject} body={final_body}")
 return f"Email sent to {final_to}"

 return "Email cancelled by user"

model = ChatAnthropic(model="claude-sonnet-4-5-20250929").bind_tools([send_email])

def agent_node(state: AgentState):
 # LLM may decide to call the tool; interrupt pauses before sending
    result = model.invoke(state["messages"])
 return {"messages": state["messages"] + [result]}

builder = StateGraph(AgentState)
builder.add_node("agent", agent_node)
builder.add_edge(START, "agent")
builder.add_edge("agent", END)

checkpointer = SqliteSaver(sqlite3.connect("tool-approval.db"))
graph = builder.compile(checkpointer=checkpointer)

config = {"configurable": {"thread_id": "email-workflow"}}
initial = graph.invoke(
 {
 "messages": [
 {"role": "user", "content": "Send an email to alice@example.com about the meeting"}
 ]
 },
    config=config,
)
print(initial["__interrupt__"]) # -&gt; [Interrupt(value={'action': 'send_email', ...})]

# Resume with approval and optionally edited arguments
resumed = graph.invoke(
    Command(resume={"action": "approve", "subject": "Updated subject"}),
    config=config,
)
print(resumed["messages"][-1]) # -&gt; Tool result returned by send_email</code></pre>


<a id="section-0926"></a>
## 验证人工输入

<a id="t-jRV4w6oaBI6tA3my2dV0Ke"></a>

<p id="t-cxUn5cZieDaOvz41xH54w1"><span>有时您需要验证来自人类的输入，并在无效时再次询问。您可以使用循环中的多个</span><span style="border-bottom:1px solid;font-weight:bold">interrupt</span><span>调用来实现这一点。</span></p>

<pre id="t-r3M6wucQtkWUKHJ3kmj2i1"><code>from langgraph.types import interrupt

def get_age_node(state: State):
prompt = "What is your age?"

while True:
answer = interrupt(prompt) # payload surfaces in result["__interrupt__"]

# Validate the input
if isinstance(answer, int) and answer &gt; 0:
# Valid input - continue
break
else:
# Invalid input - ask again with a more specific prompt
prompt = f"'{answer}' is not a valid age. Please enter a positive number."

return {"age": answer}</code></pre>

<p id="t-uTNNbCcDXU6Rt7vQknNVXw"><span>每次您使用无效输入恢复图时，它都会以更清晰的消息再次询问。一旦提供了有效输入，节点就会完成，图继续执行。</span></p>

<p id="t-bers4GWV6H6YPcrFGpsHAw"><span style="background-color:transparent;color:#1f1f1f">完整示例</span></p>

<pre id="t-yhbTY4n0CATCWDglzEtUzm"><code>import sqlite3
from typing import TypedDict

from langgraph.checkpoint.sqlite import SqliteSaver
from langgraph.graph import StateGraph, START, END
from langgraph.types import Command, interrupt

class FormState(TypedDict):
    age: int | None

def get_age_node(state: FormState):
    prompt = "What is your age?"

 while True:
        answer = interrupt(prompt) # payload surfaces in result["__interrupt__"]

 if isinstance(answer, int) and answer &gt; 0:
 return {"age": answer}

        prompt = f"'{answer}' is not a valid age. Please enter a positive number."

builder = StateGraph(FormState)
builder.add_node("collect_age", get_age_node)
builder.add_edge(START, "collect_age")
builder.add_edge("collect_age", END)

checkpointer = SqliteSaver(sqlite3.connect("forms.db"))
graph = builder.compile(checkpointer=checkpointer)

config = {"configurable": {"thread_id": "form-1"}}
first = graph.invoke({"age": None}, config=config)
print(first["__interrupt__"]) # -&gt; [Interrupt(value='What is your age?', ...)]

# Provide invalid data; the node re-prompts
retry = graph.invoke(Command(resume="thirty"), config=config)
print(retry["__interrupt__"]) # -&gt; [Interrupt(value="'thirty' is not a valid age...", ...)]

# Provide valid data; loop exits and state updates
final = graph.invoke(Command(resume=30), config=config)
print(final["age"]) # -&gt; 30</code></pre>


<a id="section-0927"></a>
## 中断规则

<a id="t-izBjJfhNjYkXvRCEbuexKk"></a>

<p id="t-YQvOf9dbjB12y3I7SAeUus"><span>当您在节点内调用</span><span style="border-bottom:1px solid;font-weight:bold">interrupt</span><span>时，LangGraph 会通过引发一个通知运行时暂停的异常来挂起执行。此异常会通过调用栈向上传播，并被运行时捕获，运行时随后通知图保存当前状态并等待外部输入。</span></p>

<p id="t-QdPlUfbN304nSqDNsF2ILf"><span>当执行恢复时（在您提供请求的输入之后），运行时</span><span style="font-weight:bold">会从头开始重新启动整个节点</span><span>——它不会从调用</span><span style="border-bottom:1px solid;font-weight:bold">interrupt</span><span>的确切行恢复。这意味着在</span><span style="border-bottom:1px solid;font-weight:bold">interrupt</span><span>之前运行的任何代码都会再次执行。因此，在使用中断时，需要遵循一些重要规则以确保其行为符合预期。</span></p>


<a id="section-0928"></a>
## 不要在 try/except 中包装 interrupt 调用

<a id="t-csEzqukIbWgPEgYlmafsUc"></a>

<p id="t-1fBCYckK30ttFCOBH663Ws"><span style="border-bottom:1px solid;font-weight:bold">interrupt</span><span>通过在调用点抛出特殊异常来暂停执行。如果您将</span><span style="border-bottom:1px solid;font-weight:bold">interrupt</span><span>调用包装在 try/except 块中，您将捕获此异常，中断将不会传递回图。</span></p>

<ul><li id="t-ejMWAiSZzyROjj4QkO0Hba"><span>✅ 将</span><span style="border-bottom:1px solid;font-weight:bold">interrupt</span><span>调用与易出错的代码分开</span></li></ul>

<ul><li id="t-wqyoBI3OTjKioLw3Unw9yj"><span>✅ 在 try/except 块中使用特定的异常类型</span></li></ul>

<p id="t-mAN8F73CwTUIG2RgyKYNQA"><span>Separating logic</span></p>

<pre id="t-Rg4cHiHGfrrlEYR1tyPcnw"><code>def node_a(state: State):
# ✅ Good: interrupting first, then handling
# error conditions separately
interrupt("What's your name?")
try:
fetch_data() # This can fail
except Exception as e:
print(e)
return state</code></pre>

<ul><li id="t-XXVg7chZWnrYcn3EsiJIKX"><span>🔴 不要在裸 try/except 块中包装</span><span style="border-bottom:1px solid;font-weight:bold">interrupt</span><span>调用</span></li></ul>

<pre id="t-HDhXrlQ5UDKZRypjIbPBtk"><code>def node_a(state: State):
# ❌ Bad: wrapping interrupt in bare try/except
# will catch the interrupt exception
try:
interrupt("What's your name?")
except Exception as e:
print(e)
return state</code></pre>


<a id="section-0929"></a>
## 不要在节点内重新排序 interrupt 调用

<a id="t-5DzEnQDlMdLkMqmFOAhv30"></a>

<p id="t-BzaggdiFJWaBHh7GRUYbLE"><span>在单个节点中使用多个中断很常见，但如果不小心处理，可能会导致意外行为。</span></p>

<p id="t-b3es1yTCrQRXEqJN6vBVoJ"><span>当一个节点包含多个中断调用时，LangGraph 会为执行该节点的任务维护一个特定的恢复值列表。每当执行恢复时，它都从节点的开头开始。对于遇到的每个中断，LangGraph 会检查任务恢复列表中是否存在匹配的值。匹配是</span><span style="font-weight:bold">严格基于索引的</span><span>，因此节点内中断调用的顺序很重要。</span></p>

<ul><li id="t-Ltw0s8gXF6brUKQ61A9yhw"><span>✅ 保持节点执行间</span><span style="border-bottom:1px solid;font-weight:bold">interrupt</span><span>调用的一致性</span></li></ul>

<pre id="t-QNn6nsQV2VbKCKInrttqUF"><code>def node_a(state: State):
# ✅ Good: interrupt calls happen in the same order every time
name = interrupt("What's your name?")
age = interrupt("What's your age?")
city = interrupt("What's your city?")

return {
"name": name,
"age": age,
"city": city
}</code></pre>

<ul><li id="t-rE6HRUM0kOwzVnSmTIfgJ4"><span>🔴 不要有条件地跳过节点内的</span><span style="border-bottom:1px solid;font-weight:bold">interrupt</span><span>调用</span></li></ul>

<ul><li id="t-GYwPkkkQcpwcIhpSa2I2jM"><span>🔴 不要使用在执行间非确定性的逻辑来循环</span><span style="border-bottom:1px solid;font-weight:bold">interrupt</span><span>调用</span></li></ul>

<p id="t-NZqw5PALE11JzFY3aH0euW"><span>Skipping interrupts</span></p>

<pre id="t-GAI1LbvBsXBqDkmpd4JnZM"><code>def node_a(state: State):
# ❌ Bad: conditionally skipping interrupts changes the order
name = interrupt("What's your name?")

# On first run, this might skip the interrupt
# On resume, it might not skip it - causing index mismatch
if state.get("needs_age"):
age = interrupt("What's your age?")

city = interrupt("What's your city?")

return {"name": name, "city": city}</code></pre>


<a id="section-0930"></a>
## 不要在 interrupt 调用中返回复杂值

<a id="t-vRB4bRkMz6HirSQjsSSvLq"></a>

<p id="t-Zbnbpau8czhJ1qDSUq2XHk"><span>根据所使用的检查点器，复杂值可能无法序列化（例如，您无法序列化一个函数）。为了使您的图能够适应任何部署环境，最佳实践是仅使用可以合理序列化的值。</span></p>

<ul><li id="t-un4rJLmEHeMMqm4r3CehSa"><span>✅ 向</span><span style="border-bottom:1px solid;font-weight:bold">interrupt</span><span>传递简单的、可 JSON 序列化的类型</span></li></ul>

<ul><li id="t-UsxUd7p2q2fO1DXokkRwKv"><span>✅ 传递包含简单值的字典/对象</span></li></ul>

<p id="t-W3SHzfJvJ0dMlBHAPCulT7"><span>Simple values</span></p>

<pre id="t-1CYIzlZpPvFk1RSGHmFv6g"><code>def node_a(state: State):
# ✅ Good: passing simple types that are serializable
name = interrupt("What's your name?")
count = interrupt(42)
approved = interrupt(True)

return {"name": name, "count": count, "approved": approved}</code></pre>

<ul><li id="t-z15aGz2sUu2Ggxu17hrLXH"><span>🔴 不要向</span><span style="border-bottom:1px solid;font-weight:bold">interrupt</span><span>传递函数、类实例或其他复杂对象</span></li></ul>

<p id="t-FdgjcDQinhI8DhWTfUexF9"><span>Functions</span></p>

<pre id="t-3HrGzgwbj9VJZA5uO0LTbV"><code>def validate_input(value):
return len(value) &gt; 0

def node_a(state: State):
# ❌ Bad: passing a function to interrupt
# The function cannot be serialized
response = interrupt({
"question": "What's your name?",
"validator": validate_input  # This will fail
})
return {"name": response}</code></pre>


<a id="section-0931"></a>
## 在 interrupt 之前调用的副作用必须是幂等的

<a id="t-pTVFJjyF4iWMfkxMUN6CiQ"></a>

<p id="t-oI4rSepWzv580z6LkbKAjl"><span>因为中断通过重新运行它们被调用的节点来工作，所以在</span><span style="border-bottom:1px solid;font-weight:bold">interrupt</span><span>之前调用的副作用应该（理想情况下）是幂等的。上下文中的幂等性意味着同一操作可以多次应用，而不会改变初始执行之外的结果。</span></p>

<p id="t-Mv4Rzgn0t4beyDN8aGNwZE"><span>例如，您可能有一个在节点内部更新记录的 API 调用。如果在进行该调用之后调用</span><span style="border-bottom:1px solid;font-weight:bold">interrupt</span><span>，则在节点恢复时将多次重新运行，可能会覆盖初始更新或创建重复记录。</span></p>

<ul><li id="t-R8Hsz2IVPxnUqEwdCdRjq7"><span>✅ 在</span><span style="border-bottom:1px solid;font-weight:bold">interrupt</span><span>之前使用幂等操作</span></li></ul>

<ul><li id="t-QH9yH159ZsTdJdPpocRYot"><span>✅ 将副作用放在</span><span style="border-bottom:1px solid;font-weight:bold">interrupt</span><span>调用之后</span></li></ul>

<ul><li id="t-aS3hS7Y415p6etJvfAOtOk"><span>✅ 尽可能将副作用分离到单独的节点中</span></li></ul>

<p id="t-rg1wt645hdnqPVKdYcCEd6"><span>Idempotent operations</span></p>

<pre id="t-UYOxojvqlmiftP0YiQiUc2"><code>def node_a(state: State):
# ✅ Good: using upsert operation which is idempotent
# Running this multiple times will have the same result
db.upsert_user(
user_id=state["user_id"],
status="pending_approval"
)

approved = interrupt("Approve this change?")

return {"approved": approved}</code></pre>

<ul><li id="t-W0SASN4EqFCqi1MxzhToFg"><span>🔴 不要在</span><span style="border-bottom:1px solid;font-weight:bold">interrupt</span><span>之前执行非幂等操作</span></li></ul>

<ul><li id="t-ILItzrohR2zaDF4qFaYocs"><span>🔴 不要在不检查是否存在的情况下创建新记录</span></li></ul>

<p id="t-5UxVMEge9sjbt19FkQxSna"><span>Creating records</span></p>

<pre id="t-ZqauhFWjF8zGoLZyqN9PqK"><code>def node_a(state: State):
# ❌ Bad: creating a new record before interrupt
# This will create duplicate records on each resume
audit_id = db.create_audit_log({
"user_id": state["user_id"],
"action": "pending_approval",
"timestamp": datetime.now()
})

approved = interrupt("Approve this change?")

return {"approved": approved, "audit_id": audit_id}</code></pre>


<a id="section-0932"></a>
## 与作为函数调用的子图一起使用

<a id="t-0MqnOzt8lzsvMv24EthorL"></a>

<p id="t-0aWBpMx9roaaulMqrB9DdA"><span>当在节点内调用子图时，父图将从</span><span style="font-weight:bold">调用子图并触发</span><span style="border-bottom:1px solid;font-weight:bold">interrupt</span><span style="font-weight:bold">的节点开头</span><span>恢复执行。同样，</span><span style="font-weight:bold">子图</span><span>也将从调用</span><span style="border-bottom:1px solid;font-weight:bold">interrupt</span><span>的节点开头恢复。</span></p>

<pre id="t-sJqa4l0TH5qb3Lx7YST9cq"><code>def node_in_parent_graph(state: State):
some_code() # &lt;-- This will re-execute when resumed
# Invoke a subgraph as a function.
# The subgraph contains an `interrupt` call.
subgraph_result = subgraph.invoke(some_input)
# ...

def node_in_subgraph(state: State):
some_other_code() # &lt;-- This will also re-execute when resumed
result = interrupt("What's your name?")
# ...</code></pre>


<a id="section-0933"></a>
## 使用中断进行调试

<a id="t-WHlvPDT8hDUPE0LxUJrzOs"></a>

<p id="t-FnJb8oTVnBDY7RFGOr35Sl"><span>要调试和测试图，您可以使用静态中断作为断点，逐步执行图，一次一个节点。静态中断在定义的点触发，要么在节点执行之前，要么在之后。您可以通过在编译图时指定</span><span>interrupt_before</span><span>和</span><span>interrupt_after</span><span>来设置这些断点。</span></p>

<p id="t-B5j7Cxeg7GmB1MqxX97UcN"><span>静态中断</span><span style="font-weight:bold">不</span><span>推荐用于人机协同工作流。请改用</span><span style="border-bottom:1px solid;font-weight:bold">interrupt</span><span>函数。</span></p>

<p id="t-uEfBLbAPruuYcoSFZpg5ZQ"><span style="border-bottom:1px solid;font-weight:bold">在编译时</span></p>

<pre id="t-B1yzDgDVNi2vY4JVA0afAv"><code>graph = builder.compile(
interrupt_before=["node_a"],
interrupt_after=["node_b", "node_c"],
checkpointer=checkpointer,
)

# Pass a thread ID to the graph
config = {
"configurable": {
"thread_id": "some_thread"
}
}

# Run the graph until the breakpoint
graph.invoke(inputs, config=config)

# Resume the graph
graph.invoke(None, config=config)</code></pre>

<ol start="1"><li id="t-pjffCAyU4Y8I1gbZZAxfNI"><span>断点在</span><span>compile</span><span>时设置。</span></li></ol>

<ol start="2"><li id="t-MNfz7wPSJmMn2EXUHhDtJA"><span>interrupt_before</span><span>指定在节点执行之前应暂停执行的节点。</span></li></ol>

<ol start="3"><li id="t-XjW77WPAlVAb5yZZ7p9Ju7"><span>interrupt_after</span><span>指定在节点执行之后应暂停执行的节点。</span></li></ol>

<ol start="4"><li id="t-KifP8I52ZxmUbDLc9MPx5G"><span>需要检查点器才能启用断点。</span></li></ol>

<ol start="5"><li id="t-vDmX7l3yIbB9FDZ6zNDuHp"><span>图运行直到遇到第一个断点。</span></li></ol>

<ol start="6"><li id="t-MlZTkRvprbaHn06r6jgynb"><span>通过传入</span><span>None</span><span>作为输入来恢复图。这将运行图直到遇到下一个断点。</span></li></ol>


<a id="section-0934"></a>
## 使用 LangGraph Studio

<a id="t-lEbuqmM2SWBChFrMRo4M41"></a>

<p id="t-ZVgjLItSEDVgXd5OWLDy3i"><span>您可以使用 </span><span style="border-bottom:1px solid;font-weight:bold">LangGraph Studio</span><span> 在运行图之前在 UI 中设置静态中断。您还可以使用 UI 在执行过程中的任何点检查图的状态。</span></p>

<div id="t-6rwZwnsSNGUQHkkqSIEIPT"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/b3c1421cd1f6a16fd29bd646.png"/></div>


<a id="section-0935"></a>
## 使用时间旅行

<a id="t-block-17968"></a>

<p id="t-VM6S7ZQBOLoENFCSxegi53"><span>在处理基于模型决策的非确定性系统（例如由 LLM 驱动的智能体）时，详细检查其决策过程会很有用：</span></p>

<ol start="1"><li id="t-VDzZ1V7zqb3NuzOlFpI0Jz"><span style="font-weight:bold">理解推理过程</span><span>：分析导致成功结果的步骤。</span></li></ol>

<ol start="2"><li id="t-dgo7kCRMVYBlxGLZpXOMfT"><span style="font-weight:bold">调试错误</span><span>：识别错误发生的位置和原因。</span></li></ol>

<ol start="3"><li id="t-blqrcYGlRxWPoeCxTrBft5"><span style="font-weight:bold">探索替代方案</span><span>：测试不同的路径以发现更好的解决方案。</span></li></ol>

<p id="t-M9XEmuYFMeiImc4we49hY2"><span>LangGraph 提供了</span><span style="border-bottom:1px solid;font-weight:bold">时间旅行</span><span>功能来支持这些用例。具体来说，您可以从先前的检查点恢复执行——既可以重放相同的状态，也可以修改它以探索替代方案。在所有情况下，恢复过去的执行都会在历史记录中创建一个新的分支。</span></p>

<p id="t-eWJDJWBc54HZx76sHnz480"><span>要在 LangGraph 中使用</span><span style="border-bottom:1px solid;font-weight:bold">时间旅行</span><span>：</span></p>

<ol start="1"><li id="t-yKWU8XBWf6KpWcHf5V7eJj"><span style="border-bottom:1px solid;font-weight:bold">运行图</span><span>：使用 </span><span style="border-bottom:1px solid;font-weight:bold">invoke</span><span> 或 </span><span style="border-bottom:1px solid;font-weight:bold">stream</span><span> 方法，结合初始输入运行图。</span></li></ol>

<ol start="2"><li id="t-xfr6Qi2j6u5cRLN2aqWQ2r"><span style="border-bottom:1px solid;font-weight:bold">识别现有线程中的检查点</span><span>：使用 </span><span style="border-bottom:1px solid;font-weight:bold">get_state_history</span><span> 方法检索特定 </span><span>thread_id</span><span> 的执行历史，并定位所需的 </span><span>checkpoint_id</span><span>。 或者，在您希望执行暂停的节点之前设置一个</span><span style="border-bottom:1px solid;font-weight:bold">中断</span><span>。然后，您可以找到该中断之前记录的最新检查点。</span></li></ol>

<ol start="3"><li id="t-oGk3szVWz1pqhfzd8Kp4Py"><span style="border-bottom:1px solid;font-weight:bold">更新图状态（可选）</span><span>：使用 </span><span style="border-bottom:1px solid;font-weight:bold">update_state</span><span> 方法在检查点处修改图的状态，并从替代状态恢复执行。</span></li></ol>

<ol start="4"><li id="t-8yJQ4LXk1U2Mj30dZ8fmdM"><span style="border-bottom:1px solid;font-weight:bold">从检查点恢复执行</span><span>：使用 </span><span>invoke</span><span> 或 </span><span>stream</span><span> 方法，输入为 </span><span>None</span><span>，配置中包含适当的 </span><span>thread_id</span><span> 和 </span><span>checkpoint_id</span><span>。</span></li></ol>


<a id="section-0936"></a>
## 在工作流中

<a id="t-QKFyRSyECa8GUWYlk0R5AX"></a>

<p id="t-jYPGWeowdwezEJyOrBQisa"><span>此示例构建了一个简单的 LangGraph 工作流，该工作流使用 LLM 生成一个笑话主题并编写一个笑话。它演示了如何运行图、检索过去的执行检查点、可选地修改状态，以及从选定的检查点恢复执行以探索替代结果。</span></p>


<a id="section-0937"></a>
## 设置

<a id="t-Vh5AWU0tWjXjYBuIJ3uXNT"></a>

<p id="t-TgFLrR4jb2KQU7hff4yp5p"><span>首先，我们需要安装所需的包。</span></p>

<pre id="t-6EMiMBv8pYJOxy1CSlcwsC"><code>%%capture --no-stderr
pip install --quiet -U langgraph langchain_anthropic</code></pre>

<p id="t-1PsXbjri6DApVYKdclnH3F"><span>接下来，我们需要为 Anthropic（我们将使用的 LLM）设置 API 密钥。</span></p>

<pre id="t-oAhCvIsW7Tkrcklsx0V02i"><code>import getpass
import os

def _set_env(var: str):
if not os.environ.get(var):
os.environ[var] = getpass.getpass(f"{var}: ")

_set_env("ANTHROPIC_API_KEY")</code></pre>

<p id="t-CYn3WcciMNdcDTlIUcas9c"><span>注册 </span><span style="border-bottom:1px solid;font-weight:bold">LangSmith</span><span> 以快速发现问题并提升您的 LangGraph 项目性能。LangSmith 让您能够使用追踪数据来调试、测试和监控您使用 LangGraph 构建的 LLM 应用。您还可以</span><span style="border-bottom:1px solid;font-weight:bold">从 LangSmith 获取追踪记录</span><span>，以便在本地重放和调试生产环境问题。</span></p>

<pre id="t-EDTtpToqmch1HJzXYeJMFU"><code>import uuid

from typing_extensions import TypedDict, NotRequired
from langgraph.graph import StateGraph, START, END
from langchain.chat_models import init_chat_model
from langgraph.checkpoint.memory import InMemorySaver

class State(TypedDict):
topic: NotRequired[str]
joke: NotRequired[str]

model = init_chat_model(
"claude-sonnet-4-5-20250929",
temperature=0,
)

def generate_topic(state: State):
"""LLM call to generate a topic for the joke"""
msg = model.invoke("Give me a funny topic for a joke")
return {"topic": msg.content}

def write_joke(state: State):
"""LLM call to write a joke based on the topic"""
msg = model.invoke(f"Write a short joke about {state['topic']}")
return {"joke": msg.content}

# Build workflow
workflow = StateGraph(State)

# Add nodes
workflow.add_node("generate_topic", generate_topic)
workflow.add_node("write_joke", write_joke)

# Add edges to connect nodes
workflow.add_edge(START, "generate_topic")
workflow.add_edge("generate_topic", "write_joke")
workflow.add_edge("write_joke", END)

# Compile
checkpointer = InMemorySaver()
graph = workflow.compile(checkpointer=checkpointer)
graph</code></pre>


<a id="section-0938"></a>
## 运行图

<a id="t-zhDllavzKn0pqWXvwOqYBz"></a>

<pre id="t-IJ51cvoganISn5A8hPAQBs"><code>config = {
"configurable": {
"thread_id": uuid.uuid4(),
}
}
state = graph.invoke({}, config)

print(state["topic"])
print()
print(state["joke"])</code></pre>

<p id="t-qPJV86ro7oKSvMQUmJkfVo"><span style="font-weight:bold">输出：</span></p>

<pre id="t-B8DYYLnXSBytGGeisyNiLq"><code>How about "The Secret Life of Socks in the Dryer"? You know, exploring the mysterious phenomenon of how socks go into the laundry as pairs but come out as singles. Where do they go? Are they starting new lives elsewhere? Is there a sock paradise we don't know about? There's a lot of comedic potential in the everyday mystery that unites us all!

# The Secret Life of Socks in the Dryer

I finally discovered where all my missing socks go after the dryer. Turns out they're not missing at all—they've just eloped with someone else's socks from the laundromat to start new lives together.

My blue argyle is now living in Bermuda with a red polka dot, posting vacation photos on Sockstagram and sending me lint as alimony.</code></pre>


<a id="section-0939"></a>
## 识别检查点

<a id="t-XvZobbhnnICDPyVvTj76jX"></a>

<pre id="t-bnf5o20Q0XiOrMCZXW9OEU"><code># The states are returned in reverse chronological order.
states = list(graph.get_state_history(config))

for state in states:
print(state.next)
print(state.config["configurable"]["checkpoint_id"])
print()</code></pre>

<p id="t-WwsWcRTkYFDwhODLXKMQ5k"><span style="font-weight:bold">输出：</span></p>

<pre id="t-MEsOeHS7Ir6gAYbYrVOV8u"><code>()
1f02ac4a-ec9f-6524-8002-8f7b0bbeed0e

('write_joke',)
1f02ac4a-ce2a-6494-8001-cb2e2d651227

('generate_topic',)
1f02ac4a-a4e0-630d-8000-b73c254ba748

('__start__',)
1f02ac4a-a4dd-665e-bfff-e6c8c44315d9</code></pre>

<pre id="t-ad0FYkrdpWs4j3V5wlyVH4"><code># This is the state before last (states are listed in chronological order)
selected_state = states[1]
print(selected_state.next)
print(selected_state.values)</code></pre>

<p id="t-XMc8qh3ayv4ZlJYvxadsp9"><span style="font-weight:bold">输出：</span></p>

<pre id="t-rWfBO8lfHX7Wlds8HjdVGn"><code>('write_joke',)
{'topic': 'How about "The Secret Life of Socks in the Dryer"? You know, exploring the mysterious phenomenon of how socks go into the laundry as pairs but come out as singles. Where do they go? Are they starting new lives elsewhere? Is there a sock paradise we don\\'t know about? There\\'s a lot of comedic potential in the everyday mystery that unites us all!'}</code></pre>


<a id="section-0940"></a>
## 更新状态

<a id="t-1Y3KUBx5USMFttNjS69UwZ"></a>

<p id="t-oGFpyXa0xHUSmfQOTzTsn7"><span style="border-bottom:1px solid;font-weight:bold">update_state</span><span>将创建一个新的检查点。新的检查点将与同一个线程关联，但具有新的检查点 ID。</span></p>

<pre id="t-IErSq6JelZNSqZ7imJAaZP"><code>new_config = graph.update_state(selected_state.config, values={"topic": "chickens"})
print(new_config)</code></pre>

<p id="t-OxLen06x1FLGT1e15R6M6m"><span style="font-weight:bold">输出：</span></p>

<pre id="t-jfjvnyhU4vymSinOzUR5CU"><code>{'configurable': {'thread_id': 'c62e2e03-c27b-4cb6-8cea-ea9bfedae006', 'checkpoint_ns': '', 'checkpoint_id': '1f02ac4a-ecee-600b-8002-a1d21df32e4c'}}</code></pre>


<a id="section-0941"></a>
## 从检查点恢复执行

<a id="t-uf5NS8SsVFJlKfqflSkTwv"></a>

<pre id="t-Zut5iBhATekft9etcc45ct"><code>graph.invoke(None, new_config)</code></pre>

<p id="t-trKkpmtP1M7toGArLPYbmi"><span style="font-weight:bold">输出：</span></p>

<pre id="t-mIxSZjjQAuelgQQKQbu8wQ"><code>{'topic': 'chickens',
'joke': 'Why did the chicken join a band?\n\nBecause it had excellent drumsticks!'}</code></pre>


<a id="section-0942"></a>
## 记忆功能

<a id="t-block-18008"></a>

<p id="t-d1jxcmod83dxlwdcY4Twjp"><span style="background-color:transparent">AI应用需要</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">记忆</span><span style="background-color:transparent">来在多次交互间共享上下文。在LangGraph中，您可以添加两种类型的记忆：</span></p>

<ul><li id="t-DTU9sGz4SaohkjyR2wYxnc"><span style="border-bottom:1px solid;font-weight:bold">添加短期记忆</span><span>作为您智能体</span><span style="border-bottom:1px solid;font-weight:bold">状态</span><span>的一部分，以实现多轮对话。</span></li></ul>

<ul><li id="t-8nCAqUEcotqlewaoGrZtEp"><span style="border-bottom:1px solid;font-weight:bold">添加长期记忆</span><span>以跨会话存储用户特定或应用级别的数据。</span></li></ul>


<a id="section-0943"></a>
## 添加短期记忆

<a id="t-XQpRFIWoXPHFms55gOlDYR"></a>

<p id="t-pN3ff0nPxGBVNzMu3oO9qJ"><span style="font-weight:bold;background-color:transparent">短期</span><span style="background-color:transparent">记忆（线程级</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">持久化</span><span style="background-color:transparent">）使智能体能够跟踪多轮对话。要添加短期记忆：</span></p>

<pre id="t-5W29cvjGvzH2hXdwJxdJdU"><code>from langgraph.checkpoint.memory import InMemorySaver
from langgraph.graph import StateGraph

checkpointer = InMemorySaver()

builder = StateGraph(...)
graph = builder.compile(checkpointer=checkpointer)

graph.invoke(
{"messages": [{"role": "user", "content": "hi! i am Bob"}]},
{"configurable": {"thread_id": "1"}},
)</code></pre>


<a id="section-0944"></a>
## 在生产环境中使用

<a id="t-6K3atU7Bj32yWY4hjS4FzW"></a>

<p id="t-QBaEhxpfEumOo46xZOOLKv"><span style="background-color:transparent">在生产环境中，使用由数据库支持的检查点：</span></p>

<pre id="t-UNS5EhVzCPjvO0mEAMv1Aa"><code>from langgraph.checkpoint.postgres import PostgresSaver

DB_URI = "postgresql://postgres:postgres@localhost:5442/postgres?sslmode=disable"
with PostgresSaver.from_conn_string(DB_URI) as checkpointer:
builder = StateGraph(...)
graph = builder.compile(checkpointer=checkpointer)</code></pre>

<pre id="t-tySa8yQ0ZX6oUu3uMuR6Ir"><code>pip install -U "psycopg[binary,pool]" langgraph langgraph-checkpoint-postgres</code></pre>

<p id="t-9DE717LIwqW7kjUrzkHeky"><span>首次使用Postgres检查点时，需要调用 </span><span>checkpointer.setup()</span></p>

<pre id="t-7jPo6AVNmBa1Ukk50h0fEj"><code>from langchain.chat_models import init_chat_model
from langgraph.graph import StateGraph, MessagesState, START
from langgraph.checkpoint.postgres import PostgresSaver

model = init_chat_model(model="claude-haiku-4-5-20251001")

DB_URI = "postgresql://postgres:postgres@localhost:5442/postgres?sslmode=disable"
with PostgresSaver.from_conn_string(DB_URI) as checkpointer:
# checkpointer.setup()

def call_model(state: MessagesState):
response = model.invoke(state["messages"])
return {"messages": response}

builder = StateGraph(MessagesState)
builder.add_node(call_model)
builder.add_edge(START, "call_model")

graph = builder.compile(checkpointer=checkpointer)

config = {
"configurable": {
"thread_id": "1"
}
}

for chunk in graph.stream(
{"messages": [{"role": "user", "content": "hi! I'm bob"}]},
config,
stream_mode="values"
):
chunk["messages"][-1].pretty_print()

for chunk in graph.stream(
{"messages": [{"role": "user", "content": "what's my name?"}]},
config,
stream_mode="values"
):
chunk["messages"][-1].pretty_print()</code></pre>

<pre id="t-xraIPR9DwMaWgTNARLPkHx"><code>pip install -U pymongo langgraph langgraph-checkpoint-mongodb</code></pre>

<p id="t-NNcxhAE7jS3KUmoYu8eBBP"><span style="font-weight:bold">设置</span><span> 要使用</span><span style="border-bottom:1px solid;font-weight:bold">MongoDB检查点</span><span>，您需要一个MongoDB集群。如果还没有，请按照</span><span style="border-bottom:1px solid;font-weight:bold">本指南</span><span>创建一个集群。</span></p>

<pre id="t-HurVl7Q4s0XxJxe4YI7hTp"><code>from langchain.chat_models import init_chat_model
from langgraph.graph import StateGraph, MessagesState, START
from langgraph.checkpoint.mongodb import MongoDBSaver

model = init_chat_model(model="claude-haiku-4-5-20251001")

DB_URI = "localhost:27017"
with MongoDBSaver.from_conn_string(DB_URI) as checkpointer:

def call_model(state: MessagesState):
response = model.invoke(state["messages"])
return {"messages": response}

builder = StateGraph(MessagesState)
builder.add_node(call_model)
builder.add_edge(START, "call_model")

graph = builder.compile(checkpointer=checkpointer)

config = {
"configurable": {
"thread_id": "1"
}
}

for chunk in graph.stream(
{"messages": [{"role": "user", "content": "hi! I'm bob"}]},
config,
stream_mode="values"
):
chunk["messages"][-1].pretty_print()

for chunk in graph.stream(
{"messages": [{"role": "user", "content": "what's my name?"}]},
config,
stream_mode="values"
):
chunk["messages"][-1].pretty_print()</code></pre>

<pre id="t-43SuovSD1nLDyG4gXa9SnH"><code>pip install -U langgraph langgraph-checkpoint-redis</code></pre>

<p id="t-XhQlIgg7s0mL8ge0IrJ9O5"><span>首次使用Redis检查点时，需要调用 </span><span>checkpointer.setup()</span><span>。</span></p>

<pre id="t-q4WYqO6TT0sxN0Qog7DMUV"><code>from langchain.chat_models import init_chat_model
from langgraph.graph import StateGraph, MessagesState, START
from langgraph.checkpoint.redis import RedisSaver

model = init_chat_model(model="claude-haiku-4-5-20251001")

DB_URI = "redis://localhost:6379"
with RedisSaver.from_conn_string(DB_URI) as checkpointer:
# checkpointer.setup()

def call_model(state: MessagesState):
response = model.invoke(state["messages"])
return {"messages": response}

builder = StateGraph(MessagesState)
builder.add_node(call_model)
builder.add_edge(START, "call_model")

graph = builder.compile(checkpointer=checkpointer)

config = {
"configurable": {
"thread_id": "1"
}
}

for chunk in graph.stream(
{"messages": [{"role": "user", "content": "hi! I'm bob"}]},
config,
stream_mode="values"
):
chunk["messages"][-1].pretty_print()

for chunk in graph.stream(
{"messages": [{"role": "user", "content": "what's my name?"}]},
config,
stream_mode="values"
):
chunk["messages"][-1].pretty_print()</code></pre>


<a id="section-0945"></a>
## 在子图中使用

<a id="t-nzaOXP9s8edWLwQoZxTE1w"></a>

<p id="t-YNtln7d2DN76rD4C6feypD"><span style="background-color:transparent">如果您的图包含</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">子图</span><span style="background-color:transparent">，您只需在编译父图时提供检查点。LangGraph会自动将检查点传播到子图。</span></p>

<pre id="t-gCu7TMk6DRGbgAW5ci0UVp"><code>from langgraph.graph import START, StateGraph
from langgraph.checkpoint.memory import InMemorySaver
from typing import TypedDict

class State(TypedDict):
foo: str

# Subgraph

def subgraph_node_1(state: State):
return {"foo": state["foo"] + "bar"}

subgraph_builder = StateGraph(State)
subgraph_builder.add_node(subgraph_node_1)
subgraph_builder.add_edge(START, "subgraph_node_1")
subgraph = subgraph_builder.compile()

# Parent graph

builder = StateGraph(State)
builder.add_node("node_1", subgraph)
builder.add_edge(START, "node_1")

checkpointer = InMemorySaver()
graph = builder.compile(checkpointer=checkpointer)</code></pre>

<p id="t-gb3LRlAHRJKg02rmYbjOq8"><span style="background-color:transparent">如果您希望子图拥有自己的记忆，可以使用适当的检查点选项编译它。这在</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">多智能体</span><span style="background-color:transparent">系统中非常有用，如果您希望智能体跟踪其内部消息历史记录。</span></p>

<pre id="t-vHeBXcQHg1oICNSPD81FNH"><code>subgraph_builder = StateGraph(...)
subgraph = subgraph_builder.compile(checkpointer=True)</code></pre>


<a id="section-0946"></a>
## 添加长期记忆

<a id="t-ZCmhvba2x4zmPRwRmrqKkO"></a>

<p id="t-srVyWUbYK7pGncsc70pjH7"><span style="background-color:transparent">使用长期记忆跨对话存储用户特定或应用特定的数据。</span></p>

<pre id="t-QdMBAW3uE9F7KGiDxZCArE"><code>from langgraph.store.memory import InMemoryStore
from langgraph.graph import StateGraph

store = InMemoryStore()

builder = StateGraph(...)
graph = builder.compile(store=store)</code></pre>


<a id="section-0947"></a>
## 在生产环境中使用

<a id="t-Pr20pM08rsJZzwZEDXNy29"></a>

<p id="t-S4BvUn1dQjDTiNM1QfswbU"><span style="background-color:transparent">在生产环境中，使用由数据库支持的存储：</span></p>

<pre id="t-Fha0kJzNjyAfqRFP7EUH9C"><code>from langgraph.store.postgres import PostgresStore

DB_URI = "postgresql://postgres:postgres@localhost:5442/postgres?sslmode=disable"
with PostgresStore.from_conn_string(DB_URI) as store:
builder = StateGraph(...)
graph = builder.compile(store=store)</code></pre>

<pre id="t-BYubaWVmyaImGiOzWyFMyb"><code>pip install -U "psycopg[binary,pool]" langgraph langgraph-checkpoint-postgres</code></pre>

<p id="t-sNhmgNhSXHbfBR1pCX4li8"><span>首次使用Postgres存储时，需要调用 </span><span>store.setup()</span></p>

<pre id="t-pnHj2hMqcpYfpjy6wrPa5M"><code>from langchain_core.runnables import RunnableConfig
from langchain.chat_models import init_chat_model
from langgraph.graph import StateGraph, MessagesState, START
from langgraph.checkpoint.postgres import PostgresSaver
from langgraph.store.postgres import PostgresStore
from langgraph.store.base import BaseStore

model = init_chat_model(model="claude-haiku-4-5-20251001")

DB_URI = "postgresql://postgres:postgres@localhost:5442/postgres?sslmode=disable"

with (
PostgresStore.from_conn_string(DB_URI) as store,
PostgresSaver.from_conn_string(DB_URI) as checkpointer,
):
# store.setup()
# checkpointer.setup()

def call_model(
state: MessagesState,
config: RunnableConfig,
*,
store: BaseStore,
):
user_id = config["configurable"]["user_id"]
namespace = ("memories", user_id)
memories = store.search(namespace, query=str(state["messages"][-1].content))
info = "\n".join([d.value["data"] for d in memories])
system_msg = f"You are a helpful assistant talking to the user. User info: {info}"

# Store new memories if the user asks the model to remember
last_message = state["messages"][-1]
if "remember" in last_message.content.lower():
memory = "User name is Bob"
store.put(namespace, str(uuid.uuid4()), {"data": memory})

response = model.invoke(
[{"role": "system", "content": system_msg}] + state["messages"]
)
return {"messages": response}

builder = StateGraph(MessagesState)
builder.add_node(call_model)
builder.add_edge(START, "call_model")

graph = builder.compile(
checkpointer=checkpointer,
store=store,
)

config = {
"configurable": {
"thread_id": "1",
"user_id": "1",
}
}
for chunk in graph.stream(
{"messages": [{"role": "user", "content": "Hi! Remember: my name is Bob"}]},
config,
stream_mode="values",
):
chunk["messages"][-1].pretty_print()

config = {
"configurable": {
"thread_id": "2",
"user_id": "1",
}
}

for chunk in graph.stream(
{"messages": [{"role": "user", "content": "what is my name?"}]},
config,
stream_mode="values",
):
chunk["messages"][-1].pretty_print()</code></pre>

<pre id="t-HemxG188w3ryxNjruwR5OF"><code>pip install -U langgraph langgraph-checkpoint-redis</code></pre>

<p id="t-IJvu8ejZYxurIqdjgbPeAk"><span>首次使用</span><span style="border-bottom:1px solid;font-weight:bold">Redis存储</span><span>时，需要调用 </span><span>store.setup()</span><span>。</span></p>

<pre id="t-s7eKeE3pugKfPbouMINoQj"><code>from langchain_core.runnables import RunnableConfig
from langchain.chat_models import init_chat_model
from langgraph.graph import StateGraph, MessagesState, START
from langgraph.checkpoint.redis import RedisSaver
from langgraph.store.redis import RedisStore
from langgraph.store.base import BaseStore

model = init_chat_model(model="claude-haiku-4-5-20251001")

DB_URI = "redis://localhost:6379"

with (
RedisStore.from_conn_string(DB_URI) as store,
RedisSaver.from_conn_string(DB_URI) as checkpointer,
):
store.setup()
checkpointer.setup()

def call_model(
state: MessagesState,
config: RunnableConfig,
*,
store: BaseStore,
):
user_id = config["configurable"]["user_id"]
namespace = ("memories", user_id)
memories = store.search(namespace, query=str(state["messages"][-1].content))
info = "\n".join([d.value["data"] for d in memories])
system_msg = f"You are a helpful assistant talking to the user. User info: {info}"

# Store new memories if the user asks the model to remember
last_message = state["messages"][-1]
if "remember" in last_message.content.lower():
memory = "User name is Bob"
store.put(namespace, str(uuid.uuid4()), {"data": memory})

response = model.invoke(
[{"role": "system", "content": system_msg}] + state["messages"]
)
return {"messages": response}

builder = StateGraph(MessagesState)
builder.add_node(call_model)
builder.add_edge(START, "call_model")

graph = builder.compile(
checkpointer=checkpointer,
store=store,
)

config = {
"configurable": {
"thread_id": "1",
"user_id": "1",
}
}
for chunk in graph.stream(
{"messages": [{"role": "user", "content": "Hi! Remember: my name is Bob"}]},
config,
stream_mode="values",
):
chunk["messages"][-1].pretty_print()

config = {
"configurable": {
"thread_id": "2",
"user_id": "1",
}
}

for chunk in graph.stream(
{"messages": [{"role": "user", "content": "what is my name?"}]},
config,
stream_mode="values",
):
chunk["messages"][-1].pretty_print()</code></pre>


<a id="section-0948"></a>
## 使用语义搜索

<a id="t-NLkWwHWSBZrMAYd57qcXtB"></a>

<p id="t-e8Q5hL84P6qpVYQwVoKn8n"><span style="background-color:transparent">在图的内存存储中启用语义搜索，让图智能体能够通过语义相似性搜索存储中的项目。</span></p>

<pre id="t-FrHiXuNSzWdQC8jOvYTSze"><code>from langchain.embeddings import init_embeddings
from langgraph.store.memory import InMemoryStore

# Create store with semantic search enabled
embeddings = init_embeddings("openai:text-embedding-3-small")
store = InMemoryStore(
index={
"embed": embeddings,
"dims": 1536,
}
)

store.put(("user_123", "memories"), "1", {"text": "I love pizza"})
store.put(("user_123", "memories"), "2", {"text": "I am a plumber"})

items = store.search(
("user_123", "memories"), query="I'm hungry", limit=1
)</code></pre>

<p id="t-Xi4Pmk3nhhqoxzQ1DvtZSI"><span style="background-color:transparent;color:#1f1f1f">具有语义搜索的长期记忆</span></p>

<pre id="t-ndD6l9F8EwxUlk0eR90FjZ"><code>from langchain.embeddings import init_embeddings
from langchain.chat_models import init_chat_model
from langgraph.store.base import BaseStore
from langgraph.store.memory import InMemoryStore
from langgraph.graph import START, MessagesState, StateGraph

model = init_chat_model("gpt-4o-mini")

# Create store with semantic search enabled
embeddings = init_embeddings("openai:text-embedding-3-small")
store = InMemoryStore(
    index={
 "embed": embeddings,
 "dims": 1536,
 }
)

store.put(("user_123", "memories"), "1", {"text": "I love pizza"})
store.put(("user_123", "memories"), "2", {"text": "I am a plumber"})

def chat(state, *, store: BaseStore):
 # Search based on user's last message
    items = store.search(
 ("user_123", "memories"), query=state["messages"][-1].content, limit=2
 )
    memories = "\n".join(item.value["text"] for item in items)
    memories = f"## Memories of user\n{memories}" if memories else ""
    response = model.invoke(
 [
 {"role": "system", "content": f"You are a helpful assistant.\n{memories}"},
 *state["messages"],
 ]
 )
 return {"messages": [response]}

builder = StateGraph(MessagesState)
builder.add_node(chat)
builder.add_edge(START, "chat")
graph = builder.compile(store=store)

for message, metadata in graph.stream(
 input={"messages": [{"role": "user", "content": "I'm hungry"}]},
    stream_mode="messages",
):
 print(message.content, end="")</code></pre>


<a id="section-0949"></a>
## 管理短期记忆

<a id="t-akcSk7h8drDlGR3TgHHJe9"></a>

<p id="t-t5bfwIirW9i4Ck5HFJ5K6i"><span style="background-color:transparent">启用</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">短期记忆</span><span style="background-color:transparent">后，长对话可能会超出LLM的上下文窗口。常见的解决方案有：</span></p>

<ul><li id="t-ubQcJUSEBvhU8Qg0u0d9tc"><span style="border-bottom:1px solid;font-weight:bold">修剪消息</span><span>：移除前N条或后N条消息（在调用LLM之前）</span></li></ul>

<ul><li id="t-nQqOumwN9bE8HX42uT43CX"><span style="border-bottom:1px solid;font-weight:bold">删除消息</span><span>：从LangGraph状态中永久删除消息</span></li></ul>

<ul><li id="t-v0Lyd5e2AG92bG0oPNCRWL"><span style="border-bottom:1px solid;font-weight:bold">总结消息</span><span>：总结历史中的早期消息并用摘要替换它们</span></li></ul>

<ul><li id="t-VjqEftZjFsApW1Qp2GHmHm"><span style="border-bottom:1px solid;font-weight:bold">管理检查点</span><span>：存储和检索消息历史记录</span></li></ul>

<ul><li id="t-9wL70xILHzYBR2nDnecls5"><span>自定义策略（例如，消息过滤等）</span></li></ul>

<p id="t-wirzvw74qDDZJgR1pqC8ta"><span style="background-color:transparent">这使智能体能够跟踪对话，而不会超出LLM的上下文窗口。</span></p>


<a id="section-0950"></a>
## 修剪消息

<a id="t-44KGMppTrh9LRSOFyH03Yn"></a>

<p id="t-pwbbjuYAyRt7Hhm44eceGw"><span style="background-color:transparent">大多数LLM都有最大支持的上下文窗口（以令牌为单位）。决定何时截断消息的一种方法是计算消息历史记录中的令牌数，并在接近该限制时进行截断。如果您使用LangChain，可以使用修剪消息工具，指定要从列表中保留的令牌数量，以及用于处理边界的</span><span style="background-color:transparent">strategy</span><span style="background-color:transparent">（例如，保留最后</span><span style="background-color:transparent">max_tokens</span><span style="background-color:transparent">个）。</span></p>

<p id="t-nKrv6XQATe4dUowNNA9ElO"><span style="background-color:transparent">要修剪消息历史记录，请使用</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">trim_messages</span><span style="background-color:transparent">函数：</span></p>

<pre id="t-luNzfgoXmeDM80G5InkXfJ"><code>from langchain_core.messages.utils import (
trim_messages,
count_tokens_approximately
)

def call_model(state: MessagesState):
messages = trim_messages(
state["messages"],
strategy="last",
token_counter=count_tokens_approximately,
max_tokens=128,
start_on="human",
end_on=("human", "tool"),
)
response = model.invoke(messages)
return {"messages": [response]}

builder = StateGraph(MessagesState)
builder.add_node(call_model)
...</code></pre>

<p id="t-K7SZHYVD5bv9UaGYREmbIt"><span style="background-color:transparent;color:#1f1f1f">完整示例：修剪消息</span></p>

<pre id="t-dKlKOKhneNjDQbeF7EaEaB"><code>from langchain_core.messages.utils import (
trim_messages,
count_tokens_approximately
)
from langchain.chat_models import init_chat_model
from langgraph.graph import StateGraph, START, MessagesState

model = init_chat_model("claude-sonnet-4-5-20250929")
summarization_model = model.bind(max_tokens=128)

def call_model(state: MessagesState):
messages = trim_messages(
state["messages"],
strategy="last",
token_counter=count_tokens_approximately,
max_tokens=128,
start_on="human",
end_on=("human", "tool"),
)
response = model.invoke(messages)
return {"messages": [response]}

checkpointer = InMemorySaver()
builder = StateGraph(MessagesState)
builder.add_node(call_model)
builder.add_edge(START, "call_model")
graph = builder.compile(checkpointer=checkpointer)

config = {"configurable": {"thread_id": "1"}}
graph.invoke({"messages": "hi, my name is bob"}, config)
graph.invoke({"messages": "write a short poem about cats"}, config)
graph.invoke({"messages": "now do the same but for dogs"}, config)
final_response = graph.invoke({"messages": "what's my name?"}, config)

final_response["messages"][-1].pretty_print()</code></pre>

<pre id="t-eaSyhefea9cAPV4S1rnzzI"><code>================================== Ai Message ==================================

Your name is Bob, as you mentioned when you first introduced yourself.</code></pre>


<a id="section-0951"></a>
## 删除消息

<a id="t-GH2rNaiKhjZLDOZKSn00SS"></a>

<p id="t-WKP7HFMDB8jVvHYzV2ACf8"><span style="background-color:transparent">您可以从图状态中删除消息以管理消息历史记录。这在您想要删除特定消息或清除整个消息历史记录时非常有用。</span></p>

<p id="t-42W9iM4RwJqnTtnfQREsjD"><span style="background-color:transparent">要从图状态中删除消息，可以使用</span><span style="background-color:transparent">RemoveMessage</span><span style="background-color:transparent">。要使</span><span style="background-color:transparent">RemoveMessage</span><span style="background-color:transparent">生效，您需要使用带有@[</span><span style="background-color:transparent">add_messages</span><span style="background-color:transparent">]</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">reducer</span><span style="background-color:transparent">的状态键，例如</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">MessagesState</span><span style="background-color:transparent">。</span></p>

<p id="t-yFw2bv8WS18M1tdfIoUXKY"><span style="background-color:transparent">要删除特定消息：</span></p>

<pre id="t-fp8hf0dVJ6QEmXHY5CZJI2"><code>from langchain.messages import RemoveMessage

def delete_messages(state):
messages = state["messages"]
if len(messages) &gt; 2:
# remove the earliest two messages
return {"messages": [RemoveMessage(id=m.id) for m in messages[:2]]}</code></pre>

<p id="t-HGmlOOL54AWngZemfRa5Cp"><span style="background-color:transparent">要删除</span><span style="font-weight:bold;background-color:transparent">所有</span><span style="background-color:transparent">消息：</span></p>

<pre id="t-q8rf2xfeDl8L3YIcW9NgQz"><code>from langgraph.graph.message import REMOVE_ALL_MESSAGES

def delete_messages(state):
return {"messages": [RemoveMessage(id=REMOVE_ALL_MESSAGES)]}</code></pre>

<blockquote id="t-L6zNGyXO085sHlFOPLFNJ0"><img alt="" decoding="async" height="20" loading="lazy" src="/images/agent-learning/734d70d30cd0f6c5dc73787c.svg" width="20"/><p id="t-M5CvkQUNspMzBqmGvVtHYR"><span>删除消息时，</span><span style="font-weight:bold">请确保</span><span>生成的消息历史记录是有效的。检查您使用的LLM提供商的限制。例如：</span></p>
<ul><li id="t-YcRRe1jZBRfQ4ieo5YrBaa"><span>某些提供商期望消息历史记录以</span><span>user</span><span>消息开头</span></li></ul>
<ul><li id="t-s9k3Rds6mTw5g7G4GFPLpU"><span>大多数提供商要求带有工具调用的</span><span>assistant</span><span>消息后跟相应的</span><span>tool</span><span>结果消息。</span></li></ul></blockquote>

<pre id="t-xW2Dd0ru2vxKZwpn80nt2x"><code>from langchain.messages import RemoveMessage

def delete_messages(state):
messages = state["messages"]
if len(messages) &gt; 2:
# remove the earliest two messages
return {"messages": [RemoveMessage(id=m.id) for m in messages[:2]]}

def call_model(state: MessagesState):
response = model.invoke(state["messages"])
return {"messages": response}

builder = StateGraph(MessagesState)
builder.add_sequence([call_model, delete_messages])
builder.add_edge(START, "call_model")

checkpointer = InMemorySaver()
app = builder.compile(checkpointer=checkpointer)

for event in app.stream(
{"messages": [{"role": "user", "content": "hi! I'm bob"}]},
config,
stream_mode="values"
):
print([(message.type, message.content) for message in event["messages"]])

for event in app.stream(
{"messages": [{"role": "user", "content": "what's my name?"}]},
config,
stream_mode="values"
):
print([(message.type, message.content) for message in event["messages"]])</code></pre>

<pre id="t-fwy7VII9zWmgNehhg4oFmn"><code>[('human', "hi! I'm bob")]
[('human', "hi! I'm bob"), ('ai', 'Hi Bob! How are you doing today? Is there anything I can help you with?')]
[('human', "hi! I'm bob"), ('ai', 'Hi Bob! How are you doing today? Is there anything I can help you with?'), ('human', "what's my name?")]
[('human', "hi! I'm bob"), ('ai', 'Hi Bob! How are you doing today? Is there anything I can help you with?'), ('human', "what's my name?"), ('ai', 'Your name is Bob.')]
[('human', "what's my name?"), ('ai', 'Your name is Bob.')]</code></pre>


<a id="section-0952"></a>
## 总结消息

<a id="t-dcHs1dcDGryBGUoJeNW6c0"></a>

<p id="t-g1aLLsy1ylR4VXWMEhsHyk"><span style="background-color:transparent">如上所示，修剪或删除消息的问题在于，您可能会因消息队列的删减而丢失信息。因此，一些应用程序受益于使用聊天模型总结消息历史记录的更复杂方法。</span></p>

<div id="t-YtbqUYrlo9Ee0JKAJLeh8d"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/b1720632ed5e998119db9d73.png"/></div>

<p id="t-z9XGSuiAaG6jaxnpfaqYaz"><span style="background-color:transparent">可以使用提示和编排逻辑来总结消息历史记录。例如，在LangGraph中，您可以扩展</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">MessagesState</span><span style="background-color:transparent">以包含</span><span style="background-color:transparent">summary</span><span style="background-color:transparent">键：</span></p>

<pre id="t-ZsDT01LofXc8VaJa2OTNuh"><code>from langgraph.graph import MessagesState
class State(MessagesState):
summary: str</code></pre>

<p id="t-OdeVCuiWeAcq0t4LklRS1R"><span style="background-color:transparent">然后，您可以生成聊天历史记录的摘要，使用任何现有的摘要作为下一个摘要的上下文。这个</span><span style="background-color:transparent">summarize_conversation</span><span style="background-color:transparent">节点可以在</span><span style="background-color:transparent">messages</span><span style="background-color:transparent">状态键中累积了一定数量的消息后被调用。</span></p>

<pre id="t-NGpK76R1It9kxELd1v88Yl"><code>def summarize_conversation(state: State):

# First, we get any existing summary
summary = state.get("summary", "")

# Create our summarization prompt
if summary:

# A summary already exists
summary_message = (
f"This is a summary of the conversation to date: {summary}\n\n"
"Extend the summary by taking into account the new messages above:"
)

else:
summary_message = "Create a summary of the conversation above:"

# Add prompt to our history
messages = state["messages"] + [HumanMessage(content=summary_message)]
response = model.invoke(messages)

# Delete all but the 2 most recent messages
delete_messages = [RemoveMessage(id=m.id) for m in state["messages"][:-2]]
return {"summary": response.content, "messages": delete_messages}</code></pre>

<p id="t-3wEuNPp2L79Rrpo8OryOY2"><span style="background-color:transparent;color:#1f1f1f">完整示例：总结消息</span></p>

<pre id="t-o8PjGC0zOLt4E6GD1tjqxp"><code>from typing import Any, TypedDict

from langchain.chat_models import init_chat_model
from langchain.messages import AnyMessage
from langchain_core.messages.utils import count_tokens_approximately
from langgraph.graph import StateGraph, START, MessagesState
from langgraph.checkpoint.memory import InMemorySaver
from langmem.short_term import SummarizationNode, RunningSummary

model = init_chat_model("claude-sonnet-4-5-20250929")
summarization_model = model.bind(max_tokens=128)

class State(MessagesState):
context: dict[str, RunningSummary]

class LLMInputState(TypedDict):
summarized_messages: list[AnyMessage]
context: dict[str, RunningSummary]

summarization_node = SummarizationNode(
token_counter=count_tokens_approximately,
model=summarization_model,
max_tokens=256,
max_tokens_before_summary=256,
max_summary_tokens=128,
)

def call_model(state: LLMInputState):
response = model.invoke(state["summarized_messages"])
return {"messages": [response]}

checkpointer = InMemorySaver()
builder = StateGraph(State)
builder.add_node(call_model)
builder.add_node("summarize", summarization_node)
builder.add_edge(START, "summarize")
builder.add_edge("summarize", "call_model")
graph = builder.compile(checkpointer=checkpointer)

# Invoke the graph
config = {"configurable": {"thread_id": "1"}}
graph.invoke({"messages": "hi, my name is bob"}, config)
graph.invoke({"messages": "write a short poem about cats"}, config)
graph.invoke({"messages": "now do the same but for dogs"}, config)
final_response = graph.invoke({"messages": "what's my name?"}, config)

final_response["messages"][-1].pretty_print()
print("\nSummary:", final_response["context"]["running_summary"].summary)</code></pre>

<ol start="1"><li id="t-b2LpssgBPEQWOIQmDnNpyR"><span>我们将在</span><span>context</span><span>字段中跟踪我们的运行摘要</span></li></ol>

<p id="t-WGnSAerSvrke5bp2b0ygkH"><span>（由</span><span>SummarizationNode</span><span>期望）。</span></p>

<ol start="1"><li id="t-qNKZoQABLLHjwHzCUWDBvW"><span>定义仅用于过滤</span><span>call_model</span><span>节点输入的私有状态。</span></li></ol>

<ol start="2"><li id="t-izIKWMpxAOP7HagWNFBIPi"><span>我们在这里传递私有输入状态，以隔离由总结节点返回的消息。</span></li></ol>

<pre id="t-52EZB93FqKub3uFq02jWj5"><code>================================== Ai Message ==================================

From our conversation, I can see that you introduced yourself as Bob. That's the name you shared with me when we began talking.

Summary: In this conversation, I was introduced to Bob, who then asked me to write a poem about cats. I composed a poem titled "The Mystery of Cats" that captured cats' graceful movements, independent nature, and their special relationship with humans. Bob then requested a similar poem about dogs, so I wrote "The Joy of Dogs," which highlighted dogs' loyalty, enthusiasm, and loving companionship. Both poems were written in a similar style but emphasized the distinct characteristics that make each pet special.</code></pre>


<a id="section-0953"></a>
## 管理检查点

<a id="t-FNjz0z8430k6jBVoitaPfn"></a>

<p id="t-RQ2sERJ4jNg1lRF8U2x50x"><span style="background-color:transparent">您可以查看和删除检查点存储的信息。</span></p>

<a id="t-I7iFG8Ocnf6Z9cIAT9CACN"></a>

##### 查看线程状态

<p id="t-JY7Tv8iSx7wsZKeEPiCMDq"><span style="border-bottom:1px solid;font-weight:bold">图/函数式API</span></p>

<pre id="t-fgfUEx5bjk3JOrTG7b2Ftc"><code>config = {
"configurable": {
"thread_id": "1",
# optionally provide an ID for a specific checkpoint,
# otherwise the latest checkpoint is shown
# "checkpoint_id": "1f029ca3-1f5b-6704-8004-820c16b69a5a"  #

}
}
graph.get_state(config)</code></pre>

<pre id="t-sCHEHlMxxvTnXaILJogSoz"><code>StateSnapshot(
values={'messages': [HumanMessage(content="hi! I'm bob"), AIMessage(content='Hi Bob! How are you doing today?), HumanMessage(content="what's my name?"), AIMessage(content='Your name is Bob.')]}, next=(),
config={'configurable': {'thread_id': '1', 'checkpoint_ns': '', 'checkpoint_id': '1f029ca3-1f5b-6704-8004-820c16b69a5a'}},
metadata={
'source': 'loop',
'writes': {'call_model': {'messages': AIMessage(content='Your name is Bob.')}},
'step': 4,
'parents': {},
'thread_id': '1'
},
created_at='2025-05-05T16:01:24.680462+00:00',
parent_config={'configurable': {'thread_id': '1', 'checkpoint_ns': '', 'checkpoint_id': '1f029ca3-1790-6b0a-8003-baf965b6a38f'}},
tasks=(),
interrupts=()
)</code></pre>

<a id="t-zCb2SnDIVzrfLjcvf3WhQK"></a>

##### 查看线程的历史记录

<pre id="t-xx7GOPFbyRczTYbb0vXOkq"><code>config = {
"configurable": {
"thread_id": "1"
}
}
list(graph.get_state_history(config))</code></pre>

<pre id="t-jZLbc83bctBWUkAhz54c0Y"><code>[
StateSnapshot(
values={'messages': [HumanMessage(content="hi! I'm bob"), AIMessage(content='Hi Bob! How are you doing today? Is there anything I can help you with?'), HumanMessage(content="what's my name?"), AIMessage(content='Your name is Bob.')]},
next=(),
config={'configurable': {'thread_id': '1', 'checkpoint_ns': '', 'checkpoint_id': '1f029ca3-1f5b-6704-8004-820c16b69a5a'}},
metadata={'source': 'loop', 'writes': {'call_model': {'messages': AIMessage(content='Your name is Bob.')}}, 'step': 4, 'parents': {}, 'thread_id': '1'},
created_at='2025-05-05T16:01:24.680462+00:00',
parent_config={'configurable': {'thread_id': '1', 'checkpoint_ns': '', 'checkpoint_id': '1f029ca3-1790-6b0a-8003-baf965b6a38f'}},
tasks=(),
interrupts=()
),
StateSnapshot(
values={'messages': [HumanMessage(content="hi! I'm bob"), AIMessage(content='Hi Bob! How are you doing today? Is there anything I can help you with?'), HumanMessage(content="what's my name?")]},
next=('call_model',),
config={'configurable': {'thread_id': '1', 'checkpoint_ns': '', 'checkpoint_id': '1f029ca3-1790-6b0a-8003-baf965b6a38f'}},
metadata={'source': 'loop', 'writes': None, 'step': 3, 'parents': {}, 'thread_id': '1'},
created_at='2025-05-05T16:01:23.863421+00:00',
parent_config={...}
tasks=(PregelTask(id='8ab4155e-6b15-b885-9ce5-bed69a2c305c', name='call_model', path=('__pregel_pull', 'call_model'), error=None, interrupts=(), state=None, result={'messages': AIMessage(content='Your name is Bob.')}),),
interrupts=()
),
StateSnapshot(
values={'messages': [HumanMessage(content="hi! I'm bob"), AIMessage(content='Hi Bob! How are you doing today? Is there anything I can help you with?')]},
next=('__start__',),
config={...},
metadata={'source': 'input', 'writes': {'__start__': {'messages': [{'role': 'user', 'content': "what's my name?"}]}}, 'step': 2, 'parents': {}, 'thread_id': '1'},
created_at='2025-05-05T16:01:23.863173+00:00',
parent_config={...}
tasks=(PregelTask(id='24ba39d6-6db1-4c9b-f4c5-682aeaf38dcd', name='__start__', path=('__pregel_pull', '__start__'), error=None, interrupts=(), state=None, result={'messages': [{'role': 'user', 'content': "what's my name?"}]}),),
interrupts=()
),
StateSnapshot(
values={'messages': [HumanMessage(content="hi! I'm bob"), AIMessage(content='Hi Bob! How are you doing today? Is there anything I can help you with?')]},
next=(),
config={...},
metadata={'source': 'loop', 'writes': {'call_model': {'messages': AIMessage(content='Hi Bob! How are you doing today? Is there anything I can help you with?')}}, 'step': 1, 'parents': {}, 'thread_id': '1'},
created_at='2025-05-05T16:01:23.862295+00:00',
parent_config={...}
tasks=(),
interrupts=()
),
StateSnapshot(
values={'messages': [HumanMessage(content="hi! I'm bob")]},
next=('call_model',),
config={...},
metadata={'source': 'loop', 'writes': None, 'step': 0, 'parents': {}, 'thread_id': '1'},
created_at='2025-05-05T16:01:22.278960+00:00',
parent_config={...}
tasks=(PregelTask(id='8cbd75e0-3720-b056-04f7-71ac805140a0', name='call_model', path=('__pregel_pull', 'call_model'), error=None, interrupts=(), state=None, result={'messages': AIMessage(content='Hi Bob! How are you doing today? Is there anything I can help you with?')}),),
interrupts=()
),
StateSnapshot(
values={'messages': []},
next=('__start__',),
config={'configurable': {'thread_id': '1', 'checkpoint_ns': '', 'checkpoint_id': '1f029ca3-0870-6ce2-bfff-1f3f14c3e565'}},
metadata={'source': 'input', 'writes': {'__start__': {'messages': [{'role': 'user', 'content': "hi! I'm bob"}]}}, 'step': -1, 'parents': {}, 'thread_id': '1'},
created_at='2025-05-05T16:01:22.277497+00:00',
parent_config=None,
tasks=(PregelTask(id='d458367b-8265-812c-18e2-33001d199ce6', name='__start__', path=('__pregel_pull', '__start__'), error=None, interrupts=(), state=None, result={'messages': [{'role': 'user', 'content': "hi! I'm bob"}]}),),
interrupts=()
)
]</code></pre>

<a id="t-hDKMynFGIHbTE83M6tBQLh"></a>

##### 删除线程的所有检查点

<pre id="t-ggJyiJOytTzeSzlWaL1aeA"><code>thread_id = "1"
checkpointer.delete_thread(thread_id)</code></pre>


<a id="section-0954"></a>
## 预构建的记忆工具

<a id="t-FpvpXaZcfiC3RaBKVFYhQ1"></a>

<p id="t-hgPx6kNVl1e1gddGufhet3"><span style="font-weight:bold;background-color:transparent">LangMem</span><span style="background-color:transparent">是一个由LangChain维护的库，提供用于管理智能体中长期记忆的工具。有关使用示例，请参阅</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">LangMem文档</span><span style="background-color:transparent">。</span></p>


<a id="section-0955"></a>
## 数据库管理

<a id="t-20dofzbXeeYjGnwLmlbHJm"></a>

<p id="t-UUhosjoRAXLC56dBWmssjn"><span style="background-color:transparent">如果您使用任何数据库支持的持久化实现（例如Postgres或Redis）来存储短期和/或长期记忆，您需要在与数据库一起使用之前运行迁移以设置所需的模式。</span></p>

<p id="t-4WV9D6xO8XqXeHOG02wHhy"><span style="background-color:transparent">按照惯例，大多数数据库特定的库在检查点或存储实例上定义了一个</span><span style="background-color:transparent">setup()</span><span style="background-color:transparent">方法，用于运行所需的迁移。但是，您应该检查您特定的</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">BaseCheckpointSaver</span><span style="background-color:transparent">或</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">BaseStore</span><span style="background-color:transparent">实现，以确认确切的方法名称和用法。</span></p>

<p id="t-z8egi5q8Edd3ldGLZqso4Q"><span style="background-color:transparent">我们建议将迁移作为专门的部署步骤运行，或者确保它们在服务器启动时运行。</span></p>


<a id="section-0956"></a>
## 子图

<a id="t-block-18106"></a>

<p id="t-m4dZDEZouWWctsrX9kWfOi"><span style="background-color:transparent">本指南解释了使用子图（subgraph）的机制。子图是一个</span><span style="font-weight:bold;background-color:transparent">图</span><span style="background-color:transparent">，在另一个图中用作</span><span style="font-weight:bold;background-color:transparent">节点</span><span style="background-color:transparent">。</span></p>

<p id="t-hBGAyqSRfgsQXOp0MMks3A"><span style="background-color:transparent">子图适用于：</span></p>

<ul><li id="t-XRLsIWQ9pzXWpPI4Blt0KE"><span>构建</span><span style="font-weight:bold">多智能体系统</span></li></ul>

<ul><li id="t-AW6Z0pdKMxxjiJ0zGDe42b"><span>在多个图中复用一组节点</span></li></ul>

<ul><li id="t-JQ0mroHkJ8HlGUgzpmsA5P"><span>分布式开发：当希望不同团队独立处理图的不同部分时，可以将每个部分定义为一个子图。只要子图接口（输入和输出模式）得到遵守，父图就可以在不知道子图任何细节的情况下构建</span></li></ul>

<p id="t-k7BvWXkd9zznj9PUIfnMTw"><span style="background-color:transparent">添加子图时，需要定义父图和子图之间的通信方式：</span></p>

<ul><li id="t-9rH3ns3RR515VvXo8ttX51"><span style="font-weight:bold">从节点调用图</span><span> —— 子图从父图的节点内部调用</span></li></ul>

<ul><li id="t-QTlUrh2eJ8VosQPhjVg209"><span style="font-weight:bold">将图添加为节点</span><span> —— 子图直接作为节点添加到父图中，并与父图</span><span style="font-weight:bold">共享状态键（state keys）</span></li></ul>


<a id="section-0957"></a>
## 环境设置

<a id="t-h6zWPSypzaZjgMwVodzLIX"></a>

<p id="t-CLEfLe7ikrw1McnVLxwf03"><span style="font-weight:bold">为 LangGraph 开发设置 LangSmith</span><span> 注册 </span><span style="font-weight:bold">LangSmith</span><span> 以快速发现问题并提升 LangGraph 项目的性能。LangSmith 让你能够使用追踪数据来调试、测试和监控使用 LangGraph 构建的 LLM 应用 —— 阅读更多关于如何开始的</span><span style="font-weight:bold">信息</span><span>。</span></p>


<a id="section-0958"></a>
## 从节点调用图

<a id="t-dBMazFrk9kNB2ZGfdDK4ZW"></a>

<p id="t-XqGv6YgC4qymfAkSa2FoT4"><span style="background-color:transparent">实现子图的一种简单方法是从另一个图的节点内部调用一个图。在这种情况下，子图可以拥有与父图</span><span style="font-weight:bold;background-color:transparent">完全不同的模式</span><span style="background-color:transparent">（没有共享的键）。例如，你可能希望在</span><span style="font-weight:bold;background-color:transparent">多智能体</span><span style="background-color:transparent">系统中为每个智能体保留私有的消息历史记录。</span></p>

<p id="t-bf1iWW3s7CbFJ7ewWSXRhW"><span style="background-color:transparent">如果你的应用属于这种情况，你需要定义一个</span><span style="font-weight:bold;background-color:transparent">调用子图的节点函数</span><span style="background-color:transparent">。该函数需要在调用子图之前将输入（父）状态转换为子图状态，并在从节点返回状态更新之前将结果转换回父状态。</span></p>

<p id="t-5Jo0yywJw5jdyB0ZxDfiWK"><span style="background-color:transparent;color:#1f1f1f">完整示例：不同的状态模式</span></p>

<p id="t-5a63x3jzxumdw6WtQQzqr3"><span style="background-color:transparent;color:#1f1f1f">完整示例：不同的状态模式（两级子图）</span></p>


<a id="section-0959"></a>
## 将图添加为节点

<a id="t-7QHQXIQJyXZtsQPJrB4n8v"></a>

<p id="t-mtET8bJ0CyGN0k3GMUKhIU"><span style="background-color:transparent">当父图和子图可以通过</span><span style="font-weight:bold;background-color:transparent">模式</span><span style="background-color:transparent">中的共享状态键（通道）进行通信时，你可以将一个图作为</span><span style="font-weight:bold;background-color:transparent">节点</span><span style="background-color:transparent">添加到另一个图中。例如，在</span><span style="font-weight:bold;background-color:transparent">多智能体</span><span style="background-color:transparent">系统中，智能体通常通过共享的</span><span style="font-weight:bold;background-color:transparent">消息</span><span style="background-color:transparent">键进行通信。</span></p>

<div id="t-D3pGt2PWdZMxw6gU7Quwso"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/35eb1e1fcccd4cfca5fcf3ce.png"/></div>

<p id="t-n7E7PsoqpA8T411KtEiWFh"><span>如果你的子图与父图共享状态键，可以按照以下步骤将其添加到你的图中：</span></p>

<ol start="1"><li id="t-nyiJ3DPKVAIQ6176pkNpkA"><span>定义子图工作流（下例中的 </span><span>subgraph_builder</span><span>）并编译它</span></li></ol>

<ol start="2"><li id="t-SDFslW17DqNg6hq0LAjQHA"><span>在定义父图工作流时，将编译好的子图传递给 </span><span>add_node</span><span> 方法</span></li></ol>

<p id="t-OY0O9wuiusv6fwTxlQ1tQj"><span>完整示例：共享状态模式</span></p>


<a id="section-0960"></a>
## 子图持久化

<a id="t-dpTn5KqztfjDIT4a9vcD6C"></a>

<p id="t-3HMq2LW35FkNxTSHsRnj7H"><span>当你使用子图时，需要决定在多次调用之间如何处理其内部数据。考虑一个将任务委派给专家子代理的客户支持机器人：“账单专家”子代理应该记住客户之前的问题，还是每次被调用时都重新开始？</span><span>.compile()</span><span> 上的 </span><span>checkpointer</span><span> 参数控制子图的持久化：</span></p>

<p id="t-wpBwgZ5ewOrk8nc5ZA9stW"><span>对于大多数应用程序（包括子代理处理独立请求的多代理系统），“每次调用”是合适的选择。当子代理需要多轮对话记忆时（例如，一个在多次交互中建立上下文的科研助手），请使用“每个线程”。</span></p>

<p id="t-pfJwZ7rhhesw1qDHmsEaHD"><span>父图必须使用检查点器进行编译，子图的持久化功能（中断、状态检查、每线程记忆）才能生效。请参阅持久化文档。</span></p>

<p id="t-7szMWD8D5tA35aGuWts67L"><span>以下示例使用 LangChain 的 </span><span>create_agent</span><span>，这是构建代理的常用方法。</span><span>create_agent</span><span> 在底层生成一个 LangGraph 图，因此所有子图持久化概念都直接适用。如果你使用原生 LangGraph </span><span>StateGraph</span><span> 构建，同样的模式和配置选项也适用——详情请参阅图 API 文档。</span></p>


<a id="section-0961"></a>
## 有状态

<a id="t-30M67C0iGvJmJhnqnnbZbj"></a>

<p id="t-dRjGB8vVfTcYwtiFZMg7r1"><span>有状态子图继承父图的检查点器，从而支持中断、持久化和状态检查。两种有状态模式的区别在于状态保留的时间长短。</span></p>

<a id="t-WgU5VueQJqrN1I8zOAVlEP"></a>

##### 每次调用（默认）

<p id="t-ND3qb9GKXU9uDP07DjhSx1"><span>这是大多数应用程序（包括将子代理作为工具调用的多代理系统）的推荐模式。它支持中断、持久化和并行调用，同时保持每次调用的隔离性。</span></p>

<p id="t-emF5gyGlHrjDoFPHSYEbl3"><span>当每次对子图的调用都是独立的，且子代理不需要记住之前调用的任何内容时，请使用每次调用持久化。这是最常见的模式，特别是对于多代理系统，其中子代理处理一次性请求，如“查找此客户的订单”或“总结此文档”。省略 </span><span>checkpointer</span><span> 或将其设置为 </span><span>None</span><span>。每次调用都重新开始，但在单次调用内，子图继承父图的检查点器，并可以使用 </span><span>interrupt()</span><span> 来暂停和恢复。以下示例使用两个子代理（水果专家、蔬菜专家），它们被包装为外部代理的工具：</span></p>

<p id="t-5VlcjUjPI1xkDaIviD2coG"><span>每次调用都可以使用 </span><span>interrupt()</span><span> 来暂停和恢复。在工具函数中添加 </span><span>interrupt()</span><span> 以要求用户批准后再继续：</span></p>

<a id="t-4mO3ygVQaCCQHCu4aL3S1o"></a>

##### 每个线程

<p id="t-8CiI4vfbyy8g1ARAJO1RcU"><span>当子代理需要记住之前的交互时，请使用每线程持久化。例如，一个在多次交流中建立上下文的科研助手，或一个跟踪已编辑文件编码助手。子代理的对话历史和数据在同一线程的多次调用中累积。每次调用都从上次结束的地方继续。使用 </span><span>checkpointer=True</span><span> 编译以启用此行为。</span></p>

<p id="t-o1EObYtexrzjY7OwbSGARC"><span>每线程子图不支持并行工具调用。当 LLM 可以访问作为工具的每线程子代理时，它可能会尝试并行多次调用该工具（例如，同时询问水果专家关于苹果和香蕉的问题）。这会导致检查点冲突，因为两个调用都会写入同一个命名空间。以下示例使用 LangChain 的 </span><span>ToolCallLimitMiddleware</span><span> 来防止这种情况。如果你使用纯 LangGraph </span><span>StateGraph</span><span> 构建，你需要自己防止并行工具调用——例如，通过配置你的模型禁用并行工具调用，或添加逻辑确保同一子图不会被并行多次调用。</span></p>

<p id="t-0f6tLQOMo2V2roV9c2tsZt"><span>以下示例使用编译时设置了 </span><span>checkpointer=True</span><span> 的水果专家子代理：</span></p>

<p id="t-x5qbjoyibbx7y2lhgmWgEm"><span>每线程子代理支持 </span><span>interrupt()</span><span>，就像每次调用模式一样。在工具函数中添加 </span><span>interrupt()</span><span> 以要求用户批准：</span></p>


<a id="section-0962"></a>
## 无状态

<a id="t-tQe3b5kYYPdxBXwL2gVxwG"></a>

<p id="t-jw0rmeO4pIfOpjn4GzJbuK"><span>当你想像普通函数调用一样运行子代理且无需检查点开销时，请使用此模式。子图无法暂停/恢复，也无法从持久化执行中受益。使用 </span><span>checkpointer=False</span><span> 编译。</span></p>

<p id="t-G79fEhjdjAkIM1KptikA5V"><span>没有检查点，子图就没有持久化执行。如果进程在运行中崩溃，子图无法恢复，必须从开头重新运行。</span></p>


<a id="section-0963"></a>
## 检查点器参考

<a id="t-1y5r5M9RTSIuP3uNgiAE8u"></a>

<p id="t-Rj7xHskkcXpyZ3Go2A24SD"><span>使用 </span><span>.compile()</span><span> 上的 </span><span>checkpointer</span><span> 参数控制子图持久化：</span></p>

<ul><li id="t-T9yLBgbhiu0zT91PkM1Y2v"><span style="font-weight:bold">中断 (HITL)</span><span>：子图可以使用 </span><span>interrupt()</span><span> 暂停执行并等待用户输入，然后从中断处恢复。</span></li></ul>

<ul><li id="t-dNZhyzjmjmyeedI3M9tpz7"><span style="font-weight:bold">多轮记忆</span><span>：子图在同一线程内的多次调用中保留其状态。每次调用都从上次结束的地方继续，而不是重新开始。</span></li></ul>

<ul><li id="t-XSLve1XpfC3F2cJS20273X"><span style="font-weight:bold">多次调用（不同子图）</span><span>：单个节点内可以调用多个不同的子图实例，而不会发生检查点命名空间冲突。</span></li></ul>

<ul><li id="t-M9iF4aGdIMLdiS60U8iNng"><span style="font-weight:bold">多次调用（相同子图）</span><span>：单个节点内可以多次调用相同的子图实例。对于状态持久化，这些调用会写入同一个检查点命名空间并发生冲突——请改用每次调用持久化。</span></li></ul>

<ul><li id="t-1IGlA9OPZpATIMJB8fCmIC"><span style="font-weight:bold">状态检查</span><span>：子图的状态可通过 </span><span>get_state(config, subgraphs=True)</span><span> 获取，用于调试和监控。</span></li></ul>


<a id="section-0964"></a>
## 查看子图状态

<a id="t-mZ4FxvKb1ZVmT8bBufVWeG"></a>

<p id="t-NHDxE6HJuIy5WyyebIbREN"><span>当你启用持久化时，可以使用 </span><span>subgraphs</span><span> 选项检查子图状态。对于无状态检查点（</span><span>checkpointer=False</span><span>），不会保存子图检查点，因此子图状态不可用。</span></p>

<p id="t-dnkaRktWYHec3zyFRq3kc4"><span>查看子图状态要求 LangGraph 能够静态发现子图——即，它是作为节点添加或在节点内部调用。当子图在工具函数或其他间接方式（例如 </span><span>subagents</span><span> 模式）中调用时，此功能不起作用。无论嵌套如何，中断仍会传播到顶层图。</span></p>

<ul><li id="t-fYY3qdoqspk39MiD9TgAKW"><span>每次调用</span></li></ul>

<ul><li id="t-oLRbi3d0JS5eMJGz5w1xia"><span>每个线程</span></li></ul>

<p id="t-nMjdLHTU0vPULtGhjKvxa1"><span>仅返回当前调用的子图状态。每次调用都重新开始。</span></p>


<a id="section-0965"></a>
## 流式传输子图输出

<a id="t-t67MXuql2jHvcDW5laYnm3"></a>

<p id="t-tOd0OV1R5p7hQOk6r5rYyu"><span>要观察嵌套图的执行，我们推荐事件流：</span><span>stream.subgraphs</span><span> 投影发现每个嵌套运行并公开其路径、消息和值，而无需解析命名空间字符串。</span></p>

<p id="t-a0vEHTvw6rmjCy20IFkJyC"><span>如果你需要原始协议事件，可以直接迭代流并过滤 </span><span>event["method"]</span><span> 和 </span><span>event["params"]["namespace"]</span><span>：</span></p>

<p id="t-a4IMs6wTFJdNulbcUJSpN7"><span>从子图流式传输</span></p>


<a id="section-0968"></a>
## 选择合适的接口

<a id="t-block-18195"></a>

<p id="t-ow2oYT1dQd0185jnc2SGyY"><span style="background-color:transparent">LangGraph 提供了两种不同的 API 来构建智能体工作流：</span><span style="font-weight:bold;background-color:transparent">Graph API</span><span style="background-color:transparent"> 和 </span><span style="font-weight:bold;background-color:transparent">Functional API</span><span style="background-color:transparent">。这两种 API 共享相同的底层运行时，可以在同一个应用程序中一起使用，但它们是为不同的用例和开发偏好而设计的。</span></p>

<p id="t-KML0PwBYlMjOSSldUhTg0H"><span style="background-color:transparent">本指南将帮助您根据具体需求了解何时使用每种 API。</span></p>


<a id="section-0969"></a>
## 快速决策指南

<a id="t-UE8IIRqswxGw7DbBXcRYED"></a>

<p id="t-OOux9KOz8rprXAJpN5zhlY"><span style="background-color:transparent">在以下情况下使用</span><span style="font-weight:bold;background-color:transparent">Graph API</span><span style="background-color:transparent">：</span></p>

<ul><li id="t-Vl2SbHMtKtUlL5MIsYN5RN"><span>用于调试和文档的</span><span style="font-weight:bold">复杂工作流可视化</span></li></ul>

<ul><li id="t-fXozxJFHz6XJEridoUyk1r"><span>跨多个节点共享数据的</span><span style="font-weight:bold">显式状态管理</span></li></ul>

<ul><li id="t-itwCYtMENUADRUO7IanqHW"><span>具有多个决策点的</span><span style="font-weight:bold">条件分支</span></li></ul>

<ul><li id="t-UqePtD8F8uqmb9tsrzYu9B"><span>需要稍后合并的</span><span style="font-weight:bold">并行执行路径</span></li></ul>

<ul><li id="t-qozsYjcB5iAW6w0oiVeF68"><span>视觉呈现有助于理解的</span><span style="font-weight:bold">团队协作</span></li></ul>

<p id="t-mnGUep3pol3UsBtAAUqESx"><span style="background-color:transparent">在以下情况下使用</span><span style="font-weight:bold;background-color:transparent">Functional API</span><span style="background-color:transparent">：</span></p>

<ul><li id="t-SQuwQ3LmfFAxLR3HnK4b2h"><span>对现有过程式代码进行</span><span style="font-weight:bold">最小的代码更改</span></li></ul>

<ul><li id="t-LVpsVUzfuGJaM37BeBZgz5"><span style="font-weight:bold">标准控制流</span><span>（if/else、循环、函数调用）</span></li></ul>

<ul><li id="t-y5ehi8l0pNRvEhDn9Zz4Qe"><span>无需显式状态管理的</span><span style="font-weight:bold">函数作用域状态</span></li></ul>

<ul><li id="t-S0KfNQZP3IUj89oz0AIXfD"><span>减少样板代码的</span><span style="font-weight:bold">快速原型设计</span></li></ul>

<ul><li id="t-1q8hn3eeoGXU19IRfH9afX"><span>具有简单分支逻辑的</span><span style="font-weight:bold">线性工作流</span></li></ul>


<a id="section-0971"></a>
## 何时使用 Graph API

<a id="t-FC7q4Nwv9nA5duBMjkDYtG"></a>

<p id="t-Vor0OpAuZEOCBkoJFsLBdJ"><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">Graph API</span><span style="background-color:transparent"> 采用声明式方法，您需要定义节点、边和共享状态来创建可视化的图结构。</span></p>

<p id="t-n7MXcXpWIFhAVbbgVlKGOS"><span style="font-weight:bold;background-color:transparent">1. 复杂的决策树和分支逻辑</span></p>

<p id="t-TcCQeDlci1ZVykWQ1MRU97"><span style="background-color:transparent">当您的工作流具有依赖于各种条件的多个决策点时，Graph API 使这些分支变得明确且易于可视化。</span></p>

<pre id="t-57BHRMGJ0qq3lxTZBFLYuU"><code># Graph API: 决策路径清晰可视化
from langgraph.graph import StateGraph
from typing import TypedDict

class AgentState(TypedDict):
messages: list
current_tool: str
retry_count: int

def should_continue(state):
if state["retry_count"] &gt; 3:
return "end"
elif state["current_tool"] == "search":
return "process_search"
else:
return "call_llm"

workflow = StateGraph(AgentState)
workflow.add_node("call_llm", call_llm_node)
workflow.add_node("process_search", search_node)
workflow.add_conditional_edges("call_llm", should_continue)</code></pre>

<p id="t-ZA5ztzNhET5ZsBpaST3Sgl"><span style="font-weight:bold;background-color:transparent">2. 跨多个组件的状态管理</span></p>

<p id="t-RLQwyfBkgM4vQoEDdFnjUA"><span style="background-color:transparent">当您需要在工作流的不同部分之间共享和协调状态时，Graph API 的显式状态管理非常有益。</span></p>

<pre id="t-SQAMwIgUOW1BDplXKcyIhP"><code># 多个节点可以访问和修改共享状态
class WorkflowState(TypedDict):
user_input: str
search_results: list
generated_response: str
validation_status: str

def search_node(state):
# 访问共享状态
results = search(state["user_input"])
return {"search_results": results}

def validation_node(state):
# 访问前一个节点的结果
is_valid = validate(state["generated_response"])
return {"validation_status": "valid" if is_valid else "invalid"}</code></pre>

<p id="t-OtFUcMSjkUS6zlsy89oa8B"><span style="font-weight:bold;background-color:transparent">3. 带同步的并行处理</span></p>

<p id="t-9XxjBruHaR205wvk0czIr8"><span style="background-color:transparent">当您需要并行运行多个操作然后合并其结果时，Graph API 可以自然地处理这种情况。</span></p>

<pre id="t-AUpGAvDBXRISntB92QZU3c"><code># 并行处理多个数据源
workflow.add_node("fetch_news", fetch_news)
workflow.add_node("fetch_weather", fetch_weather)
workflow.add_node("fetch_stocks", fetch_stocks)
workflow.add_node("combine_data", combine_all_data)

# 所有获取操作并行运行
workflow.add_edge(START, "fetch_news")
workflow.add_edge(START, "fetch_weather")
workflow.add_edge(START, "fetch_stocks")

# 合并操作等待所有并行操作完成
workflow.add_edge("fetch_news", "combine_data")
workflow.add_edge("fetch_weather", "combine_data")
workflow.add_edge("fetch_stocks", "combine_data")</code></pre>

<p id="t-dmwkGYmjLVIKt5gZdLw0An"><span style="font-weight:bold;background-color:transparent">4. 团队开发和文档</span></p>

<p id="t-o0nrVfyJ68iJ6AwtEorjJK"><span style="background-color:transparent">Graph API 的可视化特性使团队更容易理解、记录和维护复杂的工作流。</span></p>

<pre id="t-p2PW8fFAKgaNBHdOoWrtb6"><code># 关注点清晰分离 - 每个团队成员可以处理不同的节点
workflow.add_node("data_ingestion", data_team_function)
workflow.add_node("ml_processing", ml_team_function)
workflow.add_node("business_logic", product_team_function)
workflow.add_node("output_formatting", frontend_team_function)</code></pre>


<a id="section-0972"></a>
## 何时使用 Functional API

<a id="t-jBLiwIAnoMabbhNxTuSyw4"></a>

<p id="t-QhwsJ0DgoEm4Lza22o9KY3"><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">Functional API</span><span style="background-color:transparent"> 采用命令式方法，将 LangGraph 功能集成到标准的过程式代码中。</span></p>

<p id="t-BBpE346cw0tywxfpl3waTS"><span style="font-weight:bold;background-color:transparent">1. 现有的过程式代码</span></p>

<p id="t-93BEqHlJDiJVZlSnSSJUp8"><span style="background-color:transparent">当您已有使用标准控制流的代码，并希望以最小的重构添加 LangGraph 功能时。</span></p>

<pre id="t-3Nfp3ePshvkKZmgrBuWkLK"><code># Functional API: 对现有代码进行最小更改
from langgraph.func import entrypoint, task

@task
def process_user_input(user_input: str) -&gt; dict:
# 现有函数，改动最小
return {"processed": user_input.lower().strip()}

@entrypoint(checkpointer=checkpointer)
def workflow(user_input: str) -&gt; str:
# 标准的 Python 控制流
processed = process_user_input(user_input).result()

if "urgent" in processed["processed"]:
response = handle_urgent_request(processed).result()
else:
response = handle_normal_request(processed).result()

return response</code></pre>

<p id="t-pwgRYPoW0Fh9qaxsqbbwwq"><span style="font-weight:bold;background-color:transparent">2. 具有简单逻辑的线性工作流</span></p>

<p id="t-eiwVcFJqRgR2r7EHEE7Soy"><span style="background-color:transparent">当您的工作流主要是顺序性的，并且具有直接的条件逻辑时。</span></p>

<pre id="t-wvyjhnWD499EchHBBlHipZ"><code>@entrypoint(checkpointer=checkpointer)
def essay_workflow(topic: str) -&gt; dict:
# 具有简单分支的线性流程
outline = create_outline(topic).result()

if len(outline["points"]) &lt; 3:
outline = expand_outline(outline).result()

draft = write_draft(outline).result()

# 人工审核检查点
feedback = interrupt({"draft": draft, "action": "Please review"})

if feedback == "approve":
final_essay = draft
else:
final_essay = revise_essay(draft, feedback).result()

return {"essay": final_essay}</code></pre>

<p id="t-cYJF11MwFNRXOeLlRtaOYI"><span style="font-weight:bold;background-color:transparent">3. 快速原型设计</span></p>

<p id="t-KPQ3AFK7eVrLm1zbvxPCSB"><span style="background-color:transparent">当您希望快速测试想法，而不想承担定义状态模式和图形结构的开销时。</span></p>

<pre id="t-RKhow6AbfcXtyWsYkLxra5"><code>@entrypoint(checkpointer=checkpointer)
def quick_prototype(data: dict) -&gt; dict:
# 快速迭代 - 无需状态模式
step1_result = process_step1(data).result()
step2_result = process_step2(step1_result).result()

return {"final_result": step2_result}</code></pre>

<p id="t-JnRKBpKjoF1zlyFz0IIEpw"><span style="font-weight:bold;background-color:transparent">4. 函数作用域的状态管理</span></p>

<p id="t-WPdYqFifdpn4Ufgnak6kmD"><span style="background-color:transparent">当您的状态自然地限定在单个函数内，不需要广泛共享时。</span></p>

<pre id="t-dW2zCY2aVEWxlBdQHbOkay"><code>@task
def analyze_document(document: str) -&gt; dict:
# 函数内的局部状态管理
sections = extract_sections(document)
summaries = [summarize(section) for section in sections]
key_points = extract_key_points(summaries)

return {
"sections": len(sections),
"summaries": summaries,
"key_points": key_points
}

@entrypoint(checkpointer=checkpointer)
def document_processor(document: str) -&gt; dict:
analysis = analyze_document(document).result()
# 状态在函数之间按需传递
return generate_report(analysis).result()</code></pre>


<a id="section-0973"></a>
## 结合使用两种 API

<a id="t-urXnGXYJLUq0UqPCvwqfVc"></a>

<p id="t-jLRywtnSGWULgx6zWoIvi2"><span style="background-color:transparent">您可以在同一个应用程序中同时使用两种 API。当系统的不同部分有不同的需求时，这非常有用。</span></p>

<pre id="t-WKfX3mNCUKeialcGobeKpn"><code>from langgraph.graph import StateGraph
from langgraph.func import entrypoint

# 使用 Graph API 进行复杂的多智能体协调
coordination_graph = StateGraph(CoordinationState)
coordination_graph.add_node("orchestrator", orchestrator_node)
coordination_graph.add_node("agent_a", agent_a_node)
coordination_graph.add_node("agent_b", agent_b_node)

# 使用 Functional API 进行简单的数据处理
@entrypoint()
def data_processor(raw_data: dict) -&gt; dict:
cleaned = clean_data(raw_data).result()
transformed = transform_data(cleaned).result()
return transformed

# 在图中使用 Functional API 的结果
def orchestrator_node(state):
processed_data = data_processor.invoke(state["raw_data"])
return {"processed_data": processed_data}</code></pre>


<a id="section-0975"></a>
## 从 Functional API 迁移到 Graph API

<a id="t-vc1SkFLLT3vjwA8pYlI6Hj"></a>

<p id="t-WDFKYSHaViZ5JlxpC57Dqj"><span style="background-color:transparent">当您的功能工作流变得复杂时，可以迁移到 Graph API：</span></p>

<pre id="t-1FusFNLwJBMnTpm6Hgsayu"><code># 之前：Functional API
@entrypoint(checkpointer=checkpointer)
def complex_workflow(input_data: dict) -&gt; dict:
step1 = process_step1(input_data).result()

if step1["needs_analysis"]:
analysis = analyze_data(step1).result()
if analysis["confidence"] &gt; 0.8:
result = high_confidence_path(analysis).result()
else:
result = low_confidence_path(analysis).result()
else:
result = simple_path(step1).result()

return result

# 之后：Graph API
class WorkflowState(TypedDict):
input_data: dict
step1_result: dict
analysis: dict
final_result: dict

def should_analyze(state):
return "analyze" if state["step1_result"]["needs_analysis"] else "simple_path"

def confidence_check(state):
return "high_confidence" if state["analysis"]["confidence"] &gt; 0.8 else "low_confidence"

workflow = StateGraph(WorkflowState)
workflow.add_node("step1", process_step1_node)
workflow.add_conditional_edges("step1", should_analyze)
workflow.add_node("analyze", analyze_data_node)
workflow.add_conditional_edges("analyze", confidence_check)
# ... 添加剩余的节点和边</code></pre>


<a id="section-0976"></a>
## 从 Graph API 迁移到 Functional API

<a id="t-DdnmIjvoix10wPsYLbZjQv"></a>

<p id="t-c87v7B2mS76BFyANRxFddF"><span style="background-color:transparent">当您的图对于简单的线性过程变得过于复杂时：</span></p>

<pre id="t-zpHxSXZnnfzbDEpjUNgzEn"><code># 之前：过度设计的 Graph API
class SimpleState(TypedDict):
input: str
step1: str
step2: str
result: str

# 之后：简化的 Functional API
@entrypoint(checkpointer=checkpointer)
def simple_workflow(input_data: str) -&gt; str:
step1 = process_step1(input_data).result()
step2 = process_step2(step1).result()
return finalize_result(step2).result()</code></pre>


<a id="section-0977"></a>
## 总结

<a id="t-cI8Tvz2cHC4qb2d8JgCT2Y"></a>

<p id="t-dqHTH900omZCr0dPQNoW2Z"><span style="background-color:transparent">当您需要对工作流结构、复杂分支、并行处理进行显式控制，或需要团队协作优势时，请选择</span><span style="font-weight:bold;background-color:transparent">Graph API</span><span style="background-color:transparent">。</span></p>

<p id="t-A3D0sGeSsea2be0bVHFDye"><span style="background-color:transparent">当您希望以最小的更改将 LangGraph 功能添加到现有代码中，拥有简单的线性工作流，或需要快速原型设计能力时，请选择</span><span style="font-weight:bold;background-color:transparent">Functional API</span><span style="background-color:transparent">。</span></p>

<p id="t-rTO0JEpfGJ7Hz8OZnw6iRE"><span style="background-color:transparent">两种 API 都提供相同的核心 LangGraph 功能（持久化、流式传输、人在回路、记忆），但将它们打包在不同的范式中，以适应不同的开发风格和用例。</span></p>


<a id="section-0979"></a>
## 图

<a id="t-GWpPQknDJjuEnxXgCD7ayM"></a>

<p id="t-S5bj34YFFuWvtiCaDkZd0f"><span style="background-color:transparent">LangGraph 的核心是将智能体工作流建模为图。您可以使用三个关键组件来定义智能体的行为：</span></p>

<ol start="1"><li id="t-CJZn3ZaVjjayzbpqv74FPw"><span style="border-bottom:1px solid;font-weight:bold">State</span><span>：一个共享数据结构，表示应用程序的当前快照。它可以是任何数据类型，但通常使用共享状态模式定义。</span></li></ol>

<ol start="2"><li id="t-S1PGSs54eqo5jghg4aYjOZ"><span style="border-bottom:1px solid;font-weight:bold">Nodes</span><span>：编码智能体逻辑的函数。它们接收当前状态作为输入，执行一些计算或副作用，并返回更新后的状态。</span></li></ol>

<ol start="3"><li id="t-RVX99WeczdBH3FtntYVHZU"><span style="border-bottom:1px solid;font-weight:bold">Edges</span><span>：根据当前状态决定接下来执行哪个</span><span>Node</span><span>的函数。它们可以是条件分支或固定转换。</span></li></ol>

<p id="t-gVdPUHmBqTUnQjbKa78HjO"><span style="background-color:transparent">通过组合</span><span style="background-color:transparent">Nodes</span><span style="background-color:transparent">和</span><span style="background-color:transparent">Edges</span><span style="background-color:transparent">，您可以创建随时间演变状态的复杂、循环工作流。然而，真正的威力来自 LangGraph 如何管理该状态。</span></p>

<p id="t-kErFZKKh7AiwQTfrCWNW89"><span style="background-color:transparent">需要强调的是：</span><span style="background-color:transparent">Nodes</span><span style="background-color:transparent">和</span><span style="background-color:transparent">Edges</span><span style="background-color:transparent">仅仅是函数——它们可以包含 LLM 或只是普通的代码。</span></p>

<p id="t-b2GCnABdA8qyvJkabETeDa"><span style="background-color:transparent">简而言之：</span><span style="font-style:italic;background-color:transparent">节点执行工作，边告诉接下来做什么</span><span style="background-color:transparent">。</span></p>

<p id="t-p6u4Dk1rARlC3F3CuAh1zq"><span style="background-color:transparent">LangGraph 底层的图算法使用</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">消息传递</span><span style="background-color:transparent">来定义一个通用程序。当一个节点完成其操作时，它会沿着一条或多条边向其他节点发送消息。这些接收节点然后执行其函数，将结果消息传递给下一组节点，过程持续进行。受 Google 的 </span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">Pregel</span><span style="background-color:transparent"> 系统启发，程序以离散的“超级步”进行。</span></p>

<p id="t-gC6beKrVHFzrJT9Fgf0Tha"><span style="background-color:transparent">超级步可以被视为对图节点的一次迭代。并行运行的节点属于同一个超级步，而顺序运行的节点属于不同的超级步。在图执行开始时，所有节点都处于</span><span style="background-color:transparent">inactive</span><span style="background-color:transparent">状态。当一个节点在其任何传入边（或“通道”）上接收到新消息（状态）时，它变为</span><span style="background-color:transparent">active</span><span style="background-color:transparent">。然后，活动节点运行其函数并响应更新。在每个超级步结束时，没有传入消息的节点通过将自己标记为</span><span style="background-color:transparent">inactive</span><span style="background-color:transparent">来投票</span><span style="background-color:transparent">halt</span><span style="background-color:transparent">。当所有节点都处于</span><span style="background-color:transparent">inactive</span><span style="background-color:transparent">状态且没有消息在传输中时，图执行终止。</span></p>


<a id="section-0980"></a>
## StateGraph

<a id="t-KiY821Hn3CYhTxbBqWPMtD"></a>

<p id="t-mR04Hk6vmQQu8vXigkVusB"><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">StateGraph</span><span style="background-color:transparent">类是使用的主要图类。它由用户定义的</span><span style="background-color:transparent">State</span><span style="background-color:transparent">对象参数化。</span></p>


<a id="section-0981"></a>
## 编译您的图

<a id="t-Vtf8BcwJpGc1kWulTG8gFh"></a>

<p id="t-EZYkLJ3NpkwFNOjPN2d9cZ"><span style="background-color:transparent">要构建您的图，您首先定义</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">状态</span><span style="background-color:transparent">，然后添加</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">节点</span><span style="background-color:transparent">和</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">边</span><span style="background-color:transparent">，最后编译它。编译图到底是什么，为什么需要它？</span></p>

<p id="t-vgTHx02cI0xfGJcty8qslG"><span style="background-color:transparent">编译是一个相当简单的步骤。它对图的结构进行一些基本检查（没有孤立节点等）。这也是您可以指定运行时参数（如</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">检查点</span><span style="background-color:transparent">和断点）的地方。您只需调用 </span><span style="background-color:transparent">.compile</span><span style="background-color:transparent"> 方法来编译您的图：</span></p>

<pre id="t-RtDTb2LDUChQmKAtAinqnl"><code>graph = graph_builder.compile(...)</code></pre>

<p id="t-F1CgUEFD5chn761P9IKihS"><span>在使用图之前，您</span><span style="font-weight:bold">必须</span><span>编译它。</span></p>


<a id="section-0982"></a>
## 状态

<a id="t-JcXJg0jXYjOhCxtQWLVuzj"></a>

<p id="t-BGZDkjiS1XYCylMk3ZYAIg"><span style="background-color:transparent">定义图时，您要做的第一件事是定义图的 </span><span style="background-color:transparent">State</span><span style="background-color:transparent">。</span><span style="background-color:transparent">State</span><span style="background-color:transparent"> 由</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">图的模式</span><span style="background-color:transparent">以及指定如何将更新应用到状态的</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">reducer</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent"> 函数</span><span style="background-color:transparent">组成。</span><span style="background-color:transparent">State</span><span style="background-color:transparent"> 的模式将是图中所有 </span><span style="background-color:transparent">Nodes</span><span style="background-color:transparent"> 和 </span><span style="background-color:transparent">Edges</span><span style="background-color:transparent"> 的输入模式，可以是 </span><span style="background-color:transparent">TypedDict</span><span style="background-color:transparent"> 或 </span><span style="background-color:transparent">Pydantic</span><span style="background-color:transparent"> 模型。所有 </span><span style="background-color:transparent">Nodes</span><span style="background-color:transparent"> 都会发出对 </span><span style="background-color:transparent">State</span><span style="background-color:transparent"> 的更新，然后使用指定的 </span><span style="background-color:transparent">reducer</span><span style="background-color:transparent"> 函数应用这些更新。</span></p>


<a id="section-0983"></a>
## 模式

<a id="t-cRkJGkoW6SrZjwquDUuJRX"></a>

<p id="t-9JUbs6zYH5lZVl9ocfWdZe"><span style="background-color:transparent">指定图模式的主要文档化方法是使用</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">TypedDict</span><span style="background-color:transparent">。如果您想在状态中提供默认值，请使用</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">dataclass</span><span style="background-color:transparent">。如果您想要递归数据验证，我们也支持使用 Pydantic</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">BaseModel</span><span style="background-color:transparent">作为图状态（但请注意，Pydantic 的性能不如</span><span style="background-color:transparent">TypedDict</span><span style="background-color:transparent">或</span><span style="background-color:transparent">dataclass</span><span style="background-color:transparent">）。</span></p>

<p id="t-BtgDmuxwOjf75zHInTKkvU"><span style="background-color:transparent">默认情况下，图将具有相同的输入和输出模式。如果您想更改这一点，也可以直接指定显式的输入和输出模式。当您有很多键，并且其中一些明确用于输入，另一些用于输出时，这很有用。有关更多信息。</span></p>

<a id="t-GC7y2XeX4NH8YAmbbVLcMM"></a>

##### 多个模式

<p id="t-djfpHv9Fhhs1faVUbdWbYO"><span style="background-color:transparent">通常，所有图节点都使用单一模式进行通信。这意味着它们将读取和写入相同的状态通道。但是，有些情况下我们希望对这一点有更多控制：</span></p>

<ul><li id="t-F6AK9KyUDmdearYkCA9kXG"><span>内部节点可以传递图中输入/输出不需要的信息。</span></li></ul>

<ul><li id="t-gQXProEl5OYVlliMSH4R7u"><span>我们可能还想为图使用不同的输入/输出模式。例如，输出可能只包含一个相关的输出键。</span></li></ul>

<p id="t-15591rjBhr0eH1pyZ8Xt4q"><span style="background-color:transparent">可以让节点在图中写入私有状态通道，用于内部节点通信。我们可以简单地定义一个私有模式</span><span style="background-color:transparent">PrivateState</span><span style="background-color:transparent">。</span></p>

<p id="t-oIptpNGQRyVN74xy3mYmrR"><span style="background-color:transparent">也可以为图定义显式的输入和输出模式。在这些情况下，我们定义一个“内部”模式，其中包含与图操作相关的_所有_键。但是，我们还定义了 </span><span style="background-color:transparent">input</span><span style="background-color:transparent"> 和 </span><span style="background-color:transparent">output</span><span style="background-color:transparent"> 模式，它们是“内部”模式的子集，以约束图的输入和输出。</span></p>

<p id="t-8DHzWrpf9oBCJqyq3NnbVL"><span style="background-color:transparent">让我们看一个例子：</span></p>

<pre id="t-NWFPIa8biO9IPqGDfsONU1"><code>class InputState(TypedDict):
user_input: str

class OutputState(TypedDict):
graph_output: str

class OverallState(TypedDict):
foo: str
user_input: str
graph_output: str

class PrivateState(TypedDict):
bar: str

def node_1(state: InputState) -&gt; OverallState:
# Write to OverallState
return {"foo": state["user_input"] + " name"}

def node_2(state: OverallState) -&gt; PrivateState:
# Read from OverallState, write to PrivateState
return {"bar": state["foo"] + " is"}

def node_3(state: PrivateState) -&gt; OutputState:
# Read from PrivateState, write to OutputState
return {"graph_output": state["bar"] + " Lance"}

builder = StateGraph(OverallState,input_schema=InputState,output_schema=OutputState)
builder.add_node("node_1", node_1)
builder.add_node("node_2", node_2)
builder.add_node("node_3", node_3)
builder.add_edge(START, "node_1")
builder.add_edge("node_1", "node_2")
builder.add_edge("node_2", "node_3")
builder.add_edge("node_3", END)

graph = builder.compile()
graph.invoke({"user_input":"My"})
# {'graph_output': 'My name is Lance'}</code></pre>

<p id="t-Uw9Z3Ur7D1KAM8rFSntUVR"><span style="background-color:transparent">这里有两个微妙而重要的点需要注意：</span></p>

<ol start="1"><li id="t-YFQX6wJzgOwHVqgbwxQwtp"><span>我们将</span><span>state: InputState</span><span>作为输入模式传递给</span><span>node_1</span><span>。但是，我们写出到</span><span>foo</span><span>，这是</span><span>OverallState</span><span>中的一个通道。我们如何写出到输入模式中未包含的状态通道？这是因为节点_可以写入图状态中的任何状态通道_。图状态是初始化时定义的状态通道的并集，其中包括</span><span>OverallState</span><span>以及过滤器</span><span>InputState</span><span>和</span><span>OutputState</span><span>。</span></li></ol>

<ol start="2"><li id="t-P1PwoEnjPFThY1JA1fuMua"><span>我们使用以下方式初始化图：</span></li></ol>

<pre id="t-UegloY76Zv2oFMYdAzGn8O"><code>StateGraph(
OverallState,
input_schema=InputState,
output_schema=OutputState
)</code></pre>

<p id="t-NGk3KaMAlKrZwa9GgGNqGY"><span style="background-color:transparent">那么，我们如何在</span><span style="background-color:transparent">node_2</span><span style="background-color:transparent">中写入</span><span style="background-color:transparent">PrivateState</span><span style="background-color:transparent">？如果它没有在</span><span style="background-color:transparent">StateGraph</span><span style="background-color:transparent">初始化中传递，图如何获得对此模式的访问权限？</span></p>

<p id="t-5A73KYLUOay3evKjZWEn3K"><span style="background-color:transparent">我们可以这样做，因为</span><span style="background-color:transparent">_nodes</span><span style="background-color:transparent">只要状态模式定义存在，也可以声明额外的状态</span><span style="background-color:transparent">channels_</span><span style="background-color:transparent">。在这种情况下，</span><span style="background-color:transparent">PrivateState</span><span style="background-color:transparent">模式已定义，因此我们可以将</span><span style="background-color:transparent">bar</span><span style="background-color:transparent">添加为图中的新状态通道并写入它。</span></p>


<a id="section-0984"></a>
## Reducers

<a id="t-zT7saP0N7zm9FJWwDZVl21"></a>

<p id="t-rmg2c9Hn0JGlNTRG4tMcxd"><span style="background-color:transparent">Reducers 是理解节点更新如何应用到</span><span style="background-color:transparent">State</span><span style="background-color:transparent">的关键。</span><span style="background-color:transparent">State</span><span style="background-color:transparent">中的每个键都有其独立的 reducer 函数。如果没有显式指定 reducer 函数，则假定对该键的所有更新都应覆盖它。有几种不同类型的 reducers，从默认的 reducer 类型开始：</span></p>

<a id="t-4O2NDTrEKKIXuXZBqGkK5a"></a>

##### 默认 reducer

<p id="t-FexUmMV0FbqA9JzvJcPXEG"><span style="background-color:transparent">这两个示例展示了如何使用默认 reducer：</span></p>

<p id="t-yIHm93Pip34hOhEyCnCjUR"><span style="font-weight:bold">Example A</span></p>

<pre id="t-YnvhzRG09gwALbubedNNxf"><code>from typing_extensions import TypedDict

class State(TypedDict):
foo: int
bar: list[str]</code></pre>

<p id="t-uu0QDNluC5cz0jKRNymjHB"><span style="background-color:transparent">在这个例子中，没有为任何键指定 reducer 函数。假设图的输入是：</span></p>

<p id="t-txZvOTLHoGnaeaDxKFm4FA"><span style="background-color:transparent">{"foo": 1, "bar": ["hi"]}</span><span style="background-color:transparent">。然后假设第一个</span><span style="background-color:transparent">Node</span><span style="background-color:transparent">返回</span><span style="background-color:transparent">{"foo": 2}</span><span style="background-color:transparent">。这被视为对状态的更新。请注意，</span><span style="background-color:transparent">Node</span><span style="background-color:transparent">不需要返回整个</span><span style="background-color:transparent">State</span><span style="background-color:transparent">模式——只需要一个更新。应用此更新后，</span><span style="background-color:transparent">State</span><span style="background-color:transparent">将变为</span><span style="background-color:transparent">{"foo": 2, "bar": ["hi"]}</span><span style="background-color:transparent">。如果第二个节点返回</span><span style="background-color:transparent">{"bar": ["bye"]}</span><span style="background-color:transparent">，那么</span><span style="background-color:transparent">State</span><span style="background-color:transparent">将变为</span><span style="background-color:transparent">{"foo": 2, "bar": ["bye"]}</span></p>

<p id="t-6p8yttFhSvDWrC0VZ0f94F"><span style="font-weight:bold">Example B</span></p>

<pre id="t-FdrIddKCqmRt7Npt6Ojm9W"><code>from typing import Annotated
from typing_extensions import TypedDict
from operator import add

class State(TypedDict):
foo: int
bar: Annotated[list[str], add]</code></pre>

<p id="t-anbBWLrIj80LLVTMdF1tTH"><span style="background-color:transparent">在这个例子中，我们使用了</span><span style="background-color:transparent">Annotated</span><span style="background-color:transparent">类型来为第二个键（</span><span style="background-color:transparent">bar</span><span style="background-color:transparent">）指定一个 reducer 函数（</span><span style="background-color:transparent">operator.add</span><span style="background-color:transparent">）。请注意，第一个键保持不变。假设图的输入是</span><span style="background-color:transparent">{"foo": 1, "bar": ["hi"]}</span><span style="background-color:transparent">。然后假设第一个</span><span style="background-color:transparent">Node</span><span style="background-color:transparent">返回</span><span style="background-color:transparent">{"foo": 2}</span><span style="background-color:transparent">。这被视为对状态的更新。请注意，</span><span style="background-color:transparent">Node</span><span style="background-color:transparent">不需要返回整个</span><span style="background-color:transparent">State</span><span style="background-color:transparent">模式——只需要一个更新。应用此更新后，</span><span style="background-color:transparent">State</span><span style="background-color:transparent">将变为</span><span style="background-color:transparent">{"foo": 2, "bar": ["hi"]}</span><span style="background-color:transparent">。如果第二个节点返回</span><span style="background-color:transparent">{"bar": ["bye"]}</span><span style="background-color:transparent">，那么</span><span style="background-color:transparent">State</span><span style="background-color:transparent">将变为</span><span style="background-color:transparent">{"foo": 2, "bar": ["hi", "bye"]}</span><span style="background-color:transparent">。请注意，这里</span><span style="background-color:transparent">bar</span><span style="background-color:transparent">键是通过将两个列表相加来更新的。</span></p>

<a id="t-Bl232b4vI0URClosnk7D2I"></a>

##### 覆盖

<p id="t-1BPQmtbncDoB0GRsrNfZgH"><span>在某些情况下，您可能希望绕过 reducer 并直接覆盖状态值。LangGraph 为此提供了 </span><span style="border-bottom:1px solid;font-weight:bold">Overwrite</span><span> 类型。</span><span style="border-bottom:1px solid;font-weight:bold">在此了解如何使用</span><span style="border-bottom:1px solid;font-weight:bold">Overwrite</span><span>。</span></p>


<a id="section-0985"></a>
## 在图状态中使用消息

<a id="t-MUTxufQCzXANThXAABmmV2"></a>

<a id="t-gb8mXs9QjFRS8IFCsUxYtO"></a>

##### 为什么使用消息？

<p id="t-gqt34qfcw7riNW7R4BqAdq"><span style="background-color:transparent">大多数现代 LLM 提供商都有一个聊天模型接口，接受消息列表作为输入。特别是 LangChain 的</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">聊天模型接口</span><span style="background-color:transparent">接受消息对象列表作为输入。这些消息有多种形式，例如 </span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">HumanMessage</span><span style="background-color:transparent">（用户输入）或 </span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">AIMessage</span><span style="background-color:transparent">（LLM 响应）。</span></p>

<a id="t-ErxcUc32439WjA8gw9XqBs"></a>

##### 在您的图中使用消息

<p id="t-4GFhmm6q0OCEOJd4XBxRQP"><span style="background-color:transparent">在许多情况下，将先前的对话历史记录作为消息列表存储在您的图状态中是有帮助的。为此，我们可以向图状态添加一个键（通道），用于存储</span><span style="background-color:transparent">Message</span><span style="background-color:transparent">对象列表，并使用 reducer 函数对其进行注释（参见下面的示例中的</span><span style="background-color:transparent">messages</span><span style="background-color:transparent">键）。reducer 函数对于告诉图如何用每次状态更新（例如，当节点发送更新时）来更新状态中的</span><span style="background-color:transparent">Message</span><span style="background-color:transparent">对象列表至关重要。如果您不指定 reducer，每次状态更新都会用最近提供的值覆盖消息列表。如果您想简单地将消息追加到现有列表中，可以使用</span><span style="background-color:transparent">operator.add</span><span style="background-color:transparent">作为 reducer。</span></p>

<p id="t-2In7LudgB63jHjGCvbf2S3"><span style="background-color:transparent">但是，您可能还想手动更新图状态中的消息（例如，人在回路中）。如果您使用</span><span style="background-color:transparent">operator.add</span><span style="background-color:transparent">，您发送到图的手动状态更新将被追加到现有的消息列表中，而不是更新现有消息。为了避免这种情况，您需要一个能够跟踪消息 ID 并在更新时覆盖现有消息的 reducer。为了实现这一点，您可以使用预构建的</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">add_messages</span><span style="background-color:transparent">函数。对于全新的消息，它只会追加到现有列表，但它也会正确处理现有消息的更新。</span></p>

<a id="t-bOOuZcnboNpEpXkZcGWCCX"></a>

##### 序列化

<p id="t-2jQEI66QPOUFGNKmLly24Z"><span style="background-color:transparent">除了跟踪消息ID外，每当在</span><span style="background-color:transparent">messages</span><span style="background-color:transparent">通道上接收到状态更新时，</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">add_messages</span><span style="background-color:transparent">函数还会尝试将消息反序列化为LangChain的</span><span style="background-color:transparent">Message</span><span style="background-color:transparent">对象。</span></p>

<p id="t-GOaLWZxVBQEWmA5zGNiZBZ"><span style="background-color:transparent">有关LangChain序列化/反序列化的更多信息，请参见</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">此处</span><span style="background-color:transparent">。这允许以以下格式发送图输入/状态更新：</span></p>

<pre id="t-oQiprLkE9OB8qAbXeelr6W"><code># this is supported
{"messages": [HumanMessage(content="message")]}

# and this is also supported
{"messages": [{"type": "human", "content": "message"}]}</code></pre>

<p id="t-af9b42YRWIA4CAX52Kwg1P"><span style="background-color:transparent">由于在使用</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">add_messages</span><span style="background-color:transparent">时，状态更新总是被反序列化为LangChain的</span><span style="background-color:transparent">Messages</span><span style="background-color:transparent">，因此你应该使用点表示法来访问消息属性，例如</span><span style="background-color:transparent">state["messages"][-1].content</span><span style="background-color:transparent">。</span></p>

<p id="t-AfKlzZwzt0zPUNEqVIyF4a"><span style="background-color:transparent">下面是一个使用</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">add_messages</span><span style="background-color:transparent">作为其归约器函数的图示例。</span></p>

<pre id="t-7QzWNeFcWNgite8EYJWUYN"><code>from langchain.messages import AnyMessage
from langgraph.graph.message import add_messages
from typing import Annotated
from typing_extensions import TypedDict

class GraphState(TypedDict):
messages: Annotated[list[AnyMessage], add_messages]</code></pre>

<a id="t-kcLczzvzH5MCzAAPmwRnuC"></a>

##### MessagesState

<p id="t-aEOvrfEUKiw0Rshljf0lIm"><span style="background-color:transparent">由于在状态中拥有一个消息列表非常常见，因此存在一个名为</span><span style="background-color:transparent">MessagesState</span><span style="background-color:transparent">的预构建状态，它使得使用消息变得容易。</span><span style="background-color:transparent">MessagesState</span><span style="background-color:transparent">定义了一个单一的</span><span style="background-color:transparent">messages</span><span style="background-color:transparent">键，它是一个</span><span style="background-color:transparent">AnyMessage</span><span style="background-color:transparent">对象列表，并使用</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">add_messages</span><span style="background-color:transparent">归约器。通常，除了消息之外，还需要跟踪更多的状态，所以我们看到人们子类化这个状态并添加更多字段，例如：</span></p>

<pre id="t-xF13ATn4hRLIGxAZIQEv4q"><code>from langgraph.graph import MessagesState

class State(MessagesState):
documents: list[str]</code></pre>


<a id="section-0986"></a>
## 节点

<a id="t-T9hw2umdP3JrrwhYgqwkzD"></a>

<p id="t-e60Dz6Ty4Cs5yiOgrYs7Zx"><span style="background-color:transparent">在LangGraph中，节点是接受以下参数的Python函数（同步或异步）：</span></p>

<ol start="1"><li id="t-3TwbWk0FNDqXn0jvD8g80o"><span>state</span><span> – 图的</span><span style="border-bottom:1px solid;font-weight:bold">状态</span></li></ol>

<ol start="2"><li id="t-gIgNHnI4hqHvxvEQcRsfPx"><span>config</span><span>– 一个包含配置信息（如</span><span>thread_id</span><span>）和追踪信息（如</span><span>tags</span><span>）的</span><span style="border-bottom:1px solid;font-weight:bold">RunnableConfig</span><span>对象</span></li></ol>

<ol start="3"><li id="t-Xpq92AkkRmyk7oLpMmAFrQ"><span>runtime</span><span> – 一个包含</span><span style="border-bottom:1px solid;font-weight:bold">运行时</span><span style="border-bottom:1px solid;font-weight:bold">context</span><span>和其他信息（如</span><span>store</span><span>和</span><span>stream_writer</span><span>）的</span><span>Runtime</span><span>对象</span></li></ol>

<p id="t-2yGklKdVlUrcN7iZcrZOIs"><span style="background-color:transparent">类似于</span><span style="background-color:transparent">NetworkX</span><span style="background-color:transparent">，你可以使用</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">add_node</span><span style="background-color:transparent">方法将这些节点添加到图中：</span></p>

<pre id="t-Zlw4a6LRy1RaNpFM9G6wES"><code>from dataclasses import dataclass
from typing_extensions import TypedDict

from langchain_core.runnables import RunnableConfig
from langgraph.graph import StateGraph
from langgraph.runtime import Runtime

class State(TypedDict):
input: str
results: str

@dataclass
class Context:
user_id: str

builder = StateGraph(State)

def plain_node(state: State):
return state

def node_with_runtime(state: State, runtime: Runtime[Context]):
print("In node: ", runtime.context.user_id)
return {"results": f"Hello, {state['input']}!"}

def node_with_config(state: State, config: RunnableConfig):
print("In node with thread_id: ", config["configurable"]["thread_id"])
return {"results": f"Hello, {state['input']}!"}

builder.add_node("plain_node", plain_node)
builder.add_node("node_with_runtime", node_with_runtime)
builder.add_node("node_with_config", node_with_config)
...</code></pre>

<p id="t-clH1pKnvPYnqW1Yqo1zDKm"><span style="background-color:transparent">在幕后，函数被转换为</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">RunnableLambda</span><span style="background-color:transparent">，它为你的函数添加了批处理和异步支持，以及原生的追踪和调试功能。</span></p>

<p id="t-XNoSKBNBiXNQzt6JoicTn8"><span style="background-color:transparent">如果你向图中添加一个节点而没有指定名称，它将被赋予一个默认名称，等同于函数名。</span></p>

<pre id="t-mujP7dUEqVWxBay5f9LtPQ"><code>builder.add_node(my_node)
# You can then create edges to/from this node by referencing it as `"my_node"`</code></pre>


<a id="section-0987"></a>
## START 节点

<a id="t-NC9jMJUrLYkduUBD7ZuEpb"></a>

<p id="t-b6vMiSMB3nvAP4tsIdYnYp"><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">START</span><span style="background-color:transparent">节点是一个特殊节点，代表将用户输入发送到图的节点。引用此节点的主要目的是确定应该首先调用哪些节点。</span></p>

<pre id="t-6cwVS3u87clBrNDh7SCmkH"><code>from langgraph.graph import START

graph.add_edge(START, "node_a")</code></pre>


<a id="section-0988"></a>
## END 节点

<a id="t-izk10aJmODv17byHW0LuPB"></a>

<p id="t-NTRecedCOGidEIX5O3cbJG"><span style="background-color:transparent">END</span><span style="background-color:transparent">节点是一个代表终端节点的特殊节点。当你想要表示哪些边在完成后没有后续操作时，会引用此节点。</span></p>

<pre id="t-c8XkRY8bEJG7s13D6uJNS7"><code>from langgraph.graph import END

graph.add_edge("node_a", END)</code></pre>


<a id="section-0989"></a>
## 节点缓存

<a id="t-bPkXH7Rien7kwP95jyCinA"></a>

<p id="t-zE4L42gKJzWIde02eWDZUU"><span style="background-color:transparent">LangGraph支持基于节点输入的任务/节点缓存。要使用缓存：</span></p>

<ul><li id="t-mHzFylTb0e54wxVlB7MqFY"><span>在编译图（或指定入口点）时指定一个缓存</span></li></ul>

<ul><li id="t-n58K0uRX8kWsTTnUEZmerU"><span>为节点指定缓存策略。每个缓存策略支持：</span></li></ul>

<ul><li id="t-28KkK96VW5A9sgQahHirvF"><span>key_func</span><span>，用于基于节点输入生成缓存键，默认为使用pickle对输入进行</span><span>hash</span><span>。</span></li></ul>

<ul><li id="t-gwU2etxpMBcg1jcEXK2lT1"><span>ttl</span><span>，缓存的生存时间（秒）。如果未指定，缓存将永不过期。</span></li></ul>

<p id="t-hMPjdVBFIMSPDT0ooNlSBp"><span style="background-color:transparent">例如：</span></p>

<pre id="t-xeLJdCknWStSxmxkbJ6SJi"><code>import time
from typing_extensions import TypedDict
from langgraph.graph import StateGraph
from langgraph.cache.memory import InMemoryCache
from langgraph.types import CachePolicy

class State(TypedDict):
x: int
result: int

builder = StateGraph(State)

def expensive_node(state: State) -&gt; dict[str, int]:
# expensive computation
time.sleep(2)
return {"result": state["x"] * 2}

builder.add_node("expensive_node", expensive_node, cache_policy=CachePolicy(ttl=3))
builder.set_entry_point("expensive_node")
builder.set_finish_point("expensive_node")

graph = builder.compile(cache=InMemoryCache())

print(graph.invoke({"x": 5}, stream_mode='updates'))
# [{'expensive_node': {'result': 10}}]
print(graph.invoke({"x": 5}, stream_mode='updates'))
# [{'expensive_node': {'result': 10}, '__metadata__': {'cached': True}}]</code></pre>

<ol start="1"><li id="t-QwMvnElF9VjL4E2uhoj6ZK"><span>第一次运行需要两秒钟（由于模拟了昂贵的计算）。</span></li></ol>

<ol start="2"><li id="t-xsE65hMrGlO7zhVNxp4G40"><span>第二次运行利用缓存并快速返回。</span></li></ol>


<a id="section-0990"></a>
## 边

<a id="t-wECxAv4PBsB6WNatYNPwfm"></a>

<p id="t-m8Jh2SGM08p5rW2NfnJ3Y7"><span style="background-color:transparent">边定义了逻辑如何路由以及图如何决定停止。这是你的代理如何工作以及不同节点如何相互通信的重要组成部分。有几种关键类型的边：</span></p>

<ul><li id="t-QtJ2jB4BaHWyDoAeyfMbt0"><span>普通边：直接从一个节点到下一个节点。</span></li></ul>

<ul><li id="t-TVrHDTTHsbIxTBGkiM0n65"><span>条件边：调用一个函数来确定接下来要转到哪个节点（或多个节点）。</span></li></ul>

<ul><li id="t-8kaScv5JefbN5b9bNS63gF"><span>入口点：当用户输入到达时首先调用哪个节点。</span></li></ul>

<ul><li id="t-ST54CiR9LrMrEA23mMCPJB"><span>条件入口点：调用一个函数来确定当用户输入到达时首先调用哪个节点（或多个节点）。</span></li></ul>

<p id="t-FTnIobHAVw5vqYKNqPqFlo"><span style="background-color:transparent">一个节点可以有多个出边。如果一个节点有多个出边，</span><span style="font-weight:bold;background-color:transparent">所有</span><span style="background-color:transparent">这些目标节点将作为下一个超步的一部分并行执行。</span></p>


<a id="section-0991"></a>
## 普通边

<a id="t-ba8aebbGtKTvdS09E3ukNg"></a>

<p id="t-D8HM43Lsi5YxSJYWt3kO8a"><span style="background-color:transparent">如果你</span><span style="font-weight:bold;background-color:transparent">总是</span><span style="background-color:transparent">想从节点A转到节点B，可以直接使用</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">add_edge</span><span style="background-color:transparent">方法。</span></p>

<pre id="t-Cf18tJ0tIxGPYTNtK3TUmo"><code>graph.add_edge("node_a", "node_b")</code></pre>


<a id="section-0992"></a>
## 条件边

<a id="t-jOCOqqqBprVs2v7i2lLKLb"></a>

<p id="t-xDme7spZYK73i1YmhKt5VA"><span style="background-color:transparent">如果你想</span><span style="font-weight:bold;background-color:transparent">有条件地</span><span style="background-color:transparent">路由到一个或多个边（或选择性地终止），可以使用</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">add_conditional_edges</span><span style="background-color:transparent">方法。该方法接受一个节点名称和一个在该节点执行后调用的“路由函数”：</span></p>

<pre id="t-oB9ZzMHfIlPSZOiUy7yyZN"><code>graph.add_conditional_edges("node_a", routing_function)</code></pre>

<p id="t-mK06dAZc1ZByWJwKDbAhua"><span style="background-color:transparent">与节点类似，</span><span style="background-color:transparent">routing_function</span><span style="background-color:transparent">接受图的当前</span><span style="background-color:transparent">state</span><span style="background-color:transparent">并返回一个值。</span></p>

<p id="t-cc8wmOiOHrHwMf3IwRd2aC"><span style="background-color:transparent">默认情况下，</span><span style="background-color:transparent">routing_function</span><span style="background-color:transparent">的返回值被用作下一个要发送状态的节点（或节点列表）的名称。所有这些节点将作为下一个超步的一部分并行运行。</span></p>

<p id="t-T0QAylkKbydQQCARb5ipAS"><span style="background-color:transparent">你可以选择提供一个字典，将</span><span style="background-color:transparent">routing_function</span><span style="background-color:transparent">的输出映射到下一个节点的名称。</span></p>

<pre id="t-sHTJJHvNEvozDXSUgbJjWk"><code>graph.add_conditional_edges("node_a", routing_function, {True: "node_b", False: "node_c"})</code></pre>

<p id="t-pWXgcFkJjmjmRv2OH16HmG"><span>如果你想在单个函数中结合状态更新和路由，请使用</span><span style="border-bottom:1px solid;font-weight:bold">Command</span><span>而不是条件边。</span></p>


<a id="section-0993"></a>
## 入口点

<a id="t-Bx0rhOyvBppSVf4ZM042cb"></a>

<p id="t-eOWbeaIGTh9uUyrQS3waOP"><span style="background-color:transparent">入口点是图启动时首先运行的节点。你可以使用从虚拟</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">START</span><span style="background-color:transparent">节点到要执行的第一个节点的</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">add_edge</span><span style="background-color:transparent">方法来指定图的入口位置。</span></p>

<pre id="t-g8fQFjVwQXTX1Wll0dKSQ7"><code>from langgraph.graph import START

graph.add_edge(START, "node_a")</code></pre>


<a id="section-0994"></a>
## 条件入口点

<a id="t-v6pal7TQynx8tYZ2whezMs"></a>

<p id="t-8UFVyxHIU8BC1SWWx1si4i"><span style="background-color:transparent">条件入口点允许你根据自定义逻辑从不同的节点开始。你可以使用从虚拟</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">START</span><span style="background-color:transparent">节点出发的</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">add_conditional_edges</span><span style="background-color:transparent">来实现这一点。</span></p>

<pre id="t-4f1AmGaRzkp6oKhuU8WhV1"><code>from langgraph.graph import START

graph.add_conditional_edges(START, routing_function)</code></pre>

<p id="t-1NWrBdX0pwxRmRAgINasPL"><span style="background-color:transparent">你可以选择提供一个字典，将</span><span style="background-color:transparent">routing_function</span><span style="background-color:transparent">的输出映射到下一个节点的名称。</span></p>

<pre id="t-fBno25yJDVhxWJjUFHXwby"><code>graph.add_conditional_edges(START, routing_function, {True: "node_b", False: "node_c"})</code></pre>


<a id="section-0995"></a>
## Send

<a id="t-86ChtKIe8hpj0go2iCoFzG"></a>

<p id="t-y4KT6MlVBInNnFPR2HCfzX"><span style="background-color:transparent">默认情况下，</span><span style="background-color:transparent">Nodes</span><span style="background-color:transparent">和</span><span style="background-color:transparent">Edges</span><span style="background-color:transparent">是预先定义的，并在相同的共享状态上操作。然而，有些情况下，确切的边是事先未知的，和/或你可能希望同时存在不同版本的</span><span style="background-color:transparent">State</span><span style="background-color:transparent">。一个常见的例子是</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">map-reduce</span><span style="background-color:transparent">设计模式。在这种设计模式中，第一个节点可能生成一个对象列表，你可能希望将其他节点应用于所有这些对象。对象的数量可能事先未知（意味着边的数量可能未知），并且下游</span><span style="background-color:transparent">Node</span><span style="background-color:transparent">的输入</span><span style="background-color:transparent">State</span><span style="background-color:transparent">应该不同（每个生成的对象一个）。</span></p>

<p id="t-FL7mt23H7TygS6o6sAbTOS"><span style="background-color:transparent">为了支持这种设计模式，LangGraph支持从条件边返回</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">Send</span><span style="background-color:transparent">对象。</span><span style="background-color:transparent">Send</span><span style="background-color:transparent">接受两个参数：第一个是节点名称，第二个是传递给该节点的状态。</span></p>

<pre id="t-OyxbRhkozsMHbVjBkUlKME"><code>def continue_to_jokes(state: OverallState):
return [Send("generate_joke", {"subject": s}) for s in state['subjects']]

graph.add_conditional_edges("node_a", continue_to_jokes)</code></pre>


<a id="section-0996"></a>
## Command

<a id="t-tpZCTYQ5cphd3RB95zWdfq"></a>

<p id="t-PRqiyuGbPDw0ijs2zhv4IU"><span style="background-color:transparent">将控制流（边）和状态更新（节点）结合起来可能很有用。例如，你可能希望在</span><span style="font-weight:bold;background-color:transparent">同一个</span><span style="background-color:transparent">节点中</span><span style="font-weight:bold;background-color:transparent">同时</span><span style="background-color:transparent">执行状态更新</span><span style="font-weight:bold;background-color:transparent">并</span><span style="background-color:transparent">决定接下来转到哪个节点。LangGraph提供了一种方法，通过从节点函数返回一个</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">Command</span><span style="background-color:transparent">对象来实现这一点：</span></p>

<pre id="t-Sjk9CEGDCQ1F85PKBXp0bE"><code>def my_node(state: State) -&gt; Command[Literal["my_other_node"]]:
return Command(
# state update
update={"foo": "bar"},
# control flow
goto="my_other_node"
)</code></pre>

<p id="t-6G5DCyNEsVFqcVG8KhtiEV"><span style="background-color:transparent">使用</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">Command</span><span style="background-color:transparent">，你还可以实现动态控制流行为（与</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">条件边</span><span style="background-color:transparent">完全相同）：</span></p>

<pre id="t-9KLIJhkKMSo48uCaBYndd1"><code>def my_node(state: State) -&gt; Command[Literal["my_other_node"]]:
if state["foo"] == "bar":
return Command(update={"foo": "baz"}, goto="my_other_node")</code></pre>

<p id="t-NgWDuv8iurSeZ78gha1hXq"><span>当在你的节点函数中返回</span><span style="border-bottom:1px solid;font-weight:bold">Command</span><span>时，你必须添加返回类型注解，并列出节点可以路由到的节点名称列表，例如</span><span>Command[Literal["my_other_node"]]</span><span>。这对于图渲染是必要的，并告诉LangGraph</span><span>my_node</span><span>可以导航到</span><span>my_other_node</span><span>。</span></p>


<a id="section-0997"></a>
## 我应该何时使用Command而不是条件边？

<a id="t-6vN6zzItqztjAVw3qBvyt3"></a>

<ul><li id="t-U4Tw53iSK9k8oAarrUSDS6"><span>当你需要</span><span style="font-weight:bold">同时</span><span>更新图状态</span><span style="font-weight:bold">并</span><span>路由到不同节点时，使用</span><span style="border-bottom:1px solid;font-weight:bold">Command</span><span>。例如，在实现</span><span style="border-bottom:1px solid;font-weight:bold">多代理交接</span><span>时，路由到不同的代理并向该代理传递一些信息非常重要。</span></li></ul>

<ul><li id="t-xn4a8wlA4oFIvaEASDcUIO"><span>使用</span><span style="border-bottom:1px solid;font-weight:bold">条件边</span><span>来有条件地在节点之间路由，而不更新状态。</span></li></ul>


<a id="section-0998"></a>
## 导航到父图中的节点

<a id="t-HejAAndsqK2zppTbmFxTkV"></a>

<p id="t-xzLACkHQVjdF5dotMfQLKx"><span style="background-color:transparent">如果你正在使用</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">子图</span><span style="background-color:transparent">，你可能希望从子图内的节点导航到不同的子图（即父图中的不同节点）。为此，你可以在</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">Command</span><span style="background-color:transparent">中指定</span><span style="background-color:transparent">graph=Command.PARENT</span><span style="background-color:transparent">：</span></p>

<pre id="t-cMOvwkhWNZWHSTag0pc0oX"><code>def my_node(state: State) -&gt; Command[Literal["other_subgraph"]]:
return Command(
update={"foo": "bar"},
goto="other_subgraph", # where `other_subgraph` is a node in the parent graph
graph=Command.PARENT
)</code></pre>

<p id="t-SbvaDWqKc5zhV7b4wmCAhf"><span>将</span><span>graph</span><span>设置为</span><span>Command.PARENT</span><span>将导航到最近的父图。</span></p>

<p id="t-ogb9bngryrK46i1PuM2XNH"><span>当你从子图节点向父图节点发送更新，且更新的键由父图和子图</span><span style="border-bottom:1px solid;font-weight:bold">状态模式</span><span>共享时，你</span><span style="font-weight:bold">必须</span><span>在父图状态中为你正在更新的键定义一个</span><span style="border-bottom:1px solid;font-weight:bold">归约器</span><span>。</span></p>


<a id="section-0999"></a>
## 在工具内部使用

<a id="t-WNARWhXsI4bdX1PpUbukI1"></a>

<p id="t-wylnYIUhmoCC3JAd9zyvR8"><span style="background-color:transparent">一个常见的用例是从工具内部更新图状态。例如，在客户支持应用程序中，你可能希望在对话开始时根据客户的账号或ID查找客户信息。</span></p>


<a id="section-1000"></a>
## 人在回路中

<a id="t-LK0LVdAG5bCaHxVtB1lsDZ"></a>

<p id="t-WQJva5QVMhgyv3EgDp7HGV"><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">Command</span><span style="background-color:transparent"> 是人机协同工作流的重要组成部分：当使用 </span><span style="background-color:transparent">interrupt()</span><span style="background-color:transparent"> 收集用户输入时，</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">Command</span><span style="background-color:transparent"> 随后用于提供输入并通过 </span><span style="background-color:transparent">Command(resume="用户输入")</span><span style="background-color:transparent"> 恢复执行。</span></p>


<a id="section-1001"></a>
## 图迁移

<a id="t-7xslapmFtwpMqAxX0qNIyK"></a>

<p id="t-5pwAr3hyMGeQTjJ72uVnIh"><span style="background-color:transparent">LangGraph 可以轻松处理图定义（节点、边和状态）的迁移，即使在使用检查点跟踪状态时也是如此。</span></p>

<ul><li id="t-RIGqEXYzy6vk3tBFq0YoQo"><span>对于图末尾的线程（即未中断的线程），您可以更改图的整个拓扑结构（即所有节点和边，删除、添加、重命名等）</span></li></ul>

<ul><li id="t-hqbhP6MJxdwIhLohxN4wlW"><span>对于当前中断的线程，我们支持除重命名/删除节点之外的所有拓扑更改（因为该线程可能即将进入一个不再存在的节点）——如果这成为阻碍，请联系我们，我们可以优先解决。</span></li></ul>

<ul><li id="t-tQZwRd7j5an7ZhlOIDIKci"><span>对于修改状态，我们在添加和删除键方面具有完全的向前和向后兼容性</span></li></ul>

<ul><li id="t-al24ZUotCGB2IRGBDeviso"><span>重命名的状态键在现有线程中会丢失其保存的状态</span></li></ul>

<ul><li id="t-htadEcwxLh1UfbLlLzlrpV"><span>类型以不兼容方式更改的状态键目前可能会在包含更改前状态的线程中引发问题——如果这成为阻碍，请联系我们，我们可以优先解决。</span></li></ul>


<a id="section-1002"></a>
## 运行时上下文

<a id="t-NLWgbbi9ywGiJriNHvXLfh"></a>

<p id="t-n9lxnUUPBKULnTi9US8sM3"><span style="background-color:transparent">创建图时，可以为传递给节点的运行时上下文指定</span><span style="background-color:transparent">context_schema</span><span style="background-color:transparent">。这对于向节点传递不属于图状态的信息非常有用。例如，您可能希望传递模型名称或数据库连接等依赖项。</span></p>

<pre id="t-D9jQNRCabndrlMWp77TOX9"><code>@dataclass
class ContextSchema:
llm_provider: str = "openai"

graph = StateGraph(State, context_schema=ContextSchema)</code></pre>

<p id="t-5kmGIZmVvnNy6QIJlAxdjS"><span style="background-color:transparent">然后，您可以使用</span><span style="background-color:transparent">invoke</span><span style="background-color:transparent">方法的</span><span style="background-color:transparent">context</span><span style="background-color:transparent">参数将此上下文传递到图中。</span></p>

<pre id="t-LsvQOYLDaFTW461g00WDEY"><code>graph.invoke(inputs, context={"llm_provider": "anthropic"})</code></pre>

<p id="t-Rk4AE1PDKccAZlfvUg3fwm"><span style="background-color:transparent">然后，您可以在节点或条件边内部访问和使用此上下文：</span></p>

<pre id="t-43jXzOUDZ4WBOncLMOgQrX"><code>from langgraph.runtime import Runtime

def node_a(state: State, runtime: Runtime[ContextSchema]):
llm = get_llm(runtime.context.llm_provider)
# ...</code></pre>


<a id="section-1003"></a>
## 递归限制

<a id="t-SO8mvWogIkUNkZhjWlvuuH"></a>

<p id="t-JcVdPRhdEHTcf69LuAQZDi"><span style="background-color:transparent">递归限制设置了图在单次执行期间可以执行的</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">超级步骤</span><span style="background-color:transparent">的最大数量。一旦达到限制，LangGraph 将引发 </span><span style="background-color:transparent">GraphRecursionError</span><span style="background-color:transparent">。默认情况下，此值设置为 25 步。递归限制可以在运行时在任何图上设置，并通过配置字典传递给 </span><span style="background-color:transparent">invoke</span><span style="background-color:transparent">/</span><span style="background-color:transparent">stream</span><span style="background-color:transparent">。重要的是，</span><span style="background-color:transparent">recursion_limit</span><span style="background-color:transparent"> 是一个独立的 </span><span style="background-color:transparent">config</span><span style="background-color:transparent"> 键，不应像所有其他用户定义的配置一样传递到 </span><span style="background-color:transparent">configurable</span><span style="background-color:transparent"> 键内部。请参见以下示例：</span></p>

<pre id="t-Xt1i5KxeAxzv9fOpwNXTsM"><code>graph.invoke(inputs, config={"recursion_limit": 5}, context={"llm": "anthropic"})</code></pre>


<a id="section-1004"></a>
## 访问和处理递归计数器

<a id="t-5CrE8WLXiHWCjS0Rjd3i1D"></a>

<p id="t-G3jAGIhG2gxazjcWUTrKIy"><span style="background-color:transparent">当前步骤计数器可在任何节点内的</span><span style="background-color:transparent">config["metadata"]["langgraph_step"]</span><span style="background-color:transparent">中访问，允许在达到递归限制之前进行主动的递归处理。这使您能够在图逻辑中实现优雅降级策略。</span></p>

<a id="t-q6OM5i4oqlrmRd6YS40Xiu"></a>

##### 工作原理

<p id="t-Woj4XB3ppyUicwEBP9x2RG"><span style="background-color:transparent">步骤计数器存储在</span><span style="background-color:transparent">config["metadata"]["langgraph_step"]</span><span style="background-color:transparent">中。递归限制检查遵循以下逻辑：</span><span style="background-color:transparent">step &gt; stop</span><span style="background-color:transparent">，其中</span><span style="background-color:transparent">stop = step + recursion_limit + 1</span><span style="background-color:transparent">。当超过限制时，LangGraph 会引发</span><span style="background-color:transparent">GraphRecursionError</span><span style="background-color:transparent">。</span></p>

<a id="t-BfC6FuT8Qimgng867z9gNG"></a>

##### 访问当前步骤计数器

<p id="t-0JS7Kle3TJ2DMYOoOxbVaa"><span style="background-color:transparent">您可以在任何节点内访问当前步骤计数器以监控执行进度。</span></p>

<pre id="t-FCaLgwcP0SaHrrlH4pQzsN"><code>from langchain_core.runnables import RunnableConfig
from langgraph.graph import StateGraph

def my_node(state: dict, config: RunnableConfig) -&gt; dict:
current_step = config["metadata"]["langgraph_step"]
print(f"Currently on step: {current_step}")
return state</code></pre>

<a id="t-VtaenTEW8CHT1u40X6uOcZ"></a>

##### 主动递归处理

<p id="t-y7c3lW3q8Fuo0lY7t9b2uH"><span style="background-color:transparent">LangGraph 提供了一个</span><span style="background-color:transparent">RemainingSteps</span><span style="background-color:transparent">托管值，用于跟踪在达到递归限制之前剩余的步骤数。这允许在图内进行优雅降级。</span></p>

<pre id="t-wj0kLqeA3IT8mEwW53rqat"><code>from typing import Annotated, Literal
from langgraph.graph import StateGraph, START, END
from langgraph.managed import RemainingSteps

class State(TypedDict):
messages: Annotated[list, lambda x, y: x + y]
remaining_steps: RemainingSteps  # Managed value - tracks steps until limit

def reasoning_node(state: State) -&gt; dict:
# RemainingSteps is automatically populated by LangGraph
remaining = state["remaining_steps"]

# Check if we're running low on steps
if remaining &lt;= 2:
return {"messages": ["Approaching limit, wrapping up..."]}

# Normal processing
return {"messages": ["thinking..."]}

def route_decision(state: State) -&gt; Literal["reasoning_node", "fallback_node"]:
"""Route based on remaining steps"""
if state["remaining_steps"] &lt;= 2:
return "fallback_node"
return "reasoning_node"

def fallback_node(state: State) -&gt; dict:
"""Handle cases where recursion limit is approaching"""
return {"messages": ["Reached complexity limit, providing best effort answer"]}

# Build graph
builder = StateGraph(State)
builder.add_node("reasoning_node", reasoning_node)
builder.add_node("fallback_node", fallback_node)
builder.add_edge(START, "reasoning_node")
builder.add_conditional_edges("reasoning_node", route_decision)
builder.add_edge("fallback_node", END)

graph = builder.compile()

# RemainingSteps works with any recursion_limit
result = graph.invoke({"messages": []}, {"recursion_limit": 10})</code></pre>

<a id="t-eKlZDVmKRpI3w7BqGL8E4I"></a>

##### 主动与被动方法

<p id="t-tx5gpKIwzo3AgKhN9H6esb"><span style="background-color:transparent">处理递归限制主要有两种方法：主动（在图内监控）和被动（在外部捕获错误）。</span></p>

<pre id="t-fC8QXIlTmwRlIWpw5Q91iS"><code>from typing import Annotated, Literal, TypedDict
from langgraph.graph import StateGraph, START, END
from langgraph.managed import RemainingSteps
from langgraph.errors import GraphRecursionError

class State(TypedDict):
messages: Annotated[list, lambda x, y: x + y]
remaining_steps: RemainingSteps

# Proactive Approach (recommended) - using RemainingSteps
def agent_with_monitoring(state: State) -&gt; dict:
"""Proactively monitor and handle recursion within the graph"""
remaining = state["remaining_steps"]

# Early detection - route to internal handling
if remaining &lt;= 2:
return {
"messages": ["Approaching limit, returning partial result"]
}

# Normal processing
return {"messages": [f"Processing... ({remaining} steps remaining)"]}

def route_decision(state: State) -&gt; Literal["agent", END]:
if state["remaining_steps"] &lt;= 2:
return END
return "agent"

# Build graph
builder = StateGraph(State)
builder.add_node("agent", agent_with_monitoring)
builder.add_edge(START, "agent")
builder.add_conditional_edges("agent", route_decision)
graph = builder.compile()

# Proactive: Graph completes gracefully
result = graph.invoke({"messages": []}, {"recursion_limit": 10})

# Reactive Approach (fallback) - catching error externally
try:
result = graph.invoke({"messages": []}, {"recursion_limit": 10})
except GraphRecursionError as e:
# Handle externally after graph execution fails
result = {"messages": ["Fallback: recursion limit exceeded"]}</code></pre>

<p id="t-ECJ4HCVZi6ppdgZE7lDC77"><span style="background-color:transparent">这些方法之间的主要区别是：</span></p>

<div id="t-tRnir2chpPXTcxEc4GyaNs"><table><colgroup><col width="306.5"/><col width="120"/><col width="120"/><col width="120"/></colgroup><tbody><tr><td><p><span>方法</span></p></td><td><p><span>检测时机</span></p></td><td><p><span>处理方式</span></p></td><td><p><span>控制流</span></p></td></tr><tr><td><p><span style="border-bottom:1px solid">主动（使用</span><span style="border-bottom:1px solid">RemainingSteps</span><span style="border-bottom:1px solid">）</span></p></td><td><p><span style="border-bottom:1px solid">在达到限制之前</span></p></td><td><p><span style="border-bottom:1px solid">通过条件路由在图内部处理</span></p></td><td><p><span style="border-bottom:1px solid">图继续执行到完成节点</span></p></td></tr><tr><td><p><span style="border-bottom:1px solid">被动（捕获</span><span style="border-bottom:1px solid">GraphRecursionError</span><span style="border-bottom:1px solid">）</span></p></td><td><p><span style="border-bottom:1px solid">在超过限制之后</span></p></td><td><p><span style="border-bottom:1px solid">在 try/catch 块中在图外部处理</span></p></td><td><p><span style="border-bottom:1px solid">图执行终止</span></p></td></tr></tbody></table></div>

<p id="t-n3lYixHV4lIo3dUi9C2xXT"><span style="font-weight:bold;background-color:transparent">主动方法的优势：</span></p>

<ul><li id="t-VNYSZVMPcTdoiQ4cagHrI6"><span>在图内实现优雅降级</span></li></ul>

<ul><li id="t-DWLZAHAGWnc8Zb5K4NScep"><span>可以在检查点中保存中间状态</span></li></ul>

<ul><li id="t-sGaGa0ZP5HObt5ae9PGG47"><span>提供更好的用户体验（部分结果）</span></li></ul>

<ul><li id="t-eAXuorgZipuqxtavkGVvkW"><span>图正常完成（无异常）</span></li></ul>

<p id="t-gJRAdO0RPaY3LcMLK4ovv4"><span style="font-weight:bold;background-color:transparent">被动方法的优势：</span></p>

<ul><li id="t-DUNQmD7hq6AjXfzK49TbEM"><span>实现更简单</span></li></ul>

<ul><li id="t-JGLynpZemX2uf0SPF8utjH"><span>无需修改图逻辑</span></li></ul>

<ul><li id="t-x9cYiTK3LK8gMUFPMwusDY"><span>集中式错误处理</span></li></ul>

<a id="t-IkcaoyckZtDu05TvjGDYI3"></a>

##### 其他可用的元数据

<p id="t-1di3JvUECOsKubjB0SHQM0"><span style="background-color:transparent">除了</span><span style="background-color:transparent">langgraph_step</span><span style="background-color:transparent">之外，以下元数据也可在</span><span style="background-color:transparent">config["metadata"]</span><span style="background-color:transparent">中获取：</span></p>

<pre id="t-nr2dZ9onOWcEBwngyBrfd9"><code>def inspect_metadata(state: dict, config: RunnableConfig) -&gt; dict:
metadata = config["metadata"]

print(f"Step: {metadata['langgraph_step']}")
print(f"Node: {metadata['langgraph_node']}")
print(f"Triggers: {metadata['langgraph_triggers']}")
print(f"Path: {metadata['langgraph_path']}")
print(f"Checkpoint NS: {metadata['langgraph_checkpoint_ns']}")

return state</code></pre>


<a id="section-1005"></a>
## 可视化

<a id="t-xzTPaZDVhQgqZfBCx5SXFM"></a>

<p id="t-ItHdC9GIJ5ifK3Wp9iz8Dl"><span style="background-color:transparent">能够可视化图通常很有帮助，尤其是当它们变得更加复杂时。LangGraph 提供了几种内置的可视化图的方法。</span></p>


<a id="section-1006"></a>
## 使用图形 API

<a id="t-block-18444"></a>

<p id="t-2WxIT8sbp7Ggu8Tivq1NVn"><span>本指南演示了 LangGraph Graph API 的基础知识。它将引导您了解</span><span style="border-bottom:1px solid;font-weight:bold">状态</span><span>，以及构建常见的图结构，例如</span><span style="border-bottom:1px solid;font-weight:bold">序列</span><span>、</span><span style="border-bottom:1px solid;font-weight:bold">分支</span><span>和</span><span style="border-bottom:1px solid;font-weight:bold">循环</span><span>。它还涵盖了 LangGraph 的控制功能，包括用于 map-reduce 工作流的</span><span style="border-bottom:1px solid;font-weight:bold">Send API</span><span>，以及用于将状态更新与跨节点"跳转"相结合的</span><span style="border-bottom:1px solid;font-weight:bold">Command API</span><span>。</span></p>


<a id="section-1007"></a>
## 设置

<a id="t-cLfcZYLLRNPAHQr3ATf7GF"></a>

<p id="t-nZC2ukfh17mxCHNBJBNZRm"><span>安装 </span><span>langgraph</span><span>：</span></p>

<pre id="t-qWz8jQBRjmL5NoHwTGTUNV"><code>pip install -U langgraph</code></pre>

<p id="t-NEuDwACSeHLHyuvJXo9XxS"><span style="font-weight:bold">设置 LangSmith 以获得更好的调试体验</span></p>

<p id="t-HB5gDejeHr2n3Xbf039FUE"><span>注册 </span><span style="border-bottom:1px solid;font-weight:bold">LangSmith</span><span> 以快速发现问题并提升 LangGraph 项目的性能。LangSmith 允许您使用追踪数据来调试、测试和监控使用 LangGraph 构建的 LLM 应用。</span></p>


<a id="section-1008"></a>
## 定义和更新状态

<a id="t-UoeJDEOChsIOawRrP7aJhu"></a>

<p id="t-8bLkSMsMRwW4yIT7zsvcHB"><span>这里我们将展示如何在 LangGraph 中定义和更新</span><span style="border-bottom:1px solid;font-weight:bold">状态</span><span>。我们将演示：</span></p>

<ol start="1"><li id="t-XHH62imkXu6i4EQo0rRdJE"><span>如何使用状态定义图的</span><span style="border-bottom:1px solid;font-weight:bold">模式</span></li></ol>

<ol start="2"><li id="t-M2eK4cQkAN0AWGJBkjWqpw"><span>如何使用</span><span style="border-bottom:1px solid;font-weight:bold">归约器</span><span>来控制状态更新的处理方式。</span></li></ol>


<a id="section-1009"></a>
## 定义状态

<a id="t-xJSDhEvalC9tjV5i6SjQdw"></a>

<p id="t-fwBO16VIdqwKNDrlZVcq8d"><span>LangGraph 中的</span><span style="border-bottom:1px solid;font-weight:bold">状态</span><span>可以是 </span><span>TypedDict</span><span>、</span><span>Pydantic</span><span> 模型或数据类。下面我们将使用 </span><span>TypedDict</span><span>。。</span></p>

<p id="t-5RzkStC7Fy7fMdS1tMjkGB"><span>默认情况下，图将具有相同的输入和输出模式，状态决定了该模式。</span></p>

<p id="t-rU0AiTe4V1JUPICff6fKNe"><span>让我们考虑一个使用</span><span style="border-bottom:1px solid;font-weight:bold">消息</span><span>的简单示例。这代表了许多 LLM 应用状态的通用表示形式。</span></p>

<pre id="t-48xphVhSNL7ClOIWl8NqtX"><code>from langchain.messages import AnyMessage
from typing_extensions import TypedDict

class State(TypedDict):
messages: list[AnyMessage]
extra_field: int</code></pre>

<p id="t-qxAo2tOh7Ca7xg16Ru9IOU"><span>此状态跟踪一个</span><span style="border-bottom:1px solid;font-weight:bold">消息</span><span>对象列表，以及一个额外的整数字段。</span></p>


<a id="section-1010"></a>
## 更新状态

<a id="t-LbGwFh6Nn55LHH1Ru7tcpn"></a>

<p id="t-CwMXBRSNTul2Qdq8FdiIhE"><span>让我们构建一个包含单个节点的示例图。我们的</span><span style="border-bottom:1px solid;font-weight:bold">节点</span><span>只是一个 Python 函数，它读取图的状态并对其进行更新。此函数的第一个参数始终是状态：</span></p>

<pre id="t-bfN0ZETEeQi90AFAitUoAS"><code>from langchain.messages import AIMessage

def node(state: State):
messages = state["messages"]
new_message = AIMessage("Hello!")
return {"messages": messages + [new_message], "extra_field": 10}</code></pre>

<p id="t-UOXjb1pq2cXKrWnSvnBFRl"><span>此节点只是将一条消息附加到我们的消息列表，并填充一个额外的字段。</span></p>

<p id="t-AG0EMewzslo06Yxzydv3gw"><span>节点应直接返回对状态的更新，而不是改变状态。</span></p>

<p id="t-CHmDj9g9DkQ1v6tIHsTfhY"><span>接下来让我们定义一个包含此节点的简单图。我们使用</span><span style="border-bottom:1px solid;font-weight:bold">StateGraph</span><span>来定义一个在此状态上操作的图。然后我们使用</span><span style="border-bottom:1px solid;font-weight:bold">add_node</span><span>来填充我们的图。</span></p>

<pre id="t-gCqCztvnYAioatUrKMThXV"><code>from langgraph.graph import StateGraph

builder = StateGraph(State)
builder.add_node(node)
builder.set_entry_point("node")
graph = builder.compile()</code></pre>

<p id="t-aKTP8g5Mggq2HErgLnflKo"><span>LangGraph 提供了内置工具来可视化您的图。让我们检查一下我们的图。</span></p>

<pre id="t-Edm7xBCTvtSOtkYb8XOi8U"><code>from IPython.display import Image, display

display(Image(graph.get_graph().draw_mermaid_png()))</code></pre>

<div id="t-m7TFhPM23AThnPPEd2umQk"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/992e84f165cb26d927a34962.png"/></div>

<p id="t-wS9fcOA5NRnGPTss0Nyd6F"><span>在这种情况下，我们的图只执行单个节点。让我们继续一个简单的调用：</span></p>

<pre id="t-pbTyedHDSpsw9EIQyt4MJp"><code>from langchain.messages import HumanMessage

result = graph.invoke({"messages": [HumanMessage("Hi")]})
result</code></pre>

<pre id="t-oBwAdjT4LnDO6cYpnHKf0j"><code>{'messages': [HumanMessage(content='Hi'), AIMessage(content='Hello!')], 'extra_field': 10}</code></pre>

<p id="t-OjV1ecGtHcyL8yuQ6C8ZaV"><span>请注意：</span></p>

<ul><li id="t-BuIUrpVmu2EoyMIIJ4hgBQ"><span>我们通过更新状态的单个键来启动调用。</span></li></ul>

<ul><li id="t-nMSIpU52DU5abY54fbQ91t"><span>我们在调用结果中接收到完整的状态。</span></li></ul>

<p id="t-FBGVU0ufhYUQ80FnO1nfun"><span>为了方便起见，我们经常通过美化打印来检查</span><span style="border-bottom:1px solid;font-weight:bold">消息对象</span><span>的内容：</span></p>

<pre id="t-bHPBYRbrsaI1CbCrFy0FAV"><code>for message in result["messages"]:
message.pretty_print()</code></pre>

<pre id="t-3WCpHHl4jmp8n8Pt9ZU5QC"><code>================================ Human Message ================================

Hi
================================== Ai Message ==================================

Hello!</code></pre>


<a id="section-1011"></a>
## 使用归约器处理状态更新

<a id="t-Ffgj6tX1hlwanP2OJJihgQ"></a>

<p id="t-r7VxpFzmYyUqOBStQLjgB1"><span>状态中的每个键都可以有自己的独立</span><span style="border-bottom:1px solid;font-weight:bold">归约器</span><span>函数，它控制如何应用来自节点的更新。如果没有明确指定归约器函数，则假定对该键的所有更新都应覆盖它。</span></p>

<p id="t-ZwzahWAmvJf1c41D57lejX"><span>对于</span><span>TypedDict</span><span>状态模式，我们可以通过用归约器函数注释状态的相应字段来定义归约器。</span></p>

<p id="t-JW62mM2k5QI7sPuX2IZG2q"><span>在前面的示例中，我们的节点通过向其附加一条消息来更新状态中的</span><span>"messages"</span><span>键。下面，我们为此键添加一个归约器，以便自动附加更新：</span></p>

<pre id="t-OEhVKoJr7kXP98dfKIKsl7"><code>from typing_extensions import Annotated

def add(left, right):
"""Can also import `add` from the `operator` built-in."""
return left + right

class State(TypedDict):
messages: Annotated[list[AnyMessage], add]
extra_field: int</code></pre>

<p id="t-zHwRzMfERJ58Y0YB5qEkym"><span>现在我们的节点可以简化：</span></p>

<pre id="t-scaagTIO41Lr5uemH05qIu"><code>def node(state: State):
new_message = AIMessage("Hello!")
return {"messages": [new_message], "extra_field": 10}</code></pre>

<pre id="t-Atbrl1BWR92MUHXOWux6FX"><code>from langgraph.graph import START

graph = StateGraph(State).add_node(node).add_edge(START, "node").compile()

result = graph.invoke({"messages": [HumanMessage("Hi")]})

for message in result["messages"]:
message.pretty_print()</code></pre>

<pre id="t-GIULQN9ifV0mLsZHZUNfYT"><code>================================ Human Message ================================

Hi
================================== Ai Message ==================================

Hello!</code></pre>

<a id="t-izpBQzkATxJE2sHPpBrqdu"></a>

##### MessagesState

<p id="t-7OBKF8pV484gUE9oI2lgrD"><span>实际上，更新消息列表还有其他考虑因素：</span></p>

<ul><li id="t-22NkzcOsVUJToVYQ90c4SE"><span>我们可能希望更新状态中的现有消息。</span></li></ul>

<ul><li id="t-ZMGYd1o7GvHT8upM2O7Rdc"><span>我们可能希望接受</span><span style="border-bottom:1px solid;font-weight:bold">消息格式</span><span>的简写，例如 </span><span style="border-bottom:1px solid;font-weight:bold">OpenAI 格式</span><span>。</span></li></ul>

<p id="t-fFIaK3hBWxx9musG9pHaWC"><span>LangGraph 包含一个内置的归约器</span><span style="border-bottom:1px solid;font-weight:bold">add_messages</span><span>来处理这些考虑因素：</span></p>

<pre id="t-e65FBO1V9ai3emekQhFeIJ"><code>from langgraph.graph.message import add_messages

class State(TypedDict):
messages: Annotated[list[AnyMessage], add_messages]
extra_field: int

def node(state: State):
new_message = AIMessage("Hello!")
return {"messages": [new_message], "extra_field": 10}

graph = StateGraph(State).add_node(node).set_entry_point("node").compile()</code></pre>

<pre id="t-LmYLIfTBsySGFQyNQWRPce"><code>input_message = {"role": "user", "content": "Hi"}

result = graph.invoke({"messages": [input_message]})

for message in result["messages"]:
message.pretty_print()</code></pre>

<pre id="t-cvH3uzZAuEDbEECA7HHRsb"><code>================================ Human Message ================================

Hi
================================== Ai Message ==================================

Hello!</code></pre>

<p id="t-4pd6oxAlRTwu3BITGQJ4fD"><span>这是涉及</span><span style="border-bottom:1px solid;font-weight:bold">聊天模型</span><span>的应用状态的通用表示形式。LangGraph 包含一个预构建的 </span><span>MessagesState</span><span> 以方便使用，这样我们就可以有：</span></p>

<pre id="t-Cad2h6NC470K4Ax2QUAwcL"><code>from langgraph.graph import MessagesState

class State(MessagesState):
extra_field: int</code></pre>


<a id="section-1012"></a>
## 使用 Overwrite 绕过归约器

<a id="t-lVSdJoZxxmklA9wEMHm7TS"></a>

<p id="t-BhgoNKlVkrICvvQDyM6M6Y"><span>在某些情况下，您可能希望绕过归约器并直接覆盖状态值。LangGraph 为此提供了</span><span style="border-bottom:1px solid;font-weight:bold">Overwrite</span><span>类型。当节点返回用</span><span>Overwrite</span><span>包装的值时，归约器将被绕过，通道将直接设置为该值。</span></p>

<p id="t-KOOild1sUcnRnSiMqn3Kju"><span>当您想要重置或替换累积状态而不是将其与现有值合并时，这很有用。</span></p>

<pre id="t-a0ttHuyUSiqIVySGfbsZ08"><code>from langgraph.graph import StateGraph, START, END
from langgraph.types import Overwrite
from typing_extensions import Annotated, TypedDict
import operator

class State(TypedDict):
messages: Annotated[list, operator.add]

def add_message(state: State):
return {"messages": ["first message"]}

def replace_messages(state: State):
# Bypass the reducer and replace the entire messages list
return {"messages": Overwrite(["replacement message"])}

builder = StateGraph(State)
builder.add_node("add_message", add_message)
builder.add_node("replace_messages", replace_messages)
builder.add_edge(START, "add_message")
builder.add_edge("add_message", "replace_messages")
builder.add_edge("replace_messages", END)

graph = builder.compile()

result = graph.invoke({"messages": ["initial"]})
print(result["messages"])</code></pre>

<pre id="t-hBukZ5lMa4FodsZRssvIkM"><code>['replacement message']</code></pre>

<p id="t-sL2mXnH0sGAV2HK53uf07x"><span>您也可以使用带有特殊键</span><span>"__overwrite__"</span><span>的 JSON 格式：</span></p>

<pre id="t-z5rBxtAD3bO7YvRnxQhAqX"><code>def replace_messages(state: State):
return {"messages": {"__overwrite__": ["replacement message"]}}</code></pre>

<p id="t-UIhhsCYVePQ6FzzP3KqD3v"><span>当节点并行执行时，在给定的超级步骤中，只有一个节点可以对同一状态键使用</span><span>Overwrite</span><span>。如果多个节点在同一超级步骤中尝试覆盖同一键，将引发</span><span>InvalidUpdateError</span><span>。</span></p>


<a id="section-1013"></a>
## 定义输入和输出模式

<a id="t-iAWuzzQVpV9DnK0cYmqzqP"></a>

<p id="t-WKvv8z8biN0HypHFpFgaPi"><span>默认情况下，</span><span>StateGraph</span><span>使用单一模式操作，所有节点都期望使用该模式进行通信。但是，也可以为图定义不同的输入和输出模式。</span></p>

<p id="t-1ROXwlM4U9AtyAsIEu7Cuz"><span>当指定了不同的模式时，节点之间的通信仍将使用内部模式。输入模式确保提供的输入符合预期结构，而输出模式则根据定义的输出模式过滤内部数据，仅返回相关信息。</span></p>

<p id="t-zp6BaBrVUQ2NOKljlzOL2F"><span>下面，我们将看到如何定义不同的输入和输出模式。</span></p>

<pre id="t-I8TqPssagE6S42kWk3vtmu"><code>from langgraph.graph import StateGraph, START, END
from typing_extensions import TypedDict

# Define the schema for the input
class InputState(TypedDict):
question: str

# Define the schema for the output
class OutputState(TypedDict):
answer: str

# Define the overall schema, combining both input and output
class OverallState(InputState, OutputState):
pass

# Define the node that processes the input and generates an answer
def answer_node(state: InputState):
# Example answer and an extra key
return {"answer": "bye", "question": state["question"]}

# Build the graph with input and output schemas specified
builder = StateGraph(OverallState, input_schema=InputState, output_schema=OutputState)
builder.add_node(answer_node) # Add the answer node
builder.add_edge(START, "answer_node") # Define the starting edge
builder.add_edge("answer_node", END) # Define the ending edge
graph = builder.compile() # Compile the graph

# Invoke the graph with an input and print the result
print(graph.invoke({"question": "hi"}))</code></pre>

<pre id="t-64fXFBaltTm2RNkfZP4EK0"><code>{'answer': 'bye'}</code></pre>

<p id="t-wmrUqeEQRnfF6A7MwIJGL1"><span>请注意，invoke 的输出仅包含输出模式。</span></p>


<a id="section-1014"></a>
## 在节点之间传递私有状态

<a id="t-or1UJhmndYuiFVDhRHTArV"></a>

<p id="t-kgerGXnZAoDix8V5UvEnUk"><span>在某些情况下，您可能希望节点交换对中间逻辑至关重要但不需要成为图主模式一部分的信息。这些私有数据与图的整体输入/输出无关，应仅在特定节点之间共享。</span></p>

<p id="t-m0QxzvoanimZjFP8jYBYBD"><span>下面，我们将创建一个由三个节点（node_1、node_2 和 node_3）组成的示例顺序图，其中私有数据在前两个步骤（node_1 和 node_2）之间传递，而第三个步骤（node_3）只能访问公共的整体状态。</span></p>

<pre id="t-XQQpLeRUj2jnut6nCRKKNx"><code>from langgraph.graph import StateGraph, START, END
from typing_extensions import TypedDict

# The overall state of the graph (this is the public state shared across nodes)
class OverallState(TypedDict):
a: str

# Output from node_1 contains private data that is not part of the overall state
class Node1Output(TypedDict):
private_data: str

# The private data is only shared between node_1 and node_2
def node_1(state: OverallState) -&gt; Node1Output:
output = {"private_data": "set by node_1"}
print(f"Entered node `node_1`:\n\tInput: {state}.\n\tReturned: {output}")
return output

# Node 2 input only requests the private data available after node_1
class Node2Input(TypedDict):
private_data: str

def node_2(state: Node2Input) -&gt; OverallState:
output = {"a": "set by node_2"}
print(f"Entered node `node_2`:\n\tInput: {state}.\n\tReturned: {output}")
return output

# Node 3 only has access to the overall state (no access to private data from node_1)
def node_3(state: OverallState) -&gt; OverallState:
output = {"a": "set by node_3"}
print(f"Entered node `node_3`:\n\tInput: {state}.\n\tReturned: {output}")
return output

# Connect nodes in a sequence
# node_2 accepts private data from node_1, whereas
# node_3 does not see the private data.
builder = StateGraph(OverallState).add_sequence([node_1, node_2, node_3])
builder.add_edge(START, "node_1")
graph = builder.compile()

# Invoke the graph with the initial state
response = graph.invoke(
{
"a": "set at start",
}
)

print()
print(f"Output of graph invocation: {response}")</code></pre>

<pre id="t-KRTHqUwLnTdR4woRUBowlU"><code>Entered node `node_1`:
Input: {'a': 'set at start'}.
Returned: {'private_data': 'set by node_1'}
Entered node `node_2`:
Input: {'private_data': 'set by node_1'}.
Returned: {'a': 'set by node_2'}
Entered node `node_3`:
Input: {'a': 'set by node_2'}.
Returned: {'a': 'set by node_3'}

Output of graph invocation: {'a': 'set by node_3'}</code></pre>


<a id="section-1015"></a>
## 使用 pydantic 模型作为图状态

<a id="t-Ihwy7CEQ6AfZFCm3fog1ko"></a>

<p id="t-sLsNycfppd74kMvJpNTDYC"><span style="border-bottom:1px solid;font-weight:bold">StateGraph</span><span> 在初始化时接受一个 </span><span style="border-bottom:1px solid;font-weight:bold">state_schema</span><span> 参数，该参数指定图中节点可以访问和更新的状态的"形状"。</span></p>

<p id="t-ut5epJtZv9vVnuEdT2dZTL"><span>在我们的示例中，我们通常使用 Python 原生的 </span><span>TypedDict</span><span> 或 </span><span style="border-bottom:1px solid;font-weight:bold">dataclass</span><span> 作为 </span><span>state_schema</span><span>，但 </span><span style="border-bottom:1px solid;font-weight:bold">state_schema</span><span> 可以是任何</span><span style="border-bottom:1px solid;font-weight:bold">类型</span><span>。</span></p>

<p id="t-l5OtJoQuWXrIrUeCx1Kdz5"><span>这里，我们将看到如何使用 </span><span style="border-bottom:1px solid;font-weight:bold">Pydantic BaseModel</span><span> 作为 </span><span style="border-bottom:1px solid;font-weight:bold">state_schema</span><span>，以在</span><span style="font-weight:bold">输入</span><span>上添加运行时验证。</span></p>

<p id="t-zdYIoPmnAlXbMHygBM9iGs"><span style="font-weight:bold">已知限制</span></p>

<ul><li id="t-IIpndjG7Tnk3lCZliC6yML"><span>目前，图的输出将</span><span style="font-weight:bold">不会</span><span>是 pydantic 模型的实例。</span></li></ul>

<ul><li id="t-LwsMjGGVZkIbLEV1U9S35c"><span>运行时验证仅发生在图中第一个节点的输入上，而不是后续节点或输出上。</span></li></ul>

<ul><li id="t-KOtjatFYmshkwZNMp5msFW"><span>Pydantic 的验证错误追踪不会显示错误出现在哪个节点。</span></li></ul>

<ul><li id="t-lxkP0v9n6hPcxFQk00GFIp"><span>Pydantic 的递归验证可能较慢。对于性能敏感的应用，您可能需要考虑使用</span><span>dataclass</span><span>代替。</span></li></ul>

<pre id="t-vJlhfZQ80Q3hgAGWPzOUt3"><code>from langgraph.graph import StateGraph, START, END
from typing_extensions import TypedDict
from pydantic import BaseModel

# The overall state of the graph (this is the public state shared across nodes)
class OverallState(BaseModel):
a: str

def node(state: OverallState):
return {"a": "goodbye"}

# Build the state graph
builder = StateGraph(OverallState)
builder.add_node(node) # node_1 is the first node
builder.add_edge(START, "node") # Start the graph with node_1
builder.add_edge("node", END) # End the graph after node_1
graph = builder.compile()

# Test the graph with a valid input
graph.invoke({"a": "hello"})</code></pre>

<p id="t-XOdbntwRxJp0TTOdVmRMaO"><span>使用</span><span style="font-weight:bold">无效</span><span>输入调用图</span></p>

<pre id="t-3ic0m7uL4XUQH5ZkNyrtwp"><code>try:
graph.invoke({"a": 123}) # Should be a string
except Exception as e:
print("An exception was raised because `a` is an integer rather than a string.")
print(e)</code></pre>

<pre id="t-fQ7pxFB6X2FFJ52wRVinKS"><code>An exception was raised because `a` is an integer rather than a string.
1 validation error for OverallState
a
Input should be a valid string [type=string_type, input_value=123, input_type=int]
For further information visit https://errors.pydantic.dev/2.9/v/string_type</code></pre>

<p id="t-LyEG5PmgdaowVo46hyJNfp"><span>有关 Pydantic 模型状态的更多功能，请参见下文：</span></p>

<p id="t-GuxRpGOcwSWbEF6eW07IO3"><span>当使用 Pydantic 模型作为状态模式时，了解序列化的工作方式非常重要，尤其是在以下情况下：</span></p>

<ul><li id="t-1KRZunzfkkAwgZxHDPFQnc"><span>将 Pydantic 对象作为输入传递</span></li></ul>

<ul><li id="t-OJFrwe5iZQdosWi8sayraU"><span>接收图的输出</span></li></ul>

<ul><li id="t-mIdZ8VjCgkWCLZsidcfy84"><span>使用嵌套的 Pydantic 模型</span></li></ul>

<p id="t-ulpnDdcT1NkZuU2qWe8s7W"><span>让我们看看这些行为的具体表现。</span></p>

<pre id="t-KeOYpYbyshd8n8GTzvKHnl"><code>from langgraph.graph import StateGraph, START, END
from pydantic import BaseModel

class NestedModel(BaseModel):
value: str

class ComplexState(BaseModel):
text: str
count: int
nested: NestedModel

def process_node(state: ComplexState):
# Node receives a validated Pydantic object
print(f"Input state type: {type(state)}")
print(f"Nested type: {type(state.nested)}")
# Return a dictionary update
return {"text": state.text + " processed", "count": state.count + 1}

# Build the graph
builder = StateGraph(ComplexState)
builder.add_node("process", process_node)
builder.add_edge(START, "process")
builder.add_edge("process", END)
graph = builder.compile()

# Create a Pydantic instance for input
input_state = ComplexState(text="hello", count=0, nested=NestedModel(value="test"))
print(f"Input object type: {type(input_state)}")

# Invoke graph with a Pydantic instance
result = graph.invoke(input_state)
print(f"Output type: {type(result)}")
print(f"Output content: {result}")

# Convert back to Pydantic model if needed
output_model = ComplexState(**result)
print(f"Converted back to Pydantic: {type(output_model)}")</code></pre>

<p id="t-Mt0Q2YL2idlqwB1kBGLPfx"><span>Pydantic 对某些数据类型执行运行时类型强制转换。这可能有所帮助，但如果您不了解，也可能导致意外行为。</span></p>

<pre id="t-cm2JlZWymsj1Zew8qbywH7"><code>from langgraph.graph import StateGraph, START, END
from pydantic import BaseModel

class CoercionExample(BaseModel):
# Pydantic will coerce string numbers to integers
number: int
# Pydantic will parse string booleans to bool
flag: bool

def inspect_node(state: CoercionExample):
print(f"number: {state.number} (type: {type(state.number)})")
print(f"flag: {state.flag} (type: {type(state.flag)})")
return {}

builder = StateGraph(CoercionExample)
builder.add_node("inspect", inspect_node)
builder.add_edge(START, "inspect")
builder.add_edge("inspect", END)
graph = builder.compile()

# Demonstrate coercion with string inputs that will be converted
result = graph.invoke({"number": "42", "flag": "true"})

# This would fail with a validation error
try:
graph.invoke({"number": "not-a-number", "flag": "true"})
except Exception as e:
print(f"\nExpected validation error: {e}")</code></pre>

<p id="t-sI8RAfaeElOflsGoIZoWuM"><span>在状态模式中使用 LangChain 消息类型时，序列化有重要的考虑因素。当通过网络使用消息对象时，您应该使用</span><span>AnyMessage</span><span>（而不是</span><span>BaseMessage</span><span>）以进行正确的序列化/反序列化。</span></p>

<pre id="t-5quDDam6PmcDeSVMQedQeI"><code>from langgraph.graph import StateGraph, START, END
from pydantic import BaseModel
from langchain.messages import HumanMessage, AIMessage, AnyMessage
from typing import List

class ChatState(BaseModel):
messages: List[AnyMessage]
context: str

def add_message(state: ChatState):
return {"messages": state.messages + [AIMessage(content="Hello there!")]}

builder = StateGraph(ChatState)
builder.add_node("add_message", add_message)
builder.add_edge(START, "add_message")
builder.add_edge("add_message", END)
graph = builder.compile()

# Create input with a message
initial_state = ChatState(
messages=[HumanMessage(content="Hi")], context="Customer support chat"
)

result = graph.invoke(initial_state)
print(f"Output: {result}")

# Convert back to Pydantic model to see message types
output_model = ChatState(**result)
for i, msg in enumerate(output_model.messages):
print(f"Message {i}: {type(msg).__name__} - {msg.content}")</code></pre>


<a id="section-1016"></a>
## 添加运行时配置

<a id="t-dyh8cqevTPTLf1AK1isVM3"></a>

<p id="t-EHShaNU1uYM8Mc7AnOs21p"><span>有时您希望在调用图时能够配置它。例如，您可能希望在运行时指定使用哪个 LLM 或系统提示，</span><span style="font-style:italic">而不让这些参数污染图状态</span><span>。</span></p>

<p id="t-tKeVCSjHDaDX0XBfJpCiJV"><span>要添加运行时配置：</span></p>

<ol start="1"><li id="t-URUwryam0cFI5QXXLtPkSh"><span>为您的配置指定一个模式</span></li></ol>

<ol start="2"><li id="t-Et83U4xJHbE8rX4GfcDSrJ"><span>将配置添加到节点或条件边的函数签名中</span></li></ol>

<ol start="3"><li id="t-ATEzd2l5i8kVYXggGJLU74"><span>将配置传递到图中。</span></li></ol>

<p id="t-qnX5757wCQ0AI3FHo2k5UE"><span>请参见下面的简单示例：</span></p>

<pre id="t-MmTbqlg0aPZ4jysQY5ujVe"><code>from langgraph.graph import END, StateGraph, START
from langgraph.runtime import Runtime
from typing_extensions import TypedDict

# 1. Specify config schema
class ContextSchema(TypedDict):
my_runtime_value: str

# 2. Define a graph that accesses the config in a node
class State(TypedDict):
my_state_value: str

def node(state: State, runtime: Runtime[ContextSchema]):
if runtime.context["my_runtime_value"] == "a":
return {"my_state_value": 1}
elif runtime.context["my_runtime_value"] == "b":
return {"my_state_value": 2}
else:
raise ValueError("Unknown values.")

builder = StateGraph(State, context_schema=ContextSchema)
builder.add_node(node)
builder.add_edge(START, "node")
builder.add_edge("node", END)

graph = builder.compile()

# 3. Pass in configuration at runtime:
print(graph.invoke({}, context={"my_runtime_value": "a"}))
print(graph.invoke({}, context={"my_runtime_value": "b"}))</code></pre>

<pre id="t-7XXHgBqNFMA6QGnsnp5xgi"><code>{'my_state_value': 1}
{'my_state_value': 2}</code></pre>

<p id="t-0MNPgYGZgqU6Dg6G7EC3KH"><span>下面我们演示一个实际示例，其中我们在运行时配置使用哪个 LLM。我们将同时使用 OpenAI 和 Anthropic 模型。</span></p>

<pre id="t-wb3rnQAuZmPJh4oB7vtgha"><code>from dataclasses import dataclass

from langchain.chat_models import init_chat_model
from langgraph.graph import MessagesState, END, StateGraph, START
from langgraph.runtime import Runtime
from typing_extensions import TypedDict

@dataclass
class ContextSchema:
model_provider: str = "anthropic"

MODELS = {
"anthropic": init_chat_model("claude-haiku-4-5-20251001"),
"openai": init_chat_model("gpt-4.1-mini"),
}

def call_model(state: MessagesState, runtime: Runtime[ContextSchema]):
model = MODELS[runtime.context.model_provider]
response = model.invoke(state["messages"])
return {"messages": [response]}

builder = StateGraph(MessagesState, context_schema=ContextSchema)
builder.add_node("model", call_model)
builder.add_edge(START, "model")
builder.add_edge("model", END)

graph = builder.compile()

# Usage
input_message = {"role": "user", "content": "hi"}
# With no configuration, uses default (Anthropic)
response_1 = graph.invoke({"messages": [input_message]}, context=ContextSchema())["messages"][-1]
# Or, can set OpenAI
response_2 = graph.invoke({"messages": [input_message]}, context={"model_provider": "openai"})["messages"][-1]

print(response_1.response_metadata["model_name"])
print(response_2.response_metadata["model_name"])</code></pre>

<pre id="t-3DTvvdprCgDsFRpcHvVL6A"><code>claude-haiku-4-5-20251001
gpt-4.1-mini-2025-04-14</code></pre>

<p id="t-mEdluicDOzdaXwHAZNOZh6"><span>下面我们演示一个实际示例，其中我们在运行时配置两个参数：要使用的 LLM 和系统消息。</span></p>

<pre id="t-meFx7lsI9hXqTTisonlbgU"><code>from dataclasses import dataclass
from langchain.chat_models import init_chat_model
from langchain.messages import SystemMessage
from langgraph.graph import END, MessagesState, StateGraph, START
from langgraph.runtime import Runtime
from typing_extensions import TypedDict

@dataclass
class ContextSchema:
model_provider: str = "anthropic"
system_message: str | None = None

MODELS = {
"anthropic": init_chat_model("claude-haiku-4-5-20251001"),
"openai": init_chat_model("gpt-4.1-mini"),
}

def call_model(state: MessagesState, runtime: Runtime[ContextSchema]):
model = MODELS[runtime.context.model_provider]
messages = state["messages"]
if (system_message := runtime.context.system_message):
messages = [SystemMessage(system_message)] + messages
response = model.invoke(messages)
return {"messages": [response]}

builder = StateGraph(MessagesState, context_schema=ContextSchema)
builder.add_node("model", call_model)
builder.add_edge(START, "model")
builder.add_edge("model", END)

graph = builder.compile()

# Usage
input_message = {"role": "user", "content": "hi"}
response = graph.invoke({"messages": [input_message]}, context={"model_provider": "openai", "system_message": "Respond in Italian."})
for message in response["messages"]:
message.pretty_print()</code></pre>

<pre id="t-dqRDhTn0fzgqE40JjegkzK"><code>================================ Human Message ================================

hi
================================== Ai Message ==================================

Ciao! Come posso aiutarti oggi?</code></pre>


<a id="section-1017"></a>
## 添加重试策略

<a id="t-TyIEfweMae16I8omPA8QHP"></a>

<p id="t-xfUMWxd4ym4yPnpLeiLjAL"><span>在许多用例中，您可能希望节点具有自定义的重试策略，例如，如果您正在调用 API、查询数据库或调用 LLM 等。LangGraph 允许您向节点添加重试策略。</span></p>

<p id="t-1KF7iyadcOG5Xly8dlTHfV"><span>要配置重试策略，请将</span><span>retry_policy</span><span>参数传递给</span><span style="border-bottom:1px solid;font-weight:bold">add_node</span><span>。</span><span>retry_policy</span><span>参数接受一个</span><span>RetryPolicy</span><span>命名元组对象。下面我们使用默认参数实例化一个</span><span>RetryPolicy</span><span>对象并将其与节点关联：</span></p>

<pre id="t-Ztk1dCygH5oEKZyg3Pyiuk"><code>from langgraph.types import RetryPolicy

builder.add_node(
"node_name",
node_function,
retry_policy=RetryPolicy(),
)</code></pre>

<p id="t-WaWmB1NrTYYqgCLCiAwixN"><span>默认情况下，</span><span>retry_on</span><span>参数使用</span><span>default_retry_on</span><span>函数，该函数重试任何异常，但以下情况除外：</span></p>

<ul><li id="t-QubGoE2ZOHQXZr50UCauTi"><span>ValueError</span></li></ul>

<ul><li id="t-hFNUO29Zu63Es2mzhyAPpQ"><span>TypeError</span></li></ul>

<ul><li id="t-kY3m2EJeATsQasytqet60t"><span>ArithmeticError</span></li></ul>

<ul><li id="t-t93b5L8ep4ZeIV78qC59gw"><span>ImportError</span></li></ul>

<ul><li id="t-9FkzSnfgW8cChjLCCe91wB"><span>LookupError</span></li></ul>

<ul><li id="t-OiwU4S2BiMm9Lx01EGPd2v"><span>NameError</span></li></ul>

<ul><li id="t-Okofc5xMDoNXy3Fk4BQQcV"><span>SyntaxError</span></li></ul>

<ul><li id="t-JuYGulEWr4lYHqLCwQd7Vz"><span>RuntimeError</span></li></ul>

<ul><li id="t-oIF40FhJU4tkmHGNOpapZc"><span>ReferenceError</span></li></ul>

<ul><li id="t-sgU7M5H7c8aK5X34FiQLs5"><span>StopIteration</span></li></ul>

<ul><li id="t-8fU8aeATK3RPvRg9Ov5eiN"><span>StopAsyncIteration</span></li></ul>

<ul><li id="t-QFuhSNPKyDdOgna2ZJn3Ns"><span>OSError</span></li></ul>

<p id="t-TWdmmGu3nh28V6QDaqzKX4"><span>此外，对于来自流行 HTTP 请求库（如</span><span>requests</span><span>和</span><span>httpx</span><span>）的异常，它仅对 5xx 状态码进行重试。</span></p>

<p id="t-p8g531PW1p38nEOJCKsvHp"><span>考虑一个我们从 SQL 数据库读取数据的示例。下面我们向节点传递两种不同的重试策略：</span></p>

<pre id="t-bmy52tkopTbUV2tWUMSJ4i"><code>import sqlite3
from typing_extensions import TypedDict
from langchain.chat_models import init_chat_model
from langgraph.graph import END, MessagesState, StateGraph, START
from langgraph.types import RetryPolicy
from langchain_community.utilities import SQLDatabase
from langchain.messages import AIMessage

db = SQLDatabase.from_uri("sqlite:///:memory:")
model = init_chat_model("claude-haiku-4-5-20251001")

def query_database(state: MessagesState):
query_result = db.run("SELECT * FROM Artist LIMIT 10;")
return {"messages": [AIMessage(content=query_result)]}

def call_model(state: MessagesState):
response = model.invoke(state["messages"])
return {"messages": [response]}

# Define a new graph
builder = StateGraph(MessagesState)
builder.add_node(
"query_database",
query_database,
retry_policy=RetryPolicy(retry_on=sqlite3.OperationalError),
)
builder.add_node("model", call_model, retry_policy=RetryPolicy(max_attempts=5))
builder.add_edge(START, "model")
builder.add_edge("model", "query_database")
builder.add_edge("query_database", END)
graph = builder.compile()</code></pre>


<a id="section-1018"></a>
## 添加节点缓存

<a id="t-DFymFaJmV31Z1AJ4yktYWs"></a>

<p id="t-v2zFTwwm5Mjsa63ubfux4l"><span>当您希望避免重复操作时，节点缓存非常有用，例如在执行耗时（时间或成本方面）的操作时。LangGraph 允许您向图中的节点添加个性化的缓存策略。</span></p>

<p id="t-LHMKqHW42jCHHJfkv4Q26i"><span>要配置缓存策略，请将</span><span>cache_policy</span><span>参数传递给</span><span style="border-bottom:1px solid;font-weight:bold">add_node</span><span>函数。在以下示例中，实例化了一个</span><span style="border-bottom:1px solid;font-weight:bold">CachePolicy</span><span>对象，其生存时间为 120 秒，并使用默认的</span><span>key_func</span><span>生成器。然后将其与一个节点关联：</span></p>

<pre id="t-Xj6HzMkDTSqNxxYWWbLvaS"><code>from langgraph.types import CachePolicy

builder.add_node(
"node_name",
node_function,
cache_policy=CachePolicy(ttl=120),
)</code></pre>

<p id="t-WA44qdEFwUH2HSldjAruGt"><span>然后，要为图启用节点级缓存，请在编译图时设置</span><span>cache</span><span>参数。下面的示例使用</span><span>InMemoryCache</span><span>来设置一个具有内存缓存的图，但也可以使用</span><span>SqliteCache</span><span>。</span></p>

<pre id="t-b75BXZbiV5h3RY6r6xL9uy"><code>from langgraph.cache.memory import InMemoryCache

graph = builder.compile(cache=InMemoryCache())</code></pre>


<a id="section-1019"></a>
## 创建步骤序列

<a id="t-40HDo66MBAd2YkvVnocXQM"></a>

<p id="t-rHIxZRmH5eJEPeIJIv6edu"><span style="font-weight:bold">先决条件</span><span> 本指南假设您熟悉上面关于</span><span style="border-bottom:1px solid;font-weight:bold">状态</span><span>的部分。</span></p>

<p id="t-9PvVyWty8cxwJ1lXXPdyIF"><span>这里我们将演示如何构建一个简单的步骤序列。我们将展示：</span></p>

<ol start="1"><li id="t-upx3q3GUj1qevVx0HCHSdn"><span>如何构建一个顺序图</span></li></ol>

<ol start="2"><li id="t-LJMK0z2btZ5GCByYBgjiuK"><span>用于构建类似图的内置简写。</span></li></ol>

<p id="t-JxOzdKcVdAM16TqFcmvPzi"><span>要添加节点序列，我们使用图的</span><span style="border-bottom:1px solid;font-weight:bold">add_node</span><span>和</span><span style="border-bottom:1px solid;font-weight:bold">add_edge</span><span>方法：</span></p>

<pre id="t-phd2KKFo5TSOLD1zc1dH0k"><code>from langgraph.graph import START, StateGraph

builder = StateGraph(State)

# Add nodes
builder.add_node(step_1)
builder.add_node(step_2)
builder.add_node(step_3)

# Add edges
builder.add_edge(START, "step_1")
builder.add_edge("step_1", "step_2")
builder.add_edge("step_2", "step_3")</code></pre>

<p id="t-swHSXuDN8vqqyMFdOlzqdp"><span>我们也可以使用内置的简写</span><span>.add_sequence</span><span>：</span></p>

<pre id="t-rmY1F8wToxJ5Q5ENF1lrCL"><code>builder = StateGraph(State).add_sequence([step_1, step_2, step_3])
builder.add_edge(START, "step_1")</code></pre>

<p id="t-u1DpIWlPUEoAKMUReY7z0i"><span>LangGraph 使得为您的应用程序添加底层持久层变得容易。 这允许在节点执行之间对状态进行检查点保存，因此您的 LangGraph 节点控制着：</span></p>

<ul><li id="t-BN7Nz0HGAYNAy5sWuRXQmd"><span>状态更新如何</span><span style="border-bottom:1px solid;font-weight:bold">检查点保存</span></li></ul>

<ul><li id="t-bPP7KxaKScJ1ZkEHkOKdcM"><span>在</span><span style="border-bottom:1px solid;font-weight:bold">人机交互</span><span>工作流中如何恢复中断</span></li></ul>

<ul><li id="t-NvEcQwJXWVWf2LN7BcYKcr"><span>如何使用 LangGraph 的</span><span style="border-bottom:1px solid;font-weight:bold">时间旅行</span><span>功能"回滚"和分支执行</span></li></ul>

<p id="t-MlrpKUefVqp8HgkEjZ4Ovo"><span>它们还决定了执行步骤如何</span><span style="border-bottom:1px solid;font-weight:bold">流式传输</span><span>，以及如何使用 </span><span style="border-bottom:1px solid;font-weight:bold">Studio</span><span> 可视化和调试您的应用程序。</span></p>

<p id="t-5CwEqI5j458QM0EU8QH309"><span>让我们演示一个端到端的示例。我们将创建一个包含三个步骤的序列：</span></p>

<ol start="1"><li id="t-Jb78Fylhl6rWh2Msb3nyLd"><span>在状态的键中填充一个值</span></li></ol>

<ol start="2"><li id="t-5sodBs293RGXnormyPW1Vs"><span>更新相同的值</span></li></ol>

<ol start="3"><li id="t-eSXbgotOrobBl1a9yYE3lz"><span>填充一个不同的值</span></li></ol>

<p id="t-zEKXqnsRXBL1qfGhA2cDfx"><span>首先定义我们的</span><span style="border-bottom:1px solid;font-weight:bold">状态</span><span>。这控制着</span><span style="border-bottom:1px solid;font-weight:bold">图的模式</span><span>，并且还可以指定如何应用更新。更多细节请参见</span><span style="border-bottom:1px solid;font-weight:bold">本节</span><span>。</span></p>

<p id="t-QfjjCmdNuTlNROnN60eGkM"><span>在我们的例子中，我们将只跟踪两个值：</span></p>

<pre id="t-7q7E6xImnIFteV2az7GeA8"><code>from typing_extensions import TypedDict

class State(TypedDict):
value_1: str
value_2: int</code></pre>

<p id="t-NpUaKzTCmj3fe3YqudU997"><span>我们的</span><span style="border-bottom:1px solid;font-weight:bold">节点</span><span>只是读取图状态并对其进行更新的 Python 函数。该函数的第一个参数始终是状态：</span></p>

<pre id="t-3EDeCNoJubDmfoBIYFAE8w"><code>def step_1(state: State):
return {"value_1": "a"}

def step_2(state: State):
current_value_1 = state["value_1"]
return {"value_1": f"{current_value_1} b"}

def step_3(state: State):
return {"value_2": 10}</code></pre>

<p id="t-Zd5ajrKLOjwzF3pIYrIexs"><span>请注意，当向状态发出更新时，每个节点只需指定它希望更新的键的值。</span></p>

<p id="t-hB5NldF2DbMyvNrJSF9ToD"><span>默认情况下，这将</span><span style="font-weight:bold">覆盖</span><span>相应键的值。您也可以使用</span><span style="border-bottom:1px solid;font-weight:bold">归约器</span><span>来控制如何处理更新——例如，您可以向键追加连续的更新而不是覆盖。更多细节请参见</span><span style="border-bottom:1px solid;font-weight:bold">本节</span><span>。</span></p>

<p id="t-LALbyUkMGgOFcUzVrQyXIs"><span>最后，我们定义图。我们使用 </span><span style="border-bottom:1px solid;font-weight:bold">StateGraph</span><span> 来定义一个在此状态上操作的图。</span></p>

<p id="t-AWxZGOS8uVJ6T2E4VxDsiu"><span>然后我们将使用</span><span style="border-bottom:1px solid;font-weight:bold">add_node</span><span>和</span><span style="border-bottom:1px solid;font-weight:bold">add_edge</span><span>来填充我们的图并定义其控制流。</span></p>

<pre id="t-zShwowbM5vXwt1w3PN7U24"><code>from langgraph.graph import START, StateGraph

builder = StateGraph(State)

# Add nodes
builder.add_node(step_1)
builder.add_node(step_2)
builder.add_node(step_3)

# Add edges
builder.add_edge(START, "step_1")
builder.add_edge("step_1", "step_2")
builder.add_edge("step_2", "step_3")</code></pre>

<p id="t-S0wogO3eVGa4NhyV2Vb8pC"><span style="font-weight:bold">指定自定义名称</span><span>您可以使用</span><span style="border-bottom:1px solid;font-weight:bold">add_node</span><span>为节点指定自定义名称：</span></p>

<pre id="t-6rdVW6VWWY0ojiJsG9Yzqi"><code>builder.add_node("my_node", step_1)</code></pre>

<p id="t-yI7khr3FJfF8XWj408RasW"><span>请注意：</span></p>

<ul><li id="t-V8G31UN8zebV7XEw8CFmbK"><span style="border-bottom:1px solid;font-weight:bold">add_edge</span><span>接受节点名称，对于函数，默认使用</span><span>node.__name__</span><span>。</span></li></ul>

<ul><li id="t-VyjzL3WURNYzhDsA865hkU"><span>我们必须指定图的入口点。为此，我们添加一条与</span><span style="border-bottom:1px solid;font-weight:bold">START 节点</span><span>的边。</span></li></ul>

<ul><li id="t-lLVMWgt57vHEPTJPJxBP9B"><span>当没有更多节点要执行时，图停止。</span></li></ul>

<p id="t-xSr2QJocXujoUVzShRWDHR"><span>接下来我们</span><span style="border-bottom:1px solid;font-weight:bold">编译</span><span>我们的图。这提供了对图结构的一些基本检查（例如，识别孤立节点）。如果我们通过</span><span style="border-bottom:1px solid;font-weight:bold">检查点保存器</span><span>向应用程序添加持久性，它也会在这里传递。</span></p>

<pre id="t-RYSc7bANDPUVpHRB7AzYVQ"><code>graph = builder.compile()</code></pre>

<p id="t-8LRLuL6DhWrUfXGoubXFLN"><span>LangGraph 提供了内置工具来可视化您的图。让我们检查我们的序列。有关可视化的详细信息，请参见</span><span style="border-bottom:1px solid;font-weight:bold">本指南</span><span>。</span></p>

<pre id="t-1HnZJU6Tkhu2lzRddwrU7t"><code>from IPython.display import Image, display

display(Image(graph.get_graph().draw_mermaid_png()))</code></pre>

<div id="t-dR5b64bvKEcEdIGPWMTMxh"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/7c2b7898bbf16301068f3bd4.png"/></div>

<p id="t-cyifJNTlVwxG5grMh2hXba"><span>让我们进行一个简单的调用：</span></p>

<pre id="t-78t7vHbUs2PVlxlyyxOEvi"><code>graph.invoke({"value_1": "c"})</code></pre>

<pre id="t-jkj3TiUDiGHD0d2Fbt2cXM"><code>{'value_1': 'a b', 'value_2': 10}</code></pre>

<p id="t-PzbW8Uw5uWwcL9qfarPrFQ"><span>请注意：</span></p>

<ul><li id="t-cdg37Sxxbwpm9GvT9DfGhM"><span>我们通过为单个状态键提供一个值来启动调用。我们必须始终为至少一个键提供一个值。</span></li></ul>

<ul><li id="t-mqDypYNBOKZwUwgsUzg7uX"><span>我们传入的值被第一个节点覆盖。</span></li></ul>

<ul><li id="t-xZ9HlxPLuwMpqWhXamBpIu"><span>第二个节点更新了该值。</span></li></ul>

<ul><li id="t-qjhx279r5QxVtGdwNKHacq"><span>第三个节点填充了一个不同的值。</span></li></ul>

<p id="t-bW719zcHeI4qvw7gUVNaBj"><span style="font-weight:bold">内置简写</span><span>langgraph&gt;=0.2.46</span><span>包含一个内置的简写</span><span>add_sequence</span><span>用于添加节点序列。您可以按如下方式编译相同的图：</span></p>

<pre id="t-tr8PC1e7D6x2Nvg8KFYFQE"><code>builder = StateGraph(State).add_sequence([step_1, step_2, step_3])
builder.add_edge(START, "step_1")

graph = builder.compile()

graph.invoke({"value_1": "c"})</code></pre>


<a id="section-1020"></a>
## 创建分支

<a id="t-N2V6wUjulh5iYlIf9TpRSA"></a>

<p id="t-a6ZDvfouCDDVATu6qq6etE"><span>节点的并行执行对于加速整体图操作至关重要。LangGraph 原生支持节点的并行执行，可以显著提高基于图的工作流的性能。这种并行化是通过扇出和扇入机制实现的，利用标准边和</span><span style="border-bottom:1px solid;font-weight:bold">conditional_edges</span><span>。以下是一些示例，展示了如何添加创建适用于您的分支数据流。</span></p>


<a id="section-1021"></a>
## 并行运行图节点

<a id="t-Rj6Vu8woWYs9C1BhAOmUkL"></a>

<p id="t-3RQQJBi2rpV4MdtAT6bZ5g"><span>在这个示例中，我们从 </span><span>Node A</span><span> 扇出到 </span><span>B 和 C</span><span>，然后扇入到 </span><span>D</span><span>。对于我们的状态，</span><span style="border-bottom:1px solid;font-weight:bold">我们指定归约器 add 操作</span><span>。这将组合或累积状态中特定键的值，而不是简单地覆盖现有值。对于列表，这意味着将新列表与现有列表连接起来。有关使用归约器更新状态的更多详细信息，请参见上面关于</span><span style="border-bottom:1px solid;font-weight:bold">状态归约器</span><span>的部分。</span></p>

<pre id="t-6X6C6IoeNMuoH9QLbul4YF"><code>import operator
from typing import Annotated, Any
from typing_extensions import TypedDict
from langgraph.graph import StateGraph, START, END

class State(TypedDict):
# The operator.add reducer fn makes this append-only
aggregate: Annotated[list, operator.add]

def a(state: State):
print(f'Adding "A" to {state["aggregate"]}')
return {"aggregate": ["A"]}

def b(state: State):
print(f'Adding "B" to {state["aggregate"]}')
return {"aggregate": ["B"]}

def c(state: State):
print(f'Adding "C" to {state["aggregate"]}')
return {"aggregate": ["C"]}

def d(state: State):
print(f'Adding "D" to {state["aggregate"]}')
return {"aggregate": ["D"]}

builder = StateGraph(State)
builder.add_node(a)
builder.add_node(b)
builder.add_node(c)
builder.add_node(d)
builder.add_edge(START, "a")
builder.add_edge("a", "b")
builder.add_edge("a", "c")
builder.add_edge("b", "d")
builder.add_edge("c", "d")
builder.add_edge("d", END)
graph = builder.compile()</code></pre>

<pre id="t-9yQmdjVQgEhR2GQkclfb2n"><code>from IPython.display import Image, display

display(Image(graph.get_graph().draw_mermaid_png()))</code></pre>

<div id="t-MQZ2atWSce6aRDqehXuiXz"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/7d7530aeb9a6facbbbaafc5c.png"/></div>

<p id="t-r5d1PoukaCvKgWkgKP2X6s"><span>使用归约器，您可以看到每个节点中添加的值都被累积了。</span></p>

<pre id="t-cm60C8at4MW2ZOAteHCNbc"><code>graph.invoke({"aggregate": []}, {"configurable": {"thread_id": "foo"}})</code></pre>

<pre id="t-YATJwBRX2Bmcxi7yhz17wW"><code>Adding "A" to []
Adding "B" to ['A']
Adding "C" to ['A']
Adding "D" to ['A', 'B', 'C']</code></pre>

<p id="t-HfuYlkavPazhfaY7fy8ani"><span>在上面的示例中，节点 </span><span>"b"</span><span> 和 </span><span>"c"</span><span> 在同一个</span><span style="border-bottom:1px solid;font-weight:bold">超步</span><span>中并发执行。因为它们在同一个步骤中，节点 </span><span>"d"</span><span> 在 </span><span>"b"</span><span> 和 </span><span>"c"</span><span> 都完成后执行。</span></p>

<p id="t-1g8T7wDcaFg4c8X24OKFih"><span>重要的是，来自并行超步的更新可能不会保持一致的顺序。如果您需要并行超步的更新具有一致的、预定的顺序，您应该将输出写入状态中的一个单独字段，并附带一个用于排序的值。</span></p>

<p id="t-WdanUonV57UTPXfbzR3exP"><span>LangGraph 在</span><span style="border-bottom:1px solid;font-weight:bold">超步</span><span>内执行节点，这意味着虽然并行分支是并行执行的，但整个超步是</span><span style="font-weight:bold">事务性的</span><span>。如果这些分支中的任何一个引发异常，</span><span style="font-weight:bold">所有</span><span>更新都不会应用到状态（整个超步出错）。</span></p>

<p id="t-B49InclhakUyWCHfLqIWTE"><span>重要的是，当使用</span><span style="border-bottom:1px solid;font-weight:bold">检查点保存器</span><span>时，超步内成功节点的结果会被保存，并且在恢复时不会重复。</span></p>

<p id="t-y1phWgOBaIHtzErJVFMn56"><span>如果您有容易出错的节点（可能希望处理不稳定的 API 调用），LangGraph 提供了两种方法来解决这个问题：</span></p>

<ol start="1"><li id="t-TFjyKdJzlFlaQQTYFiqhXh"><span>您可以在节点内编写常规的 python 代码来捕获和处理异常。</span></li></ol>

<ol start="2"><li id="t-2BL3hNFFhpFRmcjTA6tVWD"><span>您可以设置一个 </span><span style="border-bottom:1px solid;font-weight:bold">retry_policy</span><span> 来指示图重试引发某些类型异常的节点。只有失败的分支会被重试，因此您无需担心执行冗余工作。</span></li></ol>

<p id="t-2MdkXsqRfaNkMIDcVNDAyZ"><span>总之，这些让您可以执行并行执行并完全控制异常处理。</span></p>

<p id="t-rp3F2l8O2WNa87sUfg9qTE"><span style="font-weight:bold">设置最大并发数</span><span> 您可以通过在调用图时在</span><span style="border-bottom:1px solid;font-weight:bold">配置</span><span>中设置 </span><span>max_concurrency</span><span> 来控制最大并发任务数。</span></p>

<pre id="t-rEL3cFtx92wYD1EJ251Ki2"><code>graph.invoke({"value_1": "c"}, {"configurable": {"max_concurrency": 10}})</code></pre>


<a id="section-1022"></a>
## 延迟节点执行

<a id="t-rmlo9F5BHfoSaMs4l2gNWB"></a>

<p id="t-8uKwU2zZLPw5lNLN3TJgVm"><span>当您希望延迟节点的执行直到所有其他挂起的任务完成时，延迟节点执行非常有用。这在分支具有不同长度的工作流（如 map-reduce 流）中尤其常见。</span></p>

<p id="t-Acm9b0fXly0g0Pn4TWQPSm"><span>上面的示例展示了当每个路径只有一个步骤时如何进行扇出和扇入。但是如果一个分支有多个步骤呢？让我们在</span><span>"b"</span><span>分支中添加一个节点</span><span>"b_2"</span><span>：</span></p>

<pre id="t-NG0IUucfGTwMYNl4wQIx4y"><code>import operator
from typing import Annotated, Any
from typing_extensions import TypedDict
from langgraph.graph import StateGraph, START, END

class State(TypedDict):
# The operator.add reducer fn makes this append-only
aggregate: Annotated[list, operator.add]

def a(state: State):
print(f'Adding "A" to {state["aggregate"]}')
return {"aggregate": ["A"]}

def b(state: State):
print(f'Adding "B" to {state["aggregate"]}')
return {"aggregate": ["B"]}

def b_2(state: State):
print(f'Adding "B_2" to {state["aggregate"]}')
return {"aggregate": ["B_2"]}

def c(state: State):
print(f'Adding "C" to {state["aggregate"]}')
return {"aggregate": ["C"]}

def d(state: State):
print(f'Adding "D" to {state["aggregate"]}')
return {"aggregate": ["D"]}

builder = StateGraph(State)
builder.add_node(a)
builder.add_node(b)
builder.add_node(b_2)
builder.add_node(c)
builder.add_node(d, defer=True)
builder.add_edge(START, "a")
builder.add_edge("a", "b")
builder.add_edge("a", "c")
builder.add_edge("b", "b_2")
builder.add_edge("b_2", "d")
builder.add_edge("c", "d")
builder.add_edge("d", END)
graph = builder.compile()</code></pre>

<pre id="t-9VVuOK3WJTA35oD3oJNy38"><code>from IPython.display import Image, display

display(Image(graph.get_graph().draw_mermaid_png()))</code></pre>

<div id="t-McdIT2XMGimFvL9nwa7qJu"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/8796707e2c79038069378f49.png"/></div>

<pre id="t-qEVal0It74micVKv3c8pOf"><code>graph.invoke({"aggregate": []})</code></pre>

<pre id="t-rk1rPTWSk715zn0jTfXZh7"><code>Adding "A" to []
Adding "B" to ['A']
Adding "C" to ['A']
Adding "B_2" to ['A', 'B', 'C']
Adding "D" to ['A', 'B', 'C', 'B_2']</code></pre>

<p id="t-TOm7IM56s0WceGLuWf2Pg1"><span>在上面的示例中，节点</span><span>"b"</span><span>和</span><span>"c"</span><span>在同一个超步中并发执行。我们在节点</span><span>d</span><span>上设置</span><span>defer=True</span><span>，因此它不会执行，直到所有挂起的任务完成。在这种情况下，这意味着</span><span>"d"</span><span>等待执行，直到整个</span><span>"b"</span><span>分支完成。</span></p>


<a id="section-1023"></a>
## 条件分支

<a id="t-8wQtFrhEZHnpS6kp0ra4kZ"></a>

<p id="t-xXRTKKUYMoZjFsqEjO4EZH"><span>如果您的扇出应在运行时根据状态而变化，您可以使用</span><span style="border-bottom:1px solid;font-weight:bold">add_conditional_edges</span><span>来选择一条或多条路径。请参见下面的示例，其中节点</span><span>a</span><span>生成一个状态更新，该更新决定了下一个节点。</span></p>

<pre id="t-JwRpTDBoEuOo3QUNf3qAoo"><code>import operator
from typing import Annotated, Literal, Sequence
from typing_extensions import TypedDict
from langgraph.graph import StateGraph, START, END

class State(TypedDict):
aggregate: Annotated[list, operator.add]
# Add a key to the state. We will set this key to determine
# how we branch.
which: str

def a(state: State):
print(f'Adding "A" to {state["aggregate"]}')
return {"aggregate": ["A"], "which": "c"}

def b(state: State):
print(f'Adding "B" to {state["aggregate"]}')
return {"aggregate": ["B"]}

def c(state: State):
print(f'Adding "C" to {state["aggregate"]}')
return {"aggregate": ["C"]}

builder = StateGraph(State)
builder.add_node(a)
builder.add_node(b)
builder.add_node(c)
builder.add_edge(START, "a")
builder.add_edge("b", END)
builder.add_edge("c", END)

def conditional_edge(state: State) -&gt; Literal["b", "c"]:
# Fill in arbitrary logic here that uses the state
# to determine the next node
return state["which"]

builder.add_conditional_edges("a", conditional_edge)

graph = builder.compile()</code></pre>

<pre id="t-qcEoK8iogQVSUvhmxa4cBb"><code>from IPython.display import Image, display

display(Image(graph.get_graph().draw_mermaid_png()))</code></pre>

<div id="t-DvGNHQZMNO1o9IG7NC6tfc"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/ab4e51e0672d73ea37e16f5f.png"/></div>

<pre id="t-NfYhWmw3DRAzwkB0am9tN3"><code>result = graph.invoke({"aggregate": []})
print(result)</code></pre>

<pre id="t-9AoEHIxomXMKOpCcpygvww"><code>Adding "A" to []
Adding "C" to ['A']
{'aggregate': ['A', 'C'], 'which': 'c'}</code></pre>

<p id="t-vRJMboVkmip83aJDL31lMb"><span>您的条件边可以路由到多个目标节点。例如：</span></p>

<pre id="t-ImV7U3bLA1wPLeysOY25PN"><code>def route_bc_or_cd(state: State) -&gt; Sequence[str]:
if state["which"] == "cd":
return ["c", "d"]
return ["b", "c"]</code></pre>


<a id="section-1024"></a>
## Map-Reduce 和 Send API

<a id="t-6AJlM3q6h3CqQ4EltYX7Qy"></a>

<p id="t-P8LX4qL87aA1izxjMltfju"><span>LangGraph 使用 Send API 支持 map-reduce 和其他高级分支模式。以下是如何使用它的示例：</span></p>

<pre id="t-AK4mg1HFohHzfK6fi9hbSB"><code>from langgraph.graph import StateGraph, START, END
from langgraph.types import Send
from typing_extensions import TypedDict, Annotated
import operator

class OverallState(TypedDict):
topic: str
subjects: list[str]
jokes: Annotated[list[str], operator.add]
best_selected_joke: str

def generate_topics(state: OverallState):
return {"subjects": ["lions", "elephants", "penguins"]}

def generate_joke(state: OverallState):
joke_map = {
"lions": "Why don't lions like fast food? Because they can't catch it!",
"elephants": "Why don't elephants use computers? They're afraid of the mouse!",
"penguins": "Why don't penguins like talking to strangers at parties? Because they find it hard to break the ice."
}
return {"jokes": [joke_map[state["subject"]]]}

def continue_to_jokes(state: OverallState):
return [Send("generate_joke", {"subject": s}) for s in state["subjects"]]

def best_joke(state: OverallState):
return {"best_selected_joke": "penguins"}

builder = StateGraph(OverallState)
builder.add_node("generate_topics", generate_topics)
builder.add_node("generate_joke", generate_joke)
builder.add_node("best_joke", best_joke)
builder.add_edge(START, "generate_topics")
builder.add_conditional_edges("generate_topics", continue_to_jokes, ["generate_joke"])
builder.add_edge("generate_joke", "best_joke")
builder.add_edge("best_joke", END)
graph = builder.compile()</code></pre>

<pre id="t-PvwHJnW4MlP9eKN1rUvlky"><code>from IPython.display import Image, display

display(Image(graph.get_graph().draw_mermaid_png()))</code></pre>

<div id="t-yBU6OwxoOYCSHehnKrNZz2"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/19ef489cf869732555bcb888.png"/></div>

<pre id="t-onOwdxc9IcRxb3OKpsnLEq"><code># Call the graph: here we call it to generate a list of jokes
for step in graph.stream({"topic": "animals"}):
print(step)</code></pre>

<pre id="t-hdjYX37g2JoXTGNBY27ATG"><code>{'generate_topics': {'subjects': ['lions', 'elephants', 'penguins']}}
{'generate_joke': {'jokes': ["Why don't lions like fast food? Because they can't catch it!"]}}
{'generate_joke': {'jokes': ["Why don't elephants use computers? They're afraid of the mouse!"]}}
{'generate_joke': {'jokes': ['Why don't penguins like talking to strangers at parties? Because they find it hard to break the ice.']}}
{'best_joke': {'best_selected_joke': 'penguins'}}</code></pre>


<a id="section-1025"></a>
## 创建和控制循环

<a id="t-hzR6MQfvQWXj7bSqduwXrP"></a>

<p id="t-BzJiUyeAJqwQCWBvU8xJHZ"><span>当创建带有循环的图时，我们需要一种终止执行的机制。这通常通过添加一个</span><span style="border-bottom:1px solid;font-weight:bold">条件边</span><span>来实现，该边在达到某个终止条件时路由到 </span><span style="border-bottom:1px solid;font-weight:bold">END</span><span> 节点。</span></p>

<p id="t-aBWsXxhzoqs3t2BvX8NUeA"><span>您还可以在调用或流式传输图时设置图递归限制。递归限制设置了图在执行引发错误之前允许执行的</span><span style="border-bottom:1px solid;font-weight:bold">超步</span><span>数。</span></p>

<p id="t-57DRtry2VpeXzkprjH1RSn"><span>让我们考虑一个带有循环的简单图，以更好地理解这些机制的工作原理。</span></p>

<p id="t-OwlLz0uSBUH8YVvbdJQInm"><span>要返回状态的最后一个值而不是收到递归限制错误，请参见</span><span style="border-bottom:1px solid;font-weight:bold">下一节</span><span>。</span></p>

<p id="t-Z6xRYPDTcXuwS2RROjP7sS"><span>创建循环时，可以包含一个指定终止条件的条件边：</span></p>

<pre id="t-XV2JnrecrjGXvKhmWM66uu"><code>builder = StateGraph(State)
builder.add_node(a)
builder.add_node(b)

def route(state: State) -&gt; Literal["b", END]:
if termination_condition(state):
return END
else:
return "b"

builder.add_edge(START, "a")
builder.add_conditional_edges("a", route)
builder.add_edge("b", "a")
graph = builder.compile()</code></pre>

<p id="t-xGAhxRApDFG7zDAlzACN3Q"><span>要控制递归限制，请在配置中指定</span><span>"recursionLimit"</span><span>。这将引发一个</span><span>GraphRecursionError</span><span>，您可以捕获并处理它：</span></p>

<pre id="t-B47gpe4FTpCXnfUlsB9H6E"><code>from langgraph.errors import GraphRecursionError

try:
graph.invoke(inputs, {"recursion_limit": 3})
except GraphRecursionError:
print("Recursion Error")</code></pre>

<p id="t-zM9ZyVZTxIUK2rE30RfDrG"><span>让我们定义一个带有简单循环的图。注意，我们使用条件边来实现终止条件。</span></p>

<pre id="t-VpekBJhjdQa1SzQUbiMsII"><code>import operator
from typing import Annotated, Literal
from typing_extensions import TypedDict
from langgraph.graph import StateGraph, START, END

class State(TypedDict):
# The operator.add reducer fn makes this append-only
aggregate: Annotated[list, operator.add]

def a(state: State):
print(f'Node A sees {state["aggregate"]}')
return {"aggregate": ["A"]}

def b(state: State):
print(f'Node B sees {state["aggregate"]}')
return {"aggregate": ["B"]}

# Define nodes
builder = StateGraph(State)
builder.add_node(a)
builder.add_node(b)

# Define edges
def route(state: State) -&gt; Literal["b", END]:
if len(state["aggregate"]) &lt; 7:
return "b"
else:
return END

builder.add_edge(START, "a")
builder.add_conditional_edges("a", route)
builder.add_edge("b", "a")
graph = builder.compile()</code></pre>

<pre id="t-BZwvUnoN7l3U0O7eQ0MQ08"><code>from IPython.display import Image, display

display(Image(graph.get_graph().draw_mermaid_png()))</code></pre>

<div id="t-bcvTeeDCUgltKhBtpxA1sC"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/f1432dbfbc50dbf4eede1144.png"/></div>

<p id="t-xCKpVjS0lq2aewQuYd2GKp"><span>这种架构类似于 </span><span style="border-bottom:1px solid;font-weight:bold">ReAct 智能体</span><span>，其中节点 </span><span>"a"</span><span> 是一个工具调用模型，节点 </span><span>"b"</span><span> 代表工具。</span></p>

<p id="t-gzXBviZuEJsEJOBkv7A362"><span>在我们的</span><span>route</span><span>条件边中，我们指定当状态中的</span><span>"aggregate"</span><span>列表长度超过阈值后应该结束。</span></p>

<p id="t-h50o7N0txsyRmCOnM3iGGt"><span>调用该图，我们看到在达到终止条件之前，我们在节点</span><span>"a"</span><span>和</span><span>"b"</span><span>之间交替执行。</span></p>

<pre id="t-q2zdOc0zDr8xxUemIg2Y35"><code>graph.invoke({"aggregate": []})</code></pre>

<pre id="t-b3UsHIlepYwkOT52qumKXK"><code>Node A sees []
Node B sees ['A']
Node A sees ['A', 'B']
Node B sees ['A', 'B', 'A']
Node A sees ['A', 'B', 'A', 'B']
Node B sees ['A', 'B', 'A', 'B', 'A']
Node A sees ['A', 'B', 'A', 'B', 'A', 'B']</code></pre>


<a id="section-1026"></a>
## 强制递归限制

<a id="t-MEjXbOny49vHNeiFH9lMir"></a>

<p id="t-tgBBMdq3tU0OVE46eOnQLR"><span>在某些应用中，我们可能无法保证会达到给定的终止条件。在这些情况下，我们可以设置图的 </span><span style="border-bottom:1px solid;font-weight:bold">递归限制</span><span>。这将在给定数量的 </span><span style="border-bottom:1px solid;font-weight:bold">超步</span><span> 后引发 </span><span>GraphRecursionError</span><span>。然后我们可以捕获并处理这个异常：</span></p>

<pre id="t-9D1fYCVzedeN59Xhl90N9R"><code>from langgraph.errors import GraphRecursionError

try:
graph.invoke({"aggregate": []}, {"recursion_limit": 4})
except GraphRecursionError:
print("Recursion Error")</code></pre>

<pre id="t-lFyCzmExkvaTW44xymffx3"><code>Node A sees []
Node B sees ['A']
Node C sees ['A', 'B']
Node D sees ['A', 'B']
Node A sees ['A', 'B', 'C', 'D']
Recursion Error</code></pre>

<p id="t-hGFHzpMY6saSGY4iWIqlHd"><span>除了引发</span><span>GraphRecursionError</span><span>，我们还可以在状态中引入一个新键来跟踪达到递归限制前剩余的步数。然后我们可以使用这个键来决定是否应该结束运行。</span></p>

<p id="t-nKgpuw3QbATkjKzwl0GbmJ"><span>LangGraph 实现了一个特殊的</span><span>RemainingSteps</span><span>注解。在底层，它创建了一个</span><span>ManagedValue</span><span>通道——一个仅在我们的图运行期间存在且之后不再存在的状态通道。</span></p>

<pre id="t-Yk9lKRxJvdc7kmfl1itPRa"><code>import operator
from typing import Annotated, Literal
from typing_extensions import TypedDict
from langgraph.graph import StateGraph, START, END
from langgraph.managed.is_last_step import RemainingSteps

class State(TypedDict):
aggregate: Annotated[list, operator.add]
remaining_steps: RemainingSteps

def a(state: State):
print(f'Node A sees {state["aggregate"]}')
return {"aggregate": ["A"]}

def b(state: State):
print(f'Node B sees {state["aggregate"]}')
return {"aggregate": ["B"]}

# Define nodes
builder = StateGraph(State)
builder.add_node(a)
builder.add_node(b)

# Define edges
def route(state: State) -&gt; Literal["b", END]:
if state["remaining_steps"] &lt;= 2:
return END
else:
return "b"

builder.add_edge(START, "a")
builder.add_conditional_edges("a", route)
builder.add_edge("b", "a")
graph = builder.compile()

# Test it out
result = graph.invoke({"aggregate": []}, {"recursion_limit": 4})
print(result)</code></pre>

<pre id="t-jAkDye2zLXYxHxv6OVEWmm"><code>Node A sees []
Node B sees ['A']
Node A sees ['A', 'B']
{'aggregate': ['A', 'B', 'A']}</code></pre>

<p id="t-0CUshOfhor1yWLF6ph0n2v"><span>为了更好地理解递归限制的工作原理，让我们考虑一个更复杂的例子。下面我们实现一个循环，但其中一步会分支到两个节点：</span></p>

<pre id="t-r7Dp9TPZNpGINsv8yyFip9"><code>import operator
from typing import Annotated, Literal
from typing_extensions import TypedDict
from langgraph.graph import StateGraph, START, END

class State(TypedDict):
aggregate: Annotated[list, operator.add]

def a(state: State):
print(f'Node A sees {state["aggregate"]}')
return {"aggregate": ["A"]}

def b(state: State):
print(f'Node B sees {state["aggregate"]}')
return {"aggregate": ["B"]}

def c(state: State):
print(f'Node C sees {state["aggregate"]}')
return {"aggregate": ["C"]}

def d(state: State):
print(f'Node D sees {state["aggregate"]}')
return {"aggregate": ["D"]}

# Define nodes
builder = StateGraph(State)
builder.add_node(a)
builder.add_node(b)
builder.add_node(c)
builder.add_node(d)

# Define edges
def route(state: State) -&gt; Literal["b", END]:
if len(state["aggregate"]) &lt; 7:
return "b"
else:
return END

builder.add_edge(START, "a")
builder.add_conditional_edges("a", route)
builder.add_edge("b", "c")
builder.add_edge("b", "d")
builder.add_edge(["c", "d"], "a")
graph = builder.compile()</code></pre>

<pre id="t-FwJBN9AClLLgUf2r2yalMJ"><code>from IPython.display import Image, display

display(Image(graph.get_graph().draw_mermaid_png()))</code></pre>

<div id="t-slpuBaHye9SCwwYOB4xK2K"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/75c9e48dd3859b8df00ca549.png"/></div>

<p id="t-MUpQGJwt0EyOPFAXSYirR4"><span>这个图看起来很复杂，但可以概念化为 </span><span style="border-bottom:1px solid;font-weight:bold">超步</span><span> 的循环：</span></p>

<ol start="1"><li id="t-iTTwaWAsx9M5IBCpvTpViQ"><span>节点 A</span></li></ol>

<ol start="2"><li id="t-NIdYNgjwWnsi4OPmi5E4f1"><span>节点 B</span></li></ol>

<ol start="3"><li id="t-aXgycjAB01LuWHcr3pyewL"><span>节点 C 和 D</span></li></ol>

<ol start="4"><li id="t-gycTepF6SzSViNQvifRdvf"><span>节点 A</span></li></ol>

<ol start="5"><li id="t-lZHD4n7smPHmmxRp8JFVX3"><span>...</span></li></ol>

<p id="t-j0rA63gAXDdx7KUCRosDFz"><span>我们有一个由四个超步组成的循环，其中节点 C 和 D 并发执行。</span></p>

<p id="t-o4AmHGyGjUFdf5e9vAYHnm"><span>像之前一样调用该图，我们看到在达到终止条件之前完成了两个完整的“圈”：</span></p>

<pre id="t-4xYhoR7dysSuChxjEnAbWm"><code>result = graph.invoke({"aggregate": []})</code></pre>

<pre id="t-bZowJZBSoMpcKMu6RFN79o"><code>Node A sees []
Node B sees ['A']
Node D sees ['A', 'B']
Node C sees ['A', 'B']
Node A sees ['A', 'B', 'C', 'D']
Node B sees ['A', 'B', 'C', 'D', 'A']
Node D sees ['A', 'B', 'C', 'D', 'A', 'B']
Node C sees ['A', 'B', 'C', 'D', 'A', 'B']
Node A sees ['A', 'B', 'C', 'D', 'A', 'B', 'C', 'D']</code></pre>

<p id="t-BQ8WsNGB7NRQZAqj8JaVUO"><span>但是，如果我们将递归限制设置为四，我们只完成一圈，因为每一圈是四个超步：</span></p>

<pre id="t-Ncovv9zdudwKWOOwKGRtyK"><code>from langgraph.errors import GraphRecursionError

try:
result = graph.invoke({"aggregate": []}, {"recursion_limit": 4})
except GraphRecursionError:
print("Recursion Error")</code></pre>

<pre id="t-M7C2CiI2nBpEgr1kFgi1CC"><code>Node A sees []
Node B sees ['A']
Node C sees ['A', 'B']
Node D sees ['A', 'B']
Node A sees ['A', 'B', 'C', 'D']
Recursion Error</code></pre>


<a id="section-1027"></a>
## 异步

<a id="t-ZZ0KNC8ZhaD9EKZ0QnnWCh"></a>

<p id="t-CfN5oU9EgmuFqx3P1zlbwb"><span>在并发运行 </span><span style="border-bottom:1px solid;font-weight:bold">IO 密集型</span><span> 代码时（例如，向聊天模型提供商并发发出 API 请求），使用异步编程范式可以显著提高性能。</span></p>

<p id="t-3oXsRjBHCnAeMo9lo4rMiG"><span>要将图的</span><span>sync</span><span>实现转换为</span><span>async</span><span>实现，您需要：</span></p>

<ol start="1"><li id="t-wLI4qqDCf8JAZjCqAFiQpu"><span>将</span><span>nodes</span><span>更新为使用</span><span>async def</span><span>而不是</span><span>def</span><span>。</span></li></ol>

<ol start="2"><li id="t-1f6R08en1A3OVxDfH4BKSw"><span>适当更新内部代码以使用</span><span>await</span><span>。</span></li></ol>

<ol start="3"><li id="t-bBtGrV8CjExKGVsfJfoxJA"><span>根据需要调用图的</span><span>.ainvoke</span><span>或</span><span>.astream</span><span>。</span></li></ol>

<p id="t-SJqdfESQ68GXeQiHGrZiS3"><span>因为许多 LangChain 对象实现了 </span><span style="border-bottom:1px solid;font-weight:bold">Runnable 协议</span><span>，该协议具有所有 </span><span>sync</span><span> 方法的 </span><span>async</span><span> 变体，所以将 </span><span>sync</span><span> 图升级为 </span><span>async</span><span> 图通常相当快。</span></p>

<p id="t-9axl1dvOvYUxoSEerzpxh8"><span>请参见下面的示例。为了演示底层 LLM 的异步调用，我们将包含一个聊天模型：</span></p>

<p id="t-Jl1IQBDI2tIwNoNbMYeXFy"><span style="border-bottom:1px solid;font-weight:bold">OpenAI</span></p>

<pre id="t-F18TMZn5NAO87jWllL451o"><code>pip install -U "langchain[openai]"</code></pre>

<pre id="t-yPbhsJWuGw7D38os2glx7W"><code>import os
from langchain.chat_models import init_chat_model

os.environ["OPENAI_API_KEY"] = "sk-..."

model = init_chat_model("gpt-4.1")</code></pre>

<pre id="t-oe8KzwMDIp0MDrJ3w7Jxqj"><code>from langchain.chat_models import init_chat_model
from langgraph.graph import MessagesState, StateGraph

async def node(state: MessagesState):
new_message = await llm.ainvoke(state["messages"])
return {"messages": [new_message]}

builder = StateGraph(MessagesState).add_node(node).set_entry_point("node")
graph = builder.compile()

input_message = {"role": "user", "content": "Hello"}
result = await graph.ainvoke({"messages": [input_message]})</code></pre>


<a id="section-1028"></a>
## 使用 Command 结合控制流和状态更新

<a id="t-rTTR5Y1XHC4lgBYniQu6gu"></a>

<p id="t-hVElLSAvJxzllETYpgZaxd"><span>将控制流（边）和状态更新（节点）结合起来可能很有用。例如，您可能希望在同一个节点中既执行状态更新又决定下一步去哪个节点。LangGraph 提供了一种方法，通过从节点函数返回 </span><span style="border-bottom:1px solid;font-weight:bold">Command</span><span> 对象来实现：</span></p>

<pre id="t-0o6w2Fs8uyaLHurWqk9ILD"><code>def my_node(state: State) -&gt; Command[Literal["my_other_node"]]:
return Command(
# state update
update={"foo": "bar"},
# control flow
goto="my_other_node"
)</code></pre>

<p id="t-uayjYSBc6lz8pG3yWcIM9m"><span>我们在下面展示一个端到端的示例。让我们创建一个包含 3 个节点的简单图：A、B 和 C。我们将首先执行节点 A，然后根据节点 A 的输出决定下一步是去节点 B 还是节点 C。</span></p>

<pre id="t-yt7CLHPayZt0JKnevqsQaV"><code>import random
from typing_extensions import TypedDict, Literal
from langgraph.graph import StateGraph, START
from langgraph.types import Command

# Define graph state
class State(TypedDict):
foo: str

# Define the nodes

def node_a(state: State) -&gt; Command[Literal["node_b", "node_c"]]:
print("Called A")
value = random.choice(["b", "c"])
# this is a replacement for a conditional edge function
if value == "b":
goto = "node_b"
else:
goto = "node_c"

# note how Command allows you to BOTH update the graph state AND route to the next node
return Command(
# this is the state update
update={"foo": value},
# this is a replacement for an edge
goto=goto,
)

def node_b(state: State):
print("Called B")
return {"foo": state["foo"] + "b"}

def node_c(state: State):
print("Called C")
return {"foo": state["foo"] + "c"}</code></pre>

<p id="t-se7wbGWUUYaIEYZVwFbPwA"><span>现在我们可以用上面的节点创建 </span><span style="border-bottom:1px solid;font-weight:bold">StateGraph</span><span>。注意，该图没有用于路由的 </span><span style="border-bottom:1px solid;font-weight:bold">条件边</span><span>！这是因为控制流是在 </span><span>node_a</span><span> 内部用 </span><span style="border-bottom:1px solid;font-weight:bold">Command</span><span> 定义的。</span></p>

<pre id="t-ojTHYuedG9yyZQghw6eT0V"><code>builder = StateGraph(State)
builder.add_edge(START, "node_a")
builder.add_node(node_a)
builder.add_node(node_b)
builder.add_node(node_c)
# NOTE: there are no edges between nodes A, B and C!

graph = builder.compile()</code></pre>

<p id="t-IGhOcCSwp3HSVILjPAO9WY"><span>您可能已经注意到我们使用了</span><span style="border-bottom:1px solid;font-weight:bold">Command</span><span>作为返回类型注解，例如</span><span>Command[Literal["node_b", "node_c"]]</span><span>。这对于图渲染是必要的，并告诉 LangGraph</span><span>node_a</span><span>可以导航到</span><span>node_b</span><span>和</span><span>node_c</span><span>。</span></p>

<pre id="t-bVb4kaDsJI4RInmjcnxMNo"><code>from IPython.display import display, Image

display(Image(graph.get_graph().draw_mermaid_png()))</code></pre>

<div id="t-67oKPIH8yvIfR1pB0wVL3F"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/bfb8c1c370b8fdf006ab29ea.png"/></div>

<p id="t-SVF92ny5aO32iQMKdcJZsL"><span>如果我们多次运行该图，我们会看到它根据节点 A 中的随机选择采取不同的路径（A -&gt; B 或 A -&gt; C）。</span></p>

<pre id="t-bc5Kxk0fEmBuoO4jKyTgVN"><code>graph.invoke({"foo": ""})</code></pre>

<pre id="t-nQh3CMzvcr7qGGLyaDhaM3"><code>Called A
Called C</code></pre>


<a id="section-1029"></a>
## 导航到父图中的节点

<a id="t-TswMaY9ro0KyQnEfA6XxT9"></a>

<p id="t-Gu0a3YQadH2bHJGdd7kloW"><span>如果您正在使用 </span><span style="border-bottom:1px solid;font-weight:bold">子图</span><span>，您可能希望从子图内的节点导航到不同的子图（即父图中的不同节点）。为此，您可以在 </span><span>Command</span><span> 中指定 </span><span>graph=Command.PARENT</span><span>：</span></p>

<pre id="t-6PIOjQHTeXYJ04qncbbAjF"><code>def my_node(state: State) -&gt; Command[Literal["my_other_node"]]:
return Command(
update={"foo": "bar"},
goto="other_subgraph", # where `other_subgraph` is a node in the parent graph
graph=Command.PARENT
)</code></pre>

<p id="t-7QCuhmI4R8kxm3SFCLPx34"><span>让我们使用上面的示例来演示这一点。我们将把上面示例中的</span><span>nodeA</span><span>更改为一个单节点图，然后将其作为子图添加到我们的父图中。</span></p>

<p id="t-xOJqCoOCFIk7HUDyZ0El8v"><span style="font-weight:bold">使用 </span><span style="font-weight:bold">Command.PARENT</span><span style="font-weight:bold"> 进行状态更新</span><span> 当您从子图节点向父图节点发送更新，且该键由父图和子图的 </span><span style="border-bottom:1px solid;font-weight:bold">状态模式</span><span> 共享时，您</span><span style="font-weight:bold">必须</span><span>在父图状态中为您正在更新的键定义一个 </span><span style="border-bottom:1px solid;font-weight:bold">归约器</span><span>。请参见下面的示例。</span></p>

<pre id="t-xk3xPheH6hL3XCoov45hE0"><code>import operator
from typing_extensions import Annotated

class State(TypedDict):
# NOTE: we define a reducer here
foo: Annotated[str, operator.add]

def node_a(state: State):
print("Called A")
value = random.choice(["a", "b"])
# this is a replacement for a conditional edge function
if value == "a":
goto = "node_b"
else:
goto = "node_c"

# note how Command allows you to BOTH update the graph state AND route to the next node
return Command(
update={"foo": value},
goto=goto,
# this tells LangGraph to navigate to node_b or node_c in the parent graph
# NOTE: this will navigate to the closest parent graph relative to the subgraph
graph=Command.PARENT,
)

subgraph = StateGraph(State).add_node(node_a).add_edge(START, "node_a").compile()

def node_b(state: State):
print("Called B")
# NOTE: since we've defined a reducer, we don't need to manually append
# new characters to existing 'foo' value. instead, reducer will append these
# automatically (via operator.add)
return {"foo": "b"}

def node_c(state: State):
print("Called C")
return {"foo": "c"}

builder = StateGraph(State)
builder.add_edge(START, "subgraph")
builder.add_node("subgraph", subgraph)
builder.add_node(node_b)
builder.add_node(node_c)

graph = builder.compile()</code></pre>

<pre id="t-LihpKmAJJspf1xBpw6KEIz"><code>graph.invoke({"foo": ""})</code></pre>

<pre id="t-S6MeEtwCxrxCZuDECljSeX"><code>Called A
Called C</code></pre>


<a id="section-1030"></a>
## 在工具内部使用

<a id="t-so0MKA9AjjZBotazWgU9BT"></a>

<p id="t-mcarsV3YM8YvHNKE41xCh4"><span>一个常见的用例是从工具内部更新图状态。例如，在客户支持应用程序中，您可能希望在对话开始时根据客户的账号或 ID 查找客户信息。要从工具更新图状态，您可以从工具返回</span><span>Command(update={"my_custom_key": "foo", "messages": [...]})</span><span>：</span></p>

<pre id="t-TCsYCJq3j2MI4LQDbEt1rN"><code>@tool
def lookup_user_info(tool_call_id: Annotated[str, InjectedToolCallId], config: RunnableConfig):
"""Use this to look up user information to better assist them with their questions."""
user_info = get_user_info(config.get("configurable", {}).get("user_id"))
return Command(
update={
# update the state keys
"user_info": user_info,
# update the message history
"messages": [ToolMessage("Successfully looked up user information", tool_call_id=tool_call_id)]
}
)</code></pre>

<p id="t-dZ9maN4ySjzUePzefssONJ"><span>当从工具返回</span><span style="border-bottom:1px solid;font-weight:bold">Command</span><span>时，您</span><span style="font-weight:bold">必须</span><span>在</span><span>Command.update</span><span>中包含</span><span>messages</span><span>（或用于消息历史的任何状态键），并且</span><span>messages</span><span>中的消息列表</span><span style="font-weight:bold">必须</span><span>包含一个</span><span>ToolMessage</span><span>。这对于生成的消息历史有效是必要的（LLM 提供商要求带有工具调用的 AI 消息后面必须跟着工具结果消息）。</span></p>

<p id="t-pEQOArCAssGDQK6oC8YN6h"><span>如果您正在使用通过</span><span style="border-bottom:1px solid;font-weight:bold">Command</span><span>更新状态的工具，我们建议使用预构建的</span><span style="border-bottom:1px solid;font-weight:bold">ToolNode</span><span>，它会自动处理返回</span><span style="border-bottom:1px solid;font-weight:bold">Command</span><span>对象的工具，并将其传播到图状态。如果您正在编写调用工具的自定义节点，则需要手动将工具返回的</span><span style="border-bottom:1px solid;font-weight:bold">Command</span><span>对象作为节点的更新进行传播。</span></p>


<a id="section-1031"></a>
## 可视化您的图

<a id="t-O5cq3eUwii4vkWXCxzwsLl"></a>

<p id="t-xlQ4T75yhQGYLQK5spfUyN"><span>这里我们演示如何可视化您创建的图。</span></p>

<p id="t-j3f6Cvg5Iq7jtq3zwDAxoJ"><span>您可以可视化任何任意的 </span><span style="border-bottom:1px solid;font-weight:bold">Graph</span><span>，包括 </span><span style="border-bottom:1px solid;font-weight:bold">StateGraph</span><span>。</span></p>

<p id="t-esOmTQhE88nhbug2r5kbHi"><span>让我们通过绘制分形图来玩点有趣的 😃。</span></p>

<pre id="t-tzKpDidP7BWQn71FqJpGlj"><code>import random
from typing import Annotated, Literal
from typing_extensions import TypedDict
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages

class State(TypedDict):
messages: Annotated[list, add_messages]

class MyNode:
def __init__(self, name: str):
self.name = name
def __call__(self, state: State):
return {"messages": [("assistant", f"Called node {self.name}")]}

def route(state) -&gt; Literal["entry_node", END]:
if len(state["messages"]) &gt; 10:
return END
return "entry_node"

def add_fractal_nodes(builder, current_node, level, max_level):
if level &gt; max_level:
return
# Number of nodes to create at this level
num_nodes = random.randint(1, 3) # Adjust randomness as needed
for i in range(num_nodes):
nm = ["A", "B", "C"][i]
node_name = f"node_{current_node}_{nm}"
builder.add_node(node_name, MyNode(node_name))
builder.add_edge(current_node, node_name)
# Recursively add more nodes
r = random.random()
if r &gt; 0.2 and level + 1 &lt; max_level:
add_fractal_nodes(builder, node_name, level + 1, max_level)
elif r &gt; 0.05:
builder.add_conditional_edges(node_name, route, node_name)
else:
# End
builder.add_edge(node_name, END)

def build_fractal_graph(max_level: int):
builder = StateGraph(State)
entry_point = "entry_node"
builder.add_node(entry_point, MyNode(entry_point))
builder.add_edge(START, entry_point)
add_fractal_nodes(builder, entry_point, 1, max_level)
# Optional: set a finish point if required
builder.add_edge(entry_point, END) # or any specific node
return builder.compile()

app = build_fractal_graph(3)</code></pre>


<a id="section-1032"></a>
## Mermaid

<a id="t-HbIulxNHI6IKl5mPeuabGd"></a>

<p id="t-ydItrhtJ7VLwGqI2xpHHJl"><span>我们还可以将图类转换为 Mermaid 语法。</span></p>

<pre id="t-GyGbTFBdfTJabEj86kWk33"><code>print(app.get_graph().draw_mermaid())</code></pre>

<pre id="t-8hb9wrNFF8IvCwTkaL5zZH"><code>%%{init: {'flowchart': {'curve': 'linear'}}}%%
graph TD;
tart__([&lt;p&gt;__start__&lt;/p&gt;]):::first
ry_node(entry_node)
e_entry_node_A(node_entry_node_A)
e_entry_node_B(node_entry_node_B)
e_node_entry_node_B_A(node_node_entry_node_B_A)
e_node_entry_node_B_B(node_node_entry_node_B_B)
e_node_entry_node_B_C(node_node_entry_node_B_C)
nd__([&lt;p&gt;__end__&lt;/p&gt;]):::last
tart__ --&gt; entry_node;
ry_node --&gt; __end__;
ry_node --&gt; node_entry_node_A;
ry_node --&gt; node_entry_node_B;
e_entry_node_B --&gt; node_node_entry_node_B_A;
e_entry_node_B --&gt; node_node_entry_node_B_B;
e_entry_node_B --&gt; node_node_entry_node_B_C;
e_entry_node_A -.-&gt; entry_node;
e_entry_node_A -.-&gt; __end__;
e_node_entry_node_B_A -.-&gt; entry_node;
e_node_entry_node_B_A -.-&gt; __end__;
e_node_entry_node_B_B -.-&gt; entry_node;
e_node_entry_node_B_B -.-&gt; __end__;
e_node_entry_node_B_C -.-&gt; entry_node;
e_node_entry_node_B_C -.-&gt; __end__;
ssDef default fill:#f2f0ff,line-height:1.2
ssDef first fill-opacity:0
ssDef last fill:#bfb6fc</code></pre>


<a id="section-1033"></a>
## PNG

<a id="t-D8X6bx7g7TsHzy6RGeF9lo"></a>

<p id="t-0t5ip1nbSekX71fGF7BtV5"><span>如果愿意，我们可以将图渲染为</span><span>.png</span><span>。这里我们可以使用三种选项：</span></p>

<ul><li id="t-9xfja8PFGqxoaOxKgTj5Gl"><span>使用 Mermaid.ink API（不需要额外的包）</span></li></ul>

<ul><li id="t-fJHtjT0bWZX4EFI6SxMD9K"><span>使用 Mermaid + Pyppeteer（需要</span><span>pip install pyppeteer</span><span>）</span></li></ul>

<ul><li id="t-DkVhkLMFcOss9DU3isadqw"><span>使用 graphviz（需要</span><span>pip install graphviz</span><span>）</span></li></ul>

<p id="t-C0r7VvwMyFiJqVSFY4Wvfd"><span style="font-weight:bold">使用 Mermaid.Ink</span></p>

<p id="t-50wSWeGhpNLeWhnjn1CWeF"><span>默认情况下，</span><span>draw_mermaid_png()</span><span>使用 Mermaid.Ink 的 API 生成图表。</span></p>

<pre id="t-p63xBCJyBy5fVvpBag7UsN"><code>from IPython.display import Image, display
from langchain_core.runnables.graph import CurveStyle, MermaidDrawMethod, NodeStyles

display(Image(app.get_graph().draw_mermaid_png()))</code></pre>

<div id="t-hUmvnUNRZf3m68IA7KiUfw"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/28d75492ae7eceadad6d99ca.png"/></div>

<p id="t-xlZetzd0ZVAmBxGw96Sp4l"><span style="font-weight:bold">使用 Mermaid + Pyppeteer</span></p>

<pre id="t-OGBRlei5ZG1hHtxCLUtevr"><code>import nest_asyncio

nest_asyncio.apply() # Required for Jupyter Notebook to run async functions

display(
Image(
app.get_graph().draw_mermaid_png(
curve_style=CurveStyle.LINEAR,
node_colors=NodeStyles(first="#ffdfba", last="#baffc9", default="#fad7de"),
wrap_label_n_words=9,
output_file_path=None,
draw_method=MermaidDrawMethod.PYPPETEER,
background_color="white",
padding=10,
)
)
)</code></pre>

<p id="t-eSpX0mbFJPRc449aJyMfsu"><span style="font-weight:bold">使用 Graphviz</span></p>

<pre id="t-tI4xOlEPsOtkIKIsJMB6Qz"><code>try:
display(Image(app.get_graph().draw_png()))
except ImportError:
print(
"You likely need to install dependencies for pygraphviz, see more here https://github.com/pygraphviz/pygraphviz/blob/main/INSTALL.txt"
)</code></pre>


<a id="section-1034"></a>
## 函数式 API 概览

<a id="t-block-18782"></a>

<p id="t-DcWDxFd7fIou79BoUElP6X"><span style="font-weight:bold">函数式 API (Functional API)</span><span> 允许您以最小的代码改动，为您的应用程序添加 LangGraph 的关键特性——</span><span style="font-weight:bold">持久化 (persistence)</span><span>、</span><span style="font-weight:bold">记忆 (memory)</span><span>、</span><span style="font-weight:bold">人机交互 (human-in-the-loop)</span><span> 和 </span><span style="font-weight:bold">流式处理 (streaming)</span><span>。</span></p>

<p id="t-vqsMQVGP5qOUmOP3bPapzs"><span>它旨在将这些特性集成到可能使用标准语言原语（如</span><span>if</span><span>语句、</span><span>for</span><span>循环和函数调用）进行分支和控制流的现有代码中。与许多需要将代码重构为显式管道或 DAG 的数据编排框架不同，函数式 API 允许您在不强制使用严格执行模型的情况下集成这些功能。</span></p>

<p id="t-C7PLsdmLwXjdzMzEvYS4m8"><span>函数式 API 使用两个关键构建块：</span></p>

<ul><li id="t-p9QiMEd6OtGQcJ3iEQ0yjk"><span style="font-weight:bold">@entrypoint</span><span>– 将一个函数标记为工作流的起点，封装逻辑并管理执行流，包括处理长时间运行的任务和中断。</span></li></ul>

<ul><li id="t-X3QOQ2icpfa4pFtWHyAoFy"><span style="border-bottom:1px solid;font-weight:bold">@task</span><span>– 表示一个离散的工作单元，例如 API 调用或数据处理步骤，可以在入口点内异步执行。任务返回一个类似 future 的对象，可以同步等待或解析。</span></li></ul>

<p id="t-Vp8pOD0DfBaqOfu2zFCLRp"><span>这为构建具有状态管理和流式处理功能的工作流提供了一个最小的抽象层。</span></p>


<a id="section-1035"></a>
## 函数式 API 与图 API 对比 (Functional API vs. Graph API)

<a id="t-sKLappDrtV0fWUmriDRaCN"></a>

<p id="t-Le7U0cCESJALrBbtWXIB2a"><span>对于更喜欢声明式方法的用户，LangGraph 的</span><span style="border-bottom:1px solid;font-weight:bold">图 API (Graph API)</span><span> 允许您使用图范式定义工作流。两个 API 共享相同的底层运行时，因此您可以在同一个应用程序中一起使用它们。</span></p>

<p id="t-BuW9yBmWGqAsGmKa7S61My"><span>以下是一些关键区别：</span></p>

<ul><li id="t-eI7WJ2hOefA1lY74yYlINH"><span style="font-weight:bold">控制流 (Control flow)</span><span>：函数式 API 不需要考虑图结构。您可以使用标准的 Python 结构来定义工作流。这通常会减少您需要编写的代码量。</span></li></ul>

<ul><li id="t-e0b4reNlwxbMyscF7EmCYJ"><span style="font-weight:bold">短期记忆 (Short-term memory)</span><span>：</span><span style="font-weight:bold">图 API (Graph API)</span><span> 需要声明一个</span><span style="border-bottom:1px solid;font-weight:bold">状态 (State)</span><span>，并且可能需要定义</span><span style="border-bottom:1px solid;font-weight:bold">归约器 (reducers)</span><span>来管理图状态的更新。</span><span>@entrypoint</span><span> 和 </span><span>@tasks</span><span> 不需要显式的状态管理，因为它们的状态作用域限定在函数内，并且不在函数间共享。</span></li></ul>

<ul><li id="t-FNeZZ3SG8nLsh8YZi5LE0Y"><span style="font-weight:bold">检查点 (Checkpointing)</span><span>：两个 API 都会生成和使用检查点。在 </span><span style="font-weight:bold">图 API</span><span> 中，每个</span><span style="border-bottom:1px solid;font-weight:bold">超步 (superstep)</span><span> 之后都会生成一个新的检查点。在 </span><span style="font-weight:bold">函数式 API</span><span> 中，当任务执行时，它们的结果会保存到与给定入口点关联的现有检查点中，而不是创建新的检查点。</span></li></ul>

<ul><li id="t-kfd5rTnzKS9u8bo6POiOTS"><span style="font-weight:bold">可视化 (Visualization)</span><span>：图 API 可以轻松地将工作流可视化为图，这对于调试、理解工作流和与他人共享非常有用。函数式 API 不支持可视化，因为图是在运行时动态生成的。</span></li></ul>


<a id="section-1036"></a>
## 示例 (Example)

<a id="t-4GLCUQCswbwDXuRFPVetXG"></a>

<p id="t-HSTjhMFIVn73nPodkfoYQN"><span>下面我们演示一个简单的应用程序，它撰写一篇论文并</span><span style="border-bottom:1px solid;font-weight:bold">中断 (interrupts)</span><span> 以请求人工审核。</span></p>

<pre id="t-lHyTjDdKiSxSlU0nWaToKu"><code>from langgraph.checkpoint.memory import InMemorySaver
from langgraph.func import entrypoint, task
from langgraph.types import interrupt

@task
def write_essay(topic: str) -&gt; str:
"""撰写关于给定主题的论文。"""
time.sleep(1) # 长时间运行任务的占位符。
return f"An essay about topic: {topic}"

@entrypoint(checkpointer=InMemorySaver())
def workflow(topic: str) -&gt; dict:
"""撰写论文并请求审核的简单工作流。"""
essay = write_essay("cat").result()
is_approved = interrupt({
# 提供给 interrupt 作为参数的任何 json 可序列化负载。
# 当从工作流流式传输数据时，它将作为 Interrupt 出现在客户端。
"essay": essay, # 我们想要审核的论文。
# 我们可以添加任何需要的额外信息。
# 例如，引入一个名为 "action" 的键并提供一些指令。
"action": "Please approve/reject the essay",
})

return {
"essay": essay, # 生成的论文
"is_approved": is_approved, # 来自 HIL 的响应
}</code></pre>

<p id="t-ndTzgLQf3Wz3pSSg5PosVW"><span>此工作流将撰写一篇关于“cat”主题的论文，然后暂停以获取人工审核。工作流可以无限期中断，直到提供审核为止。</span></p>

<p id="t-Oz6vi0XacwNqcp4gRhSPFB"><span>当工作流恢复时，它会从头开始执行，但由于</span><span>writeEssay</span><span>任务的结果已经保存，任务结果将从检查点加载，而不是重新计算。</span></p>

<pre id="t-3HRVftHz45RibM8CCgbSzq"><code>import time
import uuid
from langgraph.func import entrypoint, task
from langgraph.types import interrupt
from langgraph.checkpoint.memory import InMemorySaver

@task
def write_essay(topic: str) -&gt; str:
"""撰写关于给定主题的论文。"""
time.sleep(1) # 这是长时间运行任务的占位符。
return f"An essay about topic: {topic}"

@entrypoint(checkpointer=InMemorySaver())
def workflow(topic: str) -&gt; dict:
"""撰写论文并请求审核的简单工作流。"""
essay = write_essay("cat").result()
is_approved = interrupt(
{
# 提供给 interrupt 作为参数的任何 json 可序列化负载。
# 当从工作流流式传输数据时，它将作为 Interrupt 出现在客户端。
"essay": essay, # 我们想要审核的论文。
# 我们可以添加任何需要的额外信息。
# 例如，引入一个名为 "action" 的键并提供一些指令。
"action": "Please approve/reject the essay",
}
)
return {
"essay": essay, # 生成的论文
"is_approved": is_approved, # 来自 HIL 的响应
}

thread_id = str(uuid.uuid4())
config = {"configurable": {"thread_id": thread_id}}
for item in workflow.stream("cat", config):
print(item)
# &gt; {'write_essay': 'An essay about topic: cat'}
# &gt; {
# &gt;     '__interrupt__': (
# &gt;        Interrupt(
# &gt;            value={
# &gt;                'essay': 'An essay about topic: cat',
# &gt;                'action': 'Please approve/reject the essay'
# &gt;            },
# &gt;            id='b9b2b9d788f482663ced6dc755c9e981'
# &gt;        ),
# &gt;    )
# &gt; }</code></pre>

<p id="t-2DIWNNBLVbqFrCtHBRJdQd"><span>论文已撰写完成，准备审核。一旦提供审核，我们就可以恢复工作流：</span></p>

<pre id="t-wELGZ3ErM7MbJVo8fe1KW0"><code>from langgraph.types import Command

# 从用户处获取审核（例如，通过 UI）
# 在这种情况下，我们使用布尔值，但这可以是任何 JSON 可序列化的值。
human_review = True

for item in workflow.stream(Command(resume=human_review), config):
print(item)</code></pre>

<pre id="t-JwlhJQfyEZ4gBw50EIaZYg"><code>{'workflow': {'essay': 'An essay about topic: cat', 'is_approved': False}}</code></pre>

<p id="t-a6IGz3xgoZWEz0c454WMrC"><span>工作流已完成，审核已添加到论文中。</span></p>


<a id="section-1037"></a>
## 入口点 (Entrypoint)

<a id="t-NjxLH6QBdsuaUDo9PJypjA"></a>

<p id="t-jeWXTTL2TOn4zoeR0eHiEv"><span>[</span><span>@entrypoint</span><span>] 装饰器可用于从函数创建工作流。它封装工作流逻辑并管理执行流，包括处理 </span><span style="font-style:italic">长时间运行的任务</span><span> 和 </span><span style="border-bottom:1px solid;font-weight:bold">中断 (interrupts)</span><span>。</span></p>


<a id="section-1038"></a>
## 定义 (Definition)

<a id="t-lRonUWJ336R92rsBPRM9Bw"></a>

<p id="t-lhHeETc4rjnd41uLV5Ld21"><span style="font-weight:bold">入口点 (Entrypoint)</span><span>通过使用</span><span>@entrypoint</span><span>装饰器装饰一个函数来定义。</span></p>

<p id="t-ZTDokJL4M500hnOJU2J44R"><span>该函数</span><span style="font-weight:bold">必须接受一个位置参数</span><span>，作为工作流的输入。如果需要传递多个数据，请使用字典作为第一个参数的输入类型。</span></p>

<p id="t-9Rg8bpI4aefAJ2J7SYgs1W"><span>用</span><span>entrypoint</span><span>装饰函数会产生一个</span><span style="border-bottom:1px solid;font-weight:bold">Pregel</span><span>实例，它有助于管理工作流的执行（例如，处理流式传输、恢复和检查点）。</span></p>

<p id="t-5XEuLOVlvrf2nU4rHChwZM"><span>您通常希望将</span><span style="font-weight:bold">检查点器 (checkpointer)</span><span>传递给</span><span>@entrypoint</span><span>装饰器，以启用持久化并使用</span><span style="font-weight:bold">人机交互 (human-in-the-loop)</span><span>等功能。</span></p>

<p id="t-nX2Md7MzexMdzY7d6x7VFx"><span style="border-bottom:1px solid;font-weight:bold">同步 (Sync)</span></p>

<pre id="t-GFrTbYKZwb9ZcPC4zfeS8E"><code>from langgraph.func import entrypoint

@entrypoint(checkpointer=checkpointer)
def my_workflow(some_input: dict) -&gt; int:
# 一些可能涉及长时间运行任务（如 API 调用）的逻辑，
# 并且可能因人机交互而中断。
...
return result</code></pre>

<p id="t-6Cs63GwgXfGZvWUxuCyb1v"><span style="font-weight:bold">序列化 (Serialization)</span><span> 入口点的 </span><span style="font-weight:bold">输入</span><span> 和 </span><span style="font-weight:bold">输出</span><span> 必须是 JSON 可序列化的，以支持检查点。请参阅 </span><span style="border-bottom:1px solid;font-weight:bold">序列化 (#serialization)</span><span> 部分了解更多详情。</span></p>


<a id="section-1039"></a>
## 可注入参数 (Injectable parameters)

<a id="t-iI8qqQWpcgeLAwEfQxeFWO"></a>

<p id="t-5TannRpQA8swjdpFUpiBQU"><span>声明</span><span>entrypoint</span><span>时，您可以请求访问将在运行时自动注入的附加参数。这些参数包括：</span></p>

<div id="t-YiguSxaYYnS45EPR5XvQVX"><table><colgroup><col width="126.5"/><col width="591.5"/></colgroup><tbody><tr><td><p><span>参数 (Parameter)</span></p></td><td><p><span>描述 (Description)</span></p></td></tr><tr><td><p><span style="font-weight:bold">previous</span></p></td><td><p><span>访问给定线程的上一个 </span><span>checkpoint</span><span> 关联的状态。请参阅 </span><span style="font-weight:bold">短期记忆 (#short-term-memory)</span><span>。</span></p></td></tr><tr><td><p><span style="font-weight:bold">store</span></p></td><td><p><span>[BaseStore][langgraph.store.base.BaseStore] 的一个实例。对于 </span><span style="font-weight:bold">长期记忆 (long-term memory)</span><span> 很有用。</span></p></td></tr><tr><td><p><span style="font-weight:bold">writer</span></p></td><td><p><span>在使用 Async Python &lt; 3.11 时，用于访问 StreamWriter。有关详细信息，请参阅 </span><span style="font-weight:bold">使用函数式 API 进行流式处理 (streaming with functional API for details)</span><span>。</span></p></td></tr><tr><td><p><span style="font-weight:bold">config</span></p></td><td><p><span>用于访问运行时间配置。有关信息，请参阅 </span><span style="font-weight:bold">RunnableConfig</span><span>。</span></p></td></tr></tbody></table></div>

<p id="t-cOIjHjeQzPX6nctUM02pV6"><span>请使用适当的名称和类型注解声明参数。</span></p>

<pre id="t-XHaNKNFPI5SYGVIk4vdqAo"><code>from langchain_core.runnables import RunnableConfig
from langgraph.func import entrypoint
from langgraph.store.base import BaseStore
from langgraph.store.memory import InMemoryStore
from langgraph.checkpoint.memory import InMemorySaver
from langgraph.types import StreamWriter

in_memory_checkpointer = InMemorySaver(...)
in_memory_store = InMemoryStore(...) # 用于长期记忆的 InMemoryStore 实例

@entrypoint(
    checkpointer=in_memory_checkpointer, # 指定检查点器
    store=in_memory_store  # 指定存储
)
def my_workflow(
    some_input: dict, # 输入（例如，通过 `invoke` 传递）
 *,
    previous: Any = None, # 用于短期记忆
    store: BaseStore, # 用于长期记忆
    writer: StreamWriter, # 用于流式传输自定义数据
    config: RunnableConfig  # 用于访问传递给入口点的配置
) -&gt; ...:</code></pre>


<a id="section-1040"></a>
## 执行 (Executing)

<a id="t-s5AvrPlrCcgCKbG42sLdA1"></a>

<p id="t-2hzfCcDc35VEb5kqN7tyxB"><span>使用 </span><span style="border-bottom:1px solid;font-weight:bold">@entrypoint</span><span> 将产生一个 </span><span style="border-bottom:1px solid;font-weight:bold">Pregel</span><span> 对象，可以使用 </span><span>invoke</span><span>、</span><span>ainvoke</span><span>、</span><span>stream</span><span> 和 </span><span>astream</span><span> 方法执行。</span></p>

<pre id="t-L71ANsj4APU1X1KuDOVlu0"><code>config = {
"configurable": {
"thread_id": "some_thread_id"
}
}
my_workflow.invoke(some_input, config)  # 同步等待结果</code></pre>


<a id="section-1041"></a>
## 恢复 (Resuming)

<a id="t-R2z3b71lghs4dowUCrGp9m"></a>

<p id="t-f9qyyAVPW3DessGzfR6Ny1"><span>在 </span><span style="border-bottom:1px solid;font-weight:bold">interrupt</span><span> 之后恢复执行可以通过向 </span><span style="border-bottom:1px solid;font-weight:bold">Command</span><span> 原语传递 </span><span style="font-weight:bold">resume</span><span> 值来完成。</span></p>

<pre id="t-Cjto7Ff5Xhflrl8ZhGKMq3"><code>from langgraph.types import Command

config = {
"configurable": {
"thread_id": "some_thread_id"
}
}

my_workflow.invoke(Command(resume=some_resume_value), config)</code></pre>

<p id="t-RCb7BsFf9pCNtkGMisxapB"><span style="font-weight:bold">在错误后恢复 (Resuming after an error)</span></p>

<p id="t-1rh90JwKgcWpNf78HBqQOB"><span>要在错误后恢复，请使用</span><span>None</span><span>和相同的</span><span style="font-weight:bold">线程 ID (thread id)</span><span>(config) 运行</span><span>entrypoint</span><span>。</span></p>

<p id="t-0wQO6qABEQ4Q08G2xOEpDa"><span>这假设底层的</span><span style="font-weight:bold">错误 (error)</span><span>已得到解决，执行可以成功进行。</span></p>

<p id="t-IOQwtu9EFzpWTunnhn4y5W"><span style="border-bottom:1px solid;font-weight:bold">调用 (Invoke)</span></p>

<pre id="t-g3aYU0y3GeyVcCsZj8IT5X"><code>config = {
"configurable": {
"thread_id": "some_thread_id"
}
}

my_workflow.invoke(None, config)</code></pre>


<a id="section-1042"></a>
## 短期记忆 (Short-term memory)

<a id="t-N5ZijvAcQgWSqNND7mCaMR"></a>

<p id="t-z6LvM3Sth7dJrw7zokVZDP"><span>当 </span><span>entrypoint</span><span> 定义了 </span><span>checkpointer</span><span> 时，它会在 </span><span style="border-bottom:1px solid;font-weight:bold">检查点 (checkpoints)</span><span> 中存储同一 </span><span style="font-weight:bold">线程 ID (thread id)</span><span> 连续调用之间的信息。</span></p>

<p id="t-ercQydtyk5FDh1Xt2ml00D"><span>这允许使用</span><span>previous</span><span>参数访问上一次调用的状态。</span></p>

<p id="t-eKJCkvS0mGkxo5ZvaNpnRd"><span>默认情况下，</span><span>previous</span><span>参数是上一次调用的返回值。</span></p>

<pre id="t-J3xJvkgpagHldwj8G8sLDp"><code>@entrypoint(checkpointer=checkpointer)
def my_workflow(number: int, *, previous: Any = None) -&gt; int:
previous = previous or 0
return number + previous

config = {
"configurable": {
"thread_id": "some_thread_id"
}
}

my_workflow.invoke(1, config) # 1 (previous 为 None)
my_workflow.invoke(2, config) # 3 (previous 为上一次调用的 1)</code></pre>

<a id="t-lK94xMlHzWzrORhJ6lz9g7"></a>

##### entrypoint.final

<p id="t-N7hE4nafuaRuC1pBTHKwEY"><span style="border-bottom:1px solid;font-weight:bold">entrypoint.final</span><span>是一个特殊的原语，可以从入口点返回，它允许</span><span style="font-weight:bold">解耦 (decoupling)</span><span style="font-weight:bold">保存在检查点中</span><span>的值与</span><span style="font-weight:bold">入口点的返回值</span><span>。</span></p>

<p id="t-sIRWUyydbGY7l65VO83eyw"><span>第一个值是入口点的返回值，第二个值是将被保存在检查点中的值。类型注解为</span><span>entrypoint.final[return_type, save_type]</span><span>。</span></p>

<pre id="t-WbGCjFpBi5jXwmXV92YqKN"><code>@entrypoint(checkpointer=checkpointer)
def my_workflow(number: int, *, previous: Any = None) -&gt; entrypoint.final[int, int]:
previous = previous or 0
# 这将向调用者返回 previous 值，并将 2 * number 保存到检查点，
# 该值将在下一次调用中用作 `previous` 参数。
return entrypoint.final(value=previous, save=2 * number)

config = {
"configurable": {
"thread_id": "1"
}
}

my_workflow.invoke(3, config) # 0 (previous 为 None)
my_workflow.invoke(1, config) # 6 (previous 为上一次调用的 3 * 2)</code></pre>


<a id="section-1043"></a>
## 任务 (Task)

<a id="t-Y8tRG0XrmuUEYHmVeASLXy"></a>

<p id="t-uToyWWuVUfIbfq0pBIqAGV"><span style="font-weight:bold">任务 (Task)</span><span>表示一个离散的工作单元，例如 API 调用或数据处理步骤。它有两个关键特征：</span></p>

<ul><li id="t-SzgwVzONWkoKjkGM8UJw0l"><span style="font-weight:bold">异步执行 (Asynchronous Execution)</span><span>：任务旨在异步执行，允许并发运行多个操作而不会阻塞。</span></li></ul>

<ul><li id="t-5tPVfdPqMlLyMIWyqMi1cD"><span style="font-weight:bold">检查点 (Checkpointing)</span><span>：任务结果保存在检查点中，从而可以从上次保存的状态恢复工作流。（有关更多详细信息，请参阅 </span><span style="border-bottom:1px solid;font-weight:bold">持久化 (persistence)</span><span>）。</span></li></ul>


<a id="section-1044"></a>
## 定义 (Definition)

<a id="t-56dqcZlJPR1tYS5STSHgWN"></a>

<p id="t-O8XM0TjqxmZPuU4LLtzP6L"><span>任务使用</span><span>@task</span><span>装饰器定义，它包装了一个常规的 Python 函数。</span></p>

<pre id="t-YiiLV4tkh3o40kDbEwNX00"><code>from langgraph.func import task

@task()
def slow_computation(input_value):
# 模拟长时间运行的操作
...
return result</code></pre>

<p id="t-tpYehgEPbQJtCoZV8nGrx5"><span style="font-weight:bold">序列化 (Serialization)</span><span>任务的</span><span style="font-weight:bold">输出</span><span>必须是 JSON 可序列化的，以支持检查点。</span></p>


<a id="section-1045"></a>
## 执行 (Execution)

<a id="t-ktbUy3cD8xu5lhUJ530emB"></a>

<p id="t-WdXU48BMSdZOqhgYFl1lZE"><span style="font-weight:bold">任务 (Tasks)</span><span> 只能从 </span><span style="font-weight:bold">入口点 (entrypoint)</span><span>、另一个 </span><span style="font-weight:bold">任务 (task)</span><span> 或 </span><span style="border-bottom:1px solid;font-weight:bold">状态图节点 (state graph node)</span><span> 内部调用。</span></p>

<p id="t-vVkxxcU5CXUPlRUPv09W1P"><span>任务</span><span style="font-style:italic">不能</span><span>直接从主应用程序代码中调用。</span></p>

<p id="t-8QJOp0VtUS9sjDru08WsbZ"><span>当您调用一个</span><span style="font-weight:bold">任务 (task)</span><span>时，它会</span><span style="font-style:italic">立即</span><span>返回一个 future 对象。future 是稍后可用的结果的占位符。</span></p>

<p id="t-yEvB9BQ8NJgYBRnorI9MwM"><span>要获取</span><span style="font-weight:bold">任务 (task)</span><span>的结果，您可以同步等待（使用</span><span>result()</span><span>）或异步等待（使用</span><span>await</span><span>）。</span></p>

<p id="t-IzYzdo4YJqZ8ijGPR7ZyJ9"><span style="border-bottom:1px solid;font-weight:bold">同步调用 (Synchronous Invocation)</span></p>

<pre id="t-7p0fWxPSI02H8EaVi4ngtO"><code>@entrypoint(checkpointer=checkpointer)
def my_workflow(some_input: int) -&gt; int:
future = slow_computation(some_input)
return future.result() # 同步等待结果</code></pre>


<a id="section-1046"></a>
## 何时使用任务 (When to use a task)

<a id="t-ID37TGQS5vKuM6rbnwzgXg"></a>

<p id="t-l2Y4F6doArb3GCja18Xxtv"><span style="font-weight:bold">任务 (Tasks)</span><span>在以下场景中非常有用：</span></p>

<ul><li id="t-U3t43OfrepPloNzMpyCpNv"><span style="font-weight:bold">检查点 (Checkpointing)</span><span>：当您需要将长时间运行操作的结果保存到检查点时，这样在恢复工作流时就不需要重新计算它。</span></li></ul>

<ul><li id="t-pZVvavhRMLO0rlSyMjA7fO"><span style="font-weight:bold">人机交互 (Human-in-the-loop)</span><span>：如果您正在构建一个需要人工干预的工作流，您必须使用 </span><span style="font-weight:bold">任务 (tasks)</span><span> 来封装任何随机性（例如 API 调用），以确保工作流可以正确恢复。有关更多详细信息，请参阅 </span><span style="border-bottom:1px solid;font-weight:bold">确定性 (#determinism)</span><span> 部分。</span></li></ul>

<ul><li id="t-TVw8R3QOSNxJOLBsUspPYK"><span style="font-weight:bold">并行执行 (Parallel Execution)</span><span>：对于 I/O 密集型任务，</span><span style="font-weight:bold">任务 (tasks)</span><span>可以实现并行执行，允许并发运行多个操作而不会阻塞（例如，调用多个 API）。</span></li></ul>

<ul><li id="t-k3F4dwzqT2zMwTOcvM1xpY"><span style="font-weight:bold">可观测性 (Observability)</span><span>：将操作包装在 </span><span style="font-weight:bold">任务 (tasks)</span><span> 中提供了一种跟踪工作流进度并使用 </span><span style="border-bottom:1px solid;font-weight:bold">LangSmith</span><span> 监控单个操作执行情况的方法。</span></li></ul>

<ul><li id="t-XxNtVySNvH9NV5mUDixBV8"><span style="font-weight:bold">可重试工作 (Retryable Work)</span><span>：当工作需要重试以处理失败或不一致时，</span><span style="font-weight:bold">任务 (tasks)</span><span>提供了一种封装和管理重试逻辑的方法。</span></li></ul>


<a id="section-1047"></a>
## 序列化 (Serialization)

<a id="t-R4XBMJN4yZbXSvHPayUeQc"></a>

<p id="t-d5rm1jbxAiabuZylwUZOFw"><span>LangGraph 中的序列化有两个关键方面：</span></p>

<ol start="1"><li id="t-tZ74NF5TQbc7GNQrkgxxhC"><span>entrypoint</span><span>的输入和输出必须是 JSON 可序列化的。</span></li></ol>

<ol start="2"><li id="t-jXxSF6w5WVQUcmu4bTmtZD"><span>task</span><span>的输出必须是 JSON 可序列化的。</span></li></ol>

<p id="t-EN27NOCzOT174N3rQ5Silj"><span>这些要求对于启用检查点和工作流恢复是必要的。使用 Python 原语（如字典、列表、字符串、数字和布尔值）以确保您的输入和输出是可序列化的。</span></p>

<p id="t-F3GdE2jNIynFsT2U1LKOJd"><span>序列化确保工作流状态（如任务结果和中间值）可以可靠地保存和恢复。这对于启用人机交互、容错和并行执行至关重要。</span></p>

<p id="t-0FpYxg2HnOyicJhUov6vOD"><span>如果为配置了检查点器的工作流提供不可序列化的输入或输出，将导致运行时错误。</span></p>


<a id="section-1048"></a>
## 确定性 (Determinism)

<a id="t-0XPtDBQB4qBySXwJNd5KUT"></a>

<p id="t-mzw5rAlfHoGaVyOdCrhX38"><span>为了利用</span><span style="font-weight:bold">人机交互 (human-in-the-loop)</span><span>等功能，任何随机性都应该封装在</span><span style="font-weight:bold">任务 (tasks)</span><span>内部。这保证了当执行停止（例如因人机交互停止）并恢复时，即使</span><span style="font-weight:bold">任务 (task)</span><span>结果是非确定性的，它也会遵循相同的</span><span style="font-style:italic">步骤序列 (sequence of steps)</span><span>。</span></p>

<p id="t-9zdCOnFf084ZfjBHY8yHup"><span>LangGraph 通过在 </span><span style="font-weight:bold">任务 (task)</span><span> 和 </span><span style="border-bottom:1px solid;font-weight:bold">子图 (subgraph)</span><span> 执行时对结果进行持久化来实现此行为。一个精心设计的工作流可确保恢复执行遵循 </span><span style="font-style:italic">相同的步骤序列</span><span>，从而允许正确检索以前计算的结果而无需重新执行它们。这对于长时间运行的 </span><span style="font-weight:bold">任务 (tasks)</span><span> 或具有非确定性结果的 </span><span style="font-weight:bold">任务 (tasks)</span><span> 特别有用，因为它避免了重复已完成的工作并允许从基本相同的位置恢复。</span></p>

<p id="t-DgrLkfAB4AgESUbjUdCseJ"><span>虽然工作流的不同运行可以产生不同的结果，但恢复</span><span style="font-style:italic">特定</span><span>运行应始终遵循相同的记录步骤序列。这使得 LangGraph 能够有效地查找在图中断之前执行的</span><span style="font-weight:bold">任务 (task)</span><span>和</span><span style="font-weight:bold">子图 (subgraph)</span><span>结果，并避免重新计算它们。</span></p>


<a id="section-1049"></a>
## 幂等性 (Idempotency)

<a id="t-exWPIU3TTPGnXKSFGmdrOF"></a>

<p id="t-uEBotnCgYhVoLMappGmd1K"><span>幂等性确保多次运行相同操作会产生相同的结果。这有助于防止在由于失败而重新运行某个步骤时出现重复的 API 调用和冗余处理。始终将 API 调用放在</span><span style="font-weight:bold">任务 (tasks)</span><span>函数中以便进行检查点操作，并将其设计为在重新执行的情况下是幂等的。如果</span><span style="font-weight:bold">任务 (task)</span><span>开始但未成功完成，则可能会发生重新执行。然后，如果工作流恢复，该</span><span style="font-weight:bold">任务 (task)</span><span>将再次运行。使用幂等键或验证现有结果以避免重复。</span></p>


<a id="section-1051"></a>
## 处理副作用 (Handling side effects)

<a id="t-URnW1syMzTUedAmuICpb0b"></a>

<p id="t-qxGB0AJ9PCYSd8egaVB2QX"><span>将副作用（例如写入文件、发送电子邮件）封装在任务中，以确保在恢复工作流时它们不会被执行多次。</span></p>

<p id="t-55fWnODYdtX9wWo3YMhmce"><span style="border-bottom:1px solid;font-weight:bold">不正确 (Incorrect)</span></p>

<p id="t-czZTBwMUc8X8esMe3L3k2m"><span>在这个例子中，副作用（写入文件）直接包含在工作流中，因此在恢复工作流时它将被第二次执行。</span></p>

<pre id="t-K4pZGQ4n8l2Baf5RTVR0K9"><code>@entrypoint(checkpointer=checkpointer)
def my_workflow(inputs: dict) -&gt; int:
# 恢复工作流时，此代码将第二次执行。
# 这可能不是您想要的。
with open("output.txt", "w") as f:
f.write("Side effect executed")
value = interrupt("question")
return value</code></pre>

<p id="t-BUf0JIcog08URkfORvYqJa"><span style="border-bottom:1px solid;font-weight:bold">正确 (correct)</span></p>

<pre id="t-s0j3QjSsc0IYczAt39RoXG"><code>from langgraph.func import task

@task
def write_to_file():
 with open("output.txt", "w") as f:
        f.write("Side effect executed")

@entrypoint(checkpointer=checkpointer)
def my_workflow(inputs: dict) -&gt; int:
 # 副作用现在被封装在一个任务中。
    write_to_file().result()
    value = interrupt("question")
 return value</code></pre>


<a id="section-1052"></a>
## 非确定性控制流 (Non-deterministic control flow)

<a id="t-Wz4IkTLMYhniIbqjISaxDm"></a>

<p id="t-HRW8IxlIvtSV1Xl1EfMH0N"><span>每次可能给出不同结果的操作（如获取当前时间或随机数）都应封装在</span><span style="font-weight:bold">任务 (tasks)</span><span>中，以确保在恢复时返回相同的结果。</span></p>

<ul><li id="t-rD3XnMYzgangRaU4jtpWgt"><span>在任务中：获取随机数 (5) → 中断 (interrupt) → 恢复 (resume) →（再次返回 5）→ ...</span></li></ul>

<ul><li id="t-ojPmlbNJK02HsqhYHaTQr0"><span>不在任务中：获取随机数 (5) → 中断 (interrupt) → 恢复 (resume) → 获取新随机数 (7) → ...</span></li></ul>

<p id="t-Vp8RVlozvIdvltt7WRcjru"><span>当使用具有多个中断调用的</span><span style="font-weight:bold">人机交互 (human-in-the-loop)</span><span>工作流时，这一点尤为重要。LangGraph 为每个任务/入口点保留一个恢复值列表。当遇到中断时，它会与相应的恢复值匹配。这种匹配严格基于</span><span style="font-weight:bold">索引 (index-based)</span><span>，因此恢复值的顺序应与中断的顺序相匹配。</span></p>

<p id="t-CyEwn2U8BgOy4qlQvBilpt"><span>如果在恢复时未保持执行顺序，则一个</span><span style="border-bottom:1px solid;font-weight:bold">interrupt</span><span>调用可能会与错误的</span><span>resume</span><span>值匹配，从而导致错误的结果。</span></p>

<p id="t-AcPuUZZtgJda1mw8apT9Kh"><span>请阅读</span><span style="border-bottom:1px solid;font-weight:bold">确定性 (#determinism)</span><span>部分了解更多详情。</span></p>

<p id="t-fcexHgJM7wQ0xMBPGRRjbK"><span style="border-bottom:1px solid;font-weight:bold">不正确 (Incorrect)</span></p>

<p id="t-2lxjBG4mHmqFfnwUO9383I"><span>在这个例子中，工作流使用当前时间来确定要执行哪个任务。这是非确定性的，因为工作流的结果取决于其执行的时间。</span></p>

<pre id="t-2yt1Zo5fECnFPvXTl1UIMe"><code>from langgraph.func import entrypoint

@entrypoint(checkpointer=checkpointer)
def my_workflow(inputs: dict) -&gt; int:
t0 = inputs["t0"]
t1 = time.time()

delta_t = t1 - t0

if delta_t &gt; 1:
result = slow_task(1).result()
value = interrupt("question")
else:
result = slow_task(2).result()
value = interrupt("question")

return {
"result": result,
"value": value
}</code></pre>

<p id="t-VhnAevj9uOh3C3sFP1X3ux"><span style="border-bottom:1px solid;font-weight:bold">正确 (Correct)</span></p>

<pre id="t-zDE22KprnU12BD5qHSYwUD"><code>import time

from langgraph.func import task

@task
def get_time() -&gt; float:
 return time.time()

@entrypoint(checkpointer=checkpointer)
def my_workflow(inputs: dict) -&gt; int:
    t0 = inputs["t0"]
    t1 = get_time().result()

    delta_t = t1 - t0

 if delta_t &gt; 1:
        result = slow_task(1).result()
        value = interrupt("question")
 else:
        result = slow_task(2).result()
        value = interrupt("question")

 return {
 "result": result,
 "value": value
 }</code></pre>


<a id="section-1053"></a>
## 使用函数式 API

<a id="t-block-18898"></a>

<p id="t-OOZ5tn4AOfoX1yvmsXCseg"><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">Functional API</span><span style="background-color:transparent"> 允许您以最小的代码改动，为您的应用程序添加 LangGraph 的核心功能——</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">持久化</span><span style="background-color:transparent">、</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">记忆</span><span style="background-color:transparent">、</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">人在回路</span><span style="background-color:transparent"> 和 </span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">流式传输</span><span style="background-color:transparent">。</span></p>

<p id="t-GftZcmnCnWSKoejJeQiOX3"><span>有关 Functional API 的概念性信息，请参阅 </span><span style="border-bottom:1px solid;font-weight:bold">Functional API</span><span>。</span></p>


<a id="section-1054"></a>
## 创建简单工作流

<a id="t-wHcQAJpwayuYIhUmUBxl0d"></a>

<p id="t-1jXSB1yzl9r8JI099FcOZe"><span style="background-color:transparent">定义</span><span style="background-color:transparent">entrypoint</span><span style="background-color:transparent">时，输入被限制为函数的第一个参数。要传递多个输入，可以使用字典。</span></p>

<pre id="t-PqAcifOrgGu9gwTtZkeXeP"><code>@entrypoint(checkpointer=checkpointer)
def my_workflow(inputs: dict) -&gt; int:
value = inputs["value"]
another_value = inputs["another_value"]
...

my_workflow.invoke({"value": 1, "another_value": 2})</code></pre>

<p id="t-4VAw7U2i2z5JYdnfGvLc42"><span>此示例演示了如何在语法上使用</span><span>@task</span><span>和</span><span>@entrypoint</span><span>装饰器。如果提供了检查点存储器，工作流结果将被持久化在其中。</span></p>

<pre id="t-vySbZYgeNOgQzJRXQDWDch"><code>import uuid
from langchain.chat_models import init_chat_model
from langgraph.func import entrypoint, task
from langgraph.checkpoint.memory import InMemorySaver

model = init_chat_model('gpt-3.5-turbo')

# Task: generate essay using an LLM
@task
def compose_essay(topic: str) -&gt; str:
"""Generate an essay about the given topic."""
return model.invoke([
{"role": "system", "content": "You are a helpful assistant that writes essays."},
{"role": "user", "content": f"Write an essay about {topic}."}
]).content

# Create a checkpointer for persistence
checkpointer = InMemorySaver()

@entrypoint(checkpointer=checkpointer)
def workflow(topic: str) -&gt; str:
"""Simple workflow that generates an essay with an LLM."""
return compose_essay(topic).result()

# Execute the workflow
config = {"configurable": {"thread_id": str(uuid.uuid4())}}
result = workflow.invoke("the history of flight", config=config)
print(result)</code></pre>


<a id="section-1055"></a>
## 并行执行

<a id="t-i4W9JQbRJhEisa3oDaHqy8"></a>

<p id="t-tdIkgpV2ILGcibUf1lMPl8"><span style="background-color:transparent">可以通过并发调用任务并等待结果来实现并行执行。这对于提高 I/O 密集型任务的性能（例如，调用 LLM 的 API）非常有用。</span></p>

<pre id="t-4NCswWPBGxDKw7gYBnEVlc"><code>@task
def add_one(number: int) -&gt; int:
return number + 1

@entrypoint(checkpointer=checkpointer)
def graph(numbers: list[int]) -&gt; list[str]:
futures = [add_one(i) for i in numbers]
return [f.result() for f in futures]</code></pre>

<p id="t-y3TKgVFpSjNrU5lSPtGrs7"><span>此示例演示了如何使用</span><span>@task</span><span>并行运行多个 LLM 调用。每个调用生成一个关于不同主题的段落，结果被合并成一个单一的文本输出。</span></p>

<pre id="t-e579xbP87VyfWXhWZqhi7o"><code>import uuid
from langchain.chat_models import init_chat_model
from langgraph.func import entrypoint, task
from langgraph.checkpoint.memory import InMemorySaver

# Initialize the LLM model
model = init_chat_model("gpt-3.5-turbo")

# Task that generates a paragraph about a given topic
@task
def generate_paragraph(topic: str) -&gt; str:
response = model.invoke([
{"role": "system", "content": "You are a helpful assistant that writes educational paragraphs."},
{"role": "user", "content": f"Write a paragraph about {topic}."}
])
return response.content

# Create a checkpointer for persistence
checkpointer = InMemorySaver()

@entrypoint(checkpointer=checkpointer)
def workflow(topics: list[str]) -&gt; str:
"""Generates multiple paragraphs in parallel and combines them."""
futures = [generate_paragraph(topic) for topic in topics]
paragraphs = [f.result() for f in futures]
return "\n\n".join(paragraphs)

# Run the workflow
config = {"configurable": {"thread_id": str(uuid.uuid4())}}
result = workflow.invoke(["quantum computing", "climate change", "history of aviation"], config=config)
print(result)</code></pre>

<p id="t-2PqLR7UEfpFhDDFEt23XLy"><span>此示例利用 LangGraph 的并发模型来改善执行时间，特别是在任务涉及 I/O（如 LLM 补全）时。</span></p>


<a id="section-1056"></a>
## 调用图

<a id="t-bHpODUGmBp67ia83rQbADh"></a>

<p id="t-e2zdMKWu7KXqaFcMQ1l1jk"><span style="font-weight:bold;background-color:transparent">Functional API</span><span style="background-color:transparent"> 和 </span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">Graph API</span><span style="background-color:transparent"> 可以在同一个应用程序中一起使用，因为它们共享相同的底层运行时。</span></p>

<pre id="t-GAMc6R4lsZXimVMn2P3K2i"><code>from langgraph.func import entrypoint
from langgraph.graph import StateGraph

builder = StateGraph()
...
some_graph = builder.compile()

@entrypoint()
def some_workflow(some_input: dict) -&gt; int:
# Call a graph defined using the graph API
result_1 = some_graph.invoke(...)
# Call another graph defined using the graph API
result_2 = another_graph.invoke(...)
return {
"result_1": result_1,
"result_2": result_2
}</code></pre>

<p id="t-Uh2BdRVuJ6XBJtAhPXHX4Q"><span style="background-color:transparent;color:#1f1f1f">扩展示例：从 Functional API 调用简单图</span></p>

<pre id="t-CaPhKKEUS7XPNB7jgGLtso"><code>import uuid
from typing import TypedDict
from langgraph.func import entrypoint
from langgraph.checkpoint.memory import InMemorySaver
from langgraph.graph import StateGraph

# Define the shared state type
class State(TypedDict):
    foo: int

# Define a simple transformation node
def double(state: State) -&gt; State:
 return {"foo": state["foo"] * 2}

# Build the graph using the Graph API
builder = StateGraph(State)
builder.add_node("double", double)
builder.set_entry_point("double")
graph = builder.compile()

# Define the functional API workflow
checkpointer = InMemorySaver()

@entrypoint(checkpointer=checkpointer)
def workflow(x: int) -&gt; dict:
    result = graph.invoke({"foo": x})
 return {"bar": result["foo"]}

# Execute the workflow
config = {"configurable": {"thread_id": str(uuid.uuid4())}}
print(workflow.invoke(5, config=config)) # Output: {'bar': 10}</code></pre>


<a id="section-1057"></a>
## 调用其他入口点

<a id="t-rrsLWQGZQjBVGyyqB3RoQR"></a>

<p id="t-hJiJIlRwuytdqb8L2jgBn5"><span style="background-color:transparent">您可以从一个</span><span style="font-weight:bold;background-color:transparent">entrypoint</span><span style="background-color:transparent">或</span><span style="font-weight:bold;background-color:transparent">task</span><span style="background-color:transparent">内部调用其他</span><span style="font-weight:bold;background-color:transparent">entrypoint</span><span style="background-color:transparent">。</span></p>

<pre id="t-2KmVOpdsmZqncvGIQUYL1a"><code>@entrypoint() # Will automatically use the checkpointer from the parent entrypoint
def some_other_workflow(inputs: dict) -&gt; int:
return inputs["value"]

@entrypoint(checkpointer=checkpointer)
def my_workflow(inputs: dict) -&gt; int:
value = some_other_workflow.invoke({"value": 1})
return value</code></pre>

<p id="t-V8nT09Oox7AvmHx2o2w7Ag"><span style="background-color:transparent;color:#1f1f1f">扩展示例：调用另一个入口点</span></p>

<pre id="t-k6asdkBBoEPME20rdIwklx"><code>import uuid
from langgraph.func import entrypoint
from langgraph.checkpoint.memory import InMemorySaver

# Initialize a checkpointer
checkpointer = InMemorySaver()

# A reusable sub-workflow that multiplies a number
@entrypoint()
def multiply(inputs: dict) -&gt; int:
 return inputs["a"] * inputs["b"]

# Main workflow that invokes the sub-workflow
@entrypoint(checkpointer=checkpointer)
def main(inputs: dict) -&gt; dict:
    result = multiply.invoke({"a": inputs["x"], "b": inputs["y"]})
 return {"product": result}

# Execute the main workflow
config = {"configurable": {"thread_id": str(uuid.uuid4())}}
print(main.invoke({"x": 6, "y": 7}, config=config)) # Output: {'product': 42}</code></pre>


<a id="section-1058"></a>
## 流式传输

<a id="t-XzaKSVpOBfwgyASYhQ9QwM"></a>

<p id="t-00mLGcV9QVHB3bPT76MoSB"><span style="font-weight:bold;background-color:transparent">Functional API</span><span style="background-color:transparent"> 使用与 </span><span style="font-weight:bold;background-color:transparent">Graph API</span><span style="background-color:transparent"> 相同的流式传输机制。请阅读 </span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">流式传输指南</span><span style="background-color:transparent"> 部分以获取更多详细信息。</span></p>

<p id="t-bTdNGOO1blM5x8hItyhe13"><span style="background-color:transparent">使用流式 API 同时流式传输更新和自定义数据的示例。</span></p>

<pre id="t-iR1VoyAG4jXgwja2GodlN1"><code>from langgraph.func import entrypoint
from langgraph.checkpoint.memory import InMemorySaver
from langgraph.config import get_stream_writer

checkpointer = InMemorySaver()

@entrypoint(checkpointer=checkpointer)
def main(inputs: dict) -&gt; int:
writer = get_stream_writer()
writer("Started processing")
result = inputs["x"] * 2
writer(f"Result is {result}")
return result

config = {"configurable": {"thread_id": "abc"}}

for mode, chunk in main.stream(
{"x": 5},
stream_mode=["custom", "updates"],
config=config
):
print(f"{mode}: {chunk}")</code></pre>

<ol start="1"><li id="t-1W8LpKG7HVfJn3Y1CcClV4"><span>从</span><span>langgraph.config</span><span>导入</span><span style="border-bottom:1px solid;font-weight:bold">get_stream_writer</span><span>。</span></li></ol>

<ol start="2"><li id="t-DLlPjIUYm6YQeHX8Gx9dgq"><span>在入口点内获取一个流写入器实例。</span></li></ol>

<ol start="3"><li id="t-1qm79WCszMNNIuBgGS2cj6"><span>在计算开始前发出自定义数据。</span></li></ol>

<ol start="4"><li id="t-A1O9V2k0J5eSSDoj6JCEMM"><span>计算完结果后发出另一个自定义消息。</span></li></ol>

<ol start="5"><li id="t-1bL9clvLS2z62cdzwhZKlx"><span>使用</span><span>.stream()</span><span>处理流式输出。</span></li></ol>

<ol start="6"><li id="t-e6HK67KJUd1NXuYsaxPA1v"><span>指定要使用的流式传输模式。</span></li></ol>

<pre id="t-Z2QVIIUVGkQLL2fe6f7fFd"><code>('updates', {'add_one': 2})
('updates', {'add_two': 3})
('custom', 'hello')
('custom', 'world')
('updates', {'main': 5})</code></pre>

<p id="t-KK9HDAFOGdM4vnRQy9xweY"><span style="font-weight:bold">Python &lt; 3.11 下的异步</span><span> 如果使用 Python &lt; 3.11 并编写异步代码，使用 </span><span style="border-bottom:1px solid;font-weight:bold">get_stream_writer</span><span> 将无效。请直接使用 </span><span>StreamWriter</span><span> 类。更多详情请参阅 </span><span style="border-bottom:1px solid;font-weight:bold">Python &lt; 3.11 下的异步</span><span>。</span></p>

<pre id="t-pbHSkcYQ3UMkpgsBAtm431"><code>from langgraph.types import StreamWriter

@entrypoint(checkpointer=checkpointer)
async def main(inputs: dict, writer: StreamWriter) -&gt; int:
...</code></pre>


<a id="section-1059"></a>
## 重试策略

<a id="t-jArDPtR9bTZ9TsgV2eKPps"></a>

<pre id="t-b4eIzz60VlfJNV0KQuAIRO"><code>from langgraph.checkpoint.memory import InMemorySaver
from langgraph.func import entrypoint, task
from langgraph.types import RetryPolicy

# This variable is just used for demonstration purposes to simulate a network failure.
# It's not something you will have in your actual code.
attempts = 0

# Let's configure the RetryPolicy to retry on ValueError.
# The default RetryPolicy is optimized for retrying specific network errors.
retry_policy = RetryPolicy(retry_on=ValueError)

@task(retry_policy=retry_policy)
def get_info():
global attempts
attempts += 1

if attempts &lt; 2:
raise ValueError('Failure')
return "OK"

checkpointer = InMemorySaver()

@entrypoint(checkpointer=checkpointer)
def main(inputs, writer):
return get_info().result()

config = {
"configurable": {
"thread_id": "1"
}
}

main.invoke({'any_input': 'foobar'}, config=config)</code></pre>

<pre id="t-aiZP3hajRSvWsX5Gs2fAbl"><code>'OK'</code></pre>


<a id="section-1060"></a>
## 缓存任务

<a id="t-Aer8SMTXVpjSevy0iH84TE"></a>

<pre id="t-erMlQjFZI33ICyh3S7gHKz"><code>import time
from langgraph.cache.memory import InMemoryCache
from langgraph.func import entrypoint, task
from langgraph.types import CachePolicy

@task(cache_policy=CachePolicy(ttl=120))
def slow_add(x: int) -&gt; int:
time.sleep(1)
return x * 2

@entrypoint(cache=InMemoryCache())
def main(inputs: dict) -&gt; dict[str, int]:
result1 = slow_add(inputs["x"]).result()
result2 = slow_add(inputs["x"]).result()
return {"result1": result1, "result2": result2}

for chunk in main.stream({"x": 5}, stream_mode="updates"):
print(chunk)

#&gt; {'slow_add': 10}
#&gt; {'slow_add': 10, '__metadata__': {'cached': True}}
#&gt; {'main': {'result1': 10, 'result2': 10}}</code></pre>

<ol start="1"><li id="t-gfkFxyxLYAEJ99e3J8d0Yt"><span>ttl</span><span>以秒为单位指定。缓存将在此时间后失效。</span></li></ol>


<a id="section-1061"></a>
## 错误后恢复执行

<a id="t-XxAYxj74hcNYzIPJafhx9T"></a>

<pre id="t-ErFudlbXRws5lBxrjaKxMy"><code>import time
from langgraph.checkpoint.memory import InMemorySaver
from langgraph.func import entrypoint, task
from langgraph.types import StreamWriter

# This variable is just used for demonstration purposes to simulate a network failure.
# It's not something you will have in your actual code.
attempts = 0

@task()
def get_info():
"""
Simulates a task that fails once before succeeding.
Raises an exception on the first attempt, then returns "OK" on subsequent tries.
"""
global attempts
attempts += 1

if attempts &lt; 2:
raise ValueError("Failure") # Simulate a failure on the first attempt
return "OK"

# Initialize an in-memory checkpointer for persistence
checkpointer = InMemorySaver()

@task
def slow_task():
"""
Simulates a slow-running task by introducing a 1-second delay.
"""
time.sleep(1)
return "Ran slow task."

@entrypoint(checkpointer=checkpointer)
def main(inputs, writer: StreamWriter):
"""
Main workflow function that runs the slow_task and get_info tasks sequentially.

Parameters:
- inputs: Dictionary containing workflow input values.
- writer: StreamWriter for streaming custom data.

The workflow first executes `slow_task` and then attempts to execute `get_info`,
which will fail on the first invocation.
"""
slow_task_result = slow_task().result() # Blocking call to slow_task
get_info().result() # Exception will be raised here on the first attempt
return slow_task_result

# Workflow execution configuration with a unique thread identifier
config = {
"configurable": {
"thread_id": "1" # Unique identifier to track workflow execution
}
}

# This invocation will take ~1 second due to the slow_task execution
try:
# First invocation will raise an exception due to the `get_info` task failing
main.invoke({'any_input': 'foobar'}, config=config)
except ValueError:
pass # Handle the failure gracefully</code></pre>

<p id="t-6eZZLkSc1nusP4sjstrSIp"><span style="background-color:transparent">当我们恢复执行时，不需要重新运行</span><span style="background-color:transparent">slow_task</span><span style="background-color:transparent">，因为其结果已保存在检查点中。</span></p>

<pre id="t-xhmCZBOBLwATFLKaazM6PF"><code>main.invoke(None, config=config)</code></pre>

<pre id="t-FYTKP0tYdqfhi3cGIhAxTh"><code>'Ran slow task.'</code></pre>


<a id="section-1062"></a>
## 人在回路

<a id="t-5gAsp1uYHN5Gi6tdP1hVBH"></a>

<p id="t-M3a5P5gTRwURG6Z2BfKFIe"><span style="background-color:transparent">Functional API 支持使用 </span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">interrupt</span><span style="background-color:transparent"> 函数和 </span><span style="background-color:transparent">Command</span><span style="background-color:transparent"> 原语实现 </span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">人在回路</span><span style="background-color:transparent"> 工作流。</span></p>


<a id="section-1063"></a>
## 基本的人在回路工作流

<a id="t-3R022s3A62YVm4QPOwbjmH"></a>

<p id="t-hRPcdjIyy7hG3n7JKHdcRS"><span style="background-color:transparent">我们将创建三个 </span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">任务</span><span style="background-color:transparent">：</span></p>

<ol start="1"><li id="t-HUaNktD4CTju0Sp5ZSfiRP"><span>追加</span><span>"bar"</span><span>。</span></li></ol>

<ol start="2"><li id="t-cQLldMPmZPM7O9haVMghgx"><span>暂停等待人工输入。恢复时，追加人工输入。</span></li></ol>

<ol start="3"><li id="t-8UpUoLo24vOxATcvViDbmF"><span>追加</span><span>"qux"</span><span>。</span></li></ol>

<pre id="t-jmGrrEuRhDiA4GuOqGaLob"><code>from langgraph.func import entrypoint, task
from langgraph.types import Command, interrupt

@task
def step_1(input_query):
"""Append bar."""
return f"{input_query} bar"

@task
def human_feedback(input_query):
"""Append user input."""
feedback = interrupt(f"Please provide feedback: {input_query}")
return f"{input_query} {feedback}"

@task
def step_3(input_query):
"""Append qux."""
return f"{input_query} qux"</code></pre>

<p id="t-zZTwj1Vn7wD9ZKuYpefV35"><span style="background-color:transparent">现在，我们可以在一个 </span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">入口点</span><span style="background-color:transparent"> 中组合这些任务：</span></p>

<pre id="t-9GO8iUg1Sq1pwzs3LIV006"><code>from langgraph.checkpoint.memory import InMemorySaver

checkpointer = InMemorySaver()

@entrypoint(checkpointer=checkpointer)
def graph(input_query):
result_1 = step_1(input_query).result()
result_2 = human_feedback(result_1).result()
result_3 = step_3(result_2).result()

return result_3</code></pre>

<p id="t-DXJrWh98rHMK6qoe3ZUJz2"><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">interrupt()</span><span style="background-color:transparent"> 在任务内部被调用，使人工能够审查和编辑前一个任务的输出。先前任务（本例中为 </span><span style="background-color:transparent">step_1</span><span style="background-color:transparent">）的结果会被持久化，因此在 </span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">interrupt</span><span style="background-color:transparent"> 之后不会再次运行。</span></p>

<p id="t-gQQJUjVlFy3PwbBPdf5LkO"><span style="background-color:transparent">让我们发送一个查询字符串：</span></p>

<pre id="t-nYRllIVeF59mvjzo16rLFC"><code>config = {"configurable": {"thread_id": "1"}}

for event in graph.stream("foo", config):
print(event)
print("\n")</code></pre>

<p id="t-34psxyzepLWzQwizFQa6rA"><span style="background-color:transparent">注意，我们在</span><span style="background-color:transparent">step_1</span><span style="background-color:transparent">之后通过</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">interrupt</span><span style="background-color:transparent">暂停了。中断提供了恢复运行的指令。要恢复，我们发出一个包含</span><span style="background-color:transparent">human_feedback</span><span style="background-color:transparent">任务期望数据的</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">Command</span><span style="background-color:transparent">。</span></p>

<pre id="t-OinVHpO7h36rZ5rcTUFA3o"><code># Continue execution
for event in graph.stream(Command(resume="baz"), config):
print(event)
print("\n")</code></pre>

<p id="t-q0jrOstMTFQ4WA1XXbNYSs"><span style="background-color:transparent">恢复后，运行继续执行剩余步骤并按预期终止。</span></p>


<a id="section-1064"></a>
## 审查工具调用

<a id="t-p0DVxvx3Ztc44FfkmwSXXt"></a>

<p id="t-EqFv2xXoXDR3S8Kd4SuIrA"><span style="background-color:transparent">要在执行前审查工具调用，我们添加一个调用</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">interrupt</span><span style="background-color:transparent">的</span><span style="background-color:transparent">review_tool_call</span><span style="background-color:transparent">函数。当调用此函数时，执行将暂停，直到我们发出恢复命令。</span></p>

<p id="t-VSGu4kEBcGIF8d0GVnODS6"><span style="background-color:transparent">给定一个工具调用，我们的函数将</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">interrupt</span><span style="background-color:transparent">以等待人工审查。此时我们可以：</span></p>

<ul><li id="t-1bBYUTIYz67poRIBMLDsAS"><span>接受工具调用</span></li></ul>

<ul><li id="t-k96uDKofNis1y9UGZDYemW"><span>修改工具调用并继续</span></li></ul>

<ul><li id="t-NzNDVzqRXAumHuZFSUEMMS"><span>生成自定义工具消息（例如，指示模型重新格式化其工具调用）</span></li></ul>

<pre id="t-MoFpmH65xWL8JkrNx8mvMJ"><code>from typing import Union

def review_tool_call(tool_call: ToolCall) -&gt; Union[ToolCall, ToolMessage]:
"""Review a tool call, returning a validated version."""
human_review = interrupt(
{
"question": "Is this correct?",
"tool_call": tool_call,
}
)
review_action = human_review["action"]
review_data = human_review.get("data")
if review_action == "continue":
return tool_call
elif review_action == "update":
updated_tool_call = {**tool_call, **{"args": review_data}}
return updated_tool_call
elif review_action == "feedback":
return ToolMessage(
content=review_data, name=tool_call["name"], tool_call_id=tool_call["id"]
)</code></pre>

<p id="t-uiFS8RpECC6Z3cgZntAPHe"><span style="background-color:transparent">现在我们可以更新我们的 </span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">入口点</span><span style="background-color:transparent"> 来审查生成的工具调用。如果工具调用被接受或修改，我们像以前一样执行。否则，我们只追加人工提供的 </span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">ToolMessage</span><span style="background-color:transparent">。先前任务（本例中是初始模型调用）的结果会被持久化，因此在 </span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">interrupt</span><span style="background-color:transparent"> 之后不会再次运行。</span></p>

<pre id="t-ywclTeQ78uaavrPFvhI3wH"><code>from langgraph.checkpoint.memory import InMemorySaver
from langgraph.graph.message import add_messages
from langgraph.types import Command, interrupt

checkpointer = InMemorySaver()

@entrypoint(checkpointer=checkpointer)
def agent(messages, previous):
if previous is not None:
messages = add_messages(previous, messages)

model_response = call_model(messages).result()
while True:
if not model_response.tool_calls:
break

# Review tool calls
tool_results = []
tool_calls = []
for i, tool_call in enumerate(model_response.tool_calls):
review = review_tool_call(tool_call)
if isinstance(review, ToolMessage):
tool_results.append(review)
else: # is a validated tool call
tool_calls.append(review)
if review != tool_call:
model_response.tool_calls[i] = review  # update message

# Execute remaining tool calls
tool_result_futures = [call_tool(tool_call) for tool_call in tool_calls]
remaining_tool_results = [fut.result() for fut in tool_result_futures]

# Append to message list
messages = add_messages(
messages,
[model_response, *tool_results, *remaining_tool_results],
)

# Call model again
model_response = call_model(messages).result()

# Generate final response
messages = add_messages(messages, model_response)
return entrypoint.final(value=model_response, save=messages)</code></pre>


<a id="section-1065"></a>
## 短期记忆

<a id="t-WxxPxcVr3hGkIJFFWEEoEg"></a>

<p id="t-Kw5uJSvOmFzvciFa5W2bR0"><span style="background-color:transparent">短期记忆允许跨同一 </span><span style="font-weight:bold;background-color:transparent">线程 ID</span><span style="background-color:transparent"> 的不同 </span><span style="font-weight:bold;background-color:transparent">调用</span><span style="background-color:transparent"> 存储信息。更多详情请参阅 </span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">短期记忆</span><span style="background-color:transparent">。</span></p>


<a id="section-1066"></a>
## 管理检查点

<a id="t-hvtErgYbsuUNCOND62g3qy"></a>

<p id="t-jKLHYPyNtpNgTu4HZajQM6"><span style="background-color:transparent">您可以查看和删除检查点存储器存储的信息。</span></p>

<a id="t-qt6qgqTzZPWpjTi4ddc0Ok"></a>

##### 查看线程状态

<pre id="t-BIzH9eUY1NwFsz4xP1Y1By"><code>config = {
"configurable": {
"thread_id": "1",
# optionally provide an ID for a specific checkpoint,
# otherwise the latest checkpoint is shown
# "checkpoint_id": "1f029ca3-1f5b-6704-8004-820c16b69a5a"  #

}
}
graph.get_state(config)</code></pre>

<pre id="t-Y86XGc42AgeTqMDNghxrWj"><code>StateSnapshot(
values={'messages': [HumanMessage(content="hi! I'm bob"), AIMessage(content='Hi Bob! How are you doing today?), HumanMessage(content="what's my name?"), AIMessage(content='Your name is Bob.')]}, next=(),
config={'configurable': {'thread_id': '1', 'checkpoint_ns': '', 'checkpoint_id': '1f029ca3-1f5b-6704-8004-820c16b69a5a'}},
metadata={
'source': 'loop',
'writes': {'call_model': {'messages': AIMessage(content='Your name is Bob.')}},
'step': 4,
'parents': {},
'thread_id': '1'
},
created_at='2025-05-05T16:01:24.680462+00:00',
parent_config={'configurable': {'thread_id': '1', 'checkpoint_ns': '', 'checkpoint_id': '1f029ca3-1790-6b0a-8003-baf965b6a38f'}},
tasks=(),
interrupts=()
)</code></pre>

<a id="t-irFYPX1df1LQ8NfweQ7tIM"></a>

##### 查看线程的历史记录

<pre id="t-vWTuTl3U4dxVYHNxc1QiOG"><code>config = {
"configurable": {
"thread_id": "1"
}
}
list(graph.get_state_history(config))</code></pre>

<pre id="t-dR7CsvAnJhLXbQTs80o0BN"><code>[
StateSnapshot(
values={'messages': [HumanMessage(content="hi! I'm bob"), AIMessage(content='Hi Bob! How are you doing today? Is there anything I can help you with?'), HumanMessage(content="what's my name?"), AIMessage(content='Your name is Bob.')]},
next=(),
config={'configurable': {'thread_id': '1', 'checkpoint_ns': '', 'checkpoint_id': '1f029ca3-1f5b-6704-8004-820c16b69a5a'}},
metadata={'source': 'loop', 'writes': {'call_model': {'messages': AIMessage(content='Your name is Bob.')}}, 'step': 4, 'parents': {}, 'thread_id': '1'},
created_at='2025-05-05T16:01:24.680462+00:00',
parent_config={'configurable': {'thread_id': '1', 'checkpoint_ns': '', 'checkpoint_id': '1f029ca3-1790-6b0a-8003-baf965b6a38f'}},
tasks=(),
interrupts=()
),
StateSnapshot(
values={'messages': [HumanMessage(content="hi! I'm bob"), AIMessage(content='Hi Bob! How are you doing today? Is there anything I can help you with?'), HumanMessage(content="what's my name?")]},
next=('call_model',),
config={'configurable': {'thread_id': '1', 'checkpoint_ns': '', 'checkpoint_id': '1f029ca3-1790-6b0a-8003-baf965b6a38f'}},
metadata={'source': 'loop', 'writes': None, 'step': 3, 'parents': {}, 'thread_id': '1'},
created_at='2025-05-05T16:01:23.863421+00:00',
parent_config={...}
tasks=(PregelTask(id='8ab4155e-6b15-b885-9ce5-bed69a2c305c', name='call_model', path=('__pregel_pull', 'call_model'), error=None, interrupts=(), state=None, result={'messages': AIMessage(content='Your name is Bob.')}),),
interrupts=()
),
StateSnapshot(
values={'messages': [HumanMessage(content="hi! I'm bob"), AIMessage(content='Hi Bob! How are you doing today? Is there anything I can help you with?')]},
next=('__start__',),
config={...},
metadata={'source': 'input', 'writes': {'__start__': {'messages': [{'role': 'user', 'content': "what's my name?"}]}}, 'step': 2, 'parents': {}, 'thread_id': '1'},
created_at='2025-05-05T16:01:23.863173+00:00',
parent_config={...}
tasks=(PregelTask(id='24ba39d6-6db1-4c9b-f4c5-682aeaf38dcd', name='__start__', path=('__pregel_pull', '__start__'), error=None, interrupts=(), state=None, result={'messages': [{'role': 'user', 'content': "what's my name?"}]}),),
interrupts=()
),
StateSnapshot(
values={'messages': [HumanMessage(content="hi! I'm bob"), AIMessage(content='Hi Bob! How are you doing today? Is there anything I can help you with?')]},
next=(),
config={...},
metadata={'source': 'loop', 'writes': {'call_model': {'messages': AIMessage(content='Hi Bob! How are you doing today? Is there anything I can help you with?')}}, 'step': 1, 'parents': {}, 'thread_id': '1'},
created_at='2025-05-05T16:01:23.862295+00:00',
parent_config={...}
tasks=(),
interrupts=()
),
StateSnapshot(
values={'messages': [HumanMessage(content="hi! I'm bob")]},
next=('call_model',),
config={...},
metadata={'source': 'loop', 'writes': None, 'step': 0, 'parents': {}, 'thread_id': '1'},
created_at='2025-05-05T16:01:22.278960+00:00',
parent_config={...}
tasks=(PregelTask(id='8cbd75e0-3720-b056-04f7-71ac805140a0', name='call_model', path=('__pregel_pull', 'call_model'), error=None, interrupts=(), state=None, result={'messages': AIMessage(content='Hi Bob! How are you doing today? Is there anything I can help you with?')}),),
interrupts=()
),
StateSnapshot(
values={'messages': []},
next=('__start__',),
config={'configurable': {'thread_id': '1', 'checkpoint_ns': '', 'checkpoint_id': '1f029ca3-0870-6ce2-bfff-1f3f14c3e565'}},
metadata={'source': 'input', 'writes': {'__start__': {'messages': [{'role': 'user', 'content': "hi! I'm bob"}]}}, 'step': -1, 'parents': {}, 'thread_id': '1'},
created_at='2025-05-05T16:01:22.277497+00:00',
parent_config=None,
tasks=(PregelTask(id='d458367b-8265-812c-18e2-33001d199ce6', name='__start__', path=('__pregel_pull', '__start__'), error=None, interrupts=(), state=None, result={'messages': [{'role': 'user', 'content': "hi! I'm bob"}]}),),
interrupts=()
)
]</code></pre>


<a id="section-1067"></a>
## 分离返回值与保存值

<a id="t-Xe7eQj0waFiA3sZyYtdys4"></a>

<p id="t-XLgS88bSWYFEaSQSk2Fb7l"><span style="background-color:transparent">使用</span><span style="background-color:transparent">entrypoint.final</span><span style="background-color:transparent">可以将返回给调用者的内容与保存在检查点中的内容分离开来。这在以下情况下很有用：</span></p>

<ul><li id="t-bDjXnwicH5evSvkTPyMwoi"><span>您想返回一个计算结果（例如，摘要或状态），但保存一个不同的内部值供下次调用使用。</span></li></ul>

<ul><li id="t-szbfxZYQObX8cSQITFGGww"><span>您需要控制下一次运行时传递给前一个参数的内容。</span></li></ul>

<pre id="t-5BYNWHzr1rTD7zeqfFQ5td"><code>from langgraph.func import entrypoint
from langgraph.checkpoint.memory import InMemorySaver

checkpointer = InMemorySaver()

@entrypoint(checkpointer=checkpointer)
def accumulate(n: int, *, previous: int | None) -&gt; entrypoint.final[int, int]:
previous = previous or 0
total = previous + n
# Return the *previous* value to the caller but save the *new* total to the checkpoint.
return entrypoint.final(value=previous, save=total)

config = {"configurable": {"thread_id": "my-thread"}}

print(accumulate.invoke(1, config=config)) # 0
print(accumulate.invoke(2, config=config)) # 1
print(accumulate.invoke(3, config=config)) # 3</code></pre>


<a id="section-1068"></a>
## 聊天机器人示例

<a id="t-96pYw6SnPfojvxaYy6I4Qv"></a>

<p id="t-SdXw9S1XvxmrCANcXaZMi3"><span style="background-color:transparent">一个使用 Functional API 和</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">InMemorySaver</span><span style="background-color:transparent">检查点存储器的简单聊天机器人示例。</span></p>

<p id="t-1CSQq6939K66oJcMsKoHEq"><span style="background-color:transparent">该机器人能够记住之前的对话并从上次中断的地方继续。</span></p>

<pre id="t-l282v4PdguJK5Rl7BiME7C"><code>from langchain.messages import BaseMessage
from langgraph.graph import add_messages
from langgraph.func import entrypoint, task
from langgraph.checkpoint.memory import InMemorySaver
from langchain_anthropic import ChatAnthropic

model = ChatAnthropic(model="claude-sonnet-4-5-20250929")

@task
def call_model(messages: list[BaseMessage]):
response = model.invoke(messages)
return response

checkpointer = InMemorySaver()

@entrypoint(checkpointer=checkpointer)
def workflow(inputs: list[BaseMessage], *, previous: list[BaseMessage]):
if previous:
inputs = add_messages(previous, inputs)

response = call_model(inputs).result()
return entrypoint.final(value=response, save=add_messages(inputs, response))

config = {"configurable": {"thread_id": "1"}}
input_message = {"role": "user", "content": "hi! I'm bob"}
for chunk in workflow.stream([input_message], config, stream_mode="values"):
chunk.pretty_print()

input_message = {"role": "user", "content": "what's my name?"}
for chunk in workflow.stream([input_message], config, stream_mode="values"):
chunk.pretty_print()</code></pre>


<a id="section-1069"></a>
## 长期记忆

<a id="t-xZeb7mryJqJUzRfmMYBNRg"></a>

<p id="t-mzx6JCcAB97O3bcAIrxrNT"><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">长期记忆</span><span style="background-color:transparent"> 允许跨不同的 </span><span style="font-weight:bold;background-color:transparent">线程 ID</span><span style="background-color:transparent"> 存储信息。这对于在一次对话中学习关于特定用户的信息并在另一次对话中使用它可能很有用。</span></p>


<a id="section-1070"></a>
## 工作流

<a id="t-gldHl5KtWdQebTQ4pl7Mr4"></a>

<ul><li id="t-9fVX4nOPZjwfLYJ9Xg1i6N"><span style="border-bottom:1px solid;font-weight:bold">工作流和智能体</span><span> 指南，获取更多关于如何使用 Functional API 构建工作流的示例。</span></li></ul>


<a id="section-1071"></a>
## 与其他库集成

<a id="t-YV9ZXI5tqQ1CGrFAWvhaLP"></a>

<ul><li id="t-ZDXyRuSlSvm1JzBPTR0noT"><span style="border-bottom:1px solid;font-weight:bold">使用 Functional API 将 LangGraph 的功能添加到其他框架</span><span>：将 LangGraph 的功能（如持久化、记忆和流式传输）添加到其他默认不提供这些功能的智能体框架中。</span></li></ul>


<a id="section-1072"></a>
## LangGraph 运行时

<a id="t-block-18997"></a>

<p id="t-dO72VPdz2lH31iHkWDlyaF"><span style="border-bottom:1px solid;font-weight:bold">Pregel</span><span> 实现了 LangGraph 的运行时，负责管理 LangGraph 应用程序的执行。</span></p>

<p id="t-Z8ImWXAk4U1gspGLZ1FCP9"><span>编译一个 </span><span style="border-bottom:1px solid;font-weight:bold">StateGraph</span><span> 或创建一个 </span><span style="border-bottom:1px solid;font-weight:bold">@entrypoint</span><span> 会产生一个 </span><span style="border-bottom:1px solid;font-weight:bold">Pregel</span><span> 实例，该实例可以通过输入来调用。</span></p>

<p id="t-lDIJAi9tDCCg1llDtvMDlp"><span>本指南从高层次解释了该运行时，并提供了直接使用 Pregel 实现应用程序的说明。</span></p>

<blockquote id="t-ipxXM12lnsvMjFNA79MAXR"><span style="font-weight:bold">注意：</span><span style="border-bottom:1px solid;font-weight:bold">Pregel</span><span> 运行时以 </span><span style="border-bottom:1px solid;font-weight:bold">Google 的 Pregel 算法</span><span> 命名，该算法描述了一种使用图进行大规模并行计算的高效方法。</span></blockquote>


<a id="section-1073"></a>
## 概述 (Overview)

<a id="t-LBDZT3ocU4fotAoSPTvGql"></a>

<p id="t-vuOd24KcBTBDm7T8cByD7h"><span>在 LangGraph 中，Pregel 将 </span><span style="border-bottom:1px solid;font-weight:bold">参与者 (actors)</span><span> 和 </span><span style="font-weight:bold">通道 (channels)</span><span> 组合到一个应用程序中。</span><span style="font-weight:bold">参与者</span><span> 从通道读取数据并向通道写入数据。Pregel 按照 </span><span style="font-weight:bold">Pregel 算法 (Pregel Algorithm)</span><span>/</span><span style="font-weight:bold">批量同步并行 (Bulk Synchronous Parallel)</span><span> 模型将应用程序的执行组织成多个步骤。</span></p>

<p id="t-ofR0zypfJV7vjecJoXbB9g"><span>每个步骤包含三个阶段：</span></p>

<ul><li id="t-9uav3PZWiqbuliCgqBFFBJ"><span style="font-weight:bold">规划 (Plan)</span><span>：确定在此步骤中要执行哪些</span><span style="font-weight:bold">参与者</span><span>。例如，在第一步中，选择订阅特殊</span><span style="font-weight:bold">输入 (input)</span><span>通道的</span><span style="font-weight:bold">参与者</span><span>；在后续步骤中，选择订阅了上一步中更新的通道的</span><span style="font-weight:bold">参与者</span><span>。</span></li></ul>

<ul><li id="t-5IVzte8ow9fuoQTH0Pr8lG"><span style="font-weight:bold">执行 (Execution)</span><span>：并行执行所有选定的</span><span style="font-weight:bold">参与者</span><span>，直到全部完成，或其中一个失败，或达到超时。在此阶段，通道的更新对参与者不可见，直到下一个步骤。</span></li></ul>

<ul><li id="t-0tWLauvWKgXtgplgZs6qsB"><span style="font-weight:bold">更新 (Update)</span><span>：用此步骤中</span><span style="font-weight:bold">参与者</span><span>写入的值更新通道。</span></li></ul>

<p id="t-mQ6rmJDYZOmHcngABnE9VP"><span>重复此过程，直到没有</span><span style="font-weight:bold">参与者</span><span>被选中执行，或达到最大步骤数。</span></p>


<a id="section-1074"></a>
## 参与者 (Actors)

<a id="t-mo5MQRt7SNjzgcLAIToPbD"></a>

<p id="t-lAox7UVJjzdM8xnEsSP9JS"><span>一个</span><span style="font-weight:bold">参与者</span><span>就是一个</span><span>PregelNode</span><span>。它订阅通道，从中读取数据，并向其写入数据。可以将其视为 Pregel 算法中的</span><span style="font-weight:bold">参与者</span><span>。</span><span>PregelNode</span><span>实现了 LangChain 的 Runnable 接口。</span></p>


<a id="section-1075"></a>
## 通道 (Channels)

<a id="t-thxQ5QCbsztxYjHyj2meKU"></a>

<p id="t-gQ359fFdb2xtrkXryFuOe7"><span>通道用于在参与者 (PregelNodes) 之间进行通信。每个通道都有一个值类型、一个更新类型和一个更新函数——该函数接收一系列更新并修改存储的值。通道可用于将数据从一个链发送到另一个链，或者用于在未来的步骤中将数据从一个链发送到自身。LangGraph 提供了许多内置通道：</span></p>

<ul><li id="t-exj1caIWlE1gMZZ60pbyfe"><span style="border-bottom:1px solid;font-weight:bold">LastValue</span><span>：默认通道，存储发送到通道的最后一个值，适用于输入和输出值，或用于将数据从一个步骤发送到下一个步骤。</span></li></ul>

<ul><li id="t-xKFKnJXF3lYAijpIf7EkkP"><span style="border-bottom:1px solid;font-weight:bold">Topic</span><span>：一个可配置的发布-订阅主题，适用于在</span><span style="font-weight:bold">参与者</span><span>之间发送多个值，或用于累积输出。可以配置为去重或在多个步骤过程中累积值。</span></li></ul>

<ul><li id="t-IQXOTuSpQNUgHuGPVK9EkQ"><span style="border-bottom:1px solid;font-weight:bold">BinaryOperatorAggregate</span><span>：存储一个持久值，通过对当前值和发送到通道的每个更新应用二元运算符来更新，适用于跨多个步骤计算聚合；例如，</span><span>total = BinaryOperatorAggregate(int, operator.add)</span></li></ul>


<a id="section-1076"></a>
## 示例 (Examples)

<a id="t-8LwNTVwUWd2e0aCZ59Zw0K"></a>

<p id="t-VaZacCCsuMkC7OPUK6aPTy"><span>虽然大多数用户将通过 </span><span style="border-bottom:1px solid;font-weight:bold">StateGraph</span><span> API 或 </span><span style="border-bottom:1px solid;font-weight:bold">@entrypoint</span><span> 装饰器与 Pregel 交互，但也可以直接与 Pregel 交互。</span></p>

<p id="t-MbuiXJNBN1O1tzQm2aFwjH"><span>以下是几个不同的示例，让您了解 Pregel API。</span></p>

<p id="t-POupIWheu7PUW3jPqYIlXg"><span style="border-bottom:1px solid;font-weight:bold">单节点 (Single node)</span></p>

<pre id="t-QCvRHQuDzXnoBvnD2aNRe8"><code>from langgraph.channels import EphemeralValue
from langgraph.pregel import Pregel, NodeBuilder

node1 = (
NodeBuilder().subscribe_only("a")
.do(lambda x: x + x)
.write_to("b")
)

app = Pregel(
nodes={"node1": node1},
channels={
"a": EphemeralValue(str),
"b": EphemeralValue(str),
},
input_channels=["a"],
output_channels=["b"],
)

app.invoke({"a": "foo"})</code></pre>

<pre id="t-qP7dzd0F7SfU3SO9TrYINp"><code>{'b': 'foofoo'}</code></pre>

<p id="t-rp3HEaNZ146dfwHfDFfd0E"><span style="border-bottom:1px solid;font-weight:bold">多节点 (Multiple nodes)</span></p>

<pre id="t-IXdesfa3NAzzuNKp36WpqE"><code>from langgraph.channels import LastValue, EphemeralValue
from langgraph.pregel import Pregel, NodeBuilder

node1 = (
    NodeBuilder().subscribe_only("a")
 .do(lambda x: x + x)
 .write_to("b")
)

node2 = (
    NodeBuilder().subscribe_only("b")
 .do(lambda x: x + x)
 .write_to("c")
)

app = Pregel(
    nodes={"node1": node1, "node2": node2},
    channels={
 "a": EphemeralValue(str),
 "b": LastValue(str),
 "c": EphemeralValue(str),
 },
    input_channels=["a"],
    output_channels=["b", "c"],
)

app.invoke({"a": "foo"})</code></pre>

<p id="t-DHdyaCUL7hDD8BOh4kEVmR"><span style="border-bottom:1px solid;font-weight:bold">主题 (Topic)</span></p>

<pre id="t-aleHPSQ7ORnpK1U19egZx6"><code>from langgraph.channels import EphemeralValue, Topic
from langgraph.pregel import Pregel, NodeBuilder

node1 = (
    NodeBuilder().subscribe_only("a")
 .do(lambda x: x + x)
 .write_to("b", "c")
)

node2 = (
    NodeBuilder().subscribe_to("b")
 .do(lambda x: x["b"] + x["b"])
 .write_to("c")
)

app = Pregel(
    nodes={"node1": node1, "node2": node2},
    channels={
 "a": EphemeralValue(str),
 "b": EphemeralValue(str),
 "c": Topic(str, accumulate=True),
 },
    input_channels=["a"],
    output_channels=["c"],
)

app.invoke({"a": "foo"})</code></pre>

<p id="t-p5Jy3gzRpcu5CbPjFpTQSx"><span style="border-bottom:1px solid;font-weight:bold">二元运算符聚合 (BinaryOperatorAggregate)</span></p>

<p id="t-2pgHAwS8kw4rMcF44l3pft"><span style="background-color:transparent">本示例演示了如何使用 </span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">BinaryOperatorAggregate</span><span style="background-color:transparent"> 通道来实现一个归约器 (reducer)。</span></p>

<pre id="t-wH6UdzVSm3s7ZaWnUV72gn"><code>from langgraph.channels import EphemeralValue, BinaryOperatorAggregate
from langgraph.pregel import Pregel, NodeBuilder

node1 = (
    NodeBuilder().subscribe_only("a")
 .do(lambda x: x + x)
 .write_to("b", "c")
)

node2 = (
    NodeBuilder().subscribe_only("b")
 .do(lambda x: x + x)
 .write_to("c")
)

def reducer(current, update):
 if current:
 return current + " | " + update
 else:
 return update

app = Pregel(
    nodes={"node1": node1, "node2": node2},
    channels={
 "a": EphemeralValue(str),
 "b": EphemeralValue(str),
 "c": BinaryOperatorAggregate(str, operator=reducer),
 },
    input_channels=["a"],
    output_channels=["c"],
)

app.invoke({"a": "foo"})</code></pre>

<p id="t-wDXgHsQS1tATsDnZEHGHky"><span style="border-bottom:1px solid;font-weight:bold">循环 (Cycle)</span></p>

<p id="t-c7W3AP25O1MEmYwfWMRvnF"><span style="background-color:transparent">此示例演示了如何通过让一个链向其订阅的通道写入数据，从而在图中引入循环。执行将持续进行，直到向通道写入 </span><span>None</span><span style="background-color:transparent"> 值。</span></p>

<pre id="t-N26PCmBsygsevb56podcTB"><code>from langgraph.channels import EphemeralValue
from langgraph.pregel import Pregel, NodeBuilder, ChannelWriteEntry

example_node = (
    NodeBuilder().subscribe_only("value")
 .do(lambda x: x + x if len(x) &lt; 10 else None)
 .write_to(ChannelWriteEntry("value", skip_none=True))
)

app = Pregel(
    nodes={"example_node": example_node},
    channels={
 "value": EphemeralValue(str),
 },
    input_channels=["value"],
    output_channels=["value"],
)

app.invoke({"value": "a"})</code></pre>


<a id="section-1077"></a>
## 高级 API (High-level API)

<a id="t-ybmjtwZ41AoixfzEU3wXiG"></a>

<p id="t-SyKOV9mQUDUK1vMVtt2fGj"><span>LangGraph 提供了两个用于创建 Pregel 应用程序的高级 API：</span><span style="border-bottom:1px solid;font-weight:bold">StateGraph (图 API)</span><span> 和 </span><span style="border-bottom:1px solid;font-weight:bold">函数式 API (Functional API)</span><span>。</span></p>

<p id="t-SFylfXUEXnndH4RzwNVHNU"><span style="border-bottom:1px solid;font-weight:bold">StateGraph (图 API)</span></p>

<p id="t-X0yptXYTvzBhTcavti0BVl"><span style="border-bottom:1px solid;font-weight:bold">函数式 API (Functional API)</span></p>

<p id="t-128m87BI94c0bGgD59bu6D"><span style="border-bottom:1px solid;font-weight:bold">StateGraph (图 API)</span><span> 是一个更高级别的抽象，它简化了 Pregel 应用程序的创建。它允许您定义节点和边的图。当您编译图时，StateGraph API 会自动为您创建 Pregel 应用程序。</span></p>

<pre id="t-8GvUQYLZbL3Y9FnJHK8XXG"><code>from typing import TypedDict

from langgraph.constants import START
from langgraph.graph import StateGraph

class Essay(TypedDict):
topic: str
content: str | None
score: float | None

def write_essay(essay: Essay):
return {
"content": f"Essay about {essay['topic']}",
}

def score_essay(essay: Essay):
return {
"score": 10
}

builder = StateGraph(Essay)
builder.add_node(write_essay)
builder.add_node(score_essay)
builder.add_edge(START, "write_essay")
builder.add_edge("write_essay", "score_essay")

# 编译图。
# 这将返回一个 Pregel 实例。
graph = builder.compile()</code></pre>

<p id="t-EbteOdb92fG5P86Dri58hX"><span>编译后的 Pregel 实例将与一系列节点和通道相关联。您可以通过打印它们来检查节点和通道。</span></p>

<pre id="t-ajboIBDRsRFdVjv7suFAu7"><code>print(graph.nodes)</code></pre>

<p id="t-fXVlGLb5VYmBylyj46I4bm"><span>您将看到类似这样的内容：</span></p>

<pre id="t-GzXuHhP0ExqbSRxhXo72hw"><code>{'__start__': &lt;langgraph.pregel.read.PregelNode at 0x7d05e3ba1810&gt;,
'write_essay': &lt;langgraph.pregel.read.PregelNode at 0x7d05e3ba14d0&gt;,
'score_essay': &lt;langgraph.pregel.read.PregelNode at 0x7d05e3ba1710&gt;}</code></pre>

<pre id="t-Oa4Rvpi3PZmMc5MFOxedPg"><code>print(graph.channels)</code></pre>

<p id="t-h3ZrxDjTvDu5P08YdVv1ba"><span>您将看到类似这样的内容：</span></p>

<pre id="t-xwjLrKkVI3RoExHtZA1ror"><code>{'topic': &lt;langgraph.channels.last_value.LastValue at 0x7d05e3294d80&gt;,
'content': &lt;langgraph.channels.last_value.LastValue at 0x7d05e3295040&gt;,
'score': &lt;langgraph.channels.last_value.LastValue at 0x7d05e3295980&gt;,
'__start__': &lt;langgraph.channels.ephemeral_value.EphemeralValue at 0x7d05e3297e00&gt;,
'write_essay': &lt;langgraph.channels.ephemeral_value.EphemeralValue at 0x7d05e32960c0&gt;,
'score_essay': &lt;langgraph.channels.ephemeral_value.EphemeralValue at 0x7d05e2d8ab80&gt;,
'branch:__start__:__self__:write_essay': &lt;langgraph.channels.ephemeral_value.EphemeralValue at 0x7d05e32941c0&gt;,
'branch:__start__:__self__:score_essay': &lt;langgraph.channels.ephemeral_value.EphemeralValue at 0x7d05e2d88800&gt;,
'branch:write_essay:__self__:write_essay': &lt;langgraph.channels.ephemeral_value.EphemeralValue at 0x7d05e3295ec0&gt;,
'branch:write_essay:__self__:score_essay': &lt;langgraph.channels.ephemeral_value.EphemeralValue at 0x7d05e2d8ac00&gt;,
'branch:score_essay:__self__:write_essay': &lt;langgraph.channels.ephemeral_value.EphemeralValue at 0x7d05e2d89700&gt;,
'branch:score_essay:__self__:score_essay': &lt;langgraph.channels.ephemeral_value.EphemeralValue at 0x7d05e2d8b400&gt;,
'start:write_essay': &lt;langgraph.channels.ephemeral_value.EphemeralValue at 0x7d05e2d8b280&gt;}</code></pre>


<a id="section-1080"></a>
## 应用结构

<a id="t-block-19049"></a>

<p id="t-EBUhvOlQUdea5BcdCCnsWU"><span style="background-color:transparent">一个 LangGraph 应用由一个或多个图、一个配置文件 (</span><span style="background-color:transparent">langgraph.json</span><span style="background-color:transparent">)、一个指定依赖项的文件以及一个可选的用于指定环境变量的 </span><span style="background-color:transparent">.env</span><span style="background-color:transparent"> 文件组成。</span></p>

<p id="t-7pOc5J6Eg4HUoMCOEOPfDN"><span style="background-color:transparent">本指南展示了一个应用的典型结构，并说明如何提供所需的配置，以便通过 </span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">LangSmith 部署</span><span style="background-color:transparent"> 来部署应用。</span></p>

<p id="t-WJEkXiOzuVrJYj1ZhQFftl"><span>LangSmith 部署是一个用于部署和扩展 LangGraph 智能体的托管平台。它处理基础设施、扩展和运维问题，因此您可以直接从代码仓库部署有状态、长时间运行的智能体。在 </span><span style="border-bottom:1px solid;font-weight:bold">部署文档</span><span> 中了解更多信息。</span></p>


<a id="section-1081"></a>
## 关键概念

<a id="t-sVclmDgAOSIspYiYm0Hj0n"></a>

<p id="t-dw3FXhms9VrG7kaV6vg0TC"><span style="background-color:transparent">要使用 LangSmith 进行部署，需要提供以下信息：</span></p>

<ol start="1"><li id="t-a4GmglBmX89WccWzJLoych"><span>一个 </span><span style="border-bottom:1px solid;font-weight:bold">LangGraph 配置文件</span><span> (</span><span>langgraph.json</span><span>)，用于指定应用的依赖项、图和环境变量。</span></li></ol>

<ol start="2"><li id="t-Hm2dTeUKhQsdo4M2Snw1pt"><span>实现应用逻辑的 </span><span style="border-bottom:1px solid;font-weight:bold">图</span><span>。</span></li></ol>

<ol start="3"><li id="t-wWHROqFgbLadmMgIfEIEXS"><span>一个指定运行应用所需的 </span><span style="border-bottom:1px solid;font-weight:bold">依赖项</span><span> 的文件。</span></li></ol>

<ol start="4"><li id="t-C7Nkd9Ys8ggJtH34U1ifI9"><span>应用运行所需的 </span><span style="border-bottom:1px solid;font-weight:bold">环境变量</span><span>。</span></li></ol>


<a id="section-1082"></a>
## 文件结构

<a id="t-L3xefdJk3aOFLAuDDJHGV5"></a>

<p id="t-bFKgS60ELGc36QqAofzHrd"><span style="background-color:transparent">以下是应用目录结构的示例：</span></p>

<p id="t-x34dr2IbrY8iICwkex48TE"><span style="border-bottom:1px solid;font-weight:bold">Python (requirements.txt)</span></p>

<p id="t-i9MowQJb5RXmy4YNT1PWFz"><span style="border-bottom:1px solid;font-weight:bold">Python (pyproject.toml)</span></p>

<pre id="t-j5ZwbQHm5M8hMVAiv4KX85"><code>my-app/
├── my_agent # 所有项目代码都在这里
│   ├── utils # 图的工具函数
│   │   ├── __init__.py
│   │   ├── tools.py # 图的工具
│   │   ├── nodes.py # 图的节点函数
│   │   └── state.py # 图的状态定义
│   ├── __init__.py
│   └── agent.py # 构建图的代码
├── .env # 环境变量
├── requirements.txt # 包依赖项
└── langgraph.json # LangGraph 配置文件</code></pre>

<p id="t-C1u0OxCgun4WpNYR14n5XC"><span>LangGraph 应用的目录结构可能因使用的编程语言和包管理器而异。</span></p>


<a id="section-1083"></a>
## 配置文件

<a id="t-spXFUsNaxpsh7VziiFlPww"></a>

<p id="t-Zpw5hfIhlAnBnOXQIRJjNv"><span style="background-color:transparent">langgraph.json</span><span style="background-color:transparent">文件是一个 JSON 文件，用于指定部署 LangGraph 应用所需的依赖项、图、环境变量和其他设置。</span></p>

<p id="t-KhBZneZvJLa9QL3ybck9od"><span style="background-color:transparent">有关 JSON 文件中所有支持键的详细信息，请参阅 </span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">LangGraph 配置文件参考</span><span style="background-color:transparent">。</span></p>

<p id="t-848YtQAoyiZZGjWy92ENtU"><span style="border-bottom:1px solid;font-weight:bold">LangGraph CLI</span><span> 默认使用当前目录下的配置文件 </span><span>langgraph.json</span><span>。</span></p>


<a id="section-1084"></a>
## 示例

<a id="t-Bh8RMb4G996pJylVasTuHi"></a>

<ul><li id="t-uCjXc6F096WndStRjG3LVY"><span>依赖项涉及一个自定义的本地包和</span><span>langchain_openai</span><span>包。</span></li></ul>

<ul><li id="t-nFXkpTWKPJiN2JlIrLDXnc"><span>将从文件</span><span>./your_package/your_file.py</span><span>中加载一个图，变量名为</span><span>variable</span><span>。</span></li></ul>

<ul><li id="t-ivuFxjIZDFhsR8bf7Gx5jO"><span>环境变量从</span><span>.env</span><span>文件加载。</span></li></ul>

<pre id="t-uJ1wK6Przz1IJB2PQdTigh"><code>{
"dependencies": ["langchain_openai", "./your_package"],
"graphs": {
"my_agent": "./your_package/your_file.py:agent"
},
"env": "./.env"
}</code></pre>


<a id="section-1085"></a>
## 依赖项

<a id="t-cOpNBcJsiSinY1CCN97ln7"></a>

<p id="t-63GhxXjS961QxhRqgrJA6S"><span style="background-color:transparent">LangGraph 应用可能依赖于其他 Python 包。</span></p>

<p id="t-uAtW2QPypKnPoCoyxGoN54"><span style="background-color:transparent">通常，您需要指定以下信息以正确设置依赖项：</span></p>

<ol start="1"><li id="t-DSpZMi65NR8Nyl1YydCWdG"><span>目录中指定依赖项的文件（例如</span><span>requirements.txt</span><span>、</span><span>pyproject.toml</span><span>或</span><span>package.json</span><span>）。</span></li></ol>

<ol start="2"><li id="t-YCh3DJPBgeAhwBUBdevZno"><span style="border-bottom:1px solid;font-weight:bold">LangGraph 配置文件</span><span> 中的 </span><span>dependencies</span><span> 键，用于指定运行 LangGraph 应用所需的依赖项。</span></li></ol>

<ol start="3"><li id="t-4tGytySDhy6g4kv3D4V0QB"><span>任何额外的二进制文件或系统库都可以使用 </span><span style="border-bottom:1px solid;font-weight:bold">LangGraph 配置文件</span><span> 中的 </span><span>dockerfile_lines</span><span> 键来指定。</span></li></ol>


<a id="section-1086"></a>
## 图

<a id="t-Hbp758GqKVnIzrM0DmdpA1"></a>

<p id="t-hBSGE3bf1CKDIzGJEJ9EtH"><span style="background-color:transparent">使用 </span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">LangGraph 配置文件</span><span style="background-color:transparent"> 中的 </span><span style="background-color:transparent">graphs</span><span style="background-color:transparent"> 键来指定已部署的 LangGraph 应用中可用的图。</span></p>

<p id="t-g1csBqJnzNxxAv7PsTlQO7"><span style="background-color:transparent">您可以在配置文件中指定一个或多个图。每个图由一个名称（应唯一）和一个路径标识，该路径指向：(1) 已编译的图，或 (2) 定义创建图的函数。</span></p>


<a id="section-1087"></a>
## 环境变量

<a id="t-6fvePM8W8dCJ1PYpTrjJYr"></a>

<p id="t-qNGinYxYL6ipphjoyeVa93"><span style="background-color:transparent">如果您在本地处理已部署的 LangGraph 应用，可以在 </span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">LangGraph 配置文件</span><span style="background-color:transparent"> 的 </span><span style="background-color:transparent">env</span><span style="background-color:transparent"> 键中配置环境变量。</span></p>

<p id="t-P5Bpq9ZsnESQnN055vBYAa"><span style="background-color:transparent">对于生产部署，您通常希望在部署环境中配置环境变量。</span></p>


<a id="section-1088"></a>
## 测试

<a id="t-block-19086"></a>

<p id="t-oe4F8Bzj22UWrcigQO8swu"><span>在完成 LangGraph 智能体（agent）的原型设计后，自然而然的下一步就是添加测试。本指南涵盖了一些在编写单元测试时可以使用的有用模式。</span></p>

<p id="t-S7xRcOHlUW8XZqgcOG16K9"><span>请注意，本指南是 LangGraph 特有的，涵盖了具有自定义结构的图（graph）相关场景——如果你是刚开始接触，请查看</span><span style="border-bottom:1px solid;font-weight:bold">此章节</span><span>，该章节使用了 LangChain 内置的 </span><span style="border-bottom:1px solid;font-weight:bold">create_agent</span><span> 函数。</span></p>


<a id="section-1089"></a>
## 前提条件

<a id="t-alPmdmPTbdKFbzDElhTDjN"></a>

<p id="t-y4Ks3aYi6rrPyBYXBrrbYj"><span>首先，确保你已经安装了</span><span style="border-bottom:1px solid;font-weight:bold">pytest</span><span>：</span></p>

<pre id="t-b1mCAXIYIRL1BfY3nYHCwB"><code>$ pip install -U pytest</code></pre>


<a id="section-1090"></a>
## 开始使用

<a id="t-a0mBFb5jaQ8fOF2Jbd00QV"></a>

<p id="t-3QeTzBeR4cplP1jXot2x0Z"><span>由于许多 LangGraph 智能体依赖于状态（state），一个有用的模式是在每个使用它的测试之前创建你的图（graph），然后在测试中使用一个新的检查点（checkpointer）实例来编译它。</span></p>

<p id="t-D3xGwWqMvQ6cEwVGJVeUnX"><span>下面的示例展示了一个简单的线性图如何工作，该图依次经过</span><span>node1</span><span>和</span><span>node2</span><span>。每个节点都会更新单一的状态键</span><span>my_key</span><span>：</span></p>

<pre id="t-7H07me8HcM7V3j3unDut63"><code>import pytest

from typing_extensions import TypedDict
from langgraph.graph import StateGraph, START, END
from langgraph.checkpoint.memory import MemorySaver

def create_graph() -&gt; StateGraph:
class MyState(TypedDict):
my_key: str

graph = StateGraph(MyState)
graph.add_node("node1", lambda state: {"my_key": "hello from node1"})
graph.add_node("node2", lambda state: {"my_key": "hello from node2"})
graph.add_edge(START, "node1")
graph.add_edge("node1", "node2")
graph.add_edge("node2", END)
return graph

def test_basic_agent_execution() -&gt; None:
checkpointer = MemorySaver()
graph = create_graph()
compiled_graph = graph.compile(checkpointer=checkpointer)
result = compiled_graph.invoke(
{"my_key": "initial_value"},
config={"configurable": {"thread_id": "1"}}
)
assert result["my_key"] == "hello from node2"</code></pre>


<a id="section-1091"></a>
## 测试单个节点和边

<a id="t-qEI7CK2PMshsLw8HmeLHFN"></a>

<p id="t-TwSqjHpHSUZ8rLh54BbFPy"><span>已编译的 LangGraph 智能体将每个单独的节点引用暴露为</span><span>graph.nodes</span><span>。你可以利用这一点来测试智能体中的单个节点。请注意，这将绕过在编译图时传递的任何检查点器（checkpointer）：</span></p>

<pre id="t-Zfpb7SAs8tBHMjQPCoo3ev"><code>import pytest

from typing_extensions import TypedDict
from langgraph.graph import StateGraph, START, END
from langgraph.checkpoint.memory import MemorySaver

def create_graph() -&gt; StateGraph:
class MyState(TypedDict):
my_key: str

graph = StateGraph(MyState)
graph.add_node("node1", lambda state: {"my_key": "hello from node1"})
graph.add_node("node2", lambda state: {"my_key": "hello from node2"})
graph.add_edge(START, "node1")
graph.add_edge("node1", "node2")
graph.add_edge("node2", END)
return graph

def test_individual_node_execution() -&gt; None:
# 在此示例中将被忽略
checkpointer = MemorySaver()
graph = create_graph()
compiled_graph = graph.compile(checkpointer=checkpointer)
# 仅调用节点 1
result = compiled_graph.nodes["node1"].invoke(
{"my_key": "initial_value"},
)
assert result["my_key"] == "hello from node1"</code></pre>


<a id="section-1092"></a>
## 部分执行

<a id="t-nvbR2ddBiTWhvOXRVDEGVq"></a>

<p id="t-26mJo4vloRQTum8TiS4DWK"><span>对于由较大图组成的智能体，你可能希望测试智能体中的部分执行路径，而不是整个端到端流程。在某些情况下，</span><span style="border-bottom:1px solid;font-weight:bold">将这些部分重构为子图</span><span>在语义上可能更合理，你可以像平常一样单独调用它们。</span></p>

<p id="t-MawLt8mHoOW8O8bakcarLD"><span>但是，如果你不希望更改智能体图的整体结构，则可以使用 LangGraph 的持久化机制来模拟一种状态：你的智能体在所需部分开始之前暂停，并在所需部分结束时再次暂停。步骤如下：</span></p>

<ol start="1"><li id="t-CzqjKfY9hHhCAUVQ0ABrlK"><span>使用检查点器（checkpointer）编译你的智能体（用于测试时，内存检查点器</span><span style="border-bottom:1px solid;font-weight:bold">InMemorySaver</span><span>就足够了）。</span></li></ol>

<ol start="2"><li id="t-BrV7ys1yBA23j8Sshy7Syk"><span>调用智能体的</span><span style="border-bottom:1px solid;font-weight:bold">update_state</span><span>方法，并将</span><span style="border-bottom:1px solid;font-weight:bold">as_node</span><span>参数设置为</span><span style="font-style:italic">你想要开始测试的节点之前</span><span>的那个节点的名称。</span></li></ol>

<ol start="3"><li id="t-qbBnClLvREpm9O5vnI745L"><span>使用你用来更新状态的相同</span><span>thread_id</span><span>调用你的智能体，并将</span><span>interrupt_after</span><span>参数设置为你想要停止的节点名称。</span></li></ol>

<p id="t-UXdunoYHbLaI708ZdUXW1N"><span>以下是一个示例，它仅执行线性图中的第二个和第三个节点：</span></p>

<pre id="t-b5f8xaeqNDejZ43x3nvk2n"><code>import pytest

from typing_extensions import TypedDict
from langgraph.graph import StateGraph, START, END
from langgraph.checkpoint.memory import MemorySaver

def create_graph() -&gt; StateGraph:
class MyState(TypedDict):
my_key: str

graph = StateGraph(MyState)
graph.add_node("node1", lambda state: {"my_key": "hello from node1"})
graph.add_node("node2", lambda state: {"my_key": "hello from node2"})
graph.add_node("node3", lambda state: {"my_key": "hello from node3"})
graph.add_node("node4", lambda state: {"my_key": "hello from node4"})
graph.add_edge(START, "node1")
graph.add_edge("node1", "node2")
graph.add_edge("node2", "node3")
graph.add_edge("node3", "node4")
graph.add_edge("node4", END)
return graph

def test_partial_execution_from_node2_to_node3() -&gt; None:
checkpointer = MemorySaver()
graph = create_graph()
compiled_graph = graph.compile(checkpointer=checkpointer)
compiled_graph.update_state(
config={
"configurable": {
"thread_id": "1"
}
},
# 传递给节点 2 的状态——模拟节点 1 结束时的状态
values={"my_key": "initial_value"},
# 更新保存的状态，使其看起来像是来自节点 1
# 执行将在节点 2 处恢复
as_node="node1",
)
result = compiled_graph.invoke(
# 通过传递 None 来恢复执行
None,
config={"configurable": {"thread_id": "1"}},
# 在节点 3 之后停止，这样节点 4 就不会运行
interrupt_after="node3",
)
assert result["my_key"] == "hello from node3"</code></pre>


<a id="section-1093"></a>
## LangSmith Studio

<a id="t-block-19107"></a>

<p id="t-Jxl1iowLSKkvfvetyOzyxf"><span>在本地使用 LangChain 构建智能体（agent）时，可视化智能体内部运行情况、实时交互以及调试出现的问题会非常有帮助。</span><span style="font-weight:bold">LangSmith Studio</span><span> 是一个免费的视觉界面，用于从本地机器开发和测试您的 LangChain 智能体。</span></p>

<p id="t-SWUALYvnqvCwxP6M6mUUtJ"><span>Studio 连接到您本地运行的智能体，向您展示智能体执行的每个步骤：发送给模型的提示（prompts）、工具调用及其结果，以及最终输出。您可以测试不同的输入、检查中间状态，并在无需额外代码或部署的情况下迭代优化智能体的行为。</span></p>

<p id="t-NrIjfxAYtd0JOukidKxAj1"><span>本页描述了如何为您的本地 LangChain 智能体设置 Studio。</span></p>


<a id="section-1094"></a>
## 先决条件

<a id="t-SZTwYwyhuqaYiAm3L6GpES"></a>

<p id="t-JfxmzAa7ng4VWoKazRZQ7V"><span>开始之前，请确保您具备以下条件：</span></p>

<ul><li id="t-HOdnYiOmIEmUyhNVm9AVPt"><span style="font-weight:bold">一个 LangSmith 账户</span><span>：在</span><span style="border-bottom:1px solid;font-weight:bold">smith.langchain.com</span><span>免费注册或登录。</span></li></ul>

<ul><li id="t-VYcfeVgqz2gRgjCBoJhKaJ"><span style="font-weight:bold">一个 LangSmith API 密钥</span><span>：请遵循</span><span style="border-bottom:1px solid;font-weight:bold">创建 API 密钥</span><span>指南。</span></li></ul>

<ul><li id="t-Z3nEzcRCRLMoFIb0YcTmGm"><span>如果您不希望数据被</span><span style="border-bottom:1px solid;font-weight:bold">追踪</span><span>到 LangSmith，请在您应用的</span><span>.env</span><span>文件中设置</span><span>LANGSMITH_TRACING=false</span><span>。禁用追踪后，数据不会离开您的本地服务器。</span></li></ul>


<a id="section-1096"></a>
## 安装 LangGraph CLI

<a id="t-i6mzeqCua608iIWdT4G72N"></a>

<p id="t-2K5BNc09YAtspxMazjy1xs"><span style="border-bottom:1px solid;font-weight:bold">LangGraph CLI</span><span> 提供了一个本地开发服务器（也称为</span><span style="border-bottom:1px solid;font-weight:bold">智能体服务器</span><span>），用于将您的智能体连接到 Studio。</span></p>

<pre id="t-lL99vDe0QlO8pbLNYoPUFa"><code># 需要 Python &gt;= 3.11。
pip install --upgrade "langgraph-cli[inmem]"</code></pre>


<a id="section-1097"></a>
## 准备您的智能体

<a id="t-BaPhXRcEMxK6qAXPRWb1gF"></a>

<p id="t-EZFAWJmEqBuuMwwqp1Jcv9"><span>如果您已经有一个 LangChain 智能体，可以直接使用它。本示例使用一个简单的邮件智能体：</span></p>

<pre id="t-I6dUzPhRXjZVgczYJoXEVG"><code>from langchain.agents import create_agent

def send_email(to: str, subject: str, body: str):
"""Send an email"""
email = {
"to": to,
"subject": subject,
"body": body
}
# ... email sending logic

return f"Email sent to {to}"

agent = create_agent(
"gpt-4o",
tools=[send_email],
system_prompt="You are an email assistant. Always use the send_email tool.",
)</code></pre>


<a id="section-1098"></a>
## 环境变量

<a id="t-UPlSkmUhHILcqQzUrO9nh8"></a>

<p id="t-B8HvMgvJH3KK4NNap03no1"><span>Studio 需要一个 LangSmith API 密钥来连接您的本地智能体。在项目根目录下创建一个</span><span>.env</span><span>文件，并添加您从</span><span style="border-bottom:1px solid;font-weight:bold">LangSmith</span><span>获取的 API 密钥。</span></p>

<p id="t-kcriQhEnPMQvimnIOCAPwe"><span>请确保您的</span><span>.env</span><span>文件不会被提交到版本控制系统（如 Git）。</span></p>

<p id="t-i0yEgzuL8bEw7V00IdA07E"><span style="font-weight:bold">.env</span></p>

<pre id="t-nQWcVGrhFN50Yjzabc3O8S"><code>LANGSMITH_API_KEY=lsv2...</code></pre>


<a id="section-1099"></a>
## 创建 LangGraph 配置文件

<a id="t-ict2vRaXhGNJ2Pmfurez6r"></a>

<p id="t-uh8ouN1mhlNfIB2OaL0Z2v"><span>LangGraph CLI 使用一个配置文件来定位您的智能体并管理依赖项。在您的应用目录中创建一个</span><span>langgraph.json</span><span>文件：</span></p>

<pre id="t-jMqNjWg53Kd9lg1dlXKiWf"><code>{
"dependencies": ["."],
"graphs": {
"agent": "./src/agent.py:agent"
},
"env": ".env"
}</code></pre>

<p id="t-f75vBWjoB4yGxgnMUinj0K"><span style="border-bottom:1px solid;font-weight:bold">create_agent</span><span>函数会自动返回一个已编译的 LangGraph 图（graph），这正是配置文件中</span><span>graphs</span><span>键所期望的内容。</span></p>

<p id="t-SB9GnKgfPl7N76u6rHlaq8"><span>有关配置文件中 JSON 对象每个键的详细解释，请参阅 </span><span style="border-bottom:1px solid;font-weight:bold">LangGraph 配置文件参考</span><span>。</span></p>

<p id="t-Yn1htTw3uPpm0YeF2vcuIz"><span>此时，项目结构将如下所示：</span></p>

<pre id="t-yJ1Oz1JCB4kBmlUrXAy0wi"><code>my-app/
├── src
│   └── agent.py
├── .env
└── langgraph.json</code></pre>


<a id="section-1100"></a>
## 安装依赖项

<a id="t-pYWjFMVM2OC6OWU9pFfCov"></a>

<p id="t-zPQ2lSGjh3NQWH1gO1OxKA"><span>从根目录安装项目依赖项：</span></p>

<p id="t-FqWoHtc1LF7nW9iyAwwFBl"><span>pip</span></p>

<p id="t-3kdX8NgRYhjOCAQiVzJxmM"><span>uv</span></p>

<pre id="t-b9PKOcnDc6Us81npBTGle9"><code>pip install langchain langchain-openai</code></pre>


<a id="section-1101"></a>
## 在 Studio 中查看您的智能体

<a id="t-fdZeeI73BvfllBkwWEtDfd"></a>

<p id="t-6vK7c6RINMBaTxWhP3vE82"><span>启动开发服务器，将您的智能体连接到 Studio：</span></p>

<pre id="t-U1hvTt83P3z4SNMVVImsCw"><code>langgraph dev</code></pre>

<p id="t-6MVh6zcgzjn9ooFcGEMUYl"><span>Safari 浏览器会阻止到 Studio 的</span><span>localhost</span><span>连接。要解决此问题，请使用</span><span>--tunnel</span><span>参数运行上述命令，以便通过安全隧道访问 Studio。</span></p>

<p id="t-3gn5sZeU7DlQ2KZayXgPiV"><span>服务器运行后，您的智能体既可以通过 API 在</span><span>http://127.0.0.1:2024</span><span>访问，也可以通过 Studio UI 在</span><span>https://smith.langchain.com/studio/?baseUrl=http://127.0.0.1:2024</span><span>访问：</span></p>

<div id="t-wuGadHRtpDEk9YkXOoTonS"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/7441f90e8cbee32ebe0b7f14.png"/></div>

<p id="t-Ek0gJZSXyANRg8oNrtSWgH"><span>当 Studio 连接到您的本地智能体后，您可以快速迭代优化智能体的行为。运行测试输入，检查完整的执行轨迹（trace），包括提示、工具参数、返回值以及令牌/延迟指标。当出现问题时，Studio 会捕获异常及其周围状态，帮助您理解发生了什么。</span></p>

<p id="t-J4H5kb1uhObqaDrktPSyZR"><span>开发服务器支持热重载（hot-reloading）—— 在代码中修改提示或工具签名，Studio 会立即反映这些更改。您可以从任何步骤重新运行对话线程来测试您的更改，而无需从头开始。此工作流程适用于从简单的单工具智能体到复杂的多节点图。</span></p>


<a id="section-1102"></a>
## 智能体聊天界面

<a id="t-block-19149"></a>

<p id="t-wEF4Ywq1f0Sof0sY6x5DN3"><span style="border-bottom:1px solid;font-weight:bold">Agent Chat UI</span><span> 是一个 Next.js 应用程序，它为与任何 LangChain 智能体（agent）交互提供了一个对话式界面。它支持实时聊天、工具可视化以及时间旅行调试（time-travel debugging）和状态分叉（state forking）等高级功能。Agent Chat UI 能与使用 </span><span style="border-bottom:1px solid;font-weight:bold">create_agent</span><span> 创建的智能体无缝协作，并以最少的设置为您的智能体提供交互式体验，无论您是在本地运行还是在部署环境中运行（例如 </span><span style="border-bottom:1px solid;font-weight:bold">LangSmith</span><span>）。</span></p>

<p id="t-pecFA1AtjqIG4hFTZyeaxC"><span>Agent Chat UI 是开源的，可以根据您的应用需求进行调整。</span></p>

<p id="t-ghrTs8zHuQgUsFsZAJIMFD"><span>您可以在 Agent Chat UI 中使用生成式 UI（generative UI）。有关更多信息，请参阅</span><span style="border-bottom:1px solid;font-weight:bold">使用 LangGraph 实现生成式用户界面</span><span>。</span></p>


<a id="section-1103"></a>
## 快速开始

<a id="t-6b1U6ftvKVZfJUxFOhdvPD"></a>

<p id="t-dUxpBf2EBipP1Iw6mP3ldZ"><span>最快上手的方法是使用托管版本：</span></p>

<ol start="1"><li id="t-UnIaGMNUQfFabd5Mxrk7sH"><span style="font-weight:bold">访问</span><span style="border-bottom:1px solid;font-weight:bold">Agent Chat UI</span></li></ol>

<ol start="2"><li id="t-QeYzj68pUhkRUW263W2Qu2"><span style="font-weight:bold">连接您的智能体</span><span>，输入您的部署 URL 或本地服务器地址</span></li></ol>

<ol start="3"><li id="t-v1vitOEuIhAJRBrs4XHMwc"><span style="font-weight:bold">开始聊天</span><span>- UI 将自动检测并渲染工具调用（tool calls）和中断（interrupts）</span></li></ol>


<a id="section-1104"></a>
## 本地开发

<a id="t-obdvyliscRmxv4fxlXOP2G"></a>

<p id="t-OQivZwY3eK0czEpnjfOvcX"><span>如需自定义或进行本地开发，您可以在本地运行 Agent Chat UI：</span></p>

<p id="t-KLFzLlK87hYxTDWRr6P8fs"><span>使用 npx</span></p>

<p id="t-UREYKuMYsk0pEavNUYZ8kx"><span>克隆仓库</span></p>

<pre id="t-9ePFeRLx1ZWX0F5hU0nTHS"><code># 创建一个新的 Agent Chat UI 项目
npx create-agent-chat-app --project-name my-chat-ui
cd my-chat-ui

# 安装依赖并启动
pnpm install
pnpm dev</code></pre>


<a id="section-1105"></a>
## 连接到您的智能体

<a id="t-jBx2ydkCs8g8PGqNak7Cxa"></a>

<p id="t-YGT5ilj4HzmDB6e5d6Q7Bn"><span>Agent Chat UI 可以连接到</span><span style="border-bottom:1px solid;font-weight:bold">本地</span><span>和</span><span style="border-bottom:1px solid;font-weight:bold">已部署的智能体</span><span>。</span></p>

<p id="t-cad6Sl89UD4jh6UCLyjr8U"><span>启动 Agent Chat UI 后，您需要配置它以连接到您的智能体：</span></p>

<ol start="1"><li id="t-6i9cJpRyWAIWdVbEHtBP21"><span style="font-weight:bold">图 ID</span><span>：输入您的图名称（在您的</span><span>langgraph.json</span><span>文件的</span><span>graphs</span><span>下可以找到）</span></li></ol>

<ol start="2"><li id="t-Dm1tuwZXZmMZ2pCTVv4zeV"><span style="font-weight:bold">部署 URL</span><span>：您的智能体服务器的端点（例如，本地开发使用 </span><span>http://localhost:2024</span><span>，或您已部署智能体的 URL）</span></li></ol>

<ol start="3"><li id="t-xv3K258tdXAPHhMHCYDtkY"><span style="font-weight:bold">LangSmith API 密钥（可选）</span><span>：添加您的 LangSmith API 密钥（如果您使用的是本地智能体服务器，则不需要）</span></li></ol>

<p id="t-NcAGpQHnG7Kd3zOWTFd0jF"><span>配置完成后，Agent Chat UI 将自动获取并显示来自您智能体的任何中断线程。</span></p>

<p id="t-xeecVXsqyiu4y5PjwsRst0"><span>Agent Chat UI 开箱即用地支持渲染工具调用和工具结果消息。要自定义显示哪些消息，请参阅</span><span style="border-bottom:1px solid;font-weight:bold">在聊天中隐藏消息</span><span>。</span></p>


<a id="section-1106"></a>
## LangSmith 部署

<a id="t-block-19171"></a>

<p id="t-oDDVOw3NC80NLyYVHopl23"><span>本指南将向您展示如何将您的智能体部署到 </span><span style="border-bottom:1px solid;font-weight:bold">LangSmith Cloud</span><span>，这是一个专为智能体工作负载设计的全托管托管平台。通过 Cloud 部署，您可以直接从 GitHub 仓库进行部署——LangSmith 会处理基础设施、扩展和运维问题。</span></p>

<p id="t-hX1N3JNejJ2rI53Q2aGjp3"><span>传统的托管平台是为无状态、短生命周期的 Web 应用程序构建的。LangSmith Cloud 则是</span><span style="font-weight:bold">专为需要持久状态和后台执行的有状态、长时间运行的智能体</span><span>而构建。</span></p>

<p id="t-jJcltFUFFOT14Z23QrdOS7"><span>除了 Cloud 部署，LangSmith 还提供多种其他部署选项，包括使用 </span><span style="border-bottom:1px solid;font-weight:bold">控制平面（混合/自托管）</span><span> 部署或作为 </span><span style="border-bottom:1px solid;font-weight:bold">独立服务器</span><span> 部署。</span></p>


<a id="section-1107"></a>
## 先决条件

<a id="t-tbGdbnD4bn8unnN3bukaQp"></a>

<p id="t-TGAzbgRHyIbCPfnEvJH9dz"><span>开始之前，请确保您已具备以下条件：</span></p>

<ul><li id="t-uLwTmd1H3bbd7Oxz5QuEMi"><span>一个</span><span style="border-bottom:1px solid;font-weight:bold">GitHub 账户</span></li></ul>

<ul><li id="t-LYEaXbUfSNzmA7Nl6DT5mx"><span>一个</span><span style="border-bottom:1px solid;font-weight:bold">LangSmith 账户</span><span>（免费注册）</span></li></ul>


<a id="section-1109"></a>
## 在 GitHub 上创建仓库

<a id="t-VB8gWRYxpzx7NYUlhNR5Kj"></a>

<p id="t-xdhg1liZgrq9tqCeKZUqaQ"><span>您的应用程序代码必须存放在 GitHub 仓库中，才能在 LangSmith 上部署。支持公共和私有仓库。对于本快速入门，请首先按照 </span><span style="border-bottom:1px solid;font-weight:bold">本地服务器设置指南</span><span> 确保您的应用程序与 LangGraph 兼容。然后，将您的代码推送到仓库。</span></p>


<a id="section-1111"></a>
## 导航到 LangSmith 部署

<a id="t-TbSsDRaByJpIdoYCqP1Bwq"></a>

<p id="t-OTrpmBUyamupcAwchtX3H1"><span>登录</span><span style="border-bottom:1px solid;font-weight:bold">LangSmith</span><span>。在左侧边栏中，选择</span><span style="font-weight:bold">Deployments</span><span>。</span></p>


<a id="section-1112"></a>
## 创建新部署

<a id="t-Jfq2NBqaqbriaEOwRh8BbX"></a>

<p id="t-RXDVMKmXf9shC5Pk4xB9oy"><span>点击</span><span style="font-weight:bold">+ New Deployment</span><span>按钮。将打开一个窗格，您可以在其中填写必填字段。</span></p>


<a id="section-1113"></a>
## 关联仓库

<a id="t-RMeWbAmO1ntU5muFGuAuY3"></a>

<p id="t-J7JzJ0T0ffJzcfae8khdcT"><span>如果您是首次使用，或者要添加一个之前未连接过的私有仓库，请点击</span><span style="font-weight:bold">Add new account</span><span>按钮，并按照说明连接您的 GitHub 账户。</span></p>


<a id="section-1114"></a>
## 部署仓库

<a id="t-QcAPUZRJ6fnE7G385jhD0m"></a>

<p id="t-wBmIuMLf6jMZTgGxhYSIGZ"><span>选择您应用程序的仓库。点击</span><span style="font-weight:bold">Submit</span><span>进行部署。此过程可能需要大约 15 分钟才能完成。您可以在</span><span style="font-weight:bold">Deployment details</span><span>视图中查看状态。</span></p>


<a id="section-1115"></a>
## 在 Studio 中测试您的应用程序

<a id="t-x2SNQp8YS3e4PaxS8meRY8"></a>

<p id="t-L4OvdsEpqb8QoH3GXBFlXq"><span>一旦您的应用程序部署完成：</span></p>

<ol start="1"><li id="t-m145cdNMvwX7CH3MYG8opE"><span>选择您刚刚创建的部署以查看更多详细信息。</span></li></ol>

<ol start="2"><li id="t-GbwtJ4ZnXMBsfujqW9aY5N"><span>点击右上角的</span><span style="font-weight:bold">Studio</span><span>按钮。Studio 将打开并显示您的图。</span></li></ol>


<a id="section-1116"></a>
## 获取部署的 API URL

<a id="t-45qqAW8BwP0Nu4DIIRPFFh"></a>

<ol start="1"><li id="t-WGL6K7LY3URune5qJRu04A"><span>在 LangGraph 的</span><span style="font-weight:bold">Deployment details</span><span>视图中，点击</span><span style="font-weight:bold">API URL</span><span>将其复制到剪贴板。</span></li></ol>

<ol start="2"><li id="t-Fg96cavIapcTu5x3M24i2l"><span>点击</span><span>URL</span><span>将其复制到剪贴板。</span></li></ol>


<a id="section-1117"></a>
## 测试 API

<a id="t-FXeRew5ry6v4dWxLJI437k"></a>

<p id="t-eCoifdlNo7ZaGP8GI4qN0R"><span>您现在可以测试 API：</span></p>

<p id="t-nrua3PfDntFYd1ax562RxZ"><span style="border-bottom:1px solid;font-weight:bold">Python</span></p>

<p id="t-S7ThjJoBxO00lhgGF9Jnsf"><span style="border-bottom:1px solid;font-weight:bold">Rest API</span></p>

<ol start="1"><li id="t-pvklAEdI9b6yjTUXwrDQ6E"><span>安装 LangGraph Python：</span></li></ol>

<pre id="t-jITCsyYvuCENGJIfaC1UQx"><code>pip install langgraph-sdk</code></pre>

<ol start="2"><li id="t-6noiQt4jhFMn5h3OIjw8SI"><span>向智能体发送消息：</span></li></ol>

<pre id="t-QKbhIXB0KpcvZnPh3Vm7X3"><code>from langgraph_sdk import get_sync_client # or get_client for async

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


<a id="section-1118"></a>
## LangSmith 可观测性

<a id="t-block-19206"></a>

<p id="t-PgoKrE3PcgEy9dDoJafigW"><span>追踪（Traces）是应用程序从输入到输出所经历的一系列步骤。每个独立的步骤都由一个运行（run）表示。您可以使用 </span><span style="border-bottom:1px solid;font-weight:bold">LangSmith</span><span> 来可视化这些执行步骤。要使用它，请</span><span style="border-bottom:1px solid;font-weight:bold">为您的应用程序启用追踪</span><span>。这使您可以执行以下操作：</span></p>

<ul><li id="t-rzWI5wR7vAbXcdLg8R57Wa"><span style="border-bottom:1px solid;font-weight:bold">调试本地运行的应用程序</span><span>。</span></li></ul>

<ul><li id="t-T3oHUXnIN8gcZKiB5HWiod"><span style="border-bottom:1px solid;font-weight:bold">评估应用程序性能</span><span>。</span></li></ul>

<ul><li id="t-lKJyiJlOTrvhJvdG0Fwrrp"><span style="border-bottom:1px solid;font-weight:bold">监控应用程序</span><span>。</span></li></ul>


<a id="section-1119"></a>
## 先决条件

<a id="t-D5SFbrjPLAHrByRrt4UOHl"></a>

<p id="t-Ajh7t5gYGozZYzRU5G8RcQ"><span>开始之前，请确保您具备以下条件：</span></p>

<ul><li id="t-Won5H8vpeCEUyNNX646Jqg"><span style="font-weight:bold">一个 LangSmith 账户</span><span>：在</span><span style="border-bottom:1px solid;font-weight:bold">smith.langchain.com</span><span>注册（免费）或登录。</span></li></ul>

<ul><li id="t-r43gcM4CqoToPd4IscgKTk"><span style="font-weight:bold">一个 LangSmith API 密钥</span><span>：请遵循</span><span style="border-bottom:1px solid;font-weight:bold">创建 API 密钥</span><span>指南。</span></li></ul>


<a id="section-1120"></a>
## 启用追踪

<a id="t-E5edtX63aKCgnf9MmeMEWm"></a>

<p id="t-eSOEVHCD087fpBZA8pth8m"><span>要为您的应用程序启用追踪，请设置以下环境变量：</span></p>

<pre id="t-RMxt3cVzPmFeaDsFFPCmFw"><code>export LANGSMITH_TRACING=true
export LANGSMITH_API_KEY=&lt;your-api-key&gt;</code></pre>

<p id="t-DONSvbrqJaTnBHGn7FJLqf"><span>默认情况下，追踪将记录到名为 </span><span>default</span><span> 的项目中。要配置自定义项目名称，请参阅</span><span style="border-bottom:1px solid;font-weight:bold">记录到项目</span><span>。</span></p>


<a id="section-1121"></a>
## 选择性追踪

<a id="t-ist8BiWmpVrXjq3bNU03CN"></a>

<p id="t-7UgBzKXLi4ysrFk2CqvoaM"><span>您可以选择使用 LangSmith 的</span><span>tracing_context</span><span>上下文管理器来追踪特定的调用或应用程序的某些部分：</span></p>

<pre id="t-5cMWrpUfT2sQ5s3WwM49He"><code>import langsmith as ls

# 这将被追踪
with ls.tracing_context(enabled=True):
agent.invoke({"messages": [{"role": "user", "content": "Send a test email to alice@example.com"}]})

# 这将不会被追踪（如果未设置 LANGSMITH_TRACING）
agent.invoke({"messages": [{"role": "user", "content": "Send another email"}]})</code></pre>


<a id="section-1122"></a>
## 记录到项目

<a id="t-IBPBoPD9rKF6f3Fo8mOzBz"></a>

<p id="t-72Gcat1FhrziviJZzYMlAU"><span>您可以通过设置</span><span>LANGSMITH_PROJECT</span><span>环境变量为整个应用程序设置自定义项目名称：</span></p>

<pre id="t-KLA8AxzQkbrdBGOEr7mTbJ"><code>export LANGSMITH_PROJECT=my-agent-project</code></pre>

<p id="t-0gk6WDEY1jEN4rLpQzMHtQ"><span>您可以通过编程方式为特定操作设置项目名称：</span></p>

<pre id="t-yCNhEdy4T9eyg3IzuEh086"><code>import langsmith as ls

with ls.tracing_context(project_name="email-agent-test", enabled=True):
response = agent.invoke({
"messages": [{"role": "user", "content": "Send a welcome email"}]
})</code></pre>


<a id="section-1123"></a>
## 向追踪添加元数据

<a id="t-BSkcEiayMH7NViFTHDPqUP"></a>

<p id="t-gHmYG3ChE7DHGuEawNugOi"><span>您可以使用自定义元数据和标签来注释您的追踪：</span></p>

<pre id="t-mRDG76hRIazdGJV3FfUJWz"><code>response = agent.invoke(
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

<p id="t-BqShzWId0HN1t88PQU0haa"><span>tracing_context</span><span>也接受标签和元数据以进行细粒度控制：</span></p>

<pre id="t-Rv34hDqGBmH1zgTSyyfVCN"><code>with ls.tracing_context(
project_name="email-agent-test",
enabled=True,
tags=["production", "email-assistant", "v1.0"],
metadata={"user_id": "user_123", "session_id": "session_456", "environment": "production"}):
response = agent.invoke(
{"messages": [{"role": "user", "content": "Send a welcome email"}]}
)</code></pre>

<p id="t-B5wtGQFPrXUiuL8yPa3kr5"><span>这些自定义元数据和标签将附加到 LangSmith 中的追踪上。</span></p>

<p id="t-v7Ae9GsSjmAHdiVzCpdzJB"><span>要了解更多关于如何使用追踪来调试、评估和监控您的智能体（agents），请参阅 </span><span style="border-bottom:1px solid;font-weight:bold">LangSmith 文档</span><span>。</span></p>


<a id="section-1124"></a>
## 使用匿名器防止敏感数据记录到追踪中

<a id="t-JlI2pn8rNI2jM6z0NkzxF7"></a>

<p id="t-ztn1vLnphnqBOwHbKtZSAs"><span>您可能希望屏蔽敏感数据，以防止其被记录到 LangSmith。您可以创建</span><span style="border-bottom:1px solid;font-weight:bold">匿名器</span><span>并通过配置将其应用到您的图（graph）中。此示例将把发送到 LangSmith 的追踪中任何匹配社会保障号格式 XXX-XX-XXXX 的内容替换为 </span><span>&lt;ssn&gt;</span><span>。</span></p>

<pre id="t-SmdOYgc8uGjRk0xxJPmIhd"><code>from langchain_core.tracers.langchain import LangChainTracer
from langgraph.graph import StateGraph, MessagesState
from langsmith import Client
from langsmith.anonymizer import create_anonymizer

anonymizer = create_anonymizer([
# 匹配 SSNs
{ "pattern": r"\b\d{3}-?\d{2}-?\d{4}\b", "replace": "&lt;ssn&gt;" }
])

tracer_client = Client(anonymizer=anonymizer)
tracer = LangChainTracer(client=tracer_client)
# 定义图
graph = (
StateGraph(MessagesState)
...
.compile()
.with_config({'callbacks': [tracer]})
)</code></pre>


<a id="section-1954"></a>
## LangGraph 入门教程

<a id="t-block-24095"></a>

<p id="t-xZ7scANYyoQyND7Kr6Jy6n"><span style="border-bottom:1px solid">LangGraph 是由 LangChain 团队开发的一个</span><span style="border-bottom:1px solid;font-weight:bold">低层级 Agent 编排框架</span><span style="border-bottom:1px solid">，专为构建有状态（Stateful）、长时运行的 AI 工作流而设计。</span></p>

<p id="t-2PAPU2mb35rgSK5qA5yCBj"><span style="border-bottom:1px solid">与传统的线性 LLM 调用链不同，LangGraph 将工作流建模为</span><span style="border-bottom:1px solid;font-weight:bold">有向图（Directed Graph）</span><span style="border-bottom:1px solid">：</span></p>

<ul><li id="t-My2DRMC5kcmaEd8MyxuuGm"><span style="border-bottom:1px solid;font-weight:bold">节点（Node）</span><span>：执行具体操作的函数（如调用 LLM、执行工具、处理数据）</span></li></ul>

<ul><li id="t-6iy570GlAzopiOq8S4ziy1"><span style="border-bottom:1px solid;font-weight:bold">边（Edge）</span><span>：定义节点之间的流转路径，支持条件分支</span></li></ul>

<ul><li id="t-aeKsH3QpFAkLykUe4LYe6R"><span style="border-bottom:1px solid;font-weight:bold">状态（State）</span><span>：在整个工作流中共享并传递的数据</span></li></ul>

<p id="t-UNIeRfLonX0djfs1RU8Yo5"><span style="border-bottom:1px solid">开源地址：</span><span style="border-bottom:1px solid;font-weight:bold">https://github.com/langchain-ai/langgraph</span><span style="border-bottom:1px solid">。</span></p>

<div id="t-sEoXxpQyIZ1PKGbwm0cxIs"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/803fa12776634a31da495da6.webp"/></div>

<blockquote id="t-uWZ5AkY2gbW3hGdPRev8J1"><p id="t-bzAIES0eF3CdtICLoFOIHx"><span style="border-bottom:1px solid;font-style:italic">想象你正在指挥一场交响乐演出：传统的 LLM Chain 就像演奏一首从头到尾的曲子，只能顺序播放；而 LangGraph 则像一位指挥家，可以根据现场观众的反应随时调整演奏顺序，让某个乐章重复，或者跳转到特定段落。它让 AI 工作流拥有了"指挥"的智慧——能够循环、分支、回溯，真正实现复杂的自主决策。</span></p></blockquote>


<a id="section-1955"></a>
## 为什么选择 LangGraph？

<a id="t-DH53vcVDPVoZdTuhwpf3le"></a>

<p id="t-cBowfx2z7EYEiF54LCqLQg"><span style="border-bottom:1px solid">下表对比了传统 LLM Chain 与 LangGraph 的主要差异：</span></p>

<div id="t-4vIQUgQVx87B7YOZ2oxpSo"><table><colgroup><col width="153.8992919921875"/><col width="158.001708984375"/><col width="227.00689697265625"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>特性</span></p></td><td style=" vertical-align: top"><p><span>传统 LLM Chain</span></p></td><td style=" vertical-align: top"><p><span>LangGraph</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">工作流结构</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">线性，单向执行</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">图结构，支持循环</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">状态管理</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">需手动管理</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">内置状态持久化</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">条件路由</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">实现复杂</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">原生支持</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">人机协作</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">需要额外开发</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">内置支持 interrupt</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">多 Agent 协调</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">实现困难</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">一流支持</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">调试工具</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">有限</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">LangGraph Studio</span></p></td></tr></tbody></table></div>


<a id="section-1956"></a>
## 适用场景

<a id="t-wY75ibJJUrbOFfk1DW6R0E"></a>

<ul><li id="t-OJXOX6w3IV1arTMktBt16O"><span style="border-bottom:1px solid;font-weight:bold">对话机器人</span><span>：需要记忆多轮对话上下文</span></li></ul>

<ul><li id="t-3iSDdXIaYrHwVTGqz7D8HB"><span style="border-bottom:1px solid;font-weight:bold">自主 Agent</span><span>：能够规划、使用工具、迭代思考</span></li></ul>

<ul><li id="t-F3dhy2DQ6Z7dhZHXuUhRbK"><span style="border-bottom:1px solid;font-weight:bold">多 Agent 系统</span><span>：多个 AI 协同完成复杂任务</span></li></ul>

<ul><li id="t-wl25P1x1GSjVrqS2Cy95UN"><span style="border-bottom:1px solid;font-weight:bold">审批工作流</span><span>：需要人工审核的自动化流程</span></li></ul>

<ul><li id="t-4x2g4B1u7I2xvYStYGgCY4"><span style="border-bottom:1px solid;font-weight:bold">研究助手</span><span>：需要多步骤推理和信息检索</span></li></ul>

<div id="t-iFESuXa1JWgaWtLuy0ucNt"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/6bd8eecf2f442e7070452927.png"/></div>


<a id="section-1957"></a>
## 核心概念

<a id="t-rT9Rg0SkwNAmxAgeYUhixH"></a>

<p id="t-1EKY0rwNVjNNvOtpBKP5r5"><span style="border-bottom:1px solid">在开始编写代码之前，先理解 LangGraph 的三大核心概念。</span></p>


<a id="section-1958"></a>
## Graph（图）

<a id="t-kT1Vtmg8Xd83Br1kKnjh4Y"></a>

<p id="t-7FSn61e1lYCxnZ3tc1vXfV"><span style="border-bottom:1px solid">Graph 是整个工作流的蓝图，定义了 Agent 的完整逻辑结构。它由节点（Nodes）和边（Edges）组成：</span></p>

<pre id="t-9T6UXa824VLdhkPW9QDiIa"><code>StateGraph
   |-- Nodes（节点）
   |     |-- node_a
   |     |-- node_b
   |     +-- node_c
   +-- Edges（边）
         |-- START -&gt; node_a
         |-- node_a -&gt; node_b（条件边）
         |-- node_a -&gt; node_c（条件边）
         +-- node_b -&gt; END</code></pre>


<a id="section-1959"></a>
## State（状态）

<a id="t-1oZmmNr4TLKTxmPSNFi6N3"></a>

<p id="t-uaNq6U5sN89UpoJ7gU5bOT"><span style="border-bottom:1px solid">State 是贯穿整个图的</span><span style="border-bottom:1px solid;font-weight:bold">共享数据结构</span><span style="border-bottom:1px solid">。每个节点可以读取和更新 State，更新后的 State 会传递给下一个节点。</span></p>

<pre id="t-cuYEsNkgdzrlq9GTGPO2a4"><code>from typing import TypedDict, Annotated
from langgraph.graph import add_messages

class MyState(TypedDict):
    messages: Annotated[list, add_messages]  # 消息列表（自动追加）
    user_name: str                            # 用户名称
    step_count: int                           # 步骤计数</code></pre>

<p id="t-WYFBpSyBkoh9yuYb9IuCli"><span style="border-bottom:1px solid;font-weight:bold">重要：</span><span style="border-bottom:1px solid">Annotated[list, add_messages]</span><span style="border-bottom:1px solid"> 表示该字段使用 </span><span style="border-bottom:1px solid">add_messages</span><span style="border-bottom:1px solid"> 作为 reducer——新消息会追加到列表而不是覆盖。这是 LangGraph 状态管理的核心机制。</span></p>

<div id="t-Bn2JVyDidFB0hVOIqRr6IN"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/be2155ed89fdabe3bd2dca5c.png"/></div>


<a id="section-1960"></a>
## Nodes（节点）

<a id="t-JDdr2e28pYxADXfyF2tBLg"></a>

<p id="t-XWdc1uqdnGc4oBJY6vZS7Y"><span style="border-bottom:1px solid">节点是普通的 Python 函数，接收当前 State，返回更新后的 State（部分字段）。</span></p>

<pre id="t-StYZPpjwT95uAShX5Kooka"><code>def my_node(state: MyState) -&gt; dict:
    # 读取状态
    messages = state["messages"]

    # 执行操作...
    result = "处理结果"

    # 返回更新的字段（不需要返回所有字段）
    return {"messages": [{"role": "ai", "content": result}]}</code></pre>


<a id="section-1961"></a>
## Edges（边）

<a id="t-PMML6vYOMh6LTHJu1a75fj"></a>

<p id="t-WacdTq0G8R8ZcFKDpVrCaF"><span style="border-bottom:1px solid">边定义节点之间的流转方式：</span></p>

<ul><li id="t-ABwxXlRRYppVV0QT0JUilW"><span style="border-bottom:1px solid;font-weight:bold">普通边</span><span>：固定路径，</span><span style="border-bottom:1px solid">node_a -&gt; node_b</span></li></ul>

<ul><li id="t-P2QcJq8GU7GI2G0V8gwDSN"><span style="border-bottom:1px solid;font-weight:bold">条件边</span><span>：根据 State 动态路由，</span><span style="border-bottom:1px solid">node_a -&gt; node_b 或 node_c</span></li></ul>

<ul><li id="t-Sppk06M5ChGnXCprF41sBo"><span style="border-bottom:1px solid;font-weight:bold">起始边</span><span>：</span><span style="border-bottom:1px solid">START -&gt; 第一个节点</span></li></ul>

<ul><li id="t-Gstfhcan25TXwShvVpFUdd"><span style="border-bottom:1px solid;font-weight:bold">结束边</span><span>：</span><span style="border-bottom:1px solid">某节点 -&gt; END</span></li></ul>


<a id="section-1963"></a>
## 安装依赖

<a id="t-R0tYJQMHRoWs6DlfdqDV7B"></a>

<p id="t-VoVASXI7TQnc5TgPG9DKGn"><span style="border-bottom:1px solid">使用国内镜像安装 LangGraph 和相关依赖：</span></p>

<pre id="t-Sc5osz01DFjJcO644MrWO6"><code># 创建虚拟环境（推荐）
python -m venv venv
source venv/bin/activate      # macOS/Linux
# venv\Scripts\activate       # Windows

# 安装 LangGraph 和 LangChain
pip install langgraph langchain langchain-openai python-dotenv -i https://mirrors.aliyun.com/pypi/simple/

# 可选：安装开发工具
pip install langgraph-cli jupyter -i https://mirrors.aliyun.com/pypi/simple/</code></pre>


<a id="section-1964"></a>
## 配置 API Key

<a id="t-L6f9j9iyDGKcE45iPzWcG8"></a>

<p id="t-oaPoWyvtCHiPxWohvzBs4F"><span style="border-bottom:1px solid">在项目根目录创建</span><span style="border-bottom:1px solid">.env</span><span style="border-bottom:1px solid">文件，同时配置 OpenAI 和 DeepSeek：</span></p>

<pre id="t-27sYgGBqbl6lrWtncxOWqx"><code># .env 文件内容

# OpenAI 配置（国外用户）
OPENAI_API_KEY=sk-xxx
OPENAI_BASE_URL=https://api.openai.com/v1

# DeepSeek 配置（国内用户推荐）
DEEPSEEK_API_KEY=sk-xxx
DEEPSEEK_BASE_URL=https://api.deepseek.com
DEEPSEEK_MODEL=deepseek-v4-pro</code></pre>

<p id="t-EG1FbKqHtCPdAvbmaTdLSJ"><span style="border-bottom:1px solid;font-weight:bold">提示：</span><span style="border-bottom:1px solid">本文示例同时支持 OpenAI 和 DeepSeek。推荐国内用户使用 DeepSeek，API 地址配置为</span><span style="border-bottom:1px solid">https://api.deepseek.com</span><span style="border-bottom:1px solid">（不带 /v1），LangChain 会自动拼接路径。DeepSeek API Key 可在</span><span style="border-bottom:1px solid">https://platform.deepseek.com/api_keys</span><span style="border-bottom:1px solid">创建。</span></p>


<a id="section-1965"></a>
## 验证安装

<a id="t-loWf93Kmd5QYbFt4dzZh9i"></a>

<pre id="t-fx3f999nXfDYqwaaxrxTdt"><code>import langgraph
print(f"LangGraph 版本: {langgraph.__version__}")</code></pre>


<a id="section-1966"></a>
## 第一个 LangGraph 程序

<a id="t-FZ9QoK2iSmbF15MjlT1TWF"></a>

<p id="t-xHMl8bvic5cVDNpiGebS6X"><span style="border-bottom:1px solid">让我们从最简单的例子开始——一个只有两个节点的线性工作流。</span></p>


<a id="section-1967"></a>
## 实例

<a id="t-AMy4URqFI8G0uO7m56RawG"></a>

<pre id="t-jJJ9mKIXgaFUfToi28J5Pm"><code>from langgraph.graph import StateGraph, START, END
from typing import TypedDict

# Step 1: 定义 State
class SimpleState(TypedDict):
    message: str
    processed: bool

# Step 2: 定义节点函数
def greet_node(state: SimpleState) -&gt; dict:
 """欢迎节点：生成问候语"""
 print(f"[greet_node] 收到消息: {state['message']}")
 return {"message": f"你好！{state['message']}"}

def process_node(state: SimpleState) -&gt; dict:
 """处理节点：标记为已处理"""
 print(f"[process_node] 处理消息: {state['message']}")
 return {"processed": True}

# Step 3: 构建图
builder = StateGraph(SimpleState)

# 添加节点
builder.add_node("greet", greet_node)
builder.add_node("process", process_node)

# 添加边
builder.add_edge(START, "greet")
builder.add_edge("greet", "process")
builder.add_edge("process", END)

# Step 4: 编译图
graph = builder.compile()

# Step 5: 运行
result = graph.invoke({
 "message": "世界",
 "processed": False
})

print(f"\n最终结果: {result}")</code></pre>

<p id="t-FOi0uhofsJzCsiYaGN9TOY"><span style="border-bottom:1px solid">运行结果：</span></p>

<pre id="t-rh8GoWglYGTmJ7B7isqe64"><code>[greet_node] 收到消息: 世界
[process_node] 处理消息: 你好！世界

最终结果: {'message': '你好！世界', 'processed': True}</code></pre>


<a id="section-1968"></a>
## 可视化图结构

<a id="t-U7sCEpmIg5ct5K2IUqvAwK"></a>

<p id="t-2LsQTI1wRdGeeUvFdNQCLF"><span style="border-bottom:1px solid">在 Jupyter Notebook 中可以直接可视化图结构：</span></p>

<pre id="t-milE9stgwjhV0TRZQJUw8D"><code># 在 Jupyter Notebook 中可视化
from IPython.display import Image
Image(graph.get_graph().draw_mermaid_png())

# 或者打印 Mermaid 格式
print(graph.get_graph().draw_mermaid())</code></pre>


<a id="section-1970"></a>
## 使用 TypedDict 定义状态

<a id="t-9BWNbSGMYb8p9W4ht4LcHn"></a>

<pre id="t-MJD4fnaqYrA9LzHRdVyZ94"><code>from typing import TypedDict, Annotated, Optional
from langgraph.graph.message import add_messages

class AgentState(TypedDict):
    # 消息历史（add_messages reducer 自动追加而非覆盖）
    messages: Annotated[list, add_messages]

    # 普通字段（直接覆盖）
    user_id: str
    session_id: str

    # 可选字段
    error: Optional[str]

    # 计数器（使用 operator.add 作为 reducer）
    retry_count: Annotated[int, lambda x, y: x + y]</code></pre>


<a id="section-1971"></a>
## 使用 Pydantic 定义状态（推荐用于生产）

<a id="t-gGbLyp4wDla1ohDk3YNEOW"></a>

<pre id="t-5Znod5PeRhup3g1k05FVkO"><code>from pydantic import BaseModel, Field
from typing import Annotated
from langgraph.graph.message import add_messages

class ProductionState(BaseModel):
    messages: Annotated[list, add_messages] = Field(default_factory=list)
    user_id: str = ""
    confidence_score: float = 0.0

    class Config:
        arbitrary_types_allowed = True</code></pre>


<a id="section-1972"></a>
## MessagesState（内置快捷状态）

<a id="t-V72hLbsj9xaHrRYUennEnm"></a>

<p id="t-eIeTeBQA1V9BwrhNpXYUtf"><span style="border-bottom:1px solid">LangGraph 提供了内置的</span><span style="border-bottom:1px solid">MessagesState</span><span style="border-bottom:1px solid">，专为对话场景设计：</span></p>

<pre id="t-Ilf41iOwi1fmFpwMVVWGUQ"><code>from langgraph.graph import MessagesState

# MessagesState 等价于:
# class MessagesState(TypedDict):
#     messages: Annotated[list[AnyMessage], add_messages]

# 直接使用，无需自定义
builder = StateGraph(MessagesState)</code></pre>


<a id="section-1974"></a>
## 普通函数节点

<a id="t-Jqxe8SXmMcyIFDwMuDpRou"></a>

<pre id="t-NYnyFK6Z2UELyWj4db4pNM"><code>def simple_node(state: AgentState) -&gt; dict:
    # 读取状态
    last_message = state["messages"][-1]

    # 执行操作
    response = f"收到: {last_message.content}"

    # 返回部分状态更新
    return {
        "messages": [{"role": "assistant", "content": response}]
    }</code></pre>


<a id="section-1976"></a>
## 实例

<a id="t-bzOlKejl9gNAybjOixcDfG"></a>

<pre id="t-wn8ZpAD7AtaLcnEicifokk"><code>import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage

load_dotenv()

# 使用 DeepSeek 模型
llm = ChatOpenAI(
    model=os.getenv('DEEPSEEK_MODEL', 'deepseek-v4-pro'),
    openai_api_key=os.getenv('DEEPSEEK_API_KEY'),
    openai_api_base=os.getenv('DEEPSEEK_BASE_URL', 'https://api.deepseek.com'),
    temperature=0
)

def llm_node(state: dict) -&gt; dict:
 """调用 LLM 的节点"""
    system_prompt = SystemMessage(content="你是一个有帮助的助手。")

 # 将系统提示与对话历史合并
    messages = [system_prompt] + state["messages"]

 # 调用 LLM
    response = llm.invoke(messages)

 return {"messages": [response]}</code></pre>


<a id="section-1977"></a>
## 异步节点

<a id="t-HnmDugaw5pOV4qyrwaSLsC"></a>

<pre id="t-qdV4hdop7z0Xnxvo7LS1ia"><code>import asyncio

async def async_node(state: AgentState) -&gt; dict:
    """异步节点，适合 I/O 密集型操作"""
    # 模拟异步操作（如 API 调用、数据库查询）
    await asyncio.sleep(0.1)

    result = await some_async_api_call(state["messages"][-1].content)
    return {"messages": [{"role": "assistant", "content": result}]}

# 使用异步图
result = await graph.ainvoke({"messages": [...]})</code></pre>


<a id="section-1978"></a>
## 使用类作为节点

<a id="t-pfLYrzgVbeaTpUN1ibPG5c"></a>

<pre id="t-QIhpwBVqqLNrMm8EU5EAip"><code>class RouterNode:
    def __init__(self, llm, system_prompt: str):
        self.llm = llm
        self.system_prompt = system_prompt

    def __call__(self, state: AgentState) -&gt; dict:
        """类实例可以作为节点使用"""
        messages = [
            SystemMessage(content=self.system_prompt),
            *state["messages"]
        ]
        response = self.llm.invoke(messages)
        return {"messages": [response]}

# 添加类节点
router = RouterNode(llm, "你是一个专业的路由助手。")
builder.add_node("router", router)</code></pre>


<a id="section-1980"></a>
## 普通边

<a id="t-Ia91xlPvyUXoUW1gt6Immf"></a>

<pre id="t-jJ0JoSg9wWtuostYY4loTO"><code># 固定路径：node_a 完成后始终执行 node_b
builder.add_edge("node_a", "node_b")

# 结束：node_a 完成后图结束
builder.add_edge("node_a", END)</code></pre>


<a id="section-1981"></a>
## 条件边

<a id="t-0tBUHxeV466Nn0OKDfJuk4"></a>

<p id="t-l7J6NUA2Q4q0YEjbnticZf"><span style="border-bottom:1px solid">条件边是 LangGraph 的核心功能，根据当前 State 动态决定下一步。</span></p>

<pre id="t-1lGeNr7JEGPXObkIxUnAnk"><code>def route_after_llm(state: AgentState) -&gt; str:
    """
    路由函数：根据 LLM 的最新输出决定走哪条路径
    返回值必须是已注册节点名称或 END
    """
    last_message = state["messages"][-1]

    # 如果 LLM 请求使用工具
    if hasattr(last_message, "tool_calls") and last_message.tool_calls:
        return "tools"

    # 否则结束
    return END

# 添加条件边
builder.add_conditional_edges(
    "llm",              # 源节点
    route_after_llm,    # 路由函数
    {
        "tools": "tool_executor",   # 返回 "tools" 时 -&gt; tool_executor 节点
        END: END                    # 返回 END 时 -&gt; 结束
    }
)</code></pre>

<div id="t-Nadx643F59OflLUY7Zp7St"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/b16d4982157ff9c96cfa1e91.png"/></div>


<a id="section-1982"></a>
## 并行执行（Fan-out）

<a id="t-GmfD0dEQpLWI7H3vtWyLLb"></a>

<pre id="t-RJ2C6fKhrzMIxFFtkKsfyr"><code># 从一个节点并行分叉到多个节点
builder.add_edge("start_node", "branch_a")
builder.add_edge("start_node", "branch_b")
builder.add_edge("start_node", "branch_c")

# 多个节点汇聚到一个节点（Fan-in）
builder.add_edge("branch_a", "merge_node")
builder.add_edge("branch_b", "merge_node")
builder.add_edge("branch_c", "merge_node")</code></pre>


<a id="section-1984"></a>
## 实例

<a id="t-vrLal4xTd5jv1zstTdqqWM"></a>

<pre id="t-YnojC2V8QEa2L3W8PTZSIn"><code>import os
from dotenv import load_dotenv
from langgraph.graph import StateGraph, START, END, MessagesState
from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage

load_dotenv()

# 初始化 LLM
llm = ChatOpenAI(
    model=os.getenv('DEEPSEEK_MODEL', 'deepseek-v4-pro'),
    openai_api_key=os.getenv('DEEPSEEK_API_KEY'),
    openai_api_base=os.getenv('DEEPSEEK_BASE_URL', 'https://api.deepseek.com'),
    temperature=0.7
)

# 路由函数
def classify_intent(state: MessagesState) -&gt; str:
 """根据用户意图路由到不同的 Agent"""
    last_message = state["messages"][-1]
    content = last_message.content.lower()

 if "天气" in content or "温度" in content:
 return "weather_agent"
 elif "代码" in content or "编程" in content:
 return "code_agent"
 elif "再见" in content or "退出" in content:
 return "farewell"
 else:
 return "general_agent"

# 定义各个 Agent 节点
def router_node(state: MessagesState) -&gt; dict:
 """路由节点：不做处理，只用于触发路由判断"""
 return {}

def weather_node(state: MessagesState) -&gt; dict:
 """天气 Agent"""
    response = llm.invoke([
        SystemMessage(content="你是一个天气助手，友好地回答天气相关问题。如果没有实时数据，可以给出一般性建议。"),
 *state["messages"]
 ])
 return {"messages": [response]}

def code_node(state: MessagesState) -&gt; dict:
 """代码 Agent"""
    response = llm.invoke([
        SystemMessage(content="你是一个编程助手，擅长解答代码问题并给出清晰的代码示例。"),
 *state["messages"]
 ])
 return {"messages": [response]}

def general_node(state: MessagesState) -&gt; dict:
 """通用 Agent"""
    response = llm.invoke([
        SystemMessage(content="你是一个友善的 AI 助手，可以回答各种问题。"),
 *state["messages"]
 ])
 return {"messages": [response]}

def farewell_node(state: MessagesState) -&gt; dict:
 """告别节点"""
 return {"messages": [{"role": "assistant", "content": "再见！期待下次与你交流。"}]}

# 构建图
builder = StateGraph(MessagesState)

# 添加节点
builder.add_node("router", router_node)
builder.add_node("weather_agent", weather_node)
builder.add_node("code_agent", code_node)
builder.add_node("general_agent", general_node)
builder.add_node("farewell", farewell_node)

# 添加边
builder.add_edge(START, "router")
builder.add_conditional_edges(
 "router",
    classify_intent,
 {
 "weather_agent": "weather_agent",
 "code_agent": "code_agent",
 "general_agent": "general_agent",
 "farewell": "farewell",
 }
)

# 所有 agent 节点处理完后结束
for node in ["weather_agent", "code_agent", "general_agent", "farewell"]:
    builder.add_edge(node, END)

# 编译图
graph = builder.compile()

# 测试不同意图
test_inputs = [
 "北京今天天气怎么样？",
 "帮我写一个 Python 快速排序",
 "你好，介绍一下你自己",
 "再见啦！"
]

for user_input in test_inputs:
 print(f"\n用户: {user_input}")
    result = graph.invoke({"messages": [HumanMessage(content=user_input)]})
 print(f"助手: {result['messages'][-1].content[:100]}...")
 print("-" * 50)</code></pre>

<p id="t-RYQl363G2i75NNbxk0QCSv"><span style="border-bottom:1px solid">运行结果示例：</span></p>

<pre id="t-8bZnlaLo5n7JTSRoJSqNEd"><code>用户: 北京今天天气怎么样？
助手: 很抱歉，我没有实时天气数据。不过北京现在是春季，建议您出门时关注天气预报...
--------------------------------------------------

用户: 帮我写一个 Python 快速排序
助手: 好的，下面是一个 Python 实现的快速排序算法：

```python
def quicksort(arr):
    if len(arr) &lt;= 1:
        return arr
    ...
--------------------------------------------------

用户: 你好，介绍一下你自己
助手: 你好！我是一个 AI 助手，很高兴为你服务。我可以帮你回答各种问题...
--------------------------------------------------

用户: 再见啦！
助手: 再见！期待下次与你交流。
--------------------------------------------------</code></pre>

<p id="t-B63KUTCDhA8CzWugjCtXnD"><span style="border-bottom:1px solid;font-weight:bold">注意：</span><span style="border-bottom:1px solid">条件路由函数的返回值必须是已在图中注册的节点名称或</span><span style="border-bottom:1px solid">END</span><span style="border-bottom:1px solid">。如果返回未注册的名称，图执行时会抛出错误。</span></p>


<a id="section-1985"></a>
## 构建对话机器人

<a id="t-P7AQMqd7lnRlVlxmlUlP8c"></a>

<p id="t-AmF34t7YSCK4uVl1mxZwJ7"><span style="border-bottom:1px solid">现在用所学知识构建一个支持多轮对话的机器人。这个机器人能够记住对话上下文，实现连续的交互体验。</span></p>


<a id="section-1986"></a>
## 实例

<a id="t-MO9eMKHkWlSKvbOiHDghEE"></a>

<pre id="t-nO64AlOZCnrFTHjK147wLv"><code>import os
from dotenv import load_dotenv
from langgraph.graph import StateGraph, MessagesState, START, END
from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage

load_dotenv()

# 初始化 LLM（使用 DeepSeek）
llm = ChatOpenAI(
    model=os.getenv('DEEPSEEK_MODEL', 'deepseek-v4-pro'),
    openai_api_key=os.getenv('DEEPSEEK_API_KEY'),
    openai_api_base=os.getenv('DEEPSEEK_BASE_URL', 'https://api.deepseek.com'),
    temperature=0.7
)

SYSTEM_PROMPT = """你是一个友善、专业的 AI 助手。
你的回答应该：
- 简洁清晰
- 使用中文回复
- 在不确定时主动询问用户
"""

def chatbot_node(state: MessagesState) -&gt; dict:
 """核心对话节点"""
    system = SystemMessage(content=SYSTEM_PROMPT)
    messages = [system] + state["messages"]
    response = llm.invoke(messages)
 return {"messages": [response]}

# 构建图
builder = StateGraph(MessagesState)
builder.add_node("chatbot", chatbot_node)
builder.add_edge(START, "chatbot")
builder.add_edge("chatbot", END)

graph = builder.compile()

# 多轮对话函数
def chat(conversation_history: list, user_input: str) -&gt; tuple[str, list]:
 """处理单轮对话，返回 AI 响应和更新后的历史"""
    conversation_history.append(HumanMessage(content=user_input))
    result = graph.invoke({"messages": conversation_history})
    conversation_history = result["messages"]
    ai_response = conversation_history[-1].content
 return ai_response, conversation_history

# 多轮对话示例
history = []
while True:
    user_input = input("你: ")
 if user_input.lower() in ["退出", "exit", "quit"]:
 print("再见！")
 break

    response, history = chat(history, user_input)
 print(f"助手: {response}\n")</code></pre>

<p id="t-GU4VviFeCxd8wQfkR3yJxP"><span style="border-bottom:1px solid">运行结果示例：</span></p>

<pre id="t-qF9zku7ydXnTQrKmiXQPNG"><code>你: 你好，我叫小明
助手: 你好，小明！很高兴认识你。有什么我可以帮助你的吗？

你: 我想学习 Python 编程
助手: 太好了！Python 是一门很适合初学者的编程语言。我可以帮你从基础开始：
1. 首先了解变量和数据类型
2. 学习条件语句和循环
3. 掌握函数的定义和使用
你想从哪个部分开始呢？

你: 你还记得我叫什么吗？
助手: 当然记得，你叫小明！你刚才说想学习 Python 编程，我们可以继续这个话题。

你: 退出
再见！</code></pre>


<a id="section-1987"></a>
## 工具调用 - ReAct Agent

<a id="t-J0pbTHDBs5LrutfM4Yzqux"></a>

<p id="t-nRrOgvIEFGUYZCGOY9mEgp"><span style="border-bottom:1px solid">让 Agent 具备使用外部工具的能力是 LangGraph 最强大的特性之一。</span><span style="border-bottom:1px solid;font-weight:bold">ReAct</span><span style="border-bottom:1px solid">（Reason + Act）是最常见的 Agent 模式：LLM 思考 -&gt; 选择工具 -&gt; 执行工具 -&gt; 观察结果 -&gt; 继续思考。</span></p>

<div id="t-cQR22BZ3AAmckUYu8JuxGX"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/104a699a09a987fd8ab6d831.png"/></div>


<a id="section-1988"></a>
## 定义工具

<a id="t-bY7oO9mQ6VlHRVhPOYBsb7"></a>

<p id="t-GcE3Jnx7tThnTw8GaSosO6"><span style="border-bottom:1px solid">首先定义 Agent 可以使用的工具：</span></p>

<pre id="t-Y6RUa4x5nLKbXM8PqrukB0"><code>from langchain_core.tools import tool

@tool
def search_web(query: str) -&gt; str:
    """搜索网络获取最新信息。

    Args:
        query: 搜索关键词

    Returns:
        搜索结果摘要
    """
    # 实际项目中替换为真实搜索 API
    return f"关于 '{query}' 的搜索结果：这是模拟的搜索结果..."

@tool
def calculate(expression: str) -&gt; str:
    """计算数学表达式。

    Args:
        expression: 数学表达式，如 '2 + 2' 或 '100 * 0.8'

    Returns:
        计算结果
    """
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
        return f"计算结果: {expression} = {result}"
    except Exception as e:
        return f"计算错误: {str(e)}"

@tool
def get_weather(city: str) -&gt; str:
    """获取指定城市的天气信息。

    Args:
        city: 城市名称

    Returns:
        天气信息
    """
    # 实际项目中替换为真实天气 API
    return f"{city} 今日天气：晴，温度 22C，湿度 60%"

tools = [search_web, calculate, get_weather]</code></pre>

<p id="t-TLbO2UaHTDtrBNpjZciPLz"><span style="border-bottom:1px solid;font-weight:bold">安全警告：</span><span style="border-bottom:1px solid">calculate 工具使用 AST（抽象语法树）解析替代</span><span style="border-bottom:1px solid">eval()</span><span style="border-bottom:1px solid">。直接使用</span><span style="border-bottom:1px solid">eval()</span><span style="border-bottom:1px solid">存在严重的安全风险，因为它可以执行任意 Python 代码。在生产环境中，务必使用安全的表达式解析方式。</span></p>


<a id="section-1990"></a>
## 实例

<a id="t-xrmG3FEj96z08NKsOJmIV6"></a>

<pre id="t-oBYmJI5j32JoZXqIdEc4lb"><code>import os
from dotenv import load_dotenv
from langgraph.graph import StateGraph, MessagesState, START, END
from langgraph.prebuilt import ToolNode, tools_condition
from langchain_openai import ChatOpenAI
from langchain_core.tools import tool
from langchain_core.messages import HumanMessage
import ast
import operator

load_dotenv()

# 定义工具
@tool
def search_web(query: str) -&gt; str:
 """搜索网络获取最新信息。"""
 return f"关于 '{query}' 的搜索结果：这是模拟的搜索结果..."

@tool
def calculate(expression: str) -&gt; str:
 """计算数学表达式。"""
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
 return f"计算结果: {expression} = {result}"
 except Exception as e:
 return f"计算错误: {str(e)}"

@tool
def get_weather(city: str) -&gt; str:
 """获取指定城市的天气信息。"""
 return f"{city} 今日天气：晴，温度 22C，湿度 60%"

tools = [search_web, calculate, get_weather]

# 初始化 LLM 并绑定工具
llm = ChatOpenAI(
    model=os.getenv('DEEPSEEK_MODEL', 'deepseek-v4-pro'),
    openai_api_key=os.getenv('DEEPSEEK_API_KEY'),
    openai_api_base=os.getenv('DEEPSEEK_BASE_URL', 'https://api.deepseek.com'),
    temperature=0
)
llm_with_tools = llm.bind_tools(tools)

def agent_node(state: MessagesState) -&gt; dict:
 """Agent 推理节点：调用 LLM 决定下一步行动"""
    response = llm_with_tools.invoke(state["messages"])
 return {"messages": [response]}

# 构建 ReAct 图
builder = StateGraph(MessagesState)

# 添加节点
builder.add_node("agent", agent_node)
builder.add_node("tools", ToolNode(tools)) # 内置 ToolNode 自动处理工具调用

# 添加边
builder.add_edge(START, "agent")

# 条件路由：如果 LLM 请求工具则执行工具，否则结束
builder.add_conditional_edges(
 "agent",
    tools_condition, # 内置路由函数
 {
 "tools": "tools",
        END: END
 }
)

# 工具执行完后返回 agent 继续推理
builder.add_edge("tools", "agent")

graph = builder.compile()

# 测试
result = graph.invoke({
 "messages": [HumanMessage(content="北京今天天气如何？另外帮我计算 1234 * 5678")]
})

for message in result["messages"]:
 print(f"[{message.type}]: {message.content[:200] if message.content else '(工具调用)'}")</code></pre>


<a id="section-1991"></a>
## 流式输出工具调用过程

<a id="t-GVtfgnv9Ti8j4PNKYX5AI7"></a>

<pre id="t-CTE633WXVURYuUiGEKKG84"><code># 流式观察 Agent 的每一步
for chunk in graph.stream(
    {"messages": [HumanMessage(content="搜索 LangGraph 的最新特性")]},
    stream_mode="updates"
):
    for node_name, updates in chunk.items():
        print(f"\n=== 节点: {node_name} ===")
        for msg in updates.get("messages", []):
            if hasattr(msg, "tool_calls") and msg.tool_calls:
                for tc in msg.tool_calls:
                    print(f"  -&gt; 调用工具: {tc['name']}({tc['args']})")
            else:
                print(f"  -&gt; 输出: {msg.content[:200] if msg.content else '(无内容)'}")</code></pre>

<p id="t-EBZNQkv81fOb6vMgqSlLyN"><span style="border-bottom:1px solid;font-weight:bold">提示：</span><span style="border-bottom:1px solid">ToolNode</span><span style="border-bottom:1px solid">和</span><span style="border-bottom:1px solid">tools_condition</span><span style="border-bottom:1px solid">是 LangGraph 的内置组件。</span><span style="border-bottom:1px solid">ToolNode</span><span style="border-bottom:1px solid">自动解析 LLM 返回的工具调用并执行对应的工具函数；</span><span style="border-bottom:1px solid">tools_condition</span><span style="border-bottom:1px solid">是一个路由函数，检查 LLM 输出是否包含工具调用请求，有则返回 "tools"，否则返回 END。</span></p>


<a id="section-1992"></a>
## Human-in-the-Loop 人机协作

<a id="t-yKId9GdokCmPm4YSsWldFk"></a>

<p id="t-ai6rg6v2tw6fZYI3V8hOS5"><span style="border-bottom:1px solid">LangGraph 原生支持在工作流执行过程中暂停，等待人工审核或输入。这对于需要人工确认的敏感操作非常有用。</span></p>


<a id="section-1993"></a>
## 使用 interrupt 暂停执行

<a id="t-N4tTycOVgZRh2WR8hKmbFT"></a>

<pre id="t-cjlJ8Q0nheRWW7dEk8JahP"><code>from langgraph.types import interrupt
from langgraph.checkpoint.memory import MemorySaver

def sensitive_action_node(state: MessagesState) -&gt; dict:
    """执行敏感操作前请求人工审批"""
    last_msg = state["messages"][-1].content

    # 暂停图的执行，等待人工决策
    human_decision = interrupt({
        "question": "是否批准执行以下操作？",
        "action": last_msg,
        "risk_level": "中等"
    })

    if human_decision == "approve":
        return {"messages": [{"role": "assistant", "content": "操作已批准并执行完毕。"}]}
    else:
        return {"messages": [{"role": "assistant", "content": "操作已取消。"}]}

# 必须使用 checkpointer 才能支持 interrupt
checkpointer = MemorySaver()
graph = builder.compile(checkpointer=checkpointer)</code></pre>


<a id="section-1995"></a>
## 实例

<a id="t-NRob47fhMhMZMipiHuVyrO"></a>

<pre id="t-VWRBEOzYhYDbPOFeKvEBzR"><code>import os
from dotenv import load_dotenv
from langgraph.graph import StateGraph, MessagesState, START, END
from langgraph.types import Command, interrupt
from langgraph.checkpoint.memory import MemorySaver
from langchain_core.messages import HumanMessage

load_dotenv()

def request_node(state: MessagesState) -&gt; dict:
 """接收用户请求"""
 return {"messages": state["messages"]}

def approval_node(state: MessagesState) -&gt; dict:
 """审批节点：暂停等待人工审批"""
    last_msg = state["messages"][-1].content

 # 暂停执行，等待人工决策
    human_decision = interrupt({
 "question": "是否批准执行以下操作？",
 "action": last_msg
 })

 if human_decision == "approve":
 return {"messages": [{"role": "assistant", "content": f"操作已批准：{last_msg}"}]}
 else:
 return {"messages": [{"role": "assistant", "content": "操作已被拒绝。"}]}

def execute_node(state: MessagesState) -&gt; dict:
 """执行节点"""
 return {"messages": [{"role": "assistant", "content": "任务执行完成！"}]}

# 构建图
builder = StateGraph(MessagesState)
builder.add_node("request", request_node)
builder.add_node("approval", approval_node)
builder.add_node("execute", execute_node)

builder.add_edge(START, "request")
builder.add_edge("request", "approval")
builder.add_edge("approval", "execute")
builder.add_edge("execute", END)

# 使用 checkpointer 编译图
checkpointer = MemorySaver()
graph = builder.compile(checkpointer=checkpointer)

# 每次对话使用唯一 thread_id
config = {"configurable": {"thread_id": "approval-session-001"}}

# Step 1: 启动图，会在 interrupt 处暂停
print("=== Step 1: 提交请求 ===")
result = graph.invoke(
 {"messages": [HumanMessage(content="请删除数据库中的所有测试数据")]},
    config=config
)
print("图已暂停，等待审批...")

# Step 2: 人工审批后，用 Command 恢复执行
print("\n=== Step 2: 人工审批 ===")
# 批准操作
result = graph.invoke(
    Command(resume="approve"),
    config=config
)
print(f"最终结果: {result['messages'][-1].content}")

# 如果要拒绝，使用：
# graph.invoke(Command(resume="reject"), config=config)</code></pre>


<a id="section-1996"></a>
## 在边上设置断点

<a id="t-I8Tp6gp0EvToZV9p9gL8OV"></a>

<pre id="t-aIUkCUxVBtaDTCUC9If5T8"><code># 另一种方式：在编译时指定断点
graph = builder.compile(
    checkpointer=checkpointer,
    interrupt_before=["sensitive_node"],   # 执行该节点前暂停
    # interrupt_after=["review_node"],     # 执行该节点后暂停
)</code></pre>

<blockquote id="t-Qs1nB9os7BouSCMLZLBCMp"><p id="t-vcNidtC136Va3mMWq96ZhU"><span style="border-bottom:1px solid;font-weight:bold">重要：</span><span style="border-bottom:1px solid">checkpointer</span><span style="border-bottom:1px solid">是实现</span><span style="border-bottom:1px solid">interrupt</span><span style="border-bottom:1px solid">功能的前提条件。没有 checkpointer，图无法保存暂停时的状态，也就无法在恢复时继续执行。MemorySaver 适合开发测试，生产环境建议使用 SqliteSaver 或其他持久化存储。</span></p></blockquote>


<a id="section-1997"></a>
## 持久化内存

<a id="t-xWkhsts5lW0wsgghlPzct4"></a>

<p id="t-gcpgnENJFeLNaGnxp3m3wk"><span style="border-bottom:1px solid">LangGraph 提供了内置的状态持久化机制，让 Agent 能够跨会话记住对话历史。</span></p>


<a id="section-1998"></a>
## 内存存储（适合开发测试）

<a id="t-LatHglickdNLgJsNoUPtbe"></a>

<pre id="t-IvImVvoSms87bYamML3Nla"><code>from langgraph.checkpoint.memory import MemorySaver

checkpointer = MemorySaver()
graph = builder.compile(checkpointer=checkpointer)

# 使用 thread_id 区分不同会话
config_user_a = {"configurable": {"thread_id": "user-alice"}}
config_user_b = {"configurable": {"thread_id": "user-bob"}}

# Alice 的对话
graph.invoke({"messages": [HumanMessage(content="我叫 Alice")]}, config=config_user_a)
graph.invoke({"messages": [HumanMessage(content="我叫什么名字？")]}, config=config_user_a)
# Agent 能记住：你叫 Alice

# Bob 的对话完全独立
graph.invoke({"messages": [HumanMessage(content="我叫什么名字？")]}, config=config_user_b)
# Agent 不知道 Bob 的名字（不同 thread_id）</code></pre>


<a id="section-1999"></a>
## SQLite 持久化存储（适合本地项目）

<a id="t-Jq3trDa7CaSMOU0lfbZ0Pl"></a>

<pre id="t-aoafhkpl2V2N0JyhUD78K3"><code># 安装依赖
# pip install langgraph-checkpoint-sqlite

from langgraph.checkpoint.sqlite import SqliteSaver

# 数据持久化到文件，程序重启后对话历史仍存在
with SqliteSaver.from_conn_string("./chat_memory.db") as checkpointer:
    graph = builder.compile(checkpointer=checkpointer)

    config = {"configurable": {"thread_id": "persistent-chat"}}

    # 第一次运行
    graph.invoke({"messages": [HumanMessage(content="我叫张三")]}, config=config)

    # 程序重启后再次运行，记忆仍然存在
    result = graph.invoke(
        {"messages": [HumanMessage(content="你还记得我叫什么吗？")]},
        config=config
    )</code></pre>


<a id="section-2000"></a>
## 查看对话历史

<a id="t-MVkcxnTeHFqCA9Mse11ncS"></a>

<pre id="t-mbXn7adri9k0Nlq36iH3gt"><code># 获取某个 thread 的完整状态历史
history = list(graph.get_state_history(config))

for snapshot in history:
    print(f"时间: {snapshot.created_at}")
    print(f"消息数: {len(snapshot.values['messages'])}")
    print("---")

# 获取当前状态
current_state = graph.get_state(config)
print(f"当前消息数: {len(current_state.values['messages'])}")</code></pre>

<p id="t-b2IhR06oFa38nTNXBCrmBJ"><span style="border-bottom:1px solid;font-weight:bold">提示：</span><span style="border-bottom:1px solid">thread_id</span><span style="border-bottom:1px solid">是会话的唯一标识符，用于隔离不同用户或不同对话的状态。同一个 thread_id 的所有调用会共享对话历史，不同 thread_id 之间完全独立。在多用户场景中，通常使用用户 ID 或会话 ID 作为 thread_id。</span></p>


<a id="section-2001"></a>
## 多 Agent 系统

<a id="t-lbJFvBAmy9cbOGZ3PS9aSx"></a>

<p id="t-cBO6eG0aT7fo4EDzK7IdDo"><span style="border-bottom:1px solid">LangGraph 擅长协调多个专门化的 Agent 协同工作。通过将复杂任务分解给不同的专家 Agent，可以实现更强大的问题解决能力。</span></p>

<div id="t-AstSYAQQQYoUCM7FXpfON0"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/f7cf69a902eceb75e834237d.png"/></div>


<a id="section-2003"></a>
## 实例

<a id="t-N9EjDpDNyZC3s9SWFO7aJN"></a>

<pre id="t-ao1nmgiUIXbYCXemGgod51"><code>import os
from dotenv import load_dotenv
from langgraph.graph import StateGraph, MessagesState, START, END
from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage

load_dotenv()

# 初始化 LLM
llm = ChatOpenAI(
    model=os.getenv('DEEPSEEK_MODEL', 'deepseek-v4-pro'),
    openai_api_key=os.getenv('DEEPSEEK_API_KEY'),
    openai_api_base=os.getenv('DEEPSEEK_BASE_URL', 'https://api.deepseek.com'),
    temperature=0
)

# 定义专家 Agent
def research_agent(state: MessagesState) -&gt; dict:
 """研究 Agent：负责信息收集"""
    system = SystemMessage(content="你是一个专业的研究员，负责收集和整理信息。请简洁地总结关键信息。")
    response = llm.invoke([system] + state["messages"])
 return {"messages": [response]}

def writing_agent(state: MessagesState) -&gt; dict:
 """写作 Agent：负责内容创作"""
    system = SystemMessage(content="你是一个专业的写作者，负责根据已有信息撰写内容。请保持内容清晰流畅。")
    response = llm.invoke([system] + state["messages"])
 return {"messages": [response]}

def review_agent(state: MessagesState) -&gt; dict:
 """审校 Agent：负责质量控制"""
    system = SystemMessage(content="你是一个专业的编辑，负责审核和改进内容质量。请指出问题并给出改进建议。")
    response = llm.invoke([system] + state["messages"])
 return {"messages": [response]}

# 主管 Agent 决定流程
def supervisor_node(state: MessagesState) -&gt; dict:
 """主管：协调各专家 Agent 的工作"""
    system = SystemMessage(content="""你是一个工作流主管。
根据任务进度决定下一步应该由哪个 Agent 处理。
分析对话历史，只返回以下之一：RESEARCH、WRITING、REVIEW、FINISH
- RESEARCH：需要收集更多信息
- WRITING：信息充足，可以开始写作
- REVIEW：写作完成，需要审核
- FINISH：任务已完成
""")
    response = llm.invoke([system] + state["messages"])
 return {"messages": [response]}

def route_by_supervisor(state: MessagesState) -&gt; str:
 """根据主管决策路由"""
    last_msg = state["messages"][-1].content.strip().upper()

 if "RESEARCH" in last_msg:
 return "research"
 elif "WRITING" in last_msg:
 return "writing"
 elif "REVIEW" in last_msg:
 return "review"
 else:
 return END

# 构建多 Agent 图
builder = StateGraph(MessagesState)
builder.add_node("supervisor", supervisor_node)
builder.add_node("research", research_agent)
builder.add_node("writing", writing_agent)
builder.add_node("review", review_agent)

builder.add_edge(START, "supervisor")
builder.add_conditional_edges("supervisor", route_by_supervisor)

# 每个专家完成后返回主管
for agent in ["research", "writing", "review"]:
    builder.add_edge(agent, "supervisor")

graph = builder.compile()

# 测试多 Agent 协作
result = graph.invoke({
 "messages": [HumanMessage(content="请帮我写一篇关于 Python 装饰器的简短介绍文章")]
})

print("=== 多 Agent 协作完成 ===")
for i, msg in enumerate(result["messages"]):
 print(f"\n[{i+1}] {msg.type}: {msg.content[:150]}...")</code></pre>


<a id="section-2004"></a>
## 子图（Subgraph）

<a id="t-jm59IXyWDkJ8YcdFaSceSt"></a>

<p id="t-naN4ZKee2bO1KSaFykDdaT"><span style="border-bottom:1px solid">将复杂子流程封装为子图，在主图中复用：</span></p>

<pre id="t-jsHvqGvJ40JRjmSENBDHGV"><code># 将复杂子流程封装为子图，在主图中复用
sub_builder = StateGraph(MessagesState)
sub_builder.add_node("step1", step1_node)
sub_builder.add_node("step2", step2_node)
sub_builder.add_edge(START, "step1")
sub_builder.add_edge("step1", "step2")
sub_builder.add_edge("step2", END)
sub_graph = sub_builder.compile()

# 在主图中使用子图
main_builder = StateGraph(MessagesState)
main_builder.add_node("preprocessing", preprocess_node)
main_builder.add_node("sub_workflow", sub_graph)  # 直接使用编译好的子图
main_builder.add_node("postprocessing", postprocess_node)

main_builder.add_edge(START, "preprocessing")
main_builder.add_edge("preprocessing", "sub_workflow")
main_builder.add_edge("sub_workflow", "postprocessing")
main_builder.add_edge("postprocessing", END)

main_graph = main_builder.compile()</code></pre>


<a id="section-2005"></a>
## LangGraph Studio 可视化调试

<a id="t-Z8aUrB0Xunc5cB5VazCQOF"></a>

<p id="t-FA82fILV9pRtTMZc72NV6j"><span style="border-bottom:1px solid">LangGraph Studio 是官方提供的可视化开发环境，让你实时查看 Agent 的执行过程，大幅提升开发和调试效率。</span></p>


<a id="section-2006"></a>
## 安装 LangGraph CLI

<a id="t-YHeQH8sJqVwq97SxqOkqFx"></a>

<pre id="t-SSKnUzT7vrUdGOrvjV3MK6"><code>pip install langgraph-cli -i https://mirrors.aliyun.com/pypi/simple/</code></pre>


<a id="section-2007"></a>
## 创建项目配置文件

<a id="t-5xvCRRiQYvqIqfFaHroiJW"></a>

<p id="t-7hvFztAj6ZxIMJXvJ1ufry"><span style="border-bottom:1px solid">在项目根目录创建</span><span style="border-bottom:1px solid">langgraph.json</span><span style="border-bottom:1px solid">配置文件：</span></p>

<pre id="t-7Vdwsyt6Au8vOUSEsArvXz"><code>{
  "dependencies": ["."],
  "graphs": {
    "my_agent": "./my_agent.py:graph"
  },
  "env": ".env"
}</code></pre>


<a id="section-2008"></a>
## 启动开发服务器

<a id="t-rADXNBO94477C32400ZIAt"></a>

<pre id="t-Coskcd14XiMsiBtzi6bKIO"><code>langgraph dev</code></pre>

<p id="t-kx3RxkUWdVZMS05oTicclC"><span style="border-bottom:1px solid">启动后访问</span><span style="border-bottom:1px solid">http://localhost:8123</span><span style="border-bottom:1px solid">即可在浏览器中使用 LangGraph Studio。</span></p>


<a id="section-2009"></a>
## Studio 主要功能

<a id="t-RbON0qmCsqiCZD3P5i4F6S"></a>

<ul><li id="t-C2WXfSAhlm1PP0ELUmjaWH"><span style="border-bottom:1px solid;font-weight:bold">实时可视化</span><span>：图形化展示节点执行过程，直观了解工作流状态</span></li></ul>

<ul><li id="t-P6khoKTqFMGHUIIhT4M90j"><span style="border-bottom:1px solid;font-weight:bold">状态检查</span><span>：在任意节点暂停查看当前 State，方便排查问题</span></li></ul>

<ul><li id="t-vMjMLahULx6uzhXnFrlUui"><span style="border-bottom:1px solid;font-weight:bold">时间旅行</span><span>：回放历史执行步骤，追踪每一步的状态变化</span></li></ul>

<ul><li id="t-hvDDCYnIq0aeuunpWl5J9n"><span style="border-bottom:1px solid;font-weight:bold">热重载</span><span>：修改代码后自动更新图结构，无需重启服务</span></li></ul>

<p id="t-IjjfDedHX6abGxBHvd87D1"><span style="border-bottom:1px solid;font-weight:bold">环境要求：</span><span style="border-bottom:1px solid">LangGraph Studio 需要 Docker 环境支持。请确保已安装 Docker Desktop 并正常运行后再启动开发服务器。</span></p>


<a id="section-2011"></a>
## 最佳实践

<a id="t-xUFh88SItAaFASGDTIcBfY"></a>

<p id="t-urSH8kbyarybtBWaVYetMA"><span style="border-bottom:1px solid;font-weight:bold">状态设计要点</span></p>

<ul><li id="t-j4hB1kX6w9berq4CGCItET"><span>保持 State 精简，只包含必要字段</span></li></ul>

<ul><li id="t-dRlYeyaiBiaymqQfqaPb8M"><span>为复杂字段定义明确的 reducer（如</span><span style="border-bottom:1px solid">add_messages</span><span>）</span></li></ul>

<ul><li id="t-2bkMUGCdkxQRegPoOsB5I2"><span>使用 Pydantic 模型在生产环境中验证状态类型</span></li></ul>

<ul><li id="t-vY9YqXh7hZJvAZkKKXrheO"><span>避免在 State 中存储过大的对象，考虑使用外部存储</span></li></ul>

<p id="t-P6douBMr6zKFZvh0g4l1oL"><span style="border-bottom:1px solid;font-weight:bold">节点设计要点</span></p>

<ul><li id="t-X7QwFfmIDsQSKunKSMUYzF"><span>每个节点职责单一，便于测试和复用</span></li></ul>

<ul><li id="t-R6xFVPUwHDadSI8PKPi46G"><span>节点函数应该是幂等的（相同输入产生相同输出）</span></li></ul>

<ul><li id="t-cr8ONUNghO1F8IQPo7YyGz"><span>避免在节点中直接修改传入的 state，而是返回新值</span></li></ul>

<ul><li id="t-PO0FxptfSkbAkMwh7ru8uD"><span>合理使用异步节点处理 I/O 密集型操作</span></li></ul>

<p id="t-FDbtaYVyn3n9n1f4jASWmr"><span style="border-bottom:1px solid;font-weight:bold">错误处理</span></p>

<pre id="t-mWvCYkTK3X4hfWvuJYRLNY"><code>def robust_node(state: AgentState) -&gt; dict:
    try:
        result = risky_operation(state)
        return {"messages": [result], "error": None}
    except Exception as e:
        return {
            "error": str(e),
            "messages": [{"role": "assistant", "content": f"操作失败: {e}"}]
        }</code></pre>

<p id="t-bd39JG7TgusknsCSARfA70"><span style="border-bottom:1px solid;font-weight:bold">避免无限循环</span></p>

<pre id="t-WRwBh83SJcLnIO0dSp9AbX"><code>def route_with_limit(state: AgentState) -&gt; str:
    # 设置最大重试次数，防止无限循环
    if state.get("retry_count", 0) &gt;= 3:
        return END

    if needs_retry(state):
        return "retry_node"
    return END</code></pre>


<a id="section-2012"></a>
## 常见问题 FAQ

<a id="t-PlO8nALQLnntGRBUcJhof4"></a>

<p id="t-7V0y6r9urnCJB13GONDP0J"><span style="border-bottom:1px solid;font-weight:bold">Q1：节点返回值格式不对怎么办？</span></p>

<pre id="t-jCMi6YpAyTjDWN3kkfN4Rk"><code># 错误：直接修改 state 对象
def bad_node(state):
    state["messages"].append(...)  # 不要直接修改
    return state

# 正确：返回需要更新的字段
def good_node(state):
    return {"messages": [new_message]}  # 只返回变更字段</code></pre>

<p id="t-d4CfsuCKjFjoOOz1gTjFVq"><span style="border-bottom:1px solid;font-weight:bold">Q2：如何在节点之间传递临时数据？</span></p>

<p id="t-MPhp451es8VhjYtCJgifwz"><span style="border-bottom:1px solid">将临时数据加入 State 定义，或使用下划线前缀约定为内部字段：</span></p>

<pre id="t-mVD1NJjrL9DpNAeJwPFbGc"><code>from typing import TypedDict

class PublicState(TypedDict):
    messages: list  # 对外暴露

class PrivateState(TypedDict):
    messages: list
    _internal_cache: dict  # 以下划线开头约定为内部使用</code></pre>

<p id="t-Rray2PS7lvMgoR0e7OdGra"><span style="border-bottom:1px solid;font-weight:bold">Q3：如何调试节点执行过程？</span></p>

<pre id="t-IoQLDfNvPYOZBlGOz0wRuX"><code># 使用 stream 模式观察每个节点的输出
for event in graph.stream(initial_state, stream_mode="updates"):
    for node_name, state_update in event.items():
        print(f"\n[节点: {node_name}]")
        print(f"更新: {state_update}")</code></pre>

<p id="t-3bJvkl5RLAxLNKy78XI7zO"><span style="border-bottom:1px solid;font-weight:bold">Q4：StateGraph 和 MessageGraph 的区别？</span></p>

<p id="t-3CqRljQmGg8H9XJ5RXna0j"><span style="border-bottom:1px solid">MessageGraph</span><span style="border-bottom:1px solid">是早期版本的 API，功能较为受限。现在推荐统一使用</span><span style="border-bottom:1px solid">StateGraph</span><span style="border-bottom:1px solid">，它更灵活、功能更完善。如需处理消息，使用</span><span style="border-bottom:1px solid">StateGraph(MessagesState)</span><span style="border-bottom:1px solid">或自定义包含</span><span style="border-bottom:1px solid">messages</span><span style="border-bottom:1px solid">字段的 State。</span></p>

<p id="t-gOKyGX9cNl82ilZghQiyRl"><span style="border-bottom:1px solid;font-weight:bold">注意：</span><span style="border-bottom:1px solid">MessageGraph</span><span style="border-bottom:1px solid">已被废弃，请统一使用</span><span style="border-bottom:1px solid">StateGraph</span><span style="border-bottom:1px solid">。如果你的代码中还在使用 MessageGraph，建议尽早迁移到 StateGraph(MessagesState) 以获得更好的支持和更多功能。</span></p>


<a id="section-2013"></a>
## 总结

<a id="t-rQHdLa9QgYqz0NFq6WXvRz"></a>

<p id="t-d8MxlpGwm0Gt7o1cRQZCEh"><span style="border-bottom:1px solid">本文系统介绍了 LangGraph 框架的核心概念和实战应用。LangGraph 通过图结构的工作流编排，让开发者能够构建具备循环、分支、状态持久化能力的复杂 AI Agent。相比传统的线性 LLM Chain，LangGraph 在处理需要多步推理、人机协作、多 Agent 协同的场景时具有显著优势。</span></p>

<div id="t-AL0bXR65T1lmb9nFqF9tQr"><table><colgroup><col width="158.8992919921875"/><col width="219.00677490234375"/><col width="251.00164794921875"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>概念</span></p></td><td style=" vertical-align: top"><p><span>说明</span></p></td><td style=" vertical-align: top"><p><span>关键代码</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">StateGraph</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">有向图工作流引擎，LangGraph 的核心</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">StateGraph(MyState)</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">State</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">节点间共享的状态数据结构</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">TypedDict</span><span style="border-bottom:1px solid">+</span><span style="border-bottom:1px solid">Annotated</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Nodes</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">执行具体操作的函数节点</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">builder.add_node()</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Edges</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">节点间的流转路径，支持条件分支</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">add_edge()</span><span style="border-bottom:1px solid">/</span><span style="border-bottom:1px solid">add_conditional_edges()</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">ReAct Agent</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">推理+行动的循环模式</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">ToolNode</span><span style="border-bottom:1px solid">+</span><span style="border-bottom:1px solid">tools_condition</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Human-in-Loop</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">人工审批与介入机制</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">interrupt()</span><span style="border-bottom:1px solid">+</span><span style="border-bottom:1px solid">Command(resume=)</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">持久化</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">会话记忆与状态保存</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">MemorySaver</span><span style="border-bottom:1px solid">/</span><span style="border-bottom:1px solid">SqliteSaver</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">多 Agent</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">多专家协作系统</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Supervisor Pattern</span></p></td></tr></tbody></table></div>


<a id="section-2014"></a>
## 推荐学习路径

<a id="t-ymVNBqq1mwuBMm3XZj3NUS"></a>

<div id="t-qqQOLDTrQnAaDtbp2FxPzU"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/8f871a8d92a9881e8575f3a5.png"/></div>

