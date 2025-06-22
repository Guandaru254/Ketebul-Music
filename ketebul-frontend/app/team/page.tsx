'use client';

import Image from 'next/image';
import './team.css';

const teamMembers = [
  {
    name: 'Tabu Osusa',
    role: 'Founder & Executive Director',
    photo: '/team/tabu.jpg',
    bio: 'Tabu is an iconic figure in the East African music industry and founding Executive Director of Ketebul Music.',
  },
  {
    name: 'Khadija Mohamed',
    role: 'Chairperson of the Fund-Raising Committee',
    photo: '/team/khadija.jpeg',
    bio: 'Khadija is a change management consultant with over a decade of experience in the UK and Kenya.',
  },
  {
    name: 'Paul Kelemba (Maddo)',
    role: 'Board Chairman & Creative Innovations',
    photo: '/team/maddo.jpeg',
    bio: 'Paul Kelemba, aka Maddo, is a renowned satirical illustrator and cultural advocate in Nairobi.',
  },
  {
    name: 'Bill Odidi',
    role: 'Board Member & Editor',
    photo: '/team/bill.jpg',
    bio: 'Bill is a seasoned journalist and radio programs controller at KBC with deep knowledge of the music industry.',
  },
  {
    name: 'Guy Morley',
    role: 'Board Member & Projects Consultant',
    photo: '/team/guy.jpg',
    bio: 'Guy is Director of No Nation and has programmed major UK festivals like The Big Chill and Brighton Festival.',
  },
  {
    name: 'Nathan Makokha',
    role: 'Accounts & Finance',
    photo: '/team/nathan.jpeg',
    bio: 'Nathan is a finance professional specializing in budgeting, compliance, and financial systems.',
  },
  {
    name: 'Shyam Shah',
    role: 'Creative Advisor',
    photo: '/team/shyam.jpg',
    bio: 'Shyam is a musician and cultural consultant based in London with a decade of international experience.',
  },
  {
    name: 'Anditi Tigo',
    role: 'Executive Assistant',
    photo: '/team/anditi.jpg',
    bio: 'Anditi is a strategist and singer-songwriter focused on African culture and inclusive cultural development.',
  },
  {
    name: 'Rachel Olwanda',
    role: 'Monitoring & Evaluation Expert',
    photo: '/team/rachel.jpeg',
    bio: 'Rachel specializes in safeguarding, M&E, and community engagement with a focus on child protection.',
  },
  {
    name: 'Fiston Lusambo',
    role: 'Head of Music Production',
    photo: '/team/fiston.jpg',
    bio: 'Fiston is a veteran British-Congolese guitarist, composer, and engineer with decades of experience.',
  },
  {
    name: 'Abdi Rashid Jibril',
    role: 'Music Curator & Researcher',
    photo: '/team/abdi.jpg',
    bio: 'Abdi leads Roots International and curates East Africa’s premier live music nights.',
  },
  {
    name: 'Steenie Njoroge',
    role: 'Photography & Research',
    photo: '/team/steenie.jpg',
    bio: 'Steenie is a veteran photojournalist with over 45 years in the arts and entertainment industry.',
  },
  {
    name: 'Tobias "Shunkyz" Odhiambo',
    role: 'Audio Engineer',
    photo: '/team/tobias.jpg',
    bio: 'Shunkyz is a skilled audio engineer specializing in African genres, mixing, and mastering.',
  },
  {
    name: 'Nick Abonyo',
    role: 'Label Manager',
    photo: '/team/nick.jpg',
    bio: 'Nick oversees artist relations and project coordination with a tech-savvy approach to music management.',
  },
  {
    name: 'Patrick "Sapat" Ondiek',
    role: 'Projects Manager',
    photo: '/team/patrick.jpg',
    bio: 'Patrick is a videographer passionate about visual storytelling and documentary production.',
  },
  {
    name: 'Martin "Drix" Muyeshi',
    role: 'Director of Photography',
    photo: '/team/drix.jpg',
    bio: 'Drix is a second-generation photographer and documentary visual artist focused on African stories.',
  },
  {
    name: 'Carola Daniel Amri Kinasha',
    role: 'Regional Consultant',
    photo: '/team/carola.jpeg',
    bio: 'Carola is a Tanzanian songwriter and activist creating afro-centric music with strong social messages.',
  },
];

export default function TeamPage() {
  return (
    <main className="team-page">
      <section className="team-header">
        <h1>Meet the Team</h1>
        <p>Our dedicated team of professionals, creatives, and cultural advocates powering Ketebul Music.</p>
      </section>

      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <article className="team-card" key={index}>
            <Image
              src={member.photo}
              alt={`Photo of ${member.name}`}
              width={200}
              height={200}
              className="team-photo"
            />
            <h2 className="member-name">{member.name}</h2>
            <p className="member-role">{member.role}</p>
            <p className="member-bio">{member.bio}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
