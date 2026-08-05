import { commandPatients } from './commandPatients';

function floorOf(room) {
  return room[0]; // '304B' -> floor '3'
}

// Build believable floor plans: the rooms our real patients occupy, plus
// enough surrounding rooms (marked unoccupied) that the heatmap doesn't
// look like a grid built to fit exactly 6 patients.
function buildFloor(floorDigit, roomLetters, extraCount) {
  const real = commandPatients.filter((p) => floorOf(p.room) === floorDigit);
  const usedNumbers = new Set(real.map((p) => p.room.slice(0, -1)));
  const rooms = real.map((p) => ({ room: p.room, patient: p }));

  let n = Number(`${floorDigit}01`);
  let added = 0;
  while (added < extraCount) {
    const candidate = `${n}`;
    if (!usedNumbers.has(candidate)) {
      roomLetters.forEach((letter) => {
        if (added < extraCount) {
          rooms.push({ room: `${candidate}${letter}`, patient: null });
          added++;
        }
      });
    }
    n++;
  }
  return rooms.sort((a, b) => a.room.localeCompare(b.room));
}

export const wardFloors = [
  { id: '1', label: 'Floor 1 — General', rooms: buildFloor('1', ['A', 'B'], 10) },
  { id: '2', label: 'Floor 2 — Ward 2A', rooms: buildFloor('2', ['A', 'B'], 8) },
  { id: '3', label: 'Floor 3 — Ward 4B', rooms: buildFloor('3', ['A', 'B'], 8) },
  { id: '4', label: 'Floor 4 — Ward 1C', rooms: buildFloor('4', ['A', 'B'], 8) },
];
