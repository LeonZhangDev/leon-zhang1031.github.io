import { normalizeStudyCase, type StudyCaseRecord } from './study-case';

/** Cross-page resume stays in memory: only a random token appears in the URL. */
export function openStudyCase(
  record: StudyCaseRecord,
  onComplete: () => void,
  onError: (message: string) => void,
): () => void {
  const item = normalizeStudyCase(record);
  if (!item.resume) return () => {};
  const token = crypto.randomUUID();
  const child = window.open(`${item.resume.route}#resume-${token}`, '_blank');
  if (!child) {
    onError('浏览器阻止了新页，请允许本站打开新页后重试。');
    return () => {};
  }
  let timeout: ReturnType<typeof setTimeout>;
  const cleanup = () => {
    clearTimeout(timeout);
    window.removeEventListener('message', receive);
  };
  const receive = (event: MessageEvent) => {
    if (event.origin !== location.origin || event.source !== child || event.data?.token !== token)
      return;
    if (event.data.type === 'jing:resume-ready') {
      child.postMessage({ type: 'jing:resume-data', token, record: item }, location.origin);
    } else if (event.data.type === 'jing:resume-received') {
      cleanup();
      onComplete();
    }
  };
  window.addEventListener('message', receive);
  timeout = setTimeout(() => {
    cleanup();
    onError('案卷续研连接已过期，请从手札重新打开。');
  }, 20_000);
  return cleanup;
}

export function receiveStudyCase(onRecord: (record: StudyCaseRecord) => void): boolean {
  const token = location.hash.match(/^#resume-([a-f\d-]{36})$/)?.[1];
  const source = window.opener as Window | null;
  if (!token || !source) return false;
  history.replaceState(null, '', location.pathname + location.search);
  const cleanup = () => {
    clearTimeout(timeout);
    window.removeEventListener('message', receive);
  };
  const receive = (event: MessageEvent) => {
    if (
      event.origin !== location.origin ||
      event.source !== source ||
      event.data?.token !== token ||
      event.data.type !== 'jing:resume-data'
    )
      return;
    try {
      const record = normalizeStudyCase(event.data.record as StudyCaseRecord);
      if (record.resume?.route !== '/jing/bazi/') return;
      onRecord(record);
      source.postMessage({ type: 'jing:resume-received', token }, location.origin);
    } catch {
      // Ignore malformed handoffs without changing the empty form.
    } finally {
      cleanup();
      window.opener = null;
    }
  };
  window.addEventListener('message', receive);
  const timeout = setTimeout(() => {
    cleanup();
    window.opener = null;
  }, 20_000);
  source.postMessage({ type: 'jing:resume-ready', token }, location.origin);
  return true;
}
