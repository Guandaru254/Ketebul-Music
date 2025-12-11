'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, Variants, Transition } from 'framer-motion';

// --- Global Theme & Color Constants ---
const GOLDEN_YELLOW = '#FFD700'; // Pure Golden Yellow (Gold) - used for direct color application
const PRIMARY_YELLOW = 'yellow-500'; // Tailwind CSS class for #F59E0B
const HOVER_YELLOW = 'yellow-600'; // Tailwind CSS class for a slightly darker yellow on hover

// ImageLoader component for handling image loading states and fallbacks
interface ImageLoaderProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  objectFit?: 'cover' | 'contain';
}

function ImageLoader({
  src,
  alt,
  width,
  height,
  className,
  objectFit = 'cover',
}: ImageLoaderProps) {
  const [loading, setLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState(src);

  // Fallback image source, providing clear feedback if the primary image fails
  const fallbackSrc =
    'https://placehold.co/600x400/374151/DAA520?text=Image+Missing';

  useEffect(() => {
    setImageSrc(src);
    setLoading(true);
  }, [src]);

  const handleError = () => {
    setLoading(false);
    setImageSrc(fallbackSrc);
    console.error(`Failed to load image: ${src}. Displaying fallback.`);
  };

  const handleLoad = () => {
    setLoading(false);
  };

  const effectiveClassName = `
    ${objectFit === 'cover' ? 'object-cover' : 'object-contain'} object-center
    ${className || ''}
    transition-opacity duration-500 ease-in-out
    ${loading ? 'opacity-80' : 'opacity-100'}
  `;

  const imageElement =
    width && height ? (
      <Image
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className={effectiveClassName}
        onLoad={handleLoad}
        onError={handleError}
        priority={false}
      />
    ) : (
      <Image
        src={imageSrc}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className={effectiveClassName}
        onLoad={handleLoad}
        onError={handleError}
        priority={false}
      />
    );

  return (
    <div className="relative w-full h-full">
      {imageElement}
      {loading && (
        <div className="absolute inset-0 bg-gray-700 animate-pulse rounded-xl flex items-center justify-center">
          <span className="text-gray-400 text-sm">Loading Image...</span>
        </div>
      )}
    </div>
  );
}

// Refactored data for Hero section's dynamic text and backgrounds
const heroContent = [
  {
    text: 'Celebrating East African Sound',
    keywords: ['East', 'African'],
    img: '/benga.jpg',
    position: 'bg-left',
    mobilePosition: 'left 25%', // left for “Shades of Benga”
  },
  {
    text: 'Preserving Musical Heritage',
    keywords: ['Musical', 'Heritage'],
    img: '/sauti.png',
    position: 'bg-center',
    mobilePosition: 'center',
  },
  {
    text: 'Empowering New Voices',
    keywords: ['New', 'Voices'],
    img: '/wells.png',
    position: 'bg-bottom',
    mobilePosition: '50% 100%', // bottom for “Singing Wells”
  },
];

// Helper component for letter-by-letter animation with keyword highlighting
interface AnimatedPhraseProps {
  text: string;
  keywords: string[];
}

const AnimatedPhrase: React.FC<AnimatedPhraseProps> = ({ text, keywords }) => {
  const words = text.split(' ');

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.5,
      },
    },
  };

  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.h1
      className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight font-josefin-sans drop-shadow-lg"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block">
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={charIndex}
              variants={letterVariants}
              className={`inline-block ${
                keywords.includes(word) ? `text-${PRIMARY_YELLOW}` : 'text-white'
              }`}
            >
              {char}
            </motion.span>
          ))}
          {wordIndex < words.length - 1 && '\u00A0'}
        </span>
      ))}
    </motion.h1>
  );
};

// Refactored data for featured projects
const allProjects = [
  {
    slug: 'sauti',
    title: 'SAUTI: Gifted Different Unsilenced',
    img: '/projects/sauti.png',
    type: 'Documentary',
  },
  {
    slug: 'shades-of-benga',
    title: 'Shades of Benga',
    img: '/projects/benga.jpg',
    type: 'Documentary',
  },
  {
    slug: 'reconciliation',
    title: 'Weapon of Mass Reconciliation',
    img: '/projects/reconciliation.jpg',
    type: 'Other Project',
  },
];

const sortedProjects = [...allProjects].sort((a, b) => {
  const order = ['Documentary', 'Other Project'];
  return order.indexOf(a.type) - order.indexOf(b.type);
});

// Sample data for partners
const partners = [
  {
    href: 'https://abubillamusic.com',
    alt: 'Abubila Music',
    img: '/partner1.png',
    name: 'Abubila Music',
  },
  {
    href: 'https://www.fordfoundation.org/regions/eastern-africa',
    alt: 'Ford Foundation Eastern Africa',
    img: '/partner2.png',
    name: 'Ford Foundation',
  },
  {
    href: 'https://afkenya.org',
    alt: 'Alliance Francaise de Nairobi',
    img: '/partner3.jpg',
    name: 'Alliance Francaise de Nairobi',
  },
];

