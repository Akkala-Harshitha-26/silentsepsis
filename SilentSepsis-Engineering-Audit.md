# SilentSepsis Frontend — Engineering Audit

*A note on scope before this starts: the original request asked for 30 diagrams, including database ER diagrams, Redis cache architecture, Celery task architecture, and Docker deployment diagrams. None of that infrastructure exists — this is a frontend-only React app with mock data and no backend. Drawing detailed diagrams for systems that don't exist would mean presenting fiction as documentation, which is the opposite of what an engineering audit is for. This document covers what's actually built, honestly, plus the diagrams that are true today (component/route/data-flow/user-journey), and is explicit about what would need to exist before any of the backend-side diagrams could be drawn truthfully.*

---

## PART 1 — Screen-by-screen audit

### 1. Login (`src/pages/Login.jsx`)
- **Purpose / user:** Entry point for all roles (nurse/physician/admin selector, not yet role-enforced).
- **UX decisions:** Split layout — illustration + problem statement on the left, form on the right. The illustration is a hand-built SVG (`DoctorIllustration.jsx`), not a stock photo, because the product's own design goal is offline-first; a hotlinked image would contradict that.
- **State:** Local `signingIn` boolean only. No real auth — `handleSignIn` is a `setTimeout` then `navigate('/nurse')`.
- **Production-ready:** Visual layer only. **Mock:** there is no authentication. Any string in the Staff ID field logs in.

### 2. Clinic Dashboard (`src/pages/ClinicDashboard.jsx`) — route `/nurse`
- **Purpose / user:** Primary nurse landing screen — ward-level overview.
- **Layout:** Sidebar + topbar + 3-row content grid (ring stat card, patient list, upcoming rounds, 2 charts).
- **Components used:** `ClinicSidebar`, `ClinicTopbar`, `RingStatCard`, `CountCard`, `PatientTodayList`, `UpcomingRoundsCard`, `AnalyticsCard`, `WardCompositionCard`, `PatientDetailDrawer`, `ChatWidget`.
- **State:** `selectedId` (local) drives the detail drawer. Patient list is `commandPatients` sorted by risk, computed on every render (not memoized — see Technical Debt).
- **Mock vs real:** Patient data, "upcoming rounds," and the analytics chart's monthly numbers are all static mock data. Clicking a patient, acknowledging, dismissing-with-reason, and adding vitals all write to real Zustand state and are genuinely interactive.

### 3. Patients (`src/pages/PatientsPage.jsx`) — route `/patients`
- **Purpose:** Full searchable roster, one level up from the dashboard's abbreviated list.
- **State:** Local `query` string, filters `commandPatients` by name/room substring match.
- **Note:** Clicking a row currently navigates to `/nurse` rather than opening the drawer in place — listed under Technical Debt below.

### 4. Priority Watchlist (`src/pages/PriorityWatchlist.jsx`) — route `/watchlist`
- **Purpose:** Answers "who's most likely to deteriorate in the next 6 hours," not just "who's highest risk right now."
- **Logic (`src/lib/priorityScore.js`):** a documented weighted heuristic — 40% current risk, 30% trend acceleration (second derivative of respiratory rate over the last 3 readings), 15% model certainty, 15% staleness (time since last observation). This is real arithmetic over real fields on the patient object, not a random shuffle and not a trained model — that distinction matters and should be stated exactly this way in a viva.
- **Mock vs real:** The scoring math is genuinely computed at render time via `useMemo`. The underlying vitals it's computed from are still static mock data.

### 5. Ward Heatmap (`src/pages/WardHeatmap.jsx`) — route `/heatmap`
- **Purpose:** Spatial ward overview — "what does the floor look like right now."
- **Features:** floor switcher, zoom (state-driven CSS scale), pan (manual mousedown/mousemove drag, no library), search-driven dimming of non-matches, hover tooltips, legend with live counts, pulse animation restricted to critical rooms only.
- **Data (`src/data/wardRooms.js`):** occupied rooms are derived from the real `commandPatients` array; unoccupied rooms are generated programmatically around them so the floor doesn't look built to fit exactly 6 patients.
- **Accessibility gap:** the drag-to-pan interaction has no keyboard equivalent — listed below.

### 6. Patient Timeline (`src/pages/PatientTimeline.jsx`) — route `/timeline`
- **Purpose:** Chronological patient story instead of an isolated vitals table.
- **Data sources (`src/lib/buildTimeline.js`), all real:** vitals readings from `patient.vitals`, the model's own annotation (`patient.annotation`), and the store's live `auditLog` (acknowledge / dismiss+reason / manual vitals / escalate). No event on this timeline is scripted fiction — an "Escalate" click genuinely appends an audit entry visible immediately; nothing like "doctor notified" or "antibiotics administered" is pre-filled, because neither of those actions exists anywhere else in the app yet.
- **Features:** type filter, keyword search, expandable event detail, staggered Framer Motion entrance.

### 7. Physician / Admin / Alerts / Analytics / Patient Detail (`src/pages/PhysicianDashboard.jsx`, `AdminDashboard.jsx`, `Alerts.jsx`, `Analytics.jsx`, `PatientDetail.jsx`)
- **Status: visually stale.** These five pages were built during an earlier design pass (the light "instrument panel" theme) and were never migrated to the pastel/teal system the rest of the app now uses. They still route and render, but will look like a different product next to the dashboard, watchlist, heatmap, and timeline. This is the single biggest visual inconsistency in the app right now.

---

## PART 2 — Real diagrams (the ones that are actually true)

