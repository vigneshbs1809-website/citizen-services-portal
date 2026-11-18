import React from 'react';
import { cn } from '../utilities/classNames';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  type = 'button',
  icon,
  iconPosition = 'left',
  disabled = false,
  fullWidth = false,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer';

  const variants = {
    // Primary: Royal Blue #2457A6
    primary: 'bg-[#2457A6] hover:bg-[#1D4788] active:bg-[#17376B] text-white focus:ring-[#2457A6] shadow-2xs border border-transparent',
    
    // Secondary: Teal #168C83
    secondary: 'bg-[#168C83] hover:bg-[#12726B] active:bg-[#0E5853] text-white focus:ring-[#168C83] shadow-2xs border border-transparent',
    
    // Tertiary: White background, subtle border #E5EAF0, charcoal text
    tertiary: 'bg-white hover:bg-[#F7F9FC] text-[#202938] hover:text-[#2457A6] border border-[#E5EAF0] hover:border-[#2457A6]/50 focus:ring-slate-300 shadow-2xs',
    
    // Subtle/Ghost: No background
    ghost: 'bg-transparent hover:bg-[#F7F9FC] text-[#667085] hover:text-[#202938] border border-transparent focus:ring-slate-200',
    
    // Audio / Voice button variant
    audio: 'bg-[#F0FAF9] hover:bg-teal-100/80 text-[#168C83] border border-teal-200/80 focus:ring-[#168C83]',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 min-h-[36px] gap-1.5',
    md: 'text-sm px-4 py-2.5 min-h-[44px] gap-2', // Meets 44px minimum touch target for accessibility
    lg: 'text-base px-6 py-3.5 min-h-[50px] gap-2.5',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
    </button>
  );
}

export default Button;
