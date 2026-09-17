# Brew&Bloom Coffee Shop — Scrollytelling Landing Page

A high-end scrollytelling experience built with Next.js 14, Framer Motion, and HTML5 Canvas.

## Stack

- **Next.js 14** (App Router)
- **Tailwind CSS** v3
- **Framer Motion** v11
- **HTML5 Canvas** (scroll-synced frame rendering)
- **Fonts:** Cormorant Garamond (display) + DM Mono (UI)

---

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Place your 40 frames here (already included if you downloaded the full repo):
#    public/frames/ezgif-frame-001.jpg → ezgif-frame-040.jpg

# 3. Run dev server
npm run dev
```

Open [https://brewandbloom-vert.vercel.app/](https://brewandbloom-vert.vercel.app).

---

## File Structure

```
kohi/
├── app/
│   ├── globals.css          ← Design tokens, fonts, base styles
│   ├── layout.tsx           ← Root layout with metadata
│   └── page.tsx             ← Landing page (nav + scroll + stats + footer)
├── components/
│   └── CoffeeScroll.tsx     ← Sticky canvas + scroll-linked animation + text overlays
├── public/
│   └── frames/
│       ├── ezgif-frame-001.jpg
│       ├── ...
│       └── ezgif-frame-040.jpg
├── tailwind.config.ts
├── next.config.ts
└── tsconfig.json
```

---

## Scroll Architecture

```
h-[400vh] outer container  ←  gives 4× scroll distance
  └── sticky h-screen       ←  viewport stays fixed during scroll
        ├── <canvas>         ←  frame sequence drawn here
        ├── vignette overlay ←  edge darkness for text readability
        └── text layers (4)  ←  Framer Motion opacity/y, scroll-synced
```

### Scroll Timing

| Range     | What happens                              |
|-----------|-------------------------------------------|
| 0% → 24%  | Hero headline fades in / holds            |
| 24% → 53% | "Every origin tells a story" (left)       |
| 53% → 82% | "Engineered for precision" (right)        |
| 82% → 100%| CTA fades in / product reassembles        |

---

## Customisation

**Change copy:** Edit the text directly inside `CoffeeScroll.tsx` `<TextLayer>` blocks.

**Change scroll timing:** Adjust the array values in `useTransform` calls inside `CoffeeScroll.tsx` (values are 0–1, representing scroll progress).

**Add/remove frames:** Change `TOTAL_FRAMES` constant and update filenames accordingly.

**Colors:** Edit CSS custom properties in `globals.css` `:root`.
