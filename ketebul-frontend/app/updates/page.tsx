'use client';

export const dynamic = 'force-dynamic';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { client, urlFor } from '../../lib/api'; 
import { PortableText } from '@portabletext/react';

const GOLDEN_YELLOW = '#FFD700';
const POSTS_PER_PAGE = 6;

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

// Seamless SVG dynamic vector graphic to cleanly replace empty historical archives 
const COMPACT_SVG_FALLBACK = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"><rect width="100%" height="100%" fill="%23111827"/><circle cx="400" cy="300" r="60" fill="%231f2937"/><path d="M400 270v60M370 300h60" stroke="%234b5563" stroke-width="6" stroke-linecap="round"/><text x="50%" y="68%" dominant-baseline="middle" text-anchor="middle" fill="%236b7280" font-family="sans-serif" font-weight="bold" font-size="14" letter-spacing="2">ARCHIVE RECORD</text></svg>`;

function extractImageFromContent(contentArray: any[]): string | null {
  if (!Array.isArray(contentArray)) return null;
  
  for (const block of contentArray) {
    if (block?._type === 'image' && block?.asset) {
      try {
        const url = urlFor(block).width(800).url();
        if (url) return url;
      } catch (e) {}
    }
    
    if (Array.isArray(block?.children)) {
      for (const child of block.children) {
        if (typeof child?.text === 'string') {
          const match = child.text.match(/src=["']([^"']+)["']/i);
          if (match && match[1]) {
            return match[1].replace(/&amp;/g, '&');
          }
        }
      }
    }
  }
  return null;
}

/**
 * Safely cleans raw WordPress database dump string syntax leaks out of layout excerpts
 */
function cleanExcerptText(item: any): string {
  if (!item) return '';
  
  // If structured text is present, use it
  if (Array.isArray(item.content)) return '';

  const rawText = item.excerpt || '';
  if (typeof rawText === 'string' && (rawText.includes("', '") || rawText.startsWith("["))) {
    // Return a clean fallback notice instead of a giant array breakdown string
    return "Historical legacy archive log metadata recorded. Click details below to view.";
  }
  
  return rawText;
}

function PostImage({ update }: { update: any }) {
  const [src, setSrc] = useState<string>('');

  useEffect(() => {
    if (update?.mainImage?.asset) {
      try {
        const url = urlFor(update.mainImage).width(800).url();
        if (url) {
          setSrc(url);
          return;
        }
      } catch (err) {}
    }

    if (Array.isArray(update?.content)) {
      const inlineUrl = extractImageFromContent(update.content);
      if (inlineUrl) {
        setSrc(inlineUrl);
        return;
      }
    }

    setSrc(COMPACT_SVG_FALLBACK);
  }, [update]);

  if (!src) {
    return <div className="w-full h-full bg-gray-950 animate-pulse" />;
  }

  return (
    <div className="w-full h-full min-h-[22rem] md:h-[26rem] flex items-center justify-center bg-gray-900/40 overflow-hidden relative rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none">
      <img
        src={src}
        alt="Ketebul Music Article Media Update"
        className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
        loading="lazy"
      />
    </div>
  );
}

