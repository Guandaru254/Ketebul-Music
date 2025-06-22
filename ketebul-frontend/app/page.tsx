'use client';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import './home.css';

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

export default function HomePage() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => setIdx((i) => (i + 1) % phrases.length), 4000);
    return () => clearInterval(iv);
  }, []);

  return (
    <main className="home">
      <section className="hero">
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            className="hero-background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{ backgroundImage: `url(${backgrounds[idx]})` }}
          />
        </AnimatePresence>
        <div className="hero-overlay" />
        <motion.div className="hero-content" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1 }}>
          <AnimatePresence mode="wait">
            <motion.h1
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="hero-title"
            >
              {phrases[idx]}
            </motion.h1>
          </AnimatePresence>
        </motion.div>
      </section>

      <section className="about-preview section">
        <div className="about-image-wrapper">
          <Image
            src="/winyo.jpg"
            alt="Ketebul Studios"
            fill
            className="about-image"
            priority
            sizes="(max-width: 640px) 100vw, 500px"
          />
        </div>
        <div className="about-content">
          <h2>Who We Are</h2>
          <p>
            Ketebul Music is a Nairobi-based not-for-profit grounded in recording, preserving & celebrating East African music traditions.
          </p>
          <p>
            Since its founding, the organization has been at the forefront of documenting musical stories, training the next generation, and bridging cultural gaps through sound. Our mission is to elevate underrepresented voices and protect regional legacies through collaboration and innovation.
          </p>
          <Link href="/about" className="btn-primary">Learn more about us →</Link>
        </div>
      </section>

      <section className="projects-preview section">
        <div className="projects-header">
          <h2>Featured Projects</h2>
        </div>
        <div className="projects-grid">
          {[
            { slug: 'sauti', title: 'SAUTI: Gifted Different Unsilenced', img: '/projects/sauti.png' },
            { slug: 'shades-of-benga', title: 'Shades of Benga', img: '/projects/benga.jpg' },
            { slug: 'reconciliation', title: 'Weapon of Mass Reconciliation', img: '/projects/reconciliation.jpg' }
          ].map((p) => (
            <Link href={`/projects/${p.slug}`} key={p.slug} className="project-card">
              <Image src={p.img} alt={p.title} width={300} height={180} className="project-img" />
              <h3>{p.title}</h3>
            </Link>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link href="/projects" className="btn-primary">See All Projects</Link>
        </div>
      </section>
    </main>
  );
}
