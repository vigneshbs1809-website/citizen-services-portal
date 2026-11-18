import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, Check } from 'lucide-react';
import { cn } from '../utilities/classNames';

export function Dropdown({
  label,
  options = [],
  value,
  onChange,
  placeholder = 'Select an option...',
  icon,
  helperText,
  error,
  className,
  disabled = false,
  fullWidth = true,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (val) => {
    if (onChange) onChange(val);
    setIsOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className={cn('relative space-y-2', fullWidth ? 'w-full' : 'inline-block', className)}
    >
      {label && (
        <label className="block text-xs font-bold text-[#202938]">
          {label}
        </label>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={cn(
          'w-full flex items-center justify-between gap-2 px-3.5 py-2.5 bg-white border rounded-lg text-sm transition-all duration-150 min-h-[44px] cursor-pointer shadow-2xs',
          isOpen
            ? 'border-[#2457A6] ring-2 ring-[#2457A6]/20'
            : 'border-[#E5EAF0] hover:border-[#2457A6]/50',
          error && 'border-rose-400',
          disabled && 'bg-[#F7F9FC] text-[#667085] cursor-not-allowed'
        )}
      >
        <div className="flex items-center gap-2 truncate">
          {icon && <span className="text-[#667085] flex-shrink-0">{icon}</span>}
          <span className={selectedOption ? 'text-[#202938] font-medium' : 'text-[#667085]'}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>

        <ChevronRight
          className={cn(
            'w-4 h-4 text-[#667085] flex-shrink-0 transition-transform duration-200 stroke-[2]',
            isOpen ? 'rotate-90' : 'rotate-0'
          )}
        />
      </button>

      {/* Options Listbox */}
      {isOpen && (
        <div
          role="listbox"
          className="absolute z-50 w-full mt-1.5 bg-white border border-[#E5EAF0] rounded-xl shadow-md py-1 max-h-60 overflow-y-auto animate-in fade-in"
        >
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(option.value)}
                className={cn(
                  'w-full flex items-center justify-between px-3.5 py-2.5 text-xs text-left transition-colors cursor-pointer',
                  isSelected
                    ? 'bg-[#EEF3FA] text-[#2457A6] font-bold'
                    : 'text-[#202938] hover:bg-[#F7F9FC]'
                )}
              >
                <div className="flex flex-col">
                  <span>{option.label}</span>
                  {option.sublabel && (
                    <span className="text-[10px] text-[#667085]">{option.sublabel}</span>
                  )}
                </div>
                {isSelected && <Check className="w-4 h-4 text-[#2457A6] stroke-[2]" />}
              </button>
            );
          })}
        </div>
      )}

      {error && <p className="text-xs font-semibold text-rose-600">{error}</p>}
      {helperText && !error && <p className="text-xs text-[#667085]">{helperText}</p>}
    </div>
  );
}

export default Dropdown;
