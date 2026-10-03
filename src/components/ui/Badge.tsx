import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'gold';
  className?: string;
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const variantStyles =
    variant === 'gold'
      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
      : 'bg-neutral-800/60 text-neutral-300 border border-neutral-700/50';

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium tracking-wide backdrop-blur-sm ${variantStyles} ${className}`}
    >
      {children}
    </span>
  );
}
