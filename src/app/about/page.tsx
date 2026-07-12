"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Users, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import PageLayout from '@/components/layout/PageLayout';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';

const timeline = [
  { year: "2026", title: "Inception & Growth", desc: "ReCognate was founded to build intelligent ecosystems across industries, bridging the gap between hardware and AI." }
];

type TeamMember = {
  name: string;
  role: string;
  expertise: string;
  image_url?: string;
};



export default function AboutPage() {
  const [team, setTeam] = useState<TeamMember[]>([]);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const { supabase } = await import('@/lib/supabase');
        const { data, error } = await supabase.from('team_members').select('*');
        if (error) throw error;
        if (data && data.length > 0) {
          setTeam(data);
        }
      } catch (err) {
        console.error("Supabase error fetching team:", err);
      }
    };
    fetchTeam();
  }, []);

  return (
    <PageLayout
      badgeText={
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          Our Story
        </span>
      }
      badgeColor="cyan"
      title={
        <h1 className="heading-hero">
          Pioneering the <br/>
          <span className="text-gradient">Future.</span>
        </h1>
      }
      description="We are an engineering hub born out of a desire to push the boundaries of what's possible. By merging artificial intelligence with physical hardware, we build the nervous system of tomorrow's world."
      glowColors={['fuchsia', 'cyan', 'violet']}
    >
      {/* Mission & Vision */}
      <Section spacing="md">
        <Container className="relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-10 border-blue-500/20 hover:border-blue-500/40 transition-colors"
            >
              <Target size={32} className="text-blue-400 mb-6" />
              <h2 className="heading-3 mb-4">Our Mission</h2>
              <p className="text-body">
                To engineer intelligent, reliable, and scalable technology products that solve complex 
                industrial and societal challenges, bridging the gap between theoretical research and practical application.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-card p-10 border-violet-500/20 hover:border-violet-500/40 transition-colors"
            >
              <Eye size={32} className="text-violet-400 mb-6" />
              <h2 className="heading-3 mb-4">Our Vision</h2>
              <p className="text-body">
                To be the premier global development hub where artificial intelligence and connected hardware 
                converge, fostering an ecosystem where every device is intelligent and interconnected.
              </p>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Timeline */}
      <Section spacing="md">
        <Container className="relative z-10">
          <h2 className="heading-2 text-center mb-16">The Journey So Far</h2>
          <div className="max-w-3xl mx-auto relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-cyan-400 to-transparent"></div>
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative pl-12"
                >
                  <div className="absolute left-[11px] top-1.5 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>
                  <div className="glass-card p-6 border-white/5 hover:bg-white/5 transition-colors">
                    <span className="text-sm font-bold text-cyan-400 tracking-wider uppercase mb-2 block">{item.year}</span>
                    <h3 className="text-xl font-space font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-body">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Leadership */}
      <Section spacing="md">
        <Container className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="heading-2 mb-4">Leadership <span className="text-gradient">Team</span></h2>
              <p className="text-body text-lg">
                Meet the minds driving our engineering excellence and research initiatives.
              </p>
            </div>
            <Link href="/careers" className="text-blue-400 hover:text-blue-300 font-medium flex items-center gap-2 transition-colors">
              Join the Team <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {team?.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card overflow-hidden group border-white/5 hover:border-cyan-500/30 transition-colors"
              >
                {/* Image / Placeholder */}
                <div className="h-48 bg-gradient-to-b from-[#111827] to-[#0a0f1d] relative flex items-center justify-center overflow-hidden">
                  {member.image_url ? (
                    <Image src={member.image_url} alt={member.name} loading="lazy" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  ) : (
                    <Users size={32} className="text-gray-600 group-hover:scale-110 transition-transform duration-500" />
                  )}
                  <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay"></div>
                </div>
                <div className="p-4">
                  <h3 className="text-base font-space font-bold text-white mb-1 truncate">{member.name}</h3>
                  <p className="text-xs text-cyan-400 mb-3 truncate">{member.role}</p>
                  <div className="inline-block px-2 py-1 rounded bg-white/5 text-[10px] text-body border border-white/5 truncate max-w-full">
                    {member.expertise}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

    </PageLayout>
  );
}
