import { Exercise } from '../../types/exercise';

export const sqlAvancadoExercises: Exercise[] = [
  {
    id: 'sql-a-01',
    title: 'Window Functions: ROW_NUMBER() e Particionamento',
    track: 'sql',
    module: 'avancado',
    topic: 'Window Functions (Funções de Janela)',
    order: 1,
    difficulty: 'dificil',
    format: 'code',
    datasetId: 'loja',
    description: 'Crie um ranking enumerando os produtos do mais caro para o mais barato dentro de cada categoria. Exiba `categoria`, `nome`, `preco` e a coluna `posicao_ranking` usando a função analítica `ROW_NUMBER() OVER(PARTITION BY categoria ORDER BY preco DESC)`.',
    conceptExplanation: 'Diferente do GROUP BY (que resume várias linhas em uma só), as Window Functions (Funções de Janela) calculam valores agregados ou de classificação mantendo TODAS as linhas individuais visíveis! A cláusula `PARTITION BY` cria mini-janelas isoladas para cada categoria e o `ORDER BY` ordena os itens dentro daquela janela.',
    codeExample: 'SELECT nome, departamento_id, salario,\n  ROW_NUMBER() OVER(PARTITION BY departamento_id ORDER BY salario DESC) AS rank_salario\nFROM funcionarios;',
    starterCode: '-- Use ROW_NUMBER() OVER(PARTITION BY categoria ORDER BY preco DESC):\n',
    solutionCode: 'SELECT categoria, nome, preco,\n  ROW_NUMBER() OVER(PARTITION BY categoria ORDER BY preco DESC) AS posicao_ranking\nFROM produtos;',
    hints: [
      'Use a sintaxe: ROW_NUMBER() OVER(...) AS posicao_ranking',
      'Dentro do OVER(), use PARTITION BY categoria para agrupar o ranking por categoria.',
      'Ordene os preços decrescentes dentro da janela: ORDER BY preco DESC'
    ],
    testCases: [
      {
        expectedOutput: '8 produtos ordenados com seu ranking 1, 2, 3... respectivo dentro de Eletrônicos e Móveis',
        description: 'Exibe o ranking correto de cada produto na sua categoria sem colapsar as linhas.'
      }
    ],
    solutionBreakdown: {
      objective: 'Dominar o cálculo analítico com funções de janela sem perda de granularidade de linha.',
      reasoning: 'O motor SQL avalia a função de janela no estágio final da consulta (após o WHERE), particionando o conjunto e aplicando o contador ordenado.',
      stepByStep: [
        '1. Selecionar `categoria, nome, preco`.',
        '2. Chamar a window function `ROW_NUMBER()`.',
        '3. Configurar a janela com `OVER(PARTITION BY categoria ORDER BY preco DESC) AS posicao_ranking`.',
        '4. Indicar `FROM produtos;`.'
      ],
      finalCode: 'SELECT categoria, nome, preco,\n  ROW_NUMBER() OVER(PARTITION BY categoria ORDER BY preco DESC) AS posicao_ranking\nFROM produtos;',
      commonMistakes: [
        'Esquecer a palavra OVER ou os parênteses da cláusula OVER().'
      ],
      realWorldApplication: 'Top 3 produtos mais vendidos por filial, o último pedido de cada cliente em um app, e algoritmos de deduplicação.'
    },
    xp: 40,
    tags: ['window_functions', 'row_number', 'partition_by', 'analitico']
  },
  {
    id: 'sql-a-02',
    title: 'Expressões de Tabela Comum: Cláusula WITH (CTEs)',
    track: 'sql',
    module: 'avancado',
    topic: 'Common Table Expressions (CTEs)',
    order: 2,
    difficulty: 'dificil',
    format: 'code',
    datasetId: 'loja',
    description: 'Crie uma CTE chamada `resumo_pedidos` que calcule o total gasto por cada cliente (`cliente_id`, `SUM(total) AS total_gasto`). Em seguida, faça um JOIN dessa CTE com a tabela `clientes` para exibir o `nome` do cliente e o `total_gasto` dos clientes que gastaram mais de R$ 500.',
    conceptExplanation: 'CTEs (`WITH nome_cte AS (...)`) permitem criar tabelas temporárias nomeadas que tornam queries complexas muito mais legíveis, modulares e fáceis de manter do que subqueries aninhadas confusas.',
    codeExample: 'WITH media_global AS (\n  SELECT AVG(preco) AS media FROM produtos\n)\nSELECT p.nome, p.preco\nFROM produtos p, media_global m\nWHERE p.preco > m.media;',
    starterCode: '-- 1. Crie a CTE resumo_pedidos:\nWITH resumo_pedidos AS (\n  SELECT cliente_id, SUM(total) AS total_gasto\n  FROM pedidos\n  GROUP BY cliente_id\n)\n-- 2. Faça o SELECT unindo resumo_pedidos com clientes onde total_gasto > 500:\n',
    solutionCode: 'WITH resumo_pedidos AS (\n  SELECT cliente_id, SUM(total) AS total_gasto\n  FROM pedidos\n  GROUP BY cliente_id\n)\nSELECT clientes.nome, resumo_pedidos.total_gasto\nFROM clientes\nINNER JOIN resumo_pedidos ON clientes.id = resumo_pedidos.cliente_id\nWHERE resumo_pedidos.total_gasto > 500;',
    hints: [
      'Inicie com WITH resumo_pedidos AS (...)',
      'Dentro do parêntese, agrupe pedidos por cliente_id e some o total.',
      'Após fechar o parêntese da CTE, escreva o SELECT unindo clientes e resumo_pedidos no cliente_id.',
      'Filtre com WHERE resumo_pedidos.total_gasto > 500.'
    ],
    testCases: [
      {
        expectedOutput: 'Clientes de alto valor: Carlos Eduardo (1770.0), Julia Pereira (780.0), Beatriz Lima (1770.0), Marcos Santos (570.0)',
        description: 'Retorna apenas os clientes com gasto total consolidado acima de 500.'
      }
    ],
    solutionBreakdown: {
      objective: 'Modularizar pipelines de consulta complexos com Common Table Expressions (WITH).',
      reasoning: 'A CTE pré-calcula a métrica agregada por cliente e atua como uma tabela virtual limpa para o join subsequente.',
      stepByStep: [
        '1. Declarar a CTE `WITH resumo_pedidos AS (...)`.',
        '2. No corpo da CTE, agrupar por `cliente_id` com `SUM(total)`.',
        '3. No SELECT principal, juntar `clientes` com a CTE `resumo_pedidos`.',
        '4. Aplicar o filtro `WHERE total_gasto > 500;`.'
      ],
      finalCode: 'WITH resumo_pedidos AS (\n  SELECT cliente_id, SUM(total) AS total_gasto\n  FROM pedidos\n  GROUP BY cliente_id\n)\nSELECT clientes.nome, resumo_pedidos.total_gasto\nFROM clientes\nINNER JOIN resumo_pedidos ON clientes.id = resumo_pedidos.cliente_id\nWHERE resumo_pedidos.total_gasto > 500;',
      commonMistakes: [
        'Colocar vírgula ou ponto e vírgula antes de iniciar a query principal que consome a CTE.'
      ],
      realWorldApplication: 'ETL em Data Warehouses (BigQuery, Snowflake, Redshift), pipelines analíticos de métricas financeiras (LTV, CAC, Churn).'
    },
    xp: 40,
    tags: ['cte', 'with', 'sql_avancado', 'data_engineering']
  }
];
