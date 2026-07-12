"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Brain, Network, Zap } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';

const values = [
  {
    title: "Innovation",
    icon: <Lightbulb size={24} className="text-blue-400" />,
    description: "We explore emerging technologies and transform new ideas into practical solutions."
  },
  {
    title: "Intelligence",
    icon: <Brain size={24} className="text-cyan-400" />,
    description: "We integrate AI and data-driven technologies to create adaptive and intelligent products."
  },
  {
    title: "Connectivity",
    icon: <Network size={24} className="text-violet-400" />,
    description: "We connect devices, sensors, software, and cloud platforms to build unified IoT ecosystems."
  },
  {
    title: "Impact",
    icon: <Zap size={24} className="text-blue-500" />,
    description: "We develop meaningful technology designed to improve industries, businesses, and communities."
  }
];

export default function AboutSection() {
  return (
    <Section id="about" className="relative overflow-hidden overflow-visible" spacing="md">
      <Container className="relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2 space-y-6"
          >
            <div className="inline-block px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium tracking-wide">
              About ReCognate
            </div>
            <h2 className="heading-2 mb-6">
              Transforming Ideas into <span className="text-gradient">Intelligent Products</span>
            </h2>
            <p className="text-body text-lg leading-relaxed">
              ReCognate is a technology development hub specializing in Artificial Intelligence, 
              Internet of Things, embedded systems, intelligent automation, and scalable software solutions. 
              We combine research, engineering, creativity, and emerging technologies to develop 
              products that address real-world challenges.
            </p>
          </motion.div>

          {/* Right Value Cards */}
          <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {values.map((value, index) => (
              <Card
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 border-white/5 hover:border-blue-500/30"
              >
                <div className="w-12 h-12 rounded-lg bg-[#0a0f1d] flex items-center justify-center mb-4 border border-white/5 shadow-inner">
                  {value.icon}
                </div>
                <h3 className="text-xl font-space font-semibold mb-3 text-white">{value.title}</h3>
                <p className="text-sm text-body">{value.description}</p>
              </Card>
            ))}
          </div>

        </div>
      </Container>
      
      {/* Background Decor */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
    </Section>
  );
}
