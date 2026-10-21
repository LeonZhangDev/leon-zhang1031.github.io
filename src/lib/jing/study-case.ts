export type StudyCaseKind = 'bazi' | 'qimen' | 'yijing' | 'lot';

export interface StudyCaseResume {
  route: '/jing/bazi/';
  form: Record<string, string | number | boolean>;
}

export interface StudyCaseRecord {
  id: string;
  kind: StudyCaseKind;
  title: string;
  createdAt: string;
  ruleVersion: string;
  inputSummary: string;
  resultSummary: string;
  derivation: string[];
  sourceRefs: string[];
  /** Encrypted together with the case marker; never included in privacy-safe copies. */
  resume?: StudyCaseResume;
}

const CASE_MARKER_START = '<!-- jing-study-case:';
const CASE_MARKER_END = ' -->';
const VALID_KINDS = new Set<StudyCaseKind>(['bazi', 'qimen', 'yijing', 'lot']);

const truncate = (value: unknown, max = 4000) => String(value ?? '').trim().slice(0, max);

function encodeUtf8(value: string): string {
  const bytes = new TextEncoder().encode(value);
  let binary = '';
  for (let i = 0; i < bytes.length; i += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  }
  return btoa(binary).replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/g, '');
}

function decodeUtf8(value: string): string {
  const padded = value.replaceAll('-', '+').replaceAll('_', '/') + '='.repeat((4 - value.length % 4) % 4);
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export function normalizeStudyCase(record: StudyCaseRecord): StudyCaseRecord {
  if (!VALID_KINDS.has(record.kind)) throw new Error('不支持的研习案卷类型。');
  const createdAt = Number.isNaN(Date.parse(record.createdAt)) ? new Date().toISOString() : record.createdAt;
  const allowedResumeKeys = new Set([
    'inputMode', 'year', 'month', 'day', 'hour', 'minute', 'unknownMinute', 'leapMonth',
    'gender', 'timeMode', 'longitude', 'lateZi', 'luckSect', 'yearPillar', 'monthPillar',
    'dayPillar', 'hourPillar', 'viewMode', 'label',
  ]);
  const resume = record.kind === 'bazi' && record.resume?.route === '/jing/bazi/'
    ? {
        route: '/jing/bazi/' as const,
        form: Object.fromEntries(Object.entries(record.resume.form ?? {})
          .filter(([key, value]) => allowedResumeKeys.has(key) && ['string', 'number', 'boolean'].includes(typeof value) && (typeof value !== 'number' || Number.isFinite(value)))
          .map(([key, value]) => [key, typeof value === 'string' ? value.slice(0, 120) : value])
          .slice(0, 30)),
      }
    : undefined;
  return {
    id: truncate(record.id, 100) || `${record.kind}-${Date.now()}`,
    kind: record.kind,
    title: truncate(record.title, 120) || '未命名案卷',
    createdAt,
    ruleVersion: truncate(record.ruleVersion, 80),
    inputSummary: truncate(record.inputSummary),
    resultSummary: truncate(record.resultSummary, 8000),
    derivation: Array.isArray(record.derivation) ? record.derivation.slice(0, 40).map((line) => truncate(line, 800)) : [],
    sourceRefs: Array.isArray(record.sourceRefs) ? record.sourceRefs.slice(0, 20).map((line) => truncate(line, 300)) : [],
    ...(resume ? { resume } : {}),
  };
}

export function serializeStudyCase(record: StudyCaseRecord): string {
  return `${CASE_MARKER_START}${encodeUtf8(JSON.stringify(normalizeStudyCase(record)))}${CASE_MARKER_END}`;
}

export function appendStudyCase(notes: string, record: StudyCaseRecord): string {
  const item = normalizeStudyCase(record);
  const readable = [
    `## 研习案卷 · ${item.title}`,
    `- 时间：${new Date(item.createdAt).toLocaleString('zh-CN')}`,
    `- 规则：${item.ruleVersion || '未标注'}`,
    item.inputSummary ? `- 输入摘要：${item.inputSummary}` : '',
    '',
    item.resultSummary,
    item.derivation.length ? `\n推演：\n${item.derivation.map((line, index) => `${index + 1}. ${line}`).join('\n')}` : '',
    item.sourceRefs.length ? `\n参考：${item.sourceRefs.join('；')}` : '',
    serializeStudyCase(item),
  ].filter(Boolean).join('\n');
  return `${notes.trimEnd()}${notes.trim() ? '\n\n' : ''}${readable}\n`;
}

export function parseStudyCases(notes: string): StudyCaseRecord[] {
  const records: StudyCaseRecord[] = [];
  const pattern = /<!-- jing-study-case:([A-Za-z0-9_-]+) -->/g;
  for (const match of notes.matchAll(pattern)) {
    try {
      const parsed = JSON.parse(decodeUtf8(match[1])) as StudyCaseRecord;
      records.push(normalizeStudyCase(parsed));
    } catch {
      // Damaged case markers do not prevent the surrounding encrypted note
      // from opening; they are simply omitted from the case index.
    }
  }
  return records.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
}

export function createStudyCase(input: Omit<StudyCaseRecord, 'id' | 'createdAt'>): StudyCaseRecord {
  const random = globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2);
  return normalizeStudyCase({
    ...input,
    id: `${input.kind}-${random}`,
    createdAt: new Date().toISOString(),
  });
}
