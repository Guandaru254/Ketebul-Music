import { notFound } from 'next/navigation';
import TeamProfile from './TeamProfile';

const teamMembers = [
  {
    name: 'Tabu Osusa',
    role: 'Founder & Executive Director',
    photo: '/team/tabu.jpg',
    slug: 'tabu-osusa',
    fullBio: `Tabu Osusa is one of East Africa's most respected music producers and cultural advocates. As the founding Executive Director of Ketebul Music, he has dedicated his career to identifying, documenting, and promoting the diverse musical traditions of the region.

With decades of experience in the music industry, Tabu has worked with some of East Africa's most celebrated artists, helping to bring traditional sounds to both local and international audiences. His production work spans genres from Benga and Ohangla to Taarab and Afro-fusion.

Under his leadership, Ketebul Music has become a leading force in African music preservation, producing award-winning documentaries, landmark albums, and vital archival projects that ensure East Africa's musical heritage is never lost.`,
  },
  {
    name: 'Khadija Mohamed',
    role: 'Chairperson of the Fund-Raising Committee',
    photo: '/team/khadija.jpeg',
    slug: 'khadija-mohamed',
    fullBio: `Khadija Mohamed brings over a decade of expertise in change management, organizational development, and fundraising strategy to Ketebul Music. Having worked extensively in both the United Kingdom and Kenya, she brings a uniquely global perspective to the organization's growth.

As Chairperson of the Fund-Raising Committee, Khadija leads efforts to secure sustainable funding that enables Ketebul Music to continue its vital cultural preservation work. Her ability to build relationships across sectors — from corporate partners to international foundations — has been instrumental in the organization's financial health.

Khadija is deeply committed to the belief that African cultural heritage deserves world-class investment and international recognition.`,
  },
  {
    name: 'Paul Kelemba (Maddo)',
    role: 'Board Chairman & Creative Innovations',
    photo: '/team/maddo.jpeg',
    slug: 'paul-kelemba',
    fullBio: `Paul Kelemba, widely known as Maddo, is one of Kenya's most celebrated satirical illustrators and a powerful voice in the country's cultural landscape. His sharp wit and distinctive visual style have made him a household name in Nairobi and beyond.

As Board Chairman, Maddo provides strategic oversight and brings a creative energy that infuses everything Ketebul Music does. His deep understanding of Kenyan culture — its humour, its struggles, its aspirations — helps ensure the organization remains grounded in the communities it serves.

Beyond his role at Ketebul, Maddo continues to work as an artist and cultural commentator, using his platform to celebrate and critique Kenyan society with equal parts affection and honesty.`,
  },
  {
    name: 'Nick Abonyo',
    role: 'Label Manager',
    photo: '/team/nick.jpg',
    slug: 'nick-abonyo',
    fullBio: `Nick Abonyo is the engine that keeps Ketebul Music's day-to-day operations running smoothly. As Label Manager, he oversees artist relations, project coordination, and the administrative infrastructure that supports the organization's creative output.

Nick brings a tech-savvy, modern approach to music management — embracing digital tools and platforms to expand the reach of Ketebul's artists and catalogue. His ability to bridge the gap between traditional music and contemporary industry practices has been invaluable as the organization navigates an evolving landscape.

His genuine passion for East African music and his dedication to the artists he works with make him a trusted figure across the Ketebul family.`,
  },
  {
    name: 'Patrick "Sapat" Ondiek',
    role: 'Projects Manager',
    photo: '/team/patrick.jpg',
    slug: 'patrick-ondiek',
    fullBio: `Patrick "Sapat" Ondiek is a versatile creative professional who serves as Projects Manager at Ketebul Music. With a background in videography and a deep passion for documentary storytelling, Patrick ensures that the organization's projects are delivered with both artistic integrity and operational efficiency.

From coordinating field recording expeditions to managing post-production workflows, Patrick is involved at every stage of Ketebul's project lifecycle. His visual sensibility has shaped many of the organization's most compelling documentary outputs.

Patrick's commitment to telling authentic African stories through film and music makes him an essential creative force within the team.`,
  },
  {
    name: 'Bill Odidi',
    role: 'Board Member & Editor',
    photo: '/team/bill.jpg',
    slug: 'bill-odidi',
    fullBio: `Bill Odidi is a veteran journalist and broadcaster with decades of experience covering Kenya's music and arts scene. As a programs controller at Kenya Broadcasting Corporation (KBC), he has been a powerful advocate for local music on the airwaves.

As a Board Member and Editor at Ketebul Music, Bill brings rigorous editorial standards and a deep institutional knowledge of the Kenyan music industry. His connections across the media landscape have helped amplify the stories Ketebul tells to wider audiences.

Bill's career is a testament to the power of media in shaping cultural narratives, and his involvement with Ketebul reflects his ongoing commitment to ensuring that East African music receives the serious attention it deserves.`,
  },
  {
    name: 'Guy Morley',
    role: 'Board Member & Projects Consultant',
    photo: '/team/guy.jpg',
    slug: 'guy-morley',
    fullBio: `Guy Morley brings an extraordinary wealth of international festival and music industry experience to Ketebul Music's board. As Director of No Nation, he has spent his career connecting artists and audiences across cultural boundaries.

His programming credits include some of the UK's most beloved music events — The Big Chill, Brighton Festival, and numerous others — giving him an unparalleled understanding of how world music is presented and received by global audiences.

At Ketebul, Guy serves as a bridge between East African music and international platforms, helping to open doors and create opportunities for the organization's artists on the world stage.`,
  },
  {
    name: 'Nathan Makokha',
    role: 'Accounts & Finance',
    photo: '/team/nathan.jpeg',
    slug: 'nathan-makokha',
    fullBio: `Nathan Makokha ensures that Ketebul Music's financial foundations are solid, transparent, and fit for purpose. As the organization's Accounts and Finance lead, he oversees budgeting, financial reporting, compliance, and the systems that keep everything running smoothly behind the scenes.

Nathan's expertise in financial management within the non-profit and creative sectors means he understands the unique challenges organizations like Ketebul face — balancing artistic ambition with fiscal responsibility.

His meticulous approach to finance gives the leadership team the confidence to plan boldly, knowing that the numbers are in safe hands.`,
  },
  {
    name: 'Shyam Shah',
    role: 'Creative Advisor',
    photo: '/team/shyam.jpg',
    slug: 'shyam-shah',
    fullBio: `Shyam Shah is a musician, producer, and cultural consultant who has spent over a decade working at the intersection of South Asian and African musical traditions. Based in London, he brings a genuinely international perspective to Ketebul Music's creative strategy.

As Creative Advisor, Shyam helps the organization think ambitiously about artistic direction, cross-cultural collaboration, and how East African music can engage with global creative communities. His network spans musicians, producers, and cultural institutions across multiple continents.

Shyam's own music practice — rooted in South Asian classical traditions but open to the world — reflects the same spirit of exploration that defines Ketebul's best work.`,
  },
  {
    name: 'Rachel Olwanda',
    role: 'Monitoring & Evaluation Expert',
    photo: '/team/rachel.jpeg',
    slug: 'rachel-olwanda',
    fullBio: `Rachel Olwanda brings specialist expertise in monitoring and evaluation, safeguarding, and community engagement to Ketebul Music. Her background in child protection and community development ensures that the organization's projects are conducted ethically and with genuine benefit to the communities involved.

As M&E Expert, Rachel designs and implements systems that allow Ketebul to measure the real impact of its work — going beyond outputs to understand the deeper changes that music preservation and promotion can create in people's lives.

Rachel's commitment to accountability and community wellbeing helps Ketebul Music demonstrate its value to funders, partners, and the public with rigour and honesty.`,
  },
  {
    name: 'Fiston Lusambo',
    role: 'Head of Music Production',
    photo: '/team/fiston.jpg',
    slug: 'fiston-lusambo',
    fullBio: `Fiston Lusambo is the sonic architect behind many of Ketebul Music's finest recordings. As Head of Music Production, this British-Congolese guitarist, composer, and sound engineer brings decades of professional experience and an extraordinary musical range to everything he produces.

Fiston's roots in Congolese rumba and his deep familiarity with the East African music scene give him a unique ear for the nuances of traditional styles, while his technical expertise ensures every recording meets the highest professional standards.

His work at Ketebul has helped preserve and elevate some of the region's most important musical voices, giving traditional artists access to world-class production without compromising their authentic sound.`,
  },
  {
    name: 'Abdi Rashid Jibril',
    role: 'Music Curator & Researcher',
    photo: '/team/abdi.jpg',
    slug: 'abdi-rashid-jibril',
    fullBio: `Abdi Rashid Jibril is one of East Africa's most active music curators, bringing fresh talent to stages and audiences across the region and beyond. As the leader of Roots International, he has built a reputation for discovering and championing artists who sit at the intersection of tradition and innovation.

At Ketebul Music, Abdi serves as Music Curator and Researcher, identifying artists whose work aligns with the organization's mission and helping to shape the musical programming of events and projects.

His deep knowledge of East African musical traditions — from the Somali coast to the Rift Valley — combined with his instinct for what will resonate with contemporary audiences makes him an invaluable guide for the organization's curatorial direction.`,
  },
  {
    name: 'Steenie Njoroge',
    role: 'Photography & Research',
    photo: '/team/steenie.jpg',
    slug: 'steenie-njoroge',
    fullBio: `Steenie Njoroge is a living legend of Kenyan photojournalism. With over 45 years spent documenting the arts, entertainment, and cultural life of East Africa, his archive is an irreplaceable visual record of the region's creative history.

At Ketebul Music, Steenie contributes both as a photographer — capturing the artists, performances, and communities that make up the Ketebul world — and as a researcher, drawing on his vast personal archive and memory to contextualise the music being documented.

His photographs do not just record events — they tell stories, preserve moments, and honour the dignity of the artists he photographs. Working with Steenie is a reminder that great photography, like great music, is a form of cultural preservation.`,
  },
  {
    name: 'Tobias "Shunkyz" Odhiambo',
    role: 'Audio Engineer',
    photo: '/team/tobias.jpg',
    slug: 'tobias-odhiambo',
    fullBio: `Tobias "Shunkyz" Odhiambo is the man behind the mix at Ketebul Music. As Audio Engineer, he is responsible for the technical quality of the organization's recordings — from initial tracking through mixing and mastering to final delivery.

Shunkyz has developed a specialised expertise in the sonic characteristics of African instruments and genres, understanding how to capture the warmth of a nyatiti, the punch of a talking drum, or the delicate resonance of a traditional flute with authenticity and clarity.

His combination of technical skill, musical sensitivity, and deep roots in East African culture makes him uniquely qualified to do justice to the music that passes through Ketebul's studios.`,
  },
  {
    name: 'Moise Bonyambala',
    role: 'Sound Engineer',
    photo: '/team/moise.jpg',
    slug: 'moise-bonyambala',
    fullBio: `Moise Bonyambala is a musician, sound engineer, and educator whose work is driven by a profound belief in music's power to heal and unite. An accomplished jazz pianist and trained sound engineer, he brings both artistic and technical depth to Ketebul Music's studio work.

Originally from a post-conflict region, Moise has dedicated his career to demonstrating how music can support peace, reconciliation, and community rebuilding. His experience working in challenging environments gives him a unique perspective on the social role that music can play.

As a music teacher, he is also committed to passing on skills and knowledge to the next generation of East African musicians and engineers, ensuring that the traditions Ketebul works to preserve are also being actively taught and practiced.`,
  },
  {
    name: 'Martin "Drix" Muyeshi',
    role: 'Director of Photography',
    photo: '/team/drix.jpg',
    slug: 'martin-muyeshi',
    fullBio: `Martin "Drix" Muyeshi grew up surrounded by photography — a second-generation visual artist who inherited both the tools and the eye of his craft. As Ketebul Music's Director of Photography, he is responsible for the visual language of the organization's documentary and archival work.

Drix's approach to documentary photography is rooted in respect for his subjects and a commitment to authentic storytelling. He travels extensively across East Africa to capture the musicians, communities, and landscapes that form the backdrop of Ketebul's projects.

His work challenges the stereotypical visual representations of Africa that dominate global media, instead offering images that are complex, beautiful, and true to the lived experience of the people he photographs.`,
  },
  {
    name: 'Carola Daniel Amri Kinasha',
    role: 'Regional Consultant',
    photo: '/team/carola.jpeg',
    slug: 'carola-kinasha',
    fullBio: `Carola Daniel Amri Kinasha is a Tanzanian songwriter, performer, and activist whose music carries strong messages of social justice, gender equality, and African identity. Her afro-centric sound draws on the rich musical traditions of Tanzania while engaging with contemporary issues that affect communities across the continent.

As Regional Consultant, Carola helps Ketebul Music strengthen its connections with the Tanzanian music scene and expand its understanding of East African musical traditions beyond Kenya's borders. Her relationships with artists, cultural institutions, and communities across Tanzania are an invaluable resource for the organization.

Carola's dual identity as both an artist and an activist embodies the belief that music is never just entertainment — it is always also a form of engagement with the world.`,
  },
];

export default async function TeamMemberPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const member = teamMembers.find(m => m.slug === slug);
  if (!member) return notFound();
  return <TeamProfile member={member} />;
}