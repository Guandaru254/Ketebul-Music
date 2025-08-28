'use client';

import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Define your gallery images data
const images = [
  { src: '/gallery/4.jpg' },
  { src: '/gallery/15.jpg' },
  { src: '/gallery/16.jpg' },
  { src: '/gallery/17.jpg' },
  { src: '/gallery/18.jpg' },
  { src: '/gallery/19.jpg' },
  { src: '/gallery/20.jpg' },
  { src: '/gallery/21.jpg' },
  { src: '/gallery/22.jpg' },
  { src: '/gallery/23.jpg' },
  { src: '/gallery/24.jpeg' },
  { src: '/gallery/25.JPG' },
  { src: '/gallery/26.JPG' },
  { src: '/gallery/27.JPG' },
  { src: '/gallery/28.JPG' },
  { src: '/gallery/29.JPG' },
  { src: '/gallery/30.JPG' },
  { src: '/gallery/31.JPG' },
  { src: '/gallery/32.JPG' },
  { src: '/gallery/33.JPG' },
  { src: '/gallery/34.JPG' },
  { src: '/gallery/35.JPG' },
  { src: '/gallery/36.JPG' },
  { src: '/gallery/37.JPG' },
  { src: '/gallery/38.JPG' },
  { src: '/gallery/39.JPG' },
  { src: '/gallery/40.JPG' },
  { src: '/gallery/41.JPG' },
  { src: '/gallery/42.JPG' },
  { src: '/gallery/43.JPG' },
  { src: '/gallery/44.JPG' },
  { src: '/gallery/45.JPG' },
  { src: '/gallery/46.JPG' },
  { src: '/gallery/47.JPG' },
  { src: '/gallery/48.JPG' },
  { src: '/gallery/49.JPG' },
  { src: '/gallery/50.JPG' },
  { src: '/gallery/51.JPG' },
  { src: '/gallery/52.JPG' },
  { src: '/gallery/53.JPG' },
  { src: '/gallery/54.JPG' },
  { src: '/gallery/55.JPG' },
  { src: '/gallery/56.JPG' },
  { src: '/gallery/57.JPG' },
  { src: '/gallery/58.JPG' },
  { src: '/gallery/59.JPG' },
  { src: '/gallery/60.JPG' },
  { src: '/gallery/61.JPG' },
];

export default function GalleryPage() {
  // State for controlling the lightbox
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Function to open the lightbox
  const openLightbox = useCallback((index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
  }, []);

  // Function to close the lightbox
  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = ''; // Re-enable scrolling
  }, []);

  // Functions to navigate images in the lightbox
  const goToNext = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const goToPrev = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }, [images.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (event.key === 'ArrowRight') {
        goToNext();
      } else if (event.key === 'ArrowLeft') {
        goToPrev();
      } else if (event.key === 'Escape') {
        closeLightbox();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxOpen, goToNext, goToPrev, closeLightbox]);

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 py-16 px-4 sm:px-6 lg:px-8 font-inter">
      {/* Tailwind CSS CDN for Canvas preview - typically in _app.js or _document.js for Next.js */}
      <script src="https://cdn.tailwindcss.com"></script>

      {/* Gallery Header Section */}
      <section className="text-center mb-12"></section>

      {/* Gallery Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 max-w-7xl mx-auto">
        {images.map((img, index) => (
          <motion.div
            key={index}
            className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer group bg-gray-800 border border-transparent hover:border-yellow-500 transition-all duration-300"
            whileHover={{ scale: 1.03, boxShadow: "0 12px 24px rgba(0,0,0,0.3)" }}
            whileTap={{ scale: 0.98 }}
            onClick={() => openLightbox(index)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
          >
            {/* Image Container with Skeleton Loader */}
            <div className="relative w-full h-64 sm:h-72 md:h-80 overflow-hidden">
              <ImageLoader src={img.src} index={index} />
              {/* Overlay for hover effect */}
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-lg font-semibold transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  View
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeLightbox} // Close when clicking outside the image
          >
            {/* Lightbox Content */}
            <motion.div
              className="relative max-w-full max-h-full flex items-center justify-center"
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image
            >
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 text-white text-4xl leading-none z-10 p-2 hover:text-yellow-400 transition-colors"
                onClick={closeLightbox}
                aria-label="Close Lightbox"
              >
                &times;
              </button>

              {/* Navigation Buttons */}
              <button
                className="absolute left-4 bg-gray-800 bg-opacity-70 text-white p-3 rounded-full text-2xl z-10 hover:bg-opacity-100 transition-colors hidden md:block"
                onClick={goToPrev}
                aria-label="Previous Image"
              >
                &#x25C0; {/* Left arrow character */}
              </button>
              <button
                className="absolute right-4 bg-gray-800 bg-opacity-70 text-white p-3 rounded-full text-2xl z-10 hover:bg-opacity-100 transition-colors hidden md:block"
                onClick={goToNext}
                aria-label="Next Image"
              >
                &#x25B6; {/* Right arrow character */}
              </button>

              {/* Image in Lightbox */}
              <div className="relative w-[90vw] h-[75vh] sm:w-[80vw] sm:h-[80vh] lg:w-[70vw] lg:h-[70vh]">
                <Image
                  src={images[currentImageIndex].src}
                  fill
                  style={{ objectFit: 'contain' }} // Ensure the whole image fits
                  className="rounded-lg shadow-2xl"
                  priority // Prioritize loading the current lightbox image
                  alt={`Gallery image ${currentImageIndex + 1}`} // Added alt text
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

// Separate component for Image with Skeleton Loader (copied for self-containment)
function ImageLoader({ src, index }: { src: string, index: number }) { // Added index prop
  const [loading, setLoading] = useState(true);

  // Fallback placeholder image in case the original is not found (404)
  const fallbackSrc = 'https://placehold.co/600x400/374151/DAA520?text=Image+Missing';

  return (
    <div className="relative w-full h-full">
      <Image
        src={src}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className={`
          object-cover object-center rounded-xl // Rounded corners for image
          transition-opacity duration-500 ease-in-out
          ${loading ? 'opacity-0' : 'opacity-100'} // Hide image until loaded
        `}
        onLoad={() => setLoading(false)}
        onError={(e) => {
          setLoading(false); // Hide skeleton even on error
          e.currentTarget.onerror = null; // Prevent infinite loop
          e.currentTarget.src = fallbackSrc; // Fallback image
          console.error(`Failed to load image: ${src}. Displaying fallback.`);
        }}
        priority={false} // Only critical images for initial load need priority
        alt={`Gallery thumbnail ${index + 1}`} // Added alt text
      />
      {loading && (
        <div className="absolute inset-0 bg-gray-700 animate-pulse rounded-xl flex items-center justify-center">
          <span className="text-gray-400 text-sm">Loading Image...</span>
        </div>
      )}
    </div>
  );
}
