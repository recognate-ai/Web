import React from 'react';
import ContactForm from '@/components/contact/ContactForm';
import { Mail, Phone, MapPin } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { Container } from '@/components/ui/Container';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contact ReCognate | Enterprise AI & IoT Engineering",
  description: "Get in touch with ReCognate to discuss your AI, IoT, and custom software development needs. Headquartered in Vellore & Coimbatore, serving global clients.",
  alternates: {
    canonical: "https://recognate.vercel.app/contact",
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "ReCognate",
  "image": "https://recognate.vercel.app/logo.png",
  "url": "https://recognate.vercel.app/contact",
  "email": "recognate.ai@gmail.com",
  "telephone": "9487407198",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Vellore | Coimbatore",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "12.9165",
    "longitude": "79.1325"
  },
  "priceRange": "$$$",
  "sameAs": [
    "https://recognate.vercel.app"
  ]
};

export default function ContactPage() {
  return (
    <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
    <PageLayout
      title={
        <h1 className="heading-1 mb-6">
          Let&apos;s Build the <span className="text-gradient">Future</span>
        </h1>
      }
      description="Reach out to our engineering team to discuss your project requirements, request a consultation, or explore partnership opportunities."
      glowColors={['blue', 'cyan']}
    >
        <Container className="flex flex-col lg:flex-row gap-12 max-w-6xl relative z-10">
          {/* Contact Info */}
          <div className="lg:w-1/3 space-y-8">
            <div className="glass-card p-8 border-white/10">
              <h2 className="heading-3 mb-6">Contact Information</h2>
              
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-body mb-1">Email Us</p>
                    <a href="mailto:recognate.ai@gmail.com" className="text-white hover:text-cyan-400 transition-colors font-medium">recognate.ai@gmail.com</a>
                  </div>
                </li>
                
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-body mb-1">Call Us</p>
                    <a href="tel:9487407198" className="text-white hover:text-cyan-400 transition-colors font-medium">9487407198</a>
                  </div>
                </li>
                
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-violet-500/10 text-violet-400 flex items-center justify-center shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-body mb-1">Visit Innovation Lab</p>
                    <p className="text-white font-medium">Vellore | Coimbatore</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="glass-card p-8 border-white/10 bg-gradient-to-br from-[#111827] to-blue-900/20">
              <h3 className="font-space font-semibold text-lg mb-2 text-white">Join Our Team</h3>
              <p className="text-body text-sm mb-4">We&apos;re always looking for talented engineers and researchers.</p>
              <a href="/careers" className="text-cyan-400 text-sm font-medium hover:text-cyan-300 flex items-center gap-2">
                View Open Positions &rarr;
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:w-2/3">
            <ContactForm />
          </div>
        </Container>
    </PageLayout>
    </>
  );
}
