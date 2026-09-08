---
title: "ViT 与 CLIP：多模态大模型的两块基石——图像切片与图文对齐"
date: 2026-08-29T17:20:00+08:00
draft: false
author: "Zack-Zhang1031"
description: "ViT 如何把图像切成 patch 喂给 Transformer，CLIP 如何用对比学习对齐图文 embedding，零样本分类实战，以及多模态大模型的演进脉络。"
tags: ["ViT", "CLIP", "多模态", "Transformer", "对比学习"]
categories: ["AI课程", "深度学习"]
math: false
---

ViT 将图像切成 patch 后交给 Transformer 处理，CLIP 则通过图文配对学习跨模态表示。两者回答不同问题：怎样表示图像，怎样让图像与文字可比较。把这两条线分开，就更容易理解后续视觉语言模型为何还需要连接模块、训练目标和任务数据。

下面先追踪图像如何变成 token，再追踪图文相似度怎样进入损失函数。调用预训练模型时，也要把候选文本、图像预处理与评估口径保留下来；只看一个返回分数，很难解释模型真正做了什么。

**前置阅读**：建议先读 [神经网络基础](/posts/deep-learning-02-backprop/)、[Transformer 详解](/posts/deep-learning-07-transformer-attention/)、[CNN 详解](/posts/deep-learning-04-cnn-image-classification/)、[OpenCV 入门](/posts/opencv-image-interpolation-mask-roi-watermark-grayscale-tutorial/)。

## ViT：图像其实就是一串 token

### 核心洞察

Transformer 处理的是「序列」。文本天然是序列，图像不是——所以 ViT 干的第一件事就是：**把图像切成固定大小的方块（patch），每个方块当成一个 token**。

一张 224×224 的图，按 16×16 切，得到 14×14 = 196 个 patch。每个 patch 展平成 16×16×3 = 768 维向量，过一个线性层投影到 d 维，加上位置编码，再在前面拼一个可学习的 `[CLS]` token——之后就是标准 Transformer Encoder，一模一样。

分类时取 `[CLS]` 位置的输出接 MLP 头。整篇论文的思路就这么多，但它能 work 的前提很有意思：**数据量要够大**。CNN 的卷积归纳偏置（局部性、平移不变性）是免费午餐，Transformer 没有这些偏置，要靠数据硬学。所以 ViT 在 JFT-300M 这种 3 亿图的数据集上超过 CNN，在 ImageNet（130 万图）上从头训练反而不如 ResNet——直到 DeiT 用蒸馏 + 强增强解决了小数据问题。

### 手动实现一个迷你 ViT

```python
import torch
import torch.nn as nn

class PatchEmbedding(nn.Module):
    def __init__(self, img_size=224, patch_size=16, in_ch=3, d_model=768):
        super().__init__()
        self.n_patches = (img_size // patch_size) ** 2
        # 一个卷积同时完成「切 patch + 展平 + 线性投影」
        self.proj = nn.Conv2d(in_ch, d_model, kernel_size=patch_size, stride=patch_size)

    def forward(self, x):
        x = self.proj(x)                    # (B, d_model, 14, 14)
        x = x.flatten(2).transpose(1, 2)    # (B, 196, d_model)
        return x

class MiniViT(nn.Module):
    def __init__(self, img_size=224, patch_size=16, d_model=768,
                 n_heads=12, n_layers=12, n_classes=1000):
        super().__init__()
        self.patch_embed = PatchEmbedding(img_size, patch_size, 3, d_model)
        self.cls_token = nn.Parameter(torch.zeros(1, 1, d_model))
        self.pos_embed = nn.Parameter(torch.zeros(1, 197, d_model))  # 196+1
        encoder_layer = nn.TransformerEncoderLayer(
            d_model, n_heads, dim_feedforward=3072,
            activation="gelu", batch_first=True, norm_first=True)
        self.encoder = nn.TransformerEncoder(encoder_layer, n_layers)
        self.norm = nn.LayerNorm(d_model)
        self.head = nn.Linear(d_model, n_classes)

    def forward(self, x):
        B = x.size(0)
        x = self.patch_embed(x)
        cls = self.cls_token.expand(B, -1, -1)
        x = torch.cat([cls, x], dim=1) + self.pos_embed
        x = self.encoder(x)
        return self.head(self.norm(x[:, 0]))  # 取 CLS 位置
```

这段代码我验证过参数量：ViT-Base（12 层、d=768）约 86M 参数，和论文一致。两个细节值得注意：

1. `nn.Conv2d` 用 kernel_size=stride=patch_size 一步完成切分和投影，这是工程上的标准写法，比手动 unfold 快得多。
2. `batch_first=True` 和 `norm_first=True`——Pre-LN（先归一化再进子层）是 ViT 的标配，比 Post-LN 训练稳定。

### 用 HuggingFace 跑真实推理

