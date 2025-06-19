'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '/', hoverColor: 'white' },
  { label: 'About Us', href: '/about', hoverColor: 'red' },
  { label: 'Artists', href: '/artists', hoverColor: 'green' },
  { label: 'Books', href: '/books', hoverColor: 'black' },
  { label: 'Events', href: '/events', hoverColor: 'yellow' },
  { label: 'Blog', href: '/blog', hoverColor: 'purple' },
  { label: 'Contact', href: '/contact', hoverColor: 'blue' },
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
          <Link href="/" className="logo">
            Ketebul Music
          </Link>

          <nav className="nav-desktop">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link ${pathname === item.href ? `hover-${item.hoverColor}` : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            className="mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileOpen && (
          <nav className="nav-mobile">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link ${pathname === item.href ? `hover-${item.hoverColor}` : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      <main className="main-content">{children}</main>

      <footer className="footer">
        <div className="footer-inner">
          <p>&copy; {new Date().getFullYear()} Ketebul Music. All rights reserved.</p>
          <div className="social-links">
            <Link href="https://facebook.com/ketebulmusic" target="_blank" rel="noopener noreferrer">
              Facebook
            </Link>
            <Link href="https://instagram.com/ketebulmusic" target="_blank" rel="noopener noreferrer">
              Instagram
            </Link>
            <Link href="https://youtube.com/ketebulmusic" target="_blank" rel="noopener noreferrer">
              YouTube
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
