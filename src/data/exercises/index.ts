import { Exercise, TrackType, ModuleLevel, DifficultyLevel } from '../../types/exercise';
import { logicaBasicoExercises } from './logica-basico';
import { logicaIntermediarioExercises } from './logica-intermediario';
import { logicaAvancadoExercises } from './logica-avancado';
import { sqlBasicoExercises } from './sql-basico';
import { sqlIntermediarioExercises } from './sql-intermediario';
import { sqlAvancadoExercises } from './sql-avancado';

export const allExercises: Exercise[] = [
  ...logicaBasicoExercises,
  ...logicaIntermediarioExercises,
  ...logicaAvancadoExercises,
  ...sqlBasicoExercises,
  ...sqlIntermediarioExercises,
  ...sqlAvancadoExercises
];

export const getExercisesByTrack = (track: TrackType): Exercise[] => {
  return allExercises.filter(e => e.track === track);
};

export const getExercisesByModule = (track: TrackType, module: ModuleLevel): Exercise[] => {
  return allExercises.filter(e => e.track === track && e.module === module);
};

export const getExerciseById = (id: string): Exercise | undefined => {
  return allExercises.find(e => e.id === id);
};

export const getNextExercise = (currentId: string): Exercise | undefined => {
  const current = getExerciseById(currentId);
  if (!current) return undefined;
  const trackExercises = getExercisesByTrack(current.track);
  const currentIndex = trackExercises.findIndex(e => e.id === currentId);
  if (currentIndex !== -1 && currentIndex + 1 < trackExercises.length) {
    return trackExercises[currentIndex + 1];
  }
  return undefined;
};

export const getPreviousExercise = (currentId: string): Exercise | undefined => {
  const current = getExerciseById(currentId);
  if (!current) return undefined;
  const trackExercises = getExercisesByTrack(current.track);
  const currentIndex = trackExercises.findIndex(e => e.id === currentId);
  if (currentIndex > 0) {
    return trackExercises[currentIndex - 1];
  }
  return undefined;
};

export const getRandomDailyExercise = (level: number = 1): Exercise => {
  // Deterministic daily exercise based on day of year
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const diff = (now.getTime() - startOfYear.getTime()) + ((startOfYear.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);

  const pool = level > 3 ? allExercises : allExercises.filter(e => e.module === 'basico' || e.module === 'intermediario');
  const index = dayOfYear % pool.length;
  return pool[index] || allExercises[0];
};

export const filterPracticeExercises = (
  track?: TrackType | 'todos',
  topic?: string | 'todos',
  difficulty?: DifficultyLevel | 'todos',
  count: number = 5
): Exercise[] => {
  let filtered = [...allExercises];

  if (track && track !== 'todos') {
    filtered = filtered.filter(e => e.track === track);
  }
  if (topic && topic !== 'todos') {
    filtered = filtered.filter(e => e.topic === topic);
  }
  if (difficulty && difficulty !== 'todos') {
    filtered = filtered.filter(e => e.difficulty === difficulty);
  }

  // Shuffle and slice
  const shuffled = filtered.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const getAllTopics = (track?: TrackType): string[] => {
  const list = track ? getExercisesByTrack(track) : allExercises;
  return Array.from(new Set(list.map(e => e.topic)));
};
