---
title: "第 04 章 · 工具调用与结构化输出"
date: "2026-10-22"
draft: false
author: "学习资料整理"
description: "Function Calling、工具定义、参数校验、JSON 与结构化输出"
tags: ["Agent", "学习路线"]
categories: ["AI 工程"]
prerequisites: ["agent-learning-03-prompt-engineering"]
verification: {"status": "not-run", "scope": "本次仅整理资料；示例代码与原文技术结论未复跑。"}
---

Function Calling、工具定义、参数校验、JSON 与结构化输出

[学习路线](/posts/agent-learning-route/) · [上一章](/posts/agent-learning-03-prompt-engineering/) · [下一章](/posts/agent-learning-05-reasoning-planning/)

本章按知识小节编排。项目内容作为学习案例阅读，示例代码与原文技术结论未在本次整理中执行验证。

## 本章目录

- [Function Calling](#section-0043)
- [Function calling是如何被训练出来的](#section-0044)
- [工具调用失败问题](#section-0045)
- [工具调用（Function Calling）](#section-1316)
- [为什么需要 Function Calling？](#section-1317)
- [Function Calling 的工作原理](#section-1318)
- [核心概念](#section-1319)
- [实例说明](#section-1320)
- [工具定义与描述编写](#section-1321)
- [工具定义的结构](#section-1322)
- [实例](#section-1323)
- [编写优质的工具描述](#section-1324)
- [实用工具定义示例](#section-1325)
- [工具定义的最佳实践](#section-1326)
- [工具定义的验证](#section-1327)
- [参数提取与验证](#section-1328)
- [参数提取过程](#section-1329)
- [参数提取的挑战](#section-1330)
- [参数验证方法](#section-1331)
- [实例](#section-1333)
- [参数提取与验证的完整流程](#section-1334)
- [参数修正策略](#section-1335)
- [错误处理与重试机制](#section-1336)
- [&lt;常见的工具调用错误](#section-1337)
- [错误处理策略](#section-1338)
- [重试机制](#section-1339)
- [完整的工具调用框架](#section-1340)
- [实例](#section-1341)

<a id="section-0043"></a>
## Function Calling

<a id="f-doxcnU12fp89aR749nGUgh1QlOc"></a>

<p id="f-doxcn51sozcQ8pGf9nU03LIA9Lz"><span>（Function call的能力其实一直都是 Agent非常重要的考点，虽然在实际面试中考察的并不是特别多，以下两个问题是来自于某次面试原题）</span></p>


<a id="section-0044"></a>
## Function calling是如何被训练出来的

<a id="f-doxcnEsM62IbW6E5I8nAihzABZe"></a>

<p id="f-doxcnJvzzzjOaqJGFfhVik8Z1Cg"><span>Function calling是通过在模型训练的</span><span style="font-weight:bold">预训练阶段</span><span>使用</span><span style="font-weight:bold">自监督学习</span><span>，在</span><span style="font-weight:bold">微调阶段</span><span>使用</span><span style="font-weight:bold">SFT技术</span><span>，以及在</span><span style="font-weight:bold">对齐阶段</span><span>使用</span><span style="font-weight:bold">RLHF技术</span><span>来使模型具有能够理解用户意图并生成函数结构化的函数调用请求的能力。</span></p>

<p id="f-doxcny5NR3Kxqfm19uRWgzgcrPd"><span>具体来讲：</span></p>

<p id="f-doxcnhFc9i3y4yVd4ssQskPR35f"><span>预训练阶段的自监督学习使得模型能够理解自然语言。</span></p>

<p id="f-doxcnJsoQiSh4OXigFBKWOMdlNe"><span>微调阶段的SFT技术使用标注数据让模型理解何时该调用函数，调用函数的格式是什么。</span></p>

<p id="f-doxcneFVgkXEbdK2TGNFhIlA6Pc"><span>对齐阶段使用RLHF，使用人类的反馈来优化调用结果，使模型的调用更符合人类的习惯。</span></p>


<a id="section-0045"></a>
## 工具调用失败问题

<a id="f-doxcn9RDcko4pVHClYKgoHgmYNy"></a>

<p id="f-doxcnInwVJ6LVNRR5Gchk3BMXVg"><span>在使用一些Function call的接口设计的时候，如果参数比较多，实际使用中发现LLM调用失败（可能是没理解调用的时机）或者是缺少了必填的参数（导致调用失败），这个应该如何避免呢？</span></p>

<p id="f-doxcnGsRhBF7RHm8gzZ65pfc6d8"><span>1.</span><span style="font-weight:bold">重构函数设计：</span><span>《代码整洁之道》中就写过，函数参数最理想的是0个，其次是1，再次是2，我们应该尽量避免有3个及以上的参数，所以出现这种情况我们可以先考虑是否有必要重构。</span></p>

<p id="f-doxcnmPRMDTzRfJbXAFd5LviQwb"><span>2.</span><span style="font-weight:bold">可以拆分函数：</span><span>让函数满足单一职责的原则，避免有过多的参数。</span></p>

<p id="f-doxcnHKekUUwUTOmcau0QPWGBhY"><span>3.</span><span style="font-weight:bold">优化JSON Schema设计：</span><span> 在JSON Schema中清晰地标明参数类型，是否必填，默认值，写清楚参数描述。</span></p>

<p id="f-doxcnWo7MwQEErLsRcqGUjwsn9d"><span>4.</span><span style="font-weight:bold">优化函数/参数命名：</span><span> 让命名更具有描述性，便于LLM理解。</span></p>

<p id="f-doxcnJJNw1RGmWyrLDc6Uam8xJd"><span>5.</span><span style="font-weight:bold">优化提示词设计：</span><span>可以在提示词中加入一些引导，给出一些调用示例。</span></p>

<p id="f-doxcnMwOcrhlE1WCYEVVXfr2Upb"><span>6.</span><span style="font-weight:bold">可以增加一些验证，反馈，重试机制：</span><span>比如在调用前对参数进行验证，判断是否有误，如果调用失败，可以把失败的信息传回给LLM，让它利用这个信息重试。</span></p>


<a id="section-1316"></a>
## 工具调用（Function Calling）

<a id="t-block-21218"></a>

<p id="t-8aFeX4uW8hPVqbv7GlC2N4"><span>Function Calling（函数调用）是让 LLM 能够使用外部工具的核心机制。</span></p>

<p id="t-pcSeEsHFceovho4vPNKSAn"><span>Function Calling（函数调用）允许模型决定何时调用工具、调用哪个工具，以及传递什么参数。</span></p>


<a id="section-1317"></a>
## 为什么需要 Function Calling？

<a id="t-zvB2uXIvfbgya4UNteMWaD"></a>

<p id="t-8PUJOew2miKFFVqJEX5VC7"><span>想象一下，LLM 是一个聪明但手无寸铁的顾问。它知道很多知识，但不能</span><span style="border-bottom:1px solid">：</span></p>

<ul><li id="t-uwj5VFohXaX7jy6bT9gPTV"><span>获取实时信息（如最新天气、股票价格）</span></li></ul>

<ul><li id="t-o65rlmjT2kaDiHb9MOZE77"><span>执行计算（如复杂的数学运算）</span></li></ul>

<ul><li id="t-7ysYquDpf4lvsogJIrVHO1"><span>操作外部系统（如发送邮件、读写文件）</span></li></ul>

<p id="t-z8q8RacvkFVFI9f310BfEZ"><span>Function Calling 为 LLM 提供了双手，让它能够突破自身限制，执行实际任务。</span></p>


<a id="section-1318"></a>
## Function Calling 的工作原理

<a id="t-3QEbvQvCoycsUEqWnKua3N"></a>

<p id="t-90NYa8n6rpEnb1TClz2lyA"><span>Function Calling 的基本流程如下：</span></p>

<div id="t-i0XWTJr5EE0CDoq68DNKar"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/f2c820243db7b32009e321a5.png"/></div>


<a id="section-1319"></a>
## 核心概念

<a id="t-hni1pK2IvrR0kouDXRNYLR"></a>

<ul><li id="t-MDN6e6jjkdZWeqMw5wLqPU"><span style="font-weight:bold">工具定义</span><span>：描述一个工具的功能、参数和返回值</span></li></ul>

<ul><li id="t-zEchJyrEskSMiPwJpxDTL2"><span style="font-weight:bold">工具选择</span><span>：LLM 根据用户问题选择合适的工具</span></li></ul>

<ul><li id="t-KtHb5HI5AEFL23NBvtDhZ7"><span style="font-weight:bold">参数提取</span><span>：LLM 从问题中提取工具所需的参数</span></li></ul>

<ul><li id="t-SzmNKghTB3YVuE6DHMrZPZ"><span style="font-weight:bold">结果处理</span><span>：将工具执行结果整合到最终回答中</span></li></ul>


<a id="section-1320"></a>
## 实例说明

<a id="t-Lnij4OaKsWWb09fonOishV"></a>

<p id="t-NWHPgfU8uAy9Nh6YzahxOk"><span>假设我们有一个查询天气的工具，当用户问</span><span style="font-weight:bold">北京今天天气如何？</span><span>时：</span></p>

<ol start="1"><li id="t-E3fgZ2q6VgTwBMqYQOoJ6o"><span>LLM 识别出需要调用天气查询工具</span></li></ol>

<ol start="2"><li id="t-2dXs9kGOYm1gVD2XBbGqGr"><span>从问题中提取参数：</span><span>city="北京"</span><span>, </span><span>date="今天"</span></li></ol>

<ol start="3"><li id="t-mkkl5onLNrimJQUsuf18rC"><span>调用天气 API 获取数据</span></li></ol>

<ol start="4"><li id="t-Ay8Sk3iRWEC2t6yh1mZrmN"><span>将天气数据整合成友好的回答返回给用户</span></li></ol>


<a id="section-1321"></a>
## 工具定义与描述编写

<a id="t-2Sy0qqUftvDBb48K3snuTH"></a>

<p id="t-Kwvv0RVOPBjaQWWWfH5bqD"><span>要让 LLM 正确使用工具，首先需要清晰地定义工具，好的工具定义应该像一份清晰的说明书，让 LLM 明白：</span></p>

<ul><li id="t-JUq6wGRil5qwCcbbHJaUoI"><span>这个工具是做什么的？</span></li></ul>

<ul><li id="t-tle6NAH8dvpLNikkh8z6Xj"><span>什么时候使用它？</span></li></ul>

<ul><li id="t-SnSgfBSnYfdnnhyKMQ8B04"><span>需要什么参数？</span></li></ul>

<ul><li id="t-fktIh1SiRHyJS9GOwRUO1d"><span>参数是什么格式？</span></li></ul>


<a id="section-1322"></a>
## 工具定义的结构

<a id="t-ZoJDosv6pvvtkWiVm0gjze"></a>

<p id="t-YpNGSOvjGefGrcuxAprefY"><span>一个完整的工具定义通常包含以下部分：</span></p>


<a id="section-1323"></a>
## 实例

<a id="t-qKUDfmlYkbLnL4ervOoDyq"></a>

<pre id="t-wGESn1PRU8WsbfogyiN9oE"><code># 工具定义示例结构
weather_tool = {
 "name": "get_weather", # 工具名称
 "description": "获取指定城市的天气信息", # 工具描述
 "parameters": { # 参数定义
 "type": "object",
 "properties": {
 "city": {
 "type": "string",
 "description": "城市名称，如'北京'、'上海'"
 },
 "date": {
 "type": "string",
 "description": "日期，格式'YYYY-MM-DD'，或'今天'、'明天'",
 "enum": ["今天", "明天", "后天"]
 }
 },
 "required": ["city"] # 必填参数
 }
}</code></pre>


<a id="section-1324"></a>
## 编写优质的工具描述

<a id="t-Pfs2o0RKJSBvAV5ygkQmwd"></a>

<a id="t-XWWEISXg8Fkngc2aAfNxEc"></a>

##### 描述要清晰具体

<ul><li id="t-imedXB0z5PEKTzW6xWk0ZS"><span style="font-weight:bold">不好的描述</span><span>：查询天气</span></li></ul>

<ul><li id="t-DLjfDn6LgtfP5zwjyuBDsw"><span style="font-weight:bold">好的描述</span><span>：获取指定城市在特定日期的天气信息，包括温度、湿度、风速和天气状况（晴、雨、多云等）</span></li></ul>

<a id="t-Dlry9RF4EqdHHPf0bZ2vHP"></a>

##### 参数描述要详细

<p id="t-MOTBTJOdSZGzBU5ZaXzPqa"><span style="font-weight:bold">不好的参数描述</span><span>：</span></p>

<pre id="t-ldMitD8JiQcWy5HQm2oNKg"><code>"city": {"type": "string"}</code></pre>

<p id="t-fpO0rDasUW2QQFK2OCkqsB"><span style="font-weight:bold">好的参数描述：</span></p>

<pre id="t-x0nYWnVIXW9uDBS21niieL"><code>"city": {
    "type": "string",
    "description": "完整的城市名称，如'北京市'、'上海市'。不要使用简称或拼音。"
}</code></pre>

<a id="t-HvpGlj8P1brBv1PhnrzeHT"></a>

##### 使用枚举限制选项

<p id="t-7x7Mh5NPsfBu6bv0PWIyMj"><span>对于有限的选项，使用枚举（enum）帮助 LLM 理解：</span></p>

<pre id="t-uV3LkW2bcO4BBH4bQpxiIO"><code>"unit": {
    "type": "string",
    "description": "温度单位",
    "enum": ["celsius", "fahrenheit"],
    "default": "celsius"
}</code></pre>

<a id="t-oJOKYfO815YqLSDTyipQvH"></a>

##### 提供示例值

<p id="t-ctTMW0QupVSjKR0hl95CEp"><span>在描述中提供示例，帮助 LLM 理解格式：</span></p>

<pre id="t-7wCOpYfLSK69obwZqP5IXH"><code>"date": {
    "type": "string",
    "description": "日期，格式应为'YYYY-MM-DD'，例如'2024-06-15'"
}</code></pre>


<a id="section-1325"></a>
## 实用工具定义示例

<a id="t-pA50uVtq8I5MpIBZpbZKZb"></a>

<a id="t-IjVsrmLVAZdV7N50ZE5p26"></a>

##### 计算器工具

<pre id="t-P2MdG6f8NcBPHqFwWyMMUg"><code>calculator_tool = {
 "name": "calculate",
 "description": "执行数学计算，支持加减乘除、幂运算等基本运算",
 "parameters": {
 "type": "object",
 "properties": {
 "expression": {
 "type": "string",
 "description": "数学表达式，如'2 + 3 * 4'、'sqrt(16)'、'sin(30)'"
 }
 },
 "required": ["expression"]
 }
}</code></pre>

<a id="t-bLrs7ZBMqqZs8a8u0hGYyX"></a>

##### 搜索工具

<pre id="t-PdtWempFpiaMcCAef0rtGK"><code>search_tool = {
 "name": "search_web",
 "description": "在互联网上搜索最新信息",
 "parameters": {
 "type": "object",
 "properties": {
 "query": {
 "type": "string",
 "description": "搜索关键词，尽量具体明确"
 },
 "num_results": {
 "type": "integer",
 "description": "返回结果数量，默认为5",
 "default": 5,
 "minimum": 1,
 "maximum": 10
 }
 },
 "required": ["query"]
 }
}</code></pre>

<a id="t-ub2qoCAV5Qw7qbZLsRqAYa"></a>

##### 文件操作工具

<pre id="t-2eYVlAJpbUcOkTkISULr2D"><code>file_tool = {
 "name": "read_file",
 "description": "读取指定文件的内容",
 "parameters": {
 "type": "object",
 "properties": {
 "file_path": {
 "type": "string",
 "description": "文件的完整路径，如'/home/user/document.txt'"
 },
 "encoding": {
 "type": "string",
 "description": "文件编码，默认为'utf-8'",
 "default": "utf-8"
 }
 },
 "required": ["file_path"]
 }
}</code></pre>


<a id="section-1326"></a>
## 工具定义的最佳实践

<a id="t-TOEYFCKnbIqb4GH95j78U8"></a>

<ul><li id="t-CPimtNZh8Mi4b3rbjBweW9"><span style="font-weight:bold">名称简洁明确</span><span>：使用动词开头，如 </span><span>get_</span><span>、</span><span>calculate_</span><span>、</span><span>search_</span></li></ul>

<ul><li id="t-sHnbH34TQ2C9ZCwt8x9U5S"><span style="font-weight:bold">描述完整详细</span><span>：说明工具的用途、适用场景和限制</span></li></ul>

<ul><li id="t-jhsWjTFA3IctftJJggr7DM"><span style="font-weight:bold">参数验证充分</span><span>：定义参数类型、范围、格式要求</span></li></ul>

<ul><li id="t-uZ7FueM6i0hL0Etoem8OO7"><span style="font-weight:bold">提供默认值</span><span>：为可选参数提供合理的默认值</span></li></ul>

<ul><li id="t-Qo1FSGEYfzF10mG3DviEYp"><span style="font-weight:bold">考虑错误情况</span><span>：在描述中说明可能出现的错误和限制</span></li></ul>


<a id="section-1327"></a>
## 工具定义的验证

<a id="t-7BFIDy6V1Ay9B1Cm2sjins"></a>

<p id="t-LpzW2cH3KbuBu4GnR4dPzb"><span>定义工具后，应该进行验证测试：</span></p>

<pre id="t-964CD4t9dlzz7L1mesJrzj"><code>def validate_tool_definition(tool_def):
 """验证工具定义是否完整"""
    required_fields = ["name", "description", "parameters"]

 for field in required_fields:
 if field not in tool_def:
 return False, f"缺少必要字段: {field}"

 # 检查参数结构
 if "properties" not in tool_def["parameters"]:
 return False, "参数定义缺少properties字段"

 return True, "工具定义完整"

# 测试验证
is_valid, message = validate_tool_definition(weather_tool)
print(f"验证结果: {is_valid}, 消息: {message}")</code></pre>


<a id="section-1328"></a>
## 参数提取与验证

<a id="t-QyJyiwidxBqyxEk96SEuv8"></a>

<p id="t-sxwXWBbYtjTdyOnyaW5PEl"><span>LLM 从用户问题中提取参数后，需要对这些参数进行验证和处理，确保工具能够正确执行。</span></p>


<a id="section-1329"></a>
## 参数提取过程

<a id="t-8Dr9R668yWeqiptTeErf2c"></a>

<p id="t-jXxay2D0RtPUptzyDGgN6q"><span>当 LLM 决定调用工具时，它会分析用户输入，提取出工具所需的参数：</span></p>

<pre id="t-QD0D8DcNA1g5pvPj6JLYCJ"><code>用户输入: "查询北京明天的天气温度"
工具: get_weather
提取参数: {"city": "北京", "date": "明天"}</code></pre>


<a id="section-1330"></a>
## 参数提取的挑战

<a id="t-LT22PenODKEU7vrbiEoCwc"></a>

<p id="t-tyqDMAVXTptZQcwQfMjCM0"><span>参数提取可能遇到以下问题：</span></p>

<ul><li id="t-RIUDASaon8nR0AlO28qTqd"><span style="font-weight:bold">信息缺失</span><span>：用户没有提供所有必要信息</span></li></ul>

<ul><li id="t-5X7sSYL7tr1rYcCckT9qxj"><span style="font-weight:bold">格式不符</span><span>：用户提供的格式与工具要求不符</span></li></ul>

<ul><li id="t-dBbjcVkX82GV7k1zxAG5BM"><span style="font-weight:bold">歧义解析</span><span>：同一信息可能有多种解释</span></li></ul>

<ul><li id="t-MCXNDfHyPCohisPyLkr25s"><span style="font-weight:bold">上下文依赖</span><span>：参数需要结合对话历史理解</span></li></ul>


<a id="section-1331"></a>
## 参数验证方法

<a id="t-MFKv3ZOdSbCLTRClTx0l6z"></a>

<a id="t-1Cnhe7J89tKVvtYKYRPgg0"></a>

##### 类型验证

<p id="t-ExxyKcV8NOSFrBaM1AsklT"><span>确保参数类型符合要求：</span></p>

<pre id="t-tn5H6cwrmpoi4nsqMZOi9c"><code>def validate_parameters(params, tool_def):
 """验证参数类型"""
    errors = []

 for param_name, param_def in tool_def["parameters"]["properties"].items():
 if param_name in params:
            param_value = params[param_name]
            expected_type = param_def.get("type")

 # 类型检查
 if expected_type == "string" and not isinstance(param_value, str):
                errors.append(f"参数'{param_name}'应为字符串类型")
 elif expected_type == "integer" and not isinstance(param_value, int):
                errors.append(f"参数'{param_name}'应为整数类型")
 elif expected_type == "number" and not isinstance(param_value, (int, float)):
                errors.append(f"参数'{param_name}'应为数字类型")
 elif expected_type == "boolean" and not isinstance(param_value, bool):
                errors.append(f"参数'{param_name}'应为布尔类型")

 return errors</code></pre>

<p id="t-W9X9C6KcuFRyOedjgtAHJJ"><span>```</span></p>

<a id="t-v4tdSMrBCtP4Cy6LqAgwzT"></a>

##### 范围验证

<p id="t-hf3FdtnkFfNdcXFL9F2KAA"><span>检查参数值是否在允许范围内：</span></p>

<pre id="t-2MDP3IHOvzgfMEC33jhf9S"><code>def validate_range(params, tool_def):
 """验证参数范围"""
    errors = []

 for param_name, param_def in tool_def["parameters"]["properties"].items():
 if param_name in params:
            param_value = params[param_name]

 # 检查最小值
 if "minimum" in param_def and param_value &lt; param_def["minimum"]:
                errors.append(f"参数'{param_name}'不能小于{param_def['minimum']}")

 # 检查最大值
 if "maximum" in param_def and param_value &gt; param_def["maximum"]:
                errors.append(f"参数'{param_name}'不能大于{param_def['maximum']}")

 # 检查枚举值
 if "enum" in param_def and param_value not in param_def["enum"]:
                errors.append(f"参数'{param_name}'必须是{param_def['enum']}中的一个")

 return errors</code></pre>

<a id="t-5uDYBdC8I4pi0Yhwo7XBrz"></a>

##### 必填参数验证

<p id="t-GkmQBLKewum2UK69zd70H9"><span>确保所有必填参数都已提供：</span></p>

<pre id="t-8PX8QvGMluEKmFYXbKpoeM"><code>def validate_required(params, tool_def):
 """验证必填参数"""
    errors = []
    required_params = tool_def["parameters"].get("required", [])

 for param_name in required_params:
 if param_name not in params:
            errors.append(f"缺少必填参数: {param_name}")

 return errors</code></pre>


<a id="section-1333"></a>
## 实例

<a id="t-qiQXFoyndlmJTAAYdyxPJV"></a>

<pre id="t-CF0IphapIkFL8SPLkbo3Yo"><code>class ParameterValidator:
 """参数验证器"""

 def __init__(self, tool_def):
        self.tool_def = tool_def

 def validate(self, params):
 """执行完整的参数验证"""
        all_errors = []

 # 检查必填参数
        required_errors = self.validate_required(params)
        all_errors.extend(required_errors)

 # 检查参数类型
        type_errors = self.validate_type(params)
        all_errors.extend(type_errors)

 # 检查参数范围
        range_errors = self.validate_range(params)
        all_errors.extend(range_errors)

 # 检查额外参数（未定义的参数）
        extra_errors = self.validate_extra(params)
        all_errors.extend(extra_errors)

 return len(all_errors) == 0, all_errors

 def validate_required(self, params):
 """验证必填参数"""
        errors = []
        required_params = self.tool_def["parameters"].get("required", [])

 for param_name in required_params:
 if param_name not in params or params[param_name] is None:
                errors.append(f"缺少必填参数: {param_name}")

 return errors

 def validate_type(self, params):
 """验证参数类型"""
        errors = []

 for param_name, param_value in params.items():
 if param_name in self.tool_def["parameters"]["properties"]:
                param_def = self.tool_def["parameters"]["properties"][param_name]
                expected_type = param_def.get("type")

 if expected_type == "string" and not isinstance(param_value, str):
                    errors.append(f"参数'{param_name}'应为字符串类型，实际为{type(param_value).__name__}")
 elif expected_type == "integer" and not isinstance(param_value, int):
                    errors.append(f"参数'{param_name}'应为整数类型，实际为{type(param_value).__name__}")
 elif expected_type == "number" and not isinstance(param_value, (int, float)):
                    errors.append(f"参数'{param_name}'应为数字类型，实际为{type(param_value).__name__}")
 elif expected_type == "boolean" and not isinstance(param_value, bool):
                    errors.append(f"参数'{param_name}'应为布尔类型，实际为{type(param_value).__name__}")

 return errors

 def validate_range(self, params):
 """验证参数范围"""
        errors = []

 for param_name, param_value in params.items():
 if param_name in self.tool_def["parameters"]["properties"]:
                param_def = self.tool_def["parameters"]["properties"][param_name]

 # 检查最小值
 if "minimum" in param_def and param_value &lt; param_def["minimum"]:
                    errors.append(f"参数'{param_name}'不能小于{param_def['minimum']}")

 # 检查最大值
 if "maximum" in param_def and param_value &gt; param_def["maximum"]:
                    errors.append(f"参数'{param_name}'不能大于{param_def['maximum']}")

 # 检查枚举值
 if "enum" in param_def and param_value not in param_def["enum"]:
                    errors.append(f"参数'{param_name}'必须是{param_def['enum']}中的一个")

 return errors

 def validate_extra(self, params):
 """检查未定义的额外参数"""
        errors = []
        defined_params = set(self.tool_def["parameters"]["properties"].keys())
        provided_params = set(params.keys())

        extra_params = provided_params - defined_params
 if extra_params:
            errors.append(f"提供了未定义的参数: {', '.join(extra_params)}")

 return errors

# 使用示例
validator = ParameterValidator(weather_tool)
params = {"city": "北京", "date": "明天", "extra": "不应该有的参数"}
is_valid, errors = validator.validate(params)

if is_valid:
 print("参数验证通过")
else:
 print("参数验证失败:")
 for error in errors:
 print(f"  - {error}")</code></pre>


<a id="section-1334"></a>
## 参数提取与验证的完整流程

<a id="t-CjNmZMnCF5jgPt3WAo1coy"></a>

<div id="t-URfatnadWzMbjHAKzRCSki"><img alt="" decoding="async" loading="lazy" src="/images/agent-learning/933ff6af4ed0981eb1dabc84.png"/></div>


<a id="section-1335"></a>
## 参数修正策略

<a id="t-8gtYHHmKIExk5iwohiviBE"></a>

<p id="t-s6wPLbJgumr3Y3W5wmBKwp"><span>当参数验证失败时，可以采取以下策略：</span></p>

<ul><li id="t-GYIJ56ZF7TEnqAZBREFveC"><span style="font-weight:bold">询问用户</span><span>：直接向用户询问缺失或错误的参数</span></li></ul>

<ul><li id="t-cm8YgpoPF1oGnDWBWAZXRp"><span style="font-weight:bold">使用默认值</span><span>：对于可选参数，使用预定义的默认值</span></li></ul>

<ul><li id="t-qwn5l2qMpxWo9KknRmDhyC"><span style="font-weight:bold">智能推断</span><span>：根据上下文推断合理的参数值</span></li></ul>

<ul><li id="t-lin4MPyy7dfXF8fBDyGZed"><span style="font-weight:bold">格式转换</span><span>：将用户提供的格式转换为工具要求的格式</span></li></ul>

<pre id="t-DL6LWnOWK68g69L7bFvzB6"><code>def fix_parameters(params, errors, tool_def):
 """尝试修正参数错误"""
    fixed_params = params.copy()

 for error in errors:
 if "缺少必填参数" in error:
            param_name = error.split(": ")[1]
 # 尝试从上下文推断或使用默认值
 if param_name == "date":
                fixed_params[param_name] = "今天" # 使用当天作为默认值

 elif "应为字符串类型" in error:
            param_name = error.split("'")[1]
 # 尝试转换为字符串
            fixed_params[param_name] = str(params[param_name])

 return fixed_params</code></pre>


<a id="section-1336"></a>
## 错误处理与重试机制

<a id="t-wn6Lb6TtQ5AeUM0CZPGdWB"></a>

<p id="t-lR0e1Rp4IBmME1c8BGEbE0"><span>在实际应用中，工具调用可能会失败。健全的错误处理和重试机制是构建可靠 AI Agent 的关键。</span></p>


<a id="section-1337"></a>
## &lt;常见的工具调用错误

<a id="t-5mBXwxOHUDJ1TBNIlF1v8q"></a>

<ul><li id="t-6lUus9CpUJJDrPwmKxO57P"><span style="font-weight:bold">网络错误</span><span>：API 调用超时、连接失败</span></li></ul>

<ul><li id="t-GtzBCCid0SKISfJGzX67b1"><span style="font-weight:bold">参数错误</span><span>：参数验证失败、格式不正确</span></li></ul>

<ul><li id="t-O2afrbJLwN1LwpjRJjodrV"><span style="font-weight:bold">权限错误</span><span>：API 密钥无效、权限不足</span></li></ul>

<ul><li id="t-BV3eYc6DTigxWUOvegmOB4"><span style="font-weight:bold">资源错误</span><span>：服务不可用、达到调用限制</span></li></ul>

<ul><li id="t-8OYJzRz8wAZ2vSv4jr4EpM"><span style="font-weight:bold">逻辑错误</span><span>：工具内部逻辑错误</span></li></ul>


<a id="section-1338"></a>
## 错误处理策略

<a id="t-A5GzDzhNkGAgTHeJFPBi0P"></a>

<a id="t-ac6CIdPGEadrskRDpScE4y"></a>

##### 分级错误处理

<p id="t-fkeEtvZPom5jk7KO7BsaEK"><span>根据错误类型采取不同的处理策略：</span></p>

<pre id="t-GZLHxg4uiEUPEYh0l3THzQ"><code>class ErrorHandler:
 """错误处理器"""

 def handle(self, error, context):
 """处理错误"""
        error_type = self.classify_error(error)

 if error_type == "network":
 return self.handle_network_error(error, context)
 elif error_type == "parameter":
 return self.handle_parameter_error(error, context)
 elif error_type == "authentication":
 return self.handle_auth_error(error, context)
 elif error_type == "resource":
 return self.handle_resource_error(error, context)
 else:
 return self.handle_unknown_error(error, context)

 def classify_error(self, error):
 """分类错误类型"""
        error_str = str(error).lower()

 if any(word in error_str for word in ["timeout", "connection", "network"]):
 return "network"
 elif any(word in error_str for word in ["parameter", "invalid", "missing"]):
 return "parameter"
 elif any(word in error_str for word in ["auth", "key", "permission"]):
 return "authentication"
 elif any(word in error_str for word in ["limit", "quota", "unavailable"]):
 return "resource"
 else:
 return "unknown"

 def handle_network_error(self, error, context):
 """处理网络错误"""
 return {
 "success": False,
 "error": "网络连接失败，请检查网络后重试",
 "retryable": True,
 "retry_after": 5 # 5秒后重试
 }

 def handle_parameter_error(self, error, context):
 """处理参数错误"""
 return {
 "success": False,
 "error": f"参数错误: {str(error)}",
 "retryable": False,
 "suggestion": "请检查输入参数是否正确"
 }

 # 其他错误处理方法类似...</code></pre>

<a id="t-812hfGBi88daVPaSk589zV"></a>

##### 用户友好的错误消息

<p id="t-heKCRzTzKT500x3QPjCUJK"><span>将技术性错误转换为用户能理解的消息：</span></p>

<pre id="t-GWCDVtRzrmEQ1lJvlAqKKj"><code>def user_friendly_error(error):
 """生成用户友好的错误消息"""
    error_map = {
 "timeout": "请求超时，请稍后重试",
 "connection_error": "网络连接失败，请检查网络",
 "invalid_api_key": "API 密钥无效，请检查配置",
 "rate_limit_exceeded": "调用频率过高，请稍后再试",
 "invalid_parameters": "输入参数不正确，请检查后重试"
 }

    error_str = str(error).lower()
 for key, message in error_map.items():
 if key in error_str:
 return message

 return "系统繁忙，请稍后重试"</code></pre>


<a id="section-1339"></a>
## 重试机制

<a id="t-N42jVgqQOcemDWOXFR0Obv"></a>

<p id="t-gI6xqvFArOEjuoPOWJeoFn"><span>对于可重试的错误，应该实现智能的重试策略：</span></p>

<a id="t-YD7rEh7KKMaVpRI5lJIUda"></a>

##### 指数退避重试

<pre id="t-6VK1TvltePszZYpT86D73I"><code>import time
import random

class ExponentialBackoffRetry:
 """指数退避重试"""

 def __init__(self, max_retries=3, base_delay=1, max_delay=30):
        self.max_retries = max_retries
        self.base_delay = base_delay
        self.max_delay = max_delay

 def retry(self, func, *args, **kwargs):
 """执行带重试的函数调用"""
        last_error = None

 for attempt in range(self.max_retries):
 try:
 return func(*args, **kwargs)

 except Exception as e:
                last_error = e

 # 检查是否可重试
 if not self.is_retryable(e):
 raise

 # 最后一次尝试，不再重试
 if attempt == self.max_retries - 1:
 break

 # 计算等待时间（指数退避 + 随机抖动）
                delay = min(
                    self.base_delay * (2 ** attempt) + random.uniform(0, 1),
                    self.max_delay
 )

 print(f"第{attempt + 1}次尝试失败，{delay:.1f}秒后重试...")
                time.sleep(delay)

 # 所有重试都失败
 raise last_error

 def is_retryable(self, error):
 """判断错误是否可重试"""
        error_str = str(error).lower()
        retryable_errors = ["timeout", "connection", "busy", "temporarily"]

 for retryable_error in retryable_errors:
 if retryable_error in error_str:
 return True

 return False

# 使用示例
retry = ExponentialBackoffRetry(max_retries=3)

def call_weather_api(city, date):
 """调用天气API（模拟可能失败）"""
 # 模拟API调用
 if random.random() &lt; 0.3: # 30%概率失败
 raise ConnectionError("API连接超时")
 return {"temperature": 25, "condition": "晴"}

try:
    result = retry.retry(call_weather_api, "北京", "今天")
 print(f"成功获取天气: {result}")
except Exception as e:
 print(f"获取天气失败: {e}")</code></pre>

<p id="t-l3cVGiwGEdUHkIIHxsEByo"><span>```</span></p>

<a id="t-uNvMZBqZsuXhvgrTUFtw3S"></a>

##### 熔断器模式

<p id="t-uKlUCJzuYbnmtzODsIy0uK"><span>防止连续失败导致系统雪崩：</span></p>

<pre id="t-P4RQKGFjml1ZgriAcbj156"><code>class CircuitBreaker:
 """熔断器"""

 def __init__(self, failure_threshold=5, reset_timeout=60):
        self.failure_threshold = failure_threshold
        self.reset_timeout = reset_timeout
        self.failure_count = 0
        self.last_failure_time = None
        self.state = "closed" # closed, open, half-open

 def execute(self, func, *args, **kwargs):
 """通过熔断器执行函数"""
 if self.state == "open":
 # 检查是否应该尝试恢复
 if self.should_try_reset():
                self.state = "half-open"
 else:
 raise Exception("熔断器开启，服务暂时不可用")

 try:
            result = func(*args, **kwargs)

 # 成功调用，重置状态
 if self.state == "half-open":
                self.state = "closed"
                self.failure_count = 0

 return result

 except Exception as e:
            self.record_failure()
 raise e

 def record_failure(self):
 """记录失败"""
        self.failure_count += 1
        self.last_failure_time = time.time()

 if self.failure_count &gt;= self.failure_threshold:
            self.state = "open"

 def should_try_reset(self):
 """检查是否应该尝试重置"""
 if self.last_failure_time is None:
 return True

        elapsed = time.time() - self.last_failure_time
 return elapsed &gt; self.reset_timeout

# 使用示例
breaker = CircuitBreaker(failure_threshold=3, reset_timeout=30)

def unreliable_service():
 """模拟不可靠的服务"""
 if random.random() &lt; 0.5:
 raise Exception("服务异常")
 return "服务正常"

for i in range(10):
 try:
        result = breaker.execute(unreliable_service)
 print(f"调用{i+1}: {result}")
 except Exception as e:
 print(f"调用{i+1}: {e}")
        time.sleep(1)</code></pre>


<a id="section-1340"></a>
## 完整的工具调用框架

<a id="t-LEyco0HYthN227l0iMd51Y"></a>

<p id="t-BNxFa5WeTOYR7pUQXhHPlQ"><span>结合上述所有组件，我们可以构建一个完整的工具调用框架：</span></p>


<a id="section-1341"></a>
## 实例

<a id="t-mCv6M60RujY8dAN2sNWOAQ"></a>

<pre id="t-3A9jerxQgxFGqUJod3SZyp"><code>class ToolExecutor:
 """工具执行器"""

 def __init__(self):
        self.tools = {} # 注册的工具
        self.validator = ParameterValidator
        self.error_handler = ErrorHandler()
        self.retry = ExponentialBackoffRetry()
        self.breaker = CircuitBreaker()

 def register_tool(self, name, tool_def, func):
 """注册工具"""
        self.tools[name] = {
 "definition": tool_def,
 "function": func
 }

 def execute_tool(self, tool_name, params):
 """执行工具"""
 if tool_name not in self.tools:
 return {
 "success": False,
 "error": f"工具'{tool_name}'未注册"
 }

        tool_info = self.tools[tool_name]
        tool_def = tool_info["definition"]
        tool_func = tool_info["function"]

 # 验证参数
        validator = self.validator(tool_def)
        is_valid, errors = validator.validate(params)

 if not is_valid:
 return {
 "success": False,
 "error": "参数验证失败",
 "details": errors
 }

 # 通过熔断器执行（带重试）
 try:
 def execute_with_retry():
 return self.breaker.execute(
 lambda: self.retry.retry(tool_func, **params)
 )

            result = execute_with_retry()

 return {
 "success": True,
 "result": result,
 "tool": tool_name
 }

 except Exception as e:
 # 错误处理
            error_response = self.error_handler.handle(e, {
 "tool": tool_name,
 "params": params
 })

 return {
 "success": False,
 "error": error_response["error"],
 "retryable": error_response.get("retryable", False),
 "suggestion": error_response.get("suggestion", "")
 }

 def handle_user_request(self, user_input):
 """处理用户请求（简化版）"""
 # 1. 让LLM选择工具和提取参数（这里简化处理）
 # 实际应用中，这里会调用LLM进行工具选择和参数提取

 # 模拟LLM的输出
 if "天气" in user_input:
            tool_name = "get_weather"
 # 简单提取城市（实际应用中LLM会做得更好）
 if "北京" in user_input:
                params = {"city": "北京", "date": "今天"}
 elif "上海" in user_input:
                params = {"city": "上海", "date": "今天"}
 else:
                params = {"city": "北京", "date": "今天"} # 默认值
 else:
 return "抱歉，我无法处理这个请求"

 # 2. 执行工具
        result = self.execute_tool(tool_name, params)

 # 3. 生成最终回答
 if result["success"]:
            weather = result["result"]
 return f"{params['city']}今天天气：{weather['condition']}，温度{weather['temperature']}°C"
 else:
 return f"获取天气信息失败：{result['error']}"

# 使用示例
executor = ToolExecutor()

# 注册天气工具
def mock_weather_api(city, date):
 """模拟天气API"""
 # 模拟API调用延迟
    time.sleep(0.1)
 return {"temperature": 22, "condition": "多云"}

executor.register_tool("get_weather", weather_tool, mock_weather_api)

# 处理用户请求
response = executor.handle_user_request("北京今天天气怎么样？")
print(response)</code></pre>

