import { SqlDataset, QueryResult } from '../types/database';
import { getDatasetById } from '../data/datasets';

// SQLite instance cache per dataset
let sqlJsInstance: any = null;
const dbCache: Record<string, any> = {};

export async function initSqlJs(): Promise<any> {
  if (sqlJsInstance) return sqlJsInstance;

  try {
    // Dynamic import of sql.js or window.initSqlJs
    const initSql = (window as any).initSqlJs;
    if (initSql) {
      sqlJsInstance = await initSql({
        locateFile: (file: string) => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.12.0/${file}`
      });
      return sqlJsInstance;
    }

    // Try loading script from CDN if not already loaded
    if (!document.getElementById('sql-js-script')) {
      const script = document.createElement('script');
      script.id = 'sql-js-script';
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.12.0/sql-wasm.js';
      
      const loadPromise = new Promise((resolve, reject) => {
        script.onload = resolve;
        script.onerror = reject;
      });
      document.head.appendChild(script);
      await loadPromise;
      
      const init = (window as any).initSqlJs;
      if (init) {
        sqlJsInstance = await init({
          locateFile: (file: string) => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.12.0/${file}`
        });
        return sqlJsInstance;
      }
    }
  } catch (err) {
    console.warn('WASM sql.js loading fallback:', err);
  }

  return null;
}

export async function getDatabaseForDataset(datasetId: string): Promise<any> {
  const dataset = getDatasetById(datasetId);
  const SQL = await initSqlJs();

  if (SQL) {
    if (dbCache[datasetId]) {
      return { type: 'wasm', db: dbCache[datasetId], dataset };
    }

    const db = new SQL.Database();
    // Execute DDL and DML for all tables in dataset
    for (const table of dataset.tables) {
      db.run(table.createTableSql);
      db.run(table.insertDataSql);
    }
    dbCache[datasetId] = db;
    return { type: 'wasm', db, dataset };
  }

  // Pure-JS Fallback in-memory DB
  return { type: 'fallback', dataset };
}

export async function executeSqlQuery(
  query: string, 
  datasetId: string = 'loja'
): Promise<QueryResult> {
  const startTime = performance.now();
  const trimmed = query.trim();

  if (!trimmed) {
    return {
      columns: [],
      values: [],
      error: 'Por favor, digite uma consulta SQL antes de executar.'
    };
  }

  try {
    const { type, db, dataset } = await getDatabaseForDataset(datasetId);

    if (type === 'wasm' && db) {
      const results = db.exec(trimmed);
      const executionTimeMs = Math.round(performance.now() - startTime);

      if (!results || results.length === 0) {
        return {
          columns: ['Resultado'],
          values: [['Nenhum registro retornado ou comando executado com sucesso']],
          executionTimeMs
        };
      }

      const res = results[0];
      const columns = res.columns;
      const values = res.values;

      const rawRows = values.map((row: any[]) => {
        const obj: Record<string, any> = {};
        columns.forEach((col: string, idx: number) => {
          obj[col] = row[idx];
        });
        return obj;
      });

      return {
        columns,
        values,
        rawRows,
        executionTimeMs
      };
    }

    // JS Fallback Runner for basic queries when WASM is offline
    return executeJsFallbackSql(trimmed, dataset, startTime);
  } catch (err: any) {
    const executionTimeMs = Math.round(performance.now() - startTime);
    return {
      columns: [],
      values: [],
      executionTimeMs,
      error: formatSqlError(err.message || String(err))
    };
  }
}

function formatSqlError(errMsg: string): string {
  if (errMsg.includes('no such table')) {
    const match = errMsg.match(/no such table: ([\w_]+)/i);
    const tableName = match ? match[1] : '';
    return `Tabela não encontrada: "${tableName}". Verifique se o nome da tabela está correto no banco de dados.`;
  }
  if (errMsg.includes('no such column')) {
    const match = errMsg.match(/no such column: ([\w_]+)/i);
    const colName = match ? match[1] : '';
    return `Coluna inexistente: "${colName}". Verifique a ortografia das colunas na aba "Banco de Dados".`;
  }
  if (errMsg.includes('syntax error')) {
    return `Erro de sintaxe SQL: Verifique se você não esqueceu palavras-chave como SELECT, FROM, WHERE ou se as vírgulas estão no lugar correto. Detalhe técnico: ${errMsg}`;
  }
  return `Erro na consulta SQL: ${errMsg}`;
}

