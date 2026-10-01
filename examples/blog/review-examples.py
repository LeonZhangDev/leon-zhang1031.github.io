"""Offline, synthetic fixtures for statistics, image processing and text metrics."""
from __future__ import annotations

import json
import ast
import math
import platform
import re
from pathlib import Path

import cv2 as cv
import matplotlib
matplotlib.use("Agg")
matplotlib.rcParams["svg.hashsalt"] = "blog-review-02"
import matplotlib.pyplot as plt
import numpy as np
import scipy
from scipy.stats import norm
import statsmodels
from statsmodels.stats.power import NormalIndPower
from statsmodels.stats.proportion import confint_proportions_2indep, proportion_effectsize, proportions_ztest

OUTPUT = Path(__file__).resolve().parents[2] / "public/examples/blog-review-02"


def save_figure(fig: plt.Figure, name: str) -> None:
    metadata = {"Creator": "Blog teaching experiment"}
    if name.endswith(".svg"):
        metadata["Date"] = None
    fig.savefig(OUTPUT / name, dpi=150, metadata=metadata)
    plt.close(fig)
    if name.endswith(".svg"):
        path = OUTPUT / name
        path.write_text("\n".join(line.rstrip() for line in path.read_text(encoding="utf-8").splitlines())+"\n", encoding="utf-8")


def show_panels(images: list[np.ndarray], titles: list[str], name: str) -> None:
    fig, axes = plt.subplots(1, len(images), figsize=(4*len(images), 3.7), layout="constrained")
    for ax, data, title in zip(np.atleast_1d(axes), images, titles):
        ax.imshow(cv.cvtColor(data, cv.COLOR_BGR2RGB) if data.ndim == 3 else data,
                  cmap="gray", vmin=0, vmax=255, interpolation="nearest")
        ax.set_title(title, fontsize=11)
        ax.axis("off")
    save_figure(fig, name)


def statistics() -> dict:
    n_a, c_a, n_b, c_b = 52000, 2600, 51800, 2720
    difference = c_b/n_b - c_a/n_a
    lower, upper = confint_proportions_2indep(c_b,n_b,c_a,n_a,compare="diff",method="newcomb",alpha=.05)
    z_score, p_value = proportions_ztest([c_b,c_a],[n_b,n_a],alternative="two-sided")
    per_group = math.ceil(NormalIndPower().solve_power(
        effect_size=abs(proportion_effectsize(.05,.055)),alpha=.05,power=.8,ratio=1,alternative="two-sided"))
    assert lower < difference < upper and per_group > 0
    fig, ax = plt.subplots(figsize=(8,3),layout="constrained")
    ax.errorbar(difference*100,0,xerr=[[100*(difference-lower)],[100*(upper-difference)]],fmt="o",capsize=8)
    ax.axvline(0,color="#777",linestyle="--")
    ax.set(xlabel="B - A (percentage points), 95% Newcombe interval",yticks=[],
           title="Teaching counts | A: 2600/52000, B: 2720/51800")
    save_figure(fig,"ab-confidence.svg")
    # Independent normal observations, known sigma=1. Fixed sample vs daily peeking under H0.
    rng=np.random.default_rng(42)
    repetitions, looks, increment = 10000, 20, 100
    cumulative=rng.normal(0,np.sqrt(2*increment),size=(repetitions,looks)).cumsum(axis=1)
    counts=np.arange(1,looks+1)*increment
    statistics_by_look=cumulative/np.sqrt(2*counts)
    p_values=2*norm.sf(np.abs(statistics_by_look))
    fixed=float(np.mean(p_values[:,-1]<.05))
    peek=float(np.mean(np.any(p_values<.05,axis=1)))
    assert .035<fixed<.065 and peek>fixed
    cumulative_rejections=np.mean(np.maximum.accumulate(p_values<.05,axis=1),axis=0)
    np.savetxt(OUTPUT/"peeking.csv",np.c_[counts,cumulative_rejections],delimiter=",",header="samples_per_group,false_positive_fraction",comments="")
    fig,ax=plt.subplots(figsize=(8,4),layout="constrained")
    ax.plot(counts,cumulative_rejections*100,label="Stop if any p < 0.05")
    ax.axhline(fixed*100,color="#777",linestyle="--",label="One test at final N")
    ax.set(xlabel="Samples per group",ylabel="False positives (%)",title="10,000 synthetic A/A trials | 20 unadjusted looks")
    ax.legend()
    save_figure(fig,"peeking.svg")
    # Separate calibration fixture for CUPED: freeze theta before applying it to evaluation observations.
    calibration=rng.multivariate_normal([0,0],[[1,.6],[.6,1]],size=10000)
    theta=float(np.cov(calibration.T,ddof=1)[0,1]/np.var(calibration[:,0],ddof=1))
    evaluation=rng.multivariate_normal([0,0],[[1,.6],[.6,1]],size=10000)
    adjusted=evaluation[:,1]-theta*(evaluation[:,0]-calibration[:,0].mean())
    variance_ratio=float(np.var(adjusted,ddof=1)/np.var(evaluation[:,1],ddof=1))
    assert .55<variance_ratio<.75
    return {"scope":"Teaching counts and synthetic random variables, not a business experiment", "seed":42,
            "difference":difference,"newcombe_95_ci":[float(lower),float(upper)],"two_sided_z":float(z_score),
            "two_sided_p":float(p_value),"planned_n_per_group":per_group,"aa_repetitions":repetitions,
            "fixed_false_positive_rate":fixed,"peeking_false_positive_rate":peek,
            "cuped_theta":theta,"cuped_variance_ratio":variance_ratio}


