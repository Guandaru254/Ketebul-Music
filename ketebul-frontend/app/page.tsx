'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, Variants, Transition } from 'framer-motion';
import { useState, useEffect } from 'react';

// --- Global Theme & Color Constants ---
// Define a consistent yellow color for the entire project
const PRIMARY_YELLOW = 'yellow-500'; // Tailwind CSS class for #F59E0B
const HOVER_YELLOW = 'yellow-600'; // Tailwind CSS class for a slightly darker yellow on hover

// Data for Hero section's dynamic text
const phrases = [
  { text: 'Celebrating East African Sound', keywords: ['East', 'African'] },
  { text: 'Preserving Musical Heritage', keywords: ['Musical', 'Heritage'] },
  { text: 'Empowering New Voices', keywords: ['New'] }
];

// Data for Hero section's dynamic backgrounds
const backgrounds = [
  '/back.jpg',
  '/back2.jpg',
  '/studio.jpg'
];

// Helper component for letter-by-letter animation with keyword highlighting
interface AnimatedPhraseProps {
  text: string;
  keywords: string[];
}

const AnimatedPhrase: React.FC<AnimatedPhraseProps> = ({ text, keywords }) => {
  // Split the text into words to apply individual word animations and styling
  const words = text.split(' ');

  // Variants for the entire phrase container, orchestrating the entrance of words
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08, // Time delay between each word's animation start
        delayChildren: 0.5,    // Initial delay before the first word animates
      },
    },
  };

  // Variants for individual letters within a word, creating the typing effect
  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 20 }, // Start hidden, slightly below
    visible: {
      opacity: 1,
      y: 0, // Animate to original position
      transition: {
        type: "spring", // Spring animation for a natural feel
        damping: 12,    // Controls oscillation
        stiffness: 100, // Controls the spring's stiffness
      },
    },
  };

  return (
    <motion.h1
      className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-8 leading-tight font-josefin-sans drop-shadow-lg"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden" // Ensures it fades out smoothly when the parent AnimatePresence triggers
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block">
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={charIndex}
              variants={letterVariants}
              // Apply consistent golden yellow to specified keywords, otherwise white
              className={`inline-block ${keywords.includes(word) ? `text-${PRIMARY_YELLOW}` : 'text-white'}`}
            >
              {char}
            </motion.span>
          ))}
          {/* Add a non-breaking space after each word, except the last one */}
          {wordIndex < words.length - 1 && '\u00A0'}
        </span>
      ))}
    </motion.h1>
  );
};


// Sample data for featured artists (UPDATED based on screenshot request)
const featuredArtists = [
  {
    name: 'Bado',
    image: '/artists/bado.jpg',
    bio: 'Hailing from the coastal town of Watamu in Malindi, Bado was born Mohamed Said Ngana. Although he started singing publicly in 2005, he has been composing music since childhood. His music is deeply rooted in coastal traditions...',
    slug: 'bado',
  },
  {
    name: 'Ontiri Bikundo',
    image: '/artists/ontiri.jpg',
    bio: 'Ontiri Bikundo was born in 1976 in Nyaribari Chache constituency of Kisii District. His parents passed away before he was old enough to know them, and he was raised by his grandmother. His music reflects his life\'s journey and the rich Kisii culture...',
    slug: 'ontiri-bikundo',
  },
  {
    name: 'Olith Ratego',
    image: '/artists/olith.jpg',
    bio: 'Olith Ratego was born Musa Odhiambo Omondi, in Asere Ugenya, Siaya District. The middle child in a family of three, he started playing the nyatiti (a traditional Luo lyre) at a young age. His music is a modern interpretation of ancient sounds...',
    slug: 'olith-ratego',
  },
];

// Sample data for featured projects
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

// Sample data for partners
const partners = [
  {
    href: 'https://abubillamusic.com',
    alt: 'Abubila Music',
    img: '/partner1.png',
  },
  {
    href: 'https://www.fordfoundation.org/regions/eastern-africa',
    alt: 'Ford Foundation Eastern Africa',
    img: '/partner2.png',
  },
  {
    href: 'https://afkenya.org',
    alt: 'French Embassy Kenya',
    img: '/partner3.png',
  },
];


export default function HomePage() {
  const [heroPhraseIndex, setHeroPhraseIndex] = useState(0);

  // Effect for cycling hero phrases and backgrounds
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroPhraseIndex((prev) => (prev + 1) % phrases.length);
    }, 6000); // Change every 6 seconds
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
      // Consistent shadow color with PRIMARY_YELLOW (Tailwind yellow-500 is rgb(245, 158, 11))
      boxShadow: `0 12px 25px rgba(0,0,0,0.4), 0 0 0 4px rgba(245, 158, 11, 0.6)`,
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
              {/* Animated Title Phrase using the new AnimatedPhrase component */}
              <AnimatedPhrase
                text={phrases[heroPhraseIndex].text}
                keywords={phrases[heroPhraseIndex].keywords} // Pass keywords from the phrases data
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }} // Exits by shrinking
                transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }} // Delayed after title
              >
                <Link
                  href="/about"
                  className={`inline-block bg-${PRIMARY_YELLOW} hover:bg-${HOVER_YELLOW} text-gray-900 font-bold py-3.5 px-9 rounded-full transition-all duration-300 shadow-xl text-lg transform hover:scale-105`}
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
Ketebul Music is a not-for-profit non-governmental organization based at the GoDown Arts Centre in Nairobi, Kenya.
          <br></br>
          <p className="text-gray-300 leading-relaxed mb-6">
