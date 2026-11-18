import React from 'react';
import { cn } from '../utilities/classNames';

export function Heading1({ children, className, ...props }) {
  return (
    <h1
      className={cn(
        'text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#202938] tracking-tight leading-[1.2]',
        className
      )}
      {...props}
    >
      {children}
    </h1>
  );
}

export function Heading2({ children, className, ...props }) {
  return (
    <h2
      className={cn(
        'text-2xl sm:text-3xl font-extrabold text-[#202938] tracking-tight leading-snug',
        className
      )}
      {...props}
    >
      {children}
    </h2>
  );
}

export function Heading3({ children, className, ...props }) {
  return (
    <h3
      className={cn(
        'text-lg sm:text-xl font-bold text-[#202938] tracking-tight',
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

export function Subtitle({ children, className, ...props }) {
  return (
    <p
      className={cn(
        'text-base sm:text-lg text-[#667085] leading-relaxed',
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}

export function BodyText({ children, className, ...props }) {
  return (
    <p
      className={cn('text-sm text-[#202938] leading-relaxed', className)}
      {...props}
    >
      {children}
    </p>
  );
}

export function BodySecondary({ children, className, ...props }) {
  return (
    <p
      className={cn('text-xs sm:text-sm text-[#667085] leading-relaxed', className)}
      {...props}
    >
      {children}
    </p>
  );
}

export function Caption({ children, className, ...props }) {
  return (
    <span
      className={cn('text-xs text-[#667085] leading-normal', className)}
      {...props}
    >
      {children}
    </span>
  );
}

export function SectionLabel({ children, variant = 'primary', className, ...props }) {
  const variants = {
    primary: 'text-[#2457A6] bg-[#EEF3FA] border-blue-100',
    teal: 'text-[#168C83] bg-[#F0FAF9] border-teal-200/80',
    neutral: 'text-[#202938] bg-[#F7F9FC] border-[#E5EAF0]',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider border',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
