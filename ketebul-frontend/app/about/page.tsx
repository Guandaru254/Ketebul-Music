// app/about/page.tsx
import Image from 'next/image';
import './about.css';

export default function AboutPage() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <h1>About Ketebul Music</h1>
        <p>
          Ketebul Music is a Nairobi-based organization dedicated to the
          research, preservation, production, and promotion of East African
          music traditions and contemporary sounds.
        </p>
      </section>

      <section className="about-section">
        <div className="about-text">
          <h2>Our Mission</h2>
          <p>
            We aim to document and elevate the musical heritage of East Africa by
            supporting artists, producing original works, and running impactful
            cultural programs.
          </p>
        </div>
        <Image
          src="/about1.jpg"
          alt="Ketebul Studio"
          width={500}
          height={350}
          className="about-image"
        />
      </section>

      <section className="about-section reverse">
        <Image
          src="/about2.jpg"
          alt="Team at Work"
          width={500}
          height={350}
          className="about-image"
        />
        <div className="about-text">
          <h2>Our Story</h2>
          <p>
            Founded in 2007, Ketebul has played a vital role in preserving musical
            memory and showcasing new talent. From field recordings to major
            productions, our work bridges past and future.
          </p>
        </div>
      </section>
    </main>
  );
}
