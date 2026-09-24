import React from 'react';
import { DifficultyLevel, TrackType } from '../../types/exercise';

export interface BadgeProps {
  difficulty?: DifficultyLevel;
  track?: TrackType;
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'brand' | 'sql';
  size?: 'sm' | 'md';
  children?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  difficulty,
  track,
  variant,
  size = 'sm',
  children,
  className = ''
}) => {
  const sizeStyles = size === 'sm' ? 'text-xs px-2.5 py-0.5' : 'text-sm px-3 py-1';

  // If difficulty is passed
  if (difficulty) {
    const diffConfig = {
      facil: { label: '🟢 Fácil', bg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' },
      medio: { label: '🟡 Médio', bg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20' },
      dificil: { label: '🔴 Difícil', bg: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20' }
    }[difficulty];

    return (
      <span className={`inline-flex items-center font-medium rounded-full border ${sizeStyles} ${diffConfig.bg} ${className}`}>
        {diffConfig.label}
      </span>
    );
  }

  // If track is passed
  if (track) {
    const trackConfig = {
      logica: { label: '🐍 Lógica & Python', bg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' },
      sql: { label: '🗄️ SQL & Banco de Dados', bg: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20' }
    }[track];

    return (
      <span className={`inline-flex items-center font-medium rounded-full border ${sizeStyles} ${trackConfig.bg} ${className}`}>
        {trackConfig.label}
      </span>
    );
  }

  // Generic variants
  const variantStyles = {
    success: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    danger: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
    info: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    neutral: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20',
    brand: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    sql: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20'
  }[variant || 'neutral'];

  return (
    <span className={`inline-flex items-center font-medium rounded-full border ${sizeStyles} ${variantStyles} ${className}`}>
      {children}
    </span>
  );
};
