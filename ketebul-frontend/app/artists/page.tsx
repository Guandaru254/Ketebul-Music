'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import './artists.css';

const artists = [
  {
    name: 'Bado',
    image: '/artists/bado.jpg',
    bio: 'Hailing from the coastal town of Watamu in Malindi, Bado was born Mohamed Said Ngana. Although he started singing publicly...',
    slug: 'bado',
  },
  {
    name: 'Ontiri Bikundo',
    image: '/artists/ontiri.jpg',
    bio: 'Ontiri Bikundo was born in 1976 in Nyaribari Chache constituency of Kisii District. His parents passed away before he was...',
    slug: 'ontiri-bikundo',
  },
  {
    name: 'Olith Ratego',
    image: '/artists/olith.jpg',
    bio: 'Olith Ratego was born Musa Odhiambo Omondi, in Asere Ugenya, Siaya District. The middle child in a family of three,...',
    slug: 'olith-ratego',
  },
  {
    name: 'Ogoya Nengo',
    image: '/artists/ogoya.jpg',
    bio: 'Ogoya Nengo was born Anastasia Oluoch in the late 1930s at Magoya, near the shores of Lake Victoria...',
    slug: 'ogoya-nengo',
  },
  {
    name: 'Gargar',
    image: '/artists/gargar.jpg',
    bio: 'Gargar is a group of Kenyan women of Somali origin from Garissa, North Eastern Kenya...',
    slug: 'gargar',
  },
  {
    name: 'Winyo',
    image: '/artists/winyo.jpg',
    bio: 'Born Shiphton Onyango, Winyo adopted his artistic name ‘Winyo’, which is a Luo word (a tribe from the Lake Victoria region)...',
    slug: 'winyo',
  },
  {
    name: 'Makadem',
    image: '/artists/makadem.jpg',
    bio: 'Makadem, also known as the Ohanglaman, is a talented musician and vibrant performing artiste from Kenya...',
    slug: 'makadem',
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function ArtistsPage() {
  return (
    <main className="artists-page">
      <motion.h1
        className="page-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        Our Artists
      </motion.h1>

      <div className="artist-grid">
        {artists.map((artist, index) => (
          <motion.div
            key={index}
            className="artist-card"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardVariants}
            transition={{
              delay: index * 0.2,
              duration: 0.8,
              ease: 'easeOut',
            }}
          >
            <Image
              src={artist.image}
              alt={artist.name}
              width={400}
              height={400}
              className="artist-img"
            />
            <h2>{artist.name}</h2>
            <p>{artist.bio.slice(0, 120)}...</p>
            <Link href={`/artists/${artist.slug}`} className="read-more">
              Read more →
            </Link>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
