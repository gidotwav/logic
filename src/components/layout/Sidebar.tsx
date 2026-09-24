import React from 'react';
import { 
  Home, 
  Code2, 
  Database, 
  Dumbbell, 
  Calendar, 
  RotateCcw, 
  BarChart3, 
  Trophy, 
  Terminal, 
  Settings, 
  Zap, 
  Flame,
  Layers,
  ChevronRight
} from 'lucide-react';
import { calculateUserLevel } from '../../data/levels';

export interface SidebarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  totalXp: number;
  streak: number;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentRoute,
  onNavigate,
  totalXp,
  streak,
  isOpen,
  onClose
}) => {
  const levelInfo = calculateUserLevel(totalXp);

  const menuSections = [
    {
      title: 'PRINCIPAL',
      items: [
        { id: 'home', label: 'Início', icon: <Home className="w-4 h-4" /> }
      ]
    },
    {
      title: 'TRILHAS DE ESTUDO',
      items: [
        { id: 'track-logica', label: 'Lógica de Programação', icon: <Code2 className="w-4 h-4 text-emerald-500" />, badge: 'Python' },
        { id: 'track-sql', label: 'SQL & Banco de Dados', icon: <Database className="w-4 h-4 text-sky-500" />, badge: 'SQLite' }
      ]
    },
    {
      title: 'TREINAMENTO',
      items: [
        { id: 'practice', label: 'Modo Prática', icon: <Dumbbell className="w-4 h-4 text-amber-500" /> },
        { id: 'daily', label: 'Desafio do Dia', icon: <Calendar className="w-4 h-4 text-orange-500" />, badge: '2x XP' },
        { id: 'revision', label: 'Modo Revisão', icon: <RotateCcw className="w-4 h-4 text-rose-500" /> },
        { id: 'playground', label: 'Playground Sandbox', icon: <Terminal className="w-4 h-4 text-purple-500" /> }
      ]
    },
    {
      title: 'PERFORMANCE',
      items: [
        { id: 'progress', label: 'Meu Progresso', icon: <BarChart3 className="w-4 h-4 text-blue-500" /> },
        { id: 'achievements', label: 'Conquistas', icon: <Trophy className="w-4 h-4 text-yellow-500" /> },
        { id: 'settings', label: 'Configurações', icon: <Settings className="w-4 h-4 text-slate-400" /> }
      ]
    }
  ];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    onClose();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/60 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed top-0 bottom-0 left-0 z-40 w-64 bg-white dark:bg-[#0B0F19] border-r border-slate-200 dark:border-slate-800/80 
        flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Brand Logo Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <button 
            onClick={() => handleItemClick('home')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white flex items-center gap-1">
                CodeLogic <span className="text-sky-500 font-black">& SQL</span>
              </span>
              <span className="block text-[10px] font-semibold text-slate-400 tracking-wider uppercase">
                Aprenda Praticando
              </span>
            </div>
          </button>
        </div>

        {/* Navigation Items List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {menuSections.map((sec, sIdx) => (
            <div key={sIdx}>
              <span className="px-3 text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                {sec.title}
              </span>
              <div className="mt-2 space-y-1">
                {sec.items.map((item) => {
                  const isActive = currentRoute === item.id || (item.id === 'track-logica' && currentRoute.startsWith('track-logica')) || (item.id === 'track-sql' && currentRoute.startsWith('track-sql'));
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleItemClick(item.id)}
                      className={`
                        w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all group
                        ${isActive
                          ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                        }
                      `}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={`transition-transform group-hover:scale-110 ${isActive ? 'text-emerald-600 dark:text-emerald-400' : ''}`}>
                          {item.icon}
                        </span>
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200/80 dark:border-slate-700">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* User Mini Profile Footer */}
        <div className="p-3 m-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xl">{levelInfo.badge}</span>
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block leading-tight">
                  Nível {levelInfo.level}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate max-w-[110px]">
                  {levelInfo.title}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-lg border border-amber-500/20">
              <Flame className="w-3.5 h-3.5 fill-current" />
              <span>{streak}d</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200/60 dark:border-slate-800">
            <span className="flex items-center gap-1">
              <Zap className="w-3 h-3 text-emerald-500 fill-current" />
              {totalXp} XP
            </span>
            <button 
              onClick={() => handleItemClick('progress')}
              className="text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-0.5"
            >
              Ver perfil <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
