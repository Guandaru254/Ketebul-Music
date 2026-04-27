import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Layout from '../components/Layout';
import { Suspense } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import TransitionProvider from '../components/TransitionProvider';
import PWAProvider from '../components/PWAProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
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
  publisher:  'Ketebul Music',
  alternates: { canonical: SITE_URL },
  
  // PWA & Mobile Optimization
  manifest: '/site.webmanifest',
  appleWebApp: {
    capable: true,
    title: SITE_NAME,
    statusBarStyle: 'black-translucent',
  },
  
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
      url: '/og-image.jpg', // Ensure this 1200x630px image is in /public
      width: 1200,
      height: 630,
      alt: 'Ketebul Music — Preserving East African Sound',
    }],
  },

  twitter: {
    card: 'summary_large_image',
    site: '@ketebulmusic',
    creator: '@ketebulmusic',
    title: TITLE,
    description: DESC,
    images: ['/og-image.jpg'],
  },

  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    shortcut: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#030712', // Dark theme for PWA UI
};

// ─── JSON-LD Schema ───────────────────────────────────────────────────────────
const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  alternateName: 'Ketebul',
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    '@id': `${SITE_URL}/#logo`,
    url: `${SITE_URL}/logo.png`,
    contentUrl: `${SITE_URL}/logo.png`,
    width: '512',
    height: '512',
    caption: SITE_NAME,
  },
  image: { '@id': `${SITE_URL}/#logo` },
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
      className={`${inter.variable} font-sans`}
      style={{ scrollBehavior: 'smooth' }}
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

      <body className="font-inter antialiased selection:bg-yellow-500 selection:text-black">
        <Suspense fallback={<div className="h-screen bg-[#030712]" />}>
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