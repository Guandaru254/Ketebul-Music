// app/projects/page.tsx
'use client';
import Image from 'next/image';
import Link from 'next/link';
import './projects.css';

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

export default function ProjectsPage() {
  return (
    <main className="projects-page">
      <h1>Our Projects</h1>
      <p className="intro-text">
        Below is an overview of our ongoing and past projects – from music albums and books to multimedia campaigns.
      </p>
      <div className="project-grid">
        {projects.map((project) => (
          <Link href={`/projects/${project.slug}`} key={project.slug} className="project-card">
            <div className="project-img-wrapper">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="project-img"
              />
            </div>
            <div className="project-content">
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <span className="read-more">Read more →</span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
