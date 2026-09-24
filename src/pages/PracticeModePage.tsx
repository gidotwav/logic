import React, { useState } from 'react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { TrackType, DifficultyLevel, Exercise } from '../types/exercise';
import { filterPracticeExercises, getAllTopics } from '../data/exercises';
import { Dumbbell, Sparkles, Play, Sliders, CheckCircle2, ArrowRight } from 'lucide-react';

export interface PracticeModePageProps {
  onSelectExercise: (exerciseId: string) => void;
  isExerciseCompleted: (exerciseId: string) => boolean;
}

export const PracticeModePage: React.FC<PracticeModePageProps> = ({
  onSelectExercise,
  isExerciseCompleted
}) => {
  const [selectedTrack, setSelectedTrack] = useState<TrackType | 'todos'>('todos');
  const [selectedTopic, setSelectedTopic] = useState<string>('todos');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | 'todos'>('todos');
  const [exerciseCount, setExerciseCount] = useState<number>(5);
  const [practiceSession, setPracticeSession] = useState<Exercise[] | null>(null);

  const topics = getAllTopics(selectedTrack === 'todos' ? undefined : selectedTrack);

  const handleGenerateSession = () => {
    const session = filterPracticeExercises(selectedTrack, selectedTopic, selectedDifficulty, exerciseCount);
    setPracticeSession(session);
  };

  return (
    <div className="space-y-8 animate-pop-in">
      {/* Page Title Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-indigo-500/30 shadow-xl relative overflow-hidden">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center text-2xl shadow-inner">
            <Dumbbell className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block mb-1">
              Treinamento Personalizado
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Modo Prática Livre
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Monte uma bateria personalizada de exercícios escolhendo a matéria, o assunto específico, a dificuldade e a quantidade desejada.
            </p>
          </div>
        </div>
      </div>

      {/* Configuration Filter Card */}
      <Card className="p-6 sm:p-7">
        <div className="flex items-center gap-2 mb-6 pb-3 border-b border-slate-100 dark:border-slate-800">
          <Sliders className="w-5 h-5 text-indigo-500" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Configurar Sessão de Prática
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Track Filter */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              1. Matéria
            </label>
            <div className="space-y-2">
              {[
                { id: 'todos', label: 'Todas as Matérias' },
                { id: 'logica', label: 'Lógica (Python)' },
                { id: 'sql', label: 'SQL (Banco de Dados)' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setSelectedTrack(opt.id as any);
                    setSelectedTopic('todos');
                  }}
                  className={`w-full p-2.5 rounded-xl text-xs font-semibold text-left border transition-all ${
                    selectedTrack === opt.id
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Filter */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              2. Dificuldade
            </label>
            <div className="space-y-2">
              {[
                { id: 'todos', label: 'Qualquer Dificuldade' },
                { id: 'facil', label: '🟢 Fácil (+10 XP)' },
                { id: 'medio', label: '🟡 Médio (+20 XP)' },
                { id: 'dificil', label: '🔴 Difícil (+40 XP)' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSelectedDifficulty(opt.id as any)}
                  className={`w-full p-2.5 rounded-xl text-xs font-semibold text-left border transition-all ${
                    selectedDifficulty === opt.id
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Topic Select */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              3. Assunto Específico
            </label>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full p-2.5 rounded-xl text-xs font-semibold bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="todos">Todos os Assuntos</option>
              {topics.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Count Select */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              4. Quantidade de Exercícios
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[5, 10, 20].map((num) => (
                <button
                  key={num}
                  onClick={() => setExerciseCount(num)}
                  className={`p-2.5 rounded-xl text-xs font-bold text-center border transition-all ${
                    exerciseCount === num
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>

            <div className="mt-4">
              <Button
                variant="brand"
                onClick={handleGenerateSession}
                leftIcon={<Sparkles className="w-4 h-4" />}
                className="w-full font-bold shadow-md"
              >
                Gerar Lista de Treino
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Generated Practice Session Cards */}
      {practiceSession && (
        <div className="space-y-4 animate-pop-in">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Sessão Gerada ({practiceSession.length} exercícios encontrados)
              </h3>
              <p className="text-xs text-slate-500">Clique em qualquer exercício para resolver e praticar.</p>
            </div>
          </div>

          {practiceSession.length === 0 ? (
            <Card className="p-8 text-center text-slate-500">
              <p className="text-sm font-semibold">Nenhum exercício encontrado com os filtros selecionados.</p>
              <p className="text-xs mt-1 text-slate-400">Tente selecionar "Todas as Matérias" ou "Qualquer Dificuldade".</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {practiceSession.map((ex, idx) => {
                const completed = isExerciseCompleted(ex.id);
                return (
                  <Card
                    key={ex.id}
                    hover
                    onClick={() => onSelectExercise(ex.id)}
                    className="p-5 cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-mono font-bold text-slate-400">#{idx + 1}</span>
                        <div className="flex items-center gap-1.5">
                          <Badge track={ex.track} size="sm" />
                          <Badge difficulty={ex.difficulty} size="sm" />
                        </div>
                      </div>

                      <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
                        {ex.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                        {ex.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                      {completed ? (
                        <span className="flex items-center gap-1 text-emerald-600 font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Resolvido
                        </span>
                      ) : (
                        <span className="text-amber-500 font-bold">+{ex.xp} XP</span>
                      )}

                      <span className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-semibold group">
                        Praticar <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
