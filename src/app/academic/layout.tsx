import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Final Year Student Projects | ReCognate",
  description: "Browse our collection of high-quality Final Year Projects for college students. Includes complete source code, comprehensive reports, and presentations.",
  alternates: {
    canonical: "https://recognate.vercel.app/academic",
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "ReCognate Student Projects",
  "description": "High-quality Final Year Student Projects with reports and presentations.",
  "url": "https://recognate.vercel.app/academic",
  "publisher": {
    "@id": "https://recognate.vercel.app/#organization"
  }
};

export default function AcademicLayout({ children }: { children: React.ReactNode }) {
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
