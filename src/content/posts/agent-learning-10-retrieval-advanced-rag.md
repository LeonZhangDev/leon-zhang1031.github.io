---
title: "第 10 章 · 检索与 RAG 进阶"
date: "2026-10-22"
draft: false
author: "学习资料整理"
description: "Embedding、向量库、混合检索、重排序、查询改写与 GraphRAG"
tags: ["Agent", "学习路线"]
categories: ["AI 工程"]
prerequisites: ["agent-learning-09-rag-data-processing"]
verification: {"status": "not-run", "scope": "本次仅整理资料；示例代码与原文技术结论未复跑。"}
---

Embedding、向量库、混合检索、重排序、查询改写与 GraphRAG

[学习路线](/posts/agent-learning-route/) · [上一章](/posts/agent-learning-09-rag-data-processing/) · [下一章](/posts/agent-learning-11-multi-agent/)

本章按知识小节编排。项目内容作为学习案例阅读，示例代码与原文技术结论未在本次整理中执行验证。

## 本章目录

- [常见的向量数据库](#section-0097)
- [嵌入向量](#section-0099)
- [向量数据库](#section-0521)
- [一个直观的类比](#section-0522)
- [为什么需要向量数据库](#section-0523)
- [传统数据库的局限](#section-0524)
- [传统方案的问题](#section-0525)
- [对比示意图](#section-0526)
- [核心概念：向量与嵌入](#section-0527)
- [什么是向量（Vector）](#section-0528)
- [什么是嵌入（Embedding）](#section-0529)
- [语义近则向量近](#section-0530)
- [相似度计算方法](#section-0531)
- [余弦相似度（Cosine Similarity）](#section-0532)
- [欧氏距离（Euclidean Distance）](#section-0533)
- [点积（Dot Product）](#section-0534)
- [三种方法对比](#section-0535)
- [Python 代码示例](#section-0536)
- [实例](#section-0537)
- [向量索引算法](#section-0538)
- [暴力检索（Flat / Brute-force）](#section-0539)
- [IVF（倒排文件索引）](#section-0540)
- [HNSW（分层导航小世界图）](#section-0541)
- [其他常用索引](#section-0542)
- [主流向量数据库对比](#section-0543)
- [快速上手：Python 示例](#section-0544)
- [实例](#section-0546)
- [完整示例：构建一个文档语义搜索系统](#section-0547)
- [实例](#section-0548)
- [实例](#section-0549)
- [实例](#section-0550)
- [不使用第三方嵌入 API（纯本地）](#section-0551)
- [实例](#section-0552)
- [pgvector 示例（PostgreSQL 用户）](#section-0553)
- [实例](#section-0554)
- [典型应用场景](#section-0555)
- [RAG（检索增强生成）架构](#section-0556)
- [选型决策树](#section-0558)
- [嵌入模型的选择](#section-0559)
- [性能优化技巧](#section-0560)
- [实例](#section-0561)
- [实例](#section-0562)
- [实例](#section-0563)
- [常见踩坑](#section-0564)
- [总结](#section-0565)
- [学习路径建议](#section-0566)
- [参考资源](#section-0567)
- [GraphRAG 入门教程](#section-2053)
- [什么是 GraphRAG](#section-2054)
- [传统 RAG 的局限](#section-2055)
- [GraphRAG 如何解决这两个问题](#section-2056)
- [四种查询模式对比](#section-2057)
- [环境要求](#section-2058)
- [安装](#section-2059)
- [创建项目目录并初始化虚拟环境](#section-2060)
- [激活虚拟环境](#section-2061)
- [安装 GraphRAG](#section-2062)
- [初始化工作区](#section-2063)
- [准备测试文档](#section-2064)
- [配置 qwen-plus 与 Embedding 模型](#section-2065)
- [第一步：配置 API Key](#section-2066)
- [实例](#section-2067)
- [第二步：修改 settings.yaml](#section-2068)
- [开始索引](#section-2069)
- [执行查询](#section-2070)
- [CLI 查询](#section-2071)
- [Python API 查询](#section-2072)
- [实例](#section-2073)
- [Prompt 自动调优](#section-2074)
- [常用 CLI 命令速查](#section-2075)
- [完整 settings.yaml 字段说明](#section-2076)
- [模型相关](#section-2077)
- [分块相关](#section-2078)
- [实体抽取相关](#section-2079)
- [索引中途失败了怎么办？](#section-2081)
- [出现 JSON 解析错误怎么处理？](#section-2082)
- [如何选择 Global Search 还是 Local Search？](#section-2083)
- [Token 消耗太高如何控制？](#section-2084)
- [如何处理中文文档？](#section-2085)
- [延伸阅读](#section-2086)

<a id="section-0097"></a>
## 常见的向量数据库

<a id="f-doxcnTb4akf7iqpaAdqRewsSezh"></a>

<p id="f-doxcn8GUulWRbhhXPwF2ZbIabUf"><span>常见的向量数据库有Milvus, Weaviate, Chroma, Qdrant。具体来讲：</span></p>

<p id="f-doxcnQMzu7tPS9gm0oxyRQ73SZb"><span style="font-weight:bold">Milvus </span><span>建立在Faiss, Annoy等开源向量搜索库的基础上，能够支持</span><span style="font-weight:bold">数十亿级别</span><span>甚至万亿级别的向量搜索库，并且</span><span style="font-weight:bold">检索速度快</span><span>，万亿向量数据集上检索速度的延迟可以控制在毫秒级。</span></p>

<p id="f-doxcnD8gVEeI0RoZTzQViGeer2c"><span>除此之外，Milvus还支持</span><span style="font-weight:bold">数据分片</span><span>，</span><span style="font-weight:bold">数据持久化，流式数据摄取</span><span>，</span><span style="font-weight:bold">混合搜索</span><span>等很多高级功能。具有</span><span style="font-weight:bold">高可用性</span><span>，</span><span style="font-weight:bold">高性能</span><span>和</span><span style="font-weight:bold">易扩展</span><span>的特点，用户还可以将其部署在Kubernetes上。并且可靠性强，具有</span><span style="font-weight:bold">数据复制</span><span>和</span><span style="font-weight:bold">故障恢复</span><span>的功能。</span></p>

<p id="f-doxcn4VDXtJSQxIuNAReKlbDDWc"><span style="font-weight:bold">Weaviate</span><span> 具有</span><span style="font-weight:bold">鲁棒性</span><span>，</span><span style="font-weight:bold">云原生性</span><span>和</span><span style="font-weight:bold">可扩展性</span><span>的特点。它结合了向量搜索和结构化过滤的能力，同时拥有云原生数据库的容错性和可伸缩性。在百万级的向量数据上，可以实现毫秒级的检索。它可以方便调用OpenAI, Cohere以及Hugging Face平台提供的先进的数据向量化接口和模型。缺点是：目前只支持HNSW这一种检索算法。</span></p>

<p id="f-doxcnHOYwScPIr8lAsPrBy0OYpn"><span style="font-weight:bold">Chroma</span><span> 是一款AI原生的开源向量数据库，主要功能和特点围绕AI应用开发而设计。主要针对大模型RAG场景，目前只实现了单机方案。相比Weaviate和Milvus，Chroma更轻量化。 检索上实现了FAISS索引，不支持GPU加速。</span></p>

<div id="f-doxcn84k8mvMCdvvQ8tWzhdHUbc"><img alt="" decoding="async" height="465" loading="lazy" src="/images/agent-learning/b2d4c2f5846974b8b5773ff4.png" width="891"/></div>


<a id="section-0099"></a>
## 嵌入向量

<a id="f-doxcnx7ckpsZwM5qMqdu9ZAiu2y"></a>

<blockquote id="f-doxcnXUf9PCNYqozEU1GjFSYuob"><p id="f-doxcnQUtuE3GH8eh43JSDWQ8Isc"><span>面试偶尔喜欢问的：有什么Embedding的方式，对比。Embedding选择策略。没啥特别要强调的，不过还是值得记住（背住的）。本质上来说，是RAG项目做得并没特别深入和专业，所以我就是选择了通用Embedding模型，没办法这些部分只能背着，最少做理论上的巨人。</span></p>

</blockquote>

<a id="f-doxcnsaeDCNiRdYcbaf44BTrnig"></a>

##### 常见的Embedding方法

<p id="f-doxcnULK2P4pmpohJztaufNUZhg"><span>常见的 embedding 相关模型大概可以分成几类：</span></p>

<p id="f-doxcnT6StO7fFKLS9XUikR02qcc"><span style="font-weight:bold">通用语言理解模型：BERT、RoBERTa</span></p>

<p id="f-doxcnzqlU75oZjQdx4sOsDnBdod"><span>这类模型本质上是通用文本理解底座，语言理解能力强，适合分类、抽取式问答、序列标注、精排等任务。</span></p>

<p id="f-doxcnt1Jt1t7VFqByUIqZHYHTFb"><span>但它们</span><span style="font-weight:bold">不是专门为向量检索训练的</span><span>。如果直接拿 BERT 的句向量去做相似度搜索，效果通常不稳定：有时两个句子看起来很像，向量距离却不近；有时语义不相关，分数又拉不开。</span></p>

<p id="f-doxcnt3wtFmMVIrHoUfOwBeWNFd"><span>所以在 RAG 里，BERT 更常作为底座或精排模型使用，不是最推荐直接拿来做第一阶段召回。</span></p>

<p id="f-doxcnVaSZEeCnWmDJCXTywOga8f"><span style="font-weight:bold">句向量模型：SBERT、Sentence Transformers</span></p>

<p id="f-doxcngbJYngi3kgk3bUMlS5A5Sb"><span>这类模型是在 BERT 基础上改出来的，目标就是让句子向量更适合做相似度计算。它会把问题和文档分别编码成向量，然后用向量距离判断相关性。</span></p>

<p id="f-doxcn9q1JEIbXWiiuSK7VDYbvzb"><span style="font-weight:bold">它的优点</span><span>是：</span><span style="font-weight:bold">开源、好部署、生态成熟、适合语义搜索和 RAG 召回</span><span>。相比原生 BERT，它更适合做“用户问题和知识片段是否相关”的判断。</span></p>

<p id="f-doxcnzToMZhkaL3aNsqN3cQMYcg"><span style="font-weight:bold">缺点是</span><span>：不同模型差异很大。英文效果好的模型，不一定适合中文；通用语料上效果好的模型，不一定适合公司内部术语、产品名、业务黑话。小模型速度快但表达能力弱，大模型效果好但资源和延迟更高。</span></p>

<p id="f-doxcnuC6VmUo2WUGheZqRwAqawD"><span style="font-weight:bold">检索专用开源模型：E5、BGE、GTE</span></p>

<p id="f-doxcnNXYtiP7pn69gMOChclVT9g"><span>这类模型一开始就是按“问题找文档”的目标训练的，更贴近 RAG 的使用方式。它们通常会用大量问答对、搜索点击数据、正负样本对来训练，所以对“这个问题应该召回哪段资料”更敏感。</span></p>

<p id="f-doxcnOV5rT1FKa4Oya9X36C85ad"><span style="font-weight:bold">它的优点</span><span>是：</span><span style="font-weight:bold">召回能力强、适合知识库问答、可以私有化部署、中文模型选择也比较多</span><span>。如果项目不能把数据发到外部 API，这类模型通常是比较现实的选择。</span></p>

<p id="f-doxcni5zAUrN6msUtyCuwGhqHle"><span style="font-weight:bold">缺点是</span><span>：部署、显存、推理速度、批量建库都要自己维护；有些模型还有固定输入格式，比如问题和文档要分别加不同前缀，不按格式用可能会掉效果。</span></p>

<p id="f-doxcnxSWAwJDD4wJ1f6JZpodiWf"><span style="font-weight:bold">商业 Embedding API：OpenAI、Cohere、Voyage 等</span></p>

<p id="f-doxcnsv3msfvB8Z5alGDDLiuswh"><span>这类模型的特点是开箱即用。你不用自己部署模型，只要调用接口就能生成向量。</span></p>

<p id="f-doxcnvHMI9POHB4GBN62Dpf0yfg"><span style="font-weight:bold">它的优点</span><span>是：</span><span style="font-weight:bold">效果稳定、多语言能力强、接入简单、维护成本低</span><span>。很多项目早期验证 RAG 效果时，会先用这类模型快速跑通。</span></p>

<p id="f-doxcnXpsMNrivcCVL2042iVADDb"><span style="font-weight:bold">缺点是</span><span>：要考虑调用成本、网络延迟、限流、数据合规和私有化问题。尤其是企业内部知识库，如果文档不能出内网，就不能简单依赖外部接口。大规模重建索引时，费用也可能比较明显。</span></p>

<p id="f-doxcnB0raoe47b9zYgJYiaxy4yg"><span style="font-weight:bold">领域专用模型：代码、法律、金融、医疗等</span></p>

<p id="f-doxcnAxrJS4MFCbPB9dBRCMV3ih"><span>这类模型不是追求“什么都能搜”，而是针对某个领域优化。比如代码检索要理解函数名、接口、报错信息；法律检索要理解法条、案由、裁判逻辑；医疗检索要理解疾病、药品、检查指标。</span></p>

<p id="f-doxcnroqsKAcLx4MUl5EZk1zArd"><span style="font-weight:bold">它的优点</span><span>是：</span><span style="font-weight:bold">在特定领域更准，能处理通用模型不熟悉的术语和表达</span><span>。</span></p>

<p id="f-doxcnGvULSbkArh0oL0ESHoseb4"><span style="font-weight:bold">缺点是</span><span>：换领域后不一定好用，而且训练和评估成本更高。是否值得用领域模型，要看业务 query 里领域术语占比高不高，以及通用模型是否已经明显召回不准。</span></p>

<p id="f-doxcnStJaVDBeZQlkXEMPmWQKxZ"><span style="font-weight:bold">领域专用 embedding 模型</span><span>：比如代码、法律、金融、医疗、论文检索、图文多模态检索等模型。它们的优点是在特定领域术语、结构和查询方式上更准，比如代码检索要理解函数名、API、错误信息，法律检索要理解法条和案由。缺点是泛化能力可能弱，换领域后不一定比通用模型好，而且评估和训练数据成本更高。</span></p>

<a id="f-doxcn1GNwCz9MBodfIGjE4lvQhh"></a>

##### Embedding选择策略

<p id="f-doxcnXE97kArhzMJtLGOb53xxfc"><span>1. </span><span style="font-weight:bold">先看要解决什么检索问题</span><span>：如果只是普通知识库问答，优先选面向“问题找文档”训练过的检索模型；如果是代码、法律、金融、医疗，就要考虑领域模型；如果要中文问英文资料，或者中英混合检索，就要看跨语言能力。不要用一个“通用句子相似度模型”硬套所有场景。</span></p>

<p id="f-doxcnj0tSD9de3FekazZ6N0xjGv"><span>2. </span><span style="font-weight:bold">再看数据本身的特点</span><span>：知识库是中文多，还是英文多？是长文档、PDF、网页，还是短 FAQ？里面有没有大量产品名、缩写、错误码、接口名、内部黑话？这些都会影响模型效果。比如纯语义模型对“意思相近”的内容比较敏感，但对订单号、版本号、接口名这种精确匹配，不一定比关键词检索好。</span></p>

<p id="f-doxcn9b7aPHdxd4o2PYQmtc25Pf"><span>3. </span><span style="font-weight:bold">一定要用业务样本试</span><span>：不要只看榜单。应该拿几十到几百个真实问题，标出它应该命中的文档片段，然后比较不同模型能不能把正确片段排到前面。重点看两个现象：该召回的有没有召回；不该召回的相似干扰项有没有混进来。</span></p>

<p id="f-doxcnhVPFiVEP7QjUbMWM1Z5xyb"><span>4. </span><span style="font-weight:bold">看能不能满足工程约束</span><span>：模型效果好还不够，还要看向量维度、索引大小、查询延迟、建库速度、调用成本、是否能私有化部署。比如商业 API 接入快，但有费用和数据合规问题；开源模型可控，但要自己维护推理服务和机器资源。</span></p>

<p id="f-doxcnwOG51Mua5CsIdCJRXF0GVd"><span>5. </span><span style="font-weight:bold">和切分、关键词检索、重排一起调</span><span>：Embedding 不是孤立选择的。chunk 切太大，语义会被稀释；切太小，上下文又不够。对于专有名词、编号、时间、版本号这类信息，通常还要结合关键词检索；对召回结果质量要求高的场景，再加重排模型做二次筛选。</span></p>

<a id="f-doxcntMg1RTMdzfzuPnfhF42CPd"></a>

##### 选错Embedding带来的问题

<p id="f-doxcntnlrsKMjCUqw2P3V70WT9b"><span>- </span><span style="font-weight:bold">召回不准</span><span>：用户问 A，返回一堆“语义上有点像但答不上问题”的 chunk，LLM 就会基于噪声回答。</span></p>

<p id="f-doxcnrwieF3DU6uly2XUeHRzofd"><span>- </span><span style="font-weight:bold">召回漏掉关键证据</span><span>：答案明明在库里，但 topK 里没有，表现为 RAG 频繁说不知道，或者只能答泛泛内容。</span></p>

<p id="f-doxcnxvFThqdcqLghigvOvC1ekf"><span>- </span><span style="font-weight:bold">近义词、缩写、业务术语匹配差</span><span>：比如内部黑话、产品名、英文缩写、中文同义表达搜不出来。</span></p>

<p id="f-doxcnTv81UJJ7WLZuWgglgpTl1b"><span>- </span><span style="font-weight:bold">跨语言效果差</span><span>：中文问题搜英文资料、英文问题搜中文资料时命中率明显下降。</span></p>

<p id="f-doxcnvfKWpk9WK9GX9YdwFDxUss"><span>- </span><span style="font-weight:bold">长 chunk 被语义稀释</span><span>：一个 chunk 里混了多个主题，向量变成“平均语义”，具体问题反而匹配不到。</span></p>

<p id="f-doxcnpMBVD1DzE3YmAqymA8VOoI"><span>- </span><span style="font-weight:bold">精确信息检索失败</span><span>：订单号、接口名、错误码、版本号这类 token，纯 embedding 可能不如关键词检索稳定。</span></p>

<p id="f-doxcnKsS38vJ3N2zCFkRG311LJf"><span>- </span><span style="font-weight:bold">分数分布异常</span><span>：相关和不相关 chunk 的相似度分数拉不开，阈值很难定，topK 结果经常抖动。</span></p>

<p id="f-doxcn48w9s6Rh6e4RHZhgEzM9Qd"><span>- </span><span style="font-weight:bold">线上成本过高</span><span>：维度太大或模型太慢，导致索引膨胀、检索延迟高、增量入库成本高。</span></p>

<a id="f-doxcnN8TPeVFwzH5RfbHomKf88f"></a>

##### 面试问题

<a id="f-doxcnFAl5FBbKrkacgBXqJYjtCd"></a>

###### Embedding模型在项目中应该怎么选，选错会出现什么现象？

<p id="f-doxcnWv4lim1EDfsvKaVPUQX12f"><span>请参考 202604 </span><span><span><a href="/posts/agent-learning-24-interview-review/#f-doxcnEzp8GDSc3cwzZgNbPWBXDd"><span>腾讯AIAgent开发暑期实习面经</span></a></span></span><span> 问题6，答案写在了那里。</span></p>

<a id="f-doxcnPqPTDbpyYVY0pmfc9TJ9vf"></a>

###### 向量数据库与关系型数据库的核心区别

<p id="f-doxcnbZ0uFSTYeBZk66aNJ5Jb8c"><span><span><a href="/posts/agent-learning-24-interview-review/#f-doxcnrLLbgIcIwHFvLq8iv6DmYg"><span>选自202607 宇树科技一面</span></a></span></span></p>

<p id="f-doxcn5p1vgqZXCwPXUlDGjPxXoh"><span>💡 </span><span style="font-weight:bold">思路：</span><span> 八股问题。对于这些八股，我们如果背到了是最好的，用一个比较标准的，全面的，精心组织的回答去回答。但是如果你没有背到这个八股，也不应该答不上来，学过了RAG，你应该知道向量数据库是啥，包括关系数据库，基本也算是计算机的常识问题了。</span></p>

<p id="f-doxcnnwAHTTHXiGVyQBzTStUMFb"><span>📝 </span><span style="font-weight:bold">答案：</span></p>

<p id="f-doxcnrApcd1d50BYUJ4FdL7XoKh"><span>向量数据库与关系型数据库最核心的区别，是</span><span style="font-weight:bold">数据表示方式和查询范式不同</span><span>。</span></p>

<p id="f-doxcnsm8DgnIQfXUHUec1DhO2T1"><span style="font-weight:bold">关系型数据库把数据组织成表、行和列</span><span>，通过明确的 Schema、SQL 条件以及 JOIN 进行</span><span style="font-weight:bold">精确查询</span><span>。例如，查询“张三的注册日期”或“过去一年订单总额”。它擅长</span><span style="font-weight:bold">处理结构化事实</span><span>的</span><span style="font-weight:bold">精确查询</span><span>、事务处理和</span><span style="font-weight:bold">强一致性</span><span>。</span></p>

<p id="f-doxcnUX6wWdOx38wIuA0hrssXAf"><span style="font-weight:bold">向量数据库</span><span>则会把文本、图片等非结构化内容通过 </span><span style="font-weight:bold">Embedding 模型</span><span>转换成</span><span style="font-weight:bold">高维向量</span><span>。查询时，也会把用户的问题转换成向量，再通过</span><span style="font-weight:bold">余弦相似度</span><span>、内积等方法，返回语义最相近的 </span><span style="font-weight:bold">Top-K</span><span> 结果。它擅长处理非结构化内容的</span><span style="font-weight:bold">语义检索</span><span>、相似内容匹配和大规模候选召回。</span></p>

<p id="f-doxcnCuLIkH7XDQP6PgmzOrLDXf"><span>两者的</span><span style="font-weight:bold">索引机制也不同</span><span>。关系型数据库常用 </span><span style="font-weight:bold">B+ 树</span><span>、</span><span style="font-weight:bold">哈希索引</span><span>；向量数据库常用 </span><span style="font-weight:bold">HNSW</span><span>、</span><span style="font-weight:bold">IVF</span><span>、</span><span style="font-weight:bold">PQ</span><span> 等</span><span style="font-weight:bold">近似最近邻索引</span><span>，需要在检索速度、召回率和内存占用之间进行权衡。因此，SQL 查询通常返回满足明确条件的确定记录，而</span><span style="font-weight:bold">向量检索</span><span>返回的是带有相似度分数的候选结果，并不保证结果一定正确。</span></p>

<p id="f-doxcnbNwgM8emx8BRn4Vtr1y0Ud"><span>在实际的 RAG 系统中，两者通常</span><span style="font-weight:bold">不是替代关系，而是互补关系</span><span>。例如，可以先用关系型字段或元数据过滤租户、权限、时间和文档类型，再通过</span><span style="font-weight:bold">向量检索</span><span>寻找语义相关的知识片段。PostgreSQL 加 pgvector 就是将两种能力结合起来的例子。</span></p>

<p id="f-doxcnWUNLImVv5wDzPdUdBn5Nhd"><span>最后总结来说：关系型数据库擅长对</span><span style="font-weight:bold">结构化事实进行精确、确定性的查询</span><span>；向量数据库擅长对</span><span style="font-weight:bold">非结构化内容进行近似的语义相似性检索</span><span>，两者在实际 RAG 系统中通常结合使用。</span></p>


<a id="section-0521"></a>
## 向量数据库

<a id="t-block-15264"></a>

<p id="t-ZSqhMDEvgwQPHTlKoKclel"><span>向量数据库（Vector Database）是一种专门用于存储、索引和检索高维向量数据的数据库系统。</span></p>

<p id="t-jG36XPyj0RAGpD8jwQtOr0"><span>你可以把它理解为：把意思相近的东西存在一起，并能快速找到和这个最像的那些东西。</span></p>

<p id="t-SRefKxdERLv6cY96DiBXmU"><span>与传统数据库通过精确匹配来查询（</span><span style="font-weight:bold">WHERE name = 'Alice'</span><span>）不同，向量数据库通过相似度来查询（找到和这张图最相似的 10 张图）。</span></p>


<a id="section-0522"></a>
## 一个直观的类比

<a id="t-Igsf01orLbO6qRNpuVoJf9"></a>

<p id="t-ZOZxCfnESYBeUbL7cTmmTE"><span>想象一个图书馆的场景：</span></p>

<div id="t-vwsR46w9b9t5dPc7ydr4Wd"><table><colgroup><col width="120"/><col width="201.8992919921875"/><col width="354.60931396484375"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>数据库类型</span></p></td><td style=" vertical-align: top"><p><span>检索方式</span></p></td><td style=" vertical-align: top"><p><span>类比</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>传统数据库</span></p></td><td style=" vertical-align: top"><p><span>按书号、书名精确检索</span></p></td><td style=" vertical-align: top"><p><span>找一本指定编号的书</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>向量数据库</span></p></td><td style=" vertical-align: top"><p><span>按内容相关性检索</span></p></td><td style=" vertical-align: top"><p><span>找"所有和《三体》风格类似的科幻小说"</span></p></td></tr></tbody></table></div>

<p id="t-13OBEVwxTeZpefZuD7Z5aG"><span>这种语义上的相似，正是向量数据库解决的核心问题。</span></p>


<a id="section-0523"></a>
## 为什么需要向量数据库

<a id="t-VdApifajO1GJZ69djknu1k"></a>

<p id="t-Xs90hNKDzgDTWtQSQByivt"><span>在深入技术细节之前，我们先理解向量数据库解决了什么问题。</span></p>


<a id="section-0524"></a>
## 传统数据库的局限

<a id="t-ezS4tSWumtu0vuCvPECSAX"></a>

<p id="t-P97Id8zRe8rHkg1xH8ad48"><span>传统关系型数据库（MySQL、PostgreSQL）非常擅长处理结构化数据，但在面对以下需求时力不从心：</span></p>

<ul><li id="t-heGJhxxTZQNx6NZnfNiHwk"><span>图片搜索（找出视觉相似的图片）</span></li></ul>

<ul><li id="t-8qONIv6WGaiW1DPSL8lkya"><span>语义搜索（用户搜"苹果手机"，能找到"iPhone"的相关内容）</span></li></ul>

<ul><li id="t-lbFoJKiMDBTFrTvDP2CoR5"><span>推荐系统（找到"和你喜欢的歌曲风格类似的歌"）</span></li></ul>

<ul><li id="t-vrdjElCotmUAjvsnlobzMD"><span>异常检测（找到"和正常行为差异最大的日志"）</span></li></ul>

<p id="t-5kXeqUD4FTHBYbREZ1wJnt"><span>这些问题的共同特征是：需要理解内容的"含义"，而不是做字面匹配。</span></p>


<a id="section-0525"></a>
## 传统方案的问题

<a id="t-OyokBYDj1FKPMHVG2h27pB"></a>

<pre id="t-9THH3u5yn5dlfCLTgFLj0u"><code>用 LIKE '%苹果%' 搜索 → 找不到 "iPhone"、"Apple"
用全文索引搜索     → 找不到语义相关但用词不同的内容</code></pre>


<a id="section-0526"></a>
## 对比示意图

<a id="t-eEFR3mLr5V8kRE1y8IHvE8"></a>

<p id="t-cxV5NzMVPlAsOqOyTfnuow"><span>下面的图表直观展示了传统数据库和向量数据库在查询方式上的根本差异。</span></p>

<div id="t-XULId6cSjZY9sJYc9qTeeQ"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/e66d584a6f50c6293f548609.png"/></div>


<a id="section-0527"></a>
## 核心概念：向量与嵌入

<a id="t-IoHedIKrooBYkVkjzyijFa"></a>

<p id="t-x6wyfkqFBHNKGpooM3VAaf"><span>理解向量和嵌入是掌握向量数据库的第一步。</span></p>


<a id="section-0528"></a>
## 什么是向量（Vector）

<a id="t-B6cpmI4diwooDEfBnpDb7W"></a>

<p id="t-21DrW7Ze4MOWs2Py1qa41p"><span>在数学上，向量就是一组有序的数字。</span></p>

<pre id="t-hyxUBB25QPnw9Q1bCIqTB8"><code>[0.12, -0.54, 0.87, 0.03, ..., 0.61]   ← 这就是一个向量</code></pre>

<p id="t-OMF823Gl4JBz6Q0yTjzSeZ"><span>在机器学习中，这组数字代表某个对象的语义特征，维度通常在 128 到 4096 之间。</span></p>


<a id="section-0529"></a>
## 什么是嵌入（Embedding）

<a id="t-qqvmRyKVH0CW0bxbGTm7Cu"></a>

<p id="t-qRMQhcCP4hzqD8lEPDNY8H"><span>嵌入（Embedding）是将现实世界的对象（文字、图片、音频等）转换成向量的过程和结果。</span></p>

<p id="t-gEAtHkvDyT5QjIRFjhQSzC"><span>这个转换由嵌入模型完成，其核心思想是：语义相近的对象，其向量在空间中的距离也更近。</span></p>

<div id="t-aUEibpO1dkgjHNJMWIwegi"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/b3aac3871ee865aabbb4545b.png"/></div>


<a id="section-0530"></a>
## 语义近则向量近

<a id="t-GgX3SLgNLulY05DgdxqnOM"></a>

<p id="t-A2pse4aCvkJyvpXWyJATe6"><span>用一个 2D 简化示例来理解（实际是几百至几千维）：</span></p>

<div id="t-aUQEM3ZsblQHGtjM5kHE8B"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/2143a3bc6e47ebc70c1975b9.png"/></div>

<blockquote id="t-7COmX3PTHJQCIInmstacn5"><p id="t-WiEssMuQl9aDeL5WpbIzxx"><span style="font-style:italic">关键理解：向量空间中距离近的两个向量，其原始内容在语义上也更相近。这是向量数据库所有能力的基础。</span></p></blockquote>


<a id="section-0531"></a>
## 相似度计算方法

<a id="t-UctcVOHFKimAd1CXZl1JPU"></a>

<p id="t-KTm0NJq9HDS3Wo4u6x2T9c"><span>找到"最相似的向量"的核心是计算两个向量的距离或相似度。以下是三种最常用的方法。</span></p>


<a id="section-0532"></a>
## 余弦相似度（Cosine Similarity）

<a id="t-hCR4EszGQXeMdy0tYoGqiQ"></a>

<p id="t-KgknXJgcaLhb1WVo0ERhjS"><span>余弦相似度衡量两个向量的方向角，忽略长度。这是最常用的方法，尤其适合文本场景。</span></p>

<p id="t-at3YF54tSUhiGbUsHSyrJG"><span>公式：</span></p>

<div id="t-uDXKoywnEJSK1ueqV8AAKo"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/179889f9a18de8e39ff4e162.png"/></div>

<ul><li id="t-8v1Qs5zgmAIxGwtA2PSidT"><span>结果范围：-1 到 1，值越大越相似</span></li></ul>

<ul><li id="t-pINEucphMtHnsgKMOIOXiU"><span>适用场景：文本语义搜索、文档相似度</span></li></ul>


<a id="section-0533"></a>
## 欧氏距离（Euclidean Distance）

<a id="t-Kxyyn5GRmGr5USvm8Dd9fa"></a>

<p id="t-3SyLmqnhNfT01ZlQar3xCU"><span>欧氏距离衡量两点之间的直线距离，距离越小越相似。</span></p>

<p id="t-EniwOAGli756rgmXnMLOr0"><span>公式：</span></p>

<div id="t-TG17ki9ZadNMtyWQ6nq3Nh"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/6e704f67aa2b618cd1e40a1c.png"/></div>

<ul><li id="t-PJyCV1MuRDuitMPD3ShIOI"><span>结果范围：0 到 ∞，值越小越相似</span></li></ul>

<ul><li id="t-qqEGSuf2u63JiYGpeK0M2x"><span>适用场景：图像检索、地理位置相关应用</span></li></ul>


<a id="section-0534"></a>
## 点积（Dot Product）

<a id="t-VaypNKzY9MIbe1Taudu5HS"></a>

<p id="t-kUSltJpecOz0nkHtJ6Fwvi"><span>点积是向量相乘求和，结合了方向和长度信息。</span></p>

<p id="t-YkZo0kbwNwq7bNMlluQiBJ"><span>公式：</span></p>

<div id="t-rk3Nk5mY30YMEL9NpJSBNb"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/755713e050dfe916d609c529.png"/></div>

<ul><li id="t-GdoHHMTTKzUwB4hNKDgUBB"><span>适用场景：推荐系统（向量已归一化时等价于余弦相似度）</span></li></ul>


<a id="section-0535"></a>
## 三种方法对比

<a id="t-fKDnysNGTbrdAflbC0YwV7"></a>

<div id="t-KZFG5aQ3lkPGDuV1X0mOXH"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/3440ee086dec2b4581859b02.png"/></div>


<a id="section-0536"></a>
## Python 代码示例

<a id="t-Hr5aevQkIfPWD2h8p7ATSM"></a>

<p id="t-iAmja4nYUzNaETJL8HhOe0"><span>以下示例演示了三种相似度计算方法的 Python 实现：</span></p>


<a id="section-0537"></a>
## 实例

<a id="t-Ga59CbpRg2DceWZ9T4fpKJ"></a>

<pre id="t-wnwL89r3gS6GtkirvbaUHK"><code>import numpy as np

# 余弦相似度：衡量方向相似性
def cosine_similarity(a, b):
 return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

# 欧氏距离：衡量绝对位置差异
def euclidean_distance(a, b):
 return np.linalg.norm(a - b)

# 点积：结合方向与长度
def dot_product(a, b):
 return np.dot(a, b)

# 示例向量
v1 = np.array([0.12, -0.54, 0.87, 0.03])
v2 = np.array([0.10, -0.50, 0.90, 0.05])
v3 = np.array([-0.80, 0.20, -0.30, 0.70])

print(f"v1 vs v2 余弦相似度: {cosine_similarity(v1, v2):.4f}") # 约 0.9997（非常相似）
print(f"v1 vs v3 余弦相似度: {cosine_similarity(v1, v3):.4f}") # 约 -0.55（不相似）</code></pre>

<pre id="t-qMLm0yuas3NhEOqfduuIje"><code>v1 vs v2 余弦相似度: 0.9997
v1 vs v3 余弦相似度: -0.5512</code></pre>


<a id="section-0538"></a>
## 向量索引算法

<a id="t-D51UewG4dzEgU6DOY5ceOo"></a>

<p id="t-LFwJx7iyLjCNYxUt9EsbcY"><span>数据量大时（百万、亿级），对每一条数据做相似度计算（暴力检索）太慢。向量数据库使用专门的索引算法来加速查询。</span></p>


<a id="section-0539"></a>
## 暴力检索（Flat / Brute-force）

<a id="t-jGBt2Y1XWCoQYiXFRWGSbE"></a>

<p id="t-zzwXpbplb35d2ubVovs40i"><span>暴力检索遍历所有向量，逐一计算相似度。</span></p>

<div id="t-LE7c6iILKwT5On2g3gHSre"><table><colgroup><col width="120"/><col width="400.89752197265625"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>维度</span></p></td><td style=" vertical-align: top"><p><span>说明</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>原理</span></p></td><td style=" vertical-align: top"><p><span>遍历所有向量，逐一计算相似度</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>优点</span></p></td><td style=" vertical-align: top"><p><span>结果 100% 精确</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>缺点</span></p></td><td style=" vertical-align: top"><p><span>数据量大时极慢，O(n) 复杂度</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>适用</span></p></td><td style=" vertical-align: top"><p><span>数据量小于 10 万，对精度要求极高</span></p></td></tr></tbody></table></div>


<a id="section-0540"></a>
## IVF（倒排文件索引）

<a id="t-pErpbGHJ1Dj8Ckikv65Ryj"></a>

<div id="t-2oelKSlJGfLB60ptA6QFVI"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/861bf856eebffa7ac7ca27fd.png"/></div>

<p id="t-4QM8NYJsyrL3inWskb1zvb"><span>IVF 执行步骤：</span></p>

<ol start="1"><li id="t-zmyXm9n3TKDtI4Ag8r7Er8"><span>训练阶段：用 K-Means 将所有向量聚成 N 个簇，记录每个簇的中心</span></li></ol>

<ol start="2"><li id="t-2Zctd3Qn4wAAtRekjveBD0"><span>查询阶段：先找出距离最近的几个簇的中心，再只在这些簇内做精确搜索</span></li></ol>


<a id="section-0541"></a>
## HNSW（分层导航小世界图）

<a id="t-z07KTMprgZaDJ4DrMd5iSp"></a>

<p id="t-xP0lZVb7VvIHbD19P6cMrk"><span>HNSW 是目前最主流的向量索引算法，兼顾速度和精度。</span></p>

<div id="t-3g5VJBdufgK2CVKUHcyn5q"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/3bd0e2eba17a78f9667d8f56.png"/></div>

<p id="t-BUp6I5eSqbnwyV7dMuQWIQ"><span>HNSW 核心思路：</span></p>

<ul><li id="t-uz9srFQ8zI2MYvPSNWLwuL"><span>构建多层图结构，顶层稀疏，底层密集</span></li></ul>

<ul><li id="t-57SmEfAvdIK8siDiJiKuqx"><span>查询时从顶层入口开始，做"跳格游戏"：每层贪心地往更近的节点跳，再下探到下一层</span></li></ul>

<ul><li id="t-rC1GmwXA96UdgoTaGeCjbz"><span>大幅减少需要比较的节点数，时间复杂度近似 O(log n)</span></li></ul>


<a id="section-0542"></a>
## 其他常用索引

<a id="t-vrOTlbfbtFnb9RGvAPxK2r"></a>

<div id="t-DnZqSFla8wb5u39IlLJMp0"><table><colgroup><col width="120"/><col width="239.89752197265625"/><col width="201.01031494140625"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>索引类型</span></p></td><td style=" vertical-align: top"><p><span>特点</span></p></td><td style=" vertical-align: top"><p><span>适用场景</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>Flat（暴力）</span></p></td><td style=" vertical-align: top"><p><span>精确但慢</span></p></td><td style=" vertical-align: top"><p><span>小数据集、精度优先</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>IVF_Flat</span></p></td><td style=" vertical-align: top"><p><span>聚类后精确搜索，速度快</span></p></td><td style=" vertical-align: top"><p><span>中大规模，内存充足</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>IVF_PQ</span></p></td><td style=" vertical-align: top"><p><span>量化压缩，节省内存</span></p></td><td style=" vertical-align: top"><p><span>超大规模，内存受限</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>HNSW</span></p></td><td style=" vertical-align: top"><p><span>速度快、精度高，内存占用高</span></p></td><td style=" vertical-align: top"><p><span>最常用，推荐首选</span></p></td></tr><tr><td style=" vertical-align: top"><p><span>ScaNN</span></p></td><td style=" vertical-align: top"><p><span>Google 出品，优化吞吐量</span></p></td><td style=" vertical-align: top"><p><span>高并发生产环境</span></p></td></tr></tbody></table></div>


<a id="section-0543"></a>
## 主流向量数据库对比

<a id="t-nDgcu723rS9FLmEUftNHGa"></a>

<p id="t-EYdY3isIN0VUwU6cWQgHIo"><span>以下是当前最主流的向量数据库横向对比，帮助你在不同场景下做出选择。</span></p>

<div id="t-WyoqV0Y46APSmDysN11XvE"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/83a9c3dba0bfcac51e92009a.png"/></div>

<blockquote id="t-TXUdrDkWuMFMWQ4Q6HufvT"><p id="t-bv97ZiGJtBU5ZldvMhZMi8"><span style="font-style:italic">新手建议：从 Chroma 或 pgvector 起步，前者适合 AI 应用原型，后者适合已有 PostgreSQL 的项目。</span></p></blockquote>


<a id="section-0544"></a>
## 快速上手：Python 示例

<a id="t-pOUxv3u9Yb3nNxgKrho0nF"></a>

<p id="t-D4x7GRHcvN9jETDsWJkoDU"><span>下面用 Chroma（最易入门）演示完整的增删改查流程。</span></p>


<a id="section-0546"></a>
## 实例

<a id="t-8PzyXiSIecnhamButR0sDM"></a>

<pre id="t-HapEDPVhqYLzGQ0ZIDppF2"><code>pip install chromadb openai</code></pre>


<a id="section-0547"></a>
## 完整示例：构建一个文档语义搜索系统

<a id="t-2BQj6keX9WpLvSnzeTWMlE"></a>

<p id="t-VQ3S1gkCS5Ds5awuV2uUDP"><span>以下代码从头到尾演示了如何使用 Chroma 构建一个基于语义的文档搜索系统。</span></p>


<a id="section-0548"></a>
## 实例

<a id="t-8yGMJXbS32VcEMNTGqCEUL"></a>

<pre id="t-6CgSqM7W0Rr5SNAdv0FAKs"><code>import chromadb
from chromadb.utils import embedding_functions

# ─── 1. 初始化客户端 ───────────────────────────────────────────
# 持久化到本地（推荐）
client = chromadb.PersistentClient(path="./my_vector_db")

# 使用 OpenAI 嵌入模型（也可换成本地模型）
openai_ef = embedding_functions.OpenAIEmbeddingFunction(
    api_key="your-openai-api-key", # 必填：替换为你的 API Key
    model_name="text-embedding-3-small" # 1536 维，性价比高
)

# ─── 2. 创建集合（类似关系库里的"表"）────────────────────────
collection = client.get_or_create_collection(
    name="my_documents", # 集合名称
    embedding_function=openai_ef, # 绑定嵌入函数
    metadata={"hnsw:space": "cosine"} # 使用余弦相似度
)

# ─── 3. 插入文档 ──────────────────────────────────────────────
documents = [
 "Python 是一种面向对象的解释型编程语言，广泛用于数据科学和 AI 开发",
 "机器学习是人工智能的子领域，让计算机从数据中学习规律",
 "深度学习使用多层神经网络，在图像识别和 NLP 任务中表现优异",
 "向量数据库专门存储高维向量，支持语义相似度搜索",
 "PostgreSQL 是功能强大的开源关系型数据库",
 "Redis 是基于内存的高性能键值数据库，常用于缓存",
 "Docker 容器化技术让应用可以在任何环境中一致运行",
 "Git 是分布式版本控制系统，是现代软件开发的基础工具",
]

ids = [f"doc_{i}" for i in range(len(documents))]

# 批量插入（Chroma 自动调用嵌入模型转为向量后存储）
collection.add(
    documents=documents,
    ids=ids,
    metadatas=[{"source": "tutorial", "index": i} for i in range(len(documents))]
)

print(f"已插入 {len(documents)} 条文档")</code></pre>

<pre id="t-LCuXsl6bsm6Oa1gGcubNf5"><code>已插入 8 条文档</code></pre>


<a id="section-0549"></a>
## 实例

<a id="t-zlKtI2T8zdtzkkbW3X5Fwh"></a>

<pre id="t-h6YS1KbfrjjyLTuanK1RjT"><code># ─── 4. 语义搜索 ──────────────────────────────────────────────
query = "如何用 Python 做人工智能"

results = collection.query(
    query_texts=[query],
    n_results=3, # 返回最相似的 3 条
    include=["documents", "distances", "metadatas"]
)

print(f"\n查询：{query}")
print("-" * 50)
for i, (doc, dist) in enumerate(zip(
    results["documents"][0],
    results["distances"][0]
)):
    similarity = 1 - dist   # 余弦距离转相似度
 print(f"第 {i+1} 名（相似度 {similarity:.4f}）：")
 print(f"  {doc}")
 print()</code></pre>

<pre id="t-pAvWloSgwgynkXCIjAPL7q"><code>查询：如何用 Python 做人工智能
--------------------------------------------------
第 1 名（相似度 0.9231）：Python 是一种面向对象的解释型编程语言...
第 2 名（相似度 0.8874）：机器学习是人工智能的子领域...
第 3 名（相似度 0.8612）：深度学习使用多层神经网络...</code></pre>


<a id="section-0550"></a>
## 实例

<a id="t-gtHUPWHH1bH37moKAnHu1s"></a>

<pre id="t-TQ8gZKHXKdsfw93OWw1XUc"><code># ─── 5. 带过滤条件的搜索（元数据过滤）───────────────────────
results_filtered = collection.query(
    query_texts=["数据库技术"],
    n_results=2,
    where={"source": "tutorial"}, # 只在 source=tutorial 的文档里搜索
    include=["documents", "distances"]
)

# ─── 6. 更新文档 ──────────────────────────────────────────────
collection.update(
    ids=["doc_0"],
    documents=["Python 是目前最流行的编程语言，在 AI、数据分析、Web 开发中均有广泛应用"],
    metadatas=[{"source": "tutorial", "index": 0, "updated": True}]
)

# ─── 7. 删除文档 ──────────────────────────────────────────────
collection.delete(ids=["doc_7"]) # 删除 Git 相关文档

# ─── 8. 查看集合统计 ──────────────────────────────────────────
print(f"当前集合文档数：{collection.count()}")</code></pre>


<a id="section-0551"></a>
## 不使用第三方嵌入 API（纯本地）

<a id="t-t0KffLFhOCjE2dJ0T605qU"></a>

<p id="t-tVFGb7LjeVDrp34MAvBTLi"><span style="border-bottom:1px solid">如果你不想使用 OpenAI API，可以用本地嵌入模型完全离线运行。</span></p>


<a id="section-0552"></a>
## 实例

<a id="t-q15miTrGRsAfEsGPcJdBPO"></a>

<pre id="t-0S3JCwYdA3ehILLDC7iCmu"><code>import chromadb
from sentence_transformers import SentenceTransformer

# 使用本地嵌入模型（无需 API Key，完全离线）
model = SentenceTransformer("paraphrase-multilingual-MiniLM-L12-v2") # 支持中文

client = chromadb.Client()
collection = client.create_collection("local_demo")

texts = ["今天天气很好", "阳光明媚，适合出门", "股市大涨了", "明天可能会下雨"]

# 手动生成向量后插入
embeddings = model.encode(texts).tolist()
collection.add(
    embeddings=embeddings,
    documents=texts,
    ids=[f"id_{i}" for i in range(len(texts))]
)

# 查询
query_embedding = model.encode(["今天天气怎么样"]).tolist()
results = collection.query(query_embeddings=query_embedding, n_results=2)
print(results["documents"])
# 输出: [['今天天气很好', '阳光明媚，适合出门']]</code></pre>


<a id="section-0553"></a>
## pgvector 示例（PostgreSQL 用户）

<a id="t-o6zN21ud8oGhnqkHPHSE8j"></a>

<p id="t-g6OhVSZxQk4WSc2SNa72pz"><span style="border-bottom:1px solid">如果你的项目已经使用 PostgreSQL，pgvector 是最轻量的接入方式。</span></p>


<a id="section-0554"></a>
## 实例

<a id="t-EhKV2SDn9DE5KwKfVzDuHC"></a>

<pre id="t-eDmegJTnnSahcjtI8Zmy0I"><code>-- 安装扩展
CREATE EXTENSION IF NOT EXISTS vector;

-- 建表：存储文章标题及其向量（1536维）
CREATE TABLE articles (
 id       SERIAL PRIMARY KEY,
    title    TEXT NOT NULL,
    content  TEXT,
    embedding vector(1536) -- 向量列，1536 维
);

-- 创建 HNSW 索引加速查询
CREATE INDEX ON articles
USING hnsw (embedding vector_cosine_ops)
WITH (m = 16, ef_construction = 64);

-- 插入数据（向量由应用层生成后传入）
INSERT INTO articles (title, embedding)
VALUES ('Python 入门指南', '[0.12, -0.54, 0.87, ...]'::vector);

-- 语义搜索：找最相似的 5 篇文章
SELECT id, title,
 1 - (embedding &lt;=&gt; '[0.10, -0.50, 0.90, ...]'::vector) AS similarity
FROM articles
ORDER BY embedding &lt;=&gt; '[0.10, -0.50, 0.90, ...]'::vector
LIMIT 5;</code></pre>

<blockquote id="t-zR3f73x91CdDOhdVjRtVZB"><p id="t-bCq2SBqzd7OXBSQ6921OCG"><span style="border-bottom:1px solid;font-style:italic">注意：&lt;=&gt; 是 pgvector 提供的向量距离运算符，用于计算余弦距离。用 1 减去余弦距离即得到余弦相似度。</span></p></blockquote>


<a id="section-0555"></a>
## 典型应用场景

<a id="t-GdKxE6yI6QLvP1dHdNJKkB"></a>

<p id="t-YIOkUipAHmmYVPxLNaP4FN"><span style="border-bottom:1px solid">向量数据库在 AI 时代的应用场景非常广泛，以下是六个最典型的场景概览。</span></p>

<div id="t-UbNDARIUjrLLd7M5Em1XOh"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/11da00b0fe8b3b9e9a07d852.png"/></div>


<a id="section-0556"></a>
## RAG（检索增强生成）架构

<a id="t-E5RGN1CZ2pVanNfPMdcVcs"></a>

<p id="t-xnSf1OZ7hfPlRNx27KtAYL"><span style="border-bottom:1px solid">RAG 是目前向量数据库最主要的应用场景之一。下面是其核心工作流程：</span></p>

<div id="t-J8Q09FATypZOPfIdL0CVuN"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/bb7ae87ffb7da6231c9368d7.png"/></div>


<a id="section-0558"></a>
## 选型决策树

<a id="t-6BuzTWzh4AWoQRRh9OGqDE"></a>

<p id="t-Zcly0U0Izhggbb2sOnj97J"><span style="border-bottom:1px solid">根据你的具体情况，按照以下决策树选择合适的向量数据库：</span></p>

<pre id="t-zsGcc8syDuccNqp9iLlHsE"><code>你的情况是什么？
│
├─── 已有 PostgreSQL，且数据量 &lt; 500 万
│    └──&gt; 用 pgvector，无缝集成，零额外运维
│
├─── 做 AI/LLM 应用原型，快速验证
│    └──&gt; 用 Chroma，几行代码跑起来
│
├─── 需要生产级部署，性能优先，数据量 500 万 ~ 1 亿
│    └──&gt; 用 Qdrant，Rust 实现，性能强
│
├─── 超大规模（&gt; 1 亿），有 K8s 运维能力
│    └──&gt; 用 Milvus，分布式，功能最全
│
└─── 团队没有运维能力，愿意付费
     └──&gt; 用 Pinecone 云服务，开箱即用</code></pre>


<a id="section-0559"></a>
## 嵌入模型的选择

<a id="t-ttNN3qdoGPkHqIlr9Kovwl"></a>

<p id="t-hR3KvjHnScKRWrbPrDR9lp"><span style="border-bottom:1px solid">选择合适的嵌入模型是向量数据库应用的关键第一步。</span></p>

<div id="t-U3PahkNq529Pa8qI1O2Ajh"><table><colgroup><col width="252.8975524902344"/><col width="305.0137939453125"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>需求</span></p></td><td style=" vertical-align: top"><p><span>推荐模型</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">中英文文本（高质量）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">OpenAI</span><span style="border-bottom:1px solid;font-weight:bold">text-embedding-3-small</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">中文文本（本地离线）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">BAAI/bge-large-zh-v1.5</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">多语言通用</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;font-weight:bold">paraphrase-multilingual-MiniLM-L12-v2</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">图文多模态</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">OpenAI</span><span style="border-bottom:1px solid;font-weight:bold">CLIP</span><span style="border-bottom:1px solid">系列</span></p></td></tr></tbody></table></div>


<a id="section-0560"></a>
## 性能优化技巧

<a id="t-6TmEZrEftP0ZBLpeKMiDym"></a>

<p id="t-yefUFJ1YjoSAqvKiZn3k6E"><span style="border-bottom:1px solid">1. 批量插入：一次插入多条，避免频繁单条写入。</span></p>


<a id="section-0561"></a>
## 实例

<a id="t-N4SWiFpSaPoFQcDRYksOn2"></a>

<pre id="t-dUma0rAwcKiwrfXN3hZCh1"><code># 推荐：批量插入
collection.add(documents=docs_list, ids=ids_list)

# 不推荐：循环单条（每次都重新索引，效率极低）
# for doc, id in zip(docs_list, ids_list):
#     collection.add(documents=[doc], ids=[id])</code></pre>

<p id="t-VPjoVg58g0A1pUoDZYBXF2"><span style="border-bottom:1px solid">2. 向量归一化：使用余弦相似度前，提前归一化向量可加速计算。</span></p>


<a id="section-0562"></a>
## 实例

<a id="t-m2QPzj6CuRS4TH2XUjLuxO"></a>

<pre id="t-yoX9VlEFl5QhHrawvizKr8"><code>import numpy as np

def normalize(v):
 """对向量做 L2 归一化，使模长为 1"""
 return v / np.linalg.norm(v)</code></pre>

<p id="t-Oi8gyQVaamGIju16Hl7Dno"><span style="border-bottom:1px solid">3. 合理设置 n_results：不要无脑设置很大的 top_k，一般 RAG 场景 3~10 条足够。</span></p>

<p id="t-rirxbGc2ksy0mau0vlfPSN"><span style="border-bottom:1px solid">4. 善用元数据过滤：在搜索时配合 where 条件，缩小搜索范围。</span></p>


<a id="section-0563"></a>
## 实例

<a id="t-dV8mz1AnVBwmjDYwOd58SQ"></a>

<pre id="t-LD4uY1FHAoAuNlZQJvwhd8"><code># 只在"技术文档"分类里搜索，缩小范围提升精度
collection.query(
    query_texts=["Python 异常处理"],
    where={"category": "tech_doc"},
    n_results=5
)</code></pre>

<p id="t-otbg9aoY6U3YLQqpoStwJE"><span style="border-bottom:1px solid">5. 定期重建索引：数据量增长后，适时重建 HNSW 索引以维持查询性能。</span></p>


<a id="section-0564"></a>
## 常见踩坑

<a id="t-3W7rSSwGSjEd7ra5I201AA"></a>

<p id="t-ByZpSxgQiYEBNhWe8Azqrm"><span style="border-bottom:1px solid">以下是初学者使用向量数据库时最容易遇到的问题及解决方案。</span></p>

<div id="t-v2IfEuek0ruurfiUIYa6aC"><table><colgroup><col width="143.89755249023438"/><col width="245.0137939453125"/><col width="206.005126953125"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>问题</span></p></td><td style=" vertical-align: top"><p><span>说明</span></p></td><td style=" vertical-align: top"><p><span>解决方案</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">嵌入模型要统一</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">插入和查询必须用同一个模型</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">在配置文件中固定模型版本</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">维度不匹配</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">换了模型但没重建集合</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">换模型时删除重建集合</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">文本过长</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">大多数模型有 token 限制（512~8192）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">超长文本先分块（chunking）</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">相似度不准确</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">文本没有分块，语义被稀释</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">按段落或固定长度切分文档</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">冷启动慢</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">数据量大时首次加载索引耗时</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">提前预热，或使用持久索引</span></p></td></tr></tbody></table></div>


<a id="section-0565"></a>
## 总结

<a id="t-Y5RXS6Q0LDMQbf0jIGxt8Y"></a>

<p id="t-XODVDdd7K2S61x6ggjtZ0m"><span style="border-bottom:1px solid">让我们回顾本教程的核心知识点：</span></p>

<div id="t-sgsM4lcCS3NhrDY9anUGZk"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/ccc562b218a9ef0b9b18e24e.png"/></div>

<p id="t-FwBtSjiB0XJNYgaRhhKuSp"><span style="border-bottom:1px solid">向量数据库是 AI 时代基础设施的重要一环。</span></p>

<p id="t-w9GlrN4Wj0C9eru3AVWj6t"><span style="border-bottom:1px solid">它解决了传统数据库无法处理的语义相似性搜索问题，是构建 RAG 系统、推荐系统、多模态搜索的核心组件。</span></p>


<a id="section-0566"></a>
## 学习路径建议

<a id="t-XscKxgKb4egeOgSUVGZWMZ"></a>

<ol start="1"><li id="t-u9xok1vng4NlQs0ofX8FqH"><span>第一步：理解向量和嵌入的概念，运行本文的 Chroma 示例</span></li></ol>

<ol start="2"><li id="t-eQKbli08ub5dJBSuwHkZ3N"><span>第二步：尝试用 LangChain + Chroma 构建一个简单的文档问答系统</span></li></ol>

<ol start="3"><li id="t-f4obbXqwvqXgS0v7dh85rL"><span>第三步：学习 HNSW 等索引算法，理解精度与速度的权衡</span></li></ol>

<ol start="4"><li id="t-IKLVxXfVgpmy3oDga9FO2p"><span>第四步：根据实际项目需求，选择合适的向量数据库并在生产环境部署</span></li></ol>


<a id="section-0567"></a>
## 参考资源

<a id="t-ZDMkwwYiOzOhCmsEuSyIfu"></a>

<ul><li id="t-bFehT2LHdOCeiBgFk5Zr8O"><span style="border-bottom:1px solid">Chroma 官方文档</span></li></ul>

<ul><li id="t-jpcRTVVs4l3euc9JhGG33q"><span style="border-bottom:1px solid">Qdrant 官方文档</span></li></ul>

<ul><li id="t-EVTbMPNGTJ2FNM9AA5D2BK"><span style="border-bottom:1px solid">pgvector GitHub</span></li></ul>

<ul><li id="t-O9zHD6FLgPX2dGAlMxxNPX"><span style="border-bottom:1px solid">Milvus 官方文档</span></li></ul>

<ul><li id="t-ajgKzqdfHv4eWFYLwN293V"><span style="border-bottom:1px solid">HNSW 论文原文</span></li></ul>

<ul><li id="t-sJNIL93SctPLuzWHas3ITf"><span style="border-bottom:1px solid">OpenAI Embeddings 指南</span></li></ul>

<ul><li id="t-KlL6YnjsEivhiDJqMOiPB5"><span style="border-bottom:1px solid">HuggingFace 文本嵌入排行榜（MTEB）</span></li></ul>


<a id="section-2053"></a>
## GraphRAG 入门教程

<a id="t-block-24431"></a>

<p id="t-nOySZxUlgUYyk1V1IadJAC"><span style="border-bottom:1px solid">GraphRAG 是微软研究院开源的一种结构化、层次化的检索增强生成（RAG）系统，与传统 RAG 使用纯文本向量检索不同，GraphRAG 先用大模型从原始文档中抽取出实体和关系，构建知识图谱，再基于图结构进行检索和问答。</span></p>

<p id="t-QLjmO6q0ppg1muRuzHDgnE"><span style="border-bottom:1px solid">本教程面向零基础读者，带你从安装开始，完整走完</span><span style="border-bottom:1px solid;font-weight:bold">文档 → 知识图谱 → 查询问答</span><span style="border-bottom:1px solid">的全流程，模型使用</span><span style="border-bottom:1px solid;font-weight:bold">qwen-plus</span><span style="border-bottom:1px solid">，Embedding 使用阿里云通义的</span><span style="border-bottom:1px solid;font-weight:bold">text-embedding-v4</span><span style="border-bottom:1px solid">。</span></p>

<div id="t-u8EOIXhJIgnodqzSvj3sUh"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/91f13c4f1dd2ab7568cf36f8.webp"/></div>


<a id="section-2054"></a>
## 什么是 GraphRAG

<a id="t-fySGg1uqoXwRnpvfZTQLeN"></a>

<p id="t-EtJQp7qKWpL9M09RYrNyDu"><span style="border-bottom:1px solid">要理解 GraphRAG，先要理解它比传统 RAG 好在哪里。</span></p>


<a id="section-2055"></a>
## 传统 RAG 的局限

<a id="t-AIV7Nup2K9ulwjcUCinIIM"></a>

<p id="t-uLqQtNOeLPkUhzquVHKbTy"><span style="border-bottom:1px solid">传统 RAG（Baseline RAG）的工作流程是：将文档切成小块 → 生成向量 → 问题来了时用向量相似度检索最相关的几块 → 送给模型生成答案。这个方案对"精确检索"类问题效果不错，但在两类场景下表现较差：</span></p>

<ul><li id="t-7AZ32v3n2SZ0XSzr4LKbEY"><span style="border-bottom:1px solid;font-weight:bold">跨文档关联推理</span><span>：当答案需要把分散在不同文档里的信息串联起来时，向量相似度无法表达这种"关系"。例如"A 公司的 CEO 和 B 公司的创始人有什么交集？"</span></li></ul>

<ul><li id="t-oK9BOUgJZWgo5iXfpNeYnj"><span style="border-bottom:1px solid;font-weight:bold">全局性摘要问题</span><span>：当问题要求对整个语料库做宏观总结时，几块文本片段根本无法覆盖全貌。例如"这批财报文件里最核心的风险点是什么？"</span></li></ul>


<a id="section-2056"></a>
## GraphRAG 如何解决这两个问题

<a id="t-zgwjXv79fi1J2Ev3TaN1uo"></a>

<p id="t-xMzq5ZDhtmM71x4q0ngm2Y"><span style="border-bottom:1px solid">GraphRAG 的核心思路是：</span><span style="border-bottom:1px solid;font-weight:bold">不直接检索文本块，而是先建立一张知识图谱，再基于图结构检索</span><span style="border-bottom:1px solid">。</span></p>

<p id="t-jg8UMVyfd0CkLzERhOrPSI"><span style="border-bottom:1px solid">整个过程分为两个阶段：</span></p>

<div id="t-Xy2KMUjqOn0xNSFs7l71Xw"><table><colgroup><col width="120"/><col width="385.9044799804687"/><col width="161.00518798828125"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>阶段</span></p></td><td style=" vertical-align: top"><p><span>做什么</span></p></td><td style=" vertical-align: top"><p><span>输出什么</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">索引（Index）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">用 LLM 读取文档，抽取实体（人、地点、组织等）和关系，构建知识图谱；再用 Leiden 算法对图进行层次聚类，为每个社区生成摘要</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">知识图谱 + 社区摘要 + 向量索引</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">查询（Query）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">用户提问时，根据问题类型选择不同检索策略，将图谱数据、社区摘要、原始文本片段一起注入 LLM 上下文，生成答案</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">带来源依据的结构化回答</span></p></td></tr></tbody></table></div>

<blockquote id="t-StqnsF6K8rjJlGQgPXZPqf"><p id="t-KrFi4AAYfu6PzFH2iUaCzM"><span style="border-bottom:1px solid;font-style:italic">GraphRAG 的索引阶段需要调用大量 LLM API，对每一段文本都做实体抽取和摘要，</span><span style="border-bottom:1px solid;font-style:italic;font-weight:bold">Token 消耗远高于传统 RAG</span><span style="border-bottom:1px solid;font-style:italic">。建议初次使用时先用小文档（几千字以内）测试流程，确认无误后再处理大规模语料。</span></p></blockquote>


<a id="section-2057"></a>
## 四种查询模式对比

<a id="t-DDiatnoNY00pO2HucqUdre"></a>

<div id="t-C9JgyN1Wy8ue3Hc6IMjcVL"><table><colgroup><col width="93.8992919921875"/><col width="178.00689697265625"/><col width="255.01904296875"/><col width="120"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>查询模式</span></p></td><td style=" vertical-align: top"><p><span>检索策略</span></p></td><td style=" vertical-align: top"><p><span>适合的问题类型</span></p></td><td style=" vertical-align: top"><p><span>资源消耗</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Global Search</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Map-Reduce 遍历所有社区摘要</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">全局性、总结性问题，如"这批文档的核心主题是什么"</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">高（并发调用多次 LLM）</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Local Search</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">从相关实体出发，扩展邻居和关联文本</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">针对特定实体的问题，如"某人物的主要关系网络"</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">中</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid;background-color:#eafaf1">DRIFT Search</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Local Search + 社区信息引导的迭代追问</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">需要宽广上下文的实体相关问题，兼顾深度与广度</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">中高</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Basic Search</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">标准向量相似度（与传统 RAG 相同）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">简单的精确检索，用于对比效果</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">低</span></p></td></tr></tbody></table></div>


<a id="section-2058"></a>
## 环境要求

<a id="t-vZ29AXtFVDST5Gdf1USyWy"></a>

<p id="t-K9kGn7JyEfNzztH4f4c5vZ"><span style="border-bottom:1px solid">在开始之前，请确认你的环境满足以下条件。</span></p>

<div id="t-LBP49w1T7klKLfsn4KLHaj"><table><colgroup><col width="180.8992919921875"/><col width="120"/><col width="336.8992919921875"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>依赖</span></p></td><td style=" vertical-align: top"><p><span>版本要求</span></p></td><td style=" vertical-align: top"><p><span>说明</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Python</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">3.10 ~ 3.12</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">官方支持范围，3.13 暂不支持</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">pip</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">最新版</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">建议先</span><span style="border-bottom:1px solid">pip install --upgrade pip</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">阿里云百炼 API Key</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">—</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">在</span><span style="border-bottom:1px solid">bailian.console.aliyun.com/</span><span style="border-bottom:1px solid">申请</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">磁盘空间</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">≥ 2GB</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">索引产物（Parquet 文件、向量库）会占用较多空间</span></p></td></tr></tbody></table></div>


<a id="section-2059"></a>
## 安装

<a id="t-OBTmWs7jNV3aRIYOfzuIGn"></a>

<p id="t-TThz52gXvIVqz7qhDymwfm"><span style="border-bottom:1px solid">GraphRAG 发布在 PyPI，建议在 Python 虚拟环境中安装，避免污染系统环境。</span></p>


<a id="section-2060"></a>
## 创建项目目录并初始化虚拟环境

<a id="t-Rs8SJDQkGZhy6X3anjPEJH"></a>

<pre id="t-64RrXtR63KV7SYxSJiN72D"><code>mkdir graphrag_demo
cd graphrag_demo
python -m venv .venv</code></pre>

<blockquote id="t-gdeJAzxZq5PVTwhIYwVtL7"><p id="t-oprd6ZoGp9PWzxxfmoOjGK"><span style="border-bottom:1px solid">也可以使用</span><span style="border-bottom:1px solid">uv 命令</span><span style="border-bottom:1px solid">来指定 Python 版本：</span><span style="border-bottom:1px solid">uv venv </span><span style="border-bottom:1px solid">--</span><span style="border-bottom:1px solid">python </span><span style="border-bottom:1px solid">3.12</span></p></blockquote>


<a id="section-2061"></a>
## 激活虚拟环境

<a id="t-qScNQ7RqQc7VnEO21NvI1v"></a>

<p id="t-Ss2PJPwEKRohrnKm0tlWgm"><span style="border-bottom:1px solid">macOS / Linux：</span></p>

<pre id="t-3RupJRLi1HbJkn8hnaKVEJ"><code>source .venv/bin/activate</code></pre>

<p id="t-YQCpnReh90Z7PPwIHUC9eU"><span style="border-bottom:1px solid">Windows：</span></p>

<pre id="t-Xlg1UuQI8jkNBeH8K9l2N2"><code>.venv\Scripts\activate</code></pre>


<a id="section-2062"></a>
## 安装 GraphRAG

<a id="t-y1zjm84Cu4ddf2FwhBEGUO"></a>

<pre id="t-W0n8VhSMXOKJghgKfOsUPM"><code>pip install graphrag</code></pre>

<p id="t-UWYnZm6lIMcJld6iAdK1e9"><span style="border-bottom:1px solid">安装完成后验证：</span></p>

<pre id="t-1Z2CKMCzq8rSyRQDNd4o31"><code>graphrag --help</code></pre>

<p id="t-NHZcQn7jG18v3HZXX27Ivo"><span style="border-bottom:1px solid">会输出一些</span><span style="border-bottom:1px solid;font-weight:bold">graphrag</span><span style="border-bottom:1px solid">命令信息，输出类似：</span></p>

<div id="t-3l1Qz38sZNDQOeVosZ7CV8"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/b6074b19db0e290940b464da.png"/></div>

<blockquote id="t-EduDx7wx3UIA4R276XHIC2"><p id="t-Kr45LDWYcKAVQlfH0yRVVx"><span style="border-bottom:1px solid;font-style:italic">GraphRAG 会自动安装 LiteLLM、LanceDB、pandas、numpy 等依赖。首次安装时间较长（通常 1~3 分钟），请耐心等待。</span></p></blockquote>


<a id="section-2063"></a>
## 初始化工作区

<a id="t-hlDNzqnE3D6oTQDdkGvslP"></a>

<p id="t-JvKApOIZpRvEVJfHZ81f7f"><span style="border-bottom:1px solid">运行</span><span style="border-bottom:1px solid">graphrag init</span><span style="border-bottom:1px solid">命令，GraphRAG 会在当前目录生成配置文件和目录结构。</span></p>

<pre id="t-AKhN8MyWlp7QoOqJo0xFy5"><code>graphrag init</code></pre>

<p id="t-ef9GYJmCyiFtc3KtFb3MRn"><span style="border-bottom:1px solid">会提示我们设置模型，直接回车默认就好了，后面再修改：</span></p>

<pre id="t-AAdfgLaEa5t4ErZpYla5vj"><code>Specify the default chat model to use [gpt-4.1]: 
Specify the default embedding model to use [text-embedding-3-large]:</code></pre>

<p id="t-2ecZscqd3yJK2GIjWclZIn"><span style="border-bottom:1px solid">初始化时会提示你输入默认的 Chat 模型和 Embedding 模型，可以暂时直接按 Enter 跳过，后面我们会手动修改</span><span style="border-bottom:1px solid">settings.yaml</span><span style="border-bottom:1px solid">。</span></p>

<p id="t-IQl18BxyNMzEEaInysb3tl"><span style="border-bottom:1px solid">初始化完成后，目录结构如下：</span></p>

<pre id="t-u0nDh9MbBZwrMPoMGizF9J"><code>graphrag_demo/
├── .env                  # 存放 API Key 环境变量
├── settings.yaml         # 核心配置文件
├── input/                # 存放待处理的文本文件
├── output/               # 索引产物输出目录（自动生成）
└── prompts/              # Prompt 模板目录（自动生成）</code></pre>

<blockquote id="t-AWh5QjdGQdJ5jbxhJefRVZ"><p id="t-avvguaCGpcW5BDtWMnkmJZ"><span style="border-bottom:1px solid;font-style:italic">每次升级 GraphRAG 小版本后，建议重新运行</span><span style="border-bottom:1px solid;font-style:italic">graphrag init --force</span><span style="border-bottom:1px solid;font-style:italic">刷新配置格式，否则可能因配置结构变更导致运行报错。注意该命令会覆盖现有的</span><span style="border-bottom:1px solid;font-style:italic">settings.yaml</span><span style="border-bottom:1px solid;font-style:italic">和 prompts，建议先备份。</span></p></blockquote>


<a id="section-2064"></a>
## 准备测试文档

<a id="t-Du3FUK0wv6VyImspBZvg1K"></a>

<p id="t-cMlCJSqPhmEKZ53CCLR3Hz"><span style="border-bottom:1px solid">GraphRAG 支持</span><span style="border-bottom:1px solid">.txt</span><span style="border-bottom:1px solid">、</span><span style="border-bottom:1px solid">.csv</span><span style="border-bottom:1px solid">、</span><span style="border-bottom:1px solid">.json</span><span style="border-bottom:1px solid">格式的文档，所有待处理文件放在</span><span style="border-bottom:1px solid">input/</span><span style="border-bottom:1px solid">目录下。</span></p>

<p id="t-DnSFUq1AG5POLMMZsBI5nl"><span style="border-bottom:1px solid">我们使用官方推荐的测试文档——查尔斯·狄更斯的《圣诞颂歌》，直接从 Project Gutenberg 下载：</span></p>

<pre id="t-rjILvMLpcRxfspmXVYFS6K"><code>curl https://static.jyshare.com/download/pg24022.txt -o ./input/book.txt</code></pre>

<p id="t-oBpFkAdlP7tvjwmWKD8UKI"><span style="border-bottom:1px solid">如果网络不通，也可以自己创建一个中文测试文本，内容越丰富（含大量人物、地点、事件关系），GraphRAG 的知识图谱效果越明显：</span></p>

<p id="t-NVSDfl9AAIqD0EfCSt6pnk"><span style="border-bottom:1px solid">文件放在</span><span style="border-bottom:1px solid;font-weight:bold">input</span><span style="border-bottom:1px solid">目录下，文件名为</span><span style="border-bottom:1px solid;font-weight:bold">demo.txt</span><span style="border-bottom:1px solid">：</span></p>

<pre id="t-d1sBW03z2rcHXj35WRIeoQ"><code>SpaceX 太空探索技术公司成立于 2002 年，由埃隆·马斯克（Elon Musk）在美国加利福尼亚州霍桑市创办。
公司目标是大幅降低太空运输成本，最终实现人类移民火星。

马斯克早年联合创立了 PayPal，2002 年以 15 亿美元出售给 eBay，随后将个人资产投入 SpaceX。
联合创始人中，汤姆·穆勒（Tom Mueller）担任推进系统首席设计师，主导了 Merlin 和 Raptor 发动机的研发。
格温·肖特维尔（Gwynne Shotwell）于 2002 年加入，2008 年起担任总裁兼 COO，负责公司日常运营和商业拓展。

2008 年，猎鹰 1 号（Falcon 1）在经历三次失败后首次成功入轨，成为首个由私营公司研制的液体轨道火箭。
2010 年，猎鹰 9 号（Falcon 9）首飞成功，同年龙飞船（Dragon）完成首次商业发射与回收。
2012 年，龙飞船成为首个对接国际空间站的商业航天器。

2015 年 12 月，猎鹰 9 号一级火箭首次实现陆地垂直回收，开创了火箭重复使用的新纪元。
此后 SpaceX 累计完成超过 200 次火箭回收，单枚助推器最高复用次数达到 20 次以上。

2020 年，载人龙飞船（Crew Dragon）将 NASA 宇航员送入国际空间站，标志着商业载人航天时代的开始。
Starlink 星链项目自 2019 年启动，截至 2024 年已在轨部署超过 5000 颗卫星，覆盖全球超过 60 个国家和地区。

Starship 星舰是 SpaceX 正在研发的超重型运载系统，由超重助推器（Super Heavy）和星舰飞船组成，
设计目标为完全可重复使用，近地轨道运力超过 100 吨，是 NASA 阿尔忒弥斯登月计划的指定着陆器。

竞争对手方面，SpaceX 主要面临来自蓝色起源（Blue Origin）和联合发射联盟（ULA）的压力。
蓝色起源由亚马逊创始人杰夫·贝索斯创立，专注亚轨道旅游和重型火箭 New Glenn 的研发。
ULA 由洛克希德·马丁和波音合资成立，长期承担美国军方卫星发射任务。</code></pre>

<div id="t-Tk7II5Dvr8RGrJGuFendHF"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/437d11e33079f9095c630c51.png"/></div>


<a id="section-2065"></a>
## 配置 qwen-plus 与 Embedding 模型

<a id="t-dtl2WmH769jrgmGKPyNOsE"></a>

<p id="t-BbdiDbJaqR1a142swV1nBT"><span style="border-bottom:1px solid">这是整个教程最关键的步骤，需要修改</span><span style="border-bottom:1px solid">.env</span><span style="border-bottom:1px solid">和</span><span style="border-bottom:1px solid">settings.yaml</span><span style="border-bottom:1px solid">两个文件。</span></p>


<a id="section-2066"></a>
## 第一步：配置 API Key

<a id="t-OI4ev6ZvjyXvnr70h5Rbhi"></a>

<p id="t-cgbr4ICtj0QOHjCvPtiPAh"><span style="border-bottom:1px solid">打开</span><span style="border-bottom:1px solid">.env</span><span style="border-bottom:1px solid">文件，填入你的 API Key：</span></p>


<a id="section-2067"></a>
## 实例

<a id="t-yzVFQmEum33R2wTXSohi5B"></a>

<pre id="t-di7meeGdzZ80P2dAMKi6In"><code># 文件路径：.env

# 阿里云百炼 API Key
DASHSCOPE_API_KEY=sk-your-dashscope-api-key-here</code></pre>


<a id="section-2068"></a>
## 第二步：修改 settings.yaml

<a id="t-vLrgGBk9v5oZVcONcr2lkF"></a>

<p id="t-Dgkn2QrGCMQlRxJznLuGDW"><span style="border-bottom:1px solid">打开</span><span style="border-bottom:1px solid">settings.yaml</span><span style="border-bottom:1px solid">，将整个内容替换为以下配置。</span></p>

<p id="t-RcjHixi6qTzQ1y52spA1NC"><span style="border-bottom:1px solid">GraphRAG 2.x 使用 LiteLLM 统一调用各家模型，</span><span style="border-bottom:1px solid;font-weight:bold">model_provider: openai</span><span style="border-bottom:1px solid">配合</span><span style="border-bottom:1px solid">api_base</span><span style="border-bottom:1px solid">即可将请求转发到任意 OpenAI 兼容接口：</span></p>

<pre id="t-m2MeS4dlqloObTrF4AGTki"><code>completion_models:
  default_completion_model:
    model_provider: openai
    model: qwen-plus                              # 中文抽取稳定，成本低于 qwen-plus
    auth_method: api_key
    api_key: ${DASHSCOPE_API_KEY}
    api_base: https://dashscope.aliyuncs.com/compatible-mode/v1
    call_args:
      temperature: 0                              # 提高结构化稳定性
      max_tokens: 4096
    retry:
      type: exponential_backoff
      max_retries: 5
      base_delay: 2

embedding_models:
  default_embedding_model:
    model_provider: openai
    model: text-embedding-v4                      # 通义向量模型
    auth_method: api_key
    api_key: ${DASHSCOPE_API_KEY}
    api_base: https://dashscope.aliyuncs.com/compatible-mode/v1
    retry:
      type: exponential_backoff
      max_retries: 5

input:
  type: text

input_storage:
  type: file
  base_dir: input

chunking:
  type: tokens
  size: 600                                       # 中文推荐 500~800
  overlap: 100
  encoding_model: o200k_base

output_storage:
  type: file
  base_dir: output

reporting:
  type: file
  base_dir: logs

cache:
  type: json
  storage:
    type: file
    base_dir: cache

vector_store:
  type: lancedb
  db_uri: output/lancedb

embed_text:
  embedding_model_id: default_embedding_model    # 注意不要带逗号
  batch_size: 10                                 # 百炼 embedding 单次最多10条
  batch_max_tokens: 6000
  concurrency: 1                                 # 避免并发触发限流

extract_graph:
  completion_model_id: default_completion_model
  entity_types: []                               # 自动识别实体
  max_gleanings: 3                               # 提高关系补抽成功率

summarize_descriptions:
  completion_model_id: default_completion_model
  max_length: 500

cluster_graph:
  max_cluster_size: 20                           # 降低社区数量

extract_claims:
  enabled: false

community_reports:
  completion_model_id: default_completion_model
  max_length: 1500
  max_input_length: 4000                         # 防止生成阶段过慢

snapshots:
  graphml: true                                  # 导出图结构
  embeddings: false

local_search:
  completion_model_id: default_completion_model
  embedding_model_id: default_embedding_model
  top_k_entities: 10

global_search:
  completion_model_id: default_completion_model
  map_max_length: 500
  reduce_max_length: 1500</code></pre>

<blockquote id="t-aMP4aRi9FpaLqTSQu7WyrZ"><p id="t-wPEDikMTCZ0IUbdUqsTf5P"><span style="border-bottom:1px solid;font-style:italic;font-weight:bold">关于 Qwen 的 JSON 输出：</span><span style="border-bottom:1px solid;font-style:italic">GraphRAG 在实体抽取阶段需要模型稳定返回 JSON 格式。Qwen 支持 JSON 模式，将</span><span style="border-bottom:1px solid;font-style:italic">temperature</span><span style="border-bottom:1px solid;font-style:italic">设为 0 可以进一步提高输出稳定性，减少解析失败的概率。如果仍然出现 JSON 解析错误，可以尝试在</span><span style="border-bottom:1px solid;font-style:italic">call_args</span><span style="border-bottom:1px solid;font-style:italic">中添加</span><span style="border-bottom:1px solid;font-style:italic">response_format: {type: json_object}</span><span style="border-bottom:1px solid;font-style:italic">。</span></p></blockquote>


<a id="section-2069"></a>
## 开始索引

<a id="t-SSesnILNRJXDy2ZyF9m2Dq"></a>

<p id="t-WZvRpGi29YibG0xfD4ey9z"><span style="border-bottom:1px solid">配置完成后，运行索引命令，GraphRAG 会自动读取</span><span style="border-bottom:1px solid">input/</span><span style="border-bottom:1px solid">目录下的所有文件，调用 qwen-plus 进行实体抽取、关系识别、摘要生成，最终构建完整的知识图谱。</span></p>

<pre id="t-CvD1g21rkoh4wE76XSbiCN"><code>graphrag index</code></pre>

<p id="t-m3GHy15F55PGDJBS9B7FcR"><span style="border-bottom:1px solid">你会看到类似如下的进度输出：</span></p>

<pre id="t-VMj2hTaKL6qRu7wxkjomB2"><code>⠹ GraphRAG Indexer
├── Loading Input (text) - 1 files loaded
├── create_base_text_units
├── extract_graph
│   └── Entity Extraction: 100%|████████████| 12/12 [02:34&lt;00:00]
├── summarize_descriptions
├── cluster_graph
├── community_reports
└── generate_text_embeddings
All workflows completed successfully.</code></pre>

<p id="t-Pgi65wyswWcUUKShjRFci7"><span style="border-bottom:1px solid">索引完成后，</span><span style="border-bottom:1px solid">output/</span><span style="border-bottom:1px solid">目录下会生成一系列 Parquet 文件：</span></p>

<div id="t-76dSe0JBTUIv6GYmYaPtO4"><table><colgroup><col width="241.9010009765625"/><col width="405.001708984375"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>文件</span></p></td><td style=" vertical-align: top"><p><span>内容</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">entities.parquet</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">所有抽取出的实体（名称、类型、描述、向量）</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">relationships.parquet</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">实体间的关系（源实体、目标实体、关系描述、权重）</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">communities.parquet</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Leiden 聚类生成的社区（层次结构）</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">community_reports.parquet</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">每个社区的摘要报告（Global Search 的核心数据）</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">text_units.parquet</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">原始文本块（Local Search 的参考来源）</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">lancedb/</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">向量数据库，存储各类实体和文本块的向量</span></p></td></tr></tbody></table></div>

<blockquote id="t-piNPeBOO8qNwz4B4CMhyCw"><p id="t-ZDr6QJn5gMLE6eePWuDokQ"><span style="border-bottom:1px solid;font-style:italic;font-weight:bold">索引时间参考：</span><span style="border-bottom:1px solid;font-style:italic">对于一篇几千字的中文文档（约 10~20 个文本块），使用 qwen-plus 大约需要 3~10 分钟；对于 10 万字以上的大型文档集，可能需要数小时。建议先用小文档跑通流程，再处理大规模数据。</span></p></blockquote>


<a id="section-2070"></a>
## 执行查询

<a id="t-ZwV28wYvdUaGmu0alcJ0KH"></a>

<p id="t-QeJKu4b8lWHtkB3DLfvFuO"><span style="border-bottom:1px solid">索引完成后，就可以对知识图谱进行查询了。GraphRAG 提供 CLI 和 Python API 两种方式。</span></p>


<a id="section-2071"></a>
## CLI 查询

<a id="t-KgZ4E7BFIBv03oTleKPTLp"></a>

<p id="t-Vdk2aHVHH7yD3lFmVeaW2p"><span style="border-bottom:1px solid">全局搜索（适合宏观性问题）：</span></p>

<pre id="t-mAC1Yp3zQmNISoVKEr92q5"><code>graphrag query "文档中涉及的主要组织和人物有哪些？它们之间有什么关系？"</code></pre>

<p id="t-F8mMhORwXEwHd5kh2Dc6iq"><span style="border-bottom:1px solid">本地搜索（适合针对特定实体的问题），加</span><span style="border-bottom:1px solid">--method local</span><span style="border-bottom:1px solid">：</span></p>

<pre id="t-pA2MYL2gRioYlCwjnoR4Dy"><code>graphrag query "SpaceX 公司的主要业务和合作伙伴有哪些？" --method local</code></pre>

<p id="t-6B4tLBR33KVfxbOwv40smy"><span style="border-bottom:1px solid">DRIFT 搜索（兼顾深度与广度）：</span></p>

<pre id="t-buqaSX11XWw0E2DL3K6iRe"><code>graphrag query "埃隆·马斯克的职业背景和主要贡献是什么？" --method drift</code></pre>

<p id="t-Me16Rx6uZ9bFdwpzfTKp1p"><span style="border-bottom:1px solid">基础向量搜索（与传统 RAG 对比）：</span></p>

<pre id="t-Aasu7LkiGkzYbqVydzoQEu"><code>graphrag query "Starship 星舰的设计目标和能力是什么？" --method basic</code></pre>


<a id="section-2072"></a>
## Python API 查询

<a id="t-RUK22PPjx2hrfCxhwZdNgA"></a>

<p id="t-GlY0bcXFLc5dXE40QhAdXp"><span style="border-bottom:1px solid">在代码中调用 GraphRAG 查询，适合集成到应用程序中。</span></p>


<a id="section-2073"></a>
## 实例

<a id="t-GAPQHKcoSmJ3SRmR5Eac2T"></a>

<pre id="t-fYMg482MmO5ejLSdQEXOKp"><code># 文件路径：query_demo.py
# 使用 GraphRAG Python API 进行查询

import asyncio
from graphrag.api import GraphRagConfig, search

async def run_query():
 # 加载配置文件（从当前目录读取 settings.yaml）
    config = GraphRagConfig.from_yaml("settings.yaml")

 # ── 全局搜索示例 ──────────────────────────────
 print("=" * 60)
 print("【Global Search】全局性问题")
 print("=" * 60)

    global_result = await search(
        config=config,
        query="文档中涉及的主要公司和人物关系网络是怎样的？",
        method="global", # 使用 Global Search
 )
 print(global_result.response)
 print()

 # ── 本地搜索示例 ──────────────────────────────
 print("=" * 60)
 print("【Local Search】针对特定实体的问题")
 print("=" * 60)

    local_result = await search(
        config=config,
        query="SpaceX 公司的创始团队背景和主要产品是什么？",
        method="local", # 使用 Local Search
 )
 print(local_result.response)
 print()

 # 查看检索到的来源信息（可选）
 if hasattr(local_result, "context_data"):
        entities = local_result.context_data.get("entities", [])
 print(f"检索到相关实体数量：{len(entities)}")

if __name__ == "__main__":
    asyncio.run(run_query())</code></pre>

<pre id="t-GzvieP6a3b2AJMvrcFwALX"><code>python query_demo.py</code></pre>

<pre id="t-iSdSRqyJahBYTrN7WTDLrI"><code>============================================================
【Global Search】全局性问题
============================================================
根据文档内容，主要涉及以下公司和人物关系网络：

**公司层面：**
- SpaceX 公司：主要角色，覆盖商业发射、载人航天、卫星互联网三大方向
- NASA：重要合作伙伴，阿尔忒弥斯登月计划 Starship 着陆器供应商
- 蓝色起源 / 联合发射联盟：主要竞争对手

**人物层面：**
- 马斯克（创始人）：PayPal 联合创始人，SpaceX CEO 兼首席工程师
- 汤姆·穆勒（联合创始人）：推进系统首席设计师，Merlin 和 Raptor 发动机之父
- 格温·肖特维尔：总裁兼 COO，负责公司商业运营

**关键关系：**
SpaceX 与 NASA 于 2020 年建立战略合作关系，
三家公司（SpaceX、蓝色起源、ULA）在商业航天发射市场形成竞争格局...

============================================================
【Local Search】针对特定实体的问题
============================================================
SpaceX 公司成立于 2002 年，创始团队包括：
- 马斯克：PayPal 联合创始人，SpaceX CEO 兼首席工程师，航天领域超二十年经验
- 汤姆·穆勒：推进系统首席设计师，主导 Merlin 和 Raptor 发动机研发

主要产品：
1. 猎鹰 9 号：全球首个实现垂直回收的轨道级火箭，已完成 200 次以上回收
2. Starship 星舰：超重型运载系统，近地轨道运力超 100 吨，完全可重复使用

检索到相关实体数量：12</code></pre>


<a id="section-2074"></a>
## Prompt 自动调优

<a id="t-A3izEAHCEn4NQjX6uXfoqi"></a>

<p id="t-WCa3XgPh3Qbii8Q12fsb7E"><span style="border-bottom:1px solid">GraphRAG 官方强烈建议在处理自己的数据前，先运行 Prompt 自动调优。</span></p>

<p id="t-JukekUSbmDAs9mN92uVUGH"><span style="border-bottom:1px solid">自动调优会让 LLM 读取你的部分文档，然后生成针对你的数据领域定制化的实体抽取 Prompt，使知识图谱构建质量更高。</span></p>

<pre id="t-g2rOqme6YAvfE37JQxB4hC"><code>graphrag prompt-tune --config settings.yaml --root . --language Chinese</code></pre>

<p id="t-MFXojct7QAlZTVeUYSfhX3"><span style="border-bottom:1px solid">调优完成后，</span><span style="border-bottom:1px solid">prompts/</span><span style="border-bottom:1px solid">目录下的 Prompt 文件会被自动更新。如果你的文档是中文的，加上</span><span style="border-bottom:1px solid">--language Chinese</span><span style="border-bottom:1px solid">参数可以让生成的 Prompt 也使用中文，提升中文实体抽取准确率。</span></p>

<blockquote id="t-ADF6WZ8kxeupURdBmMdh1r"><blockquote id="t-rFonxTZ4PZtDOX4GN7ptmM"><span style="border-bottom:1px solid;font-style:italic">Prompt 调优本身也会消耗 LLM Token（大约相当于对少量文档做一次快速索引），建议每次更换数据集时重新调优一次，而不是一直使用默认 Prompt。</span></blockquote></blockquote>


<a id="section-2075"></a>
## 常用 CLI 命令速查

<a id="t-DMqfx2Nmj5uRsLxQvHjJgY"></a>

<p id="t-eX5KMRaJHIPplTG5kZtwTF"><span style="border-bottom:1px solid">以下是 GraphRAG 日常使用中最常用的命令。</span></p>

<div id="t-kcYBtQebZFeb3l1sKuMf4g"><table><colgroup><col width="220.90621948242188"/><col width="419.00689697265625"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>命令</span></p></td><td style=" vertical-align: top"><p><span>说明</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">graphrag init</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">初始化工作区，生成</span><span style="border-bottom:1px solid">.env</span><span style="border-bottom:1px solid">、</span><span style="border-bottom:1px solid">settings.yaml</span><span style="border-bottom:1px solid">、</span><span style="border-bottom:1px solid">input/</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">graphrag init --force</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">强制重新初始化（升级版本后使用），会覆盖现有配置</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">graphrag index</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">对</span><span style="border-bottom:1px solid">input/</span><span style="border-bottom:1px solid">目录的文档执行完整索引流程</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">graphrag index --resume</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">从上次中断处恢复索引（LLM 调用有缓存，不会重复消费 Token）</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">graphrag index --update</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">增量索引，只处理新增文档</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">graphrag query "问题"</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Global Search 查询（默认模式）</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">graphrag query "问题" --method local</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Local Search 查询</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">graphrag query "问题" --method drift</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">DRIFT Search 查询</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">graphrag query "问题" --method basic</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Basic Search（向量检索）</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">graphrag prompt-tune</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">自动调优 Prompt（处理新数据集前推荐运行）</span></p></td></tr></tbody></table></div>


<a id="section-2076"></a>
## 完整 settings.yaml 字段说明

<a id="t-ypGRhBuabMYltQDOFxQz2d"></a>

<p id="t-tqN51pLsHa30FzPcRdPZc4"><span style="border-bottom:1px solid">以下对</span><span style="border-bottom:1px solid">settings.yaml</span><span style="border-bottom:1px solid">中最常用的配置项做详细说明，方便进一步调整。</span></p>


<a id="section-2077"></a>
## 模型相关

<a id="t-E4jj57L93G9pDj2JDhVjtj"></a>

<div id="t-KLyILshkXqdJifv16LL1hu"><table><colgroup><col width="151.8992919921875"/><col width="78.00689697265625"/><col width="401.005126953125"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>字段</span></p></td><td style=" vertical-align: top"><p><span>类型</span></p></td><td style=" vertical-align: top"><p><span>说明</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">model_provider</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">string</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">模型提供商，使用 OpenAI 兼容接口时填</span><span style="border-bottom:1px solid">openai</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">model</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">string</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">模型名称，Qwen 填</span><span style="border-bottom:1px solid">qwen-plus 或 qwen-max</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">api_key</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">string</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">API Key，推荐用</span><span style="border-bottom:1px solid">${ENV_VAR}</span><span style="border-bottom:1px solid">引用环境变量</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">api_base</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">string</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">API 端点，Qwen 为</span><span style="border-bottom:1px solid">https://dashscope.aliyuncs.com/compatible-mode/v1</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">call_args.temperature</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">float</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">生成温度，索引阶段建议设为 0 提升稳定性</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">call_args.max_tokens</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">int</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">单次生成最大 Token 数</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">retry.max_retries</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">int</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">请求失败时最大重试次数</span></p></td></tr></tbody></table></div>


<a id="section-2078"></a>
## 分块相关

<a id="t-fwC7BtyB7fL2npsaGt2jXI"></a>

<div id="t-v6BmPEM5uFhSuk8TrypNO3"><table><colgroup><col width="160.8992919921875"/><col width="228.00518798828125"/><col width="200.001708984375"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>字段</span></p></td><td style=" vertical-align: top"><p><span>说明</span></p></td><td style=" vertical-align: top"><p><span>建议值</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">chunking.size</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">每个文本块的最大 Token 数</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">英文：1200~1500；中文：600~1000</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">chunking.overlap</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">相邻块的重叠 Token 数，避免实体被截断在边界</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">50~150</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">chunking.type</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">tokens</span><span style="border-bottom:1px solid">（按 Token 切块）或</span><span style="border-bottom:1px solid">sentence</span><span style="border-bottom:1px solid">（按句子切块）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">一般用</span><span style="border-bottom:1px solid">tokens</span></p></td></tr></tbody></table></div>


<a id="section-2079"></a>
## 实体抽取相关

<a id="t-5lojdnfnJZCviY5wCRL8cz"></a>

<div id="t-X2pwOyRgWstGpXYnVQn9OO"><table><colgroup><col width="160.91140747070312"/><col width="202.00341796875"/><col width="226.0172119140625"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>字段</span></p></td><td style=" vertical-align: top"><p><span>说明</span></p></td><td style=" vertical-align: top"><p><span>建议</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">extract_graph.entity_types</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">告诉模型重点抽取的实体类型列表</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">结合自己的业务领域定制，如</span><span style="border-bottom:1px solid">person, company, product, technology</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">extract_graph.max_gleanings</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">每个文本块最多追问几次（追问可以提高召回，但消耗更多 Token）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">平衡成本时设为 1，追求质量时设为 2</span></p></td></tr></tbody></table></div>


<a id="section-2081"></a>
## 索引中途失败了怎么办？

<a id="t-0rh53EGVmo1GKyd1Qsxmmm"></a>

<p id="t-bfKdi9TRIviazqhsCq0XxU"><span style="border-bottom:1px solid">GraphRAG 会缓存每次 LLM 调用的结果。失败后直接重新运行</span><span style="border-bottom:1px solid">graphrag index</span><span style="border-bottom:1px solid">，已成功处理的文本块会从缓存读取，不会重复消费 Token。</span></p>

<p id="t-RVotR02KrBCFGCXVoGeD1P"><span style="border-bottom:1px solid">如果想从某个步骤重新开始，使用</span><span style="border-bottom:1px solid">--resume</span><span style="border-bottom:1px solid">参数：</span></p>

<pre id="t-dxl6t1HBNkNGaMxVrdGjMx"><code>graphrag index --resume</code></pre>


<a id="section-2082"></a>
## 出现 JSON 解析错误怎么处理？

<a id="t-VNHAMcli72ficCwbRzwMKr"></a>

<p id="t-gbx8LNu3wRZjdkDdLAYmOB"><span style="border-bottom:1px solid">实体抽取阶段要求模型严格返回 JSON 格式。如果出现</span><span style="border-bottom:1px solid">JSONDecodeError</span><span style="border-bottom:1px solid">，可以尝试以下几个办法：</span></p>

<ul><li id="t-rNcC1XMOMQtX7X351rnmLb"><span>在</span><span style="border-bottom:1px solid">call_args</span><span>中添加</span><span style="border-bottom:1px solid">response_format: {type: json_object}</span><span>（需要模型支持该参数）</span></li></ul>

<ul><li id="t-dANVfecb3VkCgbCNj6rBU2"><span>将</span><span style="border-bottom:1px solid">temperature</span><span>设为 0</span></li></ul>

<ul><li id="t-TlasctBJP2JIicz2qMMJYu"><span>将</span><span style="border-bottom:1px solid">max_gleanings</span><span>设为 0（减少追问，降低出错概率）</span></li></ul>

<ul><li id="t-xwwf0Hc12CQuw6m7R9eKwZ"><span>运行</span><span style="border-bottom:1px solid">graphrag prompt-tune</span><span>重新调优 Prompt，让模型更熟悉输出格式</span></li></ul>


<a id="section-2083"></a>
## 如何选择 Global Search 还是 Local Search？

<a id="t-RrpmWbW9FXhp3kNHP6jEyG"></a>

<div id="t-0UMWo9WloOjEyUFQD5Xlih"><table><colgroup><col width="151.8992919921875"/><col width="120"/><col width="336.8992919921875"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>问题类型</span></p></td><td style=" vertical-align: top"><p><span>推荐模式</span></p></td><td style=" vertical-align: top"><p><span>示例</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">总结性、全局性</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Global Search</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">"这批文档的核心主题是什么？""所有人物关系网络的全貌"</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">针对特定实体</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Local Search</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">"马斯克的职业经历？""猎鹰 9 号火箭的主要技术特点"</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">需要深度与广度兼顾</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">DRIFT Search</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">"某人物与周边生态的关联分析"</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">简单精确查找</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Basic Search</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">"SpaceX 公司成立于哪一年"</span></p></td></tr></tbody></table></div>


<a id="section-2084"></a>
## Token 消耗太高如何控制？

<a id="t-LedZy1Mkjrc4rngas4zZRI"></a>

<ul><li id="t-yxoJ60HNdmRKsU5StcCRKl"><span>将</span><span style="border-bottom:1px solid">chunking.size</span><span>适当调大（更少的文本块 = 更少的 LLM 调用）</span></li></ul>

<ul><li id="t-oRG9CxMQQ4z1DsJdllFEbN"><span>将</span><span style="border-bottom:1px solid">extract_graph.max_gleanings</span><span>设为 0 或 1</span></li></ul>

<ul><li id="t-nCjFkvVr9sOTOhfSEj1mKw"><span>在</span><span style="border-bottom:1px solid">entity_types</span><span>中只保留与业务最相关的实体类型</span></li></ul>

<ul><li id="t-eDp9xc3SL5hE4JKpvu7cxq"><span>索引阶段用较便宜的模型，查询阶段可按需换成更强的模型</span></li></ul>

<blockquote id="t-rjooOHW8CnlZmoF8xIVbCz"><p id="t-JfRxQbGWuQFkJF3L08Ap3d"><span style="border-bottom:1px solid;font-style:italic">GraphRAG 提供了一种"非对称模型配置"策略：在</span><span style="border-bottom:1px solid;font-style:italic">completion_models</span><span style="border-bottom:1px solid;font-style:italic">中定义多个模型，索引阶段用成本低的模型，查询阶段对关键查询用能力更强的模型，在成本和质量之间找到平衡。</span></p></blockquote>


<a id="section-2085"></a>
## 如何处理中文文档？

<a id="t-yGakfDaKLDZAm17hfIXbK1"></a>

<p id="t-dbjemxIv3vBg7Ho9pWKWl5"><span style="border-bottom:1px solid">处理中文文档时有以下几点需要注意：</span></p>

<ul><li id="t-mOfAwn5d6NU4CWvu3xdqHI"><span>确保</span><span style="border-bottom:1px solid">input.encoding: utf-8</span><span>（默认已是 UTF-8）</span></li></ul>

<ul><li id="t-wuF16YBRpiaAXpTXf6eyv1"><span>调小</span><span style="border-bottom:1px solid">chunking.size</span><span>（中文字符信息密度高，600~1000 Token 即可）</span></li></ul>

<ul><li id="t-XtJSlRukkgBmfYVp14AxYo"><span>运行</span><span style="border-bottom:1px solid">graphrag prompt-tune --language Chinese</span><span>生成中文 Prompt</span></li></ul>

<ul><li id="t-17hkyp1wnZDOtk6b9OrKCF"><span style="border-bottom:1px solid">entity_types</span><span>可以适当加入中文特有类型，如</span><span style="border-bottom:1px solid">government_agency</span><span>（政府机构）、</span><span style="border-bottom:1px solid">policy</span><span>（政策）</span></li></ul>


<a id="section-2086"></a>
## 延伸阅读

<a id="t-5JFPk20Zn2ok8noY0Vxe1J"></a>

<div id="t-pVyDogIrvlDOxK6b2d5YpD"><table><colgroup><col width="120"/><col width="236.8992919921875"/><col width="245.8992919921875"/></colgroup><tbody><tr><td style=" vertical-align: top"><p><span>主题</span></p></td><td style=" vertical-align: top"><p><span>说明</span></p></td><td style=" vertical-align: top"><p><span>链接</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">官方完整文档</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">包含所有配置项的详细说明</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">microsoft.github.io/graphrag</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">配置参考</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">settings.yaml 全量字段说明</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">microsoft.github.io/graphrag/config/yaml/</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">模型选型指南</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">如何接入各类 LLM（含 LiteLLM 用法）</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">microsoft.github.io/graphrag/config/models/</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">查询引擎详解</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">四种查询模式的原理和参数调优</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">microsoft.github.io/graphrag/query/overview/</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">Prompt 调优指南</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">自动调优和手动调优 Prompt 的完整说明</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">microsoft.github.io/graphrag/prompt_tuning/overview/</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">可视化指南</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">使用官方工具可视化知识图谱</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">microsoft.github.io/graphrag/visualization_guide/</span></p></td></tr><tr><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">GraphRAG 论文</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">微软研究院的原始论文，理解底层原理</span></p></td><td style=" vertical-align: top"><p><span style="border-bottom:1px solid">arxiv.org/pdf/2404.16130</span></p></td></tr></tbody></table></div>

