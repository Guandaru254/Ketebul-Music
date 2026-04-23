'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { client, urlFor } from '@/lib/api';
import { PortableText } from '@portabletext/react';

const GOLDEN_YELLOW = '#FFD700';
const HOVER_GOLDEN_YELLOW = '#E5BE00';

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { type: 'spring', stiffness: 150, damping: 12, delay: i * 0.07, duration: 0.8 },
  }),
  lift: {
    y: -5, scale: 1.01,
    boxShadow: `0 8px 16px rgba(0,0,0,0.3), 0 0 0 3px ${GOLDEN_YELLOW}`,
    transition: { type: 'spring', stiffness: 300, damping: 20 },
  },
};

const ptComponents = {
  block: {
    normal: ({ children }: any) => <p className="mb-2 last:mb-0 text-gray-300 leading-relaxed">{children}</p>,
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc pl-5 mt-1 text-gray-300">{children}</ul>,
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-bold text-white">{children}</strong>,
  },
};

// ─── Safe date parser ─────────────────────────────────────────────────────────
// Parses "YYYY-MM-DD" without timezone shift by treating it as local noon
function parseLocalDate(dateStr: string): Date {
  if (!dateStr) return new Date();
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d, 12, 0, 0);
}

// ─── Image component — never passes empty src to next/image ──────────────────
const FALLBACK = 'https://placehold.co/600x400/374151/DAA520?text=Ketebul+Music';

function PostImage({ update }: { update: any }) {
  // Priority: Sanity mainImage → buttonLink (old WP url stored during migration) → fallback
  const [src, setSrc] = useState<string>(() => {
    if (update.mainImage) {
      try { return urlFor(update.mainImage).width(800).url(); } catch { /* fall through */ }
    }
    if (update.buttonLink && update.buttonLink.startsWith('http')) {
      return update.buttonLink;
    }
    return FALLBACK;
  });
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full h-full">
      <Image
        src={src}
        alt={update.title || 'Ketebul Music update'}
        fill
        sizes="(max-width: 768px) 100vw, 40vw"
        className={`object-cover object-center transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setLoaded(true)}
        onError={() => { setSrc(FALLBACK); setLoaded(true); }}
        unoptimized={!update.mainImage} // skip Next optimizer for external WP urls
      />
      {!loaded && (
        <div className="absolute inset-0 bg-gray-700 animate-pulse flex items-center justify-center">
          <span className="text-gray-500 text-sm">Loading…</span>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent pointer-events-none" />
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function UpdatesPage() {
  const [updates, setUpdates] = useState<any[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    client
      .fetch(`*[_type == "update" && published != false] | order(date desc)`)
      .then((data: any[]) => setUpdates(data))
      .catch((err: Error) => console.error('Sanity fetch error:', err))
      .finally(() => setIsFetching(false));
  }, []);

  const filtered = updates.filter(u =>
    !search || u.title?.toLowerCase().includes(search.toLowerCase())
  );

  if (isFetching) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-400 text-sm tracking-widest uppercase">Loading updates…</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen px-4 py-10 sm:px-8 bg-gradient-to-b from-gray-950 to-black font-inter text-gray-100 w-full">
      <motion.div
        className="w-full max-w-5xl mx-auto"
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={sectionVariants}
      >
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-3" style={{ color: GOLDEN_YELLOW }}>
            Latest Updates
          </h1>
          <p className="text-gray-400 text-sm">
            {updates.length} posts · news, events &amp; field dispatches from Ketebul Music
          </p>
        </div>

        {/* Search */}
        <div className="mb-8 flex justify-center">
          <input
            type="text"
            placeholder="Search updates…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full max-w-md bg-gray-800 border border-gray-700 rounded-full px-5 py-2.5 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        {/* Cards */}
        <div className="space-y-8">
          {filtered.length === 0 ? (
            <p className="text-center text-gray-500 py-20">
              {search ? `No results for "${search}"` : 'No updates found. Add some in /studio'}
            </p>
          ) : (
            filtered.map((update, index) => {
              const d = parseLocalDate(update.date);
              const day   = d.getDate().toString().padStart(2, '0');
              const month = d.toLocaleString('en-US', { month: 'short' }).toUpperCase();
              const year  = d.getFullYear();

              // Determine button destination
              const hasRealLink = update.buttonLink &&
                update.buttonLink.startsWith('http') &&
                !update.buttonLink.includes('placehold.co') &&
                !update.mainImage; // if image already uploaded, clear the link
              const destination = hasRealLink
                ? null  // don't use old WP image URL as button destination
                : update.slug?.current
                  ? `/updates/${update.slug.current}`
                  : null;

              return (
                <motion.div
                  key={update._id}
                  className="flex flex-col md:flex-row bg-gradient-to-br from-gray-800/60 to-gray-900 rounded-2xl shadow-lg overflow-hidden border border-gray-700/50 backdrop-blur-sm"
                  initial="hidden"
                  whileInView="visible"
                  whileHover="lift"
                  viewport={{ once: true, amount: 0.1 }}
                  variants={cardVariants}
                  custom={index}
                >
                  {/* Date sidebar */}
                  <div className="w-full md:w-24 flex flex-row md:flex-col items-center justify-center gap-1 px-5 py-4 md:py-0 bg-gray-900/60 border-b md:border-b-0 md:border-r border-gray-700/50 flex-shrink-0">
                    <span className="text-3xl font-extrabold text-white leading-none">{day}</span>
                    <span className="text-sm uppercase tracking-widest text-yellow-400 md:mt-1">{month}</span>
                    <span className="text-sm text-gray-400 md:mt-0.5">{year}</span>
                  </div>

                  {/* Image */}
                  <div className="md:w-2/5 flex-shrink-0 relative h-56 md:h-auto min-h-[14rem]">
                    <PostImage update={update} />
                  </div>

                  {/* Content */}
                  <div className="flex-grow p-6 flex flex-col justify-between">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 leading-snug">
                        {update.title}
                      </h2>

                      {update.content && Array.isArray(update.content) && update.content.length > 0 ? (
                        <div className="text-gray-300 text-sm leading-relaxed line-clamp-4">
                          <PortableText value={update.content} components={ptComponents} />
                        </div>
                      ) : (
                        <p className="text-gray-500 text-sm italic">No content yet — edit in Studio to add.</p>
                      )}

                      {update.venue && (
                        <p className="mt-3 text-xs text-gray-400">
                          <span style={{ color: GOLDEN_YELLOW }}>Venue: </span>{update.venue}
                        </p>
                      )}
                    </div>

                    {destination && (
                      <motion.a
                        href={destination}
                        className="mt-5 inline-block px-6 py-2.5 text-sm text-gray-900 font-bold rounded-lg shadow self-start"
                        style={{ backgroundColor: GOLDEN_YELLOW }}
                        whileHover={{ backgroundColor: HOVER_GOLDEN_YELLOW, scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        {update.buttonText && !update.buttonText.includes('Original Image')
                          ? update.buttonText
                          : 'More Details'}
                      </motion.a>
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