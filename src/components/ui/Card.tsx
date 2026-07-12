import React, { forwardRef, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

// Combining standard props with motion props
export type CardProps = HTMLAttributes<HTMLDivElement> & HTMLMotionProps<"div">;

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "glass-card p-6 md:p-8 rounded-2xl border border-white/10 shadow-lg relative overflow-hidden group hover:border-white/20 transition-all",
          className
        )}
        {...props}
      >
        <div className="relative z-10">
          {children}
        </div>
      </motion.div>
    );
  }
);

Card.displayName = 'Card';
