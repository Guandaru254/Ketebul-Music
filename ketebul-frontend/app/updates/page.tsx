'use client';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
// Consolidated: Fetching data via the central abstraction layer
import { fetchUpdates, urlFor } from '@/lib/api';
import { PortableText } from '@portabletext/react';

const GOLDEN_YELLOW = '#FFD700';

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  lift: {
    y: -5,
    scale: 1.01,
    boxShadow: `0 8px 16px rgba(0,0,0,0.3), 0 0 0 3px ${GOLDEN_YELLOW}`,
    transition: { type: 'spring', stiffness: 300, damping: 20 },
  },
};

const ptComponents = {
  block: {
    normal: ({ children }: any) => <p className="mb-3 last:mb-0 text-gray-300 text-sm leading-relaxed">{children}</p>,
    h1: ({ children }: any) => <h1 className="text-2xl font-bold my-4 text-white">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-xl font-bold my-3 text-white">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-lg font-bold my-2 text-white">{children}</h3>,
    blockquote: ({ children }: any) => <blockquote className="border-l-4 border-yellow-500 pl-4 my-4 italic text-gray-400">{children}</blockquote>,
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc pl-5 mb-4 text-gray-300 space-y-1 text-sm">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal pl-5 mb-4 text-gray-300 space-y-1 text-sm">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => <li>{children}</li>,
    number: ({ children }: any) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-bold text-white">{children}</strong>,
    em: ({ children }: any) => <em className="italic">{children}</em>,
    link: ({ value, children }: any) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
      return (
        <a href={value?.href} target={target} rel={target ? 'noopener noreferrer' : undefined} className="text-yellow-400 underline hover:text-yellow-300">
          {children}
        </a>
      );
    },
  },
};

function parseLocalDate(dateStr: string): Date {
  if (!dateStr || typeof dateStr !== 'string' || !dateStr.includes('-')) return new Date();
  try {
    const [y, m, d] = dateStr.split('-').map(Number);
    return new Date(y, m - 1, d, 12, 0, 0);
  } catch {
    return new Date();
  }
}

const FALLBACK = 'https://placehold.co/600x400/374151/DAA520?text=Ketebul+Music';

function PostImage({ update }: { update: any }) {
  const [src, setSrc] = useState<string>(() => {
    if (update?.mainImage && update.mainImage.asset) {
      try {
        const url = urlFor(update.mainImage).width(800).url();
        if (url) return url;
      } catch (err) {
        console.error("Sanity image builder error:", err);
      }
    }
    return FALLBACK;
  });

  return (
    <div className="w-full h-full min-h-[22rem] md:h-[26rem] flex items-center justify-center bg-gray-950/40 p-2 overflow-hidden relative rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none">
      <Image
        src={src}
        alt={update?.title || 'Ketebul Music Update'}
        fill
        sizes="(max-width: 768px) 100vw, 40vw"
        className="object-contain object-center p-2"
        unoptimized
      />
    </div>
  );
}

