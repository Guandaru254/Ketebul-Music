'use client';

import Image from 'next/image';
import { motion, Variants, Transition } from 'framer-motion';
import { useState } from 'react'; // Needed for ImageLoader's useState
import { Facebook, Instagram, Linkedin } from 'lucide-react'; // Importing standard Lucide icons

// --- Global Theme & Color Constants (Copied from homepage for consistency) ---
const PRIMARY_YELLOW = 'yellow-500'; // Tailwind CSS class for #F59E0B
const HOVER_YELLOW = 'yellow-600'; // Tailwind CSS class for a slightly darker yellow on hover

const teamMembers = [
  {
    name: 'Tabu Osusa',
    role: 'Founder & Executive Director',
    photo: '/tabu-osusa.jpg',
    bio: 'Tabu is an iconic figure in the East African music industry and founding Executive Director of Ketebul Music. His vision guides our mission.',
    social: {
      instagram: 'https://www.instagram.com/tabuosusa',
      facebook: 'https://www.facebook.com/tabuosusa',
      linkedin: 'https://www.linkedin.com/in/tabuosusa',
      whatsapp: 'https://wa.me/254712345678', // Placeholder, replace with actual WhatsApp link
    },
  },
  {
    name: 'Khadija Mohamed',
    role: 'Chairperson of the Fund-Raising Committee',
    photo: '/team/khadija.jpeg',
    bio: 'Khadija is a change management consultant with over a decade of experience in the UK and Kenya, driving our fundraising initiatives.',
    social: {
      instagram: 'https://www.instagram.com/khadijamohamed',
      facebook: 'https://www.facebook.com/khadijamohamed',
      linkedin: 'https://www.linkedin.com/in/khadijamohamed',
      whatsapp: 'https://wa.me/254712345678',
    },
  },
  {
    name: 'Paul Kelemba (Maddo)',
    role: 'Board Chairman & Creative Innovations',
    photo: '/team/maddo.jpeg',
    bio: 'Paul Kelemba, aka Maddo, is a renowned satirical illustrator and cultural advocate in Nairobi, enriching our creative direction.',
    social: {
      instagram: 'https://www.instagram.com/paulkelemba',
      facebook: 'https://www.facebook.com/paulkelemba',
      linkedin: 'https://www.linkedin.com/in/paulkelemba',
      whatsapp: 'https://wa.me/254712345678',
    },
  },
  {
    name: 'Bill Odidi',
    role: 'Board Member & Editor',
    photo: '/team/bill.jpg',
    bio: 'Bill is a seasoned journalist and radio programs controller at KBC with deep knowledge of the music industry, guiding our communications.',
    social: {
      instagram: 'https://www.instagram.com/billodidi',
      facebook: 'https://www.facebook.com/billodidi',
      linkedin: 'https://www.linkedin.com/in/billodidi',
      whatsapp: 'https://wa.me/254712345678',
    },
  },
  {
    name: 'Guy Morley',
    role: 'Board Member & Projects Consultant',
    photo: '/team/guy.jpg',
    bio: 'Guy is Director of No Nation and has programmed major UK festivals like The Big Chill and Brighton Festival, bringing international expertise.',
    social: {
      instagram: 'https://www.instagram.com/guymorley',
      facebook: 'https://www.facebook.com/guymorley',
      linkedin: 'https://www.linkedin.com/in/guymorley',
      whatsapp: 'https://wa.me/254712345678',
    },
  },
  {
    name: 'Nathan Makokha',
    role: 'Accounts & Finance',
    photo: '/team/nathan.jpeg',
    bio: 'Nathan is a finance professional specializing in budgeting, compliance, and financial systems, ensuring our financial health.',
    social: {
      instagram: 'https://www.instagram.com/nathanmakokha',
      facebook: 'https://www.facebook.com/nathanmakokha',
      linkedin: 'https://www.linkedin.com/in/nathanmakokha',
      whatsapp: 'https://wa.me/254712345678',
    },
  },
  {
    name: 'Shyam Shah',
    role: 'Creative Advisor',
    photo: '/team/shyam.jpg',
    bio: 'Shyam is a musician and cultural consultant based in London with a decade of international experience, advising on creative strategies.',
    social: {
      instagram: 'https://www.instagram.com/shyamshah',
      facebook: 'https://www.facebook.com/shyamshah',
      linkedin: 'https://www.linkedin.com/in/shyamshah',
      whatsapp: 'https://wa.me/254712345678',
    },
  },
  {
    name: 'Anditi Tigo',
    role: 'Executive Assistant',
    photo: '/team/anditi.jpg',
    bio: 'Anditi is a strategist and singer-songwriter focused on African culture and inclusive cultural development, providing vital support.',
    social: {
      instagram: 'https://www.instagram.com/andititigo',
      facebook: 'https://www.facebook.com/andititigo',
      linkedin: 'https://www.linkedin.com/in/andititigo',
      whatsapp: 'https://wa.me/254712345678',
    },
  },
  {
    name: 'Rachel Olwanda',
    role: 'Monitoring & Evaluation Expert',
    photo: '/team/rachel.jpeg',
    bio: 'Rachel specializes in safeguarding, M&E, and community engagement with a focus on child protection, ensuring our impact is measurable.',
    social: {
      instagram: 'https://www.instagram.com/rachelolwanda',
      facebook: 'https://www.facebook.com/rachelolwanda',
      linkedin: 'https://www.linkedin.com/in/rachelolwanda',
      whatsapp: 'https://wa.me/254712345678',
    },
  },
  {
    name: 'Fiston Lusambo',
    role: 'Head of Music Production',
    photo: '/team/fiston.jpg',
    bio: 'Fiston is a veteran British-Congolese guitarist, composer, and engineer with decades of experience, leading our studio efforts.',
    social: {
      instagram: 'https://www.instagram.com/fistonlusambo',
      facebook: 'https://www.facebook.com/fistonlusambo',
      linkedin: 'https://www.linkedin.com/in/fistonlusambo',
      whatsapp: 'https://wa.me/254712345678',
    },
  },
  {
    name: 'Abdi Rashid Jibril',
    role: 'Music Curator & Researcher',
    photo: '/team/abdi.jpg',
    bio: 'Abdi leads Roots International and curates East Africa’s premier live music nights, bringing fresh talent to our roster.',
    social: {
      instagram: 'https://www.instagram.com/abdirashidjibril',
      facebook: 'https://www.facebook.com/abdirashidjibril',
      linkedin: 'https://www.linkedin.com/in/abdirashidjibril',
      whatsapp: 'https://wa.me/254712345678',
    },
  },
  {
    name: 'Steenie Njoroge',
    role: 'Photography & Research',
    photo: '/team/steenie.jpg',
    bio: 'Steenie is a veteran photojournalist with over 45 years in the arts and entertainment industry, documenting our journey.',
    social: {
      instagram: 'https://www.instagram.com/steenienjoroge',
      facebook: 'https://www.facebook.com/steenienjoroge',
      linkedin: 'https://www.linkedin.com/in/steenienjoroge',
      whatsapp: 'https://wa.me/254712345678',
    },
  },
  {
    name: 'Tobias "Shunkyz" Odhiambo',
    role: 'Audio Engineer',
    photo: '/team/tobias.jpg',
    bio: 'Shunkyz is a skilled audio engineer specializing in African genres, mixing, and mastering, perfecting our sound.',
    social: {
      instagram: 'https://www.instagram.com/tobiasodhiambo',
      facebook: 'https://www.facebook.com/tobiasodhiambo',
      linkedin: 'https://www.linkedin.com/in/tobiasodhiambo',
      whatsapp: 'https://wa.me/254712345678',
    },
  },
  {
    name: 'Nick Abonyo',
    role: 'Label Manager',
    photo: '/team/nick.jpg',
    bio: 'Nick oversees artist relations and project coordination with a tech-savvy approach to music management.',
    social: {
      instagram: 'https://www.instagram.com/nickabonyo',
      facebook: 'https://www.facebook.com/nickabonyo',
      linkedin: 'https://www.linkedin.com/in/nickabonyo',
      whatsapp: 'https://wa.me/254712345678',
    },
  },
  {
    name: 'Patrick "Sapat" Ondiek',
    role: 'Projects Manager',
    photo: '/team/patrick.jpg',
    bio: 'Patrick is a videographer passionate about visual storytelling and documentary production, bringing our projects to life.',
    social: {
      instagram: 'https://www.instagram.com/patrickondiek',
      facebook: 'https://www.facebook.com/patrickondiek',
      linkedin: 'https://www.linkedin.com/in/patrickondiek',
      whatsapp: 'https://wa.me/254712345678',
    },
  },
  {
    name: 'Martin "Drix" Muyeshi',
    role: 'Director of Photography',
    photo: '/team/drix.jpg',
    bio: 'Drix is a second-generation photographer and documentary visual artist focused on African stories, capturing compelling visuals.',
    social: {
      instagram: 'https://www.instagram.com/drixmuyeshi',
      facebook: 'https://www.facebook.com/drixmuyeshi',
      linkedin: 'https://www.linkedin.com/in/drixmuyeshi',
      whatsapp: 'https://wa.me/254712345678',
    },
  },
  {
    name: 'Carola Daniel Amri Kinasha',
    role: 'Regional Consultant',
    photo: '/team/carola.jpeg',
    bio: 'Carola is a Tanzanian songwriter and activist creating afro-centric music with strong social messages, expanding our regional reach.',
    social: {
      instagram: 'https://www.instagram.com/carolakinasha',
      facebook: 'https://www.facebook.com/carolakinasha',
      linkedin: 'https://www.linkedin.com/in/carolakinasha',
      whatsapp: 'https://wa.me/254712345678',
    },
  },
];

