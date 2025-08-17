'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, Variants, Transition } from 'framer-motion';
import { useState, useEffect } from 'react';

// Data for Hero section's dynamic text
const phrases = [
  'Celebrating East African Sound',
  'Preserving Musical Heritage',
  'Empowering New Voices'
];

// Data for Hero section's dynamic backgrounds (ensure these images exist directly in your public folder)
const backgrounds = [
  '/back.jpg',
  '/back2.jpg',
  '//back3.jpg'
];

// Sample data for featured artists (ensure these images exist in your public folder)
const featuredArtists = [
  {
    name: 'Winyo',
    image: '/artists/winyo.jpg',
    bio: 'Born Shiphton Onyango, Winyo adopted his artistic name ‘Winyo’, which is a Luo word (a tribe from the Lake Victoria region), meaning ‘My Own’. His music has evolved through a journey of experience from gospel to afro-fusion to his current style,...',
    slug: 'winyo',
  },
  {
    name: 'Ogoya Nengo',
    image: '/artists/ogoya.jpg',
    bio: 'Ogoya Nengo was born Anastasia Oluoch in the late 1930s at Magoya, near the shores of Lake Victoria. She is a renowned Dodo singer, carrying on a powerful tradition of music and storytelling that has captivated audiences globally...',
    slug: 'ogoya-nengo',
  },
  {
    name: 'Makadem',
    image: '/artists/makadem.jpg',
    bio: 'Makadem, also known as the Ohanglaman, is a talented musician and vibrant performing artiste from Kenya. His music blends traditional Luo rhythms with contemporary sounds, creating a unique and energetic style...',
    slug: 'makadem',
  },
];

// Sample data for featured projects (ensure these images exist in your public folder)
const featuredProjects = [
  {
    slug: 'sauti',
    title: 'SAUTI: Gifted Different Unsilenced',
    img: '/projects/sauti.png'
  },
  {
    slug: 'shades-of-benga',
    title: 'Shades of Benga',
    img: '/projects/benga.jpg'
  },
  {
    slug: 'reconciliation',
    title: 'Weapon of Mass Reconciliation',
    img: '/projects/reconciliation.jpg'
  }
];

// Sample data for partners (ensure these images exist in your public folder)
// The array is already duplicated within the constant to facilitate the continuous loop
const partners = [
  {
    href: 'https://abubillamusic.com',
    alt: 'Abubila Music',
    img: '/partners/partner1.png'
  },
  {
    href: 'https://www.fordfoundation.org/regions/eastern-africa',
    alt: 'Ford Foundation Eastern Africa',
    img: '/partners/partner2.png'
  },
  {
    href: 'https://afkenya.org',
    alt: 'French Embassy Kenya',
    img: '/partners/partner3.png'
  },
  {
    href: 'https://www.eac.int/',
    alt: 'East African Community',
    img: '/partners/partner4.png'
  },
  {
    href: 'https://www.culturefund.or.ke/',
    alt: 'Culture Fund Kenya',
    img: '/partners/partner5.png'
  },
  // Duplicate partners to ensure continuous loop
  {
    href: 'https://abubillamusic.com',
    alt: 'Abubila Music',
    img: '/partners/partner1.png'
  },
  {
    href: 'https://www.fordfoundation.org/regions/eastern-africa',
    alt: 'Ford Foundation Eastern Africa',
    img: '/partners/partner2.png'
  },
  {
    href: 'https://afkenya.org',
    alt: 'French Embassy Kenya',
    img: '/partners/partner3.png'
  },
  {
    href: 'https://www.eac.int/',
    alt: 'East African Community',
    img: '/partners/partner4.png'
  },
  {
    href: 'https://www.culturefund.or.ke/',
    alt: 'Culture Fund Kenya',
    img: '/partners/partner5.png'
  },
];


