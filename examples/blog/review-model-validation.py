"""Offline synthetic evidence for prediction protocols, anomaly calibration and search."""
from __future__ import annotations

import ast
import json
import platform
import re
from pathlib import Path

import matplotlib
matplotlib.use('Agg')
matplotlib.rcParams['svg.hashsalt'] = 'blog-review-03'
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import sklearn
from sklearn.datasets import make_classification
from sklearn.ensemble import IsolationForest, RandomForestClassifier
from sklearn.linear_model import Ridge
from sklearn.metrics import mean_absolute_error, roc_auc_score
from sklearn.model_selection import ParameterGrid, ParameterSampler, StratifiedKFold, cross_val_score, train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler

ROOT = Path(__file__).resolve().parents[2]
OUTPUT = ROOT / 'public/examples/blog-review-03'


def article_function(slug: str, name: str):
    """Execute only the selected function definition from a trusted local article."""
    path = ROOT / 'src/content/posts' / f'{slug}.md'
    blocks = re.findall(r'```python\s*\n(.*?)```', path.read_text(encoding='utf-8'), re.S)
    nodes = [node for block in blocks for node in ast.parse(block).body
             if isinstance(node, ast.FunctionDef) and node.name == name]
    assert len(nodes) == 1, name
    namespace = {'pd': pd, 'np': np}
    exec(compile(ast.Module(body=nodes, type_ignores=[]), str(path), 'exec'), namespace)
    return namespace[name]


def save(fig: plt.Figure, name: str) -> None:
    path = OUTPUT / name
    fig.savefig(path, metadata={'Date': None, 'Creator': 'Synthetic blog experiment'})
    plt.close(fig)
    path.write_text('\n'.join(line.rstrip() for line in path.read_text(encoding='utf-8').splitlines()) + '\n', encoding='utf-8')


def forecasting() -> dict:
    features = article_function('time-series-analysis', 'make_features')
    rng = np.random.default_rng(42)
    t = np.arange(210)
    series = pd.Series(30 + .08*t + 5*np.sin(2*np.pi*t/7) + rng.normal(0, .6, len(t)),
                       index=pd.date_range('2025-01-01', periods=len(t), freq='D'))
    changed = series.copy()
    changed.iloc[150:] += 1000
    pd.testing.assert_frame_equal(features(series).loc[:series.index[149]],
                                  features(changed).loc[:series.index[149]])
    for invalid in ((0,), (-1,)):
        try:
            features(series, invalid)
        except ValueError:
            continue
        raise AssertionError('Non-causal lag accepted')
    rows, folds = [], []
    for fold, cutoff in enumerate((120, 150, 180), 1):
        train = features(series.iloc[:cutoff])
        model = make_pipeline(StandardScaler(), Ridge(alpha=1.0))
        model.fit(train.drop(columns='y'), train.y)
        future = features(series).loc[series.index[cutoff:cutoff+30]]
        one_step = model.predict(future.drop(columns='y'))
        recursive, seasonal = [], []
        history = series.iloc[:cutoff].copy()
        seasonal_history = history.copy()
        for date in future.index:
            pending = pd.concat([history, pd.Series([0.0], index=[date])])
            row = features(pending).iloc[[-1]].drop(columns='y')
            prediction = float(model.predict(row)[0])
            recursive.append(prediction)
            history.loc[date] = prediction
            naive = float(seasonal_history.iloc[-7])
            seasonal.append(naive)
            seasonal_history.loc[date] = naive
        truth = future.y.to_numpy()
        lag7_observed = future.lag_7.to_numpy()
        folds.append({'fold': fold, 'train_end': str(train.index[-1].date()),
                      'test_start': str(future.index[0].date()), 'test_end': str(future.index[-1].date()),
                      'one_step_ridge_mae': mean_absolute_error(truth, one_step),
                      'fixed_origin_ridge_mae': mean_absolute_error(truth, recursive),
                      'one_step_lag7_mae': mean_absolute_error(truth, lag7_observed),
                      'fixed_origin_lag7_mae': mean_absolute_error(truth, seasonal)})
        for i, date in enumerate(future.index):
            rows.append({'fold': fold, 'date': date, 'actual': truth[i], 'one_step_ridge': one_step[i],
                         'fixed_origin_ridge': recursive[i], 'one_step_lag7': lag7_observed[i], 'fixed_origin_lag7': seasonal[i]})
    frame = pd.DataFrame(rows)
    frame.to_csv(OUTPUT/'forecasts.csv', index=False)
    last = frame[frame.fold == 3]
    fig, ax = plt.subplots(figsize=(9, 4), layout='constrained')
    for col in ('actual', 'one_step_ridge', 'fixed_origin_ridge', 'fixed_origin_lag7'):
        ax.plot(last.date, last[col], label=col.replace('_', ' '))
    ax.set(title='Synthetic daily series | last 30-day fold', ylabel='Value', xlabel='Target date')
    ax.legend(fontsize=8)
    fig.autofmt_xdate()
    save(fig, 'forecast-protocols.svg')
    return {'scope': 'Synthetic daily data; fixed model, no Prophet/ARIMA/LSTM execution',
            'future_invariance': True, 'invalid_lags_rejected': 2, 'folds': folds}


