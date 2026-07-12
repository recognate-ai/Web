import type { Metadata, ResolvingMetadata } from 'next';
import ProjectDetailsClient from './ProjectDetailsClient';

type Props = {
  params: Promise<{ id: string }>
}



export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const params = await props.params;
  const id = params.id;

  let project: any = null;

  try {
    const { supabase } = await import('@/lib/supabase');
    const { data, error } = await supabase.from('projects').select('*').eq('id', id).single();
    if (data && !error) {
      project = data;
    }
  } catch (error) {
    // suppress
  }

  if (!project) {
    return {
      title: 'Project Not Found | ReCognate',
    };
  }

  return {
    title: `${project.title} | ReCognate Projects`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
    },
  };
}

export default function Page() {
  return <ProjectDetailsClient />;
}
