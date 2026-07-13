"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AcademicProjectCard from '@/components/ui/AcademicProjectCard';
import PageLayout from '@/components/layout/PageLayout';
import { Container } from '@/components/ui/Container';

const filters = ["All", "Artificial Intelligence", "Internet of Things", "Web Development", "Embedded Systems", "Cybersecurity"];

export default function AcademicClient({ initialProjects }: { initialProjects: any[] }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [projects] = useState<any[]>(initialProjects);

  const filteredProjects = activeFilter === "All" 
    ? (projects || []) 
    : (projects || []).filter(p => p.category === activeFilter);

  return (
    <PageLayout
      badgeText="Student Resources"
      badgeColor="violet"
      title={
        <h1 className="heading-1 mb-6">
          Final Year <span className="text-gradient">Projects</span>
        </h1>
      }
      description="Explore our curated collection of high-quality, fully-documented academic projects. Each project comes complete with source code, a comprehensive report, and a presentation tailored for final year submissions."
      glowColors={['violet', 'blue']}
    >
      <Container className="relative z-10">
        
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-10 border-b border-white/10 pb-6">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeFilter === filter 
                  ? "bg-violet-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.4)]" 
                  : "bg-[#111827] text-body hover:bg-white/10 hover:text-white border border-white/10"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredProjects?.map((project) => (
              <AcademicProjectCard 
                key={project.id} 
                project={project} 
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {(!filteredProjects || filteredProjects.length === 0) && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">No projects found in this category.</p>
          </div>
        )}

        {/* Custom Project CTA */}
        <div className="mt-20 glass-card p-10 border-cyan-500/20 bg-gradient-to-br from-[#0d1428] to-cyan-950/20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IiNmZmYiLz48L3N2Zz4=')] bg-[length:20px_20px] opacity-5"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>
          
          <div className="relative z-10 md:max-w-2xl">
            <h2 className="text-3xl font-space font-bold text-white mb-4">Need a Custom Project?</h2>
            <p className="text-gray-400 text-lg">
              Have a unique idea or specific college requirements? Our expert engineering team can build a custom final year project from scratch, tailored exactly to your needs.
            </p>
          </div>
          
          <div className="relative z-10 shrink-0">
            <a 
              href="/contact" 
              className="px-8 py-4 rounded-full font-space font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 transition-all flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]"
            >
              Request Custom Build
            </a>
          </div>
        </div>

      </Container>
    </PageLayout>
  );
}
