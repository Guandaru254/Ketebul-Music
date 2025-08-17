'use client';

import Image from 'next/image';
import { motion, Variants, Transition } from 'framer-motion';
import { useState } from 'react'; // Needed for ImageLoader's useState
import Link from 'next/link'; // Added for project links

// Framer Motion variants for card entry animation
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.98 },
  visible: (i: number) => ({ // Staggered entry
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 60,
      damping: 22,
      delay: i * 0.3,
      duration: 1.5,
    } as Transition,
  }),
};

// Framer Motion variants for card hover animation
const hoverVariants: Variants = {
  lift: {
    y: -8,
    scale: 1.03,
    boxShadow: "0 10px 20px rgba(0,0,0,0.4), 0 0 0 3px rgba(253, 224, 71, 0.6)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 18
    } as Transition,
  }
};

const missionsAndValues = [
  {
    title: "Preservation",
    description: "Documenting and archiving East African musical heritage for future generations.",
  },
  {
    title: "Development",
    description: "Nurturing local talent through training, mentorship, and production support.",
  },
  {
    title: "Promotion",
    description: "Showcasing East African artists and music on national and international stages.",
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
    slug: "singing-wells", // Added slug for link
    image: "/projects/wells.png", // New image path as provided by user
    description: "A significant collaboration documenting, preserving, and promoting traditional East African music through extensive field recordings and digital archiving.",
    link: "https://www.youtube.com/@singingwells", // Direct YouTube link as provided
    isExternal: true, // Flag for external link
  },
  {
    title: "Shades of Benga",
    slug: "shades-of-benga",
    image: "/projects/benga.jpg", // Placeholder, assuming path from projects page
    description: "A comprehensive project tracing the roots of Kenya’s popular Benga music from 1946 to 2016, enriching our understanding of its evolution.",
    link: "/projects/shades-of-benga", // Internal link to projects page
    isExternal: false,
  },
  {
    title: "Ohanglaman by Makadem",
    slug: "ohanglaman",
    image: "/projects/ohanglaman.jpg", // Placeholder, assuming path from projects page
    description: "Makadem's vibrant debut album, a powerful blend of traditional Luo rhythms and contemporary Afro-fusion sounds, captivating audiences.",
    link: "/projects/ohanglaman", // Internal link to projects page
    isExternal: false,
  },
];


