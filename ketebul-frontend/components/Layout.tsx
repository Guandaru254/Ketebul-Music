'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Facebook, Instagram, Youtube } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '/', hoverColor: 'black' },
  { label: 'About Us', href: '/about', hoverColor: 'black' },
  { label: 'Artists', href: '/artists', hoverColor: 'black' },
  { label: 'Projects', href: '/projects', hoverColor: 'black' },
  { label: 'Team', href: '/team', hoverColor: 'black' },
  { label: 'Gallery', href: '/gallery', hoverColor: 'black' },
  { label: 'Updates', href: '/updates', hoverColor: 'black' },
  { label: 'Contact', href: '/contact', hoverColor: 'black' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <div className="layout">
      <header className="header">
        <div className="header-inner">
          <Link href="/" className="logo" aria-label="Ketebul Music Home">
            <Image
              src="/logo.png"
              alt="Ketebul Music Logo"
              width={160}
              height={50}
              priority
              className="logo-img"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="nav-desktop">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link ${isActive ? `active hover-${item.hoverColor}` : ''}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Toggle */}
          <button
            className="mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <nav className="nav-mobile" role="navigation">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`nav-link ${isActive ? `active hover-${item.hoverColor}` : ''}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        )}
      </header>

      <main className="main-content">{children}</main>

      <footer className="footer">
        <div className="footer-inner">
          <p>&copy; {new Date().getFullYear()} Ketebul Music. All rights reserved.</p>
          <div className="social-links">
            <Link
              href="https://facebook.com/ketebulmusic"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </Link>
            <Link
              href="https://instagram.com/ketebulmusic"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </Link>
            <Link
              href="https://youtube.com/ketebulmusic"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <Youtube size={20} />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
