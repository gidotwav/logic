import { UserAchievement } from '../types/progress';

export const INITIAL_ACHIEVEMENTS: Record<string, UserAchievement> = {
  first_code: {
    id: 'first_code',
    title: '🏆 Primeiro Código',
    description: 'Conclua seu primeiro exercício na plataforma com sucesso.',
    icon: 'Trophy',
    category: 'geral',
    progress: 0,
    maxProgress: 1
  },
  streak_3: {
    id: 'streak_3',
    title: '🔥 Aquecendo os Motores',
    description: 'Mantenha uma sequência de 3 dias seguidos estudando.',
    icon: 'Flame',
    category: 'streak',
    progress: 0,
    maxProgress: 3
  },
  streak_7: {
    id: 'streak_7',
    title: '⚡ Hábito de Aço',
    description: 'Mantenha uma sequência de 7 dias consecutivos de prática.',
    icon: 'Zap',
    category: 'streak',
    progress: 0,
    maxProgress: 7
  },
  loop_master: {
    id: 'loop_master',
    title: '🧠 Mestre dos Loops',
    description: 'Complete 5 exercícios envolvendo repetições for e while.',
    icon: 'Repeat',
    category: 'logica',
    progress: 0,
    maxProgress: 5
  },
  sql_explorer: {
    id: 'sql_explorer',
    title: '🗄️ SQL Explorer',
    description: 'Complete 10 consultas SQL em diferentes bancos de dados.',
    icon: 'Database',
    category: 'sql',
    progress: 0,
    maxProgress: 10
  },
  join_specialist: {
    id: 'join_specialist',
    title: '🔗 Conector de Dados',
    description: 'Complete 5 exercícios que utilizam INNER, LEFT ou múltiplos JOINs.',
    icon: 'Network',
    category: 'sql',
    progress: 0,
    maxProgress: 5
  },
  bug_hunter: {
    id: 'bug_hunter',
    title: '🐞 Detetive de Código',
    description: 'Encontre e corrija erros em 3 exercícios de correção de bugs.',
    icon: 'Bug',
    category: 'geral',
    progress: 0,
    maxProgress: 3
  },
  polyglot: {
    id: 'polyglot',
    title: '🌟 Poliglota dos Dados',
    description: 'Conclua pelo menos 5 exercícios de Lógica e 5 exercícios de SQL.',
    icon: 'Sparkles',
    category: 'geral',
    progress: 0,
    maxProgress: 10
  },
  capstone_hero: {
    id: 'capstone_hero',
    title: '🏅 Arquiteto de Projetos',
    description: 'Finalize com sucesso o seu primeiro Projeto Capstone integrador.',
    icon: 'Award',
    category: 'geral',
    progress: 0,
    maxProgress: 1
  },
  xp_500: {
    id: 'xp_500',
    title: '💎 Colecionador de XP',
    description: 'Acumule 500 pontos de experiência na sua jornada.',
    icon: 'Gem',
    category: 'xp',
    progress: 0,
    maxProgress: 500
  }
};
