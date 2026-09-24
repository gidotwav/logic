import React from 'react';
import { BookOpen, Sparkles, Code2 } from 'lucide-react';
import { Card } from '../common/Card';

export interface ConceptExplanationProps {
  description: string;
  conceptExplanation: string;
  codeExample?: string;
  language?: 'python' | 'sql';
}

export const ConceptExplanation: React.FC<ConceptExplanationProps> = ({
  description,
  conceptExplanation,
  codeExample,
  language = 'python'
}) => {
  return (
    <div className="space-y-4">
      {/* Exercise Challenge Prompt */}
      <Card className="p-5 border-l-4 border-l-emerald-500 dark:border-l-emerald-500">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Desafio do Exercício
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-200 mt-1.5 leading-relaxed font-medium">
              {description}
            </p>
          </div>
        </div>
      </Card>

      {/* Mini Didactic Concept Card */}
      <Card className="p-5 bg-gradient-to-br from-slate-50 to-emerald-50/20 dark:from-slate-900 dark:to-emerald-950/20 border-slate-200 dark:border-slate-800">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Aprenda o Conceito
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed whitespace-pre-line">
              {conceptExplanation}
            </p>

            {/* Code Example Preview */}
            {codeExample && (
              <div className="mt-4 rounded-xl bg-[#0f172a] border border-slate-800 p-3.5 overflow-x-auto text-xs font-mono text-slate-200 shadow-inner">
                <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-semibold mb-2 pb-1.5 border-b border-slate-800">
                  <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Exemplo de Código ({language === 'python' ? 'Python' : 'SQL'}):</span>
                </div>
                <pre className="leading-5">{codeExample}</pre>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};
