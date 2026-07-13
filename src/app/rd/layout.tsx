import { Metadata } from "next";

export const metadata: Metadata = {
  title: "R&D | AI & IoT Innovation Lab",
  description: "Explore the ReCognate Research & Development Innovation Lab. We continuously explore cutting-edge AI and hardware technologies to define the future.",
  alternates: {
    canonical: "https://recognate.vercel.app/rd",
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "ReCognate R&D Innovation Lab",
  "description": "Research & Development initiatives by ReCognate in AI, IoT, and Next-Gen Hardware.",
  "url": "https://recognate.vercel.app/rd",
  "publisher": {
    "@id": "https://recognate.vercel.app/#organization"
  }
};

export default function RDLayout({ children }: { children: React.ReactNode }) {
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
