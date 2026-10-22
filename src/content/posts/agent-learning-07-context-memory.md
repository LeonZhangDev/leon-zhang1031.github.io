---
title: "第 07 章 · 上下文工程与记忆"
date: "2026-10-22"
draft: false
author: "学习资料整理"
description: "长短期记忆、压缩、状态、持久化、会话恢复与用户画像"
tags: ["Agent", "学习路线"]
categories: ["AI 工程"]
prerequisites: ["agent-learning-06-mcp-integrations"]
verification: {"status": "not-run", "scope": "本次仅整理资料；示例代码与原文技术结论未复跑。"}
---

长短期记忆、压缩、状态、持久化、会话恢复与用户画像

[学习路线](/posts/agent-learning-route/) · [上一章](/posts/agent-learning-06-mcp-integrations/) · [下一章](/posts/agent-learning-08-intent-routing/)

本章按知识小节编排。项目内容作为学习案例阅读，示例代码与原文技术结论未在本次整理中执行验证。

## 本章目录

- [Agent的记忆功能](#section-0053)
- [介绍Langchain中的记忆功能的实现。](#section-0054)
- [介绍Langgraph中的记忆功能的实现。](#section-0055)
- [长期记忆的常见应用场景](#section-0056)
- [面试真题](#section-0057)
- [Agent 上下文工程](#section-0587)
- [核心要素](#section-0588)
- [上下文预算管理](#section-0590)
- [系统提示的工程化](#section-0591)
- [工具描述的优化](#section-0592)
- [历史记录的压缩策略](#section-0593)
- [检索上下文的质量控制](#section-0594)
- [渐进式披露](#section-0596)
- [上下文压缩链](#section-0597)
- [上下文水印](#section-0598)
- [评估与迭代](#section-0599)
- [注意事项](#section-0600)
- [相关概念](#section-0601)
- [记忆系统设计](#section-1342)
- [短期记忆：Agent 的工作记忆](#section-1343)
- [长期记忆：Agent 的知识库](#section-1344)
- [对比分析](#section-1345)
- [记忆系统架构](#section-1346)
- [对话历史管理](#section-1347)
- [对话历史的挑战](#section-1348)
- [基本的对话历史管理](#section-1349)
- [智能历史选择策略](#section-1350)
- [对话历史压缩](#section-1351)
- [向量数据库应用](#section-1352)
- [什么是向量数据库？](#section-1353)
- [向量数据库的工作流程](#section-1354)
- [使用向量数据库实现长期记忆](#section-1355)
- [向量数据库的优化技巧](#section-1356)
- [记忆压缩与总结策略](#section-1357)
- [为什么需要记忆压缩？](#section-1358)
- [记忆压缩策略](#section-1359)
- [记忆生命周期管理](#section-1360)

<a id="section-0053"></a>
## Agent的记忆功能

<a id="f-doxcnLtsULrRo7jZDajX9KFYJsd"></a>

<p id="f-doxcnUiccBFyq4WHanoal4gpwtg"><span>（属于</span><span style="font-weight:bold">必考内容</span><span>，熟练掌握</span></p>

<p id="f-doxcnC1cwv3f3V2gh5mQWj1wSlf"><span><span><a href="https://github.com/xindoo/agentic-design-patterns/blob/main/chapters/Chapter%208_%20Memory%20Management.md"><span>《Agentic design pattern》第八章</span></a></span></span><span>有对这一问题专门讲解。我把这个经典面试问题，结合了理论知识和现在最火的Openclaw结合，我相信这个回答会更让面试官眼前一亮。然后你这么回答其实把话题引到了Openclaw，所以Openclaw的知识要好好看，接着面试主动权就在我们手里了！）</span></p>

<p id="f-doxcnLFc15lylEDgTcrj3hkT3Pg"><span>Agent 的记忆功能通常分为</span><span style="font-weight:bold">短期记忆</span><span>和</span><span style="font-weight:bold">长期记忆。</span></p>

<p id="f-doxcnjXi4h62LD33R2KPEqCvcoe"><span style="font-weight:bold">短期记忆</span><span>通常存在于上下文窗口，包含最近的对话消息，智能体回复，工具调用结果，以及当前交互的反思内容。但是上下文窗口的容量有限，所以当多轮对话时，我们可以通过总结旧对话片段、强调关键细节等技术来维护这个上下文窗口。以 OpenClaw 为例，它的 Compaction 机制就是一个典型实现：当上下文 token 接近模型窗口上限时，系统会把最近约 20,000 tokens 的消息原样保留，更早的旧消息则用 LLM 分块生成结构化摘要来替代，摘要中会强制保留任务状态、决策理由、TODO 和关键标识符等信息，压缩后上下文变为"摘要加上最近原文"的结构，这样既释放了空间又尽量减少了信息损失。</span></p>

<p id="f-doxcnobJQY7EGECzyKQEdkxydrh"><span>当会话结束，短期记忆会丢失，</span><span style="font-weight:bold">所以我们通常也会让 Agent 支持长期记忆。</span><span>我们通常使用一个知识库，存储智能体在各种交互场景、任务执行过程中需要长时间保存的信息。数据通常存在智能体运行环境之外，比如数据库，知识图谱，或者向量数据库中。当智能体需要使用长期记忆时，会查询外部存储，检索相关信息和数据并整合到上下文窗口中然后进行使用。</span><span style="font-weight:bold">还是以 OpenClaw 为例</span><span>，它的长期记忆就是工作空间里的 Markdown 文件——</span><span><span><span>MEMORY.md</span></span></span><span> 存策展过的持久知识和偏好，</span><span><span><span>memory/YYYY-MM-DD.md</span></span></span><span> 按日期存追加式日志。在检索侧，系统会对这些文件建立混合搜索索引，同时使用向量语义搜索和 BM25 关键词搜索，按 7:3 权重做混合排序。Agent 需要回忆历史时，通过 </span><span><span><span>memory_search</span></span></span><span> 工具按需检索相关片段再拉进上下文，而不是把全部记忆都塞进去，这就是典型的 RAG 式长期记忆方案。</span></p>

<p id="f-doxcnNjXyobdvTXEvX9wi5fdnVe"><span>此外还有一个值得一提的设计，</span><span style="font-weight:bold">就是短期记忆向长期记忆的自动沉淀机制</span><span>。OpenClaw 在压缩前会静默触发一轮 agent 回合，提醒模型把当前对话中重要的信息写入记忆文件，这样短期记忆中真正有价值的内容能在被压缩丢弃之前沉淀为长期记忆，保证了记忆的连续性。</span></p>


<a id="section-0054"></a>
## 介绍Langchain中的记忆功能的实现。

<a id="f-doxcnv88Css8jU8a4teVraJZKZd"></a>

<p id="f-doxcnJn1uRKVjx5nqr5iCEmm5Gb"><span>(短期记忆）Langchain中通过</span><span style="font-weight:bold">ConversationBufferMemory</span><span>的接口，可以实现只保存几轮对话，或者使用LLM总结历史对话的短期记忆功能。</span></p>

<p id="f-doxcnoYetzY7u3rGaa3H1WaYZCe"><span>（长期记忆）通过</span><span style="font-weight:bold">VectorStoreRetrieverMemory</span><span>可以将信息变成嵌入向量，存入Chroma, weaviate , FAISS的数据库中，并且支持语义搜索。</span></p>


<a id="section-0055"></a>
## 介绍Langgraph中的记忆功能的实现。

<a id="f-doxcnq5CpGwq0OKeAtEWm4RjyHV"></a>

<p id="f-doxcnOHkaNBRKkCLYHRu6yl7Ldc"><span>(参考</span><span><span><a href="https://mp.weixin.qq.com/s/XhFbLTLcSjDj0r3KGT9EOg"><span>https://mp.weixin.qq.com/s/XhFbLTLcSjDj0r3KGT9EOg</span></a></span></span><span>， 这个文章对Langgraph的各方面写得很详细，想深入学可以仔细阅读，想简单学习可以当字典查。比如这个Langgraph的记忆功能，这里面就有现成答案，我直接照抄，不理解的可以看原文，里面也有讲解，原文里还有代码。）</span></p>

<p id="f-doxcnnIiDXrGzUk3EaH161sbIhe"><span> 记忆是智能体运行中记住先前交互信息的组件，是能够连贯对话的核心能力，LangGraph中提供了</span><span style="font-weight:bold">短期记忆和长期记忆。</span></p>

<p id="f-doxcnSQKhrpzoQ5JphJgwKbBPRc"><span style="font-weight:bold">1、短期记忆：</span><span>存储当前对话上下文的信息，作用于单次会话或线程，通过thread_id（会话id）区分，通过</span><span style="font-weight:bold">图状态</span><span>（State）和</span><span style="font-weight:bold">检查点</span><span>（Checkpoint）实现。</span></p>

<p id="f-doxcnbPcSfg4AS08u0mjegHPS0b"><span style="font-weight:bold">2、长期记忆：</span><span>长期记忆用于存储那些需要在不同会话间保留的信息。它通过 </span><span style="font-weight:bold">存储库（Store）</span><span> 接口实现，类似于一个键值数据库，并支持基于向量嵌入的语义检索。与线程范围的短期记忆不同，长期记忆保存在自定义的“命名空间”中。</span></p>

<div id="f-doxcnMJAVpOccMDxpTYSUzfUggc"><img alt="" decoding="async" height="666" loading="lazy" src="/images/agent-learning/cad56c0124138ca1bb5b540f.png" width="968"/></div>


<a id="section-0056"></a>
## 长期记忆的常见应用场景

<a id="f-doxcnedGCuf5pLpbokvK5VHxBCf"></a>

<p id="f-doxcnAh1bjVUgOwpuPucLVQ8cBd"><span>（依旧是从我推荐的书籍《Agentic design pattern》中给大家总结， 在面试聊到长期记忆的时候，我们可以给面试官举一些常见应用场景下具体的长期记忆的例子，这个问题倒是不会直接被问。不过记忆部分是重点，很多场合其实会聊到。聊到了能清晰有条理的列举一些长期记忆典型例子就很好。）</span></p>

<p id="f-doxcnJwGyMoQg9DWZgShZKegYog"><span><span><a href="https://github.com/fzy2012/rhzl-Agentic-Design-Patterns-cn/blob/feature/interactive-website/14-Chapter-08-Memory-Management.md"><span>https://github.com/fzy2012/rhzl-Agentic-Design-Patterns-cn/blob/feature/interactive-website/14-Chapter-08-Memory-Management.md</span></a></span></span></p>

<p id="f-doxcnyAL6AssKJKpCg8wRHPOPPh"><span>常见的长期记忆的例子是：</span></p>

<p id="f-doxcn6Er4mNXquHFNveQ07Lvjf2"><span>1. 聊天机器人 / 对话式 AI：</span></p>

<p id="f-doxcnz8KWCQ4AbRB236d1aAYWLc"><span style="font-weight:bold">存储内容：</span><span>用户偏好、过往对话摘要、关键话题记录。</span></p>

<p id="f-doxcnnjuarmlCYNqgPZI3XTefpe"><span style="font-weight:bold">作用</span><span>：提供个性化且连贯的交互体验，避免用户重复自我介绍，让对话更自然流畅。</span></p>

<p id="f-doxcndsuIrLBulsPZzg4jStTIuh"><span>2.个性化服务AI：</span></p>

<p id="f-doxcnXNFyyLLkNhK8CRI7GiA8qd"><span style="font-weight:bold">存储内容：</span><span>用户偏好、历史行为模式、个人画像信息</span></p>

<p id="f-doxcnGjnR7eLXLXDJHEs3y8Dncb"><span style="font-weight:bold">作用</span><span>：动态调整响应策略和推荐内容，提供更精准的个性化服务。</span></p>

<p id="f-doxcn48OmAINYaPM5hO9jBhPrUc"><span>3.智能客服 / 售后 AI</span></p>

<p id="f-doxcnbl7UP6haxBThrzr5JRM29f"><span style="font-weight:bold">存储内容：</span><span>历史工单、问题解决记录、用户满意度反馈</span></p>

<p id="f-doxcnkEIIxhsKN0ZU3x0ZOr8X8o"><span style="font-weight:bold">作用</span><span>：快速定位老用户的历史问题，避免重复排查，提升服务效率。</span></p>


<a id="section-0057"></a>
## 面试真题

<a id="f-doxcnjh5JnpsHs7qw2dMPBnbgob"></a>

<a id="f-doxcnJVFtDv4a0fU60Asm8BFmeg"></a>

##### 请介绍一下Agent 记忆的常见类型与作用。

<p id="f-doxcnxy9kijIi1jQND0OSTOzzgb"><span>💡 </span><span style="font-weight:bold">思路：</span><span> 这个就是最典型的八股问题了。大的分类上来说，Agent记忆分</span><span style="font-weight:bold">长期记忆</span><span>和</span><span style="font-weight:bold">短期记忆</span><span>，我参考了一些书籍，再把</span><span style="font-weight:bold">长期记忆</span><span>分成：</span><span style="font-weight:bold">语义记忆</span><span>，</span><span style="font-weight:bold">情景记忆</span><span>，</span><span style="font-weight:bold">程序性记忆</span><span>三类，方便大家理解。 答题的时候从这个角度出发，分类型讲解。同时我在</span><span style="font-weight:bold">长期记忆</span><span>这里加入了举例，以最近比较火的DSH框架为例，写了例如 DSX xx，让答案更具体，侧面表明了自己看过DSH 框架，也可以把话题引导到DSH上。当然这里可以替换成用你自己的项目举例，或者其他的开源项目举例。 另外，这个回答也是另一个典型的八股：</span><span style="font-weight:bold">长期记忆</span><span>主要存哪些东西 的参考答案。</span></p>

<p id="f-doxcnoMM0yqG3a7bOplsTjGI4Zg"><span>📝 </span><span style="font-weight:bold">答案：</span></p>

<p id="f-doxcnpqB6Qi4911ZAQpd9girTFg"><span>Agent 的记忆从生命周期上主要分为</span><span style="font-weight:bold">短期记忆和长期记忆</span><span>。其中，</span><span style="font-weight:bold">长期记忆</span><span>还可以根据信息内容进一步分为</span><span style="font-weight:bold">语义记忆、情景记忆和程序性记忆</span><span>。</span></p>

<p id="f-doxcn3XaCmi4RxEHEevyAEice7f"><span style="font-weight:bold">短期记忆</span><span>也叫</span><span style="font-weight:bold">工作记忆</span><span>，主要保存当前</span><span style="font-weight:bold">对话历史、任务目标</span><span>、最近的</span><span style="font-weight:bold">工具调用</span><span>结果以及执行过程中的中间状态。它的作用是</span><span style="font-weight:bold">保持当前任务的上下文连续性</span><span>，支持 Agent 进行多轮对话和多步推理。例如在 DSH 中，用户消息、模型回复、</span><span style="font-weight:bold">工具调用</span><span>和工具执行结果都会记录在当前 Session 中，并用于构造模型下一轮看到的上下文。当对话过长时，DSH 会通过 </span><span style="font-weight:bold">Compaction</span><span> 将较早的历史压缩成摘要，从而控制上下文长度。</span></p>

<p id="f-doxcnRXYhgRT8G8uaqbXWHU0qae"><span style="font-weight:bold">长期记忆</span><span>用于</span><span style="font-weight:bold">跨任务、跨会话地保存信息</span><span>，可以进一步分为三类：</span></p>

<p id="f-doxcnaNrDKQf0ehxL860yJhPt3e"><span>第一类是</span><span style="font-weight:bold">语义记忆</span><span>，</span><span style="font-weight:bold">保存相对稳定的事实、概念和用户偏好，主要用于事实召回和个性化</span><span>。例如，DSH 可以通过 </span><span style="font-weight:bold">Memory MCP</span><span> 接入外部记忆系统，保存“用户习惯使用 TypeScript”“用户希望使用中文回答”等信息，并在新的会话中重新检索和使用。</span></p>

<p id="f-doxcnAfCVTQmUqNGKTBym0mAp5v"><span>第二类是</span><span style="font-weight:bold">情景记忆</span><span>，保存过去</span><span style="font-weight:bold">发生的事件</span><span>、</span><span style="font-weight:bold">对话和任务经历</span><span>，</span><span style="font-weight:bold">主要用于回顾历史经验和避免重复犯错。</span><span>例如，DSH 可以通过 </span><span style="font-weight:bold">JSONL</span><span> 或 </span><span style="font-weight:bold">SQLite</span><span> 持久化过去的 Session，其中包括对话内容、修改过的文件、调用过的工具以及执行结果。后续可以通过会话查询能力，查找“上一次修复登录问题时采用了什么方案、测试是否通过”。</span></p>

<p id="f-doxcnFIRKtAtj3LSVc0KgE8PJ0b"><span>第三类是</span><span style="font-weight:bold">程序性记忆</span><span>，保存完成任务的方法、操作步骤和执行策略，主要用于</span><span style="font-weight:bold">复用已经形成的技能和工作流程</span><span>，提高执行效率与稳定性。例如，DSH 通过 </span><span style="font-weight:bold">Skill</span><span>、</span><span style="font-weight:bold">AGENTS.md</span><span> 和 </span><span style="font-weight:bold">Workflow</span><span> 保存“修改代码前先读取仓库规范”“修改完成后运行对应测试”“遇到特定任务时加载相应 </span><span style="font-weight:bold">Skill</span><span>”等执行规则。从功能上看，这些规则承担了</span><span style="font-weight:bold">程序性记忆</span><span>的作用。</span></p>

<p id="f-doxcnnVEGn2AVqviQMmyiMfDCMe"><span>总结来说，</span><span style="font-weight:bold">短期记忆</span><span>保存 Agent 当前正在做什么；</span><span style="font-weight:bold">语义记忆</span><span>保存它知道什么；</span><span style="font-weight:bold">情景记忆</span><span>保存它经历过什么；</span><span style="font-weight:bold">程序性记忆</span><span>保存它应该怎么做。</span></p>

<p id="f-doxcnfYPVWveqD0MQPmFfzqniOd"><span>需要注意的是，DSH 的跨会话</span><span style="font-weight:bold">语义记忆</span><span>需要额外启用 </span><span style="font-weight:bold">Memory MCP</span><span>，并不是默认内置开启的。</span></p>

<p id="f-doxcnD4f9FZyUrI4TOkhK4E3wId"><span>面试问题选自</span><span><span><a href="/posts/agent-learning-24-interview-review/#f-doxcnLwvMct6TRFGLpxiGfj1cod"><span>202607 宇树科技Agent开发一面</span></a></span></span><span>。</span></p>

<a id="f-doxcnBuRujgpgYxYElrP9aHllHb"></a>

##### 多轮对话状态管理要考虑哪些关键要素

<p id="f-doxcnNMkZFysDX7eVcwKkTrcuQg"><span>💡 </span><span style="font-weight:bold">思路：</span><span> 多轮对话管理，其实就是说</span><span style="font-weight:bold">短期记忆</span><span>。问题翻译过来就是</span><span style="font-weight:bold">短期记忆</span><span>要考虑什么因素。这倒是一个很好的问题，我们设计Agent的时候，也不妨从这些角度想想，弄清楚这个问题，有助于我们把Agent产品想得比较彻底，把技术角度考虑全面。</span></p>

<p id="f-doxcnhYdKeVFWydAq4RZyUV2b9e"><span>📝 </span><span style="font-weight:bold">答案：</span></p>

<p id="f-doxcniDhj3UgKSzU2KLRb4aPccf"><span>多轮对话状态管理主要是管理当前 Session 中的</span><span style="font-weight:bold">短期记忆</span><span>，可以认为需要考虑五个方面。</span></p>

<p id="f-doxcnNJujIFytC5HFp02TiSsIXR"><span>第一是</span><span style="font-weight:bold">保存什么</span><span>。除了必要的对话历史，还要保存当前任务目标、用户已经确认的关键信息和约束、任务执行进度，以及最近的</span><span style="font-weight:bold">工具调用</span><span>和执行结果。这样 Agent 才能理解上下文，并知道当前任务进行到了哪一步。</span></p>

<p id="f-doxcnh9GfU63xrol0ISyU82LnJc"><span>第二是</span><span style="font-weight:bold">如何更新</span><span>。</span><span style="font-weight:bold">用户可能在后续对话中补充或修改需求</span><span>，例如把预算从 5000 元改成 3000 元。外部框架需要提取这些变化，更新结构化的会话状态。对于明确修改，可以使用新值覆盖旧值；如果信息存在歧义，则让 Agent 向用户确认。因此，状态管理不能只是不断追加历史消息</span><span style="font-weight:bold">，还需要外部框架进行提取、更新和校验。</span></p>

<p id="f-doxcn1m5SEvjBGPvmutIEPfi9Uc"><span>第三是</span><span style="font-weight:bold">如何控制上下文长度</span><span>。对话轮数增加后，不能把所有历史无限加入模型上下文。通常可以保留最近的消息，把较早的对话</span><span style="font-weight:bold">压缩成摘要，</span><span>同时单独保留任务目标、关键约束和未完成事项，从而兼顾信息完整性、Token 成本和响应速度。</span></p>

<p id="f-doxcnsBgppYoCbo9eNUNOhevMkf"><span>第四是如何</span><span style="font-weight:bold">隔离和恢复</span><span>。系统需要通过</span><span style="font-weight:bold">用户 ID</span><span>、</span><span style="font-weight:bold">Session ID</span><span> 或</span><span style="font-weight:bold">任务 ID</span><span> 隔离不同会话，避免不同用户或不同任务之间发生状态串扰。同时，会话状态最好能够持久化，以便服务中断或</span><span style="font-weight:bold">工具调用</span><span>失败后继续恢复任务。</span></p>

<p id="f-doxcn2x3uxWmLgrtRnKKI7H9Dye"><span>第五是</span><span style="font-weight:bold">何时清理</span><span>。会话结束或超时后，短期状态应该被清理或归档。只有稳定、以后仍有复用价值，并且允许长期保存的信息，才需要提炼后写入</span><span style="font-weight:bold">长期记忆</span><span>。</span></p>

<p id="f-doxcnbfIre9gjuBirXRCUchHFFd"><span>总结来说，多轮对话状态管理需要回答五个问题：保存什么、如何更新、如何压缩、如何隔离和恢复，以及何时清理或沉淀为</span><span style="font-weight:bold">长期记忆</span><span>。它不是简单地追加上下文，而是由外部框架维护一份</span><span style="font-weight:bold">准确、精简并且可恢复的当前会话状态</span><span>。</span></p>

<p id="f-doxcnSVpkkHf3Bp2UqdLQ7pW3je"><span>面试问题选自</span><span><span><a href="/posts/agent-learning-24-interview-review/#f-doxcnLwvMct6TRFGLpxiGfj1cod"><span>202607 宇树科技Agent开发一面</span></a></span></span><span>。</span></p>


<a id="section-0587"></a>
## Agent 上下文工程

<a id="t-block-15503"></a>

<p id="t-29VUjefwlHPyWQyFESTxJM"><span>Agent 上下文工程</span><span>（Agent Context Engineering）是系统化设计和优化传递给 AI Agent 的上下文信息的技术实践，它的目标是让 Agent 在有限的上下文窗口内获得最有效的信息，从而提升任务执行的准确性、效率和可靠性。</span></p>

<p id="t-H2rdRopc7IdfrVXD1svmea"><span>AI Agent 不像传统程序那样有固定的执行逻辑，它的行为完全取决于接收到的上下文——包括系统提示、工具描述、历史对话和外部检索到的信息。</span></p>

<p id="t-jynuE9bZQbOAYevhh4bO9h"><span>上下文工程的核心在于回答一个问题：</span><span style="font-weight:bold">在这轮调用中，Agent 最需要知道什么？</span></p>

<div id="t-FmEIfm04UZw8rltHzN25Sy"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/3b035889f484f0fcd3317276.png"/></div>

<blockquote id="t-huACFhIQoLDY14E7sAnPil"><p id="t-QH50n6gehfAwzWIYCy0xDa"><span style="font-style:italic">上下文工程不是一次性的提示词编写，而是贯穿 Agent 系统开发、测试和运维全生命周期的持续优化过程。</span></p></blockquote>


<a id="section-0588"></a>
## 核心要素

<a id="t-mE7gSzfgZj0vVRFeYUvX3j"></a>

<p id="t-J4jWuaS38xDmWNN7eHt6Yy"><span>Agent 上下文由以下几个层次构成：</span></p>

<div id="t-G90yoXH7weG6qHDhA5HJgf"><table><colgroup><col width="190.89926147460935"/><col width="243.89752197265625"/><col width="243.89752197265625"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>层次</span></p></td><td style=" vertical-align: top"><p><span>内容</span></p></td><td style=" vertical-align: top"><p><span>特点</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>系统提示（System Prompt）</span></p></td><td style=" vertical-align: top"><p><span>角色定义、行为规则、输出格式要求</span></p></td><td style=" vertical-align: top"><p><span>每次调用都会携带，相对稳定</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>工具定义（Tool Definitions）</span></p></td><td style=" vertical-align: top"><p><span>可用工具的名称、参数和功能描述</span></p></td><td style=" vertical-align: top"><p><span>占用大量 token，需要精简</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>历史记录（History）</span></p></td><td style=" vertical-align: top"><p><span>当前会话的对话和工具调用记录</span></p></td><td style=" vertical-align: top"><p><span>持续增长，需要截断或摘要策略</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>检索上下文（Retrieved Context）</span></p></td><td style=" vertical-align: top"><p><span>从外部知识库或代码库中检索的内容</span></p></td><td style=" vertical-align: top"><p><span>按需注入，需要相关性排序</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>用户输入（User Input）</span></p></td><td style=" vertical-align: top"><p><span>用户当前的指令或问题</span></p></td><td style=" vertical-align: top"><p><span>不可控，但可以通过澄清来优化</span></p></td></tr></tbody></table></div>


<a id="section-0590"></a>
## 上下文预算管理

<a id="t-BRPuQ1XwGxYEym3BEV6ddC"></a>

<p id="t-SSwv3aFEzvD9VNELpMCeit"><span>将上下文窗口视为一个有限的「预算」，合理分配给不同类型的上下文。</span></p>

<p id="t-dPs1VqXwqaPp3mrIP8rgxZ"><span>不是所有信息都值得占据上下文空间，每一条上下文都应该有明确的 ROI。</span></p>

<pre id="t-cNtW6eqDduqaGxan5ztuLd"><code>上下文预算分配建议（以 200K token 窗口为例）：

系统提示　　██████████　10%　（20K token）
工具定义　　████████████████　20%　（40K token）
检索上下文　████████████████████　25%　（50K token）
历史记录　　████████████████████████　30%　（60K token）
用户输入　　████████　5%~10%　（10-20K token）
预留缓冲　　████　5%　（10K token）</code></pre>

<p id="t-04YKLteYCQAK8Z54KgCs9o"><span>实际比例应根据 Agent 的具体任务类型动态调整。</span></p>

<p id="t-HyCHbHitzbZzBRaNTFowyW"><span>如果 Agent 主要做代码生成，检索上下文的比例可以调高。</span></p>

<p id="t-1B6yeS4kXXfW3PsC9AVGFg"><span>如果 Agent 是多轮对话助手，历史记录的预算应优先保证。</span></p>


<a id="section-0591"></a>
## 系统提示的工程化

<a id="t-qW8PbZxlcyHs6GjM39HPk0"></a>

<p id="t-FowAwjndEe7bAnBk7eTcXr"><span>系统提示是 Agent 行为的基石，需要遵循结构化编写原则。</span></p>

<p id="t-qnGbvIf4EVVKU8m8BdhGn7"><span style="font-weight:bold">编写原则：</span></p>

<div id="t-j3sL8GAj2600VnvLFYfAtb"><table><colgroup><col width="115.50692749023438"/><col width="314.61627197265625"/><col width="248.114501953125"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>原则</span></p></td><td style=" vertical-align: top"><p><span>说明</span></p></td><td style=" vertical-align: top"><p><span>示例</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>分层组织</span></p></td><td style=" vertical-align: top"><p><span>将指令按角色、规则、流程、格式分块</span></p></td><td style=" vertical-align: top"><p><span>使用 Markdown 标题分隔</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>正面表述</span></p></td><td style=" vertical-align: top"><p><span>告诉 Agent 应该怎么做，而非不怎么做</span></p></td><td style=" vertical-align: top"><p><span>「保持回答简洁」优于「不要啰嗦」</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>提供示例</span></p></td><td style=" vertical-align: top"><p><span>用 few-shot 示例代替长篇描述</span></p></td><td style=" vertical-align: top"><p><span>输出格式示例比文字描述更高效</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>优先级明确</span></p></td><td style=" vertical-align: top"><p><span>当规则冲突时，Agent 应遵循哪条</span></p></td><td style=" vertical-align: top"><p><span>「安全规则优先于效率要求」</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>去除冗余</span></p></td><td style=" vertical-align: top"><p><span>删除从未被触发的规则和重复说明</span></p></td><td style=" vertical-align: top"><p><span>定期审查并精简系统提示</span></p></td></tr></tbody></table></div>

<p id="t-HxEgi6tmQ0SruGTwHRam33"><span>以下是一个结构化系统提示的示例骨架：</span></p>

<pre id="t-CqFN8cRTsZk9u5uOyrx0Fj"><code>## 角色
你是一名 Python 代码审查助手。

## 核心规则
- 每个问题附上修复建议
- 按严重程度排序输出
- 不确定时标注「待确认」

## 工作流程
1. 分析代码变更
2. 按严重程度分类问题
3. 逐一输出问题与建议

## 输出格式
**问题**：[问题描述]
**严重程度**：[高/中/低]
**建议**：[修复建议]</code></pre>


<a id="section-0592"></a>
## 工具描述的优化

<a id="t-AhP0bwUz0mzXVzKt0HvINA"></a>

<p id="t-T0ZR6zuwO8DpDE3JcGbJov"><span>工具描述往往占据上下文的最大比重，但很多工具从未被实际调用。</span></p>

<p id="t-IBJoapNrTCdgYyDS5CRozl"><span>优化策略包括：</span></p>

<div id="t-eyEH8DC8nVf1EJHSgLiQQX"><table><colgroup><col width="120"/><col width="287.9044189453125"/><col width="258.89752197265625"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>策略</span></p></td><td style=" vertical-align: top"><p><span>方法</span></p></td><td style=" vertical-align: top"><p><span>效果</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>工具精简</span></p></td><td style=" vertical-align: top"><p><span>移除与当前任务无关的工具定义</span></p></td><td style=" vertical-align: top"><p><span>减少 30%~50% 的工具上下文</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>描述精炼</span></p></td><td style=" vertical-align: top"><p><span>每个工具只用一句话说明用途和参数</span></p></td><td style=" vertical-align: top"><p><span>提升模型对工具的理解准确度</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>参数约束</span></p></td><td style=" vertical-align: top"><p><span>在描述中明确参数的使用场景和限制</span></p></td><td style=" vertical-align: top"><p><span>减少工具调用中的参数错误</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>分组注册</span></p></td><td style=" vertical-align: top"><p><span>按任务阶段动态注册不同的工具集</span></p></td><td style=" vertical-align: top"><p><span>避免工具过多导致的「选择困难」</span></p></td></tr></tbody></table></div>

<blockquote id="t-ANwq2TBNRDrzg7ZzrYePpg"><blockquote id="t-AIbAiGAU31GR4G0YJfWNnz"><span style="font-style:italic">工具定义不为零即是负担。每个保留的工具都需要在描述质量和 token 成本之间做权衡。</span></blockquote></blockquote>


<a id="section-0593"></a>
## 历史记录的压缩策略

<a id="t-vF427RUSGnyS5UGcmFiRuJ"></a>

<p id="t-7t8gUlHXPV5Kh18JcE0i3C"><span>多轮对话中，历史记录快速增长并占据上下文。</span></p>

<p id="t-YH052mRW1GUR9mwL3yJXJM"><span>需要选择合适的压缩策略来平衡上下文完整性和窗口限制。</span></p>

<pre id="t-x4sJhFH3fuUkxSt0j77f5B"><code>常见历史压缩策略对比：

策略　　　　　方法　　　　　　　　　　　　适用场景
─────────────────────────────────────────────────
滑动窗口　　　保留最近 N 轮完整记录　　　　短对话、实时交互
阶梯摘要　　　每轮做一次增量摘要　　　　　长对话、客服场景
分层摘要　　　近期保留完整、远期做摘要　　文档生成、复杂任务
关键轮标记　　标记重要轮次，其余丢弃　　　调试、分步执行任务</code></pre>

<p id="t-w5V6FNGSrs3CeyHqFqiw77"><span>分层摘要是最常用的策略：最近 3-5 轮保持完整，更早的对话用结构化摘要代替。</span></p>

<p id="t-hiAvPxRVIV05eH26tNyI9k"><span>结构化摘要应包含原对话的关键信息：用户目标是什么，Agent 做了什么，产生了什么输出，遇到了什么错误。</span></p>


<a id="section-0594"></a>
## 检索上下文的质量控制

<a id="t-6tBaljYAFh2PkhfNDxIiDM"></a>

<p id="t-S7f0LNY5P5FfmLdVisezxa"><span>当 Agent 依赖外部知识库时，检索到的上下文质量直接决定输出质量。</span></p>

<p id="t-tSXr6MBgdpo28ElPVpoSh9"><span>提高检索上下文质量的关键点：</span></p>

<div id="t-n41mD50cr6872EV0Zs5qwk"><table><colgroup><col width="120"/><col width="216.9044189453125"/><col width="274.00506591796875"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>环节</span></p></td><td style=" vertical-align: top"><p><span>常见问题</span></p></td><td style=" vertical-align: top"><p><span>改进方法</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>查询改写</span></p></td><td style=" vertical-align: top"><p><span>用户输入不够精确</span></p></td><td style=" vertical-align: top"><p><span>让 Agent 先改写查询再检索</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>相关性过滤</span></p></td><td style=" vertical-align: top"><p><span>检索结果中包含无关内容</span></p></td><td style=" vertical-align: top"><p><span>设置相关性阈值，</span></p></td></tr><tr><td style=" vertical-align: top"></td><td style=" vertical-align: top"></td><td style=" vertical-align: top"></td></tr><tr><td style=" vertical-align: top"></td><td style=" vertical-align: top"></td><td style=" vertical-align: top"><p><span>保留最相关片段</span></p></td></tr></tbody></table></div>


<a id="section-0596"></a>
## 渐进式披露

<a id="t-ULUSi8elXtPcGqJWQIKYpM"></a>

<p id="t-TtFUTWEBucXbvMHQ3seY5k"><span>不一次性把所有信息塞进上下文，而是根据执行阶段逐步披露。</span></p>

<p id="t-FqPDqpXTvtLTkgLpFd4FsO"><span>初始上下文只包含系统提示和当前阶段的必要工具，当 Agent 完成当前阶段后，再注入下一阶段的工具和规则。</span></p>

<p id="t-57V6hlxj9xUuypRNrsLJGt"><span>这种模式将上下文的「密度」控制在合理范围内，避免 Agent 被无关信息干扰。</span></p>


<a id="section-0597"></a>
## 上下文压缩链

<a id="t-b42vP3bLucTo6C8Gg3syMc"></a>

<p id="t-EXhh1uoa86xa4xgVs5ywyZ"><span>当一个任务需要处理大量数据时，用链式调用拆分为多个步骤，每步只保留关键中间结果。</span></p>

<pre id="t-qQFjBV5psCDWYicistoixy"><code>步骤1：读取全部日志文件 → 输出 { 错误数量，时间范围，错误类型列表 }

步骤2：基于步骤1的输出，分析 Top 3 错误 → 输出 { 根因分析，修复建议 }

步骤3：基于步骤2的输出，生成修复 PR → 输出 { PR 标题，描述，代码变更 }</code></pre>

<p id="t-P0vTqs0DRcWljy4ctoICYt"><span>每条链路的输入都是上一步精炼后的摘要，而非原始数据，使得上下文始终保持可控大小。</span></p>


<a id="section-0598"></a>
## 上下文水印

<a id="t-mCZljtS68ppnrDgXnuiPtU"></a>

<p id="t-FRAk5a7e1RFZ56dVfPHAfJ"><span>在上下文的关键位置放置「水印」标记，帮助监控和诊断 Agent 行为。</span></p>

<pre id="t-tGZzZL8VJfBjoOAnGCmUvZ"><code>上下文水印示例：

&lt;system-reminder&gt;
当前使用的上下文策略版本：v2.3
检索到的文档来源：docs/api-reference/ 共 3 个文件
已消耗上下文：85,000 / 200,000 tokens
&lt;/system-reminder&gt;</code></pre>

<p id="t-ptOrxN9A7Q7Ueb1yMJUd7f"><span>这些水印不会直接影响 Agent 行为，但在调试时可以快速定位上下文注入是否按预期执行。</span></p>


<a id="section-0599"></a>
## 评估与迭代

<a id="t-c0qzbNRrnB9AMKWpEFSqRb"></a>

<p id="t-zkUcYq1IYPriZfqQuzTHMD"><span>上下文工程的效果需要通过评估来验证，不能仅凭感觉判断。</span></p>

<p id="t-BlJteuy0uR8fgNlcOQ1vtW"><span>常用的评估维度：</span></p>

<div id="t-unUEbHx8FHhZMCENedsEFY"><table><colgroup><col width="120"/><col width="241.90264892578125"/><col width="252.005126953125"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>维度</span></p></td><td style=" vertical-align: top"><p><span>评估方式</span></p></td><td style=" vertical-align: top"><p><span>关键指标</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>任务完成率</span></p></td><td style=" vertical-align: top"><p><span>在标准测试集上运行 Agent</span></p></td><td style=" vertical-align: top"><p><span>成功率、失败原因分布</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>上下文效率</span></p></td><td style=" vertical-align: top"><p><span>统计每次调用的上下文使用量</span></p></td><td style=" vertical-align: top"><p><span>平均 token 消耗、上下文利用率</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>工具调用质量</span></p></td><td style=" vertical-align: top"><p><span>分析工具调用的准确率和参数正确率</span></p></td><td style=" vertical-align: top"><p><span>无效调用占比、重试次数</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>响应一致性</span></p></td><td style=" vertical-align: top"><p><span>相同输入多次测试</span></p></td><td style=" vertical-align: top"><p><span>输出稳定性、格式合规率</span></p></td></tr></tbody></table></div>

<p id="t-UGBmEG10tC6AGEzqEY19h4"><span>上下文工程不是一次性配置，而是需要建立「测试 → 分析 → 优化 → 再测试」的迭代循环。</span></p>


<a id="section-0600"></a>
## 注意事项

<a id="t-2NSb18BmRaxihNBzQxZwN3"></a>

<blockquote id="t-70xmi5gpYJ4t5pTbbR8zgH"><blockquote id="t-vAcrLoFsowz3vbqj4SERhT"><span style="font-style:italic">上下文窗口不是越大越好。过多的上下文会导致模型在关键信息上的注意力被稀释，反而降低输出质量。</span></blockquote></blockquote>

<blockquote id="t-gGV1FUiPjRklc90mDoTHMn"><p id="t-hKYe3h3zbhqheXs5xTusFL"><span style="font-style:italic">盲目增加规则可能让系统提示变得臃肿且自相矛盾。每新增一条规则，都需要审查是否与已有规则冲突。</span></p></blockquote>

<p id="t-SHiq3HyqhGdr6sAb9RovrT"><span>工具定义的修改可能影响已有 Agent 的行为，修改后需要在典型场景下做回归测试。</span></p>

<p id="t-C2QbjelIXuoAHjzypFaU4s"><span>历史记录压缩策略需要根据 Agent 的任务特征来选择，一个策略不可能在所有场景中都表现最优。</span></p>

<p id="t-YiVBNloOj5mgGOlIizyfEl"><span>上下文中的敏感信息（API 密钥、内部路径等）会在工具调用和日志中传播，需要做好脱敏处理。</span></p>


<a id="section-0601"></a>
## 相关概念

<a id="t-WBRkYAw1i0j8O9XYuNP4Fg"></a>

<div id="t-7LS3wvy1EML8V8RTZOj1TP"><table><colgroup><col width="220.9027404785156"/><col width="350.005126953125"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>概念</span></p></td><td style=" vertical-align: top"><p><span>说明</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>Prompt Engineering</span></p></td><td style=" vertical-align: top"><p><span>专注于单次调用的提示词设计和优化</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>Context Window</span></p></td><td style=" vertical-align: top"><p><span>模型能够一次性处理的 token 上限</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>Token</span></p></td><td style=" vertical-align: top"><p><span>模型处理文本的最小语义单元</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>RAG（检索增强生成）</span></p></td><td style=" vertical-align: top"><p><span>通过外部检索来扩充上下文的架构模式</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>Few-shot Prompting</span></p></td><td style=" vertical-align: top"><p><span>在上下文中提供示例来引导模型输出</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>Chain-of-Thought</span></p></td><td style=" vertical-align: top"><p><span>让模型在上下文中展现推理过程</span></p></td></tr></tbody></table></div>


<a id="section-1342"></a>
## 记忆系统设计

<a id="t-block-21347"></a>

<p id="t-pCN6kRwPBlcxbRRejH9eQZ"><span>人类的记忆分为短期记忆和长期记忆，AI Agent 的记忆系统也采用了类似的设计。</span></p>

<p id="t-pmgE7Tk9lZgyIWZRh4C2ME"><span>理解这两种记忆的区别和用途，是构建智能 Agent 的基础。</span></p>


<a id="section-1343"></a>
## 短期记忆：Agent 的工作记忆

<a id="t-xAwGHavKRaOuhH8Nnrfyo5"></a>

<p id="t-e3E7ikoQiQ1LMzWD75kQw2"><span>短期记忆就像是 Agent 的工作台，存储当前对话的上下文和临时信息。</span></p>

<p id="t-NKG5SQ5TguVz6I7TkmqGJJ"><span style="font-weight:bold">特点</span><span>：</span></p>

<ul><li id="t-ItFA83a9aLkFY9Wrn1mEvM"><span style="border-bottom:1px solid;font-weight:bold">容量有限</span><span>：通常只能保存最近的几次对话（如最近的 10-20 轮对话）</span></li></ul>

<ul><li id="t-f7sKA2qBn7CF2AQeBJIMnT"><span style="border-bottom:1px solid;font-weight:bold">快速访问</span><span>：读取和写入速度很快</span></li></ul>

<ul><li id="t-hlToKuAALaY7ns5rZcAO3I"><span style="border-bottom:1px solid;font-weight:bold">临时性</span><span>：对话结束后通常会被清除或压缩</span></li></ul>

<ul><li id="t-Vkw7G6FR3bYkkFuuwJZjki"><span style="border-bottom:1px solid;font-weight:bold">上下文相关</span><span>：直接影响当前的响应生成</span></li></ul>

<p id="t-kwX5F7PxSRG4i6fbTo6RFK"><span style="border-bottom:1px solid;font-weight:bold">主要用途</span><span style="border-bottom:1px solid">：</span></p>

<ul><li id="t-yjolSe40AJmbdyxu0gmtFf"><span>保持对话的连贯性</span></li></ul>

<ul><li id="t-uRzwkZ2YGj1MRx99efN1xA"><span>存储当前任务的中间结果</span></li></ul>

<ul><li id="t-b9KQQmvVLaJNk0xMxoerfs"><span>记住用户在当前对话中提到的偏好</span></li></ul>

<p id="t-mhpJm5z9QhWXGbxkcrbdL8"><span style="border-bottom:1px solid;font-weight:bold">技术实现</span><span style="border-bottom:1px solid">：</span></p>

<pre id="t-37hGGmpjIvyWdy5hmHMjM8"><code>class ShortTermMemory:
 """短期记忆实现"""

 def __init__(self, max_turns=10):
        self.max_turns = max_turns  # 最大对话轮数
        self.conversation_history = [] # 对话历史
        self.temporary_data = {} # 临时数据存储

 def add_message(self, role, content):
 """添加消息到对话历史"""
        message = {"role": role, "content": content, "timestamp": time.time()}
        self.conversation_history.append(message)

 # 保持历史不超过最大长度
 if len(self.conversation_history) &gt; self.max_turns:
            self.conversation_history.pop(0)

 def get_context(self):
 """获取对话上下文（用于发送给LLM）"""
 return self.conversation_history[-self.max_turns:]

 def store_temp(self, key, value):
 """存储临时数据"""
        self.temporary_data[key] = value

 def get_temp(self, key, default=None):
 """获取临时数据"""
 return self.temporary_data.get(key, default)

 def clear_temp(self):
 """清除临时数据"""
        self.temporary_data.clear()</code></pre>


<a id="section-1344"></a>
## 长期记忆：Agent 的知识库

<a id="t-cDG1dhCKUfBrZQyHutrHCa"></a>

<p id="t-zcORTvzmGW14Yb05vabKgN"><span style="border-bottom:1px solid">长期记忆就像是 Agent 的档案室，存储重要的、需要长期保留的信息。</span></p>

<p id="t-VbNaB37K9OBz3HSe9DpJR5"><span style="border-bottom:1px solid;font-weight:bold">特点</span><span style="border-bottom:1px solid">：</span></p>

<ul><li id="t-7ASdKKg3OYOfAvoWs6TkcO"><span style="border-bottom:1px solid;font-weight:bold">容量大</span><span>：可以存储大量信息</span></li></ul>

<ul><li id="t-LGiNKjpBO3TxH7MXUlMQB5"><span style="border-bottom:1px solid;font-weight:bold">持久化</span><span>：信息会长期保存，不会自动清除</span></li></ul>

<ul><li id="t-Kyc7rOr3gAGFB9bUk7lNxq"><span style="border-bottom:1px solid;font-weight:bold">检索式访问</span><span>：通过查询检索相关信息，而非顺序读取</span></li></ul>

<ul><li id="t-QpEuVGBd7TucELpo6VGctr"><span style="border-bottom:1px solid;font-weight:bold">结构化存储</span><span>：信息通常以结构化方式存储，便于检索</span></li></ul>

<p id="t-aRJi77f1nEXgNBTJTRZRNR"><span style="border-bottom:1px solid;font-weight:bold">主要用途</span><span style="border-bottom:1px solid">：</span></p>

<ul><li id="t-cTv221aOKsAX9eyGp0yRaF"><span>存储用户的个人信息和偏好</span></li></ul>

<ul><li id="t-G5vmlKYFTfii50QqNStn3y"><span>积累知识和经验</span></li></ul>

<ul><li id="t-Zaxzo2LoxLdJprnwmNBE97"><span>记住重要的对话内容</span></li></ul>

<ul><li id="t-daJm6o2JDgSq2EL8hu9WSQ"><span>保存任务执行结果</span></li></ul>

<p id="t-b1pvQFF3UciNINSoJ4jfl8"><span style="border-bottom:1px solid;font-weight:bold">技术实现</span><span style="border-bottom:1px solid">：</span></p>

<pre id="t-XTpApcZVhPwhAlzBQCEKvu"><code>class LongTermMemory:
 """长期记忆基类"""

 def __init__(self):
        self.memories = [] # 记忆条目列表

 def add_memory(self, content, metadata=None):
 """添加记忆"""
        memory = {
 "id": str(uuid.uuid4()),
 "content": content,
 "metadata": metadata or {},
 "timestamp": time.time(),
 "importance": 0.5 # 默认重要性
 }
        self.memories.append(memory)
 return memory["id"]

 def search_memories(self, query, limit=5):
 """搜索记忆（子类需要实现具体搜索逻辑）"""
 raise NotImplementedError

 def get_memory(self, memory_id):
 """获取特定记忆"""
 for memory in self.memories:
 if memory["id"] == memory_id:
 return memory
 return None

 def delete_memory(self, memory_id):
 """删除记忆"""
        self.memories = [m for m in self.memories if m["id"] != memory_id]</code></pre>


<a id="section-1345"></a>
## 对比分析

<a id="t-29zGLygRjVYAUq2M1TlUp4"></a>

<div id="t-mx8kbonMa3w8P1g5PyN3Tj"><table><colgroup><col width="180.8992919921875"/><col width="200.8992919921875"/><col width="188.8992919921875"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>特性</span></p></td><td style=" vertical-align: top"><p><span>短期记忆</span></p></td><td style=" vertical-align: top"><p><span>长期记忆</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">容量</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">小（KB 级）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">大（GB 级甚至更大）</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">持久性</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">临时（对话级别）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">持久（长期保存）</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">访问方式</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">顺序访问</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">检索式访问</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">速度</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">快</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">相对较慢</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">主要用途</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">对话上下文</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">知识积累</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">实现复杂度</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">简单</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">复杂</span></p></td></tr></tbody></table></div>


<a id="section-1346"></a>
## 记忆系统架构

<a id="t-9TUbib8iItxJaydTji7HRj"></a>

<p id="t-3AGTPIh0YMkeSZdSXK6iq2"><span style="border-bottom:1px solid">一个完整的记忆系统通常同时包含短期和长期记忆：</span></p>

<div id="t-zxDzsCUOINgRaCKJNLnH3E"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/7ef7ea0b803e44ec204fbe76.svg"/></div>


<a id="section-1347"></a>
## 对话历史管理

<a id="t-U3h0jZL3YrkdFzhXZzvLqD"></a>

<p id="t-x0S7raDT6LNvrsRFMvjs6M"><span style="border-bottom:1px solid">有效的对话历史管理是确保 AI Agent 能够进行连贯、有意义对话的关键。LLM 的上下文长度有限，需要智能地管理哪些历史信息应该保留、哪些可以丢弃。</span></p>


<a id="section-1348"></a>
## 对话历史的挑战

<a id="t-17pXTCZWEHmfFpVUddC6PJ"></a>

<ul><li id="t-mnEJ8WQ5VSg5IOljctLMk7"><span style="border-bottom:1px solid;font-weight:bold">上下文长度限制</span><span>：大多数 LLM 有固定的 token 限制（如 4K、8K、16K、32K 等）</span></li></ul>

<ul><li id="t-1fA8C2ECuuPQF3MnqNIk47"><span style="border-bottom:1px solid;font-weight:bold">信息重要性不同</span><span>：不是所有历史对话都同样重要</span></li></ul>

<ul><li id="t-hAJvOsfI9CFovlUyO24Nf5"><span style="border-bottom:1px solid;font-weight:bold">相关性随时间变化</span><span>：越近的对话通常越相关</span></li></ul>

<ul><li id="t-Tes581tKx1aY61yJBG7Tgt"><span style="border-bottom:1px solid;font-weight:bold">累积成本</span><span>：更长的上下文意味着更高的 API 调用成本</span></li></ul>


<a id="section-1349"></a>
## 基本的对话历史管理

<a id="t-RgFVN0nK3GKdXCaFTWzz6X"></a>

<pre id="t-T9yPuSPMYt7obtpfV6N9hs"><code>class ConversationManager:
 """对话管理器"""

 def __init__(self, max_context_length=4000):
        self.max_context_length = max_context_length  # 最大token数
        self.history = [] # 完整的对话历史
        self.active_context = [] # 当前活跃的上下文

 def add_exchange(self, user_input, assistant_response):
 """添加一轮对话"""
        self.history.append({
 "user": user_input,
 "assistant": assistant_response,
 "timestamp": time.time()
 })

 def build_context(self, current_query, include_history=True):
 """构建当前查询的上下文"""

 if not include_history or not self.history:
 # 没有历史或不需要历史，只返回当前查询
 return [{"role": "user", "content": current_query}]

 # 从最近的对话开始，逐步添加历史，直到达到长度限制
        context = []
        context_length = self.estimate_tokens(current_query)

 # 添加当前查询
        context.insert(0, {"role": "user", "content": current_query})

 # 从最近到最远添加历史
 for exchange in reversed(self.history):
            user_tokens = self.estimate_tokens(exchange["user"])
            assistant_tokens = self.estimate_tokens(exchange["assistant"])

 # 检查是否会超出限制
 if context_length + user_tokens + assistant_tokens &gt; self.max_context_length:
 break

 # 添加助理回复（在用户输入之前）
            context.insert(0, {"role": "assistant", "content": exchange["assistant"]})
            context.insert(0, {"role": "user", "content": exchange["user"]})

            context_length += user_tokens + assistant_tokens

 return context

 def estimate_tokens(self, text):
 """粗略估计文本的token数量（实际应用中应使用准确的tokenizer）"""
 # 简单估算：英文约0.75单词/token，中文约1-2字符/token
 if self.is_chinese(text):
 return len(text) // 2 # 中文每2字符约1个token
 else:
            words = len(text.split())
 return int(words * 1.3) # 英文每单词约1.3个token

 def is_chinese(self, text):
 """判断文本是否主要为中文"""
        chinese_chars = sum(1 for c in text if '\u4e00' &lt;= c &lt;= '\u9fff')
 return chinese_chars / max(len(text), 1) &gt; 0.3

 def clear_history(self):
 """清空对话历史"""
        self.history.clear()
        self.active_context.clear()</code></pre>


<a id="section-1350"></a>
## 智能历史选择策略

<a id="t-EZYtRjNdSWwWFlW4ZgGYHt"></a>

<p id="t-Q7H5wXCBSZ6TnH5muFSdFS"><span style="border-bottom:1px solid">不是所有历史对话都同样重要。智能的历史选择可以提高上下文的使用效率：</span></p>

<a id="t-kGVh695JNMtV9BJkyOxI6T"></a>

##### 基于时间的衰减

<pre id="t-qhkY2MCZjq8rbSrYCzD6Sg"><code>def time_based_selection(history, current_time, max_items=10):
 """基于时间的选择：越近的对话权重越高"""
    scored_items = []

 for item in history:
 # 计算时间衰减分数（越近分数越高）
        time_diff = current_time - item["timestamp"]
        time_score = max(0, 1 - time_diff / 3600) # 1小时内完全保留，之后衰减

 # 结合其他因素（如对话长度、重要性标记等）
        total_score = time_score

        scored_items.append((total_score, item))

 # 按分数排序，选择分数最高的
    scored_items.sort(key=lambda x: x[0], reverse=True)
 return [item for score, item in scored_items[:max_items]]</code></pre>

<a id="t-ibtdqSxKyfQbxX6u9ENbcu"></a>

##### 基于相关性的选择

<pre id="t-g47vMb3MD6OvjDNx6tYAbx"><code>def relevance_based_selection(history, current_query, embedding_model, max_items=5):
 """基于与当前查询相关性的选择"""
 if not history:
 return []

 # 计算当前查询的向量
    query_embedding = embedding_model.encode(current_query)

    scored_items = []

 for item in history:
 # 将历史对话内容转换为向量
        content = item["user"] + " " + item["assistant"]
        content_embedding = embedding_model.encode(content)

 # 计算余弦相似度
        similarity = cosine_similarity([query_embedding], [content_embedding])[0][0]

        scored_items.append((similarity, item))

 # 按相似度排序，选择最相关的
    scored_items.sort(key=lambda x: x[0], reverse=True)
 return [item for similarity, item in scored_items[:max_items]]</code></pre>

<a id="t-8O773in35AmEcz7Bk7v32E"></a>

##### 混合选择策略

<pre id="t-pXJpKfkWRyi0f8neBEQahF"><code>class SmartHistorySelector:
 """智能历史选择器"""

 def __init__(self, embedding_model=None):
        self.embedding_model = embedding_model

 def select_history(self, history, current_query, max_context_length=3000):
 """智能选择历史对话"""

        selected = []
        current_length = 0

 # 策略1：总是包含最近的一轮对话
 if history:
            recent = history[-1]
            recent_length = self.estimate_length(recent)
 if recent_length &lt;= max_context_length:
                selected.append(recent)
                current_length += recent_length

 # 策略2：基于相关性的选择
 if self.embedding_model and len(history) &gt; 1:
            relevant = self.select_by_relevance(history[:-1], current_query, 3)
 for item in relevant:
                item_length = self.estimate_length(item)
 if current_length + item_length &lt;= max_context_length:
                    selected.append(item)
                    current_length += item_length

 # 策略3：如果还有空间，按时间顺序添加
        remaining_space = max_context_length - current_length
 if remaining_space &gt; 100: # 至少100token的空间
 for item in history:
 if item not in selected:
                    item_length = self.estimate_length(item)
 if item_length &lt;= remaining_space:
                        selected.append(item)
                        remaining_space -= item_length

 # 按时间顺序排序
        selected.sort(key=lambda x: x["timestamp"])
 return selected

 def select_by_relevance(self, history, query, max_items):
 """基于相关性选择"""
 # 简化实现，实际应使用向量相似度
        query_lower = query.lower()
        scored = []

 for item in history:
            content = (item["user"] + " " + item["assistant"]).lower()
 # 简单关键词匹配
            score = sum(1 for word in query_lower.split() if word in content)
            scored.append((score, item))

        scored.sort(key=lambda x: x[0], reverse=True)
 return [item for score, item in scored[:max_items]]

 def estimate_length(self, exchange):
 """估计对话长度"""
 return len(exchange["user"]) + len(exchange["assistant"])</code></pre>


<a id="section-1351"></a>
## 对话历史压缩

<a id="t-49s8TJvxqc61m0LeX1Bttz"></a>

<p id="t-z9fNhWp8VK5EgRnqEgoM1W"><span style="border-bottom:1px solid">当对话历史太长时，可以对其进行压缩，保留核心信息：</span></p>

<pre id="t-2PBmKbXeqJ9RxvkX9UF6K7"><code>class HistoryCompressor:
 """对话历史压缩器"""

 def __init__(self, llm_client):
        self.llm = llm_client

 def compress_conversation(self, conversation_history, max_summary_length=500):
 """压缩对话历史"""

 if len(conversation_history) &lt;= 2:
 return conversation_history  # 太短不需要压缩

 # 将对话历史转换为文本
        conversation_text = self.history_to_text(conversation_history)

 # 使用LLM生成摘要
        prompt = f"""
请将以下对话历史压缩为一个简短的摘要，保留核心信息和重要细节：

对话历史：
{conversation_text}

摘要要求：
1. 不超过{max_summary_length}字
2. 保留用户的主要需求和助理的关键回答
3. 忽略问候语、重复内容和无关细节

摘要：
"""

        summary = self.llm.generate(prompt, max_tokens=max_summary_length)

 # 创建压缩后的历史（摘要 + 最近几轮对话）
        compressed_history = [
 {
 "role": "system",
 "content": f"之前的对话摘要：{summary}"
 }
 ]

 # 保留最近的1-2轮对话以保持连贯性
 for exchange in conversation_history[-2:]:
            compressed_history.append({
 "role": "user" if exchange["role"] == "user" else "assistant",
 "content": exchange["content"]
 })

 return compressed_history

 def history_to_text(self, history):
 """将对话历史转换为文本"""
        lines = []
 for exchange in history:
            role = "用户" if exchange["role"] == "user" else "助理"
            lines.append(f"{role}: {exchange['content']}")
 return "\n".join(lines)</code></pre>


<a id="section-1352"></a>
## 向量数据库应用

<a id="t-Kh31xxZlEijvAEzujn7UCe"></a>

<p id="t-XbXWLkgZj88K85anSnOZtK"><span style="border-bottom:1px solid">向量数据库是长期记忆系统的核心技术，它允许 Agent 基于语义相似度检索相关信息，而不仅仅是关键词匹配。</span></p>


<a id="section-1353"></a>
## 什么是向量数据库？

<a id="t-GSLc7eKEtZeDzsSHeiEQLG"></a>

<p id="t-fHNCfjLUlHxz8uWKoHtkHc"><span style="border-bottom:1px solid">向量数据库专门存储和检索向量（embeddings）。在 AI Agent 的语境中：</span></p>

<ul><li id="t-Lgb5QuUCr406sCLtCooY0Z"><span style="border-bottom:1px solid;font-weight:bold">文本</span><span>→</span><span style="border-bottom:1px solid;font-weight:bold">向量</span><span>：通过 embedding 模型将文本转换为高维向量</span></li></ul>

<ul><li id="t-YtjXV43oV3o0I1LYPol0hQ"><span style="border-bottom:1px solid;font-weight:bold">相似度</span><span>→</span><span style="border-bottom:1px solid;font-weight:bold">距离</span><span>：相似的文本有相近的向量，可以通过向量距离衡量相似度</span></li></ul>

<ul><li id="t-8zfjJiAZlEw2l89Dcnt38C"><span style="border-bottom:1px solid;font-weight:bold">检索</span><span>→</span><span style="border-bottom:1px solid;font-weight:bold">最近邻搜索</span><span>：寻找与查询向量最相似的向量</span></li></ul>


<a id="section-1354"></a>
## 向量数据库的工作流程

<a id="t-257GyLmrc0sIdPMnrgkCBY"></a>

<div id="t-GhSYQ6fQjPmqkyegumjq2C"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/f8e8820c0cbde822e751d02a.svg"/></div>


<a id="section-1355"></a>
## 使用向量数据库实现长期记忆

<a id="t-5QBCdheWUwB8lOd5Z0fcHa"></a>

<a id="t-IHxtCHhRUXQnC1Gf9FeEDm"></a>

##### 安装必要的库

<pre id="t-BMvyr2vEYHpoIU4Mpz4OMs"><code># 安装 embedding 模型和向量数据库
pip install sentence-transformers  # 用于生成embeddings
pip install chromadb  # 轻量级向量数据库</code></pre>

<a id="t-1LSGfWUQPg5mrX5bPeqgtT"></a>

##### 创建向量记忆系统

<pre id="t-S3QmQVeuLvQvBkIALXaf2z"><code>import chromadb
from sentence_transformers import SentenceTransformer
import uuid
import time

class VectorMemory:
 """基于向量数据库的记忆系统"""

 def __init__(self, persist_directory="./memory_db"):
 # 初始化 embedding 模型
        self.embedding_model = SentenceTransformer('paraphrase-multilingual-MiniLM-L12-v2')

 # 初始化 ChromaDB
        self.client = chromadb.PersistentClient(path=persist_directory)
        self.collection = self.client.get_or_create_collection(
            name="agent_memories",
            metadata={"description": "AI Agent 的长期记忆"}
 )

 def add_memory(self, content, metadata=None, importance=0.5):
 """添加记忆到向量数据库"""

 # 生成 embedding
        embedding = self.embedding_model.encode(content).tolist()

 # 准备元数据
        full_metadata = {
 "timestamp": time.time(),
 "importance": importance,
 "content_length": len(content)
 }
 if metadata:
            full_metadata.update(metadata)

 # 生成唯一ID
        memory_id = str(uuid.uuid4())

 # 添加到数据库
        self.collection.add(
            documents=[content],
            embeddings=[embedding],
            metadatas=[full_metadata],
            ids=[memory_id]
 )

 return memory_id

 def search_memories(self, query, n_results=5, min_similarity=0.3):
 """搜索相关记忆"""

 # 生成查询的 embedding
        query_embedding = self.embedding_model.encode(query).tolist()

 # 在向量数据库中搜索
        results = self.collection.query(
            query_embeddings=[query_embedding],
            n_results=n_results,
            include=["documents", "metadatas", "distances"]
 )

 # 处理结果
        memories = []
 if results["documents"]:
 for i in range(len(results["documents"][0])):
                similarity = 1 - results["distances"][0][i] # 转换距离为相似度

 if similarity &gt;= min_similarity:
                    memory = {
 "content": results["documents"][0][i],
 "metadata": results["metadatas"][0][i],
 "similarity": similarity,
 "id": results["ids"][0][i]
 }
                    memories.append(memory)

 # 按相似度排序
        memories.sort(key=lambda x: x["similarity"], reverse=True)
 return memories

 def get_relevant_context(self, query, max_memories=3):
 """获取与查询相关的记忆作为上下文"""

        memories = self.search_memories(query, n_results=max_memories)

 if not memories:
 return ""

 # 构建上下文字符串
        context_parts = []
 for i, memory in enumerate(memories):
            content = memory["content"]
            similarity = memory["similarity"]
            timestamp = memory["metadata"]["timestamp"]

 # 格式化时间
            time_str = time.strftime("%Y-%m-%d %H:%M", time.localtime(timestamp))

            context_parts.append(
 f"[相关记忆 {i+1}，相似度：{similarity:.2f}，时间：{time_str}]\n{content}"
 )

 return "\n\n".join(context_parts)

 def delete_memory(self, memory_id):
 """删除记忆"""
        self.collection.delete(ids=[memory_id])

 def get_all_memories(self, limit=100):
 """获取所有记忆（按时间倒序）"""
 # 注意：ChromaDB 没有直接的获取所有功能
 # 这里通过搜索一个通用查询来获取
        results = self.collection.query(
            query_embeddings=[self.embedding_model.encode(" ").tolist()], # 空查询
            n_results=limit
 )

        memories = []
 if results["documents"]:
 for i in range(len(results["documents"][0])):
                memory = {
 "content": results["documents"][0][i],
 "metadata": results["metadatas"][0][i],
 "id": results["ids"][0][i]
 }
                memories.append(memory)

 # 按时间倒序排序
        memories.sort(key=lambda x: x["metadata"]["timestamp"], reverse=True)
 return memories</code></pre>

<a id="t-ryfDpsUZ6FKAWCUFNuDAFF"></a>

##### 使用向量记忆的完整示例

<pre id="t-rHncGoSfDpJlkuY2P96x6c"><code>class AgentWithMemory:
 """带有记忆系统的AI Agent"""

 def __init__(self, llm_client):
        self.llm = llm_client
        self.short_term_memory = ShortTermMemory(max_turns=10)
        self.long_term_memory = VectorMemory()

 def process_query(self, user_query):
 """处理用户查询"""

 # 1. 从长期记忆中检索相关信息
        relevant_context = self.long_term_memory.get_relevant_context(user_query)

 # 2. 构建完整的上下文
        short_term_context = self.short_term_memory.get_context()

 # 3. 准备系统提示词
        system_message = "你是一个有帮助的AI助手。"
 if relevant_context:
            system_message += f"\n\n相关背景信息：\n{relevant_context}"

 # 4. 调用LLM生成回答
        messages = [{"role": "system", "content": system_message}]
        messages.extend(short_term_context)
        messages.append({"role": "user", "content": user_query})

        response = self.llm.chat_completion(messages)

 # 5. 更新短期记忆
        self.short_term_memory.add_message("user", user_query)
        self.short_term_memory.add_message("assistant", response)

 # 6. 判断是否应该保存到长期记忆
 if self.should_save_to_long_term(user_query, response):
            self.save_to_long_term(user_query, response)

 return response

 def should_save_to_long_term(self, user_query, response):
 """判断是否应该保存到长期记忆"""
 # 简单的启发式规则
        important_keywords = ["偏好", "喜欢", "不喜欢", "重要", "记住", "下次", "经常"]

        query_lower = user_query.lower()
        response_lower = response.lower()

 # 检查是否包含重要关键词
 for keyword in important_keywords:
 if keyword in query_lower or keyword in response_lower:
 return True

 # 检查是否是关于个人信息
        personal_keywords = ["我叫", "我是", "我住在", "我的电话", "我的邮箱"]
 for keyword in personal_keywords:
 if keyword in query_lower:
 return True

 return False

 def save_to_long_term(self, user_query, response):
 """保存到长期记忆"""
 # 将对话作为一条记忆保存
        memory_content = f"用户：{user_query}\n助理：{response}"
        metadata = {
 "type": "conversation",
 "user_query": user_query[:100], # 截断以避免过长
 "response_length": len(response)
 }

        self.long_term_memory.add_memory(memory_content, metadata)

# 使用示例
if __name__ == "__main__":
 # 创建带记忆的Agent
    agent = AgentWithMemory(llm_client)

 # 模拟对话
    conversations = [
 "你好，我叫张三，住在北京",
 "我喜欢编程和阅读",
 "我不喜欢早起",
 "今天天气怎么样？",
 "我的编程偏好是什么？" # 这个问题应该能检索到之前的记忆
 ]

 for query in conversations:
 print(f"\n用户: {query}")
        response = agent.process_query(query)
 print(f"助理: {response[:100]}...") # 只打印前100字符</code></pre>


<a id="section-1356"></a>
## 向量数据库的优化技巧

<a id="t-XhnJ3XJdRtQHDWBkllgVac"></a>

<p id="t-aOXLgeS1LAsj1CViExFo42"><span style="border-bottom:1px solid;font-weight:bold">选择合适的 embedding 模型</span><span style="border-bottom:1px solid">：</span></p>

<ul><li id="t-khpFQaA2naS51FVcgQgmxW"><span style="border-bottom:1px solid;font-weight:bold">多语言支持</span><span>：</span><span style="border-bottom:1px solid">paraphrase-multilingual-MiniLM-L12-v2</span></li></ul>

<ul><li id="t-ODLYOb0ej83cztOvvM3qC5"><span style="border-bottom:1px solid;font-weight:bold">英文优化</span><span>：</span><span style="border-bottom:1px solid">all-MiniLM-L6-v2</span></li></ul>

<ul><li id="t-e1f1d6OLi6eZP3wV585822"><span style="border-bottom:1px solid;font-weight:bold">高质量</span><span>：</span><span style="border-bottom:1px solid">text-embedding-ada-002</span><span>（OpenAI）</span></li></ul>

<p id="t-ev5TqenDjtI6S4wQrJd0E4"><span style="border-bottom:1px solid;font-weight:bold">元数据过滤</span><span style="border-bottom:1px solid">：利用向量数据库的元数据过滤功能提高检索精度</span></p>

<pre id="t-cSsdmVmDpI5Amsp8NgHNwL"><code># 使用元数据过滤
results = collection.query(
    query_embeddings=[query_embedding],
    n_results=5,
    where={"type": "personal_preference"}, # 只检索个人偏好类型的记忆
    where_document={"$contains": "编程"} # 只检索包含"编程"的文档
)</code></pre>

<p id="t-nmKVqgfD8sB92EBdqhV0Px"><span style="border-bottom:1px solid;font-weight:bold">混合搜索：</span><span style="border-bottom:1px solid">结合向量搜索和关键词搜索</span></p>

<pre id="t-8TyC5P1y8MKpoid5oBtRZq"><code>def hybrid_search(query, vector_memory, keyword_weight=0.3):
 """混合搜索：结合向量相似度和关键词匹配"""

 # 向量搜索
    vector_results = vector_memory.search_memories(query, n_results=10)

 # 关键词搜索（简化实现）
    keyword_results = []
    query_words = set(query.lower().split())

 # 这里简化实现，实际应从数据库检索
    all_memories = vector_memory.get_all_memories(limit=100)
 for memory in all_memories:
        content_words = set(memory["content"].lower().split())
        common_words = query_words &amp; content_words
        keyword_score = len(common_words) / max(len(query_words), 1)

 if keyword_score &gt; 0:
            memory["keyword_score"] = keyword_score
            keyword_results.append(memory)

 # 合并结果
    all_results = {}
 for result in vector_results:
        result_id = result["id"]
        all_results[result_id] = {
 "vector_score": result["similarity"],
 "keyword_score": 0,
 "content": result["content"],
 "metadata": result["metadata"]
 }

 for result in keyword_results:
        result_id = result["id"]
 if result_id in all_results:
            all_results[result_id]["keyword_score"] = result["keyword_score"]
 else:
            all_results[result_id] = {
 "vector_score": 0,
 "keyword_score": result["keyword_score"],
 "content": result["content"],
 "metadata": result["metadata"]
 }

 # 计算综合分数
    final_results = []
 for result_id, result in all_results.items():
        combined_score = (
 (1 - keyword_weight) * result["vector_score"] +
            keyword_weight * result["keyword_score"]
 )
        result["combined_score"] = combined_score
        final_results.append(result)

 # 按综合分数排序
    final_results.sort(key=lambda x: x["combined_score"], reverse=True)
 return final_results[:5]</code></pre>


<a id="section-1357"></a>
## 记忆压缩与总结策略

<a id="t-6M6U0yI9yzf2U3LOUxxINw"></a>

<p id="t-fdSFcBKyDZxD7kQcuzju8n"><span style="border-bottom:1px solid">随着对话的进行，记忆会不断累积。为了避免信息过载和减少资源消耗，需要定期对记忆进行压缩和总结。</span></p>


<a id="section-1358"></a>
## 为什么需要记忆压缩？

<a id="t-7ChNvHlwLrAMHBuzJLencE"></a>

<ul><li id="t-BRZvF0BBrWQ2x0yL4l3ucz"><span style="border-bottom:1px solid;font-weight:bold">节省存储空间</span><span>：原始对话记录可能非常庞大</span></li></ul>

<ul><li id="t-RE0zuhu2MKk8OWUIDoTwx6"><span style="border-bottom:1px solid;font-weight:bold">提高检索效率</span><span>：压缩后的记忆更易于检索和处理</span></li></ul>

<ul><li id="t-2d6jhognXRkHpEh6X63MIl"><span style="border-bottom:1px solid;font-weight:bold">提取核心信息</span><span>：去除冗余，保留精华</span></li></ul>

<ul><li id="t-OKMPYNDIYy3mmv8u14aoOi"><span style="border-bottom:1px solid;font-weight:bold">减少计算成本</span><span>：处理压缩记忆比处理原始记忆更高效</span></li></ul>


<a id="section-1359"></a>
## 记忆压缩策略

<a id="t-O5fZBLeheWC5PItjCVjRZz"></a>

<a id="t-ljPvLng3QDX0GfkgTv52Mq"></a>

##### 基于重要性的压缩

<pre id="t-vGn9THvpi9zTmjFbQxgHIV"><code>class ImportanceBasedCompressor:
 """基于重要性的记忆压缩器"""

 def __init__(self, llm_client):
        self.llm = llm_client

 def compress_memories(self, memories, target_ratio=0.5):
 """压缩记忆，保留重要内容"""

 if len(memories) &lt;= 1:
 return memories  # 记忆太少，不需要压缩

 # 评估每个记忆的重要性
        scored_memories = []
 for memory in memories:
            importance = self.evaluate_importance(memory)
            scored_memories.append((importance, memory))

 # 按重要性排序
        scored_memories.sort(key=lambda x: x[0], reverse=True)

 # 保留最重要的部分
        keep_count = max(1, int(len(memories) * target_ratio))
        compressed_memories = [memory for _, memory in scored_memories[:keep_count]]

 return compressed_memories

 def evaluate_importance(self, memory):
 """评估记忆的重要性"""
        content = memory["content"]
        metadata = memory.get("metadata", {})

 # 基于规则的重要性评估
        importance_score = 0.0

 # 1. 基于类型
        memory_type = metadata.get("type", "")
 if memory_type == "personal_info":
            importance_score += 0.8
 elif memory_type == "preference":
            importance_score += 0.7
 elif memory_type == "fact":
            importance_score += 0.5
 elif memory_type == "conversation":
            importance_score += 0.3

 # 2. 基于长度（适中的长度可能更重要）
        content_length = len(content)
 if 50 &lt;= content_length &lt;= 500:
            importance_score += 0.2
 elif content_length &gt; 500:
            importance_score += 0.1

 # 3. 基于时间衰减（越新的记忆越重要）
        timestamp = metadata.get("timestamp", 0)
 if timestamp &gt; 0:
            age_days = (time.time() - timestamp) / (24 * 3600)
            recency_score = max(0, 1 - age_days / 30) # 30天内线性衰减
            importance_score += recency_score * 0.5

 # 4. 基于显式重要性标记
        explicit_importance = metadata.get("importance", 0.5)
        importance_score += explicit_importance * 0.5

 return min(importance_score, 1.0) # 归一化到0-1</code></pre>

<a id="t-yiKU3TppY8BSBo61wqmazy"></a>

##### 基于聚类的压缩

<p id="t-yIIJ2wR3I43ohzPCFIjy75"><span style="border-bottom:1px solid">将相似记忆聚类，然后总结每个聚类：</span></p>

<pre id="t-Q0EMk5zLP1jDJQcsN3Gfhv"><code>from sklearn.cluster import KMeans
import numpy as np

class ClusterBasedCompressor:
 """基于聚类的记忆压缩器"""

 def __init__(self, embedding_model):
        self.embedding_model = embedding_model

 def compress_by_clustering(self, memories, n_clusters=None):
 """通过聚类压缩记忆"""

 if len(memories) &lt;= 3:
 return memories  # 记忆太少，不需要聚类

 # 确定聚类数量
 if n_clusters is None:
            n_clusters = min(3, len(memories) // 2)

 # 获取所有记忆的embedding
        embeddings = []
 for memory in memories:
            embedding = self.embedding_model.encode(memory["content"])
            embeddings.append(embedding)

        embeddings = np.array(embeddings)

 # 执行K-means聚类
        kmeans = KMeans(n_clusters=n_clusters, random_state=42, n_init=10)
        labels = kmeans.fit_predict(embeddings)

 # 对每个聚类进行总结
        compressed_memories = []
 for cluster_id in range(n_clusters):
 # 获取该聚类的所有记忆
            cluster_memories = [
                memories[i] for i in range(len(memories)) if labels[i] == cluster_id
 ]

 if cluster_memories:
 # 总结该聚类的记忆
                summary = self.summarize_cluster(cluster_memories)
                compressed_memories.append(summary)

 return compressed_memories

 def summarize_cluster(self, cluster_memories):
 """总结一个聚类的记忆"""

 if len(cluster_memories) == 1:
 # 只有一个记忆，直接返回
 return cluster_memories[0]

 # 合并所有记忆内容
        all_content = "\n".join([m["content"] for m in cluster_memories])

 # 使用LLM生成总结（这里简化实现）
 # 实际应调用LLM生成高质量的总结
        summary_content = f"相关主题的{len(cluster_memories)}条记忆摘要：{all_content[:500]}..."

 # 合并元数据
        merged_metadata = {
 "type": "cluster_summary",
 "original_count": len(cluster_memories),
 "compressed": True,
 "timestamp": time.time()
 }

 return {
 "content": summary_content,
 "metadata": merged_metadata
 }</code></pre>

<a id="t-X3iRPuvnXa8heaUa4zd7pq"></a>

##### 增量总结策略

<p id="t-Xd3W5THg36ZXMyR53MW4qn"><span style="border-bottom:1px solid">在对话过程中逐步总结，而不是一次性处理所有历史：</span></p>

<pre id="t-mo6ruvYc5j0eMQSEIn5t9p"><code>class IncrementalSummarizer:
 """增量总结器"""

 def __init__(self, llm_client, summary_interval=5):
        self.llm = llm_client
        self.summary_interval = summary_interval  # 每多少轮对话总结一次
        self.conversation_buffer = []
        self.summaries = []

 def add_conversation(self, user_input, assistant_response):
 """添加对话到缓冲区"""

        self.conversation_buffer.append({
 "user": user_input,
 "assistant": assistant_response,
 "timestamp": time.time()
 })

 # 检查是否需要总结
 if len(self.conversation_buffer) &gt;= self.summary_interval:
            self.create_summary()

 def create_summary(self):
 """创建总结"""

 if not self.conversation_buffer:
 return

 # 将对话缓冲区的所有内容总结为一段文字
        conversation_text = ""
 for exchange in self.conversation_buffer:
            conversation_text += f"用户: {exchange['user']}\n"
            conversation_text += f"助理: {exchange['assistant']}\n\n"

 # 使用LLM生成总结
        prompt = f"""
请将以下对话内容总结为一个简短的段落，保留核心信息和重要细节：

对话内容：
{conversation_text}

总结要求：
1. 不超过200字
2. 保留用户的主要需求和助理的关键回答
3. 忽略问候语、重复内容和无关细节

总结：
"""

        summary = self.llm.generate(prompt, max_tokens=200)

 # 保存总结
        self.summaries.append({
 "content": summary,
 "timestamp": time.time(),
 "original_count": len(self.conversation_buffer)
 })

 # 清空缓冲区
        self.conversation_buffer.clear()

 def get_context(self, include_recent=True, include_summaries=True):
 """获取上下文"""

        context_parts = []

 if include_summaries and self.summaries:
 # 添加所有总结
 for i, summary in enumerate(self.summaries[-3:]): # 最多3个总结
                context_parts.append(f"[对话总结 {i+1}]\n{summary['content']}")

 if include_recent and self.conversation_buffer:
 # 添加最近的对话
 for exchange in self.conversation_buffer[-3:]: # 最多3轮最近对话
                context_parts.append(f"用户: {exchange['user']}")
                context_parts.append(f"助理: {exchange['assistant']}")

 return "\n\n".join(context_parts)</code></pre>


<a id="section-1360"></a>
## 记忆生命周期管理

<a id="t-eCf4l9zOjIdU5zfHXBbq1S"></a>

<p id="t-KxvVvOLIgIUWQrMoVqYCCx"><span>一个完整的记忆系统应该管理记忆的整个生命周期：</span></p>

<div id="t-68AoLPwExdOUKYlQV4A0Oe"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/13ad809b88612056fd20aac3.svg"/></div>

<pre id="t-30SdOuRIGvenm9aWqueQ5Q"><code>class MemoryLifecycleManager:
 """记忆生命周期管理器"""

 def __init__(self):
        self.short_term = ShortTermMemory()
        self.long_term = VectorMemory()
        self.compressor = ImportanceBasedCompressor()

 def process_memory(self, content, initial_importance=0.5):
 """处理新记忆"""

 # 1. 先存入短期记忆
        self.short_term.store_temp("recent_memory", content)

 # 2. 评估重要性
        evaluated_importance = self.evaluate_importance(content, initial_importance)

 # 3. 根据重要性决定存储策略
 if evaluated_importance &gt;= 0.8:
 # 高重要性：立即存入长期记忆
            self.long_term.add_memory(content, {"importance": evaluated_importance})
 elif evaluated_importance &gt;= 0.5:
 # 中等重要性：标记为待处理
            self.queue_for_review(content, evaluated_importance)
 else:
 # 低重要性：仅保留在短期记忆，稍后清理
 pass

 def evaluate_importance(self, content, initial_importance):
 """评估记忆重要性"""
 # 这里可以实现更复杂的评估逻辑
 return initial_importance

 def queue_for_review(self, content, importance):
 """将记忆加入待处理队列"""
 # 实现队列逻辑
 pass

 def periodic_maintenance(self):
 """定期维护"""

 # 1. 压缩长期记忆
        all_memories = self.long_term.get_all_memories(limit=1000)
 if len(all_memories) &gt; 100:
            compressed = self.compressor.compress_memories(all_memories, target_ratio=0.7)

 # 更新长期记忆（实际实现中可能需要更复杂的逻辑）
 # 这里简化处理

 # 2. 清理旧的低重要性记忆
        self.cleanup_old_memories()

 def cleanup_old_memories(self, max_age_days=30, min_importance=0.3):
 """清理旧记忆"""
 # 获取所有记忆
        all_memories = self.long_term.get_all_memories(limit=1000)
        current_time = time.time()

 for memory in all_memories:
            metadata = memory.get("metadata", {})
            timestamp = metadata.get("timestamp", 0)
            importance = metadata.get("importance", 0.5)

 # 计算记忆年龄
            age_days = (current_time - timestamp) / (24 * 3600)

 # 删除旧且不重要的记忆
 if age_days &gt; max_age_days and importance &lt; min_importance:
                self.long_term.delete_memory(memory["id"])</code></pre>

