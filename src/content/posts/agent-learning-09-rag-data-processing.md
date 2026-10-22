---
title: "第 09 章 · RAG 基础与数据处理"
date: "2026-10-22"
draft: false
author: "学习资料整理"
description: "知识库、PDF、文档解析、清洗、分块与元数据"
tags: ["Agent", "学习路线"]
categories: ["AI 工程"]
prerequisites: ["agent-learning-08-intent-routing"]
verification: {"status": "not-run", "scope": "本次仅整理资料；示例代码与原文技术结论未复跑。"}
---

知识库、PDF、文档解析、清洗、分块与元数据

[学习路线](/posts/agent-learning-route/) · [上一章](/posts/agent-learning-08-intent-routing/) · [下一章](/posts/agent-learning-10-retrieval-advanced-rag/)

本章按知识小节编排。项目内容作为学习案例阅读，示例代码与原文技术结论未在本次整理中执行验证。

## 本章目录

- [网页RAG项目选型](#section-0022)
- [应用核心：Agent 与 RAG](#section-0024)
- [RAG](#section-0093)
- [RAG全局总览](#section-0094)
- [RAG vs 微调](#section-0095)
- [RAG评价指标](#section-0096)
- [RAG的重要步骤](#section-0098)
- [RAG进阶](#section-0100)
- [RAG场景题](#section-0101)
- [RAG的趋势探讨](#section-0102)
- [RAG 与知识检索](#section-0568)
- [RAG 基础原理](#section-0569)
- [前置挑战：复杂文档解析](#section-0571)
- [文档切分策略](#section-0572)
- [实例：使用 LangChain 进行递归切分](#section-0573)
- [Embedding 模型](#section-0575)
- [相似度计算与 ANN 算法](#section-0576)
- [Advanced RAG (进阶架构)](#section-0577)
- [预检索：查询优化](#section-0578)
- [混合检索（Hybrid Search）](#section-0579)
- [后检索优化：重排序（Reranking）](#section-0580)
- [实例：重排序流程伪代码](#section-0581)
- [Self-RAG 与 CRAG（修正式 RAG）](#section-0582)
- [GraphRAG：知识图谱 + 检索融合](#section-0583)
- [GraphRAG 核心步骤](#section-0584)
- [技术与数据库选型建议](#section-0585)
- [RAG 评估指标（RAGAS 框架）](#section-0586)
- [RAG从入门到精通](#section-1218)
- [RAG的整体架构设计](#section-1219)
- [架构图说明](#section-1220)
- [一、概览](#section-1221)
- [Overview（RAG是什么？）](#section-1222)
- [Indexing（索引构建：把知识装进&quot;大脑&quot;）](#section-1223)
- [Retrieval（检索：快速找到相关知识）](#section-1224)
- [Generation（生成：基于知识产生答案）](#section-1225)
- [技术知识与案例补充](#section-1227)
- [Multi Query - 多查询策略](#section-1228)
- [RAG-Fusion - 多查询结果融合策略](#section-1229)
- [Decomposition - 问题分解策略](#section-1230)
- [Step Back问答回退策略](#section-1231)
- [HyDE（假设性文档嵌入）](#section-1232)
- [三、路由优化和问题构建策略](#section-1233)
- [Routing（路由）：智能流量调度](#section-1234)
- [Query Construction（查询构建）：说数据库的语言](#section-1235)
- [小结](#section-1236)
- [🎯 路由优化（Routing）](#section-1237)
- [🔧 查询构建（Query Construction）](#section-1238)
- [💡 关键洞察](#section-1239)
- [一、传统RAG索引的痛点](#section-1241)
- [信息瓶颈问题](#section-1242)
- [上下文割裂](#section-1243)
- [检索精度不足](#section-1244)
- [核心思想](#section-1246)
- [详细架构设计](#section-1247)
- [实现细节与代码示例](#section-1248)
- [算法原理深度解析](#section-1249)
- [性能提升数据](#section-1250)
- [最佳实践与优化建议](#section-1251)
- [核心思想与动机](#section-1253)
- [RAPTOR架构详解](#section-1254)
- [RAPTOR核心算法流程](#section-1255)
- [RAPTOR检索策略](#section-1256)
- [RAPTOR性能分析与优化](#section-1257)
- [核心思想](#section-1259)
- [ColBERT详细架构](#section-1260)
- [MaxSim算法详解](#section-1261)
- [ColBERT实战代码](#section-1262)
- [ColBERT性能与权衡](#section-1263)
- [ColBERT v2的优化](#section-1264)
- [全面对比](#section-1266)
- [选型决策树](#section-1267)
- [六、Retrieval检索和Generation生成优化策略](#section-1268)
- [Retrieval检索优化策略](#section-1269)
- [RRF算法详解（Reciprocal Rank Fusion）](#section-1270)
- [TM2C2算法：RRF的进化版](#section-1271)
- [Re-ranking重排](#section-1272)
- [CRAG：纠错检索增强生成](#section-1273)
- [Self-RAG：自反思检索增强生成](#section-1274)
- [🔥 难题1：检索不准确（最核心的痛点）](#section-1275)
- [🔥 难题2：上下文窗口限制](#section-1276)
- [🔥 难题3：如何评估RAG效果（没有标准答案）](#section-1277)
- [🔥 难题4：文档，表格怎么解析，这个我们到时候重新更新一篇文章解析](#section-1278)
- [📊 评估体系全景图](#section-1279)
- [🎯 评估维度1：检索质量](#section-1280)
- [🎯 评估维度2：生成质量](#section-1281)
- [🎯 评估维度3：端到端评估](#section-1282)
- [📈 完整评估流程](#section-1283)
- [🛠️ 完整代码实现](#section-1284)
- [🎯 运行效果示例](#section-1285)
- [🚀 技巧1：多路召回策略](#section-1286)
- [🚀 技巧2：查询改写](#section-1287)
- [🚀 技巧3：分层检索](#section-1288)
- [🚀 技巧4：实时更新知识库](#section-1289)
- [📊 评估体系全景图](#section-1290)
- [🎯 评估维度1：检索质量](#section-1291)
- [🎯 评估维度2：生成质量](#section-1292)
- [🎯 评估维度3：端到端评估](#section-1293)
- [📈 完整评估流程](#section-1294)
- [🛠️ 完整代码实现](#section-1295)
- [🎯 运行效果示例](#section-1296)
- [🚀 技巧1：多路召回策略](#section-1297)
- [🚀 技巧2：查询改写](#section-1298)
- [🚀 技巧3：分层检索](#section-1299)
- [🚀 技巧4：实时更新知识库](#section-1300)
- [Python 实现 RAG 与知识检索](#section-1440)
- [RAG 基础原理](#section-1441)
- [为什么需要 RAG](#section-1442)
- [核心架构](#section-1443)
- [工作流程](#section-1444)
- [基础 RAG 实现](#section-1446)
- [Advanced RAG](#section-1447)
- [重排序（Reranking）](#section-1448)
- [带重排序的 RAG](#section-1449)
- [混合检索](#section-1450)
- [混合检索 RAG](#section-1451)
- [其他优化策略](#section-1452)
- [向量数据库](#section-1453)
- [核心概念](#section-1454)
- [常用相似度度量](#section-1455)
- [主流向量数据库对比](#section-1456)
- [使用 Chroma 向量数据库](#section-1458)
- [GraphRAG](#section-1459)
- [为什么需要 GraphRAG](#section-1460)
- [核心优势](#section-1461)
- [GraphRAG 实现](#section-1463)
- [应用场景](#section-1464)
- [章节小结](#section-1465)

<a id="section-0022"></a>
## 网页RAG项目选型

<a id="f-doxcnHoc6I0zN4UumLdvp7ws6ib"></a>

<p id="f-doxcnrCXrcHyAABQ0jebzmmPTQb"><span style="font-weight:bold">案例问题：</span><span>我现在做的项目是一个在网上搜索相关演员信息的项目，然后匹配准确度，目前我召回的文本和内容不相关，有一些什么优化方法啊，我需要从多个维度，比如名字+项目+身份 去联合搜索吗？分块本案例用什么好？用你的项目的递归分块吗？ 我需要使用数据库吗？怎么包装一下呢？我目前项目就是用Langgraph写的demo，能帮我做一下技术选型吗？</span></p>

<p id="f-doxcnPGFR5vry83Qbv9cmVbP65f"><span style="font-weight:bold">回答：</span><span>1.分关键字检索思路是对的，但是你看是不是不是分开检索，而是把这些关键词合并。拆开反而会放大噪声。比如 张三，红楼梦，贾宝玉，你提取这三个关键字，然后组合搜索。</span></p>

<p id="f-doxcnrpxR2hRmJWPQ8MbP98tCXb"><span>2.分块问题。分块问题也不是说用我的递归切块比较好。我这个方法是比较通用性的方法。针对你的问题，网络文档，通常噪声比较大，可以先去噪声（导航，广告之类的），提取出纯文本以后可以用最普通的滑动窗切块。因为一般你要的信息，比如张三，红楼梦，贾宝玉，可能就在一个连贯的chunk中，用递归还容易切掉信息。</span></p>

<p id="f-doxcnKrCYcWrt0WSlZXPQd338Wh"><span>3.分块匹配一般就是粗排和精排。 你说的向量余弦相似度，这里其实有不同方法的向量可以做选型，比如BM25，OpenAI 的embedding等。你图方便可以用BM25做粗筛，然后精筛是解决你说的不相关问题的核心。可以用LLM匹配，也可以用Cross-encoder，这是两个经典方法，解决你说的召回内容不相关问题。</span></p>

<p id="f-doxcnGO2kIPT0LaKPToYPZKdHlb"><span>4.向量存储，网页搜索确实可以不做本地化存储，动态筛选了以后去做切分召回，然后销毁，这也是合理的。</span></p>


<a id="section-0024"></a>
## 应用核心：Agent 与 RAG

<a id="f-doxcnsZ4peAEntDyq2uX1N9Z8sf"></a>

<p id="f-doxcnbcUCeLXvadNJ9pj46dUg3f"><span>（对不起，Agent目录越来越多，我知道我应该重构一下，比如两个实战项目，PI Agent和DeepSeekHarness ，可以放在一起并且放到最后面</span></p>

<p id="f-doxcnPvP7PY2kGj1vxRIIBzu16e"><span>但飞书目录重构真的很麻烦，我没想到一个很好的方案去重构目录，如果我要改动目录，标号都得一个个改，而且文档内的很多链接索引可能都乱了。</span></p>

<p id="f-doxcnZDqFoooMZN4wMbPmxLvvie"><span>大家可以先把所有的子章节都折叠，虽然一级目录可能没有特别有条例，但一级目录只有不到20个，不过你可以自己从这一级目录中找到你需要的，然后再阅读。后面我想到好方法重构目录，</span><span style="font-weight:bold">我会重构的</span><span>。）</span></p>


<a id="section-0093"></a>
## RAG

<a id="f-doxcnOspsOYkiNJ5Uzwk5mqunxh"></a>

<p id="f-doxcnyfqw7jK8iPOGPk1cuFMFKc"><span>RAG的话，其实该学习案例就是一个最好的经典RAG的例子。所以建议了解RAG的八股知识后，可以去了解这个项目，这个项目把RAG最经典的环节都串起来了，并且这个项目配的模拟面试/项目复习的SKILL，就是去掌握项目，学习RAG各个环节的好方法。 该项目部分也会配一些该项目面试的真题，和前面的RAG理论相互补充。学好这个理论/项目，经典RAG就差不多了。</span></p>

<p id="f-doxcn9GeD7l6BDlnz3lj9MDGtOg"><span>RAG进阶是：Graph RAG, Agentic RAG, 知识图谱这里。 本节总结了基本概念，我的策略是问到我就说会，讲述我的概念，但是我没有深入，因为这是RAG进阶技巧，对于那种对RAG要求比较高的岗位，专门做RAG的组可能会用。如果求职方向就是大模型应用，大模型算法，算法工程，没有指定RAG方向的话，没有余力的话，对于RAG的进阶部分，可以就只看一下笔记本节</span><span style="font-weight:bold">RAG进阶</span><span>的概念，了解基本概念就好。</span></p>

<p id="f-doxcnOEflSoq7a54lakEyRLleYH"><span>看本节笔记也能够理解RAG大概的步骤。这里更像一个概念卡片，带大家理解具体步骤。</span><span style="font-weight:bold">不过更具体的，深入的，或者不理解的地方，大家要自己去网上搜一下资料</span><span>。因为这些东西其实都是比较现成的知识，基本上每本书都会讲，所以网上资料很多，大家要加强理解的就搜关键字，视频都行。</span></p>


<a id="section-0094"></a>
## RAG全局总览

<a id="f-doxcnhrP7JmcDSM0cUFbeOqfaxb"></a>

<p id="f-doxcn2UomdE2eBRaXNQmyqHtEde"><span>RAG 全称 Retrieval-Augmented Generation（检索增强生成）。一句话概括：让 AI 在回答前，先去一个"专属知识库"里查资料，再根据查到的内容来回答，而不是单纯靠它脑子里记住的东西瞎编。</span></p>

<p id="f-doxcnCHznBzOnJbXI0gtBLvjFxb"><span>可以类比成开卷考试：大模型是考生，知识库是允许带进考场的参考书。遇到问题先翻书找到相关章节，再组织答案——这样答得更准、更不容易胡说。</span></p>

<p id="f-doxcnCv4jcDE1PEfipWZwgEchwh"><span>这一小节带大家用这张图来理解整个RAG系统的流程。</span></p>

<div id="f-doxcnoexVlIUTSzOgIB74ZKcJwb"><img alt="" decoding="async" height="853" loading="lazy" src="/images/agent-learning/0d4116864650ec8b6678ab41.png" width="1280"/></div>

<p id="f-doxcnb5M7xYBhFb4bQz1cbvmjIe"><span> 这张图把整个流程分成了两条链路。</span></p>

<p id="f-doxcnYOBV8K5udoGJX0an5bobec"><span style="font-weight:bold">一、离线知识库构建链路（绿色，"提前准备参考书"）</span></p>

<p id="f-doxcn5H74Dql814floT4yS3Z2qe"><span>这部分是事先做好的，目的是把你的文档变成 AI 能快速查阅的知识库，一共 7 步：</span></p>

<ul><li id="f-doxcnyT0WQMFc7WFGycQ9v1o1fe"><span>1 原始文档：你的资料，比如 PDF、Word、网页等。</span></li></ul>

<ul><li id="f-doxcnkBgGizFUmOKhshCKSKVtYc"><span>2 文档解析：把各种格式读出来，变成纯文字。</span></li></ul>

<ul><li id="f-doxcnZzCjhrpEdPt1HBHQxenBod"><span>3 文档清洗：去掉乱码、页眉页脚、广告等垃圾内容。</span></li></ul>

<ul><li id="f-doxcnvI7Sn9WUA634ThXWKavez3"><span>4 文档分块：把长文章切成一小段一小段，方便后面精准检索。</span></li></ul>

<ul><li id="f-doxcnBVs1VsZPBTC2bd5vfRwCre"><span>5 元数据生成：给每段贴"标签"，比如标题、来源、时间、关键词等。</span></li></ul>

<ul><li id="f-doxcnj2CRNl3M5BUwUYQ5RXU3sb"><span>6 向量化：把文字转成一串数字（向量），让计算机能计算"语义相似度"。</span></li></ul>

<ul><li id="f-doxcnTYtwYIQsviaPpk3etH3n5d"><span>7 向量数据库：把这些向量存进专门的数据库，等着被查询。</span></li></ul>

<blockquote id="f-doxcnVvCGzDh28FlJq5FKBAdQKe"><p id="f-doxcnemVkSaWc1zzd2M0kqRHLne"><span>核心思想：把书"消化"成 AI 容易检索的形式，存起来备用。</span></p></blockquote>

<p id="f-doxcn0ogjdDbgWl7eCKQnCkuRNf"><span style="font-weight:bold">二、在线用户问答链路（蓝/橙/紫色，"用户提问时实时处理"）</span></p>

<p id="f-doxcnsDB9qMwPnTADzs0TJ2pQBh"><span>用户真正提问时走这条线，一共 9 步。</span></p>

<p id="f-doxcnclbGD8OOewLrU0e5i2g3Hf"><span>理解问题阶段（蓝 + 橙）</span></p>

<ul><li id="f-doxcnJd10Nr5CJpSf1fJwd8fJxh"><span>1 用户问题：用户输入问题。</span></li></ul>

<ul><li id="f-doxcnckacje4zziq25EVIstK26g"><span>2 上下文补全：结合前面的对话，补全省略的信息（比如"它"指的是谁）。</span></li></ul>

<ul><li id="f-doxcnWtEcE3c5xWfPYKtEunV2Tc"><span>3 意图理解：搞清楚用户到底想问什么。</span></li></ul>

<ul><li id="f-doxcnNBn6NPBT09d5bsmEjkBloc"><span>4 歧义判断：判断问题清不清楚。如果不清楚，就走 澄清追问（反问用户一句，再回到第 2 步重新理解）；如果清楚，就继续往下。</span></li></ul>

<p id="f-doxcnIbaEhRXaGaSfuUkk5AGwth"><span>检索与生成阶段（蓝 + 紫）</span></p>

<ul><li id="f-doxcnfC6o6YzlyV6MOaNyjN3Lhe"><span>5 查询处理：把问题"优化"得更适合检索，常见手段有改写、扩展、拆解等。你只需知道这一步是"把问题打磨得更好查"即可。</span></li></ul>

<ul><li id="f-doxcn1mefD8i7AdOoEnZ64jWhve"><span>6 检索与筛选：去知识库里找出最相关的几段资料（相似度计算、按权限和元数据过滤等）。这是 RAG 里的 "R（检索）" 核心。</span></li></ul>

<ul><li id="f-doxcngEEJoShWWI4dfaqfeQ2dcf"><span>7 重排序 / 压缩：把找到的资料排个序、去重、精简，只留最有用的部分。</span></li></ul>

<ul><li id="f-doxcnVu2KuJkQrfNFLYSf8MbWed"><span>8 生成回答：把"问题 + 检索到的资料"一起交给大模型，让它基于资料生成答案，并附上引用出处、做事实核查，答不了就拒答，避免乱编。这是 RAG 里的 "G（生成）" 核心。</span></li></ul>

<ul><li id="f-doxcnIilg080MTq7kkciDrI7kYg"><span>9 返回用户：把最终答案返回给用户。</span></li></ul>


<a id="section-0095"></a>
## RAG vs 微调

<a id="f-doxcnKpUbNM0uRkDKjMfxCzJvSf"></a>

<div id="f-doxcnVkWevrSL3nXZrDifOrqSbT"><img alt="" decoding="async" height="323" loading="lazy" src="/images/agent-learning/aa18200730f9e68cd8a79c38.png" width="873"/></div>


<a id="section-0096"></a>
## RAG评价指标

<a id="f-doxcnNbiXjL8E9PgpL43YUADOIc"></a>

<p id="f-doxcnZtq4G6on8pOWdPFAomTpQg"><span>（Reference: 大模型RAG实战 ：4.5小节）</span></p>

<p id="f-doxcnb2ZSddlUTMQi8EcjeXh9Id"><span>Rag场景下，比较著名的评估模型方法的框架是：</span><span style="font-weight:bold">RAGAS</span><span>。RAGAS方法在评估过程中主要使用</span><span style="font-weight:bold">忠诚度</span><span>，</span><span style="font-weight:bold">答案相关性</span><span>，和</span><span style="font-weight:bold">上下文相关性</span><span>来评判整个RAG系统中llm生成答案的质量。 RAGAS方法的一个优点是不需要参考答案。</span></p>

<p id="f-doxcnBlIErO5IRNaZygaDREm4Lc"><span>具体来讲，</span><span style="font-weight:bold">忠诚度</span><span>是指用户判断LLM的输出是否是根据召回文本的内容生成的。</span></p>

<p id="f-doxcnzGeU1VIv6igJvzZttGIopb"><span style="font-weight:bold">答案相关性</span><span>是衡量生成的答案是否和用户的问题相关的。</span></p>

<p id="f-doxcnI2AnO4BNKaJw4acIsSiSXc"><span style="font-weight:bold">上下文相关性</span><span>是用于判断召回文本是否和用户问题相关的。</span></p>

<p id="f-doxcnZbIP9hP0X0xihxhvEBB1ce"><span>（下面的可以挑一个具体的指标来展开给面试官讲，都展开讲太长了，而且内容有点抽象，如果讲完面试官不懂，可以给他举具体的例子讲解）</span></p>

<p id="f-doxcnDWwNxSkfwhDTnTP0eWmNxd"><span>具体来讲：</span></p>

<p id="f-doxcnbVtJWNSgdWQ5SrKvxpVn4f"><span style="font-weight:bold">忠实度</span><span>的计算方式通常包括两个步骤。1：使用LLM生成的问题和答案，让大模型生成多个陈述。 2. 让LLM判断是否可以通过召回的文本，推断出这些陈述。 最后采用能够推断出来的陈述/总陈述量作为忠诚度的评分。</span></p>

<p id="f-doxcniQ7LvEFcnfuX4DWITAtqNg"><span style="font-weight:bold">答案相关性：</span><span>根据LLM的回答生成若干个假问题，然后计算假问题和真实问题的相似度，将相似度平均值作为答案相关性的评分。</span></p>

<p id="f-doxcn5M7nTuX3N5qUW43UiXY2Mg"><span style="font-weight:bold">上下文相关性</span><span>：让LLM挑选出召回文本片段中能够回答用户问题的文本子集，用文本子集占召回文本的比例作为上下文的相关性数值。</span></p>


<a id="section-0098"></a>
## RAG的重要步骤

<a id="f-doxcnvhn3wKlMgik08WfSi0GvAg"></a>

<p id="f-doxcn81p93kLpcHWYpd6exxbccg"><span>参考视频</span></p>

<div id="f-doxcnLTavvJk7pwMrWqqTi2802d"><div><div><div><div><div><div><div><div><div><a href="https://open.douyin.com/player/video?vid=7522119790514998591&amp;mode=pc">嵌入视频 / 原始播放器</a></div></div></div></div></div></div></div></div></div></div>

<a id="f-doxcnSE2sZbBp4rKiFKAthfloxf"></a>

##### 意图识别

<p id="f-doxcnv3CYzehb1xP4BfIYT6XMTe"><span>意图识别位于 </span><span><span><a href="#f-doxcnhrP7JmcDSM0cUFbeOqfaxb"><span>RAG全局总览</span></a></span></span><span>的第3，4（图中橙色的部分）</span></p>

<p id="f-doxcnSeRDII72vNJbOiBYh4v6xe"><span style="font-weight:bold">是什么？</span></p>

<p id="f-doxcnyf0U1YvwlOTssvxck5zcWg"><span>意图识别位于 RAG 的检索前处理阶段，核心作用是先理解用户到底想问什么，再决定后面应该如何检索。它不是简单给用户问题打一个分类标签，而是要把用户的自然语言问题转成后续 RAG 可以执行的检索计划。</span></p>

<p id="f-doxcnbakNbuS1erLDshdiu5dFDe"><span>在实际场景中，用户的问题经常是不完整、口语化、依赖上下文的。比如用户问“这个怎么申请？”“它和那个有什么区别？”如果直接把原句送进向量数据库，很容易召回错误内容。因此在正式检索前，系统需要先判断用户的真实意图、问题中的关键对象、时间地点等限制条件，以及这个问题是否需要先澄清。</span></p>

<p id="f-doxcngLtRbCunqCtkIPSWCYYgch"><span style="font-weight:bold">怎么做？</span></p>

<p id="f-doxcn8n9d4HkvbDZOx1LO1b1BIc"><span>意图识别通常会做三件事。</span></p>

<p id="f-doxcnQ4ztEQZeWx7GOpHZflD2oc"><span>第一，</span><span style="font-weight:bold">判断用户的问题类型</span><span>。比如用户是在问定义、查事实、问流程、做比较、要总结、查政策，还是排查问题。不同类型的问题适合不同的处理方式：事实类问题通常适合精确检索，比较类问题适合拆成多个子问题，总结类问题需要召回更大范围的上下文，政策类问题则通常需要结合地区、时间、政策类型等元数据过滤。</span></p>

<p id="f-doxcnSx2vU95p6G3PjUdnQzjiFc"><span>第二，</span><span style="font-weight:bold">抽取实体和槽位</span><span>。实体是用户问题中真正关心的对象，槽位是检索时需要用到的限制条件。例如“2024 年上海人才补贴怎么申请？”中，主题是“人才补贴”，地区是“上海”，时间是“2024 年”，问题类型是“申请流程”。这些信息可以直接用于过滤文档集合，避免在整个知识库里盲目检索。</span></p>

<p id="f-doxcnnawYvXiP3WKaOYFcwroBWi"><span>第三，</span><span style="font-weight:bold">决定检索策略</span><span>。如果用户问题已经明确，可以直接检索；如果问题表达口语化或依赖上下文，可以先做查询改写；如果用户用词和文档用词可能不一致，可以做查询扩展；如果问题比较短、抽象，可以用 HyDE 生成假设性文档辅助召回；如果问题包含多个子目标，可以进行查询分解；如果缺少关键信息，就应该先向用户澄清，而不是强行检索。</span></p>

<p id="f-doxcnisfDxOP90lvmDZiv4YkMef"><span>比如用户问“这个怎么申请？”，如果上一轮正在讨论“上海人才租房补贴”，系统就可以把它改写成“上海人才租房补贴怎么申请？”再检索。如果没有上下文，系统就应该追问“你想申请的是哪类事项？比如人才补贴、项目申报、发票报销，还是其他业务？”这就是意图识别在多轮 RAG 中的价值：能补全的自动补全，不能确定的先澄清。</span></p>

<div id="f-doxcnOfCoBVsljpyt67bmT1EpFf"><img alt="" decoding="async" height="1280" loading="lazy" src="/images/agent-learning/41af01fe3b687790e756ce46.png" width="853"/></div>

<p id="f-doxcnYxkXFywFwQ6fgz4qvHHSed"><span>在工程实现上，可以用规则、小模型分类器，也可以直接用大模型做结构化理解。现在</span><span style="font-weight:bold">更常见的方式是让大模型输出一个结构化结果</span><span>，例如：</span></p>

<pre id="f-doxcnFyuHX5Y0K7pyPOeT007PHe"><code>{
  "intent": "policy_query",
  "entities": ["人才补贴"],
  "filters": {
    "region": "上海",
    "year": "2024"
  },
  "needs_clarification": false,
  "route": "policy_knowledge_base",
  "retrieval_strategy": "metadata_filter",
  "rewrite_query": "2024年上海人才补贴政策的申请条件、补贴标准和办理流程是什么？"
}</code></pre>

<p id="f-doxcneenzkceqhrqGYdtsEFI3ld"><span>这个结果比单纯输出一个 </span><span><span><span>policy_query</span></span></span><span> 更有用，因为它可以直接驱动后续流程：</span><span><span><span>intent</span></span></span><span> 决定问题类型，</span><span><span><span>filters</span></span></span><span> 用于元数据过滤，</span><span><span><span>route</span></span></span><span> 决定去哪个知识库，</span><span><span><span>retrieval_strategy</span></span></span><span> 决定是直接检索、改写、扩展、HyDE、分解还是澄清。</span></p>

<p id="f-doxcnJYlg2AQ3degIWb4NUFkZQg"><span style="font-weight:bold">如何判断意图识别做得好不好？</span></p>

<p id="f-doxcnCfkalQHrvyyH3aOp7kitMc"><span>我们需要从意图分类，槽位抽取，是否需要澄清，路由是否正确这几个维度来综合评估。</span></p>

<p id="f-doxcnoclHSG6aYE9iAAkIs2B4Rf"><span style="font-weight:bold">意图分类</span><span>可以看 整体准确率、精确率、召回率、F1；</span></p>

<p id="f-doxcnf4jcw9FphSLxH38pqUa1Th"><span style="font-weight:bold">实体和槽位抽取</span><span>可以看 Slot 精确率、Slot 召回率、Slot F1；</span></p>

<p id="f-doxcnoecgEqtaQxASy0zeUfgqBe"><span style="font-weight:bold">是否需要澄清</span><span>可以单独看澄清判断的准确率和召回率；</span></p>

<p id="f-doxcnSoutXThj5VKFtq4PPXbvtf"><span style="font-weight:bold">路由是否正确</span><span>可以看 Route Accuracy；</span></p>

<p id="f-doxcnFQztYd6Bmkj2Gn0GRdnz3c"><span>最终还要看加入意图识别后，正确文档</span><span style="font-weight:bold">是否更容易进入 Top-K，答案准确率是否提升。</span></p>

<blockquote id="f-doxcnab1IoIX8BjOGwQH18kyw6c"><p id="f-doxcnfzuKnumNrRn37twdr5yU4e"><span style="font-weight:bold">指标释义</span><span>：</span><span style="font-weight:bold">❗如果还不明白就问AI，都是标准指标，也确实有点难绕。</span></p>
<p id="f-doxcnVhcE8gR2psU6dhO82n3PLv"><span style="font-weight:bold">整体准确率 (Accuracy)</span><span>：所有判断里预测对（包括对和错两类判定都对）的样本占总体的比例。</span></p>
<p id="f-doxcnZx8wg9NL84vDJ6V5lOeFac"><span style="font-weight:bold">精确率 (Precision)</span><span>：模型预测为“是”的结果里，真正正确的比例（主要防误报、防乱判）。</span></p>
<p id="f-doxcnsfG4E3VhtqTxBLnnKH82kh"><span style="font-weight:bold">召回率 (Recall)</span><span>：在实际为“是”的所有样本中，模型成功找出来多少的比例（主要防漏报、防漏判）。</span></p>
<p id="f-doxcn4GHehREwDxiLaeQBAC9hke"><span style="font-weight:bold">F1 值 (F1-Score)</span><span>：精确率和召回率的调和平均值，两者双高才能拿到高分，反映综合好坏。</span></p>
<p id="f-doxcnWyqMa7MWeDeb8TauSmMEGd"><span style="font-weight:bold">槽位 (Slot)</span><span>：从用户提问里抽出来的结构化属性约束条件，如时间、地区、主题。</span></p>
<p id="f-doxcnnLXRDgHQcQxGFJlr4fuIWc"><span style="font-weight:bold">前 K 个检索结果 (Top-K)</span><span>：指搜索引擎按相关性排序最终返回给用户的前 K 个文档片段。</span></p>
<p id="f-doxcnkcwNIQD6LJcQpHTd4cp4Of"><span style="font-weight:bold">平均倒数排名 (MRR)</span><span>：评判第一个正确结果排在第几名，排名越靠前（第一名倒数为1，第二名倒数为0.5）分值越高。</span></p>
<p id="f-doxcnIpRDktrBbmFvCMKxVXrkEf"><span style="font-weight:bold">前 K 个命中率 (Hit@K)</span><span>：测试样本集中，检索前 K 个文档包含有正确答案的样本比例。</span></p>
<p id="f-doxcnulYwmL7SkgpSeqbypGUwYc"><span style="font-weight:bold">归一化折损累计增益 (nDCG)</span><span>：不仅衡量找回的文档是否相关，还非常看重最相关的文档是不是排在最前排</span></p></blockquote>

<a id="f-doxcnb2YC7Vpe2VuLAvjyNeJrik"></a>

##### 输入文件处理

<p id="f-doxcn8ghsXAYND1n1oFtWi3U2Mb"><span>在进行文档分割前，我们先要对输入的各种类型的文件进行处理，转换成文本内容，进行切块。这个地方倒是算不上是RAG里面的重要内容，属于传统方法的内容。不过该学习案例是以PDF作为输入，转换成Markdown的文本，进行后续切块的，根据粉丝朋友们反馈，</span><span style="font-weight:bold">这里面面试被问得很多</span><span>，所以我干脆把这里沉淀成专题笔记：PDF到MarkDown的处理，相关的面试真题可以参考这里：</span><span><span><a href="/posts/agent-learning-23-learning-cases/#f-doxcnnbMYD5vpjPBU2aHDrzevVi"><span>PDF处理问题</span></a></span></span><span>。 </span></p>

<p id="f-doxcnTB2M8U5uL6IrJk1XRqxmFg"><span>可以认为这个知识点</span><span style="font-weight:bold">纯粹是为了应付你使用本节RAG项目，面试官可能会问到的相关的问题。</span><span>如果你没有用该学习案例，可以认为你可以放一放这个问题，这个问题不算是RAG里面很重要的知识点。</span></p>

<a id="f-doxcnpsomnMXJL47jFv68Jrd7bc"></a>

###### 整体处理逻辑

<p id="f-doxcnb6d4QVNpD8ayMwyQk7UmUe"><span>整体处理逻辑很清晰，我们把工业化的处理分成5个连续的阶段：</span></p>

<p id="f-doxcnh9fcO9Ncqqm0osa17YJgkc"><span style="font-weight:bold">文件体检</span><span>：检查 PDF 是否重复、加密、损坏或方向异常，确认文件可以正常处理。</span></p>

<p id="f-doxcnEgvoh1QEUapfvV2eHe17Uc"><span style="font-weight:bold">逐页判断</span><span>：判断每页属于原生文本、扫描、混合、复杂布局还是异常页面。</span></p>

<p id="f-doxcnfG4YRmc6nGeoDEvqVbvYsf"><span style="font-weight:bold">按页面类型解析</span><span>：为不同类型的页面选择对应的解析方法。</span></p>

<p id="f-doxcnhCZ2k7ozHRd0gE8lykk1Zc"><span style="font-weight:bold">统一结果</span><span>：将不同解析结果按页码和阅读顺序整理成统一格式。</span></p>

<p id="f-doxcnnjSIDxZ5KWCb45Xppjvp2f"><span style="font-weight:bold">结果检查</span><span>：检查漏页、乱码、重复、错序及表格错误，确保最终内容完整、准确、可用。</span></p>

<div id="f-doxcnDuagPRyHdDTAfhMvtGKPRd"><img alt="" decoding="async" height="720" loading="lazy" src="/images/agent-learning/37ddbb292a1bc8652266406f.png" width="1280"/></div>

<p id="f-doxcnYNiZFZ6N19mutyAjxVJMJb"><span>很好理解对吗？接下来我们逐一讲解。</span></p>

<a id="f-doxcnOcX26dUmaNoPe0qGvDACad"></a>

###### 步骤一：文件基础体检

<p id="f-doxcnOUDpeJeKIpsHm8f7Qpv0Gh"><span>基础体检只负责文件级别的准入和预处理，不负责提取正文。</span></p>

<div style="margin-left:25px"><div id="f-doxcnsHtTwURLNhy4E0HQJCHu2b" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">文件哈希已经存在</span><span>：视为重复文件，跳过处理或复用已有结果。</span></div></div><div id="f-doxcnHYgINLJmXwMR8HwMdoYGVd" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">文件哈希发生变化</span><span>：视为文件新版本，重新处理。</span></div></div><div id="f-doxcnSowI1fvEQoDbLNSSLBaEeh" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">PDF 有密码</span><span>：先获取密码或解密；无法解密则停止处理并记录原因。</span></div></div><div id="f-doxcnuEJ4cvB1HXzdscIor9Pvr5" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">PDF 损坏或无法打开</span><span>：尝试修复；修复失败则要求重新提供文件。</span></div></div><div id="f-doxcnaPyFFZqD2D3DohnfFo6YDc" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">页面方向错误</span><span>：在文字提取或 OCR 前进行方向校正。</span></div></div><div id="f-doxcndEUlWjKgCmRUQwYsoTRDBg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">总页数可以读取</span><span>：记录总页数，处理完成后用于检查是否漏页。</span></div></div></div>

<p id="f-doxcnalx8LEXamxEDLPivhIFYkc"><span>文件通过基础体检后，进入逐页分类。</span></p>

<a id="f-doxcnbeD1xfEyAv1NsVdELrHPDh"></a>

###### 步骤二：逐页判断类型

<p id="f-doxcnyGa0DFcWO1U1wVrRcV33lg"><span>页面类型通常通过程序规则判断。可以使用 PyMuPDF 读取每页的文字、图片和位置信息，再综合判断：</span></p>

<div style="margin-left:25px"><div id="f-doxcngveGRokV03bdE5hBnymjr5" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>页面中有多少可正常读取的文字；</span></div></div><div id="f-doxcnL1jpbo5a8FGNLCmeZHiHvg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>页面是否主要被一张或多张图片覆盖；</span></div></div><div id="f-doxcnecnHET9ydnRbqnVsigVGvd" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>提取出来的文字是否存在大量异常字符；</span></div></div><div id="f-doxcnQOKYBTLFTBCDh5eok8bh4d" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>少量文字是否只是跨页重复的水印、页眉或页脚；</span></div></div><div id="f-doxcnMcZi821WL5YOATifilHIvc" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>页面是否存在多栏、表格、表单等复杂布局。</span></div></div></div>

<p id="f-doxcn8fFNuMYd7bwwiMNCBMCLZl"><span>根据这些信息，将页面分为以下类型。</span></p>

<p id="f-doxcn5ja1PfZPinlgpOrlYJzWmd"><span style="font-weight:bold">原生文本页</span></p>

<p id="f-doxcnFGLMEZ37hl4mYoBLjAv7Cc"><span>页面存在完整、可正常读取的文字层。文字通常可以在 PDF 阅读器中选中、复制和搜索</span></p>

<p id="f-doxcnNZkg6RQG486kdPHcUO0SGh"><span style="font-weight:bold">扫描页</span></p>

<p id="f-doxcnBNOVxIs2jp2Z3UygUMql8g"><span>页面主体是一张扫描图片，没有可靠的正文文字层。人可以看到图片中的文字，但普通 PDF 文字提取工具无法直接读取。</span></p>

<p id="f-doxcnfmDDNdOZLTZlwMQgWsAVbG"><span>有些扫描页可能带有页码或水印文字层，因此不能仅根据“是否提取到文字”判断，还需要结合有效正文数量和图片覆盖情况。</span></p>

<p id="f-doxcnOKsQA512VwlGDngw1XSC7b"><span style="font-weight:bold">混合页</span></p>

<p id="f-doxcnkpoodg4aUFNbsC0yiGXNqf"><span>页面既包含可以直接提取的正文，又包含图片中的重要文字或信息。</span></p>

<p id="f-doxcnM4G3MSVkcYBr6DZQoVXw5e"><span>例如正文是原生文字，但页面中插入了带文字的软件截图。普通装饰图片或 Logo 不会使页面自动成为混合页，关键是图片中是否存在需要提取的信息。</span></p>

<p id="f-doxcnlWIg9IjAiqWuy2Wm9rgOWg"><span style="font-weight:bold"> 复杂布局页</span></p>

<p id="f-doxcn4QymckcxpsWMb3mnT1SBsf"><span>页面包含多栏、表单、复杂表格、重要图表、公式或大量图文混排内容。虽然可能存在文字层，但普通提取方式容易打乱阅读顺序，或者丢失表格、图片和公式所表达的信息。</span></p>

<p id="f-doxcnoeGRyKOyyUMbVgz19qdROg"><span style="font-weight:bold">异常页</span></p>

<p id="f-doxcn9Hydq7f6m1tOKBLfHQR32c"><span>页面出现文字乱码、解析报错、内容为空，或者无法可靠判断属于上述哪种类型。</span></p>

<p id="f-doxcnMHbZSj0NsiCTn7xhYBchSg"><span>页面分类不一定百分之百准确。规则能够明确判断的页面自动处理，判断不清的页面交给更强的解析工具、多模态模型或人工复核。</span></p>

<a id="f-doxcnoLAn2NRcaLvHFCX5nBWI9f"></a>

###### 步骤三：按页面类型解析

<p id="f-doxcnb5AnSKZKywrsfKM9HXHE7d"><span>第二步得到页面类型后，第三步与其逐项对应。</span></p>

<p id="f-doxcnA4v4LmGvBQdSMcmnC5F1Ef"><span style="font-weight:bold">处理原生文本页</span></p>

<p id="f-doxcnxKVcWTeIPOaIDGzQjN8vhc"><span>使用 </span><span style="font-weight:bold">PyMuPDF</span><span> 提取页面文字及基本位置信息。如果还需要识别标题、正文、列表等文档结构，可以使用 </span><span style="font-weight:bold">Unstructured、LlamaParse</span><span> 等工具。</span></p>

<p id="f-doxcnD6nsK5SbahiQ58VGypcamh"><span style="font-weight:bold">PyMuPDF 更擅长快速获取 PDF 中已有的文字、图片和坐标</span><span>；</span><span style="font-weight:bold">Unstructured、LlamaParse </span><span>更擅长将内容整理成标题、正文、列表和表格等结构化元素。</span></p>

<p id="f-doxcnagMhNr4s4ct00hQ9RvnlOc"><span style="font-weight:bold">处理扫描页</span></p>

<p id="f-doxcnpKE9CnKIReOMXDPM4Rgqdd"><span>先将 PDF 页面渲染成图片，再使用 OCR 识别图片中的文字。中文文档应选择支持中文的 OCR 模型。</span></p>

<p id="f-doxcnxazw3Myh0qRk5VTtpMlTte"><span>如果扫描质量较差，可以先进行旋转校正、去噪、倾斜校正或对比度增强，再执行 OCR。OCR 结果应保留页码，低质量页面需要重新识别或人工检查。</span></p>

<p id="f-doxcnzAQieOVPcF2HrKzQGWBwcg"><span style="font-weight:bold">处理混合页</span></p>

<p id="f-doxcn2PutJYWZold6czN9loo8QU"><span>混合页需要同时使用两种方式：</span></p>

<div style="margin-left:25px"><div id="f-doxcnOVLDDi4f9eLF22DzMX83Ke" style="display:flex;gap:0.5em"><span style="min-width:1.5em">a.</span><div><span>直接提取页面中已有的原生文字。</span></div></div><div id="f-doxcntxcXPd9gD904Kv2LAhWo6g" style="display:flex;gap:0.5em"><span style="min-width:1.5em">b.</span><div><span>提取或截取包含重要信息的图片区域。</span></div></div><div id="f-doxcnu9ukTcZRxUAFUi4mQSsfHc" style="display:flex;gap:0.5em"><span style="min-width:1.5em">c.</span><div><span>对这些图片区域执行 OCR，或者使用多模态模型理解图表内容。</span></div></div><div id="f-doxcnLRs8CR60f5MLTdcK9KzKOg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">d.</span><div><span>合并原生文字和图片识别结果，并删除重复内容。</span></div></div></div>

<p id="f-doxcnhQE2iNqaatI7ab3gqzqLNc"><span>PyMuPDF 可以发现和提取图片，但通常不能理解图片内容；OCR 负责识别图片中的文字，多模态模型可用于理解图表、流程图等更复杂的视觉信息。</span></p>

<p id="f-doxcnlHW1ACvljnVZwAdZyABNpe"><span style="font-weight:bold">处理复杂布局页</span></p>

<p id="f-doxcnSfSfX1tOqE7GVjpZ8YVYYd"><span>复杂布局页可以先交给 Unstructured、LlamaParse 等工具进行版面解析。这些工具会识别标题、正文、栏位、表格和图片区域，并返回元素类型、页面位置和大致阅读顺序。程序再按照这些结果组合内容，不应让大模型随意改写原文。</span></p>

<p id="f-doxcnPFORi6ZvTqSzbvoPM5hRGe"><span>具体处理方法如下：</span></p>

<div style="margin-left:25px"><div id="f-doxcnM61gjfrD4wLdNmjMVl6pGf" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">分栏页面</span><span>：使用 Unstructured、LlamaParse 或布局模型识别左右栏及各文本块的位置，按照“先读完一栏，再读取下一栏”的顺序重新排列文本。工具给出的顺序不正确时，可以根据文本块坐标补充排序规则。</span></div></div><div id="f-doxcnycozkeAuhvvANnBz4xHiCg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">表格</span><span>：原生 PDF 中边界较清楚的表格可以使用 Camelot 提取；扫描表格先通过 OCR 或表格识别模型识别单元格；图文混排文档也可以直接使用 Unstructured 或 LlamaParse 提取表格。提取结果转换成 Markdown、HTML 或 CSV，并抽查表头、合并单元格、跨页表格和关键数字。如果自动提取破坏了行列关系，则保留表格截图并进入人工复核。</span></div></div><div id="f-doxcnoHCctytxPjo2EdeHTJ86cb" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">含文字的图片</span><span>：先用 PyMuPDF 或版面解析工具确定并提取图片区域，再使用 OCR 识别其中的文字，最后按照图片在页面中的位置插回正文。</span></div></div><div id="f-doxcnZDPQeRXreNwS90GFmGSbfL" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">流程图、架构图和统计图</span><span>：普通 OCR 只能读取图中的文字，无法完整理解节点、箭头和数据关系，因此可以将图片及附近正文交给多模态模型生成说明，并保留原图和页码以便核对。</span></div></div><div id="f-doxcnl2zC4WWGQKeIpDIEO5yrzq" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">公式</span><span>：使用支持公式识别的 OCR 或文档解析工具转换为 LaTeX；识别不可靠时保留公式图片，并将它与前后正文关联。</span></div></div></div>

<p id="f-doxcnEtpNXrGm5eEl7neRMqSA4g"><span>自动工具仍然无法正确恢复阅读顺序或内容结构时，将该页标记为需要人工复核。</span></p>

<p id="f-doxcnpfn5kRiJdVitxo4NmfWVOR"><span style="font-weight:bold"> 处理异常页</span></p>

<div style="margin-left:25px"><div id="f-doxcn9g79j2KYrjwCB8E0ZzYkah" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">文字乱码</span><span>：先更换一种 PDF 解析器重新提取；仍然乱码时，将页面渲染成图片并使用 OCR。</span></div></div><div id="f-doxcnvcf4vtNqsTo5HT9bM5yW4g" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">空白页面</span><span>：保留页码和页面记录，不输出正文。</span></div></div><div id="f-doxcnLwB2hJUXDdfUIvCZTzbuMb" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">解析报错或类型无法确定</span><span>：使用多模态模型辅助判断；仍无法可靠处理时进入人工复核。</span></div></div></div>

<p id="f-doxcnR3AnbDI0N6h31vN59EObfh"><span>无论页面采用哪种解析方式，得到文字和位置信息后，还要处理页眉、页脚、页码和水印。具体方法是比较连续页面中处于相同顶部或底部位置的文本；如果同一内容反复出现，就将其识别为页眉、页脚或水印并从正文中移除。页码可以通过固定位置和连续数字识别。处理完成后再进入统一结果阶段。</span></p>

<a id="f-doxcno1UHS6Qmqx1RuS9d1KcgCf"></a>

###### 步骤四：统一结果

<p id="f-doxcnTlscHMDvRhfLsnuoYAQ3Gj"><span>走过不同解析路线的页面，可能分别产生普通文字、OCR 文字或结构化元素。最后一步不再重新判断和处理页面问题，只负责把这些结果整理成统一形式：</span></p>

<div style="margin-left:25px"><div id="f-doxcnDvd4Ei6ZNrCDy0UqTzPa4b" style="display:flex;gap:0.5em"><span style="min-width:1.5em">a.</span><div><span>将不同工具的输出转换成相同的文本结构。</span></div></div><div id="f-doxcnalvyu1EJa6JPANf9wVOgqb" style="display:flex;gap:0.5em"><span style="min-width:1.5em">b.</span><div><span>按 PDF 原始页码排列所有页面。</span></div></div><div id="f-doxcn5VEcOstQn2NRMMuSt8V6J9" style="display:flex;gap:0.5em"><span style="min-width:1.5em">c.</span><div><span>将同一页内已经确认顺序的标题、正文、列表和特殊元素组合起来。</span></div></div><div id="f-doxcnJNLtr1b7Lco6k9c3QMubSg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">d.</span><div><span>输出为 Markdown 或带页码的结构化文本。</span></div></div></div>

<p id="f-doxcnyYImYDYqiudG1dwZVaKyWg"><span>最终结果建议至少保留：</span></p>

<div style="margin-left:25px"><div id="f-doxcnMMImwYhZgO78WmlCc12Wsg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>原始文件名；</span></div></div><div id="f-doxcna5hcAN3f4VoCBaDwfzY5cA" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>PDF 页码；</span></div></div><div id="f-doxcnQ2i4rK9vQz2A3A81h2aRtH" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>标题和正文；</span></div></div><div id="f-doxcnMB75XzFD8oRGg6dptttqLf" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>列表结构；</span></div></div><div id="f-doxcnhyNdF9OpVoITNG5sVvkZrd" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>可以可靠恢复的表格；</span></div></div><div id="f-doxcnPpq7beyZMS4kezj1eYapqb" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>图片或公式的说明及对应位置；</span></div></div><div id="f-doxcn8yqao9Tupc4ZOKPZeW4rXc" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>需要人工复核的页面标记。</span></div></div></div>

<p id="f-doxcn6UkQZOcR5jyLHY2JEtoXxf"><span>无论输出成哪种格式，都应能从文本追溯到原始 PDF 页面。</span></p>

<a id="f-doxcnG7LIr9g3UM4t1U0S4a0I2f"></a>

###### 步骤五：结果检查

<p id="f-doxcnI9qAHuvj5daKZUOMRikW1g"><span>PDF 转文本完成后，应进行一次简单验收：</span></p>

<div style="margin-left:25px"><div id="f-doxcn5vD9J7nKjNOpyKABXLqRRb" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>输出页数是否与原 PDF 对应，是否漏页；</span></div></div><div id="f-doxcnZhBwtwys0QbuB4BN8NM2Vd" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>是否仍存在大量乱码；</span></div></div><div id="f-doxcniKQ6Aq4BtD5cSKyAXZkSIy" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>页眉、页脚和水印是否大量残留；</span></div></div><div id="f-doxcnBTvqUeKt5y0glrKO6Ro8Rg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>多栏页面的阅读顺序是否正确；</span></div></div><div id="f-doxcnexS87wRuMCv1BoVWK7xZrd" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>OCR 是否遗漏整页或大段内容；</span></div></div><div id="f-doxcn70z64xrfr5kc7rX3AhSrwI" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>表格的表头、行列和关键数字是否正确；</span></div></div><div id="f-doxcnBIH3QpD2TQorvHaL4nzB6g" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>原生文字与 OCR 文字是否重复；</span></div></div><div id="f-doxcnTqQ123EfCo5XG5o73uXWdf" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>标记为异常的页面是否已经复核。</span></div></div></div>

<p id="f-doxcnTllsCdmfvFTS2bK0wptU1d"><span>检查通过后，才得到可供后续系统使用的最终文本。</span></p>

<a id="f-doxcnrpaYiayyLpFvdCrnSaaVXc"></a>

###### 讲解视频

<p id="f-doxcn1FPfHa0Oi6uhCCWm1FOc8e"><span><span><a href="https://www.bilibili.com/video/BV1gF8Z6WEGW/?spm_id_from=333.1387.homepage.video_card.click&amp;vd_source=144bec9c3f54e465073138bed788be1b"><span>https://www.bilibili.com/video/BV1gF8Z6WEGW/?spm_id_from=333.1387.homepage.video_card.click&amp;vd_source=144bec9c3f54e465073138bed788be1b</span></a></span></span></p>

<a id="f-doxcnkq9ZaSj6JxrEd5ZPmLkxxc"></a>

##### 切割

<ol start="1"><li id="f-doxcnzY3jXquhdb13NOFnwJeShe"><span>即使你没有RAG切块方面的前置知识基础，你看了本节对应的讲解视频，能够理解这些切块的基本思路，不同方法是干什么，选型策略。</span></li></ol>

<ol start="2"><li id="f-doxcnsLjaXdKm5ZcBd2exmuNJtf"><span>结合对应的笔记，能够进一步巩固和背诵相关知识点。</span></li></ol>

<ol start="3"><li id="f-doxcnCtlrwr3JDKWWFvW6XBJBch"><span>结合章节后面的面试真题，彻底让你在面试中，对于RAG切块问题能够胸有成竹。 今本上本小节所有的内容，都是面试考察过的内容，对应着一些面试问题的回答思路，该小节的内容还是值得大家背诵一下的。</span></li></ol>

<a id="f-doxcnMWDxTqQtke9UXXa7msfdEh"></a>

###### 基本概念

<p id="f-doxcn93Hb7j3jGawQxoSU8wzrfV"><span style="font-weight:bold">什么是文档分块</span></p>

<p id="f-doxcnQYTqPMXcsqJdxpsR11Hk5b"><span style="font-weight:bold">文档分块（Chunking）</span><span>是指把一篇长文档拆分成多个较小且相对完整的文本块（Chunk），再分别进行向量化、索引和检索。在 RAG 系统中，分块连接了文档解析、向量检索和大模型生成，是影响召回质量的关键环节。</span></p>

<p id="f-doxcnHkfaSyf5O9162ncHLNohQh"><span>一个理想的 Chunk 应同时满足以下要求：</span></p>

<div style="margin-left:25px"><div id="f-doxcnz4HsuRvrYUJa9fcgB9hJJb" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>长度不超过嵌入模型和大语言模型的输入限制；</span></div></div><div id="f-doxcndbtAgddHq02KXwQqhveKi0" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>块内尽量只表达一个完整、集中的主题；</span></div></div><div id="f-doxcnuiOSL5SbdbX33Ygzy7aPJf" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>脱离原文后仍具有足够的上下文，可以被独立理解；</span></div></div><div id="f-doxcnuzgZslJ0Xgp3n6IA67pxrf" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>保留标题路径、页码、来源和父文档 ID 等元数据，便于追溯原文。</span></div></div></div>

<p id="f-doxcnxCYU5WingOBjBDurUnfKnd"><span style="font-weight:bold">为什么需要分块</span></p>

<p id="f-doxcn04NL9AGy0Cz211QIH8KXBe"><span>第一，</span><span style="font-weight:bold">满足大语言模型的上下文窗口限制</span><span>。直接输入整篇长文档可能超过模型的最大上下文长度。分块后只把与问题相关的内容送入模型，可以控制上下文规模。</span></p>

<p id="f-doxcniqyeLNo0t8TcojSfN6jYWh"><span>第二，</span><span style="font-weight:bold">提高生成上下文的质量</span><span>。召回内容过多、过长会增加 Token 成本，并产生“Lost in the Middle”问题，使真正有用的信息被大量无关内容掩盖。</span></p>

<p id="f-doxcnJp6gZHSP5SM9QE2L739NIg"><span>第三，</span><span style="font-weight:bold">满足嵌入模型的输入限制</span><span>。嵌入模型通常存在最大 Token 数，超出后可能被截断。例如部分 BGE 或 Sentence-Transformers 模型的上限为 512 Tokens，过长文本会造成后半部分语义丢失。</span></p>

<p id="f-doxcn1GMgu7fwwa2WIYi7xdPQxh"><span>第四，</span><span style="font-weight:bold">提高检索精度</span><span>。一个文本块如果同时包含多个主题，其向量表示会被不同语义平均和稀释，用户查询某个细节时不容易准确召回。较小且主题集中的文本块通常更容易与查询匹配。</span></p>

<div id="f-doxcnlLpycrGPIeNh7aJf6uhwgc"><img alt="" decoding="async" height="653" loading="lazy" src="/images/agent-learning/385c836532f848d4e4370964.png" width="1280"/></div>

<a id="f-doxcnwzRrEmSfcx8t4EaJbvCGge"></a>

###### 常见分块策略

<a id="f-doxcnaNVFcrS4Xa9JelSdngwR6g"></a>

###### 固定长度分块

<p id="f-doxcnWidKubO8W5R9cOHORZCnXe"><span style="font-weight:bold">固定长度分块</span><span>按照固定字符数或 Token 数切分文档，并可设置 Overlap，使相邻块保留一部分重复内容。</span></p>

<p id="f-doxcnbB3x8axyfQpYrED7OoA89c"><span>LlamaIndex 中可以使用 </span><span><span><span>TokenTextSplitter</span></span></span><span>：</span></p>

<pre id="f-doxcnHrJVJdj10psLc8FJzvUh9Q"><code>from llama_index.core.node_parser import TokenTextSplitter

splitter = TokenTextSplitter(
    chunk_size=500,
    chunk_overlap=50,
)
nodes = splitter.get_nodes_from_documents(documents)</code></pre>

<p id="f-doxcnwncKtMM8uW20BmbAnKSVcf"><span>例如，将一篇 1500 Tokens 的文档按照 500 Tokens 切分：</span></p>

<pre id="f-doxcnNCgZevfDWnna4HmIvkD24d"><code>输入文档：
[1 ...................................................... 1500 Tokens]

输出：
Chunk 1：[1-----------500]
Chunk 2：                [501--------1000]
Chunk 3：                                  [1001--------1500]</code></pre>

<p id="f-doxcn6qVmpCytFxGlmFXUQck2hc"><span>为了避免关键信息恰好落在两个块的边界，可以让相邻块保留部分重复内容：</span></p>

<pre id="f-doxcnzTAVskZXvXS4KZqdzKFXm0"><code>Chunk 1：[--------------------]
Chunk 2：                [--------------------]
                         ↑ Overlap</code></pre>

<p id="f-doxcnZzckcMR7xw0A9OYRHkq6sd"><span style="font-weight:bold">优点</span><span>：实现简单、速度快、块大小稳定，便于控制索引规模和成本，适合作为快速验证 RAG 流程的基线。</span></p>

<p id="f-doxcnNvNab0CX0gKaxNof6X6zcf"><span style="font-weight:bold">缺点</span><span>：可能从句子或段落中间切断，不理解文档结构和语义；Overlap 过大还会导致索引冗余和重复召回。</span></p>

<p id="f-doxcnmbCibAYZnFMXFBjQaUFYKf"><span style="font-weight:bold">适用场景</span><span>：文本结构不明显、需要快速建立基线、对切分边界要求不高的场景。</span></p>

<a id="f-doxcnIY91oaNRaCLX1iJJzu7cAg"></a>

###### 递归分块

<p id="f-doxcnXwwZuaDToha3zx2BVmRYhd"><span style="font-weight:bold">递归分块</span><span>按照一组从粗到细的分隔符逐级切分。它通常先尝试段落，再尝试句子、标点、空格，最后使用字符或 Token 强制切分作为兜底。</span></p>

<pre id="f-doxcnVMqlHNgQdtWoakJ5c8uhjg"><code>段落 → 换行 → 句子 → 标点 → 空格 → 字符或 Token</code></pre>

<p id="f-doxcnqavOuZ0VPZgnzk8c5RniPg"><span>LlamaIndex 中可以使用 </span><span><span><span>SentenceSplitter</span></span></span><span>：</span></p>

<pre id="f-doxcnjC1e4yXVkROkslDKBYE0Ig"><code>from llama_index.core.node_parser import SentenceSplitter

splitter = SentenceSplitter(
    chunk_size=500,
    chunk_overlap=50,
)
nodes = splitter.get_nodes_from_documents(documents)</code></pre>

<p id="f-doxcnkGWxXSxM2WMsQaaAfAJsGg"><span>LangChain 中的对应工具是 </span><span><span><span>RecursiveCharacterTextSplitter</span></span></span><span>。两者名称不同，但都具有从自然边界到细粒度边界逐级切分的思想。</span></p>

<p id="f-doxcnQPPslfXgACnbcLUVKNsjrb"><span style="font-weight:bold">递归分块</span><span>的完整过程如下：</span></p>

<ol start="1"><li id="f-doxcnkr5DjOoP3QXolXvdMnt3BL"><span>先按照段落切分；</span></li></ol>

<ol start="2"><li id="f-doxcnXgUt3HHCy6TrsY8mjEhbB9"><span>检查每个片段是否超过 </span><span><span><span>chunk_size</span></span></span><span>；</span></li></ol>

<ol start="3"><li id="f-doxcn9aGgdaXgKJ6p1Zm7lw3N8g"><span>如果某个段落仍然太长，再按照句子切分；</span></li></ol>

<ol start="4"><li id="f-doxcnZvB5brvToU2mkGxWt63fpe"><span>如果句子仍然太长，再按照标点、空格等更细的边界切分；</span></li></ol>

<ol start="5"><li id="f-doxcnftB58gqQkqWgLmfdt7pVCg"><span>最后使用字符或 Token 强制切分作为兜底；</span></li></ol>

<ol start="6"><li id="f-doxcnJNIRxFBihcxbSfp4OAww1o"><span>将较小片段重新合并成接近目标长度的 Chunk，并保留适量 Overlap。</span></li></ol>

<pre id="f-doxcnT7aIwYfDIBLaJIJULkyCTc"><code>输入：一篇长文档
        ↓ 按段落切
  [段落 A] [超长段落 B] [段落 C]
                  ↓ 按句子继续切
           [句 1] [句 2] [超长句 3]
                              ↓ 按标点或字符切
                         [片段 3.1] [片段 3.2]</code></pre>

<p id="f-doxcnW9RLfUiGCUaNByuQTZ5tdd"><span>递归分块器本身通常不真正识别标题。标题层级需要由前面的文档解析器提取，再作为结构边界或元数据传给分块器。如果输入没有段落换行和正常标点，递归分块仍能运行，但会逐步退化为字符或 Token 级强制切分，只能保证长度不超限，不能保证</span><span style="font-weight:bold">语义边界</span><span>正确。</span></p>

<p id="f-doxcnFZENZUHBFmtE5F9ekrqpDe"><span style="font-weight:bold">优点</span><span>：尽量保留段落和句子的完整性；速度快，不需要调用模型；是普通 RAG 项目中最常用的分块方式。</span></p>

<p id="f-doxcnhL4r6yVcN4pmiRRp4lnkPd"><span style="font-weight:bold">缺点</span><span>：依赖文本解析和清洗质量；OCR 错误换行可能造成误切；它并不真正理解标题和主题变化，输入没有正常换行或标点时会退化为固定长度切分。</span></p>

<p id="f-doxcnbm24gg1Wraix2HUKst6RIg"><span style="font-weight:bold">适用场景</span><span>：普通文章、说明书、制度和技术文档，以及已经完成基本清洗的非结构化文本。</span></p>

<div id="f-doxcn1d7sauqUJXlehGOFnYkArb"><img alt="" decoding="async" height="720" loading="lazy" src="/images/agent-learning/186f87b834d507c1f0a2827f.png" width="1280"/></div>

<a id="f-doxcn51Tb2aUgXBUUE4Iidv4v2f"></a>

###### 结构化分块

<p id="f-doxcnUF411gBbtpBtaZ3VvdLQIc"><span style="font-weight:bold">结构化分块</span><span>利用文件本身的组织结构确定边界，而不是只根据长度切分。</span></p>

<ul><li id="f-doxcnbwGICdS2RpBlMbKLFtAjEg"><span style="font-weight:bold">Markdown</span><span>：按照标题、段落和代码块切分；</span></li></ul>

<ul><li id="f-doxcnZUDK5mYZFIckRlHPP9CaEh"><span style="font-weight:bold">HTML</span><span>：按照 </span><span><span><span>h1</span></span></span><span>～</span><span><span><span>h6</span></span></span><span>、</span><span><span><span>p</span></span></span><span>、</span><span><span><span>li</span></span></span><span>、</span><span><span><span>table</span></span></span><span> 等标签切分；</span></li></ul>

<ul><li id="f-doxcnr0A5CPLsYNdEmszEy54E1f"><span style="font-weight:bold">DOCX</span><span>：按照 Heading 样式、段落、列表和表格切分；</span></li></ul>

<ul><li id="f-doxcnuaj4qqx2buEhH6fLWjr2pe"><span style="font-weight:bold">代码</span><span>：按照文件、类、函数和方法切分；</span></li></ul>

<ul><li id="f-doxcnkwcqzM2ZnZn5fTjEkzNoTd"><span style="font-weight:bold">PDF/PPT</span><span>：按照标题、正文、列表、表格、图片和页面区域切分。</span></li></ul>

<p id="f-doxcnIZa0doHqz6oUWIE7zBlw4e"><span>LlamaIndex 提供了 </span><span><span><span>MarkdownNodeParser</span></span></span><span>、</span><span><span><span>HTMLNodeParser</span></span></span><span>、</span><span><span><span>JSONNodeParser</span></span></span><span>、</span><span><span><span>CodeSplitter</span></span></span><span> 等解析器。例如：</span></p>

<pre id="f-doxcnRwUuBf51WfNbKcr5T4Kpaf"><code>from llama_index.core.node_parser import MarkdownNodeParser

parser = MarkdownNodeParser()
nodes = parser.get_nodes_from_documents(documents)</code></pre>

<p id="f-doxcnQo2OW4JMS2UidKTDH63stg"><span style="font-weight:bold">结构化分块</span><span>的典型处理流程如下：</span></p>

<pre id="f-doxcnY4whxAMUBtpKKGXCCSzPkc"><code>原始文件
→ 文档解析或版面分析
→ 识别标题、正文、表格、列表和代码等结构单元
→ 在超长结构单元内部继续递归切分
→ 生成 Chunks，并保存标题路径、页码和来源等元数据</code></pre>

<p id="f-doxcnR0cOhT4bK60WFYWIIQs3Gc"><span>Reader 负责读取和提取文件内容，NodeParser 负责形成最终用于索引的节点。对于复杂 PDF，仅提取纯文本通常无法保留正确阅读顺序，需要结合字号、坐标、页面区域和版面模型识别标题、分栏、表格与图片；扫描 PDF 还需要先进行 OCR。</span></p>

<p id="f-doxcnXb7c0riXALj081hLQNkVJb"><span>如果一个章节仍然过长，可以先按标题进行结构化分块，再在章节内部使用</span><span style="font-weight:bold">递归分块</span><span>。因此，结构化分块和</span><span style="font-weight:bold">递归分块</span><span>经常组合使用。</span></p>

<p id="f-doxcniN60Bo2tt7oNDPfrarPrwc"><span style="font-weight:bold">优点</span><span>：能够保留标题与正文、表头与数据、函数与代码之间的关系，结果更容易引用和追溯。</span></p>

<p id="f-doxcn9zm5z5Tx2GovrSKC3NqFsc"><span style="font-weight:bold">缺点</span><span>：不同文件需要不同解析器；复杂 PDF 需要根据字号、坐标和版面推断结构；解析错误会直接影响后续分块质量。</span></p>

<p id="f-doxcnlbf61VctsTC5zcsGMrOLOb"><span style="font-weight:bold">适用场景</span><span>：Markdown、HTML、Word、代码，以及包含标题、列表和表格的 PDF/PPT。</span></p>

<a id="f-doxcnN5YDgQtaQs1Fm36mw69ESd"></a>

###### 语义分块

<p id="f-doxcnqHa7tpMdaktxavG7gZLoOg"><span style="font-weight:bold">语义分块</span><span>根据主题或语义变化确定边界。常见实现会先切句，再使用嵌入模型计算相邻句子或</span><span style="font-weight:bold">句子窗口</span><span>的语义距离，在语义突变的位置设置断点，并将连续且语义相近的句子合并成一个 Chunk。</span></p>

<p id="f-doxcngC6UGBkYBW4O8dGFiLrNvd"><span>LlamaIndex 中可以使用 </span><span><span><span>SemanticSplitterNodeParser</span></span></span><span>：</span></p>

<pre id="f-doxcnQKn8ro9XkJ75Th0VKb6Pgh"><code>from llama_index.core.node_parser import SemanticSplitterNodeParser

splitter = SemanticSplitterNodeParser(
    embed_model=embed_model,
    breakpoint_percentile_threshold=85,
)
nodes = splitter.get_nodes_from_documents(documents)</code></pre>

<p id="f-doxcnF7NBBqjBIlAwHsPyfURloc"><span>阈值需要根据真实语料调整，数值越低通常越容易产生更多分块。</span><span style="font-weight:bold">语义分块</span><span>仍需设置最大 Token 上限，避免产生过长的 Chunk。</span></p>

<p id="f-doxcnZWSl67kdUrT2fzPm9ZESJf"><span>基于 Embedding 的语义分块通常包含以下步骤：</span></p>

<ol start="1"><li id="f-doxcn1C0Oqybcjmd75VeB8bX8Bb"><span>先把文档切成句子；</span></li></ol>

<ol start="2"><li id="f-doxcnDlwu5xLuUo7UFuvc0ojfuf"><span>为单个句子或</span><span style="font-weight:bold">句子窗口</span><span>生成向量；</span></li></ol>

<ol start="3"><li id="f-doxcnF8wh5ZznKMNMLfExfHKLDh"><span>计算相邻句子的语义相似度或距离；</span></li></ol>

<ol start="4"><li id="f-doxcnqyodF0raAJzR3EfzZvJAPg"><span>在语义差异明显的位置设置断点；</span></li></ol>

<ol start="5"><li id="f-doxcnNtg97PNraYEB5Lguul7hjd"><span>将语义相近的连续句子合并为一个 Chunk；</span></li></ol>

<ol start="6"><li id="f-doxcnrwCYLbnVgbRVzDKVKU0GRc"><span>使用最大 Token 数限制 Chunk 上限。</span></li></ol>

<pre id="f-doxcn0NcTSciejDVLtDQFSo9hnc"><code>句 1 ──相似── 句 2 ──相似── 句 3 ║语义突变║ 句 4 ──相似── 句 5

输出：
Chunk 1：句 1 + 句 2 + 句 3
Chunk 2：句 4 + 句 5</code></pre>

<p id="f-doxcn2KoneN9w8kb9H2BwMk5pZe"><span>语义分块比</span><span style="font-weight:bold">递归分块</span><span>慢，是因为</span><span style="font-weight:bold">递归分块</span><span>主要执行字符串操作，而语义分块需要对大量句子运行嵌入模型、计算相似度，有些算法还需要进行多轮合并。</span></p>

<p id="f-doxcnA1U43jzFepqA8RYxq9guGf"><span style="font-weight:bold">优点</span><span>：块内主题更一致，不完全依赖换行和格式，能够缓解语义在错误位置被切断的问题。</span></p>

<p id="f-doxcnOWeJzVFuob97PbqDklVWWh"><span style="font-weight:bold">缺点</span><span>：需要对大量句子计算 Embedding 和相似度，建库速度较慢；阈值需要实验调整；块大小不固定。</span></p>

<p id="f-doxcnuMcvs98QhgOn65ggpMDF1g"><span style="font-weight:bold">适用场景</span><span>：会议纪要、访谈、长篇报告、OCR 后段落结构不可靠的文本，以及一个自然段中经常包含多个主题的内容。</span></p>

<a id="f-doxcnjNSnYQ9swO5nArf2F5ZP6g"></a>

###### 命题分块

<p id="f-doxcnJntdTs6dBVfLOByZLeggyh"><span style="font-weight:bold">命题分块</span><span>使用大语言模型把原文转换成多条能够独立理解的事实或观点。它可能拆开复合句、补全省略主语、消解代词指代，并进行少量改写，因此不仅是文本切割，也属于内容转换和索引增强。</span></p>

<p id="f-doxcnI7jRDR4y070kv5oXkzvDsg"><span>LlamaIndex 没有像 </span><span><span><span>SentenceSplitter</span></span></span><span> 一样通用的内置</span><span style="font-weight:bold">命题分块</span><span>器。因此，命题提取逻辑需要开发者自己实现，LlamaIndex 主要负责承载节点和建立索引。通常需要自行组合以下流程：</span></p>

<pre id="f-doxcnKsLv6g5MlvwFnZXHr6MRgb"><code>使用 SentenceSplitter 粗切原文
→ 调用 LLM 提取命题列表
→ 每条命题创建一个 TextNode
→ 在 metadata 中保存 parent_id、页码和来源
→ 使用 VectorStoreIndex 建立索引</code></pre>

<p id="f-doxcnewd82sy0fa3LPzi72MRj5c"><span>下面是命题分块的流程伪代码。它用于说明职责划分，并不是可以直接运行的 LlamaIndex 内置 API：</span></p>

<pre id="f-doxcn1jf4980bWw2mKc8R3Zoqne"><code>parent_chunks = sentence_splitter.get_nodes_from_documents(documents)

proposition_nodes = []

for parent_chunk in parent_chunks:
 # 核心步骤需要自己实现：调用 LLM，把原始段落拆成命题列表
    propositions = extract_propositions_with_llm(parent_chunk.text)

 for proposition in propositions:
        proposition_node = create_llamaindex_node(
            text=proposition,
            parent_node=parent_chunk,
        )
        proposition_nodes.append(proposition_node)

index = VectorStoreIndex(proposition_nodes)</code></pre>

<p id="f-doxcnO9zuRZEHUqkUwgWrmm8R18"><span>这里的 </span><span><span><span>extract_propositions_with_llm()</span></span></span><span> 和 </span><span><span><span>create_llamaindex_node()</span></span></span><span> 都是为了说明流程而写的自定义函数名，不是 LlamaIndex 自带方法。前者负责通过 Prompt 和 LLM 提取命题，后者负责把命题包装为 LlamaIndex 节点。</span></p>

<p id="f-doxcnJFsxBOhjQIJdVM2xJcrP9c"><span>其中，“把已经提取出的命题包装成节点”可以使用 LlamaIndex 自带的 </span><span><span><span>TextNode</span></span></span><span>：</span></p>

<pre id="f-doxcnny5yrh4Lsq3LkZ5okEeHYf"><code>from llama_index.core.schema import TextNode

nodes = [
    TextNode(
        text=proposition,
        metadata={
 "parent_id": parent_id,
 "source": source,
 "page": page,
        },
    )
 for proposition in propositions
]</code></pre>

<p id="f-doxcnSsZ9NNPtNbq0LQyxcVlGtc"><span>这段 </span><span><span><span>TextNode</span></span></span><span> 代码本身不负责切分，也不会自动生成命题。它成立的前提是业务代码已经完成以下工作：</span></p>

<div style="margin-left:25px"><div id="f-doxcnaTQp5Ta3Jj2o1hsL6kjLgh" style="display:flex;gap:0.5em"><span style="min-width:1.5em">a.</span><div><span>调用 LLM 分析原始段落；</span></div></div><div id="f-doxcn9EWUVIdl57L6zLpIeO0gjg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">b.</span><div><span>得到 </span><span><span><span>propositions</span></span></span><span> 命题列表；</span></div></div><div id="f-doxcn3hKi9HjnrhsrPIqlQvrbsb" style="display:flex;gap:0.5em"><span style="min-width:1.5em">c.</span><div><span>记录每组命题对应的原始段落 ID；</span></div></div><div id="f-doxcnUzuFs9yVv9TC2ZHj0ke9VN" style="display:flex;gap:0.5em"><span style="min-width:1.5em">d.</span><div><span>再把每条命题保存为 </span><span><span><span>TextNode</span></span></span><span>。</span></div></div></div>

<p id="f-doxcnUm1VqqkTsQyVen15uaKn6d"><span><span><span>text</span></span></span><span> 和 </span><span><span><span>metadata</span></span></span><span> 是 </span><span><span><span>TextNode</span></span></span><span> 提供的字段；</span><span><span><span>parent_id</span></span></span><span>、</span><span><span><span>source</span></span></span><span> 和 </span><span><span><span>page</span></span></span><span> 是项目自定义的 metadata 键，并不是 LlamaIndex 自动生成的属性。如果需要使用 LlamaIndex 原生的父子节点关系，也可以通过节点的 </span><span><span><span>relationships</span></span></span><span> 字段保存父节点关系。</span></p>

<p id="f-doxcnss7BiZVsSLyjQS8PDfaYZe"><span>例如，原文为：</span></p>

<pre id="f-doxcnnf0yQ0ezdqdzl000jRXj7c"><code>张三于 2024 年加入公司，并担任技术负责人。
他此前在 A 公司工作了五年。</code></pre>

<p id="f-doxcnyS2NokHoUw8GGfyHTZvgIf"><span>经过命题转换后可以得到：</span></p>

<pre id="f-doxcnr73z6XzetK6P0bWR6uq7md"><code>1. 张三于 2024 年加入当前公司。
2. 张三担任当前公司的技术负责人。
3. 张三此前在 A 公司工作了五年。</code></pre>

<p id="f-doxcnKk4oLiLfqM4c1ahTkhtk0e"><span>这里不仅拆开了复合句，还把“他”还原成了“张三”，使每条事实脱离原段落后仍能独立参与检索。</span></p>

<p id="f-doxcnXvYT2NyeUQHyv7aI8exZm6"><span>命题文本适合生成向量和参与检索，但不应直接替代原文作为最终事实依据。系统应同时保存命题与原文的映射，回答和引用时通过 </span><span><span><span>parent_id</span></span></span><span> 回到原始段落。</span></p>

<p id="f-doxcnHcRCbGoEeyOlkITRedDcnf"><span>推荐同时保存以下信息：</span></p>

<div style="margin-left:25px"><div id="f-doxcnRpqeXfIXOkNkXlGoC9nS4b" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">命题文本</span><span>：用于生成向量和检索；</span></div></div><div id="f-doxcn3opTPgN6524rl3AMVEQTgb" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">原始段落</span><span>：用于回答、引用和事实核对；</span></div></div><div id="f-doxcn48kSJ5efYWr9FSNxwdCXke" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold"><span><span>parent_id</span></span></span><span>：连接命题与原始段落；</span></div></div><div id="f-doxcnkp6Qqe4ASe94eBzEEy3aqg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">页码和来源</span><span>：用于定位和追溯原文。</span></div></div></div>

<p id="f-doxcnxbyHVRbld9DCnVWXEVzKBc"><span>检索到命题后，再根据 </span><span><span><span>parent_id</span></span></span><span> 找到对应原始段落，并把原文而不是孤立命题交给大模型生成答案。</span></p>

<p id="f-doxcnHlnGuX9crPrI6sQO560sFb"><span style="font-weight:bold">优点</span><span>：每个检索单元只表达一个事实，粒度精细；能够补全指代，适合事实型问答。</span></p>

<p id="f-doxcnsFEn8MVhb3lWnF42q3SPBK"><span style="font-weight:bold">缺点</span><span>：需要调用 LLM，速度慢、成本高；模型可能遗漏、误解或错误改写事实。</span></p>

<p id="f-doxcnBLaICbxmVnICNCohe3PwGf"><span style="font-weight:bold">适用场景</span><span>：事实密集的企业知识库，以及人物、产品属性、事件和关系检索。</span></p>

<a id="f-doxcnrLcOMQyUj9fcR5K6mKJ0nf"></a>

###### 分块选型技巧和原则

<a id="f-doxcnx6tCeMQPX6k0O8galzaDWd"></a>

###### 核心原则：先选主策略，再调分块粒度

<p id="f-doxcnVfJVSjjlPHab4WFbHqigRc"><span>分块选型不是从多种方法中随意挑选，也不是把所有方法同时使用，而是按照一条明确的决策链进行：</span></p>

<pre id="f-doxcnzoCosVAYG9LtO2CEqbLvVg"><code>判断文档是否具有可靠结构
→ 选择主分块策略
→ 根据检索目标调整 Chunk 粒度
→ 使用 Overlap 或上下文扩充解决边界问题
→ 根据召回结果继续调优
→ 通过评测确定最终方案</code></pre>

<p id="f-doxcnzADeKfPrG18WLMxZQNt2Vg"><span>其中，文档结构决定“在哪里切”，检索目标决定“切多大”，Overlap、</span><span style="font-weight:bold">句子窗口</span><span>和父子块决定“切完后如何补充上下文”，评测负责验证整个方案是否有效。几类因素承担的作用不同，不应混为同一级别的选型条件。</span></p>

<div id="f-doxcnf2IfL8WqesQ2GMtZXisVyc"><img alt="" decoding="async" height="720" loading="lazy" src="/images/agent-learning/7089a27c329ef1d860fac8d6.png" width="1280"/></div>

<a id="f-doxcndOy44W3XRjN2HP3uETddhb"></a>

###### 

<a id="f-doxcnJZulINJn4ICk9jqb1t8aud"></a>

###### 第一步：根据文档结构选择主分块策略

<p id="f-doxcngX45xWfjUhqiLcbTH59bp2"><span>首先判断文档是否存在可靠的自然边界。</span></p>

<p id="f-doxcnTNWW9GsNx2Qbpxd48LE0Se"><span>如果文档结构清晰，应优先尊重原始结构：</span></p>

<div style="margin-left:25px"><div id="f-doxcnFSrcYjE9pJoB7qJ9TxpHtf" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">Markdown、HTML、Word</span><span>：先按照标题、章节、段落等结构切分；</span></div></div><div id="f-doxcnaBZpRP81pMYarqexWRAJwc" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">代码</span><span>：按照文件、类、函数和方法切分；</span></div></div><div id="f-doxcnb0wO4oZelEvbMKJi2lRlwg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">PDF/PPT</span><span>：先完成版面解析，再按照标题、正文、列表和表格等结构切分；</span></div></div><div id="f-doxcnhT5jgG52kfIMBVFFidsP3b" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">FAQ、商品资料、人物信息等强结构化数据</span><span>：一条完整记录本身就是一个语义实体，可以直接作为一个 Chunk，不必强行拆分。</span></div></div></div>

<p id="f-doxcniNWlnmvx1Qj9thkQ9JgaIs"><span>如果结构单元仍然过长，再在结构单元内部使用</span><span style="font-weight:bold">递归分块</span><span>。</span></p>

<p id="f-doxcn3Iemdow6VpswP0I2G20tit"><span>如果文档缺少可靠结构，则根据文本质量选择：</span></p>

<div style="margin-left:25px"><div id="f-doxcnmhLZ58hDeuhs8Va5ygQNWb" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">普通文章、说明书、制度</span><span>：使用</span><span style="font-weight:bold">递归分块</span><span>；</span></div></div><div id="f-doxcnF4OUjW1oTYkymGkhQruYTY" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">OCR 错乱、换行不可靠但句子语义仍可识别</span><span>：先清洗文本，再考虑递归分块或</span><span style="font-weight:bold">语义分块</span><span>；</span></div></div><div id="f-doxcn8gxl3LYwLfoC26I7cV0PZg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">会议纪要、访谈、长篇报告等主题频繁变化的文本</span><span>：考虑</span><span style="font-weight:bold">语义分块</span><span>；</span></div></div><div id="f-doxcnuWy76Ve3Fws0PyXMOdXoah" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>事实高度密集，并且需要检索独立人物、属性或关系：考虑</span><span style="font-weight:bold">命题分块</span><span>，同时保留命题与原文的映射。</span></div></div><p id="f-doxcny29bsDfAS0qFtX3Ns6bwcc"><span>因此，</span><span style="font-weight:bold">结构化分块</span><span>、递归分块、语义分块和</span><span style="font-weight:bold">命题分块</span><span>不是简单的优劣关系，而是分别解决不同的数据形态问题。</span></p></div>

<a id="f-doxcnQaivYbOwoLQk1GIVJ861Og"></a>

###### 第二步：根据检索目标确定 Chunk 粒度

<p id="f-doxcndON2dQ3zgeKroxYI8FpiUK"><span>确定主分块策略后，再根据用户问题所需的证据粒度决定 Chunk 大小。</span></p>

<div style="margin-left:25px"><div id="f-doxcnktt4iIru1h44kbJQPWin4c" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">只需要定位相关文档或章节</span><span>：Chunk 可以相对大，以保留完整上下文；</span></div></div><div id="f-doxcn7QE5i9x7KseF4Q0r2rRPdL" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">需要定位具体条款、步骤、句子或事实</span><span>：Chunk 应相对小，以提高</span><span style="font-weight:bold">检索精度</span><span>；</span></div></div><div id="f-doxcnLQ1KwoUoD8O2tsejiLRsqc" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">用户问题通常对应一个完整段落</span><span>：让 Chunk 尽量覆盖一个自然段落或语义单元；</span></div></div><div id="f-doxcndBs4K11bGxfKqcr4SpUw2f" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">一个 Chunk 中经常包含多个主题</span><span>：说明粒度过大，应减小 Chunk，或者使用语义分块寻找主题边界；</span></div></div><div id="f-doxcn7mmnXV4GK3RV7qGF7WBHri" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">检索结果很准确，但回答缺少前后文</span><span>：说明检索粒度合适、生成上下文不足，不应直接增大所有 Chunk，而应使用</span><span style="font-weight:bold">句子窗口</span><span>、父子块或</span><span style="font-weight:bold">层级索引</span><span>扩充上下文。</span></div></div></div>

<p id="f-doxcnLLzaoTbrmYi48itgdfG2lb"><span>理想状态不是 Chunk 越小或越大越好，而是一个 Chunk 尽量对应用户问题所需要的最小完整证据单元。</span></p>

<a id="f-doxcnUknBPRJnrPnH9tT8m4BoAe"></a>

###### 第三步：使用默认方案建立实验基线

<p id="f-doxcnk0SLxxIarFepYoLyWXB7Mf"><span>当项目处于早期阶段，尚未积累足够的真实问题和评测数据时，可以先采用一个低成本、容易解释的基线方案：</span></p>

<pre id="f-doxcnj3VJA5cEBEuXnRANL5A2bg"><code>结构化解析
→ 在超长结构单元内部递归分块
→ 设置有限 Overlap
→ 保存标题、页码和来源等元数据</code></pre>

<p id="f-doxcn0DWHcKx8QAyBVOpqsiaqDd"><span>初始实验可以从约 400～600 Tokens 的 </span><span><span><span>chunk_size</span></span></span><span> 和 10%～20% 的 Overlap 开始。</span></p>

<p id="f-doxcnCIDYQqnh2TLEQe7fCmPhId"><span>默认方案不是最终选型原则，也不与“根据文档类型选择”冲突。它只是在信息不足时提供一个可运行的起点。获得真实召回结果后，仍然要根据文档特点和问题类型进行调整。</span></p>

<a id="f-doxcn5mYEFwyro7F8pEW5iSG0th"></a>

###### 第四步：根据召回问题定向调整

<p id="f-doxcnQTYnZKAAfMpnD06AM7twwe"><span>运行基线方案后，应根据实际问题判断需要修改哪一层，而不是盲目调大或调小 Chunk。</span></p>

<div style="margin-left:25px"><div id="f-doxcnFp1jWCIoABgm4f3oi1or3f" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">正确内容经常召回不到</span><span>：Chunk 可能过大或结构边界不合理，应减小 Chunk、改善结构解析，或调整检索方式；</span></div></div><div id="f-doxcnZTI0HXoNJi2NJoo6HiG5wf" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">已召回正确内容，但上下文不完整</span><span>：适当增加 Overlap，或使用句子窗口、父子块扩充上下文；</span></div></div><div id="f-doxcnjmppofJRBwdcElUyRNkcJe" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">一个 Chunk 中经常存在多个主题</span><span>：减小 Chunk，或改用语义分块；</span></div></div><div id="f-doxcneBbBWLtFhSQZMss1MNYOph" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">Top-K 结果高度重复</span><span>：减少 Overlap，并对召回结果去重；</span></div></div><div id="f-doxcnttVEbcHefInuJhGpEEkXff" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">标题与正文经常分离</span><span>：改善结构解析，并把标题路径写入 Chunk 元数据；</span></div></div><div id="f-doxcn8LMqqh0iN0fosXSEeMfyfb" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">表格问题效果差</span><span>：将表头与数据行绑定，按照完整记录或逻辑区域分块；</span></div></div><div id="f-doxcnN3HH8fDfsuAYF4iuUxRqKf" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">OCR 文档切分混乱</span><span>：先清理页眉页脚、水印和错误换行，再调整分块策略。</span></div></div></div>

<p id="f-doxcnP6jwdayXzM21W7xPzi6Elc"><span>这一步的关键是先定位问题属于“解析错误、边界错误、粒度错误还是上下文不足”，再采取对应措施。</span></p>

<a id="f-doxcnwOM0M9gbukhqsVmx2iUq8d"></a>

###### 第五步：通过评测确定最终方案

<p id="f-doxcnO7bflk5hhqnMBjlOd1Rvkg"><span>不存在适用于所有项目的统一 Chunk Size。最终方案应由真实问题的评测结果决定。</span></p>

<p id="f-doxcn7hqgL3eIGvNkKkRWErrhyg"><span>可以准备一批真实查询，并标注每个问题对应的正确证据，分别测试不同的主策略、Chunk Size 和 Overlap。重点观察：</span></p>

<div style="margin-left:25px"><div id="f-doxcnEDpXKFodl1nvWNKOQ7mDSc" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>正确证据是否出现在 Top-K 中；</span></div></div><div id="f-doxcngOvwbmz7C3qhC1T0K5SdYx" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>正确证据的排序是否靠前；</span></div></div><div id="f-doxcn23SkyHziE8znyfD6Lyd0Kf" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>回答是否得到召回证据支持；</span></div></div><div id="f-doxcn3BNSSAE2SpdzZEoFLsORIg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>页码、章节和来源引用是否正确；</span></div></div><div id="f-doxcnLyEDLyPL3WS4wfSO112lde" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>检索结果的重复率；</span></div></div><div id="f-doxcncKPbRc8syPPc5hisKlBArd" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>平均上下文 Token 数；</span></div></div><div id="f-doxcneHmZhnK94xU5LkHFbZm2Sb" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>索引规模、建库时间和查询延迟。</span></div></div></div>

<p id="f-doxcn8aFbniNRuFtYp58F9EYmTf"><span>最终选择的方案，应是在真实语料和真实问题上，</span><span style="font-weight:bold">检索精度</span><span>、</span><span style="font-weight:bold">上下文完整性</span><span>、成本与延迟之间取得最好平衡的方案。</span></p>

<a id="f-doxcnILnyXQdYhafjqBb5y9rxaf"></a>

###### 常见面试问题

<a id="f-doxcnIuBFE3LVqVf5YZO98xAJ7c"></a>

###### 常见的分块策略有哪些？各自有什么优缺点？

<p id="f-doxcnvfRtjPAP1xSOg0WzcOw0Ig"><span>💡 </span><span style="font-weight:bold">答题思路</span></p>

<p id="f-doxcnTidcJlN4vsfdog3gYyybCg"><span>这个问题并</span><span style="font-weight:bold">不是出自真实面试题</span><span>，而是我为了帮助大家掌握基础知识主动添加的。现实面试中通常不会直接这样问，因为这种问法比较固定，也比较偏向概念背诵。</span></p>

<p id="f-doxcnucMpgattGGTcXX1TgYvoBn"><span>但我仍然把它放在这里，是希望大家能够有意识地记住常见分块策略，以及每种策略的基本原理、优缺点和适用场景。后面可以看到，真实面试中的问题通常会比这道题更深入，例如追问项目为什么选择某种策略、内容跨块怎么办、Chunk Size 如何确定，以及分块效果如何评测。</span></p>

<p id="f-doxcn0tQgZHVKNjndkCCgTI7R0d"><span>这些真实问题虽然问法不同，但回答的思路和出发点仍然来自本题涉及的理论基础。只有先掌握不同分块策略的特点，后面才能根据文档类型和实际问题完成选型与调优。（参考答案有点长，面试可以稍微简化一点）</span></p>

<p id="f-doxcn7u3H4mbRFldTBqm2fE1VbA"><span>📝 </span><span style="font-weight:bold">参考答案</span></p>

<p id="f-doxcnsLHmIQCLfWogmExIAp46db"><span>RAG 中常见的分块策略主要包括</span><span style="font-weight:bold">固定长度分块</span><span>、</span><span style="font-weight:bold">递归分块</span><span>、</span><span style="font-weight:bold">结构化分块</span><span>、</span><span style="font-weight:bold">语义分块</span><span>和</span><span style="font-weight:bold">命题分块</span><span>。</span></p>

<p id="f-doxcnrgbLLmr45RH0lseFfiESOb"><span>第一种是</span><span style="font-weight:bold">固定长度分块</span><span>，也就是按照固定的字符数或 Token 数切分文档。它的优点是实现简单、速度快、块大小稳定，便于控制索引规模和成本；缺点是不理解文档结构和语义，可能把一个完整句子、段落或步骤从中间切断。因此，它适合快速建立基线，或者处理结构不明显且对</span><span style="font-weight:bold">语义边界</span><span>要求不高的文本。</span></p>

<p id="f-doxcndQcfnNP1f61QTI0FKhASgf"><span>第二种是</span><span style="font-weight:bold">递归分块</span><span>。它会按照从粗到细的分隔符逐级尝试切分，例如先按段落，再按换行、句子、标点、空格切分，最后才使用字符或 Token 强制切分。它的优点是速度快、不需要调用模型，并且能尽量保留自然</span><span style="font-weight:bold">语义边界</span><span>；缺点是依赖文本解析和清洗质量，遇到 OCR 错误换行、标点缺失或格式混乱时，仍然可能产生不合理的分块。它是普通文章、说明书和技术文档中最常用的基线方案。</span></p>

<p id="f-doxcno1UBV3mRvIbyIwzYVB2lsf"><span>第三种是</span><span style="font-weight:bold">结构化分块</span><span>，也就是利用文档自身的结构进行切分，例如 Markdown 标题、HTML 标签、Word Heading、代码中的类和函数，以及 PDF 中识别出的标题、正文和表格。它的优点是能够保留标题与正文、表头与数据、函数与代码之间的关系，结果也更容易引用和追溯；缺点是依赖文档解析器，不同文件需要不同的处理方式，复杂 PDF 或扫描件还需要版面分析和 OCR。实际项目中通常先进行结构化分块，如果某个结构单元仍然过长，再在内部使用递归分块。</span></p>

<p id="f-doxcnIBuw1x0jr1bXXnTEpswejh"><span>第四种是</span><span style="font-weight:bold">语义分块</span><span>。它通常先把文档切成句子，再使用 Embedding 计算相邻句子的语义相似度，在主题发生明显变化的位置建立边界。它的优点是块内主题更加集中，不完全依赖换行和格式；缺点是需要额外进行向量计算，建库速度较慢，分块阈值也需要通过实验调整。它适合会议纪要、访谈和主题变化频繁的长文本。</span></p>

<p id="f-doxcnkUyf3JDCSPiEi0L4kIDuhf"><span>第五种是</span><span style="font-weight:bold">命题分块</span><span>。它使用大语言模型把原文转换成多条能够独立理解的事实或观点，例如拆开复合句、补全省略的主语并消解代词指代。它的优点是检索粒度非常精细，适合人物、属性和事实关系检索；缺点是需要调用 LLM，成本和延迟较高，而且模型可能遗漏或错误改写事实。因此，命题不能直接替代原文，通常需要通过 </span><span><span><span>parent_id</span></span></span><span> 保留命题与原始段落的映射。</span></p>

<p id="f-doxcny4qjlx3tRQ509GMXsGJJnf"><span>此外，Overlap、</span><span style="font-weight:bold">句子窗口</span><span>和父子块不完全属于与上述方法并列的主分块策略，而是用于缓解边界信息丢失和上下文不足的辅助机制。Overlap 让相邻 Chunk 保留部分重复内容；</span><span style="font-weight:bold">句子窗口</span><span>和父子块则通过“</span><span style="font-weight:bold">小块检索、大块生成</span><span>”同时兼顾</span><span style="font-weight:bold">检索精度</span><span>和</span><span style="font-weight:bold">上下文完整性</span><span>。</span></p>

<p id="f-doxcnpzMjQzrVDiX8RaKtYuhrvh"><span>总的来说，固定长度分块适合快速建立基线，递归分块适合普通非结构化文本，结构化分块适合结构清晰的文档，语义分块适合主题边界不稳定的文本，命题分块适合高精度事实检索。实际项目中通常不是只使用一种方法，而是先尊重文档结构，再在超长结构单元内部递归切分，并结合有限的 Overlap 或上下文扩充策略。</span></p>

<a id="f-doxcnxszem3uSL6bWK02wYBHoBd"></a>

###### 你的项目中是如何确定分块策略的？

<p id="f-doxcnbwbhoLP64jSQtui5dTXc44"><span>💡 </span><span style="font-weight:bold">答题思路</span></p>

<p id="f-doxcnHp0R48qyWKVLzx9CgOciQf"><span style="font-weight:bold">这道题的理论基础就是 </span><span style="font-weight:bold"><span><span>5.3.3 分块选型技巧和原则</span></span></span><span style="font-weight:bold">。</span><span> 但 </span><span><span><span>5.3.3</span></span></span><span> 讲的是通用方法论，真正回答这道题时，需要把方法论落到自己的项目中，答得具体一些，让面试官能够看出你确实理解项目中的数据、问题和技术取舍，而不是只会背诵几种分块方法。</span></p>

<p id="f-doxcnKPp2X3qfZGhIu514nasP9e"><span style="font-weight:bold">我知道，大部分人在个人项目中不一定会把每一个技术选型都做得如此规范。</span><span> 即使在真实企业项目中，也不是所有选型都会进行非常完整的实验。因此不需要因为自己的项目没有覆盖全部流程而怀疑自己，但需要理解每一步为什么这样设计，并提前结合自己的项目组织答案。</span></p>

<p id="f-doxcnWO1v792FSBupHZD5Kb2KSh"><span style="font-weight:bold">这里需要灵活运用理论和项目表达技巧。</span><span> 所谓“包装”，不是捏造不存在的数据或结果，而是把自己已经做过的方案、遇到的问题、能够解释的取舍，以及后续可以采用的验证方式组织成一条完整逻辑。没有实际执行过的实验，可以表述为后续验证方案，不要把计划说成已经取得的结果。</span></p>

<p id="f-doxcnFsbR6DvVTqxOjUekxLxpad"><span style="font-weight:bold">面试前最好针对自己的文档类型、分块方式、Chunk Size、Overlap、异常情况和评测方法准备一版项目化答案。</span><span> 但也不可能预先准备所有追问。面对新的问题时，需要以扎实的理论基础为底层依据，再结合项目场景灵活分析和随机应变。</span></p>

<p id="f-doxcnIZS33VhAlF14u4On6HsZ6e"><span style="font-weight:bold">下面以“企业内部技术文档知识库”为例组织答案。</span><span> 回答时可以按照一条标准流程展开：先介绍文档特点，再说明如何选择主分块策略，然后解释参数如何建立基线、遇到了什么问题、如何定向调整，最后说明怎样通过评测确定最终方案。 （参考答案有点长，面试可以稍微简化一点）</span></p>

<p id="f-doxcnzowbpGSIVyYFbDsiExFYOQ"><span>📝 </span><span style="font-weight:bold">参考答案</span></p>

<p id="f-doxcnrlZ1vcu8sP5frn85YQxjWx"><span style="font-weight:bold">案例中的是一个企业内部技术文档知识库，主要处理 Markdown、Word 和 PDF 格式的 API 文档、架构设计文档、部署手册和故障复盘。</span><span> 我们没有直接对所有文档使用固定长度切分，而是先分析文档结构和实际查询目标，再选择分块方案。</span></p>

<p id="f-doxcnIWpPYxR4iGcG2fYMyRxRIh"><span style="font-weight:bold">第一步是根据文档结构选择主策略。</span><span> 这类技术文档通常具有比较明确的标题、章节、段落、代码块和接口说明，因此我们先进行结构化解析。Markdown 和 Word 按照标题层级解析；PDF 先转换成能够保留标题和段落关系的结构化文本，同时清理页眉、页脚和错误换行。这样可以避免把不同章节或不同接口的内容混在同一个 Chunk 中。</span></p>

<p id="f-doxcnZ12qVC3G0qa7JyxThXTi5g"><span style="font-weight:bold">但是，只按标题切分还不够，因为有些章节可能非常长。</span><span> 所以在每个结构单元内部，我们继续使用 </span><span style="font-weight:bold">递归分块</span><span>，优先按照段落、换行、句子和标点寻找边界，只有内容仍然超过长度限制时，才使用 Token 长度进行兜底切分。最终采用的是“ </span><span style="font-weight:bold">结构化解析加递归分块</span><span>，而不是单纯固定长度切分。</span></p>

<p id="f-doxcnZmVyzzX3M3JsMPn35oyEwf"><span style="font-weight:bold">第二步是根据检索目标确定粒度。</span><span> 我们的用户通常会查询某个接口的参数、配置项、部署步骤或故障处理方法，需要定位到比较具体的证据，因此 Chunk 不能太大；但技术说明又经常包含前置条件、操作步骤和注意事项，Chunk 太小会导致上下文不完整。因此我们的目标是让一个 Chunk 尽量覆盖一个完整的接口说明、操作步骤或自然段落。</span></p>

<p id="f-doxcnfOyqBZRm3y21RueZzLQgTc"><span style="font-weight:bold">第三步是建立参数基线。</span><span> 项目早期我们先以大约 500 Tokens 的 </span><span><span><span>chunk_size</span></span></span><span> 和 10%～20% 的 </span><span><span><span>chunk_overlap</span></span></span><span> 作为起点，并保留文档 ID、标题路径、页码、Chunk 序号等元数据。500 Tokens 不是最终答案，只是一个兼顾检索粒度、Embedding 输入和上下文成本的初始值。</span></p>

<p id="f-doxcn0D5uczTCw1Xy6Pe9JJKhNd"><span style="font-weight:bold">第四步是根据实际问题进行调整。</span><span> 测试过程中主要发现了两类问题。第一类是接口名称、参数解释和限制条件偶尔落在相邻 Chunk 中，检索命中参数说明后，模型拿不到接口名称或前置条件。对于这种边界问题，我们保留适量 Overlap，并通过 </span><span><span><span>chunk_index</span></span></span><span> 扩充前后相邻块。</span></p>

<p id="f-doxcnHTXu4J5lH65zRt8WU7Ek2d"><span style="font-weight:bold">第二类问题是部分架构文档的单个章节很长，即使递归切分后，一个小块虽然容易检索，但不足以支持完整回答。</span><span> 对于这种情况，我们没有盲目增大所有 Chunk，而是保留父子关系：小的子块负责生成向量和参与检索，命中后再根据 </span><span><span><span>parent_id</span></span></span><span> 返回对应的较大父段落，让系统实现“</span><span style="font-weight:bold">小块检索、大块生成 ”。这样既保留了 检索精度</span><span>，也补充了生成所需的上下文。</span></p>

<p id="f-doxcnpFziTkH6F011JU8B2WP3Lf"><span>我们也评估过 </span><span style="font-weight:bold">语义分块</span><span> 和 </span><span style="font-weight:bold">命题分块</span><span>。** 语义分块 </span><span style="font-weight:bold">需要为大量句子额外计算 Embedding，并且阈值需要针对语料调试；</span><span> 命题分块 </span><span style="font-weight:bold">还需要调用 LLM 对原文进行转换，存在成本和事实改写风险。考虑到我们的技术文档结构比较稳定，</span><span> 结构化解析加递归分块**已经能够解决大部分问题，因此没有把语义分块或命题分块作为默认主链路，只把它们作为特殊文档的候选方案。</span></p>

<p id="f-doxcnCA8Kiuh2CG6qK8CWUvpqUb"><span style="font-weight:bold">最后，分块参数需要通过真实问题验证。</span><span> 我们会准备一批覆盖接口查询、部署步骤、故障原因和配置说明的测试问题，分别比较不同 Chunk Size 和 Overlap 下的 Hit Rate、正确证据排序、</span><span style="font-weight:bold">上下文完整性</span><span>、召回重复率、Token 成本和查询延迟。如果小块方案召回更准确但上下文不足，就优先使用父子块或相邻块扩充；如果大块中经常混入多个主题，就减小 Chunk。最终选择的是评测结果最均衡的方案，而不是直接套用某个固定参数。</span></p>

<p id="f-doxcnLbt8eWwdJM7g1epHwGQdzq"><span style="font-weight:bold">所以，我们的整体选型逻辑可以概括为：先根据技术文档的结构选择“结构化解析加递归分块”，再根据查询目标设置初始粒度，通过 Overlap 和父子块解决边界与上下文问题，最后使用真实问题评测确定最终参数。</span><span> 这个过程中的每一步都有对应的数据特点和问题依据。</span></p>

<a id="f-doxcntrQQAmxR2N1cBikXcwTofd"></a>

###### RAG 的 Chunking 策略如何设计？遇到过哪些问题？如何调整？

<p id="f-doxcngIxqHyJ4LoWKwLLcI2vv2d"><span style="font-style:italic">选自 </span><span><span style="font-style:italic"><a href="/posts/agent-learning-24-interview-review/#f-doxcn4xdf6ZtUuTSfTLjA5ke0uc"><span>宇树科技 Agent 开发二面面试真题</span></a></span></span><span style="font-style:italic">。</span></p>

<p id="f-doxcn9s1RIc397iSPSMUuij9KJg"><span>💡 </span><span style="font-weight:bold">答题思路</span></p>

<p id="f-doxcnDP0C6IxY123zSwiTZxWOdb"><span style="font-weight:bold">这道题比“项目中使用了什么分块策略”更进一步。</span><span> 面试官不仅要听最终方案，还希望看到完整的问题解决过程。建议按照“初始设计—暴露问题—定位原因—定向调整—评测验证”回答。</span></p>

<p id="f-doxcnywMnfwOUl0QatUXoANjfPf"><span style="font-weight:bold">回答时不要只罗列技术名词。</span><span> 每一个调整都要对应一个实际问题，例如语义被切断、一个 Chunk 混入多个主题、召回准确但上下文不足、结果高度重复、标题与正文分离等。这样才能体现自己具备真实的调试和迭代经验。</span></p>

<p id="f-doxcnP4wEbITNSdVv4WTZWfeR5b"><span>📝 </span><span style="font-weight:bold">参考答案</span></p>

<p id="f-doxcnRdJBAMXBw69csMmL3e4Aae"><span style="font-weight:bold">我们的知识库主要处理企业内部技术文档。</span><span> 初始方案是先保留标题和章节结构，再在超长章节内部使用 </span><span style="font-weight:bold">递归分块</span><span>，以 500 Tokens 左右的 Chunk 和约 15% 的 Overlap 建立基线，同时保存标题路径、页码、</span><span><span><span>source_id</span></span></span><span> 和 </span><span><span><span>chunk_index</span></span></span><span>。</span></p>

<p id="f-doxcndo7zr7Y86lSZ558uIQCyud"><span style="font-weight:bold">第一轮测试发现，部分接口名称、参数说明和限制条件被分到相邻 Chunk 中。</span><span> 检索虽然命中了参数说明，但模型不知道它属于哪个接口。我们先改善结构解析，把标题路径补充到每个 Chunk；然后保留适量 Overlap，降低边界信息丢失的概率。</span></p>

<p id="f-doxcnqtkAYKE9AKXxOmUt2rUdmb"><span style="font-weight:bold">第二个问题是小块检索比较准确，但回答复杂部署流程时上下文不够。</span><span> 这个问题不适合简单增大所有 Chunk，因为大块会混入多个主题，降低向量匹配精度。我们给 Chunk 保存父子关系和顺序信息，使用子块检索，命中后根据 </span><span><span><span>parent_id</span></span></span><span> 返回父段落，或者根据 </span><span><span><span>chunk_index</span></span></span><span> 补充前后相邻块，实现“</span><span style="font-weight:bold">小块检索、大块生成</span><span>”。</span></p>

<p id="f-doxcnOvYo2KfaPoSwhN1kFtF0Ve"><span style="font-weight:bold">第三个问题是增加 Overlap 后，Top-K 中经常出现内容高度相似的相邻块。</span><span> 我们把 Overlap 控制在 10%～20%，并在召回后根据来源和文本相似度去重，避免重复内容占满上下文。</span></p>

<p id="f-doxcnbxdzd8I2vbcGW9zfwgfooc"><span style="font-weight:bold">调整过程中，我们不会只看最终答案，而是分别观察正确证据能否进入 Top-K、正确证据的排序、召回重复率、输入 Token 数和查询延迟。</span><span> 通过对比不同 Chunk Size、Overlap 和上下文扩充方案，选择综合效果最好的配置。</span></p>

<p id="f-doxcng4XWRaH5loE0677l70ozLc"><span>整体来说，我们先用 </span><span style="font-weight:bold">结构化解析加递归分块</span><span> 建立基线，再根据边界丢失、上下文不足和重复召回等具体问题，分别使用标题元数据、Overlap、父子块和结果去重进行调整，最后通过真实问题集验证效果。</span></p>

<a id="f-doxcnUMBDmjROY4bTPvJGTExUFg"></a>

###### 手写算法：按照句子边界进行文本分块，避免截断句子

<p id="f-doxcngfLa0KkPCRzAHyeG66W7Lh"><span><span style="font-style:italic"><a href="/posts/agent-learning-24-interview-review/#f-doxcn4xdf6ZtUuTSfTLjA5ke0uc"><span>选自 宇树科技 Agent 开发二面面试真题</span></a></span></span><span style="font-style:italic">。</span></p>

<p id="f-doxcnenERHYZpNQIVS5ME8HL2dh"><span>💡 </span><span style="font-weight:bold">答题思路</span></p>

<p id="f-doxcntohX6GZrbmhiqxXqDeW5ch"><span style="font-weight:bold">就是手撕代码题目，如果以力扣的标准来判断这个题目，这个题算不上一个难题，最多是个中等的题目。</span><span> 不过就是没法像力扣一样，可以期待能碰到原题。</span></p>

<p id="f-doxcnWEu5H7F30JkTNE2ZgkhN5p"><span>📝 </span><span style="font-weight:bold">参考答案</span></p>

<p id="f-doxcnzGLVVRmDhTPzNNymmI4Elb"><span style="font-weight:bold">可以先使用中英文句末标点切句，然后按顺序合并句子。</span><span> 只要加入下一句后不超过最大长度，就继续累加；如果超过，就先保存当前 Chunk，再从下一句开始构建新 Chunk。这样正常情况下不会从句子中间截断。</span></p>

<pre id="f-doxcnc23oHvQOYQaFIHzglAhyMf"><code>import re


def split_by_sentence(text: str, max_length: int = 500) -&gt; list[str]:
    sentences = re.split(r"(?&lt;=[。！？.!?])\s*", text.strip())
    chunks = []
    current = ""for sentence in sentences:
 if not sentence:
 continue# 单个句子已经超过上限，只能使用长度切分兜底if len(sentence) &gt; max_length:
 if current:
                chunks.append(current)
                current = ""for start in range(0, len(sentence), max_length):
                chunks.append(sentence[start:start + max_length])
            continueif len(current) + len(sentence) &lt;= max_length:
            current += sentence
 else:
 if current:
                chunks.append(current)
            current = sentence

 if current:
        chunks.append(current)

 return chunks</code></pre>

<p id="f-doxcny2M1oRlQyFcbPh4yChljRd"><span style="font-weight:bold">这段实现保证普通句子不会被截断，并对超长单句进行了兜底。</span><span> 真实项目中还可以把 </span><span><span><span>len()</span></span></span><span> 替换为 Tokenizer 的计数函数，并进一步处理小数点、英文缩写、代码和列表等特殊情况。</span></p>

<a id="f-doxcnWO0kmRPxDxFQ8qynFpIMLc"></a>

###### 技术文档的相关内容跨越多个 Chunk，应该如何优化？什么时候需要扩充上下文？

<p id="f-doxcns98G9nNEDswjnyl9LwDwde"><span style="font-style:italic">选自 </span><span><span style="font-style:italic"><a href="/posts/agent-learning-24-interview-review/#f-doxcn24LOoBY4eOFpv9ie4CKbsg"><span>2025.11 网龙科技一面面试真题。</span></a></span></span></p>

<p id="f-doxcnlYqR7U1orFI76XWrgD3ZG8"><span>💡 </span><span style="font-weight:bold">答题思路</span></p>

<p id="f-doxcnyDN7Mgv32MuLHkLu4T82ic"><span style="font-weight:bold">这是一组连续追问。</span><span> 第一问考察如何解决跨块问题，第二问考察是否知道上下文扩充的使用条件。回答时先区分“检索不到正确位置”和“已经检索正确但上下文不足”：前者需要调整分块或检索，后者才适合扩充上下文。</span></p>

<p id="f-doxcnDH02yg1pdaZlKzBkIkhL7c"><span>📝 </span><span style="font-weight:bold">参考答案</span></p>

<p id="f-doxcnMPAsTFQgjjabd7qyVM5rjb"><span style="font-weight:bold">技术文档中的接口名称、参数、前置条件和限制说明可能跨越多个 Chunk。</span><span> 我们会先通过结构化解析和 </span><span style="font-weight:bold">递归分块</span><span> 尽量保留自然边界，并设置有限的 Overlap，降低内容在边界处完全断开的风险。</span></p>

<p id="f-doxcn1hcdUzTqfzBsvw7i08aJXc"><span style="font-weight:bold">如果仍然存在跨块问题，我们会给每个 Chunk 保存 </span><span style="font-weight:bold"><span><span>source_id</span></span></span><span style="font-weight:bold">、</span><span style="font-weight:bold"><span><span>chunk_index</span></span></span><span style="font-weight:bold"> 和 </span><span style="font-weight:bold"><span><span>parent_id</span></span></span><span style="font-weight:bold">。</span><span> 检索命中某个子块后，可以根据 </span><span><span><span>chunk_index</span></span></span><span> 补充同一文档中的前后相邻块，或者根据 </span><span><span><span>parent_id</span></span></span><span> 返回包含它的完整父段落。</span></p>

<p id="f-doxcnNWyIb5VgORkcx0RCsrzPib"><span style="font-weight:bold">上下文扩充主要适用于“短文本容易检索，但不足以支持完整回答”的情况。</span><span> 例如，已经准确命中了某个配置参数，但回答还需要它的适用条件和异常说明；或者命中了流程中的一个步骤，但问题要求解释完整流程。这时适合采用小块检索、相邻块或父块扩充。</span></p>

<p id="f-doxcnLYfRe8TjcAdfbJp7owb3Fe"><span>如果正确内容根本没有进入 Top-K，直接扩充上下文没有意义，应先检查 Chunk 是否过大、</span><span style="font-weight:bold">语义边界</span><span> 是否错误、查询表达是否需要改写，以及检索策略是否合适。扩充时还要限制同源范围、扩充数量和总 Token 预算，并进行去重，防止引入过多无关内容。</span></p>

<a id="f-doxcnjUB5th2N0jAOKzhMz5BKac"></a>

###### 你的文档分块会使用滑动窗口吗？滑窗长度一般是多少？

<p id="f-doxcnzxQKa9XkaOIPJuTScLvWie"><span style="font-style:italic">选自</span><span><span style="font-style:italic"><a href="/posts/agent-learning-24-interview-review/#f-doxcn24LOoBY4eOFpv9ie4CKbsg"><span> 2025.11 网龙科技一面面试真题。</span></a></span></span></p>

<p id="f-doxcnBICCgRScew6ecbnH7Vpmwf"><span>💡 </span><span style="font-weight:bold">答题思路</span></p>

<p id="f-doxcnmQ9eZiBVJq5CHUtLTc483e"><span style="font-weight:bold">面试语境中的“滑窗长度”通常是在追问相邻 Chunk 的重叠长度，也就是 </span><span style="font-weight:bold"><span><span>chunk_overlap</span></span></span><span style="font-weight:bold">。</span><span> 回答时最好同时说明窗口大小、滑动步长和 Overlap 的关系，并区分严格的固定滑窗与 </span><span style="font-weight:bold">递归分块</span><span> 中的重叠机制。</span></p>

<p id="f-doxcnGahhauFWF3OYOPoVwwZI2b"><span>📝 </span><span style="font-weight:bold">参考答案</span></p>

<p id="f-doxcncSzc7siJ4PFPE9NBkkDgCg"><span>我们使用 </span><span style="font-weight:bold">递归分块</span><span>，并为相邻 Chunk 设置了重叠区域。严格来说，它不是完全按照固定步长进行机械滑窗，而是优先在段落、句子和标点等自然边界切分，然后保留适量 </span><span><span><span>chunk_overlap</span></span></span><span>。</span></p>

<p id="f-doxcnOeM2694sVrGvLWicHp0Cxc"><span style="font-weight:bold">在严格的固定滑窗中，窗口大小就是 </span><span style="font-weight:bold"><span><span>chunk_size</span></span></span><span style="font-weight:bold">，相邻窗口重复的长度是 </span><span style="font-weight:bold"><span><span>chunk_overlap</span></span></span><span style="font-weight:bold">，滑动步长等于 </span><span style="font-weight:bold"><span><span>chunk_size - chunk_overlap</span></span></span><span style="font-weight:bold">。</span><span> 例如窗口大小为 500 Tokens、Overlap 为 100 Tokens，那么每次向后移动约 400 Tokens。</span></p>

<p id="f-doxcnPZn3u1uOK2nyqxcoXjN00e"><span style="font-weight:bold">项目中通常可以先把 Overlap 设置为 Chunk Size 的 10%～20%。</span><span> 设置重叠是为了避免接口名、条件或半句话恰好落在边界处而丢失；但 Overlap 过大会增加索引规模，并导致 Top-K 结果高度重复。因此最终比例需要结合边界信息丢失率、召回重复率和 Token 成本进行调整。</span></p>

<a id="f-doxcnj3FVa455lQJ2TOvgJUq7Ef"></a>

###### 你的系统中有没有使用更高级的召回或分块方案？

<p id="f-doxcniymtU7C1mY0QYK9oPJbzwK"><span style="font-style:italic">选自 </span><span><span style="font-style:italic"><a href="/posts/agent-learning-24-interview-review/#f-doxcn24LOoBY4eOFpv9ie4CKbsg"><span>2025.11 网龙科技一面面试真题。</span></a></span></span></p>

<p id="f-doxcnEK4mUScSrUiDO6Mgvaiq7b"><span>💡 </span><span style="font-weight:bold">答题思路</span></p>

<p id="f-doxcn23QvYbOY7Y1gsJEBRi9Zne"><span style="font-weight:bold">虽然面试官问有没有更高级的技巧，但是建议也不要特别盲目地说或者编造。</span><span> 实在不行就讲我们的策略是基于这个科学的方法论驱动的，把这个5.3.3 的方法论再讲一遍。如果想要将一些高级的技巧，比如说根据子块检索，召回父块这些策略，一定要找到明确的需求出发点，说明选择这个技术是合理的。能现场包装当然是更好的，但是如果包装露馅无法自圆其说，还不如不包装。我当时估计回答的就是没有，最后也通过了，面试官对我评价还挺高的，有可能这个也是压力测试，不要因为面试官这么追问就盲目现场包装，然后露馅，反而得不偿失。</span></p>

<p id="f-doxcnVa6fKd3OxlJMlCdCdO6Vhb"><span>📝 </span><span style="font-weight:bold">参考答案</span></p>

<p id="f-doxcnbQJwywtCnYN3WJpjAg5EIg"><span>我们的默认主链路仍然是 </span><span style="font-weight:bold">结构化解析加递归分块</span><span>，因为企业技术文档结构比较稳定，这套方案成本低、速度快，也容易解释和调试。在此基础上，我们针对不同问题设计了几种增强方式。</span></p>

<p id="f-doxcn9yCjMNdt4UeyMzB1lCuXdh"><span>对于“小块召回准确但上下文不足”的问题，我们使用 </span><span style="font-weight:bold">父子块检索</span><span>：子块负责 Embedding 和匹配，命中后通过 </span><span><span><span>parent_id</span></span></span><span> 返回完整父段落。对于只需要补充局部上下文的场景，则使用 ** 句子窗口**或 </span><span><span><span>chunk_index</span></span></span><span> 扩充前后相邻内容。</span></p>

<p id="f-doxcnAd4d5dct96d2mxzYp83yHe"><span>对于主题切换频繁、自然段落不可靠的会议纪要，可以评估 </span><span style="font-weight:bold">语义分块</span><span>，根据相邻句子的向量距离确定主题断点。对于事实密集且需要精确检索人物、属性和关系的数据，可以评估 ** 命题分块**，但需要保留命题与原文映射，避免把 LLM 改写结果直接作为事实依据。</span></p>

<p id="f-doxcnW59xPnGFkGuAAgjTVkA5ih"><span>此外，还可以建立 </span><span style="font-weight:bold">层级索引</span><span>：先定位文档或章节，再在命中的范围内进行细粒度检索。这样可以减少跨文档噪声。是否启用这些方案，要根据错误案例和评测结果决定，而不是把所有策略同时堆到系统中。</span></p>

<a id="f-doxcnAFawTk7ZKjs1FUYEqgT7Og"></a>

###### Embedding 切 Chunk 应该怎么做？为什么固定长度切分经常不够？

<p id="f-doxcnMUIUov6c3u67Pp3WD5O8Sh"><span style="font-style:italic">选自 </span><span><span style="font-style:italic"><a href="/posts/agent-learning-24-interview-review/#f-doxcnEzp8GDSc3cwzZgNbPWBXDd"><span>202604 腾讯 AI Agent 开发暑期实习面试真题</span></a></span></span><span style="font-style:italic">。</span></p>

<p id="f-doxcnVj7rpErWM7Sk9qoiSAhqdd"><span>💡 </span><span style="font-weight:bold">答题思路</span></p>

<p id="f-doxcnkzl2XGd1dd6cy6KovS7hZk"><span style="font-weight:bold">这是一道由两个基础问题组合而成的复合题，可以先把它拆开，再分别使用前文的知识回答。</span></p>

<p id="f-doxcnJxn5Ik0jQ70UfqLXRYNzNf"><span style="font-weight:bold">第一问“Embedding 切 Chunk 应该怎么做”，本质上是在问“应该如何确定分块策略”，对应 </span><span style="font-weight:bold"><span><span>5.3.3 分块选型技巧和原则</span></span></span><span style="font-weight:bold">。</span><span> 回答时按照完整的选型流程展开：先分析文档结构，选择主分块策略；再根据检索目标确定 Chunk 粒度；然后设置必要的 Overlap 或上下文扩充机制；最后根据召回问题调整，并通过真实问题评测确定最终方案。</span></p>

<p id="f-doxcnu2opToUMi3wc1LRaN2RpPU"><span>第二问“为什么固定长度切分经常不够”，本质上是在问“</span><span style="font-weight:bold">固定长度分块 ** 有什么缺点”，对应 </span><span style="font-weight:bold"><span><span>5.3.2.1 固定长度分块</span></span></span><span style="font-weight:bold">。固定长度切分只保证长度可控，不理解标题、段落、句子和</span><span>语义边界**，因此可能切断完整信息，也可能把多个主题混在同一个 Chunk 中，最终影响 Embedding 表达和召回效果。</span></p>

<p id="f-doxcnytbdH9s1QYQJEdcaJfjsMg"><span style="font-weight:bold">所以这道题不需要单独背一套新答案。</span><span> 先用分块选型方法论回答“应该怎么做”，再用 </span><span style="font-weight:bold">固定长度分块</span><span> 的缺点回答“为什么不够”，最后把两部分串联成“结构或语义优先、长度约束兜底、实验评测定型”的完整结论。</span></p>

<p id="f-doxcn4FzuMZMRwisjO1X9lCCjlh"><span>📝 </span><span style="font-weight:bold">参考答案</span></p>

<p id="f-doxcn0fCbpjDiegqBWWqOowpf1Q"><span style="font-weight:bold">Embedding 切 Chunk 时，我不会只使用固定长度切分，而是先按照分块选型流程确定方案。</span></p>

<p id="f-doxcn3D8mFKwlXzSiHM2x0mMNRg"><span style="font-weight:bold">首先看文档是否具有可靠结构。</span><span> 如果是 FAQ、商品信息或人物资料等强结构化数据，一条完整记录本身就是一个语义实体，可以直接作为一个 Chunk；如果是 Markdown、Word、HTML 或技术文档，则先按照标题、章节和段落进行 </span><span style="font-weight:bold">结构化分块</span><span>，再在过长的结构单元内部使用 ** 递归分块**；如果文本结构不可靠、主题切换又比较频繁，可以进一步评估 ** 语义分块**。</span></p>

<p id="f-doxcnbLVqSnHQbBUhOsqdU8L5th"><span style="font-weight:bold">确定主策略后，还要根据检索目标决定 Chunk 粒度。</span><span> 需要定位具体条款、参数或事实时，Chunk 应相对小；需要回答完整流程或复杂原因时，则需要更多上下文。对于“小块检索准确但上下文不足”的情况，我不会直接增大所有 Chunk，而是通过 Overlap、</span><span style="font-weight:bold">句子窗口 、相邻块扩充或父子块实现“ 小块检索、大块生成</span><span>”。</span></p>

<p id="f-doxcnSVegdi83TQGEpuXDp9En7e"><span style="font-weight:bold">Chunk Size 可以先设置一个实验基线，例如 400～600 Tokens，并设置约 10%～20% 的 Overlap。</span><span> 但这只是起点，最终还要比较不同参数下的 Hit Rate、正确证据排序、召回重复率、上下文 Token 数和查询延迟。</span></p>

<p id="f-doxcnAD3s9SOcfplUblc42mQc4g"><span>固定长度切分之所以经常不够，是因为它只考虑长度，不理解文档结构和 </span><span style="font-weight:bold">语义边界</span><span>。一个定义、操作步骤、接口说明或实体资料可能被从中间切断，使单个 Chunk 只包含残缺语义；也可能把多个不相关主题放进同一个 Chunk，使生成的向量变成多个主题的“平均语义”，降低具体问题的匹配精度。</span></p>

<p id="f-doxcnUBMboHBwPVudkigDDzXXqd"><span style="font-weight:bold">因此，长度应该作为 Chunk 的上限约束和最终兜底，而不应该是唯一的切分依据。</span><span> 更合理的方案是优先保留文档结构和自然语义边界，在必要时设置 Overlap 或扩充上下文，最后通过真实问题评测确定最终分块策略。</span></p>

<a id="f-doxcnew7Nz8WruuTWbUa5IuFQjp"></a>

###### 硬切分在实际场景中有哪些弊端？

<p id="f-doxcnSxSph9NpabkdFy52jntU7f"><span style="font-style:italic">选自 </span><span><span style="font-style:italic"><a href="/posts/agent-learning-24-interview-review/#f-doxcnEzp8GDSc3cwzZgNbPWBXDd"><span>202604 腾讯 AI Agent 开发暑期实习面试真题</span></a></span></span><span style="font-style:italic">。</span></p>

<p id="f-doxcneJFlpMfG3ctwwyG0MSkfZe"><span>💡 </span><span style="font-weight:bold">答题思路</span></p>

<p id="f-doxcnPczGvaRfe10FG8S2Ln8NZe"><span>这道题翻译过来，其实就是在问“</span><span style="font-weight:bold">固定长度分块</span><span> 有什么缺点”，对应前文 </span><span><span><span>5.3.2.1 固定长度分块</span></span></span><span> 中讲过的内容。</span></p>

<p id="f-doxcn6PIcLS1MnRo3vghu7of5wh"><span>面试中遇到这种题目，可以先把它转换成自己已经掌握的基础知识：硬切分只根据字符数、Token 数、页码或行数确定边界，本质上就是没有考虑文档结构和 </span><span style="font-weight:bold">语义边界</span><span> 的固定切分。回答时直接从 </span><span style="font-weight:bold">固定长度分块</span><span> 的缺点展开即可。</span></p>

<p id="f-doxcnyFuz5kWae0gPPYPDT2Hs3b"><span style="font-weight:bold">为了让回答更完整，可以沿着 RAG 链路组织：</span><span> 首先说明它可能破坏标题、段落、句子和完整事实；然后说明残缺语义或多个主题混合会影响 Embedding 表达；接着说明这会降低召回的准确性和稳定性；最后说明系统可能需要使用 Overlap、上下文补全和 Rerank 等后处理进行补救，从而增加成本和复杂度。</span></p>

<p id="f-doxcnNKF450d7yPSanThNtlAfEb"><span>📝 </span><span style="font-weight:bold">参考答案</span></p>

<p id="f-doxcnziw1coi2xpZdIki7ckK4Fc"><span>硬切分最大的问题是破坏 </span><span style="font-weight:bold">语义边界</span><span>。它只按照固定字符数、Token 数、页码或行数切分，不关心标题、段落、句子和逻辑结构，因此可能把一个完整概念、操作步骤、接口说明或实体资料切断。</span></p>

<p id="f-doxcneF4psIk3LEs40zSeGDIw71"><span>第二，</span><span style="font-weight:bold">边界信息容易丢失</span><span>。如果接口名称、错误码、配置项和适用条件落在两个 Chunk 的交界处，两个 Chunk 都可能只包含一部分证据，最终都无法与查询形成足够高的相似度。</span></p>

<p id="f-doxcnVAtvLOb0vIsi6Thofotoye"><span>第三，</span><span style="font-weight:bold">它会影响 Embedding 的语义表示</span><span>。包含半个技术点的 Chunk 表达的是残缺语义；混入多个主题的 Chunk 表达的是被平均后的语义。这会使相关结果和不相关结果之间的相似度差距变小，导致召回不稳定。</span></p>

<p id="f-doxcnIAn5yaL19pH1ToIMr4h2u3"><span>第四，</span><span style="font-weight:bold">硬切分会把问题推给后续链路</span><span>。系统不得不增加 Overlap、相邻块补全、Rerank 或 LLM 重组来修复切分阶段造成的问题，从而增加存储、Token 成本、延迟和调试复杂度。</span></p>

<p id="f-doxcnPilEPclMA45EysODYL9kCg"><span style="font-weight:bold">因此，固定长度可以作为最终兜底和长度上限，但不应成为唯一边界。</span><span> 更常见的做法是优先按照结构、段落和句子切分，无法满足长度约束时才进行强制切分。</span></p>

<a id="f-doxcnZmUv0KOLN44NnHfDwN4uDe"></a>

###### 为什么内部文档需要设置 chunk_size=1000 ？1000 是不是太大了？

<p id="f-doxcnq7siJGF3I2xzSUxp3tzXSb"><span style="font-style:italic">选自 </span><span><span style="font-style:italic"><a href="/posts/agent-learning-23-learning-cases/#f-doxcnz7tm7ZLuUjxSbHJvWQTVpd"><span>RAG 项目面试真题 3.9：某大厂一面</span></a></span></span></p>

<p id="f-doxcnmriaxxHvO5DOhL1sIDYuDb"><span>💡 </span><span style="font-weight:bold">答题思路</span></p>

<p id="f-doxcnVJazVMcSPBkvIEY8pjoTKh"><span style="font-weight:bold">这个问题通常不是面试官凭空提出的。</span><span style="font-weight:bold">这个值是不是太大了？”</span></p>

<p id="f-doxcntVayNYaGBa2UZNSNfo9pEh"><span style="font-weight:bold">这道题仍然可以转换成前文已经讲过的内容。</span><span> 第一部分“为什么设置 1000”，本质上是在考察 **如何确定 Chunk Size </span><span style="font-weight:bold">，应借鉴 </span><span style="font-weight:bold"><span><span>5.3.3 分块选型技巧和原则</span></span></span><span style="font-weight:bold">，按照 “建立参数基线—运行真实问题—观察召回问题—调整参数—通过评测定型” 的 ** 实验驱动</span><span>方法回答。</span></p>

<p id="f-doxcnZQ3gBUbIgfwruB6tGCYvDb"><span>第二部分“1000 是不是太大”，是在考察候选人的 **现场分析和灵活变通能力 </span><span style="font-weight:bold">。不能看到 1000 就直接回答大或不大，而要先确认它的 ** 计量单位、文档语言、自然语义粒度、Embedding 模型输入范围，以及 Top-K 上下文预算</span><span>。</span></p>

<p id="f-doxcnCp9NG0BNtaHoYdPtjYCzId"><span style="font-weight:bold">例如，可以从计量单位、文档语言、 自然语义粒度 、Embedding 模型输入范围、Top-K 上下文预算和实验调优等角度组织理由。 如果 1000 指英文字符，它可能只有约 200～250 Tokens，并不算大；如果是 1000 个中文字符，就需要结合文档段落长度重新解释或调整。</span></p>

<p id="f-doxcnF5VBJBwPpeIcfITyhFfAqh"><span>📝 </span><span style="font-weight:bold">参考答案</span></p>

<p id="f-doxcnxWNRzJlrh6VBv5xHbyliMh"><span>该学习案例中的 </span><span style="font-weight:bold"><span><span>chunk_size=1000</span></span></span><span style="font-weight:bold"> 不是适用于所有文档的固定经验值</span><span>，而是结合当前文档场景建立基线，并通过实际查询逐步调整得到的候选参数。</span></p>

<p id="f-doxcnJGCmawZlMwYhxNxLH690jc"><span>首先需要明确，</span><span style="font-weight:bold">项目中的 1000 指字符，不是 Tokens 。案例使用的长度函数按照字符计数，知识库主要存储英文 API 文档、架构决策记录、Runbook 和故障复盘。 1000 个英文字符通常约为 200～250 Tokens</span><span>，大致对应一个完整的技术段落，所以在这个场景下并不算大。</span></p>

<p id="f-doxcnLMQzWNKtvtHFERoso7bE3c"><span>在分块策略上，我们也不是每到 1000 个字符就强制截断，而是先保留标题和章节结构，再使用 </span><span style="font-weight:bold">递归分块</span><span>，优先在段落、换行和句子边界切分。** 1000 只是单个 Chunk 的长度上限**，实际生成的 Chunk 通常不会全部达到 1000 个字符。</span></p>

<p id="f-doxcnw4Q2jdPWC91zLmCYaYMpth"><span>参数确定采用的是 **实验驱动思路 </span><span style="font-weight:bold">。项目早期先使用 1000 字符建立基线，然后选择多组候选值，例如 ** 600、1000、1500 字符</span><span>，使用同一批接口查询、配置查询、部署步骤和故障排查问题运行完整检索流程。</span></p>

<p id="f-doxcnMgvqNOpX9MDSMf40FE9YMe"><span>对比时主要观察 **正确证据是否进入 Top-K、正确证据的排序、语义完整性、召回重复率、Token 成本和查询延迟 </span><span style="font-weight:bold">。如果 Chunk 太小，接口名称、参数说明和限制条件容易分散到不同块中；如果 Chunk 太大，一个块中又可能混入多个主题，使向量语义被稀释。我们选择的是 ** 在检索精度和上下文完整性之间表现更均衡的参数</span><span>。</span></p>

<p id="f-doxcnr07wH6V83e8z9BK3pv5XPf"><span style="font-weight:bold">从下游窗口预算看，假设一个 Chunk 约 250 Tokens，召回 10 个 Chunk 大约占用 2500 Tokens，不会明显挤压模型的推理和生成空间。</span><span> 相邻块还会设置有限的 Overlap，并通过标题路径、页码和来源元数据保留上下文。</span></p>

<p id="f-doxcnYwGO542LPqCizplLFToYVg"><span>但 </span><span style="font-weight:bold">1000 是否合理高度依赖场景 。如果项目换成中文文档，1000 个中文字符对应的 Token 数会明显增加，也可能跨越多个自然段落，这时我会重新降低 Chunk Size，并使用同一套评测流程重新选型。因此， 1000 不是天然合理，而是在当前英文技术文档、字符计量和评测条件下合理</span><span>。</span></p>

<a id="f-doxcnhNixcsN8ZU5mGLXZnUFmvh"></a>

###### 视频讲解

<p id="f-doxcnSsyod73FdwA66Y920hDsQg"><span><span><a href="https://www.bilibili.com/video/BV1extE6jEHu/?spm_id_from=333.1387.homepage.video_card.click&amp;vd_source=144bec9c3f54e465073138bed788be1b"><span>https://www.bilibili.com/video/BV1extE6jEHu/?spm_id_from=333.1387.homepage.video_card.click&amp;vd_source=144bec9c3f54e465073138bed788be1b</span></a></span></span></p>

<a id="f-doxcnNcElk2KEUsY6OzqGZpcHyb"></a>

##### 召回

<a id="f-doxcnEqaOiqD25SoyhnsbQIVzQc"></a>

###### 召回的常用策略

<p id="f-doxcnhBxxTbHA6Wi8UUlCaj4oQg"><span>RAG系统可以使用</span><span style="font-weight:bold">粗排</span><span> + </span><span style="font-weight:bold">重排</span><span>两个阶段来完成召回。 粗排通常使用</span><span style="font-weight:bold">稠密向量检索模型</span><span>来做</span><span style="font-weight:bold">语义匹配，召回语义相关文档。</span><span>当然也可以再结合</span><span style="font-weight:bold">稀疏向量检索模型</span><span>来补充使用，因为</span><span style="font-weight:bold">稀疏向量检索模型</span><span>更擅长</span><span style="font-weight:bold">捕捉关键信息</span><span>来提高召回效果。</span></p>

<p id="f-doxcnOcmp0GP8smCTC26KFd7Sub"><span>粗排后，可以使用</span><span style="font-weight:bold">交叉编码器</span><span>，比如BERT来对候选文档进行</span><span style="font-weight:bold">深入语义排序</span><span>，提高召回质量。</span></p>

<a id="f-doxcnzOsliFRozUewFJmCnLBypb"></a>

###### 稠密向量和稀疏向量

<p id="f-doxcnzzuZNgq743USFHzV3h3hTd"><span>参考书籍《大模型RAG实战》 第三章文本召回模型</span></p>

<p id="f-doxcn94escpjevalmL7XeXBu7le"><span>RAG系统中的文本向量检索模型大致分成两类：一类是基于</span><span style="font-weight:bold">BERT， GPT等深度学习模型</span><span>的</span><span style="font-weight:bold">稠密向量检索模型</span><span>，另一类是以</span><span style="font-weight:bold">TF-IDF, BM 25 为代表的稀疏向量检索模型。 稠密向量检索模型更擅长提取文本中语义信息</span><span>，</span><span style="font-weight:bold">稀疏向量检索模型更擅长提取关键信息</span><span>。</span></p>

<a id="f-doxcnWKQkoHG73dtpe6zf4kRRHc"></a>

###### 对称检索和非对称检索

<p id="f-doxcnNdMrKP7Hi3Ug9liVCPuhGc"><span>参考书籍《大模型RAG实战》 第三章文本召回模型</span></p>

<p id="f-doxcnTCCqgJg51nSqm8ramF0sac"><span style="font-weight:bold">对称检索是找到相似的句子</span><span>，与向量检索基于计算向量相似度的原理天然匹配，只需要模型具有较强的内容抽象的能力即可。</span></p>

<p id="f-doxcnwo9HzaLoz0odnQcumxB51b"><span style="font-weight:bold">非对称搜索是根据问题召回答案</span><span>，要求模型能够将问题和答案映射到同一空间，而问题和答案通常具有不同的文本结构。并非所有的向量化模型都支持非对称检索，只有经过大量问答数据的模型才能提供支持。</span></p>

<a id="f-doxcnl9f3fAxD82GohmkNMDJcpb"></a>

##### 召回优化策略

<a id="f-doxcn6n09xyKf4L7SWavbBZjdae"></a>

###### 短文本全局信息增强

<p id="f-doxcnFva2m0WX727DQ8rrhclWvb"><span>    因为切块的过程难免会造成全局文本信息的丢失，因此我们为切块后的短文补充其所属的长文本信息。</span></p>

<p id="f-doxcnhbBYFE6LqSf1TYqj2g1mWd"><span>    比如以论文《DAPR: A Benchmark on Document-Aware Passage Retrieval》中提到，我们可以将</span><span style="font-weight:bold">长文本的前三句话， 长文本的标题，长文本的关键词</span><span> 作为全局信息，和切块后的文本一起保存。</span></p>

<a id="f-doxcn3I1q3cDmkRjz4ElNFiHooc"></a>

###### 召回内容上下文扩充

<p id="f-doxcnggnlKJ2ZWjhPQYwmUb2s1b"><span>    在RAG切块的时候，对长文本切块后，可能会有较大的信息损失，因为我们从数据库中召回的通常是短文本。这时我们可以采用召回内容上下文补充的方法：</span><span style="font-weight:bold">召回的是短文本，但是输入LLM处理的是短文本的父文本（长文本）</span><span>。 好处是既</span><span style="font-weight:bold">精准</span><span>（基于短文本匹配），</span><span style="font-weight:bold">又完整</span><span>（基于长文本输入）</span></p>

<p id="f-doxcn2767utCEHXltYLYoMzgtUd"><span>    在Langchain中，我们可以使用</span><span style="font-weight:bold">ParentDocumentRetriever</span><span> 来完成这一功能，它使用了两个分割器，</span><span style="font-weight:bold">Parent_splitter</span><span>和</span><span style="font-weight:bold">child_splitter</span><span>。 前者用于确定在RAG场景下输入到大模型的父文本块的大小，后者确定从向量数据库中召回的子文本块的大小。同时还会存储父子文本块的映射关系。 当使用get_relevant_documents召回时，返回的实际上是父文本的内容。</span></p>

<a id="f-doxcnBAdALOGDfYjVAvtUnMFKad"></a>

###### 文本多向量表示

<p id="f-doxcn7URz6ymbBCaatp78Wrf2ng"><span>     在构建向量数据库的时候，可以使用多种向量来表示同一段文本。比如有一段文本A，我们不仅可以使用完整的A来生成向量，还可以使用它的</span><span style="font-weight:bold">子集</span><span>，</span><span style="font-weight:bold">总结句</span><span>来生成补充向量。当召回任意的补充向量对应的文本后，并不是将其输入大模型中，而是将其对应的文本A输入。</span></p>

<p id="f-doxcnGVvx4G9BXUrVpldxoyi3ff"><span>常见的生成补充向量的方法有：</span></p>

<p id="f-doxcnY5HNmKJsX4KHQGMHYrkVrh"><span style="font-weight:bold">  文本切块: </span><span>将原始文本切块后保存到数据库中，可以在召回时增强对更细粒度的表示。</span></p>

<p id="f-doxcnNEJ346YpOqFujYLs2R32me"><span style="font-weight:bold">文章摘要：</span><span>利用LLM生成摘要。</span></p>

<p id="f-doxcn7yzgiVPTfCM4pEQwvJKZpe"><span style="font-weight:bold">假设性回答：</span><span>可以利用大模型的能力，根据文本提出问题，把问题作为补充信息。这种方法的思想是用问题召回问题会比用问题召回答案更容易。</span></p>

<a id="f-doxcnsoWySTgFsPHidIHKl6Mz0U"></a>

###### 内容查询优化

<p id="f-doxcnOMIlcgsArip09LxxjgmOeb"><span>     很多情况下，用户提出的内容有口语化，语义模糊，无关内容多的问题。 因此直接将问题变成向量可能和用户的真实意图不相关，从而影响RAG场景下的召回效果。因此，我们可以对用户的原始问题进行改写和扩充，再进行召回。</span></p>

<p id="f-doxcnL0PDi7x3s5uhovkT4BAIPc"><span>常见的对原始问题优化的方法有：</span></p>

<p id="f-doxcnJAg4smeLZIplYr3uu1AMBv"><span>1.使用LLM 改写和扩充，比如LangChain提供的MultiQueryRetriever就集成了这个功能。</span></p>

<p id="f-doxcnMY9I4RwThqSp6tuI37qrqd"><span>2.对历史问题进行总结，然后再进行召回，这个特别适用于多轮对话中。比如 </span></p>

<div style="margin-left:25px"><p id="f-doxcn4KQ25keoWfFjKsCmiAgmFh"><span>    用户：中国的首都在哪里？</span></p><p id="f-doxcnUue5v89U2NUHfjsEIfx5Vd"><span>    LLM：北京</span></p><p id="f-doxcnfZmWpDQaivQJdkkO3SrTjf"><span>    用户：那里有哪些好玩的景点？</span></p><p id="f-doxcnIDDjHPxtMoTC0zpRz1YYpb"><span>    这时直接用原来的问题召回显然太模糊，如果用LLM总结后，问题就变成了北京有哪些好玩的景点。</span></p></div>

<a id="f-doxcnQDQZ7Pdw6KHJk26yyWKHlf"></a>

###### 召回文本重排序

<p id="f-doxcnisI0dTE0sSsb1f5EjXHs4g"><span>        在RAG场景下，默认使用的是向量召回，检索效率高。但是由于文本向量化的过程中存在着信息损失，并且在召回过程无法考虑查询用户和候选文本上下文关系，因此召回精度不高。 所以在召回向量后，通常还会进行召回文本的重排序的精筛。</span></p>

<p id="f-doxcn2Upcab6IFWl19sXx8d3buf"><span>最常用的重排序的模型是基于</span><span style="font-weight:bold">Transformer编码器架构的交叉编码器</span><span>。将用户查询和一段候选文本同时输入到模型之中，预测它们之间的相关性分布。使用这种方法可以考虑到用户查询和候选文本的上下文关系，因此有更高的精度。</span></p>

<a id="f-doxcn64jTOlcQVgjANTOjDouaEb"></a>

###### 结合元数据召回

<p id="f-doxcnLGHOb5655n76hFgnZUZayh"><span>在实际场景中，很多情况我们不需要在整个向量数据库中进行召回。如果在存储文本向量的时候同时记录了每个向量相关的标签，就可以在召回时先根据标签信息过滤出所需的向量子集，有利于提高检索速率，避免检索无用的信息。</span></p>

<p id="f-doxcnqeHOaPqEk7XYDV6R8TeXEg"><span>现在的大模型应用框架，Langchain就基于多种向量数据库，集成了元数据写入和召回过滤的能力。我们可以使用</span><span style="font-weight:bold">Langchain的Create_metadata_tagger</span><span>的接口，借助大模型的能力，自动生成元数据。</span></p>

<a id="f-doxcntiIqLdB9yrHLtRNm1BaCrd"></a>

##### 精排

<blockquote id="f-doxcnsziaAI6xUeXh6QC6kxk3ve"><p id="f-doxcntFXnarHq1ol4GgAsoa5Lgh"><span>第四小节的各个部分其实就是RAG最基本的模块和环节。是弄懂RAG的基础，不管是我推荐的书籍还是项目（实战都有），大家结合笔记，书籍，自己搜的资料，把这几个环节理解一下。可以多搜索视频啊，书籍来理解这些基础知识点。这里写得不是很详细，知识概括，方便大家背诵。如果说学习的话，其实可以找我推荐的书籍啊，视频啊，自己也能找。这些都是最基础的东西，网上很多讲解。</span></p></blockquote>

<p id="f-doxcnEuVi4zWHhWrZrbKuKj5fLc"><span>精排是 RAG 检索链路里位于召回之后的一层排序环节。粗排或者向量召回的目标是从大规模语料里快速找出一批候选文档，而精排的目标是对这批候选文档做更细粒度的相关性判断，把真正能回答问题、信息质量更高、业务上更适合进入上下文的内容排到前面。常见的精排方法主要有 Cross Encoder 精排、LLM 精排、规则精排，以及混合精排。它们都不是用来替代召回的，而是在候选集已经比较小的情况下，对候选内容进行二次排序、过滤和质量控制。</span></p>

<p id="f-doxcnLH3yFPEF967XK5mvovfs9d"><span>具体来说，Cross Encoder 会把 query 和每个候选文档拼在一起输入模型，让模型直接判断二者相关性。它的优点是语义匹配能力强，相关性分数比较稳定，适合做通用的语义相关性排序。缺点是每个候选都要单独过模型，延迟和算力成本较高，而且它主要判断语义相关，不一定能很好处理业务规则、字段完整性、时效性、来源可信度这些约束。</span></p>

<p id="f-doxcn4SOeo4S32z1nWX2ueftysf"><span>LLM 精排可以让大模型结合问题、候选文档和业务要求做综合判断。它的优点是解释性强，也能处理复杂意图和多维标准，比如不仅判断相关，还可以判断这段内容能不能支撑最终回答。缺点是成本更高、延迟更高，输出稳定性和可控性也需要额外约束。</span></p>

<p id="f-doxcnL3DNJU8ST0nfzJI0Hwc0rd"><span>规则精排是根据项目里的明确业务目标来打分或过滤，比如优先保留字段完整、标题匹配、时间更新、来源可靠、包含关键实体的内容。它的优点是可解释、成本低、延迟低、容易调试，也更适合把业务经验沉淀到系统里。缺点是语义泛化能力弱，规则覆盖不到的情况容易漏掉。</span></p>

<p id="f-doxcnLpZK7BtGUUuSZodRU4WpOd"><span>混合精排则是把模型相关性和规则约束结合起来。它的优点是效果更均衡，既能利用模型判断语义相关性，也能用规则保证业务可用性。缺点是工程复杂度更高，需要调权重，也需要用评估集持续验证不同策略的收益。</span></p>

<div id="f-doxcnF7rIWJf4LFecV2XxrHZqdb"><img alt="" decoding="async" height="642" loading="lazy" src="/images/agent-learning/e6be0535c30c749949b1275e.png" width="1234"/></div>

<a id="f-doxcn7L77WiK41KvwO2PWMTDZUf"></a>

##### 面试问题精选

<a id="f-doxcnVVrS9bv6v3EVscTXnUC8bh"></a>

###### Embedding 切 Chunk 应该怎么做，为什么固定长度切分经常不够？

<p id="f-doxcnIIRmTQQr2IAcwgdTKjD6Uc"><span style="font-weight:bold">Embedding 切 chunk 不能只按固定长度一刀切，而是要尽量让一个 chunk 对应一个完整的语义单元。</span><span>实际做的时候，我会</span><span style="font-weight:bold">先看文档类型</span><span>：如果是 FAQ这类强结构化数据，本身就是完整实体，就可以一条作为一个 Document，不强行切；如果是技术文档、用户协议、SOP 这类长文本，就用递归切分，优先按标题、段落、句子切，最后才按长度兜底。</span></p>

<p id="f-doxcnax1kJhCB6PYkfp9a7olVmh"><span style="font-weight:bold">chunk 大小也不是拍脑袋，要结合 embedding 模型的输入限制和最佳区间</span><span>，比如很多 BGE / Sentence-Transformers 模型虽然有 512 token 上限，但最佳效果通常在 100-400 token 或几百 token 区间。太短信息不够，太长语义会被稀释。还要设置 10%-20% 的 overlap，避免关键信息刚好落在边界被切断。</span></p>

<p id="f-doxcnx008oTBamySIXGuM5g7qJh"><span style="font-weight:bold">固定长度切分的问题是，它只保证长度，不保证语义完整</span><span>。比如一个定义、一个步骤、一个实体画像可能被切成两半，向量表示就会变成残缺语义；或者一个 chunk 里混了多个主题，embedding 变成“平均语义”，用户问具体问题时反而召回不到。所以更好的做法是“语义优先 + 长度约束 + overlap + 评估验证”，最后用真实 query 的 hit_rate、MRR 来调 chunk size。</span></p>

<p id="f-doxcnZAHV0DaD9tZYsHFeh5cooh"><span>选自202604</span><span><span><a href="/posts/agent-learning-24-interview-review/#f-doxcnEzp8GDSc3cwzZgNbPWBXDd"><span> 腾讯AI Agent开发暑期实习面试</span></a></span></span></p>

<a id="f-doxcnMJgCUhpzn5qlV6c5UPyWBc"></a>

###### 硬切分在实际场景中有哪些弊端？

<p id="f-doxcnZvKOFflUxMS3c49LVjtzMb"><span style="font-weight:bold">硬切分最大的问题是破坏语义边界</span><span>。它通常按固定字符数、固定 token 数、页码或行数切分，不管文本本身的标题、段落、句子和逻辑结构，所以很容易把一个完整概念、一个操作步骤、一个接口说明切断。比如接口文档里本来应该把接口名、参数、错误码、限制条件放在一起，如果硬切分刚好切开，后面检索到的 chunk 就可能只有条件说明，却没有对应的接口上下文。</span></p>

<p id="f-doxcnCqyoUb8sebqtPTgtVUOjAd"><span style="font-weight:bold">第二是边界信息容易丢失</span><span>。版本号、接口名、错误码、配置项、前置条件这类信息，如果刚好落在两个 chunk 的交界处，单个 chunk 里就没有完整证据。检索时可能两个 chunk 都和用户问题“不够像”，最后都排不上来，导致模型拿不到关键上下文。</span></p>

<p id="f-doxcnmCbcpT8L6AMQScoqw2OpYe"><span style="font-weight:bold">第三是会影响 embedding 的语义表达</span><span>。这里不是说硬切分一定导致 chunk 长短不合适，而是说它只保证长度可控，不保证语义完整。一个长度合适的 chunk，如果只包含半个技术点，embedding 表达的就是残缺语义；如果一个 chunk 里混进多个主题，embedding 又会变成“平均语义”。这会导致相关和不相关结果的相似度分数拉不开，召回结果不稳定。</span></p>

<p id="f-doxcnHVrSI6ffaK9OmqtUGnSd4b"><span style="font-weight:bold">第四是增加后处理成本。</span><span>切分阶段如果把段落、步骤、表格说明切碎了，后面可能还要靠 overlap、rerank、LLM 重组、上下文补全去补救。这样不仅增加计算成本和延迟，也会让整个 RAG 链路更难调试。</span></p>

<p id="f-doxcnPlykYO9g38p7oxFkT2ld7d"><span>选自202604</span><span><span><a href="/posts/agent-learning-24-interview-review/#f-doxcnEzp8GDSc3cwzZgNbPWBXDd"><span> 腾讯AI Agent开发暑期实习面试</span></a></span></span></p>

<a id="f-doxcn9BdqwnSKuvdseD5V7yKkmf"></a>

###### 微调（模型训练）vs RAG，如何选择？

<p id="f-doxcnq6j3nkGF5SuxmaOaXry5Wg"><span>可以先区分这个项目的问题到底出在哪里。不是所有效果不好都应该重训练模型，很多时候只是知识没接上、检索没做好、规则没兜住。</span></p>

<p id="f-doxcnWwJeAlX8yOS3FxjfaiPW5g"><span style="font-weight:bold">如果问题主要是知识更新、企业内部资料、产品文档、政策制度、FAQ、接口说明这类外部知识缺失，我更倾向于用 RAG</span><span>。因为这些内容变化快、可追溯性要求高，放进知识库可以随时更新，也方便引用来源。如果为了这些动态知识去微调模型，成本高、更新慢，而且模型还可能记混或者幻觉。</span></p>

<p id="f-doxcnmqWJIp2MijI00ux0CI80vf"><span style="font-weight:bold">如果问题主要是确定性的业务规则，比如权限判断、价格计算、流程状态流转、字段校验、风控规则、格式约束，我不会优先训练模型，而是用规则、代码、工作流或者工具调用来增强。</span><span>因为这些东西要求稳定、可解释、可审计，不能靠模型“猜”。更适合继续做模型重训练的项目，一般是模型的能力模式本身不符合业务需求。比如模型长期不会按某种专业风格回答，不能稳定遵守某种输出格式，对领域术语理解差，分类/抽取/意图识别这类任务在大量样本上都表现不好，或者有大量高质量标注数据可以让模型学到稳定模式。这时候微调才有价值，因为它改变的是模型的行为分布，而不是临时塞几段知识。</span></p>

<p id="f-doxcntQwWuK1oB2YjYqnnJUQ1oc"><span>选自202604</span><span><span><a href="/posts/agent-learning-24-interview-review/#f-doxcnEzp8GDSc3cwzZgNbPWBXDd"><span> 腾讯AI Agent开发暑期实习面试</span></a></span></span></p>

<a id="f-doxcnsjdIIWxDbPSEKI3RQRwcag"></a>

###### RAG 检索相关性差的原因与优化思路？

<p id="f-doxcnq7gtkNoFkkaME9I434uCzb"><span>💡 </span><span style="font-weight:bold">思路：</span><span> 这个题也不难回答，我们的RAG项目中，做了很多操作：</span><span style="font-weight:bold">RRF</span><span>,双路检索，</span><span style="font-weight:bold">Rerank</span><span>, 基于Metadata 过滤答案后筛选，这些做法都是在提高检索内容的相关性。同时我们在RAG知识部分，也讲解了RAG的一些高级策略，也是回答优化方向的点。</span></p>

<p id="f-doxcnUY5ahOeGVA6gR9RQUPleqR"><span>同时我们之前专门讲了</span><span><span style="font-weight:bold"><a href="#f-doxcnuLIexZJT9vCqgUe8Csx1zb"><span>Self-RAG</span></a></span></span><span>技术（因为面试官问如何保证系统生成回答的准确性），这几个技术都是来回答优化思路的出发点。因此即使我们没有专门准备过这个问题，但是可以认为不应该答不出来。如果从这个题目本身来说，我下面给的参考答案，其实有点多了，不过我还是没有删减，因为可以认为这些内容挺有价值的，从相关性差的原因，到如何解决，顺着整个链路把RAG系统串了起来。回答的时候，挑着说，简化着说就好了，我都列出来，是想给大家复习。</span></p>

<p id="f-doxcn4Zvd5NVKQDiwVn6cPIv6jb"><span>📝 </span><span style="font-weight:bold">答案：</span></p>

<p id="f-doxcnfVuGtjq4hrHUAmhDhEEr84"><span>RAG 检索相关性差，通常不是单一环节的问题，我会沿着“</span><span style="font-weight:bold">知识入库、用户查询、候选召回、结果排序</span><span>”这条链路逐层排查。</span></p>

<p id="f-doxcnwu5QZqQ16AXkn9zoq7Myeg"><span style="font-weight:bold">首先是知识入库的问题</span><span>。比如原始文档质量不高、包含大量噪声或重复内容，或者 </span><span style="font-weight:bold">Chunk</span><span> 切得不合理。</span><span style="font-weight:bold">Chunk</span><span> 太大容易混入无关信息，太小又会破坏完整语义；如果标题、章节、时间、文档类型等 </span><span style="font-weight:bold">Metadata</span><span> 没有保留下来，检索时也很难利用这些结构化信息进行过滤。另外，</span><span style="font-weight:bold">Embedding 模型</span><span>如果不适合中文或业务领域，也会导致向量表达不准确。</span></p>

<p id="f-doxcnBcEgqe5m8bLGk0uP2vUhfg"><span>其次是用户 </span><span style="font-weight:bold">Query</span><span> 本身的问题。用户的问题可能很短、存在歧义，或者使用了知识库中没有出现过的表达。对于复杂问题，如果直接把原始 </span><span style="font-weight:bold">Query</span><span> 做一次</span><span style="font-weight:bold">向量检索</span><span>，也可能因为包含多个意图而召回不准。这种情况可以通过 </span><span style="font-weight:bold">Query Rewrite</span><span> 补全上下文，把口语化问题改写成更适合检索的表达；也可以通过 </span><span style="font-weight:bold">Query Decomposition</span><span>，把复杂问题拆成多个子问题分别检索。</span></p>

<p id="f-doxcn0DZcifVyvg8vB0uOiebDEt"><span style="font-weight:bold">在召回阶段</span><span>，我不会只依赖单路</span><span style="font-weight:bold">向量检索</span><span>。</span><span style="font-weight:bold">向量检索</span><span>擅长语义匹配，但对产品编号、专有名词和精确关键词不一定敏感；</span><span style="font-weight:bold">BM25</span><span> 关键词检索正好可以弥补这一点。因此可以采用</span><span style="font-weight:bold">双路混合检索</span><span>，同时执行</span><span style="font-weight:bold">向量检索</span><span>和 </span><span style="font-weight:bold">BM25</span><span>，再使用 </span><span style="font-weight:bold">RRF</span><span> 根据两路结果的排名进行融合。这样既能利用语义相似性，也能保留关键词精确匹配能力，提高候选集的召回率。</span></p>

<p id="f-doxcn2bCVdZGD8gurZbwkiekf0b"><span style="font-weight:bold">如果业务数据带有明确的结构化条件</span><span>，我还会在检索前或检索后使用 </span><span style="font-weight:bold">Metadata 过滤</span><span>。例如，用户查询某个产品最新版本的使用说明，可以先按照产品型号、文档类型、版本和时间进行过滤，再进行</span><span style="font-weight:bold">向量检索</span><span>，避免把其他产品或旧版本的内容送入候选集。这里还需要根据评测结果调整 </span><span style="font-weight:bold">Top-K</span><span>、相似度阈值和索引参数，防止 </span><span style="font-weight:bold">Top-K</span><span> 太小导致漏召回，或者太大引入过多噪声。</span></p>

<p id="f-doxcnjWYTVYQnQTQ4LR2mD1vr6c"><span>召回之后还需要做 </span><span style="font-weight:bold">Rerank</span><span>。向量数据库返回的相似度主要适合快速筛选候选，并不代表排序结果一定最符合用户问题。可以先通过混合检索召回较多候选，再使用 </span><span style="font-weight:bold">Cross-Encoder</span><span> 或专门的 </span><span style="font-weight:bold">Reranker</span><span>，让模型同时理解 </span><span style="font-weight:bold">Query</span><span> 和每个候选 </span><span style="font-weight:bold">Chunk</span><span>，重新计算相关性，最后只把排名靠前的内容交给大模型。整体上就是“</span><span style="font-weight:bold">粗召回保证不漏，精排序减少噪声</span><span>”。</span></p>

<p id="f-doxcnD3VXEauR5B1BoPRcqvL95d"><span>对于复杂场景，还可以引入 </span><span style="font-weight:bold">Self-RAG</span><span> 的反馈机制。模型先判断当前问题是否需要检索，再检查检索内容是否相关、是否足以支持回答；如果证据不足，就改写 </span><span style="font-weight:bold">Query</span><span> 或继续检索，而不是拿着低质量上下文强行生成。生成以后还可以检查回答是否忠实于检索证据，从而减少检索质量问题进一步演变成回答幻觉。</span></p>

<p id="f-doxcnAsjTHdQ6bx6Oqx1jfhurOg"><span>最后，这些优化不能只靠主观观察，还要通过评测集验证。检索阶段可以看 </span><span style="font-weight:bold">Context Precision</span><span>、</span><span style="font-weight:bold">Context Recall</span><span>、</span><span style="font-weight:bold">MRR</span><span>、</span><span style="font-weight:bold">NDCG</span><span> 等指标；生成阶段可以看 </span><span style="font-weight:bold">Faithfulness</span><span> 和答案正确性。同时记录每个失败案例，判断问题究竟出在 </span><span style="font-weight:bold">Chunk</span><span>、Embedding、</span><span style="font-weight:bold">Query</span><span>、召回还是 </span><span style="font-weight:bold">Rerank</span><span>，再针对性调整。</span></p>

<p id="f-doxcnbSrbODe90ncJU6mUNq5m7g"><span>总结来说，我的优化思路是：先提升知识和 </span><span style="font-weight:bold">Chunk</span><span> 质量，再通过 </span><span style="font-weight:bold">Query Rewrite</span><span> 或问题拆解改善查询，使用 </span><span style="font-weight:bold">BM25</span><span> 与</span><span style="font-weight:bold">向量检索</span><span>双路召回、</span><span style="font-weight:bold">RRF</span><span> 融合，通过 </span><span style="font-weight:bold">Metadata</span><span> 缩小范围，再利用 </span><span style="font-weight:bold">Rerank</span><span> 精排；复杂场景下加入 </span><span style="font-weight:bold">Self-RAG</span><span> 的</span><span style="font-weight:bold">检索与反思闭环</span><span>，最后用离线评测指标验证优化效果。</span></p>

<p id="f-doxcndmhGVnq7oyRup0oje2VBSd"><span><span><a href="/posts/agent-learning-24-interview-review/#f-doxcniHdKHXE5xMaoyusgSIUbRc"><span>选自202607 宇树科技一面</span></a></span></span></p>


<a id="section-0100"></a>
## RAG进阶

<a id="f-doxcnRGzQLIPyUYPoChaXrXtFHH"></a>

<p id="f-doxcnlfFOOl8FDuHuJz8qTRcTHf"><span>此部分为RAG进阶部分，如前所述，一般岗位可能不会考察这么深，除非你自己简历写了Graph Rag, Agentic RAG或者本身就是专门做RAG的组，可能会考到这里。 我的原则是，该部分概念要会，问RAG有啥新方向，相关概念答得出来，但没有深入研究。</span></p>

<div style="margin-left:25px"><h4 id="f-doxcnC6s9cWRXdSpqjD7xTwklrg"><span>13.7.1 RAG新方向</span></h4><p id="f-doxcn84NBfgLF3Hi8fQTtcCTqle"><span>（这俩新方向，虽然可能没深入研究，但是得知道，概念要能讲出来）</span></p><p id="f-doxcnXauoRa3YNL0TUCYt9rQ7Nb"><span>目前典型的RAG的新方向是 Agentic RAG和Graph RAG, 具体来讲：</span></p><p id="f-doxcn83csyXawMnqAWxHV7E4z8d"><span style="font-weight:bold">Agentic RAG</span><span>的核心是把RAG从一个固定流水线变成一个有决策能力的Agent。传统RAG就是检索一轮、生成答案、结束了。但很多复杂问题一轮检索根本不够，Agentic RAG让模型自己判断——检索结果够不够？不够就再检索一轮，或者换个检索策略。像Self-RAG、Corrective RAG都是这个思路，本质就是让</span><span style="font-weight:bold">检索过程变得更智能、可以自我纠错</span><span>。</span></p><p id="f-doxcnnp3a1NtUIj6GVhDUW2v9jA"><span style="font-weight:bold">Graph RAG</span><span>解决的是另一个问题——</span><span style="font-weight:bold">传统向量检索擅长找语义相似的内容</span><span>，但很难处理跨文档的关联推理。比如问人物之间的关系，信息散落在十几个段落里，靠embedding相似度很难串起来。Graph RAG的做法是先从文档里抽取实体和关系建成知识图谱，检索时在图上做关系遍历，特别适合需要全局理解的问题。"</span></p><p id="f-doxcnAAcxvO8NEUxARbPMbAYgpc"><span>可以认为这两个方向是互补的——一个解决检索策略的智能化，一个解决知识关联和推理，未来可能会结合起来用。</span></p></div>

<a id="f-doxcnr9uHZ1OE8KA68qqdWWHLe1"></a>

##### RAG与知识图谱

<p id="f-doxcnuwG61pOFfiPWCnq6tjUoTc"><span>（知识图谱也能和RAG结合使用。但是其实对于可能80%的问题，靠高质量的切片和双路召回就能够解决，只有20%的问题，需要跨文件全局关联的硬核需求，值得花200%的精力去建立图谱。总结来说，知识图谱较为复杂，不是每个企业都会用，成本高。也属于进阶路线。 所以如果你没有学好传统的双路召回RAG，先不用来学这个结合图谱的RAG，这里的建议依旧是作为概念，先理解什么是知识图谱，为什么和RAG能结合？优势和劣势是啥？我就只学到这里。如果哪天他变得很火了，考的多了，可以继续学）</span></p>

<div style="margin-left:25px"><h5 id="f-doxcnmJDGhBlDK4PJsvqCCqH2bd"><span>13.7.2.1 什么是知识图谱？</span></h5><p id="f-doxcnVxtjsnAuF1QAn2w71iztch"><span>知识图谱是一种结构化的知识表示形式，通过图模型来描述现实中的实体及其之间的关系：核心包括：</span></p><p id="f-doxcno9jTkUSnz7qBjPBJ6xK2le"><span style="font-weight:bold">节点：</span><span>表示实体或者概念，如'北京'，'小刘'</span></p><p id="f-doxcnZyXBA7cKStrsEaitAYdNyb"><span style="font-weight:bold">边：</span><span>表示实体间的关系，比如'小刘-就职于-阿里'</span></p><p id="f-doxcnY3uUwLbQlXGxVZ6bFYr84e"><span style="font-weight:bold">属性：</span><span>描述节点的额外信息，如'北京-人口-2154万'等。</span></p><p id="f-doxcnRz3LtGRaG3p1pxynw8Fzde"><span>知识图谱通过三元组的形式组织数据，从而构建出一个庞大的网络。</span></p><div id="f-doxcn7Rua1NPABUCprukue5qesf"><img alt="" decoding="async" height="369" loading="lazy" src="/images/agent-learning/06f49a3e34166151a359d828.png" width="685"/></div><h5 id="f-doxcnBOKurtQrZVhBkNNjhVBAab"><span>13.7.2.2 知识图谱在RAG的应用？</span></h5><p id="f-doxcnFp8EsAiaAVSnw4KOqO7JSb"><span>传统的RAG是基于分块，向量召回的思路来对输入数据增强的。但是对于强调跨文档/多文档综合，需要多跳推理/链路关系的时候，可以将知识图谱和RAG结合，即KG-RAG。 它的做法是先用普通语义检索拿到一批chunk，然后把这些chunk映射到知识图谱的实体上，沿着图的边做扩展检索，把原本关联的文本片段补齐成一条/多条与问题相关的关系链，最终把组织起来的片段按图结构交给LLM（简单说，向量召回的结果作为起点，KG扩展把点连成线，再将整合结果送入LLM）</span></p><h5 id="f-doxcnUAborkeMEWuhxw6ScECsYf"><span>13.7.2.3 知识图谱vs普通RAG？</span></h5><p id="f-doxcnRoKZEYHoBYURDAC0Hnhd2e"><span>普通RAG </span><span style="font-weight:bold">落地快，成本低，适合'答案就在某几段文档里'的定位性问题</span><span>，但是它的弱点是需要</span><span style="font-weight:bold">跨多段/多条文档做综合，需要多跳推理和关系链路时</span><span>，他只能拿到碎片，此种场景适合使用KG-RAG, 但是它的缺点是：</span><span style="font-weight:bold">需要抽取/维护实体关系、做图扩展与组织，构建与维护成本更高</span><span>。</span></p></div>

<a id="f-doxcnuLIexZJT9vCqgUe8Csx1zb"></a>

##### Self-RAG

<p id="f-doxcnUDuaWY7Fuif96wGdoFWc3g"><span>Self-RAG, 可以认为是一个还挺有价值的技术。学好这个，对面试的帮助也很明显，当面试官问你：</span><span><span style="font-weight:bold"><a href="/posts/agent-learning-23-learning-cases/#f-doxcncre0k2okUTQXY1bNXXiCUf"><span>如何保证RAG系统生成的答案是准确的？ </span></a></span></span><span>以及 </span><span><span><a href="/posts/agent-learning-24-interview-review/#f-doxcn3hFB3Bob3Fy2FG0uu1Kieh"><span>你的RAG系统中有什么高级技术？可以介绍一下吗（英伟达面试真题）？</span></a></span></span><span> 我们都可以从Self-RAG的角度出发。这两个问题也是真实的面试问题，我也附上了跳转链接。 </span></p>

<p id="f-doxcnvxE1I8DOcGJElZ98qAVQ0b"><span>同时这也确实是一个有价值的事：我们学了RAG的评估方法，比如RAGAS，这个是已经吐出了回答后的检测，有没有办法能够在运行的时候，就能动态检测生成质量，实时调整呢？那么就得靠我们的Self-RAG技术了。</span></p>

<a id="f-doxcny2SYo4UZTiw3AwZmJ6Fx2g"></a>

###### Self-RAG是什么？

<p id="f-doxcnv4hpJk7jx6sWo5vHu6V3yg"><span>Self-RAG（Self-Reflective Retrieval-Augmented Generation，</span><span style="font-weight:bold">自省式检索增强生成</span><span>）是在传统 RAG 基础上加入“自我判断和自我评估”能力的一种 RAG 范式。</span></p>

<p id="f-doxcnErNH7ELUeBfPSt8dMyhczh"><span>传统 RAG 通常采用固定流程：</span></p>

<pre id="f-doxcnwoeGvctrtV1UwPIoc9dVIc"><code>用户问题 → 检索知识 → 生成答案</code></pre>

<p id="f-doxcnzWkkPhXp8TJUN1pPFvzKDf"><span>它存在两个问题：一是无论问题是否需要外部知识都进行检索；二是即使检索到了知识，也不能保证知识与问题相关，更不能保证生成答案严格受到知识支持。</span></p>

<p id="f-doxcnrAabouUYMy4bzCGpOcQ8sc"><span>Self-RAG 将流程改为：</span></p>

<pre id="f-doxcnZ2z8BHuX8MZthvZB4nv0Jc"><code>判断是否需要检索
→ 检查检索内容是否相关
→ 生成候选答案
→ 检查答案是否得到证据支持、是否有用
→ 评分并选择最终答案</code></pre>

<p id="f-doxcnvlraaV1yhrCEHoDwpV6Dgh"><span>因此，Self-RAG 的重点不是简单地增加一次检索，而是让质量评估直接参与检索和生成决策。</span></p>

<p id="f-doxcndfcUubrHchp6clQO6ywD1e"><span>从下图中可以清晰地理解Self-RAG和传统RAG的区别：图片上方是经典的RAG，而Self-RAG就是在上方经典RAG下面引入了自我检查：</span><span style="font-weight:bold">从要不要检索，到输出分数是否达标各个方面检测，及时做出调整或者拒答。</span></p>

<div id="f-doxcnCTJgi41Uq2kdmijiSETlab"><img alt="" decoding="async" height="853" loading="lazy" src="/images/agent-learning/e38e70756fdae64abd6d6ff7.png" width="1280"/></div>

<a id="f-doxcnY3vWpYVFWbHK8it52Qc4Lb"></a>

###### Self-RAG 检测什么？

<p id="f-doxcnU8sEUqcETIwntnr4UQCq3f"><span>经典 Self-RAG 使用四类自省信号：</span></p>

<div style="margin-left:25px"><div id="f-doxcnagycriuCy2x9spA7znG9oh" style="display:flex;gap:0.5em"><span style="min-width:1.5em">a.</span><div><span><span><span>Retrieve</span></span></span><span>：在检索前判断当前问题是否需要检索外部知识。</span></div></div><div id="f-doxcnKgtMKI1fpuEiCw6eTDji9b" style="display:flex;gap:0.5em"><span style="min-width:1.5em">b.</span><div><span><span><span>IsREL</span></span></span><span>：在检索后、生成前判断检索到的文档或 Chunk 是否与问题相关。</span></div></div><div id="f-doxcn0EwbAInSCMRJXulR2YVVgh" style="display:flex;gap:0.5em"><span style="min-width:1.5em">c.</span><div><span><span><span>IsSUP</span></span></span><span>：在生成后判断答案是否得到检索证据支持。</span></div></div><div id="f-doxcnJDLXdw7qo6VpeUjleFJtGe" style="display:flex;gap:0.5em"><span style="min-width:1.5em">d.</span><div><span><span><span>IsUSE</span></span></span><span>：在生成后判断答案是否有用、是否真正解决了用户的问题。</span></div></div></div>

<p id="f-doxcnlLKU9zteCNHWGMEY29fvzg"><span>其中，</span><span><span><span>IsSUP</span></span></span><span> 可以进一步分为完全支持、部分支持和无支持或冲突；</span><span><span><span>IsUSE</span></span></span><span> 通常可以采用分级评分。</span></p>

<a id="f-doxcneO9jRwJtXMoOPwCZzdPQeh"></a>

###### 经典 Self-RAG 如何实现？

<p id="f-doxcn2UWW4wGspufsgNlBIRBqYc"><span>经典 Self-RAG 会把上述判断表示为特殊的“自省 Token”，例如：</span></p>

<pre id="f-doxcnivzGR5r7SmEKDOBuSgxUUh"><code>[Retrieve]
[Relevant]
[Fully Supported]
[Utility:5]</code></pre>

<p id="f-doxcnH6eIkcXkgP6XEFqbPrLwpd"><span>训练阶段先使用 </span><span style="font-weight:bold">Critic 模型为训练样本生成这些评价标签</span><span>，再使用带标签的数据微调 </span><span style="font-weight:bold">Generator</span><span>。完成训练后，Generator 不仅能够生成答案，还能够在适当位置生成自省 Token。</span></p>

<p id="f-doxcnMteKgwRKrBFaWFRDkhA5Ry"><span>推理时，程序读取这些 Token 及其生成概率，以决定是否检索、是否保留某个 Chunk，以及应该选择哪个候选答案。自省 Token 不需要展示给用户，它们相当于模型提供给程序的标准化控制信号。</span></p>

<p id="f-doxcnMbNooZwEVu2v5zGGzYgqCf"><span>简化后的运行过程如下：</span></p>

<pre id="f-doxcnhldoIH3qQjgl1pnBwSOd4c"><code>用户问题
  ↓
Retrieve：需要检索吗？
  ↓
检索多个 Chunk
  ↓
IsREL：逐个判断 Chunk 是否相关
  ↓
使用相关证据生成候选答案
  ↓
IsSUP + IsUSE：评价候选答案
  ↓
选择得分最高的答案并输出</code></pre>

<p id="f-doxcnprWPJ0sv5PVOj2W8Od3wGd"><span>如果要形成更严格的生产级闭环，还可以增加质量阈值：</span><span style="font-weight:bold">答案未达到阈值时，不直接输出，而是重新检索、重新生成或拒答。</span></p>

<a id="f-doxcn0sN21l3aroti1BTKMNwa0f"></a>

###### 用RAGAS 替换传统Self-RAG

<p id="f-doxcnKk3RUGPPrk113zKy4aT6Ng"><span>这一节纯粹是我自己加的。因为我们看到上面的Self-RAG的 自评估方法是要使用专门的模型进行训练的。如果我们要包装，我害怕面试官问你的模型训练的细节，加上该学习案例中做了RAGAS的评估，RAGAS的评估和Self-RAG的三个指标是一样的，干脆我们讲的时候就用RAGAS集成到Self-RAG好了，这样问到我们如何实现的细节，我们更加胸有成竹。</span><span><span><a href="/posts/agent-learning-23-learning-cases/#f-doxcncre0k2okUTQXY1bNXXiCUf"><span>如何保证RAG系统生成的回答是准确的</span></a></span></span><span>，也是用这个思路来组织最终参考答案的。</span></p>

<p id="f-doxcni5rOH8XXELPtn0Ef1Xedjg"><span>我们可以保留 Self-RAG 的"检索—生成—评估—修正"流程，用 RAGAS 作为外部评估器替代模型内部的自省 Token。</span></p>

<p id="f-doxcn6Mjnj6TpHZEDpnTSH99gBg"><span>两者可以近似映射为：</span></p>

<ol start="1"><li id="f-doxcn35eByoDR0RHaKj65h8jISf"><span><span><span>Retrieve</span></span></span><span>：RAGAS 没有直接对应指标，可以使用 LLM 分类器或业务规则判断是否需要检索。</span></li></ol>

<ol start="2"><li id="f-doxcnjFEULzYTmSa94EcR44ufXc"><span><span><span>IsREL</span></span></span><span>：可以使用 Context Relevance 或 Context Precision 判断检索内容是否相关。</span></li></ol>

<ol start="3"><li id="f-doxcnJ8coHq9K5knTKysSEpAE3b"><span><span><span>IsSUP</span></span></span><span>：可以使用 Faithfulness 判断答案是否得到检索上下文支持。</span></li></ol>

<ol start="4"><li id="f-doxcnRQtWQu1PNidIJRQA8RpL5T"><span><span><span>IsUSE</span></span></span><span>：可以使用 Answer Relevancy 判断答案是否解决了问题；有参考答案时，还可以增加 Answer Correctness。</span></li></ol>

<p id="f-doxcnVAzIer7a7SxzFarp3Npmbh"><span>替换后的流程为：</span></p>

<pre id="f-doxcnpJINnkEs1OSlIGbKXQ99Rc"><code>用户问题
  ↓
规则或 LLM 判断是否需要检索
  ↓
检索并生成答案
  ↓
RAGAS 评估上下文相关性、答案忠实度和答案相关性
  ↓
达到阈值 → 输出
未达到阈值 → 过滤噪声、重新检索、重新生成或拒答</code></pre>

<p id="f-doxcnzVtByFK0CsUzrPSBGvDa0e"><span>这种实现并不是原始论文中依靠自省 Token 的经典 Self-RAG，更准确的称呼是“借鉴 Self-RAG 思想、以 RAGAS 为外部评估器的自反思 RAG 工作流”。它不需要重新训练 Self-RAG 模型，更容易接入现有工程，但会增加额外的模型调用、延迟和成本。</span></p>

<a id="f-doxcn7fhsC4UQEy4j2RddawfqMd"></a>

###### 讲解视频


<a id="section-0101"></a>
## RAG场景题

<a id="f-doxcnHV61nDJ12vGVtBqxKyG0rh"></a>

<p id="f-doxcno3Baijrq6lLKzKwBXW9m9d"><span>如果我做 rag 召回的相关内容里，会有人恶意注入了一些错误的信息， 你觉得会影响大模型的生成内容吗？怎么避免？</span></p>

<p id="f-doxcnuineIxVp5HfoNhEXXGObVh"><span>会影响生成内容。 可以认为：</span></p>

<ol start="1"><li id="f-doxcnDTioDZ3ibbxh9zgzcd6kNc"><span>可以限制拿到的数据的来源，只选择可靠的数据源。</span></li></ol>

<ol start="2"><li id="f-doxcn4HfR9M0E9iaH5QTMfWza6f"><span>可以对拿到的数据进行安全性检验，检验是否包含恶意指令</span></li></ol>


<a id="section-0102"></a>
## RAG的趋势探讨

<a id="f-doxcn6O0mAp7YvxwJJSAG5fr1ue"></a>

<p id="f-doxcn9vC4UrsUhFXxLya9LnQDzf"><span>在2026年，我相信大家听过很多论调和讨论：</span><span style="font-weight:bold">RAG已死</span><span>。</span><span style="font-weight:bold">我们现在Agent都不用RAG了</span><span>。包括还有各种面试题：</span><span style="font-weight:bold">为什么ClaudeCode不用RAG了？你设计Agent架构的时候，到底要不要用RAG（</span><span>202606滴滴面试真题）。包括还有一些你和面试官聊天的时候的讨论：</span><span style="font-weight:bold">你如何看待RAG的趋势，你觉得现在还需要不需要RAG？</span></p>

<p id="f-doxcncBy58YqWe5rMTlUsuVtxxh"><span>今天这个小节，我想全面，客观的来帮助大家分析一下这个问题。大家不要背答案，而是真的去理解，去思考，去看看我说的是不是这么一回事？有了自己的思考，对于上面的各种问题的回答其实也是自然而然就知道如何回答了。</span></p>

<p id="f-doxcnKq00XkTkKeseKNTobOOHWh"><span>本文参考的资料为：</span></p>

<ol start="1"><li id="f-doxcncMjHHTXytC8X9gqlRfcs3J"><span style="font-weight:bold">长上下文视角</span><span>——《</span><span><span><a href="https://www.youtube.com/watch?v=UabBYexBD4k&amp;t=35s"><span>Is RAG still needed? Choosing the best approach for LLMs</span></a></span></span><span>》（YT视频）</span></li></ol>

<ol start="2"><li id="f-doxcn7d0q3zxsDBIxVxhdDWla4e"><span style="font-weight:bold">结构化数据视角</span><span>——《</span><span><span><a href="https://www.youtube.com/watch?v=60G93MXT4DI&amp;t=124s"><span>Why the best AI coding tools abandoned RAG (and what they use instead) / Is RAG Dead?</span></a></span></span><span>》（YT视频）</span></li></ol>

<ol start="3"><li id="f-doxcnX2BKfPN8Iw0MxCnUFqJEgd"><span style="font-weight:bold">系统作者视角</span><span>——Boris Cherny(Claude Code 核心作者)在 Latent Space 播客的访谈</span></li></ol>

<ol start="4"><li id="f-doxcn1f5qjJHGGFjkvnNXI2ptoc"><span style="font-weight:bold">Harness 工程视角</span><span>——飞书「大模型笔记」</span><span><span><a href="/posts/agent-learning-20-skills-harness/#f-doxcnoRvBt3HPRP4L6PsFmOBoaf"><span>2.4.1 Retrieval 章节</span></a></span></span><span>(检索工具谱系 + Agentic RAG 实验)</span></li></ol>

<p id="f-doxcnl9hC8IW0f6R3Al48A1HARh"><span>注意，其实我并不是说大家一定要去看对应的视频，为了严谨性我列出来源。笔记已经总结了上面的资料的各个方面的要点，已经是比较全面的了。看懂了笔记和我的视频，可以不用再去专门看上面的视频了。</span></p>

<a id="f-doxcnU2sY90V5jFg97N2PxIMnrc"></a>

##### 背景 - 先把RAG这个词说清楚

<p id="f-doxcnDbM83yXfb0VlAfnN6AgCob"><span style="font-weight:bold">RAG 是什么?</span></p>

<p id="f-doxcn2fYChFHsdPe0vqNhGfv3yh"><span>RAG = </span><span style="font-weight:bold">R</span><span>etrieval </span><span style="font-weight:bold">A</span><span>ugmented </span><span style="font-weight:bold">G</span><span>eneration(检索增强生成)。</span></p>

<p id="f-doxcnzGcJu8syaIVXwXH7xWGQaf"><span>它要解决的是 LLM 的一个根本缺陷:</span><span style="font-weight:bold">模型被冻结在训练时刻</span><span>——它不知道 5 分钟前发生的事,更不知道你的私有数据、内部 wiki、专有代码库。要让模型「知道」这些,就必须解决</span><span style="font-weight:bold">上下文注入(context injection)</span><span>:在正确的时间,把正确的数据放进模型的上下文窗口。</span></p>

<p id="f-doxcnVkwnqe7vKVFhxt0dJa9x6c"><span>经典(传统)RAG 的管线是:</span></p>

<pre id="f-doxcn790B8RWRHpZJOgBc6LrNRc"><code>文档 → 切块(chunking) → embedding 模型编码成向量 → 存入向量数据库
用户提问 → query 向量化 → 语义搜索(semantic search)召回最相关的若干 chunk → 注入上下文窗口 → 生成答案</code></pre>

<p id="f-doxcna6w9YBuO0syhZ1zJUbjFxh"><span style="font-weight:bold">关键澄清:大家吵的RAG 已死,死的是哪个 RAG?</span></p>

<p id="f-doxcnZl4NUOK3wptgJ9cKek5ZSf"><span>这是全篇最重要的区分,不厘清就会全程鸡同鸭讲:</span></p>

<ul><li id="f-doxcnNt8nskJPWRQy5FaJKh9h6g"><span style="font-weight:bold">传统 RAG / 语义搜索</span><span>:指切块 + embedding + 向量库 + 语义召回这套</span><span style="font-weight:bold">具体管线</span><span>。现状是在</span><span style="font-weight:bold">部分场景</span><span>(尤其编程)被替代。</span></li></ul>

<ul><li id="f-doxcnMpkwihuwddLKuoX3cc4o1g"><span style="font-weight:bold">广义 RAG</span><span>:指</span><span style="font-weight:bold">任何</span><span>把外部信息拉进上下文的检索行为(grep、BM25、向量搜索、web 搜索都算)。现状是不可能死,是所有 Agent 的地基。</span></li></ul>

<ul><li id="f-doxcnBRfbs9aE5Ri1NuA7hQXFnf"><span style="font-weight:bold">RAG 的本意</span><span> 就是抓取任何外部信息,拉进 LLM 上下文,增强它的回答。所以广义上,agent 用 grep 翻代码、用工具查数据库,</span><span style="font-weight:bold">本质都是 RAG</span><span>,只是没有向量库那一套。</span></li></ul>

<ul><li id="f-doxcntxfDix33qXWAHa53ocMRFh"><span>网上RAG is dead的暴论,几乎都在偷换概念:用</span><span style="font-weight:bold">传统 RAG 在编程场景被淘汰</span><span>这个局部事实,去论证</span><span style="font-weight:bold">RAG 整体过时</span><span>这个错误结论。</span></li></ul>

<ul><li id="f-doxcnjoJt2mSnCdfE8knqi5opfe"><span>更进一步:</span><span style="font-weight:bold">Agentic RAG(智能体检索)本身仍然是 RAG</span><span>,只是把一次性检索换成了模型自己迭代地、多轮地检索。</span></li></ul>

<blockquote id="f-doxcncKwnD90wyCYh3Bj1g81nGc"><p id="f-doxcnVAU4QdrmtisUXh3rWGy4Kb"><span style="font-weight:bold">一句话定调</span><span>:讨论RAG 是否过时,只有把范围收缩到</span><span style="font-weight:bold">传统的、切块 + 向量库的语义搜索管线</span><span>才有意义。广义 RAG(检索)永远不会过时。</span></p></blockquote>

<div id="f-doxcnjSsGi4jKiRujFhJUgC2TbM"><img alt="" decoding="async" height="853" loading="lazy" src="/images/agent-learning/1b3108c0ad06c81bd2d53f9f.png" width="1280"/></div>

<a id="f-doxcnNQvILJXVT7wweNUjGctsTU"></a>

##### 四个思维点

<p id="f-doxcnMfcD0jykhaCBCZfM7jMdkU"><span>咱们可以先不讨论结论，先从4个方面去思考，我想思考清楚了这四个思维点，那么结论也呼之欲出。</span></p>

<a id="f-doxcnPuMP4jZI5MS5bQwoi3frpg"></a>

###### 大家说的RAG已死，死的是什么？

<ul><li id="f-doxcnQXG8AvcBQLiwbnPGqrWeRv"><span>RAG 已死是一个被 LinkedIn / X 放大的</span><span style="font-weight:bold">伪命题</span><span>。视频作者直言:这个叙事大部分不成立,只是</span><span style="font-weight:bold">在编程这个特定场景</span><span>有一点点为真。</span></li></ul>

<ul><li id="f-doxcnv45sPoFrEjzABptq809jif"><span>Klein 原创者 Nick Pash 甚至把盲目上 RAG 的风气称为</span><span style="font-weight:bold">mind virus(思维病毒)</span><span>:2023–2024 年,只要 agent 需要搜索,大家就无脑套语义相似 + 向量库,严重过度工程化。</span></li></ul>

<ul><li id="f-doxcnrIFwgsL4BUnGmnMp24rOkg"><span>但反过来,把传统 RAG 在编程被淘汰推广成RAG 全面过时,是同一枚硬币的另一面错误。</span></li></ul>

<ul><li id="f-doxcnaF40A8eIF2SYSXJVoJ5APd"><span>Harness 视角给出了最精准的定性:</span><span style="font-weight:bold">Agentic RAG 本身就是 RAG</span><span>,只是把一次检索换成迭代检索。所以从范式上讲,RAG 根本没被取代,而是</span><span style="font-weight:bold">换了形态继续存在</span><span>。</span></li></ul>

<blockquote id="f-doxcnLqcNPPPRLlnJkyXbEm6dHf"><p id="f-doxcn1H9H1sd5WiAzsqI51jec8g"><span style="font-weight:bold">小结</span><span>:与其问RAG 死没死,不如问</span><span style="font-weight:bold">在我的场景里,那套沉重的切块 + 向量库管线还有必要吗?</span><span>——这才是能回答的问题。</span></p></blockquote>

<a id="f-doxcnGcS6liWyN8aPprGo3sZt1g"></a>

###### 数据的结构化程度

<p id="f-doxcnGuIHaGJfuvxtmJo3fxLzee"><span>传统 RAG 唯一真正值钱的超能力,是处理</span><span style="font-weight:bold">自然语言的模糊性</span><span>——找到意思相近但字面不同的内容。判断要不要它,就看你的数据需不需要这个超能力。而数据需不需要,取决于它的</span><span style="font-weight:bold">结构化程度</span><span>。所以先要把结构化和非结构化这两个词说清楚。</span></p>

<p id="f-doxcnL2HNHVImt1Ps8vCBVUnXvR"><span style="font-weight:bold">什么是非结构化数据?</span></p>

<p id="f-doxcnXROssl3KPAvMQPygbKrxHc"><span>指</span><span style="font-weight:bold">没有固定组织形式、以自然语言为主</span><span>的数据——散落在 Google Drive、SharePoint、Confluence、wiki、SQL 里的海量文本。它的三个核心特征:</span></p>

<ol start="1"><li id="f-doxcnlhIR0aMSh0OvPZjB1ExkIb"><span style="font-weight:bold">语言是模糊的</span><span>:同一个意思有无数种表达,同义词、近义词、指代、隐喻满天飞。</span></li></ol>

<ol start="2"><li id="f-doxcnyc7PRPipdkdXr3pBCWR8Ah"><span style="font-weight:bold">靠概念含义而非字面组织</span><span>:你想找的东西,常常和文档里的字面写法对不上——需要按意思相近来找,而不是按字一样来找。</span></li></ol>

<ol start="3"><li id="f-doxcn3cldzvaE4x5stMFOW9tfne"><span style="font-weight:bold">没有天然的导航结构</span><span>:一份文档可能埋在成千上万份文档里,没有文件路径、语法这类现成地图帮你定位。</span></li></ol>

<p id="f-doxcn7w1SsBLXhWWqA5aahBsVIg"><span>这类数据里,你想要的信息可能</span><span style="font-weight:bold">藏在几千甚至几百万份文档中</span><span>,而且</span><span style="font-weight:bold">字面上根本没出现你搜的词</span><span>。要跨同义词、跨概念把它们捞出来,就必须靠 embedding 捕捉语义相似。</span><span style="font-weight:bold">这正是传统 RAG 不可替代的场景。</span></p>

<p id="f-doxcncOVAEsE3bQAQu86sMvHSIc"><span style="font-weight:bold">什么是结构化数据?</span></p>

<p id="f-doxcnSmmYt3eW20t643woxPMdEH"><span>指</span><span style="font-weight:bold">有精确语法、精确标识符、且自带组织结构</span><span>的数据,代码是最典型的例子。它的三个核心特征:</span></p>

<ol start="1"><li id="f-doxcnNG6vvRep5k043qjkiPZy7c"><span style="font-weight:bold">拼写/标识符是精确的</span><span>:能正常运行的代码,函数名、变量名一定拼写精确——</span><span><span><span>getUserProfile</span></span></span><span> 全项目就叫这个,不存在另一种说法。</span></li></ol>

<ol start="2"><li id="f-doxcnE4S10TP9wadoPrrJtIqUCd"><span style="font-weight:bold">不依赖语义近似</span><span>:你要找的东西字面就是确定的,不需要靠同义词或概念含义去猜,关键词/正则(grep、ripgrep)就能精确命中。</span></li></ol>

<ol start="3"><li id="f-doxcnXv7Cn83iVjmoUJ2WPCgkI0"><span style="font-weight:bold">自带导航结构</span><span>:文件夹、路径、架构本身就是现成地图,agent 用文件导航工具逐层 hone in 即可,不需要语义帮它理解大概在讲什么。</span></li></ol>

<p id="f-doxcnfzaL9jAmjIRfNeeZd56yJe"><span>这类数据用精确匹配又快又准,再套一层语义搜索反而更不准、还多一堆维护负担。</span><span style="font-weight:bold">所以结构化数据不用 RAG。</span></p>

<p id="f-doxcnHBUxySbJywEvRlD9SvX94d"><span>两类数据的选型对比如下:</span></p>

<ul><li id="f-doxcn7toKPv9W3OwlQgr8PKn7Dg"><span style="font-weight:bold">非结构化数据</span><span>:特征是自然语言、模糊有歧义,同义词/指代多,靠概念含义组织,无天然导航结构,信息埋在海量文档里。</span><span style="font-weight:bold">该用传统 RAG(语义搜索)</span><span>——因为靠 embedding 捕捉概念相似,才能跨同义词、跨字面把埋藏的内容召回。</span></li></ul>

<ul><li id="f-doxcn5OQIzCC3TREG9tNJKiHlIb"><span style="font-weight:bold">结构化数据</span><span>:特征是精确标识符、语法确定,字面即确定、无需猜意思,自带文件/路径/架构结构。</span><span style="font-weight:bold">不用 RAG,用 grep / 文件导航</span><span>——因为字面就是确定的,精确匹配又快又准,再上语义反而更差且要维护索引。</span></li></ul>

<p id="f-doxcnw9cruwur4V02OSlcl3bXXe"><span style="font-weight:bold">经典例子——川菜</span><span>:在知识库里搜川菜有哪些,库里那几段可能只写了麻婆豆腐,花椒配辣椒,麻辣鲜香,</span><span style="font-weight:bold">完全没有出现川菜两个字</span><span>。关键词搜索按字面逐字匹配,搜川菜根本匹配不到这些段落,一条都召回不了;只有靠 embedding 的语义相似,才能认出麻婆豆腐，水煮鱼在意思上就是川菜,把这些段落召回。这就是非结构化数据离不开 RAG 的原因。</span></p>

<div id="f-doxcnrKqY5GX1DWxR8aw9QtQ08e"><img alt="" decoding="async" height="240" loading="lazy" src="/images/agent-learning/48aa4210b760a1e76fcc5861.png" width="360"/></div>

<p id="f-doxcnE1lf7hpxSG9lrRuooRngif"><span style="font-weight:bold">为什么代码(结构化)不用 RAG</span><span>,三条:</span></p>

<ol start="1"><li id="f-doxcn7yd0Tj3I52MfybwONrUWFc"><span style="font-weight:bold">精确,不需要猜意思</span><span>:能跑的代码拼写一定精确,</span><span><span><span>getUserProfile</span></span></span><span> 全项目就叫这个 → grep 直接 100% 命中,再上语义搜索反而更不准。</span></li></ol>

<ol start="2"><li id="f-doxcnLX3TCK74EUb8S6aXW45ORw"><span style="font-weight:bold">自带组织结构</span><span>:文件夹、路径、架构就是现成地图,agent 逐层导航即可,不需要语义帮它理解大概在讲什么。</span></li></ol>

<ol start="3"><li id="f-doxcnDwumGsem0XJHABy91lXnTf"><span style="font-weight:bold">索引维护是负担</span><span>:代码改动极频繁,向量索引很快漂移失同步;而普通文档几个月不变,索引好维护。</span></li></ol>

<blockquote id="f-doxcnhEjsQwN7VGL5pdKmv4FMLf"><p id="f-doxcnxJmn04sOyzQPR4t3n0F78c"><span style="font-weight:bold">检索工具是一条谱系,不是二选一</span><span>(Harness 视角补充): </span><span><span><span>grep(词法/精确)</span></span></span><span> → </span><span><span><span>BM25(词法/倒排)</span></span></span><span> → </span><span><span><span>embedding(语义)</span></span></span><span> → </span><span><span><span>结构化 DB(带 metadata)</span></span></span><span> 从左到右,能力更强但成本更高。</span><span style="font-weight:bold">能用轻的就不上重的。</span></p></blockquote>

<a id="f-doxcnjEOLuJw7tUjHLPn2UFAoUg"></a>

###### 规模 vs 上下文窗口

<p id="f-doxcnLiPyzDNd1Arjs29XG3W89f"><span>传统 RAG 的第二个对手不是 grep,而是</span><span style="font-weight:bold">百万 token 的长上下文</span><span>(直接把文档全塞进去,不做检索)。二者各有胜场:</span></p>

<p id="f-doxcnHFo51Xn4tAf7wUd4Geszpe"><span style="font-weight:bold">长上下文赢在简单——三个理由:</span></p>

<ol start="1"><li id="f-doxcnPBPTB4ANxA6oZvB83TpqTc"><span style="font-weight:bold">砍掉基础设施(no-stack stack)</span><span>:不需要切块策略、embedding 模型、向量库、reranker、同步逻辑——少了一堆会坏的环节。</span></li></ol>

<ol start="2"><li id="f-doxcngSKrKk8OXMHFR3bCd28Qie"><span style="font-weight:bold">没有检索彩票</span><span>:语义搜索是概率性的,可能</span><span style="font-weight:bold">静默失败(silent failure)</span><span>——答案在库里,但没被召回,模型压根没看到。长上下文让模型看到全部,不存在这个失败点。</span></li></ol>

<ol start="3"><li id="f-doxcnaIyCTToSrX7iTghwSozZ7c"><span style="font-weight:bold">整本书问题</span><span>:RAG 只能检索</span><span style="font-weight:bold">存在的内容</span><span>,无法回答</span><span style="font-weight:bold">缺了什么</span><span>。比如对比需求文档和发布说明,哪些安全需求被遗漏了——RAG 只能召回零散片段,看不到两份文档之间的空缺;长上下文把两份文档整体喂进去才能做这种全局对比。</span></li></ol>

<p id="f-doxcns68W2kpjymE3cHzaJU3a7c"><span style="font-weight:bold">但 RAG 依然不可替代——三个理由:</span></p>

<ol start="1"><li id="f-doxcnGuznpcedcQqLrxGkE01RNT"><span style="font-weight:bold">重复读取成本</span><span>:长上下文每次查询都要重新处理整份文档(500 页 ≈ 250k token,每次都付这个税);RAG 只在建索引时处理一次。(prompt caching 能部分抵消静态数据,但动态数据仍要全额付费。)</span></li></ol>

<ol start="2"><li id="f-doxcn5sYiTpCocMtDiIqLudTJVf"><span style="font-weight:bold">大海捞针(needle in haystack)</span><span>:上下文越长(50 万+ token),模型注意力越</span><span style="font-weight:bold">被稀释</span><span>,埋在中间的单段信息经常漏掉或幻觉;RAG 只给 top-k 相关块,</span><span style="font-weight:bold">降噪聚焦</span><span>,反而更准。</span></li></ol>

<ol start="3"><li id="f-doxcnQemFqdbHIiAbv1KpSJYhPf"><span style="font-weight:bold">无限数据集</span><span>:企业数据是 TB / PB 级,百万 token 只是杯水车薪。要在无限数据里定位,</span><span style="font-weight:bold">必须有检索层</span><span>先过滤到能塞进窗口的量。</span></li></ol>

<blockquote id="f-doxcnIITvAGHzt3tmOGVXViPTlf"><p id="f-doxcn0CvHFmUesz08J2AbOwnNuf"><span style="font-weight:bold">该视角的结论</span><span>:</span></p>
<ul><li id="f-doxcnbPwX1U7aPmrVBj83HPYFsh"><span style="font-weight:bold">有界数据 + 需要全局推理</span><span>(分析单份合同、总结一本书)→ 用</span><span style="font-weight:bold">长上下文</span><span>。</span></li></ul>
<ul><li id="f-doxcnDF9ly7sBSRwWVEpJvQLbGw"><span style="font-weight:bold">无限的企业级知识</span><span> → </span><span style="font-weight:bold">向量数据库(RAG)仍是唯一可行的仓库</span><span>。</span></li></ul></blockquote>

<div id="f-doxcno1ykcPaTFUTl7tTUdUqzoh"><img alt="" decoding="async" height="240" loading="lazy" src="/images/agent-learning/5a0ceb80e2bf2e8703297212.png" width="360"/></div>

<a id="f-doxcnB4KPHCAlP60xOa0yE7mJgc"></a>

###### 工程成本与按需外挂

<p id="f-doxcnSgHRU3th20U1vPpfFqzyTf"><span style="font-weight:bold">Boris Cherny(Claude Code 核心作者)的第一手复盘</span><span>:早期 Claude Code </span><span style="font-weight:bold">真的用过 RAG</span><span>——用 Voyage embedding 给代码库建索引,但后来整个放弃,转向 agentic search(glob + grep 的常规代码搜索)。原因三条:</span></p>

<ol start="1"><li id="f-doxcnFxqy4hZduXMx1b6WWCPFqg"><span style="font-weight:bold">性能</span><span>:agentic search</span><span style="font-weight:bold">outperformed everything. By a lot.</span><span>(全面碾压,大幅度)。他很坦诚地补充,这个判断主要是</span><span style="font-weight:bold">just vibes</span><span>(内部凭感觉),也有一些内部 benchmark。</span></li></ol>

<ol start="2"><li id="f-doxcn0nh84aegHv4KBQEW3wVw6b"><span style="font-weight:bold">索引复杂 + 代码漂移</span><span>:RAG 需要建索引步骤,而</span><span style="font-weight:bold">the code drifts out of sync</span><span>(代码不断变化,索引很快对不上)。</span></li></ol>

<ol start="3"><li id="f-doxcnBODxwMLHr11e3Y1o5VQfvc"><span style="font-weight:bold">安全 / 责任</span><span>(视频里普遍忽略的一条):索引必须</span><span style="font-weight:bold">存在某个地方</span><span>,</span><span style="font-weight:bold">what if that provider gets hacked?</span><span>(存索引的服务商被黑怎么办)——对公司是</span><span style="font-weight:bold">a lot of liability</span><span>(巨大的责任风险)。Anthropic 不愿把敏感代码上传第三方。</span></li></ol>

<p id="f-doxcnJOkLSDtLbyYsgOaOPo7aVf"><span>他对这个权衡的总结:</span></p>

<blockquote id="f-doxcnuz0XpTzgnZdl6KObeUKhnh"><p id="f-doxcnLa6Cs6PUcn4KLzxF24qfLc"><span style="font-weight:bold">at the cost of latency and tokens, you now have really awesome search without security downsides.</span><span> (代价是牺牲一点延迟和 token,但换来极棒的搜索,且没有任何安全隐患。)</span></p></blockquote>

<p id="f-doxcnAwD033ffKriLVCW5XADG3c"><span style="font-weight:bold">Harness 工程视角把这条思路一般化</span><span>:</span></p>

<ul><li id="f-doxcnL0MM82ZblPk0rKjY3UvL5e"><span style="font-weight:bold">不要把通用 AI 工具当万能工具</span><span>。Claude Code 内置 grep,但 CC 是通用的,而你的业务是定制的——代码库可能 100GB、文档跨多仓库、查询带 metadata 过滤。这时通用工具会慢甚至搜不到。</span></li></ul>

<ul><li id="f-doxcn8JrspfZGLwog4nLAMV0M1e"><span>关键的实证:视频里 Raj 的实验中,</span><span style="font-weight:bold">Agentic + 纯 BM25</span><span>反超了</span><span style="font-weight:bold">One-shot + embedding 切块</span><span>。这说明随着模型变强,语义近似这层</span><span style="font-weight:bold">不一定非要靠 embedding</span><span>,模型自己重写 query 就能补上。但这是</span><span style="font-weight:bold">embedding 从必选变可选</span><span>,不是BM25 取代 embedding。</span></li></ul>

<ul><li id="f-doxcnjI8nbTqz8yPaugEIBXZWye"><span>所以最精准的定性是:</span><span style="font-weight:bold">RAG 没被取代,而是从默认必选降级成按需启用的一档。</span></li></ul>

<a id="f-doxcnEJd6QluDVVqThU38b5Bupe"></a>

##### 总结&amp;结论

<p id="f-doxcnDgLRX3BioMiTpse4NwF2ad"><span style="font-weight:bold">先把 RAG 的账算清楚——它的优点和缺点各是什么。</span></p>

<p id="f-doxcnT97vTILhefudNgCf80oThb"><span>传统 RAG(切块 + embedding + 向量库)的</span><span style="font-weight:bold">核心优点</span><span>有三:</span></p>

<ol start="1"><li id="f-doxcnb9PH5p160QdV9RfXfXpfmh"><span style="font-weight:bold">能做语义搜索</span><span>:靠 embedding 捕捉概念相似,能跨同义词、跨字面把埋在海量文档里、字面根本没出现搜索词的内容召回——这是 grep 这类字面匹配做不到的。</span></li></ol>

<ol start="2"><li id="f-doxcn2EVWQFeVysMNy2DNUm7ftb"><span style="font-weight:bold">又快又省成本(核心优势)</span><span>:预先切块 + 建索引,查询时只拉几个小 chunk,而不是把整个知识库/整份文档塞进上下文。这一个机制同时带来两个好处——</span></li></ol>

<div id="f-doxcnqlmbF7Z6y2LEJ68pkGAy54" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">省成本</span><span>:喂给模型的输入 token 大幅减少,大知识库下比让模型读整份文档或多轮 agentic 扫描便宜约 </span><span style="font-weight:bold">100 倍</span><span>。</span></div></div>

<div id="f-doxcnmVMa8ZCd5K5iXB5ddXF5Td" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">快 / 低延迟</span><span>:检索直接走索引(向量 HNSW </span><span><span><span>O(log N)</span></span></span><span> / BM25 倒排 </span><span><span><span>O(K)</span></span></span><span>)秒级命中,加上塞进上下文的内容少、模型推理也快;相比让 agent 用 grep/cat 在海量非结构化文档里逐个遍历(视频原话:慢到爆、贵到爆),定向拉 chunk 快得多。</span></div></div>

<div id="f-doxcnZzmBxe8a6KUHIIHtPtMGTe" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>一句话:</span><span style="font-weight:bold">只取最相关的一点点,而不是处理全部——省的是钱,快的是这同一件事的另一面。</span></div></div>

<ol start="3"><li id="f-doxcnGtKPzhCdyhYQMf7xybs8OO"><span style="font-weight:bold">降噪聚焦</span><span>:只返回 top-k 相关块,把大海捞针里的草堆先扔掉,给模型的是信号而非噪声,反而比长上下文全塞进去更准。</span></li></ol>

<p id="f-doxcnodMxmYRGu1MOMZYX7c4X4c"><span>它的</span><span style="font-weight:bold">核心缺点</span><span>也有三:</span></p>

<ol start="1"><li id="f-doxcn1mj8J2oFUziDMags6yZRqg"><span style="font-weight:bold">要维护一套重基础设施</span><span>:切块策略、embedding 模型、向量库、reranker、同步逻辑——环节多、都可能坏;索引还会随源数据变化而漂移失同步,代码这种高频变动的数据尤其吃亏。</span></li></ol>

<ol start="2"><li id="f-doxcnecU3YMuMo3r9vswLZ8GN1f"><span style="font-weight:bold">检索是概率性的,会静默失败</span><span>:语义召回不保证命中,答案可能就在库里却没被检索到,模型压根没看到——而它不会告诉你我没找到。</span></li></ol>

<ol start="3"><li id="f-doxcnAB6qJf0FGfTaeMEcTrKWze"><span style="font-weight:bold">只能召回存在的片段,做不了全局推理</span><span>:它给的是零散 chunk,回答不了两份文档之间缺了什么这类需要看全局的问题。</span></li></ol>

<p id="f-doxcnU8MWJqrXudKzW5cqCYeYUd"><span style="font-weight:bold">再下结论——它在哪被取代、在哪没被取代。</span></p>

<p id="f-doxcnLvPRB7U6jJ8lLxFckvZf3d"><span style="font-weight:bold">传统 RAG 已在两类场景被更优方案取代:</span></p>

<ol start="1"><li id="f-doxcnEyAc27Cx2KFA1RqFQIPPKc"><span style="font-weight:bold">结构化数据(尤其代码)</span><span>:字面精确、自带文件结构,</span><span><span><span>grep / 文件导航</span></span></span><span>又快又准还免维护,不需要语义那一层——Claude Code 弃用 RAG 正是这个原因(性能更好 + 无索引漂移 + 无安全负担)。</span></li></ol>

<ol start="2"><li id="f-doxcndaNAy7GcYUFhsNdAfHykKd"><span style="font-weight:bold">有界 + 需全局推理的数据</span><span>(单份合同、整本书对比):</span><span><span><span>长上下文</span></span></span><span>直接全塞进去,省掉整套检索栈,还避开了静默失败,反而更适合。</span></li></ol>

<p id="f-doxcnhL7nkk2fZfkTpI5036Rfaf"><span>此外,即便需要语义,提供语义的活也</span><span style="font-weight:bold">不再由 embedding 独家承包</span><span>:模型够强时,</span><span><span><span>Agentic + BM25</span></span></span><span>(模型自己重写 query,把语义翻译成关键词)也能达到甚至反超传统切块 RAG——所以 embedding </span><span style="font-weight:bold">从必选降为可选</span><span>。</span></p>

<p id="f-doxcn6SxDdi345Fo6QRGF3kTC0c"><span style="font-weight:bold">但传统 RAG 在这些场景仍不可替代</span></p>

<ol start="1"><li id="f-doxcnWaHOf2shCeWv3Lbbu5KXJZ"><span style="font-weight:bold">海量非结构化知识库</span><span>(客服、法律、合规、企业 Wiki,乃至 TB/PB 级数据湖):长上下文只是杯水车薪,必须靠检索层先把数据过滤到能塞进窗口的量,向量库是目前唯一可行的仓库。</span></li></ol>

<ol start="2"><li id="f-doxcntsZhfFM10BLTrv7h6E1Gfh"><span style="font-weight:bold">延迟 / 成本有硬约束的生产环境</span><span>:面向大量用户的语义问答系统、有明确延迟与成本 SLA(如高并发客服问答),既不能对每个 query 跑多轮 agentic 检索(太慢、2–5x token),也不能每次把知识库塞进长上下文(装不下、更贵)。预建索引的 RAG 一次检索、毫秒级命中、每查询成本固定且低——这时它是唯一能同时扛住并发与预算的方案。</span></li></ol>

<p id="f-doxcntWhyqVxet9RYposUo0lHpc"><span style="font-weight:bold">RAG 仍具显著优势(虽未到不可替代)的场景:</span></p>

<p id="f-doxcnSw8SpoaUyxjxzlK5m19hTb"><span style="font-weight:bold">强依赖语义搜索、但同时在意成本与速度</span><span>:这类任务 </span><span><span><span>Agentic + BM25</span></span></span><span> 确实能取得相同甚至更好的效果——所以谈不上不可替代。但 agentic 方案</span><span style="font-weight:bold">强依赖顶级模型能力</span><span>(query 重写要够聪明才补得出语义),还要付出多轮迭代的 </span><span style="font-weight:bold">2–5x token 和更高延迟</span><span>。相比之下,传统 RAG 把语义</span><span style="font-weight:bold">预先烧进索引</span><span>,一次检索即得,</span><span style="font-weight:bold">更快、更省、且不挑模型</span><span>(不需要 Opus/GPT-5 级也能跑)。所以当语义需求强,但你不愿为 agentic 买单时,RAG 虽非不可替代,仍是</span><span style="font-weight:bold">性价比更优的一档</span><span>。</span></p>

<p id="f-doxcnmOnhPagjGQdOzXjUEBK0SH"><span style="font-weight:bold">一句话:</span><span>传统 RAG 从默认必选降级为</span><span style="font-weight:bold">按需启用的一档</span><span>——</span><span style="font-weight:bold">在小型/结构化/有界场景被 grep、长上下文、agentic 搜索取代</span><span>;</span><span style="font-weight:bold">在海量非结构化、以及对延迟成本有硬约束的生产场景仍不可替代</span><span>;即便在 agentic 可替代的语义场景,它也常因更快、更省、不挑模型而保有优势。而广义 RAG(检索)作为一切 Agent 的地基,永远不会过时。</span></p>

<a id="f-doxcnOFAB82RexK58nbhB26bxBc"></a>

##### 场景题小测试

<p id="f-doxcnKdiY4ueqUmAvHY6YmZWBQh"><span>我们上面讲了，狭义的RAG变成了按需取用，它只是Agent检索能力的一种实现方式。那么对于不同的场景，我们应该如何选择方案呢？这里给一些场景和选型策略供大家参考。</span></p>

<p id="f-doxcnEvpmCZ4VKfEunPA4m0g79R"><span>思路统一为三步——</span><span style="font-weight:bold">看数据结构化程度 → 看规模 → 看查询形态</span><span>,能用轻的就不上重的。</span></p>

<div id="f-doxcnz74iu8RGOks4M8hVuBH9Nc"><img alt="" decoding="async" height="1280" loading="lazy" src="/images/agent-learning/f1ee4bd31e9277eb08caea4a.png" width="853"/></div>

<p id="f-doxcnbVP8lfAzJtnORoPiDtwK7d"><span style="font-weight:bold">最佳实践清单</span></p>

<ol start="1"><li id="f-doxcnOjR6LCq9e35OsmykKiPr6d"><span style="font-weight:bold">默认 grep 起手</span><span>:90% 的代码搜索靠 grep 就够,别一上来就上向量库。</span></li></ol>

<ol start="2"><li id="f-doxcnIAXCE9Qh1tLekd1058ATxc"><span style="font-weight:bold">量级到了再加 BM25</span><span>:代码库 &gt;5GB 或 &gt;10w 文件,包一个 Skill 封装 </span><span><span><span>ripgrep --index</span></span></span><span> 或 BM25 库。</span></li></ol>

<ol start="3"><li id="f-doxcnwRmkfQs9kWxj4x8K15Vvfg"><span style="font-weight:bold">跨同义词才用 embedding</span><span>:日常代码定位别用,跨语言 / 跨概念查找才上语义搜索。</span></li></ol>

<ol start="4"><li id="f-doxcn1dN2USLjQIxut8S0NG4C8f"><span style="font-weight:bold">模型够强就上 Agentic RAG</span><span>:让模型自己重写 query、按文件级迭代,比预切 chunk 更准(代价 2–5x token)。</span></li></ol>

<ol start="5"><li id="f-doxcnQ5ji44tMre9WGZlJl6Vkjc"><span style="font-weight:bold">文件级 &gt; chunk 级</span><span>:能不切块就不切块,整文件交给模型,避免上下文撕裂。</span></li></ol>

<ol start="6"><li id="f-doxcnKrRTuFNhcqsuJfRTU6zHCf"><span style="font-weight:bold">需要 metadata join 才迁数据库</span><span>:纯文本搜索别上 DB。</span></li></ol>

<p id="f-doxcnRKiQ3UEnp8OrbVnNutqbwe"><span>A:用 </span><span><span><span>grep / ripgrep</span></span></span><span>,不建任何索引。代码是结构化数据,字面精确,grep 现扫就 100% 命中且免维护;本地项目规模不大,线性扫盘足够快。这正是 Claude Code 的选择。</span></p>

<p id="f-doxcnqBqcXNQDXA4rQiFKUmwQSh"><span style="font-weight:bold">Q:代码库超大(比如 100GB、上千万文件),grep 扫盘太慢了怎么办?</span></p>

<p id="f-doxcngKgZuusoN9IUe6Yduuks8g"><span>A:加一层 </span><span><span><span>BM25 倒排索引</span></span></span><span>(包成 Skill 挂给 agent)。它查询 O(K)、与库大小无关,解决 grep 线性扫盘的慢;仍是词法匹配,不碰 embedding。这是规模把你从零索引推到轻索引,不是因为需要语义。</span></p>

<p id="f-doxcnQ1aqlfLJ0EJsmO0WeKQWqe"><span style="font-weight:bold">Q:要查用户鉴权相关的代码,但关键词散在 auth / login / session / jwt 里,grep 搜不全?</span></p>

<p id="f-doxcn1SC3ktvjEVxAnHDedd4n8d"><span>A:这是跨同义词/跨概念的查找,字面匹配天然漏召回,有两条路都能走,按模型强度 vs 成本/延迟权衡:</span></p>

<ul><li id="f-doxcnJdKG9B8jaB8BR7zCrrFQDf"><span style="font-weight:bold"><span><span>embedding 语义搜索</span></span></span><span>:预建向量库,靠向量捕捉概念相似,一次召回稳定拿到结果,查询快、单次成本低——适合成本/延迟敏感或高频查询。</span></li></ul>

<ul><li id="f-doxcnSViFZEbOzSMpmpr14RFQEc"><span style="font-weight:bold"><span><span>Agentic + grep/BM25</span></span></span><span>:让模型自己把用户鉴权重写成 </span><span><span><span>auth|login|session|jwt</span></span></span><span> 一组关键词、多轮迭代搜。省掉建索引,但要求模型能力够强,且多轮迭代 token 和延迟更高。</span></li></ul>

<p id="f-doxcngp3jYNqskPlyBW5J40WQae"><span>注意:日常精确定位(已知函数名)别用这两种,grep 直接命中就好。</span></p>

<p id="f-doxcnMXEfg5fJOzGAYURM84CRoc"><span style="font-weight:bold">Q:要分析一份合同、或对比两份文档找出遗漏了什么,用 RAG 吗?</span></p>

<p id="f-doxcnkcoEI1jaXWzez73p5sBJyg"><span>A:不唯一,看数据量和关联复杂度选:</span></p>

<ul><li id="f-doxcnz9iLVa7YHKn4Ah7p2Cmucd"><span style="font-weight:bold">数据塞得下 → </span><span style="font-weight:bold"><span><span>长上下文</span></span></span><span style="font-weight:bold">直接全塞进去</span><span>:需要全局推理,让模型看到全貌才能发现文档之间的空缺,还省掉检索栈、避开静默失败。这是有界数据的首选。</span></li></ul>

<ul><li id="f-doxcnWnjTHN6Nk4XIWkcrgaFX6g"><span style="font-weight:bold">数据太大塞不下 → 仍要 </span><span style="font-weight:bold"><span><span>RAG</span></span></span><span style="font-weight:bold"> 先过滤</span><span>:普通向量 RAG 只给零散 chunk 容易看不到全局,可退而用它把范围缩到能塞进窗口的量再做对比。</span></li></ul>

<ul><li id="f-doxcnac6DOSC6W2oiaRqO5srUxe"><span style="font-weight:bold">实体/条款间有复杂关联 → </span><span style="font-weight:bold"><span><span>GraphRAG</span></span></span><span>:先把文档抽成实体-关系图,用图结构显式建立这条需求 ↔ 那条发布说明的关联,比纯向量召回更能支撑缺了什么这类跨文档推理。</span></li></ul>

<p id="f-doxcnVvh4iiBoBEdtlB2F6qNXpb"><span style="font-weight:bold">Q:要给公司几十万份客服/法律/Wiki 文档做问答系统,用什么?</span></p>

<p id="f-doxcnajvD70PEkNqaYoPqMH5Jrh"><span>A:标准 </span><span><span><span>传统 RAG</span></span></span><span>(切块 + embedding + 向量库)。典型的海量非结构化数据:字面对不上、靠概念含义组织、塞不进上下文——必须靠语义检索 + top-k 降噪,这是 RAG 的主场。</span></p>

<p id="f-doxcnXFYh6ZzTRBF597ifEB9Leg"><span style="font-weight:bold">Q:企业数据到了 TB / PB 级,长上下文完全装不下,怎么办?</span></p>

<p id="f-doxcnjgU0A3tooxx6miJbvovDbb"><span>A:必须有 </span><span><span><span>RAG 检索层</span></span></span><span>。百万 token 在这种量级只是杯水车薪,得先用向量检索把数据过滤到能塞进窗口的量;向量库是目前唯一可行的仓库。</span></p>

<p id="f-doxcnOvIvmN0gEgZaS1qB3CcygL"><span style="font-weight:bold">Q:查询需要按作者过滤 + 按提交时间排序 + 按路径匹配这种带条件的检索?</span></p>

<p id="f-doxcnZEdW2g178uiaUHLDXFo6Zc"><span>A:上 </span><span><span><span>结构化 DB / metadata 索引</span></span></span><span>(可与 RAG 混合)。这已经不是找相关内容而是按字段筛选 join,grep 和向量都做不了,需要数据库式的字段过滤。纯文本搜索则别上 DB。</span></p>

<p id="f-doxcnT7vfyVVrJ8uTYeAqp43Gwf"><span style="font-weight:bold">Q:模型够强(Opus / GPT-5 级)、预算也够,想要最好的检索质量?</span></p>

<p id="f-doxcnYiUtoenJHMPApHNKIAcdnf"><span>A:上 </span><span><span><span>Agentic RAG</span></span></span><span>——让模型自己重写 query、按文件级迭代检索,底层用 BM25 / embedding / 混合都行,坚持文件级 &gt; chunk 级避免上下文撕裂。代价是多花 2–5x token 和延迟,换来更高准确率。</span></p>

<a id="f-doxcnvPVW33eV28YZZBN4zqDLgA"></a>

##### 面试题

<p id="f-doxcnvLCBjodz5k5fI5MZXrbbag"><span>希望大家能真的理解上面说的，有自己的思考。那么如果从这些维度想清楚了，下面的面试问题的答案其实就非常明显了。</span></p>

<a id="f-doxcnMbtmXJTOCRZ0ghI0kbreZe"></a>

###### Q1:你认为 RAG 过时了吗?

<p id="f-doxcnoLgw5yrehko2OyH5pFO5Tf"><span style="font-weight:bold">A:我的判断是——传统 RAG 在部分场景被降级,但整体没有过时,更准确地说是换了形态。回答这个问题,必须先厘清在讨论哪个 RAG。</span></p>

<p id="f-doxcn0NffH6TdZpcVfJcHjCsXvf"><span>大家喊RAG 已死时,死的是</span><span style="font-weight:bold">切块 + embedding + 向量库 + 语义召回这套传统管线</span><span>;而 RAG 的本意是把外部信息检索进上下文,这个</span><span style="font-weight:bold">广义 RAG 是所有 Agent 的地基,不可能死</span><span>。连 Agentic RAG 本身也仍然是 RAG,只是把一次检索变成迭代检索。</span></p>

<p id="f-doxcnErZ49hwOE4RaO0vJJvFJBg"><span>传统 RAG 确实在退位,有两股力量:</span></p>

<ul><li id="f-doxcnuDAdsEMefx79LjiHSjsVGb"><span style="font-weight:bold">一是长上下文</span><span>:百万 token 窗口让有界数据 + 全局推理的场景(如分析单份合同、对比两份文档找缺漏)可以直接把文档全塞进去,省掉整套检索基础设施,还避免了语义搜索的静默失败。</span></li></ul>

<ul><li id="f-doxcngBUh3ximM3o8SEM4rkJaPc"><span style="font-weight:bold">二是 Agentic 搜索</span><span>:模型变强后,它能自己重写 query、多轮迭代检索,有实验(Raj)显示Agentic + 纯 BM25能反超One-shot + embedding 切块——说明语义近似这层不一定非靠 embedding。</span></li></ul>

<p id="f-doxcnN2cM98SJRkrhCAIhFQ784b"><span style="font-weight:bold">但传统 RAG 在三类场景仍不可替代</span><span>:</span></p>

<ul><li id="f-doxcnx9Gg8pmHV96LNm8i9o1KVh"><span style="font-weight:bold">① 海量数据(企业 TB/PB 级)</span><span>:这种量级下长上下文根本装不下,只是杯水车薪;而且如果不上 RAG、改用 agentic 现扫,面对无限数据每次查询都要海量扫描,</span><span style="font-weight:bold">速度会慢到不可用</span><span>。必须靠检索层先把数据过滤到能塞进窗口的量,向量库是目前唯一可行的仓库。</span></li></ul>

<ul><li id="f-doxcnOBNvFxe9og2kZ4UjEZMjce"><span style="font-weight:bold">② 非结构化 + 跨同义词</span><span>:内容靠概念含义组织、字面对不上,关键词根本搜不到,只有 embedding 捕捉概念相似才能召回。虽然Agentic + 语义检索(让模型自己重写 query)理论上也能达到,</span><span style="font-weight:bold">但这要求模型能力足够强,且多轮迭代的 token 成本和延迟都很高</span><span>;用预建的 embedding 向量库,一次召回就能稳定拿到结果,更省更快。</span></li></ul>

<ul><li id="f-doxcnEi1tDrIra62sKiSHJ3jOy5"><span style="font-weight:bold">③ 成本 / 延迟敏感的场景</span><span>:当你需要严格控制查询成本和响应速度时,</span><span style="font-weight:bold">事先建好索引</span><span>的优势就出来了——切块 + 建索引只在离线做一次,查询时只拉 top-k 个小 chunk,近似最近邻 O(log N) 一次命中;相比每次都让模型读整份文档或多轮 agentic 扫描,</span><span style="font-weight:bold">延迟更低、单次查询成本可低约两个数量级</span><span>。</span></li></ul>

<p id="f-doxcndUvTBGp1Y0fvaSDhglxKec"><span style="font-weight:bold">所以结论是:RAG 从默认必选降级为按需启用的一档,而不是被淘汰。</span><span> 判断要不要用,看三个条件:</span><span style="font-weight:bold">文档规模、查询是否需要跨同义词、以及对成本 / 延迟的要求。</span></p>

<a id="f-doxcnb5OSD2vZllyOHi8QbFV0Ef"></a>

###### Q2:你如何选择用不用 RAG?如何设计项目的检索模块?

<p id="f-doxcnfjBsdl4FRDI5RTVI0c3nSd"><span style="font-weight:bold">A:核心原则是——不要把通用工具当万能工具,而要按场景在检索谱系上选一档;能用轻的就不上重的。</span></p>

<p id="f-doxcn4ErLtcSJxEvrsG0tO3ymzg"><span>我会分三步走:</span></p>

<p id="f-doxcn8CFXbbsQN1SU44K4FDkA3e"><span style="font-weight:bold">第一步,看任务量级和查询形态。</span><span> 先问两个问题:数据多大(单项目 / 超大代码库 / 企业级数据湖)?查询是纯文本、跨同义词、还是带字段过滤?</span></p>

<p id="f-doxcnp1XfLzmd4qumUCLaOEfS1b"><span style="font-weight:bold">第二步,在检索谱系上选档。</span><span> 检索工具从词法到语义是一条谱系,不是二选一,从轻到重依次是:</span></p>

<ul><li id="f-doxcnpEoVzrm1o8iVvm5ftZU0lf"><span style="font-weight:bold">词法 · 精确(grep / ripgrep)</span><span>:适用于结构化数据、中小代码库(默认起手,90% 够用)。</span></li></ul>

<ul><li id="f-doxcnqKCP3MNcRnyqjcfXEeqdOh"><span style="font-weight:bold">词法 · 倒排(BM25)</span><span>:适用于超大代码库(&gt;5GB / &gt;10w 文件)。</span></li></ul>

<ul><li id="f-doxcngYqayJsN5Lxd5COQZ9yBtf"><span style="font-weight:bold">语义(embedding + 向量库)</span><span>:适用于非结构化、跨语言 / 跨同义词。</span></li></ul>

<ul><li id="f-doxcnYm6H76Z3tAVWdu5Nvi2wAf"><span style="font-weight:bold">结构化(DB + metadata)</span><span>:适用于需要 join 的场景(按 author 过滤、按时间排序)。</span></li></ul>

<p id="f-doxcndcKtdyK6pxWdeftEjLvCkh"><span>具体判据:</span></p>

<ul><li id="f-doxcn0c9kX7LY2iT4G4Fexf2s5d"><span style="font-weight:bold">默认 grep 起手</span><span>;结构化数据 + 精确匹配,根本不用 RAG。</span></li></ul>

<ul><li id="f-doxcnyJ3kXhYnCiA4dKPNANfpqd"><span style="font-weight:bold">规模上去了加 BM25</span><span>;跨同义词才上 embedding。</span></li></ul>

<ul><li id="f-doxcnF9QCeLpIHiknOWzR3pJTgb"><span style="font-weight:bold">有界数据 + 全局推理</span><span> → 优先考虑长上下文,而非 RAG。</span></li></ul>

<ul><li id="f-doxcnhYHI5t5Zj4jEm9uiAweJhh"><span style="font-weight:bold">海量非结构化</span><span> → 传统 RAG 是唯一可行仓库。</span></li></ul>

<ul><li id="f-doxcnIRAgMSZv5Hm4THnxgmt7zd"><span style="font-weight:bold">需要 metadata join</span><span> → 结构化 DB + RAG 混合。</span></li></ul>

<ul><li id="f-doxcncLuwPYhpAm5zXgfYIdOV7f"><span style="font-weight:bold">模型够强 + 预算够</span><span> → 上 Agentic RAG(底层 BM25 / embedding / 混合均可),让模型自己迭代,并坚持</span><span style="font-weight:bold">文件级 &gt; chunk 级</span><span>,避免上下文撕裂。</span></li></ul>

<p id="f-doxcn71XJRKecBeFlW90BYiDgpb"><span style="font-weight:bold">第三步,用 Skill / 工具封装,交给 agent 按需调用。</span><span> 更前沿的做法是</span><span style="font-weight:bold">给 agent 同时配好精确搜索 + 语义搜索两种工具</span><span>,让它根据具体 query 自己决定走哪条路——这就是桥接思路。</span></p>

<p id="f-doxcnENBV74MS68965ylzRsaKkc"><span>一句话:</span><span style="font-weight:bold">检索模块的设计,本质是 harness 工程——agent 的能力上限不只取决于模型,更取决于你给它配的工具链。</span></p>

<a id="f-doxcnpN3kbI3PiNLCwCFNLItNae"></a>

###### Q3:Claude Code 为什么不用 RAG?

<p id="f-doxcnVO4djcmumVrJI7GWCNsEzg"><span style="font-weight:bold">A:先纠正一个常见误解——不是不能用,而是核心不内置那套向量库管线。原因来自数据环境和工程权衡两方面,Claude Code 核心作者 Boris Cherny 给过第一手复盘。</span></p>

<p id="f-doxcnimGxYhguOB1VCTIaMTRQIf"><span style="font-weight:bold">先说根本原因:决定用不用 RAG 的是数据环境,不是任务类型。</span><span> Claude Code 虽然是通用 agent,但它面对的数据环境永远是</span><span style="font-weight:bold">本地文件系统 + 终端</span><span>——有界(单个项目)、天然结构化(文件夹 / 路径 / 文件名)、可直接 grep。这种环境用 agentic search + 长上下文就够了。而 RAG 的刚需场景是海量 + 非结构化 + 无法直接导航的企业级知识库,Claude Code 的工作目录一条都不占。</span></p>

<p id="f-doxcnLHsyHmpO17v9VIj4R6oAFf"><span style="font-weight:bold">再说 Boris 的三条具体理由</span><span>(早期 Claude Code 确实用过 Voyage embedding 建索引,后来放弃):</span></p>

<ol start="1"><li id="f-doxcnEfLh8m1F9A5UxivQOxz2Rf"><span style="font-weight:bold">性能</span><span>:agentic search全面碾压,大幅度(他坦承主要凭内部 vibes,也有内部 benchmark)。</span></li></ol>

<ol start="2"><li id="f-doxcn4rd1ya3luzwcrTxX5D8myg"><span style="font-weight:bold">代码漂移</span><span>:代码改动极频繁,向量索引很快out of sync,维护成本高。</span></li></ol>

<ol start="3"><li id="f-doxcnIbfWUXd9I2gcP6qzeGoFgz"><span style="font-weight:bold">安全 / 责任</span><span>:索引要存在某处,服务商被黑就是巨大的责任风险,Anthropic 不愿上传敏感代码。</span></li></ol>

<p id="f-doxcnLFmm1mBEMWzMVs9UBcNNnb"><span>他的总结:</span><span style="font-weight:bold">代价是延迟和 token,但换来极棒的搜索,且没有安全隐患。</span></p>

<p id="f-doxcnCwojCRO76kkpl17tIIg2Mz"><span style="font-weight:bold">补充两点让回答更完整</span><span>:</span></p>

<ul><li id="f-doxcnJipNuiS7c1liMHDIjDH7Hh"><span>代码是</span><span style="font-weight:bold">结构化</span><span>数据,拼写精确、自带文件结构,grep 能精确命中,本就不需要 embedding 的语义近似超能力。</span></li></ul>

<ul><li id="f-doxcnScqGvhGFBFRLH1AvZJFQRd"><span>Claude Code 不内置 RAG,</span><span style="font-weight:bold">不代表它做不了 RAG</span><span>——它可以通过 MCP / 工具外挂一个语义检索能力。</span><span style="font-weight:bold">RAG 对它是按需外挂,不是出厂内置。</span><span> 为了少数场景让所有用户默认背上索引复杂 + 漂移 + 安全责任这套包袱,不划算;核心保持精简,谁真需要谁再插上去。</span></li></ul>

<a id="f-doxcnhTEWPdLuqB09uq1bPnMpG3"></a>

##### 讲解视频

<p id="f-doxcnzHrC5jNie19eIKQt4HXnCw"><span><span><a href="https://www.bilibili.com/video/BV1YdMp6kEEf/?spm_id_from=333.1387.homepage.video_card.click&amp;vd_source=144bec9c3f54e465073138bed788be1b"><span>https://www.bilibili.com/video/BV1YdMp6kEEf/?spm_id_from=333.1387.homepage.video_card.click&amp;vd_source=144bec9c3f54e465073138bed788be1b</span></a></span></span></p>


<a id="section-0568"></a>
## RAG 与知识检索

<a id="t-block-15434"></a>

<p id="t-TzkCZIMnLWxZPg64pc8Xvd"><span>RAG（Retrieval-Augmented Generation，检索增强生成）是目前最主流的 LLM 落地架构之一。</span></p>

<p id="t-eYMP4kIvAnwac1dk4brPwf"><span>RAG 的核心思想是：</span><span style="font-weight:bold">让 LLM 在回答问题时，先从外部知识库中检索相关内容，再基于检索结果生成回答</span><span>，而不是仅依赖模型训练时记住的知识。</span></p>

<p id="t-7R9ry7OpaH5MoUQqejGqfv"><span>这解决了 LLM 的两个核心痛点：知识截止日期（模型不知道训练后发生的事）和幻觉问题（模型在不确定时会编造答案）。</span></p>


<a id="section-0569"></a>
## RAG 基础原理

<a id="t-Hv98yp1x2VDopSyRCEl8CC"></a>

<p id="t-BZsQZP0FTZVUJuzkXnxtyf"><span>一个完整的 RAG 系统由两条流水线组成：</span><span style="font-weight:bold">离线索引流水线</span><span>（将文档预处理存入向量库）和</span><span style="font-weight:bold">在线查询流水线</span><span>（接收用户问题、检索、生成）。</span></p>

<p id="t-v7YVv0GWutowYD5Blg7wFh"><span>离线阶段将原始文档切分成小块，通过 Embedding 模型转换为向量，存入向量数据库。</span></p>

<p id="t-MtQddNgCz05pXcOnkYhaKv"><span>在线阶段将用户问题同样转换为向量，从数据库中找到最相近的文档块，拼接成上下文交给 LLM 生成答案。</span></p>

<p id="t-M389MybOcHIgxgq8HVPSeC"><span>下图展示了 RAG 的完整请求流程：</span></p>

<div id="t-EN0UxigdOBm8uwSU1TnIRL"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/6c172df8d380e301821034f6.png"/></div>


<a id="section-0571"></a>
## 前置挑战：复杂文档解析

<a id="t-Lgznl5kGROZtWt94fPjGkb"></a>

<p id="t-jsBoYYZH2TOqCXcf745PCM"><span>在进行切分前，RAG 往往面临着</span><span style="font-weight:bold">格式解析</span><span>的挑战。特别是 PDF、Word 或扫描件中的表格、图片和多栏排版，普通的文本提取极易造成语义错乱。</span></p>

<p id="t-pqppAgwi8o0c7CY6fkEQ7X"><span>目前行业主流方案是引入 </span><span style="font-weight:bold">文档解析引擎</span><span>（如 LlamaParse、Unstructured）或多模态大模型，将复杂图文转换为结构化的 Markdown，为后续高质量切分打下基础。</span></p>


<a id="section-0572"></a>
## 文档切分策略

<a id="t-oQ0ih2ySpRrgWwjYy5aRvX"></a>

<p id="t-HIxKP6lBm8vUzyfiM8qJJc"><span>文档切分是 RAG 效果的基础，切分粒度直接影响检索质量。块太大会引入噪声，块太小会丢失上下文。常用策略如下：</span></p>

<div id="t-uzW6rqumDmHGe6rT209863"><table><colgroup><col width="120"/><col width="120"/><col width="239.99993896484375"/><col width="153.00518798828125"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>切分策略</span></p></td><td style=" vertical-align: top"><p><span>适用场景</span></p></td><td style=" vertical-align: top"><p><span>优点</span></p></td><td style=" vertical-align: top"><p><span>缺点</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="font-weight:bold">固定大小切分</span></p></td><td style=" vertical-align: top"><p><span>通用文本</span></p></td><td style=" vertical-align: top"><p><span>实现简单，速度快</span></p></td><td style=" vertical-align: top"><p><span>可能切断语义完整的句子</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="font-weight:bold">递归字符切分</span></p></td><td style=" vertical-align: top"><p><span>结构化文本（Markdown、代码）</span></p></td><td style=" vertical-align: top"><p><span>优先按段落、句子等语义边界切分</span></p></td><td style=" vertical-align: top"><p><span>实现略复杂，需设定合理的分隔符列表</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="font-weight:bold">语义切分 (Semantic)</span></p></td><td style=" vertical-align: top"><p><span>长文档、书籍</span></p></td><td style=" vertical-align: top"><p><span>利用 Embedding 计算相邻句子的相似度，自动寻找语义转折点切分</span></p></td><td style=" vertical-align: top"><p><span>计算成本高，预处理速度慢</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="font-weight:bold">父子文档检索</span></p><p><span style="font-weight:bold">(Small-to-Big)</span></p></td><td style=" vertical-align: top"><p><span>全面覆盖场景</span></p></td><td style=" vertical-align: top"><p><span>用"小块"进行高精度向量检索，命中后返回对应的"大块"（父文档）给 LLM，兼顾了检索精度和上下文完整性。</span></p></td><td style=" vertical-align: top"><p><span>数据库设计和维护成本翻倍</span></p></td></tr></tbody></table></div>

<blockquote id="t-Z8fBGdNn3ax3ppLRaoMy30"><p id="t-cCbpdLQaNNtwDBlDJqLXLW"><span style="font-style:italic">实践中常在切分时加入 </span><span style="font-style:italic;font-weight:bold">重叠（overlap）</span><span style="font-style:italic">，即相邻块之间共享若干字符，防止重要信息在边界处被截断。典型配置：块大小 512 tokens，重叠 50~100 tokens。</span></p></blockquote>


<a id="section-0573"></a>
## 实例：使用 LangChain 进行递归切分

<a id="t-19bCMWQBUrlm1VNmFYIecW"></a>

<pre id="t-zAhShqxi9ZyCdyVPcxBqKW"><code>from langchain.text_splitter import RecursiveCharacterTextSplitter

splitter = RecursiveCharacterTextSplitter(
    chunk_size=512, # 每块最大 token 数
    chunk_overlap=50, # 相邻块的重叠 token 数，防止信息在边界处丢失
    separators=["\n\n", "\n", "。", ".", " ", ""] # 优先按段落、句子切分
)

chunks = splitter.split_text(document_text)
print(f"切分为 {len(chunks)} 个文档块")</code></pre>


<a id="section-0575"></a>
## Embedding 模型

<a id="t-Kpn7uskRKHAhGgbqELwaAn"></a>

<p id="t-qt6Z0FNNSVM2WeYdbu3B5k"><span>Embedding 模型负责将文本转换为稠密向量（通常是 768 或 1536 维的浮点数数组）。语义相近的文本在向量空间中距离更近，这正是相似度检索的数学基础。</span></p>

<p id="t-usvNgGHyLvlgrP8vYn8xmp"><span>常用 Embedding 模型对比：</span></p>

<div id="t-z9e9ZadwawMpmFU27yytEa"><table><colgroup><col width="346.5059814453125"/><col width="70.00689697265625"/><col width="89.0120849609375"/><col width="225.99639892578125"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>模型</span></p></td><td style=" vertical-align: top"><p><span>维度</span></p></td><td style=" vertical-align: top"><p><span>适用语言</span></p></td><td style=" vertical-align: top"><p><span>特点</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>text-embedding-3-small</span><span>（OpenAI）</span></p></td><td style=" vertical-align: top"><p><span>1536</span></p></td><td style=" vertical-align: top"><p><span>多语言</span></p></td><td style=" vertical-align: top"><p><span>性价比高，适合大规模索引</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>text-embedding-3-large</span><span>（OpenAI）</span></p></td><td style=" vertical-align: top"><p><span>3072</span></p></td><td style=" vertical-align: top"><p><span>多语言</span></p></td><td style=" vertical-align: top"><p><span>精度最高，成本较高</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>BAAI/bge-m3</span></p></td><td style=" vertical-align: top"><p><span>1024</span></p></td><td style=" vertical-align: top"><p><span>中英文</span></p></td><td style=" vertical-align: top"><p><span>开源，中文效果优秀，支持多语言</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>sentence-transformers/all-MiniLM-L6-v2</span></p></td><td style=" vertical-align: top"><p><span>384</span></p></td><td style=" vertical-align: top"><p><span>英文</span></p></td><td style=" vertical-align: top"><p><span>体积小，速度快，适合本地极轻量部署</span></p></td></tr></tbody></table></div>


<a id="section-0576"></a>
## 相似度计算与 ANN 算法

<a id="t-2LDCgiPlEy7Zgox78Zj6Fy"></a>

<p id="t-hlX5IRCGiy9plG53m8o0p1"><span>检索的核心是度量距离。最常用的是</span><span style="font-weight:bold">余弦相似度（Cosine Similarity）</span><span>，它计算两个向量的夹角余弦值，值域 [-1, 1]，越接近 1 越相似。此外还有点积（Dot Product）和欧氏距离（L2 Distance）。</span></p>

<p id="t-HVcvfQ5GW5JKVnWA3wKKWn"><span>为了在百万级向量中实现毫秒级检索，数据库通常采用</span><span style="font-weight:bold">近似最近邻（ANN）算法</span><span>（如 </span><span style="font-weight:bold">HNSW</span><span>、IVF）。HNSW 是目前最主流的算法，它通过构建多层跳跃图网络，牺牲极少的精度换取了数量级的搜索速度提升。</span></p>


<a id="section-0577"></a>
## Advanced RAG (进阶架构)

<a id="t-jrO4ZJZ14uHSIGlqQStf2J"></a>

<p id="t-LSZwfI8OLDvHirh3Gzdqzm"><span>基础架构（Naive RAG）常面临检索不准确、冗余信息多导致"上下文淹没"等问题。Advanced RAG 通过</span><span style="font-weight:bold">预检索优化 → 检索融合 → 后检索优化</span><span>的三段式架构予以解决。</span></p>


<a id="section-0578"></a>
## 预检索：查询优化

<a id="t-6lGxiAlFLedQvTdsxcNbaK"></a>

<p id="t-gOUK4aCptUh5P1VTRv77Qy"><span>用户的原始问题往往表达不够精确：</span></p>

<ul><li id="t-jYFO9njWLKrBVMZYCvzHpH"><span style="font-weight:bold">查询改写（Query Rewriting）</span><span>：用 LLM 将口语化提问改写为规范化的检索词。</span></li></ul>

<ul><li id="t-vePY6iXlvIl9DZB2ms9S1F"><span style="font-weight:bold">HyDE（Hypothetical Document Embedding）</span><span>：让 LLM 先"盲猜"一个假设性答案，由于生成的答案通常比原问题包含更多行业术语，用这个假设答案的向量去检索，往往能召回更高质量的文档。</span></li></ul>


<a id="section-0579"></a>
## 混合检索（Hybrid Search）

<a id="t-AEm3HQ2mHtubZDcHfOulc3"></a>

<p id="t-cLnIpY1s4OJk4kbje4KeYh"><span>将</span><span style="font-weight:bold">向量检索</span><span>（懂语义，容错率高）与</span><span style="font-weight:bold">关键词检索</span><span>（BM25，匹配度高）的结果按权重融合。这在遇到专有名词、产品型号、代码片段时尤为重要，因为传统的向量检索容易在特定的专有名词上"翻车"。</span></p>


<a id="section-0580"></a>
## 后检索优化：重排序（Reranking）

<a id="t-dtsw24QTNr5haKFjWykAba"></a>

<p id="t-NPJ04MHTcrpVUiphnNRJwM"><span>这是一个</span><span style="font-weight:bold">粗排 → 精排</span><span>的两阶段设计。向量检索虽然快，但打分不够精确。重排序（Reranking）会引入 </span><span style="font-weight:bold">Cross-Encoder 模型</span><span>（如 `bge-reranker`），将"问题"和"文档"成对输入模型进行联合推理打分。它的运算量大，只负责精选 Top-20 到 Top-5。</span></p>


<a id="section-0581"></a>
## 实例：重排序流程伪代码

<a id="t-ldQTdm41xdr557cvm2ACF1"></a>

<pre id="t-5LIJQbzTVy8L8Ega2esSZp"><code>from sentence_transformers import CrossEncoder

reranker = CrossEncoder("BAAI/bge-reranker-v2-m3")

# 1. 粗排：向量检索极速召回 Top-50
candidates = vector_store.similarity_search(query, k=50)

# 2. 精排：构建 [问题, 文档] 对进行精确打分
pairs = [[query, doc.page_content] for doc in candidates]
scores = reranker.predict(pairs)

# 3. 筛选最终传入 LLM 的 Top-5
ranked_docs = sorted(zip(scores, candidates), reverse=True)
final_docs = [doc for _, doc in ranked_docs[:5]]</code></pre>


<a id="section-0582"></a>
## Self-RAG 与 CRAG（修正式 RAG）

<a id="t-d63L4Aj1aAP5ltQstOYiO8"></a>

<p id="t-KpouuYLR3s4a7iaEaTNiDw"><span>加入自我反思机制。例如 CRAG（Corrective RAG）在拿到检索结果后，先由 LLM 充当"评委"打分。如果本地知识库查无此文或质量极低，系统会自动触发 Web Search（如 Google API）作为补充，大幅降低幻觉。</span></p>


<a id="section-0583"></a>
## GraphRAG：知识图谱 + 检索融合

<a id="t-0KoNoIVbn18FxxwudRcARf"></a>

<p id="t-g3DdJam0AfOS76fgOnRai7"><span>传统 RAG 将知识库当作独立的文本碎片，无法回答诸如"找到所有同时由现任 CEO 创办且市值超千亿的公司"这类需要</span><span style="font-weight:bold">跨文档、多跳推理</span><span>的复杂问题。</span><span style="font-weight:bold">GraphRAG</span><span> 引入知识图谱（Knowledge Graph），将实体和关系显式建模。</span></p>

<div id="t-YSe5cdgxxvFGp6zT2WqHyi"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/7e711c5c5029e812f578007c.png"/></div>


<a id="section-0584"></a>
## GraphRAG 核心步骤

<a id="t-UTAfe9NbPvCTrORqFHeFMa"></a>

<ol start="1"><li id="t-WfM9gylL5SAF3uv5vrPeYx"><span style="font-weight:bold">知识构建</span><span>：离线阶段使用 LLM 从文档提取三元组（主体、关系、客体），写入 Neo4j 等图数据库。</span></li></ol>

<ol start="2"><li id="t-CkBxeCMP6eREfSzIFenuNK"><span style="font-weight:bold">双路检索</span><span>：针对提问中的实体，不仅做传统的向量检索，同时在图谱中触发图遍历（Graph Traversal），提取多跳关系链。</span></li></ol>

<ol start="3"><li id="t-LDC1HwIcToQGfdqtRA95SQ"><span style="font-weight:bold">图文融合生成</span><span>：将向量检索找回的"片段"与图检索找回的"路径结构"拼装进 Prompt，使得 LLM 既具备全局视野又掌握具体细节。</span></li></ol>

<blockquote id="t-cA1A1gR4rp8j9y4eMzch7w"><p id="t-1zg4wjokf27NbxGt3Hu3un"><span style="font-style:italic">GraphRAG 内容参考：</span><span style="font-style:italic">https://www.runoob.com/ai-agent/graphrag-usage.html</span></p></blockquote>


<a id="section-0585"></a>
## 技术与数据库选型建议

<a id="t-vt8Ad698ZWmjtRt6BuzkCy"></a>

<div id="t-ZlptgConHv6CmRSgycbGzo"><table><colgroup><col width="120"/><col width="120"/><col width="391.8992919921875"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>数据库/工具选型</span></p></td><td style=" vertical-align: top"><p><span>类型</span></p></td><td style=" vertical-align: top"><p><span>推荐落地场景</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="font-weight:bold">Pinecone / Zilliz Cloud</span></p></td><td style=" vertical-align: top"><p><span>全托管云服务</span></p></td><td style=" vertical-align: top"><p><span>开箱即用，不想维护基础设施。搭配 Cohere Rerank + GPT-4o 是最快商用的方案。</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="font-weight:bold">Qdrant</span></p></td><td style=" vertical-align: top"><p><span>开源 + 托管</span></p></td><td style=" vertical-align: top"><p><span>Rust 编写，内存管理优秀，性能极高。适合企业级私有化部署。</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="font-weight:bold">Weaviate / Elasticsearch</span></p></td><td style=" vertical-align: top"><p><span>开源 + 托管</span></p></td><td style=" vertical-align: top"><p><span>自带极其成熟的 BM25 + 向量混合检索（Hybrid Search），专有名词较多的场景首选。</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="font-weight:bold">Milvus</span></p></td><td style=" vertical-align: top"><p><span>开源分布式</span></p></td><td style=" vertical-align: top"><p><span>适合十亿至百亿级别的超大规模企业级检索平台。</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="font-weight:bold">Chroma / FAISS</span></p></td><td style=" vertical-align: top"><p><span>本地库/嵌入式</span></p></td><td style=" vertical-align: top"><p><span>极轻量，无需部署独立服务。非常适合本地开发、个人知识库项目验证。</span></p></td></tr></tbody></table></div>


<a id="section-0586"></a>
## RAG 评估指标（RAGAS 框架）

<a id="t-Q0Vu3snjK3NqY1QNJSaEyp"></a>

<p id="t-viIZnObdiuMmJvAa9q91GV"><span>RAG 系统的评估不能仅凭直觉，主流使用 </span><span style="font-weight:bold">RAGAS</span><span> 框架，从"检索"和"生成"两个维度进行自动化量化测试：</span></p>

<ul><li id="t-dBhRed2CFTItd2ez2hWLDK"><span style="font-weight:bold">Context Recall（检索召回率）</span><span>：标准答案中的信息有多少比例能被检索到。</span></li></ul>

<ul><li id="t-rhe5WLsZXOabTpTjtNgVGC"><span style="font-weight:bold">Context Precision（检索精确率）</span><span>：检索到的文档中有多少比例是真正相关的。</span></li></ul>

<ul><li id="t-D3qkUFKV1oDjqTMdQmGdVI"><span style="font-weight:bold">Faithfulness（忠实度/幻觉指标）</span><span>：生成的答案是否都有检索出的文档支撑。</span></li></ul>

<ul><li id="t-3oGllkghWzJ1UfWD5WV0p6"><span style="font-weight:bold">Answer Relevance（答案相关性）</span><span>：生成的答案是否真正回答了用户的问题，避免答非所问。</span></li></ul>


<a id="section-1218"></a>
## RAG从入门到精通

<a id="t-block-19884"></a>

<div id="t-D5qmmy1iWx7bIBXfNpUsks"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/a14448ee1b58ba76ad3bf7b7.png"/></div>


<a id="section-1219"></a>
## RAG的整体架构设计

<a id="t-jQvAQCl4Fx5RHqI1uoCMul"></a>

<p id="t-BiMUcB0Eu45lZRPWxhu6iy"><span style="border-bottom:1px solid;background-color:#ffeead">在深入细节之前，我们先来看看RAG的全貌。我画了一张完整的架构图，咱们一起来拆解：</span></p>

<div id="t-BkOguB2ZQ7u2cYxzoIN7Rn"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/23d8fffa0c97f74ecab5acbf.png"/></div>


<a id="section-1220"></a>
## 架构图说明

<a id="t-CLOe9MXdab3DarHvXfg9mS"></a>

<div id="t-Zcrpz1seDGBfWEanooaKPK"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/2c9849c51eaf22923807c366.png"/></div>

<p id="t-hOaJV52JVYyh3UQ0eAbWlY"><span>这张图展示了RAG系统的完整流程，从左到右分为四个核心阶段：</span></p>

<ol start="1"><li id="t-HFzLHlVpKTmY3OuC1WKP1Y"><span style="font-weight:bold">数据准备阶段</span><span>（左侧蓝色区域）：把你的文档、数据库等各种知识源准备好</span></li></ol>

<ol start="2"><li id="t-vbAXvSCbhTbKdpuZIhdKJU"><span style="font-weight:bold">索引构建阶段</span><span>（浅蓝色区域）：把这些知识"消化"成机器能快速查找的格式</span></li></ol>

<ol start="3"><li id="t-hVWpJ5ipgIEqqK5qvTc0oK"><span style="font-weight:bold">检索阶段</span><span>（橙色区域）：用户问问题时，快速找到相关的知识</span></li></ol>

<ol start="4"><li id="t-EbGxWf4cryt5SC3FU9vrj1"><span style="font-weight:bold">生成阶段</span><span>（绿色区域）：结合找到的知识和问题，生成靠谱的答案</span></li></ol>

<p id="t-Ij2S4ndkiDeAZcgCBk7MS6"><span style="font-weight:bold;background-color:#ffeead">这就像你在图书馆找资料写论文：</span></p>

<ul><li id="t-S1nmTfF2A3MeP5Fba1chFp"><span style="font-weight:bold">数据准备</span><span> = 图书馆的藏书</span></li></ul>

<ul><li id="t-CddqLW9Uloj0QcJjtwCi5m"><span style="font-weight:bold">索引构建</span><span> = 图书分类和目录卡</span></li></ul>

<ul><li id="t-ZN0D6pTQBwyrYgZvJdMAO6"><span style="font-weight:bold">检索</span><span> = 你根据关键词找书</span></li></ul>

<ul><li id="t-GVTvYalXJQKYeACRaUi3mp"><span style="font-weight:bold">生成</span><span> = 你看着书写论文</span></li></ul>


<a id="section-1221"></a>
## 一、概览

<a id="t-X1yzJTRdnuSZVflkXNKutj"></a>

<div id="t-49LzQYvGIVD7eLbeLxV2uT"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/b1420682e25501b99ecab1bf.png"/></div>


<a id="section-1222"></a>
## Overview（RAG是什么？）

<a id="t-CVzWpZOST8tGQUEDFwlqE9"></a>

<p id="t-v5IrxBUT32bbNAOuIaUQF8"><span>RAG全称是Retrieval-Augmented Generation，中文叫"检索增强生成"。听起来有点学术，咱们用大白话解释：</span></p>

<p id="t-Tkz1xaKCsTWMyHdEQxfMNw"><span style="font-weight:bold">传统</span><span style="font-weight:bold">LLM</span><span style="font-weight:bold">的问题：</span><span> 想象你养了一只鹦鹉（LLM），它很聪明，能流利地说话。但问题是，它只会说训练时学到的话，而且：</span></p>

<ul><li id="t-UG4k7MQsyxAtRRyAGY7SuV"><span>如果你问它昨天的新闻，它不知道（知识过时）</span></li></ul>

<ul><li id="t-0TwfbE35FUd11T9S9kP2du"><span>如果你问它你公司的内部规定，它也不知道（没见过的知识）</span></li></ul>

<ul><li id="t-Gk5x4bbRFP04obYJ8yqIcS"><span>有时候它还会"胡编乱造"，一本正经地瞎说（幻觉问题）</span></li></ul>

<p id="t-Q33k20esW8bohMJqoSPj9O"><span style="font-weight:bold">RAG的解决方案：</span><span> 给这只鹦鹉配一个助手，助手手里拿着一堆资料。每次你提问时：</span></p>

<ol start="1"><li id="t-JYchB5C4YXSMhDirzW9Ul8"><span>助手先翻资料，找到相关内容</span></li></ol>

<ol start="2"><li id="t-aFnrv8GBEPLpzvQV4jzLjX"><span>把资料递给鹦鹉œ</span></li></ol>

<ol start="3"><li id="t-iKtmquN9cDgw5OvitHbNbq"><span>鹦鹉看着资料回答问题</span></li></ol>

<p id="t-SQumoMEAedqXOIfErqy0S3"><span>这样，鹦鹉的回答就有理有据了！</span></p>

<p id="t-RM0Yx5xQkM1NdZpqtoOtAo"><span>RAG技术通过将检索机制与生成模型结合，使LLM能够从外部知识源获取相关文档并基于这些文档生成答案，从而解决了传统LLM的知识过时、缺乏领域知识和幻觉等问题。</span></p>

<div id="t-ZeFk1uV8z7MCpkvar5DYku"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/3933ec575070eca6207f15d8.png"/></div>

<p id="t-9hmJ3UYrmcUXhhQ77v6jps"><span style="font-weight:bold">RAG的核心优势：</span></p>

<div id="t-0pSLjxOfnbo5uPk13UMAdp"><table><colgroup><col width="156.89755249023438"/><col width="252.899169921875"/><col width="290.0015869140625"/></colgroup><tbody><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">特性</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">传统LLM</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">RAG系统</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">知识更新</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">需要重新训练（成本高）</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">只需更新知识库（成本低）</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">事实准确性</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">容易产生幻觉</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">基于检索到的真实文档</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">领域适应</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">需要微调模型</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">添加领域文档即可</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">可追溯性</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">无法追溯来源</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">可以标注来源和引用</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">成本</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">训练和部署成本高</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">相对经济实惠</span></p></td></tr></tbody></table></div>

<p id="t-l2AZcTd3rN6vlu0Kn2pdf9"><span style="font-weight:bold">举个实际例子：</span></p>

<blockquote id="t-qJxHbZVuinkbWycdQxm7Gp"><span>假设你在做一个医疗问答系统：</span><span>
用户问："阿司匹林的常见副作用是什么？"</span><span>
传统LLM可能回答：</span><span>
"阿司匹林可能导致胃部不适、恶心等。(但不确定是否完整或最新)"</span><span>
RAG系统的工作流程：</span><span>
检索系统在医学数据库中搜索"阿司匹林 副作用"</span><span>
找到3篇相关医学文献</span><span>
提取关键信息：胃肠道反应、出血风险、过敏反应等</span><span>
LLM基于这些文献生成答案：</span><span>
"根据医学文献，阿司匹林的常见副作用包括：</span><span>
胃肠道反应（胃痛、恶心、消化不良）</span><span>
出血风险增加</span><span>
过敏反应（如荨麻疹）</span><span>
  参考来源：[文献1]、[文献2]"</span></blockquote>

<p id="t-NHxWlc7kXdPRP2haN6pLGe"><span>看到区别了吗？RAG不仅更准确，还能告诉你信息来源！</span></p>


<a id="section-1223"></a>
## Indexing（索引构建：把知识装进&quot;大脑&quot;）

<a id="t-UgTBm9xrLvhrTGFp7mRcF2"></a>

<p id="t-qhsT247IBOZ2ljUhn4T5ad"><span>索引构建是RAG的"预处理"阶段，就像你上学前要先整理笔记、做好书签一样。这个阶段要把原始文档转化成机器能快速检索的格式。</span></p>

<div id="t-E15SOu3UrLQ9b8FIAraZDD"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/6130a4ad7327fd0b283b9852.png"/></div>

<a id="t-LGuniVvwspjheOJ6w0NRAw"></a>

##### 数据获取（Data Ingestion）

<p id="t-vRgS42jAPTNsVJAKvhseN8"><span>第一步是收集数据，可能来自：</span></p>

<ul><li id="t-lcmIl5slvSs9w9bnZuBoYG"><span>📄 PDF、Word、Markdown等文档</span></li></ul>

<ul><li id="t-yoquMJF9mCEd76uGvZCVe5"><span>🌐 网页、Wiki</span></li></ul>

<ul><li id="t-hCT7EQC3qQ6PY6tNZDzCK1"><span>💾 数据库</span></li></ul>

<ul><li id="t-Lf9f1GOeE3ZRA1CyuI8iZL"><span>📧 邮件、聊天记录</span></li></ul>

<ul><li id="t-uosjhciUoooeNWkdE5I6Pp"><span>📊 Excel、CSV等结构化数据</span></li></ul>

<p id="t-KmryD1TZYLPQGImosxKrdq"><span style="font-weight:bold">实际案例：</span><span> 某电商公司想做客服机器人，他们需要收集：</span></p>

<ul><li id="t-uxQjIKiCooliP5iPDij4Rl"><span>产品说明文档（PDF）</span></li></ul>

<ul><li id="t-Zf2OyYEuIorSNozWhBqjZR"><span>常见问题</span><span>FAQ</span><span>（网页）</span></li></ul>

<ul><li id="t-VK49SXDoEVKfOI8N0Hzsld"><span>历史工单数据（数据库）</span></li></ul>

<ul><li id="t-nUFd4dUtoRSvQ4Sudt9aLI"><span>退换货政策（Word文档）</span></li></ul>

<a id="t-Kh6rW6T0TdnVBfd6fpzZnI"></a>

##### 文档预处理（Preprocessing）

<p id="t-HYfQgsUXUfERF3bqnn09hj"><span>拿到原始数据后，需要"清洗"一下：</span></p>

<pre id="t-XgMnhy4AFmRXJYPsSfAGn4"><code>#示例：文档预处理代码
def preprocess_document(doc):
 # 1. 移除多余的空格和换行
    doc = re.sub(r'\s+', ' ', doc)
 # 2. 提取纯文本（从PDF、HTML等）
 if doc_type == 'pdf':
        text = extract_text_from_pdf(doc)
 # 3. 规范化格式
    text = text.strip().lower()
 # 4. 去除无用信息（页眉、页脚等）
    text = remove_headers_footers(text)
 return text</code></pre>

<a id="t-q3LPEnI4U85WlJpadSDrEd"></a>

##### 文档分块（Chunking）

<p id="t-KsaIKSAsQGTKIVR7BjwQuE"><span>这是最关键的一步！为什么要分块？</span></p>

<p id="t-RGW47dVAqcL7cuBWgdkpmH"><span style="font-weight:bold">想象一下：</span><span> 你有一本500页的《红楼梦》，如果有人问"林黛玉是谁"，你不可能把整本书都递给他看吧？你会翻到介绍林黛玉的那几页。</span></p>

<p id="t-gv7XJI1KqRHBvHKxvHcP4M"><span>分块就是这个道理：</span><span style="font-weight:bold">把大文档切成小段，每段包含一个相对完整的语义单元</span><span>。</span></p>

<p id="t-2ts7njgxS9JxkdtW5Ht5p4"><span style="font-weight:bold">常见的分块策略：</span></p>

<ol start="1"><li id="t-t3Y079XtxeQwijZltIt68t"><span style="font-weight:bold">固定大小分块</span><span>（最简单，但可能切断语义）</span></li></ol>

<pre id="t-n6Ubf6qQ3olWgc5UT5b9fy"><code>#每300个字符一块
chunk_size = 300
chunks = [text[i:i+chunk_size] for i in range(0, len(text), chunk_size)]</code></pre>

<ol start="2"><li id="t-PPr7OTfa7MvXbYt5KUBxnh"><span style="font-weight:bold">句子分块</span><span>（按自然语言边界）</span></li></ol>

<pre id="t-jH6Qn4D85ZrZaFUOMciUQD"><code>#按句号、问号、感叹号分割
import nltk
sentences = nltk.sent_tokenize(text)
段落分块（保留逻辑结构）
#按换行符或段落标记分割
chunks = text.split('\n\n')
滑动窗口分块（带重叠，避免信息丢失）

chunk_size = 300
overlap = 50 # 重叠50字符
chunks = []
for i in range(0, len(text), chunk_size - overlap):
    chunks.append(text[i:i+chunk_size])</code></pre>

<p id="t-Fnfd3BNtyn228rDAnAlQky"><span style="font-weight:bold">分块的关键参数：</span></p>

<ul><li id="t-3o4lIasEFXmONeBH1eb18Z"><span>块大小（Chunk Size）</span></li></ul>

<ul><li id="t-nLJr8SzLNwfCcrKBs04Y7Q"><span>太小 → 语义不完整；太大 → 检索不精准</span></li></ul>

<ul><li id="t-jrEsZoWhkzGqW1xWXsLLde"><span>推荐：200-500 tokens（约150-400个汉字）</span></li></ul>

<ul><li id="t-li8HQLs5CjBPpnFnxSeete"><span>重叠（Overlap）</span></li></ul>

<ul><li id="t-cWIcTGjZW6qrdAXlpQknPC"><span>避免关键信息被切断</span></li></ul>

<ul><li id="t-G8t5Jkoz682OiXsmjwR4XN"><span>推荐：10-20% 的块大小</span></li></ul>

<p id="t-Jwsxh1IIVV0zhYsDle2hKE"><span style="font-weight:bold">举个例子：</span></p>

<pre id="t-mcz7LPcNa985ZcoOdpaghd"><code>原文：
阿司匹林是一种常用的解热镇痛药。它的主要作用包括：
解热：降低发烧体温
镇痛：缓解轻到中度疼痛
抗血小板：预防血栓形成

但是，阿司匹林也有副作用。常见的副作用包括：
胃肠道反应：胃痛、恶心
出血风险：特别是长期服用</code></pre>

<p id="t-flLzuJ2It4GCdTE4Xwe0G9"><span>分块后：</span></p>

<pre id="t-lOqCOFXdsiAXpqtACmj4Al"><code>Chunk 1: "阿司匹林是一种常用的解热镇痛药。它的主要作用包括：
         1. 解热：降低发烧体温
         2. 镇痛：缓解轻到中度疼痛
         3. 抗血小板：预防血栓形成"

Chunk 2: "阿司匹林的主要作用包括预防血栓形成。但是，阿司匹林也有副作用。
         常见的副作用包括：
         1. 胃肠道反应：胃痛、恶心
         2. 出血风险：特别是长期服用"</code></pre>

<p id="t-uMZHV9KotuR3ev0OZK8qal"><span style="background-color:#ffeead">注意Chunk 2有重叠，这样即使用户搜"副作用"，也能同时看到"作用"相关的上下文。</span></p>

<a id="t-XL9DlzAFkfcRUYyEG6BnvN"></a>

##### 向量化（Embedding）

<p id="t-yP3Ji7aZA3Np0FlxRsMcft"><span>分块后的文本还是人类语言，机器不懂。我们需要把它转换成</span><span style="font-weight:bold">向量</span><span>（一串数字）。</span></p>

<p id="t-WvuzjPLyofZ9ZHGKfiILPn"><span style="font-weight:bold">什么是Embedding？</span></p>

<p id="t-CDAQNl7wVXcbLsIM3ec3WV"><span>把文字转换成数字向量，相似的文字会得到相似的向量。</span></p>

<pre id="t-IdkOyp3cL94yQS60U1SUDh"><code>#使用OpenAI的Embedding模型
from openai import OpenAI
client = OpenAI()

text = "阿司匹林是一种解热镇痛药"
response = client.embeddings.create(
    model="text-embedding-3-small",
 input=text
)
vector = response.data[0].embedding
print(f"向量维度: {len(vector)}") # 输出: 1536
print(f"前5个值: {vector[:5]}") # 输出: [0.023, -0.014, 0.089, ...]</code></pre>

<p id="t-7mbXnW5QCxprGcX8SlThJA"><span style="font-weight:bold">为什么需要向量化？</span></p>

<p id="t-3EgwgK6WM2pn44UGCKnMkp"><span>想象你在找"感冒药"，但文档里写的是"抗感冒药物"、"治疗感冒的药品"等各种说法。如果只靠关键词匹配，就找不到了。</span></p>

<p id="t-2wftPczk2aicRXTN0Xmpwv"><span>但是！如果用向量化：</span></p>

<pre id="t-vgLJpUHnfMsY4IbVOGdPeC"><code>"感冒药" → [0.1, 0.3, 0.5, ...]
"抗感冒药物" → [0.12, 0.29, 0.51, ...]  # 向量很接近！
"汽车" → [0.8, 0.1, 0.2, ...]  # 向量差很远</code></pre>

<p id="t-bqyMN12k0KSujafVXVcgzc"><span>向量之间可以计算</span><span style="font-weight:bold">相似度</span><span>（余弦相似度），数值越接近1越相似：</span></p>

<pre id="t-ARxVQj6TmX0yDLCE53K7FS"><code>from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

vec1 = np.array([0.1, 0.3, 0.5])
vec2 = np.array([0.12, 0.29, 0.51])
similarity = cosine_similarity([vec1], [vec2])[0][0]
print(f"相似度: {similarity:.3f}") # 输出: 0.999（非常相似）</code></pre>

<p id="t-X78RTMK21F6KmitAhqwH0L"><span style="font-weight:bold">常用的Embedding模型：</span></p>

<div id="t-lBxQXH5UsOiz9m6UiEWXI6"><table><colgroup><col width="185.8975524902344"/><col width="137.00341796875"/><col width="162.00341796875"/><col width="192.01202392578125"/></colgroup><tbody><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">模型</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">维度</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">优势</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">适用场景</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">OpenAI text-embedding-3-small</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">1536</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">效果好，速度快</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">通用场景</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">OpenAI text-embedding-3-large</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">3072</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">效果最好</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">高精度需求</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">BGE-large-zh</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">1024</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">中文效果好</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">中文为主</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">Sentence-BERT</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">768</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">开源免费</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">资源有限</span></p></td></tr></tbody></table></div>

<a id="t-pxHicdb7NxWAaX7Ok2fFRk"></a>

##### 存储到向量数据库

<p id="t-Pi3W15DS9xtqHYxUuaBbDH"><span>最后，把这些向量存起来，用专门的</span><span style="font-weight:bold">向量数据库</span><span>（Vector Database）。</span></p>

<p id="t-mmlVlBhjRFjgYU9prkLUnN"><span style="font-weight:bold">为什么不用普通数据库？</span></p>

<p id="t-n01Mi1admcd9SFSSM95lfx"><span>普通数据库（MySQL、MongoDB）擅长精确查询："找ID=123的记录"。但向量搜索是</span><span style="font-weight:bold">相似性查询</span><span>："找和[0.1, 0.3, 0.5]最相似的10个向量"。</span></p>

<p id="t-AIUx1SpMNhNL5tvGvgD177"><span>向量数据库用了特殊的索引算法（如HNSW、IVF），能在百万、千万级向量中毫秒级找到最相似的。</span></p>

<p id="t-Pp9kbmv3ljLUkZnPMaKjjn"><span style="font-weight:bold">常用向量数据库：</span></p>

<ol start="1"><li id="t-AyHwmjY7COQJMPWsldQIyp"><span style="font-weight:bold">Pinecone</span><span>（云服务，简单好用）</span></li></ol>

<pre id="t-3mKBEYlCf9pneMqxAceb8Y"><code>import pinecone

pinecone.init(api_key="your-api-key")
index = pinecone.Index("my-rag-index")

#插入向量
index.upsert([
 ("doc1_chunk1", vector1, {"text": "阿司匹林是..."}),
 ("doc1_chunk2", vector2, {"text": "副作用包括..."})
])

#查询
results = index.query(query_vector, top_k=3)</code></pre>

<ul><li id="t-6oAdEPsmyRHfQQfGAt4g7u"><span style="font-weight:bold">Milvus</span><span>（开源，功能强大）</span></li></ul>

<ul><li id="t-1q8Y1zQllzjQvxuZAB6aRH"><span style="font-weight:bold">FAISS</span><span>（Facebook开源，本地使用）</span></li></ul>

<ul><li id="t-2StI9kwi30U4gWrxgP8RJF"><span style="font-weight:bold">Weaviate</span><span>（支持混合搜索）</span></li></ul>

<p id="t-CiE3siEKz7koEpfBO5Q1zr"><span style="font-weight:bold">完整的索引构建代码示例：</span></p>

<pre id="t-IPgJ6EgUzVaxPNYCyR2E7C"><code>from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Pinecone
import pinecone

#1. 读取文档
with open("medical_docs.txt", "r") as f:
    document = f.read()

#2. 分块
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=50,
    separators=["\n\n", "\n", "。", "！", "？", "，"]
)
chunks = text_splitter.split_text(document)

#3. 初始化embedding模型
embeddings = OpenAIEmbeddings(model="text-embedding-3-small")

#4. 初始化向量数据库
pinecone.init(api_key="your-key")
index_name = "medical-rag"

#5. 创建索引并存储
vectorstore = Pinecone.from_texts(
    texts=chunks,
    embedding=embeddings,
    index_name=index_name
)

print(f"成功索引了 {len(chunks)} 个文本块！")</code></pre>

<p id="t-mMUz0Tm0NHxZSFze9q4mo0"><span>运行这段代码，你的知识库就建好了！就像给图书馆做好了电子目录。</span></p>


<a id="section-1224"></a>
## Retrieval（检索：快速找到相关知识）

<a id="t-Oj1v4rmuER8OOklYsW8Pgq"></a>

<p id="t-sbz41uzdsKrq8Pb8eutsOQ"><span>索引建好后，用户来提问了。检索阶段的任务是：</span><span style="font-weight:bold">从海量知识中快速找出最相关的那几条</span><span>。</span></p>

<div id="t-3f8Y9B8rEiMLD3CsRDFCUR"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/cff541da2031c2350c6f7e00.png"/></div>

<a id="t-JkhjIx0FooKQaL9spTfi6D"></a>

##### 查询处理

<p id="t-7pkbrvpdImLW70JswUR0ny"><span>用户输入的问题往往不是完美的搜索词。比如：</span></p>

<pre id="t-7BG15Y2rpjQaJj7QyVjbyZ"><code>用户原始问题："我吃了阿司匹林后胃疼怎么办？"

需要优化为：
"阿司匹林 胃痛 副作用"（关键词提取）
"阿司匹林导致的胃部不适如何处理"（问题改写）</code></pre>

<a id="t-k0eNwjqmcUnfAULjwD7VQj"></a>

##### 向量检索

<p id="t-FbHoQwdaeFWhxnTfKXYjUd"><span>把用户问题也转换成向量，然后在向量数据库中搜索：</span></p>

<pre id="t-GFNxphi6LvNEk2hwI90BSf"><code>#用户问题
question = "阿司匹林有哪些副作用？"

#问题向量化
question_embedding = embeddings.embed_query(question)

#向量检索（找最相似的3个）
results = vectorstore.similarity_search_by_vector(
    embedding=question_embedding,
    k=3 # 返回top3
)

for i, doc in enumerate(results):
 print(f"结果{i+1}:")
 print(doc.page_content)
 print(f"相似度: {doc.metadata['score']}")
 print("-" * 50)</code></pre>

<p id="t-7mCg7XN3kzzmz61vT4yywr"><span>输出示例：</span></p>

<pre id="t-qmuDF6zi6f2SeabNUvOc17"><code>结果1:
阿司匹林的常见副作用包括：1. 胃肠道反应：胃痛、恶心、消化不良...
相似度: 0.89
结果2:
长期服用阿司匹林可能增加出血风险，特别是胃肠道出血...
相似度: 0.85
结果3:
少数患者对阿司匹林过敏，可能出现荨麻疹、呼吸困难等症状...
相似度: 0.81</code></pre>

<a id="t-vW1UpR32nLTdOOwvp3rUOw"></a>

##### 检索策略

<p id="t-lEI76P68ZgDgxOhxP6LydC"><span>检索系统通常采用混合搜索方法，结合向量搜索（找语义相似的文档）和关键词搜索（精确匹配），然后对结果进行排序和过滤。</span></p>

<ol start="1"><li id="t-bPdQ83Qnu7kuowkLis53aU"><span style="font-weight:bold">单纯向量搜索</span></li></ol>

<ul><li id="t-5ZR3T4QsKbeycMLLvTBg48"><span>优点：能理解语义</span></li></ul>

<ul><li id="t-0mbPji6hvJtWvVmeScWS29"><span>缺点：对专有名词、数字等不敏感</span></li></ul>

<ol start="2"><li id="t-dEQ6eunZQqgSZM2txK5r3h"><span style="font-weight:bold">混合搜索（Hybrid Search）</span></li></ol>

<ul><li id="t-BqVoynXFmCeCHDeu2ywWFo"><span>向量搜索 + 关键词搜索</span></li></ul>

<ul><li id="t-oih1tFLCUYiobT4WI9RIch"><span>综合排序，取最优结果</span></li></ul>

<pre id="t-0Ufsucx8z8ltgV39MaEMPD"><code>#混合搜索示例
def hybrid_search(query, alpha=0.5):
 # alpha: 向量搜索权重（0-1）
 # 向量搜索结果
    vector_results = vectorstore.similarity_search(query, k=10)
 # 关键词搜索结果（BM25算法）
    keyword_results = bm25_search(query, k=10)
 # 融合排序
    final_results = merge_results(vector_results, keyword_results, alpha)
 return final_results[:3] # 返回top3</code></pre>

<ol start="3"><li id="t-EeKV9v1WLj5T6IiDztIb2X"><span style="font-weight:bold">重排序（Re-ranking）</span></li></ol>

<p id="t-sTNUFuN5ve28bodJcpQYcl"><span>初步检索后，用更精细的模型重新排序，提高精度。</span></p>

<pre id="t-gbhartK2fdkcncdCHF0hwj"><code>from sentence_transformers import CrossEncoder

#加载重排序模型
reranker = CrossEncoder('cross-encoder/ms-marco-MiniLM-L-6-v2')

#对检索结果重新打分
query = "阿司匹林副作用"
candidate_docs = ["文档1内容", "文档2内容", "文档3内容"]

scores = reranker.predict([(query, doc) for doc in candidate_docs])

#按分数排序
ranked_docs = [doc for _, doc in sorted(zip(scores, candidate_docs), reverse=True)]</code></pre>

<a id="t-iKwn6GKdzkVlplstC6NM8E"></a>

##### 检索效果评估指标

<p id="t-ssE4NdvepGq10q6U8LVBgv"><span>怎么知道检索效果好不好？</span></p>

<div id="t-F9lp0A5S9oYZYYQuggefWU"><table><colgroup><col width="120"/><col width="200.90081787109375"/><col width="179.0067138671875"/><col width="105.01025390625"/></colgroup><tbody><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">指标</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">含义</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">公式</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">目标</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">Recall@K</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">前K个结果中，包含多少相关文档</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">检索到的相关文档数 / 总相关文档数</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">越高越好</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">Precision@K</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">前K个结果中，有多少是相关的</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">相关文档数 / K</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">越高越好</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">MRR</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">第一个相关文档的排名倒数</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">1 / 第一个相关文档的排名</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">越高越好</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">NDCG</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">考虑排序质量的综合指标</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">复杂公式</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">越高越好</span></p></td></tr></tbody></table></div>


<a id="section-1225"></a>
## Generation（生成：基于知识产生答案）

<a id="t-Iac5R9lomCgsIRJdhQyn2d"></a>

<p id="t-LcQ7Buc4uk4uLUs2VVUZdv"><span>检索到相关文档后，最后一步就是生成答案！</span></p>

<div id="t-6ZK3xOJrbtXAPSbCJ8XAFf"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/44c5c7a3f2bcb32cedc2c107.png"/></div>

<a id="t-CPOb2uPYrzaGx1TwZ3Th7a"></a>

##### 提示词构建（Prompt Engineering）

<p id="t-lxHz14viq2OI4FmlIXTytD"><span>把检索到的文档和用户问题组合成一个完整的提示词（Prompt），发给LLM。</span></p>

<p id="t-28pPUl64kvxmqx8JDPRQCQ"><span style="font-weight:bold">基础模板：</span></p>

<pre id="t-d2l4DzQJig629zru5WsBoI"><code>prompt_template = """
你是一个专业的医疗助手。请基于以下参考资料回答用户的问题。
如果参考资料中没有相关信息，请明确告知用户。

参考资料：
{context}

用户问题：
{question}

请提供详细、准确的回答，并标注信息来源。
"""

#填充内容
context = "\n\n".join([doc.page_content for doc in retrieved_docs])
question = "阿司匹林有哪些副作用？"

prompt = prompt_template.format(context=context, question=question)</code></pre>

<p id="t-sOy1mEGoV0XUH4QJdPt6D9"><span style="font-weight:bold">进阶模板（结构化输出）：</span></p>

<pre id="t-IkCRAa5Q7B3nZad2L0K4pJ"><code>advanced_prompt = """
参考资料：
{context}

用户问题：{question}

请按以下格式回答：
直接回答：用1-2句话概括答案
详细说明：展开解释，分点列出
注意事项：相关的警告或建议
信息来源：标注参考了哪些资料

回答：
"""</code></pre>

<a id="t-X8l53imhWPhMXqUItWFvQ9"></a>

##### 调用LLM生成

<pre id="t-WhU7TMbZ5RPrnYVNqgksyS"><code>from openai import OpenAI

client = OpenAI()

response = client.chat.completions.create(
    model="gpt-4",
    messages=[
 {"role": "system", "content": "你是一个专业的医疗助手"},
 {"role": "user", "content": prompt}
 ],
    temperature=0.3, # 降低随机性，提高准确性
    max_tokens=500
)

answer = response.choices[0].message.content
print(answer)</code></pre>

<a id="t-K92uiyCvAjteUdT6rJWwre"></a>

##### 答案后处理

<p id="t-VTUhNztYPW50QSy7o5WwAI"><span>生成答案后，可能还需要：</span></p>

<ol start="1"><li id="t-P11w2eZUsQYI7QdDBuPo5U"><span style="font-weight:bold">引用标注</span><span>：给答案加上来源链接</span></li></ol>

<pre id="t-3VgzTTDATV6IKBPiHhxqso"><code>def add_citations(answer, sources):
 """给答案添加引用"""
 for i, source in enumerate(sources):
        answer += f"\n[{i+1}] {source['title']} - {source['url']}"
 return answer</code></pre>

<ol start="2"><li id="t-QAe0OVaUmjK18WaoEIYzx7"><span style="font-weight:bold">安全过滤</span><span>：检查答案是否包含有害内容</span></li></ol>

<pre id="t-sr1egTMeLVx022NvmupryH"><code>def safety_check(answer):
    harmful_keywords = ["自杀", "违法", "...]
 for keyword in harmful_keywords:
 if keyword in answer:
 return "抱歉，这个问题涉及敏感内容，建议咨询专业人士。"
 return answer</code></pre>

<ol start="3"><li id="t-zqSarFB1QXnupoNlQbYYfh"><span style="font-weight:bold">格式美化</span><span>：Markdown格式化、表格化等</span></li></ol>

<a id="t-FMmqOYPqOOW6DQvOtVj4Dp"></a>

##### 完整的RAG生成代码

<pre id="t-s4rHeUaynbvUryRMZqOFst"><code>def rag_query(question):
 """完整的RAG查询流程"""
 # 1. 检索相关文档
    retrieved_docs = vectorstore.similarity_search(question, k=3)
 # 2. 构建prompt
    context = "\n\n".join([
 f"【文档{i+1}】{doc.page_content}"
 for i, doc in enumerate(retrieved_docs)
 ])
    prompt = f"""
    参考以下资料回答问题：
 {context}
    问题：{question}
    要求：
    1. 回答要准确、专业
    2. 必须基于参考资料
    3. 标注信息来源
    """
 # 3. 调用LLM生成
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.3
 )
    answer = response.choices[0].message.content
 # 4. 添加引用
    sources = [
 {"title": f"文档{i+1}", "score": doc.metadata.get('score', 0)}
 for i, doc in enumerate(retrieved_docs)
 ]
 return {
 "answer": answer,
 "sources": sources,
 "retrieved_docs": [doc.page_content for doc in retrieved_docs]
 }

#使用示例
result = rag_query("阿司匹林有哪些副作用？")
print("答案:", result['answer'])
print("\n参考来源:", result['sources'])</code></pre>

<a id="t-Bxk1dsdx5MHR9t171Uyvxu"></a>

##### 生成效果评估

<p id="t-8hjgTuThU2BjDYuKuiLmjh"><span>RAG系统的生成质量评估需要考虑准确性、相关性和忠实度等多个维度，确保模型生成的答案既准确又能体现检索到的上下文信息。</span></p>

<div id="t-Xo9wZv3PephSMBhUrdVTz4"><table><colgroup><col width="120"/><col width="248.89752197265625"/><col width="287.89752197265625"/></colgroup><tbody><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">指标</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">评估内容</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">评估方法</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">Faithfulness</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">答案是否忠实于检索文档</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">LLM评判 / 人工标注</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">Relevance</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">答案是否回答了问题</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">LLM评判 / 相似度计算</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">Coherence</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">答案是否流畅连贯</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">语言模型困惑度</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">Groundedness</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">答案是否有依据</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">检查是否有引用</span></p></td></tr></tbody></table></div>

<p id="t-u0Yr5SMGm4rPV13OwUKF1h"><span>最近在做大模型项目的时候，发现很多同学对RAG的理解还停留在"检索+生成"这个表面概念上。但实际上，RAG是一个</span><span style="font-weight:bold">超级复杂的系统工程</span><span>，涉及到的优化点多达几十个。</span></p>

<p id="t-dDyDS4PfaZNmzVNk11m064"><span>就像你开了一家餐厅，不是说有食材（数据）和厨师（大模型）就够了，你还得考虑：</span></p>

<ul><li id="t-Ody6y7RTN6BQcTvByBNJRK"><span>食材怎么切（Chunking）？</span></li></ul>

<ul><li id="t-rjuci43Ywm9hpHFldjDqj4"><span>调料怎么配（Embedding）？</span></li></ul>

<ul><li id="t-FX4DAUCuLLNXLg9LVuSDJF"><span>菜单怎么设计（Query优化）？</span></li></ul>

<ul><li id="t-EGsBxfqWR9fh9smvu4P7As"><span>上菜顺序怎么安排（Re-ranking）？</span></li></ul>

<ul><li id="t-NwkgwdofBk1cxnyffFAZXP"><span>顾客满意度怎么评估（效果评估）？</span></li></ul>


<a id="section-1227"></a>
## 技术知识与案例补充

<p id="t-djB1MHm0fNc1trAWUSlphS"><span>先说个真实场景：用户问"阿司匹林怎么吃？"</span></p>

<p id="t-MurICRV0r1UsWRyglpuZGY"><span>你的RAG系统可能只检索到"阿司匹林 用法"相关的文档，但其实用户真正想问的可能是：</span></p>

<ul><li id="t-ky2ThIPlg3C19xNecDRpY0"><span>阿司匹林的</span><span style="font-weight:bold">剂量</span><span>是多少？</span></li></ul>

<ul><li id="t-5kK34o1Asr78cNuBQmzn9l"><span>什么</span><span style="font-weight:bold">时间</span><span>吃效果最好？</span></li></ul>

<ul><li id="t-2oMybnwxaIm2gnwEvNG0Di"><span>有什么</span><span style="font-weight:bold">禁忌</span><span>和</span><span style="font-weight:bold">副作用</span><span>？</span></li></ul>

<ul><li id="t-DuDvcYCO2Xkej5FCAnK9CY"><span style="font-weight:bold">哪些人群</span><span>不适合吃？</span></li></ul>

<p id="t-OJQkeCjtsi5B2rY5XUF4Ad"><span>看到了吧？一个简单的问题背后，其实藏着好几个子问题。如果你只用原始问题去检索，很可能漏掉关键信息。</span></p>

<p id="t-o4SPtedJUIEUzAUse2pqvc"><span style="font-weight:bold">这就是为什么要优化提问！</span><span> 通过对用户问题进行改写、扩展、分解，我们可以：</span></p>

<ol start="1"><li id="t-hEU0JPX9StM3nteGbzRlLK"><span>✅ 提高检索的召回率（找到更多相关内容）</span></li></ol>

<ol start="2"><li id="t-tcLp89zMockz2B5bKYmLSA"><span>✅ 覆盖问题的多个维度</span></li></ol>

<ol start="3"><li id="t-jQpbiCqMl8uDoVJyE7E5o6"><span>✅ 减少歧义和理解偏差</span></li></ol>


<a id="section-1228"></a>
## Multi Query - 多查询策略

<a id="t-2NLO473o7eo72YtVTytACl"></a>

<a id="t-ESy1PD0INQzCKPSOXz1USL"></a>

##### 核心思想

<p id="t-V1zUxSDeLqvgP9x1fuPZwV"><span style="font-weight:bold">一个问题，多种问法。</span></p>

<p id="t-l1HJxk4XVjxiHQSMZ7o1KL"><span>就像你去问路，同一个目的地，可以这样问：</span></p>

<ul><li id="t-PisbUYJrbVQnCZXSLmIeSG"><span>"天安门怎么走？"</span></li></ul>

<ul><li id="t-ik3Ghi8jQNcD0HVljIgOwy"><span>"去天安门广场的路线？"</span></li></ul>

<ul><li id="t-z7KDfljdwIclTVSHymy6oE"><span>"从这里到天安门的交通方式？"</span></li></ul>

<p id="t-qdZNJnunDrqmNBUDt6voSL"><span>虽然表达不同，但目的一样。Multi Query就是让大模型生成多个语义相似但表达不同的查询，然后用这些查询去检索，最后合并结果。</span></p>

<a id="t-W1gqRkDG9OqIjZDNva1IOX"></a>

##### 工作流程

<ol start="1"><li id="t-HN8KB0keYtMaGj6TAnjYcE"><span style="font-weight:bold">输入原始问题</span><span>：用户问"Python如何处理JSON数据？"</span></li></ol>

<ol start="2"><li id="t-ugCihSYYwWo3Wm2zPJIu5G"><span>LLM生成多个查询</span></li></ol>

<ol start="3"><li id="t-ddqXqy9WURsC6aUFvHxxr2"><span>：</span></li></ol>

<div id="t-wJhU9Ow8iPgp9o83qtAPQs" style="display:flex;gap:0.5em"><span style="min-width:1.5em">a.</span><div><span>Query 1: "Python解析JSON的方法"</span></div></div>

<div id="t-HsodIMgUFUrAf9VDh5sXwR" style="display:flex;gap:0.5em"><span style="min-width:1.5em">b.</span><div><span>Query 2: "如何在Python中读取JSON文件"</span></div></div>

<div id="t-LAJuqIa7xKAYBu1NRZDZMZ" style="display:flex;gap:0.5em"><span style="min-width:1.5em">c.</span><div><span>Query 3: "Python JSON模块使用教程"</span></div></div>

<div id="t-ZkSlWbrezj1gFLSaX4R4ED" style="display:flex;gap:0.5em"><span style="min-width:1.5em">d.</span><div><span>Query 4: "Python处理JSON格式数据的最佳实践"</span></div></div>

<ol start="4"><li id="t-PWIqTx01vOzsRAUvFFAxcy"><span style="font-weight:bold">并行</span><span style="font-weight:bold">检索</span><span>：用这4个查询同时去向量数据库检索</span></li></ol>

<ol start="5"><li id="t-2wYMIa4trP2EvNyKnjbw0x"><span style="font-weight:bold">结果合并</span><span>：把4次检索的结果去重、排序，得到最终结果</span></li></ol>

<a id="t-biPVgfFfvmHUMwu4qMbFlY"></a>

##### 优势分析

<div id="t-Vsv41Te4uSrkzmRnRknMsR"><table><colgroup><col width="170.89755249023438"/><col width="391.89752197265625"/></colgroup><tbody><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">优势</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">说明</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">🎯 提高召回率</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">不同表达方式能匹配到更多相关文档</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">🔍 覆盖多角度</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">从不同角度理解同一个问题</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">💪 鲁棒性强</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">即使某个查询效果不好，其他查询也能补救</span></p></td></tr></tbody></table></div>

<a id="t-JnfUmhsavM5mArKfzzWyN8"></a>

##### 实际案例

<pre id="t-cZWd2bw7EaVAru225FiXOt"><code>#伪代码示例
original_query = "如何提高代码执行效率？"

#LLM生成多个查询
multi_queries = llm.generate_queries(original_query, num_queries=4)
#输出：
#["代码性能优化技巧",
#"提升程序运行速度的方法",
#"如何让代码跑得更快",
#"代码执行效率优化最佳实践"]

#并行检索
all_results = []
for query in multi_queries:
    results = vector_db.search(query, top_k=5)
    all_results.extend(results)

#去重合并
final_results = deduplicate_and_rank(all_results)</code></pre>

<a id="t-SoWxXjUJE3O8SwOlBAPyXc"></a>

##### 注意事项

<p id="t-WsrlyuLnn9KMB0VxVz7UnE"><span>⚠️ </span><span style="font-weight:bold">不是查询越多越好！</span><span> 一般3-5个查询就够了，太多会：</span></p>

<ul><li id="t-JpMCfB80WZqo6k8VV8zglF"><span>增加API调用成本</span></li></ul>

<ul><li id="t-EQNDas7wpKzLznAxibga34"><span>增加检索时间</span></li></ul>

<ul><li id="t-t7iY7B1N7QIa3WthmoIylR"><span>可能引入噪声</span></li></ul>

<a id="t-IheusIr7PAHDpj9vljN2qs"></a>

##### 架构图

<div id="t-KVh6eYlapZ04xMK23qi1jT"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/f856a6ff8fb03f1ba936043e.png"/></div>

<p id="t-6rT5qvggGAhsoUfjglWPYN"><span>从图中可以清晰看到：</span></p>

<ol start="1"><li id="t-LklBA7ceu2nVkODG0acGGr"><span>原始问题经过LLM改写生成4个不同表达的查询</span></li></ol>

<ol start="2"><li id="t-WXP1XHXQNR1pWSyISXRXro"><span>每个查询独立进行向量检索，获取Top-5结果</span></li></ol>

<ol start="3"><li id="t-2qr6Zwi5GQc1y7WDAzuGbL"><span>最后将4组结果合并、去重、重新排序</span></li></ol>


<a id="section-1229"></a>
## RAG-Fusion - 多查询结果融合策略

<a id="t-0TVxgVH3Y1RZfGLqmdX1vN"></a>

<a id="t-6oGUypR9napPjaQT0YURS8"></a>

##### 核心思想

<p id="t-mzgxA2NOxBZEzdspmXpgfY"><span>RAG-Fusion是Multi Query的</span><span style="font-weight:bold">进化版</span><span>，不仅生成多个查询，还使用了</span><span style="font-weight:bold">倒数排序融合（Reciprocal Rank Fusion, RRF）</span><span>算法来合并结果。</span></p>

<p id="t-T377WoqHEK1ge7LsplN9Ba"><span>简单说：</span><span style="font-weight:bold">不是简单粗暴地把结果堆一起，而是科学地给每个结果打分，让真正重要的文档排在前面。</span></p>

<a id="t-XrEjNtWwH1lztMEYJX6Yzn"></a>

##### 什么是RRF？

<p id="t-uQzygS4JT7eFKfXxxt7GW9"><span>举个例子，假设你问3个朋友推荐餐厅：</span></p>

<p id="t-gXzs3gm6v21DiUbUycB2ah"><span style="font-weight:bold">朋友A的推荐排序：</span></p>

<ol start="1"><li id="t-yu94SI7dScYnL73ZuZWtwX"><span>海底捞</span></li></ol>

<ol start="2"><li id="t-5YMEjxx2WTYoR90esZSLJL"><span>外婆家</span></li></ol>

<ol start="3"><li id="t-m3lbgkmEwP9DxRGGuIxvGl"><span>西贝</span></li></ol>

<p id="t-v6dZpqVae0Xg2nCN57vvLe"><span style="font-weight:bold">朋友B的推荐排序：</span></p>

<ol start="1"><li id="t-SIH1TvOS4dolJxuQkGV8zx"><span>外婆家</span></li></ol>

<ol start="2"><li id="t-D0sBiugUY9EbwGeawWubrr"><span>海底捞</span></li></ol>

<ol start="3"><li id="t-I0gc3KJ3cCeIYeV1RpRZ1Z"><span>必胜客</span></li></ol>

<p id="t-fRhSEOWL9Xt04P1sKWAZeA"><span style="font-weight:bold">朋友C的推荐排序：</span></p>

<ol start="1"><li id="t-sXWSfLG8Mvals0vOyfDLfp"><span>西贝</span></li></ol>

<ol start="2"><li id="t-hjHTzLCjd2I0Fy8L8bvVfS"><span>外婆家</span></li></ol>

<ol start="3"><li id="t-47Kj2LzdDDCC0CCvWhda12"><span>肯德基</span></li></ol>

<p id="t-ummx08BglZnhIm7ZvSTraO"><span>如果用</span><span style="font-weight:bold">简单</span><span style="font-weight:bold">投票</span><span>，海底捞2票，外婆家3票，西贝2票... 但这样有问题：外婆家虽然被提到3次，但在A那里是第2名，不是第1名。</span></p>

<p id="t-y3RMqdmCqsXiCrMKCjAhwY"><span style="font-weight:bold">RRF算法</span><span>会这样算：</span></p>

<p id="t-8WbfEdpl7osGzqdkGFGYtT"><span>对于每个餐厅，计算它在各个列表中的倒数排名分数：</span></p>

<p id="t-Eivd2PLg7o4VjD1ddtJcGw"><span>其中：</span></p>

<ul><li id="t-yJYDaZYjbssxTzZT7rUNxV"><span>是文档（餐厅）</span></li></ul>

<ul><li id="t-SbuH7QkKOqsUc9PMwY71Z0"><span>是所有查询结果列表</span></li></ul>

<ul><li id="t-bZDetRbuqvl4a3fb3MCRYW"><span>是文档在列表r中的排名</span></li></ul>

<ul><li id="t-hpxYydxNkRd2M1PZ41SSQ9"><span>是常数（通常取60）</span></li></ul>

<p id="t-MQO7Xmb3a0lyw8MUXlkOlw"><span style="font-weight:bold">计算海底捞的分数：</span></p>

<ul><li id="t-Dnp7ILWKOxgsblhfC2n2bd"><span>在A的列表：排名1 →</span></li></ul>

<ul><li id="t-FhproqyoFDYEunSRVFbdD1"><span>在B的列表：排名2 →</span></li></ul>

<ul><li id="t-FsWU3xpnEVyaNxubQeLuqN"><span>在C的列表：没出现 →</span></li></ul>

<ul><li id="t-e7FeIS8kIki2HUkmZGX5H8"><span style="font-weight:bold">总分：0.0325</span></li></ul>

<p id="t-ipXxn755irE8amKXVROdeC"><span style="font-weight:bold">计算外婆家的分数：</span></p>

<ul><li id="t-cbm13ahsMaqqm2guFdnwPT"><span>在A的列表：排名2 →</span></li></ul>

<ul><li id="t-7dWNzMaSrXr9voe1IgpJJb"><span>在B的列表：排名1 →</span></li></ul>

<ul><li id="t-u5Sr0k5fAULMvZYPRl3Kd2"><span>在C的列表：排名2 →</span></li></ul>

<ul><li id="t-JTIR1mLYUgk77Ew2sz6Aio"><span style="font-weight:bold">总分：0.0486</span></li></ul>

<p id="t-OI1CVnt3aAC4gnPaEUjzKs"><span style="font-weight:bold">计算西贝的分数：</span></p>

<ul><li id="t-Sa8V7Niehst5elp7rQJRvk"><span>在A的列表：排名3 →</span></li></ul>

<ul><li id="t-aisnI6mk6aYLiCtgFDQJ9f"><span>在B的列表：没出现 →</span></li></ul>

<ul><li id="t-hfzkjHii1sftqfvZFynUjy"><span>在C的列表：排名1 →</span></li></ul>

<ul><li id="t-nKnkkmUQxyYLVoDxsBUrj2"><span style="font-weight:bold">总分：0.0323</span></li></ul>

<p id="t-HbPlCcT0mEKZmHg8kX7sNL"><span style="font-weight:bold">最终排序：外婆家(0.0486) &gt; 海底捞(0.0325) &gt; 西贝(0.0323)</span></p>

<p id="t-4svS8iJHeWnBomGSFT7XIi"><span>看到了吧？外婆家虽然没拿过第1名，但因为</span><span style="font-weight:bold">出现频率高且排名都靠前</span><span>，所以综合得分最高！</span></p>

<a id="t-WEphUIf4hr3ZOpFCFWmls8"></a>

##### RAG-Fusion工作流程

<ol start="1"><li id="t-ON3vaMxuzG4FPonfsbyxY2"><span style="font-weight:bold">生成多个查询</span><span>（和Multi Query一样）</span></li></ol>

<ol start="2"><li id="t-JWuN4HlA0wnMf7c80iyIzi"><span style="font-weight:bold">并行</span><span style="font-weight:bold">检索</span><span>（和Multi Query一样）</span></li></ol>

<ol start="3"><li id="t-ucaCuYTImIFndrM5oMr0nF"><span style="font-weight:bold">使用RRF算法融合结果</span><span>（这是关键！）</span></li></ol>

<ol start="4"><li id="t-7UAd2zZUnvbFPpMkq3IR9T"><span style="font-weight:bold">返回重新排序后的Top-K文档</span></li></ol>

<div id="t-FIBCH6lW7BG5k7BAd7k5ob"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/359d32802edde25540f6b41a.png"/></div>

<a id="t-BnyfOeIvxeFayYTkuxtFOW"></a>

##### 代码示例

<pre id="t-X1QlrOry3gj5ufJ2sYGdQp"><code>def reciprocal_rank_fusion(search_results_dict, k=60):
 """
    使用倒数排序融合算法合并多个搜索结果
    Args:
        search_results_dict: {query: [(doc_id, score), ...]}
        k: RRF常数，默认60
    Returns:
        融合后的排序结果
    """
    fused_scores = {}
 for query, doc_scores in search_results_dict.items():
 for rank, (doc_id, score) in enumerate(doc_scores, start=1):
 if doc_id not in fused_scores:
                fused_scores[doc_id] = 0
 # RRF公式
            fused_scores[doc_id] += 1 / (k + rank)
 # 按融合分数降序排序
    reranked_results = sorted(
        fused_scores.items(),
        key=lambda x: x[1],
        reverse=True
 )
 return reranked_results

#使用示例
search_results = {
 "query1": [("doc1", 0.95), ("doc2", 0.88), ("doc3", 0.82)],
 "query2": [("doc2", 0.92), ("doc1", 0.87), ("doc4", 0.80)],
 "query3": [("doc3", 0.90), ("doc2", 0.85), ("doc1", 0.78)]
}

final_ranking = reciprocal_rank_fusion(search_results)
print(final_ranking)
#输出：[('doc2', 0.0486), ('doc1', 0.0479), ('doc3', 0.0320), ('doc4', 0.0161)]</code></pre>

<a id="t-qBgXqsharJkosy5ZZsUYec"></a>

##### 为什么RRF这么有效？

<div id="t-ordYXrXz05cIzo1Tgz2z2x"><table><colgroup><col width="136.90274047851562"/><col width="275.0050048828125"/><col width="297.89752197265625"/></colgroup><tbody><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">特点</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">说明</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">举例</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">🎯 位置敏感</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">排名越靠前，分数增益越大</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">第1名和第2名的差距 &gt; 第10名和第11名</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">🔢 频率奖励</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">出现次数多的文档会累积更高分数</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">被3个查询都检索到的文档会加分</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">⚖️ 公平性</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">不依赖原始相似度分数，避免不同模型打分偏差</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">不同embedding模型的分数可以直接比较</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">🛡️ 鲁棒性</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">即使某个查询效果差，也不会严重影响整体</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">一个差查询的影响会被稀释</span></p></td></tr></tbody></table></div>

<a id="t-zKSHsy3iGYBRevnMZOSmse"></a>

##### 实际效果对比

<p id="t-jzAzYtvmBiPrGM1wq1gEJM"><span>假设我们要回答："Python异步编程的优势是什么？"</span></p>

<p id="t-S3aV8dUj5hCtr1nYa7zCfn"><span style="font-weight:bold">普通Multi </span><span style="font-weight:bold">Query</span><span style="font-weight:bold">（简单合并）：</span></p>

<ul><li id="t-1m9Az5j1IMH31sBurrsOsZ"><span>结果包含很多重复文档</span></li></ul>

<ul><li id="t-gGiL9zIm64Zw7g7PlVXePK"><span>排序不一定科学</span></li></ul>

<ul><li id="t-jnyYYjy1J2Z1q054MnHzn7"><span>Top-5可能都来自同一个查询</span></li></ul>

<p id="t-Tuo9zySJpvLiZjavnhIMxM"><span style="font-weight:bold">RAG-Fusion（RRF融合）：</span></p>

<ul><li id="t-bSVDhIuDiprZjDx046hpI7"><span>去重且智能排序</span></li></ul>

<ul><li id="t-PyT3aReHBLMzGlOiUsN0uO"><span>综合考虑所有查询的反馈</span></li></ul>

<ul><li id="t-GPVIbIyqdilQ33dKlJ4Zri"><span>Top-5结果更多样化、更全面</span></li></ul>

<a id="t-FTnclUC6DBQFs57Q9tXWU5"></a>

##### 注意事项

<p id="t-maeyvX10TtAwtsVfhGJDTC"><span>✅ </span><span style="font-weight:bold">适用场景：</span></p>

<ul><li id="t-X0SCJlVTFOE7VZfgUFESXw"><span>用户问题比较复杂，需要多角度检索</span></li></ul>

<ul><li id="t-O24mxAa05bqY4xRKQN42Gd"><span>对召回率要求高的场景</span></li></ul>

<ul><li id="t-V5MHoF79DFYxplYfSLvgro"><span>希望结果多样性的场景</span></li></ul>

<p id="t-zJClGmrlzDMO0KJd4Qtgei"><span>❌ </span><span style="font-weight:bold">不适用场景：</span></p>

<ul><li id="t-V8l6e93sdvdScwmY5xaTKf"><span>简单的事实查询（浪费资源）</span></li></ul>

<ul><li id="t-WhDg5n8ti9iiZBXJUNa7pg"><span>实时性要求极高的场景（会增加延迟）</span></li></ul>

<ul><li id="t-Pr7IMdNhcXXr6dCdCULqaO"><span>资源受限的环境（多次LLM调用 + 多次检索）</span></li></ul>

<a id="t-Bpgi8goVnMjdcjGsW9Rrml"></a>

##### 架构图

<div id="t-1vmetdvziGjLpdMQzhw8tv"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/17defcedbca9c13f3232c5b9.png"/></div>

<p id="t-6UlC7DuslfzL4asZXuhAKd"><span>从图中可以看到：</span></p>

<ol start="1"><li id="t-y4RqqF0WCwzZISMOcpEJZu"><span style="font-weight:bold">左半部分</span><span>是标准的Multi Query流程</span></li></ol>

<ol start="2"><li id="t-VRCIab6YJIPXxk6HNxnXJ0"><span style="font-weight:bold">右半部分</span><span>展示了RRF算法如何计算每个文档的融合分数</span></li></ol>

<ol start="3"><li id="t-qrHPZgQtvAsaL0WiDRinhS"><span style="font-weight:bold">底部对比表</span><span>清晰说明了RRF相比简单合并的优势</span></li></ol>


<a id="section-1230"></a>
## Decomposition - 问题分解策略

<a id="t-NHDWCfOd6aAMg6TgkaUSSZ"></a>

<a id="t-anY2Zq6qEGlPDf1V5MXfW9"></a>

##### 核心思想

<p id="t-0Tlzdu62Rlqz2xrfPcjExJ"><span style="font-weight:bold">把一个复杂问题拆解成多个简单的子问题，逐个击破！</span></p>

<p id="t-uH7S59jO6qhp0uxsGjbxs5"><span>就像你要做一道菜"红烧肉"，你不会一步到位，而是：</span></p>

<ol start="1"><li id="t-NQe95sENCqlAct0Od0IvDE"><span>先准备食材（买肉、调料）</span></li></ol>

<ol start="2"><li id="t-9mIAkSTMR2c2pllAmV77iO"><span>处理食材（切块、焯水）</span></li></ol>

<ol start="3"><li id="t-926clEG78Lu8wlfltClMBh"><span>烹饪步骤（煎、炖、收汁）</span></li></ol>

<ol start="4"><li id="t-B8RGvm0WFlyIfMV0qxZElM"><span>摆盘装饰</span></li></ol>

<p id="t-Yd9bj1tSEhI94qeiECk760"><span>每一步都简单明确，组合起来就是一道完美的菜。</span></p>

<a id="t-msFxwuW9jin0hxc1KvxSZC"></a>

##### 为什么需要问题分解？

<p id="t-YOfr5u6SvEALYqrea4A2mm"><span>很多用户的问题其实是</span><span style="font-weight:bold">复合型问题</span><span>，包含多个信息需求。</span></p>

<p id="t-vv0EfnZwOZd5fg4IdaavHB"><span style="font-weight:bold">举个例子：</span></p>

<p id="t-NOfHpv4ilbSB7cAZ2DgMPs"><span>用户问："我想知道北京和上海的房价对比，以及各自的购房政策和未来发展趋势。"</span></p>

<p id="t-o6pY5fFP3BNjq6Mzt9HqF3"><span>这个问题其实包含了：</span></p>

<ol start="1"><li id="t-fkbXhvQtKeKj4snOB4va05"><span>北京的房价水平</span></li></ol>

<ol start="2"><li id="t-MaTmunxaZq0FpxQq3eTIU0"><span>上海的房价水平</span></li></ol>

<ol start="3"><li id="t-MFpzRW6sq0tDAzUQvk1klQ"><span>北京的购房政策</span></li></ol>

<ol start="4"><li id="t-2GWo8ZOWAaW2jX50UMM6bQ"><span>上海的购房政策</span></li></ol>

<ol start="5"><li id="t-jLsW6apfNyLDkuLTVze9ik"><span>北京的未来发展趋势</span></li></ol>

<ol start="6"><li id="t-k0FcsKnj6Jd1fTXczlW3Le"><span>上海的未来发展趋势</span></li></ol>

<p id="t-eixHJX7hRwMti9z9EcE2b7"><span>如果你直接用原始问题去检索，可能会：</span></p>

<ul><li id="t-OsPvBU4WLZ04pEuaDE5uQv"><span>❌ 检索结果太泛，不精准</span></li></ul>

<ul><li id="t-xngsL7n6AQioXh82Cn3Z9y"><span>❌ 有些子问题的答案被遗漏</span></li></ul>

<ul><li id="t-v0zb7R0i4W4Mys4yCcd0UE"><span>❌ 大模型在综合回答时逻辑混乱</span></li></ul>

<p id="t-5KONHjroptHm2DhXbsYLZF"><span style="font-weight:bold">使用问题分解后：</span></p>

<ul><li id="t-VCRdZtPXf1G6kSfYHdn5el"><span>✅ 每个子问题独立检索，精准度更高</span></li></ul>

<ul><li id="t-mtPENuF2Qsw6WJBRLV8alG"><span>✅ 覆盖全面，不会遗漏信息</span></li></ul>

<ul><li id="t-NnfuMdSkYfXzeFRLvUuYaZ"><span>✅ 最后综合所有子答案，回答更有条理</span></li></ul>

<a id="t-MNmjNES15sAteulNVpPTMo"></a>

##### 工作流程

<pre id="t-3TfQ5UqEnd3kRBBZVDkI3q"><code>原始问题
    ↓
LLM分解为子问题
    ↓
并行检索每个子问题
    ↓
获得每个子问题的答案
    ↓
LLM综合所有子答案，生成最终回答</code></pre>

<a id="t-oOjHQttWSQbxFcVV8UnomN"></a>

##### 实际案例

<p id="t-oXB7kTgt7KxHtZfDD62qVn"><span style="font-weight:bold">原始问题：</span><span> "如何搭建一个高性能的RAG系统？需要考虑哪些技术选型和优化策略？"</span></p>

<p id="t-D8clG3A0FcSkUyzMKl6miN"><span style="font-weight:bold">LLM</span><span style="font-weight:bold">分解后：</span></p>

<pre id="t-Bwvu8wK3CQThSoGuccPzf7"><code>子问题列表 = [
    "1. RAG系统的核心组件有哪些？",
    "2. 如何选择合适的向量数据库？",
    "3. Embedding模型如何选型？",
    "4. 文档分块(Chunking)的最佳实践是什么？",
    "5. 如何优化检索性能？",
    "6. 生成阶段有哪些优化技巧？"
]</code></pre>

<p id="t-3saL3nhn9666jyYGPCu1AY"><span style="font-weight:bold">针对每个子问题进行检索和回答：</span></p>

<div id="t-h3RLFoGbQDVAcsMiyttFSo"><table><colgroup><col width="182.8975524902344"/><col width="228.89752197265625"/><col width="301.89752197265625"/></colgroup><tbody><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">子问题</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">检索到的关键信息</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">子答案</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">1. 核心组件</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">数据处理、向量化、存储、检索、生成</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">RAG系统包含5大模块...</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">2. 向量数据库选型</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">Pinecone、Milvus、FAISS对比</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">根据规模选择：小规模用FAISS...</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">3. Embedding模型</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">OpenAI、BGE、M3E性能对比</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">中文场景推荐BGE-large-zh...</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">4. Chunking策略</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">固定长度、语义分块、滑动窗口</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">建议使用语义分块+重叠...</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">5. 检索优化</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">Re-ranking、混合检索、缓存</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">可以采用Re-ranking提升精度...</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">6. 生成优化</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">Prompt工程、温度调节、流式输出</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">设计明确的Prompt模板...</span></p></td></tr></tbody></table></div>

<p id="t-kZEN1iTsjXjTA7LA0HCn57"><span style="font-weight:bold">最终综合答案：</span><span> "搭建高性能RAG系统需要从以下几个方面考虑：首先，系统包含数据处理、向量化、存储、检索、生成5大核心模块。在技术选型上，小规模项目可以用FAISS作为向量数据库，中大规模建议Milvus或Pinecone；Embedding模型中文场景推荐BGE-large-zh。在优化策略上，Chunking建议采用语义分块并设置50-100 token重叠；检索阶段可以引入Re-ranking提升精度；生成阶段要设计明确的Prompt模板并适当调节温度参数..."</span></p>

<p id="t-KvHze7hG0jOesd1TtYiwSj"><span>看到了吧？</span><span style="font-weight:bold">通过分解，我们得到了一个结构清晰、内容全面的答案！</span></p>

<a id="t-F0UXAEXYckja22H7cWnxIU"></a>

##### 代码实现

<pre id="t-5VyigqLn8LHy7jlRtQDXSH"><code>from langchain.llms import OpenAI
from langchain.prompts import PromptTemplate

#步骤1: 问题分解
decompose_prompt = PromptTemplate(
    template="""
    请将以下复杂问题分解为3-6个简单的子问题。
    每个子问题应该独立且可以单独回答。
    原始问题: {question}
    请以JSON列表格式输出子问题:
    ["子问题1", "子问题2", "子问题3", ...]
    """,
    input_variables=["question"]
)

llm = OpenAI(temperature=0.7)

original_question = "如何搭建一个高性能的RAG系统？需要考虑哪些技术选型和优化策略？"

#分解问题
sub_questions = llm(decompose_prompt.format(question=original_question))
sub_questions = json.loads(sub_questions)

#步骤2: 对每个子问题进行RAG检索和回答
sub_answers = []
for sub_q in sub_questions:
 # 检索相关文档
    relevant_docs = vector_db.search(sub_q, top_k=3)
 # 生成子答案
    answer_prompt = f"""
    基于以下文档，回答问题: {sub_q}
    文档内容:
 {relevant_docs}
    请简洁明确地回答:
    """
    sub_answer = llm(answer_prompt)
    sub_answers.append({
 "question": sub_q,
 "answer": sub_answer
 })

#步骤3: 综合所有子答案
synthesis_prompt = f"""
你是一个专业的技术专家。现在你需要基于以下子问题和对应的答案，
综合生成一个完整、有条理的回答。

原始问题: {original_question}

子问题和答案:
{json.dumps(sub_answers, ensure_ascii=False, indent=2)}

请生成一个结构清晰、逻辑连贯的最终答案:
"""

final_answer = llm(synthesis_prompt)
print(final_answer)</code></pre>

<a id="t-YmqEiFvXzubEyNyEnfgMxR"></a>

##### 三种常见的分解策略

<ol start="7"><li id="t-XXAm2y3vFvgQFnJLU3Aw2t"><span>顺序分解（Sequential Decomposition）</span></li></ol>

<p id="t-l9aCROPWVk1MZrZ0CCzZPz"><span style="font-weight:bold">适用场景：</span><span> 问题之间有先后依赖关系</span></p>

<p id="t-ts4S6NnyVTJsKQVKg8ivvw"><span style="font-weight:bold">例子：</span><span> "如何训练一个GPT模型并部署到生产环境？"</span></p>

<p id="t-7wUqIetTKk24KQiwckcoCw"><span>分解为：</span></p>

<ol start="8"><li id="t-E3rRhgrqUOgLM8mwIW8xQN"><span>准备训练数据 →</span></li></ol>

<ol start="9"><li id="t-qyeCCgIMDay7c16G7JpBL2"><span>选择模型架构 →</span></li></ol>

<ol start="10"><li id="t-1aauPdh7dEEtKuBrv4QexI"><span>训练模型 →</span></li></ol>

<ol start="11"><li id="t-zw4e95cQuyauKdcMTYTJvR"><span>模型评估 →</span></li></ol>

<ol start="12"><li id="t-AiJfWgMAru8HJR9w9c4QGJ"><span>模型优化 →</span></li></ol>

<ol start="13"><li id="t-3DzESRFm3aRyiorAMgRDlX"><span>部署上线</span></li></ol>

<p id="t-7Efl8lN6OqpLPA2jFwXroq"><span>每一步的答案会作为下一步的输入或参考。</span></p>

<ol start="14"><li id="t-5r1kOXQ5RHC2nrdiGQsRFP"><span>并行分解（Parallel Decomposition）</span></li></ol>

<p id="t-u9rL8oUjHr8oa8wAbroHGl"><span style="font-weight:bold">适用场景：</span><span> 子问题之间相互独立</span></p>

<p id="t-PvGQ3ELILqTPhL4cbnW7D6"><span style="font-weight:bold">例子：</span><span> "比较PyTorch和TensorFlow的优缺点"</span></p>

<p id="t-SQZZw1QJcEXgEpBJloWMPu"><span>分解为：</span></p>

<ul><li id="t-ufgofoxIuR137IaAeGxUtO"><span>PyTorch的优点</span></li></ul>

<ul><li id="t-Z1oU8JLdLJA2I5bn0RFzcZ"><span>PyTorch的缺点</span></li></ul>

<ul><li id="t-PouhntgL97sIFS9hLE3PP3"><span>TensorFlow的优点</span></li></ul>

<ul><li id="t-4Q6F1rJ13bvUtevsj9V7Qs"><span>TensorFlow的缺点</span></li></ul>

<p id="t-MTvllKmG2XDaEP0d9yC78f"><span>这些子问题可以</span><span style="font-weight:bold">同时检索</span><span>，提高效率。</span></p>

<ol start="15"><li id="t-cTMWnlyAU3jVpvrjBqq8HE"><span>层次分解（Hierarchical Decomposition）</span></li></ol>

<p id="t-8mqCtvDw6IE1Tszb4iAshi"><span style="font-weight:bold">适用场景：</span><span> 问题有多个层级</span></p>

<p id="t-gzcVHYqBTYfhjkDyjNrPyF"><span style="font-weight:bold">例子：</span><span> "如何设计一个电商推荐系统？"</span></p>

<p id="t-4BD13CPDot4CAtEle5N4hq"><span>第一层分解：</span></p>

<ul><li id="t-Byxxj1kyOPruPijw7LMKVp"><span>数据层</span></li></ul>

<ul><li id="t-1LsLP1JKDvl8bEH1Z4JKtx"><span>算法层</span></li></ul>

<ul><li id="t-rpApuyfWGnXmqhJb1XI5KO"><span>工程层</span></li></ul>

<p id="t-eSiLrg4AJwDiChGzl3EqCm"><span>第二层分解：</span></p>

<ul><li id="t-LTP4UMRZrFcUyFYjeWvnHu"><span>数据层 → 数据采集、数据清洗、特征工程</span></li></ul>

<ul><li id="t-LdAWdXfO50gDjlexyhkkkZ"><span>算法层 → 召回算法、排序算法、实时更新</span></li></ul>

<ul><li id="t-KvjzCOCyuYeNcvdwDedxO7"><span>工程层 → 系统架构、性能优化、监控告警</span></li></ul>

<a id="t-ZIXFrYHjNuuE3VuTPEtPcu"></a>

##### 优势分析

<div id="t-uR54MGQy7vEh6dJnjhAzxY"><table><colgroup><col width="205.8975524902344"/><col width="344.00506591796875"/></colgroup><tbody><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">优势</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">说明</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">🎯 精准检索</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">每个子问题更聚焦，检索准确度提升</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">📊 结构化回答</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">答案有条理，逻辑清晰</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">🔍 覆盖全面</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">不会遗漏关键信息点</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">🧠 减轻LLM负担</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">分而治之，每次生成任务更简单</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">⚡ 可并行处理</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">对于独立的子问题，可以并行检索加速</span></p></td></tr></tbody></table></div>

<a id="t-1XilS0m0c5aUbbeFlkrvnO"></a>

##### 注意事项

<p id="t-l6HjOvmGDUyJ8mD6E5bpLd"><span>⚠️ </span><span style="font-weight:bold">不是所有问题都需要分解！</span></p>

<p id="t-DHPVY1YtQqFxBEDdehnBur"><span style="font-weight:bold">适合分解的问题：</span></p>

<ul><li id="t-qFxnyuvA677dXSYGCvrrdA"><span>包含多个独立信息需求</span></li></ul>

<ul><li id="t-FtFQRibJT56Vq2UqDx8lWT"><span>需要对比分析</span></li></ul>

<ul><li id="t-Smp1B4kJ5ulWSsoHNKwcKB"><span>需要多步骤解答</span></li></ul>

<ul><li id="t-mvOIK6iY8mIUU0njyCVleo"><span>问题比较复杂抽象</span></li></ul>

<p id="t-yTr9YKCQl7iwn9DyiLo1K2"><span style="font-weight:bold">不适合分解的问题：</span></p>

<ul><li id="t-8VgvMFrOQocZDDObomk5kF"><span>简单的事实查询（"Python之父是谁？"）</span></li></ul>

<ul><li id="t-oAy6HCOopiSKh1784W42bk"><span>单一明确的问题（"2+2等于几？"）</span></li></ul>

<ul><li id="t-f3eaPltyCw03xPrU6l6q5A"><span>定义类问题（"什么是RAG？"）</span></li></ul>

<p id="t-kjeAEPM6lrxszyc2La0rg9"><span>💡 </span><span style="font-weight:bold">分解的粒度要适中：</span></p>

<ul><li id="t-xhNrCGYpkLus5XuE6hOD9c"><span>太粗：失去分解的意义</span></li></ul>

<ul><li id="t-UrBq1Asdt5D3gI6ziGfSoG"><span>太细：增加系统复杂度和延迟</span></li></ul>


<a id="section-1231"></a>
## Step Back问答回退策略

<a id="t-AiAEjsTUI8SkL7rOs6EYR6"></a>

<a id="t-l8H1QxAc4HZDRgk3ya4zr6"></a>

##### 什么是Step Back？

<p id="t-BgYU33raOQFSyY8nM2RUbA"><span>想象一下，你在图书馆找书，直接冲过去问管理员："2023年10月发布的那个新的React框架叫什么？"管理员一脸懵逼。但如果你先退一步问："最近有哪些新的React框架？"然后再缩小范围，是不是容易多了？</span></p>

<p id="t-fhXuxAvnE2QmMXO4iwTLwB"><span style="font-weight:bold">Step Back Prompting就是这个道理</span><span>——不直接回答具体问题，而是先生成一个更抽象、更通用的"回退问题"，从更高层次理解用户意图，然后再回答原问题。</span></p>

<a id="t-EmEBl4w1fAeYu5UZGMeNoR"></a>

##### 工作原理

<div id="t-FPTBt8GuVgxXN0IcB3wN3L"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/2fad49329791ad2711d68d3d.png"/></div>

<p id="t-7RundcLG4xqoSm3JjzXWzK"><span style="font-weight:bold">整个流程分三步走：</span></p>

<p id="t-15gjUIbD7ZuKCBeSkhy2KN"><span style="font-weight:bold">步骤1：抽象化（Abstraction）</span></p>

<pre id="t-KyTcmAb5p8gHcU6FanhpXL"><code>原问题：特斯拉Model 3在2023年Q4的销量是多少？
↓ Step Back
回退问题：特斯拉Model 3历年的销量趋势是怎样的？</code></pre>

<p id="t-JdvCK8Z9ScrUtftG8eYgl2"><span style="font-weight:bold">步骤2：检索（Retrieval）</span><span> 用回退问题去检索，能获取更广泛、更有上下文的信息。</span></p>

<p id="t-60V5Dg15oN89mYfAGdfBxd"><span style="font-weight:bold">步骤3：推理（Reasoning）</span><span> 结合回退问题的答案和原问题，生成更准确的回答。</span></p>

<a id="t-tsemhc2PgByc2O9q7fVjn5"></a>

##### 代码实现

<pre id="t-QmyM5FNQYYibElTPbRTdEY"><code>from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate

#Step 1: 定义Step Back提示词模板
step_back_template = """你是一个世界知识专家。你的任务是把具体问题转化为更通用的回退问题。

示例：
原问题：特斯拉Model 3在2023年Q4的销量是多少？
回退问题：特斯拉Model 3历年的销量趋势和数据有哪些？

原问题：张三在2020-2022年担任什么职位？
回退问题：张三的职业生涯发展轨迹是怎样的？

现在请处理这个问题：
原问题：{original_question}
回退问题："""

llm = ChatOpenAI(model="gpt-4", temperature=0.3)
step_back_prompt = ChatPromptTemplate.from_template(step_back_template)

#Step 2: 生成回退问题
def generate_step_back_question(original_q):
    chain = step_back_prompt | llm
    response = chain.invoke({"original_question": original_q})
 return response.content

#Step 3: 使用回退问题进行RAG检索
from langchain.vectorstores import FAISS
from langchain.embeddings import OpenAIEmbeddings

def step_back_rag(original_question, vectorstore):
 # 生成回退问题
    step_back_q = generate_step_back_question(original_question)
 print(f"📝 回退问题: {step_back_q}")
 # 用回退问题检索
    docs = vectorstore.similarity_search(step_back_q, k=5)
    context = "\n\n".join([doc.page_content for doc in docs])
 # 最终回答
    final_prompt = f"""基于以下上下文信息，回答问题。

上下文：
{context}

回退问题：{step_back_q}
原问题：{original_question}

请给出准确、详细的回答："""
    response = llm.invoke(final_prompt)
 return response.content

#使用示例
question = "DeepSeek在2024年1月发布的模型性能如何？"
answer = step_back_rag(question, my_vectorstore)
print(f"✅ 答案: {answer}")</code></pre>

<a id="t-HkC9aEIRxRDwrLCWRqd1vy"></a>

##### 实际效果对比

<div id="t-bSAQR8YRSOlA4LZzE046Gc"><table><colgroup><col width="120"/><col width="176.89752197265625"/><col width="140.005126953125"/><col width="195.005126953125"/></colgroup><tbody><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">方法</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">问题</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">检索到的文档质量</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">答案准确度</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">直接RAG</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">"2023年美国有多少位总统出生在美国？"</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">⭐⭐⭐</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">漏掉富兰克林·罗斯福</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">Step Back RAG</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">先问"美国历任总统的出生地信息"</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">⭐⭐⭐⭐⭐</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">100%准确</span></p></td></tr></tbody></table></div>

<a id="t-23mJLJGDkodj9kvxDfqdAq"></a>

##### 适用场景

<p id="t-OjyQxCz6CfvcftwYVVMmD8"><span>✅ </span><span style="font-weight:bold">非常适合：</span></p>

<ul><li id="t-mX0nWeNEzRGA32EUwtLCIr"><span>需要多步推理的复杂问题</span></li></ul>

<ul><li id="t-Ufbq8bHg5NaJZh6fvwqBjo"><span>时间序列相关查询（"最近"、"历年"、"趋势"）</span></li></ul>

<ul><li id="t-4AKvMDjeFBcNk3EUUljsDS"><span>需要理解高层概念的问题</span></li></ul>

<p id="t-qprcJW2a8pgqmtqbEce07E"><span>❌ </span><span style="font-weight:bold">不太适合：</span></p>

<ul><li id="t-RWHf1wo1eSeotyf1GevQz3"><span>简单的事实查询（"北京是中国的首都吗？"）</span></li></ul>

<ul><li id="t-vIczxxZJ4OJrbL3TNvNnCx"><span>需要实时数据的场景</span></li></ul>

<ul><li id="t-UgI2JmcpqxpGduM1ZzYLZu"><span>计算密集型任务</span></li></ul>


<a id="section-1232"></a>
## HyDE（假设性文档嵌入）

<a id="t-kJLrIGkx1duCMUYDIJbOYk"></a>

<a id="t-p0AWcKGc6z1agMAck2pJeQ"></a>

##### 核心思想

<p id="t-bThSM8D9x3410HysUvMc6y"><span>HyDE的脑洞真的很大！它不是直接拿用户问题去搜索，而是：</span></p>

<ol start="16"><li id="t-5QsASGZwMIL7h8JV01K2Wj"><span style="font-weight:bold">让</span><span style="font-weight:bold">LLM</span><span style="font-weight:bold">先"编"一个假的答案</span><span>（可能包含错误，但没关系）</span></li></ol>

<ol start="17"><li id="t-C8r5WuH4qr63sSlyg6x75C"><span style="font-weight:bold">把这个假答案转成向量</span></li></ol>

<ol start="18"><li id="t-o7esNcGVEY1M2R7lUwroUV"><span style="font-weight:bold">用假答案的向量去搜索真实文档</span></li></ol>

<p id="t-NIq74lKh59kP0AgW1g1lVC"><span>为啥这样能work？因为</span><span style="font-weight:bold">答案和答案之间的相似度，远高于问题和答案之间的相似度</span><span>！</span></p>

<a id="t-xhbcMauBvX2GkCiCwL1n6A"></a>

##### 工作流程图

<div id="t-HIFJXwszZ2zk96QxlG4NaE"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/4d30ab14f3b9726af5594ff5.png"/></div>

<a id="t-3tsJ6qbnWdwvqkpYL57rPz"></a>

##### 问题的本质

<p id="t-Zf3ewwQl7HS4bpBmtPs2yq"><span>传统RAG有个致命缺陷：</span><span style="font-weight:bold">查询-文档不对称</span></p>

<pre id="t-5Og4xwPnXcw7lUBwVB1eAa"><code>用户问题：Milvus是什么？ [向量维度: 1536]
         ↓ 余弦相似度 ↓
文档内容：Milvus是一个开源向量数据库，专为AI应用设计，
         支持十亿级向量的毫秒级检索... [向量维度: 1536]</code></pre>

<p id="t-zRhJANVzFQKToP382RCiji"><span>看起来很美好？NO！问题在于：</span></p>

<ul><li id="t-U1rfAy3iQYUb0IV2tabput"><span>问题通常很短（3-10个词）</span></li></ul>

<ul><li id="t-t7uSHGZAKoCWef8TlafOE0"><span>文档内容很长（几百个词）</span></li></ul>

<ul><li id="t-f2ZPYIlOccupSnisAVzCKQ"><span style="font-weight:bold">语义空间分布差异巨大</span></li></ul>

<p id="t-bi3H0p0AqBHWoqxOJdY3gl"><span>就像你拿着一张小纸条去图书馆找整本书，匹配度天然就低。</span></p>

<a id="t-Oyc5jPxgotu14KR4Uj6FuX"></a>

##### HyDE如何解决？

<pre id="t-Ux8bUHsis5Z7xoX0BnLOQo"><code>from langchain.llms import OpenAI
from langchain.embeddings import OpenAIEmbeddings
from langchain.chains import HypotheticalDocumentEmbedder
from langchain.vectorstores import FAISS

#Step 1: 初始化组件
llm = OpenAI(temperature=0.7)
base_embeddings = OpenAIEmbeddings()

#Step 2: 创建HyDE嵌入器
hyde_prompt_template = """请写一段文本来回答以下问题。
即使不确定，也请尽可能详细地生成一个假设性的答案。

问题：{question}
假设性文档："""

hyde_embeddings = HypotheticalDocumentEmbedder.from_llm(
    llm=llm,
    base_embeddings=base_embeddings,
    prompt_key="web_search" # 使用预定义模板
)

#Step 3: 构建向量库（使用HyDE嵌入）
documents = [
 "Milvus是一个云端向量数据库，用于大规模向量存储和检索。",
 "COVID-19疫情显著影响了心理健康，增加了抑郁和焦虑。",
 "人类使用火已有大约80万年的历史。"
]

vectorstore = FAISS.from_texts(documents, hyde_embeddings)

#Step 4: 查询（HyDE会自动生成假设文档）
query = "什么是Milvus？"
results = vectorstore.similarity_search(query, k=3)

for i, doc in enumerate(results):
 print(f"结果{i+1}: {doc.page_content}")</code></pre>

<a id="t-QHNeOzpMkNF9sHcVWx0ghy"></a>

##### 完整的HyDE实现（从零开始）

<pre id="t-UbW3mIG7Jmks5hEGCi0sWr"><code>import openai
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

class HyDERetriever:
 def __init__(self, llm_model="gpt-3.5-turbo", embedding_model="text-embedding-3-small"):
        self.llm_model = llm_model
        self.embedding_model = embedding_model
        self.doc_embeddings = []
        self.documents = []
 def generate_hypothetical_document(self, query, num_docs=3):
 """生成多个假设性文档"""
        prompt = f"""根据问题生成一个详细的假设性回答。
        即使不确定，也要写得像真实文档一样。
        问题：{query}
        假设性回答："""
        hypothetical_docs = []
 for _ in range(num_docs):
            response = openai.ChatCompletion.create(
                model=self.llm_model,
                messages=[{"role": "user", "content": prompt}],
                temperature=0.8, # 增加随机性获取多样性
                max_tokens=300
 )
            hypothetical_docs.append(response.choices[0].message.content)
 return hypothetical_docs
 def get_embedding(self, text):
 """获取文本嵌入"""
        response = openai.Embedding.create(
            model=self.embedding_model,
 input=text
 )
 return np.array(response['data'][0]['embedding'])
 def add_documents(self, documents):
 """添加文档到知识库"""
        self.documents = documents
        self.doc_embeddings = [self.get_embedding(doc) for doc in documents]
 def retrieve(self, query, top_k=5):
 """使用HyDE检索"""
 # 1. 生成假设性文档
        hypo_docs = self.generate_hypothetical_document(query, num_docs=3)
 print(f"🎭 生成的假设文档：\n{hypo_docs[0][:200]}...\n")
 # 2. 对假设文档做嵌入并平均
        hypo_embeddings = [self.get_embedding(doc) for doc in hypo_docs]
        avg_hypo_embedding = np.mean(hypo_embeddings, axis=0)
 # 3. 计算与真实文档的相似度
        similarities = [
            cosine_similarity([avg_hypo_embedding], [doc_emb])[0][0]
 for doc_emb in self.doc_embeddings
 ]
 # 4. 返回Top-K结果
        top_indices = np.argsort(similarities)[::-1][:top_k]
        results = [(self.documents[i], similarities[i]) for i in top_indices]
 return results, hypo_docs[0]

#使用示例
retriever = HyDERetriever()

#添加文档
knowledge_base = [
 "RAG（检索增强生成）是一种结合信息检索和生成模型的技术，通过从外部知识库检索相关信息来增强LLM的回答能力。",
 "向量数据库如Milvus、Pinecone专门用于存储和快速检索高维向量数据，是RAG系统的核心组件。",
 "Embedding模型将文本转换为高维向量表示，常用的有OpenAI的text-embedding-3、BGE、sentence-transformers等。"
]

retriever.add_documents(knowledge_base)

#检索
query = "如何提高RAG系统的检索准确率？"
results, hypo_doc = retriever.retrieve(query, top_k=3)

print("\n🔍 检索结果：")
for i, (doc, score) in enumerate(results):
 print(f"\n结果{i+1} (相似度: {score:.4f}):")
 print(f"{doc}")</code></pre>

<a id="t-rhpHO0nZsyS2icnuiC2e0d"></a>

##### 性能对比实验

<pre id="t-lqQqr5lFQzDHLi8obhxogN"><code>#对比测试：传统RAG vs HyDE
def compare_rag_vs_hyde(query, vectorstore):
 # 传统方法
    traditional_results = vectorstore.similarity_search(query, k=5)
 # HyDE方法
    hyde_results, _ = hyde_retriever.retrieve(query, top_k=5)
 return {
 "传统RAG": traditional_results,
 "HyDE": hyde_results
 }

#测试用例
test_queries = [
 "机器学习中的过拟合如何解决？",
 "Python中的装饰器是什么原理？",
 "微服务架构的优缺点有哪些？"
]

for q in test_queries:
    results = compare_rag_vs_hyde(q, my_vectorstore)
 print(f"\n问题：{q}")
 print("=" * 50)</code></pre>

<a id="t-YmQJhGx5laA7flpqXJuP6X"></a>

##### 实际效果数据

<p id="t-wYLIF4TqGRa3agHNu888Dx"><span>在</span><span style="font-weight:bold">BEIR</span><span style="font-weight:bold">基准测试</span><span>上的表现：</span></p>

<div id="t-Hb3DDASpp8dbJERNG7vZuu"><table><colgroup><col width="120"/><col width="120"/><col width="120"/><col width="120"/></colgroup><tbody><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">数据集</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">传统检索</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">HyDE</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">提升幅度</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">SciFact</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">66.20%</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">71.80%</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">0.085</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">TREC-COVID</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">68.50%</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">74.30%</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">0.085</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">NFCorpus</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">31.20%</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">33.90%</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">0.086</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">ArguAna</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">46.80%</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">52.10%</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">0.113</span></p></td></tr></tbody></table></div>

<a id="t-QlpfgjOyVngNO2LGoM2nkE"></a>

##### 优缺点分析

<p id="t-agtuPGU6ouCALNJEZVviHt"><span style="font-weight:bold">✅ 优势：</span></p>

<ul><li id="t-p0FWZ3EoB6W7h7GqMS4VvO"><span style="font-weight:bold">零样本性能强</span><span>：不需要标注数据</span></li></ul>

<ul><li id="t-APYk6nkPUt6Fgjl1XgHxEy"><span style="font-weight:bold">语义对齐好</span><span>：答案-答案匹配比问题-答案匹配更准</span></li></ul>

<ul><li id="t-fecqmVfCMYpF6BfGXYAfZX"><span style="font-weight:bold">跨域泛化</span><span>：在不同领域都表现不错</span></li></ul>

<p id="t-E5rkycYdYr5FCEM9xTJIHm"><span style="font-weight:bold">⚠️ 局限：</span></p>

<ul><li id="t-25ZABtXKTq3V6rQrmMqlK7"><span style="font-weight:bold">依赖</span><span style="font-weight:bold">LLM</span><span style="font-weight:bold">知识</span><span>：如果LLM对该领域一无所知，生成的假设文档就是垃圾</span></li></ul>

<ul><li id="t-KpwPckTu1IkFKnvLIk57Li"><span style="font-weight:bold">计算成本高</span><span>：需要额外调用LLM生成假设文档（通常生成3-5个）</span></li></ul>

<ul><li id="t-Y5ir9sQf18TcezMIWNKxdc"><span style="font-weight:bold">时延增加</span><span>：增加了一个LLM调用环节，响应时间约+200-500ms</span></li></ul>

<a id="t-czLPAvJxTj5UciUngsURVT"></a>

##### 最佳实践建议

<ol start="19"><li id="t-KA2zwtGBtTtvzUtX3DvZcG"><span style="font-weight:bold">混合使用</span><span>：对简单查询用传统检索，复杂查询才用HyDE</span></li></ol>

<pre id="t-fVtFG52B96JvnJ0D8WVsOS"><code>def smart_retrieve(query, vectorstore, threshold=10):
 # 简单查询直接检索
 if len(query.split()) &lt; threshold:
 return vectorstore.similarity_search(query)
 # 复杂查询用HyDE
 else:
 return hyde_retriever.retrieve(query)</code></pre>

<ol start="20"><li id="t-Jk4xwiB07FfNCYHDL3Kqem"><span style="font-weight:bold">缓存假设文档</span><span>：相似问题可以复用之前生成的假设文档</span></li></ol>

<ol start="21"><li id="t-eMMCsEZPvYbMwLcHIy0iDo"><span style="font-weight:bold">调整生成数量</span><span>：通常3-5个假设文档效果最好，太多反而分散</span></li></ol>

<ol start="22"><li id="t-qgV3vvQCe1Xtr9ki5yK9E6"><span style="font-weight:bold">领域适配</span><span>：针对特定领域微调prompt模板</span></li></ol>


<a id="section-1233"></a>
## 三、路由优化和问题构建策略

<a id="t-Cb92OO0zSfh0OzAO1yWMcF"></a>

<p id="t-wDgcWQs5Gr0w8yODgEsddQ"><span style="font-weight:bold">如何让系统智能地选择</span><span style="font-weight:bold">数据源</span><span>（路由）和</span><span style="font-weight:bold">如何构建结构化查询</span><span>（查询构建）。</span></p>

<p id="t-bUsd7PIdmNXFL8raSeLKnl"><span>想象一下，你的RAG系统需要处理多种类型的查询：</span></p>

<ul><li id="t-rhNULxy83A9AZIvENVmWm9"><span>有些需要查向量数据库</span></li></ul>

<ul><li id="t-2FNxT5mbg0w66xX6tlBsIT"><span>有些需要查关系型数据库（SQL）</span></li></ul>

<ul><li id="t-PBogXZJgD0T8faWP3QsUzt"><span>有些需要查图数据库（Cypher）</span></li></ul>

<ul><li id="t-OojqXIUsVFMI7cqSjplss5"><span>有些甚至需要去搜索网页</span></li></ul>

<p id="t-EfgO6IzNjHuv0Ty7pZDtrO"><span>这时候，</span><span style="font-weight:bold">路由系统</span><span>就像一个聪明的交通指挥员，把不同的问题送到最合适的地方去处理。</span></p>


<a id="section-1234"></a>
## Routing（路由）：智能流量调度

<a id="t-JEDssHls7eX5aCyoDxAaRH"></a>

<a id="t-715sz9Rget5kGbsE0WkShX"></a>

##### 什么是RAG路由？

<p id="t-f9v7PB7rDdrIbtUvCGy7V7"><span style="font-weight:bold">路由（Routing）本质上是一个分类问题</span><span>：给定用户查询，决定该用哪个数据源、用哪种检索策略、甚至用哪个LLM模型来处理。</span></p>

<div id="t-AfqujCy5LoSmdRroK7gSLF"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/b242a364f3ac42bb50bd77c6.png"/></div>

<a id="t-WFT11RMc9Y8J6fdT23ySXx"></a>

##### 路由的两种核心方式

<ol start="23"><li id="t-ValhUbB8vk5DEuLr0AJyYC"><span>逻辑路由（Logical Routing）</span></li></ol>

<p id="t-P2we2NnSQ3Egwd1DVA7tpU"><span>基于规则和查询结构分析来决定路由。</span></p>

<p id="t-vwZBGAHSnvJ4NYj4JYiZez"><span style="font-weight:bold">实现方式：使用LLM作为</span><span style="font-weight:bold">分类器</span></p>

<pre id="t-gUA5BUAR1nzhCeYqoYuzOz"><code>from typing import Literal
from langchain_core.pydantic_v1 import BaseModel, Field
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate

#定义路由选项
class RouteQuery(BaseModel):
 """将用户查询路由到最相关的数据源"""
    datasource: Literal["vectorstore", "sql_database", "web_search", "graph_database"] = Field(
        description="根据用户问题选择最合适的数据源"
 )
    reasoning: str = Field(
        description="选择该数据源的理由"
 )

#创建路由提示词
router_prompt = ChatPromptTemplate.from_template("""
你是一个专业的查询路由系统。根据用户问题的特点，选择最合适的数据源。

数据源说明：
vectorstore: 非结构化文档、技术文档、知识库文章
sql_database: 结构化数据、表格数据、统计查询、聚合运算
web_search: 实时信息、最新新闻、公开网络数据
graph_database: 复杂关系查询、知识图谱、实体关系分析

用户问题: {question}

请分析问题并选择合适的数据源。
""")

#构建路由链
llm = ChatOpenAI(model="gpt-4", temperature=0)
structured_llm = llm.with_structured_output(RouteQuery)
router_chain = router_prompt | structured_llm

#使用路由
def route_question(question: str):
    result = router_chain.invoke({"question": question})
 print(f"📍 路由决策: {result.datasource}")
 print(f"💭 理由: {result.reasoning}")
 return result.datasource

#测试案例
questions = [
 "2024年诺贝尔物理学奖获得者是谁？", # → web_search
 "公司员工表中年龄超过35岁的人数统计", # → sql_database    "什么是强化学习？",  # → vectorstore
 "张三和李四之间有哪些合作关系？" # → graph_database
]

for q in questions:
 print(f"\n问题: {q}")
    route = route_question(q)
 print("-" * 60)</code></pre>

<p id="t-NNTqGD5seJy3xhpACtZNv5"><span style="font-weight:bold">运行结果：</span></p>

<pre id="t-VgubYrrflYu7Htw8BYvjVO"><code>问题: 2024年诺贝尔物理学奖获得者是谁？
📍 路由决策: web_search
💭 理由: 这是关于2024年的实时信息，需要从网络获取最新数据

问题: 公司员工表中年龄超过35岁的人数统计
📍 路由决策: sql_database
💭 理由: 这是结构化数据的统计查询，需要SQL聚合运算

问题: 什么是强化学习？
📍 路由决策: vectorstore
💭 理由: 这是技术概念查询，适合从知识库文档检索

问题: 张三和李四之间有哪些合作关系？
📍 路由决策: graph_database
💭 理由: 这涉及实体间的复杂关系查询，适合图数据库</code></pre>

<ol start="24"><li id="t-XK2NrcHFkVPkKqHUAyiJza"><span>语义路由（Semantic Routing）</span></li></ol>

<p id="t-2n1hbYiAlHO9duMnkCesCF"><span>基于查询的语义相似度来路由，更加灵活智能。</span></p>

<pre id="t-grjKJCdh0Sv541usVhNTcQ"><code>from sentence_transformers import SentenceTransformer
import numpy as np

class SemanticRouter:
 def __init__(self):
        self.model = SentenceTransformer('all-MiniLM-L6-v2')
 # 定义路由模板（每个数据源的典型查询示例）
        self.route_templates = {
 "product_info": [
 "产品价格是多少",
 "这个产品有什么功能",
 "产品规格参数",
 "产品库存情况"
 ],
 "technical_docs": [
 "如何配置系统",
 "技术实现原理",
 "API使用说明",
 "故障排查步骤"
 ],
 "customer_support": [
 "账号无法登录",
 "忘记密码怎么办",
 "申请退款流程",
 "投诉建议"
 ],
 "analytics": [
 "销售数据统计",
 "用户增长趋势",
 "月度报表分析",
 "业绩对比"
 ]
 }
 # 预计算模板嵌入
        self.route_embeddings = {}
 for route, templates in self.route_templates.items():
            embeddings = self.model.encode(templates)
 # 计算中心点
            self.route_embeddings[route] = np.mean(embeddings, axis=0)
 def route(self, query: str, threshold=0.5):
 """基于语义相似度路由查询"""
        query_embedding = self.model.encode([query])[0]
 # 计算与每个路由中心的相似度
        similarities = {}
 for route, center_embedding in self.route_embeddings.items():
            similarity = np.dot(query_embedding, center_embedding) / (
                np.linalg.norm(query_embedding) * np.linalg.norm(center_embedding)
 )
            similarities[route] = similarity
 # 选择最相似的路由
        best_route = max(similarities, key=similarities.get)
        confidence = similarities[best_route]
 # 如果相似度太低，返回默认路由
 if confidence &lt; threshold:
 return "general", confidence
 return best_route, confidence

#使用示例
router = SemanticRouter()

test_queries = [
 "iPhone 15 Pro价格多少钱？",
 "如何部署Kubernetes集群？",
 "我的账号被锁定了怎么办？",
 "上个月的销售额是多少？"
]

for query in test_queries:
    route, confidence = router.route(query)
 print(f"\n问题: {query}")
 print(f"🎯 路由到: {route} (置信度: {confidence:.2f})")</code></pre>

<a id="t-uDN98ixAjbZaPUzgteKGqi"></a>

##### 完整的路由系统架构

<pre id="t-n1vhrLtcpmVvpaShZ2AxYX"><code>class AdvancedRAGRouter:
 def __init__(self):
        self.vectorstore = None # 向量数据库连接
        self.sql_db = None # SQL数据库连接
        self.graph_db = None # 图数据库连接
        self.web_search = None # 网络搜索接口
        self.llm = ChatOpenAI(model="gpt-4", temperature=0)
        self.semantic_router = SemanticRouter()
 def multi_route(self, query: str):
 """
        多路由策略：可能同时路由到多个数据源
        适用于需要综合多个数据源的复杂查询
        """
 # Step 1: LLM分析查询复杂度
        analysis_prompt = f"""分析以下查询的复杂度和所需数据源：
        查询: {query}
        返回JSON格式：
        {{
            "complexity": "simple/medium/complex",
            "required_sources": ["source1", "source2", ...],
            "reasoning": "分析理由"
        }}
        """
        analysis = self.llm.invoke(analysis_prompt)
 # Step 2: 并行查询多个数据源
        results = {}
        required_sources = analysis.get("required_sources", [])
 import concurrent.futures
 with concurrent.futures.ThreadPoolExecutor() as executor:
            futures = {}
 for source in required_sources:
 if source == "vectorstore":
                    futures[source] = executor.submit(self._query_vectorstore, query)
 elif source == "sql_database":
                    futures[source] = executor.submit(self._query_sql, query)
 elif source == "web_search":
                    futures[source] = executor.submit(self._query_web, query)
 # 收集结果
 for source, future in futures.items():
                results[source] = future.result()
 # Step 3: 融合结果
        final_result = self._fuse_results(query, results)
 return final_result
 def _query_vectorstore(self, query):
 """查询向量数据库"""
 return self.vectorstore.similarity_search(query, k=5)
 def _query_sql(self, query):
 """查询SQL数据库"""
 # 使用LLM生成SQL（下一节详细讲）
        sql_query = self._text_to_sql(query)
 return self.sql_db.execute(sql_query)
 def _query_web(self, query):
 """网络搜索"""
 return self.web_search.search(query, num_results=5)
 def _fuse_results(self, query, results):
 """融合多数据源的结果"""
        context = ""
 for source, data in results.items():
            context += f"\n===来自 {source} 的信息===\n"
            context += str(data)
 # LLM综合生成答案
        final_prompt = f"""基于以下多个数据源的信息，回答用户问题：
 {context}
        用户问题: {query}
        请综合所有信息给出完整、准确的答案：
        """
 return self.llm.invoke(final_prompt)

#使用示例
router = AdvancedRAGRouter()
result = router.multi_route("比较我们公司2023年和2024年的销售数据，并分析市场趋势")
#这个查询会同时：
#1. 从SQL数据库获取销售数据
#2. 从向量库获取市场分析文档
#3. 从网络搜索获取最新市场资讯</code></pre>

<a id="t-Nbfx218uv4xK1ifCIqXY5F"></a>

##### 路由决策树可视化

<div id="t-pULfQEQTqFbBwIvWF7mgRc"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/1135624aa09f2a5d69c593bd.png"/></div>

<a id="t-1o9c5z57uiYmOLBpxDaxzC"></a>

##### 最佳实践建议

<ol start="25"><li id="t-WdiuPWN8vtvIB5HRTpdP75"><span style="font-weight:bold">路由粒度控制</span></li></ol>

<ul><li id="t-IOwiWPyXk0Pi3ycq4OAZMo"><span>🎯 </span><span style="font-weight:bold">5-20个主题</span><span>最合适</span></li></ul>

<ul><li id="t-lsUwj9VFaABwO4VsdP2Y6L"><span>太少：路由不够精细</span></li></ul>

<ul><li id="t-8cuk7ly8S9dRRMXBW4HFj4"><span>太多：主题重叠，维护困难</span></li></ul>

<ol start="26"><li id="t-RvETZO2qyNAEtGiZJWysXn"><span style="font-weight:bold">添加</span><span style="font-weight:bold">fallback</span><span style="font-weight:bold">机制</span></li></ol>

<pre id="t-c22ZWPJfq3zGq7TToXkias"><code>def safe_route(query, router):
 try:
        result = router.route(query)
 if result.confidence &lt; 0.6:
 # 置信度太低，使用通用路由
 return "general_vectorstore"
 return result.datasource
 except Exception as e:
        logging.error(f"路由失败: {e}")
 return "fallback_human_agent" # 转人工</code></pre>

<ol start="27"><li id="t-slRe1R1OKxhAQ2J7KHZIcx"><span style="font-weight:bold">A/B测试路由策略</span></li></ol>

<pre id="t-fXN2KsqSC8CHzK1G3QwRCW"><code>#50%用户用新路由，50%用旧路由
if user_id % 2 == 0:
    result = new_router.route(query)
else:
    result = old_router.route(query)

#收集指标对比
metrics.log({
 "router_version": "new" if user_id % 2 == 0 else "old",
 "latency": response_time,
 "user_satisfaction": user_rating
})</code></pre>


<a id="section-1235"></a>
## Query Construction（查询构建）：说数据库的语言

<a id="t-pMvj8He0eXbrZkmEA9m3W6"></a>

<a id="t-5uAKvQCsLIY4U0IHjTmfRW"></a>

##### 核心挑战

<p id="t-MMBrb5sNh6NdPKmvF78vNv"><span>用户说人话，数据库说"方言"：</span></p>

<ul><li id="t-yHi0IfawuTjKKoJaCavLnb"><span>关系数据库 → SQL</span></li></ul>

<ul><li id="t-lyMmgYlHxUlmqPJ9MfhADd"><span>图数据库 → Cypher</span></li></ul>

<ul><li id="t-avUkkvgtkjmPcLiWis2VBu"><span>向量库 + 元数据 → 结构化过滤</span></li></ul>

<p id="t-KSReod7WWQNc759yYtxc4v"><span style="font-weight:bold">Query</span><span style="font-weight:bold"> Construction的任务</span><span>：把自然语言转换成数据库能理解的查询语言。</span></p>

<div id="t-Lk2mCS2XRHc65gq8XOtyyE"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/54c90cff9974805ee7ebb0d9.png"/></div>

<a id="t-5xXyhZHr5dNEosaMaJRryd"></a>

##### 方法1: Text-to-SQL（自查询检索器）

<pre id="t-CpUs7bgGxWjND69b44Znlq"><code>#场景：向量库中存储了大量文档，每个文档都有结构化的元数据。
from langchain.chains.query_constructor.base import AttributeInfo
from langchain.retrievers.self_query.base import SelfQueryRetriever
from langchain_openai import OpenAI

#Step 1: 定义文档元数据结构
metadata_field_info = [
    AttributeInfo(
        name="author",
        description="文档作者的名字",
 type="string"
 ),
    AttributeInfo(
        name="publish_date",
        description="文档发布日期，格式: YYYY-MM-DD",
 type="string"
 ),
    AttributeInfo(
        name="category",
        description="文档类别",
 type="string or list[string]"
 ),
    AttributeInfo(
        name="rating",
        description="文档评分，1-5分",
 type="integer"
 )
]

#文档内容描述
document_content_description = "技术博客文章"

#Step 2: 创建自查询检索器
llm = OpenAI(temperature=0)
retriever = SelfQueryRetriever.from_llm(
    llm,
    vectorstore,
    document_content_description,
    metadata_field_info,
    verbose=True
)

#Step 3: 使用自然语言查询
query = "找出张三写的2024年发布的关于机器学习的文章"
docs = retriever.get_relevant_documents(query)

#内部会自动生成类似这样的过滤条件:
filter = {
"author": "张三",
"publish_date": {"$gte": "2024-01-01"},
"category": {"$in": ["机器学习"]}
}</code></pre>

<p id="t-DtXdY2i7T0mUTywnPJ4ui9"><span style="font-weight:bold">完整的Text-to-SQL实现</span></p>

<pre id="t-uHUKCVJ7puQCtFZNLUE94G"><code>from langchain.utilities import SQLDatabase
from langchain_experimental.sql import SQLDatabaseChain

#连接数据库
db = SQLDatabase.from_uri("sqlite:///company.db")

#创建SQL链
sql_chain = SQLDatabaseChain.from_llm(
    llm=ChatOpenAI(model="gpt-4", temperature=0),
    db=db,
    verbose=True,
    use_query_checker=True, # 自动检查SQL语法
    return_intermediate_steps=True
)

#自然语言查询
questions = [
 "2024年销售额最高的前10个产品是什么？",
 "哪些员工的工资高于部门平均工资？",
 "每个城市的客户数量分布情况"
]

for question in questions:
 print(f"\n❓ 问题: {question}")
    result = sql_chain(question)
 print(f"🔍 生成的SQL:\n{result['intermediate_steps'][0]}")
 print(f"✅ 结果:\n{result['result']}")</code></pre>

<p id="t-VniVpRY0QfoJkOhmHTauEg"><span style="font-weight:bold">实际运行示例：</span></p>

<pre id="t-rx4AXh49xZCKeIsI9er7mu"><code>❓ 问题: 2024年销售额最高的前10个产品是什么？

🔍 生成的SQL:
SELECT product_name, SUM(amount) as total_sales
FROM orders
WHERE YEAR(order_date) = 2024
GROUP BY product_name
ORDER BY total_sales DESC
LIMIT 10;

✅ 结果:
| 产品名称 | 总销售额 |
|---------|---------|
| iPhone 15 Pro | ¥12,850,000 |
| MacBook Pro M3 | ¥8,920,000 |
| ...</code></pre>

<a id="t-VyBWHXLFOGiJqxQ2ktxmLT"></a>

##### 方法2: Text-to-Cypher（图数据库查询）

<p id="t-hY9UwtcnRwodxZXU41zB8i"><span style="font-weight:bold">场景</span><span>：知识图谱、关系网络、社交网络分析</span></p>

<pre id="t-AajVtnQwIBIw5PnCfHVmm9"><code>from langchain.chains import GraphCypherQAChain
from langchain_community.graphs import Neo4jGraph

#连接Neo4j图数据库
graph = Neo4jGraph(
    url="bolt://localhost:7687",
    username="neo4j",
    password="password"
)

#创建Cypher查询链
cypher_chain = GraphCypherQAChain.from_llm(
    llm=ChatOpenAI(model="gpt-4", temperature=0),
    graph=graph,
    verbose=True
)

#自然语言查询
questions = [
 "张三和李四之间有几度关系？",
 "找出所有和'人工智能'相关的技术节点",
 "计算每个人的影响力分数（基于关系数量）"
]

for question in questions:
    response = cypher_chain.run(question)
 print(f"\n问题: {question}")
 print(f"答案: {response}")</code></pre>

<p id="t-XcdmVnAu30z2XsD0UHiv4M"><span style="font-weight:bold">生成的Cypher示例：</span></p>

<pre id="t-x4r5Lz544DZTU27xJX9C4Z"><code>// 问题: 张三和李四之间有几度关系？
MATCH path = shortestPath(
 (p1:Person {name: "张三"})-[*]-(p2:Person {name: "李四"})
)
RETURN length(path) as degrees, path

// 问题: 找出所有和'人工智能'相关的技术节点
MATCH (t:Technology)-[:RELATED_TO*1..2]-(ai:Technology {name: "人工智能"})
RETURN DISTINCT t.name, t.description
ORDER BY t.popularity DESC
LIMIT 20</code></pre>

<a id="t-4igKCJ2fZ0eYanzTOjghMA"></a>

##### 方法3: 混合查询构建

<p id="t-TNR6f0e3drXn6p3LfZkEVY"><span style="font-weight:bold">场景</span><span>：需要同时处理向量搜索和结构化过滤</span></p>

<pre id="t-J6CTW5prS8NyfjmBpliqil"><code>class HybridQueryConstructor:
 def __init__(self, llm, vectorstore):
        self.llm = llm
        self.vectorstore = vectorstore
 def construct_query(self, natural_language_query):
 """
        将自然语言转换为混合查询
        """
 # Step 1: LLM分析查询意图
        analysis_prompt = f"""分析以下查询，提取出：
        1. 语义搜索部分（用于向量检索）
        2. 结构化过滤条件（用于元数据过滤）
        查询: {natural_language_query}
        返回JSON:
        {{
            "semantic_query": "语义搜索部分",
            "filters": {{
                "field1": "value1",
                "field2": {{operator": "gte", "value": xxx}}
            }}
        }}
        """
        analysis = self.llm.invoke(analysis_prompt)
        parsed = json.loads(analysis.content)
 # Step 2: 构建混合查询
        semantic_query = parsed["semantic_query"]
        filters = parsed["filters"]
 # Step 3: 执行检索
        results = self.vectorstore.similarity_search(
            semantic_query,
            k=10,
 filter=filters
 )
 return results

#使用示例
constructor = HybridQueryConstructor(llm, vectorstore)

query = "找出2023年之后发布的、关于深度学习的、评分大于4分的文章"
#自动分解为:
semantic_query: "深度学习相关的技术文章"
filters: {
"publish_date": {"$gte": "2023-01-01"},
"category": "深度学习",
"rating": {"$gt": 4}
}

results = constructor.construct_query(query)</code></pre>

<a id="t-ZKl6QtlHski9XnmHSzWZoW"></a>

##### 查询构建的错误处理

<p id="t-sfs5xYXUS55oQaxgc3rusE"><span style="font-weight:bold">关键问题：LLM生成的</span><span style="font-weight:bold">SQL</span><span style="font-weight:bold">可能有错误！</span></p>

<pre id="t-YcAizkOjciSlqfelezvaig"><code>class SafeSQLExecutor:
 def __init__(self, db, llm):
        self.db = db
        self.llm = llm
        self.max_retries = 3
 def execute_with_retry(self, natural_query):
 """
        带重试机制的SQL执行
        """
 for attempt in range(self.max_retries):
 try:
 # 生成SQL
                sql = self._generate_sql(natural_query)
 print(f"尝试 {attempt + 1}: {sql}")
 # 执行前验证
 if not self._validate_sql(sql):
 raise ValueError("SQL验证失败：可能包含危险操作")
 # 执行查询
                result = self.db.execute(sql)
 return result
 except Exception as e:
                error_msg = str(e)
 print(f"❌ 错误: {error_msg}")
 if attempt &lt; self.max_retries - 1:
 # 让LLM修正错误
                    natural_query = f"""上次查询失败了。
                    原查询: {natural_query}
                    生成的SQL: {sql}
                    错误信息: {error_msg}
                    请修正SQL并重试。
                    """
 else:
 return f"查询失败，已重试{self.max_retries}次: {error_msg}"
 def _validate_sql(self, sql):
 """
        SQL安全验证
        """
 # 检查危险关键词
        dangerous_keywords = ["DROP", "DELETE", "TRUNCATE", "ALTER", "CREATE"]
        sql_upper = sql.upper()
 for keyword in dangerous_keywords:
 if keyword in sql_upper:
 return False
 # 检查是否只读查询
 if not sql_upper.strip().startswith("SELECT"):
 return False
 return True
 def _generate_sql(self, query):
 """生成SQL"""
        prompt = f"""将以下自然语言转换为SQL查询。
        数据库schema:
        - orders表: order_id, customer_id, product_name, amount, order_date
        - customers表: customer_id, name, city, age
        - products表: product_id, product_name, category, price
        查询: {query}
        只返回SQL语句，不要有其他文字：
        """
        response = self.llm.invoke(prompt)
 return response.content.strip()

#使用示例
executor = SafeSQLExecutor(db, llm)
result = executor.execute_with_retry("2024年哪些城市的订单金额最高？")</code></pre>

<a id="t-mU6iX1T6lhwwMCAnr7rPQ3"></a>

##### Query Construction性能优化

<pre id="t-OJku6VagbupAfFUoywpHSt"><code>#1. 缓存常见查询模式
from functools import lru_cache

@lru_cache(maxsize=100)
def cached_sql_generation(query_template):
 """缓存SQL生成结果"""
 return llm.invoke(query_template)

#2. 预编译查询模板
QUERY_TEMPLATES = {
 "top_n_by_metric": """
        SELECT {column}, SUM({metric}) as total
        FROM {table}
        WHERE {date_column} BETWEEN '{start}' AND '{end}'
        GROUP BY {column}
        ORDER BY total DESC
        LIMIT {n}
    """,
 "user_filter": """
        SELECT * FROM {table}
        WHERE {filter_conditions}
    """
}

def quick_sql_from_template(query_type, **params):
    template = QUERY_TEMPLATES.get(query_type)
 return template.format(**params)

#3. 并行查询优化
async def parallel_multi_query(queries):
 """并行执行多个查询"""
 import asyncio
    tasks = [asyncio.create_task(execute_query(q)) for q in queries]
    results = await asyncio.gather(*tasks)
 return results</code></pre>


<a id="section-1236"></a>
## 小结

<a id="t-qyP4T6OwGTAkqMVbNsjgei"></a>

<p id="t-wEmEasHpdR48WolekgvKUK"><span>第二部分我们深入学习了：</span></p>


<a id="section-1237"></a>
## 🎯 路由优化（Routing）

<a id="t-Ml8uVaoW2i4rW7fJad8WQ2"></a>

<ul><li id="t-AwfnMz24nmZ0RyPHE7M0FB"><span style="font-weight:bold">逻辑路由</span><span>：基于规则和LLM分类</span></li></ul>

<ul><li id="t-3mIfAfJRCRkEb2hgPBf0QE"><span style="font-weight:bold">语义路由</span><span>：基于向量相似度</span></li></ul>

<ul><li id="t-UAdmQcmbXJ5wBkkn7vF7HH"><span style="font-weight:bold">多路由策略</span><span>：同时查询多个数据源并融合结果</span></li></ul>

<ul><li id="t-u8PPkrDbX7zE7RVyQTfbC3"><span style="font-weight:bold">最佳实践</span><span>：5-20个主题、添加fallback、A/B测试</span></li></ul>


<a id="section-1238"></a>
## 🔧 查询构建（Query Construction）

<a id="t-YdI2j9epdZkJZD6ygunWP6"></a>

<ul><li id="t-UY1mAeMYwGcXYaOOnwuIjY"><span style="font-weight:bold">Text-to-SQL</span><span>：自然语言转SQL查询</span></li></ul>

<ul><li id="t-fvwqW6RB2jrmlRqqfqeKbp"><span style="font-weight:bold">Text-to-Cypher</span><span>：图数据库查询构建</span></li></ul>

<ul><li id="t-UU2ylWtAkQDfeL9aZEdZCL"><span style="font-weight:bold">混合查询</span><span>：向量检索 + 结构化过滤</span></li></ul>

<ul><li id="t-MsdH6ch7xopPmOSr5seaC2"><span style="font-weight:bold">错误处理</span><span>：重试机制、SQL验证、安全检查</span></li></ul>


<a id="section-1239"></a>
## 💡 关键洞察

<a id="t-795ahJT9AkrfGx5VWehPey"></a>

<ol start="1"><li id="t-SoFuAasEWbcjwwMp6kRX0U"><span style="font-weight:bold">路由是分类问题</span><span>，但分类器可以是LLM（灵活）或embedding（快速）</span></li></ol>

<ol start="2"><li id="t-9HNQrLmNqVXkfOPwUcjzRL"><span style="font-weight:bold">查询构建的核心</span><span>是让LLM学会"说数据库的方言"</span></li></ol>

<ol start="3"><li id="t-uwxvpDk38PIl7Kj0Dtg1ft"><span style="font-weight:bold">安全第一</span><span>：永远要验证LLM生成的查询语句</span></li></ol>

<ol start="4"><li id="t-JhvIkJI68nC9hRIGwITGHH"><span style="font-weight:bold">性能优化</span><span>：缓存、模板、并行都很重要</span></li></ol>


<a id="section-1241"></a>
## 一、传统RAG索引的痛点

<a id="t-NbNxSwpcmsqOECY8QOnlNa"></a>

<p id="t-FcMSjfxjnYW9hneg5Zkbqs"><span>在深入讲解优化方案之前，咱们得先明白传统RAG索引到底有什么问题。</span></p>


<a id="section-1242"></a>
## 信息瓶颈问题

<a id="t-S9X28e04l6GWRBaFUAfBHB"></a>

<p id="t-kRsmfafonlcGDyCIln7jqU"><span>想象一下，你有一篇5000字的技术文档，传统方法是把它切成500字的小块，然后每个块生成一个768维的向量。问题来了：500字的信息被压缩成768个数字，这就像把一张高清照片压缩成缩略图，很多细节都丢失了。</span></p>

<blockquote id="t-MJVfohg7KJQ4dfuZiwLiEO"><span>💡 </span><span style="font-weight:bold">举个栗子</span><span>
假设文档里有这么一段："亚马逊雨林覆盖了巴西西北部的大部分地区，延伸到哥伦比亚、秘鲁等南美国家，是世界上最大的热带雨林，以其生物多样性而闻名。"</span><span>
传统单向量方法会把这段话压缩成一个向量，当用户问"亚马逊雨林主要在哪些国家"时，模型可能只能捕捉到"亚马逊"和"国家"这些关键词，但具体的地理关系就模糊了。</span></blockquote>


<a id="section-1243"></a>
## 上下文割裂

<a id="t-pdu3xK8ZeBrdVtE2kxOOfo"></a>

<p id="t-EBQGARuKJGNMYoLm5vDWHk"><span>文档被切块后，原本连贯的上下文被强行分割。比如一个技术概念的定义在第3块，应用场景在第4块，而用户问题可能需要同时理解这两部分才能回答好。传统方法往往只能检索到其中一块，导致回答不完整。</span></p>


<a id="section-1244"></a>
## 检索精度不足

<a id="t-G7bzd5I8kWEKKCIi6I7iWP"></a>

<p id="t-a0ykiviivPcS9ZLiCYhUkM"><span>当查询比较抽象或需要多跳推理时，简单的向量相似度匹配往往力不从心。比如用户问"这项技术对行业的长远影响是什么"，这种高层次的问题需要综合多个文档片段才能回答，但传统方法可能只返回一些表面相关的内容。</span></p>

<p id="t-7lTfuQjf0uWhkwdnoNMrHD"><span style="font-weight:bold">【传统RAG索引流程对比优化后的方案】</span></p>

<div id="t-GvPT1DJcujaB0r5E2F1zX0"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/f2f25f8447957046d4730d9b.png"/></div>


<a id="section-1246"></a>
## 核心思想

<a id="t-CRo8bbfm9m1kyvOVMyU3PB"></a>

<p id="t-Ev86imoKeMnXL2UrFSO7fJ"><span>Multi-representation Indexing的核心思想非常巧妙：</span><span style="font-weight:bold">用优化后的表示进行检索，但返回完整的原始内容</span><span>。就像我们在图书馆查书，通过简洁的索引卡找书，但最终拿到的是完整的书本。</span></p>

<p id="t-4LYZMjGLvSZqoPVoGamg7R"><span>具体来说，这个方法会为每个文档块创建两份内容：</span></p>

<ul><li id="t-hyamVVbI7bw51GDCXYpOmu"><span style="font-weight:bold">优化表示</span><span>：通常是一个简洁的摘要，只包含核心信息，用于检索时的向量匹配</span></li></ul>

<ul><li id="t-uCtrdbxByNmwjImMz4ebbb"><span style="font-weight:bold">原始内容</span><span>：完整的文档块，包含所有细节，用于最终提供给LLM</span></li></ul>

<blockquote id="t-6oxJGzzH73HuYvxTfkdrJZ"><span>💡 </span><span style="font-weight:bold">为什么要这么做？</span><span>
因为摘要更纯粹、更聚焦，去除了冗余信息，向量化后更容易匹配到用户的真实意图。但摘要毕竟信息量有限，所以检索时用摘要，返回时给完整内容，两全其美！</span></blockquote>


<a id="section-1247"></a>
## 详细架构设计

<a id="t-meYlvZTVmOnyK9SylvEDrv"></a>

<p id="t-462O4TBWeVqmwPZ7GYQPvJ"><span style="font-weight:bold">【Multi-representation Indexing 完整架构】</span></p>

<div id="t-B3SJa9WNVwlgCGSQzv1vTk"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/55afccb231daf76358f7ee67.png"/></div>


<a id="section-1248"></a>
## 实现细节与代码示例

<a id="t-S5BmJAmqmuWDj0s3uqMi9R"></a>

<a id="t-goiSBtEX2Pr7kYDM44C3GN"></a>

##### 第一步：加载和切分文档

<pre id="t-P7rdPzWUTtANeNxskXb9UI"><code>from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.document_loaders import WebBaseLoader

#加载文档
loader = WebBaseLoader("https://example.com/technical-doc")
docs = loader.load()

#切分文档 - 每块500个token
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=50
)
chunks = text_splitter.split_documents(docs)</code></pre>

<a id="t-evKeqqr6Da57zLePJiaKr5"></a>

##### 第二步：生成摘要（关键！）

<p id="t-to8QZKgMwNwORreUh9MXdp"><span>这一步是整个方法的核心。我们使用LLM为每个文档块生成简洁的摘要。摘要质量直接影响检索效果，所以prompt设计非常重要。</span></p>

<pre id="t-Win5jLLAw86sYedQA5P6Mu"><code>from langchain.chat_models import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langchain.schema.output_parser import StrOutputParser

#初始化LLM
llm = ChatOpenAI(model="gpt-4", temperature=0)

#设计摘要prompt - 这里很关键！
summary_prompt = ChatPromptTemplate.from_template(
 """请为以下文档生成一个简洁的摘要，保留所有关键信息和核心概念。
    摘要应该：
    1. 包含主要技术点和概念
    2. 保留重要的数字、日期、人名等关键事实
    3. 长度控制在原文的1/3左右
    4. 使用清晰简洁的语言
    文档内容：
    {doc}
    摘要："""
)

#创建摘要生成链
summarize_chain = (
 {"doc": lambda x: x.page_content}
 | summary_prompt
 | llm
 | StrOutputParser()
)

#批量生成摘要 - 使用batch提高效率
summaries = summarize_chain.batch(chunks, {"max_concurrency": 5})

print(f"生成了 {len(summaries)} 个摘要")
print(f"原始文档平均长度: {sum(len(c.page_content) for c in chunks)/len(chunks):.0f} 字符")
print(f"摘要平均长度: {sum(len(s) for s in summaries)/len(summaries):.0f} 字符")</code></pre>

<blockquote id="t-40Gy2tfLW3HeGSeAYTzjTe"><span>💡 </span><span style="font-weight:bold">摘要生成的技巧</span><span>
如果文档是技术类的，prompt要强调保留技术术语和关键概念</span><span>
如果是商业文档，要保留数字、日期、公司名等关键信息</span><span>
摘要长度建议是原文的1/4到1/3，太短会丢信息，太长失去优势</span><span>
可以尝试让LLM生成多种形式的摘要：技术摘要、业务摘要、关键词等</span></blockquote>

<a id="t-fBvcMR98KqvWsb9upUzscQ"></a>

##### 第三步：构建MultiVectorRetriever

<p id="t-PElr3NfMSeW5XhGF56mu5o"><span>这是最关键的一步！我们需要同时维护向量存储和文档存储，并通过唯一ID关联它们。</span></p>

<pre id="t-mSlkdKD7I9srjolpo803KM"><code>from langchain.vectorstores import Chroma
from langchain.embeddings import OpenAIEmbeddings
from langchain.storage import InMemoryStore
from langchain.retrievers.multi_vector import MultiVectorRetriever
import uuid

#1. 初始化向量存储 - 存摘要的embedding
vectorstore = Chroma(
    collection_name="summaries",
    embedding_function=OpenAIEmbeddings()
)

#2. 初始化文档存储 - 存完整的原始chunk
docstore = InMemoryStore() # 生产环境建议用持久化存储如Redis

#3. 创建MultiVectorRetriever
retriever = MultiVectorRetriever(
    vectorstore=vectorstore,
    docstore=docstore,
    id_key="doc_id" # 关联的key
)

#4. 为每个文档生成唯一ID
doc_ids = [str(uuid.uuid4()) for _ in chunks]

#5. 创建摘要文档（用于向量化）
summary_docs = [
    Document(page_content=s, metadata={"doc_id": doc_ids[i]})
 for i, s in enumerate(summaries)
]

#6. 同时添加到两个存储
#向量存储存摘要
retriever.vectorstore.add_documents(summary_docs)
#文档存储存完整chunk
retriever.docstore.mset(list(zip(doc_ids, chunks)))

print("✅ MultiVectorRetriever 构建完成！")</code></pre>

<a id="t-0ILFrtO23Q6Bd5boDAahRQ"></a>

##### 第四步：执行检索

<pre id="t-6wfX4S8TO1NUtSIPCgRraJ"><code>#使用MultiVectorRetriever进行检索
query = "什么是RAG系统的主要优势？"

#检索 - 内部流程：
#1. 将query向量化
#2. 在摘要向量中找最相似的top-k
#3. 通过doc_id找到对应的完整文档
#4. 返回完整文档
retrieved_docs = retriever.get_relevant_documents(query, k=3)

print(f"检索到 {len(retrieved_docs)} 个相关文档")
for i, doc in enumerate(retrieved_docs):
 print(f"\n📄 文档 {i+1}:")
 print(f"长度: {len(doc.page_content)} 字符")
 print(f"内容预览: {doc.page_content[:200]}...")</code></pre>


<a id="section-1249"></a>
## 算法原理深度解析

<a id="t-lWOU91OQXXeBH7EIUzBGqT"></a>

<a id="t-jrOimkB1ig2NQ657okVaF3"></a>

##### 相似度计算

<p id="t-2RsqgFAdypcM47cnjlewYX"><span>Multi-representation Indexing的检索过程本质上是一个两阶段的相似度计算：</span></p>

<p id="t-9h0J9ELljzPnNxnDR9NKar"><span style="font-weight:bold">阶段1：摘要匹配</span></p>

<pre id="t-yAK4TIaiZLJHJLlR5k8T5x"><code>similarity(q, sᵢ) = cosine(Eq, Esᵢ)</code></pre>

<p id="t-JeDdOzV1NWKKFVegACsPIo"><span>其中 Eq 是查询向量，Esᵢ 是第i个摘要的向量</span></p>

<p id="t-FUJriStvVYmJzhzAlHnDih"><span style="font-weight:bold">阶段2：文档返回</span></p>

<pre id="t-GEV4uXv7TK55v7pF9364fn"><code>returned_docs = {dⱼ | ID(dⱼ) ∈ TopK({ID(sᵢ)})}</code></pre>

<p id="t-fhoAlLFWbU9fuKnU0dMPvm"><span>返回TopK个摘要对应的完整文档</span></p>

<a id="t-V3ogWyz5Sptt7kMU2Ly61U"></a>

##### 为什么这样更有效？

<ul><li id="t-LHD9cdr1iuAcBJiWaUytRa"><span style="font-weight:bold">信噪比提升</span><span>：摘要去除了冗余信息，提高了向量的"纯度"</span></li></ul>

<ul><li id="t-qGzcVN4LQM5FFTH3PRvKY3"><span style="font-weight:bold">语义聚焦</span><span>：摘要更聚焦核心概念，与用户查询的语义对齐更好</span></li></ul>

<ul><li id="t-oIuo3SDX9kFWuRQ4uXClYy"><span style="font-weight:bold">完整性保证</span><span>：最终返回完整文档，不会丢失任何细节信息</span></li></ul>


<a id="section-1250"></a>
## 性能提升数据

<a id="t-qMcB3UPmmngg4oo0tQR7Dt"></a>

<div id="t-T7747gQUPYFhtwBZiKWPOI"><table><colgroup><col width="178.89755249023438"/><col width="173.00860595703125"/><col width="173.00860595703125"/><col width="120"/></colgroup><tbody><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">指标</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">传统方法</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">Multi-representation</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">提升</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">检索准确率(Recall@10)</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">65%</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">79%</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">0.14</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">精确率(Precision@5)</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">58%</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">71%</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">0.13</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">平均检索时间</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">120ms</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">135ms</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">0.125</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">存储空间</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">100MB</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">120MB</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">0.2</span></p></td></tr></tbody></table></div>

<blockquote id="t-I5VWohPll7hYRKs8KknHYz"><span>💡 </span><span style="font-weight:bold">权衡分析</span><span>
可以看到，Multi-representation方法在检索质量上有显著提升（准确率+14%，精确率+13%），但代价是：</span><span>
检索时间增加12.5%（主要是生成摘要的开销）</span><span>
存储空间增加20%（需要同时存储摘要和原文）</span><span>
这个权衡在大多数场景下是值得的，特别是当你的应用对检索质量要求很高时。</span></blockquote>


<a id="section-1251"></a>
## 最佳实践与优化建议

<a id="t-ldW5PjCEYWCxxJHk8IfXzb"></a>

<ol start="5"><li id="t-SgMW5YTzkj1BeC7vk77xNR"><span>摘要策略选择</span></li></ol>

<p id="t-ACwouokBNIV3RYskh5iyc4"><span>不同场景可以采用不同的摘要策略：</span></p>

<p id="t-fLk4uzwNvkZFrxzNshgaBh"><span style="font-weight:bold">🔹 技术文档</span></p>

<pre id="t-mYoCr9nK2kx9COIFo60a9e"><code>tech_summary_prompt = """
提取以下技术文档的核心要点：
主要技术概念和术语
关键算法或方法
重要的数字、公式或配置参数
技术优势和适用场景

保持技术术语的准确性，不要用通俗语言替换专业术语。

文档：{doc}
"""</code></pre>

<p id="t-08mTcfGq6wjiOJ0kJnIkK1"><span style="font-weight:bold">🔹 商业文档</span></p>

<pre id="t-DRFaTAvlo1SEb1imE4dnqz"><code>business_summary_prompt = """
总结以下商业文档的关键信息：
涉及的公司、产品或项目名称
重要的日期、数字、金额
主要业务逻辑或决策
关键利益相关者

保留所有专有名词和具体数据。

文档：{doc}
"""</code></pre>

<ol start="6"><li id="t-n0JKF7hXth0fIqS6Mx4ny0"><span>多粒度摘要</span></li></ol>

<p id="t-BhmSOVRJjXJQtuHiYz9ylO"><span>高级技巧：为同一个文档生成不同粒度的摘要，可以进一步提升检索效果。</span></p>

<pre id="t-6K6RIVRugCJ8al00cTfy7O"><code>#生成三种摘要
def create_multi_level_summaries(chunk):
 # 1. 关键词摘要（最短）
    keywords = extract_keywords(chunk, top_k=10)
 # 2. 一句话摘要（中等）
    one_sentence = llm.invoke(f"用一句话总结：{chunk}")
 # 3. 段落摘要（较详细）
    paragraph = llm.invoke(f"用一段话总结，保留关键细节：{chunk}")
 return {
 "keywords": keywords,
 "one_sentence": one_sentence,
 "paragraph": paragraph,
 "original": chunk
 }

#检索时可以根据查询类型选择合适粒度的摘要</code></pre>

<ol start="7"><li id="t-uO21GTBQw6K84ErTXbbLhn"><span>缓存优化</span></li></ol>

<p id="t-gTYN6kQqLMdKW10Zxhu9Zp"><span>摘要生成是计算密集型操作，做好缓存可以显著提升性能：</span></p>

<pre id="t-C6aXqBoFeSqkP4T2NDshPP"><code>from functools import lru_cache
import hashlib

@lru_cache(maxsize=1000)
def get_summary(doc_hash):
 # 通过文档hash查找缓存
 # 如果缓存未命中，才调用LLM生成摘要
 pass

#使用
doc_hash = hashlib.md5(chunk.encode()).hexdigest()
summary = get_summary(doc_hash)</code></pre>


<a id="section-1253"></a>
## 核心思想与动机

<a id="t-pwuuDLtA3hy9HU7mCCJQc1"></a>

<p id="t-ucaAj3V4LLiUOvTuhROn5y"><span>RAPTOR是2024年斯坦福大学研究团队提出的革命性索引方法。它解决了一个传统RAG的根本性问题：</span><span style="font-weight:bold">如何同时回答低层次的具体问题和高层次的抽象问题？</span></p>

<blockquote id="t-b8PMXY5njmysIpgSAJPDBL"><span>💡 </span><span style="font-weight:bold">举个实际例子</span><span>
假设你有一本关于AI发展史的书。用户可能问两类截然不同的问题：</span><span style="font-weight:bold">低层次问题</span><span>："1956年达特茅斯会议的参与者有谁？" - 这需要检索到具体的某一页</span><span style="font-weight:bold">高层次问题</span><span>："AI发展经历了哪几个重要阶段？" - 这需要综合整本书的内容</span><span>传统的chunk-based检索对第一类问题还行，但对第二类问题就捉襟见肘了。RAPTOR通过构建</span><span style="font-weight:bold">层次化的摘要树</span><span>完美解决了这个问题！</span></blockquote>


<a id="section-1254"></a>
## RAPTOR架构详解

<a id="t-jyo25xaaM9iEo0emkGpqMO"></a>

<p id="t-c1m1ruAAhbM7SDwj70DaCw"><span style="font-weight:bold">【RAPTOR 递归树状结构完整示意图】</span></p>

<div id="t-6mTFPGNxlrXoXo6l1NnR3C"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/6fed75c0145f6b27fa18e22f.png"/></div>


<a id="section-1255"></a>
## RAPTOR核心算法流程

<a id="t-MTNWAonLkVyUmGthiWhIDa"></a>

<a id="t-UNwEZZppRZRjvrE4QM90Vt"></a>

##### 算法步骤1️⃣：文档切分与向量化

<p id="t-p8h7WZnHxAf1xggzwGK3ca"><span>首先将文档切分成小块（叶子节点），并为每个块生成embedding向量。</span></p>

<pre id="t-U0FukGTI6Op5V6BykkxmMH"><code>#步骤1: 加载和切分文档
from langchain.text_splitter import RecursiveCharacterTextSplitter

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000, # RAPTOR通常用较大的chunk
    chunk_overlap=100
)

#切分文档
leaf_texts = text_splitter.split_documents(documents)

#为每个叶子节点生成embedding
from langchain.embeddings import OpenAIEmbeddings
embeddings = OpenAIEmbeddings()

leaf_embeddings = embeddings.embed_documents(
 [doc.page_content for doc in leaf_texts]
)</code></pre>

<a id="t-b2ynHM3wvoFkx12wRnOZ7J"></a>

##### 算法步骤2️⃣：聚类（使用GMM）

<p id="t-9xWVVnbrSLd21hA3H5YfWe"><span>RAPTOR使用</span><span style="font-weight:bold">高斯混合模型(GMM)进行聚类，而不是传统的K-means。为什么？因为GMM是软聚类</span><span>，一个文档可以部分属于多个集群，这更符合实际情况。</span></p>

<pre id="t-UEsjCN0aII92yPuqxqH6hA"><code>from sklearn.mixture import GaussianMixture
import numpy as np

def cluster_embeddings(embeddings, n_clusters):
 """
    使用GMM进行软聚类
    """
 # 降维（可选，但推荐用于大规模数据）
 from umap import UMAP
    reducer = UMAP(n_components=10, random_state=42)
    reduced_embeddings = reducer.fit_transform(embeddings)
 # GMM聚类
    gmm = GaussianMixture(
        n_components=n_clusters,
        covariance_type='full',
        random_state=42
 )
    gmm.fit(reduced_embeddings)
 # 获取每个样本对各集群的概率
    probabilities = gmm.predict_proba(reduced_embeddings)
 # 使用全局阈值确定每个样本所属的集群
    threshold = 1 / n_clusters  # 动态阈值
    clusters = {}
 for i, probs in enumerate(probabilities):
 # 一个文档可以属于多个集群（软聚类的优势）
 for cluster_id in np.where(probs &gt; threshold)[0]:
 if cluster_id not in clusters:
                clusters[cluster_id] = []
            clusters[cluster_id].append(i)
 return clusters

#执行第一次聚类
n_clusters = len(leaf_texts) // 5 # 每5个文档聚为一类
level1_clusters = cluster_embeddings(leaf_embeddings, n_clusters)</code></pre>

<blockquote id="t-Br6cDpdRxbK3U5kQhBupDR"><span>💡 </span><span style="font-weight:bold">为什么用GMM而不是K-means？</span><span style="font-weight:bold">软聚类</span><span>：一个文档可能同时涉及多个主题，GMM允许它属于多个集群</span><span style="font-weight:bold">概率输出</span><span>：GMM给出每个样本属于各集群的概率，我们可以设置阈值灵活控制</span><span style="font-weight:bold">更好的泛化</span><span>：GMM考虑了数据的协方差结构，对复杂数据分布更友好</span><span style="font-weight:bold">实验证明</span><span>：RAPTOR论文中的实验表明，GMM比K-means效果提升约8%</span></blockquote>

<a id="t-DDSIQ9ohkn5ov6ctWP3wEv"></a>

##### 算法步骤3️⃣：生成集群摘要

<p id="t-9oislhCUwwiisMFxy9OKo3"><span>对每个集群，使用LLM生成一个综合性的摘要。这是RAPTOR的关键步骤！</span></p>

<pre id="t-nVUTZbLjQnJwdfFpUpxGL4"><code>from langchain.chat_models import ChatOpenAI
from langchain.prompts import ChatPromptTemplate

llm = ChatOpenAI(model="gpt-4", temperature=0)

summary_prompt = ChatPromptTemplate.from_template(
 """你是一个专业的文档摘要专家。请仔细阅读以下文档片段，
    生成一个综合性的摘要，要求：
    1. 抓住所有文档的共同主题和核心思想
    2. 保留关键的细节信息（日期、人名、数字等）
    3. 体现文档之间的逻辑关系
    4. 语言简洁但信息完整
    5. 长度约为原文总和的1/4
    文档内容：
    {documents}
    综合摘要："""
)

def summarize_cluster(cluster_texts):
 """为一个集群生成摘要"""
 # 将集群内所有文档拼接
    combined_text = "\n\n---\n\n".join(cluster_texts)
 # 生成摘要
    summary = llm.invoke(
        summary_prompt.format(documents=combined_text)
 )
 return summary.content

#为每个集群生成摘要
level1_summaries = []
for cluster_id, doc_indices in level1_clusters.items():
    cluster_texts = [leaf_texts[i].page_content for i in doc_indices]
    summary = summarize_cluster(cluster_texts)
    level1_summaries.append(summary)

print(f"生成了 {len(level1_summaries)} 个一级摘要")</code></pre>

<a id="t-1HugNosa6fbwk8mnhdi8dc"></a>

##### 算法步骤4️⃣：递归构建树

<p id="t-BOzddrZxUDvvswzv40c7Qf"><span>这是RAPTOR最精髓的部分！我们把第一层的摘要当作新的"文档"，重复步骤2和3，继续聚类和摘要，直到达到停止条件。</span></p>

<pre id="t-CU9EMlz4P0xdMQ6bWy0k8r"><code>def build_raptor_tree(texts, max_depth=3, min_cluster_size=3):
 """
    递归构建RAPTOR树
    Args:
        texts: 初始文档列表
        max_depth: 最大递归深度
        min_cluster_size: 最小集群大小，小于此值停止
    Returns:
        tree: 完整的树结构
    """
    tree = {
 'level_0': texts  # 叶子节点
 }
    current_texts = texts
    current_level = 0
 while current_level &lt; max_depth:
 print(f"\n🌳 构建 Level {current_level + 1}...")
 # 1. 向量化当前层文本
        embeddings_list = embeddings.embed_documents(current_texts)
 # 2. 确定集群数
        n_clusters = max(len(current_texts) // 5, 1)
 if n_clusters &lt; min_cluster_size:
 print(f"⚠️ 集群数 {n_clusters} 小于最小值，停止递归")
 break
 # 3. 聚类
        clusters = cluster_embeddings(embeddings_list, n_clusters)
 # 4. 为每个集群生成摘要
        next_level_texts = []
 for cluster_id, doc_indices in clusters.items():
            cluster_docs = [current_texts[i] for i in doc_indices]
            summary = summarize_cluster(cluster_docs)
            next_level_texts.append(summary)
 # 5. 保存当前层
        current_level += 1
        tree[f'level_{current_level}'] = next_level_texts
 # 6. 准备下一轮递归
        current_texts = next_level_texts
 print(f"✅ Level {current_level} 完成，生成 {len(next_level_texts)} 个摘要")
 # 停止条件：只剩一个摘要（根节点）
 if len(next_level_texts) == 1:
 print("🎯 到达根节点，树构建完成！")
 break
 return tree

#构建完整的RAPTOR树
raptor_tree = build_raptor_tree(
    texts=[doc.page_content for doc in leaf_texts],
    max_depth=3,
    min_cluster_size=3
)</code></pre>


<a id="section-1256"></a>
## RAPTOR检索策略

<a id="t-WdyvFNvkw4yEXo9bgeu59d"></a>

<p id="t-XbVMI1RmXQvu46zCeRD6cH"><span>RAPTOR提供了两种检索策略，各有优劣：</span></p>

<a id="t-94vdoljPxQDHPPk1p33gF5"></a>

##### 策略1：树遍历检索 (Tree Traversal)

<p id="t-3GnUD19tW2iwHtyhONLjd6"><span>从根节点开始，逐层向下找最相关的分支，像在图书馆里先找分类，再找书架，最后找书。</span></p>

<p id="t-A4wahSdq6P3mGKjHhJj6e3"><span style="font-weight:bold">【树遍历检索流程】</span><span> **</span></p>

<div id="t-R8cBMfs5c6O63YKZ0CN3qH"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/64624e601b4930332621d4c2.png"/></div>

<pre id="t-ZxLJwxsKDt7H3E9pnlZnK2"><code>def tree_traversal_retrieval(query, tree, k=3):
 """
    树遍历检索
    Args:
        query: 用户查询
        tree: RAPTOR树结构
        k: 每层选择的top-k个节点
    Returns:
        最相关的文档列表
    """
    query_embedding = embeddings.embed_query(query)
 # 从最高层开始
    max_level = max([int(k.split('')[1]) for k in tree.keys()])
    current_nodes = tree[f'level{max_level}']
 for level in range(max_level, -1, -1):
 print(f"🔍 在 Level {level} 搜索...")
 # 计算相似度
        level_embeddings = embeddings.embed_documents(current_nodes)
        similarities = cosine_similarity(
 [query_embedding],
            level_embeddings
 )[0]
 # 选择top-k最相似的节点
        top_k_indices = np.argsort(similarities)[-k:][::-1]
 if level == 0:
 # 到达叶子层，返回结果
 return [current_nodes[i] for i in top_k_indices]
 # 获取下一层的子节点
        next_level_nodes = []
 for idx in top_k_indices:
 # 这里需要维护父子关系映射
            children = get_children(tree, level, idx)
            next_level_nodes.extend(children)
        current_nodes = next_level_nodes
 return current_nodes</code></pre>

<a id="t-chg2n1f8ZxMhGsus91yIEo"></a>

##### 策略2：扁平化检索 (Collapsed Tree)

<p id="t-GMpz9jbzHcDMfKjxcHlc9F"><span>把所有层的节点（包括原始文档和各层摘要）都放在一起，一次性检索。简单高效，是</span><span style="font-weight:bold">推荐的方法</span><span>！</span></p>

<pre id="t-2hvLUKmOK7ig9bCoTPu0RW"><code>def collapsed_tree_retrieval(query, tree, k=5):
 """
    扁平化检索 - 将所有层级的节点放在一起检索
    这是推荐的方法，因为：
    1. 实现简单
    2. 不会错过任何相关信息
    3. 可以同时获得不同抽象层次的内容
    """
 # 1. 收集所有层的所有节点
    all_nodes = []
    node_metadata = [] # 记录每个节点的元信息
 for level_key, nodes in tree.items():
        level = int(level_key.split('_')[1])
 for i, node in enumerate(nodes):
            all_nodes.append(node)
            node_metadata.append({
 'level': level,
 'index': i,
 'is_leaf': (level == 0)
 })
 print(f"📚 共收集到 {len(all_nodes)} 个节点")
 # 2. 向量化所有节点
    all_embeddings = embeddings.embed_documents(all_nodes)
 # 3. 向量化查询
    query_embedding = embeddings.embed_query(query)
 # 4. 计算相似度并排序
 from sklearn.metrics.pairwise import cosine_similarity
    similarities = cosine_similarity(
 [query_embedding],
        all_embeddings
 )[0]
 # 5. 获取top-k
    top_k_indices = np.argsort(similarities)[-k:][::-1]
 # 6. 返回结果，包含元信息
    results = []
 for idx in top_k_indices:
        results.append({
 'content': all_nodes[idx],
 'similarity': similarities[idx],
 'metadata': node_metadata[idx]
 })
 return results

#使用示例
query = "AI发展经历了哪些重要阶段？"
results = collapsed_tree_retrieval(query, raptor_tree, k=5)

for i, result in enumerate(results):
 print(f"\n📄 结果 {i+1} (相似度: {result['similarity']:.3f})")
 print(f"层级: Level {result['metadata']['level']}")
 print(f"内容: {result['content'][:200]}...")</code></pre>

<blockquote id="t-GfRMQEppFIwOP2jualdROJ"><span>💡 </span><span style="font-weight:bold">为什么推荐扁平化检索？</span><span style="font-weight:bold">全面性</span><span>：不会因为在某一层选错分支而错过相关内容</span><span style="font-weight:bold">灵活性</span><span>：对于不同抽象层次的问题，都能找到合适的答案</span><span style="font-weight:bold">实现简单</span><span>：不需要维护复杂的父子关系，一次向量化搞定</span><span style="font-weight:bold">实验验证</span><span>：RAPTOR论文实验表明，扁平化检索在大多数任务上优于树遍历</span><span style="font-weight:bold">举个例子</span><span>：当用户问"AI发展经历了哪些阶段"，扁平化检索可能同时返回：</span><span>
Level 2的全局摘要（提供整体框架）</span><span>
Level 1的具体阶段摘要（提供中层细节）</span><span>
Level 0的某些原始文档（提供具体例证）</span><span>
这样的组合提供了多层次、立体化的答案！</span></blockquote>


<a id="section-1257"></a>
## RAPTOR性能分析与优化

<a id="t-io6wHi9WqpHQuG1ru9zKqO"></a>

<a id="t-NCeb8op1RWLTptF2fYNgqW"></a>

##### 性能数据对比

<div id="t-KLBgWSjMEmQUMaYsn8eGRy"><table><colgroup><col width="247.90447998046875"/><col width="120"/><col width="120"/><col width="120"/></colgroup><tbody><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">指标</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">传统RAG</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">RAPTOR</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">提升幅度</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">简单事实查询准确率</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">78%</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">82%</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">0.04</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">复杂推理问题准确率</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">54%</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">74%</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">0.2</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">高层次概括问题</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">42%</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">71%</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">0.29</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">QuALITY基准测试</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">53.70%</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">73.40%</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">0.2</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">索引构建时间</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">5分钟</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">35分钟</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">6</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">存储空间</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">100MB</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">180MB</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">0.8</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">检索速度</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">150ms</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">165ms</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">0.1</span></p></td></tr></tbody></table></div>

<blockquote id="t-FyCtZsVhZaH7OGOZSeh9Wh"><span>📊 </span><span style="font-weight:bold">数据解读</span><span>RAPTOR在</span><span style="font-weight:bold">复杂问题</span><span>和</span><span style="font-weight:bold">高层次理解</span><span>方面有巨大优势（提升20%-29%），但代价是：</span><span style="font-weight:bold">构建时间长</span><span>：需要多轮LLM调用生成摘要，时间是传统方法的7倍</span><span style="font-weight:bold">存储开销大</span><span>：需要存储所有层级的节点，空间增加80%</span><span style="font-weight:bold">检索略慢</span><span>：扁平化方法需要搜索更多节点</span><span style="font-weight:bold">适用场景</span><span>：对于需要理解长文档、回答复杂问题、进行多跳推理的应用，RAPTOR非常值得！</span></blockquote>

<a id="t-SeTwsSGXFU1GS49Q3DyBM9"></a>

##### 优化建议

<ol start="8"><li id="t-W7rjMmwQUAfJnmr4QqV6de"><span style="font-weight:bold">缓存机制</span></li></ol>

<p id="t-QID9ABGrZektxrqJfo4RBd"><span>构建一次树就缓存起来，避免重复计算：</span></p>

<pre id="t-CtkdPV1yrpTFgH7J7DR742"><code>import pickle
import hashlib

def cache_raptor_tree(tree, docs_hash):
 """缓存RAPTOR树"""
    cache_file = f"raptor_tree_{docs_hash}.pkl"
 with open(cache_file, 'wb') as f:
        pickle.dump(tree, f)

def load_raptor_tree(docs_hash):
 """加载缓存的树"""
    cache_file = f"raptor_tree_{docs_hash}.pkl"
 if os.path.exists(cache_file):
 with open(cache_file, 'rb') as f:
 return pickle.load(f)
 return None

#使用
docs_hash = hashlib.md5(str(documents).encode()).hexdigest()
tree = load_raptor_tree(docs_hash)
if tree is None:
    tree = build_raptor_tree(documents)
    cache_raptor_tree(tree, docs_hash)</code></pre>

<ol start="9"><li id="t-HXWM2xqiTKD0hflIHEw2BC"><span style="font-weight:bold">并行化处理</span></li></ol>

<p id="t-ztPKzwnEfkTN1GeyWqrvxk"><span>摘要生成可以并行化，大幅提升速度：</span></p>

<pre id="t-mTyVS3pTQK6YmV4qYfNp0A"><code>from concurrent.futures import ThreadPoolExecutor

def parallel_summarize(clusters, max_workers=5):
 """并行生成摘要"""
 with ThreadPoolExecutor(max_workers=max_workers) as executor:
        summaries = list(executor.map(
            summarize_cluster,
 [cluster_texts for cluster_texts in clusters.values()]
 ))
 return summaries

#速度提升5倍！</code></pre>

<ol start="10"><li id="t-HAxqkOtY5FUaJRoihgPPFm"><span style="font-weight:bold">使用更快的LLM</span></li></ol>

<p id="t-YJ0QGlNOrBU7t20miMzQN8"><span>生产环境中，可以用较小的模型生成摘要：</span></p>

<pre id="t-tfTZAYdGUbH4tYqeAkQTyC"><code>#用GPT-3.5生成摘要，速度快3倍，成本降低10倍
fast_llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0)

#或者用开源模型
from langchain.llms import LlamaCpp
local_llm = LlamaCpp(model_path="./models/llama-2-7b.gguf")</code></pre>


<a id="section-1259"></a>
## 核心思想

<a id="t-2kM5kr76AZ4FXNkltBUIBc"></a>

<p id="t-QXoe6jxbFaMG8dBYUHmq53"><span>ColBERT(Contextualized Late Interaction over BERT)是一个非常巧妙的模型！传统的embedding把整个文档压缩成一个向量，而ColBERT把每个</span><span style="font-weight:bold">token</span><span>（词）都变成一个向量，保留了更细粒度的信息。</span></p>

<blockquote id="t-aI3EiEdnsZfF9mGwqwgLRo"><span>💡 </span><span style="font-weight:bold">形象的比喻</span><span>
想象你要找一本书：</span><span style="font-weight:bold">传统方法</span><span>：就像只看书的封面和目录（单向量）</span><span style="font-weight:bold">ColBERT方法</span><span>：就像把书的每一页都看了一遍（多向量）</span><span>
哪个更可能找到你要的内容？显然是后者！</span></blockquote>


<a id="section-1260"></a>
## ColBERT详细架构

<a id="t-InedtXPBicGPvL3PIgGhw3"></a>

<div id="t-G1XhvK7LvRFLv9YPTm3rqK"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/860a61f5d0283f4fc608c5db.png"/></div>


<a id="section-1261"></a>
## MaxSim算法详解

<a id="t-5cJjoRfgQuC5wTgliTaQGK"></a>

<p id="t-Dx4oPwiRrcyJoyV5zboBU4"><span>ColBERT的核心算法是</span><span style="font-weight:bold">MaxSim</span><span>（Maximum Similarity）。让本案例用一个具体例子来解释：</span></p>

<p id="t-0bGGP5E2nTlHllRmSahhi0"><span style="font-weight:bold">场景设置</span></p>

<p id="t-iTLA3rqBOt0fOvlIPHizrB"><span>假设：</span></p>

<ul><li id="t-kSU8G6taTfUMsaii4czLGe"><span>查询Q = ["major", "cities", "Amazon", "river"]（4个token）</span></li></ul>

<ul><li id="t-rQ6TXXs08j2kjQtmjcW7x3"><span>文档D = ["cities", "along", "the", "Amazon", "river", "include", "Manaus", "and", "Iquitos"]（9个token）</span></li></ul>

<p id="t-Ca0Cc8R5S8DSeODeA58B2E"><span style="font-weight:bold">MaxSim算法流程</span></p>

<p id="t-orWbbbi3mXPIaJHv0MpBqd"><span style="font-weight:bold">Step 1: 向量化</span></p>

<pre id="t-Th6X6wvYuCmkg8IqMOmi0a"><code>Q = [v_major, v_cities, v_Amazon, v_river] ∈ ℝ^(4×128)
D = [v_cities, v_along, ..., v_Iquitos] ∈ ℝ^(9×128)</code></pre>

<p id="t-veeaWYGWfJ8mNo9DIKj4HG"><span>每个token都是一个128维向量</span></p>

<p id="t-zVtDGp0UPLq9m7uqOGJgBW"><span style="font-weight:bold">Step 2: 对查询的每个token，找文档中最相似的token</span></p>

<pre id="t-EaSEKpknN8Z69nwEOJCYRn"><code>MaxSim(v_major, D) = max(sim(v_major, v_i)) for all v_i ∈ D
MaxSim(v_cities, D) = max(sim(v_cities, v_i)) for all v_i ∈ D
...</code></pre>

<p id="t-jjmC7SCHwSl0OtzViGu3mY"><span style="font-weight:bold">Step 3: 求和得到最终相似度分数</span></p>

<pre id="t-fNHgcc7gAcHgzTGHg4p7iA"><code>Score(Q, D) = Σ MaxSim(v_qᵢ, D)</code></pre>

<p id="t-gIjf8MjLfCITgceIjPekWn"><span>将每个查询token的最大相似度加起来</span></p>

<p id="t-9wPD3DZUCzLtEdRd2bc3SF"><span style="font-weight:bold">具体计算示例</span></p>

<pre id="t-E020WqDDyKOTbPUeqbjk1A"><code>mport numpy as np
from sklearn.metrics.pairwise import cosine_similarity

#假设的向量（简化为3维演示）
query_vectors = np.array([
 [0.8, 0.2, 0.1], # "major"
 [0.1, 0.9, 0.2], # "cities"
 [0.3, 0.1, 0.8], # "Amazon"
 [0.2, 0.3, 0.7], # "river"
])

doc_vectors = np.array([
 [0.2, 0.9, 0.1], # "cities"
 [0.5, 0.4, 0.3], # "along"
 [0.4, 0.1, 0.9], # "Amazon"
 [0.3, 0.2, 0.8], # "river"
 [0.6, 0.3, 0.2], # "Manaus"
])

def maxsim_score(query_vecs, doc_vecs):
 """
    计算MaxSim分数
    """
    total_score = 0
 for i, q_vec in enumerate(query_vecs):
 # 计算这个查询token与所有文档token的相似度
        similarities = cosine_similarity([q_vec], doc_vecs)[0]
 # 取最大值
        max_sim = np.max(similarities)
        max_idx = np.argmax(similarities)
        total_score += max_sim
 print(f"查询token {i} 最匹配文档token {max_idx}, 相似度: {max_sim:.3f}")
 return total_score

score = maxsim_score(query_vectors, doc_vectors)
print(f"\n总分数: {score:.3f}")</code></pre>

<blockquote id="t-PN78reLfLDHPLUrppvKFbf"><span>💡 </span><span style="font-weight:bold">为什么MaxSim这么有效？</span><span style="font-weight:bold">细粒度匹配</span><span>：每个词都能找到文档中最相关的对应，不会被无关词干扰</span><span style="font-weight:bold">上下文感知</span><span>：因为用的是BERT，每个token的向量都包含了上下文信息</span><span style="font-weight:bold">灵活性</span><span>：查询和文档的长度可以完全不同，算法会自动适应</span><span style="font-weight:bold">可解释性</span><span>：可以看到每个查询词具体匹配到文档的哪个词</span></blockquote>


<a id="section-1262"></a>
## ColBERT实战代码

<a id="t-w0GogL0Z6FtrUoVuhb6CRX"></a>

<p id="t-7B6bhQeYmhiglsGUwWyTgx"><span>好消息！我们有一个超级好用的库</span><span style="font-weight:bold">RAGatouille</span><span>，让ColBERT的使用变得超级简单：</span></p>

<a id="t-s0yO0ymcJBudc6CNBkYDWu"></a>

##### 第一步：安装和初始化

<pre id="t-EB6xdZeFbgGndzOlY6gPnw"><code>#安装
!pip install ragatouille

#初始化ColBERT模型
from ragatouille import RAGPretrainedModel

#加载预训练的ColBERT v2模型
RAG = RAGPretrainedModel.from_pretrained("colbert-ir/colbertv2.0")

print("✅ ColBERT模型加载完成！")</code></pre>

<a id="t-QUSPsEQtgDJwOqcRVRyCtB"></a>

##### 第二步：索引文档

<pre id="t-nisccmwjpvQu8HdPmx571J"><code>#准备文档
documents = [
 "RAG is a technique that combines retrieval and generation.",
 "ColBERT uses token-level embeddings for better retrieval.",
 "BERT is a transformer-based language model.",
 "Vector databases store embeddings for similarity search.",
 "Large language models can generate human-like text."
]

#创建索引 - ColBERT会自动处理token化和embedding
index_path = RAG.index(
    collection=documents,
    index_name="my_colbert_index",
    max_document_length=256, # 文档最大长度
    split_documents=True # 是否自动切分长文档
)

print(f"✅ 索引创建完成，保存在: {index_path}")</code></pre>

<a id="t-0rxLAyRc9dGuoCdfTY1ARV"></a>

##### 第三步：搜索

<pre id="t-WTUVtB0j5dLoqDTmMSsI7G"><code>#搜索
query = "How does ColBERT improve retrieval?"

results = RAG.search(
    query=query,
    k=3 # 返回top-3结果
)

#打印结果
for i, result in enumerate(results):
 print(f"\n📄 Result {i+1} (Score: {result['score']:.3f})")
 print(f"Content: {result['content']}")
 print(f"Document ID: {result['document_id']}")</code></pre>

<a id="t-o8Ca3WoDQdew1t1tEgVCCs"></a>

##### 高级用法：Reranking

<p id="t-rHG53OX0r1IJ2Cnazj51cJ"><span>ColBERT的一个杀手级应用是用来</span><span style="font-weight:bold">重排序</span><span>！你可以先用其他方法（如BM25或简单的向量检索）快速找到候选集，然后用ColBERT精排。</span></p>

<pre id="t-FoEVTjEwVE1D6d41if6mXd"><code>#假设你已经用BM25找到了100个候选文档
candidate_docs = [...] # 100个文档

#用ColBERT重排序 - 不需要预先建立索引！
colbert = RAGPretrainedModel.from_pretrained("colbert-ir/colbertv2.0")

reranked_results = colbert.rerank(
    query="What is machine learning?",
    documents=candidate_docs,
    k=10 # 只保留top-10
)

#ColBERT会根据MaxSim分数重新排序
for i, doc in enumerate(reranked_results):
 print(f"{i+1}. {doc['content'][:100]}... (Score: {doc['score']:.3f})")</code></pre>


<a id="section-1263"></a>
## ColBERT性能与权衡

<a id="t-FgUQVGkBv1q7LpSo59kyX3"></a>

<div id="t-5RuH4NpKC3HSIib2H43mE7"><table><colgroup><col width="192.9010009765625"/><col width="139.00335693359375"/><col width="139.00335693359375"/><col width="139.00335693359375"/></colgroup><tbody><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">指标</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">单向量方法</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">ColBERT</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">差异</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">检索准确率</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">65%</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">82%</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">0.17</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">复杂查询表现</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">59%</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">79%</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">0.2</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">检索速度</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">50ms</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">180ms</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">2.6</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">索引大小(10M文档)</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">61GB</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">768GB</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">11.58</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">内存占用</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">2GB</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">48GB</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">23</span></p></td></tr></tbody></table></div>

<blockquote id="t-uvzZqcioTSjPeULhkjdgg8"><span>⚖️ </span><span style="font-weight:bold">ColBERT的权衡</span><span style="font-weight:bold">优势：</span><span>
检索质量大幅提升（+17%到+20%）</span><span>
对复杂查询和长尾词表现优异</span><span>
可解释性强，能看到词级别的匹配</span><span style="font-weight:bold">劣势：</span><span>
存储开销巨大（12倍！）</span><span>
检索速度较慢（3倍多）</span><span>
需要更多内存（24倍！）</span><span style="font-weight:bold">推荐策略：</span><span style="font-weight:bold">小规模数据</span><span>（&lt;100万文档）：直接用ColBERT</span><span style="font-weight:bold">大规模数据</span><span>（&gt;1000万文档）：用混合方法，先用向量粗排，ColBERT精排</span><span style="font-weight:bold">对质量要求极高</span><span>：咬咬牙用ColBERT，存储成本值得！</span></blockquote>


<a id="section-1264"></a>
## ColBERT v2的优化

<a id="t-fg63aUjPPWaIlpmDoWR6I8"></a>

<p id="t-SF8UZ6dSwP23Lkt5Z7EL9o"><span>ColBERT v2在v1的基础上做了重大优化，主要是</span><span style="font-weight:bold">压缩</span><span>：</span></p>

<a id="t-JqOE5ziJaOFRSExvM1lXFs"></a>

##### 残差压缩 (Residual Compression)

<p id="t-yTsZezCjLmJE7UMz6eDh7b"><span>ColBERT v2使用了一个聪明的技巧：每个token向量不是完整存储，而是存储为一个</span><span style="font-weight:bold">质心(centroid)加上一个残差(residual)</span><span>。</span></p>

<p id="t-lb1emMPImd9vaslON2s8Eh"><span style="font-weight:bold">残差压缩公式</span></p>

<pre id="t-G0BzZkDGXLO2vbBbT1ACfk"><code>v_token = centroid_k + residual_token

其中：
• centroid_k 是最近的质心向量（从少量质心中选择）
• residual_token 是低精度的差值（1-2bit量化）

存储从 128×32bit 降低到 ID×log₂(n_centroids) + 128×1bit
约为原来的1/6！
#ColBERT v2的索引自动使用压缩
RAG_v2 = RAGPretrainedModel.from_pretrained("colbert-ir/colbertv2.0")

#创建压缩索引
index = RAG_v2.index(
    collection=documents,
    index_name="compressed_index",
 # ColBERT v2会自动：
 # 1. 学习质心（通常2048或4096个）
 # 2. 对残差进行1-2bit量化
 # 3. 存储压缩后的表示
)

#索引大小从 154GB 降低到 16GB（1bit）或 25GB（2bit）
#检索质量基本不变！</code></pre>


<a id="section-1266"></a>
## 全面对比

<a id="t-m79QfRbgl2o2voI4giPibm"></a>

<div id="t-FSbl0Guz11dv3LuhBhSpaS"><table><colgroup><col width="142.89755249023438"/><col width="175.01025390625"/><col width="153.0068359375"/><col width="165.00506591796875"/></colgroup><tbody><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">特性</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">Multi-representation</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">RAPTOR</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">ColBERT</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">核心思想</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">双存储：摘要检索，原文返回</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">层次树：递归摘要，多层抽象</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">Token级：细粒度向量，后期交互</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">检索准确率提升</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">0.13</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">19.71</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">16.8</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">对简单问题</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">⭐⭐⭐⭐</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">⭐⭐⭐</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">⭐⭐⭐⭐⭐</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">对复杂问题</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">⭐⭐⭐</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">⭐⭐⭐⭐⭐</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">⭐⭐⭐⭐</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">实现复杂度</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">中</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">高</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">低（有库）</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">构建时间</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">0.12</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">6</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">0.5</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">存储开销</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">0.2</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">0.8</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">588</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">检索速度</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">0.12</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">0.1</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">2.6</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">最适合场景</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">通用RAG优化</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">长文档、多跳推理</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">精准检索、专业领域</span></p></td></tr></tbody></table></div>


<a id="section-1267"></a>
## 选型决策树

<a id="t-a6zvkZLwT8cIYV6bKJ7rM7"></a>

<div id="t-22GFlmv8lBBxNfR12XfbtL"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/a1cf1a82792a9b274f298b04.png"/></div>


<a id="section-1268"></a>
## 六、Retrieval检索和Generation生成优化策略

<a id="t-A9Ed0GA6kAR2DHHdCL7R6b"></a>

<p id="t-4rufq3sN1x9pnxmoTNPN7p"><span>嗨，朋友们！今天咱们来深入聊聊RAG系统中最关键的两个环节——</span><span style="font-weight:bold">检索（Retrieval）</span><span> 和 </span><span style="font-weight:bold">生成（Generation）</span><span> 的优化策略。你可能会问，为啥要优化这两个环节？简单来说，就是要让AI系统更聪明、更准确、更靠谱！</span></p>

<p id="t-QLlpeyhSuKrrHUUWqacVjz"><span>想象一下，你在图书馆找资料，如果你找到的书跟你要查的内容八竿子打不着，那后面写的报告肯定也是驴唇不对马嘴。RAG系统也是一样的道理——检索质量决定了生成质量。</span></p>


<a id="section-1269"></a>
## Retrieval检索优化策略

<a id="t-WmABlV8xZqVvmQYxQD4NiA"></a>

<a id="t-rY3BTOXR4fGf7hV5kGdhDu"></a>

##### 什么是检索优化？

<p id="t-gm9kuk91R8efcl1k6Uw5Di"><span>检索优化就是在索引的基础上，通过各种技巧和策略，让系统更准确地找到用户真正需要的信息。咱们可以把它想象成一个超级图书管理员，不仅知道书在哪儿，还知道哪本书最适合你的需求。</span></p>

<p id="t-uGwu7do2TsIk4yVA9z1qz0"><span>完成对问题的改写、不同知识库查询的构建以及路由分发、查询构建和索引生成优化之后，我们可以进一步优化Retrieval检索。主要包括以下几个方面：</span></p>

<ol start="11"><li id="t-H4TnY28H6nLcJOGi3miGbw"><span style="font-weight:bold">Ranking（排序）</span><span>：对检索结果进行初步排序</span></li></ol>

<ol start="12"><li id="t-PGaGEe72spG4UMhVsXPB7g"><span style="font-weight:bold">Refinement（精炼）</span><span>：对检索结果进行过滤和优化</span></li></ol>

<ol start="13"><li id="t-qpAZWHGJJc5QSbs6SNaRBD"><span style="font-weight:bold">Adaptive Retrieval（自适应检索）</span><span>：根据查询特征动态调整检索策略</span></li></ol>

<a id="t-eAgLwWTCHju7rrHZl1h7sR"></a>

##### 检索的几种主要类型

<ol start="14"><li id="t-bRR4p2UZc1T9Bl2VT31WN3"><span>父文档检索（Parent Document Retrieval）</span></li></ol>

<p id="t-UfscFozYSnRpRCW1P1aREq"><span>这个概念听起来有点抽象，本案例用个生活化的例子来解释：</span></p>

<p id="t-qzn7U8E8rEANYWm1oyOH29"><span>假设你在看一本书，目录上写着"第三章：人工智能的发展"。你点开目录（小分块），但实际阅读的是整个第三章的内容（父文档）。这就是父文档检索的核心思想！</span></p>

<p id="t-WFdjT2BHezvvsbYTNHMWue"><span style="font-weight:bold">为什么需要父文档检索？</span></p>

<ul><li id="t-v1TNaADorFv2qg03gYUyXq"><span style="font-weight:bold">检索时</span><span>：小分块更精准，embedding能更准确地反映含义</span></li></ul>

<ul><li id="t-sZlAo16ETJk7imrovIQQfd"><span style="font-weight:bold">生成时</span><span>：大文档更完整，能保留足够的上下文信息</span></li></ul>

<p id="t-48UOCVzsixFk2AYs8cHsnR"><span style="font-weight:bold">三种实现方式：</span></p>

<p id="t-Md2n1GUHMvkUBZH41dWKhY"><span style="font-weight:bold">方式一：小块检索 → 父文档返回</span></p>

<pre id="t-WH72fexE1hc6rBpSfhmQhD"><code>检索小分块 → 找到对应的父文档 → 返回完整的父文档/更大的分块</code></pre>

<p id="t-HtVL67jD4Y8VJIgWYCp5Vs"><span style="font-weight:bold">方式二：摘要检索 → 原文返回</span></p>

<pre id="t-Ia4OiZKmq74uQ8Hxs6tKEP"><code>LLM生成文档摘要 → 对摘要进行embedding → 检索摘要 → 返回原始文档</code></pre>

<p id="t-wpaoFzNNUV9q1GpUtHwMRg"><span style="font-weight:bold">方式三：假设性问题检索</span></p>

<pre id="t-btSLDhaU8QUC2fItS5vHOh"><code>LLM为文档生成假设性问题 → embedding问题 → 检索问题 → 返回原文档</code></pre>

<p id="t-FOaTcf0QJMIGXfIV7un5Wm"><span>💡 </span><span style="font-weight:bold">举个实际例子</span><span>：</span></p>

<pre id="t-JQOQjmLr75IdbMzXWkT02P"><code>原始文档（1000字）：详细介绍了如何使用Python进行数据分析...
↓
生成摘要（100字）："本文介绍Python数据分析的核心技术..."
↓
用户查询："如何用Python做数据分析？"
↓
检索到摘要（相似度高）→ 返回完整的1000字原文档</code></pre>

<ol start="15"><li id="t-S3J9fh6Y8OZRxQaeKqRGBk"><span>层级检索（Hierarchical Retrieval）</span></li></ol>

<p id="t-5Rnoh2YcX8C2eilvOTgfnI"><span>想象你在一个超大型图书馆找书，如果逐本翻看，效率太低。更聪明的做法是：</span></p>

<ol start="16"><li id="t-7IhRFf5KJmGjYPw1buh8Nr"><span>先看每个分类的总目录（摘要）</span></li></ol>

<ol start="17"><li id="t-X9hZBGBWqrHdU8udUDFLVz"><span>确定大致范围</span></li></ol>

<ol start="18"><li id="t-qYS8QFSX1MsPiQjte91YdT"><span>再在特定分类里细找（文档块）</span></li></ol>

<p id="t-tvvwJYwOjvU5tEp1qVu9Xh"><span style="font-weight:bold">两步检索策略</span><span>：</span></p>

<div id="t-wSSvTPLqXeVzJLqbXTckXn"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/eb9445d0a872fbc757e1e532.png"/></div>

<p id="t-keGNDnfxrIlVgr8Clvfi3O"><span style="font-weight:bold">实际案例：</span><span style="font-weight:bold">RAPTOR</span><span style="font-weight:bold">（层级检索的经典实现）</span></p>

<p id="t-ipZSOEjeyh9Xzfkq5CsgL0"><span>RAPTOR将文档组织成树状结构：</span></p>

<ul><li id="t-dzxML2szChkgJ7tCgue4jN"><span>叶节点：原始文档块</span></li></ul>

<ul><li id="t-ahxTBkuRCPbV3jiCAfzcFi"><span>中间节点：多个文档块的摘要</span></li></ul>

<ul><li id="t-Vr6E3QSXkdedl4BrseLvkc"><span>根节点：整个文档集的总摘要</span></li></ul>

<ol start="19"><li id="t-y8IF02pgR7GbEA7uwCVctL"><span>混合检索（Fusion Retrieval）</span></li></ol>

<p id="t-T0C7sEfFRqO6ZdIKzF8IBF"><span>现实世界的检索需求千变万化，单一方法往往力不从心。混合检索就是把不同检索策略的优势结合起来！</span></p>

<p id="t-npIZCc85TLc4P75QoSnPJj"><span style="font-weight:bold">最常见的组合：稀疏检索 + 密集检索</span></p>

<div id="t-RqTEeWJ7FjSbm9Pj8WfN8A"><table><colgroup><col width="198.89926147460935"/><col width="237.01031494140625"/><col width="237.01031494140625"/></colgroup><tbody><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">特性</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">向量搜索（密集检索）</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">关键词搜索（稀疏检索）</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">语义理解</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">✔️ 能理解上下文和语义</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">❌ 仅基于字面匹配</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">同义词处理</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">✔️ 自然处理</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">❌ 需要额外配置</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">精确匹配</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">❌ 不擅长</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">✔️ 擅长精确匹配</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">数字和ID查询</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">❌ 表现较差</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">✔️ 表现出色</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">专有名词</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">❌ 可能无法准确表示</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">✔️ 能准确匹配</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">计算效率</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">❌ 计算成本高</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">✔️ 更快、更高效</span></p></td></tr></tbody></table></div>

<p id="t-xGqSyfVEl8rCEG6ZU7JEMw"><span style="font-weight:bold">举个例子</span><span>：</span></p>

<pre id="t-ZuuiwitVYopj21O0RdHBAT"><code>用户查询："iPhone 15 Pro的价格"

向量搜索：可能找到关于"苹果新款手机定价"的内容
关键词搜索：精确匹配"iPhone 15 Pro"和"价格"

混合检索结果 = 两者结合，既准又全！</code></pre>


<a id="section-1270"></a>
## RRF算法详解（Reciprocal Rank Fusion）

<a id="t-2Ee2Vi3ZhvhnSpj2aneXQf"></a>

<p id="t-rUBBgssoq7tZydtxkFuoMR"><span>RRF是混合检索中最核心的融合算法，由滑铁卢大学和谷歌联合开发。</span></p>

<p id="t-8n3OpFC8VipILyM5DBmNNg"><span style="font-weight:bold">算法公式：</span></p>

<pre id="t-DNnwpNRabadpvPpJ38KiRr"><code>$$ RRF(d) = \sum_{i=1}^{n} \frac{1}{k + r_i(d)} $$</code></pre>

<p id="t-sah6W9Y6yaIyejXZ3SoM4W"><span>其中：</span></p>

<ul><li id="t-PfOUVtnmzMycJRK8QazJsN"><span>$d$ 是文档</span></li></ul>

<ul><li id="t-YjEtAT2rQPJTVEei225RZO"><span>$n$ 是检索系统的数量</span></li></ul>

<ul><li id="t-oCt3PHIhZzD0GOKmIC8MEp"><span>$r_i(d)$ 是文档 $d$ 在第 $i$ 个检索器中的排名（排名越靠前值越小）</span></li></ul>

<ul><li id="t-ov8Wvh6XcM2JQdHCfU2eN6"><span>$k$ 是常数，通常取60，用于防止低排名项权重过高</span></li></ul>

<p id="t-xV9iHBcNGMxK60YfjSExt7"><span style="font-weight:bold">实际计算案例：</span></p>

<p id="t-5pa5Gjdx0SXLUHRff0wJNp"><span>假设我们有两个检索器（向量搜索和关键词搜索），检索结果如下：</span></p>

<pre id="t-3fWj90gMqSO646xOYxhc1V"><code>文档A：
向量搜索排名：1
关键词搜索排名：3
RRF(A) = 1/(60+1) + 1/(60+3) = 1/61 + 1/63 = 0.0164 + 0.0159 = 0.0323

文档B：
向量搜索排名：2
关键词搜索排名：1
RRF(B) = 1/(60+2) + 1/(60+1) = 1/62 + 1/61 = 0.0161 + 0.0164 = 0.0325

文档C：
向量搜索排名：5
关键词搜索排名：2
RRF(C) = 1/(60+5) + 1/(60+2) = 1/65 + 1/62 = 0.0154 + 0.0161 = 0.0315</code></pre>

<p id="t-COu5IStw7sRyuNQsptZ2Zp"><span style="font-weight:bold">最终排序：B &gt; A &gt; C</span></p>

<p id="t-usONJYFfWGjfjHWEYolHWG"><span style="font-weight:bold">为什么k设为60？</span></p>

<p id="t-Zl9U6yVbmxRFVkZNvUDaPK"><span>k=60是经验值，这个值能够很好地平衡不同排名位置的权重：</span></p>

<ul><li id="t-EU2bUtLxASDk8NIrrhAe3u"><span>如果k太小（如k=10），低排名文档权重过高</span></li></ul>

<ul><li id="t-mCx7IVTxUKz1qtWkeRhnBn"><span>如果k太大（如k=200），高排名文档优势不明显</span></li></ul>

<p id="t-50VGai4woHAU6pSGzCSQiB"><span style="font-weight:bold">权重调整技巧：</span></p>

<p id="t-Div6IFJYhjHU0zm7Igfqnt"><span>你可以通过调整k值来改变不同检索器的相对重要性：</span></p>

<pre id="t-5sZnGrvVdHdaCS1aptObst"><code>#更重视向量搜索
k_vector = 30
k_keyword = 90

#更重视关键词搜索
k_vector = 90
k_keyword = 30</code></pre>


<a id="section-1271"></a>
## TM2C2算法：RRF的进化版

<a id="t-11F36ahoJ92CDWEld4eCKJ"></a>

<p id="t-JITmZxSGFiPjSodlarrVjt"><span>2023年，Pinecone和伯克利的研究人员提出了TM2C2算法（Theoretical Min-Max Convex Combination），它有以下优势：</span></p>

<ol start="20"><li id="t-JPMou150xMOxkAfwwVbjJW"><span style="font-weight:bold">更稳定</span><span>：相比传统的min-max归一化</span></li></ol>

<ol start="21"><li id="t-vfRXImOwlzqhMj6900sVLP"><span style="font-weight:bold">性能更好</span><span>：在大多数数据集上优于RRF</span></li></ol>

<ol start="22"><li id="t-NzfOAULsWKW7K3V7NrGGN3"><span style="font-weight:bold">更可解释</span><span>：α参数直观表示语义搜索和关键词搜索的相对重要性</span></li></ol>

<ol start="23"><li id="t-Rhe9v90VkrZVMV9rNanhsl"><span style="font-weight:bold">样本效率高</span><span>：只需很少训练样本就能达到好效果</span></li></ol>

<ol start="24"><li id="t-go3h9W3qCbzFCf3DGfOEFc"><span>多向量检索（Multi-Vector Retrieval）</span></li></ol>

<p id="t-sA33JuMtUvDQ2A5cXkxW3k"><span>一份文档可以有多种embedding方式！就像一个人可以有多张不同角度的照片。</span></p>

<p id="t-DscrgMagt1D3QND4yy02JE"><span style="font-weight:bold">典型场景：半结构化文档（文本+表格）</span></p>

<p id="t-4KufaUM1DbW4YkHDrWBWYm"><span>原始文档：</span></p>

<pre id="t-AZ2CXO7M4hXobairoFAzbT"><code>├── 文本部分 → embedding_text
├── 表格部分 → 生成摘要 → embedding_table_summary
└── 图片部分 → 多模态embedding → embedding_image

检索时可以同时使用三种embedding，提高召回率！</code></pre>

<p id="t-7DVKKNhRsluzOmoZ7UzO3o"><span style="font-weight:bold">实际案例：</span></p>

<pre id="t-mwlgAkDWgIjHstqjR0DD7r"><code>用户查询："2023年第三季度销售额对比"

传统方法：只能检索文本
多向量方法：
    检索文本描述
    检索表格（包含具体数据）
    检索图表（可视化展示）

返回时：摘要用于匹配，但实际返回原始表格给LLM</code></pre>


<a id="section-1272"></a>
## Re-ranking重排

<a id="t-pBqjpCwVR0fq03O3M8UfdU"></a>

<a id="t-rtwE7JBZzbYtcYY5S8lQ1b"></a>

##### 为什么需要Re-ranking？

<p id="t-37EABGzm8lp5FHOOq53Kla"><span>你有没有遇到过这种情况：Google搜索前10个结果里，最有用的那个藏在第7位？Re-ranking就是为了解决这个问题！</span></p>

<p id="t-rEtiWVzo0RTcqRKkwvpeUs"><span style="font-weight:bold">核心问题：</span><span> 检索出来的chunks并不一定完全和问题相关，直接提交给LLM可能导致：</span></p>

<ul><li id="t-9Gxn7x3mbJu42ZdzaqdLGz"><span>生成结果质量不佳</span></li></ul>

<ul><li id="t-53lnfufNKaGKLndEC5YbT5"><span>包含无关信息</span></li></ul>

<ul><li id="t-25dE5XrBlWnlfO75zJ230R"><span>浪费token成本</span></li></ul>

<p id="t-i4ogQi1xcI1BNl9wkSuVG4"><span style="font-weight:bold">解决思路：借鉴推荐系统的做法</span></p>

<pre id="t-z6YRMzWTzfnZhTeP7OS5lA"><code>粗排（Coarse Ranking）：基于Embedding快速筛选
    ↓
精排（Fine-grained Ranking）：专门的排序引擎深度评分
    ↓
Top-K选择：挑选最相关的内容</code></pre>

<a id="t-W8j6ePJuOB3LNw958pi247"></a>

##### Re-ranking架构图

<div id="t-yyUsm4CNEezvPWK3J6Bsdk"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/62f36ef9a83e593af4b19508.png"/></div>

<a id="t-xDGDbCTbzZBZCBmtX61A2Q"></a>

##### 两种主要实现方式

<a id="t-v4giHAD6G82R6z1W9MiPmS"></a>

###### 方式一：专门的排序引擎

<ol start="25"><li id="t-wvzHjRcJNH8XsWGu5tTuAo"><span style="font-weight:bold">Cohere Rerank（商业化首选）</span></li></ol>

<p id="t-3ZejZ9KLDMBXW6HTlmIJnC"><span>Cohere Rerank 3是目前最先进的重排模型，具有以下特点：</span></p>

<p id="t-xV1Q5hjk5rfpIKfHyyperQ"><span style="font-weight:bold">核心优势：</span></p>

<ul><li id="t-J39veiU1v67qwbyiwrvoaS"><span>✨ 4K上下文长度窗口（2025年最新版本）</span></li></ul>

<ul><li id="t-HZmaQq4G0RlUpo2dqHHCSk"><span>✨ 支持多方面和半结构化数据（邮件、发票、JSON、代码、表格）</span></li></ul>

<ul><li id="t-pCU7pvDVS01kdOEeru1u5p"><span>✨ 100+语言支持</span></li></ul>

<ul><li id="t-iBTRdrlstUYyxUX9hlahuq"><span>✨ 低延迟、低成本</span></li></ul>

<ul><li id="t-BtXrzAxlWzifTTmHQsuSap"><span>✨ 企业级精度</span></li></ul>

<p id="t-RvG5oXIX8pbBuadb9rUjF1"><span style="font-weight:bold">工作原理：</span></p>

<p id="t-d7bxJ9pcmDPb40GvjihBDc"><span>Cohere Rerank使用</span><span style="font-weight:bold">交叉</span><span style="font-weight:bold">编码器</span><span style="font-weight:bold">（Cross-Encoder）</span><span>架构：</span></p>

<pre id="t-jmL0FPX2zoEqCvPpBn4xyh"><code>输入：(查询, 文档) 配对
     ↓
Transformer同时处理查询和文档
     ↓
深度交互捕获语义关系
     ↓
输出：相关性分数（0-1之间）</code></pre>

<p id="t-543NBYtcJBhekAWhpoKflu"><span style="font-weight:bold">实际代码示例（LangChain）：</span></p>

<pre id="t-MKhnUcnxmKTTeiAzGQsctb"><code>from langchain_cohere import CohereRerank
from langchain_core.documents import Document

#初始化Cohere Rerank
cohere_rerank = CohereRerank(
    api_key="your_api_key",
    model="rerank-english-v3.0", # 2025最新模型
    top_n=5
)

#查询
query = "What is the capital of the United States?"

#候选文档
docs = [
    Document(pageContent="Carson City is the capital of Nevada..."),
    Document(pageContent="Washington, D.C. is the capital and largest city of the United States..."),
    Document(pageContent="The Commonwealth of the Northern Mariana Islands..."),
    Document(pageContent="Capital punishment has existed in the US since...")
]

#重排序
reranked_docs = cohere_rerank.rerank(docs, query, top_n=5)

#结果示例：
[
{ index: 1, relevanceScore: 0.987 }, # Washington, D.C.
{ index: 0, relevanceScore: 0.089 }, # Carson City
{ index: 2, relevanceScore: 0.041 } # Commonwealth
]</code></pre>

<p id="t-nZ8oOebfpC35t2zXtrZd8I"><span style="font-weight:bold">Cohere Rerank的性能指标：</span></p>

<pre id="t-R0LfoQVsJGIWxZrvrpdIP8"><code>指标对比（基于BeIR Benchmark）：
┌────────────────────┬──────────┬──────────┐
│      模型          │  NDCG@10 │ 延迟(ms) │
├────────────────────┼──────────┼──────────┤
│ Cohere Rerank 3    │   0.582  │    45    │
│ Cohere Rerank 2    │   0.551  │    38    │
│ BGE Reranker       │   0.534  │    52    │
│ Cross-Encoder Mini │   0.498  │    28    │
└────────────────────┴──────────┴──────────┘</code></pre>

<p id="t-g49lHIvpQcmNCA6Yquo1hb"><span style="font-weight:bold">成本效益分析</span><span style="font-weight:bold">：</span></p>

<p id="t-CgtrG3HR1vTVhboLzndltX"><span>使用Rerank的ROI（投资回报率）：</span></p>

<pre id="t-BeXTL932UUN1dWamocV66z"><code>场景：企业知识库搜索（10M文档）

不使用Rerank：
需要返回Top-50给LLM
GPT-4 Token成本：$0.03/1K tokens
平均每次查询tokens：15,000
单次成本：$0.45
准确率：72%

使用Rerank：
初始检索Top-100
Rerank成本：$0.002/查询
只返回Top-10给LLM
平均每次查询tokens：3,000
LLM成本：$0.09
总成本：$0.092
准确率：89%

节省：79.6%
准确率提升：17个百分点</code></pre>

<ol start="26"><li id="t-lOb0gHeWRxaOYgO7Mrp5aC"><span style="font-weight:bold">Jina AI Rerank</span></li></ol>

<p id="t-uV02xpan0C6y5lWxIZGZM0"><span>Jina Rerank专注于多模态重排：</span></p>

<p id="t-ianHNLGiOtcwsRmpsEzofK"><span>特点：</span></p>

<ul><li id="t-avu0Tefsb3IwTgHIYGRbKN"><span>🎨 支持文本、图像、音频的联合重排</span></li></ul>

<ul><li id="t-mTWnZTAm6rpRneixtoWqU1"><span>🌍 多语言支持</span></li></ul>

<ul><li id="t-0jFPxLZGsSGTdnGD5HOlEp"><span>🚀 可本地部署</span></li></ul>

<ul><li id="t-fgoyZ5lY73bi1xPDxYgM1a"><span>💼 企业级安全</span></li></ul>

<ol start="27"><li id="t-YWPQwYDIg201RklSO4fK0i"><span style="font-weight:bold">ColBERT Reranker</span></li></ol>

<p id="t-tdJLcr208atjtI07zPZiNm"><span>ColBERT（Contextualized Late Interaction over BERT）是一种快速准确的检索模型：</span></p>

<p id="t-I2edkK2PjPOtCl9nH9GIu8"><span style="font-weight:bold">核心创新：</span></p>

<pre id="t-Sf0wEuCTcbjnU7DXHvyGDp"><code>传统Cross-Encoder：
Query + Doc → BERT → Score
（每个配对都要完整计算，慢）

ColBERT：
Query → BERT → Q_vectors (预计算)
Doc → BERT → D_vectors (预计算)
Score = MaxSim(Q_vectors, D_vectors) （快速计算）</code></pre>

<p id="t-IhQz2milt36ERC28TC2iCU"><span style="font-weight:bold">性能对比：</span></p>

<pre id="t-ZkVf9e9s3o5dnl04C6Cb3A"><code>检索10K文档：
    Cross-Encoder: ~5秒
    ColBERT: ~50毫秒
速度提升：100倍！</code></pre>

<a id="t-I1ysTCpIMwFYE4A5vOksSK"></a>

###### 方式二：使用LLM做重排序

<p id="t-d14LvyIh6elKxvDbBgGKzZ"><span style="font-weight:bold">基本思路：</span><span> 让大模型直接对文档相关性进行评分和排序。</span></p>

<p id="t-BmWZI3SR79CO2SoITl02PC"><span style="font-weight:bold">LlamaIndex内置的重排Prompt：</span></p>

<pre id="t-TSTs4ywZ3U9ndhil8rv6Ap"><code>以下是一些上下文：
{context}

请根据以下查询对上下文的相关性进行评分（0-10分）：
查询：{query}

对于每个上下文片段，请给出：
    相关性分数（0-10）
    简短的理由

最后，请按相关性从高到低排序。</code></pre>

<p id="t-MZJL2ObPxPnsd5Bm3EhIxl"><span style="font-weight:bold">实际示例：</span></p>

<pre id="t-HdYpOdtZPiFpxSNMmyDaXQ"><code>from llama_index import GPTListIndex
from llama_index.indices.postprocessor import LLMRerank

#文档列表
documents = [...]

#使用GPT-4进行重排
reranker = LLMRerank(
    choice_batch_size=5,
    top_n=3,
    model="gpt-4"
)

query = "如何优化RAG系统的检索性能？"
reranked_nodes = reranker.postprocess_nodes(
    nodes=documents,
    query_str=query
)</code></pre>

<p id="t-RkBjKhv8U9sBPDe9LXYFcT"><span style="font-weight:bold">LLM</span><span style="font-weight:bold">重排的评分示例：</span></p>

<pre id="t-2nqFxLaQo8qJt6BMyIHTur"><code>查询："Python数据分析最佳实践"

文档A："本文介绍了使用Pandas进行数据分析的技巧..."
评分：9/10
理由：直接相关，提供了具体的实践方法

文档B："数据科学导论：从统计学到机器学习..."
评分：5/10
理由：内容相关但过于宽泛，缺少Python具体实践

文档C："Java编程入门教程..."
评分：1/10
理由：不相关，主题是Java而非Python</code></pre>

<a id="t-jB0P5KGTY9b5LkSZtpYrR7"></a>

##### LLM重排的优缺点

<p id="t-GcycZg5ttAL2JNp00hgwvx"><span style="font-weight:bold">优点：</span></p>

<ul><li id="t-hqjrZyF8QyiaafLSVJETEl"><span>✅ 理解能力强，能捕捉复杂的语义关系</span></li></ul>

<ul><li id="t-jrmCyjf0Xb0Go7lrln9yGk"><span>✅ 灵活性高，可以根据需求调整prompt</span></li></ul>

<ul><li id="t-RdCLFzB6iHt1rQ5xNdrmCt"><span>✅ 可以提供排序理由，增强可解释性</span></li></ul>

<p id="t-pF3ll5YH7R8MNvyuPqxoQR"><span style="font-weight:bold">缺点：</span></p>

<ul><li id="t-OifTOaLWr976f6o2dRjqeG"><span>❌ 速度慢（每次调用LLM API需要时间）</span></li></ul>

<ul><li id="t-agbV6WTN41aFHHjG72mW5v"><span>❌ 成本高（LLM API调用费用）</span></li></ul>

<ul><li id="t-EMelRwkadzfKeFNolQBjZf"><span>❌ 无法全局对齐（分批处理导致的问题）</span></li></ul>

<p id="t-9BtxPXcBdISsLLJ3r2gRe4"><span style="font-weight:bold">成本对比：</span></p>

<pre id="t-l8hFkwfe632i5ijNWZoRac"><code>场景：1000次查询，每次重排10个文档

使用Cohere Rerank：
成本：$2
延迟：45ms/查询
总时间：45秒

使用GPT-4重排：
成本：$30（估算）
延迟：2000ms/查询
总时间：33分钟

Cohere Rerank更优：成本低15倍，速度快44倍</code></pre>

<a id="t-USbilzAz6haQ3qKDJGTXAc"></a>

##### 高级重排算法

<ol start="28"><li id="t-fqK4shqvOfzHE07AYyWxPk"><span>RankGPT</span></li></ol>

<p id="t-O2z241waCA3WqL10w9uyUD"><span style="font-weight:bold">论文</span><span>：</span><span style="font-style:italic">Is </span><span style="font-style:italic">ChatGPT</span><span style="font-style:italic"> Good at Search? Investigating </span><span style="font-style:italic">Large Language Models</span><span style="font-style:italic"> as Re-Ranking Agents</span></p>

<p id="t-vNTYbkUmlBnvLsIvehGt9d"><span style="font-weight:bold">创新点：</span></p>

<ul><li id="t-duq8Bp5U6aJOr9pmZCUQhT"><span>Zero-shot重排（无需训练）</span></li></ul>

<ul><li id="t-SMd4Km3PQ9gqEZk38JAWpe"><span>排列生成方法</span></li></ul>

<ul><li id="t-5qG51JhbXKsohkUmmYZmS4"><span>滑动窗口策略</span></li></ul>

<p id="t-1NDcPVl7fgfEkz3Z4MNf1t"><span style="font-weight:bold">工作流程：</span></p>

<pre id="t-NpI7FlY7TkZL9GLFojH1Je"><code>输入：查询 + 10个文档
     ↓
Prompt: "请将以下文档按相关性排序：..."
     ↓
GPT生成：[3, 1, 7, 2, 5, 9, 4, 10, 6, 8]
     ↓
重新排列文档顺序</code></pre>

<ol start="29"><li id="t-tFCgDy2f7wnNKKNNO3AdxX"><span>RankLLM / RankVicuna / RankZephyr</span></li></ol>

<p id="t-1RkNg61SsDw6G3K8uuyv5b"><span style="font-weight:bold">特点：</span></p>

<ul><li id="t-KeymlWM5SxT1AyWU3fwdc2"><span>基于开源LLM（Vicuna, Zephyr）</span></li></ul>

<ul><li id="t-Pp9k40q7RlUsaIsjMdTD4w"><span>针对重排任务进行微调</span></li></ul>

<ul><li id="t-oTcv9YI7zBoenZls9egnXp"><span>可本地部署，无需API调用</span></li></ul>

<p id="t-wuOPAlaSJKTilnNcYsUOB3"><span style="font-weight:bold">微调数据构建：</span></p>

<pre id="t-6etjLiq7zf78A6vuDyAgx8"><code>#训练样本格式
{
    "query": "什么是RAG？",
    "positive_doc": "RAG是检索增强生成...",  # 高相关
    "hard_negative_doc": "生成式AI是...",    # 相关但不准确
    "negative_doc": "机器学习基础..."        # 不相关
}</code></pre>

<a id="t-5TrlcQAFSOqz414eXdYuaE"></a>

##### 实战：构建高效的Re-ranking Pipeline

<pre id="t-MrMVMfdtjNRop5u72WVCp8"><code>from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings
from langchain_cohere import CohereRerank
from langchain.retrievers import ContextualCompressionRetriever

#步骤1：初始向量检索（粗排）
vectorstore = Chroma(
    collection_name="rag_collection",
    embedding_function=OpenAIEmbeddings()
)
base_retriever = vectorstore.as_retriever(
    search_kwargs={"k": 50} # 初始召回50个
)

#步骤2：Cohere重排（精排）
reranker = CohereRerank(
    api_key="your_api_key",
    model="rerank-english-v3.0",
    top_n=5 # 最终返回5个
)

#步骤3：组合成压缩检索器
compression_retriever = ContextualCompressionRetriever(
    base_compressor=reranker,
    base_retriever=base_retriever
)

#步骤4：执行查询
query = "如何优化RAG系统性能？"
compressed_docs = compression_retriever.get_relevant_documents(query)

#结果：从50个候选中精选出5个最相关的文档
for i, doc in enumerate(compressed_docs):
 print(f"排名 {i+1}: 相关度分数 {doc.metadata['relevance_score']:.3f}")
 print(f"内容预览: {doc.page_content[:100]}...")</code></pre>

<a id="t-lqIvfEGokKrkooMcTCGldc"></a>

##### Re-ranking的性能指标

<p id="t-gEfIUwp3RBCpF51crYfIfR"><span style="font-weight:bold">评估指标：</span></p>

<ol start="30"><li id="t-VE4TfkDtJRNB38XBobR5WH"><span style="font-weight:bold">NDCG@K (Normalized Discounted Cumulative Gain)</span></li></ol>

<pre id="t-3jRcIPfjAlKL85SJAbfLhI"><code>DCG@K = Σ(rel_i / log2(i+1))
NDCG@K = DCG@K / IDCG@K

rel_i：第i个位置文档的相关性
完美排序时NDCG = 1.0</code></pre>

<ol start="31"><li id="t-fWvnEFsYT8L1hcrteFMcgq"><span style="font-weight:bold">MRR</span><span style="font-weight:bold"> (</span><span style="font-weight:bold">Mean Reciprocal Rank</span><span style="font-weight:bold">)</span></li></ol>

<pre id="t-xEh6vklZKbebEEYIk1QC3X"><code>MRR = 1/N * Σ(1/rank_i)

rank_i：第一个相关文档的排名</code></pre>

<ol start="32"><li id="t-MFn6djjYPi0ExJ3ckwoQr4"><span style="font-weight:bold">Recall@K</span></li></ol>

<pre id="t-3ihJE2dx5FitLdJrGwbuuK"><code>Recall@K = (相关文档数) / (总相关文档数)</code></pre>

<p id="t-w2Myb2ULAzDKaKfnOpH1cy"><span style="font-weight:bold">实际案例数据：</span></p>

<pre id="t-W07LZEDbYA4YXP1DH2SYsq"><code>数据集：10K文档，100个查询
评估指标对比：

┌──────────────────┬──────────┬──────────┬────────────┐
│     方法         │ NDCG@10  │   MRR    │ Recall@10  │
├──────────────────┼──────────┼──────────┼────────────┤
│ 纯向量检索       │   0.512  │  0.448   │   0.653    │
│ 向量+RRF融合     │   0.587  │  0.521   │   0.721    │
│ Cohere Rerank    │   0.698  │  0.672   │   0.843    │
│ GPT-4 Rerank     │   0.715  │  0.689   │   0.856    │
└──────────────────┴──────────┴──────────┴────────────┘

性能提升：
Cohere vs 纯向量：NDCG提升36.3%
Cohere vs RRF融合：NDCG提升18.9%</code></pre>

<a id="t-lyeeXJwpUJOuqlkDbDS43l"></a>

##### Re-ranking最佳实践建议

<ol start="33"><li id="t-aKISnpYpD38wivRJnetxiD"><span style="font-weight:bold">选择合适的方法</span></li></ol>

<pre id="t-FNoFmMnYy967pAjoi3Auwz"><code>预算充足 + 追求极致性能 → Cohere Rerank 3
需要本地部署 → ColBERT / SentenceTransformer
中文场景 → BGE Reranker
预算有限 + 简单场景 → RRF融合</code></pre>

<ol start="34"><li id="t-ioYg0cdKCaxqfhmHZwjeNC"><span style="font-weight:bold">设置合理的</span><span style="font-weight:bold">K值</span></li></ol>

<pre id="t-7l3w9tkCkTF8oHUp7ay5Qc"><code>粗排Top-K：50-100（召回率优先）
精排Top-N：3-10（精确度优先）

原则：
K太小：可能漏掉相关文档
N太大：浪费LLM上下文窗口</code></pre>

<ol start="35"><li id="t-jBfwv2iec8Z7XxyCbU81bV"><span style="font-weight:bold">混合策略</span></li></ol>

<pre id="t-loO3M3hStiVQi5ccasMRFU"><code>第一阶段：向量检索 (Top-100)
第二阶段：RRF融合 (Top-50)
第三阶段：Cohere Rerank (Top-10)
第四阶段：LLM生成

这样既保证召回，又控制成本</code></pre>


<a id="section-1273"></a>
## CRAG：纠错检索增强生成

<a id="t-0nVyt0ToW27KBbeKNXwn3A"></a>

<a id="t-EM3z3CRhIDIEzglrgLf59T"></a>

##### 什么是CRAG？

<p id="t-pOyhFpv9zjOyrJaxjR2lUB"><span>CRAG的全称是</span><span style="font-weight:bold">Corrective Retrieval-Augmented Generation</span><span>（纠错检索增强生成）。简单来说，CRAG就是给RAG系统加了一个"质检员"，在把检索结果交给LLM之前，先检查一下这些内容靠不靠谱！</span></p>

<p id="t-4pkaNck3s2NggLqmZpasDa"><span style="font-weight:bold">核心理念：</span></p>

<pre id="t-VwDThkthNOTdryrUolbUkl"><code>传统RAG：检索 → 直接生成
CRAG：检索 → 评估质量 → 纠错/补充 → 生成</code></pre>

<a id="t-fHfKIsaoHJvfMzldxfn7EG"></a>

##### CRAG架构图

<div id="t-GvCPYkyG3NsyCL65E5UUhW"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/537c6562a51067259defc571.png"/></div>

<a id="t-rozmwOw3VicO8d1nuhIJOI"></a>

##### CRAG的三大核心组件

<ol start="36"><li id="t-fPGFeMaa6Tng8fh8yb8cNt"><span>检索评估器（Retrieval Evaluator）</span></li></ol>

<p id="t-fRFTOcgLO4UdndECoKho8m"><span style="font-weight:bold">作用</span><span>：给每个检索到的文档打分，判断其质量和相关性。</span></p>

<p id="t-bKMWHJsXS85Cu1gdn7q2D1"><span style="font-weight:bold">评估维度：</span></p>

<ul><li id="t-wBaAfkRVm80QAOLuy8xhdH"><span>相关性（Relevance）：文档是否回答了查询问题？</span></li></ul>

<ul><li id="t-ckxBVujfkRoYr8UTlyB8Pi"><span>准确性（Accuracy）：信息是否准确可信？</span></li></ul>

<ul><li id="t-tZ22NCJ95ev2LBiMczLRoj"><span>完整性（Completeness）：信息是否完整充分？</span></li></ul>

<p id="t-fKPvjIo8F7KJWkOYLLatME"><span style="font-weight:bold">评分结果分为三类：</span></p>

<pre id="t-hG6AbsZgEtDJAsNYhTreKU"><code>class DocumentRelevance(Enum):
    CORRECT = "correct" # 相关且准确，置信度 &gt; 0.8
    INCORRECT = "incorrect" # 不相关或错误，置信度 &lt; 0.3
    AMBIGUOUS = "ambiguous" # 模糊不清，0.3 &lt;= 置信度 &lt;= 0.8</code></pre>

<p id="t-FAZT4vUoVtVBbMXpSZWoVQ"><span style="font-weight:bold">评估器实现方式：</span></p>

<p id="t-ijUSWzSRoeGHFvPnNfvgc5"><span style="font-weight:bold">方式A：微调的小模型（推荐）</span></p>

<pre id="t-BZ2NVFtVp6u0OVbiP9lPGa"><code>from transformers import AutoTokenizer, AutoModelForSequenceClassification

#使用微调的T5模型
tokenizer = AutoTokenizer.from_pretrained("google/t5-large-crag-evaluator")
model = AutoModelForSequenceClassification.from_pretrained(
 "google/t5-large-crag-evaluator",
    num_labels=3 # Correct, Incorrect, Ambiguous
)

def evaluate_document(query, document):
 """评估文档相关性"""
    input_text = f"Query: {query}\nDocument: {document}\nRelevance:"
    inputs = tokenizer(input_text, return_tensors="pt", max_length=512)
    outputs = model(**inputs)
 # 获取预测结果和置信度
    probs = torch.softmax(outputs.logits, dim=-1)
    predicted_class = torch.argmax(probs).item()
    confidence = probs[0][predicted_class].item()
 return {
 "class": ["correct", "incorrect", "ambiguous"][predicted_class],
 "confidence": confidence
 }</code></pre>

<p id="t-GfydOu01S2RZwW00wHv8Tx"><span style="font-weight:bold">方式B：使用</span><span style="font-weight:bold">大模型</span><span style="font-weight:bold">（如</span><span style="font-weight:bold">GPT-4</span><span style="font-weight:bold">）</span></p>

<pre id="t-xeT0YDu7QE1SG28R33W0Tf"><code>def gpt4_evaluate(query, document):
    prompt = f"""
    评估以下文档是否回答了查询问题。
    查询：{query}
    文档：{document}
    请评估文档的相关性并选择一个类别：
    - CORRECT：文档直接回答了查询，信息准确完整
    - INCORRECT：文档不相关或包含错误信息
    - AMBIGUOUS：文档部分相关但信息不够完整
    只返回类别名称，不需要解释。
    """
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}],
        temperature=0
 )
 return response.choices[0].message.content.strip()</code></pre>

<p id="t-t2ALCs0RSZSsb88ZECEWEz"><span style="font-weight:bold">方式C：使用Cohere Rerank作为评估器</span></p>

<pre id="t-GHu8zDSW5MVFn5TfLp7r1t"><code>from langchain_cohere import CohereRerank

reranker = CohereRerank(
    model="rerank-english-v3.0",
    top_n=10
)

#Rerank会返回相关性分数
results = reranker.rerank(documents, query)

#根据分数分类
for doc in results:
 if doc['relevance_score'] &gt; 0.8:
        doc['category'] = 'CORRECT'
 elif doc['relevance_score'] &lt; 0.3:
        doc['category'] = 'INCORRECT'
 else:
        doc['category'] = 'AMBIGUOUS'</code></pre>

<ol start="37"><li id="t-SlTayICh2i4F6VaLOmyiWI"><span>知识精炼（Knowledge Refinement）</span></li></ol>

<p id="t-I9eozDWoZmMrQdVB753vHC"><span>当文档被评为"CORRECT"时，我们不是直接使用整个文档，而是进行知识精炼。</span></p>

<p id="t-lI3VRjd8Q8MgxGvGMIMnUo"><span style="font-weight:bold">分解-重组算法（Decompose-Recompose）：</span></p>

<p id="t-qyvyu72pepYxR14zq6HBIO"><span>![image-20251027163118729](img/image-20251027163118729.png</span></p>

<p id="t-pI1TrpZv84Sdq8xiVzJEs9"><span style="font-weight:bold">实际案例：</span></p>

<pre id="t-n7F0OskR59cXjyOKfThwsy"><code>原始文档（500字）：
"Python是一种广泛使用的高级编程语言，由Guido van Rossum在1989年创建。
Python的设计哲学强调代码可读性，其语法允许程序员用更少的代码表达概念。
Python支持多种编程范式，包括面向对象、命令式和函数式编程。
Python有一个庞大的标准库，被戏称为'自带电池'。
Python被广泛应用于Web开发、数据分析、人工智能、科学计算等领域。
（... 还有400字的详细历史和社区信息 ...）"

查询："Python的主要特点是什么？"

↓ 分解成知识条 ↓

知识条1："Python强调代码可读性" ✅ 相关
知识条2："Python语法简洁，用更少代码表达概念" ✅ 相关
知识条3："支持多种编程范式" ✅ 相关
知识条4："有庞大的标准库" ✅ 相关
知识条5："由Guido van Rossum在1989年创建" ❌ 不太相关
知识条6："广泛应用于多个领域" ✅ 相关

↓ 重组精炼 ↓

精炼后的上下文（150字）：
"Python的主要特点包括：
强调代码可读性
语法简洁，用更少代码表达概念
支持多种编程范式（OOP、函数式等）
拥有庞大的标准库（'自带电池'）
广泛应用于Web开发、数据分析、AI等领域"</code></pre>

<p id="t-3xCls2HOGc8tj4B6mn6S8c"><span style="font-weight:bold">知识精炼的Python实现：</span></p>

<pre id="t-v5Fs6Nn2zyAR6CgSOYILyp"><code>def decompose_document(document, query):
 """将文档分解成知识条"""
 # 按句子分割
    sentences = sent_tokenize(document)
 # 使用小模型评估每个句子的相关性
    knowledge_strips = []
 for sent in sentences:
        relevance_score = compute_relevance(query, sent)
 if relevance_score &gt; 0.6: # 阈值可调
            knowledge_strips.append({
 'content': sent,
 'score': relevance_score
 })
 return knowledge_strips

def recompose_knowledge(knowledge_strips, max_length=500):
 """重组知识条"""
 # 按相关性排序
    sorted_strips = sorted(
        knowledge_strips,
        key=lambda x: x['score'],
        reverse=True
 )
 # 组合直到达到最大长度
    result = []
    current_length = 0
 for strip in sorted_strips:
        strip_length = len(strip['content'])
 if current_length + strip_length &lt;= max_length:
            result.append(strip['content'])
            current_length += strip_length
 else:
 break
 return ' '.join(result)</code></pre>

<ol start="38"><li id="t-1adQQr0QTqoVTh7EeKsveX"><span>网络搜索（Web Search）</span></li></ol>

<p id="t-t24FL1Lxvpa7Bjm7lsd9kk"><span>当文档被评为"INCORRECT"时，系统会触发网络搜索来获取更可靠的信息。</span></p>

<p id="t-AAklq2J2O37hYhBXC0zpK7"><span style="font-weight:bold">查询重写（</span><span style="font-weight:bold">Query</span><span style="font-weight:bold"> Rewriting）：</span></p>

<p id="t-gXXMJlG2aYnYk6UKGtG1W6"><span>原始查询可能不适合网络搜索，需要重写为更适合搜索引擎的形式。</span></p>

<pre id="t-NSK3zSnGmyKRJq4XY3GP3M"><code>用户查询："我们公司去年的销售额增长了多少？"
↓ 检索内部文档 → 评估为INCORRECT
↓ 重写查询（移除公司特定上下文）
网络搜索查询："如何计算销售额增长率"</code></pre>

<p id="t-WR3laEM8KxbRUWBTtmA1zG"><span style="font-weight:bold">实现示例（使用Tavily Search </span><span style="font-weight:bold">API</span><span style="font-weight:bold">）：</span></p>

<pre id="t-hhwjtksTeXjffgtj5N1i2m"><code>from tavily import TavilyClient

def web_search_fallback(query, original_docs):
 """当检索失败时触发网络搜索"""
 # 1. 重写查询
    rewritten_query = rewrite_query_for_web(query)
 # 2. 执行网络搜索
    tavily = TavilyClient(api_key="your_api_key")
    search_results = tavily.search(
        query=rewritten_query,
        search_depth="advanced", # 深度搜索
        max_results=5
 )
 # 3. 提取和格式化结果
    web_docs = []
 for result in search_results['results']:
        web_docs.append({
 'content': result['content'],
 'url': result['url'],
 'score': result['score']
 })
 return web_docs

def rewrite_query_for_web(query):
 """使用LLM重写查询"""
    prompt = f"""
    将以下内部查询重写为适合网络搜索的形式：
    原查询：{query}
    重写时应该：
    - 移除公司特定的上下文
    - 使用更通用的术语
    - 保持查询意图不变
    重写后的查询：
    """
    response = llm.invoke(prompt)
 return response.content.strip()</code></pre>

<a id="t-Sr3IfxihABZwlgk5THqq4Q"></a>

##### CRAG的完整工作流程

<p id="t-l55RX0RTRWXWmiQesUhMnb"><span>让我们通过一个完整的例子来理解CRAG的工作流程：</span></p>

<p id="t-naJCoEj4NurVuMaVaStSyQ"><span style="font-weight:bold">场景：医疗知识问答系统</span></p>

<pre id="t-X2coX4T12VOOdEiBol5nBm"><code>#用户查询
query = "阿司匹林的主要副作用是什么？"

#步骤1：初始检索
retrieved_docs = vector_store.similarity_search(query, k=5)
#返回5个文档

#步骤2：评估每个文档
evaluation_results = []
for doc in retrieved_docs:
    eval_result = evaluate_document(query, doc)
    evaluation_results.append(eval_result)

#评估结果示例：
Doc1: {"class": "correct", "confidence": 0.92}
Doc2: {"class": "correct", "confidence": 0.85}
Doc3: {"class": "ambiguous", "confidence": 0.65}
Doc4: {"class": "incorrect", "confidence": 0.25}
Doc5: {"class": "incorrect", "confidence": 0.18}

#步骤3：根据评估结果采取行动
correct_docs = [d for d, e in zip(retrieved_docs, evaluation_results)
 if e['class'] == 'correct']
ambiguous_docs = [d for d, e in zip(retrieved_docs, evaluation_results)
 if e['class'] == 'ambiguous']
incorrect_count = sum(1 for e in evaluation_results if e['class'] == 'incorrect')

final_context = []

#3a. 处理CORRECT文档（知识精炼）
if correct_docs:
 for doc in correct_docs:
        refined = decompose_and_recompose(doc, query)
        final_context.append({
 'source': 'internal',
 'content': refined
 })

#3b. 处理AMBIGUOUS文档（保留+网络搜索）
if ambiguous_docs:
 # 保留部分内容
 for doc in ambiguous_docs:
        refined = decompose_and_recompose(doc, query, threshold=0.7)
        final_context.append({
 'source': 'internal_ambiguous',
 'content': refined
 })
 # 补充网络搜索
    web_results = web_search_fallback(query, ambiguous_docs)
    final_context.extend(web_results)

#3c. 处理INCORRECT情况（纯网络搜索）
if incorrect_count &gt;= 3 and not correct_docs:
 # 如果大部分文档不相关，直接网络搜索
    web_results = web_search_fallback(query, retrieved_docs)
    final_context = web_results

#步骤4：生成最终答案
prompt = build_rag_prompt(query, final_context)
answer = llm.invoke(prompt)

#输出示例：
"""
阿司匹林的主要副作用包括：

胃肠道反应（最常见）
胃部不适、恶心
胃溃疡
胃出血

出血倾向
延长出血时间
增加出血风险

过敏反应
皮疹
哮喘（阿司匹林哮喘）

来源：
内部医疗知识库（置信度92%）
网络医学资源补充
"""</code></pre>

<a id="t-ozpBoINK4aAS1ydnH8YxuB"></a>

##### CRAG vs 传统RAG对比

<div id="t-Gfnbm8g1by2DGrk6lpmuqc"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/17868f1147e46b8c121c9176.png"/></div>

<p id="t-Xu33u5Ox2FlqFreVl4R0YN"><span style="font-weight:bold">性能对比（基于论文数据）：</span></p>

<pre id="t-c83cFyhO5vO22pTFg9gEwS"><code>测试集：PopQA（流行问题问答）

┌─────────────────┬───────────┬───────────┬─────────────┐
│      方法       │  准确率   │  召回率   │ 幻觉率(%)   │
├─────────────────┼───────────┼───────────┼─────────────┤
│ Vanilla LLM     │   42.3%   │   38.1%   │    28.6%    │
│ Standard RAG    │   56.8%   │   61.2%   │    15.3%    │
│ CRAG            │   71.4%   │   73.9%   │     4.2%    │
└─────────────────┴───────────┴───────────┴─────────────┘

测试集：PubHealth（医疗健康事实验证）

┌─────────────────┬───────────┬───────────┬─────────────┐
│      方法       │  准确率   │   F1     │  精确度     │
├─────────────────┼───────────┼───────────┼─────────────┤
│ Standard RAG    │   68.5%   │   0.672   │    0.681    │
│ CRAG            │   89.2%   │   0.887   │    0.893    │
└─────────────────┴───────────┴───────────┴─────────────┘

关键发现：
CRAG在医疗领域将幻觉率降低到接近0%
准确率提升了25.8个百分点
特别适合高风险领域（医疗、法律、金融）</code></pre>

<a id="t-FqsxXJPo8829I0WsXErzFM"></a>

##### CRAG的LangChain实现

<pre id="t-sJUkhZ3zY36fVb90JuyjUS"><code>from langgraph.graph import StateGraph, END
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate

#定义状态
class GraphState(TypedDict):
    query: str
    documents: List[str]
    evaluation: str
    generation: str

#节点1：检索
def retrieve(state):
    query = state["query"]
    documents = vector_store.similarity_search(query, k=5)
 return {"documents": documents, "query": query}

#节点2：评估文档相关性
def grade_documents(state):
    query = state["query"]
    documents = state["documents"]
 # 使用LLM评估
    grader_prompt = ChatPromptTemplate.from_template("""
    评估文档是否与查询相关。
    查询: {query}
    文档: {document}
    返回 'yes' 如果相关，'no' 如果不相关。
    """)
    filtered_docs = []
 for doc in documents:
        grade = grader_prompt | llm
        result = grade.invoke({"query": query, "document": doc})
 if "yes" in result.content.lower():
            filtered_docs.append(doc)
 # 判断是否需要网络搜索
 if len(filtered_docs) == 0:
 return {
 "documents": filtered_docs,
 "query": query,
 "evaluation": "incorrect"
 }
 elif len(filtered_docs) &lt; len(documents) * 0.5:
 return {
 "documents": filtered_docs,
 "query": query,
 "evaluation": "ambiguous"
 }
 else:
 return {
 "documents": filtered_docs,
 "query": query,
 "evaluation": "correct"
 }

#节点3：网络搜索
def web_search(state):
    query = state["query"]
 # 重写查询
    rewrite_prompt = ChatPromptTemplate.from_template("""
    重写以下查询使其更适合网络搜索：
    {query}
    """)
    rewritten = rewrite_prompt | llm
    new_query = rewritten.invoke({"query": query}).content
 # 执行搜索
    tavily = TavilyClient(api_key=os.getenv("TAVILY_API_KEY"))
    results = tavily.search(new_query, max_results=3)
    web_docs = [r['content'] for r in results['results']]
 return {"documents": web_docs, "query": query}

#节点4：生成答案
def generate(state):
    query = state["query"]
    documents = state["documents"]
 # 构建prompt
    context = "\n\n".join(documents)
    rag_prompt = ChatPromptTemplate.from_template("""
    基于以下上下文回答问题：
    上下文: {context}
    问题: {query}
    答案:
    """)
    chain = rag_prompt | llm
    generation = chain.invoke({"context": context, "query": query})
 return {"generation": generation.content}

#决策函数
def decide_to_generate(state):
    evaluation = state["evaluation"]
 if evaluation == "correct":
 return "generate"
 elif evaluation == "ambiguous":
 return "web_search" # 补充网络搜索
 else: # incorrect
 return "web_search"

#构建图
workflow = StateGraph(GraphState)

#添加节点
workflow.add_node("retrieve", retrieve)
workflow.add_node("grade_documents", grade_documents)
workflow.add_node("web_search", web_search)
workflow.add_node("generate", generate)

#设置入口
workflow.set_entry_point("retrieve")

#添加边
workflow.add_edge("retrieve", "grade_documents")
workflow.add_conditional_edges(
 "grade_documents",
    decide_to_generate,
 {
 "generate": "generate",
 "web_search": "web_search"
 }
)
workflow.add_edge("web_search", "generate")
workflow.add_edge("generate", END)

#编译并运行
app = workflow.compile()

#执行查询
result = app.invoke({"query": "阿司匹林的主要副作用是什么？"})
print(result["generation"])</code></pre>

<a id="t-sbOh6rYM0WcXnkjc87oMp9"></a>

##### CRAG的优缺点分析

<p id="t-BmUXu6dyX5ekdopKdLBZPM"><span style="font-weight:bold">✅ 优点：</span></p>

<ol start="39"><li id="t-Kb9rplbws1HtVPwJywcuq8"><span style="font-weight:bold">显著降低幻觉</span></li></ol>

<div id="t-7WsrquIFkD9Z9XihEUXiQa" style="display:flex;gap:0.5em"><span style="min-width:1.5em">a.</span><div><span>通过质量评估过滤不可靠信息</span></div></div>

<div id="t-DdS1FffOwc7d5HjbAFUl1Y" style="display:flex;gap:0.5em"><span style="min-width:1.5em">b.</span><div><span>医疗领域幻觉率从15%降至4%</span></div></div>

<ol start="40"><li id="t-kW29MmZCMdDXAikqYAxwRb"><span style="font-weight:bold">动态知识补充</span></li></ol>

<div id="t-huPWOgGmI7ungUKmGJf4i5" style="display:flex;gap:0.5em"><span style="min-width:1.5em">a.</span><div><span>检索失败时自动触发网络搜索</span></div></div>

<div id="t-Ng8uzacODLXCrEupZxUL2k" style="display:flex;gap:0.5em"><span style="min-width:1.5em">b.</span><div><span>保证答案的时效性</span></div></div>

<ol start="41"><li id="t-ySKjx0tC2nC6i73u2fF1dt"><span style="font-weight:bold">内容精炼</span></li></ol>

<div id="t-kddbIqwt8LxXthFs5Eel70" style="display:flex;gap:0.5em"><span style="min-width:1.5em">a.</span><div><span>分解-重组算法去除冗余</span></div></div>

<div id="t-1hOCno6SzxZCMRLm3yJvJG" style="display:flex;gap:0.5em"><span style="min-width:1.5em">b.</span><div><span>优化LLM输入，提升生成质量</span></div></div>

<ol start="42"><li id="t-zAebCahfHPyzgXeX6eYBQl"><span style="font-weight:bold">适应性强</span></li></ol>

<div id="t-9kConWfp2lfA8kFXbkjuFq" style="display:flex;gap:0.5em"><span style="min-width:1.5em">a.</span><div><span>根据文档质量自动调整策略</span></div></div>

<div id="t-kSPAJAi0qM5Rbz7iCeOuUQ" style="display:flex;gap:0.5em"><span style="min-width:1.5em">b.</span><div><span>适用于多种领域</span></div></div>

<p id="t-wiuiYibrYky2wSglfHvt3M"><span style="font-weight:bold">❌ 缺点：</span></p>

<ol start="43"><li id="t-q4khcd0i1eKpTHWSnqC2Lo"><span style="font-weight:bold">复杂度增加</span></li></ol>

<pre id="t-wTlRSw9a87k9HPeMtjFcdn"><code>传统RAG：检索 → 生成 (2步)
CRAG：检索 → 评估 → 精炼/搜索 → 生成 (4步)

系统复杂度提升100%
维护成本增加</code></pre>

<ol start="44"><li id="t-SGJDMJ7kJg4itDLkNOSJF2"><span style="font-weight:bold">延迟增加</span></li></ol>

<pre id="t-fAeXV4tJYlcydbjcMFzZ8w"><code>传统RAG延迟：~500ms
CRAG延迟：~1200ms（增加140%）

主要耗时：
文档评估：200ms
知识精炼：300ms
网络搜索（如触发）：700ms</code></pre>

<ol start="45"><li id="t-sVqXcv1fDsRcp8EJBFQmWC"><span style="font-weight:bold">成本上升</span></li></ol>

<pre id="t-9PMWKYSQo3h53TIdxKuaoq"><code>额外API调用：
评估器：每个文档1次LLM调用
查询重写：1次LLM调用
网络搜索：Tavily API费用

总成本增加约60-80%</code></pre>

<ol start="46"><li id="t-B0GhLz55mQqdIZ9Xyrbw9H"><span style="font-weight:bold">可扩展性挑战</span></li></ol>

<pre id="t-fvOEcr4g8TWvUUFLNs7BQD"><code>大规模文档（10K+）时：
评估所有文档耗时长
需要分批处理
可能引入全局不一致</code></pre>

<a id="t-PgWHj4XliwtjgW9GtEhjiS"></a>

##### CRAG适用场景

<p id="t-HNIW4kCR8wC4C1HiFJO6OV"><span style="font-weight:bold">强烈推荐：</span></p>

<ul><li id="t-8DwqJCAbYtX4fcDV4VI1gu"><span>🏥 医疗诊断辅助系统</span></li></ul>

<ul><li id="t-CRN93yixMPqBBtlEviJXxj"><span>⚖️ 法律文书分析</span></li></ul>

<ul><li id="t-X3XnM5tIBkpvO8Li8awwqz"><span>💰 金融风险评估</span></li></ul>

<ul><li id="t-7Mcb7cQbhD6sUouldPlXap"><span>🔬 科研论文问答</span></li></ul>

<ul><li id="t-EDYGLlnIFvOn38FYZX8IJ7"><span>📰 新闻事实核查</span></li></ul>

<p id="t-JLOllrqAF6VOPgaYq3t4En"><span style="font-weight:bold">不太适合：</span></p>

<ul><li id="t-HY0SF6ui8ZlcIMGOggxWEi"><span>🎨 创意写作</span></li></ul>

<ul><li id="t-ZYz7c0Qg6h04BCeutlwiqm"><span>💬 闲聊对话</span></li></ul>

<ul><li id="t-yE4kKz18AmcYqZvter8jc3"><span>🎮 娱乐应用</span></li></ul>

<ul><li id="t-Ba293irYBHEaQGLMCtx4VP"><span>⚡ 超低延迟场景</span></li></ul>

<a id="t-2oPAonGlY6KipX4UFdLni1"></a>

##### CRAG实战优化技巧

<ol start="47"><li id="t-TJd0UR5ezvEhSxJeLLkhwS"><span style="font-weight:bold">并行</span><span style="font-weight:bold">处理评估</span></li></ol>

<pre id="t-rRCzlheekObqaYR2N3pFb9"><code>from concurrent.futures import ThreadPoolExecutor

def parallel_evaluate(documents, query, max_workers=5):
 with ThreadPoolExecutor(max_workers=max_workers) as executor:
        results = list(executor.map(
 lambda doc: evaluate_document(query, doc),
            documents
 ))
 return results

#将评估时间从1000ms降至200ms（5个文档）</code></pre>

<ol start="48"><li id="t-R2W7b6uB2zETF1tBhnxRsU"><span style="font-weight:bold">缓存评估结果</span></li></ol>

<pre id="t-hpn5f41Ng10gUAt7pr7UXd"><code>from functools import lru_cache

@lru_cache(maxsize=1000)
def cached_evaluate(query_hash, doc_hash):
 return evaluate_document(query, doc)

#相同查询-文档对无需重复评估</code></pre>

<ol start="49"><li id="t-zBjFVe9RFMZ5p75zGQScsw"><span style="font-weight:bold">智能阈值调整</span></li></ol>

<pre id="t-ZGxDbNBl8BpeR4bI49HUsu"><code>def adaptive_threshold(domain, confidence):
 """根据领域调整评估阈值"""
    thresholds = {
 'medical': {'correct': 0.9, 'incorrect': 0.2},
 'general': {'correct': 0.7, 'incorrect': 0.3},
 'creative': {'correct': 0.6, 'incorrect': 0.4}
 }
 return thresholds.get(domain, thresholds['general'])</code></pre>

<ol start="50"><li id="t-T9Y48ElUULOrxPnJo3C50E"><span style="font-weight:bold">增量式网络搜索</span></li></ol>

<pre id="t-7Co31B5g3DP4XEFR3SLV6b"><code>def incremental_web_search(query, existing_docs, max_searches=3):
 """逐步增加搜索结果，而非一次性搜索大量"""
    results = []
 for i in range(1, max_searches + 1):
        new_results = tavily.search(query, max_results=i)
 if is_sufficient(existing_docs + results, query):
 break
        results.extend(new_results)
 return results</code></pre>


<a id="section-1274"></a>
## Self-RAG：自反思检索增强生成

<a id="t-KjzNgTyekKMXixYnUOv5x9"></a>

<a id="t-WnHMvVPklTTVg6kchfzKrj"></a>

##### 什么是Self-RAG？

<p id="t-oQ9gIKMx9UiKwlVSOuqHvo"><span>Self-RAG的全称是</span><span style="font-weight:bold">Self-Reflective Retrieval-Augmented Generation</span><span>（自反思检索增强生成）。如果说CRAG是给RAG加了一个"质检员"，那Self-RAG就是让RAG系统学会了"自我反思"——它能在生成过程中不断问自己："我需要查资料吗？""这个资料靠谱吗？""我生成的内容对吗？"</span></p>

<p id="t-NPNeBqaAb3ITnGo6AuQmd8"><span style="font-weight:bold">核心理念：</span></p>

<pre id="t-qB7jRMJetVeWzsdUijU5Nl"><code>传统RAG：固定检索 → 生成
CRAG：检索 → 评估 → 纠错 → 生成
Self-RAG：动态决策检索 → 评估检索质量 → 生成 → 评估生成质量 → 循环优化</code></pre>

<a id="t-9rTDZTGo20hrsP3JRSgpSE"></a>

##### Self-RAG的三大创新点

<ol start="51"><li id="t-nq13RZTZVacH5ngLOn6ksv"><span style="font-weight:bold">按需检索（On-Demand Retrieval）</span></li></ol>

<div id="t-bqkmy847y6QWMmqnjoBZ6m" style="display:flex;gap:0.5em"><span style="min-width:1.5em">a.</span><div><span>不是所有查询都需要检索</span></div></div>

<div id="t-fUNOOquv6YA9kGTo5W1rxU" style="display:flex;gap:0.5em"><span style="min-width:1.5em">b.</span><div><span>模型自己决定何时需要外部知识</span></div></div>

<ol start="52"><li id="t-sdQrneyViUk1EA34DJRRMu"><span style="font-weight:bold">自我反思（Self-Reflection）</span></li></ol>

<div id="t-Ew4aMjdyYALecwWfGhiNn6" style="display:flex;gap:0.5em"><span style="min-width:1.5em">a.</span><div><span>评估检索到的文档是否相关</span></div></div>

<div id="t-5Y3AcjLVmjzTkCfvlJWIsh" style="display:flex;gap:0.5em"><span style="min-width:1.5em">b.</span><div><span>评估生成的内容是否有事实支持</span></div></div>

<div id="t-u3JzrDzMSUfrQ4jhSQVrRm" style="display:flex;gap:0.5em"><span style="min-width:1.5em">c.</span><div><span>评估最终答案是否有用</span></div></div>

<ol start="53"><li id="t-u0G9YvefCKM2o3L7ibVux5"><span style="font-weight:bold">反思令牌（Reflection Tokens）</span></li></ol>

<div id="t-gYSYauGtWvvMOhNtMJ4gw6" style="display:flex;gap:0.5em"><span style="min-width:1.5em">a.</span><div><span>特殊的token指导模型行为</span></div></div>

<div id="t-v9ExSYWuMqTS75jYfVxuHi" style="display:flex;gap:0.5em"><span style="min-width:1.5em">b.</span><div><span>可在推理时控制模型的检索和生成策略</span></div></div>

<a id="t-lGaIBuMYoyJcw4RZTqthkj"></a>

##### Self-RAG参考图

<p id="t-GwlXlr0cXBnZ40GF067hnW"><span>来自网络</span></p>

<div id="t-YdWpSdJNOXxWQ8tY21gQUQ"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/bcc33ccdccbe964bc51697c5.png"/></div>

<a id="t-R9wV8hWLNfnL6RdgQcYIf3"></a>

##### 反思令牌（Reflection Tokens）详解

<p id="t-zoNoJ9kliNULHimOFRqFg9"><span>Self-RAG通过在词表中添加特殊的反思令牌来控制模型行为。这些令牌分为两大类：</span></p>

<ol start="54"><li id="t-uQvwOSudGepn8yLBlBjAUQ"><span>检索令牌（Retrieval Tokens）</span></li></ol>

<p id="t-KszRSWkafXMwkaTLh9iJhC"><span style="font-weight:bold">Retrieve Token：决定是否需要检索</span></p>

<pre id="t-rQxNeEaUUIvOayLOiUMIy9"><code>class RetrieveDecision(Enum):
    YES = "[Retrieve=Yes]" # 需要检索
    NO = "[Retrieve=No]" # 不需要检索    CONTINUE = "[Retrieve=Continue]"  # 继续使用之前检索的内容</code></pre>

<p id="t-J6YVe5Ci3GXPQk8ima5ev6"><span style="font-weight:bold">什么时候生成 [Retrieve=Yes]？</span></p>

<ul><li id="t-nzeeNqLnPaWN2stUIR3TE3"><span>查询涉及事实性信息</span></li></ul>

<ul><li id="t-8Dq9H5ZAq3Iac8THZPHVIO"><span>需要最新数据</span></li></ul>

<ul><li id="t-Qh2YZugzCitgeA7Q3a4QiD"><span>超出模型训练知识范围</span></li></ul>

<p id="t-zWkjU6U6zc0ICsSYgylQT5"><span style="font-weight:bold">什么时候生成 [Retrieve=No]？</span></p>

<ul><li id="t-N8Vc0w1ikasADWVdvxxIvW"><span>创意性任务（写诗、写故事）</span></li></ul>

<ul><li id="t-SV3g8IZPmXG07LbMkqYfAv"><span>常识性问题</span></li></ul>

<ul><li id="t-QO0NPnYGGwM6tjs7dV20Ar"><span>数学计算</span></li></ul>

<p id="t-aLh7Uiw9zhBmCNWWTVZZHG"><span style="font-weight:bold">实际示例：</span></p>

<pre id="t-fAVNMuYwX7KzEo2aJHqGly"><code>用户查询1："写一首关于春天的诗"
模型输出：[Retrieve=No] 春风拂面暖如酥...
（不需要检索，直接创作）

用户查询2："2024年诺贝尔物理学奖得主是谁？"
模型输出：[Retrieve=Yes]
（需要检索最新信息）

用户查询3："继续解释刚才提到的量子纠缠"
模型输出：[Retrieve=Continue]
（使用之前检索的文档）</code></pre>

<ol start="55"><li id="t-iFAZ1qOPiTtntzRK5KmrqN"><span>批评令牌（Critique Tokens）</span></li></ol>

<p id="t-zxNRA3IAPUahIBUIr7RsLE"><span style="font-weight:bold">ISREL (Is Relevant)：文档相关性判断</span></p>

<pre id="t-1MZEv0nKYEGcPfLgI60dp5"><code>class DocumentRelevance(Enum):
    RELEVANT = "[ISREL=Relevant]"
    IRRELEVANT = "[ISREL=Irrelevant]"</code></pre>

<p id="t-6NXSvLs08ytZRYEFITyAsl"><span style="font-weight:bold">ISSUP (Is Supported)：生成内容是否有事实支持</span></p>

<pre id="t-Cp5EvO8do4Ew2sMzNHGb7N"><code>class FactualSupport(Enum):
    FULLY_SUPPORTED = "[ISSUP=FullySupported]"
    PARTIALLY_SUPPORTED = "[ISSUP=PartiallySupported]"
    NO_SUPPORT = "[ISSUP=NoSupport]"</code></pre>

<p id="t-FknAxNKYgOlwt9TtHeASdG"><span style="font-weight:bold">ISUSE (Is Useful)：生成结果是否有用</span></p>

<pre id="t-kvw8VZOjwRRWIcS7HGVWol"><code>class ResponseUtility(Enum):
    USEFUL_5 = "[ISUSE=5]" # 非常有用
    USEFUL_4 = "[ISUSE=4]"
    USEFUL_3 = "[ISUSE=3]"
    USEFUL_2 = "[ISUSE=2]"
    USEFUL_1 = "[ISUSE=1]" # 完全无用</code></pre>

<a id="t-DSF7nGTnkKmb8p9EmbTp2h"></a>

##### Self-RAG vs CRAG vs 传统RAG对比

<div id="t-qNH0hTOfCyCupUkdMiLk5r"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/ed1497acde6014755e98f68f.png"/></div>

<p id="t-8Oj711bQGMj63y73vcXOAn"><span style="font-weight:bold">详细对比表：</span></p>

<pre id="t-pEKkb4g3Z3hEUx5Ck8N3gP"><code>┌─────────────────────┬──────────────┬─────────────┬──────────────┐
│        特性         │  传统RAG     │    CRAG     │   Self-RAG   │
├─────────────────────┼──────────────┼─────────────┼──────────────┤
│ 是否总是检索        │     是       │     是      │      否      │
│ 评估检索质量        │     否       │     是      │      是      │
│ 评估生成质量        │     否       │     否      │      是      │
│ 动态调整策略        │     否       │    部分     │      是      │
│ 支持迭代优化        │     否       │    有限     │      是      │
│ 模型可控性          │     低       │     中      │      高      │
│ 系统复杂度          │     低       │     中      │      高      │
│ 训练成本            │    无需      │    低       │      高      │
│ 推理延迟            │    快        │     中      │     慢       │
│ 准确率              │    中等      │     高      │     最高     │
└─────────────────────┴──────────────┴─────────────┴──────────────┘</code></pre>

<p id="t-2713e9fp5DJELMwh1qqPh1"><span style="font-weight:bold">性能对比（基于论文实验）：</span></p>

<pre id="t-eSUaUZP3bRJsWrsFuaX6Dm"><code>测试集：PopQA（开放域问答）

┌──────────────┬────────────┬────────────┬────────────┐
│    方法      │  准确率    │   F1 Score │  延迟(ms)  │
├──────────────┼────────────┼────────────┼────────────┤
│ Llama2-7B    │   31.2%    │    0.289   │    120     │
│ RAG          │   49.3%    │    0.467   │    450     │
│ CRAG         │   58.7%    │    0.556   │    980     │
│ Self-RAG-7B  │   64.1%    │    0.618   │   1200     │
│ ChatGPT      │   52.4%    │    0.501   │    800     │
│ Self-RAG-13B │   68.9%    │    0.662   │   1450     │
└──────────────┴────────────┴────────────┴────────────┘

测试集：PubHealth（事实验证）

┌──────────────┬────────────┬────────────┬────────────┐
│    方法      │  准确率    │  Precision │   Recall   │
├──────────────┼────────────┼────────────┼────────────┤
│ RAG          │   78.3%    │    0.761   │   0.792    │
│ CRAG         │   85.6%    │    0.841   │   0.869    │
│ Self-RAG-7B  │   88.2%    │    0.876   │   0.891    │
│ Self-RAG-13B │   91.4%    │    0.908   │   0.919    │
└──────────────┴────────────┴────────────┴────────────┘</code></pre>

<a id="t-gn24lhSdNzVNAJHLFIbWH5"></a>

##### Self-RAG的推理时控制

<p id="t-OXUBlNpqGniL6vtNyGENTI"><span>Self-RAG最强大的特性之一是</span><span style="font-weight:bold">推理时可控性</span><span>——你可以通过调整参数来控制模型行为，而无需重新训练！</span></p>

<ol start="56"><li id="t-O00VzIeusMOvbBwEKtap2g"><span>调整检索频率</span></li></ol>

<pre id="t-dQG58xbOctKgGSkHSRQ0al"><code>#配置：更激进的检索
config_aggressive = {
 'retrieve_threshold': 0.3, # 更低的阈值 = 更频繁检索
 'retrieve_frequency': 'every_sentence' # 每句话都评估是否需要检索
}

#配置：保守的检索
config_conservative = {
 'retrieve_threshold': 0.7, # 更高的阈值 = 较少检索
 'retrieve_frequency': 'on_demand' # 仅在必要时检索
}

#配置：平衡模式
config_balanced = {
 'retrieve_threshold': 0.5,
 'retrieve_frequency': 'adaptive' # 根据查询复杂度动态调整
}</code></pre>

<ol start="57"><li id="t-9G08MDHCQVgpEXk1V54PUH"><span>段级束搜索（Segment-wise Beam Search）</span></li></ol>

<p id="t-cjwC0bxO3hvsKxMD9ffefo"><span>Self-RAG使用特殊的束搜索策略，在生成每个段（sentence）时考虑反思令牌的影响。</span></p>

<pre id="t-1KEOm25friEtsuRgMYdwW0"><code>def segment_wise_beam_search(
    query,
    model,
    retriever,
    beam_width=5,
    preference_weights={
 'relevance': 1.0,
 'support': 1.5,
 'utility': 2.0
 }
):
 """
    段级束搜索，优化多个维度
    """
    candidates = [{'text': '', 'score': 0.0, 'path': []}]
 while not all_candidates_finished(candidates):
        new_candidates = []
 for candidate in candidates:
 # 生成下一个段
            next_segments = model.generate_next_segments(
                query,
                candidate['text'],
                num_candidates=beam_width
 )
 for segment, tokens in next_segments:
 # 计算综合分数
                score = 0.0
 # 检索令牌权重
 if '[Retrieve=Yes]' in tokens:
                    docs = retriever.get_relevant_documents(query)
                    relevance_score = evaluate_relevance(docs)
                    score += preference_weights['relevance'] * relevance_score
 # 支持度权重
 if '[ISSUP' in tokens:
                    support_level = extract_support_level(tokens)
                    score += preference_weights['support'] * support_level
 # 有用性权重
 if '[ISUSE' in tokens:
                    utility_score = extract_utility_score(tokens)
                    score += preference_weights['utility'] * utility_score
                new_candidates.append({
 'text': candidate['text'] + segment,
 'score': candidate['score'] + score,
 'path': candidate['path'] + [tokens]
 })
 # 保留top-k候选
        candidates = sorted(
            new_candidates,
            key=lambda x: x['score'],
            reverse=True
 )[:beam_width]
 return candidates[0] # 返回得分最高的候选</code></pre>

<p id="t-Tui6dAq4AE2QbFyIGEr8e0"><span style="font-weight:bold">实际效果示例：</span></p>

<pre id="t-V2h122GdnDwcqg2cJZqibt"><code>查询："介绍一下量子计算的最新进展"

偏好1：注重事实支持
preference_weights = {
 'relevance': 1.0,
 'support': 3.0, # 大幅提升支持度权重
 'utility': 1.0
}

输出：
"量子计算在2024年取得了重大突破。[Retrieve=Yes]
根据Nature期刊2024年3月的报道，IBM宣布其127量子比特的Eagle处理器... [ISSUP=FullySupported]
Google也在量子纠错方面取得进展... [ISSUP=FullySupported]"
（每个陈述都有充分的事实支持）


偏好2：注重实用性
preference_weights = {
 'relevance': 1.0,
 'support': 1.0,
 'utility': 3.0 # 大幅提升实用性权重
}

输出：
"量子计算正在改变多个行业。[Retrieve=No]
在药物发现领域，量子计算可以模拟分子相互作用...
在金融领域，可以优化投资组合...
在密码学领域，既是机遇也是挑战..."
（更注重实际应用和对用户的价值）</code></pre>

<a id="t-BGo6tucyy2xIx0yttD2Sov"></a>

##### Self-RAG的LangGraph实现

<pre id="t-YGvD7x0G1XQUY2rBvSEzvr"><code>from langgraph.graph import StateGraph, END
from langchain_openai import ChatOpenAI
from typing import TypedDict, Annotated, Sequence
import operator

#定义状态
class GraphState(TypedDict):
    query: str
    documents: Sequence[str]
    generation: str
    need_retrieve: bool
    doc_relevance: Sequence[bool]
    factual_support: str
    utility_score: int
    loop_count: int

#节点1：决定是否检索
def decide_to_retrieve(state):
 """判断查询是否需要检索"""
    query = state["query"]
 # 使用LLM判断
    prompt = f"""
    判断以下查询是否需要检索外部知识：
    查询：{query}
    如果查询涉及：
    - 最新信息或事实
    - 超出常识的专业知识
    - 需要引用来源
    则返回 "yes"
    如果查询涉及：
    - 创意写作
    - 常识问题
    - 简单计算
    则返回 "no"
    只返回 yes 或 no。
    """
    llm = ChatOpenAI(model="gpt-4", temperature=0)
    result = llm.invoke(prompt).content.lower()
 return {"need_retrieve": "yes" in result, "loop_count": 0}

#节点2：检索文档
def retrieve(state):
 """执行检索"""
    query = state["query"]
    documents = vectorstore.similarity_search(query, k=5)
 return {"documents": documents}

#节点3：评估文档相关性
def grade_documents(state):
 """评估每个文档的相关性"""
    query = state["query"]
    documents = state["documents"]
    relevance = []
    filtered_docs = []
 for doc in documents:
        prompt = f"""
        评估文档是否与查询相关：
        查询：{query}
        文档：{doc.page_content[:500]}
        如果文档包含回答查询所需的信息，返回 "relevant"
        否则返回 "irrelevant"
        """
        llm = ChatOpenAI(model="gpt-4", temperature=0)
        result = llm.invoke(prompt).content.lower()
        is_relevant = "relevant" in result
        relevance.append(is_relevant)
 if is_relevant:
            filtered_docs.append(doc)
 return {
 "doc_relevance": relevance,
 "documents": filtered_docs
 }

#节点4：生成答案
def generate(state):
 """生成答案"""
    query = state["query"]
    documents = state["documents"]
    need_retrieve = state.get("need_retrieve", True)
 if need_retrieve and documents:
 # 基于文档生成
        context = "\n\n".join([doc.page_content for doc in documents])
        prompt = f"""
        基于以下上下文回答问题：
        上下文：
 {context}
        问题：{query}
        答案：
        """
 else:
 # 直接生成
        prompt = f"""
        回答以下问题：
        问题：{query}
        答案：
        """
    llm = ChatOpenAI(model="gpt-4", temperature=0.7)
    generation = llm.invoke(prompt).content
 return {"generation": generation}

#节点5：评估事实支持度
def grade_generation_factual_support(state):
 """评估生成内容是否有事实支持"""
    generation = state["generation"]
    documents = state["documents"]
 if not documents:
 return {"factual_support": "no_docs"}
    context = "\n\n".join([doc.page_content for doc in documents])
    prompt = f"""
    评估生成的答案是否有文档支持：
    文档：
 {context}
    生成的答案：
 {generation}
    评估答案中的每个事实陈述：
    - 如果所有陈述都有文档支持，返回 "fully_supported"
    - 如果部分陈述有支持，返回 "partially_supported"
    - 如果没有支持或有明显错误，返回 "not_supported"
    """
    llm = ChatOpenAI(model="gpt-4", temperature=0)
    result = llm.invoke(prompt).content.lower()
 if "fully_supported" in result:
        support = "fully_supported"
 elif "partially_supported" in result:
        support = "partially_supported"
 else:
        support = "not_supported"
 return {"factual_support": support}

#节点6：评估答案有用性
def grade_generation_utility(state):
 """评估答案的有用性"""
    query = state["query"]
    generation = state["generation"]
    prompt = f"""
    评估答案对查询的有用性（1-5分）：
    查询：{query}
    答案：{generation}
    评分标准：
    5 - 完美回答，清晰、准确、全面
    4 - 很好回答，略有不足
    3 - 可以接受，但有明显缺陷
    2 - 较差，大部分无用
    1 - 完全无用
    只返回数字1-5。
    """
    llm = ChatOpenAI(model="gpt-4", temperature=0)
    result = llm.invoke(prompt).content.strip()
 try:
        score = int(result[0])
 except:
        score = 3 # 默认分数
 return {"utility_score": score}

#决策函数
def decide_to_generate(state):
 """决定是生成还是网络搜索"""
    need_retrieve = state["need_retrieve"]
 if need_retrieve:
 return "retrieve"
 else:
 return "generate"

def check_doc_relevance(state):
 """检查文档相关性"""
    doc_relevance = state.get("doc_relevance", [])
 if any(doc_relevance):
 return "generate"
 else:
 return "web_search"

def check_factual_support(state):
 """检查事实支持度"""
    factual_support = state["factual_support"]
 if factual_support == "fully_supported":
 return "grade_utility"
 else:
 return "regenerate"

def check_utility(state):
 """检查有用性"""
    utility_score = state["utility_score"]
    loop_count = state["loop_count"]
 if utility_score &gt;= 4:
 return "end"
 elif loop_count &lt; 2:
 return "retry"
 else:
 return "end" # 最多重试2次

#构建图
workflow = StateGraph(GraphState)

#添加节点
workflow.add_node("decide_retrieve", decide_to_retrieve)
workflow.add_node("retrieve", retrieve)
workflow.add_node("grade_documents", grade_documents)
workflow.add_node("generate", generate)
workflow.add_node("grade_support", grade_generation_factual_support)
workflow.add_node("grade_utility", grade_generation_utility)

#设置入口
workflow.set_entry_point("decide_retrieve")

#添加边
workflow.add_conditional_edges(
 "decide_retrieve",
    decide_to_generate,
 {
 "retrieve": "retrieve",
 "generate": "generate"
 }
)

workflow.add_edge("retrieve", "grade_documents")

workflow.add_conditional_edges(
 "grade_documents",
    check_doc_relevance,
 {
 "generate": "generate",
 "web_search": "retrieve" # 简化：重新检索
 }
)

workflow.add_edge("generate", "grade_support")

workflow.add_conditional_edges(
 "grade_support",
    check_factual_support,
 {
 "grade_utility": "grade_utility",
 "regenerate": "generate"
 }
)

workflow.add_conditional_edges(
 "grade_utility",
    check_utility,
 {
 "end": END,
 "retry": "retrieve"
 }
)

#编译
app = workflow.compile()

#执行
result = app.invoke({
 "query": "什么是Self-RAG？",
 "documents": [],
 "generation": "",
 "need_retrieve": True,
 "doc_relevance": [],
 "factual_support": "",
 "utility_score": 0,
 "loop_count": 0
})

print(result["generation"])</code></pre>

<a id="t-seb8lxohkF1PcMQvEVfMOu"></a>

##### Self-RAG的优缺点

<p id="t-TGXt9toP9YNfET56dkk2Vt"><span style="font-weight:bold">✅ 优点：</span></p>

<ol start="58"><li id="t-NVo1spM6mEbxWQlSIgeThc"><span style="font-weight:bold">最高准确率</span></li></ol>

<pre id="t-JrmOfIHAPb29itEww7a5sq"><code>在多个benchmark上超越ChatGPT和其他RAG方法
事实准确率提升20-30%</code></pre>

<ol start="59"><li id="t-KeKLR6jTSPjwlavLtV89Qu"><span style="font-weight:bold">按需检索</span></li></ol>

<pre id="t-XfmpI8AV2vnDcWKy8QqiGO"><code>不是所有查询都检索 → 节省成本和时间
创意任务：0次检索
事实查询：1-3次检索</code></pre>

<ol start="60"><li id="t-srdci8p9J4fo2Qysk2Hi5C"><span style="font-weight:bold">推理时可控</span></li></ol>

<pre id="t-O9Yacfw1U46uMoETNMdih6"><code>无需重新训练即可调整行为
根据不同应用场景调整偏好权重</code></pre>

<ol start="61"><li id="t-zfA2H1IECPoYz9lbZeMUYY"><span style="font-weight:bold">多维度评估</span></li></ol>

<pre id="t-B4RRodU4PbDJPCkVxbXIHU"><code>同时考虑：相关性、支持度、有用性
全面保证答案质量</code></pre>

<ol start="62"><li id="t-Cj87i3UwXojnk33VMuwDsd"><span style="font-weight:bold">自我纠错能力</span></li></ol>

<pre id="t-L1p7GdjwfhAPNLnkCuJLzA"><code>检测到答案不佳时自动重试
迭代优化直到满意</code></pre>

<p id="t-YrJXZIgh5WtaFkZGtP5ij4"><span style="font-weight:bold">❌ 缺点：</span></p>

<ol start="63"><li id="t-RiCq2msDVqXiokfJQh7njz"><span style="font-weight:bold">训练成本极高</span></li></ol>

<pre id="t-FuWYczg714UZGM2JWI1Y3N"><code>需要两阶段训练：
Critic Model训练
Generator Model训练

数据需求：10-15万条高质量样本
GPU需求：A100 × 8，训练时间2-3周
总成本：$50,000 - $100,000</code></pre>

<ol start="64"><li id="t-mRodHDyXi4J8I49Tzs4AqR"><span style="font-weight:bold">推理速度最慢</span></li></ol>

<pre id="t-76Qy1xLmThM4l1IKvGULz4"><code>每个段都需要多次评估
复杂查询可能检索多次

平均延迟：
传统RAG: 500ms
CRAG: 1000ms
Self-RAG: 1500ms</code></pre>

<ol start="65"><li id="t-DcURnnQVavDrtAMQTGk5GZ"><span style="font-weight:bold">系统复杂度最高</span></li></ol>

<pre id="t-2878ymTUY2XuB6eIzHTDyZ"><code>需要维护：
Generator模型
Critic模型
检索系统
束搜索逻辑

调试和优化难度大</code></pre>

<ol start="66"><li id="t-dD89tsZdwi6Qrvq8IoXFto"><span style="font-weight:bold">模型大小限制</span></li></ol>

<pre id="t-9pXGULTQwche3PHav1jWS2"><code>目前只有7B和13B的开源模型
更大模型（70B+）训练成本过高</code></pre>

<ol start="67"><li id="t-jiZg9Aqr4D6FkjuCpsjENN"><span style="font-weight:bold">token开销大</span></li></ol>

<pre id="t-e6FlkzVLRqsCVjs07TkY7f"><code>反思令牌占用额外空间
例如："[Retrieve=Yes] [ISREL=Relevant] [ISSUP=FullySupported]"
增加10-15%的token使用</code></pre>

<a id="t-q48oMv9WSrcpRrX6UKwibV"></a>

##### Self-RAG适用场景

<p id="t-leqD5HrzoYDld9p001nDat"><span style="font-weight:bold">强烈推荐：</span></p>

<ul><li id="t-zdHvHZbDbal8URvtGYdItx"><span>🎓 教育和研究助手</span></li></ul>

<ul><li id="t-cHIt9V2K4bzq88lmx5HWVe"><span>📚 学术论文问答</span></li></ul>

<ul><li id="t-IEM6eFvpzqmlZJATExvFk0"><span>💼 企业知识库（预算充足）</span></li></ul>

<ul><li id="t-T0MZynsoGCZowx3RIEytPF"><span>🏥 医疗文献检索</span></li></ul>

<ul><li id="t-6jgLC7UkMY4rNYQ1uAFg6C"><span>⚖️ 法律案例分析</span></li></ul>

<p id="t-4f4JmM3BoKPRwfVVjLaeXk"><span style="font-weight:bold">不适合：</span></p>

<ul><li id="t-rkAuNbtVjsYIS90kEwpHC1"><span>🚀 实时对话系统（延迟要求&lt;500ms）</span></li></ul>

<ul><li id="t-ZVEinDZGQJCa9wzq5isuGV"><span>📱 移动端应用（模型太大）</span></li></ul>

<ul><li id="t-t4Pnkm08hzNkOF82enZOXp"><span>💸 预算有限的项目（训练/推理成本高）</span></li></ul>

<ul><li id="t-9hdgeZuhB2ISI8wOE5Swz8"><span>🎨 创意类应用（过度检索可能限制创造力）</span></li></ul>

<ol start="68"><li id="t-eMRi7b6ZblE5bc1e3jY137"><span>RAG系统最头疼的3大难题</span></li></ol>

<div id="t-uy4ljcgBZdua8ZDVqFIgfS"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/a14448ee1b58ba76ad3bf7b7.png"/></div>


<a id="section-1275"></a>
## 🔥 难题1：检索不准确（最核心的痛点）

<a id="t-MPB4XWjGLiMYyNYYzqRov5"></a>

<p id="t-lnHkql4KuGDOsmb6emBFoT"><span style="font-weight:bold">问题描述</span><span>：</span></p>

<ul><li id="t-p9OMoiHalG25rTA1IC5j1h"><span>你问"苹果的营养价值"，系统却返回"苹果公司的股价"</span></li></ul>

<ul><li id="t-0WQTX4u95PIwMnngLNuhA6"><span>检索结果偏差，导致生成的答案驴唇不对马嘴</span></li></ul>

<div id="t-iv1Re9r2vCPZG5ps07OdJJ"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/57c04193099e3fceeba52626.png"/></div>

<p id="t-PTxwPJAKTTIp7yacFQBIjT"><span style="font-weight:bold">为什么会这样？</span></p>

<ol start="69"><li id="t-bjymnKEd3DUOUCFqxi4QZP"><span style="font-weight:bold">语义理解不足</span></li></ol>

<pre id="t-0bmEc8V3324OURMXEmKsZd"><code># 问题：同一个词，不同含义
query1 = "苹果好吃吗？"          # 指水果
query2 = "苹果股票怎么样？"       # 指公司

# 如果向量模型不够好，可能会混淆</code></pre>

<ol start="70"><li id="t-QO6s726icIyfUT9lCt6dN8"><span style="font-weight:bold">分块策略不当</span></li></ol>

<pre id="t-hbJS7gf3cP9AxRFkRQ8CrR"><code># ❌ 错误的切分
chunk1 = "我们的产品销售额在2023年"
chunk2 = "达到了5000万元，增长..."

# 用户查询："2023年销售额"
# 结果：chunk1被检索到，但信息不完整！

# ✅ 正确的切分（保持上下文完整）
chunk = "我们的产品销售额在2023年达到了5000万元，增长25%"</code></pre>

<ol start="71"><li id="t-NEMsRdVNPUEs2oM7VXuxef"><span style="font-weight:bold">向量检索的局限性</span></li></ol>

<pre id="t-3aIv1dXOELuIPObnqS2bcm"><code># 纯向量检索的问题
query = "2023年10月15日的会议记录"

# 向量相似度可能检索到：
# - "2023年10月16日的会议记录" ✓ （相似但不对）
# - "2023年9月的会议总结"     ✓ （相似但不对）
# - "2023年10月15日的会议记录" ✓✓✓ （精确匹配）</code></pre>

<p id="t-GRyha4KAtfASfs76flgMMT"><span style="font-weight:bold">解决方案：混合检索</span></p>

<pre id="t-jdQ37mCYKLesgHDdYleHKu"><code>from langchain.retrievers import EnsembleRetriever
from langchain.retrievers import BM25Retriever

# 方案1：向量检索（语义相似）
vector_retriever = vectorstore.as_retriever(search_kwargs={"k": 5})

# 方案2：BM25检索（关键词匹配）
bm25_retriever = BM25Retriever.from_texts(chunks)
bm25_retriever.k = 5

# 混合检索：结合两种方法的优点
ensemble_retriever = EnsembleRetriever(
    retrievers=[vector_retriever, bm25_retriever],
    weights=[0.6, 0.4] # 向量60%权重，BM25 40%权重
)

# 检索效果对比
query = "2023年10月15日的销售数据"
results = ensemble_retriever.get_relevant_documents(query)</code></pre>

<p id="t-7UoZ2Ofy3oLkrLVL7r3Gzc"><span style="font-weight:bold">进阶方案：重排序（Reranking）</span></p>

<pre id="t-zefhFQ4pyXjMCt2nj8Gpec"><code>from sentence_transformers import CrossEncoder

# 第一步：粗筛（检索Top 20）
initial_docs = vectorstore.similarity_search(query, k=20)

# 第二步：精排（用更强的模型重新打分）
reranker = CrossEncoder('cross-encoder/ms-marco-MiniLM-L-6-v2')

# 计算每个文档与query的相关性分数
scores = reranker.predict([(query, doc.page_content) for doc in initial_docs])

# 按分数排序，取Top 3
sorted_docs = [doc for _, doc in sorted(zip(scores, initial_docs), reverse=True)]
final_docs = sorted_docs[:3]</code></pre>


<a id="section-1276"></a>
## 🔥 难题2：上下文窗口限制

<a id="t-kXVCnRYZvzqFEFso1ZtwIp"></a>

<p id="t-LHoyfwUEgaN4aP894wKRoH"><span style="font-weight:bold">问题描述</span><span>：</span></p>

<ul><li id="t-PfmwKNyJJFR5vAtdSfbbYu"><span>检索到10篇相关文档，但AI一次只能看3篇</span></li></ul>

<ul><li id="t-OOTnhEjBUc80hozWeqnyCY"><span>有用的信息可能在第7篇，AI看不到</span></li></ul>

<p id="t-d6dgVA0Pidxec8yESMvvPo"><span>https://claude.zhangsan.shop/chat/context_window_limit.svg</span></p>

<p id="t-goC2y43Sv6rWI5G7N5diSG"><span style="font-weight:bold">解决方案：智能压缩</span></p>

<pre id="t-4T5UCLuX9t4l5RyS2iX0t2"><code>from langchain.retrievers.document_compressors import LLMChainExtractor
from langchain.retrievers import ContextualCompressionRetriever

# 创建压缩器
compressor = LLMChainExtractor.from_llm(llm)

# 压缩检索器
compression_retriever = ContextualCompressionRetriever(
    base_compressor=compressor,
    base_retriever=vector_retriever
)

# 使用示例
query = "2023年销售额"
compressed_docs = compression_retriever.get_relevant_documents(query)

# 对比：
# 原始文档：5000字 → 压缩后：500字（只保留与query相关的部分）</code></pre>


<a id="section-1277"></a>
## 🔥 难题3：如何评估RAG效果（没有标准答案）

<a id="t-VJC1uXyQIj1MnrH3U3nInr"></a>

<p id="t-gEVyc9G3jxlaJdPnUZG3wg"><span style="font-weight:bold">问题描述</span><span>：</span></p>

<ul><li id="t-okZzeTA1bNAleEb59ub9Ph"><span>生成的答案看起来不错，但真的对吗？</span></li></ul>

<ul><li id="t-qUzS9a9QeEOMHlZbx5UaR1"><span>不同的RAG配置，哪个更好？</span></li></ul>

<p id="t-N4xbrUAqqxs1f631AajjGE"><span>这就引出了下一个核心话题... 看另一个文档</span></p>


<a id="section-1278"></a>
## 🔥 难题4：文档，表格怎么解析，这个我们到时候重新更新一篇文章解析

<a id="t-UAfGR9c1VZHY3x3Xs4NFqu"></a>

<ol start="72"><li id="t-wyQnVHHDAq8qLiBLMezv5L"><span>评估RAG：如何知道你的系统靠不靠谱？</span></li></ol>


<a id="section-1279"></a>
## 📊 评估体系全景图

<a id="t-Ebx4aSnsURzKpi5t50zXW1"></a>

<p id="t-Tad27yumL9U1Vp1qhOPJLS"><span>https://claude.zhangsan.shop/chat/rag_evaluation_framework.svg</span></p>


<a id="section-1280"></a>
## 🎯 评估维度1：检索质量

<a id="t-LKsJ3z0fb578GIQlfH30V4"></a>

<a id="t-9XKrLg8HufZZc4hlkjotII"></a>

##### 指标1：召回率（Recall）

<p id="t-D9wN1Z3dDlqEZmzgNCrLwL"><span style="font-weight:bold">通俗解释</span><span>：该找到的文档，你找到了多少？</span></p>

<pre id="t-vDvKrVqc9RLFLU342X8Tuz"><code># 示例场景
真实相关文档 = [doc1, doc2, doc3, doc4, doc5] # 5个相关文档
系统检索结果 = [doc1, doc2, doc6] # 检索到3个，其中2个正确

召回率 = 检索到的正确文档数 / 总的相关文档数
 = 2 / 5
 = 0.4 (40%)</code></pre>

<p id="t-c7AEczhwQPrbRdzAKNzoIE"><span style="font-weight:bold">代码实现</span><span>：</span></p>

<pre id="t-7sBjfjTP0lTscZP07cZh7S"><code>def calculate_recall(retrieved_docs, relevant_docs):
 """
    计算召回率

    Args:
        retrieved_docs: 系统检索到的文档ID列表
        relevant_docs: 真实相关的文档ID列表
    """
    retrieved_set = set(retrieved_docs)
    relevant_set = set(relevant_docs)

 # 检索到的正确文档
    correct = retrieved_set.intersection(relevant_set)

    recall = len(correct) / len(relevant_set) if relevant_set else 0

 return recall

# 测试
retrieved = ['doc1', 'doc2', 'doc6']
relevant = ['doc1', 'doc2', 'doc3', 'doc4', 'doc5']

print(f"召回率: {calculate_recall(retrieved, relevant):.2%}") # 40%</code></pre>

<a id="t-qHFeD3Nqu7F8Jl8219ZBky"></a>

##### 指标2：准确率（Precision）

<p id="t-CWq8XmMgrj4B1YrLbFSRNu"><span style="font-weight:bold">通俗解释</span><span>：检索到的文档中，有多少是真正相关的？</span></p>

<pre id="t-s4GSWtxcefrrn8DYTzlztk"><code>准确率 = 检索到的正确文档数 / 检索到的总文档数
      = 2 / 3
      = 0.67 (67%)</code></pre>

<a id="t-cvNH0omLsAY1GENTEs2eS9"></a>

##### 指标3：MRR（Mean Reciprocal Rank）

<p id="t-Jv1jvew1l6nNGdXOu8rpaH"><span style="font-weight:bold">通俗解释</span><span>：第一个正确答案排在第几位？</span></p>

<pre id="t-pYA5yJ2PVsiIciq9va715w"><code># 场景1：第一个就是正确答案
检索结果 = [doc1✓, doc2, doc3]
MRR = 1/1 = 1.0

# 场景2：第三个才是正确答案
检索结果 = [doc5, doc7, doc1✓]
MRR = 1/3 = 0.33

# 场景3：没有正确答案
检索结果 = [doc5, doc7, doc9]
MRR = 0</code></pre>

<p id="t-nuhXqqragp8mGTiq7FfO2K"><span style="font-weight:bold">代码实现</span><span>：</span></p>

<pre id="t-zVMbds7BVYVkH17tWkukn6"><code>def calculate_mrr(retrieved_docs, relevant_docs):
 """计算MRR"""
 for i, doc in enumerate(retrieved_docs, 1):
 if doc in relevant_docs:
 return 1.0 / i
 return 0.0

# 测试
retrieved = ['doc5', 'doc7', 'doc1']
relevant = ['doc1', 'doc2']

print(f"MRR: {calculate_mrr(retrieved, relevant):.3f}") # 0.333</code></pre>


<a id="section-1281"></a>
## 🎯 评估维度2：生成质量

<a id="t-1FEVEU0oh3BMoxQB8x98cN"></a>

<a id="t-rHNbnAnf132AV5vhDSfQmt"></a>

##### 指标1：事实准确性

<p id="t-wlzoQRDDW73vfRfmBaHnvb"><span style="font-weight:bold">人工评估标准</span><span>：</span></p>

<pre id="t-B20Lg69GK9RoWih2k6jkBw"><code>评分标准 = {
    5: "完全正确，信息准确",
    4: "基本正确，有小瑕疵",
    3: "部分正确",
    2: "大部分错误",
    1: "完全错误"
}</code></pre>

<p id="t-Ea3VhFmxGdFxbURzBCWI8B"><span style="font-weight:bold">自动评估（使用</span><span style="font-weight:bold">LLM</span><span style="font-weight:bold">评分）</span><span>：</span></p>

<pre id="t-0rI5d4IqKOLIXiScxpjF9h"><code>from langchain.evaluation import load_evaluator

# 创建评估器
evaluator = load_evaluator("labeled_criteria", criteria="correctness")

# 评估示例
eval_result = evaluator.evaluate_strings(
    prediction="2023年Q4销售额为5000万元", # AI生成的答案
    reference="根据财报，2023年Q4销售额为5000万元", # 标准答案
 input="2023年Q4销售额是多少？" # 原始问题
)

print(f"准确性得分: {eval_result['score']}")
print(f"评估理由: {eval_result['reasoning']}")</code></pre>

<a id="t-ZMgaTFKjx4bW7P5z4ZL2e2"></a>

##### 指标2：忠实度（Faithfulness）

<p id="t-FDSCUeJy8ZJO8jlWOej6Dc"><span style="font-weight:bold">通俗解释</span><span>：生成的答案是否忠于检索到的文档？有没有瞎编？</span></p>

<pre id="t-kujcQBlMrqEbZtREkHjBZV"><code># ❌ 低忠实度示例
检索文档: "2023年Q4销售额为5000万元"
AI回答: "2023年Q4销售额为5000万元，预计2024年将达到8000万元"
问题: 后半句是AI瞎编的！

# ✅ 高忠实度示例
检索文档: "2023年Q4销售额为5000万元"
AI回答: "根据财报，2023年Q4销售额为5000万元"</code></pre>

<p id="t-eb4jt8qcLJEWqKf3eMv7Mc"><span style="font-weight:bold">代码评估</span><span>：</span></p>

<pre id="t-csCTtLn7G9LwDCfI9NtQjX"><code>def evaluate_faithfulness(generated_answer, retrieved_docs, llm):
 """
    评估答案忠实度
    """
    prompt = f"""
    检索到的文档：
 {retrieved_docs}

    生成的答案：
 {generated_answer}

    请评估：生成的答案中的信息是否都能在检索文档中找到依据？
    评分：1-5分（5分=完全忠实，1分=大量虚构）

    输出格式：
    得分: X/5
    理由: ...
    """

    result = llm.predict(prompt)
 return result

# 使用示例
docs = "2023年Q4销售额为5000万元，同比增长25%"
answer = "2023年Q4销售额为5000万元，预计2024年将达到8000万元"

faithfulness_score = evaluate_faithfulness(answer, docs, llm)
print(faithfulness_score)</code></pre>

<a id="t-EL4AjqzKpEkQvVlD1v4PmM"></a>

##### 指标3：相关性（Relevance）

<p id="t-hdaqgaJYNVDPuAzHaj9z8z"><span style="font-weight:bold">通俗解释</span><span>：回答是否切题？</span></p>

<pre id="t-f4YO6osE3boMMKJAHtXpkA"><code># 用户问题
query = "如何提高团队效率？"

# ❌ 低相关性
answer = "团队建设很重要，沟通是关键..."  # 太泛泛

# ✅ 高相关性
answer = "提高团队效率的3个方法：1)使用敏捷开发 2)每日站会 3)OKR目标管理"</code></pre>


<a id="section-1282"></a>
## 🎯 评估维度3：端到端评估

<a id="t-bCNOnBlQGrWJjfjXA53zCm"></a>

<a id="t-P08c9TADCitY7vG4NZFX17"></a>

##### 使用RAGAS框架

<pre id="t-GUXoaTLOyV8URgswO3hCGQ"><code>from ragas import evaluate
from ragas.metrics import (
    faithfulness,
    answer_relevancy,
    context_relevancy,
    context_recall
)

# 准备评估数据
eval_data = {
 "question": ["2023年Q4销售额是多少？", "产品有哪些核心功能？"],
 "answer": ["5000万元", "包括AI助手、数据分析、自动化流程"],
 "contexts": [
 ["2023年Q4销售额为5000万元，同比增长25%"],
 ["核心功能包括：AI智能助手、实时数据分析、工作流自动化"]
 ],
 "ground_truths": ["5000万元", "AI助手、数据分析、自动化"]
}

# 执行评估
result = evaluate(
    eval_data,
    metrics=[
        faithfulness, # 忠实度
        answer_relevancy, # 答案相关性
        context_relevancy, # 上下文相关性
        context_recall       # 上下文召回
 ]
)

# 查看结果
print(result)
# 输出示例：
# {
#   'faithfulness': 0.95,
#   'answer_relevancy': 0.92,
#   'context_relevancy': 0.88,
#   'context_recall': 0.90
# }</code></pre>


<a id="section-1283"></a>
## 📈 完整评估流程

<a id="t-DDiqqqh1CfrJPwNTMbeB5N"></a>

<pre id="t-zLNwSe6GVNvHFKXn94hNm8"><code>class RAGEvaluator:
 """RAG系统评估器"""

 def __init__(self, rag_system, test_dataset):
        self.rag_system = rag_system
        self.test_dataset = test_dataset  # 测试数据集

 def evaluate_retrieval(self):
 """评估检索效果"""
        recalls = []
        precisions = []
        mrrs = []

 for test_case in self.test_dataset:
            query = test_case['query']
            relevant_docs = test_case['relevant_docs']

 # 执行检索
            retrieved_docs = self.rag_system.retrieve(query, k=5)

 # 计算指标
            recall = self._calculate_recall(retrieved_docs, relevant_docs)
            precision = self._calculate_precision(retrieved_docs, relevant_docs)
            mrr = self._calculate_mrr(retrieved_docs, relevant_docs)

            recalls.append(recall)
            precisions.append(precision)
            mrrs.append(mrr)

 return {
 'avg_recall': sum(recalls) / len(recalls),
 'avg_precision': sum(precisions) / len(precisions),
 'avg_mrr': sum(mrrs) / len(mrrs)
 }

 def evaluate_generation(self):
 """评估生成效果"""
        faithfulness_scores = []
        relevancy_scores = []

 for test_case in self.test_dataset:
            query = test_case['query']
            ground_truth = test_case['answer']

 # 执行RAG
            answer, contexts = self.rag_system.query(query)

 # 评估
            faith_score = self._evaluate_faithfulness(answer, contexts)
            rel_score = self._evaluate_relevancy(answer, query)

            faithfulness_scores.append(faith_score)
            relevancy_scores.append(rel_score)

 return {
 'avg_faithfulness': sum(faithfulness_scores) / len(faithfulness_scores),
 'avg_relevancy': sum(relevancy_scores) / len(relevancy_scores)
 }

 def run_full_evaluation(self):
 """运行完整评估"""
        retrieval_metrics = self.evaluate_retrieval()
        generation_metrics = self.evaluate_generation()

 print("=" * 50)
 print("RAG系统评估报告")
 print("=" * 50)
 print("\n📊 检索效果:")
 print(f"  召回率: {retrieval_metrics['avg_recall']:.2%}")
 print(f"  准确率: {retrieval_metrics['avg_precision']:.2%}")
 print(f"  MRR: {retrieval_metrics['avg_mrr']:.3f}")
 print("\n📝 生成效果:")
 print(f"  忠实度: {generation_metrics['avg_faithfulness']:.2%}")
 print(f"  相关性: {generation_metrics['avg_relevancy']:.2%}")
 print("=" * 50)

 return {**retrieval_metrics, **generation_metrics}

# 使用示例
test_data = [
 {
 'query': '2023年Q4销售额是多少？',
 'relevant_docs': ['doc1', 'doc3'],
 'answer': '5000万元'
 },
 # ... 更多测试用例
]

evaluator = RAGEvaluator(rag_system, test_data)
results = evaluator.run_full_evaluation()</code></pre>

<ol start="73"><li id="t-AR24LYPdP3lXCt1TV6xmmX"><span>实战代码：手把手搭建你的第一个RAG</span></li></ol>


<a id="section-1284"></a>
## 🛠️ 完整代码实现

<a id="t-9QPnBQDdaSS4jzXIjpy6Qm"></a>

<pre id="t-DcnaQbBI3AXcIXd6qivy5U"><code>"""
完整的RAG系统实现
支持：文档加载、向量化、检索、生成
"""

import os
from typing import List, Dict
from langchain.document_loaders import TextLoader, PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import Chroma
from langchain.chat_models import ChatOpenAI
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate

class SimpleRAG:
 """简单的RAG系统"""

 def __init__(self,
                 embedding_model: str = "paraphrase-multilingual-MiniLM-L12-v2",
                 llm_model: str = "gpt-3.5-turbo",
                 chunk_size: int = 500,
                 chunk_overlap: int = 50):
 """
        初始化RAG系统

        Args:
            embedding_model: 向量化模型名称
            llm_model: 大语言模型名称
            chunk_size: 文本块大小
            chunk_overlap: 文本块重叠大小
        """
 print("🚀 初始化RAG系统...")

 # 1. 初始化文本分割器
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=chunk_size,
            chunk_overlap=chunk_overlap,
            separators=["\n\n", "\n", "。", "！", "？", " ", ""]
 )

 # 2. 初始化向量化模型
 print(f"📦 加载向量化模型: {embedding_model}")
        self.embeddings = HuggingFaceEmbeddings(
            model_name=embedding_model,
            model_kwargs={'device': 'cpu'}
 )

 # 3. 初始化LLM
 print(f"🤖 加载大语言模型: {llm_model}")
        self.llm = ChatOpenAI(
            model_name=llm_model,
            temperature=0.1 # 降低随机性，提高准确性
 )

 # 4. 向量数据库
        self.vectorstore = None
        self.qa_chain = None

 print("✅ RAG系统初始化完成！\n")

 def load_documents(self, file_paths: List[str]) -&gt; List[str]:
 """
        加载文档

        Args:
            file_paths: 文件路径列表

        Returns:
            文档内容列表
        """
 print("📂 开始加载文档...")
        all_docs = []

 for file_path in file_paths:
 print(f"  - 加载: {file_path}")

 # 根据文件类型选择加载器
 if file_path.endswith('.pdf'):
                loader = PyPDFLoader(file_path)
 else:
                loader = TextLoader(file_path, encoding='utf-8')

            docs = loader.load()
            all_docs.extend(docs)

 print(f"✅ 成功加载 {len(all_docs)} 个文档\n")
 return all_docs

 def build_knowledge_base(self, documents: List[str]):
 """
        构建知识库

        Args:
            documents: 文档列表
        """
 print("🔨 开始构建知识库...")

 # 1. 文档切分
 print("  1️⃣ 切分文档...")
        chunks = self.text_splitter.split_documents(documents)
 print(f"     切分为 {len(chunks)} 个文本块")

 # 2. 向量化并存储
 print("  2️⃣ 向量化并存储到数据库...")
        self.vectorstore = Chroma.from_documents(
            documents=chunks,
            embedding=self.embeddings,
            persist_directory="./chroma_db"
 )
 print(f"     ✅ 已存储到向量数据库")

 # 3. 创建检索QA链
 print("  3️⃣ 创建问答链...")
        self._create_qa_chain()

 print("✅ 知识库构建完成！\n")

 def _create_qa_chain(self):
 """创建问答链"""
 # 自定义提示模板
        template = """你是一个专业的AI助手。请基于以下检索到的上下文信息来回答问题。

【重要规则】
1. 只使用提供的上下文信息回答
2. 如果上下文中没有相关信息，明确说"根据提供的信息无法回答"
3. 回答要准确、简洁
4. 如果可能，引用具体的数据或事实

上下文信息：
{context}

问题: {question}

答案:"""

        prompt = PromptTemplate(
            template=template,
            input_variables=["context", "question"]
 )

        self.qa_chain = RetrievalQA.from_chain_type(
            llm=self.llm,
            chain_type="stuff", # 将所有文档一次性传给LLM
            retriever=self.vectorstore.as_retriever(
                search_kwargs={"k": 3} # 检索Top 3相关文档
 ),
            chain_type_kwargs={"prompt": prompt},
            return_source_documents=True # 返回源文档
 )

 def query(self, question: str) -&gt; Dict:
 """
        查询问题

        Args:
            question: 用户问题

        Returns:
            包含答案和来源文档的字典
        """
 if not self.qa_chain:
 raise ValueError("请先构建知识库！")

 print(f"🔍 查询: {question}")
 print("-" * 50)

 # 执行查询
        result = self.qa_chain({"query": question})

 # 提取答案和来源
        answer = result['result']
        source_docs = result['source_documents']

 print(f"\n💡 答案:\n{answer}\n")
 print(f"📚 来源文档 ({len(source_docs)}个):")
 for i, doc in enumerate(source_docs, 1):
 print(f"  [{i}] {doc.page_content[:100]}...")
 print("-" * 50 + "\n")

 return {
 'answer': answer,
 'sources': [doc.page_content for doc in source_docs]
 }

 def search_similar(self, query: str, k: int = 5) -&gt; List[Dict]:
 """
        搜索相似文档

        Args:
            query: 查询文本
            k: 返回数量

        Returns:
            相似文档列表
        """
 if not self.vectorstore:
 raise ValueError("请先构建知识库！")

        results = self.vectorstore.similarity_search_with_score(query, k=k)

 print(f"🔍 搜索: {query}")
 print(f"📊 找到 {len(results)} 个相关文档:\n")

        similar_docs = []
 for i, (doc, score) in enumerate(results, 1):
 print(f"  [{i}] 相似度: {score:.3f}")
 print(f"      内容: {doc.page_content[:100]}...\n")
            similar_docs.append({
 'content': doc.page_content,
 'score': float(score)
 })

 return similar_docs


# ==================== 使用示例 ====================

def main():
 """主函数：演示RAG系统的完整使用流程"""

 # 1. 创建RAG系统
    rag = SimpleRAG(
        embedding_model="paraphrase-multilingual-MiniLM-L12-v2",
        llm_model="gpt-3.5-turbo",
        chunk_size=500,
        chunk_overlap=50
 )

 # 2. 准备测试文档
 print("📝 创建测试文档...")

 # 创建示例文档
 with open("company_report.txt", "w", encoding="utf-8") as f:
        f.write("""
2023年度公司财务报告

一、业绩概况
2023年全年，公司实现营业收入2.5亿元，同比增长35%。
其中，第四季度单季度营收达到5000万元，创历史新高。

二、产品线表现
- AI助手产品：年销售额1.2亿元，占比48%
- 数据分析平台：年销售额8000万元，占比32%
- 企业服务：年销售额5000万元，占比20%

三、市场展望
预计2024年公司营收将突破3亿元，继续保持高速增长态势。
        """)

 with open("product_manual.txt", "w", encoding="utf-8") as f:
        f.write("""
产品使用手册

产品名称：智能AI助手
版本：v2.0

核心功能：
1. 自然语言对话：支持多轮对话，理解上下文
2. 知识问答：基于企业知识库回答问题
3. 任务自动化：自动执行重复性任务
4. 数据分析：实时分析业务数据

使用场景：
- 客户服务：24小时在线客服
- 内部协作：团队知识管理
- 业务分析：销售数据洞察
        """)

 # 3. 加载文档
    documents = rag.load_documents([
 "company_report.txt",
 "product_manual.txt"
 ])

 # 4. 构建知识库
    rag.build_knowledge_base(documents)

 # 5. 测试查询
 print("=" * 70)
 print("开始测试查询")
 print("=" * 70 + "\n")

 # 测试1：财务问题
    rag.query("2023年第四季度的营收是多少？")

 # 测试2：产品问题
    rag.query("AI助手有哪些核心功能？")

 # 测试3：搜索相似文档
    rag.search_similar("产品功能介绍", k=3)

 print("✅ 测试完成！")


if __name__ == "__main__":
    main()</code></pre>


<a id="section-1285"></a>
## 🎯 运行效果示例

<a id="t-p3gH8eyoQDtSIbBed0x3yW"></a>

<pre id="t-lAXnhS4bhaKJ6Cif4defyq"><code>🚀 初始化RAG系统...
📦 加载向量化模型: paraphrase-multilingual-MiniLM-L12-v2
🤖 加载大语言模型: gpt-3.5-turbo
✅ RAG系统初始化完成！

📂 开始加载文档...
  - 加载: company_report.txt
  - 加载: product_manual.txt
✅ 成功加载 2 个文档

🔨 开始构建知识库...
  1️⃣ 切分文档...
     切分为 8 个文本块
  2️⃣ 向量化并存储到数据库...
     ✅ 已存储到向量数据库
  3️⃣ 创建问答链...
✅ 知识库构建完成！

======================================================================
开始测试查询
======================================================================

🔍 查询: 2023年第四季度的营收是多少？
--------------------------------------------------

💡 答案:
根据2023年度公司财务报告，2023年第四季度的营收达到5000万元，创历史新高。

📚 来源文档 (3个):
  [1] 一、业绩概况
2023年全年，公司实现营业收入2.5亿元，同比增长35%。
其中，第四季度单季度营收达到5000万元，创历史新高...
  [2] 三、市场展望
预计2024年公司营收将突破3亿元，继续保持高速增长态势...
  [3] 二、产品线表现
- AI助手产品：年销售额1.2亿元，占比48%...
--------------------------------------------------</code></pre>

<ol start="74"><li id="t-puPc4JGw0JzAppvV0ZuUgE"><span>进阶技巧：让你的RAG系统脱颖而出</span></li></ol>


<a id="section-1286"></a>
## 🚀 技巧1：多路召回策略

<a id="t-wWqae2hJVppwwTJPJMYPvH"></a>

<pre id="t-yHTEHIId5Z16XzhcRvhT2h"><code>class AdvancedRetriever:
 """高级检索器：结合多种检索方法"""

 def __init__(self, vectorstore, bm25_index, reranker):
        self.vectorstore = vectorstore
        self.bm25_index = bm25_index
        self.reranker = reranker

 def retrieve(self, query: str, k: int = 5) -&gt; List[str]:
 """多路召回 + 重排序"""

 # 路径1：向量检索（Top 20）
        vector_docs = self.vectorstore.similarity_search(query, k=20)

 # 路径2：BM25关键词检索（Top 20）
        bm25_docs = self.bm25_index.search(query, k=20)

 # 路径3：混合检索（去重）
        all_docs = list(set(vector_docs + bm25_docs))

 # 重排序：用更强的模型打分
        reranked_docs = self.reranker.rerank(query, all_docs)

 # 返回Top K
 return reranked_docs[:k]</code></pre>


<a id="section-1287"></a>
## 🚀 技巧2：查询改写

<a id="t-34uS61Ajp8H5KRKaJ1dvw0"></a>

<pre id="t-w5oHzaZ7BnR34o3HtXglOg"><code>def query_rewrite(original_query: str, llm) -&gt; List[str]:
 """
    查询改写：生成多个变体查询
    """
    prompt = f"""
    原始查询: {original_query}

    请生成3个语义相同但表达不同的查询变体，用于提高检索召回率。

    输出格式（每行一个）：
    1. ...
    2. ...
    3. ...
    """

    response = llm.predict(prompt)
    variants = [line.strip() for line in response.split('\n') if line.strip()]

 return [original_query] + variants

# 使用示例
query = "公司去年赚了多少钱？"
variants = query_rewrite(query, llm)
# 输出：
# ['公司去年赚了多少钱？',
#  '2023年公司的营收是多少？',
#  '去年公司财务表现如何？',
#  '上一年度的销售额统计']

# 用所有变体检索，合并结果
all_results = []
for q in variants:
    results = vectorstore.similarity_search(q, k=5)
    all_results.extend(results)

# 去重并重排序
final_results = rerank(all_results)</code></pre>


<a id="section-1288"></a>
## 🚀 技巧3：分层检索

<a id="t-CFBPDBAWvts3A3017g8AxQ"></a>

<pre id="t-ReGJ0WBU7iY6mQ8MUDTwQ7"><code>class HierarchicalRAG:
 """分层RAG：先粗筛，再精筛"""

 def retrieve(self, query: str):
 # 第1层：快速粗筛（Top 100）
        coarse_results = self.fast_retriever.search(query, k=100)

 # 第2层：精细重排（Top 20）
        fine_results = self.reranker.rerank(query, coarse_results, k=20)

 # 第3层：LLM筛选（Top 5）
        final_results = self.llm_filter(query, fine_results, k=5)

 return final_results</code></pre>


<a id="section-1289"></a>
## 🚀 技巧4：实时更新知识库

<a id="t-jeoUTG2HwKYJjbbQoCt9XF"></a>

<pre id="t-oUnFeF9fhDjZKLfP0eOWtk"><code>class IncrementalRAG:
 """支持增量更新的RAG"""

 def add_document(self, new_doc: str):
 """添加新文档"""
 # 切分
        chunks = self.text_splitter.split_text(new_doc)

 # 向量化
        vectors = self.embeddings.embed_documents(chunks)

 # 增量添加到向量库（不需要重建整个库）
        self.vectorstore.add_texts(chunks, vectors)

 print(f"✅ 已添加 {len(chunks)} 个新文档块")

 def update_document(self, doc_id: str, new_content: str):
 """更新文档"""
 # 删除旧版本
        self.vectorstore.delete(doc_id)

 # 添加新版本
        self.add_document(new_content)</code></pre>

<div id="t-D1VtuvxgAkxZ13mY6TG3dB"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/a14448ee1b58ba76ad3bf7b7.png"/></div>

<ol start="75"><li id="t-ZLd5cLRTYEBoSXlrOLs8gj"><span>评估RAG：如何知道你的系统靠不靠谱？</span></li></ol>


<a id="section-1290"></a>
## 📊 评估体系全景图

<a id="t-OcZacbQzQH6L2usi3p7bnA"></a>

<div id="t-QAc16fL5Tr2b8zVsX6tkCc"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/146acc64c956f76e6fdb4a44.png"/></div>


<a id="section-1291"></a>
## 🎯 评估维度1：检索质量

<a id="t-vuYvW42OQOYCrvGHDvIoKP"></a>

<a id="t-CNwCH0mgeyK0vH6RZqKlv7"></a>

##### 指标1：召回率（Recall）

<p id="t-asfz8V9uMUJX8tivGQMH53"><span style="font-weight:bold">通俗解释</span><span>：该找到的文档，你找到了多少？</span></p>

<pre id="t-1JwVQM9J1FEczfML2tyFaT"><code># 示例场景
真实相关文档 = [doc1, doc2, doc3, doc4, doc5] # 5个相关文档
系统检索结果 = [doc1, doc2, doc6] # 检索到3个，其中2个正确

召回率 = 检索到的正确文档数 / 总的相关文档数
 = 2 / 5
 = 0.4 (40%)</code></pre>

<p id="t-9gAxoNOgHehBVh80AmbVQg"><span style="font-weight:bold">代码实现</span><span>：</span></p>

<pre id="t-IdfHHzof1w1yOabDhtMGJ6"><code>def calculate_recall(retrieved_docs, relevant_docs):
 """
    计算召回率

    Args:
        retrieved_docs: 系统检索到的文档ID列表
        relevant_docs: 真实相关的文档ID列表
    """
    retrieved_set = set(retrieved_docs)
    relevant_set = set(relevant_docs)

 # 检索到的正确文档
    correct = retrieved_set.intersection(relevant_set)

    recall = len(correct) / len(relevant_set) if relevant_set else 0

 return recall

# 测试
retrieved = ['doc1', 'doc2', 'doc6']
relevant = ['doc1', 'doc2', 'doc3', 'doc4', 'doc5']

print(f"召回率: {calculate_recall(retrieved, relevant):.2%}") # 40%</code></pre>

<a id="t-HizL0h8RtMIBVwAnyvwGOI"></a>

##### 指标2：准确率（Precision）

<p id="t-WbkoyCC4lQb8ao2DyZTVe0"><span style="font-weight:bold">通俗解释</span><span>：检索到的文档中，有多少是真正相关的？</span></p>

<pre id="t-mVND0NCdHjZj9JmpEWtSFv"><code>准确率 = 检索到的正确文档数 / 检索到的总文档数
      = 2 / 3
      = 0.67 (67%)</code></pre>

<a id="t-inaAP8id8AYpYytCbBIUPg"></a>

##### 指标3：MRR（Mean Reciprocal Rank）

<p id="t-EqMh2pP98Zxfmn6rL7CCTt"><span style="font-weight:bold">通俗解释</span><span>：第一个正确答案排在第几位？</span></p>

<pre id="t-1eHOZdDHtNN7RYBbDweOcn"><code># 场景1：第一个就是正确答案
检索结果 = [doc1✓, doc2, doc3]
MRR = 1/1 = 1.0

# 场景2：第三个才是正确答案
检索结果 = [doc5, doc7, doc1✓]
MRR = 1/3 = 0.33

# 场景3：没有正确答案
检索结果 = [doc5, doc7, doc9]
MRR = 0</code></pre>

<p id="t-fxRzQoKWY7NjHtNNAgfS4e"><span style="font-weight:bold">代码实现</span><span>：</span></p>

<pre id="t-0Q3sbwMahNktHKr1EtFTIP"><code>def calculate_mrr(retrieved_docs, relevant_docs):
 """计算MRR"""
 for i, doc in enumerate(retrieved_docs, 1):
 if doc in relevant_docs:
 return 1.0 / i
 return 0.0

# 测试
retrieved = ['doc5', 'doc7', 'doc1']
relevant = ['doc1', 'doc2']

print(f"MRR: {calculate_mrr(retrieved, relevant):.3f}") # 0.333</code></pre>


<a id="section-1292"></a>
## 🎯 评估维度2：生成质量

<a id="t-QL8v93pHJ7hSfBEqe68oXB"></a>

<a id="t-MbTY1nyEGWfl2ilhgBy1yu"></a>

##### 指标1：事实准确性

<p id="t-ffEiVodzy5EjiDxVgNgena"><span style="font-weight:bold">人工评估标准</span><span>：</span></p>

<pre id="t-jNHKGpoeTBemiUkPjsYxb3"><code>评分标准 = {
    5: "完全正确，信息准确",
    4: "基本正确，有小瑕疵",
    3: "部分正确",
    2: "大部分错误",
    1: "完全错误"
}</code></pre>

<p id="t-Xs51mpsd1JHXW2nlrOlR0t"><span style="font-weight:bold">自动评估（使用</span><span style="font-weight:bold">LLM</span><span style="font-weight:bold">评分）</span><span>：</span></p>

<pre id="t-Ju1nQfX9JwzrsteCpTq0lE"><code>from langchain.evaluation import load_evaluator

# 创建评估器
evaluator = load_evaluator("labeled_criteria", criteria="correctness")

# 评估示例
eval_result = evaluator.evaluate_strings(
    prediction="2023年Q4销售额为5000万元", # AI生成的答案
    reference="根据财报，2023年Q4销售额为5000万元", # 标准答案
 input="2023年Q4销售额是多少？" # 原始问题
)

print(f"准确性得分: {eval_result['score']}")
print(f"评估理由: {eval_result['reasoning']}")</code></pre>

<a id="t-FeAfTeTGR4xnsq7tNSiAS9"></a>

##### 指标2：忠实度（Faithfulness）

<p id="t-IBuuc9EFHxqTxjRjvk3xEQ"><span style="font-weight:bold">通俗解释</span><span>：生成的答案是否忠于检索到的文档？有没有瞎编？</span></p>

<pre id="t-QTOEW3b2DOyNlOCV4cjsXF"><code># ❌ 低忠实度示例
检索文档: "2023年Q4销售额为5000万元"
AI回答: "2023年Q4销售额为5000万元，预计2024年将达到8000万元"
问题: 后半句是AI瞎编的！

# ✅ 高忠实度示例
检索文档: "2023年Q4销售额为5000万元"
AI回答: "根据财报，2023年Q4销售额为5000万元"</code></pre>

<p id="t-pZWQp4tiBctCFDAQ2L1XZY"><span style="font-weight:bold">代码评估</span><span>：</span></p>

<pre id="t-pDydjPdXC6IKZqhADdU4b6"><code>def evaluate_faithfulness(generated_answer, retrieved_docs, llm):
 """
    评估答案忠实度
    """
    prompt = f"""
    检索到的文档：
 {retrieved_docs}

    生成的答案：
 {generated_answer}

    请评估：生成的答案中的信息是否都能在检索文档中找到依据？
    评分：1-5分（5分=完全忠实，1分=大量虚构）

    输出格式：
    得分: X/5
    理由: ...
    """

    result = llm.predict(prompt)
 return result

# 使用示例
docs = "2023年Q4销售额为5000万元，同比增长25%"
answer = "2023年Q4销售额为5000万元，预计2024年将达到8000万元"

faithfulness_score = evaluate_faithfulness(answer, docs, llm)
print(faithfulness_score)</code></pre>

<a id="t-KZtkW055EK2slRuAlbX0LH"></a>

##### 指标3：相关性（Relevance）

<p id="t-7vD3X0lPphJmKh1DwPZopX"><span style="font-weight:bold">通俗解释</span><span>：回答是否切题？</span></p>

<pre id="t-jLA3cXxHjdi3DjLcJZzFZM"><code># 用户问题
query = "如何提高团队效率？"

# ❌ 低相关性
answer = "团队建设很重要，沟通是关键..."  # 太泛泛

# ✅ 高相关性
answer = "提高团队效率的3个方法：1)使用敏捷开发 2)每日站会 3)OKR目标管理"</code></pre>


<a id="section-1293"></a>
## 🎯 评估维度3：端到端评估

<a id="t-Afk2Kc6NDqBMirESGv83Bo"></a>

<a id="t-HRPKNEug7K3Z1vJmRBZsA3"></a>

##### 使用RAGAS框架

<pre id="t-aGFFP60a8W6Agu7WgCvt8G"><code>from ragas import evaluate
from ragas.metrics import (
    faithfulness,
    answer_relevancy,
    context_relevancy,
    context_recall
)

# 准备评估数据
eval_data = {
 "question": ["2023年Q4销售额是多少？", "产品有哪些核心功能？"],
 "answer": ["5000万元", "包括AI助手、数据分析、自动化流程"],
 "contexts": [
 ["2023年Q4销售额为5000万元，同比增长25%"],
 ["核心功能包括：AI智能助手、实时数据分析、工作流自动化"]
 ],
 "ground_truths": ["5000万元", "AI助手、数据分析、自动化"]
}

# 执行评估
result = evaluate(
    eval_data,
    metrics=[
        faithfulness, # 忠实度
        answer_relevancy, # 答案相关性
        context_relevancy, # 上下文相关性
        context_recall       # 上下文召回
 ]
)

# 查看结果
print(result)
# 输出示例：
# {
#   'faithfulness': 0.95,
#   'answer_relevancy': 0.92,
#   'context_relevancy': 0.88,
#   'context_recall': 0.90
# }</code></pre>


<a id="section-1294"></a>
## 📈 完整评估流程

<a id="t-1rfcpURl21EJfRI6WtTRRl"></a>

<pre id="t-QNrULcPKJbLjOHWId6xMM1"><code>class RAGEvaluator:
 """RAG系统评估器"""

 def __init__(self, rag_system, test_dataset):
        self.rag_system = rag_system
        self.test_dataset = test_dataset  # 测试数据集

 def evaluate_retrieval(self):
 """评估检索效果"""
        recalls = []
        precisions = []
        mrrs = []

 for test_case in self.test_dataset:
            query = test_case['query']
            relevant_docs = test_case['relevant_docs']

 # 执行检索
            retrieved_docs = self.rag_system.retrieve(query, k=5)

 # 计算指标
            recall = self._calculate_recall(retrieved_docs, relevant_docs)
            precision = self._calculate_precision(retrieved_docs, relevant_docs)
            mrr = self._calculate_mrr(retrieved_docs, relevant_docs)

            recalls.append(recall)
            precisions.append(precision)
            mrrs.append(mrr)

 return {
 'avg_recall': sum(recalls) / len(recalls),
 'avg_precision': sum(precisions) / len(precisions),
 'avg_mrr': sum(mrrs) / len(mrrs)
 }

 def evaluate_generation(self):
 """评估生成效果"""
        faithfulness_scores = []
        relevancy_scores = []

 for test_case in self.test_dataset:
            query = test_case['query']
            ground_truth = test_case['answer']

 # 执行RAG
            answer, contexts = self.rag_system.query(query)

 # 评估
            faith_score = self._evaluate_faithfulness(answer, contexts)
            rel_score = self._evaluate_relevancy(answer, query)

            faithfulness_scores.append(faith_score)
            relevancy_scores.append(rel_score)

 return {
 'avg_faithfulness': sum(faithfulness_scores) / len(faithfulness_scores),
 'avg_relevancy': sum(relevancy_scores) / len(relevancy_scores)
 }

 def run_full_evaluation(self):
 """运行完整评估"""
        retrieval_metrics = self.evaluate_retrieval()
        generation_metrics = self.evaluate_generation()

 print("=" * 50)
 print("RAG系统评估报告")
 print("=" * 50)
 print("\n📊 检索效果:")
 print(f"  召回率: {retrieval_metrics['avg_recall']:.2%}")
 print(f"  准确率: {retrieval_metrics['avg_precision']:.2%}")
 print(f"  MRR: {retrieval_metrics['avg_mrr']:.3f}")
 print("\n📝 生成效果:")
 print(f"  忠实度: {generation_metrics['avg_faithfulness']:.2%}")
 print(f"  相关性: {generation_metrics['avg_relevancy']:.2%}")
 print("=" * 50)

 return {**retrieval_metrics, **generation_metrics}

# 使用示例
test_data = [
 {
 'query': '2023年Q4销售额是多少？',
 'relevant_docs': ['doc1', 'doc3'],
 'answer': '5000万元'
 },
 # ... 更多测试用例
]

evaluator = RAGEvaluator(rag_system, test_data)
results = evaluator.run_full_evaluation()</code></pre>

<ol start="76"><li id="t-46MSgjhLn8I7vjjubSqrAR"><span>实战代码：手把手搭建你的第一个RAG</span></li></ol>


<a id="section-1295"></a>
## 🛠️ 完整代码实现

<a id="t-RcRadEzyJ7rulDj5qmqGCU"></a>

<pre id="t-M1J113y9zelMpq7WBv5I7d"><code>"""
完整的RAG系统实现
支持：文档加载、向量化、检索、生成
"""

import os
from typing import List, Dict
from langchain.document_loaders import TextLoader, PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import Chroma
from langchain.chat_models import ChatOpenAI
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate

class SimpleRAG:
 """简单的RAG系统"""

 def __init__(self,
                 embedding_model: str = "paraphrase-multilingual-MiniLM-L12-v2",
                 llm_model: str = "gpt-3.5-turbo",
                 chunk_size: int = 500,
                 chunk_overlap: int = 50):
 """
        初始化RAG系统

        Args:
            embedding_model: 向量化模型名称
            llm_model: 大语言模型名称
            chunk_size: 文本块大小
            chunk_overlap: 文本块重叠大小
        """
 print("🚀 初始化RAG系统...")

 # 1. 初始化文本分割器
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=chunk_size,
            chunk_overlap=chunk_overlap,
            separators=["\n\n", "\n", "。", "！", "？", " ", ""]
 )

 # 2. 初始化向量化模型
 print(f"📦 加载向量化模型: {embedding_model}")
        self.embeddings = HuggingFaceEmbeddings(
            model_name=embedding_model,
            model_kwargs={'device': 'cpu'}
 )

 # 3. 初始化LLM
 print(f"🤖 加载大语言模型: {llm_model}")
        self.llm = ChatOpenAI(
            model_name=llm_model,
            temperature=0.1 # 降低随机性，提高准确性
 )

 # 4. 向量数据库
        self.vectorstore = None
        self.qa_chain = None

 print("✅ RAG系统初始化完成！\n")

 def load_documents(self, file_paths: List[str]) -&gt; List[str]:
 """
        加载文档

        Args:
            file_paths: 文件路径列表

        Returns:
            文档内容列表
        """
 print("📂 开始加载文档...")
        all_docs = []

 for file_path in file_paths:
 print(f"  - 加载: {file_path}")

 # 根据文件类型选择加载器
 if file_path.endswith('.pdf'):
                loader = PyPDFLoader(file_path)
 else:
                loader = TextLoader(file_path, encoding='utf-8')

            docs = loader.load()
            all_docs.extend(docs)

 print(f"✅ 成功加载 {len(all_docs)} 个文档\n")
 return all_docs

 def build_knowledge_base(self, documents: List[str]):
 """
        构建知识库

        Args:
            documents: 文档列表
        """
 print("🔨 开始构建知识库...")

 # 1. 文档切分
 print("  1️⃣ 切分文档...")
        chunks = self.text_splitter.split_documents(documents)
 print(f"     切分为 {len(chunks)} 个文本块")

 # 2. 向量化并存储
 print("  2️⃣ 向量化并存储到数据库...")
        self.vectorstore = Chroma.from_documents(
            documents=chunks,
            embedding=self.embeddings,
            persist_directory="./chroma_db"
 )
 print(f"     ✅ 已存储到向量数据库")

 # 3. 创建检索QA链
 print("  3️⃣ 创建问答链...")
        self._create_qa_chain()

 print("✅ 知识库构建完成！\n")

 def _create_qa_chain(self):
 """创建问答链"""
 # 自定义提示模板
        template = """你是一个专业的AI助手。请基于以下检索到的上下文信息来回答问题。

【重要规则】
1. 只使用提供的上下文信息回答
2. 如果上下文中没有相关信息，明确说"根据提供的信息无法回答"
3. 回答要准确、简洁
4. 如果可能，引用具体的数据或事实

上下文信息：
{context}

问题: {question}

答案:"""

        prompt = PromptTemplate(
            template=template,
            input_variables=["context", "question"]
 )

        self.qa_chain = RetrievalQA.from_chain_type(
            llm=self.llm,
            chain_type="stuff", # 将所有文档一次性传给LLM
            retriever=self.vectorstore.as_retriever(
                search_kwargs={"k": 3} # 检索Top 3相关文档
 ),
            chain_type_kwargs={"prompt": prompt},
            return_source_documents=True # 返回源文档
 )

 def query(self, question: str) -&gt; Dict:
 """
        查询问题

        Args:
            question: 用户问题

        Returns:
            包含答案和来源文档的字典
        """
 if not self.qa_chain:
 raise ValueError("请先构建知识库！")

 print(f"🔍 查询: {question}")
 print("-" * 50)

 # 执行查询
        result = self.qa_chain({"query": question})

 # 提取答案和来源
        answer = result['result']
        source_docs = result['source_documents']

 print(f"\n💡 答案:\n{answer}\n")
 print(f"📚 来源文档 ({len(source_docs)}个):")
 for i, doc in enumerate(source_docs, 1):
 print(f"  [{i}] {doc.page_content[:100]}...")
 print("-" * 50 + "\n")

 return {
 'answer': answer,
 'sources': [doc.page_content for doc in source_docs]
 }

 def search_similar(self, query: str, k: int = 5) -&gt; List[Dict]:
 """
        搜索相似文档

        Args:
            query: 查询文本
            k: 返回数量

        Returns:
            相似文档列表
        """
 if not self.vectorstore:
 raise ValueError("请先构建知识库！")

        results = self.vectorstore.similarity_search_with_score(query, k=k)

 print(f"🔍 搜索: {query}")
 print(f"📊 找到 {len(results)} 个相关文档:\n")

        similar_docs = []
 for i, (doc, score) in enumerate(results, 1):
 print(f"  [{i}] 相似度: {score:.3f}")
 print(f"      内容: {doc.page_content[:100]}...\n")
            similar_docs.append({
 'content': doc.page_content,
 'score': float(score)
 })

 return similar_docs


# ==================== 使用示例 ====================

def main():
 """主函数：演示RAG系统的完整使用流程"""

 # 1. 创建RAG系统
    rag = SimpleRAG(
        embedding_model="paraphrase-multilingual-MiniLM-L12-v2",
        llm_model="gpt-3.5-turbo",
        chunk_size=500,
        chunk_overlap=50
 )

 # 2. 准备测试文档
 print("📝 创建测试文档...")

 # 创建示例文档
 with open("company_report.txt", "w", encoding="utf-8") as f:
        f.write("""
2023年度公司财务报告

一、业绩概况
2023年全年，公司实现营业收入2.5亿元，同比增长35%。
其中，第四季度单季度营收达到5000万元，创历史新高。

二、产品线表现
- AI助手产品：年销售额1.2亿元，占比48%
- 数据分析平台：年销售额8000万元，占比32%
- 企业服务：年销售额5000万元，占比20%

三、市场展望
预计2024年公司营收将突破3亿元，继续保持高速增长态势。
        """)

 with open("product_manual.txt", "w", encoding="utf-8") as f:
        f.write("""
产品使用手册

产品名称：智能AI助手
版本：v2.0

核心功能：
1. 自然语言对话：支持多轮对话，理解上下文
2. 知识问答：基于企业知识库回答问题
3. 任务自动化：自动执行重复性任务
4. 数据分析：实时分析业务数据

使用场景：
- 客户服务：24小时在线客服
- 内部协作：团队知识管理
- 业务分析：销售数据洞察
        """)

 # 3. 加载文档
    documents = rag.load_documents([
 "company_report.txt",
 "product_manual.txt"
 ])

 # 4. 构建知识库
    rag.build_knowledge_base(documents)

 # 5. 测试查询
 print("=" * 70)
 print("开始测试查询")
 print("=" * 70 + "\n")

 # 测试1：财务问题
    rag.query("2023年第四季度的营收是多少？")

 # 测试2：产品问题
    rag.query("AI助手有哪些核心功能？")

 # 测试3：搜索相似文档
    rag.search_similar("产品功能介绍", k=3)

 print("✅ 测试完成！")


if __name__ == "__main__":
    main()</code></pre>


<a id="section-1296"></a>
## 🎯 运行效果示例

<a id="t-ZT6yL9lrNsQohI7Fza7G19"></a>

<pre id="t-o0hnlVSuSD1Y1s2sEF4GpJ"><code>🚀 初始化RAG系统...
📦 加载向量化模型: paraphrase-multilingual-MiniLM-L12-v2
🤖 加载大语言模型: gpt-3.5-turbo
✅ RAG系统初始化完成！

📂 开始加载文档...
  - 加载: company_report.txt
  - 加载: product_manual.txt
✅ 成功加载 2 个文档

🔨 开始构建知识库...
 1️⃣ 切分文档...
     切分为 8 个文本块
 2️⃣ 向量化并存储到数据库...
     ✅ 已存储到向量数据库
 3️⃣ 创建问答链...
✅ 知识库构建完成！

======================================================================
开始测试查询
======================================================================

🔍 查询: 2023年第四季度的营收是多少？
--------------------------------------------------

💡 答案:
根据2023年度公司财务报告，2023年第四季度的营收达到5000万元，创历史新高。

📚 来源文档 (3个):
 [1] 一、业绩概况
2023年全年，公司实现营业收入2.5亿元，同比增长35%。
其中，第四季度单季度营收达到5000万元，创历史新高...
 [2] 三、市场展望
预计2024年公司营收将突破3亿元，继续保持高速增长态势...
 [3] 二、产品线表现
- AI助手产品：年销售额1.2亿元，占比48%...
--------------------------------------------------</code></pre>

<ol start="77"><li id="t-vFAliv0SgHCxy9NOn741hS"><span>进阶技巧：让你的RAG系统脱颖而出</span></li></ol>


<a id="section-1297"></a>
## 🚀 技巧1：多路召回策略

<a id="t-rOlW0Qqfcg5xWc7yyD4vmT"></a>

<pre id="t-zgoSGsgCy9TtDdtVrQgxnx"><code>class AdvancedRetriever:
 """高级检索器：结合多种检索方法"""

 def __init__(self, vectorstore, bm25_index, reranker):
        self.vectorstore = vectorstore
        self.bm25_index = bm25_index
        self.reranker = reranker

 def retrieve(self, query: str, k: int = 5) -&gt; List[str]:
 """多路召回 + 重排序"""

 # 路径1：向量检索（Top 20）
        vector_docs = self.vectorstore.similarity_search(query, k=20)

 # 路径2：BM25关键词检索（Top 20）
        bm25_docs = self.bm25_index.search(query, k=20)

 # 路径3：混合检索（去重）
        all_docs = list(set(vector_docs + bm25_docs))

 # 重排序：用更强的模型打分
        reranked_docs = self.reranker.rerank(query, all_docs)

 # 返回Top K
 return reranked_docs[:k]</code></pre>


<a id="section-1298"></a>
## 🚀 技巧2：查询改写

<a id="t-Vmd7u7e26WvRoh3mgeOglw"></a>

<pre id="t-JOLaGYgaTkpBRzt7vdavHZ"><code>def query_rewrite(original_query: str, llm) -&gt; List[str]:
 """
    查询改写：生成多个变体查询
    """
    prompt = f"""
    原始查询: {original_query}

    请生成3个语义相同但表达不同的查询变体，用于提高检索召回率。

    输出格式（每行一个）：
    1. ...
    2. ...
    3. ...
    """

    response = llm.predict(prompt)
    variants = [line.strip() for line in response.split('\n') if line.strip()]

 return [original_query] + variants

# 使用示例
query = "公司去年赚了多少钱？"
variants = query_rewrite(query, llm)
# 输出：
# ['公司去年赚了多少钱？',
#  '2023年公司的营收是多少？',
#  '去年公司财务表现如何？',
#  '上一年度的销售额统计']

# 用所有变体检索，合并结果
all_results = []
for q in variants:
    results = vectorstore.similarity_search(q, k=5)
    all_results.extend(results)

# 去重并重排序
final_results = rerank(all_results)</code></pre>


<a id="section-1299"></a>
## 🚀 技巧3：分层检索

<a id="t-mA1JUuaSPhCbNjOn1CdHrG"></a>

<pre id="t-KnINrUMaSWgaNDoIbbEUyS"><code>class HierarchicalRAG:
 """分层RAG：先粗筛，再精筛"""

 def retrieve(self, query: str):
 # 第1层：快速粗筛（Top 100）
        coarse_results = self.fast_retriever.search(query, k=100)

 # 第2层：精细重排（Top 20）
        fine_results = self.reranker.rerank(query, coarse_results, k=20)

 # 第3层：LLM筛选（Top 5）
        final_results = self.llm_filter(query, fine_results, k=5)

 return final_results</code></pre>


<a id="section-1300"></a>
## 🚀 技巧4：实时更新知识库

<a id="t-2jJZKi3oBn7tWqi8RBAEw9"></a>

<pre id="t-8ea8aLOJ2ejmrjxsgHmafd"><code>class IncrementalRAG:
 """支持增量更新的RAG"""

 def add_document(self, new_doc: str):
 """添加新文档"""
 # 切分
        chunks = self.text_splitter.split_text(new_doc)

 # 向量化
        vectors = self.embeddings.embed_documents(chunks)

 # 增量添加到向量库（不需要重建整个库）
        self.vectorstore.add_texts(chunks, vectors)

 print(f"✅ 已添加 {len(chunks)} 个新文档块")

 def update_document(self, doc_id: str, new_content: str):
 """更新文档"""
 # 删除旧版本
        self.vectorstore.delete(doc_id)

 # 添加新版本
        self.add_document(new_content)</code></pre>


<a id="section-1440"></a>
## Python 实现 RAG 与知识检索

<a id="t-R01ujEHxw4xekAaGaBy0YE"></a>

<p id="t-m52PQciB55oZkFiyZZMvz5"><span>本章节介绍检索增强生成（Retrieval-Augmented Generation, RAG）技术。</span></p>

<p id="t-5kq4NoxvvcEIBntgKLRgvU"><span>RAG 是构建知识密集型 Agent 的核心技术。</span></p>

<p id="t-hokRwvjLABKmLer8QLQmVX"><span>通过结合向量检索与传统生成模型，RAG 使得 Agent 能够访问和利用外部知识。</span></p>


<a id="section-1441"></a>
## RAG 基础原理

<a id="t-FUcvyIxbUIxRtwUYUThjZc"></a>

<p id="t-nhm9zLyxnTwOhxEFn9h4iz"><span>RAG 的核心思想是将信息检索与语言生成相结合。</span></p>

<p id="t-2rxsWuHjb30rhFc1cxlCNl"><span>当用户提出问题时，系统首先从知识库中检索相关信息。</span></p>

<p id="t-yqUbWyIORTIrK8IZQqURGs"><span>然后将检索到的信息作为上下文，辅助生成模型产生更准确的回答。</span></p>


<a id="section-1442"></a>
## 为什么需要 RAG

<a id="t-Ftb1DAhv0otrhHkLv71HsG"></a>

<p id="t-HqRuzBCe87d5RhVbIQQkqj"><span>语言模型有知识截止日期，无法获取最新信息。</span></p>

<p id="t-3UARILZ3UJod6suq7IRf7t"><span>模型参数有限，无法将所有知识都记忆其中。</span></p>

<p id="t-L8VRODjjzhsMZaJhGH2O4O"><span>直接让模型从参数中回忆知识，可能产生幻觉（hallucination）。</span></p>

<p id="t-XhlZvshEXHEUbP8BFdu1BO"><span>RAG 通过外部检索提供真实、可更新的知识来源。</span></p>


<a id="section-1443"></a>
## 核心架构

<a id="t-uczQcuYlqTBq2vLsv5FJzK"></a>

<p id="t-29P7W2dRJSZ1uNwr9mmVHM"><span>RAG 系统包含三个主要组件：</span></p>

<p id="t-XWYT3zcxhLxt88zlPdCuqX"><span style="font-weight:bold">检索器（Retriever）</span><span>：负责从知识库中找到相关信息。</span></p>

<p id="t-K94OcY2ua5t8nVw1ojre6E"><span style="font-weight:bold">向量数据库（Vector Store）</span><span>：存储文档的向量表示，支持高效相似度搜索。</span></p>

<p id="t-XA8ihQi0cRUnsphQSSw19h"><span style="font-weight:bold">生成器（Generator）</span><span>：基于检索结果和原始问题生成最终回答。</span></p>


<a id="section-1444"></a>
## 工作流程

<a id="t-Y8cDCoE67z1JbLiVC5tkCy"></a>

<p id="t-y0aHqmR5Tyaa5inglW0cVa"><span>第一步，索引阶段。将文档切分为 chunks（文本块），向量化后存入向量数据库。</span></p>

<p id="t-Ei67mOL1jQnqNevX2xxHwd"><span>第二步，检索阶段。用户查询到来时，将查询向量化，在向量数据库中进行相似度搜索。</span></p>

<p id="t-Gjf785xWsHqBzvexSbYc9c"><span>第三步，增强阶段。将检索到的相关文档与原始查询一起发送给生成模型。</span></p>

<p id="t-GqwKHfQEKDfgk1GbILGDkX"><span>第四步，生成阶段。生成模型基于增强的上下文生成最终回答。</span></p>


<a id="section-1446"></a>
## 基础 RAG 实现

<a id="t-GmvzsUbeZszMLGGaL0ewzG"></a>

<pre id="t-dyr7a7h0cNciXEQnfvS9aH"><code>class SimpleRAG:
 """
    简化版 RAG 系统实现
    包含三个核心组件：嵌入器、向量存储、生成器
    """

 def __init__(self, embedder, vector_store, generator):
 # 嵌入器：将文本转为向量
        self.embedder = embedder
 # 向量数据库：存储和检索向量
        self.vector_store = vector_store
 # 生成器：基于上下文生成回答
        self.generator = generator

 def add_documents(self, documents):
 """
        添加文档到知识库
        :param documents: 文档列表
        """
 # 将文档切分为小块
        chunks = self.chunk_documents(documents)

 # 将文本块向量化
        embeddings = self.embedder.embed(chunks)

 # 存储到向量数据库
        self.vector_store.add(embeddings, chunks)

 def chunk_documents(self, documents, chunk_size=500, overlap=50):
 """
        文档切分
        :param documents: 原始文档列表
        :param chunk_size: 每个块的字符数
        :param overlap: 块之间的重叠字符数
        :return: 文本块列表
        """
        chunks = []
 for doc in documents:
 # 按指定大小切分，保留重叠
 for i in range(0, len(doc), chunk_size - overlap):
                chunk = doc[i:i + chunk_size]
                chunks.append(chunk)
 return chunks

 def query(self, question, top_k=5):
 """
        处理用户查询
        :param question: 用户问题
        :param top_k: 检索的 top-k 结果
        :return: 生成的回答
        """
 # 1. 将问题向量化
        question_embedding = self.embedder.embed([question])[0]

 # 2. 在向量数据库中检索相似文档
        results = self.vector_store.search(question_embedding, top_k)

 # 3. 构建上下文
        context = "\n".join([doc for doc, _ in results])

 # 4. 构建生成提示
        prompt = f"基于以下内容回答问题：\n{context}\n\n问题：{question}"

 # 5. 生成回答
 return self.generator.generate(prompt)</code></pre>


<a id="section-1447"></a>
## Advanced RAG

<a id="t-gQuDSXHTNzoVHcnWmVh6NX"></a>

<p id="t-oFGRFtQ2uWTVv3FUOg8zv7"><span>基础 RAG 存在检索质量不高、上下文不连贯等问题。</span></p>

<p id="t-vJ7mfQkVaCYpjyqSC8CWrZ"><span>Advanced RAG 通过多种技术手段进行优化，提升检索和生成效果。</span></p>


<a id="section-1448"></a>
## 重排序（Reranking）

<a id="t-rkCMftNMuWL5Qp7SwVVl7x"></a>

<p id="t-TdrN6Ez27v23mjQnnVsPeq"><span>初检后使用交叉编码器对结果进行更精确的排序。</span></p>

<p id="t-aqMozmjLRiqv7s0kT2jaV9"><span>重排序能够更好地理解查询和文档之间的语义匹配度。</span></p>


<a id="section-1449"></a>
## 带重排序的 RAG

<a id="t-q6orHyWUCGL71s4sxIqGaP"></a>

<pre id="t-fdHEZNrVpGFoshvdHvEweq"><code>class AdvancedRAG:
 """
    高级 RAG 系统
    增加重排序、混合检索等优化
    """

 def __init__(self, embedder, vector_store, reranker, generator):
 # 嵌入器
        self.embedder = embedder
 # 向量数据库
        self.vector_store = vector_store
 # 重排序模型（交叉编码器）
        self.reranker = reranker
 # 生成器
        self.generator = generator

 def query(self, question, initial_k=20, final_k=5):
 """
        处理查询，包含两阶段检索
        :param question: 用户问题
        :param initial_k: 第一阶段检索数量
        :param final_k: 最终返回数量
        """
 # ==================== 阶段1：初步检索 ====================
 # 将问题向量化
        question_embedding = self.embedder.embed([question])[0]

 # 向量相似度检索（快速但不够精确）
        initial_results = self.vector_store.search(
            question_embedding,
            initial_k
 )

 # ==================== 阶段2：重排序 ====================
 # 构建 (问题, 文档) 对
        doc_pairs = [(question, doc) for doc, _ in initial_results]

 # 使用交叉编码器进行精细排序
        reranked = self.reranker.rerank(doc_pairs)

 # 取最终 top_k 个结果
        final_context = "\n".join([doc for doc, _ in reranked[:final_k]])

 # ==================== 阶段3：生成 ====================
        prompt = f"上下文：{final_context}\n\n问题：{question}"
 return self.generator.generate(prompt)</code></pre>


<a id="section-1450"></a>
## 混合检索

<a id="t-F6NgNuLUWvCdptOfXcYOtE"></a>

<p id="t-YnEdHrjnGOThKELMWbH8Aq"><span>混合检索结合稠密检索与稀疏检索的优势。</span></p>

<p id="t-ej2MSNftezcA3LJOG2FkQh"><span>稠密检索（dense retrieval）使用向量相似度，擅长语义匹配。</span></p>

<p id="t-PomMfsf2QN5DsbynKC73LW"><span>稀疏检索（如 BM25）基于词频统计，擅长关键词匹配。</span></p>


<a id="section-1451"></a>
## 混合检索 RAG

<a id="t-aLSSo3Wa1Pjpil1mBCi8GH"></a>

<pre id="t-NQ0uPJmS3tsEMpB3Cecssb"><code>class HybridRAG:
 """
    混合检索 RAG
    结合稠密检索和稀疏检索
    """

 def __init__(self, dense_retriever, sparse_retriever, fusion_fn):
 # 稠密检索器（向量检索）
        self.dense_retriever = dense_retriever
 # 稀疏检索器（BM25 等）
        self.sparse_retriever = sparse_retriever
 # 融合函数（如 RRFS）
        self.fusion_fn = fusion_fn

 def query(self, question, top_k):
 """
        执行混合检索
        """
 # ==================== 稠密检索 ====================
 # 使用向量相似度检索
        dense_results = self.dense_retriever.search(question, top_k * 2)

 # ==================== 稀疏检索 ====================
 # 使用关键词检索
        sparse_results = self.sparse_retriever.search(question, top_k * 2)

 # ==================== 结果融合 ====================
 # 使用 Reciprocal Rank Fusion 融合结果
        fused = self.fusion_fn(dense_results, sparse_results)

 # 取 top_k 个结果
 return fused[:top_k]


def reciprocal_rank_fusion(results_a, results_b, k=60):
 """
    Reciprocal Rank Fusion (RRF) 算法
    用于融合多个检索结果
    :param results_a: 检索结果 A [(doc, score), ...]
    :param results_b: 检索结果 B [(doc, score), ...]
    :param k: 融合参数，通常设为 60
    :return: 融合后的排序结果
    """
 # 为每个文档计算 RRF 分数
    scores = {}

 # 处理结果 A
 for rank, (doc, _) in enumerate(results_a):
        scores[doc] = scores.get(doc, 0) + 1 / (k + rank + 1)

 # 处理结果 B
 for rank, (doc, _) in enumerate(results_b):
        scores[doc] = scores.get(doc, 0) + 1 / (k + rank + 1)

 # 按分数排序
    sorted_docs = sorted(scores.items(), key=lambda x: -x[1])

 return sorted_docs</code></pre>


<a id="section-1452"></a>
## 其他优化策略

<a id="t-3Fq8jAdZsmNmwaxcJeXsS7"></a>

<p id="t-jX5aONUbEuwuh1eVPIxJkK"><span>查询扩展：通过同义词或相关词扩展查询，提升召回率。</span></p>

<p id="t-Q5ip3lLpFEfTBEP7YSzor4"><span>查询改写：理解用户真实意图，改写查询表述。</span></p>

<p id="t-yuKcJ93Wvb67qk0OrP1H01"><span>上下文压缩：减少检索结果中的冗余信息，保留关键内容。</span></p>


<a id="section-1453"></a>
## 向量数据库

<a id="t-us8g5NGU2GEGaIjdYrNLu8"></a>

<p id="t-y74hNbUq2LtoOMSXyCrAaO"><span>向量数据库是 RAG 系统的基础设施。</span></p>

<p id="t-bkz3Rr7eCSAjus4EQPPxco"><span>它负责存储和检索高维向量，支持大规模相似度搜索。</span></p>


<a id="section-1454"></a>
## 核心概念

<a id="t-j3cmw9eKJ9A60JBF3iNx8D"></a>

<p id="t-pqVx5jtmadt8D9aZIgs9i7"><span>嵌入（Embedding）：将文本转换为稠密向量的过程。</span></p>

<p id="t-OPpqE03diBo8J18pZbpnN9"><span>向量维度：嵌入向量的长度，影响表示能力。</span></p>

<p id="t-U4q5FUNtfMqPNzx41qjXeE"><span>相似度度量：衡量向量之间相似程度的方法。</span></p>


<a id="section-1455"></a>
## 常用相似度度量

<a id="t-UCdobx4aRSQJtfQD2KD6Ef"></a>

<div id="t-pUYWb4np9HacxxdPyZ0lQc"><table><colgroup><col width="106.89755249023438"/><col width="228.0137634277344"/><col width="224.00164794921875"/><col width="120"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>度量方法</span></p></td><td style=" vertical-align: top"><p><span>公式</span></p></td><td style=" vertical-align: top"><p><span>特点</span></p></td><td style=" vertical-align: top"><p><span>适用场景</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>余弦相似度</span></p></td><td style=" vertical-align: top"><p><span>cos(A,B) = A·B/(|A||B|)</span></p></td><td style=" vertical-align: top"><p><span>衡量方向相似性，取值 [-1,1]</span></p></td><td style=" vertical-align: top"><p><span>文档相似度</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>欧氏距离</span></p></td><td style=" vertical-align: top"><p><span>d(A,B) = sqrt(sum((Ai-Bi)^2))</span></p></td><td style=" vertical-align: top"><p><span>衡量绝对距离，取值 [0,+∞)</span></p></td><td style=" vertical-align: top"><p><span>图像特征匹配</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>点积</span></p></td><td style=" vertical-align: top"><p><span>A·B = sum(Ai*Bi)</span></p></td><td style=" vertical-align: top"><p><span>结合大小和方向</span></p></td><td style=" vertical-align: top"><p><span>推荐系统</span></p></td></tr></tbody></table></div>


<a id="section-1456"></a>
## 主流向量数据库对比

<a id="t-2JwC0cMWXGzjMPob3fPJA8"></a>

<div id="t-eBuBt7Fruq1Hq7kiQbWuiy"><table><colgroup><col width="87.89755249023438"/><col width="80.89752197265625"/><col width="252.11279296875"/><col width="212.00341796875"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>数据库</span></p></td><td style=" vertical-align: top"><p><span>类型</span></p></td><td style=" vertical-align: top"><p><span>特点</span></p></td><td style=" vertical-align: top"><p><span>适用场景</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>Pinecone</span></p></td><td style=" vertical-align: top"><p><span>云服务</span></p></td><td style=" vertical-align: top"><p><span>托管服务，易于使用，自动扩展</span></p></td><td style=" vertical-align: top"><p><span>生产环境快速部署</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>Weaviate</span></p></td><td style=" vertical-align: top"><p><span>开源</span></p></td><td style=" vertical-align: top"><p><span>支持混合检索（向量+关键词）</span></p></td><td style=" vertical-align: top"><p><span>需要灵活定制的场景</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>Milvus</span></p></td><td style=" vertical-align: top"><p><span>开源</span></p></td><td style=" vertical-align: top"><p><span>高可用，可扩展，支持万亿向量</span></p></td><td style=" vertical-align: top"><p><span>超大规模向量检索</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>Chroma</span></p></td><td style=" vertical-align: top"><p><span>开源</span></p></td><td style=" vertical-align: top"><p><span>轻量级，易于集成，开发友好</span></p></td><td style=" vertical-align: top"><p><span>原型开发和测试</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>Qdrant</span></p></td><td style=" vertical-align: top"><p><span>开源</span></p></td><td style=" vertical-align: top"><p><span>高性能，支持过滤，Rust 实现</span></p></td><td style=" vertical-align: top"><p><span>需要高吞吐的场景</span></p></td></tr></tbody></table></div>


<a id="section-1458"></a>
## 使用 Chroma 向量数据库

<a id="t-v40s4HarIRFO7NxOoPJ4R9"></a>

<pre id="t-QHuxDlTkzdgPQ8j4jZt2aM"><code>import chroma_client
from chroma_client import ChromaClient

# 创建客户端（连接到本地或远程服务）
client = ChromaClient()

# 创建或获取集合
collection = client.get_or_create_collection("knowledge_base")

# 添加文档
collection.add(
    ids=["doc1", "doc2", "doc3"], # 文档唯一 ID
    embeddings=[
 [0.1, 0.2, 0.3], # 文档1的向量
 [0.4, 0.5, 0.6], # 文档2的向量
 [0.7, 0.8, 0.9], # 文档3的向量
 ],
    documents=[
 "人工智能是计算机科学的一个分支",
 "机器学习是人工智能的子领域",
 "深度学习是机器学习的子领域"
 ],
    metadatas=[
 {"source": "教科书"}, # 文档1的元数据
 {"source": "论文"}, # 文档2的元数据
 {"source": "论文"} # 文档3的元数据
 ]
)

# 检索
results = collection.query(
    query_embeddings=[[0.15, 0.25, 0.35]], # 查询向量
    n_results=2 # 返回 top-2 结果
)

# 输出结果
print(results["documents"])
print(results["distances"]) # 距离/相似度分数</code></pre>

<blockquote id="t-8EJqqIMqUFyAGDgip2khhr"><p id="t-2B4wfNUw6daPcaa8g4HVDc"><span style="font-style:italic">注意：选择向量数据库时，需要考虑数据规模、查询延迟、部署方式等因素。对于小规模原型开发，Chroma 是一个不错的选择。对于大规模生产环境，Pinecone 或 Milvus 可能更合适。</span></p></blockquote>


<a id="section-1459"></a>
## GraphRAG

<a id="t-CkrMCrfk6YOdWd0AJa0zJ4"></a>

<p id="t-gO6OBYHqCD5UhVAnWMxOtw"><span>GraphRAG 将知识图谱与 RAG 相结合。</span></p>

<p id="t-dWMDudzY9XDEoyljlw20dS"><span>通过实体和关系图来增强检索和推理能力。</span></p>


<a id="section-1460"></a>
## 为什么需要 GraphRAG

<a id="t-EOiAXCFKr1z5rwn6O0uroQ"></a>

<p id="t-8ECu6v9jKNorKtVUTlVkyU"><span>传统 RAG 难以处理需要多跳推理的问题。</span></p>

<p id="t-fz1fi2lRVA2u4RgwnwBOwJ"><span>传统 RAG 不容易捕获实体间的语义关系。</span></p>

<p id="t-UdN632HuEyMZCYEpnJDhmv"><span>GraphRAG 能够理解知识之间的结构化联系。</span></p>


<a id="section-1461"></a>
## 核心优势

<a id="t-zIdcZvamwBXAZG6mPAvMVG"></a>

<p id="t-3dT8OseB18aFHTEdTX5OMH"><span>捕获实体间的语义关系，形成知识网络。</span></p>

<p id="t-09IKzLqfXhvEX1wwh1rSdA"><span>支持基于路径的推理，回答复杂的关系型问题。</span></p>

<p id="t-tpSvLcDYFuVsHwtxUumSc9"><span>能够回答需要多跳（multi-hop）推理的复杂问题。</span></p>


<a id="section-1463"></a>
## GraphRAG 实现

<a id="t-XfHnSBrCQZG2FhQXqjlfwZ"></a>

<pre id="t-AP9uJ6cvgc44thzrD9PHdD"><code>class GraphRAG:
 """
    GraphRAG 系统
    结合知识图谱和向量检索
    """

 def __init__(self, kg_builder, vector_store, generator):
 # 知识图谱构建器
        self.kg_builder = kg_builder
 # 向量数据库
        self.vector_store = vector_store
 # 生成器
        self.generator = generator

 def index_documents(self, documents):
 """
        索引文档到知识图谱和向量库
        :param documents: 文档列表
        """
 for doc in documents:
 # 从文档中提取实体
 # 例如：从 "OpenAI 成立于 2015 年" 中提取
 # 实体：OpenAI（组织），2015年（时间）
            entities = self.kg_builder.extract_entities(doc)

 # 从文档中提取关系
 # 例如：提取 "OpenAI 成立于 2015 年" 中的
 # 关系：(OpenAI, 成立于, 2015年)
            relations = self.kg_builder.extract_relations(doc)

 # 存储实体到知识图谱
            self.kg_builder.add_entities(entities)

 # 存储关系到知识图谱
            self.kg_builder.add_relations(relations)

 # 同时存储到向量数据库（支持混合检索）
            embeddings = self.embedder.embed([doc])
            self.vector_store.add(embeddings, [doc])

 def query(self, question):
 """
        处理查询
        结合知识图谱和向量检索
        """
 # ==================== 知识图谱检索 ====================
 # 在知识图谱中检索相关实体
 # 例如："谁创立了 OpenAI？" 
 # -&gt; 检索到实体 "OpenAI" 和 "Sam Altman" 等
        relevant_entities = self.kg_builder.query_entities(question)

 # 基于相关实体获取子图
 # 包含所有与这些实体直接相关的节点和边
        subgraph = self.kg_builder.get_subgraph(relevant_entities)

 # ==================== 向量检索 ====================
 # 补充向量检索的结果
        vector_results = self.vector_store.search(question, top_k=5)

 # ==================== 结果融合 ====================
 # 将图谱结果和向量结果融合
        combined_context = self.fuse_results(subgraph, vector_results)

 # ==================== 生成 ====================
 return self.generator.generate(combined_context, question)

 def fuse_results(self, subgraph, vector_results):
 """
        融合知识图谱和向量检索的结果
        """
 # 从子图提取文本描述
        kg_text = subgraph.to_text()

 # 合并向量检索的文档
        vector_text = "\n".join([doc for doc, _ in vector_results])

 return f"{kg_text}\n{vector_text}"


class KnowledgeGraphBuilder:
 """知识图谱构建器"""

 def extract_entities(self, text):
 """
        从文本中提取命名实体
        使用 NER（命名实体识别）模型
        """
 # 这里简化处理，实际应使用 NER 模型
        entities = []
 # 实体类型：PERSON（人物）、ORG（组织）、TIME（时间）等
 return entities

 def extract_relations(self, text):
 """
        从文本中提取关系
        使用关系抽取模型
        """
        relations = []
 # 关系格式：(头实体, 关系类型, 尾实体)
 return relations

 def query_entities(self, question):
 """根据问题检索相关实体"""
 # 使用 NER 或语义匹配找到问题涉及的实体
 return []</code></pre>


<a id="section-1464"></a>
## 应用场景

<a id="t-Jg1A60MSGcCGugiFiS0rOE"></a>

<p id="t-Hg5IhuTrQgjWuJkzS88GCW"><span>GraphRAG 特别适合以下场景：</span></p>

<p id="t-hIowleEUrw6kZF4YuVldxg"><span>需要理解实体关系的问答，如"公司的 CEO 是谁？"。</span></p>

<p id="t-tlSWDBPn3mO0N45tU1jBEq"><span>需要多跳推理的问题，如"张三的导师的导师是谁？"。</span></p>

<p id="t-MFAVAxACrfwfxO1SG30YTq"><span>需要推理知识库中隐含关系的场景。</span></p>


<a id="section-1465"></a>
## 章节小结

<a id="t-FEfamRutKHk8bJOKPyrq2W"></a>

<p id="t-OnIybzsza2AxuE1OODrc4W"><span>本章节介绍了 RAG 与知识检索的核心技术。</span></p>

<p id="t-x4JWRLtEM0Hg1xfyDzLpqx"><span style="font-weight:bold">RAG 基础原理</span><span> 通过将检索与生成结合，让 Agent 能够利用外部知识。</span></p>

<p id="t-dCYibDZ3OslijMh07ogdgY"><span style="font-weight:bold">Advanced RAG</span><span> 通过重排序和混合检索等技术，提升检索质量。</span></p>

<p id="t-FNiMGVDzfrhtjQhiL80DR6"><span style="font-weight:bold">向量数据库</span><span> 是 RAG 的基础设施，负责存储和检索向量表示。</span></p>

<p id="t-r2K4FOFRgnw8zMs9WPsmKI"><span style="font-weight:bold">GraphRAG</span><span> 结合知识图谱，增强关系推理和多跳问答能力。</span></p>

<p id="t-Phr0ewN85SDouyQ86H9OtG"><span>选择合适的 RAG 方案需要根据具体场景和需求。</span></p>

<p id="t-Ud61cgABWTJ9wdMpzrqP0b"><span>对于简单的问答场景，基础 RAG 即可满足需求。</span></p>

<p id="t-n3WZjmc8hHR3Nm02zddem7"><span>对于需要精确检索的场景，可以加入重排序。</span></p>

<p id="t-4vWUiHuaOEigSA79SvIGVL"><span>对于需要关系推理的场景，GraphRAG 是更好的选择。</span></p>

