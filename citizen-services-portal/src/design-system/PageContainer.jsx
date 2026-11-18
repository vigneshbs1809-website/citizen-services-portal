import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { cn } from '../utilities/classNames';

export function PageContainer({
  children,
  className,
  maxWidth = 'max-w-7xl',
  as: Component = 'main',
}) {
  return (
    <Component className={cn('mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-1', maxWidth, className)}>
      {children}
    </Component>
  );
}

export function PageHeader({
  title,
  subtitle,
  badge,
  backTo,
  backLabel = 'Back',
  actions,
  className,
}) {
  return (
    <div className={cn('space-y-4 border-b border-[#E5EAF0] pb-6 mb-8', className)}>
      {backTo && (
        <div>
          <Link
            to={backTo}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2457A6] hover:text-[#1D4788] transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform stroke-[2]" />
            <span>{backLabel}</span>
          </Link>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1.5">
          {badge && <div className="mb-1">{badge}</div>}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#202938] tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs sm:text-sm text-[#667085] max-w-3xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {actions && <div className="flex items-center gap-3 self-start sm:self-center">{actions}</div>}
      </div>
    </div>
  );
}

export default PageContainer;
