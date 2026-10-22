---
title: "第 15 章 · 评测与可观测性"
date: "2026-10-22"
draft: false
author: "学习资料整理"
description: "评测集、任务与轨迹指标、Judge、RAGAS、LangSmith 与追踪"
tags: ["Agent", "学习路线"]
categories: ["AI 工程"]
prerequisites: ["agent-learning-14-build-agent"]
verification: {"status": "not-run", "scope": "本次仅整理资料；示例代码与原文技术结论未复跑。"}
---

评测集、任务与轨迹指标、Judge、RAGAS、LangSmith 与追踪

[学习路线](/posts/agent-learning-route/) · [上一章](/posts/agent-learning-14-build-agent/) · [下一章](/posts/agent-learning-16-safety-reliability/)

本章按知识小节编排。项目内容作为学习案例阅读，示例代码与原文技术结论未在本次整理中执行验证。

## 本章目录

- [Agent评测](#section-0071)
- [Agent评估vs传统行业评估](#section-0072)
- [Agent评估全景图](#section-0073)
- [评测细节](#section-0074)
- [实战](#section-0075)
- [面试问题汇总](#section-0076)
- [视频讲解](#section-0077)
- [LangSmith概述](#section-1127)
- [创建账户](#section-1129)
- [创建 API 密钥](#section-1130)
- [更多构建方式](#section-1131)
- [工作流程](#section-1132)
- [创建账户和 API 密钥](#section-1133)
- [API 密钥](#section-1134)
- [创建 API 密钥](#section-1135)
- [删除 API 密钥](#section-1136)
- [配置 SDK](#section-1137)
- [在 SDK 之外使用 API 密钥](#section-1138)

<a id="section-0071"></a>
## Agent评测

<a id="f-doxcnqrKdVGPbNYY8Xm3Fr8NVkh"></a>

<p id="f-doxcntFsf7bqnSS5dPtzy7NPQEf"><span>本学习资料整理自四类资料：</span><span style="font-weight:bold">《AI Engineering》</span><span>、</span><span style="font-weight:bold">《AI Agents in Action》</span><span>、</span><span style="font-weight:bold">《Agentic Design Patterns》</span><span>，以及美团 LongCat 团队的 </span><span style="font-weight:bold">VitaBench</span><span> 论文与相关资料。整理完以后，我最深的感受是：</span><span style="font-weight:bold">Agent 评估没有一个放之四海而皆准的标准答案</span><span>。它必须结合</span><span style="font-weight:bold">具体业务场景来设计，业务目标不同、工具链不同、风险边界不同，评测指标和测试方式也会不同</span><span>。</span></p>

<p id="f-doxcn2k52N1kt9GcsI7kFy8Ghxe"><span style="font-weight:bold">Agent 评估本身也相当复杂</span><span>。一个项目如果真的要做一套非常健全的 Agent 评估体系，可能需要一小波人专门投入来设计评测集、指标、自动化 Pipeline、线上监控、红队安全测试和反馈闭环。现实里，很多企业项目对 Agent 评估这一块其实还没有非常健全，并不一定已经做到“用完善的测试指标指导开发”。我基于和面试官的沟通也有一个判断：绝大多数面试官会问 Agent 测试，但问得并不总是很深入，这也侧面说明很多团队自己对这块的体系化理解还在建设中。</span></p>

<p id="f-doxcnjndaDr17vSDw1P2x5A4z6b"><span>所以，本学习资料希望先帮你建立一个</span><span style="font-weight:bold">完整的大框架</span><span>：沿着 Agent 开发的生命周期去理解，在每个阶段哪些地方应该测、测什么、怎么测、有哪些常见方法。你顺着这个思路，就能把 Agent 测试和评估的大部分内容理清楚。</span></p>

<p id="f-doxcnUA8doLQCrSYh3JulU5brye"><span>每一个小的测试环节，我都根据参考资料总结了一些方法或思路。但还是要强调：这里没有绝对标准答案。真正落地时，应该结合你的业务、你的 Agent 架构、你的工具链和你的风险边界来设计。如果你希望面试回答听起来更贴近实践，而不是只停留在理论层面，可以把本节理论和你自己的项目结合起来想一遍：比如你的项目里应该如何评估工具调用、如何评估多 Agent 协作、如何设置上线前发布闸门、上线后如何监控质量。也可以把你的项目背景和这一节理论一起交给 AI，让它帮你总结成更贴合你项目的回答。</span></p>

<p id="f-doxcnOQeXDW16JUoU7oH31kocrd"><span>本学习资料希望你达到三个目的：</span></p>

<ol start="1"><li id="f-doxcnGR4MMILMHcYkmx2tFqUczg"><span style="font-weight:bold">先掌握理论框架</span><span>：理解 Agent 评估为什么复杂，以及它和传统软件测试有什么不同。</span></li></ol>

<ol start="2"><li id="f-doxcnZ96Vbdt7PCYLC6FIdjgUIc"><span style="font-weight:bold">能应对面试问题</span><span>：当面试官问到 Agent 评估、测试、上线监控、安全、成本延迟、多 Agent 协作时，你的回答能清晰、有条理、有深度。</span></li></ol>

<ol start="3"><li id="f-doxcnDYnZdHkTHJwh6iT1OYL4jd"><span style="font-weight:bold">能反推项目测试体系</span><span>：如果你真的想给自己的项目设计一套比较完善的评估流水线，本学习资料能帮你知道应该从哪些模块入手。</span></li></ol>

<p id="f-doxcnz9jdxrvJ3kCYDzrJT31qke"><span>最后再次强调，我仍然认为 Agent 评测是一个非常复杂、专业、且高度工程化的事情。如果想深入学习，可以自己再仔细阅读这四份参考资料，如果想更加偏向于学习实战，那么可以结合今天的理论，在自己项目去设计一个评估流水线。</span></p>

<p id="f-doxcnmXI8xZJeqFbO35T4SAOBHg"><span>自信地说，如果你能消化好本节笔记，对于绝大部分面试里涉及 Agent 评测的问题，已经足够应付，而且能答得比很多泛泛而谈的回答更完整，更有条理性。</span></p>

<blockquote id="f-doxcnjDxwsZTn0kLPiKjgbkVlbg"><p id="f-doxcnI4ZOJgw0T6J9Y0MXEdL88f"><span>本报告基于以下四份资料综合编写：</span></p>
<ul><li id="f-doxcntQJi3xISl2EyYZyKfDps0b"><span style="font-weight:bold">《AI Engineering》</span><span>（Chip Huyen, O'Reilly 2025）—— 评估方法论与工程体系</span></li></ul>
<ul><li id="f-doxcnOdd5D1KFlhCDegbsa4yhac"><span style="font-weight:bold">《AI Agents in Action》</span><span>（Michael Lanham）—— 评估的工具落地与动手实践（后面文章里我们把这个简称为实战书）</span></li></ul>
<ul><li id="f-doxcnIm24dCkDR9Lacfe5fJe8Hc"><span><span style="font-weight:bold"><a href="https://github.com/xindoo/agentic-design-patterns"><span>《Agentic Design Patterns》</span></a></span></span><span>（智能体设计模式）—— 评估作为设计模式与生产治理</span></li></ul>
<ul><li id="f-doxcnr5GF14QlJfVza1rzYduZxf"><span><span style="font-weight:bold"><a href="https://arxiv.org/abs/2509.26490"><span>美团 LongCat VitaBench</span></a></span></span><span>（ICLR 2026 / arXiv:2509.26490）—— 真实场景下的评测基准实战</span></li></ul>
<p id="f-doxcnBqFzJY2XvKyJTyPZon7yjg"><span>全文每个评测点均标注资料出处，便于追溯。</span></p>
<p id="f-doxcn9KlxShNcUZrPDbvZv9UIeh"><span>前面两本是书籍，没有找到在线观看的链接，如果想要看，可以自己购买书籍，或者电子资源。第三个是一本google的书籍，网上有免费阅读版本。最后一个是论文，也可以直接阅读，链接已经附上。</span></p></blockquote>


<a id="section-0072"></a>
## Agent评估vs传统行业评估

<a id="f-doxcnYlhN1fOEpQI6Gw4MgVWTKg"></a>

<a id="f-doxcnVMCijA7bV2IGkAfQwCN1si"></a>

##### 从TDD到EDD

<p id="f-doxcnEytNfmXH7wqyI3xMaEdm3e"><span>在传统软件里，测试是写完代码之后的一道工序；但在 Agent 系统里，</span><span style="font-weight:bold">评估本身就是开发的起点和方向盘</span><span>。</span></p>

<p id="f-doxcnABtna2pg7X5qY1XHpuCoNb"><span>《AI Engineering》提出了一个核心主张——</span><span style="font-weight:bold">评估驱动开发（Evaluation-Driven Development）</span><span>，它类比于测试驱动开发（TDD）：在你动手搭一个 Agent 之前，应该</span><span style="font-weight:bold">先把"怎么算成功"定义清楚</span><span>。原因很现实：大模型是概率性的，同样的输入两次运行可能给出不同结果，你无法像传统程序那样"读一遍代码就知道它对不对"，唯一能依靠的就是一套可量化、可重复的评估体系。</span></p>

<p id="f-doxcn5lUWEY9QApsXs08GRrZ0oK"><span>这本书甚至直言：</span><span style="font-weight:bold">"评估是 AI 工程中最难的问题"</span><span>，并用了整整两章（第 3、4 章）来讲它。换句话说，谁掌握了评估，谁才真正掌握了 Agent 的质量。评估的价值贯穿全生命周期：</span></p>

<div style="margin-left:25px"><div id="f-doxcnHAkME8j3pHIUIBQPXu6zfd" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">选型时</span><span>：靠评估在一堆模型里选出最合适的；</span></div></div><div id="f-doxcn9LRfXs9DUZH1WNqwLPSGDU" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">开发时</span><span>：靠评估判断每次改动是变好还是变坏；</span></div></div><div id="f-doxcny7Stk7D2uwxU2DhMLBPWMe" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">上线时</span><span>：靠评估做 A/B 测试、灰度放量；</span></div></div><div id="f-doxcnuwmjzMlOSn1wHW9ZwnKsUe" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">生产时</span><span>：靠评估（监控）发现线上退化、漂移和安全问题。</span></div></div></div>

<blockquote id="f-doxcnm2GaFqvYE2Rb8CuZesUkEe"><p id="f-doxcnLetiyAvkin1SG7s2fJDngP"><span>一句话：在 Agent 时代，</span><span style="font-weight:bold">评估不是质检环节，而是研发的指南针</span><span>。</span></p>
<p id="f-doxcnQFbQpVDHjodqP9uJ3GJH5C"><span>💬 </span><span style="font-weight:bold">【面试卡片】</span><span style="font-weight:bold">Q：TDD 你了解过吗？你自己用 TDD 做过完整开发吗？</span><span>（这个题目是</span><span style="font-weight:bold">202606社招 雄帝科技Agent二面的题目</span><span>，是粉丝朋友在小红书上分享面试题。本篇所有笔记几乎就是在讲TDD，想告诉大家的是如果学好了这篇笔记，如果问到TDD的内容你就可以引经据典了）</span></p>
<p id="f-doxcnlAN7v2B1a9Z0Uwttv0jmjg"><span style="font-weight:bold">A：</span><span> TDD 我了解，也实践过。传统 TDD 就是测试先行：先写测试用例让它失败，再写最小代码让它通过，然后重构，靠测试来驱动设计，而不是写完再补测试。不过在 Agent 项目里它没法直接照搬，因为大模型是概率性的、输出又是开放式的，同一个输入跑两次结果都可能不一样，没法像传统代码那样断言"输出等于期望值"。所以本案例用的是它在 Agent 时代的升级版——评估驱动开发（EDD），内核和 TDD 一样：动手之前先把"怎么算成功"定义清楚，再用一套可量化、可重复的评估来驱动每次改动，只是"断言相等"换成了打分、相似度、通过率这类度量。</span></p>
<p id="f-doxcnMeDOySwz75kOPHiDyvXYSd"><span>具体落地，我是顺着三个阶段做的。第一个阶段是模型确定，先选对地基模型：用成本、延迟、隐私这些硬约束把候选缩小，再用业务私有数据集做终筛，避免被公开榜单的数据污染带偏。第二个阶段是开发阶段，这一段最能体现 TDD 的思想——可以先把各个环节怎么评估定清楚，再去搭 Pipeline。先做组件级评测，把 Prompt、RAG、工具调用、规划推理各自的失败模式逐个测出来；再做集成级评测，用端到端成功率、轨迹评测、多轮对抗、多 Agent 协作验证整机能不能稳定完成任务；等这些维度的测法和指标都定清楚了，我才把评测集和评估 Pipeline 一起组装出来，并设一道发布闸门，质量、延迟、成本、安全都过线才能上。第三个阶段是上线，把同一组指标搬到真实流量里持续监控，做 A/B 灰度、盯漂移和成本安全告警，一旦发现新问题就回灌评测集重新跑回归。</span></p>
<p id="f-doxcnMc1zHyrAe2NZymPDT57zsC"><span>总结来说，传统 TDD 本案例用过，在 Agent 里本案例用它的升级版 EDD，把评估贯穿到模型确定、开发、上线这三个阶段——尤其在开发阶段是先把各环节怎么评估定清楚、再组装 Pipeline 和发布闸门，让评估全程驱动开发，而不是事后补测。</span></p>
</blockquote>

<a id="f-doxcnqAcUC54t6IHtOcj0bdYQkd"></a>

##### Agent评估和传统评估的不同

<p id="f-doxcnddOgbLGqti9vS4yLXapB7c"><span>为什么不能拿传统软件测试那一套来测 Agent？四份资料从不同角度指出了同一件事：</span><span style="font-weight:bold">Agent 打破了传统测试赖以成立的前提</span><span>。可以从五个维度看清两者的根本差别：</span></p>

<div style="margin-left:25px"><div id="f-doxcnUsVb1XPafen8UHHiALruxg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">确定性</span><span>：传统软件测试同样输入必得同样输出、可断言相等；Agent 评测则是概率性输出，同一输入多次结果不同。</span></div></div><div id="f-doxcnP71B3UrPD2iSsQ2uWRt6cg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">任务性质</span><span>：传统测试是封闭式（close-ended），输出落在预定义值域内（如分类只能输出有限的几个类别）；Agent 评测是开放式（open-ended），同一输入有无数种可能的正确回答。</span></div></div><div id="f-doxcnQ0yeOSTtGjm3ecBLcnzhad" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">判定方式</span><span>：传统测试有唯一/可枚举的标准答案，把输出与它比对、相等即对（可自动断言）；Agent 评测无法枚举所有正确答案，只能用打分、相似度、通过率去度量"好不好"。</span></div></div><div id="f-doxcne7rS55XRxoPENwQPtPUzCh" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">评测对象</span><span>：传统测试看单个函数的返回值；Agent 评测看一条多步"轨迹"：规划→调工具→观察→再规划。</span></div></div><div id="f-doxcnDfYnlG458NtUNE01OdLbFg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">失败形态</span><span>：传统测试的失败是抛异常、返回错值；Agent 的失败是工具用错、目标跑偏、自以为完成、绕圈子……</span></div></div></div>

<p id="f-doxcnMcJL0fknDJsKb9GOYdp1Dg"><span>最关键的一条是：</span><span style="font-weight:bold">传统测试断言"输出 == 期望值"，而 Agent 的输出根本无法这样断言</span><span>。《Agentic Design Patterns》明确指出，正因为 Agent 是非确定性的，传统"通过/失败"的测试不足以保证可靠性，必须转向"对效能、效率、合规做持续测量"的思路。</span></p>

<div id="f-doxcn4XMY2XjflFXOh3XOkJmWad"><img alt="" decoding="async" height="853" loading="lazy" src="/images/agent-learning/f9ceac3c4f0b9bef11ea6f80.png" width="1280"/></div>

<blockquote id="f-doxcnb5DPoCIYeyAfwVprFwKhGb"><p id="f-doxcnc1pNrxmFd51EGemLWeipXb"><span>💬 </span><span style="font-weight:bold">【面试卡片】</span><span style="font-weight:bold">Q：你觉得 Agent 行业的测试和传统行业有哪些不同？</span></p>
<p id="f-doxcnru95Jwb1GD7HnT38IWrINc"><span style="font-weight:bold">A：</span><span> Agent 的测试和传统软件测试有几个根本不同。</span></p>
<p id="f-doxcnxrPjTINdQckBeuwaEXSQje"><span style="font-weight:bold">第一，确定性不同</span><span>：传统软件同样的输入必然得到同样的输出，可以直接断言"输出等于期望值"；而 Agent 是概率性的，同一个输入多次运行结果都可能不一样，没法这样断言。</span></p>
<p id="f-doxcn4EJz1PxWzbPJbdcZ6BERsc"><span style="font-weight:bold">第二，任务性质不同</span><span>：传统软件多是封闭式（close-ended）任务，输出只能落在预定义的值域里，有唯一或可枚举的标准答案，可以直接拿输出和标准答案比对、相等就算对；而 Agent 是开放式（open-ended）任务，同一个输入有无数种可能的正确回答，无法列出一份完整的标准答案来比对，所以只能用打分、相似度、通过率这类方式度量"好不好"，而不是简单地判"对不对"。</span></p>
<p id="f-doxcnM9bVD6pPVE3xb0JhH3D9xH"><span style="font-weight:bold">第三，评测对象不同</span><span>：传统测试看的是单个函数的返回值，而 Agent 要看的是一条"规划→调用工具→观察→再规划"的多步轨迹。</span></p>
<p id="f-doxcnARTxLJ4wcockIWMo55Ym2d"><span style="font-weight:bold">第四，失败形态不同</span><span>：传统软件的失败是抛异常或返回错值，而 Agent 的失败是用错工具、目标跑偏、自以为完成、绕圈子等。归根到底，传统测试能拿输出和标准答案断言"相等即对"，而 Agent 开放式输出列不出标准答案，所以必须从"通过/失败"转向对效能、效率、合规的持续度量。</span></p></blockquote>

<a id="f-doxcnppGuwgBVPJxCoP0mR1uqzf"></a>

##### Agent评估5大困境

<p id="f-doxcnoHUhqR7UyhFoZFKJxvQUKN"><span>综合四份资料，Agent 评测之所以难，集中在五个"坑"上。这五条建议在面试里能直接说出来：</span></p>

<ol start="1"><li id="f-doxcnDQANNDvPScnCGjteDwCtYf"><span style="font-weight:bold">非确定性，传统 pass/fail 失效。</span><span> 同一输入多次运行结果不同，无法用"等于期望值"来判定对错。</span></li></ol>

<ol start="2"><li id="f-doxcnR3GGzvz1rQOAT2qKmEpCdi"><span style="font-weight:bold">不能只看结果，要看"会怎么失败"。</span><span> 《AI Engineering》提出一个关键视角：</span><span style="font-weight:bold">评估 Agent = 识别它的失败模式，并量化每种失败发生的频率</span><span>。一个 Agent 可能最终答对了，但中间用错了工具、绕了远路——只看结果会漏掉这些。</span></li></ol>

<ol start="3"><li id="f-doxcn8SBtZKqRBdRjaXXdvpKdAb"><span style="font-weight:bold">失败面更多、更新。</span><span> Agent 比单纯的 LLM 多出了规划、工具调用、多轮交互、多智能体协作等环节，每个环节都是新的失败来源。任务越复杂，失败点越多。</span></li></ol>

<ol start="4"><li id="f-doxcnoJcuioQu8EWUtpaCqtKNj4"><span style="font-weight:bold">Benchmark 会被"污染"，榜单不可尽信。</span><span> 公开 benchmark 的题目可能已经混进了模型的训练数据（数据污染 / contamination），导致分数虚高。选型时不能只看排行榜名次。</span></li></ol>

<ol start="5"><li id="f-doxcnrG1kguwwgSCU288ReC6kqe"><span style="font-weight:bold">"裁判"本身也有偏见。</span><span> 现在普遍用 LLM 给 Agent 打分（LLM-as-a-judge），但《AI Engineering》系统揭示了裁判模型自身的偏差：</span><span style="font-weight:bold">自我偏好</span><span>（偏向自己生成的答案）、</span><span style="font-weight:bold">首位偏差</span><span>（偏向排在前面的选项）、</span><span style="font-weight:bold">冗长偏差</span><span>（偏向更长的回答）。还有一条警告——</span><span style="font-weight:bold">比较式评估里"偏好 ≠ 正确"</span><span>：人类投票选出的"更喜欢"，不等于"更正确"，如果投票者不是内行，甚至会把 Agent 训练成"讨好型"而非"正确型"。</span></li></ol>

<blockquote id="f-doxcnKy4liKZ3qZO5JCLIVq4Y9d"><p id="f-doxcnHBM2h79dqcIIBcbX5ZR3Pd"><span>这五条困境，正是后面所有评测方法要去解决的问题。可以把它们当成贯穿全文的"问题清单"。</span></p>
<p id="f-doxcnjLYYPxPaFizYVMoN4Ehwmh"><span>💬 </span><span style="font-weight:bold">【面试卡片】</span><span style="font-weight:bold">Q：Agent 行业的测试面临着哪些困难？</span></p>
<p id="f-doxcn04a4ZwQUWWR5bMc0aQz8hd"><span style="font-weight:bold">A：</span><span> Agent 测试主要面临五大困难。</span></p>
<p id="f-doxcnZkpXkzuXpNQYku8BAOyHOd"><span>第一，非确定性导致传统的"通过/失败"判定失效，同一输入多次运行结果不同，无法用"等于期望值"来判对错。第二，不能只看最终结果，还要看它"会怎么失败"——评估 Agent 本质上是识别它的失败模式、并量化每种失败发生的频率，因为一个 Agent 可能答对了，但中间用错了工具、绕了远路。</span></p>
<p id="f-doxcnbMC26QzzTtwRKeqcnORWCD"><span>第三，失败面更多也更新，Agent 比单纯的大模型多了规划、工具调用、多轮交互、多智能体协作等环节，每一个都是新的失败来源，任务越复杂失败点越多。</span></p>
<p id="f-doxcnm07ShutKlnrSVI0tbSa5Mb"><span>第四，公开 benchmark 会被数据污染，测试题可能已经混进了训练数据导致分数虚高，所以选型时不能只看排行榜名次。</span></p>
<p id="f-doxcnc2503lftJkab5mtote5fme"><span>第五，用来打分的"裁判"本身也有偏见，LLM-as-a-judge 存在自我偏好、首位偏差、冗长偏差，而且比较式评估里，“偏好”不等于“正确”：人类投票选出的“更喜欢的回答”，不一定是事实更准确、任务完成得更好的回答。如果评审者</span></p>
<p id="f-doxcnz2G8JF7CpSClxEdJwEDMPf"><span>总结来说，Agent 测试的难点不仅是判断最终结果对不对，还包括衡量多次运行的稳定性、识别执行过程中的失败模式，以及保证评测数据和评判标准本身可信。</span></p></blockquote>


<a id="section-0073"></a>
## Agent评估全景图

<a id="f-doxcncvi4i7HA7qJpEKdHAmBRjh"></a>

<p id="f-doxcnjjvzfWeI8xKzgc8UsXDOqK"><span>在深入每一种具体的评测方法之前，我们先建立一张“评测全景地图”，让你直观地看清：</span><span style="font-weight:bold">一个 Agent 从立项、开发到上线运行，评测到底分布在哪些环节？</span></p>

<p id="f-doxcnA0KZpqtrpjiqWQt8FeQSpb"><span>本章是全篇报告的“指引篇”──它先明确解答“哪里要测”</span><span style="font-weight:bold">，第 3.3 章再对仗讲清楚</span><span>“怎么测”。</span></p>

<a id="f-doxcnMEegDymmgZTKEIVHewu5jf"></a>

##### 一条主线

<p id="f-doxcnUCV5a7pReK8E6w4X03EJgw"><span>为什么评测会散布在开发的每一个角落？《AI Engineering》在第 1章极富洞见地指出，评测之所以贯穿始终，是因为要达成以下 </span><span style="font-weight:bold">四个核心目的</span><span>：</span></p>

<pre id="f-doxcntmeevgMuvpSFF6xNk298Vb"><code>① 挑选模型 ───→ ② 标记进展 ────→ ③ 决定上线 ───→ ④ 生产监控
 (选型期)         (开发期)          (发布期)         (运行期)</code></pre>

<p id="f-doxcnAU3IaSILBgA4Pl3JI5Kvpc"><span>这些目的恰好落在开发时间线的不同位置上，把它们半闭环地串联起来，就是一条</span><span style="font-weight:bold">完整的评测生命周期</span><span>。</span></p>

<p id="f-doxcnRG4szns1Pon4ZaF2No9Yq0"><span>这本书还有一个更根本的主张，被称为：</span></p>

<blockquote id="f-doxcnGH7VYuYBEfuXazYJjy96Jo"><p id="f-doxcnzF8XGZ5QIjXA6OEwsBq6og"><span>💡 </span><span style="font-weight:bold">核心观点：评估驱动开发（Evaluation-Driven Development）</span><span> 在你动手搭建一个 Agent 之前，</span><span style="font-weight:bold">必须先定义“怎么才算成功”</span><span>。类比于传统软件的测试驱动开发（TDD），</span><span style="font-weight:bold">先定义评估标准，再动手开发；待各维度测法清晰后，再把它们组装成可自动运行的评估 Pipeline。</span></p></blockquote>

<p id="f-doxcn2e8u6PQx9Z2PcCeB8c8haf"><span>因此，评测决不是开发末尾临时拥抱的防黑天鹅工序，而是一路延续到下线的主航道。其余三份资料也各自深度呼应了这条“评估主线”：</span></p>

<ul><li id="f-doxcnn6dwhICsaaWvuv1YvJaNgg"><span style="font-weight:bold">《Agentic Design Patterns》</span><span>：强调评估要“贯穿到线上生产监控，并最终沉淀为可问责的工程治理”；</span></li></ul>

<ul><li id="f-doxcnNhaPaMGhdeMu7f0ztLZb7d"><span style="font-weight:bold">《AI Agents in Action》</span><span>：直接把“评估”做成了与推理、记忆、规划并列的 </span><span style="font-weight:bold">Agent 四大核心组件</span><span>之一；</span></li></ul>

<ul><li id="f-doxcnsNDNRhrx1Aw8tgvSUCcL1c"><span style="font-weight:bold">美团龙猫</span><span>：示范了如何将这套系统性评估思想凝结成一个真实场景下的生活服务评测基准（VitaBench）。</span></li></ul>

<a id="f-doxcngCjbV7Q93g36GX6tU9VLke"></a>

##### 上线前验证 → 上线后监控

<p id="f-doxcnxzoWtBqigQcQl4vP8wW6O4"><span>沿着真实交付生命周期，评测不应该简单分成"开发期测质量、上线后测稳定和安全"。更准确的分法是两层：</span></p>

<ul><li id="f-doxcn0zMDm7WlVvn3g87X2p6A5e"><span style="font-weight:bold">上线前验证</span><span>：用离线评测集、仿真环境、压测、红队用例和发布闸门判断"能不能上线"；</span></li></ul>

<ul><li id="f-doxcnzR0aqRSgu29TE5e0RrcCvd"><span style="font-weight:bold">上线后监控</span><span>：用真实流量、日志、trace、metrics、用户反馈判断"上线以后有没有退化、漂移、成本失控或被攻击"。</span></li></ul>

<p id="f-doxcnbohThzrI8Lt6JgttVRQjle"><span>成本、效率、延迟、安全、合规不是生产期才出现的指标，而是</span><span style="font-weight:bold">横向贯穿两层</span><span>：上线前它们是准入门槛，上线后它们是持续监控项。</span></p>

<p id="f-doxcns8jKAiJkqPFa1O8J1FLhTc"><span>下面按这条主线，逐一穿透每个阶段测什么、对应第 3.3 章哪一节：</span></p>

<div id="f-doxcnwQGdkWjlKroprf91GhbHDb"><img alt="" decoding="async" height="853" loading="lazy" src="/images/agent-learning/2f09b859bd77d46cffd88810.png" width="1280"/></div>

<p id="f-doxcnMIboVU456wCT5tg1WIVX4d"><span style="font-weight:bold">🛠️ 贯穿全程的「通用武器库」（对应 §3.3.1）</span></p>

<p id="f-doxcnsE7IHtoIoBpQNz9i5uoBth"><span>在探讨具体阶段前，必须先掌握三件"通用武器"（LLM-as-a-judge、比较式评估、基础度量）。它们没有固定归属，而是在模型选型、组件调试、发布闸门和生产监控里被反复调用。</span></p>

<p id="f-doxcnYLCvtBPoExmv9De4mv6KPb"><span style="font-weight:bold">✅ 上线前验证：回答"能不能上线"（对应 §3.3.2 ~ §3.3.6）</span></p>

<p id="f-doxcn2EeDiwvYZTrXpUEC0Sqljf"><span>上线前不是只测"答案对不对"，而是要把模型、组件、整机、资源消耗和安全红线一起放进发布闸门。</span></p>

<ul><li id="f-doxcnYwRYPCDCWEI0CszcAkf7gc"><span style="font-weight:bold">选型期：挑对地基模型（对应 §3.3.2）</span><br/><span>公开榜单只作粗筛；用 License、限价、延迟、隐私等硬约束缩小候选池；最后用业务私有数据集终筛。这里已经要看成本和延迟，不能等上线后才发现用不起、太慢。</span></li></ul>

<ul><li id="f-doxcnxw9ZUx8HsDKO98vzgarDgd"><span style="font-weight:bold">开发期前置标准：先定义"怎么算好"（对应 §3.3.3）</span><br/><span>按《AI Engineering》的四类标准圈定方向：领域能力、生成能力、指令遵循、成本与延迟；同时补上 Agent 项目必须有的安全/合规红线。</span></li></ul>

<ul><li id="f-doxcnnMNT2uYYNJqf7r4MfzxQsb"><span style="font-weight:bold">组件评测：逐个测零件（对应 §3.3.4）</span><br/><span>Prompt、RAG、工具调用、规划推理分别隔离评估。Prompt 安全、RAG 忠实度、工具乱调、规划绕路，都属于上线前必须暴露的问题。</span></li></ul>

<ul><li id="f-doxcnPBeDNzQv1IGwxK8r72Chrf"><span style="font-weight:bold">系统评测：测整机能不能稳定完成任务（对应 §3.3.5）</span><br/><span>用端到端成功率、轨迹评测、多轮用户模拟、多 Agent 协作评测，检查系统整体可靠性。效率也在这里进入评分：步数过多、绕远路、超时，不能算真正可用。</span></li></ul>

<ul><li id="f-doxcn1pYghG1QETeYA1Cqy4S2gg"><span style="font-weight:bold">评测集 + Pipeline + 发布闸门（对应 §3.3.6）</span><br/><span>把前面各维度的测法组装成可自动回归的评估流水线，并设上线阈值：质量分、Pass^k、P95 延迟、token/成本预算、最大步数、安全红队通过率、误拒率等。</span></li></ul>

<p id="f-doxcn6nUoD0kFCRDDQnix8WERch"><span style="font-weight:bold">📡 上线后监控：回答"真实流量下有没有变坏"（对应 §3.3.7）</span></p>

<p id="f-doxcnBviW33rEUxeQzAM9ZNPfig"><span>上线不是开始测试成本和安全，而是把上线前已经定义好的指标迁移到真实流量里持续观测。</span></p>

<blockquote id="f-doxcnIsY4YKlKIf5HnbdCivmjxb"><p id="f-doxcnhFhXRscwq2uGwKS3M7HpFc"><span>🎯 </span><span style="font-weight:bold">警言：监控的目标和评估的目标，本质上是同一个。</span><span> 区别在于：上线前主要用准备好的数据、仿真和压测；上线后用真实用户流量、日志、trace、metrics 和反馈。</span></p></blockquote>

<ul><li id="f-doxcnsolh2vfzgYOAVtj2bCglsf"><span style="font-weight:bold">A/B 测试与灰度发布</span><span>：小流量分发，用留存率、转化、满意度、投诉率等线上业务指标作终审，并设置回滚线；</span></li></ul>

<ul><li id="f-doxcnXU6W7tN910VkwcH6vaJchc"><span style="font-weight:bold">监控与可观测性</span><span>：用 logs、traces、metrics 记录每次运行，并在这套观测底座上持续监控质量、漂移、异常、成本、延迟、安全和合规。</span></li></ul>

<p id="f-doxcni8Duej5kzbBbUOaGVote9e"><span>把两层主线连起来读，就是一个 Agent 评测的完整故事：</span></p>

<blockquote id="f-doxcnBpNGFFJs5cYnMzLOdeynbe"><p id="f-doxcnZ964HtDBAYjiLLVtq6ZOtd"><span>💡 </span><span style="font-weight:bold">全景流串联：</span><span style="font-weight:bold">上线前先把"能不能上线"测透</span><span>：选模型 → 定成功标准 → 测组件 → 测整机 → 组装评测集和 Pipeline → 用质量、成本、延迟、效率、安全、合规做发布闸门；</span><br/><span style="font-weight:bold">上线后再把同一组指标搬到真实流量里持续监控</span><span>：A/B 灰度 → logs/traces/metrics → 漂移和异常检测 → 成本/延迟/安全告警 → 回灌评测集重新回归。</span></p></blockquote>

<blockquote id="f-doxcnZqnaEEM10C6nbgZgybEmIb"><p id="f-doxcnHcmN32elBQklBjqk6ti9Pg"><span>💬 </span><span style="font-weight:bold">【面试卡片】</span><br/><span style="font-weight:bold">Q：你认为在 Agent 系统中，应该测试/评估哪些东西？</span></p>
<p id="f-doxcnuo8LfHBjdsALnOFuaJMYoc"><span style="font-weight:bold">💡 答题思路：</span><br/><span>先以“Agent 系统与传统软件的根本不同（如概率性、开放式输出、无唯一标准答案）”作为宏观背景切入，说明为什么无法靠单一测试满足要求。接着，不要把"成本/延迟/安全"误归成上线后才测，而要按 </span><span style="font-weight:bold">上线前验证 → 上线后监控</span><span> 展开：上线前它们是发布闸门，上线后它们是持续监控项。重点把开发期的次序讲清——</span><span style="font-weight:bold">真正前置的只有一份轻量的"成功标准清单"，而评测集和评估 Pipeline 要等组件、集成各维度怎么测定完，才一起组装出来</span><span>（因为评测集的标注依赖这些指标）。</span></p>
<p id="f-doxcnZZ8p9GgIas9tNV6GGFRgGg"><span style="font-weight:bold">👨‍💻 标准回答：</span><br/><span>在 Agent 系统中，由于大模型天然是概率性的、且其输入输出是开放性的，我们没有办法像传统软件那样依靠唯一的标准答案进行 </span><span><span><span>assert</span></span></span><span> 断言。因此，Agent 系统不能采用单纯的“黑盒通过性测试”，而是需要将评估与测试融入到</span><span style="font-weight:bold">整个开发的生命周期中</span><span>。我会按 </span><span style="font-weight:bold">上线前验证</span><span> 和 </span><span style="font-weight:bold">上线后监控</span><span> 两层来组织：</span></p>
<ol start="1"><li id="f-doxcnPevQi0NDjcnCy3FLp3A1iM"><span style="font-weight:bold">【选型期·模型自身评测】</span><span>：挑选合适的地基大模型。我们会使用硬性约束（如成本、延迟、隐私等）进行初筛，然后再使用业务私有数据集对模型的推理和专项能力进行终审测试，防止公开榜单的“数据污染”虚高。</span></li></ol>
<ol start="2"><li id="f-doxcnYSfkVhVNFiRtx4teUFs4Ah"><span style="font-weight:bold">【开发期·组件级评测（零件测试）】</span><span>：对构成 Agent 的核心零件进行独立单测，核心是识别各组件特有的失败模式。这里主要包含四大零件的测试：</span><span style="font-weight:bold">Prompt</span><span>（测试鲁棒性）、</span><span style="font-weight:bold">RAG检索</span><span>（测试召回与回答忠实度）、</span><span style="font-weight:bold">工具调用</span><span>（测试调错率与填参率）和</span><span style="font-weight:bold">规划推理</span><span>（测试反思与多步规划）。</span></li></ol>
<ol start="3"><li id="f-doxcn6QyFrueKTCfFjyq0jGuChb"><span style="font-weight:bold">【开发期·集成级评测（整机测试）】</span><span>：把零件拼装起来，对 Agent 作为整机端到端表现开展高压集成测试。主要包括：任务最终端到端成功率（通过高压 Passk^</span><span style="font-style:italic">k</span><span> 指标测试稳定性）、关键工具行动路径对齐的轨迹评测（Trajectory）、引入用户模拟器的多轮对抗鲁棒性测试、以及多智能体协作时的分工损耗及协同效率评估。</span></li></ol>
<ol start="4"><li id="f-doxcnIJPdIRSwT44h8aTZtoKQIg"><span style="font-weight:bold">【上线前·组装评测集 + 评估 Pipeline + 发布闸门】</span><span>：当上面组件、集成各维度"怎么测、用什么指标"定完，才把</span><span style="font-weight:bold">评测集</span><span>与</span><span style="font-weight:bold">评估 Pipeline</span><span> 一起组装出来——先据这些指标标注评测数据集（单测 </span><span><span><span>test file</span></span></span><span> + 全场景回归 </span><span><span><span>evalset</span></span></span><span>），再选打分法、绑定业务北极星指标、设定可用阈值。发布闸门不只看质量，还要看 P95 延迟、token/成本预算、最大步数、安全红队、提示注入、误拒率等。</span><span style="font-weight:bold">之所以放在最后，是因为评测集每条样本的期望输出/评分标准，正是用前面各维度的指标标注的——指标先行，数据才有依据。</span></li></ol>
<ol start="5"><li id="f-doxcnIGekYpdhDkdHn47BxTJi6u"><span style="font-weight:bold">【上线后·真实流量监控】</span><span>：</span></li></ol><div id="f-doxcnmt1y0oOnoM7mQepinxyMKc" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>上线时，采用 </span><span style="font-weight:bold">A/B 测试 / 灰度发布</span><span>分流，用线上真实业务指标进行版本裁决，并设置回滚线。</span></div></div><div id="f-doxcnuDso7q5ZxWxWtJS9njf9hh" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>上线后，建立以 Logs、Traces、Metrics 为核心的 </span><span style="font-weight:bold">可观测性系统</span><span>，持续监控质量漂移、异常行为、TTFT/TPOT、token 成本、工具循环、越狱/提示注入攻击、guardrail 触发率、误拒率和合规审计记录。</span></div></div>
<p id="f-doxcnBVSwUbJ3EukwCORICd3sZJ"><span>总结来说，Agent 的测试并不是单一指标能解决的，它是由“上线前验证发布闸门”和“上线后真实流量监控”共同构成的</span><span style="font-weight:bold">全生命周期闭环评估网络</span><span>。成本、效率、延迟、安全、合规都不是上线后才测，而是上线前先验收，上线后持续盯。</span></p></blockquote>

<p id="f-doxcnbvXqhkz9OGdFbX9YaP1kGb"><span>越往后走，评测的场景便越具体，直接接触生产中极易在 Edge Cases 上坍塌的“深水区”。</span><span style="font-weight:bold">接下来的章节，就把这条主线上的每个环节逐一摊开，讲清每一处"怎么测、用什么工具"。</span></p>

<a id="f-doxcnl7CdcqYRPmq47v9BfrNtNg"></a>

##### 评估体系的质量与数据分布

<p id="f-doxcnBxO16QbE5wM2Fqup7Zpk2f"><span>前面我们讲了，我们需要构建一个黄金测试集，一个评估标准来评价开发过程中的各个环节。</span><span style="font-weight:bold">通过测试来指导开发</span><span>。</span></p>

<p id="f-doxcnT3C3d6ZT0ytwmXoGy22vl1"><span>但是黄金测试集和评估标准的方法，需要</span><span style="font-weight:bold">准确，科学</span><span>。才能正确指导我们后续的开发。要保证本身这个测试系统的准确性，我们需要从两个维度思考:</span></p>

<p id="f-doxcnwF6RbZiyYBFSomgmpIyNNf"><span>1. 我们的</span><span style="font-weight:bold">评估体系本身是否科学</span><span>，能够反应数据集的好坏？</span></p>

<p id="f-doxcn61sF1sZMSiP0u0d9QugZnd"><span>2. 我们准备的黄金数据集，</span><span style="font-weight:bold">比例，分布是否合理，是否具有代表性</span><span>？</span></p>

<p id="f-doxcnT3eYSDS6F0pTwfFvDCcjqf"><span>（温馨提示：这个小节的内容，是我在整理2026年9月阿里淘天秋招实习时，从本次面试中抠出来的考点，并补充到我们评测章节的笔记中的）</span></p>

<a id="f-doxcnZYhnHY2GS6H9skqz2DVeLn"></a>

###### 如何判断评估体系的好坏

<p id="f-doxcnQZ69pvW4ntMp9nA6uxOpMd"><span>这一部分关注评价标准和打分方法本身：能否正确评价 Agent 的表现，结果是否稳定、是否受无关因素影响，以及评估是否实用、可追溯。可以从以下六个方面判断；测试集的分布在第二部分单独讨论。</span></p>

<p id="f-doxcnYrXV1LwpIu4608OaeYXtdg"><span style="font-weight:bold">1. 有效性与判断正确性：测得对不对</span></p>

<p id="f-doxcnB8Xw22La9nMOo8GyKn3mdd"><span>评估指标要</span><span style="font-weight:bold">真正反映我们关心的能力</span><span>，评估结果也应</span><span style="font-weight:bold">与可信的人类判断或标准答案基本一致</span><span>。</span></p>

<p id="f-doxcnXjRAApYCUGFUZBOSy4ZIR9"><span>以 Agent 评测为例，不能只看最终回复是否流畅，还要看</span><span style="font-weight:bold">任务是否完成、工具是否调用正确、结果是否真实可用</span><span>。</span><span style="font-weight:bold">分数提高，应当意味着 Agent 的实际表现确实变好</span><span>。</span></p>

<p id="f-doxcn3XCb8dPOpJKnZ6F5dsc7Bg"><span style="font-weight:bold">2. 区分能力：能否正确区分不同质量</span></p>

<p id="f-doxcnJhf9mbHg9nyWEVA4wemxJe"><span>评估系统的打分需要</span><span style="font-weight:bold">具有区分度</span><span>。</span></p>

<p id="f-doxcnHEf7u3di9UXgXR751SZVCc"><span>例如，以coding agent为例，正确修复了问题，没有引入回归的例子；修复了主要问题，但是漏掉了边界；完全没有解决问题。 这三类例子，评估的系统给出的</span><span style="font-weight:bold">分数要能够拉开差距，体现区别</span><span>。</span></p>

<p id="f-doxcnX7qa2OFake357uAFGlIgmw"><span style="font-weight:bold">3. 可靠性与一致性：相同条件下是否稳定</span></p>

<p id="f-doxcncV8Ez5xRf8Yp9EuGWDdiTh"><span>在输入、评分标准和配置不变时，</span><span style="font-weight:bold">多次评估的结果应基本一致</span><span>，不能一次合格、一次不合格。</span></p>

<p id="f-doxcnzpwpVUpyLWfkLu6ryHdzHb"><span>例如，对同一条 Agent 执行轨迹重复评分时，</span><span style="font-weight:bold">分数和结论不应大幅波动</span><span>，否则会造成误判。</span></p>

<p id="f-doxcnRcyLfhxJ7aBM1LzDtO7Xld"><span style="font-weight:bold">4. 稳健性与偏差：是否受无关因素干扰</span></p>

<p id="f-doxcnabgCUqdBimmsGLYyp4WY3c"><span>只改变</span><span style="font-weight:bold">与目标质量无关的因素</span><span>时，评估结果</span><span style="font-weight:bold">不应发生不合理变化</span><span>。</span></p>

<p id="f-doxcn49chl0LlzAF2iRvlarAObe"><span>例如，交换两个 Agent 的展示顺序、隐藏模型名称，或者把同一结果写得更长，不应改变胜负。（前提是这些因素本身不属于评分标准。）</span></p>

<p id="f-doxcn2KFHBX3Fr5EmNwEP6pQAAu"><span style="font-weight:bold">5. 成本与实用性：是否值得使用</span></p>

<p id="f-doxcn4jos8C2nV1kN3tZwxHOptc"><span>评估不仅要准确，还要在</span><span style="font-weight:bold">费用、耗时和人工复核成本上可接受</span><span>，特别是引入了llm-as-a-duge, 评估带来的模型花费值得注意。</span></p>

<p id="f-doxcnzJWQ4OzOiwfKNFkF5RbYyh"><span style="font-weight:bold">6. 可追溯性与持续维护：变化能否解释</span></p>

<p id="f-doxcnIsR57GD35bwgL60zVWfSTb"><span>评估过程要</span><span style="font-weight:bold">能够复现和解释</span><span>，并随着 Agent、工具和业务变化</span><span style="font-weight:bold">持续更新</span><span>。</span></p>

<p id="f-doxcnTdsdmogr81iSsBayWcYLof"><span>需要记录</span><span style="font-weight:bold">任务集、评分标准、模型版本、提示词、工具环境和运行配置</span><span>。当分析某一个问题时，可以根据日志</span><span style="font-weight:bold">回溯，重放，定位</span><span>，为修复问题提供依据。</span></p>

<blockquote id="f-doxcn6c45BKH4myvAbnzoTiqrib"><p id="f-doxcnoFHHrHgQ5aREMimH5uDCO7"><span>💬 </span><span style="font-weight:bold">【面试卡片】 Q：你如何判断你的评估体系是好的？</span></p>
<p id="f-doxcnC5fmXAPABPjKfMjwfipXhb"><span style="font-weight:bold">A：</span><span> 可以先构建一批</span><span style="font-weight:bold">人工标注的校准样本</span><span>，验证评分体系本身，而不是只看它给 Agent 打了多少分。比如 Coding Agent，我会收集完全修复、部分修复和修复失败的补丁与轨迹，能跑测试的用测试验收，开放性的部分由人工按统一标准判断。</span></p>
<p id="f-doxcnthx6ITDjQTRtcDXQdY4oJh"><span>然后主要检查六个方面：</span><span style="font-weight:bold">测得准不准</span><span>，是否与测试证据和人工判断一致；</span><span style="font-weight:bold">分得开不开</span><span>，不同质量的结果能否拉开差距；</span><span style="font-weight:bold">评得稳不稳</span><span>，同一条轨迹重复评分是否一致；</span><span style="font-weight:bold">有没有无关偏差</span><span>，是否受展示顺序、模型名字或回答长度影响；另外还看评估的成本、耗时，以及日志能否支持复现和定位。发现误判后，我会调整规则、评分标准或裁判提示词，再用</span><span style="font-weight:bold">没有参与调整的独立样本验证</span><span>。这样才能说明评估体系可靠，而不是只在调试样本上表现好。</span></p></blockquote>

<a id="f-doxcnjhkPqs3LFm1ApUComHDpRc"></a>

###### 如何设计测试集的分布

<p id="f-doxcn2kTH60JYZunLzTkFSRRBnv"><span>有了评估体系，还需要准备分布合理的任务测试集，用来判断 Agent 系统在目标业务中的表现。选取测试任务时，可以遵循以下四条原则。</span></p>

<p id="f-doxcnKHqR43oUbeqLOdjg9Y18Ig"><span style="font-weight:bold">1. 任务比例反映真实场景</span></p>

<p id="f-doxcnwAownYlCxegqkusGJvJUAb"><span>从目标业务的真实场景中抽样，让</span><span style="font-weight:bold">主要任务类型的比例接近实际使用情况</span><span>。</span></p>

<p id="f-doxcnyZCLn2pAUGZqds6E81GmTb"><span>例如，线上大部分请求是查询，少部分是修改和分析，那么基础测试集也应反映这样的比例，而不是不加区分地让每类任务数量相同。</span></p>

<p id="f-doxcno9PijKbnd0dNRAFBgNleCc"><span style="font-weight:bold">2. 每类任务覆盖不同情况</span></p>

<p id="f-doxcnPl0J4XJlazMOrP3vClOfuc"><span>同一种任务内部，也要</span><span style="font-weight:bold">覆盖不同输入条件和预期行为</span><span>，例如该调用工具与不该调用工具、信息完整与信息缺失、单轮与多轮、简单与复杂，</span><span style="font-weight:bold">不能只选条件齐全、一路顺利的例子</span><span>。</span></p>

<p id="f-doxcnimXFZbgWE889sTumqZGkQf"><span>这里的“正例、反例”指</span><span style="font-weight:bold">应该执行某种行为和不应该执行某种行为</span><span>的任务。例如，查询实时天气需要搜索，而翻译用户给定的一句话通常不需要搜索。Agent 最终完成得好不好，</span><span style="font-weight:bold">是评估结果，不是预先安排的成功与失败样本比例</span><span>。</span></p>

<p id="f-doxcnR3nW1LfDdGUNfbd86x6uBc"><span style="font-weight:bold">3. 对低频但重要的场景专门补测</span></p>

<p id="f-doxcnJSNqdLXObHzZE0RuRusfyg"><span>有些边界情况在真实业务中出现很少，按实际比例抽样可能几乎抽不到，但仍需要专门补充测试任务。</span></p>

<p id="f-doxcnkd8Y9dl1xuuwsRO8ibvqed"><span>重点补充</span><span style="font-weight:bold">容易出错、失败后果严重，或业务明确要求支持</span><span>的情况，例如越权请求、工具调用失败、关键参数缺失。</span><span style="font-weight:bold">不是所有少见情况都必须大量补充</span><span>。</span></p>

<p id="f-doxcnuAUOtbdJhHqYNUYzYZOdnc"><span>这些任务可以</span><span style="font-weight:bold">单列为专项测试集</span><span>，既检查重要的低频场景，又</span><span style="font-weight:bold">保持基础测试集接近真实业务分布</span><span>。</span></p>

<p id="f-doxcnOXDDSi675qPPoZHPiWeK2b"><span style="font-weight:bold">4. 关键类别的样本量足够支撑判断</span></p>

<p id="f-doxcnpfxbE25UrGQ2wv6KdET3Wg"><span style="font-weight:bold">每一类的样本数量应该足够</span><span>，</span><span style="font-weight:bold">样本数量太小，会导致误差比较大</span><span>。当样本数量比较小的时候，误差会比较大。</span></p>

<p id="f-doxcnMyxUJilZEnNPkjLwiZblJh"><span style="font-weight:bold">简记：比例贴近业务，类内覆盖差异，重要长尾补测，样本量支撑结论。</span></p>

<blockquote id="f-doxcnuurjUwn16VRqGpXK9cB3Dh"><p id="f-doxcnJDhdf8HRe3FdkxGs3dEb2f"><span>💬 </span><span style="font-weight:bold">【面试卡片】 Q：你的数据集是如何构建的？</span></p>
<p id="f-doxcn0vIGOwKqMA9d7LAXdtrYwh"><span style="font-weight:bold">A：</span><span> 可以从</span><span style="font-weight:bold">真实业务任务</span><span>出发构建测试集，而不是随便凑一批题。比如 Coding Agent，先从历史工单和用户请求中统计 Bug 修复、代码解释、功能修改等任务的占比，再按这个比例抽样，让基础集贴近实际使用情况。每条任务保留问题描述、代码起点、环境和验收依据，历史答案不给 Agent。</span></p>
<p id="f-doxcnMUvDNjrY0waCB5uWsst5qg"><span>同类任务内部，再覆盖</span><span style="font-weight:bold">简单与复杂、信息完整与缺失、单轮与多轮、应该执行与不应该执行</span><span>等不同情况。对于工具失败、越权请求、修改公共接口这些低频但重要的场景，我会</span><span style="font-weight:bold">单列专项集补测</span><span>，避免把它们大量混入后扭曲真实业务比例。另外保证关键类别有足够样本，去重，并把开发调试集与最终测试集分开。最后既看整体表现，也看各类任务和专项场景的结果。核心就是</span><span style="font-weight:bold">业务比例真实、类内覆盖充分、重要长尾补测、样本量足够</span><span>。</span></p></blockquote>


<a id="section-0074"></a>
## 评测细节

<a id="f-doxcnDDWrrEjTGaY46g0bbS4lhf"></a>

<p id="f-doxcnAtRfQszuxNYRy22MGRzqZ7"><span>本章是全篇主体。我们沿着第 2 章那张生命周期主线，</span><span style="font-weight:bold">从"通用武器库"开始，再依次走过上线前验证（选型 → 前置定成功标准 → 组件 → 集成 → 组装评测集与 Pipeline → 发布闸门）和上线后监控（灰度、可观测性、漂移、成本与安全告警）</span><span>。每一个小节都用同一个模板讲：</span></p>

<blockquote id="f-doxcnm0vh7zy0UnzHURLxJNxdgd"><p id="f-doxcnRZaqBmXqJ7kKuoS5PE3WRe"><span style="font-weight:bold">【是什么】</span><span> 这一节评的对象是什么 → </span><span style="font-weight:bold">【为什么测】</span><span> 不测会怎么翻车 → </span><span style="font-weight:bold">【怎么测】</span><span> 具体指标、工具、可照做的步骤。</span></p>
<p id="f-doxcnyn2OnaCPKVKjjqt5qGdJ1g"><span>📌 这里的怎么测，注意也不是标准的答案。而是我基于这4个资料来总结的。怎么测这一步有的地方写的是具体的思路，有的地方是一些可以参考的做法。具体真正工程实践上，没有标准答案，而是要根据我们今天讲解的思路，结合自己的项目灵活扩展。</span></p></blockquote>

<a id="f-doxcnBom3uw61IVWwGWOBKUarFn"></a>

##### 通用武器库

<p id="f-doxcntDvNSPLO1MsJtj8nDgPcWg"><span>在进入各个生命周期阶段之前，先认识三件"通用武器"。它们不属于某一个阶段，而是</span><span style="font-weight:bold">在选型、组件、集成、生产里被反复使用</span><span>——先讲清楚，后面各节直接引用。</span></p>

<a id="f-doxcn9n57LOGgOtMF6BB69Ho7df"></a>

###### LLM-as-a-judge

<p id="f-doxcnloiBVYk2e9HK76ZLe7OydY"><span style="font-weight:bold">【是什么】</span><span> 用一个（通常更强的）大模型，按照预先写好的评分标准（rubric），去给另一个 Agent 的输出打分或排序。它是目前</span><span style="font-weight:bold">最主流的自动评估手段</span><span>，四份资料无一例外都在用。</span></p>

<p id="f-doxcnOlx183xZXf5yVIaWilVpDh"><span>它有三种典型用法：</span></p>

<ul><li id="f-doxcnfpkZsWo5gIU5pds37j1TTb"><span style="font-weight:bold">单点打分</span><span>：给一个输出打一个绝对分（如"有用性 1–5 分"）；</span></li></ul>

<ul><li id="f-doxcnP36PwGt7XC4z0jeY7h2kac"><span style="font-weight:bold">对参考打分</span><span>：把输出和"标准答案"比，判断是否一致；</span></li></ul>

<ul><li id="f-doxcnlwex0isBsgzgl3w52cCZ0b"><span style="font-weight:bold">两两比较</span><span>：给出 A、B 两个输出，让裁判选哪个更好。</span></li></ul>

<p id="f-doxcnwhuy2pKRxFh5r6KntfZwLe"><span style="font-weight:bold">【为什么测】</span><span> Agent 的输出大多是开放式自然语言，没有唯一标准答案，用精确匹配根本没法判分；纯人工评估又太慢太贵、无法规模化。LLM-as-a-judge 填补了中间地带——它能像人一样理解语义，又能像程序一样批量自动跑。《AI Engineering》给了一个有说服力的数据：</span><span style="font-weight:bold">GPT-4 作为裁判与人类的一致性可达 85%，甚至高于人类评审之间的一致性（81%）</span><span>。</span></p>

<p id="f-doxcnksu3SJQOIC19YH2jFAN1td"><span style="font-weight:bold">【怎么测】</span></p>

<blockquote id="f-doxcnnjMyLNEFVw8qHJbaKi5xIf"><p id="f-doxcnPq3o0jKmHmShAsXw5LdPke"><span>定性：这是</span><span style="font-weight:bold">一个方法、分 3 步走</span><span>（写标准 → 固定裁判 → 批量跑），三步是</span><span style="font-weight:bold">先后顺序</span><span>，不能跳。</span></p></blockquote>

<ol start="1"><li id="f-doxcnRU11jSBQgsVg93EuqQa8jf"><span style="font-weight:bold">【步骤】写清楚 rubric</span><span>：定义评估维度和每个分档的含义。实战书的做法是借用教育学的"评分量规"概念，比如评一个推荐器，从 </span><span><span><span>subject / format / genre</span></span></span><span> 三个维度各打 1–5 分，并写明每一分代表什么。</span></li></ol>

<ol start="2"><li id="f-doxcnWJRQIE6d3w8wp5Gi4jroWe"><span style="font-weight:bold">【步骤】固定裁判模型和提示词</span><span>：设计模式书里用 Gemini（</span><span><span><span>gemini-1.5-flash-latest</span></span></span><span>，</span><span><span><span>temperature=0.2</span></span></span><span>）搭了一个 </span><span><span><span>LLMJudgeForLegalSurvey</span></span></span><span>，并用 </span><span><span><span>response_mime_type="application/json"</span></span></span><span> 强制输出 JSON 分数（含 </span><span><span><span>overall_score</span></span></span><span>、</span><span><span><span>rationale</span></span></span><span>、</span><span><span><span>detailed_feedback</span></span></span><span>、</span><span><span><span>concerns</span></span></span><span>、</span><span><span><span>recommended_action</span></span></span><span> 五个字段），方便后续解析聚合。</span></li></ol>

<ol start="3"><li id="f-doxcnwvePemRwfQCDrgwM1KWryg"><span style="font-weight:bold">【步骤】批量跑 + 聚合</span><span>：把多组输入喂进去，解析每条打分，再求平均/分布。</span></li></ol>

<p id="f-doxcnareOuMEGy6KYvw51IUNXkh"><span style="font-weight:bold">📋 一个真实的 judge 提示词长什么样（直接照搬一个例子）</span></p>

<p id="f-doxcnW3Vwv1fgHD6nSKJe3niEUe"><span>下面是实战书第 9 章"推荐器"案例里</span><span style="font-weight:bold">真实的裁判提示词</span><span>（</span><span><span><span>evaluate_recommendation.jinja2</span></span></span><span>，Jinja2 模板，</span><span><span><span>{{ }}</span></span></span><span> 里是运行时会被填入的变量）。它麻雀虽小五脏俱全，正好凑齐一个标准 judge prompt 的四要素——</span><span style="font-weight:bold">角色设定 + 评分维度 + 1–5 分量规 + 指定输出格式</span><span>：</span></p>

<pre id="f-doxcnuTz3KHDN80c1yTZMdUYGNd"><code>system:
You are a discerning recommender of {{subject}} {{format}} of the {{genre}}.
Your purpose is to evaluate the quality of given recommendations.
Make sure that the recommendation aligns well with each of the criteria:
Format - make sure the format aligns with {{format}}
Subject - be sure the subject is the same as {{subject}}
Genre - make sure the genre is similar to {{genre}}

Please follow any special instructions and align your scores accordingly given here. {{custom}}

Rate each criteria, subject, format and genre on a scale from 1 to 5 using the following guide:
1  Poor alignment: this is the opposite of what is expected given the criteria.
2  Bad alignment: not a good fit for the given criteria.
3  Mediocre alignment: it may or may not fit well with the given criteria
4  Good alignment: it may not align 100% with the criteria but is a good fit; otherwise
5  Excellent alignment: this is a good recommendation for the given criteria

You will be shown a number of recommendations.
Respond with only the item title and a rating from 1-5 (5 being the best) for
each criterias alignment (Subject, Format and Genre).
Below is an example of the requested output:
Title: Time Bandits
Subject: 4
Format: 5
Genre: 4

user:
{{recommendation}}</code></pre>

<blockquote id="f-doxcnN1H5sx2GdWWklCAswyRwve"><p id="f-doxcnGrxPkzsjUKSy1B4EyFZ6Dh"><span>（</span><span><span><span>{{subject}}/{{format}}/{{genre}}</span></span></span><span> 是评测维度，</span><span><span><span>{{custom}}</span></span></span><span> 是留给"特殊评分说明"的插槽，</span><span><span><span>{{recommendation}}</span></span></span><span> 填入待评的推荐内容。）</span></p></blockquote>

<p id="f-doxcnsUG0I7pCBB1Sz3oBIVu62b"><span style="font-weight:bold">从这个例子能学到三件事：</span></p>

<ul><li id="f-doxcnezptCqCAioR9NtYs43HvBb"><span style="font-weight:bold">维度可参数化</span><span>：把评测维度写成 </span><span><span><span>{{ }}</span></span></span><span> 变量，换个场景填不同值就能复用同一套裁判，不必每次重写；</span></li></ul>

<ul><li id="f-doxcnE98PiiAoTSLWkgF3bQR02d"><span style="font-weight:bold">量规要逐档下定义</span><span>：不是光说"1–5 分"，而是把"1 分长什么样、5 分长什么样"逐档写清——这正是 AI Engineering 强调的 "create scoring rubrics with </span><span style="font-weight:bold">examples</span><span>"；</span></li></ul>

<ul><li id="f-doxcnDGzz4TukSUjs7m2HaWVmJb"><span style="font-weight:bold">要给输出格式做示范</span><span>：提示词末尾用 </span><span><span><span>Title/Subject/Format/Genre</span></span></span><span> 明确示范了期望的输出长相，裁判才会稳定吐出可解析的结果，方便后续批量聚合。</span></li></ul>

<blockquote id="f-doxcnTfRYD7zVadhIuSRg9hdTqg"><p id="f-doxcnoaAGWqMJd2yq01NOq0oSNh"><span>💡 </span><span style="font-weight:bold">再补一个佐证"裁判没有统一标准"的发现</span><span>：AI Engineering 指出，同样叫"忠实度（faithfulness）"这一个指标，三个主流评估工具的 judge 提示词标度各不相同——</span><span style="font-weight:bold">MLflow 用 1–5 分、Ragas 用 0/1、LlamaIndex 让模型直接答 YES/NO</span><span>。这意味着 LLM-judge 的提示词至今没有行业标准，</span><span style="font-weight:bold">换一个工具或提示词，分数就不可比</span><span>。</span></p>
</blockquote>

<p id="f-doxcnHmiuyqe3ArMqgDE2dLxJxc"><span style="font-weight:bold">⚠️ 必须知道的三大偏见（面试高频）</span><span> —— 《AI Engineering》系统揭示了裁判模型自身的偏差，用它的时候要警惕：</span></p>

<ul><li id="f-doxcnhGouR8knTY3woGshDHd1Bf"><span style="font-weight:bold">自我偏好（self-bias）</span><span>：裁判偏向自己生成的答案；</span></li></ul>

<ul><li id="f-doxcnYNTXeA6w5sJ0SyU4Ae3spf"><span style="font-weight:bold">首位偏差（first-position bias）</span><span>：两两比较时偏向排在前面的那个；</span></li></ul>

<ul><li id="f-doxcn1820q5tmsqeXAwe0JQarxd"><span style="font-weight:bold">冗长偏差（verbosity bias）</span><span>：偏向更长的回答，哪怕没更好。</span></li></ul>

<blockquote id="f-doxcnPEPHoST5FQEhgHcIn4iVYy"><p id="f-doxcnxG5RrasRxZ1HuebQdXNyrg"><span>书里有一句金句值得背：</span><span style="font-weight:bold">"看不到裁判模型和它的提示词，就不要相信它给的分数。"</span><span> 这意味着任何引用 LLM-judge 结果的榜单，如果不公开裁判细节，可信度都要打问号。</span></p></blockquote>

<div id="f-doxcnzps6X8jBq6KJBcqqvApcV0"><img alt="" decoding="async" height="853" loading="lazy" src="/images/agent-learning/57b33befec18ea01ec8cd8d7.png" width="1280"/></div>

<a id="f-doxcnk592eTfSrMTACru73cYPic"></a>

###### 比较式评估

<p id="f-doxcnaj9qw3ONHkqpZOQv6Pbf8b"><span style="font-weight:bold">【是什么】</span><span> 不给单个输出打绝对分，而是让多个模型/Agent 的输出</span><span style="font-weight:bold">两两对决</span><span>，根据胜负用类似国际象棋的 </span><span style="font-weight:bold">Elo 评分</span><span>算出排名。最著名的就是 Chatbot Arena。</span></p>

<p id="f-doxcnzhsmITBeykOht31WyKKW2s"><span style="font-weight:bold">【为什么测】</span><span> 有些质量很难打绝对分（"这个回答到底算 3 分还是 4 分？"很主观），但人类</span><span style="font-weight:bold">比较</span><span>两个谁更好却相对容易、也更稳定。比较式评估利用了这一点，更适合给一批模型排座次。</span></p>

<p id="f-doxcnneuVzRoRpjnHWorrARXOKb"><span style="font-weight:bold">【怎么测】</span></p>

<blockquote id="f-doxcn5fXnQKix2ACMFpDobLzMaf"><p id="f-doxcnLhKirYR3yWwZekbaChAB8e"><span>定性：</span><span style="font-weight:bold">一个方法、分 2 步</span><span>——先攒"两两对决"的胜负数据，再用算法换算成排名分。</span></p></blockquote>

<ul><li id="f-doxcnpHuB5Zh0txFS1jIcxcKInf"><span style="font-weight:bold">【步骤】收集对决数据</span><span>：收集大量"同一问题、不同模型的两个回答"，让人或 LLM 投票选更好的；</span></li></ul>

<ul><li id="f-doxcngjYIPld5hu2v4ZoA5NEygc"><span style="font-weight:bold">【步骤】换算排名</span><span>：用 Elo / Bradley-Terry 类算法把胜负记录换算成排名分。</span></li></ul>

<p id="f-doxcnoyhk29EwKO3zOjoXTyHP8e"><span style="font-weight:bold">⚠️ 两个关键提醒：</span></p>

<ul><li id="f-doxcnlhyp0TeaMbY5O2F90x6jEb"><span style="font-weight:bold">要和 A/B 测试区分开</span><span>：A/B 测试是把不同版本分给不同用户群看线上指标；比较式评估是</span><span style="font-weight:bold">同时拿多个输出给同一个评委比</span><span>，两者不是一回事。</span></li></ul>

<ul><li id="f-doxcnYFRvp4Y6phyCxxD6Hs08qg"><span style="font-weight:bold">"偏好 ≠ 正确"</span><span>：投票选出的"更受欢迎"不等于"更正确"。如果投票人不是该领域内行，可能把 Agent 带偏成"讨好型"——回答让人舒服但其实是错的。所以</span><span style="font-weight:bold">评委的专业度至关重要</span><span>。</span></li></ul>

<a id="f-doxcnoXwwqOsQF7KoT6hIBuKEhd"></a>

###### 基础度量：精确评估与相似度

<p id="f-doxcnnBMgtuE7yYiObE5BlorKpf"><span style="font-weight:bold">【是什么】</span><span> 一组</span><span style="font-weight:bold">不依赖大模型裁判</span><span>的、更传统也更廉价的度量手段，适合有明确答案或可程序化判定的场景。</span></p>

<p id="f-doxcn0tyNg1CTqCfmeDgtHAdRnd"><span>主要分三类：</span></p>

<ul><li id="f-doxcnjq3TXK6azwcig3iaO0rwec"><span style="font-weight:bold">功能正确性</span><span>：直接看任务有没有真的完成。比如代码题就跑测试用例（HumanEval、MBPP），text-to-SQL 就执行 SQL 看结果对不对——</span><span style="font-weight:bold">这是最硬、最可信的指标</span><span>。</span></li></ul>

<ul><li id="f-doxcnEqLLxcTegw3cHonxA7rtBe"><span style="font-weight:bold">与参考答案的相似度</span><span>：</span></li></ul>

<div id="f-doxcnQvVuuGTrhKkfGS2PkMYxlf" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-style:italic">词汇级</span><span>：精确匹配、BLEU、ROUGE（看字面重叠）；</span></div></div>

<div id="f-doxcnesmJ2swmN6UJi7VekHshXC" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-style:italic">语义级</span><span>：BERTScore、嵌入向量余弦相似度（看意思接近）。设计模式书还补充了 Levenshtein 编辑距离、Jaccard 相似度等。</span></div></div>

<ul><li id="f-doxcnRPVYE16OWEoYj61MxPKdFe"><span style="font-weight:bold">语言建模指标</span><span>：交叉熵 / 困惑度（perplexity）。除了衡量语言流畅度，《AI Engineering》还点出一个巧妙用途——</span><span style="font-weight:bold">用它检测数据污染</span><span>（如果模型对某测试集 perplexity 异常低，说明可能见过这些题）。</span></li></ul>

<p id="f-doxcnQCGJFftD7zY5AF8gmrVgvb"><span style="font-weight:bold">【为什么测】</span><span> 不是所有场景都值得动用昂贵的 LLM-judge。</span><span style="font-weight:bold">只要任务有可程序化验证的标准答案（代码、SQL、数学、分类），就应该优先用功能正确性</span><span>——它客观、便宜、可重复，是最可信的一类证据。</span></p>

<p id="f-doxcns1KIYxprvqrtIhoYZ4GNRg"><span style="font-weight:bold">【怎么测】</span></p>

<blockquote id="f-doxcn6ErPHdx3BvWeNJIdLeBqHd"><p id="f-doxcnqsFA3x9HxgXBCLd5DqYSAd"><span>定性：这里不是步骤，而是</span><span style="font-weight:bold">按"答案有多可验证"三选一档</span><span>——越靠上越客观越该优先用。</span></p></blockquote>

<ul><li id="f-doxcnAc0tOJrOB4x6KF3idGCjvs"><span style="font-weight:bold">【档位·最严】有标准答案</span><span>（分类、抽取、SQL、代码）→ 用功能正确性 / 精确匹配；</span></li></ul>

<ul><li id="f-doxcnL87rxcVqZu0eKHRzmwl2Id"><span style="font-weight:bold">【档位·中】答案灵活但有参考</span><span>（翻译、摘要）→ 用 BLEU/ROUGE + BERTScore；</span></li></ul>

<ul><li id="f-doxcnQJThRld3wGigfPG63SCz6f"><span style="font-weight:bold">【档位·最松】完全开放</span><span>（对话、创作）→ 退回到 3.3.1.1 的 LLM-as-a-judge。</span></li></ul>

<blockquote id="f-doxcnaU8B00I7QicRxi1KRWgw7f"><p id="f-doxcnEUWe9p51TmlspKq6RKCBle"><span style="font-weight:bold">选型口诀</span><span>：</span><span style="font-weight:bold">能用功能正确性就别用相似度，能用相似度就别用 LLM-judge</span><span>——</span><span style="font-weight:bold">越靠前越客观越便宜</span><span>。三者常常组合使用，因为没有任何单一指标能覆盖 Agent 的全部能力。</span></p>
<p id="f-doxcnZohga4axERTCGueT4eO6oM"><span>💬 </span><span style="font-weight:bold">【面试卡片】</span><span style="font-weight:bold">Q：功能正确性、相似度、LLM-judge 三类指标怎么选？</span></p>
<p id="f-doxcn6Xj29zvZkJoqf6CJ3474oe"><span style="font-weight:bold">A：</span><span> 按"答案有多可验证"从严到松三选一：</span></p>
<p id="f-doxcn9OSZwJ0JjmpvHFfJvzC5gb"><span>① 有标准答案（分类、抽取、SQL、代码）→ 优先用</span><span style="font-weight:bold">功能正确性 / 精确匹配</span><span>，最客观、最便宜、可重复；</span></p>
<p id="f-doxcnvWEj5b9pQBhdiFKbLmaVbh"><span>② 答案灵活但有参考（翻译、摘要）→ 用 </span><span style="font-weight:bold">BLEU/ROUGE 加 BERTScore</span><span> 等相似度；</span></p>
<p id="f-doxcnPrtIy1g9Xer3T0CSbBRYBg"><span>③ 完全开放（对话、创作）→ 才退回到 </span><span style="font-weight:bold">LLM-as-a-judge</span><span>。口诀是：能用功能正确性就别用相似度、能用相似度就别用 LLM-judge，越靠前越客观越便宜；实战中三者常组合，因为没有单一指标能覆盖 Agent 的全部能力。</span></p>
</blockquote>

<blockquote id="f-doxcnVhYlCHjQyV8pRGF11WHYke"><p id="f-doxcnzxuPz7e3QkcAYDojIyxpeg"><span>💬 </span><span style="font-weight:bold">【面试卡片】</span><br/><span style="font-weight:bold">Q：在 Agent 评测中用 LLM-as-a-judge（大模型当裁判）很火，请客观评价一下它的优缺点？如果由你负责实际项目落地，应该怎么科学避坑？</span></p>
<p id="f-doxcnhXq4yC3lVbpT9VZ63dhMVh"><span style="font-weight:bold">💡 答题思路：</span><br/><span>先表现出技术批判精神。承认它在“开放、主观或无标准答案任务中有强大的语义理解优势”，但紧接着点出它的“致命死穴（运行高成本、三大心理学偏见、低标度一致性）”。最后拿出一整套</span><span style="font-weight:bold">工程落地的避坑干货</span><span>（如：CoT分步推理、JSON模式强约束、双向逆序对决、人机相关性校准等），证明你是真正动手写过生产代码、踩过坑的资深工程师，而非浅尝辄止的概念党。</span></p>
<p id="f-doxcn63TWZ6cI5G2MAE5RGWtUAE"><span style="font-weight:bold">👨‍💻 标准回答：</span><br/><span>在实际开发中，我们有大量的 Agent 生成产物是难以用正则或功能用例执行来断言的。这时候，LLM-as-a-judge 填补了传统自动化测试和昂贵人工审核之间的巨大空白、成为了必不可少的通用武器。但我们绝不能盲信它。以下是我对这一评估方法的深度剖析以及工程实战避坑指南：</span></p>
<p id="f-doxcnLSBrs1ITcnOJfUG2rAGtvh"><span style="font-weight:bold">一、核心优势</span></p>
<ol start="1"><li id="f-doxcnITGMF5jhrh1zXCkAniXTyq"><span style="font-weight:bold">无与伦比的“语义匹配与泛化”能力</span><span>：不同于传统的字面匹配（如 BLEU、ROUGE 容易因为词汇错位而误判），它能真正读懂“意思相近但表达不同”的开放式文本，或针对无标准答案的任务（如多边法律合同总结、创意写作）进行客观的多维度打分。</span></li></ol>
<ol start="2"><li id="f-doxcnEy93q9QdtgDFMsbFC51Uzg"><span style="font-weight:bold">极高的反馈吞吐量与极低的人力耗损</span><span>：让人类专家逐个标注数万条 Agent 的输出是不现实的。利用大模型作为裁判，我们可以并行数千个并发打分线程，将迭代优化周期缩短到分钟级，让 CI/CD 流程的高频反馈成为可能。</span></li></ol>
<ol start="3"><li id="f-doxcnNTtJDn51oIdAQe0Nwti7LZ"><span style="font-weight:bold">高水平的人机对齐一致性</span><span>：实验证明，只要评分标准维度切分得足够精细，GPT-4 或高级开源模型裁判和人类专家的一致性可以稳定在 </span><span style="font-weight:bold">85%</span><span> 以上，甚至高于水平参差不齐的临时人类外包人力的一致性。</span></li></ol>
<p id="f-doxcn1022HddDHAx3zd6oUsXGfe"><span style="font-weight:bold">二、致命劣势</span></p>
<ol start="1"><li id="f-doxcnd8RQBacJSJ7wGmn9wFDQrd"><span style="font-weight:bold">三大天生认知偏差</span><span>：</span></li></ol><div id="f-doxcn3odshauUdLVJpSrtROKnfe" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">自我偏好偏见</span><span>：它会天然地给“由它自己生成的、或和它本身风格最相似”的文本打高分。</span></div></div><div id="f-doxcnTtvKHGc94OeHL6n0EoiTtg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">首位顺序偏差</span><span>：在进行两两比较时（Pairwise Match），如果两个模型输出质量相近，它更容易倾向于打给第一个展示出来的模型。</span></div></div><div id="f-doxcn81jaFise8U41DNkJRbi8Vs" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">冗长语言偏差</span><span>：它是个彻头彻尾的“字数党”，往往更偏心字数巨多、排版华丽的空洞回答，哪怕短回答才是真正高密度的精确解决方案。</span></div></div>
<ol start="2"><li id="f-doxcn8LI5Z3mMaXcykHLaemRFjg"><span style="font-weight:bold">判分的不稳定性与无法水平度量</span><span>：大模型对提示词极度敏感。正如 AI Engineering 揭示的那样，不同评测工具定义同样的指标（如 Faithfulness），标度却完全不一致（有 1–5 分、0/1、YES/NO）。换一个提示词或稍改下词眼，原本的 80 分就可能变成 60 分，分数不具备像数学指标那样的绝对通用性。</span></li></ol>
<ol start="3"><li id="f-doxcn85N5fLZBl2ZtU7ARmjq7Ub"><span style="font-weight:bold">可怕的运行成本墙</span><span>：如果每次 CI/CD 提交测试都要调用数十次 GPT-4 做 Judge，一趟迭代可能就会烧掉数千美元，最终限制了开发阶段的高频运行。</span></li></ol>
<p id="f-doxcnYcHf0ppq2ffafDP0spZLJ5"><span style="font-weight:bold">三、工程落地避坑指南（我是如何最大程度校准裁判的）</span><br/><span>在实际架构开发中，为保证 LLM-as-a-judge 的客观与高效率，我会严格执行以下五条金科玉律：</span></p>
<ol start="1"><li id="f-doxcnn5FpVevTHRnQRCLCUHGnxb"><span style="font-weight:bold">【Rubric 颗粒化 + Few-Shot 示例注入】</span><span>：拒绝简单的“好/中/差”或“1-5自拟大纲”等模糊打分。我会像实战书一样，将评测指标拆分为 </span><span><span><span>Format / Subject / Relevance</span></span></span><span>，每一档（如 3分、5分）必须配备极具说服力的真实 Few-shot 对比样例，引导大模型按样本对比。</span></li></ol>
<ol start="2"><li id="f-doxcn3eAjKuMvW9uRZsuZDNrXgb"><span style="font-weight:bold">【CoT 分步推理 + 严格的 JSON 强约束】</span><span>：在 API 中开启 </span><span><span><span>response_mime_type="application/json"</span></span></span><span>，将 Schema 约束设为含有：</span><span><span><span>rationale</span></span></span><span>（裁判思路原因）和 </span><span><span><span>overall_score</span></span></span><span>（综合得分）的字典。必须强制模型</span><span style="font-weight:bold">先输出理由，再输出分数</span><span>（利用思维链减缓裁判幻觉和打分随机性），拒绝让其立刻给出数字。</span></li></ol>
<ol start="3"><li id="f-doxcnTKPsttSCcuEd4vEpkH56LZ"><span style="font-weight:bold">【洗牌（Shuffle）对抗两两偏差】</span><span>：如果是 Arena 类型的两两比对，必须给 A、B 两种输出同时运行“A在先，B在后”和“B在先，A在后”两轮，并将顺序打散。只有当两个相反方向表现一致或多轮随机均值胜出时，才算真正胜出，以此完全抵消首位顺序偏差。</span></li></ol>
<ol start="4"><li id="f-doxcnsACYs1Vl20p9H3woVVq7qe"><span style="font-weight:bold">【人机偏差定量拟合（Calibration）】</span><span>：阶段性抽样 </span><span style="font-weight:bold">10% - 20%</span><span> 裁判打过分的数据集给领域的资深人类专家重新评分。我们写代码计算两者的 </span><span style="font-weight:bold">Cohen's Kappa 系数</span><span> 或 </span><span style="font-weight:bold">Pearson 统计相关度</span><span>。如果拟合度低于 0.75，立即叫停系统，修改 Rubric 提示词，直到重新校准至接近人类共识。</span></li></ol>
<ol start="5"><li id="f-doxcnpWQuxZ4YiBKC9GbqOSg5lk"><span style="font-weight:bold">【低温运行与模型平替】</span><span>：在 Judge 时一律将 </span><span><span><span>temperature</span></span></span><span> 设置为 </span><span style="font-weight:bold">0.0 - 0.2</span><span> 的极低范围，保证结果确定。同时，对于日常功能迭代或简单的单维度提取验证，抛弃 GPT-4 等昂贵闭源，使用开源的小模型（如 Llama-3-8B-Instruct 甚至更优秀的领域特定蒸馏裁判小模型）进行平替，用 2% 的成本跑完 90% 的基础校验。</span></li></ol></blockquote>

<a id="f-doxcnKLoKKhtHWoDWj9xUVsojib"></a>

##### 选型期：选基模

<p id="f-doxcnlY72pmvqPMmp0VycPLunjd"><span>在笔记 </span><span><span><a href="/posts/agent-learning-18-training-inference/#f-doxcnXzgzhmewA200Q5faoSZrGd"><span>7.不同模型的对比和选择</span></a></span></span><span>这一章节，也有讲解模型的选择问题。这两个小节是互补的，从不同的维度来讲解模型的选择。</span></p>

<p id="f-doxcnAnylEOcjZmbqYhP5NSFVkf"><span style="font-weight:bold">【是什么】</span><span> 在动手开发之前，从一堆候选大模型里评测、挑出最适合你这个 Agent 任务的那个（或那几个）。</span></p>

<p id="f-doxcnEApMsQHsg8ILYTw2PYMavh"><span style="font-weight:bold">【为什么测】</span><span> 模型是 Agent 的"地基"，选错了后面再多优化也补不回来。但选型最大的坑在于——</span><span style="font-weight:bold">不能只看排行榜名次</span><span>。《AI Engineering》专门用一节讲选型的陷阱：公开榜单可能存在</span><span style="font-weight:bold">数据污染</span><span>（测试题混进了训练集，导致分数虚高）、榜单任务和你的真实业务未必相关、闭源模型还涉及成本与数据隐私的权衡。</span></p>

<p id="f-doxcnvEOnh1nLrOqvxSmAm9Lu0g"><span style="font-weight:bold">【怎么测】</span><span>（一套可照做的选型工作流）</span></p>

<blockquote id="f-doxcnAyHBB70yT0VgOqo8S29PJd"><p id="f-doxcn5hSA1CydI5Y4s05ZmM4BFh"><span>定性：</span><span style="font-weight:bold">一个方法、一条"五步漏斗"</span><span>——从粗到细一层层筛。其中第 4 点是漏斗每一层都要看的</span><span style="font-weight:bold">考查维度</span><span>（不是独立一步），夹在步骤里说明。</span></p></blockquote>

<ol start="1"><li id="f-doxcni0R4ohor7gv0yHufEGfnff"><span style="font-weight:bold">【步骤】区分硬性约束和软性偏好</span><span>：先用硬指标（成本上限、延迟上限、是否支持私有部署、上下文长度）筛掉不合格的；剩下的再比软指标（质量、能力）。</span></li></ol>

<ol start="2"><li id="f-doxcnBb8qHB2HhNNqRLU28LRbAd"><span style="font-weight:bold">【步骤】公开榜单只作初筛</span><span>，并对它保持警惕：查这个 benchmark 有没有被污染、任务是否贴近你的场景。</span></li></ol>

<ol start="3"><li id="f-doxcnTigsmTadNH08KKpjqU1a4m"><span style="font-weight:bold">【步骤】建私有评测集做终筛</span><span>：用你自己业务的真实数据（公开榜单看不到的）跑一遍，这才是最可信的。</span></li></ol>

<ol start="4"><li id="f-doxcngpDRiJYKlEGCf2Qojll5Md"><span style="font-weight:bold">【维度】每一层都要覆盖的考查点</span><span>：正确性、成本、延迟，以及领域专项能力。</span></li></ol>

<ol start="5"><li id="f-doxcnZQLAp7x60jvDnwSXd5Jime"><span style="font-weight:bold">【步骤】build vs buy 决策</span><span>：自建开源模型 vs 直接调 API，按成本、隐私、可控性权衡。</span></li></ol>

<blockquote id="f-doxcnxUIG8u0lKwWIwe1lJMqyNb"><p id="f-doxcnwq0YRPpLLTHIu04BFWO1dc"><span>💬 </span><span style="font-weight:bold">【面试卡片】</span><span style="font-weight:bold">Q：你是如何确定你的模型的？</span></p>
<p id="f-doxcnUGiBBUjMDP0ytPFfcjGJ2d"><span style="font-weight:bold">💡 答题思路：</span><span> 让 AI 读这道题的思路 + 对应项目代码后再作答。思路是——</span><span style="font-weight:bold">不要上来就报一个模型名，而要展示一条选型决策链</span><span>：先按"场景 → 能力 → 模型"反推（业务到底要什么能力、各能力配多少权重），再讲怎么验证（私有集盲测、防榜单污染），最后落到工程参数（同一模型按子任务差异化配置）。结论</span><span style="font-weight:bold">按方法论正向推演"该用哪一类模型"，而不是为项目里既成的选择找理由</span><span>。用人称"我"，结合下面智能预约 Agent 项目的真实能力需求来组织。</span></p>
<p id="f-doxcnmGLMV55QrjZrFZgveRp7db"><span style="font-style:italic">（本答案以笔记里的 Agent 项目 —— 智能预约 Agent 为例组织能力需求；模型结论按理论推演得出）</span></p>
<p id="f-doxcnVT5w6k0uN4AzvlECNYfXjf"><span style="font-weight:bold">👨‍💻 标准回答：</span><span> 我确定模型不是看榜单排第一就用谁，而是走"</span><span style="font-weight:bold">场景 → 能力 → 模型 → 验证</span><span>"四步，让能力需求来决定该选什么模型。</span></p>
<p id="f-doxcnRrdJGi5iSYxsqDk4ujLsIc"><span style="font-weight:bold">第一步，从业务场景反推所需能力，并配权重。</span><span> 我这个智能预约 Agent 是多 Agent 架构，要做意图分类、RAG 知识问答、预约槽位解析、调外部工具（MCP 拉天气）。把它拆成可量化的能力清单：</span><span style="font-weight:bold">Function Calling / 工具调用是必要能力（最高权重，约 40%）</span><span>——预约 Agent 要稳定地调天气工具；</span><span style="font-weight:bold">结构化输出与指令遵循（约 25%）</span><span>——要可靠抽出时间/项目/时长/性别这些槽位；</span><span style="font-weight:bold">多轮对话上下文（约 20%）</span><span>；剩下是</span><span style="font-weight:bold">中文理解和成本/延迟（约 15%）</span><span>。另外 RAG 那条线还需要一个</span><span style="font-weight:bold">嵌入模型</span><span>单独选。</span></p>
<p id="f-doxcnld5F9DCGmeI2dWJIrkPLkf"><span style="font-weight:bold">第二步，把能力画像翻译成对模型的硬性要求。</span><span> 上面这套权重直接刻画出我要的模型长相：① 必须</span><span style="font-weight:bold">原生支持 function-calling / tools</span><span>（这是硬门槛，不支持的直接出局）；② 在槽位抽取上</span><span style="font-weight:bold">结构化输出要稳</span><span>（temperature 调到 0 时不能崩格式）；③ 中文场景要好；④ 是个在线预约、要走流式回答的 To C 应用，所以</span><span style="font-weight:bold">延迟和单次调用成本</span><span>要可接受。</span></p>
<p id="f-doxcnUbUEMkIqZOclsBVdZYfiGc"><span style="font-weight:bold">第三步，据此推演该用哪一类模型（结论）。</span><span> 按这套要求正向推：工具调用是必要能力且要稳，所以</span><span style="font-weight:bold">应当选一个一线、对 function-calling 支持成熟的通用大模型作为主力</span><span>（GPT-4o 级 / Claude / 国内 Qwen-Max、DeepSeek 这一档都是合理候选，取决于成本和数据合规）；不适合上能力不稳的小模型硬扛工具调用。再做</span><span style="font-weight:bold">成本分层</span><span>：意图分类这种高频、简单的子任务，可以下放给一个更便宜的小模型；只有复杂推理和工具编排才用旗舰模型——这样整体 TCO 更优。</span><span style="font-weight:bold">嵌入模型</span><span>则按检索质量+向量维度+成本，选一个主流 embedding 模型（如 bge、text-embedding 系列）即可，不需要和主 LLM 同源。</span></p>
<p id="f-doxcnpPypWrPsDGpWGaHPiPRHTd"><span style="font-weight:bold">第四步，工程配置 + 验证。</span><span> 同一个主模型，我会按子任务的"确定性 vs 创造性"</span><span style="font-weight:bold">差异化设 temperature</span><span>：意图分类和槽位解析用 </span><span style="font-weight:bold">0</span><span>（要可复现）、RAG 咨询用 </span><span style="font-weight:bold">0.3</span><span>、主动推荐用 </span><span style="font-weight:bold">0.7</span><span>。验证上不迷信公开榜单（警惕数据污染），而是</span><span style="font-weight:bold">用真实预约对话抽样建私有测试集做盲测</span><span>，重点看"工具调用准确率"和"槽位抽取正确率"这两个必要能力达不达标，达标了才定下来。</span></p>
<p id="f-doxcnEYrPp2EVXzaME7eXrIzG3e"><span style="font-weight:bold">一句话收尾：</span><span> 我确定模型的逻辑是——</span><span style="font-weight:bold">从场景拆出带权重的能力需求 → 用必要能力（function-calling + 稳定结构化输出）反推出"该用一线通用大模型做主力 + 小模型分层降本 + 主流 embedding 配检索" → 再用业务私有集盲测验证，而不是看榜单名次直接拍板。</span></p></blockquote>

<a id="f-doxcnZbQyn19R0pNcMcyVg3Ityd"></a>

##### 上线前：组件评测

<p id="f-doxcnU5hfoHFEACdoayGcMyh96b"><span>Agent 是由多个组件拼起来的：提示词、检索、工具、规划。这一阶段</span><span style="font-weight:bold">把每个零件单独拎出来测</span><span>，因为只有先保证零件合格，整机才可能合格。</span></p>

<a id="f-doxcnHZK6pRfpbYAz7FbPyozTYc"></a>

###### Prompt 评测

<p id="f-doxcnL7UcGIIUvaRIPoJ5CjpkUg"><span style="font-weight:bold">【是什么】</span><span> 评估提示词（prompt）写得好不好、以及它扛不扛攻击。</span></p>

<p id="f-doxcnH25V3MCPULQTl0nLBpoq0f"><span style="font-weight:bold">【为什么测】</span><span> 提示词是 Agent 行为最敏感的"控制旋钮"，改一个词输出可能天差地别。但 prompt 的好坏不能靠"感觉读着顺"，得有系统化的对比；同时 prompt 还是安全攻击（越狱、注入）的主要入口，必须做防御测试。</span></p>

<p id="f-doxcnlyfcMtLqPjHBzNAeEoL9Td"><span style="font-weight:bold">【怎么测】</span></p>

<blockquote id="f-doxcnhsgSzxYAiJgQflIamQJdSb"><p id="f-doxcnus4v0yAIh8PwDtwZS7kcWd"><span>定性：</span><span style="font-weight:bold">3 个相互独立的方法</span><span>，分别测 prompt 的"好不好用"、"能不能自动调优"、"扛不扛攻击"——按需要取用。</span></p></blockquote>

<ul><li id="f-doxcnoDpEQlIX9ioICKoiqATaFc"><span style="font-weight:bold">▶ 方法一 · 质量评测：用微软 Prompt Flow 做批量对比</span><span>。这是实战书第 9 章的主角，本身是一条</span><span style="font-weight:bold">分 4 步</span><span>的落地流程：</span></li></ul>

<div id="f-doxcnKcbiiytqNeADQrLFQwR4Ad" style="display:flex;gap:0.5em"><span style="min-width:1.5em">a.</span><div><span style="font-weight:bold">【步骤】</span><span> 在 VS Code 里用 Prompt Flow（DAG 可视化流程图）搭一条评估流；</span></div></div>

<div id="f-doxcnLtTOCMgwhzoz2fXgPke1jb" style="display:flex;gap:0.5em"><span style="min-width:1.5em">b.</span><div><span style="font-weight:bold">【步骤】</span><span> 用 JSONL 准备多组输入，批量跑不同的 prompt 变体（比如把参数注入到 system prompt 还是 user prompt）；</span></div></div>

<div id="f-doxcn6GNaym7sK1TJNaAoRNnT1e" style="display:flex;gap:0.5em"><span style="min-width:1.5em">c.</span><div><span style="font-weight:bold">【步骤】</span><span> 用 LLM-as-judge 按 rubric 给每个变体的输出打分；</span></div></div>

<div id="f-doxcn568aXYaKIdOoOoCPYSzx2e" style="display:flex;gap:0.5em"><span style="min-width:1.5em">d.</span><div><span style="font-weight:bold">【步骤】</span><span> 用 </span><span><span><span>aggregate.py</span></span></span><span> 聚合各 run 的平均分、</span><span><span><span>log_metric</span></span></span><span> 记录指标，可视化对比哪个 prompt 更好。</span></div></div>

<ul><li id="f-doxcnSo9BdeVNHI2dQOR0FdOkog"><span style="font-weight:bold">▶ 方法二 · 自动 prompt 优化工具评测</span><span>：DSPy、TextGrad 等能自动搜索最优 prompt，但要警惕它们隐藏的 API 调用成本和模板 bug。</span></li></ul>

<ul><li id="f-doxcnSzWOKv1FOkvcYmPFfqwllf"><span style="font-weight:bold">▶ 方法三 · 防御性评测</span><span>：主动测 prompt 的鲁棒性（轻微扰动看输出是否崩）和安全性（上线前进 发布闸门，上线后进 持续监控）。</span></li></ul>

<blockquote id="f-doxcnbinRwzp0TaBmjFwUvLwlqb"><p id="f-doxcnWTY67qgPjzU40OsC7WZqab"><span>落地抓手一句话：</span><span style="font-weight:bold">Prompt Flow + JSONL 批处理 + LLM 打分 + 聚合对比</span><span>，把"调 prompt"从玄学变成可量化实验。</span></p></blockquote>

<a id="f-doxcnVnrkB8JpRTl5aaFj1tWKGe"></a>

###### RAG / 检索评测

<p id="f-doxcnuS8vRXhRPEBGjhL1Ywyiac"><span>在笔记 </span><span><span><a href="/posts/agent-learning-09-rag-data-processing/#f-doxcnNbiXjL8E9PgpL43YUADOIc"><span>RAG 评估章节</span></a></span></span><span>，有更详细的专门讲RAG的评估内容。</span></p>

<p id="f-doxcnxx8LH5YmdmeGYA7dk95f9c"><span style="font-weight:bold">【是什么】</span><span> 评估 Agent 的"外挂记忆"——检索增强生成（RAG）——找回来的资料质量好不好。</span></p>

<p id="f-doxcn96NQoF47WeLIT1JxGr85ed"><span style="font-weight:bold">【为什么测】</span><span> RAG 是"先检索、再生成"。如果检索这一步找回来的就是错的/不相关的，那后面生成得再流畅也是"一本正经地胡说八道"。所以 RAG 的评估要</span><span style="font-weight:bold">拆成检索和生成两段分别看</span><span>。</span></p>

<p id="f-doxcnPXZGrOHm3ociZDSMh2Yk2e"><span style="font-weight:bold">【怎么测】</span><span>（一组成熟的检索指标）</span></p>

<blockquote id="f-doxcnfOslvCCj48UiCM8dZxeaae"><p id="f-doxcnQZjJIF3VB1r6IePFPkq9Cf"><span>定性：不是并列的几个方法，而是</span><span style="font-weight:bold">把 RAG 切成"检索段 + 生成段"两段</span><span>，每段列出要看的</span><span style="font-weight:bold">考查维度</span><span>。前四个是检索段维度，第五个是生成段维度，最后一个是实战书的动手实现。</span></p></blockquote>

<ul><li id="f-doxcnpucjrhfI4HfrtJlMx0P7ng"><span style="font-weight:bold">【维度·检索段】context precision（上下文精确率）</span><span>：找回来的内容里，有多少是真正相关的；</span></li></ul>

<ul><li id="f-doxcnp9ckiWxVPvZ8S6Av93Drx1"><span style="font-weight:bold">【维度·检索段】context recall（上下文召回率）</span><span>：所有该找回的相关内容，找回了多少；</span></li></ul>

<ul><li id="f-doxcnAVnGwUxEl4D7uETzCSAFme"><span style="font-weight:bold">【维度·检索段】排序质量</span><span>：用 NDCG、MAP、MRR 衡量相关内容是否排在前面；</span></li></ul>

<ul><li id="f-doxcnwqjIkl274QvJPH5tLumtfe"><span style="font-weight:bold">【维度·检索段】嵌入模型质量</span><span>：用 MTEB、BEIR 这类基准评测你用的 embedding 模型好不好；</span></li></ul>

<ul><li id="f-doxcnD6oQzLotDgjMQRZqy35XGg"><span style="font-weight:bold">【维度·生成段】生成段的忠实度（faithfulness）</span><span>：生成的回答是否真的"扎根"于检索到的内容、有没有脱离资料瞎编。</span></li></ul>

<ul><li id="f-doxcnV4K71knP8o9yseUogboSAf"><span style="font-weight:bold">【实现】工程实操</span><span>：实战书第 8 章演示了直接看</span><span style="font-weight:bold">向量相似度分数</span><span>、调 </span><span style="font-weight:bold">top-n</span><span> 数量、试不同 </span><span style="font-weight:bold">chunk 切分策略</span><span> 对检索准确率的影响——这些都是能立刻上手调的旋钮。</span></li></ul>

<blockquote id="f-doxcnDOJkcdMGg6Q7ldDGtJdT4e"><p id="f-doxcnM1sNpSnDYABOr36HYlzq6c"><span>记忆要点：RAG 评测 = </span><span style="font-weight:bold">检索段（precision/recall/NDCG/MRR）+ 生成段（faithfulness）</span><span> 两段都要测。</span></p>
<p id="f-doxcnfCAGHKAKrePbNkvz8NaJwb"><span>💬 </span><span style="font-weight:bold">【面试卡片】</span><span style="font-weight:bold">Q：评估一个 RAG 系统，你会从哪些维度入手？用什么指标？</span></p>
<p id="f-doxcnnxBwAXejL45K3NhgL6hNRf"><span style="font-weight:bold">A：</span><span> RAG 是"先检索、再生成"，所以我会拆成检索段和生成段两段分别评。检索段看四个维度：context precision（找回的有多少是相关的）、context recall（该找回的找回了多少）、排序质量（用 NDCG / MAP / MRR 看相关内容排没排在前面）、以及嵌入模型质量（用 MTEB / BEIR 评 embedding）。生成段重点看忠实度（faithfulness）——回答是否真的扎根于检索内容、有没有脱离资料瞎编。工程上还能直接调向量相似度阈值、top-n 和 chunk 切分策略来提检索准确率。一句话：RAG 评测 = 检索段（precision/recall/NDCG/MRR）+ 生成段（faithfulness）两段都要测。</span></p></blockquote>

<a id="f-doxcn2l6F1KVbLMqyuqfbCOnT0d"></a>

###### 工具调用评测

<p id="f-doxcnkEUCQG1PVk3cvLRRsuQpJf"><span style="font-weight:bold">【是什么】</span><span> 评估 Agent 调用外部工具（API、函数、数据库）的能力——选对工具没有、参数填对没有、调用顺序对不对。</span></p>

<p id="f-doxcnHapMN7T6Zxb0ZQCuNDcPlp"><span style="font-weight:bold">【为什么测】</span><span> 工具调用是 Agent 区别于普通聊天机器人的核心能力，也是高频失败点。注意它有</span><span style="font-weight:bold">三个不同层次</span><span>，面试时能区分开会加分：</span></p>

<ul><li id="f-doxcnueuBanbPJMbZkvICK6Fkdf"><span style="font-weight:bold">能力层</span><span>：在很多工具里能不能选对、调对（龙猫：66 个工具 + 512 条依赖边的工具图）；</span></li></ul>

<ul><li id="f-doxcnb4jqsfRI9NjmvdzunDpF0f"><span style="font-weight:bold">行为层</span><span>：调用工具的顺序对不对（属于轨迹评测，见 3.5.2）；</span></li></ul>

<ul><li id="f-doxcnkzOvzQMwaBoIz89I60Gsvf"><span style="font-weight:bold">代码层</span><span>：工具函数本身写得对不对（实战书第 5 章用单元/集成测试逐个验证 semantic function）。</span></li></ul>

<p id="f-doxcnQ9sLWc5Prkm5WB1DEsCove"><span style="font-weight:bold">【怎么测】</span></p>

<blockquote id="f-doxcnLPCIP0KGv221CAJJ3nfesb"><p id="f-doxcnfFkpa3u95mZZugPy04vmdg"><span>定性：</span><span style="font-weight:bold">一个方法、分 3 步</span><span>（造考题 → 跑 Agent 逐项核对 → 补反例），三步按顺序走；其中第二步的"判分"内部有</span><span style="font-weight:bold">两个档位</span><span>可选。</span></p></blockquote>

<p id="f-doxcnQvat1hQ02RzanZyJoUv2ah"><span>核心思路是：</span><span style="font-weight:bold">造一批"考题"，让 Agent 去调工具，再逐项核对它调得对不对。</span><span> 这套方法可以参考业界权威的 Berkeley Function-Calling Leaderboard（BFCL，一套约 2000 道题的工具调用评测基准）——但要注意，BFCL 是</span><span style="font-weight:bold">选型期</span><span>（§3.2）用来给各家</span><span style="font-weight:bold">模型</span><span>的通用工具调用能力排名的，</span><span style="font-weight:bold">测的不是你自己的业务工具</span><span>。我们要做的，是</span><span style="font-weight:bold">借用它的判分方法，把题目换成自己项目的工具</span><span>。</span></p>

<p id="f-doxcnSQQaMcvrPAGUv1ikeapKx1"><span style="font-weight:bold">【步骤】第一步：制作测试集——每条用例长这样（三件套）</span></p>

<p id="f-doxcnutrzO53otcyQx9QtfkCnhg"><span>以智能预约 Agent 的 </span><span><span><span>check_weather</span></span></span><span> 工具为例，一条用例由三部分组成：</span></p>

<pre id="f-doxcnUNcjWXSlvGdeAxeiwQZNnf"><code>{
  // ① 用户问题（喂给 Agent）
  "query": "明天会下雨吗？我想约个按摩",

  // ② 可用工具清单（喂给 Agent，告诉它有哪些工具、参数是什么）
  "tools": [
    { "name": "check_weather",      "params": ["date(必填)", "city"] },
    { "name": "check_availability", "params": ["..."] }   // 干扰项，看会不会选错
  ],

  // ③ 标准答案（只给判分器，Agent 看不到）
  "expected": "check_weather(date=\"2026-06-26\")"
}</code></pre>

<p id="f-doxcnWGvskz6tpGCd1Vz5nbZooe"><span>把这样的用例攒成一个小数据集（几十条，覆盖常见、易错、和"不该调工具"的情况）。</span></p>

<p id="f-doxcnvn69TH4otYUa7rGhA4cAEf"><span style="font-weight:bold">【步骤】第二步：让 Agent 跑，再逐项核对</span></p>

<p id="f-doxcn9wN2emaaHcB61SSyX9f5wb"><span>把①②喂给 Agent，它会输出一个工具调用；判分器拿它和③标准答案</span><span style="font-weight:bold">像填检查表一样逐项核对</span><span>：① 工具名选对没 → ② 必填参数齐不齐 → ③ 有没有瞎编不存在的参数 → ④ 参数值对不对。任何一项错，这条就算失败，而且能精确定位错在哪一项。</span></p>

<p id="f-doxcniNRxlDQeGCyn3b2neatDac"><span>核对时有</span><span style="font-weight:bold">两个着眼点</span><span>，可二选一、也可搭配用：</span></p>

<ul><li id="f-doxcn5CuVTcstxc9rD8weaARiKq"><span style="font-weight:bold">看调用本身写得对不对</span><span>：只比对 Agent 吐出的这行调用——函数名、参数个数、参数值是否和标准答案一致。不依赖工具真实可用，无副作用、可复现，适合大批量离线判分。</span></li></ul>

<ul><li id="f-doxcnFQcCaXGtYEmOX2S8QS54wf"><span style="font-weight:bold">看真跑出来的结果对不对</span><span>：真的执行 </span><span><span><span>check_weather</span></span></span><span>，检查它的返回值。能抓住"调用写得对、但结果其实是错的"这类问题，最贴近真实，但会产生真实副作用、需联网、且结果可能随环境波动。</span></li></ul>

<ul><li id="f-doxcnwf7bJ1zzHaQSNXud6L1Osc"><span>实战中常</span><span style="font-weight:bold">两者搭配</span><span>：多数用例只核对调用本身，关键工具再补几条真执行兜底。</span></li></ul>

<div id="f-doxcnbiMn0gCkjVQwPP1Pwl64ge"><img alt="" decoding="async" height="853" loading="lazy" src="/images/agent-learning/70838283e9fb330697b2693e.png" width="1280"/></div>

<p id="f-doxcnhNsbRg23MQ61vATZxfxmyb"><span style="font-weight:bold">【步骤】第三步：别忘了"不该调"的反例</span><span> 专门放几条</span><span style="font-weight:bold">不需要工具</span><span>的问题（如"你们几点关门？"），看 Agent 会不会克制、不乱调工具——乱调就是"工具幻觉"。</span><span style="font-weight:bold">知道何时不该用工具，和知道何时该用一样重要。</span></p>

<blockquote id="f-doxcnAwPtPpGwuetV4GsWDKrY6b"><p id="f-doxcncNbwDkykN6emMwrJghnoVb"><span>三份资料的分工：判分方法（核对调用 / 核对结果）来自 </span><span style="font-weight:bold">AI Eng</span><span>；在一堆工具里选对的难度由 </span><span style="font-weight:bold">龙猫</span><span>（66 工具依赖图）刻画；每个工具函数本身的对错由 </span><span style="font-weight:bold">实战书</span><span>第 5 章 </span><span><span><span>test_*.py</span></span></span><span> 单测保证。</span></p>
<p id="f-doxcnpGKknh7ftBLRPPrpQNl4xe"><span>💬 </span><span style="font-weight:bold">【面试卡片】</span><span style="font-weight:bold">Q：怎么评估 Agent 的工具调用能力？它有哪几个层次？</span></p>
<p id="f-doxcnMx7MH96QslRhlxL9sKHpkg"><span style="font-weight:bold">A：</span><span> 我会分三个层次看：</span><span style="font-weight:bold">能力层</span><span>——在很多工具里能不能选对、调对（龙猫用 66 个工具加 512 条依赖边的工具图来考）；</span><span style="font-weight:bold">行为层</span><span>——调用顺序对不对，这归轨迹评测；</span><span style="font-weight:bold">代码层</span><span>——工具函数本身写得对不对，用单元/集成测试逐个验证。具体测法是：先造测试集（用户问题 + 可用工具清单 + 标准答案三件套，含干扰项），再让 Agent 跑、逐项核对工具名选对没、必填参数齐不齐、有没有瞎编参数、参数值对不对，任一项错即失败、还能定位错在哪。核对时可以只看调用本身写得对不对（不依赖工具真实可用、无副作用、可大批量离线判），也可以真执行一遍看返回结果对不对（能抓住调用对但结果错的情况，但有副作用、需联网），两者常搭配用。最后别忘了放几条"不该调工具"的反例，看 Agent 会不会克制、避免工具幻觉。</span></p></blockquote>

<a id="f-doxcnMwrUJxOm4SX7ecGawtuTbe"></a>

###### 规划 / 推理评测

<p id="f-doxcnUGu6y4KdqrKwIUByFaM3Ob"><span style="font-weight:bold">【是什么】</span><span> 评估 Agent 的"大脑"——它能不能把一个复杂任务拆解成合理步骤、并在执行中正确推理。</span></p>

<p id="f-doxcnPaWErQ8RslcjhqGBbI4mVe"><span style="font-weight:bold">【为什么测】</span><span> 先划清和上一节的界线：</span><span style="font-weight:bold"> 工具调用看的是"某一次调用填得对不对"（单点动作）， 规划/推理看的是"整条决策链对不对"（全局思路）。</span><span> 一个管"手"，一个管"脑"——Agent 可能每一步调用都很标准，却从一开始就想错了该做什么。</span></p>

<p id="f-doxcnBnqx71ypemHqTAiOqJMqBc"><span>《AI Engineering》把规划失败拆成三类，正好告诉我们"要盯哪些错" ：</span></p>

<ul><li id="f-doxcnufLPhKr1Cc6qQhCISwpqqb"><span style="font-weight:bold">该不该用这个工具 / 这一步</span><span>：在决策层面选错了工具或多走了无谓的一步（注意：选哪个工具属于这里；至于参数填没填对，归 3.4.3）；</span></li></ul>

<ul><li id="f-doxcnlTiMbycXeD1MoKVcNnnO8b"><span style="font-weight:bold">目标失败</span><span>：没达成目标，或达成了但</span><span style="font-weight:bold">违反了约束</span><span>（书里特别强调"时间"约束最容易被忽略，比如约到了营业时间之外）；</span></li></ul>

<ul><li id="f-doxcnWxZPaSf6NaMozlt4T6Opzg"><span style="font-weight:bold">反思错误</span><span>：任务没真完成，Agent 却</span><span style="font-weight:bold">误以为完成了</span><span>就停手。</span></li></ul>

<p id="f-doxcnCYDWvxGpBT1UpKahjlFCUc"><span style="font-weight:bold">【怎么测】</span></p>

<blockquote id="f-doxcnOaRwPa8Y94zJUKAC09arGg"><p id="f-doxcnAlfbNXeFDCFRMYiWKEX6Ob"><span>定性：</span><span style="font-weight:bold">一个方法、分 3 步</span><span>（造带"理想步骤链"的考题 → 跑 Agent 对照三类失败核对 → 统计并借力三本书的机制）。第三步底下三个点是</span><span style="font-weight:bold">三份资料各自的实现</span><span>，并列、可任选增强。</span></p></blockquote>

<p id="f-doxcne0ywpMsaA1ynHm2rbUU3jd"><span>核心思路是：</span><span style="font-weight:bold">给 Agent 一个需要分几步才能完成的任务，记录它实际走的"步骤链"，再和"理想步骤链"对比，看它有没有想错。</span><span> 和 3.4.3 不同——这里不抠单次调用的参数，而是看整条路对不对。</span></p>

<p id="f-doxcn53RLSRZ9dBH6lB7euMT7wb"><span style="font-weight:bold">【步骤】第一步：制作测试集——每条用例长这样</span></p>

<p id="f-doxcny5ETvnkODPIW6wwsojHvhv"><span>以智能预约 Agent 的"约按摩"任务为例，一条用例记录的是</span><span style="font-weight:bold">理想步骤序列 + 约束</span><span>：</span></p>

<pre id="f-doxcn3mzP2gixMHMg9ze1kD8k4c"><code>{
  // ① 任务
  "task": "帮我约明天下午两点、60分钟的精油按摩",

  // ② 理想步骤链（Agent 应该按这个顺序推进）
  "expected_plan": ["查档期", "匹配技师", "确认下单"],

  // ③ 必须满足的约束（违反就算失败）
  "constraints": ["时间=明天14:00", "时长=60分钟", "时间需在营业时间内"]
}</code></pre>

<p id="f-doxcnaWkJtc7aUy12HIMLy8r1Zd"><span style="font-weight:bold">【步骤】第二步：跑 Agent，对照三类失败逐一检查</span></p>

<p id="f-doxcn0o63PmdIbss3lDOCnJjysh"><span>让 Agent 真的去执行，记录它实际走了哪几步，然后对照三类失败核对：</span></p>

<ul><li id="f-doxcni0CuPuzcKNkFYV6WhzXRtd"><span style="font-weight:bold">步骤链对吗</span><span>：看实际步骤 vs 理想步骤。典型失败——没"查档期"就直接"确认下单"，属于步骤缺失。</span></li></ul>

<ul><li id="f-doxcnZ7BJQfoq6Ove7weyMPxWV3"><span style="font-weight:bold">守住约束吗</span><span>：看有没有违反约束。典型失败——约到了晚上 20:00（超营业时间），属于违反约束。</span></li></ul>

<ul><li id="f-doxcnQMHQbKehqmft35igKz0tAe"><span style="font-weight:bold">反思对吗</span><span>：看是否真完成才收尾。典型失败——技师没匹配上，却回复"已约好"，属于自以为完成。</span></li></ul>

<p id="f-doxcn48eCSo6zZ3BzbEIbdpU6gd"><span style="font-weight:bold">【步骤】第三步：统计 + 借力</span><span>（下面三点是三份资料各自的实现，可任选叠加）</span></p>

<ul><li id="f-doxcnIyZOjJlDva8LLPwE9OYHce"><span style="font-weight:bold">【实现·AI Eng】失败模式频率统计</span><span>：评估本质是"识别失败模式 + 数每种出现多少次"。常用指标：有效计划占比、平均要试几次才产出有效计划。</span></li></ul>

<ul><li id="f-doxcn8EmJydDgFuPk3xkyioLnNc"><span style="font-weight:bold">【实现·龙猫】复杂度可控的 benchmark</span><span>：龙猫用"推理复杂度"维度（观测空间大小、部分可观测程度、推理点数量）量化任务有多难，从而系统地考规划。</span></li></ul>

<ul><li id="f-doxcnKR8m0gCPdsOYFdIk3oK83u"><span style="font-weight:bold">【实现·实战书】推理自评机制</span><span>：实战书第 10 章用 self-consistency（生成多条推理路径、投票选最一致的）和 tree-of-thought 来提升并间接评估推理质量。</span></li></ul>

<p id="f-doxcnnGzfiiPjzDlmvOVnOgYIJF"><span>第二步只标出了"这条用例哪里错了"，第三步要把它</span><span style="font-weight:bold">变成可比较的数字</span><span>。分三件事，前两件是"怎么打分"，最后一件是"怎么把题出难"——别混在一起：</span></p>

<p id="f-doxcneJsHYtHPwvGenkuTutf7xf"><span style="font-weight:bold">(1) 给单条路径打分——两种判法，按有没有标准答案选</span></p>

<ul><li id="f-doxcn3oONPfvcFf89d7tv05nUjg"><span style="font-weight:bold">和标准答案比相似度</span><span>（实战书第 10 章的实际做法）：把 Agent 最终答案和 </span><span><span><span>expected</span></span></span><span> 都转成向量，算语义相似度，得一个 0~1 的分（书里样例就直接输出 </span><span><span><span>evaluation_score: 0.957</span></span></span><span>）。适合有明确标准答案的题。</span></li></ul>

<ul><li id="f-doxcnMSXK96Gl5BO8Q0oRcO7job"><span style="font-weight:bold">看多条路径自不自洽</span><span>（self-consistency，</span><span style="font-weight:bold">不需要标准答案</span><span>）：对同一任务让 Agent 生成 N 条推理路径，然后</span></li></ul>

<div id="f-doxcnPXV5K5jpiWZ7BUsexTqYKc" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">多数投票选答案</span><span>：N 条结论里哪个出现得最多就采纳它，离群的那条丢掉（书里例子：3 条里 2 条一致，就取那 2 条）；</span></div></div>

<div id="f-doxcnAXv77R3ohmpw47VC2YkZY9" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">一致性 = 可信度</span><span>：多数有多集中本身就是分数——大多数路径都指向同一答案 → 推理稳、可信；各说各话没有多数 → 说明没想清、可信度低。</span></div></div>

<p id="f-doxcnxAqK7bNR30yIsbUHn4z1W5"><span style="font-weight:bold">(2) 汇总成整体指标</span><span>：评估本质是"识别失败模式 + 数每种出现多少次"。把很多条用例的结果汇总，算：有效计划占比、平均要试几次才产出一个有效计划、各类失败（步骤缺失/违反约束/自以为完成）各占多少。</span></p>

<p id="f-doxcnLFRa2ydAhfJYPgH7MJW3jh"><span style="font-weight:bold">(3) 让题目更难更系统</span><span>（属于"出题"不是"打分"）：用"推理复杂度"维度（观测空间大小、部分可观测程度、推理点数量）拧难度旋钮，系统地造出从易到难的题，避免"题太水、高分也说明不了能力"。</span></p>

<div id="f-doxcnOODCGskCskZogay1Vfh5Rg"><img alt="" decoding="async" height="853" loading="lazy" src="/images/agent-learning/88f7d5853a3d8033a951a51e.png" width="1280"/></div>

<blockquote id="f-doxcnSHIh6owjdrEki2jiGfyavd"><p id="f-doxcnRNJ8CU6HPh3WzTsrN52D8b"><span>一句话记忆：规划评测 = </span><span style="font-weight:bold">对照"理想步骤链"，盯三类失败（步骤选错 / 违反约束 / 自以为完成）→ 给路径打分（和标准答案比相似度，或用 self-consistency 多数投票+一致性）→ 汇总成频率指标</span><span>。龙猫的复杂度维度负责把题出难。它看的是整条路，3.4.3 看的是路上的每一步调用。</span></p></blockquote>

<a id="f-doxcnYkSbnGrl9Z13MrJ52VZQkd"></a>

##### 上线前 · 集成 / 系统评测

<p id="f-doxcnop5CQhmXQDUBrQVZMKK3So"><span>零件合格不等于整机合格。这一阶段把 Agent 当成一个整体，看它端到端能不能真的把任务办成。</span></p>

<a id="f-doxcnOIVBIrzxyY3duUdpmH4iOf"></a>

###### 任务结果评测

<p id="f-doxcnGlsZ55ZMUKoqUE9Ih06Pmg"><span style="font-weight:bold">【是什么】</span><span> 最直接的一问：给 Agent 一个完整任务，它最终</span><span style="font-weight:bold">做成了没有</span><span>。</span></p>

<p id="f-doxcn0MWD23n3uux11iJMKuKg2d"><span style="font-weight:bold">【为什么测】</span><span> 这是用户唯一真正关心的东西。但"做成没有"的判定方式，三份资料因</span><span style="font-weight:bold">目的不同而选了不同严格度</span><span>，这点很值得讲（面试亮点）：</span></p>

<ul><li id="f-doxcnSU8yMChDHvr64WTY6LEGJc"><span style="font-weight:bold">龙猫</span><span>：用</span><span style="font-weight:bold">全有或全无</span><span>——Pass@k / Pass^k（跑 k 次有一次成功 / k 次全成功）。因为要给模型严格</span><span style="font-weight:bold">排名</span><span>，必须能拉开差距。</span></li></ul>

<ul><li id="f-doxcn1vzQ8xT5Lv2ebFwgoQXUzb"><span style="font-weight:bold">实战书</span><span>：用</span><span style="font-weight:bold">1–5 分级</span><span>（rubric 打分）。因为开发期要</span><span style="font-weight:bold">诊断</span><span>哪里弱，需要颗粒度。</span></li></ul>

<ul><li id="f-doxcnEcH1LASjcoSuAOlJU8crJh"><span style="font-weight:bold">设计模式</span><span>：用</span><span style="font-weight:bold">语义相似度 / 忠实度</span><span>（连续分）。因为要</span><span style="font-weight:bold">持续监控</span><span>漂移，需要连续信号。</span></li></ul>

<blockquote id="f-doxcnAFRbO8cuzncLcTVDeALrMb"><p id="f-doxcnJQXTw7FE8nXKksiMVNjn5e"><span>关键认知：</span><span style="font-weight:bold">这不是矛盾，而是"目的决定方法"</span><span>——排名要严、诊断要细、监控要连续。用错了场景（比如拿 Pass^k 做日常开发诊断）就会觉得"怎么全是 0 分"。</span></p>
</blockquote>

<p id="f-doxcnsRnPpfup30ImjTSSskuype"><span style="font-weight:bold">【怎么测】</span></p>

<blockquote id="f-doxcnZLuQ1n4cyfeyLBq400Oxzd"><p id="f-doxcnhQ0FtpMuqlYtQeMftQbtog"><span>定性：判分方法不是并列的方法，而是</span><span style="font-weight:bold">按"你的目的"选一档严格度</span><span>——目的决定方法（接上表）。</span></p></blockquote>

<ul><li id="f-doxcngDoPEUE9ti4XraDzOcf6Ed"><span style="font-weight:bold">【档位·要排座次/狠考】</span><span>：用 Pass@k / Pass^k，温度固定，每个任务重复多次。龙猫用 </span><span style="font-weight:bold">Pass^4</span><span>（同一任务跑 4 次必须全对）来逼出模型的稳定性。</span></li></ul>

<ul><li id="f-doxcnkxqifoWSVEsipGgKu9cBXf"><span style="font-weight:bold">【档位·要诊断改进】</span><span>：用 rubric 多维度 1–5 分，看具体哪一维拉胯。</span></li></ul>

<a id="f-doxcnzatI8p6FloX5Y2AHgG2fR9"></a>

###### 轨迹评测

<p id="f-doxcnBaYlaVCD351R4sDDBh1KUd"><span style="font-weight:bold">【是什么】</span><span> 不只看终点，还要看 Agent </span><span style="font-weight:bold">走到终点的整条路径</span><span>——它依次做了哪些动作、调了哪些工具、顺序对不对。这是设计模式书讲得最系统的部分。</span></p>

<p id="f-doxcnw4An4eqIBXRMdq7TptPlmb"><span style="font-weight:bold">【为什么测】</span><span> 一个 Agent 可能"蒙对了"答案，但过程一塌糊涂（多绕了 10 步、调了不该调的工具）；也可能答案略有瑕疵但过程完全正确。</span><span style="font-weight:bold">只看结果会误判</span><span>，轨迹评测能看出 Agent 是不是"真的会"，也能定位它在哪一步出错。</span></p>

<p id="f-doxcnldWtAQzdnZnQLtpEskdzxd"><span style="font-weight:bold">【怎么测】</span></p>

<blockquote id="f-doxcntvseoJVrb9VH1MPzWEhKKb"><p id="f-doxcnwMQn3UbTSmFyOrcmz9NK8b"><span>定性：这里其实是</span><span style="font-weight:bold">两个独立方法</span><span>。方法一"轨迹比对"内部有 </span><span style="font-weight:bold">5 个档位</span><span>（从最严到最松，按需求选）；方法二是实战书的"Judge-Verifier 回路"，另起一种思路。</span></p></blockquote>

<ul><li id="f-doxcniOVIc5e9lGTbNwrsVJrYnb"><span style="font-weight:bold">▶ 方法一 · 把实际轨迹和标准轨迹做比对</span><span>，松紧分 5 档：</span></li></ul>

<div id="f-doxcndkuvUVSrqGLfLBcQnQrlfc" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">【档位·最严】精确匹配</span><span>：动作序列和标准轨迹完全一致；</span></div></div>

<div id="f-doxcn34V6Dv3CwGkFIRN5YIaeLb" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">【档位】按序匹配（in-order）</span><span>：关键动作按正确顺序出现即可，允许中间有别的；</span></div></div>

<div id="f-doxcnXMETKZIxDMKJH2vAX7xkeb" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">【档位】任意顺序匹配（any-order）</span><span>：关键动作都出现就行，不计顺序；</span></div></div>

<div id="f-doxcnqOAMDhSV4ZD6Wr80wbJqnh" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">【档位】精确率 / 召回率</span><span>：实际动作里有多少是该做的、该做的做了多少；</span></div></div>

<div id="f-doxcnl6JhrOc7vQkRomMfZcaYee" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">【档位·最细】单一工具使用</span><span>：单独看某个关键工具用得对不对。</span></div></div>

<ul><li id="f-doxcn10vEx5d3v3OlE8yq0pZ0kv"><span style="font-weight:bold">▶ 方法二 · Judge-Verifier 回路</span><span>：实战书第 6 章用行为树搭了"Hacker→Judge→Verifier"三段式——Judge Agent 评判解答，Verifier Agent 在独立线程</span><span style="font-weight:bold">真的把代码跑一遍</span><span>做二次验证。这是轨迹+结果双重把关的好例子。</span></li></ul>

<div id="f-doxcnZUuwM0RufU6FCeRPPSPZEc"><img alt="" decoding="async" height="840" loading="lazy" src="/images/agent-learning/b5452703a61549e19bc606d8.png" width="1280"/></div>

<blockquote id="f-doxcnwXwLr6tNbcDyVoZnKqKb5d"><p id="f-doxcnnr0THls0chUTXMqAeNLlHb"><span>💬 </span><span style="font-weight:bold">【面试卡片】</span><span style="font-weight:bold">Q：一个 Agent 最终答对了，但你为什么还要看它的"轨迹"？</span></p></blockquote>

<blockquote id="f-doxcnnSiPQXRQKW7GVDy37WnXJd"><p id="f-doxcnKwP7X91evZYN09kGUqnGpb"><span style="font-weight:bold">A：</span><span> 因为只看结果会误判。一个 Agent 可能"蒙对了"答案，但过程一塌糊涂——多绕了十步、调了不该调的工具、烧了不该烧的成本；也可能答案略有瑕疵但过程完全正确。轨迹评测看的是它走到终点的整条路径：依次做了哪些动作、调了哪些工具、顺序对不对。这样既能判断 Agent 是不是"真的会"、能不能稳定复现，也能精确定位它在哪一步出错。</span></p>
<p id="f-doxcnP8381k9mR7yZgkmm7qk7og"><span>做法是把实际轨迹和标准轨迹比对，按需求选松紧档——精确匹配、按序匹配、任意顺序匹配、精确率/召回率、单一工具使用；</span></p>
<p id="f-doxcnQcBsAJtZXQb1vLbXJ2WxXe"><span>也可以用 Judge-Verifier 回路，让一个 Agent 评判、另一个真的把代码跑一遍做二次验证，轨迹和结果双重把关。</span></p></blockquote>

<a id="f-doxcnZFVkk6cNrd1NlQ5PaSOStc"></a>

###### 多轮交互评测

<p id="f-doxcnbm3DprkmcVdZmPUH0t3L4c"><span style="font-weight:bold">【是什么】</span><span> 评估 Agent 在</span><span style="font-weight:bold">多轮对话</span><span>中的表现——用户会追问、改主意、说得含糊，Agent 能不能跟得住。这是龙猫几乎</span><span style="font-weight:bold">独家</span><span>深入的领域。</span></p>

<p id="f-doxcnWMHHHZ43NStTeuhpQQuTYb"><span style="font-weight:bold">【为什么测】</span><span> 真实用户不会一次把需求说全。前面的组件评测、单轮评测都假设"一问一答"，但实际场景是"边聊边改"。如果不专门测多轮，上线后才会发现 Agent 一到真实对话就乱套。</span></p>

<p id="f-doxcnpUzazi4zKSw5GtfqYpJQpd"><span style="font-weight:bold">【怎么测】</span></p>

<blockquote id="f-doxcnzeyZgkej0WkccsXTrXaCpe"><p id="f-doxcnitjvUMgdS8wTlsLlzGQMKK"><span>定性：这是一套完整流程，不是三种方法任选。核心是：</span><span style="font-weight:bold">固定"环境 + 隐藏用户目标 + 评分 Rubric"，让用户模拟器动态生成多轮对话，被测 Agent 正常应对，最后用终态 + Rubric 判断任务是否完成。</span></p></blockquote>

<p id="f-doxcnVU0O6roco1XIgJCQ2g0jMh"><span style="font-weight:bold">第一步：制作多轮评测数据集，但不是写死对话文本</span></p>

<p id="f-doxcn1uRSlnKTBkXebIrBxsPcXh"><span>多轮评测的样本不是"用户问一句、标准答案一句"，而是一个任务包。它通常包含三件固定内容：</span></p>

<pre id="f-doxcnK1FgLBUezw5oCM0PN3f0NS"><code>{
  "environment": {
    "restaurant": "川味小馆",
    "menu": [
      {"name": "麻婆豆腐", "price": 38, "stock": 5},
      {"name": "水煮鱼", "price": 88, "stock": 2}
    ],
    "delivery_slots": ["18:30", "19:00", "19:30"]
  },
  "user_goal_card": {
    "hidden_goal": "点一份麻婆豆腐",
    "budget": "不超过50元",
    "delivery_time": "19:00前送达",
    "dynamic_change": "中途把'微辣'改成'不辣'"
  },
  "rubric": [
    "最终商品必须是麻婆豆腐",
    "口味必须是不辣",
    "金额不能超过50元",
    "送达时间不能晚于19:00",
    "下单前必须向用户复述确认"
  ]
}</code></pre>

<p id="f-doxcnc1sZf0TMwA6eKzcvBrJq2e"><span>这里要特别分清三份信息给谁看：</span></p>

<ul><li id="f-doxcnjZwS7ftG4IVJ7BMDGqIoIb"><span style="font-weight:bold">环境 / 后台状态</span><span>：被测 Agent、用户模拟器、判分器都可用，作用是提供菜单、库存、价格、时间槽等客观世界。</span></li></ul>

<ul><li id="f-doxcnwHc68naFdxV81JZ0sFeB5c"><span style="font-weight:bold">隐藏用户目标卡</span><span>：只给用户模拟器，作用是规定用户真正想完成什么、何时改主意。</span></li></ul>

<ul><li id="f-doxcnO8QGFiMBamskDWfhibrYE1"><span style="font-weight:bold">评分 Rubric</span><span>：只给判分器，作用是规定最后怎么判 Pass / Fail。</span></li></ul>

<p id="f-doxcn6UKVQcjE7Iu9XEbfJH7cNe"><span>被测 Agent </span><span style="font-weight:bold">看不到隐藏用户目标卡，也看不到评分 Rubric</span><span>。它只能像真实线上一样，根据用户模拟器一句一句说出来的话来追问、推荐、调用工具、确认和下单。</span></p>

<p id="f-doxcnlPDYPvtfuzuCQ7AWgj7U7c"><span style="font-weight:bold">第二步：运行时由用户模拟器动态生成多轮对话</span></p>

<p id="f-doxcn72jv3MLWnvYOagJ5GRMJHc"><span>用户模拟器拿着隐藏目标卡扮演真实用户。它不会把目标一次性说全，而是会含糊表达、追问、改主意。例如：</span></p>

<pre id="f-doxcnucONPbJQ0iqar1uEiWjGsd"><code>User Simulator：我想点个下饭的，别太贵。
Tested Agent：可以看看麻婆豆腐，38 元。需要什么辣度？
User Simulator：微辣吧。
Tested Agent：配送时间选 18:30 还是 19:00？
User Simulator：等下，改成不辣，19:00 前到。
Tested Agent：确认一下：一份不辣麻婆豆腐，38 元，19:00 前送达，可以下单吗？
User Simulator：可以。
Tested Agent：已下单。</code></pre>

<p id="f-doxcnjbsfDnjcoa04Qq0W7l2ukf"><span>这段对话不是数据集里提前写死的，而是运行时生成的。同一个任务重复跑多次，用户模拟器可能换一种说法、换一个改口时机，这正好用来测试 Agent 的多轮鲁棒性。</span></p>

<p id="f-doxcnRp5RBUvANsH6z2uwKP8Tup"><span style="font-weight:bold">第三步：对话结束后，用"终态 + Rubric"判分</span></p>

<p id="f-doxcnAA1LmLqq3gJb2sNvxiTuqg"><span>判分不是拿整段对话去比一段"标准对话"，而是看最后状态和关键行为是否满足 Rubric：</span></p>

<ul><li id="f-doxcn8yCnH8vNsZOrRYTMgy69Uf"><span style="font-weight:bold">结构化终态用代码判</span><span>：商品是不是麻婆豆腐、价格是否 ≤ 50、送达时间是否 ≤ 19:00；</span></li></ul>

<ul><li id="f-doxcn2zlGPm6SM02wwpbsEtDq3f"><span style="font-weight:bold">语义行为用 LLM judge 判</span><span>：有没有在下单前复述确认、有没有正确处理用户中途改口、有没有擅自臆测。</span></li></ul>

<p id="f-doxcn6Mlzcopcy5c1LuNDunBovc"><span>最后可以像龙猫那样用 </span><span style="font-weight:bold">Pass^4</span><span>：同一道任务跑 4 次，每次对话都可能不同，4 次都通过才说明 Agent 真稳定。</span></p>

<blockquote id="f-doxcnlAQQm8SgZsOurnH5t7dsFh"><p id="f-doxcnaeo1RJnwahShTThzpgDN0b"><span>一句话记忆：多轮交互评测不是固定"标准对话"，而是固定</span><span style="font-weight:bold">环境、隐藏目标和评分标准</span><span>；随机的是用户模拟器生成的对话路径；最终判的是</span><span style="font-weight:bold">任务终态和关键行为</span><span>是否满足 Rubric。</span></p></blockquote>

<div id="f-doxcnk8V6YjohqlsFxjmBa2IKTb"><img alt="" decoding="async" height="853" loading="lazy" src="/images/agent-learning/e9c4c36f3d51210e8932d79c.png" width="1280"/></div>

<a id="f-doxcnUryBeUR519VNB9FTiZfjdd"></a>

###### 多 Agent 协作评测

<p id="f-doxcnY1FtSDdaNTYi6V4AVz8J0f"><span style="font-weight:bold">【是什么】</span><span> 当系统由多个 Agent 组队完成任务时，评估这个"团队"协作得好不好。</span></p>

<p id="f-doxcn3BCmabigZdPMZZtkOm5Ofc"><span style="font-weight:bold">【为什么测】</span><span> 多 Agent 系统多出一层全新的失败面——它们之间会不会有效协作、有没有选对该干活的 Agent、加 Agent 到底是帮忙还是添乱。单 Agent 的指标测不出这些"团队动态"。</span></p>

<p id="f-doxcnAL7FakuDTjZgz6Zs4QJlgq"><span style="font-weight:bold">【怎么测】</span></p>

<blockquote id="f-doxcnxyQW5Aiw4HXvDederWAPNd"><p id="f-doxcnLYkjUsmkKBwdS1YV1qFLyg"><span>定性：</span><span style="font-weight:bold">"协作好不好"不要抽象地打一个总分，而要拆成三套可执行测法</span><span>：①对照标准流程看交接对不对；②做消融实验看每个 Agent 有没有真实贡献；③用质检 Agent / trace 抓过程病征。三套可以叠加使用。</span></p></blockquote>

<p id="f-doxcnI1JkqkZfRJ2hu06uhuNcof"><span>先给一个具体例子。假设智能预约系统有 4 个 Agent：</span></p>

<pre id="f-doxcnRPcZbyfFg8XhvcxiNzMxDe"><code>Router Agent        负责判断用户意图，决定交给谁
Calendar Agent      负责查档期
Weather Agent       负责查天气
Booking Agent       负责最终预约下单</code></pre>

<p id="f-doxcn0pBmTcC98jEAqUgbGdImBc"><span>一条测试任务可以写成这样：</span></p>

<pre id="f-doxcnZM8crlwc4iDDrW3gPDNTeo"><code>{
  "task": "帮我约明天下午2点的精油按摩，如果明天下雨就改到后天",
  "expected_handoffs": [
    "Router -&gt; Weather Agent(date=明天)",
    "Weather Agent -&gt; Router(result=rain)",
    "Router -&gt; Calendar Agent(date=后天, time=14:00)",
    "Calendar Agent -&gt; Booking Agent(slot=后天14:00)"
  ],
  "expected_final_state": {
    "booking_date": "后天",
    "booking_time": "14:00",
    "service": "精油按摩"
  }
}</code></pre>

<p id="f-doxcnyHfj2c2QLzg5KUSW7ASzpd"><span style="font-weight:bold">方法一：交接轨迹评测，看"团队配合有没有走对"</span></p>

<p id="f-doxcnJyLyMt0M7uDWqJsDi35Dng"><span style="font-weight:bold">怎么实现：</span></p>

<ol start="1"><li id="f-doxcn0mPnSqUHTOlpgFl5uUzkmg"><span style="font-weight:bold">准备评测集</span><span>：每条 case 不只写最终答案，还要写 </span><span><span><span>expected_handoffs</span></span></span><span>，也就是谁应该把什么信息交给谁。</span></li></ol>

<ol start="2"><li id="f-doxcnmr1HGIEJ4y9YXYBHACONfd"><span style="font-weight:bold">跑完整多 Agent 系统</span><span>：记录每次 Agent 调用、输入、输出、交接对象，形成 trace。</span></li></ol>

<ol start="3"><li id="f-doxcnNDH2ozn2bYxPAitOTiC5Cc"><span style="font-weight:bold">对照标准交接链判分</span><span>：逐项检查有没有选对 Agent、有没有传对关键字段、顺序是否合理、最终状态是否正确。</span></li></ol>

<p id="f-doxcnNpOBlfcXAZohKxzOvlf8th"><span style="font-weight:bold">看哪些指标：</span></p>

<ul><li id="f-doxcn7XQ6dXFk2INakr9jgrEksg"><span style="font-weight:bold">Agent 选择正确率</span><span>：该查天气时有没有交给 Weather Agent，而不是通用问答 Agent。</span></li></ul>

<ul><li id="f-doxcniehPehaxksRycUrsxfEa5d"><span style="font-weight:bold">交接字段完整率</span><span>：日期、时间、服务项目、用户约束有没有传丢。</span></li></ul>

<ul><li id="f-doxcno5teZMfsWdlpQSY2HY6z2b"><span style="font-weight:bold">交接顺序正确率</span><span>：是否先查天气再改日期，是否在查档期前就贸然下单。</span></li></ul>

<ul><li id="f-doxcnZOSumtHHyxBfpW4wvQ475d"><span style="font-weight:bold">端到端成功率</span><span>：最终预约状态是否满足任务目标。</span></li></ul>

<p id="f-doxcnzNvLZwwJiifbq9G3yHtkfg"><span style="font-weight:bold">能定位什么问题：</span><span> 如果最终约错了日期，trace 能告诉你到底是 Router 没调用 Weather Agent，还是 Weather Agent 查对了但 Router 没把"下雨→改后天"传给 Calendar Agent。</span></p>

<p id="f-doxcnXMH9cFZE6TiX5cpGPtKbvh"><span style="font-weight:bold">方法二：消融评测，看"多加一个 Agent 到底有没有用"</span></p>

<p id="f-doxcnh94J6AX5vqYRxfKK09IIwc"><span style="font-weight:bold">怎么实现：</span><span> 固定同一批 evalset，跑几组对照实验：</span></p>

<ul><li id="f-doxcn9rAJ1hTXzf3Wk7bfEly5ng"><span style="font-weight:bold">Full Team</span><span>：Router + Weather + Calendar + Booking 全部启用，用来看多 Agent 的完整表现。</span></li></ul>

<ul><li id="f-doxcnISoLmuQL3FOsDGd0pzhDFv"><span style="font-weight:bold">No Weather</span><span>：去掉 Weather Agent，天气逻辑由 Router 或主 Agent 自己处理，用来看天气 Agent 是否真的贡献准确性。</span></li></ul>

<ul><li id="f-doxcnxjesbnVrHEGCM6aW3S3PVg"><span style="font-weight:bold">No Router</span><span>：去掉 Router，所有任务直接给主 Agent，用来看路由 Agent 是否减少误分发。</span></li></ul>

<ul><li id="f-doxcnciVNVMm3xsXUgEkhwXmANb"><span style="font-weight:bold">Single Agent</span><span>：一个大 Agent 全包，和多 Agent 架构做基线对比。</span></li></ul>

<p id="f-doxcnkoiH8cHenq6DB82HhwvSyd"><span style="font-weight:bold">看哪些指标：</span></p>

<ul><li id="f-doxcnZjTzBkO0op0Jxxs6wlOHoh"><span style="font-weight:bold">成功率差值</span><span>：</span><span><span><span>Full Team 成功率 - No Weather 成功率</span></span></span><span>，差值大说明 Weather Agent 有价值。</span></li></ul>

<ul><li id="f-doxcnDOwZPNBPuK9vluQhV6wq5P"><span style="font-weight:bold">成本 / 延迟差值</span><span>：多 Agent 成功率提高了，但是否多花太多 token、调用太慢。</span></li></ul>

<ul><li id="f-doxcnxuivsdvXPMGW4u9RMtmVBe"><span style="font-weight:bold">错误类型变化</span><span>：去掉某个 Agent 后，是工具错、计划错、交接错，还是最终状态错。</span></li></ul>

<ul><li id="f-doxcnLIH2DkQIyHrSHC690EC5if"><span style="font-weight:bold">边际收益</span><span>：增加第 N 个 Agent 后，成功率是否继续升，还是开始下降。</span></li></ul>

<p id="f-doxcnnp6pkCenaClTAU3EvTe1se"><span style="font-weight:bold">能定位什么问题：</span><span> 如果 Full Team 比 Single Agent 成功率只高 1%，但 token 成本翻倍，说明多 Agent 架构可能过度设计；如果 No Router 版本误调工具率大幅上升，说明 Router Agent 是必要组件。</span></p>

<p id="f-doxcn8bERz56Y6rfbBrIFCy3ffd"><span style="font-weight:bold">方法三：过程监控 + 质检 Agent，看"协作过程中有没有病征"</span></p>

<p id="f-doxcncrK46XgDsjblgm5wOJTDge"><span style="font-weight:bold">怎么实现：</span></p>

<ol start="1"><li id="f-doxcnk6j332je3yWS6UsYmW6JWe"><span style="font-weight:bold">给每次多 Agent 协作开 trace</span><span>：用 AgentOps 或类似 tracing 工具记录每个 Agent 的输入、输出、耗时、token、调用次数。</span></li></ol>

<ol start="2"><li id="f-doxcnPj7xdEhoNLg1FOQ7CZhBvf"><span style="font-weight:bold">配置质检 Agent / Reviewer Agent</span><span>：让它在每一步或每几步后检查当前状态，例如"是否已经满足用户约束？是否有 Agent 在重复搜索？是否应升级人工？"。</span></li></ol>

<ol start="3"><li id="f-doxcn2NS445VJtqbPf7lhXYlaSc"><span style="font-weight:bold">把质检结果结构化输出</span><span>：例如 </span><span><span><span>handoff_ok / repeated_reasoning / missing_context / wrong_agent / should_stop</span></span></span><span>。</span></li></ol>

<p id="f-doxcn6VB9md09DgSzkrtZmxJyqd"><span style="font-weight:bold">看哪些指标：</span></p>

<ul><li id="f-doxcnTDGETW11DTo0TzQ1iZcKFf"><span style="font-weight:bold">重复思考 / 重复调用次数</span><span>：同一个 Agent 反复查同一件事，说明团队在打转。</span></li></ul>

<ul><li id="f-doxcnm3m6DA4tJQpy2zR5qWhgoc"><span style="font-weight:bold">无效交接次数</span><span>：下游 Agent 收到的信息不够，必须追问上游。</span></li></ul>

<ul><li id="f-doxcn3k8xhVyLF4Qtgsi8tbDynb"><span style="font-weight:bold">冲突次数</span><span>：两个 Agent 对日期、价格、状态给出不一致结论。</span></li></ul>

<ul><li id="f-doxcnz8AeskSvIzzcEuDYrdfujg"><span style="font-weight:bold">人工兜底触发率</span><span>：质检 Agent 判定继续自动执行风险太高。</span></li></ul>

<ul><li id="f-doxcnJoGKlQlGLGXlsnHwjWXbtc"><span style="font-weight:bold">每个 Agent 的 token / latency 占比</span><span>：找出最贵、最慢、最容易拖垮团队的角色。</span></li></ul>

<p id="f-doxcnHoYR8M6VQ7RBsEFjc3Yxcd"><span style="font-weight:bold">能定位什么问题：</span><span> 如果 trace 显示 Calendar Agent 连续 5 次收到缺少 </span><span><span><span>duration</span></span></span><span> 的请求，问题不在 Calendar，而在上游 Router 没抽取完整槽位；如果 Reviewer 多次打出 </span><span><span><span>should_stop=false</span></span></span><span>，说明 Booking Agent 过早下单。</span></p>

<blockquote id="f-doxcnkaee6BlXEBcJ1joBRNTrth"><p id="f-doxcnfw4WIthqjelU8F8pzReeXb"><span>一句话记忆：多 Agent 评测不是"问裁判这个团队好不好"，而是 </span><span style="font-weight:bold">测交接链是否正确、做消融看每个 Agent 是否有贡献、看 trace/质检 Agent 抓协作病征</span><span>。最终报告里要同时给出端到端成功率、交接正确率、Agent 选择正确率、成本延迟和主要失败类型。</span></p>
<p id="f-doxcngczmkRK4wphXYA7HgS0Dog"><span>💬 </span><span style="font-weight:bold">【面试卡片】</span><span style="font-weight:bold">Q：多 Agent 系统中，你应该如何评估多个 Agent 之间的协作？</span></p>
<p id="f-doxcnv0JNIcFwUNMNBemW0NUPdc"><span style="font-weight:bold">A：</span><span> 我不会只看最终任务有没有完成，因为多 Agent 系统的核心风险在"协作过程"：有没有交接错、有没有选错 Agent、有没有互相打转、加了 Agent 到底有没有收益。所以可以从三层来评估。</span></p>
<p id="f-doxcnqzBSw8vtBGYLxmmgiAqWJf"><span>第一层是</span><span style="font-weight:bold">交接轨迹评测</span><span>。我会为每条任务定义标准协作链，比如 </span><span><span><span>Router -&gt; Weather -&gt; Calendar -&gt; Booking</span></span></span><span>，然后记录真实运行 trace，检查是否选对 Agent、是否传对关键字段、交接顺序是否合理、最终状态是否正确。这个方法主要回答：</span><span style="font-weight:bold">团队配合有没有走对</span><span>。</span></p>
<p id="f-doxcnvjRXKDQ9hzg1PfWT4a7sVg"><span>第二层是</span><span style="font-weight:bold">消融评测</span><span>。固定同一批 evalset，分别跑 Full Team、去掉某个 Agent、退化成 Single Agent 等版本，比较端到端成功率、成本、延迟和错误类型。如果加了 Weather Agent 后成功率提升很小但 token 翻倍，说明它可能不值得；如果去掉 Router 后误调工具率大幅上升，说明 Router 是必要组件。这个方法主要回答：</span><span style="font-weight:bold">某个 Agent 有没有真实贡献</span><span>。</span></p>
<p id="f-doxcn85F8DhOmFAXQnafR3FJeee"><span>第三层是</span><span style="font-weight:bold">过程监控 + 质检 Agent</span><span>。可以用 trace / AgentOps 记录每个 Agent 的输入、输出、耗时、token、调用次数，再让 Reviewer / Critic Agent 检查中间状态，抓重复调用、无效交接、状态冲突、过早下单、应该人工兜底却没兜底等问题。这个方法主要回答：</span><span style="font-weight:bold">协作过程为什么慢、贵、乱，瓶颈在哪里</span><span>。</span></p>
<p id="f-doxcnyYbwVma3guVxdXG0Vl9L0f"><span>总结来说，多 Agent 协作评测 = </span><span style="font-weight:bold">交接链是否正确 + 增加 Agent 是否有边际收益 + 协作过程是否健康</span><span>。最终报告里我会同时给出端到端成功率、交接正确率、Agent 选择正确率、消融收益、token/latency 成本，以及主要失败类型。</span></p></blockquote>

<a id="f-doxcn2GgLrZiOtT75Vo1lSrimye"></a>

##### 上线前收口:Pipeline 与发布闸门

<p id="f-doxcnTPxxQOHNIA9smHFCja6OUd"><span>走到这里，上两章 已经把"每个组件怎么测、整机怎么测"都摸清了。现在才是把它们</span><span style="font-weight:bold">收口成一条可自动运行的评估流水线</span><span>的时候——这一步同时包含两件本就该一起做的事：</span><span style="font-weight:bold">建评测集</span><span>和</span><span style="font-weight:bold">搭 Pipeline</span><span>。把它们合成一步，是因为评测集里每条样本的"期望输出 / 评分标准"，正是用前面各维度的评测指标标注出来的；指标先行，数据才有依据。这也对应《AI Engineering》"设计评估流程"一节的 Step 3——它的标题直接就是"定义评估方法</span><span style="font-weight:bold">与数据</span><span>"。</span></p>

<p id="f-doxcnEPrCGJbfxj9HjeFofMZ7Ud"><span style="font-weight:bold">【是什么】</span><span> 把"用哪些指标、各用什么方法打分、用哪批数据喂、分数怎么映射到业务、达到什么阈值才能上线"一次性组装成一条</span><span style="font-weight:bold">可自动运行、可重复回归、可卡发布</span><span>的评估流水线。</span></p>

<p id="f-doxcnEhmoRWUTeD7IB656Xn07Cg"><span style="font-weight:bold">【为什么测】</span><span> 零散地测几个指标、临时凑几条样本都没用。关键是要有一套</span><span style="font-weight:bold">和业务目标对齐、数据与指标配套、能持续自动运行、能拦住高风险版本</span><span>的评估系统——此后每次改动都让它跑一遍，用数字说话。否则离线分数再高，也可能是太慢、太贵、太绕，或者安全风险没过线。</span></p>

<p id="f-doxcn8EDcluALCuM7xh9ii1ONSb"><span style="font-weight:bold">【怎么测 / 怎么建】</span><span>（评测集与 Pipeline 一体组装）</span></p>

<blockquote id="f-doxcnt71j9EmTtAi4D4nxvGKpue"><p id="f-doxcn3BW8fZtJ3xHgx9I0B3it2g"><span>定性：</span><span style="font-weight:bold">一条流程、分 5 步</span><span>，严格按顺序（指标先定 → 据此标数据 → 绑业务 → 设发布闸门 → 回灌线上问题）。其中第 2 步内部还要区分两种</span><span style="font-weight:bold">粒度档位</span><span>。</span></p></blockquote>

<ol start="1"><li id="f-doxcn9YNkGyxt3DawtQMb0QnpJd"><span style="font-weight:bold">【步骤】先锚定"测哪些组件、各用什么指标"</span><span>：把 §3.4 / §3.5 定下来的测法收拢成一张表（correctness 用功能正确性、factual consistency 用 LLM-judge、cost/latency 直接量、轨迹用按序匹配、安全用红队和护栏触发率……），并明确分层评估的粒度：per task（整个任务）/ per turn（单轮）/ per intermediate output（中间输出）。</span><span style="font-weight:bold">指标先定，才知道样本要标什么。</span></li></ol>

<ol start="2"><li id="f-doxcneW7OcMGblCKRN3mjRQZNCd"><span style="font-weight:bold">【步骤】据此构建配套评测集</span><span>：为每条代表性输入（覆盖常见、边界、易错、"不该触发"的反例）按上一步的指标标注期望输出或评分 rubric，用 JSONL 等格式存成可批量喂入的数据集。区分两种</span><span style="font-weight:bold">粒度档位</span><span>：</span></li></ol>

<div id="f-doxcnSQ49tQFJeazrVk9hFB73jY" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">【档位·细】test file（测试文件）</span><span>：偏单元测试，单个 case 验证某个具体行为，开发调试期高频跑；</span></div></div>

<div id="f-doxcncsoGLvaHJxn7a6claZUAtb" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">【档位·全】evalset file（评估集）</span><span>：偏集成测试，成套、覆盖多场景，用于回归。</span></div></div>

<ol start="3"><li id="f-doxcnwcefYJmSOBibN9cfcwjHbp"><span style="font-weight:bold">【步骤】把评估指标绑定到业务北极星指标</span><span>：比如"回答有用性分"要能关联到"用户留存 / 转化"，否则指标再漂亮也没意义。</span></li></ol>

<ol start="4"><li id="f-doxcnMpr7bu62r5QuKGRe5s4kjf"><span style="font-weight:bold">【步骤】设定上线前发布闸门</span><span>：明确多少分以上、多少成本以内、多少延迟以内、多少安全风险以内才算"可以上线"。</span></li></ol>

<ol start="5"><li id="f-doxcnvYxigbmse6d37Qq0TXntXf"><span style="font-weight:bold">【步骤】把线上问题回灌评测集</span><span>：生产中发现的新失败、新攻击、新成本异常，要变成新的离线 case，进入下一轮回归。</span></li></ol>

<a id="f-doxcnCPG3agakSKYUnfxxldiIre"></a>

###### 发布闸门卡什么

<p id="f-doxcnyXzobv0VdgbQSTdHVAyqkf"><span>发布闸门不是一个"总分超过 80 就上线"的粗糙判断，而是一组并列门槛。任何一类踩红线，都不应该进入真实流量。具体分为五类闸门：</span></p>

<ul><li id="f-doxcngsFqwUDZx08M900PWZp4If"><span style="font-weight:bold">质量 / 成功率</span><span>：上线前用 evalset、Pass@k / Pass^k、rubric、功能正确性来测，典型阈值形态是端到端成功率、关键任务 Pass^k、事实一致性分。</span></li></ul>

<ul><li id="f-doxcnK1bReoqhVz6zUErYYGzbFc"><span style="font-weight:bold">轨迹 / 工具 / 规划</span><span>：上线前用轨迹比对、工具调用静态/执行检查、规划失败模式统计来测，典型阈值形态是错工具率、错参数率、反思错误率、最大步数。</span></li></ul>

<ul><li id="f-doxcnErIjJ6lmIv6czhVggsHT1g"><span style="font-weight:bold">成本 / 效率 / 延迟</span><span>：上线前用离线批跑、压测、token 统计、工具耗时统计来测，典型阈值形态是单任务 token 预算、P95/P99 延迟、TTFT/TPOT、平均步数。</span></li></ul>

<ul><li id="f-doxcngonzPwFOboIJJXx7LfRyHe"><span style="font-weight:bold">安全 / 合规</span><span>：上线前用越狱、直接/间接提示注入、PII/敏感数据、输出毒性、误拒率来测，典型阈值形态是红队通过率、guardrail 漏拦率、false refusal rate、审计字段完整性。</span></li></ul>

<ul><li id="f-doxcnJKWbPxKJJAqk2vmq7IQ6wh"><span style="font-weight:bold">业务可用性</span><span>：上线前用私有业务集、用户模拟器、灰度前试运行来测，典型阈值形态是有用性阈值、投诉风险、人工兜底触发率。</span></li></ul>

<p id="f-doxcn6TGCFvBWxOvlcCNk5NlBpd"><span>这里尤其要注意：</span><span style="font-weight:bold">成本 / 效率 / 延迟、安全 / 合规都属于上线前闸门</span><span>。上线后当然还要继续监控，但那不是第一次测试，而是持续验证。</span></p>

<a id="f-doxcnq1RVrIUri4bShSbVyo98M4"></a>

###### 成本、效率、延迟

<p id="f-doxcnbRd1x58djxTGZXXym6JB1c"><span style="font-weight:bold">【是什么】</span><span> 评估 Agent 完成任务"划不划算、快不快"——花了多少 token、多少钱、多少步、多长时间。</span></p>

<p id="f-doxcnLeERbHEanlNeBsqEbH99eg"><span style="font-weight:bold">【为什么测】</span><span> 一个准确率很高但要调用 50 次工具、烧掉几块钱、让用户等 30 秒的 Agent，在上线前就应该被拦住。质量必须和成本、延迟一起看。</span></p>

<p id="f-doxcnCmowosASPcYcGKaqtCpbXe"><span style="font-weight:bold">【怎么测】</span></p>

<blockquote id="f-doxcnVFEpBVRYuFtaWPTFM7Ax0g"><p id="f-doxcnOSP30o1G6EaHsYNIZTFx0F"><span>定性：不是步骤，而是</span><span style="font-weight:bold">上线前发布闸门要量的几类指标维度</span><span>。这些指标上线后继续进入 §3.7.2 做真实流量监控。</span></p>
</blockquote>

<ul><li id="f-doxcnAZj3hA094twi1N3sjdSN6g"><span style="font-weight:bold">【维度·效率】</span><span>：完成单个任务的平均步数、平均成本、单步耗时，并和基线（另一个 Agent 或人类）对比。</span></li></ul>

<ul><li id="f-doxcnE4xaKPQE7S9xeP6Rxdz8ad"><span style="font-weight:bold">【维度·延迟】</span><span>：TTFT（首 token 时延）、TPOT（每 token 时延）、总响应时间，建议看 P95/P99 而不是只看平均值。</span></li></ul>

<ul><li id="f-doxcn1Kjz6c35dzj0fOlZPyYkod"><span style="font-weight:bold">【维度·成本】</span><span>：输入 token、输出 token、工具调用次数、外部 API 费用；实战书的 </span><span><span><span>LLMInteractionMonitor</span></span></span><span> 可跟踪 token 用量来控成本。</span></li></ul>

<ul><li id="f-doxcnSad4JRWUutJFW85NQQkTQb"><span style="font-weight:bold">【维度·发散约束】</span><span>：最大步数、重复动作、绕远路；龙猫直接把"步数过多"算作失败的一种，说明效率可以是正确性的一部分。</span></li></ul>

<a id="f-doxcnpR7jILBDuOhSyabhvNn4Vc"></a>

###### 安全与合规

<p id="f-doxcnt7o21AQeQcghcfLWt3hUMe"><span style="font-weight:bold">【是什么】</span><span> 评估 Agent 会不会被攻击、会不会输出有害内容、是否符合合规要求。</span></p>

<p id="f-doxcnhFG3xqKwPztFID74HMQnFe"><span style="font-weight:bold">【为什么测】</span><span> Agent 能调工具、能执行动作，一旦被攻破或失控，危害远大于普通聊天机器人。安全不是上线后观察一下，而是上线前红线。</span></p>

<p id="f-doxcnIGzCJtZaqcYEZEl9wLpMEb"><span style="font-weight:bold">【怎么测】</span></p>

<blockquote id="f-doxcn1mVEm0xuZYNNqpsTdTsxge"><p id="f-doxcnaxWYIOLfItT79R48cZnZ7b"><span>定性：</span><span style="font-weight:bold">混合结构</span><span>——前两点是主动测试方法，第三点是要量的安全维度，第四点是治理实现。上线后这些指标继续进入 §3.7.2 监控。</span></p></blockquote>

<ul><li id="f-doxcnwbNdvT3Zbr0bSpX5PLmFtd"><span style="font-weight:bold">▶ 方法一 · 攻击面测试</span><span>：越狱（jailbreaking）、提示注入（prompt injection，含直接/间接）、red teaming（红队主动攻击找漏洞）。</span></li></ul>

<ul><li id="f-doxcn4J9Qgd74pbAYV0gnF2pMTe"><span style="font-weight:bold">▶ 方法二 · 防御分层</span><span>：在 model / prompt / system 三个层面分别设防并验证；输入护栏防 PII 泄露和恶意提示，输出护栏抓无效 JSON、事实不一致、毒性、泄密等失败。</span></li></ul>

<ul><li id="f-doxcnEQ6w4BC7Obh29Lkv6BD3Be"><span style="font-weight:bold">【维度】安全指标</span><span>：事实一致性、安全性、毒性（toxicity）、guardrail 漏拦率、guardrail 触发率、误拒率（false refusal rate）。</span></li></ul>

<ul><li id="f-doxcni942DLbKxboIJrNOntuufe"><span style="font-weight:bold">【实现】合规治理</span><span>：设计模式书提出从"Agent"升级到"高级承包商（Contractor）"——用正式"合约"明确可验证的交付物、范围、成本，把评估上升为可审计、可问责的治理机制。</span></li></ul>

<blockquote id="f-doxcnNuGwyTVtI3F3304CovVvrc"><p id="f-doxcnnvTz36GJGM7AoXS2MimvMn"><span>💬 </span><span style="font-weight:bold">【面试卡片】</span><span style="font-weight:bold">Q：你会怎么评估 Agent 的安全性？</span></p>
<p id="f-doxcnBHBMkecMKBRWA69H5gtRWO"><span style="font-weight:bold">A：</span><span> 安全不是上线后才观察，而是上线前的红线、上线后持续盯。上线前可以做三件事：一是攻击面测试——越狱、提示注入（含直接和间接）、红队主动找漏洞；二是防御分层，在 model / prompt / system 三层分别设防并验证，输入护栏防 PII 泄露和恶意提示、输出护栏抓无效 JSON、事实不一致、毒性、泄密；三是量化安全指标——事实一致性、毒性、guardrail 漏拦率/触发率、误拒率（false refusal rate），这些都进发布闸门，任一项踩红线就不让上。上线后把这些指标搬到真实流量持续监控：盯越狱/提示注入、工具越权、guardrail 触发率和漏拦率、PII 泄露、毒性和合规审计，并用合约式（Contractor）治理把可交付物、范围、审计记录固定下来保证可追责。要补一句：安全/合规是这几份资料里整体覆盖最薄弱的一环，真实项目往往还要额外引入专门的安全测试体系。</span></p>
<p id="f-doxcnvolzIIgitEuhS9EV1osc7b"><span>这一节是"评估驱动开发"真正落地的关键：</span><span style="font-weight:bold">评测集、Pipeline 和发布闸门是同一步里组装出来的产物</span><span>，长在前面各维度的评测指标之上。组装完成后，它就成了贯穿后续每次迭代、直到上线回归的自动化标尺。</span></p></blockquote>

<a id="f-doxcnT7YC0jrixIFX2lRgvNO5Y9"></a>

##### 上线后监控

<p id="f-doxcnybO2tF73tBku4VHc91PDVb"><span>§3.6 已经把成本、延迟、效率、安全、合规纳入上线前发布闸门。Agent 一旦上线，评估并不结束，而是换了一种形态——</span><span style="font-weight:bold">持续监控</span><span>。《AI Engineering》一句话点破：</span><span style="font-weight:bold">"监控的目标和评估的目标是同一个。"</span><span> 区别只在于：上线前主要用准备好的数据、仿真和压测；上线后使用真实流量、用户反馈和系统遥测。</span></p>

<a id="f-doxcnU3o5D0dXq4sjb5jzljc8qO"></a>

###### A/B 测试与灰度发布

<p id="f-doxcnXTTSns3P31WmTN4955REsg"><span style="font-weight:bold">【是什么】</span><span> 把新版本 Agent 只放给一部分真实用户，对比新旧版本的线上表现，再决定是否全量。</span></p>

<p id="f-doxcnqxrwVsnlTI4o9hVHYF2rCh"><span style="font-weight:bold">【为什么测】</span><span> 离线评测分数高，不代表真实用户买账。A/B 测试是用真实流量做的最终裁决。注意它和 3.1.2 的比较式评估不同：</span><span style="font-weight:bold">A/B 是把不同版本分给不同用户群看线上业务指标</span><span>，比较式评估是同一批输出给评委比。</span></p>

<p id="f-doxcndYL7BKfXsoI9MMPLLNsGWh"><span style="font-weight:bold">【怎么测】</span></p>

<blockquote id="f-doxcnB7X86cqxB7lkLPqeebh4tJ"><p id="f-doxcn3QIFMaJqiOXXmuHR1DFXof"><span>定性：</span><span style="font-weight:bold">一个方法、分 3 步</span><span>（切流量 → 比线上指标 → 设回滚线），按顺序执行。</span></p></blockquote>

<ul><li id="f-doxcncyOa5TzH2rlUe01J2HbGih"><span style="font-weight:bold">【步骤】</span><span> 按用户/流量切分实验组与对照组，灰度放量（先 1% 再 10% 再全量）；</span></li></ul>

<ul><li id="f-doxcnyMBTIWEHgTI2DQomxQ34pb"><span style="font-weight:bold">【步骤】</span><span> 对比线上业务指标（留存、转化、满意度）而非离线分数；</span></li></ul>

<ul><li id="f-doxcnZ8jSjftFU8K3ZUyG6bW3Sd"><span style="font-weight:bold">【步骤】</span><span> 设好回滚阈值，一旦新版指标掉了立即回退。</span></li></ul>

<a id="f-doxcnX3WdvvzBZ6HIfhCKUJHW6e"></a>

###### 监控与可观测性

<p id="f-doxcnfHSOWNzKSI6qpHKzaMm5eC"><span style="font-weight:bold">【是什么】</span><span> 建立一套线上可观测性系统，对运行中的 Agent 做持续跟踪：它现在表现如何、有没有退化、有没有漂移、慢不慢、贵不贵、是否被攻击、能不能回溯每一步。</span></p>

<p id="f-doxcnbqCGakOvchXMo1REsY1y3c"><span style="font-weight:bold">【为什么测】</span><span> 上线前评测只能覆盖已知场景。真实流量会带来开发期没见过的输入、模型或数据分布变化、更长上下文、工具异常、成本放大和安全攻击。不持续盯着，等用户投诉时通常已经晚了。</span></p>

<p id="f-doxcnvgT6KNYfVbMKKGtsMuFHLf"><span style="font-weight:bold">【怎么测】</span></p>

<blockquote id="f-doxcnj3rFjN26VqjxMqBjeBhKZZ"><p id="f-doxcnr21vGzJrxSActwOH7OP9Nb"><span>定性：这一节不是和"漂移 / 成本 / 安全"并列，而是它们的</span><span style="font-weight:bold">统一观测底座</span><span>。先搭 logs / traces / metrics，再在这套数据上监控质量、漂移、异常、成本、延迟和安全。</span></p></blockquote>

<ol start="1"><li id="f-doxcnT8VcwKQfiBEh6wV3KvAABf"><span style="font-weight:bold">【底座】可观测性三件套</span></li></ol>

<div id="f-doxcnFAI3Dv13FzJzfjrORXMxjb" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">Logs（日志）</span><span>：记录每次请求、输入摘要、输出状态、错误、guardrail 命中、拒答原因；</span></div></div>

<div id="f-doxcnmgUefV8759pKabzXdoCwUf" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">Traces（调用链追踪）</span><span>：记录一次 Agent 任务经过了哪些 Agent / 工具 / 模型调用，每一步耗时、token、成本和结果；</span></div></div>

<div id="f-doxcn3lvyDR7JhNUALnu7yhw1re" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">Metrics（指标）</span><span>：把关键数值按时间聚合，形成 dashboard 和告警。</span></div></div>

<ol start="2"><li id="f-doxcn9hy4F8VfKdpewzC4vwamJb"><span style="font-weight:bold">【监控对象一】质量与行为</span></li></ol>

<div id="f-doxcnsuaXnJIlhSN4jcqydjqWkh" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>格式错误率：JSON 解析失败、schema 不合规；</span></div></div>

<div id="f-doxcnvJnINkKbQlUYfVXUmlO0Ud" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>事实一致性、生成质量：可用 AI judge 抽样评估；</span></div></div>

<div id="f-doxcnDTftNvYWEQLeJio8J09sTe" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>拒答率、误拒率、guardrail 触发率；</span></div></div>

<div id="f-doxcnHSeJKlorZhNQBDXJKOG6Ke" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>工具调用成功率、错工具率、异常工具路径。</span></div></div>

<ol start="3"><li id="f-doxcn9AIUDvGRSEGSixdwyRafcf"><span style="font-weight:bold">【监控对象二】漂移与异常</span></li></ol>

<div id="f-doxcn81fGsx81bingHl1b87725g" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">输入分布漂移</span><span>：用户问法、主题、query embedding 分布是否偏离历史基线；</span></div></div>

<div id="f-doxcnmFRoURfD0FXMjP0RogKkVq" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">输出质量漂移</span><span>：事实一致性、满意度、拒答率是否持续变差；</span></div></div>

<div id="f-doxcnpLpfDZfcGgBtGdnAodKTrd" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">行为异常</span><span>：工具调用次数突然翻倍、某类任务失败率突增、Agent 出现循环；</span></div></div>

<div id="f-doxcnHrJFZZ3OPpZCjHaAaQTMih" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">处置闭环</span><span>：发现漂移后触发重新评估 / 重新训练 / 回滚，并把线上样本回灌 §3.6 的评测集。</span></div></div>

<ol start="4"><li id="f-doxcn8Mv3LwFLPBRhcX2YdZqTEb"><span style="font-weight:bold">【监控对象三】成本 / 效率 / 延迟</span></li></ol>

<div id="f-doxcnN9IzPZmfQgpqPo5ytwr2jg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">延迟</span><span>：TTFT、TPOT、总延迟、P95/P99，按用户、场景、模型版本拆分；</span></div></div>

<div id="f-doxcnjnNx6X9x1ZoWrPs9U8FWle" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">成本</span><span>：输入/输出 token、每任务成本、每用户成本、工具/API 调用费用、缓存命中率；</span></div></div>

<div id="f-doxcnj2zUmP8yaqZ2FrfarxFXRe" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">效率</span><span>：平均步数、最大步数、重复工具调用、工具循环、单动作耗时；</span></div></div>

<div id="f-doxcnbDU25hw16XGtmnN2yFBHzb" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">处置</span><span>：超过预算时触发降级、模型路由切换、上下文裁剪、缓存策略、回滚或人工兜底。</span></div></div>

<ol start="5"><li id="f-doxcnexWf2s120ych1P1yBWDOWh"><span style="font-weight:bold">【监控对象四】安全 / 合规</span></li></ol>

<div id="f-doxcnBJkm4DxbOSTKpV3Qzj98Og" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">攻击监控</span><span>：越狱、直接/间接提示注入、异常查询、工具越权、远程代码执行风险；</span></div></div>

<div id="f-doxcnen7ZdiH7oFQM18FWebMgHe" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">护栏监控</span><span>：guardrail 触发率、漏拦率、拒答率、误拒率、人工升级率；</span></div></div>

<div id="f-doxcnOHdtmAZfqKTz7x2fZIUZSe" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">内容与数据风险</span><span>：毒性、有害内容、事实不一致、PII / 敏感信息输入输出、品牌与合规风险；</span></div></div>

<div id="f-doxcnQPNNWJfWpruvGPs11krqye" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">治理审计</span><span>：Contractor / 合约式治理，把可交付物、范围、成本、审计记录固定下来，保证线上行为可追责。</span></div></div>

<ol start="6"><li id="f-doxcn0UJcuYTY0muw9jhAspCToc"><span style="font-weight:bold">【响应指标与工具】</span></li></ol>

<div id="f-doxcnh7ud1hyGs8QYpP5ZyijUMc" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">MTTD / MTTR / CFR</span><span>：平均检测时长、平均修复时长、变更失败率，用来衡量团队发现和修复问题的速度；</span></div></div>

<div id="f-doxcnLcYuSW4zr39MrcuERvSPvd" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">落地工具</span><span>：指标落到时序数据库（InfluxDB / Prometheus），接 Datadog / Grafana 等可观测性平台；Agent 专用的有 AgentOps，适合看交互 trace、token 和成本。</span></div></div>

<blockquote id="f-doxcnQX0GGA9MVx5AikUNCScBDe"><p id="f-doxcnVvTsblkWor3x05NGRCYVDd"><span>⚠️ </span><span style="font-weight:bold">公共短板提示</span><span>：安全/合规是四份资料里整体覆盖最薄弱的一环（龙猫几乎不涉及）。真实项目里这块往往需要额外引入专门的安全测试体系，不能只靠通用评测资料。</span></p>
<p id="f-doxcnyQdjeV2a64qjFdJ045tA2b"><span>💬 </span><span style="font-weight:bold">【面试卡片】</span><span style="font-weight:bold">Q：你的项目上线以后，你如何保证和监测上线质量？</span></p>
<p id="f-doxcncvmlyByU5Dom6g9kT00Mdh"><span style="font-weight:bold">A：</span><span> 可以把上线后的质量保障分成两层：</span><span style="font-weight:bold">灰度发布控制风险，可观测性持续监控质量</span><span>。上线不是评测结束，而是把上线前定义好的质量、成本、延迟、安全指标搬到真实流量里持续验证。</span></p>
<p id="f-doxcnNhgP29VckbcK48uHIc7frB"><span>第一，</span><span style="font-weight:bold">上线时做 A/B 测试和灰度发布</span><span>。新版本不会直接全量，而是先放 1% 或小流量，对比旧版本的真实业务指标，比如任务成功率、用户满意度、转化率、投诉率，同时设置回滚线。如果关键指标下降、错误率升高或安全告警增加，就立即暂停放量或回滚。</span></p>
<p id="f-doxcnK4nH39YuNNP6VgTwmBzSlb"><span>第二，</span><span style="font-weight:bold">上线后建立 logs / traces / metrics 三件套</span><span>。Logs 记录请求、错误、拒答和护栏命中；traces 记录一次 Agent 任务经过哪些模型、工具和子 Agent，每一步耗时、token、成本和结果；metrics 把关键指标聚合成 dashboard 和告警。这样既能看总体趋势，也能回溯单次失败到底卡在哪一步。</span></p>
<p id="f-doxcnILSdHEax0sm4aI6piwq6id"><span>第三，</span><span style="font-weight:bold">持续监控四类核心指标</span><span>：质量指标看格式错误率、事实一致性、生成质量、拒答率、工具调用成功率；漂移与异常看用户输入分布、输出质量、异常工具路径和 Agent 循环；成本延迟看 TTFT、TPOT、P95/P99、token、平均步数和工具耗时；安全合规看越狱/提示注入、guardrail 触发率、误拒率、PII 泄露和审计记录。</span></p>
<p id="f-doxcn27xZKX5gLbNxGgMhy6yr2b"><span>第四，</span><span style="font-weight:bold">把监控变成响应闭环</span><span>。我会设置 MTTD、MTTR、CFR 这类响应指标，保证问题能及时发现、定位和修复。线上发现的新失败、新攻击、新高成本 case，会回灌到离线评测集，重新跑 §3.6 的发布闸门，避免同类问题下次再上线。</span></p>
<p id="f-doxcnmzYN9nDG3EgUi5jYHqPZhd"><span>总结来说，我保证线上质量的方式是：</span><span style="font-weight:bold">灰度发布控风险，logs/traces/metrics 看得见，质量/漂移/成本/安全指标持续告警，线上问题回灌评测集形成闭环</span><span>。</span></p></blockquote>

<p id="f-doxcnzG5A3QgtmKxj2S73su2l8d"><span style="font-weight:bold">第 3 章小结</span><span>：到这里，我们已经把生命周期主线上的每一环都讲完了——从通用武器（LLM-judge、比较评估、基础度量），到上线前验证（选型 → 成功标准 → 组件 → 集成 → 评测集 / Pipeline / 发布闸门），再到上线后监控（A/B 灰度发布 → 监控与可观测性覆盖质量、漂移、成本、延迟和安全）。</span><span style="font-weight:bold">下一章用美团龙猫这个真实项目，看这些思想是怎么被打包成一套完整评估系统落地的。</span></p>


<a id="section-0075"></a>
## 实战

<a id="f-doxcnhnVneOBbRnytUbp0ArOlug"></a>

<a id="f-doxcnqFgsKqyqeLUwlclWABkaNc"></a>

##### 实战一：美团 LongCat VitaBench

<p id="f-doxcne45fgsbp5u573UskaSpYEe"><span style="font-weight:bold">【背景】</span><span> 现有的 Agent benchmark 大多是"玩具任务"，和真实生活差距很大，区分不出顶尖模型到底差在哪。VitaBench 的目标是：</span><span style="font-weight:bold">用贴近真实生活的复杂场景，量化现有 Agent 与实际应用需求之间的差距。</span></p>

<p id="f-doxcn70BupycP4DHG0VbeFK6pAd"><span style="font-weight:bold">【场景】</span><span> 聚焦美团最熟悉的三大生活服务场景：</span><span style="font-weight:bold">外卖点餐、餐厅就餐、旅游出行</span><span>。</span></p>

<p id="f-doxcn3nLM11Nm2H7MK8XDQi6gAd"><span style="font-weight:bold">【为什么难】</span><span> 这些场景天然具备真实世界的复杂度：一个任务可能涉及 5–20 个服务商、100 多个候选商品，用户还会中途改主意。VitaBench 号称是"迄今最复杂的生活服务模拟环境"。</span></p>

<a id="f-doxcnP97otm2Fu6Wc5BOLctwTlh"></a>

###### 整体思想

<p id="f-doxcny5CgJRN8v6BkYnVDXkI6ab"><span>这是本章的核心。下面把</span><span style="font-weight:bold">VitaBench 的每个设计，对应回第 3 章的哪个评测思想</span><span>一一列出——你会看到它几乎是第 3 章的一次"综合落地演练"：</span></p>

<ul><li id="f-doxcnfWyXkSiHjtm4DlNnoWxRsd"><span style="font-weight:bold">3.4.4 规划/推理评测</span><span> → VitaBench 用</span><span style="font-weight:bold">推理复杂度</span><span>维度落地：观测空间大小、部分可观测程度、推理点数量。</span></li></ul>

<ul><li id="f-doxcneNaj5uG10aDR6qoSclPX0d"><span style="font-weight:bold">3.4.3 工具调用评测</span><span> → VitaBench 用</span><span style="font-weight:bold">工具复杂度</span><span>落地：66 个真实工具，跨场景含 512 条依赖边的工具图。</span></li></ul>

<ul><li id="f-doxcnipD41WIFaLlPTQSJA2NCre"><span style="font-weight:bold">3.5.3 多轮交互评测</span><span> → VitaBench 用</span><span style="font-weight:bold">交互复杂度</span><span>加 </span><span style="font-weight:bold">GPT-4.1 用户模拟器</span><span>落地，模拟用户改主意、模糊表达。</span></li></ul>

<ul><li id="f-doxcnBHowWZjMZxobvgMsamnkob"><span style="font-weight:bold">3.1.1 LLM-as-a-judge</span><span> → VitaBench 用 </span><span style="font-weight:bold">Rubric 滑动窗口评估器</span><span>落地：用 Claude-3.7-Sonnet 当裁判，κ=0.828。</span></li></ul>

<ul><li id="f-doxcnNbPcRnjNkahqHGlwNrEFBh"><span style="font-weight:bold">3.5.1 任务结果评测</span><span> → VitaBench 用 </span><span style="font-weight:bold">Avg@4 / Pass@4 / Pass^4</span><span> 落地（每任务跑 4 次，温度 0）。</span></li></ul>

<p id="f-doxcnRuiLi7oLABzoAfVpRdFsib"><span style="font-weight:bold">几个特别值得讲的设计亮点：</span></p>

<ol start="1"><li id="f-doxcnvRQMselp2b5BSbSkNwyeud"><span style="font-weight:bold">三维复杂度框架</span><span>：VitaBench 把 Agent–用户–工具的交互建模成 POMDP（部分可观测马尔可夫决策过程），拆成</span><span style="font-weight:bold">推理 / 工具 / 交互</span><span>三个可独立调节的复杂度维度。这是它最大的学术贡献——</span><span style="font-weight:bold">第一次让任务复杂度变得"可控、可量化"</span><span>。</span></li></ol>

<div id="f-doxcnLL6V4Yk2MROtaAwlT2Y5kc"><img alt="" decoding="async" height="840" loading="lazy" src="/images/agent-learning/04d10fa8b65f0f6b5a9dab40.png" width="1280"/></div>

<ol start="2"><li id="f-doxcnfLR7IuvoscdHnhwSRvYPG0"><span style="font-weight:bold">Rubric 滑动窗口评估器</span><span>：把任务目标拆成一个个原子化的判定准则，用"全有或全无"方式严格判定，和人类评判的一致性高达 Cohen's κ=0.828——说明这套自动评估很可信。这正是 3.1.1 LLM-as-a-judge 的高质量工程实现。</span></li></ol>

<ol start="3"><li id="f-doxcnGXTr6dl7YYbf6aR3zaFzog"><span style="font-weight:bold">故意去掉"规则文档"</span><span>：传统 benchmark 会给 Agent 一份 policy 文档说明规则，VitaBench 反其道而行——</span><span style="font-weight:bold">把领域规则编码进工具依赖图里，逼模型自己推理</span><span>，而不是照着说明书抄。这让评测更接近真实（现实中没人给你完整说明书）。</span></li></ol>

<ol start="4"><li id="f-doxcnOT8sSetN9P9kceI8iiRq5b"><span style="font-weight:bold">真实工具图</span><span>：66 个真实工具之间有 512 条依赖边（调用 A 工具前必须先调 B），构成一张复杂的依赖网络。</span></li></ol>

<div id="f-doxcnjZs5HDXhdK7eOhjb4GC9Re"><img alt="" decoding="async" height="853" loading="lazy" src="/images/agent-learning/c7be813724677bc7b25142c4.png" width="1280"/></div>

<a id="f-doxcnIpxrrw7z979c0SCaxoxbqf"></a>

###### 结果与启示

<p id="f-doxcnG5NbGy6mm5U7SRvqO4uyqf"><span style="font-weight:bold">【结果很扎心】</span><span> 即便是当时最强的模型 o3，在 VitaBench 上：</span></p>

<ul><li id="f-doxcnogbUWRu5B25kO0iBAzuXdb"><span>跨场景 </span><span style="font-weight:bold">Avg@4 仅 30%</span><span>，单场景 &lt; 50%；</span></li></ul>

<ul><li id="f-doxcn6nw5r8ots6QpcmlgTkaIub"><span style="font-weight:bold">Pass^4 ≈ 0%</span><span>（连续 4 次全做对的概率几乎为零，说明极不稳定）；</span></li></ul>

<ul><li id="f-doxcniHqSCY53DTMhL5qlqsYhUe"><span>失败主因是</span><span style="font-weight:bold">推理错误（占 61.8%）</span><span>。</span></li></ul>

<p id="f-doxcniZfdBdx7awNhjtvrufutGh"><span style="font-weight:bold">【启示】</span></p>

<ol start="1"><li id="f-doxcn7ZEqbfto7QnJE2yQwlFIce"><span style="font-weight:bold">顶尖 Agent 离"真实可用"还很远</span><span>——在玩具 benchmark 上的高分有水分，一到真实复杂场景就现原形。</span></li></ol>

<ol start="2"><li id="f-doxcnau6i7dcpl9CqFBMs3jYOne"><span style="font-weight:bold">推理是当前最大瓶颈</span><span>（61.8% 失败源于推理），印证了 3.4.4 规划/推理评测的重要性。</span></li></ol>

<ol start="3"><li id="f-doxcnesgEi8LfAYueXP4dXncDSd"><span style="font-weight:bold">稳定性比单次成功更难</span><span>——Pass^4≈0% 说明 Agent 偶尔做对容易、稳定做对极难，这也是为什么龙猫要用 Pass^k 这种严格指标。</span></li></ol>

<blockquote id="f-doxcnT982HJCzPLiuh2edM2FO4b"><p id="f-doxcn5dGlkOQjvTdjemiiMCXNJg"><span style="font-weight:bold">这个实战案例的最大借鉴</span><span>：当你要为自己的业务（尤其是有真实工具、多轮交互的复杂场景）做评估时，VitaBench 提供了一套可抄的范式——</span><span style="font-weight:bold">用三维复杂度刻画任务难度、用真实工具图考工具调用、用用户模拟器考多轮、用 Rubric+LLM-judge 严格判分、用 Pass^k 考稳定性</span><span>。</span></p>
<p id="f-doxcnFtls3LU8LkAvXbd8F0rCCC"><span>💬 </span><span style="font-weight:bold">【面试卡片】</span><span style="font-weight:bold">Q：介绍一个你了解的 Agent 评测 benchmark，它是怎么设计的？（或者问题可以是介绍一个你看过的论文，你就说你看了美团龙猫讲Agent评测的论文）</span></p>
<p id="f-doxcnUO8MdLHMlqO60gBOBYNCob"><span style="font-weight:bold">A：</span><span> 我了解美团 LongCat 的 VitaBench。它聚焦外卖点餐、餐厅就餐、旅游出行三大真实生活服务场景，目标是量化现有 Agent 和真实应用需求之间的差距。设计上它几乎把一整套评测思想综合落地：</span></p>
<p id="f-doxcn03nZIbo1HoHoh5pcZ4QK0W"><span>① 把 Agent–用户–工具交互建模成 POMDP，拆成推理 / 工具 / 交互三个可独立调节、可量化的复杂度维度——这是它最大的贡献；</span></p>
<p id="f-doxcnK9lHdczOtB4QttTLUHrYFa"><span>② 用 66 个真实工具加 512 条依赖边的工具图考工具调用；</span></p>
<p id="f-doxcnPNtpcQXrRwwByVpxujkaRg"><span>③ 用 GPT-4.1 用户模拟器考多轮交互，模拟用户改主意、模糊表达；</span></p>
<p id="f-doxcnEwoaJrI41lxzkM66riaoXd"><span>④ 用 Rubric 滑动窗口评估器（Claude-3.7-Sonnet 当裁判、和人类一致性 κ=0.828）严格判分；</span></p>
<p id="f-doxcnfR9StRvPbu81XwTgDdJlnb"><span>⑤ 用 Avg@4 / Pass@4 / Pass^4 考稳定性。它还故意去掉规则文档、把规则编码进工具依赖图，逼模型自己推理。结果很扎心：最强的 o3 跨场景 Avg@4 只有 30%、Pass^4 几乎为 0%，61.8% 的失败源于推理——说明顶尖 Agent 离真实可用还很远、推理是最大瓶颈、稳定做对比偶尔做对难得多。</span></p></blockquote>

<a id="f-doxcnqjEZFPhbixfBZSyJ1rq5cc"></a>

##### 实战二：算法项目二阶段

<p id="f-doxcnbZRTfan1iP3gsntl8Ie4Yd"><span>我们的大模型项目，二阶段完成的内容就是一个Agent评估的东西。</span></p>

<p id="f-doxcnqZmgh3aRjWYNKI6Ouw8rXc"><span>即使你不做算法，也可以去看一下这块对应的讲解视频，跟着去做一下，学习Agent评估的实战。</span></p>

<p id="f-doxcneTILcNuGEeZQGjz3PCzsSh"><span>具体细节</span><span><span><a href="/posts/agent-learning-18-training-inference/#f-doxcntzTSDKPsVXAE65jzjcn2zc"><span> 大模型算法项目学习方法</span></a></span></span><span>中，二阶段的介绍。</span></p>


<a id="section-0076"></a>
## 面试问题汇总

<a id="f-doxcnx8KWMY7DRi0HDnp5JLcMFc"></a>

<blockquote id="f-doxcngs7NVXqeOiUdO0NBqtNbLb"><p id="f-doxcnlmsPUhvQ90UIt6zXGaYHPc"><span>本章汇总全文出现过的面试问题。</span><span style="font-weight:bold">每道题的问法都与前文对应小节的面试卡片完全一致</span><span>，答案可直接回到该卡片查看。</span></p></blockquote>

<p id="f-doxcnmekYwDTjzIHysZlfl6naCf"><span style="font-weight:bold"> 概念理解类</span></p>

<ol start="1"><li id="f-doxcnUxGbpG3yEf2kUwuPYMzFYg"><span style="font-weight:bold">TDD 你了解过吗？你自己用 TDD 做过完整开发吗？</span><span> （见</span><span><span><a href="#f-doxcnVMCijA7bV2IGkAfQwCN1si"><span>3.1.1 面试卡片</span></a></span></span><span>）</span></li></ol>

<ol start="2"><li id="f-doxcn4aylaiT3dXwV1jP1LVpieh"><span style="font-weight:bold">你觉得 Agent 行业的测试和传统行业有哪些不同？</span><span> （见 </span><span><span><a href="#f-doxcnqAcUC54t6IHtOcj0bdYQkd"><span>3.1.2面试卡片</span></a></span></span><span>）</span></li></ol>

<ol start="3"><li id="f-doxcnYWQkII6mHlU6y6lhjAU4kc"><span style="font-weight:bold">Agent 行业的测试面临着哪些困难？</span><span> （见</span><span><span><a href="#f-doxcnppGuwgBVPJxCoP0mR1uqzf"><span> 3.1.3 面试卡片</span></a></span></span><span>）</span></li></ol>

<ol start="4"><li id="f-doxcnicvxSv90fLIZ37R0oFQwJ1"><span style="font-weight:bold">一个 Agent 最终答对了，但你为什么还要看它的"轨迹"？</span><span> （</span><span><span><a href="#f-doxcnzatI8p6FloX5Y2AHgG2fR9"><span>见 3.3.4.3 面试卡片</span></a></span></span><span>）</span></li></ol>

<p id="f-doxcn5JJfAltVjTUNyGzQYYOWub"><span style="font-weight:bold">方法与指标类</span></p>

<ol start="5"><li id="f-doxcnxD1ctVsONd09icF8jivvue"><span style="font-weight:bold">在 Agent 评测中用 LLM-as-a-judge（大模型当裁判）很火，请客观评价一下它的优缺点？如果由你负责实际项目落地，应该怎么科学避坑？</span><span> （见</span><span><span><a href="#f-doxcn9n57LOGgOtMF6BB69Ho7df"><span> 3.3.1.1 面试卡片</span></a></span></span><span>）</span></li></ol>

<ol start="6"><li id="f-doxcnIOC7lS3CGY7z0sWsp9Ke6f"><span style="font-weight:bold">评估一个 RAG 系统，你会从哪些维度入手？用什么指标？</span><span> （见 </span><span><span><a href="#f-doxcnVnrkB8JpRTl5aaFj1tWKGe"><span>3.3.3.2 面试卡片</span></a></span></span><span>）</span></li></ol>

<ol start="7"><li id="f-doxcnFKjOHw84Uog2tSkuTRNlpf"><span style="font-weight:bold">怎么评估 Agent 的工具调用能力？它有哪几个层次？</span><span> （见 </span><span><span><a href="#f-doxcn2l6F1KVbLMqyuqfbCOnT0d"><span>3.3.3.3 面试卡片</span></a></span></span><span>）</span></li></ol>

<ol start="8"><li id="f-doxcnS3xBp5DSGzk7iw1m8vI4bH"><span style="font-weight:bold">功能正确性、相似度、LLM-judge 三类指标怎么选？</span><span> （见 </span><span><span><a href="#f-doxcnoXwwqOsQF7KoT6hIBuKEhd"><span>3.3.1.3 面试卡片</span></a></span></span><span>）</span></li></ol>

<p id="f-doxcn5cHbhmNc8tslXgGxhglAJh"><span style="font-weight:bold">工程实践类</span></p>

<ol start="9"><li id="f-doxcn2gdmNrCYm7284XLruiRLJe"><span style="font-weight:bold">你认为在 Agent 系统中，应该测试/评估哪些东西？</span><span> （见 </span><span><span><a href="#f-doxcngCjbV7Q93g36GX6tU9VLke"><span> 3.2.2 章面试卡片</span></a></span></span><span>）</span></li></ol>

<ol start="10"><li id="f-doxcnyk8OstiJ4gawllylb3aZUe"><span style="font-weight:bold">你是如何确定你的模型的？</span><span> （</span><span><span><a href="#f-doxcnKLoKKhtHWoDWj9xUVsojib"><span>见 3.3.2 面试卡片</span></a></span></span><span>）</span></li></ol>

<ol start="11"><li id="f-doxcnjpC4ZsTfHWeJiTTeN8Qrmb"><span style="font-weight:bold">多 Agent 系统中，你应该如何评估多个 Agent 之间的协作？</span><span> （见 </span><span><span><a href="#f-doxcnUryBeUR519VNB9FTiZfjdd"><span>3.3.4.4 面试卡</span></a></span></span><span>片）</span></li></ol>

<ol start="12"><li id="f-doxcnOWW2Wa9WB9xEOOoipWIEUB"><span style="font-weight:bold">你的项目上线以后，你如何保证和监测上线质量？</span><span> （见 </span><span><span><a href="#f-doxcnT7YC0jrixIFX2lRgvNO5Y9"><span>3.3.6 面试卡片</span></a></span></span><span>）</span></li></ol>

<ol start="13"><li id="f-doxcn8xoBhTiukkqVEOrTwJbxZf"><span style="font-weight:bold">你会怎么评估 Agent 的安全性？</span><span> （见 </span><span><span><a href="#f-doxcnpR7jILBDuOhSyabhvNn4Vc"><span>3.5.3 面试卡片</span></a></span></span><span>）</span></li></ol>

<p id="f-doxcnSYiGpCVeujbUenUaYFjOxg"><span style="font-weight:bold">案例分析类</span></p>

<ol start="14"><li id="f-doxcnAnCsFyuNoMPK271igVGYbd"><span style="font-weight:bold">介绍一个你了解的 Agent 评测 benchmark，它是怎么设计的？</span><span> （见 </span><span><span><a href="#f-doxcnhnVneOBbRnytUbp0ArOlug"><span>3.4 面试卡片</span></a></span></span><span>）</span></li></ol>

<ol start="15"><li id="f-doxcnmM2s9XSBGeAlI7WfckRgyg"><span style="font-weight:bold">你的项目是如何做Agent评估的？</span></li></ol>

<p id="f-doxcnLkyrfevNxtnkVmLeeMq64d"><span>（推荐思路，要么你就按照今天的理论，做一遍Agent评测，然后按照你的做法适度包装。要么你可以把今天的笔记输入给AI，然后把你的项目也让AI可见。让AI结合你的项目和这个Agent评估思路包装一套方法，然后自己多想想细节，修改润色下，提前准备好相关问题细节，和面试官说）</span></p>

<p id="f-doxcnBdFKlV7O68poRvUGK0aiMh"><span>16. 评估一个 AI Agent，除了准确率还看哪些指标？</span></p>

<p id="f-doxcnhtSn1U7VU2iMuUqajYtg4d"><span>💡 </span><span style="font-weight:bold">思路：</span><span> 关于Agent评测我们专门讲过，这个题就是纯八股。建议看完专题笔记，理解了思路后，然后再掌握/背诵这个标准答案。</span></p>

<p id="f-doxcnVzHBp7jGiVHcejpkrc5Lov"><span>📝 </span><span style="font-weight:bold">答案：</span></p>

<p id="f-doxcnr7j223XllRbXgLNtVRaA24"><span>除了准确率，我还会关注</span><span style="font-weight:bold">任务成功率、稳定性、工具调用和执行轨迹、鲁棒性、延迟、成本、安全合规以及线上业务指标</span><span>。</span></p>

<p id="f-doxcnEvkSqfjUNAzQwqFeEc6uLc"><span>任务成功率主要看 Agent 最终有没有真正完成用户目标，而不只是回答内容是否正确。由于模型具有随机性，还要把同一个任务重复运行多次，通过 </span><span style="font-weight:bold">Pass@k</span><span> 或 </span><span style="font-weight:bold">Pass^k</span><span> 观察它能否稳定完成，而不是偶然成功。</span></p>

<p id="f-doxcnsgUmPT0jYPcx8ufHC9TnJb"><span style="font-weight:bold">工具调用</span><span>方面，要看</span><span style="font-weight:bold">工具选择是否正确、必填参数是否完整、参数值是否准确</span><span>，以及是否存在不该调用工具却乱调用的情况。</span><span style="font-weight:bold">执行轨迹</span><span>方面，则要看</span><span style="font-weight:bold">规划步骤和工具调用顺序是否合理</span><span>，有没有遗漏关键步骤、违反用户约束、重复调用或者陷入循环。</span></p>

<p id="f-doxcnzpvDGrga2IXsTwy3XqnMDc"><span style="font-weight:bold">鲁棒性</span><span>主要看 Agent 面对用户改口、信息缺失、模糊表达、长上下文和工具异常时，能否正确追问、调整计划或进行降级。效率方面会统计</span><span style="font-weight:bold">平均执行步数</span><span>、</span><span style="font-weight:bold">工具调用</span><span>次数和</span><span style="font-weight:bold">重复动作率</span><span>；延迟方面关注 </span><span style="font-weight:bold">TTFT</span><span>、总响应时间以及 </span><span style="font-weight:bold">P95</span><span>、</span><span style="font-weight:bold">P99</span><span>；成本方面关注单任务 </span><span style="font-weight:bold">Token 消耗</span><span>和外部 API 调用费用。</span></p>

<p id="f-doxcnTfAtYK2CHY5I7ytd0pyLod"><span>安全合规方面，要评估</span><span style="font-weight:bold">提示注入</span><span>、</span><span style="font-weight:bold">越狱</span><span>、</span><span style="font-weight:bold">工具越权</span><span>、</span><span style="font-weight:bold">敏感信息泄露</span><span>和有害内容等风险，同时监控</span><span style="font-weight:bold">护栏漏拦率</span><span>和</span><span style="font-weight:bold">误拒率</span><span>。Agent 上线以后，还要看</span><span style="font-weight:bold">用户满意度、转化率、投诉率和人工兜底率</span><span>等真实业务指标。</span></p>

<p id="f-doxcntcLG3hN9ZAjVoElzjgQbBe"><span>如果是多 Agent 系统，还需要看 </span><span style="font-weight:bold">Agent 选择正确率、交接字段完整率、协作冲突率</span><span>，以及增加某个 Agent 后带来的成功率收益是否值得额外的成本和延迟。</span></p>

<p id="f-doxcnSIGEqZRHDLV1UwR1fzN7Xe"><span>总体来说，除了准确率，我会同时评估 Agent 的</span><span style="font-weight:bold">成功率、稳定性、执行过程、鲁棒性、效率、延迟、成本、安全合规和业务效果</span><span>。</span></p>

<p id="f-doxcnEG9BaMgNEAGDTtXXlmNqwf"><span>选自</span><span><span><a href="/posts/agent-learning-24-interview-review/#f-doxcn3cvFQ3ynQVdHZ488rWDXof"><span>202607 宇树科技Agent开发一面</span></a></span></span></p>


<a id="section-0077"></a>
## 视频讲解

<a id="f-doxcnZOuNngzFNDeceTseGExbgA"></a>

<p id="f-doxcnkkfJ1h13RceMn9oAsuIbLe"><span><span><a href="https://www.bilibili.com/video/BV1QMTg6AE52/?spm_id_from=333.1387.homepage.video_card.click&amp;vd_source=144bec9c3f54e465073138bed788be1b"><span>https://www.bilibili.com/video/BV1QMTg6AE52/?spm_id_from=333.1387.homepage.video_card.click&amp;vd_source=144bec9c3f54e465073138bed788be1b</span></a></span></span></p>


<a id="section-1127"></a>
## LangSmith概述

<a id="t-block-19241"></a>

<p id="t-YtYThI1Ihm3K9UVYVK02hl"><span style="font-weight:bold">LangSmith 提供用于开发、调试和部署 LLM 应用程序的工具。</span><span> 它帮助您在一个地方追踪请求、评估输出、测试提示词并管理部署。 LangSmith 是框架无关的，因此您可以将其与 LangChain 的开源库 </span><span style="border-bottom:1px solid;font-weight:bold">langchain</span><span> 和 </span><span style="border-bottom:1px solid;font-weight:bold">langgraph</span><span> 一起使用，也可以单独使用。 先在本地进行原型设计，然后借助集成的监控和评估功能转向生产环境，以构建更可靠的 AI 系统。</span></p>

<p id="t-lDwARfbkclAsZVAigSZCP4"><span>LangGraph Platform 现已更名为 </span><span style="border-bottom:1px solid;font-weight:bold">LangSmith Deployment</span><span>。</span></p>


<a id="section-1129"></a>
## 创建账户

<a id="t-TAkjLSM9SJVj21mmuaEOiG"></a>

<p id="t-CUPgAjkLkLRXwefKnNEyd1"><span>在</span><span style="border-bottom:1px solid;font-weight:bold">smith.langchain.com</span><span>注册（无需信用卡）。 您可以使用</span><span style="font-weight:bold">Google</span><span>、</span><span style="font-weight:bold">GitHub</span><span>或</span><span style="font-weight:bold">邮箱</span><span>登录。</span></p>


<a id="section-1130"></a>
## 创建 API 密钥

<a id="t-xW4ILXepqsE3nVscN8ThEZ"></a>

<p id="t-SeWfqHPR7kV9Oqtv8m7tKH"><span>前往您的 </span><span style="border-bottom:1px solid;font-weight:bold">设置页面</span><span> → </span><span style="font-weight:bold">API Keys</span><span> → </span><span style="font-weight:bold">Create API Key</span><span>。 复制密钥并安全保存。</span></p>

<p id="t-cdb4fxYtgq9hXhQy8fIZgm"><span>准备好您的账户和 API 密钥后，选择一个快速入门指南开始使用 LangSmith 进行构建：</span></p>

<div id="t-b6jAgfBExxEybcROxCsKxB"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/db9637468d3d3c09236cac6a.png"/></div>


<a id="section-1131"></a>
## 更多构建方式

<a id="t-zhvmNmCZrNZ41yaKNNKl4n"></a>

<div id="t-3Fp0RxHAZQ21hhMcl9RVv0"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/e1565caaab96a4765be5cca4.png"/></div>

<p id="t-V18uLjaNhuEw3A4j5EQPc5"><span>LangSmith 符合 HIPAA、SOC 2 Type 2 和 GDPR 标准，满足数据安全和隐私的最高要求。</span></p>


<a id="section-1132"></a>
## 工作流程

<a id="t-eASjnnwDqKXW13wrsnT0Ul"></a>

<p id="t-uqSIka7Y3yc9H2NMlAtKdx"><span>LangSmith 将可观测性、评估、部署和平台设置整合到一个集成的工作流程中——从本地开发到生产环境。</span></p>

<div id="t-KojJkuWVMlMKB0pPZ6K9yr"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/73b384e48b0ed0311094197a.svg"/></div>

<div id="t-B81d5M6Lp7u0N0GXmtimZQ"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/f1e01a566bff645b7183d84b.svg"/></div>


<a id="section-1133"></a>
## 创建账户和 API 密钥

<a id="t-block-19260"></a>

<p id="t-4bXucecSUpM6fF6eNNqJCQ"><span style="background-color:transparent">要开始使用 LangSmith，您需要创建一个账户。您可以在 </span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">LangSmith UI</span><span style="background-color:transparent"> 注册一个免费账户。LangSmith 支持使用 Google、GitHub 和电子邮件登录。</span></p>

<div id="t-5c9z7FzsgSS9iXRvgPBI9l"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/46979672d00f770677c9f2a6.png"/></div>


<a id="section-1134"></a>
## API 密钥

<a id="t-nKOHJ1wSIunC9resxOB2KY"></a>

<p id="t-1CgDkfI3iSbm8iSdu10jII"><span style="background-color:transparent">LangSmith 支持两种类型的 API 密钥：服务密钥和个人访问令牌。这两种类型的令牌都可用于对 LangSmith API 的请求进行身份验证，但它们有不同的使用场景。</span></p>


<a id="section-1135"></a>
## 创建 API 密钥

<a id="t-2KJ5b2HXnI8hBGfFwK5ryN"></a>

<p id="t-9lLmu81NWz05DhXbmzqujB"><span style="background-color:transparent">要使用 LangSmith 记录追踪和运行评估，您需要创建一个 API 密钥来验证您的请求。API 密钥可以限定在一组</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">工作空间</span><span style="background-color:transparent">内，或整个</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">组织</span><span style="background-color:transparent">内。</span></p>

<p id="t-jDcSfYDugyFiDKTTB4T6Cc"><span style="background-color:transparent">要创建任一类型的 API 密钥：</span></p>

<ol start="1"><li id="t-rq2JOchmEaaYq8adpS76GJ"><span>导航到</span><span style="border-bottom:1px solid;font-weight:bold">设置页面</span><span>并滚动到 </span><span style="font-weight:bold">API 密钥</span><span> 部分。</span></li></ol>

<ol start="2"><li id="t-5FpAMncxW8P5hjUZjrFPsx"><span>对于服务密钥，选择组织范围或工作空间范围的密钥。如果密钥是工作空间范围的，则必须指定具体的工作空间。</span></li></ol>

<p id="t-T22tXhmO8rvtDm8spiYXca"><span style="background-color:transparent">企业用户还可以为密钥</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">分配特定角色</span><span style="background-color:transparent">，以调整其权限。 3. 设置密钥的过期时间；密钥将在所选天数后失效，如果选择“永不过期”则不会失效。 4. 点击 </span><span style="font-weight:bold;background-color:transparent">创建 API 密钥。</span></p>

<p id="t-XAifhpaeHl07FgBzY76YT2"><span>API 密钥只会显示一次，因此请务必复制它并将其存储在安全的地方。</span></p>

<div id="t-1qjPa93ChXPcELrjHj4RXH"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/0d950328c0a13a1684b3aa9c.png"/></div>


<a id="section-1136"></a>
## 删除 API 密钥

<a id="t-xc7nQltPgezOowbyX1nWtN"></a>

<p id="t-XAafC6A6cvD9UrsdgP8ctg"><span style="background-color:transparent">要删除 API 密钥：</span></p>

<ol start="1"><li id="t-MGUWKPe2HQyQlAdbMh5FoA"><span>导航到</span><span style="border-bottom:1px solid;font-weight:bold">设置页面</span><span>并滚动到 </span><span style="font-weight:bold">API 密钥</span><span> 部分。</span></li></ol>

<ol start="2"><li id="t-2y9ISkYBcpI8qRerntICEa"><span>从表格中找到需要删除的 API 密钥。根据需要切换</span><span style="font-weight:bold">个人</span><span>或</span><span style="font-weight:bold">服务</span><span>筛选。</span></li></ol>

<ol start="3"><li id="t-F2trdYgiLtWnVSEw9Y3EaM"><span>在</span><span style="font-weight:bold">操作</span><span>列中选择垃圾桶图标</span><span>并确认删除。</span></li></ol>


<a id="section-1137"></a>
## 配置 SDK

<a id="t-GyNPsrkWuBr3ixPJBbbSFO"></a>

<p id="t-tjCw6RMQRqSlmdiYFe0y4x"><span style="background-color:transparent">除了</span><span style="background-color:transparent">LANGSMITH_API_KEY</span><span style="background-color:transparent">之外，您还可以设置以下环境变量。</span></p>

<p id="t-aFQpXmtOx9cybIMiv55V6U"><span style="background-color:transparent">这仅在需要使用欧盟实例时才需要设置。</span></p>

<p id="t-FfLuyvXd7zXFBZEJxUuf4m"><span style="background-color:transparent">LANGSMITH_ENDPOINT=https://eu.api.smith.langchain.com</span></p>

<p id="t-ncn9F6RHE8EjY358O5apEy"><span style="background-color:transparent">这仅在密钥限定于多个工作空间时才需要设置。</span></p>

<p id="t-Yiwx9ibkvsedrljuAqfO43"><span style="background-color:transparent">LANGSMITH_WORKSPACE_ID=&lt;工作空间 ID&gt;</span></p>


<a id="section-1138"></a>
## 在 SDK 之外使用 API 密钥

<a id="t-Mvwxr7fb86MbRcY13vG8pV"></a>

<p id="t-ZcrBpvYWXeTFRkWzptiiH4"><span style="background-color:transparent">请参阅</span><span style="border-bottom:1px solid;font-weight:bold;background-color:transparent">通过 API 管理组织的说明</span><span style="background-color:transparent">。</span></p>

