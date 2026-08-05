export function SkeletonCard() {
  const shimmer = 'bg-[linear-gradient(90deg,rgba(255,255,255,0.04)_25%,rgba(255,255,255,0.09)_50%,rgba(255,255,255,0.04)_75%)] bg-[length:400px_100%] animate-shimmer rounded';
  return (
    <div className="rounded-xl p-4 border border-white/5 bg-command-primary/40">
      <div className="flex justify-between mb-3">
        <div className="space-y-2">
          <div className={`h-3 w-24 ${shimmer}`} />
          <div className={`h-2 w-16 ${shimmer}`} />
        </div>
        <div className={`h-3 w-12 ${shimmer}`} />
      </div>
      <div className={`h-6 w-full ${shimmer} mb-3`} />
      <div className={`h-4 w-full ${shimmer}`} />
    </div>
  );
}
