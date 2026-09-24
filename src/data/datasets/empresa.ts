import { SqlDataset } from '../../types/database';

export const empresaDataset: SqlDataset = {
  id: 'empresa',
  name: 'Recursos Humanos & Projetos (Empresa)',
  description: 'Estrutura corporativa contendo departamentos, colaboradores, cargos, salários e alocação em projetos.',
  icon: 'Building2',
  tables: [
    {
      name: 'departamentos',
      description: 'Áreas de negócio da empresa.',
      columns: [
        { name: 'id', type: 'INTEGER', isPrimaryKey: true, description: 'Código do departamento' },
        { name: 'nome', type: 'TEXT', description: 'Nome do setor' },
        { name: 'orcamento', type: 'REAL', description: 'Orçamento anual em Reais' },
        { name: 'localizacao', type: 'TEXT', description: 'Andar ou filial' }
      ],
      sampleData: [
        { id: 1, nome: 'Tecnologia da Informação', orcamento: 450000.00, localizacao: 'Andar 4 - Sede' },
        { id: 2, nome: 'Recursos Humanos', orcamento: 120000.00, localizacao: 'Andar 2 - Sede' },
        { id: 3, nome: 'Marketing & Vendas', orcamento: 320000.00, localizacao: 'Andar 3 - Sede' },
        { id: 4, nome: 'Financeiro', orcamento: 200000.00, localizacao: 'Andar 2 - Sede' },
        { id: 5, nome: 'Operações e Logística', orcamento: 280000.00, localizacao: 'Filial Leste' }
      ],
      createTableSql: `
        CREATE TABLE departamentos (
          id INTEGER PRIMARY KEY,
          nome TEXT NOT NULL,
          orcamento REAL NOT NULL,
          localizacao TEXT NOT NULL
        );
      `,
      insertDataSql: `
        INSERT INTO departamentos (id, nome, orcamento, localizacao) VALUES
        (1, 'Tecnologia da Informação', 450000.00, 'Andar 4 - Sede'),
        (2, 'Recursos Humanos', 120000.00, 'Andar 2 - Sede'),
        (3, 'Marketing & Vendas', 320000.00, 'Andar 3 - Sede'),
        (4, 'Financeiro', 200000.00, 'Andar 2 - Sede'),
        (5, 'Operações e Logística', 280000.00, 'Filial Leste');
      `
    },
    {
      name: 'funcionarios',
      description: 'Quadro de funcionários da organização.',
      columns: [
        { name: 'id', type: 'INTEGER', isPrimaryKey: true, description: 'Matrícula do funcionário' },
        { name: 'nome', type: 'TEXT', description: 'Nome completo' },
        { name: 'cargo', type: 'TEXT', description: 'Título do cargo' },
        { name: 'departamento_id', type: 'INTEGER', isForeignKey: true, references: 'departamentos(id)', description: 'ID do departamento' },
        { name: 'salario', type: 'REAL', description: 'Salário bruto mensal' },
        { name: 'data_admissao', type: 'TEXT', description: 'Data de contratação' }
      ],
      sampleData: [
        { id: 101, nome: 'Renato Miranda', cargo: 'Engenheiro de Dados Senior', departamento_id: 1, salario: 14500.00, data_admissao: '2020-03-15' },
        { id: 102, nome: 'Bianca Fonseca', cargo: 'Desenvolvedora Full Stack', departamento_id: 1, salario: 8500.00, data_admissao: '2021-08-01' },
        { id: 103, nome: 'Gustavo Prado', cargo: 'Analista de RH Pleno', departamento_id: 2, salario: 5200.00, data_admissao: '2022-01-10' },
        { id: 104, nome: 'Patricia Neves', cargo: 'Gerente de Marketing', departamento_id: 3, salario: 12000.00, data_admissao: '2019-11-20' },
        { id: 105, nome: 'Diego Siqueira', cargo: 'Analista Financeiro Senior', departamento_id: 4, salario: 9800.00, data_admissao: '2020-06-05' },
        { id: 106, nome: 'Carla Nogueira', cargo: 'Cientista de Dados', departamento_id: 1, salario: 11000.00, data_admissao: '2022-04-12' },
        { id: 107, nome: 'Eduardo Castro', cargo: 'Assistente de Logística', departamento_id: 5, salario: 3400.00, data_admissao: '2023-02-18' }
      ],
      createTableSql: `
        CREATE TABLE funcionarios (
          id INTEGER PRIMARY KEY,
          nome TEXT NOT NULL,
          cargo TEXT NOT NULL,
          departamento_id INTEGER NOT NULL,
          salario REAL NOT NULL,
          data_admissao TEXT NOT NULL,
          FOREIGN KEY (departamento_id) REFERENCES departamentos(id)
        );
      `,
      insertDataSql: `
        INSERT INTO funcionarios (id, nome, cargo, departamento_id, salario, data_admissao) VALUES
        (101, 'Renato Miranda', 'Engenheiro de Dados Senior', 1, 14500.00, '2020-03-15'),
        (102, 'Bianca Fonseca', 'Desenvolvedora Full Stack', 1, 8500.00, '2021-08-01'),
        (103, 'Gustavo Prado', 'Analista de RH Pleno', 2, 5200.00, '2022-01-10'),
        (104, 'Patricia Neves', 'Gerente de Marketing', 3, 12000.00, '2019-11-20'),
        (105, 'Diego Siqueira', 'Analista Financeiro Senior', 4, 9800.00, '2020-06-05'),
        (106, 'Carla Nogueira', 'Cientista de Dados', 1, 11000.00, '2022-04-12'),
        (107, 'Eduardo Castro', 'Assistente de Logística', 5, 3400.00, '2023-02-18');
      `
    },
    {
      name: 'projetos',
      description: 'Iniciativas estratégicas em desenvolvimento.',
      columns: [
        { name: 'id', type: 'INTEGER', isPrimaryKey: true, description: 'Código do projeto' },
        { name: 'nome', type: 'TEXT', description: 'Nome do projeto' },
        { name: 'departamento_id', type: 'INTEGER', isForeignKey: true, references: 'departamentos(id)', description: 'Departamento líder' },
        { name: 'data_inicio', type: 'TEXT', description: 'Data de início' },
        { name: 'status', type: 'TEXT', description: 'Em Andamento, Concluído ou Planejado' }
      ],
      sampleData: [
        { id: 201, nome: 'Migração Cloud & Data Lake', departamento_id: 1, data_inicio: '2023-01-15', status: 'Em Andamento' },
        { id: 202, nome: 'Portal de Autoatendimento RH', departamento_id: 2, data_inicio: '2023-03-01', status: 'Concluído' },
        { id: 203, nome: 'Campanha Black Friday 360', departamento_id: 3, data_inicio: '2023-08-10', status: 'Em Andamento' },
        { id: 204, nome: 'Automação de Conciliação Bancária', departamento_id: 4, data_inicio: '2023-05-20', status: 'Em Andamento' }
      ],
      createTableSql: `
        CREATE TABLE projetos (
          id INTEGER PRIMARY KEY,
          nome TEXT NOT NULL,
          departamento_id INTEGER NOT NULL,
          data_inicio TEXT NOT NULL,
          status TEXT NOT NULL,
          FOREIGN KEY (departamento_id) REFERENCES departamentos(id)
        );
      `,
      insertDataSql: `
        INSERT INTO projetos (id, nome, departamento_id, data_inicio, status) VALUES
        (201, 'Migração Cloud & Data Lake', 1, '2023-01-15', 'Em Andamento'),
        (202, 'Portal de Autoatendimento RH', 2, '2023-03-01', 'Concluído'),
        (203, 'Campanha Black Friday 360', 3, '2023-08-10', 'Em Andamento'),
        (204, 'Automação de Conciliação Bancária', 4, '2023-05-20', 'Em Andamento');
      `
    }
  ]
};
