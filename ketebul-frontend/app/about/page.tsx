'use client';

import Image from 'next/image';
import { motion, Variants, Transition } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';

// --- Global Theme & Color Constants ---
const PRIMARY_YELLOW = 'yellow-500';
const HOVER_YELLOW = 'yellow-600';

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
    } as Transition,
  }),
  lift: {
    y: -10,
    scale: 1.04,
    boxShadow: `0 12px 25px rgba(0,0,0,0.4), 0 0 0 4px rgba(245, 158, 11, 0.6)`,
    transition: {
      type: "spring",
      stiffness: 350,
      damping: 25
    } as Transition,
  }
};

// --- ImageLoader Component ---
interface ImageLoaderProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  objectFit?: 'cover' | 'contain';
}

function ImageLoader({ src, alt, width, height, className, objectFit = 'cover' }: ImageLoaderProps) {
  const [loading, setLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState(src);

  const fallbackSrc = "https://placehold.co/200x200/525252/b3b3b3?text=Image+Missing";

  useEffect(() => {
    setImageSrc(src);
    setLoading(true);
  }, [src]);

  const handleError = () => {
    setLoading(false);
    setImageSrc(fallbackSrc);
  };

  const handleLoad = () => {
    setLoading(false);
  };

  const effectiveClassName = `
    ${objectFit === 'cover' ? 'object-cover' : 'object-contain'} object-center
    ${className || ''}
    transition-opacity duration-500 ease-in-out
    ${loading ? 'opacity-0' : 'opacity-100'}
  `;

  const imageElement = width && height ? (
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
          <span className="text-gray-400 text-sm">Loading...</span>
        </div>
      )}
    </div>
  );
}

// --- Data for About Page Sections ---
const missionsAndValues = [
  {
    title: "Identify",
    description: "Actively seek out and recognize the diverse music traditions across East Africa, focusing on both established genres and endangered sounds.",
  },
  {
    title: "Preserve & Conserve",
    description: "Meticulously document, record, and archive musical works, oral histories, and cultural contexts to ensure the long-term survival of East African music heritage.",
  },
  {
    title: "Promote",
    description: "Champion East African artists and their music on local, national, and international platforms, fostering appreciation and creating new opportunities.",
  },
];

const corePillars = [
  {
    title: "Community Engagement",
    description: "Deeply connect with local communities to discover and nurture musical talent, ensuring cultural relevance and sustainable growth from the grassroots.",
  },
  {
    title: "Artist Empowerment",
    description: "Provide comprehensive support to artists, including training, production facilities, legal guidance, and market access, enabling them to thrive creatively and economically.",
  },
  {
    title: "Digital Archiving",
    description: "Utilize cutting-edge digital tools to meticulously document and preserve East Africa's diverse musical heritage, making it accessible to global audiences and future generations.",
  },
  {
    title: "Global Collaboration",
    description: "Forge international partnerships to promote East African music worldwide, facilitate cultural exchange, and create new opportunities for our artists on global stages.",
  },
];

