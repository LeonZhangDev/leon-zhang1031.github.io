# 博客可运行教学实验

入口：`python examples/blog/run-examples.py`。需 Python、NumPy、PyTorch、scikit-learn、Matplotlib；实际运行版本记录在 `public/examples/blog/results.json`。不请求网络、不下载模型、不需要 GPU。脚本失败会返回非零退出码；缺包时请在独立环境安装，勿修改系统环境。

输出至 `public/examples/blog/`：训练损失原始 CSV、损失曲线 SVG、因果注意力热力图 SVG、环境版本与断言结果 JSON。重新运行会覆盖这些教学产物。

实验覆盖浅/深拷贝、标量梯度差分、合成二维分类训练、单头因果掩码、验证集阈值与 F1 对齐。固定种子不保证跨平台逐位一致；浮点断言使用容差。

这些结果只证明对应最小示例在记录环境运行通过，不能外推为整篇文章、真实业务数据、GPU 性能或线上部署已复现。训练图是训练损失，不是验证损失；测试集只在最后评估一次，未用于选超参数。注意力图来自随机矩阵而不是训练后的语言模型。

## 第二批：统计、图像与中文评估

入口：`python examples/blog/review-examples.py`。依赖 NumPy、OpenCV、SciPy、Statsmodels、Matplotlib；无需 PyTorch、jiwer、librosa、Whisper、网络或 GPU。当前执行环境详见 `public/examples/blog-review-02/results.json`，不要把环境快照误当作跨平台兼容保证。

输出（重跑会覆盖）：

- A/B 教学计数的 Newcombe 区间 SVG、10000 次 A/A 的重复查看误报曲线 SVG/CSV。
- 六张合成图像对比 PNG：插值、水印、亮度、轮廓、几何变换、圆盘计数。
- 环境、种子、数值和断言结果 JSON。SVG 固定 hash salt 并省略日期，避免只因重跑而改变标识。
- 从本地 `opencv-practical-projects.md` 提取实际 `classify_coin` 函数，验证匹配、未知、歧义与无效输入共六项；标定值是虚构测试夹具，不是真实币种尺寸。

OpenCV 数据全部在脚本中生成；中文 CER 使用标准库编辑距离。统计模拟、轮廓计数不代表线上业务、真实照片准确率或语音模型已经复现。运行前检查脚本与本地文章代码；脚本会执行该文章中的指定函数定义。
