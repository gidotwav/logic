import { Exercise } from '../../types/exercise';

export const sqlBasicoExercises: Exercise[] = [
  {
    id: 'sql-b-01',
    title: 'Sua Primeira Consulta: SELECT *',
    track: 'sql',
    module: 'basico',
    topic: 'SELECT & FROM',
    order: 1,
    difficulty: 'facil',
    format: 'code',
    datasetId: 'loja',
    description: 'Escreva uma consulta SQL para selecionar todas as colunas e todas as linhas da tabela `clientes`.',
    conceptExplanation: 'Em SQL, a instrução `SELECT` é usada para buscar dados de uma tabela. O asterisco (`*`) é um caractere curinga que significa "traga todas as colunas". A cláusula `FROM` especifica de qual tabela os dados devem ser lidos.',
    codeExample: 'SELECT *\nFROM produtos;',
    starterCode: '-- Escreva sua consulta SQL abaixo:\n',
    solutionCode: 'SELECT *\nFROM clientes;',
    hints: [
      'Utilize a palavra-chave SELECT seguida de * para todas as colunas.',
      'Utilize a cláusula FROM para indicar a tabela clientes.',
      'Finalize sua consulta com um ponto e vírgula (;).'
    ],
    testCases: [
      {
        expectedOutput: '8 linhas retornadas com colunas id, nome, email, cidade, estado, data_cadastro',
        description: 'Deve retornar todos os 8 clientes da loja com todas as 6 colunas.'
      }
    ],
    solutionBreakdown: {
      objective: 'Aprender a estrutura fundamental de leitura de tabelas em bancos de dados relacionais.',
      reasoning: 'O motor SQL avalia primeiro o `FROM` para abrir a tabela no disco ou memória, e em seguida projeta as colunas indicadas no `SELECT`.',
      stepByStep: [
        '1. Digitar `SELECT *` para indicar que queremos todas as colunas.',
        '2. Pular de linha ou dar espaço e digitar `FROM clientes`.',
        '3. Adicionar `;` no final para fechar a instrução.'
      ],
      finalCode: 'SELECT *\nFROM clientes;',
      commonMistakes: [
        'Digitar o nome da tabela no singular (cliente) em vez do plural (clientes).',
        'Esquecer a palavra FROM entre o SELECT e o nome da tabela.'
      ],
      realWorldApplication: 'Exploração inicial de novos bancos de dados, inspeção de dados em ferramentas como DBeaver, pgAdmin e Workbench.'
    },
    xp: 10,
    tags: ['select', 'from', 'basico']
  },
  {
    id: 'sql-b-02',
    title: 'Selecionando Colunas Específicas',
    track: 'sql',
    module: 'basico',
    topic: 'Projeção de Colunas',
    order: 2,
    difficulty: 'facil',
    format: 'code',
    datasetId: 'loja',
    description: 'Selecione apenas o `nome`, o `preco` e o `estoque` de todos os itens da tabela `produtos`.',
    conceptExplanation: 'Em bancos de produção com milhões de linhas, trazer todas as colunas com `SELECT *` é ineficiente e consome muita rede e memória. É uma boa prática listar apenas as colunas necessárias separadas por vírgula.',
    codeExample: 'SELECT nome, preco\nFROM produtos;',
    starterCode: '-- Selecione apenas nome, preco e estoque da tabela produtos:\n',
    solutionCode: 'SELECT nome, preco, estoque\nFROM produtos;',
    hints: [
      'Substitua o * pela lista de colunas separadas por vírgula: nome, preco, estoque.',
      'Indique a tabela correta com FROM produtos.',
      'Não coloque vírgula após a última coluna antes do FROM.'
    ],
    testCases: [
      {
        expectedOutput: '8 produtos com colunas nome, preco e estoque',
        description: 'Deve retornar exatamente as 3 colunas solicitadas para os 8 produtos.'
      }
    ],
    solutionBreakdown: {
      objective: 'Projetar apenas os campos relevantes para a análise.',
      reasoning: 'Reduz o tráfego de I/O e melhora a velocidade de execução da consulta.',
      stepByStep: [
        '1. Escrever `SELECT nome, preco, estoque`.',
        '2. Especificar a fonte: `FROM produtos`.',
        '3. Finalizar com `;`.'
      ],
      finalCode: 'SELECT nome, preco, estoque\nFROM produtos;',
      commonMistakes: [
        'Colocar uma vírgula extra depois de estoque (`SELECT nome, preco, estoque, FROM...`).'
      ],
      realWorldApplication: 'Construção de feeds de e-commerce, listagem de produtos no aplicativo mobile e cards de vitrine virtual.'
    },
    xp: 10,
    tags: ['select', 'colunas', 'projecao']
  },
  {
    id: 'sql-b-03',
    title: 'Filtrando com WHERE: Clientes de São Paulo',
    track: 'sql',
    module: 'basico',
    topic: 'Filtros com WHERE',
    order: 3,
    difficulty: 'facil',
    format: 'code',
    datasetId: 'loja',
    description: 'Encontre todos os clientes que residem no estado de São Paulo (`estado = \'SP\'`). Traga todas as colunas.',
    conceptExplanation: 'A cláusula `WHERE` permite filtrar linhas com base em uma condição. Textos (strings) em SQL devem estar sempre envolvidos por aspas simples (\'SP\'). Apenas as linhas em que a condição for Verdadeira serão retornadas.',
    codeExample: 'SELECT *\nFROM clientes\nWHERE cidade = \'Curitiba\';',
    starterCode: '-- Selecione os clientes com estado = \'SP\':\n',
    solutionCode: 'SELECT *\nFROM clientes\nWHERE estado = \'SP\';',
    hints: [
      'Adicione a cláusula WHERE logo após o FROM clientes.',
      'A condição deve ser: estado = \'SP\' (use aspas simples para o texto SP).',
      'Não use aspas duplas no valor do texto em SQL padrão.'
    ],
    testCases: [
      {
        expectedOutput: '2 clientes de SP (Ana Silva e Marcos Santos)',
        description: 'Deve retornar os 2 clientes cadastrados com estado SP.'
      }
    ],
    solutionBreakdown: {
      objective: 'Aplicar filtros de linhas em dados textuais com a cláusula WHERE.',
      reasoning: 'O banco de dados escaneia as linhas e só repassa para a saída aquelas em que a coluna `estado` coincide com a string fornecida.',
      stepByStep: [
        '1. `SELECT *`',
        '2. `FROM clientes`',
        '3. `WHERE estado = \'SP\';`'
      ],
      finalCode: 'SELECT *\nFROM clientes\nWHERE estado = \'SP\';',
      commonMistakes: [
        'Esquecer as aspas no valor textual (`WHERE estado = SP` fará o SQL achar que SP é uma coluna!).',
        'Usar dois iguais (`==`) como no Python. Em SQL, comparação de igualdade usa apenas um igual (`=`).'
      ],
      realWorldApplication: 'Filtros geográficos para envio de campanhas de marketing regionalizadas e cálculo de fretes.'
    },
    xp: 15,
    tags: ['where', 'filtro', 'strings']
  },
  {
    id: 'sql-b-04',
    title: 'Filtros Numéricos e Operador AND',
    track: 'sql',
    module: 'basico',
    topic: 'Operadores Lógicos (AND, OR)',
    order: 4,
    difficulty: 'medio',
    format: 'code',
    datasetId: 'loja',
    description: 'Selecione o `nome`, a `categoria` e o `preco` dos produtos que pertencem à categoria `\'Eletrônicos\'` E que custam mais de R$ 300 (`preco > 300`).',
    conceptExplanation: 'Podemos combinar múltiplos critérios no `WHERE` usando o operador lógico `AND` (ambas as condições devem ser verdadeiras) ou `OR` (pelo menos uma das condições deve ser verdadeira).',
    codeExample: 'SELECT nome, preco\nFROM produtos\nWHERE categoria = \'Móveis\' AND preco < 500;',
    starterCode: '-- Selecione nome, categoria, preco de Eletrônicos com preco > 300:\n',
    solutionCode: 'SELECT nome, categoria, preco\nFROM produtos\nWHERE categoria = \'Eletrônicos\' AND preco > 300;',
    hints: [
      'Projete as colunas: SELECT nome, categoria, preco',
      'No WHERE, use AND para unir as duas condições.',
      'A condição fica: categoria = \'Eletrônicos\' AND preco > 300'
    ],
    testCases: [
      {
        expectedOutput: '2 produtos (Monitor Gamer 27" por 1450.0 e Headset Gamer 7.1 por 320.0)',
        description: 'Retorna os eletrônicos com preço estritamente superior a 300.'
      }
    ],
    solutionBreakdown: {
      objective: 'Combinar filtros textuais e numéricos com conjunção lógica (AND).',
      reasoning: 'O otimizador SQL só inclui na resposta as linhas que satisfazem simultaneamente a igualdade categórica e a desigualdade numérica.',
      stepByStep: [
        '1. Escrever `SELECT nome, categoria, preco`.',
        '2. Definir a tabela `FROM produtos`.',
        '3. Aplicar a condição composta `WHERE categoria = \'Eletrônicos\' AND preco > 300;`.'
      ],
      finalCode: 'SELECT nome, categoria, preco\nFROM produtos\nWHERE categoria = \'Eletrônicos\' AND preco > 300;',
      commonMistakes: [
        'Colocar aspas no número 300 (\'300\') - embora alguns bancos convertam, é uma má prática tratar números como strings.',
        'Usar `&&` em vez da palavra `AND`.'
      ],
      realWorldApplication: 'Filtros combinados de busca em sites como Mercado Livre, Amazon e Booking (preço + categoria + avaliação).'
    },
    xp: 20,
    tags: ['and', 'where', 'operadores_logicos']
  },
  {
    id: 'sql-b-05',
    title: 'Ordenação e Limite: ORDER BY e LIMIT',
    track: 'sql',
    module: 'basico',
    topic: 'Ordenação (ORDER BY) e Limitação (LIMIT)',
    order: 5,
    difficulty: 'medio',
    format: 'code',
    datasetId: 'loja',
    description: 'Encontre os 3 produtos mais caros da loja. Exiba o `nome` e o `preco`, ordenados do maior para o menor preço (`DESC`).',
    conceptExplanation: 'A cláusula `ORDER BY coluna DESC` ordena os registros em ordem decrescente (do maior para o menor). O padrão é `ASC` (crescente). A cláusula `LIMIT N` restringe o retorno para apenas as primeiras N linhas do resultado ordenado.',
    codeExample: 'SELECT nome, salario\nFROM funcionarios\nORDER BY salario DESC\nLIMIT 5;',
    starterCode: '-- Selecione os 3 produtos mais caros (ORDER BY preco DESC LIMIT 3):\n',
    solutionCode: 'SELECT nome, preco\nFROM produtos\nORDER BY preco DESC\nLIMIT 3;',
    hints: [
      'Colunas a exibir: SELECT nome, preco',
      'Origem: FROM produtos',
      'Ordene decrescente: ORDER BY preco DESC',
      'Limite aos top 3: LIMIT 3'
    ],
    testCases: [
      {
        expectedOutput: 'Top 3 produtos: Monitor Gamer (1450.00), Cadeira Escritório (780.00), Mesa Computador (450.00)',
        description: 'Retorna os 3 maiores preços em ordem decrescente.'
      }
    ],
    solutionBreakdown: {
      objective: 'Aprender ordenação de resultados e paginação/top-N com ORDER BY e LIMIT.',
      reasoning: 'O SQL primeiro executa a consulta, classifica todas as linhas de acordo com a coluna especificada e fatia o topo com a quantidade pedida no LIMIT.',
      stepByStep: [
        '1. `SELECT nome, preco`',
        '2. `FROM produtos`',
        '3. `ORDER BY preco DESC`',
        '4. `LIMIT 3;`'
      ],
      finalCode: 'SELECT nome, preco\nFROM produtos\nORDER BY preco DESC\nLIMIT 3;',
      commonMistakes: [
        'Esquecer a palavra DESC, o que faria o SQL ordenar em ordem crescente (ASC) e retornar os 3 produtos mais baratos em vez dos mais caros!'
      ],
      realWorldApplication: 'Rankings de vendas, placares de pontuação (leaderboards) e páginas com paginação infinita.'
    },
    xp: 20,
    tags: ['order_by', 'desc', 'limit', 'ranking']
  },
  {
    id: 'sql-b-06',
    title: 'Funções Agregadas: COUNT, SUM e AVG',
    track: 'sql',
    module: 'basico',
    topic: 'Funções de Agregação',
    order: 6,
    difficulty: 'medio',
    format: 'code',
    datasetId: 'loja',
    description: 'Calcule o total de pedidos realizados (`COUNT(*)`), a soma de faturamento total (`SUM(total)`) e a média de valor dos pedidos (`AVG(total)`) da tabela `pedidos`.',
    conceptExplanation: 'Funções de agregação realizam cálculos em um conjunto de valores e retornam um único resultado resumido: `COUNT()` conta linhas, `SUM()` soma valores numéricos e `AVG()` calcula a média aritmética.',
    codeExample: 'SELECT COUNT(*) AS total_itens, AVG(preco) AS media_preco\nFROM produtos;',
    starterCode: '-- Calcule COUNT(*), SUM(total) e AVG(total) na tabela pedidos:\n',
    solutionCode: 'SELECT COUNT(*) AS total_pedidos, SUM(total) AS faturamento_total, AVG(total) AS media_pedidos\nFROM pedidos;',
    hints: [
      'Use COUNT(*) para contar o número de pedidos.',
      'Use SUM(total) para somar os valores da coluna total.',
      'Use AVG(total) para obter a média.',
      'Coloque todas na mesma cláusula SELECT separadas por vírgula.'
    ],
    testCases: [
      {
        expectedOutput: '8 pedidos, 4861.0 total, 607.625 média',
        description: 'Retorna a contagem, soma e média agregadas de todos os pedidos.'
      }
    ],
    solutionBreakdown: {
      objective: 'Utilizar funções de resumo estatístico e aliases de coluna (AS).',
      reasoning: 'Funções agregadas colapsam todas as linhas da tabela em uma única linha com as métricas consolidadas.',
      stepByStep: [
        '1. Chamar `COUNT(*)`, `SUM(total)` e `AVG(total)` no SELECT.',
        '2. Usar `AS` para nomear as colunas de saída de forma legível.',
        '3. Indicar `FROM pedidos;`.'
      ],
      finalCode: 'SELECT COUNT(*) AS total_pedidos, SUM(total) AS faturamento_total, AVG(total) AS media_pedidos\nFROM pedidos;',
      commonMistakes: [
        'Tentar selecionar uma coluna não agregada (como cliente_id) sem usar GROUP BY.'
      ],
      realWorldApplication: 'Criação de KPIs em dashboards executivos (PowerBI, Looker, Tableau) e relatórios financeiros.'
    },
    xp: 25,
    tags: ['count', 'sum', 'avg', 'agregacao']
  },
  {
    id: 'sql-b-07',
    title: 'Busca por Padrão de Texto: Operador LIKE',
    track: 'sql',
    module: 'basico',
    topic: 'Filtros com LIKE',
    order: 7,
    difficulty: 'facil',
    format: 'code',
    datasetId: 'loja',
    description: 'Encontre todos os produtos que contêm a palavra "Gamer" no `nome`. Exiba o `nome`, a `categoria` e o `preco`.',
    conceptExplanation: 'O operador `LIKE` permite buscar padrões em textos. O caractere `%` é um coringa que substitui qualquer quantidade de caracteres. `LIKE \'%Gamer%\'` encontra registros onde a palavra "Gamer" aparece em qualquer lugar do texto.',
    codeExample: 'SELECT nome, email\nFROM clientes\nWHERE email LIKE \'%@email.com\';',
    starterCode: '-- Selecione os produtos cujo nome contenha "Gamer":\n',
    solutionCode: 'SELECT nome, categoria, preco\nFROM produtos\nWHERE nome LIKE \'%Gamer%\';',
    hints: [
      'Use LIKE \'%Gamer%\' na cláusula WHERE.',
      'O sinal de % antes e depois permite encontrar a palavra no início, meio ou fim do nome.',
      'Projete as colunas: SELECT nome, categoria, preco'
    ],
    testCases: [
      {
        expectedOutput: 'Monitor Gamer 27" 144Hz e Headset Gamer 7.1',
        description: 'Retorna os produtos que possuem "Gamer" no nome comercial.'
      }
    ],
    solutionBreakdown: {
      objective: 'Realizar consultas textuais flexíveis com correspondência de padrões.',
      reasoning: 'O operador LIKE avalia expressões regulares simples com coringas `%` (múltiplos caracteres) e `_` (um caractere).',
      stepByStep: [
        '1. `SELECT nome, categoria, preco`',
        '2. `FROM produtos`',
        '3. `WHERE nome LIKE \'%Gamer%\';`'
      ],
      finalCode: 'SELECT nome, categoria, preco\nFROM produtos\nWHERE nome LIKE \'%Gamer%\';',
      commonMistakes: ['Esquecer os símbolos de `%` (sem `%`, o LIKE procura exatamente a palavra "Gamer" idêntica ao texto inteiro).'],
      realWorldApplication: 'Campos de busca de texto livre em e-commerces, busca de nomes de clientes e filtros de busca em prontuários.'
    },
    xp: 15,
    tags: ['like', 'wildcard', 'strings']
  },
  {
    id: 'sql-b-08',
    title: 'Múltiplos Valores: Operador IN',
    track: 'sql',
    module: 'basico',
    topic: 'Operador IN',
    order: 8,
    difficulty: 'medio',
    format: 'code',
    datasetId: 'loja',
    description: 'Selecione o `nome`, a `cidade` e o `estado` de todos os clientes que moram nos estados de São Paulo (\'SP\'), Rio de Janeiro (\'RJ\') ou Minas Gerais (\'MG\') utilizando o operador `IN`.',
    conceptExplanation: 'O operador `IN (\'SP\', \'RJ\', \'MG\')` é uma forma limpa e elegante de substituir múltiplos `OR` (`estado = \'SP\' OR estado = \'RJ\' OR estado = \'MG\'`).',
    codeExample: 'SELECT nome, categoria\nFROM produtos\nWHERE categoria IN (\'Eletrônicos\', \'Móveis\');',
    starterCode: '-- Use o operador IN para filtrar estados SP, RJ e MG:\n',
    solutionCode: 'SELECT nome, cidade, estado\nFROM clientes\nWHERE estado IN (\'SP\', \'RJ\', \'MG\');',
    hints: [
      'A cláusula WHERE deve ser: WHERE estado IN (\'SP\', \'RJ\', \'MG\')',
      'Coloque cada sigla entre aspas simples separadas por vírgula dentro dos parênteses.'
    ],
    testCases: [
      {
        expectedOutput: '4 clientes: Ana Silva (SP), Marcos Santos (SP), Beatriz Lima (MG), Lucas Oliveira (RJ)',
        description: 'Retorna todos os clientes cadastrados na região Sudeste (SP, RJ, MG).'
      }
    ],
    solutionBreakdown: {
      objective: 'Simplificar condições de múltiplos valores com o operador de pertinência a conjunto (IN).',
      reasoning: 'O operador IN verifica se o valor da coluna pertence à lista fornecida, permitindo ao otimizador utilizar índices de forma eficiente.',
      stepByStep: [
        '1. `SELECT nome, cidade, estado`',
        '2. `FROM clientes`',
        '3. `WHERE estado IN (\'SP\', \'RJ\', \'MG\');`'
      ],
      finalCode: 'SELECT nome, cidade, estado\nFROM clientes\nWHERE estado IN (\'SP\', \'RJ\', \'MG\');',
      commonMistakes: ['Esquecer as aspas individuais em cada elemento da lista.'],
      realWorldApplication: 'Filtro por múltiplos status de pedido (ex: status IN (\'Entregue\', \'Enviado\')) e filtragem por listas de IDs.'
    },
    xp: 20,
    tags: ['in', 'where', 'conjuntos']
  },
  {
    id: 'sql-b-09',
    title: 'Faixa de Valores: Operador BETWEEN',
    track: 'sql',
    module: 'basico',
    topic: 'Operador BETWEEN',
    order: 9,
    difficulty: 'medio',
    format: 'code',
    datasetId: 'loja',
    description: 'Encontre os produtos cujo preço esteja na faixa entre R$ 200 e R$ 800 (inclusive). Exiba `nome` e `preco`, ordenados do menor para o maior preço.',
    conceptExplanation: 'O operador `BETWEEN valor1 AND valor2` filtra registros dentro de um intervalo inclusivo (inclui tanto o valor inicial quanto o final).',
    codeExample: 'SELECT id, total\nFROM pedidos\nWHERE total BETWEEN 100 AND 500;',
    starterCode: '-- Selecione nome e preco onde preco BETWEEN 200 AND 800 ordenado por preco:\n',
    solutionCode: 'SELECT nome, preco\nFROM produtos\nWHERE preco BETWEEN 200 AND 800\nORDER BY preco ASC;',
    hints: [
      'No WHERE use: preco BETWEEN 200 AND 800',
      'No final, ordene com: ORDER BY preco ASC'
    ],
    testCases: [
      {
        expectedOutput: 'Teclado Mecânico (250.0), Headset Gamer (320.0), Mesa Computador (450.0), Cadeira Escritório (780.0)',
        description: 'Retorna os produtos entre 200 e 800 em ordem crescente de preço.'
      }
    ],
    solutionBreakdown: {
      objective: 'Filtrar intervalos numéricos e de datas contínuos.',
      reasoning: 'O BETWEEN é o equivalente direto e conciso de `preco >= 200 AND preco <= 800`.',
      stepByStep: [
        '1. `SELECT nome, preco`',
        '2. `FROM produtos`',
        '3. `WHERE preco BETWEEN 200 AND 800`',
        '4. `ORDER BY preco ASC;`'
      ],
      finalCode: 'SELECT nome, preco\nFROM produtos\nWHERE preco BETWEEN 200 AND 800\nORDER BY preco ASC;',
      commonMistakes: ['Inverter os limites (colocar o maior antes do menor). O menor valor SEMPRE vem primeiro!'],
      realWorldApplication: 'Relatórios de vendas por período (BETWEEN \'2023-01-01\' AND \'2023-12-31\') e filtros de faixa de preço.'
    },
    xp: 20,
    tags: ['between', 'faixa', 'order_by']
  },
  {
    id: 'sql-b-10',
    title: 'Removendo Duplicatas: DISTINCT',
    track: 'sql',
    module: 'basico',
    topic: 'Valores Únicos (DISTINCT)',
    order: 10,
    difficulty: 'facil',
    format: 'code',
    datasetId: 'loja',
    description: 'Liste todas as cidades distintas onde a loja possui clientes cadastrados, sem repetir nenhum nome de cidade. Exiba apenas a coluna `cidade` ordenada alfabeticamente.',
    conceptExplanation: 'Quando uma tabela possui linhas com valores repetidos na mesma coluna (por exemplo, vários clientes de São Paulo), usamos a palavra-chave `DISTINCT` logo após o `SELECT` para eliminar duplicatas e retornar apenas valores únicos.',
    codeExample: 'SELECT DISTINCT categoria\nFROM produtos\nORDER BY categoria;',
    starterCode: '-- Liste as cidades distintas dos clientes em ordem alfabética:\n',
    solutionCode: 'SELECT DISTINCT cidade\nFROM clientes\nORDER BY cidade ASC;',
    hints: [
      'Use a cláusula: SELECT DISTINCT cidade',
      'Tabela: FROM clientes',
      'Ordene com: ORDER BY cidade ASC'
    ],
    testCases: [
      {
        expectedOutput: 'Cidades únicas: Belo Horizonte, Curitiba, Porto Alegre, Recife, Rio de Janeiro, Salvador, São Paulo',
        description: 'Retorna a lista sem cidades repetidas.'
      }
    ],
    solutionBreakdown: {
      objective: 'Extrair valores únicos e desduplicados de colunas de texto.',
      reasoning: 'O DISTINCT executa uma operação de hashing ou ordenação interna para remover registros idênticos da projeção final.',
      stepByStep: [
        '1. `SELECT DISTINCT cidade`',
        '2. `FROM clientes`',
        '3. `ORDER BY cidade ASC;`'
      ],
      finalCode: 'SELECT DISTINCT cidade\nFROM clientes\nORDER BY cidade ASC;',
      commonMistakes: ['Colocar a palavra DISTINCT depois do nome da coluna (`SELECT cidade DISTINCT FROM...` é sintaxe inválida).'],
      realWorldApplication: 'Preenchimento de dropdowns de filtros em sites (ex: lista de cidades de entrega) e análise de abrangência geográfica.'
    },
    xp: 15,
    tags: ['distinct', 'unicos', 'deduplicacao']
  },
  {
    id: 'sql-b-11',
    title: 'Projeto Capstone Básico: Relatório Comercial de E-commerce',
    track: 'sql',
    module: 'basico',
    topic: 'Projeto Integrador de SQL Básico',
    order: 11,
    difficulty: 'dificil',
    format: 'project',
    datasetId: 'loja',
    description: 'A diretoria da loja precisa de um relatório de produtos eletrônicos em estoque. Selecione o `nome`, o `preco` e o `estoque` dos produtos da categoria `\'Eletrônicos\'` que possuem estoque maior que 20 unidades (`estoque > 20`), ordenados do maior para o menor preço.',
    conceptExplanation: 'Este projeto consolida projeção de colunas específicas, filtro por categoria textual, filtro numérico com AND e ordenação decrescente com ORDER BY DESC.',
    codeExample: 'SELECT nome, preco, estoque\nFROM produtos\nWHERE categoria = \'Eletrônicos\' AND estoque > 20\nORDER BY preco DESC;',
    starterCode: '-- Escreva a consulta completa do relatório comercial:\n',
    solutionCode: 'SELECT nome, preco, estoque\nFROM produtos\nWHERE categoria = \'Eletrônicos\' AND estoque > 20\nORDER BY preco DESC;',
    hints: [
      'Projete as 3 colunas: SELECT nome, preco, estoque',
      'Fonte: FROM produtos',
      'Filtro composto: WHERE categoria = \'Eletrônicos\' AND estoque > 20',
      'Ordene decrescente: ORDER BY preco DESC'
    ],
    testCases: [
      {
        expectedOutput: 'Headset Gamer (320.0, estoque 30) e Teclado Mecânico (250.0, estoque 45)',
        description: 'Retorna exatamente os eletrônicos com estoque acima de 20 ordenados pelo maior preço.'
      }
    ],
    solutionBreakdown: {
      objective: 'Integrar projeção, múltiplos filtros booleanos e ordenação em um relatório comercial executivo.',
      reasoning: 'O otimizador SQL filtra as linhas na tabela de produtos satisfazendo ambas as condições e ordena a saída pelo preço.',
      stepByStep: [
        '1. Selecionar `nome, preco, estoque`.',
        '2. `FROM produtos`.',
        '3. Aplicar `WHERE categoria = \'Eletrônicos\' AND estoque > 20`.',
        '4. Finalizar com `ORDER BY preco DESC;`.'
      ],
      finalCode: 'SELECT nome, preco, estoque\nFROM produtos\nWHERE categoria = \'Eletrônicos\' AND estoque > 20\nORDER BY preco DESC;',
      commonMistakes: ['Esquecer o DESC na ordenação ou esquecer as aspas na categoria \'Eletrônicos\'.'],
      realWorldApplication: 'Relatórios de reposição de estoque, planejamento de compras e análise de mix de produtos para e-commerce.'
    },
    xp: 40,
    tags: ['capstone', 'sql_basico', 'relatorio', 'ecommerce']
  }
];