def vision() -> dict:
    # All inputs are original synthetic arrays, no downloaded photographs.
    small=np.zeros((12,12),np.uint8)
    small[3:9,3:9]=255
    nearest=cv.resize(small,(108,108),interpolation=cv.INTER_NEAREST)
    linear=cv.resize(small,(108,108),interpolation=cv.INTER_LINEAR)
    assert set(np.unique(nearest))=={0,255} and len(np.unique(linear))>2
    show_panels([small,nearest,linear],["12 x 12 label mask","Nearest: original labels","Linear: intermediate values"],"interpolation.png")
    background=np.full((120,180,3),(150,80,30),np.uint8)
    logo=np.zeros((50,70,3),np.uint8)
    cv.putText(logo,"ZK",(3,37),cv.FONT_HERSHEY_SIMPLEX,1,(255,255,255),2)
    mask=cv.threshold(cv.cvtColor(logo,cv.COLOR_BGR2GRAY),210,255,cv.THRESH_BINARY)[1]
    merged=background.copy()
    roi=merged[20:70,30:100]
    roi[:]=cv.add(cv.bitwise_and(roi,roi,mask=cv.bitwise_not(mask)),cv.bitwise_and(logo,logo,mask=mask))
    assert np.array_equal(roi[mask==0],background[20:70,30:100][mask==0])
    assert np.all(roi[mask!=0]==255)
    show_panels([background,logo,merged],["Background","Synthetic white logo","Correct mask composition"],"watermark.png")
    ramp=np.tile(np.arange(256,dtype=np.uint8),(70,1))
    wrapped=ramp+np.uint8(50)
    clipped=np.clip(ramp.astype(np.int16)+50,0,255).astype(np.uint8)
    assert int(wrapped[0,250])==44 and int(clipped[0,250])==255
    show_panels([ramp,wrapped,clipped],["Input ramp","uint8 + 50: wraparound","int16 + 50 then clip"],"brightness.png")
    canvas=np.zeros((220,300),np.uint8)
    polygon=np.array([[45,45],[190,30],[250,100],[175,120],[215,185],[60,165]],np.int32)
    cv.fillPoly(canvas,[polygon],255)
    contours,_=cv.findContours(canvas,cv.RETR_EXTERNAL,cv.CHAIN_APPROX_SIMPLE)
    assert len(contours)==1
    contour=contours[0]
    hull=cv.convexHull(contour)
    padding=30
    hull_canvas=cv.cvtColor(cv.copyMakeBorder(canvas,padding,padding,padding,padding,cv.BORDER_CONSTANT),cv.COLOR_GRAY2BGR)
    rectangle_canvas=hull_canvas.copy()
    circle_canvas=hull_canvas.copy()
    cv.drawContours(hull_canvas,[hull+padding],-1,(0,180,0),3)
    box=np.rint(cv.boxPoints(cv.minAreaRect(contour))).astype(np.int32)
    cv.drawContours(rectangle_canvas,[box+padding],-1,(0,0,255),3)
    center,radius=cv.minEnclosingCircle(contour)
    cv.circle(circle_canvas,tuple(round(v)+padding for v in center),math.ceil(radius),(0,200,255),3)
    show_panels([hull_canvas,rectangle_canvas,circle_canvas],["Convex hull","Minimum-area rectangle","Minimum enclosing circle"],"contours.png")
    assert cv.contourArea(hull)>=cv.contourArea(contour)>0
    transform=np.float32([[1,0,12],[0,1,8]])
    shifted=cv.warpAffine(canvas,transform,(300,220),flags=cv.INTER_NEAREST)
    assert np.array_equal(shifted[8:,12:],canvas[:-8,:-12])
    point=np.array([150,50,1],dtype=float)
    rotated_point=cv.getRotationMatrix2D((100,50),90,1)@point
    assert np.allclose(rotated_point,[100,0])
    rotated=cv.warpAffine(canvas,cv.getRotationMatrix2D((150,110),30,1),(300,220))
    show_panels([canvas,shifted,rotated],["Original","Translation (+12,+8)","Rotation +30 degrees"],"geometry.png")
    # Simple counting on separate disks; no denomination recognition.
    disks=np.zeros((220,300),np.uint8)
    for x,y,r in [(60,65,25),(155,70,30),(235,155,35)]:
        cv.circle(disks,(x,y),r,255,-1)
    disk_contours,_=cv.findContours(disks,cv.RETR_EXTERNAL,cv.CHAIN_APPROX_SIMPLE)
    accepted=[c for c in disk_contours if cv.arcLength(c,True)>0 and
              4*np.pi*cv.contourArea(c)/cv.arcLength(c,True)**2>=.8]
    assert len(accepted)==3
    annotated=cv.cvtColor(disks,cv.COLOR_GRAY2BGR)
    cv.drawContours(annotated,accepted,-1,(0,180,0),2)
    show_panels([disks,annotated],["Three separate synthetic disks","Contour count = 3 (not real coins)"],"counting.png")
    return {"scope":"Original synthetic fixtures only; no camera/GUI/photo accuracy benchmark", "nearest_labels":np.unique(nearest).tolist(),
            "linear_unique_values":len(np.unique(linear)),"watermark_assertions":"passed",
            "wrapped_250_plus_50":int(wrapped[0,250]),"clipped_250_plus_50":int(clipped[0,250]),
            "contour_area":float(cv.contourArea(contour)),"hull_area":float(cv.contourArea(hull)),
            "rotated_point":rotated_point.tolist(),"synthetic_disk_count":len(accepted)}


