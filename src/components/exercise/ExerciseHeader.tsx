import React from 'react';
import { Exercise } from '../../types/exercise';
import { Badge } from '../common/Badge';
import { ChevronLeft, ChevronRight, CheckCircle2, Zap } from 'lucide-react';
import { Button } from '../common/Button';

export interface ExerciseHeaderProps {
  exercise: Exercise;
  isCompleted: boolean;
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
}

export const ExerciseHeader: React.FC<ExerciseHeaderProps> = ({
  exercise,
  isCompleted,
  onPrevious,
  onNext,
  hasPrevious,
  hasNext
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <Badge track={exercise.track} />
          <Badge difficulty={exercise.difficulty} />
          <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full">
            <Zap className="w-3 h-3 fill-current" />
            +{exercise.xp} XP
          </span>
          {isCompleted && (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Concluído
            </span>
          )}
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {exercise.order}. {exercise.title}
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Tópico: <span className="font-semibold text-slate-700 dark:text-slate-300">{exercise.topic}</span> • Nível {exercise.module.toUpperCase()}
        </p>
      </div>

      {/* Prev / Next Navigation */}
      <div className="flex items-center gap-2 self-end sm:self-center">
        <Button
          variant="outline"
          size="sm"
          onClick={onPrevious}
          disabled={!hasPrevious}
          leftIcon={<ChevronLeft className="w-4 h-4" />}
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onNext}
          disabled={!hasNext}
          rightIcon={<ChevronRight className="w-4 h-4" />}
        >
          Próximo
        </Button>
      </div>
    </div>
  );
};
