'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './home.css'; // Your CSS as provided

const phrases = [
  'Celebrating East African Sound',
  'Preserving Musical Heritage',
  'Empowering New Voices'
];

const backgrounds = [
  '/back1.jpg',
  '/back2.jpg',
  '/back3.jpg'
];

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

const partners = [
  {
    href: 'https://abubillamusic.com',
    alt: 'Abubila Music',
    img: '/partner1.png'
  },
  {
    href: 'https://www.fordfoundation.org/regions/eastern-africa',
    alt: 'Ford Foundation Eastern Africa',
    img: '/partner2.png'
  },
  {
    href: 'https://afkenya.org',
    alt: 'French Embassy Kenya',
    img: '/partner3.png'
  }
];

export default function HomePage() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="home">
      {/* HERO */}
      <section className="hero">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="hero-background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${backgrounds[index]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              zIndex: 0
            }}
          />
        </AnimatePresence>
        <div className="hero-overlay" />
        <motion.div
          className="hero-content"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <AnimatePresence mode="wait">
            <motion.h1
              key={phrases[index]}
              className="hero-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              {phrases[index]}
            </motion.h1>
          </AnimatePresence>
        </motion.div>
      </section>

      {/* ABOUT */}
      <section className="about-preview section">
        <div className="about-image-wrapper">
          <Image
            src="/winyo.jpg"
            alt="About Ketebul"
            fill
            className="about-image"
            sizes="(max-width: 640px) 100vw, 500px"
            priority
          />
        </div>
        <div className="about-content">
          <h2>Who We Are</h2>
          <p>
            Ketebul Music is a not-for-profit organization dedicated to recording, preserving, and promoting the diverse musical traditions of East Africa.
          </p>
          <p>
            Through storytelling, collaboration, and mentorship, we celebrate cultural heritage while empowering new voices in the music industry.
          </p>
          <Link href="/about" className="btn-primary">Learn more about us →</Link>
        </div>
      </section>

      {/* PROJECTS */}
<section className="projects-preview section">
  <h2 className="projects-title">Featured Projects</h2>

  <div className="projects-grid">
    {featuredProjects.map((project) => (
      <Link
        href={`/projects/${project.slug}`}
        key={project.slug}
        className="project-card"
      >
        <Image
          src={project.img}
          alt={project.title}
          width={400}
          height={220}
          className="project-img"
        />
        <h3>{project.title}</h3>
      </Link>
    ))}
  </div>

  <div className="projects-button-wrapper">
    <Link href="/projects" className="btn-primary">
      See All Projects →
    </Link>
  </div>
</section>

      {/* PARTNERS */}
<section className="partners section">
  <div className="partners-header">
    <h2>Our Partners</h2>
    <p>
      We proudly collaborate with institutions that support our mission and amplify our impact
      across Africa and the world.
    </p>
  </div>

  <div className="partners-grid">
    {partners.map((partner, i) => (
      <a
        key={i}
        href={partner.href}
        target="_blank"
        rel="noopener noreferrer"
        className="partner-card"
      >
        <Image
          src={partner.img}
          alt={partner.alt}
          width={160}
          height={80}
          className="partner-img"
        />
      </a>
    ))}
  </div>
</section>


    </main>
  );
}
