"use client";

import React from 'react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { LayoutDashboard, Users, FolderKanban, Package, FlaskConical, Briefcase, FileUser, LogOut, GraduationCap, MessageSquare } from 'lucide-react';
import { usePathname } from 'next/navigation';

function AdminSidebar() {
  const pathname = usePathname();
  const { signOut } = useAuth();

  const navItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Team', href: '/admin/team', icon: <Users size={20} /> },
    { name: 'Projects', href: '/admin/projects', icon: <FolderKanban size={20} /> },
    { name: 'Products', href: '/admin/products', icon: <Package size={20} /> },
    { name: 'Student Projects', href: '/admin/academic', icon: <GraduationCap size={20} /> },
    { name: 'R&D', href: '/admin/rd', icon: <FlaskConical size={20} /> },
    { name: 'Careers', href: '/admin/careers', icon: <Briefcase size={20} /> },
    { name: 'Job Applications', href: '/admin/applications', icon: <FileUser size={20} /> },
    { name: 'Inquiries', href: '/admin/inquiries', icon: <MessageSquare size={20} /> },
  ];

  if (pathname === '/admin/login') return null;

  return (
    <aside className="w-72 bg-gradient-to-b from-[#0a0f1d] to-[#050810] border-r border-white/10 flex flex-col h-screen flex-shrink-0">
      <div className="p-6 border-b border-white/10">
        <Link href="/" className="font-space font-bold text-xl text-white block">
          ReCognate <span className="text-cyan-400">Admin</span>
        </Link>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative overflow-hidden group text-sm ${
                isActive 
                  ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shadow-[0_0_20px_rgba(34,211,238,0.2)]' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-0 w-1.5 h-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.9)] rounded-r-full"></div>
              )}
              {item.icon}
              <span className="font-medium relative z-10">{item.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-white/10">
        <button
          onClick={signOut}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 w-full transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}

function AdminContent({ children }: { children: React.ReactNode }) {
  
  return (
    <main className="flex-1 overflow-y-auto bg-[#03050a] relative">
      {children}
    </main>
  );
}

function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#0a0f1d]">
        <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  // If not logged in and not on login page, don't render anything (useEffect in AuthContext will redirect)
  if (!user && pathname !== '/admin/login') {
    return null;
  }

  return (
    <div className="flex h-screen bg-[#0a0f1d] text-white overflow-hidden">
      {/* Only show Sidebar if not on login page */}
      <AdminSidebar />
      <AdminContent>{children}</AdminContent>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ProtectedAdminLayout>
        {children}
      </ProtectedAdminLayout>
    </AuthProvider>
  );
}
