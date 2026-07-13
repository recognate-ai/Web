"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Layers, Cpu, Settings, LineChart, Users } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';

const reasons = [
  {
    title: "Research-Driven Innovation",
    icon: <BookOpen size={24} className="text-blue-400" />,
    description: "Every solution begins with strong research, technical analysis, and creative exploration."
  },
  {
    title: "End-to-End Development",
    icon: <Layers size={24} className="text-cyan-400" />,
    description: "From initial concept to deployment, we manage the complete product development lifecycle."
  },
  {
    title: "AI & Hardware Integration",
    icon: <Cpu size={24} className="text-violet-400" />,
    description: "We combine intelligent software with connected hardware to build complete technology ecosystems."
  },
  {
    title: "Custom-Built Solutions",
    icon: <Settings size={24} className="text-blue-500" />,
    description: "Every product is designed according to the unique requirements of the problem and its users."
  },
  {
    title: "Scalable Architecture",
    icon: <LineChart size={24} className="text-cyan-500" />,
    description: "Our systems are designed to support future expansion, integration, and growth."
  },
  {
    title: "Continuous Collaboration",
    icon: <Users size={24} className="text-violet-500" />,
    description: "We maintain transparent communication and work closely with clients throughout development."
  }
];

export default function WhyChooseUsSection() {
  return (
    <Section className="bg-[#0a0f1d] relative overflow-hidden border-t border-white/5" spacing="md">
      <Container className="relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "0px 0px -50px 0px" }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/3"
          >
            <h2 className="heading-2 mb-6">
              Why Choose <br/>
              <span className="text-gradient">ReCognate</span>
            </h2>
            <p className="text-body text-lg leading-relaxed mb-8">
              We are not just a development agency; we are your engineering partners. 
              We bring specialized expertise in complex technologies to deliver solutions 
              that standard web firms cannot.
            </p>
          </motion.div>

          <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card p-6 border-white/5 hover:border-blue-500/30 transition-all group flex items-start gap-4"
              >
                <div className="w-12 h-12 shrink-0 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-blue-500/10 group-hover:border-blue-500/30 transition-all">
                  {reason.icon}
                </div>
                <div>
                  <h3 className="font-space text-lg font-semibold text-white mb-1">{reason.title}</h3>
                  <p className="text-sm text-body">{reason.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </Container>
    </Section>
  );
}
