import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { Volume2, VolumeX } from "lucide-react";

export type HeroVisualizerVariant = "home" | "news" | "gallery" | "club" | "contact" | "portal";

type Props = {
  variant: HeroVisualizerVariant;
  title?: string;
  subtitle?: string;
  className?: string;
};

type Point = { x: number; y: number };
type Rect = { x: number; y: number; w: number; h: number };

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
};

type Sim = {
  ctx: CanvasRenderingContext2D | null;
  w: number;
  h: number;
  dpr: number;
  cell: number;
  cols: number;
  rows: number;
  cells: Float32Array;
  mouse: { x: number; y: number; active: boolean };
  prevCol: number;
  prevRow: number;
  particles: Particle[];
  target: Point;
  sinkPulse: number;
  time: number;
  audio: AudioContext | null;
  muted: boolean;
  reduced: boolean;
};

const CYAN = "0, 240, 255";
const BLUE = "0, 102, 255";
const TAU = Math.PI * 2;

function rgba(rgb: string, a: number) {
  if (a <= 0) return "rgba(0, 0, 0, 0)";
  return `rgba(${rgb}, ${a.toFixed(3)})`;
}

function mono(ctx: CanvasRenderingContext2D, size = 10) {
  ctx.font = `600 ${size}px "JetBrains Mono", monospace`;
}

function rrect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  if (typeof ctx.roundRect === "function") {
    ctx.roundRect(x, y, w, h, r);
  } else {
    ctx.rect(x, y, w, h);
  }
}

function text(
  ctx: CanvasRenderingContext2D,
  s: string,
  x: number,
  y: number,
  a: number,
  align: CanvasTextAlign = "left",
) {
  mono(ctx);
  ctx.fillStyle = rgba(CYAN, a);
  ctx.textAlign = align;
  ctx.textBaseline = "alphabetic";
  ctx.fillText(s, x, y);
}

function arrow(ctx: CanvasRenderingContext2D, a: Point, b: Point, alpha: number) {
  const L = 8;
  const ang = Math.atan2(b.y - a.y, b.x - a.x);
  ctx.strokeStyle = rgba(CYAN, alpha);
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y);
  ctx.stroke();
  ctx.fillStyle = rgba(CYAN, alpha);
  ctx.beginPath();
  ctx.moveTo(b.x, b.y);
  ctx.lineTo(b.x - L * Math.cos(ang - 0.42), b.y - L * Math.sin(ang - 0.42));
  ctx.lineTo(b.x - L * Math.cos(ang + 0.42), b.y - L * Math.sin(ang + 0.42));
  ctx.closePath();
  ctx.fill();
}

function chip(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  labelTxt: string,
  alpha: number,
) {
  ctx.save();
  ctx.globalAlpha = alpha;
  rrect(ctx, x, y, w, h, 6);
  ctx.strokeStyle = rgba(CYAN, 0.8);
  ctx.lineWidth = 1.2;
  ctx.stroke();
  ctx.fillStyle = rgba(BLUE, 0.1);
  ctx.fill();
  ctx.restore();
  ctx.save();
  text(ctx, labelTxt, x + w / 2, y + h / 2 + 3, alpha, "center");
  ctx.restore();
}

