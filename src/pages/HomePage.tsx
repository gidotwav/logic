import React from 'react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { ProgressBar } from '../components/common/ProgressBar';
import { LevelCard } from '../components/gamification/LevelCard';
import { DailyChallengeCard } from '../components/gamification/DailyChallengeCard';
import { Code2, Database, ArrowRight, CheckCircle2, Zap, Flame, Trophy, Sparkles, BookOpen, Target } from 'lucide-react';
import { UserStats } from '../types/progress';
import { getRandomDailyExercise, getExercisesByTrack } from '../data/exercises';

export interface HomePageProps {
  stats: UserStats;
  streak: number;
  onNavigate: (route: string, exerciseId?: string) => void;
  isExerciseCompleted: (id: string) => boolean;
}

export const HomePage: React.FC<HomePageProps> = ({
  stats,
  streak,
  onNavigate,
  isExerciseCompleted
}) => {
  const dailyExercise = getRandomDailyExercise(stats.level);
  const isDailyCompleted = isExerciseCompleted(dailyExercise.id);

  const logicaTotal = stats.logicaTotalCount;
  const logicaDone = stats.logicaCompletedCount;
  const logicaPercent = logicaTotal > 0 ? Math.round((logicaDone / logicaTotal) * 100) : 0;

  const sqlTotal = stats.sqlTotalCount;
  const sqlDone = stats.sqlCompletedCount;
  const sqlPercent = sqlTotal > 0 ? Math.round((sqlDone / sqlTotal) * 100) : 0;

  const recentExercises = [
    ...getExercisesByTrack('logica').slice(0, 3),
    ...getExercisesByTrack('sql').slice(0, 3)
  ];

  return (
    <div className="space-y-8 animate-pop-in">
      {/* Hero Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-40 -top-10 w-48 h-48 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold text-emerald-300 border border-white/10 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Aprenda Lógica & SQL na Prática</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
            Domine Programação e Banco de Dados <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400">Escrevendo Código</span>.
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2.5 leading-relaxed">
            Nada de teoria interminável sem ação. Aprenda com exercícios interativos, feedback em tempo real, dicas inteligentes e bancos de dados simulados no seu navegador.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-5">
            <Button
              variant="brand"
              size="md"
              onClick={() => onNavigate('track-logica')}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="font-bold shadow-lg shadow-emerald-600/30"
            >
              Começar Lógica de Programação
            </Button>
            <Button
              variant="sql"
              size="md"
              onClick={() => onNavigate('track-sql')}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="font-bold shadow-lg shadow-sky-600/30"
            >
              Começar SQL
            </Button>
          </div>
        </div>

        <div className="relative z-10 w-full md:w-80 flex-shrink-0">
          <LevelCard totalXp={stats.totalXp} />
        </div>
      </div>

      {/* Daily Challenge Card */}
      <DailyChallengeCard
        exercise={dailyExercise}
        isCompleted={isDailyCompleted}
        onSolve={() => onNavigate('exercise', dailyExercise.id)}
      />

      {/* Main Two Tracks Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-500" />
              Escolha sua Trilha de Aprendizado
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Trilhas estruturadas do absoluto zero aos conceitos avançados com desafios progressivos.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Track 1: Lógica de Programação */}
          <Card className="p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden group" hover glow="brand">
            <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/5 rounded-full blur-2xl group-hover:scale-125 transition-transform" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-inner">
                  <Code2 className="w-7 h-7" />
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Progresso</span>
                  <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">{logicaPercent}%</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-1.5">
                <Badge variant="brand">Sintaxe Didática & Python</Badge>
                <span className="text-xs text-slate-500">3 Módulos</span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Aprender Lógica de Programação
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                Desenvolva o raciocínio algorítmico passo a passo: variáveis, estruturas condicionais (if/else), loops (for/while), listas, funções, dicionários, busca e recursão.
              </p>

              <div className="mt-5 space-y-2 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex justify-between font-semibold">
                  <span>Exercícios Concluídos:</span>
                  <span className="text-slate-900 dark:text-white font-bold">{logicaDone} de {logicaTotal}</span>
                </div>
                <ProgressBar value={logicaPercent} color="brand" showPercentage={false} size="sm" />
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Básico • Intermediário • Avançado</span>
              <Button
                variant="brand"
                size="sm"
                onClick={() => onNavigate('track-logica')}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="font-bold shadow-sm"
              >
                Acessar Trilha de Lógica
              </Button>
            </div>
          </Card>

          {/* Track 2: SQL & Banco de Dados */}
          <Card className="p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden group" hover glow="sql">
            <div className="absolute top-0 right-0 w-40 h-40 bg-sky-500/5 rounded-full blur-2xl group-hover:scale-125 transition-transform" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center shadow-inner">
                  <Database className="w-7 h-7" />
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Progresso</span>
                  <span className="text-xl font-black text-sky-600 dark:text-sky-400">{sqlPercent}%</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-1.5">
                <Badge variant="sql">SQLite Real no Navegador</Badge>
                <span className="text-xs text-slate-500">3 Módulos</span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Aprender SQL
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                Aprenda consultas relacionais praticando em 5 bancos reais fictícios: SELECT, WHERE, ORDER BY, funções agregadas (COUNT, SUM, AVG), GROUP BY, HAVING, JOINs, CTEs e Window Functions.
              </p>

              <div className="mt-5 space-y-2 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex justify-between font-semibold">
                  <span>Consultas Concluídas:</span>
                  <span className="text-slate-900 dark:text-white font-bold">{sqlDone} de {sqlTotal}</span>
                </div>
                <ProgressBar value={sqlPercent} color="sql" showPercentage={false} size="sm" />
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">5 Datasets Relacionais Fictícios</span>
              <Button
                variant="sql"
                size="sm"
                onClick={() => onNavigate('track-sql')}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="font-bold shadow-sm"
              >
                Acessar Trilha de SQL
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Quick Summary Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-4 text-center" hover>
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 mx-auto flex items-center justify-center mb-2">
            <Flame className="w-4 h-4 fill-current" />
          </div>
          <span className="text-2xl font-black text-slate-900 dark:text-white">{streak} dias</span>
          <span className="block text-[11px] font-semibold text-slate-400 mt-0.5">Sequência Atual</span>
        </Card>

        <Card className="p-4 text-center" hover>
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 mx-auto flex items-center justify-center mb-2">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <span className="text-2xl font-black text-slate-900 dark:text-white">{stats.exercisesCompletedCount}</span>
          <span className="block text-[11px] font-semibold text-slate-400 mt-0.5">Exercícios Feitos</span>
        </Card>

        <Card className="p-4 text-center" hover>
          <div className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-500 mx-auto flex items-center justify-center mb-2">
            <Zap className="w-4 h-4 fill-current" />
          </div>
          <span className="text-2xl font-black text-slate-900 dark:text-white">{stats.totalXp}</span>
          <span className="block text-[11px] font-semibold text-slate-400 mt-0.5">Pontos de XP</span>
        </Card>

        <Card className="p-4 text-center" hover>
          <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-500 mx-auto flex items-center justify-center mb-2">
            <Target className="w-4 h-4" />
          </div>
          <span className="text-2xl font-black text-slate-900 dark:text-white">{stats.correctPercentage}%</span>
          <span className="block text-[11px] font-semibold text-slate-400 mt-0.5">Taxa de Precisão</span>
        </Card>
      </div>

      {/* Quick Exercise Launcher */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Exercícios Recomendados para Praticar
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Exercícios interativos rápidos para treinar hoje.
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('practice')}
            className="text-xs"
          >
            Ver mais no Modo Prática
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {recentExercises.map((ex) => {
            const completed = isExerciseCompleted(ex.id);
            return (
              <button
                key={ex.id}
                onClick={() => onNavigate('exercise', ex.id)}
                className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 bg-slate-50/50 dark:bg-slate-800/30 hover:bg-white dark:hover:bg-slate-800 transition-all text-left flex items-start justify-between group"
              >
                <div>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Badge difficulty={ex.difficulty} size="sm" />
                    <span className="text-[10px] font-mono text-slate-400 uppercase">{ex.track}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors line-clamp-1">
                    {ex.order}. {ex.title}
                  </h4>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
                    {ex.topic}
                  </span>
                </div>
                {completed ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-1" />
                ) : (
                  <span className="text-xs font-bold text-amber-500 flex-shrink-0 mt-1">+{ex.xp} XP</span>
                )}
              </button>
            );
          })}
        </div>
      </Card>
    </div>
  );
};
