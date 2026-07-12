"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import ProjectCard from '@/components/ui/ProjectCard';
import PageLayout from '@/components/layout/PageLayout';
import { Container } from '@/components/ui/Container';

import { api } from '@/lib/services/api';

const filters = ["All", "Artificial Intelligence", "Internet of Things", "Embedded Systems", "Software", "Research"];



export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await api.getProjects();
      if (data && data.length > 0) {
        setProjects(data as any);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = activeFilter === "All" 
    ? (projects || []) 
    : (projects || []).filter(p => p.category === activeFilter);

  return (
    <PageLayout
      badgeText="Our Work"
      badgeColor="cyan"
      title={
        <h1 className="heading-1 mb-6">
          Project <span className="text-gradient">Portfolio</span>
        </h1>
      }
      description="Explore our extensive catalog of completed commercial products, active developments, and internal R&D prototypes."
      glowColors={['blue', 'cyan']}
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
                  ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]" 
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
              <ProjectCard 
                key={project.id} 
                project={project} 
                linkHref={`/projects/${project.id}`} 
                linkText="Explore Project" 
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {(!filteredProjects || filteredProjects.length === 0) && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">No projects found in this category.</p>
          </div>
        )}

      </Container>
    </PageLayout>
  );
}
