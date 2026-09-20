---
title: "多模态科研内容理解 03：深度学习文本模型——从 Embedding 特征到微调分类器"
date: 2026-08-28T23:40:00+08:00
draft: false
updated: 2026-09-20
author: "Zack-Zhang1031"
description: "AI 科研内容课程系列四第 3 课：挑战 M2 的分类基线——Embedding + 逻辑回归、PyTorch 微调 Transformer 两条路线对比，以及什么时候深度学习值得上。"
tags: ["深度学习", "Transformer", "文本分类", "微调"]
categories: ["AI课程", "多模态理解"]
math: false
---

系列三已经给出 TF-IDF 与线性分类器的基线流程。这一课考虑是否值得改用深度文本模型：评估集保持一致，比较分类质量、推理成本和维护要求。如果结果没有带来明确收益，保留简单基线也是合理选择。

> 前置阅读：[深度学习课程 01](/posts/deep-learning-01-training-loop/)（训练循环）、[07：Transformer](/posts/deep-learning-07-transformer-attention/)（注意力机制）、[M2 基线报告](/posts/research-ml-05-evaluation-tuning-milestone/)（要挑战的对象）。

## 路线 A：Embedding 当特征，逻辑回归当分类头

最便宜的第一步：不训练深度模型，把[上一课](/posts/research-mm-02-embedding-semantic-search/)的 Embedding 向量当稠密特征，接经典分类器：

```python
from sklearn.linear_model import LogisticRegression

# embeddings: (n, 1024)，上一课生成落盘的
X_train_emb, X_test_emb = embeddings[train_idx], embeddings[test_idx]

clf = LogisticRegression(max_iter=2000, C=10, class_weight="balanced", n_jobs=-1)
clf.fit(X_train_emb, y_train)
```

这条路线复用冻结模型的表示，避免全量微调，但不保证优于 TF-IDF。领域术语、语言、文本长度和预训练覆盖都会影响结果。应分别记录特征提取成本和分类头训练成本，不预先承诺提升点数。

## 路线 B：微调 Transformer

把预训练模型本身在领域分类数据上继续训练。以下是依赖前置数据的结构示例，不是独立脚本：`dataset` 应为含 `train`/`validation` 的 DatasetDict，两部分均有 `text_all` 和整数 `labels`，`FIELDS` 固定标签顺序。需要先准备并检查这些对象、安装兼容的 transformers/datasets/accelerate/torch 版本；本轮未下载权重或运行微调。

```python
from transformers import (AutoTokenizer, AutoModelForSequenceClassification,
                          TrainingArguments, Trainer, DataCollatorWithPadding)
from sklearn.metrics import f1_score

model_name = "bert-base-uncased"   # 学术英文文本可换 scibert
tokenizer = AutoTokenizer.from_pretrained(model_name)

def tokenize(batch):
    return tokenizer(batch["text_all"], truncation=True, max_length=512)

dataset = dataset.map(tokenize, batched=True)
ds_train, ds_val = dataset["train"], dataset["validation"]

def compute_metrics(result):
    return {"f1_macro": f1_score(result.label_ids,
                               result.predictions.argmax(axis=-1),
                               labels=list(range(len(FIELDS))),
                               average="macro", zero_division=0)}

model = AutoModelForSequenceClassification.from_pretrained(
    model_name, num_labels=len(FIELDS))

args = TrainingArguments(
    output_dir="runs/m4/ft",
    learning_rate=2e-5,              # 微调的学习率比从头训练小 1-2 个量级
    num_train_epochs=3,
    per_device_train_batch_size=16,
    eval_strategy="epoch",
    save_strategy="epoch",         # 最优模型回载要求保存与评估策略对应
    load_best_model_at_end=True,
    metric_for_best_model="f1_macro",
    seed=42,
)

trainer = Trainer(model=model, args=args, train_dataset=ds_train,
                  eval_dataset=ds_val,
                  data_collator=DataCollatorWithPadding(tokenizer),
                  compute_metrics=compute_metrics)
trainer.train()
```

微调的几个关键认知：

