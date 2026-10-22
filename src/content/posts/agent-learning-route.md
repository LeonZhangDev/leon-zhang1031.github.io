---
title: "Agent 学习路线"
date: "2026-10-22"
draft: false
author: "学习资料整理"
description: "24 章 Agent 学习路线：基础、工具、RAG、工程实践与知识自测。"
tags: ["Agent", "学习路线"]
categories: ["AI 工程"]
prerequisites: []
verification: {"status": "not-run", "scope": "本次仅整理资料；示例代码与原文技术结论未复跑。"}
---

<a id="learning-route"></a>
按知识点合并的学习资料。正文保留技术讲解、代码与案例，移除个人经历、课程推广与领取信息；项目统一作为学习案例。

## 入门主线

01 → 02 → 03 → 04 → 05 → 06 → 07 → 09 → 10 → 12 → 13 → 14 → 15 → 16 → 17 → 23

## 进阶与复习

意图路由与协作：08 → 11；模型与工程方法：18 → 19 → 20 → 21 → 22；知识自测：24。

## 章节目录

- [第 01 章 · Agent 入门与整体架构](/posts/agent-learning-01-agent-foundations/)：定义与边界、核心组件、工作流、应用场景
- [第 02 章 · 大模型应用基础](/posts/agent-learning-02-llm-foundations/)：Token、上下文窗口、模型参数、API、多模态基础
- [第 03 章 · Prompt 工程](/posts/agent-learning-03-prompt-engineering/)：提示词结构、示例、输出格式、提示词链、优化与裁剪
- [第 04 章 · 工具调用与结构化输出](/posts/agent-learning-04-tool-calling/)：Function Calling、工具定义、参数校验、JSON 与结构化输出
- [第 05 章 · 推理、规划与执行](/posts/agent-learning-05-reasoning-planning/)：ReAct、Planning、反思、任务分解、循环与终止
- [第 06 章 · MCP 与外部集成](/posts/agent-learning-06-mcp-integrations/)：协议、客户端与服务器、传输、资源、工具、兼容性与 A2A
- [第 07 章 · 上下文工程与记忆](/posts/agent-learning-07-context-memory/)：长短期记忆、压缩、状态、持久化、会话恢复与用户画像
- [第 08 章 · 意图识别与语义路由](/posts/agent-learning-08-intent-routing/)：分类、多意图、置信度、澄清、路由与优化
- [第 09 章 · RAG 基础与数据处理](/posts/agent-learning-09-rag-data-processing/)：知识库、PDF、文档解析、清洗、分块与元数据
- [第 10 章 · 检索与 RAG 进阶](/posts/agent-learning-10-retrieval-advanced-rag/)：Embedding、向量库、混合检索、重排序、查询改写与 GraphRAG
- [第 11 章 · 多 Agent 系统](/posts/agent-learning-11-multi-agent/)：架构、职责、通信、共享状态、协作与冲突控制
- [第 12 章 · LangChain 开发](/posts/agent-learning-12-langchain/)：模型、消息、工具、智能体、流式、中间件与运行时
- [第 13 章 · LangGraph 开发](/posts/agent-learning-13-langgraph/)：状态、节点、边、API、子图、检查点、中断与恢复
- [第 14 章 · 从零实现 Agent](/posts/agent-learning-14-build-agent/)：环境、最小循环、工具、记忆、规划、检索与完整实现
- [第 15 章 · 评测与可观测性](/posts/agent-learning-15-evaluation-observability/)：评测集、任务与轨迹指标、Judge、RAGAS、LangSmith 与追踪
- [第 16 章 · 安全与可靠性](/posts/agent-learning-16-safety-reliability/)：幻觉、注入、权限、敏感信息、异常、超时、回滚与熔断
- [第 17 章 · 工程化与生产部署](/posts/agent-learning-17-production-engineering/)：服务化、流式、并发、性能、成本、部署与监控
- [第 18 章 · 模型训练与推理优化](/posts/agent-learning-18-training-inference/)：Transformer、微调、LoRA、SFT、DPO、量化、显存与加速
- [第 19 章 · AI 编程与 Claude Code](/posts/agent-learning-19-ai-coding/)：使用方法、工作机制、上下文、权限、记忆、调试与审查
- [第 20 章 · Skills 与 Agent 工程方法](/posts/agent-learning-20-skills-harness/)：Skill、Harness、Loop、Graph 工程与实践
- [第 21 章 · 开源 Agent 架构解析](/posts/agent-learning-21-open-source-architectures/)：PI-Agent、OpenClaw、Hermes 与 DeepSeek Harness
- [第 22 章 · Agent 平台与开发工具](/posts/agent-learning-22-agent-platforms/)：Dify、n8n、CrewAI、Deep Agents 与桌面智能体
- [第 23 章 · 综合项目学习案例](/posts/agent-learning-23-learning-cases/)：预约、日历、RAG、电商客服、ForgePilot、多模态与垂直应用
- [第 24 章 · 面试与知识自测](/posts/agent-learning-24-interview-review/)：技术题、系统设计、案例追问与技术复盘

## 阅读说明

章节里的第一人称技术问答只作为案例原文，不代表整理者的个人经历。示例与指标按原文保留，不表示本次已运行或复现。缺少源码附件的案例保留技术说明，不补造附件。

[本地 HTML 阅读入口](/posts/agent-learning-route/)
