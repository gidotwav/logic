import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  glow?: 'none' | 'brand' | 'sql';
  glass?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  hover = false,
  glow = 'none',
  glass = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'rounded-2xl border transition-all duration-200';
  const themeStyles = glass 
    ? 'glass-card border-slate-200/80 dark:border-slate-800/80 shadow-sm'
    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800/80 shadow-sm';
  
  const hoverStyles = hover ? 'hover:shadow-lg hover:-translate-y-0.5 hover:border-slate-300 dark:hover:border-slate-700' : '';
  
  const glowStyles = {
    none: '',
    brand: 'glow-brand border-emerald-500/30 dark:border-emerald-500/30',
    sql: 'glow-sql border-sky-500/30 dark:border-sky-500/30'
  }[glow];

  return (
    <div className={`${baseStyles} ${themeStyles} ${hoverStyles} ${glowStyles} ${className}`} {...props}>
      {children}
    </div>
  );
};
