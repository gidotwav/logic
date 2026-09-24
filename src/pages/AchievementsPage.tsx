import React from 'react';
import { UserAchievement } from '../types/progress';
import { Card } from '../components/common/Card';
import { ProgressBar } from '../components/common/ProgressBar';
import { Trophy, CheckCircle2, Lock, Sparkles, Award } from 'lucide-react';

export interface AchievementsPageProps {
  achievements: Record<string, UserAchievement>;
}

export const AchievementsPage: React.FC<AchievementsPageProps> = ({ achievements }) => {
  const list = Object.values(achievements);
  const unlockedCount = list.filter(a => !!a.unlockedAt).length;
  const totalCount = list.length;
  const percent = totalCount > 0 ? Math.round((unlockedCount / totalCount) * 100) : 0;

  return (
    <div className="space-y-8 animate-pop-in">
      {/* Title Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 text-white border border-amber-500/30 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center text-2xl shadow-inner">
              <Trophy className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
                Mural de Honra
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-white">
                Conquistas & Troféus
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                Desbloqueie insígnias especiais conforme você resolve desafios, mantém sequências e domina novos tópicos.
              </p>
            </div>
          </div>

          <div className="bg-slate-900/80 p-4 rounded-2xl border border-amber-500/20 text-center w-full sm:w-48 flex-shrink-0">
            <span className="text-xs font-bold text-amber-400 uppercase block">Desbloqueadas</span>
            <span className="text-2xl font-black text-white">{unlockedCount} / {totalCount}</span>
            <span className="text-xs text-slate-400 block mt-0.5">({percent}%)</span>
          </div>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((ach) => {
          const isUnlocked = !!ach.unlockedAt;
          const progressPercent = Math.min(100, Math.round((ach.progress / ach.maxProgress) * 100));

          return (
            <Card
              key={ach.id}
              className={`p-5 flex flex-col justify-between transition-all ${
                isUnlocked 
                  ? 'bg-gradient-to-br from-white to-amber-50/20 dark:from-slate-900 dark:to-amber-950/20 border-amber-500/30 shadow-md'
                  : 'bg-white/60 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 opacity-80'
              }`}
              hover
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-inner border ${
                    isUnlocked 
                      ? 'bg-amber-500/20 text-amber-500 border-amber-500/30'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700'
                  }`}>
                    {isUnlocked ? <Award className="w-6 h-6 text-amber-500" /> : <Lock className="w-5 h-5 text-slate-400" />}
                  </div>

                  {isUnlocked ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Conquistado!
                    </span>
                  ) : (
                    <span className="text-[11px] font-bold text-slate-400">
                      {ach.progress} / {ach.maxProgress}
                    </span>
                  )}
                </div>

                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {ach.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  {ach.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                {isUnlocked ? (
                  <span className="text-[10px] text-slate-400 block font-medium">
                    Desbloqueado em: {new Date(ach.unlockedAt!).toLocaleDateString('pt-BR')}
                  </span>
                ) : (
                  <ProgressBar
                    value={progressPercent}
                    showPercentage={false}
                    color="amber"
                    size="sm"
                  />
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
