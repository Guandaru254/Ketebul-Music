'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Facebook, Instagram, Youtube } from 'lucide-react';

const navItems = [
  { label: 'Home',     href: '/'         },
  { label: 'About Us', href: '/about'    },
  { label: 'Artists',  href: '/artists'  },
  { label: 'Projects', href: '/projects' },
  { label: 'Team',     href: '/team'     },
  { label: 'Gallery',  href: '/gallery'  },
  { label: 'Updates',  href: '/updates'  },
  { label: 'Shop',     href: '/shop'     },
  { label: 'Contact',  href: '/contact'  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => { setMobileMenuOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [mobileMenuOpen]);

  useEffect(() => {
    import('aos').then((AOS) => {
      AOS.init({ offset: 120, delay: 0, duration: 800, easing: 'ease-in-out', once: true });
      AOS.refresh();
    }).catch((error) => console.error('Error loading AOS:', error));
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-950 font-inter antialiased text-white">

      {/* ── Header ── */}
      <header className="fixed top-0 w-full bg-gradient-to-r from-gray-900 to-black text-white shadow-2xl z-50 transition-all duration-300 ease-in-out py-2.5 border-b border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center relative h-14">
          <Link href="/" className="flex items-center group flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Ketebul Music Logo"
              width={160}
              height={48}
              priority
              className="object-contain transition-transform duration-300 group-hover:scale-105 w-auto h-auto"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center space-x-3 lg:space-x-5 ml-auto">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  relative text-xs font-medium tracking-wide uppercase px-2 py-1
                  transition-colors duration-300 ease-in-out hover:text-yellow-400 group
                  ${pathname === item.href ? 'text-yellow-400 font-semibold' : 'text-white'}
                  before:content-[''] before:absolute before:bottom-[-4px] before:left-1/2 before:-translate-x-1/2 before:h-[2px]
                  before:bg-yellow-400 before:transition-all before:duration-300 before:ease-in-out before:rounded-full
                  ${pathname === item.href
                    ? 'before:w-full before:opacity-100'
                    : 'before:w-0 before:opacity-0 group-hover:before:w-3/4 group-hover:before:opacity-100'}
                `.replace(/\s+/g, ' ').trim()}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-md text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors duration-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>

        {/* Mobile slide-in */}
        <div 
          className={`fixed top-0 right-0 h-full w-[85%] max-w-sm bg-gradient-to-b from-gray-900 to-black shadow-2xl transform transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] z-50 md:hidden flex flex-col ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex justify-between items-center p-5 border-b border-gray-800 flex-shrink-0">
             <Image src="/logo.png" alt="Ketebul" width={100} height={30} className="object-contain" />
             <button className="p-2 text-white hover:bg-gray-800 rounded-full" onClick={() => setMobileMenuOpen(false)}>
              <X size={28} />
            </button>
          </div>

          <nav className="flex-grow overflow-y-auto py-6 px-6">
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`group flex items-center justify-between w-full text-lg py-4 px-4 rounded-xl uppercase tracking-widest transition-all ${
                    pathname === item.href 
                      ? 'bg-yellow-500/10 text-yellow-400 font-bold' 
                      : 'text-white hover:bg-white/5 hover:text-yellow-400'
                  }`}
                >
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="flex-grow pt-[3.5rem]">
        {children}
      </main>

      {/* ── Footer ── */}
      <footer className="bg-gray-950 text-gray-300 py-10 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

          {/* Brand + address */}
          <div>
            <Image src="/logo.png" alt="Ketebul Music" width={120} height={36} className="w-auto h-auto mb-3 opacity-90" />
            <p className="text-xs text-gray-500 leading-relaxed uppercase tracking-tighter font-semibold mb-1">Locations</p>
            <p className="text-xs text-gray-400 leading-relaxed">
              Head Office - Valley Court, Kilimani<br />
              Ketebul Music Studios - Tena Estate along Outering Road
            </p>
            <div className="mt-4">
               <a href="tel:+254734585519" className="text-xs text-gray-500 hover:text-yellow-400 transition-colors block">
                +254 734 585 519
              </a>
              <a href="mailto:info@ketebulmusic.org" className="text-xs text-gray-500 hover:text-yellow-400 transition-colors mt-1 block">
                info@ketebulmusic.org
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Explore</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
              {navItems.map(link => (
                <Link key={link.href} href={link.href} className="text-xs text-gray-500 hover:text-yellow-400 transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social & Credits */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Join the Culture</p>
            <div className="flex space-x-5 text-gray-400 mb-6">
              <Link href="https://facebook.com/ketebulmusic" target="_blank" aria-label="Facebook">
                <Facebook size={18} className="hover:text-yellow-500 transition-all" />
              </Link>
              <Link href="https://instagram.com/ketebulmusic" target="_blank" aria-label="Instagram">
                <Instagram size={18} className="hover:text-yellow-500 transition-all" />
              </Link>
              <Link href="https://youtube.com/channel/UCqU9TmbuHV09Quhgrf7L2HQ" target="_blank" aria-label="YouTube">
                <Youtube size={18} className="hover:text-yellow-500 transition-all" />
              </Link>
            </div>
            <div className="pt-4 border-t border-white/5">
              <p className="text-[10px] text-gray-600 uppercase tracking-widest leading-tight">
                Developed & Maintained by<br />
                <a href="https://www.bravetechnologies.co.ke/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-yellow-500 transition-colors font-bold">
                  Brave Technologies Ltd
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="container mx-auto pt-6 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[10px] text-gray-600 text-center sm:text-left uppercase tracking-widest">
            &copy; {new Date().getFullYear()} Ketebul Music. All rights reserved.
          </p>
          <div className="flex space-x-4 text-[10px] text-gray-600 uppercase tracking-widest">
            <Link href="/privacy-policy" className="hover:text-yellow-400">Privacy</Link>
            <Link href="/terms-of-service" className="hover:text-yellow-400">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}