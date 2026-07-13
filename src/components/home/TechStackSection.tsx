"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';

const techStack = [
  {
    category: "Artificial Intelligence",
    color: "from-blue-500/20 to-blue-500/5 border-blue-500/20 text-blue-300",
    techs: ["Python", "TensorFlow", "PyTorch", "Keras", "Scikit-learn", "OpenCV"]
  },
  {
    category: "IoT and Embedded",
    color: "from-cyan-500/20 to-cyan-500/5 border-cyan-500/20 text-cyan-300",
    techs: ["ESP32", "Arduino", "Raspberry Pi", "MQTT", "LoRa", "TinyML"]
  },
  {
    category: "Frontend",
    color: "from-violet-500/20 to-violet-500/5 border-violet-500/20 text-violet-300",
    techs: ["React", "Next.js", "Flutter", "Tailwind CSS"]
  },
  {
    category: "Backend",
    color: "from-green-500/20 to-green-500/5 border-green-500/20 text-green-300",
    techs: ["Node.js", "FastAPI", "Django", "Flask"]
  },
  {
    category: "Cloud and Database",
    color: "from-orange-500/20 to-orange-500/5 border-orange-500/20 text-orange-300",
    techs: ["Firebase", "MongoDB", "PostgreSQL", "MySQL", "Docker"]
  }
];

export default function TechStackSection() {
  return (
    <Section id="tech-stack" className="bg-[#0a0f1d] relative overflow-hidden" spacing="md">
      <Container className="relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="heading-2 mb-6">
            Our Technology <span className="text-gradient">Stack</span>
          </h2>
          <p className="text-body text-lg">
            We utilize the most advanced and reliable frameworks to build secure, scalable, and intelligent products.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {techStack.map((stack, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -50px 0px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-6 border-white/10 hover:bg-white/5 transition-all flex flex-col"
            >
              <h3 className="font-space text-lg font-semibold text-white mb-6 border-b border-white/10 pb-3">
                {stack.category}
              </h3>
              <div className="flex flex-wrap gap-2 mt-auto">
                {stack.techs.map(tech => (
                  <span 
                    key={tech} 
                    className={`px-3 py-1.5 rounded-md text-xs font-medium bg-gradient-to-br ${stack.color} border`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
