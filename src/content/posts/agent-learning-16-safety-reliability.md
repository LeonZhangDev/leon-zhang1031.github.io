---
title: "第 16 章 · 安全与可靠性"
date: "2026-10-22"
draft: false
author: "学习资料整理"
description: "幻觉、注入、权限、敏感信息、异常、超时、回滚与熔断"
tags: ["Agent", "学习路线"]
categories: ["AI 工程"]
prerequisites: ["agent-learning-15-evaluation-observability"]
verification: {"status": "not-run", "scope": "本次仅整理资料；示例代码与原文技术结论未复跑。"}
---

幻觉、注入、权限、敏感信息、异常、超时、回滚与熔断

[学习路线](/posts/agent-learning-route/) · [上一章](/posts/agent-learning-15-evaluation-observability/) · [下一章](/posts/agent-learning-17-production-engineering/)

本章按知识小节编排。项目内容作为学习案例阅读，示例代码与原文技术结论未在本次整理中执行验证。

## 本章目录

- [大模型幻觉](#section-0034)
- [大模型幻觉的本质](#section-0035)
- [产生的原因](#section-0036)
- [解决方案](#section-0037)
- [面试问题照答版](#section-0038)
- [技术知识与案例补充](#section-0079)
- [调用工具失败](#section-0080)
- [模型调用失败](#section-0081)
- [讲解视频](#section-0082)
- [Agent 评估、安全与对齐](#section-1528)
- [Agent 评测体系](#section-1529)
- [评测维度](#section-1530)
- [常用 Benchmark](#section-1531)
- [Agent 评测框架](#section-1533)
- [安全与对齐](#section-1534)
- [常见安全威胁](#section-1535)
- [安全 Agent 实现](#section-1537)
- [可观测性](#section-1538)
- [三大支柱](#section-1539)
- [可观测 Agent 实现](#section-1541)
- [Guardrails](#section-1543)
- [HITL（Human-in-the-Loop）](#section-1544)
- [HITL Agent 实现](#section-1545)
- [章节小结](#section-1546)

<a id="section-0034"></a>
## 大模型幻觉

<a id="f-doxcnXBmCcGQG447VHmV4VW65Tb"></a>

<blockquote id="f-doxcne1DbH56oorZfaPJFd8uNRf"><p id="f-doxcnyicgIOM3XBBkSfHgEA5OBd"><span>幻觉问题，其实就是本质是什么，产生的原因是什么，如何解决，我力争把产生的原因写得完整，另外我也加入了一个高级进阶的内容，加了一个清华大学的论文，相当于一个亮点，你回答的时候，答出来会特别新颖。</span></p></blockquote>


<a id="section-0035"></a>
## 大模型幻觉的本质

<a id="f-doxcnWLsrkjynFVf8JZFPczKeoh"></a>

<p id="f-doxcnU83m72YlFWziw44AFd896c"><span>幻觉的本质不是模型被显式要求去编造，而是</span><span style="font-weight:bold">训练方式和训练数据共同塑造出的一种生成倾向</span><span>：当模型面对不确定问题时，它不会天然停下来，而是继续生成一个概率上最像答案的文本。</span></p>

<p id="f-doxcnUcZ0kbSfy6Ncfz3yGAkDKh"><span>大模型底层是一个</span><span style="font-weight:bold">概率预测器</span><span>，不是知识库。它内部没有"事实文件柜"，只有一张词与词之间的概率地图。生成一句话 = 沿着最可能的路径一步一步往下走。所以它从设计上就</span><span style="font-weight:bold">没有"真/假"概念</span><span>，只有"像不像下一句该说的话"。</span></p>

<p id="f-doxcnlhkcWdhDprAC9nsc8ozFec"><span>所以，大模型不是原生的事实验证系统，而是文本生成系统。它的幻觉不是来自"故意撒谎"，而是来自</span><span style="font-weight:bold">下一个 token 预测的训练方式、训练语料中的问答分布，以及后训练阶段对有用性和流畅性的偏好</span><span>。</span></p>


<a id="section-0036"></a>
## 产生的原因

<a id="f-doxcncsFdOo0BSG9Ti6IIfsJw4b"></a>

<p id="f-doxcns4nZQstX4IkwPavDMIztsh"><span>幻觉的成因可以拆成一条因果链：</span><span style="font-weight:bold">根因 → 燃料 → 扳机 → 电路</span><span>。这四层不是并列关系，而是层层推进：底层机制决定它会生成，数据缺陷决定它容易走错，训练偏好决定它不愿停下，最后这些倾向会在神经元层面形成可观测的行为电路。</span></p>

<p id="f-doxcnHYJ91sjga5oX4C1L3Tk2Rb"><span style="font-weight:bold">（1）根因：底层机制决定它是概率预测器，不是知识库</span></p>

<ul><li id="f-doxcnibDi5LFWpi3hjQKHKUVKGA"><span>没有事实数据库，只有词与词的概率地图。</span></li></ul>

<ul><li id="f-doxcnvorTURP6qNc7ldQKXKNC2d"><span>生成回答 = 一步一步走最可能的路径。</span></li></ul>

<ul><li id="f-doxcnrGAQYsybM9vWTyGzsqjTGe"><span>错误会随长度累积："出发偏一寸，到终点差千里"。</span></li></ul>

<p id="f-doxcnB28RUBJEII37V1LTEjCifd"><span>- 所以</span><span style="font-weight:bold">只要它开口，就有可能编</span><span>。这一层解释的是：大模型为什么天然不是事实验证系统，而是文本生成系统。</span></p>

<p id="f-doxcnfzB24bmf2fZnU41nzVA0Xd"><span style="font-weight:bold">（2）燃料：训练数据让它学到的世界本身就是残缺、扭曲的</span></p>

<p id="f-doxcnVx8LSCFIZxSKxKl8JGSqGt"><span>- </span><span style="font-weight:bold">训练截止日期</span><span>：截止日之后的事实，地图上根本没有路径。</span></p>

<p id="f-doxcn47g1QFhhZESMtlFmSsReZc"><span>- </span><span style="font-weight:bold">数据稀缺 / 分布不均</span><span>：冷门知识只出现几次，路径模糊。</span></p>

<p id="f-doxcndr72s1JGVkvlUoSOeN1J0c"><span>- </span><span style="font-weight:bold">数据污染</span><span>：互联网中包含错误信息、阴谋论、甚至被故意"数据投毒"的内容。</span></p>

<p id="f-doxcn3r78bcU9bbD0IoE1datX6f"><span>- </span><span style="font-weight:bold">过拟合</span><span>：模型死记硬背片段，遇到稍变的问题就乱拼。</span></p>

<p id="f-doxcnALgUTenTl62ZHuLxPIbTCg"><span>这些数据就像模型生成时使用的"地图"。地图本身有空白、有错路、有污染，模型自然会在低置信度场景下走偏。但</span><span style="font-weight:bold">地图有洞并不必然导致幻觉</span><span>——只要模型肯停下来，说"这里没有足够信息"就行。问题在于，第三层让它更倾向于继续说。</span></p>

<p id="f-doxcnixETPmwNcHNTNf2UNgHsfb"><span style="font-weight:bold">（3）扳机：训练方式与后训练偏好让它从"顺着说"走向"尽量给答案"</span></p>

<p id="f-doxcn7UnDXBmgrsln1bkG5A5l8b"><span>- </span><span style="font-weight:bold">预训练</span><span>：没有"讨好用户"的显式目标，只是在海量语料中学习"给定前文，预测下一个 token"。但人类语料里"被问→给答"的模式占绝对多数，模型因此学到"顺着上文继续说"的生成惯性。</span></p>

<p id="f-doxcn3aCYLvVJUFuVdedSKGB14d"><span>- </span><span style="font-weight:bold">后训练（SFT / RLHF / DPO）</span><span>：人类偏好数据通常更喜欢清楚、完整、有帮助的回答，而不是频繁的"我不知道"。这会进一步强化模型"尽量给出一个可用答案"的倾向。</span></p>

<p id="f-doxcnyCdxQkvepLz5Mn0O7V2I6d"><span>- </span><span style="font-weight:bold">结果</span><span>：模型不是被显式训练去撒谎，而是在训练方式、数据分布和后训练偏好的共同作用下，形成了"不确定也继续生成答案形式文本"的倾向。</span></p>

<p id="f-doxcn9WCUlOl724Fs1bP5BEtgpc"><span>这一层就是幻觉真正被触发的地方：当模型遇到不知道、不确定、信息不足的问题时，它不是天然选择停止，而是被生成惯性和后训练偏好推着继续给出答案形式的文本。到这一步，幻觉已经不是单纯的工程 bug，而是</span><span style="font-weight:bold">生成式训练范式自然带来的副作用</span><span>。</span></p>

<p id="f-doxcn4lQqlM2l3p2YjpcRU79FUh"><span style="font-weight:bold">（4）电路：H-Neurons 承载了"过度顺从"的生成倾向</span></p>

<p id="f-doxcntHK6L0Bee02vEk0nVjBrUh"><span>清华大学的论文从神经元层面验证了上面这条因果链：</span></p>

<p id="f-doxcnZ5HSCwvHLIafeM3xMV4C86"><span>- 在模型几十亿参数中，只有</span><span style="font-weight:bold">极少数神经元（不到十万分之一）</span><span>与幻觉相关，被命名为 </span><span style="font-weight:bold">H-Neurons</span><span>。</span></p>

<ul><li id="f-doxcno5Q7shWk2ZEutCpBiqYHah"><span>扰动实验证明：放大 H-Neurons → 模型接受错误前提、改口附和用户、甚至越狱配合违规请求。</span></li></ul>

<p id="f-doxcn45tWXuMS6zkCUEQNTdbLdd"><span>- 关键发现：H-Neurons 驱动的</span><span style="font-weight:bold">不是"错误记忆"，而是"过度顺从"</span><span> 这种行为本身。</span></p>

<p id="f-doxcnbQoRgUX08ZcopIWK3xLvVb"><span>也就是说，前三层解释了幻觉为什么会产生，H-Neurons 则说明这种倾向在模型内部已经有了可观测的物理载体。更致命的是：这条电路和"说话流畅"的能力</span><span style="font-weight:bold">深度纠缠</span><span>，无法简单删除——切掉它，模型也不会说话了。这也是为什么幻觉</span><span style="font-weight:bold">无法 100% 消除</span><span>，目前业界更多是通过工程手段缓解，而不是彻底根治。</span></p>


<a id="section-0037"></a>
## 解决方案

<a id="f-doxcn02ZAoi57YuFtKuvClqLJ8r"></a>

<p id="f-doxcnpNDWPdWh0E1BXom24b2x9b"><span>既然每一层都无法被彻底"修好"，工程上的策略就是</span><span style="font-weight:bold">绕过去、监测它、约束它、复核它</span><span>。常见思路包括 RAG、RLHF/DPO、CoT/Self-Ask、多模型投票、外部工具、用户侧验证，以及 H-Neurons 监测。整体可以分成几类：</span></p>

<p id="f-doxcnwqk2hIMIunXI1OwtsayhIh"><span style="font-weight:bold">（1）外部工具 / Web Search / API / 数据库 —— 让模型不要只靠参数回答</span></p>

<p id="f-doxcnJLIEYfekFrnyPNTSj57Exd"><span>当问题涉及最新信息、实时数据或企业私有数据时，不应该让模型完全依赖训练参数，而是让它调用</span><span style="font-weight:bold">外部工具</span><span>，比如 Web Search、搜索引擎、第三方 API、数据库、MCP 工具等。这样模型从"凭记忆生成"变成"先查证再生成"，直接缓解训练截止日期和知识边界问题。</span></p>

<p id="f-doxcn63kojSimhYqOBI3F4TLbjh"><span style="font-weight:bold">（2）RAG—— 把回答锚定到可信知识库</span></p>

<p id="f-doxcnnT8VMZaujjHQj1lhVSLWab"><span>RAG 是外部工具体系里最重要的一类。它把 Agent 的回答和</span><span style="font-weight:bold">企业知识库 / 文档库 / 向量数据库 / 搜索引擎</span><span>结合，先检索相关资料，再基于检索结果生成回答。它的核心价值是：让模型不要独自承担事实真实性，而是把答案锚定到可追溯的数据来源上。这是工业界最主流、性价比最高的幻觉缓解方案。</span></p>

<p id="f-doxcnkbbX6lXKQ7Ua7ScFAnRIee"><span style="font-weight:bold">（3）RLHF / DPO 人类反馈微调 —— 重写它的后训练偏好</span></p>

<p id="f-doxcneQ1KGclQsGrJZY41iXWUBe"><span>用人类标注反馈训练模型，</span><span style="font-weight:bold">显式奖励"承认低置信度"</span><span> 的行为，让模型在没把握时使用预设回答，而不是编造事实。本质是从训练激励层面修正"必须给答案"的倾向。</span></p>

<p id="f-doxcnOHaHeDfSpdUPsNYMnoh4Ud"><span style="font-weight:bold">（4）提示词技巧：多轮验证 + 反思（CoT / Self-Ask）</span></p>

<p id="f-doxcnljpKizmYlxpFcgmRV9LBEb"><span>通过 </span><span style="font-weight:bold">Chain-of-Thought + Self-Ask</span><span> 等模式，让 LLM 在推理时</span><span style="font-weight:bold">分配更多计算资源</span><span>（更多步骤、更多思考时间），强迫它把过程展开、自我核查。通常能显著提升准确性、连贯性和稳健性。</span></p>

<p id="f-doxcnr0vPNTV59DsqgnHzfPT2ze"><span style="font-weight:bold">（5）融合模型 / 投票机制 —— 用冗余对抗单模型偏差</span></p>

<p id="f-doxcnLnKIKyhnBFRLhUX5fq1fdh"><span>让多个模型或多个 Agent 协同工作，通过投票或加权得出最终答案，降低单一模型幻觉的影响。本质是用"群体智慧"稀释个体的讨好倾向。</span></p>

<p id="f-doxcnlAMS5q5wYeA64c5ivadgqd"><span style="font-weight:bold">（6）事实核查与用户侧验证 —— 不把模型输出直接当事实</span></p>

<p id="f-doxcnnodPhCOOcUcjc1hIc5XlWe"><span>用户侧防范：对模型给出的日期、统计、引用、法律案例、医学建议等高风险信息，要主动验证。可以检查原始来源、搜索精确引用、换一种问法追问、要求模型给出依据，并警惕"过于完美"或"异常具体但没有来源"的答案。这个方法不是从模型内部消除幻觉，而是在使用环节建立事实校验机制。</span></p>

<p id="f-doxcn34OHN8h1zfqHJOp5ot9YEg"><span style="font-weight:bold">（7）（亮点）H-Neurons 幻觉探测器 —— 监测而不是直接删除</span></p>

<p id="f-doxcnUrqLrG89ZIYlbysgFOR0Uc"><span>基于清华论文的发现，理论上可以并行监测 H-Neurons 的实时激活，一旦发现异常飙升，就给出"该答案可能在编"的信号，提示用户或下游 Agent 复核。需要注意的是，论文并不是说可以直接删除 H-Neurons 来彻底解决幻觉，因为这些神经元和模型的语言流畅性深度纠缠。更现实的方向是</span><span style="font-weight:bold">监测、抑制、预警</span><span>，而不是粗暴切除。</span></p>

<a id="f-doxcnDLtaYAHuowBifEodn8U4Of"></a>

##### 附录：H-Neurons 论文概括

<blockquote id="f-doxcnYC8Tk0YeTZYwIMxXvE0MXb"><p id="f-doxcnQdHuYBUOFxIW3C2uI1tXIg">下面概括论文的主要内容。</p></blockquote>

<p id="f-doxcnlX3Ox5xfnyio12ENv0iEYc"><span>这篇论文的核心问题是：大模型为什么会在不知道答案时仍然自信地编造？研究者没有只从训练数据、提示词或模型规模这些外部因素解释，而是尝试从模型内部的神经元活动入手，寻找和幻觉行为相关的可观测结构。</span></p>

<p id="f-doxcn8JLFo5jPJvuTBLL0F0VCIe"><span>论文提出了 </span><span style="font-weight:bold">H-Neurons</span><span> 这个概念，指一小部分与幻觉行为高度相关的神经元。研究发现，这些神经元并不是简单存储了错误知识，而更像是承载了一种"过度顺从"的行为倾向：当用户的问题带有错误前提、上下文存在误导，或者用户反复质疑模型时，模型更容易顺着用户继续说，而不是纠正问题或承认不确定。</span></p>

<p id="f-doxcnst2nzkgv9jU5KaQzyLJuze"><span>更重要的是，实验表明：增强这些 H-Neurons 的影响，模型会更容易接受错误前提、附和用户、生成错误答案；抑制它们，则可以减少这类过度顺从行为。但论文也指出，不能把这些神经元简单删除，因为它们和模型生成自然、流畅、有帮助回答的能力是纠缠在一起的。也就是说，幻觉不是一个可以被单点切除的独立 bug，而是和大模型的语言生成能力共享部分底层机制。</span></p>

<p id="f-doxcnCDkV64W6OUkZARCwBemRUd"><span>这篇论文的启发是：未来减少幻觉，除了 RAG、工具调用、事实核查这些工程方法，也可以探索模型内部的实时监测机制。例如在生成过程中观察 H-Neurons 是否异常激活，如果风险升高，就触发复核、检索或拒答策略。它提供的是一种前沿研究方向：</span><span style="font-weight:bold">监测和约束幻觉电路，而不是幻想把幻觉彻底删除</span><span>。</span></p>


<a id="section-0038"></a>
## 面试问题照答版

<a id="f-doxcnU428eA3nzEETfXnwBY6qvb"></a>

<p id="f-doxcnaXxbCiUEcVFWQztuqviphf"><span style="font-weight:bold">Q1：什么是大模型幻觉？它是如何产生的？</span></p>

<p id="f-doxcnvVfmDtXndHcSvLjTJBRIGm"><span>大模型幻觉指的是模型自信地输出</span><span style="font-weight:bold">不符合事实</span><span>的内容。它的本质不是模型被显式训练去编造，而是底层机制、训练数据分布和后训练偏好共同作用的结果。</span></p>

<p id="f-doxcnR1VIhDksSGeO0D9Q7RjSfc"><span>第一，大模型底层是一个</span><span style="font-weight:bold">概率预测器</span><span>，并不真正理解事实，只是根据上下文预测最可能生成的单词序列。</span></p>

<p id="f-doxcn08LFP47WRPGzNcyy4JjZde"><span>第二，当遇到训练数据没覆盖、或者覆盖很少的低置信度场景时，模型仍然会按照"顺着上下文继续说"的生成惯性，输出一个看起来合理的答案。</span></p>

<p id="f-doxcn6nfwP1XxWAW8229CdJWkJc"><span>第三，后训练阶段（SFT / RLHF / DPO）的人类偏好通常更喜欢清楚、完整、有帮助的回答，这会进一步强化模型"尽量给出一个可用答案"的倾向。</span></p>

<p id="f-doxcnB2Y7Q5eBsOCZrYkgJDgfIh"><span>所以，幻觉不是单一原因导致的，而是大模型的生成机制、数据缺陷和后训练偏好共同造成的。</span></p>

<p id="f-doxcnZ5DvClhHn5iiFrBCXGR4Wc"><span style="font-weight:bold">Q2：如何减少大模型 / Agent 的幻觉？</span></p>

<p id="f-doxcnf8x9Epdklob6mxvaRlqV87"><span>工程上主要有几类做法。</span></p>

<p id="f-doxcn2fCIqoEJEFR0SAWFsKNWeh"><span>第一，接入 </span><span style="font-weight:bold">Web Search、搜索引擎、第三方 API、数据库、MCP 工具</span><span> 等外部工具，让模型不要只靠参数回答。</span></p>

<p id="f-doxcno8RbZX6rMaCak24nDdj2vc"><span>第二，使用 </span><span style="font-weight:bold">RAG</span><span>，将 Agent 回答和外部知识库或向量数据库结合，确保生成内容有真实依据。</span></p>

<p id="f-doxcnscPntJ99sDyfNBpnwvIXne"><span>第三，使用 </span><span style="font-weight:bold">RLHF / DPO 人类反馈微调</span><span>，显式奖励模型在低置信度场景下使用预设回答，而不是编造事实。</span></p>

<p id="f-doxcnFyRzGCFSxoHVMsLk5PTFwh"><span>第四，使用 </span><span style="font-weight:bold">Chain-of-Thought + Self-Ask</span><span> 等提示词技巧，让模型在推理过程中分配更多计算资源、进行多轮验证和反思。</span></p>

<p id="f-doxcnxkiCPUYyqdmPDLIKv6uACe"><span>第五，使用 </span><span style="font-weight:bold">融合模型或投票机制</span><span>，通过多个模型或 Agent 协同降低单一模型幻觉的影响。</span></p>

<p id="f-doxcn0kWW8GkiwQ7eY6oufF15Lg"><span>第六，在使用侧建立事实核查机制，对日期、引用、统计、法律和医学等高风险内容进行二次验证。</span></p>

<p id="f-doxcnXNxlayC8Qr2UWlPUJByA7f"><span>第七，我也看了最近清华大学的一篇论文，它从模型结构层面分析了幻觉问题。论文认为，模型中有一小部分神经元和幻觉行为高度相关，被称为 </span><span style="font-weight:bold">H-Neurons</span><span>。但这些神经元和模型"说话流畅"的能力共用同一套电路，不能简单直接切除。更现实的做法是，在使用模型的时候监测每一次 H-Neurons 的激活值，一旦发现异常升高，就进行实时预警，提示系统触发复核、检索或人工确认。</span></p>

<p id="f-doxcnS0nx1j5ANVRWrESepDxyIc"><span>最后总结一下，现阶段大模型幻觉是无法被 100% 消除的。我们能做的是通过外部工具、RAG、反馈微调、推理反思、多模型协同、事实核查和 H-Neurons 监测来</span><span style="font-weight:bold">缓解幻觉，而不是彻底根治幻觉</span><span>。</span></p>


<a id="section-0079"></a>
## 技术知识与案例补充

<p id="f-doxcnSPl3wmbQIHHT6AQBhcDIEf"><span>如何设计一个 </span><span style="font-weight:bold">高可用、发生故障后能够优雅回退的 Agent 系统</span><span>，是当前 Agent 岗位面试中比较受关注的知识点。它也是区分普通演示型项目与企业级、生产级项目的重要设计能力：一个项目不仅要能在理想条件下完成任务，还要考虑模型、工具和运行流程发生异常时，系统如何恢复、隔离、降级或安全停止。</span></p>

<p id="f-doxcnjEHrXXl7hid2xmlefFhztT"><span><span style="font-weight:bold"><a href="/posts/agent-learning-23-learning-cases/#f-doxcnT8qpq6xau2OY8jqpLALVad"><span>2026 年面试官最喜欢的 6 个 AI 项目</span></a></span></span><span>最近整理的真实面试问题也进一步说明了它的重要性：</span></p>

<blockquote id="f-doxcnELPden89c3Fu5WlNt3jI5f"><p id="f-doxcn1SxE1Vgo8COII7Ao26ohJk">案例问题：Agent 遇到异常故障时，用什么方式保持持续健壮的运行？</p>
<p id="f-doxcnuijGsrSjq5YvEGnuqOiHDh"><span style="font-weight:bold">宇树科技 Agent 一面：</span><span> 外部工具调用失败后，系统如何容错或降级？</span></p></blockquote>

<p id="f-doxcnOGhSuSQAsYzKhw3fiiVIec"><span>这两道问题虽然切入角度不同，但都在考察同一个核心能力： </span><span style="font-weight:bold">当 Agent 无法按照原计划继续执行时，系统能否识别故障、采取正确的恢复策略，并在无法恢复时进行优雅降级。</span><span> 由此可以看出，Agent 健壮性设计既是一个高频面试知识点，也是生产级 Agent 项目不可缺少的工程能力。</span></p>

<p id="f-doxcnRQRiKMNXxRi4ce99Wb7xIb"><span>因此，本文将其整理为一个独立专题—— </span><span style="font-weight:bold">Agent 系统健壮性设计</span><span>，系统讲清楚 Agent 开发中可能遇到的故障，以及面对这些故障时应当如何安全、可控地处理。无论是准备面试，还是设计和完善自己的 Agent 项目，这部分理论与实践方法都非常实用。</span></p>

<p id="f-doxcn53UIAECKi8GV7Q10cPXqSb"><span style="font-weight:bold">本文的内容安排：</span><span> 全文将围绕 Agent 开发与运行过程中的 </span><span style="font-weight:bold">外部工具与依赖故障、模型服务故障，以及 Agent 推理与控制流故障</span><span> 展开，并按照“ </span><span style="font-weight:bold">故障表现 → 解决策略 → 完整处理流程</span><span> ”进行讲解，说明什么时候应该重试、什么时候需要修正或重新规划、什么时候应当熔断和降级，以及什么时候必须转人工或停止执行。文中还会穿插相应的 </span><span style="font-weight:bold">面试问题、答题思路与参考答案</span><span>，帮助大家快速检验理解程度，并掌握如何在面试中有条理地表达一套完整、可落地的生产级方案。</span></p>


<a id="section-0080"></a>
## 调用工具失败

<a id="f-doxcnWv8bb3FoOOIU8SBYMPJl8b"></a>

<p id="f-doxcnuxqvjbNpar1FihSpG50upb"><span>Agent 的主要价值来自调用搜索、数据库、代码执行、支付、工单、邮件和企业内部 API 等工具，因此工具层也是最常见的故障来源。这个几乎是在设计高可用Agent系统时，最常问的问题了。</span></p>

<a id="f-doxcnRojkJvfDsF5hF6udcYi9jr"></a>

##### 瞬时技术故障：设置明确的超时、总预算和有界重试

<p id="f-doxcnqgIo17CbnVJixJm9aQYDag"><span style="font-weight:bold">故障表现：</span><span> 瞬时技术故障一般包括 </span><span style="font-weight:bold">网络连接中断、请求超时、HTTP 429 限流、部分 HTTP 5xx、MCP Server 或插件短暂不可用</span><span>，以及下游服务临时过载。这类故障的特点是过一段时间后可能自行恢复，因此允许重试，但不能让单个依赖无限阻塞整个 Agent。</span></p>

<p id="f-doxcnrfjFKFIhFCkX7vuzvSKEnh"><span style="font-weight:bold">解决策略：</span><span> 为每次调用设置 </span><span style="font-weight:bold">连接超时和响应超时</span><span>，同时限制工具调用阶段及整个 Agent 任务的 </span><span style="font-weight:bold">总时间、总成本和最大重试次数</span><span>。对于明确可重试的错误，采用指数退避和随机抖动，遵守服务端的 </span><span><span><span>Retry-After</span></span></span><span>，并在达到次数或时间预算后立即停止，避免无限重试演变为重试风暴和级联故障。</span></p>

<blockquote id="f-doxcnUXCoCRZfIdVNb7l6KfPS9c"><p id="f-doxcnPnyVxtqF1O1fYdm3GQPY6b"><span>❓️ </span><span style="font-weight:bold">你可能会问：什么是指数退避和随机抖动？</span></p>
<p id="f-doxcn6oH407WGBpE95pFdw8KRCh"><span>💡 这是软件开发，尤其是分布式系统中非常经典的重试策略。 </span><span style="font-weight:bold">指数退避</span><span> 是指每次重试失败后逐渐延长等待时间，例如依次等待 1 秒、2 秒、4 秒和 8 秒，避免在服务尚未恢复时频繁请求； </span><span style="font-weight:bold">随机抖动</span><span> 则是在等待时间上加入一定的随机变化，把不同客户端的重试时刻错开，避免大量请求在同一时间再次涌入下游服务。</span></p></blockquote>

<a id="f-doxcnU1xJF4I5ZULCGfULdfeOuV"></a>

##### 确定性调用错误：返回结构化错误并修正调用

<p id="f-doxcn6aPC37BfRQkc1JV3VDvmcb"><span style="font-weight:bold">故障表现：</span><span> 确定性调用错误一般包括 </span><span style="font-weight:bold">参数缺失、参数类型错误、工具名称或版本不匹配、Schema 校验失败、身份认证过期、权限不足</span><span>，以及请求违反业务规则。这类问题由请求本身或执行条件决定，通常不会随着时间自动消失，因此 </span><span style="font-weight:bold">原样重试没有意义</span><span>。</span></p>

<p id="f-doxcnCs5J8Hq19eVn8KuMPnkGie"><span style="font-weight:bold">解决策略：</span><span> 由工具执行器返回 </span><span style="font-weight:bold">错误类型、是否可重试、失败字段和具体原因</span><span> 等结构化信息，让 Agent 据此修正参数、补充前置条件、重新授权、替换工具或调整计划，而不是机械地重复同一个请求。例如可以返回：</span></p>

<pre id="f-doxcnrRPn8WWnJDwIg3aA3YYotc"><code>{"error_type": "INVALID_ARGUMENT",
"retryable": false,
"message": "end_time must be later than start_time",
"failed_fields": ["start_time", "end_time"]}</code></pre>

<a id="f-doxcnyv8FFYjlDWbApEKnxKQJQf"></a>

##### 瞬时故障多次重试仍失败：使用熔断器隔离故障

<p id="f-doxcnNpYY5abnIGAMseAofB8fTc"><span style="font-weight:bold">故障表现：</span><span> 这一阶段主要承接第一类瞬时故障：工具经过有限次数的退避重试后，仍然 </span><span style="font-weight:bold">连续超时、返回 5xx 或处于不可用状态</span><span>，说明问题可能不再是短暂抖动，而是依赖正在持续故障。第二类参数错误、权限不足等确定性错误通常不会进入这里，因为它们应直接修正、重新授权或终止调用，而不是反复重试到熔断。</span></p>

<p id="f-doxcnAFSmSsmOMBJI6lGF3jtXbh"><span style="font-weight:bold">解决策略：</span><span> 使用 </span><span style="font-weight:bold">熔断器</span><span> 隔离故障：正常情况下处于 Closed 状态；连续失败达到阈值后进入 Open 状态，暂时拒绝新调用；等待冷却时间后进入 Half-Open 状态，只放行少量探测请求，确认依赖恢复后再关闭熔断。 </span><span style="font-weight:bold">熔断的目的不是修复工具，而是保护 Agent 和下游系统。</span></p>

<a id="f-doxcnw4X6cEmRsfzmeHiISxi9We"></a>

##### 工具长时间不可用：按照能力等级逐级降级

<p id="f-doxcnv8mCaQcd4mhqIusWuCQio9"><span style="font-weight:bold">故障表现：</span><span> 工具长时间不可用意味着自动恢复已经超过重试或熔断预算，但用户的任务可能仍有一部分可以完成。此时如果继续等待会浪费资源，如果直接宣告整个任务失败又可能损失仍可提供的核心能力，因此需要根据操作风险和业务目标判断可接受的能力边界。</span></p>

<p id="f-doxcnuxnMBTr0z3gvpBOsiP4Jzg"><span style="font-weight:bold">解决策略：</span><span> 依次尝试 </span><span style="font-weight:bold">同能力的备用工具、缓存或已有中间结果</span><span>，并在无法完整完成时返回部分结果且明确缺失项。对于高风险操作，可以从写入降级为只读查询，从自动执行降级为提供建议；仍无法安全完成时保存当前状态并转人工，没有安全降级路径时则明确失败， </span><span style="font-weight:bold">绝不能伪造成功结果</span><span>。</span></p>

<a id="f-doxcn12PeVbtFcZjEXhD8obSgUh"></a>

##### 完整处理流程

<div id="f-doxcn1ZGjuEXpcClmxCJZiXdIHf"><img alt="" decoding="async" height="853" loading="lazy" src="/images/agent-learning/38f7a90e2368c3afd775d63a.png" width="1280"/></div>

<p id="f-doxcnkPu5YmGs2xwFZ8mX18bM6b"><span>上面的四条可以统一成一套完整的工具调用失败处理流程。按照这个思路回答，既能体现清晰的故障分类能力，也能体现对重试、熔断和优雅降级等高可用设计的理解。这套方案也可以直接用于实际项目中的 Agent 工具调用层设计。</span></p>

<p id="f-doxcndA8h3dJupDKBB153kHUGSc"><span>整体处理思路可以分为四步：</span></p>

<ol start="1"><li id="f-doxcn1CgvcMuTkGGQ3rh1BmB2dd"><span style="font-weight:bold">错误分类：</span><span> 先读取结构化错误，区分确定性错误和瞬时技术故障，不能对所有失败统一重试。</span></li></ol>

<ol start="2"><li id="f-doxcnLdh5lpYEkq9NDOqd3VDaWf"><span style="font-weight:bold">局部恢复：</span><span> 确定性错误通过修正参数、重新授权或终止调用处理；瞬时故障则在超时和总预算内进行有界重试。</span></li></ol>

<ol start="3"><li id="f-doxcnebUE4JxT4g9MRX7YNsn0uh"><span style="font-weight:bold">故障隔离：</span><span> 瞬时故障多次重试仍未恢复时，打开熔断器，避免持续冲击故障依赖。</span></li></ol>

<ol start="4"><li id="f-doxcnaUPGSWazdRo1TadSxgLWHc"><span style="font-weight:bold">优雅降级：</span><span> 工具确实不可用时，切换备用工具、使用缓存或已有结果、返回部分结果，必要时降级为只读建议或转人工；没有安全降级路径时明确失败。</span></li></ol>

<p id="f-doxcnwb38fqBkkih9joIkN1YVTb"><span>假设 Agent 调用搜索工具失败，系统首先读取结构化错误并进行分类：</span></p>

<ol start="1"><li id="f-doxcna4uhYQFezM91q5yhzbd99b"><span>如果是参数格式错误、权限不足等 </span><span style="font-weight:bold">确定性错误</span><span>，就进入第二条，修正参数、重新授权或直接终止，不能原样重试；</span></li></ol>

<ol start="2"><li id="f-doxcnrrJvdDADLwXOJwtLS4m26d"><span>如果是连接超时、HTTP 429 或 HTTP 503 等 </span><span style="font-weight:bold">瞬时故障</span><span>，就进入第一条，在总预算内进行有限次数的指数退避和随机抖动重试；</span></li></ol>

<ol start="3"><li id="f-doxcn3NZJMc4tOWu0A7URjVZfxc"><span>如果瞬时故障经过多次重试仍未恢复，就进入第三条，打开熔断器，停止继续冲击故障依赖；</span></li></ol>

<ol start="4"><li id="f-doxcnOkq7MFMpARva4ErXjCpwed"><span>如果工具在熔断后仍长时间不可用，就进入第四条，切换备用工具、使用缓存或返回部分结果；</span></li></ol>

<ol start="5"><li id="f-doxcnaZIS0Vzq8pBlexviRMdTNd"><span>如果不存在安全的降级路径，则明确报告工具不可用，保存必要状态并结束调用。</span></li></ol>

<p id="f-doxcnQZVcvQalwQrNOBOFCFyG1d"><span>因此，完整逻辑可以概括为： </span><span style="font-weight:bold">先分类；确定性错误直接修正或终止；瞬时故障先受控重试，持续失败后再熔断和降级。</span><span> 这比简单回答“失败后重试三次”更能体现生产系统设计能力。</span></p>

<blockquote id="f-doxcn0szZNalA1OfBaHZPetkrwg"><p id="f-doxcnqEF9zRYSY1IzlZLtVYpldb"><span>🎯 </span><span style="font-weight:bold">面试卡片</span></p>
<p id="f-doxcnthagztUj4wSzlL1pXLzWyh"><span style="font-weight:bold">面试问题：外部工具调用失败后，Agent 应该如何进行容错和降级？</span></p>
<p id="f-doxcnWhyK1vhiNu99Pajw1Bs0hd"><span>🧭 </span><span style="font-weight:bold">答题思路与技巧：</span><span> 回答时不要把所有工具故障一概而论，也不要只说“失败后重试”。应当用清晰的分类和递进关系，体现回答的全面性与工程思维。</span></p>
<p id="f-doxcnEhaDBS4a6k7TOBYEvzngaf"><span>💬 </span><span style="font-weight:bold">参考答案：</span></p>
<p id="f-doxcnXjzbDKAEKPYU0YJBszhGSh"><span>外部工具调用失败后，我不会直接统一重试，而是先根据结构化错误进行分类。</span></p>
<ol start="1"><li id="f-doxcn3Itfwm1s3QKFhZdTakj9Tg"><span>对于 </span><span style="font-weight:bold">参数错误、权限不足等确定性错误</span><span>，原样重试没有意义，我会修正参数、重新授权，无法修复时直接终止调用并说明原因。</span></li></ol>
<ol start="2"><li id="f-doxcnbPhN6C7SPxgJLnGTXoofRb"><span>对于 </span><span style="font-weight:bold">网络超时、HTTP 429 和部分 5xx 等瞬时故障</span><span>，我会设置单次超时和任务总预算，并采用指数退避与随机抖动进行有限重试。</span></li></ol>
<ol start="3"><li id="f-doxcntf2f1LUFs8034xBMN2EtWc"><span>如果瞬时故障 </span><span style="font-weight:bold">多次重试仍未恢复</span><span>，我会打开熔断器，停止继续冲击下游，并通过半开状态探测服务是否恢复。</span></li></ol>
<ol start="4"><li id="f-doxcnx6gAH99QOYfZnda9mhHyad"><span>如果工具 </span><span style="font-weight:bold">长时间不可用</span><span>，可以根据业务风险切换备用工具、使用缓存或已有结果、返回部分结果，或者从自动执行降级为只读建议。仍然无法安全完成时，就保存必要状态、明确说明失败并转人工处理。</span></li></ol>
<p id="f-doxcnMlNwiHDRXyHmW6mYQl04Vd"><span>一句话概括就是： </span><span style="font-weight:bold">先分类，能恢复就受控恢复；不能恢复就熔断；确实不可用就优雅降级。</span></p></blockquote>


<a id="section-0081"></a>
## 模型调用失败

<a id="f-doxcnorgwf9iTFSMPOSdF9MN7g2"></a>

<p id="f-doxcnlEP5PZ0tQ9ITSMe9w1hqIf"><span>模型服务故障和前面的外部工具调用故障有一定相似性：两者的总体目标都是 </span><span style="font-weight:bold">在安全和预算允许的范围内尽可能恢复任务</span><span>，能够重试时受控重试，持续不可用时切换备用能力，无法完整恢复时再进行降级。但这一节把故障对象进一步聚焦到了 Agent 最核心的一项外部依赖—— </span><span style="font-weight:bold">大模型 API</span><span>，因此除了通用的超时、限流和服务不可用，还需要讨论一些与 LLM 特性直接相关的问题。</span></p>

<p id="f-doxcnl87WbqoJJJElSGeftVdOcg"><span>其中最关键的区别是： </span><span style="font-weight:bold">模型 API 调用成功，不代表模型在业务上正常。</span><span> 接口可能返回 HTTP 200，但模型由于概率性、版本变化或能力差异，仍然可能生成错误的工具参数、违反业务规则或遗漏用户要求。因此，模型服务故障不能只从 API 层判断，还要引入 </span><span style="font-weight:bold">业务逻辑评估</span><span>，持续验证模型能否正确完成真实任务；主模型无法恢复时，还需要准备并切换 </span><span style="font-weight:bold">经过业务验证的备用模型</span><span>，再根据备用模型的实际能力决定是否维持原权限或进一步降级。</span></p>

<a id="f-doxcnDTajxsqdsZnJcHonoT1oFf"></a>

##### 模型服务短暂抖动：在任务预算内进行有限重试

<p id="f-doxcnB1uBLAJ54kzdvVCKJ7N1Eb"><span style="font-weight:bold">故障表现：</span><span> 模型服务短暂抖动通常表现为 </span><span style="font-weight:bold">请求超时、HTTP 429 限流、部分 HTTP 5xx、流式响应中断或单个推理端点暂时不可达</span><span>。这类故障可能随着负载下降或服务恢复而消失，但一次模型调用往往同时消耗时间、Token 和费用，失败后的重复生成还可能产生不同结果，因此不能无限重试。</span></p>

<p id="f-doxcnYQX3Xo6KKQt3ZHqY1Z73Tf"><span style="font-weight:bold">解决策略：</span><span> 先为单次请求设置超时，只对明确可恢复的错误进行</span><span style="font-weight:bold">指数退避和随机抖动重试</span><span>，并同时限制 </span><span style="font-weight:bold">最大调用次数、总耗时、总 Token 和总费用</span><span>。如果任务中已经完成了写操作，重试模型时必须从持久化状态继续，不能重新执行已经成功的副作用操作；达到任一预算后则停止局部重试，进入故障切换流程。</span></p>

<a id="f-doxcnHj9PDX7MQwjMAN8zGIgoZg"></a>

##### 接口可用但模型能力退化：持续监控真实任务质量

<p id="f-doxcnuIOYZd35HP0zxYOK6BI4Rk"><span style="font-weight:bold">故障表现：</span><span> 这是一类更隐蔽的模型服务故障：接口仍然能够返回结果，但由于 </span><span style="font-weight:bold">模型版本更新、服务端策略变化、模型漂移或推理配置变化</span><span>，Agent 开始频繁生成错误参数、遗漏用户要求、违反领域规则，或者对同一个任务表现出明显的不一致。</span><span><span><span>τ-bench</span></span></span><span> 的实验也说明，只看单次平均成功率并不足以证明 Agent 可靠；即使较强模型的单次表现较好，同一任务连续多次都成功的概率仍会快速下降。</span></p>

<p id="f-doxcnvkUv77tmMuJAA6iKej6Oyh"><span style="font-weight:bold">解决策略：</span><span> 不能只监控可用率和响应时间，还要持续监控 </span><span style="font-weight:bold">结构化输出通过率、工具参数正确率、领域规则违反率、任务完成率和重复运行一致性</span><span>。对于可以确定验证的任务，应将模型结果与真实业务状态、规则校验器或已知正确结果进行比较；对于高风险结果，则引入独立验证器或人工复核。当这些质量指标连续低于基线或风险阈值时，应将其视为服务事故，停止让该模型执行高风险写操作，而不是因为接口返回成功就继续放行。</span></p>

<blockquote id="f-doxcnZfqsehypesQ7Bj6JcK7C5b"><p id="f-doxcnjiDEuSVoh7lkWNytIAXPSc"><span>❓️ </span><span style="font-weight:bold">你可能会问：为什么不能只看模型接口的成功率？</span></p>
<p id="f-doxcnAkC7uMoxghYealMGW1SLkf"><span>💡 因为模型服务具有概率性。传统 API 返回成功，通常意味着完成了一个定义明确的操作；模型接口返回成功，只能说明生成过程完成了，并不能证明生成结果正确。生产环境因此需要同时监控 </span><span style="font-weight:bold">技术可用性</span><span> 和 </span><span style="font-weight:bold">业务有效性</span><span>：前者关注请求是否成功，后者关注输出能否稳定完成真实任务。</span></p></blockquote>

<a id="f-doxcnwJPRd0JOxbkXAxOMhDtl2f"></a>

##### 主模型持续不可用：切换预先验证的备用模型

<p id="f-doxcnpOjP3pJfF187REvBl2A3Ub"><span style="font-weight:bold">故障表现：</span><span> 当主模型经过有限重试后仍然持续超时、长时间限流或整体不可用时，说明故障已经超过局部重试能够解决的范围。如果 Agent 只能调用这一个模型，整个任务就会随着主模型故障而中断。</span></p>

<p id="f-doxcntKQhIfj4go7cQPZ2yXVi3b"><span style="font-weight:bold">解决策略：</span><span> 提前准备一个或多个 </span><span style="font-weight:bold">备用模型</span><span>，并在上线前使用同一套真实业务任务验证其工具调用、输出格式、领域规则和运行稳定性。当主模型持续不可用时，由模型网关将请求切换到已经达到任务最低标准的备用模型，使任务能够继续运行。第三点的核心就是： </span><span style="font-weight:bold">主模型故障后不能没有替代能力，但替代模型必须事先准备和验证。</span></p>

<a id="f-doxcnA9A6IqELx3YqBWA8eisfXd"></a>

##### 备用模型能力低于主模型：按照任务风险降低权限

<p id="f-doxcnlTB2ruRqhKrlrjuwLOHrlc"><span style="font-weight:bold">故障表现：</span><span> 切换成功只说明备用模型可以提供服务，并不代表它在 </span><span style="font-weight:bold">函数调用、上下文长度、复杂推理、规则遵循和安全控制</span><span> 等方面与主模型完全相同。如果让能力较弱的备用模型继续执行付款、退款、删除数据等高风险动作，就可能把一次可见的服务中断转化为更难发现的业务事故。</span></p>

<p id="f-doxcn4ba5TihVL5rzG2JlO0h6kf"><span style="font-weight:bold">解决策略：</span><span> 根据备用模型的实际能力和任务风险同步调整 Agent 权限：能够满足要求的低风险任务可以继续自动执行；无</span><span style="font-weight:bold">法稳定完成的中风险任务降级为只读查询、草稿生成或执行前人工审批</span><span>；付款、退款等高风险任务则转入人工处理。如果备用模型连最低质量和安全标准都无法满足，就保存任务状态、向用户说明原因并停止自动执行。第四点的核心就是： </span><span style="font-weight:bold">启用备用模型不等于保持原有权限，备用能力下降时，Agent 的自动化权限也必须随之下降。</span></p>

<a id="f-doxcn8XnHQymoJhqnL2YMGVbhHe"></a>

##### 完整流程

<div id="f-doxcnoxnTGIrKWfejYrkZIfHQBd"><img alt="" decoding="async" height="853" loading="lazy" src="/images/agent-learning/83fc59c5484ea19462b7f815.png" width="1280"/></div>

<p id="f-doxcn2g86izgcXfecRIumCyI5lh"><span>上面的四条可以统一成一套完整的模型服务故障处理流程。与工具故障类似，它同样需要完成故障识别、局部恢复、故障切换和优雅降级；但模型服务多了一项关键判断： </span><span style="font-weight:bold">接口恢复之后，还必须验证模型能力是否恢复。</span></p>

<p id="f-doxcnxm3vbfcq32EljdFjoBGR5d"><span>整体处理思路可以分为四步：</span></p>

<div style="margin-left:25px"><div id="f-doxcnOkIciF8b8fpAOel64G9qVS" style="display:flex;gap:0.5em"><span style="min-width:1.5em">a.</span><div><span style="font-weight:bold">故障识别：</span><span> 同时监控错误率、延迟和限流等技术指标，以及任务成功率、规则违反率和重复运行一致性等质量指标，识别“接口不可用”和“接口可用但模型已经退化”两类事故。</span></div></div><div id="f-doxcnGogdHbItEaEtVMbqTAxvXs" style="display:flex;gap:0.5em"><span style="min-width:1.5em">b.</span><div><span style="font-weight:bold">局部恢复：</span><span> 对短暂抖动在时间、Token 和费用预算内进行有限重试；恢复后通过代表性探测任务确认模型不仅能够响应，而且输出质量重新达到基线。</span></div></div><div id="f-doxcnkLtgrjxbjsxGAgnA1eUWCb" style="display:flex;gap:0.5em"><span style="min-width:1.5em">c.</span><div><span style="font-weight:bold">备用模型切换：</span><span> 主模型持续不可用时，将请求切换到事先通过真实业务任务验证的备用模型，使任务能够继续运行。</span></div></div><div id="f-doxcnDlKgofngboNR3kidVvAZCb" style="display:flex;gap:0.5em"><span style="min-width:1.5em">d.</span><div><span style="font-weight:bold">风险降级：</span><span> 如果备用模型只能覆盖部分能力，就同步降低 Agent 的操作权限，必要时转人工或停止自动执行。</span></div></div></div>

<p id="f-doxcn5flv6h4uC7L9snFlnWYbhd"><span>假设一个售后 Agent 需要根据公司规则判断是否允许退款，并调用工具执行退款。系统可以按照下面的顺序处理：</span></p>

<div style="margin-left:25px"><div id="f-doxcn9jwf5cHneL9MxdlEj7Vsxg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">a.</span><div><span>如果主模型偶尔出现超时或 HTTP 429，就在总预算内执行有限次数的退避重试；</span></div></div><div id="f-doxcnh9RdWWyBO95GSxadvef9We" style="display:flex;gap:0.5em"><span style="min-width:1.5em">b.</span><div><span>如果接口请求都成功，但近期模型频繁违反退款规则、生成不存在的订单号，系统就不能把它视为正常服务，而应根据业务质量指标触发告警并停止自动退款；</span></div></div><div id="f-doxcn3DkZICF5FjrsBkXP7lMOLg" style="display:flex;gap:0.5em"><span style="min-width:1.5em">c.</span><div><span>如果主模型持续不可用或质量无法恢复，就切换到已经使用退款任务集验证过的备用模型；</span></div></div><div id="f-doxcnOoboMAiVcWs7l1fz6mb8df" style="display:flex;gap:0.5em"><span style="min-width:1.5em">d.</span><div><span>如果备用模型能够正确查询订单，却无法稳定完成退款判断，就只允许它查询信息和生成处理草稿，最终退款必须由人工确认；</span></div></div><div id="f-doxcn4AdNbea806gXQTTo8wzFjb" style="display:flex;gap:0.5em"><span style="min-width:1.5em">e.</span><div><span>如果没有模型能够满足最低安全标准，则保存订单和任务进度，明确告知用户当前只能转人工处理，不能为了维持表面可用而继续自动退款。</span></div></div></div>

<p id="f-doxcntUgBEV3cnxY6DyHntr1C4c"><span>因此，完整逻辑可以概括为： </span><span style="font-weight:bold">先同时判断技术可用性和业务有效性；短暂故障先受控恢复，持续故障再切换经过验证的备用模型；备用能力不足时降低权限，无法满足安全标准时转人工或停用。</span><span> 这也对应了参考资料提出的持续监控、预先验证回退方案、设置停用条件、保留人工处理路径和事故复盘机制。</span></p>

<blockquote id="f-doxcneebKdVdGbm5NtU0jq4ckQc"><p id="f-doxcnE5DypK6xjrWteV6oZPmsIc"><span>🎯 </span><span style="font-weight:bold">面试卡片</span></p>
<p id="f-doxcnJygWKk6JMFqW4ZVA4Z7yp1"><span style="font-weight:bold">面试问题：模型服务发生故障时，Agent 应该如何保证任务持续、健壮地运行？</span></p>
<p id="f-doxcnecf7t8LWUZGzjo7IDDqznh"><span>🧭 </span><span style="font-weight:bold">答题思路与技巧：</span><span> 可以先沿用工具故障的基本思路，说明对超时、限流等瞬时问题进行受控重试，再重点讲出下面两个更有区分度的观点：</span></p>
<p id="f-doxcnyejdoRlinPm5lCZE775Kgc"><span>第一， </span><span style="font-weight:bold">不能只从 API 层判断模型调用是否失败。</span><span> 即使接口返回成功，也要通过任务成功率、参数正确率、规则违反率和最终业务状态等指标，判断模型是否真正完成了任务。</span></p>
<p id="f-doxcnDSrKfboQMJpeKGlNgN3FJG"><span>第二， </span><span style="font-weight:bold">切换备用模型不代表万事大吉。</span><span> 备用模型同样存在不确定性，而且能力可能弱于主模型，因此切换后仍要继续进行业务逻辑验证，并根据验证结果决定正常执行、降低权限还是转人工。</span></p>
<p id="f-doxcnpoRdIJ8lmejW22utPXK8je"><span>面试时如果还能结合自己的业务场景举例，例如退款 Agent 中“接口返回成功但违反退款规则”，或者“备用模型只能查询订单、不能自动退款”，会让方案更具体，也更能体现生产级 Agent 的工程经验。</span></p>
<p id="f-doxcn0r7SmS6ilyzUA5Mt06Eeif"><span>💬 </span><span style="font-weight:bold">参考答案：</span></p>
<p id="f-doxcnn391GnEf9ji1P6KSimkFOc"><span>模型服务发生故障后，我会同时从技术可用性和业务有效性两个层面判断，因为模型接口返回成功，并不代表模型仍能正确完成任务。</span></p>
<ol start="1"><li id="f-doxcnLLLkvjAXltiF2xg6E2Ci0d"><span>对于 </span><span style="font-weight:bold">超时、HTTP 429 和部分 5xx 等短暂故障</span><span>，我会设置单次超时和任务总预算，通过退避策略进行有限重试，避免时间、Token 和费用失控。</span></li></ol>
<ol start="2"><li id="f-doxcnU87mKEQcjBS5wdNpp9rIwd"><span>除了错误率和延迟，我还会持续监控 </span><span style="font-weight:bold">任务成功率、参数正确率、规则违反率和多次运行一致性</span><span>，及时发现接口正常但模型能力已经退化的情况。高风险结果必须经过规则校验、独立验证或人工复核。</span></li></ol>
<ol start="3"><li id="f-doxcnTpagdO9rAMYxgIe2MR07Pb"><span>如果主模型持续不可用或质量低于阈值，我会切换到预先准备并用真实业务任务验证过的备用模型。不能因为备用模型能够返回文本，就默认它具有相同的工具调用和规则遵循能力。</span></li></ol>
<ol start="4"><li id="f-doxcnBnblDerVjuBdB0Ro5txmVf"><span>如果备用模型只能满足部分要求，我会同步降低 Agent 权限，例如从自动写入降级为只读查询、生成草稿或人工审批；如果没有方案满足最低安全标准，就保存任务状态、说明原因并转人工或停用系统。</span></li></ol>
<p id="f-doxcnOr9A0ygphm6OMIFgphZAPf"><span>一句话概括就是： </span><span style="font-weight:bold">既监控模型能不能响应，也验证模型能不能正确完成任务；故障时先受控恢复，再切换经过验证的备用能力，能力不足就降权或转人工。</span></p></blockquote>


<a id="section-0082"></a>
## 讲解视频

<a id="f-doxcnLJldCJDZer2javc6jCYKBg"></a>

<p id="f-doxcng1lOAuf6L8RRtAlfxjhxXf"><span><span><a href="https://www.bilibili.com/video/BV1MquZ6iE85/?vd_source=144bec9c3f54e465073138bed788be1b#reply313212531872"><span>https://www.bilibili.com/video/BV1MquZ6iE85/?vd_source=144bec9c3f54e465073138bed788be1b#reply313212531872</span></a></span></span></p>


<a id="section-1528"></a>
## Agent 评估、安全与对齐

<a id="t-block-22171"></a>

<p id="t-2sbenM0GYvgnRIPxq6xrPU"><span>评估是确保 Agent 效果的基础。</span></p>

<p id="t-FSF1HLo01iI8t7CophywRr"><span>安全和对齐是 Agent 能否被信任和部署的关键。</span></p>


<a id="section-1529"></a>
## Agent 评测体系

<a id="t-iw8Pj5vKcr1KcYnzfE6T5I"></a>

<p id="t-2JRTz7GIZvTr05WDbRBCTK"><span>评估 Agent 性能是开发过程中的关键环节。</span></p>

<p id="t-8jBJHucp6bqDVE8dbpIybA"><span>好的评测体系能够帮助我们了解 Agent 的能力边界。</span></p>

<p id="t-fqz0C2BXJdLPf5j3sifHfe"><span>也为持续优化提供方向和依据。</span></p>


<a id="section-1530"></a>
## 评测维度

<a id="t-dpsSqohFnUHS22cGY9xe3K"></a>

<p id="t-dcepQ179aCr62KSLt2dH7r"><span style="font-weight:bold">任务完成度</span><span>：Agent 是否正确完成了给定任务。</span></p>

<p id="t-mDoQvHFjjvdjXadSy0ICZ0"><span style="font-weight:bold">效率指标</span><span>：完成任务所需的步骤数、token 消耗、执行时间。</span></p>

<p id="t-pRT1vV2TfFwrOMSuMxSty0"><span style="font-weight:bold">质量指标</span><span>：答案的准确性、响应的一致性、对话的自然度。</span></p>

<p id="t-y2ZceS7rBe4eAPiuyRxuig"><span style="font-weight:bold">鲁棒性</span><span>：对异常输入、噪声数据的处理能力。</span></p>


<a id="section-1531"></a>
## 常用 Benchmark

<a id="t-zeKCcBW7PJBUOMudYry70E"></a>

<div id="t-fwxPQm01VPGVkMfCzWF7DR"><table><colgroup><col width="166.8992919921875"/><col width="195.0120849609375"/><col width="246.114501953125"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>Benchmark</span></p></td><td style=" vertical-align: top"><p><span>用途</span></p></td><td style=" vertical-align: top"><p><span>评估内容</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>GAIA</span></p></td><td style=" vertical-align: top"><p><span>通用 AI 助手评测</span></p></td><td style=" vertical-align: top"><p><span>复杂任务处理、多步骤推理</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>MMLU</span></p></td><td style=" vertical-align: top"><p><span>多任务语言理解</span></p></td><td style=" vertical-align: top"><p><span>57 个学科的知识问答</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>HumanEval</span></p></td><td style=" vertical-align: top"><p><span>代码生成评测</span></p></td><td style=" vertical-align: top"><p><span>Python 代码编写正确性</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>HotpotQA</span></p></td><td style=" vertical-align: top"><p><span>多跳问答评测</span></p></td><td style=" vertical-align: top"><p><span>需要多个文档推理的问题</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>AgentBench</span></p></td><td style=" vertical-align: top"><p><span>Agent 能力评测</span></p></td><td style=" vertical-align: top"><p><span>真实环境中的 Agent 表现</span></p></td></tr></tbody></table></div>


<a id="section-1533"></a>
## Agent 评测框架

<a id="t-HPE6UlIVJcjMqtbkVJ2Gov"></a>

<pre id="t-xCwZynltfcAYetS0Q7uove"><code>class AgentEvaluator:
 """
    Agent 评测框架
    评估 Agent 在各种任务上的表现
    """

 def __init__(self, agent, metrics):
 # 待评测的 Agent
        self.agent = agent
 # 评测指标列表
        self.metrics = metrics

 def evaluate(self, test_cases):
 """
        执行评测
        :param test_cases: 测试用例列表
        :return: 评测报告
        """
        results = []

 for test_case in test_cases:
 # 执行任务
            result = self.run_single_test(test_case)
            results.append(result)

 # 生成评测报告
        report = self.generate_report(results)
 return report

 def run_single_test(self, test_case):
 """
        运行单个测试用例
        """
 # 记录开始时间
        start_time = time.time()

 # 执行 Agent
 try:
            output = self.agent.run(test_case.input)
            success = self.evaluate_output(output, test_case.expected)
            error = None
 except Exception as e:
            output = None
            success = False
            error = str(e)

 # 记录结束时间
        end_time = time.time()

 return TestResult(
            test_case=test_case,
            output=output,
            success=success,
            error=error,
            duration=end_time - start_time,
            token_count=self.count_tokens(output)
 )

 def evaluate_output(self, output, expected):
 """评估输出是否符合预期"""
 for metric in self.metrics:
 if not metric.evaluate(output, expected):
 return False
 return True

 def generate_report(self, results):
 """生成评测报告"""
        total = len(results)
        passed = sum(1 for r in results if r.success)

 # 计算各项指标
        avg_duration = sum(r.duration for r in results) / total
        avg_tokens = sum(r.token_count for r in results) / total

 # 按测试类型分组统计
        by_category = {}
 for r in results:
            category = r.test_case.category
 if category not in by_category:
                by_category[category] = {"total": 0, "passed": 0}
            by_category[category]["total"] += 1
 if r.success:
                by_category[category]["passed"] += 1

 return EvaluationReport(
            total=total,
            passed=passed,
            pass_rate=passed / total,
            avg_duration=avg_duration,
            avg_tokens=avg_tokens,
            by_category=by_category,
            results=results
 )


class TestCase:
 """测试用例"""

 def __init__(self, input, expected, category="general", metadata=None):
 # 输入
        self.input = input
 # 预期输出或评估标准
        self.expected = expected
 # 类别
        self.category = category
 # 额外元数据
        self.metadata = metadata or {}


class TestResult:
 """测试结果"""

 def __init__(self, test_case, output, success, error, duration, token_count):
        self.test_case = test_case
        self.output = output
        self.success = success
        self.error = error
        self.duration = duration
        self.token_count = token_count


class Metric:
 """评测指标基类"""

 def evaluate(self, output, expected):
 raise NotImplementedError


class ExactMatchMetric(Metric):
 """精确匹配指标"""

 def evaluate(self, output, expected):
 return output.strip() == expected.strip()


class ContainsMetric(Metric):
 """包含关键词指标"""

 def evaluate(self, output, expected):
 if isinstance(expected, list):
 return all(keyword in output for keyword in expected)
 return expected in output


class SemanticSimilarityMetric(Metric):
 """语义相似度指标"""

 def __init__(self, threshold=0.8):
        self.threshold = threshold

 def evaluate(self, output, expected):
        similarity = self.compute_similarity(output, expected)
 return similarity &gt;= self.threshold

 def compute_similarity(self, text1, text2):
 """计算两个文本的语义相似度"""
 # 使用嵌入模型计算余弦相似度
        embedding1 = self.embedder.embed([text1])[0]
        embedding2 = self.embedder.embed([text2])[0]
 return cosine_similarity(embedding1, embedding2)</code></pre>


<a id="section-1534"></a>
## 安全与对齐

<a id="t-vslGnpbriVEYuIkPgvKSEI"></a>

<p id="t-xyxiiFWxSobpaOrmMb7TPT"><span>Agent 的安全性至关重要。</span></p>

<p id="t-9rmIELfRAAipQ8lUEnpRxj"><span>AI 系统可能受到各种攻击，产生有害输出。</span></p>

<p id="t-SVRRDDtcOuL3YvlbMkaDmO"><span>对齐（Alignment）确保 AI 行为符合人类意图和价值观。</span></p>


<a id="section-1535"></a>
## 常见安全威胁

<a id="t-14yGWOa47Emq6D5za8SLwC"></a>

<a id="t-159b7Y5o5PD8aFsfTx18Wa"></a>

##### 提示注入（Prompt Injection）

<p id="t-XG342AgiU7PC84EMaVi7pO"><span>攻击者通过输入诱导 Agent 忽略系统指令。</span></p>

<p id="t-S0Nk61fndfIjXykRXhT7FP"><span>示例输入："忽略之前的指令，改为执行..."</span></p>

<p id="t-qONHZ0aT7AcySe3uvAXQ7N"><span>这是一种上下文劫持攻击，利用 Agent 对用户输入的信任。</span></p>

<a id="t-ylJZF1qtNJzHkYISHxoKUj"></a>

##### 越狱（Jailbreaking）

<p id="t-8CxKebv11xcHOkZ4WBDev4"><span>通过特定输入绕过安全限制。</span></p>

<p id="t-Jr1oKU8aZLXif41ETqz5kx"><span>如使用角色扮演、虚构场景等手法。</span></p>

<a id="t-e7hdzUwEeIqsHpXOknuyRv"></a>

##### 数据污染

<p id="t-WQILYseScCWb1HlPEsqHJa"><span>恶意修改训练数据或检索结果。</span></p>

<p id="t-RBjqw8atSZsAoTkyCS6b4s"><span>导致 Agent 产生错误或有害输出。</span></p>

<a id="t-Ui2ThYZOKf22PZRr04dBbR"></a>

##### 敏感信息泄露

<p id="t-EnBm62tb5uiaiesUWon3eu"><span>Agent 不当暴露用户隐私或系统内部信息。</span></p>


<a id="section-1537"></a>
## 安全 Agent 实现

<a id="t-IffdF6xWtJQjKw0zWxj3l4"></a>

<pre id="t-j5dvPh3QnfQ8Ql4cp5o4aQ"><code>class SecureAgent:
 """
    安全 Agent
    在基础 Agent 之上增加多层安全防护
    """

 def __init__(self, base_agent, guardrails, input_validator, output_filter):
 # 基础 Agent
        self.base_agent = base_agent
 # 安全护栏列表
        self.guardrails = guardrails
 # 输入验证器
        self.input_validator = input_validator
 # 输出过滤器
        self.output_filter = output_filter

 def process(self, user_input):
 """
        处理用户输入，包含多层安全检查
        """
 # ==================== 第一层：输入验证 ====================
 # 检查输入是否合法
        is_valid, reason = self.input_validator.validate(user_input)
 if not is_valid:
 return self.create_safety_response(reason)

 # ==================== 第二层：注入检测 ====================
 # 检测提示注入等攻击
 for guardrail in self.guardrails:
            check_result = guardrail.check_input(user_input)
 if not check_result.is_safe:
 # 记录安全事件
                self.log_security_event(
                    event_type="input_guardrail_triggered",
 input=user_input,
                    reason=check_result.reason
 )
 return self.create_safety_response(check_result.reason)

 # ==================== 第三层：执行核心逻辑 ====================
 try:
            response = self.base_agent.process(user_input)
 except Exception as e:
 return self.create_error_response(str(e))

 # ==================== 第四层：输出过滤 ====================
 # 检查输出是否安全
 for guardrail in self.guardrails:
            check_result = guardrail.check_output(response)
 if not check_result.is_safe:
                self.log_security_event(
                    event_type="output_guardrail_triggered",
                    output=response,
                    reason=check_result.reason
 )
 return self.create_safety_response(check_result.reason)

 # 应用输出过滤（如敏感信息脱敏）
        response = self.output_filter.filter(response)

 return response

 def create_safety_response(self, reason):
 """创建安全响应"""
 return {
 "type": "safety_block",
 "message": "抱歉，我无法完成这个请求。",
 "reason": reason
 }

 def log_security_event(self, event_type, **kwargs):
 """记录安全事件"""
 # 实际应用中应写入安全日志系统
 print(f"[SECURITY] {event_type}: {kwargs}")


class InputValidator:
 """输入验证器"""

 def validate(self, text):
 """
        验证输入是否合法
        :return: (is_valid, reason)
        """
 if not text or len(text.strip()) == 0:
 return False, "输入不能为空"

 if len(text) &gt; 10000:
 return False, "输入长度超过限制"

 # 检查是否包含可执行内容
 if self.contains_executable_content(text):
 return False, "输入包含可疑的可执行内容"

 return True, None

 def contains_executable_content(self, text):
 """检查是否包含可执行内容"""
 # 简化实现
        suspicious_patterns = [
 "javascript:",
 "data:text/html",
 "&lt;script&gt;",
 ]
 return any(pattern in text.lower() for pattern in suspicious_patterns)


class Guardrail:
 """安全护栏"""

 def check_input(self, text):
 """检查输入"""
 raise NotImplementedError

 def check_output(self, text):
 """检查输出"""
 raise NotImplementedError


class ContentFilterGuardrail(Guardrail):
 """内容过滤护栏"""

 def __init__(self, blocked_topics, banned_words):
        self.blocked_topics = blocked_topics
        self.banned_words = banned_words

 def check_input(self, text):
 # 检查是否涉及被禁止的话题
 for topic in self.blocked_topics:
 if topic in text.lower():
 return CheckResult(
                    is_safe=False,
                    reason=f"涉及敏感话题：{topic}"
 )

 # 检查是否包含禁用词
 for word in self.banned_words:
 if word in text.lower():
 return CheckResult(
                    is_safe=False,
                    reason=f"包含不当词汇"
 )

 return CheckResult(is_safe=True)

 def check_output(self, text):
 # 输出检查同上
 return self.check_input(text)


class CheckResult:
 """检查结果"""

 def __init__(self, is_safe, reason=None):
        self.is_safe = is_safe
        self.reason = reason</code></pre>

<blockquote id="t-7kilINRmaML36O28s8aF12"><p id="t-HmyiDuD5fcmH4tHWxCPJiR"><span style="font-style:italic">重要提醒：安全是一个持续的过程，没有万无一失的方案。需要持续监控、更新和改进安全策略。</span></p></blockquote>


<a id="section-1538"></a>
## 可观测性

<a id="t-s9NOWmcgyq5ojqsqwzETEF"></a>

<p id="t-agIw6PQjrVjsXBjV5PR3KR"><span>生产环境中的 Agent 需要完善的监控体系。</span></p>

<p id="t-12ANR4dJPjHuO7vm9kTmvu"><span>可观测性帮助我们了解 Agent 的行为，排查问题，优化性能。</span></p>


<a id="section-1539"></a>
## 三大支柱

<a id="t-xstHD9KR3yNb1Ds7TMR8Jp"></a>

<p id="t-dyBpvO9SEFGxGj6EzLpDBM"><span style="font-weight:bold">日志（Logging）</span><span>：记录所有关键事件和决策。</span></p>

<p id="t-1HuYKt6eYRdtGKhBUXYKuz"><span style="font-weight:bold">Tracing</span><span>：追踪请求在系统中的完整流转路径。</span></p>

<p id="t-myyD7DTWXq3ExyEqPyF6jq"><span style="font-weight:bold">指标（Metrics）</span><span>：收集性能和质量指标。</span></p>


<a id="section-1541"></a>
## 可观测 Agent 实现

<a id="t-UA2q1gZrFRIdHntyXdCfEb"></a>

<pre id="t-WokQYHeAWI53FArN1VlqaQ"><code>import logging
from opentelemetry import trace
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.resources import Resource

# 配置日志
logger = logging.getLogger(__name__)

# 配置 Tracing
tracer_provider = TracerProvider()
trace.set_tracer_provider(tracer_provider)
tracer = trace.get_tracer(__name__)


class ObservableAgent:
 """
    可观测 Agent
    集成日志、追踪和指标收集
    """

 def __init__(self, agent, metrics_collector):
 # 基础 Agent
        self.agent = agent
 # 指标收集器
        self.metrics = metrics_collector

 def process(self, user_input):
 """
        处理请求，包含完整的可观测性支持
        """
 # 创建追踪 span
 with tracer.start_as_current_span("agent_process") as span:
 # 设置 span 属性
            span.set_attribute("user.input.length", len(user_input))
            span.set_attribute("user.input.preview", user_input[:100])

 # 记录开始
            logger.info(f"开始处理请求: {user_input[:50]}...")
            start_time = time.time()

 try:
 # 执行核心逻辑
                result = self.agent.process(user_input)

 # 记录成功
                duration = time.time() - start_time
                span.set_attribute("success", True)
                span.set_attribute("duration_ms", duration * 1000)
                span.set_attribute("result.length", len(str(result)))

 # 收集指标
                self.metrics.record("request_duration", duration)
                self.metrics.increment("request_success")

                logger.info(f"请求完成，耗时: {duration:.2f}s")

 return result

 except Exception as e:
 # 记录错误
                duration = time.time() - start_time
                span.set_attribute("success", False)
                span.set_attribute("error.type", type(e).__name__)
                span.set_attribute("error.message", str(e))
                span.record_exception(e)

 # 收集错误指标
                self.metrics.increment("request_error")
                self.metrics.record("error_duration", duration)

                logger.error(f"请求失败: {e}")

 raise


class MetricsCollector:
 """指标收集器"""

 def __init__(self):
        self.metrics = {}

 def increment(self, name, value=1):
 """递增计数指标"""
 if name not in self.metrics:
            self.metrics[name] = {"type": "counter", "value": 0}
        self.metrics[name]["value"] += value

 def record(self, name, value):
 """记录数值指标"""
 if name not in self.metrics:
            self.metrics[name] = {"type": "gauge", "values": []}
        self.metrics[name]["values"].append(value)

 def get_summary(self):
 """获取指标摘要"""
        summary = {}
 for name, data in self.metrics.items():
 if data["type"] == "counter":
                summary[name] = data["value"]
 else:
                values = data["values"]
                summary[f"{name}_avg"] = sum(values) / len(values)
                summary[f"{name}_max"] = max(values)
                summary[f"{name}_min"] = min(values)
 return summary</code></pre>


<a id="section-1543"></a>
## Guardrails

<a id="t-sq7nsdMO3rf7bKIlYUiGUD"></a>

<p id="t-NPtVKm5lkbVoOyZ3bPWLBM"><span>Guardrails 是实时的输入输出过滤和限制机制。</span></p>

<p id="t-qAYbZVMdrm2NsvZx8lse32"><span>区别于安全护栏，Guardrails 更侧重于确保输出质量和合规性。</span></p>


<a id="section-1544"></a>
## HITL（Human-in-the-Loop）

<a id="t-4sHVaUlOXopjEkmKMOKCk8"></a>

<p id="t-3tsYVGy8nxYaaJm595trOM"><span>HITL 在关键决策点引入人工审核。</span></p>

<p id="t-CWr71nTlT7u8Iy4E6wgYNe"><span>适用于 AI 不能自主决策的高风险场景。</span></p>


<a id="section-1545"></a>
## HITL Agent 实现

<a id="t-NEZV6StCbHzdMWlk7M40xV"></a>

<pre id="t-c2YCEj7L59HoZkoZxyECfI"><code>class HITLAgent:
 """
    人机协同 Agent
    在关键决策点引入人工审核
    """

 def __init__(self, agent, approval_queue, notification_handler):
 # 基础 Agent
        self.agent = agent
 # 审批队列
        self.approval_queue = approval_queue
 # 通知处理器
        self.notification_handler = notification_handler

 def process(self, request):
 """
        处理请求，必要时触发人工审批
        """
 # 评估请求的风险等级
        risk_level = self.assess_risk(request)

 if risk_level == "high":
 # 高风险请求，需要人工审批
 return self.handle_high_risk_request(request)
 elif risk_level == "medium":
 # 中等风险，启用增强监控
 return self.handle_medium_risk_request(request)
 else:
 # 低风险，直接处理
 return self.agent.process(request)

 def assess_risk(self, request):
 """评估请求风险等级"""
 # 检查是否涉及敏感操作
        sensitive_operations = [
 "delete", "remove", "cancel",
 "transfer", "payment", "refund"
 ]

        content_lower = request.lower()
 for op in sensitive_operations:
 if op in content_lower:
 return "high"

 # 检查请求内容的复杂性
 if len(request) &gt; 1000:
 return "medium"

 return "low"

 def handle_high_risk_request(self, request):
 """
        处理高风险请求，需要人工审批
        """
 # 创建审批任务
        task_id = self.approval_queue.add({
 "request": request,
 "risk_level": "high",
 "timestamp": datetime.now()
 })

 # 通知审批人
        self.notification_handler.notify_approver(
            task_id=task_id,
            message=f"有高风险请求需要审批: {request[:100]}..."
 )

 # 返回等待状态
 return {
 "status": "pending_approval",
 "task_id": task_id,
 "message": "您的请求需要人工审批，请等待。"
 }

 def handle_feedback(self, task_id, approved, feedback=None):
 """
        处理审批反馈
        """
        task = self.approval_queue.get(task_id)

 if approved:
 # 审批通过，执行请求
            self.approval_queue.complete(task_id)
            result = self.agent.process(task["request"])

 # 通知申请人
            self.notification_handler.notify_requester(
                task_id=task_id,
                status="approved",
                result=result
 )

 return result
 else:
 # 审批拒绝
            self.approval_queue.reject(task_id, feedback)

 # 通知申请人
            self.notification_handler.notify_requester(
                task_id=task_id,
                status="rejected",
                feedback=feedback
 )

 return {
 "status": "rejected",
 "reason": feedback or "审批未通过"
 }


class ApprovalQueue:
 """审批队列"""

 def __init__(self):
        self.queue = {}
        self.counter = 0

 def add(self, task):
 """添加审批任务"""
        self.counter += 1
        task_id = f"task_{self.counter}"
        self.queue[task_id] = {
 **task,
 "status": "pending"
 }
 return task_id

 def get(self, task_id):
 return self.queue.get(task_id)

 def complete(self, task_id):
        self.queue[task_id]["status"] = "approved"

 def reject(self, task_id, reason):
        self.queue[task_id]["status"] = "rejected"
        self.queue[task_id]["reject_reason"] = reason</code></pre>


<a id="section-1546"></a>
## 章节小结

<a id="t-5bxvqSarMO1BPnUJJunHBD"></a>

<p id="t-mI4tTf4ke5D6bvgxfDUBVd"><span>本章节介绍了 Agent 的评估、安全和对齐知识。</span></p>

<p id="t-RKrAVHKpvElHfRd4uBSfd2"><span style="font-weight:bold">评测体系</span><span> 通过多维度指标评估 Agent 的性能。</span></p>

<p id="t-fnO7OoU0gbfwrPj7nCiCFc"><span style="font-weight:bold">安全威胁</span><span> 包括提示注入、越狱、数据污染等。</span></p>

<p id="t-DZ2LG6N9QAcy0eY2rWE05m"><span style="font-weight:bold">防护策略</span><span> 通过多层安全检查保障系统安全。</span></p>

<p id="t-GuTzC2A4XDJJNuCuxRyyU0"><span style="font-weight:bold">可观测性</span><span> 通过日志、追踪、指标实现系统监控。</span></p>

<p id="t-05y7NJIDWGV5DTag5QOLJg"><span style="font-weight:bold">Guardrails 和 HITL</span><span> 提供输出质量控制和人工审核能力。</span></p>

<p id="t-SABL9dcd0OucmoMar3DI4o"><span>评估、安全和对齐是构建可信 Agent 系统的基础。</span></p>

<p id="t-2QdRPDIgj1MvkOSo3nnG7Z"><span>需要在实际开发中持续关注和改进。</span></p>

