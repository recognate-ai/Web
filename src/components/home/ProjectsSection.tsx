"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import ProjectCard from '@/components/ui/ProjectCard';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';

const filters = ["All", "Artificial Intelligence", "Internet of Things", "Embedded Systems", "Software", "Research"];

const fallbackProjects = [
  {
    id: 1,
    title: "NTCS Website",
    category: "Software",
    description: "A comprehensive corporate website developed for NTCS, featuring modern design, responsive architecture, and optimized user experience.",
    technologies: ["Next.js", "Tailwind CSS", "React"],
    status: "Completed",
    url: "https://www.newtechnologyinstitutions.com/"
  },
  {
    id: 2,
    title: "NTCS Certificate Verification Portal",
    category: "Software",
    description: "A secure online portal enabling instant verification of educational and professional certificates, ensuring authenticity and preventing fraud.",
    technologies: ["Node.js", "Database", "Auth"],
    status: "Completed",
    url: "https://www.verify.newtechnologyinstitutions.com/"
  },
  {
    id: 3,
    title: "Smart Plug",
    category: "Internet of Things",
    description: "A mobile-controlled smart plug that allows users to set timers, automate on/off schedules at specific times, and manage appliances directly from their mobile devices.",
    technologies: ["IoT", "Microcontroller", "Mobile App"],
    status: "Completed"
  },
  {
    id: 4,
    title: "Foresight.Ai",
    category: "Artificial Intelligence",
    description: "An advanced AI-powered Universal Forensic Extraction Device (UFDR) analyzer designed to process and interpret complex forensic data automatically.",
    technologies: ["AI", "Machine Learning", "Data Analytics"],
    status: "Under Processing"
  }
];

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [projects, setProjects] = useState(fallbackProjects);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { supabase } = await import('@/lib/supabase');
        const { data, error } = await supabase.from('projects').select('*');
        if (error) throw error;
        if (data && data.length > 0) {
          setProjects(data);
        }
      } catch {
        console.log("Using fallback projects data. Configure Supabase to use dynamic data.");
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = activeFilter === "All" 
    ? (projects || [])
    : (projects || []).filter(p => p.category === activeFilter);

  return (
    <Section id="projects" className="bg-[#0a0f1d] relative" spacing="md">
      <Container className="relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="heading-2 mb-4">
              Featured <span className="text-gradient">Projects</span>
            </h2>
            <p className="text-body text-lg">
              Explore our portfolio of intelligent systems, connected devices, and research prototypes.
            </p>
          </div>
          
          <Link href="/projects" className="text-blue-400 hover:text-blue-300 font-medium flex items-center gap-2 transition-colors">
            View All Projects <ExternalLink size={16} />
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-12">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === filter 
                  ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]" 
                  : "bg-white/5 text-body hover:bg-white/10 hover:text-white border border-white/5"
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

      </Container>
    </Section>
  );
}
