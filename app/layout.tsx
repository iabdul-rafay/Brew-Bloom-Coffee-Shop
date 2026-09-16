import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Brew&Bloom Coffee Shop — Single Origin & Artisan Roastery',
  description:
    'Brew&Bloom Coffee Shop: Precision cold-brew and artisan coffees sourced from high-altitude farms, slow-immersed over 72 hours.',
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#080604',
  width: 'device-width',
  initialScale: 1,
};

import SmoothScroll from '@/components/SmoothScroll';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Google Fonts: Autour One, Lora, Unbounded, Cormorant Garamond, DM Mono */}
        <link
          href="https://fonts.googleapis.com/css2?family=Autour+One&family=Lora:ital,wght@0,400..700;1,400..700&family=Unbounded:wght@200..900&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Mono:wght@300;400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
