"use client";

import { AnimatePresence, motion, Variants } from 'framer-motion';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

// The animation variants for the loading screen.
const loadingVariants: Variants = {
  initial: {
    opacity: 1,
  },
  animate: {
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: [0.65, 0, 0.35, 1], // Correct cubic-bezier for easeInOut
    },
  },
  exit: {
    opacity: 0,
  },
};

// The animation variants for the page content.
const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.65, 0, 0.35, 1],
      delay: 0.2,
    },
  },
  exit: {
    opacity: 0,
  },
};

const LoadingScreen = () => (
  <motion.div
    className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-zinc-900"
    variants={loadingVariants}
    initial="initial"
    animate="animate"
    exit="exit"
  >
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-40 h-40">
        <Image 
          src="/logo.png" 
          alt="Ketebul Music Logo" 
          layout="fill" 
          objectFit="contain"
          className="animate-pulse"
        />
      </div>
    </div>
  </motion.div>
);

const TransitionProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    // After a short delay, hide the loading screen to allow the new page to appear.
    const timer = setTimeout(() => setIsTransitioning(false), 800);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <AnimatePresence mode="wait">
      {isTransitioning && <LoadingScreen key="loading-screen" />}
      <motion.div
        key={pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default TransitionProvider;
