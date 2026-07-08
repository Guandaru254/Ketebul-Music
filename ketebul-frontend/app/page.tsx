'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, Variants, Transition } from 'framer-motion';
import { client, urlFor } from '../lib/api'; 
import { PortableText } from '@portabletext/react';

// --- Global Theme & Color Constants ---
const GOLDEN_YELLOW = '#F2A900'; 
const HOVER_GOLDEN = '#D49200';

// --- ImageLoader Component ---
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

  const fallbackSrc = 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop';

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
    transition-all duration-700 ease-out
    ${loading ? 'opacity-40 scale-105 blur-sm' : 'opacity-100 scale-100 blur-0'}
  `;

  return (
    <div className="relative w-full h-full overflow-hidden bg-black/20">
      {width && height ? (
        <Image
          src={imageSrc}
          alt={alt}
          width={width}
          height={height}
          className={effectiveClassName}
          onLoad={handleLoad}
          onError={handleError}
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
        />
      )}
      {loading && (
        <div className="absolute inset-0 bg-slate-950/60 animate-pulse flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: `${GOLDEN_YELLOW}20`, borderTopColor: GOLDEN_YELLOW }} />
        </div>
      )}
    </div>
  );
}

// --- PortableText Preview Elements Config ---
const ptComponents = {
  block: {
    normal: ({ children }: any) => <p className="text-gray-400 text-xs sm:text-sm leading-relaxed line-clamp-3">{children}</p>,
  },
};

// --- Local Date Parser Helper ---
function parseLocalDate(dateStr: string): Date {
  if (!dateStr || typeof dateStr !== 'string' || !dateStr.includes('-')) return new Date();
  try {
    const [y, m, d] = dateStr.split('-').map(Number);
    return new Date(y, m - 1, d, 12, 0, 0);
  } catch {
    return new Date();
  }
}

// --- Preview Thumbnail Extractor Component ---
function PreviewPostImage({ update }: { update: any }) {
  const FALLBACK = 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop';
  const [src, setSrc] = useState<string>(FALLBACK);

  useEffect(() => {
    if (update?.mainImage?.asset) {
      try {
        const url = urlFor(update.mainImage).width(600).url();
        if (url) {
          setSrc(url);
          return;
        }
      } catch (err) {
        console.error("Sanity image builder error:", err);
      }
    }
    
    const wpUrl = update?.node?.attributes?.wp_post_thumbnail || update?.attributes?.wp_post_thumbnail;
    if (wpUrl && typeof wpUrl === 'string' && wpUrl.trim() !== '') {
      setSrc(wpUrl);
      return;
    }

    if (update?.imageUrl && typeof update.imageUrl === 'string') {
      setSrc(update.imageUrl);
      return;
    }

    setSrc(FALLBACK);
  }, [update]);

  return <ImageLoader src={src} alt={update?.title || 'Ketebul Music Update'} />;
}

// --- Data for Hero Section ---
const heroContent = [
  {
    text: 'Celebrating East African Sound',
    keywords: ['East', 'African'],
    img: '/projects/benga1.jpg', 
    mobilePosition: 'left 25%',
  },
  {
    text: 'Preserving Musical Heritage',
    keywords: ['Musical', 'Heritage'],
    img: '/projects/sauti1.png', 
    mobilePosition: 'center',
  },
  {
    text: 'Empowering New Voices',
    keywords: ['New', 'Voices'],
    img: '/projects/swells.png',
    mobilePosition: '50% 100%',
  },
];

// --- Animated Phrase Component ---
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
      transition: { staggerChildren: 0.08, delayChildren: 0.3 },
    },
  };

  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', damping: 12, stiffness: 100 },
    },
  };

  return (
    <motion.h1
      className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight font-inter drop-shadow-lg tracking-tight"
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
              className="inline-block"
              style={{
                color: keywords.includes(word) ? GOLDEN_YELLOW : '#FFFFFF'
              }}
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

// --- Featured Projects Data ---
const allProjects = [
  {
    slug: 'sauti',
    title: 'SAUTI: Gifted Different Unsilenced',
    img: '/projects/sauti1.png',
    type: 'Documentary',
  },
  {
    slug: 'shades-of-benga',
    title: 'Shades of Benga',
    img: '/projects/benga1.jpg',
    type: 'Documentary',
  },
  {
    slug: 'reconciliation',
    title: 'Weapon of Mass Reconciliation',
    img: '/projects/reconciliations.jpg',
    type: 'Other Project',
  },
];

const sortedProjects = [...allProjects].sort((a, b) => {
  const order = ['Documentary', 'Other Project'];
  return order.indexOf(a.type) - order.indexOf(b.type);
});

// --- Partners Data ---
const partners = [
  {
    href: 'https://abubillamusic.com',
    alt: 'Abubila Music',
    img: '/partner.png',
    name: 'Abubila Music',
  },
  {
    href: 'https://www.fordfoundation.org/regions/eastern-africa',
    alt: 'Ford Foundation Eastern Africa',
    img: '/partner1.png',
    name: 'Ford Foundation',
  },
  {
    href: 'https://afkenya.org',
    alt: 'Alliance Francaise de Nairobi',
    img: '/partner2.jpg',
    name: 'Alliance Francaise de Nairobi',
  },
];

export default function HomePage() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [latestUpdates, setLatestUpdates] = useState<any[]>([]);
  const [loadingUpdates, setLoadingUpdates] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex(prev => (prev + 1) % heroContent.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Fetch slice of top 3 latest updates from Sanity
  useEffect(() => {
    let isMounted = true;
    
    client.fetch(`
      *[_type == "update"] | order(date desc)[0...3] {
        _id,
        title,
        slug,
        date,
        venue,
        excerpt,
        buttonText,
        externalLink,
        mainImage {
          asset-> {
            _id,
            url
          }
        },
        _createdAt
      }
    `)
      .then((data: any[]) => {
        if (!isMounted) return;
        if (data && Array.isArray(data)) {
          const normalized = data.map(item => ({
            ...item,
            displayDate: item.date || item._createdAt?.split('T')[0] || '',
            richTextContent: Array.isArray(item.content) ? item.content : null
          }));
          setLatestUpdates(normalized);
        }
      })
      .catch((err) => console.error('Sanity preview fetch error:', err))
      .finally(() => {
        if (isMounted) setLoadingUpdates(false);
      });

    return () => { isMounted = false; };
  }, []);

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: 'easeOut' },
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
      y: -6,
      scale: 1.02,
      boxShadow: `0 20px 40px rgba(0,0,0,0.6)`,
      transition: { type: 'spring', stiffness: 300, damping: 20 } as Transition,
    },
  };

  const combinedCardVariants: Variants = { ...cardVariants, ...hoverVariants };
  const currentContent = heroContent[heroIndex];

  return (
    <main className="min-h-screen bg-slate-950 text-gray-100 font-inter overflow-x-hidden">
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
            <Image
              src={currentContent.img}
              alt="Hero Background"
              fill
              priority
              className="object-cover transition-transform duration-[6000ms]"
              style={{ 
                objectPosition: currentContent.mobilePosition,
                transform: 'scale(1.05)'
              }}
            />
            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-4 z-10">
              <AnimatedPhrase
                text={currentContent.text}
                keywords={currentContent.keywords}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <a
                  href="/about"
                  className="inline-block text-gray-950 font-black py-3.5 px-9 rounded-full transition-all duration-300 shadow-xl text-lg tracking-wide transform active:scale-95 hover:brightness-110"
                  style={{ backgroundColor: GOLDEN_YELLOW }}
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
        className="container mx-auto px-4 py-20 overflow-hidden"
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
            <ImageLoader src="/3.jpeg" alt="About Ketebul" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
            className="flex flex-col space-y-4 md:pt-0 pt-8"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white text-left">About Us</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Ketebul Music is a not-for-profit non-governmental organization based at the GoDown Arts Centre in Nairobi, Kenya.
              <br /><br />
              The word &quot;Ketebul&quot; means &quot;drum sticks&quot;; derived from the Luo language. We celebrate cultural identity and the vital role of artists.
            </p>
            <a
              href="/about"
              className="text-gray-950 font-black py-3.5 px-9 rounded-full transition-all duration-300 shadow-xl text-lg transform hover:scale-105 active:scale-95 self-start"
              style={{ backgroundColor: GOLDEN_YELLOW }}
            >
              Learn more about us →
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* FEATURED PROJECTS SECTION */}
      <section className="container mx-auto px-4 py-20 overflow-hidden">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold mb-12 text-center text-white tracking-tight"
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
              className="bg-gradient-to-r from-gray-900 to-black rounded-2xl overflow-hidden shadow-2xl flex flex-col h-full cursor-pointer group border border-gray-900 transition-all duration-300 p-6"
              initial="hidden"
              whileInView="visible"
              whileHover="lift"
              viewport={{ once: false, amount: 0.2 }}
              variants={combinedCardVariants}
              custom={index}
              style={{ borderColor: 'transparent' }}
            >
              <div className="relative w-full h-64 sm:h-72 overflow-hidden flex-shrink-0 rounded-xl">
                <ImageLoader src={project.img} alt={project.title} />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-gray-900 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300 rounded-b-xl" />
              </div>
              <div className="pt-6 flex flex-col flex-grow justify-between items-start">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase mb-1 block">{project.type}</span>
                  <h3 className="text-lg font-bold text-white group-hover:text-white/90 transition-colors line-clamp-2">{project.title}</h3>
                </div>
                <a
                  href={`/projects/${project.slug}`}
                  className="mt-4 inline-flex items-center text-sm font-semibold transition-colors hover:brightness-110"
                  style={{ color: GOLDEN_YELLOW }}
                >
                  View Project →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div className="text-center mt-16" initial="hidden" whileInView="visible" variants={sectionVariants}>
          <a
            href="/projects"
            className="text-gray-950 font-black py-3.5 px-9 rounded-full transition-all duration-300 shadow-lg text-lg transform hover:scale-105 active:scale-95 inline-block"
            style={{ backgroundColor: GOLDEN_YELLOW }}
          >
            See All Projects →
          </a>
        </motion.div>
      </section>

      {/* LATEST UPDATES (BLOG PREVIEW) SECTION */}
      <section className="container mx-auto px-4 py-20 overflow-hidden bg-slate-950/40 border-t border-b border-gray-900">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          variants={sectionVariants}
          viewport={{ once: false, amount: 0.3 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">Latest Updates</h2>
          <p className="text-gray-400 text-sm max-w-xl mx-auto">
                      </p>
        </motion.div>

        {loadingUpdates ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: `${GOLDEN_YELLOW}20`, borderTopColor: GOLDEN_YELLOW }} />
            <p className="text-gray-500 text-xs font-mono tracking-widest uppercase">Fetching logs…</p>
          </div>
        ) : latestUpdates.length === 0 ? (
          <p className="text-center text-gray-500 py-12">No recent updates found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestUpdates.map((update, index) => {
              const d = parseLocalDate(update.displayDate);
              const day = d.getDate().toString().padStart(2, '0');
              const month = d.toLocaleString('en-US', { month: 'short' }).toUpperCase();

              const isExternal = update.buttonLink && typeof update.buttonLink === 'string' && update.buttonLink.startsWith('http');
              const destination = isExternal 
                ? update.buttonLink 
                : update.slug?.current 
                  ? `/updates/${update.slug.current}` 
                  : '#';

              return (
                <motion.div
                  key={update._id || index}
                  className="bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden shadow-2xl flex flex-col h-full border border-gray-900/60"
                  initial="hidden"
                  whileInView="visible"
                  whileHover="lift"
                  viewport={{ once: false, amount: 0.1 }}
                  variants={combinedCardVariants}
                  custom={index}
                >
                  {/* Card Thumbnail & Date Flag */}
                  <div className="relative w-full h-56 overflow-hidden flex-shrink-0">
                    <PreviewPostImage update={update} />
                    <div className="absolute top-4 left-4 bg-gray-950/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-gray-800 flex flex-col items-center justify-center min-w-[3.5rem]">
                      <span className="text-lg font-black text-white leading-none">{day}</span>
                      <span className="text-[10px] tracking-widest font-bold uppercase mt-0.5" style={{ color: GOLDEN_YELLOW }}>{month}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex flex-col flex-grow justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 leading-snug">
                        {update.title}
                      </h3>
                      <div className="text-gray-400 text-xs line-clamp-3 mb-4 leading-relaxed">
                        {update.richTextContent ? (
                          <PortableText value={update.richTextContent} components={ptComponents} />
                        ) : update.excerpt ? (
                          <p>{update.excerpt}</p>
                        ) : (
                          <p className="italic text-gray-600"></p>
                        )}
                      </div>
                    </div>

                    <div className="mt-4">
                      <a
                        href={destination}
                        target={isExternal ? '_blank' : '_self'}
                        rel="noopener noreferrer"
                        className="inline-block text-xs font-black text-gray-950 px-5 py-2.5 rounded-xl transition-all duration-300 shadow-md hover:brightness-110 active:scale-95"
                        style={{ backgroundColor: GOLDEN_YELLOW }}
                      >
                        {update.buttonText || (update.slug?.current ? 'Read More' : 'View Update')}
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        <motion.div className="text-center mt-12" initial="hidden" whileInView="visible" variants={sectionVariants}>
          <a
            href="/updates"
            className="inline-block border border-gray-800 hover:border-gray-700 text-gray-400 hover:text-white font-medium py-2.5 px-8 rounded-full transition-colors duration-300 text-sm"
          >
            View All Updates →
          </a>
        </motion.div>
      </section>

      {/* PARTNERS SECTION */}
      <section className="container mx-auto px-4 py-20 overflow-hidden">
        <motion.h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center text-white tracking-tight" variants={sectionVariants} initial="hidden" whileInView="visible">
          Our Valued Partners
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {partners.map((partner, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center justify-between p-8 bg-gradient-to-r from-gray-900 to-black rounded-2xl shadow-2xl border border-gray-900 w-full max-w-sm"
              variants={combinedCardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="lift"
              custom={i}
            >
              <a href={partner.href} target="_blank" rel="noopener noreferrer" className="block w-full h-32 relative p-4 transition-transform duration-300 group-hover:scale-102">
                <ImageLoader src={partner.img} alt={partner.alt} objectFit="contain" />
              </a>
              <p className="text-white text-center text-base mt-6 font-semibold tracking-wide">{partner.name}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION SECTION */}
      <section className="container mx-auto px-4 py-20 text-center overflow-hidden">
        <motion.div
          className="p-10 md:p-14 rounded-2xl shadow-2xl flex flex-col items-center justify-center border border-yellow-500/10"
          initial="hidden"
          whileInView="visible"
          variants={sectionVariants}
          style={{ backgroundImage: `linear-gradient(135deg, ${GOLDEN_YELLOW} 0%, #D49200 100%)` }}
        >
          <h2 className="text-3xl sm:text-4xl font-black mb-5 text-gray-950 tracking-tight">Join Our Journey</h2>
          <p className="text-base sm:text-lg text-gray-900 font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
            Support our mission to preserve and promote East African music. Your contribution helps us empower artists.
          </p>
          <a
            href="/contact"
            className="bg-gray-950 hover:bg-slate-900 text-white font-bold py-3.5 px-9 rounded-full transition-all duration-300 shadow-2xl text-lg transform hover:scale-105 active:scale-95"
          >
            Get Involved
          </a>
        </motion.div>
      </section>
    </main>
  );
}