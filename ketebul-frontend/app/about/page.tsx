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
          <h2>Our Mission Statement</h2>
          <p>
To Identify, preserve, conserve and to promote the diverse music traditions of East Africa          </p>
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
Ketebul Music was established in early 2007 with the ambitious vision to carry out research and promote the diverse fusion of traditional sounds of Kenya and East Africa through the documentation and archiving of the work of musicians who have shaped the various genres of music from the region over the past six decades. In broader terms, intensive research carried out by Ketebul Music involves the musicians themselves, their families, industry players such as producers and promoters, media personalities and the market audience.         <br /> <br />
            Memorable archiving is achieved through intensive academic research reports released along with a market-friendly package from each phase of research. The package comprises of a shorter, but succinct, popular version of the academic report and is contained in an attractively designed booklet. To reinforce it is an audio CD featuring re-releases of previous recordings along with a video documentary carrying intensive interviews, analyses, stage performances and archive footage.
         
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
          <br /> <br />
          We specialise in both traditional and contemporary African music, with an emphasis on live recorded instruments as opposed to sequenced sounds. We believe in keeping the music as authentic and organic as possible.
          </p>
        </div>
      </section>

      {/* Studios & Services */}
      <section className="about-section services-section">
        <div className="text-block">
          <h2>Studios & Services</h2>
          Our studios, based at the GoDown Arts Centre, boast two fully equipped analogue and digital studios.
          <p><strong>Studio A:</strong> This is our main studio which has large sound booth set up to handle live multi track recordings for bands. The control room is equipped with a Mac Pro, running on Logic Pro, Pro Tools, Ableton Live, Reason, Cubase and Nuendo. We are also equipped with rack mounted outboard units including;</p>
          <ul>
            <li>Digi 002, Korg Triton Rack, Yamaha Motif</li>
            <li>TC Electronics Finalizer, Focusrite Preamp</li>
            <li>Tascam CD/Tape/ADAT, MOTU MIDI Timepiece</li>
            <li>Logic Pro, Pro Tools, Ableton, Reason, Cubase, Nuendo</li>
          </ul>

          <p><strong>Studio B:</strong>This is our project studio, designed to handle vocal recording, guitar and single instrument multi track sessions. Also running on Logic, Cubase and Nuendo, Studio B also has outboard equipment such as,</p>
          <ul>
            <li>Digi 002, Korg Triton Workstation, Roland Phantom XR Sampler</li>
            <li>M-Audio MIDI, Tascam CD & Tape Unit</li>
          </ul>

          <p><strong>Audio Services:</strong></p>
          <ul>
            <li>Live multi-track recording</li>
            <li>Digital programming & post-production</li>
            <li>Voice-over recording</li>
            <li>Studio hire & format conversions (Tape, ADAT, CD, Vinyl)</li>
          </ul>

          <h2>Video Production, recording and editing suite</h2>
          <p>Ketebul Music recently ventured into video production.  We specialize in research based documentaries, on the origins and development or traditional sounds, music, and culture of East Africa.
             <br /> <br />
             These documentaries form part of the cultural archives that Ketebul Music is in the process of establishing. Through this audio visual archive, Ketebul Music will process and store material on the origins and development East African music genres.</p>
          <br />
          <p>We also offer services for the production of music videos. Our editing suite is equipped with a Mac Pro, running Final Cut Pro and Adobe CS4.</p>
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
