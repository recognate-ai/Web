"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Users, FolderKanban, Package, FlaskConical, Briefcase, ArrowUpRight, Activity } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const [counts, setCounts] = useState({
    team: 0,
    projects: 0,
    products: 0,
    rd: 0,
    jobs: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [
          { count: teamCount },
          { count: projectsCount },
          { count: productsCount },
          { count: rdCount },
          { count: jobsCount }
        ] = await Promise.all([
          supabase.from('team_members').select('*', { count: 'exact', head: true }),
          supabase.from('projects').select('*', { count: 'exact', head: true }),
          supabase.from('products').select('*', { count: 'exact', head: true }),
          supabase.from('rd_prototypes').select('*', { count: 'exact', head: true }),
          supabase.from('jobs').select('*', { count: 'exact', head: true }),
        ]);

        setCounts({
          team: teamCount || 0,
          projects: projectsCount || 0,
          products: productsCount || 0,
          rd: rdCount || 0,
          jobs: jobsCount || 0
        });
      } catch (err) {
        console.error("Error fetching stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const stats = [
    { title: "Team Members", value: counts.team, href: "/admin/team", icon: <Users size={24} />, color: "text-blue-400", bg: "bg-blue-500/10", borderHover: "hover:border-blue-500/30", glow: "bg-blue-500/20" },
    { title: "Projects", value: counts.projects, href: "/admin/projects", icon: <FolderKanban size={24} />, color: "text-cyan-400", bg: "bg-cyan-500/10", borderHover: "hover:border-cyan-500/30", glow: "bg-cyan-500/20" },
    { title: "Products", value: counts.products, href: "/admin/products", icon: <Package size={24} />, color: "text-violet-400", bg: "bg-violet-500/10", borderHover: "hover:border-violet-500/30", glow: "bg-violet-500/20" },
    { title: "R&D Prototypes", value: counts.rd, href: "/admin/rd", icon: <FlaskConical size={24} />, color: "text-fuchsia-400", bg: "bg-fuchsia-500/10", borderHover: "hover:border-fuchsia-500/30", glow: "bg-fuchsia-500/20" },
    { title: "Open Positions", value: counts.jobs, href: "/admin/careers", icon: <Briefcase size={24} />, color: "text-emerald-400", bg: "bg-emerald-500/10", borderHover: "hover:border-emerald-500/30", glow: "bg-emerald-500/20" },
  ];

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
        <div>
          <h1 className="heading-1 mb-2">Welcome Back</h1>
          <p className="text-body text-lg">Logged in as <span className="text-cyan-400 font-medium">{user?.email}</span></p>
        </div>
        
        {loading && (
          <div className="flex items-center gap-2 text-cyan-400 bg-cyan-500/10 px-4 py-2 rounded-full border border-cyan-500/20">
            <Activity size={16} className="animate-pulse" />
            <span className="text-sm font-medium tracking-wide">Syncing Data...</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Link href={stat.href} className="block group h-full">
              <div className={`glass-card h-full p-6 border-white/5 ${stat.borderHover} transition-all duration-300 relative overflow-hidden flex flex-col justify-between group-hover:-translate-y-1 group-hover:shadow-2xl`}>
                
                {/* Background Glow */}
                <div className={`absolute -right-10 -top-10 w-32 h-32 ${stat.glow} rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div className={`w-14 h-14 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}>
                    {stat.icon}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-white/10 transition-all duration-300">
                    <ArrowUpRight size={16} className="text-white" />
                  </div>
                </div>
                
                <div className="relative z-10">
                  <h3 className="text-5xl font-space font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-3 group-hover:to-white transition-all">{stat.value}</h3>
                  <p className="text-body font-medium tracking-wide uppercase text-sm">{stat.title}</p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