function drawHome(ctx: CanvasRenderingContext2D, rect: Rect, t: number): Point {
  const cy = rect.y + rect.h / 2;
  const bw = Math.min(rect.w * 0.27, 104);
  const bh = Math.max(rect.h * 0.22, 40);
  const gx = rect.x + rect.w - bw - 14;
  const px = rect.x + 14;
  const pulse = 0.5 + 0.5 * Math.sin(t * 2.2);

  chip(ctx, px, cy - bh / 2, bw, bh, "PROMPT", 0.55);
  ctx.save();
  ctx.strokeStyle = rgba(CYAN, 0.45 + 0.3 * pulse);
  ctx.lineWidth = 1;
  const lx1 = px + bw * 0.28;
  const ly1 = cy - bh * 0.28;
  const lx2 = px + bw * 0.44;
  cts_chain(ctx, lx1, ly1, 7);
  ctx.restore();

  chip(ctx, gx, cy - bh / 2, bw, bh, "GPU NODE", 0.9);

  ctx.save();
  ctx.strokeStyle = rgba(BLUE, 0.9);
  ctx.lineWidth = 1.4;
  const pinGap = 6;
  for (let i = 0; i < 3; i++) {
    const py = cy - bh / 2 + 12 + i * pinGap;
    ctx.beginPath();
    ctx.moveTo(gx + bw / 2, py);
    ctx.lineTo(gx + bw / 2 + 6, py);
    ctx.stroke();
  }
  ctx.restore();

  const sink = { x: gx + bw / 2, y: cy };
  arrow(ctx, { x: px + bw, y: cy }, { x: sink.x - bw / 2, y: cy }, 0.65);
  ctx.save();
  text(ctx, "ENCRYPTED FLOW", px + bw / 2, rect.y + rect.h - 14, 0.5, "center");
  text(ctx, "ISOLATED NODE", gx + bw / 2, rect.y + rect.h - 14, 0.5, "center");
  ctx.restore();
  return sink;
}

function cts_chain(ctx: CanvasRenderingContext2D, x: number, y: number, s: number) {
  ctx.beginPath();
  ctx.rect(x, y, s, s * 0.62);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(x + s / 2, y + s * 0.62, s * 0.18, 0, TAU);
  ctx.stroke();
}

function drawNews(ctx: CanvasRenderingContext2D, rect: Rect, t: number): Point {
  const y = rect.y + rect.h / 2;
  const x0 = rect.x + 18;
  const x1 = rect.x + rect.w - 18;
  const span = x1 - x0;

  ctx.save();
  ctx.strokeStyle = rgba(BLUE, 0.7);
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(x0, y);
  ctx.lineTo(x1, y);
  ctx.stroke();

  ctx.strokeStyle = rgba(CYAN, 0.35);
  ctx.lineWidth = 1;
  for (let i = 0; i <= 10; i++) {
    const x = x0 + (span * i) / 10;
    ctx.beginPath();
    ctx.moveTo(x, y - 7);
    ctx.lineTo(x, y + 7);
    ctx.stroke();
  }
  ctx.restore();

  const speed = t * 110;
  for (let k = 0; k < 4; k++) {
    const off = (speed + (k * span) / 4) % span;
    const x = x0 + off;
    ctx.save();
    ctx.fillStyle = rgba(CYAN, 0.75);
    ctx.fillRect(x, y - 5, 7, 10);
    ctx.restore();
  }

  const sink = { x: x0 + span / 2, y };
  ctx.save();
  const pulse = 0.6 + 0.4 * Math.sin(t * 3);
  ctx.fillStyle = rgba(CYAN, 0.2 + 0.3 * pulse);
  ctx.beginPath();
  ctx.arc(sink.x, sink.y, 8, 0, TAU);
  ctx.fill();
  ctx.restore();
  text(ctx, "LIVE FEED", x0 + 6, y - 26, 0.55);
  return sink;
}

function drawGallery(ctx: CanvasRenderingContext2D, rect: Rect, t: number): Point {
  const cx = rect.x + rect.w * 0.34;
  const cy = rect.y + rect.h * 0.46;
  const R = Math.min(rect.h * 0.24, 58);
  const focal = { x: cx - R * 0.75, y: cy };

  ctx.save();
  ctx.strokeStyle = rgba(CYAN, 0.6);
  ctx.lineWidth = 1.3;
  for (let i = 0; i < 4; i++) {
    const sy = cy - 34 + i * 24;
    const ex = rect.x + rect.w - 8;
    ctx.beginPath();
    ctx.moveTo(ex, sy);
    ctx.quadraticCurveTo(cx + R * 0.4, cy + (i - 1.5) * 8, focal.x + 2, focal.y + (i - 1.5) * 6);
    ctx.stroke();
  }
  ctx.restore();

  for (let i = 0; i < 4; i++) {
    const ex = rect.x + rect.w - 8;
    const xp = ex - ((t * 150 + i * 90) % (ex - focal.x));
    const k = (xp - focal.x) / (ex - focal.x);
    const yp = cy - 34 + i * 24 + (k - 0.5) * 30;
    ctx.save();
    ctx.fillStyle = rgba(CYAN, 0.8);
    ctx.beginPath();
    ctx.arc(xp, yp, 2.2, 0, TAU);
    ctx.fill();
    ctx.restore();
  }

  ctx.save();
  ctx.strokeStyle = rgba(BLUE, 0.8);
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cx - R, cy);
  ctx.quadraticCurveTo(cx, cy - R * 0.8, cx + R, cy);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx - R, cy);
  ctx.quadraticCurveTo(cx, cy + R * 0.8, cx + R, cy);
  ctx.stroke();
  ctx.restore();

  text(ctx, "OPTIC / FIBER", rect.x + rect.w / 2, rect.y + rect.h - 16, 0.5, "center");
  return focal;
}

