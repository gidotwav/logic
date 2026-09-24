import React from 'react';
import { Flame } from 'lucide-react';

export interface StreakBadgeProps {
  currentStreak: number;
}

export const StreakBadge: React.FC<StreakBadgeProps> = ({ currentStreak }) => {
  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-bold shadow-sm">
      <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse-subtle" />
      <span>{currentStreak} {currentStreak === 1 ? 'dia de sequência' : 'dias de sequência'}</span>
    </div>
  );
};
