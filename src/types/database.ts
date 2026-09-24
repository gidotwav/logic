export interface SqlColumn {
  name: string;
  type: string;
  isPrimaryKey?: boolean;
  isForeignKey?: boolean;
  references?: string;
  description?: string;
}

export interface SqlTable {
  name: string;
  description: string;
  columns: SqlColumn[];
  sampleData: Record<string, any>[];
  createTableSql: string;
  insertDataSql: string;
}

export interface SqlDataset {
  id: string;
  name: string;
  description: string;
  tables: SqlTable[];
  icon: string;
}

export interface QueryResult {
  columns: string[];
  values: any[][];
  rawRows?: Record<string, any>[];
  rowsAffected?: number;
  executionTimeMs?: number;
  error?: string;
}
