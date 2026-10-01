---
title: "模型评估指标与类别不平衡：AUC、PR、KS 怎么选，阈值怎么调"
date: 2026-08-30T03:50:00+08:00
draft: false
author: "Zack-Zhang1031"
description: "混淆矩阵的正确打开方式、ROC 与 PR 曲线的分工、类别不平衡下的指标陷阱、SMOTE 与代价敏感学习、阈值调优的业务对齐方法。"
tags: ["模型评估", "AUC", "类别不平衡", "SMOTE", "阈值调优"]
categories: ["AI课程", "机器学习"]
math: false
updated: 2026-09-20
verification:
  status: example-tested
  scope: "核对官方指标接口，并运行固定验证样本的阈值/F1 断言；不代表整篇所有模型实验已经复跑。"
  checkedAt: 2026-09-20
---

「模型准确率 99.5%」——在欺诈检测项目里，这句话等于什么都没说：欺诈率只有 0.5%，全部预测「正常」就有 99.5% 准确率。**类别不平衡是工业界 ML 的常态而不是例外**（欺诈、故障、流失、违约全是少数派），它同时扭曲两件事：你选的指标和你训的模型。

这篇把「评估」和「不平衡」放在一起讲，因为它们本质是一个问题的两面：指标告诉你模型行不行，处理手法让模型真的行。

**前置阅读**：建议先读 [机器学习基础与 Scikit-learn](/posts/ml-basics-scikit-learn/)、[A/B 测试与统计推断](/posts/ab-testing-statistics/)。

## 混淆矩阵：一切指标的源头

二分类的四种结局：

```
                预测正      预测负
实际正     │    TP    │    FN（漏报）
实际负     │    FP（误报）│    TN
```

从这四个数推导出所有指标，每个指标回答一个不同的业务问题：

| 指标 | 公式 | 回答的问题 |
|------|------|-----------|
| Precision（精确率） | TP/(TP+FP) | 我说「是」的里面，多少真的是？ |
| Recall（召回率） | TP/(TP+FN) | 真的是的里面，我抓到了多少？ |
| F1 | 2PR/(P+R) | P 和 R 的调和平均（偏向小的那个） |
| Accuracy | (TP+TN)/全部 | 整体对多少（不平衡时失真！） |

阈值提高会缩小预测正类集合，召回率不会因此增加，但精确率不保证单调上升。选哪个工作点应看验证集上的实际误报、漏报和业务代价。例如漏报损失远高于误报时，可以优先满足召回约束，再比较可行方案的成本。

<!-- figure:model-evaluation-metrics-imbalance -->

![阈值是验证集上的决策](/images/blog/model-evaluation-metrics-imbalance.svg)

*图解：提高阈值会缩小预测正类集合，但精确率不保证逐点单调。看实际候选点与业务成本。*

例如分数依次为 0.9、0.8、0.7，标签为 1、0、1。阈值从 0.7 升到 0.8，召回从 1 降到 0.5，精确率却从 2/3 降到 1/2；升到 0.9 时精确率才变成 1。这个反例说明不能把精确率与阈值的关系当成单调定律。

**动手核对：** 列出上述三个工作点，分别计算漏报与误报成本。保留所有预测为负的候选方案；在约束无法满足时返回“无可行阈值”，不要对空数组调用 argmax。

## AUC 与 PR 曲线：不平衡下的分水岭

**ROC-AUC**：横轴假正率（FPR）、纵轴召回率，扫所有阈值画出的曲线下面积。几何意义漂亮：随机取一对正负样本，模型把正的排在负的前面的概率。

ROC-AUC 衡量的是跨阈值排序，不直接反映某个工作点的处理量。例如负样本一百万个，误报一万个时 FPR 为 1%；这个比例仍可能对应无法承受的人工审核量。这不是 AUC 算错，而是问题与指标没有对齐。类别条件分数分布不变、只改变正负比例时，ROC 可保持不变，精确率却会改变。

**PR 曲线**：横轴召回、纵轴精确率，直接展示漏报与预测正类质量的权衡。它对正类比例敏感，因此跨数据集比较时必须报告类别占比。AP 与梯形积分的 PR-AUC 不是同一个计算量，实验报告应写清所用函数。

```python
from sklearn.metrics import (roc_auc_score, average_precision_score,
                             precision_recall_curve, classification_report)

# 极度不平衡数据上的对比实验
roc = roc_auc_score(y_test, y_score)          # 可能 0.95，看起来很好
ap = average_precision_score(y_test, y_score) # AP：按召回增量加权，不等同于梯形积分 PR 面积
```

没有一个通用的 10% 分界线能替代业务判断。正类稀少且误报处理成本高时，可以重点报告 AP、指定召回下的 precision、审核量和成本，并保留 ROC-AUC 描述排序能力。KS 衡量正负分数经验累积分布的最大差距，也不能直接充当利润或审核负载指标。

## 阈值调优：先定义代价，再选择工作点