// Framer Motion variants for card entry animation
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 80, scale: 0.95 }, // Start further down, slightly smaller
  visible: (i: number) => ({ // Staggered entry
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100, // Adjusted stiffness for a smoother feel
      damping: 12,     // Adjusted damping for smoother landing
      delay: i * 0.1,  // Staggered delay for a flowing entrance
      duration: 0.8,   // Overall duration for visible state
    } as Transition,
  }),
};

// Framer Motion variants for card hover animation
const hoverVariants: Variants = {
  lift: {
    y: -10, // Lift slightly higher
    scale: 1.03, // Enlarge slightly, but still noticeable
    // Consistent shadow color with PRIMARY_YELLOW (Tailwind yellow-500 is rgb(245, 158, 11))
    boxShadow: `0 12px 25px rgba(0,0,0,0.4), 0 0 0 4px rgba(245, 158, 11, 0.6)`, 
    transition: {
      type: "spring",
      stiffness: 350, // Immediate hover response
      damping: 25
    } as Transition,
  }
};

export default function TeamPage() {
  return (
    // Main container for the team page, ensuring global dark theme and padding for fixed header
    <main className="min-h-screen bg-gray-950 text-gray-100 py-16 px-4 sm:px-6 lg:px-8 font-inter">
      {/* Removed: The motion.h1 element for the main title */}
      {/* Team Grid Layout: Changed xl:grid-cols-4 to lg:grid-cols-3 for 3 columns on larger screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {teamMembers.map((member, index) => (
          <motion.article
            key={index}
            // Apply the gradient background to the card - matching header
            className="bg-gradient-to-r from-gray-900 to-black rounded-2xl overflow-hidden shadow-2xl flex flex-col p-8 cursor-pointer border-2 border-transparent relative group" // Increased padding from p-6 to p-8
            initial="hidden"
            whileInView="visible"
            whileHover="lift"
            viewport={{ once: false, amount: 0.15 }} // Always animate when in view
            variants={cardVariants}
            custom={index} // Pass index for staggered delay
          >
            {/* Image Container: Removed grayscale filter */}
            <div className="relative w-full h-72 rounded-xl overflow-hidden flex-shrink-0 mb-6 shadow-lg"> {/* Increased height from h-64 to h-72 */}
              <ImageLoader src={member.photo} alt={`Photo of ${member.name}`} />
            </div>

            {/* Content Area: Adjusted alignment and added min-height for consistent bio start */}
            <div className="flex flex-col items-start w-full px-2">
              <div className="flex flex-col min-h-[6.5rem] justify-start w-full"> {/* Added min-height for consistent bio start */}
                <h2 className="text-2xl font-bold mb-1 font-josefin-sans text-white text-left">
                  {member.name}
                </h2>
                <p className={`text-lg font-medium text-${PRIMARY_YELLOW} text-left`}> {/* Updated yellow color */}
                  {member.role}
                </p>
              </div>
              <p className="text-gray-300 text-base leading-relaxed text-left line-clamp-5 mt-3 mb-4"> {/* Adjusted mt-3 for spacing */}
                {member.bio}
              </p>
            </div>

            {/* Social Links */}
            <div className="flex justify-start w-full space-x-4 mt-2 px-2 text-gray-400">
              {member.social?.instagram && (
                <a href={member.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <Instagram size={24} className={`hover:text-${HOVER_YELLOW} transition-colors`} /> {/* Updated yellow color */}
                </a>
              )}
              {member.social?.facebook && (
                <a href={member.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <Facebook size={24} className={`hover:text-${HOVER_YELLOW} transition-colors`} /> {/* Updated yellow color */}
                </a>
              )}
              {member.social?.linkedin && (
                <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin size={24} className={`hover:text-${HOVER_YELLOW} transition-colors`} /> {/* Updated yellow color */}
                </a>
              )}
              {member.social?.whatsapp && (
                <a href={member.social.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                  {/* Inline SVG for WhatsApp icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={`hover:text-${HOVER_YELLOW} transition-colors`}> {/* Updated yellow color */}
                    <path d="M12.04 2C7.03 2 3 6.03 3 11.04c0 1.63.43 3.18 1.18 4.54L3.11 21.09l4.73-1.24c1.29.7 2.76 1.08 4.2 1.08 5.01 0 9.04-4.03 9.04-9.04S17.05 2 12.04 2zm3.62 14.15c-.1.25-.6.5-.83.56-.23.07-.5.06-.75-.02-.3-.1-.97-.3-1.66-.7-1.3-.8-2.16-2.12-2.43-2.58-.27-.47-.03-.7.19-.92.21-.2.48-.47.66-.67.19-.21.25-.47.16-.67-.1-.2-.61-1.46-.84-2.02-.23-.55-.47-.47-.65-.48-.19-.01-.4-.01-.61-.01-.22 0-.58.07-.88.42-.3.35-1.15 1.13-1.15 2.74 0 1.61 1.18 3.16 1.34 3.38.16.22 2.3 3.52 5.6 4.79 3.3 1.27 3.3 1.08 3.9 1.02.6-.06 1.8-.74 2.04-1.46.24-.72.24-1.34.17-1.46-.07-.12-.23-.19-.48-.31z"/>
                  </svg>
                </a>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </main>
  );
}

// Separate component for Image with Skeleton Loader
interface ImageLoaderProps {
  src: string;
  alt: string;
  width?: number; // Keep these for flexibility, although fill is used here
  height?: number; // Keep these for flexibility, although fill is used here
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
      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw" // Optimised sizes for team photos
      className={`
        object-cover object-center rounded-xl // Ensure rounded corners on the image itself
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
      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw" // Optimised sizes for team photos
      className={`
        object-cover object-center rounded-xl // Ensure rounded corners on the image itself
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
        <div className="absolute inset-0 bg-gray-700 animate-pulse rounded-xl flex items-center justify-center">
          <span className="text-gray-400 text-sm">Loading...</span>
        </div>
      )}
    </div>
  );
}