The word "Ketebul" means "drum sticks"; it is derived from the Luo language of Western Kenya. This name was a natural choice for an organization that has a vision of an African society that celebrates its cultural identity and also recognizes the special role that artistes play every day in people’s lives.          </p>
          </p>
          <Link href="/about"
            className={`bg-${PRIMARY_YELLOW} hover:bg-${HOVER_YELLOW} text-gray-900 font-bold py-3.5 px-9 rounded-full transition-colors duration-300 shadow-xl text-lg transform hover:scale-105 self-start`}
          >
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> {/* Adjusted for 3 cards comfortably */}
          {featuredArtists.map((artist, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-xl flex flex-col h-full cursor-pointer border-2 border-transparent p-8" // Added p-8 for larger cards
              initial="hidden"
              whileInView="visible"
              whileHover="lift"
              viewport={{ once: false, amount: 0.2 }}
              variants={cardVariants}
              custom={index}
            >
              <div className="relative w-full h-72 overflow-hidden flex-shrink-0 mb-4"> {/* Increased height from h-64 to h-72 */}
                {/* REMOVED 'fill' PROP HERE: ImageLoader component handles it internally */}
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
                <Link href={`/artists/${artist.slug}`} className={`mt-6 inline-flex items-center text-${PRIMARY_YELLOW} hover:text-${HOVER_YELLOW} font-semibold transition-colors duration-200 group-hover:translate-x-1`}>
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
          <Link href="/artists" className={`bg-${PRIMARY_YELLOW} hover:bg-${HOVER_YELLOW} text-gray-900 font-bold py-3.5 px-9 rounded-full transition-colors duration-300 shadow-lg text-lg transform hover:scale-105`}>
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
              <div className="relative w-full h-80 sm:h-96 overflow-hidden flex-shrink-0">
                {/* REMOVED 'fill' PROP HERE */}
                <ImageLoader src={project.img} alt={project.title} />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-gray-900 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-2 font-josefin-sans text-white">{project.title}</h3>
                <Link href={`/projects/${project.slug}`} className={`mt-4 inline-flex items-center text-${PRIMARY_YELLOW} hover:text-${HOVER_YELLOW}`}>
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
          <Link href="/projects" className={`bg-${PRIMARY_YELLOW} hover:bg-${HOVER_YELLOW} text-gray-900 font-bold py-3.5 px-9 rounded-full transition-colors duration-300 shadow-lg text-lg transform hover:scale-105`}>
            See All Projects →
          </Link>
        </motion.div>
      </section>

      {/* PARTNERS SECTION - Static Display */}
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
              className="flex flex-col items-center p-4 bg-gray-800 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={cardVariants} // Re-using card variants for entrance animation
              custom={i}
            >
              <Link href={partner.href} target="_blank" rel="noopener noreferrer" className="block w-48 h-48 md:w-56 md:h-56 relative">
                {/* REMOVED 'fill' PROP HERE */}
                <ImageLoader
                  src={partner.img}
                  alt={partner.alt}
                  className="object-contain"
                />
              </Link>
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
            Support our mission to preserve and promote East African music. Your contribution helps us empower artists and enrich cultural heritage.
          </p>
          <Link
            href="/contact"
            className={`bg-gray-900 hover:bg-gray-800 text-${PRIMARY_YELLOW} font-bold py-3.5 px-9 rounded-full transition-colors duration-300 shadow-lg text-lg transform hover:scale-105`}
          >
            Get Involved
          </Link>
        </motion.div>
      </section>
    </main>
  );
}

// Separate component for Image with Skeleton Loader
// Ensure this component is accessible in the same file or imported correctly if in a separate file.
interface ImageLoaderProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

function ImageLoader({ src, alt, width, height, className }: ImageLoaderProps) {
  const [loading, setLoading] = useState(true);

  // Fallback placeholder image for when an image fails to load.
  const fallbackSrc = "https://placehold.co/200x200/525252/b3b3b3?text=Image+Missing";

  // Conditionally render the Image component to correctly handle 'fill' vs 'width/height'
  // This ensures that either 'fill' is true OR 'width' and 'height' are provided, resolving the TypeScript error.
  const imageElement = width && height ? (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
      className={`
        object-contain ${className || ''}
        transition-opacity duration-500 ease-in-out
        ${loading ? 'opacity-0' : 'opacity-100'}
      `}
      onLoad={() => setLoading(false)}
      onError={(e) => {
        setLoading(false);
        e.currentTarget.onerror = null; // Prevents infinite loop if fallback image also fails
        e.currentTarget.src = fallbackSrc; // Set fallback image
        console.error(`Failed to load image: ${src}. Displaying fallback.`); // Log the specific error
      }}
      priority={false}
    />
  ) : (
    <Image
      src={src}
      alt={alt}
      fill // Use fill when width/height are not explicitly provided
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
      className={`
        object-contain ${className || ''}
        transition-opacity duration-500 ease-in-out
        ${loading ? 'opacity-0' : 'opacity-100'}
      `}
      onLoad={() => setLoading(false)}
      onError={(e) => {
        setLoading(false);
        e.currentTarget.onerror = null;
        e.currentTarget.src = fallbackSrc;
        console.error(`Failed to load image: ${src}. Displaying fallback.`);
      }}
      priority={false}
    />
  );

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {imageElement}
      {loading && (
        <div className="absolute inset-0 bg-gray-700 animate-pulse rounded-md flex items-center justify-center">
          <span className="text-gray-400 text-sm">Loading Image...</span>
        </div>
      )}
    </div>
  );
}