export default function UpdatesPage() {
  const [updates, setUpdates] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let isMounted = true;

    client.fetch(`*[_type == "update"] | order(date desc)`)
      .then((data: any[]) => {
        if (!isMounted) return;

        if (data && Array.isArray(data)) {
          const normalizedData = data.map(item => ({
            ...item,
            displayDate: item.date || item._createdAt?.split('T')[0] || '',
            richTextContent: Array.isArray(item.content) && item.content.length > 0 && item.content[0]?._type !== 'string' ? item.content : null
          }));
          setUpdates(normalizedData);
        }
      })
      .catch((err) => {
        console.error('Sanity fetch error:', err);
      })
      .finally(() => {
        if (isMounted) setLoadingData(false);
      });

    return () => { isMounted = false; };
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const filtered = updates.filter(u =>
    u && u.title && (!search || u.title.toLowerCase().includes(search.toLowerCase()))
  );

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const indexOfLastPost = currentPage * POSTS_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
  const currentPosts = filtered.slice(indexOfFirstPost, indexOfLastPost);

  if (loadingData) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-400 text-sm tracking-widest uppercase font-mono">Loading updates archive…</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen px-4 py-10 sm:px-8 bg-gradient-to-b from-gray-950 to-black text-gray-100 w-full">
      <motion.div className="w-full max-w-5xl mx-auto" initial="hidden" animate="visible" variants={sectionVariants}>
        
        {/* Header Summary */}
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-3" style={{ color: GOLDEN_YELLOW }}>
            Latest Updates
          </h1>
          <p className="text-gray-400 text-sm">
            Showing {filtered.length} records · Page {currentPage} of {totalPages || 1}
          </p>
        </div>

        {/* Action Filters */}
        <div className="mb-8 flex justify-center">
          <input
            type="text"
            placeholder="Search updates…"
            value={search}
            onChange={handleSearchChange}
            className="w-full max-w-md bg-gray-800 border border-gray-700 rounded-full px-5 py-2.5 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        {/* List Archive Feed */}
        <div className="space-y-8">
          {currentPosts.length === 0 ? (
            <p className="text-center text-gray-500 py-20">No matching updates found.</p>
          ) : (
            currentPosts.map((update, index) => {
              const d = parseLocalDate(update.displayDate);
              const day = d.getDate().toString().padStart(2, '0');
              const month = d.toLocaleString('en-US', { month: 'short' }).toUpperCase();
              const year = d.getFullYear();

              const isExternal = update.buttonLink && typeof update.buttonLink === 'string' && update.buttonLink.startsWith('http');
              const destination = isExternal 
                ? update.buttonLink 
                : update.slug?.current 
                  ? `/updates/${update.slug.current}` 
                  : '#'; 

              const structuralExcerpt = cleanExcerptText(update);

              return (
                <motion.div
                  key={update._id || index}
                  className="flex flex-col md:flex-row bg-gradient-to-br from-gray-800/40 to-gray-900/90 rounded-2xl shadow-lg overflow-hidden border border-gray-800/80 backdrop-blur-sm"
                  whileHover="lift"
                  variants={cardVariants}
                >
                  {/* Calendar Timestamp block */}
                  <div className="w-full md:w-24 flex flex-row md:flex-col items-center justify-center gap-1 px-5 py-4 md:py-0 bg-gray-900/90 border-b md:border-b-0 md:border-r border-gray-800/60 flex-shrink-0">
                    <span className="text-3xl font-extrabold text-white leading-none">{day}</span>
                    <span className="text-sm uppercase tracking-widest text-yellow-400 md:mt-1">{month}</span>
                    <span className="text-sm text-gray-400 md:mt-0.5">{year}</span>
                  </div>

                  {/* Dynamic Image Wrapper Container */}
                  <div className="w-full md:w-2/5 flex-shrink-0 relative h-72 md:h-auto min-h-[22rem]">
                    <PostImage update={update} />
                  </div>

                  {/* Core Card Context Meta */}
                  <div className="flex-grow p-6 flex flex-col justify-between">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 leading-snug">
                        {update.title}
                      </h2> 

                      {update.richTextContent ? (
                        <div className="text-gray-300 text-sm leading-relaxed line-clamp-4">
                          <PortableText value={update.richTextContent} components={ptComponents} />
                        </div>
                      ) : structuralExcerpt ? (
                        <p className="text-gray-300 text-sm leading-relaxed line-clamp-4">{structuralExcerpt}</p>
                      ) : (
                        <p className="text-gray-500 text-sm italic">Archive record entry parsed successfully.</p>
                      )}

                      {update.venue && (
                        <p className="mt-3 text-xs text-gray-400">
                          <span style={{ color: GOLDEN_YELLOW }}>Venue: </span>
                          {update.venue}
                        </p>
                      )}
                    </div>

                    {/* Footer Execution Action Link */}
                    <div className="mt-5">
                      <a
                        href={destination}
                        target={isExternal ? '_blank' : '_self'}
                        rel="noopener noreferrer"
                        className="inline-block px-6 py-2.5 text-sm text-gray-900 font-bold rounded-lg shadow transition-transform hover:scale-105 active:scale-95 text-center"
                        style={{ backgroundColor: GOLDEN_YELLOW }}
                      >
                        {update.buttonText && !update.buttonText.toLowerCase().includes('upload') 
                          ? update.buttonText 
                          : (update.slug?.current ? 'More Details' : 'Read Archive')}
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>

        {/* Simple Page Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-12">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-700 rounded-lg text-sm font-semibold text-gray-300 hover:border-yellow-400 hover:text-white transition-colors disabled:opacity-30 disabled:pointer-events-none"
            >
              ← Previous
            </button>
            <span className="text-sm text-gray-400 font-mono">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-700 rounded-lg text-sm font-semibold text-gray-300 hover:border-yellow-400 hover:text-white transition-colors disabled:opacity-30 disabled:pointer-events-none"
            >
              Next →
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}