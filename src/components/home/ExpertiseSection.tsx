"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Cpu, Microchip, Code2, FlaskConical, Wrench } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';

const expertises = [
  {
    id: "ai",
    title: "Artificial Intelligence",
    icon: <Brain size={28} className="text-blue-400" />,
    description: "Machine learning, deep learning, computer vision, natural language processing, predictive analytics, generative AI, intelligent automation, and custom AI model development."
  },
  {
    id: "iot",
    title: "Internet of Things",
    icon: <Cpu size={28} className="text-cyan-400" />,
    description: "Smart devices, connected sensor networks, real-time monitoring systems, IoT automation, remote device control, edge computing, and cloud-connected platforms."
  },
  {
    id: "embedded",
    title: "Embedded Systems",
    icon: <Microchip size={28} className="text-violet-400" />,
    description: "Microcontroller programming, ESP32 solutions, embedded firmware, hardware integration, sensor systems, PCB development, and intelligent electronic products."
  },
  {
    id: "software",
    title: "Software Development",
    icon: <Code2 size={28} className="text-blue-500" />,
    description: "Responsive web applications, mobile applications, cloud platforms, backend systems, APIs, databases, intelligent dashboards, and enterprise software."
  },
  {
    id: "research",
    title: "Research and Development",
    icon: <FlaskConical size={28} className="text-cyan-500" />,
    description: "Technology research, product innovation, proof-of-concept development, experimental systems, rapid prototyping, and emerging technology exploration."
  },
  {
    id: "engineering",
    title: "Product Engineering",
    icon: <Wrench size={28} className="text-violet-500" />,
    description: "Idea validation, system architecture, UI and UX design, hardware development, software integration, testing, deployment, and product maintenance."
  }
];

export default function ExpertiseSection() {
  return (
    <Section id="expertise" className="bg-[#0a0f1d] relative" spacing="md">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] z-0 pointer-events-none"></div>
      
      <Container className="relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="heading-2 mb-6">
            Core <span className="text-gradient">Expertise</span>
          </h2>
          <p className="text-body text-lg">
            Comprehensive technology solutions spanning intelligent algorithms, connected hardware, and scalable platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {expertises.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-8 group hover:-translate-y-2 hover:border-cyan-500/30 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500 blur-2xl"></div>
              
              <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-blue-500/10 transition-colors border border-white/10">
                {item.icon}
              </div>
              <h3 className="text-xl font-space font-semibold mb-4 text-white group-hover:text-cyan-300 transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-body group-hover:text-body transition-colors">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
