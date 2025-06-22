'use client';

import Image from "next/image";
import "./about.css";

export default function AboutPage() {
  return (
    <main className="about-page">
      {/* Hero Section */}

      {/* Mission Section */}
      <section className="about-section">
        <div className="text-block">
          <h2>Our Mission</h2>
          <p>
            We are committed to documenting, supporting, and promoting East African music through original production, artist development, and cultural programming that spans generations.
          </p>
        </div>
        <div className="image-block">
          <Image
            src="/gallery/3.jpeg"
            alt="Inside Ketebul Music Studio"
            width={600}
            height={400}
            className="about-image"
            priority
          />
        </div>
      </section>

      {/* Story Section */}
      <section className="about-section reverse">
        <div className="text-block">
          <h2>Our Story</h2>
          <p>
            Since 2007, Ketebul Music has captured the essence of East Africa’s rich soundscape — from field recordings and archival research to large-scale musical productions that inspire and educate.
          </p>
        </div>
         <div className="image-block">
          <Image
            src="/osusa.jpg"
            alt="Team recording session at Ketebul"
            width={600}
            height={400}
            className="about-image"
            priority
          />
        </div>
      </section>

      {/* What We Do */}
      <section className="about-section what-we-do">
        <div className="text-block">
          <h2>What We Do</h2>
          <p>
            From state-of-the-art studio production to multimedia archiving and documentary filmmaking, we amplify the voices of East Africa’s past, present, and future.
          </p>
        </div>
      </section>

      {/* Studios & Services */}
      <section className="about-section services-section">
        <div className="text-block">
          <h2>Studios & Services</h2>
          <p><strong>Studio A:</strong> Our flagship room for full band multi-track sessions. Equipped with:</p>
          <ul>
            <li>Digi 002, Korg Triton Rack, Yamaha Motif</li>
            <li>TC Electronics Finalizer, Focusrite Preamp</li>
            <li>Tascam CD/Tape/ADAT, MOTU MIDI Timepiece</li>
            <li>Logic Pro, Pro Tools, Ableton, Reason, Cubase, Nuendo</li>
          </ul>

          <p><strong>Studio B:</strong> Ideal for vocals, single-instrument tracking, and project work:</p>
          <ul>
            <li>Korg Triton Workstation, Roland Phantom XR</li>
            <li>M-Audio MIDI, Tascam CD & Tape Unit</li>
            <li>Same full DAW support as Studio A</li>
          </ul>

          <p><strong>Audio Services:</strong></p>
          <ul>
            <li>Live multi-track recording</li>
            <li>Digital programming & post-production</li>
            <li>Voice-over recording</li>
            <li>Studio hire & format conversions (Tape, ADAT, CD, Vinyl)</li>
          </ul>

          <p><strong>Video Services:</strong></p>
          <ul>
            <li>Documentary production & music videos</li>
            <li>Editing suite (Final Cut Pro, Adobe CS)</li>
            <li>Camera & crew hire</li>
            <li>VHS/DVD/MiniDV digitization</li>
          </ul>

        </div>
      </section>
    </main>
  );
}
