"use client"; // This directive marks this file as a Client Component

import Image from 'next/image'; // Import Image for optimized images
import React from 'react'; // Import React
import { motion, Variants } from 'framer-motion'; // Import motion for animations

// --- Global Theme & Color Constants ---
const GOLDEN_YELLOW = '#FFD700'; // Pure Golden Yellow (Gold)
const HOVER_GOLDEN_YELLOW = '#E5BE00'; // Slightly darker for hover states (Darker Gold)

// Framer Motion variants for section entry animation
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' }
  },
};

// Framer Motion variants for card entry animation
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 12,
      delay: i * 0.1,
      duration: 0.8,
    },
  }),
  lift: { // Variant for hover effect
    y: -5,
    scale: 1.01,
    boxShadow: `0 8px 16px rgba(0,0,0,0.3), 0 0 0 3px ${GOLDEN_YELLOW}`,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    },
  },
};

// ImageLoader component to handle image loading states and fallbacks
interface ImageLoaderProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

function ImageLoader({ src, alt, width, height, className }: ImageLoaderProps) {
  const [loading, setLoading] = React.useState(true);

  // Fallback placeholder image in case the original is not found (404)
  // Text color is now a golden shade for consistency
  const fallbackSrc = 'https://placehold.co/600x400/374151/DAA520?text=Image+Missing';

  const imageElement = width && height ? (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes="(max-width: 768px) 100vw, 33vw" // Responsive sizes for performance
      className={`
        object-cover object-center
        transition-opacity duration-500 ease-in-out
        ${loading ? 'opacity-0' : 'opacity-100'}
        ${className || ''}
      `}
      onLoad={() => setLoading(false)}
      onError={(e) => {
        setLoading(false);
        e.currentTarget.onerror = null; // Prevent infinite loop if fallback also fails
        e.currentTarget.src = fallbackSrc;
        console.error(`Failed to load image: ${src}. Displaying fallback.`);
      }}
      priority={false} // Adjust priority as needed
    />
  ) : (
    <Image
      src={src}
      alt={alt}
      fill // Use fill for responsive image within container
      sizes="(max-width: 768px) 100vw, 33vw" // Responsive sizes for performance
      className={`
        object-cover object-center
        transition-opacity duration-500 ease-in-out
        ${loading ? 'opacity-0' : 'opacity-100'}
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
        <div className={`absolute inset-0 bg-gray-700 animate-pulse flex items-center justify-center ${className || ''}`}>
          <span className="text-gray-400 text-sm">Loading...</span>
        </div>
      )}
    </div>
  );
}

// --- Updates Data ---
const updatesData = [
  {
    id: 1,
    title: "Book Launch – ANYANGO NYAR SIAYA (Nyatiti Queen)",
    description: "This September, Anyango Nyar Siaya from Japan returns to Kenya to launch her book 'ANYANGO(.) NYAR SIAYA (Nyatiti Queen)' and perform in Nairobi and Kisumu. Wednesday, 17 Sept – book launch at Alliance Francaise Nairobi. Thursday, 18 Sept – Soko Cafe (backed by Makadem). Saturday, 20 Sept – Thrego Hall Cafe, Kisumu (backed by Sango Soul). The book will be available from Nuria Bookstore and Ketebul Music. All shows are free. Come and experience the nyatiti with the first woman from outside the Luo community to play it professionally.",
    date: "08 AUG 2025", // Updated date from screenshot
    venue: "Various locations in Nairobi & Kisumu", // Updated venue to be more specific
    image: "/nyar.jpeg", // Path to image in public folder
    buttonText: "More Details",
    action: () => console.log("Book Launch details are available!"),
  },
  {
    id: 2,
    title: "Shades of Benga Online – Episode 2: The Congo Connection & Nairobi Social Halls",
    description: "We’re back again this Wednesday 23 September @ 8:00PM EAT (+3GMT) with #shadesofbenga online episode 2. We travel back in time and see how a couple of Congolese guitarists influenced Kenyan popular music in the 1950s. Join us on our YouTube channel KETEBULMUSIC and Facebook page ketebulmusic to watch this episode. CLICK HERE to schedule and to view the episode.",
    date: "23 SEP 2020", // Updated date from screenshot
    venue: "YouTube & Facebook Live",
    image: "/up.png", // Path to image in public folder
    buttonText: "View Episode on Youtube", // Changed button text
    action: () => window.open("https://youtu.be/H8JbCzcMzyk?si=xWbiddoqGyF1vWzR", "_blank"), // Added YouTube link
  },
];


export default function UpdatesContent() {
  return (
    // Main container uses a deep dark gradient background for the entire section.
    <div className="flex flex-col items-center min-h-screen p-4 sm:p-8 bg-gradient-to-r from-gray-950 to-black font-inter text-gray-100 w-full">
      {/* Tailwind CSS CDN for Canvas preview - typically in _app.js or _document.js for Next.js */}
      <script src="https://cdn.tailwindcss.com"></script>

      <motion.div
        className="w-full max-w-6xl mx-auto bg-gradient-to-br from-gray-900 to-gray-950 p-6 sm:p-10 rounded-xl shadow-2xl border border-gray-700"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-12 tracking-tight" style={{ color: GOLDEN_YELLOW }}>
          Latest Updates
        </h1>

        <div className="space-y-10">
          {updatesData.map((update, index) => (
            <motion.div
              key={update.id}
              className="flex flex-col md:flex-row bg-gradient-to-br from-gray-800 to-gray-950 rounded-xl shadow-lg overflow-hidden border border-gray-700 transition-transform duration-300"
              initial="hidden"
              whileInView="visible"
              whileHover="lift"
              viewport={{ once: true, amount: 0.1 }}
              variants={cardVariants}
              custom={index}
            >
              {/* Date Column (Left) */}
              {/* This column displays the date in a prominent, left-aligned, white text format */}
              <div className="w-full md:w-32 flex flex-row md:flex-col items-center justify-center p-4 bg-gray-900 border-b md:border-b-0 md:border-r border-gray-700 flex-shrink-0 rounded-t-xl md:rounded-tr-none md:rounded-bl-xl md:h-72">
                <span className="text-4xl font-extrabold text-white">{update.date.substring(0, 2)}</span> {/* Day */}
                <span className="text-xl uppercase text-white tracking-wider ml-2 md:ml-0 md:mt-1">{update.date.substring(3, 6)}</span> {/* Month */}
                <span className="text-lg font-semibold text-white md:mt-1">{update.date.substring(7, 11)}</span> {/* Year */}
              </div>

              {/* Main Content Area (Image + Description) - takes remaining width */}
              <div className="flex-grow flex flex-col md:flex-row">
                {/* Image Section */}
                {/* Image takes half the remaining width on desktop and has a fixed height */}
                <div className="md:w-1/2 flex-shrink-0 relative h-56 md:h-72">
                  <ImageLoader src={update.image} alt={update.title} className="object-cover rounded-tr-xl md:rounded-bl-none" />
                  {/* Subtle gradient overlay for image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                </div>

                {/* Content Section (Description, Venue text, Button) */}
                {/* Content takes the other half of the remaining width on desktop */}
                <div className="flex-grow p-6 flex flex-col justify-between md:w-1/2">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-snug">
                      {update.title}
                    </h2>
                    <p className="text-gray-300 leading-relaxed mb-4 line-clamp-4">
                      {update.description}
                    </p>
                    {/* Displaying venue only, as date is now prominently on the left */}
                    <p className="text-sm text-gray-400 font-medium">
                      <span style={{ color: GOLDEN_YELLOW }}>Venue:</span> {update.venue}
                    </p>
                  </div>
                  <motion.button
                    className="mt-6 px-8 py-3 text-gray-900 font-bold rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-950"
                    style={{
                      backgroundColor: GOLDEN_YELLOW,
                      boxShadow: `0 4px 15px rgba(255, 215, 0, 0.4)`,
                    }}
                    whileHover={{ backgroundColor: HOVER_GOLDEN_YELLOW, boxShadow: `0 6px 20px rgba(255, 215, 0, 0.6)` }}
                    whileTap={{ scale: 0.95 }}
                    onClick={update.action}
                  >
                    {update.buttonText}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
