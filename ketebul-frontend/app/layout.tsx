import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Layout from '../components/Layout';
import { Suspense } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import TransitionProvider from '../components/TransitionProvider';
import PWAProvider from '../components/PWAProvider';

// ─── Fonts: Inter is now the Global Standard ──────────────────────────────────
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  // Weight range for clean titles (700) and readable body (400)
  weight: ['300', '400', '500', '600', '700', '800'],
});

// ─── Constants ────────────────────────────────────────────────────────────────
const SITE_URL  = 'https://ketebulmusic.org';
const SITE_NAME = 'Ketebul Music';
const TITLE     = 'Ketebul Music | Preserving East African Sound';
const DESC      = 'Ketebul Music is a non-profit in Nairobi preserving, developing and promoting the diverse musical traditions and heritage of East Africa since 2007.';

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s | ${SITE_NAME}`, 
  },
  description: DESC,
  keywords: [
    'Ketebul Music', 'East African music', 'Kenyan music', 'music preservation',
    'African heritage', 'Benga', 'Ohangla', 'Nairobi music', 'Tabu Osusa',
    'Singing Wells', 'traditional music Kenya', 'Go Down Arts Centre',
    'Shades of Benga book', 'Anyango Nyar Siaya',
  ],
  authors:    [{ name: 'Ketebul Music', url: SITE_URL }],
  creator:    'Ketebul Music',
  publisher: 'Ketebul Music',
  alternates: { canonical: SITE_URL },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: TITLE,
    description: DESC,
    images: [{
      url: `${SITE_URL}/og-image.jpg`,
      width: 1200,
      height: 630,
      alt: 'Ketebul Music — Preserving East African Sound',
      type: 'image/jpeg',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ketebulmusic',
    creator: '@ketebulmusic',
    title: TITLE,
    description: DESC,
    images: [`${SITE_URL}/og-image.jpg`],
  },
  icons: {
    icon: [
      { url: '/favicon.ico',  sizes: 'any' },
      { url: '/icon-16.png',  type: 'image/png', sizes: '16x16'  },
      { url: '/icon-32.png',  type: 'image/png', sizes: '32x32'  },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192'},
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512'},
    ],
    apple:    [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#030712', // Updated to match your background for a seamless PWA feel
};

// ─── JSON-LD Schema ───────────────────────────────────────────────────────────
const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Ketebul Music',
  alternateName: 'Ketebul',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description: DESC,
  foundingDate: '2007',
  foundingLocation: { '@type': 'Place', name: 'Nairobi, Kenya' },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'GoDown Arts Centre, Dunga Road',
    addressLocality: 'Nairobi',
    addressCountry: 'KE',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'info@ketebulmusic.org',
    telephone: '+254-20-675-1011',
    contactType: 'customer service',
    availableLanguage: ['English', 'Swahili'],
  },
  sameAs: [
    'https://www.facebook.com/ketebulmusic',
    'https://www.instagram.com/ketebulmusic',
    'https://www.youtube.com/channel/UCqU9TmbuHV09Quhgrf7L2HQ',
    'https://soundcloud.com/ketebulmusic',
    'https://ketebul.bandcamp.com',
  ],
};

// ─── Root Layout ──────────────────────────────────────────────────────────────
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} font-sans`}
    >
      <head>
        {/* Anti-Flash Protection */}
        <style>{`html,body{background-color:#030712;margin:0;padding:0;color:#f0f0f0;}`}</style>

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>

      <body className="font-inter antialiased selection:bg-gold selection:text-black">
        <Suspense fallback={<div className="h-screen bg-black" />}>
          <Layout>
            <TransitionProvider>{children}</TransitionProvider>
          </Layout>
        </Suspense>
        
        <Analytics />
        <SpeedInsights />
        <PWAProvider />
      </body>
    </html>
  );
}