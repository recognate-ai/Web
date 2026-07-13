import dynamic from 'next/dynamic';
import HeroSection from '@/components/home/HeroSection';
import AboutSection from '@/components/home/AboutSection';
import ExpertiseSection from '@/components/home/ExpertiseSection';
import AiSolutionsSection from '@/components/home/AiSolutionsSection';

const IotSolutionsSection = dynamic(() => import('@/components/home/IotSolutionsSection'), { ssr: true });
const ProcessSection = dynamic(() => import('@/components/home/ProcessSection'), { ssr: true });
const IndustriesSection = dynamic(() => import('@/components/home/IndustriesSection'), { ssr: true });
const InnovationLabSection = dynamic(() => import('@/components/home/InnovationLabSection'), { ssr: true });
const ProjectsSection = dynamic(() => import('@/components/home/ProjectsSection'), { ssr: true });
const WhyChooseUsSection = dynamic(() => import('@/components/home/WhyChooseUsSection'), { ssr: true });
const TechStackSection = dynamic(() => import('@/components/home/TechStackSection'), { ssr: true });
const CtaSection = dynamic(() => import('@/components/home/CtaSection'), { ssr: true });

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "ReCognate | AI & IoT Product Development Hub",
  description: "ReCognate partners with businesses to build custom AI software, enterprise applications, and embedded IoT systems that solve complex industry challenges.",
  alternates: {
    canonical: "https://recognate.vercel.app/",
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "ReCognate | AI & IoT Product Development Hub",
  "description": "ReCognate partners with businesses to build custom AI software, enterprise applications, and embedded IoT systems.",
  "url": "https://recognate.vercel.app/",
  "publisher": {
    "@id": "https://recognate.vercel.app/#organization"
  }
};

export default function Home() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <AboutSection />
      <ExpertiseSection />
      <AiSolutionsSection />
      <IotSolutionsSection />
      <ProcessSection />
      <IndustriesSection />
      <InnovationLabSection />
      <ProjectsSection />
      <WhyChooseUsSection />
      <TechStackSection />
      <CtaSection />
    </div>
  );
}