export default function UpdatesPage() {
  const [updates, setUpdates] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    let isMounted = true;

    // Routed through central API configuration method to maintain single-source typing config
    fetchUpdates()
      .then((data: any[]) => {
        if (!isMounted) return;

        console.log("📡 FETCHED VIA API LAYER:", data);

        if (data && Array.isArray(data)) {
          const normalizedData = data.map(item => ({
            ...item,
            displayDate: item.date || item._createdAt?.split('T')[0] || '',
            richTextContent: Array.isArray(item.content) ? item.content : null
          }));
          setUpdates(normalizedData);
        }
      })
      .catch((err) => {
        console.error('Sanity schema pipeline error on updates interface:', err);
      })
      .finally(() => {
        if (isMounted) {
          setLoadingData(false);
        }
      });

    return () => { isMounted = false; };
  }, []);

  const filtered = updates.filter(u =>
    u && u.title && (!search || u.title.toLowerCase().includes(search.toLowerCase()))
  );

  if (loadingData) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-400 text-sm tracking-widest uppercase font-mono">Loading updates…</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen px-4 py-10 sm:px-8 bg-gradient-to-b from-gray-950 to-black text-gray-100 w-full">
      <motion.div className="w-full max-w-5xl mx-auto" initial="hidden" animate="visible" variants={sectionVariants}>
        
        {/* Header Block */}
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-3" style={{ color: GOLDEN_YELLOW }}>
            Latest Updates
          </h1>
          <p className="text-gray-400 text-sm">
            Showing {filtered.length} live records · news &amp; announcements
          </p>
        </div>

        {/* Search Field */}
        <div className="mb-8 flex justify-center">
          <input
            type="text"
            placeholder="Search updates…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full max-w-md bg-gray-800 border border-gray-700 rounded-full px-5 py-2.5 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        {/* Dynamic Card Display */}
        <div className="space-y-8">
          {filtered.length === 0 ? (
            <p className="text-center text-gray-500 py-20">No matching updates found.</p>
          ) : (
            filtered.map((update, index) => {
              const d = parseLocalDate(update.displayDate);
              const day = d.getDate().toString().padStart(2, '0');
              const month = d.toLocaleString('en-US', { month: 'short' }).toUpperCase();
              const year = d.getFullYear();

              const isExternal = update.buttonLink && typeof update.buttonLink === 'string' && update.buttonLink.startsWith('http');
              const destination = isExternal ? update.buttonLink : update.slug?.current ? `/updates/${update.slug.current}` : null;

              return (
                <motion.div
                  key={update._id || index}
                  className="flex flex-col md:flex-row bg-gradient-to-br from-gray-800/60 to-gray-900 rounded-2xl shadow-lg overflow-hidden border border-gray-700/50 backdrop-blur-sm"
                  whileHover="lift"
                  variants={cardVariants}
                >
                  {/* Date Sidebar */}
                  <div className="w-full md:w-24 flex flex-row md:flex-col items-center justify-center gap-1 px-5 py-4 md:py-0 bg-gray-900/60 border-b md:border-b-0 md:border-r border-gray-700/50 flex-shrink-0">
                    <span className="text-3xl font-extrabold text-white leading-none">{day}</span>
                    <span className="text-sm uppercase tracking-widest text-yellow-400 md:mt-1">{month}</span>
                    <span className="text-sm text-gray-400 md:mt-0.5">{year}</span>
                  </div>

                  {/* Image Block */}
                  <div className="w-full md:w-2/5 flex-shrink-0 relative h-72 md:h-auto min-h-[22rem]">
                    <PostImage update={update} />
                  </div>

                  {/* Description Box Content */}
                  <div className="flex-grow p-6 flex flex-col justify-between">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 leading-snug">
                        {update.title}
                      </h2>

                      {update.richTextContent ? (
                        <div className="text-gray-300 text-sm leading-relaxed line-clamp-4">
                          <PortableText value={update.richTextContent} components={ptComponents} />
                        </div>
                      ) : (
                        <p className="text-gray-500 text-sm italic">No description text written for this update.</p>
                      )}

                      {update.venue && (
                        <p className="mt-3 text-xs text-gray-400">
                          <span style={{ color: GOLDEN_YELLOW }}>Venue: </span>
                          {update.venue}
                        </p>
                      )}
                    </div>

                    {/* Button Links CTA */}
                    {destination && (
                      <a
                        href={destination}
                        target={isExternal ? '_blank' : '_self'}
                        rel="noopener noreferrer"
                        className="mt-5 inline-block px-6 py-2.5 text-sm text-gray-900 font-bold rounded-lg shadow self-start transition-transform hover:scale-105 active:scale-95 text-center"
                        style={{ backgroundColor: GOLDEN_YELLOW }}
                      >
                        {update.buttonText || 'More Details'}
                      </a>
                    )}
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </motion.div>
    </div>
  );
}