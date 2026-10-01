"""Execute selected trusted article snippets and generate scoped teaching evidence."""
from __future__ import annotations

import json
import platform
import re
from pathlib import Path

import matplotlib
matplotlib.use("Agg")
matplotlib.rcParams["svg.hashsalt"] = "blog-review-04"
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import sklearn
import statsmodels
from sklearn.cluster import DBSCAN, KMeans
from sklearn.datasets import make_moons
from sklearn.linear_model import LinearRegression
from sklearn.metrics import adjusted_rand_score, confusion_matrix, f1_score, mean_absolute_error, mean_squared_error, r2_score
from sklearn.tree import DecisionTreeRegressor

ROOT = Path(__file__).resolve().parents[2]
OUTPUT = ROOT / "public/examples/blog-review-04"
EXECUTED: list[str] = []


def snippet(slug: str, label: str, namespace: dict) -> None:
    """Execute exactly one labelled code fence from reviewed local source, not downloads."""
    path = ROOT / "src/content/posts" / f"{slug}.md"
    blocks = re.findall(r"```python\s*\n(.*?)```", path.read_text(encoding="utf-8"), re.S)
    selected = [block for block in blocks if block.splitlines()[0] == f"# example: {label}"]
    assert len(selected) == 1, (slug, label)
    exec(compile(selected[0], f"{path}#{label}", "exec"), namespace)
    EXECUTED.append(f"{slug}#{label}")


def save(fig: plt.Figure, name: str) -> None:
    path = OUTPUT / name
    fig.savefig(path, metadata={"Date": None, "Creator": "Blog teaching experiment"})
    plt.close(fig)
    path.write_text("\n".join(line.rstrip() for line in path.read_text(encoding="utf-8").splitlines()) + "\n", encoding="utf-8")


def iris() -> dict:
    ns: dict = {}
    for label in ("iris-setup", "iris-cv", "mixed-pipeline", "iris-search", "iris-final", "iris-persistence"):
        snippet("ml-basics-scikit-learn", label, ns)
    final, search = ns["final_model"], ns["search"]
    np.testing.assert_allclose(final.named_steps["scaler"].mean_, ns["X_train"].mean(axis=0))
    train = pd.DataFrame({
        "age": [20, 35, np.nan, 50, 28, 42, 31, 60],
        "income": [2000, 6000, 3500, np.nan, 3000, 7000, 4000, 8000],
        "city": ["A", "B", "A", "B", np.nan, "B", "A", "B"],
        "job": ["X", "Y", "X", np.nan, "X", "Y", "X", "Y"],
    })
    new = pd.DataFrame({"age": [np.nan, 33], "income": [4500, np.nan], "city": ["unseen", "A"], "job": ["unseen", np.nan]})
    mixed = ns["mixed_pipe"].fit(train, [0, 1, 0, 1, 0, 1, 0, 1])
    prediction = mixed.predict(new)
    assert prediction.shape == (2,)
    prep = mixed.named_steps["prep"]
    learned = prep.named_transformers_["num"].named_steps["fill"].statistics_
    np.testing.assert_allclose(learned, np.nanmedian(train[["age", "income"]].to_numpy(), axis=0))
    encoded = prep.named_transformers_["cat"].transform(new[["city", "job"]]).toarray()
    assert np.all(encoded[0] == 0)
    cv = pd.DataFrame(search.cv_results_)
    cv[["param_model__C", "mean_test_score", "std_test_score"]].to_csv(OUTPUT / "iris-candidates.csv", index=False)
    matrix = confusion_matrix(ns["y_test"], ns["y_pred"])
    fig, axes = plt.subplots(1, 2, figsize=(10, 3.8), layout="constrained")
    axes[0].errorbar(cv["param_model__C"].astype(float), cv["mean_test_score"], yerr=cv["std_test_score"], marker="o", capsize=4)
    axes[0].set(xscale="log", xlabel="C (inverse regularization)", ylabel="Macro F1", title="Training-only 5-fold CV (+/- fold SD)")
    axes[1].imshow(matrix, cmap="Blues", vmin=0)
    for (row, col), value in np.ndenumerate(matrix):
        axes[1].text(col, row, str(value), ha="center", va="center", color="white" if value > 5 else "black")
    axes[1].set(xticks=[0, 1, 2], yticks=[0, 1, 2], xlabel="Predicted class", ylabel="True class", title="Selected model: 30 held-out samples")
    save(fig, "iris-selection.svg")
    return {"best_C": search.best_params_["model__C"], "test_macro_f1": f1_score(ns["y_test"], ns["y_pred"], average="macro"),
            "confusion_matrix": matrix.tolist(), "test_prediction_calls": 1, "training_only_statistics": True,
            "mixed_missing_and_unknown_passed": True, "trusted_persistence_roundtrip": True}