### Component hierarchy (dashboard route)
```
ClinicDashboard
├── ClinicSidebar (nav, active-route highlighting)
├── ClinicTopbar
│   ├── search input (local state, not wired to a query)
│   ├── dark-mode toggle (Zustand)
│   ├── download-report button → downloadWardReport()
│   └── NotificationBell (local open/read state)
├── RingStatCard × 1, CountCard × 2
├── PatientTodayList → PatientDetailDrawer (on select)
│                        ├── DismissReasonModal
│                        └── VitalsEntryForm
├── UpcomingRoundsCard (fully static)
├── AnalyticsCard, WardCompositionCard (Recharts)
└── ChatWidget (deterministic patient-data lookup, not an LLM)
```

### Route hierarchy
```
/                → Login
/nurse           → ClinicDashboard
/patients        → PatientsPage
/watchlist       → PriorityWatchlist
/heatmap         → WardHeatmap
/timeline        → PatientTimeline
/physician       → PhysicianDashboard   (legacy theme)
/admin           → AdminDashboard        (legacy theme)
/patient/:id     → PatientDetail          (legacy theme)
/alerts          → Alerts                 (legacy theme)
/analytics       → Analytics              (legacy theme)
```

### State management flow
```
Zustand (useAppStore) — cross-page, persists for the session:
  darkMode, nightMode → toggled from topbar/login, read by every styled component
  acknowledgedIds, dismissedIds (Map: id → {reason, note, time})
  manualVitals (id → [{hr, rr, bp, spo2, temp, time}])
  auditLog (append-only array) → consumed live by PatientTimeline

React Query (usePatients, useWardSummary) — currently wraps mock fetches
  with an artificial delay. Structured so a real fetch() to a FastAPI
  endpoint is a one-line swap inside src/hooks/usePatients.js; no
  component would need to change.
```

### Nurse workflow (user journey, as actually built)
```
Login → Dashboard → see risk-sorted patient list
  → click patient → PatientDetailDrawer opens
     → Acknowledge (writes auditLog entry)
     → OR Dismiss → DismissReasonModal → pick reason + note → writes auditLog entry
     → OR Add vitals → VitalsEntryForm → writes manualVitals + auditLog entry
  → Patient Timeline (separate page) shows the same auditLog entries,
    chronologically, alongside the original vitals/annotation data
```

---

## PART 3 — Honest engineering audit

### Generic / AI-looking patterns that remain
- The five legacy pages (Physician/Admin/Alerts/Analytics/PatientDetail) still use the earlier flat "instrument panel" theme — visually inconsistent with everything else now.
- `PatientTodayList`'s "All patients →" link and `UpcomingRoundsCard`'s entire dataset are static — they don't respond to any state change.

### Missing accessibility
- Ward Heatmap's pan gesture is mouse-only; no keyboard or touch equivalent.
- No visible focus-trap in the three modals (`DismissReasonModal`, `VitalsEntryForm`, `PatientDetailDrawer`) — a keyboard user can currently tab behind them.
- No skip-to-content link on any page.

### Missing responsiveness
- `WardHeatmap`'s room grid is a fixed `w-[560px]` — doesn't reflow below that width; will overflow on tablet.
- `ClinicSidebar` is fixed at 236px with no collapsed/mobile state.

### Missing backend integration (the big one)
- **There is no backend.** Every "API call" is `usePatients()`/`useWardSummary()` resolving a hardcoded array after a `setTimeout`. No persistence — refreshing the page resets `auditLog`, `manualVitals`, `acknowledgedIds`, and `dismissedIds` to empty.
- No authentication, no authorization, no role enforcement (the login screen's role dropdown does nothing).
- No real AI model — `risk`, `certainty`, and `features` are authored numbers in `commandPatients.js`, not model output. The Priority Watchlist's *scoring formula* is real arithmetic, but the *inputs* to that arithmetic are still fictional data.

### What would prevent a real hospital from using this today
1. No backend, no database, no persistence of any clinical action.
2. No authentication or access control — anyone can act as any role.
3. No real ML model behind the risk scores — this is the entire premise of the product and doesn't exist yet.
4. No audit trail durability (logs live in browser memory only, gone on refresh) — a hospital's compliance requirements would reject this immediately.
5. No clinical validation of any kind, which the project's own original pitch document already and correctly acknowledges as required before real deployment.

None of this is a criticism of the frontend work specifically — a frontend can't fix the absence of a backend. It's the honest list of what Part 4 of a real deployment plan would need to cover.

---

## PART 4 — What was implemented this round

1. **Priority Watchlist** — real weighted scoring (`src/lib/priorityScore.js`), ranked list UI (`src/pages/PriorityWatchlist.jsx`).
2. **Ward Heatmap** — room data derivation (`src/data/wardRooms.js`), interactive floor plan (`src/pages/WardHeatmap.jsx`).
3. **Patient Timeline** — event builder from real data sources (`src/lib/buildTimeline.js`), chronological UI (`src/pages/PatientTimeline.jsx`).
4. Supporting store changes: `escalate()` action, so timeline escalation events are genuine rather than scripted.

Each shipped as its own commit — see `git log --oneline` in the source zip for the exact sequence and messages.

---

## What I'd do next, in priority order
1. Migrate the 5 legacy pages onto the current pastel/teal design system — the single biggest inconsistency left.
2. Add keyboard support to the heatmap pan and focus traps to the three modals.
3. Make `PatientsPage` open the drawer in place instead of navigating away.
4. Only after a real backend exists: swap `usePatients()`'s mock fetch for a real endpoint — no other component changes needed, by design.
