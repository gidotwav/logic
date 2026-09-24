import React, { useState } from 'react';
import { SqlDataset } from '../../types/database';
import { Table, Key, Link as LinkIcon, Eye } from 'lucide-react';

export interface SchemaViewerProps {
  dataset: SqlDataset;
}

export const SchemaViewer: React.FC<SchemaViewerProps> = ({ dataset }) => {
  const [activeTableIndex, setActiveTableIndex] = useState(0);
  const activeTable = dataset.tables[activeTableIndex] || dataset.tables[0];

  if (!activeTable) return null;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm flex flex-col">
      {/* Header Info */}
      <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Table className="w-4 h-4 text-sky-500" />
              Banco de Dados: {dataset.name}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{dataset.description}</p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
            {dataset.tables.length} tabelas
          </span>
        </div>

        {/* Table selector tabs */}
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
          {dataset.tables.map((table, idx) => {
            const isActive = idx === activeTableIndex;
            return (
              <button
                key={table.name}
                onClick={() => setActiveTableIndex(idx)}
                className={`text-xs px-3 py-1.5 font-mono font-medium rounded-lg whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                }`}
              >
                <Table className="w-3.5 h-3.5" />
                {table.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Table Details */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            Estrutura da Tabela `{activeTable.name}`
          </span>
          <span className="text-xs text-slate-400">
            {activeTable.sampleData.length} registros de exemplo
          </span>
        </div>

        {/* Column schema list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
          {activeTable.columns.map((col) => (
            <div
              key={col.name}
              className="p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/30 text-xs flex items-center justify-between font-mono"
            >
              <div className="flex items-center gap-2">
                {col.isPrimaryKey ? (
                  <span title="Chave Primária (PK)"><Key className="w-3.5 h-3.5 text-amber-500" /></span>
                ) : col.isForeignKey ? (
                  <span title="Chave Estrangeira (FK)"><LinkIcon className="w-3.5 h-3.5 text-sky-500" /></span>
                ) : (
                  <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600 ml-1" />
                )}
                <span className="font-bold text-slate-800 dark:text-slate-200">{col.name}</span>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded bg-slate-200/80 dark:bg-slate-700 text-slate-600 dark:text-slate-400">
                {col.type}
              </span>
            </div>
          ))}
        </div>

        {/* Sample Data Preview Accordion */}
        <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
          <div className="px-3 py-2 bg-slate-100 dark:bg-slate-800/80 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-slate-500" />
            Amostra dos Dados ({activeTable.name})
          </div>
          <div className="overflow-x-auto max-h-[160px]">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/40 text-slate-500 border-b border-slate-200 dark:border-slate-800">
                  {activeTable.columns.map(c => (
                    <th key={c.name} className="py-1.5 px-3 whitespace-nowrap">{c.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {activeTable.sampleData.slice(0, 4).map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                    {activeTable.columns.map(c => (
                      <td key={c.name} className="py-1 px-3 whitespace-nowrap">{String(row[c.name])}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
