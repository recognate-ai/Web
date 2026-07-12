import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Expertise | AI, IoT & Cloud Engineering",
  description: "Explore ReCognate's core competencies in Artificial Intelligence, Internet of Things, Enterprise Software, and Embedded Systems development.",
  alternates: {
    canonical: "https://recognate.ai/expertise",
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Software Engineering & IoT Development",
  "provider": {
    "@id": "https://recognate.ai/#organization"
  },
  "url": "https://recognate.ai/expertise",
  "description": "Expertise in AI, IoT, Cloud, and Embedded Systems.",
  "areaServed": "Worldwide"
};

export default function ExpertiseLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
