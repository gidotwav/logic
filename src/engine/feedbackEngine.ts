import { Exercise } from '../types/exercise';
import { TestRunResult } from './pythonEngine';
import { QueryResult } from '../types/database';

export interface IntelligentFeedback {
  type: 'success' | 'warning' | 'tip' | 'error';
  title: string;
  message: string;
  suggestedAction?: string;
  relatedHintIndex?: number;
}

/**
 * Generates intelligent, encouraging, educational feedback for Logic / Python exercises
 */
export function analyzeLogicFeedback(
  exercise: Exercise,
  userCode: string,
  testResults: TestRunResult[]
): IntelligentFeedback {
  const allPassed = testResults.length > 0 && testResults.every(t => t.passed);
  if (allPassed) {
    return {
      type: 'success',
      title: '🎉 Incrível! Todos os testes passaram!',
      message: `Você dominou o conceito de "${exercise.topic}". Continue avançando na trilha!`
    };
  }

  const trimmed = userCode.trim();

  // 1. Empty Code
  if (!trimmed) {
    return {
      type: 'warning',
      title: 'Editor vazio',
      message: 'Escreva sua solução antes de executar os testes. Leia a mini explicação e os exemplos ao lado para começar!',
      relatedHintIndex: 0
    };
  }

  // 2. Syntax/Runtime error detected in first test
  const failingWithErr = testResults.find(t => !!t.error);
  if (failingWithErr && failingWithErr.error) {
    const err = failingWithErr.error;
    if (err.includes('Indentação') || err.includes('IndentationError')) {
      return {
        type: 'error',
        title: 'Atenção aos espaços (Indentação)',
        message: 'Em Python, o código dentro de estruturas como "if", "for", "while" ou "def" precisa estar alinhado com 4 espaços à direita.',
        suggestedAction: 'Verifique se você colocou o recuo (indentação) correto após os dois-pontos (:).'
      };
    }
    if (err.includes('dois-pontos') || err.includes('SyntaxError')) {
      return {
        type: 'error',
        title: 'Verifique a pontuação do código',
        message: 'Lembre-se que em Python toda linha com if, elif, else, for, while e def precisa terminar com dois-pontos (:).',
        suggestedAction: 'Confira o final das suas linhas de controle.'
      };
    }
    return {
      type: 'error',
      title: 'Ops! Ocorreu um erro durante a execução',
      message: failingWithErr.error,
      suggestedAction: 'Leia a mensagem acima para corrigir a linha indicada.'
    };
  }

  // 3. Partial test failure analysis (e.g. 2 of 3 passed)
  const passedCount = testResults.filter(t => t.passed).length;
  const firstFailed = testResults.find(t => !t.passed);

  if (passedCount > 0 && firstFailed) {
    // Check for off-by-one loop error
    if (userCode.includes('range(')) {
      return {
        type: 'tip',
        title: 'Você está quase lá! Atenção aos limites do range()',
        message: `Seu código funcionou em ${passedCount} de ${testResults.length} testes. Lembre-se que range(1, 10) vai de 1 até 9 (o último número é exclusivo). Para incluir o número 10, use range(1, 11).`,
        relatedHintIndex: 1
      };
    }

    // Check for comparison operator issue (e.g. > vs >=)
    if (userCode.includes('>') || userCode.includes('<')) {
      return {
        type: 'tip',
        title: 'Quase perfeito! Verifique os valores limite',
        message: `Seu código passou na maioria dos casos, mas falhou quando a entrada foi "${JSON.stringify(firstFailed.testCase.input)}". Observe se a regra pede maior que (>) ou maior ou igual (>=).`,
        relatedHintIndex: 1
      };
    }

    return {
      type: 'tip',
      title: 'Muito perto!',
      message: `Você acertou ${passedCount} de ${testResults.length} casos de teste. O teste que falhou esperava "${JSON.stringify(firstFailed.expectedOutput)}" mas seu código produziu "${JSON.stringify(firstFailed.actualOutput)}".`,
      relatedHintIndex: 1
    };
  }

  // 4. Zero tests passed - Concept guidance
  if (exercise.topic.toLowerCase().includes('condiç') && !userCode.includes('if')) {
    return {
      type: 'tip',
      title: 'Dica pedagógica: Estrutura de Decisão',
      message: 'Este problema requer uma tomada de decisão. Tente utilizar a estrutura "if" para testar a condição solicitada.',
      relatedHintIndex: 0
    };
  }

  if (exercise.topic.toLowerCase().includes('loop') && !userCode.includes('for') && !userCode.includes('while')) {
    return {
      type: 'tip',
      title: 'Dica pedagógica: Estrutura de Repetição',
      message: 'Para resolver este exercício de forma automática sem repetir código manualmente, use um laço "for" ou "while".',
      relatedHintIndex: 0
    };
  }

  return {
    type: 'warning',
    title: 'Resultado diferente do esperado',
    message: firstFailed 
      ? `Esperado: "${JSON.stringify(firstFailed.expectedOutput)}". Resultado obtido: "${JSON.stringify(firstFailed.actualOutput)}". Reveja o raciocínio passo a passo!`
      : 'Revise o enunciado e tente novamente.',
    relatedHintIndex: 0
  };
}

/**
 * Generates intelligent educational feedback for SQL queries
 */
export function analyzeSqlFeedback(
  exercise: Exercise,
  userQuery: string,
  userResult: QueryResult,
  expectedResult?: QueryResult
): IntelligentFeedback {
  if (userResult.error) {
    return {
      type: 'error',
      title: 'Erro na consulta SQL',
      message: userResult.error,
      suggestedAction: 'Verifique se os nomes das tabelas e colunas estão exatamente como descritos na aba Banco de Dados.'
    };
  }

  const queryUpper = userQuery.toUpperCase();

  // Check if expected columns match
  if (expectedResult && expectedResult.columns.length > 0) {
    const userCols = userResult.columns.map(c => c.toLowerCase());
    const expCols = expectedResult.columns.map(c => c.toLowerCase());

    const missingCols = expCols.filter(c => !userCols.includes(c));
    if (missingCols.length > 0 && !queryUpper.includes('*')) {
      return {
        type: 'warning',
        title: 'Colunas incorretas ou ausentes',
        message: `Sua consulta retornou as colunas [${userResult.columns.join(', ')}], mas o exercício solicita: [${expectedResult.columns.join(', ')}].`,
        suggestedAction: 'Ajuste a lista de colunas logo após a palavra SELECT.'
      };
    }

    // Check row counts
    if (userResult.values.length !== expectedResult.values.length) {
      if (userResult.values.length > expectedResult.values.length) {
        return {
          type: 'tip',
          title: 'Muitos registros retornados',
          message: `Sua consulta retornou ${userResult.values.length} linhas, mas o esperado eram ${expectedResult.values.length} linhas. Você esqueceu de aplicar um filtro com WHERE ou uma cláusula LIMIT?`,
          relatedHintIndex: 0
        };
      } else {
        return {
          type: 'tip',
          title: 'Poucos registros retornados',
          message: `Sua consulta retornou ${userResult.values.length} linhas, enquanto o esperado eram ${expectedResult.values.length} linhas. O filtro do seu WHERE pode estar restritivo demais ou com condição invertida.`,
          relatedHintIndex: 1
        };
      }
    }
  }

  return {
    type: 'success',
    title: '🎉 Consulta executada com perfeição!',
    message: 'Seus dados correspondem exatamente ao resultado esperado pelo exercício.'
  };
}
