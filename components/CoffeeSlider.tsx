'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface CoffeeProduct {
  id: string;
  name: string;
  displayName: string;
  subtitle: string;
  price: string;
  rating: number;
  aboutText: string;
  theme: {
    bgGradient: string;
    accentColor: string;
    labelColor: string;
    glowColor: string;
  };
  customImage: string;
}

const COFFEES: CoffeeProduct[] = [
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    displayName: 'CAPPUCCINO',
    subtitle: 'Classic Italian Espresso · Velvety Foam',
    price: '2.20',
    rating: 4.8,
    aboutText:
      'Our Cappuccino is a timeless Italian classic — a bold double shot of Arabica espresso crowned with a luxuriously thick layer of silky steamed milk foam. Perfectly balanced, warmly comforting.',
    theme: {
      bgGradient:
        'radial-gradient(ellipse 80% 80% at 25% 50%, #4a2810 0%, #201006 45%, #0c0502 100%)',
      accentColor: '#F5D8A8',
      labelColor: '#C8945A',
      glowColor: 'rgba(245, 216, 168, 0.22)',
    },
    customImage: '/images/slider/cappuccino.png',
  },
  {
    id: 'signature-latte',
    name: 'Signature Latte',
    displayName: 'SIGNATURE LATTE',
    subtitle: 'Brew&Bloom House Blend · Steamed Whole Milk',
    price: '2.50',
    rating: 5.0,
    aboutText:
      "Our pride and joy — Brew&Bloom's Signature Latte. A masterfully pulled triple ristretto topped with sweet steamed whole milk, poured with our signature tulip latte art. One sip and you'll understand.",
    theme: {
      bgGradient:
        'radial-gradient(ellipse 80% 80% at 25% 50%, #2e261f 0%, #15110d 45%, #080605 100%)',
      accentColor: '#E8C99A',
      labelColor: '#A08060',
      glowColor: 'rgba(232, 201, 154, 0.22)',
    },
    customImage: '/images/slider/signature-latte.png',
  },
  {
    id: 'hot-mocha',
    name: 'Hot Mocha',
    displayName: 'HOT MOCHA',
    subtitle: 'Chocolate Coffee — Belgian Cocoa Drizzle',
    price: '2.70',
    rating: 4.7,
    aboutText:
      'Rich espresso meets velvety steamed milk and premium Belgian dark chocolate — finished with an indulgent cocoa drizzle. Our Hot Mocha is a dessert in a cup, warming you from the inside out.',
    theme: {
      bgGradient:
        'radial-gradient(ellipse 80% 80% at 25% 50%, #3d1b0d 0%, #1a0a04 45%, #080301 100%)',
      accentColor: '#D4956A',
      labelColor: '#A06040',
      glowColor: 'rgba(212, 149, 106, 0.22)',
    },
    customImage: '/images/slider/hot-mocha.png',
  },
  {
    id: 'black-americano',
    name: 'Black Americano',
    displayName: 'BLACK AMERICANO',
    subtitle: 'Pure Strength · Single Origin Dark Roast',
    price: '1.80',
    rating: 4.5,
    aboutText:
      'For those who prefer their coffee bold and unapologetic. Two shots of our dark-roast espresso diluted with hot water to a smooth, full-bodied strength with golden crema. Clean, pure, and powerfully satisfying.',
    theme: {
      bgGradient:
        'radial-gradient(ellipse 80% 80% at 25% 50%, #272118 0%, #110e09 45%, #050403 100%)',
      accentColor: '#C8A97A',
      labelColor: '#907050',
      glowColor: 'rgba(200, 169, 122, 0.22)',
    },
    customImage: '/images/slider/black-americano.png',
  },
];

/* ── Floating Roasted Coffee Bean ── */
function FloatingBean({
  x,
  y,
  size = 48,
  rotate = 0,
  delay = 0,
}: {
  x: string;
  y: string;
  size?: number;
  rotate?: number;
  delay?: number;
}) {
  return (
    <motion.div
      animate={{ y: [0, -12, 0], rotate: [rotate, rotate + 10, rotate] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay }}
      style={{ left: x, top: y, width: size, height: size * 0.65 }}
      className="absolute pointer-events-none select-none z-10"
    >
      <div className="w-full h-full rounded-[50%/60%] bg-gradient-to-br from-[#452715] via-[#2A160A] to-[#120803] relative shadow-xl flex items-center justify-center border border-[#5a331c]/20">
        <div className="w-[85%] h-[2px] bg-[#0c0401] rounded-full transform -rotate-6" />
      </div>
    </motion.div>
  );
}

