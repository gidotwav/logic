import { useState, useEffect, useCallback } from 'react';
import { UserProgressState, CompletedExerciseRecord, MistakeRecord, UserStats } from '../types/progress';
import { Exercise } from '../types/exercise';
import { INITIAL_ACHIEVEMENTS } from '../data/achievements';
import { calculateUserLevel, getLevelProgress } from '../data/levels';
import { allExercises, getExercisesByTrack } from '../data/exercises';

const STORAGE_KEY = 'codelogic_progress_v1';

const getInitialState = (): UserProgressState => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        completedExercises: parsed.completedExercises || {},
        mistakeHistory: parsed.mistakeHistory || [],
        achievements: { ...INITIAL_ACHIEVEMENTS, ...(parsed.achievements || {}) },
        streak: parsed.streak || { currentStreak: 1, longestStreak: 1, lastActiveDate: new Date().toISOString().split('T')[0], historyDates: [new Date().toISOString().split('T')[0]] },
        settings: {
          theme: 'dark',
          soundEnabled: true,
          unlockAllContent: false,
          fontSize: 'md',
          editorWrap: true,
          ...(parsed.settings || {})
        },
        totalXp: parsed.totalXp || 0,
        unlockedModules: parsed.unlockedModules || ['logica-basico', 'sql-basico'],
        lastVisitedExerciseId: parsed.lastVisitedExerciseId || 'log-b-01'
      };
    }
  } catch (e) {
    console.error('Erro ao ler progresso do localStorage:', e);
  }

  const today = new Date().toISOString().split('T')[0];
  return {
    completedExercises: {},
    mistakeHistory: [],
    achievements: { ...INITIAL_ACHIEVEMENTS },
    streak: {
      currentStreak: 1,
      longestStreak: 1,
      lastActiveDate: today,
      historyDates: [today]
    },
    settings: {
      theme: 'dark',
      soundEnabled: true,
      unlockAllContent: false,
      fontSize: 'md',
      editorWrap: true
    },
    totalXp: 0,
    unlockedModules: ['logica-basico', 'sql-basico'],
    lastVisitedExerciseId: 'log-b-01'
  };
};

