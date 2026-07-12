"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mail, Phone, MapPin } from 'lucide-react';
import RecognateLogo from '@/components/ui/RecognateLogo';

const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const LinkedinIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const GithubIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Expertise', href: '/expertise' },
  { name: 'Products', href: '/products' },
  { name: 'Projects', href: '/projects' },
  { name: 'Careers', href: '/careers' },
  { name: 'Contact', href: '/contact' },
];

const services = [
  { name: 'Artificial Intelligence', href: '/expertise#ai' },
  { name: 'Internet of Things', href: '/expertise#iot' },
  { name: 'Embedded Systems', href: '/expertise#embedded' },
  { name: 'Software Development', href: '/expertise#software' },
  { name: 'Research and Development', href: '/rd' },
  { name: 'Product Engineering', href: '/expertise#engineering' },
];

export default function Footer() {
  const pathname = usePathname();
  
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="flex flex-col">
            <Link href="/" className="flex items-center group inline-block w-80 md:w-96 -ml-12 md:-ml-20 -mt-16 md:-mt-24">
              <RecognateLogo animated={false} />
            </Link>
            <p className="text-body text-sm font-medium mb-4 pl-2 -mt-10 md:-mt-16">A Development Hub</p>
            
            <div className="flex gap-5 pt-2 pl-2">
              <Link href="https://www.instagram.com/recognate/?utm_source=ig_web_button_share_sheet" target="_blank" className="text-body hover:text-cyan-400 transition-colors"><InstagramIcon size={20} /></Link>
              <Link href="https://www.linkedin.com/in/recognate-ai/" target="_blank" className="text-body hover:text-cyan-400 transition-colors"><LinkedinIcon size={20} /></Link>
              <Link href="https://github.com/recognate-ai" target="_blank" className="text-body hover:text-cyan-400 transition-colors"><GithubIcon size={20} /></Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-space font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map(link => (
                <li key={link.name}>
                  <Link href={link.href} className="text-body hover:text-cyan-400 transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-space font-semibold text-lg mb-6">Services</h3>
            <ul className="space-y-3">
              {services.map(service => (
                <li key={service.name}>
                  <Link href={service.href} className="text-body hover:text-cyan-400 transition-colors text-sm">
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-space font-semibold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-body">
                <Mail size={18} className="text-cyan-400 shrink-0 mt-0.5" />
                <span>recognate.ai@gmail.com</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-body">
                <Phone size={18} className="text-cyan-400 shrink-0 mt-0.5" />
                <span>9487407198</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-body">
                <MapPin size={18} className="text-cyan-400 shrink-0 mt-0.5" />
                <span>Vellore | Coimbatore</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-body text-sm">
            © 2026 ReCognate. All Rights Reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-body hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-body hover:text-white transition-colors">Terms and Conditions</Link>
            <Link href="/cookies" className="text-body hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
