import React from 'react';
import { cn } from '../../utilities/classNames';

export function Card({
  children,
  className,
  hoverable = false,
  as: Component = 'div',
  ...props
}) {
  return (
    <Component
      className={cn(
        'bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs transition-all duration-200',
        hoverable && 'hover:border-slate-300 hover:shadow-sm hover:translate-y-[-1px]',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

export function CardHeader({ children, className }) {
  return <div className={cn('pb-3 border-b border-slate-100 mb-3', className)}>{children}</div>;
}

export function CardTitle({ children, className }) {
  return <h3 className={cn('text-lg font-bold text-slate-900 tracking-tight', className)}>{children}</h3>;
}

export function CardDescription({ children, className }) {
  return <p className={cn('text-sm text-slate-600 leading-relaxed mt-1', className)}>{children}</p>;
}

export function CardContent({ children, className }) {
  return <div className={cn('space-y-3', className)}>{children}</div>;
}

export function CardFooter({ children, className }) {
  return <div className={cn('pt-3 border-t border-slate-100 mt-4 flex items-center justify-between', className)}>{children}</div>;
}

export default Card;