def regression() -> dict:
    ns: dict = {}
    for label in ("regression-setup", "regression-vif", "regression-regularization", "regression-log", "regression-polynomial"):
        snippet("ml-linear-regression", label, ns)
    assert ns["X_with_log"].shape == (500, 4)
    assert ns["pipe"].named_steps["poly"].n_output_features_ == 9
    assert np.isfinite(ns["vif"]["VIF"]).all()
    np.testing.assert_allclose(ns["ridge"].named_steps["standardscaler"].mean_, ns["X_train"].mean(axis=0))
    pred, true = ns["y_pred"], ns["y_test"]
    rmse, mae = mean_squared_error(true, pred) ** .5, mean_absolute_error(true, pred)
    assert rmse >= mae
    assert r2_score([1, 1, 1], [1, 1, 1]) == 1
    assert r2_score([1, 1, 1], [0, 0, 0]) == 0
    residual = true - pred
    pd.DataFrame({"target": true, "prediction": pred, "residual": residual}).to_csv(OUTPUT / "regression-residuals.csv", index=False)
    fig, axes = plt.subplots(1, 2, figsize=(10, 3.8), layout="constrained")
    axes[0].scatter(pred, residual, alpha=.7, s=16)
    axes[0].axhline(0, color="black", linewidth=1)
    axes[0].set(xlabel="Predicted target", ylabel="True - predicted", title="Synthetic regression: held-out residuals")
    axes[1].bar(["MAE", "RMSE"], [mae, rmse], color=["#2a9d8f", "#e9a23b"])
    for i, value in enumerate([mae, rmse]):
        axes[1].text(i, value + .1, f"{value:.3f}", ha="center")
    axes[1].set(ylabel="Synthetic target units", ylim=(0, rmse * 1.2), title="Same errors, different aggregation")
    save(fig, "regression-diagnostics.svg")
    return {"rmse": rmse, "mae": mae, "r2": r2_score(true, pred), "coefficients": ns["model"].coef_.tolist(),
            "vif_with_intercept": ns["vif"]["VIF"].tolist(), "log_array_shape": list(ns["X_with_log"].shape),
            "polynomial_features": 9, "constant_target_defaults_checked": True}