def anomalies() -> dict:
    causal = article_function('anomaly-detection-practice', 'causal_zscore')
    rng = np.random.default_rng(43)
    series = pd.Series(rng.normal(size=160), index=pd.date_range('2025-01-01', periods=160, freq='h'))
    series.iloc[100] += 9
    changed = series.copy()
    changed.iloc[100:] += 20
    original_score = causal(series, 24)
    pd.testing.assert_series_equal(original_score.iloc[:100], causal(changed, 24).iloc[:100])
    assert causal(pd.Series(np.ones(60)), 24).isna().all()
    assert original_score.iloc[:24].isna().all()
    centered = lambda x: (x-x.rolling(24, center=True).mean())/x.rolling(24, center=True).std()
    assert not np.allclose(centered(series).iloc[90:100], centered(changed).iloc[90:100])
    fig, ax = plt.subplots(figsize=(9, 4), layout='constrained')
    ax.plot(np.arange(80,120), original_score.iloc[80:120], label='Past-only baseline')
    ax.plot(np.arange(80,120), centered(series).iloc[80:120], label='Centered baseline (offline only)')
    ax.axvline(100, color='gray', linestyle='--', label='Injected spike')
    ax.axhline(3, color='red', linestyle=':')
    ax.set(title='Same synthetic spike, different information sets', xlabel='Observation index', ylabel='Z-score')
    ax.legend(fontsize=8)
    save(fig, 'causal-anomaly.svg')
    train, calibration = rng.normal(size=(600,2)), rng.normal(size=(400,2))
    test = np.vstack([rng.normal(size=(400,2)), rng.normal(loc=3, scale=.8, size=(40,2))])
    labels = np.r_[np.zeros(400, dtype=int), np.ones(40, dtype=int)]
    model = IsolationForest(n_estimators=100, contamination=.01, random_state=42, n_jobs=1).fit(train)
    alternative = IsolationForest(n_estimators=100, contamination=.1, random_state=42, n_jobs=1).fit(train)
    scores = -model.score_samples(test)
    assert np.allclose(scores, -alternative.score_samples(test))
    assert model.offset_ != alternative.offset_
    threshold = float(np.quantile(-model.score_samples(calibration), .99))
    flagged = scores > threshold
    tp, fp = int(np.sum(flagged & (labels==1))), int(np.sum(flagged & (labels==0)))
    fig, ax = plt.subplots(figsize=(8,4), layout='constrained')
    ax.hist(scores[labels==0], bins=25, alpha=.6, label='Normal test (400)')
    ax.hist(scores[labels==1], bins=12, alpha=.6, label='Shifted synthetic (40)')
    ax.axvline(threshold, color='red', linestyle='--', label='99th percentile of separate calibration')
    ax.set(title='Isolation Forest | higher score is more unusual', xlabel='Negative score_samples', ylabel='Count')
    ax.legend(fontsize=8)
    save(fig, 'anomaly-calibration.svg')
    pd.DataFrame({'label':labels, 'score':scores, 'flagged':flagged}).to_csv(OUTPUT/'anomaly-scores.csv',index=False)
    return {'scope':'Synthetic shifted points, not real incidents or guaranteed future false-positive control',
            'future_invariance':True, 'centered_window_failed_invariance':True,
            'zero_variance_is_unscored':True, 'contamination_preserves_raw_scores':True,
            'calibration_threshold':threshold, 'true_positives':tp, 'false_positives':fp,
            'false_negatives':40-tp, 'true_negatives':400-fp,
            'precision_at_20':float(labels[np.argsort(-scores)[:20]].mean())}


