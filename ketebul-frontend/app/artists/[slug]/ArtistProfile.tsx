'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Artist, DiscographyItem } from './page';

// SVG Icons for DSPs
const SpotifyIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.899 4.62-1.02 8.58-.6 11.7 1.32.42.18.479.659.241 1.019zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141 C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.18-.1.2-.78-.42-.6-.18-.78-.78-.6-1.38 4.26-1.26 11.28-1.02 15.72 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
  </svg>
);

const AppleMusicIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.54c.6-0.73 1.01-1.75.9-2.77-.87.04-1.92.58-2.54 1.3-.56.64-1.05 1.68-.92 2.68 0.97.08 1.96-.48 2.56-1.21z"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export default function ArtistProfile({ artist }: { artist: Artist }) {
  const [loading, setLoading] = useState(true);

  // Helper to sort items from Latest to Earliest (Newest -> Oldest)
  const sortByYearDescending = (items?: DiscographyItem[]) => {
    if (!items) return [];
    return [...items].sort((a, b) => parseInt(b.year, 10) - parseInt(a.year, 10));
  };

  const sortedAlbums = sortByYearDescending(artist.albumsAndEPs);
  const sortedSingles = sortByYearDescending(artist.singles);

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 px-6 py-12 md:py-20 font-inter">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* TOP SECTION: IMAGE + HEADER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* ARTIST PORTRAIT */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-gray-800"
          >
            <Image
              src={artist.image}
              alt={artist.name}
              fill
              priority
              className={`object-cover transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}
              onLoad={() => setLoading(false)}
            />
            {loading && (
              <div className="absolute inset-0 bg-gray-900 animate-pulse flex items-center justify-center">
                <span className="text-gray-500 text-sm">Loading portrait...</span>
              </div>
            )}
          </motion.div>

          {/* MAIN INFO & DSP LINKS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7 flex flex-col justify-between space-y-6"
          >
            <div>
              <span className="text-yellow-500 font-bold text-xs uppercase tracking-widest block mb-2">
                Featured Artist
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-2">
                {artist.name}
              </h1>

              {artist.realName && (
                <p className="text-gray-400 text-lg mb-4">
                  <span className="text-gray-500">Real Name:</span> {artist.realName}
                </p>
              )}

              <p className="text-gray-300 text-xl font-medium leading-relaxed italic border-l-4 border-yellow-500 pl-4 py-1 mb-6">
                "{artist.tagline}"
              </p>

              {/* TAGS / METADATA */}
              <div className="flex flex-wrap gap-2 mb-8">
                {artist.genres.map((genre) => (
                  <span key={genre} className="bg-gray-900 text-gray-300 text-xs px-3 py-1.5 rounded-full border border-gray-800">
                    {genre}
                  </span>
                ))}
                {artist.instruments.map((inst) => (
                  <span key={inst} className="bg-yellow-500/10 text-yellow-400 text-xs px-3 py-1.5 rounded-full border border-yellow-500/20">
                    {inst}
                  </span>
                ))}
              </div>
            </div>

            {/* STREAMING / DSP LINKS */}
            <div className="bg-gray-900/80 p-6 rounded-2xl border border-gray-800/80 shadow-lg">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                Listen & Stream
              </h3>
              <div className="flex flex-wrap gap-3">
                {artist.streamingLinks.spotify && (
                  <a
                    href={artist.streamingLinks.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-[#1DB954]/10 hover:bg-[#1DB954] text-[#1DB954] hover:text-black font-semibold text-sm py-2.5 px-5 rounded-full transition-all duration-200 border border-[#1DB954]/30 cursor-pointer"
                  >
                    <SpotifyIcon />
                    Spotify
                  </a>
                )}

                {artist.streamingLinks.appleMusic && (
                  <a
                    href={artist.streamingLinks.appleMusic}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-[#FC3C44]/10 hover:bg-[#FC3C44] text-[#FC3C44] hover:text-white font-semibold text-sm py-2.5 px-5 rounded-full transition-all duration-200 border border-[#FC3C44]/30 cursor-pointer"
                  >
                    <AppleMusicIcon />
                    Apple Music
                  </a>
                )}

                {artist.streamingLinks.youtube && (
                  <a
                    href={artist.streamingLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-[#FF0000]/10 hover:bg-[#FF0000] text-[#FF0000] hover:text-white font-semibold text-sm py-2.5 px-5 rounded-full transition-all duration-200 border border-[#FF0000]/30 cursor-pointer"
                  >
                    <YoutubeIcon />
                    YouTube
                  </a>
                )}

                {artist.streamingLinks.audiomack && (
                  <a
                    href={artist.streamingLinks.audiomack}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-amber-500/10 hover:bg-amber-500 text-amber-500 hover:text-black font-semibold text-sm py-2.5 px-5 rounded-full transition-all duration-200 border border-amber-500/30 cursor-pointer"
                  >
                    Audiomack
                  </a>
                )}
              </div>
            </div>

          </motion.div>
        </div>

        {/* BOTTOM SECTION: DETAILED BIO & DISCOGRAPHY */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-6">

          {/* DETAILED BIO SECTIONS */}
          <div className="lg:col-span-7 space-y-8">
            <h2 className="text-2xl font-bold text-white border-b border-gray-800 pb-3">
              Biography & Cultural Journey
            </h2>

            {artist.bioSections.map((section, idx) => (
              <div key={idx} className="bg-gray-900/40 p-6 rounded-2xl border border-gray-800/60 space-y-3">
                <h3 className="text-lg font-bold text-yellow-500">{section.title}</h3>
                <p className="text-gray-300 leading-relaxed text-base whitespace-pre-line">
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          {/* SIDEBAR: DISCOGRAPHY SECTIONS */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* ALBUMS & EPS */}
            {sortedAlbums.length > 0 && (
              <div className="bg-gray-900/60 p-6 rounded-2xl border border-gray-800">
                <h3 className="text-lg font-bold text-white mb-4 border-b border-gray-800 pb-2">
                  Albums & EPs
                </h3>
                <ul className="space-y-3">
                  {sortedAlbums.map((item, idx) => (
                    <li key={idx} className="flex justify-between items-center text-sm border-b border-gray-800/40 pb-2">
                      <div>
                        <p className="font-semibold text-gray-200">{item.title}</p>
                        <p className="text-xs text-gray-500">{item.type}</p>
                      </div>
                      <span className="text-xs font-mono text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded">
                        {item.year}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* SINGLES & COLLABORATIONS */}
            {sortedSingles.length > 0 && (
              <div className="bg-gray-900/60 p-6 rounded-2xl border border-gray-800">
                <h3 className="text-lg font-bold text-white mb-4 border-b border-gray-800 pb-2">
                  Singles & Collaborations
                </h3>
                <ul className="space-y-3">
                  {sortedSingles.map((item, idx) => (
                    <li key={idx} className="flex justify-between items-center text-sm border-b border-gray-800/40 pb-2">
                      <div>
                        <p className="font-semibold text-gray-200">{item.title}</p>
                        <p className="text-xs text-gray-500">{item.type}</p>
                      </div>
                      <span className="text-xs font-mono text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded">
                        {item.year}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <Link
                href="/artists"
                className="w-full inline-flex justify-center items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-gray-950 font-bold py-3.5 px-8 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 shadow-xl cursor-pointer"
              >
                ← Back to All Artists
              </Link>
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}