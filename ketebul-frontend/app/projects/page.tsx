'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, Variants, Transition } from 'framer-motion';
import { useState } from 'react'; // Needed for ImageLoader's useState

// Define your projects data
const projects = [
  {
    title: "SAUTI: Gifted Different Unsilenced",
    slug: "sauti",
    image: "/projects/sauti.png",
    description: "A multimedia project featuring a documentary and music compilation exploring musicians with unique abilities.",
  },
  {
    title: "Shades of Benga",
    slug: "shades-of-benga",
    image: "/projects/benga.jpg",
    description: "A comprehensive book and research project tracing the roots of Kenya’s popular music from 1946 to 2016.",
  },
  {
    title: "Uromo by Sali Oyugi",
    slug: "uromo",
    image: "/projects/uromo.jpg",
    description: "A soulful music project blending African traditions and contemporary songwriting.",
  },
  {
    title: "Weapon of Mass Reconciliation",
    slug: "reconciliation",
    image: "/projects/reconciliation.jpg",
    description: "Music and outreach campaign that helped foster national healing after the 2008 post-election crisis.",
  },
  {
    title: "Ohanglaman by Makadem",
    slug: "ohanglaman",
    image: "/projects/ohanglaman.jpg",
    description: "Makadem's debut album mixing Ohangla sounds with modern Afro-fusion.",
  },
  {
    title: "Garissa Express by Gargar",
    slug: "garissa-express",
    image: "/projects/garissa.jpg",
    description: "A powerful album by the all-female group Gargar, celebrating Somali culture and identity.",
  },
];

// Framer Motion variants for card entry animation
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.98 }, // Start slightly less far down, slightly less scaled
  visible: (i: number) => ({ // Staggered entry
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 90,   // Adjusted stiffness for a slower, more fluid spring
      damping: 18,     // Adjusted damping for less oscillation and smoother landing
      delay: i * 0.2,  // Increased stagger delay for a more pronounced "one by one" flow
      duration: 1.0,   // Increased overall duration for a noticeably slower animation
    } as Transition,
  }),
};

// Framer Motion variants for card hover animation
const hoverVariants: Variants = {
  lift: {
    y: -8, // Lift slightly less
    scale: 1.03, // Enlarge slightly less, but still noticeable
    boxShadow: "0 10px 20px rgba(0,0,0,0.4), 0 0 0 3px rgba(253, 224, 71, 0.6)", // Stronger shadow and a clear golden glow
    transition: {
      type: "spring",
      stiffness: 300, // Still immediate hover response
      damping: 18
    } as Transition,
  }
};

export default function ProjectsPage() {
  return (
    // Main container for the projects page
    <main className="min-h-screen bg-gray-950 text-gray-100 py-16 px-4 sm:px-6 lg:px-8 font-inter">
      {/* Removed: The motion.h1 element for the main title */}
      {/*
      <motion.h1
        className="text-center text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-16 font-josefin-sans text-yellow-300 drop-shadow-md"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        Our Creative Projects
      </motion.h1>
      */}

      {/* Project Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {projects.map((project, index) => (
          <motion.div
            key={project.slug} // Use slug as key, it's unique
            className="bg-gray-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-full cursor-pointer border-2 border-transparent relative group"
            initial="hidden"
            whileInView="visible"
            whileHover="lift"
            viewport={{ once: false, amount: 0.15 }} // Always animate when in view
            variants={cardVariants}
            custom={index} // Pass index for staggered delay
          >
            {/* Image Container with Skeleton Loader and Gradient Overlay */}
            <div className="relative w-full h-64 sm:h-80 lg:h-96 overflow-hidden flex-shrink-0">
              <ImageLoader src={project.image} alt={project.title} />
              {/* Gradient overlay to blend image into card background */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-gray-900 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Content Area */}
            <div className="p-6 flex flex-col flex-grow">
              <h2 className="text-2xl font-semibold mb-3 font-josefin-sans text-white leading-snug"> {/* Changed text-yellow-300 to text-white */}
                {project.title}
              </h2>
              <p className="text-gray-300 text-base leading-relaxed flex-grow line-clamp-4">
                {project.description}
              </p>
              <Link href={`/projects/${project.slug}`} className="mt-6 inline-flex items-center text-yellow-400 hover:text-yellow-200 font-semibold transition-colors duration-200 group-hover:translate-x-1">
                View Project
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

// Separate component for Image with Skeleton Loader (copied for self-containment)
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
          object-cover object-center rounded-t-2xl // Rounded top corners for image
          transition-opacity duration-500 ease-in-out
          ${loading ? 'opacity-0' : 'opacity-100'} // Hide image until loaded
        `}
        onLoad={() => setLoading(false)}
        onError={(e) => {
          setLoading(false); // Hide skeleton even on error
          e.currentTarget.onerror = null; // Prevent infinite loop
          e.currentTarget.src = "/placeholder.png"; // Fallback image
        }}
        priority={false} // Only critical images on homepage need priority
      />
      {loading && (
        <div className="absolute inset-0 bg-gray-700 animate-pulse rounded-t-2xl flex items-center justify-center">
          <span className="text-gray-400 text-sm">Loading Image...</span>
        </div>
      )}
    </div>
  );
}
