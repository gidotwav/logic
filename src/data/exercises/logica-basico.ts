import { Exercise } from '../../types/exercise';

export const logicaBasicoExercises: Exercise[] = [
  {
    id: 'log-b-01',
    title: 'O Primeiro Passo: Saída de Dados',
    track: 'logica',
    module: 'basico',
    topic: 'Entrada e Saída de Dados',
    order: 1,
    difficulty: 'facil',
    format: 'code',
    description: 'Escreva um programa que exiba a clássica mensagem de boas-vindas: "Olá, Mundo!".',
    conceptExplanation: 'Em programação, para exibir uma informação na tela para o usuário, utilizamos a função de saída. Em Python, usamos a instrução `print()`. O texto que você deseja exibir deve estar entre aspas simples (\') ou duplas (").',
    codeExample: 'print("Bem-vindo ao mundo da programação!")',
    starterCode: '# Escreva sua instrução print abaixo:\n',
    solutionCode: 'print("Olá, Mundo!")',
    hints: [
      'Utilize a função print() para exibir texto no terminal.',
      'Coloque o texto exatamente entre aspas: "Olá, Mundo!"',
      'Cuidado com a pontuação e os acentos (Olá com acento agudo).'
    ],
    testCases: [
      {
        expectedOutput: 'Olá, Mundo!',
        description: 'Deve imprimir exatamente "Olá, Mundo!" no console.'
      }
    ],
    solutionBreakdown: {
      objective: 'Apresentar a primeira instrução fundamental de saída de dados no computador.',
      reasoning: 'O computador precisa de um comando explícito para enviar caracteres ao console padrão. A função print() recebe argumentos e os converte em fluxo de saída de texto.',
      stepByStep: [
        '1. Digite a palavra-chave `print` em letras minúsculas.',
        '2. Abra os parênteses `()`.',
        '3. Abra aspas duplas `"`.',
        '4. Digite `Olá, Mundo!`.',
        '5. Feche as aspas e os parênteses.'
      ],
      finalCode: 'print("Olá, Mundo!")',
      alternativeSolutions: "print('Olá, Mundo!')  # Aspas simples também funcionam perfeitamente em Python.",
      commonMistakes: [
        'Escrever Print com P maiúsculo (Python diferencia maiúsculas de minúsculas).',
        'Esquecer de fechar as aspas ou parênteses.',
        'Omitir a vírgula ou o ponto de exclamação.'
      ],
      realWorldApplication: 'Em sistemas reais, a saída de dados é usada para exibir logs de servidores, mensagens ao usuário e depurar valores durante o desenvolvimento.'
    },
    xp: 10,
    tags: ['print', 'saida', 'iniciante']
  },
  {
    id: 'log-b-02',
    title: 'Variáveis: Guardando Informações',
    track: 'logica',
    module: 'basico',
    topic: 'Variáveis e Tipos de Dados',
    order: 2,
    difficulty: 'facil',
    format: 'code',
    description: 'Crie uma variável chamada `nome` com o valor `"Alice"` e uma variável `idade` com o valor `25`. Em seguida, exiba o nome e a idade.',
    conceptExplanation: 'Pense em uma variável como uma caixa etiquetada na memória do computador. Você coloca um valor dentro dela com o sinal de igualdade (`=`), que chamamos de operador de atribuição. Depois, pode usar o nome da caixa sempre que precisar daquele valor.',
    codeExample: 'cidade = "São Paulo"\nano = 2024\nprint(cidade)\nprint(ano)',
    starterCode: '# 1. Crie a variável nome com "Alice"\n# 2. Crie a variável idade com 25\n# 3. Imprima ambas\n',
    solutionCode: 'nome = "Alice"\nidade = 25\nprint(nome)\nprint(idade)',
    hints: [
      'Para criar uma variável, digite o nome dela seguido de = e o valor.',
      'nome = "Alice" para o texto e idade = 25 para o número inteiro.',
      'Depois faça print(nome) e print(idade).'
    ],
    testCases: [
      {
        expectedOutput: 'Alice\n25',
        description: 'Deve imprimir Alice na primeira linha e 25 na segunda linha.'
      }
    ],
    solutionBreakdown: {
      objective: 'Declarar variáveis de diferentes tipos primitivos (texto e número) e usá-las na saída.',
      reasoning: 'Variáveis permitem que o computador armazene dados temporariamente na memória RAM para cálculos ou exibições posteriores.',
      stepByStep: [
        '1. Atribuir o texto "Alice" ao identificador `nome`.',
        '2. Atribuir o número 25 ao identificador `idade`.',
        '3. Passar essas variáveis para a função `print()`.'
      ],
      finalCode: 'nome = "Alice"\nidade = 25\nprint(nome)\nprint(idade)',
      commonMistakes: [
        'Colocar aspas no número 25 (transformaria em texto e não número inteiro).',
        'Colocar aspas no nome da variável ao chamar print("nome") ao invés de print(nome).'
      ],
      realWorldApplication: 'Bancos e e-commerces guardam o saldo da conta, nome do cliente e carrinho de compras em variáveis enquanto você navega.'
    },
    xp: 10,
    tags: ['variaveis', 'atribuicao', 'tipos']
  },
  {
    id: 'log-b-03',
    title: 'Operações Matemáticas: Calculando a Média',
    track: 'logica',
    module: 'basico',
    topic: 'Operadores Matemáticos',
    order: 3,
    difficulty: 'facil',
    format: 'code',
    description: 'Dadas as notas `nota1 = 8.0` e `nota2 = 6.0`, calcule a média aritmética simples e guarde na variável `media`. Imprima o valor da média.',
    conceptExplanation: 'O computador é uma calculadora potente. Podemos usar `+` (soma), `-` (subtração), `*` (multiplicação), `/` (divisão). Atenção à precedência: multiplicação e divisão acontecem antes da soma! Use parênteses `(a + b) / 2` para somar primeiro.',
    codeExample: 'a = 10\nb = 20\nmedia = (a + b) / 2\nprint(media) # Imprime 15.0',
    starterCode: 'nota1 = 8.0\nnota2 = 6.0\n\n# Calcule a media e imprima o resultado:\n',
    solutionCode: 'nota1 = 8.0\nnota2 = 6.0\nmedia = (nota1 + nota2) / 2\nprint(media)',
    hints: [
      'A média de duas notas é a soma delas dividida por 2.',
      'Lembre-se de colocar parênteses na soma: (nota1 + nota2) / 2',
      'Guarde o resultado na variável media e use print(media).'
    ],
    testCases: [
      {
        expectedOutput: 7.0,
        description: 'A média calculada entre 8.0 e 6.0 deve ser 7.0.'
      }
    ],
    solutionBreakdown: {
      objective: 'Compreender a precedência dos operadores aritméticos e o uso de parênteses.',
      reasoning: 'Se fizermos `nota1 + nota2 / 2`, o computador dividirá apenas a nota2 por 2 (6.0/2 = 3.0) e somará com nota1 (8.0 + 3.0 = 11.0), gerando um erro clássico de cálculo.',
      stepByStep: [
        '1. Agrupar a soma com parênteses: `(nota1 + nota2)`.',
        '2. Dividir o total pelo número de elementos (2) com a barra `/`.',
        '3. Atribuir à variável `media`.',
        '4. Imprimir com `print(media)`.'
      ],
      finalCode: 'nota1 = 8.0\nnota2 = 6.0\nmedia = (nota1 + nota2) / 2\nprint(media)',
      commonMistakes: [
        'Esquecer os parênteses na soma resultando em 11.0 em vez de 7.0.',
        'Usar vírgula decimal em vez de ponto (em programação usamos 8.0 e não 8,0).'
      ],
      realWorldApplication: 'Sistemas escolares, cálculo de métricas de vendas e indicadores financeiros dependem do cálculo correto de médias ponderadas e aritméticas.'
    },
    xp: 10,
    tags: ['matematica', 'precedencia', 'calculo']
  },
  {
    id: 'log-b-04',
    title: 'Tomando Decisões: Maior de Idade',
    track: 'logica',
    module: 'basico',
    topic: 'Condicionais (if / else)',
    order: 4,
    difficulty: 'facil',
    format: 'code',
    description: 'Crie uma variável `idade = 18`. Se a idade for maior ou igual a 18, imprima "Maior de idade". Caso contrário, imprima "Menor de idade".',
    conceptExplanation: 'Em lógica, para tomar decisões usamos a estrutura `if` (se) e `else` (senão). O computador avalia se uma condição é Verdadeira (`True`) ou Falsa (`False`). Se for verdadeira, executa o bloco do if; se não, executa o else.',
    codeExample: 'temperatura = 30\nif temperatura >= 30:\n    print("Está calor!")\nelse:\n    print("Clima ameno")',
    starterCode: 'idade = 18\n\n# Escreva a estrutura if / else:\n',
    solutionCode: 'idade = 18\nif idade >= 18:\n    print("Maior de idade")\nelse:\n    print("Menor de idade")',
    hints: [
      'Use o operador relacional >= para verificar se é maior ou igual a 18.',
      'Lembre-se dos dois-pontos (:) ao final da linha do if e do else.',
      'Não se esqueça do recuo de 4 espaços dentro de cada bloco.'
    ],
    testCases: [
      {
        expectedOutput: 'Maior de idade',
        description: 'Para idade = 18, a condição idade >= 18 é satisfeita.'
      }
    ],
    solutionBreakdown: {
      objective: 'Aprender estruturas de controle de fluxo de decisão binária (if/else).',
      reasoning: 'O operador relacional `>=` retorna um booleano. Se a idade for 18 ou mais, o fluxo segue para o primeiro print.',
      stepByStep: [
        '1. Avaliar a expressão booleana `idade >= 18`.',
        '2. Se for verdadeira, executar `print("Maior de idade")`.',
        '3. Se for falsa, cair no `else` e executar `print("Menor de idade")`.'
      ],
      finalCode: 'idade = 18\nif idade >= 18:\n    print("Maior de idade")\nelse:\n    print("Menor de idade")',
      commonMistakes: [
        'Usar apenas `>` (maior que), o que consideraria uma pessoa de 18 anos como menor de idade!',
        'Esquecer o recuo (indentação) no print.'
      ],
      realWorldApplication: 'Validação de acesso em sites, restrições etárias em plataformas e aprovação de cadastros.'
    },
    xp: 15,
    tags: ['condicionais', 'if', 'else', 'decisao']
  },
  {
    id: 'log-b-05',
    title: 'Operador Módulo: Par ou Ímpar',
    track: 'logica',
    module: 'basico',
    topic: 'Operadores Matemáticos & Relacionais',
    order: 5,
    difficulty: 'medio',
    format: 'code',
    description: 'Dado o número `num = 14`, verifique se ele é par ou ímpar. Se for par, imprima "Par". Se for ímpar, imprima "Ímpar".',
    conceptExplanation: 'O operador `%` (módulo ou resto da divisão) nos dá o que sobra de uma divisão inteira. Todo número par dividido por 2 tem resto igual a 0 (`num % 2 == 0`). Se o resto for 1, o número é ímpar!',
    codeExample: 'numero = 7\nif numero % 2 == 0:\n    print("Par")\nelse:\n    print("Ímpar")',
    starterCode: 'num = 14\n\n# Verifique se num é par ou ímpar:\n',
    solutionCode: 'num = 14\nif num % 2 == 0:\n    print("Par")\nelse:\n    print("Ímpar")',
    hints: [
      'Use o operador % para obter o resto da divisão por 2.',
      'Compare com zero usando o operador de igualdade dupla == (num % 2 == 0).',
      'Use if para "Par" e else para "Ímpar".'
    ],
    testCases: [
      {
        expectedOutput: 'Par',
        description: '14 dividido por 2 tem resto 0, logo é Par.'
      }
    ],
    solutionBreakdown: {
      objective: 'Dominar o operador de resto da divisão (%) e a comparação de igualdade (==).',
      reasoning: 'O operador `=` serve para guardar valores (atribuição), enquanto `==` serve para comparar se dois valores são idênticos.',
      stepByStep: [
        '1. Calcular o resto: `num % 2`.',
        '2. Comparar com 0: `num % 2 == 0`.',
        '3. Imprimir "Par" ou "Ímpar".'
      ],
      finalCode: 'num = 14\nif num % 2 == 0:\n    print("Par")\nelse:\n    print("Ímpar")',
      commonMistakes: [
        'Usar `=` (um igual só) dentro do if ao invés de `==` (dois iguais).',
        'Confundir `/` (divisão normal) com `%` (resto da divisão).'
      ],
      realWorldApplication: 'Algoritmos de paginação, zebragem de tabelas em UI (linhas alternadas com cores diferentes), e distribuição em filas.'
    },
    xp: 20,
    tags: ['modulo', 'par_impar', 'operadores']
  },
  {
    id: 'log-b-06',
    title: 'Múltiplas Condições: Positivo, Negativo ou Zero',
    track: 'logica',
    module: 'basico',
    topic: 'Condicionais (elif)',
    order: 6,
    difficulty: 'medio',
    format: 'code',
    description: 'Dado `valor = -5`, determine se ele é "Positivo", "Negativo" ou "Zero" utilizando `if`, `elif` e `else`.',
    conceptExplanation: 'Quando temos mais de duas opções possíveis, usamos o `elif` (abreviação de "else if" ou "senão se"). O computador testa as condições em ordem de cima para baixo e executa a primeira que for verdadeira.',
    codeExample: 'nota = 85\nif nota >= 90:\n    print("Excelente")\nelif nota >= 70:\n    print("Bom")\nelse:\n    print("Precisa melhorar")',
    starterCode: 'valor = -5\n\n# Escreva a estrutura if / elif / else:\n',
    solutionCode: 'valor = -5\nif valor > 0:\n    print("Positivo")\nelif valor < 0:\n    print("Negativo")\nelse:\n    print("Zero")',
    hints: [
      'Comece testando se valor > 0 para Positivo.',
      'No elif, teste se valor < 0 para Negativo.',
      'O else final tratará o caso em que o número é exatamente 0.'
    ],
    testCases: [
      {
        expectedOutput: 'Negativo',
        description: 'Para valor = -5, deve imprimir "Negativo".'
      }
    ],
    solutionBreakdown: {
      objective: 'Encadear decisões com múltiplos ramos mutuamente exclusivos.',
      reasoning: 'Um número real só pode pertencer a uma das 3 categorias: estritamente maior que 0, estritamente menor que 0 ou igual a 0.',
      stepByStep: [
        '1. `if valor > 0:` -> print("Positivo")',
        '2. `elif valor < 0:` -> print("Negativo")',
        '3. `else:` -> print("Zero")'
      ],
      finalCode: 'valor = -5\nif valor > 0:\n    print("Positivo")\nelif valor < 0:\n    print("Negativo")\nelse:\n    print("Zero")',
      commonMistakes: [
        'Fazer múltiplos if independentes em vez de elif, o que faz o computador testar todas as condições desnecessariamente.'
      ],
      realWorldApplication: 'Classificação de extrato bancário (débito, crédito ou neutro), variação de temperatura e cotações de ações.'
    },
    xp: 20,
    tags: ['elif', 'condicionais', 'positivo_negativo']
  },
  {
    id: 'log-b-07',
    title: 'Laço For: A Tabuada do 5',
    track: 'logica',
    module: 'basico',
    topic: 'Estruturas de Repetição (for e range)',
    order: 7,
    difficulty: 'facil',
    format: 'code',
    description: 'Utilize um laço `for` e a função `range()` para calcular e exibir a tabuada do 5 (de 5x1 até 5x5), exibindo apenas os resultados (5, 10, 15, 20, 25).',
    conceptExplanation: 'Em vez de copiar e colar comandos 100 vezes, usamos laços de repetição. O `for i in range(1, 6):` faz uma variável `i` assumir os valores de 1 até 5 consecutivamente (o limite superior 6 não é incluído).',
    codeExample: 'for i in range(1, 4):\n    print(i * 2) # Imprime 2, 4, 6',
    starterCode: '# Use um loop for com range(1, 6) para imprimir 5 * i:\n',
    solutionCode: 'for i in range(1, 6):\n    print(5 * i)',
    hints: [
      'Lembre-se que range(1, 6) vai de 1 até 5.',
      'Dentro do for, multiplique 5 pela variável do loop (5 * i).',
      'Use print(5 * i) dentro do loop indentado.'
    ],
    testCases: [
      {
        expectedOutput: '5\n10\n15\n20\n25',
        description: 'Imprime os 5 primeiros múltiplos de 5.'
      }
    ],
    solutionBreakdown: {
      objective: 'Aprender repetição controlada por contagem com for e range.',
      reasoning: 'O for itera sobre a sequência gerada por range(1, 6), executando o bloco de código exatamente 5 vezes.',
      stepByStep: [
        '1. Declarar o laço `for i in range(1, 6):`.',
        '2. Multiplicar 5 por `i`.',
        '3. Imprimir o resultado.'
      ],
      finalCode: 'for i in range(1, 6):\n    print(5 * i)',
      commonMistakes: [
        'Usar range(1, 5) que pararia no 4 e não imprimiria o 25.',
        'Esquecer os dois-pontos após range().'
      ],
      realWorldApplication: 'Processamento de lotes de arquivos, relatórios mês a mês e geração automática de gráficos.'
    },
    xp: 15,
    tags: ['for', 'range', 'loop', 'tabuada']
  },
  {
    id: 'log-b-08',
    title: 'Acumuladores: Somando de 1 a 10',
    track: 'logica',
    module: 'basico',
    topic: 'Contadores e Acumuladores',
    order: 8,
    difficulty: 'medio',
    format: 'code',
    description: 'Calcule a soma de todos os números inteiros de 1 a 10 (1 + 2 + 3 + ... + 10) utilizando uma variável acumuladora `soma` e um laço `for`. Imprima o total final (55).',
    conceptExplanation: 'Um acumulador é uma variável que começa com zero (`soma = 0`) e vai recebendo novos valores a cada rodada do loop (`soma += i` ou `soma = soma + i`). Ao fim do loop, ela guarda o total acumulado.',
    codeExample: 'total = 0\nfor n in range(1, 4):\n    total += n\nprint(total) # 1 + 2 + 3 = 6',
    starterCode: 'soma = 0\n# Use o for de 1 a 10 (range(1, 11)) e acumule em soma:\n\n# Imprima a soma final:\n',
    solutionCode: 'soma = 0\nfor i in range(1, 11):\n    soma += i\nprint(soma)',
    hints: [
      'Inicie com soma = 0 antes do laço.',
      'O range deve ser range(1, 11) para incluir o número 10.',
      'Dentro do for faça soma += i (ou soma = soma + i).',
      'Importante: coloque o print(soma) FORA do loop (sem recuo) para imprimir apenas o total final!'
    ],
    testCases: [
      {
        expectedOutput: 55,
        description: 'A soma de 1 a 10 resulta em 55.'
      }
    ],
    solutionBreakdown: {
      objective: 'Compreender o padrão algorítmico de acumulação de valores.',
      reasoning: 'A cada passo do laço, somamos o valor atual de `i` ao que já tínhamos acumulado na variável `soma`.',
      stepByStep: [
        '1. Inicializar `soma = 0`.',
        '2. Percorrer `i` de 1 até 10 com `range(1, 11)`.',
        '3. Somar `i` em `soma`.',
        '4. Exibir o resultado final com `print(soma)`.'
      ],
      finalCode: 'soma = 0\nfor i in range(1, 11):\n    soma += i\nprint(soma)',
      commonMistakes: [
        'Colocar o print dentro do loop (imprimiria 1, 3, 6, 10, ... ao invés de apenas 55).',
        'Usar range(1, 10) e somar apenas até 9 resultando em 45.'
      ],
      realWorldApplication: 'Cálculo do total do carrinho de compras, faturamento mensal e contabilidade em sistemas ERP.'
    },
    xp: 20,
    tags: ['acumulador', 'soma', 'for', 'laco']
  },
  {
    id: 'log-b-09',
    title: 'Laço While: Contagem Regressiva',
    track: 'logica',
    module: 'basico',
    topic: 'Estruturas de Repetição (while)',
    order: 9,
    difficulty: 'medio',
    format: 'code',
    description: 'Crie uma variável `contador = 5`. Usando um laço `while`, imprima o valor do contador e decremente-o até chegar a 1. Quando o laço terminar, imprima "Decolar!".',
    conceptExplanation: 'O laço `while` (enquanto) repete um bloco de código ENQUANTO uma condição for verdadeira. ATENÇÃO: você deve sempre alterar a variável de controle dentro do loop (ex: `contador -= 1`), senão o laço rodará para sempre (loop infinito)!',
    codeExample: 'x = 3\nwhile x > 0:\n    print(x)\n    x -= 1\nprint("Fim!")',
    starterCode: 'contador = 5\n\n# Escreva o laço while:\n\n# Imprima "Decolar!" após o laço:\n',
    solutionCode: 'contador = 5\nwhile contador > 0:\n    print(contador)\n    contador -= 1\nprint("Decolar!")',
    hints: [
      'A condição do while pode ser: while contador > 0:',
      'Dentro do while, imprima contador e depois diminua 1: contador -= 1',
      'Fora do while (sem recuo), coloque print("Decolar!").'
    ],
    testCases: [
      {
        expectedOutput: '5\n4\n3\n2\n1\nDecolar!',
        description: 'Deve fazer a contagem regressiva de 5 a 1 e depois imprimir Decolar!'
      }
    ],
    solutionBreakdown: {
      objective: 'Aprender o laço condicional while e o decremento de variáveis.',
      reasoning: 'O while testa a condição antes de cada execução. Quando contador chega a 0, a condição torna-se falsa e a execução continua na linha seguinte.',
      stepByStep: [
        '1. Iniciar `contador = 5`.',
        '2. `while contador > 0:`.',
        '3. Exibir o valor atual com `print(contador)`.',
        '4. Decrementar `contador -= 1`.',
        '5. Fora do loop, executar `print("Decolar!")`.'
      ],
      finalCode: 'contador = 5\nwhile contador > 0:\n    print(contador)\n    contador -= 1\nprint("Decolar!")',
      commonMistakes: [
        'Esquecer de decrementar a variável, travando o programa em um loop infinito.',
        'Usar `contador < 0` como condição, o que faria o while nunca rodar.'
      ],
      realWorldApplication: 'Processos de polling em APIs, contagens regressivas em jogos e leitura contínua de sensores.'
    },
    xp: 20,
    tags: ['while', 'decremento', 'repeticao']
  },
  {
    id: 'log-b-10',
    title: 'Projeto Capstone Básico: Simulador de Caixa Eletrônico',
    track: 'logica',
    module: 'basico',
    topic: 'Projeto Integrador de Lógica Básica',
    order: 10,
    difficulty: 'dificil',
    format: 'project',
    description: 'Um cliente deseja sacar `valor_saque = 180` reais em um caixa eletrônico. O caixa possui notas de R$ 50, R$ 20 e R$ 10. Calcule a menor quantidade de cédulas de cada valor para entregar o dinheiro e imprima a contagem de cada cédula.',
    conceptExplanation: 'Para minimizar o número de notas, calculamos primeiro quantas notas do maior valor cabem no total usando divisão inteira (`//`), depois pegamos o resto (`%`) e repetimos para as notas menores!',
    codeExample: 'total = 70\nnotas50 = total // 50  # 1 nota\nresto = total % 50      # sobra 20\nnotas20 = resto // 20  # 1 nota',
    starterCode: 'valor_saque = 180\n\n# 1. Calcule quantas notas de 50 (divisão inteira //) e o que sobra (%)\n# 2. Com a sobra, calcule quantas notas de 20 e a nova sobra\n# 3. Com a nova sobra, calcule quantas notas de 10\n# 4. Imprima a quantidade de cada nota:\n',
    solutionCode: 'valor_saque = 180\nnotas50 = valor_saque // 50\nresto = valor_saque % 50\n\nnotas20 = resto // 20\nresto = resto % 20\n\nnotas10 = resto // 10\n\nprint(notas50)\nprint(notas20)\nprint(notas10)',
    hints: [
      'Use o operador // para pegar o número de notas: notas50 = valor_saque // 50 (resulta em 3 notas de 50 = 150).',
      'Use o operador % para obter o que sobrou: resto = valor_saque % 50 (sobra 30).',
      'Faça o mesmo para as notas de 20 (30 // 20 = 1 nota de 20, resto 10) e notas de 10 (10 // 10 = 1 nota de 10).',
      'Imprima notas50, depois notas20, depois notas10.'
    ],
    testCases: [
      {
        expectedOutput: '3\n1\n1',
        description: 'Para 180 reais: 3 notas de 50 (150) + 1 nota de 20 (20) + 1 nota de 10 (10) = 180.'
      }
    ],
    solutionBreakdown: {
      objective: 'Integrar operadores aritméticos, divisão inteira, módulo e raciocínio de decomposição de problemas.',
      reasoning: 'Este é um clássico algoritmo guloso (greedy algorithm). Sempre priorizamos a moeda/cédula de maior denominação disponível para minimizar o total de cédulas entregues.',
      stepByStep: [
        '1. `notas50 = 180 // 50` -> 3.',
        '2. `resto = 180 % 50` -> 30.',
        '3. `notas20 = 30 // 20` -> 1.',
        '4. `resto = 30 % 20` -> 10.',
        '5. `notas10 = 10 // 10` -> 1.',
        '6. Imprimir os 3 valores em linhas separadas.'
      ],
      finalCode: 'valor_saque = 180\nnotas50 = valor_saque // 50\nresto = valor_saque % 50\nnotas20 = resto // 20\nresto = resto % 20\nnotas10 = resto // 10\nprint(notas50)\nprint(notas20)\nprint(notas10)',
      alternativeSolutions: '# Também pode ser resolvido com um laço for sobre a lista de cédulas [50, 20, 10].',
      commonMistakes: [
        'Usar divisão com ponto flutuante `/` em vez de divisão inteira `//`.',
        'Esquecer de atualizar a variável resto antes de calcular a próxima cédula.'
      ],
      realWorldApplication: 'Sistemas bancários reais, troco automático em máquinas de autoatendimento e máquinas de venda de tickets.'
    },
    xp: 40,
    tags: ['capstone', 'algoritmo', 'caixa_eletronico', 'divisao_inteira']
  },
  {
    id: 'log-b-11',
    title: 'Conversão de Temperatura: Celsius para Fahrenheit',
    track: 'logica',
    module: 'basico',
    topic: 'Operadores Matemáticos & Expressões',
    order: 11,
    difficulty: 'facil',
    format: 'code',
    description: 'Dada a temperatura em Celsius `celsius = 25`, converta-a para Fahrenheit utilizando a fórmula: `fahrenheit = (celsius * 9/5) + 32`. Imprima o valor de fahrenheit.',
    conceptExplanation: 'Fórmulas científicas são traduzidas diretamente para expressões em programação, respeitando a ordem das operações.',
    codeExample: 'c = 0\nf = (c * 9/5) + 32\nprint(f) # 32.0',
    starterCode: 'celsius = 25\n\n# Aplique a fórmula (celsius * 9/5) + 32 e imprima fahrenheit:\n',
    solutionCode: 'celsius = 25\nfahrenheit = (celsius * 9/5) + 32\nprint(fahrenheit)',
    hints: [
      'Multiplique celsius por 9, divida por 5 e depois some 32.',
      'fahrenheit = (celsius * 9/5) + 32',
      'Imprima com print(fahrenheit).'
    ],
    testCases: [
      {
        expectedOutput: 77.0,
        description: '25°C convertido para Fahrenheit deve resultar em 77.0°F.'
      }
    ],
    solutionBreakdown: {
      objective: 'Aplicar equações matemáticas algébricas em código.',
      reasoning: 'O parêntese garante que a multiplicação e divisão ocorram antes da adição de 32.',
      stepByStep: [
        '1. Multiplicar `celsius * 9 / 5`.',
        '2. Somar 32.',
        '3. Atribuir a `fahrenheit` e exibir com `print()`.'
      ],
      finalCode: 'celsius = 25\nfahrenheit = (celsius * 9/5) + 32\nprint(fahrenheit)',
      commonMistakes: ['Esquecer de somar 32 no final.'],
      realWorldApplication: 'Aplicativos de previsão do tempo e sistemas de controle de ar condicionado inteligente (IoT).'
    },
    xp: 10,
    tags: ['temperatura', 'matematica', 'expressoes']
  },
  {
    id: 'log-b-12',
    title: 'Calculadora de IMC e Classificação',
    track: 'logica',
    module: 'basico',
    topic: 'Condicionais & Operadores Matemáticos',
    order: 12,
    difficulty: 'medio',
    format: 'code',
    description: 'Dados `peso = 70.0` e `altura = 1.75`, calcule o Índice de Massa Corporal: `imc = peso / (altura ** 2)`. Se o imc for menor que 18.5 imprima "Abaixo do peso"; se for entre 18.5 e 24.9 imprima "Peso normal"; caso contrário, imprima "Sobrepeso".',
    conceptExplanation: 'O IMC é calculado pela divisão do peso pelo quadrado da altura. Usamos o operador de exponenciação `**` (ex: `altura ** 2`).',
    codeExample: 'imc = peso / (altura ** 2)\nif imc < 18.5:\n    print("Abaixo")\nelif imc <= 24.9:\n    print("Normal")\nelse:\n    print("Acima")',
    starterCode: 'peso = 70.0\naltura = 1.75\n\n# 1. Calcule o imc = peso / (altura ** 2)\n# 2. Use if/elif/else para classificar:\n',
    solutionCode: 'peso = 70.0\naltura = 1.75\nimc = peso / (altura ** 2)\nif imc < 18.5:\n    print("Abaixo do peso")\nelif imc <= 24.9:\n    print("Peso normal")\nelse:\n    print("Sobrepeso")',
    hints: [
      'Calcule imc = peso / (altura ** 2). Para 70kg e 1.75m, o IMC é aproximadamente 22.86.',
      'Use if imc < 18.5:',
      'No elif teste if imc <= 24.9: print("Peso normal")',
      'No else: print("Sobrepeso")'
    ],
    testCases: [
      {
        expectedOutput: 'Peso normal',
        description: '70kg e 1.75m resulta em IMC ~22.86, classificado como "Peso normal".'
      }
    ],
    solutionBreakdown: {
      objective: 'Integrar cálculo matemático de potência com tomada de decisão encadeada.',
      reasoning: 'O cálculo do IMC gera um valor contínuo que é categorizado pelas faixas médicas da OMS.',
      stepByStep: [
        '1. Calcular o quadrado da altura: `altura ** 2`.',
        '2. Dividir o `peso` pelo quadrado.',
        '3. Testar os intervalos com `if`, `elif` e `else`.'
      ],
      finalCode: 'peso = 70.0\naltura = 1.75\nimc = peso / (altura ** 2)\nif imc < 18.5:\n    print("Abaixo do peso")\nelif imc <= 24.9:\n    print("Peso normal")\nelse:\n    print("Sobrepeso")',
      commonMistakes: ['Esquecer o parêntese em `(altura ** 2)` ou usar `altura * 2` (o correto é ao quadrado).'],
      realWorldApplication: 'Prontuários eletrônicos médicos, apps de fitness e wearables como smartwatches.'
    },
    xp: 20,
    tags: ['imc', 'matematica', 'elif', 'saude']
  }
];

