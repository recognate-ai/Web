import { api } from '@/lib/services/api';
import CareersClient from './CareersClient';

export const revalidate = 60; // Enable ISR, revalidate every 60 seconds

export default async function CareersPage() {
  const jobs = await api.getJobs();

  return <CareersClient initialJobs={jobs || []} />;
}