const CLUB_NODES: Array<[number, number]> = [
  [0.1, 0.24],
  [0.24, 0.1],
  [0.48, 0.16],
  [0.66, 0.34],
  [0.52, 0.82],
  [0.26, 0.72],
  [0.06, 0.52],
];

function drawClub(ctx: CanvasRenderingContext2D, rect: Rect, t: number): Point {
  const nodes = CLUB_NODES.map(([nx, ny]) => ({
    x: rect.x + rect.w * nx,
    y: rect.y + rect.h * ny,
  }));
  const hub: Point = { x: rect.x + rect.w * 0.38, y: rect.y + rect.h * 0.5 };

  ctx.save();
  ctx.strokeStyle = rgba(BLUE, 0.55);
  ctx.lineWidth = 1;
  for (const n of nodes) {
    ctx.beginPath();
    ctx.moveTo(n.x, n.y);
    ctx.lineTo(hub.x, hub.y);
    ctx.stroke();
  }
  for (let i = 0; i < nodes.length - 1; i++) {
    const a = nodes[i];
    const b = nodes[i + 1];
    if (!a || !b) continue;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  }
  ctx.restore();

  ctx.save();
  ctx.fillStyle = rgba(CYAN, 0.5);
  for (const n of nodes) {
    ctx.beginPath();
    ctx.arc(n.x, n.y, 3, 0, TAU);
    ctx.fill();
  }
  const pulse = 0.5 + 0.5 * Math.sin(t * 1.8);
  ctx.fillStyle = rgba(CYAN, 0.25 + 0.45 * pulse);
  ctx.beginPath();
  ctx.arc(hub.x, hub.y, 9 + 3 * pulse, 0, TAU);
  ctx.fill();
  ctx.restore();

  text(ctx, "MEMBERS NET", rect.x + rect.w / 2, rect.y + rect.h - 16, 0.5, "center");
  return hub;
}

function drawContact(ctx: CanvasRenderingContext2D, rect: Rect, t: number): Point {
  const bx = rect.x + rect.w * 0.56;
  const by = rect.y + rect.h / 2;
  const H = Math.min(rect.h * 0.4, 110);
  const topY = by - H;

  ctx.save();
  ctx.strokeStyle = rgba(CYAN, 0.8);
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(bx, by);
  ctx.lineTo(bx, topY);
  ctx.stroke();
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(bx - 22, by + 4);
  ctx.lineTo(bx + 22, by + 4);
  ctx.stroke();
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(bx - 16, topY + 16);
  ctx.lineTo(bx + 16, topY + 16);
  ctx.stroke();
  ctx.restore();

  const sink = { x: bx, y: topY };
  ctx.save();
  ctx.strokeStyle = rgba(CYAN, 0.5);
  ctx.lineWidth = 1.2;
  for (let i = 0; i < 4; i++) {
    const r = 14 + ((t * 34 + i * 16) % 52);
    ctx.beginPath();
    ctx.arc(sink.x, sink.y, r, -0.55, 0.55);
    ctx.stroke();
  }
  ctx.restore();

  ctx.save();
  text(ctx, "RF ANTENNA", bx, by + 44, 0.55, "center");
  ctx.restore();
  return sink;
}

