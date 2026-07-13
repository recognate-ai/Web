import { supabase } from '@/lib/supabase';
import AboutClient from './AboutClient';

export const revalidate = 60; // Enable ISR, revalidate every 60 seconds

export default async function AboutPage() {
  let initialTeam = [];
  try {
    const { data, error } = await supabase.from('team_members').select('*');
    if (data && !error) {
      initialTeam = data;
    }
  } catch (err) {
    console.error("Error fetching team on server:", err);
  }

  return <AboutClient initialTeam={initialTeam} />;
}
