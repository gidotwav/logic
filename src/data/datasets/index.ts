import { SqlDataset } from '../../types/database';
import { lojaDataset } from './loja';
import { universidadeDataset } from './universidade';
import { streamingDataset } from './streaming';
import { empresaDataset } from './empresa';
import { redesocialDataset } from './redesocial';

export const allDatasets: SqlDataset[] = [
  lojaDataset,
  universidadeDataset,
  streamingDataset,
  empresaDataset,
  redesocialDataset
];

export const getDatasetById = (id?: string): SqlDataset => {
  if (!id) return lojaDataset;
  const found = allDatasets.find(d => d.id === id);
  return found || lojaDataset;
};
