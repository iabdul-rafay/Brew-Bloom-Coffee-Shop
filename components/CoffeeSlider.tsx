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
    accent: string;
    cupShadow: string;
  };
  /*
   * USER PICTURE PLACEHOLDER:
   * Put your image inside public/images/slider/ and set the path below,
   * e.g. customImage: '/images/slider/espresso.png'
   * If left undefined or empty, it automatically renders the built-in SVG coffee art!
   */
  customImage?: string;
  latteArtType: 'heart' | 'rosetta' | 'feather' | 'tulip';
}

const COFFEES: CoffeeProduct[] = [
  {
    id: 'espresso',
    name: 'Espresso',
    displayName: 'EXPRESSO',
    subtitle: 'Single Origin Roast',
    price: '$ 1.90',
    rating: 4.0,
    aboutText:
      'Experience the rich, bold flavor and smooth, velvety crema of our expertly crafted espresso—your perfect pick-me-up in every sip.',
    theme: {
      bgGradient: 'radial-gradient(ellipse at 35% 35%, #3e4248 0%, #202326 60%, #121416 100%)',
      accent: '#E0E0E0',
      cupShadow: 'rgba(0,0,0,0.7)',
    },
    // Place your custom image here if you have one:
    customImage: '',
    latteArtType: 'heart',
  },
  {
    id: 'flat-white',
    name: 'Flat White Coffee',
    displayName: 'FLAT WHITE',
    subtitle: 'Steamed Microfoam & Double Shot',
    price: '$ 1.70',
    rating: 5.0,
    aboutText:
      'A flat white is a coffee beverage consisting of a shot of espresso topped with steamed milk, featuring a velvety microfoam with little to no froth.',
    theme: {
      bgGradient: 'radial-gradient(ellipse at 35% 35%, #b68b4c 0%, #734e20 60%, #301f09 100%)',
      accent: '#FAD896',
      cupShadow: 'rgba(40,24,6,0.75)',
    },
    customImage: '',
    latteArtType: 'rosetta',
  },
  {
    id: 'cinnamon',
    name: 'Cinnamon Coffee',
    displayName: 'CINNAMON COFFEE',
    subtitle: 'Spiced Arabica Infusion',
    price: '$ 1.67',
    rating: 4.5,
    aboutText:
      'A delightful blend of rich coffee and warm cinnamon for a cozy, aromatic experience crafted with Ceylon cinnamon and single-origin dark roast.',
    theme: {
      bgGradient: 'radial-gradient(ellipse at 35% 35%, #6a493a 0%, #3e2418 60%, #1a0c06 100%)',
      accent: '#E8A681',
      cupShadow: 'rgba(30,12,6,0.8)',
    },
    customImage: '',
    latteArtType: 'feather',
  },
  {
    id: 'vanilla-latte',
    name: 'Vanilla Latte',
    displayName: 'VANILLA LATTE',
    subtitle: 'Bourbon Vanilla Bean & Milk',
    price: '$ 1.87',
    rating: 4.3,
    aboutText:
      'Creamy espresso blended with steamed whole milk and a touch of organic Madagascar vanilla sweetness for an indulgent, velvety finish.',
    theme: {
      bgGradient: 'radial-gradient(ellipse at 35% 35%, #a6763e 0%, #68421b 60%, #291807 100%)',
      accent: '#F7CFA0',
      cupShadow: 'rgba(35,18,5,0.75)',
    },
    customImage: '',
    latteArtType: 'tulip',
  },
];

