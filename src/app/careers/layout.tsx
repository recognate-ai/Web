import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers | Join ReCognate",
  description: "Join the ReCognate team and help us build the next generation of AI and IoT solutions. Explore our open positions and career opportunities.",
  alternates: {
    canonical: "https://recognate.vercel.app/careers",
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Careers at ReCognate",
  "description": "Explore career opportunities at ReCognate in AI, Software Engineering, and IoT Development.",
  "url": "https://recognate.vercel.app/careers",
  "publisher": {
    "@id": "https://recognate.vercel.app/#organization"
  }
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
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
