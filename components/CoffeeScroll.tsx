'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import {
  useScroll,
  useSpring,
  useTransform,
  motion,
  useMotionValueEvent,
  MotionValue,
} from 'framer-motion';

const TOTAL_FRAMES = 40;
const FRAME_W      = 1280;
const FRAME_H      = 720;
const FRAME_ASPECT = FRAME_W / FRAME_H;

function frameSrc(i: number) {
  return `/frames/ezgif-frame-${String(i + 1).padStart(3, '0')}.jpg`;
}

/* ── Text layer wrapper ──────────────────────────────── */
interface TextLayerProps {
  opacity: MotionValue<number>;
  y: MotionValue<number>;
  align?: 'left' | 'right' | 'center';
  children: React.ReactNode;
}
function TextLayer({ opacity, y, align = 'center', children }: TextLayerProps) {
  const pos =
    align === 'left'  ? 'items-start pl-[6vw] sm:pl-[8vw] pr-6 max-w-2xl' :
    align === 'right' ? 'items-end pr-[6vw] sm:pr-[8vw] pl-6 max-w-2xl ml-auto' :
                        'items-center px-6 max-w-3xl mx-auto';
  return (
    <motion.div
      style={{ opacity, y }}
      className={`absolute inset-0 flex flex-col justify-center pointer-events-none select-none ${pos} z-10`}
    >
      {children}
    </motion.div>
  );
}

