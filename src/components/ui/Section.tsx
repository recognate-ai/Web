import React, { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  spacing?: 'sm' | 'md' | 'lg' | 'none';
  as?: React.ElementType;
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, children, spacing = 'md', as = 'section', ...props }, ref) => {
    
    const spacings = {
      none: '',
      sm: 'py-12 md:py-16',
      md: 'py-20 md:py-32',
      lg: 'py-32 md:py-48'
    };

    const Component: any = as || 'section';

    return (
      <Component
        ref={ref}
        className={cn(
          "relative w-full",
          spacings[spacing],
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Section.displayName = 'Section';
