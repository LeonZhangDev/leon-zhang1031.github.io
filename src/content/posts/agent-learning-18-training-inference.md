---
title: "第 18 章 · 模型训练与推理优化"
date: "2026-10-22"
draft: false
author: "学习资料整理"
description: "Transformer、微调、LoRA、SFT、DPO、量化、显存与加速"
tags: ["Agent", "学习路线"]
categories: ["AI 工程"]
prerequisites: ["agent-learning-17-production-engineering"]
verification: {"status": "not-run", "scope": "本次仅整理资料；示例代码与原文技术结论未复跑。"}
---

Transformer、微调、LoRA、SFT、DPO、量化、显存与加速

[学习路线](/posts/agent-learning-route/) · [上一章](/posts/agent-learning-17-production-engineering/) · [下一章](/posts/agent-learning-19-ai-coding/)

本章按知识小节编排。项目内容作为学习案例阅读，示例代码与原文技术结论未在本次整理中执行验证。

## 本章目录

- [垂直领域微调工程师](#section-0015)
- [LLM模型训练](#section-0188)
- [LLM是如何被训练出来的](#section-0189)
- [Function calling是如何被训练出来的](#section-0190)
- [Transformer](#section-0191)
- [简单介绍Transformer架构](#section-0192)
- [编码器和解码器的区别](#section-0193)
- [Transformer vs RNN](#section-0194)
- [大模型分词器是什么？](#section-0195)
- [Embedding 是什么？](#section-0196)
- [注意力机制](#section-0197)
- [Bert vs GPT？](#section-0198)
- [简单介绍一下千问模型？](#section-0199)
- [简单介绍一下Gemini3模型？](#section-0200)
- [模型和硬件](#section-0201)
- [模型能不能跑](#section-0202)
- [跑的有多快](#section-0203)
- [不同模型的对比和选择](#section-0204)
- [主流模型的对比](#section-0205)
- [模型的选型](#section-0206)
- [热门模型特点介绍](#section-0207)
- [模型微调基础](#section-0208)
- [SFT的方案有哪些？](#section-0209)
- [强化学习的方案有哪些？](#section-0210)
- [SFT和RLHF的区别是什么？](#section-0211)
- [数据集的准备](#section-0212)
- [常见的推理加速方法](#section-0214)
- [蒸馏](#section-0215)
- [量化](#section-0216)
- [剪枝](#section-0217)
- [二值化](#section-0218)
- [模型压缩技术的选择](#section-0219)
- [常见的推理框架](#section-0220)
- [你的项目是如何做推理加速的？](#section-0221)
- [参考资料](#section-0222)
- [算法理论与项目](#section-0288)
- [Pytorch/深度学习入门](#section-0289)
- [视频讲解](#section-0290)
- [后训练学习](#section-0291)
- [视频讲解](#section-0292)
- [开源项目学习](#section-0293)
- [后训练算法项目](#section-0294)
- [学习方法介绍](#section-0295)
- [项目地址](#section-0296)
- [SKILL资源](#section-0297)
- [Hugging Face Transformers](#section-1591)
- [支持的任务类型](#section-1592)
- [Transformer 架构核心原理](#section-1593)
- [整体架构：Encoder-Decoder](#section-1594)
- [三大模型家族](#section-1595)
- [安装](#section-1597)
- [环境变量配置](#section-1598)
- [实例](#section-1599)
- [Pipeline：五行代码跑 AI](#section-1600)
- [实例](#section-1602)
- [实例](#section-1604)
- [Tokenizer 深度解析](#section-1605)
- [Tokenization 完整流程](#section-1606)
- [实例](#section-1608)
- [常见 Tokenizer 类型对比](#section-1609)
- [AutoClass：自动选择正确的模型类](#section-1611)
- [实例](#section-1612)
- [实例](#section-1614)
- [实例](#section-1617)
- [实例](#section-1619)
- [实例](#section-1621)
- [实例](#section-1623)
- [实例](#section-1625)
- [微调（Fine-tuning）](#section-1626)
- [微调流程全景](#section-1627)
- [实例](#section-1629)
- [LoRA 参数高效微调（推荐）](#section-1630)
- [实例](#section-1631)
- [实例](#section-1633)
- [推理加速全景](#section-1635)
- [实例](#section-1636)
- [常见问题排查](#section-1637)
- [总结与学习路径](#section-1638)
- [实例](#section-1640)
- [参考资源](#section-1641)

<a id="section-0015"></a>
## 垂直领域微调工程师

<a id="f-doxcniwPJW0rKRpYXPpbs0mm3Rb"></a>

<p id="f-doxcnwpB0eRAVQItMVunLszKoR9"><span>垂直领域微调工程师是大模型团队中专注于模型在特定行业或任务上进行再训练与能力定制的技术岗位，主要负责在预训练模型基础上，通过有限或特定领域的数据进行微调，使模型具备更强的专业理解能力与场景适配能力。该岗位连接通用模型能力与下游应用需求，是实现模型产品化与行业落地的关键角色。</span></p>

<a id="f-doxcnwOq481nTkvV9EqPAZt3QZd"></a>

##### 岗位定位和核心职责

<p id="f-doxcnmIzfv0xfQvxaxgZiFBkHve"><span>与算法工程师不同，微调工程师不负责构建模型底层结构，而是更多地参与数据处理、训练策略设计、指标评估与迭代优化，围绕某一具体任务（如法律问答、医疗报告生成、金融分析、政务问询等）构建专业能力闭环。</span></p>

<a id="f-doxcnGX3NHrzIduIYkTliGonHdf"></a>

##### 关键技术能力要求

<p id="f-doxcn7IdSXBY7D7MjWpqLZ8tOAh"><span>（1）</span><span style="font-weight:bold">行业知识与任务理解能力</span><span>：</span><br/><span> 垂直领域微调工程师需对目标行业的语言风格、知识结构、任务类型有较强理解，能够抽象出符合业务需求的任务定义与评价标准，确保模型在语义层面具备专业性与可控性。</span></p>

<p id="f-doxcnGBjfIA3EJZQgWMkoGXlhcc"><span>（2）</span><span style="font-weight:bold">模型微调与参数优化能力</span><span>：</span><br/><span> 需要掌握全参数微调、冻结微调、参数高效微调（如 LoRA、Adapter、Prefix Tuning 等）等不同技术路线，能够根据数据规模、算力预算与业务场景灵活选择训练策略，并掌握训练过程中的调参技巧与稳定性控制方法。</span></p>

<p id="f-doxcnpLQQoL8JwUeUo5esXISdih"><span>（3）</span><span style="font-weight:bold">指令构造与 Prompt 设计能力</span><span>：</span><br/><span> 能够针对具体任务构造高质量 Prompt 模板、示例指令与上下文配置，优化 Few-shot、Zero-shot 等输入形式，引导模型在生成过程中表现出符合预期的语义风格与逻辑结构。</span></p>

<p id="f-doxcn2cJKqSzIaO8bWqS6Hakf8e"><span>（4）</span><span style="font-weight:bold">数据增强与标注指导能力</span><span>：</span><br/><span> 具备设计反事实样本、扰动样本、边界样本等方法提升模型泛化能力的经验，能够协助标注团队构建高质量样本集，并在数据层面对模型泛化能力形成正向反馈。</span></p>

<p id="f-doxcnFNWQQob6xTCv4ifrCz7jth"><span>（5）</span><span style="font-weight:bold">评估指标与质量控制能力</span><span>：</span><br/><span> 熟悉多种评估指标，如 BLEU、ROUGE、EM、F1、准确率、召回率、人工评分体系等，能够构建自动化评估流程，监测模型在不同迭代过程中的表现变化。</span></p>

<a id="f-doxcnv3qo7h4tGukp4yrro88YGf"></a>

##### 典型工作流程

<p id="f-doxcn9ggVz2kH6FUwh7LBVy6oxb"><span>（1）</span><span style="font-weight:bold">场景需求分析与任务定义</span><span>：</span><br/><span> 根据业务部门或产品线提出的功能需求，提炼出可落地的模型任务定义，如医疗问答、合同生成、证券分析等，明确输入/输出格式、预期效果与边界条件。</span></p>

<p id="f-doxcnUOaEMVMCkYZxGClBTFiLif"><span>（2）</span><span style="font-weight:bold">语料准备与数据构建</span><span>：</span><br/><span> 联合数据工程师完成语料搜集与结构化，设计指令体系、示例样本、标签体系等，构建符合微调需求的高质量样本集，必要时进行领域知识注入或术语标准化处理。</span></p>

<p id="f-doxcniPCOcP8EPNInZJ30AVGHZb"><span>（3）</span><span style="font-weight:bold">模型选择与训练策略制定</span><span>：</span><br/><span> 根据任务复杂度与资源条件选择合适的预训练模型（如 Qwen、ChatGLM、Baichuan 等），并确定训练策略，包括是否冻结部分层、是否应用 LoRA 插入、训练轮数与学习率设置等。</span></p>

<p id="f-doxcnfx0cieOu0RxKDLNXSz6H3g"><span>（4）</span><span style="font-weight:bold">训练调试与指标监控</span><span>：</span><br/><span> 进行模型训练并持续监控 Loss 变化、精度提升、样本覆盖情况，诊断过拟合、漂移、语义偏差等问题，调整超参数以实现更稳定的训练表现。</span></p>

<p id="f-doxcnWd6frq1ORkEvmwtWoZxqJf"><span>（5）</span><span style="font-weight:bold">评估验证与业务集成</span><span>：</span><br/><span> 使用测试集与评估指标对模型效果进行定量验证，并通过业务场景下的人工评估或 AB 测试进行实战验证，确保模型在目标场景下具备上线条件，最终对接开发或推理部署团队完成集成。</span></p>

<a id="f-doxcnxcetbBdPRgP5zTHRJIeqab"></a>

##### 常见技术工具与平台

<p id="f-doxcnTiIiiyYCGAVTVNSgBwDLrI"><span>垂直领域微调工程师常使用的训练框架包括：</span></p>

<p id="f-doxcnUanDiIaM4g9x8kezlMSNsV"><span> Transformers（HuggingFace）、PEFT 库、DeepSpeed、ColossalAI 等。</span></p>

<p id="f-doxcnfYLaxgTvCirk3CEDBsEXEc"><span>模型监控与训练日志通常使用 Weights &amp; Biases、TensorBoard 等可视化工具。</span></p>

<p id="f-doxcniIsVs5OReg94naaVC0WTqc"><span>数据处理常依赖 Pandas、SpaCy、NLPAug 等文本增强工具，训练环境通常部署于多卡 GPU 服务器或分布式云平台，如阿里 PAI、华为昇腾平台等。</span></p>

<p id="f-doxcnY2Oz7J0InUyymsudsdy21f"><span>在多语言场景下，还需结合 OpenCC、Jieba、FastText 等工具处理中文英文混合、术语翻译与对齐问题。</span></p>

<a id="f-doxcnETMz7IUqhm8jsFTE1IWdyf"></a>

##### 岗位价值与发展方向

<p id="f-doxcnJOwM69bv35BKLRe6k7dBNf"><span>垂直领域微调工程师是大模型产品化过程中不可或缺的角色，决定了模型能否真正理解业务语境并满足特定场景下的精度需求与用户交互预期。其岗位价值不仅体现在提升模型表现，更在于构建模型与业务之间的连接通道，将抽象能力转化为可落地产品。</span></p>

<p id="f-doxcnTvuqXgGwp4iGvyhmXXHjsh"><span>随着多行业对大模型应用需求的深入，该岗位可进一步拓展至“任务建模专家”“Prompt 设计工程师”“AI 产品交付工程师”“行业知识增强建模专家”等方向，成为推动大模型在垂直领域深度落地的关键推动者。对于兼具行业知识与算法理解能力的工程师而言，该岗位提供了广阔的发展空间与实践价值。</span></p>


<a id="section-0188"></a>
## LLM模型训练

<a id="f-doxcnqPRbEFW2IepnXwbyGANwHe"></a>

<p id="f-doxcnxKFFkmW6llfmywd4vKxlWh">通过模型训练流程理解微调、强化学习与预训练分别处于哪个阶段，并结合参考资料中的分词等工具学习。</p>

<p id="f-doxcnu3t0kqDqD4C8vqNAi1CjUd"><span><span><a href="https://baijiahao.baidu.com/s?id=1826882165583568205&amp;wfr=spider&amp;for="><span>https://baijiahao.baidu.com/s?id=1826882165583568205&amp;wfr=spider&amp;for=</span></a></span></span><span>）</span></p>


<a id="section-0189"></a>
## LLM是如何被训练出来的

<a id="f-doxcn4bURlStIj0oW0FnWiYKwhh"></a>

<p id="f-doxcnkel1CnoHIzkgf41ASMpE9c"><span style="font-weight:bold">1. 构建基础模型（构建通用大模型）</span></p>

<ul><li id="f-doxcnntQSmoz2O0o94bXtMzSRyc"><span style="font-weight:bold">预训练（Pre-training，非监督）</span></li></ul>

<div id="f-doxcnRomU3fiwHU4Hn4lCBOIZZe" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>使用海量的通用、未标注数据（如网页、书籍、代码等）。</span></div></div>

<div id="f-doxcnQHUwmhES4n9JjFeegv93nh" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>目标是让模型具备</span><span style="font-weight:bold">语言理解、推理、世界知识</span><span>等通用能力。</span></div></div>

<ul><li id="f-doxcnMfUvNJjUsLOGukjarDBbvd"><span style="font-weight:bold">微调（SFT）</span></li></ul>

<div id="f-doxcnBpm4OlhWyZ0AKSJlFHykq8" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>使用</span><span style="font-weight:bold">指令-响应数据</span><span>、任务特定数据、人工标注数据。</span></div></div>

<div id="f-doxcnWhR1snKYWCY5QjGojuczfa" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>让模型学会</span><span style="font-weight:bold">遵循指令</span><span>，更贴近实际应用。</span></div></div>

<ul><li id="f-doxcnlhmTz2xVpJpmnR3gVr3TLd"><span style="font-weight:bold">对齐（如 RLHF、DPO）</span></li></ul>

<div id="f-doxcn3wcaPSdSsBIRKGDmfMaAGh" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>基于</span><span style="font-weight:bold">人类偏好数据</span><span>，通过奖励模型或偏好分数进行优化。</span></div></div>

<div id="f-doxcnS1sCIGenRPdjIsO47PM96d" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>目的是让模型输出更符合人类价值观和安全要求。</span></div></div>

<p id="f-doxcnIegERlL9AY9qxt5qL1jZyg"><span style="font-weight:bold">2. 微调基础模型（提升指定场景性能）</span></p>

<ul><li id="f-doxcn6ITN3VkSey1ZwLugh26CBe"><span>从通用 LLM/SLM 出发，模型已经具备：      </span></li></ul>

<div id="f-doxcnqSdVTfHxYhe9DhVJVv6Rcr" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">语言能力、推理能力、世界知识、聊天、指令跟随、代码能力</span><span>等。</span></div></div>

<ul><li id="f-doxcnj4YX5dxDQNCjw0n1QjwDhf"><span>再次进行： </span></li></ul>

<div id="f-doxcnNxFyvrNjPRabXFJEGhfegc" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">微调（SFT）</span><span>：针对特定领域或任务的数据。</span></div></div>

<div id="f-doxcnrsZMdLnrexI2BOfSWIBTse" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">对齐（RLHF、DPO）</span><span>：确保输出符合特定用户或行业需求。</span></div></div>

<ul><li id="f-doxcnBrJMFS7RiIcvTqKvkXOajg"><span>最终得到</span><span style="font-weight:bold">针对特定场景优化的模型</span><span>。</span></li></ul>


<a id="section-0190"></a>
## Function calling是如何被训练出来的

<a id="f-doxcnB2FGCwjZ7fE2UhGSjqWf9J"></a>

<p id="f-doxcndjWZS0K5VIHFnvvnOyPTyc"><span>Function calling是通过在模型训练的</span><span style="font-weight:bold">预训练阶段</span><span>使用</span><span style="font-weight:bold">自监督学习</span><span>，在</span><span style="font-weight:bold">微调阶段</span><span>使用</span><span style="font-weight:bold">SFT技术</span><span>，以及在</span><span style="font-weight:bold">对齐阶段</span><span>使用</span><span style="font-weight:bold">RLHF技术</span><span>来使模型具有能够理解用户意图并生成函数结构化的函数调用请求的能力。</span></p>

<p id="f-doxcnBlJOsT2jGKRx7hBqoTPHDi"><span>具体来讲：</span></p>

<p id="f-doxcnzvAgfAUvGTqeGt5yH5W18f"><span>预训练阶段的自监督学习使得模型能够理解自然语言。</span></p>

<p id="f-doxcn1Nqif7ZqdpXGAsK7brTvSb"><span>微调阶段的SFT技术使用标注数据让模型理解何时该调用函数，调用函数的格式是什么。</span></p>

<p id="f-doxcnVW9i9aB8bcx3Wg724jjQbf"><span>对齐阶段使用RLHF，使用人类的反馈来优化调用结果，使模型的调用更符合人类的习惯。</span></p>


<a id="section-0191"></a>
## Transformer

<a id="f-doxcnet2LwPck3l4eNgcgo9Escd"></a>

<p id="f-doxcnNsWRFxdKdc3bKEpMUSHRBh"><span>(这一块其实不管在任何书籍，课程或者你去上机构给你的学习路线上，Transformer都占比很大。但还是建议学习一些，特别是想要面一些有点涉及算法的岗位，比如算法工程的同学。另外虽然面试官没有直接问这些问题，但是这些内容时不时在面试中会被提到。比如问你推理加速，提到KV-CACHE的时候，你如果连Transformer的QKV都不知道，肯定KV-CACHE也弄不懂。 比如问你为啥这几年LLM发展这么强大，你就可以提到Transformer的</span><span style="font-weight:bold">并行计算</span><span>和</span><span style="font-weight:bold">长距离依赖 </span><span>来谈谈为啥Transformer出来之后AI发展如此迅速。 总之这节虽然不会直接考到，但是建议理解学习的）</span></p>


<a id="section-0192"></a>
## 简单介绍Transformer架构

<a id="f-doxcnG6wsQuooL7iU37uj1N3QEb"></a>

<p id="f-doxcnywRTbdfm9o4GXhYxVWfuzb"><span>Transformer是最早在2017年在论文《Attention is All You Need》提出的深度学习架构，现在的大语言模型，比如GPT系列，Claude等都是基于Transformer架构设计的。</span></p>

<p id="f-doxcnuK5uTcfuvtqNkMvCPKSiWh"><span>Transformer的架构由</span><span style="font-weight:bold">编码器</span><span>和</span><span style="font-weight:bold">解码器</span><span>组成。它们的基础模块主要由</span><span style="font-weight:bold">输入嵌入</span><span>，</span><span style="font-weight:bold">自注意力机制</span><span>，</span><span style="font-weight:bold">多头注意力机制</span><span>，</span><span style="font-weight:bold">前馈神经网络</span><span>，</span><span style="font-weight:bold">残差连接</span><span>与</span><span style="font-weight:bold">层归一化</span><span>组成。</span></p>

<p id="f-doxcn5whOlMatO2nUs0KXhrDo2f"><span>注意力机制是Transformer最重要的设计，相比于RNN，</span><span style="font-weight:bold">解决了并行计算和长距离依赖 </span><span>两方面的问题，有更高效的</span><span style="font-weight:bold">并行计算能力</span><span>和</span><span style="font-weight:bold">语义理解能力。</span><span>是AI领域的一次重大突破。</span></p>


<a id="section-0193"></a>
## 编码器和解码器的区别

<a id="f-doxcnhdRyTeAoYlretVVlM2Ftzh"></a>

<p id="f-doxcno5moxhWO0qERApFKpdR9Dl"><span>Transformer的</span><span style="font-weight:bold">编码器和解码器</span><span>，都是基于</span><span style="font-weight:bold">注意力机制</span><span>的</span><span style="font-weight:bold">序列建模架构</span><span>。</span></p>

<p id="f-doxcn07KbN2KjaBiUbf1fXq1Mmf"><span style="font-weight:bold">编码器</span><span>主要是</span><span style="font-weight:bold">用来处理输入序列</span><span>，</span><span style="font-weight:bold">提取上下文信息并生成表示的</span><span>。 </span><span style="font-weight:bold">解码器</span><span>主要是用</span><span style="font-weight:bold">来生成输出序列</span><span>。（用途层面）</span></p>

<p id="f-doxcnxq0ZDtl8PumYdZXPwXVi2c"><span style="font-weight:bold">编码器</span><span>通常处理整个输入序列，因此可以</span><span style="font-weight:bold">并行计算所有</span><span>的位置表示，</span><span style="font-weight:bold">因此它的并行性高，推理速度更快</span><span>。 </span><span style="font-weight:bold">解码器</span><span>大多使用</span><span style="font-weight:bold">自回归</span><span>的方式，每一步生成一个Token, 无法并行生成多个Token，因此在推理时</span><span style="font-weight:bold">速度较慢</span><span>。</span></p>

<p id="f-doxcncWLts1nQaeiyxwRqh3nBGe"><span> 关于编解码器更详细的资料，可以参考：</span><span><span><a href="https://blog.csdn.net/weixin_43334693/article/details/130161845"><span>编解码器。</span></a></span></span></p>


<a id="section-0194"></a>
## Transformer vs RNN

<a id="f-doxcnuGQu5QooxBx3jQ6U9ySQhg"></a>

<p id="f-doxcnyo2sIDAJ18ukDIXFrp4u1c"><span>Transformer相比RNN，主要在</span><span style="font-weight:bold">并行计算方面</span><span>和</span><span style="font-weight:bold">长距离依赖</span><span>两方面，具有高效的并行计算能力和语义理解能力。</span></p>

<p id="f-doxcnDDGOxQdfIaE7rrBspKvA38"><span>具体来讲：</span></p>

<p id="f-doxcno4tTi5Qo6mJlSRHjp0nSjb"><span>1.因为RNN处理是逐步进行的，每一步依赖前一步的输出状态，无法并行，训练速度慢。而Transformer基于自注意力机制，可以同时处理整个序列，充分利用GPU的能力，训练速度大幅提升。</span></p>

<p id="f-doxcnF65Mxw74VpwKXc0Biqjyxh"><span>2.RNN网络中，容易出现</span><span style="font-weight:bold">梯度消失或者爆炸</span><span>，</span><span style="font-weight:bold">捕捉长距离依赖困难</span><span>。而Transformer通过注意力机制，任意两个位置可以直接建立联系，长距离依赖问题得到了显著的缓解。</span></p>


<a id="section-0195"></a>
## 大模型分词器是什么？

<a id="f-doxcnrQoHQIm1TeHv8DT7pRdnkh"></a>

<p id="f-doxcncAZZ6VWGkeeL5v7rbnU7kd"><span>因为大语言模型无法直接理解自然语言，我们需要先把它转成数字输入。分词器就是将</span><span style="font-weight:bold">自然语言拆分成更小的单位</span><span>（我们把它叫做token），</span><span style="font-weight:bold">并将每一个token映射成一个唯一ID</span><span>。为后续的词嵌入做准备，从而成为连接起人类语言和模型语言的桥梁。</span></p>


<a id="section-0196"></a>
## Embedding 是什么？

<a id="f-doxcnBOqISdYWQaUQT7UorF0nfb"></a>

<p id="f-doxcnY5Rj6h3XSvABsfC47f8wqe"><span>因为大语言模型无法直接理解自然语言，我们需要先把它转成数字输入。Transformer的做法是通过对自然语言进行</span><span style="font-weight:bold">分词 </span><span>+ </span><span style="font-weight:bold">embedding</span><span>得到最终的输入的。具体来讲，embedding就是将离散的输入：</span><span style="font-weight:bold">包括分词的id和位置id</span><span>，分别通过</span><span style="font-weight:bold">词编码</span><span>和</span><span style="font-weight:bold">位置编码</span><span>转换成稠密向量，最后组合成模型输入的过程。                                                                                                                                                                                                               </span></p>


<a id="section-0197"></a>
## 注意力机制

<a id="f-doxcnkVc5nDTPA36uGz0Vo0ojIS"></a>

<a id="f-doxcnvHUeOcRgQGxwiksK0HJrVJ"></a>

##### 简单介绍注意力机制

<p id="f-doxcnlCWelL0B4YLBfC5JFSocog"><span>（概念简述）注意力机制是在处理一个词时，模型可以关注输入序列的其他词，并根据它们的重要性加权融合信息。</span></p>

<p id="f-doxcnUZxPwAi2G1q1Xxu8VYa10f"><span>（计算公式简述）它的做法是对每一个词生成3个向量，Q, K, V。Q代表当前词要关注什么， K代表当前词是什么 ， V代表当前词能提供什么信息。 使用Q,K点积计算相似度，使用Softmax得到注意力权重，最后对V进行加权，得到Attention矩阵。</span></p>

<p id="f-doxcnEvwhThFvejLZ5qaTRg1Uwc"><span>（好处，总结）这个向量可以</span><span style="font-weight:bold">捕捉词和词之间的长距离依赖</span><span>，信息融合灵活，不依赖固定窗口或顺序，</span><span style="font-weight:bold">且并行计算的效率相比RNN更高</span><span>。</span></p>

<a id="f-doxcnrITzPBuCdSbDllZzIMOHxh"></a>

##### 简单介绍多头注意力机制

<p id="f-doxcnwvjcFAEypea0JP9MibDROg"><span>多头注意力机制是Transformer架构的核心组件，主要用于增强模型在处理序列数据的表达能力。它的核心思想是：</span><span style="font-weight:bold">通过多个注意力头并行计算不同的注意力表示，从而捕捉输入序列和不同位置之间的关系。</span></p>

<p id="f-doxcnWxcCSxleOwuB7nTMQlcfzf"><span>它的主要过程是，生成多组Q,K,V， 对每一组 Q, K, V得到的Attention矩阵进行拼接，得到最终的一个结果。</span></p>

<p id="f-doxcnh9W59H4rH8UJvhdNqn5Onf"><span>使用多头注意力机制，可以让模型在</span><span style="font-weight:bold">不同的子空间中学习不同的关注模式</span><span>，避免单一注意力机制只关注某一种关系的问题，提升模型捕捉</span><span style="font-weight:bold">全局信息的能力</span><span>。</span></p>

<a id="f-doxcnm1Sq78CHQaOxMJKaNjxwdf"></a>

##### 多头注意力机制为何可以增强模型？

<ol start="1"><li id="f-doxcnoC8O5Kf4zWGKGi3gJjZLhb"><span style="font-weight:bold">有利于捕捉长距离依赖</span><span>。传统的模型比如RNN在处理长文本时容易遗忘前面的信息，而注意力机制可以直接关注任意位置的词，无论距离多远。</span></li></ol>

<ol start="2"><li id="f-doxcnWM8m6ydC6Y1PCNlVAuO1Fg"><span style="font-weight:bold">动态信息融合</span><span>。每个词的表示不再是固定的了，而是根据上下文动态生成，从而得到不同的语义表示。</span></li></ol>

<ol start="3"><li id="f-doxcnXU93TcSQNeEDosA2BKfcgb"><span style="font-weight:bold">并行计算。</span><span> 注意力机制不依赖于序列顺序，可以一次性处理整个序列，从而极大提升了训练效率</span></li></ol>

<ol start="4"><li id="f-doxcn02BLuR7IbR1F0AmOB4kS6e"><span style="font-weight:bold">可解释性强</span><span>。注意力权重可以可视化，帮助我们理解模型是如何‘思考’的。</span></li></ol>


<a id="section-0198"></a>
## Bert vs GPT？

<a id="f-doxcnQ3XNt2sWIZ30s8dY83Rh8g"></a>

<p id="f-doxcnwlpWYtdVGcoMRjTdqLnoZc"><span>BERT 和 GPT </span><span style="font-weight:bold">是两种基于 Transformer </span><span>的自然语言处理模型，但它们的设计理念和应用方向不同。BERT 使用</span><span style="font-weight:bold">编码器结构</span><span>，采用</span><span style="font-weight:bold">双向上下文理解</span><span>，</span><span style="font-weight:bold">通过遮盖部分词语进行训练，适合文本分类、问答等理解类</span><span>任务。而 GPT 则基于</span><span style="font-weight:bold">解码器结构</span><span>，采用</span><span style="font-weight:bold">自回归方式从左到右生成文本</span><span>，擅长</span><span style="font-weight:bold">写作辅助</span><span>、</span><span style="font-weight:bold">对话系统等生成类任务</span><span>。简单来说，BERT 更擅长“理解”，GPT 更擅长“生成”。</span></p>


<a id="section-0199"></a>
## 简单介绍一下千问模型？

<a id="f-doxcnwJ1v7G0debHWyH4EoPG5kb"></a>

<p id="f-doxcnkQcdKYEV1K5KaBfgQJ3CCd"><span style="font-weight:bold">1. 基本定位</span></p>

<ul><li id="f-doxcn6NSeX7K1AEZRGCMPOZYQjc"><span>千问是一个</span><span style="font-weight:bold">多语言、多模态的大模型</span><span>，支持文本、图像、音频等输入，具备问答、写作、代码生成、翻译、文档处理等能力。</span></li></ul>

<ul><li id="f-doxcnPwZpwF5eTZ58g0eS8Ab4Ff"><span>最新版本是 </span><span style="font-weight:bold">Qwen3 系列</span><span>，于 2025 年发布，参数规模从 </span><span style="font-weight:bold">0.6B 到 235B</span><span>，涵盖稠密模型和 </span><span style="font-weight:bold">MoE架构</span><span>模型。</span></li></ul>

<p id="f-doxcnevzDN650qM0yfWo0ZsrIte"><span style="font-weight:bold">2. 技术亮点</span></p>

<ul><li id="f-doxcnwE0J7J5PAqtDNXLFSpI55c"><span style="font-weight:bold">混合推理机制</span><span>：支持“快思考”和“慢思考”两种模式，用户可根据任务选择快速响应或深度推理。</span></li></ul>

<ul><li id="f-doxcnxahq7VZWbgriIOkTzSd09c"><span style="font-weight:bold">MoE 架构</span><span>：通过稀疏激活专家子网络，在降低计算成本的同时保持高性能。</span></li></ul>

<ul><li id="f-doxcnQOyGJpx2Qm7qNeDeCQuifu"><span style="font-weight:bold">长上下文能力</span><span>：旗舰模型支持 </span><span style="font-weight:bold">128K~1M tokens</span><span>上下文，适合长文档和复杂对话。</span></li></ul>

<ul><li id="f-doxcn6LQAJPDHss0WuhLsn6YaJb"><span style="font-weight:bold">多语言支持</span><span>：覆盖 </span><span style="font-weight:bold">119 种语言</span><span>，全球化应用能力强。</span></li></ul>

<ul><li id="f-doxcnz2W9FWCr8PW8JvEnp8BisZ"><span style="font-weight:bold">训练规模</span><span>：基于约 </span><span style="font-weight:bold">36万亿 tokens</span><span>预训练，后训练包括指令微调、强化学习（RLHF）、思维链优化。 </span></li></ul>

<p id="f-doxcnA9ObS7vaxrtiwdmPAvFIgd"><span style="font-weight:bold">3. 应用场景</span></p>

<ul><li id="f-doxcndmvxuEzQpSF9YcX3xzoMNf"><span style="font-weight:bold">通用对话与问答</span></li></ul>

<ul><li id="f-doxcnIpFvjKFsCVkUfVm4McWdsg"><span style="font-weight:bold">代码生成与编程辅助</span><span>（专用模型 Qwen-Coder）</span></li></ul>

<ul><li id="f-doxcn9I4mkgKKTq2s05KH6c0y1d"><span style="font-weight:bold">多模态任务</span><span>：图文理解、OCR、音视频速读（Qwen-Omni、Qwen-VL 系列）</span></li></ul>

<ul><li id="f-doxcnJiik4rGDHJeWj7aF8Tfzbd"><span style="font-weight:bold">企业级智能体</span><span>：支持工具调用、Agent框架。</span></li></ul>

<p id="f-doxcneyIWzfJW3NpCMrUSISodJg"><span style="font-weight:bold">4. 开源与生态</span></p>

<ul><li id="f-doxcniKds7HxHVDTOZnNDJ51Vqg"><span>已在 </span><span style="font-weight:bold">魔搭社区、HuggingFace</span><span> 等平台开源，支持免费商用，下载量超 6 亿次，形成全球最大开源模型生态之一。</span></li></ul>


<a id="section-0200"></a>
## 简单介绍一下Gemini3模型？

<a id="f-doxcnr56wuU6RGeIVvU9DHjOL5e"></a>

<p id="f-doxcnsGREbPAxvscnCMKCK77c2g"><span>（Gemini3 是目前最强模型，也有面试官直接问你对Gemini3 的理解，看你有没有关注前沿技术，所以我们准备一个Gemini3的模型知识，防止面试问了啥也答不上来的尴尬）</span></p>

<p id="f-doxcnz8MgbtVpPGeriN2Sky3l4s"><span style="font-weight:bold">Gemini 3 的真正差异化优势</span></p>

<ol start="1"><li id="f-doxcnTzACtVYZZ17OJMguuC4syf"><span style="font-weight:bold">推理深度 + 控制能力</span></li></ol>

<div id="f-doxcnNhkXJX0qbFdQ3MKbfUZLjO" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>其它模型也能做 CoT，但 Gemini 3 引入了 </span><span style="font-weight:bold">可控推理层级（thinking_level 参数）</span><span>，开发者可以动态选择“快思考”还是“慢思考”，而不是固定模式。这意味着它能在延迟和准确率之间灵活权衡，适应不同场景（聊天 vs 科研）。</span></div></div>

<div id="f-doxcnMYHa47yY4NphHfWQ9DTUjg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>结合 </span><span style="font-weight:bold">Deep Think 模式</span><span>，它在博士级推理测试（GPQA Diamond）和 ARC-AGI-2 上刷新纪录，证明不仅能“慢思考”，而且能“正确慢思考”。</span></div></div>

<ol start="2"><li id="f-doxcnYVntTi7zNCuX8vut3nPlFf"><span style="font-weight:bold">原生多模态，不是外挂</span></li></ol>

<div id="f-doxcnSbHo5LOHEty9CHaHSHP5Ef" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>很多模型支持多模态，但大多是“文本为主 + 插件式视觉”。Gemini 3 是 </span><span style="font-weight:bold">从架构层面统一文本、图像、视频、音频、代码</span><span>，并且在 Video-MMMU、UI理解（ScreenSpot-Pro）测试中大幅领先 GPT-5.1 和 Claude。</span></div></div>

<div id="f-doxcnmG3QCEDggEsbU4hM5bPRIh" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>这意味着它不仅能“看图回答问题”，还能做 </span><span style="font-weight:bold">跨模态推理</span><span>，比如结合视频内容和代码逻辑完成任务。</span></div></div>

<ol start="3"><li id="f-doxcnp651tidIjIT2oTdIgDK58f"><span style="font-weight:bold">智能体能力的落地</span></li></ol>

<div id="f-doxcnmu5TG8ufQfKD3euZpsHW3b" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>其它模型也在尝试 Agent，但 Gemini 3 搭配 </span><span style="font-weight:bold">Antigravity 平台</span><span>，实现了端到端工作流：不仅能调用工具，还能 </span><span style="font-weight:bold">自主规划、执行代码、验证结果</span><span>，真正从“回答问题”进化到“完成任务”。</span></div></div>

<div id="f-doxcnMcOO7FRdph0A2MqIGqbO5e" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>这让它更像一个“数字员工”，而不是一个聊天助手。</span></div></div>

<ol start="4"><li id="f-doxcnKVRPmjdrLG3Ny5I52MCdBc"><span style="font-weight:bold">超长上下文 + 高效架构</span></li></ol>

<div id="f-doxcnSETc4fZZwievgD1577DCdh" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>支持 </span><span style="font-weight:bold">100 万 tokens 上下文</span><span>，并且通过 </span><span style="font-weight:bold">MoE（Mixture of Experts）架构 + TPU v6</span><span>，在保证性能的同时降低成本。</span></div></div>

<div id="f-doxcnJ2jfbSroELF7NcApHJR97e" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>其它模型即使能处理长上下文，往往会出现性能衰减，而 Gemini 3 在长上下文场景下仍保持高准确率。</span></div></div>

<ol start="5"><li id="f-doxcn5GK6h8X7Y3K3oH8FjNH7Qb"><span style="font-weight:bold">安全与透明创新</span></li></ol>

<div id="f-doxcnsNonMsuMNZlcoSRQwXQwzM" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span>引入 </span><span style="font-weight:bold">思维签名（Thought Signatures）</span><span>，让长链推理过程可验证，适用于金融、法律等高合规场景。这是目前其它模型没有的。</span></div></div>


<a id="section-0201"></a>
## 模型和硬件

<a id="f-doxcnbRVdrytLnWjfFxcu2S1Fii"></a>

<p id="f-doxcnPdveA38ooAgEJscRPBHYMf"><span>这个问题其实做Infra/算法的人需要知道更多，因为他会做推理加速，他会用专业的卡去做一些调整。 但是通常如果是说做应用的岗，可能很多使用的是远端模型，如果你使用的是远端模型而且是应用岗，这个问题被考察到的概率不大。</span></p>

<p id="f-doxcnyzPIQ7FgPUOOwiEDuyG85e">本地部署模型需要关注硬件条件、模型参数量和内存需求。</p>


<a id="section-0202"></a>
## 模型能不能跑

<a id="f-doxcnVYmK7xE977Rge5puOYz3Lc"></a>

<blockquote id="f-doxcnMxEAVbICHDsP5B82Vaf5Yf"><p id="f-doxcnOXbmyMpOOnJfmMpRwnjAwb">本节涉及训练与推理。深入理解需要神经网络、训练过程与算法基础；应用学习可以先掌握基本原则，再逐步研究具体细节。</p>

</blockquote>

<blockquote id="f-doxcnypTz7QwLkLIjWhLvkg29nh"><p id="f-doxcnGkFQ5lehsjlMddbfc55wRb"><span> 这里讲清楚一个模型能不能跑起来，核心就是一个问题：</span><span style="font-weight:bold">运行它的设备内存够不够</span><span>。 </span></p></blockquote>

<blockquote id="f-doxcnb4kGgsNhvDmtiLH2EPpbTh"><p id="f-doxcnMF6fgLz7kUtAzlTMVTvp5Y"><span> 如果模型跑在 GPU 上，这个设备内存通常就是显存；如果跑在 CPU 上，就是内存（RAM）。同一个 7B 参数的模型，推理时可能只需要 14GB 左右设备内存，而用 PPO 做强化学习对齐时可能需要超过 200GB。所以在回答"需要多少内存/显存"之前，我们必须先搞清楚：</span><span style="font-weight:bold">现在是哪个阶段、跑在哪类设备上</span><span>。</span></p></blockquote>

<a id="f-doxcnVjRQUsCdlCm00H5dhmWsxd"></a>

##### 背景：先搞清楚&quot;问的是哪个阶段&quot;

<p id="f-doxcn8UenHwO7l3O04tlrSzJyjb"><span>当有人问"训练一个大模型需要多少内存/显存"时，这个问题就过于笼统，缺少了细节—因为一个大模型从诞生到被用户使用，要经历多个完全不同的阶段，每个阶段的内存需求差异极大。同一个 7B 参数的模型，推理时可能只需要 14GB 左右设备内存，而用 PPO 做强化学习对齐时可能需要超过 200GB。所以在回答"需要多少内存/显存"之前，我们必须先搞清楚：</span><span style="font-weight:bold">面试官说的是哪个阶段、跑在哪类设备上</span><span>。所以第一部分，给大家介绍一下大模型的生命周期。大模型的生命周期，也是建议大家需要理解和掌握的，虽然大家的岗位和工作可能只聚焦在一块，但是你需要知道他整个生命周期。</span></p>

<a id="f-doxcnCU12G6GNPcaZi0ra57gKjb"></a>

###### 大模型完整生命周期

<blockquote id="f-doxcnX8p4vF2WHAzooxiWgSbPed"><p id="f-doxcnfqkg42VUovIyQrEptgUjid"><span>掌握这个图也可以看出大模型的大致岗位。 一般说算法，Infra, 算法工程，说的其实比较笼统，那对应会的事就是这里的RLHF（后训练），或者做模型部署推理的。 大模型应用工程 不处于这个图中，而是使用部署好的模型接口，直接调用，在上层做应用。 当然大模型算法一部分，就是搞研究，读论文，修改数理公式，创新个RL的方法呀，让整个训练效果更好，这种要求就会更高，一般要求论文，</span></p>
<p id="f-doxcnl1whtc2mmYtW56scsRb0lf"><span>综上，大模型方向岗位的门槛一般是  算法（纯研究) &gt; 算法工程、infra,推理 &gt; 大模型应用</span></p></blockquote>

<div id="f-doxcneeyegXvniUuT52em3y1J3e"><img alt="" decoding="async" height="240" loading="lazy" src="/images/agent-learning/6cf8d0342ffc70495abbee31.png" width="360"/></div>

<p id="f-doxcnetlSQnXp22IAK73TwiZLzb"><span style="font-weight:bold">1. 预训练</span></p>

<p id="f-doxcnFoOgsHnjsJ7x7F02VTM9Ug"><span>这是大模型的"出生"阶段。用海量文本数据（几万亿 token）训练模型预测下一个 token，让模型学会语言规律、世界知识和推理能力。这个阶段由 OpenAI、Meta、DeepSeek 等顶级团队完成，成本动辄数百万美元，普通人和工程师直接下载现成的 Base Model 即可，无需自己做。</span></p>

<p id="f-doxcnl3kH2cXOePLgZxGxybEXyh"><span style="font-weight:bold">2. SFT</span></p>

<p id="f-doxcndq8gQ4WTJrMuxYSedymsuH"><span>Base Model 只会"续写文本"，不会"回答问题"。SFT 用人工标注的（问题, 高质量回答）数据对，教会模型遵循指令、按格式输出。这是让模型从"自动补全"变成"AI 助手"的关键一步。</span></p>

<p id="f-doxcnIi4NEwxbuZRE18vDBQnOpb"><span style="font-weight:bold">3. 奖励模型训练</span></p>

<p id="f-doxcnhEwqvuBcBYzfgnajSpDyPp"><span>收集人类对不同回答的偏好数据（"A 回答比 B 好"），训练一个打分模型。这个模型之后会充当"AI 评委"，给策略模型的输出打分，替代人类实时反馈。</span></p>

<p id="f-doxcnO6BLzdMLntjDbLxGRDMtCh"><span style="font-weight:bold">4. 策略更新</span></p>

<p id="f-doxcnp0yBMVOJlHaD4vyLp4gVhc"><span>用强化学习算法（PPO 或 GRPO）驱动模型不断优化，目标是在奖励模型认可的方向上提升输出质量，同时不偏离 SFT 模型太远（通过 KL 惩罚控制）。这才是严格意义上的"RLHF"中的 RL 部分。</span></p>

<p id="f-doxcnQafi44U42oAYvGvrchlp8g"><span style="font-weight:bold">5. 部署推理</span></p>

<p id="f-doxcnfRL7kLTjawxseGHIJzsWzh"><span>训练完成后，模型被部署给用户使用。这个阶段不需要梯度和优化器状态，运行内存需求大幅下降。如果部署在 GPU 上，主要看的就是显存；如果部署在 CPU 上，主要看的就是内存（RAM）。可以通过量化（INT8、INT4）进一步压缩，让模型跑在消费级显卡或普通 CPU 机器上。</span></p>

<a id="f-doxcnQlXvAO67QxMQ0iTuiUhryg"></a>

##### 基础知识铺垫

<a id="f-doxcnVBk6SVjfQEw0bj2DAfAr4c"></a>

###### 核心原则

<p id="f-doxcnci7aI6E8oDLRvXswptqzWc"><span style="font-weight:bold">运行内存需求 = 运行设备上每样东西的大小之和。</span></p>

<p id="f-doxcndMxIkNIZOQkCyXbkEZiVLf"><span>所以搞清楚两件事就够了：</span><span style="font-weight:bold">放什么</span><span> + </span><span style="font-weight:bold">每样多大</span><span>。</span></p>

<blockquote id="f-doxcnNh66RCVWEfgSDXjGA3erjg"><p id="f-doxcnZjbQdgknmf5BYE2EHWVjXd"><span>这里的"运行设备"可以是 GPU、CPU，也可以是 NPU/TPU 等加速器。跑在 GPU 上时，这部分内存通常叫</span><span style="font-weight:bold">显存</span><span>；跑在 CPU 上时，就是</span><span style="font-weight:bold">内存（RAM）</span><span>；跑在其他加速器上，则更准确地叫</span><span style="font-weight:bold">设备内存</span><span>。后文为了讲解方便，很多地方仍会用"显存"举例，但底层计算逻辑是一致的。</span></p></blockquote>

<p id="f-doxcnRWlLdKH5PWd439Kt2chBIf"><span>在讲"放什么"之前，先明确</span><span style="font-weight:bold">两个阶段</span><span>在干什么：</span></p>

<p id="f-doxcndjpBOyjse2hGXnNppq2bUe"><span>- </span><span style="font-weight:bold">训练阶段</span><span>：典型的深度学习训练过程——前向传播计算 loss，反向传播计算梯度，优化器用梯度更新参数。因为要做反向传播，计算设备必须同时持有参数、梯度、优化器状态，还要缓存中间激活值，所以内存压力极大；如果用 GPU 训练，这个压力就体现为显存压力。</span></p>

<p id="f-doxcnmyTs2Jvy6uNNciDHiAWbDg"><span>- </span><span style="font-weight:bold">推理阶段</span><span>：模型已经训练好，只做前向传播，输入 prompt 输出 token。不需要更新任何参数，因此梯度和优化器状态完全不存在，运行内存需求大幅下降。</span></p>

<p id="f-doxcnkVu6Nz9FjIjLOhiaHhimId"><span>这也是为什么同一个模型，训练和推理的运行内存需求可以相差 5-10 倍。</span></p>

<a id="f-doxcnnyOM0eJpPCDyFij8XobJHb"></a>

###### 训练 vs 推理：运行内存里住着什么？

<pre id="f-doxcnFH8mv7yRpfVj07BgF3XRlg"><code>┌─────────────────────────────┐      ┌─────────────────────────────┐
│          训练阶段            │      │          推理阶段            │
├─────────────────────────────┤      ├─────────────────────────────┤
│  ✅ 模型参数                 │      │  ✅ 模型参数                 │
│  ✅ 梯度                    │      │  ❌ 梯度（不需要）            │
│  ✅ 优化器状态               │      │  ❌ 优化器状态（不需要）      │
│  ✅ 激活值（前向传播缓存）    │      │  ❌ 激活值（不需要缓存）      │
│  ❌ KV Cache（通常不涉及）   │      │  ✅ KV Cache                 │
└─────────────────────────────┘      └─────────────────────────────┘
       训练内存占用：参数量 × ~14字节 + 激活值    推理内存占用：参数 + KV Cache</code></pre>

<p id="f-doxcn9IHTQc8u7neDl52IIz5pee"><span>推理比训练省内存的根本原因：</span><span style="font-weight:bold">梯度和优化器状态消失了</span><span>，这两项在训练时占了总内存的大头；如果模型跑在 GPU 上，这里说的总内存就是总显存。</span></p>

<a id="f-doxcnxTQ8TxCwjaFQUTen3AaYxc"></a>

###### 各部分简介

<p id="f-doxcnP9OSO17pO7O7cdyyDzK2Fb"><span style="font-weight:bold">训练和推理都有</span></p>

<p id="f-doxcnb4gi2t5b7nNKOfazB6psFd"><span style="font-weight:bold">模型参数（Parameters）</span></p>

<p id="f-doxcnwZn31gG2MgknVXHZCYCAEd"><span>模型的"权重"，就是神经网络里所有的数字。7B 模型 = 70亿个参数。训练和推理都需要，是运行内存占用的基础项，也是估算一切的起点。</span></p>

<p id="f-doxcnClHfurfLgdG2SewkYd5uWs"><span style="font-weight:bold">训练专属（推理时全部消失）</span></p>

<p id="f-doxcnAYh4f0p3ci6Q8wftjWgmud"><span style="font-weight:bold">梯度（Gradients）</span></p>

<p id="f-doxcngi5Yroz74VnWOPXEQbMhSo"><span>反向传播时计算出来的"每个参数应该往哪个方向调整多少"。每次更新完参数就可以释放，但在反向传播过程中必须常驻运行内存。精度通常用 fp32（4字节），大小和参数量相同。</span></p>

<p id="f-doxcnpWY5AANTyiccuGyUThJ65g"><span style="font-weight:bold">优化器状态（Optimizer States）</span></p>

<p id="f-doxcnfBRzw3wZSIPqB49I7hwx8d"><span>优化器（如 Adam）为了更稳定地更新参数，需要记录每个参数的历史梯度信息（动量 m 和方差 v）。Adam 需要存两份，共 8字节/参数，是训练运行内存开销最大的单项。与梯度不同，优化器状态跨训练步骤</span><span style="font-weight:bold">全程持久存在</span><span>。</span></p>

<p id="f-doxcnqiMCi8Z5PrEPaTJTLIrZch"><span style="font-weight:bold">激活值（Activations）</span></p>

<p id="f-doxcnxJwtnO0UX2Eyjo55gjOEtc"><span>前向传播时每一层的中间计算结果。反向传播计算梯度时需要用到它，所以前向传播过程中必须缓存。大小与 batch size 和序列长度成正比。可用"梯度检查点"技术，在反向传播时重新计算激活值而非缓存，以计算时间换内存空间。</span></p>

<p id="f-doxcnn2Vz4CBdAJLzDeOldYYbnf"><span>总结上述内容，可以用下面的图来表示</span></p>

<pre id="f-doxcnU5Z2LfMdf1dFMauw91O96c"><code>前向传播                    反向传播                  参数更新
───────────────────────────────────────────────────────────────▶
产生激活值（缓存）  →  用激活值计算梯度  →  优化器用梯度更新参数
    ↑                      ↑
 占内存，撑到              占内存，用完即丢
 反向传播结束才能释放</code></pre>

<div id="f-doxcnkx5u7MCzYfXeMV6Uqd2jNe"><img alt="" decoding="async" height="853" loading="lazy" src="/images/agent-learning/53c2b09092dd0711b9c4f39c.png" width="1280"/></div>

<p id="f-doxcnqcPGk86lCYTJFU5lDdVxXk"><span style="font-weight:bold">推理专属</span></p>

<p id="f-doxcnCOaGzrDqpslJME4HUwc61g"><span style="font-weight:bold">KV Cache</span></p>

<p id="f-doxcn6gFhmOU4oImP5fwziOa5kh"><span>KV Cache可以理解为推理时一个空间换时间的策略。推理时，模型自回归生成每个新 token 都需要"回顾"之前所有 token 的注意力键值（Key-Value）。KV Cache 把这些中间结果缓存下来，避免每步都重新计算。随上下文长度和并发请求数增长，长上下文或高并发场景下不可忽视。</span></p>

<a id="f-doxcna60qj2xs81M4piCZVFCs4g"></a>

###### 精度与字节数

<blockquote id="f-doxcnQArGCntKkBFDmIUy7SVtqS"><p id="f-doxcnocdCaksg4rbo5amFds1St7"><span>混合精度训练：刻意将低精度（bf16/fp16）和高精度（fp32）混合使用——在能省的地方用低精度（前向传播、反向传播计算，节省显存和加速），在必须保精度的地方用高精度（梯度存储、参数更新，防止数值不稳定）。</span></p>
<p id="f-doxcnPHPtiBcuURiBn2AebWqo2b"><span>这里在</span><span style="font-weight:bold">面试网龙的时候也被问过，面试官问bf16和fp16的区别。</span></p></blockquote>

<p id="f-doxcnlbtp6OWf2XARunOvLPh9Lc"><span>这里的“精度”决定了每个参数、梯度或中间激活值用多少字节存储。字节数越低，显存占用越小、吞吐通常越高；但数值范围和有效精度也会下降，训练时更容易遇到溢出、下溢或更新不稳定。因此训练常用混合精度：参数和计算尽量用 bf16/fp16，梯度累积、优化器状态等关键部分保留 fp32。</span></p>

<ul><li id="f-doxcn6r2x3f4ofcJiRVwY7ZKWGg"><span style="font-weight:bold">fp32（4 字节）</span><span>：精度高、数值稳定，但显存占用最大、计算吞吐较低。常用于</span><span style="font-weight:bold">梯度、优化器状态、关键累积计算</span><span>。</span></li></ul>

<ul><li id="f-doxcn5jv1gK9rUF2F1mebwoZ5Fb"><span style="font-weight:bold">bf16（2 字节）</span><span>：和 fp32 接近的数值范围，不易溢出；有效精度低于 fp32。</span><span style="font-weight:bold">大模型训练的常用选择</span><span>，覆盖训练参数、前向反向计算、推理。</span></li></ul>

<ul><li id="f-doxcnCXt3LgD27KvMHjTp1zaMke"><span style="font-weight:bold">fp16（2 字节）</span><span>：有效精度比 bf16 略高，但数值范围更小，训练易溢出，常需 loss scaling。多用于</span><span style="font-weight:bold">推理、混合精度训练、较老 GPU 加速</span><span>。</span></li></ul>

<ul><li id="f-doxcnQOfcVHW84H2xNZPpYiQe2e"><span style="font-weight:bold">INT8（1 字节）</span><span>：量化压缩，显存更省，但带来少量精度损失。用于</span><span style="font-weight:bold">量化推理</span><span>。</span></li></ul>

<ul><li id="f-doxcnMiAisWgP2OEAd8MF3LX7zb"><span style="font-weight:bold">INT4（0.5 字节）</span><span>：压缩最激进，显存占用最低，但对模型效果和量化方法更敏感。用于</span><span style="font-weight:bold">极致压缩推理、QLoRA</span><span>。</span></li></ul>

<a id="f-doxcnWQDckFDhvVQQjyv5MM66If"></a>

###### 激活值大小的计算

<blockquote id="f-doxcnYF3PfKmpbje3cuipuT2tAf"><p id="f-doxcnZE1ABmfyhqFd2Man55q0re">激活值大小与超参数、数据量和模型结构有关。下面提供估算方法，可以先理解原则，再进一步研究细节。</p></blockquote>

<p id="f-doxcnO8e8kpGAgNdkvW5Zk266gh"><span>激活值不像参数一样固定，它由四个变量共同决定：</span></p>

<ul><li id="f-doxcnnXgM4w8KHKcod66nSQ4Fxh"><span style="font-weight:bold">B（batch size）</span><span>：一次喂多少条数据 — 超参数，可调。</span></li></ul>

<ul><li id="f-doxcnSyQzSA4xZ8bxPVBLGg63Vd"><span style="font-weight:bold">L（sequence length）</span><span>：每条数据有多少个 token — 由数据集和截断设置决定，部分可控。</span></li></ul>

<ul><li id="f-doxcndb6u6z6qLnXrv4Jfx6Zflg"><span style="font-weight:bold">H（hidden dimension）</span><span>：模型隐藏层维度 — 模型架构决定，选定后固定。</span></li></ul>

<ul><li id="f-doxcnCvIKCmkKTaPwfilG7OApbs"><span style="font-weight:bold">N（层数）</span><span>：Transformer 的层数 — 模型架构决定，选定后固定。</span></li></ul>

<p id="f-doxcn2WojRjz4ssA6zwujXnxaMc"><span style="font-weight:bold">粗略公式（bf16，每一层）：</span></p>

<p id="f-doxcnewvJDk2tMy5LGQdp1KCaYe"><span><span><span><div><div><div><span class="katex equation-katex-span"><span class="katex-html equation-katex-span"><span class="base equation-katex-span"><span class="mord text equation-katex-span"><span class="mord cjk_fallback equation-katex-span">单层激活值</span></span><span class="mrel equation-katex-span">=</span></span><span class="base equation-katex-span"><span class="mord mathnormal equation-katex-span" style="margin-right: 0.0502em">B</span><span class="mbin equation-katex-span">×</span></span><span class="base equation-katex-span"><span class="mord mathnormal equation-katex-span">L</span><span class="mbin equation-katex-span">×</span></span><span class="base equation-katex-span"><span class="mord mathnormal equation-katex-span" style="margin-right: 0.0813em">H</span><span class="mbin equation-katex-span">×</span></span><span class="base equation-katex-span"><span class="mord equation-katex-span">10</span><span class="mrel equation-katex-span">∼</span></span><span class="base equation-katex-span"><span class="mord equation-katex-span">12</span><span class="mord text equation-katex-span"><span class="mord cjk_fallback equation-katex-span">字节</span></span></span></span></span></div></div></div></span></span></span></p>

<p id="f-doxcnU7VqBWa7DLUhAc5wbHojWb"><span><span><span><div><div><div><span class="katex equation-katex-span"><span class="katex-html equation-katex-span"><span class="base equation-katex-span"><span class="mord text equation-katex-span"><span class="mord cjk_fallback equation-katex-span">全模型激活值</span></span><span class="mrel equation-katex-span">=</span></span><span class="base equation-katex-span"><span class="mord mathnormal equation-katex-span" style="margin-right: 0.0502em">B</span><span class="mbin equation-katex-span">×</span></span><span class="base equation-katex-span"><span class="mord mathnormal equation-katex-span">L</span><span class="mbin equation-katex-span">×</span></span><span class="base equation-katex-span"><span class="mord mathnormal equation-katex-span" style="margin-right: 0.0813em">H</span><span class="mbin equation-katex-span">×</span></span><span class="base equation-katex-span"><span class="mord mathnormal equation-katex-span" style="margin-right: 0.109em">N</span><span class="mbin equation-katex-span">×</span></span><span class="base equation-katex-span"><span class="mord equation-katex-span">10</span><span class="mrel equation-katex-span">∼</span></span><span class="base equation-katex-span"><span class="mord equation-katex-span">12</span><span class="mord text equation-katex-span"><span class="mord cjk_fallback equation-katex-span">字节</span></span></span></span></span></div></div></div></span></span></span></p>

<blockquote id="f-doxcn5WtvUtyybuGtXbMWmGuklf"><p id="f-doxcnJNDYCC8f5KTAY30mSB8ITC"><span>这里的 10~12 字节是经验系数，不是数学常数。不同框架、是否使用 FlashAttention、是否开启梯度检查点，都会影响真实激活值大小。它适合作为视频讲解里的快速估算。</span></p></blockquote>

<p id="f-doxcnJpCimYUH0KbRhKWEOP427g"><span style="font-weight:bold">7B 模型举例</span><span>（$H=4096$，$N=32$）：</span></p>

<ul><li id="f-doxcn0ExLp9yErgLFJUK1T1dtve"><span style="font-weight:bold">B=1, L=2048</span><span>：约 </span><span style="font-weight:bold">2.5 GB</span></li></ul>

<ul><li id="f-doxcnEzkSoX3FIoSdjno7qoKYhg"><span style="font-weight:bold">B=4, L=2048</span><span>：约 </span><span style="font-weight:bold">10 GB</span></li></ul>

<ul><li id="f-doxcnzoQ5RaAeZRHMkA00AtHMrd"><span style="font-weight:bold">B=8, L=2048</span><span>：约 </span><span style="font-weight:bold">20 GB</span></li></ul>

<ul><li id="f-doxcn2Mc2HmZcJd5TEYGkzxbJ0e"><span style="font-weight:bold">B=4, L=8192</span><span>（长文本）：约 </span><span style="font-weight:bold">40 GB</span></li></ul>

<p id="f-doxcnTvaMyD81zcLzG2wCQOc8Se"><span style="font-weight:bold">快速估算口诀（不想算细节时）：</span></p>

<blockquote id="f-doxcnT4GMRiYTSlg0pbP7eKHgqh"><p id="f-doxcnjml9qz3ZdIiuxjfOLspIif"><span>7B 模型，batch=4，seq=2048 → 激活值约 </span><span style="font-weight:bold">10 GB。</span><span>seq 翻倍 → 激活值翻倍；batch 翻倍 → 激活值翻倍</span></p></blockquote>

<a id="f-doxcnQ4DtoO0VmEkRV5hGUEBOrf"></a>

##### 后训练阶段

<p id="f-doxcnrVdaH37rp7eJ8e2sPX5kiN"><span>后训练的每个算法，在显存里放的东西不同，需要按统一假设分别估算。下面统一用 </span><span style="font-weight:bold">7B 模型、混合精度（bf16 参数 + fp32 梯度/优化器）</span><span> 作为基准。</span></p>

<blockquote id="f-doxcndW1QX5HIDhy2zaDu9rxoHb"><p id="f-doxcnuo5gXo4ofng3dmr0sB93Jf"><span style="font-weight:bold">基础换算</span><span>：7B 参数</span></p>
<p id="f-doxcnD0WiCiNq490AyGhZWuiRVb"><span>参数（bf16）：7B × 2字节 = </span><span style="font-weight:bold">14 GB</span></p>
<p id="f-doxcn8DNQGKPkjG8w5oY3QqXh6f"><span>梯度（fp32）：7B × 4字节 = </span><span style="font-weight:bold">28 GB</span></p>
<p id="f-doxcnyDTP8UmWFTQJwQNQwu1vlg"><span>优化器状态 Adam（fp32，动量+方差）：7B × 4字节 × 2 = </span><span style="font-weight:bold">56 GB</span></p>
<p id="f-doxcnoaxceWyJfhiarWjANni7je"><span>激活值：随 batch size 和 seq_len 变化，下面各节单独说明</span></p>
<p id="f-doxcnPzy2thrKA84WwowlrhIqDg"><span>注意：这里“梯度”和“优化器状态”都按 fp32 存，但数量不同：梯度只有一份，所以是 4字节/参数；Adam 优化器状态有动量 m 和方差 v 两份 fp32，所以是 2 × 4 = 8字节/参数。</span></p></blockquote>

<a id="f-doxcnZCgd5g76g8maJA8ibtSndf"></a>

###### SFT — 全参微调（Full Fine-Tuning）

<p id="f-doxcnMRWkogyOjhM9G6qh44IGlh"><span style="font-weight:bold">显存里有什么：</span></p>

<p id="f-doxcnoWswcpuUBX6URGmbf6IqLe"><span>所有参数都参与训练，梯度和优化器状态覆盖全部 7B 参数。</span></p>

<ul><li id="f-doxcnPSRoh00vhfl3F4AUm8dQXb"><span style="font-weight:bold">模型参数（bf16）</span><span>：7B × 2 字节 = </span><span style="font-weight:bold">14 GB</span></li></ul>

<ul><li id="f-doxcnndN3ETLB9l6qoRsKVVOGec"><span style="font-weight:bold">梯度（fp32）</span><span>：7B × 4 字节 = </span><span style="font-weight:bold">28 GB</span></li></ul>

<ul><li id="f-doxcn8DtoyEmiaL6UGFIj9LUNIb"><span style="font-weight:bold">优化器状态 Adam（fp32）</span><span>：7B × 4 字节 × 2 = </span><span style="font-weight:bold">56 GB</span></li></ul>

<ul><li id="f-doxcnQ8VzV9yxF4Gth5ktIp2Lud"><span style="font-weight:bold">激活值</span><span>：B·L·H·N·12 字节，典型 </span><span style="font-weight:bold">10–40 GB</span></li></ul>

<p id="f-doxcnIsWVmNcXKKWp699rKrqN1c"><span style="font-weight:bold">激活值典型范围</span><span>（7B，$H=4096$，$N=32$，bf16）：</span></p>

<ul><li id="f-doxcnfdkxEWqpXkHkCPhDUrSjTh"><span>B=4，L=2048 → 约 10 GB</span></li></ul>

<ul><li id="f-doxcnZTh7JSulJwjjBF0ZDkkKNd"><span>B=8，L=2048 → 约 20 GB</span></li></ul>

<ul><li id="f-doxcnTuh1apfV8OFmoNQqT6RkPb"><span>B=4，L=8192（长文本）→ 约 40 GB</span></li></ul>

<p id="f-doxcnlCnF1e0pLdc58pz7eE1Lee"><span style="font-weight:bold">结论</span><span>：固定项已达 98 GB，单张 A100（80GB）仅凭固定项就装不下，必须多卡或开启梯度检查点。</span></p>

<a id="f-doxcnWxPPKtjTsdUAvhGn0thVtb"></a>

###### SFT — LoRA 微调

<p id="f-doxcnVPUk0muUd4UB47VbZArClc"><span style="font-weight:bold">核心思路</span><span>：冻结原始模型参数，只在每层注入小的低秩矩阵（rank r，通常 r=8~64），只训练这些新增的 adapter 参数。</span></p>

<p id="f-doxcnh0h8aRqBbsJ8IEfoQF5eqZ"><span style="font-weight:bold">LoRA 可训练参数量估算</span><span>（r=16，7B 模型约 32 层，每层注入 Q/V 矩阵）：</span></p>

<ul><li id="f-doxcnSVId0Vx6HoETlRfNd15Kcg"><span>每个 adapter：2 × (hidden_dim × r) ≈ 2 × (4096 × 16) ≈ 13万参数</span></li></ul>

<p id="f-doxcnuDFchKQKmdoVHNBAUiJhtd"><span>- 全模型 adapter 总量 ≈ 约 </span><span style="font-weight:bold">4000万参数（0.04B）</span><span>，仅占原模型的 0.5%</span></p>

<p id="f-doxcnkkipfwYp3F1mnSQzkMWc6e"><span>7B 模型 SFT LoRA 微调显存拆解（LoRA 参数量按 ~0.04B 估）：</span></p>

<ul><li id="f-doxcnMwRZPMMmDJgNf2acTXnfWe"><span style="font-weight:bold">原始模型参数（bf16，冻结、无梯度）</span><span>：7B × 2 字节 = </span><span style="font-weight:bold">14 GB</span></li></ul>

<ul><li id="f-doxcnubcmTao9fjB7qyAXYSp3ac"><span style="font-weight:bold">LoRA 参数梯度（fp32）</span><span>：0.04B × 4 字节 ≈ </span><span style="font-weight:bold">0.16 GB</span></li></ul>

<ul><li id="f-doxcnXte4vJ87AdtD6kLyAWgWvR"><span style="font-weight:bold">LoRA 优化器状态 Adam（fp32）</span><span>：0.04B × 4 字节 × 2 ≈ </span><span style="font-weight:bold">0.32 GB</span></li></ul>

<ul><li id="f-doxcnSkAcavE9L54CK44k6zeQMd"><span style="font-weight:bold">激活值</span><span>（同全参）：B·L·H·N·12 字节，典型 </span><span style="font-weight:bold">2.5–10 GB</span></li></ul>

<p id="f-doxcnJO669q0HnGsJo4eiqKryHf"><span style="font-weight:bold">激活值典型范围</span><span>（7B，$H=4096$，$N=32$，bf16）：</span></p>

<ul><li id="f-doxcnPzml5y9umvA0o2k9NKuMDc"><span>B=1，L=2048 → 约 2.5 GB</span></li></ul>

<ul><li id="f-doxcnaoJVahhku8B2caz9mK8Mqd"><span>B=4，L=2048 → 约 10 GB</span></li></ul>

<blockquote id="f-doxcncDtGi0mPVDpNObINoFW4dg"><p id="f-doxcnGu3uXS88ZxJFoOaa8S7GKf"><span>注意：LoRA 的激活值和全参 SFT </span><span style="font-weight:bold">近似同量级</span><span>——因为前向传播时整个模型都要跑，激活值覆盖全部 32 层，不会因为"只训练少量参数"就消失。真实工程里可能通过冻结层优化、梯度检查点进一步降低。</span></p></blockquote>

<p id="f-doxcnDdd8X7Dypbn3cAv805fkvg"><span style="font-weight:bold">结论</span><span>：单张 4090（24GB）在短序列、小 batch 下可以跑 LoRA，但比较贴边；更常见的消费级方案是 QLoRA（把冻结的底座模型量化存储）。显存大幅下降的原因是</span><span style="font-weight:bold">梯度和优化器状态只覆盖极少量 adapter 参数</span><span>，而不是全部 7B。</span></p>

<a id="f-doxcnOKTmfY67ddtIZgXgaiGyYg"></a>

###### RL 对齐 — PPO 算法

<blockquote id="f-doxcnybeyDlxZQ3Ni8v9uUf7r0f"><p id="f-doxcnrnmDnWT5KcQXayNNpb8Ooe"><span>这里涉及到强化学习的两个算法，PPO和GRPO。没有强化学习的背景肯定看不懂，可以先理解或者背诵。 如果想要学习强化学习，可以用零基础学习算法章节的后训练SKILL去学习，这个SKILL主要核心就是在讲解这两个算法和区别。</span></p></blockquote>

<p id="f-doxcn538fWv8hX4v6m24hRKsIRe"><span style="font-weight:bold">PPO 需要同时在显存里维护多个模型</span><span>（这里按最容易理解的"独立 Actor + 独立 Critic + Reference + Reward Model"估算）：</span></p>

<p id="f-doxcnwdNyfR10FxoEVy4W8VBmsd"><span style="font-weight:bold">PPO 同时持有 4 个 7B 模型，显存压力极大：</span></p>

<ul><li id="f-doxcnUp9tDJIovRVODt3NiadTFc"><span style="font-weight:bold">Actor 策略模型</span><span>（生成回答，训练目标）— </span><span style="font-weight:bold">训练中</span><span>：参数 + 梯度 + 优化器 + 激活值，</span><span style="font-weight:bold">108–138 GB</span></li></ul>

<ul><li id="f-doxcnsQTcyI0EusoRUFEA5rVl9c"><span style="font-weight:bold">Critic 价值网络</span><span>（估计每个状态价值，辅助计算优势）— </span><span style="font-weight:bold">训练中</span><span>：同 Actor，</span><span style="font-weight:bold">108–138 GB</span></li></ul>

<ul><li id="f-doxcnnTUkL5Qjy1smvDcGrbT5Kh"><span style="font-weight:bold">Reference Model</span><span>（SFT 冻结版，计算 KL 惩罚）— </span><span style="font-weight:bold">冻结</span><span>：仅参数，</span><span style="font-weight:bold">14 GB</span></li></ul>

<ul><li id="f-doxcnkjjT09zcx1G2wuUvfkWhke"><span style="font-weight:bold">Reward Model</span><span>（给回答打分）— </span><span style="font-weight:bold">冻结</span><span>：仅参数，</span><span style="font-weight:bold">14 GB</span></li></ul>

<p id="f-doxcnEMPHQHuS9NHNM0sSQcrGCe"><span style="font-weight:bold">合计 ≈ (108~138) + (108~138) + 14 + 14 ≈ 244~304 GB</span></p>

<p id="f-doxcnYlj5NmbchtRkzD2ZR2fExb"><span style="font-weight:bold">为什么需要 Critic？</span></p>

<p id="f-doxcnzJpZJEP6IMGk0QaqIU6Irc"><span>PPO 用 GAE（广义优势估计）计算每个 token 的优势值，需要一个能输出 </span><span><span><span><div><div><div><span class="katex equation-katex-span"><span class="katex-html equation-katex-span"><span class="base equation-katex-span"><span class="mord mathnormal equation-katex-span" style="margin-right: 0.2222em">V</span><span class="mopen equation-katex-span">(</span><span class="mord mathnormal equation-katex-span">s</span><span class="mclose equation-katex-span">)</span></span></span></span></div></div></div></span></span></span><span>（状态价值）的网络，这个 Critic 网络和 Actor 同等规模。</span></p>

<p id="f-doxcnDZICoEmw4Suhq788vNy8Ub"><span style="font-weight:bold">结论</span><span>：7B PPO 通常至少 4 张 A100 80GB 起步，并且需要分片、梯度检查点等工程优化，是后训练中显存开销最大的算法。</span></p>

<a id="f-doxcnfJBSkWMjsnKOxuRmG3bllf"></a>

###### RL 对齐 — GRPO 算法（DeepSeek R1 方案）

<p id="f-doxcnXGLSfUUgbNwNhipvGWBpHd"><span style="font-weight:bold">GRPO 的核心改动</span><span>：去掉 Critic，改用"组内相对奖励"估计优势——同一个 prompt 生成 G 条回答，用组内均值做 baseline，不需要价值网络。</span></p>

<p id="f-doxcn72sNzwUyUGeTTEHj7o7Mzd"><span>GRPO 相对 PPO </span><span style="font-weight:bold">去掉了 Critic</span><span>，是 R1 训练得以可行的关键优化. </span><span style="font-weight:bold">GRPO 需要的模型</span><span>：</span></p>

<ul><li id="f-doxcnAZEsyXorH36W4U0locTD4b"><span style="font-weight:bold">Actor 策略模型</span><span>（生成回答，训练目标）— </span><span style="font-weight:bold">训练中</span><span>：</span><span style="font-weight:bold">108–138 GB</span></li></ul>

<ul><li id="f-doxcnvU7h9WzXJNiKVSHbUIIWBe"><span style="font-weight:bold">Reference Model</span><span>（计算 KL 惩罚）— </span><span style="font-weight:bold">冻结</span><span>：仅参数，</span><span style="font-weight:bold">14 GB</span></li></ul>

<ul><li id="f-doxcnflsC3CaJsKCumZavjMlQuc"><span style="font-weight:bold">Reward Model</span><span>（规则函数可替代）— </span><span style="font-weight:bold">可选</span><span>：</span><span style="font-weight:bold">0–14 GB</span></li></ul>

<p id="f-doxcnihKr2GtSOjnvZcgavSigGh"><span style="font-weight:bold">合计 ≈ 122–152 GB</span><span>，相比 PPO 节省了一个完整 Critic（≈100 GB），算力门槛下降了一档。</span></p>

<p id="f-doxcnvuggDSSK8Tf8HCxe1CnO8c"><span style="font-weight:bold">合计 ≈ (108~138) + 14 ≈ 122~152 GB</span><span>（不用独立 RM 的情况）</span></p>

<p id="f-doxcn5pG9oyPmuhMv5QB5ZJnPbe"><span style="font-weight:bold">额外注意</span><span>：GRPO 每个 prompt 要采样 G 条回答（通常 G=8），激活值比普通 SFT 更大，实际偏向范围上限。</span></p>

<p id="f-doxcng1907JxyDCDqmyKTTmvdlg"><span style="font-weight:bold">对比 PPO 的节省：</span></p>

<ul><li id="f-doxcnKWiFdwXDhoeNij79KRl1bd"><span>去掉 Critic：直接省去一整个训练中的模型（108~138 GB）</span></li></ul>

<ul><li id="f-doxcnJH1woAICkAl3uENgjpUMYk"><span>去掉 Reward Model（用规则打分）：再省 14 GB</span></li></ul>

<p id="f-doxcnn3ZH1PI5cGtBN6eO4kXBEc"><span>- </span><span style="font-weight:bold">显存从 ~244~304 GB 降到 ~122~152 GB，减少约一半</span></p>

<p id="f-doxcnrfbmsQ4n72fyhBY0VSFwlb"><span style="font-weight:bold">结论</span><span>：7B GRPO 单张 A100 80GB 无法完成（122~152GB &gt; 80GB），通常至少需要 2 张 A100 起步，并配合分片或梯度检查点；相比 PPO 的 244~304GB，显存压力大约减半。这是 DeepSeek R1 选择 GRPO 的核心工程原因之一。</span></p>

<a id="f-doxcnKyEXYhominiIc5qrGFsovf"></a>

##### 部署推理阶段

<p id="f-doxcn7dgFTNRhTyvepN8EsU7LBg"><span>推理阶段只做前向传播，没有反向传播，因此</span><span style="font-weight:bold">梯度、优化器状态、训练用的激活值缓存全部消失</span><span>。主要显存开销只剩两样东西：模型参数 + KV Cache（实际框架还会有少量临时 workspace）。</span></p>

<a id="f-doxcn08TXVQCXTSVuvWLjvGLcNc"></a>

###### 模型参数：精度决定基础显存

<p id="f-doxcnQpugnEeeda9JE5Gtr7g7Lg"><span>推理时参数可以用比训练更低的精度，进一步压缩显存。</span></p>

<p id="f-doxcnI9zgJYbL5JJZWrayGXBlmh"><span style="font-weight:bold">7B 模型各精度下的参数显存：</span></p>

<ul><li id="f-doxcnnAZrrV8EQAizmeIIOo1Wjd"><span style="font-weight:bold">bf16 / fp16（2 字节）</span><span>：</span><span style="font-weight:bold">14 GB</span><span>，标准推理，效果无损。</span></li></ul>

<ul><li id="f-doxcn6eZUwPR96iUFYa8bpGeEOc"><span style="font-weight:bold">INT8（1 字节）</span><span>：</span><span style="font-weight:bold">7 GB</span><span>，量化推理，效果略有损失。</span></li></ul>

<ul><li id="f-doxcnkd8bl5fQ8onuWotetwpqdd"><span style="font-weight:bold">INT4（0.5 字节）</span><span>：理论 </span><span style="font-weight:bold">3.5 GB</span><span>，实际常见 </span><span style="font-weight:bold">4–5 GB</span><span>（因为还要存量化 scale 等元数据），极致压缩。</span></li></ul>

<blockquote id="f-doxcndnQkYEIxlWKu5Q91tgagbg"><p id="f-doxcniSxha5BOnBqBiM2MO99GGh"><span style="font-weight:bold">量化</span><span>：将参数从高精度（bf16）映射到低精度（INT8/INT4）存储，推理时动态还原计算。显存减半，但精度有损失，模型越大量化损失越小（70B模型 INT4 通常还可接受，7B INT4 可能有明显退化）。</span></p></blockquote>

<a id="f-doxcnzRyjJFweSHUB9fjRMcfTYf"></a>

###### KV Cache：随上下文增长的动态开销

<blockquote id="f-doxcnLoIWYcHx8DUYCZDDtB4cgc"><p id="f-doxcnKiO1QJp66TCgmNBO7FKIzf"><span>这里面公式又很复杂，需要专门做过部署推理的人才会深入理解，还是抓大放小，有个印象就行。</span></p></blockquote>

<p id="f-doxcnKNJ1zaF2IDTCeYjuYnLJPf"><span>推理时每生成一个 token，都需要回顾之前所有 token 的注意力键值（Key-Value）。KV Cache 把这些结果缓存起来避免重复计算（空间换时间）。</span></p>

<p id="f-doxcnZH80t83QZRbYU92L5vMmjh"><span style="font-weight:bold">KV Cache 大小公式：</span></p>

<p id="f-doxcnyyArYbydlhMoEQBKT2OrAh"><span><span><span><div><div><div><span class="katex equation-katex-span"><span class="katex-html equation-katex-span"><span class="base equation-katex-span"><span class="mord text equation-katex-span"><span class="mord equation-katex-span">KV Cache</span></span><span class="mrel equation-katex-span">=</span></span><span class="base equation-katex-span"><span class="mord equation-katex-span">2</span><span class="mbin equation-katex-span">×</span></span><span class="base equation-katex-span"><span class="mord mathnormal equation-katex-span" style="margin-right: 0.0502em">B</span><span class="mbin equation-katex-span">×</span></span><span class="base equation-katex-span"><span class="mord mathnormal equation-katex-span">L</span><span class="mbin equation-katex-span">×</span></span><span class="base equation-katex-span"><span class="mord mathnormal equation-katex-span" style="margin-right: 0.109em">N</span><span class="mbin equation-katex-span">×</span></span><span class="base equation-katex-span"><span class="mord equation-katex-span"><span class="mord mathnormal equation-katex-span" style="margin-right: 0.109em">N</span><span class="msupsub equation-katex-span"><span class="vlist-t vlist-t2 equation-katex-span"><span class="vlist-r equation-katex-span"><span class="vlist equation-katex-span"><span class="equation-katex-span" style=" margin-left: -0.109em; margin-right: 0.05em"><span class="sizing reset-size6 size3 mtight equation-katex-span"><span class="mord mtight equation-katex-span"><span class="mord mathnormal mtight equation-katex-span" style="margin-right: 0.0315em">k</span><span class="mord mathnormal mtight equation-katex-span" style="margin-right: 0.0359em">v</span><span class="mord mtight equation-katex-span" style="margin-right: 0.0278em">_</span><span class="mord mathnormal mtight equation-katex-span">h</span><span class="mord mathnormal mtight equation-katex-span">e</span><span class="mord mathnormal mtight equation-katex-span">a</span><span class="mord mathnormal mtight equation-katex-span">d</span><span class="mord mathnormal mtight equation-katex-span">s</span></span></span></span></span></span></span></span></span><span class="mbin equation-katex-span">×</span></span><span class="base equation-katex-span"><span class="mord equation-katex-span"><span class="mord mathnormal equation-katex-span" style="margin-right: 0.0278em">D</span><span class="msupsub equation-katex-span"><span class="vlist-t vlist-t2 equation-katex-span"><span class="vlist-r equation-katex-span"><span class="vlist equation-katex-span"><span class="equation-katex-span" style=" margin-left: -0.0278em; margin-right: 0.05em"><span class="sizing reset-size6 size3 mtight equation-katex-span"><span class="mord mtight equation-katex-span"><span class="mord mathnormal mtight equation-katex-span">h</span><span class="mord mathnormal mtight equation-katex-span">e</span><span class="mord mathnormal mtight equation-katex-span">a</span><span class="mord mathnormal mtight equation-katex-span">d</span></span></span></span></span></span></span></span></span><span class="mbin equation-katex-span">×</span></span><span class="base equation-katex-span"><span class="mord text equation-katex-span"><span class="mord cjk_fallback equation-katex-span">字节数</span></span></span></span></span></div></div></div></span></span></span></p>

<ul><li id="f-doxcnYyph8G0ilnWNzVKAA9ONFe"><span>系数 2：Key 和 Value 各一份</span></li></ul>

<ul><li id="f-doxcnSyN3ShteR5ICSjktI0aLxT"><span><span><span><div><div><div><span class="katex equation-katex-span"><span class="katex-html equation-katex-span"><span class="base equation-katex-span"><span class="mord mathnormal equation-katex-span" style="margin-right: 0.0502em">B</span></span></span></span></div></div></div></span></span></span><span>：当前同时参与推理的序列数，也可以叫推理时的有效 batch size；在线服务里通常可近似理解为“正在生成中的活跃并发请求数”</span></li></ul>

<ul><li id="f-doxcn1OYWjjOCsLVa7J1wBrBYCe"><span><span><span><div><div><div><span class="katex equation-katex-span"><span class="katex-html equation-katex-span"><span class="base equation-katex-span"><span class="mord mathnormal equation-katex-span">L</span></span></span></span></div></div></div></span></span></span><span>：上下文长度（已生成的 token 数）</span></li></ul>

<ul><li id="f-doxcnjlj4bzaLgtiueB9OT1oRpg"><span><span><span><div><div><div><span class="katex equation-katex-span"><span class="katex-html equation-katex-span"><span class="base equation-katex-span"><span class="mord mathnormal equation-katex-span" style="margin-right: 0.109em">N</span></span></span></span></div></div></div></span></span></span><span>：层数</span></li></ul>

<ul><li id="f-doxcn3Edee6f9OZFNPxgsLmPOUg"><span><span><span><div><div><div><span class="katex equation-katex-span"><span class="katex-html equation-katex-span"><span class="base equation-katex-span"><span class="mord equation-katex-span"><span class="mord mathnormal equation-katex-span" style="margin-right: 0.109em">N</span><span class="msupsub equation-katex-span"><span class="vlist-t vlist-t2 equation-katex-span"><span class="vlist-r equation-katex-span"><span class="vlist equation-katex-span"><span class="equation-katex-span" style=" margin-left: -0.109em; margin-right: 0.05em"><span class="sizing reset-size6 size3 mtight equation-katex-span"><span class="mord mtight equation-katex-span"><span class="mord mathnormal mtight equation-katex-span" style="margin-right: 0.0315em">k</span><span class="mord mathnormal mtight equation-katex-span" style="margin-right: 0.0359em">v</span><span class="mord mtight equation-katex-span" style="margin-right: 0.0278em">_</span><span class="mord mathnormal mtight equation-katex-span">h</span><span class="mord mathnormal mtight equation-katex-span">e</span><span class="mord mathnormal mtight equation-katex-span">a</span><span class="mord mathnormal mtight equation-katex-span">d</span><span class="mord mathnormal mtight equation-katex-span">s</span></span></span></span></span></span></span></span></span></span></span></span></div></div></div></span></span></span><span>：KV 头数量</span></li></ul>

<ul><li id="f-doxcnjgoGT9MJ8KFhsRH1b9PzJg"><span><span><span><div><div><div><span class="katex equation-katex-span"><span class="katex-html equation-katex-span"><span class="base equation-katex-span"><span class="mord equation-katex-span"><span class="mord mathnormal equation-katex-span" style="margin-right: 0.0278em">D</span><span class="msupsub equation-katex-span"><span class="vlist-t vlist-t2 equation-katex-span"><span class="vlist-r equation-katex-span"><span class="vlist equation-katex-span"><span class="equation-katex-span" style=" margin-left: -0.0278em; margin-right: 0.05em"><span class="sizing reset-size6 size3 mtight equation-katex-span"><span class="mord mtight equation-katex-span"><span class="mord mathnormal mtight equation-katex-span">h</span><span class="mord mathnormal mtight equation-katex-span">e</span><span class="mord mathnormal mtight equation-katex-span">a</span><span class="mord mathnormal mtight equation-katex-span">d</span></span></span></span></span></span></span></span></span></span></span></span></div></div></div></span></span></span><span>：每个注意力头的维度</span></li></ul>

<blockquote id="f-doxcnpNRrHAkKkznZeC7WRZmU9f"><p id="f-doxcnZSQhGf0GNty4ZSmKAGsg2F"><span>如果是传统 MHA，KV 头数量通常等于注意力头数量，KV Cache 会更大；如果是 GQA/MQA，KV 头数量更少，KV Cache 会明显变小。所以 KV Cache 也和模型结构有关。</span></p></blockquote>

<p id="f-doxcnQEGKfgszoHIkXngALGaRKd"><span style="font-weight:bold">7B 模型举例</span><span>（$N=32$，$D_{head}=128$，bf16，按 8~32 个 KV 头给范围）：</span></p>

<p id="f-doxcn9CJjDkWfeTZjapwBM8iKJd"><span>KV Cache 的显存几乎与 </span><span><span><span>batch × context_length</span></span></span><span> 成正比：</span></p>

<ul><li id="f-doxcnQBm0TrsDWjscjPaKDDKLQg"><span style="font-weight:bold">B=1, L=2048</span><span>：约 </span><span style="font-weight:bold">0.25–1 GB</span></li></ul>

<ul><li id="f-doxcnc7zhs27Lm3XMmzDuW1REif"><span style="font-weight:bold">B=1, L=32K</span><span>：约 </span><span style="font-weight:bold">4–16 GB</span></li></ul>

<ul><li id="f-doxcnUUdCy39YumeyMZPKr2Vfct"><span style="font-weight:bold">B=16, L=2048</span><span>：约 </span><span style="font-weight:bold">4–16 GB</span></li></ul>

<ul><li id="f-doxcnJadGPcLUdaiQ7AIkhrIeDb"><span style="font-weight:bold">B=16, L=32K</span><span>：约 </span><span style="font-weight:bold">64–256 GB</span><span>（多并发 + 长上下文是显存炸裂的典型场景）</span></li></ul>

<blockquote id="f-doxcnm8zJXHbBFLsgjbtgZzY5pe"><p id="f-doxcnVLugqGp8gMqTLfveZiiFrf"><span>长上下文 + 高并发时，KV Cache 可以轻易超过模型参数本身的显存占用，这是部署时最容易被忽视的显存杀手。</span></p></blockquote>

<a id="f-doxcnYAdMKGOrOivlFiYYtelgYc"></a>

###### 推理总显存 = 参数 + KV Cache

<p id="f-doxcnMHUgBtd3DPXixHkKq7m5DM"><span style="font-weight:bold">7B 模型典型推理场景：</span></p>

<p id="f-doxcnjTG1Ztqzfvdim86p4DbNne"><span>推理总显存 = 模型参数 + KV Cache，5 个典型场景：</span></p>

<ol start="1"><li id="f-doxcnkMlRhjIX4b8BIGYdHjwWTg"><span style="font-weight:bold">单用户短对话（bf16）</span><span>：14 GB 参数 + 0.25–1 GB KV ≈ </span><span style="font-weight:bold">14.25–15 GB</span><span>，4090 单卡可跑。</span></li></ol>

<ol start="2"><li id="f-doxcnZz3B6aWq4XulUAMvtUuBee"><span style="font-weight:bold">单用户长上下文 32K（bf16）</span><span>：14 GB + 4–16 GB ≈ </span><span style="font-weight:bold">18–30 GB</span><span>，4090 视模型结构而定。</span></li></ol>

<ol start="3"><li id="f-doxcnbtTzWjNxGqylpWLxDBN9pg"><span style="font-weight:bold">量化单用户（INT4）</span><span>：4–5 GB + 0.25–1 GB ≈ </span><span style="font-weight:bold">4.5–6 GB</span><span>，消费级卡轻松。</span></li></ol>

<ol start="4"><li id="f-doxcn1nQ7Av1kbG6ftygczDcDce"><span style="font-weight:bold">多并发 16 路、短对话（bf16）</span><span>：14 GB + 4–16 GB ≈ </span><span style="font-weight:bold">18–30 GB</span><span>，A100/80G。</span></li></ol>

<ol start="5"><li id="f-doxcnQWotiJrQ64QgB6c2YtpMXg"><span style="font-weight:bold">多并发 16 路、长上下文（bf16）</span><span>：14 GB + </span><span style="font-weight:bold">64–256 GB</span><span> ≈ </span><span style="font-weight:bold">78–270 GB</span><span>，必须多卡或限流。</span></li></ol>

<a id="f-doxcn0fPlLXuhZZ7sEpE8O0nFLe"></a>

##### 汇总对比表

<blockquote id="f-doxcnUR65J2wyPbHzqVdB1Q3Mz2"><p id="f-doxcnDfLcRBa6MxWFAoYHwsdeQc"><span>以下均以 </span><span style="font-weight:bold">7B 模型、混合精度（bf16 参数 + fp32 梯度/优化器）</span><span> 为基准。训练激活值按 10~40GB 估算；推理 KV Cache 按 8~32 个 KV 头给范围</span></p></blockquote>

<ul><li id="f-doxcnDeRn3opG8Y8ID2nBhdZBtf"><span style="font-weight:bold">SFT 全参微调</span><span>：</span><span style="font-weight:bold">108–138 GB</span><span>（参数 14 + 梯度 28 + Adam 56 + 激活 10–40）</span></li></ul>

<ul><li id="f-doxcnpxA0fecs8hh6shMPjuFIsf"><span style="font-weight:bold">SFT LoRA</span><span>：</span><span style="font-weight:bold">17–25 GB</span><span>（冻结参数 14 + adapter 梯度&amp;优化器 ≈0.5 + 激活 2.5–10）</span></li></ul>

<ul><li id="f-doxcnNcjDK4raH5T7fm6ragbs5g"><span style="font-weight:bold">RL PPO</span><span>：</span><span style="font-weight:bold">244–304 GB</span><span>（Actor 108–138 + Critic 108–138 + Ref 14 + RM 14）</span></li></ul>

<ul><li id="f-doxcniZ2RDETCsY5KOEnykqUGFP"><span style="font-weight:bold">RL GRPO</span><span>：</span><span style="font-weight:bold">122–152 GB</span><span>（Actor 108–138 + Ref 14，去掉 Critic）</span></li></ul>

<ul><li id="f-doxcni1stmL8QQnqhlhUzP0Sp7e"><span style="font-weight:bold">推理 bf16，单用户</span><span>：</span><span style="font-weight:bold">14.25–15 GB</span><span>（参数 14 + KV 0.25–1）</span></li></ul>

<ul><li id="f-doxcniaQkFWV71ImQsWnxox2VKN"><span style="font-weight:bold">推理 bf16，16 并发 / 2048</span><span>：</span><span style="font-weight:bold">18–30 GB</span><span>（参数 14 + KV 4–16）</span></li></ul>

<ul><li id="f-doxcn6Ve1I5Ee1QOJLe4MFbCEOc"><span style="font-weight:bold">推理 INT4，单用户</span><span>：</span><span style="font-weight:bold">4.5–6 GB</span><span>（参数 4–5 + KV 0.25–1）</span></li></ul>

<a id="f-doxcnTtaMwsa4k4h8nwAjSQuXcf"></a>

##### 附：根据显卡选方案

<p id="f-doxcnGu6282Q7kUh2t7PEEkkyYc"><span>我们在选卡时，应该自己用上面的知识去算一下，给一个表让大家有个直观印象。</span></p>

<ul><li id="f-doxcnisPESu5ka6QiUb60AOdNAe"><span style="font-weight:bold">消费级 4090（24 GB）</span><span>：7B bf16 推理；7B QLoRA / LoRA 微调（控制 batch、seq_len）；30B 级 INT4 量化推理。</span></li></ul>

<ul><li id="f-doxcn6EVBqGznnG69NqRrYy9f2b"><span style="font-weight:bold">专业卡 A100（80 GB）</span><span>：7B LoRA 微调较轻松；7B 全参 SFT 单卡不够；7B GRPO 通常需要 2 张起步。</span></li></ul>

<ul><li id="f-doxcnVwjyRPMfB6JFnMXxfMd9Hb"><span style="font-weight:bold">多卡 A100 × 4（320 GB）</span><span>：7B 全参 SFT / GRPO 较稳；7B PPO 可做，但需要分片、梯度检查点等工程优化。</span></li></ul>

<ul><li id="f-doxcn3NFQKWWU3MsOH06d1iNkpf"><span style="font-weight:bold">多卡 H100 × 8（640 GB）</span><span>：7B PPO 较稳；70B 级全参训练通常还需要 ZeRO、并行切分、梯度检查点或优化器状态压缩。</span></li></ul>

<a id="f-doxcnu8AC8tCkDzAwG6kRkwTJoe"></a>

##### 附：面试 Q&amp;A

<blockquote id="f-doxcnn5YeVV05wAleeaDVyBZpxg"><p id="f-doxcndMCC7DxdQQVyiWnZS6Hrjh"><span>其实面试过程中很多时候对于类似的问题，面试官本身的表述是模糊的。比如6.1.7.1， 问SFT要多大显存？但是SFT里有全量微调，Lora等部分参数微调，算法不一样，结果是不一样的。回答问题的时候，我们自己心里要是清楚的，主动澄清清楚前提和具体细节，然后给面试官举例说明，可以不用说得那么细致，说一下大致的估算即可。如果面试官深入问了，可以再给他讲细节，也就是我们上面笔记介绍的细节部分</span></p></blockquote>

<a id="f-doxcnCRRBuIOAijma3a4Dl3tRbg"></a>

###### Q1：7B 模型做 SFT 大概需要多大显存？

<p id="f-doxcndjgudj03JWglW6HYFuefpd"><span>这个问题要先看是</span><span style="font-weight:bold">全参 SFT</span><span>还是 </span><span style="font-weight:bold">LoRA/QLoRA</span><span>。原则上，训练显存主要由参数、梯度、优化器状态和激活值组成。</span></p>

<p id="f-doxcnASHOWpgFgRb7EzetOmmBJd"><span>如果是全参 SFT，通常会按照业界大模型训练里常见的</span><span style="font-weight:bold">混合精度训练口径</span><span>来估算：模型参数用 bf16/fp16 存储，梯度和 Adam 优化器状态保留 fp32。这个口径的来源其实就是不同精度的字节数：7B 参数用 bf16/fp16 是 2 字节/参数，所以参数本身约 14GB；梯度按 fp32 是 4 字节/参数，所以约 28GB；Adam 还要保存一阶动量和二阶动量两份 fp32 状态，所以是 2 × 28GB，约 56GB。再加上激活值，全参 SFT 通常要 </span><span style="font-weight:bold">100GB 以上</span><span>，单张 80GB A100 一般不够，需要多卡或分片优化。</span></p>

<p id="f-doxcnNQnNTt8hDFO5rLwbWxx2Jb"><span>如果是 LoRA/QLoRA，因为只训练少量 adapter 参数，梯度和优化器状态会小很多。以 7B 为例，LoRA 通常 </span><span style="font-weight:bold">20GB 左右</span><span>可以起步，QLoRA 会更省，消费级 24GB 显卡也有机会跑起来，但要控制 batch size 和 sequence length。</span></p>

<a id="f-doxcnaYpNhMYr9xZqIyrzVszEmd"></a>

###### Q2：7B 模型做强化学习大概需要多大显存？

<p id="f-doxcnZK7x1NjMOvOWllTJ0YDpXe"><span>强化学习阶段要看具体算法，因为不同算法需要同时放进显存的模型数量不一样</span></p>

<p id="f-doxcn9WCKodPbPiyZvWlPhrLswd"><span>如果以 PPO 为例，通常要同时维护 Actor、Critic、Reference Model 和 Reward Model。Actor 和 Critic 都是训练中的完整模型，单个就接近全参微调的开销，所以 7B PPO 往往需要 </span><span style="font-weight:bold">200GB 以上显存</span><span>，通常需要多张 A100/H100，并配合 ZeRO、梯度检查点等工程优化。</span></p>

<p id="f-doxcnWvgtW9EPJJ6oqri7LtjZMb"><span>如果以 GRPO 为例，它去掉了 Critic，用组内相对奖励来估计优势，显存压力会明显下降。7B GRPO 大致可以按 Actor + Reference Model 来估，通常在 </span><span style="font-weight:bold">100GB 以上</span><span>，相比 PPO 大约省一半，但单张 80GB A100 仍然比较紧张。</span></p>

<a id="f-doxcntC5S0Rq29KR5ny5lMvnmFc"></a>

###### Q3：7B 模型部署推理大概需要多大显存？

<p id="f-doxcnFps8KXBiHJ518ZtdtNleVc"><span>部署推理和训练不一样，推理不需要梯度和优化器状态，主要看两个东西：</span><span style="font-weight:bold">模型参数</span><span>和 </span><span style="font-weight:bold">KV Cache</span><span>。</span></p>

<p id="f-doxcnutaOdOFF7h0XzJ28D0jSCg"><span>如果用 bf16/fp16 推理，7B 模型参数大约是 </span><span style="font-weight:bold">14GB</span><span>。KV Cache 的大小差异会比较大，主要和上下文长度、并发请求数、模型的注意力结构以及 KV Cache 本身的存储精度有关。单用户、短上下文场景下，再加少量 KV Cache，整体大约 </span><span style="font-weight:bold">15GB 左右</span><span>，24GB 显卡一般可以跑。</span></p>

<p id="f-doxcn20HLReUw9Ca6DrUMeaXKMe"><span>如果做量化，INT8 大约 7GB，INT4 实际常见大约 4~5GB，再加 KV Cache，可以进一步降低显存。但如果是长上下文或高并发，KV Cache 会快速增长，这时显存瓶颈可能不再是模型参数，而是 KV Cache。</span></p>

<a id="f-doxcnm9B5VM7CkgWMBmZDcj7cih"></a>

###### Q4：你说在CPU机器上跑7B的模型，这个可以跑得动吗？

<blockquote id="f-doxcny18pTdYMfYRN07pvOpRr21"><p id="f-doxcnYuspdT6J2wiLFZtA1LYAdf"></p>
<p id="f-doxcnqCsDUiFWHq2ocrPkVgfx5p"></p></blockquote>

<p id="f-doxcnOVr1YEIYMQLSwtg88Zl5fe"><span>可以跑，但要分两个角度看：</span><span style="font-weight:bold">能不能装下</span><span>，以及</span><span style="font-weight:bold">跑得快不快</span></p>

<p id="f-doxcntYGFNnCVMKF7LBUGezg3Me"><span>首先从能不能装下看，CPU 机器没有 GPU 显存，主要看的是</span><span style="font-weight:bold">内存（RAM）够不够</span><span>。这里我按实际使用场景来回答：我把 7B 模型量化成了 </span><span style="font-weight:bold">INT4</span><span>，并且使用 </span><span style="font-weight:bold">llama.cpp</span><span> 做 CPU 推理。</span></p>

<p id="f-doxcnfJdc9J9MGmbyvtAGJrVN3d"><span>推理阶段的内存主要是：</span><span style="font-weight:bold">量化后的模型参数 + KV Cache + llama.cpp 运行时开销</span><span>。7B 模型做 INT4 量化后，模型文件通常大约 </span><span style="font-weight:bold">4~5GB</span><span>。KV Cache 的大小和上下文长度、并发数有关，但本地 CPU 推理一般是单用户、单路对话，也就是并发数基本可以按 </span><span style="font-weight:bold">1</span><span> 来算。如果上下文长度是 2K~4K，7B 模型的 KV Cache 通常大约是 </span><span style="font-weight:bold">0.5~2GB</span><span> 这个量级，具体取决于模型结构和 llama.cpp 的 KV Cache 精度设置。再加上系统和框架开销，整体大概需要 </span><span style="font-weight:bold">8~10GB 内存</span><span>，所以 16GB 内存的普通消费级机器一般可以跑起来，8GB 会比较紧张。</span></p>

<p id="f-doxcn3h0OBRLPp9v2cS4AHw8nEh"><span>其次从速度看，CPU 可以跑，但速度和 GPU 不是一个量级。INT4 量化会减少模型参数读取和计算压力，llama.cpp 又专门针对 CPU 做了优化，比如多线程、矩阵计算优化、GGUF 格式加载等。按普通消费级 CPU 来估算，一次普通长度的回答大概可能在 </span><span style="font-weight:bold">20~30 秒左右</span><span>；另外考虑到我们的任务对实时性要求不高，所以这个时延是完全可以接受的。</span></p>

<a id="f-doxcn9yILOfBqKU3OKpv9gJbdZb"></a>

##### 视频讲解

<p id="f-doxcnGDshuV4OTaKql7ygiPspRh">下面的视频讲解相关基础知识。</p>

<p id="f-doxcnonhbe3fgpI7gCi8E7tL6td"><span><span><a href="https://www.bilibili.com/video/BV1Lb5S6qEuA/?spm_id_from=333.1387.homepage.video_card.click&amp;vd_source=144bec9c3f54e465073138bed788be1b"><span>https://www.bilibili.com/video/BV1Lb5S6qEuA/?spm_id_from=333.1387.homepage.video_card.click&amp;vd_source=144bec9c3f54e465073138bed788be1b</span></a></span></span></p>


<a id="section-0203"></a>
## 跑的有多快

<a id="f-doxcn7grSpn2c0TxJstaVJmaz6b"></a>

<p id="f-doxcnAlUCOsvfrl5RcirXbGqeFc"><span>跑的有多快，相对来说更复杂：取决于你的算力和任务。</span></p>

<p id="f-doxcnezdQ3IVehHU19o42ICkZ1b"><span style="font-weight:bold">核心原则：</span><span>算力越强，并行度越高 -&gt; 越快。</span></p>

<div style="margin-left:25px"><p id="f-doxcnCpIKt4SEHOi7gGLahuSXUb"><span>影响因素：</span></p><p id="f-doxcntwSsaHhH41HgIeXm6NMqMd"><span>├── 硬件算力（ 每秒浮点运算次数，好的显卡，cpu 算力更强，速度也更快）</span></p><p id="f-doxcnsuXSq9mzRAefvTLt00xSmg"><span>├── 内存带宽（数据搬运速度）</span></p><p id="f-doxcn70x3ciS3vBaJLz4yZxfive"><span>├── 并行度（多核/多卡）</span></p><p id="f-doxcnttqfj3J7E3C9G62LommAlg"><span>└── 软件优化（推理框架）</span></p><p id="f-doxcnBtiEqMjeaBQzSYiTwz0NJe"><span>└── 任务类型（任务复杂，prompt 和 时间复杂度成o(n^2）关系（从Attention结构上来讲））</span></p><p id="f-doxcn8hGbqMgsvUQd8HEFrH6Nrh"><span>其实这个问题相对来说就更加复杂，在《大模型工程师面试实战- 算法原理，开发实践与系统部署》（清华大学出版社） 书中是有专门讲解这个推理速度相关的问题，以及如何优化。这个和硬件，Infra的岗位相关，是他们优化的工作。所以具体还是很复杂的，但是作为应用，我们了解到这里就可以啦！</span></p></div>


<a id="section-0204"></a>
## 不同模型的对比和选择

<a id="f-doxcnXzgzhmewA200Q5faoSZrGd"></a>

<p id="f-doxcnR0GNGx3FKTCmI9OSJ6ffrf"><span>      有些公司在面试的时候，喜欢问的一个问题是，你的项目用的什么模型，为什么要用这个模型，比如你可以看到笔记面经里的小红书，平安证券，都有类似的问题。 其实使用什么模型这个事情，不光和模型本身有关，也和公司层面（比如公司有自己自研模型，那产品肯定接入自家模型），政治方面因素相关（中国很多产品，政治上也不让用国外模型，国外的模型比如Claude系列，也会限制中国的使用）。</span></p>

<p id="f-doxcnAmoczHLhqBjqiMnW34n9wV"><span>这一章，首先讲解 7.1 讲解市面上所有的主流模型的典型特点。 7.2 结合面试题：你的项目使用什么模型 来讲解 项目模型选择的策略。 7.3 讲解一下最新典型旗舰模型的特点。</span></p>


<a id="section-0205"></a>
## 主流模型的对比

<a id="f-doxcn39IlvjTiGHwnZwn2H4debF"></a>

<p id="f-doxcnqOfnGqwCbsTA6cEtmva4Zd"><span>本章会概括所有主流模型，看完这一章，你能够对市面所有模型有一个概念，印象，不追求多深入，但是你最少能知道每个模型是那个公司，他最核心的特点，优缺点，大概的选型原则。注意模型迭代速度其实非常快，这个章节时效性很强（此章节整理于2026/5/10）。不过</span><span style="font-weight:bold">大体的趋势和特点</span><span>还是相对短期稳定的，比如GPT模型强在生态，Claude模型强在编程，Gemini模型在各大Benchmark屠榜。看完本节，你会了解目前最主流的模型的特点，优缺点，就算不从面试的角度来说，作为谈资也是值得一看的。</span></p>

<a id="f-doxcnf7kdjn4OBcz9LQL2kOUEzf"></a>

##### 通用大模型

<a id="f-doxcnFjwh8ORFWvnRkxSLzLrXef"></a>

###### 闭源阵营

<a id="f-doxcnc1bBIeYQgV8CyFHajSSRph"></a>

###### GPT (OpenAI)

<blockquote id="f-doxcnSiBG9xUuE7xtYsQjTGctuf"><p id="f-doxcnkoQvm17qy3ih2FbBVRg57e"><span style="font-weight:bold">一句话定位：</span><span> AI 开山鼻祖，用户量大，生态好，通用能力最强。</span></p></blockquote>

<p id="f-doxcn2fYcbAUxyb29vhgzEbfnng"><span>- </span><span style="font-weight:bold">当前旗舰模型：</span><span> GPT-5.5 (2026-05-05)</span></p>

<p id="f-doxcnv1Nf5Nusyhdzhr54HgNcsg"><span style="font-weight:bold">模型矩阵</span></p>

<p id="f-doxcnxVL6QH5GTBBGPUvbObZtBA"><span>- </span><span style="font-weight:bold">GPT 主线（GPT-5.5）</span><span>：通用聊天 / 多模态 — 日常全能任务。</span></p>

<p id="f-doxcnFXK3PaaQGHCCx2aD1gLiZ8"><span>- </span><span style="font-weight:bold">O 系列（最新 O 系列推理模型）</span><span>：纯推理线，回答前先"思考" — 数学、逻辑、多步工程。</span></p>

<p id="f-doxcn3njdiWLUhlkQHUuI35GIjg"><span>- </span><span style="font-weight:bold">Image 系列（gpt-image-2）</span><span>：图像生成，取代 DALL·E — 海报、文字渲染、图文。</span></p>

<p id="f-doxcnTxLY1rD981zNbWubt1X91g"><span>- </span><span style="font-weight:bold">语音 / 实时（Realtime API + 语音模型）</span><span>：低延迟语音交互 — 语音助手、电话机器人。</span></p>

<p id="f-doxcnwiP8FXDLJMdJaniE70VXMh"><span>- </span><span style="font-weight:bold">视频系列</span><span>：已无在售产品（Sora 已停服）。</span></p>

<p id="f-doxcn0GA98Z5REke3uB4oD4v5Cc"><span style="font-weight:bold">核心优势</span></p>

<p id="f-doxcnmnIYmJJopwAvq1xqOQkfre"><span>- </span><span style="font-weight:bold">生态最大：</span><span> 数亿用户、最多第三方插件与应用构建在 GPT 上。</span></p>

<p id="f-doxcnetag75Z9q9nlKgTrduIl5g"><span>- </span><span style="font-weight:bold">多模态最齐全：</span><span> 文 / 图 / 语音 / 实时全覆盖（视频暂缺）。</span></p>

<p id="f-doxcnvufcHHHtEY2b04z8huqldb"><span>- </span><span style="font-weight:bold">顶级文字渲染：</span><span> `gpt-image-2` 的文字渲染业内顶级，能正确拼单词、做海报。</span></p>

<p id="f-doxcn2UGtsIdgnHeOI8fXiIbJ3b"><span style="font-weight:bold">劣势与短板</span></p>

<p id="f-doxcnj4fXx4bbG8JuDm8sd8vB3c"><span>- </span><span style="font-weight:bold">不再是单项绝对王者：</span><span> 榜单常被 Gemini 反超，编码上被 Claude 压制。</span></p>

<a id="f-doxcn5Pk6IVn93ecZaFZiysuwvF"></a>

###### Gemini (Google)

<blockquote id="f-doxcnsxVwN58ip7yfS2TYaXn2xe"><p id="f-doxcndyS8UUFbamvp2Kry9q9rlb"><span style="font-weight:bold">一句话定位：</span><span> 榜单领跑者；最大筹码是深度嵌入 Google 全家桶。</span></p></blockquote>

<p id="f-doxcn78WrHLiApFaJnXJGn5JV1g"><span>- </span><span style="font-weight:bold">当前旗舰模型：</span><span> Gemini 3.1 Pro</span></p>

<p id="f-doxcnnMdRQpeg6JSFdxkkO86Hqe"><span style="font-weight:bold">模型矩阵</span></p>

<p id="f-doxcnBnftay9wZ8paAyR7afVmvf"><span>- </span><span style="font-weight:bold">Pro（Gemini 3.1 Pro）</span><span>：旗舰 — 难题、长文档、复杂多模态。</span></p>

<p id="f-doxcneRlb4WqMpWlod5WhK7pLhe"><span>- </span><span style="font-weight:bold">Flash（Gemini 3 Flash）</span><span>：速度款，约 Pro 的 90–95% 能力 — 日常高频任务，更快更便宜。</span></p>

<p id="f-doxcnWNKe1B5xXpgFEXDfmZkFYq"><span>- </span><span style="font-weight:bold">Flash-Lite（Gemini 3.1 Flash-Lite）</span><span>：极致性价比 — 高吞吐 / 大规模批处理。</span></p>

<p id="f-doxcn1sBEOxTfTPBfLDAE2Xp6Xg"><span>- </span><span style="font-weight:bold">Deep Think（Gemini 3.1 Deep Think）</span><span>：深度推理模式（仅 AI Ultra 订阅） — 科研、工程、复杂技术难题。</span></p>

<p id="f-doxcncpEHxgP544XWSyi4o6w7lh"><span style="font-weight:bold">核心优势</span></p>

<p id="f-doxcn0b3bWicEDYefPJLa66Pu6g"><span>- </span><span style="font-weight:bold">多模态强：</span><span> 拍照识物体场景实用度高（如修车工拍零件即得识别结果）。</span></p>

<p id="f-doxcn9LnTigeFum94umeuCABIvT"><span>- </span><span style="font-weight:bold">生态优势</span><span>：集成了Google全家桶，比如Gmail, Chrome（严格说这个不算模型的能力，算应用的能力）</span></p>

<p id="f-doxcnxp7X5Qqq8wx8YKBNf6NxYd"><span>- </span><span style="font-weight:bold">榜单领跑：</span><span> 2025 AIME测试上（测试数学推理），Gemini模型领跑，其次是Claude, 然后是GPT。</span></p>

<a id="f-doxcnTA2sQJqNQrHGg68p5mDYjh"></a>

###### Claude (Anthropic)

<blockquote id="f-doxcn7v03wGFgAB2vUOG6X5IOoe"><p id="f-doxcncpF6F84jJZdOFaMfulMPhg"><span style="font-weight:bold">一句话定位：</span><span> 编码、长文档、Agent 任务的专家；多模态偏弱，但单项做到顶。</span></p></blockquote>

<p id="f-doxcnZIUhl4YwB6pu3HRBsz5idc"><span>- </span><span style="font-weight:bold">当前旗舰模型：</span><span> Claude Opus 4.7 (2026-04-16 发布)</span></p>

<p id="f-doxcnk9gfSFX9jMXy9LT2ua6Thb"><span style="font-weight:bold">模型矩阵</span></p>

<p id="f-doxcnqqgr9VenU4qD0c6Un5RRfd"><span>Anthropic Claude 三档定位：</span></p>

<p id="f-doxcnmHf7xzIJd4Uuy5NaFJAGCb"><span>- </span><span style="font-weight:bold">Opus（Claude Opus 4.7）</span><span>：旗舰，研究实验室级 — 硬骨头、复杂工程、深度分析。</span></p>

<p id="f-doxcn7kiiqAK1OCIbcQCXiu1EBk"><span>- </span><span style="font-weight:bold">Sonnet（Claude Sonnet 4.7）</span><span>：中端，约 Opus 80% 实力 — 日常编码、长文档处理，性价比高。</span></p>

<p id="f-doxcnnMVK833lj3Q1OiPMfKYJEg"><span>- </span><span style="font-weight:bold">Haiku（Claude Haiku 4.7）</span><span>：轻量级，速度快、成本低 — 高并发、实时响应、批处理、简单任务。</span></p>

<p id="f-doxcneREoS4hRTTIdmgMYE0k58c"><span style="font-weight:bold">核心优势</span></p>

<p id="f-doxcndqrlazluO1j1mBbpytDCOg"><span>- </span><span style="font-weight:bold">编码优势：</span><span> LiveCodeBench、SWE 等"真实代码库"基准排名靠前；开发者社区编码首推。</span></p>

<p id="f-doxcnj3GMi5ZnVUAlPDwKoe28sK"><span>- </span><span style="font-weight:bold">长文档分析：</span><span> 合同、论文、整套代码库给出结构化摘要而非零散答案。</span></p>

<p id="f-doxcnTye01aDogQP35CdrDPKAUb"><span>- </span><span style="font-weight:bold">风格客观：</span><span> 风格"最不谄媚"，直接告诉你想法烂在哪，不无脑捧场。</span></p>

<p id="f-doxcnLE1XLVlAgbcbVQ6rRXaoqc"><span style="font-weight:bold">劣势与短板</span></p>

<p id="f-doxcnZIjb0MDSN1aQBtqoZVaU6e"><span>- </span><span style="font-weight:bold">多模态弱：</span><span> 无原生图像生成，纯文本 / 代码专家。</span></p>

<p id="f-doxcnSxRuDjwNy2VtFpaUfo6XUg"><span>- </span><span style="font-weight:bold">生态缺位：</span><span> 没有自家语音 / 视频线产品。</span></p>

<a id="f-doxcnIu7xGo76L6ClPxW7r6xyzc"></a>

###### Grok (SpaceXAI)

<p id="f-doxcnQmCf3JRlMvZyNzMCYC4CRf">下面概括 Grok 的主要特性。</p>

<blockquote id="f-doxcnzijQCZOAb9d7wdzMi1QOze"><p id="f-doxcnoiZ6XcOQUxISqkKioiLMIg"><span style="font-weight:bold">一句话定位：</span><span> 实时 X（Twitter）集成 + 最自然的对话感；尺度大、争议多。</span></p></blockquote>

<p id="f-doxcnf8o12x5ER5bN5esXxPcJgf"><span>- </span><span style="font-weight:bold">当前旗舰模型：</span><span> Grok 4.3 Beta (2026-04-17 发布)</span></p>

<p id="f-doxcnGL2sa3PVzLieRCUaI00wef"><span style="font-weight:bold">模型矩阵</span></p>

<p id="f-doxcnKkaNhl1UvVGdTBkDvCT5Ml"><span>- </span><span style="font-weight:bold">主线（Grok 4.3 Beta）</span><span>：当前旗舰，推理 / 通用 — 综合任务、推理。</span></p>

<p id="f-doxcnIecXkSAPzuwH6P5KaY3bsf"><span>- </span><span style="font-weight:bold">Fast 档（Grok 4.1 Fast）</span><span>：工具调用 / 代理工作流 — Agent、长上下文工具链。</span></p>

<p id="f-doxcnS3CRDJYuGuusH3lYgsG8Xg"><span>- </span><span style="font-weight:bold">图像 / 视频（Grok Imagine + Aurora）</span><span>：图像 + 视频统一管线 — 出图、短视频。</span></p>

<p id="f-doxcnMiiG6qkHp9wPxSmbPfBgDd"><span style="font-weight:bold">核心优势</span></p>

<p id="f-doxcnc9tWuvA2zVOJMcMNNX3HRh"><span>- </span><span style="font-weight:bold">实时 X 集成：</span><span> 拉热门讨论、突发新闻摘要、舆情分析比爬虫式模型快得多。（这个严格来说也是产品的能力，不是模型的能力）</span></p>

<p id="f-doxcnRSsvDRj2lUFiSErjMaWjgh"><span>- </span><span style="font-weight:bold">对话自然：</span><span> 对话风格自然放松，像跟人聊天，半夜 3 点也秒回。</span></p>

<p id="f-doxcnvpp10455vfvLogOvn1i0Sg"><span>- </span><span style="font-weight:bold">言论尺度大：</span><span> 会回答其他模型常拒答的问题。</span></p>

<p id="f-doxcnWmNBgUaCJN6OTW0ahBDh6d"><span style="font-weight:bold">劣势与短板</span></p>

<p id="f-doxcn61rDOoI9U5Zgw6v7qvFtXg"><span>- </span><span style="font-weight:bold">态度主观：</span><span> 严肃分析场景下，"会反驳的模型"反而更受偏好。</span></p>

<p id="f-doxcnTJwb8C6rfGFHIaxYva6T4P"><span>- </span><span style="font-weight:bold">争议多发：</span><span> 多次因系统提示问题、深伪图像、Grok Imagine "Spicy" 模式等卷入争议。</span></p>

<a id="f-doxcn9j0h7Vt51ocANswq55UEjh"></a>

###### 开源阵营

<p id="f-doxcnTX19J2uIFCO6SWJL3SPzyd"><span>开源意味着：完全控制 = 数据不出门 + 无 API 费 + 离线可用（电费你出）。</span></p>

<a id="f-doxcnDHHOHEY7cLrNDNfHwtxdNf"></a>

###### DeepSeek

<blockquote id="f-doxcn9UaL5TOTZoXMDrreZZKWsh"><p id="f-doxcnO9tUWX2oUOyIBv0PVaMGgc"><span style="font-weight:bold">一句话定位：</span><span> 开源 + 价格屠夫 + MoE 高效；前沿 AI 不再需要十亿美元级预算的代表。</span></p></blockquote>

<p id="f-doxcn8bkrrEwvhKvSG69viRrX4c"><span>- </span><span style="font-weight:bold">当前旗舰模型：</span><span> DeepSeek-V4 (2026-04-24 发布预览)</span></p>

<p id="f-doxcnWQH5N1GTgiU8AdJfEirVKg"><span style="font-weight:bold">模型矩阵</span></p>

<p id="f-doxcnNBsgDVCAnJv0Jc9poX2OIc"><span>- </span><span style="font-weight:bold">V 系列 / 通用主线（V4-Pro / V4-Flash）</span><span>：通用聊天 + 思考 / 非思考双模式 — 日常 + 推理一体。</span></p>

<p id="f-doxcnsOENteb06fM9n6vwunpvic"><span>- </span><span style="font-weight:bold">R 系列 / 纯推理（R1）</span><span>：引爆 2025 "Sputnik 时刻"，目前路线已并入 V 系列。</span></p>

<p id="f-doxcnjZWsieuq5rBFCLxRFf08Pf"><span>- </span><span style="font-weight:bold">Coder（DeepSeek-Coder）</span><span>：编码 — 代码补全、生成。</span></p>

<p id="f-doxcnk3ICJwgyuw20EUWimrgIj3"><span>- </span><span style="font-weight:bold">Math / Prover（Math-V2 / Prover）</span><span>：数学与定理证明 — 数学竞赛、形式化数学。</span></p>

<p id="f-doxcnW6FdnS3i4h9xlM0HpbqHfg"><span>- </span><span style="font-weight:bold">视觉（DeepSeek-VL2）</span><span>：图文理解。</span></p>

<p id="f-doxcnopvxqRjJ9h4cc15Pz3dqjc"><span style="font-weight:bold">核心优势</span></p>

<p id="f-doxcn8yZtaUtcdJMaFxu9gltxRh"><span>- </span><span style="font-weight:bold">极致高效：</span><span> 架构 MoE + MLA（自 V2 起），参数量大但每次只激活一小部分，又快又省。</span></p>

<p id="f-doxcn3jpnu2jK2s5YMplbNjdzJe"><span>- </span><span style="font-weight:bold">开源与低价：</span><span> 权重 MIT 开放可本地部署；API 价格远低于美国一线。</span></p>

<p id="f-doxcnyxA1OgaqHxQT9WKO0vdnrc"><span>- </span><span style="font-weight:bold">垂直矩阵齐全：</span><span> 编码 / 数学 / 证明 / 视觉各有专精模型。</span></p>

<a id="f-doxcnNrYEPFliVYKUFmKfStumzg"></a>

###### 其它模型

<p id="f-doxcnSMLkYGDof6wHIK4KPrizDd"><span>剩下的模型，本案例用一个表格，一句话总结其它模型最核心的特点：</span></p>

<p id="f-doxcn8ZhwNuQu3r1xBwFRjKhF4g"><span>- </span><span style="font-weight:bold">Meta（LLaMA 4）</span><span>：最高约 400B 参数 — 开源浪潮起点，2026 上半年有更大版本。</span></p>

<p id="f-doxcn8nOsxvukHmhHBOHHPIk8fg"><span>- </span><span style="font-weight:bold">阿里（Qwen 3.5）</span><span>：双 3090 本地可跑 — 多语言强，本地体验逼近 Claude Sonnet。</span></p>

<p id="f-doxcnknGW9WAiaEByW5t40IOgrh"><span>- </span><span style="font-weight:bold">智谱 AI（GLM-5）</span><span>：203K tokens 上下文 — 开源榜顶尖，许可证商用友好。</span></p>

<p id="f-doxcnF0pLi9nDdvj2EUEHKxVxUb"><span>- </span><span style="font-weight:bold">Moonshot（Kimi K2.5）</span><span>：Perplexity 可用 — 数学 / 推理强，AIME 2025 高分。</span></p>

<p id="f-doxcnWEHrqLeKZi7EE11RH2piuw"><span>- </span><span style="font-weight:bold">Mistral（Mistral 系列）</span><span>：小模型见长 — 以小博大，欧洲语言出色。</span></p>

<a id="f-doxcnwwzNpxked9dDmivpCCL8Sc"></a>

##### 视觉生成模型

<blockquote id="f-doxcnPt2NMzFbfTldi1dYGUfskd"><p id="f-doxcn5JQcGiRxOJBqUi4kgfGwYd">视觉生成与视频生成可根据学习方向进一步研究，本节先介绍基本内容。</p></blockquote>

<p id="f-doxcnkdcyC8EKmvRwePMm1oBhYd"><span>- </span><span style="font-weight:bold">美感极致 → Midjourney</span><span>：艺术质量之王，画面电影感、精致；约 $10/月起。</span></p>

<p id="f-doxcn59jLMw0Szqw5ItAPFJ9kmb"><span>- </span><span style="font-weight:bold">简单易用 → gpt-image-2</span><span>：内嵌 ChatGPT，原生多模态，</span><span style="font-weight:bold">文字渲染业内顶级</span><span>（能正确拼单词、排版海报）。</span></p>

<p id="f-doxcncJp6zgEEYvEosAMg5RYVAb"><span>- </span><span style="font-weight:bold">精准理解 → Flux</span><span>：开源、本地、免费；</span><span style="font-weight:bold">Prompt 语义还原度业内领先</span><span>。</span></p>

<p id="f-doxcn7lJribFIsu4Lp8N9OG3URd"><span>- </span><span style="font-weight:bold">极度可控 → Stable Diffusion 3.5</span><span>：开源本地，配合 LoRA、ControlNet 控制力极强；学习曲线陡，但灵活度无敌。</span></p>

<p id="f-doxcndWFf3UpwtauGLAQcgI7vtX"><span style="font-weight:bold">需要避开的误区</span></p>

<p id="f-doxcnqczNlspraftn2KrmUkR8qb"><span style="font-weight:bold">模型是物理分离的：</span><span> 文本模型和图像模型几乎总是分开的系统。例如，你在 ChatGPT 里画图，实际调用的是 `gpt-image-2`（已取代 DALL·E），而不是 GPT 语言模型本身；Grok 出图也是独立的 Grok Imagine 管线。</span></p>

<a id="f-doxcn5ya8BQ5YvrA7LhaTrUtMbg"></a>

##### 视频生成模型

<blockquote id="f-doxcnWQjK7n1ZNAvGvTrYEuYkue"><p id="f-doxcnY2gkkd7tXhQIPcV7gTZoEh"><span>本身不做视频内容，面试也很少问，这小节看看就行吧，算是科普了。</span></p></blockquote>

<p id="f-doxcncSayI6k0w3o4DoPAWVIyUd"><span>- </span><span style="font-weight:bold">Sora（OpenAI）</span><span>：重大变动——已停服，API 将在 9 月彻底关闭，短期内不可用。</span></p>

<p id="f-doxcnFCNyN7p2cKpAZCfmj9lzDe"><span>- </span><span style="font-weight:bold">Kling 3.0</span><span>：主打速度与便利，支持音视频一次生成，榜单表现已反超 Sora 2 Pro。</span></p>

<p id="f-doxcnAq4iccqsKqZ95iH4bQTNzd"><span>- </span><span style="font-weight:bold">Runway Gen-4.5</span><span>：给创作者极强控制力，提供运动笔刷、镜头一致性、相机引导功能。</span></p>

<p id="f-doxcnuKM5Dx02NCYHKs9TTSZP4f"><span>- </span><span style="font-weight:bold">Seedance 2.0</span><span>：字节跳动出品，当前文生视频榜单领跑者之一。</span></p>

<p id="f-doxcnDGz4Rc1FEk2LSAyTQf4Mkf"><span>- </span><span style="font-weight:bold">Grok Imagine</span><span>：图像与视频统一管线，已上线高质量模式 API。</span></p>

<a id="f-doxcnPQRy3QUZ5sFimEPJjIrjth"></a>

##### 面试问题参考

<p id="f-doxcnaxtb9N4wBbNVX77K0XKTEd"><span style="font-weight:bold">Q：你平时工作和学习中用过哪些模型，分别用来做什么？</span></p>

<blockquote id="f-doxcnwCwlkUQMpXtc7x5D7hv1Mc"><p id="f-doxcngida6O41wFSq1AOar0pNBj"><span>面试官可能问这个问题，考一下你对AI 是否聪明熟练地使用AI工具。这个回答是根据上面不同模型的特点总结的，有点多，主要是提供个思路，根据不同模型的特点来在不同的场景下使用。这样回答体现你对不同模型特点都有理解，也会聪明使用。</span></p></blockquote>

<p id="f-doxcnyV7aZ7qfTGU4cb6S26iGvd"><span>用过挺多的，不同场景我会选不同的模型，因为各家模型的优势方向差别还是比较明显的。</span></p>

<p id="f-doxcn4XmtOrjkD7cRJfJdi3sNJc"><span style="font-weight:bold">编程和写代码这块，我基本首选 Claude。</span><span>它在 LiveCodeBench 这类真实代码库评测上一直排名靠前，开发者社区里口碑也最好。日常写代码、调 bug、看别人的代码逻辑，本案例用 Sonnet，性价比高，够用；遇到比较复杂的架构设计或者系统级的问题，我会升级到 Opus，它在推理深度上确实更强。另外 Claude 有一个特点我很喜欢，它不太会无脑夸你，说法比较直接，方案有问题它会直说，做技术决策的时候反而更可信。</span></p>

<p id="f-doxcnNGPmT1ephC328JVGA7JG5b"><span style="font-weight:bold">GPT 我主要用在两个场景</span><span>。一个是日常通用问答，因为它生态最成熟，各种插件和工具支持都齐全，随手查个东西、聊个想法很顺手；另一个是图像生成，</span><span><span><span>gpt-image-2</span></span></span><span> 的文字渲染可以认为是目前最好的，做海报、图文内容、有文字的封面，它比其他模型准确多了</span></p>

<p id="f-doxcnEk4ou2DTCPqdy7oazSY3wg"><span style="font-weight:bold">Gemini 我主要用来处理长文档和多模态任务</span><span>。它和 Google Docs、Drive 的整合很自然，工作流上比较顺。日常高频的任务我一般用 Gemini Flash，它的能力大概是 Pro 的 90–95%，但速度更快、价格更低，够用的情况下没必要上 Pro；遇到真正复杂的多模态分析、长文档深度阅读这类场景，才切换到 Pro。</span></p>

<p id="f-doxcnDNxUW6VynbLNckMo111iWg"><span style="font-weight:bold">DeepSeek 本案例用在对成本比较敏感或者需要本地部署的场景</span><span>。它的 API 价格比美国一线模型便宜很多，而且开源可以本地跑，数据不出门，对于一些不想上传到外部服务器的内容，本地跑 DeepSeek 很合适。数学推理这块它也很强，做一些计算密集型的任务可以考虑它。</span></p>

<p id="f-doxcnvISzIyWDBegdlDIjSmzD3g"><span style="font-weight:bold">Grok 我偶尔会用来做实时舆情和热点信息的查询</span><span>，因为它直接整合了 X（Twitter）的数据，对突发事件、技术圈动态的感知比其他模型快很多，这块是它的独特优势。</span></p>

<p id="f-doxcnx2Ydfy8iHtJFixva9mEQIh"><span>总体来说，我的习惯是：</span><span style="font-weight:bold">编程找 Claude，通用和出图找 GPT，长文档找 Gemini，省钱或者本地部署找 DeepSeek，追热点找 Grok</span><span>。不同场景用最合适的工具，而不是只盯着一个模型用到底。</span></p>

<a id="f-doxcnaTEDwEMHEYkzB7Tmj5mEUd"></a>

##### 参考资料

<p id="f-doxcnw4d8GFtaSXzyiM08pb6Dnf">参考资料中部分模型信息存在版本时效差异，例如 OpenAI 图像模型的 Image 与 DALL·E，以及 Claude、GPT 的版本变化。阅读时需要核对具体版本。</p>

<p id="f-doxcn8G8kKaRBITcrneX0kTszpB"><span><span><a href="https://www.bilibili.com/video/BV1hWo1BXEko/?spm_id_from=333.337.search-card.all.click&amp;vd_source=144bec9c3f54e465073138bed788be1b"><span>https://www.bilibili.com/video/BV1hWo1BXEko/?spm_id_from=333.337.search-card.all.click&amp;vd_source=144bec9c3f54e465073138bed788be1b</span></a></span></span></p>

<a id="f-doxcnOFDdc3KFSQwZhkXm2lGNBc"></a>

##### 视频讲解

<p id="f-doxcnJVjsm4hqo63le2lxiapRXS"><span>直接看这个7.1可能有点枯燥和流水账，这个视频把7.1 小节的内容讲了一遍，结合视频看更轻松</span></p>

<p id="f-doxcnhZB38irmyunlCybPUfVgHd"><span><span><a href="https://www.bilibili.com/video/BV1oP5x6iEcG/?spm_id_from=333.1387.homepage.video_card.click&amp;vd_source=144bec9c3f54e465073138bed788be1b"><span>https://www.bilibili.com/video/BV1oP5x6iEcG/?spm_id_from=333.1387.homepage.video_card.click&amp;vd_source=144bec9c3f54e465073138bed788be1b</span></a></span></span></p>


<a id="section-0206"></a>
## 模型的选型

<a id="f-doxcnYko85EDnhmPBvF8uQJYvPb"></a>

<blockquote id="f-doxcnlLNMqWZoqEn1conJtH2XEc"><p id="f-doxcnQBBEx94uhnnaxU8xXS6bwc"><span>介绍一个考虑模型选型的模板，这块有一些产品思维，参考文档也是从一个产品经理的论坛文章上看的。</span></p></blockquote>

<a id="f-doxcnpvhqSKHpNeL7MxwjuDI2ue"></a>

##### 模型选择策略理论

<p id="f-doxcnhGUmb9xEagmZAANuBYNTEh"><span>最佳的选型策略应当是从业务需求反推技术选择，构建</span><span style="font-weight:bold"> 场景 - 能力 - 模型</span><span> 的三步决策框架。</span></p>

<p id="f-doxcnjYJIt5wkLy726Qdc6Y3n0b"><span style="font-weight:bold">第一步：定义场景 (精准描述问题与流程)</span></p>

<p id="f-doxcnwgTdTAufotER3UAofyDCFM"><span>选型的起点必须是具体的业务场景，切忌模糊的大词，建议采用“</span><span style="font-weight:bold">黄金圈法则</span><span>”进行拆解：</span></p>

<p id="f-doxcnNFAQiWBL6nrdz3wcxuyHVg"><span>- </span><span style="font-weight:bold">Why (价值目标) :</span><span> 该场景要解决什么核心痛点？（例如：降低20%的客服人工介入率）</span></p>

<p id="f-doxcnM0Cj1ndDtaTTSz2LXVgIph"><span>- </span><span style="font-weight:bold">What (任务定义) :</span><span> 具体要完成什么任务？（例如：自动回复用户的订单状态查询）</span></p>

<p id="f-doxcnai8ubFoVzTeKsjg8zoky5c"><span>- </span><span style="font-weight:bold">How (工作流程) :</span><span> 任务的执行流程与限制是什么？需要多快的响应速度？是否有数据不出境的硬性要求？</span></p>

<p id="f-doxcnzP8GUa2e1SwILf7cbZMKGb"><span style="font-weight:bold">第二步：拆解能力 (分析核心能力需求)</span></p>

<p id="f-doxcn7uRfQyF2EeTp3uN8urvvKd"><span>将明确好的业务场景，转化为对大模型具体的可量化能力。</span></p>

<p id="f-doxcnp1gDZRnc0Xx5525wawdjCe"><span>- </span><span style="font-weight:bold">分类拆解:</span><span> 明确场景最看重的是什么能力。是信息抽取、内容生成、复杂逻辑推理，还是外部工具调用（API集成）能力？</span></p>

<p id="f-doxcnEYAv6xwQFx07mgdcJi1DTf"><span>- </span><span style="font-weight:bold">划分优先级:</span><span> 将需求划分为“必要能力”与“加分能力”，并为各项核心能力分配权重。例如：在智能客服中，工具调用准确率可能是必要能力（占50%权重），而多语言翻译可能是加分能力（占10%权重）。</span></p>

<p id="f-doxcnzP6F5DNJFM7qeWHDJ1x4ph"><span style="font-weight:bold">第三步：匹配模型 (寻找场景最优解)</span></p>

<p id="f-doxcnAjBqNFXbmLbgftJX95Ppvc"><span>根据拆解出的能力权重，对候选模型进行综合评估：</span></p>

<p id="f-doxcnwKyPBY9KvWPkhuhcgdrCdc"><span>- </span><span style="font-weight:bold">能力适配度:</span><span> 拒绝“榜单依赖症”（如通用的MMLU分数）。必须从真实业务中抽样构建场景化测试集（如100个真实案例）进行盲测打分。</span></p>

<p id="f-doxcnX3QgCDvDLkBQkwbcKxQx0d"><span>- </span><span style="font-weight:bold">成本效益比 (TCO):</span><span> 不能只对比单次Token调用价格，必须将业务高峰期的调用量波动、本地化私有部署硬件成本、配套人工审核维护成本计算在内。</span></p>

<p id="f-doxcnvNCulV75VWjZzxeTdHDbIg"><span>- </span><span style="font-weight:bold">风险可控性:</span><span> 评估数据安全隐私、合规要求以及模型供应商的服务稳定性。在金融/医疗等敏感领域，合规和数据不出境往往具备一票否决权。</span></p>

<a id="f-doxcn1mSDPOaTUTf0CiGX8KFAzg"></a>

##### 实战演示

<blockquote id="f-doxcnRppou4kybGHckbrgL6ovWh"><p id="f-doxcnBMngNfKm7Suz0dDemogPKf">下面以智能预约系统说明模型选型原则的应用。</p></blockquote>

<p id="f-doxcnkYVavLqRSVkhFlFRRHwJcd"><span>以一个真实的 Agent 项目为例，演示如何将"场景 - 能力 - 模型"框架落地。该项目背景是：传统按摩房依赖人工前台接听电话，完成预约分配、咨询解答、客户回访等工作，效率低、成本高。因此设计了一套多 Agent 对话系统来替代人工前台。</span></p>

<p id="f-doxcnujbnqxnpV7Ik5bl5rMEDQc"><span style="font-weight:bold">第一步：定义场景</span></p>

<p id="f-doxcn5cUiymEDdDZSh9MgCskKGf"><span>按摩房 Agent 项目的 Why / What / How：</span></p>

<p id="f-doxcnNl10pcdfzPXAmXorsiKTgg"><span>- </span><span style="font-weight:bold">Why（价值目标）</span><span>：解放人工前台，实现 7×24 小时自动预约与咨询，降低人力成本。</span></p>

<p id="f-doxcn5OQmGbu1jO9ElbbwBjkqQc"><span>- </span><span style="font-weight:bold">What（任务定义）</span><span>：用户通过对话完成技师预约、项目咨询、个性化回访。</span></p>

<p id="f-doxcnL9UMjU5jna9GyX2xrY7tyd"><span>- </span><span style="font-weight:bold">How（工作流程）</span><span>：用户发起对话 → 意图分类 → 分流至预约 / 咨询机器人 → 数据库查询 / RAG 检索 → 确认预约并推送天气提醒。</span></p>

<p id="f-doxcnEU5DquRf8tkl4GWV3ZiIyd"><span>系统最终拆解为 4 个 Agent：</span><span style="font-weight:bold">分类机器人</span><span>（意图路由）、</span><span style="font-weight:bold">预约机器人</span><span>（多轮收集需求 + 数据库查询）、</span><span style="font-weight:bold">咨询机器人</span><span>（从私有文档 RAG 检索回答）、</span><span style="font-weight:bold">行为分析 Agent</span><span>（分析历史预约、生成个性化回访）。</span></p>

<p id="f-doxcn3OUCBoCsoq0uZGF4TySzDE"><span style="font-weight:bold">第二步：拆解能力</span></p>

<p id="f-doxcnEjL7HRNqVO23BUHieu600b"><span>项目所需 LLM 能力及权重：</span></p>

<p id="f-doxcnD1Dakh3z3Pj525zJSpJT1d"><span>- </span><span style="font-weight:bold">意图分类准确性（必要，35%）</span><span>：分类错误会导致整个流程跑偏，是系统的咽喉。</span></p>

<p id="f-doxcnml8K990cFxxFLgtvveZUod"><span>- </span><span style="font-weight:bold">工具调用 / Function Call（必要，30%）</span><span>：预约机器人需要精准调用数据库查询技师空档。</span></p>

<p id="f-doxcn3oifNBzeQ0DFTyRM4ncx2b"><span>- </span><span style="font-weight:bold">RAG 检索整合（必要，20%）</span><span>：咨询机器人须从私有文档中准确检索按摩房信息。</span></p>

<p id="f-doxcn9fgaj5BWRDG379dfTSMVce"><span>- </span><span style="font-weight:bold">多轮对话上下文理解（必要，10%）</span><span>：预约流程需多轮收集用户偏好，不能"失忆"。</span></p>

<p id="f-doxcneqkxyPFRDgHUgoPHw6Kkgb"><span>- </span><span style="font-weight:bold">MCP 外部服务集成（加分，5%）</span><span>：预约成功后调用天气 MCP Server，生成个性化提醒。</span></p>

<p id="f-doxcndNd9dWHaiB7Tlma77ohTdc"><span style="font-weight:bold">第三步：匹配模型</span></p>

<p id="f-doxcnmscOGpzoPdlG1Ak5sq3SVd"><span>系统采用</span><span style="font-weight:bold">分层选型策略</span><span>，不同 Agent 所需能力不同，不必全部使用同一个高价模型：</span></p>

<p id="f-doxcnXHLB5kbL3htkKXaUznGUVc"><span>4 个 Agent 的推荐模型与理由：</span></p>

<p id="f-doxcnT2v5lNfaKa6SBPZwdoxwkc"><span>- </span><span style="font-weight:bold">分类机器人 → GPT-4o-mini / Qwen-Turbo</span><span>：任务简单（4 分类），轻量模型成本低、响应快。</span></p>

<p id="f-doxcnl2d5AnpYktorjUGKGJyuiD"><span>- </span><span style="font-weight:bold">预约机器人 → Claude Sonnet 4 / GPT-4o</span><span>：工具调用稳定性高，多轮上下文理解强，是系统核心。</span></p>

<p id="f-doxcnKp9H5vg7DmXKBGCEV8SpMb"><span>- </span><span style="font-weight:bold">咨询机器人 → Claude Sonnet 4 / DeepSeek-V3</span><span>：RAG 整合流畅，文档理解能力强；DeepSeek 成本更低。</span></p>

<p id="f-doxcn8ZLudyR8NG9NXra3cjEPMb"><span>- </span><span style="font-weight:bold">行为分析 Agent → DeepSeek-R1 / GPT-4o Thinking</span><span>：需对历史数据做多步推理，生成个性化回访文案。</span></p>

<a id="f-doxcnDTVXHBGN1I8WAVMy85f4eg"></a>

##### 面试回答示范

<p id="f-doxcnI1gUgy4juTuukDdPd8FpRf"><span style="font-weight:bold">Q：你的项目是如何进行模型选型的？</span></p>

<blockquote id="f-doxcnJGt3K5r9qieZRiFXzj0i5f"><p id="f-doxcng9LjzsGQNgOEg8dYx5JObV"><span>本案例用这个思路总结答案：</span></p>
<p id="f-doxcnnaazvDTgiNOQf3ksOMMH7e"><span>1. 通过需求确定基本模型：使用上面的</span><span style="font-weight:bold">三段理论：业务场景 - 功能 - 模型 来回答</span><span>。确认大致模型。</span></p>
<p id="f-doxcn5OzbA7WpDqorSqIxsPquHh"><span>2. 从大致意向模型里，做对比（查测评表，资料，做实验等方式）确定最终模型。</span></p>
<p id="f-doxcnHVAxvHMUy5ISV4IfZ9WYsg"><span>第二点更好一点的方式是通过实验驱动，对比不同模型。但是如果这么说，面试官可能会问你真的怎么做的？怎么测评的，数据集多少，万一你答不上来，可以就从查测评表，查资料来做对比确定而不是做实验确定。</span></p></blockquote>

<p id="f-doxcnozaGZg8A3IZmWEymktr6qh"><span>第一段（按需求确定大致模型）：</span></p>

<p id="f-doxcnuVHkhsddPW7XKbvms1QSLc"><span>这个系统有四个 Agent——分类机器人、预约机器人、咨询机器人和行为分析 Agent，每个 Agent 的任务差别很大，所以我没有用一个模型一刀切，而是</span><span style="font-weight:bold">先按"业务场景 - 功能能力 - 模型"分别拆</span><span>。</span><span style="font-weight:bold">分类机器人</span><span>只是判断用户意图属于哪一类，任务简单，所以</span><span style="font-weight:bold">倾向用轻量模型，成本低、响应快</span><span>；</span><span style="font-weight:bold">预约机器人是系统核心</span><span>，要多轮确认时间和技师偏好、还要调数据库查空档，对工具调用稳定性和多轮上下文要求最高，所以要用主力模型；</span><span style="font-weight:bold">咨询机器人</span><span>主要做 RAG，从私有文档里检索回答，重点是</span><span style="font-weight:bold">文档理解能力</span><span>；</span><span style="font-weight:bold">行为分析 Agent </span><span>在后台异步跑，需要对历史数据做多步推理，所以倾向</span><span style="font-weight:bold">推理型模型</span><span>。这样一轮拆下来，每个 Agent 大致用哪一类模型就基本定了。</span></p>

<p id="f-doxcnRqPpvk7mOxmiGppMJFfGVQ"><span>第二段（在候选模型里对比，最终确定）：</span></p>

<p id="f-doxcngldldoJVizCfmU54irMfqA"><span style="font-weight:bold">确定大致方向之后，我会在每一类的候选模型里再做一次对比来定型，主要是查各模型的公开测评和资料</span><span>，结合我们的场景需求来选，而不是盲选最贵的。以分类机器人为例，它属于轻量模型这一档，候选的有 GPT-4o-mini 和 Qwen-Turbo。因为我们的用户提问基本都是中文、而且偏口语化，所以我重点看的是"中文意图分类的准确率"这个维度，同时也参考了调用成本和响应速度。综合下来</span><span style="font-weight:bold"> Qwen-Turbo 在中文短文本分类上表现够用、成本更低、响应也快</span><span>，</span><span style="font-weight:bold">所以分类机器人最终选了 Qwen-Turbo</span><span>；其它几个 Agent 也是按同样的思路，结合它们各自最看重的能力维度去比对确定的。</span></p>


<a id="section-0207"></a>
## 热门模型特点介绍

<a id="f-doxcnKzZ9NHElctToHJETtMzYQc"></a>

<p id="f-doxcnFxOGcSOPju3sanUCqLM57b">了解新模型时，可以先阅读其核心改进、特性与技术资料，再根据使用场景深入研究。</p>

<a id="f-doxcno1ggcSpE6gPmxP8g2YIfmc"></a>

##### DeepSeek V4 新特性和创新

<p id="f-doxcnobcvm29Gjm1sOu7eNFpYeb"><span style="font-weight:bold">新特性：</span></p>

<p id="f-doxcn58fUvAYy2pP1CIdi6vx4Cf"><span>1. 百万上下文成为默认能力。全系标配 </span><span style="font-weight:bold">1M token 上下文。</span><span>推理计算量降至 V3 的约 27%，KV Cache 仅为 </span><span style="font-weight:bold">10%，能直接处理整本书、完整代码仓库、长文档分析。</span></p>

<p id="f-doxcnCM56ee5whTSDBe0eBUhQBh"><span>2. 双模型体系覆盖不同场景。V4-Pro 提供万亿参数级高性能推理能力，而 V4-Flash 在维持相同架构的前提下降低激活参数和成本，实现高吞吐和低延迟的生产部署。</span></p>

<p id="f-doxcn3jZNJrCVb55EC6fF4rSYxe"><span>3. 推理效率和成本显著优化。通过压缩注意力和系统级优化，KV Cache 内存占用降低约 90%，整体推理吞吐明显提升，同时 API 成本显著低于同级模型。</span></p>

<p id="f-doxcnVYGcIdeFLuGUWfrBZAbqfc"><span>4. 原生增强 Agent 执行能力。模型内置工具调用、分步推理和多模式思考能力，在复杂任务拆解和自动化工作流中具备更高稳定性和执行效率。</span></p>

<p id="f-doxcnjr2bi9MZ6Tkr1nvQVM83Ye"><span>5. 开源和工业级部署能力并存。模型以 MIT 协议开放完整权重，支持多种硬件平台部署，使其不仅是研究模型，同时具备企业级落地能力</span></p>

<p id="f-doxcnS9jXyimqhn4SYdpkVGZ2Ae"><span style="font-weight:bold">创新</span></p>

<p id="f-doxcnocR2gkTks6CPeysvtDfBnd"><span>1. 混合注意力机制重构长上下文计算。通过 CSA（压缩稀疏注意力）和 HCA（重度压缩注意力）的协同设计，将原本 O(n²) 的全量注意力转化为压缩与稀疏选择结合的计算模式，从根本上降低长序列计算成本 。</span></p>

<p id="f-doxcnxe4JrcPmqIr7XuPUOqPjBc"><span>2. 稀疏索引与重要Token选择机制。模型引入索引器和 Top-k 筛选策略，只对最相关的上下文进行注意力计算，从“全量扫描”转变为“关键检索式推理” 。</span></p>

<p id="f-doxcn56R1HclCcB5qRrgz72hlnd"><span>3. mHC 超连接替代传统残差结构。通过引入流形约束的超连接机制改善深层网络中的信息传播稳定性，使万亿级模型训练更加可控和高效。</span></p>

<p id="f-doxcnVex9OShnmFDaa6iCnZcVHc"><span>4. Muon 优化器提升训练稳定性。采用新型优化算法替代传统 AdamW，在大规模训练中实现更快收敛速度和更稳定的参数更新过程 。</span></p>

<p id="f-doxcnCsUrWdt3VpcmjZRp0Emnun"><span>5. 混合精度计算进一步压缩资源消耗。结合 FP4 与 FP8 的混合精度设计，在保持模型性能的前提下降低显存占用并提升计算吞吐。</span></p>

<p id="f-doxcn7eVTnaP9n5ugLLUipm5vch"><span>6. Batch Invariance 提升工程可控性。通过保证相同输入在不同 batch 组织下输出一致，使模型在训练、推理和在线服务中具备更强的可复现性和稳定性。</span></p>

<a id="f-doxcnrG6QwVO1qtaF9ZQjNbJJOc"></a>

##### Jev ：面向软件的快速概率决策模型

<p id="f-doxcnkNKShUxQbMhv9D0rUPV8td"><span>Jev是2026年9月份快速火起来的一个模型，如我们一直说的，大模型圈，爆火的内容你不能不会。面试几乎一定会问到。所以2026年9月份，面试前，建议学习一下Jev。 大家也不用担心学不过来，最开始我们只要先理解最基本的内容，最简单的面试问题就够了。如果他持续爆火，我们再深入学习。</span></p>

<p id="f-doxcnIMlDrEaDA8fR7iJt47yaWJ">本节介绍 Jev 的定义、特点、设计理念、使用方式、技术架构与相关问题。</p>

<a id="f-doxcnz9Rve523Dbo4ANihGQEbsc"></a>

###### 概念：Jev 是什么

<a id="f-doxcnjZJ5A5o0E9GybUEed5RM2c"></a>

###### 和 Opus、GPT 最大的不同

<p id="f-doxcnnZng8P0cBLqYMCPBxvQdkX"><span style="font-weight:bold">Jev 是 TypeSafe AI 推出的一个决策模型。</span><span> 和我们熟悉的 Opus、GPT 系列相比，它不是为了写出一段回答，而是为了快速回答软件中的具体选择题。</span></p>

<p id="f-doxcnWqHSyLSVlNqgu4gFAAeCqf"><span>Opus、GPT 这类模型的典型文本生成方式是</span><span style="font-weight:bold">自回归生成</span><span>：根据输入和已经生成的内容，预测下一个 token（next-token prediction），再把新 token 接到上下文后面，继续预测，直到回答结束。哪怕要求只返回一个分类标签，典型生成接口也会把它作为 token 序列输出。</span></p>

<p id="f-doxcnJQzdRXWtRh7LBfYOK2p2Ig"><span>Jev 则要求你先定义问题和允许的结果。例如，给它一封邮件，再给出“账务、售后、技术支持”三个选项，它返回类别及对应概率，而不是逐 token 写一段解释。这种方式的定位是</span><span style="font-weight:bold">并行采样的、有类型约束的概率决策</span><span>；底层架构尚未完整披露。</span></p>

<p id="f-doxcniofbToO8aDD0B6lnaHQ2ah"><span>简单说：</span><span style="font-weight:bold">通用 LLM 擅长“组织和生成答案”，Jev 专注于“在定义好的结果空间里做判断”。</span><span> LLM 也能分类、返回结构化结果，区别不在于谁能输出 JSON，而在于模型针对什么任务优化。</span></p>

<div id="f-doxcn8QWe8uhgFqHIQUKAtuEwRg"><img alt="" decoding="async" height="630" loading="lazy" src="/images/agent-learning/51fc627f4a2065673d46b6e4.png" width="1120"/></div>

<p id="f-doxcnyfVBZgK1l8LV1SrIwX0wIc"><span style="font-style:italic">动图 1：观察逐 token 输出与返回选项概率的差异。动画是接口行为示意，不表示实测速度或已知的内部计算步骤。</span></p>

<a id="f-doxcn1EDJ1FOsETu5AgCwtAQy1b"></a>

###### 为什么能火：把高频小决策做得快、做得便宜

<p id="f-doxcnD0lJnDGmyif4CDpgH4hcPe"><span>我们常用 Opus、GPT 做分析、写代码，也会通过 Claude Code 这样的工具完成多步骤任务。但如果只是给上千封邮件分类，关心的往往不是能否写出精彩解释，而是</span><span style="font-weight:bold">多久处理完、花多少钱、标签是否可靠</span><span>。这里 Claude Code 是应用，Opus、GPT 是模型，不能把两者当作同一层级的基准对象。</span></p>

<p id="f-doxcnB2fLp9FGSj3g9q2o6xXFEh"><span>一次千封邮件分类演示中，处理 </span><span style="font-weight:bold">1,000 封邮件</span><span>时，Jev 初版流程耗时 </span><span style="font-weight:bold">70 秒、费用 $0.09</span><span>，对照模型 Luna 约需 </span><span style="font-weight:bold">5 分钟（300 秒）、$0.62</span><span>。按这组数字计算，Jev 的处理速度约为 Luna 的 </span><span style="font-weight:bold">4.3 倍</span><span>，</span><span style="font-weight:bold">耗时减少约 76.7%，调用成本降低约 85.5%</span><span>。</span></p>

<p id="f-doxcnRPmdSzPagMrn0nnWVGi7Jd"><span>调整后端并行和请求组织后，Jev 又做到 </span><span style="font-weight:bold">6 秒、仍为 $0.09</span><span>：相较于上述 Luna 流程，批处理速度约为其 </span><span style="font-weight:bold">50 倍，耗时减少约 98%，调用成本仍降低约 85.5%</span><span>。其中，50 倍包含了工程优化的贡献，并非同等配置下的模型速度对比；对照模型可核验的完整 ID 尚不明确，不能直接把数字改写成“比 Opus／GPT 快多少倍”。</span></p>

<p id="f-doxcnZ6oLg1CaHwzbVVVElvZLrb"><span>其他演示包括</span><span style="font-weight:bold">实时玩 Doom、让 50 个小镇居民在约 0.6 秒内完成一轮决策</span><span>。这些演示吸引人的地方，是把原本需要等待的模型调用，变成游戏或业务流程中可以频繁发生的一步。70–500 ms 的响应范围属于待按任务和配置验证的性能指标，并非任意负载下的延迟保证；加上创始人发布帖接近 3,000 万次浏览的热度，“快速、低成本决策”就成了它传播的核心卖点。</span></p>

<p id="f-doxcnC174pgJASIkJNoyzDVYIsc"><span style="font-weight:bold">因此，它的看点不是全面胜过 Opus、GPT，而是在分类、路由等窄任务上提供另一种速度与成本选择。</span><span> 上述演示缺少完整的同条件准确率测试，不能由“更快”推出“更聪明”或“不会判断错”。</span></p>

<a id="f-doxcnupopIdDCRYli2yNUbclUBg"></a>

###### 能做什么，不能做什么？

<p id="f-doxcncHurXphe5TF8aBf2rvpQMh"><span style="font-weight:bold">通用大模型像在写申论题，Jev 则是在回答事先设计好的题目。</span><span> 它能回答的主要是三种：</span><span style="font-weight:bold">是非题、单选题、打分题</span><span>，对应“是不是”“哪一个”“到什么程度”。</span></p>

<p id="f-doxcnsBOjiNpm1fOkP12Myg3vDh"><span style="font-weight:bold">第一种，是非题：问“是不是”。</span><span> 给它一个命题，它返回 0 到 1 之间的概率，越接近 1 越倾向“是”，越接近 0 越倾向“否”。例如，问“这张发票是不是诈骗？”，它可能返回 90%。程序再根据这个概率和业务规则决定是否转人工检查。概率是模型的判断，不是事实保证；阈值也需要按业务验证，不能直接照搬示例。</span></p>

<p id="f-doxcn9zG0niTaqSFWiCFJxV3Izg"><span style="font-weight:bold">第二种，单选题：问“哪一个”。</span><span> 先列出候选选项，Jev 从中选出最合适的一项，同时返回各选项的概率。选项及说明由你定义，选项上限为 255 项，实际以接入版本接口为准。例如，自动整理信箱时，先定义文件夹及其收录规则，再让 Jev 判断每封邮件应归入哪个文件夹。</span></p>

<p id="f-doxcnwIJLDUfN3B5MeTDyt5jlDg"><span style="font-weight:bold">第三种，打分题：问“到什么程度”。</span><span> 有些事情不适合只分“是”或“否”，需要先定一把尺，写清楚从低到高每一级的含义；评分最多可分 11 级，实际以接入版本接口为准。例如筛选潜在客户：0 分是没有预算的学生，1 分是小团队，2 分是有明确需求和时程的公司，3 分是预算充足的大企业。某条大企业咨询可能得到 2.9 分，程序就可以按预设规则，将高于 2.5 分的线索优先通知业务主管。</span><span style="font-weight:bold">这里的 2.9 是程度分数，不是概率。</span></p>

<div id="f-doxcnuTdi1EkDllDrrhAsF26K7A"><img alt="" decoding="async" height="225" loading="lazy" src="/images/agent-learning/44ba3590e9adfe873455e40d.png" width="360"/></div>

<p id="f-doxcnw4pJZNC9YDQahFYTFIoymd"><span style="font-weight:bold">对于这类高频、简单、答案范围明确的判断，动用昂贵的通用大模型，往往有些“杀鸡用牛刀”。</span><span> Jev 的价值是把这些小决策做得更快、更便宜：上述千封邮件分类演示中，耗时从对照模型的 5 分钟缩短到 70 秒，成本从 62 美分降到 9 美分。在一个技能选择案例中，加入 Jev 预筛选后，错误率从 17% 降到 7.3%。这说明专门化方案在特定任务上也可能更准，但该案例缺少完整评测条件，不能据此说 Jev 在三类任务上的准确率都“秒杀”大模型。</span></p>

<p id="f-doxcnWcfVUrgGCVqYo4V3ckuseg"><span style="font-weight:bold">Jev 的出发点是：软件不总需要一个会长篇思考的助手，很多时候只需要一个快速、可靠的判断。</span><span> 因此，它不以更长的思考链和更强的通用推理为主要目标，而是面向高频决策，优化延迟、成本和概率的可靠性，返回程序能直接使用的结果。可以用 System 1（快速、直觉式判断）对比 System 2（审慎推理）来理解这一定位；这是设计比喻，不是模型架构的划分。</span></p>

<p id="f-doxcn0vp0GrLi6ODWkpNnemTdog"><span>这种设计也带来明确的取舍：</span><span style="font-weight:bold">把更多流程设计留给开发者，把运行时的局部判断交给模型。</span><span> 开发者定义问题、候选结果和流转规则，Jev 根据当前输入判断，程序据此选择分支。与大模型驱动的 Agent 在运行时规划、调整过程相比，这种方式需要更多前期编排，但在流程相对确定的任务中，有望换来更低的运行成本和更强的可控性。</span></p>

<p id="f-doxcn9eBtp5MgkJHmnHP5NIXeZe"><span style="font-weight:bold">但快判断不等于强推理，Jev 也无法替代 LLM 的开放式生成能力。</span><span> 需要多步推理、复杂分析、方案构思，以及写文章、总结内容、生成代码时，仍应交给通用大模型。快棋场景就能说明这点：Jev 即使凭响应快让对手超时，也不代表棋力更强；客服场景也一样，它能判断工单该转给谁，但最终安抚客户的回复仍需大模型来写。两者应当分工：</span><span style="font-weight:bold">Jev 负责快速判断，大模型负责推理和生成，程序负责执行。</span></p>

<a id="f-doxcnLU5qBlHcu8XVccn8VxaJ3c"></a>

###### 技术实现：已知边界与 RLCD

<a id="f-doxcnpoOtdkzkU0MJ63CwbRImed"></a>

###### 模型架构：尚未公开

<p id="f-doxcn8vraBOsdUE8iKBXNxYsvXo"><span style="font-weight:bold">TypeSafe AI 尚未公开 Jev 的完整网络结构，无法确认它是否基于 Transformer，也不知道参数规模和具体输出头设计。</span><span> 已公开的技术描述包括新模型架构和并行采样器，但不足以还原其内部实现。</span></p>

<p id="f-doxcn9yPRoT8dIDs2ZtJHzX4d2e"><span>一种推测是：</span><span style="font-weight:bold">Jev 仍用 Transformer 处理输入，但不让模型接着写文字，而是由专门训练的输出层直接计算类别概率或分数。</span><span> 例如，输入一封邮件后，直接返回“账务 90%、物流 10%”，而不是逐步生成“这是一封账务相关的邮件”。这种做法不要求把模型改成 Encoder-only；保留 Decoder-only 的主体结构，也可以通过训练专门的分类输出层来实现。</span></p>

<div id="f-doxcnNirj42b0ZaWiiP82h4CTrc"><img alt="" decoding="async" height="240" loading="lazy" src="/images/agent-learning/b4aa62d5eaca5ea4f75d3675.png" width="360"/></div>

<p id="f-doxcn36xQU3opS6B6xJmZZUk6hc"><span style="font-style:italic">架构动图：用 Decoder-only 作为共同的教学例子，不表示 Jev 已确认采用该结构，也不表示两者共享权重。下方仅展示固定类别分类；动态选项如何编码、并行采样如何工作仍未知。</span></p>

<p id="f-doxcntEEO5isfyuJ2oniEsMwTwh"><span style="font-weight:bold">注意：这个是一个架构的推测哈，因为现在Jev的架构尚未披露，上图和下面文字都是推测！</span></p>

<p id="f-doxcnQFDmnvijk2D01id0vVmOTK"><span>看图时跟随上方蓝色、下方绿色光点：</span><span style="font-weight:bold">两条路径都先经过 Transformer Backbone（主干网络），得到 Hidden State（隐藏状态），再进入不同的任务输出头。</span><span> 隐藏状态是计算得到的中间张量，不是独立的“表示层”；图中仅画出一个选定位置的 d 维向量。</span></p>

<p id="f-doxcn39qnybyq98RoqMwEoM2B8g"><span>上方的 </span><span style="font-weight:bold">LM Head</span><span>把隐藏状态映射为词表 Logits（未归一化分数），再经 Softmax 转为下一个 token 的概率。图中用 argmax 选择 token 作示例，选出的 token 经 Autoregressive Loop（自回归生成循环）接入下一步，直到遇到结束标记。生成会复用已有 KV Cache，不是每一步重算完整输入。</span></p>

<p id="f-doxcnVbOsFpbkylpJFSWHooU8Hc"><span>下方的 Classification Head（分类头）把隐藏状态映射为固定类别的 Logits，再经 Softmax 得到类别概率，返回结果后结束。</span><span style="font-weight:bold">两条路径都有分数和概率，区别是预测 token 还是预测类别，以及是否继续运行文本生成循环。</span></p>

<p id="f-doxcn97ubrXDuECe7TzO8ua6KMB"><span>所以，推测中省去的是</span><span style="font-weight:bold">逐 token 生成的循环</span><span>，不是把 Decoder 模块删掉。输出头需要训练，不能把现有 LLM 的输出层随意替换就得到 Jev；这也不能证明其实际推理只需一次前向计算。</span></p>

<p id="f-doxcnVh8Huly5xoL8Bxl4K2rSGg"><span>（以上内容，应用开发的同学看不懂算了。抓住最核心的就行：</span><span style="font-weight:bold">推测Jev也是基于Transformer结构做的，但是网络改变了自回归生成形式，不用循环生成，而是一次预测最终的概率</span><span>。）</span></p>

<a id="f-doxcnDcji9VMoRIkr6YTPOsXS0d"></a>

###### 后训练：RLCD 与 RLHF 有什么不同？

<p id="f-doxcnxgwxRkDcjkI6DWvv44oqkd"><span style="font-weight:bold">Jev 的核心训练方向是 RLCD（Reinforcement Learning for Calibrated Decisions），即“面向校准决策的强化学习”。</span><span> 它的重点不只是让模型选对答案，还要让输出概率准确表达不确定性，便于软件据此做决策。</span></p>

<p id="f-doxcnKA4helf9Uf9eMva8u26c1c"><span>我们熟悉的 </span><span style="font-weight:bold">RLHF（Reinforcement Learning from Human Feedback）</span><span>，通常先收集人类对不同回答的偏好，再通过奖励模型等方式指导策略优化，使回答更有帮助、更符合人的要求。</span><span style="font-weight:bold">RLCD 则把优化重心放在决策结果和概率校准上：不仅问“选得对不对”，还问“给出的概率是否可信”。</span><span> 前者侧重人类偏好反馈，后者强调校准目标，两者并非互斥，也不能简单理解为 RLCD 完全不使用人类反馈。</span></p>

<p id="f-doxcnZk6eZwkbUDhleli3kHCq4c"><span style="font-weight:bold">RLCD 最值得关注的创新方向，是把后训练的重点从“人更喜欢哪个回答”，转向“软件能否依据预测概率采取行动”。</span><span> 例如，程序可以结合误判成本，决定自动处理还是转交人工。不过，其具体奖励函数、训练数据和策略更新算法尚未公开；目前能明确的是训练目标，不能把它写成已知的完整算法，也不能由此推导出“零错误”或“零幻觉”。</span></p>

<a id="f-doxcnu4nMw8XzP7ucwS5UoQypIc"></a>

###### 使用方式：分类路由与工作流节点预测

<p id="f-doxcnVNN7prbLmPVsuhHGgCVV0d"><span>下面的两种模式是</span><span style="font-weight:bold">应用架构模式</span><span>，不是 Jev 提供的两个独立产品。</span></p>

<a id="f-doxcnX46ybPcZBPKlelVxZEKGoh"></a>

###### 模式一：先分类，再交给合适的大模型处理

<p id="f-doxcnmCmpbvHv5ScEBWYHTTMPuc"><span>这一模式把 Jev 放在较昂贵的生成或推理步骤之前。</span></p>

<pre id="f-doxcn0U0lwgcFqfy6Z9rxrD2gZ4"><code>用户请求 / 邮件 / 内容
        ↓
Jev：分类、评估复杂度、识别处理要求
        ↓
策略代码：选处理分支与模型
        ↓
便宜模型 / 强推理模型 / 专用工具 / 人工审核
        ↓
生成回答或执行任务
</code></pre>

<div id="f-doxcnANDrUFsBNSZ6d8iGmKp0rh"><img alt="" decoding="async" height="630" loading="lazy" src="/images/agent-learning/3e24d0e3a097c64c66dd640b.png" width="1120"/></div>

<p id="f-doxcnDXwBnCLtBkoEPQM6jH6Hph"><span style="font-style:italic">动图 4：跟随编号 1、2、3 的邮件，观察它们如何在路由处分道，进入不同下游。颜色之外也保留编号和终点标签；实际分支由代码策略控制，Jev 不自动拥有执行权限。</span></p>

<p id="f-doxcnDG72aqBl1FnkE15STD5u8c"><span>典型例子是客服：</span></p>

<ul><li id="f-doxcnrARe8iTpk0MkRI7qN6GcJg"><span>简单 FAQ → 经过验证的知识库检索与轻量生成流程；</span></li></ul>

<ul><li id="f-doxcnRHhJE7REvkDtKdGg0TfIyc"><span>账务争议 → 账务专用流程，需要时由更强模型整理证据；</span></li></ul>

<ul><li id="f-doxcn42O5u349jTLQUC3d3L9uEg"><span>明确要求人工 → 进入人工队列；</span></li></ul>

<ul><li id="f-doxcn2vbhZV2QX2Um94tSksljfe"><span>无法可靠判断 → 回退到更强模型、澄清或人工。</span></li></ul>

<p id="f-doxcnuyX8r1UwWfxIDw63KIIYJb"><span>也可以让 Jev 在一个工具目录中选择候选工具，再由下游组件构造参数。</span><span style="font-weight:bold">工具选择不是完整 function calling</span><span>：选择 </span><span><span><span>refund_lookup</span></span></span><span>，并不等于已正确提取 </span><span><span><span>order_id</span></span></span><span>、完成鉴权或调用工具。</span></p>

<a id="f-doxcnXiQDgEhOtZGcKBC5g1eXCf"></a>

###### 模式二：提前编排工作流，只在关键节点让模型预测

<p id="f-doxcnK0HZHW6VdgUJc6A1l6qR3b"><span>这一模式由开发者规定状态与流转规则，Jev 负责原本难以用纯规则完成的语义判断。</span></p>

<pre id="f-doxcnHV4Tv60WEdfTxdrJr4ZLpf"><code>新工单 → 补齐上下文 → Jev 分类 → 代码路由
                              ↓
                  查账 / 收集证据 / 提交人工
                              ↓
                      通用模型起草回复
                              ↓
                  Jev 检查语气、覆盖度等
                              ↓
              硬规则校验 + 权限检查 + 审批策略
                              ↓
                      发出回复 / 退回处理
</code></pre>

<div id="f-doxcnNzKHv6vkKG91xHrTDNNMjd"><img alt="" decoding="async" height="630" loading="lazy" src="/images/agent-learning/2bf0050b880bf546f9de059b.png" width="1120"/></div>

<p id="f-doxcn1llyT1utfoIFlBt3BeO95d"><span style="font-style:italic">动图 5：同一份文档沿固定路径前进，第一次检查未通过时退回修改，之后仍需经过独立策略门才能发送。回退路线由程序预先设计，不是 Jev 自己生成工作流；模型检查也不是完整安全保证。</span></p>

<p id="f-doxcnrZHtkF01ciBodL30KBmRhg"><span>“分类—路由—生成—检查”的设计可以覆盖识别退款诉求、紧急程度、客户情绪，以及检查回复是否回应问题、是否泄露内部规定等节点。</span></p>

<p id="f-doxcno7la4TYOaADqNjvA82L6de"><span>与通用自主 Agent 的主要区别是：</span></p>

<p id="f-doxcn3UrXWctUjVh9awnUu38h1e"><span style="font-weight:bold">预先编排的工作流 + Jev</span><span>由开发者定义允许的状态与转换，模型只负责当前节点的具体判断。其可控性来自显式策略、类型、权限和状态机，适合稳定、重复、结果空间可定义的任务。</span></p>

<p id="f-doxcnLUdA9n4ej5YJhoUB3UhVSb"><span style="font-weight:bold">开放式 Agent</span><span>则可能由模型动态形成计划和路径，并承担规划、选工具、构造参数、解释结果等职责。它依赖 Agent 框架、工具约束和运行时治理来保持可控，更适合路径难以事先穷举的探索性任务。</span></p>

<p id="f-doxcn1dHIJ5k8T6rG8O8J7nu32d"><span style="font-weight:bold">我相信这个对本案例设计项目是一个新的启发，之前我们很多人设计的项目都有，</span><span>用一个主Agent做思考，判断，分类给不同的Agent去做。现在我们可以思考的一点，用一个Agent(LLM) 去做一个简单的分类任务，是不是从速度，成本，准确性上都不如Jev模型，是属于大炮打蚊子。我们是否可以在我们的架构设计中，使用Jev来做这种分类的决策？</span></p>

<a id="f-doxcnBsq6gWLgAktacroT4Ao0kh"></a>

###### 面试问题

<a id="f-doxcntPpS5Ssymw4W11dE2YOeHc"></a>

###### 最近很火的 Jev 模型你看了吗？谈谈你的理解。

<p id="f-doxcnziwe0fVOr3zE4ZjWrhjTFh"><span>💡 </span><span style="font-weight:bold">答题思路</span><br/><span>从</span><span style="font-weight:bold">Jev是什么（模型）</span><span>，相比于普通LLM的</span><span style="font-weight:bold">核心和特点</span><span>（设计理念，速度，花费）对比，对我们的</span><span style="font-weight:bold">设计启发</span><span>（对于很多分类，判断，评分问题可以用Jev，而不用llm)</span></p>

<p id="f-doxcni1VXgoUR2DjPGswHO3veJb"><span>📝</span><span style="font-weight:bold"> 参考答案</span></p>

<p id="f-doxcnX74cMGMGRURSmmB1xyOGxc"><span>看过相关资料。我的理解是，Jev 是一个面向软件自动化的决策模型，不是另一个聊天模型。它主要解决分类、是非判断和评分问题，比如工单该交给哪个部门、邮件是否紧急。它的重点不是写一段回答，而是根据预先定义的问题，输出程序可以直接使用的判断结果和概率。</span></p>

<p id="f-doxcnWLMmGaQ4xnM8oAUrIU53X5"><span>它和通用 LLM 的区别，可以认为主要在优化目标。通用 LLM 强调生成、推理和开放式任务，Jev 则专注高频、结果范围明确的小决策，追求更低的延迟和调用成本。传统 LLM 当然也能分类，但只是判断一封邮件的类别，就调用昂贵的推理模型，可能没有必要。</span></p>

<p id="f-doxcn1Lmmc2XnfukZ5Zt81bCMwm"><span>它给我们带来的分工思路：简单的语义分类、判断和评分，可以考虑交给 Jev；复杂分析和内容生成，仍然交给通用模型。这个思想可能会对我们的工作模式，项目设计会带来很大的改变，今后可能会大量运用在我们的生活中。</span></p>

<a id="f-doxcnK2qWME4QQexZSnTmmQPIHe"></a>

###### Jev 模型对于你的工作有什么启发？

<p id="f-doxcnyIzixusNjK2LgR4zIarcbe"><span>💡</span><span style="font-weight:bold"> 答题思路</span><br/><span>可以从项目设计的角度来回答一下，之前没有Jev的时候，我们的设计：会思考确定性的东西用代码来做，不确定的东西用llm做。现在设计项目我们可以从三点出发：</span><span style="font-weight:bold">什么时候用代码做，什么时候用jev做，什么时候用Llm做</span><span>，以及再谈谈上面讲到的jev的两种使用方法。</span></p>

<p id="f-doxcneqz1VqMDiFgUHv1KuPKA5f"><span>📝</span><span style="font-weight:bold"> 参考答案</span></p>

<p id="f-doxcnDT9Ck7723iU6ozkGaeb0Pf"><span>它对我最大的启发，是项目设计时可以把任务分得更细。以前我们常说，确定性的逻辑用代码，不确定的语义问题交给 LLM。现在我会进一步区分：需要理解语义，但答案范围明确的任务，不一定要用通用大模型。</span></p>

<p id="f-doxcniIAiU4vzD36ireVltNqp3c"><span>具体来说，</span><span style="font-weight:bold">规则校验、计算和权限控制，优先用代码</span><span>；</span><span style="font-weight:bold">工单分类、紧急程度判断、内容评分，可以考虑 Jev</span><span>；</span><span style="font-weight:bold">复杂推理、方案规划和回复生成，仍然交给 LLM</span><span>。不是为了用新模型而增加组件，而是给每个任务选择合适的实现方式。</span></p>

<p id="f-doxcniqiUB8ndML1tuHw08o5nMb"><span>在用法上，可以考虑两个方向。</span><span style="font-weight:bold">第一是前置路由</span><span>，让 Jev 先判断请求类型和复杂度，再由代码把请求分给轻量模型、强推理模型或人工，避免所有请求都调用最贵的模型。</span><span style="font-weight:bold">第二是在预先编排的工作流里承担局部判断，</span><span>比如客服流程中，先判断诉求和紧急程度，再由 LLM 起草回复，最后用 Jev 检查回复是否覆盖问题、语气是否合适。真正发送仍由代码和审批规则控制。</span></p>

<p id="f-doxcnUK58WjIx8wOVrVCXByiNbg"><span>这两种方式可以组合。我的核心思路是把判断、生成和执行分开，再用业务评测验证收益；对于不确定或高风险的结果，保留人工复核。</span></p>

<a id="f-doxcnJ6sbxDi3ycqb0fqwWmJRqe"></a>

###### 讲解视频

<p id="f-doxcnRMhyngvu4HkKqlLwKrld1d"><span><span><a href="https://www.bilibili.com/video/BV15zah6fEWq/?spm_id_from=333.1387.homepage.video_card.click&amp;vd_source=144bec9c3f54e465073138bed788be1b"><span>https://www.bilibili.com/video/BV15zah6fEWq/?spm_id_from=333.1387.homepage.video_card.click&amp;vd_source=144bec9c3f54e465073138bed788be1b</span></a></span></span></p>


<a id="section-0208"></a>
## 模型微调基础

<a id="f-doxcnNvLD1VEv7wd4rMPrtcMnkg"></a>

<p id="f-doxcny4tCiEcdnmHZj9l7A4ZBud"><span>（虽然我们的目的是以应用侧入手，不过实际面试下来，微调和推理也会被问到，如果你完全没有经验，一般来说SFT:LoRa 以及强化学习，面试官都还挺看重的，希望你能做过，并且可以讲出来）</span></p>


<a id="section-0209"></a>
## SFT的方案有哪些？

<a id="f-doxcn1S1Djanq6UHTVV7ow1Fu1d"></a>

<p id="f-doxcnYZN6USJDpP8LLzZgovYcds"><span>参考《从零构建大模型 – 算法，训练与微调》第5章</span></p>

<p id="f-doxcnW7UVjfoeFNw0MTTodw6PSc"><span>从大的方向上可以分为</span><span style="font-weight:bold">全量微调</span><span>和</span><span style="font-weight:bold">部分参数微调</span><span>。</span></p>

<p id="f-doxcnunOfO8YTdn130cbgH7mxph"><span style="font-weight:bold">全量微调</span><span>是比较传统的方法，对模型所有的参数都进行训练，适应性强，适合复杂任务，但是成本高，计算资源消耗大，容易过拟合。</span></p>

<p id="f-doxcnwAUW6zkRIsu6LAOYGfasRb"><span>目前在llm模型领域使用更多的是只需训练部分参数的微调。比如说：</span></p>

<p id="f-doxcnFW55Xjc00ynAaJua3FL75b"><span>通过在模型结构中</span><span style="font-weight:bold">插入新的模块</span><span>来实现微调的方法，例如：Adapter tuning, LoRA, QLoRA，他们不改变原始参数，只训练新模块，适用于中大型任务。</span></p>

<p id="f-doxcn4Fr7oXw6GXm1GwwkOAoKZd"><span>通过在</span><span style="font-weight:bold">输入前添加可训练的提示</span><span>或</span><span style="font-weight:bold">前缀来引导模型</span><span>的方法，例如Prompt Tuning和 P-Tuning等，他们不改变模型结构，参数极少，适用于轻量任务或快速迭代。</span></p>

<a id="f-doxcnXnu7BzcHYtHmu5AToctWeh"></a>

##### 简单介绍Lora技术

<p id="f-doxcnFINpQA84uQz8HqKwY6BGPf"><span>Lora原理就像拼图。 整个模型的参数就是一幅完整的拼图，而LoRA微调的目标是只调整几个特定的拼图模块，而不重拼整个模块。</span></p>

<p id="f-doxcn8W4D4oO8Npd2pyks2UUSTc"><span>具体来说，LoRA通过低秩分解将大矩阵拆分成两个小矩阵，只微调这两个小矩阵中的参数，不改变整个大的权重矩阵。</span></p>

<p id="f-doxcnhZMBhEOKPoqUjDE6K7wVTh"><span>这种分解相当于把复杂的工作分配给几个辅助部件来完成，既保持了原模型的稳定性，又能够用较少的参数适应新的任务。</span></p>

<p id="f-doxcnNUPv819Vz64KoyBdMyLkKg"><span>此外，LoRA只需要微调小矩阵中的少量参数，因此减少了计算量和存储需求，适合快速迭代和部署。</span></p>

<a id="f-doxcn4K7zhfQtdYlAXWSPu9cWpf"></a>

##### Lora中的常见参数

<p id="f-doxcnbvF0DzT4UsKd6q7WMBKxrc"><span style="font-weight:bold">模型参数</span></p>

<p id="f-doxcnEpeFvAz3cAXKQpncJjE1ef"><span>r (秩）：</span></p>

<p id="f-doxcnIYVp5OV4y1etr8j5r79T0c"><span>（概念）控制低秩矩阵的大小，影响训练参数量和模型容量。</span></p>

<p id="f-doxcnWOS5CnDFgHu1Xzw136vgYd"><span>（作用）r 越大，模型能学习到更多任务特征，但显存占用也会增加。</span></p>

<p id="f-doxcnJLaF2W1vJ58rzDkNj4LeIc"><span>（常用范围） 4 ~64，典型配置是r = 16 或 8。简单任务用8，复杂任务用16~32</span></p>

<p id="f-doxcnPsqeV2JfnvOHDeTlmWSAC4"><span>alpha(缩放因子）</span></p>

<p id="f-doxcn0KfsQItlCWzbEjzeFqv1IX"><span>（概念） 用于缩放LoRA权重的影响。</span></p>

<p id="f-doxcnD7kQkkA8AbBQY99RkoT7qb"><span>（作用）调节LoRA插入模块对原始模型的影响速度，通常为r 的 1~2倍。</span></p>

<p id="f-doxcnXPe5LGCe9PhJ8rjrLSrwKb"><span>（常用范围）16 ~ 128。</span></p>

<p id="f-doxcnMQQ6PSeKyj6YNw11womeLb"><span>target_modules</span></p>

<p id="f-doxcnGZhyuCIB1KAPfWHe3PixFd"><span>（概念）指定在哪些层插入LoRA。</span></p>

<p id="f-doxcntGLjqbFB1jIXQhKp7XuKkd"><span>  (作用）影响训练效率和效果，通常选择注意力层。</span></p>

<p id="f-doxcnSKNyqOjRUwBcfPsSlZYb4f"><span style="font-weight:bold">训练参数</span></p>

<p id="f-doxcn44Afliknuq33QkAOS0HDEg"><span>（训练参数放在Lora下似乎不太准确，但是因为问的最多的就是Lora，笔记部分暂时也没涉及别的方法的模型训练，所以我先放在这里）</span></p>

<p id="f-doxcnmUmGdmquMpuDIBfv9403Xe"><span style="font-weight:bold">learning_rate（学习率）</span></p>

<ul><li id="f-doxcnaW7KymIbbo0vbWjwapbnoh"><span>控制权重更新速度</span></li></ul>

<ul><li id="f-doxcngX4qFYBAP4I0QEGGBE1ZQe"><span style="font-weight:bold">作用</span><span>：太高会导致不收敛，太低训练慢。</span></li></ul>

<ul><li id="f-doxcnkfBaYuSZOVGVec3O7sC4Hd"><span style="font-weight:bold">常用范围</span><span>：学习率通常设置在一个较低的范围 （1e-4 ~ 5e-5）。</span></li></ul>

<p id="f-doxcn8QBVOBYvDlYdgYJIORJrQg"><span style="font-weight:bold">batch_size（批大小）</span></p>

<ul><li id="f-doxcn4iupfckJv5nxdQS9w8fuPK"><span>每次训练处理的样本数。</span></li></ul>

<ul><li id="f-doxcnxBNBVDkiX8aLuFKIxOyy8d"><span style="font-weight:bold">作用</span><span>：影响显存占用和训练稳定性。</span></li></ul>

<p id="f-doxcnb6mjVWcOaR0DYI54ZmPRzf"><span style="font-weight:bold">epochs（训练轮数）</span></p>

<ul><li id="f-doxcnc5l0eLi8TKmqEYUDsZ6sbH"><span>完整遍历数据集的次数。</span></li></ul>

<ul><li id="f-doxcnPV7Bckqcwhx2UFc1kHjkvf"><span style="font-weight:bold">作用</span><span>：轮数太少模型学不够，太多可能过拟合。</span></li></ul>

<ul><li id="f-doxcndhtRyi5PPIV0CZgBuS2zCh"><span style="font-weight:bold">常用范围</span><span>：一般设置在3~5轮，防止过拟合。</span></li></ul>

<a id="f-doxcnhsZJwyWjblTjM6svTOJvzF"></a>

##### 简单介绍Prompt Tuning技术？

<p id="f-doxcnPMKt7dGykL1Qd2j3i3am6e"><span>Prompt Tuning是一种通过调整输入提示来引导模型更准确地理解任务的微调方式。在Prompt Tuning中，模型的权重保持不变，微调仅涉及对输入提示进行优化。通过精心设计Prompt，模型可以在任务上下文中生成更精准的输出，可以提升对特定任务的表现。这种方式不仅高效，还可以适应不同任务，使得大模型不需要大规模微调就能适应新的任务需求。</span></p>

<a id="f-doxcngja5X6wbMkrcNzZLrPwk2g"></a>

##### 你是怎么做的微调？

<p id="f-doxcnQBbJIXB1fqeSAicnjlSskf"></p>

<p id="f-doxcnF9kpuorGKKXoFhS11APUJb"><span>首先按照这个4个思路来讲解：</span></p>

<p id="f-doxcn2yr6mcLyKlmlv5iXDEGAxh"><span>（1） 确定目标/做好选型</span></p>

<p id="f-doxcnZwE92Bd284SGvCPloJQwJe"><span>      （2） 数据集的准备</span></p>

<p id="f-doxcnnBY8BGkVsmEwGmgUmFEgqc"><span>      （3） 确定参数，进行微调，部署</span></p>

<p id="f-doxcnB8TelExTYgwuiS3MASYcCd"><span>      （4） 验证和评估</span></p>

<p id="f-doxcnjTlZaLHCU74qrkdJtMtZPh"><span> 在这个思路下，再添加自己的项目细节。让答案更加丰满，以下以该学习案例，按照上述思路进行回答，请大家自己根据实际情况参考。 </span></p>

<p id="f-doxcn1DwAwOP8Lx28TJazAyeIFh">下面给出参考答案。</p>

<p id="f-doxcnzvW9kxrfOSn05a8Ltofi0e"><span>）</span></p>

<p id="f-doxcn0KAzK8qJ8AxKydJ4a0Jw4f"><span>可以认为做微调是一个非常严谨的，数据驱动的科学实验过程。 在微调的过程中，我们通常有4个步骤：1.确定目标/做好选型。 2.数据集准备。 3. 确定参数，平台，进行微调。 4.验证和评估。</span></p>

<p id="f-doxcnFTDT0tCldTFvblibK1ZvEb"><span style="font-weight:bold">1.</span><span style="font-weight:bold">首先是确定好目标，做好选型</span><span>，比如是否可以通过提示词工程 或者 RAG 技术来解决，这样成本更低。同时考虑一些硬件是否支持，比如16GB显存，可以使用LoRA 微调，如果是13B模型，可能就要使用QLoRA。在我的系统中，核心目标是将模型压缩，同时保留模型的精度，使用的是远端Azure AI Foundry， 训练的是Qwen2.5-7B-Instruct，使用的是LoRA技术。</span></p>

<p id="f-doxcnDk3OP3n9qSTtmAthA69Bxd"><span style="font-weight:bold">2.</span><span style="font-weight:bold">数据集的准备。</span><span>项目采用</span><span style="font-weight:bold">真实用户邮件标注样本</span><span>、</span><span style="font-weight:bold">GPT-4生成的合成数据</span><span>，以及</span><span style="font-weight:bold">Enron Email Dataset公开数据</span><span>集，共500条样本。在准备好数据后，做了一些文本标准化，敏感信息去除的数据前处理。</span></p>

<p id="f-doxcn8ffq3GvIxed5UEHqMZer7b"><span style="font-weight:bold">3.确定LoRa的参数， r(秩），alpha 缩放因子 以及一些超参数</span><span>，比如</span><span style="font-weight:bold">学习率</span><span>，</span><span style="font-weight:bold">Batch Size</span><span>, </span><span style="font-weight:bold">训练轮数</span><span>，我们的任务比较简单r，就设置较小值8， 相应的alpha就是r的两倍16.</span><span style="font-weight:bold">。 </span><span>LoRa只训练部分参数，因此可以稍微设高学习率，这里采用的2e-4.</span></p>

<p id="f-doxcnMSeKl63e15OJQw8SKDwPgc"><span>除此之外，在训练中密切监测训练集和验证集的损失曲线。如果验证集损失持续上升而训练集损失持续下降，说明可能出现了一些过拟合，可以采取</span><span style="font-weight:bold">早停 </span><span>增加数据正则化等。 在训练结束后使用PEFT库将适配器权重和基础模型合并。</span></p>

<p id="f-doxcnreCYwaLVOyr8Ex49S1A94b"><span style="font-weight:bold">4.</span><span>对于不同的任务，可以使用不同的评估方法。比如分类任务 可以用：</span><span style="font-weight:bold">F1-Score方法</span><span>， 文本生成任务可以用：</span><span style="font-weight:bold">BLEU/ROUGE。</span><span> 通用对话任务，可以使用业内公认的基准比如：</span><span style="font-weight:bold">MT-Bench</span><span> 来获得一个可以比较的分数。在该学习案例中，由于该任务属于</span><span style="font-weight:bold">结构化信息提取</span><span>任务，需要从自然语言邮件中准确提取并转换为JSON格式的事件信息，简单来说是采用的是字段级别F1-Score结合精确匹配的评估方法。简单来说即对每个字段（如title、时间、地点）分别计算准确率，既保证整体结构正确，又允许语义相同但表达不同的情况。</span></p>


<a id="section-0210"></a>
## 强化学习的方案有哪些？

<a id="f-doxcnp8ApsPek72O2qwtTiD4ALc"></a>

<p id="f-doxcnEAY3C0grAt7T3PmO6TT2Pe"><span>（先背一下基本概念，实际中考察的并不多，所以不深入学习）</span></p>

<p id="f-doxcn5uudmg2UxZQJfX2eICLBvh"><span style="font-weight:bold">1. 基于人类偏好的 RL</span></p>

<ul><li id="f-doxcnjPNhBBzvp2yFdLkISy8gub"><span style="font-weight:bold">RLHF（Reinforcement Learning with Human Feedback）</span></li></ul>

<div id="f-doxcnqhLGRnyJ6YJwV6oNkrK7Pf" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">奖励来源</span><span>：人类排序数据 → 奖励模型。</span></div></div>

<div id="f-doxcnroa7tfv3TddjjB2Cu8BJje" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">优化方式</span><span>：PPO（Proximal Policy Optimization）+ KL Penalty。</span></div></div>

<div id="f-doxcnG8vjUAk5aRt2D2AMNK0w0b" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">目标</span><span>：对齐人类偏好、安全和价值观。</span></div></div>

<div id="f-doxcnV7Y2iRjMBLog5YEMHkhode" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">代表模型</span><span>：ChatGPT、Claude。</span></div></div>

<p id="f-doxcnFPvrtZiYkcuIrjCz3gz9vc"><span style="font-weight:bold">2. 基于 AI 偏好的 RL</span></p>

<ul><li id="f-doxcn09O7uAs5ghH6udOM4PGrpe"><span style="font-weight:bold">RLAIF（Reinforcement Learning with AI Feedback）</span></li></ul>

<div id="f-doxcnh5vxkh1tGx9MLauSUgRxHb" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">奖励来源</span><span>：强大教师模型（如 GPT-4）生成偏好排序。</span></div></div>

<div id="f-doxcnIs1oaOQ6ByqPsIzM6inGFg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">优化方式</span><span>：同 RLHF（PPO）。</span></div></div>

<div id="f-doxcnPWtHCQYkSoJrHvWn15LByg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">目标</span><span>：降低人工标注成本。</span></div></div>

<div id="f-doxcn05A7cutrgX6Rncqpn6r4kd" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">代表模型</span><span>：Anthropic 的 Constitutional AI。</span></div></div>

<p id="f-doxcniPPLdT0oBrjK5ZhlIIPmFf"><span style="font-weight:bold">3. 基于偏好数据的直接优化</span></p>

<ul><li id="f-doxcnlKPq8Dw673ekd8F74EIQug"><span style="font-weight:bold">DPO（Direct Preference Optimization）</span></li></ul>

<div id="f-doxcnY4ejoN1Ht7AcLLi7qfCrdf" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">奖励来源</span><span>：偏好数据（人类或 AI）。</span></div></div>

<div id="f-doxcnZYIYeDFRjiUGo1uAjRggob" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">优化方式</span><span>：直接优化策略，不训练奖励模型。</span></div></div>

<div id="f-doxcnWqkeSYKbeuBgU40mQCNDwh" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">目标</span><span>：简化 RLHF，避免 PPO 的复杂性。</span></div></div>

<div id="f-doxcnb7GPl8Z3mHDtnY3sX43ROf" style="display:flex;gap:0.5em"><span style="min-width:1.5em">◦</span><div><span style="font-weight:bold">代表模型</span><span>：LLaMA-2-Chat、Mistral-Instruct。</span></div></div>


<a id="section-0211"></a>
## SFT和RLHF的区别是什么？

<a id="f-doxcn5i7VLW1wAL4Q9JSucxIaTb"></a>

<p id="f-doxcnGHvAJkVgOWevYaXzCEpjad"><span>（问的并不是特别多，作为强化学习的基础知识先准备着）</span></p>

<p id="f-doxcnwE6knSLlui40ULNLp1jhSe"><span style="font-weight:bold">目标上的区别</span><span>：SFT的目标是让大模型能</span><span style="font-weight:bold">有基本的语言能力和执行任务的能力</span><span>，RLHF倾向于让大模型的回答更符合</span><span style="font-weight:bold">人类偏好</span><span>，</span><span style="font-weight:bold">安全</span><span>和</span><span style="font-weight:bold">价值观</span><span>。</span></p>

<p id="f-doxcnFbhZoCR3XHSDjxHDoWHd3d"><span style="font-weight:bold">方法上的区别</span><span>：SFT使用</span><span style="font-weight:bold">有监督</span><span>的方式训练，数据集的形式是问题-答案。而RLHF采用</span><span style="font-weight:bold">强化学习</span><span>的方式，</span><span style="font-weight:bold">数据集</span><span>是包含多个答案，以及</span><span style="font-weight:bold">答案的排序</span><span>和</span><span style="font-weight:bold">奖惩模型</span><span>的。</span></p>

<p id="f-doxcnnLwVuUA5rRUuoOfe8AZNhh"><span style="font-weight:bold">步骤上的区别</span><span>：RLHF通常是在SFT的基础上进行进一步优化的。</span></p>


<a id="section-0212"></a>
## 数据集的准备

<a id="f-doxcnMkjrpj1enVkZpPCF7yPhLg"></a>

<p id="f-doxcnwCuPNRmZgYBM3m4ywKxdpN"><span>（数据集的准备也是面试官很常考的一个问题，这里这一节4.1介绍了一些常见的数据集的来源，4.2 介绍了对数据进行前处理的方法。请大家根据4.1和4.2 整理出自己的针对于面试官问 "你的项目/LoRa是如何制作数据集的" 这一问题的回答。另外4.3是DeepSeekR1 的训练方法，里面包含了一些数据集制作思路，如果有什么契机你能把这个流程给面试官讲，一定会很加分）</span></p>

<a id="f-doxcn5ECy82vKaytOn2w1EpWZ7d"></a>

##### 常见的数据集来源

<p id="f-doxcn6d96KaAkfXXHqMZ9cL62xg"><span>微调领域常见的数据集的来源：</span></p>

<p id="f-doxcn9ghsktImWZlCUjoAfIuUdf"><span>1.内部数据：从一些内部的文档，或者用户使用的数据来去做标注。</span></p>

<p id="f-doxcnsZn7YHSAo8Q4LNmq8AVfvg"><span>2.公开数据：寻找一些已经存在的数据库，比如Hugging Face Datasets，Enron Email Dataset 。</span></p>

<p id="f-doxcnjRt8OgmG8sLyIqZ3XcZkwg"><span>3.人工标注：费时，但是可以得到高精度的定制化数据。</span></p>

<p id="f-doxcnYrcDAUuCA7JHGOOV2XCVxg"><span>4.数据合成：数据合成，利用大模型去生成。</span></p>

<a id="f-doxcnWEs4qbAawez5faeecqtuog"></a>

##### 数据清洗和前处理

<p id="f-doxcnAqZoHRY3AwHKZcIMxWIMVd"><span>1.文本标准化：将文本统一大小写，去除一些特殊字符，html tags之类的。（虽然现在模型可能对大小写理解得很好，但是你统一大小写会降低模型学习难度）</span></p>

<p id="f-doxcnjtVCCUkmkhhS9OMs4Gh3Ud"><span>2. 敏感信息去除：去除一些敏感信息，比如用户的名字，电话号码。（主要是合规性考虑）</span></p>

<p id="f-doxcnxM2sP2Sth0J0oogvaocVvb"><span>3. 平衡数据：平衡一些数据集类型的占比，特别是分类任务，避免某一类内容过多。</span></p>

<p id="f-doxcnT8hTF7PHOMr65YHIrfSi9e"><span>4. 标签纠正：避免一些数据集矛盾的问题。（比如同一个输入，有的分类成angry,有的分类成frustrated, 那么选择一个label或者合并种类）</span></p>

<p id="f-doxcnvdIQlfrDeETbn8sBdwtsbb"><span>5. 统一格式：对于不同的微调任务，需要的输入格式可能会不一样。比如分类任务的格式是{Text-&gt;Label}, 问答任务的格式是：{Context, Question -&gt; Answer}</span></p>

<a id="f-doxcnyGMNtTsLI9rR0siJ7h9elh"></a>

##### DeepSeek R1 训练方法

<p id="f-doxcn8MRHRmzCmKvsxMQlqHKFkd">参考 DeepSeek-R1 的训练方法，理解 SFT、强化学习与训练集准备的完整过程，结合训练步骤分析其中的设计思想。 <a href="https://zhuanlan.zhihu.com/p/24621463668"><span>https://zhuanlan.zhihu.com/p/24621463668</span></a></p>

<div id="f-doxcnbY3BWaWTtuE6b5t8MS7BWP"><img alt="" decoding="async" height="1280" loading="lazy" src="/images/agent-learning/c3dce4b1da4fe486131e222b.png" width="1084"/></div>

<p id="f-doxcnzVNhMVW58AcYMfghjPkEvb"><span style="font-weight:bold">训练过程：</span></p>

<ol start="1"><li id="f-doxcnvXp211927LGfZfYPzp8Nge"><span>通过向DeepSeek-R1-Zero 提问，再通过人工精修，生成几千条思维链监督数据集。</span></li></ol>

<ol start="2"><li id="f-doxcnOkVqHgYAJ5IGYjJSQ5drRh"><span>使用生成的几千条思维链监督数据集，训练DeepSeek v3 base模型，得到思维链监督微调后的模型。</span></li></ol>

<ol start="3"><li id="f-doxcnDMRANujxOvbnLkqT3TA4Ag"><span>使用GRPO强化学习，奖励分数引入准确率和语言一致性分数，得到强化学习训练后的模型。</span></li></ol>

<ol start="4"><li id="f-doxcn2lAhb8NLnBencR32lD5kxd"><span>使用强化学习训练后的模型，采用拒绝采样方法，收集60万条思维链推理数据集，其中拒绝采样的奖励模型使用DeepSeek-v3。</span></li></ol>

<ol start="5"><li id="f-doxcnvBAlRO82iW6eAWQPXubVEe"><span>向DeepSeek-v3提问和整理DeepSeek-v3训练数据集，得到20万条写作、事实问答和自我认知等领域的非推理数据，滤掉了混合语言的链式思考、长段落和代码块。并整合60万条思维链推理数据集。得到一个80万监督数据集。</span></li></ol>

<ol start="6"><li id="f-doxcnd1Ce6iSlpToYSJfH1HCzHc"><span>使用80万监督数据集训练DeepSeek v3 base模型，再做多样化强化学习，最终得到DeepSeekR1模型。</span></li></ol>

<p id="f-doxcnZkjecRGtK2ZRK1TQ9i24Le"><span style="font-weight:bold">背后的蕴含思想：</span></p>

<p id="f-doxcn8GZFPml56xVjs2kIYBPdyf"><span style="font-weight:bold">一：闭环迭代，不是一次性训练：</span></p>

<p id="f-doxcnSKTX7QPbANHGx5FF0hsEhX"><span>      不是 "先准备数据 -&gt;一次性训练模型", 而是：训练模型-&gt;用更强的模型生成更好的数据-&gt; 再训练-&gt;模型更强-&gt;再生成数据。 这种闭环让模型和数据共同进化，避免低质量数据拖后腿。</span></p>

<p id="f-doxcnzm0VM6msXCIqeQmDV7Exrg"><span style="font-weight:bold">二：数据质量优先：</span></p>

<p id="f-doxcnwasFPXNkNQTmh5h5zgk4wf"><span>通过拒绝采样，人工精修，模型奖励打分，确保训练集干净，逻辑正确。</span></p>

<p id="f-doxcngPHYbXenGJmGbR68Qxa9cf"><span style="font-weight:bold">三：分阶段训练：</span></p>

<p id="f-doxcnyX0QkEAzuQD1x7eVDGrQ2g"><span>阶段1：SFT -&gt; 学会遵循指令</span></p>

<p id="f-doxcnjNDwMs1nXkBuflJSddwrFb"><span>      阶段2: GRPO 强化学习-&gt;优化推理能力</span></p>

<p id="f-doxcn3NAwz48aq71PzDHDBZk43f"><span>      阶段3：多场景RL-&gt; 提高泛化和安全性</span></p>

<p id="f-doxcnCWJvpuINQWYPK8GlbaFwLg"><span style="font-weight:bold">四：多类型数据集，能力互补</span></p>

<p id="f-doxcn2rVKFMgt6RKlFRktowBIIg"><span style="font-weight:bold">指令遵循数据集 </span><span>让模型可以听懂指令。</span></p>

<p id="f-doxcncJ3VV2PP1lheC1bExFakVg"><span style="font-weight:bold">       推理链数据集</span><span>：让模型逐步推理 </span></p>

<p id="f-doxcnmw2eXgkYcuACok2p9k7Rmb"><span style="font-weight:bold">非推理任务数据集</span><span>：保持通用能力。</span></p>

<p id="f-doxcntfSGhfLcMeaml6YCf0WqUg"><span style="font-weight:bold">奖励信号数据集</span><span>：强化输出质量</span></p>

<a id="f-doxcnBc183QP3kVDwMCtImP4jD4"></a>

##### 面试问题精选

<p id="f-doxcnfSTTS3JCfkQhM3wujl7qGd"><span>4.4.1 判断数据是否值得训练？</span></p>

<p id="f-doxcnjnb2lsrBgSPmHmaMnwtiOf"><span>判断一批数据值不值得训练，我会看几个标准：</span></p>

<p id="f-doxcnZEig7E7CsYyEBTKFAAjBOc"><span style="font-weight:bold">是否真实覆盖业务问题</span></p>

<p id="f-doxcnyzpcnQDegV2WReSZUu6udc"><span>数据要来自真实高频、高价值、容易出错的场景。比如用户天天问、模型经常答错、RAG 很难靠检索解决的问题，这种才值得训。</span></p>

<p id="f-doxcnLyB2IMa2w2wtF1vCFLXifc"><span>如果只是一些泛泛的知识问答，模型本来就会，训练价值就不大。</span></p>

<p id="f-doxcnn9oMxBLk3WMjROqOJ4ejSe"><span style="font-weight:bold">是否有明确可学习的模式</span></p>

<p id="f-doxcnLVw5FSp6nS2ohG1R6d9Qtg"><span>微调适合学习的是稳定的输出风格、任务格式、领域表达、工具调用方式、拒答边界、分类标准、结构化抽取规则。</span></p>

<p id="f-doxcn51iTivQHjF9rU7zpfH4wze"><span>如果问题本质是“知识不够新”或者“答案依赖外部文档”，那更适合 RAG，不适合靠微调硬记。</span></p>

<p id="f-doxcnEKHzr6JZPDgh8BVA18hWUh"><span style="font-weight:bold">标签质量够不够高</span></p>

<p id="f-doxcnvuPkDUUCCf3z9SWISHwNKd"><span>训练数据里答案要正确、一致、无歧义。</span></p>

<p id="f-doxcnP8Sj2v34eyuvECTF6ehWxb"><span>如果同一个问题在不同样本里答案互相冲突，或者标注人标准不统一，模型训练后会更不稳定。微调不是洗数据的魔法，脏数据只会放大问题。</span></p>

<p id="f-doxcnGLHVNNFHrdweygDgZPzGGd"><span style="font-weight:bold">是否能覆盖失败案例</span></p>

<p id="f-doxcnQbf2ruAc18QqpiRc9cXKNy"><span>很有价值的数据往往来自 badcase：模型曾经答错、拒答错、格式错、工具调错、幻觉的样本。</span></p>

<p id="f-doxcnuan9lWNrSCjE4NDdlGOidc"><span>这些数据经过修正后，可以让模型学会“原来这种场景应该这样处理”。</span></p>

<p id="f-doxcnVOjuhLjDed2SI63J59cJmg"><span style="font-weight:bold">是否和现有能力有增量</span></p>

<p id="f-doxcngo0AeDU6LHJu4sUKZ9Gt5d"><span>如果基础模型已经能很好完成，或者靠 prompt 就能稳定解决，那没必要微调。</span></p>

<p id="f-doxcnpywm9z6psSskJnHebARDQd"><span>只有当 prompt 太长、规则太复杂、输出不稳定、某类任务反复失败时，微调才更有收益。</span></p>

<p id="f-doxcn1Y9BaV4fwJZ7nWrQQZJRMb"><span style="font-weight:bold">是否能被评测验证</span></p>

<p id="f-doxcncGhaYdMwUbRx0w584mMg2d"><span>训练前最好留出一批验证集，看微调后在准确率、格式遵循率、拒答准确率、工具调用成功率、用户满意度上有没有提升。</span></p>

<p id="f-doxcnYngcUntGw2nZSI1GTMsss9"><span>如果没有评测集，就很容易变成“感觉模型更好了”，但其实可能只是对训练集过拟合。</span></p>

<p id="f-doxcngk2fs5FUgaqhgueRoMo3yf"><span>精选自 </span><span><span><a href="/posts/agent-learning-24-interview-review/#f-doxcnEzp8GDSc3cwzZgNbPWBXDd"><span>202604 腾讯AIAgent暑期实习一面</span></a></span></span></p>


<a id="section-0214"></a>
## 常见的推理加速方法

<a id="f-doxcn5KkHUuA8BdvuO3bKvqCt1f"></a>

<p id="f-doxcnJ9Of5ltmA8ZfPyPrnDALWf"><span>我们可以从</span><span style="font-weight:bold">模型层面</span><span>，</span><span style="font-weight:bold">硬件层面</span><span> 和</span><span style="font-weight:bold">系统架构</span><span>层面 三个方向入手：</span></p>

<p id="f-doxcn9VLmGRkY4Bw2Je1A5k7auh"><span style="font-weight:bold">A 模型层面</span></p>

<p id="f-doxcnn0iXX8f3HaSJxmbiST3jWc"><span style="font-weight:bold">1.模型量化</span><span>： 将FP32 转换成INT8 或更低的精度，减少计算量和内存占用，一般这样推理速度可以提升2~4倍。</span></p>

<p id="f-doxcnMbinlZSx5fpUjKxxovPwFh"><span style="font-weight:bold">2.模型剪枝</span><span>：删除冗余权重或者不重要的神经元，减少参数。</span></p>

<p id="f-doxcnbCdqJV3yHq1Hw86cefNxQv"><span style="font-weight:bold">3.知识蒸馏：</span><span>用大模型训练一个小模型，部署时用小模型推理。</span></p>

<p id="f-doxcnOPUmmoEdNoTckaHI2i2Coe"><span style="font-weight:bold">B 硬件层面</span></p>

<p id="f-doxcnRVgCWVSrNakj5bw172Vj7c"><span style="font-weight:bold">1.</span><span style="font-weight:bold">GPU/TPU 加速</span><span>： 使用高性能GPU 或专用AI 芯片。</span></p>

<p id="f-doxcnBOHpMSreyRtO2QdYJ1mKNb"><span style="font-weight:bold">2.</span><span style="font-weight:bold">多卡并行</span><span>：将模型分布到多个GPU上进行计算。</span></p>

<p id="f-doxcn3iFk5NntJoN8JVOBmHLBmb"><span style="font-weight:bold">C 系统架构层面</span></p>

<p id="f-doxcnypdoWLapYX7V7y1iNKKMuh"><span style="font-weight:bold">KV 缓存</span><span>：对Transformer的注意力计算进行缓存，在长文本推理时加速效果显著。</span></p>

<p id="f-doxcngRhHGJsLsNfNVX0jlYSVEY"><span style="font-weight:bold">FlashAttention: </span><span> 一种针对Transformer的注意力计算的高效实现方法，可以显著减少内存占用并提升计算速度，特别适用长序列推理场景。</span></p>


<a id="section-0215"></a>
## 蒸馏

<a id="f-doxcnxrN1fCWYvQFIpCkCdfKsSe"></a>

<p id="f-doxcnbq8FHvAtMnSFgsga5MEkSe"><span>模型蒸馏是一种</span><span style="font-weight:bold">模型压缩和知识迁移技术</span><span>，主要用于将一个复杂、性能强大的模型（通常称为“教师模型”）的知识传递给一个</span><span style="font-weight:bold">更小、更高效</span><span>的模型（称为“学生模型”）。它的核心目标是</span><span style="font-weight:bold">在保持模型精度的同时降低计算成本和存储需求。</span></p>

<p id="f-doxcnB1MyEznh2yK1vU4msJYSCh"><span>具体做法是把教师模型的</span><span style="font-weight:bold">输出作为额外的监督 </span><span> 和</span><span style="font-weight:bold">学生模型的输出</span><span>做对比，通过优化损失函数来训练学生模型。</span></p>

<p id="f-doxcntosqS6WWhrvh9KrCOIoTTf"><span style="font-weight:bold">为什么要做模型蒸馏？</span></p>

<p id="f-doxcn5135Su45d4llchrRV4DyZK"><span style="font-weight:bold">部署需求</span><span>：大型模型在移动端、嵌入式设备或低算力环境中难以运行。</span></p>

<p id="f-doxcnbr6fSMU7AshUtsJAvAlGWd"><span style="font-weight:bold">推理速度</span><span>：小模型推理更快，适合实时应用。</span></p>

<p id="f-doxcni75UaNDZ3HfINZQlneAAzg"><span style="font-weight:bold">节省资源</span><span>：减少内存占用和能耗。</span></p>

<p id="f-doxcne1uVjBrVyG7bXhqHeoNRPe"><span style="font-weight:bold">具体做法</span></p>

<p id="f-doxcnVdBX8IfNSujODhsleJ1MGg"><span>在训练过程中，教师模型会输出对每个数据的预测分布，这些分布包含了每个类别的概率，就像老师教学生做选择题的时候，不仅会给出正确答案，也会标注出其它选项为什么不正确。 </span></p>

<p id="f-doxcnyzblDEtaAqS2gyEDceDNWe"><span>随后通过知识蒸馏，学生模型使用教师模型的软标签来进行学习。这个过程包含两个目标：一是让学生模型学会在分类任务上给出准确的答案，二是模仿教师模型的预测分布，尽量让自己的输出和教师模型相似，这样可以让学生模型在不增加参数的情况下更快，更好地学习到知识，在实际应用中也能更高效运行。</span></p>


<a id="section-0216"></a>
## 量化

<a id="f-doxcnOVbdL155AOJwxssCEQCM6g"></a>

<a id="f-doxcnN3FLSejJSK48itNRaLgAgc"></a>

##### 常见量化方法

<p id="f-doxcny0bABGDdr7pCSqgo4e111M"><span style="font-weight:bold">训练后量化（PTQ, Post-Training Quantization）</span></p>

<ul><li id="f-doxcnP7wK8c81BJyEmqkhYVPczg"><span style="font-weight:bold">特点</span><span>：在模型训练完成后，将浮点权重和激活转换为低精度（如 INT8）。</span></li></ul>

<ul><li id="f-doxcnKtUvjxH2jloNiHJCbKiXUd"><span style="font-weight:bold">优点</span><span>：实现简单，计算成本低。</span></li></ul>

<ul><li id="f-doxcndXkRzVIFoAalrOfY7cnWLd"><span style="font-weight:bold">缺点</span><span>：没有在训练过程中考虑量化误差，精度可能下降明显，尤其是对复杂模型。</span></li></ul>

<p id="f-doxcnIiouB1M0YqJpmxouhF59Nh"><span style="font-weight:bold">量化感知训练（QAT, Quantization-Aware Training）</span></p>

<ul><li id="f-doxcnx9W8mSVnpn0hPqBC18Uz1b"><span style="font-weight:bold">特点</span><span>：在训练过程中模拟量化操作（如插入伪量化节点），让模型在训练时“感知”量化带来的误差。</span></li></ul>

<ul><li id="f-doxcngaJkNqON9B175JHmAkyxDg"><span style="font-weight:bold">优点</span><span>：精度接近浮点模型，因为训练过程考虑了量化。</span></li></ul>

<ul><li id="f-doxcnpOEF8bcRhwYo1gUCcd3gHe"><span style="font-weight:bold">缺点</span><span>：训练成本高，需要从头训练或至少进行完整的训练周期。</span></li></ul>

<p id="f-doxcnswZ3mW2RAiNRhqgS76rbPb"><span style="font-weight:bold">量化感知微调（QAF, Quantization-Aware Fine-tuning）</span></p>

<ul><li id="f-doxcnhBnvyM0aUTwtSSLnUF8Fvc"><span style="font-weight:bold">特点</span><span>：不是从零开始训练，而是基于一个 </span><span style="font-weight:bold">预训练模型</span><span>，在微调阶段加入量化感知操作。</span></li></ul>

<ul><li id="f-doxcnnozuXTXXjClDyio1PA21qd"><span style="font-weight:bold">优点</span><span>：比 QAT 成本低，因为只需要微调而不是全量训练。</span></li></ul>

<ul><li id="f-doxcnCpIWYU6PN8RLCnHf3ES86d"><span style="font-weight:bold">缺点</span><span>：精度可能略低于完整 QAT，但通常比 PTQ 好很多。</span></li></ul>

<a id="f-doxcn2sbSVRbu2LJno4XWeN3Z1e"></a>

##### 量化的好处和坏处

<p id="f-doxcnG8lvoYGPysMpiPEJfB0GJF"><span>（小红书面试官问过，算是基本概念题，简单理解背诵下）</span></p>

<p id="f-doxcnypfQahR2SBEy231UcCOYFe"><span style="font-weight:bold">好处</span></p>

<p id="f-doxcnIPeS6XYnGkKJ5wDMahE8Bh"><span style="font-weight:bold">降低计算和存储成本</span></p>

<ul><li id="f-doxcnpyNkvsyjZQOlt8RrVZzg1e"><span>将 FP32 转换为 INT8 或更低精度，可以显著减少</span><span style="font-weight:bold">内存占用</span><span>和带宽需求，提升推理速度，降低能耗，尤其适用于边缘设备和移动端。</span></li></ul>

<p id="f-doxcnuYsncpbt4PhGeVOHtBfUZe"><span style="font-weight:bold">支持大模型在有限硬件上运行</span></p>

<ul><li id="f-doxcnrRJr52w7fj7wP3noU51Uy9"><span>例如 QLoRA 技术通过 4-bit 量化，使 650 亿参数的大模型可以在单张 48GB GPU 上微调，保持接近原始性能。 </span></li></ul>

<p id="f-doxcnHbtWtxe84OjzI0LXzb9lSg"><span style="font-weight:bold">降低部署成本</span></p>

<ul><li id="f-doxcnzMauMxTRhSn1pLTcGJ83Ni"><span>在生产环境中，量化可以减少硬件资源需求，降低整体运营成本，提升模型的可扩展性</span></li></ul>

<p id="f-doxcnpFchtnkFUYGlSWOH2xepNe"><span style="font-weight:bold">坏处：</span></p>

<p id="f-doxcnFSIbGynDInlnQqe23EpXYf"><span style="font-weight:bold">精度下降</span></p>

<ul><li id="f-doxcnJXDleRAbBvkXs9iyWCJKjh"><span>低精度表示范围有限，可能导致</span><span style="font-weight:bold">权重和激活值的细微差异被放大。</span><span>这会导致：模型在分类、预测等任务上可能出现轻微性能损失，尤其是对数值敏感的任务，性能下降比较明显。</span></li></ul>

<p id="f-doxcn5OK9UAjCZg1luFB6eOYkGc"><span style="font-weight:bold">累积误差</span></p>

<ul><li id="f-doxcnxl00Zy0gqPulCbm3YhgRNc"><span>在深层网络中，量化误差会逐层累积，影响最终输出，尤其在</span><span style="font-weight:bold">注意力机制或归一化等算子中表现明显</span><span>。这会导致模型在复杂推理任务中表现明显下降。</span></li></ul>


<a id="section-0217"></a>
## 剪枝

<a id="f-doxcntCSeJZMeQaKhk4j5xQjt4e"></a>

<p id="f-doxcnsghwnKmT2r0DCFEWIq9SGb"><span>去除神经网络里不重要的连接或者神经元。可以减少模型参数，提升推理速度，对于移动和嵌入式设备友好，因为去掉了冗余信息，可以降低过拟合的风险，提高泛化能力。缺点是精度损失问题。不同的模型和硬件对于剪枝的适应程度也不同。</span></p>

<a id="f-doxcnvBoWWbKL820qAmcbN40CqZ"></a>

##### 常见的剪枝方法

<p id="f-doxcnCIongzCr3eMswqYtnqWQEc"><span>非结构化剪枝：随机移除单个权重或者连接，压缩比大，但是对于推理速度提升不大。</span></p>

<p id="f-doxcnieBEF9buxJA4IT5AXZvpXd"><span>结构化剪枝：按照一定规则，比如移除整个神经元，滤波器或者层，更加适合硬件加速。</span></p>


<a id="section-0218"></a>
## 二值化

<a id="f-doxcnfPVSeZ3kqyR8noHkf8aEJe"></a>

<p id="f-doxcnVk1aSeU1dtNORXlul3kmZg"><span>极端的量化技术，它把神经网络的权重和激活值限制在了两个值上，通常是+1, -1。</span></p>


<a id="section-0219"></a>
## 模型压缩技术的选择

<a id="f-doxcnPZQi5dMkVGXkBDTbPPpT3c"></a>

<p id="f-doxcn4l4pZ8rPwMDkglWHA8Zy1f"><span>在极端资源受限的场景下，二值化和量化是优先考虑的技术。</span></p>

<p id="f-doxcn3EllZDYOPdbg6qJmKaVwab"><span>二值化适合精度不高的任务，量化可以调整压缩精度，在压缩效果和模型性能之间找到平衡。</span></p>

<p id="f-doxcnjHgIC0J9zy6Q1L6ym98Zwb"><span>如果更加注重计算效率，希望显著提升模型的推理速度，同时对模型精度还有一定要求，那么量化和结构化剪枝是不错的选择。</span></p>

<p id="f-doxcnZXvkOxgJmPh19eLGDDJFWf"><span>如果目标是在保持模型性能的前提下进行压缩，那么知识蒸馏就是理想之选。</span></p>


<a id="section-0220"></a>
## 常见的推理框架

<a id="f-doxcnMTOpdh40yjUdOGB3kLMxHh"></a>

<p id="f-doxcnMT9mGLdDC0ZclwlQBgKpZ2"><span>（在说到熟悉推理这块，面试官很可能会问你熟悉哪些推理引擎，最好都有一个了解，结合你用的引擎深入了解）</span></p>

<div id="f-doxcnH1GGwIivRGHvzsvE8PPpbf"><img alt="" decoding="async" height="296" loading="lazy" src="/images/agent-learning/5bcc4741d6d22f9e7a3a2910.png" width="897"/></div>

<a id="f-doxcnGwSv9kGUTNOFFG6Lns9eGf"></a>

##### 为什么Llama.cpp 的在cpu上效果更好？

<p id="f-doxcnICe8C0K9stXz1TDuzr7NOh">该学习案例使用 llama.cpp 替代 ONNX Runtime，在 CPU 上比较了同一模型的推理速度。原案例报告速度提升一倍以上；可结合硬件、量化和任务条件复现对比。</p>

<ol start="1"><li id="f-doxcnbpE6DPzor2gtAj9qWKfMOd"><span style="font-weight:bold">内核优化</span><span>：llama.cpp 针对 LLM 做了高度融合的算子（注意力、RoPE、KV cache），减少框架调度和内存拷贝；ONNX Runtime是通用框架，算子分发和调度开销更大。</span></li></ol>

<ol start="2"><li id="f-doxcnn0buyLmVkDiJLhMxUclhCc"><span style="font-weight:bold">线程与缓存策略</span><span>：llama.cpp会主动优化线程亲和、NUMA绑定、缓存布局，KV cache访问更高效；ORT默认设置如果没调优，容易出现带宽瓶颈。</span></li></ol>

<ol start="3"><li id="f-doxcnQcsca1DXs0BfGVNvQ4b0Oh"><span style="font-weight:bold">指令集利用</span><span>：llama.cpp直接用AVX2/AVX-512等SIMD指令，针对矩阵乘法和量化内核做了手工优化；ORT依赖通用库，优化程度不如专用实现。</span></li></ol>

<p id="f-doxcnK1gapDeQm7JDhXBqlHrfLV"><span style="font-weight:bold">一句话总结</span><span>：即使模型和量化相同，llama.cpp在CPU上更快，是因为它是专门为LLM推理做极致优化的，而ONNX Runtime是通用框架，调度和内存管理开销更大</span></p>

<p id="f-doxcnY7pMYaldbP18DHFz7ydrdS"><span style="font-weight:bold">7.2 介绍一下vLLM 框架</span></p>

<p id="f-doxcnCJYdOzxuD5i5sbm15fPJnf">vLLM 可以从设计思路、特点与整体机制三个方面学习。</p>

<p id="f-doxcnR6UwpXUg0JZgfntgzJozOh"><span style="font-weight:bold"> 1. 设计思路</span></p>

<p id="f-doxcnE5dVeVO7aKExMB2jTwBxPe"><span>vLLM 的核心目标是解决 </span><span style="font-weight:bold">大语言模型推理的高并发和显存瓶颈问题</span><span>。传统推理框架在处理长上下文或多请求时，KV 缓存占用显存过大且容易碎片化，导致性能下降。</span><br/><span> vLLM 的设计理念是通过 </span><span style="font-weight:bold">PagedAttention</span><span> 技术，将 KV 缓存分页管理，类似操作系统的虚拟内存分页机制，</span><span style="font-weight:bold">显存复用率高</span><span>，适合长上下文和多请求场景，从而实现</span><span style="font-weight:bold">高效的显存利用和动态批处理</span><span>。</span></p>

<p id="f-doxcnJE6eAzQdptGKw4pm2v1s6x"><span style="font-weight:bold">2. 特点</span></p>

<p id="f-doxcnDpI0GyN5D24ElXaeeqG7TG"><span>PagedAttention技术： 将kv缓存按页管理，避免显存碎片化，支持灵活调度。 </span><span style="font-weight:bold">显存复用率高，支持长上下文和多请求场景。</span></p>

<p id="f-doxcnQDqoyJzu7PPjZhSbu2mjcc"><span>动态批处理：异步调度器可以将不同请求合并，提高GPU利用率，降低延迟。</span></p>

<p id="f-doxcnovpSR2A2AH3IMgmwKUi9Se"><span>高兼容性：支持HuggingFace Transformers模型，几乎无需修改代码即可接入。</span></p>

<p id="f-doxcnkIdsAxx5dnZemZ5UldBPT0"><span>      分布式推理：支持多GPU，多节点部署，适合大规模服务。</span></p>

<p id="f-doxcncRDWvTgDk9UUGUuLYqf5Xb"><span style="font-weight:bold">3.</span><span style="font-weight:bold">总结</span></p>

<p id="f-doxcnTaW90JVNrEnChbH2ZIwiug"><span>vLLM的核心创新是PagedAttention + 动态批处理。解决了传统推理框架在显存管理和并发处理上的痛点，显著提升吞吐量和资源利用率。相比于其它框架，vLLM 更适合 </span><span style="font-weight:bold">在线高并发推理，</span><span>尤其在长上下文和显存受限的情况下表现突出。</span></p>


<a id="section-0221"></a>
## 你的项目是如何做推理加速的？

<a id="f-doxcn0XskrHYWieZNIKvk88pjch"></a>

<p id="f-doxcnXuu5gObTB4xVAYmbzXQsqo"><span>（ 这个问题是我给面试官准备好的，该学习案例中是如何使用 </span><span style="font-weight:bold">LoRa + 强化学习DPO + 量化 + 推理，来完成将Qwen2.5-7B-Instruct 模型 适配在CPU 电脑上，极大降低推理延迟，提升推理速度，并且提升任务质量的</span><span>。 </span></p>

<p id="f-doxcn1etRd81rXAcDUHoYinMyIf">下面将模型微调与推理加速知识应用到学习案例，说明背景、技术、使用方式、选型理由与效果验证。</p>

<p id="f-doxcn8HEqsJgSLm0WhyNYBv8imc"><span>我负责优化邮件日历事件提取的模型性能。</span><span style="font-weight:bold">背景是</span><span>用户需要从邮件快速创建日程，但云端API延迟2-3秒且按调用计费，不适合高频场景。</span><span style="font-weight:bold">我的方案是</span><span>本地部署微调后的开源模型Qwen2.5-7B-Instruct，通过三步优化实现性能和成本的平衡。</span></p>

<p id="f-doxcntXzL5MXYkpSdGWUW77Grxc"><span style="font-weight:bold">第一步是LoRA微调，</span><span>使用</span><span style="font-weight:bold">PEFT库</span><span>实现低秩适应，只训练0.18%参数（1400万 vs 76亿），将任务准确率从基础模型的65%提升到92%。选</span><span style="font-weight:bold">择LoRA而非全量微调是基于成本和效率考虑，能够显著降低显存需求和训练时间</span><span>，同时保持接近全量微调的效果。训练数据来源包括：</span><span style="font-weight:bold">真实用户邮件标注样本、GPT-4生成的合成数据，以及Enron Email Dataset公开数据集</span><span>，共500条样本，在Azure AI Foundry上训练完成。</span></p>

<p id="f-doxcnkt3idsiyJ7qKvSDTgZearb"><span style="font-weight:bold">第二步是DPO对齐，</span><span>使用</span><span style="font-weight:bold">TRL库</span><span>的Direct Preference Optimization进一步优化输出质量。构建了200对'chosen-rejected'偏好数据：chosen样本来自人工标注的高质量输出，</span><span style="font-weight:bold">rejected样本通过规则扰动（添加冗余字段、格式错误、信息缺失）生成</span><span>，</span><span style="font-weight:bold">并混合了少量GPT-4生成的负样本</span><span>。在LoRA基础上训练1小时，将JSON格式规范性从85%提升到98%，显著减少了解析错误和冗余输出</span><span style="font-weight:bold">。</span></p>

<p id="f-doxcnPpiGEmMMIAtaeDgFACUTlg"><span style="font-weight:bold">第三步是量化部署</span><span>，这里做了技术选型：对比了ONNX Runtime、PyTorch Mobile和llama.cpp三个方案。最终选择llama.cpp是因为它CPU推理做了深度优化，包括</span><span style="font-weight:bold">SIMD并行计算</span><span>和</span><span style="font-weight:bold">内存管理优化</span><span>，比ONNX快2.5倍。量化使用</span><span><span><span>torch.ao.quantization</span></span></span><span> 库，方案采用Q4_K_M混合精度Post-Training Quantization：Attention层保持5-bit精度，FFN层压缩到4-bit，输出层用6-bit确保质量。最终模型从14GB压缩到4.3GB，推理速度从154秒降到43.7秒，提升3.5倍，同时准确率只损失2.5%（92%→89.5%），在可接受范围内。</span></p>

<p id="f-doxcnqdRuJ6i6CeyjDIGZpCA0Ic"><span style="font-weight:bold">这个项目的价值</span><span>在于：通过参数高效微调（LoRA）和训练后量化（PTQ）的组合，在不牺牲太多精度的前提下，将云端依赖转为本地部署，成本从按次计费降为零边际成本，同时满足了实时响应需求。技术选型上，llama.cpp在CPU推理上的性能优势是关键决策点，使得无GPU环境也能高效运行7B模型。</span></p>


<a id="section-0222"></a>
## 参考资料

<a id="f-doxcns1ZxSCmFy2ti4rjFSYkA4b"></a>

<p id="f-doxcnZMzeiEHaghqgfvSjrzKp1g"><span>模型压缩四大方法概述 | 量化、剪枝、蒸馏和二值化 </span></p>

<p id="f-doxcnt6PgMGLpRJP1n0jD0aXeLl"><span>推荐理由：特别适合快速了解这四个技术，是干什么的，怎么做，有哪些常见方法，不深入讲解公式和原理，小白也能听懂。</span></p>

<p id="f-doxcnz4rVHBEOol5i748zWWXqTh"><span><span><a href="https://www.youtube.com/watch?v=jW2cmZ-9hLk"><span>https://www.youtube.com/watch?v=jW2cmZ-9hLk</span></a></span></span></p>


<a id="section-0288"></a>
## 算法理论与项目

<a id="f-doxcnH4LTSdRSP70XiVy6y1Mnp7"></a>

<p id="f-doxcnUpIPWtujczPnY1VU3atyke"></p>

<p id="f-doxcnnrylDco7clitaZhECQRIQb">先理解深度学习、机器学习、部署、训练、LoRA 与强化学习的基本概念，再按照本节记录的顺序实践。</p>

<p id="f-doxcnQFlmKJaDIaRu7Mpvv37Ash">根据现有硬件安排学习和实验，先理解基础，再逐步进行训练、微调与推理实践。</p>

<div style="margin-left:25px"><h2 id="f-doxcnZ4P7jBtyWfQC3vS2LJWiag"><span>1 学习路线确定</span></h2><p id="f-doxcnkIIpBEZ5WRGs7JZLqhtXAf">先根据基础确定学习路线，再按照阶段安排实践。</p><p id="f-doxcnx4ECWtvVhxpH1SdOSe1mFf"><span>      学习大模型算法分三条路：数学+传统技术+大模型技术。</span></p><p id="f-doxcnMNBeIQFhaCFEwtQ5vlQfde"><span>算法包含：</span><span style="font-weight:bold">微积分，概率论，线性代数，高等数学</span><span>。 </span></p><p id="f-doxcn7655VmKAUQJJaVZjymeBFs"><span>传统技术：</span><span style="font-weight:bold">git, linux,python pytorch, 深度学习。</span><span> 注意啊，对于不是特别高端的算法岗，算法不是拉开差距的核心。 所以最开始不用啃得特别细致，甚至去做高等数学题目，但是需要有个印象。比如讲到深度学习，求偏导是啥，得有个概念。</span></p><p id="f-doxcno9OIYQXyimYFvCD64YEeMc"><span>大模型：transformer,  RAG, Agent 之类的。</span></p></div>

<div style="margin-left:25px"><p id="f-doxcnEYcfUXEdeCoyzN7cOIVfre">根据现有基础补齐 Git、Python、Linux，再结合大模型应用概念进行实践。</p><p id="f-doxcn9ubs7m5Rns6sd5Ot0WzdPh"><span>综上，跑一些手写分类啊，Dropout的例子，应该很快，这里再打一下理论基础，唤醒之前的记忆。然后主要关注在大模型行业的训练，微调，找一些项目试一下，再实践一些复杂的例子，比如动手写出transformer，调试之类的，上手到模型的DPO, PPO，最后做一个项目，读一些论文，然后面试试一下，再根据面试反馈不断迭代。</span></p><p id="f-doxcnXgDwWAX40c5UhiHEB7Qsmg"><span> 对于学生来说，你可以花更多时间学基础知识。对于其他社招的程序员来说，其实你也应该看到，大模型算法这块门槛会高一些，对于深度学习，机器学习有难度。</span></p><p id="f-doxcnbrXnLVF3FJBVRJIfUrOP9r"><span>对于大家来说呢</span></p><p id="f-doxcnnA9ZpIYjU0Ii3gsA11veOg"><span>1. 社招，之前做开发的，建议先去学大模型应用。要学的少一些。如果学习能力特别强，时间多，包括在学校学的专业课，比如深度学习，数学都学得比较好，你可以激进一点，就直接目标定位大模型算法。如果你的基础比较差，比如对于深度学习，机器学习都没概念，甚至是上学没学过，可能是本科生，对于数学，微积分那些也都忘光了。还是建议慎重直接挑战大模型算法的。</span></p><p id="f-doxcnIjTkNIH86uA3CAZ9CYqyAe">2. 有算法基础时，可以补齐大模型相关知识，同时学习 Agent、RAG，并结合本节项目实践。</p><p id="f-doxcnOLyQbkV3Pp9i17vUEz9Zsg"><span>3. 校招生，如果你马上着急找工作，根据自己情况觉得是找一个大模型应用项目更容易，还是算法容易，然后弄个项目刷实习，不断学习，比如从3月学到7月找暑期，找到暑期继续学习找秋招，再学习到明年3月甚至能找春招。</span></p><p id="f-doxcnHH0x9UMPGZpF0Dv6KDC8Qe"><span>4. 校招生，不着急找工作的。理论知识先学好吧，学习得更细致，比如深度学习的课程之类的，到了快找实习的阶段，参考上面几条，准备项目，刷实习，找工作。</span></p><h3 id="f-doxcnTQjf6SZkGr1ZemEAwsr6yf"><span>1.1 参考视频</span></h3><p id="f-doxcnKY78lxlqu3kG5yIoT1x5Cd"><span> 该视频讲解了大模型算法学习路线（10分钟）。只讲大的学习方向，没讲具体技术。</span></p><p id="f-doxcnXL3w5ZkltcAszBJRrIvxLf"><span><span><a href="https://www.bilibili.com/video/BV1nNkFBMEDS/?spm_id_from=333.337.search-card.all.click&amp;vd_source=144bec9c3f54e465073138bed788be1b"><span>https://www.bilibili.com/video/BV1nNkFBMEDS/?spm_id_from=333.337.search-card.all.click&amp;vd_source=144bec9c3f54e465073138bed788be1b</span></a></span></span></p><p id="f-doxcnOGvyUD4TDnILEAcW8vg2cc"><span>从技术角度拆分哪些是重点，比如预训练用得比较少啊，SFT更重点呀，哪些论文要学习啊，数据工程之类的。（19分钟）</span></p><p id="f-doxcnBSsOVzd017m7UuR8Yzh7zd"><span><span><a href="https://www.bilibili.com/video/BV1ix6UBcEp2?spm_id_from=333.788.videopod.sections&amp;vd_source=144bec9c3f54e465073138bed788be1b"><span>https://www.bilibili.com/video/BV1ix6UBcEp2?spm_id_from=333.788.videopod.sections&amp;vd_source=144bec9c3f54e465073138bed788be1b</span></a></span></span></p><p id="f-doxcnlKX8tr5749cP6w88pyxckb"><span>快速入门深度学习，机器学习：</span></p><p id="f-doxcnyipzKDEc7xPE3kgOCC9Ziq"><span><span><a href="https://www.bilibili.com/video/BV1eP411w7Re/?spm_id_from=333.337.search-card.all.click&amp;vd_source=144bec9c3f54e465073138bed788be1b"><span>https://www.bilibili.com/video/BV1eP411w7Re/?spm_id_from=333.337.search-card.all.click&amp;vd_source=144bec9c3f54e465073138bed788be1b</span></a></span></span></p></div>

<p id="f-doxcnXpNp1KMbbvfz3rji4W5YZc"><span>我们的学习目标是为了快速完成一个项目</span></p>

<p id="f-doxcnCvSFDnPrcaXNS2lB6mjI6f"><span>1. </span><span style="font-weight:bold">Pytorch/深度学习入门</span><span>：学习掌握Pytorch/深度学习的基本知识，从张量，到梯度，前向/反向传播等经典概念，到网络模型CNN,RNN再到Transformer,GPT。了解基本概念，Pytorch用法，训练，模型推理的代码。这里把Pytorch和深度学习放一起是因为本身Pytorch就是去搭建深度学习的，所以在整个课程中，学习的时候就会涉及到深度学习的基本概念，所以这两个一起学，学习方法看第2点。</span></p>

<p id="f-doxcnTGH3fLFiaw21oROhX2Vvoe"><span>2.</span><span style="font-weight:bold"> 后训练学习:以SFT + GRPO展开</span><span>，也就是现在面试最常考的内容，深入代码细节和理论，学习算法数理公式，为后续的项目做准备。</span></p>

<p id="f-doxcnSyaAfoadSOwR6Vqi5BRWBb"><span>3.</span><span style="font-weight:bold"> 开源项目/论文阅读</span><span>：有了理论基础，看一下典型的开源项目和实现，做技术调研和选型，为后面做项目做准备。</span></p>

<p id="f-doxcnptkRPdulZ3tq6qHEc7eVgc"><span>4. </span><span style="font-weight:bold">小项目</span><span>：确定一个方向，比如提升模型数学推理能力，然后使用SFT + GRPO 进行训练，准备测试集，跑测试结果，把完整规范的训练，测评，调试，迭代的逻辑走一遍，完成代码，写一个小论文（不是发布的那种，类似结题报告，说明原理，做的事，逻辑，参考论文）。</span></p>

<p id="f-doxcnEz43HE92YgOdEtRikwktTf">图中展示三个 Skill 对应的课程内容，覆盖后训练的基本理论，可以结合对话、提问和复习学习。</p>

<div id="f-doxcn0mQYRxOxSlKKdfiq5AKFGg"><img alt="" decoding="async" height="853" loading="lazy" src="/images/agent-learning/ea43e08101fa11f7f394c681.png" width="1280"/></div>


<a id="section-0289"></a>
## Pytorch/深度学习入门

<a id="f-doxcnHDFHrdczLwckw4zcqGW1qc"></a>

<p id="f-doxcnipzdqMY71ItGXAWmAtVN1d">可以使用教学 Skill 学习 PyTorch，并结合课程、考试与测试检验学习效果。</p>

<p id="f-doxcnkRtoN9vS9QVaKklU1pXrTb"><span>我想谈一下使用该SKILL注意事项和说明：</span></p>

<p id="f-doxcnMCKBdxzDvwlQvg1IMDZKMc"><span>1. AI的文字表达能力和讲解能力是非常不错的，比很多书籍和文章讲得更清楚，并且还能实时提问。在学习的过程中要思考和AI交流，提问。根据AI和你说的知识点，把它想清楚。</span></p>

<p id="f-doxcn5LzL6ORjVl5V8GzRgfe7Fc"><span>2. 不要完全依赖于这个SKILL，这是一个必须学习的路线和一个非常好的老师。但是如果这个老师和你讲知识点的时候，某个点你就是理解不了，可以反复和它提问，查找对应的视频教程。比如你就是理解不了张量，那么可以b站,youtube搜一下讲张量的视频。也许通过视频的形式你会豁然开朗。</span></p>

<p id="f-doxcn7z9itePFx6s3lTveuvtFSc"><span>3. 基础不好的，学起来吃力的，可以学慢一点，或者反复两遍。跟着AI多找一下其它的资料，视频去理解，多提问。要是真的能掌握这个课程的内容，那就是入门了深度学习和Pytorch，这是算法必经之路，也没有那么容易。相较而言，这套路线其实已经是快速入门，面向着找工作为目标的精简版本了。</span></p>

<div id="f-doxcnfmw5WhdGKvTn7f7XRfG3Ef"><img alt="" decoding="async" height="1084" loading="lazy" src="/images/agent-learning/1bf52ca4c40d625ef6d1f881.png" width="1037"/></div>


<a id="section-0290"></a>
## 视频讲解

<a id="f-doxcnL5x2vkLYmzjEvBEMQY5BYe"></a>

<p id="f-doxcnaMLkuCEXfS0PebYxXtT5cf">PyTorch 学习路线讲解视频。</p>

<p id="f-doxcny13LmjEjI8eJWyMpSKfgTe"><span><span><a href="https://www.bilibili.com/video/BV1MYwvzvEFL/?vd_source=144bec9c3f54e465073138bed788be1b"><span>https://www.bilibili.com/video/BV1MYwvzvEFL/?vd_source=144bec9c3f54e465073138bed788be1b</span></a></span></span></p>


<a id="section-0291"></a>
## 后训练学习

<a id="f-doxcnN7QiLzpfDYcjrhN5sZUdib"></a>

<p id="f-doxcnP9SQuuH3r9cyV0GTFLUudd"><span>这一阶段讲解了后训练相关内容，什么是后训练？就是SFT（LORA,QLORA), 强化学习(PPO, GRPO) 这些东西。想必大家看到这个东西应该也能感受到这个部分在面试中经常出现吧。</span></p>

<p id="f-doxcnDFSu4NFfZJe8m5wccv4Zog"><span>在我们有了一阶段的深度学习的概念，以及Pytorch的基本使用方法的经验时。我就可以开始学习这个阶段，这个阶段主要讲清楚：</span></p>

<p id="f-doxcn9KYPQDaArTndPRGfUIiOdE"><span>强化学习：从它的前置知识（KL, 奖励函数）到PPO, 到GRPO，理解起来是有一定难度的。</span></p>

<p id="f-doxcnWrC8wjKVMitRIMJu8mGZyr"><span>SFT： 相关SFT训练的库，数据集准备，超参数设置。</span></p>

<p id="f-doxcnAYn6UsogUjx6ZCSXx9wQfd"><span>训练技巧：混合精度训练。 数据类型（fp32, fp16,bf16)</span></p>

<p id="f-doxcnbG4IamLsJRlgKFLnvV8it8"><span>最后结合DeepSeekR1的训练技巧，把内容串起来。</span></p>

<p id="f-doxcnwkpOppzbeC2oLcfGOinRHg">数据类型（FP32、FP16、BF16）与 DeepSeek-R1 训练方法等，是后续项目实践需要理解的基础。</p>

<p id="f-doxcnmPwV7rS3pjftOEMI42hqTf">可以使用教学 Skill 的不同讲课风格、Markdown 复习文本与问答方式，循序渐进理解知识；使用方式见 Skill README。</p>

<p id="f-doxcnVxUBeq8zx5sGbbbXioPSJc"><span>SKILL已经整理到下方的资源合集中，和pytorch学习SKILL放在一起了，有需要就学起来吧。</span></p>


<a id="section-0292"></a>
## 视频讲解

<a id="f-doxcnzM2DJBUDfcRsD9jMwrAzZe"></a>

<p id="f-doxcnbZkYkqjO7MO7hPNV0nAf1g">后训练与教学 Skill 使用讲解视频。</p>

<p id="f-doxcnytEufGUShurMyBJrlhEnub"><span><span><a href="https://www.bilibili.com/video/BV1Wp9zBJE6r/?vd_source=144bec9c3f54e465073138bed788be1b"><span>https://www.bilibili.com/video/BV1Wp9zBJE6r/?vd_source=144bec9c3f54e465073138bed788be1b</span></a></span></span></p>


<a id="section-0293"></a>
## 开源项目学习

<a id="f-doxcnLV1ay9rBDRH2EQzYJak1hd"></a>

<p id="f-doxcnD4WZCi51hdCDKTPNcQtxHg"><span>前两个阶段补齐了理论基础，这个阶段偏向于来学习具体训练时对应的库和开源项目。课程主要分为：</span></p>

<p id="f-doxcnPzsVNhdkc5mcMSx9vneNJd"><span>1. 学习库TRL的基本使用方法和代码，这个大概率是我们后面做算法项目，使用的封装好的做训练的库。</span></p>

<p id="f-doxcn3lwMMDL1G7esiNyZIFMDfc"><span>2. 学习OpenRL和SimpleRL的开源项目。体会真实的算法项目，如何组织文件结构，分成哪几部分，我们后面项目也会借鉴它们的组织结构。</span></p>

<p id="f-doxcnm2QoV4xM6bckfMt9MY42vg"><span>3. 最后两小节，AI会和你对话，询问你项目的需求，帮你一起发散思维，思考你的项目是什么，大概参考那些模板，给你一些启发。</span></p>

<p id="f-doxcnt4p77S0WbbZQDNCMXv6IGd"><span>这个阶段会讲到源码，不过时间对源码不用看的特别深。重点内容还是知道</span><span style="font-weight:bold">TRL库是什么，怎么用，开源项目怎么组织目录结构，思考如何复用/借鉴开源项目。</span></p>

<p id="f-doxcnFg184ZpjXK97i5UAuSFHVf"><span>这个阶段学完了，我就开始做自己的算法项目了。</span></p>


<a id="section-0294"></a>
## 后训练算法项目

<a id="f-doxcnIjLgG7Pe2zBY5bPMMqlIRh"></a>

<p id="f-doxcn2hgUFOIIDQgye2F10fQYgd"></p>

<p id="f-doxcnSSL9OhyqZYGZmgsXbZvH6c">学习项目完成的方法，结合文档实际运行，并将相关方法迁移到具体任务中。</p>

<p id="f-doxcnl1GeLO73eH9GQ45XaUSKHh"><span>注意该项目属于开发中，文档会逐步补齐。</span></p>


<a id="section-0295"></a>
## 学习方法介绍

<a id="f-doxcntzTSDKPsVXAE65jzjcn2zc"></a>

<div style="margin-left:25px"><div id="f-doxcn3hYXWQ9ug83I20ZQSGwAld" style="display:flex;gap:0.5em"><span style="min-width:1.5em">a.</span><div><span>首先，算法项目的理论阶段的学习，请看笔记 </span><span><span><a href="#f-doxcnH4LTSdRSP70XiVy6y1Mnp7"><span>0基础学算法</span></a></span></span><span>。 先把前三个阶段理论知识学习，</span><span style="font-weight:bold">深度学习，训练，SFT和强化学习相关内容</span><span>，理论知识先学了。</span></div></div><div id="f-doxcnPmcMiQ9LP1SaDBo25J1LGc" style="display:flex;gap:0.5em"><div><span>可以当故事看，没多少，你知道我整个过程是怎么来的，中间遇到哪些问题和思考。</span></div></div><div id="f-doxcn310I0ajaK75Vh9hJtFf5Pe" style="display:flex;gap:0.5em"><span style="min-width:1.5em">c.</span><div><span>先看</span><span><span><a href="https://github.com/jerry-ai-dev/post-training-slot-extractor"><span>技术文档</span></a></span></span><span>。技术文档是整个项目的细节，要理解它。当然更推荐的方法是去学习整个技术文档如何做的，我在文档中也写了很多心得。因为我做项目，都是先写技术文档，逼迫你想清楚细节，是我做项目的方法论，我也希望你能学会这个写文档的方法，文档里有记录。 同时也有技术文档的</span><span><span><a href="https://www.bilibili.com/video/BV1XSTy6AEMP/?spm_id_from=333.1387.homepage.video_card.click&amp;vd_source=144bec9c3f54e465073138bed788be1b"><span>讲解视频</span></a></span></span><span>。</span></div></div><div id="f-doxcnscFutwNjkDjnO6OSXP1tle" style="display:flex;gap:0.5em"><span style="min-width:1.5em">d.</span><div><span>在技术文档中，我将代码完工的整个流程分成了</span><span style="font-weight:bold">7个阶段</span><span>。每个阶段我会提交一个commit，所以主分支上会有8个commit，初始（只有spec) - stage1 -stage2 -stage 3.. </span></div></div><div style="margin-left:25px"><p id="f-doxcn0LGFBSu9ggPvJDLJW5dK7P">可以切换到各阶段节点，查看对应阶段完成的内容。</p><p id="f-doxcnH0XAfWZe3I4ZIWP4qy4MTe"><span>每个阶段的阶段性spec写在对应的</span><span style="font-weight:bold">docs - spec目录下</span><span>。</span></p><p id="f-doxcnqtGmoG3VmAqwMZ8P43Zhde"><span>对应实施细节写在对应</span><span style="font-weight:bold">docs-plan目录</span><span>下。（这个是superpowers生成的，可以主要看看specs，plans不太用看）。 </span></p><p id="f-doxcn1sKNqYxFv5GHoEyyMRkNNf">每个阶段的代码、关键目标、可运行指令与重点知识见 project-log 对应的 phase 目录。</p><p id="f-doxcny9GkEZu7IA64NSRZS26tHe"></p></div><p id="f-doxcnYIuqel5tHbnJO0bgdvAvBd"><span style="font-weight:bold">1阶段：</span><span> 主要是完成了项目的具体框架，串起来整个流程。这个阶段的学习重点：superpowers的方法论，以及llama.cpp本地部署的知识。详细文档见</span><span><span><a href="https://github.com/jerry-ai-dev/post-training-slot-extractor/tree/master/project-log/phase-01-scaffold"><span>这里</span></a></span></span><span>。 该阶段讲解视频在</span><span><span><a href="https://www.bilibili.com/video/BV1tVN86CEEX/?spm_id_from=333.1387.homepage.video_card.click&amp;vd_source=144bec9c3f54e465073138bed788be1b"><span>这里</span></a></span></span><span>。</span></p><p id="f-doxcnSLvMUR535GnK21i15GRQmh"><span style="font-weight:bold">2阶段：</span><span>完成了Agent的评估。这部分非常重要。即使你不做算法项目，这里也值得学习。Agent评估理论可以先看笔记</span><span><span><a href="/posts/agent-learning-15-evaluation-observability/#f-doxcnqrKdVGPbNYY8Xm3Fr8NVkh"><span>这里</span></a></span></span><span>。 掌握理论基础。整个作为实战例子。文档在</span><span><span><a href="https://github.com/jerry-ai-dev/post-training-slot-extractor/blob/master/project-log/phase-02-eval-baseline/log.md"><span>这里</span></a></span></span><span>。 讲解视频在</span><span><span><a href="https://www.bilibili.com/video/BV1VrKV65EQJ/?spm_id_from=333.1387.homepage.video_card.click&amp;vd_source=144bec9c3f54e465073138bed788be1b"><span>这里</span></a></span></span><span>。</span></p><p id="f-doxcnmADs4xw5GNxsoPWvcxBJ8f"><span style="font-weight:bold">3阶段：</span><span>这阶段最重要的内容，就是创建了后训练 SFT和DPO的数据集，整个阶段数据集如何制作出来的，整个工作流是这个阶段需要学习的。文档在</span><span><span><a href="https://github.com/jerry-ai-dev/post-training-slot-extractor/tree/master/project-log/phase-03-dataset"><span>这里</span></a></span></span><span>，讲解视频在</span><span><span><a href="https://www.bilibili.com/video/BV1ZogX6gE4o/?spm_id_from=333.1387.homepage.video_card.click&amp;vd_source=144bec9c3f54e465073138bed788be1b"><span>这里</span></a></span></span><span>。</span></p></div>

<p id="f-doxcnuvRDUYY0U0jRDkHJ1Byluh"><span style="font-weight:bold">4阶段：</span><span>4阶段是真正训练了阶段，使用了SFT+DPO进行训练。训练使用AutoDL租卡训练，成本小于20元。文档在</span><span><span><a href="https://github.com/jerry-ai-dev/post-training-slot-extractor/blob/master/project-log/phase-04-training/log.md"><span>这里</span></a></span></span><span>，讲解视频待上传。</span></p>

<p id="f-doxcncrpXTqVLgJu2m2kH0q5ZFe"><span style="font-weight:bold">5阶段：</span><span>5阶段是把训练后的模型合并，量化，得到了最终的模型，同时做了模型测评和展示APP。可以说5阶段做完了以后，整个项目的所有的功能都已经做完，剩下的内容是优化，提升数据，写报告了。文档在</span><span><span><a href="https://github.com/jerry-ai-dev/post-training-slot-extractor/blob/master/project-log/phase-05-quantization-deploy/log.md"><span>这里</span></a></span></span><span>，讲解视频在</span><span><span><a href="https://www.bilibili.com/video/BV1NPbi6EEPx/?spm_id_from=333.1387.homepage.video_card.click&amp;vd_source=144bec9c3f54e465073138bed788be1b"><span>这里</span></a></span></span><span>。</span></p>

<p id="f-doxcn3ZBu3he3QhtfVb3pzyzDbc"><span style="font-weight:bold">6阶段：</span><span>6阶段进行了进一步模型训练，提升模型的性能。同时分析推理速度的瓶颈，寻找最佳的推理框架配置和参数。文档在</span><span><span><a href="https://github.com/jerry-ai-dev/post-training-slot-extractor/blob/master/project-log/phase-06-iteration/log.md"><span>这里</span></a></span></span><span>，其中的每一个阶段性实验结论可以看</span><span><span><a href="https://github.com/jerry-ai-dev/post-training-slot-extractor/tree/master/experiments/phase06"><span>这里</span></a></span></span><span>。讲解视频在</span><span><span><a href="https://www.bilibili.com/video/BV11yhN6iEcq/?spm_id_from=333.1387.homepage.video_card.click&amp;vd_source=144bec9c3f54e465073138bed788be1b"><span>这里</span></a></span></span><span>。</span></p>

<p id="f-doxcnjAODBFETGzloqITqjHh1dg"><span style="font-weight:bold">7阶段：</span><span> 7阶段是项目的最后一阶段。我们写了一个最终的报告，如果你前面的阶段都不想看，只想拿着项目直接用，不想自己做，那么7阶段的报告可以说是必须看的内容，也是面试前的突击梳理，总结的都是最核心的内容。 文档在</span><span><span><a href="https://github.com/jerry-ai-dev/post-training-slot-extractor/blob/master/reports/final-project-report.md"><span>这里</span></a></span></span><span>，讲解视频在</span><span><span><a href="https://www.bilibili.com/video/BV1fcbT6dEd6/?spm_id_from=333.1387.homepage.video_card.click&amp;vd_source=144bec9c3f54e465073138bed788be1b"><span>这里</span></a></span></span><span>。</span></p>


<a id="section-0296"></a>
## 项目地址

<a id="f-doxcnD2yKyrUKWavYIEmsA4T2be"></a>

<p id="f-doxcnTRMj9uGMmBz4cHVk58ZJgc"><span>项目地址在</span><span><span><a href="https://github.com/jerry-ai-dev/post-training-slot-extractor"><span>这里</span></a></span></span></p>


<a id="section-0297"></a>
## SKILL资源

<a id="f-doxcnlpFz8R3wkGrZAo6j0clqD7"></a>

<p id="f-doxcnm4x0IT6WQ6xemdOE5LFWVb"><span><span><a href="https://github.com/jerry-ai-dev/SKILLS/tree/main"><span>https://github.com/jerry-ai-dev/SKILLS/tree/main</span></a></span></span></p>


<a id="section-1591"></a>
## Hugging Face Transformers

<a id="t-block-22390"></a>

<p id="t-sBG0Mhe3eaTGe2HV6m7ybj"><span>Hugging Face Transformers 是目前最流行的开源 NLP / AI 库，提供数千个预训练模型，覆盖文本、图像、音频、多模态等几乎所有 AI 任务。</span></p>

<p id="t-W1JG41E1BBzWj6hkBqpBPG"><span>它的核心价值：把复杂的模型加载、推理、训练流程封装成几行代码。</span></p>

<div id="t-cuSl2scjrE8dByZFQ4fgb0"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/45d500b8986db4567724e907.png"/></div>


<a id="section-1592"></a>
## 支持的任务类型

<a id="t-uB6l0v637Qigdlsz8MW3Yg"></a>

<div id="t-bA1LVkuS4B8QQxq5sBeCtB"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/c342d755627c193f8846d6bd.png"/></div>


<a id="section-1593"></a>
## Transformer 架构核心原理

<a id="t-iYThhz5lHOYmBfOq3mKtQ6"></a>

<p id="t-W1CCLYNht7otEJLHjDHuHC"><span>在使用库之前，理解底层架构会让你知道为什么这样调参。</span></p>


<a id="section-1594"></a>
## 整体架构：Encoder-Decoder

<a id="t-wfMyy1xKIgsgEvb6UkUhJI"></a>

<div id="t-dsMoNmIahGsQCvrm8w237M"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/f107ef8a224f01e49c3b55c4.png"/></div>


<a id="section-1595"></a>
## 三大模型家族

<a id="t-j0jvRihkQWfBTKVdhJxzog"></a>

<div id="t-0PKYS5D8fw63jZ4RO5juNE"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/d5a6e9202db967a580a19f19.png"/></div>


<a id="section-1597"></a>
## 安装

<a id="t-Ocdv7ThecjsCkrbXqIUnm1"></a>

<pre id="t-ofsVmSzaErbcIQOvPhcVq1"><code># 基础安装
pip install transformers

# 完整安装（包含训练依赖）
pip install transformers[torch]       # PyTorch 后端（推荐）
pip install transformers[tf-cpu]      # TensorFlow 后端
pip install transformers[flax]        # JAX/Flax 后端

# 常用配套库
pip install datasets          # HuggingFace 数据集库
pip install evaluate          # 模型评估指标
pip install accelerate        # 多GPU/混合精度训练
pip install peft              # 参数高效微调（LoRA等）
pip install tokenizers        # 高性能分词器
pip install sentencepiece     # 部分模型（T5/LLaMA）需要

# 验证安装
python -c "import transformers; print(transformers.__version__)"</code></pre>


<a id="section-1598"></a>
## 环境变量配置

<a id="t-4UljoMrofzhmIZuTRoop23"></a>

<pre id="t-85ZMuQgKXB70GRsOk83rfe"><code># 设置模型缓存目录（模型下载后缓存到此路径，默认 ~/.cache/huggingface）
export HF_HOME=/data/huggingface_cache

# 国内用户：使用镜像站加速下载（推荐 hf-mirror.com）
export HF_ENDPOINT=https://hf-mirror.com

# 离线模式（网络不可用时，只使用已缓存的模型）
export TRANSFORMERS_OFFLINE=1

# 禁用进度条（CI/CD 环境）
export DISABLE_TQDM=1</code></pre>


<a id="section-1599"></a>
## 实例

<a id="t-96LGywqr8SFkH32i1HsDYc"></a>

<pre id="t-1oljo8DX4A7err9Bp1gUYu"><code># 也可以在代码中设置
import os
os.environ["HF_ENDPOINT"] = "https://hf-mirror.com"

# 查看当前缓存目录
from transformers.utils import TRANSFORMERS_CACHE
print(TRANSFORMERS_CACHE)</code></pre>


<a id="section-1600"></a>
## Pipeline：五行代码跑 AI

<a id="t-cuJdFRdjuZuLJaaHCfK7tb"></a>

<p id="t-ltgocAgnagEwuX7RGLmlcr"><span>Pipeline 是 Transformers 最高级别的抽象，把模型加载、预处理、推理、后处理全部封装好，三到五行代码即可完成推理。</span></p>

<div id="t-008mCVjbYjDJJBtRNQoWnM"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/02fef195062f7b8b29c77464.png"/></div>


<a id="section-1602"></a>
## 实例

<a id="t-W65lzbxX1LQvxr0Aa6rNme"></a>

<pre id="t-m64qDoOeHawyPcBbutvZk4"><code>from transformers import pipeline

# 1. 情感分析（文本分类）
classifier = pipeline("sentiment-analysis")
result = classifier("I love using Hugging Face Transformers!")
# -&gt; [{'label': 'POSITIVE', 'score': 0.9998}]

# 2. 文本生成
generator = pipeline("text-generation", model="gpt2")
result = generator("Once upon a time in a land far away,",
    max_new_tokens=50, num_return_sequences=1, temperature=0.8)

# 3. 填空（掩码语言模型）
unmasker = pipeline("fill-mask", model="bert-base-uncased")
result = unmasker("The capital of France is [MASK].")
# -&gt; [{'token_str': 'paris', 'score': 0.9823}, ...]

# 4. 命名实体识别（NER）
ner = pipeline("ner", aggregation_strategy="simple")
result = ner("My name is John and I work at Google in New York.")
# -&gt; [{'entity_group': 'PER', 'word': 'John', 'score': 0.998}, ...]

# 5. 抽取式问答
qa = pipeline("question-answering")
result = qa(question="Who invented Python?",
    context="Python was created by Guido van Rossum in 1991.")
# -&gt; {'answer': 'Guido van Rossum', 'score': 0.9887}

# 6. 文本摘要
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
result = summarizer(article, max_length=60, min_length=20)

# 7. 机器翻译
translator = pipeline("translation", model="Helsinki-NLP/opus-mt-en-zh")
result = translator("Hello, how are you today?")
# -&gt; [{'translation_text': '你好，你今天怎么样？'}]

# 8. 零样本分类（不需要专门训练）
zero_shot = pipeline("zero-shot-classification")
result = zero_shot("I love playing football",
    candidate_labels=["sports", "politics", "technology"])
# -&gt; {'labels': ['sports', ...], 'scores': [0.972, ...]}</code></pre>


<a id="section-1604"></a>
## 实例

<a id="t-eWpInu0Ykrv3GhE8uPbVbh"></a>

<pre id="t-wUR780vk8TdFvzzeS06nc7"><code>import torch
from transformers import pipeline

# 指定 GPU
pipe = pipeline("text-generation", model="gpt2", device=0)

# 指定精度（省显存）
pipe = pipeline("text-generation", model="meta-llama/Llama-2-7b-hf",
    torch_dtype=torch.float16, device_map="auto")

# 批量处理（提升吞吐量）
pipe = pipeline("sentiment-analysis", batch_size=32)
results = pipe(large_text_list) # 自动分批推理

# 大文本分块处理
asr = pipeline("automatic-speech-recognition",
    model="openai/whisper-large-v2",
    chunk_length_s=30, stride_length_s=5)
result = asr("long_audio.wav", return_timestamps=True)</code></pre>


<a id="section-1605"></a>
## Tokenizer 深度解析

<a id="t-vEQ3JBgbRe2uJsvz9oyYsR"></a>

<p id="t-svyWg2zRKwsq0KAYaDnBMx"><span>Tokenizer 是 NLP 的第一步：把原始文本转换成模型能理解的数字序列。</span></p>


<a id="section-1606"></a>
## Tokenization 完整流程

<a id="t-DjpGoVfQYIsm90ALY6aziY"></a>

<div id="t-9con1nqUTGO1pCHukpagcD"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/48848034477122eed19e94d7.png"/></div>


<a id="section-1608"></a>
## 实例

<a id="t-iDcL9zHRLMv69FsI7lSZOM"></a>

<pre id="t-V14IX3wM01B2N6Ioh1HJlh"><code>from transformers import AutoTokenizer

# 加载 Tokenizer
tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")

# 一步完成编码
encoding = tokenizer(
 "Hello, I'm learning Transformers!",
    return_tensors="pt", # 返回 PyTorch tensor
    padding=True, # 填充到最长序列
    truncation=True, # 超出长度时截断
    max_length=128, # 最大长度
)

print(encoding.keys())
# -&gt; dict_keys(['input_ids', 'token_type_ids', 'attention_mask'])

print(encoding["input_ids"][0][:8])
# -&gt; tensor([101, 7592, 1010, 1045, 1005, 1049, 4083, 19081])

print(encoding["attention_mask"][0][:8])
# -&gt; tensor([1, 1, 1, 1, 1, 1, 1, 1])    # 1=真实token, 0=填充

# 解码（ID -&gt; 文本）
decoded = tokenizer.decode(encoding["input_ids"][0], skip_special_tokens=True)
print(decoded) # -&gt; "hello, i'm learning transformers!"

# 批量编码（自动 padding 对齐）
texts = ["Short.", "This is a much longer sentence for testing."]
batch = tokenizer(texts, padding=True, truncation=True, return_tensors="pt")
print(batch["input_ids"].shape) # -&gt; torch.Size([2, 10])

# 词表信息
print(f"词表大小: {tokenizer.vocab_size}") # -&gt; 30522
print(f"[CLS] ID: {tokenizer.cls_token_id}") # -&gt; 101
print(f"[SEP] ID: {tokenizer.sep_token_id}") # -&gt; 102
print(f"最大长度: {tokenizer.model_max_length}") # -&gt; 512</code></pre>


<a id="section-1609"></a>
## 常见 Tokenizer 类型对比

<a id="t-1jy4wL4mxC2T3Q6TreY5Lr"></a>

<div id="t-S5XVd4VQ3rbnxR7A2Rii8V"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/e4ffa3601e1a38aca9529dcb.png"/></div>


<a id="section-1611"></a>
## AutoClass：自动选择正确的模型类

<a id="t-jYDfb35yE4uPJwCKllsBRo"></a>

<div id="t-w5cqoZsZbBhZ78bSXxZqQ4"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/d95f60a5c89c09e751afe52f.png"/></div>


<a id="section-1612"></a>
## 实例

<a id="t-a4CUeLEN8coCjyXby4WVFf"></a>

<pre id="t-muTg4MTVWNsWTUFAbMK5oG"><code>import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification

model_name = "bert-base-uncased"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(
    model_name, num_labels=2, torch_dtype=torch.float16, device_map="auto"
)

# 手动推理完整流程
text = "Transformers is an amazing library!"

# 1. 编码
inputs = tokenizer(text, return_tensors="pt", truncation=True, max_length=512)
inputs = {k: v.to(model.device) for k, v in inputs.items()}

# 2. 前向传播
with torch.no_grad():
    outputs = model(**inputs)

# 3. 解析输出
logits = outputs.logits                       # shape: [1, 2]
probs  = torch.softmax(logits, dim=-1)
pred   = torch.argmax(probs, dim=-1).item()

id2label = model.config.id2label              # {0: 'LABEL_0', 1: 'LABEL_1'}
print(f"预测类别: {id2label[pred]}, 置信度: {probs[0][pred]:.4f}")</code></pre>


<a id="section-1614"></a>
## 实例

<a id="t-EbMEpryjP7gv6SWajFBpMx"></a>

<pre id="t-0iYOrhfwq6NT0wEvGevDvC"><code>from transformers import AutoModel, AutoTokenizer
import torch

model = AutoModel.from_pretrained("bert-base-uncased")
tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")

def get_sentence_embedding(text: str) -&gt; torch.Tensor:
    inputs = tokenizer(text, return_tensors="pt", max_length=512, truncation=True)
 with torch.no_grad():
        outputs = model(**inputs)
 # 对所有 token 做均值池化（Mean Pooling）
    token_embeddings = outputs.last_hidden_state          # [1, seq_len, 768]
    attention_mask = inputs["attention_mask"].unsqueeze(-1)
    mean_embedding = (token_embeddings * attention_mask).sum(1) / attention_mask.sum(1)
 return mean_embedding  # [1, 768]

vec = get_sentence_embedding("Hello world")
print(vec.shape) # -&gt; torch.Size([1, 768])</code></pre>


<a id="section-1617"></a>
## 实例

<a id="t-TumVTrmXBjjAE1JD5fnVLF"></a>

<pre id="t-thpypkWSOp2RxyiyQhqkgf"><code>from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

model_name = "cardiffnlp/twitter-roberta-base-sentiment-latest"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(model_name)

def predict_sentiment(texts):
    inputs = tokenizer(texts, return_tensors="pt", padding=True,
                       truncation=True, max_length=512)
 with torch.no_grad():
        logits = model(**inputs).logits
    probs = torch.softmax(logits, dim=-1)
    results = []
 for i, t in enumerate(texts):
        pid = probs[i].argmax().item()
        results.append({"text": t, "label": model.config.id2label[pid],
 "score": round(probs[i][pid].item(), 4)})
 return results

print(predict_sentiment(["I love this!", "This is terrible."]))
# -&gt; [{'text': 'I love this!', 'label': 'positive', 'score': 0.9756}, ...]</code></pre>


<a id="section-1619"></a>
## 实例

<a id="t-ydEsA75IaCJlbUGZliLU6W"></a>

<pre id="t-cHAsUOJavIE8m1AS6NvUrd"><code>from transformers import AutoTokenizer, AutoModelForCausalLM
import torch

model_name = "Qwen/Qwen2-1.5B-Instruct" # 阿里通义千问（支持中文）
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(
    model_name, torch_dtype=torch.float16, device_map="auto"
)

messages = [
 {"role": "system", "content": "你是一个有用的 AI 助手。"},
 {"role": "user", "content": "请用三句话解释什么是 Transformer？"},
]
text = tokenizer.apply_chat_template(messages, tokenize=False,
                                      add_generation_prompt=True)
inputs = tokenizer(text, return_tensors="pt").to(model.device)

with torch.no_grad():
    output_ids = model.generate(
 **inputs, max_new_tokens=300, temperature=0.7, top_p=0.9,
        do_sample=True, repetition_penalty=1.1,
        pad_token_id=tokenizer.eos_token_id,
 )

new_tokens = output_ids[0][inputs["input_ids"].shape[1]:]
response = tokenizer.decode(new_tokens, skip_special_tokens=True)
print(response)</code></pre>


<a id="section-1621"></a>
## 实例

<a id="t-SNGM59tVDyVOv1odGdscV3"></a>

<pre id="t-E4cAncNpuY2IbQPBZhIcNK"><code>from transformers import pipeline

ner = pipeline("ner", model="dslim/bert-base-NER", aggregation_strategy="simple")
result = ner("Elon Musk founded SpaceX in 2002 and Tesla Motors in 2003.")
for entity in result:
 print(f"{entity['word']:&lt;20} -&gt; {entity['entity_group']} ({entity['score']:.3f})")

# 中文 NER
ner_cn = pipeline("ner", model="hfl/chinese-bert-wwm-ext-ner-msra",
                   aggregation_strategy="simple")
result = ner_cn("小明在北京大学读书，后来去了阿里巴巴工作。")</code></pre>


<a id="section-1623"></a>
## 实例

<a id="t-TAN2quJbtxqK54mGjzRWGl"></a>

<pre id="t-uOSJmf1E9KdyiQPHPHbIaN"><code>from transformers import pipeline

# 英译中
translator = pipeline("translation", model="Helsinki-NLP/opus-mt-en-zh")
result = translator("Artificial intelligence is transforming the world.")
print(result[0]["translation_text"]) # -&gt; 人工智能正在改变世界。

# 中译英
translator_zh = pipeline("translation", model="Helsinki-NLP/opus-mt-zh-en")
result = translator_zh("人工智能正在改变世界。")
print(result[0]["translation_text"])</code></pre>


<a id="section-1625"></a>
## 实例

<a id="t-Wxk6kJLgLYrTuijhPwkfEP"></a>

<pre id="t-xrSW7hyIj8VxIVeFelqOmB"><code>from transformers import pipeline

summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
result = summarizer(long_text, max_length=80, min_length=30,
                     do_sample=False, no_repeat_ngram_size=3)
print(result[0]["summary_text"])</code></pre>


<a id="section-1626"></a>
## 微调（Fine-tuning）

<a id="t-rZ2HWKB5djXqN4Uo9DTZBz"></a>

<p id="t-AocQmVskIhcOQXhRc04NIT"><span>微调是将预训练模型适配到你的特定任务和数据上，是 Transformers 最重要的应用场景。</span></p>


<a id="section-1627"></a>
## 微调流程全景

<a id="t-iWuuqJ0rTy4VJIY5bK6fDh"></a>

<div id="t-cC4ZRqggqnu5DngTFUZzjz"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/5eb9b2f4f58337f44da09dde.png"/></div>


<a id="section-1629"></a>
## 实例

<a id="t-aaBKvhIJanu6mzarEXDfFc"></a>

<pre id="t-Ip2go0aZu7gpwOoOZvmnBC"><code>from datasets import load_dataset
from transformers import (
    AutoTokenizer, AutoModelForSequenceClassification,
    TrainingArguments, Trainer, DataCollatorWithPadding,
    EarlyStoppingCallback,
)
import evaluate, numpy as np

# 1. 加载数据集
dataset = load_dataset("imdb") # HF Hub 公开数据集

# 2. Tokenizer + 预处理
MODEL_NAME = "bert-base-uncased"
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)

def tokenize_fn(examples):
 return tokenizer(examples["text"], truncation=True, max_length=512)

tokenized_ds = dataset.map(tokenize_fn, batched=True,
                           remove_columns=["text"])
tokenized_ds = tokenized_ds.rename_column("label", "labels")
tokenized_ds.set_format("torch")
data_collator = DataCollatorWithPadding(tokenizer=tokenizer)

# 3. 加载模型
model = AutoModelForSequenceClassification.from_pretrained(
    MODEL_NAME, num_labels=2,
    id2label={0: "NEGATIVE", 1: "POSITIVE"},
    label2id={"NEGATIVE": 0, "POSITIVE": 1},
)

# 4. 评估指标
accuracy = evaluate.load("accuracy")
f1 = evaluate.load("f1")
def compute_metrics(eval_pred):
    logits, labels = eval_pred
    preds = np.argmax(logits, axis=-1)
 return {"accuracy": accuracy.compute(predictions=preds, references=labels)["accuracy"],
 "f1": f1.compute(predictions=preds, references=labels, average="binary")["f1"]}

# 5. 训练参数
training_args = TrainingArguments(
    output_dir="./results", num_train_epochs=3,
    per_device_train_batch_size=16, per_device_eval_batch_size=32,
    gradient_accumulation_steps=2, learning_rate=2e-5,
    weight_decay=0.01, warmup_ratio=0.1,
    evaluation_strategy="steps", eval_steps=500,
    save_strategy="steps", save_steps=500,
    load_best_model_at_end=True, metric_for_best_model="f1",
    fp16=True, logging_steps=100, seed=42,
)

# 6. 创建 Trainer 并训练
trainer = Trainer(
    model=model, args=training_args,
    train_dataset=tokenized_ds["train"],
    eval_dataset=tokenized_ds["test"],
    tokenizer=tokenizer, data_collator=data_collator,
    compute_metrics=compute_metrics,
    callbacks=[EarlyStoppingCallback(early_stopping_patience=3)],
)
trainer.train()

# 7. 评估并保存
eval_result = trainer.evaluate()
print(f"准确率: {eval_result['eval_accuracy']:.4f}")
print(f"F1: {eval_result['eval_f1']:.4f}")

trainer.save_model("./my-sentiment-model")
tokenizer.save_pretrained("./my-sentiment-model")</code></pre>


<a id="section-1630"></a>
## LoRA 参数高效微调（推荐）

<a id="t-Av5UCoqGHIvFZ6rBTHfeKP"></a>

<div id="t-qWH21hL67D48JDvBXOIF2p"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/c611e5597ae16608f1403e60.png"/></div>


<a id="section-1631"></a>
## 实例

<a id="t-hWrkCjZGTXQOXaLGPLpYmT"></a>

<pre id="t-bLS9b1vkklIaQFwpIa4WzG"><code>from peft import LoraConfig, get_peft_model, TaskType
from transformers import AutoModelForCausalLM, AutoTokenizer, TrainingArguments
import torch

model_name = "meta-llama/Llama-2-7b-hf"
model = AutoModelForCausalLM.from_pretrained(
    model_name, torch_dtype=torch.float16, device_map="auto",
    load_in_4bit=True, # 4-bit 量化加载（QLoRA），进一步省显存
)

# 配置 LoRA
lora_config = LoraConfig(
    task_type=TaskType.CAUSAL_LM, r=16, lora_alpha=32,
    lora_dropout=0.05,
    target_modules=["q_proj", "v_proj", "k_proj", "o_proj"],
)

model = get_peft_model(model, lora_config)
model.print_trainable_parameters()
# -&gt; trainable: 4,194,304 || all: 6,742,609,920 || 0.0622%</code></pre>

<blockquote id="t-punlyFqPlfLVIZNUyGcyt2"><p id="t-IIDB66S9Eu7Tl4z9wrXSbN"><span style="font-style:italic">LoRA 优势：只训练不到 1% 的参数，显存降低 60-70%，速度快 2-3 倍，权重文件仅几 MB，可为同一基础模型保存多个 LoRA 适配器用于不同任务。</span></p></blockquote>


<a id="section-1633"></a>
## 实例

<a id="t-iECqRmXYZGAN2475enxvqG"></a>

<pre id="t-HmT2XscdZMFQqQN0ryTRCu"><code># 本地保存
model.save_pretrained("./my-model")
tokenizer.save_pretrained("./my-model")

# 本地加载
model = AutoModelForSequenceClassification.from_pretrained("./my-model")
tokenizer = AutoTokenizer.from_pretrained("./my-model")

# 发布到 HuggingFace Hub
from huggingface_hub import login
login(token="your_hf_token") # huggingface.co/settings/tokens
model.push_to_hub("your-username/my-sentiment-model")
tokenizer.push_to_hub("your-username/my-sentiment-model")

# 通过 Trainer 直接发布
training_args = TrainingArguments(
    output_dir="your-username/my-model",
    push_to_hub=True, hub_strategy="every_save",
)</code></pre>


<a id="section-1635"></a>
## 推理加速全景

<a id="t-VkmhBRbnlrQCIaB92RazBo"></a>

<div id="t-CHY8ck8CioybNP7ov75uj6"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/3e34e8acd09ad6556888e6aa.png"/></div>


<a id="section-1636"></a>
## 实例

<a id="t-89XLVxJ0aJIeIuFfPGHS39"></a>

<pre id="t-XpGkHfxIvburDQVidL75dX"><code># 4-bit 量化加载（13B 模型只需约 7GB 显存）
from transformers import BitsAndBytesConfig, AutoModelForCausalLM
import torch

quant_config = BitsAndBytesConfig(
    load_in_4bit=True, bnb_4bit_compute_dtype=torch.float16,
    bnb_4bit_use_double_quant=True, bnb_4bit_quant_type="nf4",
)
model = AutoModelForCausalLM.from_pretrained(
 "meta-llama/Llama-2-13b-hf",
    quantization_config=quant_config, device_map="auto",
)

# FlashAttention-2 加速（需 pip install flash-attn）
model = AutoModelForCausalLM.from_pretrained(
 "mistralai/Mistral-7B-v0.1",
    attn_implementation="flash_attention_2",
    torch_dtype=torch.bfloat16, device_map="auto",
)

# torch.compile (PyTorch 2.0+)
model = torch.compile(model, mode="reduce-overhead")</code></pre>


<a id="section-1637"></a>
## 常见问题排查

<a id="t-Q9H4aVbee1oaPnWCQaFPwx"></a>

<div id="t-MHJifRoXhMXflpO7vsHT2X"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/9edd104b4cf73fb9db3b1f24.png"/></div>


<a id="section-1638"></a>
## 总结与学习路径

<a id="t-Vh7LwrvgBXjU7HApEn75Dp"></a>

<div id="t-ULKfgjtdiqChF0oz4u2f95"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/01e32b478dc843498b3b9d2b.png"/></div>


<a id="section-1640"></a>
## 实例

<a id="t-e25Ovn2khK60DdhCPrJyu7"></a>

<pre id="t-qEQHVGLf64PFLzTtufnh1V"><code># 1. 加载分词器
tokenizer = AutoTokenizer.from_pretrained("model_name")

# 2. 编码文本
inputs = tokenizer(text, return_tensors="pt", truncation=True, max_length=512)

# 3. 加载模型
model = AutoModelForSequenceClassification.from_pretrained("model_name", num_labels=N)

# 4. 推理
with torch.no_grad():
    outputs = model(**inputs)

# 5. Pipeline
pipe = pipeline("task_name", model="model_name")

# 6. 训练配置
args = TrainingArguments(output_dir="./out", num_train_epochs=3, learning_rate=2e-5)

# 7. 训练
trainer = Trainer(model=model, args=args, train_dataset=ds, compute_metrics=fn)

# 8. 保存
model.save_pretrained("./my-model")
tokenizer.save_pretrained("./my-model")

# 9. 数据集
dataset = load_dataset("dataset_name")
dataset = dataset.map(tokenize_fn, batched=True)

# 10. LoRA
config = LoraConfig(r=16, lora_alpha=32, target_modules=["q_proj","v_proj"])
model = get_peft_model(model, config)</code></pre>


<a id="section-1641"></a>
## 参考资源

<a id="t-dEieMg27MoO8dUHhjM8w8e"></a>

<ul><li id="t-EiAmHNWdLGxUyiFC36QeFp"><span>Transformers 官方文档</span></li></ul>

<ul><li id="t-wK4hYPmVFE1qtqK2IgLXiI"><span>Hugging Face NLP Course（免费课程）</span></li></ul>

<ul><li id="t-fyHgJkbRbYGlZF4WOLNPyU"><span>Hugging Face Hub 模型库（40万+）</span></li></ul>

<ul><li id="t-v0YDLK4oKCf4xkF25csRgl"><span>Hugging Face 数据集</span></li></ul>

<ul><li id="t-vXb8nCFxVktUPATRU4Hkdd"><span>HF 国内镜像站</span></li></ul>

<ul><li id="t-wQBSCUlOUIHVA13OIVy1Cc"><span>Papers With Code（论文+代码）</span></li></ul>

