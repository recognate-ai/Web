"use client";

import React from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import YellowThunder from './YellowThunder';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';

const IdeaBulbAnimation = dynamic(() => import('./IdeaBulbAnimation'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin"></div>
    </div>
  )
});

const areas = [
  "Edge Artificial Intelligence",
  "TinyML",
  "Intelligent Sensor Networks",
  "Computer Vision",
  "Generative AI",
  "Autonomous Systems",
  "Predictive Intelligence",
  "Human–AI Interaction",
  "Sustainable Technology",
  "Next-Generation IoT"
];

export default function InnovationLabSection() {

  return (
    <Section id="rd" className="bg-[#0a0f1d] relative overflow-hidden border-y border-white/10" spacing="md">
      
      {/* Thunder Background Effect */}
      <YellowThunder />

      <Container className="relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -50px 0px" }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2"
          >
            <div className="inline-block px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 text-sm font-medium tracking-wide mb-6">
              Research & Development
            </div>
            <h2 className="heading-2 mb-6 leading-tight">
              Inside the ReCognate <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">Innovation Lab</span>
            </h2>
            <p className="text-body text-lg mb-8 leading-relaxed">
              Our research and development environment brings together artificial intelligence, 
              connected hardware, embedded engineering, software development, and creative 
              problem-solving to build technologies for the future.
            </p>
            
            <div className="flex flex-wrap gap-3">
              {areas.map((area, index) => (
                <span 
                  key={index} 
                  className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-body hover:border-violet-400/50 hover:text-white transition-colors cursor-default"
                >
                  {area}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right Visual (Abstract Lab/Data Concept) */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "0px 0px -50px 0px" }}
            transition={{ duration: 1 }}
            className="lg:w-1/2 w-full h-[400px] relative flex items-center justify-center perspective-[1000px]"
          >
            <div className="absolute inset-0 bg-violet-600/10 rounded-full blur-[100px] -z-10"></div>
            
            <IdeaBulbAnimation />
          </motion.div>

        </div>
      </Container>
    </Section>
  );
}
