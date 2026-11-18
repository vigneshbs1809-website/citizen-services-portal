import React from 'react';
import { cn } from '../../utilities/classNames';

export function PageContainer({ children, className, maxWidth = 'max-w-7xl' }) {
  return (
    <main className={cn('mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-1', maxWidth, className)}>
      {children}
    </main>
  );
}

export default PageContainer;
