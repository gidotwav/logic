import React, { useState } from 'react';
import { Card } from '../components/common/Card';
import { Tabs } from '../components/common/Tabs';
import { CodeEditor } from '../components/editor/CodeEditor';
import { SqlResultsTable } from '../components/editor/SqlResultsTable';
import { SchemaViewer } from '../components/editor/SchemaViewer';
import { OutputConsole } from '../components/editor/OutputConsole';
import { executeSqlQuery } from '../engine/sqlEngine';
import { executePythonCode, ExecutionResult } from '../engine/pythonEngine';
import { allDatasets } from '../data/datasets';
import { QueryResult } from '../types/database';
import { Terminal, Database, Code2, Sparkles, Play } from 'lucide-react';

export const PlaygroundPage: React.FC = () => {
  const [activeMode, setActiveMode] = useState<string>('sql');
  const [selectedDatasetId, setSelectedDatasetId] = useState<string>('loja');
  
  // SQL Playground State
  const [sqlCode, setSqlCode] = useState<string>('SELECT * \nFROM clientes \nWHERE estado = \'SP\';');
  const [sqlResult, setSqlResult] = useState<QueryResult | null>(null);
  const [isSqlLoading, setIsSqlLoading] = useState<boolean>(false);

  // Python Playground State
  const [pythonCode, setPythonCode] = useState<string>(
    '# Escreva qualquer código Python para testar livremente:\n\ndef saudacao(nome):\n    return f"Olá, {nome}! Bem-vindo ao Playground."\n\nfor i in range(1, 4):\n    print(f"Execução {i}:", saudacao("Dev"))\n'
  );
  const [pythonResult, setPythonResult] = useState<ExecutionResult | null>(null);
  const [isPythonLoading, setIsPythonLoading] = useState<boolean>(false);

  const selectedDataset = allDatasets.find(d => d.id === selectedDatasetId) || allDatasets[0];

  const handleRunSql = async () => {
    setIsSqlLoading(true);
    try {
      const res = await executeSqlQuery(sqlCode, selectedDatasetId);
      setSqlResult(res);
    } catch (err: any) {
      setSqlResult({ columns: [], values: [], error: String(err) });
    } finally {
      setIsSqlLoading(false);
    }
  };

  const handleRunPython = async () => {
    setIsPythonLoading(true);
    try {
      const res = await executePythonCode(pythonCode);
      setPythonResult(res);
    } catch (err: any) {
      setPythonResult({ success: false, output: '', error: String(err), executionTimeMs: 0 });
    } finally {
      setIsPythonLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-pop-in">
      {/* Title Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white border border-purple-500/30 shadow-xl relative overflow-hidden">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center text-2xl shadow-inner">
            <Terminal className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block mb-1">
              Ambiente Livre de Experimentação
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Playground Sandbox
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Teste consultas personalizadas no SQLite com 5 bancos de dados completos ou experimente algoritmos em Python com execução imediata no navegador.
            </p>
          </div>
        </div>
      </div>

      {/* Mode Selector */}
      <div className="flex justify-center max-w-md mx-auto">
        <Tabs
          tabs={[
            { id: 'sql', label: 'Playground SQL (SQLite)', icon: <Database className="w-4 h-4 text-sky-500" /> },
            { id: 'python', label: 'Playground Python', icon: <Code2 className="w-4 h-4 text-emerald-500" /> }
          ]}
          activeTab={activeMode}
          onChange={setActiveMode}
          className="w-full"
        />
      </div>

      {/* SQL Sandbox Mode */}
      {activeMode === 'sql' && (
        <div className="space-y-6">
          {/* Dataset Switcher Bar */}
          <Card className="p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Database className="w-4 h-4 text-sky-500" />
                Selecione o Banco de Dados Ativo:
              </span>
              <div className="flex flex-wrap gap-2">
                {allDatasets.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setSelectedDatasetId(d.id)}
                    className={`text-xs px-3 py-1.5 rounded-xl font-bold transition-all border ${
                      selectedDatasetId === d.id
                        ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {d.name}
                  </button>
                ))}
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Editor & Results (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <CodeEditor
                code={sqlCode}
                onChange={setSqlCode}
                onRun={handleRunSql}
                language="sql"
                isLoading={isSqlLoading}
                height="280px"
              />
              <SqlResultsTable result={sqlResult} isLoading={isSqlLoading} />
            </div>

            {/* Database Schema Inspector (5 cols) */}
            <div className="lg:col-span-5">
              <SchemaViewer dataset={selectedDataset} />
            </div>
          </div>
        </div>
      )}

      {/* Python Sandbox Mode */}
      {activeMode === 'python' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7">
            <CodeEditor
              code={pythonCode}
              onChange={setPythonCode}
              onRun={handleRunPython}
              language="python"
              isLoading={isPythonLoading}
              height="360px"
            />
          </div>
          <div className="lg:col-span-5">
            <OutputConsole result={pythonResult} isLoading={isPythonLoading} />
          </div>
        </div>
      )}
    </div>
  );
};
