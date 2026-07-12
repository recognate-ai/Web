"use client";

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Container } from '@/components/ui/Container';

interface PageLayoutProps {
  badgeText?: React.ReactNode;
  badgeColor?: 'blue' | 'cyan' | 'violet' | 'fuchsia';
  title?: ReactNode;
  description?: string;
  glowColors?: ('blue' | 'cyan' | 'violet' | 'fuchsia')[];
  children: React.ReactNode;
}

export default function PageLayout({
  badgeText,
  badgeColor = 'cyan',
  title,
  description,
  glowColors = ['blue', 'cyan'],
  children,
}: PageLayoutProps) {
  // Generate background blurs based on glow colors
  const glowElements = glowColors.map((color, index) => {
    // Distribute glows in the background
    const positions = [
      "top-0 right-0 w-[600px] h-[600px]",
      "bottom-0 left-0 w-[600px] h-[600px]",
      "top-1/4 left-1/4 w-[400px] h-[400px]",
      "top-1/3 right-1/4 w-[700px] h-[700px]"
    ];
    const pos = positions[index % positions.length];
    
    return (
      <div 
        key={index}
        className={cn(
          "absolute rounded-full blur-[120px] pointer-events-none -z-10",
          pos,
          `bg-${color}-900/10`,
          // Add some variety to the opacities
          index === 0 ? "opacity-100" : "opacity-70"
        )}
      />
    );
  });

  return (
    <div className="min-h-screen pt-32 pb-24 bg-[#0a0f1d] relative overflow-hidden">
      {/* Background Decor */}
      {glowElements}
      
      {/* Hero Header Section */}
      <Container className="relative z-10 mb-20 flex flex-col items-center text-center">
        <div className="max-w-4xl flex flex-col items-center">
          
          {badgeText && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={cn(
                "inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-medium tracking-wide mb-6",
                `border-${badgeColor}-500/30 bg-${badgeColor}-500/10 text-${badgeColor}-400`
              )}
            >
              {badgeText}
            </motion.div>
          )}

          {title && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6"
            >
              {title}
            </motion.div>
          )}

          {description && (
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-body max-w-2xl"
            >
              {description}
            </motion.p>
          )}
          
        </div>
      </Container>

      {/* Main Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
