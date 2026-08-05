import { useState } from 'react';
import Topbar from '../components/Topbar';
import PatientCard from '../components/PatientCard';
import CountUp from '../components/CountUp';
import RadialGauge from '../components/RadialGauge';
import WardScene from '../components/WardScene';
import { patients, wardSummary } from '../data/mockData';

export default function NurseDashboard() {
  const [filter, setFilter] = useState('all');

  const list = patients.filter((p) => {
    if (filter === 'alerts') return p.tier !== 'stable';
    return true;
  });

  return (
    <>
      <Topbar title={wardSummary.ward} subtitle={`${wardSummary.totalPatients} patients, shift 07:00–19:00`} alertCount={wardSummary.activeAlerts} />

      <div className="hero-banner">
        <div className="hero-banner-art"><WardScene /></div>
        <div className="hero-banner-overlay">
          <div className="hero-stat-row">
            <div className="hero-stat">
              <p className="hero-stat-label"><span className="dot dot-critical dot-pulse"></span>Active alerts</p>
              <p className="hero-stat-value critical"><CountUp value={wardSummary.activeAlerts} /></p>
            </div>
            <div className="hero-stat">
              <p className="hero-stat-label">Trending up</p>
              <p className="hero-stat-value watch"><CountUp value={wardSummary.trendingUp} /></p>
            </div>
            <div className="hero-stat">
              <p className="hero-stat-label">Stable</p>
              <p className="hero-stat-value stable"><CountUp value={wardSummary.stable} /></p>
            </div>
            <div className="hero-stat">
              <p className="hero-stat-label">Avg confirm</p>
              <p className="hero-stat-value"><CountUp value={wardSummary.avgConfirmMinutes} /><span className="stat-unit">min</span></p>
            </div>
          </div>
          <div className="hero-gauge"><RadialGauge value={wardSummary.riskLoad} label="ward risk load" tone="watch" /></div>
        </div>
      </div>

      <div className="flex justify-between items-center" style={{ marginBottom: 14, marginTop: 24 }}>
        <div className="pill-row">
          <button className={`pill ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All patients</button>
          <button className={`pill ${filter === 'alerts' ? 'active' : ''}`} onClick={() => setFilter('alerts')}>Alerts only</button>
        </div>
        <button className="btn sm">
          <i className="ti ti-plus" aria-hidden="true"></i> Add vitals
        </button>
      </div>

      <div className="patient-grid">
        {list
          .sort((a, b) => b.risk - a.risk)
          .map((p, i) => (
            <PatientCard key={p.id} patient={p} delay={i * 0.05} />
          ))}
      </div>
    </>
  );
}
