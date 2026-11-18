import React from 'react';
import { cn } from '../../utilities/classNames';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  type = 'button',
  icon,
  iconPosition = 'left',
  disabled = false,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed select-none cursor-pointer';

  const variants = {
    primary: 'bg-[#1E40AF] text-white hover:bg-[#1E3A8A] focus:ring-[#1E40AF] shadow-xs active:bg-[#172554]',
    teal: 'bg-[#0D9488] text-white hover:bg-[#0F766E] focus:ring-[#0D9488] shadow-xs active:bg-[#115E59]',
    secondary: 'bg-white text-slate-800 border border-slate-300 hover:bg-slate-50 hover:border-slate-400 focus:ring-slate-400 shadow-xs',
    subtle: 'bg-slate-100 text-slate-700 hover:bg-slate-200 focus:ring-slate-300',
    outlineTeal: 'bg-transparent text-[#0F766E] border border-[#0D9488] hover:bg-[#F0FDFA] focus:ring-[#0D9488]',
    ghost: 'bg-transparent text-slate-700 hover:bg-slate-100 focus:ring-slate-300',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 min-h-[36px] gap-1.5',
    md: 'text-sm px-4 py-2.5 min-h-[44px] gap-2', // Meets 44px touch target guidelines
    lg: 'text-base px-6 py-3.5 min-h-[50px] gap-2.5 font-semibold',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
    </button>
  );
}

export default Button;
