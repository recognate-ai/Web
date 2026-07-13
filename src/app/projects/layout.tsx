import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | ReCognate Portfolio",
  description: "View our portfolio of successful AI and IoT projects. See how ReCognate builds scalable and robust technology solutions for our clients.",
  alternates: {
    canonical: "https://recognate.vercel.app/projects",
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "ReCognate Project Portfolio",
  "description": "Portfolio of AI and IoT projects developed by ReCognate.",
  "url": "https://recognate.vercel.app/projects",
  "publisher": {
    "@id": "https://recognate.vercel.app/#organization"
  }
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
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
