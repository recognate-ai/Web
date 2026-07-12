"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Network, BrainCircuit, Cpu } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { Container } from '@/components/ui/Container';

import { api } from '@/lib/services/api';



const iconMap: Record<string, React.ReactNode> = {
  "BrainCircuit": <BrainCircuit size={28} />,
  "Network": <Network size={28} />,
  "Cpu": <Cpu size={28} />
};

export default function RDPage() {
  const [researchAreas, setResearchAreas] = useState<any[]>([]);

  useEffect(() => {
    const fetchResearch = async () => {
      const data = await api.getResearchPrototypes();
      if (data && data.length > 0) {
        setResearchAreas(data as any);
      }
    };
    fetchResearch();
  }, []);

  return (
    <PageLayout
      badgeText="Innovation Lab"
      badgeColor="violet"
      title={
        <h1 className="heading-hero mb-6">
          Engineering the <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">Impossible.</span>
        </h1>
      }
      description="The ReCognate Innovation Lab is our dedicated research facility where we explore unproven technologies, build experimental prototypes, and define the future of connected intelligence."
      glowColors={['violet', 'fuchsia']}
    >
      {/* Focus Areas */}
      <Container className="relative z-10 mb-32">
        <h2 className="heading-2 text-center mb-12">Current Research Focus</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {researchAreas.map((area: any, index: number) => {
            const color = area.color || 'blue';
            const borderColor = color === 'blue' ? 'border-t-blue-500' : color === 'violet' ? 'border-t-violet-500' : 'border-t-cyan-500';
            const bgGlowColor = color === 'blue' ? 'bg-blue-500/20' : color === 'violet' ? 'bg-violet-500/20' : 'bg-cyan-500/20';
            const iconColor = color === 'blue' ? 'text-blue-400' : color === 'violet' ? 'text-violet-400' : 'text-cyan-400';

            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`glass-card p-8 border-t-2 ${borderColor} hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden group`}
              >
                <div className={`absolute top-0 right-0 w-32 h-32 ${bgGlowColor} rounded-full blur-[80px] group-hover:blur-[60px] transition-all opacity-50 pointer-events-none`}></div>
                
                <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center ${iconColor} mb-6 shadow-inner relative z-10`}>
                  {iconMap[area.icon_name] || <BrainCircuit size={28} />}
                </div>
                <h3 className="text-xl font-space font-bold text-white mb-4">{area.title}</h3>
                <p className="text-body">{area.description}</p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </PageLayout>
  );
}
