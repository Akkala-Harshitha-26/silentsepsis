import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './components/Layout';
import Login from './pages/Login';
import TriageView from './pages/TriageView';
import CommandDashboard from './pages/CommandDashboard';
import ClinicDashboard from './pages/ClinicDashboard';
import PatientsPage from './pages/PatientsPage';
import PriorityWatchlist from './pages/PriorityWatchlist';
import WardHeatmap from './pages/WardHeatmap';
import PatientTimeline from './pages/PatientTimeline';
import PhysicianDashboard from './pages/PhysicianDashboard';
import AdminDashboard from './pages/AdminDashboard';
import PatientDetail from './pages/PatientDetail';
import Alerts from './pages/Alerts';
import Analytics from './pages/Analytics';
import { useAppStore } from './store/useAppStore';
import './styles/tailwind-base.css';
import './styles/tokens.css';
import './styles/app.css';

const queryClient = new QueryClient();

export default function App() {
  const darkMode = useAppStore((s) => s.darkMode);

  // Centralized here rather than per-page, so every route — including
  // the login screen — reflects the same dark/light preference.
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* Triage view: watchlist + patient story, with full light/dark
              theming. Owns its own floating top bar, so it sits outside
              the legacy Layout. */}
          <Route path="/nurse" element={<ClinicDashboard />} />
          <Route path="/patients" element={<PatientsPage />} />
          <Route path="/watchlist" element={<PriorityWatchlist />} />
          <Route path="/heatmap" element={<WardHeatmap />} />
          <Route path="/timeline" element={<PatientTimeline />} />
          <Route element={<Layout />}>
            <Route path="/physician" element={<PhysicianDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/patient/:id" element={<PatientDetail />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/analytics" element={<Analytics />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
