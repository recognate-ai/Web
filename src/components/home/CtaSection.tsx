"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';

export default function CtaSection() {
  return (
    <Section className="relative overflow-hidden" spacing="md">
      {/* Premium Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-[#0a0f1d] to-cyan-900 z-0"></div>
      
      {/* Animated Background Elements */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] z-0"
      />
      <motion.div 
        animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[100px] z-0"
      />

      <Container className="relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -50px 0px" }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center glass-card p-10 md:p-16 border border-white/10 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle Grid overlay inside card */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>

          <h2 className="heading-2 mb-6 text-white relative z-10">
            Have an Idea? Let’s Build the <span className="text-cyan-400">Future Together.</span>
          </h2>
          
          <p className="text-body text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed relative z-10">
            Partner with ReCognate to transform your innovative idea into an intelligent, 
            connected, and scalable technology product.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <Link 
              href="/contact"
              className="px-8 py-4 rounded-full bg-cyan-500 hover:bg-cyan-400 text-white font-bold transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              Start Your Project
              <ArrowRight size={18} />
            </Link>
            <Link 
              href="/contact"
              className="px-8 py-4 rounded-full bg-white/5 hover:bg-white/5 text-white font-medium border border-white/10 transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <MessageSquare size={18} />
              Discuss Your Idea
            </Link>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