function drawPortal(ctx: CanvasRenderingContext2D, rect: Rect, t: number): Point {
  const cx = rect.x + rect.w * 0.36;
  const cy = rect.y + rect.h * 0.5;
  const base = Math.min(rect.h * 0.2, 44);

  ctx.save();
  ctx.strokeStyle = rgba(CYAN, 0.55);
  ctx.lineWidth = 1.4;
  for (let i = 0; i < 5; i++) {
    const r = base + i * 8;
    const a0 = 0.15 + i * 0.14;
    const a1 = TAU - 0.5 - i * 0.1;
    ctx.beginPath();
    ctx.arc(cx, cy, r, a0, a1);
    ctx.stroke();
  }
  ctx.restore();

  const sink = { x: cx, y: cy };
  ctx.save();
  const pulse = 0.5 + 0.5 * Math.sin(t * 2.4);
  ctx.fillStyle = rgba(CYAN, 0.2 + 0.25 * pulse);
  ctx.beginPath();
  ctx.arc(sink.x, sink.y, 8, 0, TAU);
  ctx.fill();
  ctx.strokeStyle = rgba(BLUE, 0.9);
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.arc(sink.x, sink.y, 14, 0, TAU);
  ctx.stroke();
  ctx.restore();

  ctx.save();
  ctx.strokeStyle = rgba(BLUE, 0.5);
  ctx.lineWidth = 1;
  for (let i = 0; i < 3; i++) {
    const sx = rect.x + rect.w - 10;
    const sy = cy - 26 + i * 24;
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.quadraticCurveTo(cx + 30, sy, cx, cy - 6);
    ctx.stroke();
  }
  ctx.restore();

  text(ctx, "BIOMETRIC STREAM", rect.x + rect.w / 2, rect.y + rect.h - 16, 0.5, "center");
  return sink;
}

type SchematicFn = (ctx: CanvasRenderingContext2D, rect: Rect, t: number) => Point;

const SCHEMATICS: Record<HeroVisualizerVariant, SchematicFn> = {
  home: drawHome,
  news: drawNews,
  gallery: drawGallery,
  club: drawClub,
  contact: drawContact,
  portal: drawPortal,
};