const featuredCollaborations = [
  {
    title: "The Singing Wells Project",
    slug: "singing-wells",
    image: "/projects/wells.png",
    description: "A significant collaboration documenting, preserving, and promoting traditional East African music through extensive field recordings and digital archiving.",
    link: "https://www.youtube.com/@singingwells",
    isExternal: true,
  },
  {
    title: "Shades of Benga",
    slug: "shades-of-benga",
    image: "/projects/benga.jpg",
    description: "A comprehensive project tracing the roots of Kenya’s popular Benga music from 1946 to 2016, enriching our understanding of its evolution.",
    link: "/projects/shades-of-benga",
    isExternal: false,
  },
  {
    title: "Ohanglaman by Makadem",
    slug: "ohanglaman",
    image: "/projects/ohanglaman.jpg",
    description: "Makadem's vibrant debut album, a powerful blend of traditional Luo rhythms and contemporary Afro-fusion sounds, captivating audiences.",
    link: "/projects/ohanglaman",
    isExternal: false,
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-r from-gray-900 to-black text-gray-100 py-16 px-4 sm:px-6 lg:px-8 font-inter">

      {/* Introduction Section */}
      <section className="max-w-7xl mx-auto mb-16 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-start"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 font-josefin-sans text-white text-left">Introduction</h2>
            <p className="text-gray-300 leading-relaxed mb-4 text-left">
              Ketebul Music is a not-for-profit non-governmental organization based at the GoDown Arts Centre in Nairobi, Kenya.
            </p>
            <p className="text-gray-300 leading-relaxed text-left">
              The word &quot;Ketebul&quot; means &quot;drum sticks&quot;; it is derived from the Luo language of Western Kenya. This name was a natural choice for an organization that has a vision of an African society that celebrates its cultural identity and also recognizes the special role that artistes play every day in people&apos;s lives.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative w-full h-80 rounded-xl overflow-hidden shadow-2xl">
              <ImageLoader src="/55.JPG" alt="Ketebul Music Introduction" objectFit="contain" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="max-w-7xl mx-auto mb-16 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            className="md:order-2 flex flex-col items-start"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 font-josefin-sans text-white text-left">Our Story</h2>
            <p className="text-gray-300 leading-relaxed mb-4 text-left">
              Ketebul Music was established in early 2007 with the ambitious vision to carry out research and promote the diverse fusion of traditional sounds of Kenya and East Africa through the documentation and archiving of the work of musicians who have shaped the various genres of music from the region over the past six decades.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4 text-left">
              In broader terms, intensive research carried out by Ketebul Music involves the musicians themselves, their families, industry players such as producers and promoters, media personalities, and the market audience.
            </p>
            <p className="text-gray-300 leading-relaxed text-left">
              Memorable archiving is achieved through intensive academic research reports released along with a market-friendly package from each phase of research. The package comprises a shorter, but succinct, popular version of the academic report and is contained in an attractively designed booklet. To reinforce it is an audio CD featuring re-releases of previous recordings along with a video documentary carrying intensive interviews, analyses, stage performances, and archive footage.
            </p>
          </motion.div>
          <motion.div
            className="md:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative w-full h-80 rounded-xl overflow-hidden shadow-2xl">
              <ImageLoader src="/story.jpg" alt="Ketebul Music Our Story" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="max-w-7xl mx-auto mb-16 py-8">
        <h2 className="text-center text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-12 font-josefin-sans text-white drop-shadow-md">
          Mission & Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {missionsAndValues.map((item, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-r from-gray-900 to-black p-8 rounded-2xl shadow-2xl flex flex-col items-start cursor-pointer border-2 border-transparent relative group"
              initial="hidden"
              whileInView="visible"
              whileHover="lift"
              viewport={{ once: false, amount: 0.15 }}
              variants={cardVariants}
              custom={index}
            >
              <h3 className={`text-xl font-semibold mb-4 font-josefin-sans text-${PRIMARY_YELLOW} text-left`}>
                {item.title}
              </h3>
              <p className="text-gray-300 text-left leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Core Pillars Section */}
      <section className="max-w-7xl mx-auto mb-16 py-8">
        <h2 className="text-center text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-12 font-josefin-sans text-white drop-shadow-md">
          Core Pillars
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {corePillars.map((item, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-r from-gray-900 to-black p-8 rounded-2xl shadow-2xl flex flex-col items-start cursor-pointer border-2 border-transparent relative group"
              initial="hidden"
              whileInView="visible"
              whileHover="lift"
              viewport={{ once: false, amount: 0.15 }}
              variants={cardVariants}
              custom={index}
            >
              <h3 className={`text-xl font-semibold mb-4 font-josefin-sans text-${PRIMARY_YELLOW} text-left`}>
                {item.title}
              </h3>
              <p className="text-gray-300 text-left leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* The Studios Section */}
      <section className="max-w-7xl mx-auto mb-16 py-8">
        <h2 className="text-center text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-12 font-josefin-sans text-white drop-shadow-md">
          The Studios
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-start"
          >
            <p className="text-gray-300 leading-relaxed mb-4 text-left">
              Located in Tena Estate, Eastlands Nairobi, Ketebul Music is proud to host two fully equipped analogue and digital studios. These facilities are designed to cater to a wide range of audio production needs, from intricate traditional recordings to modern, high-fidelity sound engineering.
            </p>
            <p className="text-gray-300 leading-relaxed text-left">
              Our studios provide a creative and professional environment where artists can bring their musical visions to life, ensuring exceptional sound quality and a seamless recording experience.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative w-full h-80 rounded-xl overflow-hidden shadow-2xl">
              <ImageLoader src="/back2.jpg" alt="Ketebul Music Studio Interior" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Production Wing Section */}
      <section className="max-w-7xl mx-auto mb-16 py-8">
        <h2 className="text-center text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-12 font-josefin-sans text-white drop-shadow-md">
          Video Production Wing
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            className="md:order-2 flex flex-col items-start"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-gray-300 leading-relaxed mb-4 text-left">
              Ketebul Music operates a dedicated video production wing specializing in research-based documentaries. Our focus is on chronicling the origins, development, and cultural significance of traditional sounds, music, and the broader culture of East Africa.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4 text-left">
              These documentaries form an integral part of the cultural archives that Ketebul Music meticulously maintains. Through this audiovisual repository, we process and store invaluable material on the evolution of East African music genres.
            </p>
          </motion.div>
          <motion.div
            className="md:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative w-full h-80 rounded-xl overflow-hidden shadow-2xl">
              <ImageLoader src="/46.JPG" alt="Ketebul Music Video Production" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="max-w-7xl mx-auto mb-16 py-8">
        <h2 className="text-center text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-12 font-josefin-sans text-white drop-shadow-md">
          Projects by Ketebul Music
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCollaborations.map((project, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-r from-gray-900 to-black rounded-2xl overflow-hidden shadow-2xl flex flex-col h-full cursor-pointer border-2 border-transparent relative group"
              initial="hidden"
              whileInView="visible"
              whileHover="lift"
              viewport={{ once: false, amount: 0.15 }}
              variants={cardVariants}
              custom={index}
            >
              <div className="relative w-full h-96 flex-shrink-0 overflow-hidden rounded-xl">
                <ImageLoader src={project.image} alt={project.title} />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-gray-900 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="p-6 flex flex-col flex-grow items-start">
                <div className="flex flex-col h-20 justify-center w-full">
                  <h3 className="text-2xl font-semibold font-josefin-sans text-white text-left leading-snug">
                    {project.title}
                  </h3>
                </div>
                <p className="text-gray-300 text-base leading-relaxed flex-grow line-clamp-4 text-left">
                  {project.description}
                </p>
                {project.isExternal ? (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className={`mt-6 inline-flex items-center text-${PRIMARY_YELLOW} hover:text-${HOVER_YELLOW} font-semibold transition-colors duration-200 group-hover:translate-x-1`}>
                    Visit Project &rarr;
                  </a>
                ) : (
                  <Link href={project.link} className={`mt-6 inline-flex items-center text-${PRIMARY_YELLOW} hover:text-${HOVER_YELLOW} font-semibold transition-colors duration-200 group-hover:translate-x-1`}>
                    Explore Project &rarr;
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}