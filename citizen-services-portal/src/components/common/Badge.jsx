import React from 'react';
import { cn } from '../../utilities/classNames';

export function Badge({
  children,
  variant = 'neutral',
  className,
  icon,
}) {
  const variants = {
    neutral: 'bg-slate-100 text-slate-700 border-slate-200',
    primary: 'bg-blue-50 text-[#1E40AF] border-blue-200',
    teal: 'bg-teal-50 text-[#0F766E] border-teal-200',
    success: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold tracking-wide border',
        variants[variant],
        className
      )}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}

export default Badge;
