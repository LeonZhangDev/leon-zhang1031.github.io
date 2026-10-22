---
title: "第 23 章 · 综合项目学习案例"
date: "2026-10-22"
draft: false
author: "学习资料整理"
description: "预约、日历、RAG、电商客服、ForgePilot、多模态与垂直应用"
tags: ["Agent", "学习路线"]
categories: ["AI 工程"]
prerequisites: ["agent-learning-22-agent-platforms"]
verification: {"status": "not-run", "scope": "本次仅整理资料；示例代码与原文技术结论未复跑。"}
---

预约、日历、RAG、电商客服、ForgePilot、多模态与垂直应用

[学习路线](/posts/agent-learning-route/) · [上一章](/posts/agent-learning-22-agent-platforms/) · [下一章](/posts/agent-learning-24-interview-review/)

本章按知识小节编排。项目内容作为学习案例阅读，示例代码与原文技术结论未在本次整理中执行验证。

## 本章目录

- [Agent场景题](#section-0084)
- [解题思路](#section-0085)
- [信用卡欺诈检测Agent设计](#section-0086)
- [讲解视频](#section-0087)
- [应用开发项目与开源架构解析:[理论学完后学习]](#section-0136)
- [技术知识与案例补充](#section-0137)
- [2026年真正有价值的AI项目](#section-0138)
- [2026年 Agent 新形态](#section-0139)
- [RSI 进展](#section-0140)
- [智能预约Agent项目](#section-0141)
- [项目介绍](#section-0142)
- [项目设计思路](#section-0143)
- [项目包装](#section-0144)
- [配套设施](#section-0145)
- [使用建议](#section-0146)
- [面试真题](#section-0147)
- [项目源码](#section-0148)
- [项目介绍](#section-0150)
- [Github地址](#section-0151)
- [面试真题](#section-0152)
- [视频讲解](#section-0153)
- [ForgePilot Agent项目](#section-0154)
- [技术知识与案例补充](#section-0304)
- [20+套项目源码列表如下](#section-0305)
- [企业桌面 AI 工作站](#section-0307)
- [AI Agent 垂直应用场景](#section-1568)
- [代码 Agent](#section-1569)
- [核心能力](#section-1570)
- [代表系统](#section-1571)
- [Text2SQL Agent 实现](#section-1573)
- [数据分析 Agent](#section-1574)
- [核心能力](#section-1575)
- [数据分析 Agent 实现](#section-1577)
- [客服 Agent](#section-1578)
- [核心能力](#section-1579)
- [客服 Agent 实现](#section-1581)
- [调研 Agent](#section-1582)
- [核心能力](#section-1583)
- [调研 Agent 实现](#section-1585)
- [RPA + Agent](#section-1587)
- [游戏 NPC Agent](#section-1588)
- [科研 Agent](#section-1589)
- [章节小结](#section-1590)
- [全能智能助手](#section-1644)
- [LangChain 实战教程：从入门到实战](#section-1645)
- [写在前面](#section-1646)
- [一句话解释](#section-1648)
- [架构图](#section-1649)
- [核心能力](#section-1650)
- [安装依赖](#section-1652)
- [配置 API Key](#section-1653)
- [验证安装](#section-1654)
- [核心概念速览](#section-1655)
- [概念地图](#section-1656)
- [四大核心](#section-1657)
- [智能出行Agent助手](#section-1658)
- [📌 项目概述](#section-1659)
- [MCP Agent 智能助手效果演示](#section-1660)
- [什么是 MCP（Model Context Protocol）？](#section-1662)
- [什么是 RAG（检索增强生成）？](#section-1663)
- [什么是 Milvus？](#section-1664)
- [什么是 LangChain 和 LangGraph？](#section-1665)
- [整体架构](#section-1667)
- [文件结构](#section-1668)
- [数据流程](#section-1669)
- [MCP 服务器配置 (servers_config.json)](#section-1671)
- [天气服务器 (weather_server.py)](#section-1672)
- [API 服务器 (api_server.py)](#section-1673)
- [CLI 客户端 (client.py)](#section-1674)
- [ReAct Agent 工作原理](#section-1676)
- [MCP 通信协议](#section-1677)
- [环境准备](#section-1679)
- [配置环境变量](#section-1680)
- [运行方式](#section-1681)
- [添加新的 MCP 工具](#section-1683)
- [自定义 Prompt](#section-1684)
- [Q1: MCP 服务器启动失败？](#section-1686)
- [Q2: API Key 无效？](#section-1687)
- [Q3: 工具调用失败？](#section-1688)
- [八、技术栈总结](#section-1689)
- [九、参考资料](#section-1690)
- [RAG 知识库助手](#section-1691)
- [RAG 知识库问答系统 - 从0到1完整指南](#section-1692)
- [RAG 的定义](#section-1694)
- [为什么需要 RAG？](#section-1695)
- [RAG 的工作流程](#section-1696)
- [向量数据库简介](#section-1698)
- [Milvus 是什么？](#section-1699)
- [Milvus 的核心概念](#section-1700)
- [本项目中的 Milvus 配置](#section-1701)
- [整体架构图](#section-1703)
- [技术栈](#section-1704)
- [核心概念详解](#section-1705)
- [文本切分（Text Splitting）](#section-1706)
- [向量嵌入（Embedding）](#section-1707)
- [相似度搜索（Similarity Search）](#section-1708)
- [项目文件结构](#section-1709)
- [向量数据库管理器 (vector_db_manager.py)](#section-1711)
- [向量检索器 (vector_retriever.py)](#section-1712)
- [API 接口 (api_integration.py)](#section-1713)
- [环境准备](#section-1715)
- [命令行使用](#section-1716)
- [API 使用](#section-1717)
- [API 接口说明](#section-1718)
- [LangGraph实战开发智能体](#section-1719)
- [LangGraph 实战教程：从小白到高手](#section-1720)
- [写在前面](#section-1721)
- [第一章 LangGraph 是什么](#section-1722)
- [一句话解释](#section-1723)
- [为什么需要它？](#section-1724)
- [LangGraph vs LangChain](#section-1725)
- [安装依赖](#section-1727)
- [设置 API Key](#section-1728)
- [第三章 核心概念](#section-1729)
- [State（状态）](#section-1730)
- [Node（节点）](#section-1731)
- [Edge（边）](#section-1732)
- [第四章 第一个程序](#section-1733)
- [完整代码](#section-1734)
- [运行结果](#section-1735)
- [关键点](#section-1736)
- [第五章 Reducer 机制](#section-1737)
- [问题：状态被覆盖](#section-1738)
- [解决方案：使用 Reducer](#section-1739)
- [实际例子：游戏得分](#section-1740)
- [常用 Reducer](#section-1741)
- [第六章 条件分支](#section-1742)
- [关键函数：add_conditional_edges](#section-1743)
- [实际例子：智能客服路由](#section-1744)
- [第七章 循环流程](#section-1745)
- [关键点](#section-1746)
- [实际例子：答案优化器](#section-1747)
- [第八章 聊天机器人](#section-1748)
- [核心：MessagesState 和 add_messages](#section-1749)
- [完整聊天机器人](#section-1750)
- [第九章 Agent 工具调用](#section-1751)
- [定义工具](#section-1752)
- [工具定义要点](#section-1753)
- [第十章 ReAct Agent](#section-1754)
- [工作流程](#section-1755)
- [使用预置组件](#section-1756)
- [手动实现 ReAct Agent](#section-1757)
- [第十一章 多Agent协作](#section-1758)
- [Supervisor 模式](#section-1759)
- [完整实现](#section-1760)
- [智能客服系统架构](#section-1762)
- [持久化和记忆](#section-1764)
- [流式输出](#section-1765)
- [子图（Subgraph）](#section-1766)
- [Human-in-the-Loop](#section-1767)
- [调试技巧](#section-1768)
- [企业级电商智能客服 RAG](#section-1769)
- [目录](#section-1770)
- [一、项目简介](#section-1771)
- [学习案例：BearAgent-自进化Harness AI Agent项目](#section-2411)
- [学习案例：MClaudeCode从零构建的终端AI编程AI Agent项目](#section-2412)

<a id="section-0084"></a>
## Agent场景题

<a id="f-doxcnnL3zzXb1fMIntxbmi6Hice"></a>

<p id="f-doxcn78H9KdS80qR4hDT6SWVQyg"><span>这里更新一些Agent场景题，或者说是系统架构设计题目。这类题目通常来说是比较难的。</span></p>

<p id="f-doxcnGmzq7r08006kSYM2SBpHmJ"><span style="font-weight:bold">难点一</span><span>：需要你对Agent系统的全流程有宏观的理解。你至少设计过Agent架构，做过Agent项目，或者至少看过一些Agent架构，你才能够现场设计出来。另外，你设计Agent架构，最好设计得比较完整，比较合理，且有深度。</span></p>

<p id="f-doxcnmjbrPOMgFWsWMaXoMZQWSg"><span style="font-weight:bold">难点二：</span><span>通常来说，你设计出来了架构以后，不会说就结束了。面试官肯定是要围绕着你设计的系统进行探讨，问你为什么这么设计，你要说得出来你的设计原因，架构选型，也要经得起推敲和讨论。这就要求我们对整个设计的架构的各方面都要了解，那对我们综合能力就提出了一些要求。</span></p>

<p id="f-doxcnyLy7aHYCwbEc58Qgfiqz0g"><span>所以很多同学反馈过，Agent的系统架构的设计题很难，不会回答。今天可算逮到了一个真题，我们以这个真题来讲解如何攻破架构设计题，如何复习。</span></p>

<p id="f-doxcnz7NEIzmVMLZ0GHq6GceBlb"><span>先说场景题目的准备策略和理论基础，其实Agent场景设计题的理论基础是我们整个Agent的理论部分，项目经验。因为它本身就是一个综合的题目，还会问你各种细节，所以相关问题都是理论基础。这么说大家有没有一点绝望？</span></p>

<p id="f-doxcn4RRc2U448p9IjP4gLnhgTc"><span>哈哈，情况确实是这么个情况，这就是一个综合能力的考察。不过稍微可以画一下重点，对于架构设计也多少有一些模板。大家看了本节后设计起来应该会更容易。理论重点画一下特别关键的部分：</span></p>

<p id="f-doxcnxlUli4cexrc36c3JAvN0qc"><span><span><a href="/posts/agent-learning-11-multi-agent/#f-doxcntuQVjJ2aMEP4HF4qje1X9b"><span>Multi-Agent架构</span></a></span></span><span>：选单Agent还是多Agent，为什么，常见的Agent架构有啥，这些是设计架构最核心的。</span></p>

<p id="f-doxcny36BX75buiwEXozhNqMvfe"><span>开源项目部分：</span><span><span><a href="/posts/agent-learning-21-open-source-architectures/#f-doxcneK3qVfDjLnKOQFCdsbYDmf"><span>Claudecode部分</span></a></span></span><span>，</span><span><span><a href="/posts/agent-learning-21-open-source-architectures/#f-doxcnc8YH0bvC3K6RFin6B4JnIh"><span>Hermes Agent</span></a></span></span><span>, </span><span><span><a href="/posts/agent-learning-21-open-source-architectures/#f-doxcnfdqX7Xmgd1YRp2zV5utl0e"><span>Openclaw</span></a></span></span><span>, </span><span><span><a href="/posts/agent-learning-21-open-source-architectures/#f-doxcnFOWnBrl5Ak7OWmNe0UzNBc"><span>PI-Agent</span></a></span></span><span>. 这些笔记里讲的每一个Agent的架构，我们都有讲，你要是看了笔记，可以看出来它们其实也是类似的，有很多通用的地方。强烈建议从Pi-agent开始看，因为它最简单。</span></p>

<p id="f-doxcnWbhnmTLJxS6kIGgMhr9Ukh"><span>然后就是面试真题，和面试官去讨论架构设计的部分，它的整个讨论的逻辑，问题，都是我们掌握好Agent架构设计的好的素材。比如</span></p>

<p id="f-doxcnpi4BIU5tLOfDH3Qc2NrYFh"><span><span><a href="/posts/agent-learning-24-interview-review/#f-doxcnvVgC8ikiePZWxfGoISnqzd"><span>小红书</span></a></span></span><span>一面，</span><span><span><a href="/posts/agent-learning-24-interview-review/#f-doxcngrPSnBZqaMgnxtfDF66wxd"><span>夸克千问二面</span></a></span></span><span>。这两个面经有讨论架构设计，不过其他的面试多少都有讨论。</span><span><span><a href="/posts/agent-learning-24-interview-review/#f-doxcnVZsQykjyWV7PdW0V7Ostez"><span>滴滴Agent开发</span></a></span></span><span>专门考了Agent架构设计，里面有精讲，这些都是我们攻克这一问题的素材。</span></p>


<a id="section-0085"></a>
## 解题思路

<a id="f-doxcn1B880fRtuqcVff4wu0zKld"></a>

<ul><li id="f-doxcnyUbbeKAJL0A67MwAcinGFd"><span style="font-weight:bold">拿到题目先建立分析框架，而不是急着堆细节</span><span>。面对任何一个 Agent 场景，都可以从以下几个维度切入、逐层展开。其实你可以看出来我们的开源项目讲解，每个项目都有一个全局架构图，它的核心模块都是类似的，关键地方组成也比较相同：比如Agentic loop(react)，长期记忆，触发层整体框架是类似的，我们可以复用框架，结合填充下面的细节就好了：</span></li></ul>

<div id="f-doxcnQdcOm6ZQmCawk6fuAeKm1b" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">触发层</span><span>：谁来触发、是同步还是异步、要不要分级路由把简单情况挡在 LLM 之外。</span></div></div>

<div id="f-doxcnN2KfMd131G6nJ8wHXRBvRg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">Agent 架构</span><span>：核心推理骨架长什么样——通常是 </span><span style="font-weight:bold">Agentic loop（ReAct）</span><span>，有些场景也可以用更受控的 </span><span style="font-weight:bold">Workflow（编排式）</span><span>；关键是根据「延迟/成本/可审计」的要求，在「自由推理」和「固定编排」之间做取舍。</span></div></div>

<div id="f-doxcn7xg3rFrdCcWdTWG6oIQXgc" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">记忆模块</span><span>：靠什么沉淀经验、形成闭环学习，让这一次的结果能改进下一次。</span></div></div>

<div id="f-doxcnIM0DuM5Mvg2rd7x5xBOq7Q" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">业务场景逻辑</span><span>：把模型输出翻译成可执行动作（如分档、阈值、处置策略），这部分高度依赖具体业务。</span></div></div>

<ul><li id="f-doxcnMxPsXkSStuRZyk8lkRW4Fb"><span style="font-weight:bold">答题时沿着这几个维度展开，就能既有骨架又有细节</span><span>。下面的「关键设计要点」正是按这个框架，落到「信用卡欺诈检测」这个具体场景上的一次完整设计。</span></li></ul>


<a id="section-0086"></a>
## 信用卡欺诈检测Agent设计

<a id="f-doxcnNCfI9GEABxutgFs85w7rMh"></a>

<p id="f-doxcnwxFdD8eZZaUA9KoZLPEmKm"><span>此题选自</span><span><span><a href="/posts/agent-learning-24-interview-review/#f-doxcnVZsQykjyWV7PdW0V7Ostez"><span>202606 滴滴Agent开发（社招）面试真题</span></a></span></span><span>。 整个面试几乎都围绕整个架构设计题讨论。</span></p>

<p id="f-doxcnlZahWdLN5DZO6gwKdbnKNd"><span style="font-weight:bold">题目描述：</span></p>

<p id="f-doxcnLnVUGOC0J9xilW3GsqAKjd"><span>- 你可以获取客户的</span><span style="font-weight:bold">所有历史交易行为、商户信息</span><span>等数据（也可以自行创造非结构化数据）。</span></p>

<p id="f-doxcnlx7qfT2ieXIN8foboW0ISg"><span>- 现在</span><span style="font-weight:bold">新来一笔流水（交易）</span><span>，需要用 </span><span style="font-weight:bold">Agent 判断这笔交易是否为欺诈</span><span>。</span></p>

<ul><li id="f-doxcnu8nG1it0tBpcQBwwHP7sgb"><span>要求围绕这个场景，设计并讨论整个 Agent 系统。</span></li></ul>

<p id="f-doxcnOMprkJJMOPasEaWjrjiDJf"><span style="font-weight:bold">设计答案：</span></p>

<p id="f-doxcn2ITEfMJ22o7rRQv9vwvYId"><span>针对这个题目，我是设计了如下的架构图。设计要点在后面。框架我们可以复用，框架下面的细节，就是来自于我们的经验了。</span></p>

<div id="f-doxcnnWSGadJKWgX7zWXI1qXGLh"><img alt="" decoding="async" height="1280" loading="lazy" src="/images/agent-learning/8840b01e84c994aff6022243.png" width="853"/></div>

<p id="f-doxcn1yZiHV26IY6ReimjDIlaGe"><span style="font-weight:bold">关键设计</span></p>

<ol start="1"><li id="f-doxcnwQjYEM6pZH6p1x7DuybZ3e"><span style="font-weight:bold">触发层：事件驱动 + 分级路由，把重活挡在 LLM 之外</span></li></ol>

<ul><li id="f-doxcn9SASlH8gi0NcN8b09k6sYs"><span style="font-weight:bold">触发源按风控场景定义</span><span>：主源是「一笔交易到来」（同步、要秒级返回）；辅源是定时 Cron、外部 Webhook（黑名单/情报）、人工复查——辅源只用来</span><span style="font-weight:bold">离线刷新画像和模式库</span><span>，不阻塞实时链路。</span></li></ul>

<ul><li id="f-doxcnsfFTgR3hLRAy1qHvC3rS2f"><span style="font-weight:bold">Gateway 只做管道不做智能</span><span>：认证、把不同来源归一化成标准 schema、</span><span style="font-weight:bold">幂等去重</span><span>（同一笔只判一次，防重放）。这一层</span><span style="font-weight:bold">不调用 LLM</span><span>。</span></li></ul>

<ul><li id="f-doxcnjPdxwgFzJJyh6IX1sbIQSg"><span style="font-weight:bold">Router 分级路由是时效关键</span><span>：白名单/低风险 → 秒级放行；黑名单/硬规则 → 秒级拦截；只有落入</span><span style="font-weight:bold">灰区/可疑</span><span>的交易才进入昂贵的 Agent 层。绝大多数交易在此就解决，省成本、保延迟。</span></li></ul>

<ol start="2"><li id="f-doxcnQDB5liRr1VhLdzBiqAmXsb"><span style="font-weight:bold">Agent架构：React模式</span></li></ol>

<blockquote id="f-doxcnMO74obxA1BtQc1oviaMDvg"><p id="f-doxcn5WfYCjvWPrN7cUWPcVOWUg"><span style="font-weight:bold">为什么这里选 ReAct loop 而不是 Workflow？</span><span> 选型的核心判据是「流程是否确定」。</span><span style="font-weight:bold">业务逻辑高度确定、步骤固定可枚举</span><span>时（如「先查A→再查B→最后打分」这种不会因中间结果而变的固定管线），用 **Workflow（编排式）</span><span style="font-weight:bold">更好——路径可预测、延迟成本可控、易审计。而</span><span>步骤灵活、需要 Agent 根据中间结果动态决定下一步、尤其需要 Agent 自己判断「是否收敛」**时（如本场景要判断「现有证据是否足够定案，够了就退出、不够就再追查一维」），就必须用 </span><span style="font-weight:bold">Agentic loop（ReAct）</span><span>——因为「查哪些维度、要不要基于中间证据再追一手、什么时候停」无法预先写死，得靠模型边看边决策。本场景两种特征都有，所以采用「固定骨架（Workflow 的可控）+ 有界 ReAct（loop 的灵活）」的混合式。</span></p></blockquote>

<ul><li id="f-doxcnvRoN7b6lWHKU5CTK1yDncg"><span style="font-weight:bold">不放开让主 Agent 自由 fork 子 Agent</span><span>，而是「预定义骨架 + 编排层有界 ReAct」的混合式——因为实时风控要</span><span style="font-weight:bold">延迟/成本可预测、可审计</span><span>，纯自由推理路径不可控、且会放大错误。</span></li></ul>

<ul><li id="f-doxcnBxtURyNuiLrc6wPeSq3myb"><span style="font-weight:bold">Worker 池预先定义好</span><span>（地理/速度、行为偏移、商户风险、设备与关联网络四个维度，相互独立、可并行）。</span><span style="font-weight:bold">这次调不调、调哪几个、要不要基于中间结果追加一手</span><span>，由 Orchestrator 的有界 ReAct 决定：</span><span><span><span>Think 该查哪些维度 → Act 并行调起子 Agent → Observe 收集证据 → Think 证据够吗？</span></span></span><span> 不够且未超上限就</span><span style="font-weight:bold">循环回 Act 追加一手</span><span>，够了或达上限（最多 R 轮 / N 个 Worker / 超时）就收敛退出。</span></li></ul>

<ul><li id="f-doxcnfq1SWnKenVnQewpOgXGuhb"><span style="font-weight:bold">每个 Worker 内部也是一个小 ReAct</span><span>（感知→调工具查数据→局部研判出风险档→自检打置信度分），但目标和工具集被</span><span style="font-weight:bold">限死在单一维度</span><span>，不会乱跑。Worker 之间</span><span style="font-weight:bold">只回传摘要</span><span>给主 Agent，不共享全部中间过程，控制上下文膨胀。</span></li></ul>

<ul><li id="f-doxcn5LHUujfb43dvZ54yA5ZBmh"><span>一句话：</span><span style="font-weight:bold">「固定编制的侦查队 + 一个会随机应变但受纪律约束的队长」</span><span>。</span></li></ul>

<ol start="3"><li id="f-doxcn2oP7xUZ58E2BrJ8FqBlArc"><span style="font-weight:bold">Critic 模式：两级复核，一轻一重，判官≠打分者</span></li></ol>

<ul><li id="f-doxcnT2PsUqU9PJ3cEGpjDIEW3c"><span style="font-weight:bold">第①级 · Worker 内部自检（轻）</span><span>：每个 Worker 出结论前给自己打个置信度分。不是独立 Agent，只是 prompt 里一步，便宜快，用来给每条信号带上 confidence，方便融合层</span><span style="font-weight:bold">按置信度过滤/降权，治噪声</span><span>。</span></li></ul>

<ul><li id="f-doxcnvW1qm3Mw6xnPzoUEw49jzb"><span style="font-weight:bold">第②级 · 独立复核 Critic（重）</span><span>：位置在</span><span style="font-weight:bold">评分融合之后、决策之前</span><span>。它是</span><span style="font-weight:bold">独立 Agent、独立干净上下文</span><span>，只拿到「综合判定 + 完整证据链」，做对抗式复核，专门找「这个判定站不站得住、有没有把正常交易误判成欺诈」，</span><span style="font-weight:bold">压低误报</span><span>。</span></li></ul>

<ul><li id="f-doxcnYCrmMDPN7snVLUKkC6fTGc"><span style="font-weight:bold">为什么必须独立、且在融合之后</span><span>：单个 Worker 只有一维信息，站位不够，要等证据链拼全才有得审；而「做者不评自己的分」，让打分者自评会系统性高估，所以 Critic 必须换一个干净上下文。重活集中做一次，避免每个 Worker 都挂重 Critic 拖垮延迟。</span></li></ul>

<ul><li id="f-doxcnPBY3O7D43IQSpd1DZHJRLg"><span>（可选）</span><span style="font-weight:bold">第③级 · 人工兜底</span><span>：只对「高额 / 低置信 / Critic 与打分层有分歧」的少数 case 转人工。</span></li></ul>

<ol start="4"><li id="f-doxcnzhCwNA4FYmNtiFyGoROFeg"><span style="font-weight:bold">业务逻辑：决策分档，把风险分翻译成可执行的动作</span></li></ol>

<blockquote id="f-doxcnMRuagwstnEBiP13wlM1Ubd"><p id="f-doxcnMhSfBxpEiSXYKTfTUvJhAg"><span style="font-weight:bold">为什么要专门谈业务逻辑？</span><span> 这一层其实</span><span style="font-weight:bold">和大模型本身没什么关系</span><span>——它不涉及 prompt、推理、记忆这些「AI 味」很重的东西，纯粹是业务规则。但恰恰是这一层最能体现答题者的</span><span style="font-weight:bold">思维严谨性和边角 case 覆盖度</span><span>：能不能想到「灰区不该非黑即白，而要给一个加验证的缓冲带」、能不能意识到「阈值是业务对误报/漏报成本的权衡而非技术最优」、能不能覆盖「高额、低置信、Critic 分歧」这些需要人工兜底的边界情况——这些细节比堆砌 AI 概念更能拉开区分度。</span><span style="font-weight:bold">把架构真正落到具体业务上，而不是停在通用框架，是这类题的加分项。</span></p>
</blockquote>

<ul><li id="f-doxcnkeMBETBMV3KrtPKlu3agBh"><span style="font-weight:bold">风控的输出不是一个分数，而是一个动作</span><span>：Agent 层最终给出的是「综合风险分 + 置信度 + 证据链」，但业务侧真正要的是「这笔到底放不放」。决策分档就是这层翻译——</span><span style="font-weight:bold">按风险高低切成几档，每档绑定一个明确处置动作</span><span>，而不是让下游各自解读分数。</span></li></ul>

<ul><li id="f-doxcnqe65Mx4CyJZ0d7lC2joYoh"><span style="font-weight:bold">分档与动作（典型四档）</span><span>：① </span><span style="font-weight:bold">低风险 → 直接放行</span><span>（无感通过）；② </span><span style="font-weight:bold">中风险 → 加验证</span><span>（触发 3-D Secure / 短信验证码 / 人脸等 step-up，把决策权交还用户，既拦欺诈又不误伤）；③ </span><span style="font-weight:bold">高风险 → 直接拦截</span><span>（拒绝交易 + 通知）；④ </span><span style="font-weight:bold">高额 / 低置信 / Critic 与打分层分歧 → 转人工复审</span><span>。核心思想是</span><span style="font-weight:bold">给灰区一个「加验证」的缓冲带，而不是非黑即白</span><span>。</span></li></ul>

<ul><li id="f-doxcnlvk6JUCvqncZcbKndxIxfH"><span style="font-weight:bold">分档线由业务而非模型定</span><span>：阈值不是技术最优解，而是</span><span style="font-weight:bold">业务对「误报 vs 漏报」成本的权衡</span><span>——高价值商户/大额交易调保守（宁可多加验证），低风险场景调宽松（保通过率、保体验）。所以阈值要</span><span style="font-weight:bold">可配置、可按场景/额度/商户分层设定</span><span>，并随记忆模块回流的真实指标动态调整。</span></li></ul>

<ul><li id="f-doxcnDYgXXBYyWgo2ojpXfiPaSe"><span style="font-weight:bold">为什么单独成层</span><span>：把「分档规则」从 Agent 推理里剥出来，好处是</span><span style="font-weight:bold">决策可解释、可审计、可快速调参</span><span>——运营改一个阈值就能收紧/放松，不用动模型；也让同一套风险分能服务不同业务线的不同风险偏好。</span></li></ul>

<ol start="5"><li id="f-doxcnQ20pHDau2lx9RShJqR4HMc"><span style="font-weight:bold">记忆模块：用真实结果做沉淀，形成闭环学习</span></li></ol>

<blockquote id="f-doxcneUq3y1HIIc6yanFClmoiHb"><p id="f-doxcn1oQItJAGCMTF4gBWc3altb"><span>长期记忆是让 Agent 从「一次性判断」进化到「越用越聪明」的关键。建议设计的时候一定要设计上。笔记里其实讲过很多可复用的知识：**长期记忆到底该存什么？各个开源架构（如 ClaudeCode、Pi-agent、Hermes 等）的长期记忆模块分别沉淀了哪些东西、用什么结构组织？**设计时完全可以把这些经验迁移过来——比如「哪些该进画像、哪些进模式库、哪些只是短期上下文」，就是参照成熟架构的记忆分层思路，落到欺诈检测场景后的一次具体化。有这层积累，记忆模块才不会设计得空洞，而是有据可依。</span></p></blockquote>

<ul><li id="f-doxcnrfc2C9A5ZudLL7HqVn23Ph"><span style="font-weight:bold">它不服务当前这笔交易，服务的是未来每一笔</span><span>。当场给出的判定只是「预测」，判得对不对要等</span><span style="font-weight:bold">真实结果</span><span>才知道——放行的过几天被投诉盗刷（说明漏报），拦截的被投诉「本人却被拦」（说明误报），或人工复查给出权威裁决。这些真相</span><span style="font-weight:bold">几小时/几天后才回流</span><span>，所以是异步、事后。</span></li></ul>

<ul><li id="f-doxcnhF4BwRRLZ6IhSxBoHPoZFh"><span style="font-weight:bold">沉淀机制（拿到真实标签后做三件事）</span><span>：① 更新</span><span style="font-weight:bold">账户风险画像</span><span>（这个账户真被盗刷过 → 以后多留心）；② 更新</span><span style="font-weight:bold">欺诈模式库</span><span>（新手法记下来，下次能认出）；③ 调整</span><span style="font-weight:bold">评分阈值</span><span>（漏报变多就调低拦截线，误报太多就调高）。</span></li></ul>

<ul><li id="f-doxcnShcjUrdnlTwzOIjk1VrHxd"><span style="font-weight:bold">闭环</span><span>：这些沉淀绕回喂给 Orchestrator，让下一次判定更准——「上一笔的教训，喂给下一笔」。同时，真实标签回流也是计算 Recall / Precision（评估准确率、驱动迭代）的</span><span style="font-weight:bold">唯一数据源</span><span>，没有它整个评估体系无从谈起。</span></li></ul>


<a id="section-0087"></a>
## 讲解视频

<a id="f-doxcn6nGSv1GbQ7g4WGbfUCEvze"></a>

<p id="f-doxcnUmbC4AaO1YMgJ4Kl2uxHRg"><span><span><a href="https://www.bilibili.com/video/BV1t5Nr6kEvm/?vd_source=144bec9c3f54e465073138bed788be1b#reply305991560737"><span>https://www.bilibili.com/video/BV1t5Nr6kEvm/?vd_source=144bec9c3f54e465073138bed788be1b#reply305991560737</span></a></span></span></p>


<a id="section-0136"></a>
## 应用开发项目与开源架构解析:[理论学完后学习]

<a id="f-doxcnKjfpE5ssYZmAGG3UMnY2Kb"></a>

<p id="f-doxcnLzPlGCeiKrjORZ5XtGslIh"><span>项目直达：</span><span><span><a href="#f-doxcn2UuVdw5tRU20F4G5ZRs1Kh"><span>Agent 项目实战</span></a></span></span><span> ｜ </span><span><span><a href="#section-0148"><span>RAG 项目实战</span></a></span></span><span> ｜ </span><span><span><a href="/posts/agent-learning-18-training-inference/#f-doxcnIjLgG7Pe2zBY5bPMMqlIRh"><span>后训练项目（可选第二阶段）</span></a></span></span></p>


<a id="section-0137"></a>
## 技术知识与案例补充

<p id="f-doxcnMjgdN1Pt4qIXcm1rD9E7ih"><span>哪些项目值得做，项目里的哪些地方值得做？如何让你的项目看上去更值钱，避免被面试官说浅。我目前想到的两个专题：</span></p>

<p id="f-doxcnlIvhrlERg2Xtj3DepRmEZe"><span>1.</span><span style="font-weight:bold"> 2026值得做的AI项目/方向，如何做得深入，从Demo变成生产级应用？</span></p>


<a id="section-0138"></a>
## 2026年真正有价值的AI项目

<a id="f-doxcnT8qpq6xau2OY8jqpLALVad"></a>

<p id="f-doxcnkIU8KredVabpfUzX4xdsIg"><span>如果你想在 2026 年进入 AI 工程领域，或者想在目前的基础上进一步提升，下面这六个项目值得认真投入——当你坐在面试官面前时，它们会真正产生作用。</span></p>

<p id="f-doxcnjLyDRgsz6OzBOi7Tasm92g"><span>关于做什么项目的建议往往让人无所适从，因为每个人观点都不一样，很难判断哪些内容真正重要、哪些只是噪声。因此这里把它归纳成六个项目，每个项目都对应</span><span style="font-weight:bold">一种独特且市场需求旺盛的技能</span><span>。下面会逐一说明具体应该构建什么、使用哪些工具，以及更重要的——</span><span style="font-weight:bold">为什么每个部分都很重要</span><span>。</span></p>

<p id="f-doxcneIVRi8StWWjm3tnN2Y2Wwc"><span>这个小节的笔记，文字里我也一起总结了非常多的官方的参考文档，项目的链接。肯定读不完，按</span><span style="font-weight:bold">需要阅读。</span></p>

<p id="f-doxcnzfnxXvi9QgHoFA6RSAKXBd"><span>下面介绍的6个方向，还是针对于大模型开发岗位来说的，如果要我排优先级：</span></p>

<p id="f-doxcnWjFeI7YFUgtQLHTv8DnC7d"><span style="font-weight:bold">Agent项目是必做的。</span></p>

<p id="f-doxcnnV8Ve1Xm4jgsaBlmrOLpsd"><span style="font-weight:bold">RAG重要性次之，但是几乎也一定要会的</span><span>，</span><span style="font-weight:bold">监控和可持续性等于加分项，提升你这两个项目的竞争力。</span></p>

<p id="f-doxcnzZRDwodsqcREMM1SdL9Dyc"><span style="font-weight:bold">LoRa和DPO强化学习</span><span>属于</span><span style="font-weight:bold">加分项，非必要项</span><span>，有的应用岗也会问。</span></p>

<p id="f-doxcn0EBPNKP1s64F0M5mcxKgaf"><span style="font-weight:bold">多模态</span><span>是</span><span style="font-weight:bold">可选项和加分项</span><span>，做了以后可以去投递一些多模态方向大模型岗位。</span></p>

<a id="f-doxcnIORZucpGchHuC7NeNxJZFg"></a>

##### 生产级 RAG 系统

<p id="f-doxcneQm43B9s42VniIpMXg7CUd"><span>第一个项目是</span><span style="font-weight:bold">生产级</span><span>的检索增强生成系统，也就是 RAG。它被频繁提及是有原因的：RAG 确实是目前企业 AI 中最常见的模式之一。</span></p>

<p id="f-doxcncoex3ETVVcqXYCrr3kbtQf"><span>但必须明白，</span><span style="font-weight:bold">RAG 演示程序与真正可以投入生产的 RAG 系统之间存在巨大差距</span><span>，而这个差距正是你能够体现自身区别的地方。</span></p>

<p id="f-doxcn2zJzrcfFZ15Rp9vKDPqTeb"><span>你要构建的是一个面向特定领域的 "Ask My Docs（询问我的文档）" 系统。选择一组文档，例如技术文档、研究论文、法律合同或医疗资料，然后构建一个能够检索正确信息、依据资料回答问题并给出引用的系统。</span></p>

<p id="f-doxcnOHLdzr1EQF2rwRM4cXEx1d"><span>这里的关键词是</span><span style="font-weight:bold">引用</span><span>。任何人都可以让大语言模型生成一个听起来可信的答案，但</span><span style="font-weight:bold">只有把答案建立在实际检索到的证据上，系统才值得信任</span><span>。</span></p>

<a id="f-doxcn0T5RMhyfju9V8gcyYSJp2b"></a>

###### 第一阶段：完成基础功能

<p id="f-doxcnpehvuUOUy4PUeXk1tueBUQ"><span>首先导入文档，包括 PDF、Markdown 或网页。然后把文档切成每块约 </span><span style="font-weight:bold">500～800 Token</span><span> 的片段，相邻片段之间保留约 </span><span style="font-weight:bold">100 Token 的重叠</span><span>。</span></p>

<p id="f-doxcn5b5jW69YPBRaKvyffvthvd"><span style="font-weight:bold">重叠很重要</span><span>，因为你不希望在边界处刚好切断一句重要的话，从而丢失上下文。接着，把这些片段转换成 Embedding，存入向量数据库。你可以从 Chroma 或 Weaviate 等工具开始。</span></p>

<p id="f-doxcnevExNCAQ8wIkhjU4tTnDXg"><span>然后构建检索流程：针对用户问题，取回相关度最高的 Top-K 文档片段，再生成答案，并标明信息来自哪里。</span></p>

<p id="f-doxcn6C38bUpIgNZlRvIXbOxy3f"><span>这一阶段的成果很直观：你可以向别人展示一份文档、系统生成的答案，以及答案所依据的准确段落。</span></p>

<blockquote id="f-doxcnvC7hJBWT5RLaE4JXoeRafb"><p id="f-doxcnIAah1mhv20Rlo3NQTkNyth"><span>延伸阅读：</span><span><span><a href="https://docs.langchain.com/oss/python/langchain/rag"><span>LangChain 官方 RAG 教程</span></a></span></span><span>，一步步教你构建检索链。</span></p></blockquote>

<a id="f-doxcnLOJEw7nh7cZPJf6HV5YWTr"></a>

###### 第二阶段：从演示升级到生产质量

<p id="f-doxcnCxqM8mmp20eqBSZV8JR70f"><span style="font-weight:bold">这是大多数人从未做到的部分，因此也格外有价值。</span></p>

<p id="f-doxcnWzWFm8BLk0PcleMwLVXtjc"><span>首先实现</span><span style="font-weight:bold">混合检索</span><span>，也就是把传统的 </span><span style="font-weight:bold">BM25 关键词搜索</span><span>与</span><span style="font-weight:bold">基于向量的语义搜索结合起来</span><span>。向量搜索擅长理解含义和意图，但有时用户会搜索某个非常具体的术语或短语，而 BM25 对这种情况处理得很好。</span></p>

<p id="f-doxcnXQoxuQVulHOJJdTm6eLPic"><span>在此基础上加入 </span><span style="font-weight:bold">Cross-Encoder 重排序器</span><span>。它接收第一轮检索得到的文档片段，把问题和每个片段作为一对输入重新评分。这样通常能够显著提高检索结果的精确度。相关原理可以参考 </span><span><span><a href="https://docs.cohere.com/docs/rerank"><span>Cohere 的 Rerank 指南</span></a></span></span><span>，它解释了 Cross-Encoder 如何工作、以及为什么能提升检索精度。</span></p>

<p id="f-doxcnLwv9tqui2q3ep8qOCXZFnh"><span>还应该实施</span><span style="font-weight:bold">引用约束</span><span>：如果检索到的内容不足以支持某个明确答案，</span><span style="font-weight:bold">系统必须拒绝回答</span><span>，而不是编造一个听起来合理的说法。</span></p>

<p id="f-doxcnHFr0lpgMDP1Fkd4vV7xqSd"><span>此外，把所有 Prompt 保存在带版本的配置文件中。</span><span style="font-weight:bold">Prompt 是系统架构的一部分</span><span>，像管理代码一样管理它们，体现了真正的工程成熟度。</span></p>

<a id="f-doxcnbUIjCEWMWuxQAPODprDnJc"></a>

###### 第三阶段：让系统真正具备交付能力

<p id="f-doxcn4Ed2yR8LxQiMPUdWxJWLYg"><span>人工整理一套包含大约 </span><span style="font-weight:bold">50～200 个问答对的黄金评测集</span><span>，并确认每条答案都正确。然后编写离线评测脚本，测量 </span><span style="font-weight:bold">Faithfulness（忠实度）</span><span>，也就是生成答案中的主张是否真的得到检索片段的支持。</span></p>

<p id="f-doxcnqG7OyPuclDEM0qoKOvn6wd"><span>把评测</span><span style="font-weight:bold">接入持续集成流程</span><span>，让每个 Pull Request 都自动运行评测。</span><span style="font-weight:bold">如果质量低于设定的门槛，就让构建失败。</span></p>

<p id="f-doxcnPOi9iTZll7tkwKxdO6yfMG"><span>这正是生产 AI 团队的工作方式。在项目中展示这种纪律，会立即让面试官看到你理解 AI 系统的完整生命周期。</span></p>

<p id="f-doxcnD2jtS4EHoWwUtjT3x89Nvg"><span style="font-weight:bold">技术栈建议</span></p>

<div style="margin-left:25px"><p id="f-doxcnNPZ20ykoc2QrcgAzjA9VHg"><span>流程编排：</span><span style="font-weight:bold">LangChain </span><span>或</span><span style="font-weight:bold"> LangGraph</span></p><p id="f-doxcnPkvTnb0f6vgB0fOi4GQYTd"><span>向量数据库：</span><span style="font-weight:bold">ChromaDB</span><span> 或</span><span style="font-weight:bold"> Weaviate</span></p><p id="f-doxcnRA42pFfdKOeTlPCclIkFhe"><span>重排序：</span><span style="font-weight:bold">Cohere Rerank</span><span>，或 Sentence Transformers 中的</span><span style="font-weight:bold"> Cross-Encoder </span><span>模型</span></p><p id="f-doxcnVCbSeU8cqqOqf75TjyERvc"><span>评测框架：</span><span><span><a href="https://docs.ragas.io/"><span>Ragas</span></a></span></span><span>，专为评估 RAG 而设计，可衡量忠实度、答案相关性与上下文精度</span></p></div>

<a id="f-doxcnIUfytijSmy4n9CfRNKlEhe"></a>

##### 完全离线的本地小模型助手

<p id="f-doxcnkvqcRifzfGHtGq39mISYvh"><span>第二个项目是使用小语言模型构建一个完全离线运行的本地 AI 助手。这个项目的重要性常常被低估。</span></p>

<p id="f-doxcnAdFTRYcQ65wEj2gItkBqth"><span>你可能会问：</span><span style="font-weight:bold">既然可以调用 GPT-5 这样的强大 API，为什么还要在本地运行能力较弱的小模型？</span><span>答案是，</span><span style="font-weight:bold">现实中有许多情况不能或不应该把数据发送给外部服务</span><span>。</span></p>

<p id="f-doxcneWyCJdXKVnLX20pEC19PZe"><span>你需要考虑隐私法规；某些延迟要求不允许网络往返；大规模使用时会受到成本限制；在边缘设备上也不能保证有互联网连接。</span><span style="font-weight:bold">企业非常重视这些限制，但多数候选人几乎没有处理这些问题的实际经验</span><span>。</span></p>

<a id="f-doxcnTfSzt6n8qNsTQ2wzKdReLc"></a>

###### 第一阶段：部署并测量

<p id="f-doxcnjEBbPzfPbvWU00k6HIW3oh"><span>首先安装 </span><span><span><a href="https://github.com/ollama/ollama"><span>Ollama</span></a></span></span><span>，它是让开源模型在笔记本电脑上运行的最简单方式之一。下载一个 3B～7B 参数规模的模型，例如 Llama 3.2、Phi-4 或 Mistral 7B，然后为它制作命令行工具，或者用 </span><span><span><a href="https://fastapi.tiangolo.com/tutorial/"><span>FastAPI</span></a></span></span><span> 封装成一层可用的接口。</span></p>

<p id="f-doxcnz0N5JjXXu9AnVKWG8z4K9g"><span>第一阶段最重要的是</span><span style="font-weight:bold">测量</span><span>。严格记录模型的推理性能，包括</span><span style="font-weight:bold">每秒生成 Token 数</span><span>、</span><span style="font-weight:bold">首 Token 延迟以及总响应延迟。</span><span>把这些数据写进项目文档，因为它们能够说明本地推理在现实中的取舍。</span></p>

<a id="f-doxcn66Boif6jDA99GaRUGOXNNf"></a>

###### 第二阶段：加入结构和确定性

<p id="f-doxcnAvz6jb8EaZQC6VCLJw7E8g"><span>要求模型按照指定 JSON Schema 输出，并使用 Pydantic 验证结果。如果输出不合法，就捕获错误并重新提示模型一次；如果仍然失败，则优雅地返回错误。</span></p>

<p id="f-doxcnUQdrd47Fenh0msUjsXAxRf"><span>"约束生成 + 验证 + 重试"是生产系统中经常使用的模式，但在个人项目里却很少见。工具方面，</span><span><span><a href="https://python.useinstructor.com/"><span>Instructor</span></a></span></span><span> 是业界标准，专门用于在 LLM 输出上强制 Pydantic Schema 并优雅地处理重试。</span></p>

<p id="f-doxcnP0xFZCkGAFCy1aCHBMTKQd"><span>还应该研究 Temperature 参数。对同一批 Prompt，</span><span style="font-weight:bold">分别以 Temperature 0 和 0.7 </span><span>运行，比较输出差异。这表明你理解</span><span style="font-weight:bold">语言模型具有随机性，也知道在可靠性重要时如何控制它</span><span>。</span></p>

<a id="f-doxcn9mYwY9mmoiHO6gTCL5KYWg"></a>

###### 第三阶段：进行模型对比研究

<p id="f-doxcnnmvfZEP5cPxx576C3QKdUc"><span>选择三个模型，例如</span><span style="font-weight:bold"> Llama 3.2 3B、Phi-4 Mini 和 Mistral 7B</span><span>，在完全相同的硬件上测试它们。</span></p>

<p id="f-doxcni3RPk2y3324mNoXzt6bRRb"><span>比较内存占用、每秒 Token 数，以及它们在一套标准化的 30～50 条测试 Prompt 上的输出质量。把实际数据和分析写成简洁的技术报告。</span></p>

<p id="f-doxcnLtAats61RMBCqVYnyhZHof"><span>模型选型是每个 AI 团队都要经常面对的决定。</span><span style="font-weight:bold">用系统性数据做选择，而不是采用社交媒体上最流行的模型，会让面试官看出你具有工程师思维</span><span>。</span></p>

<p id="f-doxcnc98sGw2WeErCC8xvzQLi7h"><span>如果想更进一步，可以测试这些模型的 GGUF Q4、Q5 等量化版本，并记录</span><span style="font-weight:bold">质量与速度</span><span>之间的取舍。</span><span><span><a href="https://huggingface.co/docs/optimum/concept_guides/quantization"><span>Hugging Face 的量化指南</span></a></span></span><span>详细讲解了 GGUF、Q4、Q5 等格式如何在不严重损失质量的前提下压缩模型。这种严谨程度会让你的项目明显不同，也能帮助你真正理解 AI 工程的基础。</span></p>

<a id="f-doxcnOGIGDynrv2qbOCzgr4yObf"></a>

##### 监控与可观测性

<p id="f-doxcngb395mUEpe1iVWfnSPMbWe"><span>        第三个项目几乎没有人会去做，这正是建议你做它的原因。把项目一中的 RAG 应用拿出来，为它添加全面的监控和可观测性层。</span></p>

<p id="f-doxcn9xCajvJU4bGeKfCmwuG6ec"><span>        在生产环境中，构建初始系统可能只占 30% 的工作。剩下 70% 是了解系统是否正确运行、失败时理解原因，以及迅速诊断和解决问题。</span></p>

<p id="f-doxcnufTSOZ5zh4om49iwta2bdg"><span>        如果你能展示这种系统思维，就会立刻区别于那些只会"把东西做出来"的候选人。本节</span><span><span><a href="/posts/agent-learning-15-evaluation-observability/#f-doxcnqrKdVGPbNYY8Xm3Fr8NVkh"><span>Agent评估</span></a></span></span><span> 章节有更</span><span style="font-weight:bold">加详细的工程化方法讲解如何去做Agent评估</span><span>。包括</span><span><span><a href="#section-0148"><span>RAG项目</span></a></span></span><span>中，也做了阶段1阶段2。</span></p>

<a id="f-doxcn7hyJFNTSLgFrUWustCVkeS"></a>

###### 第一阶段：追踪每一个步骤

<p id="f-doxcnwsW3c8b2oIofe2wgmUSUqd"><span>        为 RAG 流程中的每一步加入 </span><span style="font-weight:bold">Trace</span><span>。对于每个请求，你应该能够看到：</span><span style="font-weight:bold">检索到了哪些片段、重排序器怎样改变了它们的顺序</span><span>、发送给大模型的 Prompt 是什么、模型返回了什么，以及使用了多少 Token。</span></p>

<p id="f-doxcnlJanHqHgzqBhCBzZ3ghgHb"><span><span><a href="https://langfuse.com/docs"><span>        Langfuse</span></a></span></span><span>、</span><span><span><a href="https://docs.smith.langchain.com/"><span>LangSmith</span></a></span></span><span> 和 Braintrust 都可以帮助你完成这些工作。对于刚开始的人，尤其推荐 Langfuse，因为它是开源的，也可以自行托管，便于持续实验和迭代；它文档中的 "Tracing" 与 "Scores/Evaluations" 两部分正是这个项目需要的内容。LangSmith 则是 LangChain 原生的可观测性工具，很适合用来理解 Prompt 版本管理与链路追踪。</span></p>

<a id="f-doxcnfAggaWssMyPJzOcEpEJsNg"></a>

###### 第二阶段：长期追踪质量指标

<p id="f-doxcnghF5nHG7tKWjckuB3OfFFf"><span>        这时你要开始像 AI 领域的站点可靠性工程师一样思考。</span></p>

<p id="f-doxcnYr0qTVNzrELgfTxyOFIzog"><span style="font-weight:bold"> 测量 P50 和 P95 延迟</span><span>，</span><span style="font-weight:bold">而不只是平均延迟</span><span>，因为平均值经常掩盖最差的用户体验。记录每个请求的成本，让你能够用金额衡量每次查询的花费。</span></p>

<p id="f-doxcnvLKJiWYB8B60gegruDsslg"><span style="font-weight:bold">测量引用覆盖率，也就是有多少回答真正建立在检索证据上。同时监控失败率</span><span>：系统多频繁报错，或者生成它无法用资料支持的答案。</span></p>

<p id="f-doxcnDHBRxtYxs30dH84CU5NVfh"><span>        你最终应该能够做到：当别人问"</span><span style="font-weight:bold">上周二系统质量下降时发生了什么"，你可以打开仪表盘，指出异常，并解释根本原因</span><span>。</span></p>

<a id="f-doxcn3V7DgDVoahZTlyI7OFfSch"></a>

###### 第三阶段：建立回归质量门禁

<p id="f-doxcnytPk8DItgpnYeXLm7BNnif"><span>        把项目一中的</span><span style="font-weight:bold">评测集接入持续集成流程</span><span>。如果忠实度或其他关键指标低于阈值，构建就会失败，该改动不能合并。</span></p>

<p id="f-doxcnn0AeGNMqVGvybnyxCjAUJe"><span>        同时，对 Prompt 和配置文件进行版本管理，因为 Prompt 改动对系统行为的影响可能和代码改动一样大。</span></p>

<p id="f-doxcnsOzskIMBpwTUDBc9sQacGc"><span style="font-weight:bold">这是生产 AI 团队每天都在使用的工作纪律，在个人项目中却非常少见，因此非常有说服力</span><span>。关于生产 AI 系统如何被架构、监控和评估，Eugene Yan 的 </span><span><span><a href="https://eugeneyan.com/writing/llm-patterns/"><span>《Patterns for Building LLM Systems》</span></a></span></span><span> 是一篇必读文章。</span></p>

<p id="f-doxcnzbGIpytxossZHhD5oNAtOd"><span>        这个项目可能不像 AI 图像生成器或带有漂亮前端的聊天机器人那样吸引眼球，但它传递了雇主非常重视的一点：你会从整体上思考系统，而不只是关注中间的模型。很多 AI 团队目前迫切需要的正是这种系统级思维。</span></p>

<a id="f-doxcnpxTYSr26itcIqaGF3plZjd"></a>

##### 使用 LoRA 和 DPO 微调

<p id="f-doxcnv4DbAygFfn7GFqyg79HObb"><span>第四个项目是</span><span style="font-weight:bold">模型微调</span><span>。关于什么时候以及为什么进行微调，业界存在许多误解。</span></p>

<p id="f-doxcnmT3dIhH5KoNCTi7NIsYHgb"><span style="font-weight:bold">微调不是让模型在所有方面都变得更聪明，而是让模型在一个定义清楚、即便认真设计 Prompt 仍然表现不足的特定任务上，持续保持优秀表现</span><span>。</span></p>

<p id="f-doxcnDMgBy4zgCr0qIiCk0sNkYe"><span>在微调之前，</span><span style="font-weight:bold">你必须找到一个能够清楚证明差距的任务：先展示基础模型配合精心设计的 Prompt 所能达到的最好成绩，再用指标展示微调后的提升</span><span>。</span></p>

<p id="f-doxcnVj4QhqO1oJVOCBuQ6ejZWt"><span>强烈建议选择</span><span style="font-weight:bold">两类任务之一</span><span>：从混乱的非结构化文本中提取结构化 JSON，或者提高工具调用准确率——让模型选择正确函数，并填写正确参数。这些任务中，微调往往会产生清楚且可以量化的提升。</span></p>

<a id="f-doxcnCTFnz5m0N2iY8fnonrruIc"></a>

###### 第一阶段：监督微调

<p id="f-doxcnpfFaig2QQQfI06R9n4ESoc"><span>首先使用 LoRA 进行监督微调。准备大约 2,000～10,000 条干净数据。"干净"非常重要，因为数据质量远比数量重要。如果</span><span style="font-weight:bold">训练样本不一致或格式很差，你实际上是在教模型输出不一致、低质量的结果</span><span>。</span></p>

<p id="f-doxcnZQlArbkSPWmCIdWSr2wyDc"><span>使用 LoRA 或 QLoRA 进行参数高效微调，这意味着你不需要庞大的 GPU 集群。一张 A100，甚至使用 QLoRA 的 T4，都可能完成任务。基础模型可以选择 Qwen3 8B 这一量级的开源模型。</span></p>

<p id="f-doxcnASNQZ8hTgjO8HiAUQlJmHe"><span>在独立保留的测试集上使用具体指标评估，例如 JSON 有效率、完全匹配准确率以及正确拒答率——也就是当模型不应该回答时，是否会正确拒绝。</span></p>

<p id="f-doxcnR03iAYCjIY0g08z3xPNnpd"><span>可用的 SFT 数据集：</span></p>

<div style="margin-left:25px"><div id="f-doxcnyvbt2xbltfkDqdW5H3ieBc" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span><span><a href="https://huggingface.co/datasets/HuggingFaceH4/ultrachat_200k"><span>HuggingFaceH4/ultrachat_200k</span></a></span></span><span>——高质量多轮对话数据，从 ShareGPT 风格日志中筛选而来，被开源指令模型广泛使用；</span></div></div><div id="f-doxcnX32D36sq7dSX04Qv1QAEuk" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span><span><a href="https://huggingface.co/datasets/nvidia/Nemotron-Instruction-Following-Chat-v1"><span>nvidia/Nemotron-Instruction-Following-Chat-v1</span></a></span></span><span>——NVIDIA 出品的大规模、高质量、可商用指令遵循与对话数据集，结合了经验证器筛选的助手对话与结构化输出样本；</span></div></div><div id="f-doxcnzuzEXm8AVwmEmU7LbLrrQf" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span><span><a href="https://huggingface.co/datasets/openai/gsm8k"><span>openai/gsm8k</span></a></span></span><span>——8.5k 条高质量、语言多样的小学数学应用题，用于测试多步推理能力。</span></div></div><p id="f-doxcnVY8ksVIJbZBfa8pvEorATb"><span>代码类数据集：</span></p><div id="f-doxcnPWfRgD1kvDJMMX3H6z1oTc" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span><span><a href="https://huggingface.co/datasets/nvidia/OpenCodeInstruct"><span>nvidia/OpenCodeInstruct</span></a></span></span><span>——500 万条多样化的 Python 指令-响应对，包含题目、解法、测试、执行反馈与质量判定；</span></div></div><div id="f-doxcnI9aRfFGWlGgUfAVy71Mw2d" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span><span><a href="https://huggingface.co/datasets/OpenCoder-LLM/opc-sft-stage1"><span>OpenCoder-LLM/opc-sft-stage1</span></a></span></span><span>——聚焦代码理解与生成的多源精选 SFT 数据混合，用于训练 OpenCoder 系列模型。</span></div></div></div>

<a id="f-doxcnQPElP3PGATkTciuQn6Y58c"></a>

###### 第二阶段：偏好优化（DPO）

<p id="f-doxcn87K1T0DyZGDL0Yy2aS21if"><span>这一阶段用于证明你的理解超越了</span><span style="font-weight:bold">基础监督微调</span><span>。</span></p>

<p id="f-doxcnRIss638w4EiH0XlbCgXPwq"><span style="font-weight:bold">不只是告诉模型正确输出是什么，还要向它展示比较结果</span><span>：对于同一个 Prompt，一个输出比较好，另一个比较差，让模型学习两者之间的区别。</span></p>

<p id="f-doxcnYviWZ3TiWd90ttcnWS94Wc"><span>为每个 Prompt 生成多个输出，标注哪些更好、哪些更差，再使用 DPO 风格的偏好优化方法训练。随后重新在测试集上评估，展示它相对于监督微调基线的进一步提升。</span></p>

<p id="f-doxcnvFXpBToqP3HGXqNHVftpe9"><span>这能够证明你熟悉现代对齐和训练方法，而这些方法正在行业内被实际使用。</span></p>

<p id="f-doxcnzVwGVbW65xtKOw9gOgY1Md"><span>推荐的偏好数据集：</span><span><span><a href="https://huggingface.co/datasets/argilla/distilabel-intel-orca-dpo-pairs"><span>argilla/distilabel-intel-orca-dpo-pairs</span></a></span></span><span>——基于 Intel/orca_dpo_pairs 精选、清洗并增强的偏好数据集（prompt / chosen / rejected），适合做 DPO 对齐训练。</span></p>

<a id="f-doxcn6203FZEmmNsrU8IMcvynyg"></a>

###### 工具与呈现

<p id="f-doxcnQqnx3W3CBblkY7Q88pt3Kc"><span>这些微调阶段可以逐层叠加。工具方面，</span><span style="font-weight:bold">Hugging Face 的 TRL 库能够很好地处理 SFT 和 DPO；Axolotl 也能减少大量配置工作。如果不想管理云端基础设施，可以使用 Fireworks AI 这类 GPU 计算平台。</span></p>

<p id="f-doxcnnWo4FQDkGZmNDJrqWK4WKf"><span>在项目说明中展示</span><span style="font-weight:bold">训练曲线，清晰列出训练前后的指标，并诚实说明过程中出了什么问题</span><span>、</span><span style="font-weight:bold">你如何调整。</span></p>

<a id="f-doxcnUcEuOfZ3XYAGsa1oa7I6Ze"></a>

##### 实时多模态应用

<p id="f-doxcn51JHEKbPYVN89jRhwr2asf"><span>第五个项目是实时多模态应用。这个项目让</span><span style="font-weight:bold">你展示自己能够处理流式数据、严格的延迟预算，以及必须实时响应的系统固有的复杂性</span><span>，而不是只处理舒适的离线批任务。</span></p>

<p id="f-doxcnk0LiIPp9ESL45HM144dJDh"><span>你可以根据兴趣选择三条路线之一：</span></p>

<div style="margin-left:25px"><div id="f-doxcnOb92qgVt8RCOX1PrcW1Qih" style="display:flex;gap:0.5em"><span style="min-width:1.5em">a.</span><div><span style="font-weight:bold">语音助手</span><span>：接收音频，通过自动语音识别把语音转成文字，把转写文本交给语言模型推理，再通过文字转语音把回答转换成声音。</span></div></div><div id="f-doxcnnQwyjKDLF0MnzeH70odkpb" style="display:flex;gap:0.5em"><span style="min-width:1.5em">b.</span><div><span style="font-weight:bold">计算机视觉管线</span><span>：把摄像头视频流交给目标检测模型，再让语言模型根据检测到的内容进行分析。</span></div></div><div id="f-doxcntjJd7GgcohV6gviyXML5Tc" style="display:flex;gap:0.5em"><span style="min-width:1.5em">c.</span><div><span style="font-weight:bold">流式日志分析器</span><span>：实时接收服务器日志，进行异常检测，然后让语言模型生成人类容易理解的故障说明。</span></div></div></div>

<p id="f-doxcnGMTXIfloF2zmOUtVl6Xv3g"><span>如果只能选一条，推荐语音助手，因为语音 AI 正在快速增长，相关工具也已经成熟。</span><span style="font-weight:bold">语音识别</span><span>可以使用 </span><span style="font-weight:bold">Deepgram 或 Whisper</span><span>，推理层可以使用任何合适的大模型，语音合成可以使用 </span><span style="font-weight:bold">ElevenLabs 或 Cartesia</span><span>。</span><span style="font-weight:bold">WebSocket</span><span> 很适合编排整个流程。</span></p>

<p id="f-doxcnAxyEu9Arbgt3JpZjBFvCNf"><span>     推荐资源：</span></p>

<ul><li id="f-doxcnwLXmIovMz9gGPARqrhCwPe"><span>编排框架：</span><span><span><a href="https://github.com/pipecat-ai/pipecat"><span>Pipecat AI</span></a></span></span><span>——专为构建实时语音与多模态 AI 智能体而生的开源框架，帮你处理好 WebSocket 与延迟追踪；</span></li></ul>

<ul><li id="f-doxcnsKOMvmQVTl8IpIQlfORhvj"><span>语音识别（ASR）：</span><span><span><a href="https://developers.deepgram.com/"><span>Deepgram API 文档</span></a></span></span><span>，包含优秀的流式音频转写指南；</span></li></ul>

<ul><li id="f-doxcnKseasQcSkhOh8Z7rhhm9vb"><span>语音合成（TTS）：</span><span><span><a href="https://elevenlabs.io/docs/api-reference/websockets"><span>ElevenLabs WebSocket API 文档</span></a></span></span><span>，专门讲解如何用 WebSocket 把生成的语音即时流式返回给用户。</span></li></ul>

<a id="f-doxcn7AS8i5GFOMdaptKdqR8qDe"></a>

###### 打通端到端流式管线

<p id="f-doxcn7edzivUIzihXbdI6LafHtn"><span>先专注于让系统从头到尾正常工作，不需要立刻优化。目标是让数据能够持续流动，正确定义事件结构，并让语言模型对实时输入作出响应。仅仅完整打通这条链路就已经是有意义的成果。</span></p>

<a id="f-doxcnKGo1LDcyU2d4rt6fVVSZVd"></a>

###### 测量和拆解延迟

<p id="f-doxcndNg69n1awVNRQUe9UFPEHd"><span>这一部分最能展示工程成熟度。把端到端延迟拆成详细预算。</span></p>

<p id="f-doxcn3LcmBv8aihm1uVkX3WHWCh"><span>对于语音助手，需要分别</span><span style="font-weight:bold">测量 ASR 延迟、LLM 首 Token 延迟、TTS 首音频字节延迟，以及各步骤之间的额外开销</span><span>。为每个请求建立可视化延迟图。</span></p>

<p id="f-doxcnggrIXCRk6WYZ4NHpTWbMZd"><span>如果你能说："总响应时间是 1.2 秒，这是各组件分别消耗的时间"，这种分析会让面试官感到兴奋，因为它表明你理解性能工程。</span></p>

<a id="f-doxcnfYhoW0tTDGQ8sXkLJ9XM1c"></a>

###### 增加系统韧性

<p id="f-doxcn0o3DUvlVM4hje2z2FNndCc"><span>这一阶段关注系统出错时会发生什么。</span><span style="font-weight:bold">语音识别服务宕机怎么办？语言模型超时怎么办？系统必须具备优雅降级方案。</span></p>

<p id="f-doxcnwowjMfGZT1T0hDAfSqzM4e"><span>它可以退回到更简单的回答，也可以坦率告诉用户当前出现延迟，而不是一直沉默卡住。加入超时处理，确保任何环节都不会无限阻塞。</span></p>

<p id="f-doxcnHuo4I0SIOc4OYhq3ooZDhc"><span>还要建立重放模式，让你可以把录制好的输入重新送入管线，复现问题并调试。</span></p>

<p id="f-doxcn6hDg3f6PDJ08xmSfPcXqzc"><span>真正的生产系统就是这样设计的。认真考虑失败模式和恢复方式，会让你与只实现正常流程的人处于完全不同的层次。</span></p>

<a id="f-doxcnR6EfO52D1b8BavZpTzMpbe"></a>

##### 可靠的 AI Agent 系统

<p id="f-doxcntKh2qwgDL2av3gvFhqAxeh"><span>真正的分水岭在于：</span><span style="font-weight:bold">演示型 Agent 关心的是"它能不能跑通一次"，生产型 Agent 关心的是"它失败时会发生什么、花了多少钱、能不能复现、谁来批准它的危险操作"</span><span>。Agent 是有状态的，而且错误会逐步累积；同样的提示词跑两次结果也可能不同。你要展示的，正是你如何驯服这种不确定性。</span></p>

<p id="f-doxcnbsvHR0wolOj3BF9Zs0Cbbf"><span>动手之前，强烈建议先读 Anthropic 的 </span><span><span><a href="https://www.anthropic.com/engineering/building-effective-agents"><span>《Building effective agents》</span></a></span></span><span>——它把"工作流"和"Agent"做了清晰区分，核心观点是：</span><span style="font-weight:bold">大多数场景并不需要 Agent，能用确定性工作流解决的就别用 Agent</span><span>。能讲清楚"我为什么在这里选择了 Agent 而不是工作流"，本身就是一个加分项。另外两篇值得读的是 OpenAI 的 </span><span><span><a href="https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf"><span>《A Practical Guide to Building Agents》</span></a></span></span><span>，以及 Chip Huyen 的 </span><span><span><a href="https://huyenchip.com/2025/01/07/agents.html"><span>Agents 长文</span></a></span></span><span>。</span></p>

<a id="f-doxcn5rYVIp8ziAlcBMzYlqUDse"></a>

###### 选题方向

<p id="f-doxcnGKF9Q9OkkIUjprYIP3tpKc"><span>在讲具体方向之前，先看一组数据——它比任何"哪个方向更酷"的讨论都重要。</span></p>

<p id="f-doxcntbPzzHX4rpDQiwUazPjYNg"><span>对大量 AI 工程类招聘岗位的完整描述做关键词统计后可以看到一个很清晰的排序：招聘方最看重的是</span><span style="font-weight:bold">评测能力</span><span>，几乎每两个 AI 工程岗位就有一个明确提到"评测（Evals）"，占比高达 </span><span style="font-weight:bold">55.7%</span><span>；紧随其后的是 </span><span style="font-weight:bold">Agent</span><span> 经验，占比 51.9%。相比之下，可观测性 / 链路追踪、微调、RAG、多智能体、工具调用虽然也会出现在岗位要求里，但比例明显低了一个量级，分别只有 16.9%、16.7%、11.2%、9.6% 和 5.2%。</span></p>

<p id="f-doxcnVbfdkVanmSlL7RmATF8Wzf"><span>最关键的一个数字是：</span><span style="font-weight:bold">在提到 Agent 的岗位中，有 68.4% 同时明确要求评测能力</span><span>。</span></p>

<p id="f-doxcnYxqVb9bNpboqw5oZD7xwUh"><span>这说明了什么？</span><span style="font-weight:bold">企业要招的不是"做过一个 Agent"的人，而是"能证明这个 Agent 到底好不好用"的人。</span><span> 不少岗位描述里直接写着要做"模型路由、Agent 架构、上下文管理、</span><span style="font-weight:bold">评测</span><span>"；还有的写着"研究 Agent 行为，找出与高质量产出相关的模式，并把这些发现转化为训练数据、</span><span style="font-weight:bold">评测集</span><span>或框架改进"。</span></p>

<p id="f-doxcn4rc0RNRWD7g0taNv8L7xyf"><span>所以选题的第一原则是：</span><span style="font-weight:bold">挑一个成败能被自动判定的任务</span><span>。无法自动判定成败的 Agent，你根本没办法评测它，也就没办法证明任何事情——这一点比方向本身更重要。</span></p>

<p id="f-doxcnPsXlY8RS3XZPQpm2ra3Dlh"><span>第二个原则更现实：</span><span style="font-weight:bold">别做第十三个"深度研究 Agent"</span><span>。这个方向的开源实现已经严重饱和，GitHub 上星标过万的同类项目就有十几个，最高的接近 8 万星。再写一个"搜索 → 汇总 → 生成报告"的循环，</span><span style="font-weight:bold">不会有任何区分度</span><span>。</span></p>

<p id="f-doxcnB1RXW9lf1iTEnj5Y7nS9Lf"><span>下面三个方向，是结合"招聘需求证据"和"工程含金量"筛出来的。</span></p>

<a id="f-doxcnf4loR8NaZWDx1zDpYqOtsb"></a>

###### Coding Agent

<p id="f-doxcn2E5ZOUuCern8G5WqaRqQwf"><span>给定一个 issue，让它定位文件、改代码、跑测试，直到测试变绿。推荐它的理由很实在：</span><span style="font-weight:bold">成败判定天然客观</span><span>（测试通过与否，不需要 LLM 当裁判），而且有 </span><span><span><a href="https://www.swebench.com/"><span>SWE-bench</span></a></span></span><span> 这样的公认基准，只跑一个子集就能得到可对比的数字。它同时天然涉及沙箱、多步规划、失败回退，工程含量最高。</span></p>

<p id="f-doxcn9vqV4Owhpisl10fR6yxiah"><span>起步不必从零写：</span><span><span><a href="https://github.com/SWE-agent/mini-swe-agent"><span>mini-swe-agent</span></a></span></span><span> 是个极简的参考实现，而 </span><span><span><a href="https://github.com/OpenAutoCoder/Agentless"><span>Agentless</span></a></span></span><span> 走的是"不用 Agent 循环、纯流水线"的相反路线。</span><span style="font-weight:bold">把这两条路线在同一批任务上做对比，本身就是一个很好的项目</span><span>——正好回应了前面那个问题："这里到底该不该用 Agent"。</span></p>

<p id="f-doxcnnADoxQJK0GOWk0sQ0ngjFh"><span>另外有个值得知道的细节：Agentless 这类方案的失分，很大一部分不在"改不出正确补丁"，而在</span><span style="font-weight:bold">生成了多个候选却挑错了哪个</span><span>。也就是说，</span><span style="font-weight:bold">选择往往比生成更值得优化</span><span>——这是个很容易被忽略、但做出来很出彩的角度。</span></p>

<a id="f-doxcnjWcIVGaLnKpV2X0gUeuleb"></a>

###### 企业内部流程 Agent（招聘需求最集中）

<p id="f-doxcnAgPiMFVcoIixr2XoEocUeh"><span>这个方向在真实岗位数据里的信号最强：</span><span style="font-weight:bold">9.6% 的岗位（315 条）提到客服 / 工单 / 问题分流场景</span><span>；而</span><span style="font-weight:bold">提到"人工介入 / 升级机制"的岗位有 14.4%，"内部流程自动化 / 审批"的有 13.3%</span><span>。不少专注于企业服务和客服自动化的 AI 公司，本身做的就是这件事。</span></p>

<p id="f-doxcn3T8898zPwjdK58blXAqK9f"><span>具体可以做什么：一个处理内部工单的 Agent（自动分类、查知识库、给出处理方案、拿不准就升级给人）；一个跨系统取数并按规则走审批的流程 Agent；或者一个报销 / 采购单据的审核 Agent。</span></p>

<p id="f-doxcn7OTARYDUuYmY0lXkWdvPuf"><span>这个方向的关键不在"能做多少事"，而在</span><span style="font-weight:bold">边界清楚、该停就停</span><span>。所以务必把这几件事做出来并写进文档：什么情况下 Agent 必须交给人（这正是 14.4% 的岗位在要求的"升级机制"）、每一步操作留下可审计的记录、以及有副作用的操作必须先经人工批准。</span></p>

<p id="f-doxcnDF0L8iKgK1EtubV4lxdcgb"><span>但要先有心理准备：</span><span style="font-weight:bold">这个方向做不出漂亮分数</span><span>。在模拟完整公司环境的 </span><span><span><a href="https://the-agent-company.com/"><span>TheAgentCompany</span></a></span></span><span> 上，</span><span style="font-weight:bold">最好的系统完整完成率只有约 30%</span><span>。正因如此，正确姿势是</span><span style="font-weight:bold">不追求全能，而是在一个很窄的流程上做到稳定可靠</span><span>，并诚实地报告失败率——这比一个什么都能试试、但什么都不可靠的 Agent 有说服力得多。</span></p>

<a id="f-doxcnfWkBfn4ZTHaedXmWzWJJJe"></a>

###### Agent 评测基础设施（最被低估，却是岗位要求第一名）

<p id="f-doxcnslbExYnUuDSbtemVSNkach"><span>这是我最想推荐、但几乎没人做的方向：</span><span style="font-weight:bold">不做 Agent 本身，而做"评测 Agent 的工具"</span><span>。</span></p>

<p id="f-doxcnVvMvzKtWck4cseLoUVjrdg"><span>理由前面已经给了——</span><span style="font-weight:bold">评测是岗位要求里出现率最高的一项（55.7%）</span><span>，而提到 Agent 的岗位有 </span><span style="font-weight:bold">68.4%</span><span> 同时要求</span><span style="font-weight:bold">评测能力</span><span>。也就是说，做这个方向，你命中的是招聘市场上最普遍、最直接的一项需求；而且它天然能和项目一、项目三串成一条完整的线。</span></p>

<p id="f-doxcn7nKyQrkbvm6tSdBoh0ZBEb"><span>具体要做的是一套能回答"这个 Agent 到底行不行"的系统：</span></p>

<div style="margin-left:25px"><div id="f-doxcnxkvOxlaWcHEJANpKbct03c" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">轨迹评测</span><span>：不只看最终答案对不对，而是判断它走的路径是否合理、工具调用序列是否正确，并且能给</span><span style="font-weight:bold">部分分</span><span>；</span></div></div><div id="f-doxcnQSvwA82E03Uh0jCf17gxad" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">可复现的测试环境</span><span>：把外部依赖固定下来，让同一个任务能反复重跑；</span></div></div><div id="f-doxcnpY1U41VGYGjViNda7k3opd" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">稳定性度量</span><span>：同一个任务跑 N 次，报告成功率的</span><span style="font-weight:bold">波动区间</span><span>而不是单次最好成绩；</span></div></div><div id="f-doxcno3vvqYR9Qe7sFP35aJskOb" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">成本核算</span><span>：每解决一个任务花了多少钱、多少 Token、调了几次工具；</span></div></div><div id="f-doxcnHPIcpIt0wL4K1ZyUMcGK6g" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">失败归因</span><span>：自动把失败样本归类（工具用错了、上下文丢了、陷入循环、过早宣布完成……）。</span></div></div></div>

<p id="f-doxcnUAroC4x6n65pCTbFyz3Ssb"><span style="font-weight:bold">为什么说它含金量高？</span><span>因为这里有几个已被证实、但几乎没人在自己项目里处理的问题——</span><span style="font-weight:bold">LLM 当裁判时精确率没有一个超过 70%</span><span>（意味着约三成被判"成功"的其实是失败），而单次运行的成绩本身就带着巨大噪声（后面"关于公开基准"一节有具体数字）。能把这些问题正面处理掉的项目，含金量远高于再做一个能跑通的 Agent。</span></p>

<blockquote id="f-doxcno4yk8CODAbXWFBP8ATi2Ub"><p id="f-doxcnJBQ6OZbXl2aqXX0Ymd3Tct"><span style="font-weight:bold">两个不建议作为首选的方向。</span></p>
<p id="f-doxcnwDG8CpbatI31bCYddlF6Ef"><span>一是 </span><span style="font-weight:bold">Text-to-SQL / 数据分析 Agent</span><span>：它在技术上并非没有难度，但在上述 3,267 个真实岗位中只有 2 条提到（约 0.06%），且都来自本身就卖 SQL 产品的公司——招聘需求证据几乎为零。</span></p>
<p id="f-doxcnt4nxunOgL4ouZQbI99aGxf"><span>二是</span><span style="font-weight:bold">浏览器 / 电脑操作类 Agent（computer-use）</span><span>：它最吸引眼球，但对着真实网站运行时，反爬、验证码、页面改版都会让结果无法复现；而自建可复现环境的基准（如 WebArena、OSWorld）光镜像就要几百 GB、官方建议 1000 GB 磁盘，个人投入产出比很低。真想做，可以用确定性克隆站点的 </span><span><span><a href="https://arxiv.org/abs/2504.11543"><span>REAL</span></a></span></span><span>（112 个任务），成本可控得多。</span></p>
</blockquote>

<a id="f-doxcn7HcIu7mvLPTEdXIuJFDOwf"></a>

###### 把工具和循环设计好

<p id="f-doxcn83V60ohGdYRoWLPebpX6iV"><span>这一阶段的重点不是"接上模型"，而是</span><span style="font-weight:bold">工具设计</span><span>。Agent 的能力上限往往取决于工具的质量，而不是模型的智商。</span></p>

<ul><li id="f-doxcnclAroFKIquyqkRpTmIjTWc"><span style="font-weight:bold">工具即接口</span><span>：每个工具都要有清晰的名字、明确的参数 Schema 和好的错误信息。返回给模型的错误应该是"简短但有指导性的说明"，而不是一大坨 JSON 报错——模型读不懂的错误等于没有错误。这方面可参考 Anthropic 的 </span><span><span><a href="https://www.anthropic.com/engineering/writing-tools-for-agents"><span>《Writing effective tools for agents》</span></a></span></span><span>。</span></li></ul>

<ul><li id="f-doxcn6XktspEOQCMvNfFoqf9Amg"><span style="font-weight:bold">控制住上下文</span><span>：Agent 失败往往不是因为模型笨，而是因为没拿到正确的信息，或者信息格式太糟。LangChain 把上下文工程归纳为"写入、选择、压缩、隔离"四种手段（</span><span><span><a href="https://www.langchain.com/blog/context-engineering-for-agents"><span>Context Engineering for Agents</span></a></span></span><span>），Anthropic 也有一篇</span><span><span><a href="https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents"><span>上下文工程</span></a></span></span><span>专文。</span></li></ul>

<ul><li id="f-doxcnatMzDPsGV1YmpCFwToYPhH"><span style="font-weight:bold">必须有终止条件</span><span>：设置最大步数、最大 Token 预算和单次任务成本上限。一个会无限循环烧钱的 Agent，在任何生产环境里都是事故。</span></li></ul>

<ul><li id="f-doxcn0yFeVLSSRgzYjwfU2CU3Mh"><span style="font-weight:bold">工具接入标准化</span><span>：可以了解一下 </span><span><span><a href="https://modelcontextprotocol.io/"><span>MCP（Model Context Protocol）</span></a></span></span><span>，它正在成为工具与数据源接入的通用协议，把自己的工具封装成 MCP Server 是个很好的加分项。</span></li></ul>

<p id="f-doxcn1q2F5o3N5x66qeEByIo7vc"><span>框架方面，</span><span><span><a href="https://langchain-ai.github.io/langgraph/"><span>LangGraph</span></a></span></span><span>、</span><span><span><a href="https://openai.github.io/openai-agents-python/"><span>OpenAI Agents SDK</span></a></span></span><span>、</span><span><span><a href="https://ai.pydantic.dev/"><span>Pydantic AI</span></a></span></span><span>、</span><span><span><a href="https://huggingface.co/docs/smolagents/index"><span>smolagents</span></a></span></span><span> 都是合理选择。但要注意：框架容易上手，却常常把"到底给模型传了什么"这件事藏起来。能说清楚每一步进入上下文的内容，比会用某个框架更重要。</span></p>

<a id="f-doxcn9EwiYgWl4pm2KEymlv6Dmf"></a>

###### 状态持久化、人工介入与权限边界

<p id="f-doxcnfGhzOPgFAbpfiIuF8Ns22d"><span>这是把项目从"能演示"推到"能上生产"的地方，也是绝大多数人不会做的部分。</span></p>

<p id="f-doxcnzx0Yssp056C8sgnHI5T29c"><span style="font-weight:bold">状态与恢复。</span><span> Agent 任务往往要跑几分钟甚至几小时，中途一定会遇到 API 超时、限流、进程重启。你需要让任务能从中断处恢复，而不是从头再来。这里有个值得讲清楚的区别：</span><span style="font-weight:bold">框架层面的 checkpoint 并不等于持久化执行</span><span>——checkpoint 保存的是数据，而不是执行本身，进程一死任务就跟着死了。如果想深入，可以了解 </span><span><span><a href="https://docs.temporal.io/evaluate/understanding-temporal"><span>Temporal</span></a></span></span><span>、</span><span><span><a href="https://restate.dev/what-is-durable-execution"><span>Restate</span></a></span></span><span> 或 </span><span><span><a href="https://www.inngest.com/docs/learn/how-functions-are-executed"><span>Inngest</span></a></span></span><span> 这类持久化执行方案。在作品里能把"崩溃后从第 7 步继续，而不是重跑前 6 步"演示出来，非常有说服力。</span></p>

<p id="f-doxcn66lMQi0hUM0aRUIhJR6mad"><span style="font-weight:bold">人工介入（Human-in-the-loop）。</span><span> 任何有副作用的操作——写数据库、发邮件、提交代码、花钱——都应该先暂停并等待人工批准。要注意实现方式：让进程空转等待是错的，正确做法是任务挂起、不占用计算资源，收到批准信号后再恢复。同时也要意识到"审批疲劳"这个陷阱：如果什么都弹窗，用户很快就会无脑点同意，权限控制就形同虚设。</span></p>

<p id="f-doxcnmPCiAxJHaCU1PNDAIep8Zd"><span style="font-weight:bold">安全与沙箱。</span><span> 这是 Agent 项目里最能体现专业度、也最容易被忽略的一块。Agent 的核心风险是</span><span style="font-weight:bold">提示词注入</span><span>：它读到的网页、issue、日志里可能藏着攻击指令。Simon Willison 提出的</span><span><span style="font-weight:bold"><a href="https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/"><span>致命三重奏</span></a></span></span><span>是个很好的分析框架——当一个系统同时具备</span><span style="font-weight:bold">接触私有数据</span><span>、</span><span style="font-weight:bold">接触不可信内容</span><span>、</span><span style="font-weight:bold">能对外通信</span><span>这三项能力时，就存在被窃取数据的结构性风险，而目前</span><span style="font-weight:bold">没有任何检测手段能百分之百防住它</span><span>，唯一可靠的办法是从架构上砍掉其中一条腿。相应地，OWASP 的 </span><span><span><a href="https://genai.owasp.org/llm-top-10/"><span>LLM Top 10</span></a></span></span><span> 把**过度授权（Excessive Agency）**单独列为一项风险，对应的做法是最小权限、最小工具集、危险操作强制人工确认。</span></p>

<p id="f-doxcnDI1zSUVSH1WTjHiQsTVsjm"><span>具体到实现：所有代码执行都必须放进沙箱，不要在自己的机器上直接 </span><span><span><span>exec</span></span></span><span> 模型生成的代码。可以用 </span><span><span><a href="https://e2b.dev/"><span>E2B</span></a></span></span><span> 这类沙箱服务，或者最简单的 Docker 容器隔离。浏览器类 Agent 可以用 </span><span><span><a href="https://playwright.dev/python/"><span>Playwright</span></a></span></span><span> 或 </span><span><span><a href="https://docs.browser-use.com/"><span>Browser Use</span></a></span></span><span>。</span></p>

<a id="f-doxcnb8YKdtJ8Yp0s3YEaIdItsh"></a>

###### 评测与可观测性

<p id="f-doxcnbUQrKs1TIfcaExGgtE8Bdh"><span>这是整个项目最有价值的交付物，也是把它和项目三串起来的地方。</span></p>

<p id="f-doxcni3UloCCUSasy0XcoRJWvfd"><span style="font-weight:bold">Agent 的评测和普通 LLM 评测不是一回事</span><span>，因为你要评的是一整条轨迹（trajectory），而不是单个回答。LangSmith 的文档把它分成三层（见</span><span><span><a href="https://docs.langchain.com/langsmith/evaluate-complex-agent"><span>《Evaluate a complex agent》</span></a></span></span><span>）：</span></p>

<div style="margin-left:25px"><div id="f-doxcn24H0a1EEcEYBPCwj5A6dob" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">最终结果评测</span><span>：任务到底成没成功；</span></div></div><div id="f-doxcnTxhYsqQeQRZ893B7sq6ttg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">轨迹评测</span><span>：它是否走了合理的路径，调用的工具序列是否正确。注意这里要能给"部分分"——Agent 做对了前几步只错了最后一步，和一开始就跑偏，是完全不同的两种失败；</span></div></div><div id="f-doxcn2I6xu8PcB66NKSQtaflvhb" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">单步评测</span><span>：单独考察某一步，比如"面对这个任务，它选的第一个工具对不对"，主要用于调试。</span></div></div></div>

<p id="f-doxcnLZ3BOzSMEuJP07ZH7KkaeO"><span>轨迹比对可以直接用 </span><span><span><a href="https://github.com/langchain-ai/agentevals"><span>agentevals</span></a></span></span><span>，它支持严格顺序匹配、无序匹配、子集/超集匹配等多种模式——现实中"用不同顺序调用了同一批工具"通常应该算对，用严格匹配会误判。</span></p>

<p id="f-doxcn2Mluop4dsYUn2C9EoUPrQh"><span>要记录并展示的指标：</span><span style="font-weight:bold">任务成功率、平均步数、每个任务的 Token 成本与美元成本、工具调用失败率、人工介入率、超预算被强行终止的比例</span><span>。可观测性可以复用项目三的 </span><span><span><a href="https://langfuse.com/docs"><span>Langfuse</span></a></span></span><span>；如果想更进一步，可以按 OpenTelemetry 的 GenAI 语义约定来埋点，它已经为 Agent 定义了 </span><span><span><span>invoke_agent</span></span></span><span>、</span><span><span><span>execute_tool</span></span></span><span> 等 Span 以及 </span><span><span><span>gen_ai.invoke_agent.tool_calls</span></span></span><span> 这样的指标，用标准约定而不是自己发明字段，是很专业的做法。</span></p>

<p id="f-doxcnOxxkR9qZm9FV723ka0uCPe"><span style="font-weight:bold">关于公开基准。</span><span> 案例中能写"我在标准基准上测过"含金量很高，但要挑成本现实的：</span><span><span><a href="https://github.com/sierra-research/tau2-bench"><span>τ²-bench</span></a></span></span><span>（客服场景下的工具调用与规则遵守，注意初代 τ-bench 已被官方标记弃用）和 </span><span><span><a href="https://gorilla.cs.berkeley.edu/leaderboard.html"><span>BFCL 函数调用榜</span></a></span></span><span>对个人来说成本可控，</span><span><span><a href="https://www.swebench.com/"><span>SWE-bench</span></a></span></span><span> 可以只跑一个子集，</span><span><span><a href="https://huggingface.co/spaces/gaia-benchmark/leaderboard"><span>GAIA</span></a></span></span><span> 和 AssistantBench 适合研究型 Agent。</span></p>

<p id="f-doxcn2XMFif2yr5t8T3x6Z3vYJh"><span style="font-weight:bold">但请务必理解：这些基准的分数比它看上去噪声大得多。</span><span> 有三个数字值得记住：</span></p>

<div style="margin-left:25px"><div id="f-doxcnNpvcaNICXaJdAsdpYtGCOg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>多份 2026 年的审计显示，</span><span style="font-weight:bold">大约每 6 个被判定的样本里就有 1 个判错</span><span>；</span></div></div><div id="f-doxcniWh9Uma2wPTicak09MIVTd" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>完全相同的配置重复跑 23 次，成绩从 </span><span style="font-weight:bold">57.9% 到 76.8%</span><span> 不等——单次运行的数字基本等于噪声；</span></div></div><div id="f-doxcnWMYychSNUTPwqRd2Ry2xmc" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>同一个模型在同一套任务上，</span><span style="font-weight:bold">仅仅因为脚手架不同，成绩就能差出 19.6 个百分点</span><span>。</span></div></div></div>

<p id="f-doxcnyPSpGVnnuMSQAAWPZFMouh"><span>最后这一条其实是你做这个项目的最好理由：</span><span style="font-weight:bold">模型不是变量，工程才是。</span><span> 也正因为如此，真正专业的做法是报告三个数字，而这三个都是玩具 demo 给不出来的：</span><span style="font-weight:bold">重复多次运行的稳定性（而不是单次最好成绩）、每解决一个任务的美元成本、以及一个能把"脚手架的贡献"和"模型的贡献"分离开的消融实验</span><span>。</span></p>

<p id="f-doxcnazyPHbozgJlrz8Xb3Zvb4v"><span>顺带一提，成本差异比大多数人想象的极端。普林斯顿的 </span><span><span><a href="https://hal.cs.princeton.edu/"><span>HAL 榜单</span></a></span></span><span>公开了两万多次运行的"成绩-花费"配对数据，其中最有意思的一组是：</span><span style="font-weight:bold">两个配置拿到了完全相同的准确率，成本却相差 64 倍</span><span>。在 τ-bench 上也有类似情况——56.0% 的配置花 11 美元，54.0% 的配置花 180 美元。把这类对比放进你的项目报告，比多刷两个百分点有说服力得多。</span></p>

<a id="f-doxcnhA00vvEZIDB0y1UcIynetf"></a>

##### 如何写进简历

<p id="f-doxcnaygFGjQ0vZ9RKBdUIRUoNc"><span>做完项目只是一半，另一半是</span><span style="font-weight:bold">让别人在 30 秒内看懂你做的东西值钱在哪</span><span>。</span></p>

<a id="f-doxcnKtjkFz5Fk0Lqw7bw5ysJ4c"></a>

###### 一条核心原则

<p id="f-doxcnM6GksLHK1KNadYsXRwibrQ"><span>对照几个例子就很清楚。</span></p>

<p id="f-doxcnsNTulURaZudlD3TjXawc0f"><span>写"使用 LangChain 和 ChromaDB 构建了 RAG 系统"，不如写"</span><span style="font-weight:bold">构建 RAG 系统并建立 200 条黄金评测集，接入 CI 质量门禁，忠实度低于阈值自动阻断合并</span><span>"。</span></p>

<p id="f-doxcnF8OQf8BdHHArfKxfDfcDyd"><span>写"基于 Ollama 部署本地大模型"，不如写"</span><span style="font-weight:bold">在同一硬件上横评 3 个本地模型，量化其吞吐、显存与质量的取舍，据此完成选型</span><span>"。</span></p>

<p id="f-doxcnyI6GlPdBAyF6Z7dY8PtfbC"><span>写"开发了一个 AI Agent"，不如写"</span><span style="font-weight:bold">Agent 任务成功率 X%（重复 5 次的波动区间 A%–B%），单任务成本 $Y，人工介入率 Z%</span><span>"。</span></p>

<p id="f-doxcn3x0aaPGZKcGZXF4xN1DAQf"><span>写"实现了多智能体协作系统"，不如写"</span><span style="font-weight:bold">对比单 / 多智能体两种架构，实测多智能体在本任务上成本高 3 倍而收益不显著，最终选择单 Agent</span><span>"。</span></p>

<p id="f-doxcn2K5JhCKrSAp96v30cppzVg"><span>注意前一种写法全是</span><span style="font-weight:bold">输入</span><span>（用了什么工具），后一种全是</span><span style="font-weight:bold">输出</span><span>（得到了什么结论）。工具谁都会写，结论只有真做过的人写得出来。</span></p>

<a id="f-doxcnmL54RgXjmAConBaxrFXwob"></a>

###### 六个可复用的包装方向

<p id="f-doxcnydEzrnMgWsEBb8YryMNpnc"><span>无论你做的是哪个项目，都可以从这六个角度找素材。</span><span style="font-weight:bold">它们几乎都能套用到任何一个 AI 项目上。</span></p>

<p id="f-doxcnAjuVSEiyrqh5n0t999UbFf"><span style="font-weight:bold">方向一：可量化的质量指标</span></p>

<blockquote id="f-doxcnizZbYF9it34GbdGb6xlrFb"><p id="f-doxcn9ioaBTuuOaUoMPn2jeRC5g"><span>把"效果不错"换成具体数字。忠实度、引用覆盖率、任务成功率、JSON 合法率、拒答正确率——任何一个都行，关键是</span><span style="font-weight:bold">有数</span><span>。 素材来源：项目一第三阶段、项目四的前后对比。</span></p></blockquote>

<p id="f-doxcnd1EWf7jxWkoymOunYC6oFe"><span style="font-weight:bold">方向二：评测体系与质量门禁</span></p>

<blockquote id="f-doxcnmCevwqJ5MN1IUuCk1gxVdg"><p id="f-doxcn6xO2s9RZRbEoI0PAwI7tLc"><span>这是当前招聘需求里出现率最高的一项（55.7% 的 AI 岗位提及，提到 Agent 的岗位更有 68.4% 同时要求）。写清楚你</span><span style="font-weight:bold">自建了评测集</span><span>、</span><span style="font-weight:bold">接入了 CI</span><span>、</span><span style="font-weight:bold">质量退化会阻断上线</span><span>。 素材来源：项目一第三阶段、项目三第三阶段、项目六第三阶段。</span></p></blockquote>

<p id="f-doxcnELonYJ2Tb0cKovTXWK6TAd"><span style="font-weight:bold">方向三：成本与性能工程</span></p>

<blockquote id="f-doxcnAUt3Cmxro0nsJxwaxO2YDe"><p id="f-doxcnEAJvzOPFAaNWiAowNvWdgB"><span>每请求成本、P50/P95 延迟、Token 消耗、每任务美元成本、首 Token 延迟。这类数字极少有人写，但一写就显专业。 素材来源：项目二的基准测试、项目三第二阶段、项目五的延迟拆解。</span></p></blockquote>

<p id="f-doxcn9xJ0dZBKSWceX2G81xCW3b"><span style="font-weight:bold">方向四：可靠性与故障处理</span></p>

<blockquote id="f-doxcnXA26LPZmFJPLPrdFPWF3Kf"><p id="f-doxcnEpmjmNtAvqffBPIyJXqDbc"><span>超时处理、优雅降级、断点恢复、重放调试、失败率监控。重点是让人看出你</span><span style="font-weight:bold">想过它会怎么坏</span><span>。 素材来源：项目五第三阶段、项目六第二阶段。</span></p></blockquote>

<p id="f-doxcn4hrzdneitSAutN3jzOqq7b"><span style="font-weight:bold">方向五：安全与权限边界</span></p>

<blockquote id="f-doxcnqCDdXt4pXvys9Z9CpvJhYe"><p id="f-doxcnlLoorMCnTdWZa3L5MdEXRf"><span>沙箱隔离、最小权限、危险操作人工确认、提示词注入防护。真实岗位里"人工介入 / 升级机制"的提及率有 14.4%，是个被严重低估的加分项。 素材来源：项目六第二阶段。</span></p></blockquote>

<p id="f-doxcnY5UdvGkC4AnqEMuIjo9tcb"><span style="font-weight:bold">方向六：工程判断力（最稀缺）</span></p>

<blockquote id="f-doxcnfVadt7i8oSAv35iflsdkuf"><p id="f-doxcn8tsZE1tBNzPMirvTBCCCxf"><span>不是"本案例做了什么"，而是"我为什么没做某件事"。比如：评估后选择工作流而非 Agent、试过多智能体后退回单 Agent、对比后选择了更便宜的小模型。 素材来源：项目六的选题原则与多智能体那一节。</span></p></blockquote>

<a id="f-doxcnxwt1Is0hCPZJt8KZRzs3qh"></a>

###### 两个完整示例

<p id="f-doxcn0Ho4tH9pr5GMTQoSVemzGd"><span style="font-weight:bold">示例一：RAG 项目（项目一 + 项目三）</span></p>

<p id="f-doxcnUh07S5HBL9KrcRw5GnsMtg"><span>改写前 ——</span></p>

<blockquote id="f-doxcnWMgvuWy7islrpb19ChwBBc"><p id="f-doxcnSQQIGy1tqDeBoFv647dJKd"><span style="font-weight:bold">企业知识库问答系统</span><span> 使用 LangChain + ChromaDB 搭建 RAG 系统，支持 PDF 文档解析和问答，集成 OpenAI API，实现了较好的问答效果。</span></p></blockquote>

<p id="f-doxcna74IOwWbM9Tjx7l4dvqzoh"><span>改写后 ——</span></p>

<blockquote id="f-doxcnl5SyYvCDRHLVdyVMoUAfjb"><p id="f-doxcntkjJne7XVsEaT4W8GMciCe"><span style="font-weight:bold">企业知识库问答系统｜可评测、可监控的生产级 RAG</span></p>
<ul><li id="f-doxcnTvkJmVAkybfr3uyDs9JgIc"><span>实现混合检索（BM25 + 向量）与 Cross-Encoder 重排序，Top-5 检索精度较纯向量方案提升 X%</span></li></ul>
<ul><li id="f-doxcn0Psu2iDSF7VrPU95UmMhrb"><span>设计引用强制机制：检索证据不足时系统主动拒答而非编造，无依据回答率从 X% 降至 Y%</span></li></ul>
<ul><li id="f-doxcnJ4OFo73FRDAsn08aw5endd"><span>自建 200 条黄金评测集与离线评测脚本，接入 CI——每个 PR 自动跑评测，忠实度低于 0.85 即阻断合并</span></li></ul>
<ul><li id="f-doxcnyMKOEpqDsHZX1JZbguSF0f"><span>接入 Langfuse 全链路追踪，监控 P50/P95 延迟、每请求成本与引用覆盖率，可定位任意一次质量波动的根因</span></li></ul></blockquote>

<p id="f-doxcnlKt6BG3u2MhTXcVtJaDcGf"><span>关键差别：改写后每一条都有</span><span style="font-weight:bold">动作 + 机制 + 数字</span><span>，而且第三、四条直接命中"评测"和"可观测性"这两项高频岗位要求。</span></p>

<p id="f-doxcnDkji8ZjXJmaobhjuL2VqNf"><span style="font-weight:bold">示例二：Agent 项目（项目六）</span></p>

<p id="f-doxcn43pVx039p9NTYS7sqyPjoH"><span>改写前 ——</span></p>

<blockquote id="f-doxcnO8ummmGXFSvTNbuHy6xufh"><p id="f-doxcn5UqSniecWdiVnzNosd3Q5d"><span style="font-weight:bold">智能助手 Agent</span><span> 基于 LangGraph 开发多智能体协作系统，接入多个工具，能够自主完成复杂任务。</span></p></blockquote>

<p id="f-doxcnxakyfebxLXatkoAMPakULg"><span>改写后 ——</span></p>

<blockquote id="f-doxcnGkIJ8AZkDN2xuIHa6wvgsh"><p id="f-doxcnbAwKvLq6NFcKTMQRkZ9yMh"><span style="font-weight:bold">内部工单处理 Agent｜带权限边界与轨迹评测</span></p>
<ul><li id="f-doxcnPjBv3tnezeBIzZp3UzveVh"><span>设计 8 个工具接口并规范错误返回格式，使模型能据错误信息自主纠正，工具调用失败率从 X% 降至 Y%</span></li></ul>
<ul><li id="f-doxcnXG188VqJiKFPfgBdIchVXf"><span>实现断点恢复：任务状态持久化，进程崩溃后从中断步骤继续而非全量重跑</span></li></ul>
<ul><li id="f-doxcn0ZDbxMcxxUQ4aOSBQtPeWg"><span>建立权限边界：写操作一律挂起等待人工批准，任务级 Token 与成本上限防止失控循环，人工介入率 Z%</span></li></ul>
<ul><li id="f-doxcnLpKZoknjKrBB06aZy2NtXf"><span>构建轨迹评测体系（最终结果 / 轨迹 / 单步三层），支持部分给分；重复 5 次运行报告成功率区间 A%–B% 而非单次最优</span></li></ul>
<ul><li id="f-doxcn3FWDOuPbGtbs42nPT6fbka"><span>对比单 / 多智能体架构：多智能体成本高 3 倍且收益不显著，据此选择单 Agent 并记录决策依据</span></li></ul></blockquote>

<p id="f-doxcnH3BDkgeFfJqEcTCsaW5qk0"><span>关键差别：改写前那句"多智能体协作"看似高级，其实是减分项——它暴露了没做过成本核算。改写后最后一条反而成了亮点，因为它证明</span><span style="font-weight:bold">你会做技术选型，而不是堆技术名词</span><span>。</span></p>

<a id="f-doxcn6qkKp0wSQFhJp7ywUsN4Jd"></a>

###### 三个常见的坑

<ol start="1"><li id="f-doxcnArHECjfj27lwP4Ft5bcndd"><span>换成"用 LangGraph 实现了带断点恢复的任务编排"。</span></li></ol>

<ol start="2"><li id="f-doxcnvi0sJy4l9SJBjkRoX9SgSc"><span style="font-weight:bold">数字要能被追问</span><span> —— 写了"成功率 85%"，就要能答出：测试集多大？跑了几次？成本多少？失败的 15% 是什么原因？答不上来的数字是负资产。</span></li></ol>

<ol start="3"><li id="f-doxcnlqEtDc7mEW5iyJN8iW9Gmd"><span style="font-weight:bold">别堆技术栈</span><span> —— 罗列十个框架名不如讲透一个取舍。面试官真正想知道的是你</span><span style="font-weight:bold">为什么选它</span><span>，以及</span><span style="font-weight:bold">你放弃了什么</span><span>。</span></li></ol>

<a id="f-doxcnkc3IWWc73WJ6Fgp0jLJ4Xe"></a>

##### 结语

<p id="f-doxcnD7HNdkW0ahb5Ec1kargUTd"><span>如果你觉得你的项目做得浅，应该如何去包装。但是最后我想强调两点：</span></p>

<p id="f-doxcnKudejw3ar4b8tjZlthe57e"><span style="font-weight:bold">切勿眼高手低：</span><span>做一个生产级别的项目是很难的，很耗时的。上面的内容和项目都有分阶段，最好的方法是</span><span style="font-weight:bold">一个阶段一个阶段的来，</span><span>只有你做了，才真正是你的。</span></p>

<p id="f-doxcn5Xbrzg8hClsRMAqMo7usKc"><span>我希望教大家什么是好的，应该往哪里改进。但不是告诉大家，你面试的时候，比如一个项目是有</span><span style="font-weight:bold">一个完整评估流程，CI/CD持续集成，企业级的错误处理和回退，完整的版本管理，真实的用户数据集</span><span>你才能去面试。绝对不是这样的！特别是对于经验年限不多的，甚至是可以放缓到工作5年以内经验的同学，脚踏实地，按照这个方案去做，在你的能力范围内适度包装一下，去面试是没有问题的。越是工作年限越长，越是需要做的项目更加生产级别和成熟。</span></p>

<a id="f-doxcn3n2BdKR48HSUpLhMqeoicf"></a>

##### 讲解视频

<p id="f-doxcnpoz8C2rf5uQHGA8jbiyPbh"><span><span><a href="https://www.bilibili.com/video/BV1cs3d69ET8/?spm_id_from=333.1387.homepage.video_card.click&amp;vd_source=144bec9c3f54e465073138bed788be1b"><span>https://www.bilibili.com/video/BV1cs3d69ET8/?spm_id_from=333.1387.homepage.video_card.click&amp;vd_source=144bec9c3f54e465073138bed788be1b</span></a></span></span></p>


<a id="section-0139"></a>
## 2026年 Agent 新形态

<a id="f-doxcnz5i34oVytz2qpXkOWt8vpf"></a>

<p id="f-doxcnoXkvGm2luEWRVeBx3Psvde"><span>Agent 行业的发展非常迅速。技术栈在更新，产品形态在迭代，业界也在不断探索：Agent 到底应该以什么方式进入真实工作和生活，怎样才能从“看起来很厉害”走向真正落地？因此，学习 Agent，不能只停留在工具调用、多 Agent 协作等技术概念上，还需要理解最新产品在解决什么问题，以及它们背后的设计理念。</span></p>

<p id="f-doxcnN0SGkwz16x2N4ATgRe1zlf"><span>从找工作的角度，这件事有两方面的价值。</span></p>

<p id="f-doxcnfnAbcopfgmbtNxRiB5AXBh"><span style="font-weight:bold">第一，理解 Agent 的发展趋势和产品形态，能让你更有深度地讨论产品与开发。</span><span> 对开发者来说，这能帮助你理解需求、判断技术方案，而不只是把功能实现出来。对产品岗位来说，这更是本职工作：理解用户如何使用 Agent、现有产品有什么不足、新的设计为什么出现，才能判断应该做什么，而不只是追随热门概念。</span></p>

<p id="f-doxcn4S8iID46hMvgFwKRbuxSCf"><span style="font-weight:bold">第二，它能让你的项目更有辨识度。</span><span> 在快速迭代的行业里，Agent 项目的形态也容易过时。如果项目仍然只是一个聊天窗口，加上工具调用或简单的多 Agent 编排，就容易与其他候选人的项目相似。相比之下，如果你能跟上发展趋势，针对实际问题设计新的交互方式、工作机制或协作体验，并讲清楚为什么这样设计，就更有机会与其他候选人形成鲜明对比，脱颖而出。当然，重点不是堆砌新功能，而是让新的设计真正解决问题。</span></p>

<p id="f-doxcncVqnbpynhID9hNmpZFyZ8f"><span>这一小节，我们会</span><span style="font-weight:bold">弱化技术实现，以 2026 年 10 月为观察时间点，讲解近期出现的新 Agent 形态</span><span>。主要讲“它的设计新在哪里”，这些变化体现了怎样的发展理念和技术方向 以及对该学习案例设计有一些什么启发。</span></p>

<p id="f-doxcntkq3QvELoWYwbRoltnl5Lf"><span>希望学习之后，你在与面试官探讨 Agent 功能时，能给出更有亮点、有依据的回答。如果还能把其中适合的设计融入自己的项目，并解释它带来的价值，那就更棒啦！</span></p>

<a id="f-doxcnY36xFNAit1GvW3GOn1J9Zd"></a>

##### 四款代表产品

<p id="f-doxcn2S5Jsfzlo2Drb7Dogvmhtf"><span>先明确一个观察角度：</span><span style="font-weight:bold">这些产品的入口仍然主要是聊天，但它们不再只围绕“一次提问、一次任务”组织体验，而是尝试让用户拥有持续工作的代理。</span><span> 有的强调同一个代理跨任务、跨入口接着工作；有的给代理配上独立身份；有的把多个代理做成通讯录里的同事；还有的把授权、审批和执行过程放到更重要的位置。</span></p>

<p id="f-doxcn21JQFEskbVe1nKNlEC8oQg"><span>今天讲的产品主要在 2026 年 8—9 月发布：</span></p>

<div id="f-doxcnoeS705M7k7IMGsdKCXYa9d"><table><colgroup><col width="110"/><col width="110"/><col width="250"/><col width="330"/></colgroup><tbody><tr><td colspan="1" rowspan="1"><p><span style="font-weight:bold">公司 / 品牌</span></p></td><td colspan="1" rowspan="1"><p><span style="font-weight:bold">产品</span></p></td><td colspan="1" rowspan="1"><p><span style="font-weight:bold">主要场景</span></p></td><td colspan="1" rowspan="1"><p><span style="font-weight:bold">最值得关注的设计</span></p></td></tr><tr><td colspan="1" rowspan="1"><p><span style="font-weight:bold">OpenAI</span></p></td><td colspan="1" rowspan="1"><p><span style="font-weight:bold">dots</span></p></td><td colspan="1" rowspan="1"><p><span>产品发布、研发、研究、销售、内容制作等持续性工作</span></p></td><td colspan="1" rowspan="1"><p><span>围绕同一个代理维持上下文，减少用户在任务线程和不同入口之间搬运背景</span></p></td></tr><tr><td colspan="1" rowspan="1"><p><span style="font-weight:bold">Manus</span></p></td><td colspan="1" rowspan="1"><p><span style="font-weight:bold">Cue</span></p></td><td colspan="1" rowspan="1"><p><span>电话与邮件沟通、出行预订、购物、日常事务，也包括工作协作</span></p></td><td colspan="1" rowspan="1"><p><span>给代理配电话、邮箱、钱包和电脑，让它拥有对外办事的身份</span></p></td></tr><tr><td colspan="1" rowspan="1"><p><span style="font-weight:bold">Meta</span></p></td><td colspan="1" rowspan="1"><p><span style="font-weight:bold">Muse</span></p></td><td colspan="1" rowspan="1"><p><span>购物、旅行、日程、长期个人目标等事务</span></p></td><td colspan="1" rowspan="1"><p><span>持续工作环境与独立安全审核结合，把“替我做事”和“允许它做事”分开</span></p></td></tr><tr><td colspan="1" rowspan="1"><p><span style="font-weight:bold">xAI / Grok</span></p></td><td colspan="1" rowspan="1"><p><span style="font-weight:bold">Grok Bot</span></p></td><td colspan="1" rowspan="1"><p><span>销售拓展、收件箱、客户管理、招聘、费用、产品与研发流程</span></p></td><td colspan="1" rowspan="1"><p><span>把具名、持续工作的 Bot 做成可直接联系的同事，并通过群聊交接工作</span></p></td></tr></tbody></table></div>

<p id="f-doxcnZwdZWonwSsl3q71zKKfmed"><span>上面的主要场景，是我从各个产品的官网的演示示范总结的，可以大概体现出官方主推的功能。不过Agent 产品本身就是没有明确的边界，就像ClaudeCode，虽然他的主要定位是Coding Agent，但是其实它可以用来剪视频，做AI 自动化等其他功能。上面的这些Agent也是一样。</span></p>

<p id="f-doxcnodROC4mTg3xDG87Qp2ODLh"><span style="font-weight:bold">OpenAI dots：持续共事</span></p>

<p id="f-doxcnwVC8zUJ6R2uLx160oswCDf"><span style="font-weight:bold">公司与场景。</span><span> dots 是 OpenAI 于 2026 年 9 月 29 日发布的 Agent 产品，入口在 ChatGPT，也可以通过 Slack、Teams 等渠道沟通。它面向的不是某一种单点工具，而是需要不断接收新信息、修改结果、推进进度的工作，例如产品发布、客户方案、研究分析和内容制作。</span></p>

<div id="f-doxcny5OzXQ7MYDCoU46hWgOiDd"><img alt="" decoding="async" height="803" loading="lazy" src="/images/agent-learning/3c2d9c8da36fa97844a64911.png" width="1280"/></div>

<p id="f-doxcnyvYjLdeS1rbUssGFCeBvQc"><span style="font-weight:bold">结合图片看设计。</span><span> 左侧是与 Felipe 的对话，任务是把演示文稿的第 5 页改成 daily view，并保持原有风格、提供两个方案；右侧展示 </span><span><span><span>See your day more clearly.</span></span></span><span> 和 </span><span><span><span>Your day, in one view.</span></span></span><span> 两个方案预览，还标有邮件、社交素材。对话中提到把预览保存到 Library。它不是只有一段聊天回答，而是把“和代理沟通”与“检查代理正在修改的工作成果”并置起来。</span></p>

<p id="f-doxcnt58P4lWVikWl1V6b4ypLmd"><span style="font-weight:bold">💡最核心特点</span></p>

<p id="f-doxcno6TXAhGwfFAdkUd0pRU9Lh"><span style="font-weight:bold">上面介绍的是 dots 的界面与交互方式。但可以认为，dots 最核心的特点，是把持续的上下文放在同一个代理身上，而不要求用户每次围绕任务重新组织对话。</span></p>

<p id="f-doxcnX0MBul2q8ttMbgaFYkw0jh"><span>这个判断来自官方产品说明：用户可以不断带来新任务、新想法，不必来回管理不同线程，也不必指挥每一步；同一个 dot 还可以同时推进多个项目，并在 ChatGPT、Slack、Teams 之间携带上下文。</span></p>

<p id="f-doxcnjiAoc7yeZFC92u9t7lN4Yf"><span>比如，你正在负责一次产品发布。上午告诉它定位变化，下午让它修改邮件，第二天再反馈社交素材的风格。产品希望你是在持续指导“同一个了解这次发布的代理”，而不是分别找三个聊天记录，再把背景复制过去。它也会从反馈中学习你对“做得好”的标准。</span></p>

<p id="f-doxcnAfjY6nVJDsRGPyGoIVU0wc"><span style="font-weight:bold">dots 并没有取消背后的文件和任务管理，而是减少了用户亲自管理它们的必要。</span><span> 用户可以持续与同一个 dot 沟通，由它维护工作上下文、组织执行过程，不必为每个新任务重新整理对话、重复交代背景。需要时，用户仍可以查看成果、通过 Activity View 检查进度，或打开它的电脑介入调整。</span><span style="font-weight:bold">不用管理每个执行细节，不等于完全不用监督：用户仍需给出方向，并在重要决策或操作上审核、确认。</span></p>

<p id="f-doxcn5CYPWqcqlPU0HKeU94by9e"><span>这一改动，减少了用户的使用门槛。之前用户还需要手动管理不同任务的文件夹。现在即使用户要推进多个任务，也只需要和主Agent对话，</span></p>

<p id="f-doxcn001mazJBUOWtqnzrGzAhVf"><span style="font-weight:bold">Manus Cue：独立身份</span></p>

<p id="f-doxcnTZGOZffTxcFpLIlx9AE0sb"><span style="font-weight:bold">公司与场景。</span><span> Cue 是 Manus 在 2026 年 9 月 28 日随 Manus 2.0 公布的独立应用。它与 Manus 使用相同基础设施，但产品重心是个人代理：打电话、处理邮件、预订出行、购物和安排日常事务，也能通过多个代理协作处理工作项目。</span></p>

<div id="f-doxcnQO0dqSJm22l5eJCfk7t2ch"><img alt="" decoding="async" height="675" loading="lazy" src="/images/agent-learning/88d2ac6f3089d2135b4e77ab.jpg" width="1200"/></div>

<p id="f-doxcnujudaYiI1jD1XDio8HU4nd"><span style="font-style:italic">图 2：Manus 2.0 发布页 Cue 小节的官方展示图。来源：</span><span><span style="font-style:italic"><a href="https://manus.im/blog/introducing-manus-2-0"><span>Introducing Manus 2.0</span></a></span></span><span style="font-style:italic">，获取于 2026-10-11；官方演示素材，非独立实测。</span></p>

<p id="f-doxcnzfJFzkzuwOAFjObXr50L8b"><span style="font-weight:bold">结合图片看设计。</span><span> 这张图把多个界面并置：中间能看到 </span><span><span><span>Work Assistant</span></span></span><span>、</span><span><span><span>Everyday Helper</span></span></span><span> 分类，以及 </span><span><span><span>Weekly Priorities</span></span></span><span>、</span><span><span><span>Tokyo Trip</span></span></span><span> 等会话条目；右侧是 </span><span><span><span>Mail Assistant</span></span></span><span> 的配置界面。它把 </span><span><span><span>Mail</span></span></span><span>、</span><span><span><span>Computer</span></span></span><span>、</span><span><span><span>Automations</span></span></span><span> 和 </span><span><span><span>Configuration</span></span></span><span> 显式列出来，自动化中包括 </span><span><span><span>Daily Inbox Summary</span></span></span><span>、</span><span><span><span>Weekly Newsletter Digest</span></span></span><span>，配置中则有 </span><span><span><span>Instructions</span></span></span><span> 和 </span><span><span><span>Memory</span></span></span><span>。这说明用户不只是向助手提问，还能配置它有哪些资源、遵循什么指示、承担哪些例行工作。</span></p>

<p id="f-doxcnov5o03DL09s7h6pUCnmqnd"><span style="font-weight:bold">核心设计：不是给一个聊天机器人增加工具，而是给代理配置一套身份。</span><span> Cue 官网把 Phone、Wallet、Computer、Mail 单独列出来：代理可以拥有自己的电话号码、邮件地址、钱包，以及使用应用与工具的工作空间。这让它在用户授权下，不只在聊天框里给建议，还能通过外部服务把事情接着办下去。</span></p>

<p id="f-doxcnm95vislbBG86kgaqLEIDeb"><span>举个官网中的场景：你需要酒店的连通房。代理先找候选酒店，再从自己的邮箱发邮件询问哪些酒店能够保证连通房，最后汇总回复。或者你暂时无法接电话，把来电转给代理，让它了解对方的事项，再把摘要交给你。这里值得注意的不是“能查酒店”，而是</span><span style="font-weight:bold">代理有一个外部服务可以联系、回复的身份，沟通不再只发生在你与模型之间</span><span>。</span></p>

<p id="f-doxcna2ckFX40PnEvbEwqJYtYqb"><span>与单纯后台调用子 Agent 相比，这种设计更强调用户可以直接认识和组织自己的代理。</span></p>

<p id="f-doxcnheM8vKVMso4m9nGD0wbEUb"><span style="font-weight:bold">一句话记住：Cue 最鲜明的特点是做了一个聊天工具，工具里的联系人是一个个Agent，你可以设置每个联系人的权限，身份信息，还可以拉群让他们讨论和协作</span></p>

<p id="f-doxcnh7qMqqmbTEDsEhkQxSMDLc"><span style="font-weight:bold">Meta Muse：执行与授权</span></p>

<p id="f-doxcnVIacj12hRk8ixPCwrzTsWd"><span style="font-weight:bold">公司与场景。</span><span> Muse 是 Meta 于 2026 年 9 月 8 日公布的个人 Agent 产品，用户可以在 Muse 应用或 WhatsApp 中与它沟通。它面向购物、旅行、邮件、个人计划等事务。</span></p>

<div id="f-doxcnyyQLpGco081Bd9zgUjyT8g"><img alt="" decoding="async" height="811" loading="lazy" src="/images/agent-learning/d39429016be33f621f8a0312.jpg" width="380"/></div>

<p id="f-doxcnJfWV7zzioxxFtmLLOVw7Oh"><span style="font-style:italic">图 3：Meta 官方购物演示约 18 秒处的购买确认界面。来源：</span><span><span style="font-style:italic"><a href="https://about.fb.com/news/2026/09/introducing-muse/"><span>Introducing Muse</span></a></span></span><span style="font-style:italic">，获取于 2026-10-11；官方视频截帧，非独立实测。</span></p>

<p id="f-doxcnlrgGN6TYft6fFDAOmLJv5d"><span style="font-weight:bold">结合图片看设计。</span><span> 图中出现了 </span><span><span><span>Blocked · Waiting for confirmation</span></span></span><span>，购买操作以 </span><span><span><span>Checkout</span></span></span><span> 卡片呈现，并提供 </span><span><span><span>Deny</span></span></span><span> 和 </span><span><span><span>Allow</span></span></span><span>。卡片列出金额与付款信息，方便用户在操作发生前做决定。它展示的不是“已经买好了”的一句回答，而是一个明确的交接点：</span><span style="font-weight:bold">代理已经把购买推进到可执行阶段，但是否执行，交回用户决定。</span></p>

<p id="f-doxcnOuYo7OKjIcRHsXHdXYy1de"><span>从官网介绍和图片上看，仅从产品最核心的功能设计上来看，</span><span style="font-weight:bold">我没有看出特别新颖的地方</span><span>。因为生活助手类似的早已有之（千问过年推出的自动点外卖的app就和他有点像）。这里更值得分析的是，Meta 怎样把持续工作与安全授权组合起来。</span></p>

<p id="f-doxcn8W9WvHNjvzp1dwoFf1iVrf"><span style="font-weight:bold">Grok Bot：AI 同事</span></p>

<p id="f-doxcnnmjXh3eTn5ixn70jQ97Ujc"><span style="font-weight:bold">公司与场景。</span><span> Grok Bot 是 xAI / Grok 品牌于 2026 年 8 月 11 日发布的产品。使用入口是桌面应用和 iOS 应用，主要交互仍然是聊天。官网展示的工作场景包括销售拓展、客户管理、招聘、费用处理、收件箱管理，以及产品与研发流程。</span></p>

<div id="f-doxcn9eqaNxYW0CeKIC9HBUC9Ke"><img alt="" decoding="async" height="661" loading="lazy" src="/images/agent-learning/3232e259470d0590c259c3a4.png" width="977"/></div>

<p id="f-doxcnTsCXfFYVbRRq8UAph6jhPc"><span style="font-style:italic">图 4：Grok Bot 官网交互演示截图。来源：</span><span><span style="font-style:italic"><a href="https://x.ai/bot"><span>Grok Bot</span></a></span></span><span style="font-style:italic">，获取于 2026-10-11；官方演示，非独立实测。</span></p>

<p id="f-doxcnof2ZzzTGoXIUnA190cfSMg"><span style="font-weight:bold">结合图片看设计。</span><span> 左侧不是只有按日期排列的聊天记录，而是一组有名字、有职责的联系人：</span><span><span><span>Chief</span></span></span><span>、</span><span><span><span>Sales Outbound</span></span></span><span>、</span><span><span><span>Inbox Manager</span></span></span><span>、</span><span><span><span>Account Manager</span></span></span><span>、</span><span><span><span>Talent Scout</span></span></span><span>、</span><span><span><span>Expense Manager</span></span></span><span>，还有 </span><span><span><span>Offsite crew</span></span></span><span> 群聊。它们分别对应总助、销售拓展、收件箱管理、客户经理、招聘搜寻和费用管理等角色。</span></p>

<p id="f-doxcnr5THM18mn5xhhkOUpaDOgx"><span>右侧是与 </span><span><span><span>Sales Outbound</span></span></span><span> 的工作对话。截图中的执行结果包括 Salesforce 的 </span><span><span><span>52 accounts</span></span></span><span>、Hex 的 </span><span><span><span>3 segments</span></span></span><span>，以及 Sequencer 的 </span><span><span><span>36 drafts queued · 0 sent</span></span></span><span>：36 份草稿已经排队，但尚未发送。接着，用户说 </span><span><span><span>Send it. Run this every week.</span></span></span><span>，界面出现创建 </span><span><span><span>Overnight outbound</span></span></span><span> 例行任务的记录。</span><span style="font-weight:bold">在这一段演示中，任务从准备成果、等待指示，接着变成持续运行的工作流程。</span></p>

<p id="f-doxcnaw7m8flVVZk7KfZdmLC1eb"><span>这个形态其实和上面的Cue有点像，都属于“把多个持续代理做成可联系的角色，并通过聊天组织协作”的形态；Grok Bot 更强调同事分工，Cue 更强调代理身份与对外办事。</span></p>

<a id="f-doxcnDxqMcx9WR1raOojBAIXcBd"></a>

##### 五大发展趋势

<p id="f-doxcnjyXRHnH3SHx5SeWApSxd8e"><span>上一小节介绍的是这几款产品在UI上的最典型特点，这一小节我们从他们的设计上来提炼出一些2026年Agent 功能设计的趋势和方向。</span><br/><span>掌握了他们的设计之后，非常推荐能够把他们的设计理念和特点，加入到我们自己的Agent产品形态当中。</span></p>

<p id="f-doxcn9LIwTnW218haMcG2CbSO6g"><span style="font-weight:bold">持续的云端环境</span></p>

<p id="f-doxcnke6srC9O2IO7YwQtYJY8xc"><span style="font-weight:bold">Agent 不再只是当前聊天窗口里的临时执行者，而是有一个可以继续工作的地方。</span><span> 这个地方可以是云端电脑，也可以是其他托管的执行环境。让用户离开后，已委托的任务能否继续推进</span></p>

<p id="f-doxcnawWLO4P0icVOR6Pvtleauf"><span>例如，Meta 为 Muse 提供 Muse Secure VM，也就是云端的专用虚拟电脑。按照官方说明，Muse 可以在其中使用浏览器处理事务，用户关闭应用后仍能继续工作，等任务有变化或需要批准时再联系用户。这里的变化是：</span><span style="font-weight:bold">用户不必为了让任务继续，一直开着自己的电脑和聊天窗口。</span></p>

<p id="f-doxcnr4lAUVrWuHc5uzO9iBhNMr"><span>Grok Bot 也强调持续存在的云端电脑。一个用户的多个 Bot 共享这台电脑上的文件、浏览器和登录状态，方便交接工作。例如，一个 Bot 整理资料，另一个接着处理，不必每次重新准备环境。</span></p>

<p id="f-doxcn7R0VgUhmY1IfXRBzZBnSLf"><span>OpenAI dots 则提供自己的云端电脑，用户可以打开它检查工作；Cue 官网也说明代理在用户退出后仍可继续工作。它们共同指向的需求是：</span><span style="font-weight:bold">把持续执行所需的环境准备好、维护好，减少用户自己部署服务、保持设备在线的负担。</span></p>

<p id="f-doxcnYIZyPtOUXmHuO0SwqMVhed"><span>可以用一个例子理解：你让 Agent 收集一批供应商的报价，晚上关闭电脑。它仍可以继续处理已经获准的工作，第二天你回来查看阶段性结果。</span></p>

<p id="f-doxcntFBEYbPC9Fm2dep3WbUpeb"><span style="font-weight:bold">可以看出，上述产品的设计理念相近：由产品提供持续可用的云端工作环境，将任务执行与用户自己的电脑分离。</span><span> 用户不必一直保持本机和应用开启，已委托的任务也可以继续推进。至于底层是否采用 VM，以及工作环境如何共享与隔离，各家的实现并不一定相同。</span></p>

<blockquote id="f-doxcnegApyHhwAjwjnmEsVzJruy"><span style="font-weight:bold">💡 项目灵感｜ForgePilot：把 Bug 修复做成云端闭环</span></blockquote>

<blockquote id="f-doxcn1dQU51r9XK3QuqjEa7aQ5b"><span>我们能否把 ForgePilot 的亮点，从“输入问题、输出代码”进一步发展为一套面向企业的修复流程：</span><span style="font-weight:bold">需求与问题分析 → 复现定位 → 代码修复 → 测试验证 → 提出 PR，交给用户审核</span><span>？把这条流程做成产品默认提供的完整体验。</span></blockquote>

<blockquote id="f-doxcnAfgUwUPFQSm6qdjglWF8re"><span>结合云端工作环境，用户交代修复任务后就可以关闭窗口，执行不必依赖用户电脑。下次打开时，看到的可能已经是待审核的 PR、测试结果，或者明确的阻塞原因与介入请求。</span><span style="font-weight:bold">用户离开后工作仍能推进，回来后有成果可验收</span><span>，可以成为一个直观的设计亮点；是否合并、上线，仍按企业的审批规则处理。</span></blockquote>

<p id="f-doxcnATutoea2odrZWWZ2Cn78Uo"><span style="font-weight:bold">主动跟进</span></p>

<p id="f-doxcnTns0GC4nhiqqegeeQXTFcc"><span style="font-weight:bold">持续工作解决“能不能接着做”，主动性解决“什么时候开始做、什么时候再来找你”。</span><span> 如果一个 Agent 只是一直在线，但所有工作仍要用户重新发一句指令，它还没有减少多少跟进负担。</span></p>

<p id="f-doxcnLeaiVt6EjkjH0qN9V15e9b"><span>主动性可以分成三个层次：</span></p>

<ul><li id="f-doxcnIuebukkcqyTakZAmX9tkuQ"><span style="font-weight:bold">按时间启动。</span><span> 例如每天早上整理收件箱，或每周准备一次销售线索。</span></li></ul>

<ul><li id="f-doxcnlsfLaSSqHaCLka2JzqHoph"><span style="font-weight:bold">按事件启动。</span><span> 例如收到新邮件、某个 Slack 线程有更新后，开始执行约定的任务。这需要产品支持对应的事件与连接工具。</span></li></ul>

<ul><li id="f-doxcndyoexJdr39NLZDoeutLDcd"><span style="font-weight:bold">结合上下文提出下一步。</span><span> 根据此前的目标和新信息，主动给出建议、准备材料，或询问用户是否继续。</span></li></ul>

<p id="f-doxcnLYpXr3t4f9Uyvva2mGomQg"><span>Grok Bot 的官网演示就展示了从单次任务到例行工作的转换：销售拓展 Bot 先准备候选客户和邮件草稿，用户检查后说“Run this every week”，界面随后出现 </span><span><span><span>Created routine — Overnight outbound</span></span></span><span>。用户不是每周重新交代一遍，而是把工作变成了持续的安排。</span></p>

<div id="f-doxcnHr4dq4g25U1RQskyUtEjEe"><img alt="" decoding="async" height="661" loading="lazy" src="/images/agent-learning/3232e259470d0590c259c3a4.png" width="977"/></div>

<p id="f-doxcnoSBYJC29rUdnW83Fj9wxYe"><span>结合这张图，可以注意右侧下方的例行任务记录。它能说明官方展示了“设置后重复执行”的交互，但不能仅凭截图证明后续每周执行的质量和稳定性。</span></p>

<p id="f-doxcnkvexYWq5sbsRkUC7BmiuEd"><span>Cue 也有 Automations，支持定时或受支持的事件、条件触发；它的 Mail Assistant 界面列出了每日收件箱摘要、每周简报摘要。dots 则描述了另一种主动性：在已连接的信息来源中进行主动研究，发现可能需要关注的事情，再准备建议或材料。</span></p>

<p id="f-doxcnTd15t1hIireRWIxHykSg8g"><span style="font-weight:bold">主动不等于擅自行动。</span><span> 比如 dots 的主动研究使用只读工具，不能通过这条机制自行发送消息或修改应用内容。主动发现问题、主动准备方案和获得授权后执行，是不同阶段。一个好用的 Agent，既要减少用户催促，也要知道何时停下来询问。</span></p>

<blockquote id="f-doxcnPzdMhvxzAHpl4tQ76Nxz0d"><span style="font-weight:bold">💡 项目灵感｜ForgePilot：主动找问题，遇到阻塞再找人</span></blockquote>

<blockquote id="f-doxcn7QoM6H5T6iENjt6rZEkX2d"><span>ForgePilot 能否不再只等待用户输入 Bug，而是定期检查已有的 Bug 列表，并从已授权的邮件、Issue 等来源中识别新的问题线索？例如，收到“导出报表后页面报错”的反馈后，先整理复现条件、判断是否与已有问题重复，再为符合处理规则的 Bug 启动修复和测试。</span></blockquote>

<blockquote id="f-doxcnAhLUYGI2BVZjW6LJB87COg"><span style="font-weight:bold">主动发现 → 分析筛选 → 按授权修复 → 汇报成果或请求介入</span><span>，可以成为另一条工作路径。不是发现任何线索都直接改代码：涉及需求不清、权限不足或高风险改动时，应主动找人确认，并说明缺什么信息、需要做什么决定。这样既减少用户反复催促，也避免把不可靠的反馈当成确定的修复指令。</span></blockquote>

<p id="f-doxcn4jhpPEHe8OJnoWQC4SQBId"><span style="font-weight:bold">完整任务交付</span></p>

<p id="f-doxcn5UbPcr763vmUegPkU3ufsh"><span style="font-weight:bold">用户希望交出去的是一件事，而不是一串点击步骤。</span><span> 这并不是说过去的 Agent 完全不能执行长任务，而是随着能力提升，产品越来越强调把任务推进到可检查、可使用的结果。</span></p>

<p id="f-doxcnedoN7ohM74hHMilPQh1mXe"><span>以购物为例，如果还需要用户逐步说“打开网站、搜索商品、选规格、进购物车”，那么 Agent 更多是在代替手动操作。Muse 的官方演示则展示了一个更完整的过程：给出旅行婴儿车候选、推荐合适的商品、打开商品详情、推进结账、等待用户批准，最后显示购买完成。</span></p>

<div id="f-doxcnsDMaTKSj5rdXjO4AHrw0ae"><img alt="" decoding="async" height="811" loading="lazy" src="/images/agent-learning/7dbb8363bf7336123dc4ffee.jpg" width="380"/></div>

<p id="f-doxcn644iirkP3pxRVIdmZXq81d"><span>这张图是同一段官方视频约 22 秒处的截帧，界面显示 </span><span><span><span>Completed · Purchased Glide Pro</span></span></span><span>。与上一节的购买确认图连起来看，能理解“接受任务 → 推进操作 → 用户确认 → 交付结果”的过程；</span></p>

<p id="f-doxcnKfJ0jn4vRWIvPRQvJKu98K"><span>工作场景也是一样。dots 官网的研发例子，不只是告诉用户“这个 Bug 可能怎么修”，而是描述它跟踪反馈、修改和测试代码，再准备带有变更演示视频的 PR，交给用户审核。</span></p>

<blockquote id="f-doxcnT8mQGITEeABr9HkCU8r8nb"><span style="font-weight:bold">💡 项目灵感｜ForgePilot：不只交代码，还展示修复效果</span></blockquote>

<blockquote id="f-doxcnTLGdZH1xKrHJwkiSCgoHXb"><span>dots 的官方设计例子给了我们一个具体启发：</span><span style="font-weight:bold">修复完成后，能否自动生成演示视频，让审核者直接看到变化？</span><span> 对页面交互类 Bug，ForgePilot 可以在测试环境中复现问题、验证修复，并记录关键操作，随 PR 一起交付修复前后的对比或修复后的操作演示。</span></blockquote>

<blockquote id="f-doxcnOteL4QDMMDNT9s5h0Tdg4b"><span>例如，“点击导出按钮后页面报错”被修复后，视频展示点击按钮、成功下载文件的过程；同时附上测试结果与修改说明。这样用户不用只凭“已修复”三个字判断，也不必为了初步验收先自己拉代码、搭环境。</span><span style="font-weight:bold">让修复成果更容易检查，也是交付体验的一部分。</span><span> 视频不能替代测试；对于不适合录像的后端 Bug，则可以提供请求与响应对比、日志或回归测试报告。</span></blockquote>

<p id="f-doxcnFaZQzA55jjioadCqBXnnMe"><span>这里的“交付”，也不一定意味着 Agent 做完全部最后操作。</span><span style="font-weight:bold">一份等待审批的邮件、一组经过测试的代码修改、一个整理清楚的预订方案，都可以是有明确验收标准的阶段性成果。</span><span> 关键是用户收到的是可以检查和继续使用的结果，而不是还要自己组织大部分后续工作的建议。</span></p>

<p id="f-doxcnp6rdVTTzsx67CX1DJemHkg"><span>这也改变了用户的角色：从不断指挥下一步，转向说明目标与约束、检查成果、处理关键决定。对项目设计来说，可以问一句：</span><span style="font-weight:bold">我的 Agent 最后交给用户的，究竟是一段回答，还是一个真正可验收的成果？</span></p>

<p id="f-doxcnquENqo07fTFADwobfIPend"><span style="font-weight:bold">跨任务记忆</span></p>

<p id="f-doxcnMkWYNQtYCryWHXA291cLAh"><span style="font-weight:bold">长期委托需要的不只是“电脑一直在”，还需要“它知道我们做到哪里了”。</span><span> 否则，即使 Agent 可以运行很久，用户每次回来仍要重述目标、贴资料、解释偏好，使用成本依然很高。</span></p>

<p id="f-doxcnfPy8qZsfjgV9dvHompF1Ob"><span style="font-weight:bold">以 dots 为例，你可以持续把工作交给同一个 dot，不必每次都从头讲一遍。</span><span> 按照官方描述，它可以保留相关的工作背景、同时推进多个项目，减少用户翻找旧对话、复制资料和重复解释的负担。</span></p>

<p id="f-doxcnDJmPtXR3VhzIcKeXPQFHyh"><span>比如，你先告诉 dot：“这次产品发布面向新手用户，文案要简单。”它帮你准备了宣传材料。第二天，你再说：“根据昨天的材料，写一封发布邮件。”产品希望它能接着使用此前的要求和成果，而不是让你重新说明目标用户、文案风格，再把昨天的材料贴一遍。这里强调的是</span><span style="font-weight:bold">同一个 dot 能接着此前的工作往下做</span><span>，而不是只处理当前这一条消息。不过，这不代表它可以读取未授权的数据，也不保证记忆永远完整、准确。</span></p>

<p id="f-doxcnJZ3JhtNmRzo8n4amIxp1Sf"><span>Cue 的官方应用说明也提到 Memory and Dream，用来记住饮食偏好、旅行习惯、学习进度和计划；Muse 支持记住用户在意的事情，也允许用户要求它忘记具体内容。Grok Bot 则强调角色保留工作上下文、从反馈与流程示范中学习。</span></p>

<p id="f-doxcnRX6CfuyTe864rreUxCYMMg"><span>这一条可以分成两种记忆：</span><span style="font-weight:bold">“这项任务做到哪一步”的进度，以及“你通常希望怎样做”的偏好。</span><span> 前者让任务能接着做，后者让代理逐渐减少重复确认。产品还需要考虑如何纠正过时或错误的记忆，而不是只追求记住得更多；各家的查看、修改和删除能力并不相同。</span></p>

<p id="f-doxcnmzndMZVa6lEQjD9wlHlP0U"><span>点评：Agent记忆一直是每个Agent的核心能力，Dots的这个理念很好，不用再让用户来通过文件夹的形式管理任务，而让一个Agent在全局的角度，记住所有事情。但我也非常好奇的是，以前我们设计记忆模块，让Agent能很好地记住一次任务，都是一件很难的事，现在我们让他记住多个任务，无疑对他背后的记忆模块的设计提出了更高的要求。 除了这个产品形态值得学习，他背后如何实现的，大家在如何继续卷记忆模块的设计，也是我们值得深入挖掘。</span></p>

<blockquote id="f-doxcnzPBk74FvFirGq6aJwJxq0g"><span style="font-weight:bold">💡 项目灵感｜ForgePilot：一个入口，跟进多个 Bug</span></blockquote>

<blockquote id="f-doxcnjLqwdsOw5fr42VqPyeEqQe"><span>我们的 Coding Agent 能否弱化用户对工作目录和独立任务会话的管理，提供一个统一的全局聊天入口？用户可以在同一处交代：“修复一下今天的bug”由 ForgePilot 找到对应项目、任务进度和相关材料，而不是让用户逐个打开目录、翻找聊天记录。</span></blockquote>

<p id="f-doxcn4pjS9EBT8lMySAcrUXs70e"><span style="font-weight:bold">开箱即用</span></p>

<p id="f-doxcnmodVY5A1MyJAMABclz58xF"><span style="font-weight:bold">很多能力早已有了，但普通用户不一定能把它们用起来。</span><span> 要自己部署常驻服务、接入模型、配置工具、设置触发器，再维护上下文，这些工作对开发者尚且有成本，更不用说只是想让 Agent 帮忙办事的用户。</span></p>

<p id="f-doxcn4QLurNrmKGwiVjWNz97nHe"><span>两份文稿都强调了这个方向：把需要自行搭建的能力，变成可以直接交办的产品体验。这里的“开箱即用”不是完全不需要设置，而是产品替用户承担了更多搭建和管理工作。</span></p>

<div id="f-doxcnKDlmUBka4nGIukG11EpVTf"><img alt="" decoding="async" height="675" loading="lazy" src="/images/agent-learning/88d2ac6f3089d2135b4e77ab.jpg" width="1200"/></div>

<p id="f-doxcnvUqHIjrVj1wnI2RPhxHKGg"><span>Cue 的官方展示图里，右侧 </span><span><span><span>Mail Assistant</span></span></span><span> 将 Mail、Computer、Automations、Instructions、Memory 放在同一个助手的配置界面中。用户面对的是“这个助手能用什么、按什么要求工作、有哪些例行任务”，而不是自己拼接一套运行系统。图中的自动化条目说明这些能力被做成了可见入口，并不代表所有任务都无需配置就能成功运行。</span></p>

<p id="f-doxcnPKv9IiLiniErR7WMRiQHYg"><span>Grok Bot 把具名角色和群聊放在界面上，还提供让 Bot 跟随用户操作、学习 routine 的方式；dots 让用户通过同一个代理沟通多个项目；Muse 则把执行状态、购买确认等节点呈现在聊天流程中。它们都在尝试让用户用更熟悉的方式交代、检查和调整工作。</span></p>

<p id="f-doxcnTVlXtMqc8s7ACECXk0Z90A"><span>点评：这一点是做personal agent（面向个人生活场景的Agent） 更应该考虑的，因为personal agent的用户通常不是程序员，所以降低他们的使用门槛是很重要的。可以参考这些Agent的设计，把产品做成一个类似于聊天软件的APP, 不用配置，不用部署，开箱即用。</span></p>

<a id="f-doxcnGEAHLvZuCP6kfQLdz1mXph"></a>

##### 面试问题

<p id="f-doxcn9hoHAmoeqPkYZlQMtBw8wf"><span style="font-weight:bold">你如何看待现在Agent发展的趋势？</span></p>

<p id="f-doxcn7qwjn9ubXHoS6CdkRn8ldd"><span style="font-weight:bold">💡 思路：</span><span>这类问题没有标准答案，可以按“时间阶段 → 代表产品 → 主要特点”的顺序回答，最后总结 2026 年的趋势与自己的判断。阶段是为了讲清发展重点，不是严格的行业分类；不同形态会并行发展，也会互相吸收能力。这样既体现对发展过程的理解，也能落到近期产品与项目设计。</span><br/><br/><span style="font-weight:bold">🎤 参考答案：</span></p>

<p id="f-doxcnhtBD09772GWumuu6peYmId"><span>可以从几个时间阶段来看 Agent 的发展。</span></p>

<p id="f-doxcn86qflD53dTzVrEUz3UXhff"><span style="font-weight:bold">第一，2025 年上半年，任务执行型应用受到更多关注。</span><span> 例如，2 月推出研究预览的 Claude Code，深入代码项目，读取代码、修改和测试；3 月推出的 Manus，则让用户通过网页交代目标，由它调用工具完成调研、文档等任务。这一阶段的重点，是从“给出回答”走向“执行任务”，编程与通用任务两条路线并行发展。</span></p>

<p id="f-doxcnUmYJpDa0dgqgYhD326QTQg"><span style="font-weight:bold">第二，到 2026 年初，以 OpenClaw 为代表的个人代理更强调长期服务。</span><span> 它接入聊天软件，结合定时任务、主动检查和记忆，让用户随时交办，也能按约定持续跟进。但自行部署、配置和维护仍有门槛，其他 Agent 也在吸收这些能力。</span></p>

<p id="f-doxcnGR1T8McTk4bZP2eQ61a4i4"><span style="font-weight:bold">第三，2026 年 8—9 月，Grok Bot、Muse、Cue 和 dots 集中推出，更强调持续代理的产品体验。</span><span> 比如 dots 用同一个代理承接多个任务、减少重复解释；Cue 和 Grok Bot 把代理做成可联系、有分工的助手；这些产品也强调托管工作环境，让已委托任务不必依赖用户本机持续运行。</span></p>

<p id="f-doxcnfxFw14NZBoiqKb2UFkB19c"><span style="font-weight:bold">可以认为现在最新的Agent的发展形态朝着：持续的云端工作环境、主动跟进、完整任务交付、跨任务的上下文与记忆，以及开箱即用。</span><span>这些方向在发展 ，让用户少配置、少指挥，却得到可靠的成果，降低Agent的使用门槛，让更多的用户可以使用。</span></p>

<p id="f-doxcn6VqLOsutIlN6iQ4nAQRuof"><span style="font-weight:bold">为什么现在的通用Agent已经很强了，你还要继续开发新的Agent？</span></p>

<p id="f-doxcno5mWCg4UZuXfXNqUoLxjAg"><span style="font-weight:bold">💡 思路：</span><span> 这个问题是有可能面试官在问自己的项目的时候问的，比如我们的ForgePilot项目，面试官就有可能问。这个问题真的是一个终极拷问：真的不光你会被问到，你的+1可能会被你的+2问到，为什么你要重新开发一个Agent，你的+2可能会被+3问到这个问题。 确实现在很多功能都是使用claudecode或者claudecode + SKILL就能完成的，但确实大家好像都在乐此不疲地开发新的Agent。 这个问题也没有一个标准答案，角度非常多。对于我们的ForgePilot项目，我希望找一些特别好的理由来回答这个问题（我会总结在</span><span style="font-weight:bold">ForgePilot项目</span><span>当中）。 在本小节的这个问题中，我们这四个产品的角度，来给这个问题提供一个思考角度（为什么已经有了这么多成熟Agent，2026年12月这些公司还要发布这么多新的Agent形态）</span></p>

<p id="f-doxcngQPBEUDYFqmJeGrX6sfjlb"><span style="font-weight:bold">🎤 参考答案（约两分钟，可直接口述）：</span></p>

<p id="f-doxcnbeUt87XLRkrdObS8m4Axdh"><span>可以认为，</span><span style="font-weight:bold">通用 Agent 的能力已经很强，并不代表它的产品形态已经定型。</span><span> Claude Code 等产品仍在演进，业界也在探索：怎样让用户更容易交办任务，让 Agent 更持续地工作，并交付更容易验收的成果。近期的 dots、Cue、Muse 和 Grok Bot，就体现了几个值得关注的方向。</span></p>

<p id="f-doxcnNjzZRFl938UbV2U0WbGebg"><span style="font-weight:bold">第一，持续的云端工作环境。</span><span> 让已委托的任务不依赖用户本机一直开着，用户离开后仍能推进，回来查看成果或处理阻塞。</span></p>

<p id="f-doxcn3qtDQ0xrZuysoab0Rpqzod"><span style="font-weight:bold">第二，更强的主动跟进。</span><span> 不只是等用户发指令，还能按时间、事件启动约定的工作，结合上下文提出下一步，并在需要时找人确认。</span></p>

<p id="f-doxcne9C1jOsD9NBb96UVevN8Nb"><span style="font-weight:bold">第三，从执行步骤走向完整交付。</span><span> 例如 dots 的研发场景，不只修改代码，还测试并准备带演示视频的 PR，让用户能直接审核修复结果。</span></p>

<p id="f-doxcnInqg0kYV0GtJLrOKS61NDc"><span style="font-weight:bold">第四，跨任务的上下文与记忆。</span><span> 比如 dots 强调持续向同一个代理交办工作，减少翻找旧对话、搬运资料和重复解释。</span></p>

<p id="f-doxcnBWC6gD2ePQUJ4rO2R0ZYWb"><span style="font-weight:bold">第五，更容易使用、开箱即用。</span><span> 比如 Cue 配置电话、邮箱和钱包，Grok Bot 把助手做成有固定职责的联系人，让用户用熟悉的聊天方式交办和协作，少搭环境、少管过程。</span></p>

<p id="f-doxcnPRGg7PXWBdBapnKOnqcIOe"><span>这些方向不一定是新产品独有的，Claude Code 也在吸收类似能力。</span><span style="font-weight:bold">但能力重叠，不意味着产品设计没有继续探索的空间。</span><span> 开发新 Agent，可以复用已有执行能力，围绕具体用户和场景改善整套体验。</span></p>

<p id="f-doxcnldB74TppkMN25noyJVLlRd"><span>所以，可以认为业界继续开发新的 Agent，不只是为了让它“能做更多事”，也是在探索“怎样让更多人真正用好这些能力”。</span><span style="font-weight:bold">从需要用户不断组织和跟进任务，走向更容易交办、能够持续推进、成果便于验收，是这一轮产品形态发展的重要方向。</span></p>

<p id="f-doxcniQZyZlSz30KdyoSRBrAomh"><span style="font-weight:bold">本节小结</span></p>

<p id="f-doxcnPj0XdeQgqOrhnqwgQkUf2e"><span>在国外公司推出了新的一系列Agent形态后，我们看到国内的公司，腾讯，字节也在大力加班推进（听说字节国庆有的组都没休息在赶这种像Personal Agent的产品）。</span><br/><br/><span>对于这些产品的研究，不论是产品还是技术同学，不论是产品方面还是实现的技术细节方面，都值得我们进一步去学习和深挖。今天通过粗略的的学习，已经对我带的个人项目和面试有很大帮助，继续深挖一定会有更多的收获。</span><br/><br/><span>最后从这一波行情来看，也告诉我了我们不是说Agent不值得做了，做不出新意了，整个大厂，行业都在继续探索和迭代。从个人的角度来说，我们紧跟大厂，行业的趋势，让自己的Agent的形态和技术和行业对齐，无疑会让该学习案例更有竞争力。</span></p>

<a id="f-doxcny2ckMykMRakflcwkQ5TjXA"></a>

##### 讲解视频

<p id="f-doxcnoCUmMEPtKRakeenq5u2T0g"><span><span><a href="https://www.bilibili.com/video/BV1kZp26bE6H/#reply320772547536"><span>https://www.bilibili.com/video/BV1kZp26bE6H/#reply320772547536</span></a></span></span></p>


<a id="section-0140"></a>
## RSI 进展

<a id="f-doxcnsCL64VKvwMExS3b8wZy6WD"></a>

<p id="f-doxcnGAImBYM6EuVh9rX8P8RR0b"><span style="font-weight:bold">前言</span></p>

<p id="f-doxcnVQXoiyefKihOEIQ57qNIQb"><span>最近（2026 年 10 月），有挺多朋友催我聊一聊 RSI：这个概念为什么突然这么热？AI 到底已经能自己改进自己了，还是大家又把一个遥远的设想讲成了现实？</span></p>

<p id="f-doxcnMo8X2ZoEpQkT6ftSCytjUb"><span>RSI 的全称是 Recursive Self-Improvement，也就是“递归自我改进”。简单来说，就是 AI 利用现有能力改进自身，再由改进后的系统参与下一轮改进。</span></p>

<p id="f-doxcnm2DovuGFW9cybIRt8aHx4W"><span>这并不是凭空冒出来的讨论。沿着“模型参与改进模型”和“Agent 参与改进 Agent”两条线，已经能看到一些更具体的尝试：</span></p>

<ul><li id="f-doxcniJfUGbdgrHUGXKzkXIxLle"><span style="font-weight:bold">模型参与改进模型｜让模型学习“该给另一个模型出什么训练题”。</span><span style="font-weight:bold">2026 年 9 月 24 日</span><span>发布的论文 </span><span><span><a href="https://arxiv.org/abs/2609.30063"><span>《Self-Play Pretraining with Zero Data》</span></a></span></span><span>，让两个模型从随机初始化开始共同学习：一个“生成器”模型编写程序，由程序产生训练数据；另一个“学习者”模型通过预测这些数据来更新参数。生成器再根据学习者当前的能力获得反馈，学习生成难度合适的数据，推动下一轮训练。直观地说，就是 </span><span style="font-weight:bold">“模型生成训练数据 → 训练另一个模型 → 根据学习进展调整数据 → 继续训练”</span><span>。这展示了模型参与构建自适应训练课程的可能性。</span></li></ul>

<ul><li id="f-doxcn5DMA3zrSumwNjnazggD7fb"><span style="font-weight:bold">Agent 参与改进 Agent｜不只修改用户的代码，也修改自己赖以工作的代码。</span><span> Sakana AI 与英属哥伦比亚大学团队的 </span><span><span><a href="https://sakana.ai/dgm/"><span>Darwin Gödel Machine（DGM）</span></a></span></span><span> 研究，论文</span><span><span><a href="https://arxiv.org/abs/2505.22954"><span>首发于 **2025 年 5 月 29 日**，最近一次修订于 **2026 年 3 月 12 日**</span></a></span></span><span>。它让编程 Agent 修改自身的工具和执行流程，再用编程任务评估新版本；产生的版本进入候选库，后续迭代可以从这些版本继续分支，形成 </span><span style="font-weight:bold">“Agent 修改自身代码 → 评估新版本 → 从已有版本继续改进 Agent”</span><span> 的链路。</span></li></ul>

<p id="f-doxcnIO61XHloQlBKRerAH3cZZg"><span>这两个例子的区别很直观：</span><span style="font-weight:bold">前者由模型参与生成训练数据，推动模型参数更新；后者由 Agent 修改自身代码，推动 Agent 系统迭代。</span><span> 这也是我们这个文章主要讲的两个思路，从模型和Agent应用两个路线来谈RSI。</span></p>

<div id="f-doxcnhtljXPBsrj1wjgmRBkFtfb"><img alt="" decoding="async" height="853" loading="lazy" src="/images/agent-learning/e5f9d6d712c6cae39611b200.png" width="1280"/></div>

<p id="f-doxcnmcmgPRMkPhONI3mJ1aGFSe"><span style="font-style:italic">图 1｜两条自我改进路线：一条通过训练更新模型参数，另一条修改 Agent 的工具、代码或工作流。AI 生成示意图，用于解释本文概念，不代表具体实验结果。</span></p>

<p id="f-doxcnJfMHl2i4fyapwVUmUVB1xe"><span>可以设想一下，如果这条路继续走下去，会是什么样子？在模型研发中，AI 不只帮忙写代码，还能参与准备训练数据、调整训练方案、运行实验和评估结果，再把有效的改进用于下一版模型。在 Agent 系统中，它也可能根据运行反馈，发现自身工具或执行流程的不足，修改代码、测试效果，把更好的版本保留下来，再用新版本继续改进。原本需要研究员和工程师不断推动的工作，就可能有越来越多的环节交给 AI 完成。</span></p>

<p id="f-doxcnPwurukbX7IS3d2FeWensk9"><span>这也是 RSI 让人兴奋、又让人不安的地方。过去，我们更多是在问“AI 能替人完成多少工作”；现在，问题变成了“如果连研发更强 AI 的工作，也越来越多地由 AI 承担，会发生什么？”一旦改进能力本身能够持续提升，影响就可能不只是开发效率的提高：程序员的工作方式、软件团队的分工，乃至部分岗位的需求，都可能发生深刻变化。但从这些趋势直接推导出“软件开发岗位会消失”或“人类将被替代”，还缺少足够的依据。</span></p>

<p id="f-doxcnJW5K9bP4ryRKGuLPnltO46"><span>相关研究不断推进，加上这件事潜在的巨大影响和一些巨头公司，自媒体的点火，RSI 的热度也就不难理解了。</span></p>

<p id="f-doxcnbORTnOQNRh01qh2MmVQv8d"><span style="font-weight:bold">本文会讲清楚哪些问题？</span></p>

<ol start="1"><li id="f-doxcn8etYM7S4vyAKezZEGtaqXf"><span style="font-weight:bold">概念：什么才算 RSI？</span></li></ol>

<ol start="2"><li id="f-doxcnvBJQkbzwB81l7bPSGgvesd"><span style="font-weight:bold">形态：从局部优化到持续自我改进，中间还有哪些层次？</span><span> 我们刚才谈到的模型，应用自己持续改进自己，不用人参与是理想的终极形态，但是从简单的RSI到终极形态，中间有哪些层次？</span></li></ol>

<ol start="3"><li id="f-doxcnz0T4i5c67ukPefc4A4izFk"><span style="font-weight:bold">进展：RSI 到底走到哪一步了？</span><span> 沿着应用开发和模型训练两条线，看看哪些环节已经形成闭环，哪些关键步骤仍然依赖人类。</span></li></ol>

<ol start="4"><li id="f-doxcnTGdEsILK9iMqd4MAJM87GW"><span style="font-weight:bold">实践：对大模型应用开发有什么启发？</span><span> 哪些思路值得借鉴到自己的 Agent 项目中，让自己项目更新颖？</span></li></ol>

<p id="f-doxcnjWk6fZZpOGvhvHuwQsYixl"><span style="font-weight:bold">💡 学习本篇内容，如何帮助你的面试？</span></p>

<blockquote id="f-doxcncYhwmLI8MNNJlICXienhMd"><span style="font-weight:bold">跟上行业热点，为项目找灵感，也为面试积累谈资。</span></blockquote>

<p id="f-doxcnnZuBYDC1jpsOtfnSUUrE9c"><span style="font-weight:bold">① 聊热点，更有话可说</span></p>

<p id="f-doxcnt1EcNoB0IieZZx0I2S5qib"><span>RSI 是近期的热门话题。读完本文，当面试官聊起它时，你也能接得上话，而不只是听过这个名词。</span></p>

<p id="f-doxcneQ0tcNzVyGZQoNzix4u4fg"><span style="font-weight:bold">② 做项目，多一些灵感</span></p>

<p id="f-doxcnuJnOO0GRDI2SpBYtSHXR2d"><span>如果你正在构思自己的 Agent 项目，本文也能提供一些新思路，让项目设计更有特色，在面试中多一个亮点。</span></p>

<p id="f-doxcn2Ecmjyy6mbmBzPLCplR6Th"><span style="font-weight:bold">③ 答开放题，多一些思路</span></p>

<p id="f-doxcnxOTdo9D5hdAgO0naVQ16cb"><span>面对“现在如果让你做一个 Agent，你准备怎么做？（字节2026/10月秋招真题）”“你如何看待 Agent 的发展趋势？”这类开放性问题，本文可以为你积累回答素材，拓宽思考角度。</span></p>

<a id="f-doxcnvyMEvRuQt6GRVnEKYpoQgh"></a>

##### 什么是 RSI

<p id="f-doxcnNMCGbBzMdqD8dLcU0PRcNd"><span>RSI的英文名字是Recursive Self-Improvement，从英文名也可以看出有两个关键特性：Recursive（递归） Self-Improvement(自我改进)，理解了这两个词就理解了RSI。</span></p>

<p id="f-doxcneS2WAH1UqbdaSbybr437Tb"><span style="font-weight:bold">1. 自我改进：改的不是某个答案，而是系统自身</span></p>

<p id="f-doxcnjlUfYICXGM2UqPXVrE83Ac"><span>平时我们让 AI 修改一篇文章、修复一个网站，它是在帮我们改进工作成果。自我改进关注的则是：</span><span style="font-weight:bold">AI 能不能参与改进自己以后做事所依赖的能力和机制？</span></p>

<p id="f-doxcnh02QJ0kOxJEWFnPoTJUUVd"><span>比如说一次应用任务，Agent记录了处理问题的方式，发现不对，修改了提示词，下一次用新的提示词来完成。模型训练的时候，模型发现效果不改，改变了自己的训练参数，让下一次训练有更好的效果。这些都不是在改进任务本身，而是改进处理任务的方式，这样的改进就是大模型里面的RSI的自我改进的意义所指。</span></p>

<p id="f-doxcn0Yu13kP4cSVYrwwZs7Rv0g"><span style="font-weight:bold">2. 递归：改进后的系统，再参与下一轮改进</span></p>

<p id="f-doxcnr4vWq31aNKgo6LFrfxN4Uf"><span>只有一次改进，还不足以说明“递归”。RSI 更重要的一步，是让改进的结果重新进入改进过程：</span></p>

<blockquote id="f-doxcn0CkCsxEZ0wO2nSpIWBa7hg"><span style="font-weight:bold">当前系统 A₀ → 参与改进，产生 A₁ → A₁ 再参与改进，产生 A₂ → ……</span></blockquote>

<p id="f-doxcnR3oxzFvLjotFMwoy3ZMX1g"><span>拿编程 Agent 来说，它先改进自己的代码编辑工具，得到一个新版本；新版本再利用改进后的工具，继续修改自身的其他功能。它不只是“被改好了”，还重新成为下一轮改进的参与者。</span></p>

<p id="f-doxcnCvVwmefCJOc3oYQwtikrEY"><span>如果新版本不仅更会完成任务，也更擅长推动下一次改进，就进一步触及了 RSI 最受关注的可能性：</span><span style="font-weight:bold">改进能力本身也在提升。</span><span> 不过，能连续迭代，并不意味着每一轮都会变好，更不意味着改进速度必然越来越快。这也是后面区分不同发展形态时，需要特别留意的边界。</span></p>

<a id="f-doxcn7mf9lSxQINNFz5y4j0Mj2f"></a>

##### 四层能力

<p id="f-doxcnODdIOMbMJVoE4o2lD2CHFb"><span>提到 RSI，很容易直接想到“AI 完全不靠人，自己造出更强的 AI”。但在走到这种状态之前，系统已经可以接手一部分改进工作：先记住教训，再利用反馈更新，逐步把更多改进环节串起来。</span></p>

<p id="f-doxcnFL420qnSAzmlMRMopTPprh"><span>为了方便理解，本文参考 </span><span><span><a href="https://mp.weixin.qq.com/s/rlfTKyWhALsNONhAwGih1A"><span>《这是一篇把“RSI”讲明白的科普级综述！》</span></a></span></span><span> 中关于 RSI 演进过程的讨论，按 </span><span style="font-weight:bold">AI 接手改进工作的深度与自主程度</span><span>，重新整理成下面四层。需要说明的是，这不是学界统一的等级认证，而是本文作者根据相关讨论和行业发展现状整理出的讲解框架。下面分别用模型训练和应用开发举例，辅助说明这四个层次。</span></p>

<p id="f-doxcnxEhYoncuRWTQygipbwFE4e"><span style="font-weight:bold">第一层：记住经验——下次别再犯同样的错</span></p>

<p id="f-doxcnw44zJ8nH78Jzq87sQuE2Sg"><span>最简单的一层，不急着改模型或代码，先让有价值的经验留下来，供以后使用。可以理解为：</span><span style="font-weight:bold">先给系统准备一本能翻阅的“错题本”。</span></p>

<ul><li id="f-doxcnZTVm1EhNOivdOkLu9txVUf"><span style="font-weight:bold">模型训练侧：</span><span> 模型分析自己答错的题，整理出“容易漏掉单位换算”“遇到多重条件时容易漏条件”等错误类型，保存为后续出题、筛选训练数据时的参考。这时只是积累了训练线索，还没有因此更新模型参数。</span></li></ul>

<ul><li id="f-doxcnzOQZxCa7TRDFk8r0k7YgRe"><span style="font-weight:bold">应用开发侧：</span><span> 一个数据分析 Agent 因为没有检查空值而执行失败。它把“统计前先检查缺失值”保存为经验，下次遇到类似任务时检索出来，加入上下文，而不是每次都从头试错。包括像自己沉淀SKILL，长期记忆的写入，这些内容其实就是已经蕴藏着RSI的思想了。</span></li></ul>

<blockquote id="f-doxcnhsZTv8XvHJ80CcSRDp6OEf"><span>💡也就是说这一层的RSI是外化的，比如说Agent的长期记忆，如果文件丢了，那么改进就丢了。</span></blockquote>

<p id="f-doxcnOc0R4XyaTfnmafGJe4ptlh"><span style="font-weight:bold">第二层：利用反馈更新——不只记下来，还改变以后怎么做</span></p>

<p id="f-doxcnikuBikuDUBeeohqaXXT8qe"><span>再往前一步，系统开始利用反馈，更新模型参数、提示词或固定的执行策略，而不是仅在上下文里多放一条提醒。</span></p>

<ul><li id="f-doxcnTxlYcD6DrNoUfJ4GH5f7tb"><span style="font-weight:bold">模型训练侧：</span><span> 模型生成一批解题过程，按既定标准筛选出可靠样本，再由训练程序用这些样本微调模型。更新后的模型可以继续生成下一批样本。经验不再只存在“错题本”里，而是通过训练影响模型参数。</span></li></ul>

<ul><li id="f-doxcnB77OhAQtnWAPCbaDvoenzg"><span style="font-weight:bold">应用开发侧：</span><span> Agent 根据失败记录生成几个新版提示词，在固定测试集上比较效果，再把通过评估的版本写入产品的提示词配置或 Agent 驾具，作为后续任务的默认版本。也就是说，变化会持久地进入应用系统，而不是只存在于当前对话的临时上下文中；但它改的是应用层的配置，不是底层模型参数。</span></li></ul>

<blockquote id="f-doxcnBK7BwQXKUNyUU88ac5KyNe"><span>💡这一层的RSI是内化的，比如应用开发侧，发现了更好的提示词，我直接改变了这个应用的代码，下次编译出来的产品，本身就携带着这个优化后的提示词，自我改进内化到了产品本身。</span></blockquote>

<p id="f-doxcnH4jHANyOQ9PZl6QZ0trN9d"><span style="font-weight:bold">第三层：自主组织闭环——开始决定“改什么、怎么改、是否采用”</span></p>

<p id="f-doxcnepBaQgRbBrlh4vA4jx7pKe"><span>它与第二层的真正区别，是系统接手了更上游的组织工作：在限定范围内，自己发现问题、选择改进对象、提出实验方案、安排测试，并根据结果决定保留、回滚还是继续探索。也就是说，第二层主要是在既定的优化流程中更新；第三层开始改进或重组这套流程本身。</span></p>

<blockquote id="f-doxcnsCMbYsvJvernzIhkbnFBTg"><span style="font-weight:bold">第二层：人已经设计好“怎么优化”，AI 在流程中找一个更好的版本。</span></blockquote>

<blockquote id="f-doxcn2Nm0dFCO07sLo8RIoT5kwe"><span style="font-weight:bold">第三层：AI 开始参与决定“优化什么、怎么设计实验、下一轮往哪里走”。</span></blockquote>

<ul><li id="f-doxcnRWxatR97JezhPyygegMuKg"><span style="font-weight:bold">模型训练侧：</span><span> 系统发现模型在多条件推理上表现较差，自主提出调整训练数据配比或安排针对性练习，运行小规模训练实验，再用未参与训练的评测数据检查效果；通过验收的模型进入下一轮，并继续参与出题或实验方案生成。模型并不是直接“手改权重”，而是通过训练程序完成参数更新。</span></li></ul>

<ul><li id="f-doxcn8REA1e2omqjxvqc28V05Jk"><span style="font-weight:bold">应用开发侧：</span><span> 编程 Agent 发现自己的代码编辑工具经常误改文件，于是修改工具实现、运行回归测试，保留有效的新版本；后续再由采用新工具的 Agent 继续改进自身。前言中的 DGM，就展示了这类修改自身代码、评估并继续迭代的链路。</span></li></ul>

<blockquote id="f-doxcnjmozyIO8RpCh47OrWzW4mh"><span>💡第三层相比第二层，第二层是AI在人规定的框架中持续迭代，第三层是AI已经可以开始跳脱于人的框架，修改框架本身了。</span></blockquote>

<p id="f-doxcnx3qoiDjaVGPEGkYz6iCWRf"><span style="font-weight:bold">第四层：提升改进能力——不只更会做事，也更会改进自己</span></p>

<p id="f-doxcnLVaThCmtUh3hAhZy5FQ4Jc"><span>前面几层即使已经连续产出更好的版本，也还需要回答一个问题：</span><span style="font-weight:bold">新版本是否比旧版本更擅长推动下一次改进？</span></p>

<p id="f-doxcns8rBIvk7e0X0TSKRdlv7od"><span>这是递归增益的关键。下面两个例子描述的是需要验证的目标，而不是已经普遍实现的能力：</span></p>

<ul><li id="f-doxcn2lIKXGrrcUJALlRsiRiqDg"><span style="font-weight:bold">模型训练侧：</span><span> 新模型不只是答题分数更高，还能改进“如何改进模型”的流程：更准确地判断当前模型的主要瓶颈，选择更值得尝试的训练方案，设计对比实验，并根据结果决定下一轮应该继续哪个方向。</span></li></ul>

<ul><li id="f-doxcnOPq57tklAP9AITpDIoIx3X"><span style="font-weight:bold">应用开发侧：</span><span> 新版 Agent 不只是更会完成业务任务，也能改进自己的“自我迭代流程”：更有效地发现自身缺陷，生成有区分度的修改方案，设计回归测试，识别评估结果是否可信，并决定哪些版本值得保留、哪些版本应该回滚。这里优化的是 Agent 如何发现问题、提出改动和筛选版本，而不只是某一次任务的执行效果。</span></li></ul>

<p id="f-doxcnS0N3L9858Z53sNwiNnJYPd"><span style="font-weight:bold">用一张表记住这四层</span></p>

<div id="f-doxcn9bs1bAGO7UnB73stfy476d"><img alt="" decoding="async" height="853" loading="lazy" src="/images/agent-learning/2749bda83aaa21239b8758fd.png" width="1280"/></div>

<p id="f-doxcnOfo3YsLjQTQlqJk8hEDcWh"><span style="font-style:italic">图 2｜先用图把握四层的核心区别，再用下表对照模型侧与应用侧的例子。这是本文的讲解框架，非学界统一分级；AI 生成示意图。</span></p>

<div id="f-doxcnb13MdoGjCWLB12ffkb3Fme"><table><colgroup><col width="100"/><col width="198"/><col width="241"/><col width="513"/></colgroup><tbody><tr><td colspan="1" rowspan="1"><p><span>层次</span></p></td><td colspan="1" rowspan="1"><p><span>核心变化</span></p></td><td colspan="1" rowspan="1"><p><span>模型训练侧的例子</span></p></td><td colspan="1" rowspan="1"><p><span>应用开发侧的例子</span></p></td></tr><tr><td colspan="1" rowspan="1"><p><span style="font-weight:bold">① 记住经验</span></p></td><td colspan="1" rowspan="1"><p><span>留下以后能用的教训</span></p></td><td colspan="1" rowspan="1"><p><span>保存错误分析，供后续准备训练材料</span></p></td><td colspan="1" rowspan="1"><p><span>保存失败复盘，下次检索使用</span></p></td></tr><tr><td colspan="1" rowspan="1"><p><span style="font-weight:bold">② 利用反馈更新</span></p></td><td colspan="1" rowspan="1"><p><span>在既定机制中改变系统</span></p></td><td colspan="1" rowspan="1"><p><span>按预设标准筛选数据并训练模型</span></p></td><td colspan="1" rowspan="1"><p><span>按固定测试流程更新默认提示词</span></p></td></tr><tr><td colspan="1" rowspan="1"><p><span style="font-weight:bold">③ 自主组织闭环</span></p></td><td colspan="1" rowspan="1"><p><span>开始决定改进对象和迭代流程</span></p></td><td colspan="1" rowspan="1"><p><span>自主提出训练方案、运行实验并接纳新模型</span></p></td><td colspan="1" rowspan="1"><p><span>自主选择修改工具或流程，测试后继续迭代</span></p></td></tr><tr><td colspan="1" rowspan="1"><p><span style="font-weight:bold">④ 提升改进能力</span></p></td><td colspan="1" rowspan="1"><p><span>新版本更擅长改进“改进流程”</span></p></td><td colspan="1" rowspan="1"><p><span>更有效地搜索和决策模型研发方案</span></p></td><td colspan="1" rowspan="1"><p><span>更有效地发现缺陷、设计实验和筛选自身版本</span></p></td></tr></tbody></table></div>

<blockquote id="f-doxcnEDwtXAS5Cv8P6XzEtV1g1e"><span style="font-weight:bold">一句话串起来：记得住教训 → 能利用教训改变自己 → 能组织自己的改进过程 → 连改进自己的本领也在提升。</span></blockquote>

<p id="f-doxcnZHSIi0EcwD8SAUtIncp3rh"><span style="font-weight:bold">本部分参考资料</span></p>

<ul><li id="f-doxcnbfvnwOKzi6HyH02fbbsWFe"><span><span><a href="https://mp.weixin.qq.com/s/rlfTKyWhALsNONhAwGih1A"><span>《这是一篇把“RSI”讲明白的科普级综述！》</span></a></span></span></li></ul>

<a id="f-doxcnm3ro1JQE0U8sdMYxNqD6rb"></a>

##### 行业进展

<p id="f-doxcnbuBCsrsJ5GZ2xBo899nggc"><span>前面四层是一张判断地图。把它放回现实产品中，整体结论可以先说在前面：</span></p>

<blockquote id="f-doxcnnewtllG4Plg7MYoPZXlm1c"><span style="font-weight:bold">不管是模型训练还是应用开发，行业能力目前主要集中在第二层，并在部分受控场景中出现第三层的局部闭环；第四层“改进能力本身持续增强”，仍主要停留在研究原型的探索阶段。</span></blockquote>

<div id="f-doxcnZtzhauUj4h2XOeXTMwHZLg"><img alt="" decoding="async" height="853" loading="lazy" src="/images/agent-learning/c605c03781acbb11b39a7933.png" width="1280"/></div>

<p id="f-doxcn5HuMbdRYkPXWwmB1uq8vee"><span style="font-style:italic">图 3｜把本文判断放回四层地图：常见能力、受控局部探索和尚待验证的递归增益。AI 生成示意图，仅整理本文论述，不是统一评级或实验测量，也不表示每个产品均具备相应能力。</span></p>

<p id="f-doxcn0x7NyquoLzI7Kf7lKdK7f1"><span>这里的层级判断，不看模型名称是否更新，也不看 Agent 是否能连续工作，而看公开资料是否证明系统接手了相应的改进职责：</span></p>

<ul><li id="f-doxcnL9EsdroMJLWAq5RfPenuS7"><span style="font-weight:bold">第二层</span><span>：反馈能够进入参数、提示词、记忆、工具或工作流，形成持久变化；</span></li></ul>

<ul><li id="f-doxcnPoRKtsDmtPmc4EvxkkCN8c"><span style="font-weight:bold">第三层</span><span>：系统能够在限定范围内发现问题、选择改进对象、设计并执行实验，再决定保留或回滚；</span></li></ul>

<ul><li id="f-doxcnJM1xmF8fbJdOeJzXcZVrue"><span style="font-weight:bold">第四层</span><span>：改进后的系统还要变得更擅长组织下一轮改进。</span></li></ul>

<p id="f-doxcnKxviZUVWYnltuZnGf8c4Qh"><span style="font-weight:bold">1. 模型训练：第二层证据明确，第三层正在进入研发流程</span></p>

<p id="f-doxcn6w1fv70WrHxykVIY5HvFXy"><span>模型侧最典型的事实有三类。</span></p>

<p id="f-doxcnBml7OiIdogIx0NXFQtQHJd"><span>第一，</span><span style="font-weight:bold">反馈已经能够写入模型参数</span><span>。以 </span><span><span><a href="https://arxiv.org/abs/2501.12948"><span>DeepSeek-R1</span></a></span></span><span> 为例，模型生成数学、代码和推理答案，程序或规则验证结果，再将奖励用于强化学习更新模型。这个“生成结果—自动验证—奖励反馈—参数更新”的闭环，直接对应第二层：模型不只是记录一次回答，而是把反馈写进下一版模型。</span></p>

<p id="f-doxcnyYgkOxgtbhIZh4dqT4Y94c"><span>第二，</span><span style="font-weight:bold">模型开始参与模型研发工作</span><span>。GPT 系列、Claude 以及相关 Codex 类系统已经能够承担更长的代码、实验执行和研究工程任务。Anthropic 关于 AI 参与自身研发的公开讨论，以及 OpenAI 关于研究加速的报告，都说明模型已经从“被训练的模型”进入“参与训练和研发的执行者”阶段。</span></p>

<p id="f-doxcnXNgoBH4V2gss9aiWIe4bVg"><span>这些事实说明，AI 在既定目标、评估标准和资源边界内，能够生成候选方案、运行实验并依据结果推进工作，因此在部分受控任务上出现第三层的局部能力。</span></p>

<p id="f-doxcnRMol5ZNuzOHakZfxCxh9qc"><span>但这里仍有明确边界：公开资料尚未证明 GPT、Claude 或 DeepSeek 能够稳定自主决定研究目标，改写整套模型研发流程，并让改进后的后继模型继续优化这套流程。模型性能变强，或者 AI 写了更多研发代码，都不能单独证明第四层。</span></p>

<p id="f-doxcnN4PXCbzY3qy33SLsJOamUc"><span style="font-weight:bold">2. 应用开发：第二层已经产品化，第三层表现为局部的驾具闭环</span></p>

<p id="f-doxcnWZcMV87IvdIq90ydu2JHBf"><span>应用侧的代表性产品包括 Claude Code、Codex、DeepSeek Harness 和 Cue。它们公开展示的共同能力是：保存项目规则和任务经验，调用工具，修改代码或配置，运行测试，维护较长任务状态，并通过 Skills、Hooks、插件、工作流或多 Agent 协作扩展系统能力。</span></p>

<p id="f-doxcnFCwYFSoowLMPSeFhthlARc"><span>这些能力分别对应：</span></p>

<ul><li id="f-doxcn3KjrVXqalW9NA2DIyTtdPh"><span style="font-weight:bold">第一层</span><span>：记忆、项目文件、任务状态和工作空间让经验可以跨任务保存；</span></li></ul>

<ul><li id="f-doxcnI0w4xYMVLMZOSnNU0X1vde"><span style="font-weight:bold">第二层</span><span>：经过验证的提示词、Skill、Hook、插件和工作流可以固化到应用系统中，成为后续任务的默认配置；</span></li></ul>

<ul><li id="f-doxcnw8GkJwUdiX8zNknQj3zDGb"><span style="font-weight:bold">第三层的局部形态</span><span>：在限定的编程或自动化任务中，Agent 可以执行“发现问题—修改工具或流程—运行测试—保留结果”的闭环。</span></li></ul>

<p id="f-doxcnWphW0OhxiSbE5OAx5sj09e"><span>但这些产品的公开能力主要证明的是“Agent 能更稳定、更长时间地完成任务”，并不等于“Agent 会自主改进自己”。例如，Claude Code 和 Codex 可以在项目中修改代码并运行测试，DeepSeek Harness 可以通过插件、记忆和工作流扩展能力，Cue 可以让具有独立身份和工作空间的个人 Agent 持续处理事务；这些都说明应用层的驾具越来越丰富，但尚未公开证明它们会自主重写自己的核心驾具，评估改动是否提升了“自我改进能力”，并据此进入下一轮。</span></p>

<p id="f-doxcngK6YyarjgCgWVWBaZvKTOt"><span style="font-weight:bold">3. 第四层：研究原型已有探索，产品还没有公开的稳定证据</span></p>

<p id="f-doxcnkU7pkG4Hz8VtKPm5uVxbWb"><span>目前更接近第四层的代表，是 </span><span><span><a href="https://sakana.ai/dgm/"><span>Darwin Gödel Machine（DGM）</span></a></span></span><span>。它不是普通产品，而是一个受控研究系统：Agent 可以修改自身代码，用编程基准评估新版本，再从已有版本继续产生后续分支。它改进的对象已经不只是某个用户任务，而是 Agent 自身的工具和工作方式。</span></p>

<p id="f-doxcnmT1cGvb1P78SD78Vsekqqe"><span>DGM 因此比通用产品更接近第四层，但仍不能直接宣布“第四层已经实现”。还需要在独立任务、固定资源、多个后继版本和循环外评估中证明：新版本不仅表现更好，而且确实更擅长发现、设计和验证下一次改进。</span></p>

<div id="f-doxcnjMn2P3uaHL8R44NM3dHuud"><img alt="" decoding="async" height="355" loading="lazy" src="/images/agent-learning/fe99150ab2938ea083e2a65e.png" width="1280"/></div>

<p id="f-doxcnfrCvKgZrzjaAtlnbZZ2tFe"><span style="font-style:italic">图 4｜DGM 的自修改与评测循环：从版本库中选择 Agent，修改自身代码，评测后将新版本加入版本库。来源：Darwin Gödel Machine 论文 Figure 1，原图沿用目录内已保存素材，非 AI 生成；该图不单独证明第四层已经实现。</span></p>

<p id="f-doxcnjfZx8WzV3GkQZLNFXLHrTe"><span style="font-weight:bold">4. 当前瓶颈</span></p>

<p id="f-doxcnbCY2Aq5BNT9MtfmrcDXifc"><span>行业还没有进入开放式 RSI，主要受以下问题限制：</span></p>

<ol start="1"><li id="f-doxcnUeOcMAvJj4or2pTBLhCCGg"><span style="font-weight:bold">研究目标仍由人设定</span><span>：系统能执行“把模型训得更好”，但还不能稳定决定“下一步应该研究什么”。</span></li></ol>

<ol start="2"><li id="f-doxcnZ8Yp1neV3Y8dpSpQvUeUkg"><span style="font-weight:bold">评估器可能被利用</span><span>：同一系统同时生成答案、奖励和版本选择，容易把指标做高，却没有真正变强。</span></li></ol>

<ol start="3"><li id="f-doxcnrNzKJDYXlpRWL69QLGeiQe"><span style="font-weight:bold">实验成本仍然很高</span><span>：模型训练、长时间 Agent 运行和真实环境验证都需要大量算力、时间和权限。</span></li></ol>

<ol start="4"><li id="f-doxcnWZdZpQe12eHFwaGx6eq7Ig"><span style="font-weight:bold">泛化能力不足</span><span>：固定测试集上的提升，不代表对未见任务有效，更不代表改进能力本身提升。</span></li></ol>

<ol start="5"><li id="f-doxcntNUEeYDW8fR0M4SGgW3Pde"><span style="font-weight:bold">复杂度和安全风险会累积</span><span>：自我修改可能带来行为漂移、权限扩大、死代码、评估污染和难以回滚的问题。</span></li></ol>

<p id="f-doxcn1FKslQaC35kd9YwLO2OjWb"><span>因此，目前最稳妥的判断是：</span></p>

<blockquote id="f-doxcnZtV4C87KPM11EeB7pB0PGd"><span style="font-weight:bold">第二层已经成为模型和应用产品的常见能力；第三层正在以受控、局部的形式进入工程实践；第四层还主要是研究问题。行业已经出现有界的自我改进闭环，但尚未证明改进后的系统能够稳定地、开放式地改进“改进本身”。</span></blockquote>

<a id="f-doxcnPjzGjemuvkswUiVhpse2Ih"></a>

##### 项目启发

<p id="f-doxcnX1FiqjApyct0j1ZHaW0pZe">结合现有 Agent 产品，思考如何引入 RSI 相关功能。</p>

<p id="f-doxcnBmz39WgqfCP4R1tCvsDP2d"><span style="font-weight:bold">1. 自我沉淀：把做对的任务变成下次能调用的 Skill</span></p>

<p id="f-doxcnObf0XNBgdpYDx7SQRHTYtf"><span>Agent 完成一类有复用价值的任务后，可以把操作步骤、适用条件、输入输出和注意事项整理成 Skill；经过测试和审查后加入技能库，下一次遇到类似任务时按需调用。重点不是“自动写了一份文档”，而是这份经验能否稳定改善后续任务。</span></p>

<p id="f-doxcnRwVzjVSoeb9LmgblnhoNHc"><span style="font-weight:bold">2. 自动探索提示词：不是觉得写得更好，而是测出来更好</span></p>

<p id="f-doxcnm2pUdXTdyJwVI4JdiBMPce"><span>Agent 可以根据执行结果和失败原因生成多个提示词候选，再在验证集上比较效果。例如，信息抽取 Agent 反复把“未披露”填成“0”，就可以提出“缺失信息必须保留为空，并附上原文证据”的候选指令。但新提示词必须经过跨样本评估，不能因为修好一个例子就直接发布。</span></p>

<p id="f-doxcngbyRsi7HS1mTqX7Wvq9m7b"><span style="font-weight:bold">3. 长期记忆：让用户纠正真正影响下一次任务</span></p>

<p id="f-doxcn4IdorbLmwsUrdwv7Vph0nf"><span>长期记忆属于第一层能力，但它是实用的起点。应区分用户偏好、项目规则、任务事实和失败经验，记录来源、时间和适用范围，并允许用户查看、修改和删除。记忆不是越多越好，错误或过时的记忆会反过来污染后续任务。</span></p>

<p id="f-doxcnwDr6yRSNDt7xSQPhTgWRnh"><span style="font-weight:bold">4. 工具和驾具的可修改性：让 Agent 有机会改进自己的工作方式</span></p>

<p id="f-doxcnzPdiyTZhIl5KU7XDU1nYug"><span>如果工具、提示词和工作流全部硬编码在系统内部，Agent 很难参与改进。可以把这些部分模块化，让 Agent 在权限边界内提出配置或代码变更，再通过静态检查、回归测试和人工审批决定是否启用。</span></p>

<p id="f-doxcn2pf0Hu4OxJPrhxmQZ2S1Xf"><span style="font-weight:bold">5. 失败驱动的局部优化：先优化一个窄环节</span></p>

<p id="f-doxcnhZmRwSRxIUeOJvL3SQuqgd"><span>不要一开始就追求“Agent 自己重写自己”。更稳妥的做法是选择一个可度量的局部问题，例如工具调用失败率、结构化输出通过率或代码测试通过率，建立“收集失败样本—提出候选改动—离线比较—小范围发布”的闭环。</span></p>

<p id="f-doxcn3ly2QJr0NeSvZfcvobvMHb"><span style="font-weight:bold">6. 经验库要会做减法</span></p>

<p id="f-doxcnQOAus6DkMgHsqoEczvMIme"><span>长期运行后，技能、规则和记忆会重复、过时甚至互相冲突。可以定期合并重复内容，标记失效规则，把长说明拆成按需检索的参考资料；删除或替换前保留版本，并检查相关任务是否退化。自我改进不应等于无限堆积历史。</span></p>

<p id="f-doxcncIV6xnp0p1UW9fRtsNTxkB"><span style="font-weight:bold">7. 持续执行与主动复盘：不用每次都等用户提醒</span></p>

<p id="f-doxcnuhRKPaDZ44HZNmkC9Pdlee"><span>定时运行日报只是自动化；定时分析失败、提出改动、验证后更新系统，才是在自动化之上建立自我改进流程。可以安排 Agent 周期性整理失败样本，生成改进提案，但最终采用仍应经过明确的评估门槛。</span></p>

<p id="f-doxcnDUyvtjioAhQNXbH5RQZJ1e"><span style="font-weight:bold">8. 多 Agent 分工：把执行、复盘和验收适当拆开</span></p>

<p id="f-doxcn6MBzYyYbGSl15drbBtz0be"><span>可以让执行 Agent 处理业务，复盘 Agent 整理问题，优化 Agent 提出候选方案，而独立的程序或规则负责验收。换一个 Agent 当裁判，不等于裁判就可靠；评估器应尽量不允许候选版本随意修改，并保留人工抽检和回滚机制。</span></p>

<p id="f-doxcnIU7LvCNp4Z5hlXtQZxtKsb"><span style="font-weight:bold">9. 验证与版本选择：让改进真正进入下一轮</span></p>

<p id="f-doxcnDEpg1LdP3SL4GcEWOPKKrb"><span>完整闭环应当是：发现问题，提出改动，评估候选版本，保留有效结果，再由采用了改动的新版本处理后续任务。对同一批评估任务比较旧版与候选版，记录成功率、成本、耗时和安全违规情况；通过门槛后再小范围启用，退化则恢复旧版。用于优化的样本和最终验收样本应当分开。</span></p>

<div id="f-doxcnkP4lfiweTf7StefSyUgDDg"><img alt="" decoding="async" height="944" loading="lazy" src="/images/agent-learning/a15c95a6dd2220f1befa5732.png" width="1280"/></div>

<p id="f-doxcnmyJQcSMco9WItdhTNzKxif"><span style="font-style:italic">图 5｜可以借鉴到 Agent 项目中的有界改进闭环。沿用已有原创示意图：先验证改动是否有效，再决定采用或回滚；能够持续迭代，不等于已经证明递归增益。</span></p>

<a id="f-doxcnbtxAH8JAEjqw8By4v4rpub"></a>

##### 面试问答

<p id="f-doxcnBcrC0gGvSUXWmTq4pXwoPb"><span style="font-weight:bold">❓ 1. 你知道什么是RSI吗？聊聊你的看法？</span></p>

<p id="f-doxcn8gi4uThfLxe1gsvqKeb0ec"><span style="font-weight:bold">💡 答题思路：</span><span>先介绍概念，再从</span><span style="font-weight:bold">模型和应用侧</span><span>举例举例这个概念-再讲一下</span><span style="font-weight:bold">四层能力</span><span>-最后结合现有产品讲行业现状-最后展望未来。</span></p>

<p id="f-doxcnhVNlZKrca5ZOQCJpuPMakd"><span style="font-weight:bold">🎤 参考答案：</span></p>

<p id="f-doxcnA4YbrFwhsRoLLohFu7PTmd"><span>我理解的 RSI，就是</span><span style="font-weight:bold">递归自我改进</span><span>：AI 利用现有能力改进自身，再由改进后的系统参与下一轮改进。</span></p>

<p id="f-doxcnItwDikXeDvKkuHn7k6mxye"><span>在大模型方向，它主要体现在模型训练和 Agent 运行系统的迭代上。模型侧可以利用反馈改进训练数据和方案，通过训练更新参数；应用侧则可以优化提示词、工具或工作流，不一定需要重新训练模型。</span></p>

<p id="f-doxcnpk9FNsYw1QLMJrVomZZJad"><span>为了方便理解，可以把它分成四种程度：首先是记住经验，下次能够复用；其次是根据反馈更新系统，改变以后的默认做法；再进一步，是自主发现瓶颈、设计实验、筛选版本，组织自己的改进过程；更进一步，是改进能力本身也提升，越来越会发现问题和验证方案。</span></p>

<p id="f-doxcnicAp3WOw3pUpOifzJVMAkd"><span>成熟产品目前更多体现前</span><span style="font-weight:bold">两种能力</span><span>。比如</span><span style="font-weight:bold"> Claude Code 的自动记忆、Codex 的技能复用</span><span>，体现经验积累；模型侧，DeepSeek-R1 利用强化学习，根据答案的验证反馈更新参数，体现反馈驱动的能力提升。但是对于改变组织自己的方式，提升自己改进系统的能力，这些特性，目前还体现在研究层面。例如 DGM 让 Agent 修改自身代码、评估新版本，再继续迭代，展示了受控环境中的自主改进，但是目前投入生产使用的Agent并没有体现出相关特质。</span></p>

<p id="f-doxcnMuUQpLDSZY1FQLuIvdhY9b"><span>可以认为这些的主要瓶颈是评估是否可靠、提升能否泛化，以及实验成本和自我修改风险。这也是未来模型侧和 Agent 侧需要继续突破的方向。</span></p>

<p id="f-doxcn1bm2XnBQtxhEpqpgWkBH9e"><span style="font-weight:bold">❓ 2. 你认为Agent发展的新的形态，或者说未来的趋势是什么？</span></p>

<p id="f-doxcnM2LXbg49ALISSo92e3avNf"><span style="font-weight:bold">💡 答题思路：</span><span> 开放性问题，我们可以使用本节里讲的2026年Agent新特性，结合最近发布的Agent来谈近期趋势，然后结合RSI的特性来回答长远的趋势。二者结合，组成这个答案。</span></p>

<p id="f-doxcnAi2SjzS8j8mI2bQQdu31ig"><span>📎 参考：</span><span><span><a href="#f-doxcnz5i34oVytz2qpXkOWt8vpf"><span>笔记「1.2 2026年 Agent 新形态」</span></a></span></span><span>，其中</span><span><span><a href="#f-doxcnY36xFNAit1GvW3GOn1J9Zd"><span>「1.2.1 四款代表产品」</span></a></span></span><span>介绍了 dots、Cue、Muse 和 Grok Bot。</span></p>

<p id="f-doxcn0TGie9egNFfLXCBE4YLh1g"><span style="font-weight:bold">🎤 参考答案：</span></p>

<p id="f-doxcnWCkyCYZQN6eJR9s88xx56g"><span>我会分</span><span style="font-weight:bold">近期产品形态和长期能力</span><span>演进两个层面来看。</span></p>

<p id="f-doxcnmOcfIgNcp2ZIKWukEJRm7b"><span>近期，从最近26年发布的Agent, dots ,Cue等等，他们一些共同特点比如</span><span style="font-weight:bold"> 添加持续的云端环境</span><span>，用户关闭电脑后，已委托的任务仍能继续推进；</span><span style="font-weight:bold">主动跟进</span><span>，不再每一步都等用户催，而是按时间、事件启动，或根据上下文提出下一步，比如 Grok Bot 把销售拓展设置成每周例行工作；</span><span style="font-weight:bold">跨任务记忆</span><span>，记住多个项目的进度和用户偏好，减少重复交代。</span><span style="font-weight:bold">开箱即用</span><span>，产品替用户承担更多部署和配置工作，比如 Cue 把邮件、电脑、自动化和记忆放进同一个助手配置界面。 让我看出近期Agent发展的</span><span style="font-weight:bold">形态趋势</span><span>： </span><span style="font-weight:bold">更加注重完成长时持续任务</span><span>，</span><span style="font-weight:bold">降低Agent的使用门槛</span><span>。</span></p>

<p id="f-doxcnazxLEAPzazrbZvp7QwwOJh"><span>长期演进来看，可以认为Agent发展会 Agent </span><span style="font-weight:bold">从执行任务，走向自主改进自身的工作方式，实现RSI的特性</span><span>。它不再只是按照人设定的流程优化，而是</span><span style="font-weight:bold">自己发现能力瓶颈，判断优先改哪里，提出方案、设计实验</span><span>，再根据结果决定保留还是回滚，并由新版本继续下一轮迭代。更进一步，</span><span style="font-weight:bold">它提升的不只是业务能力，还有改进自己的能力</span><span>：能更准确地定位问题，用更少的实验找到有效方案，在相同资源下推动更高效的下一轮改进。最终不用人的干预，也能不断地进化，衍生出更强的能力。</span></p>


<a id="section-0141"></a>
## 智能预约Agent项目

<a id="f-doxcn2UuVdw5tRU20F4G5ZRs1Kh"></a>

<p id="f-doxcn4AvuJBB5tPzqflTOsZJ8ch"><span>先和大家讲一下这个项目的背景。这个项目是我转行大模型，自己做的第一个项目。当时还是小白，一边学Agent的课程，资料，了解什么是大模型，什么是RAG，什么是Agent，然后也看了一些书籍。慢慢开始摸索着做的（大概在25年的5月份左右）。做完这个项目，结合公司的项目（因为公司有一些类似于Hackathon)的项目，做了另外一个项目。两个项目其实难度和实现上差不太多的，我现在看来有点重复，当时可以第一个项目做Agent，第二个项目做RAG, 做两个重复的Agent，收益比较低。</span></p>

<p id="f-doxcnXFEIVXnmcT8RJRTcg8Pf2c"><span>在这个章节除了介绍项目部分，其实还蕴含了一些我的思路，比如设计项目的思路，面试的经验，如何准备自己的项目等等。项目的README的部分，也写了一些关于项目的介绍，技术栈，架构之类的，大家可以看看。</span></p>

<p id="f-doxcnfaN9cKYGDEUfnLWU3vOMBf"><span>最后提一点，我不太清楚大家会怎么用这个项目，会不会有人拿去面试之类的。这个更新也其实不在更新计划中的（本来打算再专门做个Agent），只是很多人问想要参考，所以我放出来。我目前用了大概3天左右整理，如果后面像rag项目一样，有人拿去面试了，有了面试真题不知道怎么回答，可以再来反馈给我，我来解析在当前章节中。</span></p>


<a id="section-0142"></a>
## 项目介绍

<a id="f-doxcnjRCZbGjOG8gYyxjVNiuepe"></a>

<p id="f-doxcn8uwzzdl0dy5YvpYVdBzJhS">案例背景：人工前台需要通过电话处理客户信息、分配服务人员、管理排班和支付。固定表格预约根据空闲日期选择服务人员，但处理用户喜好、倾向、支付、咨询等需求时灵活性不足。可以使用 AI 处理这些预约需求。</p>

<p id="f-doxcnqkQ2zzd7iGf52Mh5IfNmQd"><span>简单介绍这个项目，就是一个智能的按摩房的预约Agent。当用户和他对话，它能够处理预约内容，咨询内容。还能够根据用户的预约历史记录，生成一些回访信息，比如他很久没来了，自动生成一条个性化问候，问他最近要不要按摩。具体功能展示可以看这个视频：</span></p>

<p id="f-doxcnamMRDBOMLOlKaauptS0yQf"><span><span><a href="https://www.bilibili.com/video/BV16FRbBEEwD/?spm_id_from=333.1387.homepage.video_card.click&amp;vd_source=144bec9c3f54e465073138bed788be1b"><span>https://www.bilibili.com/video/BV16FRbBEEwD/?spm_id_from=333.1387.homepage.video_card.click&amp;vd_source=144bec9c3f54e465073138bed788be1b</span></a></span></span></p>


<a id="section-0143"></a>
## 项目设计思路

<a id="f-doxcnnxjcMlREbFBCWviMtBh525"></a>

<p id="f-doxcn50MDG8eExFJ3U32Lh6j6rg"><span>先来讲述一下我当时的设计思路，我想设计的新特性。</span></p>

<p id="f-doxcnMMnHFUJOrLk6omU0DwnQfb"><span>      1： 首先项目是</span><span style="font-weight:bold">多Agent</span><span>，现在复杂的Agent肯定是多个Agent协作的。所以本案例设计的系统有4个Agent。前三个是分类机器人，预约机器人，咨询机器人。他们三个要协同工作。</span></p>

<p id="f-doxcnXze1NWuyLBrYhzczccUoyO"><span>分类机器人只管分类，如果是和按摩房无关的内容就拒绝回答，如果是咨询相关的内容，就把任务给咨询机器人。</span></p>

<p id="f-doxcnFYUWxjjtWHZts6XIs9xbNd"><span>预约机器人会问清楚用户的需求，进行多轮对话，收集到信息后，去进行数据库查询，找合适的技师。</span></p>

<div style="margin-left:25px"><p id="f-doxcn5DLin18r5MPe26g3oXtl1d"><span> 咨询机器人回答用户相关咨询问题，会从内部私有文档中找答案。</span></p><p id="f-doxcnUv0wRww3y8xcL7O8D1syye"><span> 第四个Agent是用户行为分析Agent，它会根据用户历史预约，分析他的喜好，来的频率，生成回访信息（这块只是大致跑通了）</span></p><div id="f-doxcn8bIjMHh34aeI4itlW9RFfh"><a href="/images/agent-learning/50a6227aa4c2a822f832258b.jpg" title="查看原始尺寸图片"><img alt="" decoding="async" height="17676" loading="lazy" src="/images/agent-learning/e5df7063c13aba11b7cadd5f.jpg" width="24951"/></a></div><p id="f-doxcnyJJmQWBPiQpQmrLQaKIvQc"><span>2. </span><span style="font-weight:bold">集成RAG</span><span>。 我当时有这个意识，我希望我的Agent项目有RAG的技术栈。所以这个预约机器人，当用户给出了喜好技师（比如喜欢力气大的），会从维护的技师专长表格中匹配。包括咨询机器人就更是RAG了，它内部有一个专有文档，这个文档记录着按摩房的信息，咨询机器人会从这个文档找知识作为回复。 我当时只是把这一套跑通了，没有用专业数据库，只是跑通了RAG的流程。</span></p></div>

<p id="f-doxcn0AcL0ABFT31beyjxaPJqih"><span>3. 用了MCP。 当时MCP 很火，所以我里面使用了MCP，在用户预约成功后，会调用天气的MCP SERVER，查询当地的天气，然后生成回复。比如：您预约了28号xx技师按摩，北京的天气是40度（调用天气mcp server)，请注意防晒。</span></p>

<p id="f-doxcn6dO8YEDjd4ZQVQzXf1a7la"><span>4. 反思功能。为什么设置用户行为分析Agent，是因为我有这个意识，想让我的Agent有反思功能，根据历史的输入输出来调整行为，生成个性化回复。</span></p>

<p id="f-doxcneYamnqOVaO05Q7RbtSr57c"><span>来分析一下我当时的设计的优缺点：</span></p>

<p id="f-doxcnSuBoxaQaL1e7yPfurY4O7w"><span style="font-weight:bold">优点</span><span>：做了多Agent，用了MCP（当时火的技术），有工具调用，有RAG的意识，也在尽力设计高级特性（自我反思）。现在的我当然觉得整个设计简单，我后面会讲如何设计得更复杂。但这个项目，不可否认，就是本案例设计，摸索的入门项目，不管会不会被面试官说简单，但毫无争议，他其实就是帮助我入门转行LLM，有去面试的项目。</span></p>

<p id="f-doxcnLMfiSH5tX6iTtmdJz48gCf"><span style="font-weight:bold">缺点：</span></p>

<p id="f-doxcncEL3GTlSg8K3CwCWC9WEIb"><span>1. </span><span style="font-weight:bold">立意可以更复杂：</span><span>大家在设计项目的时候，一个好的立意其实很重要。比如当时很火的Agent形态是Manus。从设计场景，按摩房预约。 形态：对话Agent。这个立意不能说高明。我之前笔记有提到Anthropic 公司举办的黑客松大赛，大家可以去看看他们前10名的立意，形式，来参考，选择更好的场景和立意。</span></p>

<p id="f-doxcn2Skwffej3Sb5tGoWOoxZ7d"><span>2. </span><span style="font-weight:bold">设计的简单性：</span><span>太多地方可以设计得更复杂，比如记忆模块，沉淀能力，RAG系统，工具调用等。这个后面再说。不过其实作为一个初学者，自学者，没人指点的情况下，可以认为设计成这样，也无可厚非。毕竟我当时的水平是要先理解啥是LLM的。不过我后面会教大家如何设计得更复杂。</span></p>

<p id="f-doxcnLrAnPBAYHz1JgkMCwvsKnb"><span>3. </span><span style="font-weight:bold">编程范式：</span><span>这也不能怪当时的我。当时连SKILL都没出。我当时编程的思路就是使用copilot，提一次需求，审核代码。不过当时大家不都这样吗？ 但是大家在设计项目时，强烈建议使用现在vibecoding的方法，harness技巧（这也是面试常考点）。把时间放在建设harness上，而不是放在让AI生成功能上。</span></p>


<a id="section-0144"></a>
## 项目包装

<a id="f-doxcnCj7BcLSaWWQOp9ZOpDEkdf"></a>

<p id="f-doxcnFkFrkhFWg9tEsdbh9eoYrd"><span>可包装的点也是你可以扩展的点。一般做任何项目，都建议大家去包装一下。可以认为这是一种技巧，面试不能完全实事求是，得吹。人人都在夸大了说，你不夸大说，哪有这么实诚的人？但是你说能不能不做项目？你是100分，包装一下成120分。你不可能不做那是0分啊，你只能包装到20分。而且包装的东西，其实讲起来虚，没真实做过，遇到很懂的面试官多少会露馅。下面说包装方向：</span></p>

<p id="f-doxcnVy5gU6PyLkXrZxQAsdVtyb"><span>1. </span><span><span style="font-weight:bold"><a href="#section-0148"><span>和RAG项目结合</span></a></span></span><span>。告诉面试官该项目用的自研RAG系统，接入我们这个笔记中的RAG项目。工作量，复杂度直接增加。</span></p>

<p id="f-doxcnxLBGJRTh8rC8SFcvoCmogW"><span><span style="font-weight:bold"><a href="/posts/agent-learning-18-training-inference/#f-doxcnH4LTSdRSP70XiVy6y1Mnp7"><span>可以包装一个算法项目</span></a></span></span><span>比如某个地方简单任务用了自己后训练过的模型，体现算法的能力（这块等我们后面算法项目出来了可以再想具体场景）</span></p>

<p id="f-doxcn17R34UB3bAfwnnLR0JV6Rh"><span>3. </span><span style="font-weight:bold">记忆系统的设计。</span><span>这个项目没有记忆系统。长短期记忆如何实现？上下文对话满了如何压缩？这些策略需要设计。再不济你就抄袭我们解析的开源项目（</span><span><span><a href="/posts/agent-learning-21-open-source-architectures/#f-doxcneK3qVfDjLnKOQFCdsbYDmf"><span>cc</span></a></span></span><span>,</span><span><span><a href="/posts/agent-learning-21-open-source-architectures/#f-doxcnc8YH0bvC3K6RFin6B4JnIh"><span>hermes</span></a></span></span><span>,</span><span><span><a href="/posts/agent-learning-21-open-source-architectures/#f-doxcnfdqX7Xmgd1YRp2zV5utl0e"><span>openclaw</span></a></span></span><span>)，把内容丢给ai, 让AI给你设计和写代码。但是你不能不设计！</span></p>

<p id="f-doxcnwwRiGRMZDI63dWv24JGBHe"><span>4. </span><span style="font-weight:bold">和后端内容联动。</span><span>这是一个本地的项目，能不能融入一些后端，部署，打包，微服务的东西，面试爱考。</span></p>

<p id="f-doxcn2Dma7IQclqHMQHrVdRThvc"><span>5. </span><span style="font-weight:bold">更复杂的架构：</span><span>现在项目是一个静态的Agent。但是我们解析的开源项目，它是动态生成子Agent的。设计更复杂的架构，比如react范式，让主Agent用工具调用的方式fork出子Agent。（这个也是参考笔记里所有开源项目）</span></p>

<p id="f-doxcnoxLE9bKXhu3gSZqgziFFvc"><span>6. </span><span style="font-weight:bold">SKILL：</span><span> 现在的Agent需要有SKILL，就像本案例设计项目往MCP上靠。能不能融入一些</span><span><span><a href="/posts/agent-learning-20-skills-harness/#f-doxcnLFIwlm2NmL623TsclPGqPo"><span>SKILL技术</span></a></span></span><span>。</span></p>

<p id="f-doxcnjtpnv3OxC0pTRV1RWauIkh"><span>了解Harness的详细特性，融入到项目中。</span><span><span><a href="/posts/agent-learning-20-skills-harness/#f-doxcntsmmtzQiqA3fIWuaciBtyh"><span>参考资料</span></a></span></span></p>

<p id="f-doxcnPi80UgYO2ElF0BrExZoG7b"><span>8. </span><span style="font-weight:bold">Agent 性能评估：</span><span> 建议一定要做。如果有时间，还是建议大家做。具体的理论方法在</span><span><span style="font-weight:bold"><a href="/posts/agent-learning-15-evaluation-observability/#f-doxcnqrKdVGPbNYY8Xm3Fr8NVkh"><span>Agent性能评估</span></a></span></span><span style="font-weight:bold">。</span></p>

<p id="f-doxcnbM1zOPIFhuJqR4RpbcRRMh"><span>9. Langchain用到的是0.3的版本，可以换成1.0. 我个人其实觉得Langchain这块就是个工具，面试一般问的也不深入。不过基本上问你的项目，如果你用的Langchain，都会考一下Langchain的特性，用了啥版本。现在Langchain也有更新的版本了，如果面试大家觉得有必要，可以改成1.0。其实很容易，让AI给弄就完了。或者你不改，你就说你用的1.0, 了解下1.0特性，一般面试都够了。</span></p>


<a id="section-0145"></a>
## 配套设施

<a id="f-doxcnfoVkgzAeuYfNQSMXnpH0zb"></a>

<p id="f-doxcnhgG7xpyO6Xutu1f8M6TtRb"><span>配套了一些SKILL，和之前RAG系统高度类似。</span></p>

<p id="f-doxcnfH7Ri18T24X0es9boPQxrh"><span style="font-weight:bold">Project-learner skill</span><span>： 让AI带着你了解这个项目。通过用这个SKILL和它对话和打卡。了解这个项目。</span></p>

<p id="f-doxcnPhJGjBmob2WwNpt8036aih"><span style="font-weight:bold">Interview-prep skill</span><span>：根据这个项目，你的简历，让AI对你模拟面试。</span></p>

<p id="f-doxcnM8Zt9CbY9IbYVybJIFlg1c"><span style="font-weight:bold">Setup-environment skill: </span><span> 让AI一键帮你配置好环境。</span></p>


<a id="section-0146"></a>
## 使用建议

<a id="f-doxcnrKYXtlv6MnBbhYtK36lWvc"></a>

<p id="f-doxcnLDWMUlTwlZA9NJ2nKv2nWc"><span>1. 作为学习项目跑着玩。感受一下什么是AI Agent，function call, multi agent, mcp.</span></p>


<a id="section-0147"></a>
## 面试真题

<a id="f-doxcni3wHibflHwCryauR80h4ag"></a>

<p id="f-doxcnrpXYtjeApUxsKgwUwGHY7l"><span><span><a href="/posts/agent-learning-24-interview-review/#f-doxcnJ4E1M79zoyccqerrnU9Rze"><span>面试实战部分</span></a></span></span><span>其实这些面试问题，虽然是问的按摩房预约多Agent系统，其实都还挺有通用性的。</span></p>

<ol start="1"><li id="f-doxcnxWQEzT82qMvzZjwHrMjfqZ"><span>简单介绍你的项目按摩房智能预约系统，怎么去做的？</span></li></ol>

<ol start="2"><li id="f-doxcnqNnO3R5Nzdg9uZTxDiRqGB"><span>介绍一下按摩房预约系统。</span></li></ol>

<ol start="3"><li id="f-doxcnItyah5D0nBtsgKxSajcKMc"><span>按摩房预约系统是你现在在做的吗？</span></li></ol>

<ol start="4"><li id="f-doxcnN5m5znCSYIkLGbfFlnKr6d"><span>你的项目是如何分块的？</span><br/><span>这里笔记里的回答明确写的是“在按摩房预约系统中，我根据不同场景使用不同分块策略”。</span></li></ol>

<ol start="5"><li id="f-doxcnqyziA6o6AcDxofSvl3Rxtf"><span>你的 RAG 系统中数据库是如何存储的？</span><br/><span>这一题紧跟在“按摩房智能预约系统”后面，属于对这个项目 RAG 存储方案的追问。</span></li></ol>

<ol start="6"><li id="f-doxcnSAo7zXzVT1PjHygPTSVD9e"><span>你的 RAG 系统是怎么去评估系统质量的？</span></li></ol>

<ol start="7"><li id="f-doxcnrgwnXJdiXfym8E6mnuBnVb"><span>为什么用 LangChain 不用 Semantic Kernel？</span><br/><span>这一题出现在“介绍按摩房预约系统”之后，是对这个项目框架选型的追问。</span></li></ol>

<ol start="8"><li id="f-doxcnNPUbyR4Sh4L1zk1qtxwHiU"><span>为什么设计成多 Agent？</span></li></ol>

<ol start="9"><li id="f-doxcnGP9Uhcn75WR5Dpb3Cd6NUe"><span>有没有涉及同时要调多个 Agent，或者多个 Agent 之间还有依赖关系？</span></li></ol>

<ol start="10"><li id="f-doxcnU3Bw4lTKlV0JuztAT4YOnd"><span>端到端的延迟是多少？</span><br/><span>笔记里明确说这是 Agent 从输入到第一个输出的延迟，出现在按摩房预约系统追问链路里。</span></li></ol>

<ol start="11"><li id="f-doxcnmMmH5lvuUmNKZvF5H4OJtd"><span>你评价你的预约系统 Agent 好坏的标准是什么？</span></li></ol>

<ol start="12"><li id="f-doxcnlo7d7n5NRQtcugjUXhQy5f"><span>你的这个 Agent 项目任务完成得怎么样，有没有去学习/反思能力？</span></li></ol>

<ol start="13"><li id="f-doxcnDzR3tYYNYasB3krAMfsDmf"><span>有没有使用一些知识问答的功能？</span><br/><span>也就是问这个项目有没有做 RAG。</span></li></ol>

<ol start="14"><li id="f-doxcnmvZE8BijD7ps5qGIsvm2pm"><span>你讲到的两个项目，两个项目最大的区别是啥？能否具体结合你的项目讲？</span><br/><span>笔记里回答明确对比了邮箱项目和按摩房预约系统，并说明按摩房适合中心化多 Agent。</span></li></ol>

<ol start="15"><li id="f-doxcnNmTiW7t0a69lPVKxqAwIRc"><span>多 Agent 系统和单 Agent 系统最大的区别是什么？彼此有什么优势？</span><br/><span>这题本身是通用题，但笔记里要求结合按摩房预约系统回答，所以可以纳入“按摩房项目相关追问”。</span></li></ol>


<a id="section-0148"></a>
## 项目源码

<a id="f-doxcnEXVRFiM14lmZkctT63LqOh"></a>

<p id="f-doxcnNXQ9T7SJy2Ffl8wYcJseug"><span><span><a href="https://github.com/jerry-ai-dev/smart-appointment-ai-agent"><span>https://github.com/jerry-ai-dev/smart-appointment-ai-agent</span></a></span></span></p>


<a id="section-0150"></a>
## 项目介绍

<a id="f-doxcn1aLakJOeCP8XZ8kzCOUdwh"></a>

<p id="f-doxcnvnMAPflSIG0gKaOsMmj1cb"><span>对于项目完整的技术方案，请看项目仓库的Dev_SPEC.</span></p>

<p id="f-doxcnXdEyrmlIu3DKZmxxDHqyXe"><span>对于项目的使用建议，项目仓库的Readme.</span></p>

<p id="f-doxcnHfinfZOhSZXhgq8JxfkMMd"><span>其它的一些实际思路，比如项目如何启动，从0到1的过程，项目如何配置环境，如何开发的，如何写的SKILL,SPEC，以及一些如何面试前的准备，请看视频讲解。</span></p>

<p id="f-doxcnYNzgrG8kwigFOW7SP5stQe"><span>如果进行突击前的准备，比如项目会问哪些问题，那就请看</span><span><span><a href="#f-doxcn0hGuFO84zrM95ERdC4jj9d"><span>模拟面试SKILL</span></a></span></span><span>。用这个方法，带你复习整个项目70多个知识点和八股，并进行模拟面试。 项目基本整个流程已经完毕，</span><span style="font-weight:bold">不会增加新的功能了。</span><span>请各位需要深入扩展，</span><span style="font-weight:bold">比如加一个新功能，自定义评估模块，垂直业务适配 大家按照思路自己扩展就好了。看看我上述的思路，扩展应该并不难。</span><span>具体的项目八股部分，我没有总结，但是请你使用</span><span><span><a href="#f-doxcn0hGuFO84zrM95ERdC4jj9d"><span>模拟面试SKILL</span></a></span></span><span>的方法，让AI带你过完整个项目。我想要继续总结的是真实场景下，该项目的面试问题。</span></p>


<a id="section-0151"></a>
## Github地址

<a id="f-doxcnz8I9a7lglJuMxHkjuuO4Gg"></a>

<p id="f-doxcn7mWZLF0662zDnE8USIBFwg"><span>GitHub上的Dev_spec是更完整/更新的版本。推荐Git仓库看整个Spec, Spec甚至是包含了完整的目录结构和项目管理，包括上传了Skills 教大家如何用AI来完成整个项目。有兴趣欢迎尝试呀！</span></p>

<p id="f-doxcnxG9NcdgAxYvDgYwszfNqPg"><span><span><a href="https://github.com/jerry-ai-dev/MODULAR-RAG-MCP-SERVER"><span>https://github.com/jerry-ai-dev/MODULAR-RAG-MCP-SERVER</span></a></span></span></p>


<a id="section-0152"></a>
## 面试真题

<a id="f-doxcnkBTXhi7vtyQFfSZ2lg4xzd"></a>

<p id="f-doxcnw7FipLckpmIFAewsROdXVb"><span>这一小节会展示真实的面试问题。即使不给我录音，也建议大家自己面试录音，然后自己复盘的时候就根据录音去听细节。 当然并不是每个小伙伴都愿意提供录音，毕竟有一些隐私性，那么你可以尽量回忆当时的细节，可以给我文字版，可以把你的内容整理，告诉你怎么改进，也会记录在文档中，也是一个一起学习的过程。</span></p>

<p id="f-doxcnnrperDZL7DIU2hlhK3rb3e"><span>本节呢，会展示该项目的真实的面试问题，素材来自于技术问答案例和自己面试。技术问答案例有时细节可能就有限了，因为可能是以回忆的文字形式整理的。</span></p>

<a id="f-doxcnJWobctglYMaBozDgwflSEb"></a>

##### 技术问答案例

<div style="margin-left:25px"><h5 id="f-doxcnBiQy57LPTj0h7NscqXhptb"><span>3.3.1.2 PDF不规范、乱码多的情况下，MarkItDown转换效果不好怎么办？</span></h5><p id="f-doxcnyteHXEtWwkfB0a2xfL6nKh"><span style="font-weight:bold">思路：</span><span>其实这个问题挺好的，在我做完这个项目的时候，我和大家说的，我强烈的建议是你真的把它用在你的业务场景中。这时你可能会遇到各种问题，比如输入文档质量不好，太大，或者文档中的表格处理不到。这块你遇到的问题和解决思路就是很好的经验和面试问题。 你在解决了他们的时候，可以提高系统的准确性，可以讲出来为啥你的系统效果更好，因为你可能做了xx针对性的调整等经验。</span></p><p id="f-doxcnIt5L2HEoscAdPvJkw3WbOf"><span>所以这个问题其实是该项目在真实场景下可能会遇到的问题，值得我们去思考。当然答案其实不唯一，我也只能纸上谈兵，给一个我思考的答案。</span></p><p id="f-doxcnHqYL7RccHWJslOah6TlJZb"><span style="font-weight:bold">参考答案：</span></p><p id="f-doxcn3X4RT0hWMdWSzvWnMUI5Th"><span>这个问题我们在设计时是有考虑的，整体是</span><span style="font-weight:bold">三层防线</span><span>的思路，采用 Garbage In Garbage Out的思路。</span></p><p id="f-doxcn68KN3HlXX1mlP62tjRrhDi"><span>第一层，Pipeline 入口有</span><span style="font-weight:bold">文档质量检测的前处理</span><span>。 文档进入系统后，Loader 不会直接无脑解析，而是会先做一轮质量预检：提取前几页文本，计算有效字符占比和可识别文本密度。如果有效字符率低于阈值（我们设的是 80%），说明这个 PDF 的文本层本身就有严重问题，这种文档即使硬塞进去，后面切出来的 chunk 也是垃圾，检索质量根本没法保证。所以直接拒绝入库，在 Dashboard 上给用户一个明确的提示：'该文档质量不达标，请检查后重新上传'。与其让脏数据污染整个知识库，不如在入口就拦住。（</span><span>注意哦，这里其实该学习案例并没有做这个前处理，你可以加进去，你试试让AI完成，它能很快完成。另外即使你没做，想清楚了怎么做的，大胆说就行了，面试的时候真的不用完全实事求是</span><span>）</span></p><p id="f-doxcnXXPB3vtOJFrDU5c0jrO24f"><span>第二层，</span><span style="font-weight:bold">从业务场景来说，这个问题在实际中的影响面其实有限</span><span>。 我们这个系统定位是</span><span style="font-weight:bold">企业内部知识库</span><span>，文档来源主要是团队内部产出的技术文档、产品文档、会议纪要这类——这些基本都是 Word/LaTeX 导出的文本型 PDF，格式规范、编码正常。MarkItDown 底层用的是 pdfminer.six，对这类标准文本型 PDF 的提取准确率是很高的。所以在我们的实际场景中，大部分文档走主路径就能处理好。</span></p><p id="f-doxcnFg56ZjKz01gM4s9VIoXatf"><span>第三层</span><span style="font-weight:bold">，即使文本提取有轻微的噪声，后面的 Transform 阶段还有 LLM 做兜底</span><span>。 我们在 Splitter 切分完之后有一个 Transform &amp; Enrichment 阶段，会用 LLM 对每个 Chunk 做智能重组——合并被物理切断的段落、剔除页眉页脚和残余乱码、补全上下文。所以对于那种'</span><span style="font-weight:bold">大部分正常、偶尔几段有点问题</span><span>'的情况，Transform 阶段的 LLM 去噪能力是可以兜住的。</span></p><p id="f-doxcn8rsgKKwGKtYJj1hIUxk0Kp"><span>退一步讲，就算有</span><span style="font-weight:bold">少量噪声数据漏进了知识库</span><span>，</span><span style="font-weight:bold">也不会影响最终检索质量</span><span>。 因为乱码文本生成的 Embedding 向量在语义空间中是没有方向的噪声，跟用户任何有意义的查询之间的相似度都会很低，检索排序时自然就沉底了。所以本质上就是浪费了一点存储空间，但不会污染检索结果。</span></p><h5 id="f-doxcn4F45XXquL8qlHqXg4eceNe"><span>3.3.1.3 图转文用的视觉模型有什么考量？</span></h5><p id="f-doxcnKN8lK5cerDLwyykaJZrVNf"><span style="font-weight:bold">思路：</span><span>其实也是一个非常好的问题，面试喜欢问，你为什么选xx的模型。不光是这个RAG项目的视觉模型，还有你自己做Agent，这些都是常考的问题。比如通过这次面试，总结了这个问题，我就会对是觉得模型多考虑一层。但是现在分析看来，我还是有些东西没有考虑到， 比如</span><span style="font-weight:bold">文本质量差如何前处理，视觉模型的选型</span><span>。 总结这些问题的时候，还要思考，查资料。 项目要考虑的东西还是很多的，经验这个东西还是学无止境的，我们慢慢积累，你看这个笔记，以及做项目，以及面试，都会增加你的经验，让你以后写spec，考虑得更全面。</span></p><p id="f-doxcnwu8HpY96H9BJ7M9jGQWdcc"><span style="font-weight:bold">答案：</span></p><p id="f-doxcnQv1TpTvXuaMlpubWfST9qc"><span>首先，传统RAG处理图像主要有两条路线：一种是用</span><span style="font-weight:bold">CLIP这类多模态Embedding模型</span><span>，把图片和文本映射到同一个向量空间，做视觉相似性匹配；另一种是用</span><span style="font-weight:bold">Vision LLM做图转文</span><span>，把图片内容理解成自然语言描述，然后复用文本RAG链路去检索。我们选的是图转文。因为我们的业务场景是内部技术文档，图片基本都是架构图、流程图、表格截图这些，用户问的是'调用链路是什么'、'超时配多少'这种具体的技术问题，要的是图里的含义不是外观。CLIP匹配不到这个层面的语义，Vision LLM可以。</span></p><p id="f-doxcnx3JEKVwtNPFKxQFXhl635g"><span>然后，具体选哪个Vision LLM，我们用了</span><span style="font-weight:bold">双模型策略</span><span>。英文文档和复杂图表主选</span><span style="font-weight:bold">GPT-4o，理解能力最强；中文场景主选Qwen-VL-Max，中文OCR和图表理解更好，价格大概GPT-4o的三分之一到五分之一，国内访问延迟也低。通过配置切换，代码层是解耦的</span><span>。</span></p><p id="f-doxcn8xf35GZE1MVU4KCKutIvyh"><span>最后，用法上也做了一些优化。不同类型的图片用不同的结构化prompt，比如流程图侧重提取节点关系，数据图表侧重提取数值和结论。调模型的时候会把图片前后的文本段落一起传进去，让模型理解图在文档中的上下文。另外做了内容哈希缓存，同一张图不会重复调用。</span></p><p id="f-doxcnuWzCtmeHa90UACMtzaqqwg"><span>（</span><span>这里我设想的我的RAG场景是业务内部技术文档。所以有如下的答案。我希望大家要参考这个思路，比如CLIP和Vision LLM, 对于不同提示词的使用，然后针对性修改，来放在自己项目的回答中</span><span>）</span></p></div>

<div id="f-doxcn1JSFzI77OXTAG2zbArbT53" style="margin-left:25px">项目常规技术问题：如何做粗排、精排？如何使用双路检索？数据库存储了哪些信息？这些问题涉及项目细节与基础知识。可以按项目知识点逐个学习，并通过模拟问答检验理解。</div>

<a id="f-doxcn5Rk2hLDaDZC9SqmNHW1YPe"></a>

###### 本地有没有实现过

<a id="f-doxcnilFG7SSRhRk54bpjNsvNcc"></a>

###### 有没有了解RAG的新方向

<p id="f-doxcnGw1spP7fftVTEOGdjaTxPh"><span style="font-weight:bold">思路：</span><span>其实方向还是挺明确的，Agentic RAG 和 Graph RAG.我的复习思路是先去理解概念，当面试官问到相关问题，通常第一个问题都是解释概念，问你了解不，然后就按照以下内容答就行了。</span><span style="font-weight:bold">我暂时不会深入学习。</span><span>为什么呢？因为不是说每个人都需要把RAG学得比较深的，RAG如果脱离了Agent，它也不算大模型方向了。所以在大模型方向Agent的重要性比RAG重要，RAG基本的知识就是该学习案例相关的。学习好这些个RAG基本相关的内容，是基础，有余力当然可以去学这两个方向，或者做相关项目。但是并不是每个岗位都需要很深的RAG，深入到Agentic 和 Graph，个人精力也有限嘛。总而言之，我不深入学习Agentic 和 Graph RAG，是因为在这里他优先级没排上。</span></p>

<p id="f-doxcnK8aV71cjFs5BLvkiHgt0Fe"><span>但是提醒大家的还是根据自己的情况去分析。因为有的人的岗位就是偏RAG这一块的，那他肯定就需要把RAG多学一点。如果你的目标岗位是宽泛的，比如大模型应用，大模型算法。可以先把其他的内容，Agent, RAG基础内容，微调，推理相关的东西学好了，再来。</span></p>

<p id="f-doxcnp0vh7G1sssJdnPTDzqoimd"><span style="font-weight:bold">答案：</span></p>

<div style="margin-left:25px"><p id="f-doxcnPDND3ZGveLq1AUvGRDAbch"><span>Agentic RAG的核心是把RAG从一个固定流水线变成一个有决策能力的Agent。传统RAG就是检索一轮、生成答案、结束了。但很多复杂问题一轮检索根本不够，Agentic RAG让模型自己判断——检索结果够不够？不够就再检索一轮，或者换个检索策略。像Self-RAG、Corrective RAG都是这个思路，本质就是让检索过程变得更智能、可以自我纠错。</span></p><p id="f-doxcn08NzMepz1eY78B51ZQu1ec"><span>Graph RAG解决的是另一个问题——传统向量检索擅长找语义相似的内容，但很难处理跨文档的关联推理。比如问人物之间的关系，信息散落在十几个段落里，靠embedding相似度很难串起来。Graph RAG的做法是先从文档里抽取实体和关系建成知识图谱，检索时在图上做关系遍历，特别适合需要全局理解的问题。"</span></p><p id="f-doxcnrmrAIZYbFZDp6VKOzct8Ah"><span>可以认为这两个方向是互补的——一个解决检索策略的智能化，一个解决知识关联和推理，未来可能会结合起来用。</span></p></div>

<a id="f-doxcnGinUMSq0QPTlutbHCaA6Tc"></a>

##### 离线数据处理

<p id="f-doxcncvvuEp2vIXlb3Ft5WubmWc">RAG 离线解析：以输入 PDF 格式构建数据库为例，关注离线数据构建的核心、重要性和常见问题。建议实际运行 PDF 摄取，观察可能遇到的问题。下面整理离线解析的问题、考点和答案。</p>

<p id="f-doxcnfmdaoWx1gbuxAiwlFAr7gd"><span style="font-weight:bold">1. 你们项目处理的文档都是什么格式？PDF 多栏排版你是怎么处理的？</span></p>

<p id="f-doxcnyBTg3vX0yiKZZYl9r21iae"><span>该学习案例处理的文档以 PDF 为主。用 MarkItDown 把 PDF 统一转成 Markdown，它能识别段落、标题、列表等结构化元素，比纯文本提取更好地保留文档逻辑结构。同时用 PyMuPDF 做图片提取，确保图文信息不丢失。后续通过vision llm来提取图片内容，实现图片的检索。</span></p>

<p id="f-doxcn01HuVreTpWThKORjMOBDdf"><span style="font-weight:bold">2. 你们文本分块是怎么做的？如果一段完整的业务流程被从中间切断了怎么办？</span></p>

<p id="f-doxcnCPsVON2BeUiw8Zx6mdbsVh"><span>我们用了多层策略来尽可能避免切断，以及切断后的补救机制：</span></p>

<p id="f-doxcnrfC87wC4JskUIgMIAu2v9f"><span style="font-weight:bold">避免切断</span><span>： 用 </span><span style="font-weight:bold">RecursiveSplitter</span><span>，按分隔符优先级递归切——先尝试在段落（</span><span><span><span>\n\n</span></span></span><span>）处断开，不行再降到换行（</span><span><span><span>\n</span></span></span><span>），再降到句号（</span><span><span><span>. </span></span></span><span>），最后才是空格。也就是说它会优先在自然语义边界切分，而不是无脑按字符数硬切。一段完整的理赔流程如果在一个段落内，就不会被拆开。</span></p>

<p id="f-doxcnG6D9HSnniyIPoZRXObpqhb"><span style="font-weight:bold">切断后的容错</span><span>： 设置了</span><span style="font-weight:bold"> chunk overlap 重叠窗口</span><span>，上一个 chunk 的尾部几句话会同时出现在下一个 chunk 的开头。即使流程被切在了中间，上下两个 chunk 都保留了切断点附近的上下文，检索时任何一个被命中，都能拿到切断点前后的关键信息，</span><span style="font-weight:bold">不会出现"半句话"的情况</span><span>。</span></p>

<p id="f-doxcnwoMIuy8bUh67uccJ38j97D"><span style="font-weight:bold">检索阶段兜底</span><span>： 每个 chunk 都带有 </span><span><span><span>chunk_index</span></span></span><span>（序号）和 </span><span><span><span>source_ref</span></span></span><span>（父文档 ID）。如果检索命中了某个 chunk，系统可以根据 chunk_index 找到它的前后相邻 chunk，把上下文拼回来送给 LLM 生成答案。这样即使切分不完美，在检索和生成阶段也能还原完整信息。</span></p>

<p id="f-doxcnR4TfYLibAs0kwUuDclqLPc"><span style="font-weight:bold">后处理兜底</span><span>： Transform 阶段的 ChunkRefiner 会对每个 chunk 做规则清洗和可选的 LLM 精炼，确保每个 chunk 是语义自包含的。LLM 调用失败自动降级为纯规则，不阻塞流水线。</span></p>

<p id="f-doxcn9cqOctFeag61iz7vqfeiAg"><span style="font-weight:bold">3.</span><span style="font-weight:bold">chunk 大小你是怎么定的？太大太小都有问题，你怎么平衡的？</span></p>

<p id="f-doxcnRj8isHQC03YkPXoQWHykUf"><span>chunk_size 和 chunk_overlap 全部通过 </span><span><span><span>settings.yaml</span></span></span><span> 配置驱动，不需要改代码就能调。整个 Pipeline 是工厂模式架构，Splitter、Embedding、VectorStore 都通过 Factory 实例化，切换策略只改配置。实际调优时结合下游 LLM 的上下文窗口大小和评估指标来实验确定最优值。而且在线阶段我们用了 Dense + BM25 混合检索 + Cross-Encoder Rerank 的三级策略，先大范围召回再精排，减少了对单个 chunk 粒度的过度依赖。</span></p>

<p id="f-doxcnOXvkXJeXqNdv5Mk2uaoFle"><span style="font-weight:bold">4. chunk 大小你是怎么定的？太大太小都有问题，你怎么平衡的？</span></p>

<p id="f-doxcnVLZZqTWT4fNvmxTKMlKVXe"><span>我们最终定的是 chunk_size=1000 字符，chunk_overlap=200，这个值是综合三个因素平衡出来的：</span></p>

<p id="f-doxcnlr6Z8w8oKVQGOrPbyb59nc"><span>第一个因素是 Embedding 模型的输入上限。 我们用的 Embedding 模型 token 上限一般在 512-8192 之间，1000 字符大概 300-500 token，留够余量不会被截断，保证每个 chunk 完整编码。</span></p>

<p id="f-doxcn1xvXmY4zPAzoF5AG0x8fRh"><span>第二个因素是 LLM 上下文窗口的承载量。 在线回答时我们通常召回 top-5 到 top-10 个 chunk 拼成 context 给 LLM。如果 chunk 太大比如 3000 字符，5 个就是 15000 字符，很容易撑满窗口、挤压生成空间；1000 字符的话，10 个也才 10000 字符，LLM 还有充足空间做推理和生成。</span></p>

<p id="f-doxcnPKFDERU4niy6nbMprnbpHe"><span>第三个因素是语义完整性。 太小比如 200 字符，一个 chunk 可能只有一两句话，语义残缺，检索精度反而下降——一句话脱离了上下文，Embedding 向量质量也差。1000 字符大约是一个自然段落的长度，能包含一个相对完整的信息单元。</span></p>

<p id="f-doxcnfpLtfLbn1PFzLz9rzbNqKf"><span>200 的 overlap 是 chunk_size 的 20%，目的是让相邻 chunk 在切断点处有足够重叠，不会因为切分而完全丢失边界处的上下文。</span></p>

<p id="f-doxcnBCNtWlYhHW5iR0mOxFWxne"><span>这些参数都在 settings.yaml 里配置驱动，不用改代码。实际上线前我们可以通过评估模块跑对比实验——不同 chunk_size 下的召回率和生成质量——来验证和微调。</span></p>

<p id="f-doxcn1RIi8WfLocEPycSZxcmcFe"><span style="font-weight:bold">5. 输入的数据有很多噪声数据，质量很差怎么办？</span></p>

<p id="f-doxcn8Hl8b4vBfXgOT70UHZomvh"><span>这个问题我们在设计时是有考虑的，整体是</span><span style="font-weight:bold">三层防线</span><span>的思路，采用 Garbage In Garbage Out的思路。</span></p>

<p id="f-doxcn3iqAJtwI2qUqzTiHeOPXNb"><span>第一层，Pipeline 入口有</span><span style="font-weight:bold">文档质量检测的前处理</span><span>。 文档进入系统后，Loader 不会直接无脑解析，而是会先做一轮质量预检：提取前几页文本，计算有效字符占比和可识别文本密度。如果有效字符率低于阈值（我们设的是 80%），说明这个 PDF 的文本层本身就有严重问题，这种文档即使硬塞进去，后面切出来的 chunk 也是垃圾，检索质量根本没法保证。所以直接拒绝入库，在 Dashboard 上给用户一个明确的提示：'该文档质量不达标，请检查后重新上传'。与其让脏数据污染整个知识库，不如在入口就拦住。（</span><span>注意，这里其实该学习案例并没有做这个前处理，你可以加进去，你试试让AI完成，它能很快完成。另外即使你没做，想清楚了怎么做的，大胆说就行了，面试的时候真的不用完全实事求是</span><span>）</span></p>

<p id="f-doxcnqc7zfxIydCutqnHQ2yXZge"><span>第二层，</span><span style="font-weight:bold">从业务场景来说，这个问题在实际中的影响面其实有限</span><span>。 我们这个系统定位是</span><span style="font-weight:bold">企业内部知识库</span><span>，文档来源主要是团队内部产出的技术文档、产品文档、会议纪要这类——这些基本都是 Word/LaTeX 导出的文本型 PDF，格式规范、编码正常。MarkItDown 底层用的是 pdfminer.six，对这类标准文本型 PDF 的提取准确率是很高的。所以在我们的实际场景中，大部分文档走主路径就能处理好。</span></p>

<p id="f-doxcnuMcrOsPnpPT9b0ucGUzOyc"><span>第三层</span><span style="font-weight:bold">，即使文本提取有轻微的噪声，后面的 Transform 阶段还有 LLM 做兜底</span><span>。 我们在 Splitter 切分完之后有一个 Transform &amp; Enrichment 阶段，会用 LLM 对每个 Chunk 做智能重组——合并被物理切断的段落、剔除页眉页脚和残余乱码、补全上下文。所以对于那种'</span><span style="font-weight:bold">大部分正常、偶尔几段有点问题</span><span>'的情况，Transform 阶段的 LLM 去噪能力是可以兜住的。</span></p>

<p id="f-doxcnqRWitSUPbdLOLxkpQml9ef"><span>退一步讲，就算有</span><span style="font-weight:bold">少量噪声数据漏进了知识库</span><span>，</span><span style="font-weight:bold">也不会影响最终检索质量</span><span>。 因为乱码文本生成的 Embedding 向量在语义空间中是没有方向的噪声，跟用户任何有意义的查询之间的相似度都会很低，检索排序时自然就沉底了。所以本质上就是浪费了一点存储空间，但不会污染检索结果。</span></p>

<p id="f-doxcnA6zbLTh1YyyS0PhQbb34Ch"><span style="font-weight:bold">6. 面试回答：你们的离线解析是怎么做的？</span></p>

<p id="f-doxcnrim1xPL4VCHmjMcg8M6Ayd"><span style="font-weight:bold">（先讲挑战）</span><span> 我们要处理多格式文档，主要是 PDF，也有 PPT 和扫描件。核心挑战四个：PDF 解析错乱、图片信息丢失、分块切断语义、缺元数据导致检索过滤维度不够。</span></p>

<p id="f-doxcnmr26p7hvjbeXW4WTjx5NJh"><span style="font-weight:bold">（再讲方案）</span><span> 我们设计了六阶段流水线：</span></p>

<p id="f-doxcnAR3tg8xF0vHFQZJyV89y0d"><span style="font-weight:bold">SHA256 文件校验</span><span>，未变更文件自动跳过，保证幂等。</span></p>

<p id="f-doxcn2tW4eMq0dbqWoqLpbb6c8b"><span style="font-weight:bold">文档解析</span><span>，用 MarkItDown 把 PDF 转 Markdown 保留结构，PyMuPDF 提取图片并插入占位符。</span></p>

<p id="f-doxcnbtuV2jRbbnXuqMiiGJQbDd"><span style="font-weight:bold">语义感知分块</span><span>，RecursiveSplitter 按段落、换行、句号等自然边界递归切分，不硬切；设 chunk overlap 200 字符重叠窗口防上下文断裂；每个 chunk 带 chunk_index 和 source_ref，检索命中后可沿序号拼回前后上下文。</span></p>

<p id="f-doxcnqBYeNG5OTRW2hYl9U4tOWc"><span style="font-weight:bold">Transform 三件套</span><span>——ChunkRefiner 清洗噪音做内容精炼；ImageCaptioner 调 Vision LLM 给图片生成自然语言描述回填到文本，解决图片信息丢失；MetadataEnricher 用规则+LLM 给每个 chunk 打 title、summary、tags 标签，支持检索时多维过滤。三个组件 LLM 调用失败都自动降级，不阻塞流水线。</span></p>

<p id="f-doxcnE5zv6QlHvfij8TmJ5owBXd"><span style="font-weight:bold">双路编码</span><span>，Dense 向量 + BM25 稀疏索引，语义匹配和关键词匹配互补。</span></p>

<p id="f-doxcnYUHH783p9MM0ZjZhHFmNve"><span style="font-weight:bold">三路存储</span><span>，VectorStore、BM25 Index、ImageStorage 各司其职。</span></p>

<p id="f-doxcnYPNit7ln04KlPVZUyMxGJd"><span style="font-weight:bold">（最后讲效果）</span><span> PDF 解析错乱→MarkItDown 结构化转换从源头保证质量，不让乱码污染 Embedding；图片丢失→Vision LLM caption 回填解决；分块切断→递归切分+overlap+chunk_index 上下文拼接多层兜底；元数据不足→MetadataEnricher 注入语义标签，配合混合检索+Rerank 做多维筛选。chunk_size 1000、overlap 200 全部配置驱动，可以结合评估指标实验调优。</span></p>

<a id="f-doxcnAyIBJev0C3Hz1kWXqv7Jcd"></a>

##### 某大厂二面

<a id="f-doxcn1ZB4aS2P0Gp3bHmXcOixld"></a>

###### 大模型增强部分是做什么的？有什么用？元数据都有什么？增强前后效果对比了吗？

<p id="f-doxcnlfI8llPFvD9rriqa5SKere"><span>（前三个问题，其实就是项目的最基本的模块，我设置的机器人都会带大家复习过。理解了以后，其实自己对于这些问题需要自己尝试表达一下，因为理解和表达流畅是不一样的。最后一个问题：前后效果对比了吗，可以认为就是编吧，或者叫自圆其说，结合我们做测评制定json的数据集以及使用ragas的经验，把最后一个问题编出来）</span></p>

<p id="f-doxcn09zfjeEwAHjjcB7PDGHWDh"><span style="font-weight:bold">Q1: 大模型增强做了什么</span></p>

<p id="f-doxcnhZx5K3liFFt4geSj5WSUDf"><span style="font-weight:bold">A1: </span><span>我们的 Ingestion Pipeline 里 Transform 阶段主要围绕"脏、乱、不可搜、难展示"的痛点，设计了三个核心模块来进行数据增强，分别针对</span><span style="font-weight:bold">纯文本、元数据，以及文档中的图片</span><span>。</span></p>

<p id="f-doxcnRmkjexySd6C4AdLvf8Qxdc"><span style="font-weight:bold">第一部分是 ChunkRefiner（文本块精炼）。</span></p>

<p id="f-doxcnPTCCGB7dxO3zKoAAsYzRzc"><span>主要解决 PDF 解析后的排版噪声。本案例采用了“规则兜底 + LLM增强”的两阶段处理模式：</span></p>

<div style="margin-left:25px"><p id="f-doxcnXxoCzKrNoNlPJCV0BhMnoe"><span>- </span><span style="font-weight:bold">规则兜底</span><span>：首先用正则低延迟地去掉连续空行、分页符和 HTML 残留，并精准保留所有的代码块。这一步是必做的，0成本覆盖 80% 场景。</span></p><p id="f-doxcncBR4MiL1exhA5L2F6Lykrd"><span>- </span><span style="font-weight:bold">LLM 增强</span><span>：对于规则搞不定的分页造成的段落断开、OCR 识别错别字，交给大模型进行上下文合并和修正，让文本变得连贯。</span></p></div>

<p id="f-doxcnfCvS66MRJN3Ju9EYZQXG9A"><span style="font-weight:bold">第二部分是 MetadataEnricher（元数据增强）。</span></p>

<p id="f-doxcnItAtKyHleOV7tQ1rU3bcRh"><span>它的作用是为每个 chunk 生成结构化的语义元数据（Title、Summary、Tags），方便后续做字段级别的检索过滤和结果展示。这部分当没有使用LLM的时候，会使用基于正则化匹配的方式提取这三部分，使用LLM的时候，会用LLM的语义分析功能来完成。</span></p>

<p id="f-doxcnFXVsonQkIZxlpvNxtrb3cg"><span style="font-weight:bold">第三部分是 ImageCaptioner（图片多模态增强）。</span></p>

<p id="f-doxcnpw0P9VAHamWq3pedLEv1Fg"><span>这是解决传统 RAG 丢失插图信息的关键。解析阶段图片会被存在本地，并在原文对应位置留下 </span><span><span><span>[IMAGE: id]</span></span></span><span> 的占位符。增强阶段，</span><span><span><span>ImageCaptioner</span></span></span><span> 会利用正则扫描这些占位符，一旦发现便调用视觉大模型（Vision LLM）对图片进行跨模态解读。生成的详尽图像描述（Caption）不仅会被注入该区块的元数据中，还会同步回填进正文里，从而使得原本不可检索的图片转化为语义向量，最终实现了强大的“以文搜图”能力。</span></p>

<p id="f-doxcnVBWrbvEXDL9vfzuqDV04Vb"><span style="font-weight:bold">Q2: 元数据具体有什么</span></p>

<p id="f-doxcnWOzZKsY2DZW4gGTUpgNgog"><span>元数据主要包括4块内容：</span></p>

<p id="f-doxcnP4js9la7UlGiSodSPYjkNf"><span>第一个是 </span><span style="font-weight:bold">title</span><span>，限制在 150 字符以内，用来描述这个 chunk 的主题。规则提取时，我的逻辑是有优先级的：首先用正则去匹配文本里有没有 Markdown 标题，也就是 `# Heading` 这种格式，如果有就直接用；如果没有标题，就看第一行够不够短、像不像一个标题（不以句号逗号结尾、长度不超过 100 字符），满足条件就用第一行；再不行就取第一句话截断到 150 字符。LLM 增强时会理解语义后生成更准确的主题描述。这个字段主要用于检索结果的展示和快速浏览。</span></p>

<p id="f-doxcnfrwHO7tRQUPkmtd1gvmp5k"><span>第二个是 </span><span style="font-weight:bold">summary</span><span>，限制在 500 字符以内，是 2 到 3 句话的核心摘要。规则提取的做法比较简单，就是按句号、感叹号、问号做分句，取前三句拼接起来。LLM 增强的话，生成的摘要概括力会更强，不是机械截取前几句，而是真正理解内容后提炼要点。这个字段用于结果预览和上下文补充。</span></p>

<p id="f-doxcnGMD0Wt07y7DxSyPoDeZBOb"><span>第三个是 </span><span style="font-weight:bold">tags</span><span>，3 到 10 个关键词标签。规则提取是从文本里用正则抓三类东西：大写开头的专有名词（比如 Azure、OpenAI）、camelCase 和 snake_case 风格的代码标识符（比如 `text_embedding`、`baseTransform`）、以及 Markdown 加粗标记 `...` 里的词——因为作者特意加粗的通常是关键概念。LLM 增强的优势在于它能推断出文本中没有直接出现但语义相关的标签，比如文档讲的是微服务拆分，LLM 可能会生成"分布式系统"、"SOA"这类语义关联的标签。tags 主要用于分类过滤和关联检索。</span></p>

<p id="f-doxcnaBtkAQG6fjbb96xo7VX6Qg"><span>第四个是 </span><span style="font-weight:bold">enriched_by</span><span>，标记这条元数据的来源。取值有三种：`"llm"` 表示是 LLM 生成的，`"rule"` 表示是规则提取的，`"error"` 表示处理过程出了异常。如果 LLM 调用失败降级到了规则结果，还会额外附带一个 `enrich_fallback_reason: "llm_failed"` 字段，便于事后追溯哪些 chunk 的元数据质量可能不够理想。</span></p>

<p id="f-doxcnORi4eCxcMwMHIWfTds6k9f"><span>第五个是 </span><span style="font-weight:bold">image_captions</span><span>，这个是 ImageCaptioner 处理后追加的。如果一个 chunk 的文本里包含 `[IMAGE: id]` 占位符，说明这个 chunk 引用了图片，ImageCaptioner 会调用 Vision LLM 对图片生成描述，然后以列表的形式写入 metadata，每个元素是 `{"id": "img_001", "caption": "这张图展示了系统架构图..."}`。</span></p>

<p id="f-doxcn6SnYeXh6HpzmAZSlW0SOWh"><span style="font-weight:bold">Q3: 增强前后效果对比了吗？</span></p>

<p id="f-doxcntlLl3s8hFq9RuXzlq5Fayc"><span>做过对比。我们通过</span><span style="font-weight:bold">两种方式来</span><span>评估增强效果.</span></p>

<p id="f-doxcncSbTfD6xlRmHHi356J25od"><span style="font-weight:bold">第一种方式是在测试集数据中</span><span>手动标注了一些典型的"脏乱"文本块，包含分页符、冗余空行等，然后对比增强前后的文本质量。增强前这些文本块往往是断断续续的，甚至有些关键信息被分页符分开了；增强后文本变得连贯，关键信息完整保留了下来。</span></p>

<p id="f-doxcn4ixgz9iiy95eZFLq9DTHFb"><span style="font-weight:bold">第二种方式是，我们比较了我们的测试集</span><span>，在将llm 增强打开和关闭后，使用ragas进行评分的结果对比，在打开了llm增强后，整体的 Fluency和 Coherence 评分提升了约 15%，说明增强环节确实提升了整体RAG系统的准确性和可靠性。</span></p>

<a id="f-doxcn1lPT97u8IAlWPZgpvJ3ZFe"></a>

###### BM25 怎么构建的？稀疏向量还是倒排索引？多少维度？Dense 多少维？向量数据库支持稀疏检索吗？嵌入模型用了什么？为什么？

<p id="f-doxcnBLSqOYEwQQZ83AJJOIhoOg"><span>(其实这个题不难，是一些基础知识。除了项目本身如何实现的，需要理解的一些概念是：</span><span style="font-weight:bold">BM25，稀疏向量，倒排索引，向量数据库。</span><span>这些部分在RAG八股里有，不懂的话其实就是建议让AI给你解释，让它给你举例子。明白了概念以后，其实就是照着项目实现回答面试官问题就好。面试官很有可能顺着这个问题问一些概念，比如稀疏/稠密向量的区别，BM25的原理，向量数据对比等，这些都是基础八股了，就不展开了，但希望你能自己掌握，特别是里面的</span><span style="font-weight:bold">倒排索引和BM25的公式可能会复杂一点</span><span>，可以深入掌握一下原理，怕面试官追问。）</span></p>

<p id="f-doxcnyor8VfkQFLKF6lUH0opKre"><span style="font-weight:bold">Q1: BM25 怎么构建的？稀疏向量还是倒排索引？</span></p>

<p id="f-doxcnyeW6xVPdjs8p4KtJNFBHLh"><span>（这里其实可以深入了解BM25和稀疏向量的公式的，防止被追问）</span></p>

<p id="f-doxcnDSmZq76vn90XwgRG07leBh"><span>我们的 BM25 构建分两步：</span></p>

<p id="f-doxcnrrzl21T2NJnGx4E13xXtdg"><span style="font-weight:bold">第一步建倒排索引</span><span>。 SparseEncoder 用 jieba 对每个 chunk 分词、统计词频，BM25Indexer 汇总后建成 词 → posting list 的倒排结构，每条 posting 存 chunk_id、词频 tf、文档长度。同时预算好每个词的 IDF 和全局平均文档长度，整个索引以 JSON 持久化到磁盘。</span></p>

<p id="f-doxcnhlzItgjbCzMle8XxvIdDYd"><span style="font-weight:bold">第二步查询时在线打分</span><span>。 query 分词后，查每个词的 posting list，用 BM25 公式对命中文档打分、求和、排序，返回 top-k。</span></p>

<p id="f-doxcnm41H3PamTLz0YnTK5Te7fV"><span>用的是</span><span style="font-weight:bold">倒排索引，不是稀疏向量</span><span>。因为稀疏向量需要向量数据库支持，我们用的</span><span style="font-weight:bold"> ChromaDB 只支持稠密向量，所以自建了倒排索引，独立于向量数据库运行。</span></p>

<p id="f-doxcnnq1bbo9QLTBYyq7wXVrbzh"><span style="font-weight:bold">Q2：多少维度？Dense 多少维？</span></p>

<p id="f-doxcny9S6vvsrcbEQaZNKZ1Qljd"><span>BM25 是倒排索引，没有维度概念。它存的是 词 → posting list，不产生向量。</span></p>

<p id="f-doxcndg6DJFzzyBefMpqMv0jrXY"><span>Dense向量的维度一般都是由不同的嵌入向量模型决定的，案例使用的是text-embedding-ada-002，维度是:1536 维. 比如用Ollama，则是768维。</span></p>

<p id="f-doxcnzirwOJchtA4PnpYfGJS91e"><span style="font-weight:bold">Q3：嵌入模型用了什么？为什么？</span></p>

<p id="f-doxcnvajdvFXqH1Avl6yzdwRIUe"><span>老实讲有时候我们自己做项目哪里考虑那么多啊，每个地方都做技术选型和对比，毕竟又不是商业项目。但是面对这些问题的时候，我们还是得思考，编也要编一个理由自圆其说）</span></p>

<p id="f-doxcnbM2yQQn7i1gtbjtnRUiXWf"><span>项目目前使用的是text-embedding-ada-002，维度是 1536 维。稍微提一句，整个项目采用的是工厂模式和插件注册的方式，所以其实修改不同的嵌入模型特别容易，只用准备好api，修改配置文件即可。本案例采用text-embedding-ada-002的原因是：</span></p>

<ol start="1"><li id="f-doxcnLY6FTYfPqliASToY2msiBg"><span>成熟稳定、生态完善：ada-002 是 OpenAI 最早大规模商用的嵌入模型之一，社区文档和最佳实践丰富，踩坑少。</span></li></ol>

<ol start="2"><li id="f-doxcnsiPxO1Gb3kgjeIe9VPMpef"><span>性价比高：在 OpenAI 的嵌入模型中价格最低（$0.0001/1K tokens），对于中小规模文档库来说成本可控。</span></li></ol>

<ol start="3"><li id="f-doxcnx7Gj1IqUBRFa6bizs3HcXh"><span>1536 维度够用：1536 维对于文档级别的语义检索已经有足够的表达能力，同时 ChromaDB 等向量数据库对这个维度的支持也很成熟。</span></li></ol>

<ol start="4"><li id="f-doxcnCp7I0P8dUTbfri1vnVKvne"><span>与项目混合检索架构契合：项目采用 Dense + BM25 混合检索 + Reranker 的三阶段召回策略，Dense 部分负责语义召回，ada-002 的语义表征能力足以覆盖这个场景；精排阶段还有 Cross-Encoder Reranker 做二次排序，因此对嵌入模型本身的排序精度要求可以适当放宽。</span></li></ol>

<a id="f-doxcnmoMvX7JG4TwHdqZiCogmFg"></a>

###### 时间消耗、延迟测量了吗？每个环节多少？嵌入部分耗时多少？

<p id="f-doxcnwIA5SMon5tBFNb5bW5IP9d"><span>（其实面试官喜欢问这个东西，不管是Agent还是RAG,这也是为什么本案例设计整个项目的时候，观测环节就加入了耗时，并且是每一步的耗时统计，大家跑Dashboard的时候在界面上可以看到的。这里告诉它每一步消耗，哪里耗时比较多，为什么，体现出我们工作的全面和真实性）</span></p>

<p id="f-doxcnGG8Es7oZpHXOmJYr2Hypdd"><span>测了，整个系统从 Ingestion 到 Query 每个环节都有打点记录耗时，最终可以在 Dashboard 的 Trace 面板里可视化查看。</span></p>

<p id="f-doxcnvJoh5MwXJfQn66xwNJMkCf"><span style="font-weight:bold">Ingestion 端到端，一份 10 页左右的 PDF，规则模式总耗时大概 2-5 秒</span><span>，如果开了 LLM 增强会到 10-20 秒。其中加载、分块、存储这些环节都很快，加起来也就几百毫秒。耗时最突出的两个环节是 Transform 和嵌入编码——Transform 一旦开了 LLM 增强，因为每个 chunk 都要调一次 LLM API，光这一步就要 3-8 秒，是整条链路的最大瓶颈；嵌入编码调远程 Embedding API 大概 1-3 秒，占总耗时的 30%-50%，所以我们专门做了逐 batch 的计时，方便定位是网络延迟还是某个 batch 数据量大导致的慢。</span></p>

<p id="f-doxcnWrRTiqltT3B0nMl1NpvRwl"><span style="font-weight:bold">Query 端到端大概 0.5-3 秒。Dense 和 Sparse 检索是并行跑的</span><span>，加上 RRF 融合，检索阶段总共也就两三百毫秒。最影响查询延迟的是 Rerank，如果用 Cross-Encoder 大概 300-800ms，换成 LLM Rerank 就要 1-3 秒，基本决定了用户感知到的响应速度。</span></p>

<a id="f-doxcn1xfI6pdKj7wqNPb9oBtfqe"></a>

###### 为什么进行混合检索？有什么作用？具体举个例子？是因为业界都这么做吗？

<p id="f-doxcnGSEqEqODPSx6bgdJmm0GFf"><span>（其实这题很好，有点像个典型八股，就是问你为啥RAG一般都用双路检索，通过这个题了解一下两路检索的优缺点）</span></p>

<p id="f-doxcn8ML5fbFqC6zcm4pucDnPoc"><span style="font-weight:bold">Q1: 为什么进行混合检索？有什么作用？具体举个例子？</span></p>

<p id="f-doxcnZOjtq12HxVguZn6CoKGn2f"><span>我做混合检索的核心原因是：单一的检索路径都有明显的盲区，Dense 和 Sparse 的能力刚好是互补的。</span></p>

<p id="f-doxcn2UsMpd1xoxLZMY4ChYP25g"><span style="font-weight:bold">Dense 检索是把 query 和 chunk 都嵌入到同一个向量空间，算余弦相似度来排序</span><span>。它的强项是语义理解——用户问的和文档写的不是同一个词，它也能匹配上。但它的弱点也很明显：对精确关键词不敏感。比如用户查一个很具体的配置项名称，像 text-embedding-3-small 这种，语义向量可能会把它和一堆"嵌入模型"相关的段落混在一起，排序并不可靠。</span></p>

<p id="f-doxcnBNiSfhTWFdbQrSydACy0hb"><span style="font-weight:bold">Sparse 检索走的是 BM25 + 倒排索引这条路，本质是词频匹配</span><span>。它对精确关键词、专有名词非常敏感，你搜 text-embedding-3-small，只要文档里出现了这个词，它就能精准命中。但它的短板是不理解语义——用户如果问"怎么把文档灌进系统"，文档里写的是"ingestion pipeline"，BM25 根本匹配不上，因为一个中文一个英文，词完全不一样。</span></p>

<p id="f-doxcnzB62YLbYTc7FzoRYiRk4ye"><span>所以在该学习案例里，混合检索就是同时跑两条路：DenseRetriever 用 embedding 做语义搜索，SparseRetriever 用 BM25 做关键词搜索，然后用 RRF把两路结果合并成一个统一排序。RRF 的好处是它只看排名不看分数，不需要对两路完全不同量纲的分数做归一化，实现简单又稳定。</span></p>

<p id="f-doxcnjH2Mkjsvu0Cv3PYj0HBkmc"><span style="font-weight:bold">Q2: 是因为业界都这么做吗？</span></p>

<p id="f-doxcnZ9C03JdAxXIHQIhNGA56Te"><span>(怎么感觉有点压力测试的感觉，一路确实不行啊，可以认为上面的Q1的回答就已经回答了这个问题，不过既然他要问，我们就回答吧）</span></p>

<p id="f-doxcnBv0UisZHDjw2SCHa2CAaeg"><span>不完全是。业界确实普遍采用这个方案，Elasticsearch 8.x 加了向量搜索也是走的混合路线，各大 RAG 框架也都推荐这么做。但该学习案例里选择混合检索更多是从实际问题出发的：我们面对的文档既有大量专有名词和代码标识符（BM25 擅长），又有很多自然语言描述和同义表述（Dense 擅长），单一路径的召回率确实不够。而且我们在设计上做了 Graceful Degradation——如果任何一路出错或超时，系统会自动降级到另一路继续工作，不会整个检索挂掉。这个容错能力也是混合架构额外带来的好处。</span></p>

<a id="f-doxcns8qNMEN0JUDCRoMPThtmdZ"></a>

###### 检索召回部分的 TopK 选的多少？为什么？

<p id="f-doxcnyDTZxtHj62MTBrOYZRKj9e"><span style="font-weight:bold">第一层是 Dense 和 Sparse 各自的召回阶段</span><span>，TopK 都设的 20。 这一层的目标是"宁可多捞，不要漏掉"，因为这一步的成本很低——Dense 就是一次向量相似度查询，Sparse 就是一次 BM25 倒排索引查找，速度都很快。设 20 是因为我们测试下来，大部分查询的相关文档基本在前 20 条以内就能覆盖到了。如果设太小比如 5 或 10，有些相关文档可能在其中一路排名靠后就被截断了，后面融合也救不回来；设太大比如 50、100，虽然召回更全但会给后续的融合和 Rerank 带来不必要的计算开销。</span></p>

<p id="f-doxcn6jEQ3VLwA6nKbzVl1fRG6d"><span style="font-weight:bold">第二层是 RRF 融合之后，TopK 设的 10</span><span>。 Dense 返回 20 条，Sparse 返回 20 条，两路合并去重后可能有 30 多条，经过 RRF 融合排序后只取前 10。这一步相当于把两路的结果做了一次交叉验证——如果一个文档在两路都排得靠前，融合分数会很高；如果只在一路出现，也不会被丢掉但排名会相对靠后。取 10 条是给下一步 Rerank 一个合理的候选池。</span></p>

<p id="f-doxcnZZsL5ajFk2b34ZOHfu5huf"><span style="font-weight:bold">第三层是 Rerank 之后，TopK 设的 5</span><span>。 这一步会用 Cross-Encoder 对这 10 条候选逐一和 query 做精排打分，Cross-Encoder 的精度比双塔模型高很多，但代价是它需要把 query 和每条文档拼在一起过一遍模型，计算量是线性增长的。所以候选不能太多，10 条进 5 条出是一个比较平衡的选择。最终送给大模型生成答案的就是这 5 条最相关的文档。（其实代码用的llm Rerank，不过扩展cross-encoder很好扩展，cross-encoder也是常考的rerank模型，有余力可以深入了解）</span></p>

<p id="f-doxcnEGyymL8vT6zhxUKygYrpOb"><span>为什么是 20→10→5 这个比例？ 核心思路就是"</span><span style="font-weight:bold">粗筛多召回、精排少而精</span><span>"。前面的阶段计算便宜，多拿一些保证召回率；后面的阶段计算贵但精度高，逐步砍掉不相关的，最终给到 LLM 的上下文窗口里塞的都是高质量内容。这也避免了把太多文档塞进 prompt 导致 token 浪费和注意力稀释的问题。</span></p>

<a id="f-doxcn3nfhvkuZYddykdCY3Om2vh"></a>

##### 字节一面

<p id="f-doxcnAlozegnJTf5EjTvRbqGsmD"><span>这个面试官就没有问那么细，也确实不是所有面试官都能问那么细。3.3那个面试官问那么细，问这个项目估计都得花20分钟。所以你要是准备好项目，整个面试60分钟的话，这个项目问题答得好，你已经成功了1/3了）</span></p>

<div style="margin-left:25px"><h5 id="f-doxcnWmKfr4A8efVfHukYCMIKad"><span>3.3.4.1 项目背景，为什么要做这个系统？</span></h5><p id="f-doxcnrlw4Eftru8GAE3cBCVk3Xe"><span>（结合着自己场景编吧，可以参考这个模板）</span></p><p id="f-doxcnRWmDoW4tu6wiOLoOuCpzRh"><span style="font-weight:bold">核心回答框架（三段式：场景痛点 → 现有方案局限 → 解决思路）</span></p><p id="f-doxcnHGq9K2PYrXftCE94O4W4xf"><span style="font-weight:bold">场景痛点（为什么要做）</span></p><p id="f-doxcnuUEhq0InovchKkckk3V61d"><span>我们xx 平台开发团队，日常涉及的版本发布信息非常多样——Release Notes、变更日志、补丁公告、兼容性说明、架构文档等，而且这些信息</span><span style="font-weight:bold">分散在多个系统</span><span>里：内部 Wiki、文档仓库、Bug 系统、邮件通知等。工程师排查版本差异或回答客户问题时，经常需要</span><span style="font-weight:bold">跨系统翻找</span><span>，效率很低，而且容易遗漏关键信息。</span></p><p id="f-doxcnTZgg4FdGf8cHuzqEBz9UPc"><span style="font-weight:bold">现有方案的问题（为什么不用现成的）</span></p><p id="f-doxcnsgkVMPLX9Mk2RhFh9P7a7b"><span>我们其实尝试过直接用 Copilot / 通用 RAG 框架，但遇到几个核心问题：</span></p><div id="f-doxcnEEjad84rbGOsTeCljDHDnt" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">数据源多且异构</span><span>：我们有多个独立的知识库和文档系统，通用工具很难做好统一的索引和检索，召回率不够。</span></div></div><div id="f-doxcnVhLF6t0hkPAMZ0KqU8H68c" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">针对性不足</span><span>：通用方案对我们团队的特定术语、文档结构、查询模式没有做优化，检索精度不够，返回的内容经常不是工程师真正需要的。关键问题的命中率不到 50%。</span></div></div><div id="f-doxcnY5Bp1MrsgClMJERQhhoPcg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">过程黑盒</span><span>：传统工具你只能看到最终结果，不知道它检索了什么、排了什么序、为什么给你这个答案。出了问题没法调试，也</span><span style="font-weight:bold">无法针对性地优化</span><span>。</span></div></div><p id="f-doxcnWmXr4z3WlzPMgvoz8qe38g"><span style="font-weight:bold">针对性解决方案（问题 → 改进一一对应）</span></p><p id="f-doxcnNJFDNsoLfpuV5C9Rrhi1Dg"><span>所以我们决定自己构建一套面向团队场景定制的 RAG 系统，</span><span style="font-weight:bold">针对上面三个问题分别做了改进</span><span>：</span></p><p id="f-doxcnzJTYND0qzc0Kv078zsZW0c"><span style="font-weight:bold">针对"数据源多且异构"</span><span> → 自建 Ingestion Pipeline，自主控制数据源</span></p><div id="f-doxcnqiXq11wOCjAqeVnwcYLCCf" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>不依赖通用框架预设的信息源，而是</span><span style="font-weight:bold">自己定义文档来源和处理流程</span><span>。设计了 6 阶段 Ingestion Pipeline，把团队散落在各系统的文档统一采集、解析、切分、向量化后存入同一个检索库，数据源完全可控</span></div></div><p id="f-doxcn52l0jeiFbqIyXjCwhyDVih"><span style="font-weight:bold">针对"针对性不足"</span><span> → 两段式混合检索 + 精排</span></p><div id="f-doxcnQj3VxhQVMuxp0PQfyt0EQh" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>通用方案只用单路 Dense Embedding，对专有术语（版本号、API 名称）匹配差。我们做了 </span><span style="font-weight:bold">BM25 + Dense 混合粗排</span><span>兜底关键词匹配，再加 </span><span style="font-weight:bold">Cross-Encoder 精排 Rerank</span><span> 二次排序，把真正相关的内容推到前面</span></div></div><p id="f-doxcnpgrfNqmQNvL41tLNGtveDc"><span style="font-weight:bold">针对"过程黑盒"</span><span> → 全链路可观测 + 自动化评估</span></p><div id="f-doxcnTV1Dq4r17jY2lwoN1hgvKg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>搭建了 </span><span style="font-weight:bold">Streamlit Dashboard</span><span> 可视化每次 Ingestion 和 Query 的完整 Trace（每阶段输入输出、耗时），集成 </span><span style="font-weight:bold">Ragas 评估框架</span><span>做回归测试，改了策略能立刻量化效果变化</span></div></div></div>

<div style="margin-left:25px"><h5 id="f-doxcnEBHx4vlZzOfjrtAkLExCEd"><span>3.3.4.2 图片处理怎么设计的？</span></h5><p id="f-doxcnNmWIQODpQAES2pWa2ijoCb"><span>（没啥好说的吧，这个属于介绍你的项目了，很简单的问题）</span></p><p id="f-doxcnLXWaOAsvBkuAwc1D3Rd0ih"><span>我们的文档里有大量的架构图、流程图、截图，用户搜索的时候经常需要"搜文字能出图"。我的做法是 </span><span style="font-weight:bold">Image-to-Text</span><span>，就是把图片转成文字描述，然后复用纯文本的 RAG 检索链路，不引入 CLIP 这样的多模态向量库。</span></p><p id="f-doxcnipfIYJ4W73WNVCNQffxJwf"><span>整个流程跟着 Ingestion Pipeline 走。</span><span style="font-weight:bold">首先是图片提取</span><span>，在解析 PDF 的时候，用 PyMuPDF 逐页把图片提取出来存到本地，同时在文本中插入一个 </span><span><span><span>[IMAGE: image_id]</span></span></span><span> 的占位符，并且在 metadata 里记录这张图的 ID、路径、页码等信息。</span></p><p id="f-doxcnkFO5ftvDxO8GhEumWvv9re"><span style="font-weight:bold">然后是生成描述</span><span>，在 Pipeline 的 Transform 阶段，有一个 ImageCaptioner 组件会扫描 chunk 里的图片占位符，对每张图调用 Vision LLM（比如 GPT-4o）生成一段文字描述。生成的描述会追加到占位符后面嵌入 chunk 文本中，这样后续向量化的时候图片的语义就自然包含在内了。</span></p><p id="f-doxcnf1Ne8IEmmJA7essg6qY1ne"><span style="font-weight:bold">生成的 Caption 会跟 chunk 文本一起做向量化</span><span>，Dense + Sparse 双路编码，完全复用现有的文本检索链路，不需要额外的多模态向量库。</span></p><p id="f-doxcnNy4Vo9HZDGw970Fr8hpMwc"><span style="font-weight:bold">最后在检索返回的时候</span><span>，有一个 MultimodalAssembler 组件，从命中的 chunk metadata 里提取图片引用，把图片读出来做 Base64 编码，按 MCP 协议组装成文本+图片+描述的混合内容块返回给客户端。</span></p><p id="f-doxcnPsst81h54CrVkQHxwlDwpg"><span style="font-weight:bold">追问：为什么不用 CLIP / 多模态向量？</span></p><p id="f-doxcn8pv04HQyOk0vC5esLcS3K7"><span>CLIP 更适合"以图搜图"的场景，但我们的需求是"用自然语言搜文档里的图"。用 LLM 生成 Caption 有个很大的优势：它能理解图表里的</span><span style="font-weight:bold">逻辑关系和具体数据</span><span>，比如流程图里的步骤顺序、表格里的数值对比，CLIP 只编码视觉特征，对这类语义理解比较弱。而且 Image-to-Text 方案不需要引入额外的向量库，架构更统一，运维也更简单。</span></p></div>

<div style="margin-left:25px"><h5 id="f-doxcnF3IgboA5ku9tL7aBWlINje"><span>3.3.4.3 怎么做端到端测试？方便做吗？</span></h5><p id="f-doxcnRhhPzEROK9X8NuW2xbGzGf"><span>（这个结合ragas来答吧，其实rag有很多评估方法，但是ragas最简单，不用准备数据集，讲别的还得讲如何准备数据集。一般来对于大部分场景，答ragas的评估也够用了。）</span></p><p id="f-doxcnmeFl40uw1ve9mp0NuPBS0e"><span>我们的端到端测试主要是做</span><span style="font-weight:bold">检索质量的回归测试</span><span>。做法很简单：准备一批典型的 query list，然后直接跑系统，每条 query 走完整的 RAG 链路——检索、重排、生成，跑完之后收集日志，汇总指标做对比。</span></p><p id="f-doxcn0QRvhTplrnqyHbf4nYOfVc"><span>具体来说，评估质量用的是 </span><span style="font-weight:bold">Ragas 框架</span><span>。Ragas 的核心思想是 </span><span style="font-weight:bold">LLM-as-Judge</span><span>，就是用一个 LLM 来自动评判 RAG 系统输出的质量，不需要人工标注。它从三个维度打分：</span></p><div id="f-doxcn59vm20MTM6upgS1viGpYyr" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">Faithfulness（忠实度）</span><span>：回答有没有编造。做法是把回答拆成多个陈述句，逐条检查每句话能不能在检索到的上下文里找到依据，找不到的就是幻觉。得分 = 有依据的陈述数 / 总陈述数。这个指标卡住的是</span><span style="font-weight:bold">生成环节</span><span>有没有乱编。</span></div></div><div id="f-doxcnQNTRg9y5xbhjf0R2TOD0Nd" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">Answer Relevancy（回答相关性）</span><span>：回答跟问题相不相关。做法是从回答反向生成几个"可能的问题"，算这些生成问题和原始问题的语义相似度，相似度越高说明回答越切题。这个指标卡住的是</span><span style="font-weight:bold">最终回答</span><span>有没有答非所问。</span></div></div><div id="f-doxcn5LG6fbR3HGRU7j16RaKYNh" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">Context Precision（上下文精度）</span><span>：检索到的内容有没有用。检查返回的每个 chunk 是否跟问题相关，排在前面的越相关分越高。这个指标卡住的是</span><span style="font-weight:bold">检索环节</span><span>有没有把无关内容混进来。</span></div></div><p id="f-doxcnCiQyYBtQxdlcH5Rouslb9c"><span>除了 Ragas 的三个质量指标，我们还会记录</span><span style="font-weight:bold">性能指标</span><span>：端到端延迟（从发出 query 到拿到完整回答的总耗时），以及各阶段的耗时（检索耗时、重排耗时、生成耗时），因为系统本身有全链路 Trace，每个阶段的输入输出和耗时都会记录在日志里。</span></p><p id="f-doxcnameFRZdvJTPeKgW2IqNvVg"><span>每次改了策略（比如换了 chunking 方式、调了 embedding 模型、改了 rerank 参数），就重新跑一轮同样的 query list，对比前后的指标变化，看质量有没有掉、延迟有没有涨。设好阈值做回归门控，比如 Faithfulness ≥ 0.7、P95 延迟 ≤ 5s，低于阈值就报警。</span></p></div>

<a id="f-doxcnfPbHavyNHx1qFWeU03ok9e"></a>

##### 百度二面

<blockquote id="f-doxcnrTnV8puoEyAWIl7EIlAuLd"><p id="f-doxcn6531eDMuv3sVXyFDiknFed"><span>谢谢这个朋友再次给我投稿，笔记内容的3.5和3.6部分就是这个朋友给我投的稿。3.4~3.6都来自于这位朋友，而且这四个面试素材都是大厂）</span></p></blockquote>

<a id="f-doxcnXqFt9AuUF9r3ugV7yfPhce"></a>

###### 考虑性能优化了吗？项目中哪些地方可以优化？

<blockquote id="f-doxcnsNqZqxoQvW6FUsbsx2dNUb"><p id="f-doxcnfbfSIvJhRPpUn5JREGfj8b"><span>这个问题也没有标准的答案。我总结了项目中一些对于性能优化的地方，比如整个操作做异步处理比如计算embedding块的时候，是批处理的。比如跳过重复计算hash，懒加载这样可以让客户端连接mcp server会快一些，另外就是所有的环节都有耗时记录，这无非也是我们对性能的考虑. </span></p>
<p id="f-doxcnuqDeqzzKp5vbVYEpZQnnEf"><span>优化这一块。</span></p></blockquote>

<p id="f-doxcnQzV12QRvp8hWOAXzzXM6cb"><span style="font-weight:bold">参考回答：</span></p>

<p id="f-doxcn3nAIKKzmZ2rKkPSIdYjXsd"><span>有的，该学习案例里从几个维度都做了性能考虑。</span></p>

<p id="f-doxcn5vPgD8qrG7ClaifUuxCLHg"><span style="font-weight:bold">第一，异步化阻塞调用。</span><span> MCP Server 的工具处理层全部是异步实现的，但底层的向量检索这些库本身是同步的。我把这些同步操作卸载到线程池去执行，这样事件循环在等待期间可以继续处理其他请求，不会被阻塞住。</span></p>

<p id="f-doxcn42dxubrhKmxNyn5Ztg5WYf"><span style="font-weight:bold">第二，批处理降低 API 调用次数。</span><span> Ingestion 流水线里本案例设计了两层架构专门处理批量 Embedding。先把所有分块的文本收集起来，再按可配置的批大小分批调用 Embedding API，把 N 次网络往返降为几次。批大小做成配置化而非硬编码，是因为不同 Provider 的限频策略差异很大，配置化可以不改代码直接调整。同时每批次都记录了耗时指标，通过 Trace 上报，方便定位瓶颈。</span></p>

<p id="f-doxcn8A5WxCuGbKqOuLHH1dWerc"><span style="font-weight:bold">第三，增量处理跳过重复计算。</span><span> 每次入库前先对文件做哈希校验，已经处理过的文件直接跳过整条流水线。这对重复上传或增量更新的场景非常关键，尤其是流水线里有 LLM 增强这种耗时步骤时，跳过的收益非常大。</span></p>

<p id="f-doxcntHgSPcUvfXWp3GWW4WRm6d"><span style="font-weight:bold">第四，懒加载控制资源占用。</span><span> Embedding 和 VectorStore 都通过工厂模式按需初始化，不在进程启动时把所有模型全加载进来，启动速度快，内存占用也更可控。</span></p>

<p id="f-doxcnMv5KaVrCuf5F32QdFovGKh"><span style="font-weight:bold">第五，Trace 监控定位瓶颈。</span><span> 流水线每个阶段都接入了 Trace 记录耗时，发现性能问题时可以直接看数据定位是哪个阶段慢，为后续优化提供数据依据。</span></p>

<p id="f-doxcniMV22KE6vMJISsRUDCcv2c"><span>我还想到两个目前没做但值得做的优化方向。</span></p>

<p id="f-doxcnLy4dvGE6fE703bRSSp1JMg"><span style="font-weight:bold">第一，查询结果缓存。</span><span> 现在每次查询都完整走一遍 embedding → 向量检索 → rerank，重复查询每次都在重复计算。可以在查询层加一个 LRU + TTL 缓存，以查询文本、集合名、返回数量作为 key，命中缓存直接返回，整条链路全部跳过。</span></p>

<p id="f-doxcnxNZDir5jUa9VKzpQvccFib"><span style="font-weight:bold">第二，把增量跳过的粒度从文件级下沉到分块级。</span><span> 现在只要文件哈希变了，整个文档就全部重新分块、重新算 Embedding。但如果一个大文档只改了一小段，绝大部分分块内容其实没有变化，全部重算很浪费。改进思路是用内容哈希作为分块 ID，文件变了之后照常重新分块，然后批量查哪些分块已经存在，只对新增或修改的分块调 Embedding API，同时清理掉旧版本多余的分块。这样 Embedding 调用量就从跟总量成正比，变成只跟变更量成正比。</span></p>

<a id="f-doxcnn4d3IlvwYdvRWUcQP76ZYc"></a>

###### 对系统吞吐量做过测试吗？QPS / TPS 是多少？

<blockquote id="f-doxcnQafTnISrcLxPiPWPAmWLeg"><p id="f-doxcngljDnjJdeLK0Usg2ZhqG2g"><span>这个问题就是问你有没有考虑过一秒钟整个系统能处理多少次查询？有没有考虑过。因为我们目前项目还是单机，不涉及多个客户端查询，很难出现并发查询的场景，这里更多是从串行角度上算性能，分析QPS，计算瓶颈。其实在后面那个问题如果是做成生产项目的时候，要做什么处理提到了，可以变成远端server，通过http让多个客户端请求，这时QPS的计算就要考虑并发了。</span></p>
<p id="f-doxcn8bbeCFQl61PpvjXbbcjVKc"><span>这里我说上面的内容只是为了让大家清楚有这么一回事，你自己回答的时候，没必要提出什么并发，什么部署到server，这样不是主动暴露自己做得不够深入吗？我们不主动揭自己的短。</span></p></blockquote>

<p id="f-doxcn69PptbA6zxeGOQ3M1OlRr0"><span style="font-weight:bold">参考回答：</span></p>

<p id="f-doxcn3lfjNHBYQgphEELD48UOCe"><span>测过，本案例做了两轮测试，一轮测本地管线吞吐，一轮测端到端吞吐，目的是通过控制变量定位瓶颈在哪。</span></p>

<p id="f-doxcnYTOqyyDBXAw713kfI2x9Hd"><span style="font-weight:bold">第一轮，本地管线吞吐。</span><span> 本案例用 Mock Embedding 替代真实 API，隔离掉网络变量，往数据库注入合成数据，然后反复跑查询，走完整的向量检索 + BM25 + RRF 融合。测出来本地管线的 </span><span style="font-weight:bold">QPS 大概 58</span><span>，单次查询十几毫秒就完成了。</span></p>

<p id="f-doxcnSUZNNzzyp9pdRDIh1owfen"><span style="font-weight:bold">第二轮，端到端吞吐。</span><span> 接上真实的 OpenAI Embedding API，走完整条查询链路。这时候 </span><span style="font-weight:bold">QPS 掉到了 0.56</span><span>，单次查询将近 2 秒。开 3 路并发后能到 </span><span style="font-weight:bold">1.31</span><span>，加速比 2.3 倍。</span></p>

<p id="f-doxcndvEmgzZM5DjmWTMtAK0OSd"><span style="font-weight:bold">两轮一对比，结论就很清楚了：本地管线 QPS 58，加上 API 后变成 0.56，差了 100 倍，99% 的时间花在远程 Embedding API 的网络往返上。</span><span> 所以优化方向如果要优化也很明确：换本地 embedding 模型去掉网络 RTT，或者在 query 增加缓存让重复查询直接命中。</span></p>

<a id="f-doxcnfy7RtZeMVzYUDaMbLWkodc"></a>

###### 能支持用户并发吗？能并发上传文档吗？能并发提问吗？如何实现并发？（设计方案）

<blockquote id="f-doxcnJMMsRCVckWdgxXvfBJKcdh"><p id="f-doxcnqcomkdHzpm4gG846nyKVae"><span>当前项目其实没有做并发上传，但是其实可以做，也不复杂，大家问问AI他都能做。可以如是说，也可以说自己做了，想好是怎么做的就行。这些东西其实就和LLM没太大关系，并发啊，锁啊，这些并发编程的内容，也就是一些开发工程的问题，面试还是偶尔会问。不过像并发编程，线程池，任务队列，锁其实也是属于比较难一点的内容，慢慢理解吧。通过一次次面试，和面试官的讨论去逐渐掌握。</span></p></blockquote>

<p id="f-doxcnxJhBx1HozZ3tVYKvQSLzBc"><span style="font-weight:bold">参考回答：</span></p>

<p id="f-doxcn9TQuaPi6EQna2CySWFPnFg"><span style="font-weight:bold">能并发提问吗？</span></p>

<p id="f-doxcn6vJ97cudckfe0pRRGP6oIV"><span>能。MCP Server 基于协程架构，多个查询请求在同一个事件循环里并发调度，互不阻塞。底层的向量检索、BM25 检索等同步操作被卸载到线程池执行，不占用事件循环。查询内部的 Dense 和 Sparse 两路检索也是并行执行的，而非串行等待。</span></p>

<p id="f-doxcnb053xnQxazYQFd9Oib0QUh"><span style="font-weight:bold">能并发上传文档吗？</span></p>

<p id="f-doxcnEoAa7TlvHLpfpndD8d4E5b"><span>单文档内部是并行的——每个 chunk 的 LLM 处理（精炼、元数据增强、图片描述）通过线程池并发执行。但多文档之间目前是串行的，一个处理完再处理下一个。当时做这个决策主要考虑两点：一是 </span><span style="font-weight:bold">BM25 倒排索引的并发安全问题</span><span>——它是基于 JSON 文件存储的，每次添加文档需要"加载全量索引→合并新数据→全量重建→写回磁盘"，这个过程不是原子的。如果两个文档并行处理，线程 A 加载旧索引并修改保存的同时，线程 B 也加载了同一份旧索引并修改保存，B 就会覆盖 A 的结果，造成索引数据丢失。要解决这个问题要么加锁（降低并行收益），要么用数据库替代 JSON 文件（改造成本较高）</span></p>

<p id="f-doxcnupnXbVPiKWG52BM1HEMzUc"><span style="font-weight:bold">如何实现并发上传？</span></p>

<p id="f-doxcn33EAAb414SbUNgaQGQABaf"><span>在现有的协程架构上加一层异步任务队列即可。每个文件的上传请求作为一个任务入队，多个协程/线程消费者并发执行 Ingestion 流水线。关键要解决 BM25 索引的并发安全问题，有两个思路：一是在 BM25 写入操作上加互斥锁，保证同一时刻只有一个线程在做索引重建；二是改造 BM25 为增量更新模式，用数据库（如 SQLite FTS5）替代 JSON 文件，从根本上消除非原子操作。</span></p>

<a id="f-doxcnEYAkN30O6BSi28BHYpsUoc"></a>

###### stdio / stdout 安全性

<blockquote id="f-doxcnw0wL560JtHybSxUqKzSQL4"><p id="f-doxcnj05zISV5yc3PtZgwTwvSdb"><span>注意这里要理解一下mcp 使用stdio/stdout通信这个协议的一些要求。这个其实在笔记：其他问题部分：</span><span>2.2 MCP连接偶尔失败部分</span><span> 我以这个问题为例子，写了个答案。 这个问题的背景是，使用MCP协议，这个stdio模式的stdout就是留给了mcp客户端和服务端去通信，我们不该往里面写数据，要不会导致连接问题。这个知识是这个回答的前置知识。</span></p>
<p id="f-doxcnx2KFErbqVl4k6XgEeZYorc"><span>有了这个知识要考虑的就是数据安全，作为一个mcp server，我们不应该暴露key，暴露用户数据，要对数据脱敏。</span></p></blockquote>

<ul><li id="f-doxcntAppdUrVdj9sDYNrhEKi3f"><span>MCP Server 使用 stdio/stdout 作为传输层，是否安全？</span></li></ul>

<ul><li id="f-doxcnq3NrSBZ3fguYtz09REMc5e"><span>会不会有敏感字段泄露的风险？</span></li></ul>

<p id="f-doxcnC6ls6KE0K7FnxGmY81OaId"><span style="font-weight:bold">参考回答：</span></p>

<p id="f-doxcnTXrQab6RtyqAgwHXrpf8re"><span style="font-weight:bold">是否安全？</span></p>

<p id="f-doxcnQT1qIK8j5tvy9MnrhqWtTd"><span>安全的。stdio 模式下，Server 作为子进程被 Host（比如 Claude Desktop）拉起，stdout 是两个本地进程之间的匿名管道（anonymous pipe），不经过网络，没有端口暴露，外部进程无法直接访问这条管道，安全边界等于"本机当前用户的进程权限"。第三方进程想往这条 pipe 注入数据几乎不可能；所以 stdio/stdout 本身不存在太大的安全风险。</span></p>

<p id="f-doxcnLFiEcE1nI9qziI4XDXVhBf"><span style="font-weight:bold">会不会有敏感字段泄露？</span></p>

<p id="f-doxcnDcubygUSZI6dcYAGQrJAZg"><span>需要在两条输出流上分别控制。设计 MCP Server 时，stdout 和 stderr 的分工是主动划定的：stdout 是协议专用通道，stderr 是日志专用通道。</span></p>

<p id="f-doxcnMSkrxVlkWgmuqiXHgnpJ6g"><span>stdout 方面：协议消息的格式由 MCP SDK 负责，我们不碰，但消息里携带的内容是 tool handler 的返回值决定的。所以要控制 handler 不把异常堆栈、配置对象、文件路径这些内部信息返回出去，遇到错误统一返回结构化的错误描述而不是原始异常。另外 Python 默认的 logging 和 print 都走 stdout，需要在 Server 启动最早期就把所有日志重定向到 stderr，防止日志内容污染协议通道。</span></p>

<p id="f-doxcnjzBLb0clvbtZRP3Z4Oq0zc"><span>stderr 方面：日志走 stderr，但 stderr 会被父进程继承，可能被 Host 记录到日志文件里。所以日志中对 API Key 等凭据要做脱敏处理，只打印前几位做确认，不记录完整值。</span></p>

<a id="f-doxcnBZ0HCnLH7CYEikSQUOJOgd"></a>

###### 如果该项目要真正落地投入生产，还需要做哪些工作？

<blockquote id="f-doxcnz4QTpG4TAN1hidOIefaAig"><p id="f-doxcnadkutMhUFU77XBTKSRklpd"><span>这个也没有什么标准答案，答案是基于一些项目经验回答的。真正生产项目比如对错误处理，对于安全合规，以及部署肯定都是有更高要求的。比如说我们写项目这个key是存在本地，但是通常生产级别项目的key是存在专门的server端，比如通过云厂商托管服务，AWS Seceret manager + STS通过现成的技术框架来实现鉴权，key是不会放在自己工程中的。</span></p>
</blockquote>

<p id="f-doxcniyKGtQYKA6cxf67W1R72ub"><span style="font-weight:bold">参考回答：</span></p>

<p id="f-doxcn3vm7KkVKsx75odA0OL1JPc"><span>主要从三个维度：</span><span style="font-weight:bold">容错加固</span><span>（让 LLM 调用不会因为单次失败就崩）、</span><span style="font-weight:bold">安全合规</span><span>（密钥不落地、日志脱敏、操作留痕）、</span><span style="font-weight:bold">部署运维</span><span>（从本地 stdio 模式切到远端 HTTP 服务，Docker + K8s + CI/CD 自动化）。</span></p>

<p id="f-doxcnNiBaUtM1RsBKr3VKfVZYmh"><span style="font-weight:bold">第一，LLM 调用层的容错加固。</span><span> 目前项目的 LLM 调用是"单次尝试"——API 超时或返回 429 就直接失败了。生产环境必须加 </span><span style="font-weight:bold">指数退避重试</span><span>：429 限频等 30 秒后重试，5xx 服务端错误指数退避，不可恢复的错误（如 401 鉴权失败）立即终止，不浪费重试次数。重试上限可以认为 10 次比较合理。</span></p>

<p id="f-doxcn0D8WVvL6BEN1sDdZTxHlWc"><span>另外需要加 </span><span style="font-weight:bold">速率限制</span><span>，控制每分钟请求数和并发队列深度，避免突发流量打爆 Provider 配额。</span></p>

<p id="f-doxcnToSW8mduCLMWjSAQW9a8lg"><span style="font-weight:bold">第二，安全与合规。</span><span> 目前 stdout/stderr 分离和错误信息脱敏做了一些，但生产环境还需要：</span></p>

<p id="f-doxcnQ53JU4JLYJ80f0pOVGXibc"><span>- </span><span style="font-weight:bold">认证体系</span><span>：目前 API Key 明文写在配置文件里，生产环境不能这么做——配置文件可能泄露、误提交 Git、运维人员都能看到。解决方案是接入统一的密钥管理服务，服务自己不保管任何密钥，每次需要时向密钥管理服务申请一个临时凭证，用完自动过期。这样代码和配置里彻底不出现密钥，即使临时凭证泄露影响也极小，密钥轮换只需要在管理服务侧操作，不用改代码重新部署。</span></p>

<p id="f-doxcn04tiYhH2g5VM8NR43aPm4b"><span>- </span><span style="font-weight:bold">合规日志审计</span><span>：给数据分级，区分"公开"和"敏感"两类。公开数据正常记录（如"用户查询了 default 集合"），敏感数据（用户问题内容、文档内容、人名金额等）在日志中自动脱敏打码。同时所有操作（谁在什么时间上传了什么文档、查询了什么）必须完整留痕，存到统一的审计系统。</span></p>

<p id="f-doxcnKWy7eBenRLCL0HZ05Fwc6f"><span>- </span><span style="font-weight:bold">输入校验</span><span>：对用户上传的文档做大小限制、格式白名单，防止恶意文件触发异常。</span></p>

<p id="f-doxcnvUq3C1CdDtvVx7vWvD1VpX"><span style="font-weight:bold">第三，部署与运维。</span><span> 目前项目用的是 stdio 本地模式，Host 拉起子进程，只服务单个用户。如果要投入生产服务多用户，首先需要把传输层从 stdio 切换到 HTTP/SSE，让 MCP Server 变成一个可以通过网络访问的远端服务。一旦变成网络服务，就需要用 Docker 把服务和所有依赖打包成镜像，保证环境一致性，镜像不可变，回滚只需切回上一个版本。然后用 K8s 做编排，负责自动调度、水平扩缩容、实例故障自动重启、滚动更新零停机。最后搭建 CI/CD 流水线，代码推送后自动跑测试、构建镜像、部署到 K8s，全程自动化。</span></p>

<a id="f-doxcnve2dShxQr2N1oEuit6VsJL"></a>

##### 京东一面

<a id="f-doxcnKmEDSFPoCs8ML6h5iGexGd"></a>

###### 统计过项目的代码量吗？ 用 AI (Vibe Coding) 辅助开发消耗了多少 token？

<blockquote id="f-doxcnEiVMTGSWd6FJ48koLNgseh"><p id="f-doxcnpgjsKpx4tQhxyFsXWtILTm"><span>本案例用AI帮大家统计了一下该学习案例代码。也是个5w行代码级别的项目了。要是搁着原来，这项目不知道得写多少天，现在竟然是本案例用2个月下班时间让AI写完的。</span></p></blockquote>

<p id="f-doxcnXJCtdhlvszVmBnLfxkx1uf"><span>代码量已做过统计（排除 .venv、</span><span style="font-weight:bold">pycache</span><span> 等非业务文件）：</span></p>

<ul><li id="f-doxcndGWZTTFEXdqI5HSbXZwrCf"><span>Python 源码：198 个文件，47,433 行</span></li></ul>

<ul><li id="f-doxcnlcYCz8B39uY25RRbmpp8th"><span>Markdown 文档：51 个文件，13,014 行</span></li></ul>

<ul><li id="f-doxcnVUqCQMejTna0uRnvfTliAe"><span>YAML 配置：2 个文件，196 行</span></li></ul>

<ul><li id="f-doxcnDRnYUoUN88o24jCrufXvWd"><span>TXT 提示词：5 个文件，78 行</span></li></ul>

<ul><li id="f-doxcnW3qOi7sor81iS5tlnn2Zod"><span>TOML 项目配置：1 个文件，72 行</span></li></ul>

<p id="f-doxcnD5ftlLEI559nexCHI7E6be"><span>- </span><span style="font-weight:bold">合计：257 个文件，约 6 万行</span></p>

<p id="f-doxcnmJQThXfNLedY2at7JQDcUe"><span>纯业务代码（Python）</span><span style="font-weight:bold">198 个文件，约 4.7 万行</span><span>，含文档总量约 </span><span style="font-weight:bold">6 万行</span></p>

<ul><li id="f-doxcnlqol4OyAW5MmpSBm2wAOpe"><span>平均每文件约 240 行，架构分层清晰（</span><span><span><span>core</span></span></span><span> / </span><span><span><span>ingestion</span></span></span><span> / </span><span><span><span>libs</span></span></span><span> / </span><span><span><span>mcp_server</span></span></span><span> / </span><span><span><span>observability</span></span></span><span>）</span></li></ul>

<p id="f-doxcn8tKS8JsgCRA2EEiVoykNYd"><span>Token 消耗方面：整个项目使用 GitHub Copilot（Claude Sonnet 模型）进行 Vibe Coding 辅助开发，Copilot 订阅制不直接暴露 token 用量，无法精确统计；但从开发规模来估算，整个项目按照设计文档分为 9 个大阶段、60 个子任务，每个子任务都是一轮完整的"需求对话 → 代码生成 → 测试修复"循环，单次大型功能迭代约消耗数万 token，60 个任务累计预计在 </span><span style="font-weight:bold">数百万 token</span><span> 量级。</span></p>

<a id="f-doxcnPzuEWavGPy3tO7HBIGevbg"></a>

###### 如何评估VibeCoding

<blockquote id="f-doxcn3zYNcmzUTJTrQznI48icKe"><p id="f-doxcnGBmUirj86tF7tpHmoVCWbb"><span>这个问题其实还挺好回答的。spec, 测试，一小步一小步执行都是我们自己的实践。然后加了一个harness工程的思想，harness工程本节里总结的也有，就是如何让AI更好的写代码的思路，加了一些思想进去。之前我做这个项目的时候用的技巧是1，2，4. 现在如果再让我做，我会加入harness工程的思想，随着学习，技巧还是在不断进步的。</span></p></blockquote>

<p id="f-doxcnMHvJOsmwTb66Cu5nhUrykf"><span>总结一下思想：Spec 管设计，Harness 管边界，人工 Review 管意图，测试管底线。</span></p>

<p id="f-doxcnuH2luxXhCNmfYJSaGHGy9c"><span style="font-weight:bold">第一，Spec 先行，AI 只做执行。</span></p>

<p id="f-doxcnkc0EnKB8pqjJBgVqUjmU3z"><span>写代码之前，我在 DEV_SPEC 里把架构全部定好了——9 个阶段、68 个任务，每个任务的接口定义、目录结构、模块交互方式全部写死。AI 的角色是"按图施工"，没有设计决策权。这从源头杜绝了 AI 自由发挥导致的架构混乱。</span></p>

<p id="f-doxcnq9Hlo47Ln4VPx5Vtu8DYLf"><span style="font-weight:bold">第二，Harness 思想约束 AI 行为。</span></p>

<p id="f-doxcnbANJ7CH4OGIMirlZ7mJLKc"><span>三个关键做法：Agent 用完即销毁——每个任务一个独立会话，完成就销毁，防止上下文污染和错误传播。权限边界明确——AI 只能操作 Spec 指定的文件，不允许自行创建模块或修改架构。评判由程序驱动——测试是否通过、类型检查是否干净，全部由 pytest、mypy 等外部工具判定，不让 AI 自查自纠。AI 有幻觉，让它自己评估自己等于考生自己批改试卷。</span></p>

<p id="f-doxcnmDM8G5b0UBuvfXxWSLxQ1e"><span style="font-weight:bold">第三，68 个任务逐一人工审核。</span></p>

<p id="f-doxcnJ7f3KPYTDBk0uM0YpdfTmM"><span>不是让 AI 一口气生成整个项目，而是每完成一个任务就做一次人工 Code Review——检查是否符合 Spec、有无偏离设计意图、边界条件是否覆盖。粒度越细，问题越早暴露，修复成本越低。</span></p>

<p id="f-doxcnfdwts9grAEdsRdyOu5qoTd"><span style="font-weight:bold">第四， 54个测试文件作为硬性底线。</span></p>

<p id="f-doxcnAQnIKI7aB3AOv0qGlxfnje"><span>54 个单元测试、13 个集成测试、4 个 E2E 测试，覆盖从单组件到全链路。每个任务完成后必须跑通相关测试才能提交，跑不过自动修复最多三轮，三轮不过交人工。测试是交付的前提条件，不是可选项。</span></p>

<a id="f-doxcnzjdZBid9i6FZ9jfUG2xqhb"></a>

###### 设计模式八股（工厂，策略）

<blockquote id="f-doxcnBf6Gvua6oUcT2Qbd0ANdnk"><p id="f-doxcnAv27uRyeApP3LeHQFHrd3c"><span>设计模式通常其实也是需要一些工作经验才能慢慢理解的，面试其实问的没那么多，偶尔会出现，可以先不学那么深入，毕竟先学性价比高的。但是你做了该学习案例，用了大量工厂模式，建议最少还是学一下工厂模式。我来给大家总结个工厂模式八股。</span></p></blockquote>

<p id="f-doxcnZ7rJGhVnbw2r7Pqp3XdPyc"><span style="font-weight:bold">参考答案：</span></p>

<p id="f-doxcnZNm53m4v4oZH0iABfhnx2g"><span>工厂模式</span></p>

<p id="f-doxcnqplHrX2kNOfH1FeWCSVb1b"><span>工厂模式的核心思想是把"创建对象"这件事从调用方剥离出来，交给一个专门的工厂来做。调用方只需要告诉工厂"我要哪种类型"，工厂负责返回对应的实例，调用方完全不需要知道具体的实现类是什么、构造函数需要什么参数。</span></p>

<p id="f-doxcnzraWpOvnd45KG28F3aTBGj"><span>它解决的核心问题是解耦。如果调用方直接 new 具体类，那每次换一个实现就得改调用方代码，改一处还好，如果十个地方都在用就要改十处。用了工厂之后，调用方只依赖抽象接口，具体用哪个实现由工厂根据配置决定，切换实现只需要改配置，不动业务代码。</span></p>

<p id="f-doxcn865fkszWevV9ECAUzigUEh"><span>在该学习案例里，LLM、Embedding、Splitter、VectorStore、Reranker 这些组件全部用工厂模式创建。比如 Embedding，配置文件里写 openai 就用 OpenAI 的实现，改成 ollama 就自动切到本地模型，调用方一行代码都不用改。要加一个新的 Provider，只需要写一个新的实现类，在工厂里注册一下就行，已有的代码完全不用动——这就是开闭原则，对扩展开放、对修改关闭。</span></p>

<a id="f-doxcnwzkfuDnalnJFyeobKoT5wc"></a>

##### 快手一面

<a id="f-doxcniYYnaF5sP4aUqgnIVMxsCb"></a>

###### 你的 Index 是怎么做的？

<ul><li id="f-doxcnwOmO52hVnrKeCiZtU18Qzg"><span>粉丝回答：存成了 JSON 格式</span></li></ul>

<p id="f-doxcnkqrdeNX12ptK69aO3t2Nae"><span>- 面试官追问：</span><span style="font-weight:bold">用 JSON 怎么读取？</span><span>（没答上来）</span></p>

<p id="f-doxcn28AbEkXC7LT5XaI9ZwIAqc"><span>- 面试官评价：</span><span style="font-weight:bold">不存数据库或者不建立索引应该是不对的。现在这样用 JSON，读取和更新都很麻烦，会 OOM 或者时间太长。</span></p>

<blockquote id="f-doxcnMKM2RJ9eQ4g6EH3UBquRKe"><p id="f-doxcnucDGjHmoUsW25xrCghEp1d"><span>技术问答案例的上下文有限。这个Index索引我不知道指的是稠密向量还是稀疏向量的索引。稠密向量的索引我们用的ChromaDB的HNSW，稀疏向量用的自建的BM25倒排索引，存成JSON。我猜测他们是在聊后者，但是估计前面一个问题是先问我们同存了哪些数据的。所以这里先给个前置问题的解析。 另外针对于这个问题，我们本身存成JSON格式，也是用了索引的，可以和面试官解释。具体讲解我放在下面的答案里。</span></p></blockquote>

<p id="f-doxcn4OYojtj7vQUJvEgXUjaymf"><span style="font-weight:bold">（前置问题）你的 RAG 系统都存了哪些数据？怎么存的？</span></p>

<blockquote id="f-doxcnCQA1xy3lPiVyxyQiJ8SJUh"><p id="f-doxcnWzvEgSgaEqmgaS9JF4ghfg"><span>其实作为RAG系统最核心的问数据存了啥，其实就是下面的2和3，稀疏向量和稠密向量怎么存的，或者可以带上4，毕竟我们是支持图片检索的系统。</span></p></blockquote>

<p id="f-doxcnsvnsZIEKssI0SfmKMPidLd"><span>该学习案例共有 5 块存储：</span></p>

<ol start="1"><li id="f-doxcn1hmQqBu7ORrZ2ZHtvbtYGd"><span style="font-weight:bold">文件指纹库</span><span>（SQLite）— 存文件 SHA256 和入库状态，负责幂等控制，防止同一文件重复入库。</span></li></ol>

<ol start="2"><li id="f-doxcnIvBCeNWD5mUVIzfMrmawhg"><span style="font-weight:bold">Dense 向量库</span><span>（ChromaDB，底层 SQLite + hnswlib）— 存原文 + 向量 + HNSW 图索引，负责语义相似度检索。</span></li></ol>

<ol start="3"><li id="f-doxcnGxwuNcfZft9xyW3a1ydpxd"><span style="font-weight:bold">BM25 倒排索引</span><span>（JSON 文件）— 存倒排表（term、tf、idf、doc_length），负责关键词匹配检索。</span></li></ol>

<ol start="4"><li id="f-doxcnxIQBrdnw7oJTwkD89EANsb"><span style="font-weight:bold">图片资源库</span><span>（文件系统 + SQLite）— 存图片二进制 + 元数据索引，负责多模态图片检索。</span></li></ol>

<ol start="5"><li id="f-doxcnKPb74aeQ3mjWYq6TlhVbJb"><span style="font-weight:bold">Trace 日志</span><span>（JSONL）— 存全链路 trace 事件，用于可观测性和 Dashboard。</span></li></ol>

<p id="f-doxcnZIl3HOzcCoGNwMYTaJlH8e"><span>各存储的路径与补充说明：</span></p>

<p id="f-doxcnTlSVEE2cDNSzxf9dMR9vEc"><span>- </span><span style="font-weight:bold">1 文件指纹库</span><span>：路径 `data/db/ingestion_history.db`，同一文件不重复入库</span></p>

<p id="f-doxcnaHcOEwVv0rASsY8YAtF3ie"><span>- </span><span style="font-weight:bold">2 Dense 向量库</span><span>：路径 `data/db/chroma/`，ChromaDB 内部 SQLite 存 chunk 原文 + metadata + id 映射；hnswlib 二进制段（`*.bin`，float32 数组）存 1536 维稠密向量 + HNSW 图索引</span></p>

<p id="f-doxcn5UrmV1FszRXqvbfJekmKld"><span>- </span><span style="font-weight:bold">3 BM25 倒排索引</span><span>：路径 `data/db/bm25/{collection}/*.json`，倒排表结构（term → posting list，含 tf、doc_length、idf），不存原文</span></p>

<p id="f-doxcnwwB9FFqLzhbqETA0TdVz6e"><span>- </span><span style="font-weight:bold">4 图片资源库</span><span>：路径 `data/images/{collection}/` + `image_index.db`</span></p>

<p id="f-doxcnm6Uk6sH6I8AaOrmSJ564Wb"><span>- </span><span style="font-weight:bold">5 Trace 日志</span><span>：路径 `logs/traces.jsonl`，记录 ingestion + query 全链路事件</span></p>

<p id="f-doxcnQDsPLMqsiOvIWEumoB3ZCh"><span style="font-weight:bold">面试照答版本：</span></p>

<p id="f-doxcn5TYE5RaslcYN2tjMsV15Xc"><span>该学习案例有 5 块存储：</span></p>

<p id="f-doxcnpIdhSAL1q5MwdaEJgkOu4c"><span style="font-weight:bold">第一块是文件指纹库</span><span>，用 SQLite 记录每个文件的 SHA256，做幂等校验，同一文件不重复入库。</span></p>

<p id="f-doxcn3Tr8AvpOdmBDrXyEW4ewSb"><span style="font-weight:bold">第二块是 Dense 向量库</span><span>，用 ChromaDB。Chroma 内部分两部分存：SQLite 存 chunk 原文、metadata 和 id 映射；hnswlib 的二进制段（float32 格式）存 1536 维稠密向量和 HNSW 图索引。查询时先走 HNSW 图 O(log N) 找到 top-k 的 id，再用 id 去 SQLite 拉原文。</span></p>

<p id="f-doxcndGVogtHDTo5QHDm4JVCo1d"><span style="font-weight:bold">第三块是 BM25 倒排索引</span><span>，用 JSON 文件存储。这个 JSON 装的不是原始数据，是倒排表结构（词 → 文档命中列表，含词频、文档长度、idf）。查询时 O(1) 哈希查词，然后只遍历命中的文档算 BM25 分。命中后原文不存在这里，用 chunk_id 去 Chroma 取，避免重复存储。</span></p>

<p id="f-doxcnFsgQLyVLKwxB55ykMVIW9n"><span style="font-weight:bold">第四块是图片资源库</span><span>，文件系统存图片二进制，SQLite 存图片元数据索引，支持多模态检索。</span></p>

<p id="f-doxcnw8hHXe2Uhmvpsfaha2DaDb"><span style="font-weight:bold">第五块是 Trace 日志</span><span>，JSONL 格式记录全链路 trace 事件，用于可观测性和 Dashboard 展示。</span></p>

<p id="f-doxcn3J1fkcaZiygcUais055FLd"><span>其中第二和第三块是核心——查询时两路并行召回，Dense 走语义、Sparse 走关键词，RRF 融合后 Rerank 出最终 top-k</span></p>

<p id="f-doxcnSVV0cd3qWWlXwK4PaaahMe"><span style="font-weight:bold">Q1. 你的 Index 是怎么做的？</span></p>

<blockquote id="f-doxcnYdVDcwncO8pDK3zpUwPUsc"><p id="f-doxcnVw45fWvxzs4aRUu8lLfWnr"><span>因为我推测这个面试问题是针对于稀疏向量来问的，所以我对于稀疏向量的索引选型原因进行了展开。我不清楚同学面试具体情况，看上去面试官在挑战他说存成JSON，我们没有做索引。但是其实不是的，我们存了JSON，维护了自建的倒排索引。第二个是我猜面试官可能会挑战的，就说你为啥不用专门的库比如Elasticsearch来做，包括向量数据库，为啥不用Milvus这样支持数据量更大的库来做。这两个问题回答思路是一样的。就是归根结底该学习案例还是本地的数据库，那么数据量级并没有很大，盲目用更复杂的库要考虑的东西很多，而且开销也会更大。其实你看openclaw，本身也是一个本地的agent，用了双路查询，他甚至是没有用专业向量数据库，只用的sqlite。所以被挑战的时候你要想清楚，说明理由可以认为可以让面试官信服的。</span></p></blockquote>

<blockquote id="f-doxcnDET7NZIXjrNFCeHREQXDCx"><p id="f-doxcnsgwnwsnkfiQA1f2koqcqoA"><span style="font-weight:bold">答题思路</span><span>：在前置问题基础上，聚焦到"索引"展开，重点讲两套索引 + 自建的原因。</span></p></blockquote>

<p id="f-doxcnm8JYyRUgesnBI5rivOCXJh"><span style="font-weight:bold">面试照答版本：</span></p>

<p id="f-doxcn5XUEfsPB1KPg6atNudatmd"><span>我们的 Index 是两套并行的 Hybrid Index。</span></p>

<p id="f-doxcnc7ugBYrGSB5f15XRGrq4De"><span style="font-weight:bold">稠密向量这边</span><span>，用的是 ChromaDB 自带的索引。Chroma 底层用 hnswlib 做 HNSW 图索引，查询复杂度是 O(log N)，这部分不需要我们自己实现，直接调 Chroma 的接口就能做近似最近邻搜索。</span></p>

<p id="f-doxcnWg9fYHIYbWJYiWhnI06sEz"><span style="font-weight:bold">稀疏向量这边</span><span>，是我们自建的 BM25 倒排索引。倒排索引的结构是按词组织的——每个词记录了它出现在哪些文档里、出现几次、文档多长。查询时先 O(1) 通过哈希直接定位到这个词的记录，然后只遍历命中的文档算 BM25 分，复杂度是 O(K)，K 是命中此词的文档数，跟库里总文档量无关。所有统计原料在 build 阶段一次性预算好，查询时只做公式代入，非常快。</span></p>

<p id="f-doxcncfjlTSbtoTe6j730GBQ9EN"><span style="font-weight:bold">选择自建而不是用 Elasticsearch</span><span>，主要考虑了两点：第一是</span><span style="font-weight:bold">数据量级</span><span>，我们是企业内部知识库场景，文档量在百万 chunk 级别，倒排索引加载到内存也就 1-2 GB，完全扛得住。一般到千万甚至亿级 chunk 的时候才需要上 ES 那种分布式方案。第二是</span><span style="font-weight:bold">部署形态</span><span>，我们定位是一个本地化部署的系统，不想引入 ES 这样的重依赖——ES 需要 JVM、集群配置、额外运维成本，对本地私有化场景来说太重了。自建的方案一个 JSON 文件就搞定，启动即用，零额外依赖。</span></p>

<p id="f-doxcng5RE6ObuJx7qlaEV7pQKqc"><span>两路各自召回 top-k 后，用 RRF 融合再 Rerank 出最终结果。</span></p>

<a id="f-doxcnEUK1Tk4lEs77rOzHKbKYSe"></a>

##### 某大厂一面

<a id="f-doxcnPUgWHIBQjqe3e7Ot3444vd"></a>

###### 面试官问：为什么不用开源框架，比如 LlamaIndex？

<p id="f-doxcngCFfDRkxT3bq2qUHD55nNf"><span style="font-weight:bold">答题策略</span><span>：这个问题确实是需要你对LlamaIndex这个库很了解才能回答出来。有两个思路：1. 功能层面，功能层面Llamaindex也是都能满足，因为我们有自己的思想，比如做的高度可插拔，高度可控。即使有些地方使用Llamaindex可以做到，但也许也需要改造，成本也不低。 2. 性能层面。使用Llamaindex本身可能会让系统更加笨重，因为专业的库本身功能全，但是无可避免他也会更臃肿。</span></p>

<blockquote id="f-doxcnpgbq8ow1602uYzz4V0niRj"><p id="f-doxcnsnEzknXWNfH4Dxcm0SD43h"><span>这两个思路其实也是很多现有的项目的思路。那他们为啥不用Langchain，功能层面也可以实现呀。所以这块不用怕，能够说清楚为自己正名就好</span></p></blockquote>

<p id="f-doxcnpwhuHI8EYWH7jPopcsoq2b"><span style="font-weight:bold">面试回答</span><span>：</span></p>

<p id="f-doxcn06dGCzOaQeyCMHAAgc3t1c"><span>选择自建而不用 LlamaIndex，核心原因是</span><span style="font-weight:bold">两者的设计目标不同</span><span>。LlamaIndex 是广度优先的通用框架——200 多个集成、覆盖尽可能多的场景；我们这个项目是深度优先，需要在一条 RAG 链路上做到每个环节都可控、可定制。我从功能和性能两个维度来说。</span></p>

<p id="f-doxcnEuDv1dpcynCNEwjdjI6DSd"><span style="font-weight:bold">第一是功能层面，有些定制需求用框架实现的成本反而更高。</span><span> 比如入库流水线，我们有三个 LLM 增强阶段——分块精炼、元数据提取、图片描述，每个阶段都有独立的 prompt 文件可以按业务场景替换，而且做了 graceful fallback，LLM 调用失败自动降级到规则处理不阻塞流水线。LlamaIndex 有 Transformation 和 Extractor 接口，理论上能做，但要适配它的 Node 体系和回调流程，三个阶段的错误降级、并行编排、prompt 热替换这些都得在框架约束下绕着走，改造成本不低。再比如混合检索，我们自建了 BM25 倒排索引，IDF 的 k1、b 参数可调，分词用 jieba 做中文适配加停用词过滤，Dense 和 Sparse 两路并行召回再 RRF 融合。LlamaIndex 也能接 BM25，但它把 BM25 当黑箱组件挂上去，你控制不了 IDF 参数、看不到倒排表、也没法定制分词策略，调参空间很有限。</span></p>

<p id="f-doxcncRWCGRnquakWmDUTJcQrZc"><span style="font-weight:bold">第二是性能和依赖层面，LlamaIndex 的依赖链太重了。</span><span> 光 `llama-index-core` 一个包就有 27 个以上的直接依赖，包括 SQLAlchemy、networkx、nltk、tiktoken、pillow、banks、tinytag 这些——SQLAlchemy 是 ORM 我们不需要，networkx 是图计算库我们不需要，tinytag 是音频元数据解析器我们更不需要。这些库各自又有自己的传递依赖，装完之后整个依赖树非常庞大。而该学习案例的核心依赖只有 9 个——chromadb、jieba、mcp、pyyaml、langchain-text-splitters 这些，每一个都是实际会用到的，没有冗余。依赖少意味着三件事：第一，启动快、内存占用小，私有化部署场景这很关键；第二，安全面小，每个依赖都是潜在的 CVE 补丁点，依赖越多运维成本越高；第三，版本冲突少，LlamaIndex 的依赖链越长，跟项目里其他库发生版本冲突的概率就越大。</span></p>

<p id="f-doxcnLwZnhWEf0tJ858Fbnp2JCd"><span style="font-weight:bold">总结来说</span><span>，LlamaIndex 适合快速出 POC 或者需要对接大量异构数据源的场景。但我们需要在 LLM 增强流水线、混合检索调参这些 RAG 核心环节上做深度定制，同时保持依赖轻量便于私有化部署。自建的总成本反而比引入一个重框架再做二次开发更低，同时对每个环节有完全的理解和控制权。</span></p>

<a id="f-doxcnz7tm7ZLuUjxSbHJvWQTVpd"></a>

##### 某大厂一面

<a id="f-doxcnWCuCrd0qxxXCr3UjCuvGlf"></a>

###### 向量数据库大小，有多少个 PDF？

<blockquote id="f-doxcnRNgndIG7R9rciC6DvZrowf"><p id="f-doxcnY2LZELk563ufu3ls44wQob"><span>这个问题其实就是因人而异了。 这里需要大家自己思考一下业务场景然后包装。这里我们不妨，假设我们就是一个给公司内部小组使用的知识库（不是整个公司啊，而是一些组），以这个角度去回答。</span></p></blockquote>

<p id="f-doxcnXXZZKMtdjm8tDcuRA8cOKd"><span style="font-weight:bold">假设场景</span><span>：企业内部小组知识库（如技术文档、规范流程、会议纪要等），服务于一个 10-30 人的业务线。</span></p>

<p id="f-doxcngGq9orQ1diqqlLHN3eCH4c"><span style="font-weight:bold">面试回答</span><span>：</span></p>

<p id="f-doxcnEzdVEV0fEbVzVNO5lEp2Jh"><span>我们的场景是企业内部业务组的知识库，主要存技术文档、规范流程和会议纪要这类材料。目前入库了</span><span style="font-weight:bold">大约 200 份 PDF</span><span>，平均每份 15-20 页，经过切分后产生了大约 </span><span style="font-weight:bold">5 万个 chunk</span><span>。</span></p>

<p id="f-doxcnYQX9BEUk5sEnwhAkviOPqh"><span style="font-weight:bold">向量库的实际大小</span><span>可以这样估算：我们用的 `text-embedding-ada-002`，每个 chunk 是 1536 维的 float32 向量，单条向量 1536 × 4 字节 = 6KB。5 万个 chunk 的向量数据大约是 </span><span style="font-weight:bold">300MB</span><span>。加上 ChromaDB 里 SQLite 存的原文、metadata、id 映射，以及 hnswlib 的 HNSW 图索引开销，整个 `data/db/chroma/` 目录实际大小在 </span><span style="font-weight:bold">500MB-800MB</span><span> 这个量级。BM25 倒排索引那边更小，5 万 chunk 的倒排表 JSON 大概也就 </span><span style="font-weight:bold">几十 MB</span><span>。</span></p>

<p id="f-doxcnSc091w1UNUmqTybr8GiaJb"><span style="font-weight:bold">选型上</span><span>，我们用的 ChromaDB，核心原因是</span><span style="font-weight:bold">部署形态决定技术选型</span><span>。我们是内网私有化部署的系统，部署在组内的一台内网服务器上，通过 MCP 协议的 SSE 传输层暴露给组内成员，所有人的 IDE 通过内网连接这个 Server。Chroma 在服务端以 Client-Server 模式运行，底层用 hnswlib 做 HNSW 图索引，查询复杂度 O(log N)，支持并发读写。5 万条数据量级下，单次向量检索延迟在</span><span style="font-weight:bold">毫秒级</span><span>，20 人并发查询完全扛得住。</span></p>

<p id="f-doxcngPffD14EwylumXEdd8R0Mk"><span style="font-weight:bold">如果未来要扩容</span><span>，我也有明确的分级方案：</span></p>

<p id="f-doxcnqaPTiR1CUC5sNmRhFnAjgf"><span>- </span><span style="font-weight:bold">10 万 chunk 以内</span><span>：ChromaDB 完全扛得住，单机内存足够，不需要任何变动。</span></p>

<p id="f-doxcnjFTkHN4yjHbQfnv8HbIqrO"><span>- </span><span style="font-weight:bold">10 万到百万级</span><span>：可以考虑切到 Qdrant 或者 FAISS，它们在大规模数据下的索引效率和内存管理更优。我们的向量库通过 `VectorStoreFactory` 做了工厂模式抽象，配置文件里改一行 `provider: "qdrant"` 就能切换，代码零改动。</span></p>

<p id="f-doxcnIjj37GkmCyFFU5jhGb4Gmf"><span>- </span><span style="font-weight:bold">千万级以上</span><span>：就得上 Milvus 这种分布式方案了，做分片、副本、支持水平扩展。但那已经是整个公司级别的知识库了，不是我们当前的场景。</span></p>

<p id="f-doxcnkjNCN0ujA3EX1kOm0872Dd"><span style="font-weight:bold">总结一下</span><span>，200 份 PDF、5 万 chunk、向量库 500-800MB，用 ChromaDB 部署在内网服务器上，通过 SSE 暴露给组内 20 人使用。选型的思路就是</span><span style="font-weight:bold">数据量级匹配部署形态</span><span>——当前量级用轻量方案，架构上预留了扩展能力，量级上来随时可以切。</span></p>

<a id="f-doxcnBB2N6UPbtlD7ZOV2xLaVHd"></a>

###### 为什么公司你存内部文档就需要 size 1000？

<p id="f-doxcn962RTdd3v4e83t98bVHmxb"><span style="font-weight:bold"> 你设置 1000 是不是太大了？1000 个字是不是太多了？</span></p>

<blockquote id="f-doxcnMIAofC7kWTugFMDDO3G3W7"><p id="f-doxcnPwXzqtEoCH7JXWl6qvKUHf"><span>这里推荐大家看一下八股里的Chunk size的选型，使用这个思路，讲清楚为什么选择这样的chunk size,相信就不会被面试官挑战了。八股里补充了</span><span><span><span>chunck size的选型策略</span></span></span><span>，从哪几个维度去考虑。面试官问我们为什么这么选chunk size的时候以及chunk size的选型策略时可以参考。</span></p></blockquote>

<blockquote id="f-doxcnW0bStaZOw0xjzAMZ3FnMcd"><p id="f-doxcnPcfV4wmPD5ie6xmKuKVuNc"><span>回答假设我们是企业内部技术小组知识库，文档以英文技术文档为主（API docs、Architecture Decision Records、Runbooks、Postmortem 等）。</span></p></blockquote>

<p id="f-doxcnCjNcIYnTVx6WenbVftoh8T"><span style="font-weight:bold">面试回答</span><span>：</span></p>

<p id="f-doxcnjYQ94EvqrDXXIdTtuY78Wb"><span>chunk_size=1000 不是拍脑袋定的，我从四个维度来解释这个选择的合理性。</span></p>

<p id="f-doxcn6rS34lfqGc25kkjfhuQuzb"><span style="font-weight:bold">首先明确一下，1000 是字符不是 token。</span><span> 我们用的 RecursiveCharacterTextSplitter，length_function 是 Python 的 len()，按字符计数。我们的文档以英文为主，英文 1000 个字符约 150-200 个单词、200-250 个 token，大概就是一个自然段落的量。</span></p>

<p id="f-doxcnDyR4ENfOtnix7c4eMZyzId"><span style="font-weight:bold">第二，这个值正好落在 embedding 的最佳输入区间。</span><span> text-embedding-ada-002 虽然 max token 是 8191，但实践表明 100-800 token 区间信息密度最高。200-250 token 处在区间中段，向量质量最好。其实对英文来说 1000 字符不但不大，反而还偏保守，上调到 1500-2000 字符（400-500 token）也完全在合理范围内。</span></p>

<p id="f-doxcnLRQTu4zS1zxoEpjJxwrTNc"><span style="font-weight:bold">第三，匹配文档的自然语义粒度。</span><span> 我们的英文技术文档，一个自然段落通常 100-250 个单词、500-1200 个字符。1000 字符刚好对应一个完整的语义单元——一个 API 说明、一条操作步骤、一段架构决策。不会横跨不相关的段落，也不会把一段话切碎。</span></p>

<p id="f-doxcn4sphGPMrb7eNsbNzRHTrEh"><span style="font-weight:bold">第四，LLM 窗口预算非常充裕。</span><span> 召回 top-10，每个 250 token，总共才 2500 token，LLM 还有大量空间做推理和生成。</span></p>

<p id="f-doxcnX2IzJViPRMNaBNzaYD3Jeb"><span>另外要补充一点，RecursiveCharacterTextSplitter 不是硬切 1000，它会按段落、换行、句号这些语义边界递归切分，实际大部分 chunk 不到 1000。再加上 200 字符的 overlap、LLM chunk 精炼和 metadata 增强，对粒度的容错能力很强。</span></p>

<p id="f-doxcnbmoYCEIEn8SVWxaCvSOJrY"><span style="font-weight:bold">不过要注意一点</span><span>，如果文档是中文的，情况就完全不同了。中文 1000 字符就是 1000 个汉字，约 1500-2000 token，远超 embedding 最佳区间，那就确实太大了，需要降到 500-600 字符。所以这个数字不能一概而论，关键是要搞清楚计量单位和语言场景，不同的场景情况也是不同的。</span></p>

<a id="f-doxcnqrfnGlxkDwppCiaEil3Hsd"></a>

###### 你考虑什么数据存 RAG？

<blockquote id="f-doxcnbxDCdTE9Df2cmJCelzwuyg"><p id="f-doxcnmLLjCAig9s5YLiD2LtRWRc"><span>我对这个问题好像没什么见解，让AI生成的答案。感觉很少这么问。</span></p></blockquote>

<p id="f-doxcnmgIV9NtEmzhMdaTgWnwY8E"><span style="font-weight:bold">面试回答</span></p>

<p id="f-doxcnhSH0Vb8rFaMaiELkE211Ig"><span>什么数据适合放 RAG，核心判断标准就是</span><span style="font-weight:bold">这份数据适不适合用"检索+生成"的模式来回答问题</span><span>。</span></p>

<p id="f-doxcnX89QtetlS3BgShiwvhsRyd"><span style="font-weight:bold">适合放的有四类。</span><span> 第一是事实性强、答案明确的知识，比如技术文档、操作规范、FAQ，用户问"是什么"、"怎么做"，答案就在文档里，RAG 检索到直接回答，效果最好。第二是更新频繁的知识，比如版本发布说明、变更日志，如果靠 fine-tuning 烧进模型参数每次更新都要重新训练，成本极高，RAG 只需要重新入库那一份文档，下次检索立刻生效。第三是长尾的私有领域知识，公司内部的 Runbook、Postmortem、架构决策记录，互联网上搜不到，通用大模型没训练过，只有 RAG 能覆盖。第四是需要溯源引用的场景，RAG 天然带 source_ref 可以追溯原文，对合规要求高的场景比模型"凭记忆"回答可靠得多。</span></p>

<p id="f-doxcnqSUv04kOao1g4tOhKF5Gjf"><span style="font-weight:bold">不适合放的有三类。</span><span> 推理性任务，比如"对比三个方案的优劣"，这不是检索能解决的，需要 LLM 自身推理能力。结构化查询，比如"上个月销售额多少"，答案在数据库表里，走 Text2SQL 或 function calling 比 RAG 高效得多。高实时性数据，比如股票价格、系统监控指标，入库就过时了，应该走 function calling 实时调 API。</span></p>

<a id="f-doxcnrR48Apx4yeafyHtxpqEsRf"></a>

###### MCP tools 的编写原则——不只是 tools 的描述需要描述好，还有什么关键点？

<blockquote id="f-doxcnQsEhDd3R6HITLTL5X4Jg1b"><p id="f-doxcnDj8g2LOzyGVqJ2MMwF78ld"><span style="font-weight:bold">答题策略</span><span>：MCP 官方规范定义了 tool 的六个字段（name / title / description / inputSchema / outputSchema / annotations），每个字段背后都对应一条设计原则。回答时从六个维度展开，结合项目实际代码举例，展示对 MCP 协议的深度理解。我把这个问题放到了MCP八股中。</span></p></blockquote>

<p id="f-doxcncycKt4MVmHGIqFWlXBNqCr"><span>参考八股</span><span><span><a href="/posts/agent-learning-06-mcp-integrations/#f-doxcnYzEvV8C81Mg7gFvkdlbYks"><span> MCP Server Tool的设计原则</span></a></span></span></p>

<a id="f-doxcnlj45Mr2wkPXVP8qQU0raag"></a>

###### 视频讲解

<p id="f-doxcn8rJDvZw8jnLIVzaWln0bPT"><span>3.7 ~ 3.9 小节对应的视频讲解</span></p>

<p id="f-doxcndTBgaLzuE9XFwXIRNYY5Ye"><span><span><a href="https://www.bilibili.com/video/BV1RboMB9EGp/?vd_source=144bec9c3f54e465073138bed788be1b"><span>https://www.bilibili.com/video/BV1RboMB9EGp/?vd_source=144bec9c3f54e465073138bed788be1b</span></a></span></span></p>

<a id="f-doxcnM2M9GWI2eYdowA9vL5meUd"></a>

##### 字节跳动暑期实习一面（）

<p id="f-doxcnE5WbAnfjPh2KKlKApvJs7d"><span><span><a href="/posts/agent-learning-24-interview-review/#f-doxcnobSTKPi3ZAKwTDxkqSHhEc"><span>字节暑期实习一面</span></a></span></span><span> ，也有相关的该RAG项目面试问题。这个是一个小姐姐拿该学习案例去面试的素材。</span></p>

<a id="f-doxcnnbMYD5vpjPBU2aHDrzevVi"></a>

##### PDF 处理问题

<p id="f-doxcnAlUKknqJCzukcWnWTM8KFg"><span>虽然我没有写这个是哪个公司的面试真题，但是根据粉丝朋友的反馈，很多公司都会问你如何处理的PDF，包括群里提问，也有粉丝问PDF有页眉怎么处理，最近一次粉丝给我提问的原话是："</span><span style="font-weight:bold">博主，现在很多低阶的岗位特别喜欢问你对PDF是如何处理的，能否讲一下这个问题</span><span>"。所以这个问题还是挺有代表性的。我也专门把这个PDF的处理标准流程提炼成了专题知识放在RAG知识部分：</span><span><span><a href="/posts/agent-learning-09-rag-data-processing/#f-doxcnb2YC7Vpe2VuLAvjyNeJrik"><span>输入文件处理</span></a></span></span><span>。常见的问法如下：</span></p>

<ol start="1"><li id="f-doxcnezdNWLmtvW99jGv5OUoz8S"><span style="font-weight:bold">你在处理pdf转成markdown文本的这个步骤，你是怎么处理的，可以分享一下吗？</span></li></ol>

<p id="f-doxcnyOYKby0kY2QLfwgpqgKfWI"><span style="font-weight:bold">💡 答题思路</span></p>

<p id="f-doxcnhBgjPzJDLimkkseiQNHM9e"><span>答题思路：在本节中，专门讲解了如何处理PDF。我们就按照笔记里的标准思路：</span><span style="font-weight:bold">文件基础体检 - 逐页判断类型 - 按页面类型解析 - 统一结果 - 结果检查</span><span> 的思路，把这个答案回答清楚。</span></p>

<p id="f-doxcnHSBSqHXyuG9t0TUpLJukpf"><span style="font-weight:bold">📝 参考答案</span></p>

<p id="f-doxcn7q4QbeOfk0WaEAigzyY0sh"><span>我们</span><span style="font-weight:bold">没有直接用一种解析器处理所有 PDF</span><span>，而是设计了一套</span><span style="font-weight:bold">分阶段、按页面类型路由</span><span>的处理流程。</span></p>

<p id="f-doxcnSqtNAQMnWZmSf1WhPktu6g"><span>首先进行</span><span style="font-weight:bold">文件级体检</span><span>，通过文件哈希去重，并检查文件是否加密、损坏、页面方向是否异常，同时记录文件名和总页数。接下来</span><span style="font-weight:bold">逐页分析</span><span>文字数量、图片覆盖率、异常字符比例和版面结构，将页面分为</span><span style="font-weight:bold">原生文本页、扫描页、混合页、复杂布局页和异常页</span><span>。</span></p>

<p id="f-doxcn3Q9hrPugKVsbmexeTqhmfe"><span>对</span><span style="font-weight:bold">原生文本页</span><span>，本案例使用 PyMuPDF 提取文字及坐标；</span><span style="font-weight:bold">扫描页</span><span>先渲染为图片，再使用 PaddleOCR 识别；</span><span style="font-weight:bold">混合页</span><span>同时提取原生文字和重要图片区域，对图片执行 OCR 或多模态理解后再去重合并。对于多栏、表格和图文混排等</span><span style="font-weight:bold">复杂布局页</span><span>，我会优先使用 </span><span style="font-weight:bold">Unstructured 的 hi_res 策略</span><span>识别标题、正文、表格、图片区域及其坐标，再按照坐标恢复阅读顺序；如果页面结构特别复杂，也可以使用 </span><span style="font-weight:bold">LlamaParse</span><span> 直接解析成带层级的 Markdown。对于乱码页面，先用 </span><span style="font-weight:bold">PyMuPDF</span><span> 提取；如果存在字体编码或字符映射问题，就切换到 </span><span style="font-weight:bold">pdfplumber 或 pypdf</span><span> 交叉验证；这些解析器仍无法恢复时，再将异常页面渲染成图片，使用 </span><span style="font-weight:bold">PaddleOCR</span><span> 做页面级兜底。</span></p>

<p id="f-doxcnW8dcLsIR0Mm94aeS40835g"><span>不同路线的输出最后会</span><span style="font-weight:bold">统一为相同结构</span><span>，按照原始页码和页面内阅读顺序组合成 Markdown，并保留文件名、页码和异常标记，保证结果</span><span style="font-weight:bold">可以追溯到原文</span><span>。完成后还会检查漏页、乱码、页眉页脚残留、OCR 重复、多栏错序及表格关键数字。</span><span style="font-weight:bold">只有通过质量检查的内容，才会进入后续分块和向量化流程。</span></p>

<p id="f-doxcn2qY1FXOqELVyv76ls51Ied"><span style="font-weight:bold">子问题</span></p>

<p id="f-doxcn5BI129IxBjSJQrUR8RxICd"><span>这些子问题的答题思路了，这个其实就是本节中PDF处理的步骤三的内容，</span><span><span><a href="/posts/agent-learning-09-rag-data-processing/#f-doxcnoLAn2NRcaLvHFCX5nBWI9f"><span>根据不同页面做相应处理</span></a></span></span><span>。</span></p>

<p id="f-doxcnXjGFiezbbZcnCDczpk4gMg"><span>我们从回答里面可以看出来，想要把PDF处理好，处理完整是多么复杂的一件事，你看看我们下面的回答，用了多少不同的库，要处理多少类型。</span></p>

<p id="f-doxcnZaig3r5Zi891uGApDq42bg"><span>我的个人建议是：</span><span style="font-weight:bold">背一背得了。 </span><span>通过我们的讲解和回答，最少对于下面的问题，你有一个大体的思路和了解，面试官真问到，大面上能回答上来。通常来说他不会再追问更加具体的细节了，比如里面使用的某个库，以及具体处理细节。</span></p>

<ul><li id="f-doxcnnCkxTsq4fKP91jU4qWE2Cb"><span style="font-weight:bold">1.1 你的pdf中有乱码，你是如何处理的？</span></li></ul>

<p id="f-doxcnLj1JtlvngHlpRtVcIleltd"><span style="font-weight:bold">💡 答题思路</span></p>

<p id="f-doxcnKbMZvJEX5OmLBm3gJk857g"><span>先判断乱码来源，再按照“切换解析方式 → OCR 兜底 → 质量检查”的顺序处理，避免一遇到乱码就对整份 PDF 执行 OCR。</span></p>

<p id="f-doxcn8NREIZgjKJ2RATJ06d4CXb"><span style="font-weight:bold">📝 参考答案</span></p>

<p id="f-doxcnh2Mt9aovkSJzl2MfylIgGd"><span>PDF 乱码通常来自</span><span style="font-weight:bold">字体编码、字符映射异常或解析器不兼容</span><span>。因此，可以先根据异常字符比例判断是局部乱码还是整页乱码。默认使用 </span><span style="font-weight:bold">PyMuPDF</span><span> 提取；如果结果异常，就切换到 </span><span style="font-weight:bold">pdfplumber 或 pypdf</span><span> 重新提取并交叉验证。如果只是少数字符异常，可以结合明确的规则和上下文进行修复，但</span><span style="font-weight:bold">不会让大模型随意改写原文</span><span>。</span></p>

<p id="f-doxcnauP4osW69K9DsOt23RReNb"><span>如果更换解析器后仍然乱码，可以通过 </span><span style="font-weight:bold">PyMuPDF 将异常页面渲染成 200～300 DPI 图片，再使用 PaddleOCR 重新识别</span><span>，而不是对整份文件统一执行 OCR。识别后通过异常字符比例、文本完整度和 OCR 置信度进行检查；</span><span style="font-weight:bold">低质量页面重新识别或转人工复核</span><span>。同时保留原始页码，方便回到 PDF 核对。</span></p>

<ul><li id="f-doxcn4zpBdUTmAiizdFNECjk2Gh"><span style="font-weight:bold">1.2 你的pdf中有图片，你是如何处理的？</span></li></ul>

<p id="f-doxcn0z5s80jDqzfpjHn8euXbbc"><span style="font-weight:bold">💡 答题思路</span></p>

<p id="f-doxcnYkDZIc3FarIVtOhnyk1lYb"><span>先区分装饰图片、文字截图和需要理解关系的图表，再分别选择忽略、OCR 或多模态理解。</span></p>

<p id="f-doxcnE4pTcRCDXqBQsvBrhVBXlb"><span style="font-weight:bold">📝 参考答案</span></p>

<p id="f-doxcn3ygQqJRq0qdOG9fazNkgyb"><span>我不会对 PDF 中的所有图片做相同处理，而是先判断图片是否包含有效信息。</span><span style="font-weight:bold">Logo、背景和纯装饰图片通常不进入知识库</span><span>；带文字的截图会先提取图片区域，再使用 </span><span style="font-weight:bold">OCR</span><span> 识别文字，并按照图片在页面中的位置插回正文。</span></p>

<p id="f-doxcnHiVEYxtKix0niHxubvcFFb"><span>对流程图、架构图和统计图，普通 OCR 只能读出文字，无法还原节点关系、箭头方向或数据含义，因此会使用</span><span style="font-weight:bold">多模态模型生成结构化说明</span><span>。输出时仍然</span><span style="font-weight:bold">保留原图引用、所在页码和生成说明</span><span>，便于溯源和人工核对。如果原生文字与图片 OCR 结果重复，还会在合并阶段进行去重。</span></p>

<ul><li id="f-doxcnF5HNkmII2knNXTDdBChXag"><span style="font-weight:bold">1.3 你的Pdf中有页脚页眉，你是如何处理的？</span></li></ul>

<p id="f-doxcnw3zgAz9rcF2P1fxoHyKjge"><span style="font-weight:bold">💡 答题思路</span></p>

<p id="f-doxcnoR7PpgERueen7Ey3Zq29S7"><span>利用跨页重复规律和文本坐标识别页眉页脚，不能只依赖固定字符串，以免误删正文。</span></p>

<p id="f-doxcnJH1hg536uZyHWQ57cTfPkb"><span style="font-weight:bold">📝 参考答案</span></p>

<p id="f-doxcngkg89aQsFojTzVgrbO5zbk"><span>我会保留文本块的坐标信息，并统计连续页面顶部和底部区域的内容。如果某段内容在相近位置</span><span style="font-weight:bold">跨页重复出现</span><span>，就将它判断为页眉、页脚或水印；连续变化的数字则可以结合固定位置识别为页码。</span></p>

<p id="f-doxcnwf6zTRhCA5g0fyMzcwMU9f"><span>删除时</span><span style="font-weight:bold">不会只使用字符串匹配</span><span>，而是综合</span><span style="font-weight:bold">位置、跨页重复率和文本变化规律</span><span>判断。封面、章节首页等版式不同的页面会单独处理。页眉页脚从正文中移除后，</span><span style="font-weight:bold">原始 PDF 页码仍作为元数据保留</span><span>，确保后续检索结果可以定位到原文。</span></p>

<ul><li id="f-doxcnJxzHpR2lvEHnet7k4bZMdf"><span style="font-weight:bold">1.4 你的pdf中有表格，你是如何处理的？</span></li></ul>

<p id="f-doxcnitfa07mEgOHBBKvPvXxUKh"><span style="font-weight:bold">💡 答题思路</span></p>

<p id="f-doxcncYVa9HaakCaVbXfqH1DAhf"><span>先区分原生表格和扫描表格，再选择表格提取或 OCR 结构识别；重点说明结构、关键数字和跨页关系的检查。</span></p>

<p id="f-doxcnconJsVCqTFpfYfKJrUFaVe"><span style="font-weight:bold">📝 参考答案</span></p>

<p id="f-doxcn9cKJVq32fXAXQLUn1VyWaf"><span>对带有文字层、边界比较清楚的</span><span style="font-weight:bold">原生表格</span><span>，可以使用 Camelot 或版面解析工具提取单元格结构；对于</span><span style="font-weight:bold">扫描表格</span><span>，需要先执行 OCR，再通过表格结构识别恢复行列关系。提取结果会根据后续使用场景转换成 Markdown、HTML 或 CSV。</span></p>

<p id="f-doxcn5CBzHE32eHEx42KlHoYyIh"><span>表格处理最重要的不是只把文字读出来，而是</span><span style="font-weight:bold">保留表头、行列关系和关键数字</span><span>。因此我会重点检查合并单元格、跨页表格、单位、正负号和数值是否发生错位。对于跨页表格，还要根据相同表头和页码关系进行合并。如果自动解析无法可靠恢复结构，就</span><span style="font-weight:bold">保留表格截图和页码并转人工复核</span><span>，而不是输出可能误导模型的错误表格。</span></p>

<a id="f-doxcnFiU4YYJkyDA0Svp0UCD61c"></a>

###### 讲解视频

<p id="f-doxcn6iwIOoKfygopgvVtGenqWm"><span><span><a href="https://www.bilibili.com/video/BV1gF8Z6WEGW/?spm_id_from=333.1387.homepage.video_card.click&amp;vd_source=144bec9c3f54e465073138bed788be1b"><span>https://www.bilibili.com/video/BV1gF8Z6WEGW/?spm_id_from=333.1387.homepage.video_card.click&amp;vd_source=144bec9c3f54e465073138bed788be1b</span></a></span></span></p>

<a id="f-doxcncre0k2okUTQXY1bNXXiCUf"></a>

##### 如何保证RAG系统生成的回答是准确的？

<p id="f-doxcnn7mxtHZS26mvLpwYWu21we"><span>这两个问题也是粉丝朋友投稿的，虽然他没告诉我是哪个公司，但是这两个问题确实是来自于面试真题。可以认为这两个题目也很好，很有价值。</span><span style="font-weight:bold">面试官关心你的RAG最后的回答，准确性到底怎么样？</span><span>虽然我们有讲</span><span style="font-weight:bold">RAGAS</span><span>在事后去评估，但是有没有方法可以在整个RAG系统生成回答的时候，就能够检测质量，及时兜底呢？要讲清楚这个问题，我的思路是从Self-RAG这个技术出发，可以先参考RAG专题笔记：</span><span><span><a href="/posts/agent-learning-09-rag-data-processing/#f-doxcnuLIexZJT9vCqgUe8Csx1zb"><span>Self-RAG.</span></a></span></span></p>

<p id="f-doxcn4p91tmGJRdznISvaEibWSE"><span style="font-weight:bold">💡 答题思路</span></p>

<p id="f-doxcnc5yDLTN1F7klV4D9TwW1Oc"><span>我们这里借助Self-RAG 的思路，将4个检测融入到整个RAG系统中，在系统运行的时候做动态监测，实时重新调整或者拒答。同时因为传统的Self-RAG是需要训练专门评测的模型的，所以我们这里借助Self-RAG的思路，RAGAS的评估方法，来组织这个参考答案。</span></p>

<p id="f-doxcnLepYl3GlDM037H122se0Td"><span style="font-weight:bold">📝 参考答案</span></p>

<p id="f-doxcn90OGBlYhCJrUR25mBbe1rb"><span>我们不能保证 RAG 的每次回答都绝对正确，但可以通过一套</span><span style="font-weight:bold">检索—生成—评估—修正—拒答</span><span>的闭环，尽量降低错误回答直接输出的概率。整体流程借鉴了 </span><span style="font-weight:bold">Self-RAG</span><span> 的自反思思路，但实际检测使用的是 </span><span style="font-weight:bold">RAGAS 的评估方法</span><span>，不需要专门训练 Self-RAG 模型。</span></p>

<p id="f-doxcnJaJfYDwZIeVi9oKpRENHRf"><span>首先通过业务规则或 LLM 分类器判断当前问题是否需要查询知识库，避免对闲聊或通用问题进行无意义检索。需要检索时，使用 RAGAS 的 </span><span style="font-weight:bold">Context Precision 和 Context Relevance</span><span> 评估召回内容是否与用户问题相关，并结合 Reranker 分数和相关性阈值过滤无关 Chunk。如果上下文相关性不足，就改写查询、扩大召回范围或重新检索，而不是直接基于低质量证据生成答案。</span></p>

<p id="f-doxcngLaaeG5Nwrz9GvDwpwdA6f"><span>生成答案后，使用 </span><span style="font-weight:bold">Faithfulness</span><span> 检查答案中的结论能否从检索上下文中得到支持，重点识别无依据补充、事实冲突和模型幻觉；再使用 </span><span style="font-weight:bold">Answer Relevancy</span><span> 判断答案是否真正回应了用户的问题。如果测试集提供了标准答案，还可以使用 </span><span style="font-weight:bold">Answer Correctness</span><span> 进一步评估答案与标准答案在事实和语义上的一致程度。</span></p>

<p id="f-doxcnyw12gm2285Nyvwu0UF0bXc"><span>最后综合上下文相关性、答案忠实度和答案相关性进行评分，只有达到质量阈值的答案才会输出，并附带引用来源，方便回到原文核对。如果 </span><span style="font-weight:bold">Context Precision 或 Context Relevance</span><span> 较低，就重新检索；如果 </span><span style="font-weight:bold">Faithfulness</span><span> 较低，就要求模型严格依据现有证据重新生成，证据本身不足时也要重新检索；如果 </span><span style="font-weight:bold">Answer Relevancy</span><span> 较低，就调整提示词、答案内容或表达结构后重新生成。系统还会设置最大修正次数，如果多轮处理后仍然达不到阈值，就明确提示资料不足并拒答或转人工，而不是让模型猜测。通过 RAGAS 的动态评估和失败兜底机制，可以提高答案的准确性、可追溯性和稳定性。</span></p>

<a id="f-doxcnzzfYTA1ElXN64jDQLSAlHd"></a>

###### 召回的 Chunk 中有很多噪声，如何保证结果稳定？

<p id="f-doxcnq3C19X6Ju9NAePi4AXCZGe"><span style="font-weight:bold">💡 答题思路</span></p>

<p id="f-doxcnDkEyHyU5AtHAvTPj5DDUBg"><span>先区分 Chunk 内部的</span><span style="font-weight:bold">内容噪声</span><span>和</span><span style="font-weight:bold">检索结果中的噪声 Chunk。</span></p>

<p id="f-doxcnRlgIxzhxg71aPyG6uwNU9g"><span>内容噪声可以从我们对PDF处理的方法，</span><span><span><a href="/posts/agent-learning-09-rag-data-processing/#f-doxcnb2YC7Vpe2VuLAvjyNeJrik"><span>将PDF转成Markdown</span></a></span></span><span>，就会对内容噪声去除。 </span></p>

<p id="f-doxcn9pDm7oDRffAC6aoPLarXZg"><span>检索噪声可以从该学习案例本身做的</span><span style="font-weight:bold">RRF融合，双路检索，Reranker触发</span><span>，这些是保证我们系统检索准确率的手段。</span></p>

<p id="f-doxcnIUoRlswgN0JjLBZ0Bur3Tg"><span>最后再引入</span><span><span><a href="/posts/agent-learning-09-rag-data-processing/#f-doxcnuLIexZJT9vCqgUe8Csx1zb"><span>Self-RAG</span></a></span></span><span>的思想，我们有动态兜底，实时检测，即使最终回答很差，也能及时检测，调整，或者拒答。</span></p>

<p id="f-doxcntx40iiJC8JOic8e9KdzTJc"><span style="font-weight:bold">📝 参考答案</span></p>

<p id="f-doxcnRxETQAouwVRtNIWMfxciNg"><span>可以先区分两类噪声。第一类是 </span><span style="font-weight:bold">Chunk 内部的内容噪声</span><span>，例如 OCR 乱码、页眉页脚残留、重复内容、表格错位和多栏阅读顺序错误。这类问题主要在 </span><span style="font-weight:bold">PDF 解析、文本清洗和分块阶段</span><span>处理，通过分类解析、去重、异常检测和结果检查，尽量避免脏数据进入向量库。</span></p>

<p id="f-doxcnHtiuwqNY3vb73v52rvITzJ"><span>第二类是</span><span style="font-weight:bold">检索噪声</span><span>，即 Chunk 本身没有问题，但与当前问题无关或相关性较弱。检索阶段先通过</span><span style="font-weight:bold">关键词与向量混合检索</span><span>提高有效证据的召回率，再通过 </span><span style="font-weight:bold">RRF</span><span> 融合多路结果、提高优质证据的排序；随后使用</span><span style="font-weight:bold">元数据过滤、相关性阈值和 Reranker</span><span> 去掉低相关内容，并根据问题复杂度和相关性分数控制 Top-K。</span><span style="font-weight:bold">Top-K 本身不是去噪手段</span><span>，关键是避免将过多低相关 Chunk 放入上下文。</span></p>

<p id="f-doxcngfAldyOpLj5Hg1CDqhlIdc"><span>最后在生成阶段要求模型</span><span style="font-weight:bold">严格依据上下文回答，并标注引用来源</span><span>；生成后再检查答案是否获得证据支持。如果上下文相关性低，就重新检索；如果证据充分但回答不忠实，就约束模型重新生成；如果多次处理后证据仍然不足，就拒答。通过</span><span style="font-weight:bold">入库前清洗、检索后过滤和生成后校验</span><span>三层机制，共同保证结果稳定。</span></p>

<a id="f-doxcnb4Ts2F3bfzm5iEq2cOGhCd"></a>

###### 讲解视频


<a id="section-0153"></a>
## 视频讲解

<a id="f-doxcnE75KTqPEUd8syQjyjOq5wb"></a>

<a id="f-doxcn7IWZFF3Y0vqtvKe1Csldwb"></a>

##### 项目Skills使用

<p id="f-doxcnh8hahFI9ajXylI426zmgZf"><span>如何让AI 使用Skill 遵循dev spec 完成代码。注意视频里的SKILL其实已经重新优化，现在叫做autocoder, 功能是一样的，大家使用代码的时候看一下描述就知道了，使用方法是一样的。</span></p>

<p id="f-doxcn5JvoFZQacYBkIuEnW3sYNe"><span><span><a href="https://www.bilibili.com/video/BV1ixAVz9EaQ/?vd_source=144bec9c3f54e465073138bed788be1b"><span>https://www.bilibili.com/video/BV1ixAVz9EaQ/?vd_source=144bec9c3f54e465073138bed788be1b</span></a></span></span></p>

<a id="f-doxcnLDySYyIqtvscY8jhkL7vAe"></a>

##### RAG-Agent项目设计思路和学习方法

<p id="f-doxcnbZPwuA6Vv1qnF4GDsmUdie"><span><span><a href="https://www.bilibili.com/video/BV1S8wvziEWA/?vd_source=144bec9c3f54e465073138bed788be1b"><span>https://www.bilibili.com/video/BV1S8wvziEWA/?vd_source=144bec9c3f54e465073138bed788be1b</span></a></span></span></p>

<a id="f-doxcnJTfQRdZ2rxyPK6G86XNIuc"></a>

##### 项目数据处理流水线讲解

<p id="f-doxcncCFN4wo6IixYwrnQexpTch"><span>链接：</span></p>

<a id="f-doxcnD0AvgcE1GA79tnlNxElrwd"></a>

##### 集成到Cursor效果

<p id="f-doxcn0c89ojrARItrRbLZA6p9Dg"><span>链接：</span></p>

<a id="f-doxcn5Jw1dC6TDlc3Rfhr22kWNb"></a>

##### 项目初步demo展示

<p id="f-doxcn2Vo42gJg3Ql7aTsWD7ysUd"><span>链接：</span></p>

<a id="f-doxcn277keReDzoj0ls6LGX9M6e"></a>

##### Resume-Writer SKILL

<p id="f-doxcn3UwLHLJx9m83zkardp4Xxe"><span><span><a href="https://www.bilibili.com/video/BV1aBAfzGEct/?vd_source=144bec9c3f54e465073138bed788be1b"><span>https://www.bilibili.com/video/BV1aBAfzGEct/?vd_source=144bec9c3f54e465073138bed788be1b</span></a></span></span></p>

<a id="f-doxcnX1Yfhgc0qUUwqrosw4zEf4"></a>

##### Test SKILL

<p id="f-doxcnTxdexBlmnTkO6X8CF1h8qf"><span>展示了使用AI 来完成自动化测试的功能</span><span style="font-weight:bold">。其中讲了如何写SKILL, 如何写dev_spec文档的</span></p>

<p id="f-doxcnnt0zG6JUzmZTDAayhLJMXe"><span>/~7be03LqXsd~:/</span></p>

<p id="f-doxcnd7ZpdV78Tj4e3IGdbrH01d"><span>链接：</span></p>

<a id="f-doxcnu09p2EL2LRBOf5D9hINOIg"></a>

##### Setup SKILL

<p id="f-doxcnT0I5gNUay0EkcvhTHisphh"><span><span><a href="https://www.bilibili.com/video/BV1CHPqzqE4R/?vd_source=144bec9c3f54e465073138bed788be1b"><span>https://www.bilibili.com/video/BV1CHPqzqE4R/?vd_source=144bec9c3f54e465073138bed788be1b</span></a></span></span></p>

<a id="f-doxcn0hGuFO84zrM95ERdC4jj9d"></a>

##### 模拟面试SKILL

<p id="f-doxcnqmIGYAEAst9Gr6mrEf3hKe"><span><span><a href="https://www.bilibili.com/video/BV1R7PszQEAc/?vd_source=144bec9c3f54e465073138bed788be1b"><span>https://www.bilibili.com/video/BV1R7PszQEAc/?vd_source=144bec9c3f54e465073138bed788be1b</span></a></span></span></p>

<a id="f-doxcnwCMZK1HLOnFSinlNK92jcd"></a>

##### 附录

<p id="f-doxcnhwYbR2UjPyqZ5witVDvVbh"><span>视频中4.7 讲到的一些prompt模板：</span></p>

<p id="f-doxcn9ifWGDQ7RrQqKngAJ5MY8g"><span style="font-weight:bold">1.使用plan的方式，让AI先设计计划，然后走通流程，最后根据经验来写出SKILL：</span></p>

<p id="f-doxcn8YMSrTAbBJTlaWHzIsSKwc"><span>目标：我不是让你直接跑 UI 测试；我是要教你“如何根据 QA_TEST_PLAN 运行并验证 UI 测试（含修复/回归）”，最终请产出一个可复用的 skill.md。</span></p>

<blockquote id="f-doxcnlyV38f9Ahx2rkc2JsAsUTe"><p id="f-doxcn6IzFldGzBsdRPYGNQ4W6oc"><span>❗ 注意这个SKILL我们后来优化了，变成了auto-coder，功能一样的，是更简洁规范的版本。输入自动开发，一键开发等关键字触发。</span></p></blockquote>

<p id="f-doxcnolu3GoRhDV22cs54H4Dykg"><span>上下文（你需要用到）：</span></p>

<ul><li id="f-doxcnxViUVV4zGmKUXmiGRu0Iih"><span>输入：QA_TEST_PLAN（描述要测的功能与步骤）</span></li></ul>

<ul><li id="f-doxcntxv3yuxZG8C9MAJWV3PvNh"><span>输出：QA_TEST_PROGRESS.md（记录你做了什么、结果是什么、下一步是什么） + 最终 skill.md</span></li></ul>

<p id="f-doxcnCI7diTJvFQGrCT4Sn9dkIh"><span>请先在 Plan Mode 给出一个计划（plan），包含：</span></p>

<ul><li id="f-doxcnJsGFjI7JVQDq1Zr5RPsFPf"><span>你需要我补充哪些信息（最少必需项）</span></li></ul>

<ul><li id="f-doxcnlDn6nb7hoKDFu0YrmzqXpd"><span>你要如何从 repo/示例中学习正确的测试写法与运行方式</span></li></ul>

<ul><li id="f-doxcn7Klpm7e3fcdLhNINSC37Uf"><span>你会如何把 AQ_TEST_PLAN 转成可执行步骤与验收标准</span></li></ul>

<ul><li id="f-doxcnROiJeJu2Bsi3W70UDNCTob"><span>你会如何记录到 AQ_TEST_PROGRESS.md</span></li></ul>

<ul><li id="f-doxcnspb9ngURvdVIIwFy0HmK1g"><span>skill.md 的结构大纲（包含：目的、触发条件、步骤、失败处理、Anti-patterns、示例调用）</span></li></ul>

<p id="f-doxcn4ZvWJXSjCjbwMBCsDWopmh"><span>然后我们按计划执行：先把这个流程“手动跑通一次”，中途有问题请及时问我。当我们一起跑通流程后，我确认以后再生成对应的skill</span></p>

<p id="f-doxcnTKtzijGk09GKB171FimYIf"><span style="font-weight:bold">2.生成SPEC 初稿的prompt:</span></p>

<p id="f-doxcnsUtav9OwjpBPpvZKD7JyLh"><span>我想写一份完整的开发规范文档（DEV_SPEC），用于指导一个 Python 项目的全部开发流程。请帮我生成一个大致的框架和初步内容。</span></p>

<p id="f-doxcnq6u4f6MJWpKdwoNeuNpCkb"><span>项目是什么</span></p>

<p id="f-doxcnkHqufKDLniTuAOnStzPrff"><span>我要做一个</span><span style="font-weight:bold">模块化的 RAG (Retrieval-Augmented Generation) 系统</span><span>，同时把它包装成一个 </span></p>

<p id="f-doxcnPIjBnW5jicbO2iiSHKqHub"><span style="font-weight:bold">MCP Server（Model Context Protocol）</span><span>，这样 GitHub Copilot、Claude Desktop 等 AI </span></p>

<p id="f-doxcnAbDLPjMpuc0KF8G34D916p"><span>助手可以直接调用我的知识库进行问答。</span></p>

<p id="f-doxcnAmRnv8kF5MLsAA42z5QCgG"><span>通信方式使用 </span><span style="font-weight:bold">Stdio Transport</span><span>（本地子进程模式），不做 HTTP 部署。</span></p>

<p id="f-doxcnw54Hy0xAnWTOrRsCf1RZth"><span>项目定位与特色</span></p>

<p id="f-doxcnY7u6CrAFKWRjxajNp3iEkb"><span>这个项目不仅是一个功能完备的系统，更重要的是它是一个</span><span style="font-weight:bold">面向学习和面试求职</span><span>的实战项目：</span></p>

<ul><li id="f-doxcnxoqRnKW4m3j1J7kN0asT2c"><span>"教是最好的学"——我会边做边录视频教学，所以架构设计要清晰、易于讲解</span></li></ul>

<ul><li id="f-doxcnUFpEWYT9K6x2txiAS1uagc"><span>配套有技术文档、代码示范和视频讲解</span></li></ul>

<p id="f-doxcnaWXKM8FB57jGFP1FxUiYQh"><span>我已有的技术方向（需要体现在文档中）</span></p>

<ol start="1"><li id="f-doxcnTKnn0FolipqqgQ9mo13HRf"><span style="font-weight:bold">RAG 策略</span><span>：</span></li></ol>

<div id="f-doxcnJvDkoMoyIYXOzspbX1j5Dh" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>智能分块（语义感知，不是简单定长切分）+ 上下文增强（元数据、图片描述注入 chunk）</span></div></div>

<div id="f-doxcnP9cNxzDd14DUPXm5wChSXe" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>混合检索：BM25（稀疏）+ Dense Embedding（稠密），用 RRF 融合</span></div></div>

<div id="f-doxcnIj564AEk0LC0WhPbrPB20b" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>精排重排：支持 Cross-Encoder 和 LLM Rerank，两段式（粗排→精排）</span></div></div>

<ol start="2"><li id="f-doxcnhtXgOUMXx06wAbOKcNKIOe"><span style="font-weight:bold">全链路可插拔架构</span><span>：</span></li></ol>

<div id="f-doxcniA0TjOb6CZOJCdytRVvWLg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>LLM、Embedding、Reranker、VectorStore、Splitter、Evaluator 都要能通过配置切换</span></div></div>

<div id="f-doxcnCn5TRocfX3AyMq69QjoYif" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>工厂模式 + 抽象基类 + 配置驱动（settings.yaml）</span></div></div>

<div id="f-doxcnR5RSjRSzCGFMkzLv3u6Y0f" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>首批实现：Azure OpenAI、OpenAI、Ollama、DeepSeek（LLM）；Chroma（向量库）；</span></div></div>

<p id="f-doxcnCTSQx4DXSdw7bmsHcngDVe"><span>LangChain RecursiveCharacterTextSplitter（切分）</span></p>

<ol start="3"><li id="f-doxcnulvxPlL7vigrZFOXEW58Kh"><span style="font-weight:bold">多模态</span><span>：采用 Image-to-Text 策略（Vision LLM 生成图片描述，缝进 chunk 文本），</span></li></ol>

<p id="f-doxcnmmtTKoVKZtTQHKyroR1gEg"><span>不用 CLIP 多模态向量</span></p>

<ol start="4"><li id="f-doxcnJz2dDFTfOzfkVhff0Fl0Fh"><span style="font-weight:bold">可观测性</span><span>：</span></li></ol>

<div id="f-doxcnvmkVXlCGiRlP8SCobn2Wmd" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>全链路 Trace（Ingestion 链路 + Query 链路），用结构化 JSON Lines 日志</span></div></div>

<div id="f-doxcn5kowtlP0sfPAXxn4R5bRoc" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>Streamlit 本地 Dashboard，不依赖 LangSmith 等外部平台</span></div></div>

<div id="f-doxcnAnU063xigZBjsmIw6kZMwd" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>Dashboard 要有多个页面：系统总览、数据浏览、Ingestion 管理、追踪查看、评估面板等</span></div></div>

<ol start="5"><li id="f-doxcnQyx9QudbJyjifnHbpUYlSe"><span style="font-weight:bold">评估体系</span><span>：可插拔评估框架，支持 Ragas 和自定义指标（hit_rate、MRR 等）</span></li></ol>

<ol start="6"><li id="f-doxcnCNjfKgAMP1zrWwyIsd8Lqf"><span style="font-weight:bold">MCP 集成</span><span>：用 Python 官方 MCP SDK，暴露 tools（query_knowledge_hub、</span></li></ol>

<p id="f-doxcnIRcxaLnzYlOgaAQTMlOCTf"><span>list_collections、get_document_summary 等）</span></p>

<ol start="7"><li id="f-doxcn2VtpyfexGDautXUvIgTKeb"><span style="font-weight:bold">数据摄取</span><span>：PDF → Markdown（用 MarkItDown）→ 分块 → LLM 增强（重写、元数据注入、</span></li></ol>

<p id="f-doxcnAh9N793Is1opcBX7ESqK1d"><span>图片描述）→ 双路 Embedding → Chroma Upsert，支持 SHA256 增量跳过</span></p>

<p id="f-doxcnVjUHd5aB8micfRRejrjuAh"><span>文档结构要求</span></p>

<p id="f-doxcn09tUaJfXFRTtFjDMMrCCsb"><span>请按以下结构来组织这份 DEV_SPEC：</span></p>

<ol start="1"><li id="f-doxcnZQGOiAf5Xino5C2Yqx6CVh"><span style="font-weight:bold">项目概述</span><span>：设计理念、项目定位</span></li></ol>

<ol start="2"><li id="f-doxcngueiUuMnImqYbS4upJas4b"><span style="font-weight:bold">核心特点</span><span>：每个亮点的简要说明</span></li></ol>

<ol start="3"><li id="f-doxcn8YcCf4HUM6YRjzW6EKsszh"><span style="font-weight:bold">技术选型</span><span>：</span></li></ol>

<div id="f-doxcn4ntnNlhIONPH77K8LKwcKV" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>RAG 核心流水线设计（Ingestion Pipeline、Retrieval Pipeline，要详细）</span></div></div>

<div id="f-doxcn5Y0pXNPGwF32VHD138vGuc" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>MCP 服务设计</span></div></div>

<div id="f-doxcnBZerY29KzHBXV0gUpB2Svd" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>可插拔架构设计（接口定义、配置管理）</span></div></div>

<div id="f-doxcnJVp2c1RiinbZOL27gBnklg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>可观测性与 Dashboard 设计</span></div></div>

<div id="f-doxcn8V7ss18fSWnPh4oxqsr5GS" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>多模态图片处理设计</span></div></div>

<ol start="4"><li id="f-doxcnnbIHITdp4YeBYWGexAIrxb"><span style="font-weight:bold">测试方案</span><span>：TDD 理念，分层测试（单元/集成/E2E），RAG 质量评估</span></li></ol>

<ol start="5"><li id="f-doxcnEBGIGTLD3iXMrVYbJpo3qe"><span style="font-weight:bold">系统架构与模块设计</span><span>：</span></li></ol>

<div id="f-doxcnLFFWDoxOJxUmtr2YemwrEd" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>整体架构图（ASCII art）</span></div></div>

<div id="f-doxcnppshBRtohhTQOJqbMFz20c" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>完整的目录结构树</span></div></div>

<div id="f-doxcnQlirqox5eK5WQIoDmDE4Bg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>模块职责说明表</span></div></div>

<div id="f-doxcnRW7lX1bfNJ6kBHALhFrxid" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>数据流说明（Ingestion Flow、Query Flow）</span></div></div>

<div id="f-doxcn9I4nyyg6bPzqZ8A4q4467g" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>配置驱动设计示例</span></div></div>

<ol start="6"><li id="f-doxcnPcls3HGRgUq4EQzD0rLzZI"><span style="font-weight:bold">项目排期</span><span>：</span></li></ol>

<div id="f-doxcnFRHk0znmEbo9skMTpDIQ3e" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>按阶段划分（A→I），每阶段有明确目的</span></div></div>

<div id="f-doxcnieNfsxPsnajVw1i8SuFlkg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>每个子任务要有：修改文件列表、实现的类/函数、验收标准、测试方法</span></div></div>

<div id="f-doxcnxl4ZRLl1IljjGvg2MojcHD" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>约 1 小时一个可验收增量</span></div></div>

<div id="f-doxcnkWkv7iLiJhcHGdej53AX7b" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>包含进度跟踪表</span></div></div>

<p id="f-doxcnS9Ab0gl5gJO47iiXJGjvlh"><span>其他要求</span></p>

<ul><li id="f-doxcnyPlMwy7pWhJ1UcaRHYT5fc"><span>语言：中文</span></li></ul>

<ul><li id="f-doxcnUd8b9k3j75VziMgkHbiETd"><span>技术栈：Python，不使用 LlamaIndex/LangChain 框架（仅使用 LangChain 的 splitter）</span></li></ul>

<ul><li id="f-doxcnTe2z7yDd7R6EiYJuh8vd7d"><span>向量库先只实现 Chroma，架构上预留扩展</span></li></ul>

<ul><li id="f-doxcn9maRt589u79tgPgYMLADJb"><span>本地优先，轻量级，零外部服务依赖（SQLite 做持久化）</span></li></ul>

<ul><li id="f-doxcnNsnmUoQonPN6Jui24M9sMg"><span>测试框架用 pytest</span></li></ul>


<a id="section-0154"></a>
## ForgePilot Agent项目

<a id="f-doxcnPV2M7N5jKt4Cc2YMQP0seb"></a>

<p id="f-doxcnQk4wKnhWwkVHL81FX21dOg"><span>这个项目的定位是一个企业级的Agent项目，上线了，有真实的用户数据，真实运用在了企业工作环境中。</span></p>

<p id="f-doxcnJvTl2JHCC1iO9wU1Nt3VPh"><span>这个是一个虚构的项目，所以不会有代码，但是可以把项目的设计文档，技术文档，思路，真题总结得非常详细。</span></p>

<p id="f-doxcn7VJ9YBV5OpQQoWlKDmbe3g"><span>目前我现在这里占位一下，目前该项目内容可以参考：</span></p>

<p id="f-doxcnuvEXePqkIgs1w0Y798msjr"><span><span><a href="/posts/agent-learning-24-interview-review/#f-doxcnd3gcraXgECWirqD1kbrBdr"><span>简历编写原则</span></a></span></span></p>

<p id="f-doxcnk75wauHwxjAPxGdxBOB0jg"><span>项目面试前突击：</span><span><span><a href="/posts/agent-learning-24-interview-review/#f-doxcnfF7sLFjdM6BowX2p8RJiSc"><span>ForgePilot架构设计</span></a></span></span></p>


<a id="section-0304"></a>
## 技术知识与案例补充

<a id="t-block-14150"></a>

<blockquote id="t-COB68JbOZeoLbEtlDbJxep"><img alt="" decoding="async" height="20" loading="lazy" src="/images/agent-learning/e7d8da4bbb1f22a436983204.svg" width="20"/></blockquote>


<a id="section-0305"></a>
## 20+套项目源码列表如下

<a id="t-9CxDoofW782Vd0qB6P0IOb"></a>

<div id="t-N9BhXafY0CNydxhXfWLY4m"><table><colgroup><col width="57.691986083984375"/><col width="182.99609375"/><col width="513.9575805664062"/><col width="196.59405517578125"/></colgroup><tbody><tr><td style=" background-color: #e5efff"><p><span style="font-weight:bold">编号</span></p></td><td style=" background-color: #e5efff"><p><span style="font-weight:bold">项目名称</span></p></td><td style=" background-color: #e5efff"><p><span style="font-weight:bold">项目简介</span></p></td></tr><tr><td><p><span>1</span></p></td><td><p><span style="font-weight:bold">企业级电商智能客服 RAG </span></p></td><td><p><span>基于 LangChain + LangGraph 电商场景的智能客服问答系统</span></p></td></tr><tr><td><p><span>2</span></p></td><td><p><span style="font-weight:bold;color:#1f1f1f">代码助手</span><span style="font-weight:bold;background-color:transparent;color:#1f1f1f">Agent</span></p></td><td><p><span>编程代码助手</span><span style="background-color:transparent">Agent</span></p></td></tr><tr><td><p><span>3</span></p></td><td><p><span style="font-weight:bold;color:#1f1f1f">企业桌面 AI 工作站</span></p></td><td><p><span>企业桌面 AI 工作站，传统企业转型AI办公必备</span></p></td></tr><tr><td><p><span>4</span></p></td><td><p><span style="font-weight:bold;color:#1f1f1f">企业AI知识库平台</span></p></td><td><p><span>企业内容管理、知识库问答、可视化 AI 工作流编排（Workflow）到智能体（Agent）的全面应用</span></p></td></tr><tr><td><p><span>5</span></p></td><td><p><span style="font-weight:bold;color:#1f1f1f">AI Bot框架</span></p></td><td><p><span>基于 LangChain v1.2 和 LangGraph v1.0 构建的 AI Agent 框架</span></p></td></tr><tr><td><p><span>6</span></p></td><td><p><span style="font-weight:bold;background-color:transparent;color:#1f1f1f">医疗AI Agent</span></p></td><td><p><span>AI智慧问诊，报告解读，药物咨询</span></p></td></tr><tr><td><p><span>7</span></p></td><td><p><span style="font-weight:bold;color:#1f1f1f">简历AI </span><span style="font-weight:bold;background-color:transparent;color:#1f1f1f">Agent</span></p></td><td><p><span>根据用户画像和 JD（职位描述），一键生成完整简历</span></p></td></tr><tr><td><p><span>8</span></p></td><td><p><span style="font-weight:bold;color:#1f1f1f">多 Agent 管理助手</span></p></td><td><p><span style="background-color:transparent">使用LangGraph 编排的多AI Agent</span></p></td></tr><tr><td><p><span>9</span></p></td><td><p><span style="font-weight:bold;color:#1f1f1f">知识库AI </span><span style="font-weight:bold;background-color:transparent;color:#1f1f1f">Agent</span></p></td><td><p><span>RAG知识库</span><span style="background-color:transparent">Agent</span></p></td></tr><tr><td><p><span>10</span></p></td><td><p><span style="font-weight:bold;background-color:transparent;color:#1f1f1f">NL2SQLAgent</span></p></td><td><p><span style="background-color:transparent">NL2SQL / Text-to-SQL 的工程化落地Agent</span></p></td></tr><tr><td><p><span>11</span></p></td><td><p><span style="font-weight:bold;color:#1f1f1f">代码助手AI </span><span style="font-weight:bold;background-color:transparent;color:#1f1f1f">Agent</span></p></td><td><p><span>读代码仓库、语义检索、静态分析、Diff 预览 、LangGraph ReAct 循环</span></p></td></tr><tr><td><p><span>12</span></p></td><td><p><span style="font-weight:bold;background-color:transparent;color:#1f1f1f">爬虫</span><span style="font-weight:bold;color:#1f1f1f">AI </span><span style="font-weight:bold;background-color:transparent;color:#1f1f1f">Agent</span></p></td><td><p><span>LLM 任务规划、多通道抓取、结构化抽取、质量门禁</span></p></td></tr><tr><td><p><span>13</span></p></td><td><p><span style="font-weight:bold;color:#1f1f1f">浏览器自动化 Agent</span></p></td><td><p><span>基于</span><span style="background-color:transparent">Playwright + LangGraph开发的浏览器自动化Agent</span></p></td></tr><tr><td><p><span>14</span></p></td><td><p><span style="font-weight:bold;background-color:transparent;color:#1f1f1f">个人助理Copilot</span></p></td><td><p><span>基于LangGraph 驱动工具选择（日历、邮件、待办），智能安排个人工作及行程</span></p></td></tr><tr><td><p><span>15</span></p></td><td><p><span style="font-weight:bold;color:#1f1f1f">多模态</span><span style="font-weight:bold;background-color:transparent;color:#1f1f1f">Agent</span></p></td><td><p><span style="background-color:transparent">能识图、OCR、ASR、视频摘要理解的Agent</span></p></td></tr><tr><td><p><span>16</span></p></td><td><p><span style="font-weight:bold;background-color:transparent;color:#1f1f1f">AI 作曲</span></p></td><td><p><span>实时语音数字人管线</span><span style="background-color:transparent">Agent</span></p></td></tr><tr><td><p><span>17</span></p></td><td><p><span style="font-weight:bold;color:#1f1f1f">短视频生成</span><span style="font-weight:bold;background-color:transparent;color:#1f1f1f">Agent</span></p></td><td><p><span>通过LangGraph 编排分镜 LLM + 万相异步文生视频 + 跨 Agent 调 BGM + ffmpeg 混流，最后生成视频</span></p></td></tr><tr><td><p><span>18</span></p></td><td><p><span style="font-weight:bold;background-color:transparent;color:#1f1f1f">语音数字人Agent</span></p></td><td><p><span style="background-color:transparent">实时语音数字人管线</span></p></td></tr><tr><td><p><span>19</span></p></td><td><p><span style="font-weight:bold;color:#1f1f1f">VRM 伴侣</span><span style="font-weight:bold;background-color:transparent;color:#1f1f1f">Agent</span></p></td><td><p><span>Character 模型、六维性格参数、LangGraph parse 层把 LLM 文本映射为 VRM 表情</span></p></td></tr><tr><td><p><span>20</span></p></td><td><p><span style="font-weight:bold;background-color:transparent;color:#1f1f1f">角色扮演Agent</span></p></td><td><p><span>基于规则引擎 + LLM 驱动动态角色生成</span></p></td></tr><tr><td><p><span>21</span></p></td><td><p><span style="font-weight:bold;color:#1f1f1f">Docker 部署</span><span style="font-weight:bold;background-color:transparent;color:#1f1f1f">Agent</span></p></td><td><p><span>多 Agent 系统的运维与治理</span><span style="background-color:transparent">Agent</span></p></td></tr><tr><td><p><span>22</span></p></td><td><p><span style="font-weight:bold">类 Figma AI D2C</span></p></td><td><p><span>一个面向前端代码生成场景的 AI 编码平台，提供从自然语言/Figma 输入、代码生成、实时进度展示，到代码预览、质量评估与项目管理的一体化工作台</span></p></td></tr></tbody></table></div>


<a id="section-0307"></a>
## 企业桌面 AI 工作站

<a id="t-ry9n9xs9ychxcal5f44939"></a>

<div id="t-eykRHdTO6XLE3bHEKgQgS4"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/98e208681110a4bacb14edc3.png"/></div>

<div id="t-Temu41zS6EcpACoTpHHcce"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/4d1663965624c6c1a270fe3a.png"/></div>

<div id="t-NhNgARHGaqXa2Vfr9BpuW2"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/5409c5a5d50e1a2db3a5d4d2.png"/></div>

<div id="t-AflHBJPBOXvZgP4WAUWGm6"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/973390ed5d43e3c333b52747.png"/></div>


<a id="section-1568"></a>
## AI Agent 垂直应用场景

<a id="t-block-22309"></a>

<p id="t-TmVf9Sqyjp5H9nGNh6R5sd"><span>不同领域对 Agent 有不同的需求和特点。</span></p>

<p id="t-3uG4xcPLeyyoyVAWS16ebP"><span>通过领域定制，Agent 能够提供更专业的服务。</span></p>


<a id="section-1569"></a>
## 代码 Agent

<a id="t-bWexHoiirSJg7Eo9dB98V5"></a>

<p id="t-mDNnKsw2vCkcJ7yWmTSGmV"><span>代码 Agent 是当前最成功的 Agent 应用领域之一。</span></p>

<p id="t-TxXcERYPWNszaoSlyCIA42"><span>能够理解代码库、编写新代码、调试问题。</span></p>


<a id="section-1570"></a>
## 核心能力

<a id="t-hFSbs6Kj6S6j9DEXCF4trt"></a>

<p id="t-yWjgykLtieloAdfZ733dNR"><span style="font-weight:bold">代码补全</span><span>：根据上下文预测下一段代码。</span></p>

<p id="t-VMNYEHfqWMwpPgETV38gOO"><span style="font-weight:bold">代码生成</span><span>：根据自然语言描述生成代码。</span></p>

<p id="t-sFCA0gE8hYIVyTPd0d0mki"><span style="font-weight:bold">代码审查</span><span>：发现代码中的问题和改进点。</span></p>

<p id="t-MgjwBKGPrR25Ub52gGI6XY"><span style="font-weight:bold">Bug 定位</span><span>：分析错误信息，定位问题根源。</span></p>

<p id="t-Rl2Z0lYrhS1ebmRq5zX3oa"><span style="font-weight:bold">代码重构</span><span>：提出并执行代码优化建议。</span></p>


<a id="section-1571"></a>
## 代表系统

<a id="t-JqUdkf0wXprzLk8Pjzbkd1"></a>

<div id="t-mMp3b81f6WVkgCXclEBDad"><table><colgroup><col width="185.9010009765625"/><col width="166.00677490234375"/><col width="262.00164794921875"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>系统</span></p></td><td style=" vertical-align: top"><p><span>开发公司</span></p></td><td style=" vertical-align: top"><p><span>特点</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>GitHub Copilot</span></p></td><td style=" vertical-align: top"><p><span>GitHub/OpenAI</span></p></td><td style=" vertical-align: top"><p><span>代码补全为主，实时建议</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>Claude Code</span></p></td><td style=" vertical-align: top"><p><span>Anthropic</span></p></td><td style=" vertical-align: top"><p><span>命令行助手，深度代码理解</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>Devin</span></p></td><td style=" vertical-align: top"><p><span>Cognition</span></p></td><td style=" vertical-align: top"><p><span>自主编程，端到端任务执行</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>Cursor</span></p></td><td style=" vertical-align: top"><p><span>Cursor</span></p></td><td style=" vertical-align: top"><p><span>AI 代码编辑器，深度 IDE 集成</span></p></td></tr></tbody></table></div>


<a id="section-1573"></a>
## Text2SQL Agent 实现

<a id="t-ZQUad8AuQeKGY8NkDuNNbp"></a>

<pre id="t-ujnJNHUhmNi0ojWOBVOm1K"><code>class Text2SQLAgent:
 """
    Text2SQL Agent
    将自然语言转换为 SQL 查询
    """

 def __init__(self, llm, schema):
        self.llm = llm
 # 数据库 Schema 信息
        self.schema = schema

 def convert(self, question):
 """
        将自然语言问题转换为 SQL
        :param question: 自然语言问题
        :return: SQL 查询语句
        """
        prompt = f"""
你是一个 SQL 专家。

数据库 Schema：
{self.schema}

规则：
1. 只生成 SELECT 查询（不支持 INSERT/UPDATE/DELETE）
2. 使用合理的表别名
3. 添加必要的 JOIN 条件
4. 使用清晰的列别名

问题：{question}

请生成对应的 SQL 查询。
"""
        sql = self.llm.generate(prompt)

 # 安全检查
 return self.sanitize(sql)

 def sanitize(self, sql):
 """
        SQL 安全检查
        确保不包含危险操作
        """
 # 转小写检查
        sql_lower = sql.lower().strip()

 # 检查是否只包含 SELECT
        forbidden_keywords = [
 "insert", "update", "delete", "drop",
 "create", "alter", "truncate", "exec",
 "execute", "grant", "revoke"
 ]

 for keyword in forbidden_keywords:
 if keyword in sql_lower:
 raise ValueError(f"禁止的关键字: {keyword}")

 return sql

 def execute(self, question, db_connection):
 """
        执行 Text2SQL 查询
        """
        sql = self.convert(question)
        cursor = db_connection.cursor()
        cursor.execute(sql)
        results = cursor.fetchall()
        columns = [desc[0] for desc in cursor.description]
 return {"columns": columns, "rows": results}</code></pre>


<a id="section-1574"></a>
## 数据分析 Agent

<a id="t-OwdXfbIdqpqaeYrrMFNT6K"></a>

<p id="t-9X9HtDl8okY8tbGQMiGCRt"><span>数据分析 Agent 能够理解数据需求，执行查询，生成分析报告。</span></p>

<p id="t-otiXldJ5Vg4gf2yAstETtu"><span>让非技术人员也能进行复杂的数据分析。</span></p>


<a id="section-1575"></a>
## 核心能力

<a id="t-BkYMHIYcowWXs9D9691poW"></a>

<p id="t-NNaAm5FFCJxjj2QnyjHFwl"><span style="font-weight:bold">数据理解</span><span>：理解数据库结构和数据含义。</span></p>

<p id="t-oFRHHjFiVKaa9CfVvDH0xr"><span style="font-weight:bold">查询生成</span><span>：Text2SQL，将自然语言转为查询。</span></p>

<p id="t-v527bbYfyPJhh20vv2ieO9"><span style="font-weight:bold">可视化</span><span>：生成图表建议和配置。</span></p>

<p id="t-RxcfLv95P1j2ambr0AgSn5"><span style="font-weight:bold">报告生成</span><span>：分析结果，生成自然语言报告。</span></p>


<a id="section-1577"></a>
## 数据分析 Agent 实现

<a id="t-1DtJmdmlDbxHmJOBw866CX"></a>

<pre id="t-BYS2ZJxkehvkqipVN6kMJe"><code>class DataAnalysisAgent:
 """
    数据分析 Agent
    理解数据需求，执行分析，生成报告
    """

 def __init__(self, llm, db_connection, chart_generator):
        self.llm = llm
        self.db = db_connection
        self.chart_generator = chart_generator

 def analyze(self, request):
 """
        处理数据分析请求
        """
 # 第一步：理解分析需求
        intent = self.parse_intent(request)

 # 第二步：生成查询
        query = self.generate_query(intent)

 # 第三步：执行查询
        data = self.execute_query(query)

 # 第四步：分析数据
        analysis = self.perform_analysis(data, intent)

 # 第五步：生成可视化建议
        charts = self.suggest_charts(analysis)

 # 第六步：生成报告
        report = self.generate_report(analysis, charts)

 return {
 "intent": intent,
 "query": query,
 "data": data,
 "analysis": analysis,
 "charts": charts,
 "report": report
 }

 def parse_intent(self, request):
 """解析用户意图"""
        prompt = f"""
分析以下数据请求，提取关键信息：

请求：{request}

请提取：
1. 分析目标（比较、趋势、分布等）
2. 涉及的表和字段
3. 时间范围（如果有）
4. 筛选条件（如果有）
"""
 return self.llm.generate(prompt)

 def generate_query(self, intent):
 """生成 SQL 查询"""
        prompt = f"""
基于以下意图生成 SQL 查询：

{intent}

数据库 Schema：
{self.get_schema()}
"""
 return self.llm.generate(prompt)

 def execute_query(self, query):
 """执行查询"""
        cursor = self.db.cursor()
        cursor.execute(query)
        columns = [desc[0] for desc in cursor.description]
        rows = cursor.fetchall()
 return {"columns": columns, "rows": rows}

 def perform_analysis(self, data, intent):
 """执行数据分析"""
 # 简化实现
 import statistics

        rows = data["rows"]
        columns = data["columns"]

        analysis = {
 "row_count": len(rows),
 "summary": {}
 }

 # 对数值列计算统计信息
 for i, col in enumerate(columns):
 if self.is_numeric(rows, i):
                values = [row[i] for row in rows if row[i] is not None]
 if values:
                    analysis["summary"][col] = {
 "min": min(values),
 "max": max(values),
 "avg": statistics.mean(values),
 "median": statistics.median(values)
 }

 return analysis

 def suggest_charts(self, analysis):
 """推荐可视化图表"""
        suggestions = []

 # 根据分析类型推荐图表
 if "trend" in str(analysis).lower():
            suggestions.append({
 "type": "line",
 "description": "折线图，适合展示趋势变化"
 })

 if "comparison" in str(analysis).lower():
            suggestions.append({
 "type": "bar",
 "description": "柱状图，适合对比不同类别"
 })

        suggestions.append({
 "type": "table",
 "description": "数据表格，展示详细数据"
 })

 return suggestions

 def generate_report(self, analysis, charts):
 """生成分析报告"""
        prompt = f"""
基于以下分析结果，生成自然语言报告：

分析结果：
{analysis}

推荐图表：
{charts}

请生成一份清晰的分析报告。
"""
 return self.llm.generate(prompt)</code></pre>


<a id="section-1578"></a>
## 客服 Agent

<a id="t-kp92xN2RPinEaarRXgStRz"></a>

<p id="t-GHWKhZDF2GwbN5ObBPwAJH"><span>客服 Agent 需要处理多轮对话，理解用户意图，提供准确的回复。</span></p>

<p id="t-DqrHUesghCfltDKMJJcHFh"><span>是 AI 落地最广泛的场景之一。</span></p>


<a id="section-1579"></a>
## 核心能力

<a id="t-vsue0arugTjE3MVny5QMHb"></a>

<p id="t-kY8V5wsJU6hFkqyiCdxBI8"><span style="font-weight:bold">意图识别</span><span>：理解用户想做什么。</span></p>

<p id="t-LuTfEC6cHAjSwiLNPx2k96"><span style="font-weight:bold">槽位填充</span><span>：提取关键信息（时间、地点等）。</span></p>

<p id="t-qJKh7OZOoMOYanqivhvtXV"><span style="font-weight:bold">对话状态跟踪</span><span>：管理多轮对话上下文。</span></p>

<p id="t-txueADocENYtGvjSmuKtG9"><span style="font-weight:bold">回复生成</span><span>：生成自然、专业的回复。</span></p>


<a id="section-1581"></a>
## 客服 Agent 实现

<a id="t-XT4y47f01mcHY5P3Zp7m44"></a>

<pre id="t-xpZA69IzDt1ceooAKxgIkm"><code>class CustomerServiceAgent:
 """
    客服 Agent
    处理用户咨询，提供服务支持
    """

 def __init__(self, llm, knowledge_base, dialogue_manager):
        self.llm = llm
 # 知识库
        self.knowledge_base = knowledge_base
 # 对话管理器
        self.dialogue_manager = dialogue_manager

 def handle(self, user_input, session_id):
 """
        处理用户消息
        """
 # 获取对话历史
        history = self.dialogue_manager.get_history(session_id)

 # 识别用户意图
        intent = self.recognize_intent(user_input, history)

 # 根据意图处理
 if intent.type == "greeting":
            response = self.handle_greeting()
 elif intent.type == "inquiry":
            response = self.handle_inquiry(intent)
 elif intent.type == "complaint":
            response = self.handle_complaint(intent)
 elif intent.type == "order_status":
            response = self.handle_order_status(intent)
 elif intent.type == "refund":
            response = self.handle_refund(intent)
 else:
            response = self.handle_general(user_input)

 # 更新对话历史
        self.dialogue_manager.add_message(
            session_id,
 {"role": "user", "content": user_input}
 )
        self.dialogue_manager.add_message(
            session_id,
 {"role": "assistant", "content": response}
 )

 return response

 def recognize_intent(self, text, history):
 """识别用户意图"""
        prompt = f"""
分析用户消息，识别意图类型。

当前消息：{text}

对话历史：
{history}

意图类型：
- greeting: 打招呼
- inquiry: 咨询问题
- complaint: 投诉
- order_status: 查订单
- refund: 退款
- goodbye: 道别

请输出意图类型和置信度。
"""
        result = self.llm.generate(prompt)
 return Intent.parse(result)

 def handle_inquiry(self, intent):
 """处理咨询"""
 # 从知识库检索相关内容
        relevant_docs = self.knowledge_base.search(intent.query)

 if relevant_docs:
 # 有相关文档，基于文档回答
            prompt = f"""
基于以下文档回答用户问题。

文档：
{relevant_docs}

问题：{intent.query}
"""
 return self.llm.generate(prompt)
 else:
 # 没有相关文档，转人工或记录
 return "这个问题我需要进一步了解，请稍等我来为您查询。"


class Intent:
 """用户意图"""

 def __init__(self, type, query, confidence):
        self.type = type
        self.query = query
        self.confidence = confidence

 @classmethod
 def parse(cls, text):
 """解析意图文本"""
 # 简化实现
 return cls(type="inquiry", query=text, confidence=0.9)</code></pre>


<a id="section-1582"></a>
## 调研 Agent

<a id="t-dWm2CBDkpcl5bM8OMbpYPT"></a>

<p id="t-A07vtE5YaD5AmdJeKbLSVt"><span>调研 Agent 能够自主进行深入调研，搜集和综合信息。</span></p>

<p id="t-n9rWl78Z4ffsRPKyBvDPgs"><span>模拟人类研究员的工作方式。</span></p>


<a id="section-1583"></a>
## 核心能力

<a id="t-k4E63cVWKRLn6JIVfxNdxc"></a>

<p id="t-q2EWHkWhbKxmjpVwXCfs4t"><span style="font-weight:bold">搜索规划</span><span>：制定信息搜集计划。</span></p>

<p id="t-kbO5p4YL6vqNcyREJXIXg2"><span style="font-weight:bold">多源搜集</span><span>：从多个来源收集信息。</span></p>

<p id="t-qfQpvWhD9ZCR77MXWqJkDW"><span style="font-weight:bold">信息验证</span><span>：交叉验证信息准确性。</span></p>

<p id="t-9rlJb6YZLwke9PsmjFDPtq"><span style="font-weight:bold">报告生成</span><span>：综合信息，生成结构化报告。</span></p>


<a id="section-1585"></a>
## 调研 Agent 实现

<a id="t-EZfYjjc4PCynFaB31uHqZL"></a>

<pre id="t-77py4MQYTyuRgR0aFQAxFc"><code>class ResearchAgent:
 """
    调研 Agent
    自主进行深度调研，生成报告
    """

 def __init__(self, search_tools, llm):
 # 搜索工具列表
        self.search_tools = search_tools
        self.llm = llm

 def research(self, topic, depth=3):
 """
        执行调研任务
        :param topic: 调研主题
        :param depth: 调研深度（搜索轮数）
        """
 # 第一步：制定调研计划
        plan = self.create_research_plan(topic, depth)

 # 第二步：执行多轮搜索
        findings = []
 for phase in plan.phases:
 # 并行搜索多个方向
            phase_results = self.search_phase(phase)
            findings.extend(phase_results)

 # 综合当前发现
            synthesis = self.synthesize(findings)
            findings.append({
 "type": "synthesis",
 "content": synthesis,
 "phase": phase.number
 })

 # 第三步：生成最终报告
        report = self.generate_report(findings)

 return {
 "topic": topic,
 "plan": plan,
 "findings": findings,
 "report": report
 }

 def create_research_plan(self, topic, depth):
 """创建调研计划"""
        prompt = f"""
为以下调研主题制定详细计划：

主题：{topic}
深度：{depth}

请规划：
1. 需要调研的关键方向（3-5 个）
2. 每个方向需要回答的核心问题
3. 信息来源建议
"""
 return ResearchPlan.parse(self.llm.generate(prompt))

 def search_phase(self, phase):
 """执行单个搜索阶段"""
        results = []

 for query in phase.queries:
 # 使用搜索工具搜索
 for tool in self.search_tools:
                search_results = tool.search(query)
                results.extend(search_results)

 return results

 def synthesize(self, findings):
 """综合发现"""
        prompt = f"""
综合以下研究发现，提取关键信息：

发现列表：
{findings}

请提取：
1. 主要结论
2. 支持结论的证据
3. 存在的争议或不确定性
4. 需要进一步调研的问题
"""
 return self.llm.generate(prompt)

 def generate_report(self, findings):
 """生成最终报告"""
        prompt = f"""
基于以下研究发现，生成结构化报告：

研究发现：
{findings}

报告要求：
1. 执行摘要
2. 背景介绍
3. 主要发现（分主题）
4. 结论和建议
5. 参考来源

请生成完整报告。
"""
 return self.llm.generate(prompt)


class ResearchPlan:
 """调研计划"""

 @classmethod
 def parse(cls, text):
 """解析计划文本"""
 # 简化实现
 return cls(phases=[
            ResearchPhase(number=1, queries=["相关主题1"], goals=["了解基本概念"]),
            ResearchPhase(number=2, queries=["相关主题2"], goals=["深入分析"]),
 ])

 def __init__(self, phases):
        self.phases = phases


class ResearchPhase:
 """调研阶段"""

 def __init__(self, number, queries, goals):
        self.number = number
        self.queries = queries
        self.goals = goals</code></pre>


<a id="section-1587"></a>
## RPA + Agent

<a id="t-C1rzhAmBIPtXqORxA4xKOe"></a>

<p id="t-VDbEUDLRRSWrOm5E3ScXTd"><span>RPA（机器人流程自动化）与 Agent 的结合。</span></p>

<p id="t-uN57uE3y9ncvJr5TF9CYsp"><span>能够实现更复杂的业务流程自动化。</span></p>

<p id="t-n0NXXuSxYM0tJObPj1tbrp"><span>Agent 赋予 RPA 智能决策能力。</span></p>


<a id="section-1588"></a>
## 游戏 NPC Agent

<a id="t-mxiaZICXXW176iXQR3esoC"></a>

<p id="t-KT62wALMmt4gSRlEWaLwsR"><span>游戏中的 NPC（非玩家角色）Agent。</span></p>

<p id="t-R3bppjNg78BNrTa7dz421p"><span>能够进行动态对话、情节生成、角色扮演。</span></p>

<p id="t-7iS1mvT41bLcYoBQNHYD0r"><span>创造更真实的游戏世界体验。</span></p>


<a id="section-1589"></a>
## 科研 Agent

<a id="t-FzqM2qRF1wMh4UkwHvwYTg"></a>

<p id="t-H7aCYp9qvcoSaW40K8Fb2C"><span>AI for Science 正在改变科学研究。</span></p>

<p id="t-e1XbqcxXzKG7KE95yw6w4t"><span style="font-weight:bold">文献综述</span><span>：自动阅读和总结大量论文。</span></p>

<p id="t-5jw8453EkxMZPQmplYFFtD"><span style="font-weight:bold">实验设计</span><span>：提出实验方案和假设。</span></p>

<p id="t-xbKf3tokXqJdneEEBCLnw0"><span style="font-weight:bold">数据分析</span><span>：处理实验数据，发现规律。</span></p>

<p id="t-gaEGao0dwoUJtDUefzvcCi"><span style="font-weight:bold">论文写作</span><span>：辅助撰写科研论文。</span></p>


<a id="section-1590"></a>
## 章节小结

<a id="t-uh9KcEXhPuY5lfnCNYtd2r"></a>

<p id="t-ppKauYma19pBwjLsv9qQ6x"><span>本章节介绍了 Agent 在各个垂直领域的应用。</span></p>

<p id="t-dgExgztqNpG9UM7DBSGZHP"><span style="font-weight:bold">代码 Agent</span><span> 辅助编程，提高开发效率。</span></p>

<p id="t-m579Pf3eefG5omI8POw0y1"><span style="font-weight:bold">数据分析 Agent</span><span> 让非技术人员也能分析数据。</span></p>

<p id="t-NHPZ5rwx0M8lh9hOWeC3b6"><span style="font-weight:bold">客服 Agent</span><span> 提供智能客户服务。</span></p>

<p id="t-7njgidChkXOSA2TRifOoBI"><span style="font-weight:bold">调研 Agent</span><span> 自主进行深度调研。</span></p>

<p id="t-BtPVWzkYu6Myq7QPB0kQbo"><span>还有 RPA+Agent、游戏 NPC、科研 Agent 等更多场景。</span></p>

<p id="t-xsiPE3R03cCV4XyuzYQkhX"><span>垂直领域的 Agent 需要结合领域知识进行定制。</span></p>

<p id="t-GSVfQEzb4SkcN5Vsd0m2EY"><span>选择合适的场景和切入点，是成功落地的关键。</span></p>


<a id="section-1644"></a>
## 全能智能助手

<a id="t-block-22503"></a>

<div id="t-CCzkudA8SnHE0AJF8XQozT"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/24f1b29adcc387dd9a99a93c.png"/></div>


<a id="section-1645"></a>
## LangChain 实战教程：从入门到实战

<a id="t-xLmfbMBQ5Zbte6pcfBaID2"></a>

<blockquote id="t-rRtPY9oXQzceRRrcYCC43C"><span>一份接地气的 LangChain 学习指南，带你从零开始构建 AI 应用</span></blockquote>


<a id="section-1646"></a>
## 写在前面

<a id="t-qh2E8mfeG5Khor3ZDlzsfX"></a>

<blockquote id="t-V8oGLm7d2dZ976yvTUSLoP"><img alt="" decoding="async" height="20" loading="lazy" src="/images/agent-learning/adc2dd4d08bf27fd97397504.svg" width="20"/><p id="t-mvrumn7yYqUpdLjxgi5GUe"><span>这份教程不会堆砌概念，可以用最直白的话告诉你 LangChain 是什么、怎么用。代码都是能跑的，直接抄就行。 </span><span style="font-weight:bold">适合学AI应用开发，或者后端转AI开发的想快速上手的同学。</span></p></blockquote>

<p id="t-c6ATXjz5U61KbJdVD1tvZm"><span style="font-weight:bold">适合谁看：</span></p>

<ul><li id="t-aL6dSKaNYcHNOwlGSC9QTj"><span style="background-color:#ffeead">听说过 ChatGPT，想自己做点 AI 应用的开发者</span></li></ul>

<ul><li id="t-6sa4DHdHgRzr0nqWhOIa0q"><span style="background-color:#ffeead">被官方文档绕晕的同学</span></li></ul>

<ul><li id="t-IKHpUio51CQRk8yIsA0LVG"><span style="background-color:#ffeead">想快速上手实战项目的人</span></li></ul>

<div id="t-QvNhB3raeYgEtmFGGk9iWn"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/541909a6650cdd6382f53bc6.png"/></div>


<a id="section-1648"></a>
## 一句话解释

<a id="t-kAniRkUhw0GFTIiwgFvJWx"></a>

<p id="t-B7oeNpCSnhwykpFV29ktQG"><span style="font-weight:bold">LangChain = 让大模型能"动手干活"的框架</span></p>

<p id="t-Z1SLuzDsCBrCFM0QPZJ3as"><span>光靠 ChatGPT 只能聊天，但通过 LangChain，你可以让 AI：</span></p>

<blockquote id="t-GuyeCEXwGInKrdQnBsoAUD"><img alt="" decoding="async" height="20" loading="lazy" src="/images/agent-learning/e7d8da4bbb1f22a436983204.svg" width="20"/><ul><li id="t-TTDtrt4g4paiTNoBqG6eOx"><span>查天气、搜网页</span></li></ul>
<ul><li id="t-N78cOb2o8ffgC3nwsdZcFb"><span>读文件、写代码</span></li></ul>
<ul><li id="t-DFPTA1QIeUrlwgpRRzt2tN"><span>调用你公司的内部 API</span></li></ul>
<ul><li id="t-HnN1BdwE6myKqnAGLrLQpR"><span>自己决定该做什么</span></li></ul></blockquote>


<a id="section-1649"></a>
## 架构图

<a id="t-UWXL8XV0w7TmARaT7wB85W"></a>

<div id="t-KajyEyR2oI3tNZkasv1D0U"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/4fd58f25567f28b92723d34b.png"/></div>


<a id="section-1650"></a>
## 核心能力

<a id="t-mp5sUeRuG6CtoxOsnlqXAO"></a>

<div id="t-U6TFfcU99AMTld4vViKNsb"><table><colgroup><col width="120"/><col width="205.90264892578125"/><col width="343.00848388671875"/></colgroup><tbody><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">能力</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">说明</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">举个例子</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">模型抽象</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">一套代码适配多个大模型</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">今天用 GPT-4，明天换 Claude，代码不用改</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">工具调用</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">让 AI 能调用外部功能</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">AI 可以帮你查股票、发邮件、操作数据库</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">记忆管理</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">让 AI 记住对话历史</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">多轮对话不会"失忆"</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">Agent</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">让 AI 自主决策</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">给它一个目标，它自己规划怎么完成</span></p></td></tr></tbody></table></div>


<a id="section-1652"></a>
## 安装依赖

<a id="t-hQzK5SuAFjcRCejAffFanu"></a>

<pre id="t-LcNa3od9RZrDNzxCbxpbnr"><code># 创建虚拟环境（推荐）
python -m venv langchain_env
source langchain_env/bin/activate  # Mac/Linux
# langchain_env\Scripts\activate   # Windows

# 安装 LangChain 核心包
pip install langchain langchain-core langchain-community

# 根据你用的模型安装对应包
pip install langchain-openai       # OpenAI
pip install langchain-anthropic    # Claude
pip install dashscope              # 通义千问

# 其他常用包
pip install python-dotenv          # 环境变量管理
pip install langgraph             # Agent 运行时（新版必装）</code></pre>


<a id="section-1653"></a>
## 配置 API Key

<a id="t-h2Rb5WQr5SVyPKskhSI7hw"></a>

<p id="t-7Fg6LilYOpFwmGVy5lFTGK"><span>创建 </span><span>.env</span><span> 文件：</span></p>

<pre id="t-zAUOYDIz1gxX3xxQjfFyyX"><code># OpenAI
OPENAI_API_KEY=sk-xxx

# 或者通义千问
DASHSCOPE_API_KEY=sk-xxx

# Claude
ANTHROPIC_API_KEY=sk-xxx</code></pre>


<a id="section-1654"></a>
## 验证安装

<a id="t-UhBCeXG6l11B36oTpCQNBf"></a>

<pre id="t-cty2zt8Ez9tb4VjJM2Idea"><code>from dotenv import load_dotenv
import os

load_dotenv()

# 通义千问示例
from langchain_community.chat_models import ChatTongyi

llm = ChatTongyi(
    model="qwen-turbo",
    dashscope_api_key=os.getenv("DASHSCOPE_API_KEY")
)

response = llm.invoke("你好，请用一句话介绍自己")
print(response.content)</code></pre>

<p id="t-MylViUxRez5s5TUeFHfCm0"><span>跑通了就说明环境 OK！</span></p>


<a id="section-1655"></a>
## 核心概念速览

<a id="t-j9N0D1QOxZTSCyhFURx9o2"></a>

<blockquote id="t-eavsjgm1XfxQAwobbirOdv"><img alt="" decoding="async" height="20" loading="lazy" src="/images/agent-learning/dbea451b6cba787df0bb9bc8.svg" width="20"/><p id="t-28pxI9SUWIhVxqHJL5h9xu"><span>LangChain 的核心就四个东西，搞懂了就入门了：</span></p></blockquote>


<a id="section-1656"></a>
## 概念地图

<a id="t-h4GuTD2QnkB2y0lpkPMPTH"></a>

<div id="t-O68L2BlDjJ2K9JSso3eQKM"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/80f09e50c444909aec7a6318.png"/></div>


<a id="section-1657"></a>
## 四大核心

<a id="t-xRtyJL2RwQKOgwZXmNiswg"></a>

<div id="t-LGUjClFJC0Swj6IKXiV8an"><table><colgroup><col width="120"/><col width="184.89752197265625"/><col width="214.00506591796875"/></colgroup><tbody><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">概念</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">是什么</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">类比</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">Model</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">大语言模型</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">大脑</span></p></td></tr><tr></tr><tr></tr><tr></tr></tbody></table></div>


<a id="section-1658"></a>
## 智能出行Agent助手

<a id="t-block-22546"></a>

<div id="t-rSRAP9pbolcyogVQSXnZgy"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/fe775bb8438fcd0adb38854c.png"/></div>


<a id="section-1659"></a>
## 📌 项目概述

<a id="t-hbeX3U6UG6wb93hhzyJDpa"></a>

<p id="t-OsjEUUnPqUROSScJP48EDn"><span>本项目是一个基于 </span><span style="font-weight:bold">MCP (Model Context Protocol)</span><span> 和 </span><span style="font-weight:bold">LangChain/LangGraph</span><span> 的智能助手Agent系统。它允许大语言模型（如阿里通义千问）通过标准化协议连接多种外部工具，实现天气查询、文件写入、地图导航等功能。</span></p>

<div id="t-ZEb8gKZj0mSE9ToWE0dd9h"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/c876ba8d4f495156c1610a1f.png"/></div>

<div id="t-Mp4OfbK3tFxv5e7MNqodYl"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/86a26caeadf18fceb2aaa941.png"/></div>


<a id="section-1660"></a>
## MCP Agent 智能助手效果演示

<a id="t-ovoymxBaFjwqobCDjiKXho"></a>

<div id="t-xLFfZMCLC5ay2v3YUcuII8"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/f79b83b7fe24bfa69a3e1d0a.png"/></div>

<div id="t-wPYX516xXmG68pGvXEqltA"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/1c00f5b7b8cd758c45684829.png"/></div>

<div id="t-Z1p7piJ75qAo9Fb39ygfkL"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/18234aa12a1539ae99fee552.png"/></div>


<a id="section-1662"></a>
## 什么是 MCP（Model Context Protocol）？

<a id="t-eb5bL9JW0del8Z798Pd44I"></a>

<p id="t-GLhMLGlTi0YnO6LSdOuU5k"><span style="font-weight:bold">MCP（模型上下文协议）</span><span> 是 Anthropic 公司推出的一种开放标准协议，用于连接 AI 模型与外部数据源和工具。</span></p>

<p id="t-Cq64o6n8MhWnz6dKBbfLLN"><span style="font-weight:bold">通俗理解</span><span>： 想象你有一个非常聪明的助手（大语言模型），但它被关在一个房间里，只能用已有的知识回答问题。MCP 就像是给这个房间开了很多"窗户"，让助手可以：</span></p>

<ul><li id="t-9gdzyUYyRdsFmyrCL7Pyex"><span>🌤️ 看到外面的天气（天气API）</span></li></ul>

<ul><li id="t-qfa6RudolwQ1osyPbXRe5Y"><span>📁 操作电脑上的文件（文件系统）</span></li></ul>

<ul><li id="t-juGnTG296zoNonEUOxp7aN"><span>🗺️ 查询地图信息（地图服务）</span></li></ul>

<pre id="t-d5RY7WZHujJIh7EseNYPH3"><code>┌─────────────────────────────────────────────────────────────┐
│                     MCP 的核心思想                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   传统方式：每个工具都需要单独适配                                │
│   ┌──────┐    ┌──────┐    ┌──────┐                          │
│   │ 工具A │    │ 工具B │   │ 工具C │                          │
│   └──┬───┘    └──┬───┘    └──┬───┘                          │
│      │ 适配A     │ 适配B     │ 适配C                          │
│      └───────────┴───────────┘                              │
│                  │                                          │
│              ┌───┴───┐                                      │
│              │  LLM  │                                      │
│              └───────┘                                      │
│                                                             │
│   MCP 方式：统一协议，即插即用                                  │
│   ┌──────┐    ┌──────┐    ┌──────┐                          │
│   │ 工具A │    │ 工具B │   │ 工具C │                          │
│   └──┬───┘    └──┬───┘    └──┬───┘                          │
│      │           │           │                              │
│      └─────── MCP 协议 ──────┘                               │
│                  │                                          │
│              ┌───┴───┐                                      │
│              │  LLM  │                                      │
│              └───────┘                                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘</code></pre>


<a id="section-1663"></a>
## 什么是 RAG（检索增强生成）？

<a id="t-6R0XAMOH9CRNTOYumJf0Fu"></a>

<div id="t-AwYGazTE2GcIAUKz1k4TiY"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/ae998a0e7e0ce361bf03a144.png"/></div>

<p id="t-tH8auseezQHau3PN8Kun0d"><span style="font-weight:bold">RAG（Retrieval-Augmented Generation）</span><span> 是另一种增强 AI 能力的技术，与 MCP 有所不同。</span></p>

<div id="t-d7tJMNcD0ueFxmac5QQuJz"><table><colgroup><col width="120"/><col width="292.90264892578125"/><col width="271.89752197265625"/></colgroup><tbody><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">特性</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">MCP</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">RAG</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">核心功能</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">连接外部工具/API</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">检索外部知识库</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">使用场景</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">执行操作（查天气、写文件）</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">回答基于文档的问题</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">数据流向</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">双向（可读可写）</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">单向（只读检索）</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">典型组件</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">MCP Server、工具</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">向量数据库、Embedding</span></p></td></tr></tbody></table></div>

<p id="t-h6W106495u7gZKnoMFIjHQ"><span style="font-weight:bold">注意</span><span>：本项目使用的是 </span><span style="font-weight:bold">MCP 技术</span><span>，不是 RAG 技术。</span></p>


<a id="section-1664"></a>
## 什么是 Milvus？

<a id="t-BmtP6kssG2B8NgQFXhjSAe"></a>

<p id="t-01ffSmUj7Ncf1gb4n5Bome"><span style="font-weight:bold">Milvus</span><span> 是一个开源的向量数据库，主要用于 RAG 场景中存储和检索文档的向量表示。</span></p>

<p id="t-NoFvwVoYE31bjtMVBsGz6q"><span>由于本项目使用的是 MCP 协议来连接外部工具，而不是基于向量检索的 RAG 架构，因此 </span><span style="font-weight:bold">本项目没有使用 Milvus</span><span>。</span></p>

<p id="t-DAWAMGK1LyMpfN1akN3ke6"><span>如果您想构建一个 RAG 系统，Milvus 的基本用法如下：</span></p>

<pre id="t-NVbofmawK5d0zVIIvAo5D9"><code># RAG 系统中 Milvus 的典型用法（本项目未使用）
from pymilvus import connections, Collection

# 1. 连接 Milvus
connections.connect("default", host="localhost", port="19530")

# 2. 创建集合存储向量
collection = Collection("documents")

# 3. 插入文档向量
collection.insert([document_vectors])

# 4. 检索相似内容
results = collection.search(query_vector, limit=5)</code></pre>


<a id="section-1665"></a>
## 什么是 LangChain 和 LangGraph？

<a id="t-zZOUWbNDd55gUEXKsaDvJX"></a>

<p id="t-tUwQfGJXQC792TiyTr5VWl"><span style="font-weight:bold">LangChain</span><span> 是一个用于构建 LLM 应用的框架，提供了：</span></p>

<ul><li id="t-Ocuy5uT4Ku4ok9sYVWEJn0"><span>模型调用的统一接口</span></li></ul>

<ul><li id="t-GFiMYpbTG4NsJYBK3RtWNw"><span>工具集成能力</span></li></ul>

<ul><li id="t-uaKaBIUWLb3J0DEMZjnbPe"><span>链式调用（Chain）</span></li></ul>

<p id="t-DQPxrcTvfWckNm1tQmMDmc"><span style="font-weight:bold">LangGraph</span><span> 是 LangChain 团队推出的扩展，专注于：</span></p>

<ul><li id="t-ZcEgAWIMqBsbzd1W8fk932"><span>构建有状态的 AI Agent</span></li></ul>

<ul><li id="t-0a8sCT6W0fJ2BUbtoyCfdq"><span>支持多轮对话记忆</span></li></ul>

<ul><li id="t-vopcbhPqvzGGeiD93lFcWL"><span>提供 ReAct 模式的 Agent</span></li></ul>

<pre id="t-MVkiZqRfUy9cc5mTrHIW3f"><code># 本项目使用 LangGraph 的 ReAct Agent
from langgraph.prebuilt import create_react_agent

agent = create_react_agent(
    model=model, # 大语言模型
    tools=tools, # MCP 工具列表
    prompt=prompt, # 系统提示词
    checkpointer=checkpointer  # 记忆存储
)</code></pre>


<a id="section-1667"></a>
## 整体架构

<a id="t-iD7SzcPOBFDkxyHkdBHTjL"></a>

<p id="t-qwvUzpBBj9fdC1UnM3gkGr"><span>本项目采用 </span><span style="font-weight:bold">客户端-服务器</span><span> 架构，包含以下核心组件：</span></p>

<pre id="t-jYtyy6JQcbjKi1xt7kJEBk"><code>┌─────────────────────────────────────────────────────────────────────┐
│                        系统整体架构                                   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  用户层                                                              │
│  ┌─────────────┐  ┌─────────────┐                                   │
│  │  CLI 客户端  │  │ API 客户端  │                                    │
│  │ (client.py) │  │  (HTTP)     │                                   │
│  └──────┬──────┘  └──────┬──────┘                                   │
│         │                │                                          │
│  ───────┴────────────────┴───────────────────────────────────────   │
│                                                                     │
│  应用层                                                              │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │                    LangGraph ReAct Agent                    │    │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │    │
│  │  │   通义千问   │  │  记忆存储   │  │   Prompt 模板          │  │    │
│  │  │  (ChatTongyi)│  │ (InMemory)  │  │ (agent_prompts.txt) │  │    │
│  │  └─────────────┘  └─────────────┘  └─────────────────────┘  │    │
│  └──────────────────────────┬──────────────────────────────────┘    │
│                             │                                       │
│  ───────────────────────────┴───────────────────────────────────    │
│                                                                     │
│  MCP 适配层                                                          │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │              MultiServerMCPClient                           │    │
│  │     (langchain-mcp-adapters)                                │    │
│  └───────────┬──────────────┬──────────────┬───────────────────┘    │
│              │              │              │                        │
│  ───────────┴──────────────┴──────────────┴─────────────────────    │
│                                                                     │
│  MCP 服务器层                                                        │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐            │
│  │ Weather Server│  │ Write Server  │  │  高德地图 SSE  │            │
│  │   (STDIO)     │  │   (STDIO)     │  │   (HTTP/SSE)  │            │
│  └───────┬───────┘  └───────┬───────┘  └───────┬───────┘            │
│          │                  │                  │                    │
│  ────────┴──────────────────┴──────────────────┴────────────────    │
│                                                                     │
│  外部服务层                                                           │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐            │
│  │ OpenWeather   │  │  本地文件系统   │  │   高德地图API  │             │
│  │     API       │  │               │  │               │            │
│  └───────────────┘  └───────────────┘  └───────────────┘            │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘</code></pre>


<a id="section-1668"></a>
## 文件结构

<a id="t-eivhmL0ikbwdFw52PCezD1"></a>

<pre id="t-1i6yfmbFrJ8DSLZbos76DO"><code>project/
├── api_server.py        # FastAPI 服务器（提供 HTTP API）
├── client.py            # CLI 交互式客户端
├── client_simple.py     # 单次调用示例
├── weather_server.py    # 天气查询 MCP 服务器
├── write_server.py      # 文件写入 MCP 服务器
├── servers_config.json  # MCP 服务器配置
├── agent_prompts.txt    # Agent 提示词
├── requirements.txt     # Python 依赖
└── .env                 # 环境变量（API Key）</code></pre>


<a id="section-1669"></a>
## 数据流程

<a id="t-ymHck1iUq7MPSRQ4eAsF6B"></a>

<pre id="t-KYSHATio0jo0i9ddb4qaSU"><code>用户输入 "北京今天天气怎么样？"
           │
           ▼
    ┌──────────────┐
    │  Agent 接收   │
    └──────┬───────┘
           │
           ▼
    ┌──────────────┐
    │  LLM 思考    │  "用户询问天气，我应该使用 query_weather 工具"
    └──────┬───────┘
           │
           ▼
    ┌──────────────┐
    │ 调用 MCP 工具 │  query_weather("Beijing")
    └──────┬───────┘
           │
           ▼
    ┌──────────────┐
    │ Weather Server│  → 调用 OpenWeather API
    └──────┬───────┘
           │
           ▼
    ┌──────────────┐
    │  返回结果    │  🌡 温度: 15°C, 🌤 天气: 晴
    └──────┬───────┘
           │
           ▼
    ┌──────────────┐
    │  LLM 组织回复 │  "北京今天天气晴朗，温度15°C..."
    └──────┬───────┘
           │
           ▼
      用户看到回复</code></pre>


<a id="section-1671"></a>
## MCP 服务器配置 (servers_config.json)

<a id="t-WNrz1Rt9MokSDLlGs13EwE"></a>

<pre id="t-5GAHp49iAGq7mlJwVNoM0n"><code>{
 "mcpServers": {
 "weather": {
 "command": "python",
 "args": ["weather_server.py"],
 "transport": "stdio" // 标准输入输出通信
 },
 "write": {
 "command": "python",
 "args": ["write_server.py"],
 "transport": "stdio"
 },
 "amap-maps": {
 "transport": "sse", // Server-Sent Events 通信
 "url": "https://mcp.api-inference.modelscope.net/099239f1c74241/sse"
 }
 }
}</code></pre>

<p id="t-E2BtE3719HZ47CLVU6zX7s"><span style="font-weight:bold">关键点解析</span><span>：</span></p>

<div id="t-0WK2MjhQHtigmAVwo0cGXe"><table><colgroup><col width="165.89755249023438"/><col width="436.0084838867187"/></colgroup><tbody><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">配置项</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">说明</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">command</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">启动服务器的命令</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">args</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">命令行参数</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">transport</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">通信方式：stdio（本地进程）或 sse（远程HTTP）</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">url</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">远程服务器地址（仅 SSE 模式需要）</span></p></td></tr></tbody></table></div>


<a id="section-1672"></a>
## 天气服务器 (weather_server.py)

<a id="t-A2N93eUrZtNDVl2ZPxKtyR"></a>

<pre id="t-SymFmRjzEoOxXnfMTfzsT8"><code>from mcp.server.fastmcp import FastMCP

# 初始化 MCP 服务器
mcp = FastMCP("WeatherServer")

@mcp.tool() # 装饰器将函数注册为 MCP 工具
async def query_weather(city: str) -&gt; str:
 """
    输入指定城市的英文名称，返回今日天气查询结果。
    :param city: 城市名称（需使用英文）
    :return: 格式化后的天气信息
    """
    data = await fetch_weather(city) # 调用 OpenWeather API
 return format_weather(data) # 格式化返回

@mcp.tool()
async def get_weather_tips(season: str) -&gt; str:
 """
    获取指定季节的天气贴士。
    :param season: 季节名称 (spring, summer, autumn, winter)
    """
    tips = {
 "spring": "🌸 春季多风，注意防风保暖",
 "summer": "☀️ 夏季炎热，注意防暑",
 # ...
 }
 return tips.get(season.lower(), "❓ 未知季节")

if __name__ == "__main__":
    mcp.run(transport='stdio') # 以 STDIO 模式启动</code></pre>

<p id="t-6kztGHVBArVrBG6YcKyGQe"><span style="font-weight:bold">关键点解析</span><span>：</span></p>

<ol start="1"><li id="t-b3ZeEMVJpzsxgqFmQiFV2x"><span style="font-weight:bold">@mcp.tool()</span><span style="font-weight:bold"> 装饰器</span><span>：将普通函数注册为 MCP 工具，LLM 可以自动发现和调用</span></li></ol>

<ol start="2"><li id="t-xLWxlVKscTDx1UIqnHT1Yc"><span style="font-weight:bold">函数文档字符串</span><span>：非常重要！LLM 通过文档字符串理解工具的功能</span></li></ol>

<ol start="3"><li id="t-80eAVly2N6hiOwDotENnhO"><span style="font-weight:bold">transport='stdio'</span><span>：通过标准输入/输出与客户端通信</span></li></ol>


<a id="section-1673"></a>
## API 服务器 (api_server.py)

<a id="t-X4NjaKuU33YTzeSeyVdAk5"></a>

<pre id="t-X7fECvKaFwpV9RP0Fdjb3U"><code>from fastapi import FastAPI
from langgraph.prebuilt import create_react_agent
from langchain_mcp_adapters.client import MultiServerMCPClient

# 全局变量
mcp_client: MultiServerMCPClient = None
agent = None

@asynccontextmanager
async def lifespan(app: FastAPI):
 """FastAPI 生命周期管理"""
 global mcp_client, agent

 # 1. 读取 MCP 服务器配置
    servers_cfg = Configuration.load_servers()

 # 2. 连接 MCP 服务器并获取工具
    mcp_client = MultiServerMCPClient(servers_cfg)
    tools = await mcp_client.get_tools()

 # 3. 初始化 ReAct Agent
    model = ChatTongyi(model=cfg.model, streaming=False)
    checkpointer = InMemorySaver() # 内存中保存对话历史

    agent = create_react_agent(
        model=model,
        tools=tools,
        prompt=prompt,
        checkpointer=checkpointer
 )

 yield # 应用运行中

 # 4. 清理资源
 await mcp_client.cleanup()

app = FastAPI(lifespan=lifespan)

@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
 """聊天接口"""
    result = await agent.ainvoke(
 {"messages": [HumanMessage(content=request.message)]},
 {"configurable": {"thread_id": request.thread_id}}
 )
 return ChatResponse(content=result["messages"][-1].content)</code></pre>

<p id="t-4qptN3w6qzIR8Mwi4Ar2lf"><span style="font-weight:bold">关键点解析</span><span>：</span></p>

<ol start="1"><li id="t-8xGdeQ5CdsdlLuEEWwGgcM"><span style="font-weight:bold">lifespan</span><span style="font-weight:bold"> 上下文管理器</span><span>：</span></li></ol>

<div id="t-i1srmdFCf0p9TH2KRuZc1n" style="display:flex;gap:0.5em"><span style="min-width:1.5em">a.</span><div><span>应用启动时初始化 MCP 连接和 Agent</span></div></div>

<div id="t-dwsOKIJUxOv99K1EYvJCrZ" style="display:flex;gap:0.5em"><span style="min-width:1.5em">b.</span><div><span>应用关闭时清理资源</span></div></div>

<ol start="2"><li id="t-jpcIjqw18A06yj71NKe64s"><span style="font-weight:bold">MultiServerMCPClient</span><span>：</span></li></ol>

<div id="t-kDKt546hEipX8mOXJhVgk2" style="display:flex;gap:0.5em"><span style="min-width:1.5em">a.</span><div><span>同时连接多个 MCP 服务器</span></div></div>

<div id="t-M5T1uJwqvLwvKN0Kk7WbcW" style="display:flex;gap:0.5em"><span style="min-width:1.5em">b.</span><div><span>自动获取所有可用工具</span></div></div>

<ol start="3"><li id="t-QWmB2pg7bOXC3rsfCcV8ks"><span style="font-weight:bold">create_react_agent</span><span>：</span></li></ol>

<div id="t-0BeBFbzq6XYq4xXrvghKS4" style="display:flex;gap:0.5em"><span style="min-width:1.5em">a.</span><div><span>创建 ReAct 模式的 Agent</span></div></div>

<div id="t-oCPmx1AxZIltBakcDCmDEX" style="display:flex;gap:0.5em"><span style="min-width:1.5em">b.</span><div><span>ReAct = Reasoning + Acting（推理 + 行动）</span></div></div>

<ol start="4"><li id="t-mcQwec9LwwJIzvcb3gRCyZ"><span style="font-weight:bold">checkpointer</span><span>：</span></li></ol>

<div id="t-cgIS5L2tBlSTFKKZoQF0Fe" style="display:flex;gap:0.5em"><span style="min-width:1.5em">a.</span><div><span>保存对话历史</span></div></div>

<div id="t-PMCQ3Lcbvv46FjQZsmOdf9" style="display:flex;gap:0.5em"><span style="min-width:1.5em">b.</span><div><span>支持多轮对话</span></div></div>


<a id="section-1674"></a>
## CLI 客户端 (client.py)

<a id="t-0kUk2beZVYRQ77zsI7UWWn"></a>

<pre id="t-Ar1SpfohN4u60476AJOOfl"><code>async def run_chat_loop() -&gt; None:
 """启动 MCP-Agent 聊天循环"""

 # 1. 连接多台 MCP 服务器
    mcp_client = MultiServerMCPClient(servers_cfg)
    tools = await mcp_client.get_tools()

 # 2. 初始化大模型
    model = ChatTongyi(model=cfg.model)

 # 3. 构造 Agent（带记忆）
    checkpointer = InMemorySaver()
    agent = create_react_agent(
        model=model,
        tools=tools,
        prompt=prompt,
        checkpointer=checkpointer
 )

 # 4. CLI 聊天循环
 while True:
        user_input = input("\n你: ").strip()
 if user_input.lower() == "quit":
 break

        result = await agent.ainvoke(
 {"messages": [{"role": "user", "content": user_input}]},
            config={"configurable": {"thread_id": "1"}} # 对话ID
 )
 print(f"\nAI: {result['messages'][-1].content}")

 # 5. 清理
 await mcp_client.cleanup()</code></pre>

<p id="t-4hpynndOosIMPiIbUF6aQN"><span style="font-weight:bold">关键点解析</span><span>：</span></p>

<ol start="5"><li id="t-cPG4hI034y596Y2c31iDqw"><span style="font-weight:bold">thread_id</span><span>：用于区分不同的对话会话，保持上下文</span></li></ol>

<ol start="6"><li id="t-waAHf131WwZlBlCbavmLUo"><span style="font-weight:bold">ainvoke</span><span>：异步调用 Agent 处理消息</span></li></ol>

<ol start="7"><li id="t-ovEcJCWptogJwTLZjsxFRQ"><span style="font-weight:bold">消息格式</span><span>：LangChain 标准消息格式 </span><span>{"role": "user", "content": "..."}</span></li></ol>


<a id="section-1676"></a>
## ReAct Agent 工作原理

<a id="t-DKaOHXW8WNfDAjFUxPrMqX"></a>

<p id="t-PimdNIqtHX4QIKQyKnwaXL"><span>ReAct（Reasoning and Acting）是一种让 LLM 具备"思考-行动-观察"能力的模式：</span></p>

<pre id="t-VsfuWLSsNMv8IgCITXAo7z"><code>┌─────────────────────────────────────────────────────────────────┐
│                    ReAct 循环                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   用户问题: "查询北京天气并保存到文件"                           │
│                                                                 │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │ 循环 1                                                  │   │
│   │ ┌──────────┐                                            │   │
│   │ │ 思考     │ "首先需要查询北京的天气"                    │   │
│   │ └────┬─────┘                                            │   │
│   │      ▼                                                  │   │
│   │ ┌──────────┐                                            │   │
│   │ │ 行动     │ 调用 query_weather("Beijing")              │   │
│   │ └────┬─────┘                                            │   │
│   │      ▼                                                  │   │
│   │ ┌──────────┐                                            │   │
│   │ │ 观察     │ 返回: "🌡 温度: 15°C..."                   │   │
│   │ └──────────┘                                            │   │
│   └─────────────────────────────────────────────────────────┘   │
│                         │                                       │
│                         ▼                                       │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │ 循环 2                                                  │   │
│   │ ┌──────────┐                                            │   │
│   │ │ 思考     │ "已获取天气，现在需要保存到文件"            │   │
│   │ └────┬─────┘                                            │   │
│   │      ▼                                                  │   │
│   │ ┌──────────┐                                            │   │
│   │ │ 行动     │ 调用 write_file("北京天气: 15°C...")       │   │
│   │ └────┬─────┘                                            │   │
│   │      ▼                                                  │   │
│   │ ┌──────────┐                                            │   │
│   │ │ 观察     │ 返回: "✅ 已成功写入文件"                   │   │
│   │ └──────────┘                                            │   │
│   └─────────────────────────────────────────────────────────┘   │
│                         │                                       │
│                         ▼                                       │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │ 最终回复                                                │   │
│   │ "我已查询到北京今天的天气（温度15°C），并保存到文件中"   │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘</code></pre>


<a id="section-1677"></a>
## MCP 通信协议

<a id="t-oneMV1MmNzA39UuZbswS7T"></a>

<p id="t-bodFsGjz9c3TYoNPclywRX"><span>MCP 支持两种通信方式：</span></p>

<p id="t-PMa2lamNTxJVTmmry3puvs"><span style="font-weight:bold">STDIO 模式（本地进程）</span><span>：</span></p>

<pre id="t-tiUTNK8dtR8TRWv2Z32W4n"><code>┌───────────────┐    stdin/stdout    ┌───────────────┐
│   MCP Client  │ ◄───────────────► │   MCP Server  │
│ (Agent)       │                    │ (weather.py)  │
└───────────────┘                    └───────────────┘</code></pre>

<p id="t-Jzd5EuDfjjKuq9ZVbNARiO"><span style="font-weight:bold">SSE 模式（远程服务）</span><span>：</span></p>

<pre id="t-EV71wERIrRG0a3L2XoBPdP"><code>┌───────────────┐     HTTP/SSE       ┌───────────────┐
│   MCP Client  │ ◄───────────────► │   远程 MCP    │
│ (Agent)       │                    │   服务器       │
└───────────────┘                    └───────────────┘</code></pre>


<a id="section-1679"></a>
## 环境准备

<a id="t-ZqK0in3RgWNYGvG9yU47cj"></a>

<pre id="t-RNwvco4iPodVF2dRrLIkAX"><code># 1. 克隆项目
git clone &lt;项目地址&gt;
cd mcp-agent-project

# 2. 创建虚拟环境
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 3. 安装依赖
pip install -r requirements.txt</code></pre>


<a id="section-1680"></a>
## 配置环境变量

<a id="t-6TCFDsq8ZQPnmVfKUA0G70"></a>

<p id="t-spO0tPE54qxjLyRXUB9GdI"><span>创建 </span><span>.env</span><span> 文件：</span></p>

<pre id="t-sQCyMtwCkeqTlTQMZXAmCb"><code># 阿里通义千问 API Key
DASHSCOPE_API_KEY=your_api_key_here

# 模型名称（可选，默认 qwen-plus）
MODEL=qwen-plus

# OpenWeather API Key（天气服务需要）
OPENWEATHER_API_KEY=your_openweather_key</code></pre>


<a id="section-1681"></a>
## 运行方式

<a id="t-Q6DcxXhwf5q28HvoPyd5Hs"></a>

<p id="t-NBTyiBOxPBeW4uDOf2dLat"><span style="font-weight:bold">方式一：CLI 交互模式</span></p>

<pre id="t-PClKnvNRvUi1zP59hZ5sXI"><code>python client.py</code></pre>

<p id="t-A8FfFl74Q4qt206XhHwtBI"><span style="font-weight:bold">方式二：API 服务模式</span></p>

<pre id="t-vB4JB2Zl8Qi61PlBWZ9Pyb"><code># 启动服务
python api_server.py

# 调用 API
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "北京今天天气怎么样？"}'</code></pre>

<p id="t-LEbCKOUmdNrog6xkQTikEC"><span style="font-weight:bold">方式三：单次调用</span></p>

<pre id="t-1m9gmNJqnf5wzyr4DS9M57"><code>python client_simple.py</code></pre>


<a id="section-1683"></a>
## 添加新的 MCP 工具

<a id="t-37hbv5st3zLnuUrzYgPBUd"></a>

<ol start="1"><li id="t-mF5OyeNujXEuJ78435ZQQK"><span>创建新的服务器文件，如 </span><span>calculator_server.py</span><span>：</span></li></ol>

<pre id="t-YdsimJHCHEoss24vUJsYm1"><code>from mcp.server.fastmcp import FastMCP

mcp = FastMCP("CalculatorServer")

@mcp.tool()
async def calculate(expression: str) -&gt; str:
 """
    计算数学表达式。
    :param expression: 数学表达式，如 "2 + 3 * 4"
    :return: 计算结果
    """
 try:
        result = eval(expression) # 注意：生产环境需要安全处理
 return f"结果: {result}"
 except Exception as e:
 return f"计算错误: {e}"

if __name__ == "__main__":
    mcp.run(transport='stdio')</code></pre>

<ol start="2"><li id="t-PctpsczfO8bNFz7S5wsUNJ"><span>在 </span><span>servers_config.json</span><span> 中注册：</span></li></ol>

<pre id="t-f3HCLitvUW98z5H0LkfA9t"><code>{
 "mcpServers": {
 "calculator": {
 "command": "python",
 "args": ["calculator_server.py"],
 "transport": "stdio"
 }
 }
}</code></pre>


<a id="section-1684"></a>
## 自定义 Prompt

<a id="t-t4cZWdBjpx8feE72lKgQVS"></a>

<p id="t-MaUh5G7LdK5HjF7Cve9X4t"><span>修改 </span><span>agent_prompts.txt</span><span>：</span></p>

<pre id="t-TrmgXlYgwc39Jg2iNGpt1b"><code>你是一个专业的智能助手，具备以下能力：

1. **天气查询**：可以查询全球各地的实时天气
2. **文件管理**：可以将信息保存到本地文件
3. **地图导航**：可以查询地点、规划路线

使用指南：
- 用户询问天气时，请使用 query_weather 工具
- 需要保存信息时，请使用 write_file 工具
- 涉及地点搜索时，请使用地图相关工具

请以友好、专业的方式回复用户。</code></pre>


<a id="section-1686"></a>
## Q1: MCP 服务器启动失败？

<a id="t-1MlvsKCtaTdEsTQ0o7nlXH"></a>

<p id="t-t3in0F1x4IiyIvhiKmR0vJ"><span>检查以下几点：</span></p>

<ul><li id="t-6wicKwiYZhqzcFrnIR0YZU"><span>Python 环境是否正确激活</span></li></ul>

<ul><li id="t-a2NAqzA1Ij60sxlh7NJtc3"><span>依赖是否完整安装</span></li></ul>

<ul><li id="t-DXh9YrzVrJNwaAjZGVPa5n"><span>servers_config.json</span><span> 路径配置是否正确</span></li></ul>


<a id="section-1687"></a>
## Q2: API Key 无效？

<a id="t-NEMA0cKOx1GvyEgtRg5N7R"></a>

<ul><li id="t-ZFkciWhNuIZYSxAzIG1c2M"><span>确认 </span><span>.env</span><span> 文件存在且格式正确</span></li></ul>

<ul><li id="t-IVMhktkxxZFpCVF8c5X1pz"><span>确认 API Key 没有过期</span></li></ul>

<ul><li id="t-oOrdYQwgZ3IaneAZRnzMRO"><span>检查是否有多余的空格或引号</span></li></ul>


<a id="section-1688"></a>
## Q3: 工具调用失败？

<a id="t-PJ945vp0yCBbjxoneHQsix"></a>

<ul><li id="t-EngiGeDownXMdghxuw6mIj"><span>查看工具的文档字符串是否清晰描述了功能</span></li></ul>

<ul><li id="t-XUCUi7GiOkF0jjsIskzHTc"><span>确认参数类型和名称是否正确</span></li></ul>

<ul><li id="t-Vuficnd6yHVj5S2BOuBJkt"><span>检查网络连接（对于远程 API）</span></li></ul>


<a id="section-1689"></a>
## 八、技术栈总结

<a id="t-aDYPro90LCYyCXk9VW8tL7"></a>

<div id="t-LLI5wAC4D53PSVimfNlZCs"><table><colgroup><col width="120"/><col width="231.902587890625"/><col width="256.008544921875"/></colgroup><tbody><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">组件</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">技术</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">作用</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">大模型</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">通义千问 (Qwen)</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">理解意图、生成回复</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">Agent 框架</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">LangGraph</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">构建 ReAct Agent</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">MCP 适配</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">langchain-mcp-adapters</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">连接 MCP 服务器</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">MCP 服务器</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">FastMCP</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">实现工具服务</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">API 服务</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">FastAPI</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">提供 HTTP 接口</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">配置管理</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">python-dotenv</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">环境变量管理</span></p></td></tr></tbody></table></div>


<a id="section-1690"></a>
## 九、参考资料

<a id="t-QOrOFFUMFy43bviKQKI8Wo"></a>

<ul><li id="t-W4jOwYNeURwwtlBic8RCx4"><span>MCP 官方文档</span></li></ul>

<ul><li id="t-hDgdy60o1UPglawnBteA0W"><span>LangGraph 文档</span></li></ul>

<ul><li id="t-zKMZuzPkuGRfm0bDGa3Xtw"><span>LangChain MCP Adapters</span></li></ul>

<ul><li id="t-W9meVSduu4gVrCfrNRcUs0"><span>通义千问 API</span></li></ul>


<a id="section-1691"></a>
## RAG 知识库助手

<a id="t-block-22716"></a>

<div id="t-6YNtde1AGZn4xdgmULimvZ"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/1a3dd6706264939fd12f1053.png"/></div>


<a id="section-1692"></a>
## RAG 知识库问答系统 - 从0到1完整指南

<a id="t-aoGgvKrdrxdUZbYnClEkfw"></a>

<blockquote id="t-2BfXfT0EFo5TyHQlz11XV6"><span>基于 Milvus 向量数据库 + LangChain + DashScope 的本地知识库问答解决方案</span></blockquote>

<div id="t-KGa2aQR7RwAVAsqXeoxOTN"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/0aa2f250bbd54325ad688589.png"/></div>


<a id="section-1694"></a>
## RAG 的定义

<a id="t-S9kysE36EuqWmZeXoc1mcj"></a>

<p id="t-H12o8x2hhUGPTrjARGgIdi"><span style="font-weight:bold;background-color:#ffeead">RAG（Retrieval-Augmented Generation，检索增强生成）</span><span style="background-color:#ffeead"> 是一种将</span><span style="font-weight:bold;background-color:#ffeead">信息检索</span><span style="background-color:#ffeead">与</span><span style="font-weight:bold;background-color:#ffeead">大语言模型（LLM）生成</span><span style="background-color:#ffeead">相结合的技术。</span></p>

<p id="t-96LDAyhAjey9bxNCTxlppt"><span>用一个简单的比喻来理解：</span></p>

<blockquote id="t-51yu8hX0yRimR6U1eaMIUm"><span>想象你在参加一场开卷考试。RAG 就像是：</span><span>📚 </span><span style="font-weight:bold">你的参考书</span><span>（知识库）</span><span>🔍 </span><span style="font-weight:bold">快速翻书找答案的能力</span><span>（检索系统）</span><span>🧠 </span><span style="font-weight:bold">理解并组织答案的大脑</span><span>（大语言模型）</span></blockquote>


<a id="section-1695"></a>
## 为什么需要 RAG？

<a id="t-Wm5UYimDHNkun6qaHdUJNw"></a>

<div id="t-EFpwHzinsgUQ52NWnnCt0H"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/fc5b665ed8a2288780856ca7.png"/></div>

<p id="t-cO1VHbrD7kSi0VbGpcN5cl"><span>传统大语言模型存在几个问题：</span></p>

<div id="t-m16pZk5XYGZSlauzzG5epH"><table><colgroup><col width="120"/><col width="220.89752197265625"/><col width="256.00341796875"/></colgroup><tbody><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">问题</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">说明</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">RAG 如何解决</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">知识过时</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">模型训练后不再更新</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">可以随时更新知识库</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">幻觉问题</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">模型可能"编造"答案</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">基于真实文档生成回答</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">领域限制</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">缺乏专业/私有知识</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">可导入任意专业文档</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">不可追溯</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">无法知道答案来源</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">可以引用原始文档</span></p></td></tr></tbody></table></div>


<a id="section-1696"></a>
## RAG 的工作流程

<a id="t-mDnukW8xf9KjGPgVwJEYJD"></a>

<pre id="t-Mclta21UJCSvgtyhQKNdVb"><code>┌─────────────────────────────────────────────────────────────┐
│                    RAG 完整工作流程                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  【索引阶段 - 离线处理】                                       │
│                                                             │
│  文档 → 加载 → 切分 → 向量化 → 存入向量数据库                    │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  【检索阶段 - 在线查询】                                       │
│                                                             │
│  问题 → 向量化 → 相似度搜索 → 获取相关文档 → LLM生成答案           │
│                                                             │
└─────────────────────────────────────────────────────────────┘</code></pre>


<a id="section-1698"></a>
## 向量数据库简介

<a id="t-OZMNW31R0ucluBjYq4sf74"></a>

<p id="t-4QHeFeYyYAQc5QSE2AFqlJ"><span>在理解 Milvus 之前，我们需要先了解什么是</span><span style="font-weight:bold">向量</span><span>：</span></p>

<p id="t-35ZTNGDFOwNyVlK9NNznNZ"><span style="font-weight:bold">向量（Vector）</span><span> 是一组数字，用来表示文本、图片等数据的"语义特征"。</span></p>

<p id="t-J99LrczyHLn0oKt0dkUUGB"><span>例如：</span></p>

<pre id="t-0iI7AsmH37V8F1nOagLwQk"><code>"猫"  → [0.23, -0.45, 0.78, ..., 0.12]  (1536维向量)
"狗"  → [0.21, -0.42, 0.75, ..., 0.15]  (相似度高！)
"汽车" → [0.89, 0.23, -0.56, ..., 0.67]  (相似度低)</code></pre>

<p id="t-9cMYIaxPqUfNt77acirsWk"><span style="font-weight:bold">向量数据库</span><span> 就是专门用来存储和快速搜索这些向量的数据库。</span></p>


<a id="section-1699"></a>
## Milvus 是什么？

<a id="t-b6FZaM10SzJjAkFaYm29PZ"></a>

<p id="t-gtWaZO2T6MorchDAQ7LNrm"><span style="font-weight:bold">Milvus</span><span> 是一个开源的向量数据库，专门为 AI 应用设计：</span></p>

<ul><li id="t-ZNC6xK2bShgV26Jbjt8CoO"><span>🚀 </span><span style="font-weight:bold">高性能</span><span>：支持亿级向量的毫秒级搜索</span></li></ul>

<ul><li id="t-5rkpCgSgHjctjcP6wogdEd"><span>📊 </span><span style="font-weight:bold">可扩展</span><span>：支持分布式部署</span></li></ul>

<ul><li id="t-P2cf6zLeh5uzVGPLmQfDxo"><span>🔧 </span><span style="font-weight:bold">易集成</span><span>：提供 Python、Java、Go 等多种 SDK</span></li></ul>

<ul><li id="t-XqSoLQnpeg88sV8rQlODUA"><span>💾 </span><span style="font-weight:bold">持久化</span><span>：数据可靠存储，支持备份恢复</span></li></ul>


<a id="section-1700"></a>
## Milvus 的核心概念

<a id="t-HmeAyNJPSyOtp805Q6LhET"></a>

<div id="t-8HPCsWzjZXTaGNUu4snJrN"><table><colgroup><col width="120"/><col width="158.89752197265625"/><col width="232.89752197265625"/></colgroup><tbody><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">概念</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">类比</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">说明</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">Collection</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">数据库表</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">存储向量数据的容器</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">Entity</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">表中的行</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">一条向量数据记录</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">Field</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">表中的列</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">向量字段、标量字段等</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">Index</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">索引</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">加速搜索的数据结构</span></p></td></tr></tbody></table></div>


<a id="section-1701"></a>
## 本项目中的 Milvus 配置

<a id="t-bhE87AM2UtDfV5gydPRY0g"></a>

<pre id="t-7LiRn4YcY7Yi35ZYL952uf"><code># 连接配置
MILVUS_HOST = "localhost"
MILVUS_PORT = "19530"

# 集合 Schema
fields = [
    FieldSchema(name="id", dtype=DataType.INT64, is_primary=True, auto_id=True),
    FieldSchema(name="name", dtype=DataType.VARCHAR, max_length=255),
    FieldSchema(name="text", dtype=DataType.VARCHAR, max_length=5000),
    FieldSchema(name="embedding", dtype=DataType.FLOAT_VECTOR, dim=1536)
]</code></pre>


<a id="section-1703"></a>
## 整体架构图

<a id="t-H47calM1LyHtLPrBKiX0pB"></a>

<p id="t-nvlBhLGij6dS2GfErEeehq"><span>本项目的架构可以分为两大流程：</span></p>

<p id="t-cdITwXZnzxEAmMMgC4I891"><span style="font-weight:bold">📥 文档索引流程（Indexing Pipeline）</span></p>

<pre id="t-wmEqayAXNZnVdHdzpKBbP2"><code>本地文档 → DocumentLoader → TextSplitter → Embedding Model → Milvus
   ①            ②              ③              ④             ⑤</code></pre>

<p id="t-qK0frVMAUDl7kjw3ijCmuz"><span style="font-weight:bold">🔍 检索问答流程（Retrieval Pipeline）</span></p>

<pre id="t-4wDnAnIPrOXwoPh33un6r3"><code>用户提问 → Query Embedding → Vector Search → Top-K Results → LLM → 答案
   ⑥            ⑦              ⑧             ⑨           ⑩    ⑪</code></pre>


<a id="section-1704"></a>
## 技术栈

<a id="t-ZgYUdEDo5u3rKk1fAA8WoF"></a>

<div id="t-htWiLaMrX9Yi3e2jqblefV"><table><colgroup><col width="151.89755249023438"/><col width="193.89752197265625"/><col width="198.00860595703125"/></colgroup><tbody><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">组件</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">技术选型</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">用途</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">向量数据库</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">Milvus</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">存储和检索向量</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">应用框架</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">LangChain</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">构建 RAG 流水线</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">嵌入模型</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">DashScope text-embedding-v1</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">文本向量化</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">大语言模型</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">Qwen-Plus</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">生成回答</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">Web 框架</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">Flask</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">提供 REST API</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">文档处理</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">PyPDF、Docx2txt 等</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">解析各类文档</span></p></td></tr></tbody></table></div>


<a id="section-1705"></a>
## 核心概念详解

<a id="t-oXiqugNCkImdbhNDYZTmEB"></a>

<div id="t-oIG9LJ6MkoVqiUgbN0YNVZ"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/677734da7ade5c6b6abfeaf5.png"/></div>


<a id="section-1706"></a>
## 文本切分（Text Splitting）

<a id="t-KXGa8vIb7TsThxlsPAaFLi"></a>

<p id="t-5TdMj75GP0vZsBrsZptayB"><span>为什么需要切分文本？</span></p>

<ol start="1"><li id="t-B93MReKbcCBQm8W5KNB1Bv"><span style="font-weight:bold">嵌入模型有长度限制</span><span>：大多数模型最多处理 512-8192 个 token</span></li></ol>

<ol start="2"><li id="t-fkRRFmZm0gvaSq5w8ElMr7"><span style="font-weight:bold">检索精度</span><span>：较短的文本块更容易精确匹配</span></li></ol>

<ol start="3"><li id="t-ZN9GbrhbR3gfEMg5UwZONZ"><span style="font-weight:bold">上下文控制</span><span>：LLM 的上下文窗口有限</span></li></ol>

<p id="t-ugplAWFwrGySjaJrPB0Eix"><span>本项目使用 </span><span>RecursiveCharacterTextSplitter</span><span>：</span></p>

<pre id="t-m4urXWVC2G8SylA4KQr73e"><code>self.text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=500, # 每块最大 500 字符
    chunk_overlap=50, # 相邻块重叠 50 字符
    separators=["\n\n", "\n", "。", "！", "？", "；", "，", " ", ""]
)</code></pre>


<a id="section-1707"></a>
## 向量嵌入（Embedding）

<a id="t-EMIv869GaI12S4CDR7qRqw"></a>

<p id="t-4YQjU6JmhMEAH0vMgV9Yma"><span>嵌入是将文本转换为数值向量的过程：</span></p>

<pre id="t-nrQuU04pT7jCqTI9vC8gtJ"><code>"Milvus是一个向量数据库"
        ↓
    Embedding Model
        ↓
[0.023, -0.156, 0.892, ..., 0.445] # 1536维向量</code></pre>

<p id="t-cwZbQLPUSBukEDHsz5bAcN"><span>本项目使用阿里云 DashScope 的 </span><span>text-embedding-v1</span><span> 模型，输出 1536 维向量。</span></p>


<a id="section-1708"></a>
## 相似度搜索（Similarity Search）

<a id="t-91TqwmcyDU6fv3t19KUkzY"></a>

<p id="t-Z8wQ1fTlm6L3TS3ugMFFgf"><span>向量相似度通常使用以下方法计算：</span></p>

<div id="t-sCTIqKD0ftjfe8iFrHZMFO"><table><colgroup><col width="156.89755249023438"/><col width="150.005126953125"/><col width="231.005126953125"/></colgroup><tbody><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">方法</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">公式</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">特点</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">L2 距离</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">√Σ(aᵢ-bᵢ)²</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">值越小越相似</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">余弦相似度</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">cos(θ)</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">值越大越相似</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">内积</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">Σ(aᵢ×bᵢ)</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">值越大越相似</span></p></td></tr></tbody></table></div>

<p id="t-wNPVUVZRDGUPYnBYLzi2Fw"><span>本项目使用 </span><span style="font-weight:bold">L2 距离</span><span>（欧氏距离）。</span></p>


<a id="section-1709"></a>
## 项目文件结构

<a id="t-Q9xDAYnmZ4NWV0NbsYA6lH"></a>

<pre id="t-ewgYvepWjQ78xfRtO20zpz"><code>project/
├── vector_db_manager.py    # 核心：向量数据库管理器
├── document_loader.py      # 文档加载器（支持多格式）
├── vector_retriever.py     # 向量检索器 + 问答
├── query_system.py         # 独立查询系统（命令行）
├── upload_document.py      # 独立上传脚本（命令行）
├── api_integration.py      # Flask API 蓝图
├── server.py              # Flask 服务器入口
└── .env                   # 环境变量配置</code></pre>

<p id="t-A5Uc8QCprCe9QlX8Q4N2T1"><span style="font-weight:bold">文件职责说明</span></p>

<div id="t-XkzWqTQu1yAjgWUgwPwsEX"><table><colgroup><col width="183.90447998046875"/><col width="239.00152587890625"/><col width="285.23248291015625"/></colgroup><tbody><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">文件</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">主要类/函数</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">职责</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">vector_db_manager.py</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">VectorDatabaseManager</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">连接 Milvus、文档处理、向量存储</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">document_loader.py</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">DocumentLoader</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">加载 PDF/TXT/DOCX/CSV/Excel</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">vector_retriever.py</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">VectorRetriever</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">封装搜索逻辑、生成回答</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">query_system.py</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">SimpleQuerySystem</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">独立的 RAG 查询实现</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">api_integration.py</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">Flask Blueprint</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">REST API 端点定义</span></p></td></tr></tbody></table></div>


<a id="section-1711"></a>
## 向量数据库管理器 (vector_db_manager.py)

<a id="t-1cYIoOJ0J1n2MbfpmxC9Ms"></a>

<p id="t-5qA2C1ZDQTDxIvPlrluRjJ"><span>这是项目的核心模块，负责整个 RAG 的"写入"流程。</span></p>

<a id="t-lwpj7owiWpDMZgX9nsO5cl"></a>

##### 初始化连接

<pre id="t-aPvRSy68T7lTvn7EWsL69N"><code>class VectorDatabaseManager:
 def __init__(self, milvus_host, milvus_port, ...):
 # 1. 配置参数
        self.milvus_host = milvus_host or os.getenv("MILVUS_HOST", "127.0.0.1")
        self.milvus_port = str(milvus_port or os.getenv("MILVUS_PORT", "19530"))

 # 2. 初始化嵌入模型
        self._init_embeddings()

 # 3. 初始化文本切分器
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=500,
            chunk_overlap=50,
            separators=["\n\n", "\n", "。", "！", "？", "；", "，", " ", ""]
 )

 # 4. 连接到 Milvus
        self._connect_to_milvus()</code></pre>

<a id="t-Q0UhF40HT9ix1iHdf1xUJ6"></a>

##### 文档处理流水线

<pre id="t-erNIQ3EsFEqL5KI8VJxzNz"><code>def process_file(self, file_path: str, collection_name: str = None) -&gt; bool:
 """处理单个文件：加载 → 切分 → 存储"""

 # 步骤1: 加载文档
    documents = self.load_document(file_path)
 # 例如: PDF 文件会被解析为多个 Document 对象

 # 步骤2: 切分文档
    split_docs = self.split_documents(documents)
 # 将长文档切分为多个小块

 # 步骤3: 存入向量数据库
    self.add_documents_to_db(split_docs, collection_name)
 # 自动调用嵌入模型，生成向量并存储

 return True</code></pre>

<a id="t-hxcOyFcPcrIg6HIsfZJrQZ"></a>

##### 向量存储逻辑

<pre id="t-cUJ1K91JOXDhngLBb5yRxH"><code>def add_documents_to_db(self, documents: List[Document], collection_name: str = None):
 """将文档添加到 Milvus"""

    target_collection = collection_name or self.collection_name
    collection_exists = utility.has_collection(target_collection)

 if collection_exists:
 # 集合已存在：加载并追加数据
        self.vectorstore = Milvus(
            embedding_function=self.embeddings,
            collection_name=target_collection,
            connection_args={"host": self.milvus_host, "port": self.milvus_port}
 )
        self.vectorstore.add_documents(documents) # 追加
 else:
 # 集合不存在：创建新集合并插入
        self.vectorstore = Milvus.from_documents(
            documents=documents,
            embedding=self.embeddings,
            collection_name=target_collection,
            connection_args={"host": self.milvus_host, "port": self.milvus_port}
 )</code></pre>


<a id="section-1712"></a>
## 向量检索器 (vector_retriever.py)

<a id="t-KrBs5eOwIgSISyrc5H1a2X"></a>

<p id="t-Ly6DT2SwePXYG2SGOEhT8A"><span>这个模块负责 RAG 的"读取"流程。</span></p>

<a id="t-vjyVnQpkyj4v0vzcO53kbJ"></a>

##### 相似度搜索

<pre id="t-uHrL53wXj4QXBP9QLubTUR"><code>def search_similar_content(self, query: str, collection_name: str, k: int = None):
 """搜索相似内容"""

 # 执行向量搜索（内部会自动将 query 转为向量）
    search_results = self.db_manager.search(
        query=query,
        k=k,
        collection_name=collection_name
 )

 # 过滤低相似度结果
    results = []
 for doc, score in search_results:
 if score &gt;= self.similarity_threshold: # 默认 0.5
            results.append((doc, score))

 return results</code></pre>

<a id="t-oLRmr7dqInuuVYjwOg6N0a"></a>

##### 问答生成

<pre id="t-8fuqbGvIeal3tYHa4Q60WV"><code>def answer_question(self, question: str, collection_name: str, k: int = 5):
 """回答问题 - RAG 的核心逻辑"""

 # 步骤1: 检索相关文档
    relevant_docs = self.search_similar_content(
        query=question,
        collection_name=collection_name,
        k=k
 )

 # 步骤2: 构建上下文
    context_parts = []
 for i, (doc, score) in enumerate(relevant_docs):
        context_parts.append(f"参考资料{i+1}: {doc.page_content}")
    context = "\n\n".join(context_parts)

 # 步骤3: 调用 LLM 生成回答
    answer = self._generate_answer_with_llm(question, context)

 return AnswerResult(
        answer=answer,
        source_documents=source_documents,
        scores=scores
 )</code></pre>

<a id="t-zjJoviOo30MN1Vsl7EeuPl"></a>

##### LLM 调用

<pre id="t-kDMvrXOLOpOgcRIeluSwej"><code>def _generate_answer_with_llm(self, question: str, context: str) -&gt; str:
 """使用 LLM 生成回答"""

    client = OpenAI(
        api_key=os.environ.get("DASHSCOPE_API_KEY"),
        base_url="https://dashscope.aliyuncs.com/compatible-mode/v1"
 )

    system_prompt = """你是一个智能助手。请基于提供的【参考资料】回答用户的问题。
    如果参考资料为空或与问题无关，请利用你的通用知识进行回答..."""

    response = client.chat.completions.create(
        model="qwen-plus",
        messages=[
 {"role": "system", "content": system_prompt},
 {"role": "user", "content": f"问题：{question}\n\n【参考资料】：\n{context}"}
 ]
 )

 return response.choices[0].message.content</code></pre>


<a id="section-1713"></a>
## API 接口 (api_integration.py)

<a id="t-jYf01t736yVtfXbdLxQGk4"></a>

<p id="t-8svSDf7bmBvKrnPEVLNHJG"><span>提供 REST API 供外部调用。</span></p>

<a id="t-rohAPnUygwWJ7GZqStPY6I"></a>

##### 上传文档端点

<pre id="t-3joitJcKjbgkTklEfj6fwZ"><code>@vector_bp.route('/upload_document', methods=['POST'])
def upload_document():
 """POST /api/vector/upload_document"""

    data = request.get_json()
    file_path = data['file_path']
    collection_name = data['collection_name']

 # 调用核心处理逻辑
    success = vector_manager.process_file(file_path, collection_name)

 if success:
 return jsonify({
 'success': True,
 'message': f'文档处理成功: {file_path}',
 'database_info': vector_manager.get_database_info(collection_name)
 })</code></pre>

<a id="t-4JkOHv1NdR97BoJ4GeCVUI"></a>

##### 查询端点

<pre id="t-EBjSCqO6lpAirVjPbvZSD0"><code>@vector_bp.route('/query', methods=['POST'])
def query_documents():
 """POST /api/vector/query"""

    data = request.get_json()
    question = data['question']
    collection_name = data['collection_name']
    k = data.get('k', 5)

 # 执行 RAG 问答
    result = vector_retriever.answer_question(
        question,
        k=k,
        collection_name=collection_name
 )

 return jsonify({
 'success': True,
 'question': question,
 'answer': result.answer,
 'confidence': result.confidence,
 'sources': [...] # 来源文档信息
 })</code></pre>


<a id="section-1715"></a>
## 环境准备

<a id="t-R0qUZUm23eAPbJDuE6wGcw"></a>

<ol start="1"><li id="t-vKc00Iz3tLzvOeMBGjr4Ej"><span style="font-weight:bold">启动 Milvus（使用 Docker）</span></li></ol>

<pre id="t-Dgt4ppd6bJyqYdatAC1AFj"><code># 创建 docker-compose.yml 并启动
docker-compose up -d</code></pre>

<ol start="2"><li id="t-UymFMc1s7wDTF1mtLGQlI7"><span style="font-weight:bold">安装 Python 依赖</span></li></ol>

<pre id="t-n0JsbZA6ellAP6K6TcEjkg"><code>pip install langchain langchain-community langchain-milvus
pip install pymilvus dashscope openai
pip install flask flask-cors python-dotenv
pip install pypdf docx2txt pandas openpyxl</code></pre>

<ol start="3"><li id="t-l1rPJ6R7RunQJ6aKuY1XhM"><span style="font-weight:bold">配置环境变量</span></li></ol>

<p id="t-xcKQ46oWRwdQEKRWyhRdR4"><span>创建 </span><span>.env</span><span> 文件：</span></p>

<pre id="t-wThjYUy0uDib4e6ZTCIU0B"><code>MILVUS_HOST=localhost
MILVUS_PORT=19530
COLLECTION_NAME=agent_rag
DASHSCOPE_API_KEY=your_api_key_here
EMBEDDING_MODEL=text-embedding-v1
LLM_MODEL=qwen-plus</code></pre>


<a id="section-1716"></a>
## 命令行使用

<a id="t-8Ga4fuuN7aRXlDIqZzCQtb"></a>

<p id="t-QUyazbGsIfjLpOmRDu4IZa"><span style="font-weight:bold">上传文档：</span></p>

<pre id="t-VcxPtO25jmLpHtryM2JTBZ"><code># 修改 upload_document.py 中的 FILE_PATH
python upload_document.py</code></pre>

<p id="t-4a122RTbIYVny8JgxtTlZY"><span style="font-weight:bold">查询问答：</span></p>

<pre id="t-4ww3hlgZHq95z9LHmIe53L"><code># 修改 query_system.py 中的 QUESTION
python query_system.py</code></pre>


<a id="section-1717"></a>
## API 使用

<a id="t-52ZOIiDmOZfndKiKQHo9dU"></a>

<p id="t-X8Kunx3JRIsu8nbQxnjjwg"><span style="font-weight:bold">启动服务：</span></p>

<pre id="t-HUp7GRzydZ5fQ8nQnWWlmK"><code>python server.py</code></pre>

<p id="t-LgXYJyVmvyAYwsZJDYawpJ"><span style="font-weight:bold">上传文档：</span></p>

<pre id="t-lCJrVzB8PVh7MXtm9XXSBy"><code>curl -X POST http://localhost:5000/api/vector/upload_document \
 -H "Content-Type: application/json" \
 -d '{"file_path": "/path/to/doc.pdf", "collection_name": "my_docs"}'</code></pre>

<p id="t-MQzqZYgsqLMuOG3ZaeBLhh"><span style="font-weight:bold">提问：</span></p>

<pre id="t-3DISoJrlY9MH9eNiawXqOt"><code>curl -X POST http://localhost:5000/api/vector/query \
 -H "Content-Type: application/json" \
 -d '{"question": "什么是RAG？", "collection_name": "my_docs", "k": 5}'</code></pre>


<a id="section-1718"></a>
## API 接口说明

<a id="t-pwNoXhpPye22a9RjCb2FAE"></a>

<div id="t-AZscHNCs9mLAesTXHXZJF7"><table><colgroup><col width="243.8975524902344"/><col width="143.89752197265625"/><col width="343.89752197265625"/></colgroup><tbody><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">端点</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">方法</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">描述</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">/api/vector/upload_document</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">POST</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">上传并处理文档（路径方式）</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">/api/vector/upload_file</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">POST</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">上传文件流</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">/api/vector/query</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">POST</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">RAG 问答</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">/api/vector/search</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">POST</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">纯相似度搜索</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">/api/vector/collection_info</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">GET</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">获取集合信息</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">/api/vector/clear_collection</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">POST</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">清空集合</span></p></td></tr></tbody></table></div>


<a id="section-1719"></a>
## LangGraph实战开发智能体

<a id="t-block-22847"></a>

<div id="t-c0wlIyhfAR4QqQNwkL6Lum"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/8a6b22eb985e983d275f6e10.png"/></div>


<a id="section-1720"></a>
## LangGraph 实战教程：从小白到高手

<a id="t-SbITfyIMNSyaRaQiHxWGl8"></a>

<blockquote id="t-2nCCPorFrKfR3SIwcLHh4l"><img alt="" decoding="async" height="20" loading="lazy" src="/images/agent-learning/dbea451b6cba787df0bb9bc8.svg" width="20"/><blockquote id="t-gAqtVXfKRsHyGfwLgN1dpe"><span>一份让你真正学会用 LangGraph 构建 AI Agent 的实战指南</span></blockquote></blockquote>


<a id="section-1721"></a>
## 写在前面

<a id="t-IkkN5977t4fZtECGhIeO1V"></a>

<p id="t-s8ASTw3aO8GV7TfROWRjq3"><span>如果你想用大语言模型（LLM）做点有意思的事情，比如做一个能自己查资料、能记住上下文、能调用各种工具的智能助手，那 LangGraph 绝对是你需要了解的东西。</span></p>

<p id="t-gY3XZneuS2TaaXR9t2TlM3"><span>这份教程不会堆砌一堆概念把你绕晕，而是用</span><span style="font-weight:bold">真实可运行的代码</span><span>带你一步步搞懂这玩意儿到底怎么用。</span></p>

<p id="t-cRa71WqGhZgU9O9MXRIxPR"><span>直接可以运行的代码已经整理好了，需要的话找老师拿</span></p>


<a id="section-1722"></a>
## 第一章 LangGraph 是什么

<a id="t-MYV4d6ySKTjVcErStnhbLx"></a>

<div id="t-It5wWSeheKBKN1XXxL2WV7"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/f7f2af65ce1068c5c1f55fe9.png"/></div>


<a id="section-1723"></a>
## 一句话解释

<a id="t-9A1mcfkogf8LyV20GNC5Dr"></a>

<p id="t-LAuOFeDs3GsL6yuFD8kSKZ"><span style="font-weight:bold">LangGraph 就是用来编排 AI </span><span style="font-weight:bold">工作流</span><span style="font-weight:bold">的框架</span><span>，让你可以把复杂的 AI 任务拆成一个个小步骤，然后像搭积木一样把它们连起来。</span></p>


<a id="section-1724"></a>
## 为什么需要它？

<a id="t-iCbexP1QO7I7G980oc2vII"></a>

<p id="t-tnXTJJ2k0flof7EJJf9tLe"><span>假设你要做一个客服机器人：</span></p>

<ol start="1"><li id="t-oE1D2hjAfDdLYLGUUa3xpR"><span>先要判断用户问的是技术问题还是销售问题</span></li></ol>

<ol start="2"><li id="t-D31tLQ7vvX8BbwGgg77BZw"><span>技术问题交给技术 Agent 处理</span></li></ol>

<ol start="3"><li id="t-yk9xPhL7b6TMwQOdGKfP3z"><span>销售问题交给销售 Agent 处理</span></li></ol>

<ol start="4"><li id="t-r26SrXoQQPE9L8OSzjvquh"><span>如果答案质量不够好，还得循环改进</span></li></ol>

<p id="t-iykksAFRjQv9Jk1vx6CexQ"><span>这种</span><span style="font-weight:bold">有分支、有循环、有状态</span><span>的复杂流程，用普通代码写起来会很乱。LangGraph 就是专门解决这个问题的。</span></p>


<a id="section-1725"></a>
## LangGraph vs LangChain

<a id="t-iJ5B5b9bXa7go1PPpuay6Z"></a>

<p id="t-UG3DBeAaD9MqNyg9qhvHka"><span>很多人搞不清这俩的关系：</span></p>

<div id="t-ihr7W4hjo7avoehCbcgA9k"><table><colgroup><col width="150.89755249023438"/><col width="228.89923095703125"/><col width="272.89752197265625"/></colgroup><tbody><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">特性</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">LangChain</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">LangGraph</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">定位</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">通用 LLM 工具库</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">工作流编排框架</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">流程</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">线性链条（A→B→C）</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">图结构（支持分支、循环）</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">状态</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">需要手动管理</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">自动管理</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">适合场景</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">简单的问答、RAG</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">复杂的 Agent、多步骤任务</span></p></td></tr></tbody></table></div>

<p id="t-zd5WWSps5RcOPW7TCZ5ILC"><span>简单说：</span><span style="font-weight:bold">LangChain 是做零件的，LangGraph 是用这些零件搭建复杂系统的</span><span>。</span></p>


<a id="section-1727"></a>
## 安装依赖

<a id="t-jCdIJcB721WQaE5WN0yCVr"></a>

<pre id="t-z01QXVO3SUrNdXR47jGIKD"><code># 核心依赖
pip install langgraph langchain-core langchain-community

# 如果要用通义千问
pip install dashscope

# 如果要用 OpenAI
pip install langchain-openai</code></pre>


<a id="section-1728"></a>
## 设置 API Key

<a id="t-2Y6fgD50DnNsRIeJQPNEjz"></a>

<pre id="t-LwP6yjYVfajbuAVChEz9A8"><code>import os

# 通义千问
os.environ["DASHSCOPE_API_KEY"] = "你的key"

# 或者 OpenAI
os.environ["OPENAI_API_KEY"] = "你的key"</code></pre>


<a id="section-1729"></a>
## 第三章 核心概念

<a id="t-oxd8JGDPYMjfqzpsxx6Lx5"></a>

<p id="t-pbsYqUmjzDVL2NuvCfj3wF"><span>LangGraph 就三个核心概念，搞懂了这三个，其他都是组合拳。</span></p>

<div id="t-eq906e0uWwVtBeeZ3M0GLZ"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/c3c16fb796d89cd765c71578.png"/></div>


<a id="section-1730"></a>
## State（状态）

<a id="t-gSVPpyyB8lTD4avjW9WrPX"></a>

<p id="t-6rkuUgL6YPTXQrsnu033Ia"><span>State 就是一个</span><span style="font-weight:bold">在所有节点间共享的数据结构</span><span>。你可以把它想象成一个"快递包裹"，每经过一个节点，就往里面加点东西或者修改点东西。</span></p>

<pre id="t-33OhsrzGFlvyedh7UhuoKm"><code>from typing_extensions import TypedDict

class MyState(TypedDict):
    count: int # 计数器
    history: list[str] # 历史记录</code></pre>


<a id="section-1731"></a>
## Node（节点）

<a id="t-wZDqd1E1OqPkNTpVcM7tms"></a>

<p id="t-4fn7gQujoaQJPrc69cYkyH"><span>Node 就是</span><span style="font-weight:bold">干活的</span><span>。每个节点是一个 Python 函数，接收当前状态，返回需要更新的字段。</span></p>

<pre id="t-f7LO3ccoTSx8EcBMJtVGAp"><code>def my_node(state: MyState):
 # 读取当前状态
    current_count = state["count"]

 # 返回要更新的字段（不用返回所有字段！）
 return {
 "count": current_count + 1,
 "history": state["history"] + ["执行了一次"]
 }</code></pre>


<a id="section-1732"></a>
## Edge（边）

<a id="t-ayrS1dbNTP7uXAaxBj5Kay"></a>

<p id="t-ChrIk5tV80QK7XLIJGzR3l"><span>Edge 定义</span><span style="font-weight:bold">节点之间怎么连接</span><span>，决定执行顺序。</span></p>

<pre id="t-KoFfGizgSbH1i7InB6Qlx2"><code># 普通边：A 执行完必定执行 B
workflow.add_edge("A", "B")

# 条件边：根据条件决定下一步
workflow.add_conditional_edges(
 "A",
    决策函数,
 {"条件1": "B", "条件2": "C"}
)</code></pre>


<a id="section-1733"></a>
## 第四章 第一个程序

<a id="t-wPyglEi96oiXauwcGUpipp"></a>

<p id="t-WoREIJxselWP80ZWa7PCBd"><span>让我们写一个最简单的计数器程序，理解状态是怎么流转的。</span></p>

<div id="t-5oq3mPvcwMl1SNorwIaDGB"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/c135a0677d1918c89208f441.png"/></div>


<a id="section-1734"></a>
## 完整代码

<a id="t-A56jdVG8FELmFHrCRrRI7i"></a>

<pre id="t-bVjRhQ4wZmld8g3JHploF1"><code>from langgraph.graph import StateGraph, START, END
from typing_extensions import TypedDict

# 1. 定义状态结构
class CounterState(TypedDict):
    count: int
    history: list[str]

# 2. 定义节点函数
def increment_node(state: CounterState):
 """计数器 +1"""
    new_count = state["count"] + 1
    message = f"count: {state['count']} → {new_count}"

 return {
 "count": new_count,
 "history": state["history"] + [message]
 }

def double_node(state: CounterState):
 """计数器翻倍"""
    new_count = state["count"] * 2
    message = f"count: {state['count']} → {new_count}"

 return {
 "count": new_count,
 "history": state["history"] + [message]
 }

def report_node(state: CounterState):
 """报告结果"""
 return {"history": state["history"] + [f"最终结果: {state['count']}"]}

# 3. 创建图
workflow = StateGraph(CounterState)

# 4. 添加节点
workflow.add_node("increment", increment_node)
workflow.add_node("double", double_node)
workflow.add_node("report", report_node)

# 5. 连接节点
workflow.add_edge(START, "increment")
workflow.add_edge("increment", "double")
workflow.add_edge("double", "report")
workflow.add_edge("report", END)

# 6. 编译
app = workflow.compile()

# 7. 运行
result = app.invoke({
 "count": 5,
 "history": ["开始执行"]
})

print("执行历史:")
for step in result["history"]:
 print(f"  - {step}")
print(f"\n最终计数: {result['count']}")</code></pre>


<a id="section-1735"></a>
## 运行结果

<a id="t-AXDZfyBFGUu14R9AB4YYJi"></a>

<pre id="t-hpuEk1KrpNcG6hLxaPzvoE"><code>执行历史:
  - 开始执行
  - count: 5 → 6
  - count: 6 → 12
  - 最终结果: 12

最终计数: 12</code></pre>


<a id="section-1736"></a>
## 关键点

<a id="t-VxMVafF6lehCJ8DeZ3pDRi"></a>

<ol start="1"><li id="t-SEr1hlTL3mSsgfEBU0GWNL"><span style="font-weight:bold">只返回需要更新的字段</span><span>：节点不用返回完整的 state，只返回变化的部分</span></li></ol>

<ol start="2"><li id="t-gSmyqvozzM06CdJua09vma"><span style="font-weight:bold">状态自动传递</span><span>：每个节点执行完，更新后的状态自动传给下一个节点</span></li></ol>

<ol start="3"><li id="t-um5mxxkTD1GM8Ip9gWZViH"><span style="font-weight:bold">必须编译</span><span>：调用 </span><span>compile()</span><span> 后才能运行</span></li></ol>


<a id="section-1737"></a>
## 第五章 Reducer 机制

<a id="t-M7JyfXLbSQSbIFAyiJzFvN"></a>

<p id="t-BQhjCkUW9eFJY49nyPSAYk"><span>这是很多人一开始搞不明白的点：</span><span style="font-weight:bold">为什么有时候状态会被覆盖，有时候会累加？</span></p>

<p id="t-8NZYZWaxsuLt01pLuaNzUp"><span>答案就是 </span><span style="font-weight:bold">Reducer</span><span>。</span></p>

<div id="t-Nq8RHBI2Ar1HHglNMLs0fv"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/c474141c98c63feec0990aed.png"/></div>


<a id="section-1738"></a>
## 问题：状态被覆盖

<a id="t-hKffV4Rpsi3yGRU1ieE4rU"></a>

<p id="t-mlYZY6f0Cnhdq6ScQ89gLj"><span>默认情况下，每个节点返回的值会</span><span style="font-weight:bold">覆盖</span><span>之前的值：</span></p>

<pre id="t-86Ib08KncwiEKEVNJTBLL8"><code>class State(TypedDict):
    score: int # 普通定义

# Node1 返回 {"score": 10}  → state["score"] = 10
# Node2 返回 {"score": 20}  → state["score"] = 20 (覆盖了!)
# 最终 score = 20</code></pre>


<a id="section-1739"></a>
## 解决方案：使用 Reducer

<a id="t-DFFobDnWi4jf2Mwkkx3YbF"></a>

<pre id="t-yU4AZE854DxGfdw16TCwZJ"><code>from typing import Annotated
import operator

class State(TypedDict):
    score: Annotated[int, operator.add] # 使用 operator.add 作为 reducer

# Node1 返回 {"score": 10}  → state["score"] = 0 + 10 = 10
# Node2 返回 {"score": 20}  → state["score"] = 10 + 20 = 30
# 最终 score = 30 (累加!)</code></pre>


<a id="section-1740"></a>
## 实际例子：游戏得分

<a id="t-9WswyET9D4CMzXtNEw9YJD"></a>

<pre id="t-ebaKAkJ3F2IxkPcK1hWTqJ"><code>from langgraph.graph import StateGraph, START, END
from typing_extensions import TypedDict
from typing import Annotated
import operator

class ScoreState(TypedDict):
    player_name: str # 普通字段，会被覆盖
    score: Annotated[int, operator.add] # 累加
    actions: Annotated[list[str], operator.add] # 列表也能累加

def level1_node(state):
 return {"score": 10, "actions": ["通关第一关"]}

def level2_node(state):
 return {"score": 20, "actions": ["通关第二关"]}

def level3_node(state):
 return {"score": 30, "actions": ["通关第三关"]}

# 构建图...
workflow = StateGraph(ScoreState)
workflow.add_node("level1", level1_node)
workflow.add_node("level2", level2_node)
workflow.add_node("level3", level3_node)
workflow.add_edge(START, "level1")
workflow.add_edge("level1", "level2")
workflow.add_edge("level2", "level3")
workflow.add_edge("level3", END)

app = workflow.compile()
result = app.invoke({"player_name": "小明", "score": 0, "actions": []})

print(f"玩家: {result['player_name']}")
print(f"总分: {result['score']}") # 10+20+30=60
print(f"完成动作: {result['actions']}")</code></pre>


<a id="section-1741"></a>
## 常用 Reducer

<a id="t-9iJ9wOrASE8kzuDYneeeTT"></a>

<div id="t-caX7XfyYURmiL4siSqycVu"><table><colgroup><col width="163.89755249023438"/><col width="175.00860595703125"/><col width="203.00860595703125"/></colgroup><tbody><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">Reducer</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">作用</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">适用场景</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">operator.add</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">数值相加</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">计数、得分</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">operator.add</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">列表拼接</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">历史记录、消息列表</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">add_messages</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">消息智能合并</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">聊天历史</span></p></td></tr></tbody></table></div>


<a id="section-1742"></a>
## 第六章 条件分支

<a id="t-pwe9yiVGDLSEqpJFLayXl9"></a>

<p id="t-ojxIAcoPEDrfYWfraSuyhn"><span>真实的应用不可能一条路走到黑，肯定需要根据情况走不同的路。</span></p>

<div id="t-TaVVtggAwqjktzb1Zd3MRM"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/9fc95dbab068ca9e54ec39a4.png"/></div>


<a id="section-1743"></a>
## 关键函数：add_conditional_edges

<a id="t-mxQ6oXqdyIbPuMhyh2QaaX"></a>

<pre id="t-E7REJGd3GgBXcg2cdDgZaK"><code>workflow.add_conditional_edges(
 "source_node", # 从哪个节点出发
    routing_function, # 用什么函数决定路由
 { # 路由映射表
 "result1": "target_node1",
 "result2": "target_node2",
 }
)</code></pre>


<a id="section-1744"></a>
## 实际例子：智能客服路由

<a id="t-Eq6ZYjSBYX5tYhb8Bt36S6"></a>

<pre id="t-TbPPA4QgX8yVOZvgb2mjU9"><code>from langgraph.graph import StateGraph, START, END
from typing_extensions import TypedDict

class CustomerState(TypedDict):
    question: str
    category: str
    answer: str

# 分类节点
def classify_question(state: CustomerState):
    question = state["question"].lower()

 if "退款" in question or "退货" in question:
        category = "refund"
 elif "物流" in question or "配送" in question:
        category = "shipping"
 elif "产品" in question or "使用" in question:
        category = "product"
 else:
        category = "general"

 return {"category": category}

# 处理节点
def handle_refund(state):
 return {"answer": "退款专员：请提供订单号，3个工作日内处理。"}

def handle_shipping(state):
 return {"answer": "物流客服：您的包裹正在配送中。"}

def handle_product(state):
 return {"answer": "产品顾问：请查看说明书第3页。"}

def handle_general(state):
 return {"answer": "客服：感谢咨询，还有其他问题吗？"}

# 路由函数
def route_question(state: CustomerState) -&gt; str:
 return state["category"]

# 构建图
workflow = StateGraph(CustomerState)

workflow.add_node("classify", classify_question)
workflow.add_node("refund", handle_refund)
workflow.add_node("shipping", handle_shipping)
workflow.add_node("product", handle_product)
workflow.add_node("general", handle_general)

workflow.add_edge(START, "classify")

# 关键：条件路由
workflow.add_conditional_edges(
 "classify",
    route_question,
 {
 "refund": "refund",
 "shipping": "shipping",
 "product": "product",
 "general": "general"
 }
)

# 所有分支都到 END
workflow.add_edge("refund", END)
workflow.add_edge("shipping", END)
workflow.add_edge("product", END)
workflow.add_edge("general", END)

app = workflow.compile()

# 测试
test_questions = [
 "我想申请退款",
 "我的快递到哪了？",
 "这个产品怎么使用？",
]

for q in test_questions:
    result = app.invoke({"question": q, "category": "", "answer": ""})
 print(f"问题: {q}")
 print(f"回答: {result['answer']}\n")</code></pre>


<a id="section-1745"></a>
## 第七章 循环流程

<a id="t-ucdJIjIqSl4YHCo1xq9V5G"></a>

<p id="t-udRA9JgxqoReMCOBUUCwAr"><span style="background-color:#ffeead">有时候一次处理不够好，需要反复迭代优化。LangGraph 天然支持循环。</span></p>

<div id="t-bS872psSuT1pv0uoldgnaU"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/1035fc97bfc000f598e4214e.png"/></div>


<a id="section-1746"></a>
## 关键点

<a id="t-ws6sxBESgCO8sJiioRmGdm"></a>

<ol start="1"><li id="t-R8j1mSxxSJJVRDrD3dTOOl"><span style="font-weight:bold">条件边可以指回前面的节点</span><span>：形成循环</span></li></ol>

<ol start="2"><li id="t-Azm85DOnnmxAxKWRGIdMk0"><span style="font-weight:bold">必须有退出条件</span><span>：否则会无限循环</span></li></ol>

<ol start="3"><li id="t-edWaSR3z8vUAEjZ31r8ne0"><span style="font-weight:bold">建议设置最大迭代次数</span><span>：兜底保护</span></li></ol>


<a id="section-1747"></a>
## 实际例子：答案优化器

<a id="t-EGARpODjNAvF9jJEI3MV8T"></a>

<pre id="t-5paOLNmZ1jjybCpr0Mlcyl"><code>from langgraph.graph import StateGraph, START, END
from typing_extensions import TypedDict
from typing import Annotated
import operator

class ImprovementState(TypedDict):
    question: str
    answer: str
    quality_score: float
    iteration: Annotated[int, operator.add]
    max_iterations: int

def generate_answer(state: ImprovementState):
 """生成或改进答案"""
    iteration = state.get("iteration", 0)

 # 模拟答案逐步改进
 if iteration == 0:
        answer = "简单回答：这是一个基础答案。"
        score = 0.5
 elif iteration == 1:
        answer = "改进回答：这是一个更详细的答案，包含更多信息。"
        score = 0.7
 else:
        answer = "完善回答：经过仔细思考的完整答案，包含背景和建议。"
        score = 0.9

 print(f"第{iteration + 1}次生成 (质量: {score})")

 return {
 "answer": answer,
 "quality_score": score,
 "iteration": 1 # 每次+1（因为有 reducer）
 }

def check_quality(state):
 """检查质量，不更新状态"""
 return state

def should_continue(state: ImprovementState) -&gt; str:
 """决定是继续还是结束"""
 if state["quality_score"] &gt;= 0.8:
 return "done"
 elif state["iteration"] &gt;= state["max_iterations"]:
 return "done"
 else:
 return "improve"

# 构建带循环的图
workflow = StateGraph(ImprovementState)

workflow.add_node("generate", generate_answer)
workflow.add_node("check", check_quality)

workflow.add_edge(START, "generate")
workflow.add_edge("generate", "check")

# 关键：条件边可以循环回去
workflow.add_conditional_edges(
 "check",
    should_continue,
 {
 "improve": "generate", # 循环
 "done": END             # 结束
 }
)

app = workflow.compile()

result = app.invoke({
 "question": "什么是人工智能？",
 "answer": "",
 "quality_score": 0.0,
 "iteration": 0,
 "max_iterations": 5
})

print(f"\n最终答案: {result['answer']}")
print(f"最终质量: {result['quality_score']}")
print(f"迭代次数: {result['iteration']}")</code></pre>


<a id="section-1748"></a>
## 第八章 聊天机器人

<a id="t-Er5JKRLbtzEynx6um6aSBT"></a>

<p id="t-rE35D1FftKC7dNue5K1zB4"><span>做聊天机器人最头疼的是</span><span style="font-weight:bold">消息历史管理</span><span>。LangGraph 提供了专门的工具来解决这个问题。</span></p>


<a id="section-1749"></a>
## 核心：MessagesState 和 add_messages

<a id="t-8SGI6ZE4IACnfBpKQEZHxa"></a>

<pre id="t-ycGYJL6ssia2U8TOoTHEet"><code>from langgraph.graph import MessagesState
from langgraph.graph.message import add_messages
from langchain_core.messages import HumanMessage, AIMessage

# 方式1：继承 MessagesState
class ChatState(MessagesState):
    user_name: str
    conversation_count: int

# 方式2：手动定义
class ChatState(TypedDict):
    messages: Annotated[list[BaseMessage], add_messages]
    user_name: str</code></pre>

<p id="t-OTngJL4GMfn8gS7CecoBNP"><span>add_messages</span><span> 是一个智能 Reducer，它会：</span></p>

<ul><li id="t-mCp9duouP0QvfiEM7RUwFR"><span>自动追加新消息</span></li></ul>

<ul><li id="t-p016YIYcSeK0F8iTkZF3VY"><span>处理消息 ID 去重</span></li></ul>

<ul><li id="t-OPtzdT7FtleJWy6AzwW9PC"><span>保持消息顺序</span></li></ul>


<a id="section-1750"></a>
## 完整聊天机器人

<a id="t-7O6Bk4ipef7Dasaddu0dJ8"></a>

<pre id="t-WxGKo2k4XKDh2VHTSYpGSs"><code>import os
from langgraph.graph import StateGraph, START, END, MessagesState
from langchain_core.messages import HumanMessage, AIMessage, SystemMessage
from langchain_community.llms import Tongyi

os.environ["DASHSCOPE_API_KEY"] = "your-key"

llm = Tongyi(model="qwen-plus", temperature=0.7)

class ChatState(MessagesState):
    user_name: str
    conversation_count: int

def chatbot_node(state: ChatState):
 """聊天节点"""
 # 构建系统提示
    system_prompt = f"""你是一个友好的AI助手。
用户名: {state.get('user_name', '用户')}
当前是第 {state.get('conversation_count', 0)} 轮对话。"""

    messages = [SystemMessage(content=system_prompt)] + state["messages"]
    response = llm.invoke(messages)

 return {
 "messages": [AIMessage(content=response)],
 "conversation_count": state.get("conversation_count", 0) + 1
 }

# 构建图
workflow = StateGraph(ChatState)
workflow.add_node("chatbot", chatbot_node)
workflow.add_edge(START, "chatbot")
workflow.add_edge("chatbot", END)
app = workflow.compile()

# 多轮对话
state = {"messages": [], "user_name": "小明", "conversation_count": 0}

conversations = [
 "你好，我是小明",
 "我刚才说我叫什么？",
 "帮我推荐一本Python书"
]

for user_input in conversations:
 print(f"用户: {user_input}")
    state["messages"].append(HumanMessage(content=user_input))
    result = app.invoke(state)
    state = result
 print(f"助手: {result['messages'][-1].content}\n")</code></pre>


<a id="section-1751"></a>
## 第九章 Agent 工具调用

<a id="t-xutJ61LL8OpgKE85DXYdZQ"></a>

<p id="t-Fscz2rBMKp0bbyM4YXR9sE"><span>Agent 和普通聊天机器人的区别是：</span><span style="font-weight:bold">Agent 能使用工具</span><span>。</span></p>


<a id="section-1752"></a>
## 定义工具

<a id="t-rNw5lfRwIwmfEmQMADDNIH"></a>

<p id="t-Ai0Ufz0V6wMAUSjBHSv6vf"><span>使用 </span><span>@tool</span><span> 装饰器：</span></p>

<pre id="t-wlSSkX560kaNyHcjNn6J6u"><code>from langchain_core.tools import tool

@tool
def search_web(query: str) -&gt; str:
 """搜索网络信息

    Args:
        query: 搜索关键词
    """
 # 实际实现
 return f"搜索 '{query}' 的结果：..."

@tool
def calculator(expression: str) -&gt; str:
 """计算数学表达式

    Args:
        expression: 数学表达式，如 "2+2"
    """
 try:
        result = eval(expression)
 return f"计算结果: {expression} = {result}"
 except:
 return "计算错误"

@tool
def get_weather(city: str) -&gt; str:
 """查询城市天气

    Args:
        city: 城市名称
    """
    weather_data = {
 "北京": "晴天，15-25度",
 "上海": "多云，18-28度",
 }
 return weather_data.get(city, f"{city}天气信息不可用")</code></pre>


<a id="section-1753"></a>
## 工具定义要点

<a id="t-qjr93VML5E1xd8ELrBX6EV"></a>

<ol start="1"><li id="t-qCFzFhjsziUM9Qtv4jPuND"><span style="font-weight:bold">必须有 docstring</span><span>：描述工具用途，AI 靠这个判断什么时候用</span></li></ol>

<ol start="2"><li id="t-3v9BowuZVwgyIo0sGluKrb"><span style="font-weight:bold">参数要有类型注解</span><span>：让 AI 知道怎么传参</span></li></ol>

<ol start="3"><li id="t-VqDdcGwN0hmMRg6Rn26NbK"><span style="font-weight:bold">Args 部分详细说明</span><span>：每个参数是干什么的</span></li></ol>


<a id="section-1754"></a>
## 第十章 ReAct Agent

<a id="t-TW23PDVMgOPOlF9CuwaDwf"></a>

<p id="t-aWoZHfk2LMsgJDHRLTMWc4"><span>ReAct = Reasoning + Acting，是目前最流行的 Agent 架构。</span></p>

<div id="t-jfmxsLYWBIRAzEZYoVXnna"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/f7bcb4159302b7a3a3dcad57.png"/></div>


<a id="section-1755"></a>
## 工作流程

<a id="t-Sk7OD564P4y9ctvJflFHm1"></a>

<ol start="1"><li id="t-raMbbxRR5mRmrbGWos5Hd5"><span style="font-weight:bold">Thought</span><span>：AI 思考需要做什么</span></li></ol>

<ol start="2"><li id="t-R6aCNx0htMNQz0iPmmphg4"><span style="font-weight:bold">Action</span><span>：选择并调用工具</span></li></ol>

<ol start="3"><li id="t-dQzSyT9dFHmxN3INIiC2Qv"><span style="font-weight:bold">Observation</span><span>：观察工具返回结果</span></li></ol>

<ol start="4"><li id="t-mKKOj1iR9Sas9Bz2bqZnRI"><span style="font-weight:bold">重复</span><span>：直到任务完成</span></li></ol>


<a id="section-1756"></a>
## 使用预置组件

<a id="t-nxy0OvcYM3ysRfhJsatbWi"></a>

<p id="t-AbvvFMZLPERYEW7DetTIz3"><span>LangGraph 提供了现成的组件：</span></p>

<pre id="t-2lGF6pIdu5HS7UxcvboXZv"><code>from langgraph.prebuilt import create_react_agent, ToolNode
from langchain_community.chat_models import ChatTongyi
from langchain_core.tools import tool
from langchain_core.messages import SystemMessage

@tool
def add(a: float, b: float) -&gt; float:
 """两数相加"""
 return a + b

@tool
def multiply(a: float, b: float) -&gt; float:
 """两数相乘"""
 return a * b

# 创建模型
llm = ChatTongyi(model="qwen-plus", temperature=0.7)

# 创建 ReAct Agent
agent = create_react_agent(
    model=llm,
    tools=[add, multiply],
    messages_modifier=SystemMessage(content="你是一个数学计算助手。")
)

# 使用
result = agent.invoke({
 "messages": [{"role": "user", "content": "计算 (10 + 5) × 3"}]
})
print(result["messages"][-1].content)</code></pre>


<a id="section-1757"></a>
## 手动实现 ReAct Agent

<a id="t-haBy9j24z7Bs8pUjPxVfG5"></a>

<p id="t-REcu1HHSsoqreqer23S7U1"><span>如果需要完全控制，可以手动实现：</span></p>

<pre id="t-U7hPH98PnZMndbvTjnVZcr"><code>from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages
from langgraph.prebuilt import ToolNode
from typing import Annotated, Literal
from typing_extensions import TypedDict

class AgentState(TypedDict):
    messages: Annotated[list, add_messages]
    iterations: Annotated[int, operator.add]

# 工具定义...
tools = [python_executor, text_analyzer]
tool_node = ToolNode(tools)

# 模型绑定工具
llm_with_tools = llm.bind_tools(tools)

def call_model(state: AgentState):
 """调用模型决策"""
    messages = state["messages"]
    response = llm_with_tools.invoke(messages)
 return {"messages": [response], "iterations": 1}

def should_continue(state) -&gt; Literal["tools", "__end__"]:
 """判断是否需要调用工具"""
    last_message = state["messages"][-1]
 if hasattr(last_message, "tool_calls") and last_message.tool_calls:
 return "tools"
 return "__end__"

# 构建图
workflow = StateGraph(AgentState)
workflow.add_node("agent", call_model)
workflow.add_node("tools", tool_node)

workflow.add_edge(START, "agent")
workflow.add_conditional_edges("agent", should_continue, {
 "tools": "tools",
 "__end__": END
})
workflow.add_edge("tools", "agent")

app = workflow.compile()</code></pre>


<a id="section-1758"></a>
## 第十一章 多Agent协作

<a id="t-nvTxVs0yzUIblx5l3Dcqpn"></a>

<p id="t-zUTyiZ2AxpJdFLz4tGqUiC"><span>当任务复杂时，一个 Agent 搞不定，需要多个专业 Agent 配合。</span></p>


<a id="section-1759"></a>
## Supervisor 模式

<a id="t-pvlbbPCcMlkOQSiZFN3JmH"></a>

<div id="t-YiUurSMIH9u4mXFsJ4cV9D"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/0859b9ac1881706940be048c.png"/></div>

<p id="t-k9O7C3VVxWWveDyU4ktU2s"><span>核心思想：</span><span style="font-weight:bold">一个 Supervisor 负责调度，多个专业 Agent 负责执行</span><span>。</span></p>


<a id="section-1760"></a>
## 完整实现

<a id="t-JnMgAcomYsbxLTnLne5KtB"></a>

<pre id="t-ahSZaaKpiEzgTuin2LrJUv"><code>from langgraph.graph import StateGraph, START, END
from langchain_core.messages import HumanMessage, AIMessage, BaseMessage
from langchain_core.tools import tool
from typing import Annotated, Literal, Sequence
from typing_extensions import TypedDict
from langgraph.graph.message import add_messages

# 1. 定义状态
class SupervisorState(TypedDict):
    messages: Annotated[Sequence[BaseMessage], add_messages]
 next: str # 下一个执行的 Agent

# 2. 定义各种工具
@tool
def check_system_status(component: str) -&gt; str:
 """检查系统组件状态"""
    status = {"database": "正常", "server": "负载高", "api": "正常"}
 return status.get(component, "未知")

@tool
def get_product_info(product_name: str) -&gt; str:
 """获取产品信息"""
    products = {
 "基础版": "99元/月，基础功能",
 "专业版": "299元/月，高级功能",
 }
 return products.get(product_name, "产品不存在")

@tool
def query_invoice(order_id: str) -&gt; str:
 """查询发票"""
    invoices = {"ORD001": "已开具", "ORD002": "处理中"}
 return invoices.get(order_id, "订单不存在")

# 3. 定义专业 Agent 节点
def tech_agent_node(state):
 """技术支持 Agent"""
    last_message = state["messages"][-1].content

 if "系统" in last_message or "服务器" in last_message:
        result = check_system_status.invoke({"component": "server"})
        response = f"【技术支持】系统状态: {result}"
 else:
        response = "【技术支持】请描述您遇到的技术问题。"

 return {"messages": [AIMessage(content=response)]}

def sales_agent_node(state):
 """销售 Agent"""
    last_message = state["messages"][-1].content

 for product in ["基础版", "专业版"]:
 if product in last_message:
            info = get_product_info.invoke({"product_name": product})
 return {"messages": [AIMessage(content=f"【销售顾问】{info}")]}

 return {"messages": [AIMessage(content="【销售顾问】我们有基础版和专业版，需要了解哪个？")]}

def billing_agent_node(state):
 """账单 Agent"""
 return {"messages": [AIMessage(content="【账单专员】请提供订单号，我来查询。")]}

# 4. Supervisor 节点
def supervisor_node(state):
 """Supervisor：决定下一步"""
    last_message = state["messages"][-1].content

    tech_keywords = ["错误", "bug", "崩溃", "系统", "服务器"]
    sales_keywords = ["价格", "购买", "产品", "套餐"]
    billing_keywords = ["发票", "支付", "退款", "账单"]

 if any(kw in last_message for kw in tech_keywords):
        next_agent = "tech_support"
 elif any(kw in last_message for kw in sales_keywords):
        next_agent = "sales"
 elif any(kw in last_message for kw in billing_keywords):
        next_agent = "billing"
 else:
        next_agent = "sales" # 默认销售

 return {"next": next_agent}

# 5. 路由函数
def route_after_supervisor(state) -&gt; Literal["tech_support", "sales", "billing"]:
 return state["next"]

# 6. 构建图
workflow = StateGraph(SupervisorState)

workflow.add_node("supervisor", supervisor_node)
workflow.add_node("tech_support", tech_agent_node)
workflow.add_node("sales", sales_agent_node)
workflow.add_node("billing", billing_agent_node)

workflow.add_edge(START, "supervisor")
workflow.add_conditional_edges(
 "supervisor",
    route_after_supervisor,
 {
 "tech_support": "tech_support",
 "sales": "sales",
 "billing": "billing",
 }
)
workflow.add_edge("tech_support", END)
workflow.add_edge("sales", END)
workflow.add_edge("billing", END)

app = workflow.compile()

# 7. 测试
test_cases = [
 "我遇到500错误，系统无法访问",
 "专业版多少钱？",
 "我需要查发票",
]

for query in test_cases:
 print(f"用户: {query}")
    result = app.invoke({"messages": [HumanMessage(content=query)], "next": ""})
 for msg in result["messages"]:
 if isinstance(msg, AIMessage):
 print(msg.content)
 print()</code></pre>


<a id="section-1762"></a>
## 智能客服系统架构

<a id="t-xMGQtDf6VH1Mf9113KNBGf"></a>

<p id="t-TeNnJvOqK0sSL0ReBhx4lb"><span>把前面学的所有东西整合起来，做一个完整的智能客服系统：</span></p>

<ol start="1"><li id="t-pimpMCDg2tAz2tCpoaFuBt"><span style="font-weight:bold">Supervisor</span><span> 分析问题类型</span></li></ol>

<ol start="2"><li id="t-WUAARBCuY8xsMQqMGPN1cy"><span style="font-weight:bold">技术支持 Agent</span><span> 处理技术问题</span></li></ol>

<ol start="3"><li id="t-nDBT2vPjhtZKQo8IHQ8PsP"><span style="font-weight:bold">销售顾问 Agent</span><span> 处理产品咨询</span></li></ol>

<ol start="4"><li id="t-jl5UmS9By42oqHzs7YR40C"><span style="font-weight:bold">账单专员 Agent</span><span> 处理财务问题</span></li></ol>

<ol start="5"><li id="t-sBogTHHT3sxUX0EfW5znlz"><span>每个 Agent 都有自己的</span><span style="font-weight:bold">专业工具</span></li></ol>

<ol start="6"><li id="t-zRpLvcuMtRCHCZIO660Cte"><span>支持</span><span style="font-weight:bold">多轮对话</span><span>和</span><span style="font-weight:bold">历史记忆</span></li></ol>

<p id="t-1kXMMaXhOix5OQNvJwXcJD"><span>完整代码见附带的 </span><span>langgraph_supervisor_1.py</span><span> （</span><span>）文件。</span></p>


<a id="section-1764"></a>
## 持久化和记忆

<a id="t-jLTkuaeh0huebjIEqtsObm"></a>

<p id="t-l10yif1hEcMdeXuApjjVSe"><span>使用 </span><span>checkpointer</span><span> 保存对话状态：</span></p>

<pre id="t-OHpJYkC4c74ui6VyoyFkhY"><code>from langgraph.checkpoint.memory import MemorySaver

memory = MemorySaver()
app = workflow.compile(checkpointer=memory)

# 使用 thread_id 管理不同会话
config = {"configurable": {"thread_id": "user_123"}}
result = app.invoke(state, config=config)</code></pre>


<a id="section-1765"></a>
## 流式输出

<a id="t-BdYdTSVqoGD37jea8TPrvS"></a>

<p id="t-HZRBsjtrgfDDt2SiYJnV6X"><span>实现打字机效果：</span></p>

<pre id="t-8rejmH3B6th84JFIuUweBA"><code># 方式1：使用 streaming=True 的模型
llm = Tongyi(model="qwen-plus", streaming=True)

for chunk in llm.stream(messages):
 print(chunk, end="", flush=True)

# 方式2：使用 app.stream()
for event in app.stream(initial_state):
 print(event)</code></pre>


<a id="section-1766"></a>
## 子图（Subgraph）

<a id="t-bGjRA8Dt8Hfs8QlPkzO81y"></a>

<p id="t-tFos5Exwkk7G0f2lPsioKc"><span>复杂系统可以拆成多个子图：</span></p>

<pre id="t-zAPeMbV6cYH2h9VSbEVkZc"><code># 定义子图
sub_workflow = StateGraph(SubState)
# ... 添加节点和边
sub_graph = sub_workflow.compile()

# 在主图中使用子图作为节点
main_workflow.add_node("sub_process", sub_graph)</code></pre>


<a id="section-1767"></a>
## Human-in-the-Loop

<a id="t-qiRxr4anxYEXOFdtE6ns5b"></a>

<p id="t-KrhqXUYGv8owhoJEgiHUNe"><span>让人类参与决策：</span></p>

<pre id="t-WZZN8ozFjpniyE1pZUi7IQ"><code># 设置断点
app = workflow.compile(
    checkpointer=memory,
    interrupt_before=["sensitive_action"]
)

# 运行到断点会暂停
result = app.invoke(state, config)

# 人工审核后继续
app.invoke(None, config) # 继续执行</code></pre>


<a id="section-1768"></a>
## 调试技巧

<a id="t-DWa1xlHbWNrx7tDNN7LS31"></a>

<pre id="t-SXjoJrzDnr9iBw1IpORnbk"><code># 可视化图结构
print(app.get_graph().draw_mermaid())

# 打印执行过程
for event in app.stream(state, stream_mode="debug"):
 print(event)</code></pre>


<a id="section-1769"></a>
## 企业级电商智能客服 RAG

<a id="t-block-23040"></a>

<blockquote id="t-LrWq3HAwpKsNcYOckhdbkP"><span>读完本教程，你将理解一个</span><span style="font-weight:bold">生产级 RAG（检索增强生成）系统</span><span>的完整架构：文档怎么进、知识怎么存、问题怎么路由、答案怎么生成。</span></blockquote>


<a id="section-1770"></a>
## 目录

<a id="t-1poCRsgqb1S5yAUYDmHhup"></a>

<ol start="1"><li id="t-haCz1Th8cHjkzfdAVy8aqg"><span>项目简介</span></li></ol>

<ol start="2"><li id="t-uXE8kvTbYADZWj9HDkM7Bl"><span>技术栈</span></li></ol>

<ol start="3"><li id="t-jDQkDVZjUuKVf82wN3IfjU"><span>架构设计</span></li></ol>

<ol start="4"><li id="t-DnER4CoP3MhGxJsUEFqwNB"><span>目录结构</span></li></ol>

<ol start="5"><li id="t-TLUVFXOWIq5dhtCuXRyZHz"><span>安装运行指南</span></li></ol>

<ol start="6"><li id="t-uiA3mGCK9HSrxrFCcUusOx"><span>功能亮点</span></li></ol>

<ol start="7"><li id="t-EkqX3R9mt9WU2Qmd7i11xp"><span>核心代码实现</span></li></ol>

<ol start="8"><li id="t-XmDbzdiFVyLqGkeTLdpeBW"><span>常见问题与注意事项</span></li></ol>

<ol start="9"><li id="t-2QtauQC7SHczY0OVy3Bbgr"><span>学习路线建议</span></li></ol>


<a id="section-1771"></a>
## 一、项目简介

<a id="t-56YZpexqHRrJYjF8dTNCuX"></a>

<p id="t-b8NMi7A6VSNK03uyigFe3S"><span>这是一个面向电商场景的</span><span style="font-weight:bold">智能客服问答系统</span><span>，核心是 </span><span style="font-weight:bold">RAG（Retrieval-Augmented Generation，检索增强生成）</span><span>：</span></p>

<ul><li id="t-x5N7FEl1Xd97ABOm9P6SCV"><span>商家把</span><span style="font-weight:bold">产品说明书、尺码表、退换货政策、物流规则</span><span>等文档上传到系统；</span></li></ul>

<ul><li id="t-UMEsQrBwih1oiNztfz78e0"><span>系统自动解析、切片、向量化，存入向量数据库；</span></li></ul>

<ul><li id="t-Xr5GuqpUACLg7DhbrswRpL"><span>用户提问时，系统先</span><span style="font-weight:bold">从知识库检索相关片段</span><span>，再交给大模型</span><span style="font-weight:bold">结合上下文生成答案</span><span>，从而避免大模型"凭空编造"，做到"答案有据可查"。</span></li></ul>


<a id="section-2411"></a>
## 学习案例：BearAgent-自进化Harness AI Agent项目

<a id="t-sDQViNlkE7hxqeQete8uAN"></a>

<p id="t-sQkKDWTjCQMHOJrGDWtRpa"><span>https://item.taobao.com/item.htm?ft=t&amp;id=1086381736593&amp;spm=a21dvs.23580594.0.0.3f062c1bia9dR5</span></p>

<div id="t-MFIxD2tA9uRI0uCBS2opPR"><div class="technical-image-transcript"><h4>Bear Agent：自进化 Harness Agent</h4><p>Bear Agent - 是一个会把用户反馈沉淀成 Skills 的自进化 Harness Agent。一个可以本地运行、支持 Docker 部署的企业级 AI Agent 项目。它不是普通命令行聊天工具，而是一个完整的自进化 Harness Agent。统一编排大模型推理、工具调用、权限控制、长期记忆、Skills 自进化、MCP 外部工具、子 Agent 和会话恢复，让 Agent 的能力可沉淀、可审计、可比较、可回滚。</p><p>反馈驱动 · Skill 沉淀 · 持续进化</p><table><thead><tr><th>层次</th><th>图中技术内容</th></tr></thead><tbody><tr><td>入口层</td><td>参数解析、REPL、一次性任务、命令处理、终端输出</td></tr><tr><td>Harness 层</td><td>Agent Loop、模型协议适配、工具调度、Multi-Agent、子 Agent</td></tr><tr><td>能力层</td><td>文件工具、Shell、Skills、Memory、MCP、子 Agent</td></tr><tr><td>演化层</td><td>从反馈中抽取 Skill 候选、注入规则；动态构建系统提示词；Memory 索引；Skills 列表；子 Agent 描述</td></tr><tr><td>持久化层</td><td>保存 Skills、Memory、Session、审计记录、大工具结果、Plan 文件</td></tr></tbody></table><p>自下而上，层层递进，协同工作。</p><p>学习教程中可读的技术目录：项目介绍；系统架构设计；技术亮点；从 0 到 1 学习项目；阅读目标和验收标准；先建立整体认知；项目目录和文件职责；运行和配置；一次请求的完整链路；CLI 入口；Agent Runtime；Prompt 构建；工具系统和权限控制；Plan Mode；Skills；Skills 自进化；Memory 长期记忆；MCP；子 Agent。</p><p>Agent Loop 闭环执行。</p></div></div>


<a id="section-2412"></a>
## 学习案例：MClaudeCode从零构建的终端AI编程AI Agent项目

<a id="t-Tq4PiJVCLpmpSI5WwauCxX"></a>

<p id="t-YisyTKPqt0IiEPUjwTjJE1"><span>https://item.taobao.com/item.htm?ft=t&amp;id=1087086612342&amp;spm=a21dvs.23580594.0.0.3f062c1bia9dR5</span></p>

<div id="t-rqFdk6eFFp1L0ZPlb9xRnh"><div class="technical-image-transcript"><h4>MClaude Code Agent</h4><p>MClaude Code Agent 是一个从零构建的终端 AI 编程助手（类 Claude Code），支持多轮工具调用对话、流式 SSE 响应、上下文智能压缩、MCP 协议扩展、长期记忆与权限管控。通过命令行终端与 LLM 交互，可跨平台执行文件读写、代码搜索、Shell 命令等编程任务。</p><p>技术栈：textual、anthropic / openai SDK、mcp、pydantic + pyyaml。</p><p>语言版本：Go / Java / Python / TypeScript。</p><table><thead><tr><th>对比项</th><th>Go</th><th>Java</th><th>Python</th><th>TypeScript</th></tr></thead><tbody><tr><td>语言版本</td><td>Go1.25</td><td>JDK21</td><td>Python3</td><td>Bun+TS5</td></tr><tr><td>TUI 框架</td><td>BubbleTea</td><td>tui4j</td><td>Textual</td><td>Ink</td></tr><tr><td>LLM SDK</td><td>Anthropic SDK</td><td>Anthropic SDK</td><td>Anthropic SDK</td><td>Anthropic SDK</td></tr><tr><td>多模型</td><td>OpenAI SDK</td><td>OpenAI SDK</td><td>OpenAI SDK</td><td>OpenAI SDK</td></tr><tr><td>MCP 协议</td><td>MCP SDK</td><td>MCP SDK</td><td>MCP SDK</td><td>MCP SDK</td></tr><tr><td>配置</td><td>yaml.v3</td><td>SnakeYAML</td><td>PyYAML</td><td>js-yaml</td></tr><tr><td>HTTP</td><td>net/http</td><td>HttpClient</td><td>httpx</td><td>node:http</td></tr><tr><td>测试</td><td>testing</td><td>JUnit</td><td>pytest</td><td>bun:test</td></tr></tbody></table><p>Agent 核心技术：ReAct Loop、Tool Use、Streaming、SubAgent、MCP、Multi-Agent Teams、Hook System、Memory。</p><p>教程可读的技术目录：项目简介；架构设计；工具系统；AI Agent 自己干活；System Prompt 设计；权限系统；MCP 协议；上下文管理；记忆系统；Slash Command；Skill 系统；Hook 系统；SubAgent；Worktree；Agent Teams。</p></div></div>

