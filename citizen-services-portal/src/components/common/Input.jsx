import React from 'react';
import { cn } from '../../utilities/classNames';

export function Input({
  label,
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  className,
  error,
  helperText,
  icon,
  ...props
}) {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={id} className="block text-sm font-semibold text-slate-800">
          {label}
        </label>
      )}
      <div className="relative rounded-lg shadow-2xs">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            {icon}
          </div>
        )}
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={cn(
            'block w-full rounded-lg border bg-white py-3 text-slate-900 placeholder:text-slate-400',
            'text-sm transition-colors duration-150 focus:border-[#1E40AF] focus:ring-2 focus:ring-[#1E40AF]/20 focus:outline-none min-h-[44px]',
            icon ? 'pl-10 pr-3.5' : 'px-3.5',
            error ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200' : 'border-slate-300',
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-rose-600 font-medium">{error}</p>}
      {helperText && !error && <p className="text-xs text-slate-500">{helperText}</p>}
    </div>
  );
}

export default Input;
