import React from 'react';
import { UserStats, UserProgressState } from '../types/progress';
import { Card } from '../components/common/Card';
import { StatCard } from '../components/common/StatCard';
import { ProgressBar } from '../components/common/ProgressBar';
import { LevelCard } from '../components/gamification/LevelCard';
import { 
  BarChart3, 
  Flame, 
  Zap, 
  CheckCircle2, 
  Clock, 
  Target, 
  Code2, 
  Database, 
  TrendingUp, 
  Sparkles,
  Calendar
} from 'lucide-react';
import { getExerciseById } from '../data/exercises';

export interface ProgressDashboardPageProps {
  stats: UserStats;
  state: UserProgressState;
  onSelectExercise: (exerciseId: string) => void;
}

export const ProgressDashboardPage: React.FC<ProgressDashboardPageProps> = ({
  stats,
  state,
  onSelectExercise
}) => {
  const logicaPercent = stats.logicaTotalCount > 0 ? Math.round((stats.logicaCompletedCount / stats.logicaTotalCount) * 100) : 0;
  const sqlPercent = stats.sqlTotalCount > 0 ? Math.round((stats.sqlCompletedCount / stats.sqlTotalCount) * 100) : 0;

  // Topic mastery calculation
  const completedList = Object.values(state.completedExercises);
  const topicCounts: Record<string, number> = {};
  completedList.forEach(item => {
    topicCounts[item.topic] = (topicCounts[item.topic] || 0) + 1;
  });

  const strongTopics = Object.entries(topicCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);

  return (
    <div className="space-y-8 animate-pop-in">
      {/* Title Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white border border-blue-500/30 shadow-xl relative overflow-hidden">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center text-2xl shadow-inner">
            <BarChart3 className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block mb-1">
              Métricas & Desempenho
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Painel de Progresso
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Acompanhe sua evolução em tempo real, taxa de acertos, tempo de dedicação e maestria em cada tópico.
            </p>
          </div>
        </div>
      </div>

      {/* Top 4 KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Pontos de XP"
          value={`${stats.totalXp} XP`}
          subtitle={`Nível ${stats.level} — ${stats.levelTitle}`}
          icon={<Zap className="w-6 h-6" />}
          variant="sky"
        />
        <StatCard
          title="Sequência de Estudos"
          value={`${state.streak.currentStreak} dias`}
          subtitle={`Recorde: ${state.streak.longestStreak} dias`}
          icon={<Flame className="w-6 h-6" />}
          variant="amber"
        />
        <StatCard
          title="Exercícios Resolvidos"
          value={stats.exercisesCompletedCount}
          subtitle={`Taxa de Acerto: ${stats.correctPercentage}%`}
          icon={<CheckCircle2 className="w-6 h-6" />}
          variant="emerald"
        />
        <StatCard
          title="Tempo Dedicado"
          value={`~${stats.studyTimeMinutes} min`}
          subtitle="Tempo estimado de prática"
          icon={<Clock className="w-6 h-6" />}
          variant="purple"
        />
      </div>

      {/* Level Card & Track Progress Side-by-Side */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5">
          <LevelCard totalXp={stats.totalXp} />
        </div>

        <div className="lg:col-span-7">
          <Card className="p-6 h-full flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-emerald-500" />
                Conclusão das Trilhas de Estudo
              </h3>

              <div className="space-y-6">
                {/* Lógica Track Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
                      <Code2 className="w-4 h-4 text-emerald-500" />
                      Trilha de Lógica de Programação
                    </span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                      {stats.logicaCompletedCount} / {stats.logicaTotalCount} ({logicaPercent}%)
                    </span>
                  </div>
                  <ProgressBar value={logicaPercent} color="brand" showPercentage={false} size="md" />
                </div>

                {/* SQL Track Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
                      <Database className="w-4 h-4 text-sky-500" />
                      Trilha de SQL & Banco de Dados
                    </span>
                    <span className="text-sky-600 dark:text-sky-400 font-bold">
                      {stats.sqlCompletedCount} / {stats.sqlTotalCount} ({sqlPercent}%)
                    </span>
                  </div>
                  <ProgressBar value={sqlPercent} color="sql" showPercentage={false} size="md" />
                </div>
              </div>
            </div>

            <div className="pt-4 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
              <span>Módulos: Básico, Intermediário e Avançado</span>
              <span className="font-bold text-slate-700 dark:text-slate-300">
                Total Geral: {stats.exercisesCompletedCount} de {stats.logicaTotalCount + stats.sqlTotalCount} exercícios
              </span>
            </div>
          </Card>
        </div>
      </div>

      {/* Topic Mastery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strong Topics */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-emerald-500" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Tópicos de Maior Domínio
            </h3>
          </div>

          {strongTopics.length === 0 ? (
            <p className="text-xs text-slate-500">Resolva exercícios para ver seus tópicos dominados aqui.</p>
          ) : (
            <div className="space-y-2.5">
              {strongTopics.map(([topic, count]) => (
                <div key={topic} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 text-xs">
                  <span className="font-bold text-slate-800 dark:text-slate-200">{topic}</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-md">
                    {count} concluídos
                  </span>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Activity Streak History */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-amber-500" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Histórico de Atividade (Dias Ativos)
            </h3>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 space-y-2">
            <div className="flex justify-between font-semibold">
              <span>Dias com atividade registrada:</span>
              <span className="font-bold text-slate-900 dark:text-white">{state.streak.historyDates.length} dias</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Maior sequência contínua:</span>
              <span className="font-bold text-amber-500">{state.streak.longestStreak} dias seguidos</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              Dica: Estudar pelo menos 1 exercício por dia é mais eficaz do que estudar horas acumuladas apenas no final de semana!
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};
