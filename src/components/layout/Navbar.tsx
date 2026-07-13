"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import RecognateLogo from '@/components/ui/RecognateLogo';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Expertise', href: '/expertise' },
  { name: 'Products', href: '/products' },
  { name: 'R&D', href: '/rd' },
  { name: 'Projects', href: '/projects' },
  { name: 'Student Projects', href: '/academic' },
  { name: 'Careers', href: '/careers' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent",
        scrolled ? "bg-white/5 backdrop-blur-md border-white/10 shadow-lg" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group z-50">
          <div className="relative w-80 md:w-96 h-full flex items-center justify-start -ml-16 md:-ml-8 mt-2 md:mt-4">
            {pathname === '/' ? (
              scrolled && (
                <motion.div 
                  layoutId="main-logo" 
                  className="w-full h-auto origin-left"
                >
                  <RecognateLogo animated={false} />
                </motion.div>
              )
            ) : (
              <div className="w-full h-auto origin-left">
                <RecognateLogo animated={false} />
              </div>
            )}
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-10">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-[13px] font-medium tracking-wide text-gray-300 hover:text-white transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1.5 left-0 w-0 h-[2px] bg-cyan-400 transition-all group-hover:w-full"></span>
                </Link>
              </li>
            ))}
          </ul>
          
          <Link
            href="/contact"
            className="px-6 py-2 rounded-full bg-blue-600 text-white text-[13px] font-semibold tracking-wide transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_rgba(37,99,235,0.6)] hover:-translate-y-0.5"
          >
            Build With Us
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="xl:hidden z-50 text-body hover:text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-0 left-0 w-full h-[100dvh] z-40 bg-[#0a0f1d] pt-24 px-6 pb-6 overflow-y-auto"
          >
            <ul className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-body text-xl hover:text-white font-space transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li className="pt-6 border-t border-white/10">
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-block px-8 py-3 rounded-full bg-blue-600 text-white text-lg font-medium w-full text-center shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                >
                  Build With Us
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
