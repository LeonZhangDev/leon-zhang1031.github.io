import {
  calculateBazi,
  calculateBaziFromPillars,
  type CalculationEnvelope,
  type BaziOutput,
} from './calculate';
import { interpretBazi } from './interpret';
import {
  resolveLunarInput,
  validateFourPillars,
  type BaziGender,
  type BaziInputMode,
} from './input';
import { calculateLuckTimeline, type LuckTimeline } from './luck';
import { buildRelationNodes, detectGanZhiRelations } from './relations';
import { normalizeInput } from '../calendar/engine';
import type { CalendarInput } from '../calendar/types';
import { createStudyCase, type StudyCaseRecord } from '../study-case';
import { receiveStudyCase } from '../study-handoff';
const form = document.getElementById('bazi-form') as HTMLFormElement | null;
if (form) {
  const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
  const inputPanels: Record<BaziInputMode, HTMLElement> = {
    solar: $('bazi-solar-fields'),
    lunar: $('bazi-lunar-fields'),
    pillars: $('bazi-pillar-fields'),
  };
  const result = $('bazi-result'),
    errorEl = $('bazi-error'),
    statusEl = $('bazi-status');
  const submitBtn = $<HTMLButtonElement>('bazi-submit'),
    place = $('bazi-place'),
    city = $<HTMLSelectElement>('bazi-city'),
    longitude = $<HTMLInputElement>('bazi-longitude'),
    unknownMinute = $<HTMLInputElement>('bazi-unknown-minute');
  let lastCase: StudyCaseRecord | null = null,
    lastEnvelope: CalculationEnvelope<BaziOutput> | null = null,
    lastLuck: LuckTimeline | null = null;
  let selectedDaYun = 0,
    selectedLiuNian = 0,
    selectedLiuYue = -1,
    inputMode: BaziInputMode = 'solar',
    viewMode: 'basic' | 'pro' = 'basic';
  const text = (id: string, content: string) => {
    $(id).textContent = content;
  };
  const value = (id: string) => $<HTMLInputElement>(id).value.trim();
  const numberValue = (id: string) => Number(value(id));
  const checkedValue = (name: string) =>
    (form.querySelector(`input[name="${name}"]:checked`) as HTMLInputElement).value;
  const pad = (n: number) => String(n).padStart(2, '0');
  const escapeHtml = (raw: string) =>
    raw.replace(
      /[&<>"']/g,
      (c) =>
        ({
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#39;',
        })[c] ?? c,
    );
  const showError = (message: string) => {
    errorEl.textContent = message;
    errorEl.hidden = false;
    result.hidden = true;
    statusEl.textContent = '排盘未完成，请检查输入。';
    statusEl.classList.add('is-error');
  };
  const clearError = () => {
    errorEl.hidden = true;
    errorEl.textContent = '';
    statusEl.classList.remove('is-error');
  };
  const syncMode = (mode: BaziInputMode) => {
    inputMode = mode;
    Object.entries(inputPanels).forEach(([key, panel]) => {
      panel.hidden = key !== mode;
    });
    $('bazi-profile-rules').hidden = mode === 'pillars';
    $('bazi-calibration').hidden = mode === 'pillars';
    $<HTMLButtonElement>('bazi-now').hidden = mode === 'pillars';
    for (const id of ['bazi-minute', 'bazi-lunar-minute']) {
      $<HTMLInputElement>(id).disabled = unknownMinute.checked;
    }
    statusEl.textContent =
      mode === 'pillars'
        ? '填写四柱后排盘；岁运功能将停用'
        : `填写${mode === 'solar' ? '公历' : '农历'}时刻后排盘`;
  };
  const syncView = (mode: 'basic' | 'pro') => {
    viewMode = mode;
    result.dataset.view = mode;
    if (lastCase?.resume) lastCase.resume.form.viewMode = mode;
    document.querySelectorAll<HTMLElement>('.bazi-pro-only').forEach((el) => {
      el.hidden = mode !== 'pro';
    });
    document.querySelectorAll<HTMLButtonElement>('[data-bazi-view]').forEach((button) => {
      const active = button.dataset.baziView === mode;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
  };
  const activeTimeIds = () =>
    inputMode === 'lunar'
      ? [
          'bazi-lunar-year',
          'bazi-lunar-month',
          'bazi-lunar-day',
          'bazi-lunar-hour',
          'bazi-lunar-minute',
        ]
      : ['bazi-year', 'bazi-month', 'bazi-day', 'bazi-hour', 'bazi-minute'];
  const updateTimePreview = () => {
    if (checkedValue('timeMode') === 'legal') {
      text('bazi-time-preview', '法定时不作经度校正。');
      return;
    }
    if (inputMode !== 'solar' || activeTimeIds().some((id) => !value(id))) {
      text('bazi-time-preview', '完整填写公历时刻后，将在这里预览真太阳时校正。');
      return;
    }
    try {
      const normalized = normalizeInput({
        year: numberValue('bazi-year'),
        month: numberValue('bazi-month'),
        day: numberValue('bazi-day'),
        hour: numberValue('bazi-hour'),
        minute: unknownMinute.checked ? 0 : numberValue('bazi-minute'),
        timeMode: 'true-solar',
        longitude: Number(longitude.value),
        lateZi: checkedValue('lateZi') as CalendarInput['lateZi'],
      });
      const t = normalized.effective;
      text(
        'bazi-time-preview',
        `校正 ${normalized.trueSolarShiftMinutes >= 0 ? '+' : ''}${normalized.trueSolarShiftMinutes.toFixed(1)} 分钟 → ${t.year}-${pad(t.month)}-${pad(t.day)} ${pad(t.hour)}:${pad(t.minute)}`,
      );
    } catch {
      text('bazi-time-preview', '校正预览需要有效日期与 70°E—140°E 经度。');
    }
  };
  form.addEventListener('change', (event) => {
    const target = event.target as HTMLInputElement;
    if (target.name === 'inputMode') syncMode(target.value as BaziInputMode);
    if (target.name === 'timeMode') place.hidden = target.value !== 'true-solar';
    updateTimePreview();
  });
  form.addEventListener('input', updateTimePreview);
  city.addEventListener('change', () => {
    if (city.value !== 'manual') longitude.value = city.value;
    updateTimePreview();
  });
  longitude.addEventListener('input', () => {
    city.value = 'manual';
  });
  unknownMinute.addEventListener('change', () => {
    for (const id of ['bazi-minute', 'bazi-lunar-minute']) {
      const minute = $<HTMLInputElement>(id);
      minute.disabled = unknownMinute.checked;
      if (unknownMinute.checked) minute.value = '0';
    }
    updateTimePreview();
  });
  $('bazi-now').addEventListener('click', () => {
    const now = new Date();
    unknownMinute.checked = false;
    form.querySelector<HTMLInputElement>('input[name="inputMode"][value="solar"]')!.checked = true;
    syncMode('solar');
    ['bazi-year', 'bazi-month', 'bazi-day', 'bazi-hour', 'bazi-minute'].forEach((id, i) => {
      $<HTMLInputElement>(id).value = String(
        [now.getFullYear(), now.getMonth() + 1, now.getDate(), now.getHours(), now.getMinutes()][i],
      );
    });
    clearError();
    statusEl.textContent = '已填入本机此刻 · 可校准后排盘';
    updateTimePreview();
  });
  const buildCalendarInput = () => {
    const timeMode = checkedValue('timeMode') as CalendarInput['timeMode'],
      lateZi = checkedValue('lateZi') as CalendarInput['lateZi'];
    const ids = activeTimeIds();
    const missing = (unknownMinute.checked ? ids.slice(0, 4) : ids).find((id) => !value(id));
    if (missing) {
      $<HTMLInputElement>(missing).focus();
      throw new Error('请完整填写年、月、日、时、分后再排盘。');
    }
    const shared = {
      timeMode,
      lateZi,
      ...(timeMode === 'true-solar' ? { longitude: Number(longitude.value) } : {}),
    };
    if (inputMode === 'lunar') {
      const resolved = resolveLunarInput({
        year: numberValue('bazi-lunar-year'),
        month: numberValue('bazi-lunar-month'),
        day: numberValue('bazi-lunar-day'),
        hour: numberValue('bazi-lunar-hour'),
        minute: unknownMinute.checked ? 0 : numberValue('bazi-lunar-minute'),
        leapMonth: $<HTMLInputElement>('bazi-leap-month').checked,
        ...shared,
      });
      return {
        calendar: resolved.calendarInput,
        sourceLabel: resolved.sourceLabel,
        prefixSteps: resolved.derivation,
      };
    }
    const calendar: CalendarInput = {
      year: numberValue('bazi-year'),
      month: numberValue('bazi-month'),
      day: numberValue('bazi-day'),
      hour: numberValue('bazi-hour'),
      minute: unknownMinute.checked ? 0 : numberValue('bazi-minute'),
      ...shared,
    };
    return {
      calendar,
      sourceLabel: `公历 ${calendar.year}-${pad(calendar.month)}-${pad(calendar.day)}`,
      prefixSteps: [],
    };
  };
  const safeSummary = (env: CalculationEnvelope<BaziOutput>) =>
    `静心堂 · 八字研习\n四柱：${Object.values(env.output.pillars).join(' / ')}\n日主：${env.output.dayMaster.stem}（${env.output.dayMaster.yinYang}${env.output.dayMaster.element}）\n五行：${Object.entries(
      env.output.elements,
    )
      .map(([k, v]) => `${k}${v}`)
      .join('、')}\n规则：${env.version}\n仅供传统文化研习，不含出生信息。`;
  const renderRelations = () => {
    if (!lastEnvelope) return;
    const cycle = lastLuck?.cycles[selectedDaYun],
      year = cycle?.liuNian[selectedLiuNian];
    const month = year?.liuYue[selectedLiuYue];
    const nodes = buildRelationNodes(lastEnvelope.output.pillars, {
      daYun: cycle?.ganZhi,
      liuNian: year?.ganZhi,
      liuYue: month?.ganZhi,
    });
    const relations = detectGanZhiRelations(nodes);
    $('bazi-relation-nodes').innerHTML = nodes
      .map(
        (node) =>
          `<button type="button" data-relation-node="${node.id}" aria-label="查看${node.label}${node.ganZhi}的关系" class="${node.scope === '本命' ? '' : 'is-current'}"><small>${node.scope} · ${node.label}</small><b>${node.ganZhi}</b></button>`,
      )
      .join('');
    $('bazi-relations').innerHTML = relations.length
      ? relations
          .map(
            (item, index) =>
              `<li data-relation-members="${item.members.join(' ')}" class="${item.kind.includes('合') || item.kind.includes('会') ? 'is-union' : item.kind.includes('冲') ? 'is-clash' : ''}"><button type="button" data-relation-index="${index}" aria-label="高亮${escapeHtml(item.description)}">${item.kind}</button><span>${escapeHtml(item.description)}</span></li>`,
          )
          .join('')
      : '<li class="is-empty">当前选择未匹配到本站收录的合冲刑害结构。</li>';
    const positions = nodes.map((node, index) => ({
      id: node.id,
      x: 55 + index * 90,
      y: index < 4 ? 95 : 215,
    }));
    const graph = $('bazi-relation-svg');
    graph.innerHTML = `<title>本命与所选岁运干支关系</title>${relations
      .map((relation, index) => {
        const members = positions.filter((point) => relation.members.includes(point.id));
        return members
          .slice(1)
          .map(
            (point) =>
              `<path data-relation-edge="${index}" d="M ${members[0].x},${members[0].y} Q ${(members[0].x + point.x) / 2},${Math.min(members[0].y, point.y) - 50 - (index % 3) * 16} ${point.x},${point.y}" fill="none" stroke="${relation.kind.includes('合') || relation.kind.includes('会') ? '#9baf6e' : '#bc815d'}" stroke-width="1.5" opacity=".45"><title>${escapeHtml(relation.description)}</title></path>`,
          )
          .join('');
      })
      .join(
        '',
      )}${positions.map((point, index) => `<g><circle cx="${point.x}" cy="${point.y}" r="31" fill="#281d11" stroke="#b08b52"/><text x="${point.x}" y="${point.y + 5}" text-anchor="middle" fill="#e9d3a5" font-size="20">${nodes[index].ganZhi}</text><text x="${point.x}" y="${point.y + 48}" text-anchor="middle" fill="#b9a480" font-size="12">${nodes[index].label}</text></g>`).join('')}`;
    window.dispatchEvent(
      new CustomEvent('jing:study-context', {
        detail: {
          terms: [
            'ganzhi-relations',
            ...(cycle ? ['dayun'] : []),
            ...(year ? ['liunian'] : []),
            ...(month ? ['liuyue'] : []),
          ],
          facts: [
            `本命四柱 ${Object.values(lastEnvelope.output.pillars).join(' ')}`,
            cycle ? `大运 ${cycle.ganZhi}` : '',
            year ? `流年 ${year.year} ${year.ganZhi}` : '',
            month ? `流月 ${month.name}月 ${month.ganZhi}` : '',
          ].filter(Boolean),
          rule: relations.length
            ? `当前标记 ${relations.map((item) => item.kind).join('、')}`
            : '当前无已收录的两两关系',
        },
      }),
    );
  };
  const renderLiuNian = () => {
    const cycle = lastLuck?.cycles[selectedDaYun];
    if (!cycle) {
      $('bazi-liunian-timeline').replaceChildren();
      renderRelations();
      return;
    }
    selectedLiuNian = Math.min(selectedLiuNian, cycle.liuNian.length - 1);
    $('bazi-liunian-timeline').innerHTML = cycle.liuNian
      .map(
        (year, i) =>
          `<button type="button" data-liunian="${i}" aria-pressed="${i === selectedLiuNian}" class="${i === selectedLiuNian ? 'is-selected' : ''}${year.year === new Date().getFullYear() ? ' is-current' : ''}"><b>${year.ganZhi}</b><span>${year.year}</span><small>${year.age}岁</small></button>`,
      )
      .join('');
    const year = cycle.liuNian[selectedLiuNian];
    $('bazi-liuyue-timeline').innerHTML =
      `<button type="button" data-liuyue="-1" aria-pressed="${selectedLiuYue === -1}" class="${selectedLiuYue === -1 ? 'is-selected' : ''}">全年结构</button>` +
      year.liuYue
        .map(
          (month, index) =>
            `<button type="button" data-liuyue="${index}" aria-pressed="${selectedLiuYue === index}" class="${selectedLiuYue === index ? 'is-selected' : ''}"><b>${month.ganZhi}</b><span>${month.name}月</span></button>`,
        )
        .join('');
    renderRelations();
  };
  const renderLuck = () => {
    const wrap = $('bazi-luck-wrap'),
      empty = $('bazi-luck-empty');
    if (!lastLuck) {
      wrap.hidden = true;
      empty.hidden = false;
      renderRelations();
      return;
    }
    wrap.hidden = false;
    empty.hidden = true;
    text(
      'bazi-luck-meta',
      `${lastLuck.direction} · 起运约 ${lastLuck.startOffset}后（${lastLuck.startDate}） · ${lastLuck.sect === 2 ? '分钟折算' : '时辰折算'}`,
    );
    $('bazi-dayun-timeline').innerHTML = lastLuck.cycles
      .map(
        (cycle, i) =>
          `<button type="button" data-dayun="${i}" aria-pressed="${i === selectedDaYun}" class="${i === selectedDaYun ? 'is-selected' : ''}"><b>${cycle.ganZhi}</b><span>${cycle.startYear}—${cycle.endYear}</span><small>${cycle.startAge}—${cycle.endAge}岁</small></button>`,
      )
      .join('');
    renderLiuNian();
  };
  const renderResult = (
    env: CalculationEnvelope<BaziOutput>,
    summary: string,
    extraWarnings: string[],
  ) => {
    const reading = interpretBazi(env),
      names = {
        year: '年柱',
        month: '月柱',
        day: '日柱',
        hour: '时柱',
      } as const;
    text('bazi-summary-text', summary);
    $('bazi-pillars').innerHTML = (['year', 'month', 'day', 'hour'] as const)
      .map((key, i) => {
        const detail = env.output.pillarDetails[key],
          god = key === 'day' ? '日主' : env.output.tenGods[key],
          hidden = detail.hiddenStems
            .map((item) => `<span>${item.stem}<small>${item.tenGod}</small></span>`)
            .join('');
        return `<article class="jing-bazi-pillar" style="animation-delay:${i * 90}ms"><header><span>${names[key]}</span><button type="button" data-pillar-term="${key}">${god}</button></header><div class="jing-bazi-ganzhi"><strong>${detail.stem}</strong><strong>${detail.branch}</strong></div><dl><div><dt>藏干</dt><dd>${hidden}</dd></div><div><dt>纳音</dt><dd>${detail.naYin}</dd></div><div><dt>旬空</dt><dd>${detail.xunKong}</dd></div></dl></article>`;
      })
      .join('');
    text(
      'bazi-elements',
      `五行分布：${Object.entries(env.output.elements)
        .map(([k, v]) => `${k}${v}`)
        .join('　')}`,
    );
    const max = Math.max(...Object.values(env.output.elements), 1);
    $('bazi-element-bars').innerHTML = Object.entries(env.output.elements)
      .map(
        ([name, count], i) =>
          `<div class="jing-bazi-element-bar" style="--bar-delay:${i * 90}ms"><span>${name}</span><i><b style="--bar-size:${(count / max) * 100}%"></b></i><em>${count}</em></div>`,
      )
      .join('');
    $('bazi-interpret').innerHTML = [
      reading.dayMaster,
      ...reading.elementBalance,
      ...reading.tenGods,
    ]
      .map((line) => `<p>${escapeHtml(line)}</p>`)
      .join('');
    $('bazi-derivation').innerHTML = env.derivation
      .map(
        (step) =>
          `<li><strong>${escapeHtml(step.label)}</strong><span>${escapeHtml(step.rule)}</span><em>${escapeHtml(step.value)}</em></li>`,
      )
      .join('');
    $('bazi-reminders').innerHTML = [...extraWarnings, ...reading.reminders]
      .map((line) => `<li>${escapeHtml(line)}</li>`)
      .join('');
    renderLuck();
    result.hidden = false;
    syncView(viewMode);
  };
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    clearError();
    submitBtn.disabled = true;
    submitBtn.textContent = '排盘中…';
    statusEl.textContent = '正在按所选规则推演…';
    try {
      let env: CalculationEnvelope<BaziOutput>,
        summary: string,
        resumeForm: Record<string, string | number | boolean>;
      const extraWarnings =
        unknownMinute.checked && inputMode !== 'pillars'
          ? ['分钟未知：当前以 00 分暂排；若接近时辰或节气边界，结果可能变化。']
          : [];
      lastLuck = null;
      selectedDaYun = 0;
      selectedLiuNian = 0;
      selectedLiuYue = -1;
      if (inputMode === 'pillars') {
        const pillars = validateFourPillars({
          year: value('bazi-year-pillar'),
          month: value('bazi-month-pillar'),
          day: value('bazi-day-pillar'),
          hour: value('bazi-hour-pillar'),
        });
        env = calculateBaziFromPillars(pillars, [
          {
            label: '输入方式',
            rule: '用户提供已知四柱，并校验六十甲子',
            value: Object.values(pillars).join(' '),
          },
        ]);
        summary = `已知四柱 · ${Object.values(pillars).join(' / ')}（不含岁运）`;
        resumeForm = {
          inputMode,
          yearPillar: pillars.year,
          monthPillar: pillars.month,
          dayPillar: pillars.day,
          hourPillar: pillars.hour,
          viewMode,
        };
      } else {
        const resolved = buildCalendarInput();
        env = calculateBazi(resolved.calendar);
        env.derivation.unshift(...resolved.prefixSteps);
        const gender = checkedValue('gender') as BaziGender,
          sect = Number(checkedValue('luckSect')) as 1 | 2;
        lastLuck = calculateLuckTimeline(resolved.calendar, gender, sect);
        const modeLabel =
          resolved.calendar.timeMode === 'legal'
            ? '法定时'
            : `真太阳时（${Number(longitude.value).toFixed(2)}°E）`;
        summary = `${resolved.sourceLabel} ${pad(resolved.calendar.hour)}:${pad(resolved.calendar.minute)} · ${modeLabel} · ${gender === 'male' ? '男' : '女'} · ${checkedValue('lateZi') === 'next-day' ? '23点换日' : '0点换日'} → ${Object.values(env.output.pillars).join(' / ')}`;
        resumeForm = {
          inputMode,
          year: numberValue(activeTimeIds()[0]),
          month: numberValue(activeTimeIds()[1]),
          day: numberValue(activeTimeIds()[2]),
          hour: numberValue(activeTimeIds()[3]),
          minute: unknownMinute.checked ? 0 : numberValue(activeTimeIds()[4]),
          unknownMinute: unknownMinute.checked,
          leapMonth: inputMode === 'lunar' && $<HTMLInputElement>('bazi-leap-month').checked,
          gender,
          timeMode: resolved.calendar.timeMode,
          longitude: Number(longitude.value),
          lateZi: resolved.calendar.lateZi,
          luckSect: sect,
          viewMode,
        };
      }
      lastEnvelope = env;
      renderResult(env, summary, extraWarnings);
      const p = env.output.pillars;
      lastCase = createStudyCase({
        kind: 'bazi',
        title: value('bazi-label') || `八字 · ${p.year} ${p.month} ${p.day} ${p.hour}`,
        ruleVersion: env.version,
        inputSummary: summary,
        resultSummary: safeSummary(env),
        derivation: env.derivation.map((step) => `${step.label}：${step.rule} → ${step.value}`),
        sourceRefs: ['《渊海子平》干支与十神名相', '《三命通会》四柱与岁运基础'],
        resume: {
          route: '/jing/bazi/',
          form: { ...resumeForm, label: value('bazi-label') },
        },
      });
      text('bazi-copy-state', '');
      statusEl.textContent = `排盘完成 · ${Object.values(p).join('、')}`;
      result.focus({ preventScroll: true });
      result.scrollIntoView({
        block: 'start',
        behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      });
    } catch (error) {
      showError(error instanceof Error ? error.message : '输入无法解析，请检查后重试。');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = '重新排盘';
    }
  });
  document
    .querySelectorAll<HTMLButtonElement>('[data-bazi-view]')
    .forEach((button) =>
      button.addEventListener('click', () => syncView(button.dataset.baziView as 'basic' | 'pro')),
    );
  $('bazi-dayun-timeline').addEventListener('click', (event) => {
    const button = (event.target as HTMLElement).closest<HTMLButtonElement>('[data-dayun]');
    if (!button) return;
    selectedDaYun = Number(button.dataset.dayun);
    selectedLiuNian = 0;
    selectedLiuYue = -1;
    renderLuck();
  });
  $('bazi-liunian-timeline').addEventListener('click', (event) => {
    const button = (event.target as HTMLElement).closest<HTMLButtonElement>('[data-liunian]');
    if (!button) return;
    selectedLiuNian = Number(button.dataset.liunian);
    selectedLiuYue = -1;
    renderLiuNian();
  });
  $('bazi-liuyue-timeline').addEventListener('click', (event) => {
    const button = (event.target as HTMLElement).closest<HTMLButtonElement>('[data-liuyue]');
    if (!button) return;
    selectedLiuYue = Number(button.dataset.liuyue);
    renderLiuNian();
  });
  $('bazi-relations').addEventListener('click', (event) => {
    const button = (event.target as HTMLElement).closest<HTMLButtonElement>(
      '[data-relation-index]',
    );
    if (!button) return;
    const members = button.parentElement?.dataset.relationMembers?.split(' ') ?? [];
    document
      .querySelectorAll<HTMLElement>('[data-relation-node]')
      .forEach((node) =>
        node.classList.toggle('is-highlighted', members.includes(node.dataset.relationNode ?? '')),
      );
    $('bazi-relation-svg')
      .querySelectorAll<SVGPathElement>('path')
      .forEach((edge) => {
        edge.style.opacity =
          edge.dataset.relationEdge === button.dataset.relationIndex ? '1' : '.12';
        edge.style.strokeWidth =
          edge.dataset.relationEdge === button.dataset.relationIndex ? '3' : '1';
      });
  });
  $('bazi-relation-nodes').addEventListener('click', (event) => {
    const button = (event.target as HTMLElement).closest<HTMLButtonElement>('[data-relation-node]');
    if (!button) return;
    const matching = Array.from(
      $('bazi-relations').querySelectorAll<HTMLElement>('[data-relation-members]'),
    );
    matching.forEach((row) =>
      row.classList.toggle(
        'is-highlighted',
        row.dataset.relationMembers?.split(' ').includes(button.dataset.relationNode ?? '') ??
          false,
      ),
    );
    const activeEdges = matching
      .filter((row) => row.classList.contains('is-highlighted'))
      .map((row) => row.querySelector<HTMLElement>('[data-relation-index]')?.dataset.relationIndex);
    $('bazi-relation-svg')
      .querySelectorAll<SVGPathElement>('path')
      .forEach((edge) => {
        edge.style.opacity = activeEdges.includes(edge.dataset.relationEdge) ? '1' : '.12';
        edge.style.strokeWidth = activeEdges.includes(edge.dataset.relationEdge) ? '3' : '1';
      });
  });
  $('bazi-luck-current').addEventListener('click', () => {
    const current = new Date().getFullYear();
    if (!lastLuck) return;
    const cycleIndex = lastLuck.cycles.findIndex(
      (cycle) => current >= cycle.startYear && current <= cycle.endYear,
    );
    if (cycleIndex >= 0) {
      selectedDaYun = cycleIndex;
      selectedLiuYue = -1;
      selectedLiuNian = Math.max(
        0,
        lastLuck.cycles[cycleIndex].liuNian.findIndex((year) => year.year === current),
      );
      renderLuck();
    } else {
      text('bazi-luck-meta', '当下尚未起运，或已超出当前展示的八步大运；可手动选择阶段。');
    }
  });
  $('bazi-ask-current').addEventListener('click', () =>
    window.dispatchEvent(
      new CustomEvent('jing:study-context', {
        detail: { terms: ['dayun', 'liunian', 'ganzhi-relations'], open: true },
      }),
    ),
  );
  $('bazi-pillars').addEventListener('click', (event) => {
    const button = (event.target as HTMLElement).closest<HTMLButtonElement>('[data-pillar-term]');
    if (!button || !lastEnvelope) return;
    const key = button.dataset.pillarTerm as keyof typeof lastEnvelope.output.pillars;
    window.dispatchEvent(
      new CustomEvent('jing:study-context', {
        detail: {
          terms: ['four-pillars', 'ten-gods', 'hidden-stems', 'nayin', 'xun-kong'],
          facts: [
            `${button.parentElement?.querySelector('span')?.textContent} ${lastEnvelope.output.pillars[key]} · ${button.textContent}`,
          ],
          open: true,
        },
      }),
    );
  });
  $('bazi-copy').addEventListener('click', async () => {
    if (!lastEnvelope) return;
    try {
      await navigator.clipboard.writeText(safeSummary(lastEnvelope));
      text('bazi-copy-state', '已复制不含出生时刻、地点与案卷名的摘要。');
    } catch {
      text('bazi-copy-state', '复制失败，请手动选择盘面信息。');
    }
  });
  $('bazi-share-image').addEventListener('click', () => {
    if (!lastEnvelope) return;
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 720;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const gradient = ctx.createLinearGradient(0, 0, 1200, 720);
    gradient.addColorStop(0, '#17110c');
    gradient.addColorStop(1, '#2d1c10');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1200, 720);
    ctx.strokeStyle = '#aa7a35';
    ctx.lineWidth = 2;
    ctx.strokeRect(44, 44, 1112, 632);
    ctx.fillStyle = '#d7ad63';
    ctx.font = '48px serif';
    ctx.fillText('静心堂 · 八字研习', 82, 120);
    ctx.fillStyle = '#ead9b7';
    ctx.font = '76px serif';
    ctx.fillText(Object.values(lastEnvelope.output.pillars).join('   '), 82, 270);
    ctx.font = '34px serif';
    ctx.fillText(
      `日主  ${lastEnvelope.output.dayMaster.stem} · ${lastEnvelope.output.dayMaster.yinYang}${lastEnvelope.output.dayMaster.element}`,
      82,
      370,
    );
    ctx.fillText(
      `五行  ${Object.entries(lastEnvelope.output.elements)
        .map(([k, v]) => `${k}${v}`)
        .join('   ')}`,
      82,
      440,
    );
    ctx.fillStyle = '#a99574';
    ctx.font = '24px sans-serif';
    ctx.fillText('不含出生信息 · 仅供传统文化研习', 82, 610);
    const a = document.createElement('a');
    a.download = `jing-bazi-${Date.now()}.png`;
    a.href = canvas.toDataURL('image/png');
    a.click();
    text('bazi-copy-state', '已生成隐私分享图。');
  });
  $('bazi-save-case').addEventListener('click', () => {
    if (lastCase) window.dispatchEvent(new CustomEvent('jing:save-case', { detail: lastCase }));
  });
  form.addEventListener('reset', () =>
    window.setTimeout(() => {
      syncMode('solar');
      syncView('basic');
      place.hidden = true;
      result.hidden = true;
      clearError();
      city.selectedIndex = 0;
      longitude.value = city.value;
      lastCase = null;
      lastEnvelope = null;
      lastLuck = null;
      ['bazi-minute', 'bazi-lunar-minute'].forEach((id) => {
        $<HTMLInputElement>(id).disabled = false;
      });
      submitBtn.textContent = '排盘';
      statusEl.textContent = '选择输入方式后排盘';
      updateTimePreview();
    }),
  );
  $('bazi-edit').addEventListener('click', () => {
    form.scrollIntoView({
      block: 'start',
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
    $<HTMLInputElement>(inputMode === 'pillars' ? 'bazi-year-pillar' : activeTimeIds()[0]).focus({
      preventScroll: true,
    });
  });
  const restoreResume = (record: StudyCaseRecord) => {
    try {
      const saved = record.resume?.form;
      if (!saved) return false;
      const mode = ['solar', 'lunar', 'pillars'].includes(String(saved.inputMode))
        ? (String(saved.inputMode) as BaziInputMode)
        : 'solar';
      form.querySelector<HTMLInputElement>(`input[name="inputMode"][value="${mode}"]`)!.checked =
        true;
      syncMode(mode);
      const prefix = mode === 'lunar' ? 'bazi-lunar-' : 'bazi-';
      const mapping: Record<string, string> = {
        year: `${prefix}year`,
        month: `${prefix}month`,
        day: `${prefix}day`,
        hour: `${prefix}hour`,
        minute: `${prefix}minute`,
        yearPillar: 'bazi-year-pillar',
        monthPillar: 'bazi-month-pillar',
        dayPillar: 'bazi-day-pillar',
        hourPillar: 'bazi-hour-pillar',
        label: 'bazi-label',
        longitude: 'bazi-longitude',
      };
      Object.entries(mapping).forEach(([key, id]) => {
        if (saved[key] !== undefined) $<HTMLInputElement>(id).value = String(saved[key]);
      });
      ['gender', 'timeMode', 'lateZi', 'luckSect'].forEach((name) => {
        const item = Array.from(
          form.querySelectorAll<HTMLInputElement>(`input[name="${name}"]`),
        ).find((radio) => radio.value === String(saved[name]));
        if (item) item.checked = true;
      });
      unknownMinute.checked = saved.unknownMinute === true;
      ['bazi-minute', 'bazi-lunar-minute'].forEach((id) => {
        $<HTMLInputElement>(id).disabled = unknownMinute.checked;
      });
      $<HTMLInputElement>('bazi-leap-month').checked = saved.leapMonth === true;
      place.hidden = saved.timeMode !== 'true-solar';
      syncView(saved.viewMode === 'pro' ? 'pro' : 'basic');
      statusEl.textContent = '已从加密案卷恢复输入，请核对后重新排盘';
      updateTimePreview();
      return true;
    } catch {
      return false;
    }
  };
  syncMode('solar');
  syncView('basic');
  receiveStudyCase(restoreResume);
  // A refresh, including restoration from the browser back-forward cache,
  // must not silently restore personal input fields.
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) form.reset();
  });
}
