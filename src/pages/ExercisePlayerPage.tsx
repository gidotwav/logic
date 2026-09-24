import React, { useState, useEffect } from 'react';
import { Exercise } from '../types/exercise';
import { ExerciseHeader } from '../components/exercise/ExerciseHeader';
import { ConceptExplanation } from '../components/exercise/ConceptExplanation';
import { HintAccordion } from '../components/exercise/HintAccordion';
import { SolutionExplanationModal } from '../components/exercise/SolutionExplanationModal';
import { TestCasesRunner } from '../components/exercise/TestCasesRunner';
import { IntelligentFeedbackAlert } from '../components/exercise/IntelligentFeedbackAlert';
import { CodeEditor } from '../components/editor/CodeEditor';
import { SqlResultsTable } from '../components/editor/SqlResultsTable';
import { SchemaViewer } from '../components/editor/SchemaViewer';
import { OutputConsole } from '../components/editor/OutputConsole';
import { Tabs } from '../components/common/Tabs';
import { Button } from '../components/common/Button';
import { executePythonCode, runTestCases, TestRunResult, ExecutionResult } from '../engine/pythonEngine';
import { executeSqlQuery } from '../engine/sqlEngine';
import { analyzeLogicFeedback, analyzeSqlFeedback, IntelligentFeedback } from '../engine/feedbackEngine';
import { getDatasetById } from '../data/datasets';
import { QueryResult } from '../types/database';
import { fireSuccessConfetti } from '../components/common/Confetti';
import { BookOpen, Lightbulb, Database, Play, CheckCircle2, ArrowRight, Terminal, Table } from 'lucide-react';

export interface ExercisePlayerPageProps {
  exercise: Exercise;
  isCompleted: boolean;
  onComplete: (exercise: Exercise, userCode: string, attempts: number) => { earnedXp: number; isFirstCompletion: boolean };
  onLogMistake: (exercise: Exercise, errorType: string, msg: string, code: string) => void;
  onNavigateNext: () => void;
  onNavigatePrevious: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
  playSuccessSound: () => void;
  playErrorSound: () => void;
}

