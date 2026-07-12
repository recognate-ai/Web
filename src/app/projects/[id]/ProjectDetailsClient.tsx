"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import PageLayout from '@/components/layout/PageLayout';
import { ArrowLeft, CheckCircle2, Link as LinkIcon, User, Tag } from 'lucide-react';
import Link from 'next/link';



export default function ProjectDetailsClient() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const id = params.id as string;
        const { supabase } = await import('@/lib/supabase');
        
        // Try fetching from supabase first
        const { data, error } = await supabase.from('projects').select('*').eq('id', id).single();
        
        if (data && !error) {
          setProject(data);
        } else {
          setProject(null);
        }
      } catch {
        console.log("Supabase error fetching project details.");
        setProject(null);
      } finally {
        setLoading(false);
      }
    };
    
    if (params.id) {
      fetchProject();
    }
  }, [params.id]);

  if (loading) {
    return (
      <PageLayout title={<h1 className="heading-1">Loading...</h1>}>
        <div className="container mx-auto h-64 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
        </div>
      </PageLayout>
    );
  }

  if (!project) {
    return (
      <PageLayout title={<h1 className="heading-1">Project Not Found</h1>}>
        <div className="container mx-auto text-center py-20">
          <p className="text-xl text-body mb-8">The project you are looking for doesn&apos;t exist or has been removed.</p>
          <button onClick={() => router.back()} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
            Go Back
          </button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      badgeText={project.category}
      badgeColor="blue"
      title={
        <h1 className="heading-1 mb-6">
          {project.title}
        </h1>
      }
      description={project.description}
    >
      <div className="container mx-auto px-6 lg:px-12 relative z-10 pb-20">
        
        <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12">
          <ArrowLeft size={20} /> Back to Projects
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Abstract Placeholder for Project Image */}
            <div className="w-full h-80 md:h-[400px] bg-gradient-to-br from-[#0d1428] to-[#1a233a] rounded-2xl border border-white/10 relative overflow-hidden flex items-center justify-center group shadow-2xl">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IiNmZmYiLz48L3N2Zz4=')] bg-[length:20px_20px] opacity-10" />
              <div className="absolute inset-0 bg-cyan-500/10 mix-blend-overlay group-hover:bg-cyan-500/20 transition-colors duration-500" />
              
              <div className="w-32 h-32 rounded-full border-2 border-cyan-500/30 border-dashed flex items-center justify-center relative z-10 group-hover:rotate-180 transition-transform duration-1000">
                <span className="font-space text-5xl font-bold text-white/50">
                  {project.title.substring(0, 2).toUpperCase()}
                </span>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-space font-semibold text-white mb-6 border-b border-white/10 pb-4">About this Project</h2>
              <p className="text-body text-lg leading-relaxed">
                {project.description}
              </p>
              {/* Added a bit more filler text to make it look like a real case study */}
              <p className="text-body text-lg leading-relaxed mt-4">
                This project involved a comprehensive approach from initial ideation to final deployment. Our team worked closely with stakeholders to ensure that every requirement was met with precision. By leveraging state-of-the-art technologies and adhering to industry best practices, we delivered a solution that not only meets current needs but is also scalable for future growth.
              </p>
            </div>
            
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="glass-card p-8 border-white/10 bg-white/5 rounded-2xl shadow-xl">
              <h3 className="text-xl font-space font-semibold text-white mb-6">Project Details</h3>
              
              <ul className="space-y-6">
                {project.client && (
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                      <User size={20} className="text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Client / Owner</p>
                      <p className="text-white font-medium">{project.client}</p>
                    </div>
                  </li>
                )}
                
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center shrink-0">
                    <Tag size={20} className="text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Category</p>
                    <p className="text-white font-medium">{project.category}</p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-fuchsia-500/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 size={20} className="text-fuchsia-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Status</p>
                    <p className="text-white font-medium">{project.status}</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="glass-card p-8 border-white/10 bg-white/5 rounded-2xl shadow-xl">
              <h3 className="text-xl font-space font-semibold text-white mb-6">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies?.map((tech: string) => (
                  <span key={tech} className="px-4 py-2 bg-[#111827] rounded-lg text-sm font-medium text-gray-300 border border-white/5 shadow-inner">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {project.url && (
              <a 
                href={project.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold flex items-center justify-center gap-3 transition-colors shadow-lg shadow-blue-900/20"
              >
                Visit Live Project <LinkIcon size={18} />
              </a>
            )}
            
            {!project.url && (
              <Link 
                href={`/contact?project=${project.id}`}
                className="w-full py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold flex items-center justify-center gap-3 transition-colors"
              >
                Inquire About Project
              </Link>
            )}

          </div>
        </div>
      </div>
    </PageLayout>
  );
}
