"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import PageLayout from '@/components/layout/PageLayout';
import { ArrowLeft, CheckCircle2, Mail, BookOpen, Presentation, Code2 } from 'lucide-react';
import Link from 'next/link';

export default function AcademicProjectDetails() {
  const params = useParams();
  const id = params?.id as string;
  const [project, setProject] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const { supabase } = await import('@/lib/supabase');
        const { data, error } = await supabase.from('academic_projects').select('*').eq('id', id).single();
        if (error) throw error;
        if (data) {
          setProject(data);
        } else {
          setProject(null);
        }
      } catch {
        console.log("Supabase error fetching academic project details.");
        setProject(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <PageLayout title={<h1 className="heading-1">Loading...</h1>} description="">
        <div className="h-64 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </PageLayout>
    );
  }

  if (!project) {
    return (
      <PageLayout title={<h1 className="heading-1">Project Not Found</h1>} description="The student project you are looking for does not exist.">
        <div className="text-center py-20">
          <Link href="/academic" className="text-cyan-400 hover:text-cyan-300 font-medium">
            &larr; Back to Student Projects
          </Link>
        </div>
      </PageLayout>
    );
  }

  // Pre-fill email subject
  const emailSubject = encodeURIComponent(`Inquiry for Academic Project: ${project.title}`);
  const emailBody = encodeURIComponent(`Hi ReCognate Team,\n\nI am interested in purchasing the final year project titled "${project.title}".\n\nPlease let me know the details regarding pricing and delivery.\n\nThank you.`);

  return (
    <PageLayout
      badgeText={project.category}
      badgeColor="violet"
      title={
        <h1 className="heading-2 lg:heading-1 mb-6 max-w-4xl">
          {project.title}
        </h1>
      }
      description={project.price || "Contact for pricing"}
      glowColors={['violet', 'blue']}
    >
      <div className="container mx-auto px-6 lg:px-12 relative z-10 -mt-10">
        <Link href="/academic" className="inline-flex items-center gap-2 text-body hover:text-cyan-400 transition-colors mb-8 group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Student Projects
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Overview */}
            <div className="glass-card p-8 md:p-10 border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] -mr-32 -mt-32"></div>
              <h2 className="text-2xl font-space font-bold text-white mb-6">Project Overview</h2>
              <p className="text-body text-lg leading-relaxed mb-8">
                {project.description}
              </p>
              
              <h3 className="text-xl font-space font-bold text-white mb-4">Key Features</h3>
              <ul className="space-y-3">
                {project.features?.map((feature: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-cyan-400 shrink-0 mt-1" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
                {!project.features && (
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-cyan-400 shrink-0 mt-1" />
                    <span className="text-gray-300">Detailed Documentation & Architecture Flow</span>
                  </li>
                )}
              </ul>
            </div>

            {/* Technologies */}
            <div className="glass-card p-8 border-white/5">
              <h2 className="text-2xl font-space font-bold text-white mb-6">Technology Stack</h2>
              <div className="flex flex-wrap gap-3">
                {project.technologies?.map((tech: string) => (
                  <span key={tech} className="px-4 py-2 bg-[#050810] border border-white/10 rounded-lg text-sm font-medium text-gray-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            <div className="glass-card p-6 border-cyan-500/20 bg-cyan-950/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent"></div>
              <div className="relative z-10">
                <h3 className="text-xl font-space font-bold text-white mb-6">Deliverables</h3>
                
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3 text-gray-300">
                    <BookOpen size={18} className={project.hasReport ? "text-cyan-400" : "text-gray-600"} />
                    <span className={project.hasReport ? "" : "line-through opacity-50"}>Complete Project Report</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <Presentation size={18} className={project.hasPresentation ? "text-violet-400" : "text-gray-600"} />
                    <span className={project.hasPresentation ? "" : "line-through opacity-50"}>PowerPoint Presentation</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <Code2 size={18} className={project.hasCode ? "text-blue-400" : "text-gray-600"} />
                    <span className={project.hasCode ? "" : "line-through opacity-50"}>Full Source Code</span>
                  </li>
                </ul>

                <a 
                  href={`mailto:recognate.ai@gmail.com?subject=${emailSubject}&body=${emailBody}`}
                  className="w-full py-4 rounded-xl font-space font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]"
                >
                  <Mail size={18} />
                  Inquire to Purchase
                </a>
                <p className="text-center text-xs text-gray-500 mt-4">We will reply within 24 hours.</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </PageLayout>
  );
}
