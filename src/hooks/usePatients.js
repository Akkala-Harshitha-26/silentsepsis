import { useQuery } from '@tanstack/react-query';
import { patients as mockPatients, wardSummary as mockWardSummary } from '../data/mockData';

// Simulates the real fetch: `GET /api/wards/:id/patients`. Swapping this
// body for an actual fetch() call is the only change needed once the
// FastAPI backend exists — components never touch mockData directly.
async function fetchPatients() {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return mockPatients;
}

async function fetchWardSummary() {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockWardSummary;
}

export function usePatients() {
  return useQuery({
    queryKey: ['patients', 'ward-4b'],
    queryFn: fetchPatients,
    staleTime: 30_000,
  });
}

export function useWardSummary() {
  return useQuery({
    queryKey: ['ward-summary', 'ward-4b'],
    queryFn: fetchWardSummary,
    staleTime: 30_000,
  });
}