def search() -> dict:
    x, y = make_classification(n_samples=900, n_features=12, n_informative=6, random_state=44)
    x_dev, x_test, y_dev, y_test = train_test_split(x,y,test_size=.25,stratify=y,random_state=42)
    cv = list(StratifiedKFold(n_splits=3,shuffle=True,random_state=42).split(x_dev,y_dev))
    candidates = {
        'grid':list(ParameterGrid({'max_depth':[3,6,None], 'min_samples_leaf':[1,4], 'max_features':['sqrt',1.0]})),
        'random':list(ParameterSampler({'max_depth':[2,3,4,6,8,None], 'min_samples_leaf':[1,2,4,8],
                                        'max_features':['sqrt',.5,1.0]},n_iter=12,random_state=42))}
    rows, best = [], {}
    fig, ax = plt.subplots(figsize=(8,4), layout='constrained')
    for strategy, settings in candidates.items():
        scores = []
        for index, params in enumerate(settings,1):
            model = RandomForestClassifier(n_estimators=40,random_state=42,n_jobs=1,**params)
            score = float(cross_val_score(model,x_dev,y_dev,cv=cv,scoring='roc_auc',error_score='raise').mean())
            scores.append(score)
            rows.append({'strategy':strategy,'trial':index,'cv_auc':score,'params':json.dumps(params,sort_keys=True)})
        winner = int(np.argmax(scores))
        best[strategy] = {'cv_auc':scores[winner],'params':settings[winner]}
        ax.plot(np.arange(1,13),np.maximum.accumulate(scores),label=strategy)
    strategy = max(best,key=lambda key:best[key]['cv_auc'])
    final = RandomForestClassifier(n_estimators=40,random_state=42,n_jobs=1,**best[strategy]['params']).fit(x_dev,y_dev)
    test_auc = float(roc_auc_score(y_test,final.predict_proba(x_test)[:,1]))
    assert len(rows)==24 and all(0<=row['cv_auc']<=1 for row in rows)
    ax.set(title='Synthetic classification | 12 candidates each, same 3 CV folds',
           xlabel='Candidates evaluated (not elapsed time)',ylabel='Best development CV AUC')
    ax.legend()
    save(fig,'search-budget.svg')
    pd.DataFrame(rows).to_csv(OUTPUT/'search-trials.csv',index=False)
    return {'scope':'One synthetic seed, equal candidate count not equal time; no Optuna execution',
            'development_size':len(y_dev),'test_size':len(y_test),'candidates_per_strategy':12,
            'cv_folds':3,'test_evaluations':1,'selected_strategy':strategy,'selected_test_auc':test_auc,'best':best}


def main() -> None:
    OUTPUT.mkdir(parents=True,exist_ok=True)
    result = {'environment':{'python':platform.python_version(),'numpy':np.__version__,
                            'pandas':pd.__version__,'sklearn':sklearn.__version__,'matplotlib':matplotlib.__version__},
              'forecasting':forecasting(),'anomalies':anomalies(),'search':search()}
    (OUTPUT/'results.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print(json.dumps(result,ensure_ascii=False,indent=2))


if __name__ == '__main__':
    main()
