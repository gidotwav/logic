import React, { useState } from 'react';
import { Lightbulb, ChevronDown, ChevronUp, CheckCircle, Eye } from 'lucide-react';
import { Button } from '../common/Button';

export interface HintAccordionProps {
  hints: string[];
  onOpenSolution: () => void;
}

export const HintAccordion: React.FC<HintAccordionProps> = ({
  hints,
  onOpenSolution
}) => {
  const [unlockedHintIndex, setUnlockedHintIndex] = useState<number>(0);
  const [openIndices, setOpenIndices] = useState<Record<number, boolean>>({ 0: true });

  const toggleHint = (index: number) => {
    setOpenIndices(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const handleUnlockNext = () => {
    if (unlockedHintIndex < hints.length - 1) {
      const nextIdx = unlockedHintIndex + 1;
      setUnlockedHintIndex(nextIdx);
      setOpenIndices(prev => ({ ...prev, [nextIdx]: true }));
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
          <Lightbulb className="w-4 h-4 text-amber-500" />
          Sistema de Dicas Progressivas
        </h4>
        <span className="text-xs text-slate-400">
          {unlockedHintIndex + 1} de {hints.length} disponíveis
        </span>
      </div>

      {/* Hints List */}
      <div className="space-y-2">
        {hints.slice(0, unlockedHintIndex + 1).map((hint, idx) => {
          const isOpen = !!openIndices[idx];
          return (
            <div
              key={idx}
              className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleHint(idx)}
                className="w-full flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/60 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 transition-colors text-left"
              >
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-amber-500" />
                  Dica #{idx + 1}
                </span>
                {isOpen ? <ChevronUp className="w-3.5 h-3.5 text-slate-400" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-400" />}
              </button>
              {isOpen && (
                <div className="p-3 bg-amber-500/5 dark:bg-amber-500/5 text-xs text-slate-700 dark:text-slate-300 leading-relaxed border-t border-slate-200/60 dark:border-slate-800">
                  {hint}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
        {unlockedHintIndex < hints.length - 1 ? (
          <Button
            size="sm"
            variant="ghost"
            onClick={handleUnlockNext}
            className="text-xs text-amber-600 dark:text-amber-400"
          >
            💡 Ver Próxima Dica ({unlockedHintIndex + 2}/{hints.length})
          </Button>
        ) : (
          <span className="text-xs text-slate-400">Todas as dicas foram desbloqueadas.</span>
        )}

        <Button
          size="sm"
          variant="outline"
          onClick={onOpenSolution}
          leftIcon={<Eye className="w-3.5 h-3.5" />}
          className="text-xs font-semibold"
        >
          Ver Solução Explicada
        </Button>
      </div>
    </div>
  );
};
