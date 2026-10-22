---
title: "第 17 章 · 工程化与生产部署"
date: "2026-10-22"
draft: false
author: "学习资料整理"
description: "服务化、流式、并发、性能、成本、部署与监控"
tags: ["Agent", "学习路线"]
categories: ["AI 工程"]
prerequisites: ["agent-learning-16-safety-reliability"]
verification: {"status": "not-run", "scope": "本次仅整理资料；示例代码与原文技术结论未复跑。"}
---

服务化、流式、并发、性能、成本、部署与监控

[学习路线](/posts/agent-learning-route/) · [上一章](/posts/agent-learning-16-safety-reliability/) · [下一章](/posts/agent-learning-18-training-inference/)

本章按知识小节编排。项目内容作为学习案例阅读，示例代码与原文技术结论未在本次整理中执行验证。

## 本章目录

- [Agent项目上线问题](#section-0083)
- [按需深入：后端与服务化](#section-0132)
- [大模型前后端生命周期](#section-0133)
- [面试真题](#section-0134)
- [Python 的异步方法是如何实现的？](#section-0135)
- [AI Agent 生产部署与工程化](#section-1547)
- [生产部署架构](#section-1548)
- [部署模式](#section-1549)
- [Dockerfile 示例](#section-1551)
- [Kubernetes Deployment 配置](#section-1553)
- [成本控制](#section-1554)
- [Token 优化策略](#section-1555)
- [成本优化 Agent 实现](#section-1557)
- [流式响应](#section-1559)
- [流式响应 Agent](#section-1561)
- [异步任务队列](#section-1562)
- [异步任务队列实现](#section-1563)
- [微服务化设计](#section-1564)
- [服务划分](#section-1565)
- [服务间通信](#section-1566)
- [章节小结](#section-1567)

<a id="section-0083"></a>
## Agent项目上线问题

<a id="f-doxcnpxZpyskc95HNytUKb3dXTX"></a>

<p id="f-doxcnuWZ1DRO033qKdv4df7w47c"><span>以下三个问题几乎必问，上线T0问题，前两个问题我在英伟达面经中解析了，大家可以直接跳转观看问题答案。</span></p>

<p id="f-doxcnaUrJU0bXCDFfB7yjfheT4c"><span><span><a href="/posts/agent-learning-24-interview-review/#f-doxcnD2WqzaQMKEHuOPvSBw5TEg"><span>1.你的项目Agent上线了以后，你是如何监控的？</span></a></span></span></p>

<p id="f-doxcndYZ88xWvKrjG0mI6ECyDqd"><span><span><a href="/posts/agent-learning-24-interview-review/#f-doxcnmzwJElKT5CysoVjUCiw4Pd"><span>2. 你的Agent项目上线后通过哪些业务指标来衡量？</span></a></span></span></p>

<p id="f-doxcnbGoL3p85saiTQW69wgUsXf"><span>3. 线上遇到问题时，如何收集反馈，归因，修复的？</span></p>


<a id="section-0132"></a>
## 按需深入：后端与服务化

<a id="f-doxcnA51rqKpLAzPBYWynzjgtCf"></a>

<p id="f-doxcnCgzNAydzqO6be8Vh7Iloag"><span>哈喽呀，朋友们，这一部分内容写于2026年9月份。而且大模型应用开发的面试，偶尔也确实会考察一些后端的内容。</span></p>

<p id="f-doxcnZi5WXuPhm53RgMalSXnI0d"><span>之前一直没写后端的笔记，首要原因是：</span><span style="font-weight:bold">真的学不过来呀！</span><span>给大家算一笔账吧：</span></p>

<ol start="1"><li id="f-doxcn9EWrtzCXc3YaiycUOofb8b"><span>先学Agent, RAG 然后各做一个项目。</span></li></ol>

<ol start="2"><li id="f-doxcnCryl2GmAyfTNjCBiGBd8bb"><span>通用技巧那些也得学一学吧，什么vibecoding的技巧，SKILL之类的。</span></li></ol>

<ol start="3"><li id="f-doxcnsNGSPax6ruDGP66G9DjK3f"><span>再学一些算法的东西，模型结构，后训练，推理之类的，因为现实是很多应用岗，有时也会考一下你：会不会微调？transformer的结构之类的。如果你想稍微学深一点，可能还做一个小的后训练项目。</span></li></ol>

<p id="f-doxcnZA1c8HAayO1i3QJknmKS5e"><span>大家看看学完这些，要多久。</span></p>

<p id="f-doxcnC121cp29e5DVqvI3yatSXe"><span>要命的是，面试有时还问后端。</span></p>

<p id="f-doxcn06CG90uUyGrmkUiGMSreAc"><span>这里涉及一个学习路线的问题，对于我个人，我是</span><span style="font-weight:bold">学完了大模型应用，就去学算法，没学后端。</span><span>因为我想慢慢往一些底层的岗位：推理，训练岗靠。</span></p>

<p id="f-doxcnk8eHyrhS02aBSD3LvoO6yd"><span>当然</span><span style="font-weight:bold">你也可以学完应用，再补一下后端，算法内容稍微放一放，这样对于你找LLM应用开发岗帮助可能会更大</span><span>。</span></p>

<p id="f-doxcnwsPNzk6GHeU6CBDlA4MOxb"><span>所以这一大块的内容，我的建议是，你根据本章节汇总的面试真题出发，</span><span style="font-weight:bold">从题目出发，我讲解题目的时候会讲这个题对应的背后的知识点，把真题刷完，这一小节就学完了。</span><span>（之前的小节，学习顺序都是先学知识，然后每小节后面的真题是作为检验的，但这一小节比较特殊哈，</span><span style="font-weight:bold">推荐学习顺序反过来了，请大家注意！</span><span>）</span></p>


<a id="section-0133"></a>
## 大模型前后端生命周期

<a id="f-doxcn6QMnZNyH53yqovElIJziyg"></a>

<p id="f-doxcnftqoOl5stA7rNXrzkHWBac"><span>对于</span><span style="font-weight:bold">没有后端基础的同学</span><span>来说，面试要求或技术栈中经常会出现 </span><span style="font-weight:bold">Redis、Docker、Kubernetes、分布式系统、API 网关、负载均衡</span><span> 等词。你可能见过这些名称，却还不清楚：</span><span style="font-weight:bold">它们分别解决什么问题？位于系统的哪个位置？彼此之间怎样配合？</span></p>

<p id="f-doxcnEOTNN9b76PPEZkUSsSpWUh"><span>这一节的目标不是让你立刻掌握每项后端技术的所有细节，而是先建立一张完整的</span><span style="font-weight:bold">后端地图：知道这些技术</span><span>是什么、为什么需要它们、如何在大模型系统中协作。 如果你没有后端基础，花2个小时学习本章节：</span><span style="font-weight:bold">能够理解这些技术是什么，它们是如何作用在系统中的，就已经很棒了</span><span>！这是我们后续分析面试真题的基础。 如果你连这个技术是干什么的都不知道，你怎么回答相关面试真题？</span></p>

<p id="f-doxcnsD3ZtfrcJ8DSOS79ZuuWZb"><span>更新本小节的原因，来自于宇树科技二面：</span><span><span><a href="#f-doxcnJ9KHwhv3iHfSCmgfjDiQDd"><span>对 Agent 系统进行压力测试，关注哪些性能指标</span></a></span></span><span>？所以建议观看该面试真题的讲解视频，视频会先讲解本小节知识，然后讲解面试真题。</span></p>

<div id="f-doxcnDs7nKFhW9aODXqR7xvUiJh"><img alt="" decoding="async" height="720" loading="lazy" src="/images/agent-learning/ebce3482ca45e641595c7a68.png" width="1280"/></div>

<p id="f-doxcnbBUwbMRGufUVQ6Itsq0YPg"><span>上面是本小节的核心生命周期图，理解上图，可以说你就理解了这一小节内容。</span></p>

<p id="f-doxcnLpiqhc9B8JdoVwz5YQgt6d"><span>这张图需要从两条</span><span style="font-weight:bold">主线</span><span>理解：</span></p>

<div style="margin-left:25px"><div id="f-doxcnZfJXAj6x2lylX70AuD7bgh" style="display:flex;gap:0.5em"><span style="min-width:1.5em">a.</span><div><span style="font-weight:bold">部署线</span><span>：程序怎样被打包、运行，并在服务器上形成对外服务。</span></div></div><div id="f-doxcnjnvOMiZjmbDYyCt8rtJmNg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">b.</span><div><span style="font-weight:bold">请求线</span><span>：用户请求怎样经过后端、完成模型推理并返回结果。</span></div></div></div>

<a id="f-doxcnay71u3Xu96gK1e9qcuLIsc"></a>

##### 部署生命周期：程序如何变成服务

<p id="f-doxcnaI5dvYPXXIkonM4XeNi2oh"><span style="font-weight:bold">程序代码</span></p>

<p id="f-doxcnA2EX7INlAzaCRc3dSWHyob"><span>系统通常至少包含两类</span><span style="font-weight:bold">程序</span><span>：</span></p>

<div style="margin-left:25px"><div id="f-doxcn1ostGXGJu0cAQmOCYgsfye" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">Agent 程序</span><span>：负责</span><span style="font-weight:bold">会话、Prompt 组装、任务规划、工具编排以及调用模型</span><span>。</span></div></div><div id="f-doxcncnBsmSRwTcyq0suG0Nii3b" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">推理程序</span><span>：负责加载</span><span style="font-weight:bold">大模型</span><span>，利用 GPU </span><span style="font-weight:bold">执行推理并生成 Token</span><span>，例如 vLLM。</span></div></div></div>

<p id="f-doxcnFWMO5exLV04Xkb9kQYHLWb"><span>它们可以部署在一起，但生产环境通常会分开，以便</span><span style="font-weight:bold">独立扩容和更新</span><span>。</span></p>

<p id="f-doxcn3oGdWqoMcF2b6Zt3kyDSJq"><span style="font-weight:bold">Docker 打包与镜像</span></p>

<p id="f-doxcnxALqBElN0UEnIOfYXbMIPc"><span>Docker 将以下内容打包成标准</span><span style="font-weight:bold">镜像</span><span>：</span></p>

<pre id="f-doxcnDI6nkhAAuwUNMVYjZY3yYc"><code>程序代码 + 依赖库 + 软件运行环境 + 启动命令 = 容器镜像</code></pre>

<p id="f-doxcnMm5nyj9ba4Ua3S4iVlJJ58"><span>镜像是尚未运行的</span><span style="font-weight:bold">程序模板</span><span>。同一个镜像可以在不同服务器上重复使用，从而避免每台服务器都</span><span style="font-weight:bold">手动安装环境</span><span>。</span></p>

<p id="f-doxcnByw67K758fNoEvEKF6fy2f"><span>注意：一般</span><span style="font-weight:bold">大型模型权重不放进镜像</span><span>，是容器启动后从模型仓库或共享存储加载。因为大模型权重一般比较大，可能几十GB甚至上百GB。</span><span style="font-weight:bold">GPU 等硬件以及宿主机驱动</span><span>也不属于镜像。</span></p>

<p id="f-doxcnxsaJzKfQp9MbGWiEk6ODWd"><span style="font-weight:bold">镜像、实例与 Service</span></p>

<pre id="f-doxcn2TkbbGhWfptuLIzY2laJSh"><code>同一个 Agent 镜像
├── 启动一次 → Agent 实例 A
├── 启动一次 → Agent 实例 B
└── 启动一次 → Agent 实例 C</code></pre>

<ul><li id="f-doxcnx69BlQX6GdAxWoRegPVoag"><span style="font-weight:bold">实例</span><span>：程序实际运行起来的一份。同一个镜像启动多次，就产生多个</span><span style="font-weight:bold">代码相同但运行状态独立的实例</span><span>。</span></li></ul>

<ul><li id="f-doxcnQWhu3t7GhQtFROb6P78YVg"><span style="font-weight:bold">Service</span><span>：为多个实例提供</span><span style="font-weight:bold">统一、稳定的访问入口</span><span>，并将请求转发给健康实例。</span></li></ul>

<p id="f-doxcnwDEko2pynstVAUEDa9vR5N"><span>实例同时存在两种</span><span style="font-weight:bold">关键关系</span><span>：</span></p>

<pre id="f-doxcnz9GtFhATrITps3a1TaQuub"><code>实例 ──由 Service 提供统一访问入口
实例 ──由 Kubernetes 调度到服务器运行</code></pre>

<p id="f-doxcnEsYjVlJmUpotuCwanYsOUd"><span>因此，不是实例与硬件结合后才变成 Service，也不是 Service 被调度到服务器。真正被调度的是</span><span style="font-weight:bold">实例</span><span>。</span></p>

<p id="f-doxcnVwbTxjnyHvBiHFXzIzLXsj"><span style="font-weight:bold">Kubernetes 与硬件服务器</span></p>

<p id="f-doxcnHBIRmKot5ZLvZ8rlaiGmbd"><span>服务器是提供 CPU、内存、GPU、显存等</span><span style="font-weight:bold">资源</span><span>的机器。Kubernetes 根据实例声明的</span><span style="font-weight:bold">资源要求</span><span>，将实例安排到合适的</span><span style="font-weight:bold">服务器</span><span>：</span></p>

<pre id="f-doxcnIYyANs8dW2aQGcFc8ylTgh"><code>Agent 实例 → CPU 服务器
推理实例   → GPU 服务器</code></pre>

<p id="f-doxcnNyEVJi4gvmnWH9fus2FCSf"><span>Kubernetes 还</span><span style="font-weight:bold">负责</span><span>：</span></p>

<div style="margin-left:25px"><div id="f-doxcn9QDUmbMq13ObJdXjmo9qdb" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">保持所需实例数量</span><span>；</span></div></div><div id="f-doxcnV38KK4uABklBaSwEEXJeRb" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">流量增加时扩容，流量下降时缩容</span><span>；</span></div></div><div id="f-doxcnINgSMXq6s0OribV2NjuWM3" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">实例或服务器故障后重新创建实例</span><span>；</span></div></div><div id="f-doxcn9ut7RcZZ43Ixa92Gdki8Id" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">发布新版本时滚动替换实例</span><span>。</span></div></div></div>

<p id="f-doxcnyP9mfYRunZ1lSMsBBSYCac"><span>程序因此不固定绑定某台具体服务器，但仍然依赖某类硬件。例如推理实例可能要求</span><span style="font-weight:bold">特定 GPU 和足够显存</span><span>。</span></p>

<p id="f-doxcnuNH7yMl9WmGD4akWg5sVOc"><span style="font-weight:bold">集群与分布式系统</span></p>

<div style="margin-left:25px"><div id="f-doxcnI3zTpa9eLq1RmJqlfPXuOf" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">服务集群</span><span>：同一个程序运行出多个实例，共同提供一种</span><span style="font-weight:bold">服务能力</span><span>。</span></div></div><div id="f-doxcnQh8B0HIgmYSDwKbp1flITe" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">服务器集群</span><span>：多台服务器组成的</span><span style="font-weight:bold">硬件资源池</span><span>。</span></div></div><div id="f-doxcnO1bIg77btfMLikI7lR7pZc" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">分布式系统</span><span>：不同服务和实例运行在多台服务器上，通过网络分工协作，共同完成</span><span style="font-weight:bold">用户请求</span><span>。</span></div></div></div>

<p id="f-doxcnaLU6uiVY5GziqjLS5NmOGc"><span>例如，Agent 实例运行在 CPU 服务器，推理实例运行在 GPU 服务器，状态存放在 Redis 或数据库中；它们通过网络通信，整体构成</span><span style="font-weight:bold">分布式大模型后端</span><span>。</span></p>

<a id="f-doxcnCIbaxbykfQ3rySAcDFKPEf"></a>

##### 请求生命周期：用户请求经历什么

<p id="f-doxcnhZYjLrLFUcZ32Tf2WEIDSd"><span>主链路可以概括为：</span></p>

<pre id="f-doxcnJkmg2VqlBsxl3nBr6IP3Tf"><code>客户端
→ API 网关
→ 负载均衡
→ Agent Service / Agent 实例
→ 模型推理 Service / 推理实例
→ GPU 计算
→ 结果返回客户端</code></pre>

<p id="f-doxcncBheUdh8ASbRMtUIslBQtd"><span style="font-weight:bold">客户端</span></p>

<p id="f-doxcniVZc7gqenGllDOpkTFF1p2"><span>客户端通常是网页或 App，负责</span><span style="font-weight:bold">接收用户输入、向后端发送请求</span><span>，并展示</span><span style="font-weight:bold">普通或流式结果</span><span>。</span></p>

<p id="f-doxcnPCdUMinOgjAM3xFp3UPY0d"><span style="font-weight:bold">API 网关</span></p>

<p id="f-doxcn6w2pqMu7Eq5oeraoWm7yOh"><span>API 网关是服务端</span><span style="font-weight:bold">统一入口</span><span>，通常负责：</span></p>

<div style="margin-left:25px"><div id="f-doxcnbb1FY1w6bK9pGF7LUyWzPf" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">认证与权限校验</span><span>；</span></div></div><div id="f-doxcnyM6b2DfedcpSVJjRpqk5eg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">限流和安全检查</span><span>；</span></div></div><div id="f-doxcni1EBBLLdSZrq5dGwTXjCZg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>根据</span><span style="font-weight:bold">请求路径选择目标服务</span><span>；</span></div></div><div id="f-doxcnDhKiqcdJdIiEvJ6GNDk5Ef" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>记录</span><span style="font-weight:bold">入口日志和请求标识</span><span>。</span></div></div></div>

<p id="f-doxcnFH5HI3wN6aLrHNLtThZnOg"><span>网关回答的是：</span><span style="font-weight:bold">请求能不能进入，应该进入哪个服务？</span></p>

<p id="f-doxcnfe56Sz0Cdusi232khtthEb"><span style="font-weight:bold">负载均衡</span></p>

<p id="f-doxcnJzY3nL1LYnZfSUdrOXJqpd"><span>一个 Service 后面可能有多个相同实例。负载均衡负责选择一个</span><span style="font-weight:bold">健康且适合接收请求的实例</span><span>：</span></p>

<pre id="f-doxcnsAvv6N4rUVYeHgYOCC8DIh"><code>请求 1 → Agent 实例 A
请求 2 → Agent 实例 B
请求 3 → Agent 实例 C</code></pre>

<p id="f-doxcnjGKY0uveQYWiPstODH6UEg"><span>Nginx、云负载均衡、Kubernetes Service 等都可以实现</span><span style="font-weight:bold">负载均衡能力</span><span>。</span></p>

<blockquote id="f-doxcnNJy67zlLxR6SUZciQBZvNg"><p id="f-doxcnZMtj4Me2YipdD8sVSAlV7b"><span style="font-weight:bold">负载均衡决定请求交给哪个实例；Kubernetes 调度决定实例运行在哪台服务器。</span></p></blockquote>

<p id="f-doxcnvg86gHB5JFo8Yio2eF6kxg"><span style="font-weight:bold">Agent Service 与 Agent 实例</span></p>

<p id="f-doxcnwDk4ungYQ92hxOZZpg85sf"><span>Agent 实例主要</span><span style="font-weight:bold">负责</span><span>：</span></p>

<div style="margin-left:25px"><div id="f-doxcnJAxwwL2mKveXDKBws3DG5e" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">保存或读取会话</span><span>；</span></div></div><div id="f-doxcnW4bg0CvOazFBiO6HQ42LCg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">组装 Prompt</span><span>；</span></div></div><div id="f-doxcnpD3P3wBtjv98JqefOY0mcg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">决定任务执行流程</span><span>；</span></div></div><div id="f-doxcnbRYR6NlFhyJy98STg9MHgW" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">调用模型、工具、Redis 和数据库</span><span>；</span></div></div><div id="f-doxcnKSGgBZCpyPcuGt37SMCZfc" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">整理最终结果</span><span>。</span></div></div></div>

<p id="f-doxcnROrBRLzqwq6QJE54bjB5Bh"><span>它主要运行</span><span style="font-weight:bold">编排和业务逻辑</span><span>，通常以 CPU、内存为主要资源。</span></p>

<p id="f-doxcnenskQLb55H6q9ZelbBdc9d"><span style="font-weight:bold">模型推理 Service 与推理实例</span></p>

<p id="f-doxcnUzop4DZPuRiG4ASiWrRiQh"><span>推理实例接收 Agent 发来的 Prompt，加载模型并利用 GPU 执行计算，再逐 Token </span><span style="font-weight:bold">生成结果</span><span>。</span></p>

<pre id="f-doxcnDsy5JfYj9KVpa0Uk5upXtg"><code>Agent 实例：决定任务怎样完成
推理实例：负责运行模型并生成 Token
GPU 服务器：提供实际计算资源</code></pre>

<p id="f-doxcnISDPa474aQf97U5QiAvXne"><span>一个 Agent 任务可能</span><span style="font-weight:bold">多次调用推理服务</span><span>，也可能在模型判断需要工具后</span><span style="font-weight:bold">调用外部工具</span><span>，再把工具结果交给模型继续推理。</span></p>

<p id="f-doxcn0N9LMXsJWhbHRiVAXJASPc"><span style="font-weight:bold">Redis 与持久化数据库</span></p>

<p id="f-doxcnp8pN6QOC2t4kJi6HPCxtSd"><span>多个 Agent 实例不应把重要</span><span style="font-weight:bold">共享状态</span><span>只放在某个实例内存中，否则请求切换实例或实例故障后，状态可能丢失。</span></p>

<ul><li id="f-doxcnfJBXk8j7jVKvDSsZ6CYVVD"><span style="font-weight:bold">Redis</span><span>：常用于</span><span style="font-weight:bold">缓存、Session、共享会话状态、临时任务进度、限流计数和分布式锁</span><span>。</span></li></ul>

<ul><li id="f-doxcnzAP44PqikNkvOkGIIGGmFd"><span style="font-weight:bold">MySQL/PostgreSQL</span><span>：通常用于</span><span style="font-weight:bold">长期保存用户、聊天记录、任务和核心业务数据</span><span>。</span></li></ul>

<p id="f-doxcnB1brbJr2Re5AP36pv3UX4b"><span>Redis 也支持持久化，但在这张图里主要表示</span><span style="font-weight:bold">高速缓存和共享临时状态</span><span>；关系型数据库主要表示</span><span style="font-weight:bold">长期持久化存储</span><span>。</span></p>

<p id="f-doxcnHW5KRtTSum8nNEJs0rzxCh"><span style="font-weight:bold">单台服务器故障时会发生什么</span></p>

<pre id="f-doxcneW2jVOxQK1JWMSQ35PO6Ag"><code>健康检查发现异常
→ 负载均衡停止向故障实例发送新请求
→ 其他健康实例继续处理请求
→ Kubernetes 在其他合适服务器上重新创建实例
→ 新实例通过健康检查后重新加入 Service</code></pre>

<p id="f-doxcnzubeNgKkEEZSadB9kopCMZ"><span>真正实现</span><span style="font-weight:bold">高可用</span><span>还要求：</span></p>

<div style="margin-left:25px"><div id="f-doxcnuGSRUte5akzZy6UKL8EuRb" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">提前部署多个实例，消除单点</span><span>；</span></div></div><div id="f-doxcnPoIUAWQS1zjgjzZDSHrfSf" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>将重要状态放到</span><span style="font-weight:bold">外部共享存储</span><span>；</span></div></div><div id="f-doxcn6SrLi23hNuMtiKtApq95Ms" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>为剩余实例预留</span><span style="font-weight:bold">故障转移容量</span><span>；</span></div></div><div id="f-doxcn49cMeRMK3AB5yvNApZjg4c" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>对执行中的请求设置</span><span style="font-weight:bold">超时、有限重试和幂等保护</span><span>。</span></div></div></div>

<a id="f-doxcnK0IUO7kDGIVlINpSI9FBLg"></a>

##### 系统关键指标

<p id="f-doxcnBTDTCfEy2fWGTuMPqE1fjV"><span>这一小节，就是直接讲解面试真题 </span><span><span><a href="#f-doxcnJ9KHwhv3iHfSCmgfjDiQDd"><span>对 Agent 系统进行压力测试，关注哪些性能指标</span></a></span></span><span>？ 为了讲这个真题，我先讲解了整个大模型的生命周期，这样你更好理解每一个指标，在整个系统中处于什么位置。</span></p>

<p id="f-doxcndXJuGrnUThEvEMurQRAL8b"><span>这里采用：</span></p>

<blockquote id="f-doxcntX79qdLtExj5Sb5PnQyg6c"><p id="f-doxcnhKnf1yTAqaZArxwESGY8ef"><span style="font-weight:bold">Google SRE 四个黄金信号 + LLM/Agent 特有指标。</span></p></blockquote>

<p id="f-doxcn5BIxIaV8hvYPgG5VYAXUmH"><span style="font-weight:bold">Google SRE 的四个黄金信号</span><span>原本用于监控生产环境中的</span><span style="font-weight:bold">在线服务</span><span>：</span></p>

<div style="margin-left:25px"><div id="f-doxcn6hOHv9EkBePSALGN1qq3pd" style="display:flex;gap:0.5em"><span style="min-width:1.5em">a.</span><div><span style="font-weight:bold">延迟（Latency）</span><span>：用户需要</span><span style="font-weight:bold">等待多久</span><span>？</span></div></div><div id="f-doxcn1S4HqB742JIsrgIGthjZSh" style="display:flex;gap:0.5em"><span style="min-width:1.5em">b.</span><div><span style="font-weight:bold">流量（Traffic）</span><span>：系统当前有多少</span><span style="font-weight:bold">工作要处理</span><span>？</span></div></div><div id="f-doxcnG5FI2rFQgi8QHAzG3bQl6e" style="display:flex;gap:0.5em"><span style="min-width:1.5em">c.</span><div><span style="font-weight:bold">错误（Errors）</span><span>：有多少工作</span><span style="font-weight:bold">没有正常完成</span><span>？</span></div></div><div id="f-doxcnc4uFhVj8WAnLCgGzhrBj0d" style="display:flex;gap:0.5em"><span style="min-width:1.5em">d.</span><div><span style="font-weight:bold">饱和度（Saturation）</span><span>：系统距离</span><span style="font-weight:bold">资源上限</span><span>还有多远？</span></div></div></div>

<p id="f-doxcnv2MmLjCGbx31Fhrvw8A5zf"><span>Agent 系统上线后同样是</span><span style="font-weight:bold">在线服务</span><span>，因此可以使用这个框架；但还要加入 </span><span style="font-weight:bold">Token 生成、GPU 资源、多步执行、工具调用、任务质量和成本</span><span>等</span><span style="font-weight:bold">特点</span><span>。</span></p>

<p id="f-doxcnoOZQ8xxILdWJsHuthNbLpR"><span>四者通常存在如下</span><span style="font-weight:bold">关系</span><span>。下面每一步都对应一个黄金信号：</span></p>

<pre id="f-doxcnrH9u4eVJUYPHdz6pfTrE0b"><code>流量（Traffic）增加
→ CPU/GPU、连接池和队列逐渐饱和【饱和度 Saturation】
→ 排队时间变长，响应延迟上升【延迟 Latency】
→ 最终出现超时和请求失败【错误 Errors】</code></pre>

<p id="f-doxcn30QRxtlKyKdTvzUovgk7Ob"><span>也就是说：系统先承受更多</span><span style="font-weight:bold">流量</span><span>，资源随后接近</span><span style="font-weight:bold">饱和</span><span>；饱和会造成排队，使</span><span style="font-weight:bold">延迟</span><span>升高；延迟继续恶化，最终产生超时和</span><span style="font-weight:bold">错误</span><span>。</span></p>

<p id="f-doxcncaHwQ1ZQeiySZ9Q3j8iHUc"><span>压测时应先观察这四类</span><span style="font-weight:bold">高层信号</span><span>；发现异常后，再结合生命周期图、日志和 Trace 定位具体发生在哪一层。生命周期图是</span><span style="font-weight:bold">定位地图</span><span>，四个黄金信号是</span><span style="font-weight:bold">组织指标的框架</span><span>。</span></p>

<a id="f-doxcncVUhvPjfSwQV8q0juuM1jc"></a>

###### 延迟

<p id="f-doxcnVXDfwEuzlDmM2cC6UlxF4g"><span>延迟表示请求或任务需要</span><span style="font-weight:bold">等待多久</span><span>。</span></p>

<p id="f-doxcng9X0RdeiMiw8BOn7ICWg2e"><span style="font-weight:bold">主要指标</span></p>

<div style="margin-left:25px"><p id="f-doxcnIQTaf9JbrBUWFMzbDqQ1LB"><span style="font-weight:bold">端到端任务耗时</span><span>：从客户端发出请求到收到最终结果，覆盖</span><span style="font-weight:bold">整条请求链路</span><span>。</span></p><p id="f-doxcnFyKRR7xN61lRYzh5xOFjCM"><span style="font-weight:bold">P50/P95/P99</span><span>：分别观察</span><span style="font-weight:bold">典型请求和尾部慢请求</span><span>，不能只看平均值。</span></p><p id="f-doxcndIPDVA85CZRp4Q7CouiAYd"><span style="font-weight:bold">TTFT（Time to First Token）</span><span>：从发出请求到收到第一个 Token 的时间，即</span><span style="font-weight:bold">模型多久开始输出</span><span>。</span></p><p id="f-doxcnE3VorCXbnSSSBOkVUnmsrh"><span style="font-weight:bold">TPS（Tokens Per Second）</span><span>：模型</span><span style="font-weight:bold">每秒生成多少 Token</span><span>。</span></p><p id="f-doxcn43WrkPjV1h5qqRTb5ChLdf"><span style="font-weight:bold">TPOT（Time Per Output Token）</span><span>：模型平均</span><span style="font-weight:bold">生成一个输出 Token 需要多久</span><span>。</span></p></div>

<blockquote id="f-doxcnaQlhbuiykmNqyFJMExWgbZ"><p id="f-doxcnbBy6TLeW5AGx1cC3VCvMnc"><span>关于这个</span><span style="font-weight:bold">TTFT 和 TPS, TPOT</span><span>。 是大模型推理方向的一些技术，涉及一些推理的知识。如果你去学我们算法项目，推理那一块，会讲</span><span style="font-weight:bold">prefill, decode</span><span>。包括我想到一个面试真题（好像是滴滴一面），面试官问，你说transformer相比于传统的网络，可以并行计算，速度快。但是decode阶段无法并行啊，你如何看到他prefill阶段可以并行，decode阶段不能并行的问题。这些是推理这一块的知识，感兴趣可以自己琢磨一下。</span></p>
</blockquote>

<p id="f-doxcnRVAE5m1GWpisASNxckvlYe"><span>TTFT、TPS 和 TPOT 主要对应图中的</span><span style="font-weight:bold">模型推理链路</span><span>：</span></p>

<pre id="f-doxcnQs41laXacnRh98nIQkmdrf"><code>模型推理 Service → 推理实例 → GPU 服务器</code></pre>

<p id="f-doxcn6GzG4GdBXegBWfVy8uBhye"><span>原因是大模型先处理输入，再</span><span style="font-weight:bold">自回归地逐 Token 生成输出</span><span>：</span></p>

<pre id="f-doxcnAPZ40nljtZTn02Zy16aGce"><code>TTFT：模型多久开始说话
TPS/TPOT：开始说话后说得多快
端到端延迟：整个 Agent 任务多久完成</code></pre>

<p id="f-doxcnvQGNJkUOrqfT71FCF3oNkc"><span>若端到端 P99 很高，但 TTFT、TPOT 正常，则</span><span style="font-weight:bold">瓶颈</span><span>可能位于 Agent 排队、数据库或其他依赖中，需要沿图继续定位。</span></p>

<a id="f-doxcn2rAnyxVwJiAmf9mc6R2cEj"></a>

###### 流量

<p id="f-doxcn4ed2xoiONTIvR8dafUwbkq"><span>流量表示系统正在承受多少</span><span style="font-weight:bold">请求或工作量</span><span>。它不是某一台服务器独有的指标，而是沿</span><span style="font-weight:bold">整条链路</span><span>传递：</span></p>

<pre id="f-doxcnmz2gUIW3U49Ph36Pu3xJ9g"><code>客户端 → 网关 → Agent Service → 推理 Service → Redis/数据库</code></pre>

<p id="f-doxcnaiMTPoYUX4IoYOUWplDage"><span>不同位置可使用不同</span><span style="font-weight:bold">单位</span><span>：</span></p>

<div style="margin-left:25px"><div id="f-doxcnivm8o0PZr5zoJpUwxWEvHe" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">网关</span><span>：用户请求数、RPS、并发连接数；</span></div></div><div id="f-doxcndkqnvnouDuMUb3TPKmWD7d" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">负载均衡</span><span>：接收和转发的 RPS、活跃连接数，以及流量在各实例间的分布是否均衡；</span></div></div><div id="f-doxcngs1A1CSbDwouVKX5UWMoWe" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">Agent 服务</span><span>：并发任务数、每秒成功完成任务数；</span></div></div><div id="f-doxcntgYzAXh6xmOanNsUkevJKc" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">推理服务</span><span>：模型请求数、输入/输出 Token 吞吐量；</span></div></div><div id="f-doxcnuoNWG2rNEsYJbPYzZP3Tnd" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">Redis/数据库</span><span>：每秒读写或查询次数。</span></div></div></div>

<p id="f-doxcnAvcKK2vQfOgOxVOA9NB0Ih"><span>Agent 还会造成</span><span style="font-weight:bold">内部调用放大</span><span>：</span></p>

<pre id="f-doxcnG2lwSAjbvCeUR8sqLiJbje"><code>100 个用户任务 × 每任务 3 次模型调用
= 推理服务约 300 次模型调用</code></pre>

<p id="f-doxcnEMyuux5FI6Pz8d6ZgM02rg"><span>因此不能只看入口 QPS，还应考虑每任务的</span><span style="font-weight:bold">模型调用数、工具调用数和执行步数</span><span>。</span></p>

<a id="f-doxcn3mMJcfCFfZDvJDNcI0SF6f"></a>

###### 错误

<p id="f-doxcnQmu9kl036ttdTHBLSW4bFe"><span>错误表示请求或任务没有按要求</span><span style="font-weight:bold">正常完成</span><span>，包括：</span></p>

<ul><li id="f-doxcnhKEfH12IuemUAYgk6vCt5g"><span style="font-weight:bold">网关或服务返回 4xx、5xx</span><span>；</span></li></ul>

<ul><li id="f-doxcnQNavp6Jiu27fIDuQHcthgb"><span style="font-weight:bold">请求超时</span><span>；</span></li></ul>

<ul><li id="f-doxcnw79SmxqTo9jneUmG8HyIEd"><span style="font-weight:bold">模型调用失败或被限流</span><span>；</span></li></ul>

<ul><li id="f-doxcnpt4d0EY7nSxwqKRALXK3Cc"><span style="font-weight:bold">工具、Redis、数据库调用失败</span><span>；</span></li></ul>

<ul><li id="f-doxcnZnnbNCC88gqAuQLqJBugXf"><span>Agent 达到</span><span style="font-weight:bold">最大步数或陷入无效循环</span><span>；</span></li></ul>

<ul><li id="f-doxcnMEXHhJyT65nnspFt6SehIe"><span>HTTP 返回 200，但 Agent 没有真正</span><span style="font-weight:bold">完成任务</span><span>。</span></li></ul>

<p id="f-doxcnh01N3PoXP7d6LsRDJJKN0e"><span>错误可能发生在整条链路的任何位置，需要通过</span><span style="font-weight:bold">日志和 Trace</span><span>定位。</span></p>

<p id="f-doxcn3Xlo3ZbUVnEJ1sIYPM2RDb"><span>Agent 尤其要关注</span><span style="font-weight:bold">任务成功率</span><span>：答案是否正确、工具是否正确执行、任务是否真正达到目标。</span></p>

<a id="f-doxcnIgh5R01Fx3whASjoMOf2qc"></a>

###### 饱和度

<p id="f-doxcnGB2MnxdSuraQCUsYXBaKbe"><span>饱和度表示系统距离</span><span style="font-weight:bold">资源上限</span><span>有多远，也就是“还能不能继续扛”。主要对应图中真正消耗资源的部分：</span></p>

<ul><li id="f-doxcnOx9F9ctjdXBNdwPQIYswDg"><span style="font-weight:bold">Agent 实例和 CPU 服务器</span><span>：CPU、内存、并发槽位、任务队列；</span></li></ul>

<ul><li id="f-doxcnbVhz9MKmJ4JUuumrbB7b0g"><span style="font-weight:bold">推理实例和 GPU 服务器</span><span>：GPU 利用率、显存、KV Cache、推理队列；</span></li></ul>

<ul><li id="f-doxcnmSryoVJbZzKiZeBgaCAsEd"><span style="font-weight:bold">Redis</span><span>：内存和连接数；</span></li></ul>

<ul><li id="f-doxcndbP34VXCus29TIsCZoUUqe"><span style="font-weight:bold">MySQL/PostgreSQL</span><span>：连接池、CPU 和磁盘 I/O。</span></li></ul>

<p id="f-doxcn7Ii7MypsbJcxm5rttvnesf"><span>系统不一定要等 CPU/GPU 达到 100% 才算饱和。接近</span><span style="font-weight:bold">容量上限</span><span>时，</span><span style="font-weight:bold">队列长度和 P99 延迟</span><span>往往会先快速上涨。</span></p>

<p id="f-doxcn1p4lqszHyjod6Gd4FkM7Og"><span>最后提醒一下，系统关注的指标，当然还有Agent专属的各种指标，比如</span><span style="font-weight:bold">任务成功率，轨迹，任务质量</span><span>等等，不过整个不属于整个压力测试，后端性能领域，更偏向于</span><span><span><a href="/posts/agent-learning-15-evaluation-observability/#f-doxcnqrKdVGPbNYY8Xm3Fr8NVkh"><span>Agent评估</span></a></span></span><span>，我就不展开了，这块的内容看一下：</span></p>


<a id="section-0134"></a>
## 面试真题

<a id="f-doxcnalJnS8Q1LnFTxbTtpAzcXb"></a>

<a id="f-doxcnJ9KHwhv3iHfSCmgfjDiQDd"></a>

##### 如何对 Agent 系统进行压力测试，以及要关注哪些性能指标？

<p id="f-doxcnbw29d06gjDMparXy5bzjvh"><span>选自</span><span><span><a href="/posts/agent-learning-24-interview-review/#f-doxcn4xdf6ZtUuTSfTLjA5ke0uc"><span>202607宇树科技二面</span></a></span></span><span>.  讲解这个题之前，我们是先讲解了整个大模型前后端生命周期，然后将关键指标结合生命周期讲解，请先阅读笔记：</span><span><span><a href="#f-doxcn6QMnZNyH53yqovElIJziyg"><span>大模型前后端生命周期部分</span></a></span></span><span>。</span></p>

<p id="f-doxcn7P3ZZjk71L6ZRGkgZggFVh"><span style="font-weight:bold">💡答题思路</span></p>

<p id="f-doxcni1qf4RzRPIQpZeddJCK0kc"><span>思路就是本节</span><span><span><a href="#f-doxcn6QMnZNyH53yqovElIJziyg"><span>大模型前后端生命周期部</span></a></span></span><span> 章节介绍的Google SRE 准则，从延迟，流量，错误，饱和度四个方面出发，结合传统后端的指标和大模型相关的指标来回答。</span></p>

<p id="f-doxcn341mP1JzzZSs1kqFEszs9b"><span style="font-weight:bold">📝 参考答案</span></p>

<p id="f-doxcn32g1LXjM1T668IHc9HpCnc"><span>可以先根据真实业务定义 SLO（服务目标），例如任务成功率、P95/P99 延迟、最大并发量和单个成功任务的成本。然后使用接近真实用户的任务组合，</span><span style="font-weight:bold">逐步增加并发，并补充突发流量</span><span>、</span><span style="font-weight:bold">长时间运行和故障注入测试</span><span>，找出系统在满足 SLO 时的最大稳定容量。</span></p>

<p id="f-doxcn726pXf3mVhIKRD1U5ee2nc"><span>指标框架采用 Google SRE 的四个黄金信号，并融入 LLM/Agent 特有指标：</span></p>

<div style="margin-left:25px"><div id="f-doxcn7yeOX3SHLYGQHq7BNwQkPg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">延迟</span><span>：关注端到端任务耗时及 P95/P99；模型侧补充 TTFT（首 Token 延迟）、TPS/TPOT（Token 生成速度）。</span></div></div><div id="f-doxcntfX8k3cadfNTjpovhG3Sqb" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">流量</span><span>：关注并发用户数、RPS、每秒成功完成的任务数和 Token 吞吐量。由于一次 Agent 任务可能多次调用模型和工具，还要关注每任务的模型调用数、工具调用数和调用放大情况。</span></div></div><div id="f-doxcnezWSFtGMJYRfOKm3NykFZf" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">错误</span><span>：关注请求错误率、超时率、模型和工具调用失败率，以及 Agent 任务成功率。HTTP 200 不代表任务真正完成，因此还要判断答案或工具执行结果是否正确、是否达到最大步数或陷入无效循环。</span></div></div><div id="f-doxcnfLUDRKNPZpNYh9gZXKYMrd" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">饱和度</span><span>：关注 CPU、内存、GPU、显存、请求队列、数据库连接池和模型 API 配额，判断哪个模块最先接近容量上限。</span></div></div></div>

<p id="f-doxcnysYe5CggPOwyb7GiH4uwHc"><span>Agent 系统还要额外关注</span><span style="font-weight:bold">任务质量</span><span>和</span><span style="font-weight:bold">成本</span><span>，例如正确完成率、输入/输出 Token 数及每个成功任务的成本。</span></p>

<p id="f-doxcnOOq4oVCDxPLjWC7WAwlFAg"><span>压测时，可以先观察这四类高层指标；发现异常后，再结合调用链 Trace 和系统架构，定位问题是在网关、Agent 服务、模型推理服务、CPU/GPU，还是 Redis、数据库等依赖。同时验证限流、负载均衡、自动扩缩容和故障恢复是否有效。</span></p>

<p id="f-doxcnxctO5NbyUXDFDLo7wIqE4f"><span>最终目标不是找到系统勉强不崩溃时的最高 QPS，而是找到在任务质量、延迟、错误率和成本都满足 SLO 时的最大稳定容量。</span></p>

<a id="f-doxcnogKUdZkdggo2ULwqymc8Wf"></a>

###### 讲解视频

<p id="f-doxcnCmPq60YFc977iOvUyOOusg"><span><span><a href="https://www.bilibili.com/video/BV1YBtf6bE9Y/?spm_id_from=333.1387.homepage.video_card.click&amp;vd_source=144bec9c3f54e465073138bed788be1b"><span>https://www.bilibili.com/video/BV1YBtf6bE9Y/?spm_id_from=333.1387.homepage.video_card.click&amp;vd_source=144bec9c3f54e465073138bed788be1b</span></a></span></span></p>


<a id="section-0135"></a>
## Python 的异步方法是如何实现的？

<a id="f-doxcnmMlQTj93PLCOhBon8z8nwf"></a>

<p id="f-doxcnJ3o6Jt92aRxKgfVtl5Wk2b"><span>（其实Python语法在llm 的岗位问的不多，我也没有专门准备，但是这个问题确实是出现在了好几次面试中，所以我把它整理在这里，还是建议掌握这个问题。这个其实涉及到了</span><span style="font-weight:bold">协程</span><span>以及具体的语法，第一次接触的朋友理解起来应该是会有点费劲的，不要着急寻求一次就能弄懂）</span></p>

<p id="f-doxcnRYYC7ZX9UBW0kxrVIQ8LLe"><span> Python 中最常见的方法是使用asyncio库，使用async 定义异步函数，然后在异步函数中使用await 来等待另一个异步操作完成。</span></p>

<a id="f-doxcncPhgCN1ihQ8LEC4wDiW6wd"></a>

##### 异步方法如何通知事件完成？

<p id="f-doxcnbWMeszEPlZqEWaezAxxwEb"><span>（作为上一个问题的延伸问题，这个也是京东二面被问到，我们在这里一起复习了）</span></p>

<p id="f-doxcnfLCQW0PKJNx9ykQeZt6ezh"><span style="font-weight:bold">1. 使用await 返回结果</span></p>

<p id="f-doxcnHN29DA6uPZNRTRO7ZNdMxc"><span style="font-weight:bold">2.</span><span style="font-weight:bold">使用Future/Task的set_result 或 回调</span></p>


<a id="section-1547"></a>
## AI Agent 生产部署与工程化

<a id="t-block-22243"></a>

<p id="t-YrfqybI9qcX2fJMqnC8mw7"><span>生产部署涉及可靠性、可扩展性、成本控制等多个方面。</span></p>

<p id="t-4G8zLjb2ZFwSmPSbZiGY5X"><span>工程化实践确保系统稳定运行并便于维护。</span></p>


<a id="section-1548"></a>
## 生产部署架构

<a id="t-IHtollhqFU5HABrtUCw90s"></a>

<p id="t-LqYY538PLeT2S3aYITJ4Ul"><span>生产环境对系统有更高的要求。</span></p>

<p id="t-VwbmoloLPrsecT9cdyttz1"><span>需要考虑可靠性、可扩展性、监控告警等多个方面。</span></p>


<a id="section-1549"></a>
## 部署模式

<a id="t-pjPQMcTMP9GIlovecB1GjP"></a>

<a id="t-5nJqQgWKjoH4AE8bj7OQfV"></a>

##### 单机部署

<p id="t-aM3hAGm7dhPIcon2T9LHtp"><span>适合开发和测试环境。</span></p>

<p id="t-2I1DMZQWvm5nsgsMf1OriJ"><span>简单易部署，但无法应对生产级流量。</span></p>

<a id="t-phuP6ErpO02kGpsC6syHUP"></a>

##### 分布式部署

<p id="t-TQfwPatop1VymQ8GjDJ0Xo"><span>适合生产环境，需要考虑多个方面。</span></p>

<p id="t-Fz9kO41of3ZEuE4NIikSTk"><span style="font-weight:bold">负载均衡</span><span>：分发请求到多个实例。</span></p>

<p id="t-lZEWnNJnzvrwFu6Ss1NFLv"><span style="font-weight:bold">服务发现</span><span>：动态管理实例列表。</span></p>

<p id="t-oPN4KPjPBbNA3UpFRh1v3B"><span style="font-weight:bold">状态管理</span><span>：处理分布式状态一致性问题。</span></p>

<p id="t-JlotPUz9v5b7qrpLCnCLxZ"><span style="font-weight:bold">容错处理</span><span>：单点故障不影响整体服务。</span></p>


<a id="section-1551"></a>
## Dockerfile 示例

<a id="t-NT8eGFrNE0l1aHIjNWiLS4"></a>

<pre id="t-Uvw7vrw4OZx2hzBRerWJR1"><code># 基于 Python 3.11 镜像
FROM python:3.11-slim

# 设置工作目录
WORKDIR /app

# 安装依赖
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 复制应用代码
COPY . .

# 创建非 root 用户（安全考虑）
RUN useradd -m appuser &amp;&amp; chown -R appuser:appuser /app
USER appuser

# 暴露端口
EXPOSE 8000

# 启动命令
CMD ["python", "agent.py"]</code></pre>


<a id="section-1553"></a>
## Kubernetes Deployment 配置

<a id="t-OqpV133QEDg8jx2vAeiZUK"></a>

<pre id="t-3hXWrj8Vbyb0AozsRctZv3"><code>span style="color: green;"&gt;
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ai-agent
  labels:
    app: ai-agent
spec:
 # 副本数
  replicas: 3
  selector:
    matchLabels:
      app: ai-agent
  template:
    metadata:
      labels:
        app: ai-agent
    spec:
      containers:
 - name: agent
        image: your-registry/ai-agent:latest
        ports:
 - containerPort: 8000
 # 资源限制
        resources:
          limits:
            memory: "2Gi"
            cpu: "1"
          requests:
            memory: "1Gi"
            cpu: "0.5"
 # 健康检查
        livenessProbe:
          httpGet:
            path: /health
            port: 8000
          initialDelaySeconds: 10
          periodSeconds: 30
        readinessProbe:
          httpGet:
            path: /ready
            port: 8000
          initialDelaySeconds: 5
          periodSeconds: 10
---
apiVersion: v1
kind: Service
metadata:
  name: ai-agent-service
spec:
  selector:
    app: ai-agent
  ports:
 - port: 80
    targetPort: 8000
 type: LoadBalancer</code></pre>


<a id="section-1554"></a>
## 成本控制

<a id="t-px69QZ2E89J45M5fNcKlYq"></a>

<p id="t-KuHUOqXlGNatcKN2J5zJLY"><span>Agent 系统的成本主要来自 LLM API 调用。</span></p>

<p id="t-noxhUJG8D4zQAuDKQUIueb"><span>优化成本是生产部署的重要课题。</span></p>


<a id="section-1555"></a>
## Token 优化策略

<a id="t-Dq1OFtERxho99w6mBi76Ix"></a>

<p id="t-CQj75R822owbOaVaKyUNs9"><span style="font-weight:bold">提示词压缩</span><span>：精简提示词，减少不必要的文字。</span></p>

<p id="t-pTQtnAf3iz8Ru4uy4DsGoT"><span style="font-weight:bold">上下文截断</span><span>：只保留关键的上下文内容。</span></p>

<p id="t-zZI25j1Tdzjtl7zLjE7W3H"><span style="font-weight:bold">缓存响应</span><span>：对相同或相似查询缓存响应。</span></p>


<a id="section-1557"></a>
## 成本优化 Agent 实现

<a id="t-ob8yLKfjwoWGRnSHiQUDdm"></a>

<pre id="t-71iUsNT7G9kCTHsRLyqdp2"><code>import hashlib
import json
from functools import lru_cache

class CostOptimizedAgent:
 """
    成本优化的 Agent
    通过缓存和压缩减少 API 调用成本
    """

 def __init__(self, base_agent, cache, embedder=None):
 # 基础 Agent
        self.base_agent = base_agent
 # 缓存存储
        self.cache = cache
 # 嵌入器（用于相似度缓存匹配）
        self.embedder = embedder

 def process(self, request):
 """
        处理请求，包含成本优化逻辑
        """
 # 生成请求指纹
        request_fingerprint = self.generate_fingerprint(request)

 # 检查精确缓存
        cached_result = self.cache.get(request_fingerprint)
 if cached_result:
 return {
 **cached_result,
 "from_cache": True
 }

 # 如果有嵌入器，检查语义相似缓存
 if self.embedder:
            similar = self.find_similar_cached(request)
 if similar:
 return {
 **similar,
 "from_cache": True,
 "similar_to": similar.get("request_id")
 }

 # 执行请求
        result = self.base_agent.process(request)

 # 缓存结果
        self.cache.set(
            request_fingerprint,
            result,
            ttl=3600 # 1 小时过期
 )

 return {
 **result,
 "from_cache": False
 }

 def generate_fingerprint(self, request):
 """
        生成请求指纹
        用于精确缓存匹配
        """
        content = json.dumps(request, sort_keys=True)
 return hashlib.sha256(content.encode()).hexdigest()

 def find_similar_cached(self, request, threshold=0.95):
 """
        查找语义相似的缓存结果
        使用嵌入向量的余弦相似度
        """
 if not self.embedder:
 return None

 # 将请求向量化
        request_vector = self.embedder.embed([str(request)])[0]

 # 在缓存中搜索相似请求
        best_match = None
        best_similarity = 0

 for cached in self.cache.get_all():
            cached_vector = cached["vector"]
            similarity = cosine_similarity(request_vector, cached_vector)

 if similarity &gt; best_similarity and similarity &gt;= threshold:
                best_similarity = similarity
                best_match = cached

 return best_match


class ResponseCache:
 """
    响应缓存
    简单的内存缓存实现
    生产环境可使用 Redis
    """

 def __init__(self):
        self.cache = {}
        self.timestamps = {}

 def get(self, key):
 """获取缓存"""
 if key in self.cache:
 # 检查是否过期
 if self.is_expired(key):
                self.delete(key)
 return None
 return self.cache[key]
 return None

 def set(self, key, value, ttl=3600):
 """设置缓存"""
        self.cache[key] = value
        self.timestamps[key] = time.time() + ttl

 def delete(self, key):
 """删除缓存"""
 if key in self.cache:
 del self.cache[key]
 if key in self.timestamps:
 del self.timestamps[key]

 def is_expired(self, key):
 """检查是否过期"""
 if key not in self.timestamps:
 return True
 return time.time() &gt; self.timestamps[key]

 def get_all(self):
 """获取所有缓存项"""
 return list(self.cache.values())


def cosine_similarity(vec1, vec2):
 """计算余弦相似度"""
    dot_product = sum(a * b for a, b in zip(vec1, vec2))
    norm1 = math.sqrt(sum(a * a for a in vec1))
    norm2 = math.sqrt(sum(b * b for b in vec2))
 return dot_product / (norm1 * norm2)</code></pre>


<a id="section-1559"></a>
## 流式响应

<a id="t-VAEmq9dbh4jBcOzBrjXzvv"></a>

<p id="t-zdX0pGw0j5mSzYWf1VKPGZ"><span>流式响应减少等待时间，提升用户体验。</span></p>

<p id="t-vgEqRNDWIYdfblCLzNlnwv"><span>不用等待完整响应，可以逐步显示生成内容。</span></p>


<a id="section-1561"></a>
## 流式响应 Agent

<a id="t-mszxyUOiLleGBnaBPEyq67"></a>

<pre id="t-f1fbLw7z1DMzP9Zc53kuvD"><code>import asyncio

class StreamingAgent:
 """
    支持流式响应的 Agent
    边生成边返回，减少等待时间
    """

 def __init__(self, llm):
        self.llm = llm

 async def stream_generate(self, prompt):
 """
        流式生成响应
        使用 async generator 模式
        :yield: 生成的文本片段
        """
 # 启动异步生成任务
 async for chunk in self.llm.stream_generate(prompt):
 yield chunk

 async def process_stream(self, request):
 """
        处理流式请求
        返回异步生成器
        """
        prompt = self.build_prompt(request)

 # 返回生成器
 async def generate():
 async for chunk in self.stream_generate(prompt):
 yield chunk

 return generate()


# 使用示例
async def main():
    agent = StreamingAgent(llm)

 # 启动流式生成
 async for token in agent.stream_generate("解释量子计算"):
 # 边生成边打印
 print(token, end="", flush=True)
 print() # 换行


# 运行
asyncio.run(main())</code></pre>


<a id="section-1562"></a>
## 异步任务队列

<a id="t-MMpW7aLSdLHzgH8reESqJd"></a>

<p id="t-VKlBN3GNna4wkadGVu0mmP"><span>对于长时间运行的任务，使用异步队列处理。</span></p>

<p id="t-XHIjo3jkuoaVMoAK2OTLk0"><span>用户提交任务后立即返回，后台异步执行。</span></p>


<a id="section-1563"></a>
## 异步任务队列实现

<a id="t-FDauLXy70O4S5F5aM14VEa"></a>

<pre id="t-RcJbQLEOeXoNe7tvGsSzLm"><code>import asyncio
from queue import Queue
from threading import Thread
import uuid

class AsyncAgent:
 """
    异步 Agent
    使用任务队列处理长时间运行的任务
    """

 def __init__(self, agent, task_queue):
 # 基础 Agent
        self.agent = agent
 # 任务队列
        self.task_queue = task_queue
 # 结果存储
        self.results = {}
 # 启动后台工作线程
        self.worker_thread = Thread(target=self.process_queue, daemon=True)
        self.worker_thread.start()

 async def submit(self, task):
 """
        提交任务
        立即返回任务 ID
        """
 # 生成唯一任务 ID
        task_id = str(uuid.uuid4())

 # 添加到队列
 await self.task_queue.enqueue({
 "id": task_id,
 "task": task,
 "status": "pending",
 "created_at": time.time()
 })

 return task_id

 async def get_result(self, task_id):
 """
        获取任务结果
        非阻塞式
        """
 if task_id in self.results:
 return self.results[task_id]

 # 检查任务状态
        status = await self.task_queue.get_status(task_id)

 if status is None:
 return None # 任务不存在

 if status == "pending" or status == "processing":
 return {
 "status": status,
 "result": None
 }

 return None

 def process_queue(self):
 """
        后台工作线程
        从队列取出任务并执行
        """
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)

 while True:
            task = loop.run_until_complete(self.task_queue.dequeue())

 if task:
 # 更新状态为处理中
                loop.run_until_complete(
                    self.task_queue.update_status(task["id"], "processing")
 )

 try:
 # 执行任务
                    result = self.agent.process(task["task"])

 # 保存结果
                    self.results[task["id"]] = {
 "status": "completed",
 "result": result,
 "completed_at": time.time()
 }

                    loop.run_until_complete(
                        self.task_queue.update_status(task["id"], "completed")
 )
 except Exception as e:
                    self.results[task["id"]] = {
 "status": "failed",
 "error": str(e)
 }

                    loop.run_until_complete(
                        self.task_queue.update_status(task["id"], "failed")
 )


class TaskQueue:
 """简单的任务队列实现"""

 def __init__(self):
        self.queue = Queue()
        self.statuses = {}

 async def enqueue(self, task):
 """添加任务到队列"""
        self.queue.put(task)
        self.statuses[task["id"]] = "pending"

 async def dequeue(self):
 """取出一个任务"""
 if not self.queue.empty():
 return self.queue.get()
 return None

 async def get_status(self, task_id):
 """获取任务状态"""
 return self.statuses.get(task_id)

 async def update_status(self, task_id, status):
 """更新任务状态"""
        self.statuses[task_id] = status</code></pre>


<a id="section-1564"></a>
## 微服务化设计

<a id="t-7ND05tzdGu4nnBMQYS7iuV"></a>

<p id="t-oa6DmaBLI0YYbC5QkBj2ED"><span>将 Agent 系统拆分为多个独立服务，提高可维护性和可扩展性。</span></p>


<a id="section-1565"></a>
## 服务划分

<a id="t-1DqzbokymnnpunFuxQihrQ"></a>

<div id="t-snTe5RlbxkQcpYhXsFnZER"><table><colgroup><col width="176.8992919921875"/><col width="298.8992919921875"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>服务</span></p></td><td style=" vertical-align: top"><p><span>职责</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>API 网关</span></p></td><td style=" vertical-align: top"><p><span>统一入口，认证限流，路由转发</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>Agent 服务</span></p></td><td style=" vertical-align: top"><p><span>核心逻辑，推理规划</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>工具服务</span></p></td><td style=" vertical-align: top"><p><span>外部 API 集成，工具调用</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>存储服务</span></p></td><td style=" vertical-align: top"><p><span>知识库，状态管理，缓存</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>监控服务</span></p></td><td style=" vertical-align: top"><p><span>日志收集，指标监控，告警</span></p></td></tr></tbody></table></div>


<a id="section-1566"></a>
## 服务间通信

<a id="t-jiwHpuCeo9Xpl2viNvMm3p"></a>

<p id="t-oh3N7Vv1EeEvkavhxmE1gg"><span style="font-weight:bold">同步通信</span><span>：HTTP/gRPC，用于实时请求响应。</span></p>

<p id="t-Pbey7VCKOYWDFgtl9c2p6g"><span style="font-weight:bold">异步通信</span><span>：消息队列，用于耗时操作和事件通知。</span></p>


<a id="section-1567"></a>
## 章节小结

<a id="t-CBvMGBL8xY2dubFlkCKrUT"></a>

<p id="t-vdoLtlCECP0CFrVKjavMm2"><span>本章节介绍了生产部署与工程化的关键实践。</span></p>

<p id="t-4HIAWkdLBqWDodzbsnZs5A"><span style="font-weight:bold">生产部署架构</span><span> 从单机到分布式，逐步扩展。</span></p>

<p id="t-pZjDI3Mm8TVC4JFyEEOQvH"><span style="font-weight:bold">容器化部署</span><span> 使用 Docker 和 Kubernetes。</span></p>

<p id="t-AofdLeqnJGYhgsAEWsWXeE"><span style="font-weight:bold">成本控制</span><span> 通过缓存和 Token 优化降低成本。</span></p>

<p id="t-pg5wE3KpGbmsg9j1BEfpIm"><span style="font-weight:bold">流式与异步</span><span> 提升用户体验和系统吞吐量。</span></p>

<p id="t-Xh0K70T7Cuue0IpAX7bg1L"><span style="font-weight:bold">微服务化设计</span><span> 提高系统的可维护性和可扩展性。</span></p>

<p id="t-9qDIObyCdgIYrASyQfwKQr"><span>生产部署需要综合考虑可靠性、性能、成本等多个方面。</span></p>

<p id="t-6h2tM4268rpyz4Yqk6RxZq"><span>建议从小规模开始，逐步增加复杂度。</span></p>

