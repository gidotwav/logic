import React, { useState } from 'react';
import { UserSettings } from '../types/progress';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { 
  Settings, 
  Unlock, 
  Sun, 
  Moon, 
  Volume2, 
  Download, 
  Upload, 
  Trash2, 
  Check, 
  AlertTriangle,
  Sparkles
} from 'lucide-react';

export interface SettingsPageProps {
  settings: UserSettings;
  onUpdateSettings: (newSettings: Partial<UserSettings>) => void;
  onResetProgress: () => void;
  onExportProgress: () => string;
  onImportProgress: (jsonStr: string) => boolean;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({
  settings,
  onUpdateSettings,
  onResetProgress,
  onExportProgress,
  onImportProgress
}) => {
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [copiedExport, setCopiedExport] = useState(false);
  const [importSuccess, setImportSuccess] = useState<boolean | null>(null);

  const handleExport = () => {
    const jsonStr = onExportProgress();
    navigator.clipboard.writeText(jsonStr);
    setCopiedExport(true);
    setTimeout(() => setCopiedExport(false), 3000);
  };

  const handleImportSubmit = () => {
    const success = onImportProgress(importJsonText);
    setImportSuccess(success);
    if (success) {
      setTimeout(() => {
        setIsImportModalOpen(false);
        setImportSuccess(null);
        setImportJsonText('');
      }, 1500);
    }
  };

  return (
    <div className="space-y-8 animate-pop-in max-w-4xl mx-auto">
      {/* Title Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/10 text-slate-300 border border-white/10 flex items-center justify-center text-2xl shadow-inner">
            <Settings className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Preferências & Dados
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Configurações da Plataforma
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Personalize sua experiência de estudo, libere conteúdos e gerencie seus dados salvos.
            </p>
          </div>
        </div>
      </div>

      {/* 1. Modo de Estudo & Progressão */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
          <Unlock className="w-5 h-5 text-emerald-500" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Modo de Estudo & Desbloqueio
          </h3>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Liberar Todos os Conteúdos e Módulos
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-lg leading-relaxed">
              Por padrão, os módulos avançados são desbloqueados conforme você conclui os anteriores. Ative esta opção caso prefira navegar e estudar livremente qualquer exercício sem restrições.
            </p>
          </div>

          <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
            <input
              type="checkbox"
              checked={settings.unlockAllContent}
              onChange={(e) => onUpdateSettings({ unlockAllContent: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-12 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-emerald-600"></div>
          </label>
        </div>
      </Card>

      {/* 2. Aparência & Áudio */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
          <Sun className="w-5 h-5 text-amber-500" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Aparência & Som
          </h3>
        </div>

        <div className="space-y-4">
          {/* Theme Selection */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Tema Visual</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Escolha entre modo claro ou modo escuro com alto contraste.</p>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={settings.theme === 'light' ? 'primary' : 'outline'}
                onClick={() => onUpdateSettings({ theme: 'light' })}
                leftIcon={<Sun className="w-3.5 h-3.5" />}
              >
                Claro
              </Button>
              <Button
                size="sm"
                variant={settings.theme === 'dark' ? 'primary' : 'outline'}
                onClick={() => onUpdateSettings({ theme: 'dark' })}
                leftIcon={<Moon className="w-3.5 h-3.5" />}
              >
                Escuro
              </Button>
            </div>
          </div>

          {/* Sound Toggle */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Efeitos Sonoros</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Sons de celebração ao acertar exercícios e subir de nível.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
              <input
                type="checkbox"
                checked={settings.soundEnabled}
                onChange={(e) => onUpdateSettings({ soundEnabled: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-12 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-emerald-600"></div>
            </label>
          </div>
        </div>
      </Card>

      {/* 3. Gerenciamento de Dados */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
          <Download className="w-5 h-5 text-blue-500" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Backup & Gerenciamento de Dados
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Button
            variant="outline"
            onClick={handleExport}
            leftIcon={copiedExport ? <Check className="w-4 h-4 text-emerald-500" /> : <Download className="w-4 h-4" />}
            className="w-full text-xs font-semibold"
          >
            {copiedExport ? 'Copiado para o Clipboard!' : 'Exportar Progresso (JSON)'}
          </Button>

          <Button
            variant="outline"
            onClick={() => setIsImportModalOpen(true)}
            leftIcon={<Upload className="w-4 h-4" />}
            className="w-full text-xs font-semibold"
          >
            Importar Backup (JSON)
          </Button>

          <Button
            variant="danger"
            onClick={() => setIsResetModalOpen(true)}
            leftIcon={<Trash2 className="w-4 h-4" />}
            className="w-full text-xs font-semibold"
          >
            Zerar Todo o Progresso
          </Button>
        </div>
      </Card>

      {/* Reset Confirmation Modal */}
      <Modal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        title={
          <span className="flex items-center gap-2 text-rose-600">
            <AlertTriangle className="w-5 h-5" />
            Zerar Todo o Progresso?
          </span>
        }
        maxWidth="md"
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Esta ação é irreversível. Todos os seus pontos de XP, níveis conquistados, histórico de exercícios e conquistas salvas no navegador serão excluídos.
          </p>
          <div className="flex items-center justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={() => setIsResetModalOpen(false)}>
              Cancelar
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                onResetProgress();
                setIsResetModalOpen(false);
              }}
            >
              Sim, Zerar Tudo
            </Button>
          </div>
        </div>
      </Modal>

      {/* Import Modal */}
      <Modal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        title="Importar Backup de Progresso (JSON)"
        maxWidth="lg"
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-500">
            Cole abaixo o conteúdo JSON exportado anteriormente para restaurar seu progresso.
          </p>
          <textarea
            value={importJsonText}
            onChange={(e) => setImportJsonText(e.target.value)}
            rows={8}
            placeholder="Cole seu JSON de progresso aqui..."
            className="w-full p-3 font-mono text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

          {importSuccess === false && (
            <p className="text-xs text-rose-500 font-semibold">Formato JSON inválido. Verifique o conteúdo colado.</p>
          )}
          {importSuccess === true && (
            <p className="text-xs text-emerald-500 font-semibold">Progresso importado e sincronizado com sucesso!</p>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={() => setIsImportModalOpen(false)}>
              Cancelar
            </Button>
            <Button variant="brand" onClick={handleImportSubmit} disabled={!importJsonText.trim()}>
              Restaurar Backup
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