export const ExercisePlayerPage: React.FC<ExercisePlayerPageProps> = ({
  exercise,
  isCompleted,
  onComplete,
  onLogMistake,
  onNavigateNext,
  onNavigatePrevious,
  hasPrevious,
  hasNext,
  playSuccessSound,
  playErrorSound
}) => {
  const isSql = exercise.track === 'sql';
  const dataset = getDatasetById(exercise.datasetId);

  const [userCode, setUserCode] = useState<string>(exercise.starterCode);
  const [leftTab, setLeftTab] = useState<string>('concept');
  const [rightTab, setRightTab] = useState<string>(isSql ? 'results' : 'tests');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSolutionModalOpen, setIsSolutionModalOpen] = useState<boolean>(false);
  const [attempts, setAttempts] = useState<number>(0);

  // Results State
  const [pythonTestResults, setPythonTestResults] = useState<TestRunResult[]>([]);
  const [pythonConsoleResult, setPythonConsoleResult] = useState<ExecutionResult | null>(null);
  const [sqlQueryResult, setSqlQueryResult] = useState<QueryResult | null>(null);
  const [intelligentFeedback, setIntelligentFeedback] = useState<IntelligentFeedback | null>(null);
  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(false);

  // Reset state when exercise changes
  useEffect(() => {
    setUserCode(exercise.starterCode);
    setLeftTab('concept');
    setRightTab(isSql ? 'results' : 'tests');
    setPythonTestResults([]);
    setPythonConsoleResult(null);
    setSqlQueryResult(null);
    setIntelligentFeedback(null);
    setShowSuccessBanner(false);
    setAttempts(0);
  }, [exercise.id, isSql]);

  // Execute Code / Query
  const handleRun = async () => {
    setIsLoading(true);
    setIntelligentFeedback(null);
    setShowSuccessBanner(false);
    const currentAttempt = attempts + 1;
    setAttempts(currentAttempt);

    if (isSql) {
      try {
        // Run SQL query on current dataset
        const queryResult = await executeSqlQuery(userCode, exercise.datasetId);
        setSqlQueryResult(queryResult);
        setRightTab('results');

        // Execute solution code to compare expected rows
        const expectedResult = await executeSqlQuery(exercise.solutionCode, exercise.datasetId);
        
        // Generate feedback
        const feedback = analyzeSqlFeedback(exercise, userCode, queryResult, expectedResult);
        setIntelligentFeedback(feedback);

        // Check if query is correct
        const isQuerySuccessful = !queryResult.error && 
          queryResult.values.length > 0 && 
          queryResult.values.length === expectedResult.values.length &&
          (!expectedResult.columns || queryResult.columns.length === expectedResult.columns.length);

        if (isQuerySuccessful) {
          playSuccessSound();
          fireSuccessConfetti();
          setShowSuccessBanner(true);
          onComplete(exercise, userCode, currentAttempt);
        } else {
          playErrorSound();
          onLogMistake(exercise, 'SQL_QUERY_MISMATCH', queryResult.error || 'Resultado diferente do esperado', userCode);
        }
      } catch (err: any) {
        playErrorSound();
        onLogMistake(exercise, 'SQL_ERROR', String(err), userCode);
      } finally {
        setIsLoading(false);
      }
    } else {
      // Run Python / Logic Exercise
      try {
        // Run console standalone
        const consoleRes = await executePythonCode(userCode);
        setPythonConsoleResult(consoleRes);

        // Run automated test suite
        const testRes = await runTestCases(userCode, exercise.testCases);
        setPythonTestResults(testRes);
        setRightTab('tests');

        // Analyze feedback
        const feedback = analyzeLogicFeedback(exercise, userCode, testRes);
        setIntelligentFeedback(feedback);

        const allPassed = testRes.length > 0 && testRes.every(t => t.passed);
        if (allPassed) {
          playSuccessSound();
          fireSuccessConfetti();
          setShowSuccessBanner(true);
          onComplete(exercise, userCode, currentAttempt);
        } else {
          playErrorSound();
          const firstFail = testRes.find(t => !t.passed);
          onLogMistake(
            exercise, 
            firstFail?.error ? 'PYTHON_RUNTIME_ERROR' : 'TEST_ASSERTION_FAILED', 
            firstFail?.error || 'Casos de teste não passaram', 
            userCode
          );
        }
      } catch (err: any) {
        playErrorSound();
        onLogMistake(exercise, 'PYTHON_EXECUTION_ERROR', String(err), userCode);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const leftTabsList = [
    { id: 'concept', label: 'Conceito & Desafio', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'hints', label: 'Dicas Progressivas', icon: <Lightbulb className="w-4 h-4" />, badge: exercise.hints.length },
    ...(isSql ? [{ id: 'database', label: 'Banco de Dados', icon: <Database className="w-4 h-4" /> }] : [])
  ];

  const rightTabsList = isSql
    ? [
        { id: 'results', label: 'Resultado da Consulta', icon: <Table className="w-4 h-4" /> },
        { id: 'schema', label: 'Esquema do Banco', icon: <Database className="w-4 h-4" /> }
      ]
    : [
        { id: 'tests', label: 'Casos de Teste', icon: <CheckCircle2 className="w-4 h-4" />, badge: exercise.testCases.length },
        { id: 'console', label: 'Terminal de Saída', icon: <Terminal className="w-4 h-4" /> }
      ];

  return (
    <div className="space-y-6 animate-pop-in">
      {/* Exercise Top Header */}
      <ExerciseHeader
        exercise={exercise}
        isCompleted={isCompleted}
        onPrevious={onNavigatePrevious}
        onNext={onNavigateNext}
        hasPrevious={hasPrevious}
        hasNext={hasNext}
      />

      {/* Main Split Cockpit View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Concept, Hints & Feedback (5 cols on lg) */}
        <div className="lg:col-span-5 space-y-4">
          <Tabs
            tabs={leftTabsList}
            activeTab={leftTab}
            onChange={setLeftTab}
          />

          {leftTab === 'concept' && (
            <ConceptExplanation
              description={exercise.description}
              conceptExplanation={exercise.conceptExplanation}
              codeExample={exercise.codeExample}
              language={exercise.track === 'sql' ? 'sql' : 'python'}
            />
          )}

          {leftTab === 'hints' && (
            <HintAccordion
              hints={exercise.hints}
              onOpenSolution={() => setIsSolutionModalOpen(true)}
            />
          )}

          {leftTab === 'database' && isSql && (
            <SchemaViewer dataset={dataset} />
          )}

          {/* Dynamic Pedagogical Feedback Alert */}
          {intelligentFeedback && (
            <IntelligentFeedbackAlert feedback={intelligentFeedback} />
          )}
        </div>

        {/* Right Column: Code Editor & Execution Results (7 cols on lg) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Code Editor */}
          <CodeEditor
            code={userCode}
            onChange={setUserCode}
            onRun={handleRun}
            language={isSql ? 'sql' : 'python'}
            isLoading={isLoading}
            starterCode={exercise.starterCode}
            height="320px"
          />

          {/* Success Banner when all tests pass */}
          {showSuccessBanner && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg flex items-center justify-between animate-pop-in">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-emerald-100" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm">Excelente trabalho! Exercício Concluído!</h4>
                  <p className="text-xs text-emerald-100 mt-0.5">Você ganhou +{exercise.xp} XP e avançou na sua trilha.</p>
                </div>
              </div>

              {hasNext && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={onNavigateNext}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  className="font-bold shadow-sm whitespace-nowrap bg-white text-emerald-700 hover:bg-emerald-50"
                >
                  Próximo Exercício
                </Button>
              )}
            </div>
          )}

          {/* Execution Outputs & Tabs */}
          <div className="space-y-3">
            <Tabs
              tabs={rightTabsList}
              activeTab={rightTab}
              onChange={setRightTab}
            />

            {/* SQL Results Table */}
            {isSql && rightTab === 'results' && (
              <SqlResultsTable result={sqlQueryResult} isLoading={isLoading} />
            )}

            {/* SQL Schema Inspector */}
            {isSql && rightTab === 'schema' && (
              <SchemaViewer dataset={dataset} />
            )}

            {/* Python Automated Tests View */}
            {!isSql && rightTab === 'tests' && (
              <TestCasesRunner testResults={pythonTestResults} isLoading={isLoading} />
            )}

            {/* Python Terminal Stdout View */}
            {!isSql && rightTab === 'console' && (
              <OutputConsole result={pythonConsoleResult} isLoading={isLoading} />
            )}
          </div>
        </div>
      </div>

      {/* Didactic Solution Explanation Modal */}
      <SolutionExplanationModal
        isOpen={isSolutionModalOpen}
        onClose={() => setIsSolutionModalOpen(false)}
        solution={exercise.solutionBreakdown}
        title={exercise.title}
        language={exercise.track === 'sql' ? 'sql' : 'python'}
      />
    </div>
  );
};
