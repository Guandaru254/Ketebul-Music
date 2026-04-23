'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, Variants, Transition } from 'framer-motion';
import { useState } from 'react';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

const PRIMARY_YELLOW = 'yellow-500';
const HOVER_YELLOW = 'yellow-600';

const teamMembers = [
  {
    name: 'Tabu Osusa',
    role: 'Founder & Executive Director',
    photo: '/team/tabu.jpg',
    slug: 'tabu-osusa',
    bio: 'Tabu is an iconic figure in the East African music industry and founding Executive Director of Ketebul Music. His vision guides our mission.',
  },
  {
    name: 'Khadija Mohamed',
    role: 'Chairperson of the Fund-Raising Committee',
    photo: '/team/khadija.jpeg',
    slug: 'khadija-mohamed',
    bio: 'Khadija is a change management consultant with over a decade of experience in the UK and Kenya, driving our fundraising initiatives.',
  },
  {
    name: 'Paul Kelemba (Maddo)',
    role: 'Board Chairman & Creative Innovations',
    photo: '/team/maddo.jpeg',
    slug: 'paul-kelemba',
    bio: 'Paul Kelemba, aka Maddo, is a renowned satirical illustrator and cultural advocate in Nairobi, enriching our creative direction.',
  },
  {
    name: 'Nick Abonyo',
    role: 'Label Manager',
    photo: '/team/nick.jpg',
    slug: 'nick-abonyo',
    bio: 'Nick oversees artist relations and project coordination with a tech-savvy approach to music management.',
  },
  {
    name: 'Patrick "Sapat" Ondiek',
    role: 'Projects Manager',
    photo: '/team/patrick.jpg',
    slug: 'patrick-ondiek',
    bio: 'Patrick is a videographer passionate about visual storytelling and documentary production, bringing our projects to life.',
  },
  {
    name: 'Bill Odidi',
    role: 'Board Member & Editor',
    photo: '/team/bill.jpg',
    slug: 'bill-odidi',
    bio: 'Bill is a seasoned journalist and radio programs controller at KBC with deep knowledge of the music industry, guiding our communications.',
  },
  {
    name: 'Guy Morley',
    role: 'Board Member & Projects Consultant',
    photo: '/team/guy.jpg',
    slug: 'guy-morley',
    bio: 'Guy is Director of No Nation and has programmed major UK festivals like The Big Chill and Brighton Festival, bringing international expertise.',
  },
  {
    name: 'Nathan Makokha',
    role: 'Accounts & Finance',
    photo: '/team/nathan.jpeg',
    slug: 'nathan-makokha',
    bio: 'Nathan is a finance professional specializing in budgeting, compliance, and financial systems, ensuring our financial health.',
  },
  {
    name: 'Rachel Olwanda',
    role: 'Monitoring & Evaluation Expert',
    photo: '/team/rachel.jpeg',
    slug: 'rachel-olwanda',
    bio: 'Rachel specializes in safeguarding, M&E, and community engagement with a focus on child protection, ensuring our impact is measurable.',
  },
  {
    name: 'Fiston Lusambo',
    role: 'Head of Music Production',
    photo: '/team/fiston.jpg',
    slug: 'fiston-lusambo',
    bio: 'Fiston is a veteran British-Congolese guitarist, composer, and engineer with decades of experience, leading our studio efforts.',
  },
  {
    name: 'Steenie Njoroge',
    role: 'Photography & Research',
    photo: '/team/steenie.jpg',
    slug: 'steenie-njoroge',
    bio: 'Steenie is a veteran photojournalist with over 45 years in the arts and entertainment industry, documenting our journey.',
  },
  {
    name: 'Moise Bonyambala',
    role: 'Sound Engineer',
    photo: '/team/moise.jpg',
    slug: 'moise-bonyambala',
    bio: 'Moise is a jazz pianist, sound engineer, and music teacher dedicated to using art to support peace, unity, and reconciliation.',
  },
  {
    name: 'Martin "Drix" Muyeshi',
    role: 'Director of Photography',
    photo: '/team/drix.jpg',
    slug: 'martin-muyeshi',
    bio: 'Drix is a second-generation photographer and documentary visual artist focused on African stories, capturing compelling visuals.',
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 80, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12,
      delay: i * 0.1,
      duration: 0.8,
    } as Transition,
  }),
};

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 py-16 px-4 sm:px-6 lg:px-8 font-inter">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {teamMembers.map((member, index) => (
          <motion.article
            key={index}
            className="bg-gradient-to-r from-gray-900 to-black rounded-2xl overflow-hidden shadow-2xl flex flex-col p-8 border-2 border-transparent relative group"
            initial="hidden"
            whileInView="visible"
            whileHover={{
              y: -10,
              scale: 1.03,
              boxShadow: '0 12px 25px rgba(0,0,0,0.4), 0 0 0 4px rgba(245, 158, 11, 0.6)',
              transition: { type: 'spring', stiffness: 350, damping: 25 },
            }}
            viewport={{ once: false, amount: 0.15 }}
            variants={cardVariants}
            custom={index}
          >
            {/* IMAGE — clickable */}
            <Link href={`/team/${member.slug}`} className="block">
              <div className="relative w-full h-72 rounded-xl overflow-hidden flex-shrink-0 mb-6 shadow-lg cursor-pointer">
                <ImageLoader src={member.photo} alt={`Photo of ${member.name}`} />
              </div>
            </Link>

            {/* CONTENT */}
            <div className="flex flex-col items-start w-full px-2">
              <div className="flex flex-col min-h-[6.5rem] justify-start w-full">
                <h2 className="text-2xl font-bold mb-1 font-inter text-white text-left">
                  {member.name}
                </h2>
                <p className={`text-lg font-medium text-${PRIMARY_YELLOW} text-left`}>
                  {member.role}
                </p>
              </div>

              <p className="text-gray-300 text-base leading-relaxed text-left line-clamp-3 mt-3 mb-4">
                {member.bio}
              </p>

              {/* View Full Profile link */}
              <Link
                href={`/team/${member.slug}`}
                className={`inline-flex items-center text-${PRIMARY_YELLOW} hover:text-${HOVER_YELLOW} font-semibold transition-colors mt-1`}
              >
                View Full Profile
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

          </motion.article>
        ))}
      </div>
    </main>
  );
}

interface ImageLoaderProps {
  src: string;
  alt: string;
}

function ImageLoader({ src, alt }: ImageLoaderProps) {
  const [loading, setLoading] = useState(true);
  const fallback = 'https://placehold.co/200x200/525252/b3b3b3?text=Image+Missing';

  return (
    <div className="relative w-full h-full">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
        className={`object-cover object-center rounded-xl transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={() => setLoading(false)}
        onError={(e) => {
          e.currentTarget.src = fallback;
          setLoading(false);
        }}
      />
      {loading && (
        <div className="absolute inset-0 bg-gray-700 animate-pulse rounded-xl flex items-center justify-center">
          <span className="text-gray-400 text-sm">Loading...</span>
        </div>
      )}
    </div>
  );
}