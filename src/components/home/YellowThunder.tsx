"use client";
import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

export default function YellowThunder() {
  const controls = useAnimation();
  const flashControls = useAnimation();
  const [boltPath, setBoltPath] = useState("M 50 0 L 50 100");

  const generateLightning = () => {
    // Generate a jagged line from top to bottom
    const startX = Math.random() * 80 + 10;
    let path = `M ${startX} 0 `;
    
    let currentY = 0;
    let currentX = startX;
    
    while (currentY < 100) {
      currentY += Math.random() * 15 + 5;
      if (currentY > 100) currentY = 100;
      
      // Jagged horizontal movement (strong zigs and zags)
      currentX += (Math.random() - 0.5) * 40;
      
      // Keep it somewhat in bounds
      currentX = Math.max(-10, Math.min(110, currentX));
      
      path += `L ${currentX} ${currentY} `;
    }
    return path;
  };

  useEffect(() => {
    let mounted = true;

    const triggerThunder = async () => {
      while (mounted) {
        // Wait random time between 2 and 6 seconds for frequent thunder strikes
        const waitTime = Math.random() * 4000 + 2000;
        await new Promise(r => setTimeout(r, waitTime));
        
        if (!mounted) break;

        setBoltPath(generateLightning());

        // Flash sequence (screen flashes yellow briefly)
        flashControls.start({
          opacity: [0, 0.1, 0, 0.2, 0],
          transition: { duration: 0.6, ease: "easeInOut" }
        });

        // Bolt drawing sequence
        controls.start({
          pathLength: [0, 1, 1],
          opacity: [0, 1, 0],
          transition: { duration: 0.5, times: [0, 0.1, 1], ease: "easeOut" }
        });
      }
    };
    
    triggerThunder();
    
    return () => {
      mounted = false;
    };
  }, [controls, flashControls]);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden mix-blend-screen opacity-70">
      {/* Background ambient flash */}
      <motion.div 
        animate={flashControls}
        initial={{ opacity: 0 }}
        className="absolute inset-0 bg-yellow-400"
      />
      {/* Lightning bolt SVG */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Thicker blurred glow behind the bolt */}
        <motion.path
          d={boltPath}
          stroke="#facc15"
          strokeWidth="3"
          fill="none"
          animate={controls}
          initial={{ pathLength: 0, opacity: 0 }}
          style={{ filter: 'blur(3px)' }}
          vectorEffect="non-scaling-stroke"
        />
        {/* Core white/yellow bolt */}
        <motion.path
          d={boltPath}
          stroke="#fef08a"
          strokeWidth="1"
          fill="none"
          animate={controls}
          initial={{ pathLength: 0, opacity: 0 }}
          style={{ filter: 'drop-shadow(0 0 2px rgba(253,224,71,1))' }}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
