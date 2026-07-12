import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

export interface ProjectCardProps {
  project: {
    id: number | string;
    title: string;
    category: string;
    description: string;
    technologies?: string[];
    status: string;
    client?: string;
    url?: string;
  };
  linkHref?: string;
  linkText?: string;
}

export default function ProjectCard({ project, linkHref, linkText }: ProjectCardProps) {
  const href = linkHref || `/projects/${project.id}`;
  const text = linkText || "Explore Project";
  const isExternal = href.startsWith('http');

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-[#0d1428]/80 backdrop-blur-xl border border-white/5 hover:-translate-y-2 transition-all duration-500 shadow-xl hover:shadow-[0_10px_40px_-10px_rgba(24,62,250,0.3)] h-full"
    >
      {/* Glowing border pseudo-element on hover */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-500/30 transition-colors duration-500 pointer-events-none z-20" />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-400/10 transition-opacity duration-500 pointer-events-none z-10" />

      {/* Project Image Banner Area */}
      <div className="h-40 bg-black relative overflow-hidden flex items-center justify-center shrink-0">
        
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1d] to-[#121c38] z-0" />
        
        {/* Animated Mesh / Glowing Orbs */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-blue-600/30 rounded-full blur-[60px] group-hover:bg-cyan-500/40 transition-colors duration-700" />
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-fuchsia-600/20 rounded-full blur-[50px] group-hover:bg-blue-600/30 transition-colors duration-700 group-hover:translate-x-10 group-hover:-translate-y-10" />

        {/* Wireframe / Tech Pattern Overlay */}
        <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IiNmZmYiLz48L3N2Zz4=')] bg-[length:20px_20px]" />

        {/* Sleek Floating Initials */}
        <motion.div 
          initial={{ y: 0 }}
          whileHover={{ y: -5, scale: 1.05 }}
          className="relative z-10 flex items-center justify-center w-16 h-16 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md shadow-[0_0_30px_rgba(255,255,255,0.05)] group-hover:border-cyan-400/30 group-hover:shadow-[0_0_40px_rgba(34,211,238,0.2)] transition-all duration-500"
        >
          <span className="font-space text-2xl font-bold bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent group-hover:from-cyan-300 group-hover:to-blue-500 transition-all">
            {project.title ? project.title.substring(0, 2).toUpperCase() : "PR"}
          </span>
        </motion.div>
        
        {/* Status Pill */}
        <div className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-[10px] font-bold text-gray-200 tracking-wider uppercase">{project.status}</span>
        </div>
      </div>

      <div className="p-5 md:p-6 flex-grow flex flex-col relative z-20">
        <div className="flex justify-between items-start mb-3 gap-2">
          <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
            <span className="w-4 h-[1px] bg-cyan-400 shrink-0" />
            <span className="truncate">{project.category}</span>
          </p>
          {project.client && (
            <span className="text-gray-500 text-xs shrink-0">{project.client}</span>
          )}
        </div>
        <h3 className="text-xl font-space font-semibold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-blue-400 transition-all duration-300 line-clamp-2">
          {project.title}
        </h3>
        
        <p className="text-xs text-gray-400 mb-6 flex-grow leading-relaxed line-clamp-3 group-hover:text-gray-300 transition-colors">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies?.map((tech: string) => (
            <span key={tech} className="px-2.5 py-1 bg-white/5 backdrop-blur-sm border border-white/5 rounded-full text-[10px] font-medium text-gray-300 group-hover:border-white/10 group-hover:text-white group-hover:bg-white/10 transition-colors duration-300">
              {tech}
            </span>
          ))}
        </div>

        <Link 
          href={href} 
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="mt-auto flex items-center gap-2 group/link w-fit"
        >
          <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover/link:bg-blue-600 group-hover/link:border-blue-500 transition-all duration-300">
            <ExternalLink size={14} className="text-white group-hover/link:rotate-45 transition-transform duration-300" />
          </div>
          <span className="text-xs font-semibold text-white group-hover/link:text-cyan-400 transition-colors">{text}</span>
        </Link>
      </div>
    </motion.div>
  );
}
