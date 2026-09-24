export interface LevelThreshold {
  level: number;
  title: string;
  minXp: number;
  maxXp: number;
  badge: string;
  color: string;
}

export const LEVELS: LevelThreshold[] = [
  { level: 1, title: 'Iniciante Curioso', minXp: 0, maxXp: 100, badge: '🌱', color: 'text-emerald-500' },
  { level: 2, title: 'Aprendiz de Código', minXp: 100, maxXp: 250, badge: '📘', color: 'text-blue-500' },
  { level: 3, title: 'Praticante Lógico', minXp: 250, maxXp: 500, badge: '⚡', color: 'text-cyan-500' },
  { level: 4, title: 'Programador Júnior', minXp: 500, maxXp: 850, badge: '💻', color: 'text-indigo-500' },
  { level: 5, title: 'Analista de Consultas', minXp: 850, maxXp: 1300, badge: '🗄️', color: 'text-purple-500' },
  { level: 6, title: 'Engenheiro de Lógica', minXp: 1300, maxXp: 1900, badge: '🚀', color: 'text-pink-500' },
  { level: 7, title: 'Arquiteto de Soluções', minXp: 1900, maxXp: 2700, badge: '🛡️', color: 'text-amber-500' },
  { level: 8, title: 'Mestre da Lógica & SQL', minXp: 2700, maxXp: 3800, badge: '👑', color: 'text-yellow-500' },
  { level: 9, title: 'Grão-Mestre dos Algoritmos', minXp: 3800, maxXp: 5200, badge: '🔮', color: 'text-orange-500' },
  { level: 10, title: 'Lenda do Código', minXp: 5200, maxXp: 10000, badge: '🌌', color: 'text-rose-500' },
];

export function calculateUserLevel(xp: number): LevelThreshold {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].minXp) {
      return LEVELS[i];
    }
  }
  return LEVELS[0];
}

export function getLevelProgress(xp: number): { current: number; max: number; percentage: number } {
  const currentLevel = calculateUserLevel(xp);
  const range = currentLevel.maxXp - currentLevel.minXp;
  const current = Math.max(0, xp - currentLevel.minXp);
  const percentage = Math.min(100, Math.round((current / range) * 100));
  return { current, max: range, percentage };
}
