import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { AchievementNotification } from '../gamification/AchievementNotification';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Trophy, Sparkles } from 'lucide-react';
import { calculateUserLevel } from '../../data/levels';
import { fireLevelUpConfetti } from '../common/Confetti';

export interface LayoutProps {
  children: React.ReactNode;
  currentRoute: string;
  onNavigate: (route: string) => void;
  totalXp: number;
  streak: number;
  isDark: boolean;
  onToggleTheme: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  newAchievement: string | null;
  onClearAchievement: () => void;
  didLevelUp: boolean;
  onClearLevelUp: () => void;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  currentRoute,
  onNavigate,
  totalXp,
  streak,
  isDark,
  onToggleTheme,
  soundEnabled,
  onToggleSound,
  newAchievement,
  onClearAchievement,
  didLevelUp,
  onClearLevelUp
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const levelInfo = calculateUserLevel(totalXp);

  React.useEffect(() => {
    if (didLevelUp) {
      fireLevelUpConfetti();
    }
  }, [didLevelUp]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 flex">
      {/* Sidebar */}
      <Sidebar
        currentRoute={currentRoute}
        onNavigate={onNavigate}
        totalXp={totalXp}
        streak={streak}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        <Navbar
          onToggleSidebar={() => setSidebarOpen(true)}
          isDark={isDark}
          onToggleTheme={onToggleTheme}
          soundEnabled={soundEnabled}
          onToggleSound={onToggleSound}
          totalXp={totalXp}
          streak={streak}
          onNavigate={onNavigate}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* Floating Achievement Toast */}
      <AchievementNotification
        achievementTitle={newAchievement}
        onClose={onClearAchievement}
      />

      {/* Level Up Celebration Modal */}
      <Modal
        isOpen={didLevelUp}
        onClose={onClearLevelUp}
        title={
          <span className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
            <Sparkles className="w-5 h-5 text-amber-400" />
            Parabéns! Você Subiu de Nível!
          </span>
        }
        maxWidth="md"
      >
        <div className="text-center py-4 space-y-4">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 to-emerald-400 p-1 shadow-xl">
            <div className="w-full h-full bg-slate-900 rounded-[22px] flex items-center justify-center text-4xl">
              {levelInfo.badge}
            </div>
          </div>

          <div>
            <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">
              NOVO NÍVEL ALCANÇADO
            </span>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              Nível {levelInfo.level} — {levelInfo.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
              Sua dedicação em resolver exercícios práticos está dando frutos! Novos desafios e conquistas estão à sua espera.
            </p>
          </div>

          <div className="pt-2">
            <Button
              variant="brand"
              onClick={onClearLevelUp}
              className="w-full font-bold shadow-md"
            >
              Continuar Aprendendo 🚀
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