def edit_distance(reference: list[str], hypothesis: list[str]) -> int:
    previous=list(range(len(hypothesis)+1))
    for i,left in enumerate(reference,1):
        current=[i]
        for j,right in enumerate(hypothesis,1):
            current.append(min(previous[j]+1,current[j-1]+1,previous[j-1]+(left!=right)))
        previous=current
    return previous[-1]


def text_metrics() -> dict:
    reference="今天会议讨论模型训练进度"
    hypothesis="今天会议讨论模型训练进展"
    characters=edit_distance(list(reference),list(hypothesis))/len(reference)
    whitespace_words=edit_distance(reference.split(),hypothesis.split())/len(reference.split())
    assert characters==1/len(reference) and whitespace_words==1
    assert edit_distance([],list("新增"))==2 and edit_distance(list("相同"),list("相同"))==0
    return {"scope":"Standard-library edit-distance check, not jiwer or Whisper execution", "reference":reference,
            "hypothesis":hypothesis,"reference_characters":len(reference),"cer":characters,"whitespace_wer":whitespace_words}


def article_classifier() -> dict:
    """Run the actual local article function, not a second implementation."""
    article=Path(__file__).resolve().parents[2]/"src/content/posts/opencv-practical-projects.md"
    blocks=re.findall(r"```python\s*\n(.*?)```",article.read_text(encoding="utf-8"),re.S)
    definitions=[node for block in blocks for node in ast.parse(block).body
                 if isinstance(node,ast.FunctionDef) and node.name=="classify_coin"]
    assert len(definitions)==1
    namespace={"np":np}
    exec(compile(ast.Module(body=definitions,type_ignores=[]),str(article),"exec"),namespace)
    classify=namespace["classify_coin"]
    # Fictional calibration: only tests rejection logic, not physical currency dimensions.
    references={10:8.0,50:10.0}
    assert classify(80,.1,references,.2)==10
    assert classify(120,.1,references,.2) is None
    assert classify(90,.1,references,1.1) is None
    invalid=[(80,0,references,.2),(float("nan"),.1,references,.2),(80,.1,{},.2)]
    for args in invalid:
        try:
            classify(*args)
        except ValueError:
            continue
        raise AssertionError("Invalid calibration was accepted")
    return {"scope":"Actual article function with fictional references; no real denomination validation",
            "cases_passed":6}


def main() -> None:
    OUTPUT.mkdir(parents=True,exist_ok=True)
    result={"environment":{"python":platform.python_version(),"numpy":np.__version__,"opencv":cv.__version__,
                             "scipy":scipy.__version__,"statsmodels":statsmodels.__version__,"matplotlib":matplotlib.__version__},
            "statistics":statistics(),"vision":vision(),"text_metrics":text_metrics(),
            "article_classifier":article_classifier()}
    (OUTPUT/"results.json").write_text(json.dumps(result,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
    print(json.dumps(result,ensure_ascii=False,indent=2))


if __name__=="__main__":
    main()