export default function HomePage() {
  const [heroPhraseIndex, setHeroPhraseIndex] = useState(0);

  // Effect for cycling hero phrases and backgrounds
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroPhraseIndex((prev) => (prev + 1) % phrases.length);
    }, 4000); // Change every 4 seconds
    return () => clearInterval(interval);
  }, []);

  // Framer Motion variants for general section entry animation
  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 50 }, // Start slightly further down
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: {
        duration: 1, // Smoother duration
        ease: 'easeOut'
      }
    },
  };

  // Framer Motion variants for card entry animation
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 }, // Start slightly further down, slightly smaller
    visible: (i: number) => ({ // Use custom prop for staggered delay
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 150, // A bit more firm
        damping: 12,    // Less damping for a subtle bounce
        delay: i * 0.1,  // Quicker stagger for a flowing entrance
        duration: 0.8,   // Overall duration for visible state
      } as Transition, 
    }),
  };

  // Framer Motion variants for card hover animation
  const hoverVariants: Variants = {
    lift: {
      y: -10, // Lifts a bit more
      scale: 1.04, // Enlarges slightly more
      boxShadow: "0 12px 25px rgba(0,0,0,0.4), 0 0 0 4px rgba(253, 224, 71, 0.6)", // Stronger shadow and glow
      transition: {
        type: "spring",
        stiffness: 350, // More responsive hover
        damping: 25
      } as Transition,
    }
  };

  return (
    // Main container for the Home page, inheriting global dark background and light text
    <main className="min-h-screen bg-gray-950 text-gray-100 font-inter">
      {/* HERO SECTION - Dynamic Backgrounds and Phrases (Full Screen Desktop) */}
      {/* h-screen ensures it takes full viewport height on all devices. For mobile, it will scroll. */}
      <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
        {/* Animated Background Images and Phrase - Wrapped in a single AnimatePresence for sync */}
        <AnimatePresence mode="wait">
          <motion.div
            key={heroPhraseIndex} // Key changes to re-mount and animate both background and title
            className="absolute inset-0 z-0 bg-cover bg-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }} // Longer and smoother fade
            style={{ backgroundImage: `url(${backgrounds[heroPhraseIndex]})` }}
          >
            {/* Dark overlay for text readability, inside the animating background div */}
            <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center p-4">
              {/* Animated Title Phrase */}
              <motion.h1
                // No key here, as the parent motion.div has the key to trigger the combined animation
                className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-8 leading-tight font-josefin-sans drop-shadow-lg" // Larger bottom margin, text shadow
                initial={{ opacity: 0, y: 30 }} // Starts lower
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }} // Exits upwards
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }} // Slightly delayed after background starts fading in
              >
                {phrases[heroPhraseIndex]}
              </motion.h1>
              {/* REMOVED: Sub-caption as per request */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }} // Exits by shrinking
                transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }} // Delayed after title
              >
                <Link
                  href="/about"
                  className="inline-block bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3.5 px-9 rounded-full transition-all duration-300 shadow-xl text-lg transform hover:scale-105" // Slightly more padding, stronger shadow, all-encompassing transition
                >
                  Learn More
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ABOUT PREVIEW SECTION */}
      <motion.section
        className="container mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center" // Increased vertical padding
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.4 }} // Changed to once:false for re-triggering
        variants={sectionVariants} // Using shared section variants
      >
        <motion.div // Added motion to image container for slide-in
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative w-full h-80 rounded-lg overflow-hidden shadow-2xl"
        >
          <Image
            src="/tabu-osusa.jpg"
            alt="About Ketebul"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 500px"
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </motion.div>
        <motion.div // Added motion to text content for slide-in
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          className="flex flex-col"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-josefin-sans text-white">About Us</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            Ketebul Music is a not-for-profit organization dedicated to recording, preserving, and promoting the diverse musical traditions of East Africa.
          </p>
          <p className="text-gray-300 leading-relaxed mb-6">
            Through storytelling, collaboration, and mentorship, we celebrate cultural heritage while empowering new voices in the music industry.
          </p>
          <Link href="/about" className="bg-gray-800 hover:bg-gray-700 text-yellow-300 font-bold py-3 px-6 rounded-full transition-colors duration-300 shadow-lg text-lg transform hover:scale-105 self-start">
            Learn more about us →
          </Link>
        </motion.div>
      </motion.section>

      {/* FEATURED ARTISTS SECTION */}
      <section className="container mx-auto px-4 py-20"> {/* Increased vertical padding */}
        <motion.h2
          className="text-3xl sm:text-4xl font-bold mb-12 text-center font-josefin-sans text-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={sectionVariants} // Using shared section variants
        >
          Featured Artists
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {featuredArtists.map((artist, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-xl flex flex-col h-full cursor-pointer border-2 border-transparent"
              initial="hidden"
              whileInView="visible"
              whileHover="lift"
              viewport={{ once: false, amount: 0.2 }}
              variants={cardVariants}
              custom={index}
            >
              <div className="relative w-full h-64 overflow-hidden flex-shrink-0">
                <ImageLoader src={artist.image} alt={artist.name} />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-gray-900 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-3xl font-bold mb-3 font-josefin-sans text-white leading-snug">
                  {artist.name}
                </h2>
                <p className="text-gray-300 text-base leading-relaxed flex-grow line-clamp-4">
                  {artist.bio}
                </p>
                <Link href={`/artists/${artist.slug}`} className="mt-6 inline-flex items-center text-yellow-400 hover:text-yellow-200 font-semibold transition-colors duration-200 group-hover:translate-x-1">
                  Explore Profile
                  <svg className="ml-2 w-5 h-5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </Link>
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
          <Link href="/artists" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3.5 px-9 rounded-full transition-colors duration-300 shadow-lg text-lg transform hover:scale-105">
            See All Artists →
          </Link>
        </motion.div>
      </section>

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
          {featuredProjects.map((project, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-xl flex flex-col h-full cursor-pointer border-2 border-transparent"
              initial="hidden"
              whileInView="visible"
              whileHover="lift"
              viewport={{ once: false, amount: 0.2 }}
              variants={cardVariants}
              custom={index}
            >
              {/* Increased height for project images */}
              <div className="relative w-full h-80 sm:h-96 overflow-hidden flex-shrink-0"> {/* Adjusted height here */}
                <ImageLoader src={project.img} alt={project.title} />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-gray-900 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-2 font-josefin-sans text-white">{project.title}</h3> {/* Project title is white */}
                <Link href={`/projects/${project.slug}`} className="mt-4 inline-flex items-center text-yellow-400 hover:text-yellow-200">
                  View Project →
                </Link>
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
          <Link href="/projects" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3.5 px-9 rounded-full transition-colors duration-300 shadow-lg text-lg transform hover:scale-105">
            See All Projects →
          </Link>
        </motion.div>
      </section>

      {/* PARTNERS SECTION - Endless Sliding Loop */}
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
        <div className="relative w-full overflow-hidden">
          <style>{`
            @keyframes slide {
              from {
                transform: translateX(0);
              }
              to {
                transform: translateX(-50%);
              }
            }
            .slide-track {
              display: flex;
              width: calc(300px * ${partners.length});
              animation: slide 80s linear infinite;
            }
            .partner-logo-container {
              width: 300px;
              height: 150px;
              flex-shrink: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 1.5rem;
              filter: grayscale(100%);
              transition: filter 0.3s ease-in-out;
            }
            .partner-logo-container:hover {
              filter: grayscale(0%);
            }
          `}</style>
          <div className="slide-track">
            {partners.map((partner, i) => (
              <a
                key={i}
                href={partner.href}
                target="_blank"
                rel="noopener noreferrer"
                className="partner-logo-container bg-gray-800 rounded-lg shadow-md mx-4 transform transition-transform duration-300 hover:scale-105"
              >
                <Image
                  src={partner.img}
                  alt={partner.alt}
                  width={200}
                  height={100}
                  className="object-contain"
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION SECTION */}
      <section className="container mx-auto px-4 py-20 text-center">
        <motion.div
          className="bg-gradient-to-r from-yellow-500 to-amber-400 p-10 md:p-14 rounded-lg shadow-2xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          variants={sectionVariants}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-5 font-josefin-sans text-gray-900">
            Join Our Journey
          </h2>
          <p className="text-lg text-gray-800 max-w-2xl mx-auto mb-10">
            Support our mission to preserve and promote East African music. Your contribution helps us empower artists and enrich cultural heritage.
          </p>
          <Link
            href="/contact"
            className="bg-gray-900 hover:bg-gray-800 text-yellow-300 font-bold py-3.5 px-9 rounded-full transition-colors duration-300 shadow-lg text-lg transform hover:scale-105"
          >
            Get Involved
          </Link>
        </motion.div>
      </section>
    </main>
  );
}

// Separate component for Image with Skeleton Loader (moved here for clarity)
function ImageLoader({ src, alt }: { src: string; alt: string }) {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative w-full h-full">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
        className={`
          object-cover object-center rounded-t-2xl
          transition-opacity duration-500 ease-in-out
          ${loading ? 'opacity-0' : 'opacity-100'}
        `}
        onLoad={() => setLoading(false)}
        onError={(e) => {
          setLoading(false);
          e.currentTarget.onerror = null;
          e.currentTarget.src = "/placeholder.png";
        }}
        priority={false}
      />
      {loading && (
        <div className="absolute inset-0 bg-gray-700 animate-pulse rounded-t-2xl flex items-center justify-center">
          <span className="text-gray-400 text-sm">Loading Image...</span>
        </div>
      )}
    </div>
  );
}
