"""Small CPU-only teaching experiments. No network, credentials or pretrained models."""
from __future__ import annotations

import json
import platform
from pathlib import Path

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np
import sklearn
import torch
from sklearn.metrics import precision_recall_curve
from sklearn.model_selection import train_test_split

ROOT = Path(__file__).resolve().parents[2]
OUTPUT = ROOT / "public" / "examples" / "blog"


def gradient_check() -> dict:
    """Compare central finite differences against autograd on one scalar loss."""
    x = torch.tensor(0.7, dtype=torch.float64, requires_grad=True)
    loss = (x * x - 2) ** 2
    loss.backward()
    epsilon = 1e-5
    f = lambda value: (value * value - 2) ** 2
    numerical = (f(0.7 + epsilon) - f(0.7 - epsilon)) / (2 * epsilon)
    autodiff = float(x.grad)
    assert abs(numerical - autodiff) < 1e-7
    return {"autograd": autodiff, "central_difference": numerical, "epsilon": epsilon}


def copy_check() -> dict:
    import copy
    original = [[1], [2]]
    alias = original
    shallow = original.copy()
    deep = copy.deepcopy(original)
    original[0].append(3)
    assert alias is original and shallow is not original
    assert shallow[0] is original[0] and deep[0] is not original[0]
    assert shallow == [[1, 3], [2]] and deep == [[1], [2]]
    return {"original": original, "shallow": shallow, "deep": deep}


def training_check() -> dict:
    """Train on an artificial nonlinear target; not a real-world benchmark."""
    torch.manual_seed(42)
    torch.set_num_threads(1)
    rng = np.random.default_rng(42)
    features = rng.normal(size=(2000, 2)).astype(np.float32)
    labels = (features[:, 0] * features[:, 1] > 0).astype(np.int64)
    x_train, x_test, y_train, y_test = train_test_split(
        features, labels, test_size=0.25, random_state=42, stratify=labels
    )
    train_x, train_y = torch.from_numpy(x_train), torch.from_numpy(y_train)
    model = torch.nn.Sequential(torch.nn.Linear(2, 32), torch.nn.Tanh(), torch.nn.Linear(32, 2))
    optimizer = torch.optim.Adam(model.parameters(), lr=0.03)
    losses = []
    model.train()
    for _ in range(150):
        optimizer.zero_grad(set_to_none=True)
        loss = torch.nn.functional.cross_entropy(model(train_x), train_y)
        loss.backward()
        optimizer.step()
        losses.append(loss.item())
    model.eval()
    with torch.inference_mode():
        accuracy = float((model(torch.from_numpy(x_test)).argmax(1).numpy() == y_test).mean())
    assert np.isfinite(losses).all() and losses[-1] < losses[0] * 0.3
    assert accuracy >= 0.9
    np.savetxt(OUTPUT / "training-loss.csv", np.c_[np.arange(1,151), losses],
               delimiter=",", header="epoch,train_cross_entropy", comments="")
    fig, ax = plt.subplots(figsize=(8, 4.5), layout="constrained")
    ax.plot(np.arange(1,151), losses, color="#216a99", linewidth=2)
    ax.set(xlabel="Epoch (full-batch)", ylabel="Training cross-entropy",
           title="CPU teaching experiment | synthetic 2D classification")
    ax.grid(alpha=.2)
    fig.savefig(OUTPUT / "training-loss.svg")
    plt.close(fig)
    return {"seed":42, "train_samples":1500, "test_samples":500, "epochs":150,
            "initial_loss":losses[0], "final_loss":losses[-1], "held_out_accuracy":accuracy,
            "scope":"Artificial target only; no hyperparameter search or real-world performance claim."}


def attention_check() -> dict:
    rng = np.random.default_rng(42)
    query, key = rng.normal(size=(2, 4, 3))
    scores = query @ key.T / np.sqrt(3)
    scores[np.triu_indices(4, 1)] = -np.inf
    weights = np.exp(scores - np.max(scores, axis=-1, keepdims=True))
    weights /= weights.sum(axis=-1, keepdims=True)
    assert np.allclose(weights.sum(axis=-1), 1)
    assert np.all(weights[np.triu_indices(4, 1)] == 0)
    fig, ax = plt.subplots(figsize=(6, 4.8), layout="constrained")
    heatmap = ax.imshow(weights, vmin=0, vmax=1, cmap="Blues")
    for i in range(4):
        for j in range(4):
            ax.text(j,i,f"{weights[i,j]:.2f}",ha="center",va="center",
                    color="white" if weights[i,j]>.55 else "black")
    ax.set(xticks=range(4), yticks=range(4), xlabel="Key position", ylabel="Query position",
           title="Causal attention | random Q/K, not a trained model")
    fig.colorbar(heatmap, ax=ax)
    fig.savefig(OUTPUT / "causal-attention.svg")
    plt.close(fig)
    return {"seed":42, "weights":weights.tolist(), "scope":"Synthetic Q/K, one head, four tokens, d_k=3."}


def threshold_check() -> dict:
    """Frozen validation fixture. No test labels are used for threshold selection."""
    validation_y = np.array([0, 1, 0, 1, 0, 0, 1, 0])
    validation_score = np.array([.1, .9, .7, .8, .3, .6, .65, .2])
    precision, recall, thresholds = precision_recall_curve(validation_y, validation_score)
    assert len(precision) == len(recall) == len(thresholds) + 1
    f1 = 2 * precision[:-1] * recall[:-1] / np.maximum(precision[:-1] + recall[:-1], 1e-12)
    best = int(np.argmax(f1))
    threshold = float(thresholds[best])
    predicted = validation_score >= threshold
    tp = int(np.sum(predicted & (validation_y == 1)))
    fp = int(np.sum(predicted & (validation_y == 0)))
    fn = int(np.sum(~predicted & (validation_y == 1)))
    assert np.isclose(f1[best], 2 * tp / (2 * tp + fp + fn))
    assert threshold == .65
    return {"validation_threshold":threshold, "validation_f1":float(f1[best]),
            "true_positive":tp,"false_positive":fp,"false_negative":fn,
            "scope":"Array-alignment and selection unit example; not a held-out model assessment."}


def main() -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)
    results = {"environment":{"python":platform.python_version(), "torch":torch.__version__,
                 "numpy":np.__version__, "scikit_learn":sklearn.__version__,
                 "matplotlib":matplotlib.__version__, "device":"cpu"},
               "gradient":gradient_check(), "copy":copy_check(), "training":training_check(),
               "attention":attention_check(), "threshold":threshold_check()}
    for name in ("training-loss.svg", "causal-attention.svg"):
        plot = OUTPUT / name
        plot.write_text("\n".join(line.rstrip() for line in plot.read_text(encoding="utf-8").splitlines())+"\n", encoding="utf-8")
    (OUTPUT / "results.json").write_text(json.dumps(results,ensure_ascii=False,indent=2)+"\n", encoding="utf-8")
    print(json.dumps(results,ensure_ascii=False,indent=2))


if __name__ == "__main__":
    main()
