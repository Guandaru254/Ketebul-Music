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

// Solid visual fallback matrix if an item truly has no image data anywhere
const FALLBACK = 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop';

function PostImage({ update }: { update: any }) {
  const [src, setSrc] = useState<string>(FALLBACK);

  useEffect(() => {
    // 1. Check for native Sanity Asset reference (New Posts)
    if (update?.mainImage?.asset) {
      try {
        const url = urlFor(update.mainImage).width(800).url();
        if (url) {
          setSrc(url);
          return;
        }
      } catch (err) {
        console.error("Sanity image builder error:", err);
      }
    }
    
    // 2. Extract migrated WordPress image URL from attributes (Old Posts)
    const wpUrl = update?.attributes?.wp_post_thumbnail;
    if (wpUrl && typeof wpUrl === 'string' && wpUrl.trim() !== '') {
      setSrc(wpUrl);
      return;
    }

    // 3. Alternate generic fallback checks for raw image strings if structured differently
    if (update?.imageUrl && typeof update.imageUrl === 'string') {
      setSrc(update.imageUrl);
      return;
    }
    if (update?.wpImageUrl && typeof update.wpImageUrl === 'string') {
      setSrc(update.wpImageUrl);
      return;
    }

    setSrc(FALLBACK);
  }, [update]);

  return (
    <div className="w-full h-full min-h-[22rem] md:h-[26rem] flex items-center justify-center bg-gray-900/40 overflow-hidden relative rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none">
      <Image
        src={src}
        alt={update?.title || 'Ketebul Music Update'}
        fill
        sizes="(max-width: 768px) 100vw, 40vw"
        className="object-cover object-center transition-transform duration-500 hover:scale-105"
        unoptimized
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

    // Pulling all updates cleanly
    client.fetch(`*[_type == "update"] | order(date desc)`)
      .then((data: any[]) => {
        if (!isMounted) return;

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
        console.error('Sanity raw fetch error:', err);
      })
      .finally(() => {
        if (isMounted) setLoadingData(false);
      });

    return () => { isMounted = false; };
  }, []);

  // Reset to page 1 whenever user searches
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const filtered = updates.filter(u =>
    u && u.title && (!search || u.title.toLowerCase().includes(search.toLowerCase()))
  );

  // Pagination Math calculations
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
        
        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-3" style={{ color: GOLDEN_YELLOW }}>
            Latest Updates
          </h1>
          <p className="text-gray-400 text-sm">
            Showing {filtered.length} records · Page {currentPage} of {totalPages || 1}
          </p>
        </div>

        {/* Search Input */}
        <div className="mb-8 flex justify-center">
          <input
            type="text"
            placeholder="Search updates…"
            value={search}
            onChange={handleSearchChange}
            className="w-full max-w-md bg-gray-800 border border-gray-700 rounded-full px-5 py-2.5 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        {/* List Grid */}
        <div className="space-y-8">
          {currentPosts.length === 0 ? (
            <p className="text-center text-gray-500 py-20">No matching updates found.</p>
          ) : (
            currentPosts.map((update, index) => {
              const d = parseLocalDate(update.displayDate);
              const day = d.getDate().toString().padStart(2, '0');
              const month = d.toLocaleString('en-US', { month: 'short' }).toUpperCase();
              const year = d.getFullYear();

              // Safe determination of action links
              const isExternal = update.buttonLink && typeof update.buttonLink === 'string' && update.buttonLink.startsWith('http');
              const destination = isExternal 
                ? update.buttonLink 
                : update.slug?.current 
                  ? `/updates/${update.slug.current}` 
                  : '#'; // Keep them on page cleanly if completely empty record

              return (
                <motion.div
                  key={update._id || index}
                  className="flex flex-col md:flex-row bg-gradient-to-br from-gray-800/40 to-gray-900/90 rounded-2xl shadow-lg overflow-hidden border border-gray-800/80 backdrop-blur-sm"
                  whileHover="lift"
                  variants={cardVariants}
                >
                  {/* Date Flag */}
                  <div className="w-full md:w-24 flex flex-row md:flex-col items-center justify-center gap-1 px-5 py-4 md:py-0 bg-gray-900/90 border-b md:border-b-0 md:border-r border-gray-800/60 flex-shrink-0">
                    <span className="text-3xl font-extrabold text-white leading-none">{day}</span>
                    <span className="text-sm uppercase tracking-widest text-yellow-400 md:mt-1">{month}</span>
                    <span className="text-sm text-gray-400 md:mt-0.5">{year}</span>
                  </div>

                  {/* Image Block wrapper */}
                  <div className="w-full md:w-2/5 flex-shrink-0 relative h-72 md:h-auto min-h-[22rem]">
                    <PostImage update={update} />
                  </div>

                  {/* Content Elements */}
                  <div className="flex-grow p-6 flex flex-col justify-between">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 leading-snug">
                        {update.title}
                      </h2>

                      {update.richTextContent ? (
                        <div className="text-gray-300 text-sm leading-relaxed line-clamp-4">
                          <PortableText value={update.richTextContent} components={ptComponents} />
                        </div>
                      ) : update.excerpt ? (
                        <p className="text-gray-300 text-sm leading-relaxed line-clamp-4">{update.excerpt}</p>
                      ) : (
                        <p className="text-gray-500 text-sm italic">Archive log details loaded.</p>
                      )}

                      {update.venue && (
                        <p className="mt-3 text-xs text-gray-400">
                          <span style={{ color: GOLDEN_YELLOW }}>Venue: </span>
                          {update.venue}
                        </p>
                      )}
                    </div>

                    {/* Always Render Action Button to maintain alignment UI integrity */}
                    <div className="mt-5">
                      <a
                        href={destination}
                        target={isExternal ? '_blank' : '_self'}
                        rel="noopener noreferrer"
                        className="inline-block px-6 py-2.5 text-sm text-gray-900 font-bold rounded-lg shadow transition-transform hover:scale-105 active:scale-95 text-center"
                        style={{ backgroundColor: GOLDEN_YELLOW }}
                      >
                        {update.buttonText || (update.slug?.current ? 'More Details' : 'Read Archive')}
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>

        {/* Pagination Action Bar */}
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