import React from 'react';
import { TrackType, ModuleLevel } from '../types/exercise';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { ProgressBar } from '../components/common/ProgressBar';
import { Code2, Database, Lock, Unlock, CheckCircle2, ArrowRight, Award, Sparkles } from 'lucide-react';
import { getExercisesByModule } from '../data/exercises';

export interface TrackPageProps {
  track: TrackType;
  onSelectExercise: (exerciseId: string) => void;
  isExerciseCompleted: (exerciseId: string) => boolean;
  isModuleUnlocked: (moduleKey: string) => boolean;
}

export const TrackPage: React.FC<TrackPageProps> = ({
  track,
  onSelectExercise,
  isExerciseCompleted,
  isModuleUnlocked
}) => {
  const isLogica = track === 'logica';

  const modules: { id: ModuleLevel; title: string; subtitle: string; description: string; capstone: string }[] = isLogica
    ? [
        {
          id: 'basico',
          title: 'Módulo 1: Fundamentos & Raciocínio Lógico',
          subtitle: 'Do zero até condicionais e repetições',
          description: 'Entrada/Saída de dados, variáveis, tipos primitivos, operadores matemáticos, condicionais (if/elif/else), contadores, acumuladores e laços while/for.',
          capstone: 'Projeto Capstone: Simulador de Caixa Eletrônico'
        },
        {
          id: 'intermediario',
          title: 'Módulo 2: Coleções, Funções & Algoritmos',
          subtitle: 'Estruturação e manipulação de dados',
          description: 'Listas, fatiamento (slicing), funções reutilizáveis com parâmetros e retorno, dicionários (chave/valor), busca linear e validação de dados.',
          capstone: 'Projeto Capstone: Sistema de Gestão de Notas'
        },
        {
          id: 'avancado',
          title: 'Módulo 3: Complexidade & Algoritmos Avançados',
          subtitle: 'Eficiência, estruturas e entrevistas técnicas',
          description: 'Noção intuitiva de complexidade algorítmica Big O, recursão matemática, algoritmos de busca binária O(log N) e ordenação por comparação (Bubble Sort).',
          capstone: 'Projeto Capstone: Otimizador de Desempenho e Algoritmos'
        }
      ]
    : [
        {
          id: 'basico',
          title: 'Módulo 1: Fundamentos do SQL & Consultas Básicas',
          subtitle: 'Extração e filtros fundamentais',
          description: 'Tabelas relacionais, SELECT, WHERE com operadores relacionais e lógicos (AND, OR, NOT), ordenação com ORDER BY, LIMIT e funções agregadas (COUNT, SUM, AVG).',
          capstone: 'Projeto Capstone: Relatório Comercial de E-commerce'
        },
        {
          id: 'intermediario',
          title: 'Módulo 2: Agrupamentos, Junções & Condicionais',
          subtitle: 'Conectando múltiplas entidades relacionais',
          description: 'Agrupamentos com GROUP BY, filtros agregados com HAVING, junções essenciais (INNER JOIN, LEFT JOIN) e condicionais em SQL com CASE WHEN.',
          capstone: 'Projeto Capstone: Análise de Dados de Streaming Musical'
        },
        {
          id: 'avancado',
          title: 'Módulo 3: Window Functions & Queries Analíticas',
          subtitle: 'Engenharia de dados e análise avançada',
          description: 'Funções analíticas de janela (ROW_NUMBER, PARTITION BY, ORDER BY), Common Table Expressions modulares com a cláusula WITH (CTEs) e subqueries.',
          capstone: 'Projeto Capstone: Auditoria e Métricas de Rede Social'
        }
      ];

  return (
    <div className="space-y-8 animate-pop-in">
      {/* Header Banner */}
      <div className={`p-6 sm:p-8 rounded-3xl border shadow-xl relative overflow-hidden text-white ${
        isLogica 
          ? 'bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 border-emerald-500/30'
          : 'bg-gradient-to-r from-sky-950 via-slate-900 to-slate-900 border-sky-500/30'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-inner border ${
              isLogica ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-sky-500/20 text-sky-400 border-sky-500/30'
            }`}>
              {isLogica ? <Code2 className="w-9 h-9" /> : <Database className="w-9 h-9" />}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs font-bold uppercase tracking-wider ${isLogica ? 'text-emerald-400' : 'text-sky-400'}`}>
                  Trilha Interativa de Aprendizado
                </span>
                <span className="text-xs bg-white/10 px-2 py-0.2 rounded-full font-medium">3 Módulos</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white">
                {isLogica ? 'Lógica de Programação com Python' : 'SQL & Banco de Dados Relacional'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                {isLogica 
                  ? 'Aprenda a pensar como um programador resolvendo problemas práticos passo a passo com Python.'
                  : 'Aprenda consultas SQL na prática executando queries reais sobre datasets de e-commerce, universidade, streaming, empresa e rede social.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modules Roadmap */}
      <div className="space-y-6">
        {modules.map((mod, idx) => {
          const moduleKey = `${track}-${mod.id}`;
          const unlocked = isModuleUnlocked(moduleKey);
          const exercises = getExercisesByModule(track, mod.id);
          const completedCount = exercises.filter(e => isExerciseCompleted(e.id)).length;
          const totalCount = exercises.length;
          const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

          return (
            <Card
              key={mod.id}
              className={`p-6 border transition-all ${
                unlocked 
                  ? 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm'
                  : 'opacity-75 bg-slate-100/60 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800/50'
              }`}
            >
              {/* Module Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Módulo {idx + 1}
                    </span>
                    {unlocked ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.2 rounded-full">
                        <Unlock className="w-3 h-3" />
                        Desbloqueado
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 bg-slate-200 dark:bg-slate-800 px-2 py-0.2 rounded-full">
                        <Lock className="w-3 h-3" />
                        Bloqueado (Conclua o módulo anterior)
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    {mod.title}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {mod.description}
                  </p>
                </div>

                <div className="w-full md:w-56 flex-shrink-0">
                  <div className="flex justify-between text-xs font-semibold mb-1.5 text-slate-600 dark:text-slate-400">
                    <span>Progresso:</span>
                    <span className="text-slate-900 dark:text-white font-bold">{completedCount}/{totalCount} concluídos ({percentage}%)</span>
                  </div>
                  <ProgressBar
                    value={percentage}
                    color={isLogica ? 'brand' : 'sql'}
                    showPercentage={false}
                    size="sm"
                  />
                </div>
              </div>

              {/* Exercises Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-5">
                {exercises.map((ex) => {
                  const completed = isExerciseCompleted(ex.id);
                  const isProject = ex.format === 'project';

                  return (
                    <button
                      key={ex.id}
                      onClick={() => onSelectExercise(ex.id)}
                      disabled={!unlocked}
                      className={`
                        p-4 rounded-xl border text-left transition-all flex items-start justify-between gap-3 group
                        ${completed
                          ? 'bg-emerald-500/5 dark:bg-emerald-500/5 border-emerald-500/20 hover:border-emerald-500'
                          : isProject
                          ? 'bg-amber-500/5 dark:bg-amber-500/5 border-amber-500/30 hover:border-amber-500'
                          : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                        }
                        ${!unlocked ? 'cursor-not-allowed opacity-50' : 'hover:-translate-y-0.5 shadow-sm hover:shadow-md'}
                      `}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-xl mt-0.5 flex-shrink-0 ${
                          completed
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                            : isProject
                            ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                            : 'bg-slate-200/80 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                        }`}>
                          {completed ? (
                            <CheckCircle2 className="w-4 h-4" />
                          ) : isProject ? (
                            <Award className="w-4 h-4" />
                          ) : (
                            <span className="text-xs font-mono font-bold">{ex.order}</span>
                          )}
                        </div>

                        <div>
                          <div className="flex items-center gap-1.5 mb-1">
                            <Badge difficulty={ex.difficulty} size="sm" />
                            {isProject && (
                              <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-amber-500 text-white shadow-sm flex items-center gap-1">
                                <Sparkles className="w-2.5 h-2.5" />
                                Capstone
                              </span>
                            )}
                          </div>
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                            {ex.title}
                          </h4>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                            {ex.topic}
                          </p>
                        </div>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <span className="text-xs font-bold text-amber-500 dark:text-amber-400 block">
                          +{ex.xp} XP
                        </span>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white ml-auto mt-2 transition-transform group-hover:translate-x-1" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
