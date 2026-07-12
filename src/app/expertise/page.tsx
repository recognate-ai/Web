"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Cpu, Microchip, Code2, Wrench, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import PageLayout from '@/components/layout/PageLayout';
import { Container } from '@/components/ui/Container';

const expertises = [
  {
    id: "ai",
    title: "Artificial Intelligence",
    icon: <Brain size={24} />,
    color: "blue",
    description: "We design, train, and deploy advanced machine learning models that transform raw data into predictive intelligence and autonomous decision-making engines.",
    points: [
      "Deep Learning & Neural Networks",
      "Computer Vision & Image Processing",
      "Natural Language Processing (NLP)",
      "Predictive Analytics & Forecasting",
      "Generative AI & LLM Fine-Tuning",
      "Edge AI (TinyML)"
    ],
    techStack: ["TensorFlow", "PyTorch", "OpenCV", "Scikit-learn", "HuggingFace"]
  },
  {
    id: "iot",
    title: "Internet of Things",
    icon: <Cpu size={24} />,
    color: "cyan",
    description: "We build secure, scalable, and resilient IoT ecosystems that seamlessly connect physical sensors to intelligent cloud platforms for real-time monitoring.",
    points: [
      "IoT Architecture Design",
      "Real-Time Sensor Data Ingestion",
      "Edge Computing Integration",
      "Industrial IoT (IIoT) Solutions",
      "Smart Home Automation Protocols",
      "Secure OTA (Over-The-Air) Updates"
    ],
    techStack: ["MQTT", "AWS IoT", "Azure IoT Hub", "LoRaWAN", "CoAP"]
  },
  {
    id: "embedded",
    title: "Embedded Systems",
    icon: <Microchip size={24} />,
    color: "violet",
    description: "Our embedded engineers develop robust firmware and custom hardware solutions optimized for low power consumption, high performance, and extreme environments.",
    points: [
      "Microcontroller Firmware Development",
      "Custom PCB Design & Prototyping",
      "Hardware-Software Co-design",
      "Real-Time Operating Systems (RTOS)",
      "Sensor Integration & Calibration",
      "Wireless Communication (BLE, Zigbee, WiFi)"
    ],
    techStack: ["C/C++", "FreeRTOS", "Altium Designer", "ESP32", "ARM Cortex"]
  },
  {
    id: "software",
    title: "Software Engineering",
    icon: <Code2 size={24} />,
    color: "blue",
    description: "We engineer high-performance web applications, mobile apps, and scalable cloud architectures that serve as the backbone for your AI and IoT products.",
    points: [
      "Cloud-Native Application Development",
      "Responsive Web & Mobile Apps",
      "RESTful & GraphQL API Design",
      "Microservices Architecture",
      "Database Optimization (SQL/NoSQL)",
      "Interactive Real-Time Dashboards"
    ],
    techStack: ["React/Next.js", "Node.js/FastAPI", "PostgreSQL/MongoDB", "Docker", "Kubernetes"]
  },
  {
    id: "engineering",
    title: "Product Engineering",
    icon: <Wrench size={24} />,
    color: "cyan",
    description: "We provide comprehensive, end-to-end product development. From initial ideation and architecture to rapid prototyping, testing, and full-scale deployment.",
    points: [
      "Requirements Elicitation & Analysis",
      "System Architecture Design",
      "UX/UI Design for Complex Systems",
      "Rapid Prototyping & MVP Build",
      "Quality Assurance & Automated Testing",
      "CI/CD Pipeline Setup"
    ],
    techStack: ["Figma", "Jira", "GitHub Actions", "Terraform", "Jest/Cypress"]
  }
];

export default function ExpertisePage() {
  const [activeTab, setActiveTab] = useState(expertises[0].id);
  const activeData = expertises.find(e => e.id === activeTab)!;

  return (
    <PageLayout
      badgeText="What We Do"
      badgeColor="cyan"
      title={
        <h1 className="heading-1 mb-6">
          Mastering the Edge of <span className="text-gradient">Innovation</span>
        </h1>
      }
      description="Our multidisciplinary teams combine deep technical knowledge across software, hardware, and data science to build comprehensive, intelligent ecosystems."
      glowColors={['blue']}
    >
      <Container className="relative z-10">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Tabs Sidebar */}
          <div className="lg:w-1/3 flex flex-col gap-3">
            {expertises.map((exp) => (
              <button
                key={exp.id}
                onClick={() => setActiveTab(exp.id)}
                className={cn(
                  "flex items-center gap-4 p-3 rounded-xl text-left transition-all duration-300 border",
                  activeTab === exp.id 
                    ? "bg-white/10 border-white/20 shadow-lg" 
                    : "bg-transparent border-transparent hover:bg-white/5 text-body hover:text-white"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                  activeTab === exp.id ? `bg-${exp.color}-500/20 text-${exp.color}-400` : "bg-[#111827] text-gray-500"
                )}>
                  {exp.icon}
                </div>
                <div>
                  <h3 className={cn("font-space font-semibold text-base", activeTab === exp.id ? "text-white" : "")}>
                    {exp.title}
                  </h3>
                </div>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="lg:w-2/3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="glass-card p-6 md:p-8 border-white/10 relative overflow-hidden"
              >
                {/* Decorative glow inside card */}
                <div className={`absolute top-0 right-0 w-64 h-64 bg-${activeData.color}-500/10 rounded-bl-full blur-[80px] -z-10`}></div>

                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-xl bg-${activeData.color}-500/20 text-${activeData.color}-400 flex items-center justify-center`}>
                    {activeData.icon}
                  </div>
                  <h2 className="text-3xl font-space font-bold text-white">{activeData.title}</h2>
                </div>
                
                <p className="text-base text-gray-300 leading-relaxed mb-8">
                  {activeData.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                  {activeData.points.map((point, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 size={20} className={`text-${activeData.color}-400 shrink-0 mt-0.5`} />
                      <span className="text-gray-300 font-medium">{point}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/10 pt-8">
                  <h4 className="text-sm font-bold tracking-widest text-gray-500 uppercase mb-4">Core Technologies</h4>
                  <div className="flex flex-wrap gap-3">
                    {activeData.techStack.map(tech => (
                      <span key={tech} className="px-3 py-1.5 rounded-full bg-[#111827] border border-white/10 text-xs font-medium text-gray-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </Container>
    </PageLayout>
  );
}
