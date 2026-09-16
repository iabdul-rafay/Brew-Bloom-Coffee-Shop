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
    align === 'left'  ? 'items-start pl-[7vw] pr-[46%]' :
    align === 'right' ? 'items-end   pr-[7vw] pl-[46%]' :
                        'items-center px-6';
  return (
    <motion.div
      style={{ opacity, y }}
      className={`absolute inset-0 flex flex-col justify-center pointer-events-none select-none ${pos}`}
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

  const [isReady, setIsReady] = useState(false);

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

  /* ── Preload all frames ── */
  useEffect(() => {
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    let count = 0;

    // Load first frame immediately for instant hero rendering
    const img0 = new window.Image();
    img0.src = frameSrc(0);
    img0.onload = () => {
      images[0] = img0;
      framesRef.current = images;
      draw(0);
    };

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = i === 0 ? img0 : new window.Image();
      if (i > 0) img.src = frameSrc(i);
      img.onload = img.onerror = () => {
        count++;
        if (count === TOTAL_FRAMES) {
          framesRef.current = images;
          loadedRef.current = true;
          setIsReady(true);
          const initialFloat = smoothProgress.get() * (TOTAL_FRAMES - 1);
          currentFrameFloat.current = initialFloat;
          draw(initialFloat);
        }
      };
      images[i] = img;
    }
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [draw, smoothProgress]);

  /* ── Scroll → Smooth Sub-Frame Scrubbing ── */
  useMotionValueEvent(smoothProgress, 'change', (val) => {
    if (!loadedRef.current) return;
    const targetFloat = Math.max(0, Math.min(TOTAL_FRAMES - 1, val * (TOTAL_FRAMES - 1)));
    if (Math.abs(targetFloat - currentFrameFloat.current) < 0.001) return;
    currentFrameFloat.current = targetFloat;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => draw(targetFloat));
  });

  /* ─────────────────────────────────────────────────────
     MOTION VALUES (driven by smoothProgress for silky sync)
  ──────────────────────────────────────────────────── */

  /*
   * BRAND INTRO — left side, visible at 0% (page load).
   * Starts fully opaque, fades out gently as sections begin.
   *   0%  → fully visible  (opacity 1)
   *   18% → still visible
   *   26% → completely gone
   */
  const brandO = useTransform(smoothProgress, [0, 0.18, 0.26], [1, 1, 0]);
  const brandY = useTransform(smoothProgress, [0, 0.18, 0.26], [0, 0, -24]);

  /* Origin — 26–53% */
  const s1O = useTransform(smoothProgress, [0.26, 0.33, 0.46, 0.53], [0, 1, 1, 0]);
  const s1Y = useTransform(smoothProgress, [0.26, 0.33, 0.46, 0.53], [32, 0, 0, -20]);

  /* Process — 53–82% */
  const s2O = useTransform(smoothProgress, [0.53, 0.60, 0.74, 0.82], [0, 1, 1, 0]);
  const s2Y = useTransform(smoothProgress, [0.53, 0.60, 0.74, 0.82], [32, 0, 0, -20]);

  /* CTA — 82–100% */
  const ctaO = useTransform(smoothProgress, [0.82, 0.90, 1.0], [0, 1, 1]);
  const ctaY = useTransform(smoothProgress, [0.82, 0.90, 1.0], [32, 0, 0]);

  /* Scroll hint */
  const hintO = useTransform(smoothProgress, [0, 0.06], [1, 0]);

  /* Shared text-shadow — readable on any frame colour */
  const HS = '0 2px 6px rgba(0,0,0,0.97), 0 6px 32px rgba(0,0,0,0.88), 0 16px 80px rgba(0,0,0,0.65)';
  const SS = '0 1px 4px rgba(0,0,0,0.97), 0 4px 16px rgba(0,0,0,0.85)';

  return (
    <div ref={containerRef} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#080604]">

        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden />

        {/* Vignette */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden style={{
          background: 'radial-gradient(ellipse 145% 125% at 50% 50%, transparent 18%, rgba(8,6,4,0.5) 100%)',
        }}/>
        {/* Top curtain */}
        <div className="absolute top-0 inset-x-0 h-28 pointer-events-none" aria-hidden style={{
          background: 'linear-gradient(to bottom, rgba(8,6,4,0.7) 0%, transparent 100%)',
        }}/>
        {/* Bottom curtain */}
        <div className="absolute bottom-0 inset-x-0 h-20 pointer-events-none" aria-hidden style={{
          background: 'linear-gradient(to top, rgba(8,6,4,0.65) 0%, transparent 100%)',
        }}/>


        {/* ══════════════════════════════════════════════
            BRAND INTRO  —  left side, visible on load
            No scroll needed to see this.
        ════════════════════════════════════════════ */}
        <TextLayer opacity={brandO} y={brandY} align="left">
          {/* Brand name */}
          <p style={{
            fontFamily: '"Unbounded", sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(2.2rem, 5vw, 4.5rem)',
            color: '#FFFFFF',
            letterSpacing: '0.14em',
            textShadow: HS,
            lineHeight: 1,
          }}>
            [KOHI]
          </p>

          {/* Divider */}
          <div style={{
            width: '52px', height: '1px',
            background: 'linear-gradient(to right, #C8945A, transparent)',
            margin: '22px 0',
          }}/>

          {/* Italic quote */}
          <p style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontWeight: 300,
            fontStyle: 'italic',
            fontSize: 'clamp(1.3rem, 3vw, 2.2rem)',
            color: '#F5C878',
            lineHeight: 1.25,
            textShadow: HS,
            maxWidth: '22ch',
          }}>
            "The art of a perfect<br />cup, redefined."
          </p>

          {/* Eyebrow tag */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '20px' }}>
            <div style={{ width: '20px', height: '1px', background: '#C8945A' }}/>
            <p style={{
              fontFamily: 'DM Mono, monospace',
              fontWeight: 300,
              fontSize: '10px',
              color: '#C8945A',
              letterSpacing: '0.45em',
              textTransform: 'uppercase',
              textShadow: SS,
            }}>single origin · cold brew</p>
          </div>
        </TextLayer>

        {/* ══════════════════════════════════════════════
            ORIGIN  —  left, 26–53%
        ════════════════════════════════════════════ */}
        <TextLayer opacity={s1O} y={s1Y} align="left">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
            <div style={{ width: '22px', height: '1px', background: '#C8945A' }}/>
            <p style={{ fontFamily: 'DM Mono, monospace', fontWeight: 300, fontSize: '10px', color: '#C8945A', letterSpacing: '0.45em', textTransform: 'uppercase', textShadow: SS }}>
              origin
            </p>
          </div>
          <h2 style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontWeight: 300, fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1.05, color: '#FFFFFF', textShadow: HS }}>
            Every origin<br/><em style={{ color: '#F5C878' }}>tells a story.</em>
          </h2>
          <p style={{ marginTop: '22px', fontFamily: 'DM Mono, monospace', fontWeight: 300, fontSize: '11px', lineHeight: 1.85, maxWidth: '32ch', color: 'rgba(255,255,255,0.7)', textShadow: SS }}>
            High-altitude farms. Volcanic soil.<br/>
            Morning mist that shapes each bean<br/>
            before it ever meets water.
          </p>
        </TextLayer>

        {/* ══════════════════════════════════════════════
            PROCESS  —  right, 53–82%
        ════════════════════════════════════════════ */}
        <TextLayer opacity={s2O} y={s2Y} align="right">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px', alignSelf: 'flex-end' }}>
            <p style={{ fontFamily: 'DM Mono, monospace', fontWeight: 300, fontSize: '10px', color: '#C8945A', letterSpacing: '0.45em', textTransform: 'uppercase', textShadow: SS }}>
              process
            </p>
            <div style={{ width: '22px', height: '1px', background: '#C8945A' }}/>
          </div>
          <h2 style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontWeight: 300, fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1.05, color: '#FFFFFF', textShadow: HS, textAlign: 'right' }}>
            Engineered<br/><em style={{ color: '#F5C878' }}>for precision.</em>
          </h2>
          <p style={{ marginTop: '22px', alignSelf: 'flex-end', fontFamily: 'DM Mono, monospace', fontWeight: 300, fontSize: '11px', lineHeight: 1.85, maxWidth: '32ch', color: 'rgba(255,255,255,0.7)', textShadow: SS, textAlign: 'right' }}>
            72-hour cold immersion. Zero heat.<br/>
            Every compound extracted at its<br/>
            ideal temperature — nothing more.
          </p>
        </TextLayer>

        {/* ══════════════════════════════════════════════
            CTA  —  center, 82–100%
        ════════════════════════════════════════════ */}
        <TextLayer opacity={ctaO} y={ctaY} align="center">
          <p style={{ fontFamily: 'DM Mono, monospace', fontWeight: 300, fontSize: '11px', letterSpacing: '0.5em', textTransform: 'uppercase', color: '#E8A84A', marginBottom: '20px', textShadow: SS }}>
            kohi — est. 2024
          </p>
          <h2 style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontWeight: 300, fontSize: 'clamp(2.8rem, 7.5vw, 6.5rem)', lineHeight: 0.92, letterSpacing: '-0.01em', color: '#FFFFFF', textAlign: 'center', textShadow: HS }}>
            Taste the<br/><em style={{ color: '#F5C878' }}>difference.</em>
          </h2>
          <div style={{ marginTop: '40px', pointerEvents: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
            <button
              style={{ fontFamily: 'DM Mono, monospace', fontWeight: 300, fontSize: '11px', letterSpacing: '0.38em', textTransform: 'uppercase', color: '#C8945A', border: '1px solid rgba(200,148,90,0.55)', padding: '13px 52px', background: 'rgba(8,6,4,0.4)', backdropFilter: 'blur(6px)', cursor: 'pointer', transition: 'all 0.45s ease' }}
              onMouseEnter={e => { const b = e.currentTarget; b.style.background='#C8945A'; b.style.color='#080604'; b.style.borderColor='#C8945A'; }}
              onMouseLeave={e => { const b = e.currentTarget; b.style.background='rgba(8,6,4,0.4)'; b.style.color='#C8945A'; b.style.borderColor='rgba(200,148,90,0.55)'; }}
            >
              shop the collection
            </button>
            <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', color: 'rgba(200,148,90,0.35)', letterSpacing: '0.3em' }}>
              free shipping · 30-day returns
            </p>
          </div>
        </TextLayer>

        {/* ── Scroll hint ── */}
        <motion.div style={{ opacity: hintO }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none">
          <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', color: 'rgba(200,148,90,0.4)', letterSpacing: '0.42em', textTransform: 'uppercase' }}>scroll</p>
          <div style={{ width: '1px', height: '30px', background: 'linear-gradient(to bottom, rgba(200,148,90,0.4), transparent)' }}/>
        </motion.div>

      </div>
    </div>
  );
}
