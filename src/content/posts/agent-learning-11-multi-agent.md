---
title: "第 11 章 · 多 Agent 系统"
date: "2026-10-22"
draft: false
author: "学习资料整理"
description: "架构、职责、通信、共享状态、协作与冲突控制"
tags: ["Agent", "学习路线"]
categories: ["AI 工程"]
prerequisites: ["agent-learning-10-retrieval-advanced-rag"]
verification: {"status": "not-run", "scope": "本次仅整理资料；示例代码与原文技术结论未复跑。"}
---

架构、职责、通信、共享状态、协作与冲突控制

[学习路线](/posts/agent-learning-route/) · [上一章](/posts/agent-learning-10-retrieval-advanced-rag/) · [下一章](/posts/agent-learning-12-langchain/)

本章按知识小节编排。项目内容作为学习案例阅读，示例代码与原文技术结论未在本次整理中执行验证。

## 本章目录

- [Multi-Agent 架构](#section-0058)
- [典型的Agent架构](#section-0059)
- [Agent架构设计原则](#section-0060)
- [单Agent和多Agent的对比](#section-0061)
- [Agent之间通信和状态管理](#section-0062)
- [Agent架构设计实战](#section-0063)
- [面试问题](#section-0064)
- [多智能体系统（Multi-Agent System）](#section-1466)
- [多 Agent 架构基础](#section-1467)
- [基本架构模式](#section-1468)
- [角色分工与协作](#section-1469)
- [常见角色定义](#section-1470)
- [多 Agent 系统基础实现](#section-1472)
- [AutoGen 框架](#section-1473)
- [核心概念](#section-1474)
- [AutoGen 基本使用](#section-1476)
- [AutoGen 工具调用](#section-1478)
- [A2A 与 MCP 协议](#section-1479)
- [A2A（Agent-to-Agent）协议](#section-1480)
- [MCP（Model Context Protocol）协议](#section-1481)
- [MCP 工具定义](#section-1482)
- [主从 Agent 模式](#section-1483)
- [适用场景](#section-1484)
- [主从 Agent 模式实现](#section-1486)
- [主从模式的优缺点](#section-1487)
- [章节小结](#section-1488)

<a id="section-0058"></a>
## Multi-Agent 架构

<a id="f-doxcntuQVjJ2aMEP4HF4qje1X9b"></a>

<p id="f-doxcnt8XxrbCkC1ezSVCuwLPOtf"><span>（Multi-agent 设计架构应该来说是Agent项目里最常用的设计方法了。面试的时候难免会和面试官讲到。面试时我也不止一次被问到， 多Agent 和 单Agent架构的区别。这里的重点就是弄清楚，多Agent 有哪些架构？各个不同架构的优缺点是什么？我们应该怎么设计架构？如果知道了这些，比如后面实战中，</span><span><span><a href="/posts/agent-learning-24-interview-review/#f-doxcnvVgC8ikiePZWxfGoISnqzd"><span>小红书面试</span></a></span></span><span>时和你讨论架构设计的时候，其实你就可以比较游刃有余了。 其实这些问题都在这个论文中（</span><span><span><a href="https://arxiv.org/pdf/2512.08296v1"><span>https://arxiv.org/pdf/2512.08296v1</span></a></span></span><span> ），这个论文不光回答了这些问题，回答的还很深入，从数学，实验数据的角度来分析的。本节整理了相关问题，和参考资料）</span></p>

<p id="f-doxcnY1KX50PERzcsNzGlB8WTpd"><span style="font-weight:bold">参考资料：</span></p>

<p id="f-doxcn3V1xUKAAvzweLN0w4UlPfc"><span><span style="font-weight:bold"><a href="https://github.com/fzy2012/rhzl-Agentic-Design-Patterns-cn/blob/feature/interactive-website/13-Chapter-07-Multi-Agent-Collaboration.md"><span>https://github.com/fzy2012/rhzl-Agentic-Design-Patterns-cn/blob/feature/interactive-website/13-Chapter-07-Multi-Agent-Collaboration.md</span></a></span></span><span>（这个资料比较浅，对于多Agent架构设计这块显得不够，可以作为多Agent入门参考资料）</span></p>

<p id="f-doxcnRiziTGzkVrerZG93DGFUJh"><span><span><a href="https://arxiv.org/pdf/2512.08296v1"><span>https://arxiv.org/pdf/2512.08296v1</span></a></span></span><span> （这个论文很权威，对于多Agent问题讲得非常深入，包括架构设计，如何选择Agent架构，非常建议阅读，</span><span style="font-weight:bold">说实话你能把整个论文吃透，在Agent架构这里就掌握得差不多了</span><span>，但是直接看原文可能比较费力，可以看一些相关对这个论文的总结文章，比如下面推荐的文章。笔记部分也是根据这个论文内容来整理的。另外大家在讲这个Agent架构/多Agent的时候，也可以自信的告诉面试官，你是看了这个google的最新的论文来得到的知识，或者面试官让你分享最近看的论文的时候，也可以讲一篇，这篇是25年12月google刚发布的，具有时效性和权威性。）</span></p>

<p id="f-doxcnQNgJdj34tTEBTSBNDpiAug"><span>以下是一些针对于这个论文的辅助资料，其实你能消化清楚这个论文</span></p>

<p id="f-doxcnS4P9ZBAMILzt1htbAp2zYc"><span>，可以不用看辅助资料，如果读论文吃力，可以配合一些辅助资料。</span></p>

<p id="f-doxcnaAZPoVzeiCeVVl52AT9CWh"><span><span><a href="https://mp.weixin.qq.com/s/QD9oYVrD7mHKKZu802vovQ"><span>https://mp.weixin.qq.com/s/QD9oYVrD7mHKKZu802vovQ</span></a></span></span><span> （上面这篇论文的辅助资料，论文原文可能太深奥，这个是对上面论文的总结）</span></p>

<p id="f-doxcnnn53XTXgEDKmkIyIdaQ8ce"><span><span><a href="https://zhuanlan.zhihu.com/p/1982756998425632940"><span>https://zhuanlan.zhihu.com/p/1982756998425632940</span></a></span></span><span>（辅助资料）</span></p>

<p id="f-doxcnZ2b5As07Zg1uO0ENMD3otf"><span>）</span></p>


<a id="section-0059"></a>
## 典型的Agent架构

<a id="f-doxcnQzGpsnadFoEAv0bipI0DKe"></a>

<p id="f-doxcn2qQlimfWwmU2PI6VN79nNc"><span>（看着就是几种模式，其实你更要想清楚，这几种模式为什么好/不好，使用什么场景，理解复杂度指标，这个需要一些理解成本的，不要以为这个很简单，请大家结合上面资料理解一下，另外这块确实很重要，也值得我们仔细理解）</span></p>

<p id="f-doxcnKMrJTS6WXNow4RY49HJRje"><span>1) </span><span style="font-weight:bold">SAS（Single-Agent System）单体架构</span></p>

<p id="f-doxcnxPhwLfzxANOY2jzNn9WVVf"><span style="font-weight:bold">交互类型</span><span>：一个 Agent 顺序地感知→推理/规划→行动→迭代。</span></p>

<p id="f-doxcnmSPRE1MPbHFTgaapu8548g"><span style="font-weight:bold">复杂度指标:</span></p>

<ul><li id="f-doxcnPjoVh3MwlRp4d1YJJvB9rd"><span>LLM调用次数:O(T)  (T为推理轮次)</span></li></ul>

<ul><li id="f-doxcnZXSiS3B3E4fDDBuRL96pZc"><span>顺序深度:T</span></li></ul>

<ul><li id="f-doxcnq2PihzJj6qcgVjoJBhVkZg"><span>通信开销:0</span></li></ul>

<ul><li id="f-doxcnjQYeZ0TmipqysgrNJjIQdf"><span>并行化能力:1</span></li></ul>

<p id="f-doxcnUniAEY8xg7hr3zKPCrtAAf"><span style="font-weight:bold">特点</span><span>：</span><span style="font-weight:bold">最简单、最稳</span><span>。当单体基线已经不错（论文里经验阈值≈</span><span style="font-weight:bold">45%</span><span>），再加协调通常</span><span style="font-weight:bold">收益递减或为负</span><span>。顺序型长链推理（一步错步步错）用单体更安全</span></p>

<p id="f-doxcnt0MpQU0JpNzs69NAFBPeze"><span style="font-weight:bold">适用场景</span><span>:工具密集型任务、顺序推理任务、单Agent基线性能已经较高的场景。</span></p>

<p id="f-doxcnyU71c2bRRfQ3MVdfuagSCg"><span>2) </span><span style="font-weight:bold">MAS（Independent）独立多体</span></p>

<p id="f-doxcnVp3ZVZQVVysK4fT4I62vef"><span style="font-weight:bold">交互类型</span><span>：多个 Agent </span><span style="font-weight:bold">独立并行</span><span>做同一任务，最后做</span><span style="font-weight:bold">聚合/投票/综合（Synthesis）</span><span>。</span></p>

<p id="f-doxcnP48GU4vbuMJuob4zZ8J67c"><span style="font-weight:bold">复杂度指标:</span></p>

<ul><li id="f-doxcn4AEBeTu8w8J1KpI16AuvUg"><span>LLM调用次数:O(N·T) + O(1)</span></li></ul>

<ul><li id="f-doxcndHhrEDMEry3TMU2ZGjRxGb"><span>通信开销:1(仅最终聚合)</span></li></ul>

<ul><li id="f-doxcn6O3ubMpvxlHuGQIw1hvzmW"><span>并行化能力:N</span></li></ul>

<p id="f-doxcnOgawGYiF6L1gV9YdMYC3Mf"><span style="font-weight:bold">特点：并行度最高、协调成本最低</span><span>，但缺少互相纠错的机制；论文发现这种拓扑的</span><span style="font-weight:bold">错误放大</span><span>最严重（</span><span style="font-weight:bold">17.2×</span><span>），因为各自错误会在聚合时被“叠加/扩散”。</span></p>

<p id="f-doxcnV6yPthONaysHDKy3j75Dob"><span style="font-weight:bold">适用场景</span><span>：</span><span style="font-weight:bold">独立样本批处理</span><span>（如并行评审、并行方案生成），且</span><span style="font-weight:bold">容错</span><span>要求不高的场景。若任务需要大量工具或严格一致性，谨慎使用。</span></p>

<p id="f-doxcnUxu2mIxGWJCdK2qvDMG0lb"><span>3) </span><span style="font-weight:bold">MAS（Centralized）中心化</span></p>

<p id="f-doxcnNk08KPo6pzVKaVZUZUdfSe"><span style="font-weight:bold">交互类型</span><span>：有一个协调者/主管（Orchestrator）分解任务、分派子任务、收集结果、裁决与收敛。</span></p>

<p id="f-doxcnWSinSqVUqQo2e3r1QdrAMb"><span style="font-weight:bold">复杂度指标:</span></p>

<ul><li id="f-doxcnsUR5hDgoF1IxYQRyx4LYzJ"><span>LLM调用次数:O(R·N)  (R为编排轮次)</span></li></ul>

<ul><li id="f-doxcn0jR8fVVvBGVpbRmGAtChHg"><span>通信开销:R·N</span></li></ul>

<p id="f-doxcnS9zBjyWeDOi0cQmxj4GiPg"><span style="font-weight:bold">特点</span><span>:</span><span style="font-weight:bold">稳健性更好</span><span>，论文显示集中式能把错误放大从 17.2× 控到 </span><span style="font-weight:bold">4.4×</span><span>；在</span><span style="font-weight:bold">可并行的金融推理</span><span>等任务上，集中式提升可达 </span><span style="font-weight:bold">+80.9%</span><span>。核心在于</span><span style="font-weight:bold">有权威收敛与质量门控</span><span>。</span><br/><span style="font-weight:bold">适用场景：</span><span>可拆分且需要</span><span style="font-weight:bold">统一口径与质量控制</span><span>的任务（财务核对、批量报告编制、数据清洗流水线）。注意主管本身可能成为</span><span style="font-weight:bold">瓶颈</span><span>，需把轮数 r 控制在合理范围。</span></p>

<p id="f-doxcn738fLyherNl1cn72bCKcyb"><span>4) </span><span style="font-weight:bold">MAS（Decentralized）去中心化辩论</span></p>

<p id="f-doxcnl2Pt9pxcAoWnJCLg5ka9Be"><span style="font-weight:bold">交互类型</span><span>：Agent 之间</span><span style="font-weight:bold">点对点交流/辩论（Debate）</span><span>，通过多轮互相质询与改进，最终</span><span style="font-weight:bold">多数表决或共识</span><span>。</span></p>

<p id="f-doxcnSR9U683uKQzx5Y0ReQHrce"><span style="font-weight:bold">复杂度指标:</span></p>

<ul><li id="f-doxcnGuBjm5BuC091U9atkjC4vc"><span>LLM调用次数:O(D·N)</span></li></ul>

<ul><li id="f-doxcnhUCXSyCK4LyX0ntT6y21rf"><span>通信开销:D·N²</span></li></ul>

<p id="f-doxcnEMkyK5OQjkSq1T49yJX6Rh"><span style="font-weight:bold">特点：</span><span>能带来多视角对齐与相互检验，在</span><span style="font-weight:bold">动态网页导航</span><span>这类需要不断相互纠偏的环境中，论文观测到去中心化略优（+9.2% 相对集中式 +0.2%）。但辩论的通信/时延开销显著。</span></p>

<p id="f-doxcnMdVolm80pbzOth3fMHbcDe"><span style="font-weight:bold">适用场景</span><span>：信息动态、需要探索与互评的任务（例如复杂检索、策略博弈）；但在</span><span style="font-weight:bold">工具密集或预算受限</span><span>时，通信税会拖累表现。</span></p>

<p id="f-doxcnPpmGrT2SjD2CGddNeyY7mc"><span>5) </span><span style="font-weight:bold">MAS（Hybrid）混合式（层级 + Peer）</span></p>

<p id="f-doxcnJWmEgGHc88DbAjSqxZNOLd"><span style="font-weight:bold">交互类型</span><span>：在集中式的</span><span style="font-weight:bold">层级管控</span><span>之上，允许</span><span style="font-weight:bold">定向的点对点交流（Peer）</span><span>——既有 Orchestrator，也允许子 Agent 之间按需互通。</span></p>

<p id="f-doxcn4CMX5dKwK286OLCqeZcjUc"><span style="font-weight:bold">复杂度指标:</span></p>

<ul><li id="f-doxcnbhe19cX9pB3AzjNpQ04dwc"><span>LLM调用次数:O(R·N + P·M)  (P为点对点轮次)</span></li></ul>

<ul><li id="f-doxcnQftRKIIc5Operz2vxcBIMb"><span>通信开销:R·N + P·M</span></li></ul>

<p id="f-doxcnmLpPYxNhXpgcfXg6TvWHwb"><span style="font-weight:bold">特点：</span><span>结合了</span><span style="font-weight:bold">集中式的收敛</span><span>与</span><span style="font-weight:bold">去中心化的灵活</span><span>，适合大型复杂任务，但要小心 </span><span style="font-weight:bold">Peer 通信税</span><span>与</span><span style="font-weight:bold">一致性管理</span><span>。设计时通常加</span><span style="font-weight:bold">通信限流/白名单</span><span>，避免消息爆炸。</span></p>

<div id="f-doxcnfkMubqzEl1O6HTWL5fYfOe"><img alt="" decoding="async" height="725" loading="lazy" src="/images/agent-learning/1f49d26f375e231dfe85d4ff.png" width="1080"/></div>


<a id="section-0060"></a>
## Agent架构设计原则

<a id="f-doxcn6nx11pjeuMd0dIWQ6Ck5xc"></a>

<p id="f-doxcnikjAFeYGGXFtIl8OmPqN7c"><span>（在将这个给面试官之前，你可以直接说你是看了Google 《Towards a Science of Scaling Agent Systems》来总结的，也能体现你看论文的能力，而且你这个回答由google背书，足够经典）</span></p>

<p id="f-doxcngbZaxP7zIOUgaC38HvUvJb"><span>我参考了Google 在25年12月发布的《Towards a Science of Scaling Agent Systems》论文，结合这一论文来回答这一问题。</span></p>

<p id="f-doxcn581W4bnSDkYnfyxRKs43rJ"><span>谷歌的这篇论文的</span><span style="font-weight:bold">核心思想</span><span>，不同架构下Agent性能受到 ： </span><span style="font-weight:bold">Agent 数量、Agent架构、模型能力、任务属性  </span><span>共同影响，它在不同的场景下，统一了工具，提示词和预算，配置了180种对照模型，用一组可量化的协调指标 - 效率，开销，错误放大，冗余，创造了一个跨任务可泛化的预测指标，通过这个方法，我们可以从数据的角度，量化衡量和选择使用不同模型，来判断Agent性能的好坏。</span></p>

<p id="f-doxcn5uF60PLh8I1RMahk6mrdAe"><span>抛开数据和推导，这项实验得出的原则Agent架构的设计原则是：</span></p>

<p id="f-doxcnbTW0A5eg8sN4frLoceF1La"><span style="font-weight:bold">1.首先确认多Agent/单Agent架构</span></p>

<p id="f-doxcng5ZOXBE1RvRFzdKNd3t50f"><span>多Agent 不是一定比单Agent好。特别是在:</span></p>

<p id="f-doxcnbOU5BwQMzoJbic4cCwvmJJ"><span>1.</span><span style="font-weight:bold">强顺序</span><span>，长推理链，一步错，步步错的情况下。</span></p>

<p id="f-doxcnwrslPZrRJ2bDgTXKQjfhlc"><span>2.</span><span style="font-weight:bold">单体Agent能力已经比较强</span><span>，论文指出单体基线收益（&gt;=45%时)</span></p>

<p id="f-doxcn30rjGVxK5mRc7ZfCWm5fGe"><span>3.</span><span style="font-weight:bold">工具密集且预算固定时</span><span>（因为引入多Agent，会有协调税，增加沟通成本，吞噬有效Token）</span></p>

<p id="f-doxcnAS4ASusIq5frVp1PRUqm1d"><span>倾向于使用单Agent，盲目引入多Agent 架构反而会导致性能下降。</span></p>

<p id="f-doxcnUsP6Wh1sQnqTnX7fTirJsd"><span style="font-weight:bold">2.如果使用多Agent架构，根据特点和场景进行有效选择</span></p>

<div id="f-doxcng412PIoSVW2kq2luAjlA1c"><img alt="" decoding="async" height="461" loading="lazy" src="/images/agent-learning/cdd8e63dfc498771a998a6b6.png" width="615"/></div>


<a id="section-0061"></a>
## 单Agent和多Agent的对比

<a id="f-doxcn4B12lzSq10dtyq6p9WDKL4"></a>

<p id="f-doxcncggB9g3JCWXDDLizRbLVxi"><span>（如果你对这个知识点理解深入了，你发现下面的答案很多的点，你都知道为什么，可以深入解释，比如Agent适用的顺序调用，工具密集和单Agent基线收益较高的情况，比如选择错误架构方法误差的问题，这些都是我们上面看的论文和参考资料所写的，希望大家不光知道答案，还知道为什么，经得起和面试官深入交流里面的细节）</span></p>

<p id="f-doxcnDpVDzX4UHBTqU50a2BEfGe"><span>单Agent系统指的是整个系统的决策和上下文都使用一个智能体，多Agent系统指的是系统由多个智能体通过分工和并行来完成。 </span></p>

<p id="f-doxcndlN5VLPjb3WnqUbc2j1yUh"><span>单Agent的优势在于</span><span style="font-weight:bold">不需要承担Agent之间的协调</span><span>，通信开销和拓扑带来的误差传播，在</span><span style="font-weight:bold">顺序调用，工具密集，单Agent的基线收益已经较高</span><span>（达到45%的时候）使用单Agent效果会更好，盲目使用多Agent架构反而会性能下降。</span></p>

<p id="f-doxcnBTWTClQ8xp0S5jVDna1zZc"><span>多Agent的优势在于在复杂的任务中，特别是</span><span style="font-weight:bold">需要分工和并行</span><span>的问题上，可以突破单Agent的</span><span style="font-weight:bold">能力边界，提高效率和鲁棒性</span><span>，但是我们也需要注意在不同的任务系统中，需要选择合适的多Agent 的架构，</span><span style="font-weight:bold">错误选择架构可能也会显著放大误差</span><span>，降低收益。</span></p>

<p id="f-doxcngq9wylRCPrLUg5UqQNE1Mk"><span style="font-weight:bold">快速测试：</span></p>

<p id="f-doxcnzXeZM6UH8xnWGhtttIA0Ib"><span>通过本章学习/论文，请你自测你能否回答清楚以下几个问题：</span></p>

<p id="f-doxcniyBdTdNR87t9bt3CCd5gmf"><span>1.Multi-agent 有哪些架构，他们有什么特点？</span></p>

<p id="f-doxcn6swYrJlafUTcRpeThVopfe"><span>2.MAS （独立多体）型架构，为什么会放大错误？如何避免？</span></p>

<p id="f-doxcnxu7y4yCHsMD6sQbqMPmBRf"><span>3.如何设计一个Agent架构？你是拍脑袋想的吗？</span></p>

<p id="f-doxcnhxFW1ogjnhUO4BUXcairYf"><span>4.中心化架构中，过度依赖中心Agent，会有什么弊端，怎么避免？</span></p>

<p id="f-doxcnJpMlIx2A0Ud7AZlqZgvQzh"><span>5.哪些场景更适合单Agent，为什么？</span></p>

<p id="f-doxcn8DDgEnVivp1OYjkP3YYJ4e"><span>6.这篇论文中提到了不同场景：金融分析，网页导航，工作流，游戏规划，他们分别适用于什么架构，为什么？你能不能举一反三，在你的项目场景下，用什么架构最合适？为什么？</span></p>


<a id="section-0062"></a>
## Agent之间通信和状态管理

<a id="f-doxcn1TzNz7iComMwOzkhLkwQ9d"></a>

<p id="f-doxcnIy9s27mfaQjwqKFtVeFYxb"><span>（这个知识点不是上面提到的论文中的内容，但是这个点和多Agent相关，有了多Agent同样要知道的它们之间是如何交互的，以及传递什么信息？虽然不算特别高频考点，但是也是被问到过的，需要准备。）</span></p>

<p id="f-doxcnr5BVA6uVewoK3Y6eSdxqNu"><span style="font-weight:bold">常见的Agent的通信模式：</span></p>

<p id="f-doxcnSN6g4PL3lzQLy0NqVORxre"><span style="font-weight:bold">1.</span><span style="font-weight:bold">Agent 间通信有三种常见模式：</span></p>

<ul><li id="f-doxcnROwX4L3heLVT82WYDgBmEg"><span style="font-weight:bold">移交（Handoff）</span><span>：一个 Agent 将执行上下文和执行权完整传递给另一个 Agent，自身退出。控制权转移，就像接力跑把棒交出去。</span></li></ul>

<ul><li id="f-doxcnSJLc7MYebeebsL9kA64Iae"><span style="font-weight:bold">工具调用（Tool Call）</span><span>：一个 Agent（主管）将任务委托出去，保留控制权，等结果回来后自己决定下一步，负责最终输出。（ClaudeCode里面的SubAgent的做法）</span></li></ul>

<ul><li id="f-doxcn5gQpqF5bFRWO6RvS4AuPRZ"><span style="font-weight:bold">消息协作</span><span>：多个长期驻留 Agent 持续交换消息并协同推进任务，允许横向通信与并行协作。（ClaudeCode里的AgentTeam的做法）</span></li></ul>

<div id="f-doxcn7PmTYQaUDtIHsTUUXdPUgh"><img alt="" decoding="async" height="452" loading="lazy" src="/images/agent-learning/a414285d5b9a7d673791cece.png" width="1022"/></div>

<p id="f-doxcnxFQeC20O7jk0g6pEIxFvIg"><span>移交更适用于自主协作的场景，而工具调用则提供了更明确的层级控制和接口约束。</span></p>

<p id="f-doxcn6EKEuz07077qMtNjLiMZmd"><span style="font-weight:bold">2.</span><span style="font-weight:bold">消息传递内容：</span><span>Agent与Agent之间应该传递所有的消息还是部分消息，需要根据具体的业务场景权衡。</span></p>

<div id="f-doxcnOvIKkk9Svijdy18D97gRjh"><img alt="" decoding="async" height="550" loading="lazy" src="/images/agent-learning/1ad617c0ee149cba7f09cb54.png" width="1070"/></div>

<ul><li id="f-doxcnFI06VeeC8KzCFa1N4DPBrb"><span style="font-weight:bold">共享完整推理数据：</span><span>智能体将其所有中间步骤（如链式思考、工具调用）写入共享通道。相当于提供了一个共享区，用于其他智能体理解其推理过程，可以提升系统的整体协作与推理能力。但是这种方式的缺点是会导致状态空间快速膨胀，给上下文窗口和内存管理带来挑战。</span></li></ul>

<ul><li id="f-doxcnGrgVFZCaw3adVtMx8v2mKf"><span style="font-weight:bold">仅共享最终结果：</span><span>智能体在私有空间内完成其计算，仅将最终结果写入到共享区。它能有效控制状态的复杂度，实现此策略需要为每个智能体定义独立的状态模式。</span></li></ul>

<ol start="4"><li id="f-doxcn0BrStrfAanKLBh73wTPWNN"><span style="font-weight:bold">通信介质</span><span>（怎么传）</span></li></ol>

<ul><li id="f-doxcnwMRFDlygyeGBE9awtWXieh"><span>内存通道（in-memory return）。子代理输出作为 tool_result 同步返回主上下文。（ClaudeCode里面的SubAgent的做法）</span></li></ul>

<ul><li id="f-doxcnARW5v68xcijE2sxZ6h2hzf"><span>文件通道（file-backed mailbox）。成员把消息写入对方 inbox 文件，接收方在下一轮读取并注入上下文。（ClaudeCode里的AgentTeam的做法）</span></li></ul>

<p id="f-doxcnBSnma76tbd9o3HAtF9q87d"><span>这一小节，对应的实战部分，可以看ClaudeCode的</span><span><span><a href="/posts/agent-learning-21-open-source-architectures/#f-doxcnCWokTSCkbQhRB9QpYnxLQb"><span>Agent通信</span></a></span></span><span>章节。</span></p>


<a id="section-0063"></a>
## Agent架构设计实战

<a id="f-doxcnJKXIQdfK31iQzVUCR7ZB5d"></a>

<p id="f-doxcnUwTwFkLO27yUiG4FewRMJd"><span>（这个小节，我从</span><span style="font-weight:bold">参考论文的例子</span><span>以及</span><span style="font-weight:bold">面试真题</span><span>中抽取出来几个典型的例子和问题，帮助大家来掌握Agent架构设计相关的内容。现在很多面试都会考察一个小型的场景下的Agent架构设计题目，我会持续将架构设计相关内容汇总于此，这样大家复习更加方便。</span></p>

<p id="f-doxcnpSAuOmkOcf3z7AFreMo3rd"><span>在我整理了几个例子后，某种程度上，可以认为这个问题其实可以套模板，大家看一下是不是，如果你认为你的任务应该用去中心化架构，你就参考这个6.5.1,对于架构的好处，通信方式都可以复用，唯一不同的是Agent的设计和功能。）</span></p>

<a id="f-doxcn8kzkQAazZ9a42nyuHrTp3b"></a>

##### 动态网络浏览问题

<p id="f-doxcnj2O1YqLUb40ZsFNadHle2c"><span>（此例子截取自论文）</span></p>

<p id="f-doxcnbJgEI26CeKwl2vDrNmiQI4"><span style="font-weight:bold">问题描述</span><span>：我们需要通过网络搜索，找到 </span><span style="font-weight:bold">某公司2024年可持续发展报告中关于碳排放的问题</span><span>，请你针对这个问题设计一个Agent架构。</span></p>

<p id="f-doxcnp1N4XdNS90kjridfMZRXPb"><span style="font-weight:bold">架构设计：</span></p>

<p id="f-doxcnVRJfrmt6ckyLBI7dtzsy9d"><span>因为网页导航是</span><span style="font-weight:bold">高熵，路径不唯一</span><span>的场景。 不同的来源（官网，媒体，报告）可以被并行搜索更快覆盖。在这种场景下，我会使用去中心化架构设计整个系统，使用</span><span style="font-weight:bold">去中心化架构既能够提升并行速度</span><span>，可以</span><span style="font-weight:bold">减少中心调度的串行瓶颈。</span></p>

<p id="f-doxcnSdBwdCljck0ppHlBFKcJtb"><span>具体来讲，整个系统各个Agent是平级的，他们自主并行探索。系统里面使用</span><span style="font-weight:bold">事件总线/共享黑板</span><span>的方式，所有Agent订阅相关话题，他们可以</span><span style="font-weight:bold">发布任务，认领任务，提供帮助，提交答案，</span><span>来实现点对点的协作。</span></p>

<p id="f-doxcnGRydqHrmJCtV3KclprjgEc"><span>具体来讲，系统里有：</span></p>

<div style="margin-left:25px"><p id="f-doxcnTt4kTYdGvNjFXu84A9hPVh"><span> 任务规划Agent，将用户目标拆分成子任务后，发布任务。</span></p><p id="f-doxcnoPV4HFtVTvRqqTeVM5aq8e"><span> 然后官网探索Agent， 媒体报告等Agent认领任务后，各自探索，调用工具汇总任务，直到达到标准然后会提交任务，交给验收Agent验收。</span></p><p id="f-doxcnWyjt2Nivcos94LUiEeAErg"><span>验收Agent验证通过后，交付给汇总机器人汇总信息，如果汇总Agent认为目标达成，及时发布停止信息，终止流程进行交付。</span></p></div>

<a id="f-doxcnmMFGFh41DHiCxPV4cGRb7c"></a>

##### 金融推理任务

<p id="f-doxcnkwmNARANZkALTIQTMPxVMh"><span>（此例子截取自论文）</span></p>

<p id="f-doxcnj79LBQT7wuk3PK0DKNYiEe"><span style="font-weight:bold">任务描述：</span><span>设计一个分析某个上市公司的估值的Agent。</span></p>

<p id="f-doxcnwO4kcPEqNxFTWRD7Ikqo6c"><span style="font-weight:bold">架构设计：</span><span>金融估值的</span><span style="font-weight:bold">流程通常比较规范</span><span>，天然具有</span><span style="font-weight:bold">分而治之</span><span>的特点，多个子</span><span style="font-weight:bold">问题之间相对独立，可以并行。</span><span>这种情况下我会使用</span><span style="font-weight:bold">中心化</span><span>架构设计整个系统：由一个Orchestrator（中心指挥官）统一拆解，分派和收敛，降低并发协作带来的协调成本和不一致风险，</span><span style="font-weight:bold">确保各步骤按既定顺序和策略并发执行。</span></p>

<p id="f-doxcn0BvFE1rPY52sNcqvejG7Tf"><span>具体来讲：</span></p>

<p id="f-doxcnWMqSa5wvOrFeClhIxZkESh"><span>可以先设计一个主管Agent, 他将任务分解成</span><span style="font-weight:bold">多个阶段，设计并行窗口，验收，</span><span>将任务下发给子Agent去并行完成。</span></p>

<p id="f-doxcnhkQK9JCYptg8isoYxX9RGx"><span>主管Agent下设置多个子Agent，比如</span><span style="font-weight:bold">收集官网信息Agent, 收集市场监管信息Agent，收集友商信息做对比的Agent。</span></p>

<p id="f-doxcnaRaQErPDEomnuS6P6cTPig"><span>整个过程由主管Agent负责验收，当Orchestrator验收通过，下发停止信号中止整个流程并交付。</span></p>

<a id="f-doxcn5yfxnUdFN3XqERamAfKYqg"></a>

##### 中心Agent架构子Agent膨胀问题

<p id="f-doxcnR66nx90vLez39zitOfp4Vf"><span>在</span><span><span><a href="/posts/agent-learning-24-interview-review/#f-doxcnvVgC8ikiePZWxfGoISnqzd"><span>小红书一面</span></a></span></span><span>中面试官对中心架构下子Agent膨胀问题进行了探讨，这里只做问题汇总，具体内容请转到面试实战，小红书一面</span></p>

<a id="f-doxcn5diwoCcGQNYY942oXxxtsg"></a>

##### 时空冲突检测任务

<p id="f-doxcndkb6E51GZA2O6G5Ovl5Qib"><span>（选自真题：夸克千问架构设计题目，我就准备直接套用6.5.2的模板）</span></p>

<p id="f-doxcnuXtgC3ullYZyH14YOOVRAb"><span style="font-weight:bold">任务描述：</span><span>设计一个Agent系统，让它完成当用户创建一个行程后，判断这个行程是否和其它冲突，如果有冲突，给出重新规划的建议。</span></p>

<p id="f-doxcnsxpQIOU1bkdygltRwGlROc"><span style="font-weight:bold">架构设计：</span><span>行程冲突检测 和 规划本质是约束满足 + 顺序调整，</span><span style="font-weight:bold">流程比较规范，</span><span>需要考虑</span><span style="font-weight:bold">时间窗口，地点，偏好等特点，</span><span>这些因素也相对独立，可以并行。 这种情况下我会使用</span><span style="font-weight:bold">中心化 </span><span>架构设计整个系统，由一个Orchestrator统一拆解，分派和收敛，降低并发协作带来的协调成本和不一致风险，</span><span style="font-weight:bold">确保各步骤按既定顺序执行也能够并发。</span></p>

<p id="f-doxcnqc9c2wjCR03OBxnZFsN9ae"><span>具体来讲：可以先设计一个Agent作为总指挥，根据当前阶段来分配下发任务，控制并发窗口，验收，和控制中止。</span></p>

<p id="f-doxcnInCo2z8lQFDDsgFpVspHGc"><span>然后可以设计多个子Agent。 比如行程Agent：负责整理相关的行程，和行程时间相关的数据。 地点Agent：评估各个行程地点相关Agent的 通行时间等，冲突检测Agent, 用户喜好分析Agent 和 生成重新规划的Agent。 他们之间在某些阶段可以并行，某些阶段是串行，由主管Agent统筹规划和管理。</span></p>


<a id="section-0064"></a>
## 面试问题

<a id="f-doxcn9BHxxVwNahKVZ2NQjwDwWk"></a>

<a id="f-doxcnd1HGiaIoIU83h6rKDqbkfn"></a>

##### 多 Agent 协作系统需要考虑哪些架构问题？

<p id="f-doxcnQYcMBEqfuJokRqhQQjMJbd"><span>选自 </span><span><span><a href="/posts/agent-learning-24-interview-review/#f-doxcnPm9MVQw0q6LtT7K0vcLjGc"><span>202607宇树科技二面</span></a></span></span></p>

<p id="f-doxcn1qzvLPONPyMahl3rRdQNvf"><span>💡 </span><span style="font-weight:bold">思路：</span></p>

<p id="f-doxcn9NHQ8oP30z4POAToFo3oHf"><span>顺着 </span><span style="font-weight:bold">“是否需要多 Agent → 如何组织和编排 → 如何通信协作 → 如何验证交付”</span><span> 这条主线思考，再从 </span><span style="font-weight:bold">安全与权限、成本与延迟及可观测性</span><span> 两个方面检查整个设计。前四点回答系统怎样完成任务，后两点回答系统怎样安全、可控地运行，它们是贯穿全程的约束，不是最后才考虑。其中这六个方面，每一方面其实都可以展开，建议顺着这个思路，深入学习每一部分内容，都是重点，面试官追问的时候也可以回答的上来。</span></p>

<ol start="1"><li id="f-doxcnF0ItlaARcMyuXi0zGTWFRf"><span style="font-weight:bold">是否使用多 Agent；使用什么架构，如何编排；Agent 之间如何通信、共享状态。 </span><span>这些都是</span><span style="font-weight:bold">：</span><span><span><a href="#f-doxcntuQVjJ2aMEP4HF4qje1X9b"><span>笔记Multi-Agent架构章节</span></a></span></span><span>， 这个章节讲的，属于高频考点。</span></li></ol>

<ol start="2"><li id="f-doxcnPnRlAc6ibzqeayPrptPChb"><span style="font-weight:bold">安全与权限如何控制。 </span><span>在ClaudeCode安全机制里面讲过，讲了它的</span><span><span><a href="/posts/agent-learning-21-open-source-architectures/#f-doxcnim6v71Ag0CWHpj9BW21zOg"><span>权限系统和安全审查</span></a></span></span><span>。</span></li></ol>

<ol start="3"><li id="f-doxcn9qDjvYfblBi9WxI6xrqj70"><span style="font-weight:bold">成本、延迟与可观测性如何设计.  </span><span><span><a href="/posts/agent-learning-15-evaluation-observability/#f-doxcnqrKdVGPbNYY8Xm3Fr8NVkh"><span>属于Agent评估的内容</span></a></span></span><span>。</span></li></ol>

<p id="f-doxcn41kmBu3rj1W50JiHg2ECtc"><span>📝 </span><span style="font-weight:bold">答案：</span></p>

<p id="f-doxcnNFj9Nvu8M8GWXgeoq4nZWd"><span>可以从以下六个方面考虑：</span></p>

<ol start="1"><li id="f-doxcnE7lEvNkrMCWrpPgygw1HQ7"><span style="font-weight:bold">是否使用多 Agent。</span></li></ol>

<p id="f-doxcnnyiDb5t2TdOhtMGJMdQmAg"><span>先判断单 Agent 或固定工作流是否够用。确实需要专业分工、并行处理或独立验证时，再引入多 Agent，并确认收益值得额外的通信和协调成本。</span></p>

<ol start="2"><li id="f-doxcncwonAY7ryhF1PjdKahv0W2"><span style="font-weight:bold">使用什么架构，如何编排。</span></li></ol>

<p id="f-doxcnpRoOjrzkRxOCVhKhMHsqDd"><span>明确各 Agent 的职责，以及谁分配任务、谁汇总结果。流程固定时用流水线，需要动态拆解时用协调者—工作者结构；按任务依赖决定串行或并行，并设置超时、有限重试和停止条件。</span></p>

<ol start="3"><li id="f-doxcnBxrV8aiIINlrEXChsfCLVc"><span style="font-weight:bold">Agent 之间如何通信、共享状态。</span></li></ol>

<p id="f-doxcnuBFuOoyzd29p2VTGcrQcxh"><span>约定输入输出格式，只传递必要的结果和上下文。区分私有信息与共享任务状态，明确共享数据由谁维护，避免重复劳动和相互覆盖。</span></p>

<ol start="4"><li id="f-doxcnAmL7GNJEOBUmVzaEw7UVEc"><span style="font-weight:bold">如何验证结果、保证任务完成。</span></li></ol>

<p id="f-doxcnBThysQdg9eXdDQ1LBjlqyg"><span>明确子任务和总任务的验收标准，通过规则、测试、证据或独立验证 Agent 检查结果。结论冲突时按证据裁决，验证失败时有限修正或转人工，不能把“执行结束”当成“任务完成”。</span></p>

<ol start="5"><li id="f-doxcnwpPzPWxdMa0b5YrWYtPeNe"><span style="font-weight:bold">安全与权限如何控制。</span></li></ol>

<p id="f-doxcn0mQ0UsTRc5HcECXvTwtFfd"><span>按最小权限限制各 Agent 能访问的数据和工具，由执行层强制校验，不能只靠提示词。防范提示注入和数据泄露，删除、付款等高影响操作需要审批。</span></p>

<ol start="6"><li id="f-doxcnZvn4mnRyXqWcLwPhlQVRAb"><span style="font-weight:bold">成本、延迟与可观测性如何设计。</span></li></ol>

<p id="f-doxcnQcrBJsM432FiRabQAkeWCg"><span>设置全局时间、Token 和费用预算，通过合理并行、模型选型和减少无效通信优化开销。记录各 Agent 的调用链、任务状态和失败原因，并与单 Agent 比较成功率、延迟和成本，验证实际收益。</span></p>

<p id="f-doxcnBt1OKMQP7EDboDDSB4lT6c"><span style="font-weight:bold">总结：先判断要不要用，再设计怎么组织、怎么协作、怎么验收，同时保证权限有边界、资源有预算、过程可追踪。</span></p>


<a id="section-1466"></a>
## 多智能体系统（Multi-Agent System）

<a id="t-block-21919"></a>

<p id="t-qnZxZ4ThmtmnND9xAIHJos"><span>本章节介绍多智能体系统（Multi-Agent System）。</span></p>

<p id="t-KqQ4dTogtFIqyVmy6zUR1d"><span>多智能体系统通过多个 Agent 的协作来完成复杂任务。</span></p>

<p id="t-GRZSuittXkFy7M25w0QVxn"><span>这是构建大规模 AI 系统的关键技术，能够实现单一 Agent 无法完成的复杂功能。</span></p>


<a id="section-1467"></a>
## 多 Agent 架构基础

<a id="t-VYmYMwnBgWoPJVfg57mQ5K"></a>

<p id="t-cmhFwvlbWoZ1yGYHIDcDu7"><span>多 Agent 系统的核心挑战包括三个方面。</span></p>

<p id="t-l68J03uOaTcnJijKDYniIq"><span>分工问题：如何将任务合理分配给不同的 Agent。</span></p>

<p id="t-GfjVJFKvDK8QG9BNyCsuad"><span>通信问题：Agent 之间如何传递信息。</span></p>

<p id="t-J7Btpu4OoGCQFF5ENWZMuA"><span>协调问题：如何确保多个 Agent 的行动一致且高效。</span></p>


<a id="section-1468"></a>
## 基本架构模式

<a id="t-0Q0G6rPcsxP8s8taVtUMs6"></a>

<a id="t-scqvZIBQZhw64sROaSfYXB"></a>

##### 层次架构（Hierarchical）

<p id="t-wGOLXh2RKEm04drLlo7l3A"><span>层次架构采用树状结构，有一个主 Agent 负责调度。</span></p>

<p id="t-htL9FGKsbFWK9MeiifTlLE"><span>主 Agent（Orchestrator）负责任务分解和结果整合。</span></p>

<p id="t-JIQtJbNKJgi7NGNUmb1fFb"><span>从 Agent（Subagent）负责执行具体任务。</span></p>

<pre id="t-uxHU3a4ccomzpP1yBSg8Zx"><code>Orchestrator (调度者)
    |
    +-- Agent A (专家A)
    +-- Agent B (专家B)
    +-- Agent C (专家C)</code></pre>

<a id="t-2TNZQmAR4igS1flc7RT3Ke"></a>

##### 平级架构（Peer-to-Peer）

<p id="t-dBG02tnzzBzlrjTjjpQa8r"><span>平级架构中所有 Agent 地位平等，直接通信协作。</span></p>

<p id="t-N9TnumR5FAuDZwC2QP2ONL"><span>适合 Agent 之间需要频繁对等交互的场景。</span></p>

<pre id="t-9kVDjOQZmYrwZik6Kz3K2y"><code>Agent A &lt;--&gt; Agent B
    |           |
    v           v
Agent C &lt;--&gt; Agent D</code></pre>


<a id="section-1469"></a>
## 角色分工与协作

<a id="t-LSxdRDA3wtIhK7fLZY07wB"></a>

<p id="t-EurVeTg0p4EwUimn9UTXeX"><span>有效的多 Agent 系统需要明确的角色定义。</span></p>

<p id="t-P9X46GJefgKEsvMKbS0jRP"><span>每个 Agent 应该有自己的专长和职责范围。</span></p>

<p id="t-PN5MebWMicdQQr70vzoQld"><span>协作机制确保多个 Agent 能够协调工作。</span></p>


<a id="section-1470"></a>
## 常见角色定义

<a id="t-mi3pOWNgrWrXcWhYxu06mK"></a>

<p id="t-Chm1Vu8nCTC64JYqjU0jgB"><span style="font-weight:bold">规划者（Planner）</span><span>：分解复杂任务，制定执行计划。</span></p>

<p id="t-ShaZXIOgrJj4b1nHfSIDMs"><span style="font-weight:bold">执行者（Executor）</span><span>：调用工具，执行具体操作。</span></p>

<p id="t-p6iwCKoaQQVZ7CsIhgdYUx"><span style="font-weight:bold">审核者（Reviewer）</span><span>：评估结果，提出改进建议。</span></p>

<p id="t-r13DDaax7UNl6owBdYRkMD"><span style="font-weight:bold">协调者（Coordinator）</span><span>：管理 Agent 间的通信和任务分配。</span></p>


<a id="section-1472"></a>
## 多 Agent 系统基础实现

<a id="t-zaFFWh8rVWgXuYxrdibwpR"></a>

<pre id="t-g5XZxUx6UcA3FC4JiKqs1P"><code>class Agent:
 """
    基础 Agent 类
    每个 Agent 有自己的角色、工具和执行逻辑
    """

 def __init__(self, role, llm, tools):
 # Agent 的角色名称
        self.role = role
 # 关联的语言模型
        self.llm = llm
 # 可用工具列表
        self.tools = tools

 def execute(self, task, context=None):
 """
        执行任务
        :param task: 任务描述
        :param context: 上下文信息
        :return: 执行结果
        """
 # 构建提示词
        prompt = self.build_prompt(task, context)

 # 生成响应
        response = self.llm.generate(prompt)

 # 如果需要调用工具
 if response.needs_tool_call:
 return self.execute_tool(response)

 return response.content

 def build_prompt(self, task, context):
 """构建 Agent 的提示词"""
 return f"角色：{self.role}\n任务：{task}\n上下文：{context}"

 def execute_tool(self, response):
 """执行工具调用"""
        tool_name = response.tool_name
        tool_input = response.tool_input

 # 从工具列表中找到对应工具
        tool = self.get_tool(tool_name)

 # 执行工具
 return tool.execute(tool_input)


class MultiAgentSystem:
 """
    多 Agent 协作系统
    负责管理多个 Agent 之间的协作
    """

 def __init__(self, agents, coordinator):
 # Agent 字典，key 是角色名
        self.agents = {a.role: a for a in agents}
 # 协调者 Agent
        self.coordinator = coordinator

 def solve(self, task):
 """
        解决复杂任务
        通过协调多个 Agent 协作完成
        """
 # 第一步：协调者分析任务，决定需要哪些 Agent 参与
        plan = self.coordinator.decompose(task)

 # 第二步：分发任务给相应 Agent
        results = {}
 for role, subtask in plan.subtasks.items():
 # 获取对应角色的 Agent
            agent = self.agents.get(role)
 if agent:
 # 执行子任务
                results[role] = agent.execute(subtask)

 # 第三步：协调者整合结果
        final_result = self.coordinator.integrate(results)

 return final_result


class CoordinatorAgent:
 """协调者 Agent"""

 def __init__(self, llm):
        self.llm = llm

 def decompose(self, task):
 """
        分解任务
        分析任务，决定需要哪些 Agent 以及如何分工
        """
        prompt = f"""
分析以下任务，分解为子任务并分配给合适的 Agent。

任务：{task}

请输出：
1. 需要哪些 Agent（角色）
2. 每个 Agent 负责什么子任务
3. 子任务之间的依赖关系

输出格式：JSON
"""
        response = self.llm.generate(prompt)
 return Plan.parse(response)

 def integrate(self, results):
 """
        整合多个 Agent 的结果
        """
        prompt = f"""
整合以下 Agent 的执行结果，生成最终回答。

结果列表：
{results}

请整合并输出最终结果。
"""
 return self.llm.generate(prompt)</code></pre>


<a id="section-1473"></a>
## AutoGen 框架

<a id="t-uE9L9b0aEAdejgAvas9Qyh"></a>

<p id="t-QvXiz6mUQLyCuPR5cxlLqR"><span>AutoGen 是微软开发的多 Agent 编程框架。</span></p>

<p id="t-xJttlV7QahqiiLIC3OnIC6"><span>它提供了一套简洁的 API 来构建多 Agent 对话系统。</span></p>

<p id="t-9RjVK8WHhVcBIXd4j7Vjsk"><span>AutoGen 大大简化了多 Agent 系统的开发复杂度。</span></p>


<a id="section-1474"></a>
## 核心概念

<a id="t-EhN1OulN6UytoC99uaEcLe"></a>

<p id="t-y3r9R0owPJ9ufQ0pEWVFHW"><span style="font-weight:bold">AssistantAgent</span><span>：能够调用工具的智能助手 Agent。</span></p>

<p id="t-PlFX983GUDKsURwoSlIk8n"><span style="font-weight:bold">UserProxyAgent</span><span>：代表用户行为，可以执行代码和工具调用。</span></p>

<p id="t-tcJcyfE2a76bOqr8hDLuk0"><span style="font-weight:bold">GroupChat</span><span>：支持多个 Agent 之间的群聊协作。</span></p>

<p id="t-HqOxUDJbO0tdzRqHdR2sFw"><span style="font-weight:bold">GroupChatManager</span><span>：管理群聊中的 Agent 交互。</span></p>


<a id="section-1476"></a>
## AutoGen 基本使用

<a id="t-iBZX1nEDssvz9Tf7xkXYPC"></a>

<pre id="t-mQYDF5JxEjlSgSA2SHxElC"><code># 导入 autogen 框架
import autogen
from autogen import AssistantAgent, UserProxyAgent, GroupChat, GroupChatManager

# ==================== 配置 LLM ====================
# 创建一个配置字典
llm_config = {
 "model": "gpt-4",
 "api_key": "your-api-key", # 实际使用时从环境变量读取
 "temperature": 0.7
}

# ==================== 创建单个 Agent ====================
# 创建助手 Agent
assistant = AssistantAgent(
    name="assistant",
    system_message="""
    你是一个有用的 Python 编程助手。
    你可以帮助用户编写、调试和优化代码。
    """,
    llm_config=llm_config
)

# 创建用户代理 Agent
# human_input_mode="NEVER" 表示不需要人工输入
# max_consecutive_auto_reply=10 表示最多连续自动回复 10 次
user_proxy = UserProxyAgent(
    name="user_proxy",
    human_input_mode="NEVER",
    max_consecutive_auto_reply=10
)

# ==================== 单 Agent 对话 ====================
# 启动对话
user_proxy.initiate_chat(
    assistant,
    message="帮我写一个快速排序算法"
)

# ==================== 多 Agent 群聊 ====================
# 创建多个 Agent
coder = AssistantAgent(
    name="coder",
    system_message="你是一个 Python 编程专家，负责编写代码。",
    llm_config=llm_config
)

reviewer = AssistantAgent(
    name="reviewer",
    system_message="你是一个代码审查专家，负责审查代码质量。",
    llm_config=llm_config
)

# 创建群聊
group_chat = GroupChat(
    agents=[coder, reviewer],
    messages=[],
    max_round=10 # 最多对话 10 轮
)

# 创建群聊管理器
manager = GroupChatManager(
    groupchat=group_chat,
    llm_config=llm_config
)

# 启动群聊
user_proxy.initiate_chat(
    manager,
    message="写一个快速排序算法并审查代码"
)</code></pre>


<a id="section-1478"></a>
## AutoGen 工具调用

<a id="t-DnWTjKCVwPbn3bwJz2tkIr"></a>

<pre id="t-i6xvFnuXPKNc8JMaQvSK3R"><code>import autogen
from autogen import AssistantAgent, UserProxyAgent

# 定义工具列表
# 这些工具会被注册到 Agent 的工具列表中
tools = [
 {
 "name": "calculate",
 "description": "执行数学计算",
 "parameters": {
 "type": "object",
 "properties": {
 "expression": {
 "type": "string",
 "description": "要计算的数学表达式，如 '2+3*5'"
 }
 },
 "required": ["expression"]
 }
 },
 {
 "name": "search_web",
 "description": "搜索网页信息",
 "parameters": {
 "type": "object",
 "properties": {
 "query": {
 "type": "string",
 "description": "搜索关键词"
 }
 },
 "required": ["query"]
 }
 }
]

# 创建具有工具调用能力的 Agent
assistant = AssistantAgent(
    name="assistant",
    system_message="""
    你是一个有用的助手。
    当需要计算或查找信息时，你可以调用相关工具。
    """,
    llm_config={
 "model": "gpt-4",
 "api_key": "your-api-key"
 },
    tools=tools  # 注册工具
)

# 创建用户代理
user_proxy = UserProxyAgent(
    name="user_proxy",
    human_input_mode="NEVER"
)

# 启动对话，Agent 会自动调用工具
user_proxy.initiate_chat(
    assistant,
    message="计算 (15 + 25) * 2 等于多少？"
)

# 回复示例：
# Agent 可能会回复：
# "我来计算一下：(15 + 25) * 2 = 40 * 2 = 80"
# 或者直接调用 calculate 工具获取结果</code></pre>


<a id="section-1479"></a>
## A2A 与 MCP 协议

<a id="t-8yUbljTvY84y1FWNXzIgpa"></a>

<p id="t-CIv1vNx696KKi5owtwnlmL"><span>多 Agent 系统需要标准化的通信协议。</span></p>

<p id="t-lE9BsJIc1dUrcLtWvWaSon"><span>A2A 和 MCP 是两个重要的协议标准。</span></p>


<a id="section-1480"></a>
## A2A（Agent-to-Agent）协议

<a id="t-NifaBsqCYBMqHmS5r7NTjq"></a>

<p id="t-VLaR8TQZplVCy6GfWiblk8"><span>A2A 协议定义了 Agent 之间通信的标准格式。</span></p>

<p id="t-vHaXUqZnSuyAKj8zP4p12b"><span>它支持代理发现、任务协作和状态同步。</span></p>

<a id="t-Y5PWpfdEPGOQZw0jT5qxcI"></a>

##### 核心功能

<p id="t-Vrf2iZKdhnijZ41ZRY1qR3"><span style="font-weight:bold">代理发现（Agent Discovery）</span><span>：Agent 能够发现其他 Agent 的能力和服务。</span></p>

<p id="t-jkePR3VDr7LmuwnnA8lluF"><span style="font-weight:bold">任务协作（Task Collaboration）</span><span>：多个 Agent 能够协同完成复杂任务。</span></p>

<p id="t-xrWFup3kZUGUcqwgoVi8pj"><span style="font-weight:bold">状态同步（State Synchronization）</span><span>：Agent 之间能够同步状态信息。</span></p>


<a id="section-1481"></a>
## MCP（Model Context Protocol）协议

<a id="t-3qXpkjMmV2RDorbtRqAt0f"></a>

<p id="t-bVQvE541cTnDGMl0jigGXx"><span>MCP 是一种开放标准协议。</span></p>

<p id="t-I29k0VFxQjx5WvzzSXGyW7"><span>使得 AI 模型能够安全地与外部工具和数据源连接。</span></p>

<p id="t-lSIy2Surd4b2QaEBQmJ3v2"><span>MCP 是工具接入的标准协议，类似于 USB 接口的作用。</span></p>

<a id="t-DjXRAr0HbeQrFsVAnCF8A0"></a>

##### 核心组件

<p id="t-94hd9NaW0QTQk6jRYReORY"><span style="font-weight:bold">Host</span><span>：运行 AI 应用的宿主环境。</span></p>

<p id="t-aZN90tQuGtFaUx9MfvcSm1"><span style="font-weight:bold">Client</span><span>：与 MCP 服务器建立连接的客户端。</span></p>

<p id="t-nXQPHs7Tw5R7tSGkcmnurB"><span style="font-weight:bold">Server</span><span>：提供工具和资源的服务端。</span></p>

<a id="t-VIxoLCquh9Av6V9KasG2Gu"></a>

##### MCP 工具定义示例


<a id="section-1482"></a>
## MCP 工具定义

<a id="t-2YZjOaaZcuyEZkxo9Itzf2"></a>

<pre id="t-yNH2biHRKrHErPcTeWicha"><code>{
 "name": "filesystem",
 "description": "文件系统操作工具",
 "version": "1.0.0",
 "tools": [
 {
 "name": "read_file",
 "description": "读取文件内容",
 "inputSchema": {
 "type": "object",
 "properties": {
 "path": {
 "type": "string",
 "description": "文件路径，必填"
 },
 "encoding": {
 "type": "string",
 "description": "文件编码，可选，默认为 utf-8"
 }
 },
 "required": ["path"]
 }
 },
 {
 "name": "write_file",
 "description": "写入文件内容",
 "inputSchema": {
 "type": "object",
 "properties": {
 "path": {
 "type": "string",
 "description": "文件路径，必填"
 },
 "content": {
 "type": "string",
 "description": "文件内容，必填"
 }
 },
 "required": ["path", "content"]
 }
 },
 {
 "name": "list_directory",
 "description": "列出目录内容",
 "inputSchema": {
 "type": "object",
 "properties": {
 "path": {
 "type": "string",
 "description": "目录路径"
 }
 }
 }
 }
 ],
 "resources": [
 {
 "uri": "file://config",
 "description": "配置文件"
 }
 ]
}</code></pre>

<blockquote id="t-pF7HJgeUByCyN9DeLjRmuk"><p id="t-m9l48GsFqhSuQ8iijG0SyK"><span style="font-style:italic">注意：A2A 和 MCP 解决的问题不同。A2A 解决的是 Agent 之间的通信问题，MCP 解决的是 Agent 与外部工具的连接问题。两者可以结合使用，构建完整的多 Agent 系统。</span></p></blockquote>


<a id="section-1483"></a>
## 主从 Agent 模式

<a id="t-wN6TzwaNG5HbzleDNuc5MX"></a>

<p id="t-fuuxZQNYK0gidSswuQxPgh"><span>主从模式是一种经典的多 Agent 架构模式。</span></p>

<p id="t-IfqmuDKxL8AKHZfGVTa1Gs"><span>主 Agent（Orchestrator）负责任务分解和结果整合。</span></p>

<p id="t-GihOEdrlVK6yNizsfZ78iF"><span>从 Agent（Subagent）负责执行具体任务。</span></p>


<a id="section-1484"></a>
## 适用场景

<a id="t-L37WYdRo6jQErNwCWEhdyk"></a>

<p id="t-lSN3TjGkurCXRVfAP1nwlL"><span>任务可以清晰地分解为独立子任务的场景。</span></p>

<p id="t-mPShTDlHvPyfdMUJVPbDmz"><span>需要不同专业技能的 Agent 协作完成的场景。</span></p>

<p id="t-CYMV4Q7gbwUXQlObs2g2vj"><span>需要中央协调和控制的复杂工作流。</span></p>


<a id="section-1486"></a>
## 主从 Agent 模式实现

<a id="t-aWHtEPXeAqNQ3f8RUSMw7n"></a>

<pre id="t-3hDcJZH3x3xjgzrT37cJ4i"><code>class OrchestratorAgent:
 """
    主编排 Agent（主 Agent）
    负责任务分解、分配和结果整合
    """

 def __init__(self, llm, subagents):
 # 语言模型
        self.llm = llm
 # 从 Agent 字典
        self.subagents = {a.role: a for a in subagents}

 def handle_request(self, request):
 """
        处理用户请求
        完整的编排流程
        """
 # ==================== 分析阶段 ====================
 # 分析请求，决定是否需要多个 Agent 协作
        plan = self.llm.plan(request)

 if len(plan.subtasks) == 1:
 # 单一任务，直接分发给对应 Agent
            target_role = plan.target_role
 return self.subagents[target_role].execute(plan.subtasks[0])

 # ==================== 多 Agent 协作阶段 ====================
 # 创建任务队列
        task_queue = self.create_task_queue(plan.subtasks)

 # 存储已完成的结果
        results = []

 # 处理循环，直到所有任务完成
 while task_queue:
 # 获取可以并行执行的任务
            parallel_tasks = self.get_parallel_tasks(task_queue)

 # 并行执行
            parallel_results = self.execute_in_parallel(parallel_tasks)
            results.extend(parallel_results)

 # 更新任务队列
 # 处理依赖关系，移除已完成任务，添加新任务
            task_queue = self.update_queue(task_queue, parallel_results)

 # ==================== 整合阶段 ====================
 # 整合所有结果
 return self.integrate_results(results)

 def create_task_queue(self, subtasks):
 """创建任务队列"""
 return TaskQueue(subtasks)

 def get_parallel_tasks(self, task_queue):
 """
        获取可以并行执行的任务
        排除有依赖关系的任务
        """
        ready_tasks = []
 for task in task_queue.tasks:
 # 检查任务依赖是否都满足
 if all(dep in task_queue.completed for dep in task.dependencies):
                ready_tasks.append(task)
 return ready_tasks

 def execute_in_parallel(self, tasks):
 """并行执行多个任务"""
 import concurrent.futures

        results = []
 with concurrent.futures.ThreadPoolExecutor() as executor:
 # 提交所有任务
            future_to_task = {
                executor.submit(self.execute_task, task): task
 for task in tasks
 }

 # 收集结果
 for future in concurrent.futures.as_completed(future_to_task):
                task = future_to_task[future]
 try:
                    result = future.result()
                    results.append(result)
 except Exception as e:
                    results.append(TaskResult(task=task, error=str(e)))

 return results

 def execute_task(self, task):
 """执行单个任务"""
        agent = self.subagents.get(task.role)
 if not agent:
 return TaskResult(task=task, error=f"Unknown role: {task.role}")

 return agent.execute(task.description)

 def update_queue(self, task_queue, completed_results):
 """更新任务队列"""
 # 将已完成任务标记为完成
 for result in completed_results:
            task_queue.completed.add(result.task.id)

 # 移除已完成的任务
        task_queue.tasks = [
            t for t in task_queue.tasks
 if t.id not in task_queue.completed
 ]

 return task_queue

 def integrate_results(self, results):
 """
        整合多个 Agent 的结果
        生成最终回答
        """
        prompt = f"""
整合以下 Agent 的执行结果，生成最终回答。

结果列表：
{results}

请整合成一个完整、连贯的回答。
"""
 return self.llm.generate(prompt)


class Subagent:
 """从 Agent 基类"""

 def __init__(self, role, llm, tools=None):
        self.role = role
        self.llm = llm
        self.tools = tools or []

 def execute(self, task):
 """执行任务的具体逻辑"""
 raise NotImplementedError</code></pre>


<a id="section-1487"></a>
## 主从模式的优缺点

<a id="t-aOPrO1PiZmSRrhWsQze5do"></a>

<div id="t-MjuwbfSYkXam0LidhAPd3b"><table><colgroup><col width="297.9026794433594"/><col width="335.8992614746094"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>优点</span></p></td><td style=" vertical-align: top"><p><span>缺点</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>结构清晰，易于理解和实现</span></p></td><td style=" vertical-align: top"><p><span>主 Agent 成为单点故障</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>中央协调，易于控制</span></p></td><td style=" vertical-align: top"><p><span>主 Agent 可能成为性能瓶颈</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>适合层次分明的任务</span></p></td><td style=" vertical-align: top"><p><span>灵活性较低，难以动态调整</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>调试方便，可追踪每个子任务</span></p></td><td style=" vertical-align: top"><p><span>不适合对等交互频繁的场景</span></p></td></tr></tbody></table></div>


<a id="section-1488"></a>
## 章节小结

<a id="t-AACMdOw92qYFs8Qd0xXCNP"></a>

<p id="t-W6WPm1X3b1bHX2odHmS59R"><span>本章节介绍了多智能体系统的核心概念和实现方法。</span></p>

<p id="t-haRW4k2DkNuwKRY3FsqIch"><span style="font-weight:bold">多 Agent 架构基础</span><span> 介绍了层次架构和平级架构两种基本模式。</span></p>

<p id="t-bVoL5jMJc1hapKGBHga7Uf"><span style="font-weight:bold">角色分工与协作</span><span> 通过明确的角色定义提高系统效率。</span></p>

<p id="t-7IAUAIJlTh2C6taZuETKNX"><span style="font-weight:bold">AutoGen 框架</span><span> 提供了简化多 Agent 开发的编程框架。</span></p>

<p id="t-oLQnEOoxS4Se0UuLKnYIb3"><span style="font-weight:bold">A2A 和 MCP 协议</span><span> 是 Agent 通信和工具接入的标准协议。</span></p>

<p id="t-WdVQPGqIgQOnv9x0UaCzXs"><span style="font-weight:bold">主从 Agent 模式</span><span> 适合有明确层次结构的复杂任务。</span></p>

<p id="t-gF3wL3yQF0H6mHVgfnJhPI"><span>选择合适的多 Agent 架构需要根据具体场景。</span></p>

<p id="t-9AziEJDJmP8Npr5tkWGByN"><span>对于简单场景，单个 Agent 即可满足需求。</span></p>

<p id="t-JODrp27mBgv2QIXodTBQx1"><span>对于复杂场景，需要根据任务特点选择合适的架构模式。</span></p>

