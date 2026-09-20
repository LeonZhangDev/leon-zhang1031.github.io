export interface LearningPath {
  id: string;
  title: string;
  description: string;
  slugs: string[];
}

export const learningPaths: LearningPath[] = [
  { id: 'foundations', title: '编程与数据基础', description: '从对象与数组到数据处理，为模型实践建立输入和验证习惯。', slugs: ['python-guide-from-beginner-to-advanced', 'python-data-types-containers', 'python-control-flow-statements', 'python-mutability-and-set-types', 'python-iterator-generator-guide', 'python-advance-basics', 'modular-numpy-notes', 'pandas-data-analysis-visualization', 'ml-basics-scikit-learn', 'model-evaluation-metrics-imbalance'] },
  { id: 'deep-learning', title: '深度学习 · 10 课', description: '从训练循环到评估部署；每课明确新增概念与可检查的产物。', slugs: ['deep-learning-01-training-loop', 'deep-learning-02-backprop', 'deep-learning-03-training-stability', 'deep-learning-04-cnn-image-classification', 'deep-learning-05-transfer-learning-project', 'deep-learning-06-rnn-lstm-gru', 'deep-learning-07-transformer-attention', 'deep-learning-08-tensorflow-keras-engineering', 'deep-learning-09-paddle-chinese-text-classification', 'deep-learning-10-model-evaluation-tuning-deployment'] },
  { id: 'mindtrip', title: 'MindTrip · RAG 工程', description: '沿数据、约束、生成和评测追踪一次请求，理解方案取舍。', slugs: ['mindtrip-rag-data-and-retrieval', 'mindtrip-rag-constraint-retrieval', 'mindtrip-rag-model-and-streaming', 'mindtrip-rag-prompt-and-architecture', 'mindtrip-rag-eval-hybrid-retrieval', 'mindtrip-atlassplit-improvements', 'vllm-qwen-performance-tuning'] },
  { id: 'atlassplit', title: 'AtlasSplit · 代码生成与执行', description: '静态审计、运行隔离与错误归因。图集工具开发日志作为独立历史文章保留。', slugs: ['atlassplit-ast-audit-sandbox', 'atlassplit-llm-code-error-analysis'] },
  { id: 'games', title: '独立游戏 · 原型到发布', description: '把玩家体验、机制实现、性能检查和发布条件连起来。', slugs: ['devlog-pickup-money-from-idea-to-crazygames', 'game-difficulty-curve-design', 'cocos-creator-performance-tips', 'crazygames-publish-full-guide', 'indie-game-dev-reflections'] },
  { id: 'vision', title: 'OpenCV · 看得见的处理过程', description: '用相同输入比较变换、掩码、轮廓与项目输出。', slugs: ['python-opencv-tips', 'python-opencv-geometry-transform', 'opencv-image-interpolation-mask-roi-watermark-grayscale-tutorial', 'opencv-contour-feature-extraction', 'opencv-hough-transform-brightness', 'opencv-practical-projects'] },
  { id: 'research-engineering', title: '科研课程 1 · 工程基础', description: '课程案例：环境、版本、Notebook 与 Python 工程。', slugs: ['ai-research-eng-01-dev-environment', 'ai-research-eng-02-git-version-control', 'ai-research-eng-03-jupyter-reproducible', 'ai-research-eng-04-python-project-engineering'] },
  { id: 'research-data', title: '科研课程 2 · 数据集 M1', description: '课程案例：采集、清洗、分析与版本化数据集。', slugs: ['research-data-01-open-metadata-apis', 'research-data-02-scrapy-playwright', 'research-data-03-cleaning-pandas', 'research-data-04-eda-plotly', 'research-data-05-duckdb-parquet'] },
  { id: 'research-ml', title: '科研课程 3 · 模型 M2', description: '课程案例：特征、分类、回归、聚类和模型选择报告。', slugs: ['research-ml-01-feature-engineering', 'research-ml-02-field-classification', 'research-ml-03-citation-regression', 'research-ml-04-topic-clustering', 'research-ml-05-evaluation-tuning-milestone'] },
  { id: 'research-multimodal', title: '科研课程 4 · 理解流水线 M3', description: '课程案例：PDF、文本、图表和多模态证据。', slugs: ['research-mm-01-pdf-parsing', 'research-mm-02-embedding-semantic-search', 'research-mm-03-deep-text-models', 'research-mm-04-figure-formula', 'research-mm-05-multimodal-fusion', 'research-mm-06-understanding-pipeline-milestone'] },
  { id: 'research-service', title: '科研课程 5 · 数据服务', description: '课程案例：数据库、API、任务恢复和交付管线。', slugs: ['research-data-mgmt-01-postgres-pgvector', 'research-data-mgmt-02-fastapi-service', 'research-data-mgmt-03-prefect-pipeline', 'research-data-mgmt-04-docker-cicd'] },
  { id: 'research-capstone', title: '科研课程 6 · 演示与复盘', description: '课程案例：把可验证的产物组织成演示与作品集。', slugs: ['research-capstone-01-streamlit-app', 'research-capstone-02-project-retro-portfolio', 'research-capstone-03-job-interview-defense'] },
];

export function readingMinutes(body: string): number {
  const prose = body.replace(/^ {0,3}(`{3,}|~{3,})[^\n]*\n[\s\S]*?^ {0,3}\1\s*$/gm, '')
    .replace(/<[^>]*>/g, '')
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1');
  const chinese = (prose.match(/[\u3400-\u9fff]/g) || []).length;
  const words = (prose.match(/[A-Za-z0-9]+(?:['-][A-Za-z0-9]+)*/g) || []).length;
  return Math.max(1, Math.ceil(chinese / 400 + words / 200));
}