/* ── Star Rating ── */
function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className="text-sm"
          style={{ color: i < Math.floor(rating) ? '#F5C878' : 'rgba(255,255,255,0.2)' }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function CoffeeSlider() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [beverageType, setBeverageType] = useState<'hot' | 'cold'>('hot');

  const current = COFFEES[activeIdx];

  const prevCoffee = () => {
    setActiveIdx((prev) => (prev === 0 ? COFFEES.length - 1 : prev - 1));
  };

  const nextCoffee = () => {
    setActiveIdx((prev) => (prev === COFFEES.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      id="featured-coffee"
      className="relative w-full overflow-hidden select-none"
      style={{ minHeight: '100vh', background: '#080604' }}
    >
      {/* ── Dynamic full-bleed morphing background gradient ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id + '-bg'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.85, ease: 'easeInOut' }}
          className="absolute inset-0 z-0 pointer-events-none"
          style={{ background: current.theme.bgGradient }}
        />
      </AnimatePresence>

      {/* ── Soft vignette & film grain atmosphere ── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(0,0,0,0.55) 100%)',
        }}
      />

      {/* ── Subtle ambient floating coffee beans ── */}
      <FloatingBean x="4%" y="14%" size={46} rotate={-30} delay={0} />
      <FloatingBean x="14%" y="82%" size={36} rotate={20} delay={1.2} />
      <FloatingBean x="88%" y="18%" size={40} rotate={40} delay={0.6} />
      <FloatingBean x="92%" y="76%" size={44} rotate={-55} delay={2.1} />

      {/* ══════════════════════════════════════════════════════════
          MAIN STAGE: Left = Floating Cutout Cup | Right = Details
          Padded top (100px) so it never touches the 68px navbar
      ══════════════════════════════════════════════════════════ */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between w-full min-h-screen px-6 sm:px-14 lg:px-20 pt-24 pb-28 gap-8 lg:gap-12">
        
        {/* LEFT ── Hero Floating Coffee Cup (NO BOX, NO CONTAINER) */}
        <div className="flex-1 w-full flex items-center justify-center relative py-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 0.84, rotate: -15, y: 15 }}
              animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
              exit={{ opacity: 0, scale: 0.84, rotate: 15, y: -15 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex items-center justify-center"
              style={{
                width: 'min(410px, 76vw)',
                height: 'min(410px, 76vw)',
              }}
            >
              {/* Warm atmospheric radial halo */}
              <div
                className="absolute inset-[-10%] rounded-full blur-3xl pointer-events-none"
                style={{
                  background: `radial-gradient(circle, ${current.theme.glowColor} 0%, transparent 68%)`,
                }}
              />

              {/* Realistic soft ground shadow directly below saucer */}
              <div
                className="absolute -bottom-6 w-[85%] h-12 rounded-[50%] blur-2xl pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse at center, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 50%, transparent 75%)',
                }}
              />

              {/* Organic gentle float animation */}
              <motion.div
                animate={{
                  y: [0, -8, 0],
                  rotate: [0, 1.2, 0],
                }}
                transition={{
                  duration: 5.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="w-full h-full relative flex items-center justify-center"
              >
                <img
                  src={current.customImage}
                  alt={current.name}
                  className="w-full h-full object-contain pointer-events-none select-none drop-shadow-[0_28px_38px_rgba(0,0,0,0.85)]"
                  draggable={false}
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT ── Product Information */}
        <div className="flex-1 flex flex-col justify-center max-w-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id + '-details'}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -22 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              {/* Category eyebrow with price pill */}
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.4em] font-semibold"
                  style={{ color: current.theme.labelColor }}
                >
                  Featured Product · Hot Coffee
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                <span className="font-mono text-xs text-white/60 font-medium">
                  ${current.price}
                </span>
              </div>

              {/* Big Display Title */}
              <h3
                className="font-display font-bold leading-[1.02] mb-3 tracking-tight"
                style={{
                  fontSize: 'clamp(2.4rem, 4.4vw, 3.8rem)',
                  color: '#FFFFFF',
                }}
              >
                {current.displayName}
              </h3>

              {/* Subtitle */}
              <p
                className="font-mono text-xs uppercase tracking-[0.25em] mb-6"
                style={{ color: current.theme.accentColor }}
              >
                {current.subtitle}
              </p>

              {/* Rating + About Cards */}
              <div className="flex flex-col sm:flex-row gap-4 max-w-lg mb-7">
                {/* Rating Card */}
                <div className="bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-2xl px-6 py-5 flex flex-col items-center justify-center min-w-[110px] shrink-0 shadow-lg">
                  <span className="font-mono text-3xl font-bold text-white mb-1.5">
                    {current.rating.toFixed(1)}
                  </span>
                  <Stars rating={current.rating} />
                </div>

                {/* About Card */}
                <div className="bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-2xl p-5 flex-1 shadow-lg">
                  <p
                    className="font-mono text-[10px] uppercase tracking-widest font-semibold mb-2"
                    style={{ color: current.theme.accentColor }}
                  >
                    About This Roast
                  </p>
                  <p className="font-mono text-xs text-white/80 leading-relaxed font-light">
                    {current.aboutText}
                  </p>
                </div>
              </div>

              {/* Quick Navigation Arrows */}
              <div className="flex items-center gap-4">
                <button
                  onClick={prevCoffee}
                  className="w-10 h-10 rounded-full border border-white/20 bg-white/[0.05] hover:bg-white/15 text-white flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
                  aria-label="Previous Coffee"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button
                  onClick={nextCoffee}
                  className="w-10 h-10 rounded-full border border-white/20 bg-white/[0.05] hover:bg-white/15 text-white flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
                  aria-label="Next Coffee"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
                <span className="font-mono text-xs text-white/40 tracking-widest ml-1">
                  0{activeIdx + 1} / 0{COFFEES.length}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          BOTTOM BAR: Hot/Cold Toggle + Thumbnails
      ══════════════════════════════════════════════════════════ */}
      <div className="absolute bottom-0 inset-x-0 z-20 px-6 sm:px-14 py-3.5 border-t border-white/10 bg-black/40 backdrop-blur-lg flex flex-wrap items-center justify-between gap-4">
        
        {/* Hot / Cold selector */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setBeverageType('hot')}
            className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
              beverageType === 'hot'
                ? 'bg-white/20 border-white text-[#F5C878] shadow-md'
                : 'bg-transparent border-white/20 text-white/40 hover:text-white/80'
            }`}
            title="Hot Coffee"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
              <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
              <line x1="6" y1="1" x2="6" y2="4" />
              <line x1="10" y1="1" x2="10" y2="4" />
              <line x1="14" y1="1" x2="14" y2="4" />
            </svg>
          </button>
          <button
            onClick={() => setBeverageType('cold')}
            className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
              beverageType === 'cold'
                ? 'bg-white/20 border-white text-[#F5C878] shadow-md'
                : 'bg-transparent border-white/20 text-white/40 hover:text-white/80'
            }`}
            title="Iced / Cold Coffee"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="2" x2="12" y2="22" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="m20 16-4-4 4-4" />
              <path d="m4 8 4 4-4 4" />
              <path d="m16 4-4 4-4-4" />
              <path d="m8 20 4-4 4 4" />
            </svg>
          </button>
        </div>

        {/* Thumbnail Selector Pills */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto py-1 max-w-full">
          {COFFEES.map((item, idx) => {
            const isActive = idx === activeIdx;
            return (
              <button
                key={item.id}
                onClick={() => setActiveIdx(idx)}
                className="relative px-3.5 py-1.5 rounded-2xl flex items-center gap-2.5 transition-all cursor-pointer group"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCoffeePill"
                    className="absolute inset-0 rounded-2xl bg-white/15 border border-white/25 backdrop-blur-md shadow-lg"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}

                {/* Thumbnail: Same exact transparent cup */}
                <div className="relative z-10 w-8 h-8 rounded-full overflow-hidden flex items-center justify-center shrink-0">
                  <img
                    src={item.customImage}
                    alt={item.name}
                    className="w-full h-full object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                    draggable={false}
                  />
                </div>

                {/* Name */}
                <span
                  className={`relative z-10 font-mono text-[11px] sm:text-xs tracking-wider whitespace-nowrap transition-colors ${
                    isActive ? 'text-white font-medium' : 'text-white/45 group-hover:text-white/80'
                  }`}
                >
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}
