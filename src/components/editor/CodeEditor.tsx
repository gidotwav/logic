import React, { useRef } from 'react';
import { Play, RotateCcw, Copy, Check, Terminal } from 'lucide-react';
import { Button } from '../common/Button';

export interface CodeEditorProps {
  code: string;
  onChange: (value: string) => void;
  onRun: () => void;
  language?: 'python' | 'sql';
  readOnly?: boolean;
  isLoading?: boolean;
  starterCode?: string;
  height?: string;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  onChange,
  onRun,
  language = 'python',
  readOnly = false,
  isLoading = false,
  starterCode,
  height = '340px'
}) => {
  const [copied, setCopied] = React.useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const lines = code.split('\n');
  const lineCount = Math.max(lines.length, 12);

  // Handle Tab key and shortcuts
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Run shortcut: Ctrl+Enter or Cmd+Enter
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      onRun();
      return;
    }

    // Tab key indent
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      const newCode = code.substring(0, start) + '    ' + code.substring(end);
      onChange(newCode);

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }, 0);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    if (starterCode !== undefined) {
      onChange(starterCode);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-[#1e293b] text-slate-100 overflow-hidden shadow-md flex flex-col">
      {/* Editor Top Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0f172a] border-b border-slate-800/80 text-xs">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <span className="font-mono font-medium text-slate-400 ml-2 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-slate-400" />
            {language === 'python' ? 'main.py (Python)' : 'query.sql (SQLite)'}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleCopy}
            title="Copiar código"
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          {starterCode !== undefined && (
            <button
              onClick={handleReset}
              title="Restaurar código inicial"
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
          <Button
            size="sm"
            variant={language === 'sql' ? 'sql' : 'brand'}
            onClick={onRun}
            isLoading={isLoading}
            leftIcon={<Play className="w-3.5 h-3.5 fill-current" />}
            className="ml-2 font-bold shadow-md"
          >
            Executar (Ctrl+Enter)
          </Button>
        </div>
      </div>

      {/* Editor Body */}
      <div className="relative flex font-mono text-sm leading-6 overflow-auto" style={{ minHeight: height, maxHeight: '550px' }}>
        {/* Line Numbers */}
        <div className="py-3 px-3 text-right text-slate-500 select-none bg-[#111827] border-r border-slate-800 flex-shrink-0 font-mono text-xs">
          {Array.from({ length: lineCount }).map((_, i) => (
            <div key={i} className="h-6 leading-6">
              {i + 1}
            </div>
          ))}
        </div>

        {/* Editable Area */}
        <div className="relative flex-1">
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            readOnly={readOnly}
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            placeholder={language === 'python' ? '# Escreva seu código Python aqui...' : '-- Escreva sua query SQL aqui...'}
            className="w-full h-full p-3 font-mono text-sm leading-6 bg-transparent text-slate-100 resize-none focus:outline-none placeholder:text-slate-500 selection:bg-emerald-500/30 font-medium"
            style={{ minHeight: height }}
          />
        </div>
      </div>
    </div>
  );
};