0.5 并非必然错误，问题是它是否对应当前的错误代价与概率校准。阈值应在验证集上选择，再固定到测试集评估。若线上类别比例发生变化，还要检查精确率是否改变，不能只搬用离线的工作点。

模型输出分数，业务需要决策——中间隔着阈值。如果输出是目标人群中校准后的后验概率、两种错误代价相等且正确决策代价为零，0.5 是相应的贝叶斯决策阈值，并不额外要求类别平衡。下面是三种验证集选法；代码依赖已经准备好的二分类 `y_val` 与 `val_score`，不是独立训练脚本：

```python
import numpy as np
from sklearn.metrics import f1_score

prec, rec, thresholds = precision_recall_curve(y_val, val_score)
if thresholds.size == 0 or np.unique(y_val).size != 2:
    raise ValueError('验证集需要非空分数且同时包含正负两类')

# 方法 1：最大化 F1
f1s = 2 * prec[:-1] * rec[:-1] / (prec[:-1] + rec[:-1] + 1e-9)
best_f1_t = thresholds[np.argmax(f1s)]

# 方法 2：业务约束法——「召回必须 ≥85%，在此约束下精确率最高」
valid = rec[:-1] >= 0.85
best_recall_t = thresholds[valid][np.argmax(prec[:-1][valid])] if valid.any() else None

# 方法 3：成本矩阵法——直接最小化期望损失
cost_fn, cost_fp = 10000, 100   # 漏报一万，误报一百
def expected_cost(t):
    pred = val_score >= t
    fn = ((pred == 0) & (y_val == 1)).sum()
    fp = ((pred == 1) & (y_val == 0)).sum()
    return fn * cost_fn + fp * cost_fp
candidates = np.append(thresholds, np.nextafter(np.max(val_score), np.inf))
best_cost_t = min(candidates, key=expected_cost)
# 按业务目标选定其中一种方法；冻结该阈值后，再对测试集做一次报告。
```

**方法 3 是我最推荐的**：它强迫业务方把「代价」说成一个数，扯皮会变成对齐。阈值应该进配置文件而不是写死在代码里——业务策略调整时改配置就行。

`precision` 与 `recall` 的最后一个点没有对应阈值，因此阈值搜索使用 `[:-1]`。成本搜索补上全预测为负的候选点，避免遗漏边界方案。若数据含非有限分数，应在调用前拒绝。接口依据：[Scikit-learn precision_recall_curve](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.precision_recall_curve.html)；AP 的定义见 [average_precision_score](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.average_precision_score.html)。

## 类别不平衡的四种处理：从数据到算法