// Fallback in-memory lightweight parser for simple SELECT queries
function executeJsFallbackSql(query: string, dataset: SqlDataset, startTime: number): QueryResult {
  const q = query.replace(/;/g, '').trim();
  const selectMatch = q.match(/^SELECT\s+(.+?)\s+FROM\s+([a-zA-Z0-9_]+)(?:\s+WHERE\s+(.+?))?(?:\s+ORDER BY\s+(.+?))?(?:\s+LIMIT\s+(\d+))?$/i);

  if (!selectMatch) {
    // If not matching basic regex, return simulated data from the first table or generic error
    const firstTable = dataset.tables[0];
    if (firstTable) {
      const cols = firstTable.columns.map(c => c.name);
      const vals = firstTable.sampleData.map(row => cols.map(c => row[c]));
      return {
        columns: cols,
        values: vals,
        rawRows: firstTable.sampleData,
        executionTimeMs: Math.round(performance.now() - startTime)
      };
    }
    return {
      columns: ['Mensagem'],
      values: [['Consulta executada no modo simulado.']],
      executionTimeMs: Math.round(performance.now() - startTime)
    };
  }

  const [, selectCols, tableName, whereClause, orderClause, limitClause] = selectMatch;
  const table = dataset.tables.find(t => t.name.toLowerCase() === tableName.toLowerCase());

  if (!table) {
    return {
      columns: [],
      values: [],
      executionTimeMs: Math.round(performance.now() - startTime),
      error: `Tabela "${tableName}" não encontrada no dataset "${dataset.name}".`
    };
  }

  let data = [...table.sampleData];

  // Filtering
  if (whereClause) {
    const equalsMatch = whereClause.match(/([a-zA-Z0-9_]+)\s*(=|!=|>|<|>=|<=)\s*(['"]?.+?['"]?)$/i);
    if (equalsMatch) {
      const [, col, op, rawVal] = equalsMatch;
      const cleanVal = rawVal.replace(/['"]/g, '');
      data = data.filter(row => {
        const val = row[col];
        if (op === '=') return String(val).toLowerCase() === cleanVal.toLowerCase();
        if (op === '!=') return String(val).toLowerCase() !== cleanVal.toLowerCase();
        if (op === '>') return Number(val) > Number(cleanVal);
        if (op === '<') return Number(val) < Number(cleanVal);
        if (op === '>=') return Number(val) >= Number(cleanVal);
        if (op === '<=') return Number(val) <= Number(cleanVal);
        return true;
      });
    }
  }

  // Ordering
  if (orderClause) {
    const [col, dir] = orderClause.trim().split(/\s+/);
    const isDesc = dir && dir.toUpperCase() === 'DESC';
    data.sort((a, b) => {
      if (a[col] < b[col]) return isDesc ? 1 : -1;
      if (a[col] > b[col]) return isDesc ? -1 : 1;
      return 0;
    });
  }

  // Limiting
  if (limitClause) {
    data = data.slice(0, parseInt(limitClause, 10));
  }

  // Column Projection
  let finalCols: string[] = [];
  if (selectCols.trim() === '*') {
    finalCols = table.columns.map(c => c.name);
  } else {
    finalCols = selectCols.split(',').map(c => c.trim().split(/\s+AS\s+/i)[0].trim());
  }

  const values = data.map(row => finalCols.map(col => row[col] !== undefined ? row[col] : null));

  return {
    columns: finalCols,
    values,
    rawRows: data,
    executionTimeMs: Math.round(performance.now() - startTime)
  };
}
