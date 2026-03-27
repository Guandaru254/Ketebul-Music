'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, Variants, Transition } from 'framer-motion';
import { useState } from 'react';

const artists = [
  {
    name: 'Winyo',
    image: '/artists/winyo.jpg',
    bio: 'Born Shiphton Onyango, Winyo adopted his artistic name from his grandfather. His music is a blend of traditional Luo melodies with modern jazz and soul.',
    slug: 'winyo',
  },
  {
    name: 'Ogoya Nengo',
    image: '/artists/ogoya.jpg',
    bio: 'Ogoya Nengo was born Anastasia Oluoch in the 1930s — a legendary folk singer from the shores of Lake Victoria whose voice carried the spirit of a generation.',
    slug: 'ogoya-nengo',
  },
  {
    name: 'Makadem',
    image: '/artists/makadem.jpg',
    bio: 'Makadem, also known as the Ohanglaman, is a powerhouse of African rhythm and a master of the Nyatiti, blending tradition with electrifying modern performance.',
    slug: 'makadem',
  },
  {
    name: 'Bado',
    image: '/artists/bado.jpg',
    bio: 'Born Mohamed Said Ngana, Bado is a multi-instrumentalist from coastal Kenya whose music weaves together Swahili poetry, taarab, and contemporary sounds.',
    slug: 'bado',
  },
  {
    name: 'Ontiri Bikundo',
    image: '/artists/ontiri.jpg',
    bio: 'Ontiri Bikundo was born in Kisii and is a master of the Obokano, a large bass lyre central to Gusii cultural expression and storytelling.',
    slug: 'ontiri-bikundo',
  },
  {
    name: 'Olith Ratego',
    image: '/artists/olith.jpg',
    bio: 'Olith Ratego (Musa Odhiambo Omondi) is a singer and songwriter who specializes in "dodo" rhythms, giving a fresh voice to traditional Luo musical forms.',
    slug: 'olith-ratego',
  },
  {
    name: 'Gargar',
    image: '/artists/gargar.jpg',
    bio: 'Gargar is a group of Kenyan women of Somali origin from Garissa, preserving ancient songs of celebration, lament, and identity through their powerful voices.',
    slug: 'gargar',
  },
  {
    name: 'Anyango Nyar Siaya',
    image: '/artists/nyar.jpg',
    bio: "Anyango is the world's first female Nyatiti player, breaking cultural boundaries to master this sacred eight-string lyre of the Luo people.",
    slug: 'anyango-nyar-siaya',
  },
];

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
      duration: 0.6,
    } as Transition,
  }),
};

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
            whileHover={{ y: -6, scale: 1.03, transition: { type: 'spring', stiffness: 300, damping: 22 } }}
            viewport={{ once: true, amount: 0.2 }}
            custom={index}
          >
            {/* IMAGE — clicking takes you to the profile */}
            <Link href={`/artists/${artist.slug}`} className="block">
              <div className="relative w-full h-72 overflow-hidden rounded-xl cursor-pointer">
                <ImageLoader
                  src={artist.image}
                  alt={artist.name}
                  priority={index < 3}
                />
              </div>
            </Link>

            {/* TEXT */}
            <div className="mt-6 flex flex-col flex-grow">
              <h2 className="text-2xl font-bold font-josefin-sans text-white mb-2">
                {artist.name}
              </h2>

              <p className="text-gray-300 text-sm leading-relaxed line-clamp-2 flex-grow">
                {artist.bio}
              </p>

              {/* ✅ Updated link text */}
              <Link
                href={`/artists/${artist.slug}`}
                className="text-yellow-500 hover:text-yellow-400 mt-5 inline-flex items-center font-semibold transition-colors"
              >
                View Full Profile
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

interface ImageLoaderProps {
  src: string;
  alt: string;
  priority?: boolean;
}

function ImageLoader({ src, alt, priority = false }: ImageLoaderProps) {
  const [loading, setLoading] = useState(true);
  const fallback = 'https://placehold.co/400x400/1f1f1f/999?text=No+Image';

  return (
    <div className="relative w-full h-full">
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className={`object-cover rounded-xl transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={() => setLoading(false)}
        onError={(e) => {
          e.currentTarget.src = fallback;
          setLoading(false);
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