import React from 'react';
import { IntelligentFeedback } from '../../engine/feedbackEngine';
import { Sparkles, CheckCircle2, AlertTriangle, HelpCircle, ArrowRight } from 'lucide-react';

export interface IntelligentFeedbackAlertProps {
  feedback: IntelligentFeedback | null;
}

export const IntelligentFeedbackAlert: React.FC<IntelligentFeedbackAlertProps> = ({ feedback }) => {
  if (!feedback) return null;

  const config = {
    success: {
      bg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-200',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />
    },
    tip: {
      bg: 'bg-sky-500/10 border-sky-500/30 text-sky-900 dark:text-sky-200',
      icon: <Sparkles className="w-5 h-5 text-sky-500" />
    },
    warning: {
      bg: 'bg-amber-500/10 border-amber-500/30 text-amber-900 dark:text-amber-200',
      icon: <AlertTriangle className="w-5 h-5 text-amber-500" />
    },
    error: {
      bg: 'bg-rose-500/10 border-rose-500/30 text-rose-900 dark:text-rose-200',
      icon: <HelpCircle className="w-5 h-5 text-rose-500" />
    }
  }[feedback.type];

  return (
    <div className={`p-4 rounded-2xl border ${config.bg} shadow-sm transition-all animate-pop-in`}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">{config.icon}</div>
        <div className="flex-1">
          <h4 className="font-bold text-sm leading-snug">{feedback.title}</h4>
          <p className="text-xs sm:text-sm mt-1 leading-relaxed opacity-95">
            {feedback.message}
          </p>
          {feedback.suggestedAction && (
            <div className="mt-2.5 flex items-center gap-1.5 text-xs font-semibold">
              <ArrowRight className="w-3.5 h-3.5" />
              <span>{feedback.suggestedAction}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
