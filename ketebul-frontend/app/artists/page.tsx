'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, Variants, Transition } from 'framer-motion';
import { useState } from 'react';

// ------------------------------------------------------------
// GLOBAL CONSTANTS
// ------------------------------------------------------------
const PRIMARY_YELLOW = 'text-yellow-500';
const PRIMARY_YELLOW_HOVER = 'hover:text-yellow-600';

// ------------------------------------------------------------
// ARTISTS DATA (CLEANED + FIXED SLUGS)
// ------------------------------------------------------------
const artists = [
  {
    name: 'Winyo',
    image: '/artists/winyo.jpg',
    bio: 'Born Shiphton Onyango, Winyo adopted his artistic name...',
    slug: 'winyo',
  },
  {
    name: 'Ogoya Nengo',
    image: '/artists/ogoya.jpg',
    bio: 'Ogoya Nengo was born Anastasia Oluoch...',
    slug: 'ogoya-nengo',
  },
  {
    name: 'Makadem',
    image: '/artists/makadem.jpg',
    bio: 'Makadem, also known as the Ohanglaman...',
    slug: 'makadem',
  },
  {
    name: 'Bado',
    image: '/artists/bado.jpg',
    bio: 'Born Mohamed Said Ngana, Bado is from coastal Kenya...',
    slug: 'bado',
  },
  {
    name: 'Ontiri Bikundo',
    image: '/artists/ontiri.jpg',
    bio: 'Ontiri Bikundo was born in Kisii...',
    slug: 'ontiri-bikundo',
  },
  {
    name: 'Olith Ratego',
    image: '/artists/olith.jpg',
    bio: 'Olith Ratego (Musa Odhiambo Omondi)...',
    slug: 'olith-ratego',
  },
  {
    name: 'Gargar',
    image: '/artists/gargar.jpg',
    bio: 'Gargar is a group of Kenyan women from Garissa...',
    slug: 'gargar',
  },
  {
    name: 'Anyango Nyar Siaya',
    image: '/artists/nyar.jpg',
    bio: 'Anyango is the world’s first female Nyatiti player...',
    slug: 'anyango-nyar-siaya',
  }
];

// ------------------------------------------------------------
// ANIMATION VARIANTS (IMPROVED + CLEAN)
// ------------------------------------------------------------
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.98 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 15,
      delay: i * 0.08,
      duration: 0.6
    } as Transition,
  }),
};

const hoverVariants: Variants = {
  lift: {
    y: -6,
    scale: 1.03,
    boxShadow: `0 10px 20px rgba(0, 0, 0, 0.35), 0 0 0 2px rgba(245, 158, 11, 0.5)`,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 22,
    } as Transition,
  },
};

// ------------------------------------------------------------
// MAIN ARTISTS PAGE
// ------------------------------------------------------------
export default function ArtistsPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 py-16 px-4 sm:px-6 lg:px-8 font-inter">
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">

        {artists.map((artist, index) => (
          <motion.div
            key={artist.slug}
            className="bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden shadow-2xl border border-gray-800 hover:border-yellow-500 transition-all p-6 flex flex-col group"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            whileHover="lift"
            viewport={{ once: true, amount: 0.2 }}
            custom={index}
          >

            {/* IMAGE */}
            <div className="relative w-full h-72 overflow-hidden rounded-xl">
              <ImageLoader src={artist.image} alt={artist.name} />
            </div>

            {/* TEXT CONTENT */}
            <div className="mt-6 flex flex-col flex-grow">
              <h2 className="text-2xl font-bold font-josefin-sans text-white mb-2">
                {artist.name}
              </h2>

              <p className="text-gray-300 text-sm leading-relaxed line-clamp-4 flex-grow">
                {artist.bio}
              </p>

              {/* EXPLORE LINK */}
              <Link
                href={`/artists/${artist.slug}`}
                className={`${PRIMARY_YELLOW} ${PRIMARY_YELLOW_HOVER} mt-5 inline-flex items-center font-semibold`}
              >
                Explore Profile
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

          </motion.div>
        ))}

      </div>
    </main>
  );
}

// ------------------------------------------------------------
// IMAGE LOADER (IMPROVED)
// ------------------------------------------------------------
interface ImageLoaderProps {
  src: string;
  alt: string;
}

function ImageLoader({ src, alt }: ImageLoaderProps) {
  const [loading, setLoading] = useState(true);
  const fallback = "https://placehold.co/400x400/1f1f1f/999?text=No+Image";

  return (
    <div className="relative w-full h-full">
      
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className={`object-cover rounded-xl transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={() => setLoading(false)}
        onError={(e) => {
          e.currentTarget.src = fallback;
          console.error(`Failed to load: ${src}`);
        }}
      />

      {loading && (
        <div className="absolute inset-0 bg-gray-800 animate-pulse rounded-xl flex items-center justify-center">
          <span className="text-gray-500 text-sm">Loading...</span>
        </div>
      )}
    </div>
  );
}
