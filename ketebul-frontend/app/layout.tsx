import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter, Josefin_Sans } from 'next/font/google';
import Layout from '../components/Layout';
import { Suspense } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import TransitionProvider from '../components/TransitionProvider';

export const metadata: Metadata = {
  title: 'Ketebul Music | Preserving East African Sound',
  description: 'Ketebul Music is a non-profit organization dedicated to identifying, preserving, developing, and promoting the diverse musical traditions and heritage of East Africa.',
  keywords: ['Ketebul Music', 'East African music', 'Kenyan music', 'music preservation', 'African heritage', 'artists', 'music production'],
  openGraph: {
    title: 'Ketebul Music',
    description: 'Celebrating and preserving the rich musical heritage of East Africa.',
    url: 'https://ketebulmusic.org',
    siteName: 'Ketebul Music',
    images: [{ url: 'https://ketebulmusic.org/og-image.jpg', width: 1200, height: 630, alt: 'Ketebul Music' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ketebul Music',
    description: 'Discover the diverse musical traditions of East Africa.',
    images: ['https://ketebulmusic.org/twitter-image.jpg'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

const josefinSans = Josefin_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-josefin-sans',
  weight: ['300', '400', '500', '600', '700'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Tailwind CSS CDN - Required for styling */}
        <script src="https://cdn.tailwindcss.com"></script>
        {/* ✅ Prevent white flash between page loads */}
        <style>{`
          html, body {
            background-color: #030712;
            margin: 0;
            padding: 0;
          }
        `}</style>
      </head>
      <body className={`${inter.variable} ${josefinSans.variable} font-inter`}>
        <Suspense>
          <Layout>
            <TransitionProvider>{children}</TransitionProvider>
          </Layout>
        </Suspense>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}