export default function AboutPage() {
  return (
    // Main container for the About page, using the consistent gradient background
    <main className="min-h-screen bg-gradient-to-r from-gray-900 to-black text-gray-100 py-16 px-4 sm:px-6 lg:px-8 font-josefin-sans">
      {/* About Us Section - Our Vision */}
      <section className="max-w-7xl mx-auto mb-16 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-start" // Ensure text is left-aligned
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 font-josefin-sans text-white text-left">Our Vision</h2>
            <p className="text-gray-300 leading-relaxed mb-4 text-left">
              Ketebul Music envisions a future where the rich musical tapestry of East Africa is not only preserved but thrives globally, inspiring new generations and fostering cultural exchange. We believe in the power of music to bridge divides and celebrate the unique identities of our communities.
            </p>
            <p className="text-gray-300 leading-relaxed text-left">
              We are committed to empowering artists, documenting historical narratives through sound, and creating sustainable ecosystems for music professionals across the region.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Image styled like team/artist photos */}
            <div className="relative w-full h-80 rounded-xl overflow-hidden shadow-2xl">
              <ImageLoader src="/studio.jpg" alt="Ketebul Music Studio" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="max-w-7xl mx-auto mb-16 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            className="md:order-2 flex flex-col items-start" // Order for desktop layout, ensure left-aligned
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 font-josefin-sans text-white text-left">Our Story</h2>
            <p className="text-gray-300 leading-relaxed mb-4 text-left">
              Founded on the belief that music is the soul of a culture, Ketebul Music began its journey with a passion for unearthing and preserving the rich, untold musical stories of East Africa. From humble beginnings, our dedicated team embarked on expeditions across diverse landscapes, recording the melodies and narratives of forgotten artists and endangered musical traditions.
            </p>
            <p className="text-gray-300 leading-relaxed text-left">
              Over the years, we have grown into a pivotal force in the regional music scene, not just as a repository of heritage but as a vibrant hub for contemporary artistry. We champion innovation while honoring tradition, ensuring that the legacy of East African music continues to evolve and resonate globally.
            </p>
          </motion.div>
          <motion.div
            className="md:order-1" // Order for desktop layout
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Image styled like team/artist photos */}
            <div className="relative w-full h-80 rounded-xl overflow-hidden shadow-2xl">
              <ImageLoader src="/story.jpg" alt="Ketebul Music Story" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Values Section - now using consistent card styling */}
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
              <h3 className="text-xl font-semibold mb-4 font-josefin-sans text-yellow-300 text-left">
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
              Located in **Tena Estate**, Ketebul Music is proud to host **two fully equipped analogue and digital studios**. These facilities are designed to cater to a wide range of audio production needs, from intricate traditional recordings to modern, high-fidelity sound engineering.
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
            {/* Image for Studio section - now using studio2.jpg */}
            <div className="relative w-full h-80 rounded-xl overflow-hidden shadow-2xl">
              <ImageLoader src="/studio2.jpg" alt="Ketebul Music Studio Interior" />
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
              Ketebul Music operates a dedicated **video production wing** specializing in **research-based documentaries**. Our focus is on chronicling the origins, development, and cultural significance of traditional sounds, music, and the broader culture of East Africa.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4 text-left">
              These documentaries form an integral part of the **cultural archives** that Ketebul Music meticulously maintains. Through this audiovisual repository, we process and store invaluable material on the evolution of East African music genres.
            </p>
            <p className="text-gray-300 leading-relaxed text-left">
              Beyond documentaries, we offer comprehensive services for the **production of high-quality music videos**. Our expert editing team is equipped with a **Mac M1 running Final Cut Pro and Adobe Premiere 2021**, ensuring professional and polished visual content.
            </p>
          </motion.div>
          <motion.div
            className="md:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Image for Video Production section - now using studio.jpg */}
            <div className="relative w-full h-80 rounded-xl overflow-hidden shadow-2xl">
              <ImageLoader src="/studio.jpg" alt="Ketebul Music Video Production" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Collaborations Section */}
      <section className="max-w-7xl mx-auto mb-16 py-8">
        <h2 className="text-center text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-12 font-josefin-sans text-white drop-shadow-md">
          Featured Collaborations
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
              {/* Image Container with Skeleton Loader and Gradient Overlay - NOW h-56 */}
              <div className="relative w-full h-56 flex-shrink-0 overflow-hidden"> {/* Added overflow-hidden here */}
                <ImageLoader src={project.image} alt={project.title} />
                {/* Gradient overlay to blend image into card background */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-gray-900 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Content Area */}
              <div className="p-6 flex flex-col flex-grow items-start">
                {/* Fixed height for the title container */}
                <div className="flex flex-col h-20 justify-center w-full">
                  <h3 className="text-2xl font-semibold font-josefin-sans text-white text-left leading-snug">
                    {project.title}
                  </h3>
                </div>
                <p className="text-gray-300 text-base leading-relaxed flex-grow line-clamp-4 text-left">
                  {project.description}
                </p>
                {project.isExternal ? (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center text-yellow-400 hover:text-yellow-200 font-semibold transition-colors duration-200 group-hover:translate-x-1">
                    Visit Project &rarr;
                  </a>
                ) : (
                  <Link href={project.link} className="mt-6 inline-flex items-center text-yellow-400 hover:text-yellow-200 font-semibold transition-colors duration-200 group-hover:translate-x-1">
                    Explore Project &rarr;
                  </Link>
                )}
              </div>
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
              <h3 className="text-xl font-semibold mb-4 font-josefin-sans text-yellow-300 text-left">
                {item.title}
              </h3>
              <p className="text-gray-300 text-left leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}

// Separate component for Image with Skeleton Loader
function ImageLoader({ src, alt }: { src: string; alt: string }) {
  const [loading, setLoading] = useState(true);

  return (
    // Added overflow-hidden to ensure no image content overflows the div
    <div className="relative w-full h-full overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
        className={`
          object-cover object-center rounded-xl // Ensure rounded corners on the image itself
          transition-opacity duration-500 ease-in-out
          ${loading ? 'opacity-0' : 'opacity-100'} // Hide image until loaded
        `}
        onLoad={() => setLoading(false)}
        onError={(e) => {
          setLoading(false); // Hide skeleton even on error
          e.currentTarget.onerror = null; // Prevent infinite loop
          e.currentTarget.src = "/placeholder.png"; // Fallback image
        }}
        priority={false}
      />
      {loading && (
        <div className="absolute inset-0 bg-gray-700 animate-pulse rounded-xl flex items-center justify-center">
          <span className="text-gray-400 text-sm">Loading...</span>
        </div>
      )}
    </div>
  );
}
