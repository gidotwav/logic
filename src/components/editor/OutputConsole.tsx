import React from 'react';
import { Terminal, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { ExecutionResult } from '../../engine/pythonEngine';

export interface OutputConsoleProps {
  result: ExecutionResult | null;
  isLoading?: boolean;
}

export const OutputConsole: React.FC<OutputConsoleProps> = ({
  result,
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <div className="p-8 bg-[#0f172a] border border-slate-800 rounded-2xl text-slate-400 flex flex-col items-center justify-center font-mono text-xs">
        <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mb-2" />
        <span>Executando código Python...</span>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="p-6 bg-[#0f172a] border border-slate-800 rounded-2xl text-slate-500 font-mono text-xs flex items-center justify-center gap-2">
        <Terminal className="w-4 h-4 opacity-50" />
        <span>O resultado do terminal (stdout) aparecerá aqui após a execução.</span>
      </div>
    );
  }

  return (
    <div className="bg-[#0f172a] border border-slate-800 rounded-2xl overflow-hidden font-mono text-xs shadow-md">
      {/* Console Topbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#0b1120] border-b border-slate-800/80 text-slate-400">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-semibold text-slate-300">Terminal de Saída</span>
          {result.success ? (
            <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium ml-2">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Executado com sucesso
            </span>
          ) : (
            <span className="flex items-center gap-1 text-[11px] text-rose-400 font-medium ml-2">
              <XCircle className="w-3.5 h-3.5" />
              Erro na execução
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 text-slate-500 text-[11px]">
          <Clock className="w-3 h-3" />
          {result.executionTimeMs} ms
        </div>
      </div>

      {/* Output Content */}
      <div className="p-4 overflow-auto max-h-[260px] leading-relaxed text-slate-200 whitespace-pre-wrap">
        {result.output && (
          <div className="text-slate-100 mb-2">
            {result.output}
          </div>
        )}

        {result.returnValue !== undefined && result.returnValue !== null && (
          <div className="text-emerald-400 mt-1">
            <span className="text-slate-500 select-none">&gt;&gt;&gt; Retorno da função: </span>
            {typeof result.returnValue === 'object' ? JSON.stringify(result.returnValue) : String(result.returnValue)}
          </div>
        )}

        {result.error && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 mt-2 font-medium">
            {result.error}
          </div>
        )}

        {!result.output && result.returnValue === undefined && !result.error && (
          <span className="text-slate-500 italic">O programa executou sem gerar saídas no print().</span>
        )}
      </div>
    </div>
  );
};
