---
title: "第 05 章 · 推理、规划与执行"
date: "2026-10-22"
draft: false
author: "学习资料整理"
description: "ReAct、Planning、反思、任务分解、循环与终止"
tags: ["Agent", "学习路线"]
categories: ["AI 工程"]
prerequisites: ["agent-learning-04-tool-calling"]
verification: {"status": "not-run", "scope": "本次仅整理资料；示例代码与原文技术结论未复跑。"}
---

ReAct、Planning、反思、任务分解、循环与终止

[学习路线](/posts/agent-learning-route/) · [上一章](/posts/agent-learning-04-tool-calling/) · [下一章](/posts/agent-learning-06-mcp-integrations/)

本章按知识小节编排。项目内容作为学习案例阅读，示例代码与原文技术结论未在本次整理中执行验证。

## 本章目录

- [ReAct](#section-0039)
- [ReAct 是什么](#section-0040)
- [ReAct 如何实现](#section-0041)
- [面试真题](#section-0042)
- [推理与规划](#section-0506)
- [逐步推理能力](#section-0508)
- [实例：Few-shot CoT 提示词设计](#section-0509)
- [推理 + 行动循环](#section-0511)
- [Plan-and-Execute（规划先行执行模式）](#section-0512)
- [树状多路径探索](#section-0514)
- [复杂任务拆解与搜索](#section-0516)
- [Reflexion：自我反思与纠错](#section-0517)
- [实例：Reflexion 的反思提示词设计](#section-0518)
- [任务分解策略与工程化实践](#section-0519)
- [框架对比总结](#section-0520)
- [Python 实现推理与规划](#section-1401)
- [ReAct 框架](#section-1402)
- [工作原理](#section-1403)
- [代码实现](#section-1404)
- [ReAct Agent 基本实现](#section-1405)
- [典型应用场景](#section-1406)
- [思维链（Chain of Thought, CoT）](#section-1407)
- [为什么需要思维链](#section-1408)
- [Zero-shot CoT](#section-1409)
- [Zero-shot CoT 示例](#section-1410)
- [Few-shot CoT](#section-1411)
- [Few-shot CoT 示例](#section-1412)
- [思维链的优势](#section-1413)
- [Tree of Thoughts（ToT）](#section-1414)
- [与思维链的区别](#section-1415)
- [ToT Agent 基本实现](#section-1417)
- [应用场景](#section-1418)
- [任务规划与 MCTS](#section-1419)
- [核心思想](#section-1420)
- [MCTS 的四个步骤](#section-1421)
- [MCTS 规划器实现](#section-1423)
- [Reflexion（自我反思）](#section-1424)
- [核心思想](#section-1425)
- [Reflexion Agent 实现](#section-1427)
- [应用场景](#section-1428)
- [任务分解策略](#section-1429)
- [递归任务分解](#section-1430)
- [递归任务分解](#section-1431)
- [平行任务分解](#section-1432)
- [层次任务分解](#section-1433)
- [Plan-and-Execute 模式](#section-1434)
- [与 ReAct 的区别](#section-1435)
- [Plan-and-Execute Agent 实现](#section-1437)
- [章节小结](#section-1438)
- [AI Workflow（AI 工作流）](#section-1860)
- [一个直观的类比](#section-1861)
- [从问答到做事的进化](#section-1862)
- [单次调用的局限](#section-1864)
- [AI Workflow 解决的五大核心问题](#section-1865)
- [核心组成要素](#section-1866)
- [各要素详解](#section-1867)
- [六大常见 Workflow 模式](#section-1868)
- [模式一：顺序链（Sequential Chain）](#section-1869)
- [模式二：条件路由（Conditional Routing）](#section-1870)
- [模式三：并行执行（Parallel Execution）](#section-1871)
- [模式四：ReAct 循环（Reason + Act）](#section-1872)
- [模式五：Plan &amp; Execute（规划后执行）](#section-1873)
- [模式六：多智能体协作（Multi-Agent）](#section-1874)
- [主流框架与工具对比](#section-1875)
- [框架选型决策树](#section-1876)
- [快速上手：Python 代码示例](#section-1877)
- [LangChain 顺序链](#section-1878)
- [实例](#section-1879)
- [工具调用 Agent（ReAct 模式）](#section-1880)
- [实例](#section-1881)
- [LangGraph 有状态 Workflow](#section-1882)
- [实例](#section-1883)
- [CrewAI 多 Agent 协作](#section-1884)
- [实例](#section-1885)
- [Human-in-the-Loop（人工审核节点）](#section-1886)
- [实例](#section-1887)
- [Prompt 工程：Workflow 中的关键技巧](#section-1888)
- [实例](#section-1889)
- [实例](#section-1890)
- [实例](#section-1891)
- [实例](#section-1893)
- [实例](#section-1895)
- [典型应用场景](#section-1896)
- [常见陷阱与解决方案](#section-1898)
- [核心知识点回顾](#section-1900)
- [推荐学习路径](#section-1901)
- [参考资源](#section-1902)

<a id="section-0039"></a>
## ReAct

<a id="f-doxcnVmoQvpg9MEjofMr2v628Af"></a>

<p id="f-doxcnGvZEAo1rDBfFwn22dFb4yd"><span>这是一个很简单的知识点，确实一个在各种框架里面都广泛运用的技术。这里讲的不多，但是都是精髓，配一个讲解视频，可以认为你应该可以理解这个概念。最常见的面试真题就是：ReAct如何实现的？我也附在了后面。</span></p>


<a id="section-0040"></a>
## ReAct 是什么

<a id="f-doxcn99E6P1Kqq4uXnwDEWUWvrc"></a>

<p id="f-doxcn8ZoVdTVIi6KNrfC8kSZe6c"><span>ReAct 是 </span><span style="font-weight:bold">Reasoning（推理）+ Acting（行动）</span><span> 的结合。它让 Agent 在完成任务时交替进行推理和行动，并根据行动结果继续判断下一步。</span></p>

<p id="f-doxcnr3YICWLbfu3t9TpJYf69mc"><span>其核心过程是：</span></p>

<pre id="f-doxcn8YD7wnmGec4Ve80j0fvC1g"><code>Reason → Act → Observation → Reason → …… → 完成任务</code></pre>

<p id="f-doxcnnsSAD9sInsM8jM905avYUg"><span style="font-weight:bold">关键概念</span></p>

<ul><li id="f-doxcnu1XOU9zInPM9Lp6ue9FDAb"><span style="font-weight:bold">Reason（推理）</span><span>：模型分析当前任务和已有信息，</span><span style="font-weight:bold">制定计划</span><span>，或者根据上一次行动结果进行</span><span style="font-weight:bold">反思</span><span>，判断下一步应该做什么。</span></li></ul>

<ul><li id="f-doxcn6LzEFYNTlmkKzAQZMREzse"><span style="font-weight:bold">Act（行动）</span><span>：模型决定调用某个工具，并提供调用工具所需的参数。</span></li></ul>

<ul><li id="f-doxcnPuqXXYsHSgIiP82s8CVVNh"><span style="font-weight:bold">Observation（观察）</span><span>：外部框架执行工具后返回的真实结果。模型根据这个结果继续推理和行动。</span></li></ul>


<a id="section-0041"></a>
## ReAct 如何实现

<a id="f-doxcnk3n112UUndxgLg9ZxoCrNc"></a>

<p id="f-doxcn8LqYRVvQqAbtxJPWHJbQve"><span>几乎主流的框架，比如DeepSeekHarness，ClaudeCode，Openclaw，他们的Agent内核都是用的ReAct。面试最常考的是它是如何实现的。先看看这个图，理解它的流程：</span></p>

<div id="f-doxcnZJkeJm3jey0cCcjrGgrdOg"><img alt="" decoding="async" height="1280" loading="lazy" src="/images/agent-learning/41df49343a2a1082f816a8f8.png" width="853"/></div>

<p id="f-doxcnRleMdMwoHXnRzHoGUSQH6d"><span>核心思路：</span></p>

<ol start="1"><li id="f-doxcnWFIVaL2BqJHLxbwkUOefXg"><span>提示词告诉AI，让他思考下一步做什么，任务做完没有，要不要调用工具。</span></li></ol>

<ol start="2"><li id="f-doxcndCqv8gFuwxgyrw7Hsi8AVd"><span>外部写一个Harness循环，处理模型吐出的结果。如果模型认为没做完，要调用工具，那么就调用工具（这对应ReAct概念里</span><span style="font-weight:bold">Act</span><span>)。</span><span style="font-weight:bold">如果模型认为做完了，流程结束。</span></li></ol>

<ol start="3"><li id="f-doxcn8WiXppu4oyrDNzZpXqsNwb"><span>外部调用工具后，将结果返回给模型（这对应ReAct概念的</span><span style="font-weight:bold">Observation），</span><span>模型继续思考：下一步做什么，任务做完了吗(对应ReAct里面的</span><span style="font-weight:bold">Reasoning</span><span>)，进入循环。</span></li></ol>

<pre id="f-doxcnQEZkIhWkAkWWOfTfo8cqad"><code>while (任务未结束) {

    模型回答 = 调用模型(
        用户问题 + 对话历史 + 工具列表
    )

    if (模型要求调用工具) {
        工具结果 = 框架执行工具()
        把工具结果加入对话历史
        continue
    }

    // 没有工具调用，普通文本就是最终答案
    结束流程
}</code></pre>


<a id="section-0042"></a>
## 面试真题

<a id="f-doxcnNvfOhJJwcICi31TqVviBwe"></a>

<p id="f-doxcn9FRpKp0HIjmSReNVbz7Nmf"><span>（选自</span><span><span><a href="/posts/agent-learning-24-interview-review/#f-doxcnUt6IlDFXzVzU9EgkMeOyxf"><span>202607 宇树科技Agent开发一面</span></a></span></span><span>）</span></p>

<a id="f-doxcnFat0PIc22xXuAJEy9Q3jfc"></a>

##### ReAct 的核心思想是什么？他是如何实现的？

<p id="f-doxcnl6k8dF2nRmkoe6PruiSMqf"><span style="font-weight:bold">💡思路：</span><span> 这个问题问得很具体了，如果面试官直接问，</span><span style="font-weight:bold">你介绍一下什么是React</span><span>，也可以按这个提问的思路介绍（是什么，如何实现的。） </span></p>

<p id="f-doxcnPLoIO6hYSVeH005m7pbigI"><span>答题思路是先把ReAct的概念讲清楚就好了，Reasoning 和 Act，分别是什么，概念讲清楚。（答案中第一段）</span></p>

<p id="f-doxcnsu4psflqHav9w5YeBCk4qe"><span> 然后这里补了一个工程上的实现（答案中第二段），以开源框架DSH为例，具体举例，引经据典，把话题引到你熟悉的框架上。当然你也可以替换成你熟悉的其他框架。</span></p>

<p id="f-doxcnDsI7TQryG6nYDQVgMeHpdf"><span style="font-weight:bold">📝答案：</span></p>

<p id="f-doxcnKmdcqui7DqUkPR9WxuL3Pc"><span>ReAct 是 Reasoning，也就是推理，和 Acting，也就是行动的结合。它的核心思想是让 Agent </span><span style="font-weight:bold">把推理和行动交替进行</span><span>：模型先判断下一步应该做什么，再通过工具采取行动，然后根据行动结果继续判断，而不是只依靠模型内部知识一次性生成答案。</span></p>

<p id="f-doxcnkVg7DZQZLsYvODDGTOA90b"><span style="font-weight:bold">这里的 Reason 主要包含两部分</span><span>：一部分是</span><span style="font-weight:bold">规划</span><span>，也就是分析当前任务、判断下一步应该做什么；另一部分是</span><span style="font-weight:bold">反思</span><span>，也就是拿到工具执行结果以后，判断结果是否有效、任务是否已经完成，以及是否需要调整原来的计划。</span></p>

<p id="f-doxcnx6WxWTx8vvEF1UKMQqjaWf"><span style="font-weight:bold">Act 是采取行动</span><span>。在现在的 Agent 系统中，通常表现为模型选择一个工具，并生成对应的调用参数。比如模型发现缺少实时信息，就可以调用搜索工具；需要验证代码，就可以调用代码执行工具。工具执行后，外部框架会把真实结果返回给模型。</span></p>

<p id="f-doxcntI732anljM9T5iVw3omVxe"><span style="font-weight:bold">在工程实现上</span><span>，外部框架会把用户问题、历史消息和可用工具交给模型。模型如果认为需要调用工具，就返回</span><span style="font-weight:bold">结构化的 tool-call</span><span>；框架负责执行工具，并把执行结果加入对话历史，再次调用模型。如果模型认为信息已经足够，就不再调用工具，而是直接返回普通文本答案，这时框架结束流程。</span></p>

<p id="f-doxcnVpotGNhYg31dstI5XXXkUb"><span>比如 DSH 的 </span><span style="font-weight:bold">ReactLoopAgent</span><span> 就是这样实现的：模型负责推理、选择工具以及判断任务是否完成，外部框架负责执行工具、回传结果和维持整个循环。这样 Agent 就可以在执行过程中根据真实结果不断调整，而不是从一开始就固定一套计划执行到底。</span></p>

<a id="f-doxcntstDXeYcfMztwhML9MgAqf"></a>

##### ReAct 循环中，如何检测并跳出无效的“思考—行动”循环?

<p id="f-doxcncnE3Pc60RJ9HspldBtD6nf"><span>（选自</span><span><span><span>202607 宇树科技Agent开发二面</span></span></span><span>）</span></p>

<p id="f-doxcnqhiUbs8hYJqM6VWKXfFu6g"><span>💡思路</span></p>

<p id="f-doxcnVPMr9h6VzBK5mjmQNKeiWh"><span>这里是参考《AI Engineering》中关于执行后评估、失败反思与重新规划的讨论，以及 DeepSeek Harness（DSH）和 OpenAI Codex 的开源实现，可以发现它们在应对重复执行和失败恢复上的思路相近。综合起来，可以按 </span><span style="font-weight:bold">检测、纠偏、停止兜底</span><span> 三层回答。但它们的实际实现和覆盖范围不同，以下是综合整理的设计思路，不代表两个框架都完整实现了所有措施。</span></p>

<p id="f-doxcnPLnHzOT726BEz9mnT7TIIe"><span>📝 </span><span style="font-weight:bold">答案：</span></p>

<p id="f-doxcnypHdAsW5E2w9HxqUZlGQOh"><span>我会分成三层处理： </span><span style="font-weight:bold">检测发现问题，纠偏尝试解决，停止控制损失。</span></p>

<p id="f-doxcn0CV3nW2EF5xbGU4pUgcokb"><span style="font-weight:bold">第一层：检测——判断是否陷入无效循环。</span></p>

<p id="f-doxcnGd8rg98TCtRuA4QM1yiPXd"><span>ReAct 不断进行“思考—行动—观察”，但持续执行不代表任务持续推进。因此，需要记录每一步的工具调用、参数、Observation 和任务状态，关注两类信号：</span></p>

<div style="margin-left:25px"><div id="f-doxcnAk41xpSvU3qPgmOneOKOmh" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">重复行为</span><span>：相同工具和参数连续出现，或者在几个动作之间周期性往返。</span></div></div><div id="f-doxcna4oEIBi2CP35ijqNUGQP8s" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">没有有效进展</span><span>：连续多步没有获得有效的新信息、没有完成子目标，或者始终遇到同一个未解决的错误。</span></div></div></div>

<p id="f-doxcnn1ogMuuLsWF3WLUsT4wAed"><span>检测可以由 Harness 的程序逻辑完成，也可以由 LLM 辅助判断，或者两者结合。规则明确的重复调用、错误次数由程序检测；有明确任务指标时，可以检查测试通过数、子目标完成情况；对于“新信息是否有价值”“是否仍被同一个问题阻塞”等语义问题，可以由 Harness 收集执行轨迹，再交给 LLM 评估。</span></p>

<p id="f-doxcnT2OzflBIvwiz02jZgoD1lb"><span style="font-weight:bold">判断“有没有进展、是不是卡住了”仍属于检测；决定“接下来换什么方法”才属于纠偏。</span><span> 不能只比较思考文本是否相似，也不能把正常轮询、分页查询等重复操作直接判定为无效循环。</span></p>

<p id="f-doxcni5iMpY3u9pZ1xdu8KFad0b"><span>实际案例：DSH 默认按“工具名＋规范化参数”统计连续重复次数，在第 </span><span style="font-weight:bold">3、5、8</span><span> 次触发提醒。它不比较工具返回结果，因此属于重复调用检测，而不是完整的语义无进展检测。</span></p>

<p id="f-doxcnqijDad4QlC8pOvsrk4jF0f"><span style="font-weight:bold">第二层：纠偏——改变当前策略，尝试继续完成任务。</span></p>

<p id="f-doxcncJ4XFwBjWt4YZ4DfZOFk8c"><span>检测到异常后，不必立即终止整个任务，而是先打断原样重复，把已尝试的动作、返回结果和失败原因反馈给 Agent，根据原因调整：</span></p>

<div style="margin-left:25px"><div id="f-doxcnOKDbKuVE9QRU9n7SzLv8og" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">参数错误</span><span>：根据工具返回的错误修正参数。</span></div></div><div id="f-doxcn8Z27ntO0rFH8FAHptFpu0e" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">暂态故障</span><span>：有限重试，必要时退避等待。</span></div></div><div id="f-doxcnGqBcsuPTGPLbvMPKN38lCe" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">策略错误</span><span>：分析失败原因，换查询条件、换工具或重新规划。</span></div></div><div id="f-doxcnd1SYQV0ByZZq9ZqPsIQrLf" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">缺少关键信息</span><span>：请求用户澄清，而不是继续猜测和重试。</span></div></div></div>

<p id="f-doxcnGKBcOY6kfQTATb6FCAdj3b"><span>关键是 </span><span style="font-weight:bold">下一步要有实际策略变化，而不只是思考文本换一种说法</span><span>。纠偏和重规划本身也应有次数限制，并继续受同一个全局预算约束，避免形成新的无限循环。</span></p>

<p id="f-doxcnZkV5FXNRAPW7KjMGxEmlEb"><span>实际案例：DSH 会向后续模型请求注入提醒，要求分析上次结果，选择不同动作、不同参数，或在证据足够时结束。这与《AI Engineering》中根据反馈反思并生成新计划的思路相呼应。但它是软纠偏，不会直接阻止工具调用，也不能保证模型一定采纳。</span></p>

<p id="f-doxcn3Jq0uutbxWpW0LfzQxy3xd"><span style="font-weight:bold">第三层：停止兜底——恢复无效时控制损失。</span></p>

<p id="f-doxcn5nlTC9WidZjukKsd6fZy2e"><span>如果纠偏后仍然无法推进，或者遇到不可恢复的问题，就需要停止路径，防止无限消耗时间、Token 和费用。设计上可以在 Harness 中设置最大执行步数、总耗时、累计 Token 或费用预算，以及同类失败和恢复尝试的次数上限，并支持用户取消。</span></p>

<p id="f-doxcnoozM26KGRNKsjzd91LQISh"><span>达到条件后，由 Harness 停止继续执行，报告已完成部分、未解决问题、停止原因，以及需要用户补充的信息或人工处理的事项。</span><span style="font-weight:bold">停止是控制损失，不代表任务成功完成。</span><span> 预算耗尽、用户取消或遇到不可恢复问题时，可以直接停止，不必等纠偏手段全部尝试完；预算耗尽本身也不等于证明任务陷入了无效循环。</span></p>

<p id="f-doxcnrWnYlFCXdNCWGIPdXQKJSz"><span>实际案例：Codex 在特定场景下有真正的停止保护，例如 Goal 执行失败达到条件后停止自动续跑，Guardian 审批拒绝达到阈值后中断回合。但这些是局部保护，不能泛化为所有 ReAct 循环都有统一硬上限。DSH 的默认重复提醒器也没有“重复到一定次数就强制退出”的机制。</span></p>

<p id="f-doxcnlynY3iry62mBrbEWCqFZIg"><span>📝 </span><span style="font-weight:bold">简化答案（面试照答版）：</span></p>

<p id="f-doxcnkemKitQIXdeFXuDWYRtuae"><span>可以从 </span><span style="font-weight:bold">检测、纠偏和停止兜底</span><span> 三层处理。核心是看任务有没有实际进展，而不是模型有没有一直在思考。这些机制需要由外部执行框架，也就是 Harness 配合实现，不能只靠提示词让模型自己避免死循环。</span></p>

<p id="f-doxcnM3ctVIIrBiGP5kGPS1Th0g"><span style="font-weight:bold">第一，检测是否卡住。</span><span> 我会记录每一步的工具、参数、返回结果和任务状态，主要看两类信号：一类是重复，比如连续使用相同参数调用同一个工具；另一类是没有进展，比如多次搜索没有新信息，或者反复修改代码，测试仍然报同一个错误。明确的重复行为可以用程序规则判断，任务进展可以看测试结果、子目标完成情况，必要时再让模型辅助评估。但要结合场景，不能把正常轮询、分页查询误判成死循环。</span></p>

<p id="f-doxcnZwMWhLJjgTS64XamJprMEb"><span style="font-weight:bold">第二，发现问题后先纠偏。</span><span> 把已经尝试的方法和失败结果反馈给模型，让它分析原因，而不是原样再试。参数错了就修正参数，临时网络故障可以有限重试；方法不对就换工具、换查询条件或重新规划；缺少用户信息就主动澄清。比如连续搜索都没有找到资料，就应该调整关键词或数据源，而不是反复提交同一个查询。关键是下一步的行动要有变化，不能只是换一种说法继续思考，重新规划本身也要限制次数。</span></p>

<p id="f-doxcnxHtVC8RvPQ4vwv5PYQ93ec"><span style="font-weight:bold">第三，设置硬性停止条件。</span><span> 在框架中设置最大步数、总耗时、Token 或费用预算，以及同类失败的次数上限。如果纠偏后仍然无效，或者达到预算，就由框架停止执行，不能指望模型一定会主动停下来。停止后要告诉用户哪些已经完成、哪里卡住、还需要什么信息，必要时转人工，而不是把停止当成任务成功。</span></p>

<p id="f-doxcnYMqAu0VmEkWQF1hLzIvFVf"><span>总结就是： </span><span style="font-weight:bold">检测发现问题，纠偏尝试解决，停止控制损失。</span><span> 既给 Agent 调整和恢复的机会，也保证它不会无限消耗资源。</span></p>

<a id="f-doxcnEWno6dOEBDrhrKNy6bhWNh"></a>

##### 用户问题模糊或有歧义时，如何做澄清性对话？

<p id="f-doxcnchCM8kgKmcxQf0FeLlaOtc"><span>（选自</span><span><span><a href="/posts/agent-learning-24-interview-review/#f-doxcncjgmdxTVZUdOVEwcP43sGN"><span>202607 宇树科技Agent开发二面</span></a></span></span><span>）</span></p>

<p id="f-doxcngBDQsZllVKgNMyzqFWbrKb"><span>💡 </span><span style="font-weight:bold">思路：</span></p>

<p id="f-doxcnop0ym1MILwhUx4sNj2pP2e"><span>采用 </span><span style="font-weight:bold">“提示词约束 + 模型判断 + 工具调用”</span><span> 的方式，将澄清作为 ReAct 循环中的一种工具交互。 </span><span style="font-weight:bold">模型负责决定“是否要问、问什么”，执行框架负责“展示问题、等待回答、将答案交回模型”。</span><span> 不一定需要单独训练歧义分类器。</span></p>

<p id="f-doxcnjxVj0d8qlJ7g2xmBVnGBjd"><span>📝 </span><span style="font-weight:bold">答案：</span></p>

<p id="f-doxcnRUd1H3y9LzswucnOtJlcde"><span>我会给 Agent 提供一个澄清工具，比如 </span><span><span><span>ask_user_question</span></span></span><span>，让模型在需求不明确时主动提问。具体分四步：</span></p>

<ol start="1"><li id="f-doxcnDYCj5ivOAuucq5K4kHbPBd"><span style="font-weight:bold">提示词约束：明确什么时候需要澄清。</span></li></ol>

<p id="f-doxcnrikJI4yzx3HsetEyhl7fSf"><span>在提示词中要求模型先看上下文，能自己查清楚的就不问；如果还有影响下一步的歧义，或缺少需要用户决定的关键信息，就提问，不要猜。</span></p>

<ol start="2"><li id="f-doxcnxbSxglDfdAqhSB22Kp1hCc"><span style="font-weight:bold">模型判断：决定是否调用澄清工具，并生成问题。</span></li></ol>

<p id="f-doxcndkBvwRiJWPhWJbRI4cjSIA"><span>模型判断信息不足时，调用澄清工具。问题要具体，优先问最关键的信息，必要时给出选项，不要一次问太多。</span></p>

<ol start="3"><li id="f-doxcnomzm4SSwCE1jqUPBe52OFc"><span style="font-weight:bold">工具交互：界面展示问题，当前任务等待用户回答。</span></li></ol>

<p id="f-doxcnXVjRAdnfCj2XE2zGNrQS0d"><span>执行框架把问题展示给用户，让当前任务等待回答。这里暂停的只是当前任务，不影响系统处理其他请求，也不是结束整个 ReAct 循环。</span></p>

<ol start="4"><li id="f-doxcn518fL9don1tECr1ggeY2nc"><span style="font-weight:bold">结果回传：把答案作为工具结果，继续原任务。</span></li></ol>

<p id="f-doxcnAgINwFxDJ0B7Zyzo7DPCff"><span>用户回答后，框架把答案作为工具结果放回上下文，模型根据补充信息继续执行。如果仍有关键歧义，就继续追问；信息足够就不再问。</span></p>

<p id="f-doxcnzhaSzgixALIEcSSzxNxkqd"><span>比如，用户说“帮我增加报表导出功能”，模型看完现有代码仍不确定格式，就问“需要 CSV 还是 Excel？”用户选了 Excel，模型就根据这个结果继续处理。涉及高风险操作时，仍需单独确认授权。</span></p>

<p id="f-doxcnX6jOYetorPUM831c2WPqzd"><span style="font-weight:bold">总结：提示词规定什么时候问，模型决定问什么，框架负责展示问题和回传答案。整个流程就是“提问 → 等待 → 回传 → 继续”。</span></p>


<a id="section-0506"></a>
## 推理与规划

<a id="t-block-15208"></a>

<p id="t-lN7spKxdDs1j356wMcoTFk"><span>在构建自主 AI Agent 的过程中，如果说大语言模型（LLM）是 Agent 的大脑，工具调用（Tool Use）是手脚，那么</span><span style="font-weight:bold">推理与规划（Reasoning &amp; Planning）</span><span>就是将其从简单的问答机升级为自主问题解决者的核心引擎。</span></p>

<p id="t-ATOuIiJHh8jfK9vx77JzuZ"><span>复杂的现实任务往往无法通过一次生成（One-pass generation）完成。AI 需要具备拆解目标、逻辑推演、探索路径、自我修正以及调度工具的能力。</span></p>

<p id="t-wlO9wIKVp2kOBxHWN5tBtd"><span>以下是目前业界最主流的推理与规划框架。</span></p>


<a id="section-0508"></a>
## 逐步推理能力

<a id="t-ruGBja3SlVr02iyTkhf4X2"></a>

<p id="t-9N6JmBZv4VMDNg2MRejYDB"><span>传统 LLM 生成答案时往往是直觉式的一步到位。</span></p>

<p id="t-75jjgwz3eslBFOOJo8odvU"><span>思维链（CoT）的核心思想是：</span><span style="font-weight:bold">强制要求模型在输出最终答案前，先显式地输出中间的推理步骤（Let's think step by step）</span><span>。这种做法能显著激活模型在复杂数学、逻辑推理和常识问答中的潜力。</span></p>

<p id="t-sz8uBNOMD7WjZDFzxPkMPh"><span>CoT 不仅让模型有了更多的计算时间（token 数量代表计算量），还让后续的生成能建立在前面正确的逻辑基础上。</span></p>


<a id="section-0509"></a>
## 实例：Few-shot CoT 提示词设计

<a id="t-iOVgoiokS7SsiOmu7BiRAE"></a>

<pre id="t-PYTP2f1hYcPwrf8qVHbDau"><code># 通过提供包含推理过程的示例，引导模型进行 CoT 推理
prompt = """
问题：罗杰有5个网球。他又买了2罐网球。每罐有3个网球。他现在共有多少个网球？
解答：罗杰一开始有5个网球。2罐网球，每罐3个，共计 2 * 3 = 6 个网球。5 + 6 = 11。答案是11。

问题：食堂有23个苹果。如果他们用掉20个做午餐，又买了6个，现在有多少个苹果？
解答：食堂本来有23个苹果。用掉20个后剩下 23 - 20 = 3 个。又买了6个，现在有 3 + 6 = 9 个。答案是9。

问题：{user_question}
解答："""</code></pre>


<a id="section-0511"></a>
## 推理 + 行动循环

<a id="t-clB0jv2cAQ0llB2EHgLGrQ"></a>

<p id="t-GSgWtnEkdKRjxq69bYV1p0"><span>如果说 CoT 只是在模型内部闭门造车，那么 </span><span style="font-weight:bold">ReAct（Reason + Act）</span><span> 则是让模型睁开眼睛看世界。它将内部逻辑推理（Thought）与外部工具交互（Action）交织在一起，形成一个动态的闭环反馈系统。</span></p>

<p id="t-S1Ja3bMjYgoMCwkzFTyZ2o"><span>在 ReAct 范式下，Agent 遵循 </span><span style="font-weight:bold">Thought（思考） -&gt; Action（行动） -&gt; Observation（观察）</span><span> 的循环，直到得出最终结论。</span></p>

<div id="t-6JuriUkyzspNfi1xtSUKQX"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/eb9e52cd21efee64622ec370.png"/></div>

<blockquote id="t-6g6EWEh67puq8eCVI8NLFQ"><p id="t-fFhGYMWvHK8eVzpgvDgRWi"><span style="font-style:italic;font-weight:bold">局限性：</span><span style="font-style:italic"> ReAct 在短期的、步骤清晰的任务中表现优异。但由于整个思维和动作历史都积压在同一个上下文窗口中，当任务链条过长时，极易陷入死循环或因为上下文超载而遗忘初始目标。</span></p></blockquote>


<a id="section-0512"></a>
## Plan-and-Execute（规划先行执行模式）

<a id="t-JIKzqcsavXECNn6wcnBvyC"></a>

<p id="t-z8RvQJpHWOj3En1opqIAIj"><span>为了解决 ReAct 在长线任务中的疲软，Plan-and-Execute 将思考和行动进行了解耦，采用了类似人类做大型项目的策略：</span><span style="font-weight:bold">先出排期表，再挨个干活</span><span>。</span></p>

<p id="t-SvzkPqo4iVGVoQQ47p6FDC"><span>系统通常分为两个独立的角色：</span></p>

<ol start="1"><li id="t-I06mxxiV2rPCzaXSDGCq7l"><span style="font-weight:bold">Planner（规划者）</span><span>：负责接收大目标，生成详细的 Step-by-Step 子任务列表。</span></li></ol>

<ol start="2"><li id="t-wdwqFKHgfyWCHkwVcHSPzq"><span style="font-weight:bold">Executor（执行者）</span><span>：负责按顺序执行这些子任务。执行器通常就是一个小型的 ReAct Agent，每次只专注完成当前的一个小目标。</span></li></ol>

<div id="t-T5AHAO3ntBF4xDxo5lWFCv"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/82be10894ff75ea9e4c54ada.png"/></div>


<a id="section-0514"></a>
## 树状多路径探索

<a id="t-BH8PkCjsQDLPTUtI8fTMLS"></a>

<p id="t-vSpGe3bmFsshVEO08gMlf0"><span>无论是 CoT 还是 Plan-and-Execute，本质上都是</span><span style="font-weight:bold">线性</span><span>的路径探索。但在写代码、解数学题或创意写作时，人类往往会设想多种方案，评估后选择最佳的，甚至在发现错误时回溯。</span></p>

<p id="t-brUmu02BD2spA1rie16COm"><span style="font-weight:bold">ToT（思维树）</span><span> 将推理过程建模为一棵树：节点是当前的思维状态。模型会在每一个分支点生成多个候选 Thought，然后通过内部的 Evaluator（评估器）对这些节点进行打分（如：可行、可能有风险、不可行）。结合 </span><span style="font-weight:bold">BFS（广度优先搜索）</span><span> 或 </span><span style="font-weight:bold">DFS（深度优先搜索）</span><span> 算法，决定是继续深入还是回溯重试。</span></p>


<a id="section-0516"></a>
## 复杂任务拆解与搜索

<a id="t-y2aNYDWxlyJEZvu8YQr1yZ"></a>

<p id="t-N8BAoXjjmk8NcpuhibOycY"><span>在涉及战略游戏或极高难度的推理任务（如前沿的数学验证、复杂的代码仓库重构）时，简单的 ToT 仍不够高效。业界开始将 LLM 与传统的强化学习搜索算法 </span><span style="font-weight:bold">MCTS（Monte Carlo Tree Search）</span><span> 结合（类似 AlphaGo 的核心逻辑）。</span></p>

<ul><li id="t-EbgAwI2TyP15BTpkJZ8ay1"><span style="font-weight:bold">LLM 作为策略网络（Policy Network）</span><span>：提供启发式的下一步行动建议，减少无意义的分支扩展。</span></li></ul>

<ul><li id="t-IIYs4loeLT3PmYm4BZLm6Y"><span style="font-weight:bold">LLM/代码环境作为价值网络（Value Network）</span><span>：通过仿真执行（Rollout）预判某个行动序列的最终胜率或成功率。</span></li></ul>

<ul><li id="t-aR5Ybjqc15ukXcMuuKq05z"><span style="font-weight:bold">优势</span><span>：在庞大的解空间中，能够找到最具有全局最优潜力的规划路径。</span></li></ul>


<a id="section-0517"></a>
## Reflexion：自我反思与纠错

<a id="t-uUy5Pn2Z1qch8nqr3Enveg"></a>

<p id="t-jATFIHvBKmGknxmMbv7VNY"><span>人类在执行任务时，如果第一次失败了，会总结经验教训并在下一次尝试中规避错误。</span></p>

<p id="t-qAkAbEJgyJXd9Y41Xjathb"><span style="font-weight:bold">Reflexion</span><span> 框架赋予了 Agent 类似的能力。</span></p>

<p id="t-yH4UO2mt8Zl3KV2kS2jv79"><span>在 Reflexion 闭环中，当 Agent 的输出被判定为失败（例如：测试用例未通过、API 报错）时，会触发一个 </span><span style="font-weight:bold">Reviewer 机制</span><span>。</span></p>

<p id="t-iMjxSdALLCEw9iGzGo3vtE"><span>LLM 被要求根据历史动作和失败的反馈写一段口语化的反思（Reflection），例如：</span><span style="font-style:italic">"我刚才使用了错误的 API 参数格式，下一次我应该查阅文档后再传递 JSON"</span><span>。这段反思会被存入情景记忆（Episodic Memory）中，作为下一次尝试的上下文提示，从而大幅提升 Agent 的自愈合能力。</span></p>


<a id="section-0518"></a>
## 实例：Reflexion 的反思提示词设计

<a id="t-UVqu58ss0k2H5laLwjAifV"></a>

<pre id="t-md7AqCBuK5PTUlxRhQT60a"><code>reflection_prompt = """
你是一个正在尝试编写 Python 爬虫的 AI 助手。
这是你刚才执行的代码：{previous_code}
这是运行环境返回的错误信息：{error_traceback}

请深刻反思：
1. 错误发生的根本原因是什么？
2. 在下一次尝试中，你具体的修改策略是什么？

请将反思记录下来，以指导后续的行动。
"""</code></pre>


<a id="section-0519"></a>
## 任务分解策略与工程化实践

<a id="t-NPCuD7Hy3QwTatqWe6M6qv"></a>

<p id="t-Abgkzzkaxv3syPBfNGeD7T"><span>在实际生产级的 AI 智能体开发中，纯靠 LLM "零样本"进行复杂规划是不稳定的。常用的混合干预策略包括：</span></p>

<div id="t-BfVteG9QbNBlB5hxGCxfJS"><table><colgroup><col width="136.89755249023438"/><col width="340.90087890625"/><col width="212.00164794921875"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>干预策略</span></p></td><td style=" vertical-align: top"><p><span>核心做法</span></p></td><td style=" vertical-align: top"><p><span>适用场景</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="font-weight:bold">子任务模板化 (SOP)</span></p></td><td style=" vertical-align: top"><p><span>不让 LLM 自由规划，而是预先定义好标准操作程序（SOP），让 LLM 在固定的状态机（State Machine）中流转。</span></p></td><td style=" vertical-align: top"><p><span>客服系统、标准化的数据清洗流水线。</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="font-weight:bold">HITL (Human-in-the-Loop)</span></p></td><td style=" vertical-align: top"><p><span>在 Planner 生成任务列表后，中断执行，要求人类用户进行确认、修改或审批（Approve），然后再交由 Executor 执行。</span></p></td><td style=" vertical-align: top"><p><span>高风险操作：如删除数据库记录、发送群发邮件、大额资金转账。</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="font-weight:bold">RLHF 引导规划</span></p></td><td style=" vertical-align: top"><p><span>利用强化学习和人类偏好反馈，专门微调大模型的规划能力，使其更倾向于生成安全、高效的步骤组合。</span></p></td><td style=" vertical-align: top"><p><span>底层大语言模型基座的训练阶段（如 OpenAI 的 o1 模型训练）。</span></p></td></tr></tbody></table></div>


<a id="section-0520"></a>
## 框架对比总结

<a id="t-HROeZgXpDrjT1Lf5rGG25j"></a>

<div id="t-Do6lafGOWZ3OnJ27p9hwIE"><table><colgroup><col width="165.50692749023438"/><col width="165.50692749023438"/><col width="183.00689697265625"/><col width="193.00860595703125"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>模式</span></p></td><td style=" vertical-align: top"><p><span>核心机制</span></p></td><td style=" vertical-align: top"><p><span>优点</span></p></td><td style=" vertical-align: top"><p><span>缺点</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="font-weight:bold">CoT</span></p></td><td style=" vertical-align: top"><p><span>Step-by-Step 线性推理</span></p></td><td style=" vertical-align: top"><p><span>实现极简，显著提升基础推理准确度</span></p></td><td style=" vertical-align: top"><p><span>无法调用外部工具，容易一条道走到黑</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="font-weight:bold">ReAct</span></p></td><td style=" vertical-align: top"><p><span>交替思考与行动闭环</span></p></td><td style=" vertical-align: top"><p><span>动态适应环境，能通过观测实时调整</span></p></td><td style=" vertical-align: top"><p><span>上下文容易随步骤累积而爆炸，迷失初衷</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="font-weight:bold">Plan-and-Execute</span></p></td><td style=" vertical-align: top"><p><span>先拆解为子任务，再隔离执行</span></p></td><td style=" vertical-align: top"><p><span>极其适合长线复杂任务，上下文清晰</span></p></td><td style=" vertical-align: top"><p><span>面对突发变化（规划本身出错时）不够灵活</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="font-weight:bold">ToT / MCTS</span></p></td><td style=" vertical-align: top"><p><span>树状搜索，评估回溯</span></p></td><td style=" vertical-align: top"><p><span>能解决最高难度的复杂逻辑问题</span></p></td><td style=" vertical-align: top"><p><span>计算成本极其高昂，Token 消耗呈指数级</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="font-weight:bold">Reflexion</span></p></td><td style=" vertical-align: top"><p><span>基于失败反馈生成反思记忆</span></p></td><td style=" vertical-align: top"><p><span>具备自我纠错和持续进化的能力</span></p></td><td style=" vertical-align: top"><p><span>依赖明确的反馈信号（如代码编译器报错）</span></p></td></tr></tbody></table></div>


<a id="section-1401"></a>
## Python 实现推理与规划

<a id="t-n99tKwXwIuB4lyEAjZsbEx"></a>

<p id="t-7PawyPcMNlh9psSZFxzg9T"><span>本章节介绍 AI Agent 的核心智能能力，即推理与规划能力。</span></p>

<p id="t-dpr3AZJDum9sheUVsjZSXd"><span>不同于传统的指令执行模式，具备推理能力的 Agent 能够进行复杂的思考过程。</span></p>

<p id="t-3tvDzVnrxv7pcAnEij0mKA"><span>它能够将复杂任务分解为可执行的步骤，并基于上下文做出决策。</span></p>


<a id="section-1402"></a>
## ReAct 框架

<a id="t-X8YtT5LU8d9BqQEjK9wb42"></a>

<p id="t-dvqOsW8Lte5eNWapJpcBqm"><span>ReAct（Reasoning + Acting）是一种将推理与行动相结合的框架。</span></p>

<p id="t-qz2QlbFf3vLwNNySBiXoVH"><span>在 ReAct 模式中，Agent 会交替进行推理和行动，形成一个闭环。</span></p>

<p id="t-M3Ot1WiWYwoF1q2QIlIQNm"><span>推理指导行动，行动结果又反馈给推理过程，如此循环往复。</span></p>

<p id="t-8JqoOmWBA50SyDQN7z5pmG"><span>ReAct 模拟了人类的问题解决过程：在采取行动前先思考，行动后观察结果，然后基于新信息继续推理。</span></p>


<a id="section-1403"></a>
## 工作原理

<a id="t-XSYd5wdgvvdQcwOPKHC4U4"></a>

<p id="t-y23ETuWQ0pwx19miIN9zh4"><span>ReAct 的核心思想可以概括为三个阶段的循环：</span></p>

<p id="t-6761UnCd4lBgUmHean7nqz"><span>第一步，推理阶段。Agent 基于当前上下文生成下一步的行动思考。</span></p>

<p id="t-JI3RPJfuQHmTfDAfZnltgg"><span>第二步，行动阶段。Agent 执行选定的工具或动作。</span></p>

<p id="t-O4XnbQEuzoNUKWqbUnupa9"><span>第三步，观察阶段。Agent 接收行动结果，更新上下文，返回第一步继续推理。</span></p>


<a id="section-1404"></a>
## 代码实现

<a id="t-WJ3G4pArDwZ6MpFrwR72YW"></a>

<p id="t-deCgPW20QrbIpOoay0AbfU"><span>下面是一个 ReAct Agent 的简化实现：</span></p>


<a id="section-1405"></a>
## ReAct Agent 基本实现

<a id="t-AvIalYbPVObpHvszIuKsxJ"></a>

<pre id="t-y9ti4n9T9Hr6iJDKLIWOTg"><code>class ReActAgent:
 """
    ReAct 框架的 Agent 实现
    核心机制：推理 -&gt; 行动 -&gt; 观察 -&gt; 推理（循环）
    """

 def __init__(self, llm, tools, max_iterations=5):
 # LLM 实例，用于推理和生成
        self.llm = llm
 # 可用工具列表
        self.tools = tools
 # 最大迭代次数，防止无限循环
        self.max_iterations = max_iterations

 def run(self, task):
 """
        执行 ReAct 循环
        :param task: 用户任务描述
        :return: 执行结果
        """
 # 初始化上下文，包含任务和历史信息
        context = {
 "task": task,
 "steps": [], # 已执行步骤的记录
 "observations": [] # 观察结果的记录
 }

 for i in range(self.max_iterations):
 # 阶段一：推理 - 基于当前上下文生成下一步行动
            reasoning = self.llm.reason(context)

 # 判断是否需要执行工具，还是直接返回答案
 if reasoning.needs_action:
 # 选择要使用的工具
                action = reasoning.select_tool(self.tools)
 # 执行工具并获取观察结果
                observation = action.execute(reasoning.tool_input)
 # 将观察结果添加到上下文
                context["observations"].append(observation)
 else:
 # 不需要行动，直接返回推理得出的答案
 return reasoning.answer

 # 达到最大迭代次数仍未完成
 return "达到最大迭代次数限制"</code></pre>


<a id="section-1406"></a>
## 典型应用场景

<a id="t-w8JiSNIjd9Xev1JdXbJKaU"></a>

<p id="t-npYgO069yplHfELbOffbMT"><span>ReAct 模式特别适合以下场景：</span></p>

<p id="t-r7u9ToxqJtI8JRRKw7h4vu"><span>需要在环境中探索、收集信息后才能完成的任务。</span></p>

<p id="t-0JgnXpGsAyK6uspDEzdYdu"><span>智能搜索场景：Agent 需要先搜索信息，再基于搜索结果进行推理和总结。</span></p>

<p id="t-YkbR2i5AwY6sSi4SKnk3se"><span>对话式问答：Agent 需要通过多轮对话澄清需求并获取信息。</span></p>

<p id="t-x31VYL1jo9zsrklX38tbHF"><span>复杂问题求解：问题不能一步解决，需要多个中间步骤。</span></p>

<blockquote id="t-YSiKe5d6FVHzK2cLYNxzgG"><p id="t-M5AQtntwQXoenBSny0WkSH"><span style="font-style:italic">注意：ReAct 模式的优势在于它的灵活性，能够根据每一步的执行结果动态调整后续行动。但这也意味着执行路径可能不稳定，适合需要探索的任务。</span></p></blockquote>


<a id="section-1407"></a>
## 思维链（Chain of Thought, CoT）

<a id="t-n4eBPIIm5qIcuoC4M03USS"></a>

<p id="t-BkBQnzNMGaj1AqhILlx475"><span>思维链是一种促使模型展示逐步推理过程的技术。</span></p>

<p id="t-RkUeCDlUM26oM8PbDUc9hL"><span>CoT 不是让模型直接给出答案，而是引导它先展示推理步骤，再得出最终结论。</span></p>


<a id="section-1408"></a>
## 为什么需要思维链

<a id="t-8ooVwrDZosMF5JjkgA7svY"></a>

<p id="t-1gpWyBMbMU2ZKedDmMvrjo"><span>直接让模型输出答案存在几个问题：</span></p>

<p id="t-KqL4HF8NDGNX8odh08oD6A"><span>复杂推理的中间步骤容易被忽略或跳过。</span></p>

<p id="t-BGDD3jzALxPcH9MhsrjmLj"><span>难以定位错误发生在哪里。</span></p>

<p id="t-zwCNKxBUkrQ5PHJ7pKrtOS"><span>用户无法理解模型的思考过程。</span></p>

<p id="t-zk3fWQL3aikiY2gnqhzlm4"><span>思维链通过要求模型展示推理过程，解决了这些问题。</span></p>


<a id="section-1409"></a>
## Zero-shot CoT

<a id="t-L1R0pX7Bwbo38FWMNDjmkF"></a>

<p id="t-6fMbSHMZJRvfin2xKN60Hh"><span>Zero-shot CoT 是一种无需示例即可激发逐步推理能力的方法。</span></p>

<p id="t-YXRGsY4K6BwN7FzmPxvW7C"><span>只需要在提示词末尾添加 "让我们一步一步地思考" 这样的触发语句。</span></p>


<a id="section-1410"></a>
## Zero-shot CoT 示例

<a id="t-H2nOGqdPdNooDYaA43dmZ7"></a>

<pre id="t-Q1xOzKqvpdJLIjF9IsPl5W"><code># Zero-shot CoT 的提示词模板
prompt = """
问题：小明有 5 个苹果，小红给了他 3 个，小明吃掉了 2 个，还剩多少个？
让我们一步一步地思考：
"""

# 调用语言模型
response = llm.generate(prompt)

# 模型输出示例：
# 第一步：计算小明收到苹果后的总数
# 小明原来有 5 个苹果，小红给了他 3 个
# 5 + 3 = 8 个
#
# 第二步：计算吃掉后的数量
# 小明吃掉了 2 个
# 8 - 2 = 6 个
#
# 结论：还剩 6 个苹果</code></pre>


<a id="section-1411"></a>
## Few-shot CoT

<a id="t-Oij5KUMKutJ1jrjow2ErcZ"></a>

<p id="t-K5Yq4sxwgeR6RHj2VATJRs"><span>Few-shot CoT 通过提供包含详细推理过程的示例，帮助模型学习特定的推理模式。</span></p>

<p id="t-CaiKMGnbq34BfNpJyoGs3X"><span>当 Zero-shot CoT 效果不佳时，可以尝试 Few-shot CoT。</span></p>


<a id="section-1412"></a>
## Few-shot CoT 示例

<a id="t-c8MopvJOSep5XlzFMPbiBk"></a>

<pre id="t-N3jqGfTwMiNTumHekVfBri"><code># Few-shot CoT 的提示词模板
prompt = """
示例 1：
问题：小张有 10 元钱，买了 3 本书，每本 2 元，还剩多少？
让我们一步一步地思考：
- 小张原来有 10 元
- 每本书 2 元，买了 3 本，花费 3 × 2 = 6 元
- 10 - 6 = 4 元
答案：还剩 4 元

示例 2：
问题：一只猫每小时抓 2 只老鼠，8 小时抓了多少只？
让我们一步一步地思考：
- 每小时抓 2 只老鼠
- 8 小时抓了 8 × 2 = 16 只
答案：抓了 16 只

问题：{user_question}
让我们一步一步地思考：
"""

response = llm.generate(prompt)</code></pre>


<a id="section-1413"></a>
## 思维链的优势

<a id="t-BSNTeqKKDGUqtii1aXFps2"></a>

<p id="t-NHjLH9IzCBUvqDDqij89CM"><span>思维链技术带来三个核心价值：</span></p>

<p id="t-v4WPUXWPOUBiIc9ZV5kVNL"><span>可追溯性：将复杂推理分解为可追踪的中间步骤，便于理解推理过程。</span></p>

<p id="t-UwFWICBZJvTwNDg7xllD2p"><span>可解释性：增强模型的可解释性，让用户知道答案从何而来。</span></p>

<p id="t-ZPWO8SVv75lIUiNfWAETDk"><span>准确性提升：显著提升复杂推理任务的准确率，尤其在数学和逻辑任务上效果明显。</span></p>


<a id="section-1414"></a>
## Tree of Thoughts（ToT）

<a id="t-N8zMPZySmtxkWZT8QXngWu"></a>

<p id="t-NpFpyi4RDCyNXlgoFn12zZ"><span>思维树是思维链的扩展，它不再局限于线性推理。</span></p>

<p id="t-tRmT8557j17oTjP32YWnsC"><span>ToT 在每个推理节点探索多条可能的路径，形成树状结构。</span></p>

<p id="t-2RYNBgU9cryLDxRJWC0N2E"><span>这使得 Agent 能够进行多路径探索、回溯和全局评估。</span></p>


<a id="section-1415"></a>
## 与思维链的区别

<a id="t-gAl96ubblr9ifWfqP6hyNs"></a>

<p id="t-pBfvOutxtmytsP8k4QkOmr"><span>CoT 采用线性推理，每一步依赖前一步的结论，适合有明确路径的问题。</span></p>

<p id="t-G622A6Q7zUm8V7pCqm3Ro4"><span>ToT 采用空间推理，同时考虑多个可能的分支，适合需要探索和规划的问题。</span></p>


<a id="section-1417"></a>
## ToT Agent 基本实现

<a id="t-clUvLuj6K0dlprC9odI0vQ"></a>

<pre id="t-s5cAISv2JWaut6hcX7y8XV"><code>class ToTAgent:
 """
    Tree of Thoughts Agent 实现
    核心机制：在每个节点生成多个候选分支，评估后选择最优继续
    """

 def __init__(self, llm, max_depth=4, beam_size=3):
 # LLM 实例
        self.llm = llm
 # 最大搜索深度
        self.max_depth = max_depth
 # 每层保留的候选节点数量（beam width）
        self.beam_size = beam_size

 def solve(self, problem):
 """
        使用 ToT 框架解决问题
        :param problem: 问题描述
        :return: 最优解
        """
 # 创建根节点，包含问题作为初始状态
        root = ThoughtNode(problem, depth=0)
 # 初始化前沿节点列表（待扩展的节点）
        frontier = [root]

 # 逐层扩展
 for depth in range(self.max_depth):
 # 存储所有候选节点
            all_candidates = []

 # 遍历所有前沿节点
 for node in frontier:
 # 为当前节点生成多个候选下一步
                candidates = self.llm.generate_thoughts(
                    node.content, # 当前节点内容
                    n=self.beam_size  # 生成数量
 )
 # 创建新节点并加入候选列表
 for cand in candidates:
                    all_candidates.append(
                        ThoughtNode(cand, depth + 1, parent=node)
 )

 # 评估所有候选节点
            evaluated = self.evaluator.rank(all_candidates)

 # 选择最优的 beam_size 个节点作为下一轮前沿
            frontier = evaluated[:self.beam_size]

 # 检查是否找到解决方案
 if self.is_solution(frontier):
 break

 # 回溯找到最优解
 return self.backtrack_best(frontier)</code></pre>


<a id="section-1418"></a>
## 应用场景

<a id="t-4j69Q3hRyWQ6p7K9yQ4nkW"></a>

<p id="t-CfNWWB8GyJ7o3M7IlYHz4h"><span>ToT 特别适合需要做选择或规划的场景：</span></p>

<p id="t-U1f7eZmHgEEqMbqw2tfeX0"><span>创意写作：生成多个故事发展方向，评估后选择最优。</span></p>

<p id="t-d2kdVbrKnJeY2L2COWyDzl"><span>战略规划：评估多个行动方案的潜在结果。</span></p>

<p id="t-HHIszNnU1fBfb443PUr2Fa"><span>复杂决策：需要考虑多种可能性的决策问题。</span></p>


<a id="section-1419"></a>
## 任务规划与 MCTS

<a id="t-MLugItc2JVz0pD086Ybnnl"></a>

<p id="t-6xgXEZzvlr7TAUI66yOMVZ"><span>蒙特卡洛树搜索（Monte Carlo Tree Search, MCTS）是一种用于复杂决策问题的启发式搜索算法。</span></p>

<p id="t-aNrnIyermLlyjGala9y0Tw"><span>MCTS 在 Agent 规划中有广泛应用，尤其适合游戏 AI 和复杂任务规划。</span></p>


<a id="section-1420"></a>
## 核心思想

<a id="t-2yQo3WfmAwJinq3ns2C74C"></a>

<p id="t-WQ39WmpJgAfSmNufKWjrng"><span>MCTS 通过模拟随机游戏来评估每个决策节点的潜在价值。</span></p>

<p id="t-kKjpowbJZOCGx78OAxbQwZ"><span>它不需要评估所有可能的路径，而是通过抽样和统计来指导搜索方向。</span></p>


<a id="section-1421"></a>
## MCTS 的四个步骤

<a id="t-kmT41GzJxuRRzwHDyZ0W56"></a>

<p id="t-rR3g5mEF9SasLpFfjAdGIh"><span>第一步，选择（Selection）：从根节点开始，递归选择最优子节点直到达到叶节点。</span></p>

<p id="t-l5rsiif8wbwcnmnuYnKrDp"><span>选择时使用 UCB（Upper Confidence Bound）公式平衡探索与利用。</span></p>

<p id="t-HIvACDCcYHeTGQHYOgC4AT"><span>第二步，扩展（Expansion）：在叶节点添加一个或多个子节点。</span></p>

<p id="t-nQsDUmCwAIyjNnrAXO3RXi"><span>第三步，模拟（Simulation）：从新节点开始，随机模拟游戏直到结束。</span></p>

<p id="t-BmQbxnjpBHQFt876sbOvsD"><span>第四步，反向传播（Backpropagation）：更新模拟路径上所有节点的统计信息。</span></p>


<a id="section-1423"></a>
## MCTS 规划器实现

<a id="t-ors08rqM9TK9uUm6hBHiSb"></a>

<pre id="t-RZTjPu3vCUI5cwtxVJaXaU"><code>import math

class MCTSNode:
 """
    MCTS 树节点
    存储节点状态、统计数据和子节点关系
    """

 def __init__(self, state, parent=None, action=None):
 # 当前状态
        self.state = state
 # 父节点引用
        self.parent = parent
 # 从父节点到达此节点的动作
        self.action = action
 # 子节点列表
        self.children = []
 # 此节点的访问次数
        self.visit_count = 0
 # 此节点的累计奖励值
        self.reward = 0.0

 def is_fully_expanded(self):
 """检查是否已扩展所有可能的子节点"""
 return len(self.children) &gt; 0

 def is_terminal(self):
 """检查是否为终止节点（游戏结束或目标达成）"""
 return self.state.is_terminal()

 def uct_child(self):
 """
        使用 UCT 公式选择最优子节点
        UCT = reward/visits + C * sqrt(ln(parent_visits)/visits)
        C 是探索常数，通常设为 sqrt(2)
        """
 # 探索常数，平衡探索与利用
        C = math.sqrt(2)

 return max(
            self.children,
            key=lambda c: c.reward / c.visit_count +
                         C * math.sqrt(math.log(self.visit_count) / c.visit_count)
 )


class MCTSPlanner:
 """
    MCTS 规划器
    使用蒙特卡洛树搜索为 Agent 生成行动规划
    """

 def __init__(self, simulation_limit=1000, exploration_constant=1.41):
 # 最大模拟次数
        self.simulation_limit = simulation_limit
 # 探索常数
        self.exploration_constant = exploration_constant

 def plan(self, initial_state):
 """
        从初始状态开始规划
        :param initial_state: 初始状态
        :return: 最优动作
        """
 # 创建根节点
        root = MCTSNode(initial_state)

 # 执行多次模拟
 for _ in range(self.simulation_limit):
 # 1. 选择：从根节点向下选择最优子节点直到叶节点
            node = self._selection(root)

 # 2. 扩展：如果不是终止节点，扩展一个新节点
 if not node.is_terminal():
                node = self._expansion(node)

 # 3. 模拟：从新节点开始随机模拟到终止
            reward = self._simulation(node)

 # 4. 反向传播：更新路径上所有节点的统计
            self._backpropagation(node, reward)

 # 返回根节点最优子节点对应的动作
 return root.best_child().action

 def _selection(self, node):
 """选择阶段：选择最优子节点"""
 while node.is_fully_expanded() and not node.is_terminal():
            node = node.uct_child()
 return node

 def _expansion(self, node):
 """扩展阶段：添加新子节点"""
 # 生成所有可能的动作
        possible_actions = node.state.get_possible_actions()
 # 为每个动作创建一个子节点
 for action in possible_actions:
            new_state = node.state.apply_action(action)
            child = MCTSNode(new_state, parent=node, action=action)
            node.children.append(child)
 # 返回随机一个子节点（也可使用确定性策略）
 return node.children[0]

 def _simulation(self, node):
 """模拟阶段：随机模拟到游戏结束"""
        state = node.state
 while not state.is_terminal():
 # 随机选择动作
            actions = state.get_possible_actions()
            action = random.choice(actions)
            state = state.apply_action(action)
 # 返回最终奖励
 return state.get_reward()

 def _backpropagation(self, node, reward):
 """反向传播：更新统计信息"""
 while node is not None:
            node.visit_count += 1
            node.reward += reward
            node = node.parent</code></pre>

<blockquote id="t-hYkT8VEC0TLKCUGc1XdILz"><p id="t-7V1LClJNVSuZAVz2dcpVrf"><span style="font-style:italic">注意：MCTS 的计算成本较高，适合需要深度规划但有明确终止条件的场景。对于实时性要求高的任务，可能需要限制模拟次数或使用其他方法。</span></p></blockquote>


<a id="section-1424"></a>
## Reflexion（自我反思）

<a id="t-3cIS4MM8ADHYW07QqEnMux"></a>

<p id="t-TVCnlmpWjGPoVCvWJdczny"><span>Reflexion 是一种让 Agent 具有自我反思能力的技术。</span></p>

<p id="t-0BbmKcwPHjdKatuS1LJBxO"><span>通过为 Agent 添加反思机制，它能够在失败后分析错误原因，调整策略并重试。</span></p>


<a id="section-1425"></a>
## 核心思想

<a id="t-pnLaMNPNqKSNz7uAFCVPf8"></a>

<p id="t-a6xP9lZOJEkAIcs6bX7vQX"><span>Agent 不仅执行动作，还要观察结果并反思：我为什么失败？下次应该如何改进？</span></p>

<p id="t-kLiB2AiJp6duyIrdKsDeB3"><span>这种能力对于持续学习和自我改进至关重要。</span></p>


<a id="section-1427"></a>
## Reflexion Agent 实现

<a id="t-TouLxwVWjQU7SgOnnMjwcp"></a>

<pre id="t-MIKokxWpFalUhKZ0wbFeqp"><code>class ReflexionAgent:
 """
    具有自我反思能力的 Agent
    核心机制：执行 -&gt; 评审 -&gt; 反思 -&gt; 重试
    """

 def __init__(self, actor, reviewer, max_retries=3):
 # 执行器：负责执行具体任务
        self.actor = actor
 # 评审器：负责评估执行结果
        self.reviewer = reviewer
 # 最大重试次数
        self.max_retries = max_retries

 def run(self, task):
 """
        执行带自我反思的任务
        :param task: 任务描述
        :return: 执行结果
        """
 # 维护执行历史
        history = []

 for attempt in range(self.max_retries):
 # 阶段一：尝试执行任务
            result = self.actor.execute(task, history)

 # 记录本次尝试
            history.append({
 "attempt": attempt,
 "result": result
 })

 # 阶段二：评审结果
            feedback = self.reviewer.evaluate(task, result)

 # 阶段三：检查是否成功
 if feedback.is_success:
 return result

 # 阶段四：反思失败原因
 # 生成新的策略提示，指导下一次尝试
            reflection = self.reviewer.reflect(
                task, # 原始任务
                result, # 失败结果
                feedback        # 评审反馈
 )

 # 将反思结果添加到历史，供下次尝试参考
            history.append({
 "type": "reflection",
 "content": reflection
 })

 # 所有重试都失败，返回历史记录
 return history


class Reviewer:
 """评审器：评估执行结果并生成反思"""

 def evaluate(self, task, result):
 """
        评估执行结果
        :return: 包含是否成功及详细反馈的对象
        """
 # 检查结果是否满足任务要求
        is_success = self.check_success(task, result)

 if is_success:
 return EvaluationResult(is_success=True)
 else:
 # 生成失败原因分析
            failure_reasons = self.analyze_failures(task, result)
 return EvaluationResult(
                is_success=False,
                reasons=failure_reasons
 )

 def reflect(self, task, result, feedback):
 """
        生成反思内容
        帮助 Actor 理解失败原因并改进策略
        """
        prompt = f"""
任务：{task}
执行结果：{result}
失败原因：{feedback.reasons}

请分析失败原因，并给出改进建议。
重点说明：
1. 哪里出了问题？
2. 下次应该如何避免？
3. 需要改变什么策略？
"""
 return self.llm.generate(prompt)</code></pre>


<a id="section-1428"></a>
## 应用场景

<a id="t-OztzJzUEGvvMP66p07orNc"></a>

<p id="t-OIJ4OM6Kv8jmVvnhsFUn5K"><span>Reflexion 特别适合以下场景：</span></p>

<p id="t-2kclnXwwV23qSHMKWOsipG"><span>需要持续改进的任务，如对话系统、代码生成等。</span></p>

<p id="t-pYCAXwRiwJhab7NSbhG0l9"><span>错误代价高但重试成本低的场景。</span></p>

<p id="t-teYpyxHf6DjdLpSq1Fuj8u"><span>需要从失败中学习的情况。</span></p>


<a id="section-1429"></a>
## 任务分解策略

<a id="t-C4OyV2LUlZ2D37KPFITHJh"></a>

<p id="t-lECBkRsY2gMCXTMSzMP9TB"><span>复杂任务通常需要分解为可管理的子任务。</span></p>

<p id="t-HotL3b9uXgujseE9oAz4TR"><span>有效的任务分解是规划能力的基础。</span></p>


<a id="section-1430"></a>
## 递归任务分解

<a id="t-NVMFNX41RQDLfrecooS1Bc"></a>

<p id="t-QBcdtREugOrlIxwIx74Zrv"><span>将任务递归地分解为更小的子任务，直到子任务可以直接执行。</span></p>


<a id="section-1431"></a>
## 递归任务分解

<a id="t-F3XKJzXxVxTfbKuI5o6yzw"></a>

<pre id="t-nR4muySvlC31fhLH2steF7"><code>def decompose(task, is_executable_fn, decompose_fn):
 """
    递归分解任务
    :param task: 要分解的任务
    :param is_executable_fn: 判断任务是否可直接执行的函数
    :param decompose_fn: 分解任务的函数
    :return: 可执行任务列表
    """
 # 如果任务可以直接执行，直接返回
 if is_executable_fn(task):
 return [task]

 # 分解任务为子任务
    subtasks = decompose_fn(task)

 # 递归分解每个子任务
    result = []
 for subtask in subtasks:
 # 对子任务递归调用分解函数
        result.extend(
            decompose(subtask, is_executable_fn, decompose_fn)
 )

 return result


# 示例：判断任务是否可执行
def is_code_complete(task):
 """检查任务是否可以直接执行代码"""
 return task.get("type") == "code" and len(task.get("dependencies", [])) == 0


# 示例：分解复杂任务
def decompose_programming_task(task):
 """分解编程任务"""
 if "write_function" in task["type"]:
 return [
 {"type": "understand_requirements", "task": task["spec"]},
 {"type": "write_code", "spec": task["spec"]},
 {"type": "write_tests", "function": task["function_name"]},
 {"type": "verify_tests", "function": task["function_name"]}
 ]
 return [task]</code></pre>


<a id="section-1432"></a>
## 平行任务分解

<a id="t-VNTNkR3k0E5skaI2QRdZC7"></a>

<p id="t-2CEnqS19pe6HBZ5jXxMjUY"><span>识别可以并行执行的独立子任务，提高执行效率。</span></p>

<p id="t-whX677x6DlPq70aaEyj787"><span>这是加速任务执行的关键策略。</span></p>


<a id="section-1433"></a>
## 层次任务分解

<a id="t-NpX5iHyGuseRs1HnxXPqNh"></a>

<p id="t-FebvsdhzP2l0UFlzGJEnXE"><span>将任务分为不同抽象层次，高层任务调用低层任务，形成任务层次树。</span></p>

<p id="t-I1Gj7EBVBtnqS0NxQvVQcI"><span>适合需要多层抽象的复杂系统。</span></p>


<a id="section-1434"></a>
## Plan-and-Execute 模式

<a id="t-10bvQlciNrxCEU5tSkwmUl"></a>

<p id="t-SxU0yFSaykQ6Oz8wT2z3Kk"><span>Plan-and-Execute 是一种将规划与执行分离的架构模式。</span></p>

<p id="t-nPCsAslOv5jYULTFKk0czr"><span>Agent 首先完整地规划整个任务流程，然后按计划执行。</span></p>


<a id="section-1435"></a>
## 与 ReAct 的区别

<a id="t-rdMXJjMFlqhTopoqxwI0Sk"></a>

<p id="t-vhxQHUPDUIRKPhZzqF75NO"><span>ReAct 是边推理边执行，更灵活但路径可能不稳定。</span></p>

<p id="t-83CqbJaEu247hRnF6pJmYJ"><span>Plan-and-Execute 是先规划后执行，更稳定但缺乏动态调整能力。</span></p>


<a id="section-1437"></a>
## Plan-and-Execute Agent 实现

<a id="t-CVwIMKkroxyyro5XXBiV25"></a>

<pre id="t-y4h7ObQbJjxosYptcm5yM3"><code>class PlanAndExecuteAgent:
 """
    Plan-and-Execute 架构的 Agent
    核心机制：先完整规划，再按计划执行
    """

 def __init__(self, planner, executor):
 # 规划器：负责制定执行计划
        self.planner = planner
 # 执行器：负责执行具体步骤
        self.executor = executor

 def run(self, task):
 """
        执行任务
        分为规划阶段和执行阶段
        """
 # ==================== 规划阶段 ====================
 # 一次性生成完整的执行计划
        plan = self.planner.create_plan(task)

 # ==================== 执行阶段 ====================
        results = []

 # 按计划顺序执行
 for step in plan.steps:
 # 执行当前步骤
            result = self.executor.execute(step)
            results.append(result)

 # 检查是否需要重新规划
 # 例如：执行结果与预期不符，或出现意外情况
 if self.needs_replan(results):
 # 基于当前结果重新规划
                plan = self.planner.replan(task, results)

 # 整合所有结果
 return self.summarize(results)

 def needs_replan(self, results):
 """
        判断是否需要重新规划
        检查执行结果是否符合预期
        """
 # 获取最后一个结果
        last_result = results[-1]

 # 如果结果明显不符合预期，需要重规划
 if last_result.is_unexpected():
 return True

 # 如果结果导致后续步骤无法执行，需要重规划
 if last_result.blocks_future():
 return True

 return False


class Planner:
 """规划器：生成任务执行计划"""

 def create_plan(self, task):
 """创建初始执行计划"""
        prompt = f"""
任务：{task}

请制定详细的执行计划，包括：
1. 需要执行的步骤顺序
2. 每个步骤的具体操作
3. 步骤之间的依赖关系

输出格式：
步骤1: [操作描述]
步骤2: [操作描述]
...
"""
        plan_text = self.llm.generate(prompt)
 return Plan.parse(plan_text)

 def replan(self, task, results):
 """基于执行结果重新规划"""
 # 分析已完成的结果
        completed = [r for r in results if r.is_success]
        failed = [r for r in results if not r.is_success]

 # 生成调整后的计划
        prompt = f"""
原始任务：{task}
已完成步骤：{completed}
失败步骤：{failed}

请制定调整后的执行计划：
"""
        plan_text = self.llm.generate(prompt)
 return Plan.parse(plan_text)


class Executor:
 """执行器：执行具体的计划步骤"""

 def execute(self, step):
 """执行单个步骤"""
 # 根据步骤类型选择执行方式
 if step.type == "tool_call":
 return self.execute_tool_call(step)
 elif step.type == "code":
 return self.execute_code(step)
 elif step.type == "query":
 return self.execute_query(step)

 return Result(success=False, error="Unknown step type")</code></pre>

<blockquote id="t-s6pcAph6fU9GZihs9YjBpr"><p id="t-583XZJ3QB7zDyTvumoiwJK"><span style="font-style:italic">注意：Plan-and-Execute 模式适合任务结构相对稳定、可以提前规划的场景。对于需要灵活应变的环境，ReAct 模式可能更合适。</span></p></blockquote>


<a id="section-1438"></a>
## 章节小结

<a id="t-2AivYrgJXn73df9rNhyHld"></a>

<p id="t-U9nOofDbJ3oA9qdpoTpYds"><span>本章节介绍了 AI Agent 的推理与规划核心能力。</span></p>

<p id="t-2ptGmSZp09j3OmfykhYVmf"><span style="font-weight:bold">ReAct</span><span> 框架通过推理与行动的循环，让 Agent 能够边执行边调整策略。</span></p>

<p id="t-trNVc5I9qLCrvDEUSWpdUO"><span style="font-weight:bold">思维链（CoT）</span><span> 通过展示逐步推理过程，提升复杂任务的执行准确性。</span></p>

<p id="t-Ax8AN7Zk81M14CR0lZjIbD"><span style="font-weight:bold">思维树（ToT）</span><span> 扩展了思维链，支持多路径探索和回溯。</span></p>

<p id="t-9NDSXJqI5SdswXuxGJbCxI"><span style="font-weight:bold">MCTS</span><span> 是一种启发式搜索算法，适合复杂决策和规划问题。</span></p>

<p id="t-kszineRDxeqmiUWQbp1CyU"><span style="font-weight:bold">Reflexion</span><span> 赋予 Agent 自我反思能力，从失败中学习和改进。</span></p>

<p id="t-kMYpAHvsUi53i2xBb78VMr"><span style="font-weight:bold">任务分解策略</span><span> 是规划能力的基础，包括递归分解、平行分解和层次分解。</span></p>

<p id="t-qBJrcmq6wsjSyYmURl3RsG"><span style="font-weight:bold">Plan-and-Execute</span><span> 采用先规划后执行的模式，适合结构稳定的任务。</span></p>

<p id="t-lQns3AJDKnsg27G2WJvYVW"><span>这些技术可以单独使用，也可以组合使用，构建更强大的 Agent 系统。</span></p>


<a id="section-1860"></a>
## AI Workflow（AI 工作流）

<a id="t-block-23657"></a>

<p id="t-M083w9hl9sS4lDkL0qJGc3"><span style="border-bottom:1px solid">AI Workflow（AI 工作流）是将多个 AI 模型调用、工具使用、数据处理步骤有序组合成一条自动化流水线的系统。</span></p>

<p id="t-e7manJYIeEk1ojXMpBmstU"><span style="border-bottom:1px solid">单独调用一次 LLM 能回答问题，但现实任务往往需要：查网页 → 提取信息 → 分析 → 写报告 → 发送邮件。AI Workflow 就是把这些步骤串起来，让 AI 自动完成完整任务，而不只是回答一句话。</span></p>


<a id="section-1861"></a>
## 一个直观的类比

<a id="t-7TGmMQmH4V7NP4e0XI744A"></a>

<p id="t-lEU4i6NhmhXsr5xoWbuqT7"><span style="border-bottom:1px solid">想象一个装配流水线：</span></p>

<div id="t-AjMeE5r7jKKfgshBDRaJwE"><table><colgroup><col width="147.89755249023438"/><col width="120"/><col width="336.00689697265625"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>模式</span></p></td><td style=" vertical-align: top"><p><span>类比</span></p></td><td style=" vertical-align: top"><p><span>说明</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">单次 LLM 调用</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">像一个工匠</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">给他一块铁，他还给你一把剑</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">AI Workflow</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">像整条流水线</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">原料进去，自动经过冶炼 → 锻造 → 淬火 → 打磨 → 包装，成品出来</span></p></td></tr></tbody></table></div>

<p id="t-nBOYUDczndgBGhZ62YCKmx"><span style="border-bottom:1px solid">每个步骤可以是 AI 模型、代码函数、外部 API，或者人工审核节点。</span></p>


<a id="section-1862"></a>
## 从问答到做事的进化

<a id="t-lF1ZTA9UXZuEFyyAQ04Pqi"></a>

<div id="t-RhXtBazlHdnNoDvPWAOcRV"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/15cfa4266178ce0c3ef6eb52.png"/></div>


<a id="section-1864"></a>
## 单次调用的局限

<a id="t-s4796yP2VIuEliWOSowbuJ"></a>

<p id="t-MEwffzpMblj1LREBZYRcdi"><span style="border-bottom:1px solid">一次 LLM 调用能完成的事情非常有限：</span></p>

<ul><li id="t-QgjsfgUmolUu3BeyIBxMPA"><span>上下文窗口有限：无法一次读完一本书</span></li></ul>

<ul><li id="t-OUiILfxrshowQTmZM9jF0B"><span>无法访问实时信息：训练数据有截止日期</span></li></ul>

<ul><li id="t-HkkYkUUl8smCLJ9zEJtsCh"><span>无法执行操作：不能真正发邮件、写代码并运行</span></li></ul>

<ul><li id="t-L5gQqa5S1muJgUAhVSTcxF"><span>无法自我校验：生成错误后无法意识到并修正</span></li></ul>

<ul><li id="t-yjGFCVChITRrWOscAuh3Pm"><span>复杂任务容易出错：一步做太多事情导致质量下降</span></li></ul>


<a id="section-1865"></a>
## AI Workflow 解决的五大核心问题

<a id="t-ugw3YwqW1o0kJNw04P9ZhQ"></a>

<div id="t-AyCmFgeXZ4S5Y1fE4RUSKX"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/ed2ec825d567c34e494e5a8b.png"/></div>


<a id="section-1866"></a>
## 核心组成要素

<a id="t-r02OGiegp7w2dUFYULe7z2"></a>

<p id="t-8ZJWIcm8KyQXYDJdzOljTd"><span style="border-bottom:1px solid">一个完整的 AI Workflow 由以下核心要素构成。</span></p>

<div id="t-BeanfIPooJJM6Ywl42r9Ub"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/13d894ab39e1f619943059ee.png"/></div>


<a id="section-1867"></a>
## 各要素详解

<a id="t-UJlznQnMq2NG8CnWU8KY6M"></a>

<p id="t-D5X19ZRlSFDTM1X4q6Wgtz"><span style="border-bottom:1px solid;font-weight:bold">LLM（大语言模型）</span><span style="border-bottom:1px solid">- Workflow 的"大脑"，负责推理、生成、决策。常用：GPT-4o、Claude 3.5、Gemini 1.5、本地 Llama 3。</span></p>

<p id="t-KckWw9zt0eAPOQ5LdfdOgo"><span style="border-bottom:1px solid;font-weight:bold">工具（Tools）</span><span style="border-bottom:1px solid">- 让 AI 能与外部世界交互的接口，包括：搜索引擎（Tavily、Serper、Bing）、代码执行器（Python REPL、沙箱环境）、数据库查询（SQL、向量 DB）、外部 API（天气、股票、邮件、日历）、文件操作（读写、解析 PDF/Excel）。</span></p>

<p id="t-O2DkLmCk5GllGcAAJ2zRei"><span style="border-bottom:1px solid;font-weight:bold">记忆（Memory）</span><span style="border-bottom:1px solid">- 短期记忆存储当前会话对话历史（存在 prompt 里），长期记忆通过向量数据库 + RAG 实现跨会话持久存储，工作记忆维护任务执行中的中间状态。</span></p>

<p id="t-qIcyssBM0kq9wrZV5wjpdo"><span style="border-bottom:1px solid;font-weight:bold">状态（State）</span><span style="border-bottom:1px solid">- 任务在各步骤之间传递的信息载体，如同接力棒，每一步都能读取前步结果并写入新结果。</span></p>

<p id="t-9ecyQFeMbwzUyMbYAYD27Q"><span style="border-bottom:1px solid;font-weight:bold">路由/条件（Router）</span><span style="border-bottom:1px solid">- 根据前一步输出动态决定下一步走向，实现分支、循环、跳转等复杂流程控制。</span></p>

<p id="t-uVHVsdFNkYdsY4eIbrGtw6"><span style="border-bottom:1px solid;font-weight:bold">人工介入（Human in the Loop）</span><span style="border-bottom:1px solid">- 在关键节点暂停等待人工确认，适用于高风险操作（如删除数据、发送邮件、财务操作）。</span></p>


<a id="section-1868"></a>
## 六大常见 Workflow 模式

<a id="t-IO4eFpqsGc7xFl3azRnit0"></a>

<p id="t-CbPzds6eC8wBJtUhGAC5tL"><span style="border-bottom:1px solid">以下是 AI Workflow 中最常用的六种设计模式，从简单到复杂，适用于不同场景。</span></p>


<a id="section-1869"></a>
## 模式一：顺序链（Sequential Chain）

<a id="t-eIWetpTubQAopB3keT72aT"></a>

<p id="t-iZ4xFgFnm9NWpoz2NabvCT"><span style="border-bottom:1px solid">最基础的模式，步骤 A → B → C 线性执行，上一步输出是下一步输入。</span></p>

<div id="t-SqpuJlOvRPWq0UAqrY1GQk"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/8c33fa4ea10d75b21a20645a.png"/></div>

<div id="t-eY9VcZIGBZPPa5wFqm9esf"><table><colgroup><col width="120"/><col width="420.89752197265625"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>维度</span></p></td><td style=" vertical-align: top"><p><span>说明</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">适用场景</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">文档处理流水线、内容生成、数据转换</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">优点</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">简单、可预测</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">缺点</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">僵硬，无法根据内容动态调整</span></p></td></tr></tbody></table></div>


<a id="section-1870"></a>
## 模式二：条件路由（Conditional Routing）

<a id="t-HFNpwitIagviXA9F86dYE4"></a>

<p id="t-rXmH4v8YSlnT5C4vOHORLO"><span style="border-bottom:1px solid">根据某一步的输出内容，动态选择不同的后续路径。</span></p>

<div id="t-EDIiCKvN1DnUabZ5Rvn5KE"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/b4d423996bccb5a7c3bdc4a7.png"/></div>

<div id="t-HS4HmYBGeVgNyuwF8850o6"><table><colgroup><col width="148.89755249023438"/><col width="456.89752197265625"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>维度</span></p></td><td style=" vertical-align: top"><p><span>说明</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">适用场景</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">智能客服、多功能助手、问题分类处理</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">优点</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">灵活，资源利用率高</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">缺点</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">路由逻辑需要精心设计，分类错误影响全流程</span></p></td></tr></tbody></table></div>


<a id="section-1871"></a>
## 模式三：并行执行（Parallel Execution）

<a id="t-Dc2JZLOiBoUMi8c5R9sRul"></a>

<p id="t-RKUK3Dm9C7QGtYTj1bTaFn"><span style="border-bottom:1px solid">多个子任务同时运行，最后汇总结果。</span></p>

<div id="t-sNiJNmsrdFl58HrvOs7Cto"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/66ad9d446640b0cc04cd1251.png"/></div>

<div id="t-jV2ndudFGv0ClUm6ZVTE0y"><table><colgroup><col width="170.89755249023438"/><col width="375.89752197265625"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>维度</span></p></td><td style=" vertical-align: top"><p><span>说明</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">适用场景</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">多维度分析、批量处理、独立子任务</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">优点</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">速度大幅提升</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">缺点</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">需要处理并发控制和结果合并逻辑</span></p></td></tr></tbody></table></div>


<a id="section-1872"></a>
## 模式四：ReAct 循环（Reason + Act）

<a id="t-b7MPuwWq4nbuZqvfj4ISNq"></a>

<p id="t-hISj34CcO0cpMfxV8cDjJh"><span style="border-bottom:1px solid">AI 先推理决定做什么，再行动调用工具，根据结果继续推理，循环直到任务完成。这是 AI Agent 的核心模式。</span></p>

<div id="t-MONwyui22ouE3QsBN4XDpZ"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/26d903fe730cbe150a6e8937.png"/></div>

<div id="t-umSOXtLJgHgvA5nepVgpyO"><table><colgroup><col width="120"/><col width="447.89752197265625"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>维度</span></p></td><td style=" vertical-align: top"><p><span>说明</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">适用场景</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">AI Agent、复杂任务执行、开放式问题求解</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">优点</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">动态灵活，可处理未知情况</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">缺点</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">循环次数不可控，需要设定最大步数防止死循环</span></p></td></tr></tbody></table></div>


<a id="section-1873"></a>
## 模式五：Plan &amp; Execute（规划后执行）

<a id="t-InjLjZVvxuGMWknC4yHBa3"></a>

<p id="t-p7lkfUNDOxpHF0eOyHnp3z"><span style="border-bottom:1px solid">先让 LLM 制定完整计划，再按计划逐步执行。与 ReAct 的区别是"先想清楚，再行动"。</span></p>

<div id="t-QpkjoaoEokTrukPql4xl2V"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/37807d2dcf6c70979d61ca20.png"/></div>


<a id="section-1874"></a>
## 模式六：多智能体协作（Multi-Agent）

<a id="t-dJdsZK5baPvI9WQRTLleZ1"></a>

<p id="t-MvSGjEywhKPcmMCL0x0BWL"><span style="border-bottom:1px solid">多个专职 Agent 分工合作，每个 Agent 有自己的角色和工具集。</span></p>

<div id="t-NN6HVJ1zmnbFrZMGyD54Hg"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/0176b1d94f41176459f59df4.png"/></div>

<div id="t-p9YFE4hQlzYAnLb5cug6GB"><table><colgroup><col width="158.89755249023438"/><col width="418.89752197265625"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>维度</span></p></td><td style=" vertical-align: top"><p><span>说明</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">适用场景</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">复杂软件开发、科研辅助、企业自动化</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">优点</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">专职专用，质量更高，易于扩展</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">缺点</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">系统复杂度高，Agent 间通信需要精心设计</span></p></td></tr></tbody></table></div>


<a id="section-1875"></a>
## 主流框架与工具对比

<a id="t-hu30Ui8nEZ6fSp0Oe8zMTu"></a>

<p id="t-1c9O0Cxu8LiDqnkopnGxGZ"><span style="border-bottom:1px solid">以下是当前最主流的 AI Workflow 框架全景对比，帮助你根据自身情况做出选择。</span></p>

<div id="t-I28nQfEVBDTjoZJbtRUoGx"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/77a7f3941f044c8308dd96de.png"/></div>


<a id="section-1876"></a>
## 框架选型决策树

<a id="t-Nd81jU4EogfwP2uelcsLTK"></a>

<p id="t-2x9teSgmD4ZZ2vYsFJSya2"><span style="border-bottom:1px solid">根据你的具体情况，按照以下决策树选择合适的框架：</span></p>

<pre id="t-Kfm4dOXPCzNIaFv4kCaQEj"><code>你的情况是什么？
│
├─── 没有编程基础，想用可视化工具搭建
│    ├─── 主要是 AI 应用（问答、生成）→ Dify（首选）
│    └─── 需要连接 Slack/邮件等 SaaS 系统 → n8n
│
├─── 有 Python 基础，代码优先
│    ├─── 做知识库 / RAG 系统 → LlamaIndex
│    ├─── 做多 Agent 协作，想快速上手 → CrewAI
│    ├─── 需要复杂有状态流程控制 → LangGraph
│    └─── 通用场景，想要最大生态 → LangChain
│
└─── 已有明确场景，生产级要求
     ├─── 高并发、精细控制 → LangGraph + LangSmith
     └─── 企业部署、私有化 → Dify 自托管</code></pre>


<a id="section-1877"></a>
## 快速上手：Python 代码示例

<a id="t-XjuqDmDG6WGRVjEedK38ZA"></a>

<p id="t-kCR04YY7LZfjfWOktF8Nao"><span style="border-bottom:1px solid">以下示例从最简单的顺序链到复杂的多 Agent 协作，逐步演示 AI Workflow 的实现方式。</span></p>


<a id="section-1878"></a>
## LangChain 顺序链

<a id="t-tZ82uGAtAdMBZY4TOvS8ai"></a>

<p id="t-oMhjVn8RzL706Q6Ily6in2"><span style="border-bottom:1px solid">最基础的 Workflow 模式，用管道操作符 | 串联多个 LLM 调用步骤。</span></p>

<p id="t-B08oJPT64qNt8jxRyzgJYG"><span style="border-bottom:1px solid">安装依赖包：</span></p>

<pre id="t-zs1KXDkZ9kXJ8tUi6Cf8dJ"><code>pip install langchain langchain-openai</code></pre>


<a id="section-1879"></a>
## 实例

<a id="t-S4FYuPRRDx4RSOvvl6rZxq"></a>

<pre id="t-kwAwxKdlh8l9mOcivhtvvB"><code>from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

llm = ChatOpenAI(model="gpt-4o-mini", api_key="your-api-key")

# ─── 定义三个步骤 ────────────────────────────────────────────
# 步骤 1：将文章翻译成中文
translate_prompt = ChatPromptTemplate.from_template(
 "将下面的英文文章翻译成中文，保持原意：\n\n{article}"
)

# 步骤 2：提取摘要
summarize_prompt = ChatPromptTemplate.from_template(
 "请将以下文章提炼成 3 个要点，每点一句话：\n\n{translated}"
)

# 步骤 3：生成标题
title_prompt = ChatPromptTemplate.from_template(
 "根据以下摘要，生成一个吸引人的中文标题（15字以内）：\n\n{summary}"
)

parser = StrOutputParser()

# ─── 用 | 操作符链接成流水线 ─────────────────────────────────
chain = (
 {"translated": translate_prompt | llm | parser}
 | {"summary": summarize_prompt | llm | parser,
 "translated": lambda x: x["translated"]}
 | title_prompt | llm | parser
)

# ─── 运行 ────────────────────────────────────────────────────
article = """
Artificial intelligence is transforming how we work and live.
From automating repetitive tasks to assisting in creative work,
AI tools are becoming indispensable in modern workflows...
"""

result = chain.invoke({"article": article})
print(result)</code></pre>

<blockquote id="t-aNzXConadsM3sVGxKAorLZ"><p id="t-Fc42aqBGoceTqG0Jenvw2c"><span>AI 正在重塑现代工作流：从自动化到创意辅助</span></p></blockquote>


<a id="section-1880"></a>
## 工具调用 Agent（ReAct 模式）

<a id="t-SmYQHA1qSt1VA2pnJZvj2T"></a>

<p id="t-xoMkezthWhUTmFeWBFDq3W"><span style="border-bottom:1px solid">ReAct 是 AI Agent 的核心模式，让 AI 在思考和行动之间循环，直到完成任务。</span></p>


<a id="section-1881"></a>
## 实例

<a id="t-AtZBFM7Ky0RJlXCOrMnqdJ"></a>

<pre id="t-nqfIW6tsizYxJXwMF25Prk"><code>from langchain_openai import ChatOpenAI
from langchain.agents import AgentExecutor, create_react_agent
from langchain_core.tools import tool
from langchain import hub
import requests, datetime

# ─── 定义工具 ────────────────────────────────────────────────
@tool
def get_weather(city: str) -&gt; str:
 """获取指定城市的当前天气信息"""
 # 实际项目中替换为真实天气 API
    mock_data = {
 "北京": "晴天，气温 22°C，微风",
 "上海": "多云，气温 26°C，湿度 75%",
 "广州": "小雨，气温 30°C，建议带伞",
 }
 return mock_data.get(city, f"暂无 {city} 的天气数据")

@tool
def search_web(query: str) -&gt; str:
 """在网络上搜索信息，返回相关内容摘要"""
 # 实际项目中接入 Tavily / Serper API
 return f"搜索 '{query}' 的结果：这是一个模拟的搜索结果..."

@tool
def calculate(expression: str) -&gt; str:
 """计算数学表达式，例如 '2 + 3 * 4'"""
 try:
        result = eval(expression, {"__builtins__": {}}, {})
 return str(result)
 except Exception as e:
 return f"计算错误：{e}"

@tool
def get_date() -&gt; str:
 """获取今天的日期"""
 return datetime.date.today().strftime("%Y年%m月%d日")

# ─── 创建 Agent ───────────────────────────────────────────────
tools = [get_weather, search_web, calculate, get_date]
llm   = ChatOpenAI(model="gpt-4o", temperature=0)

# 使用 LangChain Hub 的标准 ReAct prompt
prompt = hub.pull("hwchase17/react")

agent = create_react_agent(llm, tools, prompt)
agent_executor = AgentExecutor(
    agent=agent,
    tools=tools,
    verbose=True, # 打印每步思考过程，方便调试
    max_iterations=8, # 防止无限循环
    handle_parsing_errors=True
)

# ─── 运行 ────────────────────────────────────────────────────
result = agent_executor.invoke({
 "input": "今天是几号？北京天气怎么样？如果出门步行 5km 消耗约 300 卡路里，"
 "跑步同样距离消耗大约是步行的 1.6 倍，请计算跑步消耗的卡路里。"
})

print(result["output"])
# Agent 会自动决策：先调用 get_date → get_weather("北京") → calculate("300*1.6")
# 最后综合所有信息给出完整回答</code></pre>


<a id="section-1882"></a>
## LangGraph 有状态 Workflow

<a id="t-DxMXNNRBrMLLikgH9c0fBP"></a>

<p id="t-hCRKgTQGsmvI1c5HTql5sf"><span style="border-bottom:1px solid">LangGraph 用图的方式定义复杂流程，每个节点是一个函数，边定义跳转逻辑。</span></p>


<a id="section-1883"></a>
## 实例

<a id="t-jNMcUiDZhTQLqcJMFg8lYZ"></a>

<pre id="t-ymdT0wC2YdMlJYkfLStqRW"><code>from langgraph.graph import StateGraph, END
from langchain_openai import ChatOpenAI
from typing import TypedDict, Annotated
import operator

# ─── 定义状态结构（在节点间传递的数据）────────────────────────
class ResearchState(TypedDict):
    topic: str # 研究主题
    research_notes: str # 研究笔记
    draft: str # 草稿
    review_feedback: str # 审阅意见
    final_report: str # 最终报告
    revision_count: Annotated[int, operator.add] # 修改次数（累加）

llm = ChatOpenAI(model="gpt-4o")

# ─── 定义节点函数 ─────────────────────────────────────────────
def research_node(state: ResearchState) -&gt; dict:
 """节点1：调研阶段"""
    response = llm.invoke(
 f"请对以下主题进行简要调研，列出 5 个关键要点：{state['topic']}"
 )
 return {"research_notes": response.content}

def write_node(state: ResearchState) -&gt; dict:
 """节点2：撰写草稿"""
    prompt = f"""
    主题：{state['topic']}
    调研笔记：{state['research_notes']}
 {'上次审阅意见：' + state.get('review_feedback', '') if state.get('review_feedback') else ''}

    请根据以上内容撰写一篇 300 字的分析报告草稿。
    """
    response = llm.invoke(prompt)
 return {"draft": response.content, "revision_count": 1}

def review_node(state: ResearchState) -&gt; dict:
 """节点3：审阅草稿"""
    response = llm.invoke(
 f"审阅以下报告，如果质量达标回复 'APPROVED'，否则给出具体修改意见：\n\n{state['draft']}"
 )
 return {"review_feedback": response.content}

def finalize_node(state: ResearchState) -&gt; dict:
 """节点4：最终定稿"""
 return {"final_report": state["draft"]}

# ─── 路由函数：决定审阅后走哪条路 ─────────────────────────────
def should_revise(state: ResearchState) -&gt; str:
 if "APPROVED" in state["review_feedback"]:
 return "finalize" # → 最终定稿
 elif state["revision_count"] &gt;= 3:
 return "finalize" # → 超过3次修改，强制结束
 else:
 return "revise" # → 返回写作节点修改

# ─── 构建工作流图 ─────────────────────────────────────────────
workflow = StateGraph(ResearchState)

# 添加节点
workflow.add_node("research",  research_node)
workflow.add_node("write",     write_node)
workflow.add_node("review",    review_node)
workflow.add_node("finalize",  finalize_node)

# 设置入口
workflow.set_entry_point("research")

# 添加边（定义流转逻辑）
workflow.add_edge("research", "write") # 调研 → 写作
workflow.add_edge("write", "review") # 写作 → 审阅

# 条件边：审阅后根据结果选择路径
workflow.add_conditional_edges(
 "review",
    should_revise,
 {
 "revise": "write", # 需要修改 → 回到写作
 "finalize": "finalize" # 通过审核 → 最终定稿
 }
)

workflow.add_edge("finalize", END)

# 编译并运行
app = workflow.compile()

result = app.invoke({"topic": "生成式 AI 对软件开发行业的影响", "revision_count": 0})
print(result["final_report"])</code></pre>


<a id="section-1884"></a>
## CrewAI 多 Agent 协作

<a id="t-sUejJwGeI1c2BF0GG85YAZ"></a>

<p id="t-tqevtc8GSx0Nhc4n496tz1"><span style="border-bottom:1px solid">CrewAI 通过定义角色和任务，让多个 Agent 像团队一样协作。</span></p>


<a id="section-1885"></a>
## 实例

<a id="t-Iw9ZE48BTyScrKztec5Pz6"></a>

<pre id="t-YZh7PkcwN0k35HKhHyB9we"><code>from crewai import Agent, Task, Crew, Process
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(model="gpt-4o")

# ─── 定义 Agent（角色） ────────────────────────────────────────
researcher = Agent(
    role="市场研究员",
    goal="收集并整理关于目标主题的全面、准确的市场信息",
    backstory="你是一位经验丰富的市场分析师，擅长从海量信息中提炼关键洞察",
    llm=llm,
    verbose=True
)

analyst = Agent(
    role="数据分析师",
    goal="基于研究员提供的信息，进行深度分析并得出有价值的结论",
    backstory="你擅长用数据说话，能发现隐藏在信息背后的趋势和机会",
    llm=llm,
    verbose=True
)

writer = Agent(
    role="报告撰写专家",
    goal="将分析结论撰写成清晰、专业、有说服力的报告",
    backstory="你有丰富的商业写作经验，能让复杂的分析变得易于理解",
    llm=llm,
    verbose=True
)

# ─── 定义 Task（任务） ────────────────────────────────────────
research_task = Task(
    description="调研中国新能源汽车市场的现状，包括主要品牌、市场份额、增长趋势",
    expected_output="一份包含 5 个关键数据点的市场调研报告，含数字和具体事实",
    agent=researcher
)

analysis_task = Task(
    description="基于调研报告，分析未来 3 年的机会与风险，给出投资评级建议",
    expected_output="SWOT 分析表格 + 投资评级（强烈推荐/推荐/中性/谨慎）+ 理由",
    agent=analyst,
    context=[research_task] # 依赖调研任务的输出
)

writing_task = Task(
    description="将调研和分析整合成一份 500 字的专业投资简报，格式清晰",
    expected_output="包含执行摘要、市场现状、机会风险、投资建议四个部分的简报",
    agent=writer,
    context=[research_task, analysis_task]
)

# ─── 组建团队并执行 ───────────────────────────────────────────
crew = Crew(
    agents=[researcher, analyst, writer],
    tasks=[research_task, analysis_task, writing_task],
    process=Process.sequential, # 顺序执行（也可改为 hierarchical）
    verbose=True
)

result = crew.kickoff()
print(result)</code></pre>


<a id="section-1886"></a>
## Human-in-the-Loop（人工审核节点）

<a id="t-ePXyidy8DJIHWC6vGtIKBc"></a>

<p id="t-AG63KjOnsOESattX3xfV7c"><span style="border-bottom:1px solid">LangGraph 支持在关键步骤暂停，等待人工确认后再继续执行。</span></p>


<a id="section-1887"></a>
## 实例

<a id="t-sIiQmS4tshNsCthKIpd98t"></a>

<pre id="t-j1c2W3YCMFJx0vXUMd9j6R"><code>from langgraph.graph import StateGraph, END
from langgraph.checkpoint.memory import MemorySaver
from typing import TypedDict

class EmailState(TypedDict):
    recipient: str
    content: str
    approved: bool

def draft_email(state: EmailState) -&gt; dict:
 """起草邮件"""
    content = f"尊敬的 {state['recipient']}，\n\n这是 AI 起草的邮件内容...\n\n此致"
 return {"content": content}

def send_email(state: EmailState) -&gt; dict:
 """发送邮件（高风险操作，需要人工审核后才执行）"""
 print(f"邮件已发送给 {state['recipient']}")
 return {}

# 路由：根据人工审核结果决定是否发送
def check_approval(state: EmailState) -&gt; str:
 return "send" if state.get("approved") else END

workflow = StateGraph(EmailState)
workflow.add_node("draft", draft_email)
workflow.add_node("send", send_email)
workflow.set_entry_point("draft")

# draft 完成后暂停，等待人工审核（interrupt_after）
workflow.add_conditional_edges("draft", check_approval, {"send": "send", END: END})
workflow.add_edge("send", END)

# 使用 MemorySaver 支持中断和恢复
memory = MemorySaver()
app = workflow.compile(
    checkpointer=memory,
    interrupt_after=["draft"] # 在 draft 节点后暂停
)

config = {"configurable": {"thread_id": "email-001"}}

# 第一次运行：执行到 draft 后暂停
state = app.invoke({"recipient": "客户A", "approved": False}, config)
print("草稿已生成，等待审核：")
print(state["content"])

# 人工审核后，更新状态并继续执行
user_input = input("\n是否批准发送？(y/n): ")
if user_input.lower() == "y":
    app.update_state(config, {"approved": True})
    app.invoke(None, config) # 从断点继续
 print("邮件已发送")
else:
 print("已取消发送")</code></pre>


<a id="section-1888"></a>
## Prompt 工程：Workflow 中的关键技巧

<a id="t-hwy9cZlt1KqpnpvfYOICoI"></a>

<p id="t-tG9WspAwoRQNGp7SUADDsp"><span style="border-bottom:1px solid">在 AI Workflow 中，Prompt 的质量直接影响每个节点的输出质量。</span></p>


<a id="section-1889"></a>
## 实例

<a id="t-AopLeIkDxALHqitwH1qnUV"></a>

<pre id="t-L4evOMHfuVFo8Pf8lDaJOD"><code># 模糊的角色定义
# system_prompt = "你是一个 AI 助手，帮我分析这份文档"

# 清晰的角色定义（推荐）
system_prompt = """
你是一位专业的财务分析师，专注于识别财务报告中的风险信号。
你的任务：从以下报告中提取所有涉及负债、现金流和盈利能力的关键数据点。
输出格式：JSON，包含 risk_level（high/medium/low）和 key_findings（列表）。
注意：只输出 JSON，不要添加任何说明文字。
"""</code></pre>


<a id="section-1890"></a>
## 实例

<a id="t-Z0RwCARrNheiAeRljx6fHt"></a>

<pre id="t-26y5NGJkgYBnPz02hiB62A"><code># 传递非结构化文本
# state["previous_output"] = "分析结果：这个公司看起来不错，有一些风险..."

# 传递结构化数据（推荐）
state["analysis_result"] = {
 "risk_level": "medium",
 "key_findings": ["负债率 45%，行业均值 38%", "现金流为正，Q3 环比下降 12%"],
 "recommendation": "谨慎持有"
}</code></pre>


<a id="section-1891"></a>
## 实例

<a id="t-Y6L4UGI9ykiFn3M8jmqcx7"></a>

<pre id="t-CR3v9ELAwMUaJ6q2kCPVdR"><code># 在 prompt 中强制要求 JSON 输出
prompt = """
请分析以下文本的情感倾向。
严格按照如下 JSON 格式输出，不要添加任何其他内容：
{
  "sentiment": "positive" | "negative" | "neutral",
  "confidence": 0.0-1.0,
  "reason": "简短说明"
}

文本：{text}
"""</code></pre>


<a id="section-1893"></a>
## 实例

<a id="t-6XJ6Z5iUeHv9J6seLb4D7W"></a>

<pre id="t-9oI5wabTXijsWy5JEBo98z"><code>from tenacity import retry, stop_after_attempt, wait_exponential
import logging

@retry(
    stop=stop_after_attempt(3), # 最多重试 3 次
    wait=wait_exponential(multiplier=1, min=2, max=10) # 指数退避等待
)
def call_llm_with_retry(prompt: str) -&gt; str:
 try:
        response = llm.invoke(prompt)
 return response.content
 except Exception as e:
        logging.error(f"LLM 调用失败：{e}")
 raise

def safe_parse_json(text: str) -&gt; dict:
 """安全解析 LLM 输出的 JSON"""
 import json, re
 # 提取 JSON 部分（LLM 有时会加多余的说明文字）
    json_match = re.search(r'\{.*\}', text, re.DOTALL)
 if json_match:
 try:
 return json.loads(json_match.group())
 except json.JSONDecodeError:
 pass
 return {"error": "解析失败", "raw": text}</code></pre>


<a id="section-1895"></a>
## 实例

<a id="t-9BTSmTAWfvHP6gKrY4cZh7"></a>

<pre id="t-GA2MEnX0Xm6wbqtDI1cPJY"><code># ─── 根据任务重要性选择模型 ────────────────────────────────
def get_llm(task_type: str):
 if task_type == "classification": # 分类任务，轻量模型足够
 return ChatOpenAI(model="gpt-4o-mini")
 elif task_type == "generation": # 生成任务，用中等模型
 return ChatOpenAI(model="gpt-4o-mini")
 elif task_type == "reasoning": # 复杂推理，用强模型
 return ChatOpenAI(model="gpt-4o")

# ─── 缓存重复请求 ──────────────────────────────────────────
from langchain.globals import set_llm_cache
from langchain_community.cache import InMemoryCache
set_llm_cache(InMemoryCache()) # 相同输入直接返回缓存，不重复计费

# ─── 文本分块避免超长 ──────────────────────────────────────
from langchain.text_splitter import RecursiveCharacterTextSplitter

splitter = RecursiveCharacterTextSplitter(
    chunk_size=2000, # 每块 2000 字符
    chunk_overlap=200 # 重叠 200 字符保证上下文连贯
)
chunks = splitter.split_text(long_document)</code></pre>


<a id="section-1896"></a>
## 典型应用场景

<a id="t-91dMUfpAwiWHY8zU9XqfBZ"></a>

<p id="t-tvY4xAi7z5SFFxQfcqfza6"><span style="border-bottom:1px solid">AI Workflow 已经在多个领域广泛落地，以下是六个最具代表性的场景。</span></p>

<div id="t-PCwkGeYUHvUsmal5kgQgo2"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/911735519389cd8b5e8b18ff.png"/></div>


<a id="section-1898"></a>
## 常见陷阱与解决方案

<a id="t-zyrX6YWP06GVoIbg2496za"></a>

<p id="t-rnfYKtbjKOORjLCYSQJ4RJ"><span style="border-bottom:1px solid">以下是初学者在使用 AI Workflow 时最容易遇到的问题。</span></p>

<div id="t-NiBo4dopYYNQomFco926JV"><table><colgroup><col width="120"/><col width="273.89752197265625"/><col width="267.0172119140625"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>陷阱</span></p></td><td style=" vertical-align: top"><p><span>现象</span></p></td><td style=" vertical-align: top"><p><span>解决方案</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">幻觉级联</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">前一步 AI 输出错误，被当成事实传给下一步，错误被放大</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">关键节点增加验证步骤；数值类信息用工具获取</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">无限循环</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">ReAct Agent 反复调用工具，不知道何时停止</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">设置 max_iterations；给 LLM 明确的终止条件</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">上下文爆炸</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">随着步骤增加，传入 LLM 的文本越来越长，超出窗口</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">每步只传必要字段；用摘要压缩历史信息</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">工具滥用</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Agent 明明可以直接回答，却反复调用工具</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">优化工具描述；给 LLM 明确说明何时不需要工具</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">JSON 解析失败</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">LLM 输出格式不稳定，程序崩溃</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">加 safe_parse_json；用 LangChain OutputParser</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">费用超支</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">未估算 token 用量，月底账单超预期</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">先用 gpt-4o-mini 测试；用 LangSmith 监控用量</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">并发冲突</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">多个 Agent 同时写同一个状态导致数据错乱</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">用 LangGraph 内置状态管理；避免共享可变状态</span></p></td></tr></tbody></table></div>


<a id="section-1900"></a>
## 核心知识点回顾

<a id="t-ByitdkXiS402EtOOuBiny8"></a>

<div id="t-x2AaVOZkoDUCgeA7CRHYS1"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/cae24d264ae8e812e3e8288a.png"/></div>


<a id="section-1901"></a>
## 推荐学习路径

<a id="t-qWR6wn6CQXOAovCEsqngn1"></a>

<p id="t-SlvB8hQmjXMQVAkUmlwyzJ"><span style="border-bottom:1px solid;font-weight:bold">第一阶段：理解基础（1 周）</span></p>

<ol start="1"><li id="t-lP6qiQr5wPeyxVjtQ9aJLq"><span>理解 LLM API 调用，能用 OpenAI SDK 发起请求</span></li></ol>

<ol start="2"><li id="t-Rb4sLzO3ePMS7iglz9BhUi"><span>跑通本文 LangChain 顺序链示例</span></li></ol>

<ol start="3"><li id="t-RMWUB7jBCVBzT5YIkPyzX7"><span>理解 Prompt Engineering 基本原则</span></li></ol>

<p id="t-SBkzEz6HnM8BUDDbwkAwLH"><span style="border-bottom:1px solid;font-weight:bold;background-color:#eafaf1">第二阶段：工具与 Agent（2 周）</span></p>

<ol start="1"><li id="t-rfMaBhtuCJvCYHfQCNhzGe"><span>学会用 @tool 装饰器定义工具</span></li></ol>

<ol start="2"><li id="t-5Vn2dOJ7d9VLGjAVlWflj8"><span>跑通 ReAct Agent 示例，观察 verbose 日志理解循环逻辑</span></li></ol>

<ol start="3"><li id="t-kcc2oOXTSRWTfoMyTVum3A"><span>用 Dify 或 n8n 搭建一个可视化 Workflow 原型</span></li></ol>

<p id="t-VJqrDrRKegEbWwD1JYzzJX"><span style="border-bottom:1px solid;font-weight:bold">第三阶段：复杂 Workflow（3 周）</span></p>

<ol start="1"><li id="t-1nTrB3NXtDrSDOGvTxq7Au"><span>学习 LangGraph 状态图，实现带条件分支的工作流</span></li></ol>

<ol start="2"><li id="t-w67Z4SDWC8ATngghpktCnc"><span>用 CrewAI 实现一个双 Agent 协作任务</span></li></ol>

<ol start="3"><li id="t-WJOMrQ9LOvGN8UU67lwMpo"><span>接入真实工具（Tavily 搜索、Python REPL）</span></li></ol>

<ol start="4"><li id="t-Glq4BmOzQTFI52inyIvbOG"><span>用 LangSmith 观测并调试你的 Workflow</span></li></ol>

<p id="t-4VYdS0FxlyTTN98ddNsYpr"><span style="border-bottom:1px solid;font-weight:bold">第四阶段：生产就绪（持续）</span></p>

<ol start="1"><li id="t-HlsvXg1FR0UKXbpvvMZ42E"><span>实现错误重试、结构化输出解析</span></li></ol>

<ol start="2"><li id="t-BPPzk4mI6l7RGHha6kqm59"><span>成本监控与优化（模型分级使用）</span></li></ol>

<ol start="3"><li id="t-JRKL7OLcar25G2M2gGWISE"><span>部署到生产，设置监控告警</span></li></ol>


<a id="section-1902"></a>
## 参考资源

<a id="t-Wi9AnRbMepzBxpV88eHU3j"></a>

<ul><li id="t-gurNWmAHHHCw7exBUpq34M"><span style="border-bottom:1px solid">LangChain 官方文档</span></li></ul>

<ul><li id="t-koupS88AQeXML72CJInwZ1"><span style="border-bottom:1px solid">LangGraph 文档</span></li></ul>

<ul><li id="t-PEeTr0fwXeyPigklDTEM7T"><span style="border-bottom:1px solid">LlamaIndex 文档</span></li></ul>

<ul><li id="t-SxMI9qmduNOWRnPHXNpufy"><span style="border-bottom:1px solid">CrewAI 文档</span></li></ul>

<ul><li id="t-tJBHqSQGvle7rvdaytZX9v"><span style="border-bottom:1px solid">Dify 开源平台</span></li></ul>

<ul><li id="t-PBmuVXsOqzRYr1Wzh6PIpK"><span style="border-bottom:1px solid">n8n 文档</span></li></ul>

<ul><li id="t-3AotHKb7lHaMUOifBiXDpF"><span style="border-bottom:1px solid">ReAct 论文（Reason + Act 模式的原始论文）</span></li></ul>

<ul><li id="t-4z5z33pCjoBQ7NWx2ZoeC6"><span style="border-bottom:1px solid">LangSmith 可观测平台</span></li></ul>

<ul><li id="t-BJb3EFyRhDWp9wnN3Q9WwM"><span style="border-bottom:1px solid">Anthropic AI Agent 最佳实践</span></li></ul>

