import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  return {
    title: `Project ${params.id} | ReCognate Portfolio`,
    description: `Explore the details of project ${params.id} developed by ReCognate. See how we deliver robust AI, IoT, and software engineering solutions.`,
    alternates: {
      canonical: `https://recognate.ai/projects/${params.id}`,
    }
  }
}

export default function DynamicProjectLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
