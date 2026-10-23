// Quiet constellation — sparse dots, with links only near a fine pointer.
function initConstellation() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const canvas = document.getElementById('bg-canvas') as HTMLCanvasElement | null;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  drawConstellation(canvas, ctx);
}

function drawConstellation(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  var W = 0, H = 0;
  var particles: ReturnType<typeof spawn>[] = [];
  var MOUSE_DIST = 190;
  var hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  function spawn() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.32,
      vy: (Math.random() - 0.5) * 0.32,
      r: 0.8 + Math.random() * 1.3,
      tw: Math.random() * Math.PI * 2,
      ts: 0.4 + Math.random() * 1.1
    };
  }

  function resize() {
    var DPR = Math.min(window.devicePixelRatio || 1, 1.5);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = Math.round(W * DPR);
    canvas.height = Math.round(H * DPR);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    var target = hasFinePointer
      ? Math.round(Math.min(38, Math.max(18, (W * H) / 50000)))
      : Math.round(Math.min(18, Math.max(10, (W * H) / 80000)));
    while (particles.length < target) particles.push(spawn());
    particles.length = target;
  }
  window.addEventListener('resize', resize);

  var mouse = { x: -9999, y: -9999 };
  document.addEventListener('pointermove', function (e) {
    if (!hasFinePointer) return;
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }, { passive: true });
  document.addEventListener('mouseleave', function () { mouse.x = -9999; mouse.y = -9999; });

  var running = true;
  document.addEventListener('visibilitychange', function () {
    var was = running;
    running = !document.hidden;
    if (running && !was) requestAnimationFrame(frame);
  });

  var last = 0;
  function frame(t: number) {
    if (!running) return;
    requestAnimationFrame(frame);
    var dt = Math.min(50, t - last); last = t;
    var k = dt / 16.7;
    var light = document.documentElement.classList.contains('light');
    var dotColor = light ? '60,66,84' : '185,196,220';
    var mouseColor = light ? '200,64,60' : '232,93,78';
    ctx.clearRect(0, 0, W, H);
    ctx.lineWidth = 1;

    var i: number, p: ReturnType<typeof spawn>;
    for (i = 0; i < particles.length; i++) {
      p = particles[i];

      var dx = mouse.x - p.x, dy = mouse.y - p.y;
      var d2 = dx * dx + dy * dy;
      if (d2 < MOUSE_DIST * MOUSE_DIST && d2 > 1) {
        var d = Math.sqrt(d2);
        var f = (1 - d / MOUSE_DIST) * 0.010;
        p.vx += (dx / d) * f * k;
        p.vy += (dy / d) * f * k;
      }
      p.vx *= 0.996; p.vy *= 0.996;
      var sp = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      if (sp > 0.85) { p.vx = p.vx / sp * 0.85; p.vy = p.vy / sp * 0.85; }
      p.x += p.vx * k;
      p.y += p.vy * k;
      if (p.x < -15) p.x = W + 15; else if (p.x > W + 15) p.x = -15;
      if (p.y < -15) p.y = H + 15; else if (p.y > H + 15) p.y = -15;

      p.tw += 0.018 * p.ts * k;
      var a = 0.32 + 0.28 * Math.sin(p.tw);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + dotColor + ',' + a + ')';
      ctx.fill();
    }

    // Accent links appear only around the pointer.
    for (i = 0; hasFinePointer && i < particles.length; i++) {
      p = particles[i];
      var mx = p.x - mouse.x, my = p.y - mouse.y;
      var md2 = mx * mx + my * my;
      if (md2 < MOUSE_DIST * MOUSE_DIST) {
        var md = Math.sqrt(md2);
        var ma = (1 - md / MOUSE_DIST) * (light ? 0.30 : 0.35);
        ctx.strokeStyle = 'rgba(' + mouseColor + ',' + ma + ')';
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }
    }
  }
  resize();
  requestAnimationFrame(frame);
}

initConstellation();