export function HeroVisualizer({ variant, title, subtitle, className = "" }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const simRef = useRef<Sim | null>(null);
  const reduced = useReducedMotion();
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let last = performance.now();

    const sim: Sim = {
      ctx,
      w: 0,
      h: 0,
      dpr: 1,
      cell: 40,
      cols: 0,
      rows: 0,
      cells: new Float32Array(0),
      mouse: { x: 0, y: 0, active: false },
      prevCol: -1,
      prevRow: -1,
      particles: [],
      target: { x: 0, y: 0 },
      sinkPulse: 0,
      time: 0,
      audio: null,
      muted: false,
      reduced: !!reduced,
    };
    simRef.current = sim;

    const resize = () => {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      if (w <= 0 || h <= 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      sim.dpr = dpr;
      sim.w = w;
      sim.h = h;
      const cell = Math.max(26, Math.min(48, Math.round(w / 22)));
      sim.cell = cell;
      sim.cols = Math.max(1, Math.ceil(w / cell));
      sim.rows = Math.max(1, Math.ceil(h / cell));
      sim.cells = new Float32Array(sim.cols * sim.rows);
    };

    const drawGrid = () => {
      const { w, h, cell, cols, rows } = sim;
      ctx.lineWidth = 1;
      ctx.strokeStyle = rgba(CYAN, 0.05);
      ctx.beginPath();
      for (let c = 0; c <= cols; c++) {
        ctx.moveTo(c * cell, 0);
        ctx.lineTo(c * cell, h);
      }
      for (let r = 0; r <= rows; r++) {
        ctx.moveTo(0, r * cell);
        ctx.lineTo(w, r * cell);
      }
      ctx.stroke();
    };

    const drawGlowCells = () => {
      const { cols, rows, cell, cells } = sim;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const v = cells[r * cols + c];
          if (v === undefined || v <= 0.01) continue;
          const x = c * cell;
          const y = r * cell;
          ctx.fillStyle = rgba(CYAN, v * 0.1);
          ctx.fillRect(x + 1, y + 1, cell - 2, cell - 2);
          ctx.strokeStyle = rgba(BLUE, v * 0.32);
          ctx.lineWidth = 5;
          ctx.strokeRect(x + 1, y + 1, cell - 2, cell - 2);
          ctx.strokeStyle = rgba(CYAN, 0.25 + v * 0.55);
          ctx.lineWidth = 1;
          ctx.strokeRect(x + 0.5, y + 0.5, cell - 1, cell - 1);
        }
      }
    };

    const drawDivider = () => {
      const x = sim.w * 0.42 + 0.5;
      ctx.save();
      ctx.strokeStyle = rgba(CYAN, 0.12);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, sim.h);
      ctx.stroke();
      const g = ctx.createLinearGradient(x - 18, 0, x, 0);
      g.addColorStop(0, rgba(CYAN, 0));
      g.addColorStop(1, rgba(CYAN, 0.18));
      ctx.fillStyle = g;
      ctx.fillRect(x - 18, 0, 18, sim.h);
      ctx.restore();
    };

    const drawSinkGlow = (pulsing: number) => {
      const { target } = sim;
      const r = 18 + pulsing * 32;
      const g = ctx.createRadialGradient(target.x, target.y, 0, target.x, target.y, r);
      g.addColorStop(0, rgba(CYAN, 0.5 * pulsing));
      g.addColorStop(1, rgba(CYAN, 0));
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(target.x, target.y, r, 0, TAU);
      ctx.fill();
    };

    const drawParticles = () => {
      for (const p of sim.particles) {
        const a = Math.max(0, Math.min(1, p.life / p.maxLife));
        ctx.fillStyle = rgba(BLUE, 0.22 * a);
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3.2 * a + 0.8, 0, TAU);
        ctx.fill();
        ctx.fillStyle = rgba(CYAN, 0.6 * a);
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5 * a + 0.4, 0, TAU);
        ctx.fill();
      }
    };

    const updateParticles = (dt: number) => {
      const { particles, target } = sim;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        if (!p) continue;
        const dx = target.x - p.x;
        const dy = target.y - p.y;
        const d = Math.hypot(dx, dy) || 1;
        p.vx += ((dx / d) * 560 - (dy / d) * 80) * dt;
        p.vy += ((dy / d) * 560 + (dx / d) * 80) * dt;
        const sp = Math.hypot(p.vx, p.vy);
        if (sp > 280) {
          p.vx = (p.vx / sp) * 280;
          p.vy = (p.vy / sp) * 280;
        }
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.life -= dt;
        if (p.life <= 0 || d < 14) {
          particles.splice(i, 1);
          sim.sinkPulse = Math.min(1, sim.sinkPulse + 0.22);
        }
      }
    };

    const ensureAudio = () => {
      if (sim.audio) return;
      try {
        const AC: typeof AudioContext | undefined =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (AC) sim.audio = new AC();
      } catch {
        sim.audio = null;
      }
    };

    const chime = () => {
      if (sim.muted || !sim.audio) return;
      const ac = sim.audio;
      if (ac.state === "suspended") void ac.resume();
      const now = ac.currentTime;
      const f = 523.25 + (sim.prevCol % 8) * 60;
      const partials = [
        { freq: f, type: "sine" as OscillatorType, vol: 0.06 },
        { freq: f * 1.5, type: "triangle" as OscillatorType, vol: 0.03 },
      ];
      for (const p of partials) {
        const osc = ac.createOscillator();
        const gain = ac.createGain();
        osc.type = p.type;
        osc.frequency.value = p.freq;
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(p.vol, now + 0.012);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
        osc.connect(gain);
        gain.connect(ac.destination);
        osc.start(now);
        osc.stop(now + 0.55);
      }
    };

    const burst = (x: number, y: number) => {
      for (let i = 0; i < 4; i++) {
        sim.particles.push({
          x: x + (Math.random() - 0.5) * 14,
          y: y + (Math.random() - 0.5) * 14,
          vx: (Math.random() - 0.5) * 30,
          vy: (Math.random() - 0.5) * 30,
          life: 1.2 + Math.random() * 0.6,
          maxLife: 1.8,
        });
      }
    };

    const onMove = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      sim.mouse.x = e.clientX - rect.left;
      sim.mouse.y = e.clientY - rect.top;
      sim.mouse.active = true;
      ensureAudio();
    };

    const onLeave = () => {
      sim.mouse.active = false;
    };

    const onDown = (e: PointerEvent) => {
      ensureAudio();
      onMove(e);
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, sim.w, sim.h);
      drawGrid();
      drawDivider();
      sim.target = SCHEMATICS[variant](ctx, { x: 0, y: 0, w: sim.w * 0.42, h: sim.h }, sim.time);
    };

    resize();

    if (sim.reduced) {
      drawStatic();
      return () => {
        simRef.current = null;
      };
    }

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      sim.time += dt;

      if (
        canvas.width !== Math.round(sim.w * sim.dpr) ||
        canvas.height !== Math.round(sim.h * sim.dpr)
      ) {
        resize();
      }

      const { mouse, cell, cols, rows } = sim;
      let col = -1;
      let row = -1;
      if (mouse.active) {
        col = Math.floor(mouse.x / cell);
        row = Math.floor(mouse.y / cell);
        if (col < 0 || col >= cols || row < 0 || row >= rows) {
          col = -1;
          row = -1;
        }
      }

      if (col >= 0 && (col !== sim.prevCol || row !== sim.prevRow)) {
        sim.prevCol = col;
        sim.prevRow = row;
        sim.cells[row * cols + col] = 1;
        chime();
        burst(col * cell + cell / 2, row * cell + cell / 2);
      } else if (col < 0) {
        sim.prevCol = -1;
        sim.prevRow = -1;
      }

      const decay = Math.exp(-dt * 3.2);
      const cells = sim.cells;
      for (let i = 0; i < cells.length; i++) {
        const v = cells[i] ?? 0;
        if (v > 0.004) cells[i] = v * decay;
        else cells[i] = 0;
      }

      sim.sinkPulse *= Math.exp(-dt * 2.6);

      ctx.clearRect(0, 0, sim.w, sim.h);
      drawGrid();
      drawGlowCells();
      drawDivider();
      sim.target = SCHEMATICS[variant](ctx, { x: 0, y: 0, w: sim.w * 0.42, h: sim.h }, sim.time);
      if (sim.sinkPulse > 0.02) drawSinkGlow(sim.sinkPulse);
      updateParticles(dt);
      drawParticles();

      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);

    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerdown", onDown);
    wrap.addEventListener("pointerleave", onLeave);

    const ro = new ResizeObserver(() => resize());
    ro.observe(wrap);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerdown", onDown);
      wrap.removeEventListener("pointerleave", onLeave);
      if (sim.audio) {
        void sim.audio.close();
        sim.audio = null;
      }
      simRef.current = null;
    };
  }, [variant, reduced]);

  const toggleMute = () => {
    const sim = simRef.current;
    if (!sim) return;
    const next = !sim.muted;
    sim.muted = next;
    setMuted(next);
    if (sim.audio && sim.audio.state === "suspended") void sim.audio.resume();
  };

  return (
    <div
      ref={wrapRef}
      className={`scanlines relative min-h-[20rem] w-full overflow-hidden bg-[#0b0f19] ${className}`}
    >
      <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />

      {(title || subtitle) && (
        <div className="pointer-events-none absolute top-5 left-6 z-3 max-w-[42%]">
          {title && (
            <h2 className="font-display text-3xl font-extrabold leading-[1.05] tracking-tight md:text-4xl">
              {title}
            </h2>
          )}
          {subtitle && <p className="mt-3 max-w-md text-sm text-mist md:text-base">{subtitle}</p>}
        </div>
      )}

      <button
        type="button"
        onClick={toggleMute}
        aria-pressed={!muted}
        aria-label={muted ? "Activer le son" : "Couper le son"}
        className="absolute top-4 right-4 z-3 inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-glow/40 bg-void/60 text-glow backdrop-blur transition-colors duration-300 hover:border-glow/80 hover:bg-void/80"
      >
        {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </button>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-2"
        style={{
          background:
            "linear-gradient(90deg, rgb(0 240 255 / 0.045) 0%, transparent 42%), radial-gradient(120% 90% at 100% 0%, rgb(0 102 255 / 0.08), transparent 60%)",
        }}
      />
    </div>
  );
}