上面的数组对齐逻辑另有一个可复跑的最小断言：8 个固定验证样本选得阈值 0.65，对应 TP=3、FP=1、FN=0，F1=0.857143。代码见仓库 [`threshold_check()`](https://github.com/LeonZhangDev/leon-zhang1031.github.io/blob/main/examples/blog/run-examples.py)，结果见[运行记录](/examples/blog/results.json)。它验证实现，不是模型测试集成绩。

### ① 重采样：改数据分布

```python
from imblearn.over_sampling import SMOTE
from imblearn.under_sampling import RandomUnderSampler

# SMOTE：在少数类样本之间插值造新样本
X_res, y_res = SMOTE(sampling_strategy=0.3, random_state=42).fit_resample(X_train, y_train)
```

SMOTE 的坑：插值可能造出不真实的样本（特征空间里少数类不连续时）；**只对训练集重采样，验证/测试集保持原始分布**——在重采样后的数据上评估等于自欺。欠采样简单但丢信息，适合负样本多到冗余的场景（千万级负类采到十万）。

### ② 类别权重：改损失函数

```python
from sklearn.linear_model import LogisticRegression
import xgboost as xgb

# 让模型「更怕漏掉正类」
lr = LogisticRegression(class_weight='balanced')  # 权重 = 反比于频率
xgb_model = xgb.XGBClassifier(scale_pos_weight=neg_count / pos_count)
```

改动最小、效果稳定，**是我处理不平衡的第一选择**。本质：把少数类错分的惩罚放大 N 倍，和成本矩阵思想一脉相承。

### ③ 阈值调整：不改模型改决策

降低阈值会扩大预测正类集合，召回不会下降，但若两阈值之间没有正样本，召回也不会提高；误报可能增加。先检查验证集上的工作点是否满足成本约束，再决定是否需要改动训练。

### ④ 换算法思路：异常检测

正类稀少并不自动排除监督分类。若标签不足、异常类型开放且正常数据较可靠，可以把异常检测纳入基线；但罕见事件不一定在特征上异常，仍需用有代表性的标签评估误报。孤立森林、One-Class SVM、AutoEncoder 重构误差的比较见 [异常检测实战](/posts/anomaly-detection-practice/)。

## 组合实战：欺诈检测的完整配方

下面是一份教学实验方案，不是本次已完成的风控项目报告：

1. **baseline**：类别权重 + XGBoost，PR-AUC 作为北星指标
2. **采样实验**：SMOTE 到 0.3 比例对比 baseline（有时涨有时跌，看数据）
3. **阈值**：按审核人力定——每天能审 500 单，就取风险分 top 500，或成本矩阵法
4. **分群评估**：按渠道/地区/用户分层各看一遍 PR——整体达标但某分群崩坏是常见暗坑
5. **校准检查**：若下游使用概率数值，检查可靠性图，并比较 sigmoid / isotonic 校准；不要预先断言排序一定不受训练策略影响。

重采样和类别权重可能改变概率质量，也可能改变排序。用独立于模型拟合的数据或正确的交叉验证拟合校准器，再在未参与选择的数据上评价。不能把调用一次 `CalibratedClassifierCV` 等同于校准有效；它也不能修复数据泄漏或部署分布变化。参见 [Scikit-learn 概率校准指南](https://scikit-learn.org/stable/modules/calibration.html)。

## 踩坑排查

| 现象 | 原因 | 解法 |
|------|------|------|
| 准确率 99% 但业务说没用 | 不平衡下 accuracy 失真 | 换 PR-AUC/召回率做主指标 |
| SMOTE 后验证集 F1 暴涨上线翻车 | 验证集也被重采样了 | 只对训练集采样 |
| 阈值 0.5 时几乎没有预测正类 | 不平衡 + 默认阈值 | 按成本/约束调阈值，别改模型 |
| 类别权重后概率明显偏移 | 加权目标与目标人群分布不同 | 分别检查排序与校准，使用独立数据验证 |
| 整体指标好、某渠道全错 | 分群差异被平均掩盖 | 分群评估纳入发布门禁 |
| 正类太少（几十个）怎么训都差 | 数据量本质不足 | 上异常检测思路；或先解决数据收集 |

## 练习

1. 用 sklearn 的 `make_classification(weights=[0.99, 0.01])` 造不平衡数据，训练逻辑回归，分别画 ROC 和 PR 曲线，解释两者回答的问题，并报告实际正类比例和 label noise。
2. 在同一模型上扫描阈值，画出「召回-精确率-阈值」双轴图，分别用 F1 最大法和「召回≥0.85」约束法选阈值，对比业务含义。
3. 对比实验：同一数据分别用「不处理 / 类别权重 / SMOTE」训练 XGBoost，在原始分布测试集上比较 PR-AUC——验证哪个最适合你的数据。
4. 实现成本矩阵选阈值：自定 FN/FP 代价比（10:1、100:1 两组），观察最优阈值怎么移动。

## 面试常问

**Q：为什么不应只报告 accuracy？**
99:1 的数据全猜负类也有 99% accuracy，但正类召回为 0。Accuracy 不是没有定义或没有用途，只是单独使用会掩盖少数类失败；应同时报告混淆矩阵、类别占比、precision/recall、AP 和业务工作点。

**Q：ROC-AUC 和 PR-AUC 什么时候结论会打架？**
两者关注不同，不存在固定的 1% 阈值决定该相信谁。模型可能有较好的总体排序，但在有限审核量对应的区域表现不佳。比较同一测试分布、同一置信区间和同一业务工作点，再解释取舍。

**Q：SMOTE 的原理和风险？**
对少数类样本找 k 近邻，在样本与邻居的连线上随机插值生成新样本。风险：① 少数类内部有多个簇时，跨簇插值造出不存在区域的假样本；② 边界样本插值加重类别重叠；③ 高维稀疏特征下「最近邻」本身不可靠。改进版：Borderline-SMOTE（只在边界造）、ADASYN（难样本多造）。

**Q：类别权重和重采样等价吗？**
它们都可改变训练中各类的影响，但不一般等价。某些可分解经验损失下，整数权重与重复样本的目标可对应；优化器、正则化、批采样和树分裂仍可能使结果不同。SMOTE 还会改变特征支持。建议先比较未处理基线和权重，再在仅含训练数据的管线内验证采样收益。

**Q：模型概率需要校准的场景？**
下游直接使用概率数值时，需要检查校准，例如期望成本计算。不要仅凭模型家族判定必然失准；SVM 的 decision function 不是概率，但支持概率估计的配置或外部校准器可产生概率输出。校准方法的选择仍需独立验证，尤其关注小样本过拟合。

## 相关阅读

- [机器学习基础与 Scikit-learn](/posts/ml-basics-scikit-learn/)——评估流程的基本功
- [异常检测实战](/posts/anomaly-detection-practice/)——正类太少时的另一条路
- [A/B 测试与统计推断](/posts/ab-testing-statistics/)——离线指标之后的线上验证
- [集成学习：随机森林与 XGBoost](/posts/ensemble-learning-rf-xgboost/)——scale_pos_weight 的主场
- [MLOps：实验跟踪与监控](/posts/ml-experiment-tracking-monitoring/)——指标进生产后的持续监控

评估指标不是学术选择题，是**业务价值观的数学化**。下次有人报「准确率 99%」，你的第一反应应该是：混淆矩阵给我看看。
