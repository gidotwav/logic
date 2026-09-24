import React from 'react';
import { SolutionBreakdown } from '../../types/exercise';
import { Modal } from '../common/Modal';
import { Target, Brain, ListOrdered, CheckCircle2, AlertTriangle, Globe, Sparkles, Copy } from 'lucide-react';
import { Button } from '../common/Button';

export interface SolutionExplanationModalProps {
  isOpen: boolean;
  onClose: () => void;
  solution: SolutionBreakdown;
  title: string;
  language?: 'python' | 'sql';
}

export const SolutionExplanationModal: React.FC<SolutionExplanationModalProps> = ({
  isOpen,
  onClose,
  solution,
  title,
  language = 'python'
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(solution.finalCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-emerald-500" />
          <span>Entenda a Solução: {title}</span>
        </div>
      }
      maxWidth="4xl"
    >
      <div className="space-y-6 text-slate-800 dark:text-slate-200">
        {/* 1. Objetivo & 2. Interpretação */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
            <h4 className="text-xs font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
              <Target className="w-4 h-4 text-emerald-500" />
              1. Qual era o objetivo
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {solution.objective}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/20">
            <h4 className="text-xs font-bold text-sky-700 dark:text-sky-300 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
              <Brain className="w-4 h-4 text-sky-500" />
              2. Como interpretar o problema
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {solution.reasoning}
            </p>
          </div>
        </div>

        {/* 3. Passo a Passo */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
          <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5 mb-3">
            <ListOrdered className="w-4 h-4 text-emerald-500" />
            3. Solução Passo a Passo
          </h4>
          <ul className="space-y-2">
            {solution.stepByStep.map((step, idx) => (
              <li key={idx} className="text-xs sm:text-sm flex items-start gap-2 text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 4. Código Final com Copy Button */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              4. Código Final da Solução
            </h4>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleCopy}
              leftIcon={<Copy className="w-3.5 h-3.5" />}
              className="text-xs"
            >
              {copied ? 'Copiado!' : 'Copiar Código'}
            </Button>
          </div>
          <div className="rounded-xl bg-[#0f172a] border border-slate-800 p-4 font-mono text-xs text-emerald-400 overflow-x-auto shadow-inner leading-relaxed">
            <pre>{solution.finalCode}</pre>
          </div>
        </div>

        {/* 5. Outras Formas de Resolver */}
        {solution.alternativeSolutions && (
          <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20">
            <h4 className="text-xs font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wider mb-1.5">
              5. Outras formas de resolver
            </h4>
            <div className="font-mono text-xs text-slate-700 dark:text-slate-300 whitespace-pre-line">
              {solution.alternativeSolutions}
            </div>
          </div>
        )}

        {/* 6. Erros Comuns & 7. No Mundo Real */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
            <h4 className="text-xs font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wider flex items-center gap-1.5 mb-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              6. Erros Comuns a Evitar
            </h4>
            <ul className="space-y-1.5">
              {solution.commonMistakes.map((mistake, idx) => (
                <li key={idx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-1.5">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20">
            <h4 className="text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wider flex items-center gap-1.5 mb-2">
              <Globe className="w-4 h-4 text-blue-500" />
              7. Uso no Mundo Real
            </h4>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {solution.realWorldApplication}
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end pt-2">
          <Button variant="primary" onClick={onClose}>
            Entendido, voltar ao exercício
          </Button>
        </div>
      </div>
    </Modal>
  );
};
