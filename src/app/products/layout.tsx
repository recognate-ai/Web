import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products | ReCognate Ecosystem",
  description: "Discover ReCognate's suite of proprietary AI software and interconnected hardware products designed for modern enterprises.",
  alternates: {
    canonical: "https://recognate.ai/products",
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "ReCognate Products",
  "description": "Proprietary AI software and interconnected hardware products by ReCognate.",
  "url": "https://recognate.ai/products",
  "publisher": {
    "@id": "https://recognate.ai/#organization"
  }
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
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
