import React from 'react';
import { MistakeRecord } from '../types/progress';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { RotateCcw, AlertCircle, CheckCircle2, ArrowRight, BrainCircuit, Sparkles, BookOpen } from 'lucide-react';
import { getExerciseById } from '../data/exercises';

export interface RevisionModePageProps {
  mistakes: MistakeRecord[];
  onSelectExercise: (exerciseId: string) => void;
}

export const RevisionModePage: React.FC<RevisionModePageProps> = ({
  mistakes,
  onSelectExercise
}) => {
  const unresolvedMistakes = mistakes.filter(m => !m.resolved);
  const resolvedMistakes = mistakes.filter(m => m.resolved);

  // Group unresolved by topic
  const topicCounts: Record<string, number> = {};
  unresolvedMistakes.forEach(m => {
    topicCounts[m.topic] = (topicCounts[m.topic] || 0) + 1;
  });

  const weakTopics = Object.entries(topicCounts).sort((a, b) => b[1] - a[1]);

  return (
    <div className="space-y-8 animate-pop-in">
      {/* Page Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 text-white border border-rose-500/30 shadow-xl relative overflow-hidden">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center text-2xl shadow-inner">
            <RotateCcw className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block mb-1">
              Repetição Espaçada Inteligente
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Modo Revisão de Erros
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              O sistema armazena automaticamente os exercícios onde você encontrou dificuldades. Revisar erros é o método mais rápido para consolidar o aprendizado!
            </p>
          </div>
        </div>
      </div>

      {/* Weak Areas Summary Card */}
      {weakTopics.length > 0 && (
        <Card className="p-6 border-l-4 border-l-rose-500">
          <div className="flex items-center gap-2 mb-3">
            <BrainCircuit className="w-5 h-5 text-rose-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Tópicos que precisam da sua atenção:
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {weakTopics.map(([topic, count]) => (
              <span
                key={topic}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 text-xs font-bold"
              >
                <span>{topic}</span>
                <span className="bg-rose-500 text-white text-[10px] px-1.5 py-0.2 rounded-full font-extrabold">{count} erros</span>
              </span>
            ))}
          </div>
        </Card>
      )}

      {/* Unresolved Mistakes List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-500" />
            Exercícios Pendentes de Revisão ({unresolvedMistakes.length})
          </h3>
          {unresolvedMistakes.length > 0 && (
            <Button
              variant="brand"
              size="sm"
              onClick={() => onSelectExercise(unresolvedMistakes[0].exerciseId)}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Revisar Primeiro Erro
            </Button>
          )}
        </div>

        {unresolvedMistakes.length === 0 ? (
          <Card className="p-10 text-center text-slate-500 bg-white dark:bg-slate-900">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 mx-auto flex items-center justify-center mb-3">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">Nenhum erro pendente!</h4>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Você está mandando muito bem. Continue praticando novos módulos ou explore o Modo Prática.
            </p>
          </Card>
        ) : (
          <div className="space-y-3">
            {unresolvedMistakes.map((m, idx) => {
              const ex = getExerciseById(m.exerciseId);
              if (!ex) return null;
              return (
                <Card
                  key={idx}
                  hover
                  onClick={() => onSelectExercise(m.exerciseId)}
                  className="p-5 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-l-4 border-l-amber-500"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge track={ex.track} size="sm" />
                      <Badge difficulty={ex.difficulty} size="sm" />
                      <span className="text-xs font-semibold text-slate-500">Tópico: {ex.topic}</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {ex.order}. {ex.title}
                    </h4>
                    <p className="text-xs text-rose-500 dark:text-rose-400 mt-1 font-mono font-medium line-clamp-1">
                      Último erro: {m.errorMessage}
                    </p>
                  </div>

                  <Button
                    variant="brand"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectExercise(m.exerciseId);
                    }}
                    rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                    className="self-end sm:self-center font-bold text-xs"
                  >
                    Tentar Novamente
                  </Button>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Resolved Mistakes History */}
      {resolvedMistakes.length > 0 && (
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
          <h3 className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            Erros Superados e Resolvidos com Sucesso ({resolvedMistakes.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {resolvedMistakes.slice(0, 6).map((m, idx) => {
              const ex = getExerciseById(m.exerciseId);
              if (!ex) return null;
              return (
                <div key={idx} className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-xs">
                  <div className="flex items-center justify-between text-slate-400 text-[11px] mb-1">
                    <span>{ex.topic}</span>
                    <span className="text-emerald-500 font-bold">Resolvido ✅</span>
                  </div>
                  <h5 className="font-bold text-slate-800 dark:text-slate-200 line-clamp-1">{ex.title}</h5>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
