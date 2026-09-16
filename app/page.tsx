'use client';

import CoffeeScroll from '@/components/CoffeeScroll';
import AboutUs from '@/components/AboutUs';
import CoffeeSlider from '@/components/CoffeeSlider';
import { useState, useEffect } from 'react';

const STATS = [
  { value: '72h', label: 'Cold Extraction',  sub: 'Unhurried. Uncompromising.' },
  { value: '6',   label: 'Origin Countries', sub: 'From Ethiopia to Colombia.' },
  { value: '0°C', label: 'Brew Temperature', sub: 'Never above freezing.'      },
] as const;

export default function Home() {
  const [cartCount, setCartCount] = useState(0);
  const [hoveredLink,  setHoveredLink]  = useState<string | null>(null);
  const [cartHovered,  setCartHovered]  = useState(false);

  /*
   * isPastHero — true once user has scrolled past the 400vh hero section.
   * Controls navbar appearance:
   *   INSIDE hero  → nearly transparent, blends with canvas frames
   *   PAST hero    → solid dark, high contrast for light content below
   */
  const [isPastHero, setIsPastHero] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Hero section = 400vh = 4 × viewport height
      const heroEnd = window.innerHeight * 4;
      setIsPastHero(window.scrollY >= heroEnd);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'About Us', href: '#about' },
    { name: 'Featured', href: '#featured-coffee' },
    { name: 'Reserve', href: '#below-fold' },
  ];

  /* ── Navbar styles — two states ── */
  const navBg     = isPastHero ? 'rgba(8,6,4,0.94)'  : 'rgba(8,6,4,0.15)';
  const navBlur   = isPastHero ? 'blur(18px)'         : 'blur(3px)';
  const navBorder = isPastHero ? 'rgba(200,148,90,0.14)' : 'rgba(255,255,255,0.04)';

  return (
    <main style={{ background: '#080604', minHeight: '100vh' }}>

      {/* ══════════════════════════════════════════════
          NAVBAR
          · In hero   → glass-transparent, text readable via canvas shadows
          · Past hero → solid dark, proper contrast for page sections below
      ════════════════════════════════════════════ */}
      <header style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 40px',
        height: '68px',
        background: navBg,
        backdropFilter: navBlur,
        WebkitBackdropFilter: navBlur,
        borderBottom: `1px solid ${navBorder}`,
        transition: 'background 0.55s ease, backdrop-filter 0.55s ease, border-color 0.55s ease',
      }}>

        {/* Logo */}
        <a
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textDecoration: 'none',
          }}
        >
          <img
            src="/logo.png"
            alt="Brew&Bloom Coffee Shop"
            style={{
              height: '42px',
              width: '42px',
              borderRadius: '8px',
              objectFit: 'cover',
              border: '1px solid rgba(200,148,90,0.3)',
              boxShadow: '0 4px 14px rgba(0,0,0,0.45)',
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontFamily: '"Unbounded", sans-serif',
                fontWeight: 700,
                fontSize: '0.92rem',
                color: '#EDE0C8',
                letterSpacing: '0.12em',
                lineHeight: 1.15,
              }}
            >
              Brew&amp;Bloom
            </span>
            <span
              style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '8px',
                letterSpacing: '0.28em',
                color: '#C8945A',
                textTransform: 'uppercase',
                fontWeight: 400,
              }}
            >
              Coffee Shop
            </span>
          </div>
        </a>

        {/* Nav links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '36px' }}>
          {navLinks.map(({ name, href }) => (
            <a key={name} href={href}
              style={{
                fontFamily: '"Autour One", system-ui', fontWeight: 400, fontSize: '0.875rem',
                color: hoveredLink === name ? '#C8945A' : 'rgba(237,224,200,0.82)',
                letterSpacing: '0.02em', textDecoration: 'none',
                transition: 'color 0.22s ease', position: 'relative',
              }}
              onMouseEnter={() => setHoveredLink(name)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              {name}
              <span style={{
                position: 'absolute', bottom: '-3px', left: 0, height: '1px',
                background: '#C8945A', display: 'block',
                width: hoveredLink === name ? '100%' : '0%',
                transition: 'width 0.25s ease',
              }}/>
            </a>
          ))}
        </nav>

        {/* Shopping Cart */}
        <button
          onClick={() => setCartCount(c => c + 1)}
          onMouseEnter={() => setCartHovered(true)}
          onMouseLeave={() => setCartHovered(false)}
          style={{
            fontFamily: '"Autour One", system-ui', fontWeight: 400, fontSize: '0.8rem', letterSpacing: '0.04em',
            color: cartHovered ? '#080604' : '#C8945A',
            background: cartHovered ? '#C8945A' : 'transparent',
            border: '1px solid rgba(200,148,90,0.52)',
            padding: '9px 20px', cursor: 'pointer', borderRadius: '2px',
            display: 'flex', alignItems: 'center', gap: '9px',
            transition: 'background 0.3s ease, color 0.3s ease',
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
            stroke={cartHovered ? '#080604' : '#C8945A'} strokeWidth="1.8"
            style={{ transition: 'stroke 0.3s ease', flexShrink: 0 }}>
            <path d="M6 2 3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4Z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          Shopping Cart
          <span style={{
            background: cartHovered ? '#080604' : '#C8945A',
            color: cartHovered ? '#C8945A' : '#080604',
            borderRadius: '50%', width: '18px', height: '18px',
            fontSize: '10px', fontWeight: 600, fontFamily: 'DM Mono, monospace',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.3s ease, color 0.3s ease', flexShrink: 0,
          }}>{cartCount}</span>
        </button>
      </header>

      {/* Scrollytelling hero */}
      <CoffeeScroll />

      {/* About Us section (styled after reference banner) */}
      <AboutUs />

      {/* Featured Product Hot Coffee animated slider (styled after reference video) */}
      <CoffeeSlider />

      {/* ══════════════════════════════════════════════
          BELOW-FOLD STATS
      ════════════════════════════════════════════ */}
      <section id="below-fold" style={{ background: '#080604', padding: '96px 40px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto 72px', display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div style={{ flex: 1, height: '1px', background: '#3D2A14' }}/>
          <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', fontWeight: 300, color: '#3D2A14', letterSpacing: '0.5em', textTransform: 'uppercase' }}>the numbers</p>
          <div style={{ flex: 1, height: '1px', background: '#3D2A14' }}/>
        </div>
        <div style={{ maxWidth: '960px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', borderTop: '1px solid #3D2A14' }}>
          {STATS.map(({ value, label, sub }, i) => (
            <div key={value} style={{ padding: '48px 36px', borderRight: i < STATS.length - 1 ? '1px solid #3D2A14' : undefined }}>
              <p style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontWeight: 300, fontSize: 'clamp(2.4rem, 5vw, 3.2rem)', color: '#C8945A', lineHeight: 1, marginBottom: '10px' }}>{value}</p>
              <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: '#EDE0C8', letterSpacing: '0.18em', marginBottom: '4px' }}>{label}</p>
              <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: '#6B5240', fontWeight: 300 }}>{sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Product callout */}
      <section style={{ background: '#080604', padding: '0 40px 96px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', border: '1px solid #3D2A14', padding: '64px', display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '40px' }}>
          <div style={{ maxWidth: '380px' }}>
            <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', fontWeight: 300, color: '#C8945A', letterSpacing: '0.5em', textTransform: 'uppercase', marginBottom: '16px' }}>now available</p>
            <h3 style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontWeight: 300, fontSize: 'clamp(1.8rem, 4vw, 3rem)', lineHeight: 0.95, color: '#EDE0C8', marginBottom: '20px' }}>
              Ethiopia Yirgacheffe<br/><em>Reserve, 2024</em>
            </h3>
            <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', fontWeight: 300, color: '#6B5240', lineHeight: 1.8 }}>
              Notes of bergamot, dried jasmine, and stone fruit. Cold-extracted at 2,400m altitude.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'flex-end' }}>
            <div>
              <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', color: '#6B5240', letterSpacing: '0.3em', marginBottom: '4px' }}>250ml · Concentrate</p>
              <p style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontWeight: 300, fontSize: '2.2rem', color: '#EDE0C8' }}>$28</p>
            </div>
            <button 
              onClick={() => setCartCount(c => c + 1)}
              style={{ fontFamily: '"Autour One", system-ui', fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', background: '#C8945A', color: '#080604', border: 'none', padding: '14px 40px', cursor: 'pointer', transition: 'background 0.4s ease' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#EDE0C8')}
              onMouseLeave={e => (e.currentTarget.style.background = '#C8945A')}
            >add to cart</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #3D2A14', padding: '28px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img
            src="/logo.png"
            alt="Brew&Bloom Coffee Shop"
            style={{
              height: '30px',
              width: '30px',
              borderRadius: '6px',
              objectFit: 'cover',
              border: '1px solid rgba(200,148,90,0.25)',
            }}
          />
          <span style={{ fontFamily: '"Unbounded", sans-serif', fontWeight: 500, fontSize: '0.82rem', color: '#EDE0C8', letterSpacing: '0.14em' }}>
            Brew&amp;Bloom
          </span>
        </div>
        <div style={{ display: 'flex', gap: '28px' }}>
          {['Origins','Process','Wholesale','Contact'].map(l => (
            <a key={l} href="#" style={{ fontFamily: '"Autour One", system-ui', fontSize: '11px', color: '#3D2A14', letterSpacing: '0.22em', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#6B5240')}
              onMouseLeave={e => (e.currentTarget.style.color = '#3D2A14')}
            >{l}</a>
          ))}
        </div>
        <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', color: '#3D2A14', letterSpacing: '0.25em' }}>© 2024 Brew&amp;Bloom Coffee Shop. All rights reserved.</p>
      </footer>

    </main>
  );
}
