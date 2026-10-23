---
title: "第 20 章 · Skills 与 Agent 工程方法"
date: "2026-10-22"
draft: false
author: "学习资料整理"
description: "Skill、Harness、Loop、Graph 工程与实践"
tags: ["Agent", "学习路线"]
categories: ["AI 工程"]
prerequisites: ["agent-learning-19-ai-coding"]
verification: {"status": "not-run", "scope": "本次仅整理资料；示例代码与原文技术结论未复跑。"}
---

Skill、Harness、Loop、Graph 工程与实践

[学习路线](/posts/agent-learning-route/) · [上一章](/posts/agent-learning-19-ai-coding/) · [下一章](/posts/agent-learning-21-open-source-architectures/)

本章按知识小节编排。项目内容作为学习案例阅读，示例代码与原文技术结论未在本次整理中执行验证。

## 本章目录

- [SKILL](#section-0118)
- [SKILL典型范式](#section-0119)
- [面试实战](#section-0120)
- [Harness Engineering](#section-0121)
- [概念定义](#section-0122)
- [演进脉络](#section-0123)
- [Harness 工程实践要点](#section-0124)
- [Harness 思想的运用](#section-0125)
- [Anthropic Harness架构详解](#section-0126)
- [ClawCode Harness工程详解](#section-0127)
- [面试问题速览](#section-0128)
- [Loop Engineering](#section-0130)
- [Graph 工程](#section-0131)
- [Harness Engineering（驾驭工程）](#section-2087)
- [一、什么是 Harness Engineering？](#section-2088)
- [二、为什么需要驾驭工程？真实数据说话](#section-2089)
- [三、AI 工程范式的三次跃迁](#section-2090)
- [四、Agent 常见失败模式](#section-2091)
- [五、驾驭工程的四大护栏](#section-2092)
- [护栏一：上下文工程（Context Engineering）——新员工手册](#section-2093)
- [护栏二：架构约束（Architecture Con straints）——缰绳](#section-2094)
- [护栏三：反馈循环（Feedback Loop）——智能体审智能体](#section-2095)
- [护栏四：熵管理（Entropy Management）——垃圾回收](#section-2096)
- [六、六大行业共识](#section-2097)
- [七、Harness 与传统框架的关系](#section-2098)
- [总结](#section-2099)
- [Loop Engineering（循环工程）](#section-2122)
- [AI 工程的演进过程](#section-2123)
- [Loop Engineering 的起源](#section-2124)
- [引爆点：两句话，百万次转发](#section-2125)
- [背景：AI 编程工具的三代演进](#section-2126)
- [什么是 Loop Engineering](#section-2127)
- [什么是 Loop（循环）](#section-2128)
- [Loop Engineering 与 Prompt Engineering 的区别](#section-2129)
- [Loop 的核心循环](#section-2130)
- [六大构成要素](#section-2131)
- [要素一：自动触发器（Automations）](#section-2132)
- [实例](#section-2133)
- [要素二：并行隔离（Worktrees）](#section-2134)
- [实例](#section-2135)
- [要素三：技能文件（Skills）](#section-2136)
- [实例](#section-2137)
- [要素四：连接器（Connectors / MCP）](#section-2138)
- [实例：在 Claude Code 中配置 MCP 连接器](#section-2139)
- [要素五：子 Agent（Sub-Agents）](#section-2140)
- [实例：定义检查者子 Agent](#section-2141)
- [要素六：持久记忆（Memory）](#section-2142)
- [实例：Loop 状态文件](#section-2143)
- [五种常见 Loop 模式](#section-2144)
- [构建你的第一个 Loop](#section-2145)
- [第一步：从一个窄任务开始](#section-2146)
- [第二步：明确告知验证方式](#section-2147)
- [实例：带验证条件的 Loop 指令](#section-2148)
- [第三步：设置保险机制](#section-2149)
- [实例：每日 CI 故障分类 Loop（最小安全版本）](#section-2150)
- [第四步：逐步提升自主程度](#section-2151)
- [Loop Engineering 的三大风险](#section-2152)
- [风险一：验证仍然是你的责任](#section-2153)
- [风险二：理解债（Comprehension Debt）积累更快](#section-2154)
- [风险三：认知投降（Cognitive Surrender）](#section-2155)
- [最佳实践总结](#section-2156)

<a id="section-0118"></a>
## SKILL

<a id="f-doxcnLFIwlm2NmL623TsclPGqPo"></a>

<p id="f-doxcnd4RTPFuougxzNJvlTMgl9l">Skill 于 2025 年 10 月提出，并逐步获得工具生态支持。推荐学习路线如下：</p>

<div style="margin-left:25px"><p id="f-doxcnpbPgRF6KDdLNUPpjPtcXec"><span>1：</span><span style="font-weight:bold">入门视频:</span><span> 了解Skill是什么，怎么用。(视频见</span><span><span><a href="#f-doxcnRhVErfHbQd1JkQBGloZh1g"><span>3.10</span></a></span></span><span>)</span></p><p id="f-doxcnDOZVABomP84OdxqBPEsnPe"><span>2.  </span><span style="font-weight:bold">进阶视频：</span><span>掌握Skill的设计思路。(视频见</span><span><span><a href="#f-doxcnRhVErfHbQd1JkQBGloZh1g"><span>3.10</span></a></span></span><span>)</span></p><p id="f-doxcngp9l3wRJBLA0Sl630mLcUg">3. Skill 编写规范：参考 Anthropic 官方 Skill 文档，了解最佳实践、范式与命名规则。</p><p id="f-doxcnWxW84QW5uCrEng02nSAzqf">4. 如何写 Skill：参考下面的视频演示，理解 Feedback Cycle（反馈闭环）与反复迭代的过程。 <a href="https://www.youtube.com/watch?v=zKBPwDpBfhs&amp;t=324s"><span>Feedback Cycle</span></a></p><p id="f-doxcnYlJMlrdzAvUyptTk9dqe6c"><span>5.  </span><span style="font-weight:bold">实战</span><span>：</span></p><p id="f-doxcnMEvPbV39bQsWMskcrWlkpa"><span>     1. 参考视频笔记提供了一些官方的SKILL github链接，特别是第4个链接，是由Anthropic提供的一组Skill示例，严格遵循了它提供的Skill的最佳实践文档，可以作为Skill的教科书级别的示例来阅读。 (链接见3.10 参考视频和项目里面的</span><span style="font-weight:bold"> Skills实战</span><span>）</span></p><p id="f-doxcns04KxHFLHDmpNq0ztT1wGi"><span>     2. 最后是你应该自己写一些SKILL，比如自己组内用的内部提效的SKILL，公司用的更标准的SKILL，写一些你就会更有经验。面试的时候除了基本概念，面试官喜欢问你自己做了一些什么SKILL，用了一些什么技巧，可以参考</span><span><span><a href="#f-doxcnkRfK8yvh36Igfkd4sSEDXc"><span>面试实战部分</span></a></span></span><span>。</span></p><h3 id="f-doxcnwauGqqWtb7vTANxX5DfL2c"><span>3.1 SKILL 概念</span></h3><p id="f-doxcnz6iIiwPba6ug9DZJ1ewQWd"><span>Skill是一组打包了指令的文件夹：文件夹会包含Skill.md 的核心指令文件，以及Scripts,Reference和assets的可选资源文件（后文SKILL目录结构小节有更详细解释）。它教会AI如何处理指定的任务和流程。当需要处理重复的工作流，比如根据规范生成前端设计，创建符合团队风格指南的文档，多步骤流程编排等任务时，Skill可以让你无需每次对话重新解释你的偏好，流程，领域知识，而是通过Skill一次教会AI，之后每次都能受用。相比传统的提示词，它采用渐进式披露，动态加载提示词，更节约Token.</span></p><h3 id="f-doxcnwAgdf5A7lKjtjltmMFzgCd"><span>3.2 SKILL目录结构</span></h3><p id="f-doxcnms8o6GP0SL2PRMGEMQ2LLf"><span>从图中我们可以清晰的理解概念所说，一个SKILL就是一个文件夹。其中包含以下内容：</span></p><div id="f-doxcn9RoYElxbNcQ62JtmPVF7kb"><img alt="" decoding="async" height="333" loading="lazy" src="/images/agent-learning/954d87a8514ad08531782b83.png" width="736"/></div><p id="f-doxcngAHdSV4HX3PjhWA9y6URXU"><span>1.SKILL.md：必须，包含了 Yaml头和Body。Yaml是md文件中的头，告诉AI是否加载这个SKILL，AI必定会加载。而body</span></p><p id="f-doxcnQS5O5kPseI8FVKBWa9AVTg"><span>是正文，是渐进式披露的，只有AI读取了YAML头，认为这个SKILL应该被加载，才会加载这个正文部分。</span></p><p id="f-doxcnqdNR5UFbT2Qv54rbhmAwOh"><span>2.Scripts: 可选。包含着在AI执行过程中需要使用的脚本文件。</span></p><p id="f-doxcnUs1IFD5d9wUTScYiutfnnf"><span>3.References: 可选。存放执行SKILL相关的文档，说明，内容以MD为主。</span></p><p id="f-doxcnnCRoMcEBmlnvErBZmRH8yg"><span>4.Assets：可选。存放执行SKILL时需要的模板，静态资源，比如图片等。</span></p><p id="f-doxcn0DQEEZPmDJsDe0DA3aF4jc"><span>2,3,4其实就是在SKILL执行过程中，所需要的资源。Anthropic 官方明确建议一个SKILL不应该超过500行，所以SKILL需要引用其它资源的时候，应该将这些东西放在SKILL.MD之外，而在SKILL.MD中显式指向它。</span></p><h3 id="f-doxcn7KkrWiI4JozHKrD5yc45Ac"><span>3.3 SKILL的常见应用场景：</span></h3><p id="f-doxcni9c0oZv9B0moBV3NqbMrjf"><span>1.生成一致的，高质量的内容，比如文档，PPT，app, design, 代码等。实例：</span><span><span><a href="https://github.com/anthropics/skills/tree/main/skills/frontend-design"><span>frontend-design skill</span></a></span></span></p><p id="f-doxcnMDqJnZSOocdtexDvWZq0gg"><span>2.编排多步流程，让这些步骤遵循特定的顺序，示例：</span><span><span><a href="https://github.com/anthropics/skills/blob/main/skills/skill-creator/SKILL.md"><span>Skill-creator</span></a></span></span></p><p id="f-doxcnedAo0W7AJ4CJywPX48if5c"><span>3.规范/增强MCP使用，将MCP转换成可靠的工作流。实例：</span><span><span><a href="https://github.com/getsentry/sentry-for-claude/tree/main/skills"><span>Sentry-code-review skill</span></a></span></span></p><p id="f-doxcnuJ8gvMoWbGStis9vRDJ6af"><span>（这一点我想解释一下的是，根据Anthropic官方指南，规范MCP的使用指的是用了Skill, 可以让用户/AI更清楚知道某个MCP Server 如何使用，遇到问题如何解决，取得稳定的结果。通常的最佳实践是在MCP Server的文档中附上SKILL的链接。用户在使用多个MCP Server的时候，也可以通过SKILL来编排多个MCP的使用流。从这一点可以看出SKILL和MCP是相辅相成的，而不是替代关系。这一点是Anthropic官方指南，可以认为这一点比较新颖，也是一些视频没有提到的，面试时候说出一点SKILL和MCP的补充关系和最佳实践，可以加分）</span></p><h3 id="f-doxcnloQ0qUwFtqBztGVBmR8BZg"><span>3.4 SKILL测试与评估</span></h3><p id="f-doxcnGL6bHet1blOnW76vZpbgwe"><span>通常可以从以下几个角度来测试Skill的质量：</span></p><div id="f-doxcn84SXNzPIJK5A6dVe68N1Vc" style="display:flex;gap:0.5em"><span style="min-width:1.5em">a.</span><div><span>触发测试：保证SKILL会在正确的时机被加载。在不该触发的情况不会被误触发，在该触发的情况也不会不触发。</span></div></div><div id="f-doxcn9QdjVsagLU2VhLsbteIFhg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">b.</span><div><span>功能测试：测试SKILL产生正确的结果：输出是符合预期的，API正确调用，错误被处理，边缘情况被覆盖。</span></div></div><div id="f-doxcn08EnlVtwmyFCpmsbVg4hgd" style="display:flex;gap:0.5em"><span style="min-width:1.5em">c.</span><div><span>性能测试：对比使用SKILL和不使用SKILL时，用户的介入次数是否减少，API调用失败次数是否减少，Token消耗是否降低。</span></div></div></div>


<a id="section-0119"></a>
## SKILL典型范式

<a id="f-doxcnafKdz89JrHGQN6RmezT55g"></a>

<div style="margin-left:25px"><div id="f-doxcnRhVErfHbQd1JkQBGloZh1g" style="display:flex;gap:0.5em"><span style="min-width:1.5em">a.</span><div><span>顺序工作流编排： 当有多个步骤，并且需要按照指定的顺序执行时使用。</span></div></div><p id="f-doxcnF4YERzfCTfQa9X3a5VS63d"><span>核心要点：说明步骤顺序，步骤间的依赖，每一步如何验证，失败时如何回滚。</span></p><div id="f-doxcn4ZUnoVVfLHgzfP2x7WGAkb"><img alt="" decoding="async" height="772" loading="lazy" src="/images/agent-learning/8f8c0a5ec8794a2518b1d38c.png" width="1066"/></div><div id="f-doxcnAfSehbiS1u23QmRzVkBNKb" style="display:flex;gap:0.5em"><span style="min-width:1.5em">b.</span><div><span>多MCP 协作： 任务流包含多个MCP Server时使用。</span></div></div><p id="f-doxcnqD9jXcI3MtwHoAxnQrs8hh"><span>核心要点：说明多MCP步骤间如何传递数据，错误异常处理，清晰的步骤界限；</span></p><div id="f-doxcnsvhAZ0uTmw5TSYPsGxqyqg"><img alt="" decoding="async" height="811" loading="lazy" src="/images/agent-learning/6c2ef24c104bc2f2e562bdbd.png" width="1030"/></div><div id="f-doxcnTviJsSmLIT9Fh9if3Emrsi" style="display:flex;gap:0.5em"><span style="min-width:1.5em">c.</span><div><span>迭代优化： 需要通过多次迭代提升输出质量时：</span></div></div><p id="f-doxcnVFVbpaYB3J4Qjiefat0xJf"><span>核心要点：清晰的质量标准， 迭代提升，验证脚本，知道何时停止迭代。</span></p><div id="f-doxcnEJo4H0XBk0RRxWa7Dwn8Og"><img alt="" decoding="async" height="1054" loading="lazy" src="/images/agent-learning/d8835d78b504db0edf97541c.png" width="1032"/></div><div id="f-doxcnEIbqGmZrlcSHUXu7o4qhyg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">d.</span><div><span>上下文感知工具选择： 当需要根据上下文场景，来动态选择使用不同的工具时使用</span></div></div><p id="f-doxcnrRljWiKOIMq38YnEifNPhc"><span>核心要点：清晰的选择策略，兜底选择，选择理由透明</span></p><div id="f-doxcnQgQiMdZhSpHwI3E2fG206c"><img alt="" decoding="async" height="805" loading="lazy" src="/images/agent-learning/6454e91ea8cab0af565321df.png" width="1033"/></div><div id="f-doxcnYolY7Wp0rHkOGIJ9Pxu8F3" style="display:flex;gap:0.5em"><span style="min-width:1.5em">e.</span><div><span>领域专业智能：Skill需要使用特定领域的知识来完成任务时使用。</span></div></div><p id="f-doxcnC0keTWRYVOguu92C5bJZuh"><span>关键要点：将专业知识嵌入逻辑，合规性保证，详尽的领域文档，</span></p><div id="f-doxcnCwS3GxJJVqsT7jqiyaD87D"><img alt="" decoding="async" height="999" loading="lazy" src="/images/agent-learning/2c8735c7b100feb1071c98ed.png" width="1021"/></div><h3 id="f-doxcnxBHMR0xCibUaNOiF1t5BZg"><span>3.6 SKILL  vs MCP</span></h3><p id="f-doxcnYd3P6Y41U2WWk0yK1lfbch"><span>（面试官特喜欢问的就是差别，你答得不多，还喜欢追问，还有吗？这里尽量给大家总结全面一点）</span></p><p id="f-doxcnpoaAjk11JKFUAjkuT1FW1e"><span>借用Anthropic 官网文档原话，Skills 和 MCP的核心差别是：MCP 提供给模型数据，而Skills教会模型如何使用这些数据（"MCP connects Claude to data, Skills teach Claude what to do with data)。二者的区别为：</span></p><div id="f-doxcnIElBeGhyqmOD3xbaSKJ7Fe" style="display:flex;gap:0.5em"><span style="min-width:1.5em">a.</span><div><span>MCP侧重于提供工具调用，而Skills则侧重于提示词。MCP更像是一个标准的工具箱，提供规范，可复用的工具。而Skills则是一个带目录的说明书。</span></div></div><div id="f-doxcneMQbw8miJpQFZt6Q6Wgt8b" style="display:flex;gap:0.5em"><span style="min-width:1.5em">b.</span><div><span>MCP 的本质是一个独立运行的程序，而Skills 本质是一个文档。他们本质不同，决定了他们性质也不同，Skills更适合处理轻量级的，简单的逻辑，安全性和稳定性都不及MCP。</span></div></div><div id="f-doxcnOzTPAXzYBXLtyUnmTpobPd" style="display:flex;gap:0.5em"><span style="min-width:1.5em">c.</span><div><span>Skills 采用渐进式披露提示词的机制，Tokens消耗低。而MCP则是一次性塞入所有提示词，Token消耗高。</span></div></div><div id="f-doxcnyeIgyDSlE4clebLN73ysih" style="display:flex;gap:0.5em"><span style="min-width:1.5em">d.</span><div><span>Skills的开发难度相比于MCP，开发难度低很多。</span></div></div><p id="f-doxcnq6TglS3PbWQpife0oQ0tBf"><span>总结来说，SKILL和MCP二者不是相互替代，而是相互补充的。 在开发MCP SERVER的时候，可以在MCP Server的文档中添加一个链接，指向一个SKILL的链接，这个SKILL让用户/AI更清楚知道该MCP 如何使用，遇到问题如何解决，让模型调用MCP时取得更稳定的结果。在同时使用了多个MCP Server的时候，也可以用SKILL对多个编排多个MCP Server的工作流</span></p><h3 id="f-doxcnqF704X5eKndcMm68TiOufd"><span>3.7 SKILL vs Prompts</span></h3><p id="f-doxcn05Vg2idAwehwXxzPrQpe9g"><span>Skills 相比于Prompts的核心差别在于他们的</span><span style="font-weight:bold">形态</span><span>和</span><span style="font-weight:bold">生命周期</span><span>。</span></p><p id="f-doxcnfFm1ONxqCKKK60psz8zCGP"><span>Prompts 是一次性对话内容，你需要自己保存，复制和粘贴。模型不会知道什么时候用哪一个Prompt，而且你需要把Prompts </span><span style="font-weight:bold">全部塞到上下文里面</span><span>。这会大量占用你的上下文空间。</span></p><p id="f-doxcnLNSSqoj0Y2mXuZFOw9yJPf"><span>Skills 则是将提示词以一种</span><span style="font-weight:bold">更加工程化的包装方式打包</span><span>，他是一个</span><span style="font-weight:bold">文件夹的形式</span><span>，里面包含skills.md 和相关的资源文件。他会动</span><span style="font-weight:bold">态加载/渐进式披露提示词，</span><span>更加节省提示词</span><span style="font-weight:bold">。</span><span>容易复用和版本管理，易于协作和共享。</span></p><p id="f-doxcnZn05oFrUuut9bxcr9KNKUf"><span>总结来说，Skills不是一个更复杂的提示词，而是把复杂的提示词，变成了一个</span><span style="font-weight:bold">有结构，可复用，可以自动调用</span><span>的模块。</span></p><div id="f-doxcnb6INFzZyGKHlyAJCRpiRHb"><img alt="" decoding="async" height="124" loading="lazy" src="/images/agent-learning/79e6d998dd1337077b3399ee.png" width="360"/></div><h3 id="f-doxcnDC2Nge5thFCnaXlVy5IGuf"><span>3.8 SKILL的运行模式</span></h3><div id="f-doxcnA7m8B7Z4yQSMZONDhXSb8g" style="display:flex;gap:0.5em"><span style="min-width:1.5em">a.</span><div><span style="font-weight:bold">用户发起任务</span><br/><span> 用户对 Claude Code 提需求，Claude Code 把这个请求连同当前可用的 Skills列表结合元数据一起交给 AI，让 AI 先基于需求判断该用哪类能力。</span></div></div><div id="f-doxcn3dmTV9xT2IDZzK2B43PV4d" style="display:flex;gap:0.5em"><span style="min-width:1.5em">b.</span><div><span style="font-weight:bold">AI 选择要用的 Skill</span><br/><span> AI 在可用的Skills里做匹配，然后返回指定的Skills</span></div></div><div id="f-doxcnT5JHMf6EBQhEjfBJAvf8lh" style="display:flex;gap:0.5em"><span style="min-width:1.5em">c.</span><div><span style="font-weight:bold">按需加载 Skill 的指令层</span></div></div><div style="margin-left:25px"><p id="f-doxcnfJvchcB8Uc9wbIEA93iswv"><span>一旦选定 skill，Claude Code 才把该 skill 的具体定义交给 AI, 这一步体现了Skills</span><span style="font-weight:bold">指令层 按需加载</span><span>：只有用到这个 skill 时，才把更详细的指令灌给模型。</span></p></div><div id="f-doxcnzGoWmaeWUNtyOZRhh8bNeg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">d.</span><div><span style="font-weight:bold">按需加载 Skill 的资源层→ 读范文/材料 → 生成最终回答</span></div></div><div style="margin-left:25px"><p id="f-doxcnZXxM5p3ufXYiXFgX29Bxde"><span>如果需要使用到资源层，接下来 Claude Code 会执行读资源的动作，把 </span><span style="font-weight:bold">references/范文内容</span><span>喂给 AI；AI 基于 用户材料 + skill 指令 + references 完成写作并输出 最终回答。</span></p></div><div id="f-doxcnRDqeAwJGFMG36Nm5n9zO8e"><img alt="" decoding="async" height="213" loading="lazy" src="/images/agent-learning/55ca0296395f2b0aba3af2ca.png" width="360"/></div><h3 id="f-doxcnqMA8DBVHxFDc5Jde3cD711"><span>3.9 SKILL的设计理念</span></h3><p id="f-doxcnKp8q0RZpRx4agr9pYyPll2"><span>（上面其实是一些SKILL的基础知识，相对来说是最基础，或者考到SKILL 必问的。 必须准备好。这一节可以理解为一个拔高项，我们不谈Skills 的具体概念，而结合行业的痛点，发展趋势，未来的展望来聊Skills。 如果你能和面试官讲出来，会体现出你其实是有思考，有想法，关注着行业发展和趋势的。把这些答了，是加分项）</span></p><p id="f-doxcn7asXRtyuWgYCzvIsjHztZc"><span>    发展到现在（2026年初），现在的Agent工程的痛点不再是能不能做，而是能不能交付。目前的行业痛点是：</span></p><p id="f-doxcnL0Kx3MIxL1v2QIgLv71ddh"><span>1.虽然模型能力很强，但是常识很弱，能解决通用问题，却在具体业务问题上频繁踩雷。经常做的是文本补全，而不是业务理解。这通常导致造出来的Agent需要质检，返工，人力成本高。</span></p><p id="f-doxcneFjJqOdLdNalirnXTJ2S4c"><span>2.现在经常导致的一个问题是，公司重复造轮子。给财务做一个Agent，法务做一个Agent, 运营做一个Agent，每个Agent都有自己的权限，工具，prompt等。就会变成同一个业务规则，在5个Agent里各写一遍，这就导致重复造轮子很严重，难以维护。</span></p><p id="f-doxcnYkS2bjxACVJF9nBcpZkZZT"><span>3.现在的Agent通常是一个会有复杂的prompts，这导致token太大，模型不能精准执行，另外成本上升。当你用复制粘贴扩展能力，系统就会用维护地狱来还债。</span></p><p id="f-doxcnO5riGgq5ZB4mNB3oyXpwhh"><span>所以行业发展到现在，需要从堆砌提示词，迭代，调试，优化做一个Agent的过程变成做一个 可治理，可迭代，可复用的产品。通过Skills， 行业开发Agent的模式变成去写一个可复用，可管理的技能资产（Reusable skills), 结合通用内核，来解决这些痛点。</span></p><h3 id="f-doxcnD7NjpMV4sOEWHPDAEcKD2g"><span>3.10 参考视频和项目</span></h3><p id="f-doxcnaqC2tEg3M07L89nHkNMUef"><span style="font-weight:bold">入门视频推荐这两个：</span><span>从skills 是什么，组成，核心特点，实践，对比MCP这几个角度都讲了，基本是最基础的内容。这两个视频其实都围绕这几点讲，内容有重复性，可以结合互补着看，适合入门。</span></p><div id="f-doxcn461yJRNyrjodXJSOKjdGmg"><div><div><div><div><div><div><div><div><div><a href="https://open.douyin.com/player/video?vid=7592521205031177499&amp;mode=pc">嵌入视频 / 原始播放器</a></div></div></div></div></div></div></div></div></div></div><div id="f-doxcnaSWUYrbYLhk2xIHutzOHLf"><div><div><div><div><div><div><div><div><div><a href="https://open.douyin.com/player/video?vid=7590008747938876706&amp;mode=pc">嵌入视频 / 原始播放器</a></div></div></div></div></div></div></div></div></div></div><p id="f-doxcnk7YkLucO3OhxD3Acyukrbj"><span style="font-weight:bold">进阶视频：</span></p><p id="f-doxcnSwd6TXljXnF2QVwLO18zsc"><span>这个讲了一些Skills背后的设计理念，行业痛点，学好了和面试官回答可以体现你的行业洞察能力。</span></p><p id="f-doxcnfcM2tiYl9jkGVJmXAD2GRh"><span><span><a href="https://www.youtube.com/watch?v=xeoWgfkxADI"><span>https://www.youtube.com/watch?v=xeoWgfkxADI</span></a></span></span></p><p id="f-doxcnzLCJX7DQQmN7l7L2cFLHXb"><span>这个提到了和Prompts的本质区别，以及提了两种skill的使用方式，相比入门视频深入一些。</span></p></div>

<p id="f-doxcna3lZqNV4anOoD85lroqWad"><span><span><a href="https://www.youtube.com/watch?v=ZzPoWrlzE1w"><span>https://www.youtube.com/watch?v=ZzPoWrlzE1w</span></a></span></span></p>

<p id="f-doxcnFgZ47bmBivCAKxwuFC8k6d"><span style="font-weight:bold">如何写SKILL</span></p>

<p id="f-doxcnheaki0ZnXU8vJgFecCYoBc"><span>聊了这么多都是理论，到底如何写SKILL，看一下这个视频，特别是第13分钟开始，博主讲了如何写SKILL，原则是什么，现场展示了这个过程。其中他说的Feedback Cycle说的是写SKILL最重要的是迭代，他的例子使用他自己写的Skill-builder生成skill(可结合实际任务比较效果），你可以使用官方的SKILL-Creator， 其它的原理是一样的。</span></p>

<p id="f-doxcnsTUT0HzPQAd2Kr3r7Vrwmc"><span><span><a href="https://www.youtube.com/watch?v=zKBPwDpBfhs&amp;t=324s"><span>https://www.youtube.com/watch?v=zKBPwDpBfhs&amp;t=324s</span></a></span></span></p>

<p id="f-doxcnBkvWZ0PbjHTH1O3Z8046ah"><span style="font-weight:bold">     Skills实战：</span></p>

<p id="f-doxcnZpbAGksd54iGEGt8DxcZQf"><span>    本小节提供了一些Skills的实例。</span></p>

<ol start="1"><li id="f-doxcnBJDEWkFs731vNuYWdkgzNc"><span>为 AI Agent（如 Claude Code）提供一组操作 Obsidian 笔记的技能，让 AI 能直接创建、修改 Markdown / Canvas / Bases，实现“AI 管理知识库”。</span></li></ol>

<p id="f-doxcnQLJMs4hRssrROtyalgyHcf"><span><span><a href="https://github.com/kepano/obsidian-skills"><span>https://github.com/kepano/obsidian-skills</span></a></span></span></p>

<ol start="2"><li id="f-doxcnX77MywNOtxUOLBS1BXpLU5"><span>一个给 AI 编程 Agent 用的“工程化技能框架”，强制先澄清需求、写设计、做计划，再用子 Agent 按 TDD / DRY 的方式自动开发代码</span></li></ol>

<p id="f-doxcnagdKc1Fknhd5Lyfuei3C3b"><span><span><a href="https://github.com/obra/superpowers"><span>https://github.com/obra/superpowers</span></a></span></span></p>

<ol start="3"><li id="f-doxcnX267YurZwlPSAHxPtRSUYe"><span>让 AI Agent 把“计划、进度、知识”写进持久化 Markdown 文件中，用文件系统当长期记忆，解决复杂任务中上下文丢失的问题（Manus 风格）。</span></li></ol>

<p id="f-doxcnRjexHVn6VUYdr29ATlsOub"><span><span><a href="https://github.com/OthmanAdi/planning-with-files"><span>https://github.com/OthmanAdi/planning-with-files</span></a></span></span></p>

<ol start="4"><li id="f-doxcn08gpHGHLqZQXFvzmsIJx01"><span>Anthropic 的官方示例，关于Skill的编写规范，可以以这个为模板。比如命名规范，编写风格，可以把这个当作教科书。 下面分享的这个官方文档是由Anthropic官方写的，文档里给的Skill的例子也引用了这个github 项目里的例子。完全可以相信这个仓库中的Skill的质量。这个项目里的Skill-Creator 也是被广泛使用的Skill.</span></li></ol>

<p id="f-doxcn0faWUNgQYA4XtqugEErMGe"><span><span><a href="https://github.com/anthropics/skills/tree/main/skills"><span>https://github.com/anthropics/skills/tree/main/skills</span></a></span></span></p>

<p id="f-doxcnJHdbEYKh8WerWv4XprXOif"><span><span><a href="https://github.com/anthropics/skills/tree/main/skills/skill-creator"><span>https://github.com/anthropics/skills/tree/main/skills/skill-creator</span></a></span></span></p>

<p id="f-doxcnqxpvuEjLYrcdmNrOI5uVue"><span style="font-weight:bold">官方文档</span></p>

<p id="f-doxcnGveDkgd5FVExZm3udKbmhW">Anthropic 官方文档介绍 Skill 的组成、命名、使用场景与常见范式，可结合本节内容进一步阅读。</p>

<p id="f-doxcnm3gF0DF1qPZpuAKHrQ0EAc"><span><span><a href="https://resources.anthropic.com/hubfs/The-Complete-Guide-to-Building-Skill-for-Claude.pdf?hsLang=en"><span>https://resources.anthropic.com/hubfs/The-Complete-Guide-to-Building-Skill-for-Claude.pdf?hsLang=en</span></a></span></span></p>

<p id="f-doxcnXwjFbRcDz1bZtNA08NmNDe"><span><span><a href="https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices"><span>https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices</span></a></span></span></p>


<a id="section-0120"></a>
## 面试实战

<a id="f-doxcnkRfK8yvh36Igfkd4sSEDXc"></a>

<div style="margin-left:25px"><div id="f-doxcnW1OzBghVrPmdizYGZOEOhh" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">Q1：你在做 SKILL 时遇到了什么困难，如何解决的？</span></div></div><div id="f-doxcnMEsyf0A5ZNcd1Phb6NzbUg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">Q2：你做了什么 SKILL，可以分享一下吗？</span></div></div></div>

<p id="f-doxcnEZf4SLinWlOcAMIk9P1PM4"></p>

<p id="f-doxcnqZDtQzS7SbWqKPL2zv6BUh">Q1、Q2 可以先学习理论基础，参考 3.10 中的资料和 Anthropic 官方 Skill 文档，再以官方 Code Review Skill 为例，理解最佳实践和设计思路。 <a href="https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices"><span>Anthropic 公司的官方SKILL文档</span></a></p>

<p id="f-doxcnaRUUABwRJLgOYXXer1jdce"><span>全文总结方式为：理论基础 - Q1,Q2问题答案 - Code-review Skill讲解 - 其它面试问题及答案。</span></p>

<a id="f-doxcn68jScywNowGbIvKC4R3tHd"></a>

##### 理论基础

<p id="f-doxcnfUmmyfbBtsapftsPyVVnRC"><span>这一节是整节的「理论底座」，也是「弹药库」：把 7 个官方最佳实践各自对应的</span><span style="font-weight:bold">问题、根因、解决方案</span><span>讲清楚，后面 Q1/Q2 都从这里取用；被追问到任何一条都能接得住。</span></p>

<p id="f-doxcnkbwAX5mqGqK96urS51Alef"><span style="font-weight:bold">实践 1｜设定合适的自由度</span></p>

<ul><li id="f-doxcnjkxMI0qVFIZ0pNz4qvqQOd"><span style="font-weight:bold">对应问题</span><span>：误报泛滥——AI 报一堆没价值的问题（nitpick、既有问题、linter 就能抓的、用户没改的行）。根因是 code-review 属于"高自由度"任务，模型爱过度发挥。</span></li></ul>

<ul><li id="f-doxcnwyWWry6PUyKRA94xSMAfsd"><span style="font-weight:bold">解决方案</span><span>：rubric + 置信度打分 0–100 + 阈值过滤（只报 ≥80）；正文里显式写一份"false-positive 清单"让模型自我排除。这个有点像</span><span><span><a href="/posts/agent-learning-15-evaluation-observability/#f-doxcn9n57LOGgOtMF6BB69Ho7df"><span>3.3.1.1 LLM-as-a-judge里面这个提示词模板</span></a></span></span><span>。</span></li></ul>

<p id="f-doxcnR8KGWuU8zbUg871R00JVLg"><span style="font-weight:bold">实践 2｜写好 description</span></p>

<ul><li id="f-doxcndyhz1BsUP4E4lmglKv5rJc"><span style="font-weight:bold">对应问题</span><span>：触发不准——该触发没触发（undertrigger）/ 不该触发乱触发（overtrigger）。根因是 </span><span><span><span>description</span></span></span><span> 没写好。</span></li></ul>

<ul><li id="f-doxcn5dkzfa41JbiAh0pcJwUHQg"><span style="font-weight:bold">解决方案</span><span>：description 用第三人称 + 写清 what+when + 用户会说的关键词；overtrigger 可用 </span><span><span><span>disable-model-invocation</span></span></span><span> 改成只手动调。</span></li></ul>

<p id="f-doxcnkcq2NGOUux191vD2mOzAsg"><span style="font-weight:bold">实践 3｜渐进式披露</span></p>

<ul><li id="f-doxcndw6qvxHUkpT3W6lWpuLQPc"><span style="font-weight:bold">对应问题</span><span>：团队规范落不了地——想让 skill 严格按团队规矩审，但规范内容多，全塞正文会超长、费 token、稀释指令。</span></li></ul>

<ul><li id="f-doxcn93b6mICdyJbjzEJiSx6X8c"><span style="font-weight:bold">解决方案</span><span>：规范外置成 reference 文件 + 按需加载，正文只放"逐条核对规范"的流程；SKILL.md 正文控制在 500 行以内。</span></li></ul>

<p id="f-doxcns8Rw8m0tay3g39i7goIbHb"><span style="font-weight:bold">实践 4｜引用只保持一层深 + 长文件加目录</span></p>

<ul><li id="f-doxcnwzWEaMsXrPEdYkBeS1oDhd"><span style="font-weight:bold">对应问题</span><span>：指令被"预览"读不全——参考文件套得太深，模型用 </span><span><span><span>head -100</span></span></span><span> 只预览开头就走、读不全。根因是引用嵌套太深。</span></li></ul>

<ul><li id="f-doxcnncrfhrEktxcawfcmenDJSe"><span style="font-weight:bold">解决方案</span><span>：引用只保持一层深（都从 SKILL.md 直接链）；超过 100 行的参考文件顶部加目录。</span></li></ul>

<p id="f-doxcnl4SDDIWxbMvE92Eajr7dvh"><span style="font-weight:bold">实践 5｜评测先行 + 与 Claude 迭代</span></p>

<ul><li id="f-doxcnB9voVCnk5YzqJg29vfe4ne"><span style="font-weight:bold">对应问题</span><span>：触发 ≠ 做对了（看到生效就以为成了，实际输出飘忽）+ 效果好坏全凭感觉（没客观基准，改一版测一版全靠人肉、跨版本没法比）。根因是缺验证闭环。EDD</span></li></ul>

<ul><li id="f-doxcnPjsP7vduehLCNR7uOf4qOg"><span style="font-weight:bold">解决方案</span><span>：先在无 skill 下裸跑真实任务、记失败点建 baseline；固化成 eval 集（官方建议至少 3 条，每条含 </span><span><span><span>query</span></span></span><span>+</span><span><span><span>files</span></span></span><span>+</span><span><span><span>expected_behavior</span></span></span><span>）；用全新 Claude 实例（fresh session）在真实任务上测，避免作者会话的残留上下文"脑补"掉指令漏洞；每改一版都用同一套 eval 对照 baseline 量化——eval 是效果的"真理来源"（source of truth）；官方无内置评测工具，需自建。</span></li></ul>

<p id="f-doxcngJ5lPnVLydWfxPg8b91nlf"><span style="font-weight:bold">实践 6｜测试所有计划使用的模型</span></p>

<ul><li id="f-doxcnmUhLYHa3AD8SSlLsXxqyCd"><span style="font-weight:bold">对应问题</span><span>：成本膨胀——多 agent 并行、每路都用最贵模型 → token 成本成倍涨。注意：子 agent 各自独立上下文、只回传结论，不污染主对话，上下文隔离反而是优势，代价只是钱。</span></li></ul>

<ul><li id="f-doxcng4JwGhB5FF4SGjrpSI0cOd"><span style="font-weight:bold">解决方案</span><span>：按「要不要真读懂代码」把活分三档——</span><span style="font-weight:bold">Haiku 做机械高频活</span><span>（PR 资格检查 / 打分 / 摘要 / 格式过滤）；</span><span style="font-weight:bold">Sonnet</span><span> 做需读懂 diff 做规范合规判断的并行审查主力（默认档）；</span><span style="font-weight:bold">Opus </span><span>只按需升级给极难推理（跨文件架构、隐蔽并发 / 安全 bug）。</span></li></ul>

<p id="f-doxcn3EWFcfacoGzLZA2ppujDyc"><span style="font-weight:bold">实践 7｜持续测量与退休</span></p>

<ul><li id="f-doxcn38eYcnVDmBNqsjLx2MZwjb"><span style="font-weight:bold">对应问题</span><span>：skill 会过时——模型升级后某些 skill 变多余。根因是分不清 skill 类型。</span></li></ul>

<ul><li id="f-doxcnOcEGrbtKJhC6PVS9wGlEod"><span style="font-weight:bold">解决方案</span><span>：区分 capability-uplift（能力增强型，可能过时）vs encoded-preference（团队偏好型，长期有效）；靠 eval 判断该不该退休。</span></li></ul>

<a id="f-doxcnSdkhdmcXSrI38MXt95nAeh"></a>

##### 面试问题汇总

<p id="f-doxcnaWftt0es6WtROTniDZEWYX">下面汇总 Skill 相关问题。Q1、Q2 偏实践，其余问题偏理论，可以结合 Skill 基础知识和实例理解。</p>

<div style="margin-left:25px"><p id="f-doxcn1Yct0eRQLWfsOgqduCnCph"><span>本节面试问题速览：</span></p><p id="f-doxcnVBapHYvFe3A7Mx45pjj3We"><span>- </span><span style="font-weight:bold">Q1</span><span>：你在做 SKILL 时遇到了什么困难，如何解决的？</span></p><p id="f-doxcnflhx9jZPkls7x3HhLO2uVc"><span>- </span><span style="font-weight:bold">Q2</span><span>：你做了什么 SKILL，可以分享一下吗？</span></p><p id="f-doxcnYGmZYzhs22YEr1zNfyYqyb"><span>- </span><span style="font-weight:bold">Q3</span><span>：SKILL 是什么，可以谈谈你的理解吗？</span></p><p id="f-doxcnBskjGAjh2fcyN3Fz5zWnOW"><span>- </span><span style="font-weight:bold">Q4</span><span>：怎么样能写好一个 SKILL 呢？</span></p><p id="f-doxcnwAHzee4rttX4BSBgacPkEe"><span>- </span><span style="font-weight:bold">Q5</span><span>：怎么提升 SKILL 的任务准确率呢？</span></p><p id="f-doxcnNp2CLvF3IcWxQN1L6uGFxE"><span>- </span><span style="font-weight:bold">Q6</span><span>：SKILL.md 随着业务变大越写越长、导致 AI 不听某些指令，要怎么解决？</span></p></div>

<p id="f-doxcnvPKYWVsWa9LJcfU9UpwDzf"><span style="font-weight:bold">Q1：你在做 SKILL 的时候遇到了什么困难，如何解决的？</span></p>

<p id="f-doxcnKBqZAkT28Um5UvFuQLQbWB">【思路】结合前面 7 种最佳实践中的 3 项，以及 Code Review 相关理念，说明组织方式与设计取舍；也可以补充渐进式披露的设计。</p>

<ul><li id="f-doxcnfLxkfOtdhv5kvncSZQ5zRg"><span style="font-weight:bold">实践 1｜设定自由度</span><span>（解决</span><span style="font-weight:bold">误报</span><span>问题，是 code-review 的命门，最能体现技术判断）</span></li></ul>

<ul><li id="f-doxcnf2V6lFx3laLHd7dmvB9jrh"><span style="font-weight:bold">实践 4｜引用不要深层嵌套</span><span>（解决</span><span style="font-weight:bold">深层调用读不全</span><span>问题，讲成一次自己踩坑排查：发现模型用 </span><span><span><span>head -100</span></span></span><span> 只读了开头）</span></li></ul>

<ul><li id="f-doxcnL8bmg8lKVcczrpp7KsTQwg"><span style="font-weight:bold">实践 5｜测试先行 + feedback cycle</span><span>（表明 skill 是</span><span style="font-weight:bold">基于测试</span><span>打磨的，解决"忽好忽坏、没法衡量"的问题）</span></li></ul>

<p id="f-doxcnJnASiXZh7jodYguVMPlSRh"><span style="font-weight:bold">【口语化答案】</span></p>

<p id="f-doxcnLleKqt2AQ4InCFEOxSiTzh"><span>案例中的是一个团队用的 </span><span style="font-weight:bold">code-review skill</span><span>，做的过程里踩了不少坑，我挑三个印象最深的说。</span></p>

<p id="f-doxcn8d5OazPyIZkTYYaPvz1m2g"><span style="font-weight:bold">第一个、也是最头疼的，是误报。</span><span> 一开始我就是很朴素地写了个 skill，让 Claude 去审 PR 的 diff，结果它特别"热心"，一个 PR 能给你挑出二三十条，但里面大部分是噪音——有的是这行代码本来就有的老问题、跟这次改动没关系；有的是 linter、编译器自己就能抓的，比如 import 顺序、格式；还有一堆是那种资深工程师根本不会 care 的 nitpick。结果就是没人愿意看它的评论，因为信噪比太低。</span></p>

<p id="f-doxcny46cDVZDyOsSowdmiVdEbh"><span>我后来想明白了，code review 本质是个</span><span style="font-weight:bold">高自由度的任务</span><span>——同一段代码，怎么审都算"审了"，所以模型很容易放飞。这时候的解法就是</span><span style="font-weight:bold">主动给它收窄自由度</span><span>，本案例用了两招：</span><span style="font-weight:bold">一是给每个问题打一个 0 到 100 的置信度分，然后设一个阈值，只有 80 分以上的才真正发出来</span><span>；打分的标准我是写死在 skill 里的，比如"经不起推敲的、或者是既有问题"给 0 分，"确认是真的但可能是 nitpick"给 50 分，"高置信、确实会踩、而且团队规范明确点了名"才给 75 分往上。</span><span style="font-weight:bold">二是我在 skill 正文里专门列了一份"什么不该报"的清单</span><span>——既有问题、用户没改的行、linter 能抓的、被规范显式豁免的，全列出来让它自己先排除。这两招下来，一个 PR 的评论从二三十条压到了三五条，但条条是干货。</span></p>

<p id="f-doxcnozaapioQJ1s7AClMUksBAd"><span style="font-weight:bold">第二个坑更隐蔽，是有时候没有按照规范审核。</span><span> 案例把团队规范单独抽成一个 reference 文件，SKILL.md 正文里只写"去读这份规范、逐条核对"。但运行时，有些明明规范里白纸黑字写了的点，它就是漏。检查文件读取过程后发现：</span><span style="font-weight:bold">它读那个 reference 文件的时候，用的是 </span><span style="font-weight:bold"><span><span>head -100</span></span></span><span style="font-weight:bold"> 这种命令，只把开头一百行"预览"了一下就走了</span><span>，该规范一百行开外的内容它根本没看到。再深挖，是引用嵌套层级过多——SKILL.md 指到一个中间文件，那个文件再指到规范，嵌套一深，模型就倾向于只预览、不通读。解法有两个：一是把引用拍平、只保持一层深，所有 reference 都从 SKILL.md 直接链过去，不再转手；二是给超过一百行的规范文件顶部加一个目录（TOC），让它一眼看到全貌、知道该往下读。这么一改，规范漏检的问题基本就没了。这个案例说明：</span><span style="font-weight:bold">skill 不是你写了模型就会乖乖全读，得顺着它实际怎么取上下文去设计文件结构。</span></p>

<p id="f-doxcnFVql9dyD6wNGFRWVc1OQCc"><span style="font-weight:bold">第三个，是这个 skill 一开始忽好忽坏，难以判断改动是否改善效果。</span><span> 同样一类 PR，它今天审得挺准，明天可能就抽风。仅凭感觉无法衡量，因此采用</span><span style="font-weight:bold">测试先行 + 反馈闭环</span><span>的打法：</span><span style="font-weight:bold">先不给 skill，让 Claude 裸跑几个我们真实的、有代表性的 PR，把它审错、漏审的地方记下来，固化成一组固定的测试用例、当成 baseline</span><span>——每条用例写清楚给什么 PR、期望它挑出哪些问题。之后就进入"测试→反馈→修改"的循环：</span><span style="font-weight:bold">每改一版 skill，都拿这同一套用例重新跑一遍，跟 baseline 比是进步了还是退步了</span><span>；关键是</span><span style="font-weight:bold">每次都用一个全新的 Claude 会话去测</span><span>，因为要是用编写 Skill 时的会话测试，它脑子里还残留着上下文，会把指令中的漏洞给"脑补"掉，测不出真问题。就这么一轮轮跑到指标稳定、达到目标效果为止。这套下来，skill 好不好不再是"可以认为"，而是有一组可复现的用例提供验证依据——</span><span style="font-weight:bold">这版比上版强多少，是量化出来的。</span></p>

<p id="f-doxcnZc7RDNifds1PgJCb6Atkxh"><span>这三个坑其实对应了做 skill 的三个层面：</span><span style="font-weight:bold">误报治理是"输出质量"、引用拍平是"结构设计"、测试闭环是"怎么科学地衡量和打磨"</span><span>，算是把这个 skill 从能跑到好用磨了出来。</span></p>

<p id="f-doxcnp1m1LF6XTDkxs5vnRIho5d"><span style="font-style:italic">(被追问时的储备：团队规范外置省 token｜实践 3、分级用模型省成本｜实践 6、description 怎么写才触发准｜实践 2、skill 会不会过时｜实践 7——都在上面最佳实践表里。)</span></p>

<p id="f-doxcnlriXPR0f8bmeSQp11IrCm7"><span style="font-weight:bold">Q2：你做了什么 SKILL 可以分享一下吗？</span></p>

<p id="f-doxcnqOYWGcCxCJrsBnNEkNu9vf">【思路】按定位 → 结构 → 核心设计 → 效果展开，把 Q1 的困难与解决方案自然带出来。下面以 Code Review Skill 为例，结合官方 Code Review Skill 的设计思想进行分析。</p>

<p id="f-doxcnx5AExskumdWgjl4DthlTHh"><span style="font-weight:bold">【口语化答案】</span></p>

<p id="f-doxcn79k8B14ysrnpc5ufCIsBze">以 Code Review Skill 为学习案例：在提交或审核 PR 时，让 Claude 按团队规范检查代码、筛选高价值问题，并生成 PR 评论。</p>

<p id="f-doxcnL1GmgrtgcBdzHc9HbGM0fg"><span style="font-weight:bold">先说结构</span><span>，它其实就是一个文件夹：一个 </span><span><span><span>SKILL.md</span></span></span><span> 放触发条件和审查流程；一个 </span><span><span><span>references/team-spec.md</span></span></span><span> 把我们团队的规范全放进去、按需加载；还有个 </span><span><span><span>scripts/</span></span></span><span> 目录放一些辅助脚本，比如先跑一遍 linter 把机器能抓的问题过滤掉。触发方式两种都支持——Claude 识别到你在 review PR 会自动来问，或者手动打 </span><span><span><span>/code-review</span></span></span><span> 调。</span></p>

<p id="f-doxcnbipHnupRrk5sS0UbZnliGb">核心设计包括以下三点：</p>

<p id="f-doxcnn7yi8Gi3cdtRlkKH8F1xmg"><span style="font-weight:bold">第一是多视角并行审查。</span><span> 我不是让一个 agent 从头审到尾，而是拆成几路并行、各审各的：有的专门盯</span><span style="font-weight:bold">团队规范（CLAUDE.md）合规性</span><span>，有的</span><span style="font-weight:bold">只看 diff 本身抓明显的 bug</span><span>、故意不让它读太多上下文免得分心，还有一路会去</span><span style="font-weight:bold">看 git blame / history</span><span>、结合这个文件以前改动的上下文来判断。几路的结论汇总起来，比单打独斗全面。（官方那个 code-review plugin 就是 4 路并行，我这个思路是参考它的。）</span></p>

<p id="f-doxcnPApi8pKVOvftQULNIj4xYe"><span style="font-weight:bold">第二是置信度打分 + 阈值过滤</span><span>，这个就是我刚说的治理误报的核心——每个问题打 0 到 100 分，</span><span style="font-weight:bold">只有 80 分以上才发</span><span>，把噪音死死摁住。</span></p>

<p id="f-doxcnmnqqLElVHgKRmBsWwTEqyc"><span style="font-weight:bold">第三是分级用模型来控成本。</span><span> 我拆成多 agent 并行有个好处——每个子 agent 是</span><span style="font-weight:bold">独立的上下文窗口</span><span>，各自去读代码、各自汇总，最后只把结论回传，所以并不会把主对话的上下文撑爆，这点上下文隔离其实是多 agent 的优势。它真正的代价是</span><span style="font-weight:bold">钱</span><span>：几路并行如果都用最贵的模型，token 成本是成倍涨的。所以我按难易把活分级——像判断这个 PR 该不该 review、给问题打分、写摘要这些简单活，都交给便宜快的小模型（Haiku 那档），只有真正需要理解代码的并行审查环节才上强模型（Sonnet 那档）。这样又快又省。</span></p>

<p id="f-doxcnSOuUfrHJKQjYmbF6maXnMe"><span>输出上我也做了规范：评论简洁、不带 emoji、每条问题都</span><span style="font-weight:bold">带上精确到行的代码永久链接</span><span>，方便人一键跳过去看。</span></p>

<p id="f-doxcn9YgoRqFyR9jPx4yi65U8hh">效果可以通过使用与不使用 Skill 的对照实验分析，记录人工介入次数、误报与 Token 消耗，并检查其作为人工 Review 前置过滤的适用性。</p>

<p id="f-doxcnjlqhk0Di8NHFKE0PDti2ib"><span style="font-weight:bold">Q3：SKILL 是什么，可以谈谈你的理解吗？</span></p>

<p id="f-doxcnXOBdCYRF4LEKRwm8vZAhH9"><span style="font-weight:bold">【思路】</span><span> 这题是概念题，考的是你对 skill 本质的理解，不用堆最佳实践。核心讲三层：</span><span style="font-weight:bold">是什么（定位）→ 长什么样（结构：呼应实践 3 渐进式披露）→ 和提示词的区别（价值）</span><span>。落点回到"把团队流程沉淀成可复用、自动触发、可迭代的模块"。</span></p>

<p id="f-doxcneytnYKHSkqyPEQGxJoB1bg"><span style="font-weight:bold">【口语化答案】</span></p>

<p id="f-doxcnEyXmX1cSCfTi1oKcBnp8Sh"><span>我理解 </span><span style="font-weight:bold">skill 本质上是一个"能被模型自动发现、按需加载"的能力包</span><span>——把某一类任务的做法、规范、脚本打包成一个文件夹，模型在合适的时候会自己判断该不该用它，然后把里面的指令加载进来照着做。</span></p>

<p id="f-doxcn0suRIyjO4OqFkhcIlGGWIc"><span>它最小就是一个带 </span><span><span><span>SKILL.md</span></span></span><span> 的文件夹。</span><span><span><span>SKILL.md</span></span></span><span> 顶部有一段 </span><span><span><span>description</span></span></span><span>，写清楚"这个 skill 干嘛的、什么时候该用"，模型平时只看这段元信息、几乎不占上下文，只有真被触发了才会去读正文和它引用的参考文件、脚本。这套"</span><span style="font-weight:bold">平时只暴露一句话、用到才展开</span><span>"的机制就是</span><span style="font-weight:bold">渐进式披露</span><span>，它解决的正是"知识多但上下文有限"的矛盾——让你能把大量规范塞进 skill，又不会一上来就把模型的上下文撑爆、把关键指令稀释掉。</span></p>

<p id="f-doxcnfySc5IJYZHQ4y5xURdoETg"><span>它和"写一段长提示词"最大的区别是：提示词一次性、每次都得重敲、也不会自己触发；skill 是</span><span style="font-weight:bold">沉淀下来、可复用、能自动触发、还能持续迭代</span><span>的。所以可以把它概括成一句话——</span><span style="font-weight:bold">skill 不是"更长的提示词"，而是把一套流程和领域知识固化成一个模型能自主调用的模块。</span></p>

<p id="f-doxcnR51yIN6mzBf1YYI8D9hR3e"><span style="font-weight:bold">Q4：怎么样能写好一个 SKILL 呢？</span></p>

<p id="f-doxcn6OyYpzY9J3BwX31ITzHjDm"><span style="font-weight:bold">【思路】</span><span> 这题是方法论综述，正好把 7 个最佳实践当"checklist"串一遍，但</span><span style="font-weight:bold">不逐条念</span><span>，而是按"写 skill 的自然顺序"归成几步讲：</span><span style="font-weight:bold">触发（实践 2）→ 结构组织（实践 3、4）→ 输出质量/自由度（实践 1）→ 验证迭代（实践 5）→ 成本与退休（实践 6、7）</span><span>。</span></p>

<p id="f-doxcnh3e51GgC77GDoCNyQArc3b"><span style="font-weight:bold">【口语化答案】</span></p>

<p id="f-doxcnC0sgYZ72V53kVNK9NhL50J">编写 Skill 可以按以下步骤进行。</p>

<p id="f-doxcnYkgSnI7kulqQmxfkfof4Bh"><span style="font-weight:bold">第一步，先把 </span><span style="font-weight:bold"><span><span>description</span></span></span><span style="font-weight:bold"> 写好，保证它该触发的时候能触发。</span><span> 这是最容易被忽略、但最致命的一环——skill 写得再好，触发不了就等于零。可以用第三人称，把"</span><span style="font-weight:bold">这个 skill 做什么 + 什么场景下用</span><span>"写清楚，还会特意把</span><span style="font-weight:bold">用户真实会说的关键词</span><span>塞进去。如果一个 skill 老是乱触发，我就干脆把它设成只能手动调。</span></p>

<p id="f-doxcn1e4fVryy2S7oncCeU5dATc"><span style="font-weight:bold">第二步，组织好文件结构，别把正文写成一坨。</span><span> 可以把大块的、不常变的知识——比如团队规范——</span><span style="font-weight:bold">外置成单独的参考文件，按需加载</span><span>，</span><span><span><span>SKILL.md</span></span></span><span> 正文只留流程骨架，控制在几百行以内。而且引用</span><span style="font-weight:bold">只保持一层深</span><span>，所有参考文件都从 </span><span><span><span>SKILL.md</span></span></span><span> 直接链过去、不套娃；超过一百行的文件我还会在顶部加个目录，免得模型只"预览"开头就走、读不全。</span></p>

<p id="f-doxcnxNR5qlv1gviml0LFjTXlbb"><span style="font-weight:bold">第三步，控制好模型的自由度、管住输出质量。</span><span> 像 code-review 这种高自由度任务，模型特别爱放飞，我会主动收窄——比如给结论打置信度分、设阈值过滤，再列一份"什么不该做"的清单让它自我排除。</span></p>

<p id="f-doxcnxNOQVj9HeMl1DviURCt5Kg"><span style="font-weight:bold">第四步，也是可以认为最关键的，是测试先行、迭代打磨。</span><span> 我不会凭感觉说 skill 好不好，而是先固化一组真实任务当测试集和 baseline，每改一版都用</span><span style="font-weight:bold">全新会话</span><span>重新跑、跟 baseline 比，直到指标稳定。</span></p>

<p id="f-doxcnhJQtgEEtud43AcQsRBZ2qh"><span style="font-weight:bold">最后，还要考虑成本和生命周期。</span><span> 该用便宜小模型的环节就别上贵的；同时想清楚这个 skill 是"补模型能力的"还是"编码团队偏好的"——前者随模型变强可能会过时，得靠测试定期判断要不要退休。</span></p>

<p id="f-doxcnzn6kUHukUsIGfwLEa12Stc"><span>一句话总结：</span><span style="font-weight:bold">触发要准、结构要清、输出要收得住、效果要能量化、成本和时效要顾到</span><span>，这几条都做到，skill 基本就写好了。</span></p>

<p id="f-doxcnjp3vwQAuhIweqNLyYGyInh"><span style="font-weight:bold">Q5：怎么提升 SKILL 的任务准确率呢？</span></p>

<p id="f-doxcnxpdVj4MF6qThUwIFpvG3Hg"><span style="font-weight:bold">【思路】</span><span> "准确率"要拆成两层：</span><span style="font-weight:bold">触发准（实践 2）+ 触发之后做得对（实践 1 收误报、实践 3+4 让规范被完整读到、实践 5 用 eval 量化）</span><span>。落点强调</span><span style="font-weight:bold">准确率是测出来的、不是写出来的</span><span>。</span></p>

<p id="f-doxcnRJBZAiMsIOI60BtyfpuJdf"><span style="font-weight:bold">【口语化答案】</span></p>

<p id="f-doxcnvk9ybDoKcaEg4mhVf9xCVb"><span>可以把"准确率"拆成两件事：</span><span style="font-weight:bold">一是该不该触发它触发对没有，二是触发之后做得对不对。</span></p>

<p id="f-doxcnZhw6OIN7QQJlspfGfhkyJd"><span style="font-weight:bold">先说触发准。</span><span> 很多"不准"其实是 </span><span><span><span>description</span></span></span><span> 没写好——该来的没来、不该来的乱来。我的做法就是把 what + when 写清楚、把用户真实会说的关键词塞进去；容易误触的就改成手动调。</span></p>

<p id="f-doxcnNNZ1HtqzZn6TgvbseJh2mf"><span style="font-weight:bold">再说做得对。</span><span> 这里我有三招。</span><span style="font-weight:bold">第一，收窄自由度、压误报</span><span>：高自由度任务模型容易乱发挥，本案例用置信度打分加阈值过滤，再列一份"不该做"的清单，把噪音摁下去，准确率立马上一个台阶。</span><span style="font-weight:bold">第二，保证它真的把规范读全了</span><span>——我踩过一个坑，模型用 </span><span><span><span>head -100</span></span></span><span> 只预览了参考文件开头，规范后半段根本没看到，结果漏检。解法是引用拍平只留一层、长文件顶部加目录，让它能读到全貌。</span><span style="font-weight:bold">第三，也是根本的一招，是用 eval 把准确率量化出来</span><span>：固化一组真实任务当基准，每改一版都用全新会话重跑、对照 baseline 看是涨了还是跌了。</span></p>

<p id="f-doxcnka3ANl7RQILWLciJajyf7g"><span>所以我的核心观点是——</span><span style="font-weight:bold">准确率不是"写"出来的，是"测"出来的。</span><span> 你得有一套可复现的评测集当真理来源，才知道每次改动到底让它更准还是更差，否则全是凭感觉。</span></p>

<p id="f-doxcn69hhIOIS5nh64M5Ipbzonh"><span style="font-weight:bold">Q6：SKILL.md 随着业务变大越写越长，导致 AI 不听某些指令，要怎么解决？</span></p>

<p id="f-doxcnJRSwZ4GMsO3mC5oSZjAI2e"><span style="font-weight:bold">【思路】</span><span> 这题问的是"正文膨胀 → 指令被稀释/漏读"，从三个方向答：</span><span style="font-weight:bold">① 和模型能力做适配、做减法（实践 7）——模型越来越强，很多话不必再说，简化提示词；② 渐进式披露（实践 3）——把长内容外置成按需加载的参考文件，正文只留骨架；③ 引用组织（实践 4）——引用只保持一层深、长文件加目录，保证外置的内容能被完整读到。</span><span> 核心是：</span><span style="font-weight:bold">正文越短、指令越不容易被淹没。</span></p>

<p id="f-doxcnze3xzvvXAhiHS8a0IfkwHg"><span style="font-weight:bold">【口语化答案】</span></p>

<p id="f-doxcnMDg2jVQ044l0lYuWiCe0Sh"><span>这个问题我很有体会——</span><span><span><span>SKILL.md</span></span></span><span> 一长，模型就开始"挑着听"，越靠后、越啰嗦的指令越容易被它忽略。可以从三个方向去治。</span></p>

<p id="f-doxcnRwupkAAgK91wAUnQkkGhkN"><span style="font-weight:bold">第一，做减法，跟模型当前的能力做适配。</span><span> 很多话其实是"防御式"写的，是当年模型比较弱才需要反复叮嘱的。</span><span style="font-weight:bold">模型一代代变强之后，很多话根本不用再说了</span><span>——一些它现在默认就能做对的事，我就大胆删掉。我会定期拿最新模型跑一遍测试，把那些"不写它也照样做对"的指令精简掉，让正文只留真正还需要强调的部分。</span><span style="font-weight:bold">正文越短，剩下的关键指令就越不容易被淹没。</span></p>

<p id="f-doxcn5yKLmjBE8erUaCvDtO0eYb"><span style="font-weight:bold">第二，用渐进式披露，把长内容从正文里搬出去。</span><span> 业务变大，真正膨胀的往往是那些规范、清单、细则。我不会把它们堆在 </span><span><span><span>SKILL.md</span></span></span><span> 正文里，而是</span><span style="font-weight:bold">外置成单独的参考文件、按需加载</span><span>，正文只留"什么时候去读哪份文件、怎么逐条核对"的流程骨架。这样正文能稳定控制在几百行以内，不管业务怎么长，主指令始终清爽。</span></p>

<p id="f-doxcnSr60E6INeSw6M247iVUACg"><span style="font-weight:bold">第三，把外置文件的引用组织好，保证它们真能被读全。</span><span> 光搬出去还不够——我踩过坑，参考文件套太多层、或者太长，模型就只 </span><span><span><span>head</span></span></span><span> 预览开头、读不全，等于白搬。所以</span><span style="font-weight:bold">引用只保持一层深</span><span>，所有参考文件都从 </span><span><span><span>SKILL.md</span></span></span><span> 直接链；</span><span style="font-weight:bold">超过一百行的文件顶部加个目录</span><span>，让模型知道后面还有内容、该往下读。</span></p>

<p id="f-doxcnYXEedIIVXQ7Qi3wsdEov9e"><span>总结一下就是：</span><span style="font-weight:bold">正文做减法（跟着模型能力精简）、长内容做外置（渐进式披露）、引用做拍平（保证读全）</span><span>——三招下来，业务再大，</span><span><span><span>SKILL.md</span></span></span><span> 也不会因为越写越长而让指令失灵。</span></p>

<a id="f-doxcnIKkAYwveOREQFYhV0RMlRd"></a>

##### code review skill实战

<p id="f-doxcn0D5YKoCfLEeHI6apLxVNyh"><span>顺便总结一波Anthropic code review skill的核心思路，其实上面都已经融合了这些思想。我们干脆顺便学一下这个实战例子。</span></p>

<p id="f-doxcnaDGA86vhvLTClzuJf3DxKf"><span>上面整节的例子（尤其是误报治理、多视角并行、置信度打分）大量参考了 </span><span style="font-weight:bold">Anthropic 官方 code-review plugin</span><span>（</span><span><span><span>claude-plugins-official</span></span></span><span>）。这里把它的整体思路和阶段单独讲清楚，作为这个例子的「原型出处」，答 Q2 时也可以顺带点一句「我这套思路是参考官方 plugin 的」。</span></p>

<p id="f-doxcnjxlfD7PNocLIrsEmvhBN6f"><span style="font-weight:bold">整体思路</span><span>：不是让一个 agent 从头审到尾，而是</span><span style="font-weight:bold">多个 agent 并行、各审一个视角</span><span>，最后统一</span><span style="font-weight:bold">用置信度打分把噪音过滤掉</span><span>，只把高价值问题发成 PR 评论。</span></p>

<p id="f-doxcntfUuX0WWbXyeMbdR5RbuSf"><span style="font-weight:bold">7 个阶段（官方 README 明确写了）</span><span>：</span></p>

<ol start="1"><li id="f-doxcn5JzAC2NUrkIlRbLRvUOeHd"><span style="font-weight:bold">判断是否需要 review</span><span> —— 跳过 closed / draft / trivial / 已 review 过的 PR</span></li></ol>

<ol start="2"><li id="f-doxcnXHucU93TkGhkl1BvEMCtSe"><span style="font-weight:bold">收集规范</span><span> —— 找出仓库里相关的 </span><span><span><span>CLAUDE.md</span></span></span><span> 团队规范文件</span></li></ol>

<ol start="3"><li id="f-doxcnwLHgfHOcE9Ewglvo57N3Wd"><span style="font-weight:bold">概述变更</span><span> —— 先把这个 PR 改了什么讲清楚</span></li></ol>

<ol start="4"><li id="f-doxcnl5MBQQA4nc6ng2cO2HgBGd"><span style="font-weight:bold">启动 4 个并行 agent</span><span>：</span></li></ol>

<div id="f-doxcnfz88u3rafNAWX4XQ6fCZSg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">#1 &amp; #2</span><span>：查 </span><span><span><span>CLAUDE.md</span></span></span><span> 规范合规性</span></div></div>

<div id="f-doxcn1WJdrGCfM287swaoN3bse0" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">#3</span><span>：只看 diff 本身，抓明显 bug（故意不给太多上下文，免得分心）</span></div></div>

<div id="f-doxcnFdyzNsTD5jQfeAz3eKtoLh" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">#4</span><span>：看 git blame / history，结合历史上下文判断</span></div></div>

<ol start="5"><li id="f-doxcnDxGJvqkx8lmlpZHrMMmDuh"><span style="font-weight:bold">置信度打分</span><span> —— 每个问题打 0–100 分</span></li></ol>

<ol start="6"><li id="f-doxcnOyWLqZuiiDKSJT2KRKYSZc"><span style="font-weight:bold">阈值过滤</span><span> —— 丢掉 &lt;80 分的</span></li></ol>

<ol start="7"><li id="f-doxcnpvuffmtvdMSjSeUU117xhf"><span style="font-weight:bold">只发 ≥80 分</span><span> —— 高置信问题才发成 review 评论</span></li></ol>

<p id="f-doxcn8mylH0IV1VRYx6aYBPL6Ph"><span style="font-weight:bold">置信度 rubric（原文）</span><span>：0 = false positive；25 = 可能真；50 = 真但次要；75 = 高置信且重要；100 = 绝对确定。</span></p>

<p id="f-doxcnTLlSxPwNJ01QWhCdLQEeTc"><span style="font-weight:bold">官方参考链接</span><span>：</span></p>

<ul><li id="f-doxcnnVMLexWftHyYwYg1xKYpud"><span>code-review plugin 说明 README：</span><span><span><a href="https://github.com/anthropics/claude-plugins-official/blob/main/plugins/code-review/README.md"><span>https://github.com/anthropics/claude-plugins-official/blob/main/plugins/code-review/README.md</span></a></span></span></li></ul>

<ul><li id="f-doxcnPrSRw2xZtKX2Ih1OlB2Frd"><span>code-review 命令源码：</span><span><span><a href="https://github.com/anthropics/claude-plugins-official/blob/main/plugins/code-review/commands/code-review.md"><span>https://github.com/anthropics/claude-plugins-official/blob/main/plugins/code-review/commands/code-review.md</span></a></span></span></li></ul>


<a id="section-0121"></a>
## Harness Engineering

<a id="f-doxcntsmmtzQiqA3fIWuaciBtyh"></a>

<div style="margin-left:25px"><p id="f-doxcnXsbPMiWlszDvmtsBe7MNsd">Harness 的一种定义是 Agent - Model = Harness，其范围包括工具使用、模型记忆配置、测试与 Agent 架构选择。学习建议：先通过 2.1、2.2、2.3 理解定义与思想；再学习 2.4 的实战、使用方法和实验；最后通过 2.5、2.6 的项目分析进一步理解设计。参考书籍包括《Claude Code 实战：Harness 工程之道》。Harness 的学习需要结合 AI 使用和项目构建，持续实践。</p><p id="f-doxcnBr90N5i2weVlwEebpZF2ce"><span style="font-weight:bold">学习建议：</span></p><div id="f-doxcnM2wXeNQZtbbR1a2QspNLIe" style="display:flex;gap:0.5em"><span style="min-width:1.5em">a.</span><div><span style="font-weight:bold">理解Harness:</span><span> 2.1 2.2. 2.3 总结Harness的定义。其实Harness的视频很多，大多都是讲解它是什么，发展历程，思想是啥，所以找一个看就够了。我给大家推荐了一个中文参考视频，建议看一下视频，因为这里写得不详细。不过这类视频只用挑一个看，理解概念和思想。</span></div></div><div id="f-doxcnFDx1JgsglaunX9doZoyxNc" style="display:flex;gap:0.5em"><span style="min-width:1.5em">b.</span><div><span style="font-weight:bold">Harness的具体实战：</span><span>2.4 小节，我写得很详细。是我看了一个特别好的Harness视频来总结的。他和别的视频不同，是因为他足够具体，给出了具体的Harness的使用思路，而且该博主做了大量实验，引用了大量论文，有理有据。这个视频特别好，对面试，做Agent项目，使用AI都有帮助。我详细解析了这个视频，总结到了文档里，并结合了大量面试题讲解，所以看了这个小节你绝对非常有收获。</span></div></div><div id="f-doxcnmAI7cGTXSkUZng4hVOa3bd" style="display:flex;gap:0.5em"><span style="min-width:1.5em">c.</span><div><span style="font-weight:bold">Harness具体项目：</span><span>2.5，2.6. 大致解析了一些Harness项目。这个里面内容就很多了，大家愿意深入学习的可以去看这些项目。我记得最近有一本书，《</span><span style="font-style:italic">Claude Code</span><span> 实战:</span><span style="font-style:italic">Harness</span><span>工程</span><span style="font-style:italic">之道</span><span>》。 你可以看出来Harness概念很大，它是一种思想，整个Claudecode的设计，都可以叫做Harness。所以Harness更多的学习，还是体现在我们使用AI，构建项目中，不断去体会。这个深入体会就靠大家自己了。</span></div></div></div>

<p id="f-doxcn8920g1sHJ5Y8mH9LSj47Uf"><span>总而言之，其实按照路线a,b学完Harness。 应对Harness的面试问题，应该就没什么问题了。</span></p>


<a id="section-0122"></a>
## 概念定义

<a id="f-doxcnAoMUT1gUhHQcwnqZwhhgfh"></a>

<div style="margin-left:25px"><p id="f-doxcnKnG4coTYWgvpJHnpdSxkTc"><span style="font-weight:bold">一句话定义</span></p><p id="f-doxcnoFIjtWLSZKgXEvVqs5SRDe"><span>Harness Engineering 是围绕 AI 模型构建"运行环境与管控基础设施"的工程实践，目的是让 AI Agent 在长时、复杂、多步骤的真实任务中稳定、可靠、高效地运行。</span></p><p id="f-doxcnN0wjDKuNeLBGCSWkpp7Amd"><span style="font-weight:bold">核心思想：从"马具"理解 Harness</span></p><p id="f-doxcncR1iNY1fLSDGfyu3KQ66yd"><span>Harness 这个词的本意其实是马具——套在马身上用来控制马的那些装备，比如缰绳、头套等。马本身非常强大，但人类必须借助马具的力量才能驾驭它、让它为我所用。</span></p><p id="f-doxcn9x4ix50eaNtHU1MveQMjkb"><span>把这个类比迁移到 AI 领域：</span></p><div id="f-doxcnf46vG4WEx4V78qfG7KNgSe" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>大模型 = 一匹脱缰的马：能力极强，但如果任由它自己跑，就会发散思维、产生幻觉，无法稳定给出我们想要的结果。</span></div></div><div id="f-doxcnBfEB3j6qvEgP9cRHIqFu9b" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>Harness = 那套马具：用来控制和驾驭大模型的系统。</span></div></div><p id="f-doxcnrBpcPce3Ibpgia61tLcsEb"><span>由此我们可以推导出 Harness 的一个常见公式：</span></p><p id="f-doxcnx0Z6QiYU9GpTTEUExjWZ8f"><span>Harness=Agent−Model </span></p><p id="f-doxcnkaDqQnLYU17Gho354u5xo4"><span>换句话说，一个完整的 Agent 减去里面的大模型，剩下的所有东西都是 Harness。需要注意，Harness Engineering 是非常新的概念，业界尚未形成严格定义，这个公式是目前比较被认可的一种说法，并非学术定义。</span></p><p id="f-doxcnHW4AgeAKi8GqxsC1Sg2Qpb"><span>举个具体例子：在 Claude Code 里面，所有不属于 Claude 模型的部分都是 Harness——比如写在 </span><span><span><span>CLAUDE.md</span></span></span><span> 里那些大模型要遵循的规则、Claude Code 可以使用的工具列表、它的定时调度机制等等。</span></p></div>


<a id="section-0123"></a>
## 演进脉络

<a id="f-doxcno6czx6ZyxAS831lSHCjzmc"></a>

<div style="margin-left:25px"><div id="f-doxcnzfshG8hN8A6wzi6qoqAKjd"><img alt="" decoding="async" height="315" loading="lazy" src="/images/agent-learning/c2d4a7acd280d1b318d9b870.png" width="1177"/></div><p id="f-doxcnYT7jDru3ZDdqHvBO7PtN8e"><span>三者是叠加关系：Harness 内部的每个 session 仍然需要 Context Engineering，每次发给模型的 prompt 仍然需要 Prompt Engineering。</span></p><h3 id="f-doxcn3izPCEb0O5QK5ipNhek5cf"></h3></div>


<a id="section-0124"></a>
## Harness 工程实践要点

<a id="f-doxcn9rlzbHFvWBVeaqpjOZX1Sb"></a>

<ul><li id="f-doxcnE5048Nahp1cxj6gyN8hYGL"><span>外部持久记忆——用文件系统（JSON、Markdown、git log）代替模型内部记忆，解决"失忆"问题。</span></li></ul>

<ul><li id="f-doxcnhwkKwQPdJjqa4ZoZglgRZX"><span>确定性验证轨道——Linter、类型检查、单元测试等刚性门禁，AI 的输出必须通过测试才能被接受（对应解决"幻觉完成"——不让模型自己说"我做完了"）。</span></li></ul>

<ul><li id="f-doxcnlLCBBbAY6ncE7sKEgGIjwg"><span>原子任务 + 上下文刷新——每个 Agent 只做一个小任务就销毁，新 Agent 从干净状态启动，彻底杜绝 Context Rot。</span></li></ul>

<ul><li id="f-doxcnbSUFYBRUWL8xobhjq1RoQl"><span>子 Agent 集群（Swarm）——用大量便宜快速的小模型并行工作，而非一个大模型顺序处理。</span></li></ul>

<ul><li id="f-doxcnHxiViDorRcOjl7yh2CFglj"><span>技能文件（Skills）——按需加载的专用指南，Agent 只看到与当前任务相关的工具和说明（建议不超过 30 个工具）。</span></li></ul>

<ul><li id="f-doxcnUJUWI6LSjJWVVsHelCl2vc"><span>Guard Rails + Checkpoints——在关键节点自动运行检查，防止 Agent 偏离轨道。</span></li></ul>

<ul><li id="f-doxcnyGvpR8LM3V2kwQq8BIAjb8"><span>Handoffs——session 之间通过进度文件、git commit 等传递状态，实现跨 session 连续性。</span></li></ul>

<ul><li id="f-doxcnYoafs2TPYyOZ2e0aaggJad"><span>Human-in-the-loop——在关键阶段设置人工审核断点，弥补 AI 自验证的不足。</span></li></ul>

<ul><li id="f-doxcndLd3zxUbTpJGlTUAH4BUnc"><span>架构约束——通过 ArchUnit 等框架强制要求 Agent 生成的代码遵循特定模式。</span></li></ul>

<ul><li id="f-doxcn5SyjCn4y6WX0KVAj4SRRoh"><span>垃圾回收 Agent——定期扫描修复代码库和文档中的不一致性，对抗系统熵增。</span></li></ul>

<p id="f-doxcntwJ6y25OE5dgqUK8gCzgBo"><span style="font-weight:bold">    关键工程原则</span></p>

<div style="margin-left:25px"><div id="f-doxcndeynMUXDA3vkGOK6uwGiHb" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">轻量化，为删除而建</span><span>：不要过度编码人类知识，模块要能快速移除替换（Manus 6个月5次重构、Vercel 删80%手工工具反而更好）</span></div></div><div id="f-doxcnwmTTmnl0u6jSdV7cixt8uT" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">模型无关性</span><span>：Harness 不绑定特定模型，新模型出来能快速替换</span></div></div><div id="f-doxcnkpVMPHdhgkmPTn6N61bzKc" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">将 Harness 视为数据集</span><span>：每次 Agent 失败、漂移、异常都是珍贵的训练素材，用于迭代优化</span></div></div></div>

<a id="f-doxcnhkkJVNVQPTBoUnUrKXp2Wd"></a>

##### 参考资料

<p id="f-doxcn5CEqJJqo9xJCw7MvkRPTdh">关于 Harness 概念，可以结合 2.1、2.2、2.3 的知识点与下面的参考视频学习。</p>

<div id="f-doxcnOJjkiZwqAzbPRJn91sQcIb"><div><div><div><div><div><div><div><div><div><a href="https://open.douyin.com/player/video?vid=7636365606182325544&amp;mode=pc">嵌入视频 / 原始播放器</a></div></div></div></div></div></div></div></div></div></div>


<a id="section-0125"></a>
## Harness 思想的运用

<a id="f-doxcnPDrsexDsakv0ugeVxFy1ec"></a>

<p id="f-doxcn5We7Z9wELuOx5RK8Mihtzg">参考视频：Raj 的 Engineering Coding Harnesses Deep Dive，结合实验与论文说明 Harness 在日常工作中的应用及相关实践。</p>

<p id="f-doxcnDDeVoe39cnZZflKq1Y5Uef"><span>这一节从四个方面： </span><span style="font-weight:bold">Retrieval / Context &amp; Memory / Loops &amp; Tools / Orchestration</span><span> 来讲解了Harness工程在我们使用AI，或者说构造AIAgent应用过程中的具体做法。这里面每一个部分，给出的建议都特别具体。这一小节，结合了大量面试问题讲解，消化好这一部分对于面试非常有帮助。</span></p>

<a id="f-doxcnoRvBt3HPRP4L6PsFmOBoaf"></a>

##### Retrieval（检索）

<a id="f-doxcn42p8krJyH14oqO0EwoxUjg"></a>

###### 背景 / 基础知识

<p id="f-doxcnSR9Qwkf5ULidX9Zv22Y3zg"><span>我们需要根据自己的任务场景，来提供给 AI 检索的工具。虽然 Claude Code 里其实内置了 Grep 工具，但 Claude Code 是通用的，而我们的任务是定制的。这是一个实用的建议——不管你是使用 AI 还是构建 AI，都可以想一下：什么样的检索工具对我的场景是合适的？</span></p>

<p id="f-doxcn6G7ucfRJKaAAnQBopmJgvf"><span>举个例子：如果你的项目是一个超大型项目（比如 100GB 代码库），直接让 Claude Code 用 grep 线性扫盘会很慢；这时候你可能要给它建立一个 BM25 倒排索引，再以 Skill 的形式装上去让 CC 调用这个搜索工具。</span></p>

<p id="f-doxcnQNgLSzGQd1sN2ybYBzkppg"><span>检索工具从"词法"到"语义"是一条谱系，不是非此即彼：</span></p>

<div id="f-doxcnn7PpTzkIbaA8AXL4dnmdzh"><img alt="" decoding="async" height="736" loading="lazy" src="/images/agent-learning/19619ee895e3fea6b98741b0.png" width="1204"/></div>

<p id="f-doxcn2kKlQQ7jp4NXB3cuLK7qnh"><span>视频里 Raj 跑的实验是"</span><span style="font-weight:bold">Agentic + 纯 BM25</span><span>"反超了"</span><span style="font-weight:bold">One-shot + embedding 切块</span><span>"，但这是"embedding 从必选变可选"，不是"BM25 取代 embedding"。</span></p>

<blockquote id="f-doxcnOGwboKT9h6P6YL9zWiNHUb"><p id="f-doxcnQf8CfkZ7em7WOGfVc7IkNc"><span>注：表中 "&gt;5GB / &gt;10w" 等具体阈值是工程经验值，源视频只笼统说 "as you get more and more files"。下方"最佳实践建议"沿用同一组阈值。</span></p></blockquote>

<a id="f-doxcn41lp9mbavsHRp2UXJk1gTU"></a>

###### 最佳实践建议

<p id="f-doxcnV7yZ54vWKUGJxi0uNlQ1lc"><span>- </span><span style="font-weight:bold">默认 grep 起手</span><span>：90% 的代码搜索靠 grep 就够，不要一上来就上向量库。</span></p>

<p id="f-doxcniHeEc6O4LTkPM6yiEAO0sc"><span>- </span><span style="font-weight:bold">代码库 &gt; 5GB 或文件数 &gt; 10w，加 BM25</span><span>：典型做法是包一个 SKILL（封装 `ripgrep --index` 或开源 BM25 库），让模型像调工具一样用。</span></p>

<p id="f-doxcnwKN45SC2HEgYwg0BunSrUe"><span>- </span><span style="font-weight:bold">跨语言/跨同义词的查找才用 embedding</span><span>：比如查"用户鉴权相关代码"，关键词散在 `auth/login/session/jwt`——这种 case 上 semantic search。日常代码定位别用。</span></p>

<p id="f-doxcn4AihEzn7dBaMHl3vCK5Pob"><span>- </span><span style="font-weight:bold">配好模型（Opus/GPT-5 级别）就上 Agentic RAG</span><span>：让模型自己重写 query、按文件级别迭代，比预先 chunk 切片更准；前提是你愿意多花 2–5x token。底层用 BM25 / embedding / 混合都可以。</span></p>

<p id="f-doxcnEvWVHVRt4ZUXt7iyMBNuVd"><span>- </span><span style="font-weight:bold">文件级 &gt; chunk 级</span><span>：能不切块就不切块，整文件交给模型，避免上下文撕裂。</span></p>

<p id="f-doxcnuXrV5z6eK1DWTflfZaeLPb"><span>- </span><span style="font-weight:bold">什么时候迁数据库</span><span>：当你需要"按 author 过滤 + 按 commit 时间排序 + 按路径匹配"这种 </span><span style="font-weight:bold">metadata join</span><span> 时，才考虑结构化索引/数据库；纯文本搜索别上 DB。</span></p>

<a id="f-doxcnR64cAdKTvLTQivYFiTNkSb"></a>

###### 面试问题

<p id="f-doxcnYIMDMTAA2LyBQSoGJy6Ivb"><span style="font-weight:bold">Q1：Harness 工程对你的工程实践、使用模型有什么启发？</span></p>

<p id="f-doxcnF9HJu2rrlqnVTFKw4S0b0c"><span>最大的启发是：</span><span style="font-weight:bold">不要把通用 AI 工具当万能工具，而要根据业务场景给它配检索工具</span><span>。Claude Code 内置的 grep 在通用场景下够用，但任何严肃业务都是定制的——代码库可能有 100GB，文档可能跨多个仓库，查询可能带 metadata 过滤。这时通用工具会很慢甚至搜不到。</span></p>

<p id="f-doxcnMfgLiDwEy1QAwQ0Hqnhdpf"><span>落到具体做法是三步：1) 先看任务量级和查询形态——文件多大、查询是纯文本还是带字段过滤；2) 按谱系选工具——grep / BM25 / embedding / 结构化 DB，能用轻的就不上重的；3) 用 Skill 把这个定制工具封装好让 agent 调用。这其实是 harness 工程的核心——agent 的能力上限不只取决于模型，更取决于你给它配的工具链。</span></p>

<p id="f-doxcnGRiCUPCo1nE6BMT2gIkD7b"><span style="font-weight:bold">Q2：如何看待 RAG 的发展趋势？会不会被取代？</span></p>

<p id="f-doxcn4yt4RGNdx8Mqr1hHRWK5Yb"><span>我的判断是</span><span style="font-weight:bold">至少目前没有被取代，但它在 stack 里的位置变了</span><span>。</span></p>

<p id="f-doxcnjFKMy3CDWG4tJCysWLPPnd"><span>首先，现在的趋势确实不再是"什么场景都先上 RAG"：1) 一般中小项目，</span><span style="font-weight:bold">grep / BM25 + 模型自身能力</span><span>就能解决大部分检索问题，Claude Code 默认就是这套；2) 即使在高级场景，有实验表明 </span><span style="font-weight:bold">Agentic RAG（哪怕底层只用 BM25）也能反超传统切块 + embedding RAG</span><span>——这说明随着模型变强，"语义近似"这层不一定非要靠 embedding 来做，模型自己重写 query 就行。</span></p>

<p id="f-doxcnKRDEgZa2NKtCdVhfDoLMoe"><span>但这不等于 RAG 被取代：1) </span><span style="font-weight:bold">范式上</span><span>，Agentic RAG 本身就是 RAG，只是把"一次检索"换成"迭代检索"；2) </span><span style="font-weight:bold">工具上</span><span>，embedding 在跨语言、跨同义词、海量文档场景仍是性价比最高的选择；3) </span><span style="font-weight:bold">架构上</span><span>，企业级场景往往需要 metadata join，这又得叠结构化数据库 + RAG 的混合方案。</span></p>

<p id="f-doxcnt1JBYnmGMugTG7F3d625Ah"><span>所以更准确的说法是：RAG 没被取代，而是</span><span style="font-weight:bold">从"默认必选"降级成"按需启用的一档"</span><span>。判断要不要用，看三个条件：模型强度、文档规模、查询是否需要跨同义词或跨字段。</span></p>

<a id="f-doxcnvBHQJFoSABxBdgqNasWyWc"></a>

##### Context &amp; Memory（上下文与记忆）

<a id="f-doxcnwZuGJNCXlU5uyn2p8Gquz5"></a>

###### 背景

<p id="f-doxcnB0AFnibjxSolWS0sLW6fsY"><span>虽然主流模型号称 1M token 上下文，但实测</span><span style="font-weight:bold">填越多越退化</span><span>——通常超过一半就开始丢信息。所以"有 1M 窗口"≠"能用 1M 窗口"，真正能可靠使用的往往只有前 30–50%。这就引出一个问题：信息越来越多（长对话、错误日志、跨会话的项目知识），但能放进窗口的就这么多，</span><span style="font-weight:bold">该把什么放进来、什么放出去、什么留到下次</span><span>？</span></p>

<p id="f-doxcnoVXwqXu7HjaT1FiQRY4Wnd">可以将记忆拆分为三层：Active Context Window、Working State、Durable Memory。下面说明这三层各自负责什么。</p>

<blockquote id="f-doxcnifOes9VwZDVDao5lyIXWed"><p id="f-doxcnMQliPIl58WyYMtCelhPdph"><span>关于记忆的分类有很多说法（短期/长期、工作记忆/情景记忆等），笔记里讲开源架构（CC、OpenHands、Claude Code）时也各有各的叫法。本质都是一回事，只是切分粒度不同。本节更重要的还是使用这些记忆背后的最佳实践和蕴含的思想。</span></p></blockquote>

<a id="f-doxcn1q7rsHsCBIjs88Jj3Um1kc"></a>

###### 基础知识：三层记忆分别干什么

<p id="f-doxcngydA6emY5lRJ99MtcpL9Cm"><span style="font-weight:bold">Layer 1：Active Context Window（当前上下文）</span></p>

<p id="f-doxcng3ZURRkiwyhYe58jsTI6Rb"><span>就是这一轮 API 调用真正发给模型的那段 token。它的职责是</span><span style="font-weight:bold">管好"现在"</span><span>——决定这次推理时模型眼前能看到什么。因为窗口会退化，所以这一层的核心工作是"瘦身"：用 sliding window 只保留最近几轮、用 compaction 把老对话压成摘要、用 rewind 把走错的分支直接砍掉，避免错误内容继续占着窗口。</span></p>

<p id="f-doxcnplxJjQ4P3Np9CMjQG2iVqh"><span style="font-weight:bold">Layer 2：Working State（临时工作文件）</span></p>

<blockquote id="f-doxcnPgAAEtE19lB4jb9IfmD2pd"><p id="f-doxcnESZxFUmGX4eicatqKej3We"><span>和跨会话记忆相同的地方都是用外部文件存储。不同的地方在于这个是给当前对话用的，当前对话用完就丢。而长期记忆的文件是跨会话的。这里其实对我们做Agent有一个启示，就是不要什么东西都往上下文塞，我们可以把一些结果保存在磁盘，运行的时候动态查找。因为上下文很宝贵。</span></p></blockquote>

<p id="f-doxcnAQ5KsvsF1e3VkQGiIsqQbe"><span>任务进行中、但塞不进窗口的中间状态，落到</span><span style="font-weight:bold">文件系统</span><span>里。它的职责是</span><span style="font-weight:bold">管好"这次任务"</span><span>——给 agent 一个比 context window 大得多的"草稿纸"。最典型的就是 `plan.md` / `todo.md`：让 agent 边做边勾选，目标不会在长循环中走丢。再激进一点是 Recursive Language Models 范式：把所有历史都落盘，用 Python REPL 按需检索，相当于"无限上下文"。任务结束这层就可以扔掉。</span></p>

<p id="f-doxcnAIOMze4ZPw6a5qMp03VcIc"><span style="font-weight:bold">Layer 3：Durable Memory（跨会话长期记忆）</span></p>

<p id="f-doxcnyC1GDnxpcLJILMtXH0zKzd"><span style="font-weight:bold">跨会话</span><span>留下来的知识，下次开新会话还能用。它的职责是</span><span style="font-weight:bold">管好"这个项目/这个 agent"</span><span>——把经验沉淀下来不要每次重学。两种主流形态：</span></p>

<p id="f-doxcnbNJXU7mt5KHpjbsDzDoocc"><span>- </span><span style="font-weight:bold">AGENTS.md</span><span>：项目级事实（构建命令、目录约定、坑），主流 harness 都会自动注入 system prompt。</span></p>

<p id="f-doxcnYx0QRJA4MrSHZJar7RO1bd"><span>- </span><span style="font-weight:bold">Skills</span><span>：博主把SKILL定义成了新的一种Agent的持久记忆的表现形式。</span></p>

<p id="f-doxcnGhzrm3nCNxBrYeU2K7ZFEg"><span>三层是</span><span style="font-weight:bold">自下而上递进</span><span>的：窗口装不下 → 落到 working files；任务结束还想留 → 升级成 durable memory。</span></p>

<a id="f-doxcn5DJLiXNg1LPizYbilHIWrf"></a>

###### 最佳实践建议

<p id="f-doxcnIDEdJ5asGqq1triqIBYtWf"><span>按三层记忆分别给出操作建议，</span><span style="font-weight:bold">自下而上</span><span>对应"管现在 / 管这次任务 / 管这个项目"：</span></p>

<p id="f-doxcn7tRjrcLOgNLCFbNThkjvtb"><span style="font-weight:bold">Layer 1：Active Context Window —— 管好"现在"</span></p>

<p id="f-doxcnmzlkyuQRxOwijRIPhfGkUd"><span>- </span><span style="font-weight:bold">主动管理上下文</span><span>：</span></p>

<ol start="1"><li id="f-doxcnrti2MsOE1vAuDdRQzOS0zd"><span>主动压缩上下文，不要等满了再压缩，因为模型能力会随着窗口增大而退化。</span></li></ol>

<ol start="2"><li id="f-doxcnLAWP4mF1qwUGTmWpazblgf"><span>不要过于依赖模型的compaction, 因为很多compaction是黑盒，你不知道它发生了什么。另外主动压缩，指定它保留哪些信息，是好的工程实践（主动使用claude code的/compaction，后面加上参数，指定compaction的时候保留哪些信息。(关于这两个指令，不明白的也可以参考这两个文章：</span><span><span><a href="https://x-sir.blog.csdn.net/article/details/159156069"><span>Claudecode compaction指令</span></a></span></span><span>，</span><span><span><a href="https://www.zhihu.com/question/2001668790279245831"><span>rewind指令</span></a></span></span><span> )</span></li></ol>

<div id="f-doxcnM6ZfQHtDYXFzKEEnHoJSig"><img alt="" decoding="async" height="110" loading="lazy" src="/images/agent-learning/94469714a3b161c5ae2fd4f0.png" width="720"/></div>

<pre id="f-doxcnfnSW1Fqyr0oLoSPaQ5emVe"><code>/compact 保留所有架构决策和待办事项。</code></pre>

<ol start="3"><li id="f-doxcnuPhXj3yBGZhxNM67tXQujc"><span>只保留关键的信息在上下文，避免挤爆上下文。比如长 stack trace、20000 行日志先在 Agent 层截断/抽取关键帧再喂回去。使用Claudecode的rewind功能，直接把走错的分支砍掉，不要让错误信息继续占着窗口。</span></li></ol>

<blockquote id="f-doxcn3kGNDd7102wEIstFHuiJUR"><p id="f-doxcnVECGyNtnRESpjUHLvPSWU3"><span>这些原则其实对我们实践也好，做Agent应用也好都有帮助。包括面试官问你使用CC有什么心得？你觉得ClaudeCode比其他coding工具好用在哪里，都是我们面试的素材，我们后面会展示。</span></p></blockquote>

<p id="f-doxcnZ0cKN0G1ugp0EojQqRXXUh"><span style="font-weight:bold">Layer 2：Working State —— 管好"这次任务"</span></p>

<p id="f-doxcnxJwog3KLCweV16k0tbvTae"><span>- </span><span style="font-weight:bold">长任务先写一个 todo markdown</span><span>：把计划落盘成 `plan.md` / `todo.md`，让 agent 每完成一步勾选；避免任务在长循环中丢目标。（Langchain的Deep Agent就是这么做的）</span></p>

<p id="f-doxcnd9z86Qg2seUos5fWCFUROe"><span>- </span><span style="font-weight:bold">能落盘就别塞上下文</span><span>：中间产物（搜索结果、抓取的网页、生成的代码片段）写文件，让 agent 按需读，不要全堆进窗口。上下文很贵，磁盘很便宜。（博主举了一个例子，让Agent 所有历史落盘，用 Python REPL 按需检索，相当于给 agent 一张"无限大草稿纸"  相比不使用这个技巧，效果更好）</span></p>

<p id="f-doxcnZqSYkAHOiTk4JAaY1WkeRe"><span>- </span><span style="font-weight:bold">任务结束就清理</span><span>：working files 是一次性的，任务完成后归档或删除，别让它污染下一次任务。</span></p>

<p id="f-doxcnE529wfDC8kZMoqWKjiqcEh"><span style="font-weight:bold">Layer 3：Durable Memory —— 管好"这个项目 / 这个 agent"</span></p>

<p id="f-doxcnB9zwLojiIykzwTplfDUVXg"><span>- </span><span style="font-weight:bold">AGENTS.md 铁律</span><span>：</span></p>

<ol start="1"><li id="f-doxcnaum8pTC0PJP90mFOkvp5Zb"><span>手写不自动生成；</span></li></ol>

<ol start="2"><li id="f-doxcnHSB2Vcoq4FsUpM4mD36LEd"><span>只写"项目特有的事实"（构建命令、目录约定、坑），不写通用编程知识；</span></li></ol>

<ol start="3"><li id="f-doxcnQNvw8VpOu6hyOoB9bOATlf"><span>Boris(CC的开发者）建议每次大模型升级或每季度复盘一次，删掉过时条目。（也许这个写得有点夸张，不过定期检查Agent.md是一个很好的习惯）</span></li></ol>

<ol start="4"><li id="f-doxcnmEKQewWyn4NEeUU9FFkISf"><span>Agents.md写废话，反而会误导模型。 具体这里可以参考笔记论文部分。</span></li></ol>

<p id="f-doxcnZSz6hUMEV6lYSKdEki7bqd"><span>- </span><span style="font-weight:bold">写 Skill 的判定标准</span><span>：</span></p>

<ol start="1"><li id="f-doxcntvZLN4k2mHW4fa5nqd8Rpg"><span>同一类操作做过 3 次以上 + 步骤超过 5 步 + 通用模型容易做错 —— 才值得沉淀成 Skill。</span></li></ol>

<p id="f-doxcnXwUoo9H4BLADEadyrpeRXK"><span>2. </span><span style="font-weight:bold">Skill 建议配上 eval</span><span>：如果你的SKILL写了很多模型已经知道的废话，反而会降低模型性能。所以可以给每个 Skill 准备一个小评测集，定期跑 </span><span style="font-weight:bold">with skill vs without skill</span><span> 两组对照；模型升级后重跑，发现负贡献立刻下线（旧 Skill 可能被新模型的原生能力 superseded）。</span></p>

<a id="f-doxcnIviHgeuwS878pOaqlT5Dug"></a>

###### 面试问题

<p id="f-doxcnYwRzsbWypTyMAnSomNhimg"><span style="font-weight:bold">Q1：请你分享一下使用 Claude Code 的小技巧。</span></p>

<p id="f-doxcn7t8b81QWKdEAloLL7Y8xIh"><span>本案例用下来最大的心得是：</span><span style="font-weight:bold">要主动管理上下文，别赌模型自己能管好</span><span>。这件事的底层原因是——虽然现在主流模型号称 1M token 窗口，但实测填得越满模型越退化，可靠的部分往往只有前 30%~50%。所以"窗口大"不等于"能用满"，主动瘦身是必须的。</span></p>

<p id="f-doxcn5giVd92GLdL7OdKOs9Rfae"><span>落到 Claude Code 上，我常用两个原生功能：</span></p>

<p id="f-doxcnX8jnmwe3uwqPf0VHmrjFJh"><span>1. </span><span style="font-weight:bold">**主动 `/compact` 而不是等它自己压**</span><span>：CC 自带的自动 compaction 是黑盒，你不知道它丢了什么。我的做法是在上下文用到 50% 左右就主动触发，而且 `/compact` 后面加参数，明确告诉它"保留所有架构决策和待办事项"——指定要保留什么比让它自己挑要靠谱得多。</span></p>

<p id="f-doxcn8FjwW7RzTVwR8lgdpjMutb"><span>2. </span><span style="font-weight:bold">走错路用 Rewind（双击 ESC）直接砍掉</span><span>：如果模型沿着错误方向跑了几轮，最忌讳的就是"说服它改回来"——因为错误的推理过程已经污染上下文了，再多解释只是叠 buff。Rewind 是直接把那段分支从历史里删掉，相当于"假装没发生过"，比纠错干净得多。</span></p>

<p id="f-doxcnZ6bTwATZg14hsBs9AS4RXd"><span>更普适的原则是：长 stack trace、几千行日志这种噪声，不要原样塞回窗口；要么截断要么先落盘再按需读。</span><span style="font-weight:bold">上下文是稀缺资源，要像管显存一样管它。</span></p>

<p id="f-doxcniUvcWLTF0XzmiOEUr7ynzb"><span style="font-weight:bold">Q2：Harness 工程给你使用 AI 工具带来什么启示？</span></p>

<blockquote id="f-doxcnqZaNUFjLLqCpscPqUlLK3f"><p id="f-doxcnbbzHKgyMUtdR4aUDb89zwf"><span>根据本章学习的内容，总结两个可参考方向的回答。</span></p></blockquote>

<p id="f-doxcnIVpIcGqo4MzjwIXToeBVyh">版本一（记忆管理视角）：Agent 记忆可分为上下文窗口、临时工作文件与持久记忆三层，下面分别讨论其使用方式。</p>

<ol start="1"><li id="f-doxcnRXnQln3fEdpmXi0OYfQFFh"><span>上下文窗口非常宝贵，我们需要很小心管理他，同时虽然现在模型的窗口越来越大，最大的上下文可以支持1M，但是当上下文增大，模型性能也会退化，所以我们不必等到上下文满了再压缩，可以在上下文50%的时候，主动压缩。</span></li></ol>

<ol start="2"><li id="f-doxcnbpqsEeJGOKLyBlMX4A5Nxh"><span>临时工作文件这一层，我们让AI存一些当前任务的中间产物，比如搜索结果，长日志。我们不把他放在上下文中，而是放在磁盘里，因为磁盘很便宜。通过Agent搜索磁盘文件，可以让Agent处理很久之前的任务记录，同时也不污染上下文。</span></li></ol>

<ol start="3"><li id="f-doxcnLxcY4zU1fj1UnRM34pWOdf"><span>持久记忆常见的有Agent.md和Skill.我们应该手动写Agent.md，不要依赖AI生成。同时对于SKILL，如果同一操作重复超过3次以上，我们应该建立SKILL，但也应该建立测试集评估SKILL，因为模型升级，或者SKILL过啰嗦，也会影响Agent的性能，所以定期检查SKILL是一个好习惯。</span></li></ol>

<p id="f-doxcnPeavfrFvjg3n8NLKzyNlib"><span style="font-weight:bold">版本二（AGENTS.md 管理视角）</span><span>：最大启示是</span><span style="font-weight:bold">项目级知识要外化，但要克制</span><span>。以前我习惯把所有约定写在 README 里靠人脑记，现在可以用 `AGENTS.md` 把"项目特有的事实"喂给 agent——构建命令、目录约定、踩过的坑。</span></p>

<p id="f-doxcnMgk6FlyTZ1iMcx29wt60o8"><span>管理 `AGENTS.md` 可以注意以下原则，最近也有一篇论文 </span><span style="font-style:italic">Evaluating AGENTS.md — Are Repository-Level Context Files Helpful for Coding Agents?</span><span>（arxiv 2602.11988）做了实证支撑：作者在 AGENTBENCH 上对比"无 context file / LLM 自动生成 / 人类手写"三档设置，发现 </span><span style="font-weight:bold">LLM 自动生成的 AGENTS.md 反而让任务成功率下降 ~3%、token 消耗上升 ~20%</span><span>，人工手写也只有 +4% 的提升。原因是 context file 里每一条额外要求都是一个约束，Agent 会认真履行但同时也分散了注意力。可采用以下做法：</span></p>

<p id="f-doxcnSZZXnBTHF6OEelpK5FJ9Hd"><span>1. </span><span style="font-weight:bold">手写不自动生成</span><span>——自动生成的 `AGENTS.md` 充斥废话，论文实验里直接成了负贡献；</span></p>

<p id="f-doxcnzpoH2DzHU3hjLeQPIO33Mf"><span>2. </span><span style="font-weight:bold">只写项目特有的事实</span><span>——构建命令、测试命令、特定工具（如"用 uv 不用 pip"）这类 AI 猜不到的；目录结构、"保持代码整洁"这类废话不要写，AI 自己知道；</span></p>

<p id="f-doxcnabdpBBPHeaN6B9O7dbLltg"><span>3. </span><span style="font-weight:bold">定期复盘删过时条目</span><span>——模型升级后，老的"提醒"可能反而成为干扰；</span></p>

<p id="f-doxcnpmuciDCx8d4BfoP57LTXae"><span>4. </span><span style="font-weight:bold">简洁第一，少即是多</span><span>——`AGENTS.md` 写得越长，注入 system prompt 的开销越大，而且容易稀释关键信息。</span></p>

<p id="f-doxcnCMekd3B8UcRvtnbAKZzl9f"><span>这件事让我意识到：harness 不是越多上下文越好，而是</span><span style="font-weight:bold">信号-噪声比</span><span>的工程。</span></p>

<p id="f-doxcn4GsvzPtBzBQv8UYytf0uwb"><span style="font-weight:bold">Q3：使用 Skill 有什么心得吗</span></p>

<p id="f-doxcntG07p3aZm29DzG4opNSnrc"><span>我的核心心得是：</span><span style="font-weight:bold">Skill 不是越多越好，滥用会反向降低性能</span><span>。</span></p>

<p id="f-doxcnVdnRvH9ctrr1KTakHtsPId"><span>直觉上 Skill 是好东西——把一类可复用流程外化成 prompt + 代码 + 参考资料，让 agent 像调工具一样用。Cursor 就有过用 200 行 Skill 替掉 15000 行编排代码的例子。但实际用下来我发现两个坑：</span></p>

<p id="f-doxcnudPbyJ7rLZrKN4ZjIzX0He"><span>1. </span><span style="font-weight:bold">Skill 写多了反而干扰模型</span><span>：如果 Skill 里写了很多模型本来就知道的常识，等于在 system prompt 里加噪声，</span><span style="font-weight:bold">结果是 with skill 比 without skill 还差</span><span>。</span></p>

<p id="f-doxcnSNBayUdlHq51281K303xed"><span>2. </span><span style="font-weight:bold">Skill 会过时</span><span>：新模型原生支持多模态文件解析后，老的"教它怎么解析 PDF"的 Skill 就成了负担。</span></p>

<p id="f-doxcnmLnDXkyGSqjiCZFfVbxDBh"><span>所以我建立了两条纪律：</span></p>

<p id="f-doxcn7oSz1GfXV5oAMpGA6nOdm8"><span>- </span><span style="font-weight:bold">判定标准</span><span>：同一类操作做过 3 次以上 + 步骤超过 5 步 + 通用模型容易做错——同时满足这三个条件才值得做成 Skill。一次性的别做。</span></p>

<p id="f-doxcnV2m9U4yEVHRIU8RguFyrUb"><span>- </span><span style="font-weight:bold">每个 Skill 必须配 eval</span><span>：准备一个小评测集，定期跑 </span><span style="font-weight:bold">with skill vs without skill</span><span> 对照。模型升级后重跑，发现负贡献立刻下线。</span></p>

<p id="f-doxcngGJpggslgVqk2OVMxjo1oh"><span>总结来说：</span><span style="font-weight:bold">Skill 是杠杆，但它也有成本；要用 eval 来证明它真的在帮你，而不是凭感觉攒一堆</span><span>。</span></p>

<a id="f-doxcnofzuMKgWATcpcWiNrd5N4g"></a>

##### Loops, Tool Use, and Feedback（循环、工具与反馈）

<a id="f-doxcnSyLOgmdsvMa2z0876JMe1d"></a>

###### 背景

<p id="f-doxcnbqZ8Sc4DJ9UYM7Hb7p712d"><span>Agent 之所以比单次 LLM 调用强，核心是</span><span style="font-weight:bold">循环 + 反馈</span><span>——给它时间思考、跑工具、看结果、再调整。从 模型o1 开始，模型就不再是"一锤子买卖"，而是默认要在 harness 里循环跑、反复 refine。</span></p>

<p id="f-doxcn3B2hKLoGpe3Su3LFVqm48c"><span>但"循环跑起来"只是第一步。真正决定循环跑得好不好的，是</span><span style="font-weight:bold">循环周围的那一圈配套</span><span>：</span></p>

<ul><li id="f-doxcnL67qiB9SbPeQ2wRF4xplzg"><span>循环本身要够聪明（不能每次啥也没学会，就盲目重试）；</span></li></ul>

<ul><li id="f-doxcnBmhmG3C0aPVIcrSwHZr2He"><span>循环里跑的工具不能反过来污染循环（一条 20000 行的日志就能撑爆窗口，后面循环全废，参考杠杆 2）；</span></li></ul>

<ul><li id="f-doxcnmiD0DF4OpcVXhxPpC7L6ti"><span>循环不能放任 agent 写出越来越大的文件、越来越乱的结构；</span></li></ul>

<ul><li id="f-doxcnnNqhVUa3ghK7B657jMwdMb"><span>循环出错时不能炸掉真机（API key、</span><span><span><span>~/.ssh</span></span></span><span> 直接暴露）。</span></li></ul>

<p id="f-doxcneQVIpVyCer66GLjWgW62dd"><span>所以这一节真正讲的是一件事的四个层面：</span><span style="font-weight:bold">让循环本身更聪明 + 让工具 I/O 不污染循环 + 给循环加结构性约束 + 给循环加安全边界</span><span>。下面就按这四块展开。</span></p>

<blockquote id="f-doxcnSFKMZBZ8GCKXofWEULI5IC"><p id="f-doxcnk3xnLNEDyfhq8PkUES8XGg"><span>SWE-bench 论文留下的三条设计原则贯穿全节：actions 简单紧凑、environmental feedback 信息量足且简洁、guardrails 抑制错误扩散且便于恢复。</span></p></blockquote>

<a id="f-doxcnokhtw7HN6jxDhUv7leR9ab"></a>

###### 基础知识

<p id="f-doxcndm01vDPFDQcCWdgCg0bULc"><span style="font-weight:bold">1. 循环范式（Loop Strategies）—— 让循环本身更聪明</span></p>

<p id="f-doxcnMbULKIlAMMpJ2vjhKzHJ6b"><span>循环不是一种东西，而是一条从"暴力重试"到"假设-验证"的谱系，越靠后越省 token、越快收敛：</span></p>

<p id="f-doxcn3RL12EPtWTAxQ2fbwMUUPd"><span>1. </span><span style="font-weight:bold">Ralph Wiggum loop</span><span>（最朴素）：失败就清空重来、什么也不学 → 极度耗 token，但能 work。视频里举了用这种方式硬怼出一个 C compiler 的例子。（但这种方式很蠢啊，感觉也会陷入死循环，感觉谁会用这种方式写Agent啊。。）</span></p>

<p id="f-doxcnzXtoC4vXRbUgNQ27L1YTnb"><span>2. </span><span style="font-weight:bold">Plan-then-Execute</span><span>：先规划再执行，中途守住计划。大多数现代 harness 默认就这么做。</span></p>

<p id="f-doxcnHVuUhtJ10BqFfVGV7Vuysg"><span>3. </span><span style="font-weight:bold">Hypothesis → Verification loop</span><span>（Karpathy 的 auto-research 范式）：假设 → 跑实验 → 看结果 → 反馈进下一轮 → 螺旋上升。这是当前性价比最高的循环形态。</span></p>

<p id="f-doxcnk9Jm9ucZhTQIJ3iP04pkjf"><span>4. </span><span style="font-weight:bold">Test-Driven Development for Agents</span><span>：把测试当作循环的成功判据。Factory 的提醒——</span><span style="font-weight:bold">务必先写测试再写代码</span><span>，反过来会把已有 bug 也"橡皮图章"进测试。</span></p>

<p id="f-doxcnrEhMIzn0sth7XZSCbVwGye"><span style="font-weight:bold">2. 工具 I/O 卫生（Tool Hygiene）—— 别让工具污染循环</span></p>

<p id="f-doxcnoIPeIMcjdnBXGswtlbxRwS"><span>循环每跑一轮，工具的输出都会回灌进上下文。如果不管 I/O，工具一次吐 20000 行日志，几轮下来窗口就废了（参考杠杆 2 的"窗口退化"）。所以 harness 必须替 agent 做这件事：</span></p>

<p id="f-doxcnsQk0OuGf9d0Z6yw9oJYqwd"><span>- </span><span style="font-weight:bold">截断</span><span>：harness 自动只保留尾部 2000 行而不是整段 20000 行。看似简单，但能直接救活后续 N 轮循环。</span></p>

<p id="f-doxcnKuCE7d4daxSTwJ0loUCppd"><span>- </span><span style="font-weight:bold">抽帧</span><span>：长 stack trace 只保留报错那几帧 + 失败的测试名，而不是整段 traceback。</span></p>

<p id="f-doxcnIoFU1f193Z7SbSiJx7igJc"><span>- </span><span style="font-weight:bold">落盘</span><span>：超大输出（&gt;5MB）直接写文件，agent 按需读，不要全堆进窗口。</span></p>

<p id="f-doxcnvWS18wk641EsbGCy4eVHmc"><span style="font-weight:bold">3. 结构性约束（Structural Constraints）—— 替循环挡掉错误方向</span></p>

<p id="f-doxcnr67ylqo0JeVMyy9MjsH9xb"><span>这部分是 OpenAI 反复强调的点："开发者正在变成 AI 系统的管理者"——写代码已经不是瓶颈，</span><span style="font-weight:bold">给系统设边界</span><span>才是。具体做法是把约束写死进 instructions / system prompt，让 agent 在循环里被动遵守，比如可以规定以下规则：</span></p>

<ul><li id="f-doxcnsDxEUKu7hmr0GUO0ROKFmg"><span>单文件不超过 200 行 → 强迫 agent 分解，而不是堆一个巨大的 god file。</span></li></ul>

<ul><li id="f-doxcnGhoV14Q8j01pFgsYHN3Jtb"><span>函数 / 模块大小限制 → 同理。</span></li></ul>

<ul><li id="f-doxcnAxNYVmXESCPk0dinyzr5gb"><span>新增依赖必须先问 → 防止循环里悄悄引入一堆库。</span></li></ul>

<p id="f-doxcna7IyXlQawhDDCWCdQexCAh"><span>这些约束的本质是：</span><span style="font-weight:bold">用 harness 替你做"代码 review"的硬性那一半</span><span>，让模型不会沿着错误方向越跑越远。</span></p>

<p id="f-doxcn6VKqgG38BakYIuckDQIhqe"><span style="font-weight:bold">4. 安全护栏（Safety &amp; Guardrails）—— 让循环出错不致命</span></p>

<p id="f-doxcnKk6MYo1vOuiu7vmTzuRpNb"><span>视频里 Raj 反复警告：</span><span style="font-weight:bold">不要在 laptop 上直接跑陌生 agent</span><span>。宿主机上有 API key、`~/.ssh`、浏览器 cookie，循环一旦失控代价巨大。所以 harness 这一层要提供两道防线：</span></p>

<p id="f-doxcnEDfXiNw3GPGplaFRKawbub"><span>- </span><span style="font-weight:bold">隔离（Sandbox）</span><span>：容器 / VM / devcontainer，给 agent 一个干净的、可丢弃的环境。</span></p>

<p id="f-doxcnX6LNNMzdQ3IGeUAeoAgQOc"><span>- </span><span style="font-weight:bold">审批关卡（Guardrails）</span><span>：三档放行</span></p>

<ul><li id="f-doxcnj3rTHh4M4VyGuIjJ9mAfMf"><span>✅ 自动允许：读文件、跑测试、</span><span><span><span>git diff</span></span></span></li></ul>

<ul><li id="f-doxcn4qux1k9fNnOewKNWpjfGZb"><span>⚠️ 需要确认：写文件、安装依赖</span></li></ul>

<ul><li id="f-doxcnYHqG5V6MA3ghz2HMeidRVc"><span>🛑 强制人工：</span><span><span><span>rm -rf</span></span></span><span>、</span><span><span><span>git push --force</span></span></span><span>、删分支、改共享配置</span></li></ul>

<a id="f-doxcnflkjryS0GwQWA2GYd3BcCc"></a>

###### 最佳实践建议

<p id="f-doxcnx0Y9X8PUPgVSp18n9xCHbh"><span>按上面四个层面对应组织：</span></p>

<p id="f-doxcneWonVBbxSm6kiLDQEzD9Vh"><span style="font-weight:bold">1. 循环范式</span></p>

<p id="f-doxcn4k6RYk556hIGSXAiWwaODf"><span>- </span><span style="font-weight:bold">能用"假设-验证"loop 就别用 Ralph Wiggum</span><span>：明确让模型先说"我猜问题在 X，我要跑 Y 来验证"，再跑——比"失败重试 10 次"省 5–10x token。</span></p>

<p id="f-doxcnpNiktaLdqYdmc9NGn14jag"><span>- </span><span style="font-weight:bold">任务 ≥ 3 步先要计划</span><span>：复杂任务用"先 plan、再 execute、每步对照 plan"；简单一步任务不要强加 plan，反而拖慢。</span></p>

<p id="f-doxcnWJICO068gr2ev19f9SPrHb"><span>- </span><span style="font-weight:bold">TDD 严格"先测试，后代码"</span><span>：让 agent 先写测试并跑红，再写实现到绿；反过来会让测试为已有 bug 背书。</span></p>

<p id="f-doxcnkgeLHLvnDPmjZHP3oc5eDc"><span style="font-weight:bold">2. 工具 I/O 卫生</span></p>

<p id="f-doxcnS6zODDSViIccDwumnWCkMU"><span>- </span><span style="font-weight:bold">所有工具输出加截断</span><span>：默认保留尾部 2000 行 / 50KB；长 stack trace 只留报错块；命令输出 &gt; 5MB 强制落盘成文件再让 agent 按需读。</span></p>

<p id="f-doxcnKsqtbuE76xmBBxJ9WIvhYU"><span>- </span><span style="font-weight:bold">错误反馈要"短而准"</span><span>：与其把整段 traceback 喂回去，不如让 harness 抽取 error type + 出错文件:行号 + 最近一帧 + 失败的测试名。</span></p>

<p id="f-doxcnltt6hSujOu6kI1lgY8UEFe"><span style="font-weight:bold">3. 结构性约束</span></p>

<p id="f-doxcnG2j2hoQVvGVIaMT8qHv87y"><span>- </span><span style="font-weight:bold">写死结构约束进 system prompt</span><span>：例如"单文件 ≤ 200 行""函数 ≤ 50 行""新增依赖必须先问"——强制 agent 分解和确认。</span></p>

<ul><li id="f-doxcntHXAE1rhIqjcUJvG62ccGc"><span>这条对应 OpenAI 那句"developer → manager"——你不再亲自写每一行，而是给系统定规则。</span></li></ul>

<p id="f-doxcnM9KDdrSULCOT4aUd2nm08f"><span style="font-weight:bold">4. 安全护栏</span></p>

<p id="f-doxcn4cRkIZgoiyGCq7W1qk8nhg"><span>- </span><span style="font-weight:bold">永远在 sandbox 跑陌生 agent</span><span>：容器 / VM / devcontainer 三选一，宿主机上的 `~/.aws`、`~/.ssh`、浏览器 cookie 别暴露给 agent。</span></p>

<p id="f-doxcnsVy20baGyoQ4fvgnz2SuCb"><span>- </span><span style="font-weight:bold">三档权限白名单</span><span>：✅ 读文件 / 跑测试 / git diff → 自动；⚠️ 写文件 / 安装依赖 → 确认；🛑 `rm -rf` / `git push --force` / 删分支 / 改共享配置 → 必须人工。</span></p>

<a id="f-doxcnvK9bkbwtXrmI5xb4A0ObEb"></a>

###### 面试问题

<p id="f-doxcnJp9FcPU27ZnJwO6uua4Prd"><span style="font-weight:bold">Q：你能介绍一下你了解的 Harness 工程的最佳实践吗？</span></p>

<p id="f-doxcnURIc6ev9oJcFdWmCzPt4Sg"><span>Harness 工程这个概念其实很大——业界有一种说法是 </span><span style="font-weight:bold">Agent = Model + Harness</span><span>，所以围绕模型展开的一切（检索、记忆、循环、编排、安全……）都可以归到 harness 里。</span><span style="font-weight:bold">我从其中一个我体感最深的角度切入：Agent 的循环</span><span>来讲解，这是 agent 区别于单次 LLM 调用的核心——给它时间反复跑工具、看反馈、再调整。</span></p>

<p id="f-doxcnwz33zbVDZonD0op5neRbHh"><span>围绕"让这个循环跑得好"，可以从四个层面讲最佳实践：</span></p>

<p id="f-doxcnkfRx8QNmisjSbRSQhHbZGd"><span style="font-weight:bold">第一，循环本身要够聪明。</span></p>

<p id="f-doxcnLICGHzR82ulVwxnXXTSm6e"><span>循环范式有一条从弱到强的谱系：最朴素的是 Ralph Wiggum loop——失败就清空重来、什么也不学，能 work 但极耗 token；好一点的是 Plan-then-Execute，先规划再执行；当前性价比最高的是 </span><span style="font-weight:bold">Hypothesis → Verification loop</span><span>，让模型先说"我猜问题在 X，我跑 Y 来验证"，再循环——比盲目重试省 5–10 倍 token。再进一步是 </span><span style="font-weight:bold">TDD for Agents</span><span>：先写测试再写代码，让测试当作循环的成功判据；反过来会把已有 bug 也"橡皮图章"进测试，这是 Factory 团队的踩坑经验。</span></p>

<p id="f-doxcnqV3n5pxtuMqVX2A1mhz4Pc"><span style="font-weight:bold">第二，工具 I/O 不能反过来污染循环。</span></p>

<p id="f-doxcnx0w7HcT90rvAk6mhKPC2Pf"><span>循环每跑一轮，工具输出都会回灌进上下文。一条 20000 行的日志就能撑爆窗口，后面循环全废。所以 harness 必须替 agent 做三件事：</span><span style="font-weight:bold">截断</span><span>（默认只保留尾部 2000 行）、</span><span style="font-weight:bold">抽帧</span><span>（长 stack trace 只留报错那几帧 + 失败的测试名）、</span><span style="font-weight:bold">落盘</span><span>（&gt;5MB 的输出直接写文件让 agent 按需读）。</span></p>

<p id="f-doxcnnkIfiN63gYc8vvSgDu6x4c"><span style="font-weight:bold">第三，给循环加结构性约束。</span></p>

<p id="f-doxcnlx7G0e1oC3VXbNIm86rEXb"><span>这是 OpenAI 反复强调的"developer → manager"思想——写代码不是瓶颈，</span><span style="font-weight:bold">给系统定规则</span><span>才是。具体做法是把约束写死进 system prompt，比如"单文件 ≤ 200 行""函数 ≤ 50 行""新增依赖必须先问"。本质是用 harness 替你做了代码 review 里硬性的那一半，让模型不会沿着错误方向越跑越远。</span></p>

<p id="f-doxcnvWhOdhFfzwkbe2CXRPsFJf"><span style="font-weight:bold">第四，给循环加安全护栏。</span></p>

<p id="f-doxcnZoVHzGgSGXevdeHNKBbxkb"><span>循环一旦失控代价巨大——宿主机上有 API key、`~/.ssh`、浏览器 cookie。所以两道防线必须配上：</span><span style="font-weight:bold">Sandbox 隔离</span><span>（容器 / VM / devcontainer 三选一），以及</span><span style="font-weight:bold">三档审批白名单</span><span>—— 读文件 / 跑测试自动放行， 写文件 / 装依赖要确认， `rm -rf` / `git push --force` 强制人工。</span></p>

<p id="f-doxcnRgn6IYDhNoVNx2vnI365mg"><span style="font-weight:bold">总结</span><span>：这四层背后其实是 SWE-bench 论文留下的同一条原则——</span><span style="font-style:italic">actions 简单紧凑、environmental feedback 信息量足且简洁、guardrails 抑制错误扩散</span><span>。Harness 工程的精髓不是模型有多强，而是</span><span style="font-weight:bold">你给循环周围配的这一圈基础设施有多稳</span><span>。</span></p>

<a id="f-doxcnubcTPrF7IFLugFJO89sFlb"></a>

##### Orchestration（单 Agent vs 多 Agent）

<blockquote id="f-doxcnnX3WJ3gffSKdqQ0mhi1tcg"><p id="f-doxcnkbPJPjXRGThqPcw4vNUQr9">本节讨论如何选择单 Agent 与多 Agent。Parallel 模式需要管理不同 Agent 之间的通信及协调开销；Claude Code、OpenClaw、Hermes 等案例采用 Orchestrator 模式。可结合这些架构比较 Parallel 模式的适用条件与取舍。 <a href="/posts/agent-learning-11-multi-agent/#f-doxcntuQVjJ2aMEP4HF4qje1X9b"><span>多Agent</span></a></p>
<p id="f-doxcnNpLDCrjL5cLjOcxArdRoTg"><span>另外你会不会有疑问，单Agent/多Agent这个内容算什么Harness？但是按现在业界的定义，Harness = Agent - Model，所以这样想你应该不会觉得奇怪了吧。</span></p></blockquote>

<a id="f-doxcnBLaUQkCGxxJGxNLEwFAPbb"></a>

###### 背景 / 基础知识

<p id="f-doxcnQlU9zSyqWPvSMAx97OMiDe"><span>直觉是："上下文窗口不够大，那就拆给多个 agent 并行做。"听起来很对。但视频里 Raj 给的</span><span style="font-weight:bold">反直觉真相</span><span>是：多 Agent 不是默认更好——多 benchmark 平均下来，</span><span style="font-weight:bold">Single Agent 表现优于 Multi-Agent</span><span>。</span></p>

<p id="f-doxcnMEImHpWEA7ugfQGVbRuh4c"><span>原因是</span><span style="font-weight:bold">协调税（coordination tax）</span><span>：agent 之间要互相同步状态、互相理解输出、互相处理冲突，这一层开销往往把并行收益吃光。社交媒体上常见的"我同时开 100 个 agent 改 100 个 bug"在真实工程里几乎一定塌掉。</span></p>

<p id="f-doxcnd2JO0BTvcWGxq7yxyr9Cwc"><span>多 Agent 真正有效的场景是结构化的：</span></p>

<p id="f-doxcn5pL2VMHaFWdQsJxT8hcdvf"><span>- </span><span style="font-weight:bold">Orchestrator-Worker</span><span>：一个主 agent 派任务、若干 worker 干活、最后汇总。</span></p>

<p id="f-doxcn2TIlOUouFZSip28v4JBlLf"><span>- </span><span style="font-weight:bold">明确可并行的子任务</span><span>：比如对 50 个独立文件做格式化，子任务之间零依赖。</span></p>

<p id="f-doxcnThYGB6uPKglvFzwxgIfZ4e"><span>- </span><span style="font-weight:bold">Reflection / Critic</span><span>：一个 agent 写代码、另一个 agent 专门挑毛病。视频里 Raj 自己的工作流——</span><span style="font-weight:bold">Opus 写代码 + GPT 系列反思批评</span><span>——就是这个模式；OpenHands 等 harness 已经内建。</span></p>

<p id="f-doxcnoYpI5rihH8i8hdx3AtTrYf"><span>Factory 的实战结论也印证了这点：</span><span style="font-weight:bold">串行 Orchestrator → Worker → Validator</span><span> 比"并行 swarm 一百个 agent"靠谱得多。</span></p>

<a id="f-doxcnJv1YLZHDH2vwlVRNJzFY4g"></a>

###### 最佳实践建议

<p id="f-doxcn7EJOCo7thINkmbHgrKyBSf"><span>- </span><span style="font-weight:bold">默认就用 Single Agent</span><span>：除非你能说清"我为什么需要并行"或"我需要一个独立 critic"，否则不要拆。</span></p>

<p id="f-doxcnhsamWusOV974LTCnaXptPb"><span>- </span><span style="font-weight:bold">要并行先验证"子任务零依赖"</span><span>：能不能用一句 `for f in files: agent(f)` 描述清楚？不能就意味着有隐式依赖，并行会出乱子。</span></p>

<p id="f-doxcnJin4uGAl036GuA8UNzpqoc"><span>- </span><span style="font-weight:bold">Orchestrator-Worker 模式的硬要求</span><span>：worker 之间不能直接通信，只通过 orchestrator 中转；每个 worker 的输入输出必须是可序列化的明确契约（JSON / 文件路径），不要靠"共享内存"。</span></p>

<p id="f-doxcnskcKTNYnPm3erBdIrpQFoW"><span>- </span><span style="font-weight:bold">强烈推荐 Reflection 模式</span><span>：主写 + 副审 是 ROI 最高的多 agent 用法；建议主副用</span><span style="font-weight:bold">不同厂家的模型</span><span>（如 Opus 写 + GPT 审），让盲区互补。</span></p>

<p id="f-doxcn1Ujdrb5jhDNTF5BWxa34Zf"><span>- </span><span style="font-weight:bold">限制 agent 数量</span><span>：一个 orchestration 内活跃 agent ≤ 5；超过这个数协调成本会指数上升。</span></p>

<p id="f-doxcnUzkd2SNsPW5TaloOKFbMle"><span>- </span><span style="font-weight:bold">不要让多 agent 完全 event-driven</span><span>：自由互相调用 = 死锁/无限循环高发；坚持</span><span style="font-weight:bold">有明确层级</span><span>的调度。</span></p>

<p id="f-doxcnQ3uCm7fvTFVCjlPFBEtEwe"><span>- </span><span style="font-weight:bold">Reflection 的输出要可执行</span><span>：让 critic 直接产出 diff 或 patch，而不是写"建议你考虑改进 X"——后者 main agent 不一定听得懂。</span></p>

<a id="f-doxcn0I5GE0VIeDPxAqCCVYgsvh"></a>

###### 面试问题

<p id="f-doxcnTfbDWsPNpOVHtXTxHQvaB7"><span style="font-weight:bold">Q：你会如何选择单 Agent 和多 Agent 的架构？</span></p>

<p id="f-doxcnhxwlI69kC0ilvfVIzRhlSd"><span>我的总原则是 </span><span style="font-weight:bold">"默认 Single Agent，除非你能说清为什么必须多 Agent"</span><span>。这听起来反直觉，但多个主流 benchmark 上平均下来，</span><span style="font-weight:bold">Single Agent 普遍优于 Multi-Agent</span><span>——原因是</span><span style="font-weight:bold">协调税</span><span>：agent 之间同步状态、互相理解、处理冲突的开销，往往把并行收益吃光。</span></p>

<p id="f-doxcnw8w0lln02YhtUVBCmSoB1d"><span>多 Agent 真正有效的就三类场景：</span></p>

<p id="f-doxcn02FNMtteNWIxgnjmlJirnf"><span>1. </span><span style="font-weight:bold">并行子任务</span><span>：必须"子任务零依赖"（能用 `for f in files: agent(f)` 描述清楚），比如 50 个独立文件做格式化；</span></p>

<p id="f-doxcnLCo434nqI24gb2sSZcep4e"><span>2. </span><span style="font-weight:bold">Orchestrator-Worker</span><span>：worker 之间不能直接通信，只通过 orchestrator 中转，输入输出走可序列化的明确契约；</span></p>

<p id="f-doxcnw286w1hDNQ1AxW8USMugme"><span>3. </span><span style="font-weight:bold">Reflection / Critic</span><span>：ROI 最高的多 agent 用法，主写 + 副审，建议主副用不同厂家的模型让盲区互补，critic 输出要可执行（直接给 diff/patch）。</span></p>

<p id="f-doxcny5gCnS0DLhnAKeFdBSxAzb"><span>外加两条防失控的硬规则：活跃 agent ≤ 5；不要完全 event-driven，坚持有明确层级的调度。</span></p>

<p id="f-doxcn75FPCrMlNqFGgfER2by0Kc"><span style="font-weight:bold">一句话总结</span><span>：</span><span style="font-weight:bold">Single Agent + Reflection</span><span> 是当前性价比最高的组合，其他多 Agent 形态都要有明确理由再上。</span></p>

<a id="f-doxcntfh81v9NzcQ1AtOLPMdhfd"></a>

##### 面试真题

<p id="f-doxcnL10JUm4KuH2zl92TISrr9b"><span>上面其实展示了很多面试问题，就是想告诉大家，这一节的内容真的很实用。这里引用字节暑期实习真题，来告诉大家，确实你看了这个笔记，对你面试有直观的帮助。这个面试真题来自于：</span><span><span><a href="/posts/agent-learning-24-interview-review/#f-doxcnobSTKPi3ZAKwTDxkqSHhEc"><span>2026/05字节跳动大模型开发暑期实习一面</span></a></span></span></p>

<p id="f-doxcnxAAPBa4oc1zRUJTl4DiSDb"></p>

<p id="f-doxcnb2eA4gLEmrDGwUyhi9SkOc"><span>8-4 如果让你用 harness 完成你的工程，你会怎么做？</span></p>

<p id="f-doxcnYSP2CwlhdQ2dy2jdMtNuvd">Harness 可以理解为 Agent 中模型之外的部分。下面以 Claude Code 完成项目为例，讨论相关工程方法。</p>

<p id="f-doxcnaMkx0PYDWXqIBqJluIHhig"><span>1. </span><span style="font-weight:bold">从AI调用检索工具的角度。</span><span>ClaudeCode默认使用Grep搜索，</span><span style="font-weight:bold">但是可以根据具体的任务和观测的效果，来修改模型使用的工具</span><span>，比如文件太大，那我会使用BM25建立索引。如果搜索精度低，我会使用Agentic Rag或者embedding搜索提升模型的外部获取信息能力。</span></p>

<p id="f-doxcnP15P39C2HRrsHRjGNkzhrf"><span>2. </span><span style="font-weight:bold">我会建立明确的验证机制。</span><span>Agent本身去验证代码是否完成，它是主观的。我会明确测试机制，建立测试标准，指标，让Agent跑这些工具来完成代码阶段性的检验，并且反馈检测结果，创建一个生成 - 检测的循环，保证生成代码的质量。</span></p>

<p id="f-doxcnnHaf0fQIFYvypXmNRs4f9b"><span>3. </span><span style="font-weight:bold">让Agent只做一件事，并且保持上下文简短。</span><span>虽然现在模型的上下文很大，但是当模型上下文窗口变大，其实性能也会下降。我会参考OpenAI Harness工程的做法，让多个Agent来完成任务，每个Agent职责，目标保持简短，只做一件事，做完就销毁，保证Agent运行任务时处于最良好的状态。</span></p>

<p id="f-doxcn5U52WbeHZO4BqeH1N5cCph"><span>      这里还有太多其他的角度可以回答了，都是上面2.4总结的内容，比如Agent.md最佳组织方式。Agent架构编排（使用主管模式，反思模式等。安全方面，比如建立隔离环境，sandbox）。这里就不展开了，都是上面重复的内容。</span></p>

<p id="f-doxcnlvaP4cMc7Z5Vqy4G1gX52g"><span>8-5 对 Claude Code 的了解？里面有哪些框架你认为真正给你的使用带来了便利？</span></p>

<p id="f-doxcngxBLnLw7mM7g8PnBqTK5Wb"><span>CC的了解可以从多个方面，比如从它的记忆功能，架构方面，可以看我们的</span><span><span><a href="/posts/agent-learning-21-open-source-architectures/#f-doxcneK3qVfDjLnKOQFCdsbYDmf"><span>CC代码解析</span></a></span></span><span>。它的</span><span><span><a href="/posts/agent-learning-19-ai-coding/#f-doxcnr3tAaTsvJ5ZSLRkVXrJ7b0"><span>最佳实践方面</span></a></span></span><span>。总之第四章讲了很多ClaudeCode，各个角度都可以回答。</span></p>

<p id="f-doxcndmMFrCOBOWgwBkaVNsjLSK"><span>框架哪些方面带来了便利性。可以结合本章内容，谈/rewind的使用，compact的使用，往主动管理上下文上去聊。也可以聊一下它的insight命令，可以参考</span><span><span><a href="/posts/agent-learning-19-ai-coding/#f-doxcnzoF6r5qL6j3q6q4XCpRcCh"><span>这里</span></a></span></span></p>

<p id="f-doxcnCgPCtg0uLI5q8kgJ7YxUhh"><span>8-6 这些内容怎么迁移？  </span></p>

<p id="f-doxcnayjsOirFziyJ3lAUCgi0Yg"><span>其实2.4小节所有的内容都是在讲Harness工程的应用，也就是Harness工程怎么迁移到我们的实际工作中。这个问题又很宽泛，但是其实上面的各个原则，都是Harness工程迁移的最佳实践，都可以用来回答这个问题。</span></p>

<a id="f-doxcne4SVIDKkVpeWoMYDxOGszc"></a>

##### 参考视频

<p id="f-doxcnyWy5CzpQ47MaA1WLCH2S5d"><span><span><a href="https://www.youtube.com/watch?v=KijChx7q2nY&amp;t=224s"><span>https://www.youtube.com/watch?v=KijChx7q2nY&amp;t=224s</span></a></span></span></p>


<a id="section-0126"></a>
## Anthropic Harness架构详解

<a id="f-doxcnGuiUPQXIXih92YIeZ6uOhb"></a>

<p id="f-doxcn6uUK5UZzhapBfEU0VARSVb"><span>Anthropic 的 Harness 是目前行业内最被广泛引用的长时任务管控架构范例。我们来对它进行拆解，来看一下Anthropic公司是如何使用Harness架构来完成一个长时，复杂的Vibecoding项目的。（其实我们这个笔记中的RAG项目，也是以一个文档为起点，完成整个代码的。但是当时我们的方法比较朴素，用一个agent就做到底。学了本章，我们可以试一下，使用Harness 工程，来完成这个项目，看看效果会不会更好）</span></p>

<a id="f-doxcnvXcv5ovRq9lUCyG52AZOCf"></a>

##### 设计哲学

<div style="margin-left:25px"><p id="f-doxcnICxeuXPZGY9BhF6VtDc5ts"><span>Anthropic 的 Harness 核心设计理念是：与其让一个天才持续工作直到崩溃，不如让无数个"新手"接力完成，每人只干一件事。传统做法是把一个强大的模型（如 Claude Opus 4.6）扔进去从头干到尾——但无论模型多强，单一上下文窗口最终都会被垃圾数据淹没，造成</span><span style="font-weight:bold">上下文腐化</span><span>，导致</span><span style="font-weight:bold">失忆和幻觉</span><span>。</span></p><p id="f-doxcnVqzzPLg9ycydojGFOqXUPc"><span>Anthropic 的方案彻底绕开了这个问题：</span><span style="font-weight:bold">每个 Agent 只活一次，干完就死</span><span>。</span></p></div>

<a id="f-doxcnqgVzKi8j3XMulUdEnakreg"></a>

##### 总体结构

<div style="margin-left:25px"><p id="f-doxcnlIeyfTbTBETQKSInYopWog"><span style="font-weight:bold">1. App Spec / PRD：项目起点</span></p><p id="f-doxcnSH8EODwKvJi2P6UBbC2Ysf"><span>Anthropic 的 Harness 通常从一份由人提供的</span><span style="font-weight:bold">需求说明开始</span><span>。这份需求说明不是直接交给模型去连续编码，而是作为整个系统初始化的输入。它的作用是定义产品目标、功能范围和预期结果，为后续的任务拆解和状态组织提供基础。也就是说，项目最开始进入系统的不是"代码任务"，而是一份高层次的目标描述。</span></p><p id="f-doxcnG6rxOEhe6WRzZru42oyVEh"><span style="font-weight:bold">2. Initializer：初始化规划 Agent</span></p><p id="f-doxcnKWtSE35zbyR00eNb1KZiif"><span>Initializer 的职责不是直接产出业务代码，而是把需求文档转化为</span><span style="font-weight:bold">后续开发可以执行的工程结构</span><span>。它会</span><span style="font-weight:bold">读取需求，拆解出特性清单，建立任务边界，定义每个功能点的验证标准，并完成项目骨架和代码仓库的初始化。</span><span>这个阶段的意义在于，先把一个模糊的产品目标整理成一个可以持续推进、可以被后续 agent 反复读取和执行的蓝图。</span></p><p id="f-doxcnuaVQizBkyJchUrZFfBt5yM"><span style="font-weight:bold">3. Coding Loop：编码循环 Agent</span></p><p id="f-doxcn6uz5tZcrWAGm0snvZBxmxh"><span>系统进入正式执行阶段后，</span><span style="font-weight:bold">并不是由同一个 agent 一直写下去，而是不断启动新的 coding agent，让它们逐轮接力</span><span>。每一轮 agent 都会先读取当前的任务状态和项目进度，然后只选择一个明确的小任务去实现。完成之后，它不会长期保留在系统中，而是会在交接完成后退出。下一轮再由一个全新的 agent 接手。Anthropic 正是</span><span style="font-weight:bold">通过这种循环式接力，而不是持续式长对话，来避免上下文不断膨胀的问题</span><span>。</span></p><p id="f-doxcnVYgpSphMD6arAmua3XJYye"><span style="font-weight:bold">4. External Memory：外部记忆系统</span></p><p id="f-doxcnCyO1PsPlOprZsq3nYnNHdb"><span style="font-weight:bold">Anthropic Harness 的一个核心思想，是将项目状态从模型内部记忆中剥离出来，放入外部可持久化的介质中</span><span>，比如特性清单、进度文件和 Git 历史。这样一来，系统的连续性不依赖某个 agent 的上下文窗口，而依赖外部状态记录。每个新的 agent 启动时，只需要重新读取这些状态，就能接手上一个 agent 已经完成的工作，从而让整个系统具备持续推进的能力。</span></p><p id="f-doxcn6CGIplGwvvuzaZOe0WH15d"><span style="font-weight:bold">5. Deterministic Validation：确定性验证轨道</span></p><p id="f-doxcn5mza18SXSMoYtle0S6FUMb"><span>Anthropic 的架构</span><span style="font-weight:bold">并不把“是否完成”这件事交给模型自己判断，而是通过一套外部的、确定性的验证机制来裁定结果是否成立</span><span>。也就是说，agent 生成代码之后，系统会通过测试、检查和验证来决定这项工作能否被接受。只有满足这些外部标准，系统才会更新状态并进入下一轮。这种设计的意义在于，用工程规则替代模型主观判断，把“感觉完成了”变成“验证通过了”。</span></p><p id="f-doxcnegCYiRUlCbCcAVLKg32CRT"><span style="font-weight:bold">6. Sandbox / Isolation：隔离执行环境</span></p><p id="f-doxcnyNQ5YTlZbBiH2jlPG5ZA8f"><span>每个 agent 的运行通常都处于</span><span style="font-weight:bold">一个受控环境中</span><span>，</span><span style="font-weight:bold">这样既能限制它可访问的工具范围</span><span>，</span><span style="font-weight:bold">也能避免错误或脏上下文污染整个系统</span><span>。隔离环境让每一轮执行都尽量在明确边界内进行，也让失败后的回滚、重试和重新启动变得可控。Anthropic Harness 依赖这种隔离性，把 agent 的自由度压缩在一个足够安全、足够清晰的工作空间里。</span></p><div id="f-doxcn36hbdTxGpN61q9vWnWka1d"><img alt="" decoding="async" height="853" loading="lazy" src="/images/agent-learning/e0ea5d1f92e81aaa3288d346.png" width="1280"/></div><p id="f-doxcn7yR8ZwAgfemUbp1FnfTVgf"><span style="font-weight:bold">总结来说</span><span>：Anthropic 公司的 Harness 架构核心，可以概括为一种“</span><span style="font-weight:bold">初始化拆解 + 外部状态持久化 + 单任务循环执行 + 确定性验证门控”的长时任务运行体系</span><span>。 它的关键不在于让单个大模型持续工作，而在于先由 Initializer 将需求拆解为可执行的特性清单，再让一个个全新的 Coding Agent 逐轮读取状态文件与代码库，只完成一个原子任务，并通过测试、提交与交接文件更新系统状态后立即退出。这样做的本质，是把</span><span style="font-weight:bold">项目记忆从模型内部迁移到外部系统</span><span>，</span><span style="font-weight:bold">把任务完成判断从模型主观输出转移到确定性验证机制，从而显著降低上下文腐化、幻觉完成和多步任务失控的风险。</span></p></div>

<a id="f-doxcn0JSp1xNSkLC3gwrzem2aDf"></a>

##### 局限性

<div style="margin-left:25px"><p id="f-doxcn6fFexoBawIErVncCGiWIOf"><span>相比于单个Agent直接完成整个项目，Anthropic 公司也承认整个工程的局限性（但可以认为Harness Engineering还处于早期发展阶段(2026年3月写），Anthropic 公司给大家打了个样，后续大家会继续在此基础上改进和发展，仍然有非常大的借鉴作用）</span></p><p id="f-doxcnHTgJrH3jX7xJgIgNmlqF0b"><span style="font-weight:bold">Initializer 是单点高杠杆环节</span></p><p id="f-doxcnWkKbwlTQNaFyOlmxGTqlNe"><span>如果初始拆分错了，后面全部都会跟着错。也就是说，蓝图质量决定了整个系统上限。</span></p><p id="f-doxcn6yzS5wsQYTTL9UVMiBYUOd"><span style="font-weight:bold">Handoff 质量并不稳定</span></p><p id="f-doxcnAmkRIuDnQWCagaS1mvAMrl"><span>进度文件有时候总结得好，有时候会漏掉关键问题。一旦漏掉“为什么失败、怎么修复”，后面的 agent 可能反复踩同一个坑。</span></p><p id="f-doxcn0xHk7Z3OLkrCWuyWqiDqsh"><span style="font-weight:bold">多步可靠性仍然会衰减</span></p><p id="f-doxcn57q6r8k6pI7sElFy8pid7b"><span>即使单步成功率很高，步骤一多，整体可靠性还是会下降。所以它不是彻底解决了可靠性问题，而是显著缓解。</span></p><p id="f-doxcnsD1jkFfaAXPeMlNaz7hzTd"><span style="font-weight:bold">仍然需要 Human in the Loop</span></p><p id="f-doxcnWJckwjG5OwsvySrwjQ4jpf"><span>从实战角度看，Anthropic Harness 更像：高度自动化，但不是完全放手，还是在关键节点引入人工检查。</span></p></div>

<a id="f-doxcn4EoCXGHfbgLPhcIqNQcHJc"></a>

##### 参考资料

<div style="margin-left:25px"><p id="f-doxcnfjmdqrif0lZizRObOJU43e"><span><span><a href="https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents"><span>https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents</span></a></span></span></p></div>


<a id="section-0127"></a>
## ClawCode Harness工程详解

<a id="f-doxcnwGyPOA7uJi8Wh6veJ1Q7uc"></a>

<blockquote id="f-doxcntgnFfb7U8bFbSfGhygzQCP"><p id="f-doxcnKXFGGK5SLqxlpuFN6MREbf"><span>Claude Code泄漏发生后，韩国开发者 Sigrid Jin 发起了 </span><span style="font-weight:bold">Claw Code</span><span> 项目——用 AI 编排工具指挥多个 coding agent 并行工作，在 </span><span style="font-weight:bold">3 天内</span><span>将 Claude Code 的核心功能从 TypeScript 重写为 Rust（48,599 行），产生了 292 个 commit。整个过程中人类几乎不写代码，只负责方向决策和任务分解。</span></p>
<p id="f-doxcnXCjoSDF0JI7Vhzz3rUloIf"><span>这个项目破了Github涨星最快的记录，除了乘上了CC的热度外，更在于它完整展示了一套 使用Harness工程进行Vibe Coding的技巧 —— 如何用 AI 工厂模式完成大规模代码迁移同样值得学习。</span></p>
<p id="f-doxcnh0Zd9iD33riLQt15BX6oTv">该项目可用于学习 Coding Agent 的实现思路。</p></blockquote>

<a id="f-doxcnKLVEMFUnbRsr4Gs9EjmEBb"></a>

##### 整体方法论：五阶段流水线

<p id="f-doxcnNanjcJlCBYAZIwe9Bd8gYv"><span>Claw Code 的核心思路是：</span><span style="font-weight:bold">先把"什么需要被实现"变成机器可查的清单，再边实现边用 mock harness 自动验证行为对等性。</span></p>

<p id="f-doxcnwZTgeNTbhZtT6S4FaBSIme"><span>整个流程分五个阶段：</span></p>

<pre id="f-doxcnzdoJNWHlMqPjuFhkGQT4Cd"><code>阶段一：归档 + 快照 → 把原始 TS 代码表面提取为结构化 JSON（建立"真相基线"）
阶段二：Python 镜像工作区 → 1:1 结构占位 + 架构模型（理解原始系统）
阶段三：Parity Tracking → 量化覆盖率，进度可测量、可审计
阶段四：Mock Parity Harness → 确定性端到端测试，行为可验证
阶段五：多 Agent 并行执行 → Discord 指挥 + clawhip/OmX/OmO 协调</code></pre>

<p id="f-doxcnb4O9GZlEreOsd2ahi5rvyh"><span>1~4阶段是准备。5阶段才是真正的coding。接下来我们逐一讲解。</span></p>

<a id="f-doxcnlSsNXCCvgXusCzHyOSBE8c"></a>

##### 五个阶段详解

<a id="f-doxcnT3BSq1BdTlOT3eryRRd7ub"></a>

###### 归档 + 快照原始代码表面

<blockquote id="f-doxcnzmAiHy76AumCl3J87ZYFYc"><p id="f-doxcnl07nAvAWNsMOH8t8uUq9Ne"><span>简单来说你可以理解为就是去把整个项目做一个拆解，去将ClaudeCode代码变成可以量化的文字，比如有多少工具，有多少文件，有多少Commands（就是我们讲的在Claude里面输入/models,这种叫做command)。 将大型项目变成快照，这样AI好查找，比如查找对应的某个command对应的代码是啥，做进度统计的时候也好去统计比如完成了哪些实现。这里面提到的json文件，可以在项目开源仓库中找到。</span></p></blockquote>

<p id="f-doxcnYqOpJs46AVJlxglu5JrYMf"><span>第一步不是写代码，而是</span><span style="font-weight:bold">把要重写的东西完整记录下来，形成机器可查的"参考清单"</span><span>。</span></p>

<p id="f-doxcniDizAqgJ8zJfX8bW94rdKc"><span>Claude Code 的代码组织非常规整——所有命令集中注册在 </span><span><span><span>src/commands.ts</span></span></span><span>，所有工具集中注册在 </span><span><span><span>src/tools.ts</span></span></span><span>，启动流程定义在 </span><span><span><span>src/entrypoints/cli.tsx</span></span></span><span>。每个命令/工具都是一行标准的 </span><span><span><span>import</span></span></span><span> 语句：</span></p>

<p id="f-doxcnafwYuU0SYScQ8QUsTHdW4I"><span>因为格式统一，用</span><span style="font-weight:bold">逐行字符串匹配</span><span>就能提取出所有名字和路径——不需要 AI 介入。</span></p>

<p id="f-doxcn6d9M6TIb6NyWRKxkbgNpOg"><span>具体做了三件事：</span></p>

<ol start="1"><li id="f-doxcnGEsRwIxx8sGaaJPiVXi4Xg"><span style="font-weight:bold">获取原始 TypeScript 源码快照。</span><span> 将 Claude Code 的原始 TS 源码存放在 </span><span><span><span>archive/claude_code_ts_snapshot/src</span></span></span><span>（在 </span><span><span><span>.gitignore</span></span></span><span> 里忽略，不公开上传），作为本地参考基准。</span></li></ol>

<ol start="2"><li id="f-doxcnPox2ElZAFefgKoSJrA4NEN"><span style="font-weight:bold">compat-harness 自动提取清单。</span><span> 仓库中的 </span><span><span><span>rust/crates/compat-harness</span></span></span><span> 是一个 Rust crate，专门解析上游 TS 源码：扫描 </span><span><span><span>commands.ts</span></span></span><span> 逐行匹配 </span><span><span><span>import { xxx } from "./commands/..."</span></span></span><span>，提取出 207 个斜杠命令；扫描 </span><span><span><span>tools.ts</span></span></span><span> 提取 184 个工具模块；扫描 </span><span><span><span>cli.tsx</span></span></span><span> 搜索关键词提取启动流程的 7 个阶段。这是一个"活的"提取器——当上游 TS 代码更新时可重新运行，自动刷新清单。</span></li></ol>

<ol start="3"><li id="f-doxcneSSeEfJ1zloR05Ye3qNlic"><span style="font-weight:bold">生成结构化快照 JSON。</span><span> 提取结果固化为四组 JSON 文件，存放在 </span><span><span><span>src/reference_data/</span></span></span><span> 目录：</span></li></ol>

<div id="f-doxcn3GEV2BNmKJNcWGPEfMHcGh" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span><span><span>archive_surface_snapshot.json</span></span></span><span>：原始仓库的整体结构（18 个根文件、35 个子目录、1,902 个 TS 文件）</span></div></div>

<div id="f-doxcnTuGpUdfC38hy7RuIZK079c" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span><span><span>commands_snapshot.json</span></span></span><span>：所有命令的 name + source_hint + responsibility（207 条）</span></div></div>

<div id="f-doxcn6PD0QhIbPQVpMRGtBghIdg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span><span><span>tools_snapshot.json</span></span></span><span>：所有工具模块的 name + source_hint + responsibility（184 条）</span></div></div>

<div id="f-doxcnSTmEeKqgzkX3x0EThmHZQa" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span><span><span>subsystems/*.json</span></span></span><span>（29 个文件）：各子系统的模块数和样本文件名（assistant、bridge、utils 等）</span></div></div>

<p id="f-doxcnvF7mM2ClZIoN5EeP8LvMZb"><span>这些清单的用途：</span><span style="font-weight:bold">量化 scope</span><span>（"一共 207 个命令 + 184 个工具"→ 可估算工作量）、</span><span style="font-weight:bold">定位参考代码</span><span>（AI 收到工单时知道去哪个文件读原始逻辑）、</span><span style="font-weight:bold">发现复杂度分布</span><span>（</span><span><span><span>BashTool</span></span></span><span> 有 18 个子模块是最复杂的）、</span><span style="font-weight:bold">覆盖率审计</span><span>（随时对比已实现多少）。局限性：这种字符串匹配</span><span style="font-weight:bold">只适用于代码结构规整的项目</span><span>，如果用动态注册或插件扫描就行不通。</span></p>

<a id="f-doxcnboFWdjxMjdGbTNdQImqTtd"></a>

###### Python 镜像工作区

<blockquote id="f-doxcnNhoBfEfyD9d0xijMOYvlKc"><p id="f-doxcnfEev6PJV6u2OQfhnsUVtcg"><span>   可以理解为建立索引。上面是把Claude Code拆解了，拆解成json，让AI好查找。现在是把这个Claude Code 变成一个python的骨架，这个骨架代码没实现，但是AI可以很快看出它的目录，他是如何启动的，整个流程是啥。相当于给了AI一个空壳，虽然没有实现，但是本案例通过空壳可以快速知道项目结构，启动流程。</span></p></blockquote>

<p id="f-doxcnYKBw79lrKWabiZytJaz90g"><span>不直接从 TS 翻 Rust——直接翻译等于盲写。原始 TS 有 1,902 个文件、51 万行代码，AI agent 拿到工单后如果要自己在里面翻找架构信息，效率极低且容易遗漏。Claw Code 先建了一个 </span><span style="font-weight:bold">Python 中间层</span><span>——一个只有 67 个文件的轻量"沙盘模型"，让 AI agent 在后续 Rust 重写时可以先查这个中间层快速定位，而不需要大海捞针。</span></p>

<p id="f-doxcnifl1sxsAmdTzxEhHYGNY5d"><span>这个 </span><span style="font-weight:bold">Python 中间层包含四样东西</span><span>：</span></p>

<p id="f-doxcnpFlg2QP2EJbD6LBAE54wod"><span style="font-weight:bold">1:1 结构映射表。</span><span><span><span>src/parity_audit.py</span></span></span><span> 定义了 TS→Python 的完整映射关系，原始的 18 个根文件和 35 个子目录全部有对应的 Python 占位物。这张表的作用是让任何人（或 agent）一眼看清"原始系统有哪些组成部分，每个部分对应到 Python 层的哪个文件"。</span></p>

<p id="f-doxcnpATVdo48PI3ax6jYhljgEd"><span style="font-weight:bold">占位包（29 个子目录的结构索引）。</span><span> 29 个子目录（</span><span><span><span>src/assistant/</span></span></span><span>、</span><span><span><span>src/bridge/</span></span></span><span>、</span><span><span><span>src/utils/</span></span></span><span> 等）各有一个 </span><span><span><span>init.py</span></span></span><span>，但不实现任何业务逻辑。每个占位包只做一件事——从 JSON 加载该子系统的元数据，导出 </span><span><span><span>MODULE_COUNT</span></span></span><span>（有多少模块）和 </span><span><span><span>SAMPLE_FILES</span></span></span><span>（包含哪些文件）。当 AI agent 收到"实现 assistant 模块"的工单时，读一下占位包就知道原始子系统有 1 个模块、文件叫 </span><span><span><span>sessionHistory.ts</span></span></span><span>，然后直接去对应的 TS 源码中精准阅读，而不需要在 1,902 个文件里盲目搜索。</span></p>

<p id="f-doxcnVey0VlnSfgdvODtfBdxrQE"><span style="font-weight:bold">关键架构模型（5 个 Python 文件复现核心决策逻辑）。</span><span> 光知道"有哪些模块"不够，还需要知道"系统怎么运转"。Python 层用 5 个文件把原始系统最关键的几条逻辑管线提取出来，编码为可运行的 Python 代码：</span></p>

<div style="margin-left:25px"><div id="f-doxcnVImDdLyxGDgYXIC1qY51ld" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span><span><span>bootstrap_graph.py</span></span></span><span>：启动流程的 7 个阶段——prefetch → 环境检查 → CLI 解析 → 命令加载 → 延迟初始化 → 模式路由 → 查询主循环</span></div></div><div id="f-doxcnt4ELoqSsCs85RHDOfGshcd" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span><span><span>command_graph.py</span></span></span><span>：把 207 个命令分类为 builtins（185）、plugin-like（20）、skill-like（2）</span></div></div><div id="f-doxcnRz9TbnYkxqI8xjSgP1BwIe" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span><span><span>query_engine.py</span></span></span><span>：复现查询引擎的 turn-loop 行为——轮次限制（max turns）、token 预算执行（max budget）、消息压缩触发（compaction）。这里有真实的状态管理逻辑，不是 stub</span></div></div><div id="f-doxcnQFty9X9QTCROes3L4T8sRe" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span><span><span>setup.py</span></span></span><span>：建模 workspace 环境发现和启动 preflight 流程</span></div></div><div id="f-doxcnUWEfAs3IWM4xwrWzRBjtvh" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span><span><span>runtime.py</span></span></span><span>：建模运行时路由——把用户的 prompt 分词、和所有命令/工具的名字做匹配打分、返回 top-N 结果。这也是真实的匹配算法，给一个 prompt 会返回实际的路由结果</span></div></div></div>

<p id="f-doxcnukTRXkwjNBnfhGGPD0kJfo"><span style="font-weight:bold">可运行的审核 CLI。</span><span> Python 层提供了 </span><span><span><span>python -m src.main</span></span></span><span>（40+ 个子命令），供人类和 AI agent 随时验证中间层的自洽性：</span><span><span><span>summary</span></span></span><span> 输出工作区摘要，</span><span><span><span>parity-audit</span></span></span><span> 对比覆盖率（确保没有遗漏的模块），</span><span><span><span>route &lt;prompt&gt;</span></span></span><span> 验证路由逻辑是否和预期一致，</span><span><span><span>bootstrap &lt;prompt&gt;</span></span></span><span> 跑通完整的启动→路由→执行→历史记录流程。这个 CLI 同时也是 Rust 重写的</span><span style="font-weight:bold">行为基准</span><span>：Rust 版的路由结果应该和 Python 版匹配，不匹配就说明实现有偏差。</span></p>

<a id="f-doxcnrzmm9C9alG5cuv3fVRTu0d"></a>

###### 量化重写进度

<blockquote id="f-doxcntJJtoXfIhin6ib9b51pBpe"><p id="f-doxcnTRlgf1pDMxbZ1pYqEDA54g"><span>  其实就是进度表。我们的rag 项目其实也有进度表，但是没有他这么细致。它的进度表定义了文件覆盖率，目录覆盖率，目标覆盖率等，同时定义了AI如何开发，将整个项目开发分成9个可以并行的模块，这些设计需要你对Claude Code项目本身有一定的理解。里面的Parity.md就是进度表，大家在源码中可以看到。</span></p></blockquote>

<p id="f-doxcnueZ5ZqVbTAm323jb24kjDc"><span>核心思想：把"重写进度"从感觉变成</span><span style="font-weight:bold">机器可检查的量化指标</span><span>。具体是通过三样东西实现的：</span><span style="font-weight:bold">一个自动审计脚本、两份 PARITY 清单文档、以及一个 9-lane 并行开发模型。</span></p>

<p id="f-doxcnbkhBpVRDJT3MyQdirGF1Fc"><span style="font-weight:bold">自动审计脚本。</span><span><span><span>parity_audit.py</span></span></span><span> 中的 </span><span><span><span>run_parity_audit()</span></span></span><span> 自动扫描当前代码库，计算四个维度的覆盖率：根文件覆盖率（18 个中实现了多少）、目录覆盖率（35 个中覆盖了多少）、命令覆盖率（207 个中实现了多少）、工具覆盖率（184 个中实现了多少），并列出所有缺失的目标。测试中有断言确保覆盖率只升不降——写了一个新模块覆盖率上去了，后面不允许退化回来。</span></p>

<p id="f-doxcnkiWQTvNaHfExzXtQHySR8f"><span style="font-weight:bold">PARITY.md 双层清单。</span><span> 项目维护两份 PARITY 文档，分别追踪不同粒度的进度：</span></p>

<div style="margin-left:25px"><div id="f-doxcn8V9sWr1eUf6JMLDdHOxlxb" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">顶层 </span><span style="font-weight:bold"><span><span>PARITY.md</span></span></span><span>：记录 9 条开发 lane 的宏观状态——每条 lane 的 feature commit hash、merge commit hash、diff 行数统计，做到全程可追溯</span></div></div><div id="f-doxcnhJRpqBrOGDblJfb8686laf" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold"><span><span>rust/PARITY.md</span></span></span><span>：更细粒度，对 40 个工具逐个标注实现深度，分四档：strong parity（行为完全对齐）、good parity（核心路径对齐）、moderate parity（基本可用）、stub（仅占位）</span></div></div></div>

<p id="f-doxcnsLfRP98MF5RhZCrtMrRqdd"><span style="font-weight:bold">9-lane 并行开发模型。</span><span> 人类根据前两个阶段产出的清单，把重写工作切分为 9 条相互独立的 lane，每条一个 feature branch，可以由不同的 AI agent 并行推进，互不阻塞：</span></p>

<div style="margin-left:25px"><div id="f-doxcnZvAJxPISeIIgGSrHyD8kCF" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">Lane 1 — Bash validation</span><span>：9 个验证子模块（+1,005 行）</span></div></div><div id="f-doxcne14YziggFDKXgGooX4HpMf" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">Lane 2 — CI fix</span><span>：sandbox 探测修复（+22/-1 行）</span></div></div><div id="f-doxcnPH345f2YdxkeUNpj4tKDTg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">Lane 3 — File-tool</span><span>：边界检查——二进制检测、大小限制、路径穿越防护（+195/-1 行）</span></div></div><div id="f-doxcn1ARpUKxFCsbYnKJMLi4OVb" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">Lane 4 — TaskRegistry</span><span>：内存任务生命周期管理（+336 行）</span></div></div><div id="f-doxcn0dyF40ZVdhhMsmF1nvAiQf" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">Lane 5 — Task wiring</span><span>：6 个 task 工具接入 registry（+79/-35 行）</span></div></div><div id="f-doxcnf2PqIcXKKR0NSg2D2f42zf" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">Lane 6 — Team+Cron</span><span>：团队和定时任务注册表（+441/-37 行）</span></div></div><div id="f-doxcniLr6USeigeGCJi3QF4X7Xe" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">Lane 7 — MCP lifecycle</span><span>：MCP 服务器连接、资源、工具分发桥接（+491/-24 行）</span></div></div><div id="f-doxcnIrCZ4hsWmo9glSsFMC3fSc" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">Lane 8 — LSP client</span><span>：LSP 诊断、hover、定义、引用、补全（+461/-9 行）</span></div></div><div id="f-doxcnpHICCD04Rr5ZYw1iWlGBCf" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">Lane 9 — Permission enforcement</span><span>：工具门禁、文件写入边界、bash 只读检查（+357 行）</span></div></div></div>

<p id="f-doxcnr1HdZow67KzHKzPcumpxyg"><span>每条 lane 独立 merge，互不阻塞。PARITY.md 中记录了每条 lane 的 feature commit hash 和 merge commit hash，做到</span><span style="font-weight:bold">全程可追溯</span><span>。</span></p>

<a id="f-doxcntsiLdqRfDpwhQvvxu6idGc"></a>

###### 确定性行为验证

<blockquote id="f-doxcne6ZAgBFsosFf0wmOt09a1d"><p id="f-doxcnQLFCpAilOs5Do6WVo8PF7g"><span>虽然不同的厂商的Harness工程其实是有区别的，不过对于这一点，是统一的。我们在上面讲Harness工程的原则以及Anthropic公司的Harness的例子都涉及了。就是你不要让AI来判断是否完成，而是给出量化标准，脚本。所以这里需要设计一些让AI执行，评估的脚本。AI通过这些标准和脚本来判断是否完成，记录到项目进度（2.5.2.3讲的parity.md）中。</span></p></blockquote>

<p id="f-doxcn2YBWHnc4RgktNVDx6AZ95c"><span>重写不能靠"编译通过就算对"，但也不能每次测试都调真实 Anthropic API（贵、慢、结果不确定）。解法是建一套</span><span style="font-weight:bold">确定性的端到端测试体系</span><span>，不调真实 API 也能验证 Rust 重写的行为是否和原始系统一致。这套体系由三样东西组成：一个 mock 服务、一组场景脚本、以及一个双向验证工具。</span></p>

<p id="f-doxcnwzxgXoLgCbNZLchrUPsVuf"><span style="font-weight:bold">Mock Anthropic 服务。</span><span><span><span>rust/crates/mock-anthropic-service</span></span></span><span> 是一个独立 Rust crate，实现了 Anthropic 兼容的 </span><span><span><span>/v1/messages</span></span></span><span> 端点。它不调真实模型，而是返回</span><span style="font-weight:bold">预编排的</span><span> SSE 流式响应，可以脚本化多轮对话，每次运行结果完全相同。CLI 通过设置 </span><span><span><span>ANTHROPIC_BASE_URL</span></span></span><span> 指向这个本地服务，就可以在完全离线、零成本的环境下跑端到端测试。</span></p>

<blockquote id="f-doxcnLsDNGDtdgbnZmqi7OVZN1v"><p id="f-doxcnIqZGBGU5cAYkBcAGn3YFuf"><span>这个场景脚本其实就是一些测试用例，进度文档需要根据这些测试用例来判断是否将某些模块标记为完成。</span></p></blockquote>

<p id="f-doxcncRdQU8yqZf2PT9626ebxDf"><span style="font-weight:bold">10 个场景脚本。</span><span> 在 </span><span><span><span>mock_parity_scenarios.json</span></span></span><span> 中定义了 10 个测试场景，覆盖了核心工具链路、权限拒绝、多工具同轮、插件路径等关键行为。每个场景都通过 </span><span><span><span>parity_refs</span></span></span><span> 字段指向 PARITY.md 中的具体条目，确保测试和文档一一对应：</span></p>

<div style="margin-left:25px"><div id="f-doxcnVG26IUicG7ZBDQzZiWRQ8f" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span><span><span>streaming_text</span></span></span><span>（baseline）：纯文本流式响应，无工具调用</span></div></div><div id="f-doxcnr29UUxtihkrtAH84vn4jdc" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span><span><span>read_file_roundtrip</span></span></span><span>（file-tools）：文件读取往返</span></div></div><div id="f-doxcnSEb5f3D5Edt3Yf6SCvsaJd" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span><span><span>grep_chunk_assembly</span></span></span><span>（file-tools）：grep 分块 JSON 组装</span></div></div><div id="f-doxcnbHGjBL2ZzVNAk0fkpOYMZg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span><span><span>write_file_allowed</span></span></span><span>（file-tools）：workspace-write 模式下写入成功</span></div></div><div id="f-doxcnavMbZIRG5qVIksFvB6Rjwh" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span><span><span>write_file_denied</span></span></span><span>（permissions）：read-only 模式下写入被拒绝</span></div></div><div id="f-doxcnIpSLLGE3FRMWZgBOiZEiVc" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span><span><span>multi_tool_turn_roundtrip</span></span></span><span>（multi-tool）：同一 turn 内执行多个工具</span></div></div><div id="f-doxcnJUV0uy2P7Hgr555YGipKxc" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span><span><span>bash_stdout_roundtrip</span></span></span><span>（bash）：bash 执行和 stdout 往返</span></div></div><div id="f-doxcnkXaKPu2ShywsT0GIyeQHRc" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span><span><span>bash_permission_prompt_approved</span></span></span><span>（permissions）：bash 权限提示 → 批准</span></div></div><div id="f-doxcnHC47S9VqKzhZV0vkx1Eagg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span><span><span>bash_permission_prompt_denied</span></span></span><span>（permissions）：bash 权限提示 → 拒绝</span></div></div><div id="f-doxcnm01XI5ZLf4TwAjckolP2Sb" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span><span><span>plugin_tool_roundtrip</span></span></span><span>（plugin）：加载外部插件工具并执行</span></div></div></div>

<blockquote id="f-doxcn365BUN80TDUpLm71BsuXze"><p id="f-doxcnqnvXc0ZdIHCllOz2ACS4dd"><span>我们做rag项目的时候，就有进度文档和实际代码可能不一致的问题，这里他给出了解决方案。用专门的脚本来判断二者是否发生偏移，发生偏移了及时纠正。</span></p></blockquote>

<p id="f-doxcnbHvBLdOfA9c8oSRKPmcXGe"><span style="font-weight:bold">双向验证工具（防止文档和代码漂移）。</span><span><span><span>run_mock_parity_diff.py</span></span></span><span> 做两件事：先遍历每个场景脚本的 </span><span><span><span>parity_refs</span></span></span><span>，确认每条引用在 PARITY.md 中</span><span style="font-weight:bold">确实存在</span><span>（找不到就报错）；再运行 </span><span><span><span>cargo test</span></span></span><span> 输出每个场景的通过状态。这意味着 PARITY.md 不只是给人看的文档——它是场景清单的</span><span style="font-weight:bold">锚点</span><span>，文档改了但测试没更新、或者测试加了场景但文档没跟进，都会被这个工具检测到。</span></p>

<a id="f-doxcnB42E8lhkwOl1d2rns5tBIb"></a>

###### 多Agent协作执行

<blockquote id="f-doxcnwsSy6K8fcaUKbZAl37t4Uc"><p id="f-doxcn1KoOlEBWUhBngCAff8bZSe">执行阶段采用多个 Agent 并行工作，并通过三个专用工具进行调度、执行与监控。可以结合参考仓库研究其模块分工、任务依赖与验证方法。</p></blockquote>

<p id="f-doxcnnatNZtEXvqphsAvqNsslHk"><span>如 </span><span><span><span>PHILOSOPHY.md</span></span></span><span> 所述，这个项目的核心哲学是：</span><span style="font-weight:bold">人类提供方向，claws（AI agent）执行劳动</span><span>。</span><span style="font-weight:bold">前四个阶段建好了清单、中间层、进度条和测试题，第五阶段就是让多个 AI agent 并行干活，人类只在关键节点介入。</span></p>

<p id="f-doxcn3o1mJIcND7MKyTYnVJ5eUd"><span>为了实现这一点，项目作者编写了三个专用编排工具（不是通用框架，而是为这套 Vibe Coding 工作流定制的）：</span></p>

<ul><li id="f-doxcnk4VgJfGWGDG4KyZBptAWNc"><span style="font-weight:bold">OmX</span><span>（oh-my-codex）——</span><span style="font-weight:bold">任务拆解器</span><span>：把一句话指令转化为结构化工单，定义子任务、执行模式和验证标准（仓库地址：</span><span><span><a href="https://github.com/Yeachan-Heo/oh-my-codex"><span>https://github.com/Yeachan-Heo/oh-my-codex</span></a></span></span><span>）</span></li></ul>

<ul><li id="f-doxcn2bp0RTpV4ujIfrMuk0fzUA"><span style="font-weight:bold">clawhip</span><span> ——</span><span style="font-weight:bold">后台监控员</span><span>：监听 git commits、CI 结果、PR 状态、agent 生命周期事件，在 agent 上下文窗口之外独立运行，只推送通知不干扰执行（仓库地址：</span><span><span><a href="https://github.com/Yeachan-Heo/clawhip"><span>https://github.com/Yeachan-Heo/clawhip</span></a></span></span><span>）</span></li></ul>

<ul><li id="f-doxcncFoSLMzaJCl8T5nWvFU9ub"><span style="font-weight:bold">OmO</span><span>（oh-my-openagent）——</span><span style="font-weight:bold">角色协调员</span><span>：管理 Architect/Executor/Reviewer 之间的分工和分歧解决，确保多 agent 循环收敛而不是无限争吵。（仓库地址：</span><span><span><a href="https://github.com/code-yeongyu/oh-my-openagent"><span>https://github.com/code-yeongyu/oh-my-openagent</span></a></span></span><span>）</span></li></ul>

<p id="f-doxcnbeexbuLSJA8OBTfs9uATqg"><span>有了这三个工具，加上前四个阶段建好的清单和测试，就能实现"人类发指令、agent 自主干活"的工作流。</span><span style="font-weight:bold">完整流程如下：</span></p>

<pre id="f-doxcnCa5Q7xPvbACw2LwArbR6ye"><code>人类发指令 → OmX 拆任务 → OmO 分角色/启动 agent
→ agent 自主循环（写码→测试→修复）
→ clawhip 后台监控推送事件
→ 人类只在失败或完成时介入判断</code></pre>

<ol start="1"><li id="f-doxcnslg4uKInyEar2Cp3J5aRQc"><span style="font-weight:bold">人类输入一句高层指令</span><span>（通过 Vibe Coding 工具），例如："实现 Lane 3：给 file tool 加边界检查"</span></li></ol>

<ol start="2"><li id="f-doxcnbMUsZNaxjFDReuGrHFspwb"><span style="font-weight:bold">OmX 自动拆解</span><span>成子任务（二进制检测、大小限制、路径穿越防护），确定执行模式（并行/串行）和验证标准（cargo test + mock parity 通过）</span></li></ol>

<ol start="3"><li id="f-doxcneiwPZiR36e5O9oH7BjOLjb"><span style="font-weight:bold">OmO 分配角色并启动 agent</span><span>：Architect 规划方案、Executor 写代码、Reviewer 审查质量。多组 agent 在服务器上并行工作</span></li></ol>

<ol start="4"><li id="f-doxcnKqWZxSkejTCZJ2GMoLyl8d"><span style="font-weight:bold">Agent 自主循环</span><span>：写代码 → 跑测试 → 失败 → 读错误 → 改代码 → 再跑测试。Reviewer 不满意就打回重做，OmO 协调分歧直到收敛。</span><span style="font-weight:bold">全程不需要人类参与</span></li></ol>

<ol start="5"><li id="f-doxcnYcQlhW5uSOZMNOEZPWs9Jf"><span style="font-weight:bold">clawhip 在后台监控</span><span>所有事件（</span><span><span><span>lane.started</span></span></span><span>、</span><span><span><span>lane.commit.created</span></span></span><span>、</span><span><span><span>lane.red</span></span></span><span>、</span><span><span><span>lane.green</span></span></span><span>、</span><span><span><span>lane.pr.opened</span></span></span><span>、</span><span><span><span>lane.finished</span></span></span><span> 等），向人类推送状态通知，但</span><span style="font-weight:bold">不打扰正在干活的 agent</span><span>——agent 的上下文窗口是宝贵资源，不能被监控噪音占据</span></li></ol>

<ol start="6"><li id="f-doxcnsr0cOVeFNRrx8lohxsepZd"><span style="font-weight:bold">人类只在两种情况介入</span><span>：agent 自己恢复不了的失败（决定重试还是换方案），或 lane 完成后判断能否 merge</span></li></ol>

<a id="f-doxcn760vjpmQ7WSBNgbFEqa09g"></a>

##### 设计原则

<p id="f-doxcncG6l5WiViUo85muyiojlEf"><span>这套方法论的核心是四条设计原则：</span></p>

<ol start="1"><li id="f-doxcnj9c23hqlOfnV43fI9fxNEc"><span style="font-weight:bold">人定标准，AI 执行。</span><span> 所有判断标准由人预先制定——覆盖率数字、parity 标签体系（strong/good/moderate/stub）、mock 场景清单。AI agent 不需要自己判断"够不够好"，只需对照人制定的验收标准逐项打勾。</span></li></ol>

<ol start="2"><li id="f-doxcnzKaQvL2sRkmnh4JXCDGy3b"><span style="font-weight:bold">建中间层，降低 AI 认知成本。</span><span> 51 万行 TS 太大，AI 无法每次从头阅读。用 JSON 索引 + Python 骨架建一个轻量参考层，让 agent 查一下就能定位和理解，而不需要大海捞针。</span></li></ol>

<ol start="3"><li id="f-doxcnYFphkQowZfBJcqSZmSuOUh"><span style="font-weight:bold">用工具编排多 agent，而非人工协调。</span><span> Python 脚本生成"做什么"（清单），OmX/clawhip/OmO 三件套负责"谁来做、怎么分发、怎么验收"，人类不需要坐在终端前逐个分配任务。</span></li></ol>

<ol start="4"><li id="f-doxcnJntn6T2NS5l74zZqTpCdvc"><span style="font-weight:bold">人只做方向、分解、判断。</span><span> 人基于架构理解把工作拆成 9 条独立 lane，定义 lane 边界和合入标准。292 个 commit 中，人的贡献集中在：重写什么（方向）、怎么拆（分解）、何时 merge（判断）。剩下的全是 agent 的事。</span></li></ol>

<a id="f-doxcnc4vBiKtv0kczLgTLY4ELxc"></a>

##### 项目地址

<blockquote id="f-doxcnEicXMn13j41uXC4xjXcMyb"><p id="f-doxcnQDC2Y8kFOGHwiT2ZaRIcxh">这个项目可用于学习 Harness 技巧、设计方法和复现过程，并进一步实现具有类似能力的 Coding Agent。</p></blockquote>

<p id="f-doxcnAPGeCxq5sfNVgPyr6W6vUh"><span><span><a href="https://github.com/seavee/ClawCode"><span>https://github.com/seavee/ClawCode</span></a></span></span></p>

<a id="f-doxcnzuins5ynGpQsllojtFf0cf"></a>

##### 讲解视频

<p id="f-doxcnvP637NPAumh7pXDc1eDtoh"><span><span><a href="https://www.bilibili.com/video/BV1CqQcBqEbU/?vd_source=144bec9c3f54e465073138bed788be1b"><span>https://www.bilibili.com/video/BV1CqQcBqEbU/?vd_source=144bec9c3f54e465073138bed788be1b</span></a></span></span></p>


<a id="section-0128"></a>
## 面试问题速览

<a id="f-doxcnmZIQzGrH8mrwjBzqhWn3ic"></a>

<p id="f-doxcnaHNYmAMdaEplP7gflc90Rg"><span>（刚才上面的文档是给大家理解学习用的，整个章节的问题是供大家面试时直接照着回答的）</span></p>

<a id="f-doxcn4nOGryK40hN6TaTRpInVSg"></a>

##### 什么是 Harness Engineering？

<p id="f-doxcn0eN61h4X4di805wITUxCAb"><span>Harness Engineering 是围绕 AI 模型构建运行环境、调度机制和管控基础设施的一种工程实践。它的目标不是单纯让模型“更聪明”，而是让 AI Agent 在长时、复杂、多步骤的真实任务中，能够稳定、可靠、可控地持续运行。</span></p>

<p id="f-doxcneGatYWYNC6HEz0N5BXhjfe"><span>如果用一句更通俗的话来说，Harness Engineering 做的事情，就是不再把 AI 当成一个一次性回答问题的黑盒，而是把它放进一个被设计好的工作系统里，让它按规则做事。</span></p>

<p id="f-doxcn2dsBospCzZDzRgabd4cd1d"><span>它背后的设计哲学也很重要：模型只是原材料，环境才决定结果能不能落地。</span></p>

<p id="f-doxcnXUfgI1V1Bm3SRM3rZemceg"><span>再强的模型，如果直接裸跑长任务，也会遇到上下文腐化、失忆、幻觉完成、任务漂移等问题。所以 Harness Engineering 的核心，不是继续往模型上堆能力，而是通过外部记忆、任务拆解、测试门禁、状态交接和人工审核，把 AI 的执行过程工程化。</span></p>

<a id="f-doxcnlGzblfAFKJarCp8RbLGGtf"></a>

##### Harness Engineering 想解决的核心问题是什么？

<p id="f-doxcnYNmmAvNGii4arFJdxgk6hg"><span>它主要解决的是 AI 在长时任务里的可靠性问题。</span></p>

<p id="f-doxcnmCp6bSAQLJKMlDsPmNsBZe"><span>第一个问题是 Context Rot，也就是上下文腐化。模型做长任务时，上下文窗口会不断被历史对话、错误尝试和无关信息填满，最后导致它丧失对原始目标的把握。</span></p>

<p id="f-doxcn5oary0ReifIqKMubtc3Egf"><span>第二个问题是 Hallucinated Completion，也就是幻觉完成。模型在复杂任务中迷失后，往往不会老实说“我不会了”，而是会输出一个看起来完成、实际上并不正确的结果。</span></p>

<p id="f-doxcnF7cScofXIQPKJOorf4iNph"><span>第三个问题是 Model Drift，也就是模型漂移。多步执行中，模型会逐渐偏离最初目标，最后做出来的东西方向就歪了。</span></p>

<p id="f-doxcn3utesqqfFD5p2MBSau7ltf"><span>所以我理解 Harness Engineering 的价值，不是让模型在单轮回答里更强，而是让它在几十步、几百步的连续工作流里，依然能沿着正确轨道往前走。</span></p>

<a id="f-doxcndZZqNyvfpPNbHkWnF4Uzkg"></a>

##### Harness Engineering 和 Prompt Engineering、Context Engineering 的关系是什么？

<p id="f-doxcn6qgCWXA2mLRcS0sbf3BiQh"><span>可以把它理解成一个演进关系，而不是替代关系。</span></p>

<p id="f-doxcnVByy5mzpdkUWzAgnp9GZoc"><span>Prompt Engineering 主要解决的是“对 AI 说什么”，也就是如何设计指令，让单次输出更好。</span></p>

<p id="f-doxcnVLmXcYqcPVjd7dfzihfEme"><span>Context Engineering 进一步解决的是“让 AI 知道什么”，也就是在一次 session 或上下文窗口里，给它什么信息、给多少信息、怎么组织信息。</span></p>

<p id="f-doxcnM6EFOsCtvZCXyKRfPGCY1d"><span>而 Harness Engineering 更进一步，它解决的是“让 AI 在什么环境里做事”。</span></p>

<p id="f-doxcnUZK8G7bNPe2RM3PAbUeVPf"><span>也就是说，Harness Engineering 并没有取代前两者，而是把它们包进了一个更大的系统里。Harness 内部的每个 session 还是要做 Context Engineering，每一次给 agent 的具体任务描述还是要做 Prompt Engineering。只是现在关注点从“优化一次对话”升级成了“设计一整个运行体系”。</span></p>

<a id="f-doxcn9Rvx0ZErciC4AZenUgEqkf"></a>

##### Harness Engineering 的最佳实践是什么？

<p id="f-doxcnkJSx0PHNGPTEBSIfhyhhfh"><span>我会总结成几个比较关键的实践原则。</span></p>

<p id="f-doxcnHJufthumoO2h3urG2ysPcg"><span>第一，状态外部化。不要把连续性寄托在模型记不记得，而要把状态写进文件、Git 或数据库，让系统本身有记忆。</span></p>

<p id="f-doxcn09DOhwher8ZioC2IU4xdBf"><span>第二，任务原子化。不要让一个 agent 一口气做一个大需求，而是拆成足够小、足够明确的原子任务，每次只做一件事。</span></p>

<p id="f-doxcnxbANFwmGCH5sNlJ1O3VREe"><span>第三，上下文刷新。很多先进的 harness 架构都会在一个小任务完成后销毁当前 agent，再启动一个全新的 agent 来继续做下一轮。这么做的目的，就是从根本上避免上下文腐化。</span></p>

<p id="f-doxcnY8Y1dq6Em4hYPPVwocDHyh"><span>第四，验证优先。AI 的输出必须经过测试和规则检查，而不是靠它自我声明“完成了”。这是把模型主观判断变成工程确定性的关键。</span></p>

<p id="f-doxcnDYri06XVOefujs9CLBgbcg"><span>第五，按需暴露工具和技能。不要一次给模型上百个工具，而应该通过 skills、toolkits 或 task routing，让它按需加载当前任务相关的工具和说明。</span></p>

<p id="f-doxcnDKcYGUBlstPESql0EI8jwO"><span>第六，在关键点加入 Human-in-the-loop。尤其是高价值任务或者多步骤流程里，人工审核断点很重要，它不是系统失败的表现，而是提高整体可靠性的工程设计。</span></p>

<p id="f-doxcnah2qNi71Y2DLBs6S8xc3id"><span>第七，保持轻量、模块化、模型无关。因为模型变化很快，如果 Harness 和某个模型耦合太深，很快就会过时。所以好的 Harness 应该能在尽量少改动的情况下替换模型、替换技能、替换验证逻辑。</span></p>

<a id="f-doxcnHorhkRgqZpzBpISu09qbBg"></a>

##### 如果让你用Harness工程来实现一个项目，你怎么设计？

<p id="f-doxcnCw73BnZ3ojzYFt1JMhr0Ph"><span>（套用我们上面学的Anthropic公司的方案，也可以在那个问题中通过整个回答介绍Anthropic公司的Harness方案，灵活运用，学了就不浪费）</span></p>

<p id="f-doxcnCVCLZUlA3Q46wh43gFbyKd"><span>如果让我来落地一个 Harness，从一个 Initializer + Coding Loop 的最小闭环开始，而不是一开始就做复杂的多 agent 平台。</span></p>

<p id="f-doxcnGh0lCDC6a64sdUYR1pDH6f"><span>第一步，</span><span style="font-weight:bold">可以先准备一份清晰的 App Spec / PRD</span><span>，把产品目标、功能范围和验收标准定义清楚。因为在 Anthropic 的架构里，系统起点不是直接写代码，而是先把需求整理成后续 agent 可以反复执行的任务蓝图。</span></p>

<p id="f-doxcn8fXUdUxWxAIgOJJ4RhjLXe"><span>第二步，</span><span style="font-weight:bold">我会实现一个 Initializer Agent</span><span>。它的职责不是写业务代码，而是读取需求文档，把大任务拆成一组细粒度、可执行、可验证的 feature，并生成类似 </span><span><span><span>feature_list.json</span></span></span><span> 这样的状态文件。同时它还会初始化项目骨架、代码仓库，以及后续循环执行所需的基础环境。这样系统就先有了“任务清单”和“状态来源”。</span></p>

<p id="f-doxcnlfL6Z6oKFMG5UM7OV3ACCl"><span>第三步，</span><span style="font-weight:bold">我会实现一个 Coding Loop</span><span>。每一轮都启动一个全新的 coding agent，让它只读取当前状态文件、进度记录和代码库信息，只完成一个明确的小任务。任务完成后，不是让 agent 自己宣布成功，而是必须经过测试、lint 或类型检查等确定性验证；只有验证通过，才更新状态文件、写入交接记录并提交代码。然后这个 agent 立即退出，下一轮由新的 agent 接力。</span></p>

<p id="f-doxcnyQz8ODzNLwxktgK91nNDqh"><span>第四步</span><span style="font-weight:bold">，可以把 外部记忆 做成系统核心</span><span>，而不是把连续性寄托在模型上下文里。也就是说，我会依赖 feature list、progress file、Git log 这些可持久化信息，让每个新 agent 启动时都能快速接手，而不是依赖前一轮 session 的“记忆”。</span></p>

<p id="f-doxcnz7LXdqTJHd9PgoN5AfRKzg"><span>第五步，</span><span style="font-weight:bold">我会在关键节点加入 Human-in-the-loop</span><span>。Anthropic 的方法虽然高度自动化，但并不是完全无人值守。所以在高风险功能、关键界面变更或者多轮失败之后，可以设计人工确认断点，确保系统不会沿着错误方向持续推进。</span></p>

<p id="f-doxcntkWNLGKTObXswhCdWMqsbg"><span>整体上，我不会把重点放在“怎么让一个模型一次做完所有事”，而是把重点放在：</span><span style="font-weight:bold">先拆解、再循环执行、靠外部状态保持连续性、靠确定</span><span>性验证保证质量。可以认为这是一种更可落地、也更适合真实工程环境的 Harness 实现方式。</span></p>

<a id="f-doxcnUbIWLrXu15PzV14x8kShXg"></a>

##### 你看过哪些 Harness 工程的实际案例，可以分享一下吗？

<p id="f-doxcntzrpJKXA6jLyvO9flpnd3d"><span>我比较熟悉两个案例，一个是 Anthropic 官方的 Harness 架构，一个是开源社区的 Claw Code 项目。它们一个是从零做新项目的范式，一个是重写已有大型系统的范式，刚好互补。</span></p>

<p id="f-doxcn5Vp6tKaA3JmIVJYDa4EnTd"><span style="font-weight:bold">第一个是 Anthropic 官方的 Harness 架构。</span><span> 这是一个从</span><span style="font-weight:bold">项目文档</span><span>出发做新项目的标准流程。</span><span style="font-weight:bold">核心思路</span><span>是"每个 agent 只活一次，干完就死":</span></p>

<p id="f-doxcnuSpEfwFbQaJOk6xk5JmMcf"><span>先由 Initializer 读需求文档，拆成 feature list 和验收标准，初始化项目骨架；然后进入 Coding Loop，每轮启动一个全新的 agent，它只读当前状态文件和代码库，完成一个原子任务，通过测试后更新状态文件并退出，下一轮由新 agent 接力。项目记忆全部存在外部文件（feature list、progress file、Git），不依赖任何一个 agent 的上下文窗口。验证也不靠模型自己说"完成了"，而是必须通过测试、lint、类型检查这些确定性手段。</span></p>

<p id="f-doxcnGK180nRwNkDsvx9k7ox4rb"><span>这个架构最核心的 insight 是：用"短命 agent 接力"代替"长命 agent 硬撑"，从根本上避免上下文腐化。</span></p>

<p id="f-doxcnqfS522JuEEIe2vlRjpwq6d"><span style="font-weight:bold">第二个是 Claw Code 项目。</span><span> 这是 2026 年 3 月 Claude Code 源码泄漏后，开源社区用多个 AI agent 在 3 天内把核心功能从 TypeScript 重写为 Rust 的一个实践。它和 Anthropic 方案的最大区别在于：</span><span style="font-weight:bold">它不是从零写新项目，而是重写一个已有的 51 万行系统。</span></p>

<p id="f-doxcnivJshCtHKMJPSuMhQlcYDd"><span>它的 Initializer 阶段不是读 </span><span style="font-weight:bold">项目文档</span><span>拆 feature，而是先扫描原始代码，把结构提取为机器可查的 JSON 清单，再建了一个 </span><span style="font-weight:bold">Python 中间层</span><span>作为 AI agent 的"架构速查手册"，降低 agent 理解已有系统的认知成本。验证方式也不同——因为是"重写"，所以需要验证行为一致性，它建了一个 mock API 服务做确定性端到端测试，还做了文档和测试的双向锚定防止漂移。编排上用了三个定制工具分别负责任务拆解、后台监控和角色协调，人类只负责方向、分解和 merge 判断。</span></p>

<p id="f-doxcn5EJ9kPDfc9JVU12VPTP3jd"><span style="font-weight:bold">对比来看：</span><span> 两个案例的底层原则一致——状态外部化、任务原子化、确定性验证、人只做关键决策。但适用场景不同：Anthropic 方案更适合从零开始的新项目，核心 insight 是"agent 用完即销毁"避免上下文腐化；Claw Code 更适合代码迁移和重写场景，核心 insight 是"建中间层降低 agent 认知成本"应对已有代码库的复杂性。</span></p>


<a id="section-0130"></a>
## Loop Engineering

<a id="f-doxcnULiVuVqTZphZtGLUzyOmOf"></a>

<p id="f-doxcnECm3Il5WQDkGxOSYUVwwag"><span>       Loop工程是2026年6月炒得比较火的概念，有人说是取代Harness工程进入下一个范式的技术。但是其实它并没有什么新东西。如果你在前面一步步学习了Harness这些概念，你甚至会发现很多时候其实你自己已经在使用Loop工程了。而且学起来你也会觉得很好理解，如果你有了前面Harness相关的基础，大概花个20分钟阅读一下本章节，你就能大概理解Loop工程是什么？应对面试官可能会问的几个问题：</span><span style="font-weight:bold">什么是Loop工程？它的核心要素有什么？你怎么看待Loop工程？</span></p>

<a id="f-doxcnLBPxyKsdvRjaJxZY2ovwWf"></a>

##### 背景：它是怎么火起来的

<p id="f-doxcnVCClIEeZvRAyka4QWdkfjc">下面按时间顺序介绍 Loop Engineering 相关讨论。</p>

<p id="f-doxcnFCnzE9AHwk43fJJcTK76kc"><span style="font-weight:bold">第一步，龙虾之父先点的火。</span><span> 被圈里叫"龙虾之父"的 Peter Steinberger（OpenClaw 的作者）在 X 上发帖说：别再给 coding agent 写提示词了，你应该去设计"循环"来驱动这些 agent。多个解读视频都把这条帖子认定为"loop engineering 这个词爆火的起点"——"The term loop engineering exploded after Peter Steinberger posted..."。（大概在 </span><span style="font-weight:bold">2026 年 5 月底至 6 月初</span><span>这个时间窗口）。</span></p>

<p id="f-doxcnE1WkpoHTBXZyOzEEb6w4Fd"><span style="font-weight:bold">第二步，Boris 在播客里给了关键背书。</span><span> 紧接着 Anthropic Claude Code 的负责人 Boris Cherny 在一期播客里讲了几乎一模一样的话。他的原话大意是：以前我同时跑五到十个 Claude，我的工作是写提示词让它去写代码；现在又往上抽象了一层，我已经不给 Claude 写提示词了，我跑的是一堆 loop，是这些 loop 在 prompt Claude、在决定下一步做什么——</span><span style="font-weight:bold">我的工作变成了写 loop。</span><span> 时间大概也是 </span><span style="font-weight:bold">2026 年 6 月前后</span><span>这一波讨论。</span></p>

<p id="f-doxcnLiV7X6hKbxPNFqGupfi5Xc"><span style="font-weight:bold">第三步，圈内迅速接力。</span><span> 之后 OpenAI Codex 的负责人 Tibo 转发，LangChain 的 Lance Martin 又</span><span style="font-weight:bold">赶在某个新模型发布的次日</span><span>写了篇很长的解读（文稿原话："a post that just came out with the release of [新模型] that came out yesterday was from Lance Martin"）。差不多同一时期，</span><span><span><span>/goal</span></span></span><span> 这类功能也"在过去几周里相当流行"（Ross Mike 播客原话）。当造 Codex 和造 Claude Code 的人</span><span style="font-weight:bold">不约而同</span><span>地认同同一个想法时，这事就值得认真看一看了。</span></p>

<p id="f-doxcn3SHkRh8onYltYp4spoFV1b"><span>所以大佬们相继讨论，让这个词火了起来。很多自媒体宣传是未来是属于Loop Engineering的。把他称为Harness工程的下一代范式。</span></p>

<p id="f-doxcnJPCZ3x6WTKLoiMc6mWkZIf"><span>当然也有人翻白眼：AI 圈是不是又在造词？去年还是</span><span style="font-weight:bold">提示词工程</span><span>，年初变成给模型套马鞍的 </span><span style="font-weight:bold">Harness 工程</span><span>，现在又来个</span><span style="font-weight:bold">循环工程</span><span>，是不是新瓶装旧酒？</span></p>

<p id="f-doxcn2sMTOT72EIbiM2wemS5y6b"><span>这里有个被反复提到的行业演进脉络，几乎成了这波讨论的"标准开场白"：</span></p>

<blockquote id="f-doxcnow4XDIHbjs1JUrVGFch5zh"><p id="f-doxcnO7wl2Ro0Q7u5Qu9o4Q1umf"><span style="font-weight:bold">提示词工程 → 上下文工程 → Harness 工程 → 循环工程</span></p>
</blockquote>

<p id="f-doxcnrbHIGoE6LFEbGaKkQiMURd"><span>Towards AI 的 CTO Louis Frano 有句话可以认为挺中肯：这几个词说到底是同一件事——尽可能地"操纵"模型，而这只能通过你喂给它的上下文和提示词来实现。所以与其说是新技术，不如说是</span><span style="font-weight:bold">人和 AI 打交道的基本单位，正在从"一次对话"变成"一个完整回路"</span><span>。这个转变是结构性的，不是又解锁了什么新功能那种级别的事。</span></p>

<div id="f-doxcnvovybGSG9mmN5AmEpEQdxg"><img alt="" decoding="async" height="853" loading="lazy" src="/images/agent-learning/8f2efad5f6e866796eec7d02.png" width="1280"/></div>

<a id="f-doxcnf3DjzyoQjPeb5r7b2Vk7bf"></a>

##### 是什么：到底什么是循环工程

<p id="f-doxcnBTrgSq1EtSqh3PfjUq7UPh"><span>别被"工程"这个词唬住，它讲的事其实特别日常。</span></p>

<p id="f-doxcnNnwrRrv0dG7nAllkuVk7ze"><span>回想一下你平时让 AI 写代码：你让它写个功能，它写完了，你跑测试，报错了，你把错误信息贴回去，它再改，你再跑……来回几次，直到能用。</span></p>

<p id="f-doxcniCRnUialSLgPAWzAhmPSwh"><span style="font-weight:bold">这就是一个最原始的 loop——行动、观察、修正、再行动。</span></p>

<p id="f-doxcnh00HyLiMvHfCmix3uNHSwc"><span>关键区别在哪？过去这个循环的每一步都靠你的手在推：你要复制报错、你要追问原因、你要提醒它别改错文件、你要判断什么时候该停。</span><span style="font-weight:bold">你就是这个循环里的发动机，你一停，循环就转不下去。</span></p>

<p id="f-doxcnWmtuDhm0d6GnJvHpgqkSke"><span>循环工程做的事，就是把这些反复发生的动作写成规则，交给系统自动跑。</span></p>

<p id="f-doxcnWltCMANS6m40egOs3ougkc"><span>它和 cron 定时任务有什么不一样？</span></p>

<p id="f-doxcnkyKalBCTbYzEiGZWk97JTM"><span>这是 Louis 讲得最透的一点，也是很多人最初的疑问：loop 不就是每小时跑一遍同一个提示词吗？那不就是个 cron job 嘛，比我们岁数都大。</span></p>

<p id="f-doxcnqFn8isP9HtlraOE0BnzWnd"><span>差别在于——</span><span style="font-weight:bold">决策者在循环里面</span><span>。</span></p>

<ul><li id="f-doxcnvUzx1NICKGjcrlryae2Tjc"><span>cron 跑的是一段</span><span style="font-weight:bold">固定脚本</span><span>，第一步、第二步、第三步，永远一样。</span></li></ul>

<ul><li id="f-doxcnuo3hGzf20yz73HFEvTUkPb"><span>loop 跑的是一个 </span><span style="font-weight:bold">agent</span><span>：它看当前状态，自己选下一步该干啥，干完检查结果，再决定要不要继续。它会重试、会回滚、会在搞不定的时候停下来。</span></li></ul>

<p id="f-doxcnm7f047DffYbCuipA7xEaAe"><span>一句话，cron 是在执行脚本，loop 是在</span><span style="font-weight:bold">模仿一个工程师</span><span>。而这之所以现在才行得通，是因为模型终于强到能理解"目标"和"奖励信号"了。</span></p>

<p id="f-doxcn0v6pcZbdF4lnmR1xN04Sag"><span style="font-weight:bold">一个 loop 至少要回答五个问题</span></p>

<p id="f-doxcnlpKNQZkDUWwSIfvShiJ6fl"><span>把上面那套"工作制度"展开，本质上 loop 要替你定清楚这几件事：</span></p>

<ol start="1"><li id="f-doxcn8mE6yOSSbPTxcXcA3pk7Ec"><span>AI 什么时候开始干活？（触发器）</span></li></ol>

<ol start="2"><li id="f-doxcnYJ9Km1hmTW14W642wPRPjh"><span>它能调用哪些工具？</span></li></ol>

<ol start="3"><li id="f-doxcnmAthb1MLtiFf39WMeSbP1g"><span>它怎么知道自己做错了？（可验证的目标）</span></li></ol>

<ol start="4"><li id="f-doxcncYhOQBIdPmhncrouEDMNXf"><span>每一轮的结果记在哪里？</span></li></ol>

<ol start="5"><li id="f-doxcnmaAw9CRC7D3vYSvDCWjcmc"><span>什么时候必须停下来交给人？</span></li></ol>

<p id="f-doxcnHohhRAp5B2JUwDmUkasLHh"><span>Louis 把前两条浓缩成 loop 跑起来的两个最低条件：</span><span style="font-weight:bold">一个触发器（trigger）和一个可验证的目标（verifiable goal）</span><span>。触发器可以是一个 PR 被打开、一次 CI 失败、一条 Slack 消息，或者你手动敲一句。可验证的目标可以硬性如"所有测试通过、CI 变绿"，也可以软一点，比如让一个评审模型判断 UI 是否符合规格。但</span><span style="font-weight:bold">一定得有某种检查</span><span>，否则你建的不是 loop，而是"一台非常自信的烧钱炉"。</span></p>

<p id="f-doxcn3hYn7me7TeTmrWc5S0Iv1c"><span style="font-weight:bold">常见的、已经写好的 loop</span></p>

<p id="f-doxcnx2Ip9PB9GiSUnu8h8d4Ojh"><span>好消息是，你不用从零造。现在主流工具里已经内置了一些开箱即用的 loop：</span></p>

<ul><li id="f-doxcn98lLBFnLDydnut19DaBNJb"><span style="font-weight:bold"><span><span>/goal</span></span></span><span>（Claude Code、Codex 都有）：一个长期运行的任务，思路很像当年的 Ralph Wiggum——不用你一遍遍催，harness 自己会一路干到目标达成为止。有人拿它跑了好几天，去解析一批结构很复杂的文档。这种</span><span style="font-weight:bold">有边界、能自动验证</span><span>的活，它特别能扛。</span></li></ul>

<ul><li id="f-doxcnSZl4zTcqp4fiIjLndUbBsh"><span style="font-weight:bold"><span><span>/loop</span></span></span><span>（Claude Code）：输入 </span><span><span><span>loop</span></span></span><span>，用大白话写间隔，比如"每 5 分钟探索一下该学习案例里的这部分"，它就在当前会话里挂一个 cron job，按你说的时长定时触发。适合开放式、探索性的工作——把一个宽泛的问题丢给它，就像交给一个野心很大的初级工程师，它可能跑偏，但有时候你得看到结果才知道某个方向行不行。</span></li></ul>

<ul><li id="f-doxcn7XUpIplwIqGnIPG0gbaVOd"><span style="font-weight:bold">IDE 里的 Automations 标签页</span><span>（Codex / Cursor / Claude Code 等）：通常在左上角，长得都差不多，一栏"进行中"、一栏"已暂停"。可以设成每天扫一遍收件箱丢到 Linear 看板、定期扫安全漏洞、每周把这一周干过的事沉淀成 skill，等等。</span></li></ul>

<p id="f-doxcn1HuPV8crk9eXDNq90EKA7c"><span>我的理解是：</span><span><span><span>/goal</span></span></span><span>、</span><span><span><span>/loop</span></span></span><span> 这类</span><span style="font-weight:bold">就是平台帮你写好的标准 loop</span><span>，你填参数就能用；而所谓"循环工程"，是你开始</span><span style="font-weight:bold">自己去设计</span><span>这些回路，针对你自己的重复劳动。</span></p>

<div id="f-doxcnwbQEHjEIeAEvCiUp7ZScuD"><img alt="" decoding="async" height="820" loading="lazy" src="/images/agent-learning/0ccb246a0d8758dc9e09def6.png" width="805"/></div>

<a id="f-doxcnapWep4YpJudwLr9Chf0pAf"></a>

##### 核心要素：一个 loop 由哪些零件拼成

<p id="f-doxcnUMEpaiufm6MOztZWuqbaLg"><span style="font-weight:bold">一套完整的循环 = 五个积木 + 一个记事本。</span></p>

<p id="f-doxcnhlDAWTPuayX48iWFmL6TZg"><span style="font-weight:bold">积木一：定时任务</span><span> 整个循环的起点。各家叫法不同，本质一样：给一个项目设定多久自动跑一次，可以每天早上、可以每小时、也可以每次有代码提交时触发。过去你得手动打开 AI 说"帮我看看这个"，现在到点它自己醒过来干活，像个不用你提醒的助理。</span></p>

<p id="f-doxcnFqu1TQzSeQV5xw7lmdGbbh"><span style="font-weight:bold">积木二：worktree</span><span> 很多人用 AI 写代码最怕它乱改文件、把好好的项目改崩。worktree 就是给每个 agent 一个独立分支，所有改动都在自己的沙盒里，不碰主分支。改砸了就删掉分支，主代码干干净净。相当于给每个员工一个独立工位，最后审核通过才合并回主线。</span></p>

<p id="f-doxcnRtp9UTeKVu5ZJdmpZJfiXg"><span style="font-weight:bold">积木三：Skill</span><span> 这是 loop 能不能跑好的核心秘密。用 AI 最大的痛点之一，就是同一个项目每次都得重新解释一遍团队约定、构建步骤、之前踩过的坑。Skill 就是把这些写进文件——构建命令是什么、代码规范是什么、哪些写法绝对禁止、上次出过什么事故——AI 每次启动先读一遍，就知道这个项目的规矩。说白了就是一本</span><span style="font-weight:bold">员工手册</span><span>，谁来都先翻一遍，不用从头培训。</span></p>

<blockquote id="f-doxcng4CN3H5JehttSyRNuZ0FCg"><p id="f-doxcnyAy8gD1O1oc1vodftfinHg"><span>Louis 特别强调了这一点：一个</span><span style="font-weight:bold">没有可复用 skill</span><span> 的 loop，每跑一次都在"从零重新认识你的项目"，纯纯烧 token 重学你早就知道的东西；而一个 skill 写得好的 loop 会开始</span><span style="font-weight:bold">产生复利</span><span>。原则是——一个 skill 干一件事，写得尽量密、又尽量小，别把上下文塞满。</span></p></blockquote>

<p id="f-doxcnHsu235bOsKyABcCb6bfMrb"><span style="font-weight:bold">积木四：连接器</span><span> 让 loop 跳出单个文件夹的关键。过去 AI 只能看你当前打开的文件，有了连接器，它能连数据库、连公司内部系统、连第三方服务——自己去查生产环境数据、读 CRM 客户记录、拉监控告警。AI 就从一个"只能处理本地文件的工具"，变成了"能接入你整个工作流的节点"。</span></p>

<p id="f-doxcnOEI3pGx7M0YYhNSMTDdAgf"><span style="font-weight:bold">积木五：子 Agent</span><span> 这是整个体系里可以认为最妙的结构。一句话：**写代码的和审代码的，得是两拨人。**一个成熟的 loop 里至少有两个 agent，一个负责写、一个负责挑刺，甚至可以用不同的模型（比如一个写、另一个审）。指令不同、视角不同、模型都不同，才能真审出问题。道理很朴素——自己写的东西自己很难看出毛病，必须有第二双眼睛。</span></p>

<p id="f-doxcnzr3RZoC2LSqLRTMxYdctMR"><span style="font-weight:bold">记事本：状态文件</span><span> 这个最容易被忽略，但它才是 loop 能</span><span style="font-weight:bold">长期</span><span>跑下去的关键。现在绝大多数 AI 工作流每天都从零开始：昨天确认过的事实今天再查一遍，上周否掉的标题风格这周又冒出来，某个来源一直不靠谱但它下次还引用。为什么？因为记忆只活在单次对话里，对话一关就没了。状态文件就是一份</span><span style="font-weight:bold">聊天框之外的公共记忆</span><span>——可以是文档、表格、看板——记下已确认的信息、踩过的坑、偏好的格式、禁用的表达、上次没解决的问题。AI 每次启动第一件事就是读它，于是它能接着上次的进度往下走，而不是永远重启。</span></p>

<p id="f-doxcngQK8I7mY1EsxIz6jf8Ghug"><span>这六样拼起来，就是一个完整的、能自己跑的 loop。</span></p>

<div id="f-doxcntKsw5bhP3UqZekUReExzHM"><img alt="" decoding="async" height="1254" loading="lazy" src="/images/agent-learning/809845c534072c0aad610a3d.png" width="1254"/></div>

<a id="f-doxcnqwm5Bo0TKqCE4UIf0V2tAf"></a>

##### 实践适用范围：现在还不适合大多数人，但未来一定会

<p id="f-doxcnXFNBfHjKW8MjsfA3bhhUJg">Boris、Peter 等人提出“我不写提示词、我写 loop”的思路。实践时还需要结合 Token 预算与实际资源条件分析取舍。</p>

<p id="f-doxcnDvH7qIbZPTupPrQquS8BKg"><span>Ross Mike（这个视频博主）打了个特别到位的比方。假设我俩合伙创业，雇了个很聪明的开发者，跟他说"这是我们要做的产品，这些是需求"，然后他</span><span style="font-weight:bold">不来咨询你，自己埋头把整个东西做完了</span><span>。问题来了：在做的过程中，他必然要做大量假设——产品长什么样、什么手感、某些架构怎么定。这些假设很可能跟你脑子里的愿景对不上。你以为那份 PRD 文档覆盖了一切，但说实话</span><span style="font-weight:bold">它永远覆盖不全</span><span>，总有边界情况、总有遗漏。等他把"成品"端上来，一堆东西做好了，可就不是你想要的那个味儿。</span></p>

<p id="f-doxcnvdxnRJkrDQXsl6C58MQMWf"><span>把开发者换成 agent，把需求文档换成 </span><span><span><span>spec.md</span></span></span><span>，一模一样。</span><span style="font-weight:bold">你给了 agent 自由发挥假设的空间，大多数时候它会搞错——而且不光搞错，还烧掉一大笔钱。</span></p>

<p id="f-doxcnQa6vK2IfNjP8xFTV4QrDwc"><span style="font-weight:bold">钱的问题，是绕不过去的</span></p>

<p id="f-doxcnY39h4C7QHEpaZYGzi4ymqc"><span>这是最现实的一条。Ross Mike 说，你只要去看 Peter 的一条推就懂了——</span><span style="font-weight:bold">一个月烧掉了价值 130 万美元的 token。</span></p>

<p id="f-doxcnQQfanlKulaoJ9JiS6uYOkf"><span>所以他的建议很干脆：如果你不是 200 美元/月那档套餐，这事</span><span style="font-weight:bold">压根不该进入你的考虑</span><span>。20 刀、100 刀的套餐，一个 loop 跑两天可能就把你的周限额烧穿了。（甚至博主里面提到了，即使你是200美元/月的用户，其实也经不住你跑大量loop。200美元/月 基本是Claudecode, Copilot这种工具订阅的最高的那个档）</span></p>

<p id="f-doxcnVENktJ0kyPt51oKBgMtYCe"><span>Louis 的说法更工程化一点：**预算就是架构的一部分。**他自己从不在睡觉时跑 loop，永远手动启动并盯着。每个正经的 loop 都得配一个"心跳"机制——最大迭代次数、"无进展"检测、每天能花的 token / 美元上限。还得有比"agent 说自己做完了"更强的验证：跑测试、做类型检查、让评审 agent 去比对 diff 和规格。</span></p>

<p id="f-doxcn3CBeNTUYeQ7MsgQfsxb1xb"><span>视频里把这事总结得很精辟：循环工程</span><span style="font-weight:bold">不会让 AI 协作变得没成本</span><span>，它只是把成本从"人一轮轮盯着的时间成本"，转移成了"系统一轮轮运行的金钱成本"。token 成本这个问题，反而把这个热词拉回了现实。</span></p>

<p id="f-doxcnHNfIS5TE6GZejAuqulgMZd"><span style="font-weight:bold">为什么它现在不适合"做有创意的东西"</span></p>

<p id="f-doxcnYUYSrqsExNrXWAFak98TCe"><span>Ross Mike 的核心论点是：</span><span style="font-weight:bold">当你要用 AI 做一个真正有意义的东西时，人必须还在循环里。</span></p>

<p id="f-doxcnxiGcOVOnbA8bDbKPBj20Kf"><span>为啥？因为你在建一个 app 的时候，</span><span style="font-weight:bold">自己都还没完全想清楚要什么</span><span>。趋势天天变——今天觉得液态玻璃好看，明天又想调整。你不可能把脑子里所有的细节、所有"我其实是想要那样"的念头，一次性塞进一个文档。做服务、做外包的人最懂这个：你拼命想把客户脑子里的想法掏干净，可永远有一句"哦你漏了这个""我不是这个意思"。</span><span style="font-weight:bold">人和人之间都这么难对齐，凭什么指望 AI 一次就懂你？</span></p>

<p id="f-doxcnnsiKrAZrdiqzO3lddTRTZd"><span>他还有两个比喻我很喜欢：</span></p>

<ul><li id="f-doxcnXB3JsGVQUr6IDuzlwj7Wzc"><span style="font-weight:bold">"AI 能复刻灵魂，但创造不出灵魂"</span><span>（AI can replicate sauce, it can't create sauce）。</span></li></ul>

<ul><li id="f-doxcnqz251UtOCfnyCfQSPJbxHb"><span>跑一个大 loop 就像</span><span style="font-weight:bold">全自动驾驶</span><span>：你从迈阿密一路开到查尔斯顿，按下 go 就停不下来了。路边看到个可爱的小餐馆想下去吃个炸鸡三明治？不行，火车已经离站，你只能跟着这趟跑完。</span></li></ul>

<p id="f-doxcn3B6TkRv1QunPkVu9Lu8wVe"><span>主持人接了一句很妙的话——这些 loop 本质上是在造一台</span><span style="font-weight:bold">老虎机（slot machine）</span><span>，拉一把，看运气出什么。中途</span><span style="font-weight:bold">没有"把半成品拿给别人收集反馈"这一环</span><span>，而对一个想做成产品的人来说，这一环恰恰是命根子。</span></p>

<blockquote id="f-doxcnnRP9s9QQtVSx01j4sg20jc"><p id="f-doxcnP5hoPU4j8c2q0xF6rk8Gmf">当前 Loop 仍需要人工监督，明确需求、设计执行细节与验证条件，并精心安排流程。</p>
</blockquote>

<p id="f-doxcnDHW5PFf61TjicsTe0lglOd"><span style="font-weight:bold">那它现在到底适合干啥？</span></p>

<p id="f-doxcn8MaAbwU8LL9wadbumMtTCh"><span>Ross Mike 不是纯黑。他自己就在用一个 loop，而且用得很顺——</span><span style="font-weight:bold">代码评审（code review）</span><span>。</span></p>

<p id="f-doxcnMJoiQ0ImiB3cmKKjrnlioh"><span>他的流程大概是这样：用 Cursor 写代码，每推一个功能到 GitHub，就有一个代码评审 agent（他用的那类工具，类似 Code Rabbit、Greptile）自动审一遍，给出问题清单，外加一个 </span><span style="font-weight:bold">1 到 5 分的打分</span><span>。他给自己定的规矩是：</span><span style="font-weight:bold">低于 4 分的代码，绝不上生产。</span></p>

<p id="f-doxcneDfsE2brejofwZ2OXGCUig"><span>然后是 loop 的部分——他写了个 skill，逻辑就是：去 GitHub 读评审 → 改 → 推回去 → 等新评审 → 还没到 4 分就继续改……最多跑 5 轮，或者一直跑到 5 分为止。</span></p>

<blockquote id="f-doxcnJ8dH3FeD2g9FkFMU1Tor8e"><p id="f-doxcniPSv8wolhVQMm5d7OgLjve"><span>注意这个 loop 的形状：</span><span style="font-weight:bold">它非常封闭、非常目标导向</span><span>。有一个固定的反馈引擎（评审打分），目标清清楚楚（把分数刷到 5）。这正是它能跑通的原因。</span></p></blockquote>

<p id="f-doxcnisSPkrSbbMEIaH7apNrYkf"><span>但即便这么理想的场景，它也会崩——</span><span style="font-weight:bold">只要推的代码超过 1000 行</span><span>，agent 就吃不下那么多上下文，几乎拿不到满分。所以他每次都得控制改动量，或者让 Cursor 拆成多个小 PR。你看，连这种封闭生态里，都到处是会断的地方。</span></p>

<p id="f-doxcnAaeCvLBhrvrYME6zdHmQHe"><span>总结下来，</span><span style="font-weight:bold">现在 loop 真正成立的，是那些"输出是二元的"场景</span><span>——黑或白、做没做到一目了然、不需要创造力。代码评审是，批量生成 300 个同质的 SEO 页面也是。娜娜那期给了四个判断标准，可以认为可以直接拿来当 checklist：</span></p>

<ol start="1"><li id="f-doxcnnWBgOOpIyOE5sNW1YO8IAN"><span>任务会</span><span style="font-weight:bold">反复出现</span><span>；</span></li></ol>

<ol start="2"><li id="f-doxcnf8ukapgw0YgpnR9hhHj6zd"><span>流程</span><span style="font-weight:bold">相对稳定</span><span>；</span></li></ol>

<ol start="3"><li id="f-doxcnywmOqBhxBSIvXTGVxcDC1X"><span>结果</span><span style="font-weight:bold">可以被检查</span><span>；</span></li></ol>

<ol start="4"><li id="f-doxcnBnrP0C5d6sWOih5eFSkb0b"><span>最关键的</span><span style="font-weight:bold">判断权还在人手里</span><span>。</span></li></ol>

<p id="f-doxcnHpMwmdEmXBqrYGSCuVZ04b"><span>四条都满足，这活就可以设计成 loop；缺一条，循环的成本很可能就高过回报。</span></p>

<p id="f-doxcnbau4wn9eRoJaEzIC8Ma1yg"><span style="font-weight:bold">但是—未来一定会到</span></p>

<p id="f-doxcnGvxZvZTjooWZDqYZwXRNEg"><span style="font-weight:bold">100% 地，未来一定会走到"loop 普遍可用"那一步，只是不是现在</span><span>。</span></p>

<p id="f-doxcnlNulAxM3InZnVc2iGwylW6"><span>之所以现在唱反调，针对的不是 Boris、Peter 本人——他们要做研究、要试自愈 agent，烧 token 对他们是常识、是本职。Ross Mike 真正想提醒的，是那些</span><span style="font-weight:bold">到处教学、把 loop 吹成"天花板"的内容创作者</span><span>：对月付 20 刀的普通人来说，这玩意儿现在不是神器，是碎钞机。</span></p>

<p id="f-doxcnKhEjowfVg9OH66O3Oeywvf"><span>但行业的重心，确实在不可逆地转移。借 Louis 的那条时间线收个尾：</span></p>

<blockquote id="f-doxcnFJEYVv1vYVvbtstq958Zxh"><p id="f-doxcnhCCh50RWjRQP4yHFk0f28g"><span>五年前你自己写代码；两年前你提示模型替你写代码；去年你看着 Claude 写、一个任务一个任务地点确认，生怕它搞砸；而今天，对</span><span style="font-weight:bold">合适的任务</span><span>，你开始设计那个能自己提示、自己检查、自己重试、自己停下来的 loop。</span></p></blockquote>

<p id="f-doxcn1H6UeTdmWNZutX8ORVlNDb"><span>杠杆的位置变了。去年你花 100 个小时练提示词技巧，回报可能很高；今年再花同样的时间，回报大概没那么高了。未来真正拉开差距的，</span><span style="font-weight:bold">可能不是谁的提示词写得更漂亮，而是谁能更早想清楚：哪些活该交给循环自动跑，哪些活必须自己亲手抓。</span></p>

<p id="f-doxcn6JgkPpPySv8ARiWtUGdSyh"><span>Louis 最后那句话我想原样记下来——**不管你怎么改工作流，请确保你还是那个工程师。**你可以用 loop 在你已经吃透的工作上跑得更快，也可以用它来逃避去理解工作本身。给未来的自己，做个对的选择。</span></p>

<p id="f-doxcntynixngY4tNNYqpeIBcY7b"><span>至于 Ross Mike，他的结论更短：</span><span style="font-weight:bold">Human in the loop is the best loop.</span><span>（人在循环里，才是最好的循环。）</span></p>

<blockquote id="f-doxcnnums26Zp7Vuc8itU7OdAyg"><p id="f-doxcnQl9maHDCmzXvKsG52zh1gh"><span>这里的理解是，现在虽然比如CC这些工具有/loop 的这样的功能，帮你完成了一些Loop的工程，只要使用/loop + 提示词就可以完成Loop功能。 但是你无法直接依赖于它，就用它让Agent自己去探索，完成你的任务，这个是不切实际的。因为你让AI探索，中间会走很多弯路，耗费大量Token不说，结果也会错误。现在的Loop需要你精心设计，整个流程步骤，评估-测试-迭代效果才可能会稳定，人不可能完全退出这个过程，依赖于一个/loop，什么都不设计，就能完成大型项目。但是未来，这是一个趋势，未来AI也许聪明到，不需要我们设计整个过程，我们大概结合loop +简单的提示词，AI就能稳定探索，解决复杂问题。</span></p></blockquote>

<a id="f-doxcnN996aPOcnHE2eSIPCazo0b"></a>

##### 如何做一个LOOP？

<p id="f-doxcnEcltiHm1kUiv84Oj4rT6xh"><span>Loop其实也不是啥新概念，甚至很多人都已经在用了。我的理解它就是用了Harness工程技巧，定义一个完整的执行流，来完成一个复杂的任务。 所以其实这个问题也没有一个标准的答案和做法。</span></p>

<p id="f-doxcn76cbrlP7LlVXkEsFjM902g">Claude Code 的 /loop，以及 Anthropic Harness 与 Claw Code Harness，均可作为循环驱动开发流程的学习案例。 <a href="#f-doxcnGuiUPQXIXih92YIeZ6uOhb"><span>Anthropic Harness工程</span></a> <a href="#f-doxcnwGyPOA7uJi8Wh6veJ1Q7uc"><span>ClawCode Harness工程</span></a></p>

<p id="f-doxcnISLECsROzJHqJxhyY0ruQh"><span>随着模型的发展，写loop的范式也一定会发生变化。比如按照上一小节讲的。也许现在我们要写spec-开发-review-测试-代码提交的流程编排写loop，但是未来，一个很强的模型出现，大型复杂项目的编写，就是/loop + 你就把这份文档给它，完成整个项目的开发。就实现了。 </span></p>

<p id="f-doxcnbreQvsXIgrUBR1d66lXSBg"><span>如何实现Loop，可以认为这是一个思想，一章讲不完，也没有标准答案，况且本节其实涉及的很多内容就是Loop的实现，如果你想研究这个问题，给你一些参考方向：</span></p>

<p id="f-doxcnXMetGdrnm6FvrxX3fmtVub"><span>1.研究CC的/loop实现，让AI去分析，毕竟CC是开源的，代码在这里（不过我不太确定泄露的这个版本的代码，有没有实现Loop) </span></p>

<p id="f-doxcn9ZVhijNwRGv3qOe2zsAwid"><span>2.这两个Harness项目：</span><span><span><a href="#f-doxcnGuiUPQXIXih92YIeZ6uOhb"><span>Anthropic Harness工程</span></a></span></span><span> 和 </span><span><span><a href="#f-doxcnwGyPOA7uJi8Wh6veJ1Q7uc"><span>ClawCode Harness工程</span></a></span></span><span>。</span></p>

<p id="f-doxcnsWhRj5pZ2zYQJXqkThqCTf"><span>3.未来本节里做的Agent项目，肯定使用Harness,Loop的思想去做的，这个属于自己实战项目，不过还早呢，现在还没有。</span></p>

<a id="f-doxcniOF7kJo6ynL6TsT4EFNOMf"></a>

##### 面试问题

<blockquote id="f-doxcnP40STFiw24oP08Ll38Nlch"><p id="f-doxcnvVVvckviTsg5HAtDxAV4ig">下面通过问题检验对 Loop 定义、特点与适用条件的理解。</p></blockquote>

<a id="f-doxcnvItw2lk402GYZMBJzOr38g"></a>

###### Q1：什么是 Loop 工程/loop工程有哪些模块？

<p id="f-doxcnOcQMKLl4eLoY4zJJxuNafg"><span>循环工程是一种新的人机协作范式：</span><span style="font-weight:bold">你不再亲自一轮轮地提示 AI，而是设计一个能让 agent 自主运转的闭环。</span></p>

<p id="f-doxcnvqhIKVC5o4pxtTD7oJ4lAg"><span>它和定时任务（cron）最本质的区别在于——</span><span style="font-weight:bold">决策者在循环内部</span><span>。cron 跑的是固定脚本，步骤永远不变；而 loop 跑的是一个 agent，它会观察当前状态、自己决定下一步、执行、检查结果，再判断要不要继续、重试还是停下。所以它更像在"模仿一个工程师"，而不是"执行一段脚本"。</span></p>

<p id="f-doxcnBBgOWfddetWMvpGGpiscug"><span>一个能跑起来的 loop，至少需要一个</span><span style="font-weight:bold">触发器</span><span>和一个</span><span style="font-weight:bold">可验证的目标</span><span>；完整一点的结构通常包含五个积木加一份记忆——定时任务、独立工作目录（worktree）、技能（Skill）、连接器（MCP）、子 Agent（写审分离），再加一个跨会话的</span><span style="font-weight:bold">状态文件</span><span>。放进行业脉络里看，它是"提示词工程 → 上下文工程 → Harness 工程 → 循环工程"这条线上的最新一站：</span><span style="font-weight:bold">人和 AI 协作的基本单位，从"一次对话"变成了"一个完整回路"。</span></p>

<a id="f-doxcnJnk6k9Z407vSyg6x9BTr3g"></a>

###### Q2：你怎么看待 Loop 工程？

<p id="f-doxcnXIN5JatntQiUPFh9Ajb4hf"><span>我的看法是——</span><span style="font-weight:bold">方向上看好，但现在对大多数人还不实用</span><span>，得分场景、分钱包来谈。</span></p>

<p id="f-doxcnfCV3OjZso4qE8o60pVxGwg"><span>先说不看好现在 all-in 的理由。第一是</span><span style="font-weight:bold">钱</span><span>：loop 会反复读上下文、反复重试、四处探索，不管有没有产出都在烧 token，有人一个月烧掉过上百万美元；对月付 20、100 刀的普通用户，跑两天可能就到周限额了。第二是</span><span style="font-weight:bold">目标难定</span><span>：软件开发常常是探索性的，你一开始根本说不清最终要什么，目标一模糊，loop 就会朝着那句含糊的话拼命优化，结果可能比你认认真真手动做一遍还糟。所以现阶段它真正成立的，是</span><span style="font-weight:bold">输出二元、有客观验证、流程稳定、且判断权还留在人手里</span><span>的场景——代码评审、批量 SEO 页面这类，而不是"帮我从零做个有创意的产品"。</span></p>

<p id="f-doxcnnYxevalLLmt11USFbmnmyO"><span>但拉长看，我</span><span style="font-weight:bold">完全相信这是未来</span><span>。随着模型越来越强、越来越便宜，"跑一轮循环的钱"正在逼近"人来回追问几轮的成本"，这笔账迟早会翻过来。真正值得优化的，也会从"某一句提示词怎么写得更完美"，变成"整个反馈回路怎么设计得更高效"。</span></p>

<p id="f-doxcnBurCNKp1IrKgLO24Psbrhg"><span>所以我的态度是 Louis 那句话：</span><span style="font-weight:bold">先从简单的做起，只在自动化能自己回本时才加自主性</span><span>；以及不管怎么用 loop，</span><span style="font-weight:bold">人始终得是那个工程师</span><span>——定好停止条件、写好 skill、读懂它产出的东西。Loop 既能帮你在懂的事情上跑得更快，也能诱惑你彻底不去懂——别选错了。</span></p>

<a id="f-doxcnIAli7FlHvCfnUngYA992Xf"></a>

##### 参考资料

<p id="f-doxcntzQ9gX6tvlFMVtuTZ3wSyf"><span>我列出是为了完整性，说明内容参考依据。 </span><span><span><a href="https://www.youtube.com/watch?v=7clJ8IH784Q&amp;t=83s"><span>https://www.youtube.com/watch?v=7clJ8IH784Q&amp;t=83s</span></a></span></span></p>

<p id="f-doxcn1hvwQztBxCcOj0fmpRYVzU"><span>其他的关于Loop 工程，其实就看一个视频就够了，甚至是不看视频，看笔记也够了，基本就是他是啥，他的核心组成，如何看待它，笔记里总结的都有。 如果想看视频讲解的话，我找一个中文的，相对来说比较完整的，可以参考：</span></p>

<div id="f-doxcnWQFCu1vlvur7qtcUoVWyad"><div><div><div><div><div><div><div><div><div><a href="https://open.douyin.com/player/video?vid=7650685565158968626&amp;mode=pc">嵌入视频 / 原始播放器</a></div></div></div></div></div></div></div></div></div></div>


<a id="section-0131"></a>
## Graph 工程

<a id="f-doxcnTZPd89uYF1317aMsSps82b"></a>

<p id="f-doxcnKFgZbRAd4uOvnqCwawkslh">Graph Engineering（Graph 工程）与提示词工程、上下文工程、Harness 工程、Loop 工程等概念相关。理解这些概念时，可以对照已有技术，分析其具体机制、适用场景和工程取舍。</p>

<p id="f-doxcnlf9rWqOgRp7YjkNUHRu3Sd"></p>

<a id="f-doxcn2TwSn7j5XCSOqMIe45EXfh"></a>

##### Graph 工程的来源

<p id="f-doxcnVUTHjqF0lglV14EcG9icsh"><span>这场讨论源于 Peter Steinberger 的一条玩笑推文：</span></p>

<blockquote id="f-doxcn6IhxOKNAbKjfWz4IyTZNXg"><p id="f-doxcnNXa4Df3y5fY1AmMZCXXS1b"><span>“我们还在讨论循环，还是已经转向图了？”（Are we still talking loops or did we shift to graphs yet?）</span></p>
</blockquote>

<div id="f-doxcnvZ1RmuBDKBrKS6lmMMon6g"><img alt="" decoding="async" height="501" loading="lazy" src="/images/agent-learning/7985f69c113021073f9e835f.png" width="1118"/></div>

<p id="f-doxcny32j5wTliAdqtWmsGfp5mx"><span>这条只有九个英文单词的推文获得了约 270 万次浏览。随后，Hamel Husain 又用一句“Loop engineering is dead. Enter graph engineering（Loop 工程已死，Graph 工程登场）”推波助澜。很快，整个信息流仿佛都认定一个新学科诞生了，大量解释“什么是 Graph 工程”的文章随之出现。</span></p>

<p id="f-doxcniXXfyUFcG0UMsXi8VzB3o5"><span>但这两条主要推文原本都是玩笑。Steinberger 调侃的是 AI 圈给概念改名的速度：Prompt Engineering 变成 Context Engineering，然后是 Harness Engineering、Loop Engineering——这些词在很大程度上描述的是同一件事不断扩大的不同层次。 我们将目前AI圈5个比较火的工程，用这种图来总结：</span></p>

<div style="margin-left:25px"><div id="f-doxcnLOrGkvxOhcohac4YXGxMTg"><img alt="" decoding="async" height="1024" loading="lazy" src="/images/agent-learning/8a1567e3790e8181c852b957.png" width="1024"/></div><div id="f-doxcnRQrUJIEBYTCaG1sLt5VAhd" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">Prompt Engineering</span><span> 关心“问什么”（what to ask）。</span></div></div><div id="f-doxcnh71AYoXwVR57pw7XE1DqAb" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">Context Engineering</span><span> 关心“发送什么”（what to send）。</span></div></div><div id="f-doxcnDI8VJ9iXYUav9Ht9E3bq6g" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">Harness Engineering</span><span> 关心“如何运行”（how to run it）。</span></div></div><div id="f-doxcnvSSRzw5YG5MUzPuNlHqlsb" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">Loop Engineering</span><span> 关心“如何让它一直运行，直到任务完成”（how to keep it running until it's done）。</span></div></div><div id="f-doxcnKHRl6l4C3NjslNp8julOUf" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">Graph Engineering</span><span> 关心“如何让多个任务与循环按照明确的路径协同运行”（how to orchestrate tasks and loops through an explicit graph）。</span></div></div></div>

<p id="f-doxcnGWXeaJRXUrrx6bMjM3C6ob"><span>从这个角度看，</span><span style="font-weight:bold">Graph 工程并不是对 Loop 工程的取代，而是把单个循环扩展成由多个节点、分支、验证器和循环组成的完整工作流</span><span>。它关心的不只是 Agent 能否持续运行，还包括任务如何分解、结果如何流转、失败后回到哪里，以及整个系统何时停止。</span></p>

<a id="f-doxcn1d03p84cmwIBEYHghDK6uG"></a>

##### Loop vs. Graph

<p id="f-doxcnhpHkU4lE9sqsM7YUP6noPh"><span>一般在讲Graph工程的时候，都会先讲Loop工程，很多人定义Graph工程是建立在loop工程之上的，对多个loop进行编排，就成了Graph</span></p>

<p id="f-doxcn5N5ubrAq6eiqeSRqDfVrId"><span style="font-weight:bold">Loop 工程：一个循环，一个任务</span></p>

<p id="f-doxcnrYR9AxJJX5zZflPRYISqyc"><span>相比只向模型发出一次提示，Loop 工程让 Agent 围绕一个目标持续行动，由外部验证器检查结果：如果失败，就把任务送回循环；如果达到目标或触发停止条件，则结束流程。</span></p>

<p id="f-doxcnZbunXC9UAQE1GfnkvqIEkh"><span>一个 Loop 通常包括：</span></p>

<div style="margin-left:25px"><div id="f-doxcnw9aQpZ7QJYzehjU1Hgxkp0" style="display:flex;gap:0.5em"><span style="min-width:1.5em">a.</span><div><span>触发任务，例如 PR、CI、定时任务或提示词；</span></div></div><div id="f-doxcnVdhUAFe1JWfuHrhGw9F6Kf" style="display:flex;gap:0.5em"><span style="min-width:1.5em">b.</span><div><span>Agent 执行工作；</span></div></div><div id="f-doxcnibGwTM6hJyLnEv8cTZMWYg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">c.</span><div><span>运行测试、类型检查、Reviewer Agent 或规格差异检查；</span></div></div><div id="f-doxcnHQSdapSojdgZGjZyiJ1bXh" style="display:flex;gap:0.5em"><span style="min-width:1.5em">d.</span><div><span>判断目标是否已经得到验证；</span></div></div><div id="f-doxcnfFVavgLJ5Pnq9AiY7WO7ng" style="display:flex;gap:0.5em"><span style="min-width:1.5em">e.</span><div><span>未通过则继续迭代，通过则结束；达到迭代次数、无进展或预算上限等硬性限制时，停止并交给人类。</span></div></div></div>

<div id="f-doxcnOc8AfAvwIN0nP9EivLmgUg"><img alt="" decoding="async" height="877" loading="lazy" src="/images/agent-learning/4a34e6c29b18f50a34fea0b0.png" width="1280"/></div>

<p id="f-doxcnEVHtIfBlKMt8KP1PG3dz4b"><span>Loop 的关键，不只是让模型“再试一次”，而是把人从每一轮审查中移出，节省人的时间，或至少减少人的工作量。最简单的实现甚至可以直接写进提示词：要求 Agent 审查并修改自己的工作，直到代码测试全部通过。 大家使用ClaudeCode里面的/goal 其实就是一个典型的Loop工程的案例。</span></p>

<p id="f-doxcnFh8se45QXOLLs7jgyxvyze"><span style="font-weight:bold">Graph：当一个 Loop 不够时</span></p>

<p id="f-doxcnwCf5v5qLbIv7EbjMZub40c"><span>当一个 Loop 无法完成复杂任务时，Graph 的讨论就开始了。Graph 不是 Loop 的对立面，因为 </span><span style="font-weight:bold">Graph 本身可以包含 Loop</span><span>。它只是比单一循环多了一层编排，让多个 Agent 像一个团队一样分工、交接、审查、返工。</span></p>

<p id="f-doxcnCLmpAzK8CtuRLK0CRuEPbf"><span>以自动代码审查为例：</span></p>

<div style="margin-left:25px"><div id="f-doxcnHfK7qWqdm9K7ulmynfoAxe" style="display:flex;gap:0.5em"><span style="min-width:1.5em">a.</span><div><span>Codex 完成代码修改并创建 PR；</span></div></div><div id="f-doxcnYvEkNDeEyCX9htS70b0jec" style="display:flex;gap:0.5em"><span style="min-width:1.5em">b.</span><div><span>系统并行启动多个审计 Agent，分别检查安全、逻辑与性能、代码风格与文档；</span></div></div><div id="f-doxcnTWLMWSW6YVGhUdwfT8u8sd" style="display:flex;gap:0.5em"><span style="min-width:1.5em">c.</span><div><span>多个审计结果汇聚到 Verifier；</span></div></div><div id="f-doxcnp8yAMYUKXZSeG9wgFNFkng" style="display:flex;gap:0.5em"><span style="min-width:1.5em">d.</span><div><span>确认的问题交给 Fixer 修复；</span></div></div><div id="f-doxcnyCFWVThxayFMhlZsHHQkdb" style="display:flex;gap:0.5em"><span style="min-width:1.5em">e.</span><div><span>测试套件执行外部检查；</span></div></div><div id="f-doxcnchwZlQRTVjtwqxQhmlVrRg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">f.</span><div><span>测试失败则回到 Fixer，形成循环；测试通过则合并发布。</span></div></div><div id="f-doxcnUI8HUegTMGwxsz4bMVJKWd"><img alt="" decoding="async" height="853" loading="lazy" src="/images/agent-learning/32ba6304958f4b536589ed87.png" width="1280"/></div></div>

<p id="f-doxcnqrfF3zVINfzLELBVtVL3Ee"><span>这相当于模拟多个员工共同工作：有人执行，有人审核，工作在不同角色之间来回流转。这种人类早已熟悉的工作结构，就是一张图。</span></p>

<p id="f-doxcnuAaiDbcVKXkzj5UBxSnv9y"><span>所以，Loop 和 Graph 并不是非此即彼的替代关系：</span></p>

<blockquote id="f-doxcnJARt5hbB9GOyTFddJAGFFd"><p id="f-doxcnEZwyg5kDRrdhfpOK8gdKee"><span>Loop 是完成一个任务的反馈闭环；Graph 是组织多个任务、角色、分支和反馈闭环的更高一层结构。</span></p></blockquote>

<a id="f-doxcntX7jmRHhEOxd10vwX92GKg"></a>

##### Graph 工程是什么

<p id="f-doxcnqp25OQtQSOqJAgpzk1DAob"><span>Graph 工程，是把复杂的 Agent 工作过程显式画成并实现为一张执行图：节点承担任务，边决定下一步运行什么；系统可以分支、并行、汇聚、验证、返工或停止。</span></p>

<p id="f-doxcnrUj6MYdkWSv8lgaBhpVZ5b"><span>它与普通固定流水线的关键区别在于：普通流水线中的步骤遵循固定规则，而 Graph 中的 Agent 会解释任务。Agent 可能误解指令，也可能在下一次运行时做出不同选择，因此节点具有概率性。</span></p>

<p id="f-doxcn1xfewVoZlhP1elynkXu8ec"><span>过去，我们常把一切都塞进一个巨大的聊天上下文，让模型同时充当调度器、数据库、日志系统和项目经理。对于一次性的小任务，这种做法或许有效；但当工作持续数小时甚至数天、横跨多个代码仓库并涉及多个 Agent 时，它就会崩溃。</span></p>

<p id="f-doxcnd6ZdE6W4steeTh2Ee2YT3G"><span>把 Graph 明确画出来，会迫使我们预先思考并固定这些问题：</span></p>

<div style="margin-left:25px"><div id="f-doxcnHUwZ5jjItFlz7N18ETS8He" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>哪些任务可以并行运行？</span></div></div><div id="f-doxcndTDVK4bVToDvfEhIDdgGMc" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>节点之间传递什么状态？</span></div></div><div id="f-doxcnlLharsVaDZOy5Do8T82uDh" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>谁可以否决结果？</span></div></div><div id="f-doxcn6JQP0JQ1fHhfAHEUvfzhPf" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>系统在停止之前最多可以花费多少成本？</span></div></div></div>

<p id="f-doxcnJQs9zmXiP7a2GRXq9WGddd"><span>一套完整的 Graph 不只有“执行图”，还需要“控制图”：执行图回答“接下来运行什么”，控制图回答“谁来检查做决定的人”。指标、审计、权限、人类否决权以及来自真实世界的反馈，共同为系统提供现实锚点。</span></p>

<p id="f-doxcnXlqhiPsnEV4yDrXC8mVrvd"><span>其实我们之前学Agent编排的时候，学到的Agent的各种编排模式，像</span><span style="font-weight:bold">prompt chain</span><span>, routing, parallelization 这些Agent编排模式，其实都是Graph。看到这里，你应该能理解，其实Graph工程也并不是什么新的概念。</span></p>

<div id="f-doxcnCQVIVWTCUeZjTWxLHjvf0a"><img alt="" decoding="async" height="855" loading="lazy" src="/images/agent-learning/662b70f6c7b5b412ec84ca81.png" width="1280"/></div>

<a id="f-doxcnnKwGSSmF1PkOqHLfQcmzug"></a>

##### 最佳实践和建议

<p id="f-doxcnLs7bDTIATUMbfTC3bUHote"><span style="font-weight:bold">不要把“更多 Agent”误认为“更高质量”</span></p>

<p id="f-doxcnWOilKGTQij3adjB1dbrhjd"><span>由 Agent 检查 Agent 的 Graph，可能产出极其有组织的胡说八道。20 个使用同一模型、读取同一份错误上下文的 Agent，可能会以工业化规模彼此赞同。模型本来就倾向于偏爱自己的回答，因此也容易彼此认同。</span></p>

<p id="f-doxcntYspnmAev44qCxOR2HNcHe"><span>如果 Graph 中有多个 Agent，应精心设计评审系统：</span></p>

<div style="margin-left:25px"><div id="f-doxcnGTBgheSpt3ueQU1szGY15c" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>使用来自不同模型的多个 Reviewer；</span></div></div><div id="f-doxcnyVKpEJVXDUGx14DfRlp1Uh" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>给 Reviewer 提供彼此独立的新鲜上下文；</span></div></div><div id="f-doxcnzaLmdrpoeKsdnr7gJI6Z1f" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>合并多个 Judge 的判断，而非盲从单一多数意见；</span></div></div><div id="f-doxcnbNLL0MEiRkniRHcGeypGhg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>在重要发布前，保留最后一次人工检查。</span></div></div></div>

<p id="f-doxcnTdx10fCtMkqthFVla4qjyf"><span style="font-weight:bold">至少保留一个 Graph 之外的现实锚点</span></p>

<div style="margin-left:25px"><p id="f-doxcng1nerlvMXEUNp2QvNYgOTb"><span>扩展 Agent 系统时，至少应有一种检查不属于同一套概率性自证循环，例如：</span></p><div id="f-doxcn9Bjg7Ta2T8f3mAdRXhbUJg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>确定性的代码测试或代码审查规则；</span></div></div><div id="f-doxcnd941veaYlxBmGEinsxlE3f" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>人工检查与否决权；</span></div></div><div id="f-doxcnnYAMVC0w7KR0ZyYPnCF3sh" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>可直接观测的业务指标，例如实际收入、成本或其他外部结果。</span></div></div><p id="f-doxcngG8C1SRfaXibOogcD2924b"><span>这些外部指标和检查用来确认系统没有只是在规模化地产出低质量内容。追求质量时，不可能把所有事情都自动化。</span></p><div id="f-doxcnRxiH8QFY76h1zmcNRArpuc"><img alt="" decoding="async" height="647" loading="lazy" src="/images/agent-learning/2a375acdc7a0088d90d03552.png" width="1146"/></div></div>

<p id="f-doxcnjre3mZNcbKQAURgAPbdEtd"><span style="font-weight:bold">从一个简单 Loop 开始</span></p>

<p id="f-doxcn7S03698yKOxZaS9pl3J63e"><span>不要因为一个新热词，就立刻搭建一个整夜运行的 40-Agent Graph。那很可能只会耗尽 Token，几乎没有真实进展。</span></p>

<p id="f-doxcnQLnjpuO8EQ9y4pM2CuHfAb"><span>更稳妥的顺序是：</span></p>

<div style="margin-left:25px"><div id="f-doxcn7MTaIN9TT8kf3GeIvDDgMd" style="display:flex;gap:0.5em"><span style="min-width:1.5em">a.</span><div><span>选择一个真实、重复发生的任务；</span></div></div><div id="f-doxcnPK3DQ100hAKqmHUaH9wSoX" style="display:flex;gap:0.5em"><span style="min-width:1.5em">b.</span><div><span>为它设置一个真正有效的验证器；</span></div></div><div id="f-doxcnhhoFdXqHURWdHROcsfkZdg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">c.</span><div><span>明确预期的状态；</span></div></div><div id="f-doxcn2SHUcjkNtkazlhR6C6DeWg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">d.</span><div><span>建立一个能快速查看关键指标的界面，并持续改进；</span></div></div><div id="f-doxcnW36OVEYPHHnbgMWRO1iCNf" style="display:flex;gap:0.5em"><span style="min-width:1.5em">e.</span><div><span>设置真正的硬停止条件，包括迭代次数、无进展和预算上限；</span></div></div><div id="f-doxcnSLPA3JC1YEdTZWPxfaGWVg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">f.</span><div><span>持续运行，直到理解它会如何失败；</span></div></div><div id="f-doxcno9nIN8Ip6gjMqlXb0mA3Rg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">g.</span><div><span>只有当工作负载确实要求扩展时，再增加 Reviewer、并行分支，或拥有否决权的安全检查。</span></div></div></div>

<p id="f-doxcnZbVOAHUj6XkymYQlon2iRe"><span>到那时，你就拥有了一张 Graph。其实它可能一直都存在，只是过去没有被画出来，而且人承担了其中的大部分节点。随着自动化节点增加，人在图中的参与会减少，但仍然应该保有控制权。</span></p>

<a id="f-doxcnVzbEqVRXlMTFNBcsT3Dhwg"></a>

##### 结语

<p id="f-doxcnoS5mL33HN4KZZzPB01dWEc"><span>Loop 工程并没有死。Graph 工程只是当 Agent 编排变得更容易之后，人们开始更严肃地看待编排问题的新名字。</span></p>

<p id="f-doxcnSSJurKHV0S2TJCGXkH8jen"><span>真正长期有效的能力，不是追逐 Loop、Graph 或下一个热门术语，而是判断：</span></p>

<blockquote id="f-doxcnwVz3ZDqMOeetg4ORuLedth"><p id="f-doxcntgEZvH1JqslqgD73JAUTAf"><span>系统中的哪些部分值得交给概率性的 Agent，哪些部分应该继续保持朴素、确定且可验证。</span></p></blockquote>

<p id="f-doxcniyVAn1OcnYQaLKJjDvkYvg"><span style="font-weight:bold">Graph 工程的价值，不在于让 Agent 越多越好，而在于把复杂协作显式化</span><span>：明确任务如何流转、状态如何传递、结果由谁验证、错误如何返回，以及系统何时必须停止。</span></p>

<a id="f-doxcnbYvgN4QW3bqrRPTdGwnQ9e"></a>

##### 面试问题

<p id="f-doxcnmiiug6Ql68QvMYvNoX0Wob"><span style="font-weight:bold">你最近了解的 Agent 里面的新技术是什么？</span></p>

<p id="f-doxcnjxE0ZIN9B8uPIRrdlcTZ2b"><span>我最近关注到的是 Graph 工程。它其实是从 Prompt 工程、Context 工程、Harness 工程、Loop 工程一路演进下来，AI 圈最近比较火的一个说法。</span></p>

<p id="f-doxcnqHJzkYijElCs689m04DS1f"><span>简单来说，</span><span style="font-weight:bold">Loop 工程是让一个 Agent 围绕一个目标持续行动，由外部验证器检查结果，失败就回到循环，达标或触发硬停止条件才结束；而 Graph 工程是在 Loop 之上再加一层编排，把复杂的 Agent 工作过程显式画成一张执行图</span><span>：节点承担任务，边决定下一步运行什么，系统可以分支、并行、汇聚、验证、返工或停止。</span></p>

<p id="f-doxcnJaHPLeRDbiz2OkjzdJT5ie"><span>一个典型例子就是自动代码审查：Codex 改代码建 PR，然后并行启动多个审计 Agent 分别查安全、逻辑性能、风格文档，结果汇聚到 Verifier，确认的问题交给 Fixer 修，测试通过就合并，失败就回到 Fixer 形成循环。本质上它模拟的是多个员工分工协作的结构。</span></p>

<p id="f-doxcnKPusXZkVTVSvZj9iAlS0je"><span style="font-weight:bold">什么是 Graph 工程，你怎么看待 Graph 工程的诞生？</span></p>

<p id="f-doxcnRFYSLKQl9DV2v47KnapLFh"><span>Graph 工程就是把复杂的 Agent 工作过程显式地画成并实现为一张执行图：</span><span style="font-weight:bold">节点承担任务，边决定下一步运行什么，系统可以分支、并行、汇聚、验证、返工或停止。</span><span>它和普通固定流水线的区别在于，流水线的步骤遵循固定规则，而 Graph 里的 Agent 会去解释任务，节点是概率性的，可能误解指令，也可能下一次运行做出不同选择。一套完整的 Graph 除了“执行图”（接下来运行什么），还需要“控制图”（谁来检查做决定的人），靠指标、审计、权限、人工否决这些现实锚点来兜底。</span></p>

<p id="f-doxcndoVdoOdqhcGw71CbbVhxRf"><span>至于它的诞生，我的看法是它其实不是一个全新的概念。它最早来源于国外大佬的两条玩笑推文，本意是在调侃 AI 圈给概念改名的速度。我们之前学 Agent 编排的时候，</span><span style="font-weight:bold">prompt chain、routing、parallelization 这些编排模式本身就是 Graph</span><span>。所以 Graph 工程更多是把我们本来就在用的东西换了个更高级的说法——这张图其实一直都存在，只是过去没有被显式画出来，而且大部分节点是由人来承担的。</span></p>

<p id="f-doxcnanRcgDJhAlkTt7E3VP2tjh"><span style="font-weight:bold">从 Prompt 工程到 Context 工程一直到 Graph 工程，你能聊一聊你对这些名词不断产生的看法吗？</span></p>

<p id="f-doxcnlFOt6m4iWyrHzqF5Gc265g"><span>可以认为这些名词其实描述的是同一件事不断扩大的不同层次：</span><span style="font-weight:bold">Prompt 工程关心“问什么”，Context 工程关心“发送什么”，Harness 工程关心“如何运行”，Loop 工程关心“如何让它一直运行直到任务完成”，Graph 工程关心“如何让多个任务和循环按明确的路径协同运行”。它们是逐层扩展的关系，而不是谁取代谁</span><span>——比如 Graph 并不是 Loop 的对立面，Graph 本身就可以包含 Loop。</span></p>

<p id="f-doxcnrK6JGa5lNAr3OEdMu7xkHd"><span>所以我对这种名词不断迭代的态度是：</span><span style="font-weight:bold">一方面不要被唬住，因为它们本质上不是全新概念，多少是新瓶旧酒</span><span>。</span><span style="font-weight:bold">落到实践上，</span><span>我更认同的做法是不要因为一个新热词就去堆几十个 Agent 的大 Graph，而是从一个真实、重复发生的任务、一个真正有效的验证器和明确的硬停止条件开始，需要扩展时再逐步加 Reviewer、并行分支和安全检查。真正长期有效的能力，不是追逐下一个热门术语，</span><span style="font-weight:bold">而是判断系统里哪些部分值得交给概率性的 Agent，哪些应该保持朴素、确定且可验证。</span></p>


<a id="section-2087"></a>
## Harness Engineering（驾驭工程）

<a id="t-block-24578"></a>

<blockquote id="t-33I3sPlwC9EvIFCwzaUier"><p id="t-9Kd7KY9uFs5o8G8Ibbxow0"><span>AI 模型已经能写出 100 万行代码。真正的挑战不再是让它写得更好，而是</span><span style="border-bottom:1px solid;font-weight:bold">怎么驾驭它稳定、可靠、不失控地工作</span><span>。这套围绕 AI 智能体构建约束、反馈与控制系统的方法论，就是 2026 年初迅速席卷工程圈的新范式——</span><span style="border-bottom:1px solid;font-weight:bold">Harness Engineering（驾驭工程）</span><span>。</span></p></blockquote>


<a id="section-2088"></a>
## 一、什么是 Harness Engineering？

<a id="t-NYr2iBRhR4OHHYXnlWz2vz"></a>

<div id="t-1sp4v7cqoKFzBjNCJHTtyq"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/e8f4bd33a0167dfb8139daa2.png"/></div>

<p id="t-LkAC9m1MhNrNBOnhPLfXUD"><span style="border-bottom:1px solid">这个概念由 HashiCorp 联合创始人 Mitchell Hashimoto 在 2026 年 2 月 5 日首次提出，六天后 OpenAI 在百万行代码实验报告中正式采用这一术语，随后 Martin Fowler 撰文深度分析，一个月内成为开发者社区的高频词。</span></p>

<blockquote id="t-RsckMRBqiOYDViqOefblBD"><p id="t-hpI7iKs6S8EZ59QObQ6xZm"><span style="border-bottom:1px solid">harness engineering is the idea that anytime you find an agent makes a mistake, you take the time to engineer a solution such that the agent will not make that mistake again in the future.</span></p>
<p id="t-GSZjs7GTt9KxdoCbE08iGb"><span style="border-bottom:1px solid">—— Mitchell Hashimoto</span></p></blockquote>

<p id="t-DNMyBrKmNXFmyoxizkXtAl"><span style="border-bottom:1px solid">这句话的潜台词是：</span><span style="border-bottom:1px solid;font-weight:bold">Agent 的每一次失败，都是环境设计不完善的信号。</span><span style="border-bottom:1px solid">正确的回应不是换一个更强的模型，而是重新设计它运行的环境。</span></p>


<a id="section-2089"></a>
## 二、为什么需要驾驭工程？真实数据说话

<a id="t-CfB2LftXHGypfMscBzw13Y"></a>

<div id="t-TJYRSfP0n0iN8YGtA1OeyX"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/2bde63d87bc9c3ffdbba73bc.png"/></div>

<p id="t-4J65GRqVL6d468SWxhEzer"><span style="border-bottom:1px solid">LangChain 的案例尤其有说服力：底层模型一个参数都没动，</span><span style="border-bottom:1px solid;font-weight:bold">仅仅通过优化外部驾驭环境</span><span style="border-bottom:1px solid">（文档结构、验证回路、追踪系统），编码 Agent 在 Terminal Bench 2.0 的得分从 52.8% 飙升至 66.5%，全球排名从第 30 位跃升至第 5 位。</span></p>

<p id="t-IAUBdsJVWfRZ43Ja5jQVAr"><span style="border-bottom:1px solid">五个独立团队也得出了相同结论：</span><span style="border-bottom:1px solid;font-weight:bold">瓶颈不在模型智能，而在基础设施。</span></p>


<a id="section-2090"></a>
## 三、AI 工程范式的三次跃迁

<a id="t-mhytT0zrV4NYnQCb38UQqM"></a>

<p id="t-CmZtrTYk68FL0xHNWcY1up"><span style="border-bottom:1px solid">要理解驾驭工程为何重要，需要先看清楚我们是怎么一步步走到这里的。</span></p>

<div id="t-gseVvaj5Zi9wr0cKsqZ6Lv"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/ff150d5f0227f88fc31f0fb7.png"/></div>

<div id="t-GljDRvPIjnwqaW8TfRQ8PI"><table><colgroup><col width="106.89755249023438"/><col width="146.89752197265625"/><col width="229.01025390625"/><col width="174.005126953125"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>范式</span></p></td><td style=" vertical-align: top"><p><span>核心问题</span></p></td><td style=" vertical-align: top"><p><span>优化对象</span></p></td><td style=" vertical-align: top"><p><span>交互模式</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">提示词工程</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">怎么把话说清楚</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Prompt 的措辞、格式、示例</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">一问一答</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">上下文工程</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">怎么给 AI 喂信息</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">文档、代码片段、历史对话</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">信息注入 → 生成</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">驾驭工程</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">怎么让 Agent 可靠工作</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">约束、反馈回路、控制系统</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">人类掌舵，Agent 执行</span></p></td></tr></tbody></table></div>

<p id="t-aX9VIcJJRWGSJI0ZUDmlH5"><span style="border-bottom:1px solid">一个好记的类比：</span></p>

<ul><li id="t-Dfx0LbMMQOOmgrRrNFRdFh"><span>Prompt Engineering ——</span><span style="border-bottom:1px solid;font-weight:bold">对马喊话的技巧</span></li></ul>

<ul><li id="t-66IkND0DCVoh77114GXLb2"><span>Context Engineering ——</span><span style="border-bottom:1px solid;font-weight:bold">给马看的地图</span></li></ul>

<ul><li id="t-qu2U1tpi2dTOI4PJgJCd0d"><span>Harness Engineering ——</span><span style="border-bottom:1px solid;font-weight:bold">给马造一条高速公路，配上护栏、限速牌和加油站</span></li></ul>


<a id="section-2091"></a>
## 四、Agent 常见失败模式

<a id="t-OrjtBMgPvCtV9DeeMI4Axs"></a>

<p id="t-g1ltfYn0d02wfZNhQjp17i"><span style="border-bottom:1px solid">Anthropic 工程师在长时间运行 Agent 的过程中，总结了三种典型的翻车姿势，正是驾驭工程要解决的核心痛点：</span></p>

<blockquote id="t-GqIXXPNj8BoNB6f1YBmoXT"><p id="t-nhiW4GNfgEVMqYkuTriLoH"><span style="border-bottom:1px solid;font-weight:bold">失败模式 1：试图一步到位（One-shotting）</span></p>
<p id="t-UBUaWrkNkR5xMkCQtRUXzh"><span style="border-bottom:1px solid">Agent 倾向于在一个会话里把所有功能都做完。结果是上下文窗口耗尽，留下一堆没有文档的半成品代码，下一个会话启动时只能花大量时间猜测之前发生了什么。</span></p></blockquote>

<blockquote id="t-tqMFqbfYv4sSRBrNkmnJWN"><p id="t-s9KwV3ftDYafpumY2gVLEC"><span style="border-bottom:1px solid;font-weight:bold">失败模式 2：过早宣布胜利</span></p>
<p id="t-FJrELmVO2gG17HVEZUuIpD"><span style="border-bottom:1px solid">在项目后期，当部分功能已经完成后，Agent 会环顾四周，看到已有进展就直接宣布任务完成——即使还有大量功能未实现。</span></p></blockquote>

<blockquote id="t-7sCVd71QNs23cB5jaumXya"><p id="t-48bKOeW12VBkysfKn20GRP"><span style="border-bottom:1px solid;font-weight:bold">失败模式 3：过早标记功能完成</span></p>
<p id="t-97dBCknBQJvrWOTebJgBwu"><span style="border-bottom:1px solid">在没有明确提示的情况下，Agent 写完代码就标记为完成，却没有做端到端测试。单元测试或 curl 命令通过了不代表功能真正可用。</span></p></blockquote>

<p id="t-7WD5uFe4T6mTeh6KcDYpKX"><span style="border-bottom:1px solid">此外，智能体还有一个危险特性：</span><span style="border-bottom:1px solid;font-weight:bold">它非常擅长模式复制</span><span style="border-bottom:1px solid">。代码库里有什么模式，它就忠实地复制并放大——包括坏模式和架构漂移。这意味着不加约束的 Agent 会以惊人的速度积累技术债务。</span></p>


<a id="section-2092"></a>
## 五、驾驭工程的四大护栏

<a id="t-yOOS4yqn1hw0m2bcODW9nQ"></a>

<p id="t-bk9McAbB3LPzsBIqIHXljq"><span style="border-bottom:1px solid">综合 OpenAI、Anthropic、LangChain 和 Martin Fowler 的实践，Harness 可以归纳为四个核心组件，即四根"护栏"：</span></p>

<div id="t-m1VxC1fy1LbeZQH4NpCYfR"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/b7bab048ed350dc4e961fbad.png"/></div>


<a id="section-2093"></a>
## 护栏一：上下文工程（Context Engineering）——新员工手册

<a id="t-6QdI4n03mb1WGRvGmTLTTQ"></a>

<blockquote id="t-c4j6H2gUnSubxouBeGslQE"><p id="t-0apwtoHpO1g9kURkWgICkt"><span style="border-bottom:1px solid">就像给新员工一本详细的工作手册，</span><span style="border-bottom:1px solid;font-weight:bold">AGENTS.md</span><span style="border-bottom:1px solid"> 是 AI 智能体进入代码仓库时看到的第一份指南。但这不是一本静态的 1000 页说明书——上下文是稀缺资源，过多的指导反而会挤掉任务、代码和相关文档的空间，变成陈旧规则的坟场。</span></p>
<p id="t-8uu4nXSpuy69cc8Y7fHXav"><span style="border-bottom:1px solid">更好的做法是：提供一个稳定、小巧的入口点，然后教 Agent 根据当前任务按需检索和拉取更多的上下文。Mitchell Hashimoto 的 Ghostty 项目 AGENTS.md 里每一行都对应一个历史 Agent 失败案例——文档是活的反馈循环，不是静态制品。</span></p></blockquote>


<a id="section-2094"></a>
## 护栏二：架构约束（Architecture Con straints）——缰绳

<a id="t-f4LSXwyXsHLs0j9CcJWkt4"></a>

<blockquote id="t-5AynURTIIIOrxzLnwECVws"><p id="t-EUw4tdYcxQwVu8NZ7SrALe"><span>OpenAI 团队建立了严格的层级依赖模型：</span></p>
<p id="t-G4X28JSYyOePVuPj4lbuCO"><span style="font-weight:bold">Types → Config → Repo → Service → Runtime → UI</span></p>
<p id="t-bwCOHsRQHL8xlD1MLMUsOg"><span>下层不能反向依赖上层。所有架构规则被编码为</span><span style="font-weight:bold">自定义 Linter 规则</span><span>，违反即 CI 阻止合并——无论代码是人写的还是 AI 写的。</span></p>
<p id="t-x6oDBdA7ADpBBiTGKeTkSV"><span>有个关键细节：Linter 的错误信息本身也是上</span><span style="border-bottom:1px solid">下文工程。它不只说你违反了规则 X，而是解释为什么这个规则存在、正确做法是什么，这样 Agent 读到错误后就能自我理解并修正，不需要人类介入。</span></p></blockquote>


<a id="section-2095"></a>
## 护栏三：反馈循环（Feedback Loop）——智能体审智能体

<a id="t-UIBaeWBugivjj6Wqpn9LqC"></a>

<blockquote id="t-oN7tu32M9O5c6PBYEdrbSy"><p id="t-T7OHR3U6U42j1PxxNVq3Ci"><span style="border-bottom:1px solid">传统开发中，人类工程师负责代码审查（Code Review）。在驾驭工程中，这个工作变成了智能体对智能体的方式：Codex 在本地审核自身更改，请求额外审查，循环往复直到通过。</span></p>
<p id="t-dT1rLNPa9GVRFBKxkY9ZdM"><span style="border-bottom:1px solid">反馈循环中的钩子可以运行预定义的测试套件，并在失败时带着错误信息循环回到模型，或者提示模型独立评估其代码。如果 AI 写的测试用例通过了带有 Bug 的代码，Harness 就会判定测试无效，强迫它重新思考测试边界。</span></p></blockquote>


<a id="section-2096"></a>
## 护栏四：熵管理（Entropy Management）——垃圾回收

<a id="t-zFixa1ZYNeleaSGe9udIvA"></a>

<blockquote id="t-GVLeLqJZUdcpSNEEtqahLV"><p id="t-CH9RXT65MEYJzCDM29THhi"><span style="border-bottom:1px solid">随着时间推移，软件系统会逐渐混乱（熵增），技术债务会积累。OpenAI 采用持续小额偿还的策略，而不是等问题严重时集中处理——他们把这个方法形象地称为</span><span style="border-bottom:1px solid;font-weight:bold">垃圾回收</span><span style="border-bottom:1px solid">，并认为技术债务就像高息贷款。</span></p>
<p id="t-rweTpFHLBILohs86cvNKBQ"><span style="border-bottom:1px solid">具体措施：定期运行后台 Codex 任务扫描偏差、更新质量等级、发起针对性重构 PR。此外还有一个专门的</span><span style="border-bottom:1px solid;font-weight:bold">Doc-gardening Agent</span><span style="border-bottom:1px solid">（文档园丁代理），在后台自动扫描文档与代码之间的不一致，发现过时内容就自动提交 PR 修复——Agent 为 Agent 维护文档。</span></p></blockquote>


<a id="section-2097"></a>
## 六、六大行业共识

<a id="t-O5SoMcv2ehZcunDH8hcPtR"></a>

<p id="t-uY87NbMP5FEHwzW8ERJTQX"><span style="border-bottom:1px solid">综合 OpenAI、Anthropic、LangChain、Stripe、HashiCorp 等多个独立信息源，业界在以下六个方面已形成明确共识：</span></p>

<div id="t-tiHBAFQIMd7hJFM1lMr9i6"><table><colgroup><col width="61.897552490234375"/><col width="199.00518798828125"/><col width="372.01025390625"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>#</span></p></td><td style=" vertical-align: top"><p><span>共识</span></p></td><td style=" vertical-align: top"><p><span>核心观点</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">1</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">瓶颈在基础设施，不在模型智能</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">五个独立团队得出相同结论。仅改变 Harness 工具格式，就能让模型得分从 6.7% 跳到 68.3%</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">2</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">文档必须是活的反馈循环</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">静态文档是坟场，动态文档才有价值。让后台 Agent 定期清理过时文档并提交 PR</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">3</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">思考与执行分离</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">复杂任务不可能在单个上下文窗口内完成，需要 Orchestrator + Worker 分层架构，状态持久化到外部存储</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">4</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">上下文不是越多越好</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">上下文是稀缺资源。巨大的指令文件会挤掉任务空间，应按需检索、动态注入</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">5</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">约束必须自动化</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">人工 Review 是瓶颈。护栏要编码为 Linter、CI、类型系统，让机器来执行而非人</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">6</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">工程师角色在转变</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">从代码的编写者变成环境的建筑师。最大的工程挑战是设计让 Agent 可靠工作的控制系统</span></p></td></tr></tbody></table></div>


<a id="section-2098"></a>
## 七、Harness 与传统框架的关系

<a id="t-gRn7X8kNbi7xjE3R3lxVvo"></a>

<p id="t-RAcUz13jRrQiuebbdfNiL3"><span style="border-bottom:1px solid">Harness 不是 SDK、脚手架或 Agent 框架的替代品，而是</span><span style="border-bottom:1px solid;font-weight:bold">位于它们之上的一层</span><span style="border-bottom:1px solid">：</span></p>

<div id="t-j8eQEkz8FR2x2IGWEmuCf1"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/120925473abfc42beea9e751.png"/></div>

<p id="t-PhxzFEN6lLAbn1qZgZcU0v"><span style="border-bottom:1px solid">传统框架解决的是</span><span style="border-bottom:1px solid;font-weight:bold">如何构建 AI 智能体</span><span style="border-bottom:1px solid">，而驾驭层解决的是完全不同的问题：</span><span style="border-bottom:1px solid;font-weight:bold">智能体如何可靠地运行</span><span style="border-bottom:1px solid">。</span></p>

<p id="t-SORwEGIBrm4XC2PhUVXOwp"><span style="border-bottom:1px solid">模型正在逐渐吸收框架约 80% 的功能（智能体定义、消息路由、任务生命周期……），但剩余 20%——</span><span style="border-bottom:1px solid;font-weight:bold">持久化、确定性重放、成本控制、可观测性、错误恢复</span><span style="border-bottom:1px solid">——正是驾驭层存在的价值。</span></p>


<a id="section-2099"></a>
## 总结

<a id="t-T2zCwQWTM1Nvb0GtUmAqLv"></a>

<p id="t-oNM4h4W0P4TH5auBMS28SD"><span style="border-bottom:1px solid">Harness Engineering 不是某一家公司的实验，而是整个行业正在经历的范式转移。</span></p>

<blockquote id="t-MUZBk13702dS6e5i9Mmfkk"><p id="t-ni3e1bEp6bnZJpV0mhf5b2"><span style="border-bottom:1px solid;font-weight:bold">Birgitta Böckeler 的总结最为精辟：</span></p>
<p id="t-zRJ4vt5JV2Xkjav90kcx6v"><span style="border-bottom:1px solid">为了获得更高的 AI 自主性，运行时必须受到更严格的约束。增加信任需要的不是更多自由，而是更多限制。</span></p>
<p id="t-f4Le6g9nS5pHGxCMCIT2AM"><span style="border-bottom:1px solid">就像高速公路上的护栏——正是因为有护栏，你才敢踩到 120 码。</span></p></blockquote>

<div id="t-BjT4Ncf7bhbedsyr2y2lpk"><table><colgroup><col width="167.89755249023438"/><col width="199.00689697265625"/><col width="304.005126953125"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>核心组件</span></p></td><td style=" vertical-align: top"><p><span>解决的问题</span></p></td><td style=" vertical-align: top"><p><span>代表实践</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">上下文工程</span><span style="border-bottom:1px solid">Context</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Agent 不知道该看什么、怎么找</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">AGENTS.md 活文档、按需检索</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">架构约束</span><span style="border-bottom:1px solid">Constraints</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Agent 复制并放大坏模式</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">分层依赖、自定义 Linter、CI 强制阻断</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">反馈循环</span><span style="border-bottom:1px solid;background-color:#eafaf1">Feedback</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Agent 不知道自己做错了</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Agent-to-Agent Review、自动测试套件</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">熵管理</span><span style="border-bottom:1px solid">Entropy</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">技术债务和文档腐烂</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Doc-gardening Agent、持续垃圾回收</span></p></td></tr></tbody></table></div>

<p id="t-EmFlHkoiKDGHLO8Hv5LgZO"><span style="border-bottom:1px solid">软件开发的未来，可能不再是关于我们能写多快多好的代码，而是关于</span><span style="border-bottom:1px solid;font-weight:bold">我们能设计多聪明、多鲁棒的系统来驾驭 AI 代理的巨大能量</span><span style="border-bottom:1px solid">。</span></p>

<p id="t-UVPfTRUkSNlyWWuC5WVg0P"><span style="border-bottom:1px solid">工程师的价值正在从执行者转变为赋能者和系统思考者 —— 从构建产品转向构建能够构建产品的工厂。</span></p>


<a id="section-2122"></a>
## Loop Engineering（循环工程）

<a id="t-block-24815"></a>

<p id="t-3GBrSq3FLHanl0PeWBKZoB"><span style="border-bottom:1px solid">Loop Engineering（循环工程）是 2026 年 6 月在 AI 编程社区迅速传播的一个新概念，由 Google 工程师 Addy Osmani 系统整理，Anthropic Claude Code 负责人 Boris Cherny 和开发者 Peter Steinberger 分别在公开场合提出了相同的观点。</span></p>

<p id="t-IvYGfDmtHsUQN4uSJLlarv"><span style="border-bottom:1px solid">本文将带你从零理解什么是 Loop Engineering、它与 Prompt Engineering 的本质区别、构成一个完整 Agent Loop 的六大要素，以及如何设计自己的第一个可运行的 Loop。</span></p>


<a id="section-2123"></a>
## AI 工程的演进过程

<a id="t-XlJepj5mkN5pTuDVsiu9yA"></a>

<p id="t-l7lqbDqSINYEgDf3UC2jcP"><span style="border-bottom:1px solid">过去两年，AI 开发的重点正在不断变化：从研究如何写好提示词（Prompt），逐步发展到组织上下文（Context）、编排工具与流程（Harness），再到构建能够自主运行、持续交付结果的循环系统（Loop）。</span></p>

<pre id="t-44AL9N4J7QhJikZpOctqnv"><code>Prompt：怎么问 AI
↓
Context：给 AI 什么信息
↓
Harness：如何组织 AI 的能力
↓
Loop：如何让 AI 持续创造结果</code></pre>

<div id="t-bsnuXbjLAnbssoKeKdxgS9"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/694adcf0c13ff660da90b541.webp"/></div>

<div id="t-T9bHLHZeWCakBUcTPThDvr"><table><colgroup><col width="100.89755249023438"/><col width="120"/><col width="75.89752197265625"/><col width="97.10931396484376"/><col width="76.00341796875"/><col width="69.11962890625"/><col width="91.9964599609375"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>工程阶段</span></p></td><td style=" vertical-align: top"><p><span>核心思想</span></p></td><td style=" vertical-align: top"><p><span>关注点</span></p></td><td style=" vertical-align: top"><p><span>输入内容</span></p></td><td style=" vertical-align: top"><p><span>AI 能力</span></p></td><td style=" vertical-align: top"><p><span>人的角色</span></p></td><td style=" vertical-align: top"><p><span>典型场景</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Prompt Engineering（提示词工程）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">通过设计提示词获得更好的输出</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">怎么问问题</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Prompt / 指令</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">单轮生成</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">提问者</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">聊天、写作、代码生成</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Context Engineering（上下文工程）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">组织并提供完整背景信息</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">给 AI 什么信息</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">知识库、历史记录、约束条件、上下文</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">上下文理解</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">信息组织者</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">RAG、AI 搜索、代码助手</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Harness Engineering（编排工程）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">连接模型、工具、数据形成工作流</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">如何调用能力</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">上下文 + API + 工具链</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">执行任务</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">系统设计者</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Agent、自动化流程、多工具协同</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Loop Engineering（循环工程）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">构建目标驱动的自主闭环系统</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">如何持续完成目标</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">目标、状态、记忆、验证机制</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">规划 → 执行 → 验证 → 修复 → 持续运行</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">规则制定者</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Claude Code、AI 编程、自动运营、AI 员工</span></p></td></tr></tbody></table></div>


<a id="section-2124"></a>
## Loop Engineering 的起源

<a id="t-hxbB29cYQKUXpG4ZxhQ5Es"></a>

<p id="t-3WvTQ5W9cqnoD4GfhJlNyz"><span style="border-bottom:1px solid">Loop Engineering 的出现有一个清晰的时间节点：2026 年 6 月。</span></p>


<a id="section-2125"></a>
## 引爆点：两句话，百万次转发

<a id="t-Whto2vpEzkBZ5G3sRi5XOv"></a>

<p id="t-hnInSIf6ZMbtY62MyisJWq"><span style="border-bottom:1px solid">2026 年 6 月初，Anthropic Claude Code 负责人</span><span style="border-bottom:1px solid;font-weight:bold">Boris Cherny</span><span style="border-bottom:1px solid">在一次公开演讲中说道：</span></p>

<blockquote id="t-2TXG3PcLBLdzZPUtSQOAKd"><p id="t-N3uAG9BCTsFHC4Z32Hrk71"><span style="border-bottom:1px solid;font-style:italic">"I don't prompt Claude anymore. I have loops running. They're the ones prompting Claude and figuring out what to do. My job is to write loops."</span><span style="border-bottom:1px solid;font-style:italic">（我不再直接提示 Claude 了。我有一套 Loop 在运行，它们负责提示 Claude 并决定下一步做什么。我的工作是编写 Loop。）</span></p></blockquote>

<p id="t-KrTksfI1BSTUQ9121IRcqq"><span style="border-bottom:1px solid">几天后，2026 年 6 月 7 日，开发者</span><span style="border-bottom:1px solid;font-weight:bold">Peter Steinberger</span><span style="border-bottom:1px solid">——开源 AI Agent 项目 OpenClaw（GitHub 历史上获星最快的新仓库）的创作者——发了一条十二个字的推文：</span></p>

<blockquote id="t-AijktMPGqxyxydtys6IvYG"><p id="t-mgoTOrKs3q49bUfqvrRhsk"><span style="border-bottom:1px solid;font-style:italic">"You shouldn't be prompting coding agents anymore. You should be designing loops that prompt your agents."</span><span style="border-bottom:1px solid;font-style:italic">（你不应该再手动提示 AI 编程助手了。你应该设计让 Agent 自己提示自己的 Loop。）</span></p></blockquote>

<ul><li id="t-RxcKM1LgsZVdaUbgwTyEsR"><span style="border-bottom:1px solid;font-weight:bold">Prompt Engineering</span><span>是「教 AI 怎么做」</span></li></ul>

<ul><li id="t-F7a1MUaaRhv5alxu8PkJqU"><span style="border-bottom:1px solid;font-weight:bold">Loop Engineering</span><span>是「设计一个系统，让 AI 自己持续做」</span></li></ul>

<div id="t-GcSWZWKwL8YVSzm0qSxDEs"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/df8d2f4689e63ecbb41a3fc1.webp"/></div>

<p id="t-JCfzeTyzudg8rcngU6jbQJ"><span style="border-bottom:1px solid">这两句话在 AI 开发者社区引发了巨大的讨论，因为它们精准地描述了一种很多人已经感受到但尚未命名的趋势：</span><span style="border-bottom:1px solid;font-weight:bold">提示词写得好不好，已经不是瓶颈了；瓶颈在于你为 Agent 设计的整套运行系统</span><span style="border-bottom:1px solid">。</span></p>

<p id="t-7blTOvYVdbqdHtxTkXVbAK"><span style="border-bottom:1px solid">随后，Addy Osmani 在 Substack 发表了长文，将这一实践正式命名并系统化为</span><span style="border-bottom:1px solid;font-weight:bold">Loop Engineering</span><span style="border-bottom:1px solid">，使其成为独立的工程学科。</span></p>


<a id="section-2126"></a>
## 背景：AI 编程工具的三代演进

<a id="t-Tq6Ugi3lUxb4MZiSJP70ig"></a>

<p id="t-Fh5eTDl0cOBfUmN4qlWnp9"><span style="border-bottom:1px solid">Loop Engineering 并非凭空而来，它是 AI 编程工具能力演进的自然结果。</span></p>

<div id="t-tI6qLVQnnKP1lod8V3BbPa"><table><colgroup><col width="127.89755249023438"/><col width="147.00689697265625"/><col width="171.00164794921875"/><col width="191.00341796875"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>阶段</span></p></td><td style=" vertical-align: top"><p><span>代表工具</span></p></td><td style=" vertical-align: top"><p><span>工作方式</span></p></td><td style=" vertical-align: top"><p><span>瓶颈</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">第一代：自动补全</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">GitHub Copilot 早期版本</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">补全当前行或函数，人类主导所有决策</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">只能辅助，不能自主</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">第二代：对话式</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">ChatGPT、Claude.ai</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">问一句，答一句，人类手动推进每一步</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">人类成为瓶颈，速度受限于打字速度</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;background-color:#eafaf1">第三代：Agent 自主循环</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Claude Code、OpenAI Codex Agent</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Agent 自主规划、执行、验证，循环迭代直到完成</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">如何设计让 Loop 可靠运行的系统</span></p></td></tr></tbody></table></div>

<p id="t-lGkQvZa9mb0BeC6RDAzxjG"><span style="border-bottom:1px solid">第三代工具的出现意味着，工程师的核心竞争力从会写提示词变成了会设计 Loop。</span></p>


<a id="section-2127"></a>
## 什么是 Loop Engineering

<a id="t-aGhcxYC5mFyqUhneXSK5d7"></a>

<p id="t-prRtJslAw3qgondsqPQiR3"><span style="border-bottom:1px solid">Loop Engineering 是设计、运营和持续改进反馈循环的工程实践，这些循环使 AI 编程 Agent 能够自主完成规划、执行代码修改、观察结果并在多轮迭代中完成任务。</span></p>

<p id="t-JdnRJFWjVwHoso4YSNJstI"><span style="border-bottom:1px solid">用一句话概括：</span></p>

<blockquote id="t-1SsYZXdi7Y47cZxQtTZvpd"><blockquote id="t-WyxkwoU7W0JpjMCFxUfXiJ"><span style="border-bottom:1px solid;font-style:italic;font-weight:bold">Loop Engineering 是把你从"提示 Agent 的人"变成"设计提示 Agent 的系统"的工程师。</span></blockquote></blockquote>


<a id="section-2128"></a>
## 什么是 Loop（循环）

<a id="t-7Q29aJhruamlYKtJsQw7F1"></a>

<p id="t-b14aNnB1yErt0xOqcpCrna"><span style="border-bottom:1px solid">一个 Loop 是一个递归目标系统：你定义一个目的，Agent 不断迭代，直到工作真正完成。</span></p>

<p id="t-t48vWZbEPJrkCi8SVtDQB3"><span style="border-bottom:1px solid">每个 Agent 在执行任务时已经内置了一个"内循环"：感知（Perceive）→ 推理（Reason）→ 行动（Act）→ 观察（Observe），然后再次循环。</span></p>

<p id="t-6ArKcy4Jnr2JJ9ZoJItMEE"><span style="border-bottom:1px solid">Loop Engineering 工作在这个内循环的</span><span style="border-bottom:1px solid;font-weight:bold">上一层</span><span style="border-bottom:1px solid">：</span></p>

<div id="t-fBAQ5ux1BGL6racCkHRAFN"><table><colgroup><col width="174.90621948242188"/><col width="120"/><col width="335.00860595703125"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>层级</span></p></td><td style=" vertical-align: top"><p><span>谁在驱动</span></p></td><td style=" vertical-align: top"><p><span>做什么</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">内循环（Agent 内置）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Agent 自身</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">读文件 → 修改代码 → 运行测试 → 读错误 → 再修改</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">外循环（你来设计）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">你设计的系统</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">按计划发现任务 → 分派 Agent → 验证结果 → 记录状态 → 开启下一轮</span></p></td></tr></tbody></table></div>

<p id="t-A9v3KmcWG0PUQe0SXgREFr"><span style="border-bottom:1px solid">你不再坐在 Agent 旁边，为每一步打下一条指令。你在设计一套外部系统，它替你驾驶内循环，而你去做更有判断价值的事。</span></p>


<a id="section-2129"></a>
## Loop Engineering 与 Prompt Engineering 的区别

<a id="t-qV7DlSjnB7Q5GEU8hyJlFn"></a>

<div id="t-6ioHTmZ9bMSczMkPMAYhl6"><table><colgroup><col width="144.89755249023438"/><col width="197.89752197265625"/><col width="312.03973388671875"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>维度</span></p></td><td style=" vertical-align: top"><p><span>Prompt Engineering</span></p></td><td style=" vertical-align: top"><p><span>Loop Engineering</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">优化对象</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">你手写的单条指令</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">自动决定"提示什么、什么时候提示、结果是否可接受"的整套系统</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">工作单位</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">一次你手动输入的对话轮次</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">跨越多轮次、自动运行的完整工作流</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">成功衡量</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">第一个回复的质量</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">最终输出的结果质量</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">失败模式</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">模型给出了一个差劲的回答</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">系统的 Loop 设计不良：循环太早停止、忽视错误信号、无法验证完成</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">对 Agent 的视角</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">你手持的工具</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">你调度的长期运行进程</span></p></td></tr></tbody></table></div>

<div id="t-BQO4Ff6nzUboyIUJyAqrjf"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/0f291fcff7c002f6d4494a40.webp"/></div>

<blockquote id="t-TRxDLQ2jiwkjyPDpIm6VTH"><p id="t-q1KymIlCqo0JsFJeunRTQz"><span style="border-bottom:1px solid;font-style:italic">Prompt Engineering 并没有消亡。一个 Loop 是由多个 Prompt 组成的，写得差的 Prompt 放进 Loop 里只会让糟糕的工作以更快的速度产出。Loop Engineering 是在 Prompt Engineering 之上的层次，而不是替代它。</span></p></blockquote>

<p id="t-r8zkJLZfHdxaDOePV1NmAh"><span style="border-bottom:1px solid">三个层次的完整技术栈：</span></p>

<div id="t-iECyg0MWZ4hijVaujbjhIh"><table><colgroup><col width="151.89755249023438"/><col width="244.89752197265625"/><col width="227.00164794921875"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>层次</span></p></td><td style=" vertical-align: top"><p><span>优化的是什么</span></p></td><td style=" vertical-align: top"><p><span>工作单位</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Prompt Engineering</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">如何措辞一条指令</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">你手动输入的一次对话</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Context Engineering</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">放什么内容进上下文窗口：文档、历史、工具定义</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">围绕一次回答的环境条件</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;background-color:#eafaf1">Loop Engineering</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">决定提示什么、何时提示、结果是否可接受的自运行系统</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">跨越多个内循环的自动工作流</span></p></td></tr></tbody></table></div>


<a id="section-2130"></a>
## Loop 的核心循环

<a id="t-Y4gupOIxFKRWTEVpsTRJYZ"></a>

<p id="t-MFRC5YlUSTAUJdOTfAWptY"><span style="border-bottom:1px solid">一个 Agent Loop 的基础结构由五个阶段构成，它们首尾相连，不断迭代。</span></p>

<div id="t-x168cdOlb2qqAVMPrjLAQv"><table><colgroup><col width="77.89755249023438"/><col width="120"/><col width="250.008544921875"/><col width="209.00164794921875"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>阶段</span></p></td><td style=" vertical-align: top"><p><span>英文名</span></p></td><td style=" vertical-align: top"><p><span>做什么</span></p></td><td style=" vertical-align: top"><p><span>典型信号来源</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">意图</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Intent</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">定义目标结果：成功是什么样子，约束是什么</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">开发者或外部系统（Issue、CI 报告）</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">上下文</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Context</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">收集相关代码、文档、报错日志、约定规范</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">代码库、测试输出、历史对话</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;background-color:#eafaf1">行动</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Action</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">编辑文件、运行命令、调用工具、草拟方案</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Agent 自主执行</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">观察</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Observation</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">获取测试结果、编译错误、运行时输出、代码 Diff</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">测试框架、类型检查、CI、人工 Review</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">调整</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Adjustment</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">根据观察更新计划，重复循环直到任务完成或被阻塞</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">下一轮内循环</span></p></td></tr></tbody></table></div>

<blockquote id="t-u5V33BOwsQeglLwCWvx7L2"><p id="t-Mw57NghjGyRfukEzc2oo4d"><span style="border-bottom:1px solid;font-style:italic">Loop 的力量不在于任何单独的步骤，而在于</span><span style="border-bottom:1px solid;font-style:italic;font-weight:bold">闭环</span><span style="border-bottom:1px solid;font-style:italic">。测试失败不只是一条错误消息，它是新的上下文；类型错误不只是阻断，它是一个关于错误假设的信号；Code Review 评论不只是反馈，它是驱动下一步行动的新观察。</span></p></blockquote>


<a id="section-2131"></a>
## 六大构成要素

<a id="t-LNgUaYVQlxxgHgX0vMCQng"></a>

<p id="t-lTTtE8HpuNeu54nSXAUFY3"><span style="border-bottom:1px solid">一个能够真正独立运行的 Loop 需要五个核心组件，加上一个贯穿始终的记忆系统，缺一不可。</span></p>


<a id="section-2132"></a>
## 要素一：自动触发器（Automations）

<a id="t-5LULxVBenzJqP0Vrdd8BBV"></a>

<p id="t-XqiTWCcl83Q6Lmwj09zFqL"><span style="border-bottom:1px solid">自动触发器是 Loop 的心跳。没有自动触发，Loop 就只是"你做了一次的操作"，而不是真正意义上的循环。</span></p>

<p id="t-BPQReXLPwKtQgNusWlp1t4"><span style="border-bottom:1px solid">触发器定义了：</span><span style="border-bottom:1px solid;font-weight:bold">什么时候？做什么？</span></p>

<p id="t-pQ7cqTUUJDX5GmjOw3EhQf"><span style="border-bottom:1px solid">在 Claude Code 中，使用</span><span style="border-bottom:1px solid">/loop</span><span style="border-bottom:1px solid">命令创建定时触发的 Loop：</span></p>


<a id="section-2133"></a>
## 实例

<a id="t-OO3x3MCPBZO4EEyyI7MxAo"></a>

<pre id="t-QndfNn4jNIsFIWRUWmQ53H"><code># 每天工作日早上 9 点运行：读取前一天的 CI 失败和 Issue，
# 将发现写入 TODO.md，并为标记为 quick-win 的问题起草修复方案
/loop "Read yesterday's CI failures and open issues, write findings \
       to TODO.md, and draft fixes for anything labeled quick-win" \
 --schedule "0 9 * * 1-5"

# /goal：运行直到一个可验证的条件成立
# 下面的命令会持续执行，直到认证模块的所有测试通过且 lint 干净
/goal "All tests in test/auth pass and lint is clean"</code></pre>

<p id="t-KXLCJV2DSNVnbYRCV2qlEE"><span style="border-bottom:1px solid">在 OpenAI Codex 中，Automations 有专属的 UI 面板，你可以设置项目、Prompt、节奏（cadence），以及是在本地检出还是后台 Worktree 中运行。发现内容的运行会进入 Triage 收件箱，未发现内容的会自动归档。</span></p>

<blockquote id="t-RqbSZXFPeiRATgcI7NIh90"><p id="t-V9kun5Pt0dFBGngdIvXPJ9"><span style="border-bottom:1px solid;font-style:italic;font-weight:bold">Token 成本警告：</span><span style="border-bottom:1px solid;font-style:italic">带验证子 Agent 的定时 Loop 每次触发都会消耗 Token，且消耗量因任务复杂度变化显著。建议先设置较慢的节奏（如每天一次），观察几天成本后再加快频率。</span></p></blockquote>


<a id="section-2134"></a>
## 要素二：并行隔离（Worktrees）

<a id="t-6TKnmluwxkeuXeZJzl9eqG"></a>

<p id="t-M6QDuZUdcrkLiOhTrnjnqF"><span style="border-bottom:1px solid">当你同时运行多个 Agent 时，文件冲突是最容易出问题的地方。两个 Agent 同时写同一个文件，就像两个工程师同时提交到同一行代码，结果是灾难性的。</span></p>

<p id="t-V1NGh5Fti4WoZaR3SevW02"><span style="border-bottom:1px solid;font-weight:bold">Git Worktree</span><span style="border-bottom:1px solid">是解决方案：为每个 Agent 提供独立的工作目录，各自在独立的分支上操作，共享同一个 Git 历史，但文件改动完全隔离。</span></p>


<a id="section-2135"></a>
## 实例

<a id="t-qINTbMNhScUWijg6RGnXrM"></a>

<pre id="t-CS4pBtE5BdcRTrxaHsmHtZ"><code># 手动创建 worktree（Claude Code 和 Codex 都支持自动管理）
git worktree add ../agent-fix-auth feature/fix-auth-tests
git worktree add ../agent-upgrade-deps feature/upgrade-axios

# 在 Claude Code 中，为子 Agent 配置 worktree 隔离
# 在 .claude/agents/reviewer.md 的 frontmatter 中添加：
# isolation: worktree   → 每个 Agent 获得独立的检出，完成后自动清理</code></pre>

<blockquote id="t-pHwqayqZ6QMkyrrmBKzadb"><p id="t-LuflkcAANYHPYub3QRrq3o"><span style="border-bottom:1px solid;font-style:italic">Worktree 消除了机械性的文件冲突，但不能消除</span><span style="border-bottom:1px solid;font-style:italic;font-weight:bold">审查瓶颈</span><span style="border-bottom:1px solid;font-style:italic">。你处理和批准代码变更的速度，才是决定你能并行运行多少个 Agent 的真正上限，而不是工具能开多少个 Worktree。</span></p></blockquote>


<a id="section-2136"></a>
## 要素三：技能文件（Skills）

<a id="t-FpXzUT8kRhNcTESlCXZcpM"></a>

<p id="t-FKzBtTaz9gUUDdFWac5q97"><span style="border-bottom:1px solid">Skills（技能文件）解决的是一个每次都在浪费的成本：</span><span style="border-bottom:1px solid;font-weight:bold">每次新对话，Agent 都要从零推断你的项目规范</span><span style="border-bottom:1px solid">。</span></p>

<p id="t-TtmzsNnd5Rh6JQWWz8YQdT"><span style="border-bottom:1px solid">Skill 是一个包含</span><span style="border-bottom:1px solid">SKILL.md</span><span style="border-bottom:1px solid">文件的文件夹，写明了项目约定、构建步骤、"我们不这样做是因为那次事故"等知识。Agent 在每次会话开始时加载 Skill，而不是每次都重新猜测。</span></p>


<a id="section-2137"></a>
## 实例

<a id="t-7MH305OLliVO6TbBCCSe52"></a>

<pre id="t-kC2e04XbWgtHO8ChElHmXw"><code>&lt;!-- 文件路径：.claude/skills/project-conventions/SKILL.md --&gt;
---
name: project-conventions
description: 项目编码规范和构建步骤。凡是涉及代码修改的任务都应加载此技能。
---

## 技术栈
- 后端：Node.js 20 + TypeScript 5.4 + Fastify
- 数据库：PostgreSQL 16，ORM 使用 Drizzle
- 测试：Vitest，测试文件放在 src/ 同级的 __tests__/ 下

## 构建命令
- 安装依赖：pnpm install
- 运行测试：pnpm test
- 类型检查：pnpm typecheck
- 构建产物：pnpm build

## 核心约定
- 所有数据库查询必须经过 src/db/queries/ 中的封装函数，禁止在业务层直接写 SQL
- 错误统一使用 AppError 类（src/errors/AppError.ts），禁止 throw 裸字符串
- API 路由文件命名：{resource}.routes.ts，放在 src/routes/
- 新增 API 必须同时更新 docs/api.md

## 禁止事项
- 不得直接修改 migrations/ 目录下的历史迁移文件
- 不得在 .env 文件中提交真实密钥，使用 .env.example 占位</code></pre>


<a id="section-2138"></a>
## 要素四：连接器（Connectors / MCP）

<a id="t-tSSZyDnFZ6tdTsoao5mr5Y"></a>

<p id="t-hdORKQkEZBto6uG0IuMN9z"><span style="border-bottom:1px solid">一个只能看到本地文件系统的 Loop 能做的事情非常有限。连接器（基于 MCP——模型上下文协议）让 Agent 能够读取 Issue 追踪、查询数据库、调用 API、在 Slack 发消息。</span></p>

<p id="t-n4wN03RiBBibobUe24jevA"><span style="border-bottom:1px solid">这是"Agent 说'这里是修复方案'"和"Loop 自动开 PR、关联 Ticket、CI 通过后通知频道"之间的核心差异。</span></p>

<p id="t-mXZyDjnWlCo9yh3mNwOjhu"><span style="border-bottom:1px solid">Claude Code 和 OpenAI Codex 均原生支持 MCP 协议，为一个工具编写的连接器通常可以在两者中通用。</span></p>


<a id="section-2139"></a>
## 实例：在 Claude Code 中配置 MCP 连接器

<a id="t-ULSnlBWyjLLPi2qeJoIVtT"></a>

<pre id="t-Ztlrw2LrOlhEUHaCKAZltr"><code>// 文件路径：.claude/mcp.json
// 配置 MCP 连接器，让 Agent 可以操作 GitHub 和发送 Slack 通知
{
 "connectors": [
 {
 "name": "github",
 "command": "npx",
 "args": ["-y", "@modelcontextprotocol/server-github"],
 "env": {
 "GITHUB_TOKEN": "${GITHUB_TOKEN}"
 }
 },
 {
 "name": "slack",
 "command": "npx",
 "args": ["-y", "@modelcontextprotocol/server-slack"],
 "env": {
 "SLACK_BOT_TOKEN": "${SLACK_BOT_TOKEN}"
 }
 }
 ]
}</code></pre>

<blockquote id="t-XFz0k0eLlDtiSw7dikun9Y"><p id="t-nj7KblhvbFIbdfyiU6iLns"><span style="border-bottom:1px solid;font-style:italic">给 Agent 接入连接器意味着它可以在真实环境中采取真实行动。必须为每个连接器配置最小权限，高风险操作（推送代码、合并 PR、发送外部通知）应当要求人工审批，不能全自动执行。</span></p></blockquote>


<a id="section-2140"></a>
## 要素五：子 Agent（Sub-Agents）

<a id="t-o09pxUkzOXvkjZdj6qSy47"></a>

<p id="t-ta6rG7tzdAuziCAAoPcxES"><span style="border-bottom:1px solid">Loop 中最重要的架构决策之一：</span><span style="border-bottom:1px solid;font-weight:bold">把写代码的 Agent 和检查代码的 Agent 分开</span><span style="border-bottom:1px solid">。</span></p>

<p id="t-skejhTRVot3tWlHSMhVJbx"><span style="border-bottom:1px solid">写了代码的模型在评分自己的作业时会过于宽容。一个有不同指令的独立检查器——有时还使用不同的模型——能够抓住第一个 Agent 自圆其说忽略的问题。</span></p>

<p id="t-VDUguaDQ4hVHLmmszWCsii"><span style="border-bottom:1px solid">这种"制作者-检查者"（Maker-Checker）模式也被应用到了 Loop 的停止条件上：Claude Code 的</span><span style="border-bottom:1px solid">/goal</span><span style="border-bottom:1px solid">命令在每次迭代后，会用一个单独的模型来判断是否"完成"，而不是让做了工作的那个模型来判断。</span></p>


<a id="section-2141"></a>
## 实例：定义检查者子 Agent

<a id="t-UnKtWyY0ZT94xmLgNY8PZi"></a>

<pre id="t-RIVWAoJgnMMzOi5GyL4nw5"><code>&lt;!-- 文件路径：.claude/agents/spec-reviewer.md --&gt;
---
name: spec-reviewer
description: 对完成的代码变更进行对抗性审查，验证其符合规范和测试要求。
model: opus            # 使用更强的模型作为验证者
isolation: worktree    # 独立检出，避免污染制作者的工作区
---

你是一个对抗性代码审查员。你的工作不是认可，而是质疑。

收到一个 diff 后，你需要：
1. 运行完整测试套件（pnpm test），记录失败项
2. 运行类型检查（pnpm typecheck）
3. 对照 SKILL.md 中的项目规范检查 diff
4. 验证用户可见的行为变化是否符合原始需求

只有当所有测试通过、类型检查干净、规范无违反时，才输出 APPROVED。
否则输出具体的拒绝理由，不要给出模糊评价。</code></pre>


<a id="section-2142"></a>
## 要素六：持久记忆（Memory）

<a id="t-Mc0VFvdK47iSu2931LTVos"></a>

<p id="t-McERt46NrHy9qewPiV3Qqr"><span style="border-bottom:1px solid">记忆是所有能跨对话持续运行的 Loop 的核心支柱。</span></p>

<p id="t-W8VgDlRlSg4flnbM58eclk"><span style="border-bottom:1px solid">模型在每次对话之间会完全遗忘。如果没有外部记忆，每次 Loop 触发时 Agent 都从零开始，不知道昨天做了什么、哪些修复已经合并、哪些任务还在开放。</span></p>

<p id="t-WjOw4kZRhajyzJ07Sr2uZC"><span style="border-bottom:1px solid">解决方案极其简单：</span><span style="border-bottom:1px solid;font-weight:bold">把状态写在文件里，文件放在仓库里</span><span style="border-bottom:1px solid">。仓库记得，即使模型不记得。</span></p>


<a id="section-2143"></a>
## 实例：Loop 状态文件

<a id="t-df3mI3o7gD7meGHQb8fKYO"></a>

<pre id="t-LujAoYnK3LKXpiaxwX59RI"><code>&lt;!-- 文件路径：TODO.md（Loop 的状态文件，随代码一起提交） --&gt;
# Loop 任务状态

最后更新：2026-06-14 09:03 UTC（由自动 Loop 更新）

## 进行中
- [ ] test/auth/login.spec.ts 中的 flaky test（CI Run #4821，失败 3 次）
 - 假设：并发测试之间的 session 状态泄漏
 - 已尝试：隔离 test 数据库连接 → 无效
 - 下一步：检查 beforeEach 中的 cleanup 逻辑

## 待处理
- [ ] 将 axios 升级到 1.7.x（安全漏洞 CVE-2026-xxxxx）
- [ ] API 文档更新（PR #308 合并后落后于代码）

## 已完成
- [x] 修复 billing 模块中含单引号公司名称导致的 500 错误（PR #312，已合并）
- [x] 将 Node.js 版本升级到 20.x（PR #307，已合并）</code></pre>


<a id="section-2144"></a>
## 五种常见 Loop 模式

<a id="t-Zxo5v9AuTdYzIGk4Do3y8J"></a>

<p id="t-FSmCMAVAhwAewYL8bHYxMf"><span style="border-bottom:1px solid">不同类型的工作任务需要不同的反馈信号和停止条件，因此发展出了几种经典的 Loop 模式。</span></p>

<div id="t-1LKqlx6SzUOHaZUeXjpjzj"><table><colgroup><col width="139.89755249023438"/><col width="146.89752197265625"/><col width="175.89752197265625"/><col width="183.89752197265625"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>模式</span></p></td><td style=" vertical-align: top"><p><span>核心观察信号</span></p></td><td style=" vertical-align: top"><p><span>停止条件</span></p></td><td style=" vertical-align: top"><p><span>典型场景</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">测试驱动 Loop</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">测试通过 / 失败</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">目标测试全部通过</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Bug 修复、回归测试、数据转换逻辑</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">编译器驱动 Loop</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">类型错误、编译错误列表</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">类型检查零错误</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">TypeScript 迁移、依赖升级、重构</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;background-color:#eafaf1">Review 驱动 Loop</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">人工 Review 评论</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">所有评论被处理或有据可查地忽略</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">PR Review 的机械性跟进</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">运行时调试 Loop</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">日志、堆栈跟踪、HTTP 响应</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">问题可复现 → 提出假设 → 验证修复</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">生产 Bug、性能问题、接口异常</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">产品迭代 Loop</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">截图、浏览器检查、可访问性报告</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">与设计稿对齐、响应式正常、规范无违反</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">落地页、UI 调整、营销组件</span></p></td></tr></tbody></table></div>


<a id="section-2145"></a>
## 构建你的第一个 Loop

<a id="t-e6ScVBP7r3fmCGuJOGvwBG"></a>

<p id="t-5LR5fDxuYOPZNJ2iH6Uxi8"><span style="border-bottom:1px solid">不要一开始就尝试构建一个全自动、多 Agent、自动合并 PR 的复杂 Loop。从最小可用的 Loop 开始，理解它的行为后再逐步扩展。</span></p>


<a id="section-2146"></a>
## 第一步：从一个窄任务开始

<a id="t-bvPWmT7bgSg4lrfZcBMJNF"></a>

<p id="t-bogc9jwDV4Pmozar8ofE5g"><span style="border-bottom:1px solid">任务越窄，Agent 越清楚哪些文件重要、哪些验证信号相关。</span></p>

<div id="t-x5Q9tQlcwEzis4l6FHGxns"><table><colgroup><col width="176.90447998046875"/><col width="466.9981689453125"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>不好的任务定义</span></p></td><td style=" vertical-align: top"><p><span>好的任务定义</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">"优化仪表盘性能"</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">"将仪表盘首次加载时间减少 30%，方法是推迟非关键图表加载，同时保持现有过滤器正常工作"</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">"修复 checkout 问题"</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">"修复 test/checkout/tax.spec.ts 中失败的税额计算测试"</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">"改进设置页面"</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">"修复账户删除按钮在移动端（375px 宽度）被截断的布局问题"</span></p></td></tr></tbody></table></div>


<a id="section-2147"></a>
## 第二步：明确告知验证方式

<a id="t-SEZin8QtirQxtJxoYYmUn7"></a>

<p id="t-dlQeHUFGL3Bb4mwYupnMeX"><span style="border-bottom:1px solid">Loop 需要知道"完成"意味着什么。如果你知道验证命令，把它直接写进指令。</span></p>


<a id="section-2148"></a>
## 实例：带验证条件的 Loop 指令

<a id="t-eqJBfktTKqCWluFJY8hWFl"></a>

<pre id="t-bNOYducgYIPaXoJMKvyxZ8"><code># 差：没有验证条件，Agent 不知道何时停止
/goal "Fix the auth bug"

# 好：有具体的验证命令和成功标准
/goal "Fix the session leak causing flaky tests in test/auth/login.spec.ts.
       Success condition: run 'pnpm test test/auth/login.spec.ts' 5 times
       consecutively with zero failures. Do not touch other test files."</code></pre>


<a id="section-2149"></a>
## 第三步：设置保险机制

<a id="t-GR42rbUtSzwDov6WLW01kC"></a>

<p id="t-KfHNb8ceWFU7JUWzbjfrii"><span style="border-bottom:1px solid">在 Loop 能够自动开 PR 之前，先让它只写文件、不做任何外部操作，你来审查 diff 再决定是否提交。</span></p>


<a id="section-2150"></a>
## 实例：每日 CI 故障分类 Loop（最小安全版本）

<a id="t-dkkSOzr320xpNFn1AIktKf"></a>

<pre id="t-VHi8rhYluEcHgBjmvcaT8c"><code># 这是推荐的第一个 Loop：
# - 只读操作（读 CI 日志、读 Issues）
# - 只写 TODO.md（不触碰其他文件）
# - 不开 PR、不合并代码
# - 你每天早上看一眼 TODO.md，手动决定下一步

/loop "Read yesterday's CI failure logs and GitHub Issues labeled 'bug'.
       Categorize findings by likely cause.
       Write a summary with prioritized action items to TODO.md.
       Do NOT edit any source files. Do NOT open any PRs." \
 --schedule "0 8 * * 1-5"</code></pre>

<blockquote id="t-mEI9VBXnock67Ci2W8ie3d"><p id="t-2MRJZIL4Q1rjfri8Ys9Cec"><span style="border-bottom:1px solid;font-style:italic">这个最小版本的 Loop 已经很有价值：它每天早上帮你整理好昨天的问题清单，你到公司打开 TODO.md 就能知道今天该做什么，而不是花半小时翻 CI 日志。这是理解 Loop 行为的最好起点，风险几乎为零。</span></p></blockquote>


<a id="section-2151"></a>
## 第四步：逐步提升自主程度

<a id="t-etqQtvpOZ3UD79Th73eFO9"></a>

<div id="t-9uGbs0rnjSUSa8NN60yOUx"><table><colgroup><col width="153.89755249023438"/><col width="258.9061279296875"/><col width="220.00860595703125"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>阶段</span></p></td><td style=" vertical-align: top"><p><span>Loop 能做的事</span></p></td><td style=" vertical-align: top"><p><span>人类做的事</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">阶段 1（只读）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">发现问题、分类任务、写状态文件</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">审查 TODO.md，手动决定处理顺序</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">阶段 2（草稿）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">起草修复方案、运行测试、写入分支</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">审查 diff，手动执行 git push</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;background-color:#eafaf1">阶段 3（半自动）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">开 Draft PR，运行 CI，通知 Slack</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">审查 PR，手动点击 Merge</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">阶段 4（全自动）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">制作者 + 检查者双 Agent，CI 通过后自动合并</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">异常时人工介入，定期审计合并历史</span></p></td></tr></tbody></table></div>


<a id="section-2152"></a>
## Loop Engineering 的三大风险

<a id="t-pOadzqCv5q14WNVjUvDt5j"></a>

<p id="t-ONvlpBUl6DMT8awSrd2q7V"><span style="border-bottom:1px solid">Loop 改变了工作方式，但不会消除工程师的责任。有三个问题会随着 Loop 变好而变得更严峻，而不是更容易。</span></p>


<a id="section-2153"></a>
## 风险一：验证仍然是你的责任

<a id="t-yc3aogUxzABIaIEq6zLaYs"></a>

<p id="t-ob2IpJVbK2JkgXYE6XVY3x"><span style="border-bottom:1px solid">无人值守运行的 Loop，也是无人值守地制造错误的 Loop。设置检查者子 Agent 是降低风险的好方法，但"通过了验证"是一个声明，不是证明。</span></p>

<p id="t-DkriYAUBUGzgleE9dEKqwm"><span style="border-bottom:1px solid">无论 Loop 多么可靠，对合并代码的人工审查都不能消失。</span></p>


<a id="section-2154"></a>
## 风险二：理解债（Comprehension Debt）积累更快

<a id="t-EdmrkABqZ4Oh3gsexTE30L"></a>

<p id="t-R9Jkft2JOol84VgcxDjoZd"><span style="border-bottom:1px solid">Loop 产出代码的速度越快，你实际理解的代码比例就越低。这不是 AI 编程才有的问题，但 Loop 把它加速了。</span></p>

<p id="t-E2N3kOpF38LmCT2hKfbx8l"><span style="border-bottom:1px solid">唯一的解药是：</span><span style="border-bottom:1px solid;font-weight:bold">读 Loop 产出的代码</span><span style="border-bottom:1px solid">。不要因为 Loop 运行顺畅就停止理解它在做什么。</span></p>


<a id="section-2155"></a>
## 风险三：认知投降（Cognitive Surrender）

<a id="t-qw3wZzOomVQMWZjIMJ0QtW"></a>

<p id="t-bgSVRtzvwFXXuEDlPvOGfd"><span style="border-bottom:1px solid">当 Loop 自动运转时，接受它返回的任何结果是最舒适的选择。这是 Loop Engineering 最隐性的危险。</span></p>

<blockquote id="t-r2QYQmsh62lStMAdUG2PNz"><p id="t-Fdi52iwCkFy6qBKhySBf0Z"><span style="border-bottom:1px solid;font-style:italic">两个人可以构建完全相同的 Loop，却得到截然相反的结果：一个用它在深度理解的基础上更快推进，另一个用它来回避理解工作本身。Loop 不知道区别。你知道。</span></p></blockquote>

<p id="t-lI8mQAW7nkoA9CrKmFZZH1"><span style="border-bottom:1px solid">四类 Loop 故障模式及应对方法：</span></p>

<div id="t-snazVulq2qnvUX6Abo9BmT"><table><colgroup><col width="126.90447998046876"/><col width="157.00689697265625"/><col width="166.00689697265625"/><col width="213.00689697265625"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>故障模式</span></p></td><td style=" vertical-align: top"><p><span>表现</span></p></td><td style=" vertical-align: top"><p><span>根本原因</span></p></td><td style=" vertical-align: top"><p><span>解决方法</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">空转（Thrashing）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Agent 反复修改代码，但没有收敛</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">目标不清晰，或验证信号有噪声，或每次修改范围太大</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">缩小目标范围，减少每次 diff 的大小，使用更可靠的验证命令</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">过拟合测试</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">所有测试通过，但功能实际上是错的</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">测试覆盖太窄，没有验证真实用户场景</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">结合自动测试和人工验收检查，增加端到端测试</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;background-color:#eafaf1">上下文漂移</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Agent 基于过期的假设持续工作，忽略新出现的变化</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">没有在关键观察后刷新上下文</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">在重要观察后重新收集上下文，不把初始计划视为神圣</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">不安全的自主</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Agent 在没有授权的情况下执行破坏性操作</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">权限范围过宽，没有明确的停止条件</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">最小权限原则，高风险操作必须人工审批，设置明确的停止规则</span></p></td></tr></tbody></table></div>


<a id="section-2156"></a>
## 最佳实践总结

<a id="t-dduhld1W7TcwAKHXmhJ1BO"></a>

<p id="t-uhp0aimqdqI0V4rH4TX1JM"><span style="border-bottom:1px solid">以下是构建可靠 Loop 的核心原则，每条都对应一类常见的失败。</span></p>

<div id="t-mnnVnfh2PdAXk8aRuJ0mXk"><table><colgroup><col width="180.90447998046875"/><col width="447.89752197265625"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>原则</span></p></td><td style=" vertical-align: top"><p><span>具体做法</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">从窄任务开始</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">每次只定义一个有明确边界的目标，宽泛的目标让 Agent 无法判断哪些文件、哪些验证信号是相关的</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">告诉 Agent 如何验证</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">在指令中直接写明验证命令（</span><span style="border-bottom:1px solid">pnpm test test/auth</span><span style="border-bottom:1px solid">）、验收场景或 API 端点，让"完成"可测量</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">偏好小的可逆变更</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">要求 Agent 做最小的连贯修改，运行验证后再扩展；大范围推测性重写难以判断是哪个假设出了问题</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">尊重现有代码模式</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">让 Agent 先检查相邻的实现，复用现有组件，遵循现有命名，避免引入不必要的新抽象</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">人类保持判断席位</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Agent 处理证据收集和机械性修复；产品判断、架构决策、最终 Review 保留给人类</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">沉淀可复用 Loop</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">当某个 Loop 跑得好的时候，把它固化为 Skill 文件或标准化的触发器，降低未来的重复成本</span></p></td></tr></tbody></table></div>

