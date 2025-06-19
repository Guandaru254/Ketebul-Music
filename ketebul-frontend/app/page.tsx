'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HomePage() {
  return (
    <div className="home">
      <div className="hero">
        <div className="hero-overlay" />
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Celebrating East African Sound</h1>
          <p>
            Explore the people, art, and heritage that define our musical identity.
          </p>

          <div className="card-grid">
            {[
              { title: 'Artists', href: '/artists' },
              { title: 'About Us', href: '/about' },
              { title: 'Books', href: '/books' },
              { title: 'Posts', href: '/posts' },
            ].map((card) => (
              <Link key={card.title} href={card.href} className="card">
                <h3>{card.title}</h3>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>

      <section className="section">
        <img
          src="/back.jpg"
          alt="About Ketebul"
        />
        <div className="section-content">
          <h2>Who We Are</h2>
          <p>
            Ketebul Music is a Nairobi-based music production and archival organization.
            We preserve and promote the rich musical traditions of East Africa.
          </p>
          <Link href="/about" className="learn-link">
            Learn more →
          </Link>
        </div>
      </section>
    </div>
  );
}
