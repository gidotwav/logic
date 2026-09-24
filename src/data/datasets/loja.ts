import { SqlDataset } from '../../types/database';

export const lojaDataset: SqlDataset = {
  id: 'loja',
  name: 'E-commerce (Loja Virtual)',
  description: 'Banco de dados de um comércio eletrônico com clientes, produtos, pedidos e itens vendidos.',
  icon: 'ShoppingCart',
  tables: [
    {
      name: 'clientes',
      description: 'Registro dos clientes cadastrados na plataforma.',
      columns: [
        { name: 'id', type: 'INTEGER', isPrimaryKey: true, description: 'Identificador único do cliente' },
        { name: 'nome', type: 'TEXT', description: 'Nome completo do cliente' },
        { name: 'email', type: 'TEXT', description: 'E-mail para contato' },
        { name: 'cidade', type: 'TEXT', description: 'Cidade de residência' },
        { name: 'estado', type: 'TEXT', description: 'Sigla do estado (ex: SP, RJ, MG)' },
        { name: 'data_cadastro', type: 'TEXT', description: 'Data em que se cadastrou (YYYY-MM-DD)' }
      ],
      sampleData: [
        { id: 1, nome: 'Ana Silva', email: 'ana.silva@email.com', cidade: 'São Paulo', estado: 'SP', data_cadastro: '2023-01-15' },
        { id: 2, nome: 'Carlos Eduardo', email: 'carlos.e@email.com', cidade: 'Recife', estado: 'PE', data_cadastro: '2023-02-20' },
        { id: 3, nome: 'Julia Pereira', email: 'julia.p@email.com', cidade: 'Curitiba', estado: 'PR', data_cadastro: '2023-03-10' },
        { id: 4, nome: 'Marcos Santos', email: 'marcos.s@email.com', cidade: 'São Paulo', estado: 'SP', data_cadastro: '2023-04-05' },
        { id: 5, nome: 'Beatriz Lima', email: 'beatriz.l@email.com', cidade: 'Belo Horizonte', estado: 'MG', data_cadastro: '2023-05-18' },
        { id: 6, nome: 'Lucas Oliveira', email: 'lucas.o@email.com', cidade: 'Rio de Janeiro', estado: 'RJ', data_cadastro: '2023-06-22' },
        { id: 7, nome: 'Fernanda Souza', email: 'fernanda.s@email.com', cidade: 'Porto Alegre', estado: 'RS', data_cadastro: '2023-07-01' },
        { id: 8, nome: 'Rodrigo Alves', email: 'rodrigo.a@email.com', cidade: 'Salvador', estado: 'BA', data_cadastro: '2023-08-14' }
      ],
      createTableSql: `
        CREATE TABLE clientes (
          id INTEGER PRIMARY KEY,
          nome TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          cidade TEXT NOT NULL,
          estado TEXT NOT NULL,
          data_cadastro TEXT NOT NULL
        );
      `,
      insertDataSql: `
        INSERT INTO clientes (id, nome, email, cidade, estado, data_cadastro) VALUES
        (1, 'Ana Silva', 'ana.silva@email.com', 'São Paulo', 'SP', '2023-01-15'),
        (2, 'Carlos Eduardo', 'carlos.e@email.com', 'Recife', 'PE', '2023-02-20'),
        (3, 'Julia Pereira', 'julia.p@email.com', 'Curitiba', 'PR', '2023-03-10'),
        (4, 'Marcos Santos', 'marcos.s@email.com', 'São Paulo', 'SP', '2023-04-05'),
        (5, 'Beatriz Lima', 'beatriz.l@email.com', 'Belo Horizonte', 'MG', '2023-05-18'),
        (6, 'Lucas Oliveira', 'lucas.o@email.com', 'Rio de Janeiro', 'RJ', '2023-06-22'),
        (7, 'Fernanda Souza', 'fernanda.s@email.com', 'Porto Alegre', 'RS', '2023-07-01'),
        (8, 'Rodrigo Alves', 'rodrigo.a@email.com', 'Salvador', 'BA', '2023-08-14');
      `
    },
    {
      name: 'produtos',
      description: 'Catálogo de produtos disponíveis na loja.',
      columns: [
        { name: 'id', type: 'INTEGER', isPrimaryKey: true, description: 'Código identificador do produto' },
        { name: 'nome', type: 'TEXT', description: 'Nome comercial do produto' },
        { name: 'categoria', type: 'TEXT', description: 'Categoria (ex: Eletrônicos, Móveis, Vestuário)' },
        { name: 'preco', type: 'REAL', description: 'Preço unitário em Reais' },
        { name: 'estoque', type: 'INTEGER', description: 'Quantidade física em estoque' }
      ],
      sampleData: [
        { id: 101, nome: 'Teclado Mecânico RGB', categoria: 'Eletrônicos', preco: 250.00, estoque: 45 },
        { id: 102, nome: 'Mouse Sem Fio Ergonômico', categoria: 'Eletrônicos', preco: 120.50, estoque: 80 },
        { id: 103, nome: 'Monitor Gamer 27" 144Hz', categoria: 'Eletrônicos', preco: 1450.00, estoque: 15 },
        { id: 104, nome: 'Cadeira de Escritório Ergonômica', categoria: 'Móveis', preco: 780.00, estoque: 20 },
        { id: 105, nome: 'Mesa para Computador 120cm', categoria: 'Móveis', preco: 450.00, estoque: 12 },
        { id: 106, nome: 'Camiseta Algodão Básica', categoria: 'Vestuário', preco: 49.90, estoque: 150 },
        { id: 107, nome: 'Headset Gamer 7.1', categoria: 'Eletrônicos', preco: 320.00, estoque: 30 },
        { id: 108, nome: 'Luminária de Mesa LED', categoria: 'Móveis', preco: 89.90, estoque: 65 }
      ],
      createTableSql: `
        CREATE TABLE produtos (
          id INTEGER PRIMARY KEY,
          nome TEXT NOT NULL,
          categoria TEXT NOT NULL,
          preco REAL NOT NULL,
          estoque INTEGER NOT NULL
        );
      `,
      insertDataSql: `
        INSERT INTO produtos (id, nome, categoria, preco, estoque) VALUES
        (101, 'Teclado Mecânico RGB', 'Eletrônicos', 250.00, 45),
        (102, 'Mouse Sem Fio Ergonômico', 'Eletrônicos', 120.50, 80),
        (103, 'Monitor Gamer 27" 144Hz', 'Eletrônicos', 1450.00, 15),
        (104, 'Cadeira de Escritório Ergonômica', 'Móveis', 780.00, 20),
        (105, 'Mesa para Computador 120cm', 'Móveis', 450.00, 12),
        (106, 'Camiseta Algodão Básica', 'Vestuário', 49.90, 150),
        (107, 'Headset Gamer 7.1', 'Eletrônicos', 320.00, 30),
        (108, 'Luminária de Mesa LED', 'Móveis', 89.90, 65);
      `
    },
    {
      name: 'pedidos',
      description: 'Compras realizadas pelos clientes.',
      columns: [
        { name: 'id', type: 'INTEGER', isPrimaryKey: true, description: 'Número do pedido' },
        { name: 'cliente_id', type: 'INTEGER', isForeignKey: true, references: 'clientes(id)', description: 'ID do cliente que comprou' },
        { name: 'data_pedido', type: 'TEXT', description: 'Data do pedido (YYYY-MM-DD)' },
        { name: 'status', type: 'TEXT', description: 'Status (Entregue, Enviado, Processando, Cancelado)' },
        { name: 'total', type: 'REAL', description: 'Valor total do pedido' }
      ],
      sampleData: [
        { id: 1001, cliente_id: 1, data_pedido: '2023-09-01', status: 'Entregue', total: 370.50 },
        { id: 1002, cliente_id: 2, data_pedido: '2023-09-05', status: 'Entregue', total: 1450.00 },
        { id: 1003, cliente_id: 3, data_pedido: '2023-09-12', status: 'Entregue', total: 780.00 },
        { id: 1004, cliente_id: 1, data_pedido: '2023-10-03', status: 'Entregue', total: 120.50 },
        { id: 1005, cliente_id: 4, data_pedido: '2023-10-15', status: 'Processando', total: 570.00 },
        { id: 1006, cliente_id: 5, data_pedido: '2023-10-20', status: 'Enviado', total: 1770.00 },
        { id: 1007, cliente_id: 6, data_pedido: '2023-11-02', status: 'Cancelado', total: 250.00 },
        { id: 1008, cliente_id: 2, data_pedido: '2023-11-10', status: 'Entregue', total: 320.00 }
      ],
      createTableSql: `
        CREATE TABLE pedidos (
          id INTEGER PRIMARY KEY,
          cliente_id INTEGER NOT NULL,
          data_pedido TEXT NOT NULL,
          status TEXT NOT NULL,
          total REAL NOT NULL,
          FOREIGN KEY (cliente_id) REFERENCES clientes(id)
        );
      `,
      insertDataSql: `
        INSERT INTO pedidos (id, cliente_id, data_pedido, status, total) VALUES
        (1001, 1, '2023-09-01', 'Entregue', 370.50),
        (1002, 2, '2023-09-05', 'Entregue', 1450.00),
        (1003, 3, '2023-09-12', 'Entregue', 780.00),
        (1004, 1, '2023-10-03', 'Entregue', 120.50),
        (1005, 4, '2023-10-15', 'Processando', 570.00),
        (1006, 5, '2023-10-20', 'Enviado', 1770.00),
        (1007, 6, '2023-11-02', 'Cancelado', 250.00),
        (1008, 2, '2023-11-10', 'Entregue', 320.00);
      `
    },
    {
      name: 'itens_pedido',
      description: 'Produtos individuais contidos em cada pedido.',
      columns: [
        { name: 'id', type: 'INTEGER', isPrimaryKey: true, description: 'ID do item' },
        { name: 'pedido_id', type: 'INTEGER', isForeignKey: true, references: 'pedidos(id)', description: 'ID do pedido correspondente' },
        { name: 'produto_id', type: 'INTEGER', isForeignKey: true, references: 'produtos(id)', description: 'ID do produto comprado' },
        { name: 'quantidade', type: 'INTEGER', description: 'Quantidade comprada' },
        { name: 'preco_unitario', type: 'REAL', description: 'Preço cobrado pela unidade' }
      ],
      sampleData: [
        { id: 1, pedido_id: 1001, produto_id: 101, quantidade: 1, preco_unitario: 250.00 },
        { id: 2, pedido_id: 1001, produto_id: 102, quantidade: 1, preco_unitario: 120.50 },
        { id: 3, pedido_id: 1002, produto_id: 103, quantidade: 1, preco_unitario: 1450.00 },
        { id: 4, pedido_id: 1003, produto_id: 104, quantidade: 1, preco_unitario: 780.00 },
        { id: 5, pedido_id: 1004, produto_id: 102, quantidade: 1, preco_unitario: 120.50 },
        { id: 6, pedido_id: 1005, produto_id: 101, quantidade: 1, preco_unitario: 250.00 },
        { id: 7, pedido_id: 1005, produto_id: 107, quantidade: 1, preco_unitario: 320.00 },
        { id: 8, pedido_id: 1006, produto_id: 103, quantidade: 1, preco_unitario: 1450.00 },
        { id: 9, pedido_id: 1006, produto_id: 107, quantidade: 1, preco_unitario: 320.00 },
        { id: 10, pedido_id: 1007, produto_id: 101, quantidade: 1, preco_unitario: 250.00 },
        { id: 11, pedido_id: 1008, produto_id: 107, quantidade: 1, preco_unitario: 320.00 }
      ],
      createTableSql: `
        CREATE TABLE itens_pedido (
          id INTEGER PRIMARY KEY,
          pedido_id INTEGER NOT NULL,
          produto_id INTEGER NOT NULL,
          quantidade INTEGER NOT NULL,
          preco_unitario REAL NOT NULL,
          FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
          FOREIGN KEY (produto_id) REFERENCES produtos(id)
        );
      `,
      insertDataSql: `
        INSERT INTO itens_pedido (id, pedido_id, produto_id, quantidade, preco_unitario) VALUES
        (1, 1001, 101, 1, 250.00),
        (2, 1001, 102, 1, 120.50),
        (3, 1002, 103, 1, 1450.00),
        (4, 1003, 104, 1, 780.00),
        (5, 1004, 102, 1, 120.50),
        (6, 1005, 101, 1, 250.00),
        (7, 1005, 107, 1, 320.00),
        (8, 1006, 103, 1, 1450.00),
        (9, 1006, 107, 1, 320.00),
        (10, 1007, 101, 1, 250.00),
        (11, 1008, 107, 1, 320.00);
      `
    }
  ]
};
