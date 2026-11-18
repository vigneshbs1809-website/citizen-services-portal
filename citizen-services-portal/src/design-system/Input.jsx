import React from 'react';
import { Search } from 'lucide-react';
import { cn } from '../utilities/classNames';
import { VoiceSearch } from '../components/voice/VoiceSearch';

export function Input({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  helperText,
  icon,
  iconPosition = 'left',
  className,
  required = false,
  disabled = false,
  ...props
}) {
  return (
    <div className="w-full space-y-2">
      {label && (
        <label htmlFor={id} className="block text-xs font-bold text-[#202938]">
          {label}
          {required && <span className="text-rose-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative rounded-lg shadow-2xs">
        {icon && iconPosition === 'left' && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#667085]">
            {icon}
          </div>
        )}

        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          className={cn(
            'w-full bg-[#FFFFFF] text-sm text-[#202938] placeholder:text-[#667085]/70 border rounded-lg min-h-[44px] transition-all duration-150',
            'focus:outline-none focus:border-[#2457A6] focus:ring-2 focus:ring-[#2457A6]/20',
            icon && iconPosition === 'left' ? 'pl-10 pr-3.5' : 'px-3.5',
            icon && iconPosition === 'right' ? 'pr-10 pl-3.5' : 'px-3.5',
            error ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200' : 'border-[#E5EAF0]',
            disabled && 'bg-[#F7F9FC] text-[#667085] cursor-not-allowed',
            className
          )}
          {...props}
        />

        {icon && iconPosition === 'right' && (
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-[#667085]">
            {icon}
          </div>
        )}
      </div>

      {error && <p className="text-xs font-semibold text-rose-600">{error}</p>}
      {helperText && !error && <p className="text-xs text-[#667085]">{helperText}</p>}
    </div>
  );
}

export function SearchInput({
  value,
  onChange,
  onSubmit,
  onVoiceTranscript,
  enableVoiceSearch = true,
  placeholder = 'Search for a government service...',
  buttonLabel = 'Search',
  className,
  ...props
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (onSubmit) onSubmit(e);
      }}
      className={cn('flex flex-col sm:flex-row items-stretch gap-2 w-full', className)}
    >
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#667085]">
          <Search className="w-4 h-4 stroke-[2]" />
        </div>
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={cn(
            'w-full pl-10 py-3 bg-[#FFFFFF] border border-[#E5EAF0] rounded-lg text-sm text-[#202938] placeholder:text-[#667085] min-h-[44px] focus:outline-none focus:border-[#2457A6] focus:ring-2 focus:ring-[#2457A6]/20 transition-all shadow-2xs',
            enableVoiceSearch ? 'pr-12' : 'pr-4'
          )}
          {...props}
        />
        {enableVoiceSearch && (
          <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
            <VoiceSearch
              size="sm"
              onTranscript={(text) => {
                if (onVoiceTranscript) onVoiceTranscript(text);
                else if (onChange) onChange({ target: { value: text } });
              }}
            />
          </div>
        )}
      </div>

      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#2457A6] hover:bg-[#1D4788] text-white text-sm font-semibold transition-colors cursor-pointer min-h-[44px] shadow-2xs"
      >
        <span>{buttonLabel}</span>
      </button>
    </form>
  );
}

export default Input;
