'use client';

export default function AboutUs() {
  return (
    <section 
      id="about" 
      className="w-full min-h-screen relative overflow-hidden bg-[#FAF3E8] flex items-center"
    >
      {/* Subtle Background Coffee Typographic Watermark Grid across the full screen */}
      <div 
        className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-[0.045] font-unbounded text-[#3D2617] font-black leading-none text-5xl sm:text-7xl lg:text-8xl tracking-widest uppercase flex flex-col justify-between p-8 sm:p-14"
        aria-hidden
      >
        <div className="flex justify-between">
          <span>CAPPUCCINO</span>
          <span>MOCHA</span>
          <span>MACCHIATO</span>
        </div>
        <div className="flex justify-between pl-20">
          <span>LATTE</span>
          <span>SINGLE ORIGIN</span>
          <span>AMERICANO</span>
        </div>
        <div className="flex justify-between">
          <span>ESPRESSO</span>
          <span>COLD BREW</span>
          <span>ROASTERY</span>
        </div>
      </div>

      {/* Hatched Geometric Circle Accents (Top-Right & Bottom-Center) */}
      <div className="absolute top-8 sm:top-14 right-8 sm:right-16 w-24 h-24 sm:w-36 sm:h-36 rounded-full pointer-events-none opacity-60 overflow-hidden">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <pattern id="hatchTopFull" width="6" height="6" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="6" stroke="#D2B48C" strokeWidth="1.6" />
            </pattern>
          </defs>
          <circle cx="50" cy="50" r="48" fill="url(#hatchTopFull)" stroke="#D2B48C" strokeWidth="1" />
        </svg>
      </div>

      <div className="absolute -bottom-10 left-[42%] w-36 h-36 sm:w-52 sm:h-52 rounded-full pointer-events-none opacity-50 overflow-hidden">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <pattern id="hatchBottomFull" width="6" height="6" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="6" stroke="#D2B48C" strokeWidth="1.6" />
            </pattern>
          </defs>
          <circle cx="50" cy="50" r="48" fill="url(#hatchBottomFull)" stroke="#D2B48C" strokeWidth="1" />
        </svg>
      </div>

      {/* Bean Doodle Cluster 1 (Top Center) */}
      <div className="absolute top-12 left-[48%] pointer-events-none select-none opacity-75 hidden sm:block">
        <svg width="85" height="50" viewBox="0 0 80 50" fill="none" stroke="#2C160B" strokeWidth="1.4">
          <ellipse cx="14" cy="12" rx="4.5" ry="3" transform="rotate(-25 14 12)" />
          <ellipse cx="28" cy="10" rx="4.5" ry="3" transform="rotate(20 28 10)" />
          <ellipse cx="42" cy="14" rx="4.5" ry="3" transform="rotate(-10 42 14)" />
          <ellipse cx="20" cy="22" rx="4.5" ry="3" transform="rotate(35 20 22)" />
          <ellipse cx="34" cy="24" rx="4" ry="2.8" transform="rotate(-40 34 24)" />
          <ellipse cx="48" cy="22" rx="4.5" ry="3" transform="rotate(15 48 22)" />
          <ellipse cx="60" cy="16" rx="4.5" ry="3" transform="rotate(-30 60 16)" />
          <ellipse cx="26" cy="34" rx="4.5" ry="3" transform="rotate(10 26 34)" />
          <ellipse cx="40" cy="36" rx="4.5" ry="3" transform="rotate(-20 40 36)" />
          <ellipse cx="54" cy="32" rx="4" ry="2.8" transform="rotate(45 54 32)" />
        </svg>
      </div>

      {/* Bean Doodle Cluster 2 (Bottom Center) */}
      <div className="absolute bottom-16 left-[52%] pointer-events-none select-none opacity-75 hidden sm:block">
        <svg width="85" height="50" viewBox="0 0 80 50" fill="none" stroke="#2C160B" strokeWidth="1.4">
          <ellipse cx="14" cy="14" rx="4.5" ry="3" transform="rotate(15 14 14)" />
          <ellipse cx="28" cy="18" rx="4.5" ry="3" transform="rotate(-30 28 18)" />
          <ellipse cx="42" cy="12" rx="4.5" ry="3" transform="rotate(40 42 12)" />
          <ellipse cx="22" cy="28" rx="4" ry="2.8" transform="rotate(-15 22 28)" />
          <ellipse cx="36" cy="30" rx="4.5" ry="3" transform="rotate(25 36 30)" />
          <ellipse cx="50" cy="26" rx="4.5" ry="3" transform="rotate(-35 50 26)" />
          <ellipse cx="32" cy="40" rx="4" ry="2.6" transform="rotate(10 32 40)" />
          <ellipse cx="46" cy="38" rx="4.5" ry="3" transform="rotate(-20 46 38)" />
        </svg>
      </div>

      {/* Main Full-Screen Layout */}
      <div className="w-full h-full min-h-screen grid grid-cols-1 lg:grid-cols-12 relative z-10 items-stretch">
        
        {/* ══════════════════════════════════════════════
            LEFT COLUMN: Dark Espresso Wave & Cup
        ══════════════════════════════════════════════ */}
        <div className="lg:col-span-5 relative flex items-center justify-center p-8 sm:p-14 min-h-[460px] lg:min-h-screen">
          
          {/* Dark Espresso Curved Wave Background Shape extending to the screen edges */}
          <div 
            className="absolute inset-0 bg-[#28150B] z-0 shadow-2xl"
            style={{
              clipPath: 'polygon(0 0, 84% 0, 100% 50%, 82% 100%, 0 100%)',
            }}
          />

          {/* Top-Left Logo */}
          <div className="absolute top-8 left-8 sm:top-12 sm:left-12 z-20 flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 border border-white/25 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#FFFFFF">
                <path d="M12 2C6.5 2 2 6.5 2 12c0 4.5 3 8.3 7.2 9.5-.1-.7-.2-1.5-.2-2.3 0-4.4 3.6-8 8-8 .8 0 1.6.1 2.3.2C18.1 4.5 14.3 2 12 2z"/>
                <path d="M18.8 8.8C18.3 8.3 17.6 8 17 8c-3.3 0-6 2.7-6 6 0 .6.3 1.3.8 1.8 2.2 2.2 5.8 2.2 8 0s2.2-5.8 0-8z" opacity="0.8"/>
              </svg>
            </div>
            <span className="font-unbounded font-semibold text-sm sm:text-base tracking-[0.24em] text-white">
              [KOHI]
            </span>
          </div>

          {/* Centered Cup + Saucer */}
          <div className="relative z-10 w-72 h-72 sm:w-88 sm:h-88 lg:w-96 lg:h-96 flex items-center justify-center">
            
            {/* Dashed circular orbit around the cup */}
            <div 
              className="absolute w-[114%] h-[114%] rounded-full border-[2.5px] border-dashed border-[#28150B]/60 pointer-events-none"
              style={{
                clipPath: 'polygon(35% 0, 100% 0, 100% 100%, 35% 100%)',
              }}
            />

            {/* Golden accent curve beneath */}
            <div 
              className="absolute -bottom-3 -left-4 w-52 h-52 sm:w-64 sm:h-64 rounded-full border-[3px] border-[#D8B377] pointer-events-none opacity-85"
              style={{
                clipPath: 'polygon(0 50%, 60% 100%, 0 100%)',
              }}
            />

            {/* User's Uploaded Coffee Cup Photo */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-84 lg:h-84 rounded-full overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.55)] border-[6px] sm:border-[8px] border-white bg-[#FAF3E8]">
              <img
                src="/images/about-coffee.jpg"
                alt="Kohi Artisan Coffee Cup"
                className="w-full h-full object-cover object-center scale-[1.35] transition-transform duration-700 hover:scale-[1.42]"
              />
            </div>

          </div>

        </div>

        {/* ══════════════════════════════════════════════
            RIGHT COLUMN: Full-screen editorial layout
        ══════════════════════════════════════════════ */}
        <div className="lg:col-span-7 px-8 sm:px-14 lg:px-20 py-12 sm:py-16 lg:py-24 flex flex-col justify-between relative z-10">
          
          <div className="my-auto max-w-2xl">
            {/* Title: Cursive / Script "Coffee Shop" matching Picture 2 */}
            <h2 className="font-lora italic font-bold text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-[#2B160B] tracking-tight leading-[1.02] mb-7 sm:mb-8">
              Coffee Shop
            </h2>

            {/* Editorial Brand Narrative */}
            <p className="font-lora text-sm sm:text-base lg:text-lg text-[#4A3022] leading-relaxed mb-8 sm:mb-12 font-normal">
              Founded on an unhurried devotion to single-origin craftsmanship and pure extraction. Sourced from high-altitude volcanic soils at 2,400 meters, our beans are slow-immersed for 72 hours with zero heat to yield an extraordinarily smooth, velvety cup rich in notes of jasmine, bergamot, and roasted amber cocoa.
            </p>
          </div>

          {/* Opening Hours & Real Social Media SVGs matching Picture 2 */}
          <div className="pt-8 border-t border-[#2B160B]/15 flex flex-col sm:flex-row sm:items-end justify-between gap-8 max-w-2xl">
            
            {/* Left Column: Hours */}
            <div>
              <p className="font-autour text-xs sm:text-sm text-[#2B160B]/75 mb-1.5 tracking-wide">
                Opening 27th August
              </p>
              <p className="font-unbounded font-black text-3xl sm:text-4xl lg:text-5xl text-[#2B160B] tracking-tight">
                9AM - 10PM
              </p>
            </div>

            {/* Right Column: Website & Real Social Media SVGs */}
            <div className="flex flex-col items-start sm:items-end gap-3.5">
              <a 
                href="https://www.kohi.coffee" 
                target="_blank" 
                rel="noreferrer"
                className="font-unbounded text-xs sm:text-sm text-[#2B160B]/85 hover:text-[#2B160B] tracking-wider transition-colors font-semibold"
              >
                www.kohi.coffee
              </a>

              {/* Real Social Media SVGs in round dark pills */}
              <div className="flex items-center gap-3">
                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#2B160B] text-white flex items-center justify-center hover:bg-[#3D2617] hover:scale-110 transition-all shadow-sm"
                  aria-label="Instagram"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>

                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#2B160B] text-white flex items-center justify-center hover:bg-[#3D2617] hover:scale-110 transition-all shadow-sm"
                  aria-label="Facebook"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.597 0 9 1.583 9 4.615V8z"/>
                  </svg>
                </a>

                {/* X / Twitter */}
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#2B160B] text-white flex items-center justify-center hover:bg-[#3D2617] hover:scale-110 transition-all shadow-sm"
                  aria-label="Twitter X"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
