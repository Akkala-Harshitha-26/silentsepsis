export function downloadWardReport(patients) {
  const now = new Date();
  const lines = [
    'SilentSepsis — Ward Shift Report',
    `Generated: ${now.toLocaleString()}`,
    '='.repeat(50),
    '',
    ...patients
      .sort((a, b) => b.risk - a.risk)
      .map((p) =>
        [
          `${p.name}  ·  Room ${p.room}  ·  ${p.age}y`,
          `  Status: ${p.status.toUpperCase()}    Risk score: ${p.risk}    Certainty: ${p.certainty}%`,
          `  ${p.explanation}`,
          '',
        ].join('\n')
      ),
  ].join('\n');

  const blob = new Blob([lines], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `silentsepsis-ward-report-${now.toISOString().slice(0, 10)}.txt`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
