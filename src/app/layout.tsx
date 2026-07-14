import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Providers from "@/components/layout/Providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://recognate.vercel.app'),
  title: {
    default: "ReCognate | AI & IoT Product Development Company",
    template: "%s | ReCognate"
  },
  description: "ReCognate is an innovative AI and IoT product development company focused on transforming creative ideas into intelligent, connected, scalable, and real-world technology solutions. We specialize in software engineering, embedded systems, and enterprise architecture.",
  keywords: [
    "AI development", "IoT solutions", "Software engineering", "Product development", 
    "Embedded systems", "Enterprise architecture", "final year project", "ai projects", 
    "ml projects", "computer vision projects", "deep learning projects", "IoT Projects", 
    "embedded projects", "full stack development", "web development", "website building", 
    "all types of software", "app development", "custom hardware", "student projects",
    "tech solutions"
  ],
  authors: [{ name: "ReCognate Team", url: "https://recognate.vercel.app" }],
  creator: "ReCognate",
  publisher: "ReCognate",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://recognate.vercel.app",
    title: "ReCognate | AI & IoT Product Development Company",
    description: "Transforming creative ideas into intelligent, connected, scalable technology solutions.",
    siteName: "ReCognate",
  },
  twitter: {
    card: "summary_large_image",
    title: "ReCognate | AI & IoT Product Development Company",
    description: "Transforming creative ideas into intelligent, connected, scalable technology solutions.",
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png' }
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://recognate.vercel.app/#organization",
      "name": "ReCognate",
      "url": "https://recognate.vercel.app",
      "logo": "https://recognate.vercel.app/logo.jpg",
      "description": "An innovative AI and IoT product development company.",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "9487407198",
        "contactType": "customer service",
        "email": "recognate.ai@gmail.com",
        "areaServed": "IN",
        "availableLanguage": "English"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://recognate.vercel.app/#website",
      "url": "https://recognate.vercel.app",
      "name": "ReCognate",
      "publisher": {
        "@id": "https://recognate.vercel.app/#organization"
      }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased bg-navy text-white min-h-screen flex flex-col`}>
        <Providers>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
