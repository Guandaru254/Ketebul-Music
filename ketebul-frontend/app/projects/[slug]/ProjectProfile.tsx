'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ProjectProfile({ project }: { project: any }) {
  const [loading, setLoading] = useState(true);

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 px-6 py-16 font-inter">
      <div className="max-w-5xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <span className="bg-yellow-500 text-gray-950 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
            {project.category}
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative w-full h-[420px] rounded-2xl overflow-hidden shadow-2xl border border-gray-800"
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority
              className={`object-cover transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}
              onLoad={() => setLoading(false)}
            />
            {loading && (
              <div className="absolute inset-0 bg-gray-800 animate-pulse rounded-2xl flex items-center justify-center">
                <p className="text-gray-500 text-sm">Loading...</p>
              </div>
            )}
          </motion.div>

          {/* TEXT */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold font-josefin-sans mb-6 text-white leading-tight">
              {project.title}
            </h1>

            <div className="bg-gray-900/40 p-8 rounded-2xl border border-gray-800">
              <p className="text-gray-300 leading-relaxed text-lg whitespace-pre-line">
                {project.fullDescription}
              </p>
            </div>

            <Link
              href="/projects"
              className="inline-block mt-10 bg-yellow-500 hover:bg-yellow-600 text-gray-950 font-bold py-4 px-10 rounded-full transition-all hover:scale-105 active:scale-95 shadow-xl"
            >
              Back to Projects
            </Link>
          </motion.div>

        </div>
      </div>
    </main>
  );
}