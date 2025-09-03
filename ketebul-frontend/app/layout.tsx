import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter, Josefin_Sans } from 'next/font/google';
import Layout from '../components/Layout'; // Import your custom Layout component
import { Suspense } from 'react'; // Import Suspense for robust hydration
import { Analytics } from '@vercel/analytics/react'; // Vercel Analytics
import { SpeedInsights } from '@vercel/speed-insights/next'; // Vercel Speed Insights

// Define metadata for SEO (best practice in App Router)
export const metadata: Metadata = {
  title: 'Ketebul Music | Preserving East African Sound',
  description: 'Ketebul Music is a non-profit organization dedicated to identifying, preserving, developing, and promoting the diverse musical traditions and heritage of East Africa.',
  keywords: ['Ketebul Music', 'East African music', 'Kenyan music', 'music preservation', 'African heritage', 'artists', 'music production'],
  openGraph: {
    title: 'Ketebul Music',
    description: 'Celebrating and preserving the rich musical heritage of East Africa.',
    url: 'https://ketebulmusic.org', // Replace with your actual domain
    siteName: 'Ketebul Music',
    images: [
      {
        url: 'https://ketebulmusic.org/og-image.jpg', // Placeholder, replace with your Open Graph image URL
        width: 1200,
        height: 630,
        alt: 'Ketebul Music',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ketebul Music',
    description: 'Discover the diverse musical traditions of East Africa.',
    images: ['https://ketebulmusic.org/twitter-image.jpg'], // Placeholder, replace with your Twitter image URL
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

// Initialize Inter font (for body text - statistically best for readability)
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

// Initialize Josefin Sans font (for headings and display text)
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
        {/* Tailwind CSS CDN script - CRITICAL FOR STYLING */}
        <script src="https://cdn.tailwindcss.com"></script>
        {/* Removed: AOS CSS and JS CDN links here as AOS is now dynamically imported as a module in Layout.tsx */}
      </head>
      {/* Apply font variables globally to the body. Inter is the base font, Josefin Sans is available as a variable */}
      <body className={`${inter.variable} ${josefinSans.variable} font-inter`}>
        {/* Wrap Layout component in Suspense for robust client-side rendering/hydration */}
        <Suspense>
          <Layout>{children}</Layout>
        </Suspense>
        {/* Vercel Analytics and Speed Insights components are added here to ensure they are present on every page */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
