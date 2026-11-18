import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { cn } from '../utilities/classNames';

export function DocumentChecklist({
  documents = [],
  title = 'Documents You Need',
  subtitle = 'Keep photocopies ready before visiting the Seva Kendra or applying online',
  interactive = false,
  className,
}) {
  const [checkedItems, setCheckedItems] = useState({});

  const toggleCheck = (idx) => {
    if (!interactive) return;
    setCheckedItems((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  if (!documents || documents.length === 0) return null;

  return (
    <div className={cn('bg-white rounded-xl border border-[#E5EAF0] p-6 shadow-2xs space-y-4', className)}>
      <div className="border-b border-[#E5EAF0] pb-3 space-y-1">
        <h4 className="text-base font-bold text-[#202938] flex items-center justify-between">
          <span>{title}</span>
          <span className="text-xs font-semibold text-[#168C83] bg-teal-50 border border-teal-200/80 px-2 py-0.5 rounded">
            {documents.length} Items
          </span>
        </h4>
        {subtitle && <p className="text-xs text-[#667085]">{subtitle}</p>}
      </div>

      <ul className="space-y-3">
        {documents.map((doc, idx) => {
          const isChecked = Boolean(checkedItems[idx]);

          return (
            <li
              key={idx}
              onClick={() => toggleCheck(idx)}
              className={cn(
                'flex items-start gap-3 p-3 rounded-lg border transition-colors',
                interactive ? 'cursor-pointer select-none' : '',
                isChecked
                  ? 'bg-[#F0FAF9] border-teal-200 text-[#0E5853]'
                  : 'bg-[#F7F9FC] border-[#E5EAF0] text-[#202938] hover:border-[#2457A6]/40'
              )}
            >
              <CheckCircle
                className={cn(
                  'w-4 h-4 flex-shrink-0 mt-0.5 stroke-[2]',
                  isChecked ? 'text-[#168C83]' : 'text-[#2457A6]'
                )}
              />

              <div className="flex-1 text-xs leading-relaxed font-medium">
                {doc}
              </div>

              {interactive && (
                <span
                  className={cn(
                    'text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded',
                    isChecked ? 'bg-teal-100 text-[#168C83]' : 'bg-[#E5EAF0] text-[#667085]'
                  )}
                >
                  {isChecked ? 'Ready' : 'Pending'}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export { DocumentPreparationChecklist } from '../components/documents/DocumentPreparationChecklist';
export default DocumentChecklist;
