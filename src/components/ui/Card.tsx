import React, { forwardRef } from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverEffect?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, hoverEffect = false, className = '', ...props }, ref) => {
    const hoverStyles = hoverEffect
      ? 'transition-all duration-300 hover:border-amber-500/30 hover:shadow-[0_0_30px_-5px_rgba(245,158,11,0.1)] hover:-translate-y-0.5'
      : '';

    return (
      <div
        ref={ref}
        className={`bg-neutral-900/80 backdrop-blur-md border border-neutral-800/80 rounded-2xl p-6 shadow-xl ${hoverStyles} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';