/* ── Latte Art SVG Generator ── */
function LatteArt({ type }: { type: CoffeeProduct['latteArtType'] }) {
  if (type === 'heart') {
    return (
      <svg viewBox="0 0 100 100" className="w-24 h-24 text-[#E6C99F] drop-shadow-md">
        <path
          d="M50 30 C42 16 26 22 28 38 C30 52 50 72 50 72 C50 72 70 52 72 38 C74 22 58 16 50 30 Z"
          fill="currentColor"
          opacity="0.95"
        />
        <circle cx="50" cy="24" r="3" fill="currentColor" opacity="0.6" />
      </svg>
    );
  }
  if (type === 'rosetta') {
    return (
      <svg viewBox="0 0 100 100" className="w-28 h-28 text-[#F4E1C6] drop-shadow-md">
        <path d="M50 18 C44 10 32 16 38 28 C41 34 48 44 50 48 C52 44 59 34 62 28 C68 16 56 10 50 18 Z" fill="currentColor" opacity="0.95"/>
        <path d="M50 32 C45 26 36 30 40 38 C43 43 48 50 50 53 C52 50 57 43 60 38 C64 30 55 26 50 32 Z" fill="currentColor" opacity="0.88"/>
        <path d="M50 46 C46 41 40 44 43 50 C45 54 49 59 50 62 C51 59 55 54 57 50 C60 44 54 41 50 46 Z" fill="currentColor" opacity="0.8"/>
        <line x1="50" y1="16" x2="50" y2="82" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    );
  }
  if (type === 'feather') {
    return (
      <svg viewBox="0 0 100 100" className="w-28 h-28 text-[#E2BA8B] drop-shadow-md">
        <path d="M50 16 C38 24 36 40 46 48 C40 54 36 64 50 78 C64 64 60 54 54 48 C64 40 62 24 50 16 Z" fill="currentColor" opacity="0.85"/>
        <path d="M30 38 Q50 44 70 38" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.9"/>
        <path d="M34 50 Q50 56 66 50" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.9"/>
        <path d="M40 62 Q50 67 60 62" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.9"/>
        <line x1="50" y1="14" x2="50" y2="84" stroke="currentColor" strokeWidth="1.8" opacity="0.95"/>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 100 100" className="w-28 h-28 text-[#F7E7CD] drop-shadow-md">
      <ellipse cx="50" cy="30" rx="16" ry="10" fill="currentColor" opacity="0.95"/>
      <ellipse cx="50" cy="46" rx="20" ry="12" fill="currentColor" opacity="0.85"/>
      <ellipse cx="50" cy="62" rx="18" ry="10" fill="currentColor" opacity="0.75"/>
      <line x1="50" y1="20" x2="50" y2="80" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

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
      animate={{
        y: [0, -10, 0],
        rotate: [rotate, rotate + 8, rotate],
      }}
      transition={{
        duration: 4.5,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
      style={{ left: x, top: y, width: size, height: size * 0.65 }}
      className="absolute pointer-events-none select-none drop-shadow-[0_12px_24px_rgba(0,0,0,0.8)] z-10"
    >
      <div className="w-full h-full rounded-[50%/60%] bg-gradient-to-br from-[#452715] via-[#2A160A] to-[#120803] border border-[#5E361D]/50 relative shadow-inner flex items-center justify-center">
        {/* Center bean crease */}
        <div className="w-[85%] h-[2px] bg-[#110602] rounded-full shadow-inner transform -rotate-6" />
      </div>
    </motion.div>
  );
}

export default function CoffeeSlider() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [beverageType, setBeverageType] = useState<'hot' | 'cold'>('hot');

  const current = COFFEES[activeIdx];

  return (
    <section id="featured-coffee" className="relative bg-[#080604] py-20 px-4 sm:px-8 lg:px-12 overflow-hidden">
      
      {/* Section Header */}
      <div className="max-w-6xl mx-auto mb-10 flex items-center justify-between">
        <div>
          <span className="font-mono text-[10px] text-[#C8945A] uppercase tracking-[0.4em] block mb-2">
            Featured Product · Selection
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-[#EDE0C8] font-light">
            Hot Coffee <em className="text-[#F5C878] not-italic">Collection</em>
          </h2>
        </div>
        
        <span className="font-mono text-[11px] text-[#6B5240] tracking-widest uppercase hidden sm:block">
          grabyourcoffee.kohi
        </span>
      </div>

      {/* Main Slider Canvas Stage */}
      <div className="max-w-6xl mx-auto relative rounded-3xl overflow-hidden min-h-[580px] sm:min-h-[640px] border border-[#3D2A14]/80 shadow-2xl flex flex-col justify-between transition-colors duration-700">
        
        {/* Background Morphing Gradient */}
        <motion.div
          key={current.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-0 z-0 pointer-events-none"
          style={{ background: current.theme.bgGradient }}
        />

        {/* Ambient Top Branding Watermark */}
        <div className="absolute top-6 right-8 z-10 font-mono text-[10px] text-white/30 tracking-[0.3em] uppercase">
          grabyourcoffee.
        </div>

        {/* Floating Organic Coffee Beans */}
        <FloatingBean x="5%" y="6%" size={58} rotate={-35} delay={0} />
        <FloatingBean x="22%" y="78%" size={48} rotate={25} delay={0.8} />
        <FloatingBean x="48%" y="42%" size={52} rotate={-15} delay={1.4} />
        <FloatingBean x="72%" y="12%" size={42} rotate={45} delay={0.4} />
        <FloatingBean x="88%" y="54%" size={54} rotate={-60} delay={1.9} />

        {/* ══════════════════════════════════════════════
            CENTER STAGE (Cup on Left + Text on Right)
        ══════════════════════════════════════════════ */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 flex-1 items-center px-6 sm:px-12 py-12 gap-8">
          
          {/* LEFT: Cup Display with Animated Presence & Rotation */}
          <div className="lg:col-span-6 flex items-center justify-center relative min-h-[300px] sm:min-h-[380px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, rotate: -35, scale: 0.82, x: -40 }}
                animate={{ opacity: 1, rotate: 0, scale: 1, x: 0 }}
                exit={{ opacity: 0, rotate: 35, scale: 0.82, x: 40 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex items-center justify-center"
              >
                {/* Ground Shadow */}
                <div 
                  className="absolute inset-0 rounded-full blur-2xl scale-110 -translate-y-2 pointer-events-none"
                  style={{ background: current.theme.cupShadow }}
                />

                {/* USER PICTURE OVERRIDE OR DEFAULT ILLUSTRATED CUP */}
                {current.customImage ? (
                  /* User picture branch: renders provided custom picture */
                  <div className="w-64 h-64 sm:w-80 sm:h-80 relative rounded-full overflow-hidden shadow-2xl flex items-center justify-center">
                    <img
                      src={current.customImage}
                      alt={current.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  /* Default luxury realistic cup illustration */
                  <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-gradient-to-br from-[#FFFFFF] via-[#ECE5DC] to-[#CFC2B0] shadow-[0_25px_60px_rgba(0,0,0,0.85)] p-6 sm:p-7 flex items-center justify-center border border-[#FFFFFF]/80">
                    
                    {/* Saucer Inset Ring */}
                    <div className="w-full h-full rounded-full border border-[#B3A28F]/40 shadow-inner flex items-center justify-center p-4">
                      
                      {/* Cup Body */}
                      <div className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-full bg-gradient-to-br from-[#FFFFFF] via-[#F4EDE4] to-[#DDD2C3] p-4 shadow-xl flex items-center justify-center border border-[#FFFFFF]">
                        
                        {/* Coffee Crema Surface */}
                        <div className="w-full h-full rounded-full overflow-hidden relative shadow-[inset_0_4px_16px_rgba(0,0,0,0.9)] bg-gradient-to-br from-[#40200C] via-[#2A1407] to-[#140803] flex items-center justify-center">
                          
                          {/* Rich Crema Edge Ring */}
                          <div className="absolute inset-0 rounded-full border-[3px] border-[#A87440]/40" />

                          {/* Latte Art SVG */}
                          <LatteArt type={current.latteArtType} />

                          {/* Handle Shadow on Right */}
                          <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-4 h-10 bg-gradient-to-r from-[#FFFFFF] to-[#ECE5DC] rounded-r-lg border border-l-0 border-[#CFC2B0]/60 shadow-md" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT: Price, Large Bold Typography, Rating & About Card */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left relative z-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -22 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                {/* Price Display */}
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-mono text-base sm:text-lg text-[#EDE0C8]/75">$</span>
                  <span className="font-display font-medium text-3xl sm:text-4xl text-[#FFFFFF] tracking-tight">
                    {current.price.replace('$', '').trim()}
                  </span>
                </div>

                {/* Massive Bold Title */}
                <h3 className="font-display text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-[#FFFFFF] leading-[0.95] mb-6 drop-shadow-lg">
                  {current.displayName}
                </h3>

                {/* Rating Card + About Tasting Notes */}
                <div className="flex flex-col sm:flex-row items-start sm:items-stretch gap-4 max-w-lg">
                  
                  {/* Rating Pill */}
                  <div className="bg-black/35 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-4 flex flex-col items-center justify-center min-w-[100px] shrink-0">
                    <span className="font-mono text-2xl font-bold text-white mb-1">
                      {current.rating.toFixed(1)}
                    </span>
                    <div className="flex gap-1 text-[#F5C878] text-xs">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={i < Math.floor(current.rating) ? 'opacity-100' : 'opacity-30'}>
                          ★
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* About Card */}
                  <div className="bg-black/35 backdrop-blur-md border border-white/10 rounded-2xl p-5 flex-1 shadow-lg">
                    <p className="font-mono text-[10px] uppercase text-[#F5C878] tracking-widest font-semibold mb-2">
                      About
                    </p>
                    <p className="font-mono text-xs text-white/80 leading-relaxed font-light">
                      {current.aboutText}
                    </p>
                  </div>

                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* ══════════════════════════════════════════════
            BOTTOM BAR: Hot/Cold Toggle & Thumbnails
        ══════════════════════════════════════════════ */}
        <div className="relative z-20 px-6 sm:px-12 py-6 border-t border-white/10 bg-black/25 backdrop-blur-md flex flex-wrap items-center justify-between gap-6">
          
          {/* Left Hot / Cold Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setBeverageType('hot')}
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
                beverageType === 'hot'
                  ? 'bg-white/20 border-white text-[#F5C878]'
                  : 'bg-transparent border-white/20 text-white/40 hover:text-white/80'
              }`}
              title="Hot Coffee"
            >
              {/* Hot coffee steam icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
                <line x1="6" y1="1" x2="6" y2="4"/>
                <line x1="10" y1="1" x2="10" y2="4"/>
                <line x1="14" y1="1" x2="14" y2="4"/>
              </svg>
            </button>

            <button
              onClick={() => setBeverageType('cold')}
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
                beverageType === 'cold'
                  ? 'bg-white/20 border-white text-[#F5C878]'
                  : 'bg-transparent border-white/20 text-white/40 hover:text-white/80'
              }`}
              title="Iced / Cold Coffee"
            >
              {/* Cold snowflake icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="2" x2="12" y2="22"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
                <path d="m20 16-4-4 4-4"/>
                <path d="m4 8 4 4-4 4"/>
                <path d="m16 4-4 4-4-4"/>
                <path d="m8 20 4-4 4 4"/>
              </svg>
            </button>
          </div>

          {/* Right Thumbnails Bar with animated sliding pill */}
          <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto py-1">
            {COFFEES.map((item, idx) => {
              const isActive = idx === activeIdx;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveIdx(idx)}
                  className="relative px-3 sm:px-4 py-2.5 rounded-2xl flex items-center gap-3 transition-all cursor-pointer group"
                >
                  {/* Sliding active pill indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 rounded-2xl bg-white/25 border border-white/30 backdrop-blur-md"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}

                  {/* Thumbnail circular icon */}
                  <div className="relative z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 p-0.5 shadow-md flex items-center justify-center border border-white shrink-0">
                    <div className="w-full h-full rounded-full bg-[#2A1407] flex items-center justify-center overflow-hidden">
                      <LatteArt type={item.latteArtType} />
                    </div>
                  </div>

                  {/* Coffee Name */}
                  <span className={`relative z-10 font-mono text-[11px] sm:text-xs tracking-wider whitespace-nowrap transition-colors ${
                    isActive ? 'text-white font-medium' : 'text-white/60 group-hover:text-white'
                  }`}>
                    {item.name}
                  </span>
                </button>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
