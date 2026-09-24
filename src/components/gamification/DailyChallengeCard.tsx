import React from 'react';
import { Exercise } from '../../types/exercise';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Calendar, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';

export interface DailyChallengeCardProps {
  exercise: Exercise;
  isCompleted: boolean;
  onSolve: () => void;
}

export const DailyChallengeCard: React.FC<DailyChallengeCardProps> = ({
  exercise,
  isCompleted,
  onSolve
}) => {
  return (
    <Card className="p-6 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-emerald-500/10 border-amber-500/30 relative overflow-hidden" hover>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-500 text-white shadow-sm">
              <Calendar className="w-3.5 h-3.5" />
              Desafio do Dia
            </span>
            <Badge track={exercise.track} />
            <Badge difficulty={exercise.difficulty} />
            <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md">
              <Zap className="w-3 h-3 fill-current" />
              +{exercise.xp * 2} XP Bônus (2x)
            </span>
          </div>

          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            {exercise.title}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-xl line-clamp-2">
            {exercise.description}
          </p>
        </div>

        <div className="flex-shrink-0">
          {isCompleted ? (
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2.5 rounded-xl">
              <CheckCircle2 className="w-4 h-4" />
              Desafio de hoje concluído!
            </div>
          ) : (
            <Button
              variant="brand"
              onClick={onSolve}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="w-full sm:w-auto font-bold shadow-md"
            >
              Resolver Desafio Agora
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};
