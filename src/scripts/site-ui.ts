const navToggle = document.getElementById('nav-toggle');
const primaryNav = document.getElementById('primary-navigation');
function closeNavigation() {
  navToggle?.setAttribute('aria-expanded', 'false');
  navToggle?.setAttribute('aria-label', '打开导航菜单');
  primaryNav?.classList.remove('is-open');
}
navToggle?.addEventListener('click', () => {
  const open = navToggle.getAttribute('aria-expanded') !== 'true';
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.setAttribute('aria-label', open ? '关闭导航菜单' : '打开导航菜单');
  primaryNav?.classList.toggle('is-open', open);
});
primaryNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeNavigation));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeNavigation(); });

const themeButton = document.getElementById('theme-toggle');
function syncIcon() {
  if (themeButton) themeButton.textContent = document.documentElement.classList.contains('light') ? '☀️' : '🌙';
}
syncIcon();
themeButton?.addEventListener('click', () => {
  const light = document.documentElement.classList.toggle('light');
  document.documentElement.classList.toggle('dark', !light);
  localStorage.setItem('theme', light ? 'light' : 'dark');
  syncIcon();
  window.dispatchEvent(new CustomEvent('themechange'));
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));

const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);
const backToTop = document.getElementById('back-to-top');
let scrollPending = false;
function updateScrollUi() {
  const root = document.documentElement;
  const max = root.scrollHeight - root.clientHeight;
  const progress = max > 0 ? Math.max(0, Math.min(1, root.scrollTop / max)) : 0;
  progressBar.style.transform = `scaleX(${progress})`;
  backToTop?.classList.toggle('is-visible', root.scrollTop > 480);
}
window.addEventListener('scroll', () => {
  if (scrollPending) return;
  scrollPending = true;
  requestAnimationFrame(() => {
    updateScrollUi();
    scrollPending = false;
  });
}, { passive: true });
backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
});
updateScrollUi();

const rippleSelector = '.nav-link, .theme-toggle, .hero-link, .hero-link-primary, .btn-play, .filter-chip, .gs-ctrl-btn, .anchor-nav a, .post-nav-link';
document.addEventListener('click', event => {
  const button = event.target instanceof Element ? event.target.closest<HTMLElement>(rippleSelector) : null;
  if (!button) return;
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 1.2;
  const ripple = document.createElement('span');
  ripple.className = 'ripple';
  ripple.style.width = ripple.style.height = `${size}px`;
  ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
  ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
  button.appendChild(ripple);
  window.setTimeout(() => ripple.remove(), 650);
});

// Coalesce pointer events without changing the spotlight's appearance.
if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
  let pendingPointer: { card: HTMLElement; x: number; y: number } | undefined;
  let spotlightPending = false;
  document.addEventListener('pointermove', event => {
    const card = event.target instanceof Element ? event.target.closest<HTMLElement>('.project-card, .post-card, .game-showcase') : null;
    if (!card) return;
    pendingPointer = { card, x: event.clientX, y: event.clientY };
    if (spotlightPending) return;
    spotlightPending = true;
    requestAnimationFrame(() => {
      spotlightPending = false;
      if (!pendingPointer) return;
      const { card, x, y } = pendingPointer;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${x - rect.left}px`);
      card.style.setProperty('--my', `${y - rect.top}px`);
    });
  }, { passive: true });
}

// Keep decorative entrances; article title/body are immediately readable.
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll(
    'main .page-header, main .anchor-nav, main .filter-bar, main .game-showcase, ' +
    'main .project-grid > .project-card, main .post-list > .post-card, ' +
    'main .post-nav, main .comments-section',
  ).forEach((element, index) => {
    const delay = 100 + Math.min(index, 10) * 70;
    element.classList.add('stagger-in');
    window.setTimeout(() => element.classList.add('play'), delay);
    window.setTimeout(() => element.classList.remove('stagger-in', 'play'), delay + 650);
  });
}

const qrOverlay = document.getElementById('wechat-qr-overlay');
qrOverlay?.querySelector('.qr-close')?.addEventListener('click', () => { qrOverlay.style.display = 'none'; });
qrOverlay?.querySelector('.qr-card')?.addEventListener('click', event => event.stopPropagation());
document.querySelectorAll('[data-qr-trigger]').forEach(button => {
  button.addEventListener('click', () => {
    if (qrOverlay) qrOverlay.style.display = qrOverlay.style.display === 'none' ? 'flex' : 'none';
  });
});
qrOverlay?.addEventListener('click', () => { qrOverlay.style.display = 'none'; });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && qrOverlay) qrOverlay.style.display = 'none';
});

// Keep the existing fade while the browser starts navigation immediately.
document.addEventListener('click', event => {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a') : null;
  if (!link || link.target || link.hasAttribute('download')) return;
  let url: URL;
  try { url = new URL(link.href, location.href); } catch { return; }
  if (url.origin !== location.origin || url.href === location.href) return;
  if (url.pathname === location.pathname && url.search === location.search && url.hash) return;
  document.body.classList.add('page-exit');
});
window.addEventListener('pageshow', () => document.body.classList.remove('page-exit'));
