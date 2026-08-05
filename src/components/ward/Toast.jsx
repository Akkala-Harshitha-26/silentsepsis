import { useEffect } from 'react';
import { Check } from 'lucide-react';

export function Toast({ message, onDismiss }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 2600);
    return () => clearTimeout(t);
  }, [onDismiss]);

  return (
    <div
      role="status"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-ink-900 text-white text-[13px] px-3.5 py-2.5 rounded-lg shadow-lg animate-[toast-in_0.25s_cubic-bezier(0.16,1,0.3,1)]"
    >
      <Check size={14} className="text-status-stable" aria-hidden="true" />
      {message}
    </div>
  );
}
