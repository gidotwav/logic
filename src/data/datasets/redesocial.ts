import { SqlDataset } from '../../types/database';

export const redesocialDataset: SqlDataset = {
  id: 'redesocial',
  name: 'Comunidade & Engajamento (Rede Social)',
  description: 'Plataforma social com usuários, postagens, comentários, curtidas e conexões de seguidores.',
  icon: 'Share2',
  tables: [
    {
      name: 'usuarios',
      description: 'Perfis de usuários na rede.',
      columns: [
        { name: 'id', type: 'INTEGER', isPrimaryKey: true, description: 'ID do perfil' },
        { name: 'username', type: 'TEXT', description: 'Nome de usuário (@ arroba)' },
        { name: 'nome', type: 'TEXT', description: 'Nome exibido' },
        { name: 'cidade', type: 'TEXT', description: 'Localização' },
        { name: 'verificado', type: 'INTEGER', description: '1 se possui selo verificado, 0 caso contrário' },
        { name: 'data_criacao', type: 'TEXT', description: 'Data de criação da conta' }
      ],
      sampleData: [
        { id: 1, username: 'tech_dev', nome: 'Lucas Tech', cidade: 'São Paulo', verificado: 1, data_criacao: '2022-01-10' },
        { id: 2, username: 'mari_design', nome: 'Mariana Designer', cidade: 'Belo Horizonte', verificado: 0, data_criacao: '2022-03-15' },
        { id: 3, username: 'code_master', nome: 'Dev Senior', cidade: 'Florianópolis', verificado: 1, data_criacao: '2021-08-20' },
        { id: 4, username: 'ana_data', nome: 'Ana Dados & IA', cidade: 'Rio de Janeiro', verificado: 1, data_criacao: '2022-11-05' },
        { id: 5, username: 'pedro_junior', nome: 'Pedro Iniciante', cidade: 'São Paulo', verificado: 0, data_criacao: '2023-05-12' }
      ],
      createTableSql: `
        CREATE TABLE usuarios (
          id INTEGER PRIMARY KEY,
          username TEXT UNIQUE NOT NULL,
          nome TEXT NOT NULL,
          cidade TEXT NOT NULL,
          verificado INTEGER NOT NULL,
          data_criacao TEXT NOT NULL
        );
      `,
      insertDataSql: `
        INSERT INTO usuarios (id, username, nome, cidade, verificado, data_criacao) VALUES
        (1, 'tech_dev', 'Lucas Tech', 'São Paulo', 1, '2022-01-10'),
        (2, 'mari_design', 'Mariana Designer', 'Belo Horizonte', 0, '2022-03-15'),
        (3, 'code_master', 'Dev Senior', 'Florianópolis', 1, '2021-08-20'),
        (4, 'ana_data', 'Ana Dados & IA', 'Rio de Janeiro', 1, '2022-11-05'),
        (5, 'pedro_junior', 'Pedro Iniciante', 'São Paulo', 0, '2023-05-12');
      `
    },
    {
      name: 'posts',
      description: 'Publicações no feed da rede social.',
      columns: [
        { name: 'id', type: 'INTEGER', isPrimaryKey: true, description: 'ID da postagem' },
        { name: 'usuario_id', type: 'INTEGER', isForeignKey: true, references: 'usuarios(id)', description: 'Autor da publicação' },
        { name: 'conteudo', type: 'TEXT', description: 'Texto da postagem' },
        { name: 'curtidas_count', type: 'INTEGER', description: 'Número total de curtidas' },
        { name: 'data_publicacao', type: 'TEXT', description: 'Timestamp de publicação' }
      ],
      sampleData: [
        { id: 101, usuario_id: 1, conteudo: 'Acabei de lançar meu novo tutorial sobre SQL avançado!', curtidas_count: 142, data_publicacao: '2023-08-01 10:30:00' },
        { id: 102, usuario_id: 2, conteudo: 'Dicas de UI/UX para dashboards interativos. O que acham?', curtidas_count: 89, data_publicacao: '2023-08-02 14:15:00' },
        { id: 103, usuario_id: 3, conteudo: 'Por que escrever testes automatizados salva seu sono à noite.', curtidas_count: 320, data_publicacao: '2023-08-03 09:00:00' },
        { id: 104, usuario_id: 4, conteudo: 'Como otimizar queries em bancos relacionais usando índices.', curtidas_count: 215, data_publicacao: '2023-08-04 18:45:00' },
        { id: 105, usuario_id: 5, conteudo: 'Resolvi meu primeiro exercício de loops em Python hoje!', curtidas_count: 45, data_publicacao: '2023-08-05 11:20:00' }
      ],
      createTableSql: `
        CREATE TABLE posts (
          id INTEGER PRIMARY KEY,
          usuario_id INTEGER NOT NULL,
          conteudo TEXT NOT NULL,
          curtidas_count INTEGER NOT NULL,
          data_publicacao TEXT NOT NULL,
          FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
        );
      `,
      insertDataSql: `
        INSERT INTO posts (id, usuario_id, conteudo, curtidas_count, data_publicacao) VALUES
        (101, 1, 'Acabei de lançar meu novo tutorial sobre SQL avançado!', 142, '2023-08-01 10:30:00'),
        (102, 2, 'Dicas de UI/UX para dashboards interativos. O que acham?', 89, '2023-08-02 14:15:00'),
        (103, 3, 'Por que escrever testes automatizados salva seu sono à noite.', 320, '2023-08-03 09:00:00'),
        (104, 4, 'Como otimizar queries em bancos relacionais usando índices.', 215, '2023-08-04 18:45:00'),
        (105, 5, 'Resolvi meu primeiro exercício de loops em Python hoje!', 45, '2023-08-05 11:20:00');
      `
    },
    {
      name: 'comentarios',
      description: 'Respostas e comentários nas postagens.',
      columns: [
        { name: 'id', type: 'INTEGER', isPrimaryKey: true, description: 'ID do comentário' },
        { name: 'post_id', type: 'INTEGER', isForeignKey: true, references: 'posts(id)', description: 'ID do post comentado' },
        { name: 'usuario_id', type: 'INTEGER', isForeignKey: true, references: 'usuarios(id)', description: 'Autor do comentário' },
        { name: 'texto', type: 'TEXT', description: 'Conteúdo do comentário' },
        { name: 'data_comentario', type: 'TEXT', description: 'Data do comentário' }
      ],
      sampleData: [
        { id: 1, post_id: 101, usuario_id: 4, texto: 'Excelente conteúdo, parabéns!', data_comentario: '2023-08-01 10:45:00' },
        { id: 2, post_id: 101, usuario_id: 5, texto: 'Estava precisando muito disso!', data_comentario: '2023-08-01 11:00:00' },
        { id: 3, post_id: 103, usuario_id: 1, texto: 'Totalmente de acordo. TDD salva vidas.', data_comentario: '2023-08-03 09:30:00' },
        { id: 4, post_id: 104, usuario_id: 3, texto: 'Índices B-Tree vs Hash faz toda a diferença.', data_comentario: '2023-08-04 19:10:00' },
        { id: 5, post_id: 105, usuario_id: 1, texto: 'Parabéns pela evolução! Continue praticando!', data_comentario: '2023-08-05 11:35:00' }
      ],
      createTableSql: `
        CREATE TABLE comentarios (
          id INTEGER PRIMARY KEY,
          post_id INTEGER NOT NULL,
          usuario_id INTEGER NOT NULL,
          texto TEXT NOT NULL,
          data_comentario TEXT NOT NULL,
          FOREIGN KEY (post_id) REFERENCES posts(id),
          FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
        );
      `,
      insertDataSql: `
        INSERT INTO comentarios (id, post_id, usuario_id, texto, data_comentario) VALUES
        (1, 101, 4, 'Excelente conteúdo, parabéns!', '2023-08-01 10:45:00'),
        (2, 101, 5, 'Estava precisando muito disso!', '2023-08-01 11:00:00'),
        (3, 103, 1, 'Totalmente de acordo. TDD salva vidas.', '2023-08-03 09:30:00'),
        (4, 104, 3, 'Índices B-Tree vs Hash faz toda a diferença.', '2023-08-04 19:10:00'),
        (5, 105, 1, 'Parabéns pela evolução! Continue praticando!', '2023-08-05 11:35:00');
      `
    },
    {
      name: 'seguidores',
      description: 'Relação de quem segue quem na rede.',
      columns: [
        { name: 'id', type: 'INTEGER', isPrimaryKey: true, description: 'ID do vínculo' },
        { name: 'seguidor_id', type: 'INTEGER', isForeignKey: true, references: 'usuarios(id)', description: 'Quem está seguindo' },
        { name: 'seguido_id', type: 'INTEGER', isForeignKey: true, references: 'usuarios(id)', description: 'Quem está sendo seguido' },
        { name: 'data_seguindo', type: 'TEXT', description: 'Data do início do follow' }
      ],
      sampleData: [
        { id: 1, seguidor_id: 1, seguido_id: 3, data_seguindo: '2022-04-10' },
        { id: 2, seguidor_id: 1, seguido_id: 4, data_seguindo: '2022-12-01' },
        { id: 3, seguidor_id: 2, seguido_id: 1, data_seguindo: '2022-05-15' },
        { id: 4, seguidor_id: 4, seguido_id: 1, data_seguindo: '2023-01-20' },
        { id: 5, seguidor_id: 5, seguido_id: 1, data_seguindo: '2023-05-15' },
        { id: 6, seguidor_id: 5, seguido_id: 3, data_seguindo: '2023-05-16' },
        { id: 7, seguidor_id: 5, seguido_id: 4, data_seguindo: '2023-05-18' }
      ],
      createTableSql: `
        CREATE TABLE seguidores (
          id INTEGER PRIMARY KEY,
          seguidor_id INTEGER NOT NULL,
          seguido_id INTEGER NOT NULL,
          data_seguindo TEXT NOT NULL,
          FOREIGN KEY (seguidor_id) REFERENCES usuarios(id),
          FOREIGN KEY (seguido_id) REFERENCES usuarios(id)
        );
      `,
      insertDataSql: `
        INSERT INTO seguidores (id, seguidor_id, seguido_id, data_seguindo) VALUES
        (1, 1, 3, '2022-04-10'),
        (2, 1, 4, '2022-12-01'),
        (3, 2, 1, '2022-05-15'),
        (4, 4, 1, '2023-01-20'),
        (5, 5, 1, '2023-05-15'),
        (6, 5, 3, '2023-05-16'),
        (7, 5, 4, '2023-05-18');
      `
    }
  ]
};
