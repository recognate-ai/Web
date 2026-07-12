"use client";

import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';

const capabilities = [
  "Machine Learning Solutions",
  "Computer Vision Systems",
  "Generative AI Applications",
  "Natural Language Processing",
  "AI-Powered Automation",
  "Predictive Analytics",
  "Intelligent Recommendation Systems",
  "Custom AI Model Development"
];

export default function AiSolutionsSection() {
  const controls = useAnimation();
  const visualRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(visualRef, { once: true, amount: 0.2 });

  useEffect(() => {
    if (!isInView) return;
    
    let isMounted = true;
    const sequence = async () => {
      while (isMounted) {
        // Reset to initial state
        await controls.set("hidden");
        await new Promise(r => setTimeout(r, 300));
        
        if (!isMounted) break;
        // 1. Entrance (Nodes fly in)
        controls.start("entrance");
        await new Promise(r => setTimeout(r, 2200));
        
        if (!isMounted) break;
        // 2. Lines draw
        controls.start("drawLines");
        await new Promise(r => setTimeout(r, 2000));
        
        if (!isMounted) break;
        // 3. Data flows
        controls.start("flowData");
        await new Promise(r => setTimeout(r, 4500));
        
        if (!isMounted) break;
        // 4. Exit
        controls.start("exit");
        await new Promise(r => setTimeout(r, 1200));
      }
    };
    sequence();
    return () => { isMounted = false; };
  }, [controls, isInView]);

  return (
    <Section className="relative overflow-hidden" spacing="md">
      <Container className="relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2"
          >
            <h2 className="heading-2 mb-6">
              Intelligence That Solves <span className="text-gradient">Real Problems</span>
            </h2>
            <p className="text-body text-lg mb-8 leading-relaxed">
              We build custom artificial intelligence models and data-driven systems 
              that automate complex tasks, uncover hidden insights, and adapt to your unique operational needs.
            </p>
            
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {capabilities.map((item, index) => (
                <motion.li 
                  key={index} 
                  whileHover={{ scale: 1.05, x: 5 }}
                  className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-gradient-to-r hover:from-indigo-500/10 hover:to-fuchsia-500/10 hover:border-fuchsia-500/30 transition-all cursor-pointer group"
                >
                  <CheckCircle2 size={18} className="text-cyan-400 shrink-0 mt-0.5 group-hover:text-fuchsia-400 transition-colors" />
                  <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right Visual (Neural Network Concept) */}
          <motion.div 
            ref={visualRef}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 w-full h-[400px] relative flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
            
            {/* Abstract Neural Nodes */}
            <div className="relative w-full max-w-sm h-full flex items-center justify-between">
              {/* Layer 1 */}
              <div className="flex flex-col justify-center gap-8 z-10">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={`l1-wrapper-${i}`}
                    variants={{
                      hidden: { opacity: 0, x: -150, y: (i - 1) * 50 },
                      entrance: { opacity: 1, x: 0, y: 0, transition: { duration: 1, delay: i * 0.2, type: "spring", bounce: 0.3 } },
                      drawLines: { opacity: 1, x: 0, y: 0 },
                      flowData: { opacity: 1, x: 0, y: 0 },
                      exit: { opacity: 0, scale: 0.5, transition: { duration: 0.5 } }
                    }}
                    initial="hidden"
                    animate={controls}
                  >
                    <motion.div 
                      key={`l1-${i}`}
                      animate={{ y: [0, -8, 0], scale: [1, 1.15, 1] }}
                      transition={{ duration: 3, delay: i * 0.4, repeat: Infinity, ease: "easeInOut" }}
                      className="w-12 h-12 rounded-full bg-blue-600/20 border border-blue-400/50 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                    >
                      <motion.div 
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
                        className="w-4 h-4 bg-blue-400 rounded-full blur-[2px]"
                      />
                    </motion.div>
                  </motion.div>
                ))}
              </div>
              
              {/* Layer 2 (Hidden Layer) */}
              <div className="flex flex-col justify-center gap-6 z-10">
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={`l2-wrapper-${i}`}
                    variants={{
                      hidden: { opacity: 0, y: i % 2 === 0 ? -150 : 150, x: (i - 1.5) * 20 },
                      entrance: { opacity: 1, y: 0, x: 0, transition: { duration: 1, delay: 0.4 + (i * 0.15), type: "spring", bounce: 0.4 } },
                      drawLines: { opacity: 1, x: 0, y: 0 },
                      flowData: { opacity: 1, x: 0, y: 0 },
                      exit: { opacity: 0, scale: 0.5, transition: { duration: 0.5 } }
                    }}
                    initial="hidden"
                    animate={controls}
                  >
                    <motion.div 
                      key={`l2-${i}`}
                      animate={{ y: [0, 8, 0], scale: [1, 1.2, 1] }}
                      transition={{ duration: 2.5, delay: i * 0.3, repeat: Infinity, ease: "easeInOut" }}
                      className="w-16 h-16 rounded-full bg-cyan-600/20 border border-cyan-400/50 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.5)]"
                    >
                      <motion.div 
                        animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.3, 1] }}
                        transition={{ duration: 2, delay: i * 0.4, repeat: Infinity }}
                        className="w-6 h-6 bg-cyan-400 rounded-full blur-[3px]"
                      />
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              {/* Layer 3 (Output Layer) */}
              <div className="flex flex-col justify-center gap-12 z-10">
                {[...Array(2)].map((_, i) => (
                  <motion.div
                    key={`l3-wrapper-${i}`}
                    variants={{
                      hidden: { opacity: 0, x: 150, y: (i - 0.5) * -50 },
                      entrance: { opacity: 1, x: 0, y: 0, transition: { duration: 1.2, delay: 0.8 + (i * 0.2), type: "spring", bounce: 0.3 } },
                      drawLines: { opacity: 1, x: 0, y: 0 },
                      flowData: { opacity: 1, x: 0, y: 0 },
                      exit: { opacity: 0, scale: 0.5, transition: { duration: 0.5 } }
                    }}
                    initial="hidden"
                    animate={controls}
                  >
                    <motion.div 
                      key={`l3-${i}`}
                      animate={{ x: [0, 5, 0], scale: [1, 1.25, 1] }}
                      transition={{ duration: 4, delay: i * 0.5, repeat: Infinity, ease: "easeInOut" }}
                      className="w-20 h-20 rounded-full bg-violet-600/20 border border-violet-400/50 flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.6)]"
                    >
                      <motion.div 
                        animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.4, 1] }}
                        transition={{ duration: 1.8, delay: i * 0.3, repeat: Infinity }}
                        className="w-8 h-8 bg-violet-400 rounded-full blur-[4px]"
                      />
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              {/* Connecting Paths Background */}
              <svg className="absolute inset-0 w-full h-full -z-10" style={{ filter: 'drop-shadow(0 0 8px rgba(6,182,212,0.5))' }}>
                {/* 1. Base solid lines that draw themselves in */}
                <motion.g>
                  {[
                    "M 40,120 L 180,80 M 40,120 L 180,160 M 40,120 L 180,240 M 40,120 L 180,320",
                    "M 40,200 L 180,80 M 40,200 L 180,160 M 40,200 L 180,240 M 40,200 L 180,320",
                    "M 40,280 L 180,80 M 40,280 L 180,160 M 40,280 L 180,240 M 40,280 L 180,320",
                    "M 180,80 L 340,150 M 180,80 L 340,250",
                    "M 180,160 L 340,150 M 180,160 L 340,250",
                    "M 180,240 L 340,150 M 180,240 L 340,250",
                    "M 180,320 L 340,150 M 180,320 L 340,250"
                  ].map((pathD, idx) => (
                    <motion.path 
                      key={`base-path-${idx}`}
                      variants={{
                        hidden: { pathLength: 0, opacity: 0 },
                        entrance: { pathLength: 0, opacity: 0 },
                        drawLines: { pathLength: 1, opacity: 0.15, transition: { duration: 1.5, delay: idx * 0.1, ease: "easeOut" } },
                        flowData: { pathLength: 1, opacity: 0.15 },
                        exit: { opacity: 0, transition: { duration: 0.5 } }
                      }}
                      initial="hidden"
                      animate={controls}
                      d={pathD} 
                      stroke={idx < 3 ? "rgba(59,130,246,1)" : "rgba(6,182,212,1)"} 
                      strokeWidth="1.5" 
                      fill="none" 
                    />
                  ))}
                </motion.g>

                {/* 2. Flowing dashed lines that appear after drawing is complete */}
                <motion.g 
                  variants={{
                    hidden: { opacity: 0 },
                    entrance: { opacity: 0 },
                    drawLines: { opacity: 0 },
                    flowData: { opacity: 1, transition: { duration: 1.5 } },
                    exit: { opacity: 0, transition: { duration: 0.5 } }
                  }}
                  initial="hidden"
                  animate={controls}
                >
                  <motion.g 
                    initial={{ strokeDashoffset: 1000 }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    strokeDasharray="10 20"
                  >
                    <path d="M 40,120 L 180,80 M 40,120 L 180,160 M 40,120 L 180,240 M 40,120 L 180,320" stroke="rgba(59,130,246,0.5)" strokeWidth="2" fill="none" />
                    <path d="M 40,200 L 180,80 M 40,200 L 180,160 M 40,200 L 180,240 M 40,200 L 180,320" stroke="rgba(59,130,246,0.5)" strokeWidth="2" fill="none" />
                    <path d="M 40,280 L 180,80 M 40,280 L 180,160 M 40,280 L 180,240 M 40,280 L 180,320" stroke="rgba(59,130,246,0.5)" strokeWidth="2" fill="none" />
                    
                    <path d="M 180,80 L 340,150 M 180,80 L 340,250" stroke="rgba(6,182,212,0.5)" strokeWidth="2" fill="none" />
                    <path d="M 180,160 L 340,150 M 180,160 L 340,250" stroke="rgba(6,182,212,0.5)" strokeWidth="2" fill="none" />
                    <path d="M 180,240 L 340,150 M 180,240 L 340,250" stroke="rgba(6,182,212,0.5)" strokeWidth="2" fill="none" />
                    <path d="M 180,320 L 340,150 M 180,320 L 340,250" stroke="rgba(6,182,212,0.5)" strokeWidth="2" fill="none" />
                  </motion.g>
                </motion.g>
              </svg>
            </div>
          </motion.div>

        </div>
      </Container>
    </Section>
  );
}
