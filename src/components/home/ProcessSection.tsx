"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FlaskConical, PenTool, Code, ShieldCheck, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';

const steps = [
  {
    id: "discover",
    title: "Discover",
    icon: <Search size={24} />,
    description: "We understand the problem, requirements, target users, and product goals."
  },
  {
    id: "research",
    title: "Research",
    icon: <FlaskConical size={24} />,
    description: "We evaluate technologies, analyze feasibility, and define the most effective solution."
  },
  {
    id: "design",
    title: "Design",
    icon: <PenTool size={24} />,
    description: "We create the product architecture, user experience, hardware design, and system workflow."
  },
  {
    id: "develop",
    title: "Develop",
    icon: <Code size={24} />,
    description: "We build and integrate AI models, software platforms, embedded systems, and IoT hardware."
  },
  {
    id: "test",
    title: "Test",
    icon: <ShieldCheck size={24} />,
    description: "We evaluate performance, security, reliability, scalability, and usability."
  },
  {
    id: "deploy",
    title: "Deploy",
    icon: <Rocket size={24} />,
    description: "We launch the product and provide continuous improvement and technical support."
  }
];

export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <Section className="bg-[#0a0f1d] relative" spacing="md">
      <Container className="relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="heading-2 mb-6">
            Product Development <span className="text-gradient">Process</span>
          </h2>
          <p className="text-body text-lg">
            A structured, engineering-driven approach to turning concepts into scalable realities.
          </p>
        </div>

        {/* Desktop Horizontal Timeline */}
        <div className="hidden lg:block relative max-w-5xl mx-auto">
          {/* Progress Line */}
          <div className="absolute top-8 left-0 w-full h-1 bg-white/5 rounded-full">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
              initial={{ width: '0%' }}
              whileInView={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          <div className="flex justify-between relative z-10">
            {steps.map((step, index) => (
              <div 
                key={step.id} 
                className="flex flex-col items-center w-32 cursor-pointer group"
                onClick={() => setActiveStep(index)}
                onMouseEnter={() => setActiveStep(index)}
              >
                <motion.div 
                  className={cn(
                    "w-16 h-16 rounded-full flex items-center justify-center border-2 transition-colors duration-300 mb-6 bg-[#0a0f1d]",
                    activeStep >= index ? "border-cyan-400 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]" : "border-white/10 text-body group-hover:border-white/10"
                  )}
                  whileHover={{ scale: 1.1 }}
                >
                  {step.icon}
                </motion.div>
                <h3 className={cn(
                  "font-space font-semibold text-center transition-colors",
                  activeStep === index ? "text-white" : "text-body"
                )}>
                  {step.title}
                </h3>
              </div>
            ))}
          </div>

          <div className="mt-12 max-w-2xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="glass-card p-8 text-center border-blue-500/20"
              >
                <h4 className="text-2xl font-space font-bold text-cyan-400 mb-4">{steps[activeStep].title}</h4>
                <p className="text-body text-lg leading-relaxed">{steps[activeStep].description}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Vertical Timeline */}
        <div className="lg:hidden relative">
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-white/5 rounded-full" />
          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pl-24 flex flex-col justify-center min-h-[4rem]"
              >
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#0a0f1d] border-2 border-cyan-400 text-cyan-400 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                  {step.icon}
                </div>
                <div className="glass-card p-5 border-white/10">
                  <h4 className="text-xl font-space font-bold text-white mb-2">{step.title}</h4>
                  <p className="text-sm text-body">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </Container>
    </Section>
  );
}
