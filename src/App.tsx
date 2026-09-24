import React, { useState } from 'react';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { TrackPage } from './pages/TrackPage';
import { ExercisePlayerPage } from './pages/ExercisePlayerPage';
import { PracticeModePage } from './pages/PracticeModePage';
import { DailyChallengePage } from './pages/DailyChallengePage';
import { RevisionModePage } from './pages/RevisionModePage';
import { ProgressDashboardPage } from './pages/ProgressDashboardPage';
import { AchievementsPage } from './pages/AchievementsPage';
import { PlaygroundPage } from './pages/PlaygroundPage';
import { SettingsPage } from './pages/SettingsPage';
import { useProgress } from './hooks/useProgress';
import { useTheme } from './hooks/useTheme';
import { useAudio } from './hooks/useAudio';
import { getExerciseById, getNextExercise, getPreviousExercise } from './data/exercises';

export function App() {
  const {
    state,
    stats,
    newAchievement,
    clearNewAchievement,
    didLevelUp,
    clearDidLevelUp,
    completeExercise,
    logMistake,
    updateSettings,
    resetProgress,
    exportProgressJson,
    importProgressJson,
    isModuleUnlocked,
    isExerciseCompleted
  } = useProgress();

  const { theme, toggleTheme, isDark } = useTheme();
  const { playSuccess, playError, playLevelUp } = useAudio(state.settings.soundEnabled);

  // Routing State
  const [currentRoute, setCurrentRoute] = useState<string>('home');
  const [currentExerciseId, setCurrentExerciseId] = useState<string>('log-b-01');

  const handleNavigate = (route: string, exerciseId?: string) => {
    setCurrentRoute(route);
    if (exerciseId) {
      setCurrentExerciseId(exerciseId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectExercise = (exerciseId: string) => {
    setCurrentExerciseId(exerciseId);
    setCurrentRoute('exercise');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Resolve current active exercise object
  const activeExercise = getExerciseById(currentExerciseId) || getExerciseById('log-b-01')!;
  const nextExercise = getNextExercise(activeExercise.id);
  const prevExercise = getPreviousExercise(activeExercise.id);

  return (
    <Layout
      currentRoute={currentRoute}
      onNavigate={handleNavigate}
      totalXp={stats.totalXp}
      streak={state.streak.currentStreak}
      isDark={isDark}
      onToggleTheme={toggleTheme}
      soundEnabled={state.settings.soundEnabled}
      onToggleSound={() => updateSettings({ soundEnabled: !state.settings.soundEnabled })}
      newAchievement={newAchievement}
      onClearAchievement={clearNewAchievement}
      didLevelUp={didLevelUp}
      onClearLevelUp={() => {
        clearDidLevelUp();
        playLevelUp();
      }}
    >
      {/* 1. Home View */}
      {currentRoute === 'home' && (
        <HomePage
          stats={stats}
          streak={state.streak.currentStreak}
          onNavigate={(route, exId) => {
            if (route === 'exercise' && exId) {
              handleSelectExercise(exId);
            } else {
              handleNavigate(route);
            }
          }}
          isExerciseCompleted={isExerciseCompleted}
        />
      )}

      {/* 2. Track: Lógica de Programação */}
      {currentRoute === 'track-logica' && (
        <TrackPage
          track="logica"
          onSelectExercise={handleSelectExercise}
          isExerciseCompleted={isExerciseCompleted}
          isModuleUnlocked={isModuleUnlocked}
        />
      )}

      {/* 3. Track: SQL */}
      {currentRoute === 'track-sql' && (
        <TrackPage
          track="sql"
          onSelectExercise={handleSelectExercise}
          isExerciseCompleted={isExerciseCompleted}
          isModuleUnlocked={isModuleUnlocked}
        />
      )}

      {/* 4. Interactive Exercise Player */}
      {currentRoute === 'exercise' && (
        <ExercisePlayerPage
          exercise={activeExercise}
          isCompleted={isExerciseCompleted(activeExercise.id)}
          onComplete={completeExercise}
          onLogMistake={logMistake}
          onNavigateNext={() => nextExercise && handleSelectExercise(nextExercise.id)}
          onNavigatePrevious={() => prevExercise && handleSelectExercise(prevExercise.id)}
          hasPrevious={!!prevExercise}
          hasNext={!!nextExercise}
          playSuccessSound={playSuccess}
          playErrorSound={playError}
        />
      )}

      {/* 5. Practice Mode */}
      {currentRoute === 'practice' && (
        <PracticeModePage
          onSelectExercise={handleSelectExercise}
          isExerciseCompleted={isExerciseCompleted}
        />
      )}

      {/* 6. Daily Challenge */}
      {currentRoute === 'daily' && (
        <DailyChallengePage
          level={stats.level}
          streak={state.streak.currentStreak}
          isExerciseCompleted={isExerciseCompleted}
          onSolve={handleSelectExercise}
        />
      )}

      {/* 7. Revision Mode */}
      {currentRoute === 'revision' && (
        <RevisionModePage
          mistakes={state.mistakeHistory}
          onSelectExercise={handleSelectExercise}
        />
      )}

      {/* 8. Progress Dashboard */}
      {currentRoute === 'progress' && (
        <ProgressDashboardPage
          stats={stats}
          state={state}
          onSelectExercise={handleSelectExercise}
        />
      )}

      {/* 9. Achievements */}
      {currentRoute === 'achievements' && (
        <AchievementsPage
          achievements={state.achievements}
        />
      )}

      {/* 10. Free Playground Sandbox */}
      {currentRoute === 'playground' && (
        <PlaygroundPage />
      )}

      {/* 11. Settings */}
      {currentRoute === 'settings' && (
        <SettingsPage
          settings={state.settings}
          onUpdateSettings={updateSettings}
          onResetProgress={resetProgress}
          onExportProgress={exportProgressJson}
          onImportProgress={importProgressJson}
        />
      )}
    </Layout>
  );
}
export default App;
