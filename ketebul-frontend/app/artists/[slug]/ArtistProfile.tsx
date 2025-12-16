'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ArtistProfile({ artist }: { artist: any }) {
  const [loading, setLoading] = useState(true);

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 px-6 py-16 font-inter">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-full h-[450px] rounded-xl overflow-hidden shadow-2xl"
        >
          <Image
            src={artist.image}
            alt={artist.name}
            fill
            className={`object-cover transition-opacity duration-500 ${
              loading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={() => setLoading(false)}
          />

          {loading && (
            <div className="absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center">
              <p className="text-gray-400">Loading Image...</p>
            </div>
          )}
        </motion.div>

        {/* TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold font-josefin-sans mb-6 text-white">
            {artist.name}
          </h1>

          <p className="text-gray-300 leading-relaxed text-lg whitespace-pre-line">
            {artist.bio}
          </p>

          <a
            href="/artists"
            className="inline-block mt-10 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-8 rounded-full transition shadow-xl"
          >
            Back to Artists
          </a>
        </motion.div>

      </div>
    </main>
  );
}
