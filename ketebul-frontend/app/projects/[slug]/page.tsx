import { notFound } from 'next/navigation';
import ProjectProfile from './ProjectProfile';

const projects = [
  {
    title: "SAUTI: Gifted Different Unsilenced",
    slug: "sauti",
    image: "/projects/sauti.png",
    description: "A multimedia project featuring a documentary and music compilation exploring musicians with unique abilities.",
    category: "Documentaries",
    fullDescription: `SAUTI: Gifted Different Unsilenced is a groundbreaking multimedia project by Ketebul Music that shines a light on musicians living with disabilities across East Africa.

The project features a documentary film and an accompanying music compilation, celebrating the extraordinary talent and resilience of artists who have overcome physical and social barriers to share their gift with the world.

Through intimate portraits and live performances, SAUTI challenges perceptions of disability and redefines what it means to be "gifted." The project has screened at festivals across Kenya and internationally, sparking vital conversations about inclusion in the arts.`,
  },
  {
    title: "Shades of Benga",
    slug: "shades-of-benga",
    image: "/projects/benga.jpg",
    description: "A comprehensive book and research project tracing the roots of Kenya's popular music from 1946 to 2016.",
    category: "Books & Research",
    fullDescription: `Shades of Benga is a landmark publication by Ketebul Music documenting the evolution of Benga — Kenya's most beloved popular music genre — from its origins in the 1940s through to the modern era.

The book draws on decades of archival research, interviews with pioneering musicians, and rare recordings to paint a vivid picture of how Benga emerged from the Luo community and spread across the country to become a defining soundtrack of Kenyan life.

The project also includes a curated compilation album featuring both classic recordings and new interpretations, ensuring that the legacy of Benga is preserved for future generations.`,
  },
  {
    title: "Uromo by Sali Oyugi",
    slug: "uromo",
    image: "/projects/uromo.jpg",
    description: "A soulful music project blending African traditions and contemporary songwriting.",
    category: "Music Projects",
    fullDescription: `Uromo is a deeply personal album by Sali Oyugi, produced in collaboration with Ketebul Music. The word "Uromo" means "home" in Dholuo, and the project is a heartfelt journey back to cultural roots.

Drawing on the melodic traditions of Lake Victoria's shoreline communities, Sali weaves together acoustic guitar, nyatiti, and contemporary arrangements to create a sound that is both timeless and modern.

The album has been praised for its emotional depth and its role in introducing traditional Luo musical forms to new audiences both in Kenya and abroad.`,
  },
  {
    title: "Weapon of Mass Reconciliation",
    slug: "reconciliation",
    image: "/projects/reconciliation.jpg",
    description: "Music and outreach campaign that helped foster national healing after the 2008 post-election crisis.",
    category: "Social Impact",
    fullDescription: `In the aftermath of Kenya's devastating 2008 post-election violence, Ketebul Music launched the Weapon of Mass Reconciliation — a powerful music and community outreach campaign that used the unifying power of song to help heal a fractured nation.

The project brought together artists from across Kenya's diverse ethnic communities to record and perform together, demonstrating that music transcends the divisions that politicians exploit.

Concerts were held in affected regions, and the recordings were broadcast nationally, reaching millions of Kenyans at a moment of profound need. The project is widely credited as one of the most impactful cultural interventions of that period.`,
  },
  {
    title: "Ohanglaman by Makadem",
    slug: "ohanglaman",
    image: "/projects/ohanglaman.jpg",
    description: "Makadem's debut album mixing Ohangla sounds with modern Afro-fusion.",
    category: "Music Projects",
    fullDescription: `Ohanglaman is the debut studio album from Makadem, one of Kenya's most electrifying performers, produced by Ketebul Music. The title references Makadem's self-given title — the Ohanglaman — a master and innovator of the Ohangla genre.

The album blends the driving rhythms and call-and-response vocals of traditional Ohangla with Afro-fusion production, creating a sound that has packed dance floors across East Africa and earned Makadem international recognition.

The project includes collaborations with several Ketebul artists and stands as a defining statement of what contemporary East African music can achieve when rooted in tradition.`,
  },
  {
    title: "Garissa Express by Gargar",
    slug: "garissa-express",
    image: "/projects/garissa.jpg",
    description: "A powerful album by the all-female group Gargar, celebrating Somali culture and identity.",
    category: "Music Projects",
    fullDescription: `Garissa Express is the debut album from Gargar, an extraordinary collective of Kenyan-Somali women from Garissa County, produced by Ketebul Music.

Through songs of joy, grief, celebration, and resistance, the album documents the living musical traditions of the Somali community in Kenya — traditions that have rarely been recorded or shared with wider audiences.

The project involved extensive fieldwork and community engagement in Garissa, and the resulting recordings are both a cultural archive and a vibrant artistic statement. Garissa Express has been celebrated as a milestone in Kenyan music documentation.`,
  },
  {
    title: "Singing Wells",
    slug: "singing-wells",
    image: "/projects/wells.png",
    description: "An initiative to document, preserve, and promote traditional music from East Africa.",
    category: "Documentaries",
    fullDescription: `Singing Wells is a long-running documentation initiative by Ketebul Music in partnership with Abubilla Music Foundation, dedicated to recording and preserving the endangered traditional music of East Africa.

Field researchers have traveled to remote communities across Kenya, Uganda, Tanzania, and Ethiopia to capture performances of music that exists nowhere else — songs tied to specific rituals, seasons, and ways of life that are disappearing as older generations pass on.

The project has produced hundreds of high-quality recordings, documentary films, and educational resources, creating an invaluable archive for researchers, musicians, and communities around the world.`,
  },
];

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find(p => p.slug === slug);
  if (!project) return notFound();
  return <ProjectProfile project={project} />;
}