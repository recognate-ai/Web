"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, ArrowRight, Briefcase } from 'lucide-react';
import Link from 'next/link';
import PageLayout from '@/components/layout/PageLayout';
import { api } from '@/lib/services/api';
import JobApplicationForm from '@/components/careers/JobApplicationForm';
import { Container } from '@/components/ui/Container';



export default function CareersPage() {
  const [openJobId, setOpenJobId] = useState<string | null>(null);
  const [applyingJobId, setApplyingJobId] = useState<string | null>(null);
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const data = await api.getJobs();
      if (data && data.length > 0) {
        setJobs(data as any);
      }
    };
    fetchJobs();
  }, []);

  const toggleJob = (id: string) => {
    setOpenJobId(openJobId === id ? null : id);
  };

  const getRequirementsList = (reqs: string[] | string | unknown) => {
    if (Array.isArray(reqs)) return reqs;
    if (typeof reqs === 'string') return reqs.split(',').map(r => r.trim()).filter(Boolean);
    return [];
  };

  return (
    <PageLayout
      badgeText="Careers"
      badgeColor="blue"
      title={
        <h1 className="heading-hero">
          Build What <span className="text-gradient">Matters.</span>
        </h1>
      }
      description="Join a team of passionate engineers, researchers, and designers dedicated to solving complex problems at the intersection of AI and hardware."
      glowColors={['blue', 'cyan']}
    >
      {/* Open Positions */}
      <Container className="relative z-10 flex flex-col items-center">
        <div className="w-full max-w-4xl">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-widest uppercase mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              We're Hiring
            </div>
            <h2 className="heading-2 mb-4">Open <span className="text-gradient">Positions</span></h2>
            <p className="text-body text-lg max-w-2xl">Don't see a perfect fit? We are always looking for exceptional talent to join our mission. Scroll down to submit a general application.</p>
          </div>

          <div className="space-y-4">
            {!jobs || jobs.length === 0 ? (
              <div className="glass-card p-8 md:p-12 border-white/10 text-center">
                <div className="w-16 h-16 bg-blue-500/10 text-blue-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Briefcase size={32} />
                </div>
                <h3 className="heading-3 mb-4">No Open Positions Currently</h3>
                <p className="text-body text-lg max-w-2xl mx-auto">
                  We don't have any specific roles open at the moment, but we are always on the lookout for exceptional talent.
                </p>
              </div>
            ) : (
              jobs.map((job) => (
                <div 
                  key={job.id} 
                  className={`glass-card overflow-hidden transition-all duration-300 ${
                    openJobId === job.id 
                      ? "border-cyan-500/30 shadow-[0_0_30px_rgba(34,211,238,0.1)] bg-white/[0.02]" 
                      : "border-white/10 hover:border-white/20 hover:bg-white/[0.02]"
                  }`}
                >
                  <button 
                    onClick={() => toggleJob(job.id)}
                    className="w-full text-left p-5 md:p-8 flex items-center justify-between group"
                  >
                    <div>
                      <h3 className="text-xl md:heading-3 mb-2">{job.title}</h3>
                      <div className="flex flex-wrap gap-3 text-sm">
                        <span className="text-cyan-400 font-medium">{job.department}</span>
                        <span className="text-body">•</span>
                        <span className="text-body">{job.location}</span>
                        <span className="text-body">•</span>
                        <span className="text-body">{job.type}</span>
                      </div>
                    </div>
                    <div className="text-body shrink-0 ml-4 group-hover:text-cyan-400 transition-colors">
                      {openJobId === job.id ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {openJobId === job.id && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-5 md:p-6 pt-0 border-t border-white/10 mt-4">
                          <div className="mb-8">
                            <h4 className="text-sm font-bold tracking-widest text-body uppercase mb-4">About The Role</h4>
                            <p className="text-body">{job.description}</p>
                          </div>
                          
                          <div className="mb-8">
                            <h4 className="text-sm font-bold tracking-widest text-body uppercase mb-4">Requirements</h4>
                            <ul className="space-y-2">
                              {getRequirementsList(job.requirements).map((req: string, i: number) => (
                                <li key={i} className="flex items-start gap-3 text-body">
                                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2.5 shrink-0 shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>
                                  {req}
                                </li>
                              ))}
                            </ul>
                          </div>
    
                          {applyingJobId === job.id ? (
                            <motion.div 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="mt-8 pt-8 border-t border-white/10"
                            >
                              <h4 className="text-lg font-space font-bold mb-6 text-white">Apply for {job.title}</h4>
                              <JobApplicationForm jobId={job.id} jobTitle={job.title} />
                            </motion.div>
                          ) : (
                            <button 
                            onClick={() => setApplyingJobId(job.id)}
                            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-blue-600 text-white font-medium transition-all hover:bg-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_rgba(37,99,235,0.6)] hover:-translate-y-0.5 mt-2"
                          >
                              Apply Now <ArrowRight size={16} />
                            </button>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))
            )}
          </div>
          
          {/* General Application Form always visible at the bottom */}
          <div className="mt-20 pt-16 border-t border-white/10 mb-20">
            <div className="max-w-3xl mx-auto text-left glass-card p-8 md:p-12 rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-cyan-400/5 opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6 mx-auto border border-white/10 shadow-inner">
                  <Briefcase size={28} className="text-cyan-400" />
                </div>
                <h4 className="text-3xl font-space font-bold mb-3 text-center text-white">General Application</h4>
                <p className="text-body text-center mb-10 text-lg">Don't see a role that fits perfectly? Submit your resume and we'll keep you in mind for future openings.</p>
                <JobApplicationForm />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </PageLayout>
  );
}
