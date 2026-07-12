import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About ReCognate | Our Story & Leadership",
  description: "Learn about ReCognate's mission, vision, and the leadership team driving our AI and IoT engineering excellence.",
  alternates: {
    canonical: "https://recognate.ai/about",
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "About ReCognate",
  "description": "Learn about ReCognate's mission, vision, and the leadership team driving our AI and IoT engineering excellence.",
  "url": "https://recognate.ai/about",
  "publisher": {
    "@id": "https://recognate.ai/#organization"
  }
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
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
