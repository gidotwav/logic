import { SqlDataset } from '../../types/database';

export const universidadeDataset: SqlDataset = {
  id: 'universidade',
  name: 'Gestão Acadêmica (Universidade)',
  description: 'Banco de dados de controle acadêmico contendo alunos, professores, disciplinas, matrículas e notas.',
  icon: 'GraduationCap',
  tables: [
    {
      name: 'alunos',
      description: 'Estudantes matriculados na instituição.',
      columns: [
        { name: 'id', type: 'INTEGER', isPrimaryKey: true, description: 'Matrícula do aluno' },
        { name: 'nome', type: 'TEXT', description: 'Nome do aluno' },
        { name: 'curso', type: 'TEXT', description: 'Curso de graduação' },
        { name: 'semestre', type: 'INTEGER', description: 'Semestre atual (1 a 8)' },
        { name: 'data_nascimento', type: 'TEXT', description: 'Data de nascimento' }
      ],
      sampleData: [
        { id: 1, nome: 'Gabriel Rocha', curso: 'Ciência da Computação', semestre: 3, data_nascimento: '2002-04-12' },
        { id: 2, nome: 'Larissa Mendes', curso: 'Engenharia de Software', semestre: 5, data_nascimento: '2001-09-28' },
        { id: 3, nome: 'Matheus Cunha', curso: 'Ciência da Computação', semestre: 1, data_nascimento: '2004-01-19' },
        { id: 4, nome: 'Camila Barros', curso: 'Sistemas de Informação', semestre: 7, data_nascimento: '2000-11-03' },
        { id: 5, nome: 'Felipe Martins', curso: 'Engenharia de Software', semestre: 2, data_nascimento: '2003-07-21' },
        { id: 6, nome: 'Isabela Costa', curso: 'Ciência da Computação', semestre: 4, data_nascimento: '2002-02-15' }
      ],
      createTableSql: `
        CREATE TABLE alunos (
          id INTEGER PRIMARY KEY,
          nome TEXT NOT NULL,
          curso TEXT NOT NULL,
          semestre INTEGER NOT NULL,
          data_nascimento TEXT NOT NULL
        );
      `,
      insertDataSql: `
        INSERT INTO alunos (id, nome, curso, semestre, data_nascimento) VALUES
        (1, 'Gabriel Rocha', 'Ciência da Computação', 3, '2002-04-12'),
        (2, 'Larissa Mendes', 'Engenharia de Software', 5, '2001-09-28'),
        (3, 'Matheus Cunha', 'Ciência da Computação', 1, '2004-01-19'),
        (4, 'Camila Barros', 'Sistemas de Informação', 7, '2000-11-03'),
        (5, 'Felipe Martins', 'Engenharia de Software', 2, '2003-07-21'),
        (6, 'Isabela Costa', 'Ciência da Computação', 4, '2002-02-15');
      `
    },
    {
      name: 'professores',
      description: 'Corpo docente da universidade.',
      columns: [
        { name: 'id', type: 'INTEGER', isPrimaryKey: true, description: 'ID do docente' },
        { name: 'nome', type: 'TEXT', description: 'Nome do professor' },
        { name: 'departamento', type: 'TEXT', description: 'Departamento de atuação' },
        { name: 'titulacao', type: 'TEXT', description: 'Titulação (Mestre, Doutor, Especialista)' },
        { name: 'salario', type: 'REAL', description: 'Salário bruto mensal' }
      ],
      sampleData: [
        { id: 10, nome: 'Dr. Roberto Vasconcelos', departamento: 'Computação', titulacao: 'Doutor', salario: 12500.00 },
        { id: 20, nome: 'Dra. Helena Duarte', departamento: 'Computação', titulacao: 'Doutor', salario: 13200.00 },
        { id: 30, nome: 'Me. André Queiroz', departamento: 'Matemática', titulacao: 'Mestre', salario: 8900.00 },
        { id: 40, nome: 'Dra. Vanessa Lemos', departamento: 'Engenharia', titulacao: 'Doutor', salario: 11800.00 }
      ],
      createTableSql: `
        CREATE TABLE professores (
          id INTEGER PRIMARY KEY,
          nome TEXT NOT NULL,
          departamento TEXT NOT NULL,
          titulacao TEXT NOT NULL,
          salario REAL NOT NULL
        );
      `,
      insertDataSql: `
        INSERT INTO professores (id, nome, departamento, titulacao, salario) VALUES
        (10, 'Dr. Roberto Vasconcelos', 'Computação', 'Doutor', 12500.00),
        (20, 'Dra. Helena Duarte', 'Computação', 'Doutor', 13200.00),
        (30, 'Me. André Queiroz', 'Matemática', 'Mestre', 8900.00),
        (40, 'Dra. Vanessa Lemos', 'Engenharia', 'Doutor', 11800.00);
      `
    },
    {
      name: 'disciplinas',
      description: 'Matérias ofertadas pelos cursos.',
      columns: [
        { name: 'id', type: 'INTEGER', isPrimaryKey: true, description: 'Código da disciplina' },
        { name: 'nome', type: 'TEXT', description: 'Nome da disciplina' },
        { name: 'professor_id', type: 'INTEGER', isForeignKey: true, references: 'professores(id)', description: 'ID do professor responsável' },
        { name: 'carga_horaria', type: 'INTEGER', description: 'Horas-aula da disciplina' }
      ],
      sampleData: [
        { id: 101, nome: 'Banco de Dados I', professor_id: 10, carga_horaria: 60 },
        { id: 102, nome: 'Algoritmos e Estruturas de Dados', professor_id: 20, carga_horaria: 80 },
        { id: 103, nome: 'Cálculo Diferencial e Integral', professor_id: 30, carga_horaria: 80 },
        { id: 104, nome: 'Engenharia de Requisitos', professor_id: 40, carga_horaria: 40 },
        { id: 105, nome: 'Inteligência Artificial', professor_id: 10, carga_horaria: 60 }
      ],
      createTableSql: `
        CREATE TABLE disciplinas (
          id INTEGER PRIMARY KEY,
          nome TEXT NOT NULL,
          professor_id INTEGER NOT NULL,
          carga_horaria INTEGER NOT NULL,
          FOREIGN KEY (professor_id) REFERENCES professores(id)
        );
      `,
      insertDataSql: `
        INSERT INTO disciplinas (id, nome, professor_id, carga_horaria) VALUES
        (101, 'Banco de Dados I', 10, 60),
        (102, 'Algoritmos e Estruturas de Dados', 20, 80),
        (103, 'Cálculo Diferencial e Integral', 30, 80),
        (104, 'Engenharia de Requisitos', 40, 40),
        (105, 'Inteligência Artificial', 10, 60);
      `
    },
    {
      name: 'matriculas',
      description: 'Vínculo do aluno com cada disciplina no período letivo.',
      columns: [
        { name: 'id', type: 'INTEGER', isPrimaryKey: true, description: 'Código de matrícula' },
        { name: 'aluno_id', type: 'INTEGER', isForeignKey: true, references: 'alunos(id)', description: 'ID do aluno' },
        { name: 'disciplina_id', type: 'INTEGER', isForeignKey: true, references: 'disciplinas(id)', description: 'ID da disciplina' },
        { name: 'ano', type: 'INTEGER', description: 'Ano letivo' },
        { name: 'semestre', type: 'INTEGER', description: 'Semestre (1 ou 2)' }
      ],
      sampleData: [
        { id: 501, aluno_id: 1, disciplina_id: 101, ano: 2024, semestre: 1 },
        { id: 502, aluno_id: 1, disciplina_id: 102, ano: 2024, semestre: 1 },
        { id: 503, aluno_id: 2, disciplina_id: 101, ano: 2024, semestre: 1 },
        { id: 504, aluno_id: 3, disciplina_id: 103, ano: 2024, semestre: 1 },
        { id: 505, aluno_id: 4, disciplina_id: 104, ano: 2024, semestre: 1 },
        { id: 506, aluno_id: 5, disciplina_id: 102, ano: 2024, semestre: 1 },
        { id: 507, aluno_id: 6, disciplina_id: 105, ano: 2024, semestre: 1 }
      ],
      createTableSql: `
        CREATE TABLE matriculas (
          id INTEGER PRIMARY KEY,
          aluno_id INTEGER NOT NULL,
          disciplina_id INTEGER NOT NULL,
          ano INTEGER NOT NULL,
          semestre INTEGER NOT NULL,
          FOREIGN KEY (aluno_id) REFERENCES alunos(id),
          FOREIGN KEY (disciplina_id) REFERENCES disciplinas(id)
        );
      `,
      insertDataSql: `
        INSERT INTO matriculas (id, aluno_id, disciplina_id, ano, semestre) VALUES
        (501, 1, 101, 2024, 1),
        (502, 1, 102, 2024, 1),
        (503, 2, 101, 2024, 1),
        (504, 3, 103, 2024, 1),
        (505, 4, 104, 2024, 1),
        (506, 5, 102, 2024, 1),
        (507, 6, 105, 2024, 1);
      `
    },
    {
      name: 'notas',
      description: 'Desempenho avaliativo dos alunos nas disciplinas.',
      columns: [
        { name: 'id', type: 'INTEGER', isPrimaryKey: true, description: 'ID da nota' },
        { name: 'matricula_id', type: 'INTEGER', isForeignKey: true, references: 'matriculas(id)', description: 'ID da matrícula' },
        { name: 'nota1', type: 'REAL', description: 'Primeira avaliação' },
        { name: 'nota2', type: 'REAL', description: 'Segunda avaliação' },
        { name: 'media', type: 'REAL', description: 'Média final calculada' },
        { name: 'status', type: 'TEXT', description: 'Aprovado, Reprovado ou Recuperação' }
      ],
      sampleData: [
        { id: 1, matricula_id: 501, nota1: 8.5, nota2: 9.0, media: 8.75, status: 'Aprovado' },
        { id: 2, matricula_id: 502, nota1: 6.0, nota2: 7.5, media: 6.75, status: 'Aprovado' },
        { id: 3, matricula_id: 503, nota1: 9.5, nota2: 9.5, media: 9.50, status: 'Aprovado' },
        { id: 4, matricula_id: 504, nota1: 4.0, nota2: 5.0, media: 4.50, status: 'Reprovado' },
        { id: 5, matricula_id: 505, nota1: 7.0, nota2: 8.0, media: 7.50, status: 'Aprovado' },
        { id: 6, matricula_id: 506, nota1: 5.5, nota2: 6.0, media: 5.75, status: 'Recuperação' },
        { id: 7, matricula_id: 507, nota1: 10.0, nota2: 9.0, media: 9.50, status: 'Aprovado' }
      ],
      createTableSql: `
        CREATE TABLE notas (
          id INTEGER PRIMARY KEY,
          matricula_id INTEGER NOT NULL,
          nota1 REAL NOT NULL,
          nota2 REAL NOT NULL,
          media REAL NOT NULL,
          status TEXT NOT NULL,
          FOREIGN KEY (matricula_id) REFERENCES matriculas(id)
        );
      `,
      insertDataSql: `
        INSERT INTO notas (id, matricula_id, nota1, nota2, media, status) VALUES
        (1, 501, 8.5, 9.0, 8.75, 'Aprovado'),
        (2, 502, 6.0, 7.5, 6.75, 'Aprovado'),
        (3, 503, 9.5, 9.5, 9.50, 'Aprovado'),
        (4, 504, 4.0, 5.0, 4.50, 'Reprovado'),
        (5, 505, 7.0, 8.0, 7.50, 'Aprovado'),
        (6, 506, 5.5, 6.0, 5.75, 'Recuperação'),
        (7, 507, 10.0, 9.0, 9.50, 'Aprovado');
      `
    }
  ]
};
