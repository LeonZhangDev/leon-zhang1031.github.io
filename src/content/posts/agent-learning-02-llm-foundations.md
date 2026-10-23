---
title: "第 02 章 · 大模型应用基础"
date: "2026-10-22"
draft: false
author: "学习资料整理"
description: "Token、上下文窗口、模型参数、API、多模态基础"
tags: ["Agent", "学习路线"]
categories: ["AI 工程"]
prerequisites: ["agent-learning-01-agent-foundations"]
verification: {"status": "not-run", "scope": "本次仅整理资料；示例代码与原文技术结论未复跑。"}
---

Token、上下文窗口、模型参数、API、多模态基础

[学习路线](/posts/agent-learning-route/) · [上一章](/posts/agent-learning-01-agent-foundations/) · [下一章](/posts/agent-learning-03-prompt-engineering/)

本章按知识小节编排。项目内容作为学习案例阅读，示例代码与原文技术结论未在本次整理中执行验证。

## 本章目录

- [大模型参数设置](#section-0030)
- [常见参数和选择策略](#section-0031)
- [Temperature &amp; Top-p](#section-0032)
- [你的项目是如何设置参数的？](#section-0033)
- [大语言模型基础（LLM）](#section-0384)
- [核心工作原理：Transformer 架构简析](#section-0385)
- [如何与 LLM 交互：Prompt 工程入门](#section-0386)
- [基本原则](#section-0387)
- [LLM 的常见应用场景](#section-0388)
- [API 调用与参数设置](#section-0389)
- [基础 API 调用](#section-0390)
- [实例](#section-0391)
- [DeepSeek](#section-0392)
- [实例](#section-0393)
- [阿里百炼](#section-0394)
- [使用方式](#section-0395)
- [实例](#section-0397)
- [实例](#section-0399)
- [主流大语言模型](#section-0400)
- [大模型多模态](#section-0401)
- [一、什么是多模态？](#section-0402)
- [二、什么是模态（Modal）？](#section-0403)
- [三、多模态大模型的发展过程](#section-0404)
- [第一阶段：语言模型（LLM）](#section-0405)
- [第二阶段：视觉语言模型（VLM）](#section-0406)
- [第三阶段：原生多模态模型](#section-0407)
- [四、多模态模型内部是怎么工作的？](#section-0408)
- [第一步：编码（Encoding）](#section-0409)
- [第二步：统一语义空间](#section-0410)
- [第三步：生成输出](#section-0411)
- [五、为什么 Transformer 能统一多模态？](#section-0412)
- [六、多模态典型能力](#section-0413)
- [图像理解](#section-0414)
- [图像生成](#section-0415)
- [语音交互](#section-0416)
- [视频理解](#section-0417)
- [Agent 智能体](#section-0418)
- [七、初学者必须理解的五个术语](#section-0419)
- [八、动手体验：5 分钟搭建你的第一个多模态应用](#section-0420)
- [准备项目](#section-0421)
- [实例](#section-0422)
- [编写调用代码](#section-0423)
- [实例](#section-0424)
- [常见扩展](#section-0425)
- [九、学习路线（推荐）](#section-0426)
- [十、未来会发生什么？](#section-0427)
- [多模态模型和普通 LLM 哪个更好用？](#section-0429)
- [本地能跑多模态模型吗？](#section-0430)
- [多模态模型的输出一定是文字吗？](#section-0431)
- [如何选择多模态 API？](#section-0432)
- [Token (词元)](#section-0496)
- [什么是 Token (词元)？](#section-0497)
- [Token 长什么样？](#section-0498)
- [Token 和 字 、 词 有什么区别？](#section-0499)
- [它决定了 AI 能读多少](#section-0501)
- [它影响 API 的使用费用](#section-0502)
- [它影响 AI 的回复速度](#section-0503)
- [Token 的小知识](#section-0504)
- [总结](#section-0505)
- [多模态 Agent](#section-1507)
- [什么是多模态](#section-1508)
- [常见的模态类型](#section-1509)
- [为什么需要多模态 Agent](#section-1510)
- [图像理解](#section-1511)
- [核心能力](#section-1512)
- [多模态 Agent 实现](#section-1514)
- [典型应用场景](#section-1515)
- [语音处理](#section-1516)
- [语音处理流程](#section-1517)
- [语音处理 Agent](#section-1519)
- [视频理解](#section-1520)
- [视频理解的核心挑战](#section-1521)
- [常见处理策略](#section-1522)
- [智能相册管理](#section-1524)
- [视频内容分析](#section-1525)
- [无障碍辅助](#section-1526)
- [视频会议助手](#section-1527)

<a id="section-0030"></a>
## 大模型参数设置

<a id="f-doxcneDhvZEtqdDF4fmgZMF2GWe"></a>

<p id="f-doxcn9NsmZZuxsutJZAxP2Z36nb"><span>（这个知识点其实面试官主动考察的并不多，目前只有平安证券的一面面试官问到了，你有没有对模型做一些参数的调整，怎么设置的penalty， temperature. 目前没有其它面试官问到。所以总体来说，这不是一个特别常考的考点。 从面试角度，可以适当放低学习优先级。另外其实如果你学好了本章，其实在一些和面试官讨论的过程，讨论一些发散性的知识的时候，很常被用到。 比如说夸克千问面试官在和你讨论说：如何避免一些极端情况的输出呀？那这个时候，调整模型参数将会是一个可讨论点。另外从实战角度，其实在你的项目中，去调整参数做适配也挺常用的对吧，从这两个角度，也是可以推荐去学一下的）</span></p>


<a id="section-0031"></a>
## 常见参数和选择策略

<a id="f-doxcnBH4aLLfdiUCH3LnKE91luY"></a>

<div id="f-doxcnyczHpaxZyXtYQNEnpwarle"><div><div><div><div><div><div><div><div><div><a href="https://open.douyin.com/player/video?vid=7534775858423254306&amp;mode=pc">嵌入视频 / 原始播放器</a></div></div></div></div></div></div></div></div></div></div>

<p id="f-doxcn3dtIYRlmhRwAs6zCaYUiag"><span>LLM 推理参数详解表</span></p>

<div id="f-doxcnv4JU90o8d35aMx8zIKS724"><img alt="" decoding="async" height="456" loading="lazy" src="/images/agent-learning/a3890c404f2bbcdc897c5cff.png" width="749"/></div>

<p id="f-doxcn78qNA5QgJAxXCyoXpgEp6b"><span>常见场景配置推荐</span></p>

<div id="f-doxcn6FZ4GGfgkDMdPufmf3OyBb"><img alt="" decoding="async" height="237" loading="lazy" src="/images/agent-learning/05df99a2392293b6f3ab78dc.png" width="684"/></div>


<a id="section-0032"></a>
## Temperature &amp; Top-p

<a id="f-doxcnDGpCNRAv7hYTCbxnsuOWLd"></a>

<div style="margin-left:25px"><h4 id="f-doxcnexZQ3ZPpp0NeOf0iIdfP5b"><span>2.2.1 详细原理</span></h4><p id="f-doxcnQFkAubFnItXZLjg43ajyzd"><span>（想深入理解这两个参数的原理，请看这个视频）</span></p><div id="f-doxcnANbORk7YN0HqWINdfJRN2f"><div><div><div><div><div><div><div><div><div><a href="https://open.douyin.com/player/video?vid=7578100067626781979&amp;showTab=like&amp;mode=pc">嵌入视频 / 原始播放器</a></div></div></div></div></div></div></div></div></div></div><p id="f-doxcnm9Pjdb4MLMmSHZHD4luR6D"><span>在大语言模型生成文本时，通常会用到两个参数：</span><span style="font-weight:bold">temperature</span><span> 和 </span><span style="font-weight:bold">top-p</span><span>，它们决定了采样的</span><span style="font-weight:bold">随机性</span><span>和</span><span style="font-weight:bold">多样性</span><span>。</span></p><p id="f-doxcn93e3Ho0abAupXUIueyHluf"><span>首先我说一下大模型生成回答的</span><span style="font-weight:bold">大致原理</span><span>：</span></p><p id="f-doxcnuGgfD4UCREvvcExjDubXLT"><span>模型先为每个候选 token 计算分数（logits），再通过 softmax 转换成概率分布，然后根据这些概率进行加权采样。</span></p><p id="f-doxcncfLl9t4IPDlcbOj92dKGdd"><span>在这个过程中：</span></p><p id="f-doxcnCAeprv4aQ6JJOyIU2VWnrh"><span style="font-weight:bold">temperature</span><span> 会在 </span><span style="font-weight:bold">softmax 前调整 logits，温度低时分布更尖锐，模型更确定，输出更保守；温度高时分布更平滑，增加随机性，输出更有创意</span><span>。</span></p><p id="f-doxcnPc4mK9z4Mff9ceICpeb25N"><span style="font-weight:bold">top-p</span><span> 则通过“核采样”限制采样范围，只在累计概率达到 p 的最小集合中选择 token，p 越小越集中，p 越大越多样。</span></p><p id="f-doxcnls1XEUNBVSAP4jh8Paw8Fc"><span>简单来说，</span><span style="font-weight:bold">temperature 控制概率分布的陡峭度，影响确定性；top-p 控制采样范围，平衡质量与多样性，两者结合决定生成结果的稳定性与创造性。</span></p><h4 id="f-doxcng2dXMyfwQObEADGn1WlXEd"><span>2.2.2 不同参数组合情况</span></h4><p id="f-doxcnmdlyahcBCIdia15lr4lgAr"><span>(进一步补充，以防面试官追问）</span></p><p id="f-doxcnzMKkwshMRleavviUETc3Hd"><span style="font-weight:bold">temperature 低 + top-p 小</span></p><div id="f-doxcnLQyOfZmftOnrAtZG65jEEh" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">效果</span><span>：输出非常稳定、保守，几乎总是选择概率最高的 token。</span></div></div><div id="f-doxcn3QqDM0sVIwgsEuMXCb3YAb" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">特点</span><span>：答案更确定、更接近训练数据，适合需要精确、严谨的场景（如代码生成、事实问答）。</span></div></div><div id="f-doxcn6Tnr5vkl0rEFmu0Kv9hZoe" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">缺点</span><span>：缺乏创造性，容易重复。</span></div></div><hr id="f-doxcnfrLR1OLl1jdUEwRswxDZ5e"/><p id="f-doxcnvzifNTOqWlsOWRFcSDpgKe"><span style="font-weight:bold">temperature 高 + top-p 大</span></p><div id="f-doxcn98ucQOxXzLbnH0EoCA8RzD" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">效果</span><span>：输出非常多样化，随机性强，可能出现意料之外的表达。</span></div></div><div id="f-doxcnULkxOUuiw8uLfHYjCxkRmb" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">特点</span><span>：适合创意写作、头脑风暴，能生成新颖内容。</span></div></div><div id="f-doxcn4aW57KsaEpQTcznbAarWHe" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">缺点</span><span>：连贯性和逻辑性可能下降，甚至出现不相关或错误内容。</span></div></div><hr id="f-doxcnOGg3N4gAzES20s4A07Cj1d"/><p id="f-doxcnOdOJpOn4aACpnkRtIgoSTf"><span style="font-weight:bold">temperature 低 + top-p 大</span></p><div id="f-doxcnbxRoQSKyyOaZR0wdaNTrcd" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">效果</span><span>：整体仍偏稳定，但允许更多候选 token，输出稍微丰富。</span></div></div><div id="f-doxcncVVsPnBo7TrtitfPwxXBxc" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">特点</span><span>：在保持连贯的同时，增加一点灵活性，适合对话或内容生成。</span></div></div><div id="f-doxcn4DcsDmBKJXmyAPYIsHJ6Sd" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">缺点</span><span>：仍然不够有创意。</span></div></div><hr id="f-doxcny0fC5LvyDtZ4gzBZ0wNjMf"/><p id="f-doxcnm5Q9x6f9l3OcPvWPlcmpJd"><span style="font-weight:bold">temperature 高 + top-p 小</span></p><div id="f-doxcnq3f56GWeWWOcVPy9smZSNb" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">效果</span><span>：在有限候选集中引入较强随机性，输出有一定变化但不会太离谱。</span></div></div><div id="f-doxcnZR5IBlUhThW39FgJGLXyLd" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">特点</span><span>：适合需要一定创造性但又不能完全失控的场景，比如营销文案。</span></div></div><div id="f-doxcnKUSe025aJeZcgFjb7JabKb" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">缺点</span><span>：可能出现轻微逻辑跳跃。</span></div></div></div>


<a id="section-0033"></a>
## 你的项目是如何设置参数的？

<a id="f-doxcnT2scmBwG4T2rw4YLviwmOd"></a>

<p id="f-doxcnkRqtUbT5flHkCknrP0XwNf"><span>（这个是真实地面试问题了，平安证券1面问的。大家根据答案也想想自己的项目应该如何回答）</span></p>

<p id="f-doxcnKuxi4nUZS6BxfJcpCDHZH7"><span>该学习案例中，总体是一个分析型的任务。核心需求是稳定，准确。总体设置的温度较低，在0.1~0.3，然后Top_p保持默认，让模型在合理参数内选择，不用太多调整。惩罚因子设置较低的值，因为形成建议可能会多次提到相同的地点，时间。所以惩罚因子设置在0.1左右。</span></p>


<a id="section-0384"></a>
## 大语言模型基础（LLM）

<a id="t-block-14618"></a>

<p id="t-qT2ahWvdbLWXDEhx4FF7R8"><span>大语言模型（Large Language Model，简称 LLM）是 AI Agent 的大脑，理解它是构建智能 Agent 的基础。</span></p>

<p id="t-Hg3OoDivJ6Cakxn5OMlnBR"><span>大语言模型之所以能与你对话、写文章、编程，本质上是它在根据你给出的文本（提示），一个字一个字地</span><span style="font-weight:bold">猜</span><span>出最合理的下文。</span></p>

<p id="t-8Yiu9OdUhQJDL2BuQ5JiWb"><span>简单来说，大语言模型是一个经过海量文本数据训练的深度学习模型，它能够理解和生成人类语言。大语言模型通过分析互联网上的海量文本，学习语言的统计规律，当收到输入时，根据学到的规律生成最合理的续写。</span></p>

<div id="t-70zpYPqsXl1mLo8nk3iSjM"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/d2d31d175583f36803d04520.png"/></div>

<p id="t-M6mdBOQ4Awk6kgkkqxxees"><span>我们可以把大语言模型想象成一个</span><span style="font-weight:bold">极其用功、记忆力超群的学生</span><span>：</span></p>

<ul><li id="t-1w79xYykDNpWAjD5hfmTBl"><span style="font-weight:bold">学习阶段（训练）</span><span>：它阅读了互联网上几乎所有公开的文本——书籍、文章、网页、代码等（数据量可达万亿单词级别）。在这个过程中，它不是在背诵，而是在学习一套极其复杂的语言规律。</span></li></ul>

<ul><li id="t-YsgytDUZzBJMHduUPEhaoO"><span style="font-weight:bold">应用阶段（推理）</span><span>：当你向它提问或给出指令时，它就会运用学到的规律，一个字接一个字地生成出最合乎逻辑和语境的回答。</span></li></ul>

<p id="t-xClpkxbVfF63qlvY2wUWZh"><span>它的"大"主要体现在两个方面：</span></p>

<ul><li id="t-fIqSiGT6BMWYqajgjiFZ6p"><span style="font-weight:bold">参数规模大</span><span>：模型内部有数百亿甚至上万亿个可调节的参数，记录了学到的语言知识。</span></li></ul>

<ul><li id="t-SaXp7HiDzcgARkrNGiZT0c"><span style="font-weight:bold">训练数据大</span><span>：用于训练的文本数据量巨大，涵盖互联网公开信息的精华。</span></li></ul>

<p id="t-zTtU4niBnazxj0hiF4KG9G"><span>下图展示了 LLM 逐词生成文本的过程——它每次只预测一个词，然后将这个新词纳入输入，继续预测下一个词，如此循环直到生成完整回答：</span></p>

<div id="t-h8KdNgk51VQolTY2MzXJKC"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/b178d205128ae860e6a6ad8e.png"/></div>

<p id="t-ki3rtfbHqmm6dZQAJQbdpQ"><span style="border-bottom:1px solid">动画演示：</span></p>

<div id="t-3XaayONfcLde6VjU7HmuN2"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/34591d68acd666ee0d26e5a0.png"/></div>

<p id="t-EBDj90HB67Q9Rf2J3R1D3B"><span>尽管 LLM 很强大，但它也有明确的局限性：</span></p>

<div id="t-v9lhEcSzvpgsXW5MAv3wwg"><table><colgroup><col width="120"/><col width="220.89752197265625"/><col width="230.00341796875"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>能力</span></p></td><td style=" vertical-align: top"><p><span>说明</span></p></td><td style=" vertical-align: top"><p><span>局限性</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="font-weight:bold">知识截止</span></p></td><td style=" vertical-align: top"><p><span>训练数据有截止日期</span></p></td><td style=" vertical-align: top"><p><span>无法获知训练后的新信息</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="font-weight:bold">数学计算</span></p></td><td style=" vertical-align: top"><p><span>能做简单计算</span></p></td><td style=" vertical-align: top"><p><span>复杂计算容易出错</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="font-weight:bold">实时信息</span></p></td><td style=" vertical-align: top"><p><span>需要外部工具辅助</span></p></td><td style=" vertical-align: top"><p><span>本身无法获取实时数据</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="font-weight:bold">事实准确性</span></p></td><td style=" vertical-align: top"><p><span>可能生成错误信息</span></p></td><td style=" vertical-align: top"><p><span>需要事实核查</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="font-weight:bold">长文本处理</span></p></td><td style=" vertical-align: top"><p><span>上下文长度有限制</span></p></td><td style=" vertical-align: top"><p><span>超长文本会丢失信息</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="font-weight:bold">逻辑一致性</span></p></td><td style=" vertical-align: top"><p><span>可能前后矛盾</span></p></td><td style=" vertical-align: top"><p><span>需要仔细设计和验证</span></p></td></tr></tbody></table></div>

<blockquote id="t-xCiohVrBXYCwlrd6qBC8LQ"><span style="font-style:italic;font-weight:bold">重要提醒：</span><span style="font-style:italic">LLM 不是全知全能的，它本质上是基于统计的模式匹配系统。理解它的局限性，才能更好地利用它的能力。</span></blockquote>


<a id="section-0385"></a>
## 核心工作原理：Transformer 架构简析

<a id="t-Ju5exsR9tuydjL9FO4aIDT"></a>

<p id="t-ZwxFg7OfCn5OpyZAbbFYWq"><span>LLM 的惊人能力，离不开其底层核心技术——</span><span style="font-weight:bold">Transformer 架构</span><span>。不需要深究复杂的数学原理，但可以理解它的核心思想。</span></p>

<p id="t-fi6honR9kivPsPhVaFDwFy"><span>想象你要写一篇关于太阳系的文章：</span></p>

<ul><li id="t-X4x51Mdqh63wftQNWVNBxm"><span style="font-weight:bold">通读资料</span><span>：你会先看很多相关的书籍和网页。</span></li></ul>

<ul><li id="t-teFjP6KSWTrDQq9gHMXZlq"><span style="font-weight:bold">抓住重点</span><span>：你会注意到太阳、行星、轨道、引力这些词频繁出现且相互关联。</span></li></ul>

<ul><li id="t-wRVKguCAwpbL2I3zh0v1sT"><span style="font-weight:bold">组织语言</span><span>：根据你想表达的重点（比如介绍火星），你会选择性地运用之前看到的关于火星大小、颜色、位置等信息，并组织成通顺的句子。</span></li></ul>

<p id="t-w2bZzSfV85Ak9m0wXedAn5"><span>Transformer 的工作方式与此类似，它的核心流程分为三个阶段：</span></p>

<ol start="1"><li id="t-2AqCN1YdqIvjQkL7VPLGJq"><span style="font-weight:bold">输入处理</span><span>：你的话被拆分成词或字（Token），并转换成计算机能理解的数字（向量）。</span></li></ol>

<ol start="2"><li id="t-gkU0Rnb95AmXeNZN14H3BS"><span style="font-weight:bold">理解上下文（核心）</span><span>：</span><span style="font-weight:bold">自注意力机制（Self-Attention）</span><span>开始工作。它让模型在处理句子中每一个词时，都能权衡句子中</span><span style="font-weight:bold">所有其他词</span><span>的重要性。这个过程是</span><span style="font-weight:bold">并行</span><span>的，速度极快。</span></li></ol>

<ol start="3"><li id="t-FmdZK7Pek55hiN02q6IKbf"><span style="font-weight:bold">生成与循环</span><span>：模型基于对所有词的理解，计算出概率分布，预测下一个最可能出现的词。选中并输出这个词后，将其作为新的输入，重复整个过程，直到生成完整回答。</span></li></ol>

<div id="t-Gm5aSsnYWyk4r68OtjlnUZ"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/6cd0cc5ef1c33208a93a7fbb.png"/></div>

<p id="t-4WAUwRsm8Gx2aQQPzXKB6f"><span>自注意力机制是 Transformer 最关键的创新。以句子"苹果的手机它的电池很大"为例，当模型处理</span><span style="font-weight:bold">它</span><span>这个词时，自注意力机制会帮助模型判断</span><span style="font-weight:bold">它</span><span>与</span><span style="font-weight:bold">苹果</span><span>和</span><span style="font-weight:bold">手机</span><span>高度相关。下图展示了这一过程中的注意力权重分布：</span></p>

<div id="t-KAsmHNnKDgM45T4TZHJYgR"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/db72a3dda2dbe1eaf1db889b.png"/></div>

<p id="t-kfv37hwIsDf2EA5dRKZNuV"><span>正是这种能</span><span style="font-weight:bold">并行处理</span><span>并</span><span style="font-weight:bold">深度理解全局上下文</span><span>的能力，使得基于 Transformer 的 LLM 在语言任务上远超以往技术（如 RNN）。</span></p>


<a id="section-0386"></a>
## 如何与 LLM 交互：Prompt 工程入门

<a id="t-RsJYyrSjbzpHAF4q74pTA4"></a>

<p id="t-CYpFy0FfleAvDVtmG4qzEJ"><span style="font-weight:bold">Prompt（提示词）</span><span>是你给 LLM 的输入，它告诉模型你想要什么，就像给助理下达指令——指令越清晰，结果越好。Prompt 的质量直接决定了回答的质量。</span></p>

<p id="t-vMh4tKby0LkNRNEscNcXgL"><span>一个好的 Prompt 通常由以下四个部分组成：</span></p>

<div id="t-jSVNfmN31G4sNovXWuk9Hg"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/24b7bd608bc71ddcc82f7563.png"/></div>


<a id="section-0387"></a>
## 基本原则

<a id="t-1j67l2H0bqOHCMlKSq7H4x"></a>

<ul><li id="t-745WSCZJUz6JGlnjw0zaL1"><span style="font-weight:bold">明确具体</span><span>：避免模糊表达。不要说</span><span style="font-weight:bold">写点关于狗的东西</span><span>，而应该说</span><span style="font-weight:bold">用生动活泼的语言，为 6-8 岁儿童写一段 100 字左右的关于金毛寻回犬性格特点的简短介绍</span><span>。</span></li></ul>

<ul><li id="t-v6zfF4ouCcfOPJY0C3I9qf"><span style="font-weight:bold">提供上下文</span><span>：告诉模型你的身份、背景和目标。例如：</span><span style="font-weight:bold">你是一位经验丰富的 Python 编程导师。请向一个刚学完基本语法的初学者解释什么是列表推导式，并提供一个简单的例子。</span></li></ul>

<ul><li id="t-WRG1klVsdigEwBMVb4lncH"><span style="font-weight:bold">指定格式</span><span>：如果需要特定格式的输出，请明确说明，例如：</span><span style="font-weight:bold">请将以下要点总结为三个 bullet points</span><span> 或 </span><span style="font-weight:bold">请以 JSON 格式输出</span><span>。</span></li></ul>

<ul><li id="t-R5Jv2IMbg9tso8l3laFX3c"><span style="font-weight:bold">分步思考（Chain-of-Thought）</span><span>：对于复杂问题，可以在 Prompt 中引导模型逐步推理，例如：</span><span style="font-weight:bold">请一步一步地分析这个问题，先列出已知条件，再推导中间步骤，最后给出结论。</span><span> 这种方式能显著提升复杂推理任务的准确率。</span></li></ul>


<a id="section-0388"></a>
## LLM 的常见应用场景

<a id="t-rklxdM2bEfG1pf6rGa3ZBD"></a>

<div id="t-oe6mGFUh3TWd7FKIyxEjsx"><table><colgroup><col width="145.89755249023438"/><col width="268.00689697265625"/><col width="235.00341796875"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>场景类别</span></p></td><td style=" vertical-align: top"><p><span>具体示例</span></p></td><td style=" vertical-align: top"><p><span>说明</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="font-weight:bold">内容创作与编辑</span></p></td><td style=" vertical-align: top"><p><span>撰写邮件、报告、博客；续写故事；润色文案；翻译不同风格文本</span></p></td><td style=" vertical-align: top"><p><span>快速生成草稿，提供灵感和多种表达方式</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="font-weight:bold">信息检索与总结</span></p></td><td style=" vertical-align: top"><p><span>快速阅读长文档并提炼核心观点；基于知识库的问答</span></p></td><td style=" vertical-align: top"><p><span>比传统搜索更"理解"问题，能进行归纳和整合</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="font-weight:bold">编程辅助</span></p></td><td style=" vertical-align: top"><p><span>解释代码、生成代码片段、调试错误、重构代码、编写测试用例</span></p></td><td style=" vertical-align: top"><p><span>充当全天候的编程伙伴，极大提升开发效率</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="font-weight:bold">对话与客服</span></p></td><td style=" vertical-align: top"><p><span>智能聊天机器人、个性化导师、角色扮演</span></p></td><td style=" vertical-align: top"><p><span>提供拟人化、上下文连贯的交互体验</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="font-weight:bold">逻辑推理与分析</span></p></td><td style=" vertical-align: top"><p><span>解数学题、进行基础逻辑推理、分析数据趋势、制定计划</span></p></td><td style=" vertical-align: top"><p><span>在限定领域内展示出令人惊讶的推理能力</span></p></td></tr></tbody></table></div>


<a id="section-0389"></a>
## API 调用与参数设置

<a id="t-jkF4k5nkaoIeyHe86gWNky"></a>

<p id="t-fverpbsvRgOhBdchONj85R"><span>要构建 AI Agent，你需要学会如何通过 API 调用 LLM。</span></p>

<p id="t-DA2v2T3jfHGBNBg1vnjEEW"><span>本章节我们以 OpenAI API 为例，介绍基本的调用方法。</span></p>

<p id="t-5K3HqCGnkbGgzD7AsW45lj"><span>openai 是一个强大的 Python 库，用于与 OpenAI 的一系列模型和服务进行交互，详细内容参考：</span><span>Python OpenAI</span><span>。</span></p>

<p id="t-Qa9elUV5YUmYhUv7LFhNdp"><span>开源地址：</span><span>https://github.com/openai/openai-python</span></p>


<a id="section-0390"></a>
## 基础 API 调用

<a id="t-76L73krqhmMcIp0BzUH3E5"></a>

<a id="t-oBokd6G7RC1p8TTgRK09jn"></a>

##### 安装必要的库

<pre id="t-XX4d215fgUtBJKqSV6wU3s"><code>pip install openai</code></pre>

<p id="t-SfT6pXYuwZJV1Sm9jlGOJg"><span>然后需要去 OpenAI 官网注册账号，并在 API 密钥页面生成一个 API Key。</span></p>


<a id="section-0391"></a>
## 实例

<a id="t-NgAashDZKlbqDVaLpUMH8W"></a>

<pre id="t-OKTxWi7F361CaEzgYt6tef"><code>import os
from openai import OpenAI

client = OpenAI(
 # This is the default and can be omitted
    api_key="你申请的 API key",
)

response = client.responses.create(
    model="gpt-4o",
    instructions="You are a coding assistant that talks like a pirate.",
 input="How do I check if a Python object is an instance of a class?",
)

print(response.output_text)</code></pre>

<p id="t-T3vsiB8YyLmZhQBVo3aMtV"><span>我们国内目前访问 openai 还是有点麻烦，国内很多也支持 openai，比如 DeepSeek、阿里的千问。</span></p>


<a id="section-0392"></a>
## DeepSeek

<a id="t-FuvO1B7YbhxaaaDiBPQhUo"></a>

<p id="t-IBzQowa5rAgyMbipNm4cha"><span>DeepSeek API 完全兼容 OpenAI 的 API 格式，只需修改少量配置，即可直接使用 OpenAI SDK 或兼容工具访问 DeepSeek API。</span></p>

<a id="t-e7zN3pdQmfIXJclGmDbhFx"></a>

##### 核心配置参数

<div id="t-xXqqejfkw53PUjHzoBRJ83"><table><colgroup><col width="120"/><col width="541.8975219726562"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>参数</span></p></td><td style=" vertical-align: top"><p><span>取值/说明</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>base_url</span></p></td><td style=" vertical-align: top"><p><span>必填，固定值：</span><span>https://api.deepseek.com</span><span>（也可填 </span><span>https://api.deepseek.com/v1</span><span>，仅为兼容OpenAI，v1与模型版本无关）</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>api_key</span></p></td><td style=" vertical-align: top"><p><span>必填，需先在 DeepSeek 官网申请专属 API Key（申请地址：</span><span>https://platform.deepseek.com/</span><span>）</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>model</span></p></td><td style=" vertical-align: top"><p><span>必填，</span></p><ul><li><span>deepseek-v4-flash</span><span>：对应 DeepSeek 的</span><span style="font-weight:bold">非思考模式</span><span>，响应速度快，适合常规问答；</span></li></ul><ul><li><span>deepseek-v4-pro</span><span>：对应 DeepSeek 的</span><span style="font-weight:bold">思考模式</span><span>，推理能力更强，适合复杂问题求解。</span></li></ul></td></tr></tbody></table></div>


<a id="section-0393"></a>
## 实例

<a id="t-FP82CYR42D1EG8a5ovvmYN"></a>

<pre id="t-7yAlKZJ2ik6XvIL2YgxBaw"><code>import os
from openai import OpenAI

# 初始化客户端（核心配置：替换为你的API Key）
client = OpenAI(
    api_key=os.environ.get('DEEPSEEK_API_KEY'), # 推荐通过环境变量配置，也可直接写死（不推荐）
    base_url="https://api.deepseek.com" # DeepSeek 固定域名
)

# 调用对话API
try:
    response = client.chat.completions.create(
        model="deepseek-v4-flash", # 指定模型，可选 deepseek-v4-flash / deepseek-v4-pro
        messages=[
 {"role": "system", "content": "You are a helpful assistant"}, # 系统角色定义
 {"role": "user", "content": "Hello"}, # 用户提问
 ],
        stream=False # 非流式输出（一次性返回完整结果）
 )
 # 打印回复内容
 print("回复结果：", response.choices[0].message.content)
except Exception as e:
 print("调用失败：", str(e))</code></pre>


<a id="section-0394"></a>
## 阿里百炼

<a id="t-cmUxU0rDqA8mAQAQOfk8jj"></a>

<p id="t-ftMRt98alecdI9KbMaJ8iF"><span>阿里云百炼的通义千问模型支持 OpenAI 兼容接口，您只需调整 API Key、BASE_URL 和模型名称，即可将原有 OpenAI 代码迁移至阿里云百炼服务使用。</span></p>

<p id="t-eL7XJ4DJ1lCJl0LhonFnXK"><span>我们需要开通阿里云百炼模型服务并获得 API-KEY。</span></p>

<p id="t-8ZveAxIPXVNveNzaUC7VKx"><span>我们可以先使用阿里云主账号访问百炼模型服务平台：</span><span>https://bailian.console.aliyun.com/</span><span>，然后点击右上角登录，登录成功后点击右上角的齿轮⚙️图标，选择 API key，然后复制 API key，如果没有也可以创建 API key：</span></p>

<div id="t-iZvNYQnxdlTArlNXVY36Pp"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/ab3c2d398bc238b3dc234e15.png"/></div>

<div id="t-e4k2RSudLhVRY1f20qluZo"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/34085335ae01fe78511f6dab.png"/></div>

<p id="t-zJ9OagTGi4ltLBAWW23Td8"><span>开通阿里云百炼不会产生费用，仅模型调用（超出免费额度后）、模型部署、模型调优会产生相应计费。</span></p>

<p id="t-b4J0au71xyc7XFmU2UJDNd">使用 API 通常按 Token 计费，具体计费方式见平台文档。</p>

<div id="t-nrKSI01gD4AI1aMKoXVKO2"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/52879127b872c73c098f6adf.png"/></div>

<blockquote id="t-7TicimnxuMQgbUxn2ByXjd"><span style="font-style:italic">也可以直接使用百炼与方舟的 Coding Plan 套餐：</span><span style="font-style:italic">https://www.runoob.com/claude-code/coding-plan.html</span><span style="font-style:italic">。</span></blockquote>


<a id="section-0395"></a>
## 使用方式

<a id="t-QV5LZjcrzg8ejNynDB6by6"></a>

<p id="t-8QGQ8SyYSif7yTdT3BwtLE"><span>接下来我们使用 OpenAI SDK 访问百炼服务上的通义千问模型。</span></p>


<a id="section-0397"></a>
## 实例

<a id="t-X1EmSb5ygdwiHycDaBpD2m"></a>

<pre id="t-oznqwhlNDf75wtAEeHSttZ"><code>from openai import OpenAI
import os

def get_response():
    client = OpenAI(
        api_key="sk-xxx", # 请用阿里云百炼 API Key
        base_url="https://dashscope.aliyuncs.com/compatible-mode/v1", # 填写DashScope SDK的base_url
 )
    completion = client.chat.completions.create(
        model="qwen-plus", # 此处以qwen-plus为例，可按需更换模型名称。模型列表：https://help.aliyun.com/zh/model-studio/getting-started/models
        messages=[{'role': 'system', 'content': 'You are a helpful assistant.'},
 {'role': 'user', 'content': '你是谁？'}]
 )
 # json 数据
 #print(completion.model_dump_json())
 print(completion.choices[0].message.content)

if __name__ == '__main__':
    get_response()</code></pre>

<p id="t-rKxZIRyFecXIosgpPj5cNV"><span style="border-bottom:1px solid">运行代码可以获得以下结果：</span></p>

<pre id="t-YJck5ba8whd0dLSrzd6Qaq"><code>我是通义千问，阿里巴巴集团旗下的通义实验室自主研发的超大规模语言模型。我可以帮助你回答问题、创作文字，比如写故事、写公文、写邮件、写剧本、逻辑推理、编程等等，还能表达观点，玩游戏等。如果你有任何问题或需要帮助，欢迎随时告诉我！</code></pre>


<a id="section-0399"></a>
## 实例

<a id="t-jdxdOzJVpjEU80rkcvkNEO"></a>

<pre id="t-6xOcoVe9kHhM6RtuZwD3RD"><code>from openai import OpenAI

def get_response():
    client = OpenAI(
        api_key="sk-xxx",
        base_url="https://dashscope.aliyuncs.com/compatible-mode/v1",
 )

    completion = client.chat.completions.create(
        model="qwen-plus",
        messages=[
 {'role': 'system', 'content': 'You are a helpful assistant.'},
 {'role': 'user', 'content': '你是谁？'}
 ],
        stream=True,
        stream_options={"include_usage": True}
 )

 for chunk in completion:
 # chunk 里可能没有 choices 或 delta
 if hasattr(chunk, "choices") and len(chunk.choices) &gt; 0:
            choice = chunk.choices[0]
 if hasattr(choice, "delta") and hasattr(choice.delta, "content"):
 print(choice.delta.content, end='', flush=True)

if __name__ == '__main__':
    get_response()</code></pre>

<p id="t-LaJ7rQJUq94ovWIIdP82yQ"><span style="border-bottom:1px solid">运行代码可以获得以下结果：</span></p>

<pre id="t-bHkLTU9p7Bohkv1tVp286q"><code>我是通义千问，阿里巴巴集团旗下的通义实验室自主研发的超大规模语言模型。我可以帮助你回答问题、创作文字，比如写故事、写公文、写邮件、写剧本、逻辑推理、编程等等，还能表达观点，玩游戏等。如果你有任何问题或需要帮助，欢迎随时告诉我！</code></pre>


<a id="section-0400"></a>
## 主流大语言模型

<a id="t-Bv6VULv6r6ZTc17t4gri1B"></a>

<p id="t-WlXBv0REonlRsOorfZ7rka"><span style="border-bottom:1px solid">以下是主流大语言模型的官网与 API 文档地址整理：</span></p>

<div id="t-2N1mGoi9K2z7NNRCgBQN5w"><table><colgroup><col width="162.501953125"/><col width="162.501953125"/><col width="514.5029907226562"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>模型名称</span></p></td><td style=" vertical-align: top"><p><span>所属公司/组织</span></p></td><td style=" vertical-align: top"><p><span>官网/API 文档地址</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">GPT 系列</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">OpenAI</span></p></td><td style=" vertical-align: top"><p><span>官网：</span><span style="border-bottom:1px solid">https://openai.com/</span></p><p><span>API 地址：</span><span style="border-bottom:1px solid">https://platform.openai.com/docs/api-reference</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Claude 系列</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Anthropic</span></p></td><td style=" vertical-align: top"><p><span>官网：</span><span style="border-bottom:1px solid">https://www.anthropic.com/</span></p><p><span>API 地址：</span><span style="border-bottom:1px solid">https://docs.anthropic.com/claude/reference/getting-started-with-the-api</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Gemini 系列</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Google</span></p></td><td style=" vertical-align: top"><p><span>官网：</span><span style="border-bottom:1px solid">https://deepmind.google/technologies/gemini/</span></p><p><span>API 地址：</span><span style="border-bottom:1px solid">https://docs.gemini.com/rest-api/</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">通义千问</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">阿里巴巴</span></p></td><td style=" vertical-align: top"><p><span>官网：</span><span style="border-bottom:1px solid">https://www.qianwen.com/</span></p><p><span>API 地址：</span><span style="border-bottom:1px solid">https://help.aliyun.com/zh/dashscope/developer-reference/api-details</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">文心一言</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">百度</span></p></td><td style=" vertical-align: top"><p><span>官网：</span><span style="border-bottom:1px solid">https://yiyan.baidu.com/</span></p><p><span>API 地址：</span><span style="border-bottom:1px solid">https://qianfan.cloud.baidu.com/docs/</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">智谱清言</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">智谱AI</span></p></td><td style=" vertical-align: top"><p><span>官网：</span><span style="border-bottom:1px solid">https://chatglm.cn/</span></p><p><span>API 地址：</span><span style="border-bottom:1px solid">https://open.bigmodel.cn/dev/api</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Kimi</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">月之暗面</span></p></td><td style=" vertical-align: top"><p><span>官网：</span><span style="border-bottom:1px solid">https://kimi.moonshot.cn/</span></p><p><span>API 地址：</span><span style="border-bottom:1px solid">https://platform.moonshot.cn/docs/api/chat</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">讯飞星火大模型</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">科大讯飞</span></p></td><td style=" vertical-align: top"><p><span>官网：</span><span style="border-bottom:1px solid">https://xinghuo.xfyun.cn/</span></p><p><span>API 地址：</span><span style="border-bottom:1px solid">https://www.xfyun.cn/doc/spark/Web.html</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">DeepSeek 系列</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">DeepSeek</span></p></td><td style=" vertical-align: top"><p><span>官网：</span><span style="border-bottom:1px solid">https://www.deepseek.com/</span></p><p><span>API 地址：</span><span style="border-bottom:1px solid">https://api-docs.deepseek.com/</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Llama 系列</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Meta</span></p></td><td style=" vertical-align: top"><p><span>官网：</span><span style="border-bottom:1px solid">https://www.llama.com/</span></p><p><span>API 地址：</span><span style="border-bottom:1px solid">https://www.llama.com/docs/overview/</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Grok 系列</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">xAI</span></p></td><td style=" vertical-align: top"><p><span>官网：</span><span style="border-bottom:1px solid">https://x.ai/</span></p><p><span>API 地址：</span><span style="border-bottom:1px solid">https://docs.x.ai/overview</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">MiniMax</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">MiniMax</span></p></td><td style=" vertical-align: top"><p><span>官网：</span><span style="border-bottom:1px solid">https://www.minimaxi.com/</span></p><p><span>API 地址：</span><span style="border-bottom:1px solid">https://api.minimax.chat/docs/api/</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">百川智能</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">百川智能</span></p></td><td style=" vertical-align: top"><p><span>官网：</span><span style="border-bottom:1px solid">https://www.baichuan-ai.com/</span></p><p><span>API 地址：</span><span style="border-bottom:1px solid">https://platform.baichuan-ai.com/docs/api</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">Ollama</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Ollama</span></p></td><td style=" vertical-align: top"><p><span>官网：</span><span style="border-bottom:1px solid">https://ollama.com/</span></p><p><span>API 地址：</span><span style="border-bottom:1px solid">https://github.com/ollama/ollama/blob/main/docs/api.md</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">豆包大模型</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">字节跳动</span></p></td><td style=" vertical-align: top"><p><span>官网：</span><span style="border-bottom:1px solid">https://www.doubao.com/</span></p><p><span>API 地址：</span><span style="border-bottom:1px solid">https://www.volcengine.com/docs/82379/1399008?lang=zh</span></p></td></tr></tbody></table></div>


<a id="section-0401"></a>
## 大模型多模态

<a id="t-block-14715"></a>

<p id="t-9TfFcRUhsRxuHAdwiBsuOu"><span>多模态（Multimodal）大模型让 AI 同时处理文本、图像、音频、视频等多种信息形式，是当前大模型最核心的发展方向之一。</span></p>

<p id="t-1XMv3wHu7tw1TreN6J7Zxr"><span>本文从零开始讲解多模态的概念、发展过程、内部原理与典型能力，并在文末给出 </span><span style="font-weight:bold">5 分钟搭建第一个多模态应用</span><span> 的可运行示例。</span></p>


<a id="section-0402"></a>
## 一、什么是多模态？

<a id="t-DC72IxvTdJoKUfRBKpurvv"></a>

<p id="t-w0UIvulXuPnAfNbO8EIgQK"><span>普通大模型通常只能处理一种信息——</span><span style="font-weight:bold">文本</span><span>，如果给传统 AI 一张图片，并问它"图片里有几只猫？"，如果不支持多模态，该模型就做不到。</span></p>

<p id="t-SBYzITHP0AfGsSuxvCbdm1"><span>而现实世界不是由文字组成的，而是由多种感官信息共同构成：</span></p>

<div id="t-xj2lksAHK4YJc0goen81dN"><table><colgroup><col width="120"/><col width="345.8992919921875"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>感官</span></p></td><td style=" vertical-align: top"><p><span>对应信息</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">眼睛</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">图像</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">耳朵</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">声音</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">嘴巴</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">语言</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">手</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">动作</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">视频</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">图像 + 时间</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">网页</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">文本 + 图片 + 结构</span></p></td></tr></tbody></table></div>

<p id="t-Gr6GgAKqFiPQoA1VVPypvN"><span>因此，</span><span style="font-weight:bold">多模态（Multimodal）</span><span> 这一概念应运而生。</span></p>

<p id="t-puHMAve54caACRcUsi5Dsy"><span>用一句话理解：</span></p>

<blockquote id="t-jPyIRq5qqy2ErjQORw6OlX"><span style="font-style:italic">多模态 = 一个模型同时理解和生成多种信息形式。</span></blockquote>

<p id="t-7cCIxIeZSBF02jsadSiufg"><span>看两个典型例子：</span></p>

<ul><li id="t-PnqPGVA6wo9EXlExMQ2WbX"><span>1、输入图片加问题：</span><span style="font-weight:bold">"这张图里的食物热量高吗？"</span><span>，模型回答：</span><span style="font-weight:bold">"这是炸鸡和薯条，预计约 1200 大卡。"</span></li></ul>

<ul><li id="t-UhHLyKmEdVmiSxdBhEotQO"><span>2、输入语音：</span><span style="font-weight:bold">"帮我总结这段会议"</span><span>，模型输出文字摘要并附带行动建议。</span></li></ul>

<p id="t-wSmAV7I9PpOdadC1TwinVd"><span>这种看图说话、听音总结的能力，就是多模态最直接的体现。</span></p>


<a id="section-0403"></a>
## 二、什么是模态（Modal）？

<a id="t-yuvBKboq9a1zICKDVtw2NA"></a>

<p id="t-DvJYL9Zxv0WyOv5EiYCJj2"><span>模态（Modality）就是</span><span style="font-weight:bold">信息的表现形式</span><span>。</span></p>

<p id="t-Zm0UEIf51uYUSpI3ZfOqvl"><span>不同的模态对应不同的输入与输出，下表列出常见模态及其典型应用：</span></p>

<div id="t-ivsJ40QpNelkeajN2aHXEJ"><table><colgroup><col width="155.8992919921875"/><col width="137.8992919921875"/><col width="169.1214599609375"/><col width="165.0120849609375"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>模态</span></p></td><td style=" vertical-align: top"><p><span>输入示例</span></p></td><td style=" vertical-align: top"><p><span>输出示例</span></p></td><td style=" vertical-align: top"><p><span>典型应用</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>Text（文本）</span></p></td><td style=" vertical-align: top"><p><span>小说、聊天记录</span></p></td><td style=" vertical-align: top"><p><span>回答、文章</span></p></td><td style=" vertical-align: top"><p><span>问答、写作、翻译</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>Image（图像）</span></p></td><td style=" vertical-align: top"><p><span>照片、截图</span></p></td><td style=" vertical-align: top"><p><span>图片理解、生成图</span></p></td><td style=" vertical-align: top"><p><span>OCR、视觉问答</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>Audio（音频）</span></p></td><td style=" vertical-align: top"><p><span>语音、音乐</span></p></td><td style=" vertical-align: top"><p><span>转写文字、合成语音</span></p></td><td style=" vertical-align: top"><p><span>会议摘要、语音助手</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>Video（视频）</span></p></td><td style=" vertical-align: top"><p><span>视频流</span></p></td><td style=" vertical-align: top"><p><span>视频分析、时间轴</span></p></td><td style=" vertical-align: top"><p><span>教学总结、内容检索</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>Sensor（传感器）</span></p></td><td style=" vertical-align: top"><p><span>GPS、温度</span></p></td><td style=" vertical-align: top"><p><span>控制信号</span></p></td><td style=" vertical-align: top"><p><span>机器人、自动驾驶</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>Action（动作）</span></p></td><td style=" vertical-align: top"><p><span>鼠标点击、键盘输入</span></p></td><td style=" vertical-align: top"><p><span>执行动作</span></p></td><td style=" vertical-align: top"><p><span>GUI Agent、自动化</span></p></td></tr></tbody></table></div>

<p id="t-Yf1qysSwalqWzVgo8ac3wa"><span>模型支持的模态越多，能力就越接近人，这也是为什么所有头部实验室都在把文字模型升级为多模态模型。</span></p>

<div id="t-HZwNBI3QKLmWbHYMIpweTs"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/369f12a3f42ff9ff124eae73.webp"/></div>


<a id="section-0404"></a>
## 三、多模态大模型的发展过程

<a id="t-LFWE4TeQRbkHVPmU3G5IYr"></a>

<p id="t-327pudMiMg8xjy3uAXGoeM"><span>从只能处理文字，到能看、能听、能输出视频，多模态大模型经历了三个清晰的阶段。</span></p>

<div id="t-zk1YEJKWK5Dm94QG5TpJBD"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/bed1665140768d89053b70e1.png"/></div>


<a id="section-0405"></a>
## 第一阶段：语言模型（LLM）

<a id="t-7sIrg4FM5VpmScPOmuhKpj"></a>

<p id="t-MJkOSlvhdKhHSyuMjGPvYP"><span>这一阶段模型的输入和输出都是文字，代表产品包括 OpenAI GPT 系列、Anthropic Claude、Google Gemini。</span></p>

<p id="t-aqcMFjagDpnSLMBmHrQOg6"><span>它们能写代码、写文章、做翻译、回答问题，能力很强，但有一个根本限制：</span><span style="font-weight:bold">看不见</span><span>。</span></p>


<a id="section-0406"></a>
## 第二阶段：视觉语言模型（VLM）

<a id="t-fJ0MwyC4KxVDGstThTI16d"></a>

<p id="t-XNxZOi5qKA8P1adnEYNfCr"><span>VLM 在 LLM 基础上增加了"看图"能力，典型用法是上传一张网页截图，问"为什么布局错了"，模型回答"CSS 冲突"。</span></p>

<p id="t-XjpljEBiq6kRcKCGdYu5CD"><span>这一阶段模型开始具备：图像理解、OCR、图表理解等能力。</span></p>


<a id="section-0407"></a>
## 第三阶段：原生多模态模型

<a id="t-CjeDKprw98gnjG5Bh8UBHb"></a>

<p id="t-KfnHS1ZWM7PXRLuwHGcVQP"><span>原生多模态模型不再把"图"和"文"当作两个拼接的模块，而是从训练开始就</span><span style="font-weight:bold">统一处理图像、声音、视频、文本</span><span>。</span></p>

<p id="t-ZjZ2PBBon8lPMa9Fs86Bd7"><span>它具备完整能力：看、听、说、推理、执行，这也是当前业界的主流方向。</span></p>


<a id="section-0408"></a>
## 四、多模态模型内部是怎么工作的？

<a id="t-2QAPFaAkP3jTxonj9k2dsE"></a>

<p id="t-Q8WcTUX3OVnoRNuSRmJNzx"><span>多模态模型的内部工作可以概括为一句话：</span><span style="font-weight:bold">把所有数据转成统一向量空间</span><span>。</span></p>

<p id="t-H8k0tl02HdOsXzRvBsYbyY"><span>例如：</span></p>

<p id="t-uOV7cnKifovuw55zhCgKLo"><span style="font-style:italic;background-color:#ffdcc4">"一只猫"、"cat"、cat.png 三种表达，虽然来自不同模态，编码后在向量空间里会落在接近区域。</span></p>

<p id="t-Y8JSDT8VEXRNZqNFNko7ea"><span>整体流程如下图所示：</span></p>

<div id="t-72hKANQPdJiN5IGqgVak2N"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/f4447c08dd83d1535e396b5e.png"/></div>

<p id="t-4IDqmiMz5NkL2MDQAOjLN1"><span>上图展示了从输入到输出的完整链路，下面拆解每一步。</span></p>


<a id="section-0409"></a>
## 第一步：编码（Encoding）

<a id="t-UUUS0avUMGFPUNZ5uFuZMN"></a>

<p id="t-V3b3AHkZojZy0AdaGNsTkp"><span>不同模态要先转成数字，模型才能处理。</span></p>

<div id="t-T60aFqMAaMwsAVGJo28atO"><table><colgroup><col width="120"/><col width="120"/><col width="250.8992919921875"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>模态</span></p></td><td style=" vertical-align: top"><p><span>原始数据</span></p></td><td style=" vertical-align: top"><p><span>编码后</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>文本</span></p></td><td style=" vertical-align: top"><p><span>"你好"</span></p></td><td style=" vertical-align: top"><p><span>[2034, 789] 一组 token id</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>图像</span></p></td><td style=" vertical-align: top"><p><span>像素矩阵</span></p></td><td style=" vertical-align: top"><p><span>视觉特征向量</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>音频</span></p></td><td style=" vertical-align: top"><p><span>波形</span></p></td><td style=" vertical-align: top"><p><span>频谱特征向量</span></p></td></tr></tbody></table></div>


<a id="section-0410"></a>
## 第二步：统一语义空间

<a id="t-GVy2Sc3lQYK8nABxOlKi5G"></a>

<p id="t-1KNoL15ZLzjMHBZJZUVY7e"><span>编码后的关键一步，是让"猫"、"cat"、cat.png 在向量空间里</span><span style="font-weight:bold">彼此接近</span><span>。</span></p>

<p id="t-tBXxjNHn7o8k3HgFnnrkwD"><span>这就是"跨模态理解"的本质：把不同模态的特征投影到同一个空间里。</span></p>


<a id="section-0411"></a>
## 第三步：生成输出

<a id="t-WjlneqfU5LfbejMMs1bre3"></a>

<p id="t-envfDDVNjUBJAeC4fwkXML"><span>在统一空间里推理之后，模型按需把结果"还原"成不同模态。</span></p>

<p id="t-KYdAV7ZrcMGr6Xk7oMwRTV"><span>输出可以是：文本、图像、音频、视频中的任意一种。</span></p>

<p id="t-h5QSKQtj76NRuJ1vnr2f7K"><span>例如：上传一张图片 → 描述 → 再生成一段介绍视频，这是完整的多模态生成链。</span></p>


<a id="section-0412"></a>
## 五、为什么 Transformer 能统一多模态？

<a id="t-AtB51EUhR4hKygSsgIMvyQ"></a>

<p id="t-qUDEIVCzazzbFvvXTdNrC1"><span>核心原因只有一个：</span><span style="font-weight:bold">Attention 机制</span><span>。</span></p>

<p id="t-NdPZnmeV61VtroIYlbySQv"><span>Transformer 的核心公式是 Attention(Q, K, V)，含义是"模型自己判断该关注什么"。</span></p>

<p id="t-5ctZEHp1R4fzIAFt5rQ4lr"><span>举个例子：当用户问"图片里谁在打篮球？"时，模型会：</span></p>

<ol start="1"><li id="t-C0jAiOeDO3GinCiSwuyOvo"><span>先看图，识别出图中所有人物</span></li></ol>

<ol start="2"><li id="t-087jDRKyABM2p7UpWMwP90"><span>识别出图中的篮球</span></li></ol>

<ol start="3"><li id="t-qf06F4nzdTM3u0vMR1sZPe"><span>判断"谁"和"篮球"之间的关系</span></li></ol>

<ol start="4"><li id="t-FYJTQtMo2LXoO7OLJ3gOM3"><span>综合上下文输出答案</span></li></ol>

<p id="t-nUEdzQHwWzXdmARFMHot8f"><span>这种"自主决定关注点"的能力，让 Transformer 天然适合处理多模态输入：</span></p>

<div id="t-PxJnF4hhCPBZB49BEMKQPP"><table><colgroup><col width="120"/><col width="296.8992919921875"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>输入</span></p></td><td style=" vertical-align: top"><p><span>模型在关注什么</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>纯文字</span></p></td><td style=" vertical-align: top"><p><span>句子之间的语义关联</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>图片 + 文字</span></p></td><td style=" vertical-align: top"><p><span>图像区域和文字描述的对应</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>视频 + 文字</span></p></td><td style=" vertical-align: top"><p><span>时间轴片段和问题的关联</span></p></td></tr></tbody></table></div>

<blockquote id="t-rBcEhQlbSB0tVl7labcEex"><p id="t-fuqU4qmEOTM69ujHGBJUg0"><span style="font-style:italic">为什么 Attention 几乎成了所有现代大模型的"标配"——它天生就是为跨模态设计的。</span></p></blockquote>


<a id="section-0413"></a>
## 六、多模态典型能力

<a id="t-RQp7ECahQfiGy1e01zM5uP"></a>

<p id="t-mMJTuvYnCYV632SARGd4DE"><span>多模态模型具备五大典型能力，下图展示了它们之间的关系。</span></p>

<div id="t-Wpn4Vp2qtOq1Iy9NyRRibg"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/dd5b12fc621e84edc9783cbd.png"/></div>


<a id="section-0414"></a>
## 图像理解

<a id="t-Dc6DizdRYvFy6uszHF8Db8"></a>

<p id="t-qP0Y1ovpE1mCrinzwMEP87"><span>输入截图，模型输出页面问题、UI 分析或 OCR 结果。</span></p>

<p id="t-EP5gcB1OPIup5aYJZ3bz2B"><span>程序员最常用的场景是：截图报错，让 AI 定位问题。</span></p>


<a id="section-0415"></a>
## 图像生成

<a id="t-U7StpZp24Fk28aRMP77fEy"></a>

<p id="t-q3yTo9i4KOMHDb6uJj0GSM"><span>输入"生成未来城市"这样的文字描述，模型返回 AI 图片。</span></p>

<p id="t-PVhM6JyZQgZ7kuoKs9MQ2h"><span>典型应用：海报、封面、游戏素材、产品草图。</span></p>


<a id="section-0416"></a>
## 语音交互

<a id="t-HpNwQ6urJkWyzWo0XcfPHD"></a>

<p id="t-lKLWENmAf2t9OaFGRNtWwm"><span>说话即输入，模型实时回答，能力覆盖 ASR（语音转文字）、TTS（文字转语音）、对话。</span></p>


<a id="section-0417"></a>
## 视频理解

<a id="t-Vll2yC9ipThyLwl6AB5N2w"></a>

<p id="t-d26ARIQi9hNK3gKfvVlIVM"><span>上传一段教学视频，模型输出总结、时间轴、可问答的关键片段。</span></p>


<a id="section-0418"></a>
## Agent 智能体

<a id="t-GMtypq2j6MeSntQXyK6AIc"></a>

<p id="t-sizX4C3x9p1YqqApb2JGIb"><span>输入"帮我做 PPT"，模型开始执行完整行动链：搜索资料 → 生成大纲 → 制作幻灯片 → 修改 → 导出。</span></p>

<p id="t-U2lWOwxLUHCHMkOatW3qpf"><span>Agent 是把"看、听、说"和"动手执行"结合的最终形态。</span></p>


<a id="section-0419"></a>
## 七、初学者必须理解的五个术语

<a id="t-KgDbUYc99fx23gJGNZ0MRz"></a>

<p id="t-1tN98kAHNpkempVp8hmGjx"><span>阅读多模态相关文档时，下表中的术语会反复出现，先记住它们：</span></p>

<div id="t-yyqg4qSiaOpfAO2k5tn7Qj"><table><colgroup><col width="120"/><col width="234.90618896484375"/><col width="280.01556396484375"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>术语</span></p></td><td style=" vertical-align: top"><p><span>含义</span></p></td><td style=" vertical-align: top"><p><span>举例</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>Token（词元）</span></p></td><td style=" vertical-align: top"><p><span>模型处理的最小单位，文本按词切分</span></p></td><td style=" vertical-align: top"><p><span>"你好世界" → [你][好][世界]</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>Embedding（嵌入）</span></p></td><td style=" vertical-align: top"><p><span>把信息转成数字坐标的过程</span></p></td><td style=" vertical-align: top"><p><span>"猫" → [0.12, 0.78, 0.33, ...]</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>Context（上下文）</span></p></td><td style=" vertical-align: top"><p><span>当前对话的历史与背景信息</span></p></td><td style=" vertical-align: top"><p><span>用户说"苹果"+"上下文：手机"= iPhone，而非水果</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>Attention（注意力）</span></p></td><td style=" vertical-align: top"><p><span>决定模型关注输入哪一部分</span></p></td><td style=" vertical-align: top"><p><span>看图时模型先看"人"再看"篮球"</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>Inference（推理）</span></p></td><td style=" vertical-align: top"><p><span>模型根据输入生成输出的过程</span></p></td><td style=" vertical-align: top"><p><span>用户输入问题后，模型"思考并回答"</span></p></td></tr></tbody></table></div>

<blockquote id="t-rKPkd1BHAdCEggcGY1nJYC"><blockquote id="t-OZjEKEtH0UBx07CU14JgIE"><span style="font-style:italic">这五个词贯穿所有大模型文档，先建立直觉，遇到细节再回查。</span></blockquote></blockquote>


<a id="section-0420"></a>
## 八、动手体验：5 分钟搭建你的第一个多模态应用

<a id="t-xCWH4sLXbIVgM7vhgHs3pZ"></a>

<p id="t-ApuP1P7CJUGB1UFxtASdm7"><span>本节目标：上传一张图片，AI 输出文字描述。</span></p>

<p id="t-FoeGejPxklJ9j059VgtAB0"><span>整个流程不需要任何深度学习基础，只要会 Python 即可。</span></p>


<a id="section-0421"></a>
## 准备项目

<a id="t-uZn53ljQXFyfLHB92Ayp10"></a>

<p id="t-4TPW9Jx6SkpmX5gPghNXpF"><span>先创建一个项目 multimodal-demo，并使用 openai 库来测试：</span></p>


<a id="section-0422"></a>
## 实例

<a id="t-OKVaS0gaMYSuGekPsh95jL"></a>

<pre id="t-2Jp9nSA6vlcKLsWDmHZyZR"><code># 创建项目
mkdir multimodal-demo

# 进入项目目录
cd multimodal-demo

# 安装 OpenAI 官方 SDK（兼容多种多模态模型）
pip install openai</code></pre>

<p id="t-vq5Ehrpi5eGMGeeF1vUcou"><span>在 </span><span style="font-weight:bold">multimodal-demo</span><span> 目录下上次一张图片 </span><span style="font-weight:bold">cat-cartoon.webp</span><span>，图片如下（可以右击保存下来测试）：</span></p>

<div id="t-XEYiRpahSwcGh8OSvWnSuB"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/5f2dee5332e220b2bb70ed0d.webp"/></div>


<a id="section-0423"></a>
## 编写调用代码

<a id="t-RP5z1YAXmR6pnqkrnZ3y93"></a>

<p id="t-AOWuAC5rfQHTiSiO2u3fag"><span>本实例采用的是</span><span style="font-weight:bold">节方舟的 Coding Plan</span><span>，他们的 doubao-seed-2.0-pro 模型支持多模态。</span></p>

<p id="t-blXl6BbXl9P89I6K6j61YP"><span>把下面这段代码保存为 </span><span style="font-weight:bold">test.py</span><span>：</span></p>


<a id="section-0424"></a>
## 实例

<a id="t-bHDLk1fPQIuUahHLAW8ahW"></a>

<pre id="t-DBs0GcQLOIF53DFZihnMFA"><code>import base64
import os
from io import BytesIO
from openai import OpenAI
from PIL import Image

# ==================== 方舟配置 ====================
ARK_API_KEY = "ark-xxxx" # 这里填写你的 Key
ARK_BASE_URL = "https://ark.cn-beijing.volces.com/api/coding/v3" # 推荐使用通用 v3 接口
MODEL_ENDPOINT = "doubao-seed-2.0-pro" # 支持多模态的模型

# 初始化客户端
client = OpenAI(
    api_key=ARK_API_KEY,
    base_url=ARK_BASE_URL,
    timeout=60
)

def prepare_image_base64(image_path: str, max_size: int = 1024) -&gt; str:
 """
    读取本地图片，处理透明通道，缩放并转换为 base64 字符串
    """
 if not os.path.exists(image_path):
 raise FileNotFoundError(f"找不到测试图片: {image_path}")

 with Image.open(image_path) as img:
 # 1. 处理 RGBA 透明背景
 if img.mode == "RGBA":
            background = Image.new("RGB", img.size, (255, 255, 255))
            background.paste(img, mask=img.split()[-1])
            img = background
 elif img.mode != "RGB":
            img = img.convert("RGB")

 # 2. 等比例缩放（防大图撑爆 Payload/Token）
        img.thumbnail((max_size, max_size))

 # 3. 转 Base64
        buf = BytesIO()
        img.save(buf, format="JPEG", quality=85) # 适当压缩质量
        b64 = base64.b64encode(buf.getvalue()).decode("utf-8")

 return f"data:image/jpeg;base64,{b64}"

def multimodal_chat(img_path: str, prompt: str):
 """多模态对话测试"""
 try:
 print(f"正在处理图片: {img_path} ...")
        img_b64 = prepare_image_base64(img_path)

 print("正在发送请求至火山引擎方舟平台...")
        res = client.chat.completions.create(
            model=MODEL_ENDPOINT,
            messages=[
 {
 "role": "user",
 "content": [
 {"type": "text", "text": prompt},
 {"type": "image_url", "image_url": {"url": img_b64}}
 ]
 }
 ],
            temperature=0.7,
            max_tokens=1024
 )

 print("\n" + "="*10 + " 识别结果 " + "="*10)
 print(res.choices[0].message.content)
 print("="*30)
 return res

 except FileNotFoundError as e:
 print(f"【错误】{e}")
 except Exception as e:
 print(f"【API 请求失败】请检查网络或 Endpoint/Key 是否正确。错误信息:\n{e}")
 return None

if __name__ == "__main__":
 # 测试配置
    image_file = "./cat-cartoon.webp"
    question = "详细描述这张图片里的内容，分析画面主体、色彩和场景"

 # 模拟创建一个临时测试图（若本地没有相应图片，方便快速肉眼 debug）
 if not os.path.exists(image_file):
 print(f"未检测到 {image_file}，正在生成一张临时测试图...")
        Image.new('RGB', (200, 200), color = (73, 109, 137)).save(image_file)

    multimodal_chat(image_file, question)</code></pre>

<p id="t-3bbvOiyR54RzrAWOIspYOh"><span style="border-bottom:1px solid">运行 Pyhton，输出结果如下：</span></p>

<pre id="t-5W8lCmIYsi1T4tsVFHFXeE"><code>在发送请求至火山引擎方舟平台...

========== 识别结果 ==========
这是一张**Q版萌系卡通风格的数字角色插画**，整体背景为纯净的纯白色，没有任何环境元素，所有视觉重心都集中在中心的小猫主体上，是典型的独立角色立绘/吉祥物设计。
---
### 一、画面主体详细描述
主体是一只端正坐姿的卡通幼橘猫，是经过萌化设计的家养橘白虎斑猫形象，整体气质乖巧天真、亲人友好：
1.  **比例与姿态**：采用萌系设计特有的大头短身比例，头部占整体高度的60%左右，
...</code></pre>

<p id="t-udf3CwWbnDCpFrnzs1NfnR"><span style="border-bottom:1px solid">打开浏览器控制台，就能看到模型对图片的文字描述。整个链路是：</span></p>

<blockquote id="t-lVSRmH2moUh5Z8qdN1aUKJ"><span style="border-bottom:1px solid;font-style:italic">用户上传图片 → 浏览器把图片 URL 传给 OpenAI SDK → 多模态模型理解图片 → 返回文字描述 → 打印到控制台。</span></blockquote>


<a id="section-0425"></a>
## 常见扩展

<a id="t-S73jWbrxHkR16IR9CQmcZr"></a>

<p id="t-XB0UzdyP8wvLG2zauj7uED"><span style="border-bottom:1px solid">完成上面这段最小可运行代码后，你可以继续扩展：</span></p>

<div id="t-6liT1hIeMiHdqpGShd210V"><table><colgroup><col width="194.8992919921875"/><col width="469.0086059570313"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>想做什么</span></p></td><td style=" vertical-align: top"><p><span>怎么改</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">改成上传本地文件</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">用户上传图片后读取后转为 base64，再赋给</span><span style="border-bottom:1px solid;font-weight:bold">image_file</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">支持连续多轮对话</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">把历史问答追加到</span><span style="border-bottom:1px solid;font-weight:bold">messages</span><span style="border-bottom:1px solid">数组</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">换成其它厂商模型</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">构造 OpenAI 客户端时指定</span><span style="border-bottom:1px solid;font-weight:bold">baseURL</span><span style="border-bottom:1px solid">，如 Qwen、OpenAI、Anthropic 兼容端点</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">处理语音</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">把</span><span style="border-bottom:1px solid;font-weight:bold">type: "image_url"</span><span style="border-bottom:1px solid">换成</span><span style="border-bottom:1px solid;font-weight:bold">type: "input_audio"</span><span style="border-bottom:1px solid">，并提供 base64 音频</span></p></td></tr></tbody></table></div>


<a id="section-0426"></a>
## 九、学习路线（推荐）

<a id="t-8988kdZPZ5mtWSDv19tcy2"></a>

<p id="t-5o2ARaIyF7XE4UC89Pql5H"><span style="border-bottom:1px solid">如果你刚接触大模型，下图是一条经过验证的 6 周学习路径。</span></p>

<div id="t-ZrXm4vmKyIPCuPbbRODmbx"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/dd8054fb5f903bb43abb4e9e.png"/></div>


<a id="section-0427"></a>
## 十、未来会发生什么？

<a id="t-CGyPi4RrBOAOoN7fHoD5Gn"></a>

<p id="t-H2GK9lAvniyXvGCkAJVi0J"><span>回顾软件形态的演变，可以看到清晰的趋势：</span></p>

<blockquote id="t-4IPywfpSu6daz8vH3OGoP0"><p id="t-ZgWPc7iL4UKOrnXorz7s4o"><span style="font-style:italic">过去：软件 = 功能。</span></p>
<p id="t-rzWxrOmslyCnNg5orpOZlv"><span style="font-style:italic">现在：软件 = 模型。</span></p>
<p id="t-jXEa3DP7w8emrAEmN0cjxY"><span style="font-style:italic">未来：软件 = 多模态智能体。</span></p></blockquote>

<p id="t-0pffM6cv9mua5DipFkQEnc"><span>这意味着未来用户只需说一句话，例如"做个网站"，模型就会自动完成设计、编码、部署、运营的全流程。</span></p>

<p id="t-0s6oC87hkq2cVWr7QhjZiG"><span>多模态并不是"给模型加一个看图功能"那么简单。</span></p>

<p id="t-VyhghuOtwpxEY8UvIDe9QB"><span>它真正改变的是：</span></p>

<blockquote id="t-m6PsaP5rA1RsCJT4NWXuFT"><p id="t-3ZQZkCRZplXYoBwloS4n7M"><span style="font-style:italic">让计算机开始直接理解现实世界。</span></p></blockquote>

<p id="t-pSijnVlcfpqSOG5yESKnrG"><span>这正是当前 AI 行业最重要的范式转变，也是所有开发者值得投入的方向。</span></p>


<a id="section-0429"></a>
## 多模态模型和普通 LLM 哪个更好用？

<a id="t-8lfw7h42L7AT8PE61lYPpa"></a>

<p id="t-h6Ci39MTlF1zGuoVdgwyU8"><span>取决于场景：纯文本写作、代码生成、翻译，普通 LLM 性价比更高；需要看图、听音频、理解视频时，多模态模型是唯一选择。</span></p>


<a id="section-0430"></a>
## 本地能跑多模态模型吗？

<a id="t-e5sg2BEpOxTW8NdZ5eFgXw"></a>

<p id="t-KXORfccHKt20vo5HzeU6Kn"><span>可以，但成本较高。小参数 VLM（如 Qwen2-VL-7B）可在 16GB 显存的消费级显卡上运行；更大模型通常需要云端 GPU 或调用 API。</span></p>


<a id="section-0431"></a>
## 多模态模型的输出一定是文字吗？

<a id="t-8WLJ8DdhxdkcnbYIJ8FQ9y"></a>

<p id="t-ZTS1rF8o6LZMqYszLQy8fL"><span>不一定。原生多模态模型可以输出文字、图像、音频甚至视频；纯 VLM 通常只输出文字。</span></p>


<a id="section-0432"></a>
## 如何选择多模态 API？

<a id="t-ijumVuzAncEP1NcYL8DOkb"></a>

<p id="t-4TwvbwNRI8BfvxmLOl2M3v"><span>如果只做图像理解：OpenAI gpt-4o、Gemini 2.5 Flash、Qwen2-VL 都是性价比高的选择；如果要"看 + 听 + 实时语音"，建议直接使用 OpenAI Realtime API 或 Gemini Live。</span></p>


<a id="section-0496"></a>
## Token (词元)

<a id="t-block-15162"></a>

<blockquote id="t-Yg3Mg8MSyWwQJiwR8vhD97"><p id="t-6vHNrhgAEwdH8OSLrXpaTj"><span style="font-style:italic">你有没有好奇过，当你向 Deepseek、豆包、千问、ChatGPT 或 Claude 提问时，AI 是怎么读懂你的文字的？答案的核心，就是一个叫做 </span><span style="font-style:italic;font-weight:bold">Token</span><span style="font-style:italic">，中文称之为 </span><span style="font-style:italic;font-weight:bold">词元</span><span style="font-style:italic">的概念。理解 Token，是走进 AI 世界的第一步。</span></p></blockquote>


<a id="section-0497"></a>
## 什么是 Token (词元)？

<a id="t-XubftAepVKTWmV6AwA0fbS"></a>

<pre id="t-w5xl98XdsCqd4KYPPw7wsT"><code>Token (词元) = AI 能理解的最小文本单位</code></pre>

<p id="t-zYcl0XqscUf5kHA887JvVo"><span>我们可以把它理解成：AI 世界里的文字碎片或者 AI 世界的燃料。</span></p>

<p id="t-vBWwvAraUmj0aw4Vll5nOI"><span>就像人类阅读时以词语为单位来理解意思，AI 也不会逐个字母地处理文字——它会先把文本切割成一块一块的碎片，每一块就叫做一个 Token（词元）。</span></p>

<div id="t-zKh9Xt3Gq6wB14qk5Fv2gn"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/a28feda41da53e742c55cd13.png"/></div>

<p id="t-U6qnZauLODcTTZ420gqaKu"><span style="font-weight:bold">一个好用的比喻：</span></p>

<p id="t-T18SfDV4xhEf1gOmFaTCLe"><span>把一篇文章想象成一块比萨，你不会整块吞下去，也不会把它碾成粉末——而是切成一块一块，每块就是一个 Token。AI 就是这样吃进文字的：切块、理解、消化。</span></p>

<p id="t-i2UahSuY8CooaVtvYcrFNU"><span>Token 比单词更细，比字母更粗，是一种灵活的中间单位。</span></p>


<a id="section-0498"></a>
## Token 长什么样？

<a id="t-8HTb2HikDTwKXu5z3zKXjO"></a>

<p id="t-T546pDiLDD86u5Xpt6ZMnC"><span>不同的文本，切分方式大相径庭。</span></p>

<p id="t-xBBANSRpJSkWVJwdUTpeE8"><span>常见词是一个 Token，复杂词会被拆开，标点也算 Token。</span></p>

<div id="t-yh7Wsr7nOAbmMTx3FW0FVT"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/92ddfa98b2c9b694a200a17f.png"/></div>


<a id="section-0499"></a>
## Token 和 字 、 词 有什么区别？

<a id="t-5mG153693BncwnFyqDR2wP"></a>

<p id="t-WjJadJ5thPC9hsqP813ULa"><span style="border-bottom:1px solid">很多人会以为 Token = 单词，但其实</span><span style="border-bottom:1px solid;font-weight:bold">并不完全是</span><span style="border-bottom:1px solid">。</span></p>

<p id="t-JDG2JG5ApdGNOqZxyxxWNY"><span style="border-bottom:1px solid">Token 的划分遵循一套特殊的算法（比如 BPE，字节对编码），结果有时候很直觉，有时候却出人意料：</span></p>

<div id="t-4RZhReOP9F3boGME0LIUFf"><table><colgroup><col width="157.89755249023438"/><col width="120"/><col width="291.00689697265625"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>文本</span></p></td><td style=" vertical-align: top"><p><span>Token 数量</span></p></td><td style=" vertical-align: top"><p><span>说明</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">cat</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">1</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">常见词，直接一个 Token</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">unbelievable</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">4</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">un</span><span style="border-bottom:1px solid">+</span><span style="border-bottom:1px solid">believ</span><span style="border-bottom:1px solid">+</span><span style="border-bottom:1px solid">able</span><span style="border-bottom:1px solid">+ …</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">ChatGPT</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">3</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Chat</span><span style="border-bottom:1px solid">+</span><span style="border-bottom:1px solid">G</span><span style="border-bottom:1px solid">+</span><span style="border-bottom:1px solid">PT</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">你好</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">约 2～3</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">中文通常比英文消耗更多 Token</span></p></td></tr></tbody></table></div>

<blockquote id="t-Z5tzAynRhchJI4nJEMxFLL"><p id="t-CkCi2CpZ8wfOhD82KmGN4z"><span style="border-bottom:1px solid;font-style:italic;font-weight:bold">结论：</span><span style="border-bottom:1px solid;font-style:italic"> Token 比单词更细，比字母更粗，是一种灵活的中间单位。</span></p></blockquote>

<div id="t-l1CQTtEE30L3xPHZxQIZgn"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/40615844d0386319e289291d.png"/></div>


<a id="section-0501"></a>
## 它决定了 AI 能读多少

<a id="t-8LdapfECdbn3pk0yAlNIk1"></a>

<p id="t-5ey7c9570KllejAVEObwMy"><span style="border-bottom:1px solid">每个 AI 模型都有一个</span><span style="border-bottom:1px solid;font-weight:bold">上下文窗口（Context Window）</span><span style="border-bottom:1px solid">，也就是它一次能处理的最大 Token 数量。比如：</span></p>

<ul><li id="t-J9KpcrFqqJ34u4VRoeeESX"><span>GPT-3.5：约 4,000 Token</span></li></ul>

<ul><li id="t-uwBu08CGkNIChbay4ep4F6"><span>GPT-4 Turbo：约 128,000 Token</span></li></ul>

<ul><li id="t-bfwO89pEGthOMBvhBWNog9"><span>Claude 3.5：约 200,000 Token</span></li></ul>

<p id="t-W56LOe82944cSRlphPoZ3R"><span style="border-bottom:1px solid">超过这个限制，AI 就会记不住之前说的话，就像一个人的短期记忆装满了一样。</span></p>


<a id="section-0502"></a>
## 它影响 API 的使用费用

<a id="t-j8PPKj3nRIZn3ydrKPfM0V"></a>

<p id="t-Zn7Waiu0FZo4Y1M09BaUly"><span style="border-bottom:1px solid">调用 AI 接口（API）时，费用通常按 Token 数量计费。</span><span style="border-bottom:1px solid;font-weight:bold">输入的文字 + AI 回复的文字</span><span style="border-bottom:1px solid">，都会消耗 Token，所以写得越长，花费越多。</span></p>


<a id="section-0503"></a>
## 它影响 AI 的回复速度

<a id="t-K4wcasJh6R4UU2JV2sgpKv"></a>

<p id="t-e1IeyqClbUNBBvJ585HR83"><span style="border-bottom:1px solid">AI 生成文字时，是</span><span style="border-bottom:1px solid;font-weight:bold">一个 Token 一个 Token 地输出</span><span style="border-bottom:1px solid">的，所以回复越长，等待时间越久。</span></p>


<a id="section-0504"></a>
## Token 的小知识

<a id="t-3gaiEnpWLI0s4BNw0Iy9aY"></a>

<ul><li id="t-stNBftNnb5iPaYoMGfnY8a"><span style="border-bottom:1px solid;font-weight:bold">1,000 个 Token ≈ 750 个英文单词</span><span>，是一个常用的估算比例。</span></li></ul>

<ul><li id="t-9yrW8Z7UkTajv9QJnqmYxb"><span style="border-bottom:1px solid;font-weight:bold">中文、日文、韩文</span><span>等亚洲语言通常比英文消耗更多 Token，因为这些字符在编码上更复杂。</span></li></ul>

<ul><li id="t-zUE0XotajTEwVfJSvUgj3B"><span style="border-bottom:1px solid;font-weight:bold">空格和标点</span><span>也算 Token！不要以为只有文字才计数。</span></li></ul>

<ul><li id="t-2CNDyMWay9qt1K7euye5Et"><span style="border-bottom:1px solid;font-weight:bold">代码</span><span>的 Token 消耗一般比自然语言少，因为编程语言结构紧凑。</span></li></ul>


<a id="section-0505"></a>
## 总结

<a id="t-o3Pz3bHA6RV0wCZ2hkv08q"></a>

<div id="t-QsXZY89dPVoBFhjCJQUvAG"><table><colgroup><col width="120"/><col width="401.89752197265625"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>概念</span></p></td><td style=" vertical-align: top"><p><span>一句话解释</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Token</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">AI 处理文本的最小单位，介于字符和单词之间</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">上下文窗口</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">AI 一次能处理的最大 Token 数</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Token 计费</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">API 调用按输入+输出的 Token 总量收费</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Token 生成</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">AI 回复是逐 Token 产生的，越长越慢</span></p></td></tr></tbody></table></div>


<a id="section-1507"></a>
## 多模态 Agent

<a id="t-block-22095"></a>

<p id="t-IVQrosDOUNsngNXlsCq3r5"><span>多模态 Agent 能够处理和理解多种类型的输入。</span></p>

<p id="t-ymcJf3dDQNw8ZfmqMwCK48"><span>包括图像、语音、视频等，而不仅仅是文本。</span></p>


<a id="section-1508"></a>
## 什么是多模态

<a id="t-Ywu0oDA02NMLfGnnWGUsnu"></a>

<p id="t-tEizVX0AoNrXAZHHT4O58h"><span>多模态（Multimodal）指同时处理多种信息模态的能力。</span></p>

<p id="t-2alblRscJTLvdlSfmVYUdb"><span>人类通过多种感官接收信息：视觉、听觉、触觉等。</span></p>

<p id="t-GTGTKQsk4rWIcJxGzkkcUc"><span>多模态 AI 旨在让机器具有类似的能力。</span></p>


<a id="section-1509"></a>
## 常见的模态类型

<a id="t-tFds1tEuz71Paljw6qC8BA"></a>

<p id="t-KhXOxb9PfR4UudDIgC7r1d"><span style="font-weight:bold">文本（Text）</span><span>：自然语言文字，是最常见的模态。</span></p>

<p id="t-0qtKdwwS7W7tbI9mlq10ku"><span style="font-weight:bold">图像（Image）</span><span>：静态图片，包括照片、图表、截图等。</span></p>

<p id="t-VRHnaGAyKYYM7Tt7lvPa5T"><span style="font-weight:bold">语音（Audio）</span><span>：声音信号，包括语音、音乐、环境声等。</span></p>

<p id="t-U7BWk2qJhc6cTGfdxUQvlb"><span style="font-weight:bold">视频（Video）</span><span>：连续的图像序列，包含时间和空间信息。</span></p>

<p id="t-uHUCm4B7uDldvE2dNBIRXW"><span style="font-weight:bold">文档（Document）</span><span>：包含文本、表格、图表等混合内容的复合文档。</span></p>


<a id="section-1510"></a>
## 为什么需要多模态 Agent

<a id="t-DvrGgLfviapaFshODZgNWQ"></a>

<p id="t-ceOHxe5RfedRtWrA2Eafqv"><span>单一模态的 Agent 有很大局限。</span></p>

<p id="t-ndT9qbojn9O1c9ajenxPhC"><span>用户的需求是多样化的，不能要求所有人都用文本描述问题。</span></p>

<p id="t-QYWu39cRPxfE1q14dNrV7J"><span>很多信息天然是多模态的，如截图中包含文本和视觉信息。</span></p>


<a id="section-1511"></a>
## 图像理解

<a id="t-iqHARckRMlAdZLQUMVyKau"></a>

<p id="t-j8leZtPrjwzNFdmII09NCU"><span>图像理解是当前最成熟的多模态能力。</span></p>

<p id="t-ZXGJiUMmES2ar40PO10maC"><span>现代多模态模型（如 GPT-4V、Gemini）能够理解和分析图像内容。</span></p>

<p id="t-Ohbb6dYztA2dp47wI29uFP"><span>使得 Agent 能够"看见"并理解视觉信息。</span></p>


<a id="section-1512"></a>
## 核心能力

<a id="t-mvo9hI9iB4GUaB7UdLn3so"></a>

<p id="t-XpIGSZUKGVAxv9BMg4jBQT"><span style="font-weight:bold">视觉问答（VQA）</span><span>：根据图像内容回答问题。</span></p>

<p id="t-PPySbRIqAa80he2fp3k8qb"><span style="font-weight:bold">图像描述（Captioning）</span><span>：生成图像的文字描述。</span></p>

<p id="t-YBJxWVAV58llY8fnaFjETS"><span style="font-weight:bold">文档理解</span><span>：理解文档截图、表格、图表等。</span></p>

<p id="t-jY60uQO2dYQXhCB7g9wCNR"><span style="font-weight:bold">屏幕理解</span><span>：理解 GUI 界面、应用截图等。</span></p>


<a id="section-1514"></a>
## 多模态 Agent 实现

<a id="t-xHHm840JGjwSwOXBPLt8Gm"></a>

<pre id="t-cCiDjOuLFfHTeKPMnTjuzO"><code>class MultimodalAgent:
 """
    多模态 Agent 实现
    能够处理图像、文本等多种输入
    """

 def __init__(self, vision_model, llm, tools):
 # 视觉模型：分析图像
        self.vision_model = vision_model
 # 语言模型：推理和生成
        self.llm = llm
 # 可用工具列表
        self.tools = tools

 def process_image(self, image, task):
 """
        处理图像输入
        :param image: 图像数据（可以是 PIL Image、URL 或 base64）
        :param task: 任务描述
        :return: 处理结果
        """
 # 使用视觉模型分析图像
        image_description = self.vision_model.analyze(image)

 # 结合文本任务进行推理
        prompt = f"""图像内容描述：
{image_description}

用户任务：{task}

请根据图像内容和任务要求执行相应操作。
"""
        reasoning = self.llm.reason(prompt)

 # 如果需要执行操作，选择合适的工具
 if reasoning.needs_action:
 return self.execute_action(reasoning.action)

 return reasoning.result

 def process_text(self, text, context=None):
 """
        处理文本输入
        """
        prompt = f"""
任务：{text}
上下文：{context or "无"}
"""
 return self.llm.generate(prompt)

 def process_mixed(self, image, text, task):
 """
        处理图像和文本混合输入
        """
 # 分析图像
        image_description = self.vision_model.analyze(image)

 # 构建多模态提示
        prompt = f"""图像内容：
{image_description}

附加文本信息：{text}

用户任务：{task}

请结合图像和文本信息来完成用户任务。
"""
 return self.llm.generate(prompt)


class VisionModel:
 """
    视觉模型封装
    支持多种视觉理解能力
    """

 def __init__(self, model_name="gpt-4-vision-preview"):
        self.model_name = model_name

 def analyze(self, image):
 """
        分析图像内容
        返回详细的文字描述
        """
 # 实际调用视觉模型 API
 # 这里简化处理
        response = self.call_vision_api(image, prompt="""
请详细描述这张图像的内容。
包括：
1. 图像中的主要对象和场景
2. 文字内容（如果有）
3. 图表或数据信息（如果有）
4. 重要的细节和特征
""")
 return response.description

 def analyze_chart(self, image):
 """
        专门分析图表类型图像
        """
        response = self.call_vision_api(image, prompt="""
这是一个图表图像。
请提取：
1. 图表类型（柱状图、折线图、饼图等）
2. 标题和轴标签
3. 所有数据点的数值
4. 主要趋势和结论
""")
 return response

 def analyze_document(self, image):
 """
        分析文档类型图像
        """
        response = self.call_vision_api(image, prompt="""
这是一个文档截图。
请提取：
1. 文档类型（PDF 截图、网页、PPT 等）
2. 标题和主要文字内容
3. 表格内容（如果存在）
4. 文档结构
""")
 return response</code></pre>


<a id="section-1515"></a>
## 典型应用场景

<a id="t-rOE5fHngfak0wlaGO2j4bt"></a>

<p id="t-gYhQzINIPyqQ0aYW23OSOv"><span style="font-weight:bold">图表分析</span><span>：自动解读数据图表，提取数据趋势和结论。</span></p>

<p id="t-mg1hgVHnNGpsFUY1Kmyu8t"><span style="font-weight:bold">截图理解</span><span>：理解软件界面截图，进行 UI 自动化操作。</span></p>

<p id="t-sCcsQIhaF9DR43z2ac662z"><span style="font-weight:bold">文档处理</span><span>：处理扫描文档、PDF 截图等。</span></p>

<p id="t-Sw1wifynZanU7g4d3YQNXE"><span style="font-weight:bold">视觉问答</span><span>：根据图片回答用户问题。</span></p>


<a id="section-1516"></a>
## 语音处理

<a id="t-rYqNjXrcaJbzJOpOXgDilM"></a>

<p id="t-DVrWWkZsmVMUlquaIZg5KD"><span>语音交互为 Agent 提供了更自然的交互方式。</span></p>

<p id="t-tWUtkzbjNuPHxC0mYWGynl"><span>用户可以直接说话与 Agent 交流，无需打字。</span></p>


<a id="section-1517"></a>
## 语音处理流程

<a id="t-3ebp14EHkCFPO4IPFPIXfN"></a>

<p id="t-NLoE8bvMHSSxDwhBQ2BZQn"><span style="font-weight:bold">语音识别（ASR）</span><span>：将语音信号转换为文本。</span></p>

<p id="t-xxuDezaQwrOTPleYoJFu3p"><span style="font-weight:bold">语义理解（NLU）</span><span>：理解文本的含义和用户意图。</span></p>

<p id="t-dvLBsONPuAfxYSuOkPNQZe"><span style="font-weight:bold">对话管理（DM）</span><span>：管理对话状态，决定回复策略。</span></p>

<p id="t-PokzJrBJz8suh2Tod9HFrT"><span style="font-weight:bold">语音合成（TTS）</span><span>：将文本回复转换为语音输出。</span></p>


<a id="section-1519"></a>
## 语音处理 Agent

<a id="t-JF7mGkuCOoL8vs4k9CM6zR"></a>

<pre id="t-DKZf95FC6b3EmVKv4Ym8QU"><code>class VoiceAgent:
 """
    语音交互 Agent
    支持语音输入和语音输出
    """

 def __init__(self, asr_model, tts_model, nlu_model, dialogue_manager):
 # 自动语音识别模型
        self.asr_model = asr_model
 # 文本转语音模型
        self.tts_model = tts_model
 # 语义理解模型
        self.nlu_model = nlu_model
 # 对话管理器
        self.dialogue_manager = dialogue_manager

 def process_voice_input(self, audio_data):
 """
        处理语音输入
        :param audio_data: 原始音频数据
        :return: 语音响应（可选）
        """
 # 第一步：语音识别 - 将语音转为文本
        text = self.asr_model.transcribe(audio_data)

 # 第二步：语义理解 - 理解用户意图
        intent = self.nlu_model.parse(text)

 # 第三步：对话管理 - 生成响应
        response = self.dialogue_manager.respond(intent)

 # 第四步：检查是否需要语音输出
 if response.should_speak:
 # 语音合成 - 将文本转为语音
            audio_response = self.tts_model.synthesize(response.text)
 return {
 "text": response.text,
 "audio": audio_response,
 "intent": intent
 }

 return {
 "text": response.text,
 "audio": None,
 "intent": intent
 }

 def process_text_input(self, text):
 """
        处理文本输入（语音转文字后的处理）
        """
 # 语义理解
        intent = self.nlu_model.parse(text)

 # 对话管理
        response = self.dialogue_manager.respond(intent)

 return {
 "text": response.text,
 "intent": intent
 }


class ASRModel:
 """语音识别模型"""

 def transcribe(self, audio_data):
 """
        将语音转为文本
        :param audio_data: 音频数据（ WAV、MP3 等格式）
        :return: 识别的文本
        """
 # 实际调用 ASR API
 # 例如：Whisper、DeepSpeech 等
        text = self.recognition_api(audio_data)
 return text


class TTSModel:
 """文本转语音模型"""

 def synthesize(self, text, voice_id="default"):
 """
        将文本转为语音
        :param text: 要转换的文本
        :param voice_id: 语音风格 ID
        :return: 音频数据
        """
 # 调用 TTS API
        audio = self.synthesis_api(text, voice=voice_id)
 return audio


class DialogueManager:
 """对话管理器"""

 def __init__(self, llm):
        self.llm = llm
        self.conversation_history = []

 def respond(self, intent):
 """
        根据用户意图生成响应
        """
 # 更新对话历史
        self.conversation_history.append({
 "role": "user",
 "content": intent.raw_text
 })

 # 使用 LLM 生成响应
        prompt = self.build_prompt(intent)
        response_text = self.llm.generate(prompt)

 # 更新对话历史
        self.conversation_history.append({
 "role": "assistant",
 "content": response_text
 })

 return DialogueResponse(
            text=response_text,
            should_speak=True
 )

 def build_prompt(self, intent):
 """构建提示词"""
 return f"""
对话历史：
{self.conversation_history}

用户最新意图：{intent}

请生成合适的回复。
"""</code></pre>


<a id="section-1520"></a>
## 视频理解

<a id="t-HhuH7TAXNok9zQhamPILHg"></a>

<p id="t-9rw1zFc8pfeN5knfvPfZzF"><span>视频理解是最复杂的多模态任务之一。</span></p>

<p id="t-l74OHWX8Wg8PdroR6xgwu1"><span>视频同时包含时间维度和空间维度的信息。</span></p>

<p id="t-3zbl7MzpG36InaOGtuEBtn"><span>需要处理帧序列、音频、字幕等多种数据。</span></p>


<a id="section-1521"></a>
## 视频理解的核心挑战

<a id="t-go8OKU5zNPyvVeWhdVVWTp"></a>

<p id="t-mgg5FOszlosPkbfu4Y2O5T"><span style="font-weight:bold">时序建模</span><span>：理解物体在时间上的变化和动作序列。</span></p>

<p id="t-Pmo0kGE1ryPp8wPZMpj3YD"><span style="font-weight:bold">多帧融合</span><span>：有效融合多个帧的信息。</span></p>

<p id="t-P3AhNUvVGtPJEIInGTc0Cb"><span style="font-weight:bold">音频同步</span><span>：结合视频和音频信息。</span></p>

<p id="t-fAKXqyBrWVprGxzkUQRTQG"><span style="font-weight:bold">计算成本</span><span>：处理视频的计算量远大于单张图像。</span></p>


<a id="section-1522"></a>
## 常见处理策略

<a id="t-ussZww3yUd6G3jUIz8hq3h"></a>

<p id="t-rK0CYKEFX2AYvirjFgvExF"><span style="font-weight:bold">采样策略</span><span>：均匀采样或关键帧采样。</span></p>

<p id="t-WUHSSMEb8LufDkK2lFW99L"><span style="font-weight:bold">帧级分析</span><span>：先分析单个帧，再汇总。</span></p>

<p id="t-9WkZnOLqOP7192jU1cjzWV"><span style="font-weight:bold">光流融合</span><span>：利用光流信息捕捉运动。</span></p>


<a id="section-1524"></a>
## 智能相册管理

<a id="t-u87bIbx5Fpng9cIQ5FIfVd"></a>

<p id="t-RkQRQz6WrkYjVNx6X1XYGY"><span>自动识别照片内容，进行分类和搜索。</span></p>

<p id="t-tTOMpgNVEacE4pNXu7s4PV"><span>如：根据场景（海滩、山景）、人物、活动等组织照片。</span></p>


<a id="section-1525"></a>
## 视频内容分析

<a id="t-iWAmWnJDlLebFKszmSYlYH"></a>

<p id="t-iJik4S1ZKWWDGkP6CkOwhi"><span>自动生成视频摘要，提取关键片段。</span></p>

<p id="t-nom3lU8UI1l2tIDEVlsg0A"><span>如：从长视频中提取精彩片段、生成章节概要。</span></p>


<a id="section-1526"></a>
## 无障碍辅助

<a id="t-3CJ7Zc0nlmRonnC9XsNi4T"></a>

<p id="t-m8YAYWdSTl5u17u6CZ2TVQ"><span>为视障用户提供图像描述服务。</span></p>

<p id="t-i4YvUhV2uZIE7OFkEThvGK"><span>描述周围环境、读取文档、识别物体等。</span></p>


<a id="section-1527"></a>
## 视频会议助手

<a id="t-hRGJrNTX8H6JUnZrh3wfd1"></a>

<p id="t-RgmGFlzJnrlOumeH3mwyJa"><span>实时分析会议视频，提取要点和行动项。</span></p>

<p id="t-F1Wa49p8EPHPczKrtQL1jR"><span>自动生成会议纪要和待办事项。</span></p>

