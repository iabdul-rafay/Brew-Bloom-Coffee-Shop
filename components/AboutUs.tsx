'use client';

export default function AboutUs() {
  return (
    <section 
      id="about" 
      className="relative py-16 sm:py-24 px-4 sm:px-8 lg:px-12 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at center, #9e734c 0%, #875e38 50%, #6d4726 100%)',
      }}
    >
      {/* Outer Banner Card Matching Picture 2 */}
      <div className="max-w-5xl mx-auto relative rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.45)] border border-[#D4B595]/30 bg-[#FAF3E8]">
        
        {/* Subtle Background Coffee Typographic Watermark Grid */}
        <div 
          className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-[0.055] font-unbounded text-[#3D2617] font-black leading-none text-4xl sm:text-5xl tracking-widest uppercase flex flex-col justify-between p-6"
          aria-hidden
        >
          <div className="flex justify-between">
            <span>CAPPUCCINO</span>
            <span>MOCHA</span>
            <span>MACCHIATO</span>
          </div>
          <div className="flex justify-between pl-12">
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
        <div className="absolute top-6 right-8 w-20 h-20 sm:w-24 sm:h-24 rounded-full pointer-events-none opacity-60 overflow-hidden">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <pattern id="hatchTop" width="7" height="7" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="0" y2="7" stroke="#D2B48C" strokeWidth="1.8" />
              </pattern>
            </defs>
            <circle cx="50" cy="50" r="48" fill="url(#hatchTop)" stroke="#D2B48C" strokeWidth="1" />
          </svg>
        </div>

        <div className="absolute -bottom-8 left-[38%] w-32 h-32 sm:w-40 sm:h-40 rounded-full pointer-events-none opacity-50 overflow-hidden">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <pattern id="hatchBottom" width="7" height="7" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="0" y2="7" stroke="#D2B48C" strokeWidth="1.8" />
              </pattern>
            </defs>
            <circle cx="50" cy="50" r="48" fill="url(#hatchBottom)" stroke="#D2B48C" strokeWidth="1" />
          </svg>
        </div>

        {/* Bean Doodle Cluster 1 (Top Center) */}
        <div className="absolute top-10 left-[48%] pointer-events-none select-none opacity-75">
          <svg width="70" height="42" viewBox="0 0 80 50" fill="none" stroke="#2C160B" strokeWidth="1.4">
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
        <div className="absolute bottom-10 left-[50%] pointer-events-none select-none opacity-75">
          <svg width="70" height="42" viewBox="0 0 80 50" fill="none" stroke="#2C160B" strokeWidth="1.4">
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

        {/* Main Card Content Grid */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 min-h-[480px]">
          
          {/* ══════════════════════════════════════════════
              LEFT SIDE: Deep Espresso Wave & Centered Cup
          ══════════════════════════════════════════════ */}
          <div className="lg:col-span-5 relative flex items-center justify-center p-8 sm:p-12 overflow-hidden min-h-[360px] lg:min-h-full">
            
            {/* Dark Espresso Curved Wave Background Shape */}
            <div 
              className="absolute inset-0 bg-[#28150B] z-0"
              style={{
                clipPath: 'polygon(0 0, 85% 0, 100% 50%, 82% 100%, 0 100%)',
              }}
            />

            {/* Top-Left Logo */}
            <div className="absolute top-6 left-6 z-20 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/10 border border-white/25 flex items-center justify-center">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="#FFFFFF">
                  <path d="M12 2C6.5 2 2 6.5 2 12c0 4.5 3 8.3 7.2 9.5-.1-.7-.2-1.5-.2-2.3 0-4.4 3.6-8 8-8 .8 0 1.6.1 2.3.2C18.1 4.5 14.3 2 12 2z"/>
                  <path d="M18.8 8.8C18.3 8.3 17.6 8 17 8c-3.3 0-6 2.7-6 6 0 .6.3 1.3.8 1.8 2.2 2.2 5.8 2.2 8 0s2.2-5.8 0-8z" opacity="0.8"/>
                </svg>
              </div>
              <span className="font-unbounded font-semibold text-xs tracking-[0.22em] text-white">
                [KOHI]
              </span>
            </div>

            {/* Centered Cup + Saucer with User's Uploaded Picture */}
            <div className="relative z-10 w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center mt-4">
              
              {/* Dashed circular orbit around the cup as in Picture 2 */}
              <div 
                className="absolute w-[112%] h-[112%] rounded-full border-[2px] border-dashed border-[#28150B]/65 pointer-events-none"
                style={{
                  clipPath: 'polygon(35% 0, 100% 0, 100% 100%, 35% 100%)',
                }}
              />

              {/* Golden accent curve beneath */}
              <div 
                className="absolute -bottom-2 -left-3 w-44 h-44 rounded-full border-[3px] border-[#D8B377] pointer-events-none opacity-80"
                style={{
                  clipPath: 'polygon(0 50%, 60% 100%, 0 100%)',
                }}
              />

              {/* Cup Image with clean circular saucer cut and shadow */}
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full overflow-hidden shadow-[0_16px_36px_rgba(0,0,0,0.5)] border-[5px] border-white bg-[#FAF3E8]">
                <img
                  src="/images/about-coffee.jpg"
                  alt="Kohi Artisan Coffee Cup"
                  className="w-full h-full object-cover object-center scale-[1.32] transition-transform duration-700 hover:scale-[1.38]"
                />
              </div>

            </div>

          </div>

          {/* ══════════════════════════════════════════════
              RIGHT SIDE: Coffee Shop Typography, Details & Socials
          ══════════════════════════════════════════════ */}
          <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14 flex flex-col justify-between relative z-10">
            
            <div>
              {/* Title: Cursive / Script "Coffee Shop" matching Picture 2 */}
              <h2 className="font-lora italic font-bold text-4xl sm:text-5xl lg:text-6xl text-[#2B160B] tracking-tight leading-[1.05] mb-5">
                Coffee Shop
              </h2>

              {/* Editorial Brand Narrative */}
              <p className="font-lora text-xs sm:text-sm text-[#4A3022] leading-relaxed max-w-lg mb-6 font-normal">
                Founded on an unhurried devotion to single-origin craftsmanship and pure extraction. Sourced from high-altitude volcanic soils at 2,400 meters, our beans are slow-immersed for 72 hours with zero heat to yield an extraordinarily smooth, velvety cup rich in notes of jasmine, bergamot, and roasted amber cocoa.
              </p>
            </div>

            {/* Opening Hours & Real Social Media SVGs matching Picture 2 */}
            <div className="pt-6 border-t border-[#2B160B]/15 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              
              {/* Left Column: Hours */}
              <div>
                <p className="font-autour text-xs text-[#2B160B]/75 mb-1 tracking-wide">
                  Opening 27th August
                </p>
                <p className="font-unbounded font-black text-2xl sm:text-3xl text-[#2B160B] tracking-tight">
                  9AM - 10PM
                </p>
              </div>

              {/* Right Column: Website & Real Social Media SVGs */}
              <div className="flex flex-col items-start sm:items-end gap-2.5">
                <a 
                  href="https://www.kohi.coffee" 
                  target="_blank" 
                  rel="noreferrer"
                  className="font-unbounded text-[11px] text-[#2B160B]/85 hover:text-[#2B160B] tracking-wider transition-colors font-semibold"
                >
                  www.kohi.coffee
                </a>

                {/* Real Social Media SVGs in round dark pills */}
                <div className="flex items-center gap-2.5">
                  {/* Instagram */}
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-7 h-7 rounded-full bg-[#2B160B] text-white flex items-center justify-center hover:bg-[#3D2617] hover:scale-110 transition-all shadow-sm"
                    aria-label="Instagram"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>

                  {/* Facebook */}
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-7 h-7 rounded-full bg-[#2B160B] text-white flex items-center justify-center hover:bg-[#3D2617] hover:scale-110 transition-all shadow-sm"
                    aria-label="Facebook"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.597 0 9 1.583 9 4.615V8z"/>
                    </svg>
                  </a>

                  {/* X / Twitter */}
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-7 h-7 rounded-full bg-[#2B160B] text-white flex items-center justify-center hover:bg-[#3D2617] hover:scale-110 transition-all shadow-sm"
                    aria-label="Twitter X"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
