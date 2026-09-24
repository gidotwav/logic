import React from 'react';
import { Exercise } from '../types/exercise';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Calendar, Zap, CheckCircle2, ArrowRight, Flame, Trophy, Sparkles } from 'lucide-react';
import { getRandomDailyExercise } from '../data/exercises';

export interface DailyChallengePageProps {
  level: number;
  streak: number;
  isExerciseCompleted: (exerciseId: string) => boolean;
  onSolve: (exerciseId: string) => void;
}

export const DailyChallengePage: React.FC<DailyChallengePageProps> = ({
  level,
  streak,
  isExerciseCompleted,
  onSolve
}) => {
  const dailyExercise = getRandomDailyExercise(level);
  const isCompleted = isExerciseCompleted(dailyExercise.id);

  const today = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="space-y-8 animate-pop-in max-w-4xl mx-auto">
      {/* Title Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 text-white border border-amber-500/30 shadow-xl relative overflow-hidden">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center text-2xl shadow-inner">
            <Calendar className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
              {today}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Desafio do Dia
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Resolva um problema diário para turbinar seu raciocínio, manter sua sequência de estudos e ganhar 2x mais XP.
            </p>
          </div>
        </div>
      </div>

      {/* Main Challenge Card */}
      <Card className="p-8 border-2 border-amber-500/30 bg-white dark:bg-slate-900 shadow-lg relative overflow-hidden">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-amber-500 text-white shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            Recompensa Dobrada (2x XP)
          </span>
          <Badge track={dailyExercise.track} />
          <Badge difficulty={dailyExercise.difficulty} />
          <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full">
            <Zap className="w-3.5 h-3.5 fill-current" />
            +{dailyExercise.xp * 2} XP
          </span>
        </div>

        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          {dailyExercise.title}
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Assunto: <span className="font-semibold text-slate-700 dark:text-slate-300">{dailyExercise.topic}</span>
        </p>

        <div className="my-6 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
          {dailyExercise.description}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
            <Flame className="w-4 h-4 text-amber-500 fill-current" />
            <span>Manter sequência atual de {streak} dias</span>
          </div>

          {isCompleted ? (
            <div className="flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-6 py-3 rounded-xl">
              <CheckCircle2 className="w-5 h-5" />
              Você já completou o desafio de hoje! Volte amanhã para um novo.
            </div>
          ) : (
            <Button
              variant="brand"
              size="lg"
              onClick={() => onSolve(dailyExercise.id)}
              rightIcon={<ArrowRight className="w-5 h-5" />}
              className="w-full sm:w-auto font-bold shadow-lg shadow-emerald-600/30"
            >
              Resolver Desafio Agora (Ganhar +{dailyExercise.xp * 2} XP)
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};
