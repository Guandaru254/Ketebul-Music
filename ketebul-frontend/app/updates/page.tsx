"use client";

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
// Correct import path for your logic-shifted api.ts
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
    transition: { type: "spring", stiffness: 150, damping: 12, delay: i * 0.1, duration: 0.8 },
  }),
  lift: {
    y: -5, scale: 1.01,
    boxShadow: `0 8px 16px rgba(0,0,0,0.3), 0 0 0 3px ${GOLDEN_YELLOW}`,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

const ptComponents = {
  block: {
    normal: ({ children }: any) => <p className="mb-2 last:mb-0">{children}</p>,
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc pl-5 mt-1">{children}</ul>,
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-bold text-white">{children}</strong>,
  },
};

function ImageLoader({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [loading, setLoading] = React.useState(true);
  const [imageSrc, setImageSrc] = React.useState(src);
  const fallbackSrc = 'https://placehold.co/600x400/374151/DAA520?text=Image+Missing';

  useEffect(() => {
    setImageSrc(src);
  }, [src]);

  return (
    <div className="relative w-full h-full">
      <Image
        src={imageSrc || fallbackSrc}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className={`${className || 'object-cover'} object-center transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={() => setLoading(false)}
        onError={() => setImageSrc(fallbackSrc)}
      />
      {loading && (
        <div className="absolute inset-0 bg-gray-700 animate-pulse rounded-t-xl md:rounded-l-xl md:rounded-tr-none flex items-center justify-center">
          <span className="text-gray-400 text-sm">Loading...</span>
        </div>
      )}
    </div>
  );
}

export default function UpdatesPage() {
  const [updates, setUpdates] = useState<any[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await client.fetch(`*[_type == "update"] | order(date desc)`);
        setUpdates(data);
      } catch (error) {
        console.error("Sanity Fetch Error:", error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchData();
  }, []);

  if (isFetching) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading Updates...</div>;

  return (
    <div className="flex flex-col items-center min-h-screen p-4 sm:p-8 bg-gradient-to-r from-gray-950 to-black font-inter text-gray-100 w-full">
      <motion.div
        className="w-full max-w-6xl mx-auto bg-gradient-to-br from-gray-900 to-gray-950 p-6 sm:p-10 rounded-xl shadow-2xl border border-gray-700"
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants}
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-12 tracking-tight" style={{ color: GOLDEN_YELLOW }}>
          Latest Updates
        </h1>

        <div className="space-y-10">
          {updates.length === 0 ? (
            <p className="text-center text-gray-500">No updates found in CMS. Go to /studio to add some!</p>
          ) : (
            updates.map((update, index) => {
              const d = new Date(update.date);
              const day = d.getDate().toString().padStart(2, '0');
              const month = d.toLocaleString('en-US', { month: 'short' }).toUpperCase();
              const year = d.getFullYear();

              return (
                <motion.div
                  key={update._id}
                  className="flex flex-col md:flex-row bg-gradient-to-br from-gray-800 to-gray-950 rounded-xl shadow-lg overflow-hidden border border-gray-700 transition-transform duration-300"
                  initial="hidden" whileInView="visible" whileHover="lift" variants={cardVariants} custom={index}
                >
                  <div className="w-full md:w-32 flex flex-row md:flex-col items-center justify-center p-4 bg-gray-900 border-b md:border-b-0 md:border-r border-gray-700 flex-shrink-0 md:h-[450px]">
                    <span className="text-4xl font-extrabold text-white">{day}</span>
                    <span className="text-xl uppercase text-white tracking-wider ml-2 md:ml-0 md:mt-1">{month}</span>
                    <span className="text-lg font-semibold text-white md:mt-1">{year}</span>
                  </div>

                  <div className="flex-grow flex flex-col md:flex-row">
                    <div className="md:w-1/2 flex-shrink-0 relative h-[350px] md:h-[450px]">
                      <ImageLoader
                        src={update.mainImage ? urlFor(update.mainImage).url() : ""}
                        alt={update.title}
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                    </div>

                    <div className="flex-grow p-6 flex flex-col justify-between md:w-1/2">
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-snug">{update.title}</h2>
                        <div className="text-gray-300 leading-relaxed mb-4">
                          <PortableText value={update.content} components={ptComponents} />
                        </div>
                        {update.venue && (
                          <p className="text-sm text-gray-400 font-medium">
                            <span style={{ color: GOLDEN_YELLOW }}>Venue:</span> {update.venue}
                          </p>
                        )}
                      </div>

                      {/* BUTTON IS NOW ALWAYS VISIBLE */}
                      <motion.button
                        className="mt-6 px-8 py-3 text-gray-900 font-bold rounded-lg shadow-md self-start"
                        style={{ backgroundColor: GOLDEN_YELLOW }}
                        whileHover={{ backgroundColor: HOVER_GOLDEN_YELLOW }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          const destination = update.buttonLink || `/updates/${update.slug?.current || ''}`;
                          if (destination !== '/updates/') {
                             window.open(destination, "_blank");
                          }
                        }}
                      >
                        {update.buttonText || "More Details"}
                      </motion.button>
                    </div>
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