import React, { useState } from 'react';
import { QueryResult } from '../../types/database';
import { Database, Clock, Rows, AlertCircle, CheckCircle2 } from 'lucide-react';

export interface SqlResultsTableProps {
  result: QueryResult | null;
  isLoading?: boolean;
}

export const SqlResultsTable: React.FC<SqlResultsTableProps> = ({
  result,
  isLoading = false
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div className="w-8 h-8 border-3 border-sky-500 border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-sm font-medium">Executando consulta SQL no banco de dados...</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center p-10 text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
        <Database className="w-10 h-10 mb-2 opacity-40 text-sky-500" />
        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Nenhuma consulta executada ainda.</p>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Escreva sua query SQL no editor e clique em "Executar (Ctrl+Enter)".</p>
      </div>
    );
  }

  if (result.error) {
    return (
      <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl text-rose-600 dark:text-rose-400">
        <div className="flex items-start gap-2.5">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-sm">Erro na Execução da Query</h4>
            <p className="text-xs mt-1 leading-relaxed font-mono">{result.error}</p>
          </div>
        </div>
      </div>
    );
  }

  const totalRows = result.values.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const displayedValues = result.values.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm flex flex-col">
      {/* Table Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 font-semibold text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            Sucesso
          </span>
          <span className="flex items-center gap-1.5">
            <Rows className="w-3.5 h-3.5 text-slate-400" />
            {totalRows} {totalRows === 1 ? 'linha retornada' : 'linhas retornadas'}
          </span>
          {result.executionTimeMs !== undefined && (
            <span className="flex items-center gap-1.5 text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              {result.executionTimeMs} ms
            </span>
          )}
        </div>
      </div>

      {/* Responsive Table Scroll Container */}
      <div className="overflow-x-auto max-h-[380px]">
        <table className="w-full text-left text-xs font-mono border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 font-semibold border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10">
              <th className="py-2.5 px-3 w-12 text-center text-slate-400 font-normal">#</th>
              {result.columns.map((col, idx) => (
                <th key={idx} className="py-2.5 px-4 whitespace-nowrap tracking-wide border-r border-slate-200/50 dark:border-slate-700/50 last:border-r-0">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
            {displayedValues.map((row, rIdx) => {
              const globalRowIndex = (currentPage - 1) * rowsPerPage + rIdx + 1;
              return (
                <tr key={rIdx} className="hover:bg-sky-500/5 transition-colors">
                  <td className="py-2 px-3 text-center text-slate-400 select-none bg-slate-50/50 dark:bg-slate-800/30">
                    {globalRowIndex}
                  </td>
                  {row.map((val, cIdx) => (
                    <td key={cIdx} className="py-2 px-4 whitespace-nowrap border-r border-slate-200/40 dark:border-slate-800/40 last:border-r-0">
                      {val === null ? (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold italic">
                          NULL
                        </span>
                      ) : typeof val === 'number' ? (
                        <span className="text-sky-600 dark:text-sky-400 font-semibold">
                          {val}
                        </span>
                      ) : (
                        <span>{String(val)}</span>
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-2 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-200 dark:border-slate-800 text-xs">
          <span className="text-slate-500">Página {currentPage} de {totalPages}</span>
          <div className="flex gap-1.5">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 disabled:opacity-40"
            >
              Anterior
            </button>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 disabled:opacity-40"
            >
              Próxima
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
