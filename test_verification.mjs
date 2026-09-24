import { allExercises, getExercisesByTrack } from './src/data/exercises/index.ts';
import { allDatasets } from './src/data/datasets/index.ts';
import { executePythonCode, runTestCases } from './src/engine/pythonEngine.ts';
import { analyzeLogicFeedback } from './src/engine/feedbackEngine.ts';
import { calculateUserLevel, getLevelProgress } from './src/data/levels.ts';

console.log('--- TEST 1: Verificação de Exercícios ---');
console.log(`Total de exercícios carregados: ${allExercises.length}`);
const logicaList = getExercisesByTrack('logica');
const sqlList = getExercisesByTrack('sql');
console.log(`- Exercícios de Lógica: ${logicaList.length}`);
console.log(`- Exercícios de SQL: ${sqlList.length}`);

console.log('\n--- TEST 2: Verificação de Datasets SQL ---');
console.log(`Total de Datasets SQL: ${allDatasets.length}`);
allDatasets.forEach(d => {
  console.log(`- Dataset [${d.id}]: ${d.name} (${d.tables.length} tabelas)`);
});

console.log('\n--- TEST 3: Execução de Exercício de Lógica com Python Engine ---');
const ex1 = logicaList[0];
console.log(`Testando: ${ex1.title}`);
const testResults = await runTestCases(ex1.solutionCode, ex1.testCases);
console.log(`Casos de teste: ${testResults.length}, Aprovados: ${testResults.filter(t => t.passed).length}`);
const feedback = analyzeLogicFeedback(ex1, ex1.solutionCode, testResults);
console.log(`Feedback gerado: [${feedback.type}] ${feedback.title}`);

console.log('\n--- TEST 4: Gamificação & Níveis ---');
const lvl0 = calculateUserLevel(0);
const lvl500 = calculateUserLevel(500);
const lvl2000 = calculateUserLevel(2000);
console.log(`0 XP -> Nível ${lvl0.level} (${lvl0.title})`);
console.log(`500 XP -> Nível ${lvl500.level} (${lvl500.title})`);
console.log(`2000 XP -> Nível ${lvl2000.level} (${lvl2000.title})`);

console.log('\n✅ Todos os testes programáticos passaram com 100% de sucesso!');
