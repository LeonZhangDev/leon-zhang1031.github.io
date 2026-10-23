---
title: "第 14 章 · 从零实现 Agent"
date: "2026-10-22"
draft: false
author: "学习资料整理"
description: "环境、最小循环、工具、记忆、规划、检索与完整实现"
tags: ["Agent", "学习路线"]
categories: ["AI 工程"]
prerequisites: ["agent-learning-13-langgraph"]
verification: {"status": "not-run", "scope": "本次仅整理资料；示例代码与原文技术结论未复跑。"}
---

环境、最小循环、工具、记忆、规划、检索与完整实现

[学习路线](/posts/agent-learning-route/) · [上一章](/posts/agent-learning-13-langgraph/) · [下一章](/posts/agent-learning-15-evaluation-observability/)

本章按知识小节编排。项目内容作为学习案例阅读，示例代码与原文技术结论未在本次整理中执行验证。

## 本章目录

- [Python 实现 AI Agent](#section-1303)
- [简单的测试案例](#section-1304)
- [实例](#section-1305)
- [构建你的第一个 AI Agent：任务规划助手](#section-1306)
- [第一步：搭建智能大脑](#section-1307)
- [实例](#section-1308)
- [brain.py 文件代码](#section-1309)
- [第二步：定义手脚：工具与行动](#section-1310)
- [tools.py 文件代码](#section-1311)
- [第三步：组装 Agent：实现核心循环](#section-1312)
- [实例](#section-1313)
- [实践练习：升级你的 Agent](#section-1314)
- [总结与展望](#section-1315)
- [Python 智能体环境配置](#section-1361)
- [Python 版本选择](#section-1362)
- [安装 Python](#section-1363)
- [虚拟环境配置](#section-1364)
- [包管理工具 pip](#section-1365)
- [开发目录结构建议](#section-1366)
- [必备库安装](#section-1367)
- [核心库安装](#section-1368)
- [主要库介绍](#section-1369)
- [安装验证](#section-1370)
- [实例](#section-1371)
- [常见安装问题解决](#section-1372)
- [API Key 管理](#section-1373)
- [为什么需要安全管理 API Key？](#section-1374)
- [环境变量管理（推荐）](#section-1375)
- [实例](#section-1376)
- [安全使用 API Key](#section-1377)
- [实例](#section-1378)
- [多环境配置](#section-1379)
- [密钥轮换和监控](#section-1380)
- [开发工具推荐](#section-1381)
- [代码编辑器/IDE](#section-1382)
- [版本控制：Git](#section-1383)
- [调试工具](#section-1384)
- [测试工具](#section-1385)
- [代码质量和格式化](#section-1386)
- [文档工具](#section-1387)
- [容器化工具（可选）](#section-1388)
- [监控和日志](#section-1389)
- [AI Agent 问答实例](#section-1390)
- [项目结构准备](#section-1391)
- [阿里百炼申请 API key](#section-1392)
- [实例](#section-1393)
- [实例](#section-1394)
- [添加搜索工具](#section-1395)
- [集成搜索工具的 Agent](#section-1396)
- [实例](#section-1397)
- [测试搜索 Agent](#section-1398)
- [实例](#section-1399)

<a id="section-1303"></a>
## Python 实现 AI Agent

<a id="t-block-21124"></a>

<p id="t-qzWGsJHk6b8XLLEbDD5ONY"><span>在深入代码之前，让我们先建立一个清晰的认知，可以把 AI Agent 想象成一个</span><span style="font-weight:bold">拥有大脑和手脚的智能程序</span><span>。</span></p>

<ul><li id="t-C0mdgG3Rb9f4uezA9BweRD"><span style="font-weight:bold">大脑（核心）</span><span>：一个能够</span><span style="font-weight:bold">理解、推理和决策</span><span>的模型（比如大型语言模型 LLM）。它负责处理信息，制定计划。</span></li></ul>

<ul><li id="t-4mp5iCcb472REj8DI5tBah"><span style="font-weight:bold">感知（输入）</span><span>：Agent 通过感官获取外部信息，如用户的指令、数据库查询结果、网页内容、传感器数据等。</span></li></ul>

<ul><li id="t-5sSf9elXXLypiYApTDqsT4"><span style="font-weight:bold">行动（输出）</span><span>：Agent 通过手脚影响外部世界，例如调用一个函数、发送一封邮件、在屏幕上输出文本、控制机械臂等。</span></li></ul>

<ul><li id="t-DRTIPiQ95JIsUNQLHdwKBh"><span style="font-weight:bold">目标</span><span>：Agent 的一切行为都围绕着一个明确的</span><span style="font-weight:bold">目标</span><span>展开，比如：帮我查一下北京明天的天气。</span></li></ul>

<p id="t-k8pIlwFk6ctBimqXNbVOzG"><span>其核心工作流程是一个经典的 </span><span style="font-weight:bold">感知-思考-行动</span><span> 循环，如下图所示：</span></p>

<p id="t-qcRlNFaSXOnaeNlwD9KITr"><span style="border-bottom:1px solid"># -----------------------------</span></p>

<p id="t-krXcTfBm49D5hb3qaPgnIk"><span style="border-bottom:1px solid;font-weight:bold">if</span><span>action</span><span style="border-bottom:1px solid">==</span><span style="border-bottom:1px solid">"query_weather"</span><span>:</span></p>

<p id="t-RnYLa9BvJ6gC9ikfWoJv6A"><span style="border-bottom:1px solid;font-weight:bold">print</span><span style="border-bottom:1px solid">(</span><span style="border-bottom:1px solid">"-"</span><span>*</span><span style="border-bottom:1px solid">20</span><span style="border-bottom:1px solid">)</span></p>

<div id="t-4kWsFK4mneic9B6GAugFmK"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/e943de1eb4f239e60da15acb.webp"/></div>


<a id="section-1304"></a>
## 简单的测试案例

<a id="t-AShSOfeHGvzSLUt2CFBCsF"></a>

<pre id="t-tLo1NAamIGd2FEpK3sjrg2"><code>agent-demo/
  agent.py        # 主实现（下面给出）
  tools.py        # 工具实现（可单独文件）
  memory.py       # 简单记忆实现（可单独文件）
  README.md</code></pre>


<a id="section-1305"></a>
## 实例

<a id="t-kbwmoSek9qzfHaZ6ZZWLSv"></a>

<pre id="t-GvGpJUUP9ibtXUa1l18p1r"><code>"""
agent.py - 极简 AI Agent 原型（可直接运行）
说明：
- LLM 部分用一个非常简单的"规则回答器"模拟，实际接入 LLM 时替换 LLMInterface.generate(...)
- 包含组件：LLM 抽象、大脑(解析/决策)、规划器、工具注册器、内存、执行器
"""

from typing import Any, Dict, List, Callable
import time

# -----------------------------
# Memory（非常轻量）
# -----------------------------
class Memory:
 def __init__(self):
        self.short = {} # 当前会话上下文
        self.long = {} # 长期偏好/联系人等

 def get_short(self, k, default=None):
 return self.short.get(k, default)

 def set_short(self, k, v):
        self.short[k] = v

 def get_long(self, k, default=None):
 return self.long.get(k, default)

 def set_long(self, k, v):
        self.long[k] = v

# -----------------------------
# LLM 抽象（替换点）
# -----------------------------
class LLMInterface:
 def generate(self, prompt: str) -&gt; str:
 """
        这里给出一个非常简单的规则式模拟回答器。
        真实使用时：替换为 OpenAI/其它模型的调用代码，返回 model 文本。
        """
 # 极简解析示例：识别是否需要判断"下雨"
 if "是否下雨" in prompt or "下雨" in prompt:
 return "请先查询天气；如果有雨，请生成提醒并发送给目标联系人。"
 if "生成提醒" in prompt:
 return "请提醒小王：明天北京有雨，请带伞。"
 return "我理解了。"

# -----------------------------
# 工具注册与模拟工具
# -----------------------------
class ToolRegistry:
 def __init__(self):
        self.tools: Dict[str, Callable[..., Any]] = {}

 def register(self, name: str, fn: Callable[..., Any]):
        self.tools[name] = fn

 def call(self, name: str, *args, **kwargs):
 if name not in self.tools:
 raise ValueError(f"工具未注册: {name}")
 return self.tools[name](*args, **kwargs)

# 模拟工具：天气查询（真实情况会调用天气 API）
def mock_weather_api(city: str, date: str) -&gt; Dict[str, Any]:
 # 简单规则：如果 city 包含 "北京" 且 date 包含 "明天"，返回下雨示例
 if "北京" in city and "明天" in date:
 return {"city": city, "date": date, "cond": "雨", "precip_mm": 5}
 return {"city": city, "date": date, "cond": "晴", "precip_mm": 0}

# 模拟工具：发送消息（真实情况会调用短信/邮件/企业微信等）
def mock_send_message(contact: str, message: str) -&gt; bool:
 print(f"[发送消息] to={contact} message={message}")
 return True

# 模拟工具：简单搜索（示意）
def mock_search(query: str) -&gt; str:
 return f"模拟搜索结果：关于 `{query}` 的信息摘要。"

# -----------------------------
# Planner / Executor
# -----------------------------
class SimplePlanner:
 def plan(self, goal: str) -&gt; List[Dict[str, Any]]:
 """
        将目标拆解为步骤列表（非常简化的实现）
        每一步包含：action(工具名或内部动作)、params
        """
        steps = []
 # 例：若提示包含"天气"，生成两个步骤：查天气、判断并可能发提醒
 if "天气" in goal or "下雨" in goal:
            steps.append({"action": "query_weather", "params": {"city": "北京", "date": "明天"}})
            steps.append({"action": "decide_and_notify", "params": {"contact_name": "小王"}})
 else:
            steps.append({"action": "search", "params": {"query": goal}})
 return steps

class Executor:
 def __init__(self, tools: ToolRegistry, memory: Memory, llm: LLMInterface):
        self.tools = tools
        self.memory = memory
        self.llm = llm

 def run_step(self, step: Dict[str, Any]):
        action = step["action"]
        params = step.get("params", {})
 if action == "query_weather":
            res = self.tools.call("weather", params["city"], params["date"])
            self.memory.set_short("last_weather", res)
 return res
 if action == "decide_and_notify":
            weather = self.memory.get_short("last_weather", {})
 # 简单规则决策
 if weather.get("cond") == "雨":
 # 让 LLM 生成提醒文本（示例）
                prompt = f"基于天气信息：{weather}，生成一条发给{params['contact_name']}的提醒。"
                reminder = self.llm.generate(prompt)
 # 从长期记忆中获取联系方式
                contact = self.memory.get_long(params["contact_name"]) or "13800000000"
                ok = self.tools.call("send_message", contact, reminder)
 return {"notified": ok, "message": reminder}
 else:
 return {"notified": False, "reason": "天气晴朗"}
 if action == "search":
 return self.tools.call("search", params["query"])
 raise ValueError(f"未知动作: {action}")

# -----------------------------
# Agent 本体
# -----------------------------
class SimpleAgent:
 def __init__(self):
        self.memory = Memory()
        self.tools = ToolRegistry()
        self.llm = LLMInterface()
        self.planner = SimplePlanner()
        self.executor = Executor(self.tools, self.memory, self.llm)
 # 注册默认工具
        self.tools.register("weather", mock_weather_api)
        self.tools.register("send_message", mock_send_message)
        self.tools.register("search", mock_search)
 # 假设长期记忆里存了小王的联系方式
        self.memory.set_long("小王", "13911112222")

 def handle(self, user_prompt: str):
 # 1) 大脑解析（用 LLM 抽象）
        intent = self.llm.generate(user_prompt)
 # 2) 规划
        steps = self.planner.plan(user_prompt)
 # 3) 逐步执行
        results = []
 for step in steps:
            r = self.executor.run_step(step)
            results.append({"step": step, "result": r})
 # 4) 输出合并
 return {"intent": intent, "steps": results}

# -----------------------------
# 运行示例
# -----------------------------
if __name__ == "__main__":
    agent = SimpleAgent()
    task = "查一下明天北京的天气，如果下雨，帮我写个提醒并发给小王。"
    out = agent.handle(task)
 import json
 print(json.dumps(out, ensure_ascii=False, indent=2))</code></pre>

<p id="t-kUaQLGkkcDwULpsSMfGqW2"><span style="font-weight:bold">说明：</span></p>

<ol start="1"><li id="t-FGYGi8CVC74Qverw9Q848p"><span style="font-weight:bold">LLM 抽象</span><span>：</span><span>LLMInterface.generate()</span><span> 是可替换点。把这里换成对接 OpenAI、Claude 或本地 LLM 的代码即可。</span></li></ol>

<ol start="2"><li id="t-OIrEpRqo8wdzEMDvFHqkCq"><span style="font-weight:bold">规划器（Planner）</span><span>：负责把自然语言目标拆成有序步骤。入门可以用规则或模板；进阶可用 LLM 输出步骤并解析为动作。</span></li></ol>

<ol start="3"><li id="t-Fo13b1VkGhLdy0gRzhltqM"><span style="font-weight:bold">工具层（Tools）</span><span>：每个工具是独立函数，统一注册到 </span><span>ToolRegistry</span><span>。真实项目中可能是 HTTP 请求、SDK 调用、数据库读写等。</span></li></ol>

<ol start="4"><li id="t-yQGxTjD48YbbV34mectYs8"><span style="font-weight:bold">记忆（Memory）</span><span>：区分短期/长期。短期用于当前任务中间结果，长期用于联系人、偏好等。</span></li></ol>

<ol start="5"><li id="t-c7FXRoD225jaboReby0a5K"><span style="font-weight:bold">执行器（Executor）</span><span>：把步骤映射为工具调用并处理返回值、失败和重试逻辑。</span></li></ol>


<a id="section-1306"></a>
## 构建你的第一个 AI Agent：任务规划助手

<a id="t-eD3PGAFzqI99NzyMiTVqnx"></a>

<p id="t-f0qlXDjzM66zzgLp41qESW"><span>我们将构建一个 </span><span style="font-weight:bold">任务规划助手</span><span>。它的目标是：根据用户给出的一个复杂任务（例如：我想去旅行），自动将其分解成一系列有序的、可执行的具体步骤。</span></p>

<p id="t-QANDsqUcHxusrKVlNsAPRF"><span>目录结构如下：</span></p>

<div id="t-CkvpxN2PtjGDJBzeTS84cc"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/ef1cdb72cfa556947cb8aac8.png"/></div>


<a id="section-1307"></a>
## 第一步：搭建智能大脑

<a id="t-NSvbRt8iP5n06egCqfJLEJ"></a>

<p id="t-hc8N7Heh0FdtuAuuzMMLWc"><span>Agent 的大脑需要推理能力。我们将使用 OpenAI 的 GPT 模型（通过 API 调用）作为我们 Agent 的大脑。</span></p>

<p id="t-QfDzE3Ra1vHmGtfYxegXrg"><span>你需要准备一个 OpenAI API 密钥，也可以使用 DeepSeek 的 API key，可以兼容。</span></p>

<p id="t-i9uOudGYMsfUDL9uuLHHWz"><span>本章节测试示例使用了 DeepSeek 的 API key， 我们可以先去 </span><span>https://platform.deepseek.com/api_keys</span><span> 申请 。</span></p>

<blockquote id="t-v1jbvvJtRITmaV7Q6IPUyC"><blockquote id="t-gV1tenlFI0m7UG3Q4TN473"><span style="font-style:italic">也可以直接使用百炼与方舟的 Coding Plan 套餐：</span><span style="font-style:italic">https://www.runoob.com/claude-code/coding-plan.html</span><span style="font-style:italic">。</span></blockquote></blockquote>

<p id="t-OffhwHKKJHYbqP3ckMTlSX"><span>首先，安装必要的库：</span></p>

<pre id="t-MwngBP70JNPTyIP1tI4q49"><code>pip3 install openai</code></pre>

<p id="t-VGqHe5HE7bjj5AbPerUEPp"><span>可以使用以下代码测试使用运行成功：</span></p>


<a id="section-1308"></a>
## 实例

<a id="t-7w9p2ReFm5L8o2C3b2JeGH"></a>

<pre id="t-aY8OMKMlfZwMsOMkdvDWhc"><code>import os
from openai import OpenAI


DEEPSEEK_API_KEY = "sk-xxxxxxx" # 这里设置你申请的 key
DEEPSEEK_API_URL = "https://api.deepseek.com/v1"

client = OpenAI(
    api_key = DEEPSEEK_API_KEY,
    base_url = DEEPSEEK_API_URL)

response = client.chat.completions.create(
    model="deepseek-v4-flash",
    messages=[
 {"role": "system", "content": "You are a helpful assistant"},
 {"role": "user", "content": "Hello"},
 ],
    stream=False
)

print(response.choices[0].message.content)</code></pre>

<p id="t-w7pTPfuhJhyAxYLlwmFxqk"><span>如果安装配置成功会输出类似如下内容：</span></p>

<pre id="t-KHlpPQSktWbkT4G8fIZ6sN"><code>Hello! How can I assist you today?</code></pre>

<p id="t-Bh1xB9D0nqpP5lqQ8ae2rK"><span>然后，让我们创建一个最简单的大脑模块：</span></p>


<a id="section-1309"></a>
## brain.py 文件代码

<a id="t-dYMlRqEqhHeAY15rvnNFaj"></a>

<pre id="t-5vdiFnDhMqUlxUVKh8lfFQ"><code># brain.py
from openai import OpenAI
import os


DEEPSEEK_API_KEY = "sk-xxxxxxx" # 这里设置你申请的 key
DEEPSEEK_API_URL = "https://api.deepseek.com/v1"

client = OpenAI(
    api_key = DEEPSEEK_API_KEY,
    base_url = DEEPSEEK_API_URL)

class AgentBrain:
 """Agent 的大脑，负责思考与决策"""

 def __init__(self, model="deepseek-v4-flash"):
        self.model = model

 def think(self, prompt):
 """核心思考函数：接收提示，返回模型的思考结果"""
 try:
 # 使用客户端调用 Chat Completions API（v1.x 版本写法）
            response = client.chat.completions.create(
                model=self.model,
                messages=[{"role": "user", "content": prompt}],
                temperature=0.5, # 控制创造性，越低越专注
                max_tokens=500 # 控制回复长度
 )
 # 提取模型返回的文本内容（v1.x 版本属性路径变更）
            reasoning = response.choices[0].message.content
 return reasoning.strip()
 except Exception as e:
 return f"思考过程出错: {e}"

# 简单测试一下大脑是否工作
if __name__ == "__main__":
    brain = AgentBrain()
    test_prompt = "你好，请简单介绍一下你自己。"
 print("测试提问：", test_prompt)
 print("大脑回复：", brain.think(test_prompt))</code></pre>

<p id="t-y34S0uESBKNTE3mLExi3bE"><span style="border-bottom:1px solid">执行以上代码，输出结果大概如下：</span></p>

<pre id="t-paTqxnBXZQDadob5zZsUXa"><code>测试提问： 你好，请简单介绍一下你自己。
大脑回复： 你好！我是DeepSeek，由深度求索公司创造的AI助手，很高兴认识你！&amp;#x1f60a;

让我简单介绍一下自己：

**我的特点：**
**完全免费**：目前没有任何收费计划，你可以放心使用
**知识丰富**：知识截止到2024年7月，涵盖各个领域
**对话能力强**：支持128K上下文，可以进行长篇深入对话</code></pre>

<p id="t-GosNwSiOEVJGWueyId1DqO"><span style="font-weight:bold">代码解析</span><span>：</span></p>

<ol start="1"><li id="t-q9TyCJZ4LkVJwlWbN4DoZG"><span>我们创建了一个 </span><span>AgentBrain</span><span> 类来封装与 LLM 的交互。</span></li></ol>

<ol start="2"><li id="t-6GQXg1jSniCEr5zZatZX1A"><span>think</span><span> 方法是核心，它接收一个字符串 </span><span>prompt</span><span>（提示词），将其发送给 GPT API。</span></li></ol>

<ol start="3"><li id="t-OQbL2vbQbAc6x3GroEGEdD"><span>temperature</span><span> 参数很重要：设置为 0.5 能让 Agent 在创造性和稳定性之间取得平衡，适合做规划任务。</span></li></ol>

<ol start="4"><li id="t-rZarxcmisojut32TUrCFMX"><span>最后返回模型生成的文本，这就是 Agent 思考的结果。</span></li></ol>


<a id="section-1310"></a>
## 第二步：定义手脚：工具与行动

<a id="t-tDCS0hvDCCrtGzDBOoZysy"></a>

<p id="t-od8QaA8apJLXDpywotjp6C"><span>Agent 需要有执行能力。我们为它定义几个简单的工具（函数），让它能够动手做事。</span></p>


<a id="section-1311"></a>
## tools.py 文件代码

<a id="t-f4TapOrtRYSSc8EC3fCwvh"></a>

<pre id="t-sgunGtfS2TB5C3tr2iyOy0"><code># tools.py
import datetime

class AgentTools:
 """Agent 可以使用的工具集合"""

 @staticmethod
 def search_web(query):
 """模拟网络搜索工具（此处为模拟）"""
        mock_results = {
 "旅行目的地推荐": "巴黎、东京、马尔代夫、云南丽江...",
 "北京天气": "明天晴，气温 15-25°C，微风。",
 "Python 教程": "推荐菜鸟教程等网站。"
 }
 for key, value in mock_results.items():
 if key in query:
 return f"[网络搜索] 关于 '{query}' 的结果：{value}"
 return f"[网络搜索] 未找到 '{query}' 的明确信息。"

 @staticmethod
 def make_schedule(steps):
 """制定日程计划工具"""
        schedule = "生成的日程计划：\n"
 for i, step in enumerate(steps, 1):
            schedule += f"{i}. {step}\n"
 return schedule

 @staticmethod
 def get_current_time():
 """获取当前时间工具"""
        now = datetime.datetime.now()
 return f"[系统时间] 现在是：{now.strftime('%Y-%m-%d %H:%M:%S')}"

 @staticmethod
 def calculate(expression):
 """简单计算器工具（安全版本，修复兼容性问题）"""
 try:
 # 1. 严格过滤非法字符（仅允许数字、基础运算符、括号、空格）
            allowed_chars = set("0123456789+-*/(). ")
 if not all(c in allowed_chars for c in expression):
 return "[计算器] 表达式包含非法字符，拒绝计算。"

 # 2. 简化安全校验：移除易出错的 ast.walk 逻辑，改用基础语法检查
 # 先替换空格，避免空表达式
            clean_expr = expression.strip().replace(" ", "")
 if not clean_expr:
 return "[计算器] 表达式不能为空。"

 # 3. 安全执行计算（限制内置函数，仅保留基础运算）
 # 自定义安全的全局环境，仅允许基础数学运算
            safe_globals = {
 '__builtins__': {},
 'pow': pow,
 'abs': abs
 }
 # 使用 eval 但严格限制环境，且已过滤非法字符，大幅降低风险
            result = eval(clean_expr, safe_globals)
 return f"[计算器] {expression} = {result}"

 except ZeroDivisionError:
 return "[计算器] 错误：除数不能为零。"
 except SyntaxError:
 return "[计算器] 表达式语法错误（如括号不匹配、运算符错误）。"
 except Exception as e:
 return f"[计算器] 计算错误: {str(e)}"

# 测试工具
if __name__ == "__main__":
 print(AgentTools.search_web("北京天气"))
 print(AgentTools.get_current_time())
 print(AgentTools.calculate("3 + 5 * 2")) # 正常计算
 print(AgentTools.calculate("10 / 0")) # 除零错误
 print(AgentTools.calculate("__import__('os').system('ls')")) # 非法字符过滤</code></pre>

<p id="t-NltjNcWvjbplHDPPfviatG"><span style="font-weight:bold">代码解析</span><span>：</span></p>

<ol start="1"><li id="t-IbSsYDQpkWANkZdUcHrSfW"><span>每个 </span><span>@staticmethod</span><span> 都定义了一个 Agent 可以调用的工具。</span></li></ol>

<ol start="2"><li id="t-XXOhFrGhwkd9Ytgf63rDFs"><span>search_web</span><span> 目前是模拟的，真实场景需要接入真正的搜索 API。</span></li></ol>

<ol start="3"><li id="t-JZObhjdAlH9mJEY2oEbuzK"><span>make_schedule</span><span> 用于将任务列表格式化为计划。</span></li></ol>

<ol start="4"><li id="t-otDO3SqlbdiC90J0jT8C3u"><span style="font-weight:bold">重要安全提示</span><span>：</span><span>calculate</span><span> 工具中的 </span><span>eval()</span><span> 函数在真实产品中极其危险，必须用更安全的方式（如 </span><span>ast.literal_eval</span><span>）替换或彻底移除。这里仅为演示 Agent 如何调用函数。</span></li></ol>


<a id="section-1312"></a>
## 第三步：组装 Agent：实现核心循环

<a id="t-GhyuZ4IIcPPAjBdx8WLIeB"></a>

<p id="t-sIu3NVZVBqsopAjowYmbpX"><span>现在，我们将大脑和工具组装起来，并实现核心的决策循环。我们将设计一个简单的规则：让大脑根据任务决定使用哪个工具。</span></p>


<a id="section-1313"></a>
## 实例

<a id="t-LhimU5FJbTZ6wsSwhbfRiA"></a>

<pre id="t-s0nJd4Q3Wwmo2yKR18V6fR"><code># agent.py
from brain import AgentBrain
from tools import AgentTools

class SimpleAgent:
 """一个简单的任务规划 AI Agent"""

 def __init__(self):
        self.brain = AgentBrain()
 # 静态工具类无需实例化
        self.tools = AgentTools
 # 定义 Agent 知道的工具列表及其描述，用于提示大脑
        self.tool_descriptions = """
        你可以使用以下工具：
        1. 搜索工具：当你需要获取最新、未知的信息时使用，例如'搜索 北京天气'。
        2. 计划工具：当你需要将多个步骤整理成计划时使用，例如'制定计划 [步骤1，步骤2]'。
        3. 时间工具：当你需要知道当前时间时使用，指令就是'获取时间'。
        4. 计算工具：当你需要进行数学计算时使用，例如'计算 3+5*2'。
        """

 def run(self, user_task):
 """运行 Agent 的主循环"""
 print(f"&amp;#x1f3af; 用户任务: {user_task}")
 print("=" * 40)

 # 第一步：感知与初步思考
        initial_prompt = f"""
        你的角色是一个任务规划助手。
 {self.tool_descriptions}

        用户的任务是：{user_task}

        请严格按照以下固定格式回答，不要添加额外内容：
        思考：[简要分析任务需要什么]
        工具：[选择要使用的工具名称，如果没有合适的就写'无']
        指令：[发送给该工具的具体指令内容]
        """

        initial_response = self.brain.think(initial_prompt)
 print("&amp;#x1f9e0; 初始思考结果：")
 print(initial_response)
 print("-" * 20)

 # 第二步：解析思考结果，提取工具和指令（鲁棒性优化）
        lines = [line.strip() for line in initial_response.split('\n') if line.strip()]
        tool_to_use = "无"
        tool_instruction = ""

 for line in lines:
 if line.startswith("思考："):
 continue # 跳过思考行
 elif line.startswith("工具："):
                tool_to_use = line.replace("工具：", "").strip()
 elif line.startswith("指令："):
                tool_instruction = line.replace("指令：", "").strip()

 # 第三步：执行行动
        result = self._use_tool(tool_to_use, tool_instruction)
 print("&amp;#x1f6e0;&amp;#xfe0f;  执行结果：")
 print(result)
 print("=" * 40)

 # 第四步：整合结果并反馈给用户
        final_prompt = f"""
        用户原始任务：{user_task}
        你已经进行了思考并使用了工具。
        思考过程：{initial_response}
        工具执行结果：{result}

        现在，请生成一段完整的、对用户的最终回复，直接给出有帮助的答案或计划，语言要自然友好。
        """

        final_response = self.brain.think(final_prompt)
 print("&amp;#x1f4a1; 最终回复给用户：")
 print(final_response)

 return final_response

 def _use_tool(self, tool_name, instruction):
 """根据工具名称调用具体的工具函数"""
 # 统一工具名称匹配（兼容大小写/多余空格）
        tool_name = tool_name.strip()

 if tool_name == "搜索工具":
 return self.tools.search_web(instruction)
 elif tool_name == "计划工具":
 # 兼容中英文逗号、括号，处理空指令
 if not instruction:
 return "[计划工具] 未提供计划步骤，无法生成日程。"
 # 移除括号并拆分步骤（兼容 []/()/{} 括号）
            clean_instr = instruction.strip('[](){}').strip()
 # 同时支持中英文逗号拆分
            steps = [s.strip() for s in clean_instr.replace('，', ',').split(',') if s.strip()]
 return self.tools.make_schedule(steps)
 elif tool_name == "时间工具":
 return self.tools.get_current_time()
 elif tool_name == "计算工具":
 return self.tools.calculate(instruction)
 elif tool_name == "无":
 return "[系统] 无需使用工具，直接回答用户即可。"
 else:
 return f"[系统] 未知工具：{tool_name}，无法执行。"

# 运行我们的 Agent！
if __name__ == "__main__":
 print("&amp;#x1f916; 启动 SimpleAgent...")
    my_agent = SimpleAgent()

 # 测试几个不同的任务
    test_tasks = [
 "我想去旅行，帮我规划一下需要准备什么",
 "现在几点了？",
 "计算一下 15 的平方加上 20 的三分之一是多少",
 ]

 for task in test_tasks:
        my_agent.run(task)
 print("\n" + "#" * 50 + "\n")</code></pre>

<p id="t-1Ov5vd4Mmd6rs9bIAPvtUb"><span># agent.py</span></p>

<pre id="t-dViLCTdS5euqqnfpK1qUrs"><code>启动 SimpleAgent...
用户任务: 我想去旅行，帮我规划一下需要准备什么
========================================
初始思考结果：
思考：用户需要规划旅行前的准备工作。这是一个通用任务，不需要最新信息或计算，但需要将多个准备步骤整理成一个清晰的计划。

工具：计划工具

指令：制定计划 [1. 确定目的地和旅行时间，2. 预订交通票（机票/火车票）和住宿，3. 准备旅行证件（身份证、护照、签证等），4. 安排行程和景点门票，5. 打包行李（衣物、洗漱用品、药品、充电器等），6. 安排家中事务（宠物、植物、邮件等），7. 兑换货币或准备支付方式，8. 购买旅行保险]
--------------------
执行结果：
...</code></pre>

<p id="t-ID7Jx32sQ5kprb9MqC6LBl"><span style="font-weight:bold">代码解析与运行流程</span><span>：</span></p>

<ol start="1"><li id="t-OrblKAKdDvrEJPZuNET4lp"><span style="font-weight:bold">初始化</span><span>：Agent 创建了自己的大脑 (</span><span>AgentBrain</span><span>) 和工具箱 (</span><span>AgentTools</span><span>)。</span></li></ol>

<ol start="2"><li id="t-9cQtKQ7qaHyB5WU9nYNwUx"><span style="font-weight:bold">接收任务</span><span>：</span><span>run</span><span> 方法启动，接收 </span><span>user_task</span><span>（如"我想去旅行"）。</span></li></ol>

<ol start="3"><li id="t-bZHoFNIv6dtaA1g9rx1cbk"><span style="font-weight:bold">思考阶段</span><span>：将任务和工具描述组合成 </span><span>initial_prompt</span><span>，发送给大脑。大脑返回的文本中包含了它选择的"工具"和给工具的"指令"。</span></li></ol>

<ol start="4"><li id="t-11IBeSy9pji4imhHnG6JRV"><span style="font-weight:bold">行动阶段</span><span>：</span><span>_use_tool</span><span> 函数根据大脑的选择，调用对应的工具函数并返回结果。</span></li></ol>

<ol start="5"><li id="t-8cq2VdHoKa7lDfMOIyXAQZ"><span style="font-weight:bold">反馈与总结</span><span>：将原始任务、思考过程和行动结果再次发送给大脑，让它生成一个对用户友好的最终回复。</span></li></ol>

<p id="t-RyWjc0JerkSChqduRUtsvt"><span>运行这个程序，你会看到 Agent 如何一步步分析任务、选择工具、执行并给出答案。</span></p>


<a id="section-1314"></a>
## 实践练习：升级你的 Agent

<a id="t-Rv8nsrOgwFowEO1qSsqPUK"></a>

<p id="t-L4AtLu3tzELObp0EHzc8KX"><span>你已经拥有了一个能跑通的 AI Agent！但这只是起点。尝试完成以下练习，让它变得更强大：</span></p>

<ol start="1"><li id="t-dEYGKoBmnKdzeGuzcW2voD"><span style="font-weight:bold">练习一：增加记忆功能</span></li></ol>

<ul><li id="t-L5J6pwSUot8NaTvHo2h967"><span style="font-weight:bold">目标</span><span>：让 Agent 能记住对话历史。</span></li></ul>

<ul><li id="t-rf0DcGZGUFBg2TeBcSgTVx"><span style="font-weight:bold">提示</span><span>：在 </span><span>SimpleAgent</span><span> 类中添加一个 </span><span>self.conversation_history = []</span><span> 列表。每次调用 </span><span>brain.think</span><span> 时，不仅发送当前提示，还将之前的历史对话也作为上下文发送。执行后，将新的对话回合（用户输入、AI 思考、工具结果）加入历史列表。</span></li></ul>

<ol start="2"><li id="t-QH2stNmQKRAXsIGibq2ehN"><span style="font-weight:bold">练习二：实现自动工具选择</span></li></ol>

<ul><li id="t-67guk1xAcCArzDosrcgagv"><span style="font-weight:bold">目标</span><span>：让大脑的回复是标准的 JSON 格式，便于程序自动解析，而不是依赖文本提取。</span></li></ul>

<ul><li id="t-gPATPcDh0z1D6bGTpEdPDB"><span style="font-weight:bold">提示</span><span>：修改提示词，要求大脑必须返回如 </span><span>{"thought": "…"， "tool": "…"， "instruction": "…"}</span><span> 的 JSON 字符串。然后在代码中使用 </span><span>json.loads()</span><span> 来解析，提高稳定性和准确性。</span></li></ul>

<ol start="3"><li id="t-yilRfCheyIL092r87u6Zrs"><span style="font-weight:bold">练习三：添加一个新工具</span></li></ol>

<ul><li id="t-oPq4khUSST3S8RweFIUZL4"><span style="font-weight:bold">目标</span><span>：让 Agent 能处理待办事项。</span></li></ul>

<ul><li id="t-yNsVSrelEDtlN9JKfDtkDf"><span style="font-weight:bold">提示</span><span>：在 </span><span>AgentTools</span><span> 类中添加 </span><span>todo_list = []</span><span> 和两个新方法：</span><span>add_todo(item)</span><span> 和 </span><span>show_todos()</span><span>。在工具描述中告诉大脑这个新工具的存在，并更新 </span><span>_use_tool</span><span> 方法来调用它。</span></li></ul>


<a id="section-1315"></a>
## 总结与展望

<a id="t-pSgsf3Ea5wRDKe4ohreMSZ"></a>

<p id="t-W7WSP9afAzf5KBSrdznZpq"><span>恭喜你！你已经成功构建了一个具备基本 </span><span style="font-weight:bold">感知-思考-行动</span><span> 循环的 AI Agent。我们回顾一下关键点：</span></p>

<ul><li id="t-QCVoc7gVUD4VLnqFJFaQc6"><span style="font-weight:bold">核心概念</span><span>：AI Agent = 大脑（LLM） + 感知 + 行动 + 目标。</span></li></ul>

<ul><li id="t-wbtcikCicOQafulaRufOOI"><span style="font-weight:bold">实现关键</span><span>：</span></li></ul>

<ol start="1"><li id="t-8PW31NflSzXDuS8G6cRnqi"><span style="font-weight:bold">大脑</span><span>：通过 API 调用 LLM（如 GPT）进行推理。</span></li></ol>

<ol start="2"><li id="t-8RJ3mVb9OPeLmBmrb27vru"><span style="font-weight:bold">工具</span><span>：将具体能力封装成函数，供 Agent 调用。</span></li></ol>

<ol start="3"><li id="t-mEbfyApjPGBAGtmn0zoHYw"><span style="font-weight:bold">循环</span><span>：用代码逻辑将思考、决策、执行串联起来。</span></li></ol>

<p id="t-SiWm9F8TVylFURGeSC9uZW"><span>这只是 AI Agent 世界的冰山一角。工业级框架如 </span><span style="font-weight:bold">LangChain</span><span>、</span><span style="font-weight:bold">AutoGen</span><span> 提供了更强大的工具集成、记忆管理、多 Agent 协作等功能。</span></p>


<a id="section-1361"></a>
## Python 智能体环境配置

<a id="t-block-21451"></a>

<p id="t-Q0rKWtjNCmriJSWtzH1Gk2"><span>在开始构建 AI Agent 之前，我们需要搭建合适的开发环境。</span></p>

<p id="t-IkBO23HoijOKWY7sKXt6ak"><span>Python 是 AI 和机器学习领域最流行的语言，拥有丰富的库和工具支持。</span></p>


<a id="section-1362"></a>
## Python 版本选择

<a id="t-MfwJhIK8tEcLOy64IHULYd"></a>

<p id="t-MtbY7aB2rv6AAolVXoukvW"><span>对于 AI Agent 开发，我们推荐使用 </span><span style="font-weight:bold">Python 3.9 或更高版本</span><span>。</span></p>

<p id="t-2CnWdil5HFyfuHboGozbrl"><span>以下版本是常见选择：</span></p>

<ul><li id="t-O2fMCD0jKA2kWi53RrzTsN"><span style="border-bottom:1px solid;font-weight:bold">Python 3.9</span><span>：稳定性好，兼容性最佳</span></li></ul>

<ul><li id="t-MR2AyLpjanZPqwvjL9cJdF"><span style="border-bottom:1px solid;font-weight:bold">Python 3.10</span><span>：性能改进，新特性</span></li></ul>

<ul><li id="t-9zlQnI97N7VhWq7ozze7zz"><span style="border-bottom:1px solid;font-weight:bold">Python 3.11+</span><span>：最新版本，性能最佳</span></li></ul>

<p id="t-Gk6M1btAFGuQSpiTkfKKXt"><span style="font-weight:bold">注意</span><span>：某些库可能对 Python 版本有特定要求，建议查看官方文档。</span></p>


<a id="section-1363"></a>
## 安装 Python

<a id="t-Y9xpb7Ww50wOVD11yKAIsX"></a>

<a id="t-qwT8x8JMpGds6Th340a0hc"></a>

##### Windows 系统

<ul><li id="t-TGuoS4EzkOKHIjkG4F2uYr"><span>访问</span><span style="border-bottom:1px solid">Python 官网</span></li></ul>

<ul><li id="t-WunzCV8e0AGPJIwmFidTEB"><span>下载最新版本的 Python 安装程序（3.9 或更高版本）</span></li></ul>

<ul><li id="t-gpRC7hdpeQWHTIpnc38hJv"><span>运行安装程序，</span><span style="border-bottom:1px solid;font-weight:bold">务必勾选</span><span style="border-bottom:1px solid;font-weight:bold">Add Python to PATH</span></li></ul>

<ul><li id="t-JDfwOc1z78URBfFjCmUxhN"><span>完成安装后，打开命令提示符（CMD）或 PowerShell，输入：</span><span style="border-bottom:1px solid;font-weight:bold">python --version</span><span>，应显示 Python 版本号。</span></li></ul>

<a id="t-NMXfAB5tgdtRm2OVo5AxxH"></a>

##### macOS 系统

<p id="t-5EXaIsbEZ7VcJ23nEkM0VT"><span>macOS 通常预装了 Python，但可能是旧版本。推荐使用 Homebrew 安装：</span></p>

<pre id="t-DrxBEvoaVT6MS83lUWz8o8"><code># 安装 Homebrew（如果尚未安装）
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 安装 Python
brew install python@3.9

# 验证安装
python3 --version</code></pre>

<a id="t-xi75qbFUI3zmtYzKpbGrQ9"></a>

##### Linux 系统

<p id="t-WyFwS5MYnkAFkZ5W0oTVCu"><span style="border-bottom:1px solid">大多数 Linux 发行版已预装 Python。如需要特定版本：</span></p>

<pre id="t-X57fJiYV2ABOn00uJ1XPJ5"><code># Ubuntu/Debian
sudo apt update
sudo apt install python3.9 python3-pip

# CentOS/RHEL
sudo yum install python39 python39-pip

# 验证安装
python3 --version</code></pre>


<a id="section-1364"></a>
## 虚拟环境配置

<a id="t-3QeJmJOTQweSTKhDhR5fBs"></a>

<p id="t-kiCzGxR4DkKQvBDV6NgYih"><span>使用虚拟环境可以隔离不同项目的依赖，避免版本冲突。</span></p>

<a id="t-7y4W4G87l5FY0GRU7nke88"></a>

##### 创建虚拟环境

<pre id="t-tXPnyqNsslTEJIFUSl01Dl"><code># 创建项目目录
mkdir ai-agent-project
cd ai-agent-project</code></pre>

<p id="t-EqFsv5vXCp8B2vSxxsJ84f"><span>使用 uv 创建并激活虚拟环境，更多相关内容可以阅读 </span><span>uv 教程</span><span>。</span></p>

<p id="t-eOQo5bWoD3ck7EPvxrGNre"><span>安装 uv</span></p>

<pre id="t-asmENhRLMHs9UZ0I4W3alP"><code>pip install uv</code></pre>

<p id="t-5ZcgSWjbU3vGQUKjZ07oxT"><span>使用 uv 命令创建：</span></p>

<pre id="t-DVvDLiGZLCyl7byYKeaZK8"><code># 创建名为 .venv 的虚拟环境（默认）
uv venv

# 激活环境（macOS/Linux）
source .venv/bin/activate

# 激活环境（Windows）
.venv\Scripts\activate</code></pre>

<p id="t-fo7PbDBqZQJAq1Qrb4cei6"><span>其他工具：</span></p>

<pre id="t-ynMqaKyBtfcTkdYJzHMS36"><code># 使用 venv，Python 3.3+ 内置
python -m venv venv

# 或使用 conda（如果已安装 Anaconda/Miniconda）
conda create -n ai-agent python=3.9
conda activate ai-agent</code></pre>

<a id="t-SXBX2xX6By9gCdr1FrI5x3"></a>

##### 激活虚拟环境

<p id="t-0Ieg6SXsU5XFqkZsO2xVen"><span style="font-weight:bold">Windows：</span></p>

<pre id="t-ylt2wRFsr6DKhKme56RkWh"><code>venv\Scripts\activate</code></pre>

<p id="t-Q8syPqLGpeNbGzhCfoyimq"><span style="font-weight:bold">macOS/Linux：</span></p>

<pre id="t-4mXe81h9R1Q5Dpap1Qteeh"><code>source venv/bin/activate</code></pre>

<p id="t-76ep8LqFGNUyHWTCMSAD4k"><span>激活后，命令行提示符通常会显示虚拟环境名称（如 </span><span style="font-weight:bold">(venv)</span><span>）。</span></p>

<a id="t-V3GnEBtEHz9kRfJrsVbSt6"></a>

##### 退出虚拟环境

<pre id="t-NUbWx4UhuV2xG0yRxGXCSy"><code>deactivate</code></pre>


<a id="section-1365"></a>
## 包管理工具 pip

<a id="t-LhRkS7NrnPtalJ4iwlFPa4"></a>

<p id="t-OtVVCzHIFjGStDwiefowkB"><span>pip 是 Python 的包管理工具，用于安装第三方库。</span></p>

<p id="t-LllTQ1f57Khoa5JuODaDrH"><span style="font-weight:bold">常用命令</span><span>：</span></p>

<pre id="t-WNZtTWZ5BaF5YT88u7SzqR"><code># 升级 pip 到最新版本
pip install --upgrade pip

# 安装包
pip install package_name

# 安装特定版本
pip install package_name==1.2.3

# 从 requirements.txt 安装所有依赖
pip install -r requirements.txt

# 列出已安装的包
pip list

# 生成 requirements.txt
pip freeze &gt; requirements.txt</code></pre>


<a id="section-1366"></a>
## 开发目录结构建议

<a id="t-sMg7yHEYU9uaGXMP94BP8j"></a>

<p id="t-skgm7SZMjVYDlhUBSyivfU"><span>一个良好的项目结构有助于代码管理和维护：</span></p>

<pre id="t-ll34BNcMY6epwfSpl4G070"><code>ai-agent-project/
├── .env                    # 环境变量文件（不提交到Git）
├── .gitignore             # Git忽略文件
├── requirements.txt       # 项目依赖
├── README.md             # 项目说明
├── src/                  # 源代码目录
│   ├── __init__.py
│   ├── agents/          # Agent相关代码
│   │   ├── __init__.py
│   │   ├── base_agent.py
│   │   └── weather_agent.py
│   ├── tools/           # 工具定义
│   │   ├── __init__.py
│   │   ├── calculator.py
│   │   └── web_search.py
│   ├── memory/          # 记忆系统
│   │   ├── __init__.py
│   │   ├── short_term.py
│   │   └── vector_memory.py
│   └── utils/           # 工具函数
│       ├── __init__.py
│       ├── config.py
│       └── logger.py
├── tests/               # 测试代码
│   ├── __init__.py
│   ├── test_agents.py
│   └── test_tools.py
├── examples/            # 示例代码
│   ├── basic_agent.py
│   └── multi_tool_agent.py
└── notebooks/           # Jupyter笔记本
    └── experiments.ipynb</code></pre>


<a id="section-1367"></a>
## 必备库安装

<a id="t-c3n778g1H8yHI82OYmxLFO"></a>

<p id="t-tXbHq0bOQc44OZYD3YhhLH"><span style="border-bottom:1px solid">AI Agent 开发需要一系列第三方库的支持。以下是核心库的安装方法和简要介绍。</span></p>


<a id="section-1368"></a>
## 核心库安装

<a id="t-KwlN2fygNkIbIPxsNiP6wc"></a>

<p id="t-NfCirKUCgUQX0dOvQ4Xeg2"><span style="border-bottom:1px solid">创建</span><span style="border-bottom:1px solid">requirements.txt</span><span style="border-bottom:1px solid">文件，包含以下内容：</span></p>

<pre id="t-s4tNff6Q0DQFKlksQ4SE1L"><code># 基础库
python-dotenv&gt;=1.0.0      # 环境变量管理
pydantic&gt;=2.0.0           # 数据验证和设置管理
loguru&gt;=0.7.0             # 日志记录

# AI/ML 相关
openai&gt;=1.0.0             # OpenAI API
anthropic&gt;=0.7.0          # Claude API
google-generativeai&gt;=0.3.0 # Gemini API
sentence-transformers&gt;=2.2.0 # Embedding 模型
chromadb&gt;=0.4.0           # 向量数据库

# Agent 框架
langchain&gt;=0.1.0          # LangChain 框架
langchain-community&gt;=0.0.10 # LangChain 社区工具
langchain-openai&gt;=0.0.5   # LangChain OpenAI 集成
llama-index&gt;=0.10.0       # LlamaIndex（可选）
semantic-kernel&gt;=0.9.0    # Semantic Kernel（可选）

# 工具和工具
requests&gt;=2.31.0          # HTTP 请求
beautifulsoup4&gt;=4.12.0    # HTML 解析
pandas&gt;=2.0.0             # 数据处理
numpy&gt;=1.24.0             # 数值计算

# 开发工具
pytest&gt;=7.4.0             # 测试框架
black&gt;=23.0.0             # 代码格式化
flake8&gt;=6.0.0             # 代码检查
jupyter&gt;=1.0.0            # Jupyter 笔记本</code></pre>

<p id="t-89USdCAqCXG98IBsZRMUqF"><span style="border-bottom:1px solid">安装所有依赖：</span></p>

<pre id="t-8OjX4GIdeITYDQKCiDx9mh"><code>pip install -r requirements.txt</code></pre>


<a id="section-1369"></a>
## 主要库介绍

<a id="t-mvNu85em4kHRmbfYnCr0N5"></a>

<a id="t-APwW1rxhjpp6bXviiXqikK"></a>

##### LangChain

<p id="t-a98NwkNFYrTMkqZH0JKCWr"><span style="border-bottom:1px solid">LangChain 是最流行的 AI Agent 开发框架，提供了构建链式（Chain）和代理（Agent）应用的工具。</span></p>

<pre id="t-tHUmWq0LCqgRJ9XhP8xdMX"><code># LangChain 基本使用示例
from langchain.llms import OpenAI
from langchain.chat_models import ChatOpenAI
from langchain.agents import initialize_agent, AgentType
from langchain.tools import Tool

# 初始化 LLM
llm = ChatOpenAI(temperature=0.7, model="gpt-3.5-turbo")

# 创建工具
tools = [
    Tool(
        name="计算器",
        func=lambda x: str(eval(x)),
        description="用于数学计算"
 )
]

# 创建 Agent
agent = initialize_agent(
    tools=tools,
    llm=llm,
    agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose=True
)

# 运行 Agent
result = agent.run("计算 25 的平方根")
print(result)</code></pre>

<a id="t-ua2nPwEy56VkuvyHW2x8li"></a>

##### LlamaIndex

<p id="t-4oyQGcJVgnWNPEEaOb0fuK"><span style="border-bottom:1px solid">LlamaIndex（原 GPT Index）专注于文档索引和检索，适合构建基于文档的问答系统。</span></p>

<pre id="t-TPY4VSy2qhm6LEibYnIBSc"><code># LlamaIndex 基本使用示例
from llama_index import VectorStoreIndex, SimpleDirectoryReader
from llama_index.llms import OpenAI

# 加载文档
documents = SimpleDirectoryReader("./data").load_data()

# 创建索引
index = VectorStoreIndex.from_documents(documents)

# 创建查询引擎
query_engine = index.as_query_engine()

# 查询
response = query_engine.query("文档中提到了哪些AI技术？")
print(response)</code></pre>

<a id="t-SBiSz4gHgkZ06TGEJefXLx"></a>

##### Semantic Kernel

<p id="t-EzFNejtp2c84G52l2wIFp0"><span style="border-bottom:1px solid">Semantic Kernel 是微软推出的框架，强调可扩展性和企业级应用。</span></p>

<pre id="t-OborIFMJuK0PTrS3VXbJpy"><code># Semantic Kernel 基本使用示例
import semantic_kernel as sk
from semantic_kernel.connectors.ai.open_ai import OpenAITextCompletion

# 初始化内核
kernel = sk.Kernel()
api_key = "your-openai-api-key"
kernel.add_text_completion_service(
    "dv",
    OpenAITextCompletion("text-davinci-003", api_key)
)

# 定义技能
skill = kernel.import_semantic_skill_from_directory("./skills", "ExampleSkill")

# 运行技能
context = kernel.create_new_context()
context["input"] = "介绍一下人工智能"
result = skill["Summarize"](context)
print(result)</code></pre>


<a id="section-1370"></a>
## 安装验证

<a id="t-IZfEnpQ2aGHfjZV7uNysAg"></a>

<p id="t-1EeKrG5DGkHoXoBfviKFqi"><span style="border-bottom:1px solid">创建一个验证脚本</span><span style="border-bottom:1px solid">verify_installation.py</span><span style="border-bottom:1px solid">：</span></p>


<a id="section-1371"></a>
## 实例

<a id="t-hhcrw2uC0N5uHnjFXgP0QS"></a>

<pre id="t-DrEZvtXxoQpDalUVi8iQJ6"><code># verify_installation.py
import sys

def check_package(package_name, import_name=None):
 """检查包是否安装"""
    import_name = import_name or package_name
 try:
 __import__(import_name)
 print(f"{package_name} 安装成功")
 return True
 except ImportError:
 print(f"{package_name} 未安装")
 return False

def main():
 print("检查 AI Agent 开发环境...")
 print("=" * 50)

 # 检查 Python 版本
    python_version = sys.version_info
 print(f"Python 版本: {python_version.major}.{python_version.minor}.{python_version.micro}")
 if python_version.major == 3 and python_version.minor &gt;= 9:
 print("Python 版本符合要求 (&gt;=3.9)")
 else:
 print("Python 版本不符合要求，需要 3.9 或更高版本")

 print("\n检查核心库...")

 # 基础库
    check_package("dotenv", "dotenv")
    check_package("pydantic")
    check_package("loguru")

 # AI/ML 库
    check_package("openai")
    check_package("anthropic")
    check_package("chromadb")
    check_package("sentence_transformers", "sentence_transformers")

 # Agent 框架
    check_package("langchain")
    check_package("llama_index", "llama_index")

 # 工具库
    check_package("requests")
    check_package("pandas")
    check_package("numpy")

 print("\n" + "=" * 50)
 print("环境检查完成！")

if __name__ == "__main__":
    main()</code></pre>

<p id="t-9Ovbjtky7ULFB29SVI4mbg"><span style="border-bottom:1px solid">运行验证：</span></p>

<pre id="t-4jZNr512gFCYynjDiJF1YM"><code>python verify_installation.py</code></pre>


<a id="section-1372"></a>
## 常见安装问题解决

<a id="t-31c6glHe3fgLXg0rhMJ3RU"></a>

<a id="t-gu0ckAtlT6G07We6JaLt4M"></a>

##### 安装速度慢或超时

<pre id="t-JNi4mjcXVQLhYcfTVhx6mM"><code># 使用国内镜像源
pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple

# 或使用阿里云镜像
pip install -r requirements.txt -i https://mirrors.aliyun.com/pypi/simple/</code></pre>

<a id="t-A2dxLqy3unDWNynTSwMuvG"></a>

##### 版本冲突

<pre id="t-b0qZvAGiSqNQ7P1ZXqFNq2"><code># 创建新的虚拟环境
python -m venv new_venv
source new_venv/bin/activate  # 或 venv\Scripts\activate

# 重新安装，让 pip 自动解决依赖
pip install --upgrade pip
pip install langchain openai</code></pre>

<a id="t-qV6g50azg8F5qTbHhitky5"></a>

##### 特定平台问题（如 Apple Silicon）

<pre id="t-AnWRSEVzPTp46aTyYvjq5w"><code># 对于 Apple Silicon (M1/M2/M3)，可能需要特定版本
pip install grpcio==1.48.2  # 解决某些兼容性问题

# 或使用 conda
conda install -c conda-forge grpcio</code></pre>


<a id="section-1373"></a>
## API Key 管理

<a id="t-TMk4nsouN2ROHmkv8UVi8d"></a>

<p id="t-upCUfNM7DFFtJ1knTIQKv4"><span style="border-bottom:1px solid">AI Agent 开发需要访问各种 API 服务（如 OpenAI、Anthropic、DeepSeek 等），安全、有效地管理 API Key 至关重要。</span></p>


<a id="section-1374"></a>
## 为什么需要安全管理 API Key？

<a id="t-a6obR4pxpLd24wpm4Ch30a"></a>

<ul><li id="t-icwGJZ4Del3KEqtJc8Kra3"><span style="border-bottom:1px solid;font-weight:bold">防止泄露</span><span>：API Key 泄露可能导致经济损失</span></li></ul>

<ul><li id="t-oiwnpI8H5ljQoEQBgruL09"><span style="border-bottom:1px solid;font-weight:bold">访问控制</span><span>：不同环境使用不同的 Key</span></li></ul>

<ul><li id="t-0UuCX5J8ZsAKWW821ht4eF"><span style="border-bottom:1px solid;font-weight:bold">方便配置</span><span>：团队协作时统一配置方式</span></li></ul>

<ul><li id="t-xWoNu8hjcWxBRnNuo0q02k"><span style="border-bottom:1px solid;font-weight:bold">环境隔离</span><span>：开发、测试、生产环境使用不同的 Key</span></li></ul>


<a id="section-1375"></a>
## 环境变量管理（推荐）

<a id="t-DrePF2WKmCZRUsGlY3uBOT"></a>

<p id="t-FrTqw4VtmwyY6ZrHKRgYmh"><span style="border-bottom:1px solid">使用</span><span style="border-bottom:1px solid">.env</span><span style="border-bottom:1px solid">文件管理敏感信息，不提交到版本控制系统。</span></p>

<a id="t-H5ysJ16DU5n7YMXPkbl7nt"></a>

##### 创建 .env 文件

<pre id="t-pMi1IWDZbx0ApsQn3PS6U3"><code># API Keys
OPENAI_API_KEY=sk-你的OpenAI密钥
ANTHROPIC_API_KEY=你的Claude密钥
GOOGLE_API_KEY=你的Gemini密钥
SERPAPI_API_KEY=你的搜索API密钥

# 应用配置
APP_ENV=development
LOG_LEVEL=INFO
DEBUG=true

# 数据库配置（如使用）
VECTOR_DB_PATH=./data/vector_db
MAX_MEMORY_ITEMS=1000</code></pre>

<a id="t-ly5z2xO2KJyEpC08rF5Cmf"></a>

##### 创建 .gitignore 文件

<p id="t-THXFOVg9vJ7aVnCQ9tbVLI"><span style="border-bottom:1px solid">确保</span><span style="border-bottom:1px solid">.env</span><span style="border-bottom:1px solid">文件不被提交到 Git：</span></p>

<pre id="t-cbeCFptW5EXvme9MxE9YBl"><code># Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
env/
venv/
ENV/
env.bak/
venv.bak/

# 环境变量
.env
.env.local
.env.*.local

# 数据文件
data/
*.db
*.sqlite
*.sqlite3

# 日志
logs/
*.log

# 编辑器
.vscode/
.idea/
*.swp
*.swo</code></pre>

<a id="t-XrMnci58yRzbhrWxWPfeba"></a>

##### 使用 python-dotenv 加载环境变量


<a id="section-1376"></a>
## 实例

<a id="t-xePFUg1ZKsufrpxRAQoM2F"></a>

<pre id="t-2eQpSUoRy6f2orNCxOQAHh"><code># config.py
import os
from pathlib import Path
from dotenv import load_dotenv

# 加载 .env 文件
env_path = Path('.') / '.env'
load_dotenv(dotenv_path=env_path)

class Config:
 """应用配置"""

 # API Keys
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
    ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY")
    GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
    SERPAPI_API_KEY = os.getenv("SERPAPI_API_KEY")

 # 应用配置
    APP_ENV = os.getenv("APP_ENV", "development")
    LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")
    DEBUG = os.getenv("DEBUG", "false").lower() == "true"

 # 数据库配置
    VECTOR_DB_PATH = os.getenv("VECTOR_DB_PATH", "./data/vector_db")
    MAX_MEMORY_ITEMS = int(os.getenv("MAX_MEMORY_ITEMS", "1000"))

 @classmethod
 def validate(cls):
 """验证必要配置"""
        missing = []

 if not cls.OPENAI_API_KEY:
            missing.append("OPENAI_API_KEY")

 if missing:
 raise ValueError(f"缺少必要的环境变量: {', '.join(missing)}")

# 使用示例
config = Config()
print(f"环境: {config.APP_ENV}")
print(f"调试模式: {config.DEBUG}")</code></pre>


<a id="section-1377"></a>
## 安全使用 API Key

<a id="t-Vi8l1I5UhPbG4nh7a77oUv"></a>

<a id="t-OwOROCvtn9MrgHMIIyDtqh"></a>

##### 在代码中使用环境变量

<pre id="t-daQkjjZtm1OZY1P4OuRwx9"><code>import os
from openai import OpenAI

# 从环境变量读取 API Key
api_key = os.getenv("OPENAI_API_KEY")

if not api_key:
    raise ValueError("OPENAI_API_KEY 环境变量未设置")

# 初始化 OpenAI 客户端
client = OpenAI(api_key=api_key)

# 使用客户端
response = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[{"role": "user", "content": "你好"}]
)</code></pre>

<a id="t-88O49QABvhy5FR9CFmcStw"></a>

##### 使用配置类


<a id="section-1378"></a>
## 实例

<a id="t-a3DFsuDbohcJLsHgYk71kJ"></a>

<pre id="t-HtI2K8P2fz4JtmcsY48MT0"><code>from langchain.llms import OpenAI
from langchain.chat_models import ChatOpenAI
from config import Config

class LLMClientFactory:
 """LLM 客户端工厂"""

 @staticmethod
 def create_openai_client(model="gpt-3.5-turbo", **kwargs):
 """创建 OpenAI 客户端"""
        Config.validate() # 验证配置

 return ChatOpenAI(
            model=model,
            openai_api_key=Config.OPENAI_API_KEY,
            temperature=kwargs.get("temperature", 0.7),
            max_tokens=kwargs.get("max_tokens", 1000)
 )

 @staticmethod
 def create_anthropic_client(model="claude-3-sonnet-20240229", **kwargs):
 """创建 Anthropic 客户端"""
 from langchain.chat_models import ChatAnthropic

        Config.validate()

 return ChatAnthropic(
            model=model,
            anthropic_api_key=Config.ANTHROPIC_API_KEY,
            temperature=kwargs.get("temperature", 0.7),
            max_tokens=kwargs.get("max_tokens", 1000)
 )

# 使用示例
llm = LLMClientFactory.create_openai_client()
response = llm.predict("你好，请介绍一下自己")
print(response)</code></pre>


<a id="section-1379"></a>
## 多环境配置

<a id="t-nqeyMeuswExFXhiTqBsPwZ"></a>

<p id="t-5ep2aMpo59kvuJBTHFD8Of"><span style="border-bottom:1px solid">对于大型项目，可能需要不同的环境配置：</span></p>

<a id="t-0dRgXdYWlO2XQ28tDUtNOA"></a>

##### 环境特定的 .env 文件

<pre id="t-XdmuoKp5cafBxlPcjzdOG5"><code># .env.development (开发环境)
OPENAI_API_KEY=sk-dev-key
APP_ENV=development
DEBUG=true

# .env.production (生产环境)
OPENAI_API_KEY=sk-prod-key
APP_ENV=production
DEBUG=false</code></pre>

<a id="t-xf2BoIIH8bVH4Y6sUwtgSd"></a>

##### 动态加载环境配置

<pre id="t-maYJlxR844UyVHB529swX8"><code># config_manager.py
import os
from pathlib import Path
from dotenv import load_dotenv

class ConfigManager:
    """配置管理器"""

    def __init__(self, env=None):
        self.env = env or os.getenv("APP_ENV", "development")
        self.load_config()

    def load_config(self):
        """加载配置"""
        # 先加载通用配置
        load_dotenv(dotenv_path=Path('.') / '.env')

        # 加载环境特定配置
        env_file = Path('.') / f'.env.{self.env}'
        if env_file.exists():
            load_dotenv(dotenv_path=env_file, override=True)

        # 加载本地覆盖配置（不提交到Git）
        local_file = Path('.') / f'.env.{self.env}.local'
        if local_file.exists():
            load_dotenv(dotenv_path=local_file, override=True)

    def get(self, key, default=None):
        """获取配置值"""
        return os.getenv(key, default)

# 使用示例
config = ConfigManager(env="development")
print(f"当前环境: {config.get('APP_ENV')}")
print(f"API Key: {config.get('OPENAI_API_KEY')[:10]}...")  # 只显示前10个字符</code></pre>


<a id="section-1380"></a>
## 密钥轮换和监控

<a id="t-6At7LAlsGCoDE6BByR6L4i"></a>

<p id="t-n9nQP4xZFHAxkMuJ5una4R"><span style="border-bottom:1px solid">对于生产环境，建议实施密钥轮换和监控：</span></p>

<pre id="t-S576kBop6KxzAXCx5ZXacQ"><code># key_manager.py
import os
import time
from datetime import datetime, timedelta

class APIKeyManager:
    """API Key 管理器"""

    def __init__(self):
        self.keys = {}
        self.key_history = []
        self.load_keys()

    def load_keys(self):
        """加载 API Keys"""
        # 可以从环境变量、数据库或密钥管理服务加载
        self.keys = {
            "openai": {
                "current": os.getenv("OPENAI_API_KEY"),
                "previous": os.getenv("OPENAI_API_KEY_PREVIOUS"),
                "created_at": datetime.now(),
                "rotation_days": 30  # 30天轮换一次
            },
            "anthropic": {
                "current": os.getenv("ANTHROPIC_API_KEY"),
                "previous": None,
                "created_at": datetime.now(),
                "rotation_days": 30
            }
        }

    def get_key(self, service):
        """获取当前可用的 Key"""
        key_info = self.keys.get(service)
        if not key_info:
            raise ValueError(f"未配置服务 {service} 的 API Key")

        # 检查是否需要轮换
        if self.should_rotate(key_info):
            self.rotate_key(service)

        return key_info["current"]

    def should_rotate(self, key_info):
        """检查是否需要轮换 Key"""
        rotation_days = key_info.get("rotation_days", 30)
        created_at = key_info.get("created_at", datetime.now())

        age = datetime.now() - created_at
        return age.days &gt;= rotation_days

    def rotate_key(self, service):
        """轮换 API Key"""
        # 在实际应用中，这里会从密钥管理服务获取新 Key
        print(f"轮换 {service} 的 API Key...")

        key_info = self.keys[service]
        key_info["previous"] = key_info["current"]
        # 这里应该从安全的地方获取新 Key
        # key_info["current"] = get_new_key_from_vault(service)
        key_info["created_at"] = datetime.now()

        # 记录历史
        self.key_history.append({
            "service": service,
            "rotated_at": datetime.now(),
            "old_key": key_info["previous"][:10] + "..." if key_info["previous"] else None
        })

# 使用示例
key_manager = APIKeyManager()
openai_key = key_manager.get_key("openai")
print(f"OpenAI Key: {openai_key[:10]}...")</code></pre>


<a id="section-1381"></a>
## 开发工具推荐

<a id="t-RUlUQFd7WQ359K9mEvDwi7"></a>

<p id="t-6riVIp76DJrJED4mrRN9OQ"><span style="border-bottom:1px solid">选择合适的开发工具可以大幅提高开发效率。以下是一些推荐的开发工具。</span></p>


<a id="section-1382"></a>
## 代码编辑器/IDE

<a id="t-oPzsNrIJjcZ52ov4q4JJHT"></a>

<a id="t-cNRgNeod7hzDYa7Zm2ftgS"></a>

##### Visual Studio Code（推荐）

<p id="t-4WSuCI8UkSyHoBAYRRlUEN"><span style="border-bottom:1px solid;font-weight:bold">下载地址</span><span style="border-bottom:1px solid">：</span><span style="border-bottom:1px solid">https://code.visualstudio.com/</span></p>

<p id="t-x509UeVnA3g1C8O17l8yCo"><span style="border-bottom:1px solid;font-weight:bold">推荐扩展</span><span style="border-bottom:1px solid">：</span></p>

<ul><li id="t-aWdwfau99IBEZOrYR6MskS"><span style="border-bottom:1px solid;font-weight:bold">Python</span><span>：Python 语言支持</span></li></ul>

<ul><li id="t-d3epNFGZi2s1I5kPEnUBDp"><span style="border-bottom:1px solid;font-weight:bold">Pylance</span><span>：高级 Python 语言服务器</span></li></ul>

<ul><li id="t-q9POMjzEFn0wagPmVRQtfg"><span style="border-bottom:1px solid;font-weight:bold">Jupyter</span><span>：Jupyter 笔记本支持</span></li></ul>

<ul><li id="t-9u38RIb0ocQVgauK3pLsu5"><span style="border-bottom:1px solid;font-weight:bold">GitLens</span><span>：Git 增强功能</span></li></ul>

<ul><li id="t-NPdUl3FMsmMKVaG0Hti4NR"><span style="border-bottom:1px solid;font-weight:bold">Prettier</span><span>：代码格式化</span></li></ul>

<ul><li id="t-SUAKI0Ii1qzx8ImSim2kRt"><span style="border-bottom:1px solid;font-weight:bold">Code Spell Checker</span><span>：拼写检查</span></li></ul>

<ul><li id="t-AkL297sGtu3xwC22EHJp9w"><span style="border-bottom:1px solid;font-weight:bold">Rainbow CSV</span><span>：CSV 文件高亮</span></li></ul>

<ul><li id="t-O8j2eGGym3URAjdb6Rg0Zj"><span style="border-bottom:1px solid;font-weight:bold">Thunder Client</span><span>：API 测试工具</span></li></ul>

<p id="t-UZWSD14KuE6iy085Q6EA3U"><span style="border-bottom:1px solid;font-weight:bold">VS Code 配置</span><span style="border-bottom:1px solid">（</span><span style="border-bottom:1px solid">.vscode/settings.json</span><span style="border-bottom:1px solid">）：</span></p>

<pre id="t-QhnstQ8pRHNV6GF61bEppL"><code>{
    "python.defaultInterpreterPath": "${workspaceFolder}/venv/bin/python",
    "python.terminal.activateEnvironment": true,
    "python.linting.enabled": true,
    "python.linting.pylintEnabled": false,
    "python.linting.flake8Enabled": true,
    "python.formatting.provider": "black",
    "python.formatting.blackArgs": [
        "--line-length",
        "88"
    ],
    "python.testing.pytestEnabled": true,
    "[python]": {
        "editor.formatOnSave": true,
        "editor.codeActionsOnSave": {
            "source.organizeImports": "always"
        }
    },
    "files.exclude": {
        "**/__pycache__": true,
        "**/.pytest_cache": true,
        "**/.venv": true,
        "**/venv": true
    }
}</code></pre>

<a id="t-GMLTESu4gZYBd6AREHUVq2"></a>

##### PyCharm（专业版）

<p id="t-KiY4G9l3tsQeJZwesHhwtu"><span style="border-bottom:1px solid;font-weight:bold">下载地址</span><span style="border-bottom:1px solid">：</span><span style="border-bottom:1px solid">https://www.jetbrains.com/pycharm/</span></p>

<p id="t-lWfmN6jGvAyXjlOBeMlrKB"><span style="border-bottom:1px solid;font-weight:bold">特点</span><span style="border-bottom:1px solid">：</span></p>

<ul><li id="t-HLMR8QXrZWWs1oiUxLsGQu"><span>专业的 Python IDE</span></li></ul>

<ul><li id="t-bsIz3pVTcrNk4wRqDN31M5"><span>强大的调试功能</span></li></ul>

<ul><li id="t-nzLpMcWOSMABEt6gGea97l"><span>数据库工具集成</span></li></ul>

<ul><li id="t-CR4gPFEFDDkWANnP6WpjAa"><span>科学计算支持</span></li></ul>


<a id="section-1383"></a>
## 版本控制：Git

<a id="t-pGrUlLXcZ40NamViDbVdxz"></a>

<p id="t-30PNgzik0hq2r14fevryBZ"><span style="border-bottom:1px solid">Git 是必不可少的版本控制工具。</span></p>

<p id="t-XCKta0SHIoq60H1rzke95w"><span style="border-bottom:1px solid;font-weight:bold">基础配置</span><span style="border-bottom:1px solid">：</span></p>

<pre id="t-CJSCuxBAiy0Dc5oQvTD9wj"><code># 配置用户信息
git config --global user.name "你的姓名"
git config --global user.email "你的邮箱"

# 配置默认编辑器（可选）
git config --global core.editor "code --wait"

# 创建 Git 仓库
cd ai-agent-project
git init

# 添加所有文件
git add .

# 提交
git commit -m "初始提交：AI Agent 项目"

# 连接到远程仓库（如 GitHub）
git remote add origin https://github.com/你的用户名/ai-agent-project.git
git branch -M main
git push -u origin main</code></pre>


<a id="section-1384"></a>
## 调试工具

<a id="t-tLn5k7qCbVrBga93xkKQzZ"></a>

<a id="t-67jtZ3Wo4RRWhWSEPOo0MI"></a>

##### Python 调试器（pdb）

<pre id="t-NUCDrMH5V2V3uoE4IffpOB"><code># 在代码中插入断点
import pdb

def complex_function(x):
    pdb.set_trace()  # 这里会进入调试器
    result = x * 2
    return result

# 常用 pdb 命令：
# n(ext) - 执行下一行
# s(tep) - 进入函数
# c(ontinue) - 继续执行
# l(ist) - 显示代码
# p(rint) - 打印变量值
# q(uit) - 退出调试器</code></pre>

<a id="t-pUxFoKvkcJKCY0K90jCudo"></a>

##### VS Code 调试配置

<p id="t-oT51749BysfY4czeryStRs"><span style="border-bottom:1px solid">.vscode/launch.json</span><span style="border-bottom:1px solid">：</span></p>

<pre id="t-nAomioXvdmaZvWP6usno1h"><code>{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Python: 当前文件",
            "type": "python",
            "request": "launch",
            "program": "${file}",
            "console": "integratedTerminal",
            "justMyCode": true,
            "envFile": "${workspaceFolder}/.env"
        },
        {
            "name": "Python: 测试",
            "type": "python",
            "request": "launch",
            "program": "${workspaceFolder}/tests",
            "console": "integratedTerminal",
            "justMyCode": true,
            "envFile": "${workspaceFolder}/.env"
        }
    ]
}</code></pre>


<a id="section-1385"></a>
## 测试工具

<a id="t-FVtfXBw1kj2cMBAs4GQtHh"></a>

<a id="t-9F0GD9jq9Luc03uKd78pou"></a>

##### pytest

<pre id="t-g8xbXAxS3bfEIkiqXOk86m"><code># tests/test_agent.py
import pytest
from src.agents.base_agent import BaseAgent

def test_agent_initialization():
    """测试 Agent 初始化"""
    agent = BaseAgent(name="测试Agent")
    assert agent.name == "测试Agent"
    assert agent.messages == []

def test_agent_add_message():
    """测试添加消息"""
    agent = BaseAgent()
    agent.add_message("user", "你好")

    assert len(agent.messages) == 1
    assert agent.messages[0]["role"] == "user"
    assert agent.messages[0]["content"] == "你好"</code></pre>

<p id="t-4DdeY6QTs8P6dttBedGPNV"><span style="border-bottom:1px solid">运行测试：</span></p>

<pre id="t-53yEWqTXq98pMi1tjamuaE"><code># 运行所有测试
pytest

# 运行特定测试文件
pytest tests/test_agent.py

# 运行特定测试函数
pytest tests/test_agent.py::test_agent_initialization

# 显示详细输出
pytest -v

# 显示覆盖率报告
pytest --cov=src</code></pre>


<a id="section-1386"></a>
## 代码质量和格式化

<a id="t-nb0zngdBrDEv8Itz7P8s8a"></a>

<a id="t-NsyIDkpYefsCmXV2ieIq9H"></a>

##### black（代码格式化）

<pre id="t-dSdLUWoEWEyBVAHprrkh8K"><code># 格式化所有 Python 文件
black .

# 检查哪些文件需要格式化
black --check .

# 格式化单个文件
black src/agents/base_agent.py</code></pre>

<a id="t-TpYEudko2Y3imYdUcySy4z"></a>

##### flake8（代码检查）

<pre id="t-i6ju7c8aUv0SFId877cMtp"><code># 检查代码质量
flake8 src/

# 忽略特定错误
flake8 --ignore=E501,W503 src/

# 显示错误统计
flake8 --statistics src/</code></pre>

<a id="t-5i2axzY3z8ZhE2xi32KtLH"></a>

##### pre-commit（Git 钩子）

<p id="t-BR1JjUzoskyBKpcoPJ9YFb"><span style="border-bottom:1px solid">创建</span><span style="border-bottom:1px solid">.pre-commit-config.yaml</span><span style="border-bottom:1px solid">：</span></p>

<pre id="t-sKXyoG0BXgNQIhcvarnxgV"><code>repos:
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.5.0
    hooks:
      - id: trailing-whitespace
      - id: end-of-file-fixer
      - id: check-yaml
      - id: check-added-large-files

  - repo: https://github.com/psf/black
    rev: 23.12.1
    hooks:
      - id: black

  - repo: https://github.com/pycqa/flake8
    rev: 6.1.0
    hooks:
      - id: flake8
        args: [--max-line-length=88]</code></pre>

<p id="t-zNx5FZP0MGFqlyQBu3K9hE"><span style="border-bottom:1px solid">安装 pre-commit：</span></p>

<pre id="t-ygeIPs125C3u4PJ6wTMqTv"><code>pip install pre-commit
pre-commit install</code></pre>


<a id="section-1387"></a>
## 文档工具

<a id="t-kawNU21BFxSA9t1m1CjF2c"></a>

<a id="t-otaUiR9FuwVZNq4vFWAEji"></a>

##### Jupyter Notebook

<p id="t-CSSD7OvXvwS7J9LoAqrF9p"><span style="border-bottom:1px solid">用于实验和文档：</span></p>

<pre id="t-9CT18UscQQ0fQLbk8imdLI"><code># 启动 Jupyter
jupyter notebook

# 或使用 JupyterLab
jupyter lab</code></pre>

<a id="t-LRgG8kUxK8qZXXeHkRp5tc"></a>

##### MkDocs（文档生成）

<p id="t-Xxwj3Gd8h2lN4x8PIQI2KA"><span style="border-bottom:1px solid">创建</span><span style="border-bottom:1px solid">docs/</span><span style="border-bottom:1px solid">目录和</span><span style="border-bottom:1px solid">mkdocs.yml</span><span style="border-bottom:1px solid">：</span></p>

<pre id="t-u14yjIyy2wJcH8ap7dUDYU"><code>site_name: AI Agent 项目文档
site_url: https://your-project.com
nav:
  - 首页: index.md
  - API文档: api.md
  - 使用指南: guide.md
theme: readthedocs</code></pre>

<p id="t-8Cneq6L0hrJoyoh9UleApP"><span style="border-bottom:1px solid">生成文档：</span></p>

<pre id="t-i6EtLgD0QpXAYF8s789I6Z"><code># 安装 MkDocs
pip install mkdocs mkdocs-material

# 本地预览
mkdocs serve

# 构建文档
mkdocs build</code></pre>


<a id="section-1388"></a>
## 容器化工具（可选）

<a id="t-LJQkoe3s4k463wach0g4Px"></a>

<a id="t-3Naq215p5FU1dIUyv1TJs3"></a>

##### Docker

<p id="t-sTJeBNJSBicLdAGeHQCLwD"><span style="border-bottom:1px solid">Dockerfile</span><span style="border-bottom:1px solid">：</span></p>

<pre id="t-lVaUu7enpEpumbWepqKC2s"><code>FROM python:3.9-slim

WORKDIR /app

# 复制依赖文件
COPY requirements.txt .

# 安装依赖
RUN pip install --no-cache-dir -r requirements.txt

# 复制应用代码
COPY src/ ./src/
COPY .env.example .env

# 设置环境变量
ENV PYTHONPATH=/app

# 运行应用
CMD ["python", "src/main.py"]</code></pre>

<p id="t-xm3f0sj3bfNmY6AmPuvUuz"><span style="border-bottom:1px solid">docker-compose.yml</span><span style="border-bottom:1px solid">：</span></p>

<pre id="t-K5xJDkkpqoMbz8Gxwd69gw"><code>version: '3.8'

services:
  ai-agent:
    build: .
    ports:
      - "8000:8000"
    environment:
      - OPENAI_API_KEY=${OPENAI_API_KEY}
    volumes:
      - ./data:/app/data
      - ./logs:/app/logs</code></pre>


<a id="section-1389"></a>
## 监控和日志

<a id="t-33OOiIZ7CL2u0dYzDPgIQm"></a>

<a id="t-rEbEDyWk0BSibaH8XbtLze"></a>

##### loguru（日志库）

<pre id="t-lRa3bouPZiEqLPRJoH6PCU"><code>from loguru import logger
import sys

# 配置日志
logger.remove()  # 移除默认处理器
logger.add(
    sys.stderr,
    format="&lt;green&gt;{time:YYYY-MM-DD HH:mm:ss}&lt;/green&gt; | &lt;level&gt;{level: &lt;8}&lt;/level&gt; | &lt;cyan&gt;{name}&lt;/cyan&gt;:&lt;cyan&gt;{function}&lt;/cyan&gt;:&lt;cyan&gt;{line}&lt;/cyan&gt; - &lt;level&gt;{message}&lt;/level&gt;",
    level="INFO"
)

logger.add(
    "logs/app_{time}.log",
    rotation="500 MB",  # 每500MB轮转
    retention="30 days",  # 保留30天
    compression="zip",  # 压缩旧日志
    level="DEBUG"
)

# 使用日志
logger.info("应用启动")
logger.debug(f"配置加载: {config}")
logger.error("API调用失败", exc_info=True)</code></pre>


<a id="section-1390"></a>
## AI Agent 问答实例

<a id="t-block-21631"></a>

<p id="t-AFBe9ghRXXzsDfzj04Aghk"><span>本章节我们将动手构建第一个真正的 AI Agent。</span></p>

<p id="t-3cqBCAZAPJUBRenomzmhhB"><span>我们先从一个简单的问答 Agent 开始，逐步添加更多功能。</span></p>


<a id="section-1391"></a>
## 项目结构准备

<a id="t-riNboLxDtEc3FzyfjY3iTA"></a>

<p id="t-FccpEPbpQ997fJvkTpmkNv"><span>先创建目录 </span><span style="font-weight:bold">runoob-ai-agent</span><span>：</span></p>

<pre id="t-rcSEiIUEPHKVt4rkK8IkUd"><code>mkdir runoob-ai-agent</code></pre>

<p id="t-0dNM3cNlrXFa0wFslwlv98"><span style="border-bottom:1px solid">进入目录</span><span style="border-bottom:1px solid;font-weight:bold">runoob-ai-agent</span><span style="border-bottom:1px solid">，使用 uv 命令创建虚拟环境：</span></p>

<pre id="t-81DtVPr4eD4dxsufherX6U"><code>cd runoob-ai-agent

# 创建名为 .venv 的虚拟环境（默认）
uv venv

# 激活环境（macOS/Linux）
source .venv/bin/activate

# 激活环境（Windows）
.venv\Scripts\activate</code></pre>

<p id="t-vedUJFhICddtdSx9cw0sJb"><span style="border-bottom:1px solid">使用 uv 创建并激活虚拟环境，更多相关内容可以阅读</span><span style="border-bottom:1px solid">uv 教程</span><span style="border-bottom:1px solid">。</span></p>

<p id="t-cqFMo7t5qntbY6OPFF5ZnM"><span style="border-bottom:1px solid">创建项目目录结构：</span></p>

<pre id="t-1LzvsqtHolMxwbPU2vY9za"><code>runoob-ai-agent/
├── .env
├── .gitignore
├── requirements.txt
├── test_basic_agent.py
├── README.md
├── src/
│   ├── __init__.py
│   └── simple_agent.py
└── tests/
    └── __init__.py</code></pre>

<div id="t-CDajfiHFJaXD20wu0qTHLI"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/bb95359ecc8beab001512d1e.png"/></div>


<a id="section-1392"></a>
## 阿里百炼申请 API key

<a id="t-w9NF9eFN3tgXIubIdvl4I9"></a>

<p id="t-aIGUCM2h4WB8rxPRyzTwmE"><span style="border-bottom:1px solid">本章节要用到搜索功能，我们阿里千问模型，因为它自带搜索功能。</span></p>

<p id="t-0xlMA0PbqmI2EI2v82wuTG"><span style="border-bottom:1px solid">阿里云百炼的通义千问模型支持 OpenAI 兼容接口，您只需调整 API Key、BASE_URL 和模型名称，即可将原有 OpenAI 代码迁移至阿里云百炼服务使用。</span></p>

<ul><li id="t-GS106rfwM2DIeSUHjsUhCd"><span>base_url：替换为 https://dashscope.aliyuncs.com/compatible-mode/v1</span></li></ul>

<ul><li id="t-oHoVdypmFSqu8CT0tJmd3m"><span>api_key：替换为阿里云百炼 API Key</span></li></ul>

<ul><li id="t-6stELqJatgYuZfHjA3jHPu"><span>model: 替换为 qwen3-max</span></li></ul>

<p id="t-YAChSibIfJQV1V7CuweMua"><span style="border-bottom:1px solid">参考地址：</span><span style="border-bottom:1px solid">https://help.aliyun.com/zh/model-studio/compatibility-of-openai-with-dashscope</span></p>

<p id="t-7xxnatkGNr6XUdXd8rUb5V"><span style="border-bottom:1px solid">我们需要开通阿里云百炼模型服务并获得 API-KEY。</span></p>

<p id="t-eoNPY7Q5N5yfZszfUmBqjG"><span style="border-bottom:1px solid">我们可以先使用阿里云主账号访问百炼模型服务平台：</span><span style="border-bottom:1px solid">https://bailian.console.aliyun.com/</span><span style="border-bottom:1px solid">，然后点击右上角登录，登录成功后点击右上角的齿轮⚙️图标，选择 API key，然后复制 API key，如果没有也可以创建 API key：</span></p>

<div id="t-zXsKYQJTW13hs9cQrBNGNz"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/ab3c2d398bc238b3dc234e15.png"/></div>

<div id="t-KWX83PobC1hokTB6gMauEC"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/34085335ae01fe78511f6dab.png"/></div>

<p id="t-eTquwfwKlH7AJAQPdLGPHq"><span style="border-bottom:1px solid">开通阿里云百炼不会产生费用，仅模型调用（超出免费额度后）、模型部署、模型调优会产生相应计费。</span></p>

<p id="t-DrGMHAhbIpk1vo8pfKjjPa"><span style="border-bottom:1px solid">现在要使用 API，都需要按 token 来计费，还好都不贵，可参考平台的 API 使用与计费说明：</span><span style="border-bottom:1px solid">阿里云百炼大模型服务平台</span><span style="border-bottom:1px solid">。</span></p>

<div id="t-EgU8qR59cQSbfHdZtfYmVW"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/52879127b872c73c098f6adf.png"/></div>

<blockquote id="t-al1jXRZWoovQ15I1NmK1Da"><p id="t-tU27agcRLyUIUhMFeVKzJR"><span style="border-bottom:1px solid;font-style:italic">也可以直接使用百炼与方舟的 Coding Plan 套餐：</span><span style="border-bottom:1px solid;font-style:italic">https://www.runoob.com/claude-code/coding-plan.html</span><span style="border-bottom:1px solid;font-style:italic">。</span></p></blockquote>

<p id="t-sezhjvKBDLC5ZHJPC3CYEn"><span style="border-bottom:1px solid;font-weight:bold">创建基础 Agent 类：</span></p>


<a id="section-1393"></a>
## 实例

<a id="t-g1NLRRcmAxjCgsLX0hzh9K"></a>

<pre id="t-9qNPayc8B9jjApuprkz3vV"><code># src/simple_agent.py
import os
from typing import List, Dict, Any
from openai import OpenAI
from dotenv import load_dotenv

# 加载环境变量
load_dotenv()

class SimpleQAAgent:
 """简单的问答 Agent"""

 def __init__(self, model: str = "qwen3-max"): # 设置默认为 DeepSeek 的 模型
 """
        初始化 Agent

        Args:
            model: 使用的模型名称，默认为 DeepSeek
        """
 # api_key = os.getenv("OPENAI_API_KEY")
        api_key = "sk-xxx" # 你申请的 API key
        base_url = "https://dashscope.aliyuncs.com/compatible-mode/v1"
 if not api_key:
 raise ValueError("请设置 OPENAI_API_KEY 环境变量")

        self.client = OpenAI(
                        api_key = api_key,
                        base_url = base_url)
        self.model = model
        self.conversation_history: List[Dict[str, str]] = []
        self.system_prompt = "你是一个有帮助的AI助手，请礼貌、准确地回答用户的问题。"

 def add_to_history(self, role: str, content: str):
 """添加消息到对话历史"""
        self.conversation_history.append({
 "role": role,
 "content": content
 })

 # 保持历史长度不超过10轮（防止token超限）
 if len(self.conversation_history) &gt; 10:
            self.conversation_history = self.conversation_history[-10:]

 def ask(self, question: str) -&gt; str:
 """
        向 Agent 提问

        Args:
            question: 用户的问题

        Returns:
            Agent 的回答
        """
 # 添加用户问题到历史
        self.add_to_history("user", question)

 # 准备消息列表
        messages = [
 {"role": "system", "content": self.system_prompt}
 ]
        messages.extend(self.conversation_history)

 try:
 # 调用 OpenAI API
            response = self.client.chat.completions.create(
                model=self.model,
                messages=messages,
                temperature=0.7,
                max_tokens=500
 )

 # 提取回答
            answer = response.choices[0].message.content

 # 添加助手回答到历史
            self.add_to_history("assistant", answer)

 return answer

 except Exception as e:
            error_msg = f"调用API时出错: {str(e)}"
 print(error_msg)
 return error_msg

 def clear_history(self):
 """清空对话历史"""
        self.conversation_history.clear()</code></pre>

<p id="t-j4E5kXp0lqMLCnxA6b8fIY"><span style="border-bottom:1px solid">创建一个测试脚本，测试基础 Agent：</span></p>


<a id="section-1394"></a>
## 实例

<a id="t-4kQn6ek4JuQ3kD0OBNhKO9"></a>

<pre id="t-cJ534Z09epdizhoIRm821q"><code># test_basic_agent.py
from src.simple_agent import SimpleQAAgent

def test_basic_agent():
 """测试基础问答 Agent"""
 print("=== 测试基础问答 Agent ===")

 # 创建 Agent
    agent = SimpleQAAgent()

 # 测试问答
    questions = [
 "你好，请介绍一下自己",
 "Python是什么？",
 "机器学习和人工智能有什么区别？"
 ]

 for question in questions:
 print(f"\n用户: {question}")
        answer = agent.ask(question)
 print(f"助理: {answer}")

 # 测试对话连贯性
 print("\n=== 测试对话连贯性 ===")
    agent.clear_history()

 # 第一轮
    q1 = "我最喜欢的颜色是蓝色"
    a1 = agent.ask(q1)
 print(f"用户: {q1}")
 print(f"助理: {a1}")

 # 第二轮（应该能记住之前的对话）
    q2 = "我刚才说我最喜欢什么颜色？"
    a2 = agent.ask(q2)
 print(f"\n用户: {q2}")
 print(f"助理: {a2}")

 print("\n测试完成！")

if __name__ == "__main__":
    test_basic_agent()</code></pre>

<p id="t-vhDb58SLjNWIvzoiUtJ91u"><span style="border-bottom:1px solid">运行测试：</span></p>

<pre id="t-0XWGa8FaTxKqBeBmwVdEGP"><code>python test_basic_agent.py

=== 测试基础问答 Agent ===

用户: 你好，请介绍一下自己
runoob
助理: 你好！我是通义千问（Qwen），是阿里巴巴集团自主研发的超大规模语言模型。我可以帮助你回答问题、创作文字，比如写故事、写公文、写邮件、写剧本、逻辑推理、编程等等，还能表达观点，玩游戏等。如果你有任何问题或需要帮助，随时告诉我！

用户: Python是什么？
助理: 你好！Python 是一种**高级、解释型、通用的编程语言**，由荷兰程序员 **吉多·范罗苏姆（Guido van Rossum）** 于1991年首次发布。它的设计哲学强调代码的**可读性**和**简洁性**，语法清晰简洁，使得初学者也能快速上手。
...</code></pre>

<p id="t-VdK2tqANiPUUj5lZQyYXEO"><span style="border-bottom:1px solid">这个基础 Agent 有几个明显的局限性：</span></p>

<ul><li id="t-Hi3AErfXQ90LoKzc6SUCGe"><span>只能回答训练数据中的知识</span></li></ul>

<ul><li id="t-Cfxetcbt5ZpS4r2rhm218P"><span>无法获取实时信息</span></li></ul>

<ul><li id="t-ZWL3diTXd2oWEctLf91SyG"><span>不能执行计算</span></li></ul>

<ul><li id="t-BI5NPYtIp2hMxAJKMgvkqT"><span>不能操作外部系统</span></li></ul>

<p id="t-7dhUdnvDd0lm8zSUKxHJAT"><span style="border-bottom:1px solid">这正是我们需要为 Agent 添加工具的原因。</span></p>


<a id="section-1395"></a>
## 添加搜索工具

<a id="t-jaPbU43yozilBOjxRy8Oxq"></a>

<p id="t-Kthd5JNMlu3KMD2Rt2Mrd8"><span style="border-bottom:1px solid">千问自带搜索功能，传递</span><span style="border-bottom:1px solid;font-weight:bold">enable_search: true</span><span style="border-bottom:1px solid">参数可启用联网搜索功能。</span></p>

<pre id="t-OPwsiUdDaM5sp55Wf6La1V"><code># 导入依赖与创建客户端...
completion = client.chat.completions.create(
    # 需使用支持联网搜索的模型
    model="qwen3-max",
    messages=[{"role": "user", "content": "杭州明天天气如何"}],
    # 由于 enable_search 非 OpenAI 标准参数，使用 Python SDK 需要通过 extra_body 传入（使用Node.js SDK 需作为顶层参数传入）
    extra_body={"enable_search": True}
)</code></pre>

<p id="t-OtrIKRCtS9LEAc5EzRaxlW"><span style="border-bottom:1px solid">文档说明：</span><span style="border-bottom:1px solid">https://help.aliyun.com/zh/model-studio/web-search</span></p>


<a id="section-1396"></a>
## 集成搜索工具的 Agent

<a id="t-vzeIp007uw25TUvG4OxVgN"></a>

<p id="t-3XVVmauWkYdn8Jy5qYgWKc"><span style="border-bottom:1px solid">现在我们将搜索工具集成到 Agent 中，src 目录下创建 agent_with_search.py 文件：</span></p>


<a id="section-1397"></a>
## 实例

<a id="t-o4ZEesh7nvIxAzaFzDSTSR"></a>

<pre id="t-jmvPtUVbcX8aOIBzwyq8aY"><code># src/agent_with_search.py
import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()


class AgentWithSearch:
 """基于 Qwen 内置联网搜索能力的 Agent"""

 def __init__(self, model: str = "qwen3-max"):
        api_key = "sk-xxx"
        base_url = "https://dashscope.aliyuncs.com/compatible-mode/v1"

 if not api_key:
 raise ValueError("请设置 OPENAI_API_KEY 环境变量（DashScope Key）")

        self.client = OpenAI(
            api_key=api_key,
            base_url=base_url
 )
        self.model = model

        self.system_prompt = """
你是一个有帮助的 AI 助手。

当问题涉及实时信息、最新事件或需要事实核查的内容时，
你可以通过联网搜索获取最新信息，并在回答中说明信息来源于网络。
"""

 def ask(self, question: str) -&gt; str:
        messages = [
 {"role": "system", "content": self.system_prompt},
 {"role": "user", "content": question}
 ]

 try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=messages,
                temperature=0.7,
                max_tokens=800,
                extra_body={
 "enable_search": True
 }
 )

 return response.choices[0].message.content

 except Exception as e:
 return f"错误: {repr(e)}"

 def interactive_chat(self):
 print("=== Qwen 联网搜索 Agent ===")
 print("输入 quit / exit 结束对话")

 while True:
            question = input("\n你: ").strip()
 if question.lower() in {"quit", "exit"}:
 break

 print("助理:", self.ask(question))</code></pre>


<a id="section-1398"></a>
## 测试搜索 Agent

<a id="t-cGrkEtP4vTmOJVB8ZpD8nm"></a>

<p id="t-PnPjasdhdE5QfBI8tkRCMU"><span style="border-bottom:1px solid">根目录下创建 test_search_agent.py 文件：</span></p>


<a id="section-1399"></a>
## 实例

<a id="t-KcTMsNWV80r3y2pJpGTMvX"></a>

<pre id="t-Lqem3eNVBraH1QZ9bq0Fqc"><code># test_search_agent.py
from src.agent_with_search import AgentWithSearch

def test_search_agent():
    agent = AgentWithSearch()

    questions = [
 "今天北京的天气怎么样？",
 "最新的科技新闻有哪些？",
 "2024年奥运会举办地是哪里？",
 "Python 是什么？"
 ]

 for q in questions:
 print(f"\n用户: {q}")
 print("助理:", agent.ask(q)[:300], "...")

if __name__ == "__main__":
    test_search_agent()</code></pre>

<p id="t-vhoVBlewkM2i4sQSGWZqQ2"><span style="border-bottom:1px solid">运行测试：</span></p>

<pre id="t-vpxw3ll9VMUOnXWQRC4Zm6"><code>python test_search_agent.py
用户: 今天北京的天气怎么样？
助理: 今天是2026年2月7日，星期六。根据最新天气预报信息，北京今天的天气情况如下：

- **天气状况**：多云转晴  
- **气温范围**：最低气温约 **-9℃**，最高气温约 **2℃**（部分区域如海淀区记录为 **-5℃ ~ 5℃**）  
- **风向风力**：白天到夜间有 **东北风1级**，部分地区午后转为 **南风转西北风，小于3级**  
- **空气质量**：**37（优）**  
- **穿衣建议**：建议穿棉衣、冬大衣、皮夹克、厚呢外套、羽绒服等厚重保暖衣物，并佩戴手套、帽子等防寒配件  
...</code></pre>

