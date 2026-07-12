import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  return {
    title: `Student Project ${params.id} | ReCognate`,
    description: `Explore the details of student project ${params.id}. Buy complete source code, reports, and presentations for your final year project.`,
    alternates: {
      canonical: `https://recognate.ai/academic/${params.id}`,
    }
  }
}

export default function DynamicAcademicLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
