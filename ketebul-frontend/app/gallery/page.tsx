'use client';

import Image from 'next/image';
import './gallery.css';

const images = [
  { src: '/gallery/1.jpeg', alt: 'Recording Session 1' },
  { src: '/gallery/2.jpeg', alt: 'Performance at Venue' },
  { src: '/gallery/3.jpeg', alt: 'Team in Studio' },
  { src: '/gallery/4.jpg', alt: 'Traditional Instruments' },
  { src: '/gallery/5.jpeg', alt: 'Youth Music Workshop' },
  { src: '/gallery/6.jpeg', alt: 'Live Concert Moment' },
  { src: '/gallery/7.jpeg', alt: 'Outdoor Rehearsal' },
  { src: '/gallery/8.jpeg', alt: 'Studio Candid' },
  { src: '/gallery/9.jpeg', alt: 'Studio Candid' },
  { src: '/gallery/10.jpeg', alt: 'Studio Candid' },
  { src: '/gallery/11.jpeg', alt: 'Studio Candid' },
  { src: '/gallery/12.jpeg', alt: 'Studio Candid' },
  { src: '/gallery/13.jpeg', alt: 'Studio Candid' },
  { src: '/gallery/14.jpeg', alt: 'Studio Candid' },
  { src: '/gallery/15.jpg', alt: 'Studio Candid' },
  { src: '/gallery/16.jpg', alt: 'Studio Candid' },
  { src: '/gallery/17.jpg', alt: 'Studio Candid' },
  { src: '/gallery/18.jpg', alt: 'Studio Candid' },
  { src: '/gallery/19.jpg', alt: 'Studio Candid' },
  { src: '/gallery/20.jpg', alt: 'Studio Candid' },
  { src: '/gallery/21.jpg', alt: 'Studio Candid' },
  { src: '/gallery/22.jpg', alt: 'Studio Candid' },
  { src: '/gallery/23.jpg', alt: 'Studio Candid' },
  { src: '/gallery/24.jpg', alt: 'Studio Candid' },
];

export default function GalleryPage() {
  return (
    <main className="gallery-page">
      <section className="gallery-header">
        <h1>Gallery</h1>
        <p>Moments from our musical journey — on stage, in studio & behind the scenes.</p>
      </section>

      <section className="gallery-grid">
        {images.map((img, index) => (
          <div key={index} className="gallery-item">
            <Image
              src={img.src}
              alt={img.alt}
              width={400}
              height={300}
              className="gallery-img"
              loading="lazy"
            />
          </div>
        ))}
      </section>
    </main>
  );
}
