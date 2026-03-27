'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, Variants, Transition } from 'framer-motion';

const GOLDEN_YELLOW = '#FFD700';
const PRIMARY_YELLOW_TAILWIND = 'yellow-500';
const HOVER_YELLOW_TAILWIND = 'yellow-600';

const projects = [
  {
    title: "SAUTI: Gifted Different Unsilenced",
    slug: "sauti",
    image: "/projects/sauti.png",
    description: "A multimedia project featuring a documentary and music compilation exploring musicians with unique abilities.",
    category: "Documentaries",
  },
  {
    title: "Shades of Benga",
    slug: "shades-of-benga",
    image: "/projects/benga.jpg",
    description: "A comprehensive book and research project tracing the roots of Kenya's popular music from 1946 to 2016.",
    category: "Books & Research",
  },
  {
    title: "Uromo by Sali Oyugi",
    slug: "uromo",
    image: "/projects/uromo.jpg",
    description: "A soulful music project blending African traditions and contemporary songwriting.",
    category: "Music Projects",
  },
  {
    title: "Weapon of Mass Reconciliation",
    slug: "reconciliation",
    image: "/projects/reconciliation.jpg",
    description: "Music and outreach campaign that helped foster national healing after the 2008 post-election crisis.",
    category: "Social Impact",
  },
  {
    title: "Ohanglaman by Makadem",
    slug: "ohanglaman",
    image: "/projects/ohanglaman.jpg",
    description: "Makadem's debut album mixing Ohangla sounds with modern Afro-fusion.",
    category: "Music Projects",
  },
  {
    title: "Garissa Express by Gargar",
    slug: "garissa-express",
    image: "/projects/garissa.jpg",
    description: "A powerful album by the all-female group Gargar, celebrating Somali culture and identity.",
    category: "Music Projects",
  },
  {
    title: "Singing Wells",
    slug: "singing-wells",
    image: "/projects/wells.png",
    description: "An initiative to document, preserve, and promote traditional music from East Africa, focusing on cultural heritage.",
    category: "Documentaries",
  },
];

const allCategories = ["All", "Documentaries", "Books & Research", "Music Projects", "Social Impact"];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.98 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
      delay: i * 0.1,
      duration: 0.8,
    } as Transition,
  }),
};

interface ImageLoaderProps {
  src: string;
  alt: string;
}

function ImageLoader({ src, alt }: ImageLoaderProps) {
  const [loading, setLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState(src);
  const fallbackSrc = 'https://placehold.co/600x400/374151/DAA520?text=Image+Missing';

  React.useEffect(() => {
    setImageSrc(src);
    setLoading(true);
  }, [src]);

  return (
    <div className="relative w-full h-full">
      <Image
        src={imageSrc}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className={`object-cover object-center transition-opacity duration-500 ease-in-out ${loading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={() => setLoading(false)}
        onError={() => {
          setLoading(false);
          setImageSrc(fallbackSrc);
        }}
      />
      {loading && (
        <div className="absolute inset-0 bg-gray-700 animate-pulse rounded-t-2xl flex items-center justify-center">
          <span className="text-gray-400 text-sm">Loading...</span>
        </div>
      )}
    </div>
  );
}

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 py-16 px-4 sm:px-6 lg:px-8 font-inter">

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12 max-w-4xl mx-auto">
        {allCategories.map(category => (
          <motion.button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`
              px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ease-in-out
              ${selectedCategory === category
                ? 'bg-gradient-to-r from-yellow-500 to-amber-500 text-gray-900 shadow-md scale-105'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-700'
              }
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </motion.button>
        ))}
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.slug}
            className="bg-gradient-to-r from-gray-900 to-black rounded-2xl overflow-hidden shadow-2xl flex flex-col border-2 border-transparent relative group"
            initial="hidden"
            whileInView="visible"
            whileHover={{
              y: -8,
              scale: 1.03,
              boxShadow: `0 10px 20px rgba(0,0,0,0.4), 0 0 0 3px ${GOLDEN_YELLOW}`,
              transition: { type: "spring", stiffness: 350, damping: 25 },
            }}
            viewport={{ once: false, amount: 0.15 }}
            variants={cardVariants}
            custom={index}
          >
            {/* IMAGE — clickable */}
            <Link href={`/projects/${project.slug}`} className="block">
              <div className="relative w-full h-64 overflow-hidden cursor-pointer">
                <ImageLoader src={project.image} alt={project.title} />
                {/* Gradient overlay */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-gray-900 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </Link>

            {/* CONTENT */}
            <div className="p-6 flex flex-col flex-grow items-start">
              <h2 className="text-2xl font-bold mb-3 font-josefin-sans text-white text-left leading-snug">
                {project.title}
              </h2>

              <p className="text-gray-300 text-base leading-relaxed flex-grow line-clamp-3 text-left">
                {project.description}
              </p>

              {/* View Project link */}
              <Link
                href={`/projects/${project.slug}`}
                className={`mt-6 inline-flex items-center text-${PRIMARY_YELLOW_TAILWIND} hover:text-${HOVER_YELLOW_TAILWIND} font-semibold transition-colors duration-200`}
              >
                View Project
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

          </motion.div>
        ))}
      </div>
    </main>
  );
}