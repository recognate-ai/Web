"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Home, Leaf, HeartPulse, GraduationCap, Factory, 
  Wind, Zap, ShoppingBag, Truck, Building2, Monitor
} from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';

const industries = [
  { id: "homes", title: "Smart Homes", icon: <Home size={24} />, description: "Intelligent automation and security." },
  { id: "agri", title: "Agriculture", icon: <Leaf size={24} />, description: "Precision farming and crop monitoring." },
  { id: "health", title: "Healthcare", icon: <HeartPulse size={24} />, description: "Remote patient monitoring and AI diagnostics." },
  { id: "edu", title: "Education", icon: <GraduationCap size={24} />, description: "Smart learning environments and tracking." },
  { id: "mfg", title: "Manufacturing", icon: <Factory size={24} />, description: "Industry 4.0 and predictive maintenance." },
  { id: "env", title: "Environmental", icon: <Wind size={24} />, description: "Air quality and climate monitoring." },
  { id: "it", title: "Information Technology", icon: <Monitor size={24} />, description: "Cloud computing and enterprise infrastructure." },
  { id: "retail", title: "Retail", icon: <ShoppingBag size={24} />, description: "Inventory tracking and automated stores." },
  { id: "transport", title: "Transportation", icon: <Truck size={24} />, description: "Fleet management and smart logistics." },
  { id: "cities", title: "Smart Cities", icon: <Building2 size={24} />, description: "Urban infrastructure and traffic control." }
];

export default function IndustriesSection() {
  return (
    <Section id="industries" className="bg-[#0a0f1d] relative overflow-hidden" spacing="md">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1d] via-blue-900/5 to-[#0a0f1d] z-0 pointer-events-none"></div>
      
      <Container className="relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="heading-2 mb-6">
            Industries We <span className="text-gradient">Serve</span>
          </h2>
          <p className="text-body text-lg">
            Deploying intelligent technologies across diverse sectors to drive efficiency, sustainability, and growth.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {industries.map((ind, index) => (
            <motion.div
              key={ind.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "0px 0px -50px 0px" }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="glass-card p-6 flex flex-col items-center text-center group hover:bg-white/10 hover:border-blue-500/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                {ind.icon}
              </div>
              <h3 className="font-space text-sm font-semibold text-white mb-2">{ind.title}</h3>
              <p className="text-[11px] text-body group-hover:text-gray-300 transition-colors">
                {ind.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
