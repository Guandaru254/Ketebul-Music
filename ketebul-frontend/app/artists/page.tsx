'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, Variants, Transition } from 'framer-motion';
import { useState } from 'react'; // Needed for image loading state

// --- Global Theme & Color Constants (Copied from homepage for consistency) ---
const PRIMARY_YELLOW = 'yellow-500'; // Tailwind CSS class for #F59E0B
const HOVER_YELLOW = 'yellow-600'; // Tailwind CSS class for a slightly darker yellow on hover

// Define your artists data
const artists = [
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
  {
    name: 'Gargar',
    image: '/artists/gargar.jpg',
    bio: 'Gargar is a group of Kenyan women of Somali origin from Garissa, North Eastern Kenya. Their music is a vibrant celebration of Somali culture, blending traditional harmonies with contemporary African rhythms and powerful vocals...',
    slug: 'gargar',
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.98 },
  visible: (i: number) => ({ // Staggered entry
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,   // Reverted to 100 for consistency with team page
      damping: 12,     // Reverted to 12 for consistency with team page
      delay: i * 0.1,  // Reverted to 0.1 for consistency with team page (faster stagger)
      duration: 0.8,   // Reverted to 0.8 for consistency with team page
    } as Transition,
  }),
};

const hoverVariants: Variants = {
  lift: {
    y: -8,
    scale: 1.03,
    // Consistent shadow color with PRIMARY_YELLOW (Tailwind yellow-500 is rgb(245, 158, 11))
    boxShadow: `0 10px 20px rgba(0,0,0,0.4), 0 0 0 3px rgba(245, 158, 11, 0.6)`, 
    transition: {
      type: "spring",
      stiffness: 350, // Reverted to 350 for consistency
      damping: 25 // Reverted to 25 for consistency
    } as Transition,
  }
};

export default function ArtistsPage() {
  return (
    // Main container for the artists page, ensuring global dark theme and using inter font for consistency
    <main className="min-h-screen bg-gray-950 text-gray-100 py-16 px-4 sm:px-6 lg:px-8 font-inter"> {/* Changed font-josefin-sans to font-inter for consistency */}

      {/* Artist Grid Layout: Changed xl:grid-cols-4 to lg:grid-cols-3 for 3 columns on larger screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {artists.map((artist, index) => (
          <motion.div
            key={index}
            // Apply the gradient background to the card - matching header and team page
            className={`
              bg-gradient-to-r from-gray-900 to-black rounded-2xl overflow-hidden shadow-2xl flex flex-col cursor-pointer
              transform transition-all duration-300 ease-in-out border-2 border-transparent relative group p-8
            `} /* Increased padding from p-6 to p-8 */
            initial="hidden"
            whileInView="visible"
            whileHover="lift"
            viewport={{ once: false, amount: 0.15 }} // Adjusted amount for better trigger
            variants={cardVariants}
            custom={index} // Pass index for staggered delay
          >
            {/* Image Container with Skeleton Loader and Overlay */}
            <div className="relative w-full h-72 overflow-hidden flex-shrink-0"> {/* Consistent height for images h-72 */}
              <ImageLoader src={artist.image} alt={artist.name} />
              {/* Gradient overlay to blend image into card background */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-gray-900 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Content Area: Adjusted alignment and added min-height for consistent bio start */}
            <div className="p-6 flex flex-col flex-grow items-start">
              <div className="flex flex-col min-h-[4rem] justify-start w-full"> {/* Added min-height for consistent description start */}
                <h2 className="text-3xl font-bold mb-3 font-josefin-sans text-white text-left leading-snug">
                  {artist.name}
                </h2>
              </div>
              <p className="text-gray-300 text-base leading-relaxed flex-grow line-clamp-4 text-left">
                {artist.bio}
              </p>
              <Link
                href={`/artists/${artist.slug}`}
                className={`mt-6 inline-flex items-center text-${PRIMARY_YELLOW} hover:text-${HOVER_YELLOW} font-semibold transition-colors duration-200 group-hover:translate-x-1`}
              >
                Explore Profile
                <svg className="ml-2 w-5 h-5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}

// Separate component for Image with Skeleton Loader
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
  // This resolves the TypeScript error by ensuring mutual exclusivity at the type level.
  const imageElement = width && height ? (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw" // Optimised sizes for artists photos
      className={`
        object-cover object-center rounded-t-2xl // Rounded top corners for image
        transition-opacity duration-500 ease-in-out
        ${loading ? 'opacity-0' : 'opacity-100'} // Hide image until loaded
        ${className || ''}
      `}
      onLoad={() => setLoading(false)}
      onError={(e) => {
        setLoading(false); // Hide skeleton even on error
        e.currentTarget.onerror = null; // Prevent infinite loop
        e.currentTarget.src = fallbackSrc; // Fallback image
        console.error(`Failed to load image: ${src}. Displaying fallback.`); // Log the specific error
      }}
      priority={false}
    />
  ) : (
    <Image
      src={src}
      alt={alt}
      fill // Use fill when width/height are not explicitly provided
      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw" // Optimised sizes for artists photos
      className={`
        object-cover object-center rounded-t-2xl // Rounded top corners for image
        transition-opacity duration-500 ease-in-out
        ${loading ? 'opacity-0' : 'opacity-100'} // Hide image until loaded
        ${className || ''}
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
    <div className="relative w-full h-full">
      {imageElement}
      {loading && (
        <div className="absolute inset-0 bg-gray-700 animate-pulse rounded-t-2xl flex items-center justify-center">
          <span className="text-gray-400 text-sm">Loading Image...</span>
        </div>
      )}
    </div>
  );
}
