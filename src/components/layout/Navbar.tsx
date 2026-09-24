import React from 'react';
import { Menu, Sun, Moon, Volume2, VolumeX, Flame, Zap, Trophy, ShieldCheck } from 'lucide-react';
import { calculateUserLevel } from '../../data/levels';

export interface NavbarProps {
  onToggleSidebar: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  totalXp: number;
  streak: number;
  onNavigate: (route: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onToggleSidebar,
  isDark,
  onToggleTheme,
  soundEnabled,
  onToggleSound,
  totalXp,
  streak,
  onNavigate
}) => {
  const levelInfo = calculateUserLevel(totalXp);

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/80 dark:bg-[#0B0F19]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/80 px-4 sm:px-6 flex items-center justify-between">
      {/* Left: Mobile Sidebar Trigger */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        <span className="hidden sm:inline-block text-xs font-semibold text-slate-500 dark:text-slate-400">
          Plataforma de Treinamento Interativo
        </span>
      </div>

      {/* Right: Gamification Badges & Action Toggles */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Streak Flame */}
        <button 
          onClick={() => onNavigate('progress')}
          title="Sequência de estudos"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-bold hover:bg-amber-500/20 transition-all"
        >
          <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
          <span>{streak}d</span>
        </button>

        {/* XP Badge */}
        <button 
          onClick={() => onNavigate('progress')}
          title="Pontos de experiência"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold hover:bg-emerald-500/20 transition-all"
        >
          <Zap className="w-4 h-4 fill-emerald-500 text-emerald-500" />
          <span>{totalXp} XP</span>
        </button>

        {/* Level Badge */}
        <button 
          onClick={() => onNavigate('progress')}
          title={`Nível ${levelInfo.level} - ${levelInfo.title}`}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 text-xs font-bold hover:bg-sky-500/20 transition-all"
        >
          <span>{levelInfo.badge}</span>
          <span>Nível {levelInfo.level}</span>
        </button>

        <div className="w-[1px] h-6 bg-slate-200 dark:bg-slate-800 mx-1" />

        {/* Sound Toggle */}
        <button
          onClick={onToggleSound}
          title={soundEnabled ? 'Desativar efeitos sonoros' : 'Ativar efeitos sonoros'}
          className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* Theme Toggle */}
        <button
          onClick={onToggleTheme}
          title={isDark ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
          className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
        </button>
      </div>
    </header>
  );
};
