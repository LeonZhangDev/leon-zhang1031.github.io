---
title: "第 08 章 · 意图识别与语义路由"
date: "2026-10-22"
draft: false
author: "学习资料整理"
description: "分类、多意图、置信度、澄清、路由与优化"
tags: ["Agent", "学习路线"]
categories: ["AI 工程"]
prerequisites: ["agent-learning-07-context-memory"]
verification: {"status": "not-run", "scope": "本次仅整理资料；示例代码与原文技术结论未复跑。"}
---

分类、多意图、置信度、澄清、路由与优化

[学习路线](/posts/agent-learning-route/) · [上一章](/posts/agent-learning-07-context-memory/) · [下一章](/posts/agent-learning-09-rag-data-processing/)

本章按知识小节编排。项目内容作为学习案例阅读，示例代码与原文技术结论未在本次整理中执行验证。

## 本章目录

- [开篇：深度理解Agent全链路内容](#section-1141)
- [从ChatGPT到Agent的进化](#section-1143)
- [Agent的核心定义](#section-1144)
- [Agent整体架构图](#section-1146)
- [架构分层解析](#section-1147)
- [数据流转过程](#section-1148)
- [组成部分总览](#section-1150)
- [组成部分一：大语言模型（LLM Brain）](#section-1151)
- [组成部分二：规划模块（Planning）](#section-1152)
- [组成部分三：记忆模块（Memory）](#section-1153)
- [组成部分四：工具集（Tools）](#section-1154)
- [ReAct框架深度解析](#section-1156)
- [其他Agent工作模式](#section-1157)
- [理解Agent的三种视角](#section-1158)
- [难点一：无限循环与任务卡死](#section-1160)
- [难点二：工具选择错误](#section-1161)
- [难点三：上下文窗口溢出](#section-1162)
- [难点四：错误处理与鲁棒性](#section-1163)
- [难点五：成本控制](#section-1164)
- [为什么需要多Agent？](#section-1166)
- [多Agent系统架构](#section-1167)
- [多Agent协作模式](#section-1168)
- [多Agent的实战案例](#section-1169)
- [多Agent的关键挑战](#section-1170)
- [框架总览对比](#section-1172)
- [LangChain深度解析](#section-1173)
- [AutoGen多Agent协作](#section-1174)
- [CrewAI角色扮演框架](#section-1175)
- [Dify可视化平台](#section-1176)
- [框架选择指南](#section-1177)
- [案例一：智能客服Agent](#section-1179)
- [案例二：代码生成Agent](#section-1180)
- [案例三：数据分析Agent](#section-1181)
- [提示词工程优化](#section-1183)
- [工具调用优化](#section-1184)
- [成本优化策略](#section-1185)
- [可靠性增强](#section-1186)
- [调试与监控](#section-1187)
- [技术趋势](#section-1189)
- [从咖啡店点单说起](#section-1191)
- [AI Agent中的意图识别](#section-1192)
- [为什么意图识别这么重要？](#section-1193)
- [意图识别的三层结构](#section-1195)
- [意图识别的工作流程](#section-1196)
- [技术一：基于规则的意图识别（规则匹配）](#section-1198)
- [技术二：基于机器学习的意图识别](#section-1199)
- [技术三：基于深度学习的意图识别（BERT）](#section-1200)
- [系统架构设计](#section-1202)
- [第一步：文本预处理](#section-1203)
- [第二步：槽位提取](#section-1204)
- [第三步：完整意图识别引擎](#section-1205)
- [项目需求](#section-1207)
- [完整代码实现](#section-1208)
- [运行效果示例](#section-1209)
- [处理多意图场景](#section-1211)
- [常见问题汇总](#section-1215)

<a id="section-1141"></a>
## 开篇：深度理解Agent全链路内容

<a id="t-block-19290"></a>

<div id="t-8M53JbuvOAnR5ODMeF4Fqw"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/0d36ecad3452afe02f01d479.png"/></div>


<a id="section-1143"></a>
## 从ChatGPT到Agent的进化

<a id="t-XiHOQbm6hwODatRIHfTGeP"></a>

<p id="t-CyVhy07mFal6HjKKOYAFIw"><span>想象一下这个场景：</span></p>

<p id="t-XqLs84FA64zvg6gINJeZ23"><span style="font-weight:bold">传统的</span><span style="font-weight:bold">ChatGPT</span><span style="font-weight:bold">对话：</span></p>

<ul><li id="t-bghiYECD8RdrEGpzmlxuWX"><span style="font-weight:bold">你：「帮我规划一次周末去京都的旅行」</span></li></ul>

<ul><li id="t-HSFdiD7SY6vLuSKdxf4B3o"><span style="font-weight:bold">ChatGPT：「当然！京都是个美丽的城市，你可以考虑参观清水寺、金阁寺...建议提前预订酒店...」</span></li></ul>

<ul><li id="t-VnM1CFpwWDoFWdlVp4Cj0G"><span style="font-weight:bold">你：（需要自己去各个网站查机票、订酒店、规划路线）</span></li></ul>

<p id="t-0hFerpgltDj1OU5sXtl4H5"><span style="font-weight:bold">AI Agent的体验：</span></p>

<div id="t-XvI4aA3CZGkY1OLFDP2SAS"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/caeecefdda0a266ef309424b.png"/></div>

<ul><li id="t-nyHjFPxn3vhdhUZti9bRZY"><span>你：「帮我规划一次周末去京都的旅行，预算5000元」</span></li></ul>

<ul><li id="t-vffIuITcFEF5p75Z8O4XrX"><span>Agent：（自动搜索机票价格）→（比较酒店并筛选）→（规划每日行程）→（计算预算）</span></li></ul>

<ul><li id="t-ukhQcs7lwX1TVCR9LYF2QM"><span>Agent：「已为您完成规划！往返机票1800元，住宿2晚1200元，包含清水寺、金阁寺等5个景点的详细行程，总预算4800元。[查看完整计划.pdf]」</span></li></ul>

<p id="t-mTwRMVNMyNXNAMfnqT6dr1"><span style="font-weight:bold">这就是最本质的区别：ChatGPT给建议，Agent帮你干活。</span></p>


<a id="section-1144"></a>
## Agent的核心定义

<a id="t-KvY0StAEv7HKq2DNLgxQIq"></a>

<p id="t-JhAD2zizuy58iw0BIoAfS9"><span style="font-weight:bold">AI Agent（</span><span style="font-weight:bold">智能体</span><span style="font-weight:bold">）</span><span> 是一个具备以下三大能力的智能系统：</span></p>

<ol start="1"><li id="t-KGvgken9IEfVAYBVBtEywD"><span style="font-weight:bold">自主感知</span><span>：能够理解当前环境和任务需求</span></li></ol>

<ol start="2"><li id="t-QBzjBIQPYwYDaEC0S8UILo"><span style="font-weight:bold">自主决策</span><span>：能够制定执行计划并动态调整</span></li></ol>

<ol start="3"><li id="t-hxqBmxJQZWCpW4kKew0C1K"><span style="font-weight:bold">自主执行</span><span>：能够调用工具完成实际任务</span></li></ol>

<p id="t-pPTsCJTYZKMz9FR5RX2oHn"><span style="font-weight:bold">用一句话总结：Agent = </span><span style="font-weight:bold">LLM</span><span style="font-weight:bold">（大脑） + 工具（手脚） + 记忆（经验） + 规划（智慧）</span></p>

<div id="t-47bK39ku78yCtAQhWqIGtb"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/3c8ac8d3e8304cb9b4e5b686.png"/></div>


<a id="section-1146"></a>
## Agent整体架构图

<a id="t-OGN6f3YoTV30vbJoRP8mC4"></a>

<p id="t-HbgfUavUFIyZbrWygUGNrY"><span style="font-weight:bold">让我们先看一张完整的Agent架构图，理解各个组件如何协同工作：</span></p>

<div id="t-mQhvhso0QctPUdRxmJpQ0a"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/5e555866ed704f828f00233e.png"/></div>


<a id="section-1147"></a>
## 架构分层解析

<a id="t-UWJtwLarxDoZ1kDPtHdzw1"></a>

<p id="t-ikt0encQW2DgP3Y0smydGs"><span>这个架构可以分为</span><span style="font-weight:bold">四个核心层</span><span>：</span></p>

<a id="t-M894gGGDSV1bdLiN5ekCyJ"></a>

##### 第一层：感知层（Perception Layer）

<ul><li id="t-RxnIdfoVFECnEnzdNjXX3V"><span style="font-weight:bold">作用</span><span>：接收并理解用户输入</span></li></ul>

<ul><li id="t-dVfQBPlOYJaHqc2PbEDt5N"><span style="font-weight:bold">组件</span><span>：用户输入 → 大语言模型理解</span></li></ul>

<ul><li id="t-r7oIIa09iz0JOU8U5vuuLK"><span style="font-weight:bold">类比</span><span>：就像人的耳朵和眼睛</span></li></ul>

<a id="t-CaZQ3XV7BeLYi87249U8TI"></a>

##### 第二层：认知层（Cognition Layer）

<ul><li id="t-NLXhmyRYtbNWEbn8ESleVZ"><span style="font-weight:bold">作用</span><span>：分析、推理、规划</span></li></ul>

<ul><li id="t-H22yWjzwbyMJDBElnthqzC"><span style="font-weight:bold">组件</span><span>：LLM Brain + 规划模块 + 推理引擎</span></li></ul>

<ul><li id="t-n2jxV7pWNUB3CvNulRbTMY"><span style="font-weight:bold">类比</span><span>：就像人的大脑</span></li></ul>

<a id="t-iJelbajxmsUQWtjTt8eBqC"></a>

##### 第三层：执行层（Execution Layer）

<ul><li id="t-tzWRFjqXgXWB1GxYi8sO1Z"><span style="font-weight:bold">作用</span><span>：调用各种工具完成任务</span></li></ul>

<ul><li id="t-FxDOImCO7Vu05iQDQeeaZh"><span style="font-weight:bold">组件</span><span>：工具集（搜索、代码、API等）</span></li></ul>

<ul><li id="t-Dqc5JcWz6fRcotPvNyNZdo"><span style="font-weight:bold">类比</span><span>：就像人的手脚</span></li></ul>

<a id="t-6t4O180ugVnPLdKV4I4PMA"></a>

##### 第四层：记忆层（Memory Layer）

<ul><li id="t-fSXIKGbIoqtvqbbltS7T32"><span style="font-weight:bold">作用</span><span>：存储和检索信息</span></li></ul>

<ul><li id="t-uSonherhKp0fLhLb4XAcYl"><span style="font-weight:bold">组件</span><span>：短期记忆 + 长期记忆</span></li></ul>

<ul><li id="t-HuwSNvWfHEryxraWRMNW8o"><span style="font-weight:bold">类比</span><span>：就像人的记忆系统</span></li></ul>


<a id="section-1148"></a>
## 数据流转过程

<a id="t-BYcbpf88mbwuawucuqIdqb"></a>

<p id="t-yxTwIbNFfTGO3JtH4TYwok"><span>让本案例用一个具体例子说明数据如何在架构中流转：</span></p>

<p id="t-wwcMqyHK42p9hOmvA83Exo"><span style="font-weight:bold">任务</span><span>：「找出2024年诺贝尔物理学奖获得者，并总结他们的主要贡献」</span></p>

<pre id="t-cSLwXj8UsAi0Di7o4TQHvh"><code>步骤1: 用户输入
   → 进入规划模块：识别需要「搜索」和「总结」两个步骤

步骤2: 规划完成
   → 进入推理引擎（ReAct框架）

步骤3: 第一轮思考-行动-观察循环
   Thought: "我需要搜索2024年诺贝尔物理学奖获得者"
   Action: 调用搜索工具search("2024 Nobel Prize Physics")
   Observation: 获得搜索结果→ "John Hopfield和Geoffrey Hinton"

步骤4: 第二轮思考-行动-观察循环
   Thought: "我需要了解他们的贡献"
   Action: 调用搜索工具search("Hopfield Hinton 神经网络贡献")
   Observation: 获得详细信息→ "人工神经网络和机器学习基础"

步骤5: 综合信息
   → LLM整合所有观察结果
   → 生成结构化答案
   → 存入记忆模块（长期记忆）

步骤6: 输出结果
   → 返回完整答案给用户</code></pre>

<p id="t-MAY66nLzPveRFkC7Anx1m3"><span>这个过程中，</span><span style="font-weight:bold">Agent不是一次性生成答案</span><span>，而是</span><span style="font-weight:bold">通过多轮思考-行动-观察的循环</span><span>，逐步接近最终答案。这就是Agent比传统LLM强大的地方。</span></p>


<a id="section-1150"></a>
## 组成部分总览

<a id="t-VKCHHknzInAJp6Sl1LEZTd"></a>

<div id="t-pXc3httQMKlhPjRSyThJ7d"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/210ccbbd72fe9b19ed598b51.png"/></div>


<a id="section-1151"></a>
## 组成部分一：大语言模型（LLM Brain）

<a id="t-apP6UOpcofK0TP3msAFnav"></a>

<a id="t-fuQfahJefgcp09jTd8ZfdC"></a>

##### 作用与地位

<p id="t-6yfRBf1wPPk7peaqHjvbfR"><span>LLM是Agent的「大脑」，负责：</span></p>

<ul><li id="t-PtQKUBzOt5tE9GOOGJLhew"><span>理解用户意图</span></li></ul>

<ul><li id="t-GRRkmV488q8d4ibn2AwXZo"><span>生成推理过程</span></li></ul>

<ul><li id="t-Ya1OiJCbGZGgVDyGLwHx08"><span>决策选择工具</span></li></ul>

<ul><li id="t-ohWmzXSKO4ECZd8Ml0zXD3"><span>综合信息输出</span></li></ul>

<a id="t-TE8CqLXmM3Mmbcq0PsclXd"></a>

##### 当前主流选择

<div id="t-7KeDoTjzHIOJALXpfyLVg9"><table><colgroup><col width="136.89755249023438"/><col width="200.00689697265625"/><col width="152.005126953125"/><col width="120"/></colgroup><tbody><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">模型</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">优势</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">适用场景</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">成本</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">GPT-4 / Claude</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">强大推理能力</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">复杂任务、高精度</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">高</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">DeepSeek-R1</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">性价比高、推理能力强</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">企业级部署</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">低</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">Gemini 2.0</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">多模态、Agent优化</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">需要视觉理解</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">中</span></p></td></tr></tbody></table></div>

<a id="t-JAnaUgbzDsCzjgWLdGRpy9"></a>

##### 实际代码示例

<pre id="t-pKcq0CXR8Q5rZku2jCRaEG"><code>from langchain_openai import ChatOpenAI

# 初始化LLM作为Agent的大脑
llm = ChatOpenAI(
    model="gpt-4",
    temperature=0, # 降低随机性，提高推理稳定性
)

# LLM的推理能力展示
response = llm.invoke(
 "你需要查找2024年奥运会金牌榜，然后比较中美两国的金牌数。请分步思考如何完成这个任务。"
)
print(response.content)

# 输出示例：
# 思考步骤：
# 1. 首先需要调用搜索工具查找"2024奥运会金牌榜"
# 2. 从搜索结果中提取中国和美国的金牌数
# 3. 进行数值比较
# 4. 生成比较结果</code></pre>

<p id="t-6Yy3jt8YSGn6quQ6wurqPu"><span style="font-weight:bold">关键点</span><span>：</span></p>

<ul><li id="t-6cj227wmTWXZTFJREmO4Vn"><span>temperature=0</span><span>：让Agent在推理时更稳定、更可预测</span></li></ul>

<ul><li id="t-Nautvy8rAPyISdBpVovPB9"><span>提示词需要引导「分步思考」，这是CoT（Chain of Thought）的核心</span></li></ul>


<a id="section-1152"></a>
## 组成部分二：规划模块（Planning）

<a id="t-8A0HcxPffYoJa9EguhSo5o"></a>

<a id="t-7gIGgeo7lpMtQHbVSN5bFb"></a>

##### 为什么需要规划？

<p id="t-De2J16gEg9saYUWY3PxaRf"><span>举个例子：如果任务是「帮我准备一场技术分享会」，没有规划的Agent会：</span></p>

<ul><li id="t-jeMi5cUmKoKwvpltVNrWRn"><span>不知道从哪开始</span></li></ul>

<ul><li id="t-Er8WzGKfBsS9DWrTyZIpkC"><span>可能遗漏重要步骤</span></li></ul>

<ul><li id="t-iojizz6zZQ9AFeMcY15Ba1"><span>浪费大量token重复思考</span></li></ul>

<p id="t-JXXI0XaxDa9zNqy5X4EARr"><span>有规划的Agent会：</span></p>

<pre id="t-EDc8nI0YJ51bbFBCvem5Sz"><code>确定主题和目标听众
搜索相关技术资料
设计PPT大纲
准备演示Demo
生成演讲稿</code></pre>

<a id="t-q91Q56TJhv3gEymOV9m9sR"></a>

##### 两种主流规划方法

<p id="t-ziIHwalm48ufZ9iEHiW9sj"><span style="font-weight:bold">方法一：</span><span style="font-weight:bold">ReAct</span><span style="font-weight:bold">框架（边想边做）</span></p>

<div id="t-azR1u6foI32Dl8DA4pt0Vp"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/a5627b74655e5a742ab59f67.png"/></div>

<p id="t-xMQeMss6ACV5ikAwdXlMR0"><span style="font-weight:bold">ReAct</span><span style="font-weight:bold">特点</span><span>：</span></p>

<ul><li id="t-lMUnffx870B3NOovqg5IVx"><span>✅ 灵活：可以根据中间结果调整计划</span></li></ul>

<ul><li id="t-Hz0RyqNPHzVt5pDUYyrQJs"><span>✅ 适合探索性任务</span></li></ul>

<ul><li id="t-T7vg9pfKxKe6x7ywtH4q2H"><span>❌ Token消耗大：每一步都要调用LLM</span></li></ul>

<p id="t-efkgdhIm1adE2VugY1Y99b"><span style="font-weight:bold">方法二：Plan-and-Execute（先计划后执行）</span></p>

<div id="t-Pq6Z0s7Cm0fyzobv2FyoHz"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/8b175b7ef5dfca027b1d0a48.png"/></div>

<p id="t-4stWuQnwe9DYEa1OesiKKo"><span style="font-weight:bold">Plan-and-Execute特点</span><span>：</span></p>

<ul><li id="t-PkzX0V2y5Hr4EefXLaXcMs"><span>✅ 高效：只需调用一次LLM规划</span></li></ul>

<ul><li id="t-I0ARhmqtjnRoBOOh0oi6s7"><span>✅ 可并行执行多个任务</span></li></ul>

<ul><li id="t-c4gUiPGE1OmYoCjxxdyMnx"><span>❌ 不灵活：难以根据中间结果调整</span></li></ul>

<a id="t-OfAcZn1t2IbYiwGo4Zi4K3"></a>

##### 实际代码对比

<p id="t-7Me2iXx5BFFHnmW6wp93sg"><span style="font-weight:bold">ReAct</span><span style="font-weight:bold">实现</span><span>：</span></p>

<pre id="t-X5We5y6EvGIsloVJGoEC7W"><code>from langchain.agents import create_react_agent, AgentExecutor
from langchain.tools import Tool

# 定义工具
search_tool = Tool(
    name="Search",
    func=search_function,
    description="搜索互联网信息"
)

# 创建ReAct Agent
agent = create_react_agent(llm, [search_tool])
agent_executor = AgentExecutor(agent=agent, tools=[search_tool], verbose=True)

# 执行任务
result = agent_executor.invoke({
 "input": "找出DeepSeek-R1的训练成本，并与GPT-4对比"
})

# 输出过程（verbose=True会显示）：
# Thought: 我需要搜索DeepSeek-R1的信息
# Action: Search("DeepSeek-R1 training cost")
# Observation: [搜索结果]
# Thought: 接下来需要搜索GPT-4的成本
# Action: Search("GPT-4 training cost")
# Observation: [搜索结果]
# Thought: 现在可以进行对比了
# Final Answer: [对比结果]</code></pre>

<p id="t-yzXBck5ApAtG0Ar0A2WKJg"><span style="font-weight:bold">Plan-and-Execute实现</span><span>：</span></p>

<pre id="t-JFv68uAfbRYhqCFmmi5IUu"><code>from langchain.agents import Plan, Execute

# 第一步：规划
planner = create_planner(llm)
plan = planner.plan("分析2024年AI Agent市场趋势")

# 输出的计划：
# Task 1: 搜索2024年AI Agent市场报告
# Task 2: 提取市场规模数据
# Task 3: 识别主要参与者
# Task 4: 总结趋势和预测

# 第二步：执行
executor = create_executor(tools)
results = executor.execute(plan) # 按计划依次执行</code></pre>

<a id="t-WSDSkLrBZs4AVOttj3U8SZ"></a>

##### 选择建议

<ul><li id="t-3tzF5VrYKmCpTC8eiw7G6Q"><span style="font-weight:bold">探索性任务</span><span>（不知道中间会遇到什么）→ 用ReAct</span></li></ul>

<ul><li id="t-pahfHKe7imNl51zThAbn7h"><span style="font-weight:bold">流程明确的任务</span><span>（步骤固定）→ 用Plan-and-Execute</span></li></ul>

<ul><li id="t-MOtqjkcrHu1NyULKwo91S1"><span style="font-weight:bold">复杂混合任务</span><span> → 两者结合</span></li></ul>


<a id="section-1153"></a>
## 组成部分三：记忆模块（Memory）

<a id="t-AXQps71F23ifZCv7wqkz6f"></a>

<a id="t-nqpU95ZYbakp4xjQDfekSC"></a>

##### 为什么记忆很重要？

<p id="t-8S2BiQMUHvTcfeKPhDcZlx"><span>想象你在和一个朋友聊天：</span></p>

<ul><li id="t-UbjhzR6QSVZMtNtgzcHLbd"><span style="font-weight:bold">没有记忆</span><span>：每次对话都是新的，对方完全不记得你之前说过什么</span></li></ul>

<ul><li id="t-Zf14IMD4lg3EfaSWiHbtGG"><span style="font-weight:bold">有记忆</span><span>：对方记得你的喜好、之前的讨论，对话更流畅</span></li></ul>

<p id="t-LU4dL4Xdko5Bn9ZVWaRMuV"><span>Agent也一样。记忆分为两类：</span></p>

<a id="t-n0RFYbtu3tmaMtXsFVgrof"></a>

##### 短期记忆（Short-term Memory）

<p id="t-beIEKS2DZvY2MFNqwcvIzJ"><span style="font-weight:bold">作用</span><span>：保存当前任务的上下文</span></p>

<p id="t-uP5LoQdRS5c4pYNFDdCYSj"><span style="font-weight:bold">存储内容</span><span>：</span></p>

<ul><li id="t-W5dLhrMn2EEfE1Os2gFG9s"><span>当前对话历史</span></li></ul>

<ul><li id="t-I0YQ4fumEZR14HcSYEyCym"><span>中间步骤的结果</span></li></ul>

<ul><li id="t-PfnDEgTYpCkVi545sLOuKb"><span>临时变量和状态</span></li></ul>

<p id="t-tcTWktq9HzmUVG0E8gxW4E"><span style="font-weight:bold">技术实现</span><span>：</span></p>

<pre id="t-AWcggUM1YE7Wr0Qu9vW2xH"><code>from langchain.memory import ConversationBufferMemory

# 创建对话记忆
memory = ConversationBufferMemory(
    memory_key="chat_history",
    return_messages=True
)

# Agent执行时自动记录
agent_executor = AgentExecutor(
    agent=agent,
    tools=tools,
    memory=memory, # 添加记忆
    verbose=True
)

# 第一轮对话
agent_executor.invoke({"input": "我叫张三，在北京工作"})

# 第二轮对话（Agent会记得上下文）
agent_executor.invoke({"input": "帮我推荐北京的餐厅"})
# Agent会知道你在北京，直接推荐北京的餐厅</code></pre>

<p id="t-CdG3T6DIccp7xLFTqdan4K"><span style="font-weight:bold">短期记忆的挑战</span><span>：</span></p>

<ul><li id="t-qYCXhoY2CbYPz2AOLkalub"><span>📊 </span><span style="font-weight:bold">Token限制</span><span>：GPT-4有128K token限制，长对话会超出</span></li></ul>

<ul><li id="t-Ijfx9xjGaoCeNpUj237PbH"><span>💰 </span><span style="font-weight:bold">成本问题</span><span>：每次调用都要把整个历史发送给LLM</span></li></ul>

<p id="t-2xS6xXAg28riHJ9oG3LT47"><span style="font-weight:bold">解决方案</span><span>：</span></p>

<pre id="t-7x5qqu21Wd5ah7R233TVzv"><code>from langchain.memory import ConversationSummaryMemory

# 使用摘要记忆：自动总结历史对话
summary_memory = ConversationSummaryMemory(
    llm=llm,
    max_token_limit=2000 # 超过限制时自动总结
)

# 效果：
# 原始历史（5000 tokens）→ 总结后（500 tokens）
# "用户是张三，在北京工作，偏好川菜，预算500元以内"</code></pre>

<a id="t-bvFxrOPGyTCP9YUSGZbZil"></a>

##### 长期记忆（Long-term Memory）

<p id="t-9DewDoRr2VeyRlEs9j0mOq"><span style="font-weight:bold">作用</span><span>：存储可复用的知识和经验</span></p>

<p id="t-ljD22MNzmwyD1h7cj8DrUU"><span style="font-weight:bold">存储内容</span><span>：</span></p>

<ul><li id="t-BhXMFKwIbpQSnrL0uNZ3jk"><span>用户的个人信息和偏好</span></li></ul>

<ul><li id="t-fCpLdW5q2ilZnW89weJ2BI"><span>历史任务的成功经验</span></li></ul>

<ul><li id="t-2wU8Qkfp395fehsOqsJGzu"><span>领域知识库</span></li></ul>

<ul><li id="t-KuXXbBsbXVsHVMmush59Ta"><span>工具使用的最佳实践</span></li></ul>

<p id="t-jDGlSNCE0CJggAvwrLsOuR"><span style="font-weight:bold">技术实现</span><span>：使用向量数据库</span></p>

<pre id="t-DXTo47ghxydE6uPXkPvPFk"><code>from langchain.vectorstores import Chroma
from langchain.embeddings import OpenAIEmbeddings

# 1. 创建向量数据库（长期记忆）
embeddings = OpenAIEmbeddings()
vectorstore = Chroma(
    collection_name="agent_memory",
    embedding_function=embeddings
)

# 2. 存储经验
vectorstore.add_texts([
 "用户张三偏好川菜，预算500元",
 "北京最佳川菜馆：川办、巴国布衣",
 "搜索餐厅时应该考虑：位置、评分、价格、口味"
])

# 3. Agent执行任务时检索相关记忆
query = "帮张三推荐餐厅"
relevant_memories = vectorstore.similarity_search(query, k=3)

# 4. 将记忆注入到prompt中
prompt = f"""
相关记忆：
{relevant_memories}

用户请求：{query}

请根据记忆中的信息给出推荐。
"""</code></pre>

<a id="t-7ul6OWTjhi7GDpOUeD9ghl"></a>

##### 记忆架构图

<div id="t-VGUI2PT02UZatPZOFiT1Qx"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/827f76f94aa674380ebfbfc5.png"/></div>

<a id="t-zbF07Wp8JvKdi9gQ6k8eoI"></a>

##### 记忆模块的高级技巧

<p id="t-AnVuY6xXSBYC73GRlGGnw8"><span style="font-weight:bold">技巧1：自动清理不重要的记忆</span></p>

<pre id="t-9IqMHdPt3sBegmn5Xku0xJ"><code>#基于重要性评分的记忆管理
def should_store_in_long_term(message):
 # 让LLM判断是否重要
    importance = llm.predict(f"这条信息的重要性（1-10）：{message}")
 return int(importance) &gt;= 7 # 只存储重要度&gt;=7的信息</code></pre>

<p id="t-MnV5dXWnbDw5Adml5pvKu5"><span style="font-weight:bold">技巧2：记忆的时效性管理</span></p>

<pre id="t-QjedxvqU2wD7m7WRdjr9FO"><code>#给记忆加上时间戳
from datetime import datetime, timedelta

memory_item = {
 "content": "用户偏好川菜",
 "timestamp": datetime.now(),
 "expiry": datetime.now() + timedelta(days=30) # 30天后过期
}

# 检索时过滤过期记忆
def get_valid_memories():
 return [m for m in memories if m["expiry"] &gt; datetime.now()]</code></pre>


<a id="section-1154"></a>
## 组成部分四：工具集（Tools）

<a id="t-1ndPLln1JSuZCPh5rC6fgk"></a>

<a id="t-Q4FoU7cErsftKSew2jwv4A"></a>

##### 工具是Agent的「超能力」

<p id="t-cqGKDtWuXn5gXEi86MMpSD"><span>如果说LLM是Agent的大脑，那工具就是Agent的「手脚」和「超能力」。通过工具，Agent可以：</span></p>

<ul><li id="t-hhiLvAiR1zxwiJYXDnKw48"><span>🔍 搜索互联网</span></li></ul>

<ul><li id="t-3CIYnB6rRWETWKzwN4IOEe"><span>💻 执行代码</span></li></ul>

<ul><li id="t-OQqN0x3CAAyCaPYfnouAn4"><span>📊 操作数据库</span></li></ul>

<ul><li id="t-f0u1dwa67bWflDkEbzfHZK"><span>🔧 调用API</span></li></ul>

<ul><li id="t-BNSNMhtBDgSOVqafS6gAXJ"><span>🖥️ 控制电脑</span></li></ul>

<a id="t-buoyunLTIRZDgxZMkU74li"></a>

##### 工具的定义与实现

<p id="t-hF73oHnrq3KsgUtJCGMwep"><span style="font-weight:bold">一个工具的标准结构</span><span>：</span></p>

<pre id="t-dTXibcL8ukv96jq13hiYUL"><code>from langchain.tools import Tool

def calculate(expression: str) -&gt; str:
 """执行数学计算"""
 try:
        result = eval(expression) # 实际生产中不要用eval
 return f"计算结果：{result}"
 except Exception as e:
 return f"计算错误：{str(e)}"

# 定义工具
calculator_tool = Tool(
    name="Calculator", # 工具名称（Agent会看到）
    func=calculate, # 工具函数
    description="""
    用于数学计算。
    输入：数学表达式字符串，如 "2 + 2" 或 "sqrt(16)"
    输出：计算结果
    何时使用：当需要进行精确数学计算时
    """ # 描述很重要！Agent通过描述来决定是否使用该工具
)</code></pre>

<p id="t-CU8XxXBsjkyzarOXMTfVsw"><span style="font-weight:bold">关键要素</span><span>：</span></p>

<ol start="4"><li id="t-MBJtukZaCiY4lCbLUckhra"><span style="font-weight:bold">清晰的名称</span><span>：Agent通过名称快速识别工具</span></li></ol>

<ol start="5"><li id="t-IqHrnt18tklteBtXBmxyFF"><span style="font-weight:bold">详细的描述</span><span>：告诉Agent什么时候用、怎么用</span></li></ol>

<ol start="6"><li id="t-NVkVIriDEceGo5Ziu9sIoZ"><span style="font-weight:bold">标准的输入输出</span><span>：保证工具能被正确调用</span></li></ol>

<a id="t-vJZRj1lKNqTpfCGx7CWxNi"></a>

##### 常用工具类型与实现

<ol start="7"><li id="t-kr4wPwYHedVtPqB795cFL3"><span style="font-weight:bold">搜索工具</span></li></ol>

<pre id="t-BGZuJxEbcrzdsoTd8vQI99"><code>from langchain.tools import DuckDuckGoSearchRun

search = DuckDuckGoSearchRun()

search_tool = Tool(
    name="WebSearch",
    func=search.run,
    description="搜索互联网获取最新信息。适用于需要实时数据的场景。"
)

# 使用示例
result = search.run("2024年诺贝尔物理学奖")</code></pre>

<ol start="8"><li id="t-oYKkHFAidn7LfR9V4BLbFn"><span style="font-weight:bold">代码执行工具</span></li></ol>

<pre id="t-ENcg1PnzxlJfAsS3ylqNEZ"><code>def python_executor(code: str) -&gt; str:
 """执行Python代码"""
 import io
 import sys
 from contextlib import redirect_stdout

    f = io.StringIO()
 try:
 with redirect_stdout(f):
 exec(code)
 return f.getvalue()
 except Exception as e:
 return f"错误：{str(e)}"

code_tool = Tool(
    name="PythonExecutor",
    func=python_executor,
    description="执行Python代码。适用于数据处理、计算、可视化等任务。"
)

# Agent可以这样用：
# code_tool.run("""
# import pandas as pd
# data = [1, 2, 3, 4, 5]
# print(f"平均值：{sum(data)/len(data)}")
# """)</code></pre>

<ol start="9"><li id="t-hJ9BZZHz1SJvJLbDHKdC5b"><span style="font-weight:bold">API</span><span style="font-weight:bold">调用工具</span></li></ol>

<pre id="t-HIXTBvSdKjNoGOf52MAGOo"><code>import requests

def weather_api(city: str) -&gt; str:
 """查询天气"""
 # 假设调用某个天气API
    response = requests.get(f"https://api.weather.com/{city}")
 return response.json()

weather_tool = Tool(
    name="WeatherAPI",
    func=weather_api,
    description="查询指定城市的天气信息。输入城市名，返回温度、湿度等信息。"
)</code></pre>

<ol start="10"><li id="t-mVZK1dy1NcAOqz8w1UH0at"><span style="font-weight:bold">数据库工具</span></li></ol>

<pre id="t-ybBplf7eDeQuDVOZxbV7mX"><code>import sqlite3

def query_database(sql: str) -&gt; str:
 """查询数据库"""
    conn = sqlite3.connect('my_database.db')
    cursor = conn.cursor()
 try:
        cursor.execute(sql)
        results = cursor.fetchall()
 return str(results)
 except Exception as e:
 return f"查询错误：{str(e)}"
 finally:
        conn.close()

db_tool = Tool(
    name="DatabaseQuery",
    func=query_database,
    description="执行SQL查询。适用于需要从数据库获取数据的场景。"
)</code></pre>

<a id="t-OQgE8QdrM9vSsKlaAawLHY"></a>

##### 工具组合的实际案例

<p id="t-g1ezCtCHD9G7QtlZTs0vVg"><span style="font-weight:bold">案例：构建一个</span><span style="font-weight:bold">数据分析</span><span style="font-weight:bold">Agent</span></p>

<pre id="t-yqwBODBo9J638Bk2bXLhBy"><code>from langchain.agents import create_react_agent, AgentExecutor
from langchain_openai import ChatOpenAI

# 1. 准备工具集
tools = [
    search_tool, # 搜索数据
    code_tool, # 数据处理
    db_tool, # 数据库查询
]

# 2. 创建Agent
llm = ChatOpenAI(model="gpt-4", temperature=0)
agent = create_react_agent(llm, tools)
agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True)

# 3. 执行复杂任务
result = agent_executor.invoke({
 "input": """
    帮我分析一下：
    1. 从数据库中查询2024年的销售数据
    2. 搜索行业平均增长率
    3. 用Python计算我们的增长率
    4. 对比并给出结论
    """
})

# Agent的执行过程：
# Thought: 需要先从数据库获取数据
# Action: DatabaseQuery("SELECT * FROM sales WHERE year=2024")
# Observation: [...数据...]
# 
# Thought: 需要搜索行业数据
# Action: WebSearch("2024年销售行业平均增长率")
# Observation: [...行业数据...]
# 
# Thought: 现在可以计算了
# Action: PythonExecutor("
#     our_growth = (current - previous) / previous * 100
#     industry_avg = 15.2
#     print(f'我们的增长率：{our_growth}%，行业平均：{industry_avg}%')
# ")
# Observation: 我们的增长率：18.5%，行业平均：15.2%
# 
# Thought: 可以给出结论了
# Final Answer: [完整分析报告]</code></pre>

<a id="t-WrafIwTUF66zCTZ68XASbV"></a>

##### 工具使用的最佳实践

<p id="t-kKCVO61kU7DDS9Cbyurp1e"><span style="font-weight:bold">实践1：工具描述要精确</span></p>

<p id="t-XRlvZLJbuQcDcS64BX5VHz"><span>❌ </span><span style="font-weight:bold">不好的描述</span><span>：</span></p>

<pre id="t-sR4yG0X4CRkEqhR05srMrq"><code>description="一个搜索工具"</code></pre>

<p id="t-HjocB6ovDuPe9Q6p3Xr0an"><span>✅ </span><span style="font-weight:bold">好的描述</span><span>：</span></p>

<pre id="t-o24CQb64lkZT7UHMqARL4R"><code>description="""
搜索互联网获取最新信息。
- 输入：搜索关键词（字符串）
- 输出：相关网页内容摘要
- 适用场景：需要实时数据、最新新闻、当前事件
- 不适用场景：历史数据、个人信息、数学计算
"""</code></pre>

<p id="t-5Y2uEJ7YoQipqdK5TbXVrI"><span style="font-weight:bold">实践2：工具要有错误处理</span></p>

<pre id="t-SW4gdArM1ahtXLgcpddfKW"><code>def safe_tool(input_data):
 try:
 # 工具的实际逻辑
        result = process(input_data)
 return result
 except Exception as e:
 # 返回友好的错误信息，帮助Agent调整策略
 return f"工具执行失败：{str(e)}。建议：尝试其他方法或简化输入。"</code></pre>

<p id="t-tH59YUTRcWzl5IWdoPiCyC"><span style="font-weight:bold">实践3：工具要有使用日志</span></p>

<pre id="t-Sy8tHdQqRXrhdRbx38248B"><code>import logging

def logged_tool(input_data):
    logging.info(f"工具被调用，输入：{input_data}")
    result = execute(input_data)
    logging.info(f"工具执行完成，输出：{result}")
 return result</code></pre>


<a id="section-1156"></a>
## ReAct框架深度解析

<a id="t-IvQlAmZDYmyqBGIIVfpJZo"></a>

<p id="t-bbc1hrebWGyMZKYDiLbMdA"><span>ReAct（Reasoning + Acting）是目前最主流的Agent工作框架，由Google Brain研究团队提出。</span></p>

<a id="t-zaDuxkAracj0KwvfsFsp7v"></a>

##### ReAct的核心循环

<div id="t-CjeD7DbIucQXTX7fB4w2Kj"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/3bb78cfe4625ac661dc9f66d.png"/></div>

<a id="t-1OtrQJ7r0djIyIYJ3nUbS8"></a>

##### 完整的ReAct示例

<p id="t-QsU6ALMNfW9zIickFeLP2z"><span style="font-weight:bold">任务</span><span>：「2024年哪个国家赢得了最多的奥运金牌？这个国家的首都是哪里？」</span></p>

<p id="t-UU9F6Dr2aPb2IMIUumcIiy"><span style="font-weight:bold">Agent的完整思考过程</span><span>：</span></p>

<pre id="t-gRrFO6NwF19ViaRE3iPNJe"><code>=== 第一轮循环 ===

Thought 1:
"我需要找到2024年奥运会的金牌榜信息。这需要搜索最新的数据。"

Action 1:
Tool: WebSearch
Input: "2024奥运会金牌榜"

Observation 1:
"2024年巴黎奥运会，美国队以40枚金牌位居榜首，中国队38枚金牌第二..."

=== 第二轮循环 ===

Thought 2:
"好的，美国赢得了最多的金牌。现在我需要确认美国的首都。虽然我知道是华盛顿D.C.，但为了确保准确性，我应该验证一下。"

Action 2:
Tool: WebSearch
Input: "美国首都"

Observation 2:
"美国的首都是华盛顿哥伦比亚特区（Washington, D.C.）..."

=== 完成 ===

Thought 3:
"我已经获得了所有需要的信息，可以回答了。"

Final Answer:
"2024年巴黎奥运会，美国赢得了最多的金牌（40枚）。美国的首都是华盛顿哥伦比亚特区（Washington, D.C.）。"</code></pre>

<a id="t-xHOLbkoJxzAFMyFZn2Wane"></a>

##### ReAct的代码实现

<pre id="t-NIP9xvPPROUspxfteTYsRZ"><code>from langchain.agents import create_react_agent, AgentExecutor
from langchain_openai import ChatOpenAI
from langchain.tools import Tool
from langchain.prompts import PromptTemplate

# 1. 定义ReAct的提示词模板
react_prompt = PromptTemplate.from_template("""
你是一个AI助手，通过推理和行动来解决问题。

可用工具：
{tools}

使用以下格式：

Question: 需要回答的问题
Thought: 你应该思考该做什么
Action: 要采取的行动，必须是[{tool_names}]之一
Action Input: 行动的输入
Observation: 行动的结果
... (这个Thought/Action/Action Input/Observation可以重复N次)
Thought: 我现在知道最终答案了
Final Answer: 原始问题的最终答案

开始！

Question: {input}
Thought: {agent_scratchpad}
""")

# 2. 创建工具
def search(query):
 # 简化的搜索实现
 if "金牌" in query:
 return "2024年巴黎奥运会美国队40枚金牌第一"
 elif "首都" in query:
 return "美国首都是华盛顿D.C."

search_tool = Tool(
    name="Search",
    func=search,
    description="搜索互联网信息"
)

# 3. 创建Agent
llm = ChatOpenAI(model="gpt-4", temperature=0)
agent = create_react_agent(
    llm=llm,
    tools=[search_tool],
    prompt=react_prompt
)

agent_executor = AgentExecutor(
    agent=agent,
    tools=[search_tool],
    verbose=True, # 显示详细过程
    max_iterations=5 # 最多5轮循环
)

# 4. 执行任务
result = agent_executor.invoke({
 "input": "2024年哪个国家赢得了最多的奥运金牌？这个国家的首都是哪里？"
})

print(result["output"])</code></pre>


<a id="section-1157"></a>
## 其他Agent工作模式

<a id="t-r8olf3bhUKgRsE73dcTZhy"></a>

<p id="t-MWIDtWlz7YOZy0lsa2B0qL"><span>除了ReAct，还有其他几种重要的工作模式：</span></p>

<a id="t-SwS8yIWuYQZBIr5MVvIkNF"></a>

##### 模式1：Chain of Thought (CoT) - 纯推理

<div id="t-8I8fK62JZPFXrZp3CaYPhT"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/6cce2df15e5eca4b1323a6fa.png"/></div>

<p id="t-odYp4ie4oisUrxMbLcrStc"><span style="font-weight:bold">特点</span><span>：</span></p>

<ul><li id="t-dV0OJgMeNQBj6rz7jNuuFK"><span>只有思考，没有行动</span></li></ul>

<ul><li id="t-1XgaJHDo20lZFUCG92sKxa"><span>适合纯逻辑推理问题</span></li></ul>

<ul><li id="t-KelmRqqrHAgMjSk9JFJQ9i"><span>Token消耗少</span></li></ul>

<p id="t-QPuGeXUUYVCu2aeWjqckTe"><span style="font-weight:bold">示例</span><span>：</span></p>

<pre id="t-EHaJ0bfUkx8wJKkJLsEZT0"><code>问题："如果一个房间有3只猫，每只猫前面有2只猫，那一共有多少只猫？"

CoT推理：
思考1：题目说"每只猫前面有2只猫"
思考2：这意味着猫排成一排
思考3：但只有3只猫，所以是循环的或者交叉的排列
思考4：实际上还是3只猫
答案：3只猫</code></pre>

<a id="t-iYaag7yDlqlsdFDnlS5bdV"></a>

##### 模式2：Plan-and-Execute - 先计划后执行

<div id="t-aVqd3MFuFyNbqNHrMidFHN"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/80a85fd747372a6ad0df63b8.png"/></div>

<p id="t-X4gsgtXunhBmQGdA8dAnOV"><span style="font-weight:bold">特点</span><span>：</span></p>

<ul><li id="t-Q1ytzYnzskc1JJf95K2h5e"><span>先一次性规划，再按计划执行</span></li></ul>

<ul><li id="t-fAUQRJPkDr8KF1vTahIyjl"><span>可以并行执行任务</span></li></ul>

<ul><li id="t-x9W2RIhrK1jp6vdhPz47ZG"><span>适合流程明确的复杂任务</span></li></ul>

<p id="t-7dQ3vHvsZBRzNQLyGMORPs"><span style="font-weight:bold">代码示例</span><span>：</span></p>

<pre id="t-iogSR6GpyrybUZ9fsaTDmt"><code>#1. 规划阶段
planner_prompt = """
将任务分解为子任务：
任务：{task}

请输出JSON格式的任务列表：
[
    {"id": 1, "description": "...", "dependencies": []},
    {"id": 2, "description": "...", "dependencies": [1]},
    ...
]
"""

plan = llm.invoke(planner_prompt.format(
    task="分析竞争对手的产品策略"
))

# 2. 执行阶段
for task in plan:
 if all_dependencies_completed(task):
        result = execute_task(task)
        store_result(task.id, result)</code></pre>

<a id="t-dzOjIv4CN1ptTBIcLQpbC5"></a>

##### 模式3：Self-Ask - 自问自答

<div id="t-57KO4ZOnnJEwX3WpKuoSja"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/35238438fca44f7637a087d2.png"/></div>

<p id="t-p1dMGaPec4QqGARpMjwlts"><span style="font-weight:bold">示例</span><span>：</span></p>

<pre id="t-ySTbFurnwzhNjCMe4DlIwb"><code>主问题："iPhone 15的屏幕比iPhone 14大多少？"

Agent自问自答：
Q1: "iPhone 15的屏幕尺寸是多少？"
→ 搜索得到：6.1英寸

Q2: "iPhone 14的屏幕尺寸是多少？"
→ 搜索得到：6.1英寸

Q3: "6.1英寸 - 6.1英寸 = ?"
→ 计算得到：0英寸

最终答案："iPhone 15和iPhone 14的屏幕尺寸相同，都是6.1英寸。"</code></pre>


<a id="section-1158"></a>
## 理解Agent的三种视角

<a id="t-m2iuiWE6BbbO8ksgNwIcup"></a>

<a id="t-ZKqQCy8HVfgENsb6vBcGRX"></a>

##### 视角1：把Agent看作「员工」

<pre id="t-5FHxp2buugZyWkHX2V7F8O"><code>你（老板）：「帮我准备明天的演讲PPT」

Agent（员工）：
理解需求（演讲主题、目标听众）
搜索资料（行业数据、案例）
设计大纲（结构规划）
制作PPT（使用工具）
审核优化（自我检查）
交付成果（PPT文件）</code></pre>

<p id="t-01mwilVbou2AKw9EcAAB1c"><span style="font-weight:bold">这个视角帮助你</span><span>：</span></p>

<ul><li id="t-W6L1NmvftNH3YpryzWninj"><span>设计Agent的职责范围</span></li></ul>

<ul><li id="t-oYegqEcJsysj2V2i2DUYly"><span>定义输入输出格式</span></li></ul>

<ul><li id="t-WUfgSDuBaA3W5kTLnbutZk"><span>考虑错误处理</span></li></ul>

<a id="t-TzyCtSe8ivBb2tFp2aNcfL"></a>

##### 视角2：把Agent看作「循环系统」

<pre id="t-nkLGsbcbLdIbB7r5Bw7NT5"><code>输入 → [感知 → 思考 → 决策 → 行动 → 观察] → 输出
         ↑_______________________________|
              反馈循环</code></pre>

<p id="t-tgFECjCwyvNGnFF6DyqtAm"><span style="font-weight:bold">这个视角帮助你</span><span>：</span></p>

<ul><li id="t-yWqbrTjuYtryeyN8uUbXjA"><span>优化循环次数</span></li></ul>

<ul><li id="t-KzLfhmVrDAIXfWPCojyhtV"><span>设置终止条件</span></li></ul>

<ul><li id="t-Z5AMZk1QbE33pgBaX3rfgf"><span>调试中间过程</span></li></ul>

<a id="t-GRjTugYmcJHisTP7LxGfae"></a>

##### 视角3：把Agent看作「大脑+工具」

<pre id="t-GnL3XRGuax6O1fmzKgMmEN"><code>大脑（LLM）：
    理解语言
    推理规划
    生成文本

↕ 通信

工具箱：
    搜索引擎
    计算器
    API接口
    数据库</code></pre>

<p id="t-yJlk10YJW1uK0Hy2TP6TqM"><span style="font-weight:bold">这个视角帮助你</span><span>：</span></p>

<ul><li id="t-pXuUZsG6e0dfr4u4TpEqdO"><span>扩展Agent能力（添加新工具）</span></li></ul>

<ul><li id="t-c7mHewqJ9fVIcLynmcEWyK"><span>优化工具选择（描述要精确）</span></li></ul>

<ul><li id="t-nf0aE0qVQZXbUViIt4p4KY"><span>提升执行效率（工具要快）</span></li></ul>


<a id="section-1160"></a>
## 难点一：无限循环与任务卡死

<a id="t-Q80LepSkFddch3PmHQyBVG"></a>

<a id="t-QREG3G6ATs3u7ypsJcrKYC"></a>

##### 问题描述

<p id="t-BhT9nP8LU8iegHUS9lvYPs"><span>Agent可能陷入死循环：</span></p>

<pre id="t-attgMR2l1UrAsqhRtoztvs"><code>Thought: 我需要搜索信息
Action: Search("2024 AI")
Observation: [搜索结果]

Thought: 我需要搜索更详细的信息
Action: Search("2024 AI详细")
Observation: [搜索结果]

Thought: 我需要搜索更详细的信息
Action: Search("2024 AI更详细")
...（永远循环）</code></pre>

<a id="t-2IlKIuBEpzZBF3FGi0nC5D"></a>

##### 解决方案

<p id="t-HnCb0GKG7gvvuAPdSO9wMQ"><span style="font-weight:bold">方案1：设置最大迭代次数</span></p>

<pre id="t-fkJTnCYoBDE5S9rSZTLVCO"><code>agent_executor = AgentExecutor(
    agent=agent,
    tools=tools,
    max_iterations=10, # 最多执行10轮
    max_execution_time=60, # 最多执行60秒
    early_stopping_method="generate" # 超时时生成答案
)</code></pre>

<p id="t-a2TTKZVzvNs9gnysONloWh"><span style="font-weight:bold">方案2：优化提示词，明确终止条件</span></p>

<pre id="t-82TDCHWf8fovIGMk8u2eYu"><code>prompt = """
你必须在5步内完成任务。
如果5步内无法完成，请给出"基于现有信息的最佳答案"。

当前已经执行了{iterations}步。
"""</code></pre>

<p id="t-StKrHiV9GQkPUYZg2eClJO"><span style="font-weight:bold">方案3：实现智能终止判断</span></p>

<pre id="t-Pu6nfL3Zsock3eZzDH1k90"><code>def should_continue(agent_state):
 # 检查是否在重复相同的行动
    last_3_actions = agent_state.history[-3:]
 if len(set(last_3_actions)) == 1: # 最后3个动作都相同
 return False # 终止

 # 检查是否进展缓慢
 if agent_state.iterations &gt; 5 and not has_new_info(agent_state):
 return False

 return True</code></pre>


<a id="section-1161"></a>
## 难点二：工具选择错误

<a id="t-pZMdSavgyEF04YHFlx1XMW"></a>

<a id="t-pGM3SfZltmLD8PRJK9VPmu"></a>

##### 问题描述

<pre id="t-1D0J36orW9lbakWovjRxpF"><code>Agent选择了错误的工具：
任务："计算2024年有多少天"

错误选择：
Action: WebSearch("2024年有多少天")  ❌ 不需要搜索

正确选择：
Action: Calculator("365 if not is_leap_year(2024) else 366")  ✅</code></pre>

<a id="t-4LD726HTcemn7yg3RsjOvD"></a>

##### 根本原因

<ol start="11"><li id="t-hlydWh5KP0xPFHihlDAY2R"><span>工具描述不清晰</span></li></ol>

<ol start="12"><li id="t-1qxQ8pR1syCAWkBfrWk2d6"><span>Prompt没有给出使用规则</span></li></ol>

<ol start="13"><li id="t-PrbhRpIgdh4xGqHMwZnuuo"><span>LLM对任务理解有偏差</span></li></ol>

<a id="t-EocVA9dLM2ftUHxYc0keRZ"></a>

##### 解决方案

<p id="t-vZuS5D2XLN6LfTWqxYvrnN"><span style="font-weight:bold">方案1：改进工具描述</span></p>

<pre id="t-7wQnyp5WiqIuSECEOxNWru"><code>❌ 不好的描述
calculator_tool = Tool(
    name="Calculator",
    description="计算"
)

# ✅ 好的描述
calculator_tool = Tool(
    name="Calculator",
    description="""
    用于精确的数学计算。

    适用场景：
    - 算术运算（加减乘除）
    - 数学函数（平方、开方、三角函数）
    - 逻辑判断（比较大小）

    输入格式：Python数学表达式字符串
    示例："2 + 2", "sqrt(16)", "2024 % 4 == 0"

    不适用场景：
    - 需要最新数据（用Search）
    - 需要上下文信息（用Memory）
    """
)</code></pre>

<p id="t-jmwVU88EfpKNElZWyBn6in"><span style="font-weight:bold">方案2：添加工具使用示例</span></p>

<pre id="t-fo23sIqc8MNtAjvyDOdZxo"><code>prompt = """
工具使用示例：

问题："今天的天气如何？"
正确：Action: WeatherAPI("北京")
错误：Action: Calculator("天气")  # 天气不是数学问题

问题："2的100次方是多少？"
正确：Action: Calculator("2**100")
错误：Action: Search("2的100次方")  # 不需要搜索

现在请处理：{input}
"""</code></pre>

<p id="t-dkUmM2pb0PHs0XSWBl2VVm"><span style="font-weight:bold">方案3：实现工具推荐系统</span></p>

<pre id="t-NyTQ0xaWJXD0wRBmLgBvVb"><code>def recommend_tool(task_description, available_tools):
 """根据任务描述推荐工具"""
 # 使用LLM分析任务
    analysis = llm.invoke(f"""
    任务：{task_description}

    请分析这个任务需要：
    1. 实时数据吗？→ 需要Search
    2. 数学计算吗？→ 需要Calculator
    3. 历史信息吗？→ 需要Memory

    推荐工具（JSON格式）：
    {{"recommended": ["tool1", "tool2"], "reason": "..."}}
    """)

 return analysis.recommended</code></pre>


<a id="section-1162"></a>
## 难点三：上下文窗口溢出

<a id="t-MEWQpyGreWhqJbD3R2wUKz"></a>

<a id="t-9yYzxclE5ikSTTg1bEobdI"></a>

##### 问题描述

<p id="t-BM9JcmQ7tYJRjgxXzpLXyb"><span>长对话或复杂任务会导致：</span></p>

<pre id="t-OfbtyiZ58Ls3YYQUoEotSe"><code>Prompt + 历史对话 + 工具描述 + 中间结果 = 超过Token限制

GPT-4: 128K tokens
Claude: 200K tokens

一次复杂任务可能消耗50K+ tokens
→ 超出限制或成本过高</code></pre>

<a id="t-uYKd3iGJsrM8yduBGuO3Ws"></a>

##### 解决方案

<p id="t-tMPFgcQMsNV9iEncTTNIDG"><span style="font-weight:bold">方案1：智能压缩上下文</span></p>

<pre id="t-OJN4tO2GKSJpHPcXBKDUxh"><code>from langchain.memory import ConversationSummaryBufferMemory

memory = ConversationSummaryBufferMemory(
    llm=llm,
    max_token_limit=4000, # 保留最近4000 tokens
    moving_summary_buffer="", # 旧的对话自动总结
)

# 效果：
# 旧对话："用户询问了天气、新闻、股票...共20轮对话"
# ↓ 总结为
# "用户主要关心北京天气（晴）、今日新闻（AI发展）、股票（上涨）"</code></pre>

<p id="t-eU0C7UpHYE61fpoQNWN1a5"><span style="font-weight:bold">方案2：分层记忆</span></p>

<pre id="t-0dBCkJdt3zsgFVD09ETQtk"><code>class HierarchicalMemory:
 def init(self):
        self.recent_memory = [] # 最近3轮，完整保留
        self.mid_term_memory = [] # 中期10轮，保留关键信息
        self.long_term_memory = vectorstore  # 长期，向量检索

 def add(self, message):
        self.recent_memory.append(message)

 if len(self.recent_memory) &gt; 3:
 # 移到中期记忆，提取关键信息
            old_message = self.recent_memory.pop(0)
            key_info = extract_key_info(old_message)
            self.mid_term_memory.append(key_info)

 if len(self.mid_term_memory) &gt; 10:
 # 移到长期记忆，存入向量库
            old_info = self.mid_term_memory.pop(0)
            self.long_term_memory.add_texts([old_info])

 def get_context(self, query):
 # 组合三层记忆
        recent = "\n".join(self.recent_memory)
        mid = "\n".join(self.mid_term_memory)
        relevant = self.long_term_memory.similarity_search(query, k=2)

 return f"{recent}\n\n相关历史：{mid}\n{relevant}"</code></pre>

<p id="t-eRMmSrFcElqnH5gM2P4gOc"><span style="font-weight:bold">方案3：动态工具加载</span></p>

<pre id="t-7cuoQOqsIDxiFMgvI5u858"><code>#不要一次性加载所有工具
all_tools = {
 "search": search_tool,
 "calculator": calc_tool,
 "database": db_tool,
 "api": api_tool,
 # ... 50个工具
}

# 根据任务动态选择工具
def select_tools(task):
 # 分析任务需要哪些类别的工具
 if "搜索" in task or "查询" in task:
 return [all_tools["search"]]
 elif "计算" in task:
 return [all_tools["calculator"]]
 # ...

 # 默认返回最常用的5个工具
 return list(all_tools.values())[:5]

# 创建Agent时只加载需要的工具
tools = select_tools(user_input)
agent = create_agent(llm, tools)</code></pre>


<a id="section-1163"></a>
## 难点四：错误处理与鲁棒性

<a id="t-LioXw2qCEfAemR7VTYHxkM"></a>

<a id="t-2CRoW7iqi5qkuiP05H6a50"></a>

##### 问题描述

<p id="t-Ew7fHslx4PqtckkEGg7hNu"><span>各种错误会导致Agent崩溃：</span></p>

<ul><li id="t-hJkhNM6qMNpWsco7TUtEaZ"><span>工具调用失败</span></li></ul>

<ul><li id="t-qLyeubbc9n6UFyNrvj3el3"><span>API超时</span></li></ul>

<ul><li id="t-GpiNwpTPNfuLbvXUIUDCLT"><span>返回格式错误</span></li></ul>

<ul><li id="t-5zuEvQdGDPwBoezFh1Oll7"><span>LLM输出异常</span></li></ul>

<a id="t-KRsRiprhx0xx1LjztHOPWN"></a>

##### 解决方案

<p id="t-TD3hm7iQbplbmRKbGA01XZ"><span style="font-weight:bold">方案1：工具层面的错误处理</span></p>

<pre id="t-JKOTKl8ho225XU4scDgu8f"><code>def robust_tool(func):
 """装饰器：让工具更健壮"""
 def wrapper(*args, **kwargs):
        max_retries = 3
 for attempt in range(max_retries):
 try:
                result = func(*args, **kwargs)
 return {
 "success": True,
 "data": result
 }
 except TimeoutError:
 if attempt == max_retries - 1:
 return {
 "success": False,
 "error": "工具执行超时，请尝试简化输入或使用其他工具"
 }
                time.sleep(2 ** attempt) # 指数退避
 except Exception as e:
 return {
 "success": False,
 "error": f"工具执行失败：{str(e)}"
 }
 return wrapper

@robust_tool
def search_tool(query):
 # 实际搜索逻辑
 return search_engine.query(query)</code></pre>

<p id="t-4zF4VRG6Rda9vAoUxCF1Ji"><span style="font-weight:bold">方案2：Agent层面的降级策略</span></p>

<pre id="t-r1ClBXwqaaMBwuacbTS5cQ"><code>class RobustAgent:
 def execute(self, task):
 try:
 # 尝试完整流程
 return self.full_execution(task)
 except AgentError:
 # 降级：使用简化流程
 return self.simplified_execution(task)
 except Exception:
 # 最终降级：直接用LLM回答
 return self.fallback_execution(task)

 def full_execution(self, task):
 # ReAct完整循环，可能使用多个工具
 return self.react_loop(task)

 def simplified_execution(self, task):
 # 简化版：只用一个最重要的工具
        tool = self.select_best_tool(task)
        result = tool.run(task)
 return self.llm.summarize(result)

 def fallback_execution(self, task):
 # 保底：直接用LLM知识回答
 return self.llm.invoke(f"请基于你的知识回答：{task}")</code></pre>

<p id="t-GT6aBuxMdlxZM3gOKHuiWC"><span style="font-weight:bold">方案3：实时监控与告警</span></p>

<pre id="t-E2SqZZpu5tYwZeIWJPHFgI"><code>import logging

class AgentMonitor:
 def init(self):
        self.metrics = {
 "total_tasks": 0,
 "success": 0,
 "failures": 0,
 "avg_time": 0,
 }

 def log_execution(self, task, result, duration):
        self.metrics["total_tasks"] += 1

 if result["success"]:
            self.metrics["success"] += 1
 else:
            self.metrics["failures"] += 1
            logging.error(f"Task failed: {task}, Error: {result['error']}")

 # 计算平均时间
        self.metrics["avg_time"] = (
            self.metrics["avg_time"] * (self.metrics["total_tasks"] - 1) + duration
 ) / self.metrics["total_tasks"]

 # 告警
        failure_rate = self.metrics["failures"] / self.metrics["total_tasks"]
 if failure_rate &gt; 0.3: # 失败率超过30%
            send_alert(f"Agent failure rate: {failure_rate:.2%}")</code></pre>


<a id="section-1164"></a>
## 难点五：成本控制

<a id="t-23mL9VCFzv41L3epy9wagH"></a>

<a id="t-LLXN6XXdGaBw04ahLjbFrl"></a>

##### 问题描述

<p id="t-zvtVCErRIvGUE9bDybyzJt"><span>Agent的成本可能很高：</span></p>

<pre id="t-bFQ0AqKMEZ19TM4tOaMyT2"><code>一次复杂任务：
10轮ReAct循环
每轮2K tokens输入 + 500 tokens输出
总计：(2000+500) * 10 = 25K tokens

GPT-4价格（假设）：
输入：$0.03 / 1K tokens
输出：$0.06 / 1K tokens

单次任务成本：
输入：20K * 0.03 = $0.60
输出：5K * 0.06 = $0.30
总计：$0.90

如果每天1000个任务 = $900/天 = $27,000/月</code></pre>

<a id="t-I42UeI75MkCenJm29PGLbZ"></a>

##### 解决方案

<p id="t-tkRxNTWec7YYuAkln89uh2"><span style="font-weight:bold">方案1：模型分级使用</span></p>

<pre id="t-xPEwCMXbHy3a0JsCxeUBvq"><code>class CostOptimizedAgent:
 def init(self):
        self.models = {
 "cheap": ChatOpenAI(model="gpt-3.5-turbo"), # $0.002/1K
 "standard": ChatOpenAI(model="gpt-4"), # $0.03/1K
 "premium": ChatOpenAI(model="gpt-4-turbo"), # $0.01/1K
 }

 def select_model(self, task_complexity):
 # 简单任务用便宜模型
 if task_complexity &lt; 3:
 return self.models["cheap"]
 elif task_complexity &lt; 7:
 return self.models["standard"]
 else:
 return self.models["premium"]

 def estimate_complexity(self, task):
 # 根据任务特征估计复杂度
        factors = {
 "num_steps": len(parse_steps(task)) * 2,
 "need_tools": 3 if requires_tools(task) else 0,
 "domain_specific": 2 if is_specialized(task) else 0,
 }
 return sum(factors.values())</code></pre>

<p id="t-p6RVxV7nRd66e8nEn2zqP7"><span style="font-weight:bold">方案2：缓存机制</span></p>

<pre id="t-pamBefBPcBYAyGJOwzC69H"><code>from functools import lru_cache
import hashlib

class CachedAgent:
 def init(self):
        self.cache = {}

 def execute(self, task):
 # 计算任务的哈希值
        task_hash = hashlib.md5(task.encode()).hexdigest()

 # 检查缓存
 if task_hash in self.cache:
            logging.info(f"Cache hit for task: {task[:50]}...")
 return self.cache[task_hash]

 # 执行任务
        result = self.agent.run(task)

 # 存入缓存
        self.cache[task_hash] = result
 return result

# 效果：
# 第一次："北京明天天气" → 调用LLM → 成本$0.05
# 第二次："北京明天天气" → 从缓存读取 → 成本$0</code></pre>

<p id="t-1IIaqZsVogwqjVN4KaNi5U"><span style="font-weight:bold">方案3：</span><span style="font-weight:bold">批处理</span></p>

<pre id="t-jBN9HOdK4DbJaYaylLYXKH"><code>def batch_process(tasks):
 """批量处理相似任务"""
 # 将相似任务分组
    groups = group_similar_tasks(tasks)

    results = []
 for group in groups:
 # 一次性处理一组任务
        batch_prompt = f"""
        请处理以下{len(group)}个相似任务：
 {"\n".join([f"{i+1}. {t}" for i, t in enumerate(group)])}

        请输出JSON格式的结果列表。
        """

        batch_result = llm.invoke(batch_prompt)
        results.extend(parse_batch_result(batch_result))

 return results

# 效果：
# 单独处理10个任务：10次LLM调用
# 批量处理10个任务：2-3次LLM调用（节省70%成本）</code></pre>

<p id="t-Iqrw8XMtjcQ4DDvlevWFqN"><span style="font-weight:bold">方案4：设置预算限制</span></p>

<pre id="t-N78oiINmVdY0ClQ26Epxri"><code>class BudgetControlledAgent:
 def init(self, daily_budget_usd=10):
        self.daily_budget = daily_budget_usd
        self.today_spent = 0
        self.task_count = 0

 def execute(self, task):
 # 检查预算
        estimated_cost = self.estimate_cost(task)
 if self.today_spent + estimated_cost &gt; self.daily_budget:
 return {
 "success": False,
 "message": f"预算不足。今日已用${self.today_spent:.2f}，预算${self.daily_budget}"
 }

 # 执行任务
        result = self.agent.run(task)
        actual_cost = self.calculate_cost(result.tokens_used)

 # 更新统计
        self.today_spent += actual_cost
        self.task_count += 1

        logging.info(f"Task {self.task_count}: Cost ${actual_cost:.4f}, Total ${self.today_spent:.2f}")

 return result</code></pre>


<a id="section-1166"></a>
## 为什么需要多Agent？

<a id="t-3frjXzFdBalgEkuJtSeKIi"></a>

<p id="t-0TuQqlt6017NO0MWopGar9"><span>单个Agent的局限性：</span></p>

<pre id="t-YYCxIKytzcHqWOytLKnkmn"><code>假设你要开发一个完整的软件产品：

单Agent模式：
Agent：「我既要写需求文档，又要写代码，还要测试，还要设计UI...」
→ 能力有限
→ 容易出错
→ 效率低下

多Agent模式：
产品经理Agent：负责需求分析
架构师Agent：负责系统设计
开发Agent：负责编写代码
测试Agent：负责质量保证
UI设计Agent：负责界面设计

→ 专业分工
→ 并行工作
→ 质量更高</code></pre>


<a id="section-1167"></a>
## 多Agent系统架构

<a id="t-ITpvLxU9LBC9wh5Wy0mTLE"></a>

<div id="t-Z417bYmJfvuxUOnJHF222P"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/ec656456bf9b43f5f8d27aeb.png"/></div>


<a id="section-1168"></a>
## 多Agent协作模式

<a id="t-m9LeWHRJ8yQTWGMekhoZ84"></a>

<a id="t-hemA74KjuktMmypUXdc7tK"></a>

##### 模式1：层级结构（Hierarchical）

<div id="t-CTzE5bqgqDX1dLx8RI878w"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/d9eebefa597c4cc2d2d383a6.png"/></div>

<p id="t-D5H6aONem0q5khvwzROhv1"><span style="font-weight:bold">特点</span><span>：</span></p>

<ul><li id="t-D0y5YtMPwoAh1Y4MBfi3H3"><span>有明确的上下级关系</span></li></ul>

<ul><li id="t-6LYX4ROql19yRsG9l55ADh"><span>管理者负责任务分配和结果整合</span></li></ul>

<ul><li id="t-x7mx3XC7hCHHayg8FIqPBP"><span>适合层次清晰的任务</span></li></ul>

<p id="t-XTk80jUh4bnLES4Odgz66O"><span style="font-weight:bold">代码实现</span><span>：</span></p>

<pre id="t-OFri23z7nFLtyIFzxGlQPu"><code>from langchain.agents import Agent
from langchain_openai import ChatOpenAI

class ManagerAgent:
 def init(self):
        self.llm = ChatOpenAI(model="gpt-4")
        self.workers = {
 "researcher": ResearcherAgent(),
 "analyst": AnalystAgent(),
 "writer": WriterAgent(),
 }

 def delegate(self, task):
 # 分析任务，分配给合适的worker
        plan = self.llm.invoke(f"""
        任务：{task}

        请将任务分解并分配给以下worker：
        - researcher: 负责搜集信息
        - analyst: 负责数据分析
        - writer: 负责内容创作

        输出JSON格式的任务分配：
        [
            {{"worker": "researcher", "subtask": "..."}},
            {{"worker": "analyst", "subtask": "..."}},
            ...
        ]
        """)

 # 分配任务
        results = {}
 for subtask in plan:
            worker_name = subtask["worker"]
            worker = self.workers[worker_name]
            results[worker_name] = worker.execute(subtask["subtask"])

 # 整合结果
 return self.integrate_results(results)

 def integrate_results(self, results):
 # 让LLM整合各个worker的结果
        combined = self.llm.invoke(f"""
        请整合以下各部分的结果：

        研究结果：{results['researcher']}
        分析结果：{results['analyst']}
        创作结果：{results['writer']}

        输出最终完整的报告。
        """)
 return combined

# 使用
manager = ManagerAgent()
result = manager.delegate("分析2024年AI Agent市场趋势并撰写报告")</code></pre>

<a id="t-h7g3PXM5otmWVjMqpzj4kn"></a>

##### 模式2：平等协作（Collaborative）

<div id="t-rEB1H71mygfzzKLOferfua"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/a7b8c69264dad602046f9df0.png"/></div>

<p id="t-YJntXSfSnOH9qvtMOFUtKv"><span style="font-weight:bold">特点</span><span>：</span></p>

<ul><li id="t-czqvFwape1cSphHSyKODQJ"><span>Agents地位平等</span></li></ul>

<ul><li id="t-7XKiK9Px21gplleD9TtRJ2"><span>可以相互协商和讨论</span></li></ul>

<ul><li id="t-7FjPqQ0oaI3h2N0gQDfZOO"><span>适合需要多角度思考的复杂问题</span></li></ul>

<p id="t-EolFp53e3TsyEbpsZxtTku"><span style="font-weight:bold">代码实现（AutoGen风格）</span><span>：</span></p>

<pre id="t-VIKnh99iIWGsNovaycEY2Z"><code>from autogen import ConversableAgent

# 定义三个平等的Agent
researcher = ConversableAgent(
    name="Researcher",
    system_message="你是一个研究员，负责收集和验证信息。",
    llm_config={"model": "gpt-4"},
)

critic = ConversableAgent(
    name="Critic",
    system_message="你是一个评论家，负责质疑和改进方案。",
    llm_config={"model": "gpt-4"},
)

writer = ConversableAgent(
    name="Writer",
    system_message="你是一个作家，负责组织和表达信息。",
    llm_config={"model": "gpt-4"},
)

# Agents之间的对话
def collaborative_work(task):
 # Round 1: Researcher提供初步信息
    research_result = researcher.generate_reply(
        messages=[{"role": "user", "content": task}]
 )

 # Round 2: Critic评价和建议
    critique = critic.generate_reply(
        messages=[
 {"role": "user", "content": task},
 {"role": "assistant", "content": research_result},
 ]
 )

 # Round 3: Writer整合并输出
    final_output = writer.generate_reply(
        messages=[
 {"role": "user", "content": task},
 {"role": "assistant", "content": research_result},
 {"role": "assistant", "content": critique},
 ]
 )

 return final_output

result = collaborative_work("设计一个AI Agent产品的营销策略")</code></pre>

<a id="t-2kUVbcNPJmX08FjGVlOvyE"></a>

##### 模式3：流水线（Pipeline）

<div id="t-UQbNAWSH30WamkI5kKLKYx"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/95e5d79ccf5337dfee370cba.png"/></div>

<p id="t-aazD1VIjxhdnxGpuwL97CN"><span style="font-weight:bold">特点</span><span>：</span></p>

<ul><li id="t-sZhd1ZiGj3Hw6Hr0q0yUGQ"><span>固定的处理顺序</span></li></ul>

<ul><li id="t-L8m8XjyoAYFUdm7vsuv3eL"><span>每个Agent专注于流程中的一个阶段</span></li></ul>

<ul><li id="t-r85eW6oHEh1uhp9FGGsrrz"><span>适合有明确步骤的任务</span></li></ul>

<p id="t-pc7434Ck4P21IpRlZFhWUv"><span style="font-weight:bold">实际案例：内容创作流水线</span></p>

<pre id="t-melTQZPJfsZFffCKZHphxR"><code>class ContentPipeline:
 def init(self):
        self.stages = [
            ResearchAgent(), # 阶段1：研究
            OutlineAgent(), # 阶段2：大纲
            DraftAgent(), # 阶段3：草稿
            EditorAgent(), # 阶段4：编辑
            SEOAgent(), # 阶段5：SEO优化
 ]

 def process(self, topic):
        data = {"topic": topic}

 for stage in self.stages:
 print(f"执行阶段：{stage.name}")
            data = stage.execute(data)
 print(f"输出：{data[:100]}...\n")

 return data

# 定义各阶段的Agent
class ResearchAgent:
    name = "Research"
 def execute(self, data):
 # 搜索相关资料
        sources = search(data["topic"])
        data["sources"] = sources
 return data

class OutlineAgent:
    name = "Outline"
 def execute(self, data):
 # 基于sources生成大纲
        outline = generate_outline(data["sources"])
        data["outline"] = outline
 return data

class DraftAgent:
    name = "Draft"
 def execute(self, data):
 # 基于outline写草稿
        draft = write_draft(data["outline"])
        data["draft"] = draft
 return data

class EditorAgent:
    name = "Editor"
 def execute(self, data):
 # 润色和改进草稿
        edited = edit_content(data["draft"])
        data["final_content"] = edited
 return data

class SEOAgent:
    name = "SEO"
 def execute(self, data):
 # 优化SEO
        optimized = add_seo_keywords(data["final_content"])
        data["seo_content"] = optimized
 return data

# 使用流水线
pipeline = ContentPipeline()
article = pipeline.process("AI Agent的商业应用")</code></pre>


<a id="section-1169"></a>
## 多Agent的实战案例

<a id="t-i46DZRHb9BZCF3tTyxEbdA"></a>

<a id="t-qjpaxDwzWHtXmpcKOYE8Mk"></a>

##### 案例：智能软件开发团队

<pre id="t-MwKdfbL9W4vkgAMfHphjlG"><code>class SoftwareDevelopmentTeam:
 def init(self):
 # 定义团队成员
        self.agents = {
 "pm": ProductManagerAgent(), # 产品经理
 "architect": ArchitectAgent(), # 架构师
 "frontend": FrontendAgent(), # 前端开发
 "backend": BackendAgent(), # 后端开发
 "tester": TesterAgent(), # 测试工程师
 "reviewer": CodeReviewerAgent(), # 代码审查
 }

        self.coordinator = CoordinatorAgent()

 def develop(self, requirement):
 """完整的开发流程"""

 # 步骤1：产品经理分析需求
 print("📋 产品经理分析需求...")
        prd = self.agents["pm"].analyze_requirement(requirement)

 # 步骤2：架构师设计系统
 print("🏗️ 架构师设计系统...")
        architecture = self.agents["architect"].design_system(prd)

 # 步骤3：前后端并行开发
 print("💻 开发中...")
 from concurrent.futures import ThreadPoolExecutor

 with ThreadPoolExecutor(max_workers=2) as executor:
            frontend_future = executor.submit(
                self.agents["frontend"].develop,
                architecture["frontend_spec"]
 )
            backend_future = executor.submit(
                self.agents["backend"].develop,
                architecture["backend_spec"]
 )

            frontend_code = frontend_future.result()
            backend_code = backend_future.result()

 # 步骤4：代码审查
 print("🔍 代码审查...")
        review_result = self.agents["reviewer"].review({
 "frontend": frontend_code,
 "backend": backend_code,
 })

 if not review_result["passed"]:
 print("⚠️ 代码审查未通过，需要修改...")
 # 递归修改，直到通过
 return self.develop(requirement) # 简化示例

 # 步骤5：测试
 print("🧪 测试中...")
        test_result = self.agents["tester"].test({
 "frontend": frontend_code,
 "backend": backend_code,
 })

 if not test_result["passed"]:
 print("❌ 测试失败，修复bug...")
 # 修复并重新测试
 return self.develop(requirement) # 简化示例

 # 步骤6：部署
 print("✅ 开发完成！")
 return {
 "prd": prd,
 "architecture": architecture,
 "code": {
 "frontend": frontend_code,
 "backend": backend_code,
 },
 "test_report": test_result,
 }

# 使用
team = SoftwareDevelopmentTeam()
result = team.develop("开发一个AI聊天机器人网站")

# 输出示例：
# 📋 产品经理分析需求...
# 🏗️ 架构师设计系统...
# 💻 开发中...
# 🔍 代码审查...
# 🧪 测试中...
# ✅ 开发完成！</code></pre>


<a id="section-1170"></a>
## 多Agent的关键挑战

<a id="t-EylOjmyGi8JDKpPQTbVDy0"></a>

<a id="t-sPSFxvLofZKdYO540gJtxp"></a>

##### 挑战1：通信开销

<p id="t-FMQSwsWEb3beT0TJ2VyT3o"><span>多个Agent之间需要频繁通信：</span></p>

<pre id="t-qLF9cVovTh1fJnu41ImHOO"><code>#问题：每次通信都要调用LLM
Agent1 → LLM → Agent2 → LLM → Agent3
成本和延迟都很高

# 解决：使用结构化消息
class Message:
 def init(self, sender, receiver, content, message_type):
        self.sender = sender
        self.receiver = receiver
        self.content = content  # 结构化数据，不需要LLM理解
        self.type = message_type  # "task", "result", "question"

 def to_dict(self):
 return {
 "from": self.sender,
 "to": self.receiver,
 "content": self.content,
 "type": self.type,
 }

# Agent直接处理结构化消息，只在必要时调用LLM</code></pre>

<a id="t-97rXonf8XbnZHISnDrgPt0"></a>

##### 挑战2：死锁和循环依赖

<pre id="t-ipPiERlIfTv8sC6Satj7y6"><code>#问题：两个Agent互相等待
Agent1：等待Agent2的结果...
Agent2：等待Agent1的结果...
→ 死锁

# 解决：超时和fallback机制
class AgentCommunicator:
 def send_and_wait(self, target_agent, message, timeout=30):
        start_time = time.time()

 # 发送消息
        target_agent.receive(message)

 # 等待响应
 while time.time() - start_time &lt; timeout:
 if target_agent.has_response():
 return target_agent.get_response()
            time.sleep(0.1)

 # 超时处理
 return {"error": "Timeout", "fallback": "使用默认值"}</code></pre>

<a id="t-4R4VKUWg2u90ZQXWKkHK13"></a>

##### 挑战3：结果冲突

<pre id="t-zjLQaZXNGMqhWQNtAos6wO"><code>#问题：不同Agent给出不同的答案
Agent1: "这个方案可行"
Agent2: "这个方案有风险"
Agent3: "这个方案成本太高"

# 解决：投票或仲裁机制
class ConflictResolver:
 def resolve(self, opinions):
 # 方法1：投票
        votes = {"agree": 0, "disagree": 0}
 for opinion in opinions:
 if opinion["stance"] == "positive":
                votes["agree"] += opinion["confidence"]
 else:
                votes["disagree"] += opinion["confidence"]

 if votes["agree"] &gt; votes["disagree"]:
 return "采纳方案"
 else:
 return "否决方案"

 # 方法2：专家仲裁
        expert = ExpertAgent()
        final_decision = expert.judge(opinions)
 return final_decision</code></pre>


<a id="section-1172"></a>
## 框架总览对比

<a id="t-q5vKr96LPtkJzmHlDSWonx"></a>

<div id="t-4zNSMpOH1B6khfPcnuNEpi"><table><colgroup><col width="120"/><col width="120"/><col width="178.89752197265625"/><col width="150.00860595703125"/><col width="120"/></colgroup><tbody><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">框架</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">开发商</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">核心特点</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">适用场景</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">学习曲线</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">LangChain</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">LangChain Inc</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">生态最成熟，组件最丰富</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">通用Agent开发</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">中等</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">AutoGen</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">Microsoft</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">多Agent协作强大</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">复杂协作任务</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">较高</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">CrewAI</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">CrewAI</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">角色扮演，流程化</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">团队协作模拟</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">较低</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">Dify</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">Dify.ai</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">可视化编排</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">快速原型和业务</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">低</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">LazyLLM</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">商汤</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">懒人友好，中文优化</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">国内场景</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">低</span></p></td></tr></tbody></table></div>


<a id="section-1173"></a>
## LangChain深度解析

<a id="t-lmLd7nQvwLixWpjJ7UC0KD"></a>

<a id="t-3lrudOdI61O8Le5019AS1j"></a>

##### 核心概念

<pre id="t-eNXTsxkbGG83T9cRTD9KcG"><code>from langchain.agents import create_react_agent, AgentExecutor
from langchain_openai import ChatOpenAI
from langchain.tools import Tool
from langchain.prompts import PromptTemplate

# 1. LLM：大脑
llm = ChatOpenAI(model="gpt-4", temperature=0)

# 2. Tools：工具
tools = [
    Tool(
        name="Search",
        func=search_function,
        description="搜索互联网信息"
 ),
    Tool(
        name="Calculator",
        func=calculator_function,
        description="执行数学计算"
 ),
]

# 3. Prompt：指令模板
prompt = PromptTemplate.from_template("""
你是一个AI助手。使用以下工具来回答问题：
{tools}

格式：
Question: {input}
Thought: 思考过程
Action: 工具名称
Action Input: 工具输入
Observation: 工具输出
... (重复)
Thought: 我现在知道答案了
Final Answer: 最终答案

Question: {input}
{agent_scratchpad}
""")

# 4. Agent：组装
agent = create_react_agent(llm, tools, prompt)

# 5. Executor：执行器
agent_executor = AgentExecutor(
    agent=agent,
    tools=tools,
    verbose=True,
    max_iterations=5,
)

# 6. 执行
result = agent_executor.invoke({"input": "2024年AI Agent市场规模是多少？"})</code></pre>

<a id="t-8aw6jCKjxxdMRoCzoWmtdW"></a>

##### LangChain的优势

<pre id="t-iTEp3eIDagFhy95RczNkE1"><code>#优势1：丰富的集成
from langchain.vectorstores import Chroma
from langchain.embeddings import OpenAIEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.document_loaders import WebBaseLoader

#一站式RAG方案
loader = WebBaseLoader("https://example.com/article")
documents = loader.load()

text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000)
chunks = text_splitter.split_documents(documents)

vectorstore = Chroma.from_documents(
    documents=chunks,
    embedding=OpenAIEmbeddings()
)

#优势2：灵活的链式组合
from langchain.chains import LLMChain

chain = (
    prompt
 | llm
 | output_parser
)

#优势3：强大的记忆管理
from langchain.memory import ConversationBufferWindowMemory

memory = ConversationBufferWindowMemory(k=5) # 保留最近5轮对话</code></pre>


<a id="section-1174"></a>
## AutoGen多Agent协作

<a id="t-Fntindo7C3odYBTtqlcdPw"></a>

<a id="t-hEh0Y1pcVxf1l9JYvQUTiT"></a>

##### AutoGen的特色

<pre id="t-nFHtJZpm0jwzYWw7I6YBfE"><code>from autogen import ConversableAgent, GroupChat, GroupChatManager

#定义多个Agent
product_manager = ConversableAgent(
    name="PM",
    system_message="你是产品经理，负责需求分析和产品规划。",
    llm_config={"model": "gpt-4"},
)

engineer = ConversableAgent(
    name="Engineer",
    system_message="你是工程师，负责技术实现。",
    llm_config={"model": "gpt-4"},
)

designer = ConversableAgent(
    name="Designer",
    system_message="你是设计师，负责UI/UX设计。",
    llm_config={"model": "gpt-4"},
)

#创建群聊
group_chat = GroupChat(
    agents=[product_manager, engineer, designer],
    messages=[],
    max_round=10,
)

#管理者
manager = GroupChatManager(
    groupchat=group_chat,
    llm_config={"model": "gpt-4"},
)

#开始协作
product_manager.initiate_chat(
    manager,
    message="我们需要开发一个AI聊天应用，大家讨论一下方案。",
)

#输出示例：
#PM: "我建议使用WebSocket实现实时通信..."
#Engineer: "技术上可行，我可以用FastAPI+WebSocket实现..."
#Designer: "UI应该简洁，参考Slack的设计..."
#PM: "同意，我们先做MVP..."
#...</code></pre>

<a id="t-tJFekFDa1cBbvpd4T418lx"></a>

##### AutoGen的并行执行

<pre id="t-lArKtewaovy5sTfgtV1s8Y"><code>#多个Agent同时工作
from autogen import UserProxyAgent

user_proxy = UserProxyAgent(
    name="User",
    human_input_mode="NEVER", # 不需要人工输入
    code_execution_config={"work_dir": "workspace"},
)

#并行任务
tasks = [
 "搜索2024年AI发展趋势",
 "分析主要竞争对手",
 "设计产品架构",
]

import asyncio

async def parallel_execution():
    results = await asyncio.gather(*[
        agent.a_generate_reply({"content": task})
 for task in tasks
 ])
 return results</code></pre>


<a id="section-1175"></a>
## CrewAI角色扮演框架

<a id="t-O2NiyAiwOgGuIWdZhwDZMN"></a>

<a id="t-QTrPo6MYz6bS2nVOkdWUmj"></a>

##### CrewAI的团队概念

<pre id="t-I5TgT9L6FBXCyDli7fj4j0"><code>from crewai import Agent, Task, Crew

#定义角色
researcher = Agent(
    role="Research Analyst",
    goal="发现AI Agent领域的最新趋势",
    backstory="你是一个经验丰富的AI研究分析师...",
    tools=[search_tool],
    verbose=True,
)

writer = Agent(
    role="Content Writer",
    goal="撰写吸引人的技术文章",
    backstory="你是一个技术作家，擅长将复杂概念简化...",
    tools=[],
    verbose=True,
)

#定义任务
task1 = Task(
    description="研究2024年AI Agent的市场趋势",
    agent=researcher,
    expected_output="详细的市场分析报告",
)

task2 = Task(
    description="基于研究结果撰写一篇博客文章",
    agent=writer,
    expected_output="1500字的博客文章",
)

#组建团队
crew = Crew(
    agents=[researcher, writer],
    tasks=[task1, task2],
    verbose=True,
    process="sequential", # 顺序执行
)

#启动
result = crew.kickoff()</code></pre>


<a id="section-1176"></a>
## Dify可视化平台

<a id="t-LM9parp78jrTNd47sdvane"></a>

<a id="t-dlI80OxzPI1nYasWM1McY2"></a>

##### Dify的工作流编排

<pre id="t-990ug0Dbez0L0HvLN59uB2"><code>[用户输入]
    ↓
[LLM节点: 理解意图]
    ↓
[条件分支]
    ├─ 需要搜索 → [搜索节点] → [LLM节点: 总结]
    └─ 不需要搜索 → [LLM节点: 直接回答]
    ↓
[输出节点]</code></pre>

<p id="t-lxAozUWAhSHMKu2eYi0IDa"><span style="font-weight:bold">Dify的优势</span><span>：</span></p>

<ul><li id="t-7QKlWdijYVV8mhmSiLrSOO"><span>✅ 拖拽式设计，无需代码</span></li></ul>

<ul><li id="t-hkcgzSZmyrO1H3j2kfbcGe"><span>✅ 内置RAG、Agent、工作流模板</span></li></ul>

<ul><li id="t-v8H7OEypTTjSQJyRiTbP3I"><span>✅ 可视化调试和监控</span></li></ul>

<ul><li id="t-5XRX8rLRqmHl8oY3uU867g"><span>✅ 一键部署API</span></li></ul>

<p id="t-vYsR3JkFTACAWDy16EscPz"><span style="font-weight:bold">适用场景</span><span>：</span></p>

<ul><li id="t-U7pCxNnKoMUHlbch3vHU9E"><span>快速原型验证</span></li></ul>

<ul><li id="t-UccmgRLLtWtH35lKM5InWA"><span>业务人员使用</span></li></ul>

<ul><li id="t-YOCVXb2983apyKb7MDBKu8"><span>低代码场景</span></li></ul>


<a id="section-1177"></a>
## 框架选择指南

<a id="t-gQ5BPq9BXMq4QsgwbxNUfL"></a>

<pre id="t-Qo5sFW4eONlZXv0YXkTQJH"><code>def choose_framework(scenario):
 if scenario == "学习和探索":
 return "LangChain - 生态最完善，教程最多"
 elif scenario == "多Agent协作":
 return "AutoGen - 专为多Agent设计"
 elif scenario == "团队流程模拟":
 return "CrewAI - 角色扮演最自然"
 elif scenario == "快速原型":
 return "Dify - 可视化，上手快"
 elif scenario == "国内部署":
 return "LazyLLM - 中文优化，商汤支持"
 elif scenario == "生产级应用":
 return "LangChain + 自定义优化"
 else:
 return "LangChain - 最保险的选择"</code></pre>


<a id="section-1179"></a>
## 案例一：智能客服Agent

<a id="t-kBWF0AHuMfIMlTNLImTQW8"></a>

<a id="t-s8WQ9AveFILgvPFzVQJm3I"></a>

##### 需求分析

<pre id="t-qjcfIyzKbXICMN2eoyRdAQ"><code>场景：电商平台的客服系统

功能要求：
回答常见问题（FAQ）
查询订单状态
处理退换货
转人工客服（复杂问题）
技术挑战：
需要访问数据库（订单系统）
需要记忆上下文（多轮对话）
需要情感识别（判断用户情绪）</code></pre>

<a id="t-Rtq3RvvRprCcVniA24VWpI"></a>

##### 完整实现

<pre id="t-Y9GXbaVcaETFnqqf0kVAAX"><code>from langchain.agents import create_react_agent, AgentExecutor
from langchain_openai import ChatOpenAI
from langchain.tools import Tool
from langchain.memory import ConversationBufferMemory
import sqlite3

# 1. 定义工具

def query_order(order_id: str) -&gt; str:
 """查询订单状态"""
    conn = sqlite3.connect('ecommerce.db')
    cursor = conn.cursor()

    cursor.execute(
 "SELECT status, items, total FROM orders WHERE order_id = ?",
 (order_id,)
 )
    result = cursor.fetchone()
    conn.close()

 if result:
        status, items, total = result
 return f"订单状态：{status}，商品：{items}，总金额：{total}元"
 else:
 return "未找到该订单"

def search_faq(question: str) -&gt; str:
 """搜索FAQ知识库"""
    faq_db = {
 "退货": "退货政策：7天无理由退货，商品需保持完好...",
 "发货": "发货时间：工作日下单当天发货，节假日顺延...",
 "支付": "支付方式：支持微信、支付宝、信用卡...",
 }

 # 简单的关键词匹配
 for key, answer in faq_db.items():
 if key in question:
 return answer

 return "未找到相关FAQ，建议转人工客服"

def detect_emotion(text: str) -&gt; str:
 """检测用户情绪"""
    negative_words = ["生气", "不满意", "糟糕", "差", "垃圾"]

 for word in negative_words:
 if word in text:
 return "negative"

 return "neutral"

# 2. 创建工具列表

tools = [
    Tool(
        name="QueryOrder",
        func=query_order,
        description="查询订单状态。输入订单号，返回订单详情。"
 ),
    Tool(
        name="SearchFAQ",
        func=search_faq,
        description="搜索常见问题答案。输入问题关键词。"
 ),
    Tool(
        name="DetectEmotion",
        func=detect_emotion,
        description="检测用户情绪。输入用户消息文本。"
 ),
]

# 3. 创建客服Agent

llm = ChatOpenAI(model="gpt-4", temperature=0.7)

memory = ConversationBufferMemory(
    memory_key="chat_history",
    return_messages=True
)

customer_service_prompt = """
你是一个友好、专业的电商客服AI助手。

你的职责：
1. 热情回答用户问题
2. 查询订单信息
3. 处理退换货问题
4. 如遇复杂问题，建议转人工客服

重要原则：
- 始终保持礼貌和耐心
- 如果用户情绪不好，先安抚情绪
- 准确查询信息，不要编造数据
- 不确定时建议转人工

可用工具：
{tools}

对话历史：
{chat_history}

用户问题：{input}
{agent_scratchpad}
"""

agent = create_react_agent(llm, tools, customer_service_prompt)

agent_executor = AgentExecutor(
    agent=agent,
    tools=tools,
    memory=memory,
    verbose=True,
    max_iterations=5,
)

# 4. 使用示例

def chat_with_customer(user_input):
    result = agent_executor.invoke({"input": user_input})
 return result["output"]

# 对话流程
print("客服：您好！我是AI客服小助手，很高兴为您服务~")

# 第一轮
user1 = "我想查一下订单号12345的状态"
response1 = chat_with_customer(user1)
print(f"客服：{response1}")

# Agent思考过程（verbose=True会显示）：
# Thought: 用户想查询订单，我需要使用QueryOrder工具
# Action: QueryOrder
# Action Input: "12345"
# Observation: 订单状态：已发货，商品：iPhone 15，总金额：5999元
# Thought: 我现在知道订单信息了
# Final Answer: 您的订单12345已经发货啦！...

# 第二轮（记忆上下文）
user2 = "什么时候能到？"
response2 = chat_with_customer(user2)
print(f"客服：{response2}")

# Agent会记得在讨论订单12345</code></pre>

<a id="t-6auiwDvf2NfqVVkkskoniu"></a>

##### 增强版：处理情绪和转人工

<pre id="t-nUjA5QhjhSE65D3CNcqwpn"><code>class EnhancedCustomerServiceAgent:
 def __init__(self):
        self.agent = agent_executor
        self.human_agent_queue = []
 def handle_message(self, user_input):
 # 1. 检测情绪
        emotion = detect_emotion(user_input)
 if emotion == "negative":
 # 情绪不好，优先安抚
            comfort_msg = "非常抱歉给您带来不好的体验，我会尽快帮您解决问题..."
 print(f"客服：{comfort_msg}")
 # 2. Agent处理
 try:
            response = self.agent.invoke({"input": user_input})
            result = response["output"]
 # 3. 判断是否需要转人工
 if self._need_human_agent(result):
 return self._transfer_to_human(user_input)
 return result
 except Exception as e:
 # 出错时转人工
 return self._transfer_to_human(user_input)
 def _need_human_agent(self, agent_response):
 # 检测关键词
        keywords = ["转人工", "不能解决", "复杂问题"]
 return any(kw in agent_response for kw in keywords)
 def _transfer_to_human(self, user_input):
        self.human_agent_queue.append({
 "user_input": user_input,
 "timestamp": datetime.now(),
 })
 return "我为您转接人工客服，请稍等..."

#使用
enhanced_agent = EnhancedCustomerServiceAgent()
response = enhanced_agent.handle_message("我的订单有问题，很生气！")</code></pre>


<a id="section-1180"></a>
## 案例二：代码生成Agent

<a id="t-H44omKMfHGaGr2bqrJZVr6"></a>

<a id="t-ld4HrVlkdcjMMu3ZWc6fSN"></a>

##### 需求分析

<pre id="t-ssWlv6BogRsquy2ugXr3q5"><code>功能：根据自然语言描述生成代码

流程：
    理解需求
    设计方案
    生成代码
    测试代码
    修复bug（如果有）
    添加注释和文档</code></pre>

<a id="t-3rO72MxdFRpVJnFkexyKmt"></a>

##### 实现

<pre id="t-CVYWFhZRKI6WD2fqEMu6nV"><code>from langchain.agents import Tool
import subprocess
import tempfile
import os

class CodeGenerationAgent:
 def init(self):
        self.llm = ChatOpenAI(model="gpt-4", temperature=0)

 # 定义工具
        self.tools = [
            Tool(
                name="GenerateCode",
                func=self._generate_code,
                description="生成Python代码"
 ),
            Tool(
                name="TestCode",
                func=self._test_code,
                description="测试代码是否可以运行"
 ),
            Tool(
                name="FixBug",
                func=self._fix_bug,
                description="修复代码中的bug"
 ),
 ]

 def _generate_code(self, requirement: str) -&gt; str:
 """生成代码"""
        prompt = f"""
        请根据以下需求生成Python代码：

        需求：{requirement}

        要求：
        1. 代码要清晰、可读
        2. 添加必要的注释
        3. 包含错误处理
        4. 包含使用示例

        请输出完整的可运行代码。
        """

        response = self.llm.invoke(prompt)
        code = self._extract_code(response.content)
 return code

 def _test_code(self, code: str) -&gt; dict:
 """测试代码"""
 # 创建临时文件
 with tempfile.NamedTemporaryFile(
            mode='w',
            suffix='.py',
            delete=False
 ) as f:
            f.write(code)
            temp_file = f.name

 try:
 # 运行代码
            result = subprocess.run(
 ['python', temp_file],
                capture_output=True,
                text=True,
                timeout=5
 )

 if result.returncode == 0:
 return {
 "success": True,
 "output": result.stdout,
 }
 else:
 return {
 "success": False,
 "error": result.stderr,
 }

 except subprocess.TimeoutExpired:
 return {
 "success": False,
 "error": "代码执行超时"
 }

 finally:
            os.unlink(temp_file)

 def _fix_bug(self, code: str, error: str) -&gt; str:
 """修复bug"""
        prompt = f"""
        以下代码有错误：

        代码：
        ```python
 {code}
        ```

        错误信息：
 {error}

        请修复这个bug并返回完整的正确代码。
        """

        response = self.llm.invoke(prompt)
        fixed_code = self._extract_code(response.content)
 return fixed_code

 def _extract_code(self, text: str) -&gt; str:
 """从回复中提取代码"""
 # 提取```python...```之间的内容
 import re
        pattern = r"```python\n(.*?)```"
        match = re.search(pattern, text, re.DOTALL)

 if match:
 return match.group(1).strip()
 else:
 return text.strip()

 def generate(self, requirement: str, max_attempts=3):
 """完整的代码生成流程"""
 print(f"📝 需求：{requirement}\n")

 # 步骤1：生成代码
 print("1️⃣ 生成代码...")
        code = self._generate_code(requirement)
 print(f"生成的代码：\n{code}\n")

 # 步骤2：测试代码
 print("2️⃣ 测试代码...")

 for attempt in range(max_attempts):
            test_result = self._test_code(code)

 if test_result["success"]:
 print("✅ 测试通过！")
 print(f"输出：{test_result['output']}")

 # 步骤3：添加文档
 print("\n3️⃣ 添加文档...")
                documented_code = self._add_documentation(code)

 return documented_code

 else:
 print(f"❌ 测试失败（尝试{attempt+1}/{max_attempts}）")
 print(f"错误：{test_result['error']}\n")

 # 修复bug
 print("🔧 修复bug...")
                code = self._fix_bug(code, test_result['error'])
 print(f"修复后的代码：\n{code}\n")

 # 所有尝试都失败
 return {
 "success": False,
 "message": f"经过{max_attempts}次尝试仍无法生成可运行的代码",
 "last_code": code,
 }

 def _add_documentation(self, code: str) -&gt; str:
 """添加文档字符串"""
        prompt = f"""
        为以下代码添加详细的文档字符串（docstring）和使用说明：

        ```python
 {code}
        ```

        要求：
        1. 每个函数都有docstring
        2. 包含参数说明
        3. 包含返回值说明
        4. 包含使用示例
        """

        response = self.llm.invoke(prompt)
 return self._extract_code(response.content)

# 使用示例
agent = CodeGenerationAgent()

result = agent.generate("""
写一个函数，计算列表中所有数字的平方和。
要求：
- 输入是一个数字列表
- 返回平方和
- 包含错误处理（如果输入不是数字）
""")

print("\n" + "="*50)
print("最终代码：")
print("="*50)
print(result)

# 输出示例：
# 📝 需求：写一个函数，计算列表中所有数字的平方和...
# 
# 1️⃣ 生成代码...
# 生成的代码：
# def sum_of_squares(numbers):
#     total = 0
#     for num in numbers:
#         total += num ** 2
#     return total
# 
# 2️⃣ 测试代码...
# ✅ 测试通过！
# 
# 3️⃣ 添加文档...
# 
# ==================================================
# 最终代码：
# ==================================================
# def sum_of_squares(numbers):
#     """
#     计算列表中所有数字的平方和。
#     
#     参数：
#         numbers (list): 数字列表
#     
#     返回：
#         int/float: 所有数字的平方和
#     
#     示例：
#         &gt;&gt;&gt; sum_of_squares([1, 2, 3])
#         14
#     """
#     ...</code></pre>


<a id="section-1181"></a>
## 案例三：数据分析Agent

<a id="t-UxKcuAynA1hXSpnSHlqju1"></a>

<a id="t-vZDmShuAjYXz0hPUPUvW3x"></a>

##### 需求

<pre id="t-HCBoWfIYpXM9h9hGUcBBiZ"><code>场景：自动分析Excel数据

功能：
    读取Excel文件
    数据清洗和预处理
    统计分析（均值、中位数等）
    生成可视化图表
    输出分析报告</code></pre>

<a id="t-JWvicxyAX9aML0EGjwtbbT"></a>

##### 实现（完整代码过长，展示关键部分）

<pre id="t-edMewLxiLSv6iM06A5WGKm"><code>import pandas as pd
import matplotlib.pyplot as plt

class DataAnalysisAgent:
 def analyze(self, file_path: str, question: str):
 """
        分析数据并回答问题
        参数：
            file_path: Excel文件路径
            question: 分析问题
        """
 # 1. 读取数据
 print("📊 读取数据...")
        df = pd.read_excel(file_path)
 print(f"数据形状：{df.shape}")
 print(f"列名：{df.columns.tolist()}\n")
 # 2. 让Agent分析应该做什么
 print("🤔 分析问题...")
        analysis_plan = self._plan_analysis(df, question)
 print(f"分析计划：\n{analysis_plan}\n")
 # 3. 执行分析
 print("⚙️ 执行分析...")
        results = self._execute_analysis(df, analysis_plan)
 # 4. 生成报告
 print("📝 生成报告...")
        report = self._generate_report(results, question)
 return report
 def _plan_analysis(self, df, question):
 """制定分析计划"""
        prompt = f"""
        数据集信息：
        - 形状：{df.shape}
        - 列名：{df.columns.tolist()}
        - 前5行数据：
 {df.head().to_string()}
        问题：{question}
        请制定分析计划（JSON格式）：
        {{
            "steps": [
                {{"action": "统计描述", "columns": ["..."]}}，
                {{"action": "分组分析", "group_by": "...", "agg": "..."}},
                {{"action": "可视化", "chart_type": "...", "x": "...", "y": "..."}}
            ]
        }}
        """
        response = self.llm.invoke(prompt)
 return json.loads(response.content)
 def _execute_analysis(self, df, plan):
 """执行分析步骤"""
        results = {}
 for step in plan["steps"]:
            action = step["action"]
 if action == "统计描述":
                results["统计"] = df[step["columns"]].describe()
 elif action == "分组分析":
                results["分组"] = df.groupby(step["group_by"]).agg(step["agg"])
 elif action == "可视化":
                self._create_chart(df, step)
                results["图表"] = "已生成"
 return results

#使用
agent = DataAnalysisAgent()
report = agent.analyze(
 "sales_data.xlsx",
 "分析各地区的销售情况，找出销售最好的3个地区"
)</code></pre>


<a id="section-1183"></a>
## 提示词工程优化

<a id="t-S5zDxNYkMDf9OeHigMSkQF"></a>

<a id="t-rtd3UfdUvImUvaOwTsmYaB"></a>

##### 技巧1：Few-Shot Examples

<pre id="t-oJkrA8UBGqOlsA7vkanFzd"><code>#❌ 不好的提示词
prompt = "请分析这段代码"

# ✅ 好的提示词（包含示例）
prompt = """
请分析代码的时间复杂度。

示例1：
代码：
for i in range(n):
    print(i)

分析：时间复杂度 O(n)，因为循环执行n次。

示例2：
代码：
for i in range(n):
    for j in range(n):
        print(i, j)

分析：时间复杂度 O(n²)，因为嵌套循环执行n*n次。

现在请分析以下代码：
{code}
"""</code></pre>

<a id="t-KJosFrWm8hCGrVO3FuMXMQ"></a>

##### 技巧2：Chain of Thought

<pre id="t-Az8oCcCdmuaENrwhkuf8w5"><code>#❌ 直接要求答案
prompt = "2024年哪个国家GDP最高？"

# ✅ 引导逐步思考
prompt = """
请回答：2024年哪个国家GDP最高？

请按以下步骤思考：
1. 首先，我需要搜索2024年全球GDP排名
2. 然后，找到排名第一的国家
3. 最后，验证这个信息的可靠性

现在开始：
"""</code></pre>

<a id="t-KAWwRgnYClpvcg0xVC1WmV"></a>

##### 技巧3：角色扮演

<pre id="t-tDuLoq84mOq6FNqh0gRoAd"><code>#❌ 通用指令
prompt = "帮我写代码"

#✅ 明确角色
prompt = """
你是一个资深的Python工程师，有10年开发经验。
你的代码特点：
清晰易读
注重性能
考虑边界情况
包含完整的错误处理
现在请帮我写一个函数...
"""</code></pre>


<a id="section-1184"></a>
## 工具调用优化

<a id="t-BYCDpBP7rcGuD8xQpbTUN2"></a>

<a id="t-NQYOMRlc622lWXvRfatLIw"></a>

##### 优化1：工具描述标准化

<pre id="t-XsQho8niKqpWMvR09QegxO"><code>class ToolDescriptionTemplate:
 """标准化的工具描述模板"""
 @staticmethod
 def create_description(
        purpose: str,
        input_format: str,
        output_format: str,
        use_cases: list,
        limitations: list,
 ):
 return f"""
工具目的：{purpose}

输入格式：{input_format}
输出格式：{output_format}

适用场景：
{chr(10).join(f"- {case}" for case in use_cases)}

不适用场景：
{chr(10).join(f"- {limit}" for limit in limitations)}

示例：
输入："example_input"
输出："example_output"
"""

使用
search_tool_desc = ToolDescriptionTemplate.create_description(
    purpose="搜索互联网获取最新信息",
    input_format="字符串（搜索查询）",
    output_format="字符串（搜索结果摘要）",
    use_cases=[
 "需要最新数据（新闻、事件）",
 "查找具体信息（人物、地点）",
 "验证事实",
 ],
    limitations=[
 "不用于数学计算",
 "不用于代码执行",
 "不用于个人隐私信息",
 ],
)</code></pre>

<a id="t-kqoFyovDXMcFljCVBDCFCg"></a>

##### 优化2：工具调用缓存

<pre id="t-71JeDIeR2w6PVz3n8D2MoL"><code>from functools import lru_cache
import hashlib

class CachedToolExecutor:
 def init(self):
        self.cache = {}
        self.cache_hits = 0
        self.cache_misses = 0

 def execute(self, tool_name: str, tool_input: str):
 # 生成缓存key
        cache_key = hashlib.md5(
 f"{tool_name}:{tool_input}".encode()
 ).hexdigest()

 # 检查缓存
 if cache_key in self.cache:
            self.cache_hits += 1
 print(f"✅ Cache hit! (命中率: {self.hit_rate:.2%})")
 return self.cache[cache_key]

 # 执行工具
        self.cache_misses += 1
        result = self._actual_execute(tool_name, tool_input)

 # 存入缓存
        self.cache[cache_key] = result
 return result

 @property
 def hit_rate(self):
        total = self.cache_hits + self.cache_misses
 return self.cache_hits / total if total &gt; 0 else 0</code></pre>


<a id="section-1185"></a>
## 成本优化策略

<a id="t-3qZXyU0DXiIYXEcfKYDYOo"></a>

<a id="t-yURdX0kf2qXFjaPag8kx8I"></a>

##### 策略1：智能Token管理

<pre id="t-zwom036kMB1mucKSGM48jG"><code>class TokenOptimizer:
 def __init__(self, max_tokens=4000):
        self.max_tokens = max_tokens
 def compress_context(self, messages: list) -&gt; list:
 """压缩上下文"""
        total_tokens = sum(len(m["content"].split()) for m in messages)
 if total_tokens &lt;= self.max_tokens:
 return messages
 # 保留最近的和最重要的
        recent_messages = messages[-3:] # 最近3条
        important_messages = self._extract_important(messages[:-3])
 return important_messages + recent_messages
 def _extract_important(self, messages):
 """提取重要消息"""
 # 使用关键词识别重要性
        important_keywords = ["重要", "关键", "必须", "注意"]
        important = []
 for msg in messages:
 if any(kw in msg["content"] for kw in important_keywords):
                important.append(msg)
 return important[:2] # 最多保留2条</code></pre>

<a id="t-rOaLcATymNvGlbd4MstUsH"></a>

##### 策略2：批量处理

<pre id="t-Xvz5560aZ64axlDiC7hWBP"><code>def batch_process_with_cost_tracking(tasks, batch_size=10):
 """批量处理并跟踪成本"""
    results = []
    total_cost = 0

 for i in range(0, len(tasks), batch_size):
        batch = tasks[i:i+batch_size]

 # 批量处理
        batch_prompt = create_batch_prompt(batch)
        response = llm.invoke(batch_prompt)

 # 计算成本
        tokens_used = count_tokens(batch_prompt) + count_tokens(response.content)
        batch_cost = calculate_cost(tokens_used)
        total_cost += batch_cost

 print(f"批次{i//batch_size + 1}: {len(batch)}个任务, 成本${batch_cost:.4f}")

 # 解析结果
        batch_results = parse_batch_response(response.content)
        results.extend(batch_results)

 print(f"\n总成本: ${total_cost:.4f}")
 print(f"平均每任务: ${total_cost/len(tasks):.4f}")

 return results</code></pre>


<a id="section-1186"></a>
## 可靠性增强

<a id="t-MTwk2DxUm8ajZKS1wdqH2H"></a>

<a id="t-2yludsXkt36t0qNciSilrV"></a>

##### 技巧1：重试机制

<pre id="t-0XSFwJmMjWBMqlXd9fxp6n"><code>import time
from functools import wraps

def retry_with_exponential_backoff(
    max_retries=3,
    initial_delay=1,
    exponential_base=2,
):
 """指数退避重试装饰器"""
 def decorator(func):
 @wraps(func)
 def wrapper(*args, **kwargs):
            delay = initial_delay

 for attempt in range(max_retries):
 try:
 return func(*args, **kwargs)
 except Exception as e:
 if attempt == max_retries - 1:
 raise

 print(f"⚠️ 尝试{attempt+1}失败: {e}")
 print(f"等待{delay}秒后重试...")
                    time.sleep(delay)
                    delay *= exponential_base

 return wrapper
 return decorator

# 使用
@retry_with_exponential_backoff(max_retries=3)
def call_llm(prompt):
 return llm.invoke(prompt)</code></pre>

<a id="t-CQHlOuAhklypH0Gha1XLCY"></a>

##### 技巧2：健康检查

<pre id="t-FdmFK7kDIIHUKA0uasxwLD"><code>class AgentHealthMonitor:
 def init(self):
        self.metrics = {
 "total_requests": 0,
 "successful_requests": 0,
 "failed_requests": 0,
 "total_latency": 0,
 }

 def record_request(self, success: bool, latency: float):
        self.metrics["total_requests"] += 1
        self.metrics["total_latency"] += latency

 if success:
            self.metrics["successful_requests"] += 1
 else:
            self.metrics["failed_requests"] += 1

 def get_health_status(self):
        total = self.metrics["total_requests"]
 if total == 0:
 return "UNKNOWN"

        success_rate = self.metrics["successful_requests"] / total
        avg_latency = self.metrics["total_latency"] / total

 if success_rate &gt;= 0.95 and avg_latency &lt; 2:
 return "HEALTHY"
 elif success_rate &gt;= 0.8:
 return "DEGRADED"
 else:
 return "UNHEALTHY"

 def get_report(self):
        total = self.metrics["total_requests"]
 if total == 0:
 return "暂无数据"

 return f"""
健康状态：{self.get_health_status()}

统计信息：
- 总请求数：{total}
- 成功率：{self.metrics["successful_requests"]/total:.2%}
- 平均延迟：{self.metrics["total_latency"]/total:.2f}秒
"""</code></pre>


<a id="section-1187"></a>
## 调试与监控

<a id="t-ZGrkrK6QwcnJikpKY7Y2sh"></a>

<a id="t-UaXixyz8c3dzJylTl4yZMN"></a>

##### 调试技巧

<pre id="t-ESsmEY69lnnbMqKxCT3MXB"><code>class DebugAgent:
 def init(self, agent, debug_mode=True):
        self.agent = agent
        self.debug_mode = debug_mode
        self.execution_log = []

 def execute(self, task):
 if self.debug_mode:
 print("\n" + "="*50)
 print("🔍 调试模式")
 print("="*50)
 print(f"任务：{task}\n")

        start_time = time.time()

 try:
 # 记录每一步
            result = self._execute_with_logging(task)

 if self.debug_mode:
                self._print_execution_summary(time.time() - start_time)

 return result

 except Exception as e:
 if self.debug_mode:
                self._print_error_details(e)
 raise

 def _execute_with_logging(self, task):
 # 钩子：记录每次工具调用
        original_tool_call = self.agent.tool_executor.call

 def logged_tool_call(tool_name, tool_input):
            self.execution_log.append({
 "type": "tool_call",
 "tool": tool_name,
 "input": tool_input,
 "timestamp": time.time(),
 })

            result = original_tool_call(tool_name, tool_input)

            self.execution_log.append({
 "type": "tool_result",
 "tool": tool_name,
 "result": result,
 "timestamp": time.time(),
 })

 if self.debug_mode:
 print(f"\n🔧 工具调用：{tool_name}")
 print(f"输入：{tool_input}")
 print(f"输出：{result[:100]}...")

 return result

        self.agent.tool_executor.call = logged_tool_call

 return self.agent.execute(task)

 def _print_execution_summary(self, duration):
 print("\n" + "="*50)
 print("📊 执行总结")
 print("="*50)
 print(f"总耗时：{duration:.2f}秒")
 print(f"工具调用次数：{len([l for l in self.execution_log if l['type']=='tool_call'])}")
 print(f"执行步骤：{len(self.execution_log)}")</code></pre>


<a id="section-1189"></a>
## 技术趋势

<a id="t-HRhob15EFnIypn6Lx9IKtH"></a>

<a id="t-vnBCGb6k3bBjSbNvBJB20q"></a>

##### 趋势1：更强的推理能力

<pre id="t-n3ujhsDLgrADKgFRf5OX4d"><code>当前（2024）：
GPT-4：擅长语言理解和生成
推理能力有限（复杂数学、逻辑）

未来（2025-2026）：
OpenAI o1系列：专注推理
DeepSeek-R1：强化学习推理
推理时间↑，推理准确度↑</code></pre>

<p id="t-hu6zimTlXP5Q6JPXIC7HDx"><span style="font-weight:bold">影响</span><span>：</span></p>

<ul><li id="t-P9X5tjUqkZBYFVsQkDgpMh"><span>Agent可以处理更复杂的任务</span></li></ul>

<ul><li id="t-IhbFQqFqeASbws95beff2Y"><span>减少对外部工具的依赖</span></li></ul>

<ul><li id="t-NLAyR7EyihGPOSmcGQsP4t"><span>更少的错误和幻觉</span></li></ul>

<a id="t-R0Rx7COqMs1YON14wgLngd"></a>

##### 趋势2：多模态Agent

<pre id="t-7Ic8NocCwqDUx8g1d0aiWw"><code>当前：主要处理文本
未来：
图像理解（识别图表、设计UI）
视频分析（剪辑、内容审核）
语音交互（实时对话）
3D环境操作（游戏、仿真）</code></pre>

<p id="t-LoaDp3nOLJVFREUDnFD0qF"><span style="font-weight:bold">示例场景</span><span>：</span></p>

<pre id="t-gPcUnI1I6EHEwK5ePNgTOy"><code>用户上传设计草图 → Agent识别 → 生成HTML/CSS → 自动部署网站</code></pre>

<a id="t-3Ps19hOTFJv1MIwsWSQxwQ"></a>

##### 趋势3：个性化和记忆增强

<pre id="t-dbeyeUw7hlaX87RnIwLybz"><code>当前：对话级记忆
未来：
跨会话的长期记忆
个性化学习（理解用户习惯）
主动建议（不等用户询问）</code></pre>


<a id="section-1191"></a>
## 从咖啡店点单说起

<a id="t-jjB1EfsEuOsQkY6Pv1UCJq"></a>

<p id="t-naTXXy8F1PrEk8Nbrlr95Q"><span>想象你走进一家咖啡店，对服务员说："好冷啊，来点热的。"</span></p>

<p id="t-sbK6oSElveFMBQbvsn9rzM"><span>服务员会怎么做？她不会傻乎乎地问"你到底要什么"，而是立刻明白：</span></p>

<ul><li id="t-qv6axm9Eu9A0Y9CK60gVzH"><span style="font-weight:bold">表面话语</span><span>："好冷啊，来点热的"</span></li></ul>

<ul><li id="t-b85Ei30lQET18r2MxkyVOM"><span style="font-weight:bold">真实意图</span><span>：我想要一杯热饮</span></li></ul>

<p id="t-YntRoDakgupWLNsBWQR3mT"><span>这就是</span><span style="font-weight:bold">意图识别</span><span>！</span></p>


<a id="section-1192"></a>
## AI Agent中的意图识别

<a id="t-ccPRJOb2IOz41prQ9fax7V"></a>

<div id="t-mrg7PPfvvA0BgtRGsWFblp"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/2323df76888e68edf3d835c2.png"/></div>

<p id="t-MMCOxKN9E1CX9dSpIR8TuI"><span>在AI世界里，意图识别（Intent Recognition）就是让机器理解用户说话背后的真实目的。</span></p>

<p id="t-zEnGkcc4PeB8VT313YMEsO"><span style="font-weight:bold">举个例子</span><span>：</span></p>

<div id="t-jkjPLBX4PLkoyqnIE7jcq6"><table><colgroup><col width="214.9010009765625"/><col width="169.001708984375"/><col width="208.00860595703125"/></colgroup><tbody><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">用户说的话</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">AI识别的意图</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid;font-weight:bold">应该做什么</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">"今天天气怎么样？"</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">查询天气</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">调用天气API</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">"帮我订张去北京的机票"</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">预订机票</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">打开订票流程</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">"我的订单到哪了？"</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">查询订单</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">查询物流信息</span></p></td></tr><tr><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">"太贵了，有便宜点的吗？"</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">价格筛选</span></p></td><td style=" vertical-align: middle"><p><span style="border-bottom:1px solid">推荐低价商品</span></p></td></tr></tbody></table></div>

<p id="t-JlfflVdhuIglXzvAQfbz2V"><span style="font-weight:bold">配图说明</span><span>：参见 </span><span>intent_recognition_flow.svg</span></p>


<a id="section-1193"></a>
## 为什么意图识别这么重要？

<a id="t-47jimCzgC6wBhEglDTxU9T"></a>

<p id="t-LGHppPsSyRTtJpjZ5eQ89M"><span>没有意图识别的AI就像：</span></p>

<ul><li id="t-56qdOUAb6HKtsrmUm5NEzk"><span>🤖 只会死板回答的机器人</span></li></ul>

<ul><li id="t-ccZx9kL85NsbGAgUfwrf12"><span>❌ 听不懂人话的客服</span></li></ul>

<ul><li id="t-4e4mrJwYldD8xeKTNLx8Lt"><span>😵 需要你说精确命令的语音助手</span></li></ul>

<p id="t-5XF3XBljREVUizckqkOAyb"><span>有了意图识别的AI就像：</span></p>

<ul><li id="t-IdH2kZ0nZ0hIt8ZsfsZ6tI"><span>✨ 能读懂你心思的贴心助手</span></li></ul>

<ul><li id="t-pxzpVuOFpIz7QCinbk62kC"><span>💡 聪明的问题解决专家</span></li></ul>

<ul><li id="t-QifZkWsGedy16kwzrNfPJE"><span>🎯 精准响应的智能系统</span></li></ul>


<a id="section-1195"></a>
## 意图识别的三层结构

<a id="t-iEWaSHZ2ZCq7N5IEcEjdWV"></a>

<p id="t-hRsZY0Ypqs3SK6UsJ68adz"><span>意图识别不是一步到位的，而是分为三个层次：</span></p>

<div id="t-4iq6pPKyKSXXfaHHJhOaiD"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/0af801421b415d18b638cb77.png"/></div>

<a id="t-Uil25RIkWfOjUVUrqrAnll"></a>

##### 第一层：文本理解（Text Understanding）

<p id="t-mn8l3ijWUeym3RxtkuLYd2"><span>把用户说的话变成机器能理解的形式。</span></p>

<p id="t-JKbp6mBq8Ex8XyJj1acGlx"><span style="font-weight:bold">例子</span><span>：</span></p>

<pre id="t-ShIvvVM1q6YkLKThrKJ2HA"><code>用户输入："我想买一台笔记本电脑，预算5000左右"
↓ 文本理解
结构化数据：
{
  "动作": "购买",
  "商品类别": "笔记本电脑",
  "预算": 5000,
  "单位": "元"
}</code></pre>

<a id="t-DdDGSkQMKXWsT1KIWgh7gC"></a>

##### 第二层：意图分类（Intent Classification）

<p id="t-uieh4OHGkPGZRzSJp88BGl"><span>判断用户想做什么事情。</span></p>

<p id="t-aTj0qNAl69B0BBDpe2NPoo"><span style="font-weight:bold">例子</span><span>：</span></p>

<pre id="t-0sxlbldveHkihiaMn11D4I"><code>输入："这款手机有货吗？"
→ 意图分类 → 库存查询

输入："帮我退货"
→ 意图分类 → 退款申请

输入："客服在吗？"
→ 意图分类 → 人工服务</code></pre>

<a id="t-6TRhrXMGeGvk2yw6eIyQgS"></a>

##### 第三层：槽位填充（Slot Filling）

<p id="t-fEJNM6yQrioTPI3W44Pvgb"><span>提取关键信息，填补意图执行所需的参数。</span></p>

<p id="t-OOsfpDGufivhR3RjA0TaYv"><span style="font-weight:bold">例子</span><span>：</span></p>

<pre id="t-jCq8X5g1a1da5Q2A3twk96"><code>意图：预订酒店
必需槽位：
  - 城市：？
  - 入住日期：？
  - 退房日期：？
  - 房间数量：？

用户说："下周去上海住两晚"
提取结果：
  - 城市：上海 ✓
  - 入住日期：下周一 ✓
  - 退房日期：下周三 ✓
  - 房间数量：未知 ✗ → 需要追问</code></pre>


<a id="section-1196"></a>
## 意图识别的工作流程

<a id="t-3k4PR7BPMep4L05ZC2VjyS"></a>

<p id="t-KeS9EYzurX4Ql08Kb1gp5R"><span style="font-weight:bold">配图说明</span><span>：参见 </span><span>workflow.svg</span></p>

<p id="t-nUTtO6cKH6pi4wJ6PLG4TV"><span>完整流程如下：</span></p>

<pre id="t-TYSGfNxn1zzWWkxHhtLG3o"><code>1. 用户输入 → 2. 文本预处理 → 3. 特征提取 → 4. 意图分类
                                                ↓
7. 执行动作 ← 6. 槽位验证 ← 5. 槽位填充 ← [意图+槽位]</code></pre>

<p id="t-va67TyzTp2yAPf3GorqpAt"><span style="font-weight:bold">具体步骤解释</span><span>：</span></p>

<ol start="1"><li id="t-gPvLCamPz5exf9MPuxOwj7"><span style="font-weight:bold">用户输入</span><span>：接收原始文本</span></li></ol>

<ol start="2"><li id="t-UdjU5LMUDeSQa9RZ59tuLb"><span style="font-weight:bold">文本预处理</span><span>：去除标点、统一大小写、分词</span></li></ol>

<ol start="3"><li id="t-j8sv8FbAku4IQVE5S1ZT3f"><span style="font-weight:bold">特征提取</span><span>：将文本转为向量（数字表示）</span></li></ol>

<ol start="4"><li id="t-5I8KBeJhVKLTYyHU7LDhVx"><span style="font-weight:bold">意图分类</span><span>：用模型预测意图类别</span></li></ol>

<ol start="5"><li id="t-vGQ1hf0E6G4YKuohIdL8PY"><span style="font-weight:bold">槽位填充</span><span>：提取关键信息</span></li></ol>

<ol start="6"><li id="t-YbSGb3XfevsEmbb2BDB1JD"><span style="font-weight:bold">槽位验证</span><span>：检查必需信息是否完整</span></li></ol>

<ol start="7"><li id="t-b8ROLR34qFO2crvCqvJ7NT"><span style="font-weight:bold">执行动作</span><span>：调用对应的功能模块</span></li></ol>


<a id="section-1198"></a>
## 技术一：基于规则的意图识别（规则匹配）

<a id="t-r3ClgRAz0Pt48NxJPNDrq1"></a>

<a id="t-raiGwcbH6n8G3JkGlxZX1j"></a>

##### 原理

<p id="t-3RMVQ9Qbqf3qFMH3aW5yoa"><span>用预定义的关键词和模式来匹配用户意图。</span></p>

<a id="t-mswdsTResYDNb2FBtKyF9M"></a>

##### 优点

<ul><li id="t-xiiBNdR81AivyOd7WxkjEq"><span>✅ 简单易懂</span></li></ul>

<ul><li id="t-wBRht8sYVOztEiQQcZd43p"><span>✅ 可控性强</span></li></ul>

<ul><li id="t-VQCMsuybEEaT9RVshA6N3r"><span>✅ 适合固定场景</span></li></ul>

<a id="t-bk6qHtgI2DMAHdZleDgoD3"></a>

##### 缺点

<ul><li id="t-TIj4OZh04SJD7TbrmH84VI"><span>❌ 覆盖面窄</span></li></ul>

<ul><li id="t-Hrc16EkCHvDX3HgIg29Xu5"><span>❌ 难以处理复杂语句</span></li></ul>

<ul><li id="t-znysk71xS78Csu7yEbmNTH"><span>❌ 维护成本高</span></li></ul>

<a id="t-5lLA5t8PHVoZZdVBLqhmqi"></a>

##### 代码示例

<pre id="t-llPO5tGntZSnpvrtv2Casl"><code>class RuleBasedIntentRecognizer:
 def __init__(self):
 # 定义意图规则字典
        self.intent_rules = {
 "查询天气": ["天气", "温度", "下雨", "晴天", "气温"],
 "订票": ["订票", "买票", "机票", "车票", "预订"],
 "查询订单": ["订单", "物流", "快递", "到哪了", "发货"],
 "退款": ["退款", "退货", "不想要", "退钱"],
 "人工客服": ["人工", "客服", "转人工", "找客服"]
 }

 def recognize(self, text):
 """识别意图"""
        text = text.lower() # 转小写

 # 遍历所有意图规则
 for intent, keywords in self.intent_rules.items():
 # 检查是否包含关键词
 for keyword in keywords:
 if keyword in text:
 return {
 "intent": intent,
 "confidence": 0.9, # 规则匹配给固定置信度
 "matched_keyword": keyword
 }

 # 没有匹配到任何规则
 return {
 "intent": "未知意图",
 "confidence": 0.0,
 "matched_keyword": None
 }

# 使用示例
recognizer = RuleBasedIntentRecognizer()

# 测试
test_cases = [
 "今天天气怎么样？",
 "帮我订张机票",
 "我的快递到哪了？",
 "想退货",
 "转人工客服"
]

for text in test_cases:
    result = recognizer.recognize(text)
 print(f"输入: {text}")
 print(f"意图: {result['intent']}, 置信度: {result['confidence']}")
 print()</code></pre>

<p id="t-pEftPzhnYTK29dhJZY7qRs"><span style="font-weight:bold">运行结果</span><span>：</span></p>

<pre id="t-JykEFVUe8BPtQiLNRojcT1"><code>输入: 今天天气怎么样？
意图: 查询天气, 置信度: 0.9

输入: 帮我订张机票
意图: 订票, 置信度: 0.9

输入: 我的快递到哪了？
意图: 查询订单, 置信度: 0.9

输入: 想退货
意图: 退款, 置信度: 0.9

输入: 转人工客服
意图: 人工客服, 置信度: 0.9</code></pre>


<a id="section-1199"></a>
## 技术二：基于机器学习的意图识别

<a id="t-1og3VD94Gpb7wpce2umc2y"></a>

<a id="t-Ri1UrAyfjpR95DgVWSntbX"></a>

##### 原理

<p id="t-PgpiLkhVmHfoxkgNbYTOha"><span>用大量标注数据训练分类模型，让AI自动学习意图识别规律。</span></p>

<div id="t-FEQtGB2XscC4otnqVbQzZY"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/0e4cb4629856370b85106193.png"/></div>

<a id="t-W13bduFvLGTcuikpzAVxMO"></a>

##### 核心步骤

<ol start="1"><li id="t-ekjrWh35N8SJQiRrTIlzni"><span style="font-weight:bold">数据准备</span></li></ol>

<pre id="t-NntGvKWzfbsQPWnB9CkUl5"><code># 训练数据示例
training_data = [
    ("今天天气怎么样", "查询天气"),
    ("北京现在多少度", "查询天气"),
    ("会下雨吗", "查询天气"),
    ("帮我订一张机票", "订票"),
    ("买票去上海", "订票"),
    ("预订高铁票", "订票"),
    ("我的订单到哪了", "查询订单"),
    ("快递什么时候到", "查询订单"),
]</code></pre>

<ol start="2"><li id="t-NdhJTP0zFU35Wtf1mgoVvb"><span style="font-weight:bold">特征工程</span></li></ol>

<p id="t-MELca6siesOuKjbCsYbXuo"><span>将文本转为向量：</span></p>

<pre id="t-mKaExLM5eRRtVMTZHpYReL"><code>from sklearn.feature_extraction.text import TfidfVectorizer

# TF-IDF向量化
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform([text for text, _ in training_data])

# 文本 "今天天气怎么样" 会变成向量：
# [0.0, 0.5, 0.3, 0.0, 0.7, ...]
#  ↑    ↑    ↑    ↑    ↑
# 词1  词2  词3  词4  词5</code></pre>

<ol start="3"><li id="t-2Fs1CeZS2ySPzllfRkBVgu"><span style="font-weight:bold">模型训练</span></li></ol>

<pre id="t-zvXAFu7nEOTJ4dF23SdSgC"><code>from sklearn.naive_bayes import MultinomialNB

# 朴素贝叶斯分类器
classifier = MultinomialNB()
classifier.fit(X, labels)</code></pre>

<a id="t-6rHStdvzdQ74TtnKJfjqi0"></a>

##### 完整代码实现

<pre id="t-RzDBrFc2KXnMxRuHN0VEpQ"><code>import jieba
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.model_selection import train_test_split
import numpy as np

class MLIntentRecognizer:
 def __init__(self):
        self.vectorizer = TfidfVectorizer(
            tokenizer=lambda x: jieba.lcut(x), # 中文分词
            max_features=1000
 )
        self.classifier = MultinomialNB()
        self.is_trained = False

 def train(self, texts, labels):
 """训练模型"""
 # 特征提取
        X = self.vectorizer.fit_transform(texts)

 # 训练分类器
        self.classifier.fit(X, labels)
        self.is_trained = True

 print("✅ 模型训练完成！")

 def predict(self, text):
 """预测意图"""
 if not self.is_trained:
 return {"error": "模型未训练"}

 # 特征提取
        X = self.vectorizer.transform([text])

 # 预测意图
        intent = self.classifier.predict(X)[0]

 # 获取置信度
        probas = self.classifier.predict_proba(X)[0]
        confidence = float(np.max(probas))

 return {
 "intent": intent,
 "confidence": confidence
 }

# 准备训练数据
texts = [
 "今天天气怎么样", "北京现在多少度", "会下雨吗", "明天晴天吗",
 "帮我订一张机票", "买票去上海", "预订高铁票", "购买火车票",
 "我的订单到哪了", "快递什么时候到", "查询物流", "包裹在哪",
 "我要退款", "申请退货", "不想要了", "退钱",
 "转人工客服", "找客服", "人工服务", "联系客服"
]

labels = [
 "查询天气", "查询天气", "查询天气", "查询天气",
 "订票", "订票", "订票", "订票",
 "查询订单", "查询订单", "查询订单", "查询订单",
 "退款", "退款", "退款", "退款",
 "人工客服", "人工客服", "人工客服", "人工客服"
]

# 训练模型
recognizer = MLIntentRecognizer()
recognizer.train(texts, labels)

# 测试
test_cases = [
 "今天会不会下雨",
 "我想买张去广州的票",
 "订单什么时候能到",
 "能退货吗",
 "我要找人工"
]

print("\n📊 测试结果：\n")
for text in test_cases:
    result = recognizer.predict(text)
 print(f"输入: {text}")
 print(f"意图: {result['intent']}, 置信度: {result['confidence']:.2f}")
 print()</code></pre>


<a id="section-1200"></a>
## 技术三：基于深度学习的意图识别（BERT）

<a id="t-4wirb4eibo2kE9qG8lFsMU"></a>

<a id="t-1te6H4nmESYY26l8rXuBqo"></a>

##### 原理

<p id="t-1sIkLVvOFI1UFo1cQscxw2"><span>使用预训练语言模型（如BERT），理解上下文语义。</span></p>

<div id="t-1el3AmY7Yt9BHAZECPupo9"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/cbb3c8e089a28429596f0fa2.png"/></div>

<a id="t-cY1gUTMKkfCScJ0iYbNz4F"></a>

##### BERT的优势

<ul><li id="t-hQKK0tHG0ZczxFBUi5oGTY"><span>✅ 理解上下文</span></li></ul>

<ul><li id="t-vwjL8zx5lANRkE7F99KiM1"><span>✅ 处理复杂语句</span></li></ul>

<ul><li id="t-nyJAx4NTh39xX8ywWkm8md"><span>✅ 泛化能力强</span></li></ul>

<ul><li id="t-an4Oj6RDfg8XN46xpHOr3N"><span>✅ 准确率高</span></li></ul>

<a id="t-KYAA02pIx68dhTyJIZMFFG"></a>

##### 代码实现

<pre id="t-1ATWCG4eJMC3XVqKsMvDlZ"><code>from transformers import BertTokenizer, BertForSequenceClassification
import torch
import torch.nn.functional as F

class BERTIntentRecognizer:
 def __init__(self, model_name='bert-base-chinese'):
 """初始化BERT模型"""
        self.tokenizer = BertTokenizer.from_pretrained(model_name)
        self.model = None
        self.intent_labels = []

 def prepare_data(self, texts, labels):
 """准备训练数据"""
 # 获取唯一的标签
        self.intent_labels = list(set(labels))

 # 将标签转为数字
        label_to_id = {label: i for i, label in enumerate(self.intent_labels)}
        numeric_labels = [label_to_id[label] for label in labels]

 # 分词和编码
        encodings = self.tokenizer(
            texts,
            padding=True,
            truncation=True,
            max_length=128,
            return_tensors='pt'
 )

 return encodings, torch.tensor(numeric_labels)

 def train(self, texts, labels, epochs=3):
 """训练BERT模型"""
 print("🚀 开始训练BERT模型...")

 # 准备数据
        encodings, numeric_labels = self.prepare_data(texts, labels)

 # 初始化模型
        num_labels = len(self.intent_labels)
        self.model = BertForSequenceClassification.from_pretrained(
 'bert-base-chinese',
            num_labels=num_labels
 )

 # 优化器
        optimizer = torch.optim.AdamW(self.model.parameters(), lr=2e-5)

 # 训练循环
        self.model.train()
 for epoch in range(epochs):
            optimizer.zero_grad()

            outputs = self.model(
                input_ids=encodings['input_ids'],
                attention_mask=encodings['attention_mask'],
                labels=numeric_labels
 )

            loss = outputs.loss
            loss.backward()
            optimizer.step()

 print(f"Epoch {epoch+1}/{epochs}, Loss: {loss.item():.4f}")

 print("✅ BERT模型训练完成！")

 def predict(self, text):
 """预测意图"""
 if self.model is None:
 return {"error": "模型未训练"}

 # 编码输入
        encoding = self.tokenizer(
            text,
            padding=True,
            truncation=True,
            max_length=128,
            return_tensors='pt'
 )

 # 预测
        self.model.eval()
 with torch.no_grad():
            outputs = self.model(
                input_ids=encoding['input_ids'],
                attention_mask=encoding['attention_mask']
 )

 # 获取概率分布
        probas = F.softmax(outputs.logits, dim=1)
        confidence, pred_idx = torch.max(probas, dim=1)

        intent = self.intent_labels[pred_idx.item()]

 return {
 "intent": intent,
 "confidence": float(confidence.item()),
 "all_probabilities": {
                self.intent_labels[i]: float(probas[0][i])
 for i in range(len(self.intent_labels))
 }
 }

# 使用示例
# 注意：需要先安装 transformers: pip install transformers torch</code></pre>


<a id="section-1202"></a>
## 系统架构设计

<a id="t-bADV14rGjhqjACBWbRfx1N"></a>

<div id="t-GpiU5moWakIxmycOCX0HrG"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/a074bec6f1d2303041b019a9.png"/></div>

<p id="t-kiNeNEghrhT2oXw3W2r614"><span>我们将构建一个完整的意图识别系统，包含：</span></p>

<ol start="1"><li id="t-5rMcnKlwAqchpTJbb397Rc"><span>文本预处理模块</span></li></ol>

<ol start="2"><li id="t-Dd8lTtLKP3b0yRWwGieAA7"><span>意图识别引擎</span></li></ol>

<ol start="3"><li id="t-j9WgTmIbCy4ioYQOLSz8K6"><span>槽位提取模块</span></li></ol>

<ol start="4"><li id="t-kADsYUeEzutYZ8zST1kd9a"><span>对话管理器</span></li></ol>


<a id="section-1203"></a>
## 第一步：文本预处理

<a id="t-53lZuTtj7bvd5UE7UxzKfS"></a>

<pre id="t-Yau42MP1SpCKG2IMoq21Fg"><code>import re
import jieba

class TextPreprocessor:
 """文本预处理器"""

 def __init__(self):
 # 加载停用词
        self.stopwords = set(['的', '了', '在', '是', '我', '有', '和', '就',
 '不', '人', '都', '一', '一个', '上', '也', '很'])

 def clean_text(self, text):
 """清洗文本"""
 # 1. 去除特殊字符
        text = re.sub(r'[^\w\s]', '', text)

 # 2. 去除多余空格
        text = ' '.join(text.split())

 # 3. 转小写（对英文）
        text = text.lower()

 return text

 def tokenize(self, text):
 """分词"""
 return jieba.lcut(text)

 def remove_stopwords(self, tokens):
 """去除停用词"""
 return [token for token in tokens if token not in self.stopwords]

 def preprocess(self, text):
 """完整预处理流程"""
 # 清洗
        text = self.clean_text(text)

 # 分词
        tokens = self.tokenize(text)

 # 去停用词
        tokens = self.remove_stopwords(tokens)

 return {
 "original": text,
 "tokens": tokens,
 "processed": ' '.join(tokens)
 }

# 测试
preprocessor = TextPreprocessor()
result = preprocessor.preprocess("今天的天气怎么样啊？？")
print(result)
# 输出: {'original': '今天天气怎么样啊', 'tokens': ['今天', '天气', '怎么样', '啊'], ...}</code></pre>


<a id="section-1204"></a>
## 第二步：槽位提取

<a id="t-sjLSzfxjMsvXyiuwBqKkzu"></a>

<pre id="t-jYqo9M62XtmmK95xHN2prf"><code>import re
from datetime import datetime, timedelta

class SlotExtractor:
 """槽位提取器"""

 def __init__(self):
 # 定义槽位模式
        self.patterns = {
 "城市": r'(北京|上海|广州|深圳|杭州|成都|武汉|西安)',
 "日期": r'(今天|明天|后天|下周|周\w)',
 "数量": r'(\d+)\s*(个|张|份|次)',
 "价格": r'(\d+)\s*(元|块|rmb)',
 }

 def extract_slots(self, text, intent):
 """根据意图提取槽位"""
        slots = {}

 # 根据不同意图提取不同槽位
 if intent == "查询天气":
            slots = self._extract_weather_slots(text)
 elif intent == "订票":
            slots = self._extract_booking_slots(text)
 elif intent == "查询订单":
            slots = self._extract_order_slots(text)

 return slots

 def _extract_weather_slots(self, text):
 """提取天气查询槽位"""
        slots = {}

 # 提取城市
        city_match = re.search(self.patterns["城市"], text)
 if city_match:
            slots["city"] = city_match.group(1)

 # 提取日期
        date_match = re.search(self.patterns["日期"], text)
 if date_match:
            slots["date"] = self._parse_date(date_match.group(1))
 else:
            slots["date"] = "今天"

 return slots

 def _extract_booking_slots(self, text):
 """提取订票槽位"""
        slots = {}

 # 提取出发地和目的地
        cities = re.findall(self.patterns["城市"], text)
 if len(cities) &gt;= 2:
            slots["from"] = cities[0]
            slots["to"] = cities[1]
 elif len(cities) == 1:
            slots["to"] = cities[0]

 # 提取日期
        date_match = re.search(self.patterns["日期"], text)
 if date_match:
            slots["date"] = self._parse_date(date_match.group(1))

 # 提取数量
        qty_match = re.search(self.patterns["数量"], text)
 if qty_match:
            slots["quantity"] = int(qty_match.group(1))

 return slots

 def _extract_order_slots(self, text):
 """提取订单查询槽位"""
        slots = {}

 # 提取订单号（示例）
        order_pattern = r'([A-Z0-9]{10,})'
        order_match = re.search(order_pattern, text)
 if order_match:
            slots["order_id"] = order_match.group(1)

 return slots

 def _parse_date(self, date_str):
 """解析日期字符串"""
        today = datetime.now()

 if date_str == "今天":
 return today.strftime("%Y-%m-%d")
 elif date_str == "明天":
 return (today + timedelta(days=1)).strftime("%Y-%m-%d")
 elif date_str == "后天":
 return (today + timedelta(days=2)).strftime("%Y-%m-%d")
 else:
 return date_str

# 测试
extractor = SlotExtractor()

# 测试天气查询
slots = extractor.extract_slots("明天北京天气怎么样", "查询天气")
print("天气槽位:", slots)
# 输出: {'city': '北京', 'date': '2024-xx-xx'}

# 测试订票
slots = extractor.extract_slots("订2张从上海到北京的票", "订票")
print("订票槽位:", slots)
# 输出: {'from': '上海', 'to': '北京', 'quantity': 2}</code></pre>


<a id="section-1205"></a>
## 第三步：完整意图识别引擎

<a id="t-ya2nqUWlCUeyXEI1mmkTnu"></a>

<pre id="t-XtgDcZMi5zUB50YA8fwDng"><code>class IntentRecognitionEngine:
 """完整的意图识别引擎"""

 def __init__(self):
        self.preprocessor = TextPreprocessor()
        self.intent_recognizer = MLIntentRecognizer() # 可替换为BERT
        self.slot_extractor = SlotExtractor()

 # 意图置信度阈值
        self.confidence_threshold = 0.6

 def process(self, text):
 """处理用户输入"""
 # 1. 文本预处理
        preprocessed = self.preprocessor.preprocess(text)

 # 2. 意图识别
        intent_result = self.intent_recognizer.predict(text)

 # 3. 检查置信度
 if intent_result['confidence'] &lt; self.confidence_threshold:
 return {
 "status": "uncertain",
 "message": "抱歉，我没太理解您的意思，能换个说法吗？",
 "confidence": intent_result['confidence']
 }

 # 4. 槽位提取
        slots = self.slot_extractor.extract_slots(
            text,
            intent_result['intent']
 )

 # 5. 验证必需槽位
        missing_slots = self._check_required_slots(
            intent_result['intent'],
            slots
 )

 if missing_slots:
 return {
 "status": "incomplete",
 "intent": intent_result['intent'],
 "slots": slots,
 "missing_slots": missing_slots,
 "message": self._generate_slot_question(missing_slots[0])
 }

 # 6. 返回完整结果
 return {
 "status": "complete",
 "intent": intent_result['intent'],
 "confidence": intent_result['confidence'],
 "slots": slots,
 "preprocessed": preprocessed
 }

 def _check_required_slots(self, intent, slots):
 """检查必需槽位"""
        required_slots = {
 "查询天气": ["city"],
 "订票": ["to", "date"],
 "查询订单": [],
 }

        required = required_slots.get(intent, [])
        missing = [slot for slot in required if slot not in slots]

 return missing

 def _generate_slot_question(self, slot_name):
 """生成槽位询问语句"""
        questions = {
 "city": "请问您想查询哪个城市的天气？",
 "to": "请问您想去哪个城市？",
 "from": "请问您从哪里出发？",
 "date": "请问您打算什么时候出发？",
 "quantity": "请问您需要几张票？"
 }

 return questions.get(slot_name, f"请提供{slot_name}信息")

# 完整测试
engine = IntentRecognitionEngine()

# 先训练模型
texts = [
 "今天天气怎么样", "北京现在多少度",
 "帮我订票", "买张机票",
 "订单在哪", "快递到了吗"
]
labels = ["查询天气", "查询天气", "订票", "订票", "查询订单", "查询订单"]
engine.intent_recognizer.train(texts, labels)

# 测试完整流程
test_inputs = [
 "明天北京天气怎么样",
 "我想订票去上海",
 "查询我的订单"
]

print("\n🎯 完整意图识别测试：\n")
for text in test_inputs:
    result = engine.process(text)
 print(f"输入: {text}")
 print(f"结果: {result}")
 print("-" * 50)</code></pre>


<a id="section-1207"></a>
## 项目需求

<a id="t-RVN9XaKYEHdBx6OslR4ua0"></a>

<p id="t-Y1fq8HlUCNWez0DMGIJ55v"><span>构建一个智能客服机器人，能够：</span></p>

<ul><li id="t-5uCnqNWpnGBMbsJk5kO2rn"><span>✅ 查询天气</span></li></ul>

<ul><li id="t-zAYbfPj2mPolRpEQrL9S7p"><span>✅ 预订机票</span></li></ul>

<ul><li id="t-ydgo08FMHST4heBh9zOs7P"><span>✅ 查询订单</span></li></ul>

<ul><li id="t-oLR4px7l92xBN3zfGd7Gy0"><span>✅ 处理退款</span></li></ul>

<ul><li id="t-uhLetZAjVlcRhzlfUnX4xw"><span>✅ 转人工客服</span></li></ul>

<ul><li id="t-iLarv9j0d8JFCaT6nWRYpR"><span>✅ 多轮对话记忆</span></li></ul>

<div id="t-okXkJqaqpopwIqyPhW4bR2"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/a1719d42247d4a1b4c6917f7.png"/></div>


<a id="section-1208"></a>
## 完整代码实现

<a id="t-uAduPwcKSp679EKIzmavWM"></a>

<pre id="t-bkAlZnA34D64klx14ovOlX"><code>import json
from datetime import datetime

class SmartCustomerServiceBot:
 """智能客服机器人"""

 def __init__(self):
 # 初始化各个模块
        self.engine = IntentRecognitionEngine()

 # 对话历史
        self.conversation_history = []

 # 当前对话状态
        self.current_intent = None
        self.current_slots = {}

 # 模拟数据库
        self.mock_database = {
 "weather": {
 "北京": {"temp": 15, "condition": "晴天"},
 "上海": {"temp": 20, "condition": "多云"},
 },
 "orders": {
 "ORD123456": {
 "status": "运输中",
 "location": "北京分拨中心",
 "expected": "2024-11-25"
 }
 }
 }

 print("🤖 智能客服机器人已启动！")
 print("=" * 60)

 def train(self):
 """训练意图识别模型"""
 print("📚 正在训练意图识别模型...")

 # 训练数据
        texts = [
 "今天天气怎么样", "北京现在多少度", "会下雨吗", "明天晴天吗",
 "帮我订票", "买张去上海的票", "预订机票", "购买火车票",
 "我的订单在哪", "快递到了吗", "查询物流", "包裹什么时候到",
 "我要退款", "申请退货", "不想要了", "能退吗",
 "转人工", "找客服", "人工服务", "联系客服",
 "你好", "在吗", "嗨", "hello"
 ]

        labels = [
 "查询天气", "查询天气", "查询天气", "查询天气",
 "订票", "订票", "订票", "订票",
 "查询订单", "查询订单", "查询订单", "查询订单",
 "退款", "退款", "退款", "退款",
 "人工客服", "人工客服", "人工客服", "人工客服",
 "问候", "问候", "问候", "问候"
 ]

        self.engine.intent_recognizer.train(texts, labels)
 print("✅ 模型训练完成！\n")

 def chat(self, user_input):
 """处理用户消息"""
 # 记录对话
        self.conversation_history.append({
 "role": "user",
 "content": user_input,
 "timestamp": datetime.now().isoformat()
 })

 # 意图识别
        result = self.engine.process(user_input)

 # 根据状态生成响应
        response = self._generate_response(result)

 # 记录机器人响应
        self.conversation_history.append({
 "role": "bot",
 "content": response,
 "timestamp": datetime.now().isoformat()
 })

 return response

 def _generate_response(self, result):
 """生成响应"""
        status = result.get("status")

 # 情况1: 不确定意图
 if status == "uncertain":
 return result["message"]

 # 情况2: 槽位不完整
 if status == "incomplete":
            self.current_intent = result["intent"]
            self.current_slots.update(result["slots"])
 return result["message"]

 # 情况3: 意图和槽位都完整
        intent = result["intent"]
        slots = result["slots"]

 # 执行相应动作
 if intent == "问候":
 return self._handle_greeting()
 elif intent == "查询天气":
 return self._handle_weather_query(slots)
 elif intent == "订票":
 return self._handle_booking(slots)
 elif intent == "查询订单":
 return self._handle_order_query(slots)
 elif intent == "退款":
 return self._handle_refund(slots)
 elif intent == "人工客服":
 return self._handle_human_service()
 else:
 return "抱歉，我还在学习中，这个问题我暂时回答不了。"

 def _handle_greeting(self):
 """处理问候"""
 return "您好！我是智能客服小助手，很高兴为您服务！😊\n\n我可以帮您：\n1. 查询天气\n2. 预订机票\n3. 查询订单\n4. 处理退款\n5. 转接人工客服\n\n请问有什么可以帮您？"

 def _handle_weather_query(self, slots):
 """处理天气查询"""
        city = slots.get("city", "北京")
        date = slots.get("date", "今天")

 # 模拟查询天气API
        weather_data = self.mock_database["weather"].get(city)

 if weather_data:
 return f"📍 {city} {date}的天气：\n" \
 f"🌡️ 温度：{weather_data['temp']}°C\n" \
 f"☀️ 天气：{weather_data['condition']}\n\n" \
 f"还有其他需要帮助的吗？"
 else:
 return f"抱歉，暂时没有{city}的天气信息。您可以换个城市试试。"

 def _handle_booking(self, slots):
 """处理订票"""
        to_city = slots.get("to", "未知")
        from_city = slots.get("from", "当前位置")
        date = slots.get("date", "近期")
        quantity = slots.get("quantity", 1)

 # 模拟订票流程
        order_id = f"ORD{datetime.now().strftime('%Y%m%d%H%M%S')}"

 return f"✈️ 订票信息确认：\n" \
 f"出发地：{from_city}\n" \
 f"目的地：{to_city}\n" \
 f"出发日期：{date}\n" \
 f"票数：{quantity}张\n\n" \
 f"订单已生成！\n" \
 f"📋 订单号：{order_id}\n\n" \
 f"请在30分钟内完成支付。还有其他需要吗？"

 def _handle_order_query(self, slots):
 """处理订单查询"""
        order_id = slots.get("order_id")

 if order_id and order_id in self.mock_database["orders"]:
            order = self.mock_database["orders"][order_id]
 return f"📦 订单查询结果：\n" \
 f"订单号：{order_id}\n" \
 f"状态：{order['status']}\n" \
 f"当前位置：{order['location']}\n" \
 f"预计送达：{order['expected']}\n\n" \
 f"还有其他需要帮助的吗？"
 else:
 return "请提供您的订单号，格式如：ORD123456"

 def _handle_refund(self, slots):
 """处理退款"""
 return "💰 退款流程说明：\n" \
 "1. 请提供订单号\n" \
 "2. 说明退款原因\n" \
 "3. 上传商品照片（如适用）\n" \
 "4. 等待审核（1-3个工作日）\n" \
 "5. 退款将原路返回\n\n" \
 "需要我帮您转接人工客服处理吗？"

 def _handle_human_service(self):
 """处理人工客服请求"""
 return "正在为您转接人工客服...\n" \
 "👨💼 当前排队人数：3人\n" \
 "⏱️ 预计等待时间：2分钟\n\n" \
 "在等待期间，您可以继续向我咨询其他问题。"

 def get_conversation_history(self):
 """获取对话历史"""
 return self.conversation_history

 def save_conversation(self, filename="conversation_log.json"):
 """保存对话记录"""
 with open(filename, 'w', encoding='utf-8') as f:
            json.dump(self.conversation_history, f,
                     ensure_ascii=False, indent=2)
 print(f"📝 对话记录已保存到 {filename}")

# ========== 使用示例 ==========

def main():
 # 创建机器人
    bot = SmartCustomerServiceBot()

 # 训练模型
    bot.train()

 # 模拟对话
 print("💬 开始对话（输入 'quit' 退出）\n")
 print("=" * 60)

 while True:
        user_input = input("\n👤 您: ")

 if user_input.lower() in ['quit', 'exit', '退出']:
 print("\n👋 感谢使用！再见！")
            bot.save_conversation()
 break

 if not user_input.strip():
 continue

 # 获取机器人响应
        response = bot.chat(user_input)
 print(f"\n🤖 客服: {response}")

if __name__ == "__main__":
    main()</code></pre>


<a id="section-1209"></a>
## 运行效果示例

<a id="t-TsH66XockqxFNWa9ODMe0m"></a>

<pre id="t-Tgk3vPGu1hOBnzBKZrm2V8"><code>🤖 智能客服机器人已启动！
============================================================
📚 正在训练意图识别模型...
✅ 模型训练完成！

💬 开始对话（输入 'quit' 退出）

============================================================

👤 您: 你好

🤖 客服: 您好！我是智能客服小助手,很高兴为您服务！😊

我可以帮您：
1. 查询天气
2. 预订机票
3. 查询订单
4. 处理退款
5. 转接人工客服

请问有什么可以帮您？

👤 您: 明天北京天气怎么样

🤖 客服: 📍 北京 2024-11-23的天气：
🌡️ 温度：15°C
☀️ 天气：晴天

还有其他需要帮助的吗？

👤 您: 帮我订2张去上海的票

🤖 客服: ✈️ 订票信息确认：
出发地：当前位置
目的地：上海
出发日期：近期
票数：2张

订单已生成！
📋 订单号：ORD20241122153045

请在30分钟内完成支付。还有其他需要吗？

👤 您: 查询订单ORD123456

🤖 客服: 📦 订单查询结果：
订单号：ORD123456
状态：运输中
当前位置：北京分拨中心
预计送达：2024-11-25

还有其他需要帮助的吗？</code></pre>


<a id="section-1211"></a>
## 处理多意图场景

<a id="t-T9LWhhi8frYeIaiEtWVVDf"></a>

<p id="t-5eS0awmYPhIlzOOgr5YrfS"><span>有时用户一句话包含多个意图：</span></p>

<p id="t-NJJ7mFbNBI3D5i09lDTkE4"><span style="font-weight:bold">例子</span><span>：</span></p>

<ul><li id="t-crrPQO1VpzFbDfKUC5DFfl"><span>"帮我查一下明天北京的天气，然后订张去上海的票"</span></li></ul>

<ul><li id="t-h8sOFZBIvfLc8hIYGc8LLD"><span>意图1：查询天气（北京，明天）</span></li></ul>

<ul><li id="t-HbLeDafPyCxFO4zSvMibMY"><span>意图2：订票（去上海）</span></li></ul>

<div id="t-18mFCuC2giGqTf61CtvBJJ"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/9f6ad5fce63f8c4fc6c29c67.png"/></div>


<a id="section-1215"></a>
## 常见问题汇总

<a id="t-3Sed3KGcemDvRl5BPIkq6H"></a>

<a id="t-JmVycPjwP7G45WfnTROaNY"></a>

##### 问题1：识别准确率低

<p id="t-pqnn0SosejgRw8ZKnPcyUM"><span style="font-weight:bold">原因</span><span>：</span></p>

<ul><li id="t-P4XW1vuja19RonrpaWtnfV"><span>训练数据不足</span></li></ul>

<ul><li id="t-44QMu7Sb8oE7u4Zh2xhHBr"><span>意图分类过于模糊</span></li></ul>

<ul><li id="t-vJOUoD9M3TZ5tb9p89w1hC"><span>缺少上下文信息</span></li></ul>

<p id="t-Yrxs0sjafiozjwDisZ2cCg"><span style="font-weight:bold">解决方案</span><span>：</span></p>

<a id="t-e6peIb6oPnhIfwsuXi89bA"></a>

##### 问题2：多轮对话记忆丢失

<p id="t-piBJ0thyAAyJY0wD926dnI"><span style="font-weight:bold">解决方案</span><span>：</span></p>

