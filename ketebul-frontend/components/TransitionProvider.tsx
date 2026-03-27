"use client";

import { AnimatePresence, motion, Variants } from 'framer-motion';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

// Loading screen — only fades out, no movement
const loadingVariants: Variants = {
  initial: { opacity: 1 },
  animate: {
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: 'easeInOut',
    },
  },
  exit: { opacity: 0 },
};

// Page content — pure fade only, NO y movement (that was causing the shake)
const pageVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.35,
      ease: 'easeInOut',
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: 'easeInOut',
    },
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
    <div className="relative w-40 h-40">
      <Image
        src="/logo.png"
        alt="Ketebul Music Logo"
        fill
        sizes="160px"
        style={{ objectFit: 'contain' }}
        className="animate-pulse"
      />
    </div>
  </motion.div>
);

const TransitionProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    if (isFirstLoad) {
      // Show loading screen only on first visit
      const timer = setTimeout(() => {
        setIsLoading(false);
        setIsFirstLoad(false);
      }, 800);
      return () => clearTimeout(timer);
    }
    // On subsequent navigation, no loading screen — just fade
    setIsLoading(false);
  }, [pathname]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loading-screen" />}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default TransitionProvider;