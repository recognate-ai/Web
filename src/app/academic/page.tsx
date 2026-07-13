import { supabase } from '@/lib/supabase';
import AcademicClient from './AcademicClient';

export const revalidate = 60; // Enable ISR, revalidate every 60 seconds

export default async function AcademicProjectsPage() {
  let initialProjects = [];
  try {
    const { data, error } = await supabase.from('academic_projects').select('*');
    if (data && !error) {
      initialProjects = data;
    }
  } catch (err) {
    console.error("Error fetching academic projects on server:", err);
  }

  return <AcademicClient initialProjects={initialProjects} />;
}
