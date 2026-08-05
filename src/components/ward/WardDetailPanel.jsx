import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Check, ArrowUpRight } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

const STATUS_TEXT = { critical: 'text-status-critical', warning: 'text-status-warning', stable: 'text-ink-500' };
const STATUS_LABEL = { critical: 'Critical', warning: 'Warning', stable: 'Stable' };

export function WardDetailPanel({ patient, onAcknowledge }) {
  const [tab, setTab] = useState('overview');
  const acknowledge = useAppStore((s) => s.acknowledge);

  if (!patient) {
    return <div className="flex-1 flex items-center justify-center text-[13px] text-ink-500">Select a patient</div>;
  }

  return (
    <div className="flex-1 min-w-0 overflow-y-auto">
      <div className="h-12 border-b border-ink-100 flex items-center justify-between px-5">
        <div className="flex items-center gap-2.5">
          <h1 className="text-[14px] font-medium text-ink-900">{patient.name}</h1>
          <span className="text-[12px] text-ink-500">{patient.room} · {patient.age}y</span>
        </div>
        <button
          onClick={() => { acknowledge(patient.id); onAcknowledge?.(patient); }}
          className="flex items-center gap-1.5 h-7 px-3 rounded-md bg-brand text-white text-[12.5px] font-medium hover:bg-brand-hover transition-colors"
        >
          <Check size={13} aria-hidden="true" /> Acknowledge
        </button>
      </div>

      <div className="flex gap-4 px-5 border-b border-ink-100">
        {['overview', 'vitals table'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`text-[12.5px] py-2.5 border-b-2 -mb-px transition-colors capitalize ${
              tab === t ? 'border-brand text-ink-900 font-medium' : 'border-transparent text-ink-500 hover:text-ink-900'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <div className="p-5">
          <div className="grid grid-cols-3 gap-4 mb-5">
            <div>
              <p className="text-[11px] text-ink-500 mb-1">Risk score</p>
              <p className={`text-[20px] font-mono font-medium ${STATUS_TEXT[patient.status]}`}>{patient.risk}</p>
            </div>
            <div>
              <p className="text-[11px] text-ink-500 mb-1">Status</p>
              <p className={`text-[13px] font-medium ${STATUS_TEXT[patient.status]}`}>{STATUS_LABEL[patient.status]}</p>
            </div>
            <div>
              <p className="text-[11px] text-ink-500 mb-1">Certainty</p>
              <p className="text-[13px] font-medium text-ink-900">{patient.certainty}%</p>
            </div>
          </div>

          <p className="text-[11px] font-medium text-ink-500 uppercase tracking-wide mb-2">Respiratory rate, trend</p>
          <div className="h-[180px] mb-5">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={patient.vitals}>
                <CartesianGrid stroke="#EDEEF2" vertical={false} />
                <XAxis dataKey="time" tick={{ fill: '#B4B7C2', fontSize: 11 }} axisLine={{ stroke: '#EDEEF2' }} tickLine={false} />
                <YAxis tick={{ fill: '#B4B7C2', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 6, border: '1px solid #EDEEF2' }} />
                <ReferenceLine y={patient.baseline.rr} stroke="#DDDFE5" strokeDasharray="3 3" />
                <Line type="monotone" dataKey="rr" stroke="#5E6AD2" strokeWidth={2} dot={{ r: 2.5 }} isAnimationActive animationDuration={700} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <p className="text-[11px] font-medium text-ink-500 uppercase tracking-wide mb-2">Why flagged</p>
          {patient.features.length === 0 ? (
            <p className="text-[12.5px] text-ink-500">No significant feature contributions.</p>
          ) : (
            <div className="space-y-2 mb-4">
              {patient.features.map((f) => (
                <div key={f.name} className="flex items-center gap-3">
                  <span className="text-[12px] text-ink-500 w-40 shrink-0">{f.name}</span>
                  <div className="flex-1 h-1.5 rounded-full bg-ink-100 overflow-hidden">
                    <div className="h-full rounded-full bg-brand" style={{ width: `${f.contribution}%` }} />
                  </div>
                  <span className="text-[12px] font-mono text-ink-900 w-8 text-right">{f.contribution}%</span>
                </div>
              ))}
            </div>
          )}
          <p className="text-[12.5px] text-ink-700 leading-relaxed">{patient.explanation}</p>

          <button className="flex items-center gap-1.5 mt-4 h-8 px-3 rounded-md border border-ink-200 text-ink-700 text-[12.5px] hover:border-ink-300 transition-colors">
            <ArrowUpRight size={13} aria-hidden="true" /> Escalate to physician
          </button>
        </div>
      )}

      {tab === 'vitals table' && (
        <div className="p-5">
          <table className="w-full text-[12.5px]">
            <thead>
              <tr className="border-b border-ink-100 text-ink-500">
                <th className="text-left font-medium py-2">Time</th>
                <th className="text-left font-medium py-2">HR</th>
                <th className="text-left font-medium py-2">RR</th>
              </tr>
            </thead>
            <tbody>
              {patient.vitals.map((v) => (
                <tr key={v.time} className="border-b border-ink-100">
                  <td className="py-2 font-mono text-ink-500">{v.time}</td>
                  <td className="py-2 font-mono text-ink-900">{v.hr} bpm</td>
                  <td className="py-2 font-mono text-ink-900">{v.rr} /min</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
