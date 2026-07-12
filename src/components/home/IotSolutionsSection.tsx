"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Wifi, Cloud, Smartphone, Database, Zap } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';

const iotCapabilities = [
  "Smart Home Automation",
  "Industrial IoT",
  "Environmental Monitoring",
  "Smart Agriculture",
  "Intelligent Energy Management",
  "Real-Time Sensor Monitoring",
  "Remote Device Management",
  "Edge AI Systems",
  "Cloud-Connected IoT Platforms"
];

export default function IotSolutionsSection() {
  return (
    <Section className="bg-[#0a0f1d] relative overflow-hidden border-t border-white/5" spacing="md">
      <Container className="relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-16">
          
          {/* Left Visual (IoT Ecosystem Concept) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 w-full h-[400px] relative flex items-center justify-center"
          >
            {/* Center Cloud/AI Hub */}
            <div className="relative z-20 w-24 h-24 rounded-2xl bg-[#111827] border border-cyan-500/50 flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.4)]">
              <Cloud size={40} className="text-cyan-400" />
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-cyan-400/20 rounded-2xl blur-md -z-10"
              />
            </div>

            {/* Orbiting Devices */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute w-[280px] h-[280px] border border-white/10 rounded-full border-dashed flex items-center justify-center"
            >
              {/* Sensor Node 1 */}
              <div className="absolute -top-6 w-12 h-12 bg-[#111827] rounded-full border border-blue-500/50 flex items-center justify-center" style={{ transform: 'rotate(-360deg)' }}>
                <Wifi size={20} className="text-blue-400" />
              </div>
              
              {/* Dashboard/Mobile */}
              <div className="absolute -bottom-6 w-12 h-12 bg-[#111827] rounded-full border border-violet-500/50 flex items-center justify-center" style={{ transform: 'rotate(-360deg)' }}>
                <Smartphone size={20} className="text-violet-400" />
              </div>
            </motion.div>

            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute w-[380px] h-[380px] border border-white/5 rounded-full border-dotted flex items-center justify-center"
            >
              {/* Database/Edge */}
              <div className="absolute -left-6 w-12 h-12 bg-[#111827] rounded-full border border-green-500/50 flex items-center justify-center" style={{ transform: 'rotate(360deg)' }}>
                <Database size={20} className="text-green-400" />
              </div>
              
              {/* Energy Node */}
              <div className="absolute -right-6 w-12 h-12 bg-[#111827] rounded-full border border-yellow-500/50 flex items-center justify-center" style={{ transform: 'rotate(360deg)' }}>
                <Zap size={20} className="text-yellow-400" />
              </div>
            </motion.div>

            {/* Data particles flying to center */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -150 : 150, y: i < 2 ? -150 : 150 }}
                animate={{ 
                  opacity: [0, 1, 0], 
                  x: 0, 
                  y: 0 
                }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4 }}
                className="absolute w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(103,232,249,0.8)] z-10"
              />
            ))}
          </motion.div>

          {/* Right Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2"
          >
            <h2 className="heading-2 mb-6 leading-tight">
              Connecting Devices. <br/>
              <span className="text-gradient">Creating Intelligent Ecosystems.</span>
            </h2>
            <p className="text-body text-lg mb-8 leading-relaxed">
              We design and deploy robust Internet of Things architectures, 
              connecting physical hardware to intelligent cloud platforms for 
              real-time monitoring, automation, and advanced analytics.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {iotCapabilities.map((item, index) => (
                <motion.div 
                  key={index} 
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-blue-500/10 hover:border-cyan-500/30 transition-all cursor-pointer group"
                >
                  <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.6)] group-hover:bg-blue-400 group-hover:shadow-[0_0_12px_rgba(59,130,246,0.8)] transition-all"></div>
                  <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </Container>
    </Section>
  );
}
