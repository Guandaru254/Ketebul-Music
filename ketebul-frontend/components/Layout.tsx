'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Facebook, Instagram, Youtube } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Artists', href: '/artists' },
  { label: 'Projects', href: '/projects' },
  { label: 'Team', href: '/team' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Updates', href: '/updates' },
  { label: 'Contact', href: '/contact' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset'; // Cleanup on unmount
    };
  }, [mobileMenuOpen]);

  // Initialize AOS (Animate On Scroll) for global animations
  useEffect(() => {
    // Dynamically import AOS on the client-side only
    import('aos')
      .then((AOS) => {
        AOS.init({
          offset: 120, // offset (in px) from the original trigger point
          delay: 0,    // values from 0 to 3000, with step 50ms
          duration: 800, // values from 0 to 3000, with step 50ms
          easing: 'ease-in-out', // default easing for AOS animations
          once: true,  // whether animation should happen only once - while scrolling down
        });
        AOS.refresh(); // Recalculate positions on component mount/update
      })
      .catch((error) => console.error("Error loading AOS:", error));
  }, []); // Empty dependency array means this runs once on mount

  return (
    // Outer container: Uses a solid dark background to ensure no white "extension" is visible
    // text-white is applied here to make it the default dominant text color for children
    <div className="flex flex-col min-h-screen bg-gray-950 font-inter antialiased text-white"> {/* Base font is Inter, dominant text is white */}
      {/* Header Section: Fixed, professional gradient, stronger shadow, ADJUSTED HEIGHT */}
      <header className="fixed top-0 w-full bg-gradient-to-r from-gray-900 to-black text-white shadow-2xl z-50 transition-all duration-300 ease-in-out py-2.5 sm:py-2.5"> {/* Increased py- for taller header */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center relative h-14 sm:h-14"> {/* Consistent fixed height */}
          {/* Logo */}
          <Link href="/" className="flex items-center group flex-shrink-0">
            <Image
              src="/logo.png" // Ensure this path is correct in your public folder
              alt="Ketebul Music Logo"
              width={160}
              height={48}
              priority
              // Added w-auto h-auto to try and resolve aspect ratio warning, but primary dimensions are width/height props
              className="object-contain transition-transform duration-300 group-hover:scale-105 w-auto h-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          {/* Reduced space-x- for tighter spacing, links remain ml-auto for right alignment */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 ml-auto">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  relative text-xs font-medium tracking-wide uppercase px-2 py-1 // Changed text-sm to text-xs for smaller size
                  transition-colors duration-300 ease-in-out
                  hover:text-yellow-400 group // Changed hover color to yellow-400
                  ${pathname === item.href ? 'text-yellow-400 font-semibold' : 'text-white'} // Changed active color to yellow-400
                  
                  before:content-[''] before:absolute before:bottom-[-4px] before:left-1/2 before:-translate-x-1/2 before:h-[2px]
                  before:bg-yellow-400 before:transition-all before:duration-300 before:ease-in-out before:rounded-full
                  ${pathname === item.href
                    ? 'before:w-full before:opacity-100' // Active: full width, visible
                    : 'before:w-0 before:opacity-0 group-hover:before:w-3/4 group-hover:before:opacity-100' // Inactive: hidden, then 3/4 width visible on hover
                  }
                `.replace(/\s+/g, ' ').trim()} 
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button
            className="md:hidden p-2 rounded-md text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors duration-200" // Changed ring color
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>

        {/* Mobile Navigation Overlay & Menu (Animated Slide-in) */}
        {mobileMenuOpen && (
          // Overlay to dim background content
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)} // Close menu when clicking overlay
          ></div>
        )}
        <div
          className={`fixed top-0 right-0 h-full w-3/4 max-w-sm
            bg-gradient-to-r from-gray-900 to-black // MATCH MAIN HEADER GRADIENT
            shadow-lg transform transition-transform duration-300 ease-in-out z-50 md:hidden
            ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="flex justify-end p-4 border-b border-gray-800">
            <button
              className="p-2 text-white hover:bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400" // Changed ring color
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close mobile menu"
            >
              <X size={32} />
            </button>
          </div>
          <nav className="flex flex-col items-center space-y-6 py-8 px-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`
                  w-full text-center text-xl py-3 uppercase tracking-wide
                  transition-colors duration-200 ease-in-out
                  ${pathname === item.href ? 'text-yellow-400 font-bold' : 'text-white hover:text-yellow-400'} // Changed mobile link colors
                `}
              >
                {item.label}
              </Link>
            ))}
            {/* Social Links for Mobile Menu */}
            <div className="flex justify-center space-x-8 mt-10 text-yellow-400"> {/* Changed social icon color */}
              <Link href="https://facebook.com/ketebulmusic" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook size={32} className="hover:text-white transition-colors transform hover:scale-110" />
              </Link>
              <Link href="https://instagram.com/ketebulmusic" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram size={32} className="hover:text-white transition-colors transform hover:scale-110" />
              </Link>
              <Link href="https://youtube.com/ketebulmusic" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <Youtube size={32} className="hover:text-white transition-colors transform hover:scale-110" />
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content Area - ADJUSTED padding for fixed header to prevent overlap */}
      {/* Updated pt- to account for slightly taller header */}
      <main className="flex-grow pt-[4.5rem] sm:pt-[4.75rem] lg:pt-[5rem]">
        {children}
      </main>

      {/* Footer Section - kept consistent */}
      <footer className="bg-gray-900 text-gray-300 py-8 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-center md:text-left font-josefin-sans">&copy; {new Date().getFullYear()} Ketebul Music. All rights reserved.</p>
          <div className="flex space-x-6 text-gray-400">
            <Link href="https://facebook.com/ketebulmusic" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <Facebook size={20} className="hover:text-yellow-500 transition-colors transform hover:scale-110" />
            </Link>
            <Link href="https://instagram.com/ketebulmusic" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram size={20} className="hover:text-yellow-500 transition-colors transform hover:scale-110" />
            </Link>
            <Link href="https://youtube.com/ketebulmusic" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <Youtube size={20} className="hover:text-yellow-500 transition-colors transform hover:scale-110" />
            </Link>
          </div>
          <div className="flex space-x-4 text-sm text-gray-500 font-josefin-sans">
            <Link href="/privacy-policy" className="hover:text-yellow-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-yellow-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
