import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { cn } from '../utilities/classNames';

/**
 * Reusable accessible Breadcrumbs component
 * @param {Array<{ label: string, to?: string }>} items
 */
export function Breadcrumbs({ items = [], className }) {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={cn('py-2', className)}>
      <ol className="flex items-center flex-wrap gap-1.5 text-xs text-[#667085]">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-1.5">
              {index > 0 && (
                <ChevronRight className="w-3 h-3 text-[#667085]/70 stroke-[2] flex-shrink-0" aria-hidden="true" />
              )}
              {isLast || !item.to ? (
                <span
                  className="font-semibold text-[#202938] truncate max-w-[200px] sm:max-w-none"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.to}
                  className="hover:text-[#2457A6] hover:underline transition-colors truncate max-w-[150px] sm:max-w-none"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
