---
title: "第 06 章 · MCP 与外部集成"
date: "2026-10-22"
draft: false
author: "学习资料整理"
description: "协议、客户端与服务器、传输、资源、工具、兼容性与 A2A"
tags: ["Agent", "学习路线"]
categories: ["AI 工程"]
prerequisites: ["agent-learning-05-reasoning-planning"]
verification: {"status": "not-run", "scope": "本次仅整理资料；示例代码与原文技术结论未复跑。"}
---

协议、客户端与服务器、传输、资源、工具、兼容性与 A2A

[学习路线](/posts/agent-learning-route/) · [上一章](/posts/agent-learning-05-reasoning-planning/) · [下一章](/posts/agent-learning-07-context-memory/)

本章按知识小节编排。项目内容作为学习案例阅读，示例代码与原文技术结论未在本次整理中执行验证。

## 本章目录

- [MCP](#section-0046)
- [MCP 和 Function calling 的区别](#section-0047)
- [MCP 本地Server和远端Server 的对比](#section-0048)
- [MCP的传输协议](#section-0049)
- [MCP Server Tool设计原则](#section-0050)
- [MCP的新技术&amp;趋势](#section-0051)
- [MCP的参考资料](#section-0052)
- [A2A](#section-0065)
- [AI Agent 工具与外部集成](#section-1489)
- [Computer Use](#section-1490)
- [核心能力](#section-1491)
- [工作原理](#section-1492)
- [Computer Use Agent 基本实现](#section-1494)
- [应用场景](#section-1495)
- [MCP 协议详解](#section-1496)
- [核心设计理念](#section-1497)
- [架构组件](#section-1498)
- [通信流程](#section-1499)
- [MCP Server 实现](#section-1501)
- [API 集成模式](#section-1502)
- [REST API 集成](#section-1503)
- [REST API 客户端实现](#section-1504)
- [API 集成最佳实践](#section-1505)
- [章节小结](#section-1506)

<a id="section-0046"></a>
## MCP

<a id="f-doxcnGtZDPtFItN90Fm9yx2JgXd"></a>

<p id="f-doxcnMUSxt4lfBKJn7TtZjq8mIh"></p>

<p id="f-doxcnVHshlI0KLYfjJHLghBecxg"><span>MCP 是一种</span><span style="font-weight:bold">标准化接口协议，</span><span>统一了AI模型与外部资源的连接方式，用于让LLM能够访问外部的</span><span style="font-weight:bold">数据</span><span>，</span><span style="font-weight:bold">工具</span><span>和</span><span style="font-weight:bold">提示词</span><span>。</span></p>

<p id="f-doxcnSdzZH68MOJdlZ5a72htyPc"><span>MCP采用</span><span style="font-weight:bold">客户端-服务端架构</span><span>，包含三个关键组件：Host, Client,和Server. 其中Host是运行LLM的应用程序。Client是在Host中运行，负责与MCP Server通信。Server中暴露了</span><span style="font-weight:bold">工具</span><span>，</span><span style="font-weight:bold">数据资源</span><span>，</span><span style="font-weight:bold">提示模板</span><span>等，供LLM使用。</span></p>

<p id="f-doxcnntTh21MmN2gUWmiFhRk6ve"><span>MCP的典型优点是</span><span style="font-weight:bold">动态能力更新(</span><span>工具参数变更时无需重写客户端代码)，</span><span style="font-weight:bold">接口标准化</span><span>(不同工具统一接入，减少开发成本)的特点。</span></p>


<a id="section-0047"></a>
## MCP 和 Function calling 的区别

<a id="f-doxcnrHrx56gbn0W0zkJC1e25ie"></a>

<p id="f-doxcn9gxOeHPNupPPAriO7oDfnc"><span>（面试也出现过，挺基础的一个考点）</span></p>

<p id="f-doxcnCSBn9JusVfBKyFhz5RVoiE"><span>《Agentic design pattern》第10章专门有对这一问题进行讲解。</span></p>

<div id="f-doxcn2Rith7YIkT9H62lOEUhGpg"><img alt="" decoding="async" height="295" loading="lazy" src="/images/agent-learning/c11d96c58dcb950dd91b215f.png" width="876"/></div>


<a id="section-0048"></a>
## MCP 本地Server和远端Server 的对比

<a id="f-doxcnoZB0nssSxLNj66LMo0N7df"></a>

<p id="f-doxcn3uxWUaVMDiFZu1hOPDysXg">表格相关内容可结合下面的视频进一步理解。 <a href="https://www.youtube.com/watch?v=wlerSyHzoCI"><span>https://www.youtube.com/watch?v=wlerSyHzoCI</span></a></p>

<div id="f-doxcnFfHZKBm9spqfOejzTWw7Yf"><img alt="" decoding="async" height="311" loading="lazy" src="/images/agent-learning/b3b2063aa3cef104fb89d297.png" width="926"/></div>


<a id="section-0049"></a>
## MCP的传输协议

<a id="f-doxcn2SFl8v4IR54zH8PAhPTuzb"></a>

<p id="f-doxcnSujZZ5eyZBitJYfbMcBqOf"><span>(最开始我复习的时候就是弄清楚了两种协议，本地:Stdio 远端：SSE，这也是有一些视频这么讲的。其实因为这个答案被挑战过，因为现在SSE在MCP里已经被替代了，所以我有了以下答案，相对来说这个答案是比较完整的，这题也是面试会考的题）</span></p>

<p id="f-doxcnfZ6wILf0w1cgUSCnbsm0Jg"><span>MCP的传输协议针对于</span><span style="font-weight:bold">本地服务器</span><span>和</span><span style="font-weight:bold">远端服务器</span><span>有明显区别。</span></p>

<p id="f-doxcnM5Hcc0z4KVxqQhViYMxieg"><span>对于远端MCP Server, 协议在 2025 年 3 月进行了重大更新：原先采用 </span><span style="font-weight:bold">有状态的 HTTP 长连接</span><span>，并强制使用 </span><span style="font-weight:bold">Server-Sent Events (SSE)</span><span> 来实现服务器实时推送，这种方式复杂且对网络稳定性要求高。新版本改为 </span><span style="font-weight:bold">无状态协议</span><span>，主要通过 </span><span style="font-weight:bold">标准的 GET 和 POST HTTP 请求</span><span>完成交互，SSE 变为可选增强功能，只有在需要实时推送时才启用。这一改动降低了实现复杂度，提高了兼容性和灵活性，使协议更接近 REST 风格，易于集成和扩展。</span></p>

<p id="f-doxcnslfdcohOHIu08VnMccwtOh"><span>对于 </span><span style="font-weight:bold">本地 MCP Server</span><span>，通常运行在开发者机器上，直接通过本地接口或 STDIO（标准 I/O）进行通信，不涉及网络传输，因此不需要复杂的认证或长连接管理。</span></p>


<a id="section-0050"></a>
## MCP Server Tool设计原则

<a id="f-doxcnYzEvV8C81Mg7gFvkdlbYks"></a>

<blockquote id="f-doxcn8Z0sjGHd6jMINikE7zRKVf"><p id="f-doxcn25WiSGQWAkURgZVcPfrrgc"><span>来自真实面试问题。本身直接被问到倒是比较少，但是当你的项目，比如就是设计了MCP的Server，比如我们的RAG项目。这时候聊到你设置了哪些工具的时候，这个问题可能会被问到。</span></p></blockquote>

<blockquote id="f-doxcnOnTSDhb7vWyJFYkb6oCQYc"><p id="f-doxcncXrSA0LwcjToSMJxMyd1He"><span style="font-weight:bold">资料来源</span><span>：MCP 官方规范 [modelcontextprotocol.io/specification/2025-06-18/server/tools](</span><span><span style="text-decoration: underline"><a href="https://modelcontextprotocol.io/specification/2025-06-18/server/tools"><span>https://modelcontextprotocol.io/specification/2025-06-18/server/tools</span></a></span></span><span>)</span></p></blockquote>

<p id="f-doxcnArLONNiFtIQjmmy8hKmKrd"><span style="font-weight:bold">第一，入参设计——参数最少化、类型严格、约束内联。</span><span> LLM 是根据 inputSchema 来构造参数的，schema 本身就是"给 LLM 看的说明书"。原则是：必填参数尽量少，能给默认值就给默认值，用枚举收敛可选项而不是让 LLM 自由发挥，类型要明确。约束直接写在 schema 里，比如最小值、最大值、默认值，这样 Server 端校验方便，LLM 传参准确率也更高。该学习案例里查询工具的返回条数参数就限定了范围和默认值，LLM 不传就用默认值，传了超出范围直接截断。</span></p>

<p id="f-doxcnLm2R55skUHXYE4UmBZOmEh"><span style="font-weight:bold">第二，出参设计——结构化返回，LLM 友好。</span><span> MCP 规范支持 outputSchema 声明返回结构，让 Client 和 LLM 提前知道数据长什么样，做类型校验和自动解析。同时规范要求向后兼容——结构化返回的同时要附带一个纯文本版本，保证老 Client 也能读。该学习案例的做法是统一格式化输出，把检索结果转成带标题、来源引用、置信分数的可读文本，而不是丢裸 JSON 给 LLM——因为 LLM 读自然语言比读嵌套 JSON 效率高得多。</span></p>

<p id="f-doxcnVokhUE8mbSD6oAAJeemd9g"><span style="font-weight:bold">第三，错误处理——双层错误机制，错误信息对 LLM 友好。</span><span> MCP 规范定义了两层错误：</span><span style="font-weight:bold">协议级错误</span><span>用标准 JSON-RPC error code 处理参数非法、tool 找不到等问题；</span><span style="font-weight:bold">业务级错误</span><span>通过 `isError: true` 加 error message 报告。关键原则是：</span><span style="font-weight:bold">错误信息要告诉 LLM 下一步该怎么办，而不是丢一堆堆栈。</span><span> 比如返回"集合不存在，可用的集合有 A、B、C"，而不是返回 Python 异常堆栈。前者 LLM 能自主修正重试，后者只能把堆栈原样输出给用户看。</span></p>

<p id="f-doxcnwDhBNt1FAOiiOdY2i7kDFd"><span style="font-weight:bold">第四，Tool Annotations——声明副作用，让 Client 做安全决策。</span><span> MCP 规范定义了 annotations 字段，包含四个关键属性：是否只读、是否有破坏性、是否幂等、是否与外部世界交互。这些标注不影响执行逻辑，但 </span><span style="font-weight:bold">Client 会据此决定是否需要弹确认框</span><span>。比如只读的查询工具可以自动执行，但有破坏性的删除工具就应该让用户二次确认。该学习案例的三个 tool 全部是只读查询，都应该标注为只读。</span></p>

<p id="f-doxcnEMeGp7Qcjzcbo3d30Xeose"><span style="font-weight:bold">第五，粒度控制——单一职责，工具间可组合。</span><span> MCP 的设计是 model-controlled——LLM 自己决定调用顺序和组合方式。所以工具拆分的粒度很关键：太粗 LLM 无法灵活组合，太细调用链路过长容易出错。该学习案例拆了三个 tool：列出集合 → 查看文档详情 → 查询知识库，形成"先发现 → 再了解 → 最后查询"的自然工作流，上游的输出可以直接作为下游的输入参数。</span></p>

<p id="f-doxcnwDUILSqLNvQiP6Zy3HcGIc"><span style="font-weight:bold">第六，安全与校验——输入校验和输出脱敏。</span><span> MCP 规范明确要求 Server 必须校验所有输入、实现访问控制、限流、清洗输出。即使 LLM 传了符合 schema 的参数，Server 端仍然要做业务层面的校验——比如路径穿越检查、注入防护、敏感信息脱敏。同时规范强调"始终要有人类在回路中"，高危操作必须有确认机制。</span></p>

<p id="f-doxcnc9nfysW38zezXoSsD2TF8f"><span style="font-weight:bold">总结来说</span><span>，MCP tool 的编写是"六位一体"的：description 决定 LLM 能不能找到你，inputSchema 决定传参准不准，outputSchema 决定结果可不可解析，error handling 决定失败后能不能自愈，annotations 决定 Client 信不信任你，粒度和安全则决定整个系统是否健壮可控。</span></p>


<a id="section-0051"></a>
## MCP的新技术&amp;趋势

<a id="f-doxcne4ozLba2eMh2hpE3JsT1tc"></a>

<p id="f-doxcnfB9MYFNFH7p0lVSoIToZuq"><span>2026年8月份，</span><span><span><a href="/posts/agent-learning-24-interview-review/#f-doxcncXN1joqZ1P2qOoJvmMXK22"><span>阿里淘天秋招大模型开发一面面试</span></a></span></span><span>官问了这么三个MCP的问题： MCP 是为了解决什么问题提出的？ - 考察MCP的基本理解，概念和定义。 MCP 的工具形式给通用 Agent 带来了什么问题？有没有了解替代传统 MCP 调用形式的方法？ - 这两个问题考察了，有没有关注MCP的技术发展，替代技术和局限性。 从26年Agent SKILL 火起来以后，MCP确实受到了挺大的冲击，热度没有去年那么大。 但诚然MCP并没有完全消失，面试中也会出现。这三个问题，问的也很符合时代的趋势，在当前环境下，MCP受到了哪些冲击，又有哪些迭代？ 为了讲清楚这些问题，我要给大家介绍4个技术：</span></p>

<div style="margin-left:25px"><div id="f-doxcnuQod8oE4ectqrz1KZdCkdc" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">Tool Search：工具已接入，需要时才把相关工具的说明加载给模型。</span></div></div><div id="f-doxcnDLJujnLPVl6OpVl4VbHZRg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">Code Mode：模型写流程，程序执行流程，不必每一步都让模型重新决定。</span></div></div><div id="f-doxcnUrywl173AFntBx1GZiPv1b" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">Agent Skills：把某类任务的做法、脚本和资料封装起来，按需复用。</span></div></div><div id="f-doxcnfOzBjcbO8Yt3v2yCUSefuc" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">MCP 2026 年演进：协议继续向易部署、可缓存、可授权和支持长任务的方向发展。</span></div></div></div>

<p id="f-doxcnYUXPclAWAsejmfxgwUnr7N"><span>弄明白了这4项技术后，对于MCP的面试问题回答，我们的回答会更有深度，也更加与时俱进。</span></p>

<a id="f-doxcne3oPSMsImLnriSK0HmIlzh"></a>

##### Tool Search

<p id="f-doxcn9ErhGiCrqgbXpQJAVfWCrG"><span style="font-weight:bold">痛点</span></p>

<p id="f-doxcn6HAYnPNJStmeAMHk0ZLRbd"><span>接入的 MCP 工具多了，如果客户端把所有工具说明都放进模型上下文，就会浪费 token，也增加模型选错工具的可能。</span></p>

<p id="f-doxcnaHW8qz00Y3hyDpVks196Nd"><span>比如用户只是想查一封邮件，模型却收到了邮件、日历、CRM 等 100 个工具的说明，大部分都用不上。</span></p>

<p id="f-doxcnFrRQEMzb8pgube0H4ynaoh"><span style="font-weight:bold">解决方案</span></p>

<p id="f-doxcnfdRNaUimJfB8CgwRu4GXGE"><span>Tool Search 可以主要在客户端实现，不必修改 MCP Server：</span></p>

<ul><li id="f-doxcntk1pnoLKS3x7dsUigPxioc"><span style="font-weight:bold">MCP Server 端</span><span>：继续提供原来的工具，通过 </span><span><span><span>tools/list</span></span></span><span> 返回工具定义，通过 </span><span><span><span>tools/call</span></span></span><span> 执行调用。</span></li></ul>

<ul><li id="f-doxcnyIfyJ1xNY5x56W5QN7csmc"><span style="font-weight:bold">客户端</span><span>：获取并保存完整工具目录，向模型提供搜索入口；根据任务检索相关工具，只把需要的工具说明加入模型上下文。模型选定工具后，客户端照常通过 MCP 调用。</span></li></ul>

<p id="f-doxcnv2I81eLKUMsjfCsnMdHzLd"><span>例如处理邮件任务时，客户端只加载“搜索邮件”和“读取邮件”的说明，其他工具暂时不加载。常用工具可以直接提供，不必每次搜索。</span></p>

<p id="f-doxcn5KouTiGLpAJcbJNpi9b9fh"><span style="font-weight:bold">收益</span></p>

<div style="margin-left:25px"><div id="f-doxcnsOX5yGxkoLZUyXNtFcVi1f" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">少占上下文</span><span>：不用加载大量无关工具说明，减少输入 token 开销。</span></div></div><div id="f-doxcn0xwardZ3GDiVJAHQVozRKg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">更容易选工具</span><span>：模型主要面对与当前任务相关的工具，减少干扰。</span></div></div></div>

<p id="f-doxcnu9SOJGdRergATB5tfLZXIb"><span>搜索本身也有开销，并可能漏掉工具，因此更适合工具较多的场景；只有几个简单工具时，直接加载即可。</span></p>

<div id="f-doxcn7O5cFviUZzpWdhOjokpOxf"><img alt="" decoding="async" height="720" loading="lazy" src="/images/agent-learning/7bb5116073ab99400073ba28.png" width="1280"/></div>

<a id="f-doxcnXmGnf4iB46ome38yd0Irhb"></a>

##### Code Mode

<blockquote id="f-doxcnHdItIZbxcDZyhZ9Ej3a9Jg"><p id="f-doxcnzaYSBloKM5pE1beGzq8aFb"><span>Code Mode 本质上是一种MCP 协议的用法，是2026年</span><span style="font-weight:bold">美国的IT公司 Cloudflare 提出的一种使用方法。</span><span>协议本身内容没变，改变了MCP Server暴露的工具的思想，让客户端（大模型端）负责整个流程的脚本编排，把脚本的编排放在MCP Server侧。减少大模型多轮调用次数和等待时间。</span></p></blockquote>

<p id="f-doxcnl7FzQXwX3eUXUNuYM3CA1d"><span>MCP 解决了 Agent 如何统一接入外部工具的问题，但</span><span style="font-weight:bold">工具接进来了，不代表多步任务就能高效完成。</span><span> 传统MCP的用法是：MCP Server 把查询客户、查询订单等业务操作分别暴露成工具，模型选择工具，客户端通过 MCP 发起调用，再把结果交给模型决定下一步。</span></p>

<p id="f-doxcnqeEDrFFTyoH3u9MZWupp6f"><span>只有一两次查询时，这种方式很直接。但当一个任务需要连续调用很多工具、反复查询分页、处理大量中间数据时，这种使用方式的痛点就出现了：</span><span style="font-weight:bold">服务端只负责执行一个个业务操作，模型却要反复承担步骤编排和中间结果处理。</span></p>

<p id="f-doxcnTkf1goa7xBZCuN7l236bKe"><span>上一章的 Tool Search 能减少一开始加载的工具说明，却不能单独解决执行阶段的这些往返。假设我们让 Agent 完成一个任务：</span><span style="font-weight:bold">“查一下这 100 位客户的订单，找出本月消费超过 1 万元的人。”</span><span> 模型先通过 MCP 工具请求客户名单，拿到结果后再决定查谁的订单；订单返回后，又继续决定下一次调用。如果接口还有分页，就要继续取下一页，最后再汇总。</span></p>

<p id="f-doxcna2CWomNX2yyYtLldudiphk"><span>在这个过程中，</span><span style="font-weight:bold">大量普通程序就能完成的机械步骤，也让模型反复参与了</span><span>：</span></p>

<div style="margin-left:25px"><div id="f-doxcncltVb4NfjVfDSlmaQHggiR" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">等待多</span><span>：每轮都要等待模型读取结果、生成下一步操作。</span></div></div><div id="f-doxcnBipQYtE8eklkBtwIJnhWKh" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">上下文长</span><span>：大量订单作为工具结果交给模型，但用户真正需要的只是筛选后的名单。</span></div></div><div id="f-doxcnyxbo1hOErHkOaP8afwQ2Ig" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">处理不划算</span><span>：循环、求和、排序、去重本来就适合普通程序，不必让模型靠阅读原始数据完成。</span></div></div></div>

<p id="f-doxcnctHg9bnOsRA69rus20njTd"><span>既然模型会写代码，我们能不能让它把处理流程写出来，交给程序连续执行，而不是每一步都回来问它？</span><span style="font-weight:bold">这就是 Code Mode 的核心思路：模型负责生成处理逻辑，运行时负责执行，只把必要结果返回模型。</span></p>

<p id="f-doxcnSzTalAs0jyrObDndBPgHkh"><span>对于刚才的任务，模型可以生成这样的脚本逻辑：</span></p>

<pre id="f-doxcnHCPu3zGdPeRhoJ9upKmpYb"><code>查询客户列表；
循环处理每位客户：
    查询本月订单，如果有下一页就继续查询；
    计算订单总额；
    如果总额超过 1 万元，加入结果；
返回符合条件的客户及总额。</code></pre>

<p id="f-doxcnEdWkxKqc7mbi5AWk93DwTn"><span>根据这样的逻辑：</span><span style="font-weight:bold">模型不需要预先知道具体有多少页、要调用多少次，只需要写清楚处理规则。</span><span> 大量订单留在执行环境里，最终只有筛选后的名单进入模型上下文。</span></p>

<p id="f-doxcnpvLeUt3My8KofnLkUy2uYg"><span>那么，这段程序由谁执行，它又怎么知道能调用哪些业务能力？Cloudflare 演讲中的实现给了一个具体答案：</span><span style="font-weight:bold">服务端不再把每个业务 API 都单独暴露成 MCP 工具，而是提供“能力发现”和“代码执行”两个入口：</span><span style="font-weight:bold"><span><span>search</span></span></span><span style="font-weight:bold"> 与 </span><span style="font-weight:bold"><span><span>execute</span></span></span><span style="font-weight:bold">。</span></p>

<p id="f-doxcnJgiOaQp5wIBNaaV4xaZU0e"><span>以前，MCP Server 可能直接暴露 a、b、c、d、e 五个业务工具，模型分别发起调用。现在，面向客户端的 MCP 工具列表可以只有 </span><span><span><span>search</span></span></span><span> 和 </span><span><span><span>execute</span></span></span><span>，而 a、b、c、d、e 仍然存在，只是作为执行环境中的函数，供模型生成的脚本调用。</span></p>

<p id="f-doxcnVD2e1HwHWvlxQrNwH3G88e"><span>模型、客户端和服务侧的协作过程是：</span></p>

<div style="margin-left:25px"><div id="f-doxcnaq45YCdIppSqgazN8k7KWd" style="display:flex;gap:0.5em"><span style="min-width:1.5em">a.</span><div><span style="font-weight:bold">先查接口。</span><span> 模型调用 </span><span><span><span>search</span></span></span><span>，客户端通过 MCP 把请求发给服务端，获取本次需要的业务函数及参数说明。视频中的 </span><span><span><span>search</span></span></span><span> 接受代码，用它查询 OpenAPI 规格，并不是把全部接口文档交给模型。</span></div></div><div id="f-doxcnNnnlfCc0MzySwG2jgBL5rh" style="display:flex;gap:0.5em"><span style="min-width:1.5em">b.</span><div><span style="font-weight:bold">再写流程。</span><span> 模型根据说明，写出“查客户、循环查订单、求和、筛选”的脚本。它写的是组合已有能力的逻辑，不是重新实现订单查询服务。</span></div></div><div id="f-doxcn3ndpiiZqrwiWelBXs5ixGg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">c.</span><div><span style="font-weight:bold">提交执行。</span><span> 模型调用 </span><span><span><span>execute</span></span></span><span>，客户端通过 MCP 提交整段脚本，服务侧的受控运行时执行代码。代码中的业务函数可以直接调用相应 HTTP API。</span></div></div><div id="f-doxcnEmgFjO95IFrplsPe77wGUb" style="display:flex;gap:0.5em"><span style="min-width:1.5em">d.</span><div><span style="font-weight:bold">返回结果。</span><span> 服务侧完成查询和统计后，把脚本输出返回客户端，再交给模型回答用户。中间每一次订单查询不必都让模型参与。</span></div></div></div>

<pre id="f-doxcnbfzOjDsLFpqgB7IO0C5ANd"><code>模型通过 search 了解需要的接口
              ↓
模型写脚本，通过 execute 提交
              ↓
服务侧执行：查客户 → 循环查订单 → 计算 → 筛选
              ↓
只把必要结果返回模型</code></pre>

<p id="f-doxcnCZNpsxrg9Q5kYabk6h2Tod"><span>这里有两个不同的收益：</span><span><span><span>search</span></span></span><span> 让接口说明按需加载，避免开局塞入大量工具定义；</span><span><span><span>execute</span></span></span><span> 让多个业务操作在程序里完成，减少执行期间的模型往返和中间上下文。</span><span style="font-weight:bold">搜索是配套机制，生成并执行程序才是 Code Mode 的核心。</span></p>

<p id="f-doxcn3JzXUx1JyrAVxgOxUWisUd"><span>最后总结来说，CodeMode这个技术，并没有改变MCP协议本身，而是改变了使用方式。 MCP Server不暴露具体的业务接口，而只暴露让客户端（大模型侧）能够进行流程编排的必要接口，让客户端写整个过程的运行脚本，交给MCP Server侧统一执行。 省去模型多轮推理，等待，也减少不必要的上下文（只将最后结果送给大模型）。</span></p>

<p id="f-doxcnuZoE7mmooOGmBioUjLWMqx"><span style="font-weight:bold">面试时可以这样总结：Code Mode 把可程序化的工具编排和中间数据处理，从模型逐步决策转移到外部运行时。模型写流程，程序执行流程，从而减少模型往返和上下文开销。Cloudflare 的 search/execute 是它与 MCP 结合的一种服务侧实现，而不是替代 MCP 的新协议。</span></p>

<p id="f-doxcnzVOn7eIQVvOTO7zc3Og2Yb"><span>如果看了上面的内容你还一知半解，我们用这个图来做一下类比，希望你可以通过这个图明白Code Mode的优势。</span></p>

<div id="f-doxcnHKzlIculcvHqzGz3cwa7Fe"><img alt="" decoding="async" height="202" loading="lazy" src="/images/agent-learning/34933c000925a4a83a50d404.png" width="360"/></div>

<a id="f-doxcnXHD5WiIiWpU0AVX7DUi3Nh"></a>

##### Agent Skills

<p id="f-doxcn3lOYa94WSNVkGAJFrKcerg"><span>Agent Skills 的基础用法就不展开了。在之前的 Skills 笔记和讲解视频中，我们已经拿它和 MCP 做过对比。围绕 Skills，也经常能看到“MCP 是不是被淘汰了”这样的讨论，但不能把这种说法直接当作技术结论。</span></p>

<p id="f-doxcnuaSRM0ixY6xYrDaBQ42a2c"><span>相信大家对 Skills 和 MCP 都不陌生。这一节之所以仍然讲 Agent Skills，主要是因为它们太容易被放在一起比较。包括面试官问的“</span><span style="font-weight:bold">有没有了解替代传统 MCP 调用形式的方法？</span><span>”，Skills 也是一个回答的出发点。这里就集中总结它们的区别、优缺点和适用场景，作为一道常见的面试对比题来准备。</span></p>

<p id="f-doxcnpHAB0UYkNl80BsCE8dTwkf"><span style="font-weight:bold">SKILLS VS MCP</span></p>

<p id="f-doxcnccCQpmhRhyVL8N6WKKXeRe"><span style="font-weight:bold">Skills 主要教 Agent“这类事情应该怎么做”，MCP 主要解决“怎样以统一方式接入外部能力”。它们不是同一层的技术，所以既可以配合，也会在某些具体场景中形成替代选择。</span></p>

<p id="f-doxcnc4Zuw41mTfBPWJhWcY0sxp"><span>还是拿“生成月度经营报告”举例。MCP Server 可以提供查询订单、查询退款、读取客户信息等工具，但有了这些工具，Agent 不一定知道公司要求使用哪种统计口径、怎样排除异常、按什么模板输出。Skill 则可以把这些做法写清楚，并附带统计脚本和报告模板。</span></p>

<p id="f-doxcnVRX8nctDUi8JbDpIsBj2fc"><span style="font-weight:bold">从提供的内容来看，Skill 更像一份可以附带工具材料的操作手册。</span><span><span><span>SKILL.md</span></span></span><span> 写明任务步骤，旁边可以放脚本、参考资料和模板，重点回答“这类任务应该怎么完成”。MCP 则约定外部能力如何被发现和调用，包括工具定义、参数 schema 和结果格式等，重点回答“有哪些能力可用，以及怎样调用”。</span></p>

<p id="f-doxcncLB26IdrRZt9m5B0Vejqmh"><span style="font-weight:bold">从执行方式来看，Skill 本身不是执行器。</span><span> Agent 读完指南，仍要依靠宿主提供的工具、CLI 或脚本运行时干活，也可以按指南调用 MCP 工具。而通过 MCP 调用时，由客户端发送请求，服务器执行对应操作，再返回结果。</span></p>

<p id="f-doxcnsobD0uzs50h5OFesbGHwtP"><span style="font-weight:bold">从复用方式来看，Skills 复用的是做事方法和资源，MCP 复用的是服务接入。</span><span> 一份 Skill 可以交给兼容的 Agent 使用，但对方仍需具备相应的工具和环境；一个 MCP 服务可以让多个兼容应用接入，不必各自重新实现一套业务系统适配。</span></p>

<p id="f-doxcnYTgnYqhJpN1ySVTBEU9nyf"><span>两者也都有边界：</span><span style="font-weight:bold">写了 Skill，不代表自动获得了业务数据、账号权限或执行环境；接了 MCP，也不代表自动获得了完整业务流程，或者模型一定能选对工具。</span></p>

<p id="f-doxcnhWTipHBB8Biqun5Lu6cLnN"><span style="font-weight:bold">为什么大家会觉得 Skills 能替代 MCP？因为有些任务原本就不需要额外包装一层 MCP。</span></p>

<p id="f-doxcn2XAEwby53ojFDuiGruj9Ue"><span>比如“查 GitHub Issue，再整理成周报”，可以有两种做法：</span></p>

<div style="margin-left:25px"><div id="f-doxcnG5lbwhWM6IhWbTjXndTu1f" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>接入 GitHub MCP，让 Agent 调用相关工具。</span></div></div><div id="f-doxcnFewTywwjJT6mqo8peWBMqh" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>写一个 Skill，指导 Agent 使用已经安装并授权的 </span><span><span><span>gh</span></span></span><span> 命令查询，再运行脚本整理结果。</span></div></div></div>

<p id="f-doxcngsnzgzOq2olXtaa89yLekh"><span>如果命令行工具已经成熟可用，第二种方式可能更轻量，不必为了同一套操作再搭建、配置和维护一个 MCP Server。处理本地文件、生成文档、运行测试等任务，也经常适合“Skill + 现有工具或脚本”。</span></p>

<p id="f-doxcn0lel6SRK7agjpMXQNssQ4b"><span style="font-weight:bold">但反过来，如果没有现成的访问能力，只写一个 Skill 就替代不了 MCP 接入。</span><span> 比如，公司内部有一套订单系统，数据库不允许员工电脑直接连接，也没有提供可用的 CLI。公司已经通过一个受控的 MCP Server 提供订单查询：服务端核验员工身份，只返回其有权查看的店铺订单，并记录查询日志。</span></p>

<p id="f-doxcnnSOvGZpQxyvxWkE0szcTKh"><span>这时候，即使写一个 Skill，告诉 Agent“先查订单，再扣除退款，最后生成经营报告”，Agent 也不会因此获得订单数据。</span><span style="font-weight:bold">Skill 提供了操作指南，但查询入口、身份校验和数据权限仍然依赖已有的业务服务。</span><span> 实际方案应该是 Skill 规定统计方法，Agent 通过已授权的 MCP 工具取数，再完成报告。</span></p>

<p id="f-doxcnkvxmnykhNfuZAvLDt0K5ae"><span style="font-weight:bold">优缺点</span></p>

<p id="f-doxcnIO5HCsB0yVm7LUgvDTy3Ad"><span>从优缺点看，Skills 的优势是容易编写、容易随项目版本管理，能够把团队经验、模板和经过测试的脚本一起复用；按需加载也避免了把完整操作指南一直放在上下文中。代价是仍要维护指南和脚本，并处理运行环境、依赖版本、凭据和权限。把 Skill 复制给另一个 Agent，不代表对方就有相同的工具和环境；模型读取了指南，也不保证每一步都正确执行。</span></p>

<p id="f-doxcnwXqwvBfr5gKTMpToNyOUhf"><span>MCP 的优势则是标准化接入：如果多个 Agent 应用都需要访问同一个业务系统，可以让它们复用同一个 MCP 服务，而不是每个应用各写一套适配。服务端也便于集中实现业务校验、权限检查和审计。代价是需要维护客户端与服务端的接入、鉴权、兼容性和运行环境；对于简单任务，额外包装服务可能不划算。如果全量加载工具说明、逐步回传大量结果，还会遇到前两章讨论的效率问题。</span></p>

<p id="f-doxcn9ijTfVPdqtwRYhDidaQOVf"><span style="font-weight:bold">实际选型</span></p>

<div style="margin-left:25px"><div id="f-doxcnpuIWWLzZ68lccZAHVfCeh6" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">已有工具，但缺少做事方法：优先考虑 Skills。</span><span> 例如统一代码审查步骤、固定报告口径、套用文档模板。</span></div></div><div id="f-doxcn6sW8zK3dAodqOOjImTV1th" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">缺少业务系统接入，或者要让多个 Agent 应用复用同一服务：考虑 MCP。</span><span> 例如统一访问内部订单、CRM、工单系统。它不是唯一接入方式，但能减少各应用重复适配。</span></div></div><div id="f-doxcnItEYquMQXsCnPVOwZgNuUb" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">既需要接入能力，又需要业务流程：Skills + MCP 配合。</span><span> 例如 Skill 规定报表口径和检查步骤，MCP 查询真实订单，脚本负责计算，再按模板输出。</span></div></div></div>

<a id="f-doxcnCIc4rT9Ny77nwAQAxUnT0b"></a>

##### 2026新特性

<p id="f-doxcnuVKorAfu113Gn6mPVTTsCe">本节介绍 MCP 的演进与新特性。</p>

<p id="f-doxcnxnx8Wui60pF75sjKjY2iFb"><span>这里不背版本更新清单，只记三个与 Agent 发展趋势有关的方向：</span></p>

<ol start="1"><li id="f-doxcn049ez6QK3EZXQKkBdq67ag"><span style="font-weight:bold">长任务：从回答一个问题，到持续完成一件事。</span></li></ol>

<p id="f-doxcnHNpgjQiYOv3AxIWVV8trrg"><span>Agent 的工程重点不再只有怎么写 Prompt，还包括工作流／图编排、任务状态和长时间执行。例如做一次深度调研、跑完整个测试流程，都不是一次调用马上就能返回的。</span></p>

<p id="f-doxcnqkascQnR2iY90B6a4rwjJh"><span>MCP 也在完善 Tasks 等任务机制，让服务端能够返回任务标识，供客户端查询状态、获取结果或补充输入，并继续推进事件通知等机制的协同。</span><span style="font-weight:bold">它正在适应“工具在后台持续干活”，而不只是“一问一答”。</span><span> MCP 承接这些任务交互，但不替代 Agent 自身的工作流编排。</span></p>

<ol start="2"><li id="f-doxcnWgiUyEYdBsWvW4MWbsHinb"><span style="font-weight:bold">按需发现：从堆工具、堆上下文，到只提供当前需要的能力。</span></li></ol>

<p id="f-doxcnUJnO0HjWBoPT47DVHiZ1Ie"><span>通用 Agent 接入的服务越来越多，不能把所有工具说明一直塞给模型。上下文管理越来越强调“需要什么，再加载什么”。</span></p>

<p id="f-doxcnfSeNKzXncd4tsIGByCsHHf"><span>MCP 生态已有客户端 Tool Search、渐进式披露等实践，协议路线图也在推进服务器侧渐进发现。</span><span style="font-weight:bold">方向是让 Agent 面对大量工具时，也能按任务找到需要的能力，而不是先读完整个工具目录。</span></p>

<ol start="3"><li id="f-doxcnCY8GdMA1hgSkazKr1DhWzc"><span style="font-weight:bold">身份与权限委托：从人在旁边操作，到 Agent 代表人自主执行。</span></li></ol>

<p id="f-doxcnbdLFNuag0NLuLz09R7JtKg"><span>当 Agent 开始后台运行、操作企业系统，甚至把任务交给子 Agent，就必须回答：它代表谁？能操作什么？交给子 Agent 的权限能不能更小？</span></p>

<p id="f-doxcnDtc5JyL1PrVbMAU2E6smKf"><span>MCP 正在加强授权机制，并推进 Agent 身份、身份联合与权限委托等方向。</span><span style="font-weight:bold">目标是让自主执行有明确的权限边界，而不是把人的全部权限直接交给每一个 Agent。</span></p>

<p id="f-doxcnQFZvxXpczmhuIVfMl8vkTh"><span>介绍 MCP 时，可以用下面这段话收尾：</span></p>

<blockquote id="f-doxcnDdxt68I2fhH095XkdTJXFc"><p id="f-doxcnKtjFpn1jqd99liwDVmkSgf"><span>MCP 也一直在跟着 Agent 的发展演进：任务越来越长，它就完善长任务机制；工具越来越多，它就朝按需发现发展；Agent 越来越自主，它就加强身份和权限委托。所以它不只是一个早期的工具接入协议，也在向长期运行、大规模工具使用和企业落地的需求靠近。</span></p></blockquote>

<p id="f-doxcn2IkpaEGmwkhIGEpoQYZqjc"><span>记住三个关键词就够了：</span><span style="font-weight:bold">长任务、按需发现、身份与权限委托。</span><span> 这些方向中既有现成机制，也有仍在推进的标准化工作，不代表所有产品已经全部支持。</span></p>

<a id="f-doxcnLRqhguyCaUajzXqzwFnHUd"></a>

##### 面试真题

<p id="f-doxcndtBcKDaqKVmW1on22SKLab"><span>以下三个问题，都是选自</span><span><span><a href="/posts/agent-learning-24-interview-review/#f-doxcnodHGJsC0koc1kMf45aMjGd"><span>202608 阿里淘天秋招大模型开发一面</span></a></span></span></p>

<ol start="1"><li id="f-doxcnqM0Xj89PC4eUdEHVae6VKe"><span>谈一谈你对MCP的理解？</span></li></ol>

<p id="f-doxcnBFY5SxulJEisbU2jNQwjLR"><span> （子问题）MCP 是为了解决什么问题提出的？</span></p>

<p id="f-doxcnr70y1ZU4eNaaK7bcuUtMab"><span style="font-weight:bold">💡 思路</span></p>

<p id="f-doxcnAa0fUP6ZIvQp4WhglV8gpf"><span>2026年了，这个问题的介绍，我就希望可以答一点不一样的，答一点符合时代趋势的内容。其实阿里202608 阿里淘天问的这个三个MCP的问题，就是一个很好的介绍MCP技术的一个思路，我们可以从 </span><span style="font-weight:bold">概念 - 局限性 - 替代方案 - 发展趋势（新技术）</span><span>这四个方面递进讲解，结合时代最新趋势回答。</span></p>

<p id="f-doxcnjl0MMhG2lOtNRTmkllusHb"><span style="font-weight:bold">📝 参考回答</span></p>

<p id="f-doxcnthECZQFIkWuXT2zGVfYzYe"><span>【概念】MCP 最初解决的是 AI 应用接入外</span><span style="font-weight:bold">部工具和数据时，接口不统一、适配重复的问题</span><span>。比如多个 Agent 都要接 GitHub、数据库和企业订单系统，没有统一协议时，每个应用往往都要做自己的适配。MCP 把能力描述、工具发现和调用方式标准化，让服务提供方实现一次 MCP Server，不同的兼容应用就能复用。它的核心价值不是让模型突然会用工具，而是降低工具接入和复用的成本。</span></p>

<p id="f-doxcn6uJGikbcEI1OKlABrUoX2f"><span>【局限性】它也有它的局限性：</span><span style="font-weight:bold">统一了接入方式，并不意味着工具使用就一定高效。</span><span>工具多的时候，</span><span style="font-weight:bold">如果把所有工具说明都塞进上下文，会增加 token 开销和选择难度</span><span>；复杂任务如果每一步都让模型调用工具、读取完整结果，也会带来很多等待和中间数据，增加了延迟。</span></p>

<p id="f-doxcnH7X8Gk6YLJuEAubu9qDyfJ"><span>【替代方案】针对这些问题，现在有几类改进或替代方案。</span><span style="font-weight:bold">Tool Search</span><span> 按任务搜索并加载需要的工具定义；</span><span style="font-weight:bold">Code Mode </span><span>让模型写脚本，把多步调用、循环和数据处理交给运行时，减少模型往返；</span><span style="font-weight:bold">Skills 则封装做事方法</span><span>，配合现成 CLI 或脚本，在部分场景下可以不再专门接 MCP，但也可以与 MCP 配合。所以这些方案不代表 MCP 整体被替代，很多改变的是它的使用方式。</span></p>

<p id="f-doxcnyvWS5fFyi6ulmcjsnG04Rf"><span>【发展趋势（新特性）】MCP 本身也在适应 Agent 的发展：</span><span style="font-weight:bold">任务越来越长，就完善长任务机制；工具越来越多，就推进按需发现；Agent 越来越自主，就加强身份和权限委托。这些方向既有现成能力，也有仍在推进的标准化工作，目的都是让 MCP 更适合长期运行、大规模工具使用和企业落地</span><span>。</span></p>

<p id="f-doxcnMF2lwJsa6XooAG8vZtb97e"><span>【总结】所以我理解，MCP 最初解决的是“让不同 AI 应用用统一的方式接入外部能力”，现在关注的则是“接入之后，怎样更高效、更可靠、更可控地使用这些能力”。它并没有因为新技术出现就失去价值，而是在与工具搜索、程序化执行和 Skills 等方案配合，适应越来越复杂的 Agent 任务。</span></p>

<ol start="2"><li id="f-doxcnGhyMox5juwGVTWDobMbNPf"><span>MCP有哪些局限性？</span></li></ol>

<p id="f-doxcnfHvcoN9hSeljJQPkxMU6Bg"><span style="font-weight:bold">💡 思路</span></p>

<p id="f-doxcnfkOA0QbanGyLIr7QCwimSe"><span>这个题思考点，我们就可以从上面，我们定义的各个和MCP类似/配合使用的技术出发来回答，比如： 1.Agent SKILL - 它更轻量， 相应地就对应MCP的流程比较重。 2.Code Mode - 对应模型和MCP Server多次交互，延迟高的问题。 3.Tool Search - 工具太多，污染上下文。</span></p>

<p id="f-doxcnxAXtzWhDjPCpSlSLBKj5Cc"><span style="font-weight:bold">📝 参考回答</span></p>

<p id="f-doxcnSRnRjaVeRLkpHU7NrTN5ob"><span>主要有三个问题：简单场景下接入和维护偏重，复杂任务中多轮交互延迟高，以及工具数量多时上下文开销大。</span></p>

<p id="f-doxcnhvD5XESoJXvGMaF6SskEih"><span style="font-weight:bold">【接入和维护偏重】</span><span>首先，MCP 虽然统一了接入方式，但仍然需要配置和维护服务、处理连接、鉴权与兼容性。如果任务本来通过已有命令或脚本就能完成，再包装一层 MCP 服务，可能增加不必要的工程成本。所以像 Agent Skills，可以封装任务指南和脚本，让模型直接使用已有执行能力。这可以简化部分场景的接入。</span></p>

<p id="f-doxcnYmCjpdgqF4BGh00Y4WCEed"><span style="font-weight:bold">【多轮交互延迟高】</span><span>其次，传统逐步调用方式下，工具每执行一步，都可能要把结果交回模型，再由模型决定下一步。任务链路越长，模型推理和等待的次数就越多，大量中间数据也会反复进入上下文。Cloudflare今年提出，</span><span style="font-weight:bold">Code Mode </span><span>的技术，让模型先生成包含调用和处理逻辑的脚本，再由外部运行时连续执行，只返回必要结果。就很大程度缓解了这个问题。</span></p>

<p id="f-doxcnz6Qwh5WXiHVg8tJ93WTWsh"><span style="font-weight:bold">【上下文开销大】</span><span>最后，通用 Agent 的工具数量和种类往往比较多。如果把所有工具描述和参数说明一次性加载给模型，就会占用大量上下文，增加 token 成本；相似工具之间还可能互相干扰，让模型更难选对。针对这一问题，Tool Search：先根据任务检索相关工具，再加载需要的定义，避免把无关说明全部塞给模型，缓解了MCP的这个局限性。</span></p>

<ol start="3"><li id="f-doxcnO2t4n1njWd3SKkP7GLd1sa"><span>有没有了解过替代传统 MCP 调用形式的方案？ </span></li></ol>

<p id="f-doxcnZJk7DbL1pmMkXTIZyoiMje"><span style="font-weight:bold">💡 思路</span></p>

<p id="f-doxcngg0TCsO07SN4YyEVZogG9c"><span>这个题思考点，还是可以从我们上面讲的</span><span style="font-weight:bold">SKILL</span><span>, </span><span style="font-weight:bold">Code Mode, Tool Search </span><span>来出发讲解。 虽然严格意义上来说，Code Mode 和 Tool Search不是MCP的替代方案，不过这个比较沾边，我估计面试官不会那么</span><span style="font-weight:bold">较真</span><span>。如果说替代方案，目前我想的就是SKILL这个技术，也暂时没想到更多。</span></p>

<p id="f-doxcnlsU3i2Dz0ldsHLACi3IW7c"><span style="font-weight:bold">📝 参考回答</span></p>

<p id="f-doxcn0OXfmBO1WEiiuRd1BRYo3b"><span>有了解过，主要有三类：用代码组织多步调用、按需搜索工具，以及用 Skills 配合现成 CLI 或脚本完成任务。这里我会区分一下：有些替代的是传统的工具调用方式，有些则是在具体场景下不再使用 MCP 接入。</span></p>

<p id="f-doxcnQwNb1jpsCrngBSiTzi2OVg"><span style="font-weight:bold">【程序化调用】</span><span>第一类是让模型生成一段程序，而不是每调用一个工具都重新决定下一步，这种方式通常叫 Code Mode。模型把调用、循环、判断和数据处理写进脚本，由受控运行时执行，只回传必要结果，减少模型往返和中间数据占用。比如 Cloudflare 的一种实现，是通过 MCP 提供 search 和 execute 两个入口，模型先查需要的接口，再提交脚本，由服务侧完成多步操作。底层仍然可以使用 MCP，改变的是调用的组织和执行方式。它适合多步骤、批量处理的任务，但需要做好执行隔离和权限控制。</span></p>

<p id="f-doxcn0bXDYLIEjSrfKFMXg9Wffe"><span style="font-weight:bold">【按需发现工具】</span><span>第二类是工具搜索，也就是 Tool Search。不再把所有工具说明一次性交给模型，而是根据当前任务检索相关工具，再加载需要的定义。这可以在客户端完成，MCP Server 继续提供原来的工具，实际调用方式不变。它适合工具数量多、任务类型不固定的通用 Agent，也可以和 Code Mode 配合：先找到工具，再用代码组织执行。</span></p>

<p id="f-doxcnhhpQthnQhhLvDEqI1OLWrh"><span style="font-weight:bold">【Skills 配合现有工具</span><span>】第三类是把任务指南、脚本和资源封装成 Agent Skills，让 Agent 直接使用已有 CLI、SDK 或脚本。如果执行能力已经具备，就不一定需要再包装一层 MCP 服务，接入和维护可能更轻量。但真正访问外部系统的是这些工具，不是 Skill 本身；如果缺少数据访问通道和授权，仍然需要 MCP 或其他 API 接入。</span></p>

<p id="f-doxcnb6lxCCtWaU9pDu68vOtN3d"><span>【总结】所以我不会把这些方案理解为谁全面淘汰谁，而是按场景选择：流程长、机械步骤多，就考虑程序化调用；工具多，就考虑按需搜索；已有成熟命令和脚本，就用 Skills 组织复用。核心是减少不必要的模型参与和接入成本，同时保留所需的权限与可靠性保障。</span></p>

<a id="f-doxcnJsUVGuACPEEcX46gatvBsf"></a>

##### 讲解视频

<p id="f-doxcnXr8qOIYDdEO11NBdNCb7Uc"><span><span><a href="https://www.bilibili.com/video/BV1aahz6kETD/?spm_id_from=333.1387.homepage.video_card.click"><span>https://www.bilibili.com/video/BV1aahz6kETD/?spm_id_from=333.1387.homepage.video_card.click</span></a></span></span></p>


<a id="section-0052"></a>
## MCP的参考资料

<a id="f-doxcnXhXEbhG6VHnXF4Pqceompe"></a>

<p id="f-doxcn5hQvMtFAMwYPHJj8hc4cue"><span>基础视频：推荐两个，马克的和爬爬虾的，这两视频可以从你0MCP基础到了解知道MCP是啥，可以动手接一接。</span></p>

<div id="f-doxcn38IsMu872BAu0w6dG3jwLg"><div><div><div><div><div><div><div><div><div><a href="https://open.douyin.com/player/video?vid=7493337216203148563&amp;mode=pc">嵌入视频 / 原始播放器</a></div></div></div></div></div></div></div></div></div></div>

<div id="f-doxcnbauExhKKLwe0z7sK4H6MEb"><div><div><div><div><div><div><div><div><div><a href="https://open.douyin.com/player/video?vid=7481284652561337609&amp;mode=pc">嵌入视频 / 原始播放器</a></div></div></div></div></div></div></div></div></div></div>

<p id="f-doxcn6EQNBp0DOv01IWZRMPbSqf"><span>进阶视频：马克老师的进阶视频其实挺好的，特别是讲了抓包，让我们详细了解了中间发生了什么。看完内容对于本节部分</span><span> 其他问题-你在项目中遇到的最难的问题，如何解决的-MCP偶尔连接失败</span><span> 的问题理解有很大帮助。 这几个视频就是当时我0 MCP基础去看的，也没有看其他视频。应该来说你把这几个按顺序看懂了，MCP就理解了，自己再动手做做，看看真题就行了。</span></p>

<div id="f-doxcndcqOqEFp39GsWykcQlAeKb"><div><div><div><div><div><div><div><div><div><a href="https://open.douyin.com/player/video?vid=7495023371781033266&amp;mode=pc">嵌入视频 / 原始播放器</a></div></div></div></div></div></div></div></div></div></div>

<div id="f-doxcnA8WYLPMEXXvR8Dto6FUH3d"><div><div><div><div><div><div><div><div><div><a href="https://open.douyin.com/player/video?vid=7499835360306842919&amp;mode=pc">嵌入视频 / 原始播放器</a></div></div></div></div></div></div></div></div></div></div>


<a id="section-0065"></a>
## A2A

<a id="f-doxcnf6mBWyk3QCO03ZBr1PBcge"></a>

<p id="f-doxcny60gtuf41HruhLlSwh5f6b"><span>（根据最新面试情况，A2A协议的概念，A2A 考的没有MCP那么多，没有那么热，但是还是偶尔会问到。暂时问的不深，我们先记一下概念）</span></p>

<p id="f-doxcnsAkAyqRJhNFNuLL7jAAzRb"><span>A2A（Agent-to-Agent）协议的核心目标是</span><span style="font-weight:bold">让不同智能体之间能够互操作和协作</span><span>，即使它们来自不同厂商、框架或运行环境。下面是一个简洁介绍：</span></p>

<p id="f-doxcn82fy9R2PSjkK1pun2Inst8"><span style="font-weight:bold">A2A 协议的关键特点</span></p>

<ol start="1"><li id="f-doxcnum3ysESwkPhVIwAPfj67Ag"><span style="font-weight:bold">互操作性</span></li></ol>

<div id="f-doxcn9YyxKXIeOLEloK4Mh5OHx0" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>通过标准化的消息格式和通信机制，让不同 Agent 可以发现彼此并交换任务或信息。</span></div></div>

<div id="f-doxcnS3grqHmYVxg1swvbwB7htb" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>常用技术：JSON-RPC、HTTP、SSE 等。</span></div></div>

<ol start="2"><li id="f-doxcn45QG9ZJbDCrjD0qUTeGMig"><span style="font-weight:bold">Agent 卡片（描述元数据）</span></li></ol>

<div id="f-doxcnx1akkgmNStqS6A219ecnVg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>每个 Agent通过“卡片”描述自己的能力、接口、身份和安全策略，方便其他 Agent发现和调用。</span></div></div>

<ol start="3"><li id="f-doxcnsGfZDcoszWJmHnxkqgOLpc"><span style="font-weight:bold">长时协作与异步交互</span></li></ol>

<div id="f-doxcnoGAbBDTnjsfxmA8XJCDRdg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>支持多轮对话、任务委派、进度更新、流式响应，适合复杂场景（如旅行规划、企业流程自动化）。</span></div></div>

<ol start="4"><li id="f-doxcnKeTYtrnfZbB2ZjfVrfuVzh"><span style="font-weight:bold">内部实现不透明</span></li></ol>

<div id="f-doxcnGe7cs8SgzCKaAXTt1XZGj8" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>调用方只知道对方是一个 Agent，不关心它内部用什么模型或工具，保证封装性。</span></div></div>

<p id="f-doxcnBpj6u2S9HZtkgoNv2yNc2f"><span style="font-weight:bold">适用场景</span></p>

<ul><li id="f-doxcnWSbN2LXOsfLqbgvlBGG9Le"><span style="font-weight:bold">跨团队或跨厂商的 Agent 协作</span><span>：例如客服 Agent 与账单 Agent协作处理用户请求。</span></li></ul>

<ul><li id="f-doxcnFMK3PV3BIHZHWmp3NVn2Sg"><span style="font-weight:bold">复杂任务编排</span><span>：多个专长 Agent分工完成一个大任务（如行程规划、供应链优化）。</span></li></ul>

<ul><li id="f-doxcnmzx4cg5e3voZcPRypGwdbc"><span style="font-weight:bold">生态互通</span><span>：构建开放的 Agent 网络，而不是单一厂商闭环。</span></li></ul>


<a id="section-1489"></a>
## AI Agent 工具与外部集成

<a id="t-block-22016"></a>

<p id="t-fIbJ2jUZgWnglXzgX3XSVB"><span>本章节介绍 Agent 如何与外部世界交互。</span></p>

<p id="t-TbLr6S9Xb9hjt6Q7akYhKo"><span>工具调用能力是 Agent 与外部环境连接的关键。</span></p>

<p id="t-BxOYV4l8LKKlvmHJFIHljV"><span>通过集成各种工具，Agent 能够执行代码、访问 API、操作文件系统等。</span></p>


<a id="section-1490"></a>
## Computer Use

<a id="t-wPhKeZG1W0DXdrSxdlwsVK"></a>

<p id="t-t0ffvsJTcbhNgUfXdwfSsx"><span>Computer Use 让 Agent 能够像人类一样操作计算机界面。</span></p>

<p id="t-xNrFzL8yvGhOJo9D3iFvUw"><span>包括浏览器、桌面应用等图形界面。</span></p>

<p id="t-VF7LUru8vI0eSsYAYuy4mJ"><span>这是实现通用人工智能（AGI）的重要一步。</span></p>


<a id="section-1491"></a>
## 核心能力

<a id="t-liO15siYRMuoTwKvwiBcix"></a>

<p id="t-tm9p3zQyaeOuvZuT7wvqUW"><span style="font-weight:bold">屏幕截图解析</span><span>：理解屏幕上的内容，识别可交互元素。</span></p>

<p id="t-oocNjTaQmf2gJN5mmTvxB8"><span style="font-weight:bold">GUI 元素识别</span><span>：识别按钮、输入框、菜单等界面元素。</span></p>

<p id="t-P60mtUK9JkZoFcEw6qoDVT"><span style="font-weight:bold">鼠标/键盘控制</span><span>：模拟人类操作，执行点击、输入等动作。</span></p>

<p id="t-5OAipznZUfuNiK7e6Vt0TN"><span style="font-weight:bold">浏览器自动化</span><span>：网页导航、表单填写、搜索等。</span></p>


<a id="section-1492"></a>
## 工作原理

<a id="t-RXwy6gZhtfGbJ0kuSAmc97"></a>

<p id="t-fFUazB1cLhW5ORquzVL8AH"><span>Computer Use 的工作流程可以概括为：观察、理解、决策、执行。</span></p>

<p id="t-NB4em4y82GBigYl0Bz516c"><span>第一步，屏幕截图。捕获当前屏幕或窗口的内容。</span></p>

<p id="t-HPkLuOQ7qzexcv97aV9yPp"><span>第二步，视觉分析。使用视觉模型分析截图，识别界面元素和状态。</span></p>

<p id="t-xwtuYtShle3P2UlnSOjri5"><span>第三步，决策。基于任务目标，决定下一步操作。</span></p>

<p id="t-sDasStqH9B09Su0sDhzs9C"><span>第四步，执行。执行鼠标点击、键盘输入等动作。</span></p>

<p id="t-LIKjj2l2jwfoahmaDESR6l"><span>循环执行直到任务完成。</span></p>


<a id="section-1494"></a>
## Computer Use Agent 基本实现

<a id="t-C3qU78oTakI7iR0lWLggP1"></a>

<pre id="t-6VVtrlhNAUM1VY31SjKGHf"><code>class ComputerUseAgent:
 """
    Computer Use Agent 实现
    能够像人类一样操作计算机界面
    """

 def __init__(self, vision_model, action_executor, planner):
 # 视觉模型：分析屏幕截图
        self.vision_model = vision_model
 # 动作执行器：执行鼠标键盘操作
        self.action_executor = action_executor
 # 规划器：决定下一步行动
        self.planner = planner
 # 最大执行步骤
        self.max_steps = 100

 def observe(self, screenshot):
 """
        解析屏幕截图，识别可交互元素
        :param screenshot: 屏幕截图图像
        :return: 界面元素列表
        """
 # 使用视觉模型分析截图
        analysis = self.vision_model.analyze(screenshot)

 # 返回识别的界面元素
 # 每个元素包含：类型、位置、内容、可交互性
 return analysis.elements

 def act(self, action):
 """
        执行动作
        :param action: 动作描述，如 {"type": "click", "x": 100, "y": 200}
        """
 return self.action_executor.execute(action)

 def run(self, task):
 """
        运行任务循环
        :param task: 任务描述
        :return: 任务结果
        """
 # 初始化任务状态
        self.planner.set_task(task)

 for step in range(self.max_steps):
 # 第一步：截取当前屏幕
            screenshot = self.get_screen()

 # 第二步：观察 - 识别界面元素
            elements = self.observe(screenshot)

 # 第三步：决策 - 决定下一步行动
            action = self.planner.decide_action(elements)

 # 检查是否任务完成
 if action.is_final:
 return action.result

 # 第四步：执行动作
            self.act(action)

 # 可选：等待界面更新
            self.wait_for_update()

 return "达到最大步骤限制"


class VisionModel:
 """视觉模型：分析屏幕截图"""

 def analyze(self, screenshot):
 """
        分析屏幕截图
        返回界面元素列表
        """
 # 使用多模态模型分析
        prompt = """
分析这个屏幕截图，识别所有可交互的界面元素。
包括：按钮、输入框、链接、菜单等。

对于每个元素，请提供：
1. 类型（button、input、link 等）
2. 位置（边界框坐标）
3. 内容（按钮文字、输入框占位符等）
4. 可交互性（是否可见、是否启用）
"""
        result = self.vision_model.analyze_image(screenshot, prompt)
 return ScreenAnalysisResult(elements=result.elements)


class ActionExecutor:
 """动作执行器：执行鼠标键盘操作"""

 def execute(self, action):
 """
        执行动作
        :param action: 动作对象
        """
 if action.type == "click":
            self.mouse.click(action.x, action.y)
 elif action.type == "type":
            self.keyboard.type_text(action.text)
 elif action.type == "scroll":
            self.mouse.scroll(action.direction, action.amount)
 elif action.type == "press":
            self.keyboard.press_key(action.key)

 return ActionResult(success=True)


class Planner:
 """规划器：决定下一步行动"""

 def __init__(self, llm):
        self.llm = llm
        self.task = None
        self.history = []

 def set_task(self, task):
 """设置当前任务"""
        self.task = task
        self.history = []

 def decide_action(self, elements):
 """
        基于当前界面状态决定下一步行动
        """
        prompt = f"""
当前任务：{self.task}

已执行的历史动作：
{self.history}

当前界面上的可交互元素：
{elements}

请决定下一步动作。
如果任务已完成，返回 is_final=True。
否则，返回要执行的动作（type、坐标、参数等）。
"""
        response = self.llm.generate(prompt)
 return Action.parse(response)</code></pre>


<a id="section-1495"></a>
## 应用场景

<a id="t-GHFPuTRLNEkkShLNQvLWvq"></a>

<p id="t-nym8q75eWZYsEDIiiRu9ph"><span>Computer Use 特别适合以下场景：</span></p>

<p id="t-u1mhNTYR5wkpj3742iXr91"><span>网页自动化：如自动填写表单、爬取数据、执行网页操作。</span></p>

<p id="t-uvtIVNHbYEtsoVPp1gVMfh"><span>桌面应用操作：如打开文件、编辑文档、操作软件。</span></p>

<p id="t-T2GA7X5lngGuN5o4Pmhbei"><span>测试自动化：如自动执行 UI 测试、回归测试。</span></p>

<blockquote id="t-F9FPezqDsmZ5fs2JEEfXlF"><blockquote id="t-Prljp4zzGnEoA4rAx2CqjJ"><span style="font-style:italic">注意：Computer Use 目前仍在发展中，存在执行速度慢、偶尔出错等问题。对于有明确 API 的场景，直接调用 API 通常比 Computer Use 更高效。</span></blockquote></blockquote>


<a id="section-1496"></a>
## MCP 协议详解

<a id="t-CKx8Kaoxdii8cjG3X6jjQ1"></a>

<p id="t-JVpyMP8vEELS551sALu7Mq"><span>MCP（Model Context Protocol）是一种开放标准协议。</span></p>

<p id="t-UP1HNf6VSjj6nUU1ruF9xV"><span>它使得 AI 模型能够安全地与外部工具和数据源连接。</span></p>

<p id="t-TBij3JSWb5Dk3iqIjUBLt4"><span>MCP 的设计目标是成为 AI 领域的 "USB 接口"。</span></p>


<a id="section-1497"></a>
## 核心设计理念

<a id="t-swTMH3Mf8OHkbpM2DeRDRb"></a>

<p id="t-wK2sejzXhW3efuBatheDma"><span style="font-weight:bold">标准化</span><span>：统一的协议格式，不同的 Agent 和工具可以互操作。</span></p>

<p id="t-XNw7IBfnLcF1eIxV40tR48"><span style="font-weight:bold">安全性</span><span>：明确的权限控制，Agent 只能访问授权的资源。</span></p>

<p id="t-bvnNpCBTFswwooRnRAaonr"><span style="font-weight:bold">可扩展性</span><span>：易于添加新的工具和数据源。</span></p>


<a id="section-1498"></a>
## 架构组件

<a id="t-pjn8i8DfVJLsYOvO8zQY5f"></a>

<p id="t-9g6V3Fv7buGRguSpk89hip"><span style="font-weight:bold">MCP Host</span><span>：运行 AI 应用的宿主环境，如 Claude Desktop、AI 编码助手等。</span></p>

<p id="t-an4G8E2W8Dd0GAnaSfGprv"><span style="font-weight:bold">MCP Client</span><span>：与 MCP Server 保持 1:1 连接的客户端。</span></p>

<p id="t-zvuzbbm1c0LzbxnFmSXNOg"><span style="font-weight:bold">MCP Server</span><span>：提供工具和资源的服务端程序。</span></p>


<a id="section-1499"></a>
## 通信流程

<a id="t-QTnswSqqjEsBp1ulEHjKA8"></a>

<p id="t-ec6DyPujYEnmfapsnNyWL6"><span>第一步，连接建立。Client 与 Server 建立连接，交换能力信息。</span></p>

<p id="t-Rd8ngx7awVuLi5sPjiyr66"><span>第二步，工具发现。Client 查询 Server 提供哪些工具和资源。</span></p>

<p id="t-kGVMVR6ulDYsJ2SeHkEhO4"><span>第三步，工具调用。Client 发送工具调用请求，Server 执行并返回结果。</span></p>

<p id="t-pVeTMlsEDs1vfYr76xuevj"><span>第四步，资源访问。Client 可以读写 Server 提供的资源。</span></p>


<a id="section-1501"></a>
## MCP Server 实现

<a id="t-cX5GEUHeK9T9BMxPUGiEYU"></a>

<pre id="t-gGUh337UDZbjX5v7waqwvu"><code>from mcp.server import Server
from mcp.types import Tool, Resource
import asyncio

# 创建 MCP Server 实例
app = Server("filesystem")

# 定义文件系统工具
@app.list_tools()
async def list_tools():
 """列出所有可用工具"""
 return [
        Tool(
            name="read_file",
            description="读取文件内容",
            inputSchema={
 "type": "object",
 "properties": {
 "path": {
 "type": "string",
 "description": "文件路径"
 },
 "encoding": {
 "type": "string",
 "description": "文件编码，默认为 utf-8",
 "default": "utf-8"
 }
 },
 "required": ["path"]
 }
 ),
        Tool(
            name="write_file",
            description="写入文件内容",
            inputSchema={
 "type": "object",
 "properties": {
 "path": {
 "type": "string",
 "description": "文件路径"
 },
 "content": {
 "type": "string",
 "description": "文件内容"
 }
 },
 "required": ["path", "content"]
 }
 ),
        Tool(
            name="list_directory",
            description="列出目录内容",
            inputSchema={
 "type": "object",
 "properties": {
 "path": {
 "type": "string",
 "description": "目录路径"
 }
 }
 }
 )
 ]

@app.call_tool()
async def call_tool(name, arguments):
 """执行工具调用"""
 if name == "read_file":
 return await read_file(arguments["path"], arguments.get("encoding", "utf-8"))
 elif name == "write_file":
 return await write_file(arguments["path"], arguments["content"])
 elif name == "list_directory":
 return await list_directory(arguments["path"])
 else:
 raise ValueError(f"Unknown tool: {name}")

async def read_file(path, encoding):
 """读取文件"""
 with open(path, "r", encoding=encoding) as f:
        content = f.read()
 return [{"type": "text", "text": content}]

async def write_file(path, content):
 """写入文件"""
 with open(path, "w", encoding="utf-8") as f:
        f.write(content)
 return [{"type": "text", "text": "File written successfully"}]

async def list_directory(path):
 """列出目录"""
 import os
    entries = os.listdir(path)
 return [{"type": "text", "text": "\n".join(entries)}]

# 运行服务器
if __name__ == "__main__":
 import mcp.server.stdio
    asyncio.run(mcp.server.stdio.serve(app))</code></pre>


<a id="section-1502"></a>
## API 集成模式

<a id="t-KTyTCC4GWsHtO2BOUIWVLd"></a>

<p id="t-v7SGX83exPCV6q8WQnBmgF"><span>Agent 集成外部 API 有三种常见方式。</span></p>

<p id="t-hPm9BUQVOVlO7joUJeEE6A"><span>REST API 是最常用的 Web API 风格。</span></p>

<p id="t-oqkyTXzxUnzkhbmxnrsk4E"><span>GraphQL 提供更灵活的数据查询能力。</span></p>

<p id="t-y1WETAHQegpgHu86tsyhY2"><span>gRPC 适合高性能场景的远程过程调用。</span></p>


<a id="section-1503"></a>
## REST API 集成

<a id="t-XntkLFniWeTsI7tFHsSib0"></a>

<p id="t-IAoS0EsV4d0cg6WKppEymy"><span>REST（Representational State Transfer）是一种 Web API 设计风格。</span></p>

<p id="t-ZCeZBW6D7PEoY6xn9B9GcE"><span>使用 HTTP 方法（GET、POST、PUT、DELETE）进行操作。</span></p>


<a id="section-1504"></a>
## REST API 客户端实现

<a id="t-Q69zN3rZPeN6p7HuMlZ2PL"></a>

<pre id="t-OA6kpmFzZETqv52Xtvt5hO"><code>import requests
from typing import Dict, Any, Optional

class RESTAPIClient:
 """
    REST API 客户端
    封装 HTTP 请求，提供简洁的调用接口
    """

 def __init__(self, base_url: str, headers: Optional[Dict] = None):
 """
        初始化 API 客户端
        :param base_url: API 基础 URL
        :param headers: 默认请求头
        """
        self.base_url = base_url.rstrip("/")
        self.session = requests.Session()

 # 设置默认请求头
        default_headers = {
 "Content-Type": "application/json",
 "Accept": "application/json"
 }
 if headers:
            default_headers.update(headers)
        self.session.headers.update(default_headers)

 def call(
        self,
        method: str,
        endpoint: str,
        params: Optional[Dict] = None,
        data: Optional[Dict] = None,
 **kwargs
 ) -&gt; Dict[Any, Any]:
 """
        发送 API 请求
        :param method: HTTP 方法（GET、POST、PUT、DELETE）
        :param endpoint: API 端点
        :param params: URL 查询参数
        :param data: 请求体数据
        :return: 响应数据
        """
        url = f"{self.base_url}/{endpoint.lstrip('/')}"

        response = self.session.request(
            method=method.upper(),
            url=url,
            params=params,
            json=data,
 **kwargs
 )

 # 检查 HTTP 状态码
        response.raise_for_status()

 # 解析响应
 if response.content:
 return response.json()
 return {}

 def get(self, endpoint: str, params: Optional[Dict] = None):
 """GET 请求"""
 return self.call("GET", endpoint, params=params)

 def post(self, endpoint: str, data: Dict):
 """POST 请求"""
 return self.call("POST", endpoint, data=data)

 def put(self, endpoint: str, data: Dict):
 """PUT 请求"""
 return self.call("PUT", endpoint, data=data)

 def delete(self, endpoint: str, params: Optional[Dict] = None):
 """DELETE 请求"""
 return self.call("DELETE", endpoint, params=params)


class APIAgent:
 """
    API Agent
    通过自然语言调用外部 API
    """

 def __init__(self, api_client: RESTAPIClient):
        self.api_client = api_client
        self.tool_descriptions = self.define_tools()

 def define_tools(self):
 """
        定义 Agent 可用的工具
        返回工具描述，供 LLM 理解如何调用
        """
 return [
 {
 "name": "get_weather",
 "description": "获取指定城市的天气信息",
 "parameters": {
 "type": "object",
 "properties": {
 "city": {
 "type": "string",
 "description": "城市名称，如 Beijing、Shanghai"
 }
 },
 "required": ["city"]
 }
 },
 {
 "name": "get_forecast",
 "description": "获取指定城市的天气预报",
 "parameters": {
 "type": "object",
 "properties": {
 "city": {
 "type": "string",
 "description": "城市名称"
 },
 "days": {
 "type": "integer",
 "description": "预报天数，默认为 3",
 "default": 3
 }
 },
 "required": ["city"]
 }
 }
 ]

 def execute_tool(self, tool_name: str, arguments: Dict):
 """
        执行工具调用
        :param tool_name: 工具名称
        :param arguments: 工具参数
        :return: 执行结果
        """
 if tool_name == "get_weather":
 return self.api_client.get(f"/weather/{arguments['city']}")
 elif tool_name == "get_forecast":
            params = {"days": arguments.get("days", 3)}
 return self.api_client.get(f"/forecast/{arguments['city']}", params=params)
 else:
 raise ValueError(f"Unknown tool: {tool_name}")</code></pre>


<a id="section-1505"></a>
## API 集成最佳实践

<a id="t-qjcnijZMFA0EDlsj42LvwS"></a>

<p id="t-dFG010kaFvdhPGNjTVKjZD"><span style="font-weight:bold">错误处理</span><span>：优雅处理网络错误、超时、服务不可用等情况。</span></p>

<p id="t-PBcElM0ukhUcviELZxBHPc"><span style="font-weight:bold">重试机制</span><span>：对于临时性错误，实现指数退避重试。</span></p>

<p id="t-Mp5SDAtuJhGxUmW41rkefa"><span style="font-weight:bold">限流控制</span><span>：遵守 API 的速率限制，避免被封禁。</span></p>

<p id="t-NFmfMFNZqE2JNpHo22EJAD"><span style="font-weight:bold">缓存策略</span><span>：对频繁请求的数据实施缓存，减少 API 调用。</span></p>

<p id="t-Zyq4b5Flnk2Q43SvBUgi3d"><span style="font-weight:bold">安全考虑</span><span>：敏感信息如 API Key 不要硬编码，使用环境变量管理。</span></p>


<a id="section-1506"></a>
## 章节小结

<a id="t-ZwHoVlnwCJg4wiPRUPFP4Z"></a>

<p id="t-cec4rMeS2I0L5goWzqyZp5"><span>本章节介绍了 Agent 与外部世界交互的核心技术。</span></p>

<p id="t-qIeAaKcERWMdEAOF1ql4dd"><span style="font-weight:bold">Computer Use</span><span> 让 Agent 能够操作 GUI 界面，适用于需要与图形应用交互的场景。</span></p>

<p id="t-NkxB7C2aAJ7LARUdCRkwvJ"><span style="font-weight:bold">MCP 协议</span><span> 提供了标准化的工具接入方式，是 Agent 时代的 "USB 接口"。</span></p>

<p id="t-latHeNQrF8m5HOUyDmAf4y"><span style="font-weight:bold">API 集成</span><span> 是最常见的外部系统集成方式，包括 REST、GraphQL、gRPC 等。</span></p>

<p id="t-vt99x5uRH5HD3q38vDbJBb"><span>选择合适的集成方式需要根据具体场景。</span></p>

<p id="t-fxgeCW8htxhjYdTOGY8VNg"><span>对于图形界面操作，Computer Use 是通用解决方案。</span></p>

<p id="t-QkZ6kGsNvdUDhlbUDJJUc1"><span>对于工具标准化接入，MCP 是未来的发展方向。</span></p>

<p id="t-THJAsuexDglJbOS89tTNTD"><span>对于 Web API 集成，REST API 仍是最主流的选择。</span></p>

