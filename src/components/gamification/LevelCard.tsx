import React from 'react';
import { Card } from '../common/Card';
import { ProgressBar } from '../common/ProgressBar';
import { Sparkles, Trophy } from 'lucide-react';
import { calculateUserLevel, getLevelProgress } from '../../data/levels';

export interface LevelCardProps {
  totalXp: number;
}

export const LevelCard: React.FC<LevelCardProps> = ({ totalXp }) => {
  const levelInfo = calculateUserLevel(totalXp);
  const progress = getLevelProgress(totalXp);

  return (
    <Card className="p-5 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white border-emerald-500/30 shadow-lg relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl -mr-10 -mt-10" />

      <div className="relative z-10 flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-2xl shadow-inner">
            {levelInfo.badge}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Nível {levelInfo.level}
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.2 rounded-full font-bold">
                <Sparkles className="w-2.5 h-2.5" />
                {totalXp} XP Total
              </span>
            </div>
            <h3 className="text-lg font-extrabold text-white mt-0.5">
              {levelInfo.title}
            </h3>
          </div>
        </div>

        <div className="hidden sm:flex flex-col items-end text-xs text-slate-300 font-medium">
          <span>Próximo Nível: {levelInfo.maxXp} XP</span>
          <span className="text-emerald-400 font-bold text-sm">Faltam {levelInfo.maxXp - totalXp} XP</span>
        </div>
      </div>

      <div className="relative z-10">
        <ProgressBar
          value={progress.percentage}
          label={`Progresso para o Nível ${levelInfo.level + 1}`}
          color="gradient"
          size="md"
        />
      </div>
    </Card>
  );
};