export function useProgress() {
  const [state, setState] = useState<UserProgressState>(getInitialState);
  const [newAchievement, setNewAchievement] = useState<string | null>(null);
  const [didLevelUp, setDidLevelUp] = useState<boolean>(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Erro ao salvar progresso:', e);
    }
  }, [state]);

  // Update streak logic
  const updateStreak = useCallback((prevStreak: any) => {
    const today = new Date().toISOString().split('T')[0];
    if (prevStreak.lastActiveDate === today) {
      return prevStreak;
    }

    const lastDate = new Date(prevStreak.lastActiveDate);
    const currDate = new Date(today);
    const diffTime = Math.abs(currDate.getTime() - lastDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let newStreak = prevStreak.currentStreak;
    if (diffDays === 1) {
      newStreak += 1;
    } else if (diffDays > 1) {
      newStreak = 1;
    }

    const longest = Math.max(newStreak, prevStreak.longestStreak || 1);
    const history = Array.from(new Set([...(prevStreak.historyDates || []), today]));

    return {
      currentStreak: newStreak,
      longestStreak: longest,
      lastActiveDate: today,
      historyDates: history
    };
  }, []);

  // Complete exercise handler
  const completeExercise = useCallback((
    exercise: Exercise, 
    userCode: string, 
    attempts: number = 1
  ): { earnedXp: number; isFirstCompletion: boolean } => {
    const isFirstTime = !state.completedExercises[exercise.id];
    const earnedXp = isFirstTime ? exercise.xp : Math.round(exercise.xp * 0.2); // 20% XP on replay
    
    setState(prev => {
      const oldLevel = calculateUserLevel(prev.totalXp).level;
      const newTotalXp = prev.totalXp + earnedXp;
      const newLevel = calculateUserLevel(newTotalXp).level;

      if (newLevel > oldLevel) {
        setDidLevelUp(true);
      }

      const completedRecord: CompletedExerciseRecord = {
        exerciseId: exercise.id,
        track: exercise.track,
        topic: exercise.topic,
        difficulty: exercise.difficulty,
        completedAt: new Date().toISOString(),
        attempts,
        userCode,
        xpEarned: earnedXp
      };

      const updatedCompleted = {
        ...prev.completedExercises,
        [exercise.id]: completedRecord
      };

      // Resolve existing mistakes for this exercise
      const updatedMistakes = prev.mistakeHistory.map(m => 
        m.exerciseId === exercise.id ? { ...m, resolved: true } : m
      );

      // Check achievement progression
      const updatedAchievements = { ...prev.achievements };
      const completedCount = Object.keys(updatedCompleted).length;

      // 1. First code
      if (updatedAchievements.first_code && !updatedAchievements.first_code.unlockedAt) {
        updatedAchievements.first_code.progress = 1;
        updatedAchievements.first_code.unlockedAt = new Date().toISOString();
        setNewAchievement(updatedAchievements.first_code.title);
      }

      // 2. Loop Master
      const loopExercises = Object.values(updatedCompleted).filter(r => r.topic.toLowerCase().includes('repetiç') || r.topic.toLowerCase().includes('loop')).length;
      if (updatedAchievements.loop_master && !updatedAchievements.loop_master.unlockedAt) {
        updatedAchievements.loop_master.progress = loopExercises;
        if (loopExercises >= updatedAchievements.loop_master.maxProgress) {
          updatedAchievements.loop_master.unlockedAt = new Date().toISOString();
          setNewAchievement(updatedAchievements.loop_master.title);
        }
      }

      // 3. SQL Explorer
      const sqlCompleted = Object.values(updatedCompleted).filter(r => r.track === 'sql').length;
      if (updatedAchievements.sql_explorer && !updatedAchievements.sql_explorer.unlockedAt) {
        updatedAchievements.sql_explorer.progress = sqlCompleted;
        if (sqlCompleted >= updatedAchievements.sql_explorer.maxProgress) {
          updatedAchievements.sql_explorer.unlockedAt = new Date().toISOString();
          setNewAchievement(updatedAchievements.sql_explorer.title);
        }
      }

      // 4. Capstone Hero
      if (exercise.format === 'project' && updatedAchievements.capstone_hero && !updatedAchievements.capstone_hero.unlockedAt) {
        updatedAchievements.capstone_hero.progress = 1;
        updatedAchievements.capstone_hero.unlockedAt = new Date().toISOString();
        setNewAchievement(updatedAchievements.capstone_hero.title);
      }

      // 5. XP 500
      if (updatedAchievements.xp_500 && !updatedAchievements.xp_500.unlockedAt) {
        updatedAchievements.xp_500.progress = Math.min(500, newTotalXp);
        if (newTotalXp >= 500) {
          updatedAchievements.xp_500.unlockedAt = new Date().toISOString();
          setNewAchievement(updatedAchievements.xp_500.title);
        }
      }

      const updatedStreak = updateStreak(prev.streak);

      // Unlock next module if threshold reached
      const unlockedModules = [...prev.unlockedModules];
      if (sqlCompleted >= 4 && !unlockedModules.includes('sql-intermediario')) {
        unlockedModules.push('sql-intermediario');
      }
      if (sqlCompleted >= 9 && !unlockedModules.includes('sql-avancado')) {
        unlockedModules.push('sql-avancado');
      }
      const logicaCompleted = Object.values(updatedCompleted).filter(r => r.track === 'logica').length;
      if (logicaCompleted >= 4 && !unlockedModules.includes('logica-intermediario')) {
        unlockedModules.push('logica-intermediario');
      }
      if (logicaCompleted >= 9 && !unlockedModules.includes('logica-avancado')) {
        unlockedModules.push('logica-avancado');
      }

      return {
        ...prev,
        completedExercises: updatedCompleted,
        mistakeHistory: updatedMistakes,
        achievements: updatedAchievements,
        totalXp: newTotalXp,
        streak: updatedStreak,
        unlockedModules,
        lastVisitedExerciseId: exercise.id
      };
    });

    return { earnedXp, isFirstCompletion: isFirstTime };
  }, [state.completedExercises, updateStreak]);

  // Log mistake for Revision Mode
  const logMistake = useCallback((
    exercise: Exercise, 
    errorType: string, 
    errorMessage: string, 
    userCode: string
  ) => {
    setState(prev => {
      const newMistake: MistakeRecord = {
        exerciseId: exercise.id,
        track: exercise.track,
        topic: exercise.topic,
        difficulty: exercise.difficulty,
        errorType,
        errorMessage,
        userCode,
        timestamp: new Date().toISOString(),
        resolved: false
      };

      // Filter duplicate unresolved errors for the same exercise
      const filtered = prev.mistakeHistory.filter(m => !(m.exerciseId === exercise.id && !m.resolved));

      return {
        ...prev,
        mistakeHistory: [newMistake, ...filtered].slice(0, 50) // keep last 50
      };
    });
  }, []);

  // Update Settings
  const updateSettings = useCallback((newSettings: Partial<UserProgressState['settings']>) => {
    setState(prev => ({
      ...prev,
      settings: { ...prev.settings, ...newSettings }
    }));
  }, []);

  // Reset Progress
  const resetProgress = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setState(getInitialState());
  }, []);

  // Export & Import
  const exportProgressJson = useCallback(() => {
    return JSON.stringify(state, null, 2);
  }, [state]);

  const importProgressJson = useCallback((jsonStr: string) => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed && typeof parsed.totalXp === 'number') {
        setState(parsed);
        return true;
      }
    } catch (e) {
      console.error('Erro ao importar JSON:', e);
    }
    return false;
  }, []);

  // Compute live user stats
  const levelInfo = calculateUserLevel(state.totalXp);
  const levelProg = getLevelProgress(state.totalXp);
  const logicaTotal = getExercisesByTrack('logica').length;
  const sqlTotal = getExercisesByTrack('sql').length;
  const logicaDone = Object.values(state.completedExercises).filter(r => r.track === 'logica').length;
  const sqlDone = Object.values(state.completedExercises).filter(r => r.track === 'sql').length;
  const completedTotal = Object.keys(state.completedExercises).length;
  const attemptedTotal = completedTotal + state.mistakeHistory.filter(m => !m.resolved).length;
  const correctRate = attemptedTotal > 0 ? Math.round((completedTotal / attemptedTotal) * 100) : 100;

  const stats: UserStats = {
    totalXp: state.totalXp,
    level: levelInfo.level,
    levelTitle: levelInfo.title,
    nextLevelXp: levelInfo.maxXp,
    currentLevelBaseXp: levelInfo.minXp,
    exercisesCompletedCount: completedTotal,
    exercisesAttemptedCount: attemptedTotal,
    correctPercentage: correctRate,
    studyTimeMinutes: Math.max(5, completedTotal * 4),
    logicaCompletedCount: logicaDone,
    logicaTotalCount: logicaTotal,
    sqlCompletedCount: sqlDone,
    sqlTotalCount: sqlTotal
  };

  const isModuleUnlocked = (moduleKey: string) => {
    if (state.settings.unlockAllContent) return true;
    return state.unlockedModules.includes(moduleKey);
  };

  const isExerciseCompleted = (exerciseId: string) => {
    return !!state.completedExercises[exerciseId];
  };

  return {
    state,
    stats,
    levelInfo,
    levelProgress: levelProg,
    newAchievement,
    clearNewAchievement: () => setNewAchievement(null),
    didLevelUp,
    clearDidLevelUp: () => setDidLevelUp(false),
    completeExercise,
    logMistake,
    updateSettings,
    resetProgress,
    exportProgressJson,
    importProgressJson,
    isModuleUnlocked,
    isExerciseCompleted
  };
}