export default function HomePage() {
  const [heroIndex, setHeroIndex] = useState(0);

  // Effect for cycling hero phrases and backgrounds
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex(prev => (prev + 1) % heroContent.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: 'easeOut',
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 150,
        damping: 12,
        delay: i * 0.1,
        duration: 0.8,
      } as Transition,
    }),
  };

  const hoverVariants: Variants = {
    lift: {
      y: -10,
      scale: 1.04,
      boxShadow: `0 12px 25px rgba(0,0,0,0.4), 0 0 0 4px ${GOLDEN_YELLOW}`,
      transition: {
        type: 'spring',
        stiffness: 350,
        damping: 25,
      } as Transition,
    },
  };

  const currentContent = heroContent[heroIndex];

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 font-inter">
      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={heroIndex}
            className="absolute inset-0 z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          >
            <motion.div
              className="absolute inset-0 bg-cover"
              initial={{ scale: 1 }}
              animate={{ scale: 1.05 }}
              transition={{ duration: 6, ease: 'easeInOut' }}
              style={{
                backgroundImage: `url(${currentContent.img})`,
                backgroundPosition: currentContent.mobilePosition,
                backgroundSize: 'cover',
              }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center p-4 pb-10">
              {/* You can switch to AnimatedPhrase if you prefer that implementation */}
              <AnimatedPhrase
                text={currentContent.text}
                keywords={currentContent.keywords}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
              >
                <a
                  href="/about"
                  className={`inline-block bg-${PRIMARY_YELLOW} hover:bg-${HOVER_YELLOW} text-gray-900 font-bold py-3.5 px-9 rounded-full transition-all duration-300 shadow-xl text-lg transform hover:scale-105`}
                >
                  Learn More
                </a>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ABOUT PREVIEW SECTION */}
      <motion.section
        className="container mx-auto px-4 py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.4 }}
        variants={sectionVariants}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-12 md:items-start">
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative w-full h-80 rounded-xl overflow-hidden shadow-2xl"
          >
            <ImageLoader
              src="/gallery/3.jpeg"
              alt="About Ketebul"
              objectFit="cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
            className="flex flex-col space-y-4 md:pt-0 pt-8"
          >
            <h2 className="text-3xl sm:text-4xl font-bold font-josefin-sans text-white text-left">
              About Us
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Ketebul Music is a not-for-profit non-governmental organization
              based at the GoDown Arts Centre in Nairobi, Kenya.
              <br />
              <br />
              The word &quot;Ketebul&quot; means &quot;drum sticks&quot;; it is
              derived from the Luo language of Western Kenya. This name was a
              natural choice for an organization that has a vision of an African
              society that celebrates its cultural identity and also recognizes
              the special role that artistes play every day in people’s lives.
            </p>
            <a
              href="/about"
              className={`bg-${PRIMARY_YELLOW} hover:bg-${HOVER_YELLOW} text-gray-900 font-bold py-3.5 px-9 rounded-full transition-colors duration-300 shadow-xl text-lg transform hover:scale-105 self-start`}
            >
              Learn more about us →
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* FEATURED PROJECTS SECTION */}
      <section className="container mx-auto px-4 py-20">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold mb-12 text-center font-josefin-sans text-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={sectionVariants}
        >
          Featured Projects
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedProjects.map((project, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-r from-gray-900 to-black rounded-2xl overflow-hidden shadow-2xl flex flex-col h-full cursor-pointer group border-2 border-transparent hover:border-yellow-500 transition-all duration-300 ease-in-out p-8"
              initial="hidden"
              whileInView="visible"
              whileHover="lift"
              viewport={{ once: false, amount: 0.2 }}
              variants={cardVariants}
              custom={index}
            >
              <div className="relative w-full h-80 sm:h-96 overflow-hidden flex-shrink-0 rounded-xl">
                <ImageLoader
                  src={project.img}
                  alt={project.title}
                  objectFit="cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-gray-900 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300 rounded-b-xl" />
              </div>
              <div className="p-6 flex flex-col flex-grow items-start">
                <h3 className="text-xl font-semibold mb-2 font-josefin-sans text-white">
                  {project.title}
                </h3>
                <a
                  href={`/projects/${project.slug}`}
                  className={`mt-4 inline-flex items-center text-${PRIMARY_YELLOW} hover:text-${HOVER_YELLOW}`}
                >
                  View Project →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="text-center mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={sectionVariants}
        >
          <a
            href="/projects"
            className={`bg-${PRIMARY_YELLOW} hover:bg-${HOVER_YELLOW} text-gray-900 font-bold py-3.5 px-9 rounded-full transition-colors duration-300 shadow-lg text-lg transform hover:scale-105`}
          >
            See All Projects →
          </a>
        </motion.div>
      </section>

      {/* PARTNERS SECTION */}
      <section className="container mx-auto px-4 py-20 overflow-hidden">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold mb-12 text-center font-josefin-sans text-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={sectionVariants}
        >
          Our Valued Partners
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {partners.map((partner, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center p-8 bg-gradient-to-r from-gray-900 to-black rounded-2xl shadow-2xl group border-2 border-transparent hover:border-yellow-500 transition-all duration-300 transform hover:scale-105"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={cardVariants}
              custom={i}
            >
              <a
                href={partner.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-48 h-48 md:w-56 md:h-56 relative p-4 rounded-xl"
              >
                <ImageLoader
                  src={partner.img}
                  alt={partner.alt}
                  objectFit="contain"
                />
              </a>
              <p className="text-white text-center text-lg mt-2 font-semibold font-inter">
                {partner.name}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION SECTION */}
      <section className="container mx-auto px-4 py-20 text-center">
        <motion.div
          className={`bg-gradient-to-r from-${PRIMARY_YELLOW} to-${HOVER_YELLOW} p-10 md:p-14 rounded-lg shadow-2xl`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          variants={sectionVariants}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-5 font-josefin-sans text-gray-900">
            Join Our Journey
          </h2>
          <p className="text-lg text-gray-800 max-w-2xl mx-auto mb-10">
            Support our mission to preserve and promote East African music. Your
            contribution helps us empower artists and enrich cultural heritage.
          </p>
          <a
            href="/contact"
            className={`bg-gray-900 hover:bg-gray-800 text-${PRIMARY_YELLOW} font-bold py-3.5 px-9 rounded-full transition-colors duration-300 shadow-lg text-lg transform hover:scale-105`}
          >
            Get Involved
          </a>
        </motion.div>
      </section>
    </main>
  );
}
