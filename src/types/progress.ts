import { TrackType, DifficultyLevel } from './exercise';

export interface CompletedExerciseRecord {
  exerciseId: string;
  track: TrackType;
  topic: string;
  difficulty: DifficultyLevel;
  completedAt: string; // ISO date
  attempts: number;
  userCode: string;
  xpEarned: number;
}

export interface MistakeRecord {
  exerciseId: string;
  track: TrackType;
  topic: string;
  difficulty: DifficultyLevel;
  errorType: string;
  errorMessage: string;
  userCode: string;
  timestamp: string;
  resolved: boolean;
}

export interface UserAchievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'logica' | 'sql' | 'streak' | 'geral' | 'xp';
  unlockedAt?: string;
  progress: number;
  maxProgress: number;
}

export interface StreakInfo {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string; // YYYY-MM-DD
  historyDates: string[]; // List of YYYY-MM-DD
}

export interface UserStats {
  totalXp: number;
  level: number;
  levelTitle: string;
  nextLevelXp: number;
  currentLevelBaseXp: number;
  exercisesCompletedCount: number;
  exercisesAttemptedCount: number;
  correctPercentage: number;
  studyTimeMinutes: number;
  logicaCompletedCount: number;
  logicaTotalCount: number;
  sqlCompletedCount: number;
  sqlTotalCount: number;
}

export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  soundEnabled: boolean;
  unlockAllContent: boolean;
  fontSize: 'sm' | 'md' | 'lg';
  editorWrap: boolean;
}

export interface UserProgressState {
  completedExercises: Record<string, CompletedExerciseRecord>;
  mistakeHistory: MistakeRecord[];
  achievements: Record<string, UserAchievement>;
  streak: StreakInfo;
  settings: UserSettings;
  totalXp: number;
  unlockedModules: string[];
  lastVisitedExerciseId?: string;
}