def trees() -> dict:
    ns: dict = {}
    for label in ("tree-setup", "tree-pruning", "tree-regression", "tree-selection"):
        snippet("ml-decision-tree", label, ns)
    search = ns["depth_search"]
    cv = pd.DataFrame(search.cv_results_)
    cv[["param_max_depth", "mean_train_score", "mean_test_score", "std_test_score"]].to_csv(OUTPUT / "tree-depths.csv", index=False)
    rng = np.random.default_rng(42)
    x = np.linspace(0, 1, 100).reshape(-1, 1)
    y = 2 + 3*x[:, 0] + rng.normal(0, .1, len(x))
    grid = np.linspace(-.5, 1.5, 240).reshape(-1, 1)
    tree = DecisionTreeRegressor(max_depth=3, random_state=42).fit(x, y)
    linear = LinearRegression().fit(x, y)
    pred = tree.predict(grid)
    assert pred.min() >= y.min() and pred.max() <= y.max()
    assert np.ptp(pred[grid[:, 0] < 0]) == 0 and np.ptp(pred[grid[:, 0] > 1]) == 0
    fig, axes = plt.subplots(1, 2, figsize=(10, 3.8), layout="constrained")
    labels = [str(p["max_depth"]) for p in search.cv_results_["params"]]
    axes[0].plot(range(5), cv["mean_train_score"], "o-", label="Training folds")
    axes[0].errorbar(range(5), cv["mean_test_score"], yerr=cv["std_test_score"], marker="o", capsize=3, label="Validation folds +/- SD")
    axes[0].set(xticks=range(5), xticklabels=labels, xlabel="Maximum depth", ylabel="Macro F1", title="Wine: training-only depth selection")
    axes[0].legend(fontsize=8)
    axes[1].axvspan(0, 1, color="grey", alpha=.12, label="Training x range")
    axes[1].scatter(x[:, 0], y, s=8, alpha=.5)
    axes[1].plot(grid[:, 0], pred, label="Depth-3 tree")
    axes[1].plot(grid[:, 0], linear.predict(grid), label="Linear regression")
    axes[1].set(xlabel="x", ylabel="Synthetic target", title="Outside training support: a separate example")
    axes[1].legend(fontsize=8)
    save(fig, "tree-boundaries.svg")
    return {"selected_depth": search.best_params_["max_depth"], "wine_test_macro_f1": f1_score(ns["y_test"], ns["final_prediction"], average="macro"),
            "wine_test_prediction_calls": 1, "extrapolation_within_training_target_range": True,
            "constant_predictions_outside_training_x": True, "diabetes_example_executed": True}


def clustering() -> dict:
    ns: dict = {}
    for label in ("clustering-setup", "clustering-candidates", "clustering-predict"):
        snippet("ml-kmeans-clustering", label, ns)
    assert ns["km"].n_clusters == 2
    assert len(ns["silhouettes"]) == 6 and np.isfinite(ns["silhouettes"]).all()
    np.testing.assert_array_equal(ns["km"].predict(ns["X_scaled"]), ns["labels"])
    for k in range(2):
        np.testing.assert_allclose(ns["centers_original_units"][k], ns["X"][ns["labels"] == k].mean(axis=0))
    x, truth = make_moons(n_samples=400, noise=.06, random_state=42)
    # Fixed before evaluation; ARI is not used to select these hyperparameters.
    km = KMeans(n_clusters=2, n_init=10, random_state=42).fit_predict(x)
    db = DBSCAN(eps=.2, min_samples=5).fit_predict(x)
    fig, axes = plt.subplots(1, 3, figsize=(11, 3.4), layout="constrained")
    for ax, values, title in zip(axes, [truth, km, db], ["Generating labels", "KMeans: K=2", "DBSCAN: eps=0.2"]):
        ax.scatter(x[:, 0], x[:, 1], c=values, cmap="tab10", s=10)
        ax.set(title=title, xlabel="Synthetic x1", ylabel="Synthetic x2", aspect="equal")
    save(fig, "clustering-shapes.svg")
    return {"original_model_K": ns["km"].n_clusters, "candidate_count": 6, "new_labels": ns["new_labels"].tolist(),
            "inverse_centers_match_raw_means": True, "moons_kmeans_ari": adjusted_rand_score(truth, km),
            "moons_dbscan_ari": adjusted_rand_score(truth, db), "dbscan_noise": int((db == -1).sum()),
            "dbscan_clusters": len(set(db) - {-1}), "scope": "Synthetic geometry only; no business benchmark"}


def main() -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)
    result = {"environment": {"python": platform.python_version(), "numpy": np.__version__, "pandas": pd.__version__,
                              "sklearn": sklearn.__version__, "statsmodels": statsmodels.__version__, "matplotlib": matplotlib.__version__},
              "seed": 42, "scope": "Selected trusted article snippets, bundled datasets and synthetic examples; not full article reproduction",
              "iris": iris(), "regression": regression(), "trees": trees(), "clustering": clustering(), "executed_snippets": EXECUTED}
    assert len(EXECUTED) == 18
    (OUTPUT / "results.json").write_text(json.dumps(result, ensure_ascii=False, indent=2, allow_nan=False) + "\n", encoding="utf-8")
    print(json.dumps(result, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
