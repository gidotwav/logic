import { SqlDataset } from '../../types/database';

export const streamingDataset: SqlDataset = {
  id: 'streaming',
  name: 'Música & Áudio (Streaming)',
  description: 'Plataforma de música online com ouvintes, artistas, faixas, streams e playlists.',
  icon: 'Headphones',
  tables: [
    {
      name: 'usuarios',
      description: 'Assinantes do serviço de streaming.',
      columns: [
        { name: 'id', type: 'INTEGER', isPrimaryKey: true, description: 'ID do usuário' },
        { name: 'nome', type: 'TEXT', description: 'Nome do usuário' },
        { name: 'plano', type: 'TEXT', description: 'Plano (Gratuito, Premium Individual, Familiar, Estudante)' },
        { name: 'pais', type: 'TEXT', description: 'País de origem' },
        { name: 'data_assinatura', type: 'TEXT', description: 'Data do início do plano' }
      ],
      sampleData: [
        { id: 1, nome: 'Marina Ruy', plano: 'Premium Individual', pais: 'Brasil', data_assinatura: '2023-01-10' },
        { id: 2, nome: 'Liam Wilson', plano: 'Familiar', pais: 'Reino Unido', data_assinatura: '2022-11-05' },
        { id: 3, nome: 'Mateo Rossi', plano: 'Gratuito', pais: 'Itália', data_assinatura: '2023-04-18' },
        { id: 4, nome: 'Sophia Chen', plano: 'Estudante', pais: 'Canadá', data_assinatura: '2023-02-14' },
        { id: 5, nome: 'Tiago Leifert', plano: 'Premium Individual', pais: 'Brasil', data_assinatura: '2023-06-01' }
      ],
      createTableSql: `
        CREATE TABLE usuarios (
          id INTEGER PRIMARY KEY,
          nome TEXT NOT NULL,
          plano TEXT NOT NULL,
          pais TEXT NOT NULL,
          data_assinatura TEXT NOT NULL
        );
      `,
      insertDataSql: `
        INSERT INTO usuarios (id, nome, plano, pais, data_assinatura) VALUES
        (1, 'Marina Ruy', 'Premium Individual', 'Brasil', '2023-01-10'),
        (2, 'Liam Wilson', 'Familiar', 'Reino Unido', '2022-11-05'),
        (3, 'Mateo Rossi', 'Gratuito', 'Itália', '2023-04-18'),
        (4, 'Sophia Chen', 'Estudante', 'Canadá', '2023-02-14'),
        (5, 'Tiago Leifert', 'Premium Individual', 'Brasil', '2023-06-01');
      `
    },
    {
      name: 'artistas',
      description: 'Músicos e bandas cadastrados.',
      columns: [
        { name: 'id', type: 'INTEGER', isPrimaryKey: true, description: 'ID do artista' },
        { name: 'nome', type: 'TEXT', description: 'Nome artístico' },
        { name: 'genero_principal', type: 'TEXT', description: 'Gênero predominante' },
        { name: 'ouvintes_mensais', type: 'INTEGER', description: 'Ouvintes ativos por mês' },
        { name: 'pais_origem', type: 'TEXT', description: 'País natal' }
      ],
      sampleData: [
        { id: 201, nome: 'Alok', genero_principal: 'Eletrônica', ouvintes_mensais: 21500000, pais_origem: 'Brasil' },
        { id: 202, nome: 'Anitta', genero_principal: 'Pop', ouvintes_mensais: 28400000, pais_origem: 'Brasil' },
        { id: 203, nome: 'Coldplay', genero_principal: 'Rock Alternativo', ouvintes_mensais: 65000000, pais_origem: 'Reino Unido' },
        { id: 204, nome: 'Daft Punk', genero_principal: 'Eletrônica', ouvintes_mensais: 18900000, pais_origem: 'França' },
        { id: 205, nome: 'Caetano Veloso', genero_principal: 'MPB', ouvintes_mensais: 5300000, pais_origem: 'Brasil' }
      ],
      createTableSql: `
        CREATE TABLE artistas (
          id INTEGER PRIMARY KEY,
          nome TEXT NOT NULL,
          genero_principal TEXT NOT NULL,
          ouvintes_mensais INTEGER NOT NULL,
          pais_origem TEXT NOT NULL
        );
      `,
      insertDataSql: `
        INSERT INTO artistas (id, nome, genero_principal, ouvintes_mensais, pais_origem) VALUES
        (201, 'Alok', 'Eletrônica', 21500000, 'Brasil'),
        (202, 'Anitta', 'Pop', 28400000, 'Brasil'),
        (203, 'Coldplay', 'Rock Alternativo', 65000000, 'Reino Unido'),
        (204, 'Daft Punk', 'Eletrônica', 18900000, 'França'),
        (205, 'Caetano Veloso', 'MPB', 5300000, 'Brasil');
      `
    },
    {
      name: 'musicas',
      description: 'Faixas musicais disponíveis para reprodução.',
      columns: [
        { name: 'id', type: 'INTEGER', isPrimaryKey: true, description: 'ID da faixa' },
        { name: 'titulo', type: 'TEXT', description: 'Título da música' },
        { name: 'artista_id', type: 'INTEGER', isForeignKey: true, references: 'artistas(id)', description: 'Artista responsável' },
        { name: 'duracao_segundos', type: 'INTEGER', description: 'Duração em segundos' },
        { name: 'ano_lancamento', type: 'INTEGER', description: 'Ano de lançamento' },
        { name: 'streams_totais', type: 'INTEGER', description: 'Total acumulado de execuções' }
      ],
      sampleData: [
        { id: 301, titulo: 'Hear Me Now', artista_id: 201, duracao_segundos: 192, ano_lancamento: 2016, streams_totais: 680000000 },
        { id: 302, titulo: 'Envolver', artista_id: 202, duracao_segundos: 193, ano_lancamento: 2021, streams_totais: 520000000 },
        { id: 303, titulo: 'Yellow', artista_id: 203, duracao_segundos: 269, ano_lancamento: 2000, streams_totais: 1900000000 },
        { id: 304, titulo: 'Viva La Vida', artista_id: 203, duracao_segundos: 242, ano_lancamento: 2008, streams_totais: 1750000000 },
        { id: 305, titulo: 'Get Lucky', artista_id: 204, duracao_segundos: 248, ano_lancamento: 2013, streams_totais: 1100000000 },
        { id: 306, titulo: 'Sozinho', artista_id: 205, duracao_segundos: 195, ano_lancamento: 1998, streams_totais: 145000000 }
      ],
      createTableSql: `
        CREATE TABLE musicas (
          id INTEGER PRIMARY KEY,
          titulo TEXT NOT NULL,
          artista_id INTEGER NOT NULL,
          duracao_segundos INTEGER NOT NULL,
          ano_lancamento INTEGER NOT NULL,
          streams_totais INTEGER NOT NULL,
          FOREIGN KEY (artista_id) REFERENCES artistas(id)
        );
      `,
      insertDataSql: `
        INSERT INTO musicas (id, titulo, artista_id, duracao_segundos, ano_lancamento, streams_totais) VALUES
        (301, 'Hear Me Now', 201, 192, 2016, 680000000),
        (302, 'Envolver', 202, 193, 2021, 520000000),
        (303, 'Yellow', 203, 269, 2000, 1900000000),
        (304, 'Viva La Vida', 203, 242, 2008, 1750000000),
        (305, 'Get Lucky', 204, 248, 2013, 1100000000),
        (306, 'Sozinho', 205, 195, 1998, 145000000);
      `
    },
    {
      name: 'playlists',
      description: 'Coleções de músicas criadas pelos usuários.',
      columns: [
        { name: 'id', type: 'INTEGER', isPrimaryKey: true, description: 'ID da playlist' },
        { name: 'usuario_id', type: 'INTEGER', isForeignKey: true, references: 'usuarios(id)', description: 'Criador da playlist' },
        { name: 'nome', type: 'TEXT', description: 'Nome descritivo' },
        { name: 'data_criacao', type: 'TEXT', description: 'Data de criação' },
        { name: 'publica', type: 'INTEGER', description: '1 para pública, 0 para privada' }
      ],
      sampleData: [
        { id: 401, usuario_id: 1, nome: 'Foco no Código 🎧', data_criacao: '2023-05-10', publica: 1 },
        { id: 402, usuario_id: 1, nome: 'Treino Intenso ⚡', data_criacao: '2023-06-15', publica: 1 },
        { id: 403, usuario_id: 2, nome: 'Rock Clássico & Nostalgia', data_criacao: '2023-01-20', publica: 1 },
        { id: 404, usuario_id: 5, nome: 'MPB para Relaxar', data_criacao: '2023-07-04', publica: 0 }
      ],
      createTableSql: `
        CREATE TABLE playlists (
          id INTEGER PRIMARY KEY,
          usuario_id INTEGER NOT NULL,
          nome TEXT NOT NULL,
          data_criacao TEXT NOT NULL,
          publica INTEGER NOT NULL,
          FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
        );
      `,
      insertDataSql: `
        INSERT INTO playlists (id, usuario_id, nome, data_criacao, publica) VALUES
        (401, 1, 'Foco no Código 🎧', '2023-05-10', 1),
        (402, 1, 'Treino Intenso ⚡', '2023-06-15', 1),
        (403, 2, 'Rock Clássico & Nostalgia', '2023-01-20', 1),
        (404, 5, 'MPB para Relaxar', '2023-07-04', 0);
      `
    }
  ]
};
