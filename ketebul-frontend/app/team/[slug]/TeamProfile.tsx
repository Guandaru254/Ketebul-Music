'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function TeamProfile({ member }: { member: any }) {
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
            {member.role}
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative w-full h-[480px] rounded-2xl overflow-hidden shadow-2xl border border-gray-800"
          >
            <Image
              src={member.photo}
              alt={member.name}
              fill
              priority
              className={`object-cover object-top transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}
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
            <h1 className="text-4xl md:text-5xl font-bold font-inter mb-8 text-white leading-tight">
              {member.name}
            </h1>

            <div className="bg-gray-900/40 p-8 rounded-2xl border border-gray-800">
              <p className="text-gray-300 leading-relaxed text-lg whitespace-pre-line">
                {member.fullBio}
              </p>
            </div>

            <Link
              href="/team"
              className="inline-block mt-10 bg-yellow-500 hover:bg-yellow-600 text-gray-950 font-bold py-4 px-10 rounded-full transition-all hover:scale-105 active:scale-95 shadow-xl"
            >
              Back to Team
            </Link>
          </motion.div>

        </div>
      </div>
    </main>
  );
}