**学习率需要验证。** 2e-5 只是示例起点，不是普遍最优值。与批大小、训练步数和预训练权重共同设定，并检查验证曲线。`metric_for_best_model` 对应的指标必须由 `compute_metrics` 返回，不能只写一个指标名字；参见 [Trainer 官方文档](https://huggingface.co/docs/transformers/main_classes/trainer)。

**truncation 策略要想清楚。** 标题+摘要超 512 token 时截断——截哪头有讲究：标题信息密度最高，把标题放最前面保证它永远不被截掉。

**评估口径必须和基线完全一致。** 同一切分、同一测试集、同一宏 F1。微调模型 0.86 而基线 0.81，但两边测试集不一样，这个"提升"一文不值——[M2 课](/posts/research-ml-05-evaluation-tuning-milestone/)封存测试集的纪律在这里兑现。

## 三路对比：分数之外的完整账本

| 路线 | 宏 F1 | 训练成本 | 推理成本/篇 | 备注 |
|---|---|---|---|---|
| TF-IDF + LR（M2 基线） | 待测 | 待测 | 待测 | 可查看系数 |
| Embedding + LR | 待测 | 特征提取与训练分开记录 | 待测 | 固定模型版本 |
| BERT 微调 | 待测 | 记录显存和训练设备 | 待测 | 记录截断与批大小 |

三条路线各有赢的场景：数据量小、要解释性、CPU 部署——基线仍然能打；要性价比——Embedding+LR；追求极限、有 GPU、能接受运维复杂度——微调。

上表是待实测模板，不是已完成的性能对比，也不预先指定线上模型。是否采用更复杂方案，要由收益区间、成本与维护条件共同决定；模型变大并不保证指标上限更高。

## 错误分析：深度学习修好了哪些错

下面是错误分析的候选假设，不是已观察结果；应在同一批预测上逐条核对：

- **修复**：语义理解类错误。"用 RL 优化 dialogue policy"这种没有领域关键词的论文，TF-IDF 猜错，Transformer 靠语义猜对。
- **未修复**：相邻领域混淆（cs.CL vs cs.LG）依旧存在——语义上也确实难分，印证 [M2 错误分析](/posts/research-ml-02-field-classification/)的结论：这类错要靠类目体系调整，不是换模型能解决的。

错误分析的价值再次验证：它告诉你哪些问题是"模型能力"问题，哪些是"任务定义"问题。

## 踩坑排查

| 症状 | 原因 | 处理 |
|---|---|---|
| 微调后不如基线 | 学习率过大灾难性遗忘 | 降回 2e-5 量级 |
| 训练 loss 不降 | 标签映射错/tokenizer 不匹配 | 检查 label2id 与数据一致性 |
| 显存 OOM | batch 太大/序列太长 | 降 batch、梯度累积、max_length 收敛 |
| Embedding+LR 分数异常高 | 向量行序和标签错位 | 校验 ids 对齐（上一课的坑） |
| 评估分数每次不同 | 没固定种子 | TrainingArguments seed 固定 |
| 推理慢到不可用 | CPU 跑 BERT | 蒸馏小模型/量化/换 Embedding 路线 |

## 作品集证据

本课产出：三条路线的同口径对比表 + 错误模式差异分析 + 基于需求的选型决策。"我不是上了深度学习，我是评估了深度学习的投入产出比"——这句话在面试里的分量远超"我会用 transformers"。

## 练习

1. 复现 Embedding+LR 路线，确认同口径下对 TF-IDF 基线的提升幅度。
2. 微调 BERT，扫学习率 {1e-5, 2e-5, 5e-5}，观察灾难性遗忘的分数表现。
3. 对比截断策略（标题在前 vs 摘要在前）对分数的影响。
4. 对微调模型做错误分析，区分"模型能力问题"与"任务定义问题"各 5 例。

## 面试常问

**Q：Embedding+LR 和微调怎么选？**
前者冻结预训练模型当特征提取器，便宜稳定、数据需求小；后者端到端优化，上限高但要 GPU、要更多标注、要运维。决策依据：标注量、精度需求、部署约束。小数据场景 Embedding+LR 经常反超微调。

**Q：微调为什么用小学习率？**
预训练权重已含丰富知识，大学习率更新幅度大会破坏这些权重（灾难性遗忘）。2e-5 量级让模型"轻推"到任务上，而非重新学习语言。

**Q：怎么证明深度学习路线真的更好？**
同切分、同测试集、同指标的严格对比 + 差异样本的错误分析。只有总分的提升可能是噪声——加多种子和置信区间才算数。

---

下一课：[多模态科研内容理解 04：图表与公式——论文里的视觉信息](/posts/research-mm-04-figure-formula/)。
