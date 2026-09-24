import { Exercise } from '../../types/exercise';

export const sqlIntermediarioExercises: Exercise[] = [
  {
    id: 'sql-i-01',
    title: 'Agrupamento: GROUP BY por Categoria',
    track: 'sql',
    module: 'intermediario',
    topic: 'Agrupamentos (GROUP BY)',
    order: 1,
    difficulty: 'facil',
    format: 'code',
    datasetId: 'loja',
    description: 'Calcule a quantidade de produtos (`COUNT(*)`) e o preço médio (`AVG(preco)`) para cada `categoria` de produtos. Exiba a coluna `categoria`, a contagem e a média.',
    conceptExplanation: 'A cláusula `GROUP BY` agrupa linhas que possuem os mesmos valores em colunas específicas, permitindo aplicar funções agregadas como COUNT, SUM e AVG separadamente para cada grupo formado.',
    codeExample: 'SELECT departamento_id, COUNT(*) AS total_funcionarios\nFROM funcionarios\nGROUP BY departamento_id;',
    starterCode: '-- Agrupe por categoria e calcule COUNT(*) e AVG(preco):\n',
    solutionCode: 'SELECT categoria, COUNT(*) AS total_produtos, AVG(preco) AS preco_medio\nFROM produtos\nGROUP BY categoria;',
    hints: [
      'Coloque a coluna categoria no SELECT junto com as funções agregadas.',
      'Use GROUP BY categoria logo após o FROM produtos.',
      'Você pode usar AS para apelidar as colunas resultantes.'
    ],
    testCases: [
      {
        expectedOutput: '3 categorias: Eletrônicos (4 itens), Móveis (3 itens), Vestuário (1 item)',
        description: 'Retorna a contagem e média para cada categoria de produto.'
      }
    ],
    solutionBreakdown: {
      objective: 'Compreender o agrupamento de linhas com GROUP BY e métricas agregadas por grupo.',
      reasoning: 'O SQL particiona a tabela pelas chaves distintas da coluna `categoria` e calcula as métricas dentro de cada partição.',
      stepByStep: [
        '1. Selecionar a coluna de agrupamento `categoria`.',
        '2. Aplicar as funções agregadas `COUNT(*)` e `AVG(preco)`.',
        '3. Adicionar a cláusula `GROUP BY categoria;`.'
      ],
      finalCode: 'SELECT categoria, COUNT(*) AS total_produtos, AVG(preco) AS preco_medio\nFROM produtos\nGROUP BY categoria;',
      commonMistakes: [
        'Incluir colunas no SELECT que não estão no GROUP BY e não estão dentro de uma função agregada (o SQL não saberia qual valor da linha escolher).'
      ],
      realWorldApplication: 'Relatórios de vendas por setor, ticket médio por região e volume de tickets de suporte por categoria.'
    },
    xp: 20,
    tags: ['group_by', 'agrupamento', 'avg', 'count']
  },
  {
    id: 'sql-i-02',
    title: 'Filtro em Grupos: A Cláusula HAVING',
    track: 'sql',
    module: 'intermediario',
    topic: 'Filtro Agregado (HAVING)',
    order: 2,
    difficulty: 'medio',
    format: 'code',
    datasetId: 'loja',
    description: 'Encontre apenas as categorias que possuem mais de 2 produtos cadastrados (`COUNT(*) > 2`). Exiba a `categoria` e a quantidade (`COUNT(*)`).',
    conceptExplanation: 'REGRA FUNDAMENTAL DO SQL: O `WHERE` filtra linhas ANTES do agrupamento, e o `HAVING` filtra grupos DEPOIS do agrupamento! Como não podemos colocar funções como `COUNT(*)` no WHERE, usamos sempre `HAVING` para filtrar resultados agregados.',
    codeExample: 'SELECT cidade, COUNT(*) AS total\nFROM clientes\nGROUP BY cidade\nHAVING COUNT(*) >= 2;',
    starterCode: '-- Agrupe por categoria e use HAVING COUNT(*) > 2:\n',
    solutionCode: 'SELECT categoria, COUNT(*) AS total_produtos\nFROM produtos\nGROUP BY categoria\nHAVING COUNT(*) > 2;',
    hints: [
      'Agrupe por categoria com GROUP BY categoria.',
      'Logo após o GROUP BY, adicione: HAVING COUNT(*) > 2',
      'Lembre-se: nunca use WHERE com funções agregadas como COUNT ou SUM!'
    ],
    testCases: [
      {
        expectedOutput: 'Eletrônicos (4) e Móveis (3)',
        description: 'Apenas Eletrônicos e Móveis possuem mais de 2 produtos (Vestuário tem 1 e deve ser filtrado).'
      }
    ],
    solutionBreakdown: {
      objective: 'Diferenciar o filtro de linhas individuais (WHERE) do filtro de grupos consolidados (HAVING).',
      reasoning: 'O HAVING atua na tabela intermediária gerada após o cálculo do GROUP BY.',
      stepByStep: [
        '1. `SELECT categoria, COUNT(*) AS total_produtos`',
        '2. `FROM produtos`',
        '3. `GROUP BY categoria`',
        '4. `HAVING COUNT(*) > 2;`'
      ],
      finalCode: 'SELECT categoria, COUNT(*) AS total_produtos\nFROM produtos\nGROUP BY categoria\nHAVING COUNT(*) > 2;',
      commonMistakes: [
        'Tentar escrever `WHERE COUNT(*) > 2` (resulta em erro clássico de sintaxe: misuse of aggregate function).'
      ],
      realWorldApplication: 'Identificar clientes que compraram mais de 5 vezes (clientes VIP) ou lojas com faturamento acima da meta.'
    },
    xp: 25,
    tags: ['having', 'group_by', 'agregacao']
  },
  {
    id: 'sql-i-03',
    title: 'Junção de Tabelas: INNER JOIN',
    track: 'sql',
    module: 'intermediario',
    topic: 'Junções (INNER JOIN)',
    order: 3,
    difficulty: 'medio',
    format: 'code',
    datasetId: 'loja',
    description: 'Una a tabela de `pedidos` com a tabela de `clientes` para exibir o `id` do pedido, o `nome` do cliente, a `data_pedido` e o `total` do pedido.',
    conceptExplanation: 'Em bancos relacionais, os dados são divididos em tabelas para evitar redundância. O `INNER JOIN` junta duas tabelas conectando a chave estrangeira de uma com a chave primária da outra (`ON pedidos.cliente_id = clientes.id`). Ele só retorna os registros que possuem correspondência em ambas as tabelas.',
    codeExample: 'SELECT f.nome, d.nome AS departamento\nFROM funcionarios f\nINNER JOIN departamentos d ON f.departamento_id = d.id;',
    starterCode: '-- Junte pedidos com clientes usando INNER JOIN ON pedidos.cliente_id = clientes.id:\n',
    solutionCode: 'SELECT pedidos.id, clientes.nome, pedidos.data_pedido, pedidos.total\nFROM pedidos\nINNER JOIN clientes ON pedidos.cliente_id = clientes.id;',
    hints: [
      'Inicie com: FROM pedidos',
      'Faça o INNER JOIN clientes',
      'Defina a chave de ligação no ON: ON pedidos.cliente_id = clientes.id',
      'No SELECT, liste: pedidos.id, clientes.nome, pedidos.data_pedido, pedidos.total'
    ],
    testCases: [
      {
        expectedOutput: '8 pedidos com o nome do respectivo comprador',
        description: 'Exibe cada pedido associado ao nome do cliente correto.'
      }
    ],
    solutionBreakdown: {
      objective: 'Relacionar entidades distintas através de chaves primárias e estrangeiras.',
      reasoning: 'O motor de banco de dados cria um produto cartesiano condicional, casando os registros onde a igualdade do ON é satisfeita.',
      stepByStep: [
        '1. Definir a tabela base `FROM pedidos`.',
        '2. Conectar com `INNER JOIN clientes ON pedidos.cliente_id = clientes.id`.',
        '3. Selecionar as colunas qualificadas com o nome da tabela ou alias.',
        '4. Finalizar com `;`.'
      ],
      finalCode: 'SELECT pedidos.id, clientes.nome, pedidos.data_pedido, pedidos.total\nFROM pedidos\nINNER JOIN clientes ON pedidos.cliente_id = clientes.id;',
      alternativeSolutions: '-- Usando aliases curtos (p e c):\nSELECT p.id, c.nome, p.data_pedido, p.total\nFROM pedidos p\nJOIN clientes c ON p.cliente_id = c.id;',
      commonMistakes: [
        'Esquecer a cláusula ON, gerando um produto cartesiano (todas as linhas combinadas com todas).',
        'Inverter os campos da relação (ex: cliente_id com produto_id).'
      ],
      realWorldApplication: 'Geração de notas fiscais com nome do comprador, relatórios de expedição e dashboards analíticos unificados.'
    },
    xp: 30,
    tags: ['join', 'inner_join', 'relacionamentos']
  },
  {
    id: 'sql-i-04',
    title: 'Junção Externa: LEFT JOIN para Encontrar Não-Compradores',
    track: 'sql',
    module: 'intermediario',
    topic: 'Junções Externas (LEFT JOIN)',
    order: 4,
    difficulty: 'medio',
    format: 'code',
    datasetId: 'loja',
    description: 'Exiba o `nome` de TODOS os clientes e o `id` do pedido correspondente. Use `LEFT JOIN` para garantir que até os clientes que NUNCA fizeram nenhum pedido apareçam no resultado (o id do pedido deles virá como NULL).',
    conceptExplanation: 'O `LEFT JOIN` preserva TODAS as linhas da tabela da esquerda (a primeira declarada no FROM), mesmo que não haja nenhuma correspondência na tabela da direita. Quando não houver match, as colunas da direita são preenchidas com `NULL`.',
    codeExample: 'SELECT c.nome, p.id AS pedido_id\nFROM clientes c\nLEFT JOIN pedidos p ON c.id = p.cliente_id;',
    starterCode: '-- Use LEFT JOIN de clientes com pedidos:\n',
    solutionCode: 'SELECT clientes.nome, pedidos.id AS pedido_id\nFROM clientes\nLEFT JOIN pedidos ON clientes.id = pedidos.cliente_id;',
    hints: [
      'A tabela da esquerda deve ser clientes: FROM clientes',
      'Faça: LEFT JOIN pedidos ON clientes.id = pedidos.cliente_id',
      'Selecione clientes.nome e pedidos.id'
    ],
    testCases: [
      {
        expectedOutput: 'Todos os 8 clientes, incluindo Beatriz, Fernanda e Rodrigo com pedidos NULL ou preenchidos',
        description: 'Mostra todos os clientes preservados da tabela esquerda.'
      }
    ],
    solutionBreakdown: {
      objective: 'Compreender a preservação de registros sem correspondência usando junção externa à esquerda.',
      reasoning: 'O LEFT JOIN é essencial para auditorias onde queremos encontrar entidades "órfãs" ou clientes inativos que nunca compraram.',
      stepByStep: [
        '1. Escrever `SELECT clientes.nome, pedidos.id AS pedido_id`.',
        '2. Definir tabela principal: `FROM clientes`.',
        '3. Ligar com `LEFT JOIN pedidos ON clientes.id = pedidos.cliente_id;`.'
      ],
      finalCode: 'SELECT clientes.nome, pedidos.id AS pedido_id\nFROM clientes\nLEFT JOIN pedidos ON clientes.id = pedidos.cliente_id;',
      commonMistakes: [
        'Inverter a ordem das tabelas no FROM/JOIN e usar INNER JOIN por engano, omitindo os clientes que nunca compraram.'
      ],
      realWorldApplication: 'Identificar leads inativos que se cadastraram mas nunca compraram para campanhas de reativação por e-mail.'
    },
    xp: 30,
    tags: ['left_join', 'null', 'relacionamento']
  },
  {
    id: 'sql-i-05',
    title: 'Condicionais em SQL: CASE WHEN',
    track: 'sql',
    module: 'intermediario',
    topic: 'Condicionais (CASE WHEN)',
    order: 5,
    difficulty: 'medio',
    format: 'code',
    datasetId: 'loja',
    description: 'Crie uma coluna calculada chamada `faixa_preco` na tabela `produtos`: se o preço for maior que 500, classifique como "\'Caro\'"; se for entre 100 e 500, classifique como "\'Médio\'"; caso contrário, classifique como "\'Barato\'". Exiba o `nome`, o `preco` e a `faixa_preco`.',
    conceptExplanation: 'A estrutura `CASE WHEN condicao THEN valor ... ELSE outro_valor END` funciona como o if/elif/else do SQL. Ela cria colunas derivadas calculadas dinamicamente na consulta.',
    codeExample: 'SELECT nome, salario,\n  CASE\n    WHEN salario >= 10000 THEN \'Senior\'\n    WHEN salario >= 6000 THEN \'Pleno\'\n    ELSE \'Junior\'\n  END AS nivel\nFROM funcionarios;',
    starterCode: '-- Construa a expressão CASE WHEN para classificar os produtos:\n',
    solutionCode: 'SELECT nome, preco,\n  CASE\n    WHEN preco > 500 THEN \'Caro\'\n    WHEN preco >= 100 THEN \'Médio\'\n    ELSE \'Barato\'\n  END AS faixa_preco\nFROM produtos;',
    hints: [
      'Inicie a expressão com CASE e termine com END AS faixa_preco.',
      'Coloque WHEN preco > 500 THEN \'Caro\'',
      'Depois WHEN preco >= 100 THEN \'Médio\'',
      'No final, ELSE \'Barato\''
    ],
    testCases: [
      {
        expectedOutput: 'Produtos com nome, preco e a coluna faixa_preco (Caro, Médio ou Barato)',
        description: 'Categoriza corretamente os 8 produtos nas 3 faixas de preço.'
      }
    ],
    solutionBreakdown: {
      objective: 'Implementar lógica condicional em tempo de execução dentro de instruções SQL.',
      reasoning: 'O CASE é avaliado sequencialmente linha por linha no momento da projeção do SELECT.',
      stepByStep: [
        '1. Selecionar `nome, preco`.',
        '2. Iniciar bloco `CASE`.',
        '3. Testar condições com `WHEN ... THEN ...`.',
        '4. Fechar com `ELSE \'Barato\' END AS faixa_preco`.',
        '5. Indicar `FROM produtos;`.'
      ],
      finalCode: 'SELECT nome, preco,\n  CASE\n    WHEN preco > 500 THEN \'Caro\'\n    WHEN preco >= 100 THEN \'Médio\'\n    ELSE \'Barato\'\n  END AS faixa_preco\nFROM produtos;',
      commonMistakes: [
        'Esquecer a palavra-chave END no fechamento do bloco CASE.',
        'Esquecer as aspas simples nos textos de saída.'
      ],
      realWorldApplication: 'Segmentação de clientes (Bronze/Prata/Ouro), cálculo de faixas de imposto e status de SLA em chamados.'
    },
    xp: 30,
    tags: ['case_when', 'condicionais', 'coluna_calculada']
  }
];
