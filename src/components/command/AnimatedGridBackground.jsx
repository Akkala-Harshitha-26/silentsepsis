export function AnimatedGridBackground() {
  return (
    <div
      className="fixed inset-0 opacity-[0.06] animate-grid-pan pointer-events-none"
      style={{
        backgroundImage:
          'linear-gradient(rgba(0,240,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.5) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }}
      aria-hidden="true"
    />
  );
}
