export type TrackType = 'logica' | 'sql';

export type DifficultyLevel = 'facil' | 'medio' | 'dificil';

export type ModuleLevel = 'basico' | 'intermediario' | 'avancado';

export type ExerciseFormat = 
  | 'code'            // Escrever código/query do zero
  | 'bug_fix'         // Corrigir código com erro
  | 'fill_blank'       // Preencher lacunas
  | 'predict_output'  // Prever o resultado da execução
  | 'quiz'            // Múltipla escolha conceitual
  | 'project';        // Projeto Capstone integrador

export interface TestCase {
  id?: string;
  input?: string | number | any[];
  expectedOutput: string | number | boolean | any[] | Record<string, any>;
  description: string;
  hidden?: boolean;
}

export interface MultipleChoiceOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface SolutionBreakdown {
  objective: string;
  reasoning: string;
  stepByStep: string[];
  finalCode: string;
  alternativeSolutions?: string;
  commonMistakes: string[];
  realWorldApplication: string;
}

export interface Exercise {
  id: string;
  title: string;
  track: TrackType;
  module: ModuleLevel;
  topic: string;
  order: number;
  difficulty: DifficultyLevel;
  format: ExerciseFormat;
  description: string;
  conceptExplanation: string;
  codeExample?: string;
  starterCode: string;
  solutionCode: string;
  hints: string[]; // Dica 1, Dica 2, Dica 3
  testCases: TestCase[];
  multipleChoiceOptions?: MultipleChoiceOption[];
  blanksTemplate?: string;
  blankAnswers?: string[];
  solutionBreakdown: SolutionBreakdown;
  xp: number;
  datasetId?: string; // Para exercícios SQL (ex: 'loja', 'universidade', 'streaming', 'empresa', 'redesocial')
  tags?: string[];
}

export interface ModuleInfo {
  id: ModuleLevel;
  track: TrackType;
  title: string;
  description: string;
  topics: string[];
  capstoneTitle: string;
  requiredXpToUnlock?: number;
}
