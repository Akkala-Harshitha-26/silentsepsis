import { useState, useRef } from 'react';
import { ZoomIn, ZoomOut, Search } from 'lucide-react';
import { ClinicSidebar } from '../components/clinic/ClinicSidebar';
import { ClinicTopbar } from '../components/clinic/ClinicTopbar';
import { PatientDetailDrawer } from '../components/clinic/PatientDetailDrawer';
import { wardFloors } from '../data/wardRooms';

const STATUS_COLOR = { critical: '#E0607E', warning: '#FDB022', stable: '#20C5A0', empty: '#DDE3E3' };
const STATUS_LABEL = { critical: 'Critical', warning: 'Watching', stable: 'Stable', empty: 'Unoccupied' };

function RoomTile({ entry, onSelect, dim }) {
  const status = entry.patient ? entry.patient.status : 'empty';
  const [hover, setHover] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <button
        onClick={() => entry.patient && onSelect(entry.patient.id)}
        disabled={!entry.patient}
        className={`h-16 w-full rounded-lg flex flex-col items-center justify-center text-white text-[11px] font-semibold transition-transform ${
          entry.patient ? 'cursor-pointer hover:scale-105' : 'cursor-default'
        } ${status === 'critical' ? 'animate-pulse' : ''}`}
        style={{ background: STATUS_COLOR[status], opacity: dim ? 0.25 : 1 }}
      >
        {entry.room}
      </button>

      {hover && entry.patient && !dim && (
        <div className="absolute z-20 top-full mt-1 left-1/2 -translate-x-1/2 w-48 rounded-xl bg-pastel-ink dark:bg-pastel-bgDark text-white p-3 shadow-xl pointer-events-none">
          <p className="text-[12px] font-semibold">{entry.patient.name}</p>
          <p className="text-[11px] opacity-70 mb-1.5">Risk {entry.patient.risk} · {STATUS_LABEL[status]}</p>
          <p className="text-[10.5px] opacity-80 leading-snug">{entry.patient.explanation}</p>
          <p className="text-[10px] opacity-60 mt-1.5">Last vitals {entry.patient.lastVitals}</p>
        </div>
      )}
    </div>
  );
}

export default function WardHeatmap() {
  const [floorId, setFloorId] = useState('3');
  const [zoom, setZoom] = useState(1);
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const dragState = useRef(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  const floor = wardFloors.find((f) => f.id === floorId);
  const allPatients = wardFloors.flatMap((f) => f.rooms.map((r) => r.patient).filter(Boolean));
  const selectedPatient = allPatients.find((p) => p.id === selectedId);

  function onMouseDown(e) {
    dragState.current = { startX: e.clientX - pan.x, startY: e.clientY - pan.y };
  }
  function onMouseMove(e) {
    if (!dragState.current) return;
    setPan({ x: e.clientX - dragState.current.startX, y: e.clientY - dragState.current.startY });
  }
  function onMouseUp() {
    dragState.current = null;
  }

  const counts = { critical: 0, warning: 0, stable: 0, empty: 0 };
  floor.rooms.forEach((r) => counts[r.patient ? r.patient.status : 'empty']++);

  return (
    <div className="min-h-screen bg-pastel-bg dark:bg-pastel-bgDark flex transition-colors">
      <ClinicSidebar />
      <div className="flex-1 min-w-0">
        <ClinicTopbar />
        <main className="px-6 pb-8 max-w-[1100px]">
          <div className="flex items-center justify-between mb-1">
            <h1 className="text-[19px] font-semibold text-pastel-ink dark:text-pastel-inkDark">Ward heatmap</h1>
          </div>
          <p className="text-[13px] text-pastel-sub dark:text-pastel-subDark mb-4">Live occupancy and risk across all floors.</p>

          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <div className="flex gap-1.5">
              {wardFloors.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFloorId(f.id)}
                  className={`px-3 py-1.5 rounded-full text-[12.5px] font-medium transition-colors ${
                    floorId === f.id ? 'bg-pastel-brand text-white' : 'bg-white dark:bg-pastel-cardDark text-pastel-sub dark:text-pastel-subDark border border-pastel-brandLight dark:border-pastel-borderDark'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 h-9 px-3 rounded-full bg-white dark:bg-pastel-cardDark border border-pastel-brandLight dark:border-pastel-borderDark w-52">
                <Search size={13} className="text-pastel-sub dark:text-pastel-subDark" aria-hidden="true" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Find room or patient…"
                  className="flex-1 bg-transparent text-[12.5px] text-pastel-ink dark:text-pastel-inkDark outline-none placeholder:text-pastel-sub/70"
                />
              </div>
              <button onClick={() => setZoom((z) => Math.max(0.6, z - 0.2))} className="h-9 w-9 rounded-full bg-white dark:bg-pastel-cardDark border border-pastel-brandLight dark:border-pastel-borderDark flex items-center justify-center text-pastel-sub dark:text-pastel-subDark" aria-label="Zoom out">
                <ZoomOut size={15} />
              </button>
              <button onClick={() => setZoom((z) => Math.min(1.8, z + 0.2))} className="h-9 w-9 rounded-full bg-white dark:bg-pastel-cardDark border border-pastel-brandLight dark:border-pastel-borderDark flex items-center justify-center text-pastel-sub dark:text-pastel-subDark" aria-label="Zoom in">
                <ZoomIn size={15} />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-4">
            {Object.entries(STATUS_LABEL).map(([key, label]) => (
              <span key={key} className="flex items-center gap-1.5 text-[11.5px] text-pastel-sub dark:text-pastel-subDark">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: STATUS_COLOR[key] }} aria-hidden="true" />
                {label} ({counts[key]})
              </span>
            ))}
          </div>

          <div
            className="rounded-2xl bg-white dark:bg-pastel-cardDark border border-pastel-brandLight dark:border-pastel-borderDark p-6 overflow-hidden cursor-grab active:cursor-grabbing select-none"
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
          >
            <div
              style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`, transformOrigin: 'top left', transition: dragState.current ? 'none' : 'transform 0.15s ease-out' }}
            >
              <div className="grid grid-cols-6 gap-3 w-[560px]">
                {floor.rooms.map((entry) => {
                  const dim = query && !(entry.room.toLowerCase().includes(query.toLowerCase()) || entry.patient?.name.toLowerCase().includes(query.toLowerCase()));
                  return <RoomTile key={entry.room} entry={entry} onSelect={setSelectedId} dim={dim} />;
                })}
              </div>
            </div>
          </div>
        </main>
      </div>
      {selectedPatient && <PatientDetailDrawer patient={selectedPatient} onClose={() => setSelectedId(null)} />}
    </div>
  );
}
