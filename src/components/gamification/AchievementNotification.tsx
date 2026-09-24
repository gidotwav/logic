import React, { useEffect } from 'react';
import { Trophy, Sparkles, X } from 'lucide-react';
import { fireSuccessConfetti } from '../common/Confetti';

export interface AchievementNotificationProps {
  achievementTitle: string | null;
  onClose: () => void;
}

export const AchievementNotification: React.FC<AchievementNotificationProps> = ({
  achievementTitle,
  onClose
}) => {
  useEffect(() => {
    if (achievementTitle) {
      fireSuccessConfetti();
      const timer = setTimeout(onClose, 6000);
      return () => clearTimeout(timer);
    }
  }, [achievementTitle, onClose]);

  if (!achievementTitle) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-pop-in">
      <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-500 text-white rounded-2xl shadow-2xl border border-white/20">
        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-xl flex-shrink-0 backdrop-blur-sm">
          <Trophy className="w-6 h-6 text-yellow-200 fill-yellow-200" />
        </div>
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-yellow-100 flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Nova Conquista Desbloqueada!
          </span>
          <h4 className="text-sm font-bold text-white mt-0.5">{achievementTitle}</h4>
        </div>
        <button
          onClick={onClose}
          className="p-1 text-white/80 hover:text-white rounded-lg hover:bg-white/10 ml-2"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
