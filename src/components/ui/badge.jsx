import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const badgeVariants = cva('inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold', {
  variants: {
    variant: {
      critical: 'bg-clinical-critical/10 text-clinical-critical dark:bg-clinical-critical/20',
      danger: 'bg-clinical-danger/10 text-clinical-danger dark:bg-clinical-danger/20',
      warning: 'bg-clinical-warning/20 text-[#8a5a00] dark:text-clinical-warning',
      success: 'bg-clinical-success/10 text-clinical-success dark:bg-clinical-success/20',
      neutral: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300',
    },
  },
  defaultVariants: { variant: 'neutral' },
});

export function Badge({ className, variant, ...props }) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
