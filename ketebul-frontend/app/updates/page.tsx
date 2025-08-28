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
  className?: string; // Added className to allow overriding object-fit
}

function ImageLoader({ src, alt, width, height, className }: ImageLoaderProps) {
  const [loading, setLoading] = React.useState(true);
  const [imageSrc, setImageSrc] = React.useState(src); // State to manage image source, especially for fallback

  // Fallback placeholder image in case the original is not found (404)
  const fallbackSrc = 'https://placehold.co/600x400/374151/DAA520?text=Image+Missing';

  React.useEffect(() => {
    setImageSrc(src); // Update imageSrc when prop changes
    setLoading(true); // Reset loading state
  }, [src]);

  const handleError = () => {
    setLoading(false); // Hide skeleton even on error
    setImageSrc(fallbackSrc); // Set fallback image source
    console.error(`Failed to load image: ${src}. Displaying fallback.`);
  };

  const handleLoad = () => {
    setLoading(false);
  };

  // Determine object-fit based on whether specific className is provided,
  // defaulting to object-cover if not explicitly overridden, or object-contain for flyer-like images.
  const effectiveClassName = `
    ${className || 'object-cover'} object-center
    transition-opacity duration-500 ease-in-out
    ${loading ? 'opacity-0' : 'opacity-100'}
  `;

  const imageElement = width && height ? (
    <Image
      src={imageSrc} // Use state-managed imageSrc
      alt={alt} // Pass alt prop
      width={width}
      height={height}
      sizes="(max-width: 768px) 100vw, 33vw" // Responsive sizes for performance
      className={effectiveClassName}
      onLoad={handleLoad}
      onError={handleError}
      priority={false} // Adjust priority as needed
    />
  ) : (
    <Image
      src={imageSrc} // Use state-managed imageSrc
      alt={alt} // Pass alt prop
      fill // Use fill for responsive image within container
      sizes="(max-width: 768px) 100vw, 33vw" // Responsive sizes for performance
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
        <div className="absolute inset-0 bg-gray-700 animate-pulse rounded-t-xl md:rounded-l-xl md:rounded-tr-none flex items-center justify-center">
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
    description: [
      { type: 'paragraph', content: "This September, Anyango Nyar Siaya from Japan returns to Kenya to launch her book 'ANYANGO(.) NYAR SIAYA (Nyatiti Queen)' and perform in Nairobi and Kisumu. Key events include:" },
      { type: 'bullet', content: "**Wednesday, 17 Sept:** Book launch at Alliance Francaise Nairobi." },
      { type: 'bullet', content: "**Thursday, 18 Sept:** Performance at Soko Cafe (backed by Makadem)." },
      { type: 'bullet', content: "**Saturday, 20 Sept:** Performance at Thrego Hall Cafe, Kisumu (backed by Sango Soul)." },
      { type: 'paragraph', content: "The book will be available from Nuria Bookstore and Ketebul Music. All shows are free. Come and experience the nyatiti with the first woman from outside the Luo community to play it professionally." }
    ],
    date: "08 AUG 2025",
    venue: "Various locations in Nairobi & Kisumu",
    image: "/nyar.jpg", // Path to image in public folder
    buttonText: "More Details",
    action: () => console.log("Book Launch details are available!"),
  },
  {
    id: 2,
    title: "Shades of Benga Online – Episode 2: The Congo Connection & Nairobi Social Halls",
    description: [
      { type: 'paragraph', content: "We’re back again this Wednesday 23 September @ 8:00PM EAT (+3GMT) with **#shadesofbenga** online episode 2." },
      { type: 'paragraph', content: "We travel back in time and see how a couple of Congolese guitarists influenced Kenyan popular music in the 1950s. Discover the fascinating 'Congo Connection' and the vibrant atmosphere of Nairobi's social halls during that era." },
      { type: 'paragraph', content: "Join us on our YouTube channel **KETEBULMUSIC** and Facebook page **ketebulmusic** to watch this episode. Click the button below to schedule and view the episode." }
    ],
    date: "23 SEP 2020",
    venue: "YouTube & Facebook Live",
    image: "/up.png", // Path to image in public folder (assuming 'up.png' is the correct path for the second image)
    buttonText: "View Episode on Youtube", // Changed button text
    action: () => window.open("https://youtu.be/H8JbCzcMzyk?si=xWbiddoqGy1vWzR", "_blank"), // Added YouTube link
  },
];


export default function UpdatesPage() {
  return (
    <div className="flex flex-col items-center min-h-screen p-4 sm:p-8 bg-gradient-to-r from-gray-950 to-black font-inter text-gray-100 w-full">
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
              <div className="w-full md:w-32 flex flex-row md:flex-col items-center justify-center p-4 bg-gray-900 border-b md:border-b-0 md:border-r border-gray-700 flex-shrink-0 rounded-t-xl md:rounded-tr-none md:rounded-bl-xl md:h-[450px]">
                <span className="text-4xl font-extrabold text-white">{update.date.substring(0, 2)}</span>
                <span className="text-xl uppercase text-white tracking-wider ml-2 md:ml-0 md:mt-1">{update.date.substring(3, 6)}</span>
                <span className="text-lg font-semibold text-white md:mt-1">{update.date.substring(7, 11)}</span>
              </div>

              {/* Main Content Area (Image + Description) */}
              <div className="flex-grow flex flex-col md:flex-row">
                {/* Image Section */}
                <div className="md:w-1/2 flex-shrink-0 relative h-[350px] md:h-[450px]">
                  {/* Changed object-cover to object-contain for the first image (flyer) to ensure all content is visible */}
                  <ImageLoader
                    src={update.image}
                    alt={update.title}
                    className={update.id === 1 ? "object-contain rounded-tr-xl md:rounded-bl-none" : "object-cover rounded-tr-xl md:rounded-bl-none"}
                  />
                  {/* Subtle gradient overlay for image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                </div>

                {/* Content Section (Description, Venue text, Button) */}
                <div className="flex-grow p-6 flex flex-col justify-between md:w-1/2">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-snug">
                      {update.title}
                    </h2>
                    {/* Render structured description */}
                    <div className="text-gray-300 leading-relaxed mb-4">
                      {update.description.map((item, itemIndex) => {
                        if (item.type === 'paragraph') {
                          // Use dangerouslySetInnerHTML to render bold markdown within paragraphs
                          const parsedContent = item.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                          return <p key={itemIndex} className="mb-2 last:mb-0" dangerouslySetInnerHTML={{ __html: parsedContent }}></p>;
                        } else if (item.type === 'bullet') {
                          // Use dangerouslySetInnerHTML to render bold markdown within list items
                          const parsedContent = item.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                          return (
                            <ul key={itemIndex} className="list-disc pl-5 mt-1">
                              <li dangerouslySetInnerHTML={{ __html: parsedContent }}></li>
                            </ul>
                          );
                        }
                        return null;
                      })}
                    </div>
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