/* ── Main component ──────────────────────────────────── */
export default function CoffeeScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const framesRef    = useRef<HTMLImageElement[]>([]);
  const currentFrameFloat = useRef(0);
  const rafRef       = useRef<number | null>(null);
  const loadedRef    = useRef(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  /* ── Physics spring: eliminates mousewheel stepping & cushions scroll ── */
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.18,
    restDelta: 0.0001,
  });

  /* ────────────────────────────────────────────────────
     DRAW — Sub-frame cross-fading & COVER mode
     Blends frame N and N+1 seamlessly based on fractional
     progress, turning 40 frames into continuous 60/120fps video.
  ─────────────────────────────────────────────────── */
  const draw = useCallback((frameFloat: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    /* ── Anti-pixelation settings ── */
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    const W = canvas.width;   // physical px
    const H = canvas.height;
    const canvasAspect = W / H;

    /* COVER: fill full canvas, crop edges */
    let dw: number, dh: number, dx: number, dy: number;
    if (FRAME_ASPECT > canvasAspect) {
      dh = H; dw = H * FRAME_ASPECT;
      dx = (W - dw) / 2; dy = 0;
    } else {
      dw = W; dh = W / FRAME_ASPECT;
      dx = 0; dy = (H - dh) / 2;
    }

    const clamped = Math.max(0, Math.min(TOTAL_FRAMES - 1, frameFloat));
    const idxA = Math.floor(clamped);
    const idxB = Math.min(TOTAL_FRAMES - 1, idxA + 1);
    const fraction = clamped - idxA;

    const imgA = framesRef.current[idxA];
    if (!imgA || !imgA.complete || imgA.naturalWidth === 0) return;

    // Draw primary frame A
    ctx.globalAlpha = 1.0;
    ctx.fillStyle = '#080604';
    ctx.fillRect(0, 0, W, H);
    ctx.drawImage(imgA, 0, 0, FRAME_W, FRAME_H, dx, dy, dw, dh);

    // Sub-frame cross-fade: dissolve adjacent frame B smoothly
    if (fraction > 0.003 && idxA !== idxB) {
      const imgB = framesRef.current[idxB];
      if (imgB && imgB.complete && imgB.naturalWidth > 0) {
        ctx.globalAlpha = fraction;
        ctx.drawImage(imgB, 0, 0, FRAME_W, FRAME_H, dx, dy, dw, dh);
        ctx.globalAlpha = 1.0;
      }
    }
  }, []);

  /* ── Resize: set physical px, no ctx.scale accumulation ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const dpr  = Math.min(window.devicePixelRatio || 1, 2);
      const cssW = window.innerWidth;
      const cssH = window.innerHeight;
      canvas.width  = Math.floor(cssW * dpr);
      canvas.height = Math.floor(cssH * dpr);
      if (loadedRef.current) draw(currentFrameFloat.current);
      else {
        const ctx = canvas.getContext('2d');
        if (ctx) { ctx.fillStyle = '#080604'; ctx.fillRect(0, 0, canvas.width, canvas.height); }
      }
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [draw]);

  /* ────────────────────────────────────────────────────
     PRELOAD ALL 40 FRAMES
     Directly ready to display without delay
  ─────────────────────────────────────────────────── */
  useEffect(() => {
    let cancelled = false;
    const loadedImages: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    let loadedCount = 0;

    const onFrameLoad = () => {
      if (cancelled) return;
      loadedCount++;
      if (loadedCount === 1) {
        // First frame ready: paint instantly
        draw(0);
      }
      if (loadedCount >= TOTAL_FRAMES) {
        loadedRef.current = true;
        draw(currentFrameFloat.current);
      }
    };

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = frameSrc(i);
      img.onload = onFrameLoad;
      img.onerror = onFrameLoad;
      loadedImages[i] = img;
    }
    framesRef.current = loadedImages;

    return () => { cancelled = true; };
  }, [draw]);

  /* ────────────────────────────────────────────────────
     SCROLL → CANVAS RENDER
     Maps 0.0–1.0 to frame 0.0–39.0 continuously.
  ─────────────────────────────────────────────────── */
  useMotionValueEvent(smoothProgress, 'change', (latest) => {
    const target = latest * (TOTAL_FRAMES - 1);
    currentFrameFloat.current = target;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => draw(target));
  });

  /* ────────────────────────────────────────────────────
     SECTION TIMINGS
  ─────────────────────────────────────────────────── */
  /* BRAND INTRO — 0 to 24% */
  const brandO = useTransform(smoothProgress, [0, 0.16, 0.24], [1, 1, 0]);
  const brandY = useTransform(smoothProgress, [0, 0.16, 0.24], [0, 0, -28]);

  /* Origin — 24–52% */
  const s1O = useTransform(smoothProgress, [0.24, 0.32, 0.44, 0.52], [0, 1, 1, 0]);
  const s1Y = useTransform(smoothProgress, [0.24, 0.32, 0.44, 0.52], [30, 0, 0, -20]);

  /* Process — 52–80% (kept on LEFT column to never collide with the glass on the right) */
  const s2O = useTransform(smoothProgress, [0.52, 0.60, 0.72, 0.80], [0, 1, 1, 0]);
  const s2Y = useTransform(smoothProgress, [0.52, 0.60, 0.72, 0.80], [30, 0, 0, -20]);

  /* CTA — 80–100% */
  const ctaO = useTransform(smoothProgress, [0.80, 0.88, 1.0], [0, 1, 1]);
  const ctaY = useTransform(smoothProgress, [0.80, 0.88, 1.0], [30, 0, 0]);

  /* Scroll hint */
  const hintO = useTransform(smoothProgress, [0, 0.06], [1, 0]);

  /* CTA center dark backdrop */
  const ctaBgO = useTransform(smoothProgress, [0.78, 0.86], [0, 0.85]);

  /* Deep text shadow for razor-sharp legibility */
  const HS = '0 2px 10px rgba(0,0,0,0.95), 0 6px 32px rgba(0,0,0,0.85), 0 16px 60px rgba(0,0,0,0.7)';
  const SS = '0 1px 6px rgba(0,0,0,0.95), 0 3px 14px rgba(0,0,0,0.85)';

  return (
    <div ref={containerRef} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#080604]">

        {/* Video Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden />

        {/* ── Left-side dark scrim: Guarantees 100% crisp typography over light frames ── */}
        <div
          className="absolute inset-y-0 left-0 w-full sm:w-[68%] lg:w-[58%] pointer-events-none z-[4]"
          aria-hidden
          style={{
            background:
              'linear-gradient(to right, rgba(8,6,4,0.92) 0%, rgba(8,6,4,0.82) 40%, rgba(8,6,4,0.35) 75%, transparent 100%)',
          }}
        />

        {/* ── General ambient vignette & frame borders ── */}
        <div
          className="absolute inset-0 pointer-events-none z-[4]"
          aria-hidden
          style={{
            background:
              'radial-gradient(ellipse 135% 120% at 50% 50%, transparent 25%, rgba(8,6,4,0.55) 100%)',
          }}
        />
        {/* Top curtain below navbar */}
        <div
          className="absolute top-0 inset-x-0 h-32 pointer-events-none z-[4]"
          aria-hidden
          style={{
            background: 'linear-gradient(to bottom, rgba(8,6,4,0.85) 0%, transparent 100%)',
          }}
        />
        {/* Bottom curtain */}
        <div
          className="absolute bottom-0 inset-x-0 h-24 pointer-events-none z-[4]"
          aria-hidden
          style={{
            background: 'linear-gradient(to top, rgba(8,6,4,0.8) 0%, transparent 100%)',
          }}
        />

        {/* Full-screen CTA overlay at scroll end */}
        <motion.div
          style={{ opacity: ctaBgO }}
          className="absolute inset-0 bg-[#080604]/80 backdrop-blur-sm pointer-events-none z-[8]"
        />

        {/* ══════════════════════════════════════════════
            BRAND INTRO  —  left side, visible on load
            Padded 80px top so it never collides with 68px navbar
        ════════════════════════════════════════════ */}
        <TextLayer opacity={brandO} y={brandY} align="left">
          {/* Brand logo & name */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px', marginBottom: '4px' }}>
            <img
              src="/logo.png"
              alt="Brew&Bloom Coffee Shop"
              style={{
                width: 'clamp(52px, 8vw, 76px)',
                height: 'clamp(52px, 8vw, 76px)',
                borderRadius: '16px',
                objectFit: 'cover',
                border: '1.5px solid rgba(245,216,168,0.35)',
                boxShadow: '0 12px 32px rgba(0,0,0,0.7)',
              }}
            />
            <div>
              <h1
                style={{
                  fontFamily: '"Unbounded", sans-serif',
                  fontWeight: 700,
                  fontSize: 'clamp(2rem, 4.4vw, 3.8rem)',
                  color: '#FFFFFF',
                  letterSpacing: '0.06em',
                  textShadow: HS,
                  lineHeight: 1.05,
                }}
              >
                Brew&amp;Bloom
              </h1>
              <p
                style={{
                  fontFamily: 'DM Mono, monospace',
                  fontSize: 'clamp(9px, 1.2vw, 12px)',
                  letterSpacing: '0.36em',
                  color: '#F5C878',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  marginTop: '4px',
                  textShadow: SS,
                }}
              >
                Coffee Shop
              </p>
            </div>
          </div>

          {/* Divider */}
          <div
            style={{
              width: '60px',
              height: '2px',
              background: 'linear-gradient(to right, #C8945A, transparent)',
              margin: '20px 0',
            }}
          />

          {/* Quote using Lora */}
          <p
            style={{
              fontFamily: '"Lora", serif',
              fontWeight: 500,
              fontStyle: 'italic',
              fontSize: 'clamp(1.5rem, 3.2vw, 2.3rem)',
              color: '#F5C878',
              lineHeight: 1.28,
              textShadow: HS,
              maxWidth: '24ch',
            }}
          >
            "The art of a perfect<br />cup, redefined."
          </p>

          {/* Eyebrow tag */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '22px' }}>
            <div style={{ width: '22px', height: '1.5px', background: '#C8945A' }} />
            <p
              style={{
                fontFamily: '"Autour One", system-ui',
                fontSize: '11px',
                color: '#EDE0C8',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                textShadow: SS,
              }}
            >
              single origin · cold brew
            </p>
          </div>
        </TextLayer>

        {/* ══════════════════════════════════════════════
            ORIGIN  —  left column, 24–52%
        ════════════════════════════════════════════ */}
        <TextLayer opacity={s1O} y={s1Y} align="left">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ width: '22px', height: '1.5px', background: '#C8945A' }} />
            <p
              style={{
                fontFamily: '"Autour One", system-ui',
                fontSize: '11px',
                color: '#C8945A',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                textShadow: SS,
              }}
            >
              01 · origin
            </p>
          </div>
          <h2
            style={{
              fontFamily: '"Lora", serif',
              fontWeight: 600,
              fontSize: 'clamp(2.2rem, 4.6vw, 3.8rem)',
              lineHeight: 1.08,
              color: '#FFFFFF',
              textShadow: HS,
            }}
          >
            Every origin<br />
            <em style={{ color: '#F5C878', fontStyle: 'italic' }}>tells a story.</em>
          </h2>
          <p
            style={{
              marginTop: '20px',
              fontFamily: '"Lora", serif',
              fontWeight: 400,
              fontSize: '15px',
              lineHeight: 1.85,
              maxWidth: '36ch',
              color: '#EDE0C8',
              textShadow: SS,
            }}
          >
            High-altitude farms. Volcanic soil.<br />
            Morning mist that shapes each bean<br />
            before it ever meets water.
          </p>
        </TextLayer>

        {/* ══════════════════════════════════════════════
            PROCESS  —  left column, 52–80%
            (Placed on LEFT so it never overlaps the glass on the right)
        ════════════════════════════════════════════ */}
        <TextLayer opacity={s2O} y={s2Y} align="left">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ width: '22px', height: '1.5px', background: '#C8945A' }} />
            <p
              style={{
                fontFamily: '"Autour One", system-ui',
                fontSize: '11px',
                color: '#C8945A',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                textShadow: SS,
              }}
            >
              02 · process
            </p>
          </div>
          <h2
            style={{
              fontFamily: '"Lora", serif',
              fontWeight: 600,
              fontSize: 'clamp(2.2rem, 4.6vw, 3.8rem)',
              lineHeight: 1.08,
              color: '#FFFFFF',
              textShadow: HS,
            }}
          >
            Engineered<br />
            <em style={{ color: '#F5C878', fontStyle: 'italic' }}>for precision.</em>
          </h2>
          <p
            style={{
              marginTop: '20px',
              fontFamily: '"Lora", serif',
              fontWeight: 400,
              fontSize: '15px',
              lineHeight: 1.85,
              maxWidth: '36ch',
              color: '#EDE0C8',
              textShadow: SS,
            }}
          >
            72-hour cold immersion. Zero heat.<br />
            Every compound extracted at its<br />
            ideal temperature — nothing more.
          </p>
        </TextLayer>

        {/* ══════════════════════════════════════════════
            CTA  —  center, 80–100%
        ════════════════════════════════════════════ */}
        <TextLayer opacity={ctaO} y={ctaY} align="center">
          <p
            style={{
              fontFamily: '"Autour One", system-ui',
              fontSize: '12px',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: '#E8A84A',
              marginBottom: '18px',
              textShadow: SS,
            }}
          >
            Brew&amp;Bloom — est. 2024
          </p>
          <h2
            style={{
              fontFamily: '"Lora", serif',
              fontWeight: 600,
              fontSize: 'clamp(2.6rem, 6.5vw, 5.2rem)',
              lineHeight: 0.95,
              letterSpacing: '-0.01em',
              color: '#FFFFFF',
              textAlign: 'center',
              textShadow: HS,
            }}
          >
            Taste the<br />
            <em style={{ color: '#F5C878', fontStyle: 'italic' }}>difference.</em>
          </h2>
          <div
            style={{
              marginTop: '36px',
              pointerEvents: 'auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '14px',
            }}
          >
            <button
              style={{
                fontFamily: '"Autour One", system-ui',
                fontSize: '12px',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#080604',
                background: '#C8945A',
                border: '1px solid #C8945A',
                padding: '14px 50px',
                borderRadius: '3px',
                cursor: 'pointer',
                transition: 'all 0.35s ease',
                boxShadow: '0 8px 24px rgba(200, 148, 90, 0.25)',
              }}
              onMouseEnter={(e) => {
                const b = e.currentTarget;
                b.style.background = '#EDE0C8';
                b.style.borderColor = '#EDE0C8';
              }}
              onMouseLeave={(e) => {
                const b = e.currentTarget;
                b.style.background = '#C8945A';
                b.style.borderColor = '#C8945A';
              }}
            >
              shop the collection
            </button>
            <p
              style={{
                fontFamily: '"Autour One", system-ui',
                fontSize: '10px',
                color: 'rgba(237,224,200,0.6)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}
            >
              free shipping · 30-day returns
            </p>
          </div>
        </TextLayer>

        {/* ── Scroll hint pill ── */}
        <motion.div
          style={{ opacity: hintO }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-20"
        >
          <div className="px-3.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#C8945A]/35 shadow-lg">
            <p
              style={{
                fontFamily: '"Autour One", system-ui',
                fontSize: '10px',
                color: '#EDE0C8',
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
              }}
            >
              scroll
            </p>
          </div>
          <div
            style={{
              width: '1px',
              height: '24px',
              background: 'linear-gradient(to bottom, #C8945A, transparent)',
            }}
          />
        </motion.div>

      </div>
    </div>
  );
}
