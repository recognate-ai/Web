import { api } from '@/lib/services/api';
import ProjectsClient from './ProjectsClient';

export const revalidate = 60; // Enable ISR, revalidate every 60 seconds

export default async function ProjectsPage() {
  const projects = await api.getProjects();

  return <ProjectsClient initialProjects={projects || []} />;
}