```python
from transformers import ViTImageProcessor, ViTForImageClassification
from PIL import Image

processor = ViTImageProcessor.from_pretrained("google/vit-base-patch16-224")
model = ViTForImageClassification.from_pretrained("google/vit-base-patch16-224")

img = Image.open("cat.jpg")
inputs = processor(images=img, return_tensors="pt")
logits = model(**inputs).logits
pred = logits.argmax(-1).item()
print(model.config.id2label[pred])  # 我测出: "Egyptian cat"
```

## CLIP：让图像和文字住进同一个向量空间

### 对比学习：一句话讲清

CLIP 的训练数据是 4 亿对「图片 + 它的 alt 文本」。模型两条腿：图像编码器（ViT 或 ResNet）输出图像向量 I，文本编码器（Transformer）输出文本向量 T。训练目标极其朴素：**一个 batch 里 N 对图文，让配对的 (I_i, T_i) 余弦相似度尽量高，不配对的尽量低**。

这就是一个 N×N 的相似度矩阵，对角线上是正样本，其余 N²−N 个是负样本。损失函数是对称的 InfoNCE（行方向、列方向各做一次交叉熵取平均）：

```python
import torch
import torch.nn.functional as F

def clip_loss(image_feat, text_feat, logit_scale):
    # image_feat/text_feat: (N, d)，已 L2 归一化
    logits = logit_scale * image_feat @ text_feat.T   # (N, N)
    labels = torch.arange(len(logits), device=logits.device)
    loss_i = F.cross_entropy(logits, labels)      # 图→文方向
    loss_t = F.cross_entropy(logits.T, labels)    # 文→图方向
    return (loss_i + loss_t) / 2
```

`logit_scale` 是个可学习参数（初始化为 ln(1/0.07)，对应温度 τ=0.07），它控制 softmax 的「尖锐程度」。CLIP 论文里有个细节：这个值被 clamp 在 ln(100) 以内，防止训练初期梯度爆炸。

### 零样本分类：CLIP 最出圈的能力

训练完成后，CLIP 做分类**不需要任何微调**。以 ImageNet 分类为例：把 1000 个类别名填进模板 `a photo of a {class}`，得到 1000 个文本向量；来一张图，算图像向量和 1000 个文本向量的相似度，取 argmax。全程没见过一张 ImageNet 训练图，准确率却追平了全监督训练的 ResNet-50——这就是「零样本」。

```python
import torch
import open_clip
from PIL import Image

model, _, preprocess = open_clip.create_model_and_transforms(
    "ViT-B-32", pretrained="laion2b_s34b_b79k")
tokenizer = open_clip.get_tokenizer("ViT-B-32")

image = preprocess(Image.open("dog.jpg")).unsqueeze(0)
labels = ["a photo of a cat", "a photo of a dog", "a photo of a car"]
text = tokenizer(labels)

with torch.no_grad():
    image_feat = model.encode_image(image)
    text_feat = model.encode_text(text)
    image_feat /= image_feat.norm(dim=-1, keepdim=True)
    text_feat /= text_feat.norm(dim=-1, keepdim=True)
    probs = (100.0 * image_feat @ text_feat.T).softmax(dim=-1)

print(dict(zip(labels, probs[0].tolist())))
# 输出取决于图片与候选文本；候选集合改变，softmax 分数也会改变
```

可以用同时包含多个概念的图片检查边界，例如穿披风的狗，再改变候选文本。注意这些 softmax 分数只是候选集合内的相对分数，不等于经过校准的真实类别概率，也不能用一次输出证明模型已经理解某种语义。

### 提示词模板不是玄学

CLIP 论文里有个容易忽略的工程点：直接填类别名（`dog`）效果比套模板（`a photo of a dog`）差约 5 个点。原因是训练数据里的文本基本都是完整句子，单个词的分布不匹配。ImageNet 官方评估用了 80 个模板做集成（「a photo of a big {}」「a blurry photo of a {}」……），再涨 3.5 个点。你自己用 CLIP 做下游任务时，**先调文本侧模板，比调图像侧收益大得多**。

## CLIP 之后：多模态大模型的三条主线

理解 CLIP 的对齐思想后，今天所有的视觉语言模型（VLM）都能归进三条线：

1. **双塔对齐线（CLIP 直系）**：SigLIP（用 sigmoid 替代 softmax，batch 小也能训好）、ALIGN、中文社区的 Chinese-CLIP。
2. **生成式对齐线（VLM 主流）**：LLaVA、Qwen-VL——冻结或微调一个 ViT，把图像 token 投影后塞进 LLM 的词表空间，让 LLM 直接「看图说话」。训练分两阶段：先对齐（只训投影层），再指令微调。
3. **统一建模线**：GPT-4o、Gemini 这类原生多模态，文本图像音频在底层就是同一套 token 化流程。

不要把普通 Qwen 文本模型与带视觉编码器的 Qwen-VL 混为一谈。[vLLM 部署调优](/posts/vllm-qwen-performance-tuning/)中的服务性能问题可以作为工程参考，但是否接收图像以及怎样连接视觉模块，要以具体模型配置为准。

## 从调用示例到评测

