---
title: "第 01 章 · Agent 入门与整体架构"
date: "2026-10-22"
draft: false
author: "学习资料整理"
description: "定义与边界、核心组件、工作流、应用场景"
tags: ["Agent", "学习路线"]
categories: ["AI 工程"]
prerequisites: []
verification: {"status": "not-run", "scope": "本次仅整理资料；示例代码与原文技术结论未复跑。"}
---

定义与边界、核心组件、工作流、应用场景

[学习路线](/posts/agent-learning-route/) · [下一章](/posts/agent-learning-02-llm-foundations/)

本章按知识小节编排。项目内容作为学习案例阅读，示例代码与原文技术结论未在本次整理中执行验证。

## 本章目录

- [大模型应用/算法学习路线](#section-0005)
- [学习顺序：应用起手 → 算法进阶](#section-0009)
- [大模型岗位介绍](#section-0010)
- [算法工程师](#section-0011)
- [大模型开发工程师](#section-0012)
- [大模型数据工程师](#section-0013)
- [推理工程师](#section-0014)
- [FDE（前线部署工程师）](#section-0016)
- [不同岗位技术侧重点和面试技巧](#section-0017)
- [学习路线](#section-0018)
- [后端知识在大模型行业中重要吗？](#section-0020)
- [Agent项目浅，如何优化](#section-0021)
- [我的情况可以入行大模型吗？](#section-0023)
- [专题阅读与文档维护](#section-0298)
- [什么是AI Agent](#section-0321)
- [什么是 Agent？](#section-0322)
- [学习资源](#section-0323)
- [AI Agent 简介](#section-0324)
- [Agent 与传统 AI 模型的区别](#section-0325)
- [核心模式：从 Prompt 到 Reasoning Loop](#section-0326)
- [AI Agent 构成：像人一样思考与行动](#section-0327)
- [规划模块：任务的大脑与指挥官](#section-0328)
- [记忆模块：经验的笔记本](#section-0329)
- [工具调用模块：灵活的双手](#section-0330)
- [核心特征](#section-0331)
- [时间线](#section-0333)
- [AI Agent 的主要类型与应用场景](#section-0334)
- [常见挑战与局限性](#section-0335)
- [最佳实践建议](#section-0336)
- [未来发展趋势](#section-0337)
- [AI Agent 核心组件](#section-0338)
- [整体架构](#section-0339)
- [感知层 (Perception) —— 餐厅的前台](#section-0340)
- [大脑 (Brain) —— 也就是大模型](#section-0341)
- [大脑做的三件核心事](#section-0342)
- [工具 (Tools) —— 厨房里的设备](#section-0343)
- [记忆 (Memory) —— 顾客记录本](#section-0344)
- [RAG：让 Agent 拥有&quot;外挂知识库&quot;](#section-0345)
- [规划 (Planning) —— 烹饪流程单](#section-0346)
- [主流规划策略](#section-0347)
- [Agent 运行循环 (Agent Loop)](#section-0348)
- [总结](#section-0349)
- [五大组件一览](#section-0350)
- [AI Agent 术语](#section-0351)
- [一、编程范式（Coding Paradigm）](#section-0352)
- [二、工程角色（Engineer Role）](#section-0353)
- [三、模型与底层（Model &amp; Fundamentals）](#section-0354)
- [四、Prompt 工程（Prompt Engineering）](#section-0355)
- [五、Agent 架构（Agent Architecture）](#section-0356)
- [六、Harness 组件（AI Agent 能力模块）](#section-0357)
- [七、Loop 工具（自动化编排与自主进化）](#section-0358)
- [八、工具生态（Tool Ecosystem）](#section-0359)
- [九、评估与安全（Evaluation &amp; Safety）](#section-0360)
- [十、AI 工程演进路线（Evolution）](#section-0361)
- [AI Agent 工作原理](#section-0362)
- [AI Agent 的三大核心组成](#section-0363)
- [AI Agent 的类型](#section-0364)
- [工作流程：ReAct 循环](#section-0365)
- [用一个完整例子来跟踪这个循环](#section-0366)
- [Python 中实现 AI Agent](#section-0367)
- [感知模块 —— Agent 的&quot;眼睛和耳朵&quot;](#section-0368)
- [实例](#section-0369)
- [决策模块（大脑）—— Agent 的&quot;指挥官&quot;](#section-0370)
- [实例](#section-0371)
- [行动模块 —— Agent 的&quot;执行者&quot;](#section-0372)
- [实例](#section-0373)
- [记忆模块 —— Agent 的&quot;工作笔记&quot;](#section-0374)
- [工具模块 —— Agent 的&quot;瑞士军刀&quot;](#section-0375)
- [实例](#section-0376)
- [实践练习：构建一个简单的命令行 AI Agent](#section-0377)
- [实例](#section-0378)
- [总结与展望](#section-0379)
- [下一步学习建议](#section-0380)
- [AI 底层架构](#section-0381)
- [核心名词释义](#section-0382)
- [AI Agent 完整运行流程](#section-0383)
- [Agent 架构](#section-0602)
- [什么是 Agent 架构](#section-0603)
- [架构一：单 Agent 循环（Single Agent Loop）](#section-0604)
- [工作原理](#section-0605)
- [实例](#section-0606)
- [架构二：规划 + 执行（Plan &amp; Execute）](#section-0607)
- [两种变体](#section-0608)
- [实例](#section-0609)
- [架构三：多 Agent 协作（Multi-Agent）](#section-0610)
- [独立上下文是核心优势](#section-0611)
- [实例](#section-0612)
- [架构四：反思与自我修正（Reflection）](#section-0613)
- [两种实现方式](#section-0614)
- [实例](#section-0615)
- [架构五：RAG + Agent（检索增强型智能体）](#section-0616)
- [与普通 RAG 的关键区别](#section-0617)
- [实例](#section-0618)
- [架构六：工作流编排（Workflow / DAG）](#section-0619)
- [纯 Agent vs DAG 工作流](#section-0620)
- [实例](#section-0621)
- [横向对比与如何选择](#section-0622)
- [常见组合模式](#section-0623)
- [常见误区](#section-0624)
- [总结](#section-0625)

<a id="section-0005"></a>
## 大模型应用/算法学习路线

<a id="f-doxcnwW3LqE2mk7WgnUkhMVeHyh"></a>

<p id="f-doxcnEnbKvwjQtNY49ARqa5nlye">制定学习路线时，需要根据基础、学习目标和可投入时间调整顺序。</p>

<p id="f-doxcn5PBFOPg7gq8KTo7imLCjSb"><span>首先是先看岗位，具体可以看笔记：</span><span style="font-weight:bold">大模型岗位介绍部分</span><span style="font-weight:bold">。</span><span>粗略地说：大模型分为算法工程师（前后训练），推理工程师（负责模型推理），应用开发工程师（做agent,rag,垂类应用），数据工程师（准备数据）。但是，现在的趋势是：岗位之间倾向于融合，交叉。</span></p>

<p id="f-doxcnPFgN5OrJnkan6p8WPU5Ieg"><span>比如算法工程师：很多时候要自己做数据。</span></p>

<p id="f-doxcnreGwxtmSjpBb02UeA9nKMd"><span>比如应用开发工程师：Agent,rag这是要专精的，但是很多又会涉及微调，推理框架的。所以现在的趋势是：岗位对于人才的要求是复合型的，多少大家都得掌握。所以这一点告诉我们求职大模型需要广度。</span></p>

<p id="f-doxcnfi7BgcLfIEvImmtJOtUk2c">可以从应用入手，先学习 Agent 与 RAG，再通过实践理解微调、推理框架和前后训练；有余力时深入 PyTorch、算法原理与数学基础。</p>

<p id="f-doxcn5lQx60wOOHQ1gPGtlbOJAf"><span>另外如果你是算法出身，本身就会pytorch，训练微调都做过，那我也是建议你直接转算法啊。那么训练算法，论文就是你的强项，你要深入学习的。当然你需要了解Agent,RAG, 这是你的加分项。</span></p>

<p id="f-doxcnYwvkTuw7MxO05GpF4hGiXc">学习路线需要根据现有基础和目标调整。应用方向可以先学 Agent，再根据需要学习 Attention 与深度学习论文。</p>

<p id="f-doxcnnBn8dmC0c8T3Ks1fXLVgGg">大模型学习路线可分为以下几个部分。</p>

<p id="f-doxcnfW070BczoahG0B1D3UVYpf"><span style="font-weight:bold">Agent, RAG,  后端知识，前后训练，模型推理，行业素养，项目。</span></p>

<p id="f-doxcng2YCw0ltfeoQnJU3Zc1ibb"><span style="font-weight:bold">Agent: </span></p>

<div style="margin-left:25px"><p id="f-doxcnekula0E59iZikbEod2mA9b"><span>1.</span><span style="font-weight:bold">python基础</span><span>： 如果完全没有Python 基础，需要先学语言，找一些0基础快速学习Python 视频（x站搜：python入门零基础），不用过于较真语法，会用就好。因为实测面试上考察python 具体语法的并不多，这里学习是保证你看得懂，改得了代码。</span></p><p id="f-doxcnUKZBL4tZkFygqMvM5D0BNb"><span>2.</span><span style="font-weight:bold">入门了解Agent</span><span>：你需要对Agent 特点，怎么做的有一个印象和概念。可以结合一些Agent的入门介绍视频，比如Tina老师的介绍视频：</span><span><span><a href="https://www.youtube.com/watch?v=qU3fmidNbJE"><span>https://www.youtube.com/watch?v=qU3fmidNbJE</span></a></span></span><span>。</span></p><p id="f-doxcnJbXwMcXaDmrNABGGsuDunb"><span>清华大学出版社的《AI Agent开发与应用 - 基于大模型的智能构建》这本书质量不太行，但是好处是特简单，容易读懂上手，也有一些很简单的Agent的例子。也可以通过这个例子去上手。</span></p><p id="f-doxcnOqf4YXkKpS7NJ5Urylszke"><span>了解Agent是啥后，可以跑一个100行左右的Agent代码，调用通LLM， 来感受一下这个过程，比如你跑跑这个例子：</span><span><span><a href="https://zhuanlan.zhihu.com/p/1922809649868022076"><span>https://zhuanlan.zhihu.com/p/1922809649868022076</span></a></span></span></p><p id="f-doxcnstwDTtMlhydIn5fSpprfcd"><span style="font-weight:bold">3.MCP/Function call：</span><span> 了解这俩是啥，常见概念，可以对照本节去看。依然推荐Tina老师入门MCP 视频:</span></p><p id="f-doxcnEOlFQKK7kqRoxmTRuVFwcd"><span><span><a href="https://www.youtube.com/watch?v=kOhLoixrJXo"><span>https://www.youtube.com/watch?v=kOhLoixrJXo</span></a></span></span></p><p id="f-doxcnjhWQxdZSxpS2YsMD6EYEmB"><span>其实YT有非常多MCP 很好的视频, 讲得很清楚：</span></p><p id="f-doxcn0mpfIYBxhFPl20bwAXgNle"><span>爬爬虾老师讲得也很好：</span></p><p id="f-doxcn9KfAaQZqJ1K92ffucCAeD6"><span><span><a href="https://www.youtube.com/watch?v=McNRkd5CxFY"><span>https://www.youtube.com/watch?v=McNRkd5CxFY</span></a></span></span></p><p id="f-doxcnuSDCSs6LzPbqgm3v7DwtTh"><span>里面介绍了一些MCP 的功能，可以上手去试，去感受。</span></p><p id="f-doxcnQA4MTozit8JgeqwvvnooMd"><span style="font-weight:bold">4. Agent框架。</span><span> 最常见的是Langchain三件套：LangChain, Langsmith,Langgraph，如果没有倾向，就学这个，用这个面试也会问这个比较多。这个网上视频就很多了。</span></p><p id="f-doxcnmkUPVwOWpfZIkMAbO6QbCf"><span>比如入门视频：</span></p><p id="f-doxcnem3PaipulWTaJthoofqSZc"><span><span><a href="https://www.youtube.com/watch?v=1bUy-1hGZpI"><span>https://www.youtube.com/watch?v=1bUy-1hGZpI</span></a></span></span></p><p id="f-doxcncJEcDstJNLlHQ9xRRY5qed"><span>不过这里推荐大家稍微学深入一点，可以在YT里找相关视频。</span></p><p id="f-doxcnvEi0U9XZTlb8pVCFYc0jCh"><span style="font-weight:bold">5.Agent评估方法</span><span>，很重要。本节里有整理，这个常考，所以你要熟练掌握，具体</span><span><span><a href="/posts/agent-learning-15-evaluation-observability/#f-doxcnqrKdVGPbNYY8Xm3Fr8NVkh"><span>八股部分 Agent的性能评估</span></a></span></span><span>里以及里面推荐的参考资料，必须一些Agent的论文（比如美团龙猫的评估），这些都可以作为Agent评估的学习资料。</span></p><p id="f-doxcnbq2tIjxaBOdRVdRwLepQZc"><span style="font-weight:bold">6.Agent设计范式。</span><span> 直接推荐了这本书，把它放在学习路线上，因为它涉及很多面试考点，，它也都有补充，推荐大家阅读，这个网上可以免费看。顺着这本书去读，它其实就串起了Agent应用的各个部分，记忆啊，React啊，跟着它的思路，把Agent的技术掌握了，可以顺着书，一边读，一边搜一些资料。</span></p><p id="f-doxcnIjNHl85DVzfpL26holZAld"><span><span><a href="https://github.com/fzy2012/rhzl-Agentic-Design-Patterns-cn"><span>https://github.com/fzy2012/rhzl-Agentic-Design-Patterns-cn</span></a></span></span></p><p id="f-doxcnmQCTYxAKg8IMXNoyGtLz2f"><span style="font-weight:bold">7. SKILL. SKILL很火，</span><span>已经是必考的了，是26年火起来的。常见的问题：是什么，怎么用，你用SKILL做了啥。本节SKILL章节整理得很全面，本身并不难，怎么学习在SKILL章节有详细介绍和推荐视频。</span></p><p id="f-doxcnKIwRaQ9UgzKcnZgj15mFBM"><span style="font-weight:bold">8. 提示词工程</span></p><p id="f-doxcnVeAuXaFDvxSJC1HN1T2Xue"><span>看Tina老师这一个视频，把它消化好就行, </span><span style="font-weight:bold">思考清楚提示词工程涉及原则和常用策略</span><span>，注意应用到你的工程就好。面试考得少，看完这个视频知道推荐的提示词怎么写，有什么常见策略就行。</span></p><p id="f-doxcnyVBNG3uR2LPooZVRkKOR3e"><span><span><a href="https://www.youtube.com/watch?v=p09yRj47kNM"><span>https://www.youtube.com/watch?v=p09yRj47kNM</span></a></span></span></p><p id="f-doxcn1ELb1NCbP6FSL6NgXAKteh">9. 复杂 Agent 实战：可参考《AI Agent 开发与应用——基于大模型的智能构建》、OpenClaw 或 Claude Code Hackathon 项目，运行代码并分析实现思路。</p><p id="f-doxcnMdSVUuVKbjIBHEwQ5UQiLe"><span style="font-weight:bold">10</span><span>. 理论上经过了上面的学习和沉淀，你已经了解Agent是啥，而且也让大家看了简单的，复杂的Agent的项目，理论上你就可以具备开发Agent项目的能力了。这时你该设计一个项目了，从项目选题，立意，用什么框架开始思考。项目设计就是可以参考openclaw，现有成熟架构，怎么设计RAG 学习案例里的视频讲解有写，思路完全可以复用我们的RAG项目，学会了笔记里的RAG项目，你就按这一套来完成Agent项目。</span></p></div>

<p id="f-doxcn4XsQgPmqj3X2Aiir1vX1bh"><span style="font-weight:bold">RAG: </span></p>

<div style="margin-left:25px"><p id="f-doxcnv0xSmrzCE0C3VUs61WvoQf"><span>1.</span><span style="font-weight:bold">RAG 入门体会</span><span>：还是可以看看视频讲解快速入门。</span></p><p id="f-doxcnDpNOuMdy2qZGeLdGusyyKd"><span>类似快速入门视频很多，大家去搜搜，用个几个小时去理解一下。</span></p><p id="f-doxcn7iTbWRA5RCa9lLCyYG08Zg"><span><span><a href="https://www.youtube.com/watch?v=WWdlme1EAGI"><span>https://www.youtube.com/watch?v=WWdlme1EAGI</span></a></span></span></p><p id="f-doxcnQyGCxVN1rdUkuXAFzcMU4g"><span>不过YT上也有很多人讲解的时候，附带有代码，你可以去找一下，照着它的视频和代码跑一下，入门RAG.</span></p><p id="f-doxcnow4j6SXcIZ7sSZndgYmI6f"><span>2.</span><span style="font-weight:bold">向量数据库</span><span>：了解向量数据库是什么，常见的向量数据库，为什么RAG要用向量数据库？</span></p><p id="f-doxcnPGvdSaYxdanZyrWWrwc69c"><span><span><a href="https://www.youtube.com/watch?v=gl1r1XV0SLw"><span>https://www.youtube.com/watch?v=gl1r1XV0SLw</span></a></span></span></p><p id="f-doxcnDcx1JhIPj0aHakyFIZQAxh"><span>参考书籍包括《大模型RAG实战-RAG原理，应用于系统构建》 不过第一次看可能有点难懂。这个书上也有一节讲向量数据库。</span></p><p id="f-doxcnPxMzEwpRravjcZOEs0OlL0"><span style="font-weight:bold">3.RAG的具体过程和策略:</span></p><p id="f-doxcnQcOpVPrX1XZAVpEwSZ9twc"><span>这个就非常重要了。 整个RAG中涉及的各个步骤，你脑袋里要知道他们是怎么串起来的。 </span><span style="font-weight:bold">知识库准备，切块，召回，召回的优化，以及效果评估</span><span>。这些每一步都很重要，面试最高频考点。</span></p><p id="f-doxcnRHb5C8mwomGwfQcEINa2sj"><span>《大模型RAG实战-RAG原理，应用于系统构建》 这本书都有，本节也照着这个总结的，不过大家可以搜搜RAG深入讲解视频，把这几部分搞清楚，这就是面试最常考的。</span></p><p id="f-doxcnOzz5gWK8n52Icnqj2a9efh"><span style="font-weight:bold">4. RAG新方向</span></p><p id="f-doxcn9HUSOdLXcfND4leUctlXGb"><span>Graph RAG 和Agentic RAG. 可以看一下本节的概念介绍，这是RAG的进阶方向。一般并不是所有岗位都需要特别深入的RAG的，所以这里看是否有余力深入学习，如果你需要从事偏RAG技术的岗位，那是有学习的必要，如果是普通Agent/应用方向，算法方向，那么可以先放一下，先把概念了解。</span></p><p id="f-doxcnS9zfDk1Gfa9L3xrxHakSQd"><span style="font-weight:bold">5. 项目实战</span></p><p id="f-doxcnchiNn2rsLwETfrpYZfFeYg"><span>笔记中有一个RAG项目，就是把RAG的各个环节串起来了。有了上述的理论基础，相信你可以做出来这个RAG项目，就去参考笔记的</span><span><span><a href="/posts/agent-learning-23-learning-cases/#section-0148"><span>RAG项目部分</span></a></span></span><span>吧，可以作为RAG知识的学习扩展，进一步扩展。</span></p><p id="f-doxcnOjBAsPkpUgPPOPF22iTA1b"><span style="font-weight:bold"> 后端知识</span></p><p id="f-doxcnhPW7FvxMzf2roVvayeMluh"><span>对于后端知识的要求。推理岗&gt;&gt;应用岗&gt;算法岗。以应用方向为目标，最好还是知道一些后端知识。 要学的太多了，你们看这个路线也可以看出来的，事情有轻重缓急，根据自己路线定夺吧。</span></p><p id="f-doxcnTyoaxRYCtql05se7avw7sb"><span><span><a href="/posts/agent-learning-24-interview-review/#section-0233"><span>学习方向</span></a></span></span><span><span><a href="/posts/agent-learning-17-production-engineering/#f-doxcnA51rqKpLAzPBYWynzjgtCf"><span>后端内容</span></a></span></span><span>可以认为这样是一个性价比最高的方案。</span></p><p id="f-doxcn4DcPNXCyKkcGkE2yjzJlvg"><span style="font-weight:bold"> 前后训练</span></p><p id="f-doxcn5GBmBnpMuE3dqTrWIEfvZg"><span>其实前后训练这个概念很大了，直接概括了算法同学的工作，里面水也很深。这里的路线还是以应用侧转行到大模型，有余力进阶学习算法的同学的路线来讲解。</span></p><div id="f-doxcnTexOv6Tne5tghbSlwC7kic" style="display:flex;gap:0.5em"><span style="min-width:1.5em">a.</span><div><span>常见的概念：弄清楚前后训练，推理在大模型行业的流程，怎么和应用交互的，前后训练是干啥的，有哪些常见方法，微调，强化学习是干啥，有啥好处。</span></div></div><div id="f-doxcny77Qk4YPJpJCvtnCREo5Mf" style="display:flex;gap:0.5em"><span style="min-width:1.5em">b.</span><div><span>了解面试问题：走一遍流程，不管是微调，还是强化学习，稍微了解下代码，假设真的走一遍，流程是啥，要哪些代码。</span></div></div><p id="f-doxcnXpTgRAYdoNIxDCQkAa2LGc">结合基础概念与完整流程，学习微调与强化学习的实现方法。</p><p id="f-doxcnveftb2sBn77ngyQRYJPADd"><span>好了，接下来路线是你要进阶学习，学好了应用，冲击应用算法，算法工程，算法的岗位，要学的。</span></p><div id="f-doxcnBYGBHvmiuvCXI14MHKRmHd" style="display:flex;gap:0.5em"><span style="min-width:1.5em">c.</span><div><span style="font-weight:bold">深度学习/pytorch：</span><span>我们不求深入，很多学生学深度学习是抱着深度学习书籍，公式学习来的。我们的目的就是入门，因为大模型网络是深度学习经典网络基础上发展来的，所以我们要了解之前的传统网络，前向传播，反向传播的知识。 我们要学习pytorch，是因为这是我们做微调，训练的工具呀。 以快速入门为基础学习。</span></div></div><div id="f-doxcnIPru1PaQ8SamYxb4xwcxje" style="display:flex;gap:0.5em"><span style="min-width:1.5em">d.</span><div><span style="font-weight:bold">现代大模型知识：</span><span>强化学习，SFT等大模型相关后训练方法，这个就不是上面a,b说的概念了，深入原理，pytorch代码，公式学习。</span></div></div><div id="f-doxcn7lzj30HK34VTZpWCwuOK4b" style="display:flex;gap:0.5em"><span style="min-width:1.5em">e.</span><div><span style="font-weight:bold">开源项目/论文：</span><span>c,d打好了基础，那么e就是调研了，为我们实战项目做准备。调研现有项目，人家怎么做的，达到什么目标，怎么评测。</span></div></div><div id="f-doxcn6i1Cmv6GDJiN41mcybsPed" style="display:flex;gap:0.5em"><span style="min-width:1.5em">f.</span><div><span style="font-weight:bold">实战：</span><span>有了上面基础，我们会做一个小的Project，真正去实现强化学习，微调，提升效果，做训练，最后结题写一个小论文，说明你做的事情，方法，评测，参考论文。</span></div></div></div>

<div id="f-doxcnoRK5FEE8aQdGsp2Bpwke3c" style="margin-left:25px"><p id="f-doxcnG3Qbd12EpSUELn9WLqgwoh"><span style="font-weight:bold">推理</span></p><p id="f-doxcnbhaR5kQohFQsiZBaQcOPZd"><span>还是一样的，推理框架需要丰富的后端知识，以及模型推理框架，优化的知识。目前的侧重还是说掌握概念，大体方法。有哪些推理框架，剪枝，蒸馏，量化的概念。不会深入学习和实战。这些概念在笔记：</span><span>模型推理加速 </span><span>都有。</span></p><p id="f-doxcnJ66vVZkg4b80gGUDr7uZxd"><span style="font-weight:bold">行业素养</span></p><p id="f-doxcnO22PgTxwbwjA2s3Js1iwfh">工具使用与行业技术理解也是学习方向，包括 AI Coding 工具、OpenClaw、AI 工作流与论文阅读。</p><p id="f-doxcn6pweAbnxsf7Dst5lHUK1Me"><span>这些问题看似不经意问对吧，</span></p><p id="f-doxcnyWQ9aBdkIVbwjrYNO1WSKb"><span>其实这些问题很重要，体现你的行业素养。比如用什么AI 工具，怎么用的？这是体现你有没有积极拥抱AI，用AI的技巧。比如你使用copilot ,claude code，它们可能各有优势，你有没有了解它们的优势？它们的进阶用法？没有的话，说明你这个使用AI的技巧不行。</span></p><p id="f-doxcnsr1oSwgtQNSaV3hbBxn7Gb"><span>你有没有了解Openclaw?如果你没了解，说明你没有关注行业动态，它作为Agent行业爆款应用，它有哪些特点值得学习？你竟然没去看吗？</span></p><p id="f-doxcnNbP2sVWoKTLKdriSnGL7Jd">开发方向也需要阅读论文，相关原因见论文章节。</p><p id="f-doxcnlu8hGZ2g4kntrUhwxizCBh">以上内容可归为工具使用与行业技术理解。</p><p id="f-doxcnq39pScvFyOWqupwygLh9pd"><span>这块怎么学习，与时俱进吧，抓住动态。</span></p><p id="f-doxcnnyK3UTN8LyMZM0DggS6lTf"><span style="font-weight:bold">项目：</span></p><p id="f-doxcnGVL3FMN5lOVmUBaiNHxyFc"><span>其实所有上述理论的学习，都是要有个项目。</span></p><p id="f-doxcnAqTbks2ew4LPH8xNUoxWQb"><span style="font-weight:bold">应用的项目：</span></p><p id="f-doxcnEmjSogJJGUsbLpPlCQeUdb">RAG 案例涵盖从立项、选题到开发的流程，相关方法也可用于 Agent 项目。</p><p id="f-doxcnprGF5eOrP8NX3K15FQppng"><span style="font-weight:bold">算法项目：</span></p><p id="f-doxcnyEQKrUiFbCVtz6E1khQVmd"><span>在笔记 ：算法0基础学习全记录章节，会记录完整学习算法过程和怎么弄项目，大家直接参考就行。</span></p><p id="f-doxcnYB7poTViq6l1bnCzuf2k7d"><span>所以项目就不多讲了。</span></p></div>


<a id="section-0009"></a>
## 学习顺序：应用起手 → 算法进阶

<a id="f-doxcnUQ12tCloM1KvNtumRxW7Qe"></a>

<p id="f-doxcnVCySieK2nTYfLMFPctpUff"><span>因为自己是从0开始学习大模型的，所以我太知道0基础学习大模型的心得和建议。</span></p>

<p id="f-doxcnyswaRKC5MEJ0hsbJlOoDqc"><span>我以0基础大模型基础为例讲解。</span></p>

<p id="f-doxcnIKsWOAIM4WIAnNBGmCeyXc"></p>

<div style="margin-left:25px"><p id="f-doxcnJMiiLI85VEtZgvVFfNbfbG">学习可以分为两个阶段：阶段一为大模型应用开发，阶段二为算法进阶。</p></div>

<p id="f-doxcnrE2tIMDyOmhOMH3Tn09MCf"><span>原因如下</span></p>

<div style="margin-left:25px"><p id="f-doxcnVvpTX5kDn6YgCUZIwT2mRX"><span>1：</span><span style="font-weight:bold">大模型开发是最容易入行的</span><span>。</span><span style="font-weight:bold">我不想一开始就学习算法，深度学习，训练，本身更难，算法天然门槛更高，所以应用起手，先入行。</span></p><p id="f-doxcnsZvT6tZU7hpeDrBUmNOIXb"><span>2. </span><span style="font-weight:bold">学习算法进阶。</span></p><p id="f-doxcnskuO1iYZFlUhXHW3d2WzHf"><span>从另一个角度来说，即使你只是想从事大模型开发，学算法对于你找大模型开发也有帮助，有时开发岗也会问部署的东西，算法的东西。包括大模型这个行业，其实算法，部署，应用，都建议懂一些，所以如果学有余力，学习算法也是有必要的。</span></p><h4 id="f-doxcnI8nuxotKOjV7nzqh5QtT4c"><span>2.1 阶段一：应用起手</span></h4><p id="f-doxcnoLGDxMZMJmkhvP8reufvtb"><span>1. </span><span style="font-weight:bold">知识理解</span><span>：</span><span><span><a href="/posts/agent-learning-09-rag-data-processing/#f-doxcnsZ4peAEntDyq2uX1N9Z8sf"><span>Agent</span></a></span></span><span>,</span><span><span><a href="/posts/agent-learning-09-rag-data-processing/#f-doxcnOspsOYkiNJ5Uzwk5mqunxh"><span> RAG</span></a></span></span><span>, </span><span><span><a href="/posts/agent-learning-18-training-inference/#section-0188"><span>LLM模型结构</span></a></span></span><span>，</span><span><span><a href="/posts/agent-learning-18-training-inference/#f-doxcnNvLD1VEv7wd4rMPrtcMnkg"><span>模型微调</span></a></span></span><span>，</span><span><span><a href="/posts/agent-learning-18-training-inference/#section-0212"><span>推理加速</span></a></span></span><span>，</span><span><span><a href="/posts/agent-learning-19-ai-coding/#f-doxcnVbAhixOjVklrZC8b07PFrK"><span>AI通用素养</span></a></span></span><span>。</span></p><p id="f-doxcnKLFrK21sy5er2em2m9lQWh"><span>，让你知道面试问到了怎么说，包括总结的如何做微调，如何做部署，</span></p><p id="f-doxcn29h8HD0dLUvx3UxsxX4rlg">结合笔记、书籍与参考资料学习，遇到不理解的内容时阅读对应资料。 <a href="#section-0005"><span>参考资料说明</span></a></p><p id="f-doxcnCF3HHSINpEkMMJo26TsKoh"><span><span><a href="#f-doxcnSGwy04FTILSjkSf0uRHgNV"><span>论文部分</span></a></span></span><span>： 这块不多，总结了2篇。防止面试官问你有没有看过什么论文，分享一下。具体看了面试怎么回答，总结的都有。</span></p><p id="f-doxcn9k2UZSpPts9kIqQSyQ2Tlh"><span>2.</span><span style="font-weight:bold">项目。</span><span>自己做项目或者找现成的项目扩展方向。笔记里有：</span></p><p id="f-doxcnPDwAVvfvFAB9VMA2mbR1we"><span><span><a href="/posts/agent-learning-23-learning-cases/#section-0148"><span>RAG项目</span></a></span></span><span>，有全套资料，面试真题，可以参考。</span></p><p id="f-doxcnWB02pHbhn6a7wTNa2wNT1f"><span><span><a href="/posts/agent-learning-23-learning-cases/#f-doxcn2UuVdw5tRU20F4G5ZRs1Kh"><span> Agent项目</span></a></span></span><span>。</span></p><p id="f-doxcn67dZTutfLZMuW31fwJKtWh"><span><span><a href="/posts/agent-learning-18-training-inference/#f-doxcnH4LTSdRSP70XiVy6y1Mnp7"><span>算法项目</span></a></span></span><span>。作为拔高项，设计SFT, 强化学习，部署。没时间不学算法当然也可以。</span></p><p id="f-doxcnoNOA08X3uk0u6x6nw7UMlg"><span>这两个可以参考和借鉴，可以直接拿来用。不直接用里面也有非常多的思路，如何做项目，怎么设计，项目设计哪些东西。</span></p><p id="f-doxcnKAC2vWM4UIixnrjle9zYde"><span>同时有一些开源项目供大家参考，笔记里也有解析：</span><span><span><a href="/posts/agent-learning-21-open-source-architectures/#f-doxcnFOWnBrl5Ak7OWmNe0UzNBc"><span>PI-Agent</span></a></span></span><span>. 这个项目特别适合于，你学习完了以后，自己看一下Agent的小项目，学习，研究，改造，甚至是封装成自己的项目，因为这个项目又小又权威，而且给了丰富的扩展机制供你扩展。</span></p><p id="f-doxcnpGS6a8PWsE375dYeemVuVd"><span>这三个东西 </span><span><span><a href="/posts/agent-learning-21-open-source-architectures/#f-doxcnc8YH0bvC3K6RFin6B4JnIh"><span>Hermes</span></a></span></span><span>, </span><span><span><a href="/posts/agent-learning-21-open-source-architectures/#f-doxcnfdqX7Xmgd1YRp2zV5utl0e"><span>Openclaw</span></a></span></span><span>, </span><span><span><a href="/posts/agent-learning-19-ai-coding/#f-doxcnsn7d9qpY3k8HwjWSe13GAb"><span>ClaudeCode</span></a></span></span><span>。特别是ClaudeCode，笔记里有大量资料讲解，包括面试真题也在使用ClaudeCode讲解，这三个也得看，看一下行业最火的Agent怎么实现，对你的面试和设计特别有帮助。不过提醒就是这些架构很复杂，别想着可以一下子吃透。建议是先学笔记的PI-Agent部分，再去CC,Openclaw,Hermes.</span></p><p id="f-doxcnrkz7AaLFwcFwJWJqoGSpPe"><span>结合这些项目，思路，设计一个自己的项目。</span></p><p id="f-doxcnQGVwBfFah7dz7ayjz2XMfc"><span>3.</span><span><span style="font-weight:bold"><a href="/posts/agent-learning-24-interview-review/#f-doxcnJ4E1M79zoyccqerrnU9Rze"><span>面试真题</span></a></span></span><span style="font-weight:bold">。</span><span>提供了大量的面试真题，包含讲解和解析。包括项目部分，其实也有对应面试真题，比如RAG项目真题，每个知识讲解里面也穿插着真题，看一下真题，自己复述一下，表达一下。里面所有真题答案的总结思路就是你学习笔记的总结，他们是呼应的，用真题可以检验你学的好不好，考前突击，模拟面试。</span></p><p id="f-doxcnkkAIXrQZQ6C7PHacvlZB9b"><span><span><a href="/posts/agent-learning-24-interview-review/#f-doxcn4Wm3DDBJn4i59xiOMw5Asc"><span>面试技巧章节</span></a></span></span><span>，也可以看看。写了怎么自我介绍，反问问什么的面试技巧。</span></p></div>

<p id="f-doxcnRF4CqXVv45ivdHXBNaH21g"><span>一些问题说明：</span></p>

<p id="f-doxcnvC1IBSHivEq7dSQOvIfc1d"><span style="font-weight:bold">重点</span><span>：</span></p>

<p id="f-doxcnAHkB4XvInDycgAVc5wcXOe"><span>T0: 大模型应用，最高频/常考的是：</span><span><span><a href="/posts/agent-learning-09-rag-data-processing/#f-doxcnsZ4peAEntDyq2uX1N9Z8sf"><span>Agent </span></a></span></span><span>+ </span><span><span><a href="/posts/agent-learning-19-ai-coding/#f-doxcnVbAhixOjVklrZC8b07PFrK"><span>AI综合素养</span></a></span></span><span>（Vibecoding, CC，Harness,SKILL)</span></p>

<p id="f-doxcnjdleQA9VffSTMNYRbabZGc"><span>T0.5: </span><span><span><a href="/posts/agent-learning-23-learning-cases/#section-0148"><span>RAG</span></a></span></span><span>.</span></p>

<p id="f-doxcnjlvOKFIxCuE0wMSyQQLXAc"><span>这些建议必学，深入学习。</span></p>

<p id="f-doxcn3U0sDDnADwiUdhiTRX6iIc"><span style="font-weight:bold">你可能的疑问，后端没学吗？</span></p>

<p id="f-doxcn0duzegWQTl6CrLgn8jX02g"></p>

<p id="f-doxcnebfidgaTkbGlCEkRNE0nrd"><span>这块是一个偏好了，如果你想继续提高竞争力： 你可以</span><span style="font-weight:bold">深入学习算法（后训练）， 也可以学习后端。</span></p>

<p id="f-doxcnekh3cOgQllICnoaB9qO0Gc"><span>学后端，对于大模型应用让你更有竞争力，不过也会让你不能去面试一些算法的岗位，而且面试官问到你微调，强化学习，也答不深。</span></p>

<p id="f-doxcndegiEj71SFiEQIL5NZE0jh"></p>

<a id="f-doxcnQHwc1j09cwKC1Yb9s02vph"></a>

##### 阶段二：算法进阶

<p id="f-doxcn9W8Ne8IXclCOX0F44LmnDf"><span>算法学习其实大家看这里：</span><span><span><a href="/posts/agent-learning-18-training-inference/#f-doxcnH4LTSdRSP70XiVy6y1Mnp7"><span>0基础学习算法记录。</span></a></span></span></p>

<p id="f-doxcnkHVALQStSiljpdI50oCfCg"></p>

<p id="f-doxcn0OxXLwasV1sYiM74rnEyde"><span>不过你真想学算法，在这个</span><span><span><a href="/posts/agent-learning-18-training-inference/#f-doxcnH4LTSdRSP70XiVy6y1Mnp7"><span>0基础学习算法记录。</span></a></span></span><span> 里面设置的三个SKILL，里面包含了大量教纲，有算法的各种知识：Pytorch/深度学习， 强化学习/微调， 开源项目。你顺着学。</span></p>

<p id="f-doxcnXIqK981BwVEZg5m8ihCQuh"></p>

<p id="f-doxcneptX5DuMMDgGCRS6hRJkhc">大模型算法学习可以按照概念与流程、深度学习与 PyTorch、现代大模型后训练方法、开源项目与论文、实战与评估的顺序进行。</p>

<p id="f-doxcn7pjao4aCfjMpXo84DlpS7g"><span>有了这个项目，可以把算法这个项目扩展方向在Agent中。所以笔记里 RAG, AGENT, 算法项目各一个，可以相互灵活搭配。</span></p>

<p id="f-doxcnqz7yRaUEwsfX068YMLZTEe"><span>做完算法项目，也许8月份，开始做一个复杂，高级的Agent项目。用我一年所学功力，做个深入的项目，结合面试高频趋势，设计项目。这个项目也会开源。做完后。</span></p>

<p id="f-doxcnxAc7fQprkZdBTKAWGmDkkd"></p>

<p id="f-doxcnTu5c2HqYbbudYIpa6Tao8d"><span>当然啊，不是所有人都有很长时间学习，如果你时间赶，就以项目为主，先弄项目，知识别学那么深了，有了项目才能面试。给面试多留一些时间，一边面试，一边复盘。有些同学也是这么做的，毕竟时间紧，想速成。</span></p>

<p id="f-doxcnRPnCHWt2pKDPMApDKQLfue"></p>


<a id="section-0010"></a>
## 大模型岗位介绍

<a id="f-doxcnmNoI51xql9aRjUj0VVQF6n"></a>

<p id="f-doxcnhvxAjwtyOZn8haKY1ajYeb"><span>大模型的岗位主要分成：</span><span style="font-weight:bold">算法工程师，开发工程师，数据工程师，推理工程师，垂直领域微调工程师</span><span>。</span></p>

<p id="f-doxcnDbEhETeNr8ztR7gIgw6Xpg"><span>大模型的整个链路：</span></p>

<p id="f-doxcnst9fyR6xgCoTtvc2uGeDBg"><span style="font-weight:bold">数据 → 训练/对齐 → 评测 → 推理部署 → 应用落地 → 监控迭代</span></p>

<p id="f-doxcnaKzQU6CJJXRYVZhpFJ0Kug"><span style="font-weight:bold">大模型算法工程师</span><span>：含金量最高 / 天花板最高。深度依赖数学、训练与架构能力，少而精，对个人技术上限要求最高。</span></p>

<p id="f-doxcnzfnhP6cezP8xbkEZnM2xVc"><span style="font-weight:bold">大模型推理部署工程师</span><span>：最稀缺、工程壁垒最高。解决“模型怎么跑得快、跑得稳、跑得便宜”，强后端 + 系统 + GPU，能直接决定线上成本与性能。</span></p>

<p id="f-doxcnldAyrs9FtrzDLsALUn62pb"><span style="font-weight:bold">大模型数据工程师</span><span>：最容易被低估、但不可或缺。做数据通常被认为是脏活累活，话语权也低。门槛比开发低。</span></p>

<p id="f-doxcnorGj9o2nj2ArqWwzXFOgme"><span style="font-weight:bold">垂直领域微调工程师：</span><span>最贴近行业、最容易做专家化。把通用模型变成“法律/医疗/金融专家”，拼的是领域理解 + Prompt / 微调经验，越做越值钱。</span></p>

<div style="margin-left:25px"><p id="f-doxcnVdFK2NtK1ocFDkKAJS8K2g"><span>以下岗位介绍内容，是清华大学出版社的：《大模型工程面试》 - 算法原理，开发，实践与系统部署。</span></p><hr id="f-doxcncF3wl7j9iLHZN3mJw5Bczy"/></div>


<a id="section-0011"></a>
## 算法工程师

<a id="f-doxcn0tsUm3amjf2T8Ac3DbQQeg"></a>

<p id="f-doxcnQ0AkRrxDX0cVLcN46eSapg"><span>大模型算法工程师是大语言模型技术体系中的核心岗位之一，主要负责模型的结构设计、算法优化、训练流程管理以及性能评估等工作。该岗位通常要求具备扎实的深度学习理论基础与丰富的实践经验，能够从算法层面出发，构建具备通用能力、可扩展性的模型体系。</span></p>

<a id="f-doxcnIUqTAqp535ef7vGj13Elag"></a>

##### 岗位定位和核心职责

<p id="f-doxcnTpubmAgYPQyMsslfEmvfZf"><span>在实际工作中，大模型算法工程师通常参与以下核心环节：模型架构设计与优化、训练任务定义、任务目标建模、损失函数调整、训练策略制定（如优化器选择、学习率调度等），以及训练过程的监控与效果分析。</span></p>

<p id="f-doxcnUg8bvb0jdffV5BjcXO0zmf"><span> 部分高级岗位还需参与算法创新，如设计新的注意力机制、稀疏结构或低秩模块，用以提升模型效果与表达能力。</span></p>

<a id="f-doxcnC2kH0YwLYE5CNYqQfWF8Qg"></a>

##### 关键技术能力要求

<p id="f-doxcnz6kKbAMrW703Jj7kkoTWFf"><span>（1）</span><span style="font-weight:bold">深度学习理论基础</span><span>：掌握深度神经网络结构、前向与反向传播机制、梯度计算与参数更新原理。这些是算法工程师进行模型设计的基础。特别是对 Transformer 架构的结构细节、注意力机制、位置编码等要素需具备深入理解。</span></p>

<p id="f-doxcntehwOARJFRvRiiS3mOrXie"><span>（2）</span><span style="font-weight:bold">主流训练范式掌握</span><span>：熟悉预训练–微调范式的各阶段任务设计，包括自监督目标（如语言建模、掩码建模）、指令微调、强化学习阶段（如人类反馈训练）。需了解如何根据任务特性制定合理的训练目标与数据配比。</span></p>

<p id="f-doxcnKd7UmYf8MKOfatfibtULKb"><span>（3）</span><span style="font-weight:bold">大规模训练优化经验</span><span>：具备在分布式环境下进行模型训练的能力，熟悉数据并行、模型并行、混合精度训练、梯度累积、ZeRO 优化等常用方法，能够在高效利用资源的同时保证模型性能。</span></p>

<p id="f-doxcnmFm1LaKU684yoUMcvY59Jc"><span>（4）</span><span style="font-weight:bold">算法调优与性能分析</span><span>：能够通过 Loss 曲线、梯度变化、参数分布等指标分析模型训练状态，判断是否出现梯度爆炸、收敛异常或过拟合问题。具备调参经验，如 Dropout 设置、正则化手段、学习率调整等。</span></p>

<a id="f-doxcnz9eS5gWTchEiggOHIGWisb"></a>

##### 典型工作流程

<p id="f-doxcneuVX3VDYHbwGqymgpJwpjd"><span>（1）</span><span style="font-weight:bold">任务理解与模型设计</span><span>：根据任务目标（如通用对话、代码生成、知识问答等），确定模型规模、结构类型（编码器、解码器、编码解码混合），以及预训练目标等核心设计决策。</span></p>

<p id="f-doxcn4HWwEsJ52gZ7bsXAbN36be"><span>（2）</span><span style="font-weight:bold">数据适配与样本处理</span><span>：参与设计 Tokenization 策略，构造多轮输入格式，划分训练集、验证集，并进行数据清洗与分布分析，为训练提供质量保障。</span></p>

<p id="f-doxcnFmifdjCi2xos8CjIbFDiwb"><span>（3）</span><span style="font-weight:bold">训练调试与性能迭代</span><span>：在训练过程中监控模型的损失变化、准确率、泛化能力等关键指标，适时调整训练参数，诊断异常现象，从而改进训练策略。</span></p>

<p id="f-doxcnlvUo20CEyIl1JJAWlRAgYc"><span>（4）</span><span style="font-weight:bold">评估验证与结果产出</span><span>：基于验证集与测试集进行定量评估，如 BLEU、ROUGE、Accuracy、Perplexity 等指标，并结合人类评价对任务表现进行定性反馈。</span></p>

<p id="f-doxcnuwfiyD1gm67K1Fbn81c7Ig"><span>（5）</span><span style="font-weight:bold">算法报告与优化闭环</span><span>：撰写算法设计文档，记录训练流程、参数配置与调优历程，为版本迭代与团队协作提供文档支撑。</span></p>

<a id="f-doxcnpy3LK75C3U4ebyAdtWIjtf"></a>

##### 常见技术工具与平台

<p id="f-doxcn6VDrvoFB8b5Z1kDbpn8x2f"><span>该岗位常使用的深度学习框架包括 PyTorch、TensorFlow，训练平台包括 DeepSpeed、ColossalAI、Megatron、MindSpore 等。分布式调度工具如 NCCL、Horovod、Ray 为常见组件，此外还需掌握用于可视化的工具，如 TensorBoard、Weights &amp; Biases、Matplotlib 等。</span></p>

<p id="f-doxcnVua1sUs2qfeXzItgi4STte"><span>在工程实践中，算法工程师还需与平台团队协同解决内存调度、模型并行、训练失败容错等底层工程问题。</span></p>

<a id="f-doxcnBdxtlAye9bYCGq6azIECig"></a>

##### 岗位价值与方向发展

<p id="f-doxcnmsjnuPBfLyHzS9pejPmjNb"><span>大模型算法工程师作为 AI 技术研发链条的源头角色，其贡献直接影响模型能力的上限与智能水平。随着模型复杂度与多模态需求的提升，该岗位的技术门槛与决策权重同步上升。</span></p>

<p id="f-doxcnLycjzKyre2B92k07K06bLd"><span>在发展路径上，该岗位可向算法科学家、高级研究员、模型负责人等方向进阶，也可拓展至智能体系统构建、通用 AI 架构设计等更具系统性与前瞻性的技术领域。在实际岗位竞争中，具备工程能力与算法创新能力并重的复合型人才将更具优势。</span></p>


<a id="section-0012"></a>
## 大模型开发工程师

<a id="f-doxcnDzyrZqisWKi3nqqra6gg3d"></a>

<p id="f-doxcnR4yxgtEtwKxZDKw6yhLCUb"><span>大模型开发工程师主要承担大模型在工程化过程中的实现、封装与平台集成任务，是连接底层算法研究与上层应用系统的关键岗位。该岗位的工作重心在于将已有的大模型能力通过可调用接口、模块化组件、服务化架构等方式封装起来，使其能在实际业务中高效、安全、稳定地运行。</span></p>

<a id="f-doxcnsoZYca5HfKY5z13BILqOjc"></a>

##### 岗位定位与职能边界

<p id="f-doxcnd85lhZuvUrvhKpwc3LdAAh"><span>在大模型的生命周期中，开发工程师通常介入模型推理服务搭建、接口 API 封装、前后端调用、缓存机制设计、任务调度实现、多模型集成、模型评估体系建设等多个工程层面，是大模型应用落地的直接执行者与系统支撑者。</span></p>

<a id="f-doxcnrM0deLCJUfLmWl6QQTnDad"></a>

##### 关键技术能力要求

<p id="f-doxcnIJNtPOBVqP3i6Ux30ga3gR"><span>（1）</span><span style="font-weight:bold">大模型调用与封装能力</span><span>：需具备使用主流框架（如 HuggingFace Transformers、OpenAI API、ChatGLM、Qwen 等）加载并调用大模型的能力，熟悉 Prompt 构造、Token 控制与输出解析等细节。</span></p>

<p id="f-doxcnOmbeKPrTgvuSKs3DSKHqBy"><span>（2）</span><span style="font-weight:bold">推理服务部署与优化经验</span><span>：能够完成本地部署、云端部署及容器化部署，掌握 Docker、Conda、Kubernetes 等工具，熟悉推理性能优化（如 KV Cache、批处理、并发控制）。</span></p>

<p id="f-doxcn9xdQ3FGmm4XMnLtUajEcnh"><span>（3）</span><span style="font-weight:bold">系统架构与微服务设计能力</span><span>：了解 Web 系统与微服务设计理念，能基于业务需求完成模块划分、服务拆分、任务路由与模块协同，实现 RESTful 接口设计、模块解耦、异常处理、日志记录等系统级能力。</span></p>

<p id="f-doxcnzTtQwnOvJmI5TH68VBrGTd"><span>（4）</span><span style="font-weight:bold">任务调度与控制逻辑构建</span><span>：负责构建智能体或多模块系统中 Prompt 调用的状态机、上下文管理模块、历史信息追踪与决策逻辑，确保多轮交互、插件调用、RAG 融合等高级功能具备良好扩展性。</span></p>

<p id="f-doxcn0CbCF6dnaEYHq2wbHRRZxg"><span>（5）</span><span style="font-weight:bold">工程代码质量与可维护性</span><span>：具备良好的代码组织、测试覆盖、日志记录与错误处理能力，能够对模型调用链路中的每个步骤进行模块化、抽象化处理，提高系统可扩展性与稳定效率。</span></p>

<a id="f-doxcn6Msu5go5miZBChkY24cl8e"></a>

##### 典型工作流程

<p id="f-doxcnmcAXtQUJd28mXvz8rajz8e"><span>（1）</span><span style="font-weight:bold">模型能力接入与封装</span><span>：从算法工程师或开源模型处获取模型权重与接口文档，完成模型加载、Prompt 输入格式适配、Token 编码处理，并对输出内容做结构化封装，形成标准可调用服务接口。</span></p>

<p id="f-doxcnoeEdWfTHjKsi3IBzaymJPb"><span>（2）</span><span style="font-weight:bold">模型服务化与性能优化</span><span>：通过 FastAPI 或 Triton 部署推理服务，结合负载均衡、缓存策略与请求分流机制，构建支持高并发、低延迟的服务体系。</span></p>

<p id="f-doxcnrsJiB5apGaH0Np4N4z0uL3"><span>（3）</span><span style="font-weight:bold">功能集成与系统设计</span><span>：将大模型能力嵌入业务流程或系统中，构建智能问答、代码生成、文档摘要等应用场景。对接 RAG 系统、知识库、搜索引擎、数据库等外部模块，完成数据驱动与结果增强。</span></p>

<p id="f-doxcnk4AjHFVdWo8a153CjQUoEe"><span>（4）</span><span style="font-weight:bold">多模型管理与调用路由</span><span>：设计统一模型管理接口，实现多模型版本切换、上下文状态路由、多语言模型选择、跨任务模型组合等能力，保障多样化业务需求的灵活响应。</span></p>

<p id="f-doxcnU29hP53SOOFyFdqyhJzdFe"><span>（5）</span><span style="font-weight:bold">系统监控与异常处理</span><span>：构建模型调用链的健康监控体系，包括响应时长统计、异常次数记录、内存使用跟踪等，结合 Prometheus、Grafana、ELK 等工具构建可视化监控看板与日志系统。</span></p>

<a id="f-doxcne0uBIRDnIqqFOAWxDhGH2c"></a>

##### 常用技术工具与平台

<p id="f-doxcnQ7k7ouZwOIjbqK51tUnd0c"><span>大模型开发工程师常用的核心语言为 Python 和 Go，主要框架涵盖 Transformers、vLLM、FastAPI、Triton、Flask、LangChain 等；数据处理与缓存机制中常使用 Redis、MongoDB、SQLAlchemy 等工具；</span></p>

<p id="f-doxcnAdgEkmDPnWotHvIaaYJudc"><span> 在模型服务容器化方面，需熟悉 Dockerfile 构建与镜像管理流程；对于大规模部署，还需了解 Kubernetes、Nginx 反向代理、服务网关等相关技术。</span></p>


<a id="section-0013"></a>
## 大模型数据工程师

<a id="f-doxcniqSVBaJqvPbkfcahSryzuc"></a>

<p id="f-doxcnfgL7rW0sbuIuwFgVgUaarf"><span>在大模型系统中，数据工程师是支撑预训练、微调与推理各阶段的底层力量，负责数据的采集、清洗、结构化、存储与分发，是整个模型生命周期的数据保障者。与传统数据分析岗位不同，大模型领域的数据工程师需要处理的是大规模、高维度、多模态的非结构化数据，不仅要解决数据可用性问题，更要保障数据对模型训练效果的正向支撑。</span></p>

<a id="f-doxcnWYq8i9wlurK1t0irSC8zdg"></a>

##### 岗位定义与职责核心

<p id="f-doxcnXvZsFhrArASCWh9DZgkGZg"><span>岗位主要职责包括：搭建数据获取与处理流程，构建高质量训练语料，设计分词策略与 Token 机制，实现分布式数据加载优化，建立数据版本与可追溯机制，支持多语言与多模态数据并行处理等。在真实工程场景中，数据工程师的工作直接影响模型训练效率、性能表现及微调的效果边界。</span></p>

<a id="f-doxcn7kgj1CxduzRwmc7JxXlapc"></a>

##### 关键技术能力要求

<p id="f-doxcnILD1Vo0fcpz8CYxfayk34f"><span style="font-weight:bold">（1）大规模文本数据处理能力</span><br/><span> 需要掌握海量文本数据的清洗、去重、切分与规整等操作，熟练使用正则表达式、文本处理库、分布式文件系统等工具，能够在百万到数十亿级文本样本中构建符合训练标准的语料。</span></p>

<p id="f-doxcnf3zBZfA7JtpbujjL6Nlezg"><span style="font-weight:bold">（2）分词与 Token 机制理解</span><br/><span> 熟悉常见分词器（如 BPE、SentencePiece、WordPiece），掌握 Tokenizer 构建、词表训练、Token 长度分布控制、文本对齐机制等关键技术。能够根据中文、英文及多语言任务需求选择合适的分词策略。</span></p>

<p id="f-doxcn3p1y0uRntr7PoLihJXYgng"><span style="font-weight:bold">（3）数据增强与样本构造经验</span><br/><span> 具备使用反事实生成、数据混合、格式转换、指令生成等手段进行样本增强的能力，能够围绕对话、问答、生成、翻译等任务构造标准训练样本，提升模型泛化能力。</span></p>

<p id="f-doxcnU0W8xwbqBfykX6KkKASXsb"><span style="font-weight:bold">（4）分布式数据加载与预处理优化</span><br/><span> 在大模型训练中，数据加载速度直接影响整体训练效率。工程师需熟悉 DataLoader 优化、Sharding 机制、缓存策略、异步加载与数据流水线设计，避免数据成为训练瓶颈。</span></p>

<p id="f-doxcnbwN8SrAsfJDlbQ1UNwGjgc"><span style="font-weight:bold">（5）多模态与多语言数据处理能力</span><br/><span> 随着大模型向图像、音频、视频等模态扩展，数据工程师需具备将多模态数据转换为统一编码输入的能力，如语音转文本、多语种语料对齐等，并构建统一的数据格式供模型使用。</span></p>

<a id="f-doxcnO5T5loBksWbKTFgh91kX3g"></a>

##### 典型工作流程

<p id="f-doxcnleX6siXf8vxGj1dKHBMX7g"><span style="font-weight:bold">（2）数据清洗与格式规整</span><br/><span> 统一文本编码，清除特殊字符与冗余标记，处理 HTML 标签、异常断句与乱码等，并根据任务需求完成多轮清洗。</span></p>

<p id="f-doxcnGeQL8uJKkLCwZtjdpJz3vd"><span style="font-weight:bold">（3）数据切分与 Token 统计</span><br/><span> 将长文本切分为适合 Token 限制的段落，统计样本平均长度、分布范围、最大 Token 数，设置上下文窗口，确保模型输入不溢出并具备语义连续性。</span></p>

<p id="f-doxcnDdVqc6LxjzU9Ju1KsQ7WSg"><span style="font-weight:bold">（4）训练样本构造与增强</span><br/><span> 结合任务目标构造训练样本，如为问答系统设计包含 Prompt、Query、Answer 结构的样本，为 RLHF 构建带有偏好标注的数据，或构造 Few-shot 示例序列。适时进行样本增强，对抗样本添加等方法提升模型鲁棒性。</span></p>

<p id="f-doxcnhFyPrRdUAaNM5zNMCjYxfp"><span style="font-weight:bold">（5）数据版本管理与溯源机制</span><br/><span> 每次训练数据的构建过程均需记录版本号、处理脚本、时间戳与来源，确保模型结果可回溯、可复现，便于后期调参、复训与问题追踪。</span></p>

<a id="f-doxcnJB1xGbIWwTZAcbQwyjnx4d"></a>

##### 常用技术工具与平台

<p id="f-doxcnSRynMVtzgDFvPBGgDLbtag"><span>大模型数据工程师常用语言为 Python 和 Bash，主要处理工具包括 Pandas、Datasets 库、HuggingFace Tokenizer、spaCy、OpenCC、Jieba、NLPAug 等。分布式数据处理场景多使用 Spark、Flink、Ray 等；数据管理平台包括 Airflow、MLflow、DVC、Delta Lake 等。</span></p>

<p id="f-doxcnGlpgzLtZiQhR40mljEUk9E"><span>对于特定语料（如代码、法律、医学数据），还需具备专业领域数据理解能力，进行精细化的结构映射与语义分类。对于多模态数据，则需配合图像标注工具、语音转文本引擎等完成前期处理。</span></p>

<a id="f-doxcn3ma9mDWRTLQMfRRuxokAib"></a>

##### 岗位价值与发展方向

<p id="f-doxcnrIingwLXoiamxFF8zt9dcf"><span>数据工程师是支撑大模型构建的基础力量，其工作成果决定了模型学习能力的上限与泛化能力的边界。在当前数据驱动为核心的模型发展趋势下，该岗位的重要性持续提升。</span></p>

<p id="f-doxcnTLoZ4NaQDsyrOsZvRemJYe"><span>未来，数据工程师的发展方向包括复合的数据架构设计者、大模型训练的数据管道构建者、专注于安全与对齐的数据质量管控专家，以及承担合成与任务数据生成责任的 “Prompt 数据工程师”等角色。随着大模型对数据精度、结构与任务匹配度要求不断提高，具备算法理解与工程能力融合背景的数据工程师将在模型研发团队中扮演愈发关键的角色。</span></p>


<a id="section-0014"></a>
## 推理工程师

<a id="f-doxcnat2tkhLBzeI59NWWaT1ind"></a>

<p id="f-doxcnS7qK6QdUqjyFIVJHcqjoIh"><span>推理部署工程师是大模型工程体系中负责模型上线、服务发布与推理性能优化的关键岗位，主要任务是将训练好的大语言模型从离线环境转换为可在线调用的服务接口，并在推理过程中保证系统的稳定性、可扩展性与高性能响应。</span></p>

<p id="f-doxcnLoEWxMT5MjqNzNJPCPQXnh"><span>与算法工程师负责模型训练不同，推理部署工程师更为关注如何在有限算力下实现最优推理效率、如何在多端场景中稳定运行模型，以及如何将模型能力集成进实际应用/系统中。</span></p>

<a id="f-doxcnU02eFAkQ2fejJiKDO7qkzf"></a>

##### 岗位定位和核心职责

<p id="f-doxcnvFFVSKGCEgVHwfSfJCTrOf"><span>该岗位通常需要与算法、开发、系统运维、安全团队紧密协作，在模型格式转换、量化/硬件适配、服务封装、资源调度等多个层面形成闭环工作流，是大模型从实验室走向落地的最后“一公里”执行者。</span></p>

<a id="f-doxcn9T8r4MH1VNwTv5qgQDUJtb"></a>

##### 关键技术能力要求

<p id="f-doxcn0ZeDXTUsNqaZMtNLCwyHKc"><span style="font-weight:bold">模型格式转换与兼容性适配</span><span>：掌握主流模型格式之间的转换流程（如从 PyTorch 转 ONNX、TensorRT、vLLM 格式），理解不同部署框架对模型结构支持的差异，能够进行图优化与结构裁剪，确保模型在目标平台可顺利加载并运行。</span></p>

<p id="f-doxcn6SnyOQgR4dNb8d67gIumHf"><span style="font-weight:bold">推理精度加速与性能优化</span><span>：熟悉推理阶段的常见加速方法，包括半精度计算（FP16）、量化计算（INT8）、稀疏矩阵加速、KV缓存机制、Batch 合并处理、多线程异步调用等，能够根据模型特征选择最合适的推理路径，以实现吞吐与响应时间的优化平衡。</span></p>

<p id="f-doxcn6cdFwpAxaefZpnGShLUQIb"><span>多卡部署与资源调度：掌握多卡部署的通信机制与并行调度策略，了解模型并行、流水并行与张量并行的基本逻辑，能通过 NCCL、TorchRun、DeepSpeed 等工具实现横向扩展能力，熟悉 CUDA 资源管理，显存分布与 GPU 负载监控等底层细节。</span></p>

<p id="f-doxcnm792jOhAfiPwdzwfJx8xRb"><span style="font-weight:bold">服务封装与接口管理</span><span>：具备使用 FastAPI、Flask、Triton、BentoML 等构建模型服务接口能力，能够完成 API 路由管理、请求参数解析、Token 长度控制、错误响应处理、调用日志收集等，保障部署服务具备高可用性与可维护性。</span></p>

<a id="f-doxcngJPIJnDYoLXrZWaFzz4Wig"></a>

##### 典型工作流程

<p id="f-doxcnPvNtdQJKfLEgN2MqBFP4Dh"><span style="font-weight:bold">模型接收与格式标准化</span><span>：从算法工程师处获取已训练完成的模型及配套配置文件，完成必要的格式转换与静态图构建，并对输入/输出结构进行标准化处理，适配部署框架要求。</span></p>

<p id="f-doxcnOSoEb3A4eGjQn1s7KH5rmd"><span style="font-weight:bold">推理引擎选择与性能测试</span><span>：评估部署场景对性能的需求，选择合适的推理引擎（如 ONNX Runtime、TensorRT、vLLM、DeepSpeed Inference 等），并结合测试脚本对不同部署方案进行 Latency、Throughput 等关键指标测试与对比分析。</span></p>

<p id="f-doxcnkO4VnWezR85ggSCJR49BHq"><span style="font-weight:bold">服务封装与线上部署</span><span>：基于选定的推理方案，使用 FastAPI 或 Triton 封装模型服务，设置并管理推理接口参数、配置多进程并发机制，实现可扩展的线上服务部署，并进行 Docker 化与持续集成配置。</span></p>

<p id="f-doxcnhdK0yjqYzPRC72mDTxu9wg"><span style="font-weight:bold">资源调度与运行监控</span><span>：根据模型资源需求配置合适的 GPU 或混合 CPU‑GPU 部署方案，设置 Prometheus 与 Grafana 完成推理链路的全量监控，定期检查系统负载、运行日志与异常警告，确保服务运行稳定。</span></p>

<p id="f-doxcnNXhVfDP7q6NjnH494DYQUg"><span style="font-weight:bold">优化迭代与问题修复</span><span>：基于真实调用数据与用户反馈，持续优化模型响应路径与服务性能，解决兼容性问题、性能瓶颈和异常问题，以满足业务增长的需求。</span></p>

<a id="f-doxcnYbC1z3cHgCKiDIzlyCwqid"></a>

##### 常见技术工具与平台

<p id="f-doxcnjTLIm7mCPGtU2DFY6MGJ5d"><span>推理部署工程师常使用的核心工具包括：</span></p>

<p id="f-doxcn7pwgA5guqjx0RbTdqn4O5b"><span>（1）</span><span style="font-weight:bold">格式转换工具</span><span>：ONNX Exporter、TorchScript、TF Converter。</span></p>

<p id="f-doxcnTFJDp2n1rfHchTqZblzGgg"><span>（2）</span><span style="font-weight:bold">推理框架</span><span>：TensorRT、ONNX Runtime、vLLM、Triton Server、DeepSpeed Inference。</span></p>

<p id="f-doxcnCNXQywuNGLi87Rnb1PES0d"><span>（3）</span><span style="font-weight:bold">服务封装工具</span><span>：FastAPI、Flask、BentoML、gRPC。</span></p>

<p id="f-doxcnTadr0kc8r4KSOeRiocjg6W"><span>（4）</span><span style="font-weight:bold">容器与部署</span><span>：Docker、Kubernetes、NVIDIA Docker、Nginx。</span></p>

<p id="f-doxcnGrVIRq03Ye449j8xdmElDc"><span>同时，还需熟悉 </span><span style="font-weight:bold">Linux 环境下的 GPU 调度、CUDA 工具链、Python 后端逻辑编写与 HTTP 接口设计等</span><span>。</span></p>

<a id="f-doxcnGCobpeA79gLRut8OjRepKh"></a>

##### 岗位价值与发展方向

<p id="f-doxcnndXPXVWdOKG5sGcQ2YQrwd"><span>推理部署工程师是保障大模型从理论能力到实际服务转化的关键角色，承担将模型高效、安全、稳定部署至生产环境的责任。其专业性不仅体现在工程实现效率上，更体现在对系统稳定性、性能可控性的理解与掌控中。</span></p>

<p id="f-doxcnOGNx98ZhEHi6UmuAIWuQ6g"><span>随着边缘部署、模型压缩、多模态推理、低功耗计算的快速发展，该岗位将逐步向“系统级优化工程师”“AI 基础设施工程师”“多模型编排调度专家”等方向拓展，成为 AI 工程体系中不可替代的关键节点。对于追求工程深度与系统稳定性的技术人员而言，推理部署工程师是一个技术挑战性与价值感兼具的发展路径。</span></p>


<a id="section-0016"></a>
## FDE（前线部署工程师）

<a id="f-doxcnk946sCWqaUWj0SZBkK26Uc"></a>

<p id="f-doxcnLoRpue87uSUXyKiZKcdfhf"><span>FDE 通常是 Forward Deployed Engineer 的缩写，可译为“前线部署工程师”或“前线交付工程师”。Palantir 的完整岗位名称还常写作 Forward Deployed Software Engineer。国内部分材料将其解释为 Field Deployment Engineer 或“前沿部署工程师”，但这并不是该岗位最常见、最准确的英文来源。</span></p>

<p id="f-doxcnQ4kt0icYXUJuTt2UekcaNf"><span>FDE 是</span><span style="font-weight:bold">直接面对客户的软件工程师</span><span>，位于客户业务、产品能力与工程交付的交叉点。它并非简单地安装部署模型，而是深入客户现场，从模糊的业务问题出发，完成需求发现、方案设计、软件开发、系统集成、上线验证与持续迭代，</span><span style="font-weight:bold">对最终的客户业务结果负责</span><span>。</span></p>

<a id="f-doxcniTyNzW000QPD9SPt8kPvPc"></a>

##### 岗位起源与发展背景

<p id="f-doxcnirWbtKcl6KR57EXrEGCTck"><span>FDE 这一岗位模式通常被认为</span><span style="font-weight:bold">发源于美国企业软件公司 Palantir</span><span>。Palantir 成立于 2003 年，FDE 在公司创立早期、即 </span><span style="font-weight:bold">2000 年代初期</span><span>便伴随其业务模式逐渐形成。由于 Palantir 将复杂的数据分析平台交付给政府、金融、制造、航空等非纯技术客户，单靠标准产品和使用培训无法解决客户的复杂问题，因此需要工程师直接进入客户环境，一边理解业务，一边利用平台开发解决方案。</span></p>

<p id="f-doxcnGIlJFYNcSF9GsotHBRpLne"><span>这一岗位并非生成式 AI 出现后才诞生。它已在 Palantir 等企业软件公司存在二十年左右，但在 2023 年生成式 AI 商业化加速后重新受到关注。大模型、Agent 和数据平台的能力越来越复杂，而传统企业往往缺少把这些技术接入自身数据、权限、流程和业务系统的能力，FDE 因而成为连接“模型能力”与“业务结果”的关键角色。</span></p>

<p id="f-doxcnT8CfrYdB7aXjhTHucTwBWb"><span>在国内，与 FDE 相似的工作过去并非不存在，往往分散在售前解决方案、客户工程师、驻场开发、AI 交付和行业解决方案架构师等岗位中，只是较少统一使用 FDE 这一名称。随着 2023～2024 年国内大模型厂商、云厂商和企业客户开始批量探索大模型应用，市场先产生了“如何把模型落到业务里”的职能需求；到 2025 年前后，越来越多公司开始直接采用 Forward Deployed Engineer/FDE 的岗位名称；2026 年上半年，伴随 Agent 商业化和大厂集中发布招聘，该名称在国内招聘平台、自媒体和求职讨论中明显升温，成为所谓“突然火起来”的新岗位。</span></p>

<p id="f-doxcnMZdXWsXO0mRXz4B9i4bjVd"><span>因此，“FDE 在国内什么时候出现”和“什么时候火起来”需要区分：类似职能早已存在，</span><span style="font-weight:bold">2023～2024 年是需求形成期，2025 年是岗位名称加速引入和扩散期，2026 年上半年是公众认知与招聘讨论的集中爆发期</span><span>。当前在火山引擎、腾讯云及其他 AI 公司的招聘中，可以看到 FDE、现场部署工程师、AI 解决方案工程师等名称。但目前缺少权威机构按年份统计国内 FDE 岗位数量的数据，网络流传的“需求暴涨多少倍”等说法不宜直接当作行业统计结论。</span></p>

<a id="f-doxcnAdVupf0yyFItkL3IB7OZvg"></a>

##### 岗位定位与职能边界

<p id="f-doxcnOKkSgPc29cGiYwOK1taiTd"><span>（3）</span><span style="font-weight:bold">软件工程师</span><span>：亲自完成原型、代码、数据接入、系统集成、测试与交付，将方案变成能够运行的软件，而不是止步于咨询报告或演示文稿。</span></p>

<p id="f-doxcnVBAEpdgVX3H4uNZsBen12e"><span>**FDE 不等同于售前解决方案工程师。**售前通常在签约前完成产品介绍、方案设计和 POC Demo，目标是证明产品能力并推动成交；FDE 往往从需求发现一直参与到生产交付、实际使用和效果验证。**FDE 也不等同于传统实施或驻场运维。**如果工作内容主要是安装软件、配置后台、处理工单，而不需要定义问题、编写代码和交付生产方案，则更接近传统实施，而非严格意义上的 FDE。</span></p>

<p id="f-doxcncsBd70C4eCPw5wBR60XbVe"><span>FDE 强调端到端负责，但不表示所有工作都由一个人完成。商务报价与合同通常由销售负责，通用平台由核心研发团队负责，底层模型训练由算法团队负责，生产运维也可能由平台团队配合。FDE 的核心责任是跨越这些团队之间的断点，持续推动一个高价值客户问题被真正解决。</span></p>

<a id="f-doxcnohquuWOsgXLHGbAgqvCOif"></a>

##### 关键能力要求

<p id="f-doxcngq17djaLGzAiVLh643bIye"><span>（1）</span><span style="font-weight:bold">客户发现与业务抽象能力</span><span>：能够访谈业务人员和管理层，梳理角色、流程、数据、指标与约束，从“客户说想要什么”继续追问到“客户为什么需要它、成功如何衡量”。FDE 最重要的沟通能力往往不是能说，而是主动倾听、追问和建立信任。</span></p>

<p id="f-doxcnMV8MyqJ2exaI3VTj2tAcwg"><span>（3）</span><span style="font-weight:bold">端到端软件工程能力</span><span>：具备实际编码和构建能力，能够围绕特定客户的问题开发解决方案，而不是只写方案或制作售前演示。交付时需要考虑代码是否完整、可能出现的异常和边界输入，以及客户能否正确使用。</span></p>

<p id="f-doxcnG16LKYMTRUtrnkIzty0FMe"><span>（4）</span><span style="font-weight:bold">大模型应用能力</span><span>：能够搭建和调试 Agent，进行提示词调优，并根据客户业务接入 Skill、MCP 等能力。FDE 不一定负责训练基础模型，但需要理解模型和 AI 产品如何应用到客户场景中。</span></p>

<p id="f-doxcnTheXQEGD3b97GfdEILmn5d"><span>（5）</span><span style="font-weight:bold">系统对接能力</span><span>：能够根据项目需要，将 AI 应用与客户的数据库、OA、业务系统和内部工作流程连接起来。具体使用什么语言、框架和部署工具，取决于所在公司的产品与客户环境，现有资料没有给出统一技术栈。</span></p>

<a id="f-doxcnadJrb1HHQo7iGMDzqlwXEe"></a>

##### 典型工作流程

<p id="f-doxcngbk709yr9qdGuP8MWiCbRy"><span>（1）客户发现：访谈客户管理层和一线人员，观察实际流程，梳理现有系统、数据与关键指标，不急于根据客户提出的第一个需求直接开发。</span></p>

<p id="f-doxcnPnLi8ggU2UcatXkGNPKjwT"><span>（2）问题定义与方案选择：把业务问题转化为可验证的任务，明确范围和预期结果，判断公司的模型、Agent 或平台能力如何与该问题结合。</span></p>

<p id="f-doxcnopH7OLhs6bPvOLT2gRCxig"><span>（3）POC 与价值验证：快速构建原型，用客户真实或脱敏数据验证技术可行性及业务价值。POC 不是终点，而是降低风险、确认方向的阶段。</span></p>

<p id="f-doxcnNrLnaEeoh8IGkx9n6rjivc"><span>（4）落地交付：将方案与客户的数据、数据库、OA 或其他业务系统进行对接，完成必要的开发与调试，使其能够解决客户的实际问题。</span></p>

<p id="f-doxcn29ODt2lRAYMTp3cqnvcB5e"><span>（5）上线与迭代：培训用户、观察使用情况，结合业务指标、模型评估和用户反馈持续优化。项目结束后，将重复出现的问题和能力反馈给产品团队，推动产品标准化。</span></p>

<a id="f-doxcnLOdqSrbnR651JEPP42yifh"></a>

##### 技术能力要求

<ul><li id="f-doxcnUagehl8B3LRilwVy9a2Phh"><span>大模型基础与模型落地能力；</span></li></ul>

<ul><li id="f-doxcnISAvix0bd1P49hzihZ4oRc"><span>Agent 的搭建、定制和效果调试；</span></li></ul>

<ul><li id="f-doxcno9jn13P7L9JpVYRG1LxrUI"><span>Skill、MCP 等能力的接入；</span></li></ul>

<ul><li id="f-doxcnxdgp5L8s1ioH7EWcpyxmjf"><span>数据库、OA、企业业务系统与工作流程的对接；</span></li></ul>

<p id="f-doxcnuhzSfZzjHVBl452ESlc6gg"><span>其中，英文访谈将 FDE 直接定义为“面向客户的软件工程师”，并强调最终交付物应当是软件。因此可以确认 </span><span style="font-weight:bold">FDE 需要开发能力</span><span>，但不能仅根据这些资料进一步断言所有 FDE 都必须掌握某套传统后端、云原生或分布式技术栈。具体工具应以目标公司的产品形态和岗位描述为准。</span></p>

<a id="f-doxcnxWhF9KekxqCJXoUgqbTVib"></a>

##### 前景、机会与风险

<p id="f-doxcn6IcdVmJdVNc0T0x1uOVdLh"><span>从中短期看，FDE 受益于企业 AI 商业化。模型能力正在快速商品化，但企业的数据、流程、权限和行业知识无法完全标准化，能够把复杂技术转化为真实业务成果的人才仍然稀缺。尤其是向传统行业销售复杂 AI 产品的模型厂商、云厂商和 ToB AI 公司，更需要这类岗位。</span></p>

<p id="f-doxcn1tawgsIwArkm02fTjxrfSd"><span>从长期看，只要“复杂技术产品面对非技术客户”这一问题持续存在，FDE 的职能就不会消失。其发展方向主要有两类：一类是把项目中的共性需求沉淀为产品平台，走向 AI 产品、产品工程或解决方案架构；另一类是深耕金融、制造、医疗、零售等垂直行业，成为行业 AI 交付专家、行业架构师或业务负责人。职业成长通常体现为负责范围扩大：从完成一个问题，逐步发展到独立负责一个客户、一个行业、一个区域或更大规模的业务。</span></p>

<p id="f-doxcnpkK610SfaQRnoNBRE2kHmf"><span>该岗位也存在明显风险：工作职责杂、需求不确定、客户压力大、可能频繁出差或驻场，并同时承受销售、客户与研发团队的压力。如果公司缺少成熟产品，FDE 容易退化为无止境的定制外包；如果工作只包含安装配置和售后支持，则技术成长空间有限。因此面试时应重点确认是否需要编写生产代码、是否参与问题定义、是否负责从 POC 到上线、成果能否沉淀回产品，以及考核指标是交付工时、签约金额还是客户业务结果。</span></p>

<a id="f-doxcneKDastSgCzVCv7YCJoaKof"></a>

##### 适合人群与职业匹配

<p id="f-doxcnOExHrKcWmAXKGgYEe5c0Kf"><span>（1）有产品意识的后端、全栈或大模型应用开发工程师，不满足于只接收需求写代码，愿意接触客户并理解业务价值。</span></p>

<p id="f-doxcnfbtNRt2OkhjDtKrMrZ9eic"><span>（2）技术动手能力较强的产品经理、解决方案架构师或咨询顾问，能够进行需求分析和客户沟通，并愿意补齐编码与工程交付能力。</span></p>

<p id="f-doxcnZssvALxqj7YjdF19p9UWed"><span>（3）传统实施或售前工程师，已经熟悉企业客户和项目推进，但需要进一步掌握大模型应用、软件开发、系统集成与生产化能力。</span></p>

<a id="f-doxcn1uS200Hzkhfx1LQVEkI7oe"></a>

##### 以 FDE 为目标时，本学习资料的学习重点

<p id="f-doxcnbXim9vQXUfZHiY95depODf"><span>本学习资料以大模型应用开发为主线，与 FDE 的技术底座高度重合，但不能完整覆盖 FDE 所需的客户与业务能力。建议按以下优先级学习：</span></p>

<p id="f-doxcnd98nmWX5gCyLEnRpMZDR5g"><span style="font-weight:bold">第一优先级是 Agent、RAG 与项目实战。</span><span>重点掌握 Agent 的基本机制、Function Calling、MCP、LangChain/LangGraph、RAG 全链路、向量数据库、混合检索、Query 处理、记忆、权限、安全、成本控制与 Agent 评估。FDE 不仅要会调用模型，更要能说明为什么选择某种架构、效果如何衡量、失败时如何定位。</span></p>

<p id="f-doxcnRIOgeTWzVnAQHOyNSvWBNg"><span style="font-weight:bold">第二优先级是构建和交付能力</span><span>。重点看“大模型开发工程师”“RAG 项目实战”“Agent 项目实战”，训练自己从业务问题出发搭建 Agent，并完成数据库、外部能力或业务流程的接入。至于是否进一步学习 API 设计、Docker、云端部署等内容，应根据具体 FDE 招聘要求决定，不能将其视为所有 FDE 的统一必备技术。</span></p>

<p id="f-doxcncye9yAoJIkLkrij5KFh2c4"><span style="font-weight:bold">第三优先级是模型选型与大模型全链路认知</span><span>。需要理解不同模型的能力、成本、延迟和上下文限制，了解 Prompt、RAG、微调之间的选择逻辑；Transformer、SFT、强化学习、量化和推理框架以理解原理、能够与算法及平台团队协作为目标，不必像算法工程师一样优先深入公式和训练细节。</span></p>

<p id="f-doxcn653miapi3SRP3I22PBCKOf"><span style="font-weight:bold">第四优先级是 AI Coding、Skill 与行业素养</span><span>。FDE 经常需要在客户现场快速构建原型，熟练使用 Claude Code、Codex 等工具以及 Vibe Coding/Harness 方法，可以显著提高交付速度。但必须能够审核代码、补充测试并承担结果，不能只会让模型生成代码。</span></p>

<p id="f-doxcnvRTqh3YO3gs2tRZv4u1eJg"><span style="font-weight:bold">三是企业交付，包括 POC 设计、项目范围管理、数据合规、安全、遗留系统集成和用户培训</span><span>。</span></p>

<p id="f-doxcnDnA4DgTge6Zjwu1LlFiyjf"><span>最好选择一个真实行业场景完成项目：先描述业务流程和基线指标，再设计 AI 方案，使用真实约束完成 POC、评估与生产化，并记录方案取舍和业务结果。这比单纯堆叠 Agent、RAG、MCP 等技术名词更符合 FDE 面试要求。</span></p>


<a id="section-0017"></a>
## 不同岗位技术侧重点和面试技巧

<a id="f-doxcnkBvZD8m2WFuN5cUnmAJFxe"></a>

<p id="f-doxcn6l6zF6JvLHFQBC0SZ1RXk8"><span>大模型相关岗位虽都围绕同一类核心技术展开，但在实际职责、技能要求与评估重点上存在显著差异。了解不同岗位的技术关注点，有助于应聘者制定有针对性的备考策略，从而在面试过程中有效展现能力优势与岗位匹配度。</span></p>

<a id="f-doxcn4mnmIxhHHTheVPT5b3RyQ0"></a>

##### 大模型相关岗位的能力维度差异

<p id="f-doxcnU6DXPAn7Kg9yPxPXtZ3P7b"><span>整体来看，大模型相关岗位可分为六类：算法工程师、开发工程师、数据工程师、推理部署工程师、垂直领域微调工程师和 FDE。每一岗位对技术深度、系统理解、工程实现、客户协作或行业知识的要求和面试考察方式也有所差异。</span></p>

<a id="f-doxcn3pfDef3voJMQPIaJM7jlGd"></a>

##### 岗位技术侧重点分析

<ul><li id="f-doxcnMg9uqrOIJgkWypTZTQ1FMe"><span>算法工程师：该岗位强调对模型架构、训练机制、优化策略的深度掌握，技术考察通常集中于 Transformer 结构细节、自注意力机制、训练范式（如预训练、微调、RLHF）、梯度更新原理与算法创新能力。具备扎实的数学基础与科研阅读能力是加分项，常涉及论文复现、模型重构、Loss 函数调优等实战题。</span></li></ul>

<ul><li id="f-doxcnSnOwDnNUJWcc14XWv0VFyd"><span>大模型开发工程师：该岗位更注重工程实现与系统集成能力，重点考察模型封装、API 接口设计、任务调度、状态控制、上下文缓存、日志系统等模块开发能力。熟悉 FastAPI、LangChain、Triton 等框架，能够独立搭建模型服务并实现业务对接是关键能力之一，面试中常通过系统设计题、代码走查和实际部署经验进行评估。</span></li></ul>

<ul><li id="f-doxcnKrc8AhCnPZcw2bAXIKKf9b"><span>大模型数据工程师：该岗位要求具备处理海量文本、设计分词策略、数据增强与 Token 分析能力，尤其强调数据质量控制与处理效率。面试中常考察对语料清洗流程、Tokenizer 构建、分布式数据加载、格式规范化处理等方面的理解与实操能力，可能要求编写数据预处理脚本或解释复杂的样本结构。</span></li></ul>

<ul><li id="f-doxcnOrvsbXS1eeMas8zGSzuHsT"><span>大模型推理部署工程师：该岗位关注模型上线后的服务性能与稳定性，技术重点包括模型格式转换（如 ONNX/TensorRT）、推理加速（如 FP16、INT8）、KV Cache 机制、多卡并行部署与资源调度策略。面试中常要求分析推理延迟瓶颈、设计高并发推理方案，或解释模型在不同引擎上的性能表现。</span></li></ul>

<ul><li id="f-doxcnPsZybSGkhVC5LcCZPMYnKc"><span>垂直领域微调工程师：该岗位强调行业知识、任务定义、数据构造、微调策略和效果评估。面试通常关注 LoRA 等参数高效微调方法、领域数据质量、训练指标、过拟合与模型偏差，以及如何判断微调相较于 Prompt 或 RAG 是否更适合当前业务。</span></li></ul>


<a id="section-0018"></a>
## 学习路线

<a id="f-doxcnt9kuOCZWrItIIEWNCu9XYc"></a>

<p id="f-doxcnarfOaOKisrjRmhb7WjRgpc"><span>了解了上述介绍后，我们在制定学习路线，应该根据自己的背景，专长等实际情况来分析。</span></p>

<p id="f-doxcnwVXapcw8C2RsWo7TP93WSA"><span>其实后端/前端/客户端甚至是测开，测试开发，都可以归类于开发。只是我们之前做的不是大模型的开发。 我预期之前做后端/前端/客户/测开/测试 等的同学们，应该都没有太多深度学习基础。 大模型算法本身要求就比较高，直接转行算法难度太高。数据工程师本身活杂，话语权低，上限也比较低。部署的话，还是需要强后端知识，还有模型知识，这些背景一般开发也没有。 所以本案例选择应用入手。有深度学习背景的同学，之前就做过模型训推，发论文的同学可以考虑从直接转大模型算法，推理工程师。如果有强领域倾向，比如做医疗的，法律行业的同学，可以侧重垂直领域微调方向。如果本身开发基础都比较少，也可以试试从数据工程师角度入手。</span></p>

<p id="f-doxcnVbPHzXZ6ZqWlpNn6xEngrb">应用部分包括 Agent、RAG、Skill、MCP、A2A。算法部分涵盖预训练、后训练与推理部署，以及数据准备、量化、LoRA 微调和强化学习。</p>

<p id="f-doxcnimaPqLdHVxrJTSAaAbq6jh"></p>

<p id="f-doxcnyHYtHY5lb9pWEM0Ad9Adzf">后端相关知识包括 Docker、Kubernetes 和服务部署，可根据学习目标安排在 Agent、RAG 核心技术之后。</p>

<p id="f-doxcn5As68pt3EdmZKh9RSpwTvg">学习目标可以概括为：懂算法、精工程、善部署。</p>

<p id="f-doxcnFBUgEhLHzgvUWoENHqrSUb"><span>      另外一点我想说的是你只学工程（Agent,RAG)， 其实也可以找到工作。但是建议学一下算法，这样上限高，竞争力也更强。如果你时间很紧，也可以趁现在行业发展刚起步，应用入行。 但是咱们有这个意识，以后朝着算法啊，推理部署方向再去靠，入行了再去学，变成综合性人才，或者慢慢转到算法，推理等岗位，上限比纯工程会高很多。</span></p>


<a id="section-0020"></a>
## 后端知识在大模型行业中重要吗？

<a id="f-doxcnyTgXkp2xEMaHRCKRJGelwf"></a>

<p id="f-doxcnoSf10nEMI6qzhEI2DaD2cc"><span>从上面的岗位介绍中，我们可以看出来大模型的某些岗位和后端知识有重叠。比如有的</span><span style="font-weight:bold">应用岗</span><span>要求本地，云端部署，容器化（Docker), Conda, Kubernetes。 而</span><span style="font-weight:bold">推理部署岗</span><span>注重推理服务性能，成本，稳定性。 二者相比，应用岗对于后端虽然重要，但不是必要要求，优先级会低于Agent,RAG 的核心技术栈。 可以在应用知识之后，进一步学习部署、算法或后端。  相比于应用岗，</span><span style="font-weight:bold">推理部署岗位</span><span>明显对于后端要求更高，同样需要Docker,K8s, 但进一步要求推理服务，延迟，吞吐测评，后端是该岗位的核心竞争力。 总结来说，算法岗/应用岗/</span><span style="font-weight:bold">推理岗对于后端能力的要求是</span><span>：</span></p>

<p id="f-doxcnlBPW211IGjmUM3O6EtEJkf"><span style="font-weight:bold">推理部署岗&gt;&gt;应用岗&gt;算法岗</span></p>

<p id="f-doxcn1uqUihn4DCIFT1vbY74Rlf">具体路线需要因人而异。定位纯应用时，学完 Agent、RAG 后补齐后端开发是合理的。也可以进一步学习算法，包括 LoRA 训练、强化学习和推理部署。</p>

<p id="f-doxcnAEQXLYztMHi5FRLH1CvRib">学完 Agent、RAG、Skill、Harness 等应用知识后，可以选择后端或算法方向。算法能力也可以进一步应用到 Agent 项目中。</p>


<a id="section-0021"></a>
## Agent项目浅，如何优化

<a id="f-doxcn4l5jfvYT2KQrIXh2vyTK7e"></a>

<p id="f-doxcn5QcoUmt4z6bltwffAagx2e"><span style="font-weight:bold">案例问题：</span><span>我的Agent项目做得很浅，没有一些复杂的机制，就是简单的意图识别+workflow, RAG部分也是别人做的。</span></p>

<p id="f-doxcn8yTN1IrUBCO1t2ZtgeYxId"><span style="font-weight:bold">回答：</span></p>

<p id="f-doxcnm0vv0TiWVBiuYhDpchrfwf"><span>是的，确实是建议继续深入优化：</span></p>

<p id="f-doxcna1tyIvRg3NKDZSR9ljCo4d"><span>1.从Agent层面。建议引入更多深入的地方。比如记忆模块，长短记忆怎么做的，有没有什么高级策略。 能不能结合一些策略让客服记住长期状态，回答更符合用户特点。能否有一些反思，规划功能。参考本节中推荐的《Agentic design pattern》 的设计模式，能不能加一些高级功能。</span></p>

<p id="f-doxcnQR0hngEI1T4UN4wrrSrBfh">2. RAG：该学习案例中的 RAG 仍可进一步深入。</p>

<p id="f-doxcnMX0jdeYz4snkMOUJzFvxzb">3. 推理优化：结合具体任务分析推理速度、资源开销与可采用的优化方法。</p>

<p id="f-doxcnMxckrcaCDwZqRwGmht0yfd">回答：可以先实际运行一次相关流程，掌握基本概念，再结合问题深入学习。</p>


<a id="section-0023"></a>
## 我的情况可以入行大模型吗？

<a id="f-doxcnkcmPnQDYXyAy6czWcFkaze"></a>

<p id="f-doxcnE7gBxdTopV1ad1thyNbXGg"><span>转型的可行性大吗？心理挺没底的。</span></p>

<p id="f-doxcnUXQIBvluxtx4maIy7vBOBd"><span style="font-weight:bold">回答：</span><span>首先回答你的问题，你一定可以转行的。</span></p>

<p id="f-doxcn9mNKsuVZo3iK5yNejNEm0g"></p>

<p id="f-doxcnqZ8eEzqn8SRQP6GsRE9WDd"><span>从技术角度来说，你要做的是补齐大模型应用相关的知识，文档里都有我就不说了。你从后端开发转到大模型开发，本身你后端开发就多少有一些优势（相比前端，测试，客户端）转到大模型的岗位。 </span></p>

<p id="f-doxcnLik4LukQDs9IoRmzmHM7ic"><span>第三个，你工作才一年。转行这个事情真的是年限越长越难转，一年工作时间，甚至是3年时间，企业对你的包容度都很高的。甚至可以放宽到5年。</span></p>

<p id="f-doxcniIPou12O2dh9AfsmyZMwCV"><span>所以怎么看，可以认为你都不用心里没底啊，更重要的是，这些东西你能不能掌握，能不能把RAG,AGENT等应用知识都学透，甚至是在学好算法，部署，入行真的没有你想的那么难。迷茫的时候就多学一下，当你真正学好了，你去面试了，市场给你答案的时候，你的问题都会解答，而且你会发现做大模型并没有你想象的那么难。而且大模型现在缺口那么大，岗位很多的，你看本节2025年度报告，这么多岗位，你要想的是尽量学好，拿更高的Offer，而不是犹豫能不能入行。</span></p>


<a id="section-0298"></a>
## 专题阅读与文档维护

<a id="f-doxcnSGwy04FTILSjkSf0uRHgNV"></a>

<p id="f-doxcnAG3E4WUEPyOVxJ3gJhgypd">下面从三个角度说明大模型开发中阅读论文的作用。</p>

<div style="margin-left:25px"><div id="f-doxcnXoU36Mpb22oMoYJgcS9q78" style="display:flex;gap:0.5em"><div><span>这点在传统开发领域几乎不会出现，而在大模型方向，即使是应用岗，该问题出现的频率也很高。从清华大学出版社《大模型工程师面试 - 算法原理，开发实践与系统部署中》也讲了，如果以3个维度（刷题，论文和项目）来衡量大模型岗位准备的优先级。推荐顺序为：</span></div></div><div style="margin-left:25px"><p id="f-doxcnKNrfThCfEbVuInxlKKSWdh"><span>校招/初级算法岗：刷题&gt;项目≈论文</span></p><p id="f-doxcn01RYQz4S3UBxrbTHf8rhBR"><span>高级算法岗: 论文&gt;项目≈刷题</span></p><p id="f-doxcn8lcPC9abNuqWYmbEG6dJHd"><span>Agent/Rag 方向开发： 项目≈论文&gt;刷题</span></p><p id="f-doxcnbC4w3kwTGrARa9kV5OlF3f"><span>算法岗就不说了，肯定要看论文的。但是对于开发岗，书上明确将论文和项目放在了同一等级。 至于这个优先级排序，可以认为我们也不用较真，但是可以看出的是，书中明确将论文作为大模型开发方向的一个重要准备方向,也说明了阅读论文的重要性。</span></p></div><div id="f-doxcnakA3anAMTeuC5P1lLskG5d" style="display:flex;gap:0.5em"><span style="min-width:1.5em">b.</span><div><span style="font-weight:bold">确实有用：</span><span> 大模型这个行业发展很快。即使是Agent，有人称2025年是Agent元年，现在2026年，Agent发展也不过一年。行业中以什么样的形式组织Agent，什么样的Agent框架最好，怎么评估Agent这些工程方面的东西，都还在研究和讨论。书和资料更多的是一些基础知识，但是论文上的知识，有的更加先进，代表未来的方向，会给我们不一样的启示。看了很多论文，对我们工程也确实有帮助，比如有的论文写如何选Agent架构，项目的Agents.md如何组织最好这些东西对我们工程最佳实践也有帮助。</span></div></div><div style="margin-left:25px"><p id="f-doxcnyT4xzDpanaGNudRLptB08g"><span>       另外一点是，在我们面试的时候，论文给了我们很多不一样的启发。比如Agent的架构，如果你看了谷歌的《Towards a Science of Scaling Agent System》，在回答Agent架构时，你会有不一样的思维，回答会更出彩。如果你看了《Are Repository-Level Context Files Helpful for Coding Agents?》，你在回答阿里的：有哪些写组织提示词的最佳技巧，会有新的启发。所以他对于我们面试问题，确实能带来实打实的帮助。</span></p><p id="f-doxcnj08poXN2lkU4A2VauZPlBe"><span>你怎么去复习呢：</span></p><p id="f-doxcnghlf9j1JbfrtIFUv443Pqf">1. 通过摘要判断论文是否相关，再进一步通读全文。</p><p id="f-doxcnPxntWvv6tgeRa5Xtwsnzhc">3. 回答中的论文引用可以作为附录和检索入口，进一步阅读原文了解详情。</p><p id="f-doxcnOuXhuPG1y5U5SsmXbL7Hab">4. 选择相关论文阅读并形成摘要，记录其方法与启发。</p></div><h2 id="f-doxcnQ7FvCBaSsoQ1VTduowCjog"><span>1 Agents</span></h2>
<div style="margin-left:25px"><h3 id="f-doxcnH9Nb5ic6vyQ66noGx5Pqyb"><span>1.1 Evaluating AGENTS.md -Are Repository-Level Context Files Helpful for Coding Agents?</span></h3><h4 id="f-doxcnSIRRGhyhuRk9suNrwnWv3c"><span>1.1.1 概述</span></h4><p id="f-doxcnRcMypMeKDqQMnrvEsLTnje"><span>越来越多的开发者/公司为代码仓库写一个 </span><span><span><span>AGENTS.md</span></span></span><span>（或 </span><span><span><span>CLAUDE.md</span></span></span><span>）文件，相当于一份"仓库说明书"，告诉 AI 编程智能体：项目结构概览，用哪些工具（如 </span><span><span><span>uv</span></span></span><span>、</span><span><span><span>ruff</span></span></span><span>)，遵守哪些代码风格，如何运行测试等。OpenAI、Anthropic 等厂商强烈推荐这个做法。截至论文写作时（202602），GitHub 上已有超过 6 万个开源仓库包含此类文件。本篇论文就是在研究，这些东西到底对Agents有没有用？是写的越详细越好吗？有没有可能反而会带来负面影响？</span></p><h4 id="f-doxcnEV6RfeKoeay6lHQt1UQjah"><span>1.1.2 实验方法</span></h4><p id="f-doxcnvx4tBLWEEFCcaYXdDZpprg"><span>论文构建了一个新基准 AGENTBENCH（共 138 个真实 GitHub Issue 任务），选自 12 个小众但有开发者提交的 context file 的 Python 仓库，补充已有的 SWE-bench Lite（300 个任务，这个是目前评测 AI 编程智能体能力的一套测试集）。</span></p><p id="f-doxcnhbnxQxhYqPPE6CZmPpRqme"><span>对 3个主流 Agent（Claude Code / Codex / Qwen Code）测试了三种设置：</span></p><p id="f-doxcn1G2yX0xIZGIopiTN42AaDf"><span>1.None:不提供任何Context File(AGENTS.md CLAUDE.md)。</span></p><p id="f-doxcn24LLkutY2kjwPw5tr9qjoc"><span>2.LLM：按照厂商推荐的指令，提供使用AI自动生成的Context File。</span></p><p id="f-doxcnUMv4fJQ3vKsKZnXyXHSq5f"><span>3.Human:提供开发者手写的Context File。</span></p><p id="f-doxcnF9qwxLCz9AtFuVnCItlv0W"><span>测试方法是对每个PR，给出一个测试用例：&lt;问题描述，PR前的代码仓库，测试集，正确答案&gt;（这个测试集和方式也是 SWE-bench Lite的测试集形式，所以通过这个问题你可以学习了解典型的一种测试AI Coding能力的数据集），让AI完成这个PR。比较AI完成后的问题的：</span><span style="font-weight:bold">任务完成率，成本（总Token消耗），行为分析（工具调用次数，是否遵循了Context File，有没有运行更多的上下文搜索，做更多的测试等）</span></p><h4 id="f-doxcngHedtBIiDthoiHLfH76Cte"><span>1.1.3 核心发现</span></h4><div id="f-doxcni1znQP2Fak41igNkpoU10b" style="display:flex;gap:0.5em"><span style="min-width:1.5em">i.</span><div><span style="font-weight:bold">LLM 自动生成的 context file 反而有害。</span><span>与"不提供任何文件"相比，LLM 生成版本平均使任务成功率下降约 3%，而且推理成本（token 消耗）增加超过 20%，换用更强的模型（如 GPT-5.2）来生成也没有一致改善。</span></div></div><div id="f-doxcnsr3bygzPALBi1lQYEHTZFh" style="display:flex;gap:0.5em"><span style="min-width:1.5em">ii.</span><div><span style="font-weight:bold">人类手写的 context file 帮助极为有限。</span><span>仅带来平均约 +4% 的成功率提升，远低于人们预期。</span></div></div><div id="f-doxcnWkVAlWo4JFZxx1O8o13fnb" style="display:flex;gap:0.5em"><span style="min-width:1.5em">iii.</span><div><span style="font-weight:bold">Agent 确实读取并执行了 context file 中的指令。</span><span>比如 context file 提到使用 </span><span><span><span>uv</span></span></span><span>，Agent 就会用 </span><span><span><span>uv</span></span></span><span style="font-weight:bold">，</span><span>说明效果差不是因为 Agent 忽略了说明书，而是说明书本身加重了任务难度</span></div></div><div id="f-doxcnKh2SC9aIRQ7ROrEiM76Wnc" style="display:flex;gap:0.5em"><span style="min-width:1.5em">iv.</span><div><span style="font-weight:bold">Context file 导致 Agent 行为更"臃肿"。</span><span>Agent 运行更多测试、查看更多文件、写更多文件。GPT-5.2 的推理 token 增加了 22%，说明 Agent 认为任务"变难了"</span></div></div><p id="f-doxcn9W7gXLoLVxu0rnR0ed8aSh"><span style="font-weight:bold">核心假设</span><span>：context file 中包含了大量"非必要要求"，这些额外约束反而让 Agent 在完成核心任务时分心、出错，相当于给 Agent "加了很多不必要的作业"。</span></p></div></div>

<a id="f-doxcnqcqHzn1kEA74n97QLxP2ng"></a>

##### 核心结论

<div style="margin-left:25px"><div id="f-doxcnpx9LnDl4pAru1S5yKK1cXg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">a.</span><div><span>不要用AI自动生成的Context File, 即使是使用厂商推荐的方式生成。</span></div></div><div id="f-doxcnWnAYG6OF3Ua4JUwQCEjrAf" style="display:flex;gap:0.5em"><span style="min-width:1.5em">b.</span><div><span>手写 context file 应只写最少必要信息，比如那些 </span><span style="font-weight:bold">AI 不可能自己猜到、但又必须知道的具体命令</span><span>，例如：工具指定（使用uv而不是用pip)，测试命令（使用Pytest来测试），格式化工具（use ruff来统一格式），仓库特有的命令，脚本。这些东西基本都是能一句话说清楚。</span><span style="font-weight:bold">不要写：工程的目录结构（AI自己可以推测出来），宽泛的要求（保持代码整洁，使用代码现有的风格，这些东西AI在训练的时候已经知道），功能/架构介绍（AI自己会阅读代码，自己写这些会增加它的推理难度，比如分析这个描述的架构和自己读出来的代码架构的关系，是否冲突）</span></div></div></div>

<blockquote id="f-doxcnRSHARj7gEfQZv8hzHArdDe"><p id="f-doxcnDPXF5iaWebjyXq5yfiKLXe"><span>论文的核心解释是：每一条额外要求，都是一个额外约束。AI 会认真履行这些约束，但履行约束本身消耗了注意力和 token，使它在完成核心任务时更容易出错。</span></p></blockquote>

<p id="f-doxcn89O7tSKc6HeEHQl2DRX2le"><span>所以原则很简单：</span><span style="font-weight:bold">少即是多。只写 AI 不得不知道的，其余的让 AI 自己探索。</span></p>

<a id="f-doxcnqZRa5Ngo08vbnQc8ZDc2kf"></a>

##### 对面试的帮助

<div style="margin-left:25px"><div id="f-doxcnoSqKFJW3MpYGsY6oVYg0Ec" style="display:flex;gap:0.5em"><span style="min-width:1.5em">a.</span><div><span>Agent评估：看完了本论文，其实你又可以进一步理解Agents评估。比如本文对Coding Agents的评估维度是：正确率，轨迹路径（调用工具次数，是否遵循了指令，是否阅读了更上下文，做了更多次数），成本(总Token消耗，推理Token消耗）</span></div></div><div id="f-doxcnCVQT06W8vDka5KcaebmVBc" style="display:flex;gap:0.5em"><span style="min-width:1.5em">b.</span><div><span>Agent测试集：业内常见的一种对</span><span style="font-weight:bold">Coding Agents</span><span>评估的测试集：SWE-bench Lite。 它是什么，它的思想是什么？</span></div></div><div id="f-doxcneQW5yXgFvdn5U3asKrgQch" style="display:flex;gap:0.5em"><span style="min-width:1.5em">c.</span><div><span>提示词工程：什么该写，什么不该写？为什么有时写多了反而效果变差了。我以</span><span>阿里夸克千问二面的面试问题（请搜关键字去看对应部分）。</span><span>在我读完这个论文，总结了这个笔记后，我对于当时面试官的问题：如何做提示词的裁剪压缩，就有了一些新的理解，也去扩展了相关答案。 所以其实读完，立刻显现出了它对我们面试带来的收益。</span></div></div><h4 id="f-doxcnqrnElLzzy7itTX3WK1Rxef"><span>1.1.6 阅读建议</span></h4><p id="f-doxcnvVA3ROW4oXHcDtx8PRfwcd"><span>不是特别建议去读原文，甚至去看实验方法和表格。读核心结论和原则就够了，当成一个工程类型的最佳实践规范来阅读。</span></p><h4 id="f-doxcn2PPxYpbLRWAakx1NorZAKc"><span>1.1.7 原文</span></h4><p id="f-doxcn1FDyYNHFEMxdl9fgdJRMBf"><span><span><a href="https://arxiv.org/abs/2602.11988"><span>https://arxiv.org/abs/2602.11988</span></a></span></span></p></div>

<div style="margin-left:25px"><h3 id="f-doxcn7mUY0XO8kN48ysEZsYTl6f"><span>1.2 Attention Residuals</span></h3><p id="f-doxcnk4OiNByqRp2cQdn9KVQ1cg"><span>Kimi 团队发布的论文《Attention Residuals》（注意力残差）提出了一种对深度学习底层架构的根本性创新——</span><span style="font-weight:bold">用注意力机制替换沿用十年之久的传统残差连接</span><span>。该论文一经发布便在全球 AI 圈引发轰动，在 X（原 Twitter）上获得近 500 万浏览量，吸引了马斯克、Karpathy（OpenAI 推理模型之父）等顶级大佬的关注与点赞。OpenAI 研究员 Jerry Tworek 甚至惊呼"我们应该重新考虑之前的一切，</span><span style="font-weight:bold">深度学习 2.0 的时代即将到来</span><span>"。甚至是Kimi公司的估值都从中受益，已涨至 180 亿美元。</span></p><p id="f-doxcndK97Mg9N1UFRe4JdIzFgsg"><span>本身在大模型圈引起轰动的论文就值得我们去学习和关注。另外这个论文是来自中国KIMI团队发布的，更应该引起我们的重视。中国团队比较轰动的论文更该引起我们的注意，这几年来，上一次中国团队的比较轰动的研究属于DeepSeek: </span></p><p id="f-doxcn0fW3SFQNAHAfhUT43ziZNf"><span style="font-weight:bold">DeepSeek 的贡献在于开源模型本身（R1 等），冲击了算力垄断叙事</span><span>。 （DeepSeekR1的训练本节总结的有，对于应用岗位来说是很加分的，因为面试官不懂，觉得你很厉害。不过对于算法岗来说，我估计是基操了。）</span></p><p id="f-doxcnVCA6x0S2d9d7kOSD2DrJpH"></p><p id="f-doxcnqsA68GjryTW3lYdyWIGA2f"><span>如何去学习呢？</span></p><p id="f-doxcnHvoEd1eoK6CsXJMfrvJxTf"><span>      1. 首先本节会以基本上大家都看得懂的形式去讲解，本身是一个深度学习网络结构的研究论文，但我们不是深度学习背景出身的，我们不去探讨公式，掌握它的思想。</span><span style="font-weight:bold">这一点所有人，甚至是产品，你都可以去理解。</span></p><p id="f-doxcnA9RbBRxuQs9oksYbuLCEmd"><span>      2. 对于开发出身的同学，我们这里带一点算法的知识，比如残差网络。这是Transformer中使用的经典结构，即使你是开发，我们一直强调的是多少你还是要知道一点比如模型的结构，算法的知识。最好慢慢向算法深入，所以我们这里带一点网络的知识，我相信开发出身的同学可以看懂，也为我们后面深入学习算法打下一点基础，留一点印象，毕竟学习不是一蹴而就的，而是循序渐进的。</span><span style="font-weight:bold">这一部分建议开发的同学可以理解一下网络结构。</span></p><p id="f-doxcns1UMY3VjABXmtX8yK9ya0e"><span>3. 最后文档总结一些面试的相关问题，你可以拿去说。 思路还是那样，既然我们学了，我们就可以看时机把他讲出来，主动展示给面试官。</span><span style="font-weight:bold">这一部分是所有人，产品/开发都可以去学习，背诵，面试时说的。</span></p><h4 id="f-doxcneILzVaOqZ7XPzQYt3NM1Lg"><span>1.2.1 背景知识  - 残差网络</span></h4><p id="f-doxcnCcSdh0tbUedqQIrtQAQ6xh"><span>因为这个论文是对残差网络进行了改进，所以我们需要先了解一下残差网络是什么。我们不讲深入，因为这不是深度学习的章节，尽量让大家都懂，如果你看不懂，可以结合着AI，搜一下资料理解一下。</span></p><h5 id="f-doxcnrLVOPh084kRWPl6sO9M9te"><span>1.2.1.1 传统残差连接概念</span></h5><p id="f-doxcncyNvQ446bcqYcm4xYeIB5g"><span>2015 年由微软研究员何恺明提出，核心思想极其简单：</span><span style="font-weight:bold">对任意层的函数变换，无条件地将原始输入加回输出。</span></p><p id="f-doxcnkAeteLecuObffgFjzGWkCb"><span>直观效果是不管中间的函数 F 做了什么变换，输出至少保留了输入的原始信息，从而极大缓解了梯度消失问题。网络不再学习完整的映射，而是</span><span style="font-weight:bold">只学习残差（差值）</span><span>，数学直觉告诉我们这更容易学习。</span></p><p id="f-doxcnbhTfTZ80xMTYSLKu8SiUhd"><span>这个结构从原始 Transformer 架构至今基本没有变过——Transformer 中每个子层（Multi-Head Attention、Feed Forward）后面的 </span><span style="font-weight:bold">"Add &amp; Norm"</span><span> 就是残差连接的体现。（以下这个如雷贯耳的Transformer架构图，我们可以看到中间的</span><span style="font-weight:bold">Add &amp; Norm 就是残差连接）</span></p><div id="f-doxcnLxbLRQ0OtqGsiqTrNf6hQc"><img alt="" decoding="async" height="1194" loading="lazy" src="/images/agent-learning/17c1abef8b8018df233a2c0a.png" width="861"/></div></div>

<a id="f-doxcnThtnUyQDZBpGmpXe1CmSoc"></a>

###### 传统残差连接的两大致命问题

<p id="f-doxcnfeHS5mQJJduc1yCcaRx5Bd"><span>传统残差连接的两大致命问题：</span><span style="font-weight:bold">信息稀释</span><span>和</span><span style="font-weight:bold">隐藏状态爆炸</span><span>。</span></p>

<p id="f-doxcnopfVfR9UyiU1jyvHIZ16Db"><span style="font-weight:bold">第一个问题是信息稀释，也就是梯度消失</span><span>。信号在网络中逐层传递，经过几十甚至上百层之后，早期层提取到的关键特征会被不断冲淡，就像一壶好茶被倒了99次之后几乎没有味道了。这导致深层网络根本无法有效利用底层最原始、最重要的信息。</span></p>

<p id="f-doxcn9yMdapgL3DnUZBeEvsAvgd"><span style="font-weight:bold">第二个问题是隐藏状态爆炸，也就是梯度爆炸</span><span>。为了补偿信息在传递过程中的衰减，后面的每一层都会拼命放大自己的输出，结果数据像滚雪球一样越滚越大，最终膨胀到不可控。这就好比水管里的水压不断升高，最终把管道撑爆。在千亿级参数的大模型训练中，这表现为梯度分布极不均匀，模型极度不稳定，甚至直接崩溃，几乎成了限制大模型往更深层发展的"物理魔咒"。</span></p>

<a id="f-doxcne1H6hBAsNxzAXGCLwxY0sg"></a>

##### Kimi 的核心创新：注意力残差

<a id="f-doxcnVnUzKpKTMu9Y6PJbHsLojb"></a>

###### 灵感来源——时间与深度的对偶性

<p id="f-doxcnXmvjmfdZ4nMN6lizh5g1Ib"><span>论文中最优美的洞察在于发现了一个</span><span style="font-weight:bold">对偶关系</span><span>：</span></p>

<p id="f-doxcnwkEj1hw9Si4ZTyoucw9BVf"><span>在</span><span style="font-weight:bold">时间维度</span><span>（序列建模）上，旧方法是 RNN/LSTM 的逐词累加传递，新方法则是 Transformer 通过注意力机制进行加权求和——这一演进已被证明极其有效。</span></p>

<p id="f-doxcnDPcMdR6XTqT5SRnds56gnc"><span>而在</span><span style="font-weight:bold">深度维度</span><span>（层间信息传递）上，情况惊人地相似：旧方法是传统残差的逐层累加传递，Kimi 提出的新方法则是</span><span style="font-weight:bold">注意力残差——用注意力机制对所有前序层进行加权聚合</span><span>。同一套"用注意力替代逐步累加"的升级逻辑，在两个不同维度上都产生了巨大的效果提升。</span></p>

<p id="f-doxcnXR6nW8LcXixrsrK7bObMob"><span>正如论文原文所写：</span></p>

<blockquote id="f-doxcnMpyRZzPnm53k8qFqx86Gae"><p id="f-doxcnmIBc41cV01R4ZJwtu1qXle"><span style="font-style:italic">"时间与深度的对偶性——就像 RNN 在时间维度上的作用一样，残差连接在深度维度上将所有先验信息压成一个单一状态。在序列建模中，Transformer 通过用注意力机制取代循环机制从而改进了 RNN……我们在深度上提出了同样的方法。"</span></p></blockquote>

<p id="f-doxcnZZ08qYVJRDa9GFqMTS2zXf"><span style="font-weight:bold">Karpathy 的评价精准概括了这一思想</span><span>：</span></p>

<blockquote id="f-doxcnyQldfpTZ7zOXeOVSGHFwKd"><p id="f-doxcna3f08z8Rk5hxILYq7HHweh"><span style="font-style:italic">"LSTM 就是将 residual 旋转 90° 得到的。事实证明，注意力机制同样是可以旋转 90° 的。我们是不是没有充分理解 'Attention is All You Need'？"</span></p></blockquote>

<p id="f-doxcnRmUShysfEOfivPjNcS4l4n"><span>（大家理解一下这个旋转90度的概念，其实就是我们把时间上的处理作为横轴，我们引入注意力机制。现在是在网络结构的深度上，我们做手脚，也是引入了类似注意力机制的能力，大家把这个叫做</span><span style="font-weight:bold">注意力机制的旋转90度</span><span>）</span></p>

<div id="f-doxcnuMoqv2VMWcv2UQgQVrmuYd"><img alt="" decoding="async" height="853" loading="lazy" src="/images/agent-learning/193e62fc81d36d39a989edff.png" width="1280"/></div>

<a id="f-doxcnCMsn7yarAwh1sUx6DdOxCg"></a>

###### 方法详解

<p id="f-doxcnEhg9xtFT2TCjYxQzXPkpKe"><span>传统残差中，第 l+1 层只能接收第 l 层的输出并简单相加。</span><span style="font-weight:bold">注意力残差则让每一层拥有"回头看"的能力</span><span>：</span></p>

<ul><li id="f-doxcn65KdwKeSfSNFfl8TNLVVqe"><span>每一层会发出"寻物启事"，到</span><span style="font-weight:bold">前面所有层</span><span>中寻找相关特征</span></li></ul>

<ul><li id="f-doxcneC17SJmgXh1KXCZAEfIrec"><span>通过注意力机制为不同层分配</span><span style="font-weight:bold">不同权重</span><span>，选择性地聚合最有用的信息</span></li></ul>

<ul><li id="f-doxcnzFIzlbgkVuEF09Ii2QPbme"><span>例如：第 50 层可以给第 2 层分配 0.8 的超高权重，</span><span style="font-weight:bold">越级提取最原始特征</span><span>，彻底解决信息稀释问题</span></li></ul>

<a id="f-doxcn5YzLKiSXMEBvxISJBDWSRh"></a>

###### 分块策略——解决计算开销

<p id="f-doxcnPlNFq2bqN6XSrWWFJygGxg"><span>如果每一层都对前面所有层做全局注意力，通信量会瞬间爆炸。Kimi 团队设计了</span><span style="font-weight:bold">分块策略</span><span>：</span></p>

<ul><li id="f-doxcnC0CeeLvjN6bJnWqFVzfEbc"><span>将模型分成若干大区（如每 8 层一个区）</span></li></ul>

<ul><li id="f-doxcnKIkWxEcgVvOU9gafNQF8qd"><span style="font-weight:bold">区内</span><span>：依然使用传统逐层累加并总结出代表</span></li></ul>

<ul><li id="f-doxcnv91YHgkIBwZJ48slb45Flc"><span style="font-weight:bold">跨区</span><span>：启动全局注意力筛选调度</span></li></ul>

<p id="f-doxcn64suoJ4AtDROy8EbrzGjVw"><span>这一设计使得内存开销断崖式下降，</span><span style="font-weight:bold">推理延迟仅增加不到 2%</span><span>，与 QKV 分组等已有高效注意力思想异曲同工。</span></p>

<a id="f-doxcnMpeKXkhfgtYHXtGJlcP0fh"></a>

###### 结果

<p id="f-doxcnfoZoAdNcq8To9LsWmnVRfd"><span>Kimi 团队在 480 亿参数的模型上验证了注意力残差的有效性，结果非常亮眼。在训练效率方面，相比传统残差提升了 </span><span style="font-weight:bold">1.25 倍</span><span>，达到同等性能可节约近 </span><span style="font-weight:bold">20%</span><span> 的计算量。在能力评测方面，考验逻辑能力的 GPQA 多步推理测试中性能提升了 </span><span style="font-weight:bold">7.5 分</span><span>，代码能力也大幅提升。而这些收益的代价极小——推理延迟仅增加不到 </span><span style="font-weight:bold">2%</span><span>。</span></p>

<p id="f-doxcnESo8PdG7Bot4VfXDtWSecK"><span>对 AI 公司而言，这意味着可直接节省数千万美金的训练成本，训练周期缩短数周到数月，超大规模模型能稳定收敛。</span></p>

<a id="f-doxcnKCxE9tRnQcACXftYBl7vgd"></a>

###### 行业启示

<p id="f-doxcnlc6WNWsMf9SZryAgLyWdA0"><span style="font-weight:bold"> 回归第一性原理，敢于质疑基础</span></p>

<p id="f-doxcnhQHAFqlF39gPXYixkbgrLc"><span>残差连接这一沿用十年的"老祖宗"，由于过于基础，渐渐形成了"它就该这样"的固有思维。Kimi 论文证明：</span><span style="font-weight:bold">最基础的部分往往也是最容易被忽略的部分</span><span>，越是"理所当然"的东西，越值得重新审视。创新不仅在上层应用和花哨技巧上，</span><span style="font-weight:bold">动地基往往能带来颠覆性突破</span><span>。</span></p>

<p id="f-doxcnMjxH38V7wEoRbZaGGdXaLb"><span style="font-weight:bold">跨领域迁移的思维方式</span></p>

<p id="f-doxcnAdADMAb4AVlySSsjY8ZEMf"><span>注意力机制已在时间维度（序列建模）上被验证有效，Kimi 团队的洞察在于将</span><span style="font-weight:bold">同一原理迁移到深度维度</span><span>。这种跨领域迁移能力——发现不同场景下公式/结构的相似性——目前仍然是人类独有的直觉优势。正如晓辉博士所评论："如果你没有对数学公式之间关系的直觉，就没有这样一次突破的机会。"</span></p>

<p id="f-doxcnLVP9BU6rCjfYY431f97Dse"><span style="font-weight:bold">中国 AI 的范式转变——从追赶到引领</span></p>

<p id="f-doxcn71zkLGXnqamaVFVaBFq37b"><span>这篇论文打破了"搞 AI 必须砸几百亿美金大力出奇迹"的硅谷叙事。Kimi 团队</span><span style="font-weight:bold">不靠算力碾压，靠精妙数学重构底层架构</span><span>，且成果免费开源，给硅谷疯狂堆叠算力、建立高资金壁垒的商业模式带来巨大挑战。正如海外科技博主 Tuki 所说："AI 竞赛已不是中美之争，而是闭源和开源之争，闭源正在输掉比赛。</span></p>

<a id="f-doxcnyKyD52JlJQ5K2Qod48YEzc"></a>

##### 面试问题

<p id="f-doxcnRh2wWGexRXjMaMUTSBYe0n"><span>我们学了就不白学，学了就是拿去面试问的。也许面试官很少会直接问题注意力残差的概念，但是我相信很多机会，你可以巧妙地用这个素材回答，这就是你展示自己，秀亮点的机会。</span></p>

<a id="f-doxcnh5eQoO97M4wQl99Ph6tr6A"></a>

###### Q1：最近有看什么论文吗？

<p id="f-doxcnutIYgJr4AMPvUS7CYS0ohe"><span>最近读了 Kimi 团队的《Attention Residuals》。这篇论文动了深度学习十年没人碰的底层架构——残差连接。传统残差是逐层把输入加到输出上往后传，层数一多，早期信息就被稀释了。Kimi 的做法是让每一层通过注意力机制回头看所有前序层，按重要性加权聚合，而不是无脑累加。核心灵感来自一个对偶关系：Transformer 在时间维度上用注意力替代了 RNN 的逐步累加，Kimi 把同样的思路旋转 90°，应用到了深度维度上。实测在 480 亿参数模型上，训练效率提升了 1.25 倍，多步推理提升了 7.5 分，推理延迟只增加不到 2%。</span></p>

<a id="f-doxcnBTAPrIgZZRzlE9oS4Zvcfh"></a>

###### Q2：你怎么看中美 AI 的差异？

<p id="f-doxcnAEaMGA06qI9Wv6YvGJtPPd"><span>可以认为现在已经不能简单说谁领先谁落后了。之前硅谷的叙事是"大力出奇迹"，拼的是谁能砸更多钱买更多卡。但最近的趋势很明显——DeepSeek 的 MoE 架构、Kimi 的注意力残差，都是中国团队在底层架构上做出的原创性突破，靠的不是算力碾压而是精妙的数学设计。而且这些成果都是开源的，实际上在倒逼整个行业重新审视"堆算力"的路线。可以认为未来 AI 竞争的核心不是中美之争，而是谁能在架构效率上走得更远。</span></p>

<a id="f-doxcnZXtEmBXezZycP7qLgNsmkd"></a>

###### Q3：你对未来大模型架构的发展怎么看？

<p id="f-doxcnXQbxypC8o3EMo85IAXOWbg"><span>可以认为架构创新会重新成为主旋律。过去几年大家主要在 scaling law 上做文章，靠扩大参数和数据量来提升性能，但这条路的边际收益在递减。Kimi 这篇论文给了一个很好的启示：残差连接这种十年没人动的基础组件，优化之后就能省 20% 的计算量。说明底层架构里可能还藏着很多类似的低效地基，值得用第一性原理重新审视。未来可能会看到更多对 Transformer 各个基础模块的重新设计，而不是单纯地把模型做大。</span></p>

<a id="f-doxcnhVJyxg1sypxQuPyG1JF0kc"></a>

###### Q4：能简单介绍一下 Kimi 注意力残差的具体机制吗？

<p id="f-doxcnhOZyKvy7xxoPRf9nkU498f"><span>传统残差连接中，每一层的输出等于该层变换结果加上该层输入，信息只能逐层往后传。注意力残差把这个过程改成了：每一层生成一组 Query，去和前面所有层的输出做注意力计算，按相关性分配权重后加权聚合。这样第 50 层可以直接给第 2 层一个很高的权重，越级提取早期特征。为了控制计算量，用了分块策略——每若干层分成一个区，区内正常累加，跨区才做全局注意力，内存开销大幅下降。</span></p>

<a id="f-doxcny3WBgdUV2n8Ffq0GiLwX6g"></a>

###### Q5：你觉得这篇论文最大的启发是什么？

<p id="f-doxcndjTZanXhCkSthsK0VfHzth"><span>最大的启发是"跨维度迁移"这种思维方式。注意力机制在时间维度上替代 RNN 已经是十年前的事了，但十年来没人想过把同样的思路用到深度维度上。Kimi 团队发现这两个方向的数学结构几乎一模一样——都是把逐步累加替换为全局加权聚合——然后就做出了突破。这说明很多时候创新不是发明全新的东西，而是发现已有方法在新场景下的适用性。对案例中的工作来说，也提醒我多关注不同领域之间结构上的相似性，而不是只在一个方向上深挖。</span></p>

<a id="f-doxcnnmrWlYA2PGARxYErI0BkQf"></a>

##### 参考资料

<p id="f-doxcnoF67ahMNM0G4KHibBDTTig"><span>论文原文：</span><span><span><a href="https://www.mlpod.com/1473.html"><span>https://www.mlpod.com/1473.html</span></a></span></span></p>

<p id="f-doxcnkWGt5jZSgy09ddHrV2mYpf"><span>视频讲解：马克老师专门对这个论文进行了讲解，他的视频是那种通俗易懂，给小白讲的，一共就不到10分钟，可以看看：</span><span><span><a href="https://www.bilibili.com/video/BV1MMw1zaESW/?spm_id_from=333.1387.homepage.video_card.click&amp;vd_source=144bec9c3f54e465073138bed788be1b"><span>https://www.bilibili.com/video/BV1MMw1zaESW/?spm_id_from=333.1387.homepage.video_card.click&amp;vd_source=144bec9c3f54e465073138bed788be1b</span></a></span></span></p>


<a id="section-0321"></a>
## 什么是AI Agent

<a id="t-block-14199"></a>

<div id="t-3h2MupPQuv1Vp9iChdCdhS"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/990a1ae49ffd47c062190615.png"/></div>


<a id="section-0322"></a>
## 什么是 Agent？

<a id="t-0P0QSxQFtDIQoHKtfyVvv1"></a>

<p id="t-jlM3Iu47YOqLgQhHTzBjOB"><span>Agent 就是一个能干活的智能助手。</span></p>

<p id="t-RgAZ7GOcK1sHsdXCg1gpV9"><span style="font-style:italic">快速体验 0 代码，一句话生成应用：</span></p>

<p id="t-jy3cMsD9Pq4RvtyVT2eSfx"><span>https://www.workbuddy.cn/events/invite?inviteCode=zxnpv7gn9mhjb</span></p>

<p id="t-D5olPJ9CbpZ799lAqxhmLe"><span style="font-weight:bold">Agent = LLM (大脑) + Planning (规划) + Tool use (执行) + Memory (记忆)。</span></p>

<p id="t-ptJsGUIuhRAXLzWjnWwvBG"><span>学习 Agent 需要思维转变： 从</span><span style="font-weight:bold">对话框问答</span><span>进化为</span><span style="font-weight:bold">目标驱动的任务执行</span><span>。</span></p>

<div id="t-A1RHRdQTF4FfChGhYBlmSb"><div class="technical-image-transcript"><h4>AI Agent 基础架构</h4><table><tr><th>模块</th><th>内容</th></tr><tr><td>记忆 Memory</td><td>短期记忆、长期记忆</td></tr><tr><td>工具 Tools</td><td>日历、计算器、代码解析器、搜索、其他工具</td></tr><tr><td>规划 Planning</td><td>反映、思想链、自我批评、子目标分解</td></tr><tr><td>行动 Action</td><td>连接工具与规划，执行行动</td></tr></table></div></div>

<p id="t-XdnPCiGuRoO0ZWTRs0yk69"><span>传统的软件程序遵循固定的指令流程：</span><span style="font-weight:bold">输入 → 处理 → 输出</span><span>，而 AI Agent 则更像一个有自主性的</span><span style="font-weight:bold">员工</span><span>，它能够：</span></p>

<ul><li id="t-MxdAYUNSbPGi4VpHgN0SCQ"><span style="font-weight:bold">理解任务目标</span><span>：明白你想要什么结果</span></li></ul>

<ul><li id="t-leDqdG7AKcz3QYvloR8jg6"><span style="font-weight:bold">制定计划</span><span>：思考如何达成目标</span></li></ul>

<ul><li id="t-9iNFVhxV6hQmr8cVeMR44j"><span style="font-weight:bold">使用工具</span><span>：调用各种资源和 API</span></li></ul>

<ul><li id="t-O50sfABWsvhIdDFk9oz4tQ"><span style="font-weight:bold">自我调整</span><span>：根据反馈优化策略</span></li></ul>

<ul><li id="t-ZprWzWL0eNvWbJj9V9QhSD"><span style="font-weight:bold">持续执行</span><span>：直到完成任务或遇到无法解决的问题</span></li></ul>

<p id="t-KeZc1OrfaDtY0cfhfjv1GF"><span style="font-weight:bold">类比理解：</span></p>

<ul><li id="t-YU86P1vqhP3yyKWSURensD"><span>传统程序 = 自动售货机：投币 → 按按钮→ 出商品</span></li></ul>

<ul><li id="t-9qPJrRqsq0ix7WWteV2kCg"><span>AI Agent = 私人助理：告诉需求 → 助理规划 → 完成任务并汇报</span></li></ul>

<p id="t-d61S4XjSxqkpT3gVCufyP7"><span style="font-weight:bold">核心结构：</span></p>

<ul><li id="t-SDKNv8durCgedGBnCXFh3f"><span style="font-weight:bold">目标（Goal）：</span><span>知道要完成什么</span></li></ul>

<ul><li id="t-JFWMqQXlAWGyz3oN2CwrjB"><span style="font-weight:bold">决策（Reasoning）：</span><span>规划执行步骤</span></li></ul>

<ul><li id="t-O3xYWgf4QnnuX7ZklsrJbm"><span style="font-weight:bold">工具（Tools）：</span><span>调用 API、代码或系统完成任务</span></li></ul>

<p id="t-XfAkSLiF6gz5qpUYJolIRn"><span style="font-weight:bold">工作流程：</span></p>

<pre id="t-78Y4oNB8s4LbOMgB4iQlyL"><code>输入 → 思考 → 调用工具 → 执行 → 返回结果 → 持续迭代</code></pre>

<p id="t-MZJ5p8RlUzV985iZFXo5jc"><span style="border-bottom:1px solid;font-weight:bold">与普通大模型区别：</span></p>

<ul><li id="t-eQSbX4FihDYeJDwTDolV37"><span>大模型：输出内容</span></li></ul>

<ul><li id="t-ky1TP45IpgCHpjbEeq16ht"><span>Agent：输出结果，并推动执行</span></li></ul>

<p id="t-zVatLbyupiWggsnoob2Jfk"><span>比如我们在与 AI Agent 对话，输出：</span><span style="font-weight:bold">规划三天北京旅行，预算 5000</span><span>，智能体就会完成以下任务：</span></p>

<ul><li id="t-aK6e5ROujXNh3r1Txc1q1O"><span>拆解需求</span></li></ul>

<ul><li id="t-T62Dl6ac4MspKMTgzzXpCl"><span>查询机票、酒店、景点</span></li></ul>

<ul><li id="t-xREvh59xGKWRiDml0QujzA"><span>生成行程方案</span></li></ul>

<ul><li id="t-H1uQOWdPiEe9x1wB34tC5P"><span>满足条件时继续完成预订</span></li></ul>

<div id="t-AiIpLSg1zByJGusaS6iySO"><div class="technical-image-transcript"><h4>AI Agent 结构组成</h4><p>目标（Goal）：明确任务意图，知道要完成什么。推理（Reasoning）：按规则拆解任务，规划可执行步骤。工具（Tools）：调用代码 / API / 系统，让步骤落地执行。</p><ol><li>接收输入：接收用户需求或任务目标。</li><li>思考规划：理解任务，拆解步骤。</li><li>调用工具：选择合适工具，执行操作。</li><li>执行操作：工具执行，获取结果。</li><li>返回结果：整理输出，返回给用户。</li><li>记忆上下文：保存关键信息，支持多轮对话。</li><li>迭代优化：遇到问题调整步骤，继续执行直至完成。</li></ol><p>持续迭代，直至完成目标。普通大模型生成文本内容、回答问题；AI Agent 生成行动并执行、完成实际任务。</p><p>示例：规划三天北京行程，预算 5000。检索机票、酒店与价格 → 收集景点信息并做对比 → 生成可执行行程表 → 满足条件时自动预订。</p></div></div>


<a id="section-0323"></a>
## 学习资源

<a id="t-rbhlrMN6kn3fp0GtKAWKal"></a>

<p id="t-JZD0TAObwcaWRJflrlmzK7"><span>现有平台及流行框架：</span></p>

<div id="t-KcqAHyNddDhQ8AjAoJH9sV"><table><colgroup><col width="218.8992919921875"/><col width="135.001708984375"/><col width="350.8992919921875"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>核心需求</span></p></td><td style=" vertical-align: top"><p><span>推荐工具</span></p></td><td style=" vertical-align: top"><p><span>关键优势</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>秒哒，一句话生成应用</span></p></td><td style=" vertical-align: top"><p><span>秒哒官网</span></p></td><td style=" vertical-align: top"><p><span>0 代码，通过一句话生成需求，并生成应用</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>搭子，桌面级 AI 智能体</span></p></td><td style=" vertical-align: top"><p><span>搭子官网</span></p></td><td style=" vertical-align: top"><p><span>面向个人及团队的桌面级 AI 智能体，可以看见屏幕、操作软件、处理文件</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>MonkeyCode，AI 应用开发平台</span></p></td><td style=" vertical-align: top"><p><span>MonkeyCode 官网</span></p></td><td style=" vertical-align: top"><p><span>直接在平台里创建任务，让 AI 编码，在云端开发环境中使用终端、文件管理和预览</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>小云雀，剪映的 AI 视频生成</span></p></td><td style=" vertical-align: top"><p><span>剪映-小云雀</span></p></td><td style=" vertical-align: top"><p><span>字节自研 Seedance 2.0 视频模型 + Seedream 5.0 图像模型，搭配豆包大模型做文案理解</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>QoderWork</span><span> ，桌面级 AI Agent</span></p></td><td style=" vertical-align: top"><p><span>QoderWork</span></p></td><td style=" vertical-align: top"><p><span>你说需求，它交付结果。</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>自动化触发与系统对接</span></p></td><td style=" vertical-align: top"><p><span>n8n</span></p></td><td style=" vertical-align: top"><p><span>集成面广，可自托管，常规内部系统都能打通</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>开发者可控的深度定制</span></p></td><td style=" vertical-align: top"><p><span>Dify </span><span>/ </span><span>LangChain</span></p></td><td style=" vertical-align: top"><p><span>前者提供完整开源方案；后者适合构建复杂推理链路</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>多角色协作与任务分解</span></p></td><td style=" vertical-align: top"><p><span>AutoGen </span><span>/ </span><span>CrewAI</span></p></td><td style=" vertical-align: top"><p><span>前者强调动态协作；后者以清晰角色体系驱动流程</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>自主任务执行 Agent</span></p></td><td style=" vertical-align: top"><p><span>AutoGPT</span></p></td><td style=" vertical-align: top"><p><span>早期现象级开源 Agent 项目，强调目标驱动、自主拆解任务、循环执行（Plan → Execute → Reflect）</span></p></td></tr></tbody></table></div>

<p id="t-lPxf0ts9G2EYXnklFt5D1U"><span>以下是其他流行的 AI Agent 开源框架，这些项目大多围绕工具调用（Tool Calling）、记忆（Memory）、工作流（Workflow）、多 Agent 协作（Multi-Agent）和长期任务执行能力展开。</span></p>

<div id="t-lyjTUhlpGtLsYFVN64FFWW"><table><colgroup><col width="167.8992919921875"/><col width="186.90447998046875"/><col width="349.99993896484375"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>项目</span></p></td><td style=" vertical-align: top"><p><span>定位</span></p></td><td style=" vertical-align: top"><p><span>特点</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>OpenAI Agents SDK</span></p></td><td style=" vertical-align: top"><p><span>轻量级 Agent 开发框架</span></p></td><td style=" vertical-align: top"><p><span>支持工具调用、交接（Handoff）、多 Agent 编排，结构简单，上手快</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>LangGraph</span></p></td><td style=" vertical-align: top"><p><span>状态机式 Agent 编排</span></p></td><td style=" vertical-align: top"><p><span>基于图结构控制复杂流程，支持长期状态和循环执行</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>LlamaIndex</span></p></td><td style=" vertical-align: top"><p><span>RAG + Agent 框架</span></p></td><td style=" vertical-align: top"><p><span>擅长知识库、数据连接和检索增强场景</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>Semantic Kernel</span></p></td><td style=" vertical-align: top"><p><span>企业级 Agent 编排</span></p></td><td style=" vertical-align: top"><p><span>微软开源，支持插件、流程、记忆与多模型协同</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>PydanticAI</span></p></td><td style=" vertical-align: top"><p><span>类型安全 Agent 开发</span></p></td><td style=" vertical-align: top"><p><span>使用 Python 类型系统约束输出，适合工程化应用</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>Mastra</span></p></td><td style=" vertical-align: top"><p><span>现代全栈 Agent 框架</span></p></td><td style=" vertical-align: top"><p><span>支持 Workflow、Memory、部署和可观测能力</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>Agno（原 Phidata）</span></p></td><td style=" vertical-align: top"><p><span>多 Agent 应用框架</span></p></td><td style=" vertical-align: top"><p><span>强调 Agent + Knowledge + Tools 的组合能力</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>Camel-AI</span></p></td><td style=" vertical-align: top"><p><span>多智能体协作框架</span></p></td><td style=" vertical-align: top"><p><span>通过角色扮演机制模拟团队协作与任务拆解</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>MetaGPT</span></p></td><td style=" vertical-align: top"><p><span>软件公司模拟框架</span></p></td><td style=" vertical-align: top"><p><span>将产品、架构、开发、测试拆分成多个角色协同执行</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>Swarms</span></p></td><td style=" vertical-align: top"><p><span>Agent 集群编排</span></p></td><td style=" vertical-align: top"><p><span>强调大规模 Agent 协同与任务调度</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>Haystack Agent</span></p></td><td style=" vertical-align: top"><p><span>搜索与知识增强 Agent</span></p></td><td style=" vertical-align: top"><p><span>适合企业搜索、文档问答和工具链组合</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>Atomic Agents</span></p></td><td style=" vertical-align: top"><p><span>可组合 Agent 架构</span></p></td><td style=" vertical-align: top"><p><span>强调模块化设计与可测试性</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>DSPy</span></p></td><td style=" vertical-align: top"><p><span>声明式 Prompt / Agent 框架</span></p></td><td style=" vertical-align: top"><p><span>将 Prompt 与推理过程工程化、可优化</span></p></td></tr></tbody></table></div>


<a id="section-0324"></a>
## AI Agent 简介

<a id="t-block-14244"></a>

<p id="t-iGqccEWQbXuD6QZhLh27ut"><span>在当今科技浪潮中，人工智能（AI）深度融入生活与工作的背后，</span><span style="font-weight:bold">AI Agent（智能体）</span><span> 是支撑</span><span style="font-weight:bold">从对话助手到自主任务程序</span><span>的核心概念——它不是单纯的聊天工具，而是能像</span><span style="font-weight:bold">数字员工</span><span>一样</span><span style="font-weight:bold">接任务、拆步骤、执行动作</span><span>的自动化实体，只要任务可拆解为操作流程，就能被 AI Agent 接管。</span></p>

<p id="t-vW0HqAm4Oc7q6IxJg0hpiR"><span style="font-weight:bold;color:#45b076">Agent = LLM (大脑) + Planning (规划) + Tool use (执行) + Memory (记忆)。</span></p>

<ul><li id="t-vdAWTETQJke5GXiwCcqWwS"><span style="border-bottom:1px solid;font-weight:bold">LLM (大脑)：</span><span>作为核心推理机，负责理解意图、生成文本和进行逻辑判断。</span></li></ul>

<ul><li id="t-F1ejZKETcfU9T1zmVAWFrc"><span style="border-bottom:1px solid;font-weight:bold">Planning (规划)：</span><span>能够将复杂的目标（如"帮我策划一场技术沙龙"）拆解成可执行的步骤。</span></li></ul>

<ul><li id="t-8Nhz6nbVMjIsbTMGjTRvIL"><span style="border-bottom:1px solid;font-weight:bold">Memory (记忆)：</span><span>记录对话历史（短期）和存储专业知识库（长期）。</span></li></ul>

<ul><li id="t-0NM3eTHoUnmeldXZ2aBfWE"><span style="border-bottom:1px solid;font-weight:bold">Tool Use (工具使用)：</span><span> 能够根据需求去查谷歌搜索、读数据库、甚至跑 Python 代码。</span></li></ul>

<div id="t-3ldiEeq63pNoGLjzIj3tyD"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/ec3f4e5855f6f9cd180862c7.png"/></div>


<a id="section-0325"></a>
## Agent 与传统 AI 模型的区别

<a id="t-6v3jBgiIKEhZfxWF9HqRQV"></a>

<div id="t-wUXjKQxQWX1tzpkwOy8HSC"><table><colgroup><col width="131.89755249023438"/><col width="257.89752197265625"/><col width="257.89752197265625"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>维度</span></p></td><td style=" vertical-align: top"><p><span>传统 AI 模型</span></p></td><td style=" vertical-align: top"><p><span>AI Agent</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="font-weight:bold">交互方式</span></p></td><td style=" vertical-align: top"><p><span>单次输入输出</span></p></td><td style=" vertical-align: top"><p><span>多轮对话、持续交互</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="font-weight:bold">决策能力</span></p></td><td style=" vertical-align: top"><p><span>基于输入直接推理</span></p></td><td style=" vertical-align: top"><p><span>规划、反思、迭代优化</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="font-weight:bold">工具使用</span></p></td><td style=" vertical-align: top"><p><span>无法主动调用外部工具</span></p></td><td style=" vertical-align: top"><p><span>可调用搜索、计算器、API 等</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="font-weight:bold">记忆机制</span></p></td><td style=" vertical-align: top"><p><span>仅限当前上下文</span></p></td><td style=" vertical-align: top"><p><span>短期+长期记忆</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="font-weight:bold">目标导向</span></p></td><td style=" vertical-align: top"><p><span>完成单一预测任务</span></p></td><td style=" vertical-align: top"><p><span>完成复杂目标</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="font-weight:bold">错误处理</span></p></td><td style=" vertical-align: top"><p><span>输出即结束</span></p></td><td style=" vertical-align: top"><p><span>可自我纠错、重试</span></p></td></tr></tbody></table></div>


<a id="section-0326"></a>
## 核心模式：从 Prompt 到 Reasoning Loop

<a id="t-NdXwTVm8gWM4j6k6smSfqh"></a>

<p id="t-8rELffAUJnscXnqiJkq7u3"><span>普通的 LLM 只是 </span><span style="font-weight:bold">One-shot（一次性）</span><span> 的响应，而 Agent 的核心在于 </span><span style="font-weight:bold">Iterative（迭代）</span><span>。</span></p>

<p id="t-3d6aiU0NVZRyHwvPZn4tx4"><span style="font-weight:bold;background-color:#f3f5f7">ReAct 模式 (Reason + Act)</span><span>是目前最主流的 Agent 推理逻辑：</span></p>

<ol start="1"><li id="t-hGeQqzm1nDVdCrjXoLhmMF"><span style="font-weight:bold">Thought (思考)：</span><span> 模型描述当前要做什么，为什么要这么做。</span></li></ol>

<ol start="2"><li id="t-WEZU6hLmrroAKlJCM7c5ir"><span style="font-weight:bold">Action (行动)：</span><span> 模型选择一个工具（如：</span><span>Google Search</span><span>）。</span></li></ol>

<ol start="3"><li id="t-HR3QoiCh38v2YZAlSbuPS2"><span style="font-weight:bold">Observation (观察)：</span><span> 模型读取工具返回的结果。</span></li></ol>

<ol start="4"><li id="t-It3Pa7Asbob1fnBAEgblfy"><span style="font-weight:bold">Repeat (循环)：</span><span> 重复上述步骤，直到得出最终答案。</span></li></ol>

<div id="t-fKLH70BiztgVK3h4Yqvvoc"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/09737b50e0616d8cb14ab881.png"/></div>


<a id="section-0327"></a>
## AI Agent 构成：像人一样思考与行动

<a id="t-snVAoSZ6AFsOzM5DXdU6J0"></a>

<p id="t-qFQqtZFHElfyE9ZeWQ2fsu"><span>一个功能完整的 AI Agent 通常模仿人类的认知和行动循环，包含以下几个关键模块：</span></p>


<a id="section-0328"></a>
## 规划模块：任务的大脑与指挥官

<a id="t-zctMkH5dax1jSzIGniiH0E"></a>

<p id="t-4EQSRJCzCHSQ3LkV9X1nUE"><span>这是 Agent 的思考中枢。它负责将用户模糊的、高层的目标（如：分析公司上个季度的销售数据）分解成一系列清晰的、可执行的子任务步骤。</span></p>

<ul><li id="t-eCERVpC9h8TMnnVaMLs5E6"><span style="font-weight:bold">任务分解</span><span>：将大目标拆解为小步骤。例如：1. 连接数据库；2. 提取Q3销售数据；3. 按产品和地区分类；4. 计算环比增长率；5. 生成可视化图表。</span></li></ul>

<ul><li id="t-Xx2wtb12xkrLrNqfCsa57Q"><span style="font-weight:bold">反思与调整</span><span>：Agent 会评估每一步行动的结果。如果失败了（比如数据库连不上），它会反思原因，并调整计划（例如尝试另一种连接方式或请求用户提供密码）。</span></li></ul>


<a id="section-0329"></a>
## 记忆模块：经验的笔记本

<a id="t-UvjPbY5hrLIJypRh2HrbEn"></a>

<p id="t-mnHYWmcOfAwNOtJUavcQzN"><span>Agent 需要有记忆才能进行连贯的、基于上下文的对话和操作。</span></p>

<ul><li id="t-aVgux05RGG6BRRYt5Wi0Th"><span style="font-weight:bold">短期记忆</span><span>：记住当前对话的上下文，确保回答不跑题。</span></li></ul>

<ul><li id="t-M7AMhCavVfuognOs93l08y"><span style="font-weight:bold">长期记忆</span><span>：将重要的交互信息、学到的知识存储到数据库或向量数据库中，供未来查询和使用，实现越用越聪明。</span></li></ul>


<a id="section-0330"></a>
## 工具调用模块：灵活的双手

<a id="t-yjqX9zZZHElm7icVSIG1Ub"></a>

<p id="t-LocMUqspBzJcM6CsQsvblL"><span>这是 Agent 从思考者变为行动者的关键。它可以通过应用程序接口（API）调用外部工具来扩展自身能力。</span></p>

<p id="t-34R0E1hgteUk1sebhqL4yh"><span style="font-weight:bold">常见工具</span><span>：</span></p>

<ul><li id="t-73pSQBwHgtobAIAnfDmbIH"><span style="font-weight:bold">搜索工具</span><span>：联网获取最新信息。</span></li></ul>

<ul><li id="t-nLL49uXPMP3YUTTTEMGPNp"><span style="font-weight:bold">计算器/代码解释器</span><span>：进行数学运算或运行代码处理数据。</span></li></ul>

<ul><li id="t-1NRUAMKasAtSy97woiPmSq"><span style="font-weight:bold">软件操作</span><span>：通过 API 发送邮件、操作电子表格、控制智能家居。</span></li></ul>

<ul><li id="t-kCZQrCzPFBLrQOTn5A5rzQ"><span style="font-weight:bold">专业工具</span><span>：调用专业软件进行图像生成、语音合成、数据分析等。</span></li></ul>

<div id="t-ynazDWXrEbLlYNbmhxg2rA"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/19a53fb5dbd33fce1ab7b38b.png"/></div>


<a id="section-0331"></a>
## 核心特征

<a id="t-GSgL97EZDUrpHmyd56ScBs"></a>

<p id="t-LZT62uI0W7pvp50uhROKjp"><span style="border-bottom:1px solid">一个合格的 AI Agent 通常具备以下特征：</span></p>

<p id="t-UT7LVlr9dm0SaaeVCrbZe7"><span style="border-bottom:1px solid;font-weight:bold">1. 自主性（Autonomy）</span></p>

<ul><li id="t-386fSZOpZtN09iJJ7RivN8"><span>无需人类逐步指导，能够独立运作</span></li></ul>

<ul><li id="t-kmxUy5YtRdf8F7wAQixrej"><span>自己决定下一步该做什么</span></li></ul>

<ul><li id="t-yv4PiFXhnoYe1L4RQbnicb"><span>示例：你说"帮我订明天去上海的机票"，Agent 会自动查询航班、比较价格、选择合适选项</span></li></ul>

<p id="t-5KieKxFkszPtvsQgYktYyK"><span style="border-bottom:1px solid;font-weight:bold">2. 反应性（Reactivity）</span></p>

<ul><li id="t-hURvke8SjhxIccLoj3Cjfm"><span>能够感知环境变化并及时响应</span></li></ul>

<ul><li id="t-eapwuTtC885KdbxyDLt6tk"><span>根据新信息调整行为</span></li></ul>

<ul><li id="t-F2JbYlzKVS8ezYQZbNC8gE"><span>示例：订票时发现航班取消，自动寻找替代方案</span></li></ul>

<p id="t-GzgfDuAKLsv7PbGGOB9L24"><span style="border-bottom:1px solid;font-weight:bold">3. 主动性（Proactivity）</span></p>

<ul><li id="t-jAWq4DM7bh2272kZalkS7v"><span>不仅被动响应，还能主动采取行动</span></li></ul>

<ul><li id="t-snHEtcvev5W4ceIO3hZvnK"><span>有目标导向的行为</span></li></ul>

<ul><li id="t-IBFOmRhv81GToCJlVZtQEt"><span>示例：发现机票价格波动，主动提醒用户最佳购买时机</span></li></ul>

<p id="t-OserEnOL4btuj9CmmD05WO"><span style="border-bottom:1px solid;font-weight:bold">4. 社交能力（Social Ability）</span></p>

<ul><li id="t-pomqxFRgRbqDj0An78JFVb"><span>能与人类或其他 Agent 交互</span></li></ul>

<ul><li id="t-r9PFaOAlJYU1Ngl58mkHpX"><span>理解自然语言，进行多轮对话</span></li></ul>

<ul><li id="t-LIAy8T1RkjdKI2yQG6zWXx"><span>示例：在订票过程中询问用户偏好（靠窗/靠走廊）</span></li></ul>

<p id="t-CMUvd6RjUNweBUsn7MQQQW"><span style="border-bottom:1px solid;font-weight:bold">5. 学习能力（Learning）</span></p>

<ul><li id="t-jw0i1EnBpNhwb1srDAfhOV"><span>从历史交互中学习</span></li></ul>

<ul><li id="t-RwBdRni8DtvlL45BE5lc5D"><span>记住用户偏好和上下文</span></li></ul>

<ul><li id="t-CyWwyNIPzNspWob7Wv8557"><span>示例：记住你喜欢早班飞机和靠窗座位</span></li></ul>


<a id="section-0333"></a>
## 时间线

<a id="t-etNY4d0zINT2pvo6EKv8NK"></a>

<div id="t-X5NsV4asJlNo11DNk1co36"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/6313ef97a75a93fe685e8236.png"/></div>

<p id="t-JIaGV6S6G9Un6PfLUkiOlR"><span style="border-bottom:1px solid;font-weight:bold">阶段一：概念萌芽期（1950s-2010s）</span></p>

<ul><li id="t-lpj3uCp3gL3lXfiVBMJt3k"><span>1950s：图灵测试提出，Agent 概念初现</span></li></ul>

<ul><li id="t-TBeliT1NA7fW9h31AuNZw9"><span>1990s：多智能体系统研究兴起</span></li></ul>

<ul><li id="t-iZCjUJtsiH1iL0f764Reik"><span>2000s：规则驱动的聊天机器人（如 ELIZA）</span></li></ul>

<ul><li id="t-ZbbOZV7KhIcUCIj1kjqWlD"><span>特点：基于规则，能力有限</span></li></ul>

<p id="t-4cJwNpp9gixENLxIeX6VWo"><span style="border-bottom:1px solid;font-weight:bold">阶段二：深度学习赋能期（2010s-2020）</span></p>

<ul><li id="t-U7EvKsrtaKJwinHCiszhTN"><span>2012：深度学习在 ImageNet 取得突破</span></li></ul>

<ul><li id="t-EB2Fxy1y55f150LVgQ8IPk"><span>2017：Transformer 架构问世</span></li></ul>

<ul><li id="t-XrFR8QzY2ONFsobaIv52oo"><span>2018-2020：BERT、GPT 系列模型发布</span></li></ul>

<ul><li id="t-W2s4RvfhT3FfArtneVjLSH"><span>特点：理解能力提升，但仍是"被动工具"</span></li></ul>

<p id="t-cItxQiCag171tvwN8VGy5y"><span style="border-bottom:1px solid;font-weight:bold">阶段三：大模型 Agent 爆发期（2021-至今）</span></p>

<ul><li id="t-ohOlFaDMrKcW2ory8kqEsv"><span>2022.11：ChatGPT 发布，展现强大对话能力</span></li></ul>

<ul><li id="t-pm7SRqfvieOxXicFGBxHEt"><span>2023.03：GPT-4 + Plugins，首次实现工具调用</span></li></ul>

<ul><li id="t-EAc4Rv6tGlLT4FNkoLdxLh"><span>2023.03：AutoGPT 开源，自主 Agent 概念验证</span></li></ul>

<ul><li id="t-mjch20auzsahMKgN0iHHbg"><span>2023.05：LangChain、LlamaIndex 等框架成熟</span></li></ul>

<ul><li id="t-GlXOiW5M90AvfBkZcFfDSA"><span>2024-2025：企业级 Agent 应用大规模落地</span></li></ul>

<ul><li id="t-UJsCymGl5ZU1LYiZAIMzIR"><span>特点：真正的自主性、工具使用、任务规划</span></li></ul>

<p id="t-z1VMGxCOB3cH2sn9DaE7J6"><span style="border-bottom:1px solid;font-weight:bold">多 Agent 协作模式</span></p>

<p id="t-HubM59Uh6zC10tYWX7gsY0"><span style="border-bottom:1px solid">多个 Agent 可以协同工作，类似一个团队：</span></p>

<p id="t-f6seCmxw9wi5rTnQJYYeQF"><span style="border-bottom:1px solid;font-weight:bold">多 Agent 协作模式</span></p>

<div id="t-YKYPyEBI7ajo6k8dijfVlM"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/9d7e2cbc3112df8340d87a2f.png"/></div>


<a id="section-0334"></a>
## AI Agent 的主要类型与应用场景

<a id="t-Ripq4gV4rVdr6FtHT9XL0S"></a>

<p id="t-qPf59hHn2yOJykt37Ldcg0"><span>根据其复杂度和自主性，AI Agent 可以分为不同类型，应用于各种场景：</span></p>

<div id="t-Q0ed5hUIn1qyi4RnW1bKDM"><table><colgroup><col width="131.89755249023438"/><col width="189.01202392578125"/><col width="310.89752197265625"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>类型</span></p></td><td style=" vertical-align: top"><p><span>特点</span></p></td><td style=" vertical-align: top"><p><span>应用场景举例</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="font-weight:bold">单一任务 Agent</span></p></td><td style=" vertical-align: top"><p><span>专注于完成一件特定事情，功能专一。</span></p></td><td style=" vertical-align: top"><p><span>智能客服机器人、自动数据录入助手、个人日程提醒助手。</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="font-weight:bold">多模态 Agent</span></p></td><td style=" vertical-align: top"><p><span>能理解和处理文本、图像、语音等多种信息。</span></p></td><td style=" vertical-align: top"><p><span>根据草图生成网站代码、分析医学影像并生成报告、视频内容自动摘要。</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="font-weight:bold">自主 Agent</span></p></td><td style=" vertical-align: top"><p><span>拥有较高自主性，可长期运行并主动管理复杂目标。</span></p></td><td style=" vertical-align: top"><p><span>自动驾驶汽车、自动化股票交易系统、智能游戏 NPC（非玩家角色）。</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="font-weight:bold">模拟 Agent</span></p></td><td style=" vertical-align: top"><p><span>在虚拟环境中进行模拟、测试和训练。</span></p></td><td style=" vertical-align: top"><p><span>训练机器人完成抓取任务、模拟城市交通流量优化、新药研发的分子模拟。</span></p></td></tr></tbody></table></div>

<p id="t-L7dzccPkSTPL1fyA128H4p"><span style="font-weight:bold">当前热门的实际应用</span><span>：</span></p>

<ul><li id="t-tZL5qx0B4R09F8sgFT5X1h"><span style="font-weight:bold">AI 编程助手</span><span>：如 Devin，能独立完成从需求分析、写代码到测试部署的全流程。</span></li></ul>

<ul><li id="t-JXZnu12SMqvgxj58uASxY7"><span style="font-weight:bold">AI 科研助手</span><span>：自动阅读大量文献，提出假设，设计实验方案。</span></li></ul>

<ul><li id="t-w2VVFieidb2KIrZG477sJy"><span style="font-weight:bold">个人生活助理</span><span>：管理你的邮件、行程，自动订餐、购物比价。</span></li></ul>

<ul><li id="t-7WKGIecc9KaDQ03yFEj38T"><span style="font-weight:bold">企业流程自动化</span><span>：自动处理报销单、生成周报、跟进客户合同。</span></li></ul>


<a id="section-0335"></a>
## 常见挑战与局限性

<a id="t-LXOXyLxVkWNFqw94RoByyg"></a>

<div id="t-7uHbeKoCXwbtoSAIhBus0t"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/804e2ebf8f5425bd5f3b82dc.png"/></div>


<a id="section-0336"></a>
## 最佳实践建议

<a id="t-kMbRf88SLNzaHg9K8lsmcT"></a>

<div id="t-dhOTWNmwKHvG9rBV023tqr"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/9e3add4475deb1ff023bbbea.png"/></div>


<a id="section-0337"></a>
## 未来发展趋势

<a id="t-5I9GbOYDbB6YkGgBcA5cJZ"></a>

<div id="t-hDJ4NfKCIsKSRFUxHtPucv"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/b03689709dfa44d629fb99aa.png"/></div>


<a id="section-0338"></a>
## AI Agent 核心组件

<a id="t-block-14360"></a>

<p id="t-bvTtnI4BO0t6OOk5lLYQoC"><span>如果把一个 AI Agent 比作一家</span><span style="font-weight:bold">智能餐厅</span><span>，它是怎么把你的需求变成菜品端上来的呢？这离不开它的四大核心组件：</span><span style="font-weight:bold">大脑、工具、记忆、规划</span><span>。</span></p>

<ul><li id="t-dql5LRKZ6oJIHqXF4P3oS0"><span style="border-bottom:1px solid;font-weight:bold">大脑：</span><span>负责听懂点单、判定目标、决定顺序，是餐厅的指挥中心。</span></li></ul>

<ul><li id="t-WMwxRCE8moC4aX4kFvM0Kq"><span style="border-bottom:1px solid;font-weight:bold">工具：</span><span>负责实际动手，包括切配、烹饪、采购等动作，把决策转成可执行操作。</span></li></ul>

<ul><li id="t-uuAW8ChKa8nm2Lv9IArdzS"><span style="border-bottom:1px solid;font-weight:bold">记忆：</span><span>负责记录顾客偏好、当前步骤、已处理内容，保证流程不混乱、不重复。</span></li></ul>

<ul><li id="t-aD1yC0Tozug3VGJKVNSFtO"><span style="border-bottom:1px solid;font-weight:bold">规划：</span><span>负责把整道菜拆成步骤，确定先后关系，确保任务按流程推进到完成。</span></li></ul>

<div id="t-pvGKePkXmLZN3eIUKNRWAv"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/794c35129e5b68d323b9503d.png"/></div>


<a id="section-0339"></a>
## 整体架构

<a id="t-2HMCwu51QxPhJ8t4H2DoLz"></a>

<p id="t-u8Xq9jCa7BEM5lt2pkyKn1"><span>下图展示了 AI Agent 五大层次组件及其协作关系。感知层接收外部输入，大脑负责理解与决策，规划层将任务分解，工具层负责执行，记忆层则贯穿始终，为所有环节提供状态支撑。</span></p>

<div id="t-iJhxKqZLmRuZ3C6AQO6rOo"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/15c7903ceebd789bb72b36fa.png"/></div>


<a id="section-0340"></a>
## 感知层 (Perception) —— 餐厅的前台

<a id="t-039N3iuAGvY0PcHjlO8sfU"></a>

<blockquote id="t-OdUL1x6KW16QBKdPyxfcaX"><span style="font-style:italic;font-weight:bold">角色</span><span style="font-style:italic">：负责接待顾客，理解来自外部世界的所有输入。Agent 在行动之前，必须先"看到"和"听到"外部信息。现代 Agent 已经不限于纯文本输入，而是具备</span><span style="font-style:italic;font-weight:bold">多模态感知</span><span style="font-style:italic">能力：</span><span style="font-weight:bold">文本输入</span><span>：用户的自然语言指令、文档内容、代码。</span><span style="font-weight:bold">图像 / 视频</span><span>：截图、设计稿、图表，Agent 可以直接"看图"理解。</span><span style="font-weight:bold">结构化数据</span><span>：表格、JSON、数据库查询结果。</span><span style="font-weight:bold">环境状态</span><span>：在计算机操作类 Agent 中，当前屏幕状态、网页 DOM 结构等。</span><span style="font-weight:bold">工具返回结果</span><span>：上一步工具调用的输出，会作为新的感知输入进入下一轮循环。</span><span style="font-style:italic">
感知层的输入经过整合，形成 Agent 的"当前上下文"，送入大脑进行理解和决策。</span></blockquote>


<a id="section-0341"></a>
## 大脑 (Brain) —— 也就是大模型

<a id="t-UohZtXl38ucGTJ9tNddGVM"></a>

<blockquote id="t-zOcGapMN5Dn1Zmqx2LlF5i"><span style="font-style:italic;font-weight:bold">角色</span><span style="font-style:italic">：餐厅的</span><span style="font-style:italic;font-weight:bold">主厨兼经理</span><span style="font-style:italic">。
这是 Agent 最核心的部分（比如 GPT-4、Claude、DeepSeek、通义千问）。</span><span>它负责</span><span style="font-weight:bold">听懂</span><span>你想吃什么（理解意图）。它负责</span><span style="font-weight:bold">指挥</span><span>其他人干活（决策）。如果没有它，整个餐厅就瘫痪了。</span></blockquote>


<a id="section-0342"></a>
## 大脑做的三件核心事

<a id="t-7Gc6I6D4nowVUs3ipXVFzJ"></a>

<div id="t-gxuJxAypOL9SSsaGQsJTFU"><table><colgroup><col width="120"/><col width="262.89752197265625"/><col width="251.00689697265625"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>能力</span></p></td><td style=" vertical-align: top"><p><span>说明</span></p></td><td style=" vertical-align: top"><p><span>对应餐厅类比</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>意图理解</span></p></td><td style=" vertical-align: top"><p><span>解析用户输入，明确目标是什么</span></p></td><td style=" vertical-align: top"><p><span>听懂顾客点了什么</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>推理决策</span></p></td><td style=" vertical-align: top"><p><span>综合上下文和记忆，判断下一步该做什么</span></p></td><td style=" vertical-align: top"><p><span>主厨决定先处理哪道菜</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>工具调用判断</span></p></td><td style=" vertical-align: top"><p><span>判断是否需要调用外部工具，选择哪个工具、传入什么参数</span></p></td><td style=" vertical-align: top"><p><span>决定用哪口锅、让谁去买食材</span></p></td></tr></tbody></table></div>

<p id="t-KEodWcwp23y93PI7IWEqBu"><span style="font-weight:bold">关键概念：</span><span>大脑的"智力天花板"决定了整个 Agent 的上限。同一套工具和规划框架，接入能力更强的基础模型，任务完成质量往往有质的飞跃。</span></p>


<a id="section-0343"></a>
## 工具 (Tools) —— 厨房里的设备

<a id="t-JvAtMP3IWOP4oAAzyDtdni"></a>

<blockquote id="t-T2lDlUuR2hcuufsE6bmWpM"><span style="font-style:italic;font-weight:bold">角色</span><span style="font-style:italic">：</span><span style="font-style:italic;font-weight:bold">厨具和帮手</span><span style="font-style:italic">。
光有主厨（大脑）是不够的，还得有锅碗瓢盆才能做菜。对于 AI Agent 来说，工具就是能把决策转化为真实动作的执行单元。</span></blockquote>

<p id="t-GTQPOXfSH1puoR31AaPrdD"><span style="font-weight:bold">工具可以按照用途分为四大类：</span></p>

<div id="t-ljXGe9RyC44VoaCTbWcYv6"><table><colgroup><col width="120"/><col width="265.90087890625"/><col width="242.005126953125"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>类别</span></p></td><td style=" vertical-align: top"><p><span>常见工具</span></p></td><td style=" vertical-align: top"><p><span>作用</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="font-weight:bold">信息获取</span></p></td><td style=" vertical-align: top"><p><span>联网搜索、网页抓取、文档读取、数据库查询</span></p></td><td style=" vertical-align: top"><p><span>获取 Agent 自身知识之外的实时或专业信息</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="font-weight:bold">计算执行</span></p></td><td style=" vertical-align: top"><p><span>代码解释器、数学计算引擎、沙箱环境</span></p></td><td style=" vertical-align: top"><p><span>处理需要精确计算或程序逻辑的任务</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="font-weight:bold">内容生成</span></p></td><td style=" vertical-align: top"><p><span>图像生成、语音合成、文档导出</span></p></td><td style=" vertical-align: top"><p><span>产出非文本形式的内容</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="font-weight:bold">系统交互</span></p></td><td style=" vertical-align: top"><p><span>API 接口、邮件、日历、文件操作、消息发送</span></p></td><td style=" vertical-align: top"><p><span>与外部系统、服务和真实世界进行交互</span></p></td></tr></tbody></table></div>

<p id="t-wSqtn83bbg78nynGrHs6AD"><span>常见工具举例：</span></p>

<ul><li id="t-2cbGDKlDWnbDvF8RLVEq74"><span style="font-weight:bold">联网搜索</span><span> 信息获取（像去菜市场买新鲜食材）</span></li></ul>

<ul><li id="t-KyzdrAiFkMaO5IPCzNE7nn"><span style="font-weight:bold">代码解释器</span><span> 计算执行（像精密的烤箱，处理复杂计算）</span></li></ul>

<ul><li id="t-IW9UXiGlPst9vJm8YAw1pr"><span style="font-weight:bold">画图工具</span><span style="background-color:#eafaf1">内容生成</span><span>（像摆盘师，负责美观）</span></li></ul>

<ul><li id="t-LR2cS4jYU58yeenIPfRPpE"><span style="font-weight:bold">API 接口</span><span> 系统交互（像外卖小哥，连接外部世界）</span></li></ul>

<p id="t-fF6nqvUZW6NRLXNPd1TvTX"><span style="font-weight:bold">函数调用（Function Calling）：</span><span>现代大模型通过"函数调用"机制来使用工具。开发者预先定义工具的名称与参数说明，模型在推理时会以结构化 JSON 的形式输出"我要调用哪个工具、传什么参数"，由外部程序负责真正执行并把结果返回给模型。</span></p>


<a id="section-0344"></a>
## 记忆 (Memory) —— 顾客记录本

<a id="t-jvlKsGCKty1E9KG10puhyM"></a>

<blockquote id="t-nMdEImQiLVHY1AQUjZqak5"><span style="font-style:italic;font-weight:bold">角色</span><span style="font-style:italic">：</span><span style="font-style:italic;font-weight:bold">服务员的记性</span><span style="font-style:italic">。
你肯定不喜欢每次去餐厅都要重新报一遍：我不吃香菜！</span></blockquote>

<p id="t-VRyMN3ORtyEzcoRSY6DVyw"><span style="font-weight:bold">Agent 的记忆分为以下几种类型：</span></p>

<ul><li id="t-e3nd3HTHwnkO5F8orLVGwf"><span style="font-weight:bold">短期记忆（In-Context Memory）</span><span>：即当前对话的上下文窗口。记住刚才你说了啥（比如你刚点了鱼，下一句说"要微辣"，它知道是指鱼）。受限于模型的上下文长度，通常在 8K 到 200K token 之间。</span></li></ul>

<ul><li id="t-Yw0qfdQZrJaLioJLE1qsys"><span style="font-weight:bold">长期记忆（External Memory）</span><span>：记住你的长期偏好（比如你是素食主义者，或者你的家庭住址）。通常通过</span><span style="font-weight:bold">向量数据库</span><span>（如 Pinecone、Milvus、Chroma）实现持久化存储。</span></li></ul>

<ul><li id="t-4ehs5Z2J4AklyCpCfJukNT"><span style="font-weight:bold">情节记忆（Episodic Memory）</span><span>：对历史任务执行过程的记录，包括"上次遇到这种情况我是怎么处理的"，帮助 Agent 从过去的经验中学习。</span></li></ul>

<ul><li id="t-Xlvt5bLbBV4w4TaKggssz4"><span style="font-weight:bold">语义记忆（Semantic Memory）</span><span>：抽象的知识和事实，通常来自预训练阶段已经内化的内容，也可通过 RAG（检索增强生成）动态补充。</span></li></ul>


<a id="section-0345"></a>
## RAG：让 Agent 拥有&quot;外挂知识库&quot;

<a id="t-eFiiUykzLkwyWBvDUNymYW"></a>

<p id="t-0HGPOuLPovJH2OZB5o73ph"><span style="font-weight:bold">检索增强生成（Retrieval-Augmented Generation，RAG）</span><span> 是目前最主流的长期记忆实现方案。其核心流程如下：</span></p>

<div id="t-L7b3hHbcuxugaE5r47Ltc1"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/52b6aedf0e4a3cfb19076ba3.png"/></div>


<a id="section-0346"></a>
## 规划 (Planning) —— 烹饪流程单

<a id="t-txV0ykJgxMiSDaggHOGEf2"></a>

<blockquote id="t-b85PvHIoNzpPx9WLFzHLX3"><span style="font-style:italic;font-weight:bold">角色</span><span style="font-style:italic">：</span><span style="font-style:italic;font-weight:bold">后厨的出餐 SOP</span><span style="font-style:italic">。
当你点了一份佛跳墙，主厨不会乱做，而是会在脑子里生成一个清单：</span></blockquote>

<ol start="1"><li id="t-YNcckSNS5llBpMzlfY7mYQ"><span>先备料（鲍鱼、海参…）</span></li></ol>

<ol start="2"><li id="t-f7e3ldGEQ1Iv5xiwJYM810"><span>再熬汤</span></li></ol>

<ol start="3"><li id="t-nnokHe4wTNnykCnnJka37a"><span>最后慢炖</span></li></ol>

<p id="t-KEcPJbgHapnvmUJpG2LUvH"><span>Agent 也是一样。当你给它一个复杂任务（比如"写一份竞品分析报告"），它会自己拆解：</span></p>

<div style="margin-left:25px"><ul><li id="t-MdFPmPZZSiQsfVoch9trDR"><span>第一步：去搜集竞品 A、B、C 的资料。</span></li></ul><ul><li id="t-PGFIvHpWdvx50ETWiYvQ98"><span>第二步：对比它们的价格和功能。</span></li></ul><ul><li id="t-ezwNAiV8N7wQMhgfUPaAAm"><span>第三步：把对比结果写成文章。</span></li></ul><ul><li id="t-2IqOFU4bUI2Cy4rv51AWyW"><span>第四步：检查一遍有没有错别字。</span></li></ul></div>


<a id="section-0347"></a>
## 主流规划策略

<a id="t-xz3aEKPL8Iqk7L3hal1SUP"></a>

<p id="t-PozYl5Ot5jtVCawp2xg1fc"><span>规划策略决定了 Agent 如何"思考"再"行动"，不同策略的推理深度与适用场景不同：</span></p>

<div id="t-drC6afyJXxVIoP1Ao2NhHI"><table><colgroup><col width="120"/><col width="120"/><col width="232.89752197265625"/><col width="178.00689697265625"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>策略</span></p></td><td style=" vertical-align: top"><p><span>全称</span></p></td><td style=" vertical-align: top"><p><span>核心思路</span></p></td><td style=" vertical-align: top"><p><span>适用场景</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="font-weight:bold">CoT</span></p></td><td style=" vertical-align: top"><p><span>Chain-of-Thought</span></p></td><td style=" vertical-align: top"><p><span>在给出答案前，先一步步写出推理过程</span></p></td><td style=" vertical-align: top"><p><span>数学推理、逻辑分析</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="font-weight:bold">ReAct</span></p></td><td style=" vertical-align: top"><p><span>Reasoning + Acting</span></p></td><td style=" vertical-align: top"><p><span>交替进行"推理"与"行动"，每次行动后根据结果再推理</span></p></td><td style=" vertical-align: top"><p><span>需要工具调用的动态任务</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="font-weight:bold">ToT</span></p></td><td style=" vertical-align: top"><p><span>Tree-of-Thoughts</span></p></td><td style=" vertical-align: top"><p><span>同时探索多条推理分支，从中选择最优路径</span></p></td><td style=" vertical-align: top"><p><span>复杂决策、创意任务</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="font-weight:bold">Reflection</span></p></td><td style=" vertical-align: top"><p><span>自我反思</span></p></td><td style=" vertical-align: top"><p><span>任务完成后，Agent 对自身输出进行批判性审查并修正</span></p></td><td style=" vertical-align: top"><p><span>代码生成、长文写作</span></p></td></tr></tbody></table></div>

<p id="t-CSs9mdYRA52mnPDTa94IG2"><span style="font-weight:bold">ReAct 示例：</span><span> Agent 接到任务"查明天北京天气并发送提醒" → </span><span style="font-weight:bold">思考</span><span>：需要先查天气 → </span><span style="font-weight:bold">行动</span><span>：调用天气 API → </span><span style="font-weight:bold">观察</span><span>：返回"明天有雨" → </span><span style="font-weight:bold">思考</span><span>：条件成立，需要写提醒 → </span><span style="font-weight:bold">行动</span><span>：调用发送消息工具 → 任务完成。</span></p>


<a id="section-0348"></a>
## Agent 运行循环 (Agent Loop)

<a id="t-27aAm7JW4wKNaQpn3bAn6z"></a>

<p id="t-jj8Gutia6MFialkQRpslk2"><span>以上各组件并非孤立存在，它们组成一个持续迭代的</span><span style="font-weight:bold">感知—思考—行动—观察</span><span>闭环，这就是"Agent Loop"。Agent 不断重复这个循环，直到任务完成或达到终止条件。</span></p>

<div id="t-gHYX89nMQVLQYmkyw1ej3j"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/b89d0ff8bfe2ade3ccd6f425.png"/></div>

<p id="t-E3VgH62pIJ0kE1me5hEnfA"><span>这个循环让 Agent 具备了</span><span style="font-weight:bold">在失败时自我纠错</span><span>的能力：如果某一步工具调用返回了错误或意外结果，"观察"阶段会将这个信息反馈给大脑，大脑在下一轮"思考"时就会调整策略。</span></p>


<a id="section-0349"></a>
## 总结

<a id="t-wAY6fyJId0FE5K2vSJYCTT"></a>

<p id="t-EbsjwfUf23BMdNESdUuNnz"><span>当你对 Agent 说：</span><span style="font-weight:bold">帮我查一下明天北京的天气，如果是雨天，帮我写个提醒发给小王。</span></p>

<p id="t-Oo6XrLf5jwS8WplacvHawV"><span>Agent 内部是这样运转的：</span></p>

<ol start="1"><li id="t-xd34rvvv1DRpT9klGmIC2N"><span>感知层：接收到自然语言指令，识别出关键实体"北京"、"明天"、"小王"。</span></li></ol>

<ol start="2"><li id="t-IkJjlOgaSc7xf3sawJLoKe"><span>大脑：听到指令，分析出两个条件任务：查天气，若下雨则发提醒。</span></li></ol>

<ol start="3"><li id="t-xGXoK62JZo9d5AMGFglboM"><span>规划：先查天气 → 判断是否下雨 → (如果是) 写提醒 → 发送。</span></li></ol>

<ol start="4"><li id="t-0muOaL5eGMyysmTUXzVary"><span>工具：调用"天气查询工具"，获取到结果——明天有雨。</span></li></ol>

<ol start="5"><li id="t-2ziGSmtlFTjmr780WtmpyX"><span>记忆：去通讯录（记忆库）里查询"小王"的联系方式。</span></li></ol>

<ol start="6"><li id="t-HtDRnjCVaDcXxqlpTicKG1"><span>工具：调用"发送消息工具"，把提醒发出去。</span></li></ol>

<ol start="7"><li id="t-jasJY9Ma3faMEAu9pBoMKs"><span>观察：确认消息发送成功，任务完成，循环终止。</span></li></ol>

<p id="t-fdnVnePRF0ZXOSFTFuhp9d"><span>运行过程示意图：</span></p>

<div id="t-Di2OdRhiFHspM9wFuuDAt7"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/5c38b46f581c177cfdbbb0d1.png"/></div>


<a id="section-0350"></a>
## 五大组件一览

<a id="t-izbb059YFSckdfZN0IBH8n"></a>

<div id="t-QtljgrkTmXjHCJr8uow5vR"><table><colgroup><col width="75.89755249023438"/><col width="114.0120849609375"/><col width="237.996337890625"/><col width="205.005126953125"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>组件</span></p></td><td style=" vertical-align: top"><p><span>餐厅类比</span></p></td><td style=" vertical-align: top"><p><span>核心职责</span></p></td><td style=" vertical-align: top"><p><span>关键技术</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="font-weight:bold">感知层</span></p></td><td style=" vertical-align: top"><p><span>前台接待</span></p></td><td style=" vertical-align: top"><p><span>接收多模态输入，构建上下文</span></p></td><td style=" vertical-align: top"><p><span>多模态模型、OCR、ASR</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="font-weight:bold">大脑</span></p></td><td style=" vertical-align: top"><p><span>主厨兼经理</span></p></td><td style=" vertical-align: top"><p><span>理解意图、推理决策、调用指令</span></p></td><td style=" vertical-align: top"><p><span>LLM、Function Calling</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="font-weight:bold">规划</span></p></td><td style=" vertical-align: top"><p><span>出餐 SOP</span></p></td><td style=" vertical-align: top"><p><span>任务分解、步骤排序、自我反思</span></p></td><td style=" vertical-align: top"><p><span>ReAct、CoT、ToT、Reflection</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="font-weight:bold">工具</span></p></td><td style=" vertical-align: top"><p><span>厨具与帮手</span></p></td><td style=" vertical-align: top"><p><span>执行具体操作，连接外部世界</span></p></td><td style=" vertical-align: top"><p><span>搜索 / 代码 / API / 文件系统</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="font-weight:bold">记忆</span></p></td><td style=" vertical-align: top"><p><span>顾客记录本</span></p></td><td style=" vertical-align: top"><p><span>管理上下文、存储长期知识</span></p></td><td style=" vertical-align: top"><p><span>向量数据库、RAG、上下文窗口</span></p></td></tr></tbody></table></div>


<a id="section-0351"></a>
## AI Agent 术语

<a id="t-block-14437"></a>

<p id="t-mVOblE8njds8OwqQkyCvhB"><span>随着大语言模型（LLM）与智能体（Agent）技术的快速发展，编程范式正在经历一场深刻的变革，Vibe Coding、Agentic Coding、Harness Engineer、Loop Engineer……一批新概念、新术语层出不穷，接下来我们看看都有哪些新术语，各代表什么意思。</span></p>

<p id="t-FJUUFlbjOmSL8cyXdnH7xm"><span style="font-weight:bold;background-color:#dcdfe4">AI Agent</span><span> 由 Artificial Intelligence（人工智能）和 Agent（智能体）组成。</span></p>

<div id="t-RFTGmYk5HE48iBuR3x3CrN"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/186754587b806df9d4095e42.webp"/></div>


<a id="section-0352"></a>
## 一、编程范式（Coding Paradigm）

<a id="t-RVA9GVuCdEB1zxDq0a9iz5"></a>

<div id="t-qpql6S2vQE8tiTfBqLct33"><table><colgroup><col width="120"/><col width="91.89752197265624"/><col width="245.01025390625"/><col width="190.005126953125"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>术语</span></p></td><td style=" vertical-align: top"><p><span>中文</span></p></td><td style=" vertical-align: top"><p><span>核心含义</span></p></td><td style=" vertical-align: top"><p><span>举例（餐厅经营）</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="font-weight:bold">Vibe Coding</span></p></td><td style=" vertical-align: top"><p><span>氛围编程</span></p></td><td style=" vertical-align: top"><p><span>用自然语言/语音描述需求让 AI 生成代码</span></p></td><td style=" vertical-align: top"><p><span>在家凭感觉炒个蛋炒饭，想加什么加什么</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="font-weight:bold">Context Engineering</span></p></td><td style=" vertical-align: top"><p><span>上下文工程</span></p></td><td style=" vertical-align: top"><p><span>通过组织上下文、知识、记忆与工具提升模型效果</span></p></td><td style=" vertical-align: top"><p><span>提前备菜、准备菜单和厨房环境</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="font-weight:bold">Agentic Coding</span></p></td><td style=" vertical-align: top"><p><span>智能体编程</span></p></td><td style=" vertical-align: top"><p><span>Agent 自主完成编程任务（设计→实现→测试→验收）</span></p></td><td style=" vertical-align: top"><p><span>经营一家正式餐厅，从菜单、备料到出品全流程</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="font-weight:bold">AI Native Development</span></p></td><td style=" vertical-align: top"><p><span>AI 原生开发</span></p></td><td style=" vertical-align: top"><p><span>默认 AI 参与设计、开发、测试全过程</span></p></td><td style=" vertical-align: top"><p><span>直接经营智能餐厅</span></p></td></tr></tbody></table></div>


<a id="section-0353"></a>
## 二、工程角色（Engineer Role）

<a id="t-PUdJas8oEN51YsQtG5byTf"></a>

<div id="t-OWEDcqKIHFoWUAsdCrbC2f"><table><colgroup><col width="120"/><col width="103.89752197265624"/><col width="175.0155029296875"/><col width="232.00473022460935"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>术语</span></p></td><td style=" vertical-align: top"><p><span>中文</span></p></td><td style=" vertical-align: top"><p><span>核心含义</span></p></td><td style=" vertical-align: top"><p><span>举例（餐厅经营）</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="font-weight:bold">Harness Engineer</span></p></td><td style=" vertical-align: top"><p><span>线束工程师</span></p></td><td style=" vertical-align: top"><p><span>会调用各种 Harness 组件，自己干活自己验收</span></p></td><td style=" vertical-align: top"><p><span>专业厨师，精通各类厨具技法，做完自己试味把关</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="font-weight:bold">Loop Engineer</span></p></td><td style=" vertical-align: top"><p><span>循环工程师</span></p></td><td style=" vertical-align: top"><p><span>搭自动化编排系统，自主进化</span></p></td><td style=" vertical-align: top"><p><span>餐厅运营管理系统，统筹排班、采购、出餐节奏与成本</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="font-weight:bold">Context Engineer</span></p></td><td style=" vertical-align: top"><p><span>上下文工程师</span></p></td><td style=" vertical-align: top"><p><span>负责设计上下文、知识源与记忆系统</span></p></td><td style=" vertical-align: top"><p><span>后厨总调度</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="font-weight:bold">AI Product Engineer</span></p></td><td style=" vertical-align: top"><p><span>AI 产品工程师</span></p></td><td style=" vertical-align: top"><p><span>负责 AI 能力与业务闭环设计</span></p></td><td style=" vertical-align: top"><p><span>餐厅老板兼运营</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="font-weight:bold">Agent Operator</span></p></td><td style=" vertical-align: top"><p><span>智能体运营工程师</span></p></td><td style=" vertical-align: top"><p><span>持续监控和优化 Agent 执行效果</span></p></td><td style=" vertical-align: top"><p><span>店长持续优化经营数据</span></p></td></tr></tbody></table></div>


<a id="section-0354"></a>
## 三、模型与底层（Model &amp; Fundamentals）

<a id="t-498RZdwaqHFBKPUBcMxj3h"></a>

<div id="t-JGJGoTlHMr6IxVe58nwEp8"><table><colgroup><col width="120"/><col width="120"/><col width="195.89752197265625"/><col width="221.00341796875"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>术语</span></p></td><td style=" vertical-align: top"><p><span>中文</span></p></td><td style=" vertical-align: top"><p><span>核心含义</span></p></td><td style=" vertical-align: top"><p><span>备注</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">LLM</span><span style="border-bottom:1px solid">（Large Language Model）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">大语言模型</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">基于海量文本训练的语言预测模型</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">GPT、Claude、Gemini 都是 LLM</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">GPT</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">生成式预训练 Transformer</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">OpenAI 的模型架构范式</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Generative Pre-trained Transformer</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Token</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">词元</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">模型处理文本的最小单位（约 ¾ 个英文单词）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">计费和上下文长度的计量单位</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Context Window</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">上下文窗口</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">模型一次能"看到"的最大 token 数</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">窗口越大，记得越多</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Inference</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">推理</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">模型生成输出的过程</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">区别于训练</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Hallucination</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">幻觉</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">模型一本正经地编造不存在的信息</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">生成与事实、上下文或目标不一致内容</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Temperature</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">温度</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">控制采样概率分布，高值更发散，低值更稳定</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">写代码建议调低</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Top-p / Top-k</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">采样参数</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">控制候选词的采样范围</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">影响输出多样性</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Embedding</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">向量嵌入</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">把文本/图片转成数字向量，用于相似度计算</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">RAG 的基础</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Fine-tuning</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">微调</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">在通用模型上用特定数据继续训练</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">让模型更懂某个领域</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">RLHF</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">基于人类反馈的强化学习</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">用人类偏好对齐模型行为</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">让 AI "听话"</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">MoE</span><span style="border-bottom:1px solid">（Mixture of Experts）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">混合专家</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">每次只激活部分参数，提升效率</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">用更少算力跑更强模型</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Multimodal</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">多模态</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">同时处理文本、图像、音频、视频</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">GPT-4o、Gemini 都是</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Transformer</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Transformer 架构</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">现代 LLM 的底层神经网络结构</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">注意力机制是核心</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">KV Cache</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">键值缓存</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">缓存上下文计算结果提升推理速度</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">避免重复翻菜谱</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Latency</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">延迟</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">模型响应耗时</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">影响用户体验</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Throughput</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">吞吐量</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">单位时间可处理任务数</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">影响并发能力</span></p></td></tr></tbody></table></div>


<a id="section-0355"></a>
## 四、Prompt 工程（Prompt Engineering）

<a id="t-SauhL5fIZaIy7Kl2ofxokE"></a>

<div id="t-uw87pua5tY99YmtG5qMYay"><table><colgroup><col width="120"/><col width="120"/><col width="412.89752197265625"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>术语</span></p></td><td style=" vertical-align: top"><p><span>中文</span></p></td><td style=" vertical-align: top"><p><span>核心含义</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Prompt</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">提示词</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">给模型的输入指令</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">System Prompt</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">系统提示词</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">定义 Agent 角色、边界、行为的底层指令</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Prompt Engineering</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">提示工程</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">设计优化提示词以获得更好输出的技术</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Zero-shot</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">零样本</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">不给示例，直接让模型完成任务</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Few-shot</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">少样本</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">给几个示例，引导模型按格式/风格输出</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Chain of Thought（CoT）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">思维链</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">引导模型产生中间推理过程，提升复杂推理能力</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">ReAct</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">推理+行动</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Reasoning + Acting 交替进行，边想边干，是 Agent 的核心范式</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Role Prompting</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">角色扮演</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">让模型扮演某个角色（如"你是资深架构师"）</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Structured Output</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">结构化输出</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">强制模型按 JSON/XML 等格式输出</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Prompt Chaining</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">提示链</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">多个 Prompt 串联完成复杂任务</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Self-Consistency</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">自一致性</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">生成多个推理结果后进行投票选择</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Tree of Thoughts（ToT）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">思维树</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">同时探索多条推理路径</span></p></td></tr></tbody></table></div>


<a id="section-0356"></a>
## 五、Agent 架构（Agent Architecture）

<a id="t-cwfkQSA3w2NYB7Ud5YguKv"></a>

<div id="t-pK9tnQicnoXKmPk1nvMsaX"><table><colgroup><col width="120"/><col width="120"/><col width="220.89752197265625"/><col width="216.00341796875"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>术语</span></p></td><td style=" vertical-align: top"><p><span>中文</span></p></td><td style=" vertical-align: top"><p><span>核心含义</span></p></td><td style=" vertical-align: top"><p><span>举例（餐厅经营）</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Agent</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">智能体</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">能自主感知、决策、执行任务的 AI 程序</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">掌勺厨师</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Multi-Agent</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">多智能体</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">多个 Agent 分工协作</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">厨师团队协同出餐</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Subagent</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">子智能体</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">主 Agent 派生的专项子 Agent</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">专职厨师（如切配、冷盘、甜品）</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Tool Use / Function Calling</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">工具调用 / 函数调用</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Agent 调用外部工具/API 执行动作</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">使用菜刀、灶台、烤箱等厨具</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Planning</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">规划</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Agent 拆解目标、制定执行步骤</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">制定备菜与出餐计划</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Reflection</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">反思</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Agent 回顾自己的行为并改进</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">试菜后根据反馈调整口味</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Memory</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">记忆</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">跨会话保存复用的长期信息（短期/长期）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">菜谱本与经营数据积累</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Agent Loop</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">智能体循环</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">思考→行动→观察→再思考的迭代机制</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">备料→烹饪→试味→上菜的循环</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Environment</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">环境</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Agent 感知和执行动作的真实世界</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">厨房环境</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Observation</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">观察</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">执行后获取反馈信息</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">试菜反馈</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Execution</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">执行</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">将规划转化为真实动作</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">开始做菜</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Long-term Memory</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">长期记忆</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">长期保存经验知识</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">经营数据库</span></p></td></tr></tbody></table></div>


<a id="section-0357"></a>
## 六、Harness 组件（AI Agent 能力模块）

<a id="t-WrzHpKEBH3oLtvfM0vdB5S"></a>

<div id="t-7HCoBqNw1PnvSakrRXcnqh"><table><colgroup><col width="120"/><col width="120"/><col width="220.9061584472656"/><col width="230.89752197265625"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>术语</span></p></td><td style=" vertical-align: top"><p><span>中文</span></p></td><td style=" vertical-align: top"><p><span>核心含义</span></p></td><td style=" vertical-align: top"><p><span>举例（餐厅经营）</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Harness</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">线束 / 驾驭框架</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">承载 Agent 执行、上下文管理与工具编排的运行框架</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">整个厨房系统（厨房本体）</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Skills</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">技能</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Agent 可调用的专项能力模块</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">各类烹饪技法（煎炒烹炸）</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Context</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">上下文</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">当前任务可获取的信息范围</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">当前订单、食材库存与顾客要求</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">MCP</span><span style="border-bottom:1px solid">（Model Context Protocol）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">模型上下文协议</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Agent 连接外部工具/数据源的标准化协议</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">对接食材供应商、外卖平台的标准化接口</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Permission</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">权限控制</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">控制 Agent 能做/不能做的安全机制</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">后厨操作权限与采购审批</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">RAG</span><span style="border-bottom:1px solid">（Retrieval-Augmented Generation）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">检索增强生成</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">先从知识库检索，再让模型生成，减少幻觉</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">做菜前先翻菜谱书查标准做法</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Tool Registry</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">工具注册中心</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">统一管理 Agent 可调用工具</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">厨房工具架</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Session</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">会话</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">一次任务生命周期</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">一次营业过程</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Knowledge Base</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">知识库</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">供 Agent 查询的外部知识集合</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">餐厅菜谱库</span></p></td></tr></tbody></table></div>


<a id="section-0358"></a>
## 七、Loop 工具（自动化编排与自主进化）

<a id="t-06mgBs14QIng49M678tzjy"></a>

<div id="t-kb2DgdxK1JyPVZ37PpxI6r"><table><colgroup><col width="103.89755249023438"/><col width="95.90444946289062"/><col width="206.1109619140625"/><col width="184.01373291015625"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>术语</span></p></td><td style=" vertical-align: top"><p><span>中文</span></p></td><td style=" vertical-align: top"><p><span>核心含义</span></p></td><td style=" vertical-align: top"><p><span>举例（餐厅经营）</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">/loop</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">循环指令</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">让 Agent 持续循环执行</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">持续运转的出餐流水线</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">/goal</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">目标指令</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">设定目标驱动 Agent 自主达成</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">当日营业目标</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Cron</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">定时任务</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">按时间计划自动触发</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">营业时段与备餐排程</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Worktree</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">工作树</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Git 多分支并行工作区</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">多个灶台同时开火、互不干扰</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Workflow</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">工作流</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">预定义的多步骤自动化流程</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">标准出餐 SOP</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Scheduler</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">调度器</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">协调多个任务执行顺序</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">后厨排班系统</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Checkpoint</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">检查点</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">保存执行状态用于恢复</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">暂停营业后继续工作</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Human-in-the-loop</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">人在回路</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">关键步骤允许人工干预</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">主厨最终确认出餐</span></p></td></tr></tbody></table></div>


<a id="section-0359"></a>
## 八、工具生态（Tool Ecosystem）

<a id="t-zwEakS2bta842nxkE1iIqX"></a>

<div id="t-fH1gFiNGaybkMsCMv4IQTx"><table><colgroup><col width="120"/><col width="120"/><col width="349.9353332519531"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>工具</span></p></td><td style=" vertical-align: top"><p><span>类型</span></p></td><td style=" vertical-align: top"><p><span>说明</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Claude Code（cc）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">AI Agent / CLI</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Anthropic 官方终端 Agent，Harness 的典型代表</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Codex CLI</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">AI Agent / CLI</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">OpenAI 官方命令行编码 Agent</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Cursor</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">AI IDE</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">内置 AI 的代码编辑器，Vibe Coding 主力</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Windsurf</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">AI IDE</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Codeium 出品的 AI IDE</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">GitHub Copilot</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">AI 编程助手</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">最早普及的 AI 编程插件，偏辅助补全</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Cline / Roo Code</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">开源 Agent 插件</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">VS Code 中的自主编码 Agent</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Aider</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">开源 CLI Agent</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">命令行里的 AI 结对编程工具</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Devin</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">AI 软件工程师</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Cognition 推出的"首个 AI 程序员"，偏全自主</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Continue</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">开源 AI 插件</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">可自定义模型的代码助手</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Qoder</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">AI IDE</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">国内面向 AI 编程场景的智能开发环境，强调 Agent、项目理解与代码生成</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Trae</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">AI IDE</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">字节跳动推出的新一代 AI 编程工具，支持对话式开发与工程级协作</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">ZCode</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">AI 编程助手</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Z.ai 推出的智能编程产品，支持代码生成、理解、重构与工程协同</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">OpenHands</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">开源 Agent</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">自主软件开发，面向完整工程执行</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Bolt</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">AI Builder</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">快速生成应用，偏产品落地</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Lovable</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">AI Builder</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">自然语言生成 Web，强调产品交付</span></p></td></tr></tbody></table></div>


<a id="section-0360"></a>
## 九、评估与安全（Evaluation &amp; Safety）

<a id="t-nZWNku8kfLG1dk0YUOtlT9"></a>

<div id="t-E1XPmiYtpaU662cUOdBaKe"><table><colgroup><col width="120"/><col width="156.89752197265625"/><col width="303.89752197265625"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>术语</span></p></td><td style=" vertical-align: top"><p><span>中文</span></p></td><td style=" vertical-align: top"><p><span>核心含义</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Eval</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">评估</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">用测试集衡量模型/Agent 的能力</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Alignment</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">对齐</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">让 AI 行为符合人类意图和价值观</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Guardrail</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">护栏</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">限制 AI 输出范围的安全机制</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Red Teaming</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">红队测试</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">主动攻击/诱导 AI，发现漏洞</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Prompt Injection</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">提示词注入</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">恶意输入劫持 AI 行为（如"忽略以上指令"）</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Context Poisoning</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">上下文污染</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">往上下文里掺恶意信息误导 Agent</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Sandbox</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">沙箱</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">隔离执行环境，防止 AI 误操作破坏系统</span></p></td></tr></tbody></table></div>


<a id="section-0361"></a>
## 十、AI 工程演进路线（Evolution）

<a id="t-y0fTaOXjLNTThJAMNfxG0D"></a>

<p id="t-hW17cu2nZYXIc1b3bgEDUT"><span style="border-bottom:1px solid">AI 工程能力正在逐步上移：从控制模型输出，到控制上下文，再到控制系统，最终演化为持续自治系统。</span></p>

<div id="t-NqvGwyOcVbgIkHZq2gYlbx"><table><colgroup><col width="218.8975524902344"/><col width="180.01031494140625"/><col width="189.99993896484375"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>阶段</span></p></td><td style=" vertical-align: top"><p><span>关注点</span></p></td><td style=" vertical-align: top"><p><span>关键能力</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Prompt Engineering</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">怎么问</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">提示设计</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Context Engineering</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">给什么信息</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">上下文组织</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Harness Engineering</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">怎么组织能力</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">工具编排</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Loop Engineering</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">怎么持续创造结果</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">自动执行与反馈</span></p></td></tr></tbody></table></div>


<a id="section-0362"></a>
## AI Agent 工作原理

<a id="t-block-14463"></a>

<p id="t-ixiaEcyCxzqfevI3IXapkl"><span>在开始深入了解 AI Agent 之前，我们先来回答一个根本问题：</span><span style="font-weight:bold">既然有 LLM，为什么还需要 Agent？</span></p>

<p id="t-nFTcbLevfe3cTyuskQ1Olx"><span>想象一下，你有一位非常博学的朋友——他读过海量的书，能回答几乎所有问题，但他在 2024 年不再接触新信息，也没有手机、不能上网、不能帮你订外卖、不能查今天的天气。这就是大型语言模型（LLM）——知识丰富，但</span><span style="font-weight:bold">知识截止于训练数据</span><span>，无法主动获取实时信息，也无法执行具体的操作。</span></p>

<p id="t-3kTlLxW42vUCyE8chr3G9S"><span>而 </span><span style="font-weight:bold">AI Agent</span><span> 就像是给这位朋友配备了：一部可以上网的手机、一台计算器、一个日历……让他不仅能思考，还能</span><span style="font-weight:bold">真正动手做事</span><span>。AI Agent 通过将 LLM 与工具和记忆结合，突破了这一限制，实现了</span><span style="font-weight:bold">思考与行动的统一</span><span>。</span></p>


<a id="section-0363"></a>
## AI Agent 的三大核心组成

<a id="t-3NTWOg2cKKwQJwe8i3tSjc"></a>

<p id="t-Qzf3awwV5uv7R7vB4dN1X1"><span>一个典型的 AI Agent 由三个关键部分协同工作，我们继续用上面的比喻来理解：</span></p>

<p id="t-pQFcjQFvCuEwfxrIMWE5N6"><span style="font-weight:bold">1、大脑 (The Brain) - 大型语言模型 (LLM)</span></p>

<ul><li id="t-AGstzemN9g7p7HqMyK3Gyx"><span style="border-bottom:1px solid;font-weight:bold">角色</span><span>：Agent 的决策中心和推理引擎。</span></li></ul>

<ul><li id="t-eSjwu1kzRwcAS4sOA7FNsV"><span style="border-bottom:1px solid;font-weight:bold">功能</span><span>：理解用户输入的</span><span style="border-bottom:1px solid;font-weight:bold">目标</span><span>和</span><span style="border-bottom:1px solid;font-weight:bold">上下文</span><span>，分析当前状况，然后决定下一步该做什么——是直接回答问题，还是调用某个工具？它负责规划和分解复杂任务。</span></li></ul>

<ul><li id="t-z0oT7DAH6lLbpkjLeNTn7e"><span style="border-bottom:1px solid;font-weight:bold">比喻</span><span>：就像公司的</span><span style="border-bottom:1px solid;font-weight:bold">CEO 或指挥官</span><span>，负责战略思考、任务规划和下达指令。它知道要做什么，但需要借助工具来真正做到。</span></li></ul>

<p id="t-7HAiS4Jun7E2DRkb3oFORY"><span style="border-bottom:1px solid;font-weight:bold">2、工具 (Tools) - 可执行的动作</span></p>

<ul><li id="t-pGNu3muHmvOxoLtJ8rMYXh"><span style="border-bottom:1px solid;font-weight:bold">角色</span><span>：Agent 的手和脚，是其能力的延伸。</span></li></ul>

<ul><li id="t-HfLOMcXYyo9y8NQPRr6mhW"><span style="border-bottom:1px solid;font-weight:bold">功能</span><span>：一个个具体的函数或 API，让 Agent 能够与外部世界互动。例如：</span><span style="border-bottom:1px solid">search_web</span><span>（搜索网页）、</span><span style="border-bottom:1px solid">execute_python_code</span><span>（运行代码）、</span><span style="border-bottom:1px solid">read_file</span><span>（读取文件）、</span><span style="border-bottom:1px solid">send_email</span><span>（发送邮件）等。</span></li></ul>

<ul><li id="t-yxthC97HFwya5GNK8b7mfv"><span style="border-bottom:1px solid;font-weight:bold">比喻</span><span>：就像员工桌上的</span><span style="border-bottom:1px solid;font-weight:bold">各种办公软件和设备</span><span>，如 Excel、浏览器、电话、打印机。CEO（大脑）发出指令，员工（工具）负责执行。</span></li></ul>

<ul><li id="t-JXDFi0Yp2T5lnx5vkg25G3"><span style="border-bottom:1px solid;font-weight:bold">关键理解</span><span>：没有工具，LLM 只能说，有了工具，Agent 才能真正做。</span></li></ul>

<p id="t-i4IyfJKmEUzIJPktCUsmYm"><span style="border-bottom:1px solid;font-weight:bold">3、记忆 (Memory) - 对话与经验的存储</span></p>

<ul><li id="t-IXc1Uwh82R0diyIQEMDGoj"><span style="border-bottom:1px solid;font-weight:bold">角色</span><span>：记录工作过程，保证任务的连贯性。</span></li></ul>

<ul><li id="t-QVffglMItHuT5IQ4cLGrG2"><span style="border-bottom:1px solid;font-weight:bold">功能</span><span>：</span></li></ul>

<ul><li id="t-8J3NRWHy9y3MZ5JE8qyX10"><span style="border-bottom:1px solid;font-weight:bold">短期记忆</span><span>：保存当前对话的历史，让 Agent 记得之前说过什么、做过什么。就好比你跟朋友聊天，不需要每句话都重新自我介绍。</span></li></ul>

<ul><li id="t-rvLQwRKjGbuHILA7MkYV3T"><span style="border-bottom:1px solid;font-weight:bold">长期记忆</span><span>：可以存储更持久的信息（例如用户偏好、历史任务结果），供未来任务参考。就像你有一本专属于你的用户档案。</span></li></ul>

<ul><li id="t-ptT3DUpfBf7b8fAXq6PzlP"><span style="border-bottom:1px solid;font-weight:bold">比喻</span><span>：就像员工的</span><span style="border-bottom:1px solid;font-weight:bold">工作笔记和项目档案</span><span>，避免重复劳动，让每次工作都能基于之前的经验继续推进。</span></li></ul>

<div id="t-xDiyHxHRiWXeTGDbsrAYiY"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/f7733d529ebf4828d1ad5317.png"/></div>

<p id="t-edLEmjaGlEy9jUsuzyBtys"><span style="border-bottom:1px solid">💡</span><span style="border-bottom:1px solid;font-weight:bold">一句话总结</span><span style="border-bottom:1px solid">：大脑负责思考，工具负责行动，记忆保证连贯，三者缺一不可。</span></p>


<a id="section-0364"></a>
## AI Agent 的类型

<a id="t-5YLih7Uyu1eQlg1pPQM0Tg"></a>

<p id="t-JyVBTFb2cOXqzLkO1jh2wo"><span>根据不同的设计目标和复杂度，AI Agent 可以分为多种类型：</span></p>

<div id="t-yqRM7ksZMqhu3pOGxsgRzK"><table><colgroup><col width="192.62841796875"/><col width="330.0120849609375"/><col width="146.00341796875"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>Agent 类型</span></p></td><td style=" vertical-align: top"><p><span>特点</span></p></td><td style=" vertical-align: top"><p><span>典型应用</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="font-weight:bold">反应式 Agent (Reactive Agent)</span></p></td><td style=" vertical-align: top"><p><span>基于当前感知做出即时响应，不维护内部状态。就像一个只看眼前、不记过去的客服。</span></p></td><td style=" vertical-align: top"><p><span>简单问答、游戏 AI</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="font-weight:bold">目标导向 Agent (Goal-based Agent)</span></p></td><td style=" vertical-align: top"><p><span>围绕特定目标规划行动，能评估目标是否达成。就像有 KPI 的员工，知道自己做什么是为了完成什么目标。</span></p></td><td style=" vertical-align: top"><p><span>任务助手、自动化工作流</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="font-weight:bold">实用型 Agent (Utility-based Agent)</span></p></td><td style=" vertical-align: top"><p><span>通过"效用函数"给多种可能的行动打分，选择最优方案。就像一个会权衡利弊、追求最优解的决策者。</span></p></td><td style=" vertical-align: top"><p><span>资源优化、路径规划</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="font-weight:bold">学习型 Agent (Learning Agent)</span></p></td><td style=" vertical-align: top"><p><span>能从经验中学习，不断优化决策策略。越用越聪明，像一个勤于复盘的员工。</span></p></td><td style=" vertical-align: top"><p><span>推荐系统、个性化助手</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="font-weight:bold">多智能体系统 (Multi-Agent)</span></p></td><td style=" vertical-align: top"><p><span>多个 Agent 协作分工，各司其职。就像一个分工明确的团队，每人负责一块。</span></p></td><td style=" vertical-align: top"><p><span>复杂任务分解、团队协作</span></p></td></tr></tbody></table></div>

<p id="t-uUweOyvtykPco1VZ58Rv0E"><span>初学者只需先掌握前两种，它们是最常见的基础形态。</span></p>


<a id="section-0365"></a>
## 工作流程：ReAct 循环

<a id="t-GmHzez05v41a3a0Jx0hLAP"></a>

<p id="t-eUdtDMFVkwPYZWxF4VLI8d"><span>了解了 Agent 的组成，下一个问题是：它是</span><span style="font-weight:bold">怎么运转起来</span><span>的？</span></p>

<p id="t-eEt2kUgWi1LrVClAbHPFwa"><span>AI Agent 通常遵循一个名为 </span><span style="font-weight:bold">ReAct = Reasoning（推理）+ Acting（行动）</span><span> 的经典思维范式。顾名思义，就是</span><span style="font-weight:bold">先想、再做、再想、再做</span><span>……这个循环不断重复，直到任务完成。</span></p>

<p id="t-El5bYJJuBRvpfFN7YHQGwY"><span>你可以把它想象成一个认真负责的新员工接到一个任务时的工作方式：</span><span style="font-style:italic">"我先想想该怎么做 → 去查一下资料 → 看看查到了什么 → 再想下一步 → 继续行动……"</span><span>，而不是一拍脑袋就乱做。</span></p>

<div id="t-ZQLN1vrlscTT0dTCKLZNah"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/78702f0d38074403b82add6d.png"/></div>


<a id="section-0366"></a>
## 用一个完整例子来跟踪这个循环

<a id="t-lGIqUZEOJQS79s9cOuhNMz"></a>

<p id="t-R9k20RljKK7CejotVoyxRw"><span>用户向 Agent 发出指令：</span><span style="font-weight:bold">"帮我在北京找一家评分高于 4.5 的意大利餐厅，并告诉我它的地址和招牌菜。"</span></p>

<p id="t-3Oyb5hgiEwuiDCyBIPkDoL"><span>下面我们一步一步跟着 Agent 的"思路"走：</span></p>

<p id="t-5356jOb0mqrcaJxFyXF4Zf"><span style="font-weight:bold">第 1 步：思考 (Think/Reason)</span></p>

<ul><li id="t-rTHGcMQ6GPlTNxL1sjCUnf"><span style="font-weight:bold">大脑分析目标</span><span>：Agent 的大脑（LLM）拿到这个任务，首先在脑子里梳理：</span><span style="font-style:italic">"这是一个信息查询任务，需要两类信息：① 找到符合条件的餐厅；② 获取地址和招牌菜。我目前什么都不知道，应该先去搜索。"</span></li></ul>

<ul><li id="t-klxUMekNAGbsd0ZorM3IXU"><span style="font-weight:bold">生成行动指令</span><span>：大脑决定：</span><span style="font-style:italic">"调用 </span><span style="font-style:italic">search_web</span><span style="font-style:italic"> 工具，关键词设为'北京意大利餐厅评分 4.5 以上'。"</span></li></ul>

<p id="t-EFAfjMlGieJt5KKJfXgxBM"><span>💡 </span><span style="font-weight:bold">注意</span><span>：这一步 Agent 还没有"做任何事"，它只是在"想"。LLM 的价值就体现在这里——能够理解意图、拆解任务、制定计划。</span></p>

<p id="t-jAh6xZRZmpuTNWm8540hhu"><span style="font-weight:bold">第 2 步：行动 (Act)</span></p>

<ul><li id="t-CHwRrgh7FsdokWs87kf4G6"><span style="font-weight:bold">调用工具</span><span>：Agent 根据上一步的决策，实际调用 </span><span>search_web</span><span> 工具，并传入关键词。</span></li></ul>

<ul><li id="t-Ff5wkfrLFGbJsENH1Xfln5"><span style="font-weight:bold">工具执行</span><span>：搜索工具在互联网上执行搜索，返回一批原始的搜索结果（网页标题、摘要、链接等）。</span></li></ul>

<p id="t-AB3fKSTXPoywOcOnIf4ja5"><span>💡 </span><span style="font-weight:bold">注意</span><span>：工具本身不会"思考"，它只是忠实执行。思考是大脑的工作，执行是工具的工作，分工明确。</span></p>

<p id="t-Q0KfLJqXOrJaQjlFLH0JFE"><span style="font-weight:bold">第 3 步：观察 (Observe)</span></p>

<ul><li id="t-K2G2KqEWuRMcK7DHs88ank"><span style="font-weight:bold">接收反馈</span><span>：Agent 获取到工具返回的搜索结果，并将结果存入</span><span style="font-weight:bold">记忆</span><span>中，供下一轮推理使用。</span></li></ul>

<ul><li id="t-t4KlwgeZfGZqm7v1m18LgX"><span>假设结果包含了若干家餐厅：Bottega 意库（评分 4.7）、Da Vittorio、Le Marche 等。</span></li></ul>

<p id="t-aBUwVj0aQS91gdIkRfnGRT"><span style="font-weight:bold">第 4 步：再思考 (Think Again)</span></p>

<ul><li id="t-n1JyTojWHO3Oa4VYGXZVEx"><span style="font-weight:bold">大脑再分析</span><span>：看到搜索结果后，大脑继续推理：</span><span style="font-style:italic">"好，我找到了几家候选餐厅。但用户要的是地址和招牌菜，这些在搜索摘要里没有。我需要进一步查询 Bottega 意库的详细信息。"</span></li></ul>

<ul><li id="t-CBy3HMSSwGppUnL85tp39m"><span style="font-weight:bold">生成新指令</span><span>：</span><span style="font-style:italic">"调用 </span><span style="font-style:italic">get_restaurant_details</span><span style="font-style:italic"> 工具，查询'Bottega 意库'的详细信息。"</span></li></ul>

<p id="t-H4Am9elZKKJzk0Hdq8RRt4"><span style="font-weight:bold">第 5 步：再行动 → 再观察（循环继续）</span></p>

<ul><li id="t-gD8gqJlkPd9j9RBrMy4I4C"><span>这个 </span><span style="font-weight:bold">思考 → 行动 → 观察</span><span> 的循环会不断重复，每一轮都让 Agent 离目标更近一步，直到大脑判断"我已经有了足够的信息来回答用户"。</span></li></ul>

<p id="t-94k12ladzQmhSdBWdyMS9w"><span style="font-weight:bold">第 6 步：输出最终答案 (Final Answer)</span></p>

<ul><li id="t-XKldVje0CmtJiw6cvPczhT"><span>当大脑确认任务完成，它将所有收集到的信息（存储在记忆中）整合起来，生成一个结构化、人性化的回复：</span></li></ul>

<ul><li id="t-jHOAD0pfY1jLuqDukizS5N"><span style="font-style:italic">"找到一家符合要求的餐厅：</span><span style="font-style:italic;font-weight:bold">Bottega 意库</span><span style="font-style:italic">（评分 4.7）。地址：北京市朝阳区三里屯路 XX 号。招牌菜：黑松露披萨、手工提拉米苏。"</span></li></ul>

<p id="t-G0iKuTtAw81f8zEpSjyb9y"><span>这个 </span><span style="font-weight:bold">思考 → 行动 → 观察 → 再思考…</span><span> 的循环，就是 AI Agent 自主完成复杂任务的核心动力机制。它不是一次性给出答案，而是像人一样</span><span style="font-weight:bold">逐步推进、边做边想</span><span>。</span></p>


<a id="section-0367"></a>
## Python 中实现 AI Agent

<a id="t-RKKaQJHR66fOl099S6yxSJ"></a>

<p id="t-SVKRQwjOB4bFhmHtzRFOXD"><span>理论讲完了，现在来看代码。一个 AI Agent 系统通常由几个核心模块协同工作，理解这个架构有助于我们明白它是如何思考和行动的。</span></p>

<div id="t-Cfy48SK9KHsGWMhdTAkMki"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/45395682f190c5bcc4653608.webp"/></div>

<p id="t-NjRMIUtR1RMq8Hoc0wNup9"><span style="border-bottom:1px solid">我们把每个模块拆开来，用简单的 Python 代码演示它的职责。初学者不必深究每一行代码，重点是理解</span><span style="border-bottom:1px solid;font-weight:bold">每个模块在做什么</span><span style="border-bottom:1px solid">。</span></p>


<a id="section-0368"></a>
## 感知模块 —— Agent 的&quot;眼睛和耳朵&quot;

<a id="t-CymkA8REuCLrH2ziYAHs7N"></a>

<p id="t-Tg45aovjJFlULhTJHeRvF9"><span style="border-bottom:1px solid">感知模块负责从</span><span style="border-bottom:1px solid;font-weight:bold">环境</span><span style="border-bottom:1px solid">中获取信息，即"接收到了什么输入"。环境可以是：</span></p>

<ul><li id="t-iPM6JrAazUJlfXa7xKMSuU"><span style="border-bottom:1px solid;font-weight:bold">数字世界</span><span>：一段文本、一个网页、数据库中的记录、API 返回的数据。</span></li></ul>

<ul><li id="t-ESA08mAK8RPK1PT2yzyfBI"><span style="border-bottom:1px solid;font-weight:bold">物理世界</span><span>（通过硬件）：摄像头图像、麦克风音频、传感器数据。</span></li></ul>

<p id="t-6v4UGLCdQQ5mNGSQTdjwxQ"><span style="border-bottom:1px solid">对于最常见的文本型 Agent，感知就是"接收用户输入的一句话"。</span></p>


<a id="section-0369"></a>
## 实例

<a id="t-ZsZE8HsHqve9BQ2PYFBHok"></a>

<pre id="t-I8V8poHz6RhP0YuiCv2AbG"><code># 感知模块：负责"接收"外部信息
def perceive_from_environment():
 """
    从环境中感知信息。
    在此示例中，环境就是命令行里用户输入的文字。
    """
    user_input = input("请输入您的指令或问题：")
 print(f"[感知模块] 接收到信息：'{user_input}'")
 return user_input  # 将感知到的内容传递给下一个模块（决策模块）

# 获取感知信息
current_observation = perceive_from_environment()</code></pre>


<a id="section-0370"></a>
## 决策模块（大脑）—— Agent 的&quot;指挥官&quot;

<a id="t-GeC95Ne5FQlAp3EnGQ1pgx"></a>

<p id="t-C6FRjRVqDdiRIWiHEEQjOI"><span style="border-bottom:1px solid">这是 Agent 的核心，通常由一个</span><span style="border-bottom:1px solid;font-weight:bold">AI 模型（如大语言模型 LLM）</span><span style="border-bottom:1px solid">驱动。它拿到感知模块传来的信息，负责做三件事：</span></p>

<ul><li id="t-jwaBUbJZEek6L4ukgd93y1"><span style="border-bottom:1px solid;font-weight:bold">理解</span><span>：这条信息是什么意思？用户想要什么？</span></li></ul>

<ul><li id="t-d7IeKFUk1NxqT2M4poAbHy"><span style="border-bottom:1px solid;font-weight:bold">推理</span><span>：当前情况下，我该怎么做？</span></li></ul>

<ul><li id="t-YxPz6VL0zrQ8Tz0rHH1xcg"><span style="border-bottom:1px solid;font-weight:bold">规划</span><span>：下一步（或接下来几步）应该调用哪个工具、做什么操作？</span></li></ul>

<p id="t-JYIiZuRdDnUnPOZYBPR8ul"><span style="border-bottom:1px solid">下面的代码用最简单的"关键词匹配"来模拟决策过程。真实的 Agent 里，这一步由 LLM 完成，能处理复杂得多的语义理解。</span></p>


<a id="section-0371"></a>
## 实例

<a id="t-cYuXVK1s0W0dxxJHXrXwWO"></a>

<pre id="t-WgvaoRnD4Z9mRJ7Q6LQzbE"><code># 决策模块：负责"思考"和"规划"
def make_decision(observation):
 """
    根据感知信息做出简单决策。
    这里用关键词匹配来模拟，实际中由 LLM 完成更复杂的推理。
    """
 print(f"[决策模块] 正在分析信息：'{observation}'")

 # 根据用户输入中的关键词，判断该调用哪个工具
 if "天气" in observation:
        decision = "调用天气查询工具"
 elif "计算" in observation:
        decision = "调用计算器工具"
 elif "结束" in observation:
        decision = "执行终止动作"
 else:
        decision = "进行通用对话回应" # 没有匹配到工具，就直接对话

 print(f"[决策模块] 决策结果：{decision}")
 return decision  # 将决策结果传递给行动模块

# 基于感知做出决策
current_decision = make_decision(current_observation)</code></pre>


<a id="section-0372"></a>
## 行动模块 —— Agent 的&quot;执行者&quot;

<a id="t-L3b8ciLCCfduF7hwifCOaD"></a>

<p id="t-llQVIPIinSMWWWc1pSDOZg"><span style="border-bottom:1px solid">决策模块输出的是"想法"（要做什么），行动模块则负责将想法变成"现实"（真的去做）。它执行具体的操作，从而影响外部环境，常见的行动包括：</span></p>

<ul><li id="t-9p7ej7DkMAAWfN1Tl7XEFa"><span style="border-bottom:1px solid;font-weight:bold">数字行动</span><span>：在屏幕上输出答案、调用某个函数、发起 API 请求、写入文件。</span></li></ul>

<ul><li id="t-JSZAKrchnruhS79yOdgSUo"><span style="border-bottom:1px solid;font-weight:bold">物理行动</span><span>（通过控制硬件）：控制机械臂移动、让音箱播放声音。</span></li></ul>


<a id="section-0373"></a>
## 实例

<a id="t-owW5a6uh2EYskfkGtugktD"></a>

<pre id="t-WQjLsLuGZNcTXe0yfvTUxH"><code># 行动模块：负责"执行"决策模块给出的指令
def execute_action(decision):
 """
    执行决策模块给出的指令，并返回执行结果。
    执行结果会被存入记忆，供下一轮推理使用。
    """
 print(f"[行动模块] 正在执行：{decision}")

 if decision == "调用天气查询工具":
 # 这里可以替换为真实的天气 API 调用
        result = "北京：晴，25℃。"
 elif decision == "调用计算器工具":
        result = "1+1=2"
 elif decision == "执行终止动作":
        result = "任务结束。"
 print(result)
        exit() # 结束整个程序
 else:
        result = f"我已理解您的意思：'{decision}'"

 print(f"[行动模块] 行动结果：{result}")
 return result  # 返回结果，进入"观察"阶段

# 执行决策，得到结果
action_result = execute_action(current_decision)</code></pre>


<a id="section-0374"></a>
## 记忆模块 —— Agent 的&quot;工作笔记&quot;

<a id="t-2nOrBm4hX1yfwmgyhXz9kW"></a>

<p id="t-j6NIBqOWz4zb9HZ5S4IbtD"><span style="border-bottom:1px solid">如果没有记忆，Agent 每次回复都是"失忆"状态——忘了你之前说过什么，忘了它自己做过什么。记忆模块解决了这个问题，它分两类：</span></p>

<ul><li id="t-Mi2geA5jk1G8DlXQCcWPFX"><span style="border-bottom:1px solid;font-weight:bold">短期记忆 / 对话历史</span><span>：记录本次对话中说过的话，让 Agent 在多轮对话中保持连贯。就像你和朋友聊天，你不需要每句话都重新解释背景。</span></li></ul>

<ul><li id="t-ZSrd7PQlLSpUHFjO8Xd2Yl"><span style="border-bottom:1px solid;font-weight:bold">长期记忆 / 知识库</span><span>：通过向量数据库等技术存储的专属知识（例如公司内部文档、用户偏好），用于增强模型的能力。初学者可暂时忽略这部分，先掌握短期记忆即可。</span></li></ul>

<p id="t-7puUQQi2J3XD75nQmMPHtP"><span style="border-bottom:1px solid">在下面的完整示例中，我们用一个 Python 列表来模拟短期记忆。</span></p>


<a id="section-0375"></a>
## 工具模块 —— Agent 的&quot;瑞士军刀&quot;

<a id="t-oSwC7T0lQhWUin0M7gjGu1"></a>

<p id="t-n32ky5hBRvpsovyTIy8ExX"><span style="border-bottom:1px solid">模型本身的能力是有限的（比如不知道实时天气、不能做复杂计算、不能操作文件）。工具模块为 Agent 提供了一套"外挂技能"，极大地扩展了其能力边界。工具可以是一个 Python 函数、一个第三方 API，或者一个完整的外部软件。</span></p>

<p id="t-aVNKu71Be5YRe7cTGFUvfn"><span style="border-bottom:1px solid">下面是一个最简单的工具示例：</span></p>


<a id="section-0376"></a>
## 实例

<a id="t-dGrODDeoE7WrKXGUF30PFp"></a>

<pre id="t-VAHCcS7l7TqRnqteMolb3g"><code># 工具模块示例：一个简单的计算器工具
def calculator_tool(expression):
 """
    接收一个数学表达式字符串，返回计算结果。
    这就是一个"工具"——等待被 Agent 的大脑按需调用。
    """
 try:
 # 注意：eval() 在生产环境中有安全风险，此处仅用于演示。
        result = eval(expression)
 return f"计算结果：{expression} = {result}"
 except Exception as e:
 return f"计算错误：{e}"

# 模拟：大脑决策后，调用这个工具
tool_result = calculator_tool("3 + 5 * 2")
print(tool_result) # 输出：计算结果：3 + 5 * 2 = 13
# 注意：Python 先算乘除后算加减，所以是 3 + 10 = 13，而不是 8 * 2 = 16</code></pre>


<a id="section-0377"></a>
## 实践练习：构建一个简单的命令行 AI Agent

<a id="t-atmZYOTNntx13B4bb1SSuA"></a>

<p id="t-7vaQLcRrr6U9M0Fg18y1uh"><span style="border-bottom:1px solid">上面我们分别介绍了每个模块。现在，让我们把它们</span><span style="border-bottom:1px solid;font-weight:bold">组合</span><span style="border-bottom:1px solid">起来，创建一个能进行持续对话和工具调用的完整迷你 Agent。</span></p>

<p id="t-vZSuM4TcrqNC0BSH9pYlHB"><span style="border-bottom:1px solid">运行前，请先在脑海中过一遍这个结构：</span></p>

<ul><li id="t-cgqyMHZFEl3SSdt8HpecdR"><span>用户输入 →</span><span style="border-bottom:1px solid;font-weight:bold">感知</span><span>→</span><span style="border-bottom:1px solid;font-weight:bold">决策</span><span>（关键词匹配）→</span><span style="border-bottom:1px solid;font-weight:bold">行动</span><span>（调用工具或对话）→ 输出结果 →</span><span style="border-bottom:1px solid;font-weight:bold">记忆</span><span>（存入历史）→ 等待下一轮输入</span></li></ul>


<a id="section-0378"></a>
## 实例

<a id="t-2nBAR9Sf1DVIaQTo5uGPwP"></a>

<pre id="t-Rd1WrB6I9miyeuhQVxw682"><code># 完整迷你 AI Agent 示例
import random

# ==================== 工具定义 ====================
def get_weather(city):
 """工具1：模拟天气查询（实际可替换为真实天气 API）"""
    weather_options = ["晴", "多云", "小雨", "大风"]
    temperature = random.randint(15, 35)
 return f"{city}的天气是{random.choice(weather_options)}，气温{temperature}℃。"

def simple_calculator(a, b, operator):
 """工具2：简单计算器"""
 if operator == '+':
 return f"{a} + {b} = {a + b}"
 elif operator == '-':
 return f"{a} - {b} = {a - b}"
 else:
 return "暂不支持此运算。"

# ==================== 记忆（短期）====================
# 用列表模拟对话历史，每一条都是一个字符串
conversation_history = []

# ==================== Agent 主循环 ====================
def run_simple_agent():
 print("【简单AI Agent已启动】输入'退出'来结束对话。")
 print("提示：你可以问天气（如'北京今天天气'）或做计算（如'计算1+1'）\n")

 while True:
 # ---- 感知阶段：获取用户输入 ----
        user_input = input("您：")
        conversation_history.append(f"用户：{user_input}")

 # 特殊指令：退出
 if user_input.lower() in ["退出", "exit", "quit"]:
 print("Agent：再见！")
 break

 # ---- 决策 + 行动阶段：根据输入选择工具或对话 ----
        response = ""

 if "天气" in user_input:
 # 尝试从输入中识别城市名，默认用北京
            city = "北京"
 for c in ["北京", "上海", "广州", "深圳"]:
 if c in user_input:
                    city = c
 break
 # 调用天气工具
            response = get_weather(city)

 elif "计算" in user_input or "+" in user_input or "-" in user_input:
 # 简单的模式匹配，识别几个固定的计算表达式
 if "1+1" in user_input:
                response = simple_calculator(1, 1, '+')
 elif "10-5" in user_input:
                response = simple_calculator(10, 5, '-')
 else:
                response = "请尝试输入'计算1+1'或'计算10-5'。"

 else:
 # 没有匹配到工具，退化为普通对话
            default_responses = [
 "我理解您的意思了。",
 "这是一个有趣的话题！",
 "我目前的技能有限，可以试试问我天气或做简单计算。",
 "嗯，请继续说。"
 ]
            response = random.choice(default_responses)

 # ---- 输出 + 记忆阶段：打印回复，并存入历史 ----
 print(f"Agent：{response}")
        conversation_history.append(f"Agent：{response}")

 # 对话结束后，打印完整的对话历史（模拟短期记忆的内容）
 print("\n=== 本次对话历史（短期记忆内容） ===")
 for line in conversation_history:
 print(line)

# 启动 Agent
if __name__ == "__main__":
    run_simple_agent()</code></pre>

<p id="t-jDug52RQJWjfFngsly6fYn"><span style="border-bottom:1px solid;font-weight:bold">运行这个程序，你将体验到：</span></p>

<ul><li id="t-Gy2sSQbEZNKMUunvnHtRjW"><span>一个能</span><span style="border-bottom:1px solid;font-weight:bold">持续多轮对话</span><span>的循环（感知模块不断运转）。</span></li></ul>

<ul><li id="t-FsZAAG4GIoOQE5rGZHKktl"><span>根据你的输入关键词（如"天气"、"计算"）</span><span style="border-bottom:1px solid;font-weight:bold">自动触发不同的工具</span><span>（行动模块）。</span></li></ul>

<ul><li id="t-OJcdlBBLqbFyJoGsnN8GRk"><span>对话结束后可以看到完整的</span><span style="border-bottom:1px solid;font-weight:bold">对话历史记录</span><span>（记忆模块）。</span></li></ul>

<p id="t-h7OunvoL1ttjIVWtjR42mh"><span style="border-bottom:1px solid">💡</span><span style="border-bottom:1px solid;font-weight:bold">思考一下</span><span style="border-bottom:1px solid">：如果你想让这个 Agent 更强大，可以尝试：① 增加更多工具（如查汇率、翻译）；② 把决策模块中的关键词匹配替换为真实的 LLM API 调用，Agent 就能理解自然语言了！</span></p>


<a id="section-0379"></a>
## 总结与展望

<a id="t-2G6cf6Pq2GdXXmEB2Niu9x"></a>

<p id="t-Ilxa3qMnnM0h7dmRlDWp05"><span style="border-bottom:1px solid">通过本文，你应该已经掌握了 AI Agent 的基本概念：</span></p>

<ul><li id="t-zvzP33EK4pUand9WS8zh7l"><span>它是由</span><span style="border-bottom:1px solid;font-weight:bold">感知、决策（大脑）、行动、记忆、工具</span><span>等模块组成的智能程序；</span></li></ul>

<ul><li id="t-inT5qrGRzM0Yqxzwk0Osrg"><span>它通过</span><span style="border-bottom:1px solid;font-weight:bold">ReAct 循环</span><span>（思考 → 行动 → 观察 → 再思考）自主追求目标；</span></li></ul>

<ul><li id="t-o4WOcbI3oXxf48OBNbnJA7"><span>LLM 是它的大脑，工具是它的手脚，记忆让它保持连贯。</span></li></ul>

<p id="t-EeiV2e7ONWFUSZhy8VcsMN"><span style="border-bottom:1px solid">一句话记住核心：</span><span style="border-bottom:1px solid;font-weight:bold">LLM 只能"说"，Agent 能"做"。</span></p>


<a id="section-0380"></a>
## 下一步学习建议

<a id="t-LmEFwPKPCLMKogD9ZpLg0D"></a>

<ul><li id="t-Tl7cMirH6yfLdbONh8ZsVg"><span style="border-bottom:1px solid;font-weight:bold">深入大语言模型（LLM）API</span><span>：学习如何调用 OpenAI GPT、DeepSeek、通义千问等模型的 API，将它们作为你 Agent 的真正大脑，替换掉我们示例中简陋的关键词匹配。</span></li></ul>

<ul><li id="t-kk1E9H7b6XePIfvRtW62dx"><span style="border-bottom:1px solid;font-weight:bold">学习 Agent 开发框架</span><span>：探索</span><span style="border-bottom:1px solid;font-weight:bold">LangChain</span><span>、</span><span style="border-bottom:1px solid;font-weight:bold">LlamaIndex</span><span>或</span><span style="border-bottom:1px solid;font-weight:bold">AutoGen</span><span>等成熟框架。它们把记忆、工具链、任务编排等模块都封装好了，用它们可以事半功倍，避免重复造轮子。</span></li></ul>

<ul><li id="t-TEVRsFNZVf22nViCoSKl9i"><span style="border-bottom:1px solid;font-weight:bold">接入真实工具</span><span>：尝试将你的 Agent 连接到真实的 API，例如数据库、邮件系统或天气服务，解决实际问题。这一步会让你对"工具"的概念有全新的体会。</span></li></ul>

<ul><li id="t-SOoLnFUj7pje06Q58ElsgX"><span style="border-bottom:1px solid;font-weight:bold">学习提示工程（Prompt Engineering）</span><span>：如何给 LLM 写出高质量的"指令"，直接决定 Agent 大脑的发挥水平。这是开发高效 Agent 不可忽视的关键技能。</span></li></ul>

<p id="t-oQwl248nTfzd4VSqb3J1CM"><span style="border-bottom:1px solid">AI Agent 的世界广阔而充满可能，从自动化个人助手到企业级智能解决方案，它正在成为人机交互的新范式。希望你以此文为起点，开始构建属于自己的智能体。</span></p>


<a id="section-0381"></a>
## AI 底层架构

<a id="t-block-14597"></a>

<p id="t-z03tgyFCtLpl9rwsHrP8Iv"><span>下图展示了基础大模型到智能体应用的完整 AI 系统架构：</span></p>

<div id="t-132bQZQkSNFwcAC4VfMYyy"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/2ebdebf5d94a994f1f67b3b4.png"/></div>

<div id="t-ckRxeUVy9pjRLT4kgoYGcK"><table><colgroup><col width="120"/><col width="193.9061279296875"/><col width="182.89752197265625"/><col width="182.89752197265625"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>层级</span></p></td><td style=" vertical-align: top"><p><span>核心组件</span></p></td><td style=" vertical-align: top"><p><span>核心作用</span></p></td><td style=" vertical-align: top"><p><span>典型能力</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">基础层（模型）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">LLM &amp; Token、Transformer 架构、Token 化、注意力机制</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">AI 的底层计算核心；负责文本理解、Token 预测、语言生成</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">自然语言理解、文本生成、上下文建模、概率预测</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">上下文层（记忆）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Context Window、Prompt、Memory、RAG</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">管理模型输入上下文；负责短期记忆、长期记忆、外部知识注入</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Prompt 控制、会话记忆、知识检索、上下文增强</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">能力扩展层（工具）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">MCP、Tool Calling、API、Database</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">让 AI 不止聊天；通过工具调用扩展真实世界操作能力</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">联网搜索、代码执行、数据库查询、API 调用</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">智能体层（决策）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Agent、Explore、Plan、Act</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">AI 自主决策大脑；负责目标理解、任务拆解、规划与闭环执行</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">任务规划、多步骤推理、自主决策、闭环执行</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">应用层（行动）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Agent Skill、Workflow、Automation</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">面向具体业务场景；将 Agent 能力封装为可落地产品</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">自动化工作流、行业AI助手、企业智能系统、AI SaaS应用</span></p></td></tr></tbody></table></div>


<a id="section-0382"></a>
## 核心名词释义

<a id="t-y7NUyTQliXlECWVS8Cw9L0"></a>

<ul><li id="t-bb3Vx9iWFV04PaM5Qsji9Z"><span style="font-weight:bold">Transformer</span><span>：当前大模型核心架构，通过自注意力机制建立 Token 之间关联关系。</span></li></ul>

<ul><li id="t-H50Uw8DKrFDucVkrmANaeF"><span style="font-weight:bold">Token</span><span>：模型处理文本最小单位，可为子词、单词、字符或符号。</span></li></ul>

<ul><li id="t-WMDQX02H2FckjwDJtTd3z1"><span style="font-weight:bold">Prompt</span><span>：给到模型的输入指令，用来设定角色、控制行为、规范输出格式与目标。</span></li></ul>

<ul><li id="t-Bun7ilhjF6VXNKfPUO1Okw"><span style="font-weight:bold">RAG</span><span>：检索增强生成，先检索外部专业知识库，再交由 LLM 整合生成精准答案。</span></li></ul>

<ul><li id="t-G8vW3ybEAc3z13cu4YJ3NS"><span style="font-weight:bold">MCP</span><span>：模型上下文协议 ( Model Context protocol )，统一 AI 与工具、数据库、外部服务的通信标准。</span></li></ul>

<ul><li id="t-EO9S6O53wNzMTiTYZqg3O7"><span style="font-weight:bold">Agent</span><span>：在 LLM 基础上叠加</span><span style="font-weight:bold">目标+规划+执行</span><span>能力的自主智能系统。</span></li></ul>

<ul><li id="t-YR8vj7qV2YofjFY9kzKIkS"><span style="font-weight:bold">Tool Calling</span><span>：模型主动识别需求、调用外部工具完成实际操作，不局限纯文本回复。</span></li></ul>

<ul><li id="t-SWNogcigjeTPT7Qg250tT9"><span style="font-weight:bold">Memory</span><span>：为 AI 提供短期会话记忆 + 长期持久记忆，解决上下文遗忘问题。</span></li></ul>


<a id="section-0383"></a>
## AI Agent 完整运行流程

<a id="t-kyM58KNQGlFMDzC0FNQpAu"></a>

<ul><li id="t-otb2dWfducxi66S9GbM9RA"><span style="font-weight:bold">用户输入</span><span>：用户下发指令 Prompt，进入上下文窗口 Context Window。</span></li></ul>

<ul><li id="t-JHFZWz0Cg7HgjtncAZasSz"><span style="font-weight:bold">记忆增强</span><span>：系统联动 Memory 会话记忆 + RAG 外部知识库，补充上下文与专业知识。</span></li></ul>

<ul><li id="t-Q5Y2Y9o6Bqq4UHmVFaX3FF"><span style="font-weight:bold">LLM 推理</span><span>：通过 Transformer 架构对 Token 序列做注意力计算，进行语义理解与初步生成。</span></li></ul>

<ul><li id="t-u2OQ8u1MCOGLGNWueTWohV"><span style="font-weight:bold">Agent 规划</span><span>：智能体自主判断、拆解任务，决策是否需要多步骤执行或调用外部工具。</span></li></ul>

<ul><li id="t-w4hmH7I3l7Lufb1sFcAOvp"><span style="font-weight:bold">工具执行</span><span>：基于 MCP 协议，调用 API、数据库、搜索引擎等外部能力完成实操。</span></li></ul>

<ul><li id="t-IfwXZnhkj9E3GIEITkxZWo"><span style="font-weight:bold">输出结果</span><span>：汇总工具返回数据与模型推理结果，整理后返回用户，同时写入记忆存档。</span></li></ul>


<a id="section-0602"></a>
## Agent 架构

<a id="t-block-15573"></a>

<p id="t-7kbwHtx4TulyjleA7D6ncB"><span>Agent（智能体）是指能够自主感知环境、推理并采取行动以完成目标的 AI 系统。</span></p>

<p id="t-kOMy6XyewKn1Ib7xc0m9m2"><span>本文从最简单的循环到多 Agent 协作，一文读懂六种主流架构的原理、图解与适用场景，帮助你在实际项目中做出合适的技术选型。</span></p>

<div id="t-KgezRgWr7ydzNGo1OfDIhz"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/3e14f685d74a1c8db4de95d5.png"/></div>


<a id="section-0603"></a>
## 什么是 Agent 架构

<a id="t-8hM4sUrIfZ5Bmns6k9xMeL"></a>

<p id="t-xWLnt240ArKUrj6h4ASKH7"><span>在 AI 应用开发中，</span><span style="font-weight:bold">Agent（智能体）</span><span>是指能够感知环境、自主做出决策、并采取行动的 AI 系统。</span></p>

<p id="t-ZJo59pdcyEglhGl5nYypqd"><span>与传统的"问一答一"式大模型调用不同，Agent 可以连续地执行多步操作，调用工具，甚至协调其他 Agent，来完成复杂任务。</span></p>

<p id="t-4BjVsBlbW7tthtoLNBRPhU"><span style="font-weight:bold">Agent 架构</span><span>是指 Agent 系统中各个组件的组织方式，决定了 Agent 的能力边界、可靠性、灵活性和适用场景。</span></p>

<div id="t-gjobMSEdDzOXyVVKsteAKP"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/75c1dc16fc3553c81b445b49.png"/></div>

<p id="t-aSdGMsVT1ODFEH0e7rQ3uH"><span>Agent 的工作方式本质上是一个</span><span style="font-weight:bold">循环（Loop）</span><span>——感知当前状态，推理下一步，执行行动，再次感知……直到任务完成。</span></p>

<p id="t-tbEc4Rbdl0WV9b662fZPOF"><span>不同架构的差异，就在于如何组织和扩展这个基本循环。</span></p>

<blockquote id="t-Uhqk0RPIANtgN5zEAGvE6R"><p id="t-LACwDsyHPs4py5XgUqcQbd"><span style="font-style:italic">本文假设你已了解大语言模型（LLM）的基本概念，以及"工具调用"（Function Calling）的基本思路。如果还不熟悉，可以先了解这两个基础知识。</span></p></blockquote>


<a id="section-0604"></a>
## 架构一：单 Agent 循环（Single Agent Loop）

<a id="t-Rb7GIfuG9v1pbboTj5IKH4"></a>

<p id="t-HIP1rmiGqsYYoJm5QHjhUI"><span style="font-weight:bold">入门首选</span><span style="font-weight:bold">实现简单</span></p>

<div id="t-ShICMOtnRYYR0cHtgAu4vf"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/fdc8c5b8659c666c796ae2f7.png"/></div>

<p id="t-YQ5su3ZiAERAr0k1kHKwQN"><span>最基础也最直观的架构，一个 Agent 从头到尾独立完成所有任务。</span></p>

<p id="t-ruHw6c19vG4VwBMloXNUAd"><span>单 Agent 循环直接体现了 </span><span style="font-weight:bold">ReAct 模式</span><span>（Reasoning + Acting）：每一步都是"先想再做"。LLM 充当大脑，工具调用是它的双手。</span></p>

<p id="t-NGu5eZV65TMNJSpiybjhFn"><span>图 1 — 单 Agent 循环流程</span></p>

<div id="t-WYl3JS5Ou7ePrAxRYrGsgG"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/18a70e55334b8148057859b9.png"/></div>


<a id="section-0605"></a>
## 工作原理

<a id="t-8EV074VdKF5myc04DQF5N4"></a>

<p id="t-PiwStN12hvoOXsCxPc9gu2"><span style="font-weight:bold">感知：</span><span>读取当前状态——文件内容、环境变量、之前步骤的输出结果，整合成当前上下文。</span></p>

<p id="t-Q6RvG0sQ0GFISpIFJa5QLh"><span style="font-weight:bold">推理：</span><span>LLM 根据上下文决定下一步动作——调用哪个工具、传入什么参数，或者判断任务是否已完成。</span></p>

<p id="t-P4Plvg3KovkxpYuvpgp9H6"><span style="font-weight:bold">行动：</span><span>执行工具调用，例如读写文件、搜索网络。工具的执行结果会被追加到上下文中，进入下一轮循环。</span></p>

<blockquote id="t-C1rYTwrDydxOaAosrJZtSx"><p id="t-zhoXCKv5Xl6aUUkDVqZZ8P"><span style="font-style:italic">每次工具调用的结果都会回写到上下文（Context Window）。因此随着任务推进，上下文会不断增长，直到触达 LLM 的上下文窗口限制——这是单 Agent 循环最主要的瓶颈。</span></p></blockquote>


<a id="section-0606"></a>
## 实例

<a id="t-bduPICGrf701ERdq9hNhMA"></a>

<pre id="t-JhxGOVTfLcrBKaAprdUblE"><code># 单 Agent 循环的简化实现 —— 展示 ReAct 模式的核心逻辑

class SimpleAgent:
 """单 Agent 循环的基本结构"""

 def __init__(self, model, tools, max_turns=10):
        self.model = model          # 大语言模型
        self.tools = tools          # 可用工具列表
        self.max_turns = max_turns  # 最大循环轮次，防止无限循环

 def run(self, task: str) -&gt; str:
 """执行任务的主循环"""
        context = f"用户任务：{task}"

 for turn in range(self.max_turns):
 # 第一步：思考 —— 让模型决定下一步
            response = self.model.think(context)

 # 如果模型认为任务完成，返回最终答案
 if response.is_final():
 return response.content

 # 第二步：行动 —— 调用模型选择的工具
            tool_name = response.tool_name
            tool_args = response.tool_args
            tool_result = self.tools[tool_name](**tool_args)

 # 第三步：将工具结果反馈给模型，进入下一轮
            context += f"\n工具 {tool_name} 返回：{tool_result}"

 return "达到最大轮次，任务未完成"

# 使用示例
agent = SimpleAgent(model=llm, tools={
 "read_file": read_file,
 "search_code": search_code,
 "run_test": run_test
})
result = agent.run("修复 runoob 项目中 user.py 的类型错误")</code></pre>

<a id="t-ojHDhn0Q66lbuBMRDt0t1v"></a>

##### 优点

<ul><li id="t-fvLOBTNzpSu9h2zwcT4Ajh"><span>实现最简单，易于调试</span></li></ul>

<ul><li id="t-KHHRMTfa1nnzlO0h23O0Cq"><span>适合任务边界清晰的场景</span></li></ul>

<ul><li id="t-2mOQ1OOvWCXTL0nLxsrc4R"><span>几乎所有 Agent 框架都支持</span></li></ul>

<a id="t-ANXwyFrADX7ZTNprxyS7Of"></a>

##### 缺点

<ul><li id="t-L1TPNUGYNiPcHsWLZ56xRp"><span>上下文窗口容易撑满</span></li></ul>

<ul><li id="t-of8fdqDpVjnEa4VRhdBysj"><span>复杂任务中容易"偏航"</span></li></ul>

<ul><li id="t-Cn7V5n9upyTEPvOKDaISON"><span>无法并行处理多个子任务</span></li></ul>

<p id="t-vcpjivapuno8DqACDMyrqD"><span style="background-color:#eafaf1">最佳适用场景：</span><span>修复一个 bug、编写一个函数、回答一个具体问题。任务明确，复杂度适中，不需要并行或多角色协作。</span></p>

<blockquote id="t-CkiprdDxMnX7KNVS2wuEVw"><p id="t-Byhl7WLuER9X9hnDPqTzVa"><span style="font-style:italic">如果你的任务预计需要超过 15 轮工具调用，单 Agent 循环可能不是最佳选择。考虑使用多 Agent 协作或规划执行架构来分解复杂度。</span></p></blockquote>


<a id="section-0607"></a>
## 架构二：规划 + 执行（Plan &amp; Execute）

<a id="t-Bxc6s19UqPakiYDsFIAyJw"></a>

<div id="t-dbeRhRO2ixlq3PL9IZLrGG"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/18ff90da0ac0d975681e5b44.png"/></div>

<p id="t-jy00Mqcj6zI6KbLXRSxZpE"><span>将"想清楚要做什么"和"实际去做"分离为两个独立阶段，提升任务的可预测性和可审计性。</span></p>

<p id="t-3WR8PW8WWbI36whWZXJFKf"><span>规划 + 执行架构将 Agent 的工作拆分为两个明确阶段：先</span><span style="font-weight:bold">规划（Plan）</span><span>，再</span><span style="font-weight:bold">执行（Execute）</span><span>。</span></p>

<p id="t-CmAn7awM5Y5Uis3lKbDQGM"><span>在规划阶段，模型不执行任何操作，只生成一份详细的执行步骤列表。在执行阶段，系统依次完成每个步骤。这种分离让用户可以在执行前审查计划，就像 Claude Code 的 Plan Mode 一样。</span></p>

<p id="t-SmFhtaaqlozwVrSBPzW4aB"><span>图 2 — 规划 + 执行架构（含动态重规划）</span></p>

<div id="t-jYcuFYYrOcIenzuS12Iavi"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/4493171e63670c961d23b092.png"/></div>


<a id="section-0608"></a>
## 两种变体

<a id="t-mUsrG9xgjhRs2zcEcwNC0I"></a>

<div id="t-Qtz1reXHHmMkGB6K2WnHVI"><table><colgroup><col width="87.89755249023438"/><col width="281.89752197265625"/><col width="338.3385009765625"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>变体</span></p></td><td style=" vertical-align: top"><p><span>行为</span></p></td><td style=" vertical-align: top"><p><span>典型场景</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>静态规划</span></p></td><td style=" vertical-align: top"><p><span>计划一次性生成，按顺序线性执行，不中途调整</span></p></td><td style=" vertical-align: top"><p><span>流程固定、步骤明确的任务，如数据迁移脚本</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>动态规划</span></p></td><td style=" vertical-align: top"><p><span>每执行一步后重新评估，根据结果调整后续计划</span></p></td><td style=" vertical-align: top"><p><span>结果不确定的任务，如调试、探索性数据分析</span></p></td></tr></tbody></table></div>

<p id="t-5It2rABZjWyKXDW05AhnPQ"><span>动态规划更健壮，但实现复杂度更高，且每步重新规划会消耗额外的 token。</span></p>

<blockquote id="t-GdomTAwvI1nnC7ZchZ7BCs"><p id="t-AeQUmmlFJJClXyaU8leBuM"><span style="font-style:italic">Claude Code 的 Plan Mode 就是这个架构的体现——点击"计划"后，AI 先输出一份详细计划供你审查，确认后才开始执行。这大幅提升了用户的掌控感。</span></p></blockquote>


<a id="section-0609"></a>
## 实例

<a id="t-WoqzUyDR6p19FOIPJutxwo"></a>

<pre id="t-rWngyVdliwe1uHT915XU2G"><code># Plan &amp; Execute 架构的简化实现

class PlanExecuteAgent:
 """先规划、后执行的 Agent"""

 def plan(self, task: str) -&gt; list:
 """阶段一：生成执行计划"""
        plan = self.model.generate(f"""
        请将以下任务拆解为可执行的步骤列表：
        任务：{task}
        返回 JSON 格式的步骤列表，每步包含：
        - step_id: 步骤编号
        - description: 步骤描述
        - tool: 需要调用的工具名
        """)
 return plan

 def execute(self, plan: list, dynamic: bool = False) -&gt; str:
 """阶段二：逐步执行计划"""
        results = []
        remaining_plan = plan.copy()

 while remaining_plan:
            step = remaining_plan.pop(0)
            output = self.tools[step["tool"]](step["description"])
            results.append({"step": step["step_id"], "output": output})

 if dynamic and remaining_plan:
 # 动态规划：根据当前结果重新评估后续计划
                remaining_plan = self.replan(remaining_plan, results)

 return self.summarize(results)

# 使用示例
agent = PlanExecuteAgent()
plan = agent.plan("为 runoob 项目添加用户认证功能")
# 人类可以先审查 plan，确认合理后再执行
result = agent.execute(plan, dynamic=True)</code></pre>

<a id="t-E8HLTffhercVEBwfbmpDO6"></a>

##### 优点

<ul><li id="t-6UPNZIOm9vRHYSVaF7GuVC"><span>执行前可人工审查计划</span></li></ul>

<ul><li id="t-j02o7zOINeOyHc5QtxsFu1"><span>推理和执行职责分离，清晰</span></li></ul>

<ul><li id="t-BcpSbilSyN1OiVGmqrECnB"><span>对长任务友好</span></li></ul>

<a id="t-SfMTGc6oPzWJ4E33l70Yyo"></a>

##### 缺点

<ul><li id="t-9UFm8VlVo76h3KyThf2nzC"><span>初始计划可能不够准确</span></li></ul>

<ul><li id="t-F4QqtTVg5kx7lUfC5VzrlT"><span>两阶段增加了延迟</span></li></ul>

<ul><li id="t-nddNRbEhcWajesZztMOZzl"><span>静态版本难以应对意外情况</span></li></ul>

<blockquote id="t-ecgbzrzVOXvVGIS9fhkMpj"><p id="t-GJbnMVVGC4VTugIbuQVeKX"><span style="font-style:italic">Plan &amp; Execute 的代价是增加了推理轮次，对于简单任务反而是一种浪费。如果一个任务可以在 3 步内完成，直接用单 Agent 循环更高效。</span></p></blockquote>


<a id="section-0610"></a>
## 架构三：多 Agent 协作（Multi-Agent）

<a id="t-M8AgLO0OQbgvuA6W4jrfM1"></a>

<div id="t-NbR2NVS13G0durtHtFFiks"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/7649b7af9ad48e4c7eac3616.png"/></div>

<p id="t-54eIS0heha7cM4R7AevrlQ"><span>一个 Orchestrator（协调者）负责任务拆解和调度，多个 Subagent 各司其职，并行或串行地完成子任务，结果汇聚回 Orchestrator 做综合。</span></p>

<p id="t-5sq2HVpStcnL5PcEse7HVb"><span>当单个 Agent 面临上下文窗口不足或任务过于复杂时，多 Agent 架构提供了一个优雅的解决方案：</span><span style="font-weight:bold">让多个专门化的子 Agent 并行工作</span><span>，由一个 Orchestrator（协调者）统筹全局。</span></p>

<p id="t-bI4t2ZwEDxFacsorbEdY7I"><span>图 3 — 多 Agent 协作架构（Orchestrator + Subagents）</span></p>

<div id="t-ch2jAa0Jr12LTTfrVWkP2P"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/d294750e384cd1de3422762d.png"/></div>


<a id="section-0611"></a>
## 独立上下文是核心优势

<a id="t-jlaYYwJScdhrrTf2YjvYg8"></a>

<p id="t-EaW4SXITuYqYnF5OYBwWlL"><span>每个子 Agent 拥有</span><span style="font-weight:bold">独立的上下文窗口</span><span>。代码审查 Agent 深度阅读 auth.py 不会影响性能分析 Agent 的判断；安全检测 Agent 产生的大量中间输出不会挤占其他 Agent 的空间。</span></p>

<blockquote id="t-Nc7h5A5ga0IdueUDhFyiDG"><p id="t-hecjACQaHwoJxDOyef4YrM"><span style="font-style:italic">子 Agent（Subagent）是短暂的、隔离的——完成一个任务后即销毁。Agent 团队（Agent Teams）则是多个独立 Agent 实例长时间协作、互相发消息，更像一个真实的团队。</span></p></blockquote>


<a id="section-0612"></a>
## 实例

<a id="t-ToMgDTeEfjo8b1CRaME1CR"></a>

<pre id="t-DVnkrfiMsxgrVIjtDI0LO6"><code># 多 Agent 协作的简化实现

class Orchestrator:
 """编排器：负责任务拆解、分发和结果汇总"""

 def __init__(self):
        self.subagents = {
 "code_review": Subagent(
                name="代码审查",
                tools=["read_file", "static_analysis"],
                system_prompt="你是代码审查专家..."
 ),
 "security": Subagent(
                name="安全检测",
                tools=["scan_vulnerability", "check_deps"],
                system_prompt="你是安全检测专家..."
 ),
 "performance": Subagent(
                name="性能分析",
                tools=["profile_code", "analyze_complexity"],
                system_prompt="你是性能分析专家..."
 )
 }

 def handle_task(self, task: str) -&gt; dict:
 # 第一步：分析任务，决定需要哪些 Subagent
        needed = self.plan(task)

 # 第二步：并行分发（各 Subagent 同时工作，独立上下文）
        results = {}
 for agent_name in needed:
            sub_task = self.decompose(task, agent_name)
            results[agent_name] = self.subagents[agent_name].run(sub_task)

 # 第三步：汇总各 Subagent 的结果，综合输出
 return self.synthesize(task, results)

# 使用示例：一次运行，三个维度并行分析
orch = Orchestrator()
report = orch.handle_task("审查 runoob 项目 PR #42")</code></pre>

<a id="t-eAZTsf6vAANYzqj6zBJSFV"></a>

##### 优点

<ul><li id="t-1Ek9Qy4gOkv3h9Jdur89hh"><span>天然支持并行，速度快</span></li></ul>

<ul><li id="t-PXbu8NwpjOPVa5gVdx0xee"><span>子 Agent 各自独立，上下文互不干扰</span></li></ul>

<ul><li id="t-R60VbX8ZJ1LNcXYuhxt0lB"><span>可以专门化每个子 Agent 的角色</span></li></ul>

<a id="t-QhzpPlq8q1KcOpOyXJrapn"></a>

##### 缺点

<ul><li id="t-tHv4BdeHj55sK1fKXVgTNS"><span>协调逻辑复杂，调试困难</span></li></ul>

<ul><li id="t-4xF4k02natxT4KnHzDo9WC"><span>多个 Agent 并行的 Token 成本更高</span></li></ul>

<ul><li id="t-BI7P0YFr7T6LYsx7Uuz1ro"><span>Orchestrator 本身可能成为瓶颈</span></li></ul>

<blockquote id="t-OMRmtyPNyEsNoJmKHUrpoj"><p id="t-LYepBHqyoNfXvsMWJhvU3o"><span style="font-style:italic">多 Agent 协作的主要成本是编排开销。如果子任务非常简单（每个只需 1-2 步），编排开销可能超过实际工作的开销，此时单 Agent 更合适。</span></p></blockquote>


<a id="section-0613"></a>
## 架构四：反思与自我修正（Reflection）

<a id="t-fNoNedAcnYLTcmwYpY5U5f"></a>

<div id="t-Dxm8OkPFtFihrhNR7IzHTF"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/ca69c395a1dedd85a44092be.png"/></div>

<p id="t-nv7zal7erFMrQSuOHstROn"><span>在 Agent 的输出环节加入质量评估，不满意则重新生成或修正，形成内部迭代循环。</span></p>

<p id="t-qQGFRPrDmpAS0e37r70i6I"><span>反思架构为 Agent 增加了一个"质检环节"：每次生成输出后，都由一个</span><span style="font-weight:bold">评判者（Critic）</span><span>来评估质量，如果不达标则要求修正，直到输出满足标准。</span></p>

<p id="t-Dm2f6CVO7XhTViTJwPnx6c"><span>这就像开发者写完代码后自己跑一遍测试——在交付之前先自查一遍。</span></p>

<p id="t-IJg3U7efGz5gSVzV2VloMF"><span>图 4 — 反思与自我修正架构</span></p>

<div id="t-etNFlhUA9Qdck29FxB8hJp"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/cbd6faac52ff98ead5421782.png"/></div>


<a id="section-0614"></a>
## 两种实现方式

<a id="t-hcznlEEUyZuOT8t5etLM8M"></a>

<div id="t-5mjSFjCNjRjYubEqPOOYVP"><table><colgroup><col width="120"/><col width="213.899169921875"/><col width="167.00848388671875"/><col width="192.1058349609375"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>方式</span></p></td><td style=" vertical-align: top"><p><span>机制</span></p></td><td style=" vertical-align: top"><p><span>优点</span></p></td><td style=" vertical-align: top"><p><span>缺点</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>自我反思</span></p></td><td style=" vertical-align: top"><p><span>同一个模型先执行再评估自己的输出</span></p></td><td style=" vertical-align: top"><p><span>实现简单，无额外模型成本</span></p></td><td style=" vertical-align: top"><p><span>模型可能对自己的错误"视而不见"</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>Critic 模型</span></p></td><td style=" vertical-align: top"><p><span>用独立的评判模型评估执行模型的输出</span></p></td><td style=" vertical-align: top"><p><span>更客观，能发现执行模型盲区</span></p></td><td style=" vertical-align: top"><p><span>增加模型调用成本和延迟</span></p></td></tr></tbody></table></div>

<blockquote id="t-iK7YNcNBN9OOblreB1Anmb"><p id="t-TYCQsmwbnL7OO3SQ7Zb7Gs"><span style="font-style:italic">"写单元测试 → 运行测试 → 观察失败 → 修复代码 → 再次运行"——这就是反思架构的经典应用。测试结果本身就是 Critic 的反馈信号。</span></p></blockquote>


<a id="section-0615"></a>
## 实例

<a id="t-EOn8oNz88hyQML4HXm9Xe4"></a>

<pre id="t-DGTuY6tiUhZmbZT6w3gM6p"><code># 反思架构的简化实现

class ReflectiveAgent:
 """带有自我反思能力的 Agent"""

 def __init__(self, model, tools, max_reflections=3):
        self.model = model
        self.tools = tools
        self.max_reflections = max_reflections  # 最多修正次数，防止死循环

 def run(self, task: str) -&gt; str:
 # 第一步：正常执行，产生初始输出
        output = self.model.generate(task)

 for i in range(self.max_reflections):
 # 第二步：反思 —— 评估输出质量
            critique = self.model.generate(f"""
            请严格评估以下输出：
            原始任务：{task}
            当前输出：{output}
            检查：事实错误？逻辑漏洞？遗漏信息？格式问题？
            如果输出完美无缺，请回复 "PASS"。
            """)

 if "PASS" in critique:
 break # 输出通过审查

 # 第三步：修正 —— 根据批评意见改进
            output = self.model.generate(f"""
            原始任务：{task}
            上次输出：{output}
            问题反馈：{critique}
            请根据反馈修正输出。
            """)

 return output

# 使用示例
agent = ReflectiveAgent(model=llm, tools={})
code = agent.run("编写一个 Python 函数，实现 RUNOOB 字符串的 AES 加密")
# Agent 生成代码后自我检查加密实现、密钥处理，
# 发现漏洞后自动修正，确保输出安全可靠</code></pre>

<a id="t-fpAdK55MTpaw3sMxSI4Al7"></a>

##### 优点

<ul><li id="t-FRCXcSvAZ0LATvK8uM3zxm"><span>显著提升输出质量</span></li></ul>

<ul><li id="t-GIC0JRvg5qFP4FpcXkj0tK"><span>可以设置明确的质量标准</span></li></ul>

<ul><li id="t-QmRuo9bJwnfH9QxOAFXgnp"><span>适合有客观评判标准的任务</span></li></ul>

<a id="t-178etS1AqVrzJjZwVsyM3d"></a>

##### 缺点

<ul><li id="t-WDAKBxYhRArclQ0QX8t5Bn"><span>多次迭代增加延迟和成本</span></li></ul>

<ul><li id="t-cUywGuWNBIb3dSVASyg2Hh"><span>需要设置最大迭代次数防止死循环</span></li></ul>

<ul><li id="t-ofYxIQLqFn06qyWVTFx9G8"><span>评判标准难以形式化时效果有限</span></li></ul>

<blockquote id="t-8Tct0koDlKhpoy51eAjCfO"><p id="t-PFPU2PhI0quct1U78fMjrp"><span style="font-style:italic">反思循环每次迭代都是一次额外的 LLM 调用，会明显增加延迟。此外需要设置反思次数上限，否则模型可能陷入"永远不满意"的死循环。</span></p></blockquote>


<a id="section-0616"></a>
## 架构五：RAG + Agent（检索增强型智能体）

<a id="t-HHblHcvdJ6we5TNtQgfNSE"></a>

<div id="t-7qHjd7t3nEy7IUIQf0Sp1w"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/5c2f2eb5105e43ac93023c3a.png"/></div>

<p id="t-Nh7geg5mRuTctVPzFuD4Zr"><span>在 Agent 的工具集里加入向量检索能力，让 Agent 在推理过程中动态查询外部知识库，克服上下文窗口的限制。</span></p>

<p id="t-qU0wviMnKlfw38syi4Snte"><span>RAG（Retrieval-Augmented Generation，检索增强生成）本是一种让 LLM 查询外部知识库的技术。当它与 Agent 结合时，变得更加强大：Agent 可以</span><span style="font-weight:bold">主动决定何时检索、检索什么</span><span>，而不是每次都被动地检索一次。</span></p>

<p id="t-f4p9CXThJbmRo6oJUaj7xC"><span>图 5 — RAG + Agent 检索增强架构</span></p>

<div id="t-5hAeqBkpObNMplb1CheUiL"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/6086ddc13e51e00d052b6a5c.png"/></div>


<a id="section-0617"></a>
## 与普通 RAG 的关键区别

<a id="t-0615buLI1ngE6gr9aGXOO4"></a>

<p id="t-X2lcxLzfnyw0fMWbL5rTi1"><span>普通 RAG 是"被动、一次性"的：用户提问时固定检索一次，将结果塞入 Prompt。</span></p>

<p id="t-Gj2FNCwqcWAvglh0dXIMEX"><span style="font-weight:bold">RAG + Agent 则不同</span><span>：Agent 自主判断在推理的哪个环节需要补充知识、需要检索什么，并可以多次查询知识库，直到获得足够的信息来完成任务。</span></p>

<blockquote id="t-lLn6vggBv9zliThN87GCFD"><p id="t-BSFqqGAwDiLzqVCbnKmqRO"><span style="font-style:italic">代码库问答 Agent 被问到"为什么这里用单例模式？"时，它会主动检索项目文档、设计决策记录、相关代码文件，而不是只凭 LLM 的训练记忆来猜测。</span></p></blockquote>


<a id="section-0618"></a>
## 实例

<a id="t-V1oQGi5bvHbDBk13EIVGaz"></a>

<pre id="t-3zsbKZxdVGSwg25t6yHPL0"><code># RAG + Agent 的简化实现

class RAGAgent:
 """带有动态检索能力的 Agent"""

 def __init__(self, model, vector_db, max_retrievals=5):
        self.model = model
        self.vector_db = vector_db  # 向量数据库
        self.max_retrievals = max_retrievals

 def should_retrieve(self, context: str, question: str) -&gt; bool:
 """Agent 自己判断是否需要检索更多信息"""
        decision = self.model.generate(f"""
        当前已知信息：{context}
        当前问题：{question}
        现有信息是否足以回答问题？回答 YES 或 NO。
        """)
 return "NO" in decision

 def run(self, task: str) -&gt; str:
        context = ""
        retrieval_count = 0

 while retrieval_count &lt; self.max_retrievals:
 # Agent 自主判断是否需要检索
 if not self.should_retrieve(context, task):
 break

 # Agent 自主决定检索什么
            search_query = self.model.generate(f"""
            任务：{task}
            已有信息：{context}
            为了完成任务，下一步应该检索什么信息？
            """)

 # 执行检索，结果追加到上下文
            docs = self.vector_db.search(search_query)
            context += "\n".join(docs)
            retrieval_count += 1

 # 综合所有信息生成最终答案
 return self.model.generate(f"任务：{task}\n参考资料：{context}")

# 使用示例
agent = RAGAgent(model=llm, vector_db=runoob_docs_db)
answer = agent.run("RUNOOB 框架中如何配置数据库连接池？")
# Agent 先检索"连接池配置"，发现提到"最大连接数"
# 如果不理解，会再次检索"最大连接数最佳实践"
# 最终综合多轮检索结果给出完整回答</code></pre>

<a id="t-jbimqQDBLvyo42mq4EYkD2"></a>

##### 优点

<ul><li id="t-PjQ9EvrdQGcuXwWM6RQlDB"><span>突破上下文窗口限制</span></li></ul>

<ul><li id="t-d77U35rKrgk8GlMfotI25w"><span>输出有据可查，减少幻觉</span></li></ul>

<ul><li id="t-QlSsjNS6W7KMvMbMvm7sZd"><span>知识库可独立更新</span></li></ul>

<a id="t-KjXOHEPE0AqIRlkUyL0eSG"></a>

##### 缺点

<ul><li id="t-BdX5NGcwjUNk7C1WQaUYWp"><span>检索质量影响整体效果</span></li></ul>

<ul><li id="t-XC9eF15K7awJ7pNPPhNftM"><span>向量数据库的维护成本</span></li></ul>

<ul><li id="t-Pionz613PUxgAyPfNxErtx"><span>检索延迟增加响应时间</span></li></ul>


<a id="section-0619"></a>
## 架构六：工作流编排（Workflow / DAG）

<a id="t-36J81IkRD6WaP69aSmr2Ms"></a>

<div id="t-i2gQR62Np877RV5Fm417qr"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/3b6fea1fa09663b2d94fb164.png"/></div>

<p id="t-eU1zQxPi3qKMnjOAJG1aCt"><span>把 Agent 行为固化为一张有向无环图（DAG），每个节点是一个 LLM 调用或工具调用，边表示数据依赖关系，由框架驱动执行。</span></p>

<p id="t-TBc5tRcGgsP2hO8lmebDJd"><span>这是最接近传统软件工程的一种 Agent 架构。与前面几种架构的最大区别在于：</span><span style="font-weight:bold">Agent 的自主决策空间被限制在单个节点内部</span><span>，节点之间的流转是预先定义好的，不可更改。</span></p>

<p id="t-Xd03C7FkQfEc7Tvu6s9hFK"><span>图 6 — 工作流 DAG 架构（有向无环图）</span></p>

<div id="t-vEOKHnyxdNOsUQYWOIKpcQ"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/93ef3eb81882ab23a69f7109.png"/></div>


<a id="section-0620"></a>
## 纯 Agent vs DAG 工作流

<a id="t-4qDglNazj08Re7CETadNVd"></a>

<div id="t-9hHq7jAtiSMcW2VoN8p39I"><table><colgroup><col width="120"/><col width="255.9044189453125"/><col width="218.00689697265625"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>特性</span></p></td><td style=" vertical-align: top"><p><span>纯 Agent</span></p></td><td style=" vertical-align: top"><p><span>DAG 工作流</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>流程控制</span></p></td><td style=" vertical-align: top"><p><span>模型自主决定下一步</span></p></td><td style=" vertical-align: top"><p><span>预定义的 DAG 图决定</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>可预测性</span></p></td><td style=" vertical-align: top"><p><span>低，每次运行路径可能不同</span></p></td><td style=" vertical-align: top"><p><span>高，运行路径确定</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>可调试性</span></p></td><td style=" vertical-align: top"><p><span>难，依赖日志追踪</span></p></td><td style=" vertical-align: top"><p><span>易，每个节点输入输出明确</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>容错性</span></p></td><td style=" vertical-align: top"><p><span>依赖模型自行恢复</span></p></td><td style=" vertical-align: top"><p><span>框架提供重试、断点续跑</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>灵活性</span></p></td><td style=" vertical-align: top"><p><span>高，可应对意外情况</span></p></td><td style=" vertical-align: top"><p><span>低，只能走预定义路径</span></p></td></tr></tbody></table></div>

<p id="t-y3Z2uanZWypWgQRi6ASqOQ"><span>DAG 的 "无环"（Acyclic）特性意味着工作流是</span><span style="font-weight:bold">确定性的</span><span>——没有无限循环，执行路径可以完全预测，失败的节点可以单独重试。</span></p>

<blockquote id="t-8jCOkbHG1ACAIHCCzaDGEm"><p id="t-EYdr5Vgjd4JPhU3QVD2DhK"><span style="font-style:italic">DAG 是"低自主性、高可预测性"的极端。你需要预先设计好整个流程。这不是缺点，而是刻意的设计取舍——生产环境中有时候确定性比灵活性更重要。</span></p></blockquote>


<a id="section-0621"></a>
## 实例

<a id="t-jQI60nhrX7zYyaOkIqtQ4u"></a>

<pre id="t-6SWAIZTD1VdidGUI0Kw2of"><code># DAG 工作流的简化定义（类似 LangGraph 风格）

from langgraph import StateGraph

# 定义工作流状态 —— 节点间传递的数据对象
class PipelineState:
    raw_data: str = "" # 原始输入数据
    cleaned_data: str = "" # 清洗后的数据
    analysis_result: dict = {} # 分析结果
    final_report: str = "" # 最终报告

# 定义 DAG 节点 —— 每个节点是独立的处理单元
def extract_data(state: PipelineState) -&gt; PipelineState:
 """节点1：从 runoob 数据库中提取原始数据"""
    state.raw_data = query_database("SELECT * FROM logs")
 return state

def clean_data(state: PipelineState) -&gt; PipelineState:
 """节点2：清洗数据（去重、标准化格式）"""
    state.cleaned_data = preprocess(state.raw_data)
 return state

def analyze_data(state: PipelineState) -&gt; PipelineState:
 """节点3：统计分析"""
    state.analysis_result = statistical_analysis(state.cleaned_data)
 return state

def generate_report(state: PipelineState) -&gt; PipelineState:
 """节点4：使用 LLM 生成报告"""
    state.final_report = llm.generate(
 f"基于以下分析结果生成报告：{state.analysis_result}"
 )
 return state

# 构建 DAG：定义节点和边（数据流向）
workflow = StateGraph(PipelineState)
workflow.add_node("extract", extract_data)
workflow.add_node("clean", clean_data)
workflow.add_node("analyze", analyze_data)
workflow.add_node("report", generate_report)

# 定义边：extract → clean → analyze → report
workflow.add_edge("extract", "clean")
workflow.add_edge("clean", "analyze")
workflow.add_edge("analyze", "report")
workflow.set_entry_point("extract")
workflow.set_finish_point("report")

# 编译并运行
app = workflow.compile()
result = app.invoke(PipelineState())
print(result.final_report)</code></pre>

<a id="t-uDG7bmESRg79v5FdH1xKju"></a>

##### 优点

<ul><li id="t-LAJf2nWLXfYoKUH81Sqw5O"><span>可预测、可审计、可重试</span></li></ul>

<ul><li id="t-LBqJaeI43gfJ9FNMlJftce"><span>支持并行加速</span></li></ul>

<ul><li id="t-Y1CHLBMzOrxsu9i5qh5Pcb"><span>工程化程度高，运维友好</span></li></ul>

<a id="t-BNx0luiqIna2tWPiXyDJL1"></a>

##### 缺点

<ul><li id="t-aqoM0Xx2NhR1si4e3AeUum"><span>流程需要预先设计，灵活性低</span></li></ul>

<ul><li id="t-Vs5aLPsl1trLZzW2yxEXbS"><span>难以应对未预期的情况</span></li></ul>

<ul><li id="t-ZQfAP0PrbPTH4S4F9SqjPk"><span>需要学习编排框架</span></li></ul>


<a id="section-0622"></a>
## 横向对比与如何选择

<a id="t-OjmH7opVYZtTUOpGTlAyE7"></a>

<p id="t-Y8MZ5ctNwsKu39Do282Koy"><span>从多个维度对比六种架构，帮助你快速定位适合的选项。</span></p>

<div id="t-vVGPrWEXJjDpsASKq10U7n"><table><colgroup><col width="147.5"/><col width="70.89752197265625"/><col width="93.11627197265624"/><col width="104.00689697265624"/><col width="135.0042724609375"/><col width="189.2152099609375"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>架构</span></p></td><td style=" vertical-align: top"><p><span>自主性</span></p></td><td style=" vertical-align: top"><p><span>可预测性</span></p></td><td style=" vertical-align: top"><p><span>并行能力</span></p></td><td style=" vertical-align: top"><p><span>适合任务复杂度</span></p></td><td style=" vertical-align: top"><p><span>典型实现</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">单 Agent 循环</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">高</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">低</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">无</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">中低</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Claude Code 默认模式</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">规划 + 执行</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">中</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">中</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">部分</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">中高</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Claude Code Plan Mode</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">多 Agent 协作</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">高</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">低</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">强</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">高</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">AutoGen, CrewAI</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">反思 / 自我修正</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">中</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">中</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">无</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">中</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Reflexion, Self-Refine</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">RAG + Agent</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">高</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">中</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">无</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">中高</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">LangChain RAG Agent</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">工作流编排</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">低</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">高</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">强</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">高（固定流程）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">LangGraph, Prefect</span></p></td></tr></tbody></table></div>


<a id="section-0623"></a>
## 常见组合模式

<a id="t-GecRvumQOaivn0rL0CVIG3"></a>

<p id="t-HT3hLRwTTlPv7Icq7UUxlW"><span>实际生产系统通常会组合使用多种架构，以下是几种成熟的组合模式：</span></p>

<p id="t-gL2Ula7Bc4Y4lTrm9eH7CQ"><span>工作流编排 + 多 Agent：用 DAG 定义主流程，每个节点内部是一个独立的 Agent。例如 CI/CD 流水线中，代码检查节点是 Code Review Agent，安全扫描节点是 Security Agent。</span></p>

<p id="t-TIuhsD1X218mHJ3ENVmUb8"><span>多 Agent + RAG：多个 Subagent 共享同一个向量知识库，各自根据子任务按需检索。例如客服系统中，订单查询 Agent 和退款处理 Agent 都查询同一个知识库但检索不同的内容。</span></p>

<p id="t-dQg7dqJbl1nBJ2SmwG9oQg"><span>规划执行 + 反思：先规划再执行，但每个步骤执行后加入反思环节确保质量。适合对质量要求极高的任务。</span></p>

<blockquote id="t-W83NdufkHZKIMhIFXRfdE7"><p id="t-skUWti2N2QdsblDJmAyw7r"><span style="font-style:italic">如果你不确定从哪里开始，从单 Agent 循环开始。它最容易实现和调试。当你发现上下文窗口不够用时，考虑多 Agent；当你需要质量保证时，加入反思层；当流程趋于稳定时，重构为 DAG 以提升可靠性。</span></p></blockquote>


<a id="section-0624"></a>
## 常见误区

<a id="t-J74KfAj9JhhWpNeUFTVV0u"></a>

<p id="t-NLeza3fY0pxOTL1K5pP3iM"><span style="font-weight:bold">误区一：架构越复杂越好</span></p>

<p id="t-W5pisgVOjiU5RmWogcwVkc"><span>多 Agent 协作看起来很强大，但如果你的任务用单 Agent 循环在 5 步内就能完成，引入编排开销反而降低效率。原则：用能满足需求的最简架构。</span></p>

<p id="t-oB1Zxcqldc1Ggpa79kiMr0"><span style="font-weight:bold">误区二：反思一定能提升质量</span></p>

<p id="t-H18tEqjwkSHPN0HB5Birpi"><span>自我反思的有效性取决于模型的自我评估能力。如果质量要求极其严格，考虑使用 Critic 模型或引入外部验证（如代码自动测试）。</span></p>

<p id="t-OqGFVJ7bc62RPOfM1AT53c"><span style="font-weight:bold">误区三：DAG 工作流不需要 Agent</span></p>

<p id="t-g0EN5oM12wOyifdLw3O1Nv"><span>DAG 定义了流程骨架，但每个节点内部仍然可以是 Agent 调用。工作流编排和 Agent 能力不是互斥的，而是互补的——DAG 提供可靠性，Agent 提供灵活性。</span></p>

<p id="t-Jux7PtyTxIbttoQhaqPdWW"><span style="font-weight:bold">误区四：上下文窗口大了就不需要 RAG</span></p>

<p id="t-jzwcDrPBpUwpzRle5bguTA"><span>即使模型支持 1M token 的上下文窗口，把所有文档塞进去仍然不是最优方案。RAG 的价值不仅在于"装得下"，更在于</span><span style="font-weight:bold">精准检索</span><span>——减少噪音、降低推理成本、提高答案准确性。</span></p>


<a id="section-0625"></a>
## 总结

<a id="t-pBXFF5a0QYTShbAyEr0Jx6"></a>

<p id="t-IhWrXa8cOQMeyjy1J4blMI"><span>六种 Agent 架构覆盖了从高度自主到高度可控的完整光谱。</span></p>

<p id="t-PZpEygw4EyjadbFhJZ5hiz"><span>选择架构时，核心考量只有两个：</span><span style="font-weight:bold">你需要多大的灵活性来应对意外情况</span><span>，以及</span><span style="font-weight:bold">你需要多大的确定性来保证结果可靠</span><span>。</span></p>

<p id="t-7FPmguH4qq6FWlLPhYOKPR"><span>从简单开始，在确实需要时才增加复杂度，这是 Agent 架构选型的第一原则。</span></p>

