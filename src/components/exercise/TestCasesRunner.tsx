import React from 'react';
import { TestRunResult } from '../../engine/pythonEngine';
import { CheckCircle2, XCircle, Clock, Lock, ChevronRight } from 'lucide-react';

export interface TestCasesRunnerProps {
  testResults: TestRunResult[];
  isLoading?: boolean;
}

export const TestCasesRunner: React.FC<TestCasesRunnerProps> = ({
  testResults,
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-center gap-2 text-slate-500 text-xs">
        <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        <span>Validando casos de teste automatizados...</span>
      </div>
    );
  }

  if (testResults.length === 0) {
    return null;
  }

  const passedCount = testResults.filter(t => t.passed).length;
  const totalCount = testResults.length;
  const allPassed = passedCount === totalCount;

  return (
    <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm space-y-3">
      {/* Header Summary */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {allPassed ? (
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          ) : (
            <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-600">
              <XCircle className="w-4 h-4" />
            </div>
          )}
          <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Casos de Teste Automatizados
          </h4>
        </div>
        <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
          allPassed 
            ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
            : 'bg-rose-500/10 text-rose-600 border-rose-500/20'
        }`}>
          {passedCount} / {totalCount} aprovados
        </span>
      </div>

      {/* Test Cases Grid */}
      <div className="space-y-2">
        {testResults.map((result, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-xl border text-xs transition-all ${
              result.passed
                ? 'bg-emerald-500/5 dark:bg-emerald-500/5 border-emerald-500/20'
                : 'bg-rose-500/5 dark:bg-rose-500/5 border-rose-500/20'
            }`}
          >
            <div className="flex items-center justify-between font-mono">
              <div className="flex items-center gap-2">
                {result.passed ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
                )}
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  Teste #{idx + 1}: {result.testCase.description}
                </span>
                {result.testCase.hidden && (
                  <span className="flex items-center gap-1 text-[10px] bg-slate-200 dark:bg-slate-700 px-2 py-0.2 rounded text-slate-600 dark:text-slate-400">
                    <Lock className="w-3 h-3" />
                    Oculto
                  </span>
                )}
              </div>
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {result.executionTimeMs} ms
              </span>
            </div>

            {/* Input & Output diff */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-200/50 dark:border-slate-800/50 font-mono text-[11px]">
              <div>
                <span className="text-slate-500">Resultado Esperado:</span>
                <div className="p-1.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-200 font-semibold mt-0.5">
                  {typeof result.expectedOutput === 'object' ? JSON.stringify(result.expectedOutput) : String(result.expectedOutput)}
                </div>
              </div>
              <div>
                <span className="text-slate-500">Seu Código Produziu:</span>
                <div className={`p-1.5 rounded border font-semibold mt-0.5 ${
                  result.passed
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300'
                    : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-300'
                }`}>
                  {typeof result.actualOutput === 'object' ? JSON.stringify(result.actualOutput) : String(result.actualOutput)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
