import { Exercise } from '../../types/exercise';

export const logicaIntermediarioExercises: Exercise[] = [
  {
    id: 'log-i-01',
    title: 'Listas: O Primeiro e o Último Elemento',
    track: 'logica',
    module: 'intermediario',
    topic: 'Listas e Indexação',
    order: 1,
    difficulty: 'facil',
    format: 'code',
    description: 'Dada a lista de linguagens `linguagens = ["Python", "SQL", "JavaScript", "C++"]`, imprima o primeiro elemento e o último elemento (utilizando índice negativo).',
    conceptExplanation: 'Listas guardam sequências ordenadas de itens. Em programação, os índices começam em zero: `lista[0]` é o primeiro elemento. Em Python, índices negativos acessam itens do final para o início: `lista[-1]` é sempre o último elemento!',
    codeExample: 'frutas = ["Maçã", "Banana", "Uva"]\nprint(frutas[0])  # Maçã\nprint(frutas[-1]) # Uva',
    starterCode: 'linguagens = ["Python", "SQL", "JavaScript", "C++"]\n\n# Imprima o primeiro elemento:\n\n# Imprima o último elemento com índice negativo:\n',
    solutionCode: 'linguagens = ["Python", "SQL", "JavaScript", "C++"]\nprint(linguagens[0])\nprint(linguagens[-1])',
    hints: [
      'O primeiro elemento fica na posição de índice 0: linguagens[0].',
      'O último elemento pode ser acessado com o índice -1: linguagens[-1].',
      'Use a função print() para cada um.'
    ],
    testCases: [
      {
        expectedOutput: 'Python\nC++',
        description: 'Primeiro elemento: Python, Último elemento: C++.'
      }
    ],
    solutionBreakdown: {
      objective: 'Compreender o acesso direto a elementos por índice em listas e indexação reversa.',
      reasoning: 'O acesso por índice é uma operação de tempo constante O(1) na memória.',
      stepByStep: [
        '1. Acessar o item 0 com `linguagens[0]`.',
        '2. Acessar o item final com `linguagens[-1]`.',
        '3. Imprimir ambos.'
      ],
      finalCode: 'linguagens = ["Python", "SQL", "JavaScript", "C++"]\nprint(linguagens[0])\nprint(linguagens[-1])',
      commonMistakes: [
        'Tentar acessar o primeiro elemento com o índice 1 ao invés de 0 (erro "off-by-one").'
      ],
      realWorldApplication: 'Manipulação de listas de dados recebidas de APIs, filas de atendimento e histórico de transações.'
    },
    xp: 15,
    tags: ['listas', 'indexacao', 'arrays']
  },
  {
    id: 'log-i-02',
    title: 'Manipulação de Listas: Adicionar e Remover',
    track: 'logica',
    module: 'intermediario',
    topic: 'Manipulação de Listas',
    order: 2,
    difficulty: 'facil',
    format: 'code',
    description: 'Dada a lista `itens = ["Mochila", "Caderno"]`, adicione `"Caneta"` ao final da lista usando `.append()`. Em seguida, remova o primeiro item usando `.pop(0)`. Imprima a lista resultante.',
    conceptExplanation: 'Podemos modificar listas dinamicamente. O método `.append(item)` insere um novo elemento no fim da lista. O método `.pop(posicao)` remove e retorna o elemento naquela posição.',
    codeExample: 'fila = ["Ana", "Beto"]\nfila.append("Caio") # fila agora é ["Ana", "Beto", "Caio"]\nfila.pop(0)          # remove "Ana"',
    starterCode: 'itens = ["Mochila", "Caderno"]\n\n# 1. Adicione "Caneta" ao final:\n\n# 2. Remova o primeiro elemento (índice 0):\n\n# 3. Imprima a lista itens:\n',
    solutionCode: 'itens = ["Mochila", "Caderno"]\nitens.append("Caneta")\nitens.pop(0)\nprint(itens)',
    hints: [
      'Use itens.append("Caneta") para inserir.',
      'Use itens.pop(0) para remover o primeiro elemento.',
      'Imprima a lista inteira com print(itens).'
    ],
    testCases: [
      {
        expectedOutput: ['Caderno', 'Caneta'],
        description: 'A lista final deve conter ["Caderno", "Caneta"].'
      }
    ],
    solutionBreakdown: {
      objective: 'Manipular listas em tempo de execução com métodos mutáveis.',
      reasoning: 'Listas em Python são estruturas dinâmicas e mutáveis. .append() cresce o array e .pop() ajusta os ponteiros internos.',
      stepByStep: [
        '1. `itens.append("Caneta")` -> ["Mochila", "Caderno", "Caneta"].',
        '2. `itens.pop(0)` -> ["Caderno", "Caneta"].',
        '3. `print(itens)`.'
      ],
      finalCode: 'itens = ["Mochila", "Caderno"]\nitens.append("Caneta")\nitens.pop(0)\nprint(itens)',
      commonMistakes: [
        'Escrever `itens.append = "Caneta"` (append é um método/função, use parênteses!).'
      ],
      realWorldApplication: 'Adicionar e remover itens do carrinho de compras em tempo real conforme o usuário clica.'
    },
    xp: 15,
    tags: ['append', 'pop', 'listas']
  },
  {
    id: 'log-i-03',
    title: 'Funções: Criando Blocos Reutilizáveis',
    track: 'logica',
    module: 'intermediario',
    topic: 'Funções e Retorno',
    order: 3,
    difficulty: 'medio',
    format: 'code',
    description: 'Crie uma função chamada `calcular_desconto(preco, percentual)` que receba o preço original e a porcentagem de desconto (ex: 20 para 20%) e retorne o preço final com o desconto aplicado. Teste chamando a função com 100 e 20 e imprima o resultado.',
    conceptExplanation: 'Funções são blocos de código com nome que recebem parâmetros e devolvem um resultado usando a instrução `return`. Elas evitam repetição de código e tornam seu projeto limpo e modular.',
    codeExample: 'def somar(a, b):\n    return a + b\n\nresultado = somar(5, 3)\nprint(resultado) # 8',
    starterCode: '# Defina a função calcular_desconto:\ndef calcular_desconto(preco, percentual):\n    # Calcule e retorne o preco com desconto:\n    pass\n\n# Chame a função com preco 100 e percentual 20 e imprima:\n',
    solutionCode: 'def calcular_desconto(preco, percentual):\n    desconto = preco * (percentual / 100)\n    return preco - desconto\n\nprint(calcular_desconto(100, 20))',
    hints: [
      'O valor do desconto em reais é preco * (percentual / 100).',
      'O preco final é preco - desconto.',
      'Use return preco - desconto dentro da função.',
      'Chame print(calcular_desconto(100, 20)).'
    ],
    testCases: [
      {
        input: [100, 20],
        expectedOutput: 80.0,
        description: 'R$ 100 com 20% de desconto deve resultar em 80.0.'
      }
    ],
    solutionBreakdown: {
      objective: 'Definir funções com múltiplos parâmetros e retorno de valor.',
      reasoning: 'O comando `return` encerra a execução da função e devolve o valor para quem a chamou.',
      stepByStep: [
        '1. Declarar `def calcular_desconto(preco, percentual):`.',
        '2. Calcular o desconto: `preco * (percentual / 100)`.',
        '3. Retornar `preco - desconto`.',
        '4. Chamar e imprimir o resultado.'
      ],
      finalCode: 'def calcular_desconto(preco, percentual):\n    desconto = preco * (percentual / 100)\n    return preco - desconto\n\nprint(calcular_desconto(100, 20))',
      commonMistakes: [
        'Confundir `print` com `return`. O print apenas exibe na tela, mas o return devolve o dado para outras partes do programa usarem.'
      ],
      realWorldApplication: 'Cálculo de juros, conversão de moedas, cálculo de frete e regras de negócio em sistemas de pagamentos.'
    },
    xp: 20,
    tags: ['funcoes', 'def', 'return', 'parametros']
  },
  {
    id: 'log-i-04',
    title: 'Manipulação de Strings: Fatiamento e Inversão',
    track: 'logica',
    module: 'intermediario',
    topic: 'Strings e Slicing',
    order: 4,
    difficulty: 'medio',
    format: 'code',
    description: 'Crie uma função `inverter_texto(texto)` que receba uma string e retorne a string invertida (de trás para frente) utilizando fatiamento (`slicing`). Teste com `"python"` e imprima o resultado.',
    conceptExplanation: 'Em Python, strings funcionam como listas de caracteres. Podemos fatiar uma string com `texto[inicio:fim:passo]`. Se usarmos o passo `-1` (`texto[::-1]`), ela é lida do fim para o começo de forma extremamente eficiente!',
    codeExample: 'palavra = "radar"\ninvertida = palavra[::-1]\nprint(invertida) # "radar"',
    starterCode: 'def inverter_texto(texto):\n    # Retorne o texto invertido com slicing [::-1]:\n    pass\n\n# Chame a função com "python" e imprima:\n',
    solutionCode: 'def inverter_texto(texto):\n    return texto[::-1]\n\nprint(inverter_texto("python"))',
    hints: [
      'Use a sintaxe de fatiamento: texto[::-1]',
      'Use return texto[::-1] dentro da função.',
      'Chame print(inverter_texto("python")) fora da função.'
    ],
    testCases: [
      {
        input: 'python',
        expectedOutput: 'nohtyp',
        description: 'Inverter "python" resulta em "nohtyp".'
      }
    ],
    solutionBreakdown: {
      objective: 'Dominar o fatiamento de sequências com passo reverso.',
      reasoning: 'O operador `[::-1]` cria uma nova string percorrendo os caracteres do final até o início.',
      stepByStep: [
        '1. Definir `def inverter_texto(texto):`.',
        '2. Retornar `texto[::-1]`.',
        '3. Testar a execução com "python".'
      ],
      finalCode: 'def inverter_texto(texto):\n    return texto[::-1]\n\nprint(inverter_texto("python"))',
      commonMistakes: [
        'Escrever laços for manuais desnecessariamente longos quando o slicing do Python resolve em uma linha legível.'
      ],
      realWorldApplication: 'Verificação de palíndromos, criptografia, processamento de texto e bioinformática (análise de sequências de DNA reversas).'
    },
    xp: 20,
    tags: ['slicing', 'strings', 'inversao']
  },
  {
    id: 'log-i-05',
    title: 'Dicionários: Chave e Valor',
    track: 'logica',
    module: 'intermediario',
    topic: 'Dicionários (Chave/Valor)',
    order: 5,
    difficulty: 'medio',
    format: 'code',
    description: 'Crie um dicionário chamado `aluno` com as chaves: `"nome": "Carlos"`, `"idade": 21` e `"curso": "Computação"`. Em seguida, atualize a `"idade"` para `22` e adicione uma nova chave `"ativo": True`. Imprima a idade e o dicionário.',
    conceptExplanation: 'Dicionários (`dict`) guardam pares de chave e valor entre chaves `{}`. Enquanto listas usam números de índice (0, 1, 2), dicionários usam nomes personalizados (`aluno["nome"]`), o que facilita muito a representação de entidades do mundo real.',
    codeExample: 'usuario = {"id": 1, "email": "teste@email.com"}\nusuario["email"] = "novo@email.com" # Atualiza\nusuario["cargo"] = "Admin"          # Cria nova chave\nprint(usuario["email"])',
    starterCode: '# 1. Crie o dicionário aluno:\naluno = {\n    "nome": "Carlos",\n    "idade": 21,\n    "curso": "Computação"\n}\n\n# 2. Atualize a idade para 22:\n\n# 3. Adicione a chave "ativo" com valor True:\n\n# 4. Imprima a idade e depois o dicionário:\n',
    solutionCode: 'aluno = {\n    "nome": "Carlos",\n    "idade": 21,\n    "curso": "Computação"\n}\naluno["idade"] = 22\naluno["ativo"] = True\nprint(aluno["idade"])\nprint(aluno)',
    hints: [
      'Para atualizar um valor: aluno["idade"] = 22.',
      'Para criar uma nova chave: aluno["ativo"] = True.',
      'Imprima com print(aluno["idade"]) e print(aluno).'
    ],
    testCases: [
      {
        expectedOutput: '22\n{\'nome\': \'Carlos\', \'idade\': 22, \'curso\': \'Computação\', \'ativo\': True}',
        description: 'Imprime a idade 22 e a estrutura completa do dicionário com a chave ativo.'
      }
    ],
    solutionBreakdown: {
      objective: 'Aprender estruturas de dados associativas (dicionários / hash maps).',
      reasoning: 'Dicionários usam tabelas hash internamente, permitindo acesso e alteração de chaves em tempo médio O(1).',
      stepByStep: [
        '1. Declarar o dicionário inicial.',
        '2. Sobrescrever o valor na chave `"idade"`.',
        '3. Inserir a nova chave `"ativo"`.',
        '4. Exibir os resultados.'
      ],
      finalCode: 'aluno = {\n    "nome": "Carlos",\n    "idade": 21,\n    "curso": "Computação"\n}\naluno["idade"] = 22\naluno["ativo"] = True\nprint(aluno["idade"])\nprint(aluno)',
      commonMistakes: [
        'Usar colchetes na declaração em vez de chaves {}.',
        'Esquecer as aspas nos nomes das chaves de texto.'
      ],
      realWorldApplication: 'Praticamente todos os dados trafegados na web em formato JSON são mapeados diretamente para dicionários.'
    },
    xp: 20,
    tags: ['dicionarios', 'dict', 'chave_valor', 'json']
  },
  {
    id: 'log-i-06',
    title: 'Algoritmo de Busca: Encontrar o Maior Valor',
    track: 'logica',
    module: 'intermediario',
    topic: 'Algoritmos de Busca em Coleções',
    order: 6,
    difficulty: 'medio',
    format: 'code',
    description: 'Crie uma função `encontrar_maior(lista)` que receba uma lista de números e retorne o maior número sem utilizar a função pronta `max()`. Use um laço `for` e uma variável de controle. Teste com `[12, 45, 7, 89, 23]` e imprima o resultado.',
    conceptExplanation: 'Para encontrar o maior valor manualmente: assumimos que o primeiro elemento da lista é o maior até agora (`maior = lista[0]`). Depois, percorremos cada elemento da lista. Se encontrarmos alguém maior que o nosso recordista atual, atualizamos a variável!',
    codeExample: 'numeros = [10, 50, 30]\nmaior = numeros[0]\nfor n in numeros:\n    if n > maior:\n        maior = n\nprint(maior) # 50',
    starterCode: 'def encontrar_maior(lista):\n    # Assuma que o primeiro é o maior e percorra a lista com for:\n    pass\n\n# Teste com a lista dada:\nvalores = [12, 45, 7, 89, 23]\nprint(encontrar_maior(valores))',
    solutionCode: 'def encontrar_maior(lista):\n    maior = lista[0]\n    for item in lista:\n        if item > maior:\n            maior = item\n    return maior\n\nvalores = [12, 45, 7, 89, 23]\nprint(encontrar_maior(valores))',
    hints: [
      'Inicie a variável maior com o primeiro item da lista: maior = lista[0].',
      'Faça um for item in lista:',
      'Dentro do for, faça um if item > maior: e atualize maior = item.',
      'Retorne maior ao final da função.'
    ],
    testCases: [
      {
        input: [[12, 45, 7, 89, 23]],
        expectedOutput: 89,
        description: 'O maior valor da lista [12, 45, 7, 89, 23] é 89.'
      }
    ],
    solutionBreakdown: {
      objective: 'Construir o raciocínio algorítmico fundamental de busca linear e atualização de estado.',
      reasoning: 'Percorremos os N elementos da lista exatamente uma vez (complexidade linear O(N)), comparando cada elemento com o valor máximo registrado até o momento.',
      stepByStep: [
        '1. Inicializar `maior = lista[0]`.',
        '2. Para cada `item` em `lista`:',
        '3. Se `item > maior`, fazer `maior = item`.',
        '4. Retornar `maior`.'
      ],
      finalCode: 'def encontrar_maior(lista):\n    maior = lista[0]\n    for item in lista:\n        if item > maior:\n            maior = item\n    return maior\n\nvalores = [12, 45, 7, 89, 23]\nprint(encontrar_maior(valores))',
      commonMistakes: [
        'Iniciar a variável `maior = 0`. Se a lista contiver apenas números negativos (ex: [-10, -5, -20]), o algoritmo retornaria 0 incorretamente! Por isso, sempre inicie com `lista[0]`.'
      ],
      realWorldApplication: 'Identificação de picos de temperatura, maior lance em leilões virtuais e maior transação financeira do dia.'
    },
    xp: 25,
    tags: ['algoritmo', 'busca', 'maior_valor', 'for']
  },
  {
    id: 'log-i-07',
    title: 'Projeto Capstone Intermediário: Gestão de Notas e Aprovação',
    track: 'logica',
    module: 'intermediario',
    topic: 'Projeto Integrador de Lógica Intermediária',
    order: 7,
    difficulty: 'dificil',
    format: 'project',
    description: 'Crie uma função `analisar_turma(alunos)` que receba uma lista de dicionários com os nomes e notas dos alunos. A função deve calcular a média da turma e retornar uma lista contendo apenas os nomes dos alunos que foram Aprovados (com nota igual ou superior a 7.0). Imprima os aprovados.',
    conceptExplanation: 'Este projeto combina funções, listas de dicionários, laços `for`, acumuladores e condicionais para processar um relatório completo de alunos.',
    codeExample: 'turma = [\n    {"nome": "Ana", "nota": 8.5},\n    {"nome": "Pedro", "nota": 5.0}\n]',
    starterCode: 'turma = [\n    {"nome": "Ana", "nota": 8.5},\n    {"nome": "Carlos", "nota": 6.0},\n    {"nome": "Julia", "nota": 9.0},\n    {"nome": "Marcos", "nota": 4.5}\n]\n\ndef analisar_turma(alunos):\n    aprovados = []\n    # 1. Percorra os alunos com for\n    # 2. Se a nota do aluno for >= 7.0, adicione o nome à lista aprovados\n    # 3. Retorne a lista de aprovados\n    return aprovados\n\nprint(analisar_turma(turma))\n',
    solutionCode: 'turma = [\n    {"nome": "Ana", "nota": 8.5},\n    {"nome": "Carlos", "nota": 6.0},\n    {"nome": "Julia", "nota": 9.0},\n    {"nome": "Marcos", "nota": 4.5}\n]\n\ndef analisar_turma(alunos):\n    aprovados = []\n    for aluno in alunos:\n        if aluno["nota"] >= 7.0:\n            aprovados.append(aluno["nome"])\n    return aprovados\n\nprint(analisar_turma(turma))',
    hints: [
      'Inicie a lista vazia: aprovados = []',
      'Faça um for aluno in alunos:',
      'Dentro do for, verifique if aluno["nota"] >= 7.0:',
      'Se a condição for verdadeira, faça aprovados.append(aluno["nome"]).',
      'Retorne aprovados no final.'
    ],
    testCases: [
      {
        expectedOutput: ['Ana', 'Julia'],
        description: 'Apenas Ana (8.5) e Julia (9.0) possuem nota >= 7.0.'
      }
    ],
    solutionBreakdown: {
      objective: 'Filtrar estruturas de dados complexas aninhadas (listas de dicionários) com critérios lógicos.',
      reasoning: 'Iteramos sobre os registros da turma e selecionamos apenas aqueles que satisfazem a regra de corte de aprovação.',
      stepByStep: [
        '1. Inicializar lista `aprovados = []`.',
        '2. Percorrer cada dicionário `aluno` na lista `alunos`.',
        '3. Acessar a chave `aluno["nota"]` e comparar com 7.0.',
        '4. Caso seja >= 7.0, adicionar `aluno["nome"]` à lista.',
        '5. Retornar a lista `aprovados`.'
      ],
      finalCode: 'turma = [\n    {"nome": "Ana", "nota": 8.5},\n    {"nome": "Carlos", "nota": 6.0},\n    {"nome": "Julia", "nota": 9.0},\n    {"nome": "Marcos", "nota": 4.5}\n]\n\ndef analisar_turma(alunos):\n    aprovados = []\n    for aluno in alunos:\n        if aluno["nota"] >= 7.0:\n            aprovados.append(aluno["nome"])\n    return aprovados\n\nprint(analisar_turma(turma))',
      commonMistakes: [
        'Adicionar o dicionário inteiro em vez de apenas o nome (`aluno["nome"]`).',
        'Não colocar o return fora do for.'
      ],
      realWorldApplication: 'Geração de relatórios escolares, seleção de candidatos em plataformas de recrutamento e triagem de clientes premium.'
    },
    xp: 40,
    tags: ['capstone', 'dicionarios', 'listas', 'filtros', 'funcoes']
  }
];
