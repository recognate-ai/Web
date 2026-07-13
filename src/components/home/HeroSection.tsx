"use client";

import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent, Variants } from 'framer-motion';
import RecognateLogo from '@/components/ui/RecognateLogo';

export default function HeroSection() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const taglineRectVariants: Variants = {
    hidden: { opacity: 0, y: 14, scale: 0.9, filter: "drop-shadow(0px 0px 0px rgba(24,62,250,0))" },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: [
        "drop-shadow(0px 0px 0px rgba(24,62,250,0))",
        "drop-shadow(0px 0px 10px rgba(24,62,250,0.75))",
        "drop-shadow(0px 0px 0px rgba(24,62,250,0))"
      ],
      transition: {
        opacity: { delay: 1.8, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        y: { delay: 1.8, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        scale: { delay: 1.8, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        filter: { delay: 2.5, duration: 3, ease: "easeInOut", repeat: Infinity }
      }
    }
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 14, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: 1.8,
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0a0f1d]">
      {/* Subtle Background Elements to match site aesthetic */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 z-0 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1d]/10 via-[#0a0f1d]/50 to-[#0a0f1d] z-0 pointer-events-none"></div>

      {/* Animated glowing orbs for subtle depth behind the logo */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#183efa]/10 rounded-full blur-[120px] z-0 pointer-events-none"
      />

      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-none px-4 md:px-10 h-screen">

        {/* Exact SVG Logo as provided */}
        <div className="w-full h-auto flex items-center justify-center relative">

          {/* Main Logo with layoutId */}
          {!isScrolled && (
            <motion.div
              layoutId="main-logo"
              className="w-full max-w-[1600px] h-auto drop-shadow-[0_0_15px_rgba(255,255,255,0.05)] scale-[1.6] md:scale-125 lg:scale-[1.35] z-10 origin-center"
            >
              <RecognateLogo animated={true} />
            </motion.div>
          )}

          {/* Development Hub Tagline - Rendered in its own static overlay SVG */}
          <svg
            viewBox="0 0 1536 1024"
            className="w-full max-w-[1600px] h-auto absolute inset-0 pointer-events-none scale-[1.6] md:scale-125 lg:scale-[1.35] z-0"
            preserveAspectRatio="xMidYMid meet"
          >
            <g style={{ transformOrigin: "center" }}>
              <motion.rect
                variants={taglineRectVariants}
                initial="hidden"
                animate="visible"
                fill="#183efa"
                x="594.95"
                y="561"
                width="410"
                height="40"
                rx="8"
                ry="8"
              />
              <motion.text
                variants={textVariants}
                initial="hidden"
                animate="visible"
                fill="#fff"
                x="799.95"
                y="583"
                textAnchor="middle"
                dominantBaseline="middle"
                style={{
                  fontFamily: "'Trebuchet MS', sans-serif",
                  fontSize: "19px",
                  fontWeight: 600,
                  letterSpacing: "0.35em"
                }}
              >
                A DEVELOPMENT HUB
              </motion.text>
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
