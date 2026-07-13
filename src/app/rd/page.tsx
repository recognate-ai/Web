import { api } from '@/lib/services/api';
import RDClient from './RDClient';

export const revalidate = 60; // Enable ISR, revalidate every 60 seconds

export default async function RDPage() {
  const researchAreas = await api.getResearchPrototypes();

  return <RDClient initialResearchAreas={researchAreas || []} />;
}
