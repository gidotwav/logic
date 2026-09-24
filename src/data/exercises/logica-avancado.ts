import { Exercise } from '../../types/exercise';

export const logicaAvancadoExercises: Exercise[] = [
  {
    id: 'log-a-01',
    title: 'Recursão: O Cálculo do Fatorial',
    track: 'logica',
    module: 'avancado',
    topic: 'Recursão e Caso Base',
    order: 1,
    difficulty: 'medio',
    format: 'code',
    description: 'Crie uma função recursiva `fatorial(n)` que calcule o fatorial de um número natural. O fatorial de 0 ou 1 é 1 (caso base). Para n > 1, o fatorial é `n * fatorial(n - 1)`. Teste com 5 e imprima o resultado (120).',
    conceptExplanation: 'Recursão é quando uma função chama a si mesma para resolver um subproblema menor. Todo algoritmo recursivo precisa obrigatoriamente de duas coisas: 1) Um Caso Base (condição de parada para não entrar em loop infinito) e 2) O Passo Recursivo que se aproxima do caso base.',
    codeExample: 'def contagem_regressiva(n):\n    if n == 0:\n        print("Fim!")\n        return\n    print(n)\n    contagem_regressiva(n - 1)',
    starterCode: 'def fatorial(n):\n    # 1. Caso base: se n <= 1, retorne 1\n    # 2. Passo recursivo: retorne n * fatorial(n - 1)\n    pass\n\nprint(fatorial(5))\n',
    solutionCode: 'def fatorial(n):\n    if n <= 1:\n        return 1\n    return n * fatorial(n - 1)\n\nprint(fatorial(5))',
    hints: [
      'O caso base é: if n <= 1: return 1',
      'O passo recursivo é: return n * fatorial(n - 1)',
      'Chame print(fatorial(5)) para testar com o número 5.'
    ],
    testCases: [
      {
        input: 5,
        expectedOutput: 120,
        description: '5! = 5 * 4 * 3 * 2 * 1 = 120.'
      },
      {
        input: 3,
        expectedOutput: 6,
        description: '3! = 3 * 2 * 1 = 6.',
        hidden: true
      }
    ],
    solutionBreakdown: {
      objective: 'Compreender a pilha de chamadas (call stack) e a estrutura fundamental da recursão.',
      reasoning: 'Ao chamar `fatorial(5)`, o computador empilha as chamadas até chegar a `fatorial(1)`, e depois desempilha multiplicando os retornos.',
      stepByStep: [
        '1. Se `n <= 1`, retornar imediatamente 1 (caso base).',
        '2. Senão, retornar `n * fatorial(n - 1)`.',
        '3. Executar e validar com 5! = 120.'
      ],
      finalCode: 'def fatorial(n):\n    if n <= 1:\n        return 1\n    return n * fatorial(n - 1)\n\nprint(fatorial(5))',
      commonMistakes: [
        'Esquecer o caso base, causando estouro da pilha de recursão (RecursionError: maximum recursion depth exceeded).'
      ],
      realWorldApplication: 'Navegação em árvores de arquivos no computador, renderização do DOM em navegadores e algoritmos de inteligência artificial como Minimax.'
    },
    xp: 25,
    tags: ['recursao', 'fatorial', 'pilha']
  },
  {
    id: 'log-a-02',
    title: 'Busca Binária: Eficiência O(log N)',
    track: 'logica',
    module: 'avancado',
    topic: 'Algoritmos de Busca & Complexidade',
    order: 2,
    difficulty: 'dificil',
    format: 'code',
    description: 'Implemente a função `busca_binaria(lista_ordenada, alvo)` que encontra a posição (índice) de um número em uma lista previamente ordenada dividindo o espaço de busca pela metade a cada passo. Se o alvo for encontrado, retorne o índice; se não existir, retorne -1. Teste buscando o valor 23 na lista `[2, 5, 8, 12, 16, 23, 38, 56, 72, 91]` e imprima o índice.',
    conceptExplanation: 'Em uma lista de 1 bilhão de itens, uma busca linear normal pode demorar 1 bilhão de passos. A Busca Binária encontra qualquer item em no máximo 30 passos! Ela olha o elemento do meio (`meio = (inicio + fim) // 2`): se o alvo for menor, descarta toda a metade direita; se for maior, descarta a metade esquerda.',
    codeExample: 'inicio = 0\nfim = len(lista) - 1\nwhile inicio <= fim:\n    meio = (inicio + fim) // 2\n    # Compara lista[meio] com alvo',
    starterCode: 'def busca_binaria(lista, alvo):\n    inicio = 0\n    fim = len(lista) - 1\n    \n    while inicio <= fim:\n        meio = (inicio + fim) // 2\n        if lista[meio] == alvo:\n            return meio\n        elif lista[meio] < alvo:\n            inicio = meio + 1\n        else:\n            fim = meio - 1\n            \n    return -1\n\nvalores = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]\nprint(busca_binaria(valores, 23))\n',
    solutionCode: 'def busca_binaria(lista, alvo):\n    inicio = 0\n    fim = len(lista) - 1\n    \n    while inicio <= fim:\n        meio = (inicio + fim) // 2\n        if lista[meio] == alvo:\n            return meio\n        elif lista[meio] < alvo:\n            inicio = meio + 1\n        else:\n            fim = meio - 1\n            \n    return -1\n\nvalores = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]\nprint(busca_binaria(valores, 23))',
    hints: [
      'Calcule a posição central: meio = (inicio + fim) // 2.',
      'Se lista[meio] == alvo, retorne meio imediatamente.',
      'Se lista[meio] < alvo, o número procurado está na direita, então ajuste inicio = meio + 1.',
      'Se for maior, ajuste fim = meio - 1.',
      'Se o while terminar sem encontrar, retorne -1.'
    ],
    testCases: [
      {
        input: [[2, 5, 8, 12, 16, 23, 38, 56, 72, 91], 23],
        expectedOutput: 5,
        description: 'O número 23 está na posição de índice 5.'
      }
    ],
    solutionBreakdown: {
      objective: 'Construir o algoritmo clássico de busca binária com complexidade logarítmica O(log N).',
      reasoning: 'Ao dividir pela metade a cada comparação, o número de operações cresce apenas com o logaritmo da quantidade de elementos na base 2.',
      stepByStep: [
        '1. Definir ponteiros `inicio = 0` e `fim = len(lista) - 1`.',
        '2. Enquanto `inicio <= fim`:',
        '3. Obter o ponto médio `meio = (inicio + fim) // 2`.',
        '4. Comparar `lista[meio]` com `alvo` e ajustar os ponteiros.',
        '5. Retornar a posição ou -1.'
      ],
      finalCode: 'def busca_binaria(lista, alvo):\n    inicio = 0\n    fim = len(lista) - 1\n    while inicio <= fim:\n        meio = (inicio + fim) // 2\n        if lista[meio] == alvo:\n            return meio\n        elif lista[meio] < alvo:\n            inicio = meio + 1\n        else:\n            fim = meio - 1\n    return -1',
      commonMistakes: [
        'Aplicar busca binária em listas não ordenadas (ela SÓ funciona se a lista estiver em ordem crescente!).',
        'Usar `inicio < fim` ao invés de `inicio <= fim`, perdendo o último elemento possível.'
      ],
      realWorldApplication: 'Mecanismos de busca, índices em bancos de dados SQL (índices B-Tree) e busca de commits no Git (git bisect).'
    },
    xp: 35,
    tags: ['busca_binaria', 'algoritmo', 'big_o', 'otimizacao']
  },
  {
    id: 'log-a-03',
    title: 'Algoritmo de Ordenação: Bubble Sort',
    track: 'logica',
    module: 'avancado',
    topic: 'Algoritmos de Ordenação',
    order: 3,
    difficulty: 'dificil',
    format: 'code',
    description: 'Implemente o algoritmo `bubble_sort(lista)` que ordena uma lista em ordem crescente comparando pares adjacentes e trocando-os de lugar caso estejam fora de ordem. Teste com `[64, 34, 25, 12, 22, 11, 90]` e retorne a lista ordenada.',
    conceptExplanation: 'O Bubble Sort (ordenação por bolha) percorre a lista várias vezes. Se o elemento da esquerda for maior que o da direita (`lista[j] > lista[j+1]`), eles trocam de lugar (`lista[j], lista[j+1] = lista[j+1], lista[j]`). Os maiores números "flutuam" como bolhas para o final da lista!',
    codeExample: 'n = len(lista)\nfor i in range(n):\n    for j in range(0, n - i - 1):\n        if lista[j] > lista[j+1]:\n            # Faz a troca',
    starterCode: 'def bubble_sort(lista):\n    n = len(lista)\n    # Implemente os dois loops for aninhados para comparar e trocar:\n    for i in range(n):\n        for j in range(0, n - i - 1):\n            if lista[j] > lista[j + 1]:\n                # Troque os dois elementos de lugar:\n                temp = lista[j]\n                lista[j] = lista[j + 1]\n                lista[j + 1] = temp\n    return lista\n\nnums = [64, 34, 25, 12, 22, 11, 90]\nprint(bubble_sort(nums))\n',
    solutionCode: 'def bubble_sort(lista):\n    n = len(lista)\n    for i in range(n):\n        for j in range(0, n - i - 1):\n            if lista[j] > lista[j + 1]:\n                temp = lista[j]\n                lista[j] = lista[j + 1]\n                lista[j + 1] = temp\n    return lista\n\nnums = [64, 34, 25, 12, 22, 11, 90]\nprint(bubble_sort(nums))',
    hints: [
      'Use o loop externo for i in range(n) e o interno for j in range(0, n - i - 1).',
      'Compare if lista[j] > lista[j + 1]:',
      'Para trocar sem perder o valor, use uma variável temporária ou a sintaxe de desempacotamento de Python: lista[j], lista[j+1] = lista[j+1], lista[j].',
      'Retorne lista no final.'
    ],
    testCases: [
      {
        input: [[64, 34, 25, 12, 22, 11, 90]],
        expectedOutput: [11, 12, 22, 25, 34, 64, 90],
        description: 'A lista ordenada crescente deve ser [11, 12, 22, 25, 34, 64, 90].'
      }
    ],
    solutionBreakdown: {
      objective: 'Compreender laços aninhados e mecânica de ordenação por comparação com complexidade O(N²).',
      reasoning: 'A cada passagem completa do laço interno, o maior elemento restante é garantidamente colocado na sua posição final correta.',
      stepByStep: [
        '1. Obter tamanho `n = len(lista)`.',
        '2. Executar `n` passagens com `for i in range(n)`.',
        '3. Em cada passagem, comparar itens vizinhos `lista[j]` e `lista[j+1]`.',
        '4. Efetuar a troca (swap) quando fora de ordem.',
        '5. Retornar a lista ordenada.'
      ],
      finalCode: 'def bubble_sort(lista):\n    n = len(lista)\n    for i in range(n):\n        for j in range(0, n - i - 1):\n            if lista[j] > lista[j + 1]:\n                lista[j], lista[j + 1] = lista[j + 1], lista[j]\n    return lista',
      commonMistakes: [
        'Esquecer o `- 1` no range interno, causando erro de índice fora dos limites (IndexError: list index out of range).'
      ],
      realWorldApplication: 'Fundamento pedagógico para entender algoritmos mais sofisticados como QuickSort, MergeSort e TimSort (o algoritmo padrão do Python).'
    },
    xp: 35,
    tags: ['ordenacao', 'bubble_sort', 'algoritmos', 'arrays']
  }
];