零样本分类需要先冻结类别列表与文本模板，图文检索需要定义每条查询的相关图片集合。模板选择在验证集完成，再在独立测试集报告结果；不能不断看测试图改描述后，仍称为未调优的零样本评测。

比较 ViT 微调与 CNN 时，还要说明预训练数据和训练预算是否一致。若一个模型使用了大量预训练数据，另一个从头训练，差异不能全部归因于网络结构。这里不列没有对应配置与日志的个人实测数字。

## 踩坑排查

| 现象 | 原因 | 解法 |
|------|------|------|
| open_clip 加载报错 `RuntimeError: PytorchStreamReader` | 权重文件下载不完整 | 删 `~/.cache/clip` 缓存重下，或换镜像源 |
| 零样本分类全部偏向某一类 | 文本模板差异大（有的短有的长） | 统一模板句式，长度对齐 |
| ViT 微调 loss 不降 | 学习率沿用 CNN 的 1e-3，太大 | Transformer 微调用 1e-5~5e-5 + warmup |
| 中文图文检索效果差 | 原版 CLIP 训练文本几乎全英文 | 换 Chinese-CLIP 或 multilingual-e5 + 图像塔 |
| 显存溢出（batch=256 时） | 对比学习需要大 batch，ViT-B/32 全量占 20G+ | 开混合精度 + 梯度累积，或上梯度检查点 |
| 相似度分数都挤在 0.2~0.3 | 忘了 L2 归一化 | 两边特征必须除范数再点乘 |

## 练习

1. 用 `timm` 加载 ViT-Base，把位置编码换成 2D sincos（MAE 的做法），对比参数量和初始化差异。
2. 在 CIFAR-10 上从零训练迷你 ViT（4 层、d=256、patch=4），记录 100 epoch 的准确率，和同参数量 ResNet 对比，体会「数据不够时归纳偏置的价值」。
3. 用 CLIP 给自己的相册做语义搜索：离线编码所有图片存向量库，输入句子返回 top-5 图。进阶：换成 [Milvus 向量数据库](/posts/milvus-neo4j-rag/) 存索引。
4. 复现模板集成：准备 10 个不同句式模板，在 100 张测试图上比较单模板与模板平均的准确率差。

## 面试常问

**Q：ViT 为什么需要 CLS token？能不能用全局平均池化替代？**
可以，DeiT 和后来的很多工作证明 GAP 效果相当甚至更好。CLS token 是沿袭 BERT 的习惯，本质是一个「专门负责汇总全局信息的槽位」。两者的差别在归纳偏置：GAP 对所有 patch 一视同仁，CLS token 通过注意力学会加权。

**Q：CLIP 为什么要对称损失（图→文和文→图各算一次）？**
单个方向的交叉熵只约束「给定图找到正确的文」，不约束「给定文找到正确的图」。检索是双向任务，只训一边会导致另一边排序质量差。对称损失代价几乎为零（矩阵转置），收益明确。

**Q：batch size 对 CLIP 训练为什么那么重要？**
负样本全部来自 batch 内部，batch=N 时每对正样本只有 N−1 个负样本。batch 小了负样本多样性不足，模型学不到细粒度区分。CLIP 用了 32768 的 batch；工程上用梯度累积 + 跨卡 gather 凑大 batch 是标准做法。

**Q：ViT 相比 CNN 真正的优势和代价是什么？**
优势：全局感受野从第一层就有（自注意力），长程依赖建模强，架构统一便于 scale。代价：没有局部性偏置所以吃数据；自注意力 O(n²) 复杂度，高分辨率场景贵——这也是 Swin Transformer 用窗口注意力的动机。

**Q：CLIP 的文本编码器为什么不用 BERT？**
CLIP 用的是 GPT 风格的因果 Transformer。BERT 的 MLM 目标为理解任务设计，CLIP 只需要一个把整句压成单向量的编码器，因果 LM 结构更简单且与生成任务兼容。另外 BERT 的 [CLS] 表征并非为跨模态对比优化，实测差距不大但 CLIP 选择了更轻的路线。

## 相关阅读

- [Transformer 详解：注意力机制与 BERT](/posts/deep-learning-07-transformer-attention/)——本文自注意力部分的基础
- [CNN 详解：卷积神经网络原理](/posts/deep-learning-04-cnn-image-classification/)——理解 ViT 革了谁的命
- [图像生成：GAN 与 Diffusion](/posts/image-generation-gan-diffusion/)——Diffusion 的文本条件大多来自 CLIP 文本编码器
- [Milvus + Neo4j 搭建 RAG 知识库](/posts/milvus-neo4j-rag/)——CLIP 向量进检索系统的完整工程链路
- [vLLM 部署 Qwen 性能调优实录](/posts/vllm-qwen-performance-tuning/)——多模态大模型推理侧实战

CLIP 对齐图文这件事，本质上和 [推荐系统](/posts/recommender-system-basics/) 里的双塔召回是同一个思想——把两种异质对象映射到同一空间比相似度。技术到处相通，这是我学到现在最深的体会